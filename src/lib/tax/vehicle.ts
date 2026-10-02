/**
 * 비영업용 내연기관 승용차 자동차세 간이 예상액 (2026).
 * 등록·말소 일할, 감면, 조례 특례, §128④ 소액차량 정기 일괄징수 추가공제는 포함하지 않는다.
 * 지방세법 §127·§128·§151, 시행령 §122·§125⑥.
 */
import {
  VEHICLE_TAX_RATES_PASSENGER_NON_BUSINESS,
  VEHICLE_TAX_REDUCTION_START_YEAR,
  VEHICLE_TAX_REDUCTION_PER_YEAR,
  VEHICLE_TAX_REDUCTION_MAX,
  VEHICLE_LOCAL_EDUCATION_TAX_RATE,
  VEHICLE_TAX_ANNUAL_PAYMENT_DISCOUNT_RATE,
} from '@/lib/constants/tax-rates-2026';

export type VehicleUsage = 'passengerNonBusiness';

export interface VehicleTaxInput {
  usage: VehicleUsage;
  engineCc: number;
  /** 상반기 법정 차령. 등록연도의 단순 차이를 자동 추정하지 않는다. */
  vehicleAgeYears: number;
  /** 하반기 법정 차령: 상반기와 같거나 1년 높다. 생략 시 상반기와 같다. */
  vehicleAgeYearsSecondHalf?: number;
  includeAnnualDiscount: boolean;
  /** 지원 신청월: 1·3·6·9월, 기본 1월. */
  annualPaymentMonthOfApplication?: number;
  /** 이 함수의 정책 지원연도는 2026년뿐이다. */
  taxYear?: number;
}

export interface VehicleTaxResult {
  baseRate: number;
  grossVehicleTax: number;
  /** 기존 호환 필드: 상반기 경감률. */
  reductionRate: number;
  reductionRateSecondHalf: number;
  /** 양 반기 합산 차령경감액. 징수 끝수 처리 전 참고액. */
  reductionAmount: number;
  vehicleTaxAfterReduction: number;
  localEducationTax: number;
  /** 연납 전 연간 기준액. 각 세목에 연간 끝수 처리를 적용한 참고액. */
  totalAnnual: number;
  /** 연간 기준액과 연납 후 예상 연간 합계의 차이. 중간 공제액을 절사하지 않는다. */
  annualPaymentDiscount: number;
  /** 1·3월 연납액 / 6·9월 상반기 기준액 + 하반기 선납액 / 비연납 연간 기준액. */
  finalAnnualPayment: number;
  /** 기존 호환 필드: 상반기 납부 기준액. */
  semiAnnualPayment: number;
  firstHalfPayment: number;
  secondHalfPayment: number;
  /** 1·3월 연납액 / 6·9월 하반기 선납액 / 비연납 상반기 기준액. */
  paymentDueNow: number;
  warnings: string[];
}

export interface VehiclePaymentCalendar {
  daysRemaining: number;
  daysInYear: number;
  daysInSecondHalf: number;
}

const PAYMENT_MONTHS = [1, 3, 6, 9];
const DAY_MS = 86_400_000;

/**
 * 신청월 말일 다음 날부터 연말까지의 실제 달력 일수.
 * 지방세법 §128③: 1·3월은 연세액, 6·9월은 제2기분을 공제 기준으로 삼는다.
 * https://law.go.kr/lsLinkCommonInfo.do?chrClsCd=010202&lsJoLnkSeq=1021848893
 * 다른 연도 달력 계산도 허용하지만 해당 연도 공제율을 인증하는 함수는 아니다.
 */
export function getVehiclePaymentCalendar(year: number, applicationMonth: number): VehiclePaymentCalendar {
  if (!Number.isSafeInteger(year) || year < 100 || year > 9998) {
    throw new Error('달력 연도는 100~9998 사이의 정수여야 합니다.');
  }
  if (!PAYMENT_MONTHS.includes(applicationMonth)) {
    throw new Error('연납 신청월은 1·3·6·9월만 지원합니다.');
  }
  const nextYearStart = Date.UTC(year + 1, 0, 1);
  return {
    daysRemaining: (nextYearStart - Date.UTC(year, applicationMonth, 1)) / DAY_MS,
    daysInYear: (nextYearStart - Date.UTC(year, 0, 1)) / DAY_MS,
    daysInSecondHalf: (nextYearStart - Date.UTC(year, 6, 1)) / DAY_MS,
  };
}

