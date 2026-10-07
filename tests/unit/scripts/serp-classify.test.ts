// serp-classify.mjs unit tests.
// awoo naver-rank-check 의 판정 로직을 calculatorhost 용으로 이식한 순수 함수.
// awoo 와 다른 점: 경쟁 계산기 사이트를 'tool' 로 따로 분류하고 빈자리(openSlots)로 센다.
import { describe, expect, it } from 'vitest';
import {
  SITE_HOST,
  buildAbove,
  classifyDoc,
  hostKind,
  parseResults,
  verdicts,
} from '../../../scripts/lib/serp-classify.mjs';

const SISTERS = new Set(['awoo.or.kr', 'homedata.kr', 'asiatop.co.kr']);

describe('hostKind', () => {
  it('자사', () => expect(hostKind(SITE_HOST, SISTERS)).toBe('us'));
  it('네이버', () => expect(hostKind('blog.naver.com', SISTERS)).toBe('naver'));
  it('자매', () => {
    expect(hostKind('homedata.kr', SISTERS)).toBe('sister');
    expect(hostKind('m.awoo.or.kr', SISTERS)).toBe('sister');
  });
  it('기관: go.kr·or.kr·korea.kr·청약홈', () => {
    expect(hostKind('hometax.go.kr', SISTERS)).toBe('institutional');
    expect(hostKind('nhis.or.kr', SISTERS)).toBe('institutional');
    expect(hostKind('korea.kr', SISTERS)).toBe('institutional');
    expect(hostKind('applyhome.co.kr', SISTERS)).toBe('institutional');
  });
  it('경쟁 계산기 사이트는 tool', () => {
    expect(hostKind('aptalimi.com', SISTERS)).toBe('tool');
    expect(hostKind('tools.devcomma.com', SISTERS)).toBe('tool');
    expect(hostKind('incometax.calculate.co.kr', SISTERS)).toBe('tool');
    expect(hostKind('xn--989a00af8jnslv3dba.com', SISTERS)).toBe('tool');
    expect(hostKind('somecalc.kr', SISTERS)).toBe('tool');
  });
  it('언론', () => {
    expect(hostKind('hankyung.com', SISTERS)).toBe('press');
    expect(hostKind('www.newsjeju.net', SISTERS)).toBe('press');
  });
  it('나머지는 commercial', () => expect(hostKind('kooltip.com', SISTERS)).toBe('commercial'));
});

describe('classifyDoc', () => {
  const YEAR = 2026;
  it('살아 있는 관공서 문서는 institutional + mainGov', () => {
    const c = classifyDoc(
      { host: 'wetax.go.kr', url: 'https://www.wetax.go.kr/main', title: '자동차세 연납 2026' },
      SISTERS,
      YEAR,
    );
    expect(c).toMatchObject({ kind: 'institutional', mainGov: true, openBy: [] });
  });
  it('관공서 게시판 공지 한 장은 열린 자리', () => {
    const c = classifyDoc(
      {
        host: 'anyang.go.kr',
        url: 'https://www.anyang.go.kr/main/selectBbsNttView.do?bbsNo=1&nttNo=2',
        title: '2026년 자동차세 연납 안내',
      },
      SISTERS,
      YEAR,
    );
    expect(c.kind).toBe('institutional-open');
    expect(c.openBy).toContain('board');
    expect(c.mainGov).toBe(false);
  });
  it('지난 연도만 적힌 관공서 문서는 열린 자리', () => {
    const c = classifyDoc(
      { host: 'nts.go.kr', url: 'https://www.nts.go.kr/a', title: '2024년 양도소득세 안내' },
      SISTERS,
      YEAR,
    );
    expect(c.kind).toBe('institutional-open');
    expect(c.openBy).toContain('stale');
  });
  it('올해가 하나라도 있으면 stale 아님', () => {
    const c = classifyDoc(
      { host: 'nts.go.kr', url: 'https://www.nts.go.kr/a', title: '2025년 대비 2026년 개정' },
      SISTERS,
      YEAR,
    );
    expect(c.stale).toBe(false);
  });
  it('도구·상업 문서는 stale 표시만 하고 종류는 그대로', () => {
    const c = classifyDoc(
      { host: 'aptalimi.com', url: 'https://aptalimi.com/x', title: '2024 청약가점 계산기' },
      SISTERS,
      YEAR,
    );
    expect(c).toMatchObject({ kind: 'tool', stale: true, mainGov: false });
  });
});

