// 프리랜서 종합소득세 계산기의 "구간별 바로 보기" 표.
// 표의 숫자는 계산기와 같은 순수 함수(calculateFreelancerTax)에서 나와야 한다.
import { describe, expect, it } from 'vitest';
import { freelancerTaxQuickTable } from '@/lib/quick-tables/freelancer-tax';
import { calculateFreelancerTax } from '@/lib/tax/freelancer';
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

const calc = (annualRevenue: number) =>
  calculateFreelancerTax({
    annualRevenue,
    expenseMethod: 'simpleRate',
    simpleExpenseRatePercent: 64.1,
    dependents: 1,
    children: 0,
    nationalPensionPaid: 0,
    healthInsurancePaid: 0,
  });

describe('프리랜서 3.3% 환급 표', () => {
  const t = freelancerTaxQuickTable();

  it('연 수입 3,000만 원, 계산기와 같은 정산액·세금·기납부세액', () => {
    shape(t, 6);
    const r = calc(30_000_000);
    expect(r.settlementAmount).toBeLessThan(0);
    const cells = row(t, '3,000만 원');
    expect(cells?.[1]).toBe(`환급 ${won(-r.settlementAmount)}`);
    expect(cells?.[2]).toBe(won(r.totalTaxLiability));
    expect(cells?.[3]).toBe(won(r.withholdingPaid));
  });

  it('단순경비율 대상일 가능성이 큰 4,500만 원까지만 보여 준다', () => {
    expect(row(t, '5,000만 원')).toBeUndefined();
    const top = calc(45_000_000);
    expect(top.standardTaxCredit).toBe(70_000);
    expect(row(t, '4,500만 원')?.[1]).toBe(`환급 ${won(-top.settlementAmount)}`);
  });
});
