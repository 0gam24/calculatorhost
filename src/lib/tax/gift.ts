/**
 * 증여세 계산 — 순수 함수
 *
 * 법적 근거:
 * - 상속세 및 증여세법 §26 (세율)
 * - 상증세법 §47·§55 (과세가액·과세표준)
 * - 상증세법 §53 (증여재산공제)
 * - 상증세법 §68 (신고세액공제 3%)
 *
 * 상수: src/lib/constants/tax-rates-2026.ts
 * 명세: docs/calculator-spec/증여세.md
 *
 * MVP 스코프:
 * - 10년 합산 기본 공제 적용
 * - 신고세액공제 3% (기한 내 신고 시)
 * - 미지원: 부부합산, 구 세법 비교 선택, 기타 특례
 *
 * ⚠️ 모든 수정은 calc-logic-verifier 에이전트 통과 후.
 */

import {
  GIFT_INHERITANCE_TAX_BRACKETS,
  GIFT_DEDUCTION,
  REPORTING_TAX_CREDIT_RATE,
} from '@/lib/constants/tax-rates-2026';
import { calculateProgressiveTax } from './income';

// ============================================
// 타입 정의
// ============================================

export type RelationType = 'spouse' | 'adultDescendant' | 'minorDescendant' | 'ascendant' | 'otherRelative';

export interface GiftInput {
  /** 증여재산 가액 (원) */
  giftValue: number;

  /** 증여 대상과의 관계 */
  relation: RelationType;

  /** 10년 내 동일 증여자로부터 받은 기증여액 합계 (원) */
  priorGiftValue: number;

  /** 부담부증여 시 채무인수액 (원) */
  assumedDebt: number;

  /** 기한 내 자진신고 여부 (신고세액공제 3% 적용 조건) */
  reportWithinDeadline: boolean;
}

export interface GiftResult {
  /** 입력: 증여재산 가액 */
  giftValue: number;

  /** 입력: 채무인수 */
  assumedDebt: number;

  /** 과세가액 = 증여재산가액 + 10년내 기증여액 - 부담부증여 채무인수액 */
  taxableValue: number;

  /** 증여재산공제 (관계별, 10년 한도) */
  giftDeduction: number;

  /** 과세표준 = 과세가액 - 공제 (또는 0 이상) */
  taxableBase: number;

  /** 산출 증여세 (5단계 누진, 10원 단위 절사) */
  grossTax: number;

  /** 신고세액공제 (산출세액 × 3%) */
  reportingCredit: number;

  /** 최종 납부 증여세 = 산출세액 - 신고세액공제 */
  finalTax: number;

  /** 안내/경고 메시지 배열 */
  warnings: string[];
}

// ============================================
// 헬퍼 함수 1: 관계별 공제액 조회
// ============================================

/**
 * 관계에 따른 증여재산공제액 반환 (상증세법 §53)
 *
 * @param relation 증여 대상 관계
 * @returns 공제액 (원)
 */
export function getGiftDeduction(relation: RelationType): number {
  switch (relation) {
    case 'spouse':
      return GIFT_DEDUCTION.spouse; // 6억
    case 'adultDescendant':
      return GIFT_DEDUCTION.adultDescendant; // 5천만
    case 'minorDescendant':
      return GIFT_DEDUCTION.minorDescendant; // 2천만
    case 'ascendant':
      return GIFT_DEDUCTION.ascendant; // 5천만
    case 'otherRelative':
      return GIFT_DEDUCTION.otherRelative; // 1천만
    default:
      return 0;
  }
}

// ============================================
// 헬퍼 함수 2: 유효 공제액 계산
// ============================================

/**
 * 10년 합산 원칙 적용 후 유효 공제액 계산
 *
 * 10년 내 동일 증여자로부터의 증여는 공제를 합산하여 적용하는데,
 * 이번 증여에 실제 적용할 수 있는 공제액을 계산한다.
 *
 * MVP 간단화:
 * - 공제 한도 = getGiftDeduction(relation)
 * - 기증여 합계 >= 공제 한도 → 유효공제 = 0 + warning
 * - 기증여 합계 < 공제 한도 → 유효공제 = 한도 - 기증여 합계
 *
 * @param relation 관계
 * @param priorGiftValue 10년 내 기증여 합계
 * @returns { effectiveDeduction, warning? }
 */
