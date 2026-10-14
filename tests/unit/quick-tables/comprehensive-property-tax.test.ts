// 종합부동산세 "구간별 바로 보기" 표 (src/lib/quick-tables/comprehensive-property-tax.ts).
// 표의 숫자는 계산기와 같은 순수 함수에서 나와야 한다. 칸을 직접 계산값과 대조한다.
import { describe, expect, it } from 'vitest';
import { comprehensivePropertyTaxQuickTable } from '@/lib/quick-tables/comprehensive-property-tax';
import { calculateComprehensivePropertyTax } from '@/lib/tax/comprehensive-property';
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

describe('종부세 표', () => {
  const t = comprehensivePropertyTaxQuickTable();
  it('1세대1주택 12억 이하는 0원, 15억·2주택 30억은 계산기 값', () => {
    shape(t, 8);
    expect(row(t, '12억 원')?.[1]).toBe('0원');
    const one = calculateComprehensivePropertyTax({
      houseCount: 'one',
      totalPublishedPrice: 1_500_000_000,
      isOneHouseholdOneHouse: true,
      seniorAgeYears: 50,
      holdingYears: 0,
      includesAdjustedArea: false,
    });
    expect(row(t, '15억 원')?.[1]).toBe(won(one.totalTax));
    const two = calculateComprehensivePropertyTax({
      houseCount: 'two',
      totalPublishedPrice: 3_000_000_000,
      isOneHouseholdOneHouse: false,
      seniorAgeYears: 50,
      holdingYears: 0,
      includesAdjustedArea: false,
    });
    expect(row(t, '30억 원')?.[2]).toBe(won(two.totalTax));
  });

  it('3주택 이상은 과세표준 12억 원 이하에서 2주택과 같고, 넘으면 더 많다', () => {
    const r20 = row(t, '20억 원');
    expect(r20?.[3]).toBe(r20?.[2]);
    const r40 = row(t, '40억 원');
    const toNumber = (s?: string) => Number((s ?? '').replace(/[^0-9]/g, ''));
    expect(toNumber(r40?.[3])).toBeGreaterThan(toNumber(r40?.[2]));
  });
});
