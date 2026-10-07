export type DocKind =
  | 'us'
  | 'naver'
  | 'sister'
  | 'institutional'
  | 'institutional-open'
  | 'tool'
  | 'press'
  | 'commercial';

export interface WebDoc {
  url: string;
  host: string;
  title: string | null;
  snippet: string | null;
  kind: DocKind;
  stale: boolean;
  mainGov: boolean;
  openBy: string[];
}

export interface AboveDoc {
  host: string;
  kind: DocKind | string;
  title: string | null;
  stale?: boolean;
  mainGov?: boolean;
  openBy?: string[];
}

export declare const SITE_HOST: string;
export declare const ABOVE_WINDOW: number;
export declare function hostKind(host: string, sisters?: Set<string>): DocKind;
export declare function classifyDoc(
  doc: { host: string; url?: string; title?: string | null; snippet?: string | null },
  sisters: Set<string>,
  year: number,
): { kind: DocKind; stale: boolean; mainGov: boolean; openBy: string[] };
export declare function stripTags(s: unknown): string;
export declare function parseResults(
  json: { total?: number; items?: { title: string; link: string; description: string }[] },
  opts: { sisters?: Set<string>; year: number },
): {
  webDocs: WebDoc[];
  webDocCount: number;
  webDocRaw: number;
  webDocTotal: number | null;
  institutionalCount: number;
  institutionalOpenCount: number;
  mainGovCount: number;
  toolCount: number;
  pressCount: number;
  commercialCount: number;
  sisterCount: number;
};
export declare function buildAbove(
  webDocs: Array<Pick<WebDoc, 'host' | 'kind' | 'title' | 'stale' | 'mainGov' | 'openBy'>>,
  idx: number,
): { above: AboveDoc[]; wholeWindow: boolean };
export declare function verdicts(input: {
  rank: number | null;
  above: AboveDoc[];
  eyeOffset: number | null;
  news?: { newsWall: number; newsSameTitle: number };
}): {
  openSlots: number;
  mainGovAbove: number;
  pressAbove: null;
  sisterAbove: number;
  toolAbove: number;
  verdictT1: 'open' | 'closed';
  verdictT2: 'open' | 'closed';
  reason: string[];
};
