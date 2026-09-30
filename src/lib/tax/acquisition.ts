/**
 * 주택 취득세 계산 — 감면·특례를 제외한 확인된 일반 취득만 지원.
 * 확인 기준: 2026-09-30. 지방세법 §11·§13의2·§151 [시행 2026-01-01],
 * 지방세법 시행령 §28의6 [시행 2026-09-18], 농어촌특별세법 §4·§5
 * [시행 2026-05-12] 및 시행령 §4 [시행 2026-01-02].
 * https://www.law.go.kr/LSW/lsSideInfoP.do?docCls=jo&joBrNo=02&joNo=0013&lsiSeq=282559&urlMode=lsScJoRltInfoR
 * https://www.law.go.kr/LSW/lsSideInfoP.do?docCls=jo&joBrNo=00&joNo=0151&lsiSeq=282559&urlMode=lsScJoRltInfoR
 * https://www.law.go.kr/LSW/lsSideInfoP.do?docCls=jo&joBrNo=06&joNo=0028&lsiSeq=288831&urlMode=lsScJoRltInfoR
 * https://www.law.go.kr/LSW/lsSideInfoP.do?docCls=jo&joBrNo=00&joNo=0005&lsiSeq=285905&urlMode=lsScJoRltInfoR
 * 일반매매 반올림 교차확인: 대덕구 공식 2020 안내 PDF 인쇄11쪽, 7억1.67%·8억2.33%.
 * https://www.daedeok.go.kr/ebook/site/src/viewer/download.php?host=main&no=2&site=20200103_154912
 * 10원 미만 절사: 지방세기본법 §59 [시행 2026-02-05]가 국고금 관리법 §47을 준용.
 * https://www.law.go.kr/LSW/lsLawLinkInfo.do?chrClsCd=010202&lsJoLnkSeq=1000577035
 * https://www.law.go.kr/LSW/lsLawLinkInfo.do?chrClsCd=010202&lsJoLnkSeq=900052683
 * 생애최초 감면, 상속 특례, 부담부증여 및 매매 특례는 조건 확인 후 별도 계산 필요.
 * 미지원·미확인 조건은 0원 결과 대신 Error로 반환한다.
 */

import { ACQUISITION_TAX } from '@/lib/constants/tax-rates-2026';

export type AcquisitionMethod = 'purchase' | 'gift' | 'inheritance' | 'primitive';
export type AcquisitionTarget = 'residential' | 'farmland' | 'land' | 'other';
export type HouseCount = 1 | 2 | 3 | 4;
export type AcquisitionCondition = 'unknown' | 'applicable' | 'notApplicable';

export interface AcquisitionTaxInput {
  method: AcquisitionMethod;
  /** 주택만 지원 */
  target: AcquisitionTarget;
  /** 취득 후 1세대 기준 주택 수. 주택 수 산정 제외·특례는 별도 확인. */
  houseCount: HouseCount;
  /** 국민주택규모를 초과하는지 확인한 값. 기존 저장 키 이름 유지. */
  areaOver85: boolean;
  adjustedArea: boolean;
  /** 확인된 취득세 과세표준(원). 증여 과세표준과 중과 판단용 시가표준액은 구별. */
  acquisitionPrice: number;
  /** true이면 감면 요건·한도 및 부가세 확인이 필요하여 자동 계산 보류 */
  firstHomeBuyerDiscount: boolean;
  /** 지분 취득·일시적 2주택 등 특례가 없는 일반 주택 매매만 지원. 누락은 ordinary. */
  purchaseSpecial?: 'unknown' | 'ordinary' | 'special';
  /** 조정지역 증여 중과 판단용 전체 주택의 시가표준액(증여 지분 가액이 아님) */
  giftWholeHouseStandardPrice?: number;
  /** 증여자 1세대1주택 및 배우자·직계존비속 증여의 중과 예외 요건 확인 */
  giftOneHouseFamilyExemption?: AcquisitionCondition;
  /** 부담부증여 여부. false로 확인된 일반 증여만 지원 */
  giftBurdened?: boolean | null;
  /** 1가구1주택 상속 등 특례가 적용되지 않는 것으로 확인된 일반 상속만 지원 */
  inheritanceSpecial?: AcquisitionCondition;
}

