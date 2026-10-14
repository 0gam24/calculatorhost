/**
 * 재산세 계산기 "구간별 바로 보기" 표.
 * 모든 칸은 계산기와 같은 calculatePropertyTaxTotal 로 빌드 때 계산한다 (손으로 적은 숫자 없음).
 */
import { calculatePropertyTaxTotal } from '@/lib/tax/property';
import type { QuickTableData } from './types';
import { manWon, won } from './format';

export function propertyTaxQuickTable(): QuickTableData {
  const prices = [
    100_000_000, 200_000_000, 300_000_000, 400_000_000, 500_000_000, 600_000_000, 700_000_000,
    800_000_000, 900_000_000, 1_000_000_000, 1_200_000_000, 1_500_000_000,
  ];
  const total = (publishedPrice: number, oneHouseholdOneHouse: boolean, urbanArea: boolean) =>
    calculatePropertyTaxTotal({ publishedPrice, oneHouseholdOneHouse, urbanArea }).totalTax;
  return {
    title: '2026년 공시가격별 재산세는 얼마인가요?',
    caption: '주택 재산세 1년 합계 (재산세 본세 + 지방교육세)',
    headers: ['공시가격', '1세대1주택', '1세대1주택 + 도시지역분', '일반 주택'],
    rows: prices.map((p) => [
      manWon(p),
      won(total(p, true, false)),
      won(total(p, true, true)),
      won(total(p, false, false)),
    ]),
    note: '과세표준은 공시가격에 공정시장가액비율을 곱해 구했습니다. 1세대1주택은 2026년 기준 공시가격 3억 원 이하 43%, 6억 원 이하 44%, 6억 원 초과 45%이고, 1세대1주택이 아닌 일반 주택은 60%입니다(지방세법 §110, 시행령 §109). 공시가격 9억 원 이하 1세대1주택은 특례세율(§111의2), 나머지는 일반세율(§111)을 적용했습니다. 금액은 재산세 본세와 지방교육세(본세의 20%, §151)의 합이고, 도시지역분 열은 과세표준의 0.14%(§112)를 더한 금액입니다. 세부담 상한, 과세표준 상한, 지역자원시설세, 감면은 넣지 않아 실제 고지서와 다를 수 있습니다. 다른 공시가격은 위 계산기에서 확인하세요.',
  };
}
