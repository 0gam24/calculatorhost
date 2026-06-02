/**
 * 자동차세 계산 — 순수 함수
 *
 * 명세: docs/calculator-spec/자동차세.md
 * 근거: 지방세법 §127·§137·§151 (2026)
 *
 * MVP: 비영업용 승용차만 지원
 */

import {
  VEHICLE_TAX_RATES_PASSENGER_NON_BUSINESS,
  VEHICLE_TAX_REDUCTION_START_YEAR,
  VEHICLE_TAX_REDUCTION_PER_YEAR,
  VEHICLE_TAX_REDUCTION_MAX,
  VEHICLE_LOCAL_EDUCATION_TAX_RATE,
  VEHICLE_TAX_ANNUAL_PAYMENT_DISCOUNT_RATE,
} from '@/lib/constants/tax-rates-2026';

export type VehicleUsage = 'passengerNonBusiness'; // MVP: 비영업용 승용만

export interface VehicleTaxInput {
  usage: VehicleUsage;
  engineCc: number; // 배기량 (cc)
  vehicleAgeYears: number; // 차령 (연수). 0 = 신차
  includeAnnualDiscount: boolean; // 연납 할인 체크
  annualPaymentMonthOfApplication?: number; // 연납 신청월 (1~12, 기본값 1월). 선납일수 계산에 사용
}

export interface VehicleTaxResult {
  baseRate: number; // cc당 세율 (원)
  grossVehicleTax: number; // 기본 자동차세 (차령감경 전, 원)
  reductionRate: number; // 적용 경감률 (0.0~0.5)
  reductionAmount: number; // 경감액 (원)
  vehicleTaxAfterReduction: number; // 차령감경 후 자동차세 (원)
  localEducationTax: number; // 지방교육세 (자동차세 × 30%, 원)
  totalAnnual: number; // 연간 총액 (감경 후 자동차세 + 지방교육세, 원)
  annualPaymentDiscount: number; // 연납 할인액 (원)
  finalAnnualPayment: number; // 연납 할인 후 납부액 (원)
  semiAnnualPayment: number; // 반기별 납부액 (6월·12월, 원)
  warnings: string[];
}

/**
 * 연납 신청월(1~12)에 따른 선납일수 계산
 * 지방세법 시행령 §125: 선납일수 = 납부기한 다음날 ~ 12월 31일
 *
 * 신청월별 표준 납부기한:
 * - 1월: 1월 16일 (다음날 1월 17일 ~ 12월 31일 = 약 351일)
 * - 3월: 3월 15일 (다음날 3월 16일 ~ 12월 31일 = 약 273일)
 * - 6월: 6월 15일 (다음날 6월 16일 ~ 12월 31일 = 약 214일)
 * - 9월: 9월 15일 (다음날 9월 16일 ~ 12월 31일 = 약 122일)
 *
 * 출처: 경향신문 2025-01-12, 서초구청·성동구청 2025년 공지
 */
function calculateAnnualPaymentDaysOfPayment(applicationMonth: number): number {
  const month = applicationMonth < 1 || applicationMonth > 12 ? 1 : applicationMonth;

  // 표준 신청월별 선납일수 (보수적 기준)
  if (month === 1) return 351;
  if (month === 3) return 273;
  if (month === 6) return 214;
  if (month === 9) return 122;

  // 1~3월 선형보간
  if (month < 3) {
    const ratio = (month - 1) / 2;
    return Math.round(351 + (273 - 351) * ratio);
  }
  // 3~6월 선형보간
  if (month < 6) {
    const ratio = (month - 3) / 3;
    return Math.round(273 + (214 - 273) * ratio);
  }
  // 6~9월 선형보간
  if (month < 9) {
    const ratio = (month - 6) / 3;
    return Math.round(214 + (122 - 214) * ratio);
  }
  // 9~12월 선형보간
  const ratio = (month - 9) / 3;
  return Math.round(122 + (0 - 122) * ratio);
}

/**
 * 배기량(cc)에 따른 세율(원/cc) 조회
 * 지방세법 §127
 */
function getVehicleCcRate(engineCc: number): number {
  if (engineCc <= 1000) {
    return VEHICLE_TAX_RATES_PASSENGER_NON_BUSINESS.upTo1000cc;
  } else if (engineCc <= 1600) {
    return VEHICLE_TAX_RATES_PASSENGER_NON_BUSINESS.upTo1600cc;
  }
  return VEHICLE_TAX_RATES_PASSENGER_NON_BUSINESS.over1600cc;
}

/**
 * 차령(연수)에 따른 경감률 계산
 * 지방세법 §137: 3년 차부터 연 5%씩 경감, 최대 50%
 *
 * 예: 5년차 → (5 - 2) × 5% = 15%
 *      12년 이상 → 50% cap
 */
