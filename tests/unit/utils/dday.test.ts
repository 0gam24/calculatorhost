/**
 * D-day / 날짜 계산 단위 테스트
 * 명세: docs/calculator-spec/D-day.md §8
 */

import { describe, expect, it } from 'vitest';
import {
  calculateDday,
  calculateDuration,
  calculateAfterNDays,
  calculateNthDay,
  upcomingEvents,
} from '@/lib/utils/dday';

describe('calculateDday', () => {
  it('동일 날짜 → D-DAY', () => {
    const r = calculateDday({ baseDate: '2026-01-01', targetDate: '2026-01-01' });
    expect(r.label).toBe('D-DAY');
    expect(r.diffDays).toBe(0);
  });

  it('10일 후 → D-10', () => {
    const r = calculateDday({ baseDate: '2026-01-01', targetDate: '2026-01-11' });
    expect(r.label).toBe('D-10');
    expect(r.diffDays).toBe(10);
  });

  it('10일 지남 → D+10', () => {
    const r = calculateDday({ baseDate: '2026-01-11', targetDate: '2026-01-01' });
    expect(r.label).toBe('D+10');
    expect(r.diffDays).toBe(-10);
  });

  it('1년 후 (2025 → 2026) = 365일', () => {
    const r = calculateDday({ baseDate: '2025-01-01', targetDate: '2026-01-01' });
    expect(r.diffDays).toBe(365);
  });

  it('윤년 포함 1년 (2024 → 2025) = 366일', () => {
    const r = calculateDday({ baseDate: '2024-01-01', targetDate: '2025-01-01' });
    expect(r.diffDays).toBe(366);
  });

  it('윤년 2월 29일 처리', () => {
    const r = calculateDday({ baseDate: '2024-02-28', targetDate: '2024-03-01' });
    expect(r.diffDays).toBe(2);
  });

  it('100일 후', () => {
    const r = calculateDday({ baseDate: '2026-01-01', targetDate: '2026-04-11' });
    expect(r.diffDays).toBe(100);
  });

  it('주/월/년 환산', () => {
    const r = calculateDday({ baseDate: '2026-01-01', targetDate: '2027-01-01' });
    expect(r.diffDays).toBe(365);
    expect(r.weeks).toBeCloseTo(52.14, 1);
    expect(r.months).toBeCloseTo(12, 1);
    expect(r.years).toBeCloseTo(1, 2);
  });

  it('잘못된 날짜 → warning, label "-"', () => {
    const r = calculateDday({ baseDate: 'invalid', targetDate: '2026-01-01' });
    expect(r.warnings.length).toBeGreaterThan(0);
    expect(r.label).toBe('-');
  });

  it('2월 30일(존재 X) → warning', () => {
    const r = calculateDday({ baseDate: '2026-01-01', targetDate: '2026-02-30' });
    expect(r.warnings.length).toBeGreaterThan(0);
  });
});

describe('calculateDuration', () => {
  it('양 끝 포함 10일 (1일 ~ 10일)', () => {
    const r = calculateDuration({
      startDate: '2026-01-01',
      endDate: '2026-01-10',
      inclusion: 'both',
    });
    expect(r.days).toBe(10);
  });

  it('시작일만 포함 → 시작~종료 차이 그대로', () => {
    const r = calculateDuration({
      startDate: '2026-01-01',
      endDate: '2026-01-10',
      inclusion: 'start',
    });
    expect(r.days).toBe(9);
  });

  it('양 끝 제외 → 차이 - 1', () => {
    const r = calculateDuration({
      startDate: '2026-01-01',
      endDate: '2026-01-10',
      inclusion: 'exclude',
    });
    expect(r.days).toBe(8);
  });

  it('시작 > 종료 → 절댓값 + warning', () => {
    const r = calculateDuration({
      startDate: '2026-01-10',
      endDate: '2026-01-01',
      inclusion: 'start',
    });
    expect(r.days).toBe(9);
    expect(r.warnings.length).toBeGreaterThan(0);
  });

  it('잘못된 날짜 → warning', () => {
    const r = calculateDuration({
      startDate: 'bad',
      endDate: '2026-01-10',
      inclusion: 'both',
    });
    expect(r.days).toBe(0);
    expect(r.warnings.length).toBeGreaterThan(0);
  });
});

