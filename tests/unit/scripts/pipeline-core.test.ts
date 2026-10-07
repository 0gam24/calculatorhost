// pipeline-core.mjs unit tests.
// 후보 생성(T2 큰 키워드·별칭, T3 캘린더), 기존 글 겹침 판정, 큐 상태 보존.
import { describe, expect, it } from 'vitest';
import {
  buildCandidates,
  carryManual,
  coverageOf,
  manualItem,
  mergeQueue,
  parseGuideIndex,
  withCluster,
} from '../../../scripts/lib/pipeline-core.mjs';

describe('withCluster', () => {
  it('별칭에 클러스터 단어가 있으면 그대로', () => {
    expect(withCluster('퇴직금 계산 방법', '퇴직금')).toBe('퇴직금 계산 방법');
    expect(withCluster('1년 미만 퇴직금', '퇴직금')).toBe('1년 미만 퇴직금');
  });
  it('없으면 클러스터를 앞에 붙인다', () => {
    expect(withCluster('주 15시간', '주휴수당')).toBe('주휴수당 주 15시간');
  });
  it('클러스터가 여러 단어면 그중 하나라도 있으면 그대로', () => {
    expect(withCluster('세후 월급', '연봉 실수령액')).toBe('연봉 실수령액 세후 월급');
    expect(withCluster('연봉 4000 실수령액', '연봉 실수령액')).toBe('연봉 4000 실수령액');
  });
});

describe('buildCandidates', () => {
  const big = {
    keywords: [
      {
        term: '퇴직금 계산기',
        cluster: '퇴직금',
        calculator: '/calculator/severance/',
        aliases: ['퇴직금 계산 방법', '1년 미만 퇴직금'],
        existingSlugs: ['severance-pay-deadline-14-days-2026'],
      },
    ],
  };
  const cal = {
    items: [
      { key: 'jongbu', query: '종합부동산세', peakMonth: 11, writeBy: '2026-10-07', calculator: '/calculator/comprehensive-property-tax/', family: 'A', kind: 'refresh' },
      { key: 'later', query: '종합소득세', peakMonth: 5, writeBy: '2027-04-01', calculator: null, family: 'A', kind: 'refresh' },
    ],
  };
  it('T2 는 대표 형태 + 별칭, T3 는 writeBy 가 지난 것만', () => {
    const c = buildCandidates({ bigKeywords: big, calendar: cal, today: '2026-10-07' });
    expect(c.map((x) => `${x.track}:${x.query}`)).toEqual([
      'T2:퇴직금 계산기',
      'T2:퇴직금 계산 방법',
      'T2:1년 미만 퇴직금',
      'T3:종합부동산세',
    ]);
  });
  it('T3 는 피크 달 끝까지 시기 창 안', () => {
    const c = buildCandidates({ bigKeywords: { keywords: [] }, calendar: cal, today: '2026-10-07' });
    expect(c[0]?.inWindow).toBe(true);
  });
  it('대표 형태가 계산기 검색어면 계산기 보강으로 간다', () => {
    const c = buildCandidates({ bigKeywords: big, calendar: { items: [] }, today: '2026-10-07' });
    expect(c[0]?.action).toEqual({ type: 'calculator', target: '/calculator/severance/' });
  });
  it('계산기 검색어인데 맞는 계산기가 없으면 신규 계산기로 간다', () => {
    const none = { keywords: [{ term: '연차수당 계산기', cluster: '연차수당', calculator: null, aliases: [] }] };
    const c = buildCandidates({ bigKeywords: none, calendar: { items: [] }, today: '2026-10-07' });
    expect(c[0]?.action).toEqual({ type: 'new-calculator', target: null });
  });
  it('같은 검색어는 한 번만', () => {
    const dup = { keywords: [{ ...big.keywords[0], aliases: ['퇴직금 계산기', '퇴직금계산기'] }] };
    const c = buildCandidates({ bigKeywords: dup, calendar: { items: [] }, today: '2026-10-07' });
    expect(c).toHaveLength(1);
  });
});

