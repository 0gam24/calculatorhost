// 평수·디데이 계산기의 구간별 바로 보기 표
import { describe, expect, it } from 'vitest';
import { areaQuickTable } from '@/lib/quick-tables/area';
import { ddayQuickTable } from '@/lib/quick-tables/d-day';
import { pyeongToSqm } from '@/lib/utils/area';
import { calculateAfterNDays, calculateNthDay } from '@/lib/utils/dday';
import type { QuickTableData } from '@/lib/quick-tables/types';

function shape(t: QuickTableData, minRows: number) {
  expect(t.rows.length).toBeGreaterThanOrEqual(minRows);
  for (const r of t.rows) expect(r).toHaveLength(t.headers.length);
  expect(JSON.stringify(t)).not.toMatch(/NaN|Infinity|undefined|[—–]/);
}

describe('평 → ㎡ 표', () => {
  const t = areaQuickTable();
  it('34평은 약 112.40㎡ (계산 함수와 같음)', () => {
    shape(t, 10);
    expect(t.rows.find((r) => r[0] === '34평')?.[1]).toBe(`약 ${pyeongToSqm(34).toFixed(2)}㎡`);
    expect(t.rows.find((r) => r[0] === '34평')?.[1]).toBe('약 112.40㎡');
  });
});

describe('기념일 표', () => {
  const t = ddayQuickTable();
  it('100일: 기념일 방식 2026-04-10(금), 단순 더하기 2026-04-11(토)', () => {
    shape(t, 6);
    const row = t.rows.find((r) => r[0] === '100일');
    expect(row?.[1]).toBe('2026-04-10 (금)');
    expect(row?.[2]).toBe('2026-04-11 (토)');
    const nth = calculateNthDay({ baseDate: '2026-01-01', n: 1000 });
    const add = calculateAfterNDays({ baseDate: '2026-01-01', offset: 1000 });
    const r1000 = t.rows.find((r) => r[0] === '1,000일');
    expect(r1000?.[1]).toBe(`${nth.resultDate} (${nth.weekday})`);
    expect(r1000?.[2]).toBe(`${add.resultDate} (${add.weekday})`);
  });
});
