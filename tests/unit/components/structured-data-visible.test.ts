// 구조화 데이터는 화면에 있는 내용과 같아야 한다 (네이버 구조화 데이터 08-01, 08-05·06).
// - 빵부스러기: 사이트 루트 이름은 "홈" 대신 사이트 이름, 화면과 JSON-LD 가 같다
// - HowTo: 마크업한 단계를 화면에도 보여준다
// - DefinedTermSet: 마크업한 용어 정의를 화면에도 보여준다
import { describe, expect, it } from 'vitest';
import * as React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

(globalThis as unknown as { React: typeof React }).React = React;
const { Breadcrumb } = await import('@/components/layout/Breadcrumb');
const { HowToSteps } = await import('@/components/calculator/HowToSteps');
const { GlossaryTerms } = await import('@/components/calculator/GlossaryTerms');
const { createElement } = React;

describe('Breadcrumb 화면', () => {
  const html = renderToStaticMarkup(
    createElement(Breadcrumb, {
      items: [{ name: '홈', href: '/' }, { name: '근로', href: '/category/work/' }, { name: '연봉 실수령액' }],
    }),
  );

  it('사이트 루트 항목은 "홈" 대신 사이트 이름으로 보인다', () => {
    expect(html).toContain('>calculatorhost</a>');
    expect(html).not.toContain('>홈<');
  });

  it('나머지 항목은 그대로', () => {
    expect(html).toContain('>근로</a>');
    expect(html).toContain('연봉 실수령액');
  });
});

describe('HowToSteps', () => {
  const html = renderToStaticMarkup(
    createElement(HowToSteps, {
      name: '연봉 실수령액 계산기 사용 방법',
      steps: [
        { name: '연봉 입력', text: '세전 연봉(또는 월급) 금액을 입력합니다.' },
        { name: '결과 확인', text: '월 실수령액을 확인합니다.' },
      ],
    }),
  );

  it('접힘 카드 제목에 HowTo 이름을 쓴다', () => {
    expect(html).toMatch(/<details[^>]*>[\s\S]*<summary[^>]*>연봉 실수령액 계산기 사용 방법<\/summary>/);
  });

  it('단계를 순서 목록으로 마크업과 같은 문장 그대로 보여준다', () => {
    expect(html).toContain('<ol');
    expect(html).toContain('세전 연봉(또는 월급) 금액을 입력합니다.');
    expect(html).toContain('월 실수령액을 확인합니다.');
    expect(html.match(/<li/g)?.length).toBe(2);
  });
});

describe('GlossaryTerms', () => {
  const html = renderToStaticMarkup(
    createElement(GlossaryTerms, {
      name: '연봉 실수령액 핵심 용어',
      terms: [
        { name: '4대보험', description: '국민연금·건강보험·장기요양보험·고용보험.' },
        { name: '비과세 근로소득', alternateName: '비과세', description: '소득세 과세 대상에서 빠지는 근로소득.' },
      ],
    }),
  );

  it('#glossary 앵커가 있는 접힘 카드다 (DefinedTermSet url 의 #glossary 와 맞춤)', () => {
    expect(html).toMatch(/<details[^>]*id="glossary"/);
    expect(html).toContain('연봉 실수령액 핵심 용어');
  });

  it('용어와 정의를 마크업과 같은 문장으로 보여준다', () => {
    expect(html).toContain('<dl');
    expect(html).toContain('4대보험');
    expect(html).toContain('국민연금·건강보험·장기요양보험·고용보험.');
    expect(html).toContain('소득세 과세 대상에서 빠지는 근로소득.');
  });
});
