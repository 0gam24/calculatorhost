/**
 * 분할매수(Split Buy / DCA) 계산 로직
 *
 * 차수별 매수(단가 × 수량)로부터 가중평균 평단가, 총 투자금,
 * 수수료 포함 실효 평단가, 손익분기점(BEP)을 산출합니다.
 *
 * 주식 / 코인 / 해외주식 모두 동일한 가중평균 공식이 적용됩니다.
 *   평균단가 = Σ(단가 × 수량) ÷ Σ수량
 */

export interface SplitBuyEntry {
  price: number;
  quantity: number;
}

export interface SplitBuyInput {
  entries: SplitBuyEntry[];
  /** 매수 수수료율 (%). 예: 0.015(국내주식 평균) | 0.05(코인 거래소 평균) */
  buyFeeRate?: number;
  /** 매도 시 부과되는 수수료율 (%). BEP 계산에만 사용 */
  sellFeeRate?: number;
  /** 매도 거래세율 (%). 한국 주식 0.18 / 코인 0 */
  taxRate?: number;
}

export interface SplitBuyEntryResult {
  step: number;
  price: number;
  quantity: number;
  amount: number;
  fee: number;
  cumulativeQuantity: number;
  cumulativeAmount: number;
  cumulativeAverage: number;
}

export interface SplitBuyResult {
  entries: SplitBuyEntryResult[];
  totalQuantity: number;
  totalAmount: number;
  totalFee: number;
  averagePrice: number;
  effectiveAveragePrice: number;
  breakEvenPrice: number;
  warnings: string[];
}

function clampNonNegative(value: number): number {
  if (!Number.isFinite(value) || value < 0) return 0;
  return value;
}

function safeRate(rate: number | undefined): number {
  if (rate == null || !Number.isFinite(rate) || rate < 0) return 0;
  if (rate >= 100) return 0;
  return rate;
}

export function calculateSplitBuy(input: SplitBuyInput): SplitBuyResult {
  const warnings: string[] = [];
  const buyFeeRate = safeRate(input.buyFeeRate);
  const sellFeeRate = safeRate(input.sellFeeRate);
  const taxRate = safeRate(input.taxRate);

  const sanitized: SplitBuyEntry[] = (input.entries ?? []).map((e) => ({
    price: clampNonNegative(e.price),
    quantity: clampNonNegative(e.quantity),
  }));

  const validEntries = sanitized.filter((e) => e.price > 0 && e.quantity > 0);

  if (sanitized.length === 0) {
    warnings.push('분할매수 차수가 입력되지 않았습니다.');
  }
  if (validEntries.length === 0) {
    warnings.push('유효한 매수 차수가 없습니다. 단가와 수량을 입력하세요.');
  }
  if (validEntries.length === 1) {
    warnings.push('차수가 1개입니다. 분할매수 효과를 보려면 2회 이상 권장합니다.');
  }

  let cumulativeQuantity = 0;
  let cumulativeAmount = 0;
  let cumulativeFee = 0;

  const entries: SplitBuyEntryResult[] = sanitized.map((entry, idx) => {
    const isValid = entry.price > 0 && entry.quantity > 0;
    const amount = isValid ? entry.price * entry.quantity : 0;
    const fee = isValid ? (amount * buyFeeRate) / 100 : 0;
    if (isValid) {
      cumulativeQuantity += entry.quantity;
      cumulativeAmount += amount;
      cumulativeFee += fee;
    }
    const cumulativeAverage =
      cumulativeQuantity > 0 ? cumulativeAmount / cumulativeQuantity : 0;
    return {
      step: idx + 1,
      price: entry.price,
      quantity: entry.quantity,
      amount: Math.floor(amount),
      fee: Math.floor(fee),
      cumulativeQuantity,
      cumulativeAmount: Math.floor(cumulativeAmount),
      cumulativeAverage: Math.floor(cumulativeAverage),
    };
  });

  const totalQuantity = cumulativeQuantity;
  const totalAmount = Math.floor(cumulativeAmount);
  const totalFee = Math.floor(cumulativeFee);

  const averagePrice =
    totalQuantity > 0 ? Math.floor(cumulativeAmount / totalQuantity) : 0;

  const effectiveAveragePrice =
    totalQuantity > 0
      ? Math.floor((cumulativeAmount + cumulativeFee) / totalQuantity)
      : 0;

  // 손익분기점 = 평단 × (1 + 매수수수료율) ÷ (1 − 매도수수료율 − 거래세율)
  const sellDeduction = (sellFeeRate + taxRate) / 100;
  const breakEvenPrice =
    averagePrice > 0 && sellDeduction < 1
      ? Math.ceil((averagePrice * (1 + buyFeeRate / 100)) / (1 - sellDeduction))
      : averagePrice;

  warnings.push('본 계산기는 교육용입니다. 투자 권유가 아닙니다.');

  return {
    entries,
    totalQuantity,
    totalAmount,
    totalFee,
    averagePrice,
    effectiveAveragePrice,
    breakEvenPrice,
    warnings,
  };
}

export interface EqualSplitInput {
  totalAmount: number;
  prices: number[];
}

export interface EqualSplitOutput {
  entries: SplitBuyEntry[];
  perStepAmount: number;
}

/**
 * 균등분할(총 투자금 ÷ N) 으로 차수별 수량을 자동 산출.
 * 마지막 차수에서 나누어 떨어지지 않는 잔액은 단가로 정수 나눗셈해 흡수.
 */
export function generateEqualSplit(input: EqualSplitInput): EqualSplitOutput {
  const totalAmount = clampNonNegative(input.totalAmount);
  const prices = (input.prices ?? []).map((p) => clampNonNegative(p));
  const steps = prices.length;
  if (steps === 0 || totalAmount === 0) {
    return { entries: [], perStepAmount: 0 };
  }
  const perStepAmount = Math.floor(totalAmount / steps);
  const entries: SplitBuyEntry[] = prices.map((price) => ({
    price,
    quantity: price > 0 ? Math.floor(perStepAmount / price) : 0,
  }));
  return { entries, perStepAmount };
}
