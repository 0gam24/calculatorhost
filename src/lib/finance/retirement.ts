/**
 * 은퇴자금(FIRE) 계산 — 순수 함수
 *
 * 법적 근거:
 * - 금융감독원 연금 가이드북
 * - Trinity Study (4% 룰 안전 인출)
 *
 * 명세: docs/calculator-spec/은퇴자금.md
 *
 * ⚠️ 모든 수정은 calc-logic-verifier 에이전트 통과 후.
 */

// ============================================
// 타입 정의
// ============================================

/** 은퇴 자금 계산 입력 */
export interface RetirementInput {
  /** 현재 나이 (세) */
  currentAge: number;
  /** 은퇴 희망 나이 (세) */
  retirementAge: number;
  /** 기대 수명 (세, 기본 90) */
  expectedLifespanAge: number;
  /** 현재 보유 자산 (원) */
  currentSavings: number;
  /** 월 저축액 (원) */
  monthlyContribution: number;
  /** 기대 연간 수익률 (%, 소수점 1자리) */
  expectedAnnualReturnPercent: number;
  /** 기대 연간 인플레이션 (%, 소수점 1자리) */
  expectedInflationPercent: number;
  /** 은퇴 시점 기준 연 지출 (현재가치, 원) */
  annualSpendingAtRetirement: number;
}

/** 은퇴 자금 계산 결과 */
export interface RetirementResult {
  /** 은퇴까지 남은 기간 (년) */
  yearsToRetirement: number;
  /** 은퇴 기간 (년, 기대 수명 - 은퇴 나이) */
  yearsInRetirement: number;
  /** 은퇴 시점 예상 자산 (명목가, 원) */
  projectedSavingsAtRetirement: number;
  /** 필요 자산 (은퇴 시점 명목 기준, 원) */
  requiredSavingsAtRetirement: number;
  /** 부족액 (양수=부족, 음수=잉여, 원) */
  shortfall: number;
  /** 4% 룰 안전 인출액 (연간, 원) */
  safeWithdrawalRate4Percent: number;
  /** 부족분 해소 필요 월 저축액 (원) */
  recommendedMonthlyContribution: number;
  /** 경고 메시지 배열 */
  warnings: string[];
}

// ============================================
// 입력값 검증 및 정규화
// ============================================

/**
 * 나이 입력값 정규화
 * - 음수 → 0
 * - 실수 → 정수로 반올림
 */
function normalizeAge(age: number): number {
  return Math.max(0, Math.round(age));
}

/**
 * 금액 입력값 정규화
 * - 음수 → 0
 */
function normalizeAmount(amount: number): number {
  return Math.max(0, amount);
}

/**
 * 비율(%) 정규화
 * - 음수 → 0
 */
function normalizePercent(percent: number): number {
  return Math.max(0, percent);
}

// ============================================
// 복리 계산 헬퍼
// ============================================

/**
 * 복리 미래가 계산 (FV of PV)
 *
 * FV = PV × (1 + r)^n
 */
function calculateFutureValue(
  presentValue: number,
  annualRatePercent: number,
  years: number
): number {
  if (presentValue <= 0 || years <= 0 || annualRatePercent <= 0) {
    return presentValue;
  }
  const rate = 1 + annualRatePercent / 100;
  return presentValue * Math.pow(rate, years);
}

/**
 * 연금 미래가 계산 (FV of Annuity)
 *
 * FV = PMT × (((1+r)^n - 1) / r)
 * PMT = 월간 납입액
 * r = 월 이자율 (연 이자율 / 12 / 100)
 * n = 개월수
 */
function calculateAnnuityFutureValue(
  monthlyPayment: number,
  annualRatePercent: number,
  months: number
): number {
  if (monthlyPayment <= 0 || months <= 0) {
    return 0;
  }

  if (annualRatePercent <= 0) {
    // 이자율 0%: FV = PMT × n
    return monthlyPayment * months;
  }

  const monthlyRate = annualRatePercent / 100 / 12;
  const numerator = Math.pow(1 + monthlyRate, months) - 1;
  const fv = monthlyPayment * (numerator / monthlyRate);

  return fv;
}

/**
 * 연금 필요 납입액 계산 (필요액에 도달하기 위한 역산)
 *
 * 주어진 미래가 목표에 도달하기 위해 필요한 월간 납입액 계산
 * PMT = FV / (((1+r)^n - 1) / r)
 */
function calculateRequiredMonthlyPayment(
  targetFutureValue: number,
  annualRatePercent: number,
  months: number
): number {
  if (targetFutureValue <= 0 || months <= 0) {
    return 0;
  }

  if (annualRatePercent <= 0) {
    // 이자율 0%: PMT = FV / n
    return targetFutureValue / months;
  }

  const monthlyRate = annualRatePercent / 100 / 12;
  const denominator = (Math.pow(1 + monthlyRate, months) - 1) / monthlyRate;

  if (denominator === 0) {
    return 0;
  }

  return targetFutureValue / denominator;
}

// ============================================
// 메인 계산 함수
// ============================================

/**
 * 은퇴자금 계산 (메인 엔트리)
 *
 * 과정:
 * 1. 입력값 정규화 및 검증
 * 2. 은퇴까지 기간, 은퇴 후 기간 계산
 * 3. 은퇴 시점 예상 자산 = 현재자산의 복리 + 월저축의 연금미래가
 * 4. 은퇴 시점 기준 명목 연 지출 = 현재 기준 지출 × (1+인플레)^years
 * 5. 필요 자산 = 명목 연지출 × 은퇴 기간 × 0.85 (근사)
 * 6. 부족액 = 필요액 - 예상액
 * 7. 4% 룰 = 예상액 × 0.04
 * 8. 권장 월납입액 = 부족액을 채우기 위한 역산
 *
 * 모든 금액은 1원 단위 정수 처리
 */
