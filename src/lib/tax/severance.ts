/**
 * 퇴직금 및 퇴직소득세 계산 — 순수 함수
 *
 * 법적 근거:
 * - 근로기준법 §2 (평균임금)
 * - 근로자퇴직급여 보장법 §8 (법정 퇴직금)
 * - 소득세법 §48 (퇴직소득공제: 근속연수공제·환산급여공제), §55② (연분연승 산출세액)
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
  /** 퇴직일: 마지막 근무일의 다음 날 (YYYY-MM-DD, 재직기간 종료일 제외) */
  leaveDate: string;
  /** 호환용 키: 직전 3개월의 월 평균 기초임금 (원). 통상임금 비교액이 아님 */
  monthlyOrdinaryWage: number;
  /** 직전 3개월의 월 평균 기초임금 (원). 있으면 호환용 키 대신 사용 */
  averageMonthlyWage?: number;
  /** 퇴직 당시 1일 통상임금 (원). 중간 절사 없이 전달. 미입력 시 평균임금만의 참고액 */
  ordinaryDailyWage?: number;
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
  /** 재직일수 (leaveDate - hireDate, 퇴직일 제외) */
  serviceDays: number;
  /** 재직 연수 (재직일수 / 365, 소수점 4자리) */
  serviceYears: number;
  /** 3개월 임금총액 (원) */
  threeMonthWageTotal: number;
  /** 3개월 실제 일수 */
  threeMonthDays: number;
  /** 1일 평균임금 (원, 중간 절사 없음) */
  averageDailyWage: number;
  /** 입력된 1일 통상임금. 미확인인 호환 호출은 null */
  ordinaryDailyWage: number | null;
  /** 계산에 사용한 일 임금: 평균·통상임금 중 큰 금액 */
  basisDailyWage: number;
  wageBasis: 'average' | 'ordinary' | 'averageOnly';
  /** 계속근로 1년 이상 여부. 주 15시간 등 나머지 자격은 별도 확인 필요 */
  isEligibleForStatutory: boolean;
  /** 법정 산식 참고액 (원 미만 반올림; 확정 지급액 아님) */
  statutorySeverance: number;
  /** 세법용 근속연수 (역년의 완전연수에 1년 미만 잔여기간을 1년으로 합산) */
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
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
    throw new Error('입사일과 퇴직일을 YYYY-MM-DD 형식의 실제 날짜로 입력해 주세요.');
  }
  const [year = 0, month = 0, day = 0] = dateStr.split('-').map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  if (
    year < 100 ||
    date.getUTCFullYear() !== year ||
    date.getUTCMonth() !== month - 1 ||
    date.getUTCDate() !== day
  ) {
    throw new Error('입사일과 퇴직일에 존재하는 날짜를 입력해 주세요.');
  }
  return date;
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
 * 고용노동부 공개 계산기 setDate()의 미산입기간 없는 산정기간 분기.
 * https://www.moel.go.kr/assets/calc/js/retire_cal.js
 * 5월의 해당일 없는 2월은 제외하여 3월 1일부터, 그 외는 공식 첫달 dd 분기를 따른다.
 * 휴직 등 미산입기간이 있는 경우는 지원하지 않는다.
 */
function subtractMonths(date: Date, months: number): Date {
  const monthStart = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth() - months, 1));
  const lastDay = new Date(
    Date.UTC(monthStart.getUTCFullYear(), monthStart.getUTCMonth() + 1, 0),
  ).getUTCDate();
  if (date.getUTCDate() > lastDay) {
    if (date.getUTCMonth() === 4) return new Date(Date.UTC(date.getUTCFullYear(), 2, 1));
    const exitMonthLastDay = new Date(
      Date.UTC(date.getUTCFullYear(), date.getUTCMonth() + 1, 0),
    ).getUTCDate();
    return new Date(
      Date.UTC(
        monthStart.getUTCFullYear(),
        monthStart.getUTCMonth(),
        lastDay - (exitMonthLastDay - date.getUTCDate()),
      ),
    );
  }
  return new Date(
    Date.UTC(monthStart.getUTCFullYear(), monthStart.getUTCMonth(), date.getUTCDate()),
  );
}

