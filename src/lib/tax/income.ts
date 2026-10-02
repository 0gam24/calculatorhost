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
import {
  WITHHOLDING_ROWS_2026,
  WITHHOLDING_HIGH_WAGE_BRACKETS_2026,
} from '@/lib/constants/withholding-table-2026';
import { calculateMonthlyWithholding, type WithholdingRate } from './withholding';

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
  /** 기본공제대상 가족에 포함된 8~20세 자녀 수(본인 제외 가족 수 이내) */
  children: number;
  /** 2026년 급여 지급·원천징수 월(1~12). 보험 적용월도 같다고 가정. 생략 시 7월 */
  calculationMonth?: number;
  withholdingRate?: WithholdingRate;
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
  withholdingReferenceTax: number;
  withholdingRate: WithholdingRate;
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

export interface GrossFromNetResult {
  annualGrossIncome: number;
  achievedMonthlyNet: number;
  /** 달성 실수령액 − 목표 실수령액. 양수는 목표 초과. */
  difference: number;
  targetMatched: boolean;
  atSearchLimit: boolean;
}

/**
 * 월급의 원 단위 후보를 비교하는 역산(연봉 최대10억원).
 * 공식 표와 연금의 계단 때문에 전체에 대한 단일 이분 탐색은 사용할 수 없다.
 * 모든 표·고액세율·연금 경계를 분리한 뒤 끝점과 목표 근처 후보를 실제 재계산한다.
 * 달성 불가능한 목표와 탐색 한계는 반환값으로 드러낸다. 같은 오차는 낮은 연봉을 선택.
 */
export function inferGrossFromNetDetailed(
  targetMonthlyNet: number,
  options: Omit<IncomeCalculationInput, 'wageType' | 'wageAmount' | 'severance'>,
): GrossFromNetResult {
  if (!Number.isFinite(targetMonthlyNet) || targetMonthlyNet < 0) {
    throw new RangeError('목표 월 실수령액은 0 이상인 유한한 금액이어야 합니다.');
  }
  const input = { wageType: 'monthly' as const, wageAmount: 0, severance: 'separate' as const, ...options };
  calculateTakeHome(input); // 금액·가족·월·비율 검증을 정방향과 공유.
  const maximum = Math.floor(1_000_000_000 / 12);
  const nonTaxable = options.nontaxableMonthly;
  const month = options.calculationMonth ?? 7;
  const rate = options.withholdingRate ?? 100;
  let bestGross = 0;
  let bestNet = 0;
  let bestDistance = targetMonthlyNet;
  const cache = new Map<number, number>();
  const netAt = (gross: number): number => {
    let net = cache.get(gross);
    if (net === undefined) {
      net = calculateTakeHome({ ...input, wageAmount: gross }).monthlyNetIncome;
      cache.set(gross, net);
    }
    const distance = Math.abs(net - targetMonthlyNet);
    if (distance < bestDistance || (distance === bestDistance && gross < bestGross)) {
      bestDistance = distance;
      bestGross = gross;
      bestNet = net;
    }
    return net;
  };
  if (targetMonthlyNet > 0) {
    const boundaries = new Set<number>([0, maximum + 1]);
    const addTaxableBoundary = (taxable: number) => {
      const gross = nonTaxable + taxable;
      if (gross > 0 && gross <= maximum && Number.isSafeInteger(gross)) boundaries.add(gross);
    };
    addTaxableBoundary(1); // 무급여→최소 국민연금의 별도 계단.
    for (const row of WITHHOLDING_ROWS_2026) {
      addTaxableBoundary(row.lower);
      addTaxableBoundary(row.upper);
    }
    addTaxableBoundary(10_000_001); // 정확히1천만원 행과 고액 가산식의 불연속.
    const { lowerMonthly, upperMonthly } = getPensionBounds(month);
    for (let taxable = lowerMonthly + 1_000; taxable <= upperMonthly; taxable += 1_000) {
      addTaxableBoundary(taxable);
    }
    for (const bracket of WITHHOLDING_HIGH_WAGE_BRACKETS_2026) {
      addTaxableBoundary(bracket.lowerExclusive + 1);
      const upper = Math.min(bracket.upperInclusive ?? maximum, maximum - nonTaxable);
      let lo = bracket.lowerExclusive + 1;
      let hi = upper;
      // 가족11명 초과 조정 후 고액 구간 내부에서 소액부징수가 끝나는 경우도 분리.
      if (lo <= hi && calculateMonthlyWithholding(hi, options.dependents, options.children, month, rate).incomeTax > 0) {
        while (lo < hi) {
          const middle = Math.floor((lo + hi) / 2);
          if (calculateMonthlyWithholding(middle, options.dependents, options.children, month, rate).incomeTax > 0) hi = middle;
          else lo = middle + 1;
        }
        addTaxableBoundary(lo);
      }
    }
    const ordered = [...boundaries].sort((a, b) => a - b);
    const segments = ordered.slice(0, -1).map((start, index) => {
      const end = ordered[index + 1]! - 1;
      const startNet = netAt(start);
      const endNet = netAt(end);
      return { start, end, startNet, endNet };
    });
    for (const { start, end, startNet, endNet } of segments) {
      // 구간 내 끝수 처리의 작은 요동을 포함한다. 큰 불연속은 위에서 이미 분리했다.
      const outside = targetMonthlyNet < Math.min(startNet, endNet) - 32 ||
        targetMonthlyNet > Math.max(startNet, endNet) + 32;
      const endpointDistance = Math.min(Math.abs(startNet - targetMonthlyNet), Math.abs(endNet - targetMonthlyNet));
      if (outside && endpointDistance > bestDistance + 32) continue;
      let lo = start;
      let hi = end;
      while (lo < hi) {
        const middle = Math.floor((lo + hi) / 2);
        if (netAt(middle) < targetMonthlyNet) lo = middle + 1;
        else hi = middle;
      }
      // 같은 구간의 끝수 오차 합은32원 미만, 순증 기울기는0.35 이상이다.
      // ±128원 재계산으로 비단조 끝수·동일 실수령 후보를 비교한다.
      for (let gross = Math.max(start, lo - 128); gross <= Math.min(end, lo + 128); gross++) netAt(gross);
      if (start < end) { netAt(start + 1); netAt(end - 1); }
    }
  }
  return {
    annualGrossIncome: bestGross * 12,
    achievedMonthlyNet: bestNet,
    difference: bestNet - targetMonthlyNet,
    targetMatched: bestNet === targetMonthlyNet,
    atSearchLimit: bestGross === maximum,
  };
}

