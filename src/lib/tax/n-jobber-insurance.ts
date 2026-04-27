/**
 * N잡러 건강보험 계산 — 순수 함수
 *
 * 법적 근거:
 * - 국민건강보험법 §162, §167
 * - 조규 제64조(보험료 산정)
 * - 2026년 기준
 *
 * 명세: docs/calculator-spec/N잡러건강보험.md
 *
 * ⚠️ 모든 수정은 calc-logic-verifier 에이전트 통과 후.
 */

import { SOCIAL_INSURANCE_2026 } from '@/lib/constants/tax-rates-2026';

// ============================================
// 상수
// ============================================

/** 추가소득 인정 기준 (2,000만원) — 국민건강보험법 시행규칙 */
const N_JOBBER_EXTRA_INCOME_THRESHOLD = 20_000_000;

/** 피부양자 자격 상실 소득 기준 (2,000만원) — 국민건강보험법 */
const N_JOBBER_DEPENDENT_LOSS_INCOME_THRESHOLD = 20_000_000;

// ============================================
// 타입 정의
// ============================================

/** N잡러 건강보험 계산 입력 */
export interface NJobberInsuranceInput {
  /** 주 근로소득 (연, 원) */
  mainWageIncome: number;
  /** 부업 사업소득 (연, 원) */
  sideBusinessIncome: number;
  /** 기타 부가소득 (연, 원) — 이자·배당·기타 */
  sideOtherIncome: number;
  /** 현재 피부양자 자격 여부 */
  isDependent: boolean;
}

/** N잡러 건강보험 계산 결과 */
export interface NJobberInsuranceResult {
  /** 총 추가소득 (사업소득 + 기타) */
  totalExtraIncome: number;
  /** 추가소득 월 건보료 (원) */
  extraIncomeMonthlyPremium: number;
  /** 주 근로 월 건보료 (근로자 부담분, 원) */
  monthlyWagePremium: number;
  /** 월 총 건보료 */
  totalMonthlyPremium: number;
  /** 연간 총 건보료 */
  annualPremium: number;
  /** 피부양자 자격 상실 여부 */
  dependentLossRisk: boolean;
  /** 경고 메시지 배열 */
  warnings: string[];
}

// ============================================
// 메인 계산 함수
// ============================================

/**
 * N잡러 건강보험 계산
 *
 * 로직:
 * 1. 주 근로 월 건보료 = 주근로연소득 / 12 × 3.545% (10원 단위 절사)
 * 2. 총 추가소득 = 사업소득 + 기타소득
 * 3. 초과분 = max(0, 총추가소득 - 2000만)
 * 4. 추가 월 건보료 = 초과분 / 12 × 7.09% (10원 단위 절사)
 * 5. 피부양자 상실 판정:
 *    - 현재 피부양자 AND 총추가소득 >= 2000만 → true
 * 6. 경고:
 *    - 피부양자 상실 → 보험료 증가 주의
 *    - 추가보험료 부과 → 알림
 */
export function calculateNJobberInsurance(
  input: NJobberInsuranceInput
): NJobberInsuranceResult {
  const warnings: string[] = [];

  // 1. 주 근로 월 건보료 계산 (근로자 부담분 3.545%)
  const mainMonthly = input.mainWageIncome / 12;
  const monthlyWagePremium = Math.floor(
    (mainMonthly * SOCIAL_INSURANCE_2026.health.employee) / 10
  ) * 10;

  // 2. 총 추가소득 계산
  const totalExtraIncome = input.sideBusinessIncome + input.sideOtherIncome;

  // 3. 초과분 (2000만 이상분) 계산
  const excess = Math.max(0, totalExtraIncome - N_JOBBER_EXTRA_INCOME_THRESHOLD);

  // 4. 추가소득 월 건보료 계산 (총 요율 7.09%, 근로자가 전액 부담)
  const extraIncomeMonthlyPremium = excess > 0
    ? Math.floor(((excess / 12) * SOCIAL_INSURANCE_2026.health.total) / 10) * 10
    : 0;

  // 5. 월 총 건보료
  const totalMonthlyPremium = monthlyWagePremium + extraIncomeMonthlyPremium;

  // 6. 연간 총 건보료
  const annualPremium = totalMonthlyPremium * 12;

  // 7. 피부양자 자격 상실 판정
  const dependentLossRisk =
    input.isDependent &&
    totalExtraIncome >= N_JOBBER_DEPENDENT_LOSS_INCOME_THRESHOLD;

  // 8. 경고 메시지 구성
  if (dependentLossRisk) {
    warnings.push(
      '피부양자 자격 상실 예상입니다. 소득이 2,000만원 이상이면 지역가입자로 전환되어 건강보험료가 크게 증가할 수 있습니다. 국민건강보험공단에 문의하세요.'
    );
  }

  if (excess > 0) {
    warnings.push(
      `부업 또는 기타 소득이 2,000만원을 초과하면 추가 건강보험료가 부과됩니다(월 ${extraIncomeMonthlyPremium.toLocaleString()}원).`
    );
  }

  if (input.mainWageIncome > 0 && input.isDependent) {
    warnings.push(
      '주 근로소득이 있으면서 피부양자 자격을 유지하려면, 추가소득이 2,000만원 미만이어야 합니다. 정확한 조건은 보험공단 확인 필수.'
    );
  }

  return {
    totalExtraIncome,
    extraIncomeMonthlyPremium,
    monthlyWagePremium,
    totalMonthlyPremium,
    annualPremium,
    dependentLossRisk,
    warnings,
  };
}
