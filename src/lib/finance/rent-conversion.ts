/**
 * 전월세 전환 계산 — 순수 함수
 *
 * 법적 근거:
 * - 주택임대차보호법 §7의2 (차임등의 증감청구권)
 * - 주택임대차보호법 시행령 §9 (2%p 가산비율 및 연 10% 상한)
 * - 한국은행 기준금리 (분기별 변동)
 *
 * 명세: docs/calculator-spec/전월세전환.md
 * 상수: src/lib/constants/rent-rules-2026.ts
 *
 * ⚠️ 모든 수정은 calc-logic-verifier 에이전트 통과 후.
 */

import {
  BANK_OF_KOREA_BASE_RATE_DEFAULT,
  RENT_CONVERSION_ADDITIONAL_RATE,
  RENT_CONVERSION_ANNUAL_CAP,
  DEPOSIT_CONVERSION_MULTIPLIER,
} from '@/lib/constants/rent-rules-2026';

// ============================================
// 타입 정의
// ============================================

/** 전월세 전환 모드 */
export type ConversionMode = 'jeonseToMonthly' | 'monthlyToJeonse' | 'rateReverse';

/** 전월세 전환 계산 입력 */
export interface RentConversionInput {
  /** 전환 모드 */
  mode: ConversionMode;

  /** 기존 전세보증금 (원) — mode A(jeonseToMonthly), C(rateReverse)에서 필수 */
  jeonseDeposit?: number;

  /** 새 보증금 (원) — mode A(jeonseToMonthly), C(rateReverse)에서 필수 */
  newDeposit?: number;

  /** 월세 (원) — mode B(monthlyToJeonse), C(rateReverse)에서 필수 */
  monthlyRent?: number;

  /** mode B에서 기본 보증금 (원) — monthlyToJeonse에서 필수 */
  baseDeposit?: number;

  /** 한국은행 기준금리 (%, 기본 3.5) */
  baseRatePercent?: number;

  /** 대통령령 가산비율 (%p, 기본 2.0) */
  additionalRatePercent?: number;

  /** 연 상한율 (%, 기본 10.0) */
  annualCapPercent?: number;
}

/** 전월세 전환 계산 결과 */
export interface RentConversionResult {
  /** 적용된 전환율 (소수, 예: 0.055) */
  appliedConversionRate: number;

  /** 적용된 전환율 (%, 예: 5.5) */
  appliedConversionRatePercent: number;

  /** Mode A 결과: 계산된 월세 (원) */
  resultMonthlyRent?: number;

  /** Mode B 결과: 환산 전세보증금 (원) */
  resultJeonseAmount?: number;

  /** Mode C 결과: 역산된 실제 적용 전환율 (%, 소수 2자리) */
  resultActualRate?: number;

  /** 환산보증금 = 보증금 + 월세×100 (모든 모드에서 계산) */
  convertedDeposit: number;

  /** 경고/안내 메시지 배열 */
  warnings: string[];
}

// ============================================
// 헬퍼 함수
// ============================================

/**
 * 법정 전환율 상한 계산
 *
 * A = baseRate + additional (소수)
 * B = annualCap (소수)
 * return min(A, B)
 */
function calculateLegalLimit(
  baseRatePercent: number,
  additionalRatePercent: number,
  annualCapPercent: number
): number {
  // 소수로 변환
  const limitA = (baseRatePercent + additionalRatePercent) / 100;
  const limitB = annualCapPercent / 100;

  // 둘 중 낮은 값 적용
  return Math.min(limitA, limitB);
}

/**
 * 전세 → 월세 변환
 *
 * 공식: 월세 = (전세 - 새보증금) × 전환율 / 12
 * 10원 단위 절사
 *
 * @param jeonseDeposit 기존 전세보증금
 * @param newDeposit 새 보증금
 * @param conversionRate 전환율 (소수)
 * @returns { monthly: 월세, warning?: 경고메시지 }
 */
