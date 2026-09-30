/** Calculator iframe with optional, neutral brand attribution.
 * The suggested credit is nofollow and never required as a condition of use.
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
  /** Attribution is optional; it is never a condition of using the calculator. */
  showCredit?: boolean;
}

function escapeAttribute(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');
}

export function buildEmbedSnippet({
  embedPath,
  canonicalPath,
  title,
  height = 760,
  showCredit = true,
}: EmbedSnippetParams): string {
  const embedUrl = escapeAttribute(`${EMBED_ORIGIN}${embedPath}`);
  const canonicalUrl = escapeAttribute(`${EMBED_ORIGIN}${canonicalPath}`);
  const safeTitle = escapeAttribute(title);
  const safeHeight = Number.isFinite(height) && height > 0 ? Math.round(height) : 760;
  return (
    `<iframe src="${embedUrl}" width="100%" height="${safeHeight}" ` +
    `style="border:1px solid #e5e7eb;border-radius:12px;max-width:680px" ` +
    `title="${safeTitle}" loading="lazy"></iframe>` +
    (showCredit
      ? '\n' +
        `<p style="font-size:12px;color:#6b7280;max-width:680px">제공: ` +
        `<a href="${canonicalUrl}" target="_blank" rel="nofollow noopener noreferrer">calculatorhost</a></p>`
      : '')
  );
}
