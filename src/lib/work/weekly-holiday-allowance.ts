/**
 * 주휴수당(1주 유급휴일 임금) 참고 계산.
 * 근거: 근로기준법 §55①, 시행령 §30①(개근 요건), §18③(4주 평균 주 15시간 미만 제외),
 *       §50①(주 40시간), 시행령 §9① 별표2 제2호 나목(단시간근로자 1일 소정근로시간).
 * https://www.law.go.kr/법령/근로기준법
 * 통상근로자가 주 5일 근무하는 사업장을 가정한다(주휴시간 = 1주 소정근로시간 ÷ 5).
 * 계약상 더 유리한 약정, 퇴직 주 처리, 결근 사유의 정당성, 통상시급 산정은 판정하지 않는다.
 * 원 미만 반올림·절사 규칙을 가정하지 않으며 반환 금액에 소수가 있을 수 있다.
 */
import {
  FULL_TIME_WORKDAYS_PER_WEEK,
  STANDARD_WEEKLY_HOURS,
  WEEKLY_HOLIDAY_MIN_WEEKLY_HOURS,
  WEEKS_PER_MONTH,
} from '@/lib/constants/labor-rules-2026';

export interface WeeklyHolidayAllowanceInput {
  /** 통상시급(원, 정수). */
  hourlyWage: number;
  /** 1주 소정근로시간 (4주 평균, 소수 둘째 자리까지). 연장근로는 넣지 않는다. */
  weeklyHours: number;
  /** 그 주 소정근로일을 모두 나왔는지(시행령 §30①). */
  fullAttendance: boolean;
}

export type WeeklyHolidayReason = 'ok' | 'under15' | 'absence';

export interface WeeklyHolidayAllowanceResult {
  eligible: boolean;
  reason: WeeklyHolidayReason;
  /** 소정근로시간이 40시간을 넘게 입력돼 40시간으로 잘랐는지 */
  cappedHours: boolean;
  /** 계산에 쓴 1주 소정근로시간 */
  countedHours: number;
  /** 주휴로 받는 시간 */
  paidHours: number;
  /** 1주 주휴수당 */
  weeklyPay: number;
  /** 1주 소정근로 임금 (시급 × 계산에 쓴 시간) */
  weeklyWorkPay: number;
  /** 월 환산 주휴시간 (× 365 ÷ 84) */
  monthlyHours: number;
  /** 월 환산 주휴수당 (× 365 ÷ 84) */
  monthlyPay: number;
  /** 주휴를 포함한 실질 시급 */
  effectiveHourlyWage: number;
}

const MAX_INPUT_HOURS = 168;

function toHundredthHours(value: number): number {
  if (!Number.isFinite(value) || value < 0 || value > MAX_INPUT_HOURS) {
    throw new RangeError(`1주 소정근로시간은 0~${MAX_INPUT_HOURS}시간 범위의 유한한 숫자여야 합니다.`);
  }
  const hundredths = Math.round(value * 100);
  if (hundredths / 100 !== value) {
    throw new RangeError('1주 소정근로시간은 소수 둘째 자리까지 입력해 주세요.');
  }
  return hundredths;
}

export function calculateWeeklyHolidayAllowance(
  input: WeeklyHolidayAllowanceInput,
): WeeklyHolidayAllowanceResult {
  const { hourlyWage, weeklyHours, fullAttendance } = input;
  if (!Number.isInteger(hourlyWage) || hourlyWage < 0 || hourlyWage > 1_000_000) {
    throw new RangeError('시급은 0~1,000,000원 범위의 원 단위 정수여야 합니다.');
  }
  const entered = toHundredthHours(weeklyHours);
  const cap = STANDARD_WEEKLY_HOURS * 100;
  const counted = Math.min(entered, cap);
  const cappedHours = entered > cap;
  const countedHours = counted / 100;
  const weeklyWorkPay = (counted * hourlyWage) / 100;

  const reason: WeeklyHolidayReason =
    counted < WEEKLY_HOLIDAY_MIN_WEEKLY_HOURS * 100 ? 'under15' : !fullAttendance ? 'absence' : 'ok';
  const eligible = reason === 'ok';
  const divisor = 100 * FULL_TIME_WORKDAYS_PER_WEEK;
  const paidHours = eligible ? counted / divisor : 0;
  const weeklyPay = eligible ? (counted * hourlyWage) / divisor : 0;
  // 주휴시간이 소정근로시간의 1/5 이므로 주휴 포함 실질 시급은 시급 × 6/5
  const effectiveHourlyWage = eligible
    ? (hourlyWage * (FULL_TIME_WORKDAYS_PER_WEEK + 1)) / FULL_TIME_WORKDAYS_PER_WEEK
    : hourlyWage;

  return {
    eligible,
    reason,
    cappedHours,
    countedHours,
    paidHours,
    weeklyPay,
    weeklyWorkPay,
    monthlyHours: paidHours * WEEKS_PER_MONTH,
    monthlyPay: weeklyPay * WEEKS_PER_MONTH,
    effectiveHourlyWage,
  };
}
