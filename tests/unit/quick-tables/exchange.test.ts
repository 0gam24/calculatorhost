// 환율 계산기의 "구간별 바로 보기" 표 (예시 환율).
// 표의 숫자는 계산기와 같은 순수 함수(calculateExchange)에서 나와야 한다.
import { describe, expect, it } from 'vitest';
import { exchangeQuickTable } from '@/lib/quick-tables/exchange';
import { calculateExchange } from '@/lib/finance/exchange';
import type { QuickTableData } from '@/lib/quick-tables/types';

const usd = (n: number) =>
  `${n.toLocaleString('ko-KR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}달러`;
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

const krwToUsd = (amount: number, spreadPercent: number) =>
  calculateExchange({
    direction: 'krwToForeign',
    amount,
    baseRate: 1350,
    spreadPercent,
    feePercent: 0,
    feeFlat: 0,
  }).netAmount;

describe('환전 우대율 표', () => {
  const t = exchangeQuickTable();

  it('100만 원: 우대 없음은 스프레드 1.5%, 우대 90%는 0.15%로 계산한 값', () => {
    shape(t, 6);
    const cells = row(t, '100만 원');
    expect(cells?.[t.headers.indexOf('우대 없음')]).toBe(usd(krwToUsd(1_000_000, 1.5)));
    expect(cells?.[t.headers.indexOf('우대 90%')]).toBe(usd(krwToUsd(1_000_000, 0.15)));
  });

  it('예시 환율이며 오늘 환율은 계산기에 넣으라고 밝힌다', () => {
    expect(t.caption).toContain('예시');
    expect(t.caption).toContain('실제 환율 아님');
    expect(t.note).toContain('오늘 환율이 아니라');
    expect(t.note).toContain('위 계산기');
  });
});
