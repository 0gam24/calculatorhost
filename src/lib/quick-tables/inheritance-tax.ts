/**
 * 상속세 계산기 "구간별 바로 보기" 표.
 * 모든 칸은 계산기와 같은 calculateInheritanceTax 로 빌드 때 계산한다 (손으로 적은 숫자 없음).
 */
import { calculateInheritanceTax } from '@/lib/tax/inheritance';
import type { QuickTableData } from './types';
import { manWon, won } from './format';

export function inheritanceTaxQuickTable(): QuickTableData {
  const assets = [
    500_000_000, 700_000_000, 1_000_000_000, 1_200_000_000, 1_500_000_000, 2_000_000_000,
    2_500_000_000, 3_000_000_000, 4_000_000_000, 5_000_000_000,
  ];
  // 성년 자녀 2명, 장례비·채무 0원, 공제 방식 자동, 기한 내 신고 (계산기 기본값과 같음)
  // 배우자 실제 상속액 5억 원(계산기 기본값) → 배우자 상속공제 최소액 5억 원
  const finalTax = (totalAssets: number, hasSpouse: boolean) =>
    calculateInheritanceTax({
      totalAssets,
      funeralAndDebts: 0,
      hasSpouse,
      spouseInheritedAmount: hasSpouse ? 500_000_000 : 0,
      childrenCount: 2,
      minorChildrenCount: 0,
      minorChildrenAverageAgeYears: 10,
      deductionMode: 'auto',
      reportWithinDeadline: true,
    }).finalTax;
  return {
    title: '상속재산별 상속세는 얼마인가요?',
    caption: '배우자 유무별 상속세 (성년 자녀 2명, 신고세액공제 3% 반영)',
    headers: ['상속재산', '배우자와 자녀 2명', '자녀 2명 (배우자 없음)'],
    rows: assets.map((v) => [manWon(v), won(finalTax(v, true)), won(finalTax(v, false))]),
    note: '성년 자녀 2명이 함께 상속받고 장례비·채무는 빼지 않은 경우입니다. 기초공제와 자녀공제를 더한 금액보다 큰 일괄공제 5억 원을 적용했고(상증세법 §21), 배우자가 있으면 배우자 상속공제 최소액 5억 원을 더했습니다(§19). 배우자가 실제로 5억 원보다 많이 받으면 법정상속분 안에서 최대 30억 원까지 공제가 커져 세금이 줄어듭니다. 세율은 10~50% 5단계이고(§26), 기한 안에 신고해 신고세액공제 3%를 받는 경우입니다. 장례비·채무, 배우자가 받는 금액, 미성년 자녀는 위 계산기에서 바꿔 보세요. 10년 안에 미리 증여한 재산이나 그 밖의 상속공제는 반영하지 않았습니다.',
  };
}
