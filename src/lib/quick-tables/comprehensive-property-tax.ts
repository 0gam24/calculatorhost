/**
 * 종합부동산세 계산기 "구간별 바로 보기" 표.
 * 모든 칸은 계산기와 같은 calculateComprehensivePropertyTax 로 빌드 때 계산한다 (손으로 적은 숫자 없음).
 */
import {
  calculateComprehensivePropertyTax,
  type HouseCount,
} from '@/lib/tax/comprehensive-property';
import type { QuickTableData } from './types';
import { manWon, won } from './format';

export function comprehensivePropertyTaxQuickTable(): QuickTableData {
  const prices = [
    1_000_000_000, 1_200_000_000, 1_300_000_000, 1_400_000_000, 1_500_000_000, 1_700_000_000,
    2_000_000_000, 2_500_000_000, 3_000_000_000, 4_000_000_000, 5_000_000_000,
  ];
  // 60세 미만·보유 5년 미만: 1세대1주택 고령자·장기보유 세액공제 0%
  const total = (totalPublishedPrice: number, houseCount: HouseCount) =>
    calculateComprehensivePropertyTax({
      houseCount,
      totalPublishedPrice,
      isOneHouseholdOneHouse: houseCount === 'one',
      seniorAgeYears: 50,
      holdingYears: 0,
      includesAdjustedArea: false,
    }).totalTax;
  return {
    title: '2026년 공시가격 합계별 종부세는 얼마인가요?',
    caption: '주택 수별 종합부동산세 + 농어촌특별세 (고령자·장기보유 세액공제 전)',
    headers: ['공시가격 합계', '1세대1주택', '2주택', '3주택 이상'],
    rows: prices.map((p) => [
      manWon(p),
      won(total(p, 'one')),
      won(total(p, 'two')),
      won(total(p, 'threeOrMore')),
    ]),
    note: '보유 주택 공시가격 합계에서 1세대1주택은 12억 원, 그 밖에는 9억 원을 빼고(종부세법 §8①) 공정시장가액비율 60%를 곱해 과세표준을 구했습니다. 2주택 이하는 일반세율(§9①1호), 3주택 이상은 과세표준 12억 원을 넘는 부분부터 중과세율(§9①2호)을 적용했습니다. 종부세 과세분에 해당하는 재산세(공제할 재산세액, §9③)를 빼고 농어촌특별세 20%(농특세법 §5)를 더한 금액입니다. 1세대1주택 고령자·장기보유 세액공제(합계 80% 한도, §9)와 세부담 상한(§10)은 넣지 않았습니다. 나이와 보유기간은 위 계산기에 넣어 확인하세요.',
  };
}
