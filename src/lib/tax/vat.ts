/**
 * 부가가치세(VAT) 계산
 *
 * 한국 부가세 제도:
 * - 일반과세자: 매출세액(매출 × 10%) − 매입세액(매입 × 10%) = 납부세액
 * - 간이과세자: 매출 × 업종별 부가가치율 × 10% (매입세액공제 제한)
 *
 * 근거:
 * - 부가가치세법 §3(과세표준), §13(매출세액), §38(매입세액공제)
 * - 부가가치세법 §61(간이과세자), §63(간이과세자 부가가치율)
 */

/** 부가세율 (한국 표준 10%) */
export const VAT_RATE = 10;

/** 간이과세자 업종별 부가가치율 (2026년 기준, 부가가치세법 시행령 §111) */
export const SIMPLIFIED_VAT_VALUE_ADDED_RATE: Record<string, number> = {
  /** 전기·가스·증기·수도 */
  utility: 5,
  /** 소매업, 음식점업, 재생용 재료수집·판매업 */
  retail: 15,
  /** 제조업, 농·임·어업, 숙박업, 운수·통신업, 금융·보험업 */
  manufacturing: 20,
  /** 건설업, 부동산임대업·기타서비스업 */
  service: 30,
  /** 부동산매매업, 그밖의 서비스업 */
  other: 40,
};

export type BusinessType = 'general' | 'simplified';
export type SimplifiedIndustry = keyof typeof SIMPLIFIED_VAT_VALUE_ADDED_RATE;

export interface VatInput {
  /** 사업자 유형: 일반과세 / 간이과세 */
  businessType: BusinessType;
  /** 매출액 (공급가액, VAT 미포함) */
  salesAmount: number;
  /** 매입액 (공급가액, VAT 미포함) — 일반과세자 매입세액공제용 */
  purchaseAmount?: number;
  /** 간이과세자 업종 (간이과세자 시 필수) */
  simplifiedIndustry?: SimplifiedIndustry;
  /** 매입세액 중 공제 가능 비율 (0~100, 일반: 100, 간이는 부분 공제 제한) */
  deductibleRatio?: number;
}

export interface VatResult {
  /** 매출세액 = 매출 × 10% */
  outputVat: number;
  /** 매입세액 = 매입 × 10% × 공제비율 */
  inputVatDeduction: number;
  /** 납부할 부가세 = 매출세액 − 매입세액 (음수면 환급) */
  payableVat: number;
  /** 환급 여부 */
  isRefund: boolean;
  /** 부가가치율 (간이과세자만) */
  valueAddedRate?: number;
  /** 면세 여부 (소액 면세 등) */
  isExempt: boolean;
  /** 사용된 계산 방식 설명 */
  formula: string;
  /** 경고 */
  warnings: string[];
}

function clampNonNegative(value: number): number {
  if (!Number.isFinite(value) || value < 0) return 0;
  return value;
}

function clampRate(value: number, defaultValue: number): number {
  if (!Number.isFinite(value) || value < 0) return defaultValue;
  if (value > 100) return 100;
  return value;
}

/**
 * 부가세 계산 메인 함수
 */
export function calculateVat(input: VatInput): VatResult {
  const warnings: string[] = [];
  const sales = clampNonNegative(input.salesAmount);
  const purchase = clampNonNegative(input.purchaseAmount ?? 0);
  const deductibleRatio = clampRate(input.deductibleRatio ?? 100, 100);

  if (sales === 0) warnings.push('매출액이 0입니다.');

  // ── 일반과세자 ──
  if (input.businessType === 'general') {
    const outputVat = Math.floor((sales * VAT_RATE) / 100);
    const inputVatDeduction = Math.floor(
      ((purchase * VAT_RATE) / 100) * (deductibleRatio / 100)
    );
    const payableVat = outputVat - inputVatDeduction;

    if (purchase > sales) {
      warnings.push('매입이 매출을 초과해 환급이 발생할 수 있습니다.');
    }

    warnings.push('본 계산기는 교육·참고 목적이며 실제 신고는 홈택스 또는 세무사 상담을 권장합니다.');

    return {
      outputVat,
      inputVatDeduction,
      payableVat,
      isRefund: payableVat < 0,
      isExempt: false,
      formula: `매출세액(${sales.toLocaleString()} × 10%) − 매입세액(${purchase.toLocaleString()} × 10% × ${deductibleRatio}% 공제) = ${payableVat.toLocaleString()}원`,
      warnings,
    };
  }

  // ── 간이과세자 ──
  const industry: SimplifiedIndustry = input.simplifiedIndustry ?? 'retail';
  const valueAddedRate = SIMPLIFIED_VAT_VALUE_ADDED_RATE[industry] ?? 15;

  // 간이과세자 면세 한도 (2026년 기준 연 매출 4,800만 원 미만)
  const SIMPLIFIED_EXEMPT_THRESHOLD = 48_000_000;
  const isExempt = sales < SIMPLIFIED_EXEMPT_THRESHOLD;

  if (isExempt) {
    warnings.push(
      `간이과세자로서 연 매출 ${SIMPLIFIED_EXEMPT_THRESHOLD.toLocaleString()}원 미만이면 부가세 납부 의무가 면제됩니다 (신고는 필요).`
    );
  }

  const outputVat = Math.floor((sales * valueAddedRate * VAT_RATE) / 10000);

  // 간이과세자 매입세액공제는 매입세액 × 부가가치율로 제한 (부가가치세법 §63의2)
  const inputVatRaw = (purchase * VAT_RATE) / 100;
  const inputVatDeduction = Math.floor(
    (inputVatRaw * valueAddedRate) / 100 * (deductibleRatio / 100)
  );

  const payableVat = isExempt ? 0 : Math.max(0, outputVat - inputVatDeduction);

  warnings.push('간이과세자 부가가치율은 업종별로 다르며, 정확한 산정은 홈택스 신고 시 자동 적용됩니다.');
  warnings.push('본 계산기는 교육·참고 목적입니다.');

  return {
    outputVat,
    inputVatDeduction,
    payableVat,
    isRefund: false, // 간이과세자는 환급 없음
    isExempt,
    valueAddedRate,
    formula: `간이과세 매출세액(${sales.toLocaleString()} × ${valueAddedRate}% × 10%) − 매입세액공제(부가가치율 ${valueAddedRate}% 적용) = ${payableVat.toLocaleString()}원`,
    warnings,
  };
}

/**
 * VAT 포함 가격 → VAT 제외 공급가액 환산 (역계산)
 * 예: 110,000원 (VAT 포함) → 100,000원 공급가액 + 10,000원 VAT
 */
export function extractVatFromTotal(totalPrice: number): {
  supplyValue: number;
  vat: number;
} {
  const total = clampNonNegative(totalPrice);
  // floor 이 아닌 round 사용 — 110000 / 1.1 = 99999.999... 부동소수점 오차 보정
  const supplyValue = Math.round(total / (1 + VAT_RATE / 100));
  return {
    supplyValue,
    vat: total - supplyValue,
  };
}

/**
 * VAT 제외 공급가액 → VAT 포함 가격 환산
 */
export function addVatToSupplyValue(supplyValue: number): {
  totalPrice: number;
  vat: number;
} {
  const supply = clampNonNegative(supplyValue);
  const vat = Math.floor((supply * VAT_RATE) / 100);
  return {
    totalPrice: supply + vat,
    vat,
  };
}
