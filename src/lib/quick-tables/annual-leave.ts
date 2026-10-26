/**
 * 연차 유급휴가 "구간별 바로 보기" 표.
 *
 * 모든 숫자는 src/lib/work/annual-leave.ts 의 순수 함수에서 빌드 때 계산한다.
 * 손으로 적은 숫자가 없으므로 계산기와 표가 서로 다를 수 없다. 가정은 note 에 적는다.
 * 근거: 근로기준법 §60①·②·④·⑦.
 */
import { calculateAnnualLeave } from '@/lib/work/annual-leave';
import {
  MINIMUM_HOURLY_WAGE_2026,
  MONTHLY_ORDINARY_HOURS,
} from '@/lib/constants/labor-rules-2026';
import type { QuickTableData } from './types';
import { won } from './format';

/**
 * 월 통상임금 300만 원 기준 통상시급(원).
 * 월 통상임금 ÷ 월 통상임금 산정 기준시간(209) 을 원 미만 반올림.
 */
export const ORDINARY_HOURLY_WAGE_FROM_3M_MONTHLY = Math.round(3_000_000 / MONTHLY_ORDINARY_HOURS);

export function annualLeaveQuickTable(): QuickTableData {
  const hourlyMin = MINIMUM_HOURLY_WAGE_2026;
  const hourly300 = ORDINARY_HOURLY_WAGE_FROM_3M_MONTHLY;

  // 각 근속별 "그 근속에 들어선 직후" 시나리오. 월 연차는 11일 모두 발생한 11개월째 상태.
  // untilDate 는 각 n년차 anniversary 로 두어 블록이 발생 후 아직 소멸 전 상태를 포착한다.
  const scenarios: Array<{
    label: string;
    hireDate: string;
    untilDate: string;
  }> = [
    { label: '1년 미만 (11개월 개근)', hireDate: '2025-01-01', untilDate: '2025-12-01' },
    { label: '1년차', hireDate: '2024-01-01', untilDate: '2025-01-01' },
    { label: '2년차', hireDate: '2024-01-01', untilDate: '2026-01-01' },
    { label: '3년차', hireDate: '2023-01-01', untilDate: '2026-01-01' },
    { label: '5년차', hireDate: '2021-01-01', untilDate: '2026-01-01' },
    { label: '10년차', hireDate: '2016-01-01', untilDate: '2026-01-01' },
    { label: '15년차', hireDate: '2011-01-01', untilDate: '2026-01-01' },
    { label: '20년차', hireDate: '2006-01-01', untilDate: '2026-01-01' },
    { label: '21년 이상', hireDate: '2005-01-01', untilDate: '2026-01-01' },
  ];

  const compute = (hireDate: string, untilDate: string, hourlyWage: number) =>
    calculateAnnualLeave({
      hireDate,
      untilDate,
      weeklyHours: 40,
      fivePlus: true,
      usedDays: 0,
      hourlyWage,
    });

  return {
    title: '근속연수별 연차 일수와 미사용 수당은 얼마인가요? (2026)',
    caption: '주 40시간 상근자 기준 연차 일수와 미사용 연차수당 (주 40시간, 하루 8시간, 통상시급 2종)',
    headers: [
      '근속',
      '연차 일수',
      `최저시급 ${hourlyMin.toLocaleString('ko-KR')}원 수당`,
      `월 300만 원 ÷ 209 (${hourly300.toLocaleString('ko-KR')}원) 수당`,
    ],
    rows: scenarios.map((s) => {
      const rMin = compute(s.hireDate, s.untilDate, hourlyMin);
      const r300 = compute(s.hireDate, s.untilDate, hourly300);
      return [s.label, `${rMin.availableDays}일`, won(rMin.allowance), won(r300.allowance)];
    }),
    note: '주 40시간, 하루 8시간, 상시 5명 이상 사업장을 가정했습니다. 수당은 연차 전부를 쓰지 않고 쌓인 상태의 미사용 연차수당(연차 일수 × 8시간 × 통상시급, 원 미만 반올림)입니다. 월 통상임금 ÷ 209 가 통상시급의 일반 환산식(근로기준법 §56 통상임금 관행)이고 월 300만 원이면 14,354원이 됩니다. 1년 미만 월 연차는 첫 기념일 전날에 사용 기간이 끝나고(근로기준법 §60⑦), 1년차 이상 연차는 다음 기념일 전날까지 사용할 수 있습니다. 가산휴가는 매 2년에 1일, 상한 25일입니다(§60④).',
  };
}
