/**
 * 분할매도(Split Sell / Profit Taking) 계산 로직
 *
 * 평균 매입단가와 보유 수량을 기준으로, 차수별 매도 단가·수량에 따른
 * 실현손익(수수료·거래세 차감 후)을 산출합니다.
 *
 * 주의: 분할매도 후에도 잔여 수량의 평단은 변하지 않습니다.
 * (선입선출 회계와 무관 — 평단은 매수 이력에 의해서만 변함)
 */

export interface SplitSellEntry {
  price: number;
  quantity: number;
}

export interface SplitSellInput {
  averagePrice: number;
  holdingQuantity: number;
  entries: SplitSellEntry[];
  /** 매도 수수료율 (%) */
  sellFeeRate?: number;
  /** 매도 거래세율 (%). 한국 주식 0.18 / 코인 0 */
  taxRate?: number;
}

export interface SplitSellEntryResult {
  step: number;
  price: number;
  quantity: number;
  grossProceeds: number;
  fee: number;
  tax: number;
  netProceeds: number;
  costBasis: number;
  realizedPnL: number;
  realizedPnLPercent: number;
  cumulativeQuantitySold: number;
  cumulativeRealizedPnL: number;
  remainingQuantity: number;
}

export interface SplitSellResult {
  entries: SplitSellEntryResult[];
  totalSoldQuantity: number;
  remainingQuantity: number;
  totalGrossProceeds: number;
  totalFee: number;
  totalTax: number;
  totalNetProceeds: number;
  totalRealizedPnL: number;
  totalRealizedPnLPercent: number;
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

export function calculateSplitSell(input: SplitSellInput): SplitSellResult {
  const warnings: string[] = [];
  const averagePrice = clampNonNegative(input.averagePrice);
  const holdingQuantity = clampNonNegative(input.holdingQuantity);
  const sellFeeRate = safeRate(input.sellFeeRate);
  const taxRate = safeRate(input.taxRate);

  if (averagePrice === 0) warnings.push('평균 매입단가가 0입니다.');
  if (holdingQuantity === 0) warnings.push('보유 수량이 0입니다.');

  let cumulativeQuantitySold = 0;
  let cumulativeRealizedPnL = 0;
  let totalGrossProceeds = 0;
  let totalFee = 0;
  let totalTax = 0;

  const entries: SplitSellEntryResult[] = (input.entries ?? []).map((entry, idx) => {
    const requestedQty = clampNonNegative(entry.quantity);
    const remainingBeforeThisStep = Math.max(0, holdingQuantity - cumulativeQuantitySold);
    const actualQty = Math.min(requestedQty, remainingBeforeThisStep);
    if (requestedQty > remainingBeforeThisStep && requestedQty > 0) {
      warnings.push(`${idx + 1}차 매도 수량이 잔여 보유 수량을 초과합니다 (자동 조정).`);
    }
    const price = clampNonNegative(entry.price);
    const grossProceeds = price * actualQty;
    const fee = (grossProceeds * sellFeeRate) / 100;
    const tax = (grossProceeds * taxRate) / 100;
    const netProceeds = grossProceeds - fee - tax;
    const costBasis = averagePrice * actualQty;
    const realizedPnL = netProceeds - costBasis;
    const realizedPnLPercent =
      costBasis > 0 ? (realizedPnL / costBasis) * 100 : 0;

    cumulativeQuantitySold += actualQty;
    cumulativeRealizedPnL += realizedPnL;
    totalGrossProceeds += grossProceeds;
    totalFee += fee;
    totalTax += tax;

    const remainingQuantity = Math.max(0, holdingQuantity - cumulativeQuantitySold);

    return {
      step: idx + 1,
      price,
      quantity: actualQty,
      grossProceeds: Math.floor(grossProceeds),
      fee: Math.floor(fee),
      tax: Math.floor(tax),
      netProceeds: Math.floor(netProceeds),
      costBasis: Math.floor(costBasis),
      realizedPnL: Math.round(realizedPnL),
      realizedPnLPercent,
      cumulativeQuantitySold,
      cumulativeRealizedPnL: Math.round(cumulativeRealizedPnL),
      remainingQuantity,
    };
  });

  const totalCostBasisOfSold = averagePrice * cumulativeQuantitySold;
  const totalRealizedPnLPercent =
    totalCostBasisOfSold > 0
      ? (cumulativeRealizedPnL / totalCostBasisOfSold) * 100
      : 0;

  if (entries.length === 0) {
    warnings.push('분할매도 차수가 입력되지 않았습니다.');
  }

  warnings.push('본 계산기는 교육용입니다. 투자 권유가 아닙니다.');

  return {
    entries,
    totalSoldQuantity: cumulativeQuantitySold,
    remainingQuantity: Math.max(0, holdingQuantity - cumulativeQuantitySold),
    totalGrossProceeds: Math.floor(totalGrossProceeds),
    totalFee: Math.floor(totalFee),
    totalTax: Math.floor(totalTax),
    totalNetProceeds: Math.floor(totalGrossProceeds - totalFee - totalTax),
    totalRealizedPnL: Math.round(cumulativeRealizedPnL),
    totalRealizedPnLPercent,
    warnings,
  };
}

/**
 * 목표 수익률(%) → 매도 단가 환산 (평단 기준 단순 환산)
 *   targetPrice = averagePrice × (1 + targetReturnPercent / 100)
 * 수수료/세금 미반영 (UI 입력 보조용)
 */
export function priceFromTargetReturn(averagePrice: number, targetReturnPercent: number): number {
  const ap = clampNonNegative(averagePrice);
  if (ap === 0) return 0;
  const ret = Number.isFinite(targetReturnPercent) ? targetReturnPercent : 0;
  return Math.floor(ap * (1 + ret / 100));
}

/**
 * 매도 단가 → 평단 대비 수익률(%) 환산 (수수료/세금 미반영)
 */
export function targetReturnFromPrice(averagePrice: number, sellPrice: number): number {
  const ap = clampNonNegative(averagePrice);
  const sp = clampNonNegative(sellPrice);
  if (ap === 0) return 0;
  return ((sp - ap) / ap) * 100;
}