/**
 * 소득세법 §48①: 1년 미만의 기간은 1년으로 본다.
 * https://www.law.go.kr/LSW/lsSideInfoP.do?lsiSeq=280405&joNo=0048&joBrNo=00&docCls=jo&urlMode=lsScJoRltInfoR
 * 365일 나눗셈 올림은 윤년의 정확한 1년을 2년으로 만들므로 역년 기념일로 비교한다.
 * 중간정산·근속기간 제외 등은 별도 처리하지 않는 일반 계속근로 참고 계산이다.
 */
function calculateTaxServiceYears(hireDate: Date, leaveDate: Date): number {
  let completeYears = leaveDate.getUTCFullYear() - hireDate.getUTCFullYear();
  let anniversary = new Date(
    Date.UTC(
      hireDate.getUTCFullYear() + completeYears,
      hireDate.getUTCMonth(),
      hireDate.getUTCDate(),
    ),
  );
  if (leaveDate < anniversary) {
    completeYears -= 1;
    anniversary = new Date(
      Date.UTC(
        hireDate.getUTCFullYear() + completeYears,
        hireDate.getUTCMonth(),
        hireDate.getUTCDate(),
      ),
    );
  }
  return completeYears + (leaveDate > anniversary ? 1 : 0);
}

// ============================================
// 헬퍼 함수: 계산 로직
// ============================================

/**
 * 법정 퇴직금 계산 (근로자퇴직급여 보장법 §8)
 * 공식: 평균·통상 중 높은 1일 임금 × 30일 × (재직일수 ÷ 365)
 */
function computeStatutorySeverance(
  basisDailyWage: number,
  serviceDays: number,
  eligible: boolean,
): number {
  if (!eligible) return 0;
  // 고용노동부 산식의 일 임금·재직비율을 중간 절사하지 않는다.
  // 최종 원 미만 반올림은 이 계산기의 참고금액 표시 방식이며 법정 절사 규칙이라는 주장이 아니다.
  const amount = Math.round((basisDailyWage * 30 * serviceDays) / 365);
  if (!Number.isSafeInteger(amount))
    throw new Error('퇴직금 참고액의 금액이 너무 큽니다. 임금 자료를 확인해 주세요.');
  return amount;
}

/**
 * 근속연수공제 계산 (소득세법 §48)
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
 * 환산급여 계산 (소득세법 §48)
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
 * 환산급여공제 계산 (소득세법 §48)
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
 * 퇴직소득세 계산 (소득세법 §55②)
 * 공식: (과세표준 × 기본세율) ÷ 12 × 근속연수
 */
