export declare function pageFileToRoute(file: string): string | null;
export declare function buildManifest(
  entries: Array<{ file: string; isoDate: string }>,
  previous?: Record<string, string>,
): Record<string, string>;
