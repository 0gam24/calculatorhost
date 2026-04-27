/**
 * 프리랜서 사업소득 및 종합소득세 계산 — 순수 함수
 *
 * 법적 근거:
 * - 소득세법 §55 (종합소득세율)
 * - 소득세법 §80 (종합소득 과세표준)
 * - 소득세법 §127·§129 (원천징수 3.3%)
 * - 소득세법 시행령 §143 (단순경비율)
 *
 * 상수: src/lib/constants/tax-rates-2026.ts
 * 명세: docs/calculator-spec/프리랜서종합소득세.md
 *
 * ⚠️ 모든 수정은 calc-logic-verifier 에이전트 통과 후.
 */

import {
  INCOME_TAX_BRACKETS,
  PERSONAL_DEDUCTION,
  CHILD_TAX_CREDIT,
  LOCAL_INCOME_TAX_RATE,
  FREELANCER_WITHHOLDING_RATE,
  FREELANCER_DEFAULT_SIMPLE_EXPENSE_RATE,
} from '@/lib/constants/tax-rates-2026';
import { calculateProgressiveTax } from './income';

// ============================================
// 타입 정의
// ============================================

export type ExpenseMethod = 'simpleRate' | 'actual';

export interface FreelancerInput {
  /** 연간 총 수입(매출) (원) */
  annualRevenue: number;
  /** 경비 산정 방식 */
  expenseMethod: ExpenseMethod;
  /** 단순경비율 (%), 기본값 64.1 */
  simpleExpenseRatePercent?: number;
  /** 실제 경비 (원), expenseMethod === 'actual' 일 때 사용 */
  actualExpenses?: number;
  /** 기납부 원천징수액 (원), 기본값은 revenue × 0.033 */
  withholdingPaid?: number;
  /** 부양가족 수 (본인 포함), 기본값 1 */
  dependents?: number;
  /** 20세 이하 자녀 수, 기본값 0 */
  children?: number;
  /** 연 국민연금 납부액 (원), 기본값 0 */
  nationalPensionPaid?: number;
  /** 연 건강보험 납부액 (원), 기본값 0 */
  healthInsurancePaid?: number;
}

export interface FreelancerResult {
  /** 연간 총 수입 (원) */
  annualRevenue: number;
  /** 필요경비 (원) */
  expenseAmount: number;
  /** 사업소득 = 수입 - 경비 (원) */
  businessIncome: number;
  /** 인적공제 (원) */
  personalDeduction: number;
  /** 사회보험료 공제 (원) */
  socialInsuranceDeduction: number;
  /** 과세표준 (원) */
  taxableBase: number;
  /** 산출세액 (원) */
  grossTax: number;
  /** 자녀세액공제 (원) */
  childTaxCredit: number;
  /** 결정세액 (지방소득세 제외) (원) */
  finalTax: number;
  /** 지방소득세 (원, 10원 단위 절사) */
  localIncomeTax: number;
  /** 총 세금 = 결정세액 + 지방소득세 (원) */
  totalTaxLiability: number;
  /** 기납부 원천징수액 (원) */
  withholdingPaid: number;
  /** 최종 정산액 (양수=추가납부, 음수=환급) (원) */
  settlementAmount: number;
  /** 경고 메시지 배열 */
  warnings: string[];
}

// ============================================
// 헬퍼 함수
// ============================================

/**
 * 경비 계산
 * - simpleRate: Math.round(revenue × ratePercent / 100) 으로 정수 계산 (부동소수점 오차 최소화)
 * - actual: 입력된 actual expenses 사용 (음수면 0)
 */
export function calculateExpenseAmount(
  revenue: number,
  method: ExpenseMethod,
  simpleRatePercent?: number,
  actualExpenses?: number
): number {
  if (method === 'simpleRate') {
    const rate = simpleRatePercent ?? FREELANCER_DEFAULT_SIMPLE_EXPENSE_RATE;
    // 정수 연산으로 부동소수점 오차 최소화
    return Math.round(revenue * rate / 100);
  }
  // actual method
  return Math.max(0, actualExpenses ?? 0);
}

