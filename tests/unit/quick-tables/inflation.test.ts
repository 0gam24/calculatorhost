// 물가상승(인플레이션) 계산기의 "구간별 바로 보기" 표.
// 표의 숫자는 계산기와 같은 순수 함수(calculateInflation)에서 나와야 한다.
import { describe, expect, it } from 'vitest';
import { inflationQuickTable } from '@/lib/quick-tables/inflation';
import { calculateInflation } from '@/lib/finance/inflation';
import type { QuickTableData } from '@/lib/quick-tables/types';

const won = (n: number) => `${Math.round(n).toLocaleString('ko-KR')}원`;
const row = (t: QuickTableData, first: string) => t.rows.find((r) => r[0] === first);

function shape(t: QuickTableData, minRows: number) {
  expect(t.title.length).toBeGreaterThan(5);
  expect(t.title.endsWith('?')).toBe(true);
  expect(t.caption.length).toBeGreaterThan(5);
  expect(t.note.length).toBeGreaterThan(10);
  expect(t.rows.length).toBeGreaterThanOrEqual(minRows);
  for (const r of t.rows) expect(r).toHaveLength(t.headers.length);
  const text = JSON.stringify(t);
  expect(text).not.toMatch(/NaN|Infinity|undefined|[\u2014\u2013]/);
}

describe('물가상승 표', () => {
  const t = inflationQuickTable();

  it('1,000만 원 · 10년 · 연 2%: 미래 필요 금액과 구매력이 계산기 값과 같다', () => {
    shape(t, 6);
    const base = { amount: 10_000_000, years: 10, annualInflationPercent: 2 };
    const fv = calculateInflation({ mode: 'futureValue', ...base });
    const pp = calculateInflation({ mode: 'purchasingPower', ...base });
    const cells = row(t, '10년 후');
    expect(cells?.[t.headers.indexOf('미래 필요 금액 (연 2%)')]).toBe(won(fv.resultAmount));
    expect(cells?.[t.headers.indexOf('보유 금액의 구매력 (연 2%)')]).toBe(won(pp.resultAmount));
  });

  it('연 3% 칸은 같은 기간의 연 2% 칸보다 크다', () => {
    for (const r of t.rows) {
      const toNumber = (s: string | undefined) => Number((s ?? '').replace(/[^0-9]/g, ''));
      expect(toNumber(r[2])).toBeGreaterThan(toNumber(r[1]));
    }
  });
});
