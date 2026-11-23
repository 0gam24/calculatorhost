import { describe, expect, it } from 'vitest';
import { yearEndTaxQuickTable } from '@/lib/quick-tables/year-end-tax';

describe('yearEndTaxQuickTable', () => {
  it('8개 연봉 구간의 결정세액·정산·연금저축 절세 표를 생성한다', () => {
    const table = yearEndTaxQuickTable();
    expect(table.headers).toHaveLength(4);
    expect(table.rows).toHaveLength(8);
    expect(table.rows[0]?.[0]).toBe('3,000만 원');
    expect(table.rows[7]?.[0]).toBe('1억 2,000만 원');
    for (const row of table.rows) {
      expect(row).toHaveLength(4);
      expect(row[1]).toContain('원');
      expect(row[3]).toContain('원');
    }
  });
});
