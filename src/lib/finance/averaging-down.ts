export interface AveragingDownInput {
  currentPosition: { price: number; quantity: number };
  additionalPurchase: { price: number; quantity: number };
}

export interface AveragingDownResult {
  totalQuantity: number;
  totalInvestment: number;
  averagePrice: number;
  costBasisChangePercent: number;
  warnings: string[];
}

export interface TargetAverageInput {
  currentPosition: { price: number; quantity: number };
  newPurchasePrice: number;
  targetAveragePrice: number;
}

export interface TargetAverageResult {
  requiredAdditionalQuantity: number;
  requiredAdditionalCost: number;
  achievable: boolean;
  warnings: string[];
}

function normalizePrice(price: number): number {
  return Math.max(0, price);
}

function normalizeQuantity(quantity: number): number {
  return Math.max(0, Math.floor(quantity));
}

export function calculateNewAverage(input: AveragingDownInput): AveragingDownResult {
  const warnings: string[] = [];

  const currentPrice = normalizePrice(input.currentPosition.price);
  const currentQuantity = normalizeQuantity(input.currentPosition.quantity);
  const additionalPrice = normalizePrice(input.additionalPurchase.price);
  const additionalQuantity = normalizeQuantity(input.additionalPurchase.quantity);

  const totalQuantity = currentQuantity + additionalQuantity;
  const totalInvestment = Math.floor(
    currentPrice * currentQuantity + additionalPrice * additionalQuantity
  );

  let averagePrice = 0;
  if (totalQuantity > 0) {
    averagePrice = Math.floor(totalInvestment / totalQuantity);
  }

  let costBasisChangePercent = 0;
  if (currentQuantity > 0 && currentPrice > 0) {
    costBasisChangePercent = ((averagePrice - currentPrice) / currentPrice) * 100;
  }

  if (currentQuantity === 0) warnings.push('기존 보유 수량이 0입니다.');
  if (currentPrice === 0) warnings.push('기존 매수가가 0입니다.');
  if (additionalQuantity === 0) warnings.push('추가 매수 수량이 0입니다.');
  if (additionalPrice > currentPrice) warnings.push('추가 매수가가 기존보다 높습니다.');
  if (additionalPrice === 0) warnings.push('추가 매수가가 0입니다.');
  warnings.push('본 계산기는 교육용입니다. 투자 권유가 아닙니다.');

  return {
    totalQuantity,
    totalInvestment,
    averagePrice,
    costBasisChangePercent,
    warnings,
  };
}

export function calculateQuantityForTargetAverage(
  input: TargetAverageInput
): TargetAverageResult {
  const warnings: string[] = [];

  const currentPrice = normalizePrice(input.currentPosition.price);
  const currentQuantity = normalizeQuantity(input.currentPosition.quantity);
  const newPurchasePrice = normalizePrice(input.newPurchasePrice);
  const targetAveragePrice = normalizePrice(input.targetAveragePrice);

  let achievable = true;
  let requiredAdditionalQuantity = 0;
  let requiredAdditionalCost = 0;

  if (newPurchasePrice >= targetAveragePrice || targetAveragePrice >= currentPrice) {
    achievable = false;
    warnings.push('목표 평균단가가 달성 불가능합니다.');
  } else if (currentQuantity === 0) {
    achievable = false;
    warnings.push('기존 보유 수량이 0입니다.');
  } else {
    const denominator = newPurchasePrice - targetAveragePrice;
    if (denominator !== 0) {
      const requiredQty =
        (currentQuantity * (targetAveragePrice - currentPrice)) / denominator;

      if (requiredQty > 0) {
        requiredAdditionalQuantity = Math.ceil(requiredQty);
        requiredAdditionalCost = Math.floor(requiredAdditionalQuantity * newPurchasePrice);
      } else {
        achievable = false;
        warnings.push('계산된 수량이 음수입니다.');
      }
    }
  }

  if (currentPrice === 0) warnings.push('기존 매수가가 0입니다.');
  if (newPurchasePrice === 0) warnings.push('새 매수가가 0입니다.');
  if (targetAveragePrice === 0) warnings.push('목표 평균가가 0입니다.');
  if (requiredAdditionalQuantity > currentQuantity * 10) {
    warnings.push('필요 수량이 기존량의 10배 이상입니다.');
  }
  warnings.push('본 계산기는 교육용입니다. 투자 권유가 아닙니다.');

  return {
    requiredAdditionalQuantity,
    requiredAdditionalCost,
    achievable,
    warnings,
  };
}
