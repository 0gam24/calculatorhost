/**
 * D-day / 날짜 계산 — 순수 함수
 *
 * 원칙:
 * - Date.now() 금지 — UI 계층에서 'YYYY-MM-DD' 문자열로 주입
 * - UTC 기반 계산 (시차·DST 영향 제거)
 * - 일수 = Math.round((end - start) / 86400000)
 */

const MS_PER_DAY = 86_400_000;
const DAYS_PER_WEEK = 7;
const DAYS_PER_MONTH = 30.4167;   // 평균 (365.25 / 12)
const DAYS_PER_YEAR = 365.25;
const WEEKDAYS_KO = ['일', '월', '화', '수', '목', '금', '토'] as const;

export type InclusionMode = 'both' | 'start' | 'end' | 'exclude';

export interface DdayInput {
  baseDate: string;   // 기준일 (오늘)
  targetDate: string; // 목표일
}

export interface DdayResult {
  diffDays: number;          // target - base (음수 = 지남)
  label: string;             // "D-DAY" | "D-10" | "D+10"
  weeks: number;             // diffDays / 7, 소수 2자리
  months: number;            // diffDays / 30.4167, 소수 2자리
  years: number;             // diffDays / 365.25, 소수 2자리
  warnings: string[];
}

export interface DurationInput {
  startDate: string;
  endDate: string;
  inclusion: InclusionMode;
}

export interface DurationResult {
  days: number;
  weeks: number;
  months: number;
  years: number;
  warnings: string[];
}

export interface AfterNDaysInput {
  baseDate: string;
  offset: number;
}

export interface AfterNDaysResult {
  resultDate: string;  // 'YYYY-MM-DD'
  weekday: string;     // '월', '화' 등
  warnings: string[];
}

/**
 * 'YYYY-MM-DD' → UTC 자정 Date. 유효성 검사.
 */
function parseDate(str: string): Date | null {
  if (typeof str !== 'string') return null;
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(str);
  if (!match) return null;
  const [, yStr, mStr, dStr] = match;
  if (!yStr || !mStr || !dStr) return null;
  const y = Number(yStr);
  const m = Number(mStr);
  const d = Number(dStr);
  if (!Number.isFinite(y) || !Number.isFinite(m) || !Number.isFinite(d)) return null;
  if (m < 1 || m > 12 || d < 1 || d > 31) return null;
  const date = new Date(Date.UTC(y, m - 1, d));
  if (date.getUTCFullYear() !== y || date.getUTCMonth() !== m - 1 || date.getUTCDate() !== d) {
    return null; // 2월 30일 등 존재하지 않는 날짜
  }
  return date;
}

function formatDate(date: Date): string {
  const y = date.getUTCFullYear();
  const m = String(date.getUTCMonth() + 1).padStart(2, '0');
  const d = String(date.getUTCDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function getWeekdayKo(date: Date): string {
  const idx = date.getUTCDay();
  return WEEKDAYS_KO[idx] ?? '?';
}

function roundTo(value: number, digits: number): number {
  const factor = 10 ** digits;
  return Math.round(value * factor) / factor;
}

/**
 * D-day 계산 (기준일 → 목표일)
 */
export function calculateDday(input: DdayInput): DdayResult {
  const base = parseDate(input.baseDate);
  const target = parseDate(input.targetDate);
  const warnings: string[] = [];

  if (!base) warnings.push('기준일이 유효하지 않습니다 (YYYY-MM-DD).');
  if (!target) warnings.push('목표일이 유효하지 않습니다 (YYYY-MM-DD).');

  if (!base || !target) {
    return { diffDays: 0, label: '-', weeks: 0, months: 0, years: 0, warnings };
  }

  const diffDays = Math.round((target.getTime() - base.getTime()) / MS_PER_DAY);

  let label: string;
  if (diffDays === 0) label = 'D-DAY';
  else if (diffDays > 0) label = `D-${diffDays}`;
  else label = `D+${Math.abs(diffDays)}`;

  return {
    diffDays,
    label,
    weeks: roundTo(diffDays / DAYS_PER_WEEK, 2),
    months: roundTo(diffDays / DAYS_PER_MONTH, 2),
    years: roundTo(diffDays / DAYS_PER_YEAR, 2),
    warnings,
  };
}

/**
 * 두 날짜 사이 기간 계산 (양 끝 포함 여부 선택)
 */
export function calculateDuration(input: DurationInput): DurationResult {
  const start = parseDate(input.startDate);
  const end = parseDate(input.endDate);
  const warnings: string[] = [];

  if (!start) warnings.push('시작일이 유효하지 않습니다.');
  if (!end) warnings.push('종료일이 유효하지 않습니다.');

  if (!start || !end) {
    return { days: 0, weeks: 0, months: 0, years: 0, warnings };
  }

  let diff = Math.round((end.getTime() - start.getTime()) / MS_PER_DAY);
  if (diff < 0) {
    warnings.push('시작일이 종료일보다 뒤입니다. 차이를 절댓값으로 계산합니다.');
    diff = Math.abs(diff);
  }

  let days = diff;
  switch (input.inclusion) {
    case 'both':
      days = diff + 1;
      break;
    case 'start':
    case 'end':
      days = diff; // 한 쪽 포함 시 그대로
      break;
    case 'exclude':
      days = Math.max(0, diff - 1);
      break;
  }

  return {
    days,
    weeks: roundTo(days / DAYS_PER_WEEK, 2),
    months: roundTo(days / DAYS_PER_MONTH, 2),
    years: roundTo(days / DAYS_PER_YEAR, 2),
    warnings,
  };
}

/**
 * 기준일 + N일 후 (음수 가능)
 */
export function calculateAfterNDays(input: AfterNDaysInput): AfterNDaysResult {
  const base = parseDate(input.baseDate);
  const warnings: string[] = [];

  if (!base) warnings.push('기준일이 유효하지 않습니다.');
  if (!Number.isFinite(input.offset)) warnings.push('일수가 유효한 숫자가 아닙니다.');

  if (!base || !Number.isFinite(input.offset)) {
    return { resultDate: '-', weekday: '-', warnings };
  }

  const result = new Date(base.getTime() + input.offset * MS_PER_DAY);
  return {
    resultDate: formatDate(result),
    weekday: getWeekdayKo(result),
    warnings,
  };
}