function jeonseToMonthly(
  jeonseDeposit: number,
  newDeposit: number,
  conversionRate: number
): { monthly: number; warning?: string } {
  const diff = jeonseDeposit - newDeposit;

  if (diff <= 0) {
    return {
      monthly: 0,
      warning: '새 보증금이 기존 전세보증금 이상이어서 월세 발생이 없습니다',
    };
  }

  // 월세 = 차액 × 전환율 / 12 (10원 단위 절사)
  const monthly = Math.floor((diff * conversionRate) / 12 / 10) * 10;

  return { monthly };
}

/**
 * 월세 → 전세 변환
 *
 * 공식: 환산전세 = 보증금 + (월세 × 12 / 전환율)
 * 10원 단위 절사
 *
 * @param baseDeposit 기본 보증금
 * @param monthlyRent 월세
 * @param conversionRate 전환율 (소수)
 * @returns { jeonseAmount: 환산전세보증금, warning?: 경고메시지 }
 */
function monthlyToJeonse(
  baseDeposit: number,
  monthlyRent: number,
  conversionRate: number
): { jeonseAmount: number; warning?: string } {
  // 전환율이 0이면 무한대 방지
  if (conversionRate === 0) {
    return {
      jeonseAmount: baseDeposit,
      warning: '전환율이 0%라 월세를 전세로 환산할 수 없습니다. 보증금만 반환됩니다',
    };
  }

  // 환산전세 = 보증금 + (월세 × 12 / 전환율) (10원 단위 절사)
  const jeonseAmount = baseDeposit + Math.floor((monthlyRent * 12 / conversionRate) / 10) * 10;

  return { jeonseAmount };
}

/**
 * 전환율 역산
 *
 * 공식: 실제전환율 = (월세 × 12) / (전세 - 새보증금) × 100
 * 소수 2자리 반올림
 *
 * @param jeonseDeposit 기존 전세보증금
 * @param newDeposit 새 보증금
 * @param monthlyRent 월세
 * @returns { rate: 실제전환율(%), warning?: 경고메시지 }
 */
function reverseRate(
  jeonseDeposit: number,
  newDeposit: number,
  monthlyRent: number
): { rate: number; warning?: string } {
  const diff = jeonseDeposit - newDeposit;

  if (diff <= 0) {
    return {
      rate: 0,
      warning: '새 보증금이 기존 전세보증금 이상이어서 전환율을 계산할 수 없습니다',
    };
  }

  // 실제 전환율 (%) = (월세 × 12) / (전세 - 새보증금) × 100
  const ratePercent = (monthlyRent * 12) / diff * 100;

  // 소수 2자리 반올림
  return {
    rate: Math.round(ratePercent * 100) / 100,
  };
}

// ============================================
// 메인 계산 함수
// ============================================

/**
 * 전월세 전환 계산 (메인 엔트리)
 *
 * 3가지 모드 지원:
 * A. jeonseToMonthly: 전세 → 월세 변환
 * B. monthlyToJeonse: 월세 → 전세 환산
 * C. rateReverse: 실제 적용된 전환율 역산
 */
