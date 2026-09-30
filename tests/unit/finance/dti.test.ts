import { describe, expect, it } from 'vitest';
import { calculateDebtToIncome } from '@/lib/finance/dti';

describe('DTI annual repayment ratio', () => {
  it('includes mortgage principal+interest and other-debt interest', () => {
    const result = calculateDebtToIncome({
      annualIncome: 60_000_000,
      mortgageAnnualPayment: 12_000_000,
      otherLoanAnnualInterest: 2_000_000,
    });
    expect(result.annualDebtPayment).toBe(14_000_000);
    expect(result.ratio).toBeCloseTo(0.2333333333);
  });
  it.each([19_999_999, 20_000_000, 20_000_001])(
    'preserves the 40%% boundary at annual repayment %i',
    (mortgageAnnualPayment) => {
      expect(
        calculateDebtToIncome({
          annualIncome: 50_000_000,
          mortgageAnnualPayment,
          otherLoanAnnualInterest: 0,
        }).ratio,
      ).toBe(mortgageAnnualPayment / 50_000_000);
    },
  );
  it('distinguishes zero income from a zero repayment ratio', () => {
    expect(
      calculateDebtToIncome({
        annualIncome: 0,
        mortgageAnnualPayment: 0,
        otherLoanAnnualInterest: 0,
      }).ratio,
    ).toBeNull();
    expect(
      calculateDebtToIncome({
        annualIncome: 0,
        mortgageAnnualPayment: 1_000,
        otherLoanAnnualInterest: 0,
      }).ratio,
    ).toBeNull();
    expect(
      calculateDebtToIncome({
        annualIncome: 50_000_000,
        mortgageAnnualPayment: 0,
        otherLoanAnnualInterest: 0,
      }).ratio,
    ).toBe(0);
  });
  it('does not cap repayment ratios greater than 100%', () => {
    expect(
      calculateDebtToIncome({
        annualIncome: 10_000_000,
        mortgageAnnualPayment: 12_000_000,
        otherLoanAnnualInterest: 1_000_000,
      }).ratio,
    ).toBe(1.3);
  });
  it.each([-1, NaN, Infinity])('rejects invalid annual amounts %s', (value) => {
    for (const key of ['annualIncome', 'mortgageAnnualPayment', 'otherLoanAnnualInterest']) {
      expect(() =>
        calculateDebtToIncome({
          annualIncome: 50_000_000,
          mortgageAnnualPayment: 0,
          otherLoanAnnualInterest: 0,
          [key]: value,
        }),
      ).toThrow(RangeError);
    }
  });
});
