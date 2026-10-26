/**
 * 연차 유급휴가 참고 계산 — 순수 함수.
 *
 * 법적 근거(2026-10-26 law.go.kr DRF 1차출처 확인):
 * - 근로기준법 §60① (1년간 80% 이상 출근자에게 15일의 유급휴가)
 *   https://www.law.go.kr/DRF/lawService.do?OC=test&target=law&ID=001872&type=XML&JO=006000
 * - 근로기준법 §60② (1년 미만 또는 1년간 80% 미만 출근자에게 1개월 개근 시 1일)
 * - 근로기준법 §60④ (3년 이상 계속근로자에게 매 2년에 1일 가산, 25일 한도)
 * - 근로기준법 §60⑦ (연차는 1년간 행사하지 않으면 소멸, 1년 미만 연차는 최초 1년의 근로가 끝날 때까지)
 * - 근로기준법 §18③ (4주 평균 1주 15시간 미만 근로자에게는 §55·§60 미적용)
 *   https://www.law.go.kr/DRF/lawService.do?OC=test&target=law&ID=001872&type=XML&JO=001800
 * - 근로기준법 §11②·시행령 §7 별표1 (상시 4명 이하 사업장 §60 적용 제외)
 *   https://www.law.go.kr/DRF/lawService.do?OC=test&target=law&ID=003058&type=XML&JO=000700
 * - 근로기준법 시행령 §9① 별표2 (단시간근로자 연차 유급휴가 시간 비례 산정)
 *   https://www.law.go.kr/DRF/lawService.do?OC=test&target=law&ID=003058&type=XML&JO=000900
 * - 대법원 2021. 10. 14. 선고 2021다227100 판결 (1년 365일 근로 후 다음 날 근로관계가 없으면
 *   §60① 15일의 연차 유급휴가는 발생하지 않는다). 월 단위 연차(§60②) 역시 1개월의 근로를
 *   마친 다음 날 발생하고 그날 근로관계가 있어야 한다(고용노동부 2021-12-16 행정해석 변경,
 *   뉴시스 2021-12-16 보도: 1.1~7.31 개근 7개월이어도 다음 날 근로관계가 없으면 6일).
 * - 대법원 2022. 9. 7. 선고 2022다245419 판결 (1년 초과 2년 이하 근로 시 최대 26일)
 *
 * 명세: docs/calculator-spec/연차.md
 * 상수: src/lib/constants/labor-rules-2026.ts
 *
 * 가정(명세 §3):
 * - 매년 출근율 80% 이상, 1년 미만은 매달 개근.
 * - 입사일 기준(회계연도 기준 X).
 * - 사용자의 §61 사용 촉진 조치나 §60⑦ 단서(귀책사유)는 판정하지 않는다.
 * - 평균임금과의 비교(통상임금 vs 평균임금)는 판정하지 않는다. 입력 hourlyWage 를 그대로 쓴다.
 *
 * ⚠️ 모든 수정은 calc-logic-verifier 통과 후.
 */

import {
  ANNUAL_LEAVE_ADDITIONAL_INTERVAL,
  ANNUAL_LEAVE_BASE_DAYS,
  ANNUAL_LEAVE_MAX_DAYS,
  FULL_TIME_DAILY_HOURS,
  FULL_TIME_WORKDAYS_PER_WEEK,
  STANDARD_WEEKLY_HOURS,
  WEEKLY_HOLIDAY_MIN_WEEKLY_HOURS,
} from '@/lib/constants/labor-rules-2026';

// ============================================
// 타입
// ============================================

export interface AnnualLeaveInput {
  /** 입사일 (YYYY-MM-DD, UTC) */
  hireDate: string;
  /** 계산 기준일 (YYYY-MM-DD): 재직 중이면 오늘, 퇴사면 마지막 근무일. 그날까지 근로관계가 있다고 본다 */
  untilDate: string;
  /** 1주 소정근로시간(4주 평균). 40 초과는 40으로 자른다(명세 §3) */
  weeklyHours: number;
  /** 상시 근로자 5명 이상 사업장 여부 */
  fivePlus: boolean;
  /** 기준일에 쓸 수 있는 연차 중 이미 쓴 날 수 */
  usedDays: number;
  /** 통상시급(원). 수당 계산 전용. 평균임금과의 비교는 판정하지 않는다 */
  hourlyWage: number;
}

