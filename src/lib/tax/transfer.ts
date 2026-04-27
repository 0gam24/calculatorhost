/**
 * 양도소득세 계산 — 순수 함수
 *
 * 법적 근거:
 * - 소득세법 §92-§118 (양도소득세)
 * - 시행령 §154 (일시적 2주택 비과세)
 * - 시행령 §159의3 (장기보유특별공제)
 * - 소득세법 §104의3 (조정지역 중과)
 *
 * 상수: src/lib/constants/tax-rates-2026.ts
 * 명세: docs/calculator-spec/양도소득세.md
 *
 * MVP 스코프:
 * - 자산: 주택 + 분양권 (MVP 우선)
 * - 케이스: 일반 + 1세대1주택 + 일시적2주택 3가지만
 * - 미지원 특례: 상속주택, 농어촌특별세, 임대등록, 기타
 *
 * ⚠️ 모든 수정은 calc-logic-verifier 에이전트 통과 후.
 */

import {
  INCOME_TAX_BRACKETS,
  TRANSFER_TAX,
  LOCAL_INCOME_TAX_RATE,
  LONG_TERM_HOLDING_DEDUCTION_GENERAL_PER_YEAR,
  LONG_TERM_HOLDING_DEDUCTION_GENERAL_MAX,
  LONG_TERM_HOLDING_DEDUCTION_ONE_HOUSE_HOLD_PER_YEAR,
  LONG_TERM_HOLDING_DEDUCTION_ONE_HOUSE_RESIDE_PER_YEAR,
  LONG_TERM_HOLDING_DEDUCTION_ONE_HOUSE_MAX_YEARS_EACH,
  LONG_TERM_HOLDING_DEDUCTION_ONE_HOUSE_MAX,
} from '@/lib/constants/tax-rates-2026';
import { calculateProgressiveTax } from './income';

// ============================================
// 타입 정의
// ============================================

export type TransferCaseType = 'general' | 'oneHouseOneHousehold' | 'temporaryTwoHouses';
export type TransferAssetType = 'house' | 'subscription-right' | 'land' | 'other';
export type AdjustedAreaSurcharge = 'none' | 'twoHouses' | 'threeOrMoreHouses';

export interface TransferInput {
  /** 3가지 케이스: 일반 / 1세대1주택 / 일시적2주택 */
  caseType: TransferCaseType;

  /** 자산 종류 (MVP: house, subscription-right 지원) */
  assetType: TransferAssetType;

  /** 양도가 (원) */
  salePrice: number;

  /** 취득가 (원) */
  acquisitionPrice: number;

  /** 필요경비: 중개비, 리모델링, 양도비용 등 (원) */
  necessaryExpenses: number;

  /** 보유 기간 (연, 소수점 허용. 예: 2.5년) */
  holdingYears: number;

  /** 거주 기간 (연, 소수점 허용. 1세대1주택 장특공제 용) */
  residentYears?: number;

  /** 세대 주택수 (1 / 2 / 3+) */
  householdHouseCount: 1 | 2 | 3;

  /** 조정지역 중과 여부 */
  adjustedAreaSurcharge: AdjustedAreaSurcharge;

  /** 단기 보유 판정: 1년 미만 여부 */
  isShortTerm: boolean;

  /** 분양권 1년 미만 여부 (subscription-right 전용) */
  isSubscriptionRightShort?: boolean;
}

export interface TransferResult {
  /** 양도차익 = 양도가 - 취득가 - 필요경비 */
  capitalGain: number;

  /** 장기보유특별공제 (원) */
  longTermHoldingDeduction: number;

  /** 양도소득금액 = 양도차익 - 장기보유특별공제 */
  transferIncome: number;

  /** 기본공제 (250만원) */
  basicDeduction: number;

  /** 과세표준 = 양도소득금액 - 기본공제 */
  taxableBase: number;

  /** 적용된 세율 (소수, 0.38 = 38%). 누진세는 effectiveRate별도 */
  appliedRate: number;

  /** 세율 설명 ("기본 누진세율" / "단기보유 40%" / "분양권 70%" 등) */
  rateDescription: string;

  /** 산출 양도소득세 (10원 단위 절사) */
  grossTax: number;

  /** 지방소득세 (10%) */
  localIncomeTax: number;

  /** 총 납부액 = 산출세액 + 지방소득세 */
  totalTax: number;

  /** 비과세 처리 금액 (1세대1주택 12억 이하 시) */
  nontaxableAmount: number;

