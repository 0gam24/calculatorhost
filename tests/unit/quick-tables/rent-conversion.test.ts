// 전월세 전환 계산기의 "구간별 바로 보기" 표. 칸마다 같은 순수 함수의 직접 계산값과 대조한다.
import { describe, expect, it } from 'vitest';
import bokRates from '@/data/bok-rates.json';
import { rentConversionQuickTable } from '@/lib/quick-tables/rent-conversion';
import { calculateRentConversion } from '@/lib/finance/rent-conversion';
import {
  RENT_CONVERSION_ADDITIONAL_RATE,
  RENT_CONVERSION_ANNUAL_CAP,
} from '@/lib/constants/rent-rules-2026';
import type { QuickTableData } from '@/lib/quick-tables/types';

const won = (n: number) => `${Math.round(n).toLocaleString('ko-KR')}원`;
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

const monthlyRent = (amount: number) =>
  calculateRentConversion({
    mode: 'jeonseToMonthly',
    jeonseDeposit: amount,
    newDeposit: 0,
    baseRatePercent: bokRates.baseRate * 100,
    additionalRatePercent: RENT_CONVERSION_ADDITIONAL_RATE * 100,
    annualCapPercent: RENT_CONVERSION_ANNUAL_CAP * 100,
  });

describe('전월세 전환 표', () => {
  const t = rentConversionQuickTable();

  it('보증금 1억 원을 월세로 바꾸면 bok-rates.json 기준금리로 계산한 상한 월세', () => {
    shape(t, 8);
    const r = monthlyRent(100_000_000);
    expect(row(t, '1억 원')?.[1]).toBe(won(r.resultMonthlyRent ?? Number.NaN));
    expect(row(t, '1억 원')?.[2]).toBe(won((r.resultMonthlyRent ?? Number.NaN) * 12));
  });

  it('caption 의 기준금리·상한은 데이터 파일과 함수 값에서 온다', () => {
    const r = monthlyRent(30_000_000);
    expect(row(t, '3,000만 원')?.[1]).toBe(won(r.resultMonthlyRent ?? Number.NaN));
    expect(t.caption).toContain(`${(bokRates.baseRate * 100).toFixed(2)}%`);
    expect(t.caption).toContain(`${r.appliedConversionRatePercent.toFixed(2)}%`);
  });
});
