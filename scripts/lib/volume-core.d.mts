export declare const BENCHMARK: string;
export declare const GROUP_SIZE: number;
export declare const EVERGREEN_FLOOR: number;
export declare const PEAK_FLOOR: number;
export declare const NOISE_FLOOR: number;
export declare const WAVE_RATIO: number;
export declare function avg(a: number[]): number;
export declare function chunkTerms(terms: string[], groupSize?: number): string[][];
export declare function alignToAxis(pts: { period: string; ratio: number }[], axis: string[]): number[];
export declare function recentRow(
  vals: number[],
  base: number,
): {
  recentRelative: number;
  relative: number;
  trend: number | null;
  zeroDays: number;
  window: number;
  firstNonZeroIndex: number;
  days: number;
  born: boolean;
};
export interface SeasonResult {
  peakMonth: number;
  peakRelative: number;
  monthsToPeak: number;
  troughRelative: number;
  lastYearSameMonth: number | null;
  peakOverNow: number | null;
  flat: boolean;
  months: number;
}
export declare function analyseSeason(
  points: { period: string; ratio: number }[],
  baseAvg: number,
  nowMonth: number,
): SeasonResult;
export declare function seasonVerdict(r: Partial<SeasonResult> & {
  relative?: number;
  inProgressWave?: boolean | null;
  waveRatio?: number | null;
}): { code: 'wave' | 'evergreen' | 'thin' | 'none' | 'tiny-peak' | 'landgrab' | 'wait'; label: string };
