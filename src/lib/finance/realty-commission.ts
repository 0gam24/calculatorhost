/**
 * 부동산 중개수수료 계산 — 순수 함수
 *
 * 법적 근거:
 * - 공인중개사법 §32 (중개보수·실비)
 * - 공인중개사법 시행규칙 §20 (중개보수 요율 및 한도액)
 * - 국토교통부 고시 「부동산 중개보수 요율」
 *
 * 상수: src/lib/constants/realty-rates-2026.ts
 * 명세: docs/calculator-spec/중개수수료.md
 *
 * ⚠️ 모든 수정은 calc-logic-verifier 에이전트 통과 후.
 */

import {
  type CommissionBracket,
  REALTY_COMMISSION_HOUSE_SALE_2026,
  REALTY_COMMISSION_HOUSE_LEASE_2026,
  REALTY_COMMISSION_OFFICETEL_SALE_2026,
  REALTY_COMMISSION_OFFICETEL_LEASE_2026,
  REALTY_COMMISSION_OTHER_MAX_2026,
  REALTY_VAT_RATE,
  MONTHLY_RENT_MULTIPLIER_HIGH,
  MONTHLY_RENT_MULTIPLIER_LOW,
  MONTHLY_RENT_THRESHOLD,
} from '@/lib/constants/realty-rates-2026';

// ============================================
// 타입 정의
// ============================================

export type TransactionType = 'sale' | 'jeonse' | 'monthly';
export type PropertyKind = 'house' | 'officetel' | 'other';

export interface CommissionInput {
  /** 거래 유형 (매매·교환 / 전세 / 월세) */
  transactionType: TransactionType;
  /** 물건 종류 (주택 / 오피스텔주거용 / 기타) */
  propertyKind: PropertyKind;
  /** 매매가 또는 전세보증금 (원) — transactionType이 sale 또는 jeonse 일 때 필수 */
  salePrice?: number;
  /** 월세 거래금액 계산용 보증금 (원) — transactionType이 monthly 일 때 필수 */
  deposit?: number;
  /** 월세 (원) — transactionType이 monthly 일 때 필수 */
  monthlyRent?: number;
  /** 협의 요율 (소수, 0.005 = 0.5%) — 선택, 상한 이하면 사용 */
  negotiatedRate?: number;
  /** Original validated percentage text, preserving decimal boundaries before Number conversion. */
  negotiatedRatePercentText?: string;
  /** 부가세 포함 여부 (10%) */
  includeVat: boolean;
}

export interface CommissionResult {
  /** 거래금액 (원) */
  transactionAmount: number;
  /** 적용된 상한 요율 (소수, 0.006 = 0.6%) */
  appliedRate: number;
  /** 해당 구간 한도액 (원). null 이면 한도 없음 */
  limit: number | null;
  /** 상한 중개수수료 (원) */
  maxCommission: number;
  /** 협의 요율 반영 중개수수료 (원) — negotiatedRate 입력 시 */
  negotiatedCommission: number | null;
  /** 부가세 (원) */
  vat: number;
  /** 총 지급액 (원) = (협의 또는 상한 중개수수료) + 부가세 */
  total: number;
  /** 양측 합계 (매도자+매수자) (원) — 참고용 */
  bothSideTotal: number;
  /** 경고/안내 메시지 배열 */
  warnings: string[];
}

// ============================================
// 헬퍼: 거래금액 산정
// ============================================

/**
 * 월세 거래금액 계산
 * 기본: 보증금 + (월세 × 100)
 * 5천만 미만이면: 보증금 + (월세 × 70)
 */
function calculateMonthlyTransactionAmount(deposit: number, monthlyRent: number): number {
  const highBase = deposit + monthlyRent * MONTHLY_RENT_MULTIPLIER_HIGH;
  if (highBase >= MONTHLY_RENT_THRESHOLD) {
    return highBase;
  }
  return deposit + monthlyRent * MONTHLY_RENT_MULTIPLIER_LOW;
}

