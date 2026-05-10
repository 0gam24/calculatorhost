/**
 * scripts/generate-today.mjs 의 타입 선언.
 */

export interface PageEntry {
  kind: 'guide' | 'calculator';
  slug: string;
  url: string;
  title: string;
  summary: string;
}

export interface PageMeta {
  title: string | null;
  description: string | null;
}

export function todayKst(now?: Date): string;
export function extractPageMeta(src: string): PageMeta;
export function summarize(description: string | null, limit?: number): string;
export function gitNewPageFiles(options?: {
  sinceIso?: string;
  repoRoot?: string;
}): string[];
export function pathToEntry(relPath: string, src: string): PageEntry | null;
export function mergeIntoTodayMd(
  existing: string,
  dateStr: string,
  entries: PageEntry[],
): string;
