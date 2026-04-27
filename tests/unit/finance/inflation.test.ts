import { describe, expect, it } from 'vitest';
import {
  calculateInflation,
  type InflationInput,
} from '@/lib/finance/inflation';

function createInput(overrides: Partial<InflationInput>): InflationInput {
  return {
    mode: 'futureValue',
    amount: 100_000_000,
    years: 10,
    annualInflationPercent: 2.5,
    ...overrides,
  };
}

describe('calculateInflation — futureValue', () => {
  it('현재 1억 × 2.5% × 10년 ≈ 1.28억', () => {
    const result = calculateInflation(
      createInput({
        mode: 'futureValue',
        amount: 100_000_000,
        years: 10,
        annualInflationPercent: 2.5,
      })
    );

    expect(result.resultAmount).toBeGreaterThan(127_000_000);
    expect(result.resultAmount).toBeLessThan(129_000_000);
  });

  it('인플레이션 0% → 미래가 = 현재가', () => {
    const result = calculateInflation(
      createInput({
        mode: 'futureValue',
        amount: 100_000_000,
        years: 10,
        annualInflationPercent: 0,
      })
    );

    expect(result.resultAmount).toBe(result.originalAmount);
  });

  it('기간 0년 → 결과 = 입력값', () => {
    const result = calculateInflation(
      createInput({
        mode: 'futureValue',
        years: 0,
      })
    );

    expect(result.resultAmount).toBe(result.originalAmount);
  });
});

describe('calculateInflation — presentValue', () => {
  it('과거 1억 (10년 전) ≈ 현재 7820만', () => {
    const result = calculateInflation(
      createInput({
        mode: 'presentValue',
        amount: 100_000_000,
        years: 10,
        annualInflationPercent: 2.5,
      })
    );

    expect(result.resultAmount).toBeGreaterThan(78_000_000);
    expect(result.resultAmount).toBeLessThan(79_000_000);
    expect(result.resultAmount).toBeLessThan(result.originalAmount);
  });

  it('미래가 vs 현재가 역관계', () => {
    const futureResult = calculateInflation(createInput({ mode: 'futureValue' }));
    const presentResult = calculateInflation(createInput({ mode: 'presentValue' }));

    expect(futureResult.resultAmount).toBeGreaterThan(100_000_000);
    expect(presentResult.resultAmount).toBeLessThan(100_000_000);
  });
});

describe('calculateInflation — purchasingPower', () => {
  it('현재 1억의 10년 후 실질 구매력 ≈ 7820만', () => {
    const result = calculateInflation(
      createInput({
        mode: 'purchasingPower',
        amount: 100_000_000,
        years: 10,
        annualInflationPercent: 2.5,
      })
    );

    expect(result.resultAmount).toBeGreaterThan(78_000_000);
    expect(result.resultAmount).toBeLessThan(79_000_000);
  });

  it('purchasingPower = presentValue (동일 공식)', () => {
    const pp = calculateInflation(
      createInput({ mode: 'purchasingPower' })
    );
    const pv = calculateInflation(createInput({ mode: 'presentValue' }));

    expect(pp.resultAmount).toBe(pv.resultAmount);
  });
});

describe('calculateInflation — 누적율', () => {
  it('2.5% × 10년 ≈ 28.0% 누적', () => {
    const result = calculateInflation(createInput({}));

    expect(result.totalInflationPercent).toBeCloseTo(28.0, 1);
  });

  it('인플레 0% → 누적율 0%', () => {
    const result = calculateInflation(
      createInput({
        annualInflationPercent: 0,
      })
    );

    expect(result.totalInflationPercent).toBe(0);
  });
});

describe('calculateInflation — 검증', () => {
  it('금액 0 → warning', () => {
    const result = calculateInflation(createInput({ amount: 0 }));
    expect(result.warnings.some((w) => w.includes('금액'))).toBe(true);
  });

  it('인플레 > 10% → warning', () => {
    const result = calculateInflation(
      createInput({ annualInflationPercent: 15 })
    );

    expect(result.warnings.some((w) => w.includes('10%'))).toBe(true);
  });

  it('기간 > 100년 → warning', () => {
    const result = calculateInflation(createInput({ years: 150 }));
    expect(result.warnings.some((w) => w.includes('100'))).toBe(true);
  });

  it('반드시 참고용 경고 포함', () => {
    const result = calculateInflation(createInput({}));
    expect(result.warnings.some((w) => w.includes('참고'))).toBe(true);
  });
});