  /** 경고/안내 메시지 배열 */
  warnings: string[];
}

// ============================================
// 헬퍼 함수 1: 장기보유특별공제 계산
// ============================================

/**
 * 장기보유특별공제 계산
 *
 * - general: 연 2% (3년 이상 보유부터 적용, 최대 30%)
 * - oneHouseOneHousehold: (보유 + 거주) 각 연 4% (각 최대 10년, 합 최대 80%)
 * - temporaryTwoHouses: 일반 계산과 동일 (일시적 2주택은 1세대1주택으로 취급)
 *
 * @param caseType 케이스 종류
 * @param capitalGain 양도차익 (공제 기반)
 * @param holdingYears 보유 기간 (연)
 * @param residentYears 거주 기간 (연, oneHouseOneHousehold 전용)
 * @returns 공제액 (원)
 */
function calculateLongTermHoldingDeduction(
  caseType: TransferCaseType,
  capitalGain: number,
  holdingYears: number,
  residentYears: number = 0
): number {
  if (capitalGain <= 0) return 0;

  // 3년 미만: 공제 불가 (일반, 일시적2주택)
  if ((caseType === 'general' || caseType === 'temporaryTwoHouses') && holdingYears < 3) {
    return 0;
  }

  if (caseType === 'general' || caseType === 'temporaryTwoHouses') {
    // 일반: 연 2%, 최대 30%
    const rate = Math.min(
      holdingYears * LONG_TERM_HOLDING_DEDUCTION_GENERAL_PER_YEAR,
      LONG_TERM_HOLDING_DEDUCTION_GENERAL_MAX
    );
    return Math.floor(capitalGain * rate);
  }

  if (caseType === 'oneHouseOneHousehold') {
    // 1세대1주택: 보유 + 거주 각 4%, 각 최대 10년
    const holdingRate = Math.min(
      holdingYears * LONG_TERM_HOLDING_DEDUCTION_ONE_HOUSE_HOLD_PER_YEAR,
      LONG_TERM_HOLDING_DEDUCTION_ONE_HOUSE_MAX_YEARS_EACH * LONG_TERM_HOLDING_DEDUCTION_ONE_HOUSE_HOLD_PER_YEAR
    );
    const resideRate = Math.min(
      residentYears * LONG_TERM_HOLDING_DEDUCTION_ONE_HOUSE_RESIDE_PER_YEAR,
      LONG_TERM_HOLDING_DEDUCTION_ONE_HOUSE_MAX_YEARS_EACH * LONG_TERM_HOLDING_DEDUCTION_ONE_HOUSE_RESIDE_PER_YEAR
    );
    const totalRate = Math.min(
      holdingRate + resideRate,
      LONG_TERM_HOLDING_DEDUCTION_ONE_HOUSE_MAX
    );
    return Math.floor(capitalGain * totalRate);
  }

  return 0;
}

// ============================================
// 헬퍼 함수 2: 1세대1주택 비과세 처리
// ============================================

/**
 * 1세대1주택 + 일시적2주택 비과세 조건 검사 및 과세대상 양도차익 조정
 *
 * 일시적2주택 비과세 (시행령 §154):
 * - 신규 주택 취득 후 3년 내에 종전 주택 처분 시 비과세
 * - 12억 이하: 전액 비과세
 * - 12억 초과: 초과분만 과세
 *
 * 1세대1주택 비과세 (소득세법 §94):
 * - 보유 2년 이상, 거주 (조정지역) 등 조건 충족 시
 * - 12억 이하: 전액 비과세
 * - 12억 초과: 초과분만 과세
 *
 * @returns { adjustedCapitalGain, nontaxableAmount }
 */
