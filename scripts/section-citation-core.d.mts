export declare function countCitations(src: string): number;
export declare function classifyCitations(
  entries: Array<{ path: string; count: number }>,
): { missing: string[]; minimal: string[]; strong: string[] };
export declare const CITATION_EXEMPT: Record<string, string>;
export declare function partitionMissing(
  missingPaths: string[],
  exempt?: Record<string, string>,
): { blocking: string[]; exempted: string[] };
