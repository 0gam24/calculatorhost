/**
 * 대출 상환 계산 — 순수 함수
 *
 * 법적 근거:
 * - 금융감독원 대출 상환 방식 표준 공식
 * - 상법 §54
 *
 * 명세: docs/calculator-spec/대출이자.md
 *
 * ⚠️ 모든 수정은 calc-logic-verifier 에이전트 통과 후.
 */

// ============================================
// 타입 정의
// ============================================

export type RepaymentType = 'amortization' | 'principal-equal' | 'bullet';
export type TermUnit = 'months' | 'years';

export interface LoanInput {
  /** 대출원금 (원) */
  principal: number;
  /** 연 이자율 (%) — 소수점 2자리 이하 */
  annualRate: number;
  /** 대출 기간 수치 */
  term: number;
  /** 기간 단위 (개월/년) */
  termUnit: TermUnit;
  /** 상환 방식 */
  repayment: RepaymentType;
  /** 거치 기간 (개월) — 선택, 기본 0 */
  graceMonths?: number;
}

export interface ScheduleRow {
  /** 상환 개월 (1부터 시작) */
  month: number;
  /** 해당 월 원금 상환액 */
  principal: number;
  /** 해당 월 이자 상환액 */
  interest: number;
  /** 해당 월 총 상환액 */
  totalPayment: number;
  /** 상환 후 남은 잔금 */
  balance: number;
}

export interface LoanResult {
  /** 상환 방식 */
  repaymentType: RepaymentType;
  /** 총 상환 개월수 (거치 포함) */
  totalMonths: number;
  /** 월 이자율 (소수, 예: 0.003 = 0.3%) */
  monthlyRate: number;
  /** 첫 달 상환액 (모든 방식 공통) */
  firstMonthPayment: number;
  /** 마지막 달 상환액 (모든 방식 공통) */
  lastMonthPayment: number;
  /** 전 기간 총 이자 */
  totalInterest: number;
  /** 원금 + 총 이자 */
  totalPayment: number;
  /** 월별 상환 스케줄 */
  schedule: ScheduleRow[];
  /** 거치기간 총 이자 (거치 있을 때) */
  graceInterestTotal?: number;
}

// ============================================
// 정규화 및 검증
// ============================================

/**
 * 입력값을 정규화: term/termUnit → totalMonths, annualRate → monthlyRate
 */
function normalizeLoanInput(input: LoanInput): {
  totalMonths: number;
  mainMonths: number;
  monthlyRate: number;
  graceMonths: number;
} {
  // 기간을 개월수로 변환
  const totalMonths =
    input.termUnit === 'years' ? input.term * 12 : Math.round(input.term);

  // 거치 기간 (기본 0)
  const graceMonths = input.graceMonths ?? 0;

  // 거치 이후 실제 상환 기간
  const mainMonths = totalMonths - graceMonths;

  // 월 이자율 (연이자율 / 12 / 100)
  const monthlyRate = input.annualRate / 12 / 100;

  return { totalMonths, mainMonths, monthlyRate, graceMonths };
}

// ============================================
// 상환 스케줄 빌더
// ============================================

/**
 * 원리금균등상환 스케줄 생성
 * 월상환액 = P * r * (1+r)^n / ((1+r)^n - 1)
 * 0% 이자 엣지 케이스: 월상환액 = P / n
 */
function buildAmortizationSchedule(
  principal: number,
  monthlyRate: number,
  months: number
): ScheduleRow[] {
  const schedule: ScheduleRow[] = [];

  if (principal === 0 || months === 0) {
    return schedule;
  }

  let monthlyPayment: number;

  if (monthlyRate === 0) {
    // 0% 이자: 월상환액 = 원금 / 개월수
    monthlyPayment = Math.round(principal / months);
  } else {
    // 일반 공식
    const numerator = monthlyRate * Math.pow(1 + monthlyRate, months);
    const denominator = Math.pow(1 + monthlyRate, months) - 1;
    monthlyPayment = Math.round((principal * numerator) / denominator);
  }

  let balance = principal;

  for (let month = 1; month <= months; month++) {
    const interest = Math.round(balance * monthlyRate);
    let principalPayment = monthlyPayment - interest;

    // 마지막 달: 반올림 오차 보정
    if (month === months) {
      principalPayment = balance;
    }

    const totalPayment = principalPayment + interest;
    balance -= principalPayment;

    // 반올림 오차로 음수가 될 수 있으니 0으로 보정
    if (balance < 0) {
      balance = 0;
    }

    schedule.push({
      month,
      principal: principalPayment,
      interest,
      totalPayment,
      balance,
    });
  }

  return schedule;
}

/**
 * 원금균등상환 스케줄 생성
 * 매월 원금 = P / n (고정)
 * 매월 이자 = 잔금 × r (점감)
 */
function buildPrincipalEqualSchedule(
  principal: number,
  monthlyRate: number,
  months: number
): ScheduleRow[] {
  const schedule: ScheduleRow[] = [];

  if (principal === 0 || months === 0) {
    return schedule;
  }

  // 매월 원금 상환액 (기본값)
  const monthlyPrincipal = Math.floor(principal / months);

  let balance = principal;

  for (let month = 1; month <= months; month++) {
    const interest = Math.round(balance * monthlyRate);

    // 마지막 달: 나머지 원금 보정
    const principalPayment =
      month === months ? balance : monthlyPrincipal;

    const totalPayment = principalPayment + interest;
    balance -= principalPayment;

    if (balance < 0) {
      balance = 0;
    }

    schedule.push({
      month,
      principal: principalPayment,
      interest,
      totalPayment,
      balance,
    });
  }

  return schedule;
}