function applyOneHouseNonTax(
  salePrice: number,
  capitalGain: number,
  caseType: TransferCaseType
): { adjustedCapitalGain: number; nontaxableAmount: number } {
  // 일시적2주택 비과세 적용
  if (caseType === 'temporaryTwoHouses') {
    const cap = TRANSFER_TAX.oneHouseholdOneHouseNonTaxCap;
    if (salePrice <= cap) {
      return { adjustedCapitalGain: 0, nontaxableAmount: capitalGain };
    }
    const taxableRatio = (salePrice - cap) / salePrice;
    const adjustedCapitalGain = Math.floor(capitalGain * taxableRatio);
    const nontaxableAmount = capitalGain - adjustedCapitalGain;
    return { adjustedCapitalGain, nontaxableAmount };
  }

  // 1세대1주택 비과세 적용
  if (caseType !== 'oneHouseOneHousehold') {
    return { adjustedCapitalGain: capitalGain, nontaxableAmount: 0 };
  }

  const cap = TRANSFER_TAX.oneHouseholdOneHouseNonTaxCap;
  if (salePrice <= cap) {
    // 전액 비과세
    return { adjustedCapitalGain: 0, nontaxableAmount: capitalGain };
  }

  // 12억 초과: 비과세 비중 = (12억 - salePrice) / salePrice (음수) → 과세 비중만
  // 정확히: 과세대상 양도차익 = 양도차익 × (salePrice - 12억) / salePrice
  const taxableRatio = (salePrice - cap) / salePrice;
  const adjustedCapitalGain = Math.floor(capitalGain * taxableRatio);
  const nontaxableAmount = capitalGain - adjustedCapitalGain;

  return { adjustedCapitalGain, nontaxableAmount };
}

// ============================================
// 헬퍼 함수 3: 세율 결정 및 계산
// ============================================

interface ResolveRateResult {
  rate: number;
  description: string;
  useSurcharge: boolean; // 조정지역 중과 가산 적용 여부
}

/**
 * 입력과 보유 기간에 따라 적용 세율 결정
 *
 * @param input TransferInput
 * @returns { rate, description, useSurcharge }
 */
function resolveRate(input: TransferInput): ResolveRateResult {
  // 분양권 처리
  if (input.assetType === 'subscription-right') {
    if (input.isSubscriptionRightShort || input.holdingYears < 1) {
      return {
        rate: 0.7,
        description: '분양권 1년 미만 70%',
        useSurcharge: false,
      };
    }
    return {
      rate: 0.6,
      description: '분양권 1년 이상 60%',
      useSurcharge: false,
    };
  }

  // 주택: 단기 세율 처리
  if (input.isShortTerm || input.holdingYears < 1) {
    return {
      rate: TRANSFER_TAX.shortTerm.lessThan1Year, // 40%
      description: '주택 1년 미만 40%',
      useSurcharge: false,
    };
  }

  // 주택: 2년 미만
  if (input.holdingYears < 2) {
    return {
      rate: TRANSFER_TAX.shortTerm.lessThan2YearsHouse, // 40%
      description: '주택 2년 미만 40%',
      useSurcharge: false,
    };
  }

  // 주택: 2년 이상 → 기본 누진세율 (조정지역 중과 가능)
  return {
    rate: -1, // 누진세 마커 (-1은 processeTax에서 progressiveTax 호출 신호)
    description: '기본 누진세율',
    useSurcharge: true,
  };
}

// ============================================
// 메인 함수: calculateTransferTax
// ============================================

