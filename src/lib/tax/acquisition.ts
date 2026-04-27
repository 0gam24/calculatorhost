/**
 * 취득세 계산 — 순수 함수
 *
 * 법적 근거:
 * - 지방세법 §10-§17, 시행령 §22
 * - 농어촌특별세법 §3
 * - 지특법 §36의2 (생애최초 감면)
 *
 * 상수: src/lib/constants/tax-rates-2026.ts
 * 명세: docs/calculator-spec/취득세.md
 *
 * ⚠️ 모든 수정은 calc-logic-verifier 에이전트 통과 후.
 */

import { ACQUISITION_TAX } from '@/lib/constants/tax-rates-2026';

// ============================================
// 타입 정의
// ============================================

export type AcquisitionMethod = 'purchase' | 'gift' | 'inheritance' | 'primitive';
export type AcquisitionTarget = 'residential' | 'farmland' | 'land' | 'other';
export type HouseCount = 1 | 2 | 3 | 4;

export interface AcquisitionTaxInput {
  /** 취득 방법 */
  method: AcquisitionMethod;
  /** 대상 (주거용만 MVP 지원, 농지/토지/기타는 "전문가 상담" 반환) */
  target: AcquisitionTarget;
  /** 취득 시점 주택수 (본인 기준) */
  houseCount: HouseCount;
  /** 대상 면적이 85㎡ 초과인지 여부 */
  areaOver85: boolean;
  /** 조정대상지역 취득인지 여부 */
  adjustedArea: boolean;
  /** 취득가 또는 시가표준액 (원) */
  acquisitionPrice: number;
  /** 생애최초 주택 감면 적용 여부 (소득/가격 조건 사전 확인 가정) */
  firstHomeBuyerDiscount: boolean;
}

export interface AcquisitionTaxResult {
  /** 과세표준 (원) */
  taxBase: number;
  /** 취득세 (원) */
  acquisitionTax: number;
  /** 농어촌특별세 (원) */
  specialRuralTax: number;
  /** 지방교육세 (원) */
  localEducationTax: number;
  /** 총 납부액 (원) = acquisitionTax + specialRuralTax + localEducationTax */
  totalPayment: number;
  /** 적용된 세율 (소수, 0.01 = 1%) */
  appliedRate: number;
  /** 감면액 (생애최초 적용 시) (원) */
  discountAmount: number;
  /** 비고 */
  note: string;
}

// ============================================
// 헬퍼 함수: 주택 1개 구매 기본세율 (6억~9억 선형보간)
// ============================================

/**
 * 주택 1주택자 매매 시 기본 세율 결정
 * 6억 이하: 1.0%
 * 6억~9억: 선형보간 (지방세법 시행령 §22)
 * 9억 초과: 3.0%
 *
 * 선형보간 공식:
 * 세율 = (취득가액 × 2 / 3억원 − 3) ÷ 100
 * = (가격 × 2 / 300_000_000 - 3) / 100
 */
function resolveSingleHousePurchaseRate(acquisitionPrice: number): number {
  if (acquisitionPrice <= 600_000_000) {
    return 0.01;
  }
  if (acquisitionPrice <= 900_000_000) {
    // 선형보간: (가격 × 2 / 3억 - 3) / 100
    const rate = (acquisitionPrice * 2 / 300_000_000 - 3) / 100;
    // 소수점 다섯째 자리에서 반올림 (지방세법 §11 ②)
    return Math.round(rate * 100_000) / 100_000;
  }
  return 0.03;
}

/**
 * 주택/농지/토지 여부와 구매(매매/증여/상속) 기본 세율 결정
 */
function resolveMainRate(input: AcquisitionTaxInput): number {
  // MVP 스코프: 주택만 지원
  if (input.target !== 'residential') {
    throw new Error('전문가 상담 필요 (농지/토지/기타는 미지원)');
  }

  // 매매 취득
  if (input.method === 'purchase') {
    // 조정지역 & 2주택
    if (input.adjustedArea && input.houseCount === 2) {
      return ACQUISITION_TAX.adjustedTwoHouses; // 8%
    }
    // 조정지역 & 3주택 이상
    if (input.adjustedArea && input.houseCount >= 3) {
      return ACQUISITION_TAX.adjustedThreeOrMore; // 12%
    }
    // 비조정지역 & 3주택 이상
    if (!input.adjustedArea && input.houseCount >= 3) {
      return ACQUISITION_TAX.nonAdjustedThreeOrMore; // 12%
    }
    // 1주택자 또는 비조정지역 2주택
    if (input.houseCount === 1) {
      return resolveSingleHousePurchaseRate(input.acquisitionPrice);
    }
    // 비조정지역 2주택자: 1.0% (기본)
    return 0.01;
  }

  // 증여 취득
  if (input.method === 'gift') {
    // 조정지역 & 3주택 이상: 중과 12%
    if (input.adjustedArea && input.houseCount >= 3) {
      return ACQUISITION_TAX.giftAdjustedHeavy; // 12%
    }
    // 기본 3.5%
    return ACQUISITION_TAX.giftBasic; // 3.5%
  }

  // 상속 취득
  if (input.method === 'inheritance') {
    return ACQUISITION_TAX.inheritanceBasic; // 2.8%
  }

  // 원시취득
  if (input.method === 'primitive') {
    throw new Error('전문가 상담 필요 (원시취득은 미지원)');
  }

  return 0;
}

