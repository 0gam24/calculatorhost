/**
 * 상속세 계산 — 순수 함수
 *
 * 법적 근거:
 * - 상속세 및 증여세법 §18 (기초공제)
 * - 상증세법 §19 (배우자 상속공제)
 * - 상증세법 §20 (기타인적공제: 자녀·미성년자)
 * - 상증세법 §21 (일괄공제 5억)
 * - 상증세법 §26 (세율)
 * - 상증세법 §68 (신고세액공제 3%)
 *
 * 상수: src/lib/constants/tax-rates-2026.ts
 * 명세: docs/calculator-spec/상속세.md
 *
 * MVP 스코프:
 * - 기초공제 + 자녀공제 + 미성년자공제 vs 일괄공제 5억 자동 비교
 * - 배우자 상속공제 (법정상속분 단순 근사)
 * - 신고세액공제 3% (기한 내 신고 시)
 * - 미지원: 부부합산, 장애인·65세 초과 추가공제, 기타 특례
 *
 * ⚠️ 모든 수정은 calc-logic-verifier 에이전트 통과 후.
 */

import {
  GIFT_INHERITANCE_TAX_BRACKETS,
  INHERITANCE_BASIC_DEDUCTION,
  INHERITANCE_LUMP_SUM_DEDUCTION,
  INHERITANCE_CHILD_DEDUCTION_PER_HEAD,
  INHERITANCE_MINOR_DEDUCTION_PER_YEAR,
  INHERITANCE_SPOUSE_MIN_DEDUCTION,
  INHERITANCE_SPOUSE_MAX_DEDUCTION,
  REPORTING_TAX_CREDIT_RATE,
} from '@/lib/constants/tax-rates-2026';
import { calculateProgressiveTax } from './income';

// ============================================
// 타입 정의
// ============================================

export type DeductionMode = 'auto' | 'lumpSum' | 'basicAndPersonal';

export interface InheritanceInput {
  /** 상속재산 총액 (원) */
  totalAssets: number;

  /** 장례비·공과금 (원) */
  funeralAndDebts: number;

  /** 배우자 상속 여부 */
  hasSpouse: boolean;

  /** 배우자 실제 상속액 (원) */
  spouseInheritedAmount: number;

  /** 전체 자녀 수 (20세 이상 포함) */
  childrenCount: number;

  /** 미성년 자녀 수 (childrenCount에 포함) */
  minorChildrenCount: number;

  /** 미성년 자녀 평균 나이 (세) */
  minorChildrenAverageAgeYears: number;

  /** 공제 방식 선택 */
  deductionMode: DeductionMode;

  /** 기한 내 신고 여부 (신고세액공제 3% 적용 조건) */
  reportWithinDeadline: boolean;
}

export interface InheritanceResult {
  /** 입력: 상속재산 총액 */
  totalAssets: number;

  /** 입력: 장례비·공과금 */
  funeralAndDebts: number;

  /** 과세대상 상속재산 = 총액 - 공과금 */
  taxableAssets: number;

  /** 기초공제 2억 */
  basicDeduction: number;

  /** 자녀공제 합 (자녀수 × 5천만) */
  childrenDeduction: number;

  /** 미성년자공제 합 */
  minorDeduction: number;

  /** 일괄공제 5억 */
  lumpSumDeduction: number;

  /** 배우자 상속공제 */
  spouseDeduction: number;

  /** 기초+자녀+미성년 합계 (비교용) */
  personalDeductionSubtotal: number;

  /** 실제 적용된 공제 합계 (배우자 + max(personal, lumpSum)) */
  effectiveDeduction: number;

  /** 실제 선택된 모드 ('lumpSum' | 'basicAndPersonal') */
  selectedMode: 'lumpSum' | 'basicAndPersonal';

  /** 과세표준 = 과세대상 자산 - 유효 공제 */
  taxableBase: number;

  /** 산출 상속세 (5단계 누진, 10원 단위 절사) */
  grossTax: number;

  /** 신고세액공제 (산출세액 × 3%) */
  reportingCredit: number;

  /** 최종 납부 상속세 = 산출세액 - 신고공제 */
  finalTax: number;

  /** 안내/경고 메시지 배열 */
  warnings: string[];
}

