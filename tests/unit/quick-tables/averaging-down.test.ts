// 물타기 계산기 "구간별 바로 보기" 표 (src/lib/quick-tables/averaging-down.ts).
// 칸마다 calculateNewAverage 의 새 평균단가와 같아야 한다.
import { describe, expect, it } from 'vitest';
import { averagingDownQuickTable } from '@/lib/quick-tables/averaging-down';
import { calculateNewAverage } from '@/lib/finance/averaging-down';
import type { QuickTableData } from '@/lib/quick-tables/types';

const won = (n: number) => `${Math.round(n).toLocaleString('ko-KR')}원`;
const row = (t: QuickTableData, first: string) => t.rows.find((r) => r[0] === first);
const average = (price: number, quantity: number) =>
  calculateNewAverage({
    currentPosition: { price: 10_000, quantity: 100 },
    additionalPurchase: { price, quantity },
  }).averagePrice;

describe('물타기 평균단가 표', () => {
  const t = averagingDownQuickTable();

  it('모양: 7행, 열 수 일치, 깨진 값·긴 줄표 없음', () => {
    expect(t.title.endsWith('?')).toBe(true);
    expect(t.caption.length).toBeGreaterThan(5);
    expect(t.note.length).toBeGreaterThan(10);
    expect(t.rows.length).toBeGreaterThanOrEqual(6);
    for (const r of t.rows) expect(r).toHaveLength(t.headers.length);
    expect(JSON.stringify(t)).not.toMatch(/NaN|Infinity|undefined|[—–]/);
  });

  it('추가 100주 · 7,000원 = (100만 + 70만) ÷ 200주 = 8,500원', () => {
    const col = t.headers.indexOf('7,000원에 매수');
    expect(row(t, '추가 100주')?.[col]).toBe(won(average(7_000, 100)));
    expect(row(t, '추가 100주')?.[col]).toBe('8,500원');
  });

  it('추가 50주 · 8,000원은 1원 미만 버림 (9,333원), 평균단가는 추가 매수가보다 높다', () => {
    const col = t.headers.indexOf('8,000원에 매수');
    expect(row(t, '추가 50주')?.[col]).toBe(won(average(8_000, 50)));
    expect(row(t, '추가 50주')?.[col]).toBe('9,333원');
    expect(average(6_000, 500)).toBeGreaterThan(6_000);
  });
});
