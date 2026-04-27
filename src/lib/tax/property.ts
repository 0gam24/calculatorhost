/**
 * 재산세 계산 — 순수 함수
 *
 * 법적 근거:
 * - 지방세법 §110 (과세표준)
 * - 지방세법 §111 (세율) + §111의2 (1세대1주택 특례)
 * - 지방세법 §112 (도시지역분)
 * - 지방세법 §150 (지방교육세)
 * - 공정시장가액비율 고시 (주택 60%)
 *
 * 상수: src/lib/constants/tax-rates-2026.ts
 * 명세: docs/calculator-spec/재산세.md
 *
 * ⚠️ 모든 수정은 calc-logic-verifier 에이전트 통과 후.
 */

import {
  PROPERTY_TAX_BRACKETS_GENERAL,
  PROPERTY_TAX_BRACKETS_ONE_HOUSE,
  PROPERTY_TAX_ASSESSMENT_RATIO,
  PROPERTY_EDUCATION_TAX_RATE,
  PROPERTY_URBAN_AREA_TAX_RATE,
  PROPERTY_ONE_HOUSE_SPECIAL_CAP,
  type TaxBracket,
} from '@/lib/constants/tax-rates-2026';
import { calculateProgressiveTax } from './income';

// ============================================
// 상수
// ============================================

/** 20만원 이하 일괄 납부 기준 (지방세법 시행령) */
const INSTALLMENT_THRESHOLD = 200_000;

// ============================================
// 타입 정의
// ============================================

export interface PropertyTaxInput {
  /** 공시가격 (원) */
  publishedPrice: number;
  /** 1세대1주택 특례 신청 여부 */
  oneHouseholdOneHouse: boolean;
  /** 도시지역 여부 */
  urbanArea: boolean;
}

export interface PropertyTaxResult {
  /** 과세표준 (공시가 × 공정시장가액비율 60%) */
  taxBase: number;
  /** 적용 세율 유형 */
  appliedBracket: 'general' | 'oneHouseSpecial';
  /** 재산세 본세 (10원 단위 절사) */
  propertyTax: number;
  /** 도시지역분 (10원 단위 절사) */
  urbanAreaTax: number;
  /** 지방교육세 (재산세의 20%, 10원 단위 절사) */
  localEducationTax: number;
  /** 총 납부액 (본세 + 도시지역분 + 교육세) */
  totalTax: number;
  /** 7월분 납부액 (10원 단위) */
  installmentJuly: number;
  /** 9월분 납부액 (10원 단위) */
  installmentSeptember: number;
  /** 경고 메시지 */
  warnings: string[];
}

// ============================================
// 헬퍼 함수
// ============================================

/**
 * 과세표준 계산
 * 공시가격 × 공정시장가액비율 60%
 */
export function calculateTaxBase(publishedPrice: number): number {
  if (publishedPrice <= 0) return 0;
  return Math.floor(publishedPrice * PROPERTY_TAX_ASSESSMENT_RATIO);
}

/**
 * 적용 세율 구간 선택
 * 1세대1주택 특례: 공시가 9억 이하일 때만 적용
 */
export function selectPropertyTaxBrackets(
  input: PropertyTaxInput,
): 'general' | 'oneHouseSpecial' {
  if (
    input.oneHouseholdOneHouse &&
    input.publishedPrice <= PROPERTY_ONE_HOUSE_SPECIAL_CAP
  ) {
    return 'oneHouseSpecial';
  }
  return 'general';
}

/**
 * 재산세 본세 계산 (누진세)
 * 구간별 초과분 × 해당 세율 - 누진공제
 */
export function calculatePropertyTax(taxBase: number, brackets: TaxBracket[]): number {
  if (taxBase <= 0) return 0;
  const tax = calculateProgressiveTax(taxBase, brackets);
  // 10원 단위 절사
  return Math.floor(tax / 10) * 10;
}

/**
 * 도시지역분 계산
 * 과세표준 × 0.14% (도시지역만)
 */
