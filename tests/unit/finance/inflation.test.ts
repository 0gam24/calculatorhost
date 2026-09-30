import { describe, expect, it } from 'vitest';
import { calculateInflation, type InflationInput } from '@/lib/finance/inflation';

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
      }),
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
      }),
    );

    expect(result.resultAmount).toBe(result.originalAmount);
  });

  it('기간 0년 → 결과 = 입력값', () => {
    const result = calculateInflation(
      createInput({
        mode: 'futureValue',
        years: 0,
      }),
    );

    expect(result.resultAmount).toBe(result.originalAmount);
  });
});

describe('calculateInflation — presentValue', () => {
  it('미래에 받을 1억의 오늘 기준 구매력 ≈ 7820만', () => {
    const result = calculateInflation(
      createInput({
        mode: 'presentValue',
        amount: 100_000_000,
        years: 10,
        annualInflationPercent: 2.5,
      }),
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

describe('inflation meaning and amount-unit regressions', () => {
  it('1,000만 원·1년·2%: 같은 물건의 미래 비용과 추가 필요 금액', () => {
    const result = calculateInflation(
      createInput({ amount: 10_000_000, years: 1, annualInflationPercent: 2 }),
    );
    expect(result.resultAmount).toBe(10_200_000);
    expect(result.resultAmount - result.originalAmount).toBe(200_000);
    expect(result.annualEquivalent).toBe(200_000); // KRW/year, not percent
    expect(result.totalInflationPercent).toBeCloseTo(2, 10);
  });

  it.each(['presentValue', 'purchasingPower'] as const)(
    '1,000만 원·1년·2%%: %s 구매력 환산',
    (mode) => {
      const result = calculateInflation(
        createInput({ mode, amount: 10_000_000, years: 1, annualInflationPercent: 2 }),
      );
      expect(result.resultAmount).toBe(9_803_921);
      expect(result.originalAmount - result.resultAmount).toBe(196_079);
      expect(result.annualEquivalent).toBe(196_079);
    },
  );

  it('10년 예시의 비용 증가와 구매력 감소를 구분한다', () => {
    const input = createInput({ amount: 10_000_000, years: 10, annualInflationPercent: 2 });
    const cost = calculateInflation(input);
    const power = calculateInflation({ ...input, mode: 'purchasingPower' });
    // Independent decimal fixtures: 1.02^10 = 1.218994419994757...
    expect(cost.resultAmount).toBe(12_189_944);
    expect(cost.annualEquivalent).toBe(218_994);
    expect(power.resultAmount).toBe(8_203_482);
    expect(power.annualEquivalent).toBe(179_651);
    expect(cost.totalInflationPercent).toBeCloseTo(21.899441999, 7);
  });

  it.each(['futureValue', 'presentValue', 'purchasingPower'] as const)(
    '%s: 0원·0년·0%%의 경계를 구분한다',
    (mode) => {
      const input = createInput({ mode, amount: 10_000_000, years: 10, annualInflationPercent: 2 });
      expect(calculateInflation({ ...input, amount: 0 }).resultAmount).toBe(0);
      expect(calculateInflation({ ...input, years: 0 }).annualEquivalent).toBe(0);
      expect(calculateInflation({ ...input, years: 0 }).resultAmount).toBe(10_000_000);
      expect(calculateInflation({ ...input, annualInflationPercent: 0 }).resultAmount).toBe(
        10_000_000,
      );
    },
  );

  it('원 미만으로 버려지는 변화는 연평균 0원이 될 수 있다', () => {
    const result = calculateInflation(
      createInput({ amount: 1, years: 1, annualInflationPercent: 0.01 }),
    );
    expect(result.resultAmount).toBe(1);
    expect(result.annualEquivalent).toBe(0);
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
      }),
    );

    expect(result.resultAmount).toBeGreaterThan(78_000_000);
    expect(result.resultAmount).toBeLessThan(79_000_000);
  });

  it('purchasingPower = presentValue (동일 공식)', () => {
    const pp = calculateInflation(createInput({ mode: 'purchasingPower' }));
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
      }),
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
    const result = calculateInflation(createInput({ annualInflationPercent: 15 }));

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
