export declare function countCitations(src: string): number;
export declare function classifyCitations(
  entries: Array<{ path: string; count: number }>,
): { missing: string[]; minimal: string[]; strong: string[] };
