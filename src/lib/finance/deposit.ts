/**
 * 예금(정기예금) 이자 계산 — 순수 함수
 *
 * 법적 근거:
 * - 소득세법 §14 (이자소득)
 * - 소득세법 §129 (이자소득세)
 * - 조세특례제한법 §89의2, §91
 *
 * 명세: docs/calculator-spec/예금.md
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

/** 복리 계산 방식 */
export type DepositCompoundingMethod = 'simple' | 'monthlyCompound' | 'dailyCompound';

/** 이자 과세 유형 */
export type TaxType = 'general' | 'preferential' | 'exempt';

/** 예금 계산 입력 */
export interface DepositInput {
  /** 예치 원금 (원) */
  principal: number;
  /** 연 이자율 (%, 소수점 2자리 이하) */
  annualRatePercent: number;
  /** 예치 기간 (개월) */
  termMonths: number;
  /** 복리 계산 방식 */
  method: DepositCompoundingMethod;
  /** 이자 과세 유형 */
  taxType: TaxType;
}

/** 예금 계산 결과 */
export interface DepositResult {
  /** 예치 원금 */
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
  /** 연환산 세후 이자율 (%, 소수점 4자리) */
  annualizedNetRate: number;
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
 * 단리 예금 세전 이자 계산
 *
 * 공식: 이자 = 원금 × (연이자율/100) × 개월/12
 * 반올림: 10원 단위 절사
 */
function calculateSimpleDepositInterest(
  principal: number,
  annualRatePercent: number,
  termMonths: number
): number {
  if (principal <= 0 || termMonths <= 0 || annualRatePercent < 0) {
    return 0;
  }

  const pretaxInterest =
    (principal * annualRatePercent / 100) * (termMonths / 12);

  // 10원 단위 절사
  return Math.floor(pretaxInterest / 10) * 10;
}

// ============================================
// 월복리 이자 계산
// ============================================

/**
 * 월복리 예금 세전 이자 계산
 *
 * r = 월이자율 = 연이자율 / 100 / 12
 * 공식: 만기원리금 = 원금 × (1+r)^n
 * 세전 이자 = 만기원리금 - 원금
 *
 * 엣지 케이스: r === 0 → 이자 0
 * 반올림: 10원 단위 절사
 */
function calculateMonthlyCompoundDepositInterest(
  principal: number,
  annualRatePercent: number,
  termMonths: number
): number {
  if (principal <= 0 || termMonths <= 0 || annualRatePercent < 0) {
    return 0;
  }

  // 월이자율
  const monthlyRate = annualRatePercent / 100 / 12;

  // r === 0: 이자 없음
  if (monthlyRate === 0) {
    return 0;
  }

  // 만기원리금 = 원금 × (1+r)^n
  const maturityAmount = principal * Math.pow(1 + monthlyRate, termMonths);

  // 세전 이자
  const pretaxInterest = maturityAmount - principal;

  // 10원 단위 절사
  return Math.floor(pretaxInterest / 10) * 10;
}

// ============================================
// 일복리 이자 계산
// ============================================

/**
 * 일복리 예금 세전 이자 계산
 *
 * r = 일이자율 = 연이자율 / 100 / 365
 * days = 개월 × 30.4167 (근사치)
 * 공식: 만기원리금 = 원금 × (1+r)^days
 * 세전 이자 = 만기원리금 - 원금
 *
 * 엣지 케이스: r === 0 → 이자 0
 * 반올림: 10원 단위 절사
 */
function calculateDailyCompoundDepositInterest(
  principal: number,
  annualRatePercent: number,
  termMonths: number
): number {
  if (principal <= 0 || termMonths <= 0 || annualRatePercent < 0) {
    return 0;
  }

  // 일이자율
  const dailyRate = annualRatePercent / 100 / 365;

  // r === 0: 이자 없음
  if (dailyRate === 0) {
    return 0;
  }

  // 총 일수 (근사치: 월 × 30.4167)
  const days = termMonths * 30.4167;

  // 만기원리금 = 원금 × (1+r)^days
  const maturityAmount = principal * Math.pow(1 + dailyRate, days);

  // 세전 이자
  const pretaxInterest = maturityAmount - principal;

  // 10원 단위 절사
  return Math.floor(pretaxInterest / 10) * 10;
}

// ============================================
// 메인 계산 함수
// ============================================

/**
 * 예금 이자 계산 (메인 엔트리)
 *
 * 입력값 검증:
 * - principal ≤ 0: 경고 + 결과 0
 * - termMonths ≤ 0: 경고 + 결과 0
 * - annualRatePercent < 0: 경고, 0으로 처리
 * - taxType === 'preferential': 경고 메시지 추가 (가입 조건 확인 필요)
 *
 * 반올림: 10원 단위 절사, annualizedNetRate 는 소수점 4자리 반올림
 */
export function calculateDeposit(input: DepositInput): DepositResult {
  const warnings: string[] = [];

  // 입력값 검증
  if (input.principal <= 0) {
    warnings.push('예치 원금은 0보다 커야 합니다');
    return {
      principal: 0,
      pretaxInterest: 0,
      tax: 0,
      posttaxInterest: 0,
      maturityAmount: 0,
      appliedTaxRate: 0,
      annualizedNetRate: 0,
      warnings,
    };
  }

  if (input.termMonths <= 0) {
    warnings.push('예치 기간은 0보다 커야 합니다');
    return {
      principal: 0,
      pretaxInterest: 0,
      tax: 0,
      posttaxInterest: 0,
      maturityAmount: 0,
      appliedTaxRate: 0,
      annualizedNetRate: 0,
      warnings,
    };
  }

  if (input.annualRatePercent < 0) {
    warnings.push('연 이자율은 0 이상이어야 합니다');
  }

  if (input.taxType === 'preferential') {
    warnings.push(
      '세금우대종합저축 가입 조건(일정 소득 이하·가입 한도 등)을 확인하세요'
    );
  }

  // 원금
  const principal = input.principal;

  // 세전 이자 계산
  const pretaxInterest =
    input.method === 'simple'
      ? calculateSimpleDepositInterest(
          principal,
          Math.max(0, input.annualRatePercent),
          input.termMonths
        )
      : input.method === 'monthlyCompound'
      ? calculateMonthlyCompoundDepositInterest(
          principal,
          Math.max(0, input.annualRatePercent),
          input.termMonths
        )
      : calculateDailyCompoundDepositInterest(
          principal,
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

  // 연환산 세후 이자율 (%, 소수점 4자리 반올림)
  // 공식: (세후이자 / 원금) × (12 / 기간) × 100
  let annualizedNetRate = 0;
  if (principal > 0 && input.termMonths > 0) {
    annualizedNetRate =
      (posttaxInterest / principal) * (12 / input.termMonths) * 100;
    // 소수점 4자리 반올림
    annualizedNetRate = Math.round(annualizedNetRate * 10000) / 10000;
  }

  return {
    principal,
    pretaxInterest,
    tax,
    posttaxInterest,
    maturityAmount,
    appliedTaxRate,
    annualizedNetRate,
    warnings,
  };
}
