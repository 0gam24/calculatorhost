export declare const SITE: string;
export declare const HOST: string;
export declare const MAX_URLS: number;
export declare function urlsFromChangedFiles(files: string[] | null | undefined): string[];
export declare function isValidKey(key: unknown): boolean;
export declare function buildPayload(input: { key: string; urls: string[] }): {
  host: string;
  key: string;
  keyLocation: string;
  urlList: string[];
};