export function calculateTransferTax(input: TransferInput): TransferResult {
  const warnings: string[] = [];

  // ─── 입력 검증 ───
  if (input.salePrice <= 0 || input.acquisitionPrice < 0) {
    warnings.push('입력값이 유효하지 않습니다.');
    return {
      capitalGain: 0,
      longTermHoldingDeduction: 0,
      transferIncome: 0,
      basicDeduction: TRANSFER_TAX.annualBasicDeduction,
      taxableBase: 0,
      appliedRate: 0,
      rateDescription: '오류',
      grossTax: 0,
      localIncomeTax: 0,
      totalTax: 0,
      nontaxableAmount: 0,
      warnings,
    };
  }

  // ─── MVP 범위 외 케이스 경고 ───
  if (input.assetType !== 'house' && input.assetType !== 'subscription-right') {
    warnings.push('본 계산은 주택·분양권만 지원합니다. 토지·기타 자산은 전문가 상담을 권장합니다.');
  }

  if (
    input.caseType !== 'general' &&
    input.caseType !== 'oneHouseOneHousehold' &&
    input.caseType !== 'temporaryTwoHouses'
  ) {
    warnings.push('본 계산은 일반·1세대1주택·일시적2주택 3가지 케이스만 지원합니다.');
  }

  // ─── 양도차익 계산 ───
  const capitalGain = Math.max(
    0,
    input.salePrice - input.acquisitionPrice - Math.max(0, input.necessaryExpenses)
  );

  if (capitalGain === 0) {
    warnings.push('양도차익이 0원이므로 세금이 없습니다.');
    return {
      capitalGain: 0,
      longTermHoldingDeduction: 0,
      transferIncome: 0,
      basicDeduction: TRANSFER_TAX.annualBasicDeduction,
      taxableBase: 0,
      appliedRate: 0,
      rateDescription: '손실 또는 차익 없음',
      grossTax: 0,
      localIncomeTax: 0,
      totalTax: 0,
      nontaxableAmount: capitalGain,
      warnings,
    };
  }

  // ─── 1세대1주택 비과세 처리 ───
  const { adjustedCapitalGain, nontaxableAmount } = applyOneHouseNonTax(
    input.salePrice,
    capitalGain,
    input.caseType
  );

  if (adjustedCapitalGain === 0) {
    return {
      capitalGain,
      longTermHoldingDeduction: 0,
      transferIncome: 0,
      basicDeduction: TRANSFER_TAX.annualBasicDeduction,
      taxableBase: 0,
      appliedRate: 0,
      rateDescription: '1세대1주택 전액 비과세',
      grossTax: 0,
      localIncomeTax: 0,
      totalTax: 0,
      nontaxableAmount,
      warnings,
    };
  }

  // ─── 장기보유특별공제 ───
  const longTermHoldingDeduction = calculateLongTermHoldingDeduction(
    input.caseType,
    adjustedCapitalGain,
    input.holdingYears,
    input.residentYears
  );

  // ─── 양도소득금액 ───
  const transferIncome = Math.max(0, adjustedCapitalGain - longTermHoldingDeduction);

  // ─── 기본공제 ───
  const basicDeduction = TRANSFER_TAX.annualBasicDeduction;

  // ─── 과세표준 ───
  const taxableBase = Math.max(0, transferIncome - basicDeduction);

  if (taxableBase === 0) {
    return {
      capitalGain,
      longTermHoldingDeduction,
      transferIncome,
      basicDeduction,
      taxableBase: 0,
      appliedRate: 0,
      rateDescription: '기본공제로 소멸',
      grossTax: 0,
      localIncomeTax: 0,
      totalTax: 0,
      nontaxableAmount,
      warnings,
    };
  }

  // ─── 세율 결정 ───
  const rateResult = resolveRate(input);

  // ─── 산출세액 계산 ───
  let grossTax = 0;
  if (rateResult.rate === -1) {
    // 누진세율 적용
    grossTax = calculateProgressiveTax(taxableBase, INCOME_TAX_BRACKETS);

    // 조정지역 중과 가산 (누진세 적용 시에만)
    if (rateResult.useSurcharge && input.adjustedAreaSurcharge !== 'none') {
      const surchargeRate =
        input.adjustedAreaSurcharge === 'twoHouses'
          ? TRANSFER_TAX.adjustedAreaSurcharge.twoHouses
          : TRANSFER_TAX.adjustedAreaSurcharge.threeOrMoreHouses;
      const surchargeAmount = Math.floor(taxableBase * surchargeRate);
      grossTax += surchargeAmount;
    }
  } else {
    // 고정 세율
    grossTax = Math.floor(taxableBase * rateResult.rate);
  }

  // 10원 단위 절사
  grossTax = Math.floor(grossTax / 10) * 10;

  // ─── 지방소득세 ───
  const localIncomeTax = Math.floor((grossTax * LOCAL_INCOME_TAX_RATE) / 10) * 10;

  // ─── 총 납부액 ───
  const totalTax = grossTax + localIncomeTax;

  // ─── 추가 경고 ───
  if (
    rateResult.useSurcharge &&
    input.adjustedAreaSurcharge !== 'none' &&
    !rateResult.rate.toString().includes('조정지역')
  ) {
    if (input.adjustedAreaSurcharge === 'twoHouses') {
      warnings.push('조정지역 2주택이므로 기본 누진세율에 20%p 가산되었습니다.');
    } else if (input.adjustedAreaSurcharge === 'threeOrMoreHouses') {
      warnings.push('조정지역 3주택 이상이므로 기본 누진세율에 30%p 가산되었습니다.');
    }
  }

  if (input.caseType === 'temporaryTwoHouses' && input.salePrice > TRANSFER_TAX.oneHouseholdOneHouseNonTaxCap) {
    warnings.push(
      '일시적 2주택 비과세는 12억 이하 조건입니다. 초과분은 과세 대상입니다.'
    );
  }

  return {
    capitalGain,
    longTermHoldingDeduction,
    transferIncome,
    basicDeduction,
    taxableBase,
    appliedRate: rateResult.rate === -1 ? -1 : rateResult.rate,
    rateDescription: rateResult.description,
    grossTax,
    localIncomeTax,
    totalTax,
    nontaxableAmount,
    warnings,
  };
}