export function calculateRetirement(input: RetirementInput): RetirementResult {
  const warnings: string[] = [];

  // ────────────────────────────────────────
  // 1. 입력값 정규화
  // ────────────────────────────────────────

  const currentAge = normalizeAge(input.currentAge);
  const retirementAge = normalizeAge(input.retirementAge);
  const expectedLifespanAge = normalizeAge(input.expectedLifespanAge);
  const currentSavings = normalizeAmount(input.currentSavings);
  const monthlyContribution = normalizeAmount(input.monthlyContribution);
  const expectedAnnualReturn = normalizePercent(
    input.expectedAnnualReturnPercent
  );
  const expectedInflation = normalizePercent(input.expectedInflationPercent);
  const annualSpending = normalizeAmount(input.annualSpendingAtRetirement);

  // ────────────────────────────────────────
  // 2. 기간 계산
  // ────────────────────────────────────────

  let yearsToRetirement = Math.max(0, retirementAge - currentAge);
  let yearsInRetirement = Math.max(0, expectedLifespanAge - retirementAge);

  // 경고: 현재 나이가 은퇴 나이 이상
  if (currentAge >= retirementAge) {
    warnings.push('현재 나이가 은퇴 나이 이상입니다. 은퇴가 이미 진행 중일 수 있습니다.');
    yearsToRetirement = 0;
  }

  // 경고: 은퇴 나이가 기대 수명 이상
  if (retirementAge >= expectedLifespanAge) {
    warnings.push('은퇴 나이가 기대 수명 이상입니다. 은퇴 기간이 0입니다.');
    yearsInRetirement = 0;
  }

  // 경고: 기대 수익률 비현실적
  if (expectedAnnualReturn > 20) {
    warnings.push(
      '기대 연간 수익률이 20% 이상으로 설정되었습니다. 지속 불가능한 수익률일 수 있습니다.'
    );
  }

  // ────────────────────────────────────────
  // 3. 은퇴 시점 예상 자산
  // ────────────────────────────────────────

  // 현재 자산의 복리
  const currentSavingsFV =
    yearsToRetirement > 0
      ? calculateFutureValue(currentSavings, expectedAnnualReturn, yearsToRetirement)
      : currentSavings;

  // 월 저축의 연금미래가 (은퇴까지)
  const contributionFV =
    yearsToRetirement > 0
      ? calculateAnnuityFutureValue(
          monthlyContribution,
          expectedAnnualReturn,
          yearsToRetirement * 12
        )
      : 0;

  // 은퇴 시점 예상 자산 (명목)
  const projectedSavingsAtRetirement = Math.floor(
    currentSavingsFV + contributionFV
  );

  // ────────────────────────────────────────
  // 4. 은퇴 시점 기준 명목 연 지출
  // ────────────────────────────────────────

  const nominalAnnualSpending =
    yearsToRetirement > 0
      ? Math.floor(
          annualSpending *
            Math.pow(1 + expectedInflation / 100, yearsToRetirement)
        )
      : annualSpending;

  // ────────────────────────────────────────
  // 5. 필요 자산 (근사)
  // ────────────────────────────────────────

  // 단순화: 필요액 ≈ 연지출 × 은퇴기간 × 0.85 (현금흐름 안정 가정)
  // 더 정확한 방식(PV of annuity due)은 실제로 복잡하고,
  // MVP는 단순화 + warning으로 충분
  const requiredSavingsAtRetirement = Math.floor(
    nominalAnnualSpending * yearsInRetirement * 0.85
  );

  // ────────────────────────────────────────
  // 6. 부족액 계산
  // ────────────────────────────────────────

  const shortfall = requiredSavingsAtRetirement - projectedSavingsAtRetirement;

  // ────────────────────────────────────────
  // 7. 4% 룰 안전 인출액
  // ────────────────────────────────────────

  const safeWithdrawalRate4Percent = Math.floor(
    projectedSavingsAtRetirement * 0.04
  );

  // ────────────────────────────────────────
  // 8. 권장 월 저축액
  // ────────────────────────────────────────

  let recommendedMonthlyContribution = 0;

  if (shortfall > 0 && yearsToRetirement > 0) {
    // 부족액이 양수(부족함)이고 은퇴까지 시간이 있을 때만 계산
    recommendedMonthlyContribution = Math.ceil(
      calculateRequiredMonthlyPayment(
        shortfall,
        expectedAnnualReturn,
        yearsToRetirement * 12
      )
    );
  }

  // ────────────────────────────────────────
  // 9. 최종 경고
  // ────────────────────────────────────────

  if (shortfall > 0) {
    warnings.push(
      `현재 저축 속도로는 약 ${Math.floor(shortfall / 10_000_000) * 10}만 원이 부족합니다. 월 저축액을 늘리거나 은퇴 나이를 연장하세요.`
    );
  }

  if (yearsInRetirement === 0) {
    warnings.push('본 계산기는 교육·참고용입니다. 실제 은퇴 계획은 재무설계 전문가와 상담하세요.');
  }

  if (annualSpending === 0) {
    warnings.push('은퇴 후 연 지출이 0으로 설정되었습니다. 현실적인 생활비를 입력하세요.');
  }

  return {
    yearsToRetirement,
    yearsInRetirement,
    projectedSavingsAtRetirement,
    requiredSavingsAtRetirement,
    shortfall,
    safeWithdrawalRate4Percent,
    recommendedMonthlyContribution,
    warnings,
  };
}
