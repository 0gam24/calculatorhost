/**
 * 종합부동산세 계산 — 순수 함수
 *
 * 법적 근거:
 * - 종합부동산세법 §7 (과세표준)
 * - 종합부동산세법 §8 (세율)
 * - 종합부동산세법 §9 (1세대1주택 세액공제)
 * - 농어촌특별세법 §5 (종부세의 20%)
 *
 * 상수: src/lib/constants/tax-rates-2026.ts
 * 명세: docs/calculator-spec/종합부동산세.md
 *
 * ⚠️ 모든 수정은 calc-logic-verifier 에이전트 통과 후.
 */

import {
  COMPREHENSIVE_PROPERTY_TAX_BRACKETS_GENERAL,
  COMPREHENSIVE_PROPERTY_TAX_BRACKETS_MULTI,
  COMPREHENSIVE_PROPERTY_TAX_ONE_HOUSE_DEDUCTION,
  COMPREHENSIVE_PROPERTY_TAX_OTHER_DEDUCTION,
  COMPREHENSIVE_PROPERTY_TAX_ASSESSMENT_RATIO,
  RURAL_SPECIAL_TAX_ON_COMPREHENSIVE_PROPERTY_RATE,
  ONE_HOUSE_SENIOR_CREDIT_60_64,
  ONE_HOUSE_SENIOR_CREDIT_65_69,
  ONE_HOUSE_SENIOR_CREDIT_70_PLUS,
  ONE_HOUSE_LONG_HOLD_5_10,
  ONE_HOUSE_LONG_HOLD_10_15,
  ONE_HOUSE_LONG_HOLD_15_PLUS,
  ONE_HOUSE_TOTAL_CREDIT_CAP,
  type TaxBracket,
} from '@/lib/constants/tax-rates-2026';
import { calculateProgressiveTax } from './income';

// ============================================
// 타입 정의
// ============================================

export type HouseCount = 'one' | 'two' | 'threeOrMore';

export interface ComprehensivePropertyTaxInput {
  /** 보유 주택 수 */
  houseCount: HouseCount;
  /** 보유 주택 공시가 합계 (원) */
  totalPublishedPrice: number;
  /** 1세대1주택 특례 신청 여부 (1주택 선택 시에만 의미) */
  isOneHouseholdOneHouse: boolean;
  /** 만 나이 (0~150), 1세대1주택 공제용 */
  seniorAgeYears: number;
  /** 보유 연수 (년), 장기보유공제용 */
  holdingYears: number;
  /** 3주택 이상일 때 조정지역 포함 여부 (참고용, 2023 개정 후 미사용) */
  includesAdjustedArea?: boolean;
}

export interface ComprehensivePropertyTaxResult {
  /** 공시가 합계 */
  totalPublishedPrice: number;
  /** 적용 기본공제 (1세대1주택 12억, 기타 9억) */
  basicDeduction: number;
  /** 과세표준 = (공시가 - 공제) × 60% (음수 시 0) */
  taxableBase: number;
  /** 적용 세율 유형 ('general' 또는 'multi') */
  appliedBracket: 'general' | 'multi';
  /** 종부세 산출세액 */
  grossTax: number;
  /** 고령자공제율 */
  seniorCreditRate: number;
  /** 장기보유공제율 */
  longHoldCreditRate: number;
  /** 합산 공제율 (최대 80%) */
  totalCreditRate: number;
  /** 세액공제액 */
  creditAmount: number;
  /** 종부세 순세액 (공제 후) */
  netTax: number;
  /** 농어촌특별세 */
  ruralSpecialTax: number;
  /** 최종 납부세액 (종부세 + 농특세) */
  totalTax: number;
  /** 경고 메시지 */
  warnings: string[];
}

// ============================================
// 헬퍼 함수
// ============================================

/**
 * 고령자공제율 계산
 * - 60세 미만: 0%
 * - 60~64세: 20%
 * - 65~69세: 30%
 * - 70세 이상: 40%
 * (1세대1주택자만 적용)
 */
export function calculateSeniorCredit(
  isOneHouseholdOneHouse: boolean,
  ageYears: number,
): number {
  if (!isOneHouseholdOneHouse) return 0;
  if (ageYears < 60) return 0;
  if (ageYears < 65) return ONE_HOUSE_SENIOR_CREDIT_60_64;
  if (ageYears < 70) return ONE_HOUSE_SENIOR_CREDIT_65_69;
  return ONE_HOUSE_SENIOR_CREDIT_70_PLUS;
}

/**
 * 장기보유공제율 계산
 * - 5년 미만: 0%
 * - 5~10년 미만: 20%
 * - 10~15년 미만: 40%
 * - 15년 이상: 50%
 * (1세대1주택자만 적용)
 */
export function calculateLongHoldCredit(
  isOneHouseholdOneHouse: boolean,
  holdingYears: number,
): number {
  if (!isOneHouseholdOneHouse) return 0;
  if (holdingYears < 5) return 0;
  if (holdingYears < 10) return ONE_HOUSE_LONG_HOLD_5_10;
  if (holdingYears < 15) return ONE_HOUSE_LONG_HOLD_10_15;
  return ONE_HOUSE_LONG_HOLD_15_PLUS;
}

/**
 * 세율 구간 선택
 * 3주택 이상이면 중과 세율 적용
 */