export function calculateRentConversion(input: RentConversionInput): RentConversionResult {
  const warnings: string[] = [];

  // 기본값 적용
  const baseRate = input.baseRatePercent ?? BANK_OF_KOREA_BASE_RATE_DEFAULT * 100;
  const additionalRate = input.additionalRatePercent ?? RENT_CONVERSION_ADDITIONAL_RATE * 100;
  const annualCap = input.annualCapPercent ?? RENT_CONVERSION_ANNUAL_CAP * 100;

  // 법정 상한 전환율 계산 (소수)
  const legalLimit = calculateLegalLimit(baseRate, additionalRate, annualCap);
  const legalLimitPercent = legalLimit * 100;

  // 환산보증금 임시 변수
  let convertedDeposit = 0;

  // ========== Mode A: 전세 → 월세 ==========
  if (input.mode === 'jeonseToMonthly') {
    // 입력값 검증
    if (
      input.jeonseDeposit === undefined ||
      input.newDeposit === undefined ||
      input.jeonseDeposit < 0 ||
      input.newDeposit < 0
    ) {
      warnings.push('전세보증금과 새 보증금은 필수입니다');
      return {
        appliedConversionRate: legalLimit,
        appliedConversionRatePercent: legalLimitPercent,
        convertedDeposit: 0,
        warnings,
      };
    }

    const result = jeonseToMonthly(input.jeonseDeposit, input.newDeposit, legalLimit);

    if (result.warning) {
      warnings.push(result.warning);
    }

    convertedDeposit = input.newDeposit + result.monthly * DEPOSIT_CONVERSION_MULTIPLIER;

    return {
      appliedConversionRate: legalLimit,
      appliedConversionRatePercent: legalLimitPercent,
      resultMonthlyRent: result.monthly,
      convertedDeposit,
      warnings,
    };
  }

  // ========== Mode B: 월세 → 전세 ==========
  if (input.mode === 'monthlyToJeonse') {
    // 입력값 검증
    if (
      input.baseDeposit === undefined ||
      input.monthlyRent === undefined ||
      input.baseDeposit < 0 ||
      input.monthlyRent < 0
    ) {
      warnings.push('보증금과 월세는 필수입니다');
      return {
        appliedConversionRate: legalLimit,
        appliedConversionRatePercent: legalLimitPercent,
        convertedDeposit: 0,
        warnings,
      };
    }

    const result = monthlyToJeonse(input.baseDeposit, input.monthlyRent, legalLimit);

    if (result.warning) {
      warnings.push(result.warning);
    }

    convertedDeposit = input.baseDeposit + input.monthlyRent * DEPOSIT_CONVERSION_MULTIPLIER;

    return {
      appliedConversionRate: legalLimit,
      appliedConversionRatePercent: legalLimitPercent,
      resultJeonseAmount: result.jeonseAmount,
      convertedDeposit,
      warnings,
    };
  }

  // ========== Mode C: 전환율 역산 ==========
  if (input.mode === 'rateReverse') {
    // 입력값 검증
    if (
      input.jeonseDeposit === undefined ||
      input.newDeposit === undefined ||
      input.monthlyRent === undefined ||
      input.jeonseDeposit < 0 ||
      input.newDeposit < 0 ||
      input.monthlyRent < 0
    ) {
      warnings.push('전세보증금, 새 보증금, 월세는 필수입니다');
      return {
        appliedConversionRate: legalLimit,
        appliedConversionRatePercent: legalLimitPercent,
        convertedDeposit: 0,
        warnings,
      };
    }

    const result = reverseRate(input.jeonseDeposit, input.newDeposit, input.monthlyRent);

    if (result.warning) {
      warnings.push(result.warning);
    }

    // 역산된 실제 전환율(%)를 소수로 변환하여 비교
    const actualRateAsDecimal = result.rate / 100;

    // 법정 상한 초과 여부 확인
    if (actualRateAsDecimal > legalLimit + 0.0001) {
      warnings.push(
        `실제 적용된 전환율 ${result.rate.toFixed(2)}%가 법정 상한 ${legalLimitPercent.toFixed(2)}%를 초과합니다`
      );
    }

    convertedDeposit = input.newDeposit + input.monthlyRent * DEPOSIT_CONVERSION_MULTIPLIER;

    return {
      appliedConversionRate: legalLimit,
      appliedConversionRatePercent: legalLimitPercent,
      resultActualRate: result.rate,
      convertedDeposit,
      warnings,
    };
  }

  // 기본값 반환 (도달 불가)
  return {
    appliedConversionRate: legalLimit,
    appliedConversionRatePercent: legalLimitPercent,
    convertedDeposit: 0,
    warnings: ['지원하지 않는 모드입니다'],
  };
}