/**
 * 구간 테이블에서 거래금액에 해당하는 요율 및 한도액 조회
 *
 * 경계값 귀속 원칙 (공인중개사법 시행규칙 §20 [별표]):
 * - "~N" 구간: amount ≤ N (첫 경계 포함)
 * - "N 초과~M" 구간: N < amount ≤ M (M은 포함, N은 제외)
 * - "N 이상~M" 구간: N ≤ amount ≤ M (양쪽 모두 포함)
 *
 * 구현 방식:
 * - upperBound는 "구간의 상한(inclusive)" 의미
 * - transactionAmount <= bracket.upperBound 이면 해당 구간
 * - 배열 순서로 첫 매칭을 반환
 *
 * 예: 900만원
 * - bracket[0] upperBound=50M: 900M <= 50M? NO
 * - bracket[1] upperBound=200M: 900M <= 200M? NO
 * - bracket[2] upperBound=900M: 900M <= 900M? YES → 0.4% 구간
 *
 * 예: 9억원
 * - bracket[0-2]: NO
 * - bracket[3] upperBound=1200M: 900M <= 1200M? YES → 0.5% 구간
 */
function resolveBracket(
  transactionAmount: number,
  brackets: CommissionBracket[],
): { rate: number; limit: number | null } {
  for (const bracket of brackets) {
    // null 은 상한 없음 (마지막 구간), 또는 transactionAmount가 구간 내
    if (bracket.upperBound === null || transactionAmount <= bracket.upperBound) {
      return { rate: bracket.rate, limit: bracket.limit };
    }
  }
  // 함수 실패 방지 (항상 마지막 구간이 null upperBound를 가짐)
  const lastBracket = brackets[brackets.length - 1]!;
  return { rate: lastBracket.rate, limit: lastBracket.limit };
}

/**
 * 중개수수료 최대액 계산 (한도액 적용)
 * 10원 단위 절사
 */
/** Exact decimal multiplication followed by the calculator's existing 10-won truncation.
 * No epsilon is added: a genuine amount just below a boundary must remain below it.
 */
function decimalRatio(value: number): [bigint, bigint] {
  if (!Number.isFinite(value) || value < 0) {
    throw new Error('금액과 요율은 0 이상의 유한한 숫자여야 합니다');
  }
  const [mantissa = '0', exponent = '0'] = String(value).toLowerCase().split('e');
  const [integer = '0', fraction = ''] = mantissa.split('.');
  const digits = BigInt(integer + fraction);
  const scale = fraction.length - Number(exponent);
  return scale >= 0 ? [digits, 10n ** BigInt(scale)] : [digits * 10n ** BigInt(-scale), 1n];
}

function truncateDecimalProduct(
  amount: number,
  rate: number,
  exactRate?: [bigint, bigint],
): number {
  const [amountNumerator, amountDenominator] = decimalRatio(amount);
  const [rateNumerator, rateDenominator] = exactRate ?? decimalRatio(rate);
  return Number(
    ((amountNumerator * rateNumerator) / (amountDenominator * rateDenominator * 10n)) * 10n,
  );
}

function calculateMaxCommission(
  transactionAmount: number,
  rate: number,
  limit: number | null,
): number {
  const gross = truncateDecimalProduct(transactionAmount, rate);
  if (limit === null) {
    return gross;
  }
  return Math.min(gross, limit);
}

// ============================================
// 메인 계산 함수
// ============================================

/**
 * 부동산 중개수수료 계산 (메인 엔트리)
 */
