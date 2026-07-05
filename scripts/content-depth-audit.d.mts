export declare function stripHtmlToText(html: string): string;
export declare function countKorean(text: string): number;
export declare function auditCalculators(
  outCalcDir: string,
  floor?: number,
): {
  results: Array<{ slug: string; korean: number; total: number; thin: boolean }>;
  floor?: number;
  missing: boolean;
};
