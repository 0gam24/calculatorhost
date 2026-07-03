/**
 * 임베드 위젯 스니펫 빌더 (순수 함수).
 *
 * 외부 사이트에 붙여넣는 copy-paste 코드를 생성한다. 스니펫은 두 부분:
 *   1) <iframe> — 위젯 기능 (우리 도메인 /embed/* 로드)
 *   2) <a> 앵커 — 정식 계산기로 향하는 실제 백링크 (붙여넣는 쪽 페이지에 남음)
 *
 * SEO 백링크 가치는 (2)에서 발생한다. iframe 내부 링크는 우리 도메인이라 링크주스가
 * 전달되지 않으므로, 스니펫 텍스트에 외부 <a> 앵커를 반드시 포함해야 한다.
 */

export const EMBED_ORIGIN = 'https://calculatorhost.com';

export interface EmbedSnippetParams {
  /** 위젯 iframe 경로 (예: /embed/capital-gains-tax/) */
  embedPath: string;
  /** 백링크가 향할 정식 계산기 경로 (예: /calculator/capital-gains-tax/) */
  canonicalPath: string;
  /** 위젯 제목 겸 앵커 텍스트 키워드 (예: 양도소득세 계산기) */
  title: string;
  /** iframe 높이 px (기본 760) */
  height?: number;
}

export function buildEmbedSnippet({
  embedPath,
  canonicalPath,
  title,
  height = 760,
}: EmbedSnippetParams): string {
  const embedUrl = `${EMBED_ORIGIN}${embedPath}`;
  const canonicalUrl = `${EMBED_ORIGIN}${canonicalPath}`;
  return (
    `<iframe src="${embedUrl}" width="100%" height="${height}" ` +
    `style="border:1px solid #e5e7eb;border-radius:12px;max-width:680px" ` +
    `title="${title}" loading="lazy"></iframe>\n` +
    `<p style="font-size:12px;color:#6b7280;max-width:680px">제공: ` +
    `<a href="${canonicalUrl}" target="_blank" rel="noopener">${title} — calculatorhost</a></p>`
  );
}
