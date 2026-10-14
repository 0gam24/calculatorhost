// 청약가점 계산기의 "구간별 바로 보기" 표. 칸마다 같은 순수 함수의 직접 계산값과 대조한다.
import { describe, expect, it } from 'vitest';
import { housingSubscriptionQuickTable } from '@/lib/quick-tables/housing-subscription';
import { calculateHousingSubscriptionScore } from '@/lib/utils/housing-subscription';
import type { QuickTableData } from '@/lib/quick-tables/types';

const row = (t: QuickTableData, first: string) => t.rows.find((r) => r[0] === first);
const score = (noHomeYears: number, accountYears: number, dependents = 0) =>
  calculateHousingSubscriptionScore({ noHomeYears, dependents, accountYears });

function shape(t: QuickTableData, minRows: number) {
  expect(t.title.length).toBeGreaterThan(5);
  expect(t.caption.length).toBeGreaterThan(5);
  expect(t.note.length).toBeGreaterThan(10);
  expect(t.rows.length).toBeGreaterThanOrEqual(minRows);
  for (const r of t.rows) expect(r).toHaveLength(t.headers.length);
  const text = JSON.stringify(t);
  expect(text).not.toMatch(/NaN|Infinity|undefined|[—–]/);
}

describe('청약가점 기간별 점수표', () => {
  const t = housingSubscriptionQuickTable();

  it('6개월 미만부터 15년 이상까지 빠짐없이, 행 제목은 겹치지 않는다', () => {
    shape(t, 17);
    expect(new Set(t.rows.map((r) => r[0])).size).toBe(t.rows.length);
    expect(t.rows[0]?.[0]).toBe('6개월 미만');
    expect(t.rows.at(-1)?.[0]).toBe('15년 이상');
  });

  it('구간 점수는 계산기 함수 값과 같다', () => {
    const half = score(0.5, 0.5);
    expect(row(t, '6개월 이상 1년 미만')?.[1]).toBe(`${half.noHomeScore}점`);
    expect(row(t, '6개월 이상 1년 미만')?.[2]).toBe(`${half.accountScore}점`);
    const seven = score(7, 7);
    expect(row(t, '7년 이상 8년 미만')?.[1]).toBe(`${seven.noHomeScore}점`);
    expect(row(t, '7년 이상 8년 미만')?.[2]).toBe(`${seven.accountScore}점`);
    const max = score(15, 15, 6);
    expect(row(t, '15년 이상')?.[1]).toBe(`${max.noHomeScore}점`);
    expect(row(t, '15년 이상')?.[2]).toBe(`${max.accountScore}점`);
    expect(t.note).toContain(`${max.totalScore}점`);
  });
});
