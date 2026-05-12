export declare function extractPagePaths(files: string[]): string[];
export declare function extractSitemapUrls(xml: string, host?: string): string[];
export declare function diffPagesVsSitemap(
  pages: string[],
  sitemap: string[],
): { missingFromSitemap: string[]; extraInSitemap: string[] };
