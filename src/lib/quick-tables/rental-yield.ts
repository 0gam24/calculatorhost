import { calculateRentalYield } from '@/lib/finance/rental-yield';
import type { QuickTableData } from './types';
import { manWon, won } from './format';

/**
 * 매매가·보증금·월세 예시별 임대수익률. 계산 함수가 주는 순수익 기준 두 수익률
 * (실투자금 기준 연 수익률, 매매가 기준 Cap Rate)과 월 순수입을 보여 준다.
 * 가정: 공실률 5%(계산기 기본값), 월 관리비 = 월세의 20%, 취득부대비 0원.
 */
const VACANCY_RATE_PERCENT = 5;
/** 월 관리비 = 월세 × 20 / 100 (정수 연산) */
const EXPENSE_PERCENT_OF_RENT = 20;

const CASES = [
  { purchasePrice: 150_000_000, depositReceived: 10_000_000, monthlyRent: 600_000 },
  { purchasePrice: 200_000_000, depositReceived: 20_000_000, monthlyRent: 800_000 },
  { purchasePrice: 300_000_000, depositReceived: 30_000_000, monthlyRent: 1_100_000 },
  { purchasePrice: 300_000_000, depositReceived: 100_000_000, monthlyRent: 800_000 },
  { purchasePrice: 500_000_000, depositReceived: 50_000_000, monthlyRent: 1_700_000 },
  { purchasePrice: 500_000_000, depositReceived: 200_000_000, monthlyRent: 1_200_000 },
  { purchasePrice: 1_000_000_000, depositReceived: 100_000_000, monthlyRent: 3_000_000 },
  { purchasePrice: 1_000_000_000, depositReceived: 500_000_000, monthlyRent: 1_500_000 },
];

/** 행 제목용 짧은 금액: "1억 5,000만" (원 생략) */
const short = (n: number) => manWon(n).replace(/ 원$/, '');
const percent = (p: number) => `${p.toFixed(2)}%`;

export function rentalYieldQuickTable(): QuickTableData {
  return {
    title: '매매가와 월세별 임대수익률은 얼마인가요?',
    caption: `예시 사례별 연 수익률 (공실률 ${VACANCY_RATE_PERCENT}%, 월 관리비는 월세의 ${EXPENSE_PERCENT_OF_RENT}%)`,
    headers: ['매매가 / 보증금 / 월세', '연 수익률 (실투자금 기준)', 'Cap Rate (매매가 기준)', '월 순수입'],
    rows: CASES.map((c) => {
      const r = calculateRentalYield({
        ...c,
        acquisitionCosts: 0,
        monthlyExpenses: (c.monthlyRent * EXPENSE_PERCENT_OF_RENT) / 100,
        vacancyRatePercent: VACANCY_RATE_PERCENT,
      });
      return [
        `${short(c.purchasePrice)} / ${short(c.depositReceived)} / ${short(c.monthlyRent)}`,
        percent(r.annualYieldPercent),
        percent(r.capRatePercent),
        won(r.monthlyNetIncome),
      ];
    }),
    note: `예시로 고른 숫자이며 실제 시세가 아닙니다. 1년 월세에서 공실 ${VACANCY_RATE_PERCENT}%와 월 관리비(재산세·보험료·수리비 등, 월세의 ${EXPENSE_PERCENT_OF_RENT}%로 가정)를 뺀 순수입으로 계산했습니다. 연 수익률은 매매가에서 받은 보증금을 뺀 실투자금 기준이고, 취득세·중개보수 같은 취득 비용과 대출 이자, 임대소득 세금은 넣지 않았습니다. Cap Rate는 같은 순수입을 매매가 전체로 나눈 값입니다. 내 물건의 금액과 비용은 위 계산기에 넣어 보세요.`,
  };
}