export type AnnualLeaveReason = 'ok' | 'under5' | 'under15';
export type AnnualLeaveBlockKind = 'monthly' | 'annual';

export interface AnnualLeaveBlock {
  /** 'monthly': §60② 1개월 개근 1일, 'annual': §60① n년차 15+가산 일수 */
  kind: AnnualLeaveBlockKind;
  /** 몇 년차 블록인지. monthly 는 모두 1(입사 첫 해), annual 은 n(1,2,3...) */
  serviceYear: number;
  /** 발생일 (YYYY-MM-DD). 대응일이 없는 달은 다음 달 1일 */
  accruedOn: string;
  /** 발생 일수 */
  days: number;
  /** 발생 시간 = 일수 × 주 시간 × 8 ÷ 40, 1시간 미만은 1시간으로 올림 (시행령 §9 별표2 제4호 나목) */
  hours: number;
  /** 사용 기한 (YYYY-MM-DD). 1년 미만 연차는 첫 기념일 전날, n년차는 다음 기념일 전날 */
  usableUntil: string;
  /** 기준일(untilDate)에 사용 가능한가(발생 완료 & 아직 사용 기한 전) */
  usableOnUntilDate: boolean;
}

export interface AnnualLeaveResult {
  eligible: boolean;
  reason: AnnualLeaveReason;
  /** 재직일수 (hireDate ~ untilDate 양 끝 포함) */
  serviceDays: number;
  /** 꽉 찬 근속 연수 (anniversary ≤ untilDate 인 최대 n) */
  completedYears: number;
  /** 하루 소정근로시간 = weeklyHours ÷ 5 (시행령 §9 별표2 가정) */
  dailyHours: number;
  /** 발생 블록 목록(미발생분 포함, 참고용) */
  blocks: AnnualLeaveBlock[];
  /** 기준일 현재 쓸 수 있는 연차 일수 */
  availableDays: number;
  /** 기준일 현재 쓸 수 있는 연차 시간 */
  availableHours: number;
  /**
   * 미사용 연차 시간. 사용 가능 시간에서 사용 일수 × 하루 소정근로시간을 뺀 값(0 이상).
   */
  unusedHours: number;
  /**
   * 미사용 연차수당(원). 미사용 시간 × 통상시급을 원 미만 반올림한 값(Math.round).
   * 10원 미만 단수 처리나 통상·평균 비교 등 지급 기준은 판정하지 않는다.
   */
  allowance: number;
  /** 다음 발생 예정 블록. 더 이상 없으면 null */
  nextAccrual: { date: string; days: number } | null;
  /** 입사 후 기준일까지 누적 발생 일수(소멸 여부 무시) */
  totalAccruedDays: number;
}

// ============================================
// 날짜 헬퍼 (UTC, YYYY-MM-DD)
// ============================================

function parseDate(dateStr: string): Date {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
    throw new Error('날짜는 YYYY-MM-DD 형식으로 입력해 주세요.');
  }
  const [year = 0, month = 0, day = 0] = dateStr.split('-').map(Number);
  const d = new Date(Date.UTC(year, month - 1, day));
  if (
    year < 100 ||
    d.getUTCFullYear() !== year ||
    d.getUTCMonth() !== month - 1 ||
    d.getUTCDate() !== day
  ) {
    throw new Error('실제 존재하는 날짜를 입력해 주세요.');
  }
  return d;
}

function formatDate(d: Date): string {
  const y = d.getUTCFullYear();
  const m = String(d.getUTCMonth() + 1).padStart(2, '0');
  const day = String(d.getUTCDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

function addDaysUtc(d: Date, n: number): Date {
  return new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate() + n));
}

/**
 * 입사일에 months 개월을 더한 대응일을 계산한다.
 * 민법 §160 역법 기준으로, 대응일이 없는 달(예: 2월에 31일, 평년 2월에 29일)은 다음 달 1일로 넘긴다.
 * 명세 §4-2: 발생일 = 대응일, 대응일이 없으면 다음 달 1일.
 */
