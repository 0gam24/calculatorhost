/**
 * 근로소득세 및 4대보험 계산 — 순수 함수
 *
 * 법적 근거:
 * - 소득세법 §55 (세율)
 * - 소득세법 §47 (근로소득공제), §59의2 (자녀세액공제)
 * - 국민연금법, 국민건강보험법, 고용보험법
 *
 * 상수: src/lib/constants/tax-rates-2026.ts
 * 명세: docs/calculator-spec/연봉실수령액.md
 *
 * ⚠️ 모든 수정은 calc-logic-verifier 에이전트 통과 후.
 */

import {
  INCOME_TAX_BRACKETS,
  SOCIAL_INSURANCE_2026,
  LOCAL_INCOME_TAX_RATE,
  EARNED_INCOME_DEDUCTION_BRACKETS,
  PERSONAL_DEDUCTION,
  CHILD_TAX_CREDIT,
  type TaxBracket,
} from '@/lib/constants/tax-rates-2026';

export type WageType = 'yearly' | 'monthly';
export type SeveranceInclusion = 'separate' | 'included';

export interface IncomeCalculationInput {
  /** 임금 유형 (연봉/월급) */
  wageType: WageType;
  /** 입력 금액 (원). wageType 에 따라 연봉 또는 월급 */
  wageAmount: number;
  /** 연봉에 퇴직금 포함 여부 (연봉 입력 시에만 의미 있음) */
  severance: SeveranceInclusion;
  /** 비과세 월액 (원) */
  nontaxableMonthly: number;
  /** 부양가족 수 (본인 포함) */
  dependents: number;
  /** 자녀세액공제 요건을 충족하는 기본공제대상 자녀·손자녀 수 */
  children: number;
  /** 2026년 적용월 (1~12). 생략 시 7월 이후 기준 */
  calculationMonth?: number;
}

export interface IncomeCalculationResult {
  /** 총급여(연) */
  annualGrossIncome: number;
  /** 월 소득(세전) */
  monthlyGrossIncome: number;
  /** 월 비과세 */
  monthlyNontaxable: number;
  /** 월 과세대상 소득 */
  monthlyTaxableIncome: number;
  /** 계산에 적용한 2026년 월과 국민연금 기준소득월액 범위 */
  calculationMonth: number;
  pensionLowerMonthly: number;
  pensionUpperMonthly: number;

  // 공제 (월)
  pension: number;
  health: number;
  longTermCare: number;
  employment: number;
  incomeTax: number;
  localIncomeTax: number;
  /** 월 보험료 공제 합계. 소득세와 지방소득세 제외. */
  totalInsuranceDeductions: number;

  /** 월 실수령액 */
  monthlyNetIncome: number;

  /** 시급 (월 209 시간 기준) */
  hourlyWage: number;

  /** 연 실수령액 */
  annualNetIncome: number;
}

/**
 * 누진세 계산 — 단계별 초과분 방식
 * 과세표준이 구간에 걸쳐 있을 때 각 구간 초과분에 해당 세율 적용.
 */
export function calculateProgressiveTax(taxableAmount: number, brackets: TaxBracket[]): number {
  if (taxableAmount <= 0) return 0;

  for (const bracket of brackets) {
    if (bracket.upperBound === null || taxableAmount <= bracket.upperBound) {
      return taxableAmount * bracket.rate - bracket.cumulativeDeduction;
    }
  }
  // 이론적으로 도달 불가 (마지막 구간 upperBound === null)
  return 0;
}

/**
 * 근로소득공제
 */
export function calculateEarnedIncomeDeduction(annualGross: number): number {
  if (annualGross <= 0) return 0;

  for (const bracket of EARNED_INCOME_DEDUCTION_BRACKETS) {
    if (bracket.upperBound === null || annualGross <= bracket.upperBound) {
      const prev =
        EARNED_INCOME_DEDUCTION_BRACKETS[EARNED_INCOME_DEDUCTION_BRACKETS.indexOf(bracket) - 1]
          ?.upperBound ?? 0;
      const amount = bracket.fixed + Math.max(0, annualGross - prev) * bracket.rate;
      return bracket.cap ? Math.min(amount, bracket.cap) : amount;
    }
  }
  return 0;
}

/**
 * 국민연금 — 기준소득월액 하/상한 적용
 */
