// 가이드 ↔ 계산기 연결 규칙 (src/lib/data/guide-calculator-map.ts)
import { describe, expect, it } from 'vitest';
import {
  CALCULATOR_LABELS,
  calculatorForGuide,
  guidesForCalculator,
} from '@/lib/data/guide-calculator-map';
import { CALCULATOR_SLUGS } from '@/lib/analytics/calculator-events';
import { GUIDES } from '@/app/guide/page';

const g = (title: string) => calculatorForGuide({ slug: 'x', title });

describe('calculatorForGuide', () => {
  it('좁은 주제가 넓은 주제보다 먼저', () => {
    expect(g('주휴수당 계산법 (2026), 주 15시간 알바도 받나')).toBe('weekly-holiday-allowance');
    expect(g('2026 퇴직소득세 계산법, 연분연승법·근속연수공제')).toBe('severance');
    expect(g('재산세 vs 종부세 차이 2026, 둘 다 내나?')).toBe('comprehensive-property-tax');
    expect(g('1세대1주택 재산세 특례세율 2026, 0.05%p 인하 구조')).toBe('property-tax');
    expect(g('취득세 일시적 2주택 중과 배제 2026, 종전주택 3년 처분')).toBe('acquisition-tax');
    expect(g('일시적 2주택 양도세 비과세 3년')).toBe('capital-gains-tax');
  });

  it('자동차 취득세는 주택 취득세 계산기가 아니라 자동차세 계산기로', () => {
    expect(g('자동차 취득세 계산 2026, 승용 7%·경차 4%·과세표준 완전정리')).toBe('vehicle-tax');
  });

  it('주식·코인·배당 과세와 정부 지원금 글에는 계산기를 붙이지 않는다', () => {
    expect(g('해외주식 양도소득세 2026, 250만원 공제·22%·5월 신고')).toBeNull();
    expect(g('배당소득세 2026, 15.4% 원천징수·금융소득 종합과세')).toBeNull();
    expect(g('실업급여 2026, 상한 68,100원·하한 66,048원, 조건·금액·신청')).toBeNull();
    expect(g('육아휴직급여 2026, 지급률 단계·월 상한·6+6 부모제')).toBeNull();
  });

  it('주식이 들어가도 증여·상속 주제는 그 계산기로', () => {
    expect(g('명의신탁 증여의제 2026, 차명 주식·부동산 세금 차이')).toBe('gift-tax');
    expect(g('금융재산 상속공제 2026, 예금 주식 최대 2억 공제')).toBe('inheritance-tax');
  });

  it('월세 세액공제는 연말정산(연봉) 쪽, 전월세 전환은 전월세 계산기', () => {
    expect(g('월세 세액공제 2026 무주택 직장인 환급 계산 | 17% + 750만 한도')).toBe('salary');
    expect(g('전월세 전환율 계산법 2026, 보증금↔월세 환산 공식')).toBe('rent-conversion');
  });

  it('국민연금 보험료는 연봉, 수령·연금액은 은퇴자금', () => {
    expect(g('국민연금 보험료 2026 완전 정리, 계산법·상한액·직장/지역 차이')).toBe('salary');
    expect(g('국민연금 조기수령·연기연금 2026, 감액 6%·증액 7.2%')).toBe('retirement');
  });
});

describe('규칙이 가리키는 계산기는 모두 실제 계산기', () => {
  it('라벨 32개 = CALCULATOR_SLUGS 32개', () => {
    expect(Object.keys(CALCULATOR_LABELS).sort()).toEqual([...CALCULATOR_SLUGS].sort());
  });
  it('실제 가이드 목록에서 계산기가 붙는 글이 300편 이상', () => {
    const mapped = GUIDES.filter((x) => calculatorForGuide(x) != null);
    expect(mapped.length).toBeGreaterThanOrEqual(300);
  });
});

describe('guidesForCalculator', () => {
  const list = [
    { slug: 'a', title: '양도소득세 절세 7가지 방법 (2026)', publishedAt: '2026-05-01' },
    { slug: 'b', title: '취득세 계산법 2026', publishedAt: '2026-06-01' },
    { slug: 'c', title: '일시적 2주택 양도세 비과세 3년', publishedAt: '2026-07-01' },
  ];
  it('그 계산기에 붙는 가이드만, 최근 발행 순, 개수 제한', () => {
    expect(guidesForCalculator('capital-gains-tax', list).map((x) => x.slug)).toEqual(['c', 'a']);
    expect(guidesForCalculator('capital-gains-tax', list, 1).map((x) => x.slug)).toEqual(['c']);
  });
});

describe('guidesForCalculator 순서: 계산기 핵심어가 든 글 먼저', () => {
  it('연봉 계산기는 실수령·4대보험 글이 공제 글보다 앞', () => {
    const list = [
      { slug: 'angel', title: '엔젤투자 소득공제 2026', publishedAt: '2026-09-01' },
      { slug: 'take', title: '연봉 협상 시 실수령 기준 제안', publishedAt: '2026-01-01' },
      { slug: 'ins', title: '4대보험 요율 총정리 (2026)', publishedAt: '2026-06-19' },
    ];
    expect(guidesForCalculator('salary', list).map((x) => x.slug)).toEqual(['ins', 'take', 'angel']);
  });
  it('실제 목록에서도 연봉 계산기 첫 글은 핵심어를 담는다', () => {
    const first = guidesForCalculator('salary', GUIDES, 6)[0];
    expect(first?.title).toMatch(/실수령|연봉|월급|4대보험|간이세액|원천징수/);
  });
});