describe('parseGuideIndex / coverageOf', () => {
  const src = `export const GUIDES: GuideEntry[] = [
  {
    slug: 'weekly-holiday-allowance-2026',
    title: '주휴수당 계산법 2026, 주 15시간 기준',
    description: 'x',
  },
  {
    slug: 'severance-pay-deadline-14-days-2026',
    title: '퇴직금 지급기한 14일',
    description: 'y',
  },
];`;
  const guides = parseGuideIndex(src);
  it('GUIDES 배열에서 slug·title 을 뽑는다', () => {
    expect(guides).toEqual([
      { slug: 'weekly-holiday-allowance-2026', title: '주휴수당 계산법 2026, 주 15시간 기준' },
      { slug: 'severance-pay-deadline-14-days-2026', title: '퇴직금 지급기한 14일' },
    ]);
  });
  it('제목에 검색어가 통째로 들어 있으면 그 글이 이미 다룬다', () => {
    expect(coverageOf('주휴수당 계산법', guides)).toBe('weekly-holiday-allowance-2026');
    expect(coverageOf('퇴직금 지급기한', guides)).toBe('severance-pay-deadline-14-days-2026');
  });
  it('없으면 null', () => {
    expect(coverageOf('1년 미만 퇴직금', guides)).toBeNull();
  });
});

describe('mergeQueue', () => {
  it('운영자가 바꾼 상태(hold·published)는 새로 만들어도 유지', () => {
    const prev = [{ id: 'T2:퇴직금계산방법', status: 'hold', statusAt: '2026-10-06' }];
    const next = [{ id: 'T2:퇴직금계산방법', status: 'proposed' }];
    expect(mergeQueue(prev, next, '2026-10-07')[0]).toMatchObject({ status: 'hold', statusAt: '2026-10-06' });
  });
  it('손으로 넣은 빈틈: 항목은 21일 보존', () => {
    const prev = [
      { id: '빈틈:자동차세 2000cc', status: 'proposed', addedAt: '2026-09-20' },
      { id: '빈틈:오래됨', status: 'proposed', addedAt: '2026-09-01' },
    ];
    const ids = mergeQueue(prev, [], '2026-10-07').map((i) => i.id);
    expect(ids).toEqual(['빈틈:자동차세 2000cc']);
  });
});

describe('manualItem', () => {
  const cal = {
    items: [
      { key: 'yearend-2027', query: '연말정산', peakMonth: 1, writeBy: '2026-12-01', calculator: null, family: 'A', kind: 'new-calculator', note: 'n' },
      { key: 'car-annual-2027', query: '자동차세 연납', peakMonth: 1, writeBy: '2026-12-10', calculator: '/calculator/vehicle-tax/', family: 'A', kind: 'refresh' },
    ],
  };
  it('캘린더에 있는 주제면 그 처리 방식을 그대로 가져온다 (선점)', () => {
    const m = manualItem('자동차세 연납', cal, '2026-10-07');
    expect(m).toMatchObject({
      id: '빈틈:자동차세 연납',
      query: '자동차세 연납',
      track: 'T3',
      addedAt: '2026-10-07',
      inWindow: false,
      action: { type: 'calculator', target: '/calculator/vehicle-tax/' },
    });
  });
  it('신규 계산기 항목은 new-calculator 로', () => {
    expect(manualItem('연말정산', cal, '2026-10-07')?.action).toEqual({ type: 'new-calculator', target: null });
  });
  it('캘린더에 없으면 T2 새 글 후보', () => {
    expect(manualItem('자동차세 2000cc', cal, '2026-10-07')).toMatchObject({
      id: '빈틈:자동차세 2000cc',
      track: 'T2',
      action: { type: 'new', target: null },
    });
  });
});

describe('carryManual', () => {
  it('21일 안의 빈틈: 항목을 다시 재도록 후보에 넣는다 (계산값은 지운다)', () => {
    const prev = [
      { id: '빈틈:자동차세 2000cc', query: '자동차세 2000cc', track: 'T2', family: 'B', action: { type: 'new', target: null }, addedAt: '2026-09-20', status: 'hold', exposure: { score: 50 }, recent7: 3 },
      { id: '빈틈:오래됨', query: '오래됨', track: 'T2', addedAt: '2026-09-01' },
    ];
    const out = carryManual(prev, [], '2026-10-07');
    expect(out).toHaveLength(1);
    expect(out[0]).toMatchObject({ id: '빈틈:자동차세 2000cc', addedAt: '2026-09-20' });
    expect(out[0]).not.toHaveProperty('exposure');
    expect(out[0]).not.toHaveProperty('status');
  });
  it('이미 후보에 같은 검색어가 있으면 넣지 않는다', () => {
    const prev = [{ id: '빈틈:퇴직금 계산기', query: '퇴직금 계산기', track: 'T2', addedAt: '2026-10-01' }];
    const cands = [{ id: 'T2:퇴직금계산기', query: '퇴직금 계산기' }];
    expect(carryManual(prev, cands, '2026-10-07')).toEqual([]);
  });
});