export function getPensionBounds(calculationMonth = 7): {
  lowerMonthly: number;
  upperMonthly: number;
} {
  if (!Number.isInteger(calculationMonth) || calculationMonth < 1 || calculationMonth > 12) {
    throw new RangeError('2026년 적용월은 1~12의 정수여야 합니다.');
  }
  const { pension } = SOCIAL_INSURANCE_2026;
  return calculationMonth >= 7
    ? { lowerMonthly: pension.lowerMonthlyFromJuly, upperMonthly: pension.upperMonthlyFromJuly }
    : { lowerMonthly: pension.lowerMonthly, upperMonthly: pension.upperMonthly };
}

export function calculatePension(monthlyIncome: number, calculationMonth = 7): number {
  const bounds = getPensionBounds(calculationMonth);
  if (!Number.isFinite(monthlyIncome) || monthlyIncome < 0) {
    throw new RangeError('월 소득은 0 이상의 유한한 금액이어야 합니다.');
  }
  // 0원은 무급여 추정으로 처리. 실제 가입·납부예외 여부는 별도 확인.
  if (monthlyIncome === 0) return 0;
  // 국민연금 기준소득월액은 신고 소득에서 천원 미만을 버린 금액.
  const roundedIncome = Math.floor(monthlyIncome / 1_000) * 1_000;
  const base = Math.max(bounds.lowerMonthly, Math.min(roundedIncome, bounds.upperMonthly));
  const { pension } = SOCIAL_INSURANCE_2026;
  return Math.floor(base * pension.employee);
}

/**
 * 건강보험 (근로자 부담)
 */
export function calculateHealth(monthlyIncome: number): number {
  return Math.floor(monthlyIncome * SOCIAL_INSURANCE_2026.health.employee);
}

/**
 * 장기요양 (건강보험료의 일정 비율)
 */
export function calculateLongTermCare(health: number): number {
  return Math.floor(health * SOCIAL_INSURANCE_2026.longTermCare.rateOfHealth);
}

/**
 * 고용보험 (근로자 부담)
 */
export function calculateEmployment(monthlyIncome: number): number {
  // 3,000,000 × 0.009 = 26,999.999999999996 같은 이진소수 오차로 1원 덜 절사하지 않도록 한다.
  const numerator = Math.round(SOCIAL_INSURANCE_2026.employment.employee * 1_000);
  return Math.floor((monthlyIncome * numerator) / 1_000);
}

/**
 * 근로소득세(월) — 연간 과세표준 기반 산출세액 / 12 근사.
 * 국세청 간이세액표를 조회하는 함수가 아니다. 사회보험료 소득공제,
 * 근로소득세액공제·특별공제 및 회사의 원천징수 비율을 반영하지 않는다.
 * 실제 월 원천징수액 또는 연말정산 결정세액과 차이가 날 수 있다.
 */
export function estimateMonthlyIncomeTax(
  annualGross: number,
  nontaxableAnnual: number,
  dependents: number,
  children: number,
): number {
  // 과세표준 산출
  const taxableGross = Math.max(0, annualGross - nontaxableAnnual);
  const earnedDeduction = calculateEarnedIncomeDeduction(taxableGross);
  const personalDeduction = dependents * PERSONAL_DEDUCTION.basic;
  const taxableBase = Math.max(0, taxableGross - earnedDeduction - personalDeduction);

  // 산출세액
  const grossTax = calculateProgressiveTax(taxableBase, INCOME_TAX_BRACKETS);

  // 자녀세액공제
  let childCredit = 0;
  if (children >= 1) childCredit += CHILD_TAX_CREDIT.first;
  if (children >= 2) childCredit += CHILD_TAX_CREDIT.second;
  if (children >= 3) childCredit += (children - 2) * CHILD_TAX_CREDIT.thirdPlus;

  const afterCredits = Math.max(0, grossTax - childCredit);

  // 월 환산 (10원 단위 절사)
  return Math.max(0, Math.floor(afterCredits / 12 / 10) * 10);
}

/**
 * 역산: 월 실수령액 → 세전 연봉 추정.
 *
 * 이분 탐색으로 목표 실수령액을 산출하는 세전 연봉을 찾는다.
 * Naver 검색 "실수령 227만원" 류 키워드 대응. ±오차 1,000원 이내 수렴.
 *
 * 60회 루프 / 0 ~ 1,000,000,000 (10억) 범위 / 클라이언트 실행 < 1ms.
 *
 * @param targetMonthlyNet 목표 월 실수령액 (원)
 * @param options 비과세 / 부양가족 / 자녀 등 (wageType·wageAmount·severance 무시)
 * @returns 세전 연봉 추정치 (원)
 */
