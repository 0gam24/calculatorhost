// 분할매수 계산기 "구간별 바로 보기" 표 (src/lib/quick-tables/split-buy.ts).
// 차수별 누적 평균단가가 calculateSplitBuy·generateEqualSplit 결과와 같아야 한다.
import { describe, expect, it } from 'vitest';
import { splitBuyQuickTable } from '@/lib/quick-tables/split-buy';
import { calculateSplitBuy, generateEqualSplit } from '@/lib/finance/split-buy';
import type { QuickTableData } from '@/lib/quick-tables/types';

const won = (n: number) => `${Math.round(n).toLocaleString('ko-KR')}원`;
const row = (t: QuickTableData, first: string) => t.rows.find((r) => r[0] === first);

describe('분할매수 차수별 평균단가 표', () => {
  const t = splitBuyQuickTable();

  it('모양: 5차, 열 수 일치, 깨진 값·긴 줄표 없음', () => {
    expect(t.title.endsWith('?')).toBe(true);
    expect(t.caption.length).toBeGreaterThan(5);
    expect(t.note.length).toBeGreaterThan(10);
    expect(t.rows).toHaveLength(5);
    for (const r of t.rows) expect(r).toHaveLength(t.headers.length);
    expect(JSON.stringify(t)).not.toMatch(/NaN|Infinity|undefined|[—–]/);
  });

  it('100주씩 3차까지 = (10,000 + 9,000 + 8,000) × 100 ÷ 300주 = 9,000원', () => {
    const r = calculateSplitBuy({
      entries: [10_000, 9_000, 8_000].map((price) => ({ price, quantity: 100 })),
    });
    expect(row(t, '3차 (8,000원)')?.[1]).toBe(won(r.averagePrice));
    expect(row(t, '3차 (8,000원)')?.[1]).toBe('9,000원');
    expect(row(t, '5차 (6,000원)')?.[1]).toBe('8,000원');
  });

  it('100만 원씩 5차 = 균등분할 결과의 평균단가, 수량은 1주 단위', () => {
    const prices = [10_000, 9_000, 8_000, 7_000, 6_000];
    const split = generateEqualSplit({ totalAmount: 5_000_000, prices });
    const r = calculateSplitBuy({ entries: split.entries });
    const col = t.headers.indexOf('100만 원씩 산 경우');
    expect(col).toBeGreaterThan(0);
    expect(row(t, '5차 (6,000원)')?.[col]).toBe(won(r.averagePrice));
    expect(row(t, '5차 (6,000원)')?.[3]).toBe('166주');
    // 같은 금액씩 산 평균단가가 같은 수량씩 산 평균단가보다 낮다는 안내와 일치
    expect(r.averagePrice).toBeLessThan(8_000);
  });
});
