// 재산세 "구간별 바로 보기" 표 (src/lib/quick-tables/property-tax.ts).
// 표의 숫자는 계산기와 같은 순수 함수에서 나와야 한다. 칸을 직접 계산값과 대조한다.
import { describe, expect, it } from 'vitest';
import { propertyTaxQuickTable } from '@/lib/quick-tables/property-tax';
import { calculatePropertyTaxTotal } from '@/lib/tax/property';
import type { QuickTableData } from '@/lib/quick-tables/types';

const won = (n: number) => `${Math.round(n).toLocaleString('ko-KR')}원`;
const row = (t: QuickTableData, first: string) => t.rows.find((r) => r[0] === first);

function shape(t: QuickTableData, minRows: number) {
  expect(t.title.endsWith('?')).toBe(true);
  expect(t.caption.length).toBeGreaterThan(5);
  expect(t.note.length).toBeGreaterThan(10);
  expect(t.rows.length).toBeGreaterThanOrEqual(minRows);
  for (const r of t.rows) expect(r).toHaveLength(t.headers.length);
  const text = JSON.stringify(t);
  expect(text).not.toMatch(/NaN|Infinity|undefined|[—–]/);
}

describe('재산세 표', () => {
  const t = propertyTaxQuickTable();
  it('공시가격 1억~15억, 계산기와 같은 1년 합계', () => {
    shape(t, 10);
    const special = calculatePropertyTaxTotal({
      publishedPrice: 600_000_000,
      oneHouseholdOneHouse: true,
      urbanArea: false,
    });
    expect(row(t, '6억 원')?.[1]).toBe(won(special.totalTax));
    const urban = calculatePropertyTaxTotal({
      publishedPrice: 600_000_000,
      oneHouseholdOneHouse: true,
      urbanArea: true,
    });
    expect(row(t, '6억 원')?.[2]).toBe(won(urban.totalTax));
    const general = calculatePropertyTaxTotal({
      publishedPrice: 1_000_000_000,
      oneHouseholdOneHouse: false,
      urbanArea: false,
    });
    expect(row(t, '10억 원')?.[3]).toBe(won(general.totalTax));
    expect(row(t, '15억 원')).toBeDefined();
  });
});
