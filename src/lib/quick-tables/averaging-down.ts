/**
 * 물타기 계산기 "구간별 바로 보기" 표: 1만 원 100주 보유 예시에서 추가 매수 가격·수량별 새 평균단가.
 *
 * 모든 칸은 calculateNewAverage 의 averagePrice(1원 미만 버림)이다. 숫자 예시일 뿐 매매 권유가 아니다.
 */
import { calculateNewAverage } from '@/lib/finance/averaging-down';
import type { QuickTableData } from './types';
import { won } from './format';

const CURRENT_POSITION = { price: 10_000, quantity: 100 };

export function averagingDownQuickTable(): QuickTableData {
  const quantities = [20, 50, 100, 150, 200, 300, 500];
  const prices = [8_000, 7_000, 6_000];
  return {
    title: '물타기 후 평균단가는 얼마가 되나요?',
    caption: '예시: 1만 원에 100주 보유, 추가 매수 가격·수량별 새 평균단가',
    headers: ['추가 매수 수량', ...prices.map((p) => `${won(p)}에 매수`)],
    rows: quantities.map((quantity) => [
      `추가 ${quantity}주`,
      ...prices.map((price) =>
        won(
          calculateNewAverage({
            currentPosition: CURRENT_POSITION,
            additionalPurchase: { price, quantity },
          }).averagePrice,
        ),
      ),
    ]),
    note: '1만 원에 100주를 가진 상태에서 주가가 8,000원, 7,000원, 6,000원일 때 표의 수량만큼 더 산 경우를 계산한 숫자 예시이며, 사거나 팔라는 뜻이 아닙니다. 새 평균단가는 (기존 매입금액 + 추가 매입금액) ÷ 전체 수량이고 1원 미만은 버렸으며, 수수료와 세금은 넣지 않았습니다. 더 많이 살수록 평균단가는 추가로 산 가격에 가까워지지만 그보다 낮아지지는 않고, 들어가는 돈도 그만큼 늘어납니다. 내 단가·수량이나 목표 평균단가에 필요한 수량은 위 계산기에서 확인하세요.',
  };
}