interface Fraction {
  numerator: bigint;
  denominator: bigint;
}

function getVehicleCcRate(engineCc: number): number {
  if (engineCc <= 1000) return VEHICLE_TAX_RATES_PASSENGER_NON_BUSINESS.upTo1000cc;
  if (engineCc <= 1600) return VEHICLE_TAX_RATES_PASSENGER_NON_BUSINESS.upTo1600cc;
  return VEHICLE_TAX_RATES_PASSENGER_NON_BUSINESS.over1600cc;
}

const AGE_STEPS_PER_WHOLE = Math.round(1 / VEHICLE_TAX_REDUCTION_PER_YEAR);
const MAX_AGE_REDUCTION_STEPS = Math.round(VEHICLE_TAX_REDUCTION_MAX / VEHICLE_TAX_REDUCTION_PER_YEAR);

function reductionSteps(age: number): number {
  return Math.min(Math.max(age - (VEHICLE_TAX_REDUCTION_START_YEAR - 1), 0), MAX_AGE_REDUCTION_STEPS);
}

/**
 * §127①2: A × (20 - clamp(n - 2, 0, 10)) / 40, 양 반기를 별도 계산.
 * 법정 차령은 시행령 §122에 따른 사용자 확인 입력값이다.
 * https://law.go.kr/LSW/lsLinkCommonInfo.do?chrClsCd=010202&lspttninfSeq=120290
 */
function halfYearVehicleTax(grossAnnual: bigint, age: number): Fraction {
  return {
    numerator: grossAnnual * BigInt(AGE_STEPS_PER_WHOLE - reductionSteps(age)),
    denominator: BigInt(AGE_STEPS_PER_WHOLE * 2),
  };
}

/**
 * 지방세기본법 §59 → 국고금관리법 §47: 최종 징수 세목별 10원 미만 끝수 처리.
 * https://www.law.go.kr/LSW/lsLawLinkInfo.do?chrClsCd=010202&lsJoLnkSeq=1000577035
 * https://www.law.go.kr/LSW/lsLawLinkInfo.do?chrClsCd=010202&lsJoLnkSeq=900052683
 * §151①7 교육세는 끝수 처리 전 자동차세 × 30%. 중간 공제·자동차세 끝수가 과표를 바꾸지 않는다.
 * 실제 고지액과의 일치를 인증하지 않는 간이 예상 모델이다.
 */
function finalTaxItems(rawVehicleTax: Fraction): { vehicle: number; education: number; total: number } {
  const vehicle = Number(rawVehicleTax.numerator / (rawVehicleTax.denominator * 10n) * 10n);
  const educationPercent = BigInt(Math.round(VEHICLE_LOCAL_EDUCATION_TAX_RATE * 100));
  const education = Number(rawVehicleTax.numerator * educationPercent / (rawVehicleTax.denominator * 100n * 10n) * 10n);
  return { vehicle, education, total: vehicle + education };
}

function afterPrepaymentDiscount(raw: Fraction, days: number, periodDays: number): Fraction {
  // 시행령 §125⑥(2026.10.1 시행) 5%. 중앙 상수와 연동, 정책 지원은 2026년에 한정.
  // https://law.go.kr/LSW/lsSideInfoP.do?docCls=jo&joBrNo=00&joNo=0125&lsiSeq=290815&urlMode=lsScJoRltInfoR
  const discountPercent = BigInt(Math.round(VEHICLE_TAX_ANNUAL_PAYMENT_DISCOUNT_RATE * 100));
  const denominator = BigInt(periodDays) * 100n;
  return {
    numerator: raw.numerator * (denominator - BigInt(days) * discountPercent),
    denominator: raw.denominator * denominator,
  };
}

function unsupported(warnings: string[]): VehicleTaxResult {
  return {
    baseRate: 0, grossVehicleTax: 0, reductionRate: 0, reductionRateSecondHalf: 0,
    reductionAmount: 0, vehicleTaxAfterReduction: 0, localEducationTax: 0,
    totalAnnual: 0, annualPaymentDiscount: 0, finalAnnualPayment: 0,
    semiAnnualPayment: 0, firstHalfPayment: 0, secondHalfPayment: 0, paymentDueNow: 0, warnings,
  };
}