// ============================================
// 헬퍼 함수 1: 자녀공제
// ============================================

/**
 * 자녀공제 계산
 *
 * @param childrenCount 자녀 수 (20세 이상 자녀 포함 총 자녀수)
 * @returns 자녀공제 합 (원)
 */
export function calculateChildrenDeduction(childrenCount: number): number {
  return Math.max(0, childrenCount) * INHERITANCE_CHILD_DEDUCTION_PER_HEAD;
}

// ============================================
// 헬퍼 함수 2: 미성년자공제
// ============================================

/**
 * 미성년자공제 계산
 *
 * MVP 근사: yearsRemaining = max(0, 19 - averageAge)
 *
 * @param minorCount 미성년 자녀 수
 * @param averageAge 미성년 자녀 평균 나이 (세)
 * @returns 미성년자공제 합 (원)
 */
export function calculateMinorDeduction(minorCount: number, averageAge: number): number {
  if (minorCount <= 0) return 0;
  const yearsRemaining = Math.max(0, 19 - Math.floor(averageAge));
  return minorCount * yearsRemaining * INHERITANCE_MINOR_DEDUCTION_PER_YEAR;
}

// ============================================
// 헬퍼 함수 3: 배우자 상속공제
// ============================================

/**
 * 배우자 상속공제 계산
 *
 * 법정상속분 내 실제 상속액에 대해 최소 5억, 최대 30억 범위 내 공제.
 * MVP 근사: 법정상속분 검증 없이 실제 상속액에 민/최 범위 적용.
 *
 * @param hasSpouse 배우자 있음 여부
 * @param spouseInheritedAmount 배우자 실제 상속액 (원)
 * @param totalAssets 총 상속재산 (참고용, 경고)
 * @returns { deduction, warning? }
 */
function calculateSpouseDeduction(
  hasSpouse: boolean,
  spouseInheritedAmount: number,
  totalAssets: number
): { deduction: number; warning?: string } {
  if (!hasSpouse) {
    return { deduction: 0 };
  }

  const clamped = Math.min(
    INHERITANCE_SPOUSE_MAX_DEDUCTION,
    Math.max(INHERITANCE_SPOUSE_MIN_DEDUCTION, Math.max(0, spouseInheritedAmount))
  );

  const warnings: string[] = [];

  if (spouseInheritedAmount > INHERITANCE_SPOUSE_MAX_DEDUCTION) {
    warnings.push(
      `배우자 상속공제는 최대 30억입니다. 법정상속분(1/2)을 초과하는 부분은 실제 상속공제 대상에서 제한될 수 있습니다. 정확한 계산은 세무사 상담을 권장합니다.`
    );
  }

  if (hasSpouse && spouseInheritedAmount > totalAssets * 0.5) {
    warnings.push(
      `배우자의 실제 상속분이 총재산의 50%를 초과합니다. 상속공제는 법정상속분(1/2) 내로 제한될 수 있습니다. 상세한 계산을 위해 세무사 상담을 권장합니다.`
    );
  }

  return {
    deduction: clamped,
    warning: warnings.length > 0 ? warnings.join(' / ') : undefined,
  };
}

// ============================================
// 헬퍼 함수 4: 공제 방식 선택
// ============================================

/**
 * 기초+인적 공제 vs 일괄공제 5억 중 유리한 방식 선택
 *
 * @param personalSubtotal 기초+자녀+미성년 합
 * @param lumpSum 일괄공제 5억
 * @param mode 사용자 선택 모드
 * @returns { deduction, selectedMode }
 */
function selectDeduction(
  personalSubtotal: number,
  lumpSum: number,
  mode: DeductionMode
): { deduction: number; selectedMode: 'lumpSum' | 'basicAndPersonal' } {
  if (mode === 'lumpSum') {
    return { deduction: lumpSum, selectedMode: 'lumpSum' };
  }

  if (mode === 'basicAndPersonal') {
    return { deduction: personalSubtotal, selectedMode: 'basicAndPersonal' };
  }

  // mode === 'auto'
  if (lumpSum > personalSubtotal) {
    return { deduction: lumpSum, selectedMode: 'lumpSum' };
  }

  return { deduction: personalSubtotal, selectedMode: 'basicAndPersonal' };
}

