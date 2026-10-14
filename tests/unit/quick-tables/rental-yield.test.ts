// 임대수익률 계산기의 "구간별 바로 보기" 표. 칸마다 같은 순수 함수의 직접 계산값과 대조한다.
import { describe, expect, it } from 'vitest';
import { rentalYieldQuickTable } from '@/lib/quick-tables/rental-yield';
import { calculateRentalYield } from '@/lib/finance/rental-yield';
import type { QuickTableData } from '@/lib/quick-tables/types';

const won = (n: number) => `${Math.round(n).toLocaleString('ko-KR')}원`;
const percent = (p: number) => `${p.toFixed(2)}%`;
const row = (t: QuickTableData, first: string) => t.rows.find((r) => r[0] === first);

function shape(t: QuickTableData, minRows: number) {
  expect(t.title.length).toBeGreaterThan(5);
  expect(t.caption.length).toBeGreaterThan(5);
  expect(t.note.length).toBeGreaterThan(10);
  expect(t.rows.length).toBeGreaterThanOrEqual(minRows);
  for (const r of t.rows) expect(r).toHaveLength(t.headers.length);
  const text = JSON.stringify(t);
  expect(text).not.toMatch(/NaN|Infinity|undefined|[—–]/);
}

describe('임대수익률 표', () => {
  const t = rentalYieldQuickTable();

  it('매매 3억 · 보증금 1억 · 월세 80만, 공실 5% · 관리비 월세의 20%', () => {
    shape(t, 6);
    const r = calculateRentalYield({
      purchasePrice: 300_000_000,
      depositReceived: 100_000_000,
      acquisitionCosts: 0,
      monthlyRent: 800_000,
      monthlyExpenses: 160_000,
      vacancyRatePercent: 5,
    });
    const found = row(t, '3억 / 1억 / 80만');
    expect(found?.[1]).toBe(percent(r.annualYieldPercent));
    expect(found?.[2]).toBe(percent(r.capRatePercent));
    expect(found?.[3]).toBe(won(r.monthlyNetIncome));
  });

  it('매매 10억 · 보증금 1억 · 월세 300만 연 수익률', () => {
    const r = calculateRentalYield({
      purchasePrice: 1_000_000_000,
      depositReceived: 100_000_000,
      acquisitionCosts: 0,
      monthlyRent: 3_000_000,
      monthlyExpenses: 600_000,
      vacancyRatePercent: 5,
    });
    expect(row(t, '10억 / 1억 / 300만')?.[1]).toBe(percent(r.annualYieldPercent));
  });
});