export function calculateUrbanAreaTax(taxBase: number, urbanArea: boolean): number {
  if (!urbanArea || taxBase <= 0) return 0;
  const tax = taxBase * PROPERTY_URBAN_AREA_TAX_RATE;
  return Math.floor(tax / 10) * 10;
}

/**
 * 지방교육세 계산
 * 재산세 본세 × 20%
 */
export function calculateLocalEducationTax(propertyTax: number): number {
  if (propertyTax <= 0) return 0;
  const tax = propertyTax * PROPERTY_EDUCATION_TAX_RATE;
  return Math.floor(tax / 10) * 10;
}

/**
 * 분납액 계산
 * 20만원 이하: 7월 일괄
 * 초과: 7월 1/2, 9월 1/2 (분할 합계는 정확히 총액)
 */
export function splitInstallments(
  totalTax: number,
): { installmentJuly: number; installmentSeptember: number } {
  if (totalTax <= INSTALLMENT_THRESHOLD) {
    return { installmentJuly: totalTax, installmentSeptember: 0 };
  }

  // 7월 = 1/2 올림, 9월 = 남은 금액
  const installmentJuly = Math.ceil(totalTax / 2 / 10) * 10;
  const installmentSeptember = totalTax - installmentJuly;

  return { installmentJuly, installmentSeptember };
}

// ============================================
// 메인 엔트리
// ============================================

/**
 * 재산세 종합 계산
 */
export function calculatePropertyTaxTotal(input: PropertyTaxInput): PropertyTaxResult {
  const warnings: string[] = [];

  // 과세표준 계산
  const taxBase = calculateTaxBase(input.publishedPrice);

  // 공시가 0 체크
  if (input.publishedPrice <= 0) {
    warnings.push('공시가격을 입력해 주세요.');
    return {
      taxBase: 0,
      appliedBracket: 'general',
      propertyTax: 0,
      urbanAreaTax: 0,
      localEducationTax: 0,
      totalTax: 0,
      installmentJuly: 0,
      installmentSeptember: 0,
      warnings,
    };
  }

  // 특례 적용 여부 판정
  const appliedBracket = selectPropertyTaxBrackets(input);
  const brackets =
    appliedBracket === 'oneHouseSpecial'
      ? PROPERTY_TAX_BRACKETS_ONE_HOUSE
      : PROPERTY_TAX_BRACKETS_GENERAL;

  // 특례 신청했지만 9억 초과인 경우 경고
  if (input.oneHouseholdOneHouse && input.publishedPrice > PROPERTY_ONE_HOUSE_SPECIAL_CAP) {
    warnings.push(
      '공시가격이 9억원을 초과하여 1세대1주택 특례가 적용되지 않아 일반세율을 적용했습니다.',
    );
  }

  // 본세 계산
  const propertyTax = calculatePropertyTax(taxBase, brackets);

  // 도시지역분 계산
  const urbanAreaTax = calculateUrbanAreaTax(taxBase, input.urbanArea);

  // 지방교육세 계산 (본세 기준)
  const localEducationTax = calculateLocalEducationTax(propertyTax);

  // 총 납부액
  const totalTax = propertyTax + urbanAreaTax + localEducationTax;

  // 분납
  const { installmentJuly, installmentSeptember } = splitInstallments(totalTax);

  // 공통 경고 (MVP 에서 세부담 상한 미반영)
  warnings.push(
    '본 계산은 기본세율 기준이며, 세부담 상한·지역자원시설세 등은 제외되어 있습니다.',
  );

  // 도시지역분 적용 안내
  if (input.urbanArea) {
    warnings.push('도시지역분(0.14%)이 포함되어 있습니다.');
  }

  return {
    taxBase,
    appliedBracket,
    propertyTax,
    urbanAreaTax,
    localEducationTax,
    totalTax,
    installmentJuly,
    installmentSeptember,
    warnings,
  };
}
