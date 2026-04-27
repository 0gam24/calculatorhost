/**
 * 자녀장려금 계산 — 순수 함수
 *
 * 법적 근거:
 * - 조세특례제한법 §100의3
 * - 2026년 세율 기준 (자녀 1인당 연 100만원)
 *
 * 명세: docs/calculator-spec/자녀장려금.md
 *
 * ⚠️ 모든 수정은 calc-logic-verifier 에이전트 통과 후.
 */

import {
  CHILD_TAX_BENEFIT_PER_CHILD,
  CHILD_TAX_BENEFIT_INCOME_CAP,
  CHILD_TAX_BENEFIT_INCOME_PHASE_OUT_START,
} from '@/lib/constants/tax-rates-2026';

// ============================================
// 타입 정의
// ============================================

/** 가구 유형 */
export type HouseholdType = 'singleEarner' | 'dualEarner' | 'single';

/** 자녀장려금 계산 입력 */
export interface ChildTaxCreditInput {
  /** 가구 유형: singleEarner(홑벌이) / dualEarner(맞벌이) / single(단독, 비해당) */
  householdType: HouseholdType;
  /** 연 총소득 (원) */
  totalAnnualIncome: number;
  /** 18세 미만 자녀 수 */
  childCount: number;
  /** 재산 2.4억 미만 여부 */
  passesAssetTest: boolean;
}

/** 자녀장려금 계산 결과 */
export interface ChildTaxCreditResult {
  /** 해당 자녀 수 */
  eligibleChildCount: number;
  /** 감액 전 총 지급액 (자녀수 × 100만) */
  grossPayment: number;
  /** 감액률 (0~1) */
  reductionRate: number;
  /** 최종 지급액 (원) */
  finalPayment: number;
  /** 경고 메시지 배열 */
  warnings: string[];
}

// ============================================
// 메인 계산 함수
// ============================================

/**
 * 자녀장려금 계산
 *
 * 로직:
 * 1. 가구 유형 검증: single → 0 (단독은 근로장려금 대상)
 * 2. 자산 검증: passesAssetTest false → 0
 * 3. 자녀 검증: childCount <= 0 → 0
 * 4. 소득 기준:
 *    - <= 3600만: 100% 지급 (자녀당 100만)
 *    - > 4300만: 0% (지급 불가)
 *    - 3600만 < 소득 < 4300만: 선형 감액
 *      감액률 = (소득 - 3600만) / 700만
 *      지급액 = 자녀수 × 100만 × (1 - 감액률)
 * 5. 반올림: 10원 단위 절사
 */
export function calculateChildTaxCredit(
  input: ChildTaxCreditInput
): ChildTaxCreditResult {
  const warnings: string[] = [];

  // 1. 가구 유형 검증
  if (input.householdType === 'single') {
    warnings.push('단독가구는 자녀장려금 대상이 아닙니다. 근로장려금(EITC) 대상으로 별도 확인하세요.');
    return {
      eligibleChildCount: 0,
      grossPayment: 0,
      reductionRate: 0,
      finalPayment: 0,
      warnings,
    };
  }

  // 2. 자산 검증
  if (!input.passesAssetTest) {
    warnings.push('재산이 2.4억원을 초과하면 자녀장려금 지급 불가입니다.');
    return {
      eligibleChildCount: 0,
      grossPayment: 0,
      reductionRate: 0,
      finalPayment: 0,
      warnings,
    };
  }

  // 3. 자녀 수 검증
  if (input.childCount <= 0) {
    warnings.push('18세 미만 자녀가 없으면 자녀장려금 대상이 아닙니다.');
    return {
      eligibleChildCount: 0,
      grossPayment: 0,
      reductionRate: 0,
      finalPayment: 0,
      warnings,
    };
  }

  const childCount = Math.floor(input.childCount);
  const eligibleChildCount = childCount;

  // 감액 전 총 지급액
  const grossPayment = childCount * CHILD_TAX_BENEFIT_PER_CHILD;

  // 4. 소득 기준 적용
  let reductionRate = 0;
  let finalPayment = 0;

  if (input.totalAnnualIncome <= CHILD_TAX_BENEFIT_INCOME_PHASE_OUT_START) {
    // 3600만 이하: 전액 지급
    reductionRate = 0;
    finalPayment = grossPayment;
  } else if (
    input.totalAnnualIncome >= CHILD_TAX_BENEFIT_INCOME_CAP
  ) {
    // 4300만 이상: 지급 불가
    reductionRate = 1;
    finalPayment = 0;
    warnings.push(`소득 ${CHILD_TAX_BENEFIT_INCOME_CAP.toLocaleString()}만원 이상이므로 자녀장려금을 받을 수 없습니다.`);
  } else {
    // 3600~4300만: 선형 감액
    const phaseOutRange =
      CHILD_TAX_BENEFIT_INCOME_CAP -
      CHILD_TAX_BENEFIT_INCOME_PHASE_OUT_START;
    const excess = input.totalAnnualIncome - CHILD_TAX_BENEFIT_INCOME_PHASE_OUT_START;
    reductionRate = excess / phaseOutRange;

    finalPayment = Math.floor(
      (grossPayment * (1 - reductionRate)) / 10
    ) * 10;
    warnings.push(
      `소득이 ${CHILD_TAX_BENEFIT_INCOME_PHASE_OUT_START.toLocaleString()}~${CHILD_TAX_BENEFIT_INCOME_CAP.toLocaleString()}만원 구간이므로 자녀장려금이 감액됩니다.`
    );
  }

  // 소수점 4자리 반올림
  const roundedReductionRate =
    Math.round(reductionRate * 10000) / 10000;

  return {
    eligibleChildCount,
    grossPayment,
    reductionRate: roundedReductionRate,
    finalPayment,
    warnings,
  };
}
