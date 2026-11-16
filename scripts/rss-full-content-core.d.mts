export const SITE_URL: string;
export function extractArticleHtml(pageHtml: string): string | null;
export function cleanArticleHtml(html: string): string;
export function injectFullContent(
  rssXml: string,
  contentForUrl: (url: string) => string | null,
): { result: string; replaced: number };