export function selectComprehensivePropertyTaxBrackets(
  houseCount: HouseCount,
): TaxBracket[] {
  if (houseCount === 'threeOrMore') {
    return COMPREHENSIVE_PROPERTY_TAX_BRACKETS_MULTI;
  }
  return COMPREHENSIVE_PROPERTY_TAX_BRACKETS_GENERAL;
}

/**
 * 기본공제 선택
 * 1세대1주택: 12억
 * 기타: 9억
 */
export function selectBasicDeduction(
  houseCount: HouseCount,
  isOneHouseholdOneHouse: boolean,
): number {
  if (isOneHouseholdOneHouse && houseCount === 'one') {
    return COMPREHENSIVE_PROPERTY_TAX_ONE_HOUSE_DEDUCTION;
  }
  return COMPREHENSIVE_PROPERTY_TAX_OTHER_DEDUCTION;
}

// ============================================
// 메인 계산 함수
// ============================================

/**
 * 종합부동산세 계산
 *
 * 1. 기본공제 선택
 * 2. 과세표준 = (공시가 - 공제) × 60% (음수 시 0)
 * 3. 세율 구간 선택 (일반/중과)
 * 4. 산출세액 = 과세표준에 누진세 적용
 * 5. 세액공제 = 고령자 + 장기보유 (최대 80%)
 * 6. 순세액 = 산출세액 - 공제액
 * 7. 농특세 = 순세액 × 20%
 * 8. 최종 = 순세액 + 농특세
 */
export function calculateComprehensivePropertyTax(
  input: ComprehensivePropertyTaxInput,
): ComprehensivePropertyTaxResult {
  const warnings: string[] = [];

  // 입력 검증
  if (input.totalPublishedPrice <= 0) {
    return {
      totalPublishedPrice: input.totalPublishedPrice,
      basicDeduction: 0,
      taxableBase: 0,
      appliedBracket: 'general',
      grossTax: 0,
      seniorCreditRate: 0,
      longHoldCreditRate: 0,
      totalCreditRate: 0,
      creditAmount: 0,
      netTax: 0,
      ruralSpecialTax: 0,
      totalTax: 0,
      warnings: ['공시가 합계는 0원 이상이어야 합니다.'],
    };
  }

  // 1. 기본공제 선택
  const basicDeduction = selectBasicDeduction(input.houseCount, input.isOneHouseholdOneHouse);

  // 1세대1주택자 여부 검증
  if (input.isOneHouseholdOneHouse && input.houseCount !== 'one') {
    warnings.push('1세대1주택자 여부는 1주택 선택 시에만 유효합니다. 무시 처리됩니다.');
  }

  // 2. 과세표준 계산
  const excess = Math.max(0, input.totalPublishedPrice - basicDeduction);
  const taxableBase = Math.floor(excess * COMPREHENSIVE_PROPERTY_TAX_ASSESSMENT_RATIO);

  // 3. 세율 구간 선택
  const brackets = selectComprehensivePropertyTaxBrackets(input.houseCount);
  const appliedBracket = input.houseCount === 'threeOrMore' ? 'multi' : 'general';

  // 4. 산출세액 (10원 단위 절사)
  let grossTax = 0;
  if (taxableBase > 0) {
    const tax = calculateProgressiveTax(taxableBase, brackets);
    grossTax = Math.floor(tax / 10) * 10;
  }

  // 과세표준이 0이면 경고
  if (taxableBase === 0) {
    warnings.push(
      '공시가 합계가 공제금액 이하여서 종합부동산세가 부과되지 않습니다.',
    );
  }

  // 조정지역 참고 경고 (2023 개정으로 폐지되었으나 참고용)
  if (input.includesAdjustedArea === true && input.houseCount === 'threeOrMore') {
    warnings.push(
      '조정지역 중과는 2023 개정으로 폐지되었습니다. 과세표준 12억 초과 시에만 중과세율이 적용됩니다.',
    );
  }

  // 5. 세액공제 계산 (1세대1주택자만)
  const seniorCreditRate = calculateSeniorCredit(
    input.isOneHouseholdOneHouse,
    input.seniorAgeYears,
  );
  const longHoldCreditRate = calculateLongHoldCredit(
    input.isOneHouseholdOneHouse,
    input.holdingYears,
  );
  const totalCreditRate = Math.min(
    ONE_HOUSE_TOTAL_CREDIT_CAP,
    seniorCreditRate + longHoldCreditRate,
  );
  const creditAmount = Math.floor((grossTax * totalCreditRate) / 10) * 10;

  // 6. 순세액
  const netTax = Math.max(0, grossTax - creditAmount);

  // 7. 농특세
  const ruralSpecialTax = Math.floor((netTax * RURAL_SPECIAL_TAX_ON_COMPREHENSIVE_PROPERTY_RATE) / 10) * 10;

  // 8. 최종 납부액
  const totalTax = netTax + ruralSpecialTax;

  return {
    totalPublishedPrice: input.totalPublishedPrice,
    basicDeduction,
    taxableBase,
    appliedBracket,
    grossTax,
    seniorCreditRate,
    longHoldCreditRate,
    totalCreditRate,
    creditAmount,
    netTax,
    ruralSpecialTax,
    totalTax,
    warnings,
  };
}
