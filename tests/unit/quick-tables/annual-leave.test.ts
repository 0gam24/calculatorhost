/**
 * 연차 바로 보기 표(src/lib/quick-tables/annual-leave).
 * 표의 숫자는 계산기와 같은 순수 함수(calculateAnnualLeave)에서 나와야 한다.
 */
import { describe, expect, it } from 'vitest';
import {
  annualLeaveQuickTable,
  ORDINARY_HOURLY_WAGE_FROM_3M_MONTHLY,
} from '@/lib/quick-tables/annual-leave';
import { calculateAnnualLeave } from '@/lib/work/annual-leave';
import { MINIMUM_HOURLY_WAGE_2026 } from '@/lib/constants/labor-rules-2026';
import type { QuickTableData } from '@/lib/quick-tables/types';

const won = (n: number) => `${Math.round(n).toLocaleString('ko-KR')}원`;
const row = (t: QuickTableData, first: string) => t.rows.find((r) => r[0] === first);

describe('연차 바로 보기 표', () => {
  const t = annualLeaveQuickTable();

  it('표 뼈대: 9행, 각 행 길이가 헤더와 일치, NaN/긴 줄표 없음', () => {
    expect(t.title.length).toBeGreaterThan(5);
    expect(t.caption.length).toBeGreaterThan(5);
    expect(t.note.length).toBeGreaterThan(10);
    expect(t.headers).toHaveLength(4);
    expect(t.rows).toHaveLength(9);
    for (const r of t.rows) expect(r).toHaveLength(t.headers.length);
    const text = JSON.stringify(t);
    expect(text).not.toMatch(/NaN|Infinity|undefined|[—–]/);
  });

  it('1년차 15일, 최저시급 10,320원 × 8시간 × 15일 = 1,238,400원', () => {
    const r = calculateAnnualLeave({
      hireDate: '2024-01-01',
      untilDate: '2025-01-01',
      weeklyHours: 40,
      fivePlus: true,
      usedDays: 0,
      hourlyWage: MINIMUM_HOURLY_WAGE_2026,
    });
    expect(r.availableDays).toBe(15);
    expect(r.allowance).toBe(1_238_400);
    const found = row(t, '1년차');
    expect(found?.[1]).toBe('15일');
    expect(found?.[2]).toBe(won(1_238_400));
  });

  it('21년 이상 25일(상한), 월 300만 ÷ 209 통상시급 기준 수당은 계산기 결과와 같다', () => {
    const r = calculateAnnualLeave({
      hireDate: '2005-01-01',
      untilDate: '2026-01-01',
      weeklyHours: 40,
      fivePlus: true,
      usedDays: 0,
      hourlyWage: ORDINARY_HOURLY_WAGE_FROM_3M_MONTHLY,
    });
    expect(r.availableDays).toBe(25);
    const found = row(t, '21년 이상');
    expect(found?.[1]).toBe('25일');
    expect(found?.[3]).toBe(won(r.allowance));
  });
});
