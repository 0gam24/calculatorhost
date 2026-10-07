import { describe, expect, it } from 'vitest';
import {
  calculateWeeklyHolidayAllowance,
  type WeeklyHolidayAllowanceInput,
} from '@/lib/work/weekly-holiday-allowance';
import {
  MINIMUM_HOURLY_WAGE_2026,
  MINIMUM_HOURLY_WAGE_2027,
  WEEKLY_HOLIDAY_MIN_WEEKLY_HOURS,
  STANDARD_WEEKLY_HOURS,
} from '@/lib/constants/labor-rules-2026';

const base: WeeklyHolidayAllowanceInput = {
  hourlyWage: 10_320,
  weeklyHours: 40,
  fullAttendance: true,
};

describe('labor-rules-2026 상수', () => {
  it('최저시급 2026 10,320원 · 2027 10,700원 (최저임금법 §10 고시)', () => {
    expect(MINIMUM_HOURLY_WAGE_2026).toBe(10_320);
    expect(MINIMUM_HOURLY_WAGE_2027).toBe(10_700);
  });
  it('주휴 기준 주 15시간 (근로기준법 §18③) · 법정 주 40시간 (§50①)', () => {
    expect(WEEKLY_HOLIDAY_MIN_WEEKLY_HOURS).toBe(15);
    expect(STANDARD_WEEKLY_HOURS).toBe(40);
  });
});

describe('주휴수당 (근로기준법 §55①, 시행령 §30①, §18③)', () => {
  it('주 40시간 최저시급: 8시간분 82,560원', () => {
    const r = calculateWeeklyHolidayAllowance(base);
    expect(r.eligible).toBe(true);
    expect(r.reason).toBe('ok');
    expect(r.paidHours).toBe(8);
    expect(r.weeklyPay).toBe(82_560);
  });

  it('주 20시간: 20÷40×8 = 4시간분 41,280원', () => {
    const r = calculateWeeklyHolidayAllowance({ ...base, weeklyHours: 20 });
    expect(r.paidHours).toBe(4);
    expect(r.weeklyPay).toBe(41_280);
  });

  it('주 15시간 경계: 받는다, 3시간분 30,960원', () => {
    const r = calculateWeeklyHolidayAllowance({ ...base, weeklyHours: 15 });
    expect(r.eligible).toBe(true);
    expect(r.paidHours).toBe(3);
    expect(r.weeklyPay).toBe(30_960);
  });

  it('주 14.75시간: 15시간 미만이라 0원', () => {
    const r = calculateWeeklyHolidayAllowance({ ...base, weeklyHours: 14.75 });
    expect(r.eligible).toBe(false);
    expect(r.reason).toBe('under15');
    expect(r.paidHours).toBe(0);
    expect(r.weeklyPay).toBe(0);
    expect(r.monthlyPay).toBe(0);
  });

  it('소정근로일 결근이 있으면 그 주 주휴수당 0원', () => {
    const r = calculateWeeklyHolidayAllowance({ ...base, fullAttendance: false });
    expect(r.eligible).toBe(false);
    expect(r.reason).toBe('absence');
    expect(r.weeklyPay).toBe(0);
  });

  it('주 40시간을 넘게 넣어도 소정근로시간은 40시간까지만 반영 (연장근로 제외)', () => {
    const r = calculateWeeklyHolidayAllowance({ ...base, weeklyHours: 52 });
    expect(r.cappedHours).toBe(true);
    expect(r.paidHours).toBe(8);
    expect(r.weeklyPay).toBe(82_560);
  });

  it('월 환산: 주휴수당 × 365 ÷ 7 ÷ 12 (주 40시간 = 약 34.76시간분)', () => {
    const r = calculateWeeklyHolidayAllowance(base);
    expect(r.monthlyPay).toBeCloseTo((82_560 * 365) / 84, 6);
    expect(r.monthlyHours).toBeCloseTo((8 * 365) / 84, 6);
  });

  it('주휴 포함 실질 시급은 소정근로시간과 무관하게 1.2배 (주 15시간 이상)', () => {
    expect(calculateWeeklyHolidayAllowance(base).effectiveHourlyWage).toBe(12_384);
    expect(calculateWeeklyHolidayAllowance({ ...base, weeklyHours: 22 }).effectiveHourlyWage).toBe(12_384);
    expect(calculateWeeklyHolidayAllowance({ ...base, weeklyHours: 10 }).effectiveHourlyWage).toBe(10_320);
  });

  it('주 소정근로 급여도 같이 준다: 시급 × 반영 시간', () => {
    expect(calculateWeeklyHolidayAllowance({ ...base, weeklyHours: 22 }).weeklyWorkPay).toBe(227_040);
  });

  it('소수 시간: 주 17.5시간 3.5시간분 36,120원', () => {
    const r = calculateWeeklyHolidayAllowance({ ...base, weeklyHours: 17.5 });
    expect(r.paidHours).toBe(3.5);
    expect(r.weeklyPay).toBe(36_120);
  });

  it('2027 최저시급 10,700원 주 40시간: 85,600원', () => {
    expect(calculateWeeklyHolidayAllowance({ ...base, hourlyWage: 10_700 }).weeklyPay).toBe(85_600);
  });

  it('잘못된 입력은 RangeError', () => {
    expect(() => calculateWeeklyHolidayAllowance({ ...base, hourlyWage: -1 })).toThrow(RangeError);
    expect(() => calculateWeeklyHolidayAllowance({ ...base, hourlyWage: 10_320.5 })).toThrow(RangeError);
    expect(() => calculateWeeklyHolidayAllowance({ ...base, weeklyHours: -1 })).toThrow(RangeError);
    expect(() => calculateWeeklyHolidayAllowance({ ...base, weeklyHours: 169 })).toThrow(RangeError);
    expect(() => calculateWeeklyHolidayAllowance({ ...base, weeklyHours: 20.123 })).toThrow(RangeError);
    expect(() => calculateWeeklyHolidayAllowance({ ...base, weeklyHours: Number.NaN })).toThrow(RangeError);
  });
});
