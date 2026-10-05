import { describe, expect, it } from 'vitest';
import { calculateRealtyCommission } from '@/lib/finance/realty-commission';
import { calculateSavings } from '@/lib/finance/savings';

describe('Exact decimal commission and VAT truncation', () => {
  it.each([
    ['0.35', 500_000_000, 1_750_000, 175_000, 1_925_000],
    ['.35', 500_000_000, 1_750_000, 175_000, 1_925_000],
    ['0.3500', 500_000_000, 1_750_000, 175_000, 1_925_000],
    ['0.35', 499_999_999, 1_749_990, 174_990, 1_924_980],
    ['0.35', 500_000_001, 1_750_000, 175_000, 1_925_000],
    ['0.34999999999999999', 500_000_000, 1_749_990, 174_990, 1_924_980],
    ['0.35000000000000001', 500_000_000, 1_750_000, 175_000, 1_925_000],
    ['0.2345', 500_000_000, 1_172_500, 117_250, 1_289_750],
  ])(
    '%s%% at %i won preserves the independent decimal boundary',
    (text, price, fee, vat, total) => {
      const result = calculateRealtyCommission({
        transactionType: 'sale',
        propertyKind: 'house',
        salePrice: price,
        negotiatedRate: Number(text) / 100,
        negotiatedRatePercentText: text,
        includeVat: true,
      });
      expect(result.negotiatedCommission).toBe(fee);
      expect(result.vat).toBe(vat);
      expect(result.total).toBe(total);
      expect(result.bothSideTotal).toBe(total * 2);
    },
  );

  it('preserves literal numeric callers and their genuine below-boundary decimal', () => {
    for (const [rate, fee] of [
      [0.0035, 1_750_000],
      [0.0034999999999999996, 1_749_990],
    ]) {
      expect(
        calculateRealtyCommission({
          transactionType: 'sale',
          propertyKind: 'house',
          salePrice: 500_000_000,
          negotiatedRate: rate,
          includeVat: false,
        }).total,
      ).toBe(fee);
    }
  });

  it('compares the original percentage against the legal cap without Number rounding', () => {
    const result = calculateRealtyCommission({
      transactionType: 'sale',
      propertyKind: 'house',
      salePrice: 500_000_000,
      negotiatedRate: 0.004,
      negotiatedRatePercentText: '0.40000000000000001',
      includeVat: true,
    });
    expect(result.total).toBe(2_200_000);
    expect(result.warnings.some((text) => text.includes('초과'))).toBe(true);
  });

  it('supports scientific notation from numeric callers and keeps cap/limit behavior', () => {
    expect(
      calculateRealtyCommission({
        transactionType: 'sale',
        propertyKind: 'house',
        salePrice: 500_000_000,
        negotiatedRate: 1e-7,
        includeVat: true,
      }).total,
    ).toBe(50);
    expect(
      calculateRealtyCommission({
        transactionType: 'sale',
        propertyKind: 'house',
        salePrice: 50_000_000,
        includeVat: true,
      }).total,
    ).toBe(275_000);
  });

  it('uses positive original text even when the shifted numeric coefficient underflows', () => {
    const text = '0.' + '0'.repeat(322) + '1';
    const result = calculateRealtyCommission({
      transactionType: 'sale',
      propertyKind: 'house',
      salePrice: 500_000_000,
      negotiatedRate: Number(text + 'e-2'),
      negotiatedRatePercentText: text,
      includeVat: true,
    });
    expect(result.negotiatedCommission).toBe(0);
    expect(result.total).toBe(0);
  });
});

describe('Savings examples retain the existing monthly-start calculation assumptions', () => {
  it.each([
    ['simple', 12, 227_500, 35_030, 192_470],
    ['monthlyCompound', 12, 229_950, 35_410, 194_540],
    ['simple', 24, 875_000, 134_750, 740_250],
    ['monthlyCompound', 24, 894_880, 137_810, 757_070],
  ] as const)(
    '%s over %i months agrees with the published example',
    (method, months, pretax, tax, posttax) => {
      const result = calculateSavings({
        monthlyDeposit: 1_000_000,
        annualRatePercent: 3.5,
        termMonths: months,
        method,
        taxType: 'general',
      });
      expect(result.pretaxInterest).toBe(pretax);
      expect(result.tax).toBe(tax);
      expect(result.posttaxInterest).toBe(posttax);
      expect(result.maturityAmount).toBe(1_000_000 * months + posttax);
    },
  );
});