export function calculateVehicleTax(input: VehicleTaxInput): VehicleTaxResult {
  const warnings: string[] = [];
  const year = input.taxYear ?? 2026;
  const month = input.annualPaymentMonthOfApplication ?? 1;
  const ageSecondHalf = input.vehicleAgeYearsSecondHalf ?? input.vehicleAgeYears;
  if (input.usage !== 'passengerNonBusiness') {
    warnings.push('비영업용 내연기관 승용차만 지원합니다.');
  }
  if (!Number.isSafeInteger(input.engineCc) || input.engineCc <= 0) {
    warnings.push('유효한 배기량(cc)을 양의 정수로 입력해 주세요.');
  }
  if (input.engineCc > 5000) {
    warnings.push('대형 승용차는 현재 계산기의 지원 범위(5000cc 이하)를 벗어납니다.');
  }
  if (!Number.isSafeInteger(input.vehicleAgeYears) || input.vehicleAgeYears < 0) {
    warnings.push('상반기 법정 차령은 0 이상의 정수여야 합니다.');
  }
  if (!Number.isSafeInteger(ageSecondHalf) || ageSecondHalf < 0 ||
      (ageSecondHalf !== input.vehicleAgeYears && ageSecondHalf !== input.vehicleAgeYears + 1)) {
    warnings.push('하반기 법정 차령은 상반기와 같거나 1년 높아야 합니다.');
  }
  if (year !== 2026) {
    warnings.push('현재 자동차세 정책은 2026년만 지원합니다. 다른 연도는 해당 연도 기준을 확인해 주세요.');
  }
  if (!PAYMENT_MONTHS.includes(month)) {
    warnings.push('연납 신청월은 1·3·6·9월만 지원합니다.');
  }
  if (warnings.length > 0) return unsupported(warnings);

  const baseRate = getVehicleCcRate(input.engineCc);
  const grossVehicleTax = input.engineCc * baseRate;
  const gross = BigInt(grossVehicleTax);
  const rawFirstHalf = halfYearVehicleTax(gross, input.vehicleAgeYears);
  const rawSecondHalf = halfYearVehicleTax(gross, ageSecondHalf);
  const rawAnnual: Fraction = {
    numerator: rawFirstHalf.numerator + rawSecondHalf.numerator,
    denominator: rawFirstHalf.denominator,
  };
  const annualItems = finalTaxItems(rawAnnual);
  const firstHalfPayment = finalTaxItems(rawFirstHalf).total;
  const secondHalfPayment = finalTaxItems(rawSecondHalf).total;
  const totalAnnual = annualItems.total;
  let finalAnnualPayment = totalAnnual;
  let paymentDueNow = firstHalfPayment;
  if (input.includeAnnualDiscount) {
    const calendar = getVehiclePaymentCalendar(year, month);
    if (month === 1 || month === 3) {
      finalAnnualPayment = finalTaxItems(afterPrepaymentDiscount(rawAnnual, calendar.daysRemaining, calendar.daysInYear)).total;
      paymentDueNow = finalAnnualPayment;
    } else {
      // 6월: 제2기 전체, 9월: 10/1~12/31의 92일 / 제2기 184일. 연세액 전체에서 공제하지 않는다.
      const days = month === 6 ? calendar.daysInSecondHalf : calendar.daysRemaining;
      paymentDueNow = finalTaxItems(afterPrepaymentDiscount(rawSecondHalf, days, calendar.daysInSecondHalf)).total;
      finalAnnualPayment = firstHalfPayment + paymentDueNow;
    }
  }
  return {
    baseRate,
    grossVehicleTax,
    reductionRate: reductionSteps(input.vehicleAgeYears) / AGE_STEPS_PER_WHOLE,
    reductionRateSecondHalf: reductionSteps(ageSecondHalf) / AGE_STEPS_PER_WHOLE,
    reductionAmount: Number(gross * rawAnnual.denominator - rawAnnual.numerator) / Number(rawAnnual.denominator),
    vehicleTaxAfterReduction: annualItems.vehicle,
    localEducationTax: annualItems.education,
    totalAnnual,
    annualPaymentDiscount: input.includeAnnualDiscount ? totalAnnual - finalAnnualPayment : 0,
    finalAnnualPayment,
    semiAnnualPayment: firstHalfPayment,
    firstHalfPayment,
    secondHalfPayment,
    paymentDueNow,
    warnings,
  };
}
