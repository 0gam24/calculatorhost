/**
 * 자녀장려금 연간 예상액 - 연속 산식 추정.
 * 조세특례제한법100의28(자격),100의29(산정),100의5④·100의31(재산감액).
 * https://www.law.go.kr/법령/조세특례제한법/제100조의29
 * 국세청 산정표 구간값,자녀세액공제 중복조정,기한후신청·체납 미반영.
 */
import {
  CHILD_TAX_BENEFIT_PER_CHILD,
  CHILD_TAX_BENEFIT_INCOME_CAP,
  CHILD_TAX_BENEFIT_INCOME_PHASE_OUT_START,
  CHILD_TAX_BENEFIT_DUAL_PHASE_OUT_START,
  CHILD_TAX_BENEFIT_ASSET_CAP,
  CHILD_TAX_BENEFIT_ASSET_REDUCTION_START,
} from '@/lib/constants/tax-rates-2026';
export type HouseholdType = 'singleEarner' | 'dualEarner' | 'single';
export interface ChildTaxCreditInput {
  householdType: HouseholdType;
  /** 신청자격 판단용 부부합산 연 총소득 */
  totalAnnualIncome: number;
  /** 지급액 산정용 총급여액등. 생략 시 총소득과 같다고 가정 */
  annualGrossPay?: number;
  childCount: number;
  passesAssetTest: boolean;
  /** 가구 재산 합계. 생략 시1.7억원 미만 가정 */
  householdAssets?: number;
}
export interface ChildTaxCreditResult {
  eligibleChildCount: number;
  grossPayment: number;
  reductionRate: number;
  finalPayment: number;
  warnings: string[];
}
export function calculateChildTaxCredit(input: ChildTaxCreditInput): ChildTaxCreditResult {
  const grossPay = input.annualGrossPay ?? input.totalAnnualIncome;
  for (const value of [input.totalAnnualIncome, grossPay, input.householdAssets ?? 0]) {
    if (!Number.isFinite(value) || value < 0)
      throw new RangeError('소득과 재산은0이상의 유한한 금액이어야 합니다.');
  }
  if (!Number.isFinite(input.childCount)) throw new RangeError('자녀 수를 확인하세요.');
  const warnings = [
    '연속 산식의 추정액입니다. 국세청 산정표, 자녀세액공제 중복조정·기한후 신청·체납은 별도로 확인하세요.',
  ];
  const childCount = Math.max(0, Math.floor(input.childCount));
  const empty = (message: string): ChildTaxCreditResult => ({
    eligibleChildCount: 0,
    grossPayment: 0,
    reductionRate: 0,
    finalPayment: 0,
    warnings: [message, ...warnings],
  });
  if (input.householdType === 'single')
    return empty('단독가구는 부양자녀가 없는 가구로 자녀장려금 대상이 아닙니다.');
  if (!input.passesAssetTest || (input.householdAssets ?? 0) >= CHILD_TAX_BENEFIT_ASSET_CAP)
    return empty('가구 재산 합계가2.4억원 이상이면 대상이 아닙니다.');
  if (childCount === 0) return empty('자녀장려금 부양자녀 요건을 충족하는 자녀가 없습니다.');
  if (input.totalAnnualIncome >= CHILD_TAX_BENEFIT_INCOME_CAP)
    return empty('부부합산 연 총소득이7,000만원 이상이면 대상이 아닙니다.');
  if (grossPay <= 0) return empty('총급여액등과 근로·사업·종교인 소득 자격을 확인하세요.');
  const start =
    input.householdType === 'dualEarner'
      ? CHILD_TAX_BENEFIT_DUAL_PHASE_OUT_START
      : CHILD_TAX_BENEFIT_INCOME_PHASE_OUT_START;
  //100의29: 최대100만원에서 최저50만원까지 감액.7000만원 자격상한 별도.
  const reductionRate = Math.min(
    0.5,
    Math.max(0, ((grossPay - start) / (CHILD_TAX_BENEFIT_INCOME_CAP - start)) * 0.5),
  );
  const grossPayment = childCount * CHILD_TAX_BENEFIT_PER_CHILD;
  const assetMultiplier =
    (input.householdAssets ?? 0) >= CHILD_TAX_BENEFIT_ASSET_REDUCTION_START ? 0.5 : 1;
  if (assetMultiplier === 0.5)
    warnings.push('재산1.7억원 이상2.4억원 미만으로 산정액의50%를 감액했습니다.');
  if (input.annualGrossPay === undefined)
    warnings.push(
      '총급여액등을 연 총소득과 같다고 가정했습니다. 두 금액은 소득 종류에 따라 다릅니다.',
    );
  if (input.householdAssets === undefined)
    warnings.push('재산1.7억원 미만을 가정했습니다. 재산감액 여부를 확인하세요.');
  return {
    eligibleChildCount: childCount,
    grossPayment,
    reductionRate: Math.round(reductionRate * 10000) / 10000,
    finalPayment: Math.floor((grossPayment * (1 - reductionRate) * assetMultiplier) / 10) * 10,
    warnings,
  };
}
