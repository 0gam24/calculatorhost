export interface ExposureInput {
  track?: string;
  serp?: Record<string, unknown> | null;
  recent7?: number | null;
  born?: boolean;
  inWindow?: boolean;
  inbound7d?: number | null;
  condition?: string;
  [k: string]: unknown;
}
export interface Exposure {
  score: number | null;
  label: string;
  reasons: string[];
}
export declare function exposureOf(item: ExposureInput): Exposure;
