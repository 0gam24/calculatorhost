// public-data-core.mjs unit tests.
// sync-public-data 의 ECOS·KOSIS 조회 기간과 "가장 최근 행" 고르기 (2026-10-14: 202501 고정·첫 행 선택 버그 수정).
import { describe, expect, it } from 'vitest';
import { monthRange, latestByPeriod } from '../../../scripts/lib/public-data-core.mjs';

describe('monthRange', () => {
  it('KST 기준 이번 달까지, N개월 전부터', () => {
    expect(monthRange(new Date('2026-10-14T03:00:00Z'), 24)).toEqual({ start: '202410', end: '202610' });
  });
  it('UTC 로는 전달 말일이어도 KST 로 다음 달이면 다음 달', () => {
    expect(monthRange(new Date('2026-09-30T16:00:00Z'), 1)).toEqual({ start: '202609', end: '202610' });
  });
  it('연도를 넘어 거슬러 간다', () => {
    expect(monthRange(new Date('2026-02-01T00:00:00Z'), 3)).toEqual({ start: '202511', end: '202602' });
  });
});

describe('latestByPeriod', () => {
  it('기간 문자열이 가장 큰 행을 고른다 (응답 순서와 무관)', () => {
    const rows = [
      { TIME: '202501', DATA_VALUE: '3' },
      { TIME: '202608', DATA_VALUE: '3' },
      { TIME: '202607', DATA_VALUE: '2.75' },
    ];
    expect(latestByPeriod(rows, 'TIME')).toEqual({ TIME: '202608', DATA_VALUE: '3' });
  });
  it('기간 필드가 없거나 행이 없으면 null', () => {
    expect(latestByPeriod([], 'TIME')).toBeNull();
    expect(latestByPeriod([{ X: 1 }], 'TIME')).toBeNull();
    expect(latestByPeriod(undefined, 'PRD_DE')).toBeNull();
  });
});