export interface AcquisitionTaxResult {
  taxBase: number;
  acquisitionTax: number;
  specialRuralTax: number;
  localEducationTax: number;
  totalPayment: number;
  /** 소수, 0.01 = 1% */
  appliedRate: number;
  /** 감면 자동 계산은 보류 중이므로 지원 범위에서는 0 */
  discountAmount: number;
  note: string;
}

/**
 * 지방세법 §11①8나: ((가격 × 2 / 3억원) - 3) / 100.
 * 세율의 소수 계수를 소수 다섯째 자리에서 반올림하여 넷째 자리까지 적용한다.
 * 즉 0.0001 단위(표시 백분율의 0.01%p). 7억→0.0167,8억→0.0233.
 * 부동소수점 없이 유리수의 양수 round-half-up을 정수로 계산한다.
 */
function resolveOrdinaryPurchaseRate(price: number): number {
  if (price <= 600_000_000) return 0.01;
  if (price < 900_000_000) {
    const numerator = BigInt(price) * BigInt(2) - BigInt(900_000_000);
    const denominator = BigInt(3_000_000);
    const rateUnits = (numerator * BigInt(2) + denominator) / (denominator * BigInt(2));
    return Number(rateUnits) / 10_000;
  }
  return 0.03;
}

function resolveMainRate(input: AcquisitionTaxInput): number {
  if (input.method === 'purchase') {
    if (input.purchaseSpecial !== undefined && input.purchaseSpecial !== 'ordinary') {
      throw new Error(
        '지분 취득·일시적 2주택 등 매매 특례 여부를 확인해 주세요. 특례 거래는 별도 계산이 필요합니다.',
      );
    }
    if (input.adjustedArea && input.houseCount >= 3) return ACQUISITION_TAX.adjustedThreeOrMore;
    if (!input.adjustedArea && input.houseCount >= 4) return ACQUISITION_TAX.nonAdjustedFourOrMore;
    if (input.adjustedArea && input.houseCount === 2) return ACQUISITION_TAX.adjustedTwoHouses;
    if (!input.adjustedArea && input.houseCount === 3)
      return ACQUISITION_TAX.nonAdjustedThreeHouses;
    return resolveOrdinaryPurchaseRate(input.acquisitionPrice);
  }

  if (input.method === 'gift') {
    if (input.giftBurdened !== false) {
      throw new Error(
        '부담부증여 여부를 확인해 주세요. 채무를 함께 인수하는 증여는 이 계산기의 일반 증여 계산 범위에 포함되지 않습니다.',
      );
    }
    if (input.adjustedArea) {
      const wholePrice = input.giftWholeHouseStandardPrice;
      if (wholePrice === undefined || !Number.isSafeInteger(wholePrice) || wholePrice <= 0) {
        throw new Error(
          '조정대상지역 증여는 전체 주택의 시가표준액을 입력해 주세요. 과세표준 또는 증여 지분 가액과 구별해야 합니다.',
        );
      }
      if (wholePrice >= ACQUISITION_TAX.giftHeavyStandardPrice) {
        if (input.giftOneHouseFamilyExemption === 'applicable') return ACQUISITION_TAX.giftBasic;
        if (input.giftOneHouseFamilyExemption === 'notApplicable')
          return ACQUISITION_TAX.giftAdjustedHeavy;
        throw new Error(
          '증여자 1세대1주택 및 가족 간 증여의 중과 예외 여부를 확인해 주세요. 수증자의 주택 수만으로 중과를 판단할 수 없습니다.',
        );
      }
    }
    return ACQUISITION_TAX.giftBasic;
  }

  if (input.inheritanceSpecial !== 'notApplicable') {
    throw new Error(
      '1가구1주택 상속 등 상속 특례 여부를 확인해 주세요. 특례가 적용되는 상속은 별도 계산이 필요합니다.',
    );
  }
  return ACQUISITION_TAX.inheritanceBasic;
}

