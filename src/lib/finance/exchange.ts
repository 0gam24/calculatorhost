/**
 * 환율·환전 계산 — 순수 함수
 *
 * 법적 근거:
 * - 외국환거래법 §5 (환율: 기준환율·매도율·매입률)
 * - 한국은행 환율공시
 * - 금감원 환전 거래 기준
 * (2026-10-14 정정: 이전 표기 "소득세법 §94"는 양도소득 조항이라 무관)
 *
 * 명세: docs/calculator-spec/환율.md
 *
 * ⚠️ 모든 수정은 calc-logic-verifier 에이전트 통과 후.
 */

// ============================================
// 타입 정의
// ============================================

/** 환전 방향 */
export type ExchangeDirection = 'krwToForeign' | 'foreignToKrw';

/** 환전 입력 */
export interface ExchangeInput {
  /** 환전 방향 */
  direction: ExchangeDirection;
  /** 환전 금액 (방향에 따라 원화 또는 외화) */
  amount: number;
  /** 기준환율 (예: USD 1350.5) */
  baseRate: number;
  /** 은행 스프레드 % (기본 1.5%, 매매차이) */
  spreadPercent: number;
  /** 수수료 % (적용 기준은 최종 수령액) */
  feePercent: number;
  /** 고정 수수료 (수령 통화 단위: 원→외화는 외화, 외화→원은 원) */
  feeFlat: number;
}

/** 환전 결과 */
export interface ExchangeResult {
  /** 기준환율 */
  baseRate: number;
  /** 스프레드 적용 후 환율 (매도/매입) */
  appliedRate: number;
  /** 수수료 전 환전액 (같은 통화 단위) */
  grossAmount: number;
  /** 수수료 합계 */
  feeAmount: number;
  /** 최종 수령액 (수수료 차감 후) */
  netAmount: number;
  /** 실질 환율 (원화 관점) */
  effectiveRate: number;
  /** 경고 메시지 배열 */
  warnings: string[];
}

// ============================================
// 메인 계산 함수
// ============================================

/**
 * 환율·환전 계산 (메인 엔트리)
 *
 * 입력값 검증:
 * - amount ≤ 0: 경고 + 결과 0
 * - baseRate ≤ 0: 경고 + 결과 0
 * - spreadPercent, feePercent, feeFlat < 0: 0으로 처리
 * - 수수료가 환전액보다 크면: 수령액 0 + 경고
 *
 * 공식:
 * - KRW → Foreign (매도):
 *   appliedRate = baseRate × (1 + spreadPercent/100)
 *   grossAmount(외화) = amount(원) / appliedRate
 * - Foreign → KRW (매입):
 *   appliedRate = baseRate × (1 - spreadPercent/100)
 *   grossAmount(원) = amount(외화) × appliedRate
 *
 * 수수료 (수령 통화 기준, 화면 입력란과 같은 단위):
 *   feeAmount = (grossAmount × feePercent/100) + feeFlat
 *   netAmount = max(0, grossAmount - feeAmount)
 *
 * 실질환율:
 *   KRW → Foreign: 원화 기준 실질환율 = 원화액 / 최종외화액
 *   Foreign → KRW: 원화 기준 실질환율 = 최종원화액 / 외화액
 *
 * 반올림: 원화 10원 단위, 외화 소수점 2자리
 */
export function calculateExchange(input: ExchangeInput): ExchangeResult {
  const warnings: string[] = [];

  // 입력값 검증
  if (input.amount <= 0) {
    warnings.push('환전 금액은 0보다 커야 합니다');
    return {
      baseRate: input.baseRate,
      appliedRate: 0,
      grossAmount: 0,
      feeAmount: 0,
      netAmount: 0,
      effectiveRate: 0,
      warnings,
    };
  }

  if (input.baseRate <= 0) {
    warnings.push('기준환율은 0보다 커야 합니다');
    return {
      baseRate: input.baseRate,
      appliedRate: 0,
      grossAmount: 0,
      feeAmount: 0,
      netAmount: 0,
      effectiveRate: 0,
      warnings,
    };
  }

  // 스프레드·수수료 음수 처리
  const spread = Math.max(0, input.spreadPercent);
  const feePercent = Math.max(0, input.feePercent);
  const feeFlat = Math.max(0, input.feeFlat);
  const overFeeWarning = '수수료가 환전 금액보다 커서 받을 돈이 없습니다. 수수료 입력값을 확인하세요';

  // 스프레드 적용 환율 계산
  let appliedRate: number;
  let grossAmount: number;
  let netAmount: number;
  let effectiveRate: number;

  if (input.direction === 'krwToForeign') {
    // 원 → 외화 (매도: 은행이 높은 환율로 책정)
    appliedRate = input.baseRate * (1 + spread / 100);
    // 외화액 = 원화액 / 적용환율
    grossAmount = input.amount / appliedRate;
    // 수수료 (외화 기준). 고정 수수료도 화면 입력 단위(외화) 그대로 더한다 (2026-10-14 정정)
    const feeAmount = (grossAmount * feePercent) / 100 + feeFlat;
    netAmount = grossAmount - feeAmount;
    if (netAmount <= 0) {
      warnings.push(overFeeWarning);
      netAmount = 0;
    }
    // 실질환율 = 원화액 / 최종외화액
    effectiveRate = netAmount > 0 ? input.amount / netAmount : 0;

    return {
      baseRate: input.baseRate,
      appliedRate,
      grossAmount: Math.round(grossAmount * 100) / 100, // 외화 소수점 2자리
      feeAmount: Math.round(feeAmount * 100) / 100,
      netAmount: Math.round(netAmount * 100) / 100,
      effectiveRate,
      warnings,
    };
  } else {
    // 외화 → 원 (매입: 은행이 낮은 환율로 책정)
    appliedRate = input.baseRate * (1 - spread / 100);
    // 원화액 = 외화액 × 적용환율
    const grossAmountKrw = input.amount * appliedRate;
    // 수수료 (원화 기준)
    const feeAmount = Math.floor(
      ((grossAmountKrw * feePercent) / 100 + feeFlat) / 10
    ) * 10;
    netAmount = grossAmountKrw - feeAmount;
    if (netAmount <= 0) {
      warnings.push(overFeeWarning);
      netAmount = 0;
    }
    // 실질환율 = 최종원화액 / 외화액
    effectiveRate = netAmount / input.amount;

    return {
      baseRate: input.baseRate,
      appliedRate,
      grossAmount: Math.floor(grossAmountKrw / 10) * 10,
      feeAmount,
      netAmount: Math.floor(netAmount / 10) * 10,
      effectiveRate,
      warnings,
    };
  }
}
