/**
 * 분할매도 계산기 "구간별 바로 보기" 표: 평균단가 1만 원 500주를 5번에 나눠 판 예시의 차수별 실현손익.
 *
 * 매도가는 계산기의 "+5%·+10%·+20%·+30%·+50%" 빠른 설정과 같은 priceFromTargetReturn,
 * 손익은 calculateSplitSell 의 차수별 realizedPnL·cumulativeRealizedPnL 이다.
 * 수수료·거래세율은 0으로 두어 세율 변경과 무관한 세전 손익만 보여 준다. 숫자 예시일 뿐 매매 권유가 아니다.
 */
import {
  calculateSplitSell,
  priceFromTargetReturn,
  targetReturnFromPrice,
} from '@/lib/finance/split-sell';
import type { QuickTableData } from './types';
import { won } from './format';

const AVERAGE_PRICE = 10_000;
const STEP_QUANTITY = 100;
const TARGET_RETURNS = [5, 10, 20, 30, 50];

const signedWon = (n: number): string => (n > 0 ? `+${won(n)}` : won(n));

export function splitSellQuickTable(): QuickTableData {
  const result = calculateSplitSell({
    averagePrice: AVERAGE_PRICE,
    holdingQuantity: STEP_QUANTITY * TARGET_RETURNS.length,
    entries: TARGET_RETURNS.map((r) => ({
      price: priceFromTargetReturn(AVERAGE_PRICE, r),
      quantity: STEP_QUANTITY,
    })),
    sellFeeRate: 0,
    taxRate: 0,
  });

  return {
    title: '분할매도하면 차수별 실현손익은 얼마인가요?',
    caption: '예시: 평균단가 1만 원에 산 500주를 100주씩 5번 나눠 판 경우 (수수료·세금 빼기 전)',
    headers: ['차수 (매도가)', '이번 실현손익', '누적 실현손익', '남은 수량'],
    rows: result.entries.map((e) => [
      `${e.step}차 ${won(e.price)} (+${Math.round(targetReturnFromPrice(AVERAGE_PRICE, e.price))}%)`,
      signedWon(e.realizedPnL),
      signedWon(e.cumulativeRealizedPnL),
      `${e.remainingQuantity.toLocaleString('ko-KR')}주`,
    ]),
    note: '평균단가 1만 원에 산 500주를 평균단가보다 5%, 10%, 20%, 30%, 50% 높은 가격에서 100주씩 판 숫자 예시이며, 사거나 팔라는 뜻이 아닙니다. 실현손익은 (매도가 - 평균단가) × 판 수량이고, 증권거래세와 매도 수수료를 빼기 전 금액이라 실제로 손에 쥐는 이익은 이보다 조금 적습니다. 나눠 팔아도 남은 주식의 평균단가는 1만 원 그대로입니다. 세금과 수수료를 뺀 손익은 위 계산기에서 확인하세요.',
  };
}
