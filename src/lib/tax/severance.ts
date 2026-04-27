/**
 * 퇴직금 및 퇴직소득세 계산 — 순수 함수
 *
 * 법적 근거:
 * - 근로기준법 §2 (평균임금)
 * - 근로자퇴직급여 보장법 §8 (법정 퇴직금)
 * - 소득세법 §55, §148의4 (퇴직소득세, 근속연수공제, 환산급여공제)
 *
 * 상수: src/lib/constants/tax-rates-2026.ts
 * 명세: docs/calculator-spec/퇴직금.md
 *
 * ⚠️ 모든 수정은 calc-logic-verifier 에이전트 통과 후.
 */

import {
  INCOME_TAX_BRACKETS,
  LOCAL_INCOME_TAX_RATE,
  SERVICE_YEARS_DEDUCTION_BRACKETS,
  CONVERTED_SALARY_DEDUCTION_BRACKETS,
} from '@/lib/constants/tax-rates-2026';
import { calculateProgressiveTax } from './income';

// ============================================
// 타입 정의
// ============================================

export type SeverancePlanType = 'statutory' | 'DB' | 'DC';

export interface SeveranceInput {
  /** 입사일 (YYYY-MM-DD) */
  hireDate: string;
  /** 퇴사일 (YYYY-MM-DD) */
  leaveDate: string;
  /** 3개월 평균 월 통상임금 (원) */
  monthlyOrdinaryWage: number;
  /** 3개월간 기타 수당 총액 (원, 월 평균 아님) */
  monthlyExtraAllowance: number;
  /** 연간 상여금 총액 (원) */
  annualBonus: number;
  /** 연간 연차수당 (원) */
  annualLeaveAllowance: number;
  /** 퇴직연금 제도 */
  planType: SeverancePlanType;
  /** 세금 계산 포함 여부 */
  includeTax: boolean;
}

export interface SeveranceResult {
  /** 재직일수 (leaveDate - hireDate + 1) */
  serviceDays: number;
  /** 재직 연수 (재직일수 / 365, 소수점 4자리) */
  serviceYears: number;
  /** 3개월 임금총액 (원) */
  threeMonthWageTotal: number;
  /** 3개월 실제 일수 */
  threeMonthDays: number;
  /** 1일 평균임금 (원, 1원 단위 절사) */
  averageDailyWage: number;
  /** 법정 퇴직금 (원) */
  statutorySeverance: number;
  /** 세법용 근속연수 (1년 미만이면 올림, 그 외 소수점 버림) */
  serviceYearsRounded: number;
  /** 근속연수공제 (원) */
  serviceYearsDeduction: number;
  /** 환산급여 (원) */
  convertedSalary: number;
  /** 환산급여공제 (원) */
  convertedSalaryDeduction: number;
  /** 퇴직소득 과세표준 (원) */
  retirementTaxableBase: number;
  /** 퇴직소득세 (원, 10원 단위 절사) */
  retirementIncomeTax: number;
  /** 지방소득세 (원, 10원 단위 절사) */
  localIncomeTax: number;
  /** 세금 합계 (원) */
  totalTax: number;
  /** 세후 수령액 (원) */
  netSeverance: number;
  /** 경고 메시지 */
  warnings: string[];
}

// ============================================
// 헬퍼 함수: 날짜 처리
// ============================================

/**
 * YYYY-MM-DD 형식 문자열을 UTC Date 로 변환
 * 시차·DST 영향 제거
 */
function parseDate(dateStr: string): Date {
  const parts = dateStr.split('-').map(Number);
  const year = parts[0] ?? 0;
  const month = parts[1] ?? 0;
  const day = parts[2] ?? 0;
  return new Date(Date.UTC(year, month - 1, day));
}

/**
 * 두 UTC 날짜 간 차이 (일 단위)
 * start 이전인 경우 음수 반환
 */
function daysBetween(start: Date, end: Date): number {
  const startUtc = Date.UTC(start.getUTCFullYear(), start.getUTCMonth(), start.getUTCDate());
  const endUtc = Date.UTC(end.getUTCFullYear(), end.getUTCMonth(), end.getUTCDate());
  return Math.floor((endUtc - startUtc) / (1000 * 60 * 60 * 24));
}

/**
 * 주어진 날짜로부터 3개월 이전의 날짜 계산
 * 월 경계 처리 (예: 3/31 → 12/31)
 */
function subtractMonths(date: Date, months: number): Date {
  const result = new Date(date);
  result.setUTCMonth(result.getUTCMonth() - months);
  return result;
}

