/**
 * 적금 이자 계산 — 순수 함수
 *
 * 법적 근거:
 * - 소득세법 §14 (이자소득)
 * - 소득세법 §129 (이자소득세)
 * - 조세특례제한법 §89의2, §91
 *
 * 명세: docs/calculator-spec/적금.md
 *
 * ⚠️ 모든 수정은 calc-logic-verifier 에이전트 통과 후.
 */

import {
  INTEREST_TAX_EXEMPT,
  INTEREST_TAX_GENERAL,
  INTEREST_TAX_PREFERENTIAL,
} from '@/lib/constants/savings-rates-2026';

// ============================================
// 타입 정의
// ============================================

/** 이자 계산 방식 */
export type CompoundingMethod = 'simple' | 'monthlyCompound';

/** 이자 과세 유형 */
export type TaxType = 'general' | 'preferential' | 'exempt';

/** 적금 계산 입력 */
export interface SavingsInput {
  /** 월 납입금액 (원) */
  monthlyDeposit: number;
  /** 연 이자율 (%, 소수점 2자리 이하) */
  annualRatePercent: number;
  /** 가입 기간 (개월) */
  termMonths: number;
  /** 이자 계산 방식 */
  method: CompoundingMethod;
  /** 이자 과세 유형 */
  taxType: TaxType;
}

/** 적금 계산 결과 */
export interface SavingsResult {
  /** 원금 합계 (월납입금 × 개월수) */
  principal: number;
  /** 세전 이자 */
  pretaxInterest: number;
  /** 세금 */
  tax: number;
  /** 세후 이자 */
  posttaxInterest: number;
  /** 세후 만기 수령액 (원금 + 세후 이자) */
  maturityAmount: number;
  /** 적용된 세율 */
  appliedTaxRate: number;
  /** 경고 메시지 배열 */
  warnings: string[];
}

// ============================================
// 세율 조회
// ============================================

/**
 * 과세 유형에 따른 세율 조회
 */
function getTaxRate(taxType: TaxType): number {
  switch (taxType) {
    case 'general':
      return INTEREST_TAX_GENERAL; // 15.4%
    case 'preferential':
      return INTEREST_TAX_PREFERENTIAL; // 9.5%
    case 'exempt':
      return INTEREST_TAX_EXEMPT; // 0%
  }
}

// ============================================
// 단리 이자 계산
// ============================================

/**
 * 단리 정기적금 세전 이자 계산
 *
 * 공식: 이자 = 월납입금 × 연이자율 / 100 × n × (n+1) / 2 / 12
 * 여기서 n = 개월수
 * 근거: 첫 납입분은 n개월 이자, 마지막 납입분은 1개월 이자 → 합계 = n(n+1)/2
 *
 * 반올림: 10원 단위 절사
 */
function calculateSimpleSavingsInterest(
  monthlyDeposit: number,
  annualRatePercent: number,
  termMonths: number
): number {
  if (monthlyDeposit <= 0 || termMonths <= 0 || annualRatePercent < 0) {
    return 0;
  }

  // 이자 = 월납입금 × (연이자율/100) × (n×(n+1)/2) / 12
  const monthSum = (termMonths * (termMonths + 1)) / 2;
  const pretaxInterest =
    (monthlyDeposit * annualRatePercent) / 100 * monthSum / 12;

  // 10원 단위 절사
  return Math.floor(pretaxInterest / 10) * 10;
}

// ============================================
// 월복리 이자 계산
// ============================================

/**
 * 월복리 정기적금 세전 이자 계산
 *
 * r = 월이자율 = 연이자율 / 12 / 100
 * 공식: 만기원리금 = 월납입금 × ((1+r)^n - 1) / r × (1+r)
 * 세전 이자 = 만기원리금 - (월납입금 × n)
 *
 * 엣지 케이스: r === 0 → 이자 0
 * 반올림: 10원 단위 절사
 */
function calculateCompoundSavingsInterest(
  monthlyDeposit: number,
  annualRatePercent: number,
  termMonths: number
): number {
  if (monthlyDeposit <= 0 || termMonths <= 0 || annualRatePercent < 0) {
    return 0;
  }

  // 월이자율
  const monthlyRate = annualRatePercent / 100 / 12;

  // r === 0: 이자 없음
  if (monthlyRate === 0) {
    return 0;
  }

  // 만기원리금 = 월납입금 × ((1+r)^n - 1) / r × (1+r)
  const numerator = Math.pow(1 + monthlyRate, termMonths) - 1;
  const denominator = monthlyRate;
  const maturityAmount =
    monthlyDeposit * (numerator / denominator) * (1 + monthlyRate);

  // 세전 이자 = 만기원리금 - 원금
  const principal = monthlyDeposit * termMonths;
  const pretaxInterest = maturityAmount - principal;

  // 10원 단위 절사
  return Math.floor(pretaxInterest / 10) * 10;
}

// ============================================
// 메인 계산 함수
// ============================================

/**
 * 적금 이자 계산 (메인 엔트리)
 *
 * 입력값 검증:
 * - monthlyDeposit ≤ 0: 경고 + 결과 0
 * - termMonths ≤ 0: 경고 + 결과 0
 * - annualRatePercent < 0: 경고, 0으로 처리
 * - taxType === 'preferential': 경고 메시지 추가 (가입 조건 확인 필요)
 */
export function calculateSavings(input: SavingsInput): SavingsResult {
  const warnings: string[] = [];

  // 입력값 검증
  if (input.monthlyDeposit <= 0) {
    warnings.push('월 납입금액은 0보다 커야 합니다');
    return {
      principal: 0,
      pretaxInterest: 0,
      tax: 0,
      posttaxInterest: 0,
      maturityAmount: 0,
      appliedTaxRate: 0,
      warnings,
    };
  }

  if (input.termMonths <= 0) {
    warnings.push('가입 기간은 0보다 커야 합니다');
    return {
      principal: 0,
      pretaxInterest: 0,
      tax: 0,
      posttaxInterest: 0,
      maturityAmount: 0,
      appliedTaxRate: 0,
      warnings,
    };
  }

  if (input.annualRatePercent < 0) {
    warnings.push('연 이자율은 0 이상이어야 합니다');
  }

  if (input.taxType === 'preferential') {
    warnings.push(
      '세금우대종합저축은 가입 조건(일정 소득 이하·가입 한도 등)이 있습니다'
    );
  }

  // 원금 계산
  const principal = input.monthlyDeposit * input.termMonths;

  // 세전 이자 계산
  const pretaxInterest =
    input.method === 'simple'
      ? calculateSimpleSavingsInterest(
          input.monthlyDeposit,
          Math.max(0, input.annualRatePercent),
          input.termMonths
        )
      : calculateCompoundSavingsInterest(
          input.monthlyDeposit,
          Math.max(0, input.annualRatePercent),
          input.termMonths
        );

  // 세율 조회
  const appliedTaxRate = getTaxRate(input.taxType);

  // 세금 계산 (10원 단위 절사)
  const tax = Math.floor((pretaxInterest * appliedTaxRate) / 10) * 10;

  // 세후 이자
  const posttaxInterest = pretaxInterest - tax;

  // 만기 수령액
  const maturityAmount = principal + posttaxInterest;

  return {
    principal,
    pretaxInterest,
    tax,
    posttaxInterest,
    maturityAmount,
    appliedTaxRate,
    warnings,
  };
}
