// DTI 계산기의 "구간별 바로 보기" 표. 칸마다 같은 순수 함수의 직접 계산값과 대조한다.
import { describe, expect, it } from 'vitest';
import { dtiQuickTable } from '@/lib/quick-tables/dti';
import { calculateDebtToIncome } from '@/lib/finance/dti';
import type { QuickTableData } from '@/lib/quick-tables/types';

const pct = (ratio: number) => `${(ratio * 100).toFixed(2)}%`;
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

describe('DTI 표', () => {
  const t = dtiQuickTable();

  it('연소득 6,000만 원 · 월 150만 원 상환은 계산기 기본값과 같은 DTI', () => {
    shape(t, 8);
    const col = t.headers.indexOf('월 150만 원 상환');
    expect(col).toBeGreaterThan(0);
    const r = calculateDebtToIncome({
      annualIncome: 60_000_000,
      mortgageAnnualPayment: 18_000_000,
      otherLoanAnnualInterest: 0,
    });
    expect(row(t, '6,000만 원')?.[col]).toBe(pct(r.ratio ?? Number.NaN));
  });

  it('연소득 3,000만 원 · 월 200만 원 상환', () => {
    const col = t.headers.indexOf('월 200만 원 상환');
    const r = calculateDebtToIncome({
      annualIncome: 30_000_000,
      mortgageAnnualPayment: 24_000_000,
      otherLoanAnnualInterest: 0,
    });
    expect(row(t, '3,000만 원')?.[col]).toBe(pct(r.ratio ?? Number.NaN));
  });
});
