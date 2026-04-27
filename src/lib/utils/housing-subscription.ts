/**
 * 청약가점 계산 — 순수 함수
 *
 * 법적 근거:
 * - 주택공급에 관한 규칙 §28 (가점제 세부 기준)
 * - 국토교통부 고시 (연도별 개정)
 *
 * 명세: docs/calculator-spec/청약가점.md
 *
 * ⚠️ 모든 수정은 calc-logic-verifier 에이전트 통과 후.
 */

// ============================================
// 타입 정의
// ============================================

/** 청약가점 입력 */
export interface HousingSubscriptionInput {
  /** 무주택 기간 (년, 소수점 가능) */
  noHomeYears: number;
  /** 부양가족 수 (명) */
  dependents: number;
  /** 청약통장 가입 기간 (년, 소수점 가능) */
  accountYears: number;
}

/** 청약가점 결과 */
export interface HousingSubscriptionResult {
  /** 무주택 기간 점수 (0~32점) */
  noHomeScore: number;
  /** 부양가족 수 점수 (5~35점) */
  dependentsScore: number;
  /** 청약통장 가입 기간 점수 (1~17점) */
  accountScore: number;
  /** 합계 점수 (6~84점) */
  totalScore: number;
  /** 경고 메시지 배열 */
  warnings: string[];
}

// ============================================
// 점수 계산 헬퍼 함수
// ============================================

/**
 * 무주택 기간 점수 계산
 *
 * 가점 기준표 (주택공급규칙 §28①):
 * - 1년 미만: 2점
 * - 1년 이상 2년 미만: 4점
 * - 2년 이상 3년 미만: 6점
 * ...
 * - 15년 이상: 32점
 *
 * 공식: score = 2 + Math.floor(years) × 2 (최대 32점)
 * 주의: 1년 미만이면 2점 (0.5년도 2점)
 */
function calculateNoHomeScore(years: number): number {
  if (years < 1) {
    return 2;
  }
  // 1년 이상: 2 + (년수-1)×2 + 2 = 2 + 년수×2
  // 즉: 1년→4, 2년→6, ..., 15년→32
  const score = 2 + Math.floor(years) * 2;
  return Math.min(32, score);
}

/**
 * 부양가족 수 점수 계산
 *
 * 가점 기준표 (주택공급규칙 §28②):
 * - 0명: 5점
 * - 1명: 10점
 * - 2명: 15점
 * - 3명: 20점
 * - 4명: 25점
 * - 5명 이상: 35점
 *
 * 공식: score = 5 + dependents × 5 (최대 35점)
 */
function calculateDependentsScore(dependents: number): number {
  if (dependents < 0) {
    return 5;
  }
  if (dependents >= 6) {
    return 35;
  }
  const score = 5 + Math.max(0, dependents) * 5;
  return Math.min(35, score);
}

/**
 * 청약통장 가입 기간 점수 계산
 *
 * 가점 기준표 (주택공급규칙 §28③):
 * - 6개월 미만: 1점
 * - 6개월 이상 1년 미만: 2점
 * - 1년 이상 2년 미만: 3점
 * - 2년 이상 3년 미만: 4점
 * ...
 * - 15년 이상: 17점
 *
 * 공식:
 *   years < 0.5 → 1점
 *   0.5 ≤ years < 1 → 2점
 *   1 ≤ years → 2 + Math.floor(years) (최대 17점)
 *
 * 즉:
 *   - 0.3년(약 4개월) → 1점
 *   - 0.7년(약 8개월) → 2점
 *   - 1년 → 3점 (2 + 1)
 *   - 2년 → 4점 (2 + 2)
 *   - 15년 → 17점 (2 + 15)
 */
function calculateAccountScore(years: number): number {
  if (years < 0.5) {
    return 1;
  }
  if (years < 1) {
    return 2;
  }
  const score = 2 + Math.floor(years);
  return Math.min(17, score);
}

// ============================================
// 메인 계산 함수
// ============================================

/**
 * 청약가점 계산 (메인 엔트리)
 *
 * 입력값 검증:
 * - noHomeYears < 0: 0으로 처리 + 경고
 * - dependents < 0: 0으로 처리 + 경고
 * - accountYears < 0: 0으로 처리 + 경고
 *
 * 반올림: 정수 점수만 (소수점 불가)
 */
export function calculateHousingSubscriptionScore(
  input: HousingSubscriptionInput
): HousingSubscriptionResult {
  const warnings: string[] = [];

  // 입력값 검증 및 보정
  let noHomeYears = input.noHomeYears;
  let dependents = input.dependents;
  let accountYears = input.accountYears;

  if (noHomeYears < 0) {
    warnings.push('무주택 기간은 0 이상이어야 합니다');
    noHomeYears = 0;
  }

  if (dependents < 0) {
    warnings.push('부양가족 수는 0 이상이어야 합니다');
    dependents = 0;
  }

  if (accountYears < 0) {
    warnings.push('청약통장 가입 기간은 0 이상이어야 합니다');
    accountYears = 0;
  }

  // 각 항목별 점수 계산
  const noHomeScore = calculateNoHomeScore(noHomeYears);
  const dependentsScore = calculateDependentsScore(Math.round(dependents));
  const accountScore = calculateAccountScore(accountYears);

  // 합계
  const totalScore = noHomeScore + dependentsScore + accountScore;

  return {
    noHomeScore,
    dependentsScore,
    accountScore,
    totalScore,
    warnings,
  };
}
