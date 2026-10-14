// 중개수수료 "구간별 바로 보기" 표 (src/lib/quick-tables/broker-fee.ts).
// 표의 숫자는 계산기와 같은 순수 함수에서 나와야 한다. 칸을 직접 계산값과 대조한다.
import { describe, expect, it } from 'vitest';
import { brokerFeeQuickTable } from '@/lib/quick-tables/broker-fee';
import { calculateRealtyCommission } from '@/lib/finance/realty-commission';
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

describe('중개수수료 표', () => {
  const t = brokerFeeQuickTable();
  it('9억 매매·6억 전세, 계산기와 같은 상한 보수', () => {
    shape(t, 10);
    const sale = calculateRealtyCommission({
      transactionType: 'sale',
      propertyKind: 'house',
      salePrice: 900_000_000,
      includeVat: false,
    });
    expect(row(t, '9억 원')?.[1]).toBe(won(sale.total));
    const jeonse = calculateRealtyCommission({
      transactionType: 'jeonse',
      propertyKind: 'house',
      salePrice: 600_000_000,
      includeVat: false,
    });
    expect(row(t, '6억 원')?.[2]).toBe(won(jeonse.total));
  });

  it('부가세 열은 계산기의 부가세 포함 금액', () => {
    const withVat = calculateRealtyCommission({
      transactionType: 'sale',
      propertyKind: 'house',
      salePrice: 500_000_000,
      includeVat: true,
    });
    expect(row(t, '5억 원')?.[3]).toBe(won(withVat.total));
  });
});
