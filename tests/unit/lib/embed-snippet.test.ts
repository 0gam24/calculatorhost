import { describe, it, expect } from 'vitest';
import { buildEmbedSnippet, EMBED_ORIGIN } from '@/lib/seo/embed';

describe('buildEmbedSnippet', () => {
  const params = {
    embedPath: '/embed/capital-gains-tax/',
    canonicalPath: '/calculator/capital-gains-tax/',
    title: '양도소득세 계산기',
  };

  it('iframe src 가 절대 URL 임베드 경로를 가리킨다', () => {
    const snippet = buildEmbedSnippet(params);
    expect(snippet).toContain(
      `<iframe src="${EMBED_ORIGIN}/embed/capital-gains-tax/"`
    );
  });

  it('백링크 앵커 href 가 정식 계산기 절대 URL 이다 (SEO 핵심)', () => {
    const snippet = buildEmbedSnippet(params);
    expect(snippet).toContain(
      `<a href="${EMBED_ORIGIN}/calculator/capital-gains-tax/"`
    );
  });

  it('앵커 텍스트에 키워드(title)가 포함된다', () => {
    const snippet = buildEmbedSnippet(params);
    // 앵커 텍스트 = "양도소득세 계산기 — calculatorhost"
    expect(snippet).toMatch(/>양도소득세 계산기 — calculatorhost<\/a>/);
  });

  it('기본 iframe 높이는 760px', () => {
    const snippet = buildEmbedSnippet(params);
    expect(snippet).toContain('height="760"');
  });

  it('height 파라미터로 높이를 재정의할 수 있다', () => {
    const snippet = buildEmbedSnippet({ ...params, height: 900 });
    expect(snippet).toContain('height="900"');
    expect(snippet).not.toContain('height="760"');
  });

  it('iframe 은 loading="lazy" 로 지연 로드한다', () => {
    const snippet = buildEmbedSnippet(params);
    expect(snippet).toContain('loading="lazy"');
  });
});
