// EmbedCodeBox: 정적 HTML 에 임베드 코드(iframe·a 태그 문자열)를 넣지 않는다 (2026-10-14).
// 이전에는 textarea 값으로 코드가 정적 HTML 에 들어가 검색 결과 요약에 HTML 코드가 섞일 수 있었다.
import { describe, expect, it } from 'vitest';
import * as React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

// vitest 의 esbuild 는 classic JSX 런타임이라 컴포넌트 파일이 React 전역을 기대한다
(globalThis as unknown as { React: typeof React }).React = React;
const { EmbedCodeBox } = await import('@/components/calculator/EmbedCodeBox');
const { createElement } = React;

const html = renderToStaticMarkup(
  createElement(EmbedCodeBox, {
    embedPath: '/embed/loan/',
    canonicalPath: '/calculator/loan/',
    title: '대출이자 계산기',
  }),
);

describe('EmbedCodeBox 첫 화면(정적 HTML)', () => {
  it('임베드 코드 문자열이 없다', () => {
    expect(html).not.toContain('&lt;iframe');
    expect(html).not.toContain('<textarea');
    expect(html).not.toContain('calculatorhost.com/embed/loan/');
  });
  it('검색 요약에서 빠지도록 data-nosnippet 을 단다', () => {
    expect(html).toMatch(/<section[^>]*data-nosnippet/);
  });
  it('코드 보기 버튼이 있다', () => {
    expect(html).toContain('임베드 코드 보기');
  });
});