// ============================================
// 헬퍼 함수: 계산 로직
// ============================================

/**
 * 법정 퇴직금 계산 (근로자퇴직급여 보장법 §8)
 * 공식: 1일 평균임금 × 30일 × (재직일수 ÷ 365)
 */
function computeStatutorySeverance(avgDailyWage: number, serviceDays: number): number {
  if (serviceDays < 365) {
    return 0; // 1년 미만은 법정 의무 없음
  }
  return Math.floor((avgDailyWage * 30 * serviceDays) / 365 / 10) * 10;
}

/**
 * 근속연수공제 계산 (소득세법 §148의4)
 * yearsRounded 에 따라 구간 결정
 * 예: 7년 → 5년 초과 구간 (5~10) → baseDeduction(5M) + (7-5) × 2M = 9M
 */
function computeServiceYearsDeduction(yearsRounded: number): number {
  // 정방향 순회로 올바른 구간 찾기
  for (let i = 0; i < SERVICE_YEARS_DEDUCTION_BRACKETS.length; i++) {
    const bracket = SERVICE_YEARS_DEDUCTION_BRACKETS[i];
    if (!bracket) continue;

    // 이 구간에 해당하는지 확인
    if (bracket.upperYears === null || yearsRounded <= bracket.upperYears) {
      // 이전 구간의 상한값 (이 구간 내에서 계산의 시작점)
      let prevUpper = 0;
      if (i > 0) {
        const prevBracket = SERVICE_YEARS_DEDUCTION_BRACKETS[i - 1];
        if (prevBracket) {
          prevUpper = prevBracket.upperYears ?? 0;
        }
      }

      return bracket.baseDeduction + (yearsRounded - prevUpper) * bracket.perYearDeduction;
    }
  }

  // 도달 불가 (마지막 구간이 null이므로)
  return 0;
}

/**
 * 환산급여 계산 (소득세법 §148의4)
 * 공식: (퇴직소득금액 − 근속연수공제) × 12 ÷ 근속연수
 * 주의: 근속연수가 0이면 무한대 → 에러 처리 필요
 */
function computeConvertedSalary(
  severance: number,
  yearsRounded: number,
  yearsDeduction: number,
): number {
  if (yearsRounded === 0) return 0; // 안전 장치
  const adjusted = Math.max(0, severance - yearsDeduction);
  return Math.max(0, Math.floor((adjusted * 12) / yearsRounded));
}

/**
 * 환산급여공제 계산 (소득세법 §148의4)
 * converted 금액에 따라 구간별로 계산
 * 예: 1억 원 → 7000만~1억 구간 → base(45.2M) + (1억-7000만) × 55% = 61.7M
 */
function computeConvertedSalaryDeduction(converted: number): number {
  // 정방향 순회로 올바른 구간 찾기
  for (let i = 0; i < CONVERTED_SALARY_DEDUCTION_BRACKETS.length; i++) {
    const bracket = CONVERTED_SALARY_DEDUCTION_BRACKETS[i];
    if (!bracket) continue;

    // 이 구간에 해당하는지 확인
    if (bracket.upperBound === null || converted <= bracket.upperBound) {
      // 이전 구간의 상한값 (이 구간 내에서 계산의 시작점)
      let prevUpper = 0;
      if (i > 0) {
        const prevBracket = CONVERTED_SALARY_DEDUCTION_BRACKETS[i - 1];
        if (prevBracket) {
          prevUpper = prevBracket.upperBound ?? 0;
        }
      }

      return bracket.base + Math.max(0, converted - prevUpper) * bracket.rate;
    }
  }

  // 도달 불가 (마지막 구간이 null이므로)
  return 0;
}

/**
 * 퇴직소득세 계산 (소득세법 §148의4)
 * 공식: (과세표준 × 기본세율) ÷ 12 × 근속연수
 */
function computeRetirementIncomeTax(
  taxableBase: number,
  yearsRounded: number,
): number {
  if (taxableBase <= 0 || yearsRounded === 0) return 0;

  // 산출세액 (종합소득세 누진세 공식 재사용)
  const grossTax = calculateProgressiveTax(taxableBase, INCOME_TAX_BRACKETS);

  // 월 환산 후 근속연수 곱 (10원 단위 절사)
  const monthlyTax = grossTax / 12;
  return Math.floor((monthlyTax * yearsRounded) / 10) * 10;
}

// ============================================
// 메인 계산 함수
// ============================================

/**
 * 퇴직금 및 퇴직소득세 계산 (메인 엔트리)
 */
