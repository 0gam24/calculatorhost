import { calculateLoanLimit, type LoanLimitInput } from '@/lib/finance/loan-limit';
import { getDsrLimit, getLtvRate } from '@/lib/constants/loan-rules-2026';
import type { QuickTableData } from './types';
import { manWon, pct, won } from './format';

/**
 * 연소득별 DSR 대출 한도. 표의 금리는 DSR 을 계산하는 금리라서 스트레스 가산은 끄고
 * 금리 자체를 열로 바꾼다(가산금리를 더한 금리의 열을 읽으면 된다). 집값(LTV) 상한은 note 에 적는다.
 * 집값·지역·금융기관은 계산기 기본값(5억 원, 비규제지역, 은행)이다.
 */
const BASE: Omit<LoanLimitInput, 'annualIncome' | 'newLoanAnnualRate'> = {
  existingDebtAnnualPayment: 0,
  existingDebtAnnualInterest: 0,
  collateralValue: 500_000_000,
  region: 'nonRegulated',
  housingStatus: 'general',
  lender: 'bank',
  newLoanTermYears: 30,
  applyStressDsr: false,
  repaymentType: 'amortization',
};

export function loanLimitQuickTable(): QuickTableData {
  const incomes = [
    30_000_000, 40_000_000, 50_000_000, 60_000_000, 70_000_000, 80_000_000, 90_000_000,
    100_000_000, 120_000_000, 150_000_000,
  ];
  const rates = [4.0, 5.5, 7.0];
  const calc = (annualIncome: number, newLoanAnnualRate: number) =>
    calculateLoanLimit({ ...BASE, annualIncome, newLoanAnnualRate });
  const dsr = pct(getDsrLimit(BASE.lender), 0);
  const ltv = pct(getLtvRate(BASE.region, BASE.housingStatus), 0);
  // LTV 한도는 소득·금리와 무관하다 (집값 × LTV). 계산기 기본 입력으로 한 번 계산
  const ltvCap = calc(60_000_000, 4.0).ltvLimit;
  return {
    title: '연소득별 대출 한도는 얼마인가요?',
    caption: `은행 DSR ${dsr} 기준 최대 대출액 (30년 원리금균등, 기존 대출 없음)`,
    headers: ['연소득', ...rates.map((r) => `금리 연 ${r.toFixed(1)}%`)],
    rows: incomes.map((income) => [
      manWon(income),
      ...rates.map((rate) => won(calc(income, rate).dsrLimit)),
    ]),
    note: `기존 대출 없이 은행에서 30년 원리금균등으로 빌릴 때, 1년 원리금이 연소득의 ${dsr}(DSR)를 넘지 않는 최대 금액입니다. 표의 금리는 한도를 계산하는 금리라서, 고정금리는 대출금리 그대로 보고 변동·혼합형·주기형은 스트레스 가산금리를 더한 금리의 열을 보세요. 한도는 집값 기준(LTV)도 넘을 수 없어 비규제지역(LTV ${ltv})의 ${manWon(BASE.collateralValue)}짜리 집이면 ${manWon(ltvCap)}까지이고, 지역 규제와 은행 심사에 따라 더 낮아질 수 있습니다. 집값·지역·기존 대출을 넣은 한도는 위 계산기에서 확인하세요.`,
  };
}
