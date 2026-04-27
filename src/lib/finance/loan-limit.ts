/**
 * 대출한도 계산 (DSR·LTV·DTI) — 순수 함수
 *
 * 법적 근거:
 * - 은행법 시행령 §24의4 (DSR 기준)
 * - 여신심사 선진화 가이드라인 (금융위원회·금융감독원)
 * - 주택담보대출 LTV·DTI 규제 (금감원 고시)
 *
 * 명세: docs/calculator-spec/대출한도.md
 *
 * ⚠️ 모든 수정은 calc-logic-verifier 에이전트 통과 후.
 */

import {
  type RegionType,
  type LenderType,
  type HousingStatus,
  STRESS_DSR_RATE_2026,
  getLtvRate,
  getDsrLimit,
  getDtiLimit,
} from '../constants/loan-rules-2026';

// ============================================
// 타입 정의
// ============================================

export type RepaymentType = 'amortization' | 'principal-equal' | 'bullet';

export interface LoanLimitInput {
  /** 연소득 (원) */
  annualIncome: number;

  /** 기존 대출 연 원리금 합 (원) — DSR 용 */
  existingDebtAnnualPayment: number;

  /** 기존 대출 연 이자 합 (원) — DTI 용 */
  existingDebtAnnualInterest: number;

  /** 담보 가치 (주택가격, 원) */
  collateralValue: number;

  /** 지역 유형 */
  region: RegionType;

  /** 주택 구입 상태 */
  housingStatus: HousingStatus;

  /** 금융기관 유형 */
  lender: LenderType;

  /** 신규 대출 연 이자율 (%) — 소수점 2자리 이하 */
  newLoanAnnualRate: number;

  /** 신규 대출 기간 (년) */
  newLoanTermYears: number;

  /** 스트레스 DSR 적용 (기본 true) */
  applyStressDsr?: boolean;

  /** 상환 방식 */
  repaymentType: RepaymentType;
}

export interface LoanLimitResult {
  /** DSR 기준 최대 신규 대출 원금 (원) */
  dsrLimit: number;

  /** LTV 기준 최대 신규 대출 원금 (원) */
  ltvLimit: number;

  /** DTI 기준 최대 신규 대출 원금 (원) */
  dtiLimit: number;

  /** 최종 한도 (3개 중 최솟값 및 담보가치 상한) (원) */
  finalLimit: number;

  /** 결정적 제약 요인 */
  bindingConstraint: 'DSR' | 'LTV' | 'DTI' | 'collateral';

  /** 최종 한도 기준 월 예상 상환액 (원) */
  monthlyPaymentAtLimit: number;

  /** 실제 적용 금리 (%) — 스트레스 가산 포함 시 */
  appliedStressRate: number | null;

  /** 주의 사항 및 경고 메시지 */
  warnings: string[];
}

// ============================================
// 유틸리티 함수
// ============================================

/**
 * 스트레스 DSR 적용 여부에 따른 실제 금리 계산 (%)
 * @param annualRate 명목 연 이자율 (%)
 * @param applyStressDsr 스트레스 적용 여부
 * @returns 실제 적용 금리 (%)
 */
function getEffectiveRate(
  annualRate: number,
  applyStressDsr: boolean
): number {
  if (!applyStressDsr) {
    return annualRate;
  }
  // 스트레스율은 %p 단위이므로 그대로 더함
  return annualRate + STRESS_DSR_RATE_2026 * 100;
}

/**
 * 월 이자율 계산 (소수)
 * @param annualRate 연 이자율 (%)
 * @returns 월 이자율 (소수, 예: 0.003 = 0.3%)
 */
function getMonthlyRate(annualRate: number): number {
  return annualRate / 12 / 100;
}

/**
 * 상환 방식별 원금 1원당 월 상환액 계산
 * 목적: DSR 계산 시 월별 상환액 → 연간 환산
 *
 * 원리금균등: P * r(1+r)^n / ((1+r)^n - 1)
 * 0% 엣지: P / n
 *
 * 원금균등: 첫달 최대 (P/n + P*r), DSR은 첫달 기준
 *
 * 만기일시: 월 이자만 (P*r), 원금 상환 없음
 *           하지만 DSR 규정상 원금을 만기 시점에 일시 상환으로 간주 →
 *           연간 환산 = (원금 + 원금×연이율) / 12개월 근사
 *           (정확한 만기일시 DSR은 금감원 세부 지침 참조 필수)
 *
 * @param annualRate 연 이자율 (%)
 * @param termYears 대출 기간 (년)
 * @param repaymentType 상환 방식
 * @returns 원금 1원당 월 상환액 (원) — 연 환산 시 ×12
 */
