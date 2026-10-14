// 상속세 "구간별 바로 보기" 표 (src/lib/quick-tables/inheritance-tax.ts).
// 표의 숫자는 계산기와 같은 순수 함수에서 나와야 한다. 칸을 직접 계산값과 대조한다.
import { describe, expect, it } from 'vitest';
import { inheritanceTaxQuickTable } from '@/lib/quick-tables/inheritance-tax';
import { calculateInheritanceTax, type InheritanceInput } from '@/lib/tax/inheritance';
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

const base: Omit<InheritanceInput, 'totalAssets' | 'hasSpouse' | 'spouseInheritedAmount'> = {
  funeralAndDebts: 0,
  childrenCount: 2,
  minorChildrenCount: 0,
  minorChildrenAverageAgeYears: 10,
  deductionMode: 'auto',
  reportWithinDeadline: true,
};

describe('상속세 표', () => {
  const t = inheritanceTaxQuickTable();
  it('배우자가 있으면 10억까지 0원, 15억·20억은 계산기 값', () => {
    shape(t, 8);
    expect(row(t, '10억 원')?.[1]).toBe('0원');
    const withSpouse = calculateInheritanceTax({
      ...base,
      totalAssets: 1_500_000_000,
      hasSpouse: true,
      spouseInheritedAmount: 500_000_000,
    });
    expect(row(t, '15억 원')?.[1]).toBe(won(withSpouse.finalTax));
    const noSpouse = calculateInheritanceTax({
      ...base,
      totalAssets: 2_000_000_000,
      hasSpouse: false,
      spouseInheritedAmount: 0,
    });
    expect(row(t, '20억 원')?.[2]).toBe(won(noSpouse.finalTax));
  });
});
