export interface RentalYieldInput {
  purchasePrice: number;
  depositReceived: number;
  acquisitionCosts: number;
  monthlyRent: number;
  monthlyExpenses: number;
  vacancyRatePercent: number;
}

export interface RentalYieldResult {
  annualGrossIncome: number;
  annualEffectiveIncome: number;
  annualNetIncome: number;
  monthlyNetIncome: number;
  actualInvestment: number;
  annualYieldPercent: number;
  capRatePercent: number;
  warnings: string[];
}

function normalizeAmount(amount: number): number {
  return Math.max(0, amount);
}

function normalizePercent(percent: number): number {
  return Math.min(100, Math.max(0, percent));
}

export function calculateRentalYield(input: RentalYieldInput): RentalYieldResult {
  const warnings: string[] = [];

  const purchasePrice = normalizeAmount(input.purchasePrice);
  const depositReceived = normalizeAmount(input.depositReceived);
  const acquisitionCosts = normalizeAmount(input.acquisitionCosts);
  const monthlyRent = normalizeAmount(input.monthlyRent);
  const monthlyExpenses = normalizeAmount(input.monthlyExpenses);
  const vacancyRate = normalizePercent(input.vacancyRatePercent);

  const annualGrossIncome = monthlyRent * 12;
  const annualEffectiveIncome = Math.floor(
    annualGrossIncome * (1 - vacancyRate / 100)
  );
  const annualExpenses = monthlyExpenses * 12;
  const annualNetIncome = Math.max(0, annualEffectiveIncome - annualExpenses);
  const monthlyNetIncome = Math.floor(annualNetIncome / 12);
  const actualInvestment = purchasePrice - depositReceived + acquisitionCosts;

  let annualYieldPercent = 0;
  if (actualInvestment > 0) {
    annualYieldPercent = (annualNetIncome / actualInvestment) * 100;
  }

  let capRatePercent = 0;
  if (purchasePrice > 0) {
    capRatePercent = (annualNetIncome / purchasePrice) * 100;
  }

  if (purchasePrice === 0) {
    warnings.push('매매가가 입력되지 않았습니다.');
  }
  if (monthlyRent === 0) {
    warnings.push('월 임대료가 0으로 설정되었습니다.');
  }
  if (monthlyExpenses > monthlyRent) {
    warnings.push('월 경비가 월 임대료보다 큽니다.');
  }
  if (annualNetIncome < 0) {
    warnings.push('연 순수입이 음수입니다.');
  }
  warnings.push('본 계산기는 교육용입니다. 투자는 전문가 상담 후 진행하세요.');

  return {
    annualGrossIncome,
    annualEffectiveIncome,
    annualNetIncome,
    monthlyNetIncome,
    actualInvestment,
    annualYieldPercent,
    capRatePercent,
    warnings,
  };
}
