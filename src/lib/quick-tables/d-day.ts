import { calculateAfterNDays, calculateNthDay } from '@/lib/utils/dday';
import type { QuickTableData } from './types';

/** 예시 시작일 기준 기념일 날짜. 기념일 방식(시작일 = 1일째)과 단순 더하기를 나란히 보여 준다 */
export function ddayQuickTable(): QuickTableData {
  const start = '2026-01-01';
  const days = [100, 200, 300, 500, 1000, 1500, 2000, 3000];
  return {
    title: '100일·1000일 기념일은 언제인가요? (2026년 1월 1일 시작 예시)',
    caption: '시작일 2026-01-01(목) 기준 기념일 날짜',
    headers: ['기념일', '기념일 방식 (시작일 = 1일째)', '단순 더하기 (+N일)'],
    rows: days.map((n) => {
      const nth = calculateNthDay({ baseDate: start, n });
      const add = calculateAfterNDays({ baseDate: start, offset: n });
      return [
        `${n.toLocaleString('ko-KR')}일`,
        `${nth.resultDate} (${nth.weekday})`,
        `${add.resultDate} (${add.weekday})`,
      ];
    }),
    note: '아기 백일, 사귄 지 100일처럼 "며칠째"를 세는 기념일은 시작일을 1일째로 세므로 가운데 열(시작일 + N-1일)이 맞습니다. "오늘부터 100일 뒤"처럼 날을 더하는 약속은 오른쪽 열입니다. 다른 시작일은 위 계산기의 기념일 모드에 넣어 보세요.',
  };
}
