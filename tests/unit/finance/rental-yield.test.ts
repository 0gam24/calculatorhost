import { describe, expect, it } from 'vitest';
import {
  calculateRentalYield,
  type RentalYieldInput,
} from '@/lib/finance/rental-yield';

function createInput(overrides: Partial<RentalYieldInput>): RentalYieldInput {
  return {
    purchasePrice: 500_000_000,
    depositReceived: 100_000_000,
    acquisitionCosts: 10_000_000,
    monthlyRent: 3_000_000,
    monthlyExpenses: 500_000,
    vacancyRatePercent: 5,
    ...overrides,
  };
}

describe('calculateRentalYield — 기본 수익률', () => {
  it('월 300만 임대료, 공실률 5%, 월 경비 50만', () => {
    const result = calculateRentalYield(createInput({}));

    expect(result.annualGrossIncome).toBe(36_000_000);
    expect(result.annualEffectiveIncome).toBe(34_200_000);
    expect(result.annualNetIncome).toBe(28_200_000);
    expect(result.actualInvestment).toBe(410_000_000);
    expect(result.annualYieldPercent).toBeCloseTo(6.88, 1);
  });

  it('보증금 0 (월세): 실투자금 = 매매가 + 취득비', () => {
    const result = calculateRentalYield(
      createInput({
        purchasePrice: 500_000_000,
        depositReceived: 0,
        acquisitionCosts: 5_000_000,
      })
    );

    expect(result.actualInvestment).toBe(505_000_000);
  });

  it('공실률 0% → 유효수입 = 총수입', () => {
    const result = calculateRentalYield(
      createInput({
        monthlyRent: 2_000_000,
        vacancyRatePercent: 0,
      })
    );

    expect(result.annualEffectiveIncome).toBe(24_000_000);
  });

  it('경비 > 임대료 → 순수입 0 + 경고', () => {
    const result = calculateRentalYield(
      createInput({
        monthlyRent: 1_000_000,
        monthlyExpenses: 2_000_000,
        vacancyRatePercent: 0,
      })
    );

    expect(result.annualNetIncome).toBe(0);
    expect(result.warnings.some((w) => w.includes('경비'))).toBe(true);
  });

  it('연수익률과 Cap Rate: 보증금 높으면 연수익률 > Cap Rate', () => {
    const result = calculateRentalYield(
      createInput({
        purchasePrice: 500_000_000,
        depositReceived: 100_000_000,
        acquisitionCosts: 0,
        monthlyRent: 3_000_000,
        monthlyExpenses: 300_000,
        vacancyRatePercent: 0,
      })
    );

    expect(result.annualYieldPercent).toBeGreaterThan(result.capRatePercent);
  });

  it('반드시 교육용 경고 포함', () => {
    const result = calculateRentalYield(createInput({}));
    expect(result.warnings.some((w) => w.includes('교육'))).toBe(true);
  });
});

describe('calculateRentalYield — 검증', () => {
  it('월 경비 높으면 경고', () => {
    const result = calculateRentalYield(
      createInput({
        purchasePrice: 1_000_000_000,
        depositReceived: 0,
        monthlyRent: 2_000_000,
        monthlyExpenses: 500_000,
        vacancyRatePercent: 0,
      })
    );

    expect(result.annualNetIncome).toBeGreaterThan(0);
  });

  it('음수 입력 → 0으로 정규화', () => {
    const result = calculateRentalYield(
      createInput({
        purchasePrice: -100_000_000,
        monthlyRent: -2_000_000,
      })
    );

    expect(result.annualGrossIncome).toBe(0);
  });
});
