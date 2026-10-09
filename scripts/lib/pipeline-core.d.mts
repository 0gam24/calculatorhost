export interface Candidate {
  id: string;
  query: string;
  track: string;
  family: string;
  cluster?: string;
  calculator: string | null;
  action: { type: string; target: string | null };
  inWindow?: boolean;
  kind?: string;
  widgetRisk?: boolean;
  note?: string;
  [k: string]: unknown;
}
export interface QueueItem {
  id: string;
  status?: string;
  statusAt?: string;
  addedAt?: string;
  publishedSlug?: string;
  [k: string]: unknown;
}
export declare function withCluster(alias: string, cluster: string): string;
export declare function buildCandidates(input: {
  bigKeywords: { keywords?: Array<Record<string, any>> } | null | undefined;
  calendar: { items?: Array<Record<string, any>> } | null | undefined;
  today: string;
}): Candidate[];
export declare function parseGuideIndex(src: string): Array<{ slug: string; title: string }>;
export declare function coverageOf(query: string, guides: Array<{ slug: string; title: string }>): string | null;
export declare function mergeQueue(prev: QueueItem[] | null | undefined, next: QueueItem[], today: string): QueueItem[];
export declare function manualItem(
  query: string,
  calendar: { items?: Array<Record<string, any>> } | null | undefined,
  today: string,
): Candidate & { addedAt: string };
export declare function carryManual(prev: QueueItem[] | null | undefined, candidates: Array<{ query: string }>, today: string): QueueItem[];
export declare function rankByScore<T extends { exposure?: { score?: number | null } | null; recent7?: number | null }>(
  items: T[],
  usd: (item: T) => number | null | undefined,
): T[];
