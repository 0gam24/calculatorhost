/**
 * 중개수수료 계산기 "구간별 바로 보기" 표.
 * 모든 칸은 계산기와 같은 calculateRealtyCommission 으로 빌드 때 계산한다 (손으로 적은 숫자 없음).
 */
import { calculateRealtyCommission, type TransactionType } from '@/lib/finance/realty-commission';
import type { QuickTableData } from './types';
import { manWon, won } from './format';

export function brokerFeeQuickTable(): QuickTableData {
  const amounts = [
    50_000_000, 100_000_000, 200_000_000, 300_000_000, 400_000_000, 500_000_000, 600_000_000,
    700_000_000, 800_000_000, 900_000_000, 1_000_000_000, 1_200_000_000, 1_500_000_000,
    2_000_000_000,
  ];
  // 주택, 협의 요율 없음(법정 상한), 한쪽 당사자 기준
  const total = (salePrice: number, transactionType: TransactionType, includeVat: boolean) =>
    calculateRealtyCommission({
      transactionType,
      propertyKind: 'house',
      salePrice,
      includeVat,
    }).total;
  return {
    title: '거래금액별 중개수수료(복비)는 얼마인가요?',
    caption: '주택 매매·전세 법정 상한 중개보수 (한쪽 당사자 기준)',
    headers: ['거래금액', '매매 상한 보수', '전세 상한 보수', '매매 + 부가세 10%'],
    rows: amounts.map((a) => [
      manWon(a),
      won(total(a, 'sale', false)),
      won(total(a, 'jeonse', false)),
      won(total(a, 'sale', true)),
    ]),
    note: '아파트·빌라 같은 주택을 사고팔거나 전세 계약할 때 거래 당사자 한쪽이 내는 법정 상한액입니다. 거래금액에 구간별 상한요율을 곱하고, 소액 구간은 정해진 한도액 안에서 계산했습니다(공인중개사법 시행규칙 §20). 상한보다 낮게 협의할 수 있습니다(공인중개사법 §32). 마지막 열은 중개사무소가 부가세 10%를 받는 경우이며, 사업자 유형에 따라 다를 수 있습니다. 월세, 주거용 오피스텔, 협의 요율은 위 계산기에서 확인하세요.',
  };
}
