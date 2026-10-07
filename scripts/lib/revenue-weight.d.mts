export interface RevenueGroup {
  key: string;
  label: string;
  weight: number;
  re: RegExp;
}
export interface Money {
  rpmUsd?: Record<string, number>;
  pvPerVisitor?: number;
  [k: string]: unknown;
}
export declare const VISITORS_PER_POINT: number;
export declare const REVENUE_GROUPS: RevenueGroup[];
export declare function revenueOf(item: { query?: string }): {
  key: string;
  label: string;
  weight: number;
  tag: string;
};
export declare function usdPerDay(item: { query?: string; recent7?: number | null }, money: Money | null | undefined): number | null;
export declare function valueOrder(
  a: { query?: string; exposure?: { score: number | null } | null },
  b: { query?: string; exposure?: { score: number | null } | null },
): number;