/**
 * 농특세 세율 결정 (85㎡ 초과일 때만)
 * 중과 조건: 조정지역 & 3주택 이상, 또는 비조정지역 & 3주택 이상
 */
function resolveSpecialRuralTaxRate(input: AcquisitionTaxInput): number {
  if (!input.areaOver85) {
    return 0;
  }

  // 중과 조건: 조정/비조정 모두 3주택 이상
  const isHeavy = input.houseCount >= 3;

  return isHeavy ? ACQUISITION_TAX.specialRuralTaxHeavy : ACQUISITION_TAX.specialRuralTaxOver85;
}

// ============================================
// 메인 계산 함수
// ============================================

/**
 * 취득세 계산 (메인 엔트리)
 */
export function calculateAcquisitionTax(input: AcquisitionTaxInput): AcquisitionTaxResult {
  // 입력값 검증
  if (input.acquisitionPrice < 0) {
    throw new Error('취득가는 0 이상이어야 합니다');
  }

  // 과세표준 (유상: 실거래가, 무상: 시가표준액)
  const taxBase = input.acquisitionPrice;

  // 주택이 아니거나 원시취득이면 예외 발생
  if (input.target !== 'residential') {
    return {
      taxBase,
      acquisitionTax: 0,
      specialRuralTax: 0,
      localEducationTax: 0,
      totalPayment: 0,
      appliedRate: 0,
      discountAmount: 0,
      note: '전문가 상담 필요 (농지/토지/기타는 미지원)',
    };
  }

  if (input.method === 'primitive') {
    return {
      taxBase,
      acquisitionTax: 0,
      specialRuralTax: 0,
      localEducationTax: 0,
      totalPayment: 0,
      appliedRate: 0,
      discountAmount: 0,
      note: '전문가 상담 필요 (원시취득은 미지원)',
    };
  }

  // 기본 취득세 세율 결정
  const mainRate = resolveMainRate(input);

  // 취득세 계산 (과세표준 × 세율, 10원 단위 절사)
  let acquisitionTax = Math.floor((taxBase * mainRate) / 10) * 10;

  // 생애최초 감면 적용
  let discountAmount = 0;
  if (input.firstHomeBuyerDiscount) {
    // 감면액 = min(취득세, 200만원)
    discountAmount = Math.min(acquisitionTax, ACQUISITION_TAX.firstHomeBuyerMaxDiscount);
    acquisitionTax = Math.max(0, acquisitionTax - discountAmount);
  }

  // 농어촌특별세 (취득세가 아닌 과세표준 기준, 10원 단위 절사)
  const specialRuralTaxRate = resolveSpecialRuralTaxRate(input);
  const specialRuralTax = Math.floor((taxBase * specialRuralTaxRate) / 10) * 10;

  // 지방교육세 (취득세 기준의 10%, 10원 단위 절사)
  // 생애최초 감면은 취득세에만 적용되므로 지교세 계산 시 감면 후 취득세 사용
  const localEducationTax = Math.floor((acquisitionTax * ACQUISITION_TAX.localEducationTaxOfAcquisition) / 10) * 10;

  // 총 납부액
  const totalPayment = acquisitionTax + specialRuralTax + localEducationTax;

  // 비고
  const notes: string[] = [];
  if (input.firstHomeBuyerDiscount) {
    notes.push(`생애최초 감면 ${discountAmount.toLocaleString()}원 적용`);
  }
  if (input.houseCount >= 2 && input.adjustedArea) {
    notes.push('조정지역 다주택 중과 적용');
  }
  if (input.areaOver85) {
    notes.push('85㎡ 초과 농특세 포함');
  }

  const note = notes.length > 0 ? notes.join(' | ') : '';

  return {
    taxBase,
    acquisitionTax,
    specialRuralTax,
    localEducationTax,
    totalPayment,
    appliedRate: mainRate,
    discountAmount,
    note,
  };
}
