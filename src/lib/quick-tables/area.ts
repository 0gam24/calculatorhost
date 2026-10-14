import { pyeongToSqm } from '@/lib/utils/area';
import type { QuickTableData } from './types';

/** 자주 말하는 평형(평) → 제곱미터. 같은 넓이의 단위 환산이며 전용·공급면적을 바꾸지 않는다 */
export function areaQuickTable(): QuickTableData {
  const pyeongs = [10, 15, 18, 20, 24, 25, 30, 32, 34, 40, 45, 50, 60];
  return {
    title: '평수를 제곱미터로 바꾸면 얼마인가요?',
    caption: '평 → 제곱미터(㎡) 환산표 (1평 = 400/121㎡)',
    headers: ['평', '제곱미터 (㎡)'],
    rows: pyeongs.map((p) => [`${p}평`, `약 ${pyeongToSqm(p).toFixed(2)}㎡`]),
    note: '같은 넓이를 다른 단위로 적은 값입니다. 1평 = 400/121㎡(약 3.3058㎡)로 환산했습니다. 광고의 평형은 보통 공급면적 기준이라 전용면적과 다를 수 있으니, 계약서의 면적 종류를 함께 확인하세요. ㎡를 평으로 바꾸려면 위 계산기에 넣어 보세요.',
  };
}