// ============================================
// 메인 함수: calculateInheritanceTax
// ============================================

/**
 * 상속세 종합 계산
 *
 * 절차:
 * 1. 입력 검증
 * 2. 과세대상 자산 = 총액 - 공과금
 * 3. 자녀·미성년자 공제 계산
 * 4. 기초+인적 vs 일괄 공제 비교 선택
 * 5. 배우자 공제 계산
 * 6. 유효 공제 = 배우자 + max(personal, lumpSum)
 * 7. 과세표준 = 과세대상 - 유효 공제 (≥0)
 * 8. 산출세액 = 누진세
 * 9. 신고세액공제 = 산출세액 × 3% (신고기한 내 시)
 * 10. 최종 = 산출세액 - 신고공제
 *
 * @param input InheritanceInput
 * @returns InheritanceResult
 */
export function calculateInheritanceTax(input: InheritanceInput): InheritanceResult {
  const warnings: string[] = [];

  // ─── 입력 검증 ───
  if (input.totalAssets <= 0) {
    warnings.push('상속재산 가액을 입력해 주세요.');
    return {
      totalAssets: 0,
      funeralAndDebts: 0,
      taxableAssets: 0,
      basicDeduction: 0,
      childrenDeduction: 0,
      minorDeduction: 0,
      lumpSumDeduction: 0,
      spouseDeduction: 0,
      personalDeductionSubtotal: 0,
      effectiveDeduction: 0,
      selectedMode: 'basicAndPersonal',
      taxableBase: 0,
      grossTax: 0,
      reportingCredit: 0,
      finalTax: 0,
      warnings,
    };
  }

  // ─── 과세대상 상속재산 (상증세법 §18) ───
  const taxableAssets = Math.max(0, input.totalAssets - Math.max(0, input.funeralAndDebts));

  // ─── 기초공제 ───
  const basicDeduction = INHERITANCE_BASIC_DEDUCTION;

  // ─── 자녀공제 ───
  const childrenDeduction = calculateChildrenDeduction(input.childrenCount);

  // ─── 미성년자공제 ───
  const minorDeduction = calculateMinorDeduction(
    Math.max(0, Math.min(input.minorChildrenCount, input.childrenCount)),
    input.minorChildrenAverageAgeYears
  );

  // ─── 기초+인적 공제 합계 ───
  const personalDeductionSubtotal = basicDeduction + childrenDeduction + minorDeduction;

  // ─── 일괄공제 ───
  const lumpSumDeduction = INHERITANCE_LUMP_SUM_DEDUCTION;

  // ─── 공제 방식 선택 ───
  const { deduction: personalDeductionSelected, selectedMode } = selectDeduction(
    personalDeductionSubtotal,
    lumpSumDeduction,
    input.deductionMode
  );

  // ─── 배우자 상속공제 ───
  const { deduction: spouseDeduction, warning: spouseWarning } = calculateSpouseDeduction(
    input.hasSpouse,
    input.spouseInheritedAmount,
    input.totalAssets
  );

  if (spouseWarning) {
    warnings.push(spouseWarning);
  }

  // ─── 유효 공제 합계 ───
  const effectiveDeduction = personalDeductionSelected + spouseDeduction;

  // ─── 과세표준 ───
  const taxableBase = Math.max(0, taxableAssets - effectiveDeduction);

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
  if (selectedMode === 'lumpSum' && input.deductionMode === 'auto') {
    warnings.push(
      '일괄공제 5억이 기초·인적공제보다 유리해 자동으로 선택되었습니다.'
    );
  }

  if (!input.reportWithinDeadline) {
    warnings.push(
      '신고기한(상속개시일 + 6개월)을 초과한 경우 가산세가 추가될 수 있습니다.'
    );
  }

  return {
    totalAssets: input.totalAssets,
    funeralAndDebts: Math.max(0, input.funeralAndDebts),
    taxableAssets,
    basicDeduction,
    childrenDeduction,
    minorDeduction,
    lumpSumDeduction,
    spouseDeduction,
    personalDeductionSubtotal,
    effectiveDeduction,
    selectedMode,
    taxableBase,
    grossTax,
    reportingCredit,
    finalTax,
    warnings,
  };
}
