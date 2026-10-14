/**
 * 분할매수 계산기 "구간별 바로 보기" 표: 5차 분할매수 예시의 차수별 누적 평균단가.
 *
 * 같은 수량(100주)씩 산 경우와 같은 금액(100만 원)씩 산 경우를 나란히 보여 준다.
 * 같은 금액 수량은 계산기의 "균등분할 적용"과 같은 generateEqualSplit, 평균단가는 calculateSplitBuy 의
 * 차수별 cumulativeAverage(1원 미만 버림)이다. 숫자 예시일 뿐 매매 권유가 아니다.
 */
import { calculateSplitBuy, generateEqualSplit } from '@/lib/finance/split-buy';
import type { QuickTableData } from './types';
import { manWon, won } from './format';

const PRICES = [10_000, 9_000, 8_000, 7_000, 6_000];
const SAME_QUANTITY = 100;
const SAME_AMOUNT = 1_000_000;

export function splitBuyQuickTable(): QuickTableData {
  const sameQuantity = calculateSplitBuy({
    entries: PRICES.map((price) => ({ price, quantity: SAME_QUANTITY })),
  });
  const equalSplit = generateEqualSplit({
    totalAmount: SAME_AMOUNT * PRICES.length,
    prices: PRICES,
  });
  const sameAmount = calculateSplitBuy({ entries: equalSplit.entries });

  return {
    title: '분할매수하면 차수별 평균단가는 어떻게 바뀌나요?',
    caption: '예시: 1만 원부터 1,000원씩 낮은 가격에 5번 나눠 산 경우의 누적 평균단가',
    headers: [
      '차수 (매수 단가)',
      `${SAME_QUANTITY}주씩 산 경우`,
      `${manWon(equalSplit.perStepAmount)}씩 산 경우`,
      `${manWon(equalSplit.perStepAmount)}으로 산 수량`,
    ],
    rows: sameAmount.entries.map((b) => {
      const a = sameQuantity.entries.find((e) => e.step === b.step);
      if (!a) throw new Error(`분할매수 ${b.step}차 결과가 없습니다`);
      return [
        `${b.step}차 (${won(b.price)})`,
        won(a.cumulativeAverage),
        won(b.cumulativeAverage),
        `${b.quantity.toLocaleString('ko-KR')}주`,
      ];
    }),
    note: '1만 원, 9,000원, 8,000원, 7,000원, 6,000원에 차례로 나눠 산 숫자 예시이며, 사거나 팔라는 뜻이 아닙니다. 평균단가는 그 차수까지 산 금액 ÷ 그 차수까지 산 수량이고 1원 미만은 버렸습니다. 100만 원씩 산 경우는 1주 단위로 살 수 있는 만큼만 사고 남는 돈은 쓰지 않았습니다. 같은 금액씩 사면 가격이 낮을 때 더 많은 수량을 사게 되어 평균단가가 조금 더 낮게 나옵니다. 수수료는 넣지 않았으니 수수료를 넣은 평균단가와 손익분기점은 위 계산기에서 확인하세요.',
  };
}