export function calculateRealtyCommission(input: CommissionInput): CommissionResult {
  const warnings: string[] = [];

  // ========== 입력값 검증 및 거래금액 산정 ==========
  let transactionAmount = 0;

  if (input.transactionType === 'sale') {
    // 매매·교환
    if (input.salePrice === undefined || input.salePrice < 0) {
      throw new Error('매매가는 0 이상의 숫자여야 합니다');
    }
    transactionAmount = input.salePrice;
  } else if (input.transactionType === 'jeonse') {
    // 전세
    if (input.salePrice === undefined || input.salePrice < 0) {
      throw new Error('전세보증금은 0 이상의 숫자여야 합니다');
    }
    transactionAmount = input.salePrice;
  } else if (input.transactionType === 'monthly') {
    // 월세
    if (
      input.deposit === undefined ||
      input.monthlyRent === undefined ||
      input.deposit < 0 ||
      input.monthlyRent < 0
    ) {
      throw new Error('보증금과 월세는 0 이상의 숫자여야 합니다');
    }
    transactionAmount = calculateMonthlyTransactionAmount(input.deposit, input.monthlyRent);
  }

  // ========== 상한 요율 및 한도액 결정 ==========
  let appliedRate = 0;
  let limit: number | null = null;

  if (input.propertyKind === 'house') {
    // 주택: 거래유형별 구간 테이블 사용
    const brackets =
      input.transactionType === 'sale'
        ? REALTY_COMMISSION_HOUSE_SALE_2026
        : REALTY_COMMISSION_HOUSE_LEASE_2026;

    const bracket = resolveBracket(transactionAmount, brackets);
    appliedRate = bracket.rate;
    limit = bracket.limit;
  } else if (input.propertyKind === 'officetel') {
    // 오피스텔 주거용: 고정 요율, 한도 없음
    appliedRate =
      input.transactionType === 'sale'
        ? REALTY_COMMISSION_OFFICETEL_SALE_2026
        : REALTY_COMMISSION_OFFICETEL_LEASE_2026;
    limit = null;
  } else if (input.propertyKind === 'other') {
    // 기타 물건: 0.9% 상한만, 협의 필수
    appliedRate = REALTY_COMMISSION_OTHER_MAX_2026;
    limit = null;
    if (!input.negotiatedRate) {
      warnings.push('협의 요율이 없어서 법정 상한 0.9%를 적용했습니다');
    }
  }

  // ========== 상한 중개수수료 계산 (10원 단위 절사) ==========
  const maxCommission = calculateMaxCommission(transactionAmount, appliedRate, limit);

  // ========== 협의 요율 처리 ==========
  let negotiatedCommission: number | null = null;

  if (
    input.negotiatedRatePercentText !== undefined ||
    (input.negotiatedRate !== undefined && input.negotiatedRate > 0)
  ) {
    let exactRate: [bigint, bigint] | undefined;
    if (input.negotiatedRatePercentText !== undefined) {
      const text = input.negotiatedRatePercentText.trim();
      if (!/^(?:\d+\.?\d*|\.\d+)$/.test(text)) {
        throw new Error('협의 요율을 올바른 숫자로 입력해 주세요.');
      }
      const [integer = '', fraction = ''] = text.split('.');
      exactRate = [BigInt((integer || '0') + fraction), 100n * 10n ** BigInt(fraction.length)];
      if (exactRate[0] === 0n) throw new Error('0% 협의는 이 계산기에서 지원하지 않습니다.');
    }
    const [numerator, denominator] = exactRate ?? decimalRatio(input.negotiatedRate ?? 0);
    const [capNumerator, capDenominator] = decimalRatio(appliedRate);
    if (numerator * capDenominator > capNumerator * denominator) {
      // 상한 초과 시 상한 적용 + 경고
      warnings.push(
        `협의 요율 ${((input.negotiatedRate ?? 0) * 100).toFixed(2)}%가 법정 상한 ${(appliedRate * 100).toFixed(2)}%를 초과해 상한을 적용했습니다`,
      );
      negotiatedCommission = maxCommission;
    } else {
      // 상한 이하면 협의 요율 적용 (10원 단위 절사)
      negotiatedCommission = truncateDecimalProduct(
        transactionAmount,
        input.negotiatedRate ?? 0,
        exactRate,
      );
      if (limit !== null) {
        negotiatedCommission = Math.min(negotiatedCommission, limit);
      }
    }
  }

  // ========== 부가세 계산 (10원 단위 절사) ==========
  const baseForVat = negotiatedCommission ?? maxCommission;
  const vat = input.includeVat ? truncateDecimalProduct(baseForVat, REALTY_VAT_RATE) : 0;

  // ========== 총액 및 양측 합계 ==========
  const total = baseForVat + vat;
  const bothSideTotal = total * 2;

  return {
    transactionAmount,
    appliedRate,
    limit,
    maxCommission,
    negotiatedCommission,
    vat,
    total,
    bothSideTotal,
    warnings,
  };
}