function monthlyPaymentFactorPerWon(
  annualRate: number,
  termYears: number,
  repaymentType: RepaymentType
): number {
  if (termYears <= 0) {
    return 0;
  }

  const monthlyRate = getMonthlyRate(annualRate);
  const totalMonths = Math.round(termYears * 12);

  if (totalMonths <= 0) {
    return 0;
  }

  switch (repaymentType) {
    case 'amortization': {
      // 원리금균등: 월상환액 = P * r(1+r)^n / ((1+r)^n - 1)
      // 단위 원금(1원)으로 정규화
      if (monthlyRate === 0) {
        // 0% 이자: 월상환액 = 1 / n
        return 1 / totalMonths;
      }

      const numerator = monthlyRate * Math.pow(1 + monthlyRate, totalMonths);
      const denominator = Math.pow(1 + monthlyRate, totalMonths) - 1;
      return numerator / denominator;
    }

    case 'principal-equal': {
      // 원금균등: 첫달 = P/n + P*r, DSR 기준은 첫달
      // 단위 원금(1원): 첫달 = 1/n + 1*r
      return 1 / totalMonths + monthlyRate;
    }

    case 'bullet': {
      // 만기일시: 월 이자 = P*r, DSR 규정상 연간 환산
      // 규정: 원금은 만기 일시 상환 → 연간 분할 간주
      // 근사: (P + P*annual_rate/100) / 12 ≈ (1 + annual_rate/100) / 12
      // 단위 원금(1원): (1 + annualRate/100) / 12
      return (1 + annualRate / 100) / 12;
    }
  }
}

/**
 * DSR 한도 기반 신규 대출 최대 원금 계산
 * DSR = (기존 연원리금 + 신규 연원리금) / 연소득 ≤ 한도(40% 또는 50%)
 * 역산: 신규 연원리금 가능액 = 연소득 × DSR한도 - 기존 연원리금
 * → 신규 원금 = 신규 연원리금 / (월factor × 12)
 */
function calculateDsrLimit(input: LoanLimitInput): number {
  const dsrLimit = getDsrLimit(input.lender);
  const effectiveRate = getEffectiveRate(
    input.newLoanAnnualRate,
    input.applyStressDsr ?? true
  );

  // 스트레스 금리 반영 시 실제 DSR 계산 금리
  const monthlyFactor = monthlyPaymentFactorPerWon(
    effectiveRate,
    input.newLoanTermYears,
    input.repaymentType
  );

  // 연간 기준 DSR 가용액 = 연소득 × 한도 - 기존 연원리금
  const allowedAnnualPayment =
    input.annualIncome * dsrLimit - input.existingDebtAnnualPayment;

  if (allowedAnnualPayment <= 0) {
    return 0;
  }

  // 월 상환액 기준으로 역산
  const monthlyAllowed = allowedAnnualPayment / 12;

  // 원금 = 월상환액 / 월factor
  // monthlyFactor는 원금 1원당 월상환액이므로
  const principalFromDsr =
    monthlyFactor > 0 ? monthlyAllowed / monthlyFactor : 0;

  return Math.floor(principalFromDsr);
}

/**
 * LTV 한도 기반 신규 대출 최대 원금 계산
 * LTV = 신규 주담대 / 담보가치 ≤ 한도(50~80%)
 * → 신규 주담대 최대 = 담보가치 × LTV비율
 */
function calculateLtvLimit(input: LoanLimitInput): number {
  const ltvRate = getLtvRate(input.region, input.housingStatus);
  return Math.floor(input.collateralValue * ltvRate);
}

/**
 * DTI 한도 기반 신규 대출 최대 원금 계산
 * DTI = (신규 원리금 + 기존 이자) / 연소득 ≤ 한도(40% 또는 50%)
 * 역산: 신규 원리금 가능액 = 연소득 × DTI한도 - 기존 이자
 * → 신규 원금 = 신규 원리금 / (월factor × 12)
 */
function calculateDtiLimit(input: LoanLimitInput): number {
  const dtiLimit = getDtiLimit(input.region);

  // DTI는 스트레스 미적용 명목율 사용 (DSR과 달리 보수적 차이)
  const monthlyFactor = monthlyPaymentFactorPerWon(
    input.newLoanAnnualRate,
    input.newLoanTermYears,
    input.repaymentType
  );

  // 연간 기준 DTI 가용액 = 연소득 × 한도 - 기존 이자
  const allowedAnnualPrincipalInterest =
    input.annualIncome * dtiLimit - input.existingDebtAnnualInterest;

  if (allowedAnnualPrincipalInterest <= 0) {
    return 0;
  }

  // 월 상환액 기준으로 역산
  const monthlyAllowed = allowedAnnualPrincipalInterest / 12;

  const principalFromDti =
    monthlyFactor > 0 ? monthlyAllowed / monthlyFactor : 0;

  return Math.floor(principalFromDti);
}