/**
 * 메인 계산 함수
 */
export function calculateFreelancerTax(input: FreelancerInput): FreelancerResult {
  const revenue = Math.max(0, input.annualRevenue);
  const dependents = Math.max(1, input.dependents ?? 1);
  const children = Math.max(0, input.children ?? 0);
  const nationalPension = Math.max(0, input.nationalPensionPaid ?? 0);
  const healthInsurance = Math.max(0, input.healthInsurancePaid ?? 0);

  // 기납부 원천징수액 (기본값: revenue × 0.033)
  const withholdingPaid =
    input.withholdingPaid !== undefined ? Math.max(0, input.withholdingPaid) : revenue * FREELANCER_WITHHOLDING_RATE;

  const warnings: string[] = [];

  // 경비 계산
  const expenseAmount = calculateExpenseAmount(
    revenue,
    input.expenseMethod,
    input.simpleExpenseRatePercent,
    input.actualExpenses
  );

  // 사업소득 = 수입 - 경비
  const businessIncome = Math.max(0, revenue - expenseAmount);

  // 인적공제 = 부양가족 × 150만원
  const personalDeduction = dependents * PERSONAL_DEDUCTION.basic;

  // 사회보험료 공제 (국민연금 + 건강보험 전액 공제로 근사)
  const socialInsuranceDeduction = nationalPension + healthInsurance;

  // 과세표준 = 사업소득 - 인적공제 - 사회보험료공제 (최소 0)
  const taxableBase = Math.max(0, businessIncome - personalDeduction - socialInsuranceDeduction);

  // 산출세액 (누진 8단계 적용)
  const grossTax = calculateProgressiveTax(taxableBase, INCOME_TAX_BRACKETS);

  // 자녀세액공제 계산
  let childTaxCreditAmount = 0;
  if (children >= 1) {
    childTaxCreditAmount += CHILD_TAX_CREDIT.first;
  }
  if (children >= 2) {
    childTaxCreditAmount += CHILD_TAX_CREDIT.second;
  }
  if (children >= 3) {
    childTaxCreditAmount += CHILD_TAX_CREDIT.thirdPlus * (children - 2);
  }

  // 결정세액 = 산출세액 - 자녀세액공제 (최소 0)
  const finalTax = Math.max(0, grossTax - childTaxCreditAmount);

  // 지방소득세 = 결정세액 × 10% (10원 단위 절사)
  const localIncomeTax = Math.floor((finalTax * LOCAL_INCOME_TAX_RATE) / 10) * 10;

  // 총 세금
  const totalTaxLiability = finalTax + localIncomeTax;

  // 최종 정산액 = 총세금 - 기납부원천징수
  const settlementAmount = totalTaxLiability - withholdingPaid;

  // 경고 메시지 생성
  if (revenue > 75_000_000) {
    warnings.push(
      '수입 7,500만원 초과 시 간편장부가 아닌 복식부기가 원칙이며, 단순경비율 적용이 제한됩니다. 정확한 계산은 세무사 상담을 권장합니다.'
    );
  }

  if (revenue > 48_000_000 && input.expenseMethod === 'simpleRate') {
    warnings.push(
      '인적용역은 수입 4,800만 초과 시 기준경비율 적용이 원칙. 본 계산은 참고용입니다.'
    );
  }

  if (settlementAmount < 0) {
    warnings.push('기납부 원천징수액이 결정세액보다 많아 환급 대상입니다.');
  }

  if (settlementAmount > 0) {
    warnings.push('5월 종합소득세 신고 시 추가 납부가 필요합니다.');
  }

  return {
    annualRevenue: revenue,
    expenseAmount,
    businessIncome,
    personalDeduction,
    socialInsuranceDeduction,
    taxableBase,
    grossTax,
    childTaxCredit: childTaxCreditAmount,
    finalTax,
    localIncomeTax,
    totalTaxLiability,
    withholdingPaid,
    settlementAmount,
    warnings,
  };
}