/** 기존 숫자 반환 API. 잘못된 목표값의0 반환 호환성만 유지한다. */
export function inferGrossFromNet(
  targetMonthlyNet: number,
  options: Omit<IncomeCalculationInput, 'wageType' | 'wageAmount' | 'severance'>,
): number {
  if (!Number.isFinite(targetMonthlyNet) || targetMonthlyNet <= 0) return 0;
  return inferGrossFromNetDetailed(targetMonthlyNet, options).annualGrossIncome;
}

/**
 * 종합 실수령액 계산 (메인 엔트리)
 */
export function calculateTakeHome(input: IncomeCalculationInput): IncomeCalculationResult {
  if (!Number.isSafeInteger(input.nontaxableMonthly)) {
    throw new RangeError('월 비과세액은 안전한 원 단위 정수여야 합니다.');
  }
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
  if (!Number.isSafeInteger(monthlyGrossIncome)) {
    throw new RangeError('정규화 월급은 안전한 원 단위 정수 범위여야 합니다.');
  }
  const monthlyNontaxable = Math.min(monthlyGrossIncome, input.nontaxableMonthly);
  const monthlyTaxableIncome = Math.max(0, monthlyGrossIncome - monthlyNontaxable);
  const withholdingRate = input.withholdingRate ?? 100;
  const withholding = calculateMonthlyWithholding(
    monthlyTaxableIncome, input.dependents, input.children, calculationMonth, withholdingRate,
  );

  // 2. 4대보험
  const pension = calculatePension(monthlyTaxableIncome, calculationMonth);
  const health = calculateHealth(monthlyTaxableIncome);
  const longTermCare = calculateLongTermCare(health);
  const employment = calculateEmployment(monthlyTaxableIncome);

  // 3. 소득세
  const incomeTax = withholding.incomeTax;
  // 지방세법103의13: 징수하는 소득세의10%. 특별징수는 일반 고지서2천원 부징수와 다르다.
  // 지방세기본법59조·국고금관리법47조: 최종 지방소득세의10원 미만 끝수 버림.
  const localNumerator = Math.round(LOCAL_INCOME_TAX_RATE * 100);
  const localIncomeTax = Number(BigInt(incomeTax) * BigInt(localNumerator) / 1_000n) * 10;

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
    withholdingReferenceTax: withholding.referenceTax,
    withholdingRate,
    localIncomeTax,
    totalInsuranceDeductions: pension + health + longTermCare + employment,
    monthlyNetIncome,
    hourlyWage: Math.floor(monthlyNetIncome / 209),
    annualNetIncome: monthlyNetIncome * 12,
  };
}