function addMonthsWithFallback(hire: Date, months: number): Date {
  const hireDay = hire.getUTCDate();
  const totalMonths = hire.getUTCMonth() + months;
  const targetYear = hire.getUTCFullYear() + Math.floor(totalMonths / 12);
  const targetMonth = ((totalMonths % 12) + 12) % 12;
  const lastDayOfTarget = new Date(Date.UTC(targetYear, targetMonth + 1, 0)).getUTCDate();
  if (hireDay <= lastDayOfTarget) {
    return new Date(Date.UTC(targetYear, targetMonth, hireDay));
  }
  // 다음 달 1일 (연이 바뀌어도 Date 가 자동 보정)
  return new Date(Date.UTC(targetYear, targetMonth + 1, 1));
}

function daysBetweenInclusive(a: Date, b: Date): number {
  const diff = b.getTime() - a.getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24)) + 1;
}

// ============================================
// 메인
// ============================================

/**
 * n년차 연차 일수: min(25, 15 + floor((n-1)/2)). §60①·④.
 */
function annualDaysForYear(n: number): number {
  return Math.min(
    ANNUAL_LEAVE_MAX_DAYS,
    ANNUAL_LEAVE_BASE_DAYS + Math.floor((n - 1) / ANNUAL_LEAVE_ADDITIONAL_INTERVAL),
  );
}

