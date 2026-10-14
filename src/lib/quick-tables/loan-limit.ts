import { calculateLoanLimit, type LoanLimitInput } from '@/lib/finance/loan-limit';
import {
  getDsrLimit,
  getLtvRate,
  getMortgageCap,
  getStressAddOnPercent,
  type RateType,
  type RegionType,
} from '@/lib/constants/loan-rules-2026';
import type { QuickTableData } from './types';
import { manWon, pct } from './format';

/**
 * 연소득별 DSR 대출 한도 (2026-10 규제). 약정금리에 지역·금리 유형별 스트레스 금리를 더해 계산한다.
 * 수도권·규제지역 칸은 시가 15억 원 이하 집의 주담대 최대한도(6억 원)를 넘지 않게 적는다.
 * 2026-10-14 개정: 이전 표는 스트레스 가산을 끄고 금리 열(4.0·5.5·7.0%)만 바꿔 보여 줬다.
 */
const CONTRACT_RATE = 4.5;
const BASE: Omit<LoanLimitInput, 'annualIncome' | 'region' | 'rateType'> = {
  existingDebtAnnualPayment: 0,
  existingDebtAnnualInterest: 0,
  // DSR 한도는 집값과 무관하다. 수도권 최대한도 6억 구간(시가 15억 원 이하) 집값
  collateralValue: 1_000_000_000,
  housingStatus: 'general',
  lender: 'bank',
  newLoanAnnualRate: CONTRACT_RATE,
  newLoanTermYears: 30,
  applyStressDsr: true,
  repaymentType: 'amortization',
};

export const LOAN_LIMIT_SCENARIOS: ReadonlyArray<{
  label: string;
  region: RegionType;
  rateType: RateType;
}> = [
  { label: '수도권·규제지역 변동형', region: 'capitalArea', rateType: 'variable' },
  { label: '수도권·규제지역 주기형', region: 'capitalArea', rateType: 'periodic' },
  { label: '지방 변동형', region: 'local', rateType: 'variable' },
];

/** 만 원 아래 버림 (표기용) */
const floorMan = (n: number): number => Math.floor(n / 10_000) * 10_000;

export function loanLimitQuickTable(): QuickTableData {
  const incomes = [
    30_000_000, 40_000_000, 50_000_000, 60_000_000, 70_000_000, 80_000_000, 90_000_000,
    100_000_000, 120_000_000, 150_000_000,
  ];
  const cap = getMortgageCap('capitalArea', 1_500_000_000, 'general') ?? 0;
  const cell = (annualIncome: number, s: (typeof LOAN_LIMIT_SCENARIOS)[number]): string => {
    const dsr = calculateLoanLimit({
      ...BASE,
      annualIncome,
      region: s.region,
      rateType: s.rateType,
    }).dsrLimit;
    if (s.region !== 'local' && dsr > cap) return `${manWon(cap)} (최대한도)`;
    return manWon(floorMan(dsr));
  };
  const dsr = pct(getDsrLimit(BASE.lender), 0);
  const add = (i: number): string => {
    const s = LOAN_LIMIT_SCENARIOS[i]!;
    return `${getStressAddOnPercent(s.region, s.rateType)}%p`;
  };
  const ltvRegulated = pct(getLtvRate('regulated', 'general'), 0);
  const ltvOther = pct(getLtvRate('capitalArea', 'general'), 0);
  return {
    title: '연소득별 대출 한도는 얼마인가요?',
    caption: `은행 DSR ${dsr} 기준 최대 대출액 (약정금리 연 ${CONTRACT_RATE.toFixed(1)}%, 30년 원리금균등, 기존 대출 없음, 2026년 10월 규제)`,
    headers: ['연소득', ...LOAN_LIMIT_SCENARIOS.map((s) => s.label)],
    rows: incomes.map((income) => [
      manWon(income),
      ...LOAN_LIMIT_SCENARIOS.map((s) => cell(income, s)),
    ]),
    note: `1년 원리금이 연소득의 ${dsr}(DSR)를 넘지 않는 최대 금액을 만 원 아래 버려 적었습니다. 한도를 계산할 때는 약정금리 ${CONTRACT_RATE}%에 스트레스 금리를 더하는데, 수도권·규제지역 변동형은 ${add(0)}, 주기형은 ${add(1)}, 지방 변동형은 ${add(2)}를 더합니다. 실제로 내는 이자는 약정금리 그대로입니다. 수도권·규제지역에서 집을 살 때는 시가 15억 원 이하 집도 최대 ${manWon(cap)}까지만 빌릴 수 있고(15억 원 초과 25억 원 이하 4억 원, 25억 원 초과 2억 원), 집값 기준(LTV)도 넘을 수 없어 규제지역은 집값의 ${ltvRegulated}, 그 밖의 지역은 ${ltvOther}까지입니다. 집값·지역·기존 대출을 넣은 한도는 위 계산기에서 확인하세요.`,
  };
}