export function inferGrossFromNet(
  targetMonthlyNet: number,
  options: Omit<IncomeCalculationInput, 'wageType' | 'wageAmount' | 'severance'>,
): number {
  if (!Number.isFinite(targetMonthlyNet) || targetMonthlyNet <= 0) return 0;

  let lo = 0;
  let hi = 1_000_000_000; // 10억
  let bestGuess = 0;

  for (let i = 0; i < 60; i++) {
    const mid = Math.floor((lo + hi) / 2);
    const result = calculateTakeHome({
      wageType: 'yearly',
      wageAmount: mid,
      severance: 'separate',
      nontaxableMonthly: options.nontaxableMonthly,
      dependents: options.dependents,
      children: options.children,
      calculationMonth: options.calculationMonth,
    });
    if (result.monthlyNetIncome < targetMonthlyNet) {
      lo = mid + 1;
    } else {
      hi = mid;
      bestGuess = mid;
    }
    if (hi - lo <= 1) break;
  }
  return bestGuess || lo;
}

/**
 * 종합 실수령액 계산 (메인 엔트리)
 */
export function calculateTakeHome(input: IncomeCalculationInput): IncomeCalculationResult {
  for (const value of [input.wageAmount, input.nontaxableMonthly]) {
    if (!Number.isFinite(value) || value < 0) {
      throw new RangeError('급여와 비과세 금액은 0 이상의 유한한 금액이어야 합니다.');
    }
  }
  if (
    !Number.isInteger(input.dependents) ||
    input.dependents < 1 ||
    !Number.isInteger(input.children) ||
    input.children < 0
  ) {
    throw new RangeError(
      '부양가족은 본인 포함 1명 이상, 공제대상 자녀는 0명 이상의 정수여야 합니다.',
    );
  }
  const calculationMonth = input.calculationMonth ?? 7;
  const pensionBounds = getPensionBounds(calculationMonth);
  // 1. 연봉 정규화
  let annualGross = input.wageType === 'yearly' ? input.wageAmount : input.wageAmount * 12;

  // 퇴직금 포함 시 13 등분 관점 (일반적 관행: 연봉 ÷ 13 가 월급)
  if (input.wageType === 'yearly' && input.severance === 'included') {
    annualGross = (input.wageAmount * 12) / 13;
  }

  const monthlyGrossIncome = Math.floor(annualGross / 12);
  const monthlyNontaxable = Math.min(monthlyGrossIncome, input.nontaxableMonthly);
  const monthlyTaxableIncome = Math.max(0, monthlyGrossIncome - monthlyNontaxable);

  // 2. 4대보험
  const pension = calculatePension(monthlyTaxableIncome, calculationMonth);
  const health = calculateHealth(monthlyTaxableIncome);
  const longTermCare = calculateLongTermCare(health);
  const employment = calculateEmployment(monthlyTaxableIncome);

  // 3. 소득세
  const nontaxableAnnual = monthlyNontaxable * 12;
  const incomeTax = estimateMonthlyIncomeTax(
    annualGross,
    nontaxableAnnual,
    Math.max(1, input.dependents),
    Math.max(0, input.children),
  );
  const localIncomeTax = Math.floor((incomeTax * LOCAL_INCOME_TAX_RATE) / 10) * 10;

  // 4. 실수령액
  const totalDeductions = pension + health + longTermCare + employment + incomeTax + localIncomeTax;
  const monthlyNetIncome = Math.max(0, monthlyGrossIncome - totalDeductions);

  return {
    annualGrossIncome: Math.floor(annualGross),
    monthlyGrossIncome,
    monthlyNontaxable,
    monthlyTaxableIncome,
    calculationMonth,
    pensionLowerMonthly: pensionBounds.lowerMonthly,
    pensionUpperMonthly: pensionBounds.upperMonthly,
    pension,
    health,
    longTermCare,
    employment,
    incomeTax,
    localIncomeTax,
    totalInsuranceDeductions: pension + health + longTermCare + employment,
    monthlyNetIncome,
    hourlyWage: Math.floor(monthlyNetIncome / 209),
    annualNetIncome: monthlyNetIncome * 12,
  };
}
