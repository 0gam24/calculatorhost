/**
 * 연차 유급휴가 참고 계산 단위 테스트.
 * 근거: 근로기준법 §60(연차 유급휴가), §18③(4주 평균 15시간 미만 적용 제외),
 *       §11②·시행령 §7 별표1(상시 4명 이하 적용 제외), 시행령 §9 별표2(단시간근로자),
 *       대법원 2021. 10. 14. 선고 2021다227100(1년 365일 근로 후 다음 날 근로관계 없으면
 *       §60① 15일 발생 안 함. 월 단위 연차도 "1개월 근로를 마친 다음 날 근로관계" 전제의
 *       같은 논리 — 고용노동부 2021-12 행정해석 변경 임금근로시간정책팀-7513).
 */
import { describe, expect, it } from 'vitest';
import {
  calculateAnnualLeave,
  type AnnualLeaveInput,
} from '@/lib/work/annual-leave';
import {
  ANNUAL_LEAVE_ADDITIONAL_INTERVAL,
  ANNUAL_LEAVE_BASE_DAYS,
  ANNUAL_LEAVE_MAX_DAYS,
  ANNUAL_LEAVE_MAX_MONTHLY_DAYS,
  FULL_TIME_DAILY_HOURS,
  MONTHLY_ORDINARY_HOURS,
} from '@/lib/constants/labor-rules-2026';

const base: AnnualLeaveInput = {
  hireDate: '2026-01-01',
  untilDate: '2026-02-01',
  weeklyHours: 40,
  fivePlus: true,
  usedDays: 0,
  hourlyWage: 10_320,
};

describe('labor-rules-2026 연차 상수', () => {
  it('월 연차 상한 11일(§60②·⑦) · 기본 15일(§60①) · 가산 2년에 1일(§60④) · 상한 25일(§60④ 단서)', () => {
    expect(ANNUAL_LEAVE_MAX_MONTHLY_DAYS).toBe(11);
    expect(ANNUAL_LEAVE_BASE_DAYS).toBe(15);
    expect(ANNUAL_LEAVE_ADDITIONAL_INTERVAL).toBe(2);
    expect(ANNUAL_LEAVE_MAX_DAYS).toBe(25);
  });
  it('통상근로자 1일 8시간(§50①·시행령 §9 별표2) · 월 통상임금 기준시간 209시간', () => {
    expect(FULL_TIME_DAILY_HOURS).toBe(8);
    expect(MONTHLY_ORDINARY_HOURS).toBe(209);
  });
});

