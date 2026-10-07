// exposure.mjs / revenue-weight.mjs unit tests.
// 노출 가능성 점수(awoo exposureOf 이식, 계산기 사이트용 '경쟁 계산기 자리' 가점)와
// 하루 달러 추정·정렬.
import { describe, expect, it } from 'vitest';
import { exposureOf } from '../../../scripts/lib/exposure.mjs';
import { revenueOf, usdPerDay, valueOrder } from '../../../scripts/lib/revenue-weight.mjs';

const serp = (over = {}) => ({
  rank: null,
  openSlots: 0,
  mainGovAbove: 0,
  pressAbove: null,
  toolAbove: 0,
  eyeOffset: null,
  verdictT1: 'closed',
  verdictT2: 'closed',
  ...over,
});

describe('exposureOf', () => {
  it('실측 전이면 점수를 지어내지 않는다', () => {
    expect(exposureOf({ query: 'x' })).toEqual({ score: null, label: '미측정', reasons: ['검색 결과 실측 전'] });
  });
  it('이미 3위 안이면 0 (새 글 가치 없음)', () => {
    expect(exposureOf({ track: 'T2', serp: serp({ rank: 2 }) }).score).toBe(0);
  });
  it('T2 자리 열림 + 빈자리 4 + 관공서 없음 + 경쟁 계산기 = 높음', () => {
    const r = exposureOf({
      track: 'T2',
      serp: serp({ verdictT2: 'open', openSlots: 4, toolAbove: 2, mainGovAbove: 0 }),
    });
    // 40 + 15 + 10 + 5(경쟁 계산기)
    expect(r.score).toBe(70);
    expect(r.label).toBe('높음');
    expect(r.reasons).toEqual(['자리 열림', '경쟁 계산기 자리', '빈자리 4']);
  });
  it('T1 은 verdictT1 로 자리를 본다', () => {
    const r = exposureOf({ track: 'T1', serp: serp({ verdictT1: 'open', verdictT2: 'closed', mainGovAbove: 1 }) });
    expect(r.score).toBe(45); // 40 + 관공서 1곳 5
    expect(r.label).toBe('중간');
  });
  it('눈 확인 첫 화면이면 +10', () => {
    const base = exposureOf({ track: 'T2', serp: serp({ verdictT2: 'open', openSlots: 2, mainGovAbove: 2 }) });
    const eye = exposureOf({ track: 'T2', serp: serp({ verdictT2: 'open', openSlots: 2, mainGovAbove: 2, eyeOffset: 1 }) });
    expect((eye.score ?? 0) - (base.score ?? 0)).toBe(10);
  });
  it('자사 4~10위는 재진입 가점', () => {
    const r = exposureOf({ track: 'T2', serp: serp({ rank: 6 }) });
    expect(r.score).toBe(15); // 관공서 없음 10 + 재진입 5
  });
  it('최근 7일 3 이상·신생·시기 창은 각 +5', () => {
    const r = exposureOf({ track: 'T3', recent7: 4, born: true, inWindow: true, serp: serp({ mainGovAbove: 2 }) });
    expect(r.score).toBe(15);
  });
  it('100 을 넘지 않는다', () => {
    const r = exposureOf({
      track: 'T2',
      recent7: 50,
      born: true,
      inWindow: true,
      serp: serp({ verdictT2: 'open', openSlots: 6, toolAbove: 3, pressAbove: 0, eyeOffset: 1, rank: 5 }),
    });
    expect(r.score).toBe(100);
  });
});

describe('revenueOf / usdPerDay / valueOrder', () => {
  const money = { goalPerDay: 200, assumed: true, rpmUsd: { default: 5 }, pvPerVisitor: 1.2 };
  it('수익 자료가 없으니 모든 주제 1.0', () => {
    expect(revenueOf({ query: '퇴직금 계산기' }).weight).toBe(1);
    expect(revenueOf({ query: 'BMI 계산기' }).weight).toBe(1);
  });
  it('하루 달러 = 검색량 x 주 50명/점 x PV x RPM / 1000 / 7', () => {
    // 70점 → 주 3,500명 → PV 4,200 → $21/주 → $3/일
    expect(usdPerDay({ query: 'x', recent7: 70 }, money)).toBeCloseTo(3, 5);
  });
  it('검색량 모르면 null, 금액 자료 없으면 null', () => {
    expect(usdPerDay({ query: 'x' }, money)).toBeNull();
    expect(usdPerDay({ query: 'x', recent7: 10 }, null)).toBeNull();
  });
  it('자리 잡을 수 있는 것(45 이상)이 먼저, 그 안에서 점수 x 배수', () => {
    const items = [
      { query: 'a', exposure: { score: 40 } },
      { query: 'b', exposure: { score: 50 } },
      { query: 'c', exposure: { score: 80 } },
    ];
    expect(items.sort(valueOrder).map((i) => i.query)).toEqual(['c', 'b', 'a']);
  });
});