function calculateVehicleAgeReduction(ageYears: number): number {
  // 3년 미만 경감 없음
  if (ageYears < VEHICLE_TAX_REDUCTION_START_YEAR) {
    return 0;
  }

  // 3년 이상: (age - 2) × 5% 공식
  // 예: 3년 → (3-2)×0.05 = 5%
  //     4년 → (4-2)×0.05 = 10%
  let reduction = (ageYears - 2) * VEHICLE_TAX_REDUCTION_PER_YEAR;

  // 최대 50% cap
  if (reduction > VEHICLE_TAX_REDUCTION_MAX) {
    reduction = VEHICLE_TAX_REDUCTION_MAX;
  }

  return reduction;
}

/**
 * 자동차세 계산 메인 함수
 *
 * 계산 순서:
 * 1. 배기량 × cc당 세율 = 기본 자동차세
 * 2. 차령경감율 적용
 * 3. 지방교육세 (자동차세 × 30%)
 * 4. 연납 할인 (선택)
 * 5. 반기별 납부액
 */
export function calculateVehicleTax(input: VehicleTaxInput): VehicleTaxResult {
  const warnings: string[] = [];

  // 입력 검증
  if (input.usage !== 'passengerNonBusiness') {
    warnings.push('비영업용 승용만 지원됩니다. 영업용/승합/화물 차량은 전문가 상담이 필요합니다.');
    return {
      baseRate: 0,
      grossVehicleTax: 0,
      reductionRate: 0,
      reductionAmount: 0,
      vehicleTaxAfterReduction: 0,
      localEducationTax: 0,
      totalAnnual: 0,
      annualPaymentDiscount: 0,
      finalAnnualPayment: 0,
      semiAnnualPayment: 0,
      warnings,
    };
  }

  if (!Number.isFinite(input.engineCc) || input.engineCc <= 0) {
    warnings.push('유효한 배기량(cc)을 입력해 주세요.');
  }

  if (!Number.isFinite(input.vehicleAgeYears) || input.vehicleAgeYears < 0) {
    warnings.push('차령은 0 이상이어야 합니다.');
  }

  if (input.engineCc > 5000 && input.engineCc > 0) {
    warnings.push('대형 승용차(5000cc 이상)는 세부 구간이 다를 수 있어 세무 확인을 권장합니다.');
  }

  if (warnings.length > 0) {
    return {
      baseRate: 0,
      grossVehicleTax: 0,
      reductionRate: 0,
      reductionAmount: 0,
      vehicleTaxAfterReduction: 0,
      localEducationTax: 0,
      totalAnnual: 0,
      annualPaymentDiscount: 0,
      finalAnnualPayment: 0,
      semiAnnualPayment: 0,
      warnings,
    };
  }

  // 1. 배기량 × cc당 세율 = 기본 자동차세
  const baseRate = getVehicleCcRate(input.engineCc);
  const grossVehicleTax = Math.floor(input.engineCc * baseRate); // 정수 (원 단위)

  // 2. 차령경감 적용
  const reductionRate = calculateVehicleAgeReduction(input.vehicleAgeYears);
  const reductionAmount = Math.floor((grossVehicleTax * reductionRate) / 10) * 10; // 10원 단위 절사
  const vehicleTaxAfterReduction = grossVehicleTax - reductionAmount;

  // 3. 지방교육세 (자동차세의 30%)
  // 10원 단위 절사: Math.floor로 내림한 후 * 10
  const educationRaw = vehicleTaxAfterReduction * VEHICLE_LOCAL_EDUCATION_TAX_RATE;
  const localEducationTax = Math.floor(educationRaw / 10) * 10;

  // 4. 연간 총액
  const totalAnnual = vehicleTaxAfterReduction + localEducationTax;

  // 5. 연납 할인 (기간 비례식, 지방세법 시행령 §125)
  // 공식: 할인액 = 연간 총액 × (선납일수 / 365) × 5%
  // 검증: 지방세법 시행령 §125, 경향신문 2025-01-12, 서초구청 공지 (2026-06-02 확정)
  const annualPaymentDiscount = input.includeAnnualDiscount
    ? (() => {
        const daysOfPayment = calculateAnnualPaymentDaysOfPayment(
          input.annualPaymentMonthOfApplication ?? 1
        );
        const discountRatio = (daysOfPayment / 365) * VEHICLE_TAX_ANNUAL_PAYMENT_DISCOUNT_RATE;
        return Math.floor((totalAnnual * discountRatio) / 10) * 10; // 10원 단위 절사
      })()
    : 0;
  const finalAnnualPayment = totalAnnual - annualPaymentDiscount;

  // 6. 반기별 납부액 (연납 미사용 시, 6월·12월 분할)
  const semiAnnualPayment = Math.floor((totalAnnual / 2) / 10) * 10; // 10원 단위 절사

  return {
    baseRate,
    grossVehicleTax,
    reductionRate,
    reductionAmount,
    vehicleTaxAfterReduction,
    localEducationTax,
    totalAnnual,
    annualPaymentDiscount,
    finalAnnualPayment,
    semiAnnualPayment,
    warnings,
  };
}