/**
 * 만기일시상환 스케줄 생성
 * 매월: 이자만 = P × r
 * 마지막 달: 이자 + 원금 전액
 */
function buildBulletSchedule(
  principal: number,
  monthlyRate: number,
  months: number
): ScheduleRow[] {
  const schedule: ScheduleRow[] = [];

  if (principal === 0 || months === 0) {
    return schedule;
  }

  const monthlyInterest = Math.round(principal * monthlyRate);

  for (let month = 1; month <= months; month++) {
    const interest = monthlyInterest;
    const principalPayment = month === months ? principal : 0;
    const totalPayment = principalPayment + interest;
    const balance = month === months ? 0 : principal;

    schedule.push({
      month,
      principal: principalPayment,
      interest,
      totalPayment,
      balance,
    });
  }

  return schedule;
}

// ============================================
// 거치 기간 처리
// ============================================

/**
 * 거치 기간을 스케줄 앞에 추가
 * 거치 동안: 이자만 납부, 원금 = 0, 잔금 = 초기 원금 유지
 * 거치 이후: mainScheduleBuilder 적용
 */
function applyGracePeriod(
  principal: number,
  monthlyRate: number,
  graceMonths: number,
  mainMonths: number,
  mainScheduleBuilder: (
    principal: number,
    monthlyRate: number,
    months: number
  ) => ScheduleRow[]
): ScheduleRow[] {
  const schedule: ScheduleRow[] = [];

  // 거치 기간 스케줄 추가
  const monthlyGraceInterest = Math.round(principal * monthlyRate);

  for (let month = 1; month <= graceMonths; month++) {
    schedule.push({
      month,
      principal: 0,
      interest: monthlyGraceInterest,
      totalPayment: monthlyGraceInterest,
      balance: principal, // 원금은 상환하지 않음
    });
  }

  // 거치 이후 메인 스케줄 생성 및 month 번호 조정
  const mainSchedule = mainScheduleBuilder(principal, monthlyRate, mainMonths);

  for (const row of mainSchedule) {
    schedule.push({
      ...row,
      month: graceMonths + row.month, // month 번호 조정
    });
  }

  return schedule;
}

// ============================================
// 메인 계산 함수
// ============================================

/**
 * 대출 상환 계산 (메인 엔트리)
 *
 * 거치 기간: term 에 포함되며, 거치 동안 이자만 납부
 */
export function calculateLoan(input: LoanInput): LoanResult {
  // ========== 입력값 검증 ==========
  if (input.principal <= 0) {
    throw new Error('대출원금은 0보다 커야 합니다');
  }
  if (input.annualRate < 0) {
    throw new Error('연 이자율은 0 이상이어야 합니다');
  }
  if (input.term <= 0) {
    throw new Error('대출 기간은 0보다 커야 합니다');
  }

  // ========== 정규화 ==========
  const { totalMonths, mainMonths, monthlyRate, graceMonths } =
    normalizeLoanInput(input);

  if (graceMonths < 0 || graceMonths > totalMonths) {
    throw new Error('거치 기간은 0 이상 총 기간 이하여야 합니다');
  }

  // ========== 스케줄 생성 ==========
  let schedule: ScheduleRow[] = [];

  if (graceMonths > 0) {
    // 거치 기간 있음
    const schedulerBuilder = (p: number, r: number, m: number) => {
      switch (input.repayment) {
        case 'amortization':
          return buildAmortizationSchedule(p, r, m);
        case 'principal-equal':
          return buildPrincipalEqualSchedule(p, r, m);
        case 'bullet':
          return buildBulletSchedule(p, r, m);
      }
    };

    schedule = applyGracePeriod(
      input.principal,
      monthlyRate,
      graceMonths,
      mainMonths,
      schedulerBuilder
    );
  } else {
    // 거치 기간 없음
    switch (input.repayment) {
      case 'amortization':
        schedule = buildAmortizationSchedule(
          input.principal,
          monthlyRate,
          totalMonths
        );
        break;
      case 'principal-equal':
        schedule = buildPrincipalEqualSchedule(
          input.principal,
          monthlyRate,
          totalMonths
        );
        break;
      case 'bullet':
        schedule = buildBulletSchedule(
          input.principal,
          monthlyRate,
          totalMonths
        );
        break;
    }
  }

  // ========== 결과 계산 ==========
  let totalInterest = 0;
  let totalPaidAmount = 0;

  for (const row of schedule) {
    totalInterest += row.interest;
    totalPaidAmount += row.totalPayment;
  }

  const firstPayment =
    schedule.length > 0 ? schedule[0]!.totalPayment : 0;
  const lastPayment =
    schedule.length > 0 ? schedule[schedule.length - 1]!.totalPayment : 0;

  // 거치기간 이자 계산
  let graceInterestTotal: number | undefined;
  if (graceMonths > 0) {
    graceInterestTotal = 0;
    for (let i = 0; i < Math.min(graceMonths, schedule.length); i++) {
      graceInterestTotal += schedule[i]!.interest;
    }
  }

  return {
    repaymentType: input.repayment,
    totalMonths,
    monthlyRate,
    firstMonthPayment: firstPayment,
    lastMonthPayment: lastPayment,
    totalInterest,
    totalPayment: totalPaidAmount,
    schedule,
    graceInterestTotal,
  };
}
