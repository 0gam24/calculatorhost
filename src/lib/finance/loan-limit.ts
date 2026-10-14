/**
 * 대출한도 계산 (DSR·LTV·DTI·스트레스 DSR·주담대 최대한도) — 순수 함수
 *
 * 근거: 은행업감독규정 등 금융위원회 고시와 가계부채 관리방안
 * (6·27 대책 2025-06-27, 10·15 대책 2025-10-15, 2026-04-01 관리방안, 2026-06-30 규제지역 추가, 8·13 대책 2026-08-13)
 * 상수와 출처: src/lib/constants/loan-rules-2026.ts
 * (2026-10-14 개정: 이전 근거 표기 "은행법 시행령 §24의4"는 확인되지 않아 삭제)
 *
 * 명세: docs/calculator-spec/대출한도.md
 *
 * ⚠️ 모든 수정은 calc-logic-verifier 에이전트 통과 후.
 */

import {
  type RegionType,
  type LenderType,
  type HousingStatus,
  type RateType,
  MAX_TERM_YEARS_CAPITAL,
  getLtvRate,
  getDsrLimit,
  getDtiLimit,
  getMortgageCap,
  getStressAddOnPercent,
  isCapitalOrRegulated,
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

  /** 금리 유형 (기본 변동형). 스트레스 가산 비율을 정한다 */
  rateType?: RateType;

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

  /** 주택구입 목적 주담대 최대한도 (원). 한도가 없으면 null */
  mortgageCap: number | null;

  /** 최종 한도 (DSR·LTV·DTI·최대한도·담보가치 중 최솟값) (원) */
  finalLimit: number;

  /** 결정적 제약 요인 (CAP = 주담대 최대한도) */
  bindingConstraint: 'DSR' | 'LTV' | 'DTI' | 'CAP' | 'collateral';

  /** 최종 한도 기준 월 예상 상환액 (원). 실제 약정금리 기준 */
  monthlyPaymentAtLimit: number;

  /** DSR 한도 계산에 더한 스트레스 금리 (%p). 스트레스 미적용이면 null */
  appliedStressRate: number | null;

  /** 주의 사항 및 경고 메시지 */
  warnings: string[];
}

// ============================================
// 유틸리티 함수
// ============================================

/** 스트레스 가산 금리 (%p). 미적용이면 null */
function getStressAddOn(input: LoanLimitInput): number | null {
  if (!(input.applyStressDsr ?? true)) return null;
  return getStressAddOnPercent(input.region, input.rateType ?? 'variable');
}

/** DSR 한도 계산 금리 (%) = 약정금리 + 스트레스 가산 */
function getDsrRate(input: LoanLimitInput): number {
  return input.newLoanAnnualRate + (getStressAddOn(input) ?? 0);
}

/** 수도권·규제지역은 만기 최장 30년 (6·27 대책) */
function getEffectiveTermYears(input: LoanLimitInput): number {
  return isCapitalOrRegulated(input.region)
    ? Math.min(input.newLoanTermYears, MAX_TERM_YEARS_CAPITAL)
    : input.newLoanTermYears;
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

  // 스트레스 금리를 더한 금리로 원리금을 계산 (한도 산정 전용)
  const monthlyFactor = monthlyPaymentFactorPerWon(
    getDsrRate(input),
    getEffectiveTermYears(input),
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
 * LTV = 신규 주담대 / 담보가치 ≤ 한도(40~80%)
 * → 신규 주담대 최대 = 담보가치 × LTV비율
 */
function calculateLtvLimit(input: LoanLimitInput): number {
  const ltvRate = getLtvRate(input.region, input.housingStatus);
  // 정수 퍼센트로 곱한 뒤 나눠 부동소수 오차를 없앤다 (7억 × 0.7 = 489,999,999.99… 방지, 2026-10-14)
  const ltvPercent = Math.round(ltvRate * 100);
  return Math.floor((input.collateralValue * ltvPercent) / 100);
}

/**
 * DTI 한도 기반 신규 대출 최대 원금 계산
 * DTI = (신규 원리금 + 기존 이자) / 연소득 ≤ 한도(규제지역 40%, 그 밖의 지역 60%)
 * 역산: 신규 원리금 가능액 = 연소득 × DTI한도 - 기존 이자
 * → 신규 원금 = 신규 원리금 / (월factor × 12)
 */
function calculateDtiLimit(input: LoanLimitInput): number {
  const dtiLimit = getDtiLimit(input.region);

  // DTI는 스트레스 미적용 명목율 사용 (스트레스 가산은 DSR 전용)
  const monthlyFactor = monthlyPaymentFactorPerWon(
    input.newLoanAnnualRate,
    getEffectiveTermYears(input),
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
 * DSR·LTV·DTI, 주택구입 주담대 최대한도(수도권·규제지역 6억·4억·2억)와 담보가치를 교차 검증하여 최종 한도 결정
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
      mortgageCap: null,
      finalLimit: 0,
      bindingConstraint: 'collateral',
      monthlyPaymentAtLimit: 0,
      appliedStressRate: null,
      warnings,
    };
  }

  // ========== 한도 계산 ==========
  const dsrLimit = calculateDsrLimit(input);
  const ltvLimit = calculateLtvLimit(input);
  const dtiLimit = calculateDtiLimit(input);
  const mortgageCap = getMortgageCap(input.region, input.collateralValue, input.housingStatus);

  // ========== 최종 한도 결정 ==========
  const limits = [dsrLimit, ltvLimit, dtiLimit, input.collateralValue];
  if (mortgageCap !== null) limits.push(mortgageCap);
  const finalLimit = Math.min(...limits);

  // 결정적 제약 식별
  let bindingConstraint: LoanLimitResult['bindingConstraint'];
  if (finalLimit === input.collateralValue) {
    bindingConstraint = 'collateral';
  } else if (finalLimit === dsrLimit) {
    bindingConstraint = 'DSR';
  } else if (finalLimit === ltvLimit) {
    bindingConstraint = 'LTV';
  } else if (mortgageCap !== null && finalLimit === mortgageCap) {
    bindingConstraint = 'CAP';
  } else {
    bindingConstraint = 'DTI';
  }

  // ========== 월 상환액 계산 (실제 약정금리, 2026-10-14 정정: 스트레스 금리는 한도 계산에만 쓴다) ==========
  let monthlyPaymentAtLimit = 0;
  if (finalLimit > 0) {
    const monthlyFactor = monthlyPaymentFactorPerWon(
      input.newLoanAnnualRate,
      getEffectiveTermYears(input),
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

  // 수도권·규제지역 만기 30년 초과 선택
  if (isCapitalOrRegulated(input.region) && input.newLoanTermYears > MAX_TERM_YEARS_CAPITAL) {
    warnings.push(
      `수도권·규제지역 주택담보대출은 만기가 최장 ${MAX_TERM_YEARS_CAPITAL}년이라 ${MAX_TERM_YEARS_CAPITAL}년으로 계산했습니다.`
    );
  }

  const appliedStressRate = getStressAddOn(input);

  return {
    dsrLimit,
    ltvLimit,
    dtiLimit,
    mortgageCap,
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
