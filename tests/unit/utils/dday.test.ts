/**
 * D-day / 날짜 계산 단위 테스트
 * 명세: docs/calculator-spec/D-day.md §8
 */

import { describe, expect, it } from 'vitest';
import {
  calculateDday,
  calculateDuration,
  calculateAfterNDays,
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
