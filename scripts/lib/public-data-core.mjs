/**
 * sync-public-data 의 순수 헬퍼 (shebang 없는 core, vitest 로 검증).
 *
 * 2026-10-14: ECOS·KOSIS 조회 기간이 202501~202604 로 고정돼 있고 응답의 첫 행(가장 오래된 달)을
 * 골라, "live" 라고 적힌 기준금리가 2025-01 값으로 굳어 있던 버그를 고친다.
 */

/** KST 기준 이번 달(end)과 monthsBack 개월 전(start), 'YYYYMM' */
export function monthRange(now, monthsBack) {
  const kst = new Date(now.getTime() + 9 * 3600 * 1000);
  const y = kst.getUTCFullYear();
  const m = kst.getUTCMonth(); // 0-based
  const fmt = (yy, mm) => `${yy}${String(mm + 1).padStart(2, '0')}`;
  const startIndex = y * 12 + m - monthsBack;
  return { start: fmt(Math.floor(startIndex / 12), startIndex % 12), end: fmt(y, m) };
}

/** 기간 필드(예: ECOS TIME, KOSIS PRD_DE) 값이 가장 큰 행. 없으면 null */
export function latestByPeriod(rows, key) {
  if (!Array.isArray(rows)) return null;
  let best = null;
  for (const row of rows) {
    const period = row?.[key];
    if (period == null || period === '') continue;
    if (best == null || String(period) > String(best[key])) best = row;
  }
  return best;
}