function calculateEffectiveDeduction(relation: RelationType, priorGiftValue: number): { deduction: number; warning?: string } {
  const totalDeductionLimit = getGiftDeduction(relation);

  if (priorGiftValue >= totalDeductionLimit) {
    return {
      deduction: 0,
      warning: `${relation === 'spouse' ? '배우자' : relation === 'adultDescendant' ? '성년 자녀' : relation === 'minorDescendant' ? '미성년 자녀' : relation === 'ascendant' ? '부모' : '기타 친족'}로부터의 10년 누적 공제가 한도를 초과하였습니다. 정확한 계산은 세무사 상담을 권장합니다.`,
    };
  }

  const remaining = totalDeductionLimit - priorGiftValue;
  return { deduction: remaining };
}

// ============================================
// 메인 함수: calculateGiftTax
// ============================================

/**
 * 증여세 종합 계산
 *
 * 절차:
 * 1. 입력 검증
 * 2. 과세가액 = 증여재산 + 기증여 - 채무인수
 * 3. 유효공제 계산 (10년 합산 고려)
 * 4. 과세표준 = 과세가액 - 공제 (≥0)
 * 5. 산출세액 = 누진세
 * 6. 신고세액공제 = 산출세액 × 3% (신고기한 내 시)
 * 7. 최종 = 산출세액 - 신고공제
 *
 * @param input GiftInput
 * @returns GiftResult
 */
export function calculateGiftTax(input: GiftInput): GiftResult {
  const warnings: string[] = [];

  // ─── 입력 검증 ───
  if (input.giftValue <= 0) {
    warnings.push('증여재산 가액을 입력해 주세요.');
    return {
      giftValue: 0,
      assumedDebt: 0,
      taxableValue: 0,
      giftDeduction: 0,
      taxableBase: 0,
      grossTax: 0,
      reportingCredit: 0,
      finalTax: 0,
      warnings,
    };
  }

  // ─── 과세가액 계산 (상증세법 §47, §55) ───
  // 과세가액 = 증여재산 + 10년내 기증여 - 부담부증여 채무
  const assumedDebt = Math.max(0, input.assumedDebt);
  const taxableValue = Math.max(
    0,
    input.giftValue + Math.max(0, input.priorGiftValue) - assumedDebt
  );

  // ─── 유효공제 계산 ───
  const { deduction: effectiveDeduction, warning: deductionWarning } = calculateEffectiveDeduction(
    input.relation,
    Math.max(0, input.priorGiftValue)
  );

  if (deductionWarning) {
    warnings.push(deductionWarning);
  }

  // ─── 과세표준 (상증세법 §53) ───
  const taxableBase = Math.max(0, taxableValue - effectiveDeduction);

  // ─── 산출세액: 5단계 누진세 (상증세법 §26) ───
  const grossTax = taxableBase > 0
    ? Math.floor(calculateProgressiveTax(taxableBase, GIFT_INHERITANCE_TAX_BRACKETS) / 10) * 10
    : 0;

  // ─── 신고세액공제 (상증세법 §68) ───
  const reportingCredit = input.reportWithinDeadline
    ? Math.floor((grossTax * REPORTING_TAX_CREDIT_RATE) / 10) * 10
    : 0;

  // ─── 최종 납부세액 ───
  const finalTax = Math.max(0, grossTax - reportingCredit);

  // ─── 추가 경고 ───
  if (input.priorGiftValue > 0) {
    warnings.push(
      '정확한 10년 합산 과세는 기증여 당시의 과세표준과 세율까지 반영하여 재계산해야 합니다. 복잡한 케이스는 세무사 상담을 권장합니다.'
    );
  }

  if (input.relation === 'otherRelative' && input.giftValue > 500_000_000) {
    warnings.push(
      '기타 친족은 공제가 낮아 세부담이 큽니다. 증여자 관계를 정확히 확인하시기 바랍니다.'
    );
  }

  if (!input.reportWithinDeadline) {
    warnings.push(
      '신고기한(증여일 속하는 달 말일 + 3개월)을 초과한 경우 가산세가 추가될 수 있습니다.'
    );
  }

  return {
    giftValue: input.giftValue,
    assumedDebt,
    taxableValue,
    giftDeduction: effectiveDeduction,
    taxableBase,
    grossTax,
    reportingCredit,
    finalTax,
    warnings,
  };
}
