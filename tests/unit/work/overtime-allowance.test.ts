import { describe, expect, it } from 'vitest';
import { calculateOvertimeAllowance, type OvertimeAllowanceInput } from '@/lib/work/overtime-allowance';

const overtime: OvertimeAllowanceInput = {
  mode: 'overtime', hourlyWage: 12_000, totalHours: 3, nightHours: 0,
};

describe('근로기준법56조 한 근무일 수당', () => {
  it('비휴일 연장3시간: 기본36000+가산18000=54000원', () => {
    expect(calculateOvertimeAllowance(overtime)).toEqual({
      workPay: 36_000, overtimePremium: 18_000, holidayPremium: 0,
      nightPremium: 0, premiumPay: 18_000, totalPay: 54_000,
    });
  });
  it('연장2시간 전부 야간: 기본24000+연장12000+야간12000=48000원', () => {
    expect(calculateOvertimeAllowance({ ...overtime, totalHours: 2, nightHours: 2 })).toEqual({
      workPay: 24_000, overtimePremium: 12_000, holidayPremium: 0,
      nightPremium: 12_000, premiumPay: 24_000, totalPay: 48_000,
    });
  });
  it('휴일10시간:8×18000+2×24000=192000원, 연장가산 중복 없음', () => {
    expect(calculateOvertimeAllowance({ ...overtime, mode: 'holiday', totalHours: 10 })).toEqual({
      workPay: 120_000, overtimePremium: 0, holidayPremium: 72_000,
      nightPremium: 0, premiumPay: 72_000, totalPay: 192_000,
    });
  });
  it('휴일10시간 중 야간2시간:192000+12000=204000원', () => {
    const result = calculateOvertimeAllowance({ ...overtime, mode: 'holiday', totalHours: 10, nightHours: 2 });
    expect(result.holidayPremium).toBe(72_000);
    expect(result.overtimePremium).toBe(0);
    expect(result.nightPremium).toBe(12_000);
    expect(result.totalPay).toBe(204_000);
  });
  it('소정근로 중 야간2시간: 기본임금 제외, 야간가산12000원만', () => {
    expect(calculateOvertimeAllowance({ ...overtime, mode: 'scheduledNight', totalHours: 8, nightHours: 2 })).toEqual({
      workPay: 0, overtimePremium: 0, holidayPremium: 0,
      nightPremium: 12_000, premiumPay: 12_000, totalPay: 12_000,
    });
  });
  it('소정 야간8시간 경계는 기본임금 제외한 가산48000원만 지원한다', () => {
    const result = calculateOvertimeAllowance({ ...overtime, mode: 'scheduledNight', totalHours: 8, nightHours: 8 });
    expect(result.workPay).toBe(0);
    expect(result.overtimePremium).toBe(0);
    expect(result.nightPremium).toBe(48_000);
    expect(result.totalPay).toBe(48_000);
  });
  it('소정 야간 총8.01시간은 야간2시간만 입력해도 유형 분리 확인을 요구한다', () => {
    expect(() => calculateOvertimeAllowance({ ...overtime, mode: 'scheduledNight', totalHours: 8.01, nightHours: 2 })).toThrow(RangeError);
    // 같은8.01시간의 확인된 연장·휴일 유형은 기존 지원범위를 유지한다.
    expect(calculateOvertimeAllowance({ ...overtime, totalHours: 8.01, nightHours: 2 }).totalPay).toBe(156_180);
    expect(calculateOvertimeAllowance({ ...overtime, mode: 'holiday', totalHours: 8.01, nightHours: 2 }).totalPay).toBe(156_240);
  });
  it.each([
    [7.99, 143_820], [8, 144_000], [8.01, 144_240],
  ])('휴일8시간 경계%s시간 → %i원', (totalHours, expected) => {
    expect(calculateOvertimeAllowance({ ...overtime, mode: 'holiday', totalHours }).totalPay).toBe(expected);
  });
  it('소수시간은 정확한 정수비로 계산하고 원 미만을 임의 절사하지 않는다', () => {
    const result = calculateOvertimeAllowance({ ...overtime, hourlyWage: 1, totalHours: 0.29, nightHours: 0.29 });
    expect(result.workPay).toBe(0.29);
    expect(result.overtimePremium).toBe(0.145);
    expect(result.nightPremium).toBe(0.145);
    expect(result.premiumPay).toBe(0.29);
    expect(result.totalPay).toBe(0.58);
    expect(calculateOvertimeAllowance({ ...overtime, hourlyWage: 1, totalHours: 0.01 }).totalPay).toBe(0.015);
  });
  it('24시간 중8시간 야간의 휴일 참고액은576000원', () => {
    // 8×18000+16×24000+8×6000=576000.
    const result = calculateOvertimeAllowance({ ...overtime, mode: 'holiday', totalHours: 24, nightHours: 8 });
    expect(result.totalPay).toBe(576_000);
    expect(result.workPay).toBe(288_000);
    expect(result.holidayPremium).toBe(240_000);
    expect(result.nightPremium).toBe(48_000);
  });
  it.each(['overtime', 'holiday', 'scheduledNight'] as const)('%s의0시간/0시급은 유효한0금액', (mode) => {
    const empty = calculateOvertimeAllowance({ ...overtime, mode, totalHours: 0 });
    expect(Object.values(empty)).toEqual([0, 0, 0, 0, 0, 0]);
    expect(calculateOvertimeAllowance({ ...overtime, mode, hourlyWage: 0, nightHours: 1 }).totalPay).toBe(0);
  });
});

describe('입력 지원범위 검증(법정 한도가 아님)', () => {
  it.each([-1, 24.01, 0.001, NaN, Infinity, -Infinity])('총 근로시간%s는 거부', (totalHours) => {
    expect(() => calculateOvertimeAllowance({ ...overtime, totalHours })).toThrow(RangeError);
  });
  it.each([-1, 3.01, 0.001, 8.01, NaN, Infinity])('잘못된 야간시간%s는 거부', (nightHours) => {
    expect(() => calculateOvertimeAllowance({ ...overtime, nightHours })).toThrow(RangeError);
  });
  it('총근로보다 작아도 한 근무일 야간8시간 초과는 거부', () => {
    expect(() => calculateOvertimeAllowance({ ...overtime, totalHours: 12, nightHours: 9 })).toThrow(RangeError);
  });
  it.each([-1, 0.5, 1_000_001, NaN, Infinity, -Infinity])('시급%s는 거부', (hourlyWage) => {
    expect(() => calculateOvertimeAllowance({ ...overtime, hourlyWage })).toThrow(RangeError);
  });
  it('시급100만원/24시간 지원 상한과 소수 둘째 자리 입력은 허용', () => {
    expect(calculateOvertimeAllowance({ ...overtime, hourlyWage: 1_000_000, totalHours: 24, nightHours: 8 }).totalPay).toBe(40_000_000);
    expect(calculateOvertimeAllowance({ ...overtime, totalHours: 1.01, nightHours: 0.29 }).totalPay).toBe(19_920);
  });
  it('잘못된 유형은 조용히0원으로 계산하지 않는다', () => {
    expect(() => calculateOvertimeAllowance({ ...overtime, mode: 'other' as 'overtime' })).toThrow(RangeError);
  });
});
