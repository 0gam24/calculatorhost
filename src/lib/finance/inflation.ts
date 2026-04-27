export type InflationMode = 'futureValue' | 'presentValue' | 'purchasingPower';

export interface InflationInput {
  mode: InflationMode;
  amount: number;
  years: number;
  annualInflationPercent: number;
}

export interface InflationResult {
  originalAmount: number;
  resultAmount: number;
  totalInflationPercent: number;
  annualEquivalent: number;
  warnings: string[];
}

function normalizeAmount(amount: number): number {
  return Math.max(0, amount);
}

function normalizeYears(years: number): number {
  return Math.max(0, Math.round(years));
}

function normalizePercent(percent: number): number {
  return Math.max(0, percent);
}

export function calculateInflation(input: InflationInput): InflationResult {
  const warnings: string[] = [];

  const amount = normalizeAmount(input.amount);
  const years = normalizeYears(input.years);
  const inflationPercent = normalizePercent(input.annualInflationPercent);

  let resultAmount = amount;

  if (years === 0 || inflationPercent === 0) {
    resultAmount = amount;
  } else {
    const inflationFactor = Math.pow(1 + inflationPercent / 100, years);

    switch (input.mode) {
      case 'futureValue':
        resultAmount = Math.floor(amount * inflationFactor);
        break;
      case 'presentValue':
      case 'purchasingPower':
        resultAmount = Math.floor(amount / inflationFactor);
        break;
      default:
        resultAmount = Math.floor(amount * inflationFactor);
    }
  }

  const totalInflationPercent = years > 0
    ? (Math.pow(1 + inflationPercent / 100, years) - 1) * 100
    : 0;

  let annualEquivalent = 0;
  if (years > 0) {
    const change = Math.abs(resultAmount - amount);
    annualEquivalent = Math.floor(change / years);
  }

  if (amount === 0) warnings.push('금액이 0으로 입력되었습니다.');
  if (years === 0) warnings.push('기간이 0년입니다.');
  if (inflationPercent === 0) warnings.push('연 인플레이션이 0%로 설정되었습니다.');
  if (inflationPercent > 10) warnings.push('연 인플레이션이 10% 이상입니다.');
  if (years > 100) warnings.push('100년 이상의 장기 계산입니다.');
  warnings.push('본 계산기는 참고용입니다.');

  return {
    originalAmount: amount,
    resultAmount,
    totalInflationPercent,
    annualEquivalent,
    warnings,
  };
}