export function calculateAnnualLeave(input: AnnualLeaveInput): AnnualLeaveResult {
  // 1. 입력 검증
  const hire = parseDate(input.hireDate);
  const until = parseDate(input.untilDate);
  if (until.getTime() < hire.getTime()) {
    throw new RangeError('기준일(untilDate)은 입사일(hireDate) 이후여야 합니다.');
  }
  if (!Number.isFinite(input.weeklyHours) || input.weeklyHours < 0 || input.weeklyHours > 168) {
    throw new RangeError('1주 소정근로시간은 0~168시간 범위의 유한한 숫자여야 합니다.');
  }
  if (!Number.isFinite(input.usedDays) || input.usedDays < 0) {
    throw new RangeError('사용 연차 일수는 0 이상이어야 합니다.');
  }
  if (!Number.isFinite(input.hourlyWage) || input.hourlyWage < 0) {
    throw new RangeError('통상시급은 0 이상이어야 합니다.');
  }
  if (typeof input.fivePlus !== 'boolean') {
    throw new RangeError('fivePlus 는 true/false 로 입력해 주세요.');
  }

  // 명세 §3: 40 초과는 40 으로 캡
  const countedWeeklyHours = Math.min(input.weeklyHours, STANDARD_WEEKLY_HOURS);
  // 시행령 §9 별표2 가정(통상근로자 주 5일) 기준 하루 소정근로시간
  const dailyHours = countedWeeklyHours / FULL_TIME_WORKDAYS_PER_WEEK;

  // 2. 적용 제외 체크 (§11②·시행령 §7 별표1 → §18③ 순)
  let reason: AnnualLeaveReason = 'ok';
  let eligible = true;
  if (!input.fivePlus) {
    reason = 'under5';
    eligible = false;
  } else if (countedWeeklyHours < WEEKLY_HOLIDAY_MIN_WEEKLY_HOURS) {
    reason = 'under15';
    eligible = false;
  }

  // 3. 공통 정보 (적용 제외여도 서술용)
  const serviceDays = daysBetweenInclusive(hire, until);
  let completedYears = 0;
  for (let n = 1; n <= 100; n++) {
    const anni = addMonthsWithFallback(hire, 12 * n);
    if (anni.getTime() <= until.getTime()) completedYears = n;
    else break;
  }

  if (!eligible) {
    return {
      eligible: false,
      reason,
      serviceDays,
      completedYears,
      dailyHours,
      blocks: [],
      availableDays: 0,
      availableHours: 0,
      unusedHours: 0,
      allowance: 0,
      nextAccrual: null,
      totalAccruedDays: 0,
    };
  }

  // 4. 블록 생성
  // 시행령 §9 별표2 제4호 나목: 단시간근로자 연차는 시간 단위로
  // 통상근로자 일수 × 주 시간 × 8 ÷ 40 이고, 1시간 미만은 1시간으로 본다(블록마다 올림).
  // 부동소수 오차로 60.0000001 이 61 이 되지 않게 아주 작은 값을 빼고 올린다.
  const leaveHours = (days: number): number => {
    const raw = (days * countedWeeklyHours * FULL_TIME_DAILY_HOURS) / STANDARD_WEEKLY_HOURS;
    return Math.ceil(raw - 1e-9);
  };

  // 4-1. 월 연차(§60②): k=1..11. 각 블록 사용 기한은 모두 첫 기념일 전날(§60⑦).
  const firstAnniversary = addMonthsWithFallback(hire, 12);
  const monthlyUsableUntilDate = addDaysUtc(firstAnniversary, -1);
  const blocks: AnnualLeaveBlock[] = [];
  for (let k = 1; k <= 11; k++) {
    const accruedOn = addMonthsWithFallback(hire, k);
    const accrued = accruedOn.getTime() <= until.getTime();
    const usable = accrued && until.getTime() <= monthlyUsableUntilDate.getTime();
    blocks.push({
      kind: 'monthly',
      serviceYear: 1,
      accruedOn: formatDate(accruedOn),
      days: 1,
      hours: leaveHours(1),
      usableUntil: formatDate(monthlyUsableUntilDate),
      usableOnUntilDate: usable,
    });
  }

  // 4-2. 연차(§60①·④): n=1... 첫 미발생 블록까지 포함(nextAccrual 후보).
  for (let n = 1; n <= 100; n++) {
    const accruedOn = addMonthsWithFallback(hire, 12 * n);
    const days = annualDaysForYear(n);
    const nextAnniversary = addMonthsWithFallback(hire, 12 * (n + 1));
    const usableUntilDate = addDaysUtc(nextAnniversary, -1);
    const accrued = accruedOn.getTime() <= until.getTime();
    const usable = accrued && until.getTime() <= usableUntilDate.getTime();
    blocks.push({
      kind: 'annual',
      serviceYear: n,
      accruedOn: formatDate(accruedOn),
      days,
      hours: leaveHours(days),
      usableUntil: formatDate(usableUntilDate),
      usableOnUntilDate: usable,
    });
    if (!accrued) break;
  }

  // 5. 집계
  let availableDays = 0;
  let availableHours = 0;
  let totalAccruedDays = 0;
  for (const b of blocks) {
    const accruedOnDate = parseDate(b.accruedOn);
    if (accruedOnDate.getTime() <= until.getTime()) totalAccruedDays += b.days;
    if (b.usableOnUntilDate) {
      availableDays += b.days;
      availableHours += b.hours;
    }
  }

  // 6. 미사용 수당 — §60⑤ 통상·평균임금 중 "취업규칙·단체협약 또는 그 노사의 관행" 에 따른 금액을
  //    지급하므로, 여기서는 입력된 통상시급을 그대로 쓴다.
  const usedHours = input.usedDays * dailyHours;
  const unusedHours = Math.max(0, availableHours - usedHours);
  // 원 미만 반올림 (Math.round). 10원 단수 절사 등 사용자 사업장 관행은 반영하지 않는다.
  const allowance = Math.round(unusedHours * input.hourlyWage);

  // 7. 다음 발생 예정 — 블록 중 accruedOn > until 인 것들의 최소 accruedOn
  let nextAccrual: AnnualLeaveResult['nextAccrual'] = null;
  for (const b of blocks) {
    if (parseDate(b.accruedOn).getTime() > until.getTime()) {
      if (!nextAccrual || b.accruedOn < nextAccrual.date) {
        nextAccrual = { date: b.accruedOn, days: b.days };
      }
    }
  }

  return {
    eligible: true,
    reason: 'ok',
    serviceDays,
    completedYears,
    dailyHours,
    blocks,
    availableDays,
    availableHours,
    unusedHours,
    allowance,
    nextAccrual,
    totalAccruedDays,
  };
}