describe('calculateAfterNDays', () => {
  it('2026-01-01 + 100 = 2026-04-11', () => {
    const r = calculateAfterNDays({ baseDate: '2026-01-01', offset: 100 });
    expect(r.resultDate).toBe('2026-04-11');
  });

  it('2026-01-01 + 0 = 2026-01-01', () => {
    const r = calculateAfterNDays({ baseDate: '2026-01-01', offset: 0 });
    expect(r.resultDate).toBe('2026-01-01');
  });

  it('음수 offset → 과거 날짜', () => {
    const r = calculateAfterNDays({ baseDate: '2026-01-10', offset: -5 });
    expect(r.resultDate).toBe('2026-01-05');
  });

  it('윤년 건너뛰기: 2024-02-28 + 2 = 2024-03-01', () => {
    const r = calculateAfterNDays({ baseDate: '2024-02-28', offset: 2 });
    expect(r.resultDate).toBe('2024-03-01');
  });

  it('요일 계산: 2026-01-01 (목요일)', () => {
    const r = calculateAfterNDays({ baseDate: '2026-01-01', offset: 0 });
    // 2026-01-01은 목요일
    expect(r.weekday).toBe('목');
  });

  it('잘못된 날짜 → warning', () => {
    const r = calculateAfterNDays({ baseDate: 'invalid', offset: 10 });
    expect(r.resultDate).toBe('-');
    expect(r.warnings.length).toBeGreaterThan(0);
  });

  it('NaN offset → warning', () => {
    const r = calculateAfterNDays({ baseDate: '2026-01-01', offset: NaN });
    expect(r.resultDate).toBe('-');
    expect(r.warnings.length).toBeGreaterThan(0);
  });
});

describe('calculateDday 보강 (2026-10-10)', () => {
  it('목표일 요일을 함께 돌려준다', () => {
    const r = calculateDday({ baseDate: '2026-10-10', targetDate: '2026-11-19' });
    expect(r.label).toBe('D-40');
    expect(r.targetWeekday).toBe('목');
  });

  it('목표일이 지났으면 시작일을 1일로 센 날수(며칠째)를 준다', () => {
    // 2026-01-15 시작 → 2026-04-24 는 100일째 (D+99)
    const r = calculateDday({ baseDate: '2026-04-24', targetDate: '2026-01-15' });
    expect(r.label).toBe('D+99');
    expect(r.nthDay).toBe(100);
  });

  it('같은 날은 1일째, 미래 목표일은 며칠째가 없다', () => {
    expect(calculateDday({ baseDate: '2026-01-15', targetDate: '2026-01-15' }).nthDay).toBe(1);
    expect(calculateDday({ baseDate: '2026-01-01', targetDate: '2026-01-11' }).nthDay).toBeNull();
  });
});

describe('calculateNthDay (기념일 방식: 시작일 = 1일째)', () => {
  it('백일: 2026-01-15 출생 → 2026-04-24(금), 출생일 + 99일', () => {
    const r = calculateNthDay({ baseDate: '2026-01-15', n: 100 });
    expect(r.resultDate).toBe('2026-04-24');
    expect(r.weekday).toBe('금');
    expect(r.warnings).toEqual([]);
  });

  it('1일째는 시작일 그날', () => {
    expect(calculateNthDay({ baseDate: '2026-01-15', n: 1 }).resultDate).toBe('2026-01-15');
  });

  it('1000일째: 2026-01-15 → 2028-10-10 (윤년 2028 포함)', () => {
    expect(calculateNthDay({ baseDate: '2026-01-15', n: 1000 }).resultDate).toBe('2028-10-10');
  });

  it('단순 더하기(N일 후)보다 하루 빠르다', () => {
    const nth = calculateNthDay({ baseDate: '2026-01-01', n: 100 }).resultDate;
    const after = calculateAfterNDays({ baseDate: '2026-01-01', offset: 100 }).resultDate;
    expect(nth).toBe('2026-04-10');
    expect(after).toBe('2026-04-11');
  });

  it('0 이하·소수·잘못된 날짜는 warning', () => {
    expect(calculateNthDay({ baseDate: '2026-01-15', n: 0 }).resultDate).toBe('-');
    expect(calculateNthDay({ baseDate: '2026-01-15', n: 1.5 }).warnings.length).toBeGreaterThan(0);
    expect(calculateNthDay({ baseDate: 'bad', n: 100 }).resultDate).toBe('-');
  });
});

describe('upcomingEvents', () => {
  const events = [
    { name: '설날', date: '2027-02-07' },
    { name: '수능', date: '2026-11-19' },
    { name: '지난 날', date: '2026-09-25' },
  ];
  it('기준일 당일과 이후만 날짜 순으로 남긴다', () => {
    expect(upcomingEvents(events, '2026-10-10').map((e) => e.name)).toEqual(['수능', '설날']);
    expect(upcomingEvents(events, '2026-11-19').map((e) => e.name)).toEqual(['수능', '설날']);
    expect(upcomingEvents(events, '2027-02-08')).toEqual([]);
  });
  it('기준일이 잘못되면 빈 배열', () => {
    expect(upcomingEvents(events, '')).toEqual([]);
  });
});