export function calculateSeverance(input: SeveranceInput): SeveranceResult {
  const warnings: string[] = [];

  // 1. 날짜 검증 및 재직일수 계산
  const hireDate = parseDate(input.hireDate);
  const leaveDate = parseDate(input.leaveDate);

  if (leaveDate < hireDate) {
    warnings.push('퇴사일은 입사일보다 이후여야 합니다.');
    return {
      serviceDays: 0,
      serviceYears: 0,
      threeMonthWageTotal: 0,
      threeMonthDays: 0,
      averageDailyWage: 0,
      statutorySeverance: 0,
      serviceYearsRounded: 0,
      serviceYearsDeduction: 0,
      convertedSalary: 0,
      convertedSalaryDeduction: 0,
      retirementTaxableBase: 0,
      retirementIncomeTax: 0,
      localIncomeTax: 0,
      totalTax: 0,
      netSeverance: 0,
      warnings,
    };
  }

  const serviceDays = daysBetween(hireDate, leaveDate) + 1;
  const serviceYears = Number((serviceDays / 365).toFixed(4));
  const serviceYearsRounded = serviceDays < 365 ? Math.ceil(serviceDays / 365) : Math.floor(serviceYears);

  // 2. 평균임금 계산
  let averageDailyWage = 0;
  let threeMonthWageTotal = 0;
  let threeMonthDays = 0;

  if (input.monthlyOrdinaryWage > 0) {
    const threeMonthsAgo = subtractMonths(leaveDate, 3);
    threeMonthDays = daysBetween(threeMonthsAgo, leaveDate) + 1;
    threeMonthWageTotal =
      input.monthlyOrdinaryWage * 3 +
      (input.annualBonus * 3) / 12 +
      (input.annualLeaveAllowance * 3) / 12 +
      input.monthlyExtraAllowance;
    averageDailyWage = Math.floor(threeMonthWageTotal / threeMonthDays);
  } else {
    warnings.push('월 통상임금이 0원입니다. 계산 불가능합니다.');
  }

  // 3. 법정 퇴직금
  const statutorySeverance = computeStatutorySeverance(averageDailyWage, serviceDays);

  if (serviceDays < 365) {
    warnings.push('재직 1년 미만은 법정 퇴직금 지급 의무가 없습니다.');
  }

  // DC형 경고 (항상)
  if (input.planType === 'DC') {
    warnings.push('DC형은 실제 적립금·운용수익이 별도 산출됩니다. 본 계산은 법정(평균임금) 기준 추정치입니다.');
  }

  // 4. 세금 미포함 시 조기 반환
  if (!input.includeTax) {
    return {
      serviceDays,
      serviceYears,
      threeMonthWageTotal,
      threeMonthDays,
      averageDailyWage,
      statutorySeverance,
      serviceYearsRounded,
      serviceYearsDeduction: 0,
      convertedSalary: 0,
      convertedSalaryDeduction: 0,
      retirementTaxableBase: 0,
      retirementIncomeTax: 0,
      localIncomeTax: 0,
      totalTax: 0,
      netSeverance: statutorySeverance,
      warnings,
    };
  }

  // 5. 퇴직소득세 (포함 시에만)
  const serviceYearsDeduction = computeServiceYearsDeduction(serviceYearsRounded);
  const convertedSalary = computeConvertedSalary(statutorySeverance, serviceYearsRounded, serviceYearsDeduction);
  const convertedSalaryDeduction = computeConvertedSalaryDeduction(convertedSalary);
  const retirementTaxableBase = Math.max(0, convertedSalary - convertedSalaryDeduction);
  const retirementIncomeTax = computeRetirementIncomeTax(retirementTaxableBase, serviceYearsRounded);
  const localIncomeTax = Math.floor((retirementIncomeTax * LOCAL_INCOME_TAX_RATE) / 10) * 10;
  const totalTax = retirementIncomeTax + localIncomeTax;

  return {
    serviceDays,
    serviceYears,
    threeMonthWageTotal: Math.floor(threeMonthWageTotal),
    threeMonthDays,
    averageDailyWage,
    statutorySeverance,
    serviceYearsRounded,
    serviceYearsDeduction,
    convertedSalary,
    convertedSalaryDeduction: Math.floor(convertedSalaryDeduction),
    retirementTaxableBase,
    retirementIncomeTax,
    localIncomeTax,
    totalTax,
    netSeverance: Math.max(0, statutorySeverance - totalTax),
    warnings,
  };
}
