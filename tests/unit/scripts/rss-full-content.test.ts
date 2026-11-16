import { describe, expect, it } from 'vitest';
import {
  cleanArticleHtml,
  extractArticleHtml,
  injectFullContent,
} from '../../../scripts/rss-full-content-core.mjs';

// 네이버 RSS 제출 가이드(05-02): 각 item 본문은 일부가 아닌 전체를 담는다.
// 01-01: 최신글은 본문 전체를 포함해 RSS 에 담는다. 피드 안의 주소는 사이트와 같은 도메인.

const PAGE = `<!DOCTYPE html><html><head><title>t</title></head><body>
<header>사이트 헤더</header>
<main id="main-content"><article class="mx-auto max-w-3xl space-y-8"><header><nav aria-label="브레드크럼"><a href="/">홈</a></nav>
<h1 class="text-4xl">연차수당 계산법</h1><p data-speakable="true" class="text-lg">미사용 연차는 수당으로 받습니다.</p></header>
<section><h2 id="q1">Q. 얼마인가요?</h2><p>1일 통상임금 × 남은 일수. <a href="/calculator/annual-leave/" class="x">연차 계산기</a>,
<a href="https://www.law.go.kr/법령/근로기준법" rel="nofollow">근로기준법</a></p>
<table><caption>예시</caption><thead><tr><th scope="col">일수</th></tr></thead><tbody><tr><td colspan="1">5</td></tr></tbody></table>
<button type="button">복사</button><svg viewBox="0 0 1 1"><path d="M0"/></svg><script>alert(1)</script><style>.a{}</style>
<img src="/og-default.png" alt="그림" class="w"></section></article></main>
<footer>푸터</footer></body></html>`;

describe('extractArticleHtml', () => {
  it('본문 article 안쪽만 꺼낸다 (머리글·푸터 제외)', () => {
    const html = extractArticleHtml(PAGE);
    expect(html).toContain('<h1');
    expect(html).toContain('Q. 얼마인가요?');
    expect(html).not.toContain('사이트 헤더');
    expect(html).not.toContain('푸터');
  });

  it('article 이 없으면 null', () => {
    expect(extractArticleHtml('<html><body><main>x</main></body></html>')).toBeNull();
  });
});

describe('cleanArticleHtml', () => {
  const cleaned = cleanArticleHtml(extractArticleHtml(PAGE) ?? '');

  it('스크립트·스타일·SVG·버튼·빵부스러기 nav 를 지운다', () => {
    expect(cleaned).not.toMatch(/<script|<style|<svg|<button|<nav|alert\(1\)/);
  });

  it('class·data-* 같은 꾸밈 속성은 지우고 href·src·alt·scope·colspan 은 남긴다', () => {
    expect(cleaned).not.toMatch(/class=|data-speakable|aria-label/);
    expect(cleaned).toContain('scope="col"');
    expect(cleaned).toContain('colspan="1"');
    expect(cleaned).toContain('alt="그림"');
  });

  it('사이트 안 상대 주소는 절대 주소로 바꾸고 바깥 주소는 그대로 둔다', () => {
    expect(cleaned).toContain('href="https://calculatorhost.com/calculator/annual-leave/"');
    expect(cleaned).toContain('src="https://calculatorhost.com/og-default.png"');
    expect(cleaned).toContain('href="https://www.law.go.kr/법령/근로기준법"');
    expect(cleaned).not.toMatch(/(href|src)="\//);
  });

  it('페이지 안 이동(#) 링크는 피드에서 쓸모가 없어 href 를 뺀다', () => {
    const out = cleanArticleHtml('<p><a href="#faq">자주 묻는 질문</a></p>');
    expect(out).toBe('<p><a>자주 묻는 질문</a></p>');
  });

  it('본문 문장·표·제목은 남긴다', () => {
    expect(cleaned).toContain('미사용 연차는 수당으로 받습니다.');
    expect(cleaned).toContain('<table>');
    expect(cleaned).toContain('<h2>Q. 얼마인가요?</h2>');
  });
});

describe('injectFullContent', () => {
  const RSS = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"><channel><title>s</title>
    <item>
      <title>a</title>
      <link>https://calculatorhost.com/guide/a/</link>
      <description>요약 a</description>
    </item>
    <item>
      <title>b</title>
      <link>https://calculatorhost.com/guide/b/</link>
      <description>요약 b</description>
    </item>
</channel></rss>`;

  it('item 마다 description 을 본문 전체(CDATA)로 바꾼다', () => {
    const out = injectFullContent(RSS, (url: string) =>
      url.endsWith('/a/') ? '<p>본문 a ]]> 끝</p>' : '<p>본문 b</p>',
    );
    expect(out.result).toContain('<description><![CDATA[<p>본문 a ]]]]><![CDATA[> 끝</p>]]></description>');
    expect(out.result).toContain('<description><![CDATA[<p>본문 b</p>]]></description>');
    expect(out.result).not.toContain('요약 a');
    expect(out.replaced).toBe(2);
  });

  it('본문을 못 찾은 item 은 요약을 그대로 둔다', () => {
    const out = injectFullContent(RSS, (url: string) => (url.endsWith('/a/') ? '<p>본문 a</p>' : null));
    expect(out.result).toContain('요약 b');
    expect(out.replaced).toBe(1);
  });
});
