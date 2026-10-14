// 대출한도 계산기의 "구간별 바로 보기" 표. 칸마다 같은 순수 함수의 직접 계산값과 대조한다.
import { describe, expect, it } from 'vitest';
import { loanLimitQuickTable } from '@/lib/quick-tables/loan-limit';
import { calculateLoanLimit, type LoanLimitInput } from '@/lib/finance/loan-limit';
import type { QuickTableData } from '@/lib/quick-tables/types';
import { manWon } from '@/lib/quick-tables/format';

const won = (n: number) => `${Math.round(n).toLocaleString('ko-KR')}원`;
const row = (t: QuickTableData, first: string) => t.rows.find((r) => r[0] === first);

function shape(t: QuickTableData, minRows: number) {
  expect(t.title.length).toBeGreaterThan(5);
  expect(t.caption.length).toBeGreaterThan(5);
  expect(t.note.length).toBeGreaterThan(10);
  expect(t.rows.length).toBeGreaterThanOrEqual(minRows);
  for (const r of t.rows) expect(r).toHaveLength(t.headers.length);
  const text = JSON.stringify(t);
  expect(text).not.toMatch(/NaN|Infinity|undefined|[—–]/);
}

const input = (annualIncome: number, newLoanAnnualRate: number): LoanLimitInput => ({
  annualIncome,
  existingDebtAnnualPayment: 0,
  existingDebtAnnualInterest: 0,
  collateralValue: 500_000_000,
  region: 'nonRegulated',
  housingStatus: 'general',
  lender: 'bank',
  newLoanAnnualRate,
  newLoanTermYears: 30,
  applyStressDsr: false,
  repaymentType: 'amortization',
});

describe('대출한도 표', () => {
  const t = loanLimitQuickTable();

  it('연소득 6,000만 원 · 금리 5.5% DSR 한도는 계산기 값과 같다', () => {
    shape(t, 8);
    const col = t.headers.indexOf('금리 연 5.5%');
    expect(col).toBeGreaterThan(0);
    const r = calculateLoanLimit(input(60_000_000, 5.5));
    expect(row(t, '6,000만 원')?.[col]).toBe(won(r.dsrLimit));
  });

  it('1억 원 · 금리 7.0%, 그리고 note 의 집값(LTV) 상한도 함수 값이다', () => {
    const col = t.headers.indexOf('금리 연 7.0%');
    const r = calculateLoanLimit(input(100_000_000, 7.0));
    expect(row(t, '1억 원')?.[col]).toBe(won(r.dsrLimit));
    // 비규제지역 5억 원 집의 LTV 한도
    expect(t.note).toContain(manWon(r.ltvLimit));
  });

  it('같은 소득이면 금리가 높을수록 한도가 줄어든다', () => {
    const parse = (s: string | undefined) => Number((s ?? '').replace(/[^0-9]/g, ''));
    for (const r of t.rows) {
      expect(parse(r[1])).toBeGreaterThan(parse(r[2]));
      expect(parse(r[2])).toBeGreaterThan(parse(r[3]));
    }
  });
});
