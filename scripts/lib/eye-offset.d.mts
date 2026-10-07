export interface EyeStore {
  updatedAt?: string | null;
  byQuery: Record<string, { value: number; date: string }>;
}
export declare const EYE_FILE: string;
export declare const EYE_TTL_DAYS: number;
export declare const EYE_CLOSED: number;
export declare const EYE_LABEL: Record<number, string>;
export declare function parseEyeValue(v: unknown): 1 | 2 | 3 | null;
export declare function loadEyeStore(): Promise<EyeStore>;
export declare function saveEyeStore(store: EyeStore): Promise<void>;
export declare function eyeFor(store: EyeStore, query: string, today?: string): number | null;
