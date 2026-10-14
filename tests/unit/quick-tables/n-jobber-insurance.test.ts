// N잡러 건강보험 계산기의 "구간별 바로 보기" 표.
// 표의 숫자는 계산기와 같은 순수 함수(calculateNJobberInsurance)에서 나와야 한다.
import { describe, expect, it } from 'vitest';
import { nJobberInsuranceQuickTable } from '@/lib/quick-tables/n-jobber-insurance';
import { calculateNJobberInsurance } from '@/lib/tax/n-jobber-insurance';
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

describe('N잡러 추가 건강보험료 표', () => {
  const t = nJobberInsuranceQuickTable();

  it('연봉 5,000만 원 + 부업 3,000만 원, 계산기와 같은 월 추가 보험료·월 합계', () => {
    shape(t, 6);
    const r = calculateNJobberInsurance({
      mainWageIncome: 50_000_000,
      sideBusinessIncome: 30_000_000,
      sideOtherIncome: 0,
      isDependent: false,
    });
    const cells = row(t, '3,000만 원');
    expect(cells?.[1]).toBe(won(r.extraIncomeMonthlyPremium));
    expect(cells?.[2]).toBe(won(r.extraIncomeMonthlyPremium * 12));
    expect(cells?.[3]).toBe(won(r.totalMonthlyPremium));
  });

  it('부업 소득 2,000만 원 이하는 추가 보험료 0원', () => {
    expect(row(t, '1,000만 원')?.[1]).toBe('0원');
    expect(row(t, '2,000만 원')?.[1]).toBe('0원');
    expect(row(t, '2,500만 원')?.[1]).not.toBe('0원');
  });
});
