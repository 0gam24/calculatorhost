/**
 * 은퇴자금 계산기 "구간별 바로 보기" 표: 월 100만 원 저축 시 기간·수익률별 은퇴 시점 예상 자산.
 *
 * 모든 칸은 calculateRetirement 의 projectedSavingsAtRetirement(월 복리 연금미래가)이다.
 * 현재 자산 0원으로 두어 월 저축만의 효과를 보여 준다(금액은 월 저축액에 정비례).
 */
import { calculateRetirement } from '@/lib/finance/retirement';
import type { QuickTableData } from './types';
import { manWon } from './format';

const MONTHLY_CONTRIBUTION = 1_000_000;
const RETIREMENT_AGE = 60;

function retirementAt(years: number, expectedAnnualReturnPercent: number) {
  return calculateRetirement({
    currentAge: RETIREMENT_AGE - years,
    retirementAge: RETIREMENT_AGE,
    expectedLifespanAge: 90,
    currentSavings: 0,
    monthlyContribution: MONTHLY_CONTRIBUTION,
    expectedAnnualReturnPercent,
    expectedInflationPercent: 2.5,
    annualSpendingAtRetirement: 40_000_000,
  });
}

export function retirementQuickTable(): QuickTableData {
  const years = [10, 15, 20, 25, 30, 35, 40];
  const rates = [3, 5, 7];
  const example = retirementAt(30, 5);
  return {
    title: '매달 100만 원씩 모으면 은퇴할 때 얼마가 되나요?',
    caption: '월 100만 원 저축, 저축 기간·연 수익률별 은퇴 시점 예상 자산',
    headers: ['저축 기간', ...rates.map((r) => `연 ${r}%`)],
    rows: years.map((y) => [
      `${y}년`,
      ...rates.map((r) => manWon(retirementAt(y, r).projectedSavingsAtRetirement)),
    ]),
    note: `지금 모아 둔 돈 0원에서 시작해 매달 100만 원을 넣고, 연 수익률을 12로 나눈 월 복리로 불린 금액입니다. 60세에 은퇴한다면 10년은 50세부터, 30년은 30세부터 모은 경우입니다. 세금과 수수료를 빼지 않았고 물가 상승도 반영하지 않은 그때의 금액이며, 실제 수익률은 해마다 달라지고 손실이 날 수도 있습니다. 월 저축액이 50만 원이면 표 금액의 절반, 200만 원이면 두 배입니다. 해마다 모은 돈의 4%를 꺼내 쓴다는 4% 룰을 적용하면 연 5%로 30년 모은 ${manWon(example.projectedSavingsAtRetirement)}의 4%는 연 ${manWon(example.safeWithdrawalRate4Percent)}입니다. 지금 가진 돈, 은퇴 나이, 은퇴 후 생활비는 위 계산기에서 넣어 보세요.`,
  };
}
