// 대출한도 계산기의 "구간별 바로 보기" 표. 칸마다 같은 순수 함수의 직접 계산값과 대조한다.
// 2026-10-14 개정: 지역·금리 유형별 스트레스 금리와 수도권 주담대 최대한도(6억)를 반영한 표로 교체
import { describe, expect, it } from 'vitest';
import { loanLimitQuickTable, LOAN_LIMIT_SCENARIOS } from '@/lib/quick-tables/loan-limit';
import { calculateLoanLimit, type LoanLimitInput } from '@/lib/finance/loan-limit';
import type { QuickTableData } from '@/lib/quick-tables/types';
import { manWon } from '@/lib/quick-tables/format';

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

const dsrLimit = (annualIncome: number, i: number): number => {
  const s = LOAN_LIMIT_SCENARIOS[i]!;
  const input: LoanLimitInput = {
    annualIncome,
    existingDebtAnnualPayment: 0,
    existingDebtAnnualInterest: 0,
    collateralValue: 1_000_000_000,
    region: s.region,
    housingStatus: 'general',
    lender: 'bank',
    newLoanAnnualRate: 4.5,
    newLoanTermYears: 30,
    applyStressDsr: true,
    rateType: s.rateType,
    repaymentType: 'amortization',
  };
  return calculateLoanLimit(input).dsrLimit;
};
const floorMan = (n: number) => Math.floor(n / 10_000) * 10_000;

describe('대출한도 표 (2026-10 규제)', () => {
  const t = loanLimitQuickTable();

  it('연소득 6,000만 원 칸은 계산기 DSR 한도와 같다', () => {
    shape(t, 8);
    const r = row(t, '6,000만 원');
    expect(r?.[1]).toBe(manWon(floorMan(dsrLimit(60_000_000, 0))));
    expect(r?.[2]).toBe(manWon(floorMan(dsrLimit(60_000_000, 1))));
    expect(r?.[3]).toBe(manWon(floorMan(dsrLimit(60_000_000, 2))));
  });

  it('수도권 칸은 6억 원 최대한도를 넘지 않는다', () => {
    expect(dsrLimit(150_000_000, 0)).toBeGreaterThan(600_000_000);
    expect(row(t, '1억 5,000만 원')?.[1]).toBe('6억 원 (최대한도)');
  });

  it('스트레스 가산이 작을수록 한도가 크다: 지방 변동 > 수도권 주기 > 수도권 변동', () => {
    const parse = (s: string | undefined) => {
      const m = (s ?? '').match(/(?:(\d+)억)?\s*(?:([\d,]+)만)?/);
      return (Number(m?.[1] ?? 0) * 10_000) + Number((m?.[2] ?? '0').replace(/,/g, ''));
    };
    for (const r of t.rows.slice(0, 6)) {
      expect(parse(r[3])).toBeGreaterThan(parse(r[2]));
      expect(parse(r[2])).toBeGreaterThan(parse(r[1]));
    }
  });

  it('note 에 지역별 스트레스 가산과 수도권 한도가 함수 값대로 들어간다', () => {
    expect(t.note).toContain('3%p');
    expect(t.note).toContain('1.2%p');
    expect(t.note).toContain('0.75%p');
    expect(t.note).toContain('6억 원');
    expect(t.note).toContain('40%');
  });
});
