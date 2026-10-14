import { calculateDebtToIncome } from '@/lib/finance/dti';
import type { QuickTableData } from './types';
import { manWon, pct } from './format';

/**
 * 연소득 × 주택담보대출 월 상환액별 DTI. 계산 함수는 비율만 돌려주므로(한도 판정 없음)
 * 비율 표로 만든다. 다른 대출 이자는 0원.
 */
export function dtiQuickTable(): QuickTableData {
  const incomes = [
    30_000_000, 40_000_000, 50_000_000, 60_000_000, 70_000_000, 80_000_000, 90_000_000,
    100_000_000, 120_000_000, 150_000_000,
  ];
  const monthlyPayments = [1_000_000, 1_500_000, 2_000_000];
  return {
    title: '연소득과 월 상환액별 DTI는 몇 %인가요?',
    caption: '주택담보대출 월 상환액(원리금)별 DTI, 다른 대출 없음',
    headers: ['연소득', ...monthlyPayments.map((m) => `월 ${manWon(m)} 상환`)],
    rows: incomes.map((annualIncome) => [
      manWon(annualIncome),
      ...monthlyPayments.map((m) => {
        const r = calculateDebtToIncome({
          annualIncome,
          mortgageAnnualPayment: m * 12,
          otherLoanAnnualInterest: 0,
        });
        // 연소득이 0원일 때만 null. 표의 연소득은 모두 0보다 커서 생기지 않는다(생기면 테스트가 NaN 으로 잡는다)
        return pct(r.ratio ?? Number.NaN);
      }),
    ]),
    note: 'DTI는 주택담보대출의 1년 원리금에 다른 대출의 1년 이자를 더해 연소득으로 나눈 비율입니다. 표는 매달 같은 금액을 12개월 갚고 다른 대출은 없는 경우라서, 신용대출 같은 다른 대출 이자가 있으면 그만큼 더 높아집니다. 다른 대출 이자까지 넣은 DTI는 위 계산기에서, DSR·LTV까지 따진 대출 한도는 대출한도 계산기에서 확인하세요.',
  };
}