describe('연차 유급휴가 (근로기준법 §60)', () => {
  describe('1년 미만 월 연차 (§60②, 민법 §160 대응일)', () => {
    it('입사 2026-01-01, 1/31 기준: 월 연차 아직 미발생 (대응일 2/1 전)', () => {
      const r = calculateAnnualLeave({ ...base, untilDate: '2026-01-31' });
      expect(r.eligible).toBe(true);
      expect(r.reason).toBe('ok');
      expect(r.availableDays).toBe(0);
      expect(r.totalAccruedDays).toBe(0);
      expect(r.nextAccrual).toEqual({ date: '2026-02-01', days: 1 });
    });

    it('입사 2026-01-01, 2/1 기준: 1일, 다음 발생 3/1 (1일)', () => {
      const r = calculateAnnualLeave({ ...base, untilDate: '2026-02-01' });
      expect(r.availableDays).toBe(1);
      expect(r.totalAccruedDays).toBe(1);
      expect(r.blocks.filter((b) => b.kind === 'monthly')).toHaveLength(11);
      expect(r.nextAccrual).toEqual({ date: '2026-03-01', days: 1 });
    });

    it('입사 2026-01-01, 12/1 기준: 월 연차 11일', () => {
      const r = calculateAnnualLeave({ ...base, untilDate: '2026-12-01' });
      expect(r.availableDays).toBe(11);
      expect(r.totalAccruedDays).toBe(11);
    });

    it('입사 2026-01-01, 12/31 기준: 11일 (1년차 15일 블록은 2027-01-01 발생)', () => {
      const r = calculateAnnualLeave({ ...base, untilDate: '2026-12-31' });
      expect(r.availableDays).toBe(11);
      expect(r.totalAccruedDays).toBe(11);
      expect(r.nextAccrual).toEqual({ date: '2027-01-01', days: 15 });
    });

    it('입사 2026-01-01, 마지막 근무 2026-07-31: 7개월 개근이어도 8/1 근로관계가 없어 6일 (고용노동부 2021-12-16 행정해석 변경 예시)', () => {
      const r = calculateAnnualLeave({ ...base, hireDate: '2026-01-01', untilDate: '2026-07-31' });
      expect(r.availableDays).toBe(6);
      expect(r.nextAccrual).toEqual({ date: '2026-08-01', days: 1 });
    });

    it('입사 2026-01-31: 첫 월 연차 발생일 2026-03-01 (2월에 31일 없음 → 다음 달 1일)', () => {
      const r = calculateAnnualLeave({ ...base, hireDate: '2026-01-31', untilDate: '2026-03-01' });
      const first = r.blocks.find((b) => b.kind === 'monthly' && b.serviceYear === 1);
      expect(first?.accruedOn).toBe('2026-03-01');
      expect(r.availableDays).toBe(1);
    });
  });

  describe('1년 이상 연차 (§60①·④, 대법원 2021다227100)', () => {
    it('입사 2026-01-01, 2027-01-01 기준: 1년차 15일 (월 연차 11일은 2026-12-31 소멸)', () => {
      const r = calculateAnnualLeave({ ...base, untilDate: '2027-01-01' });
      expect(r.availableDays).toBe(15);
      expect(r.availableHours).toBe(120);
      expect(r.totalAccruedDays).toBe(11 + 15);
      expect(r.completedYears).toBe(1);
    });

    it('입사 2026-01-01, 마지막 근무 2026-12-31: 1년차 15일 블록은 발생 안 함 (대법원 2021다227100)', () => {
      const r = calculateAnnualLeave({ ...base, untilDate: '2026-12-31' });
      const firstAnnual = r.blocks.find((b) => b.kind === 'annual' && b.serviceYear === 1);
      // 블록은 미발생 상태로 리스트에 올라 있어도, 사용 가능하지 않다.
      expect(firstAnnual?.usableOnUntilDate).toBe(false);
      expect(r.availableDays).toBe(11); // 월 연차만
    });

    it('3년차 입사 2023-01-01, untilDate 2026-01-01: 16일', () => {
      const r = calculateAnnualLeave({ ...base, hireDate: '2023-01-01', untilDate: '2026-01-01' });
      expect(r.availableDays).toBe(16);
      expect(r.completedYears).toBe(3);
    });

    it('21년차 입사 2005-01-01: 25일 (상한 첫 도달)', () => {
      const r = calculateAnnualLeave({ ...base, hireDate: '2005-01-01', untilDate: '2026-01-01' });
      expect(r.availableDays).toBe(25);
    });

    it('25년차 입사 2001-01-01: 25일 (상한 유지)', () => {
      const r = calculateAnnualLeave({ ...base, hireDate: '2001-01-01', untilDate: '2026-01-01' });
      expect(r.availableDays).toBe(25);
    });

    it('입사 2024-02-29 (윤년): 첫 기념일 2025-03-01 (2월에 29일 없음 → 다음 달 1일)', () => {
      const r = calculateAnnualLeave({ ...base, hireDate: '2024-02-29', untilDate: '2025-03-01' });
      const firstAnnual = r.blocks.find((b) => b.kind === 'annual' && b.serviceYear === 1);
      expect(firstAnnual?.accruedOn).toBe('2025-03-01');
      expect(r.availableDays).toBe(15);
    });
  });

  describe('적용 제외 (§18③, §11②·시행령 §7 별표1)', () => {
    it('주 14시간: 4주 평균 15시간 미만이라 §60 미적용(under15)', () => {
      const r = calculateAnnualLeave({
        ...base,
        weeklyHours: 14,
        hireDate: '2024-01-01',
        untilDate: '2026-01-01',
      });
      expect(r.eligible).toBe(false);
      expect(r.reason).toBe('under15');
      expect(r.availableDays).toBe(0);
      expect(r.availableHours).toBe(0);
      expect(r.allowance).toBe(0);
      expect(r.blocks).toEqual([]);
    });

    it('상시 4명 이하(fivePlus=false): §60 미적용(under5)', () => {
      const r = calculateAnnualLeave({
        ...base,
        fivePlus: false,
        hireDate: '2024-01-01',
        untilDate: '2026-01-01',
      });
      expect(r.eligible).toBe(false);
      expect(r.reason).toBe('under5');
      expect(r.availableDays).toBe(0);
      expect(r.allowance).toBe(0);
    });
  });

  describe('단시간 근로자 (시행령 §9 별표2) · 미사용 수당 (§60⑤)', () => {
    it('주 20시간 1년차: 15일 × (20/40) × 8 = 60시간, 하루 소정 4시간', () => {
      const r = calculateAnnualLeave({
        ...base,
        weeklyHours: 20,
        hireDate: '2025-01-01',
        untilDate: '2026-01-01',
      });
      expect(r.availableDays).toBe(15);
      expect(r.availableHours).toBe(60);
      expect(r.dailyHours).toBe(4);
    });

    it('주 17.5시간: 1시간 미만은 1시간으로 본다(시행령 별표2 제4호 나목). 1년차 52.5→53시간, 월 연차 3.5→4시간', () => {
      const year1 = calculateAnnualLeave({
        ...base,
        weeklyHours: 17.5,
        hireDate: '2025-01-01',
        untilDate: '2026-01-01',
      });
      expect(year1.availableHours).toBe(53);
      const month1 = calculateAnnualLeave({
        ...base,
        weeklyHours: 17.5,
        hireDate: '2026-01-01',
        untilDate: '2026-02-01',
      });
      expect(month1.availableHours).toBe(4);
    });

    it('availableDays 15일 중 10일 사용, 미사용 5일 × 8시간 × 12,000원 = 480,000원', () => {
      const r = calculateAnnualLeave({
        ...base,
        hireDate: '2025-01-01',
        untilDate: '2026-01-01',
        usedDays: 10,
        hourlyWage: 12_000,
      });
      expect(r.availableDays).toBe(15);
      expect(r.availableHours).toBe(120);
      expect(r.dailyHours).toBe(8);
      expect(r.unusedHours).toBe(40);
      expect(r.allowance).toBe(480_000);
    });
  });

  describe('입력 검증', () => {
    it('untilDate 가 hireDate 보다 앞이면 RangeError', () => {
      expect(() =>
        calculateAnnualLeave({ ...base, hireDate: '2026-02-01', untilDate: '2026-01-01' }),
      ).toThrow(RangeError);
    });
    it('잘못된 날짜 형식은 Error', () => {
      expect(() => calculateAnnualLeave({ ...base, hireDate: '2026-13-01' })).toThrow();
      expect(() => calculateAnnualLeave({ ...base, hireDate: '202-01-01' })).toThrow();
    });
    it('weeklyHours 가 40 초과면 40으로 캡 (명세 §3)', () => {
      const r = calculateAnnualLeave({
        ...base,
        weeklyHours: 52,
        hireDate: '2025-01-01',
        untilDate: '2026-01-01',
      });
      expect(r.availableHours).toBe(120); // 15일 × 8시간
      expect(r.dailyHours).toBe(8);
    });
  });
});
