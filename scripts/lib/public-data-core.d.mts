export declare function monthRange(now: Date, monthsBack: number): { start: string; end: string };
export declare function latestByPeriod<T extends Record<string, unknown>>(
  rows: T[] | null | undefined,
  key: string,
): T | null;
