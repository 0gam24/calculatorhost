// volume-core.mjs unit tests.
// 데이터랩 상대지수를 기준어(실업급여=100) 눈금으로 바꾸는 순수 함수.
// 원본: awoo scripts/keyword-volume.mjs (alignToAxis·recent·analyseSeason·verdict).
import { describe, expect, it } from 'vitest';
import {
  alignToAxis,
  analyseSeason,
  chunkTerms,
  recentRow,
  seasonVerdict,
} from '../../../scripts/lib/volume-core.mjs';

describe('chunkTerms', () => {
  it('요청당 5그룹 중 1자리는 기준어 몫이라 4개씩 자른다', () => {
    expect(chunkTerms(['a', 'b', 'c', 'd', 'e', 'f'])).toEqual([
      ['a', 'b', 'c', 'd'],
      ['e', 'f'],
    ]);
  });
});

describe('alignToAxis', () => {
  it('빠진 날짜를 0 으로 채운다', () => {
    const axis = ['2026-10-01', '2026-10-02', '2026-10-03'];
    expect(alignToAxis([{ period: '2026-10-02', ratio: 5 }], axis)).toEqual([0, 5, 0]);
  });
  it('축이 없으면 그대로', () => {
    expect(alignToAxis([{ period: 'x', ratio: 3 }], [])).toEqual([3]);
  });
});

describe('recentRow', () => {
  it('기준어 평균 대비 % 로 환산한다 (최근 7일 · 30일)', () => {
    const vals = Array(30).fill(1);
    const r = recentRow(vals, 50);
    expect(r.relative).toBe(2);
    expect(r.recentRelative).toBe(2);
    expect(r.trend).toBe(1);
    expect(r.born).toBe(false);
  });
  it('최근에 처음 나타나 3 이상이면 신생', () => {
    const vals = [...Array(22).fill(0), ...Array(8).fill(4)];
    const r = recentRow(vals, 50);
    expect(r.zeroDays).toBe(22);
    expect(r.days).toBe(8);
    expect(r.recentRelative).toBe(8);
    expect(r.born).toBe(true);
  });
  it('기준어 값이 0 이면 계산하지 않는다', () => {
    expect(() => recentRow([1, 2], 0)).toThrow();
  });
});

describe('analyseSeason + seasonVerdict', () => {
  const months = (vals: number[]) =>
    vals.map((ratio, i) => ({ period: `2025-${String(((9 + i - 1) % 12) + 1).padStart(2, '0')}-01`, ratio }));
  it('피크가 2개월 안이고 피크 값이 3 이상이면 선점 적기', () => {
    // 2025-09 ~ 2026-09 (13개월), 12월에 피크
    const pts = months([1, 1, 1, 10, 1, 1, 1, 1, 1, 1, 1, 1, 1]);
    const s = analyseSeason(pts, 50, 10);
    expect(s.peakMonth).toBe(12);
    expect(s.monthsToPeak).toBe(2);
    expect(s.peakRelative).toBe(20);
    expect(s.flat).toBe(false);
    expect(seasonVerdict({ ...s, relative: 3 }).code).toBe('landgrab');
  });
  it('평평하고 평균 10 이상이면 상시 수요', () => {
    const pts = months(Array(13).fill(10));
    const s = analyseSeason(pts, 50, 10);
    expect(s.flat).toBe(true);
    expect(seasonVerdict({ ...s, relative: 20 }).code).toBe('evergreen');
  });
  it('평평하고 1.5 미만이면 수요 없음', () => {
    const pts = months(Array(13).fill(0.5));
    const s = analyseSeason(pts, 50, 10);
    expect(seasonVerdict({ ...s, relative: 1 }).code).toBe('none');
  });
  it('진행 중 물결이면 피크 판정보다 물결이 우선', () => {
    expect(seasonVerdict({ inProgressWave: true, waveRatio: 2, flat: false, relative: 5 }).code).toBe(
      'wave',
    );
  });
});
