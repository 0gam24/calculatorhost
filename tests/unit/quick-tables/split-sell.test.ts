// 분할매도 계산기 "구간별 바로 보기" 표 (src/lib/quick-tables/split-sell.ts).
// 차수별 실현손익이 calculateSplitSell(수수료·거래세 0) 결과와 같아야 한다.
import { describe, expect, it } from 'vitest';
import { splitSellQuickTable } from '@/lib/quick-tables/split-sell';
import { calculateSplitSell } from '@/lib/finance/split-sell';
import type { QuickTableData } from '@/lib/quick-tables/types';

const won = (n: number) => `${Math.round(n).toLocaleString('ko-KR')}원`;
const row = (t: QuickTableData, first: string) => t.rows.find((r) => r[0] === first);

describe('분할매도 차수별 실현손익 표', () => {
  const t = splitSellQuickTable();

  it('모양: 5차, 열 수 일치, 깨진 값·긴 줄표 없음', () => {
    expect(t.title.endsWith('?')).toBe(true);
    expect(t.caption.length).toBeGreaterThan(5);
    expect(t.note.length).toBeGreaterThan(10);
    expect(t.rows).toHaveLength(5);
    for (const r of t.rows) expect(r).toHaveLength(t.headers.length);
    expect(JSON.stringify(t)).not.toMatch(/NaN|Infinity|undefined|[—–]/);
  });

  it('3차 12,000원 (+20%): 이번 +20만, 누적 +35만, 남은 200주', () => {
    const r = calculateSplitSell({
      averagePrice: 10_000,
      holdingQuantity: 500,
      entries: [10_500, 11_000, 12_000].map((price) => ({ price, quantity: 100 })),
      sellFeeRate: 0,
      taxRate: 0,
    });
    const third = r.entries[2];
    expect(third).toBeDefined();
    const tableRow = row(t, '3차 12,000원 (+20%)');
    expect(tableRow?.[1]).toBe(`+${won(third?.realizedPnL ?? NaN)}`);
    expect(tableRow?.[2]).toBe(`+${won(r.totalRealizedPnL)}`);
    expect(tableRow?.slice(1)).toEqual(['+200,000원', '+350,000원', '200주']);
  });

  it('마지막 5차 +50%에서 전량 매도, 누적 +115만 원', () => {
    expect(row(t, '5차 15,000원 (+50%)')?.slice(1)).toEqual(['+500,000원', '+1,150,000원', '0주']);
  });
});
