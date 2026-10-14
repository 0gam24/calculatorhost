// 은퇴자금 계산기 "구간별 바로 보기" 표 (src/lib/quick-tables/retirement.ts).
// 칸마다 calculateRetirement 의 은퇴 시점 예상 자산과 같아야 한다.
import { describe, expect, it } from 'vitest';
import { retirementQuickTable } from '@/lib/quick-tables/retirement';
import { calculateRetirement } from '@/lib/finance/retirement';
import { manWon } from '@/lib/quick-tables/format';
import type { QuickTableData } from '@/lib/quick-tables/types';

const row = (t: QuickTableData, first: string) => t.rows.find((r) => r[0] === first);

const projected = (years: number, rate: number, monthlyContribution = 1_000_000) =>
  calculateRetirement({
    currentAge: 60 - years,
    retirementAge: 60,
    expectedLifespanAge: 90,
    currentSavings: 0,
    monthlyContribution,
    expectedAnnualReturnPercent: rate,
    expectedInflationPercent: 2.5,
    annualSpendingAtRetirement: 40_000_000,
  });

describe('은퇴자금 월 100만 원 저축 표', () => {
  const t = retirementQuickTable();

  it('모양: 7행, 열 수 일치, 깨진 값·긴 줄표·만 단위 올림 오류 없음', () => {
    expect(t.title.endsWith('?')).toBe(true);
    expect(t.caption.length).toBeGreaterThan(5);
    expect(t.note.length).toBeGreaterThan(10);
    expect(t.rows.length).toBeGreaterThanOrEqual(6);
    for (const r of t.rows) expect(r).toHaveLength(t.headers.length);
    const text = JSON.stringify(t);
    expect(text).not.toMatch(/NaN|Infinity|undefined|[—–]/);
    expect(text).not.toContain('10,000만');
  });

  it('30년 · 연 5% = 계산기 예상 자산 (월 복리 연금미래가)', () => {
    const r = projected(30, 5);
    const col = t.headers.indexOf('연 5%');
    expect(row(t, '30년')?.[col]).toBe(manWon(r.projectedSavingsAtRetirement));
    // 손 계산: 100만 × ((1 + 0.05/12)^360 - 1) ÷ (0.05/12) ≈ 8억 3,226만 원
    const i = 0.05 / 12;
    expect(r.projectedSavingsAtRetirement).toBeCloseTo((1_000_000 * ((1 + i) ** 360 - 1)) / i, -1);
    expect(row(t, '30년')?.[col]).toBe('8억 3,226만 원');
  });

  it('10년 · 연 3%, 그리고 월 50만 원이면 절반이라는 안내가 맞다', () => {
    const col = t.headers.indexOf('연 3%');
    expect(row(t, '10년')?.[col]).toBe(manWon(projected(10, 3).projectedSavingsAtRetirement));
    const full = projected(20, 7).projectedSavingsAtRetirement;
    const half = projected(20, 7, 500_000).projectedSavingsAtRetirement;
    expect(Math.abs(full / 2 - half)).toBeLessThanOrEqual(1);
  });
});
