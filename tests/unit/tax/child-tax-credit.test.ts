import { describe, expect, it } from 'vitest';
import { calculateChildTaxCredit, type ChildTaxCreditInput } from '@/lib/tax/child-tax-credit';
const base: ChildTaxCreditInput = {
  householdType: 'dualEarner',
  totalAnnualIncome: 20_000_000,
  annualGrossPay: 20_000_000,
  childCount: 2,
  passesAssetTest: true,
  householdAssets: 100_000_000,
};
describe('2026 child benefit statutory annual formula estimate', () => {
  it('pays the per-child maximum below household phase-out', () => {
    expect(calculateChildTaxCredit(base).finalPayment).toBe(2_000_000);
  });
  it.each(['singleEarner', 'dualEarner'] as const)(
    '%s applies the phase-out boundary',
    (householdType) => {
      const start = householdType === 'singleEarner' ? 21_000_000 : 25_000_000;
      for (const annualGrossPay of [start - 1, start, start + 1])
        expect(
          calculateChildTaxCredit({ ...base, householdType, annualGrossPay }).finalPayment,
        ).toBe(annualGrossPay <= start ? 2_000_000 : 1_999_990);
    },
  );
  it('uses half the maximum reduction at the midpoint', () => {
    expect(calculateChildTaxCredit({ ...base, annualGrossPay: 47_500_000 }).finalPayment).toBe(
      1_500_000,
    );
    expect(
      calculateChildTaxCredit({
        ...base,
        householdType: 'singleEarner',
        annualGrossPay: 45_500_000,
      }).finalPayment,
    ).toBe(1_500_000);
  });
  it('separates total-income eligibility from gross-pay calculation', () => {
    expect(
      calculateChildTaxCredit({
        ...base,
        totalAnnualIncome: 69_000_000,
        annualGrossPay: 20_000_000,
      }).finalPayment,
    ).toBe(2_000_000);
    expect(
      calculateChildTaxCredit({
        ...base,
        totalAnnualIncome: 70_000_000,
        annualGrossPay: 20_000_000,
      }).finalPayment,
    ).toBe(0);
  });
  it.each([69_999_999, 70_000_000, 70_000_001])('income upper boundary %i', (totalAnnualIncome) => {
    expect(
      calculateChildTaxCredit({ ...base, totalAnnualIncome, annualGrossPay: totalAnnualIncome })
        .finalPayment,
    ).toBe(totalAnnualIncome < 70_000_000 ? 1_000_000 : 0);
  });
  it.each([169_999_999, 170_000_000, 239_999_999, 240_000_000, 240_000_001])(
    'asset boundary %i',
    (householdAssets) => {
      expect(calculateChildTaxCredit({ ...base, householdAssets }).finalPayment).toBe(
        householdAssets < 170_000_000 ? 2_000_000 : householdAssets < 240_000_000 ? 1_000_000 : 0,
      );
    },
  );
  it('excludes no-child,failed asset,single-household and no-earnings', () => {
    for (const input of [
      { childCount: 0 },
      { childCount: -1 },
      { householdType: 'single' as const },
      { passesAssetTest: false },
      { annualGrossPay: 0 },
    ])
      expect(calculateChildTaxCredit({ ...base, ...input }).finalPayment).toBe(0);
  });
  it.each([-1, NaN, Infinity])('rejects invalid incomes/assets %s', (value) => {
    for (const key of ['totalAnnualIncome', 'annualGrossPay', 'householdAssets'])
      expect(() => calculateChildTaxCredit({ ...base, [key]: value })).toThrow(RangeError);
  });
  it('makes legacy assumptions visible', () => {
    expect(
      calculateChildTaxCredit({
        householdType: 'dualEarner',
        totalAnnualIncome: 20_000_000,
        childCount: 1,
        passesAssetTest: true,
      }).warnings.join(' '),
    ).toContain('가정');
  });
});