describe('parseResults', () => {
  const json = {
    total: 5120,
    items: [
      { title: '<b>청약가점</b> 계산기', link: 'https://aptalimi.com/a', description: '무주택 기간' },
      { title: '청약가점 계산 2', link: 'https://aptalimi.com/b', description: '같은 호스트' },
      { title: '청약홈', link: 'https://www.applyhome.co.kr/x', description: '' },
      { title: '블로그', link: 'https://blog.naver.com/x/1', description: '' },
      { title: '우리', link: 'https://calculatorhost.com/calculator/housing-subscription/', description: '' },
      { title: '깨진 링크', link: 'not a url', description: '' },
    ],
  };
  it('호스트당 첫 건만 남기고 태그·www 를 정리한다', () => {
    const r = parseResults(json, { sisters: SISTERS, year: 2026 });
    expect(r.webDocs.map((d) => d.host)).toEqual([
      'aptalimi.com',
      'applyhome.co.kr',
      'blog.naver.com',
      SITE_HOST,
    ]);
    expect(r.webDocs[0]?.title).toBe('청약가점 계산기');
    expect(r.webDocRaw).toBe(5);
    expect(r.webDocCount).toBe(4);
    expect(r.webDocTotal).toBe(5120);
    expect(r.toolCount).toBe(1);
  });
});

describe('buildAbove', () => {
  const docs = Array.from({ length: 12 }, (_, i) => ({
    host: `h${i}.com`,
    kind: 'commercial' as const,
    title: `t${i}`,
    stale: false,
    mainGov: false,
    openBy: [],
  }));
  it('자사 3위면 위 2건', () => {
    const { above, wholeWindow } = buildAbove(docs, 2);
    expect(above).toHaveLength(2);
    expect(wholeWindow).toBe(false);
  });
  it('미노출이면 상위 10건 전체', () => {
    const { above, wholeWindow } = buildAbove(docs, -1);
    expect(above).toHaveLength(10);
    expect(wholeWindow).toBe(true);
  });
});

describe('verdicts', () => {
  const doc = (kind: string, extra = {}) => ({ host: `${kind}.x`, kind, title: '', ...extra });
  it('도구·상업 2곳 이상이면 T2 열림', () => {
    const v = verdicts({ rank: null, above: [doc('tool'), doc('commercial')], eyeOffset: null });
    expect(v.openSlots).toBe(2);
    expect(v.verdictT2).toBe('open');
  });
  it('빈자리 1곳이면 T2 닫힘', () => {
    const v = verdicts({ rank: null, above: [doc('tool'), doc('naver')], eyeOffset: null });
    expect(v.verdictT2).toBe('closed');
  });
  it('관공서 2곳 이상이면 T1 닫힘', () => {
    const v = verdicts({
      rank: null,
      above: [doc('institutional', { mainGov: true }), doc('institutional', { mainGov: true })],
      eyeOffset: null,
    });
    expect(v.mainGovAbove).toBe(2);
    expect(v.verdictT1).toBe('closed');
  });
  it('이미 3위 안이면 T1 닫힘', () => {
    expect(verdicts({ rank: 2, above: [], eyeOffset: null }).verdictT1).toBe('closed');
  });
  it('눈 확인 "그 아래"(3)면 둘 다 닫힘', () => {
    const v = verdicts({ rank: null, above: [doc('tool'), doc('tool')], eyeOffset: 3 });
    expect(v.verdictT1).toBe('closed');
    expect(v.verdictT2).toBe('closed');
  });
  it('자매가 위에 있으면 이유에 남긴다', () => {
    const v = verdicts({ rank: null, above: [doc('sister')], eyeOffset: null });
    expect(v.sisterAbove).toBe(1);
    expect(v.reason.some((r) => r.startsWith('sister'))).toBe(true);
  });
});