function computeRetirementIncomeTax(taxableBase: number, yearsRounded: number): number {
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

  if (leaveDate <= hireDate)
    throw new Error('퇴직일(마지막 근무 다음 날)은 입사일보다 이후여야 합니다.');
  const averageMonthlyWage = input.averageMonthlyWage ?? input.monthlyOrdinaryWage;
  for (const amount of [
    averageMonthlyWage,
    input.monthlyExtraAllowance,
    input.annualBonus,
    input.annualLeaveAllowance,
  ]) {
    if (!Number.isFinite(amount) || amount < 0)
      throw new Error('평균임금 자료는 0 이상의 유효한 금액으로 입력해 주세요.');
  }
  if (
    input.ordinaryDailyWage !== undefined &&
    (!Number.isFinite(input.ordinaryDailyWage) || input.ordinaryDailyWage <= 0)
  ) {
    throw new Error('1일 통상임금은 확인된 0원 초과의 유효한 금액으로 입력해 주세요.');
  }
  const serviceDays = daysBetween(hireDate, leaveDate);
  // 민법 §160의 역년 기준. 2월 29일의 해당일이 없는 다음 해는 2월 말일까지 근무 후 3월 1일 퇴직 시 1년.
  const firstAnniversary = new Date(
    Date.UTC(hireDate.getUTCFullYear() + 1, hireDate.getUTCMonth(), hireDate.getUTCDate()),
  );
  const isEligibleForStatutory = leaveDate >= firstAnniversary;
  const serviceYears = Number((serviceDays / 365).toFixed(4));
  const serviceYearsRounded = calculateTaxServiceYears(hireDate, leaveDate);

  // 2. 평균임금 계산
  const threeMonthsAgo = subtractMonths(leaveDate, 3);
  const threeMonthDays = daysBetween(threeMonthsAgo, leaveDate);
  const threeMonthWageTotal =
    averageMonthlyWage * 3 +
    (input.annualBonus * 3) / 12 +
    (input.annualLeaveAllowance * 3) / 12 +
    input.monthlyExtraAllowance;
  if (!Number.isFinite(threeMonthWageTotal)) throw new Error('평균임금 자료의 금액이 너무 큽니다.');
  const averageDailyWage = threeMonthWageTotal / threeMonthDays;
  const ordinaryDailyWage = input.ordinaryDailyWage ?? null;
  const basisDailyWage = Math.max(averageDailyWage, ordinaryDailyWage ?? 0);
  const wageBasis: SeveranceResult['wageBasis'] =
    ordinaryDailyWage === null
      ? 'averageOnly'
      : ordinaryDailyWage > averageDailyWage
        ? 'ordinary'
        : 'average';
  if (threeMonthWageTotal === 0)
    warnings.push('평균임금 자료의 합계가 0원입니다. 실제 지급된 임금 자료를 확인해 주세요.');
  if (ordinaryDailyWage === null)
    warnings.push(
      '1일 통상임금 미확인: 평균임금만으로 계산한 참고액이며, 통상임금이 더 높으면 지급 기준이 달라집니다.',
    );

  // 3. 법정 퇴직금
  const statutorySeverance = computeStatutorySeverance(
    basisDailyWage,
    serviceDays,
    isEligibleForStatutory,
  );

  if (!isEligibleForStatutory) {
    warnings.push('재직 1년 미만은 법정 퇴직금 지급 의무가 없습니다.');
  }
  warnings.push(
    '일반적인 계속근로·주 15시간 이상을 전제로 한 예상 참고액입니다. 휴직·제외기간·불규칙 임금 등은 별도 확인이 필요합니다.',
  );
  warnings.push(
    '평균·통상 일 임금은 중간 절사하지 않으며, 최종 퇴직금 참고액은 원 미만 반올림합니다.',
  );

  // DC형 경고 (항상)
  if (input.planType === 'DC') {
    warnings.push(
      'DC형은 실제 적립금·운용수익이 별도 산출됩니다. 본 계산은 평균·통상임금 비교에 따른 법정 산식 참고액이며 실제 DC 수령액이 아닙니다.',
    );
  }

  // 4. 세금 미포함 시 조기 반환
  if (!input.includeTax) {
    return {
      serviceDays,
      serviceYears,
      threeMonthWageTotal,
      threeMonthDays,
      averageDailyWage,
      ordinaryDailyWage,
      basisDailyWage,
      wageBasis,
      isEligibleForStatutory,
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
  const convertedSalary = computeConvertedSalary(
    statutorySeverance,
    serviceYearsRounded,
    serviceYearsDeduction,
  );
  const convertedSalaryDeduction = computeConvertedSalaryDeduction(convertedSalary);
  const retirementTaxableBase = Math.max(0, convertedSalary - convertedSalaryDeduction);
  const retirementIncomeTax = computeRetirementIncomeTax(
    retirementTaxableBase,
    serviceYearsRounded,
  );
  const localIncomeTax = Math.floor((retirementIncomeTax * LOCAL_INCOME_TAX_RATE) / 10) * 10;
  const totalTax = retirementIncomeTax + localIncomeTax;

  return {
    serviceDays,
    serviceYears,
    threeMonthWageTotal,
    threeMonthDays,
    averageDailyWage,
    ordinaryDailyWage,
    basisDailyWage,
    wageBasis,
    isEligibleForStatutory,
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