// ============================================
// 메인 계산 함수
// ============================================

/**
 * 대출한도 종합 계산
 * 3개 규제(DSR·LTV·DTI)와 담보가치를 교차 검증하여 최종 한도 결정
 */
export function calculateLoanLimit(input: LoanLimitInput): LoanLimitResult {
  const warnings: string[] = [];

  // ========== 입력값 검증 ==========
  if (input.annualIncome < 0) {
    warnings.push('연소득이 음수입니다. 0으로 처리합니다.');
  }
  if (input.newLoanAnnualRate < 0) {
    warnings.push('연 이자율이 음수입니다. 0으로 처리합니다.');
  }
  if (input.newLoanTermYears <= 0) {
    warnings.push('대출 기간은 0보다 커야 합니다.');
  }
  if (input.collateralValue < 0) {
    warnings.push('담보가치가 음수입니다. 0으로 처리합니다.');
  }

  // 조건이 맞지 않으면 즉시 0 반환
  if (
    input.annualIncome < 0 ||
    input.newLoanTermYears <= 0 ||
    input.collateralValue < 0
  ) {
    return {
      dsrLimit: 0,
      ltvLimit: 0,
      dtiLimit: 0,
      finalLimit: 0,
      bindingConstraint: 'collateral',
      monthlyPaymentAtLimit: 0,
      appliedStressRate: null,
      warnings,
    };
  }

  // ========== 3개 한도 계산 ==========
  const dsrLimit = calculateDsrLimit(input);
  const ltvLimit = calculateLtvLimit(input);
  const dtiLimit = calculateDtiLimit(input);

  // ========== 최종 한도 결정 ==========
  const limits = [dsrLimit, ltvLimit, dtiLimit, input.collateralValue];
  const finalLimit = Math.min(...limits);

  // 결정적 제약 식별
  let bindingConstraint: 'DSR' | 'LTV' | 'DTI' | 'collateral';
  if (finalLimit === input.collateralValue) {
    bindingConstraint = 'collateral';
  } else if (finalLimit === dsrLimit) {
    bindingConstraint = 'DSR';
  } else if (finalLimit === ltvLimit) {
    bindingConstraint = 'LTV';
  } else {
    bindingConstraint = 'DTI';
  }

  // ========== 월 상환액 계산 ==========
  let monthlyPaymentAtLimit = 0;
  if (finalLimit > 0) {
    const effectiveRate = getEffectiveRate(
      input.newLoanAnnualRate,
      input.applyStressDsr ?? true
    );
    const monthlyFactor = monthlyPaymentFactorPerWon(
      effectiveRate,
      input.newLoanTermYears,
      input.repaymentType
    );
    monthlyPaymentAtLimit = Math.floor(finalLimit * monthlyFactor);
  }

  // ========== 경고 메시지 추가 ==========

  // 기존 대출이 이미 DSR 한도 초과
  const dsrLimitValue = getDsrLimit(input.lender);
  if (
    input.annualIncome > 0 &&
    input.existingDebtAnnualPayment > input.annualIncome * dsrLimitValue
  ) {
    warnings.push(
      '현재 기존 대출의 DSR이 한도를 초과하고 있습니다. 추가 대출이 불가능할 수 있습니다.'
    );
  }

  // 최종 한도가 0
  if (finalLimit === 0) {
    warnings.push('현재 조건으로는 추가 대출이 불가능합니다.');
  }

  // ========== 스트레스 금리 반영 안내 ==========
  const appliedStressRate = input.applyStressDsr ?? true ? STRESS_DSR_RATE_2026 * 100 : null;

  return {
    dsrLimit,
    ltvLimit,
    dtiLimit,
    finalLimit,
    bindingConstraint,
    monthlyPaymentAtLimit,
    appliedStressRate,
    warnings,
  };
}

/**
 * 헬퍼: 월 상환액으로부터 원금 역산
 * (UI에서 사용 가능: "월 100만원으로 얼마까지 빌릴 수 있나?")
 */
export function calculatePrincipalFromMonthlyPayment(
  monthlyPayment: number,
  annualRate: number,
  termYears: number,
  repaymentType: RepaymentType
): number {
  const monthlyFactor = monthlyPaymentFactorPerWon(
    annualRate,
    termYears,
    repaymentType
  );

  if (monthlyFactor <= 0) {
    return 0;
  }

  return Math.floor(monthlyPayment / monthlyFactor);
}
