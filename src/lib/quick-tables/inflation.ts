import { calculateInflation, type InflationMode } from '@/lib/finance/inflation';
import type { QuickTableData } from './types';
import { manWon, won } from './format';

/** 계산기 기본 금액과 같은 기준 금액 */
const AMOUNT = 10_000_000;

/** 기간·연 물가상승률별 미래 필요 금액과 보유 금액의 구매력 (복리, 상승률 일정 가정) */
export function inflationQuickTable(): QuickTableData {
  const periods = [1, 3, 5, 10, 15, 20, 30];
  const calc = (mode: InflationMode, years: number, annualInflationPercent: number) =>
    calculateInflation({ mode, amount: AMOUNT, years, annualInflationPercent }).resultAmount;
  const amount = manWon(AMOUNT);
  return {
    title: `물가가 오르면 ${amount}의 가치는 몇 년 뒤 얼마가 되나요?`,
    caption: `현재 ${amount} 기준, 물가가 해마다 같은 비율로 오른다고 가정한 값`,
    headers: [
      '기간',
      '미래 필요 금액 (연 2%)',
      '미래 필요 금액 (연 3%)',
      '보유 금액의 구매력 (연 2%)',
    ],
    rows: periods.map((years) => [
      `${years}년 후`,
      won(calc('futureValue', years, 2)),
      won(calc('futureValue', years, 3)),
      won(calc('purchasingPower', years, 2)),
    ]),
    note: `미래 필요 금액은 지금 ${amount}인 물건을 그때 사려면 드는 돈으로, ${amount} × (1 + 물가상승률)^기간입니다. 보유 금액의 구매력은 ${amount}을 이자 없이 그대로 둘 때 오늘 돈으로 얼마어치를 살 수 있는지를 뜻하며, ${amount} ÷ (1 + 물가상승률)^기간으로 계산합니다. 연 2%와 3%는 계산을 위한 가정이고 실제 물가상승률은 해마다 다르며, 원 미만은 버렸습니다. 다른 금액·기간·상승률은 위 계산기에서 바꿔 보세요.`,
  };
}