/** 원 단위 과표와 지원 범위의 세율로 10원 미만 절사. 부동소수점 곱셈 오차 방지. */
function amountAtRate(taxBase: number, rate: number): number {
  const numerator = BigInt(Math.round(rate * 1_000_000));
  return Number((BigInt(taxBase) * numerator) / BigInt(10_000_000)) * 10;
}

export function calculateAcquisitionTax(input: AcquisitionTaxInput): AcquisitionTaxResult {
  if (!Number.isSafeInteger(input.acquisitionPrice) || input.acquisitionPrice < 0) {
    throw new Error('취득세 과세표준은 0 이상인 유효한 원 단위 금액을 입력해 주세요.');
  }
  if (input.target !== 'residential') {
    throw new Error(
      '농지·토지·기타 대상은 현재 계산 범위에 포함되지 않습니다. 관할 지자체에서 취득세를 확인해 주세요.',
    );
  }
  if (input.method === 'primitive') {
    throw new Error(
      '원시취득은 현재 계산 범위에 포함되지 않습니다. 관할 지자체에서 취득세를 확인해 주세요.',
    );
  }
  if (!['purchase', 'gift', 'inheritance'].includes(input.method)) {
    throw new Error('취득 방법을 확인해 주세요.');
  }
  if (
    ![1, 2, 3, 4].includes(input.houseCount) ||
    typeof input.areaOver85 !== 'boolean' ||
    typeof input.adjustedArea !== 'boolean'
  ) {
    throw new Error('세대 주택 수·국민주택규모·조정대상지역 조건을 확인해 주세요.');
  }
  if (input.firstHomeBuyerDiscount !== false) {
    throw new Error(
      '생애최초 감면은 본인·배우자의 주택 보유 이력과 주택별 200만·300만원 한도 등 확인이 필요합니다. 자동 감면 계산은 현재 보류 중입니다.',
    );
  }

  const taxBase = input.acquisitionPrice;
  const mainRate = resolveMainRate(input);
  const isHeavy =
    mainRate === ACQUISITION_TAX.adjustedTwoHouses ||
    mainRate === ACQUISITION_TAX.giftAdjustedHeavy;
  const ruralRate = !input.areaOver85
    ? 0
    : mainRate === ACQUISITION_TAX.giftAdjustedHeavy
      ? ACQUISITION_TAX.specialRuralTaxHeavy
      : mainRate === ACQUISITION_TAX.adjustedTwoHouses
        ? ACQUISITION_TAX.specialRuralTaxEightPercentHeavy
        : ACQUISITION_TAX.specialRuralTaxOver85;
  const educationRate = isHeavy
    ? ACQUISITION_TAX.localEducationTaxHeavy
    : input.method === 'gift'
      ? ACQUISITION_TAX.localEducationTaxGift
      : input.method === 'inheritance'
        ? ACQUISITION_TAX.localEducationTaxInheritance
        : mainRate * ACQUISITION_TAX.localEducationTaxOfAcquisition;

  const acquisitionTax = amountAtRate(taxBase, mainRate);
  const specialRuralTax = amountAtRate(taxBase, ruralRate);
  const localEducationTax = amountAtRate(taxBase, educationRate);
  const notes = ['감면·특례를 제외한 일반 취득의 예상 세액'];
  if (isHeavy) notes.push('주택 중과 세율 적용');
  if (input.areaOver85) notes.push('국민주택규모 초과 농어촌특별세 포함');

  return {
    taxBase,
    acquisitionTax,
    specialRuralTax,
    localEducationTax,
    totalPayment: acquisitionTax + specialRuralTax + localEducationTax,
    appliedRate: mainRate,
    discountAmount: 0,
    note: notes.join(' | '),
  };
}
