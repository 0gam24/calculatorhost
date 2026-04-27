/**
 * 주식 물타기(평균단가 하향) 계산 단위 테스트
 */

import { describe, expect, it } from 'vitest';
import {
  calculateNewAverage,
  calculateQuantityForTargetAverage,
  type AveragingDownInput,
  type TargetAverageInput,
} from '@/lib/finance/averaging-down';

function createAveragingInput(
  overrides: Partial<AveragingDownInput>
): AveragingDownInput {
  return {
    currentPosition: { price: 50_000, quantity: 100 },
    additionalPurchase: { price: 40_000, quantity: 50 },
    ...overrides,
  };
}

function createTargetInput(
  overrides: Partial<TargetAverageInput>
): TargetAverageInput {
  return {
    currentPosition: { price: 50_000, quantity: 100 },
    newPurchasePrice: 40_000,
    targetAveragePrice: 45_000,
    ...overrides,
  };
}

describe('calculateNewAverage — 기본 평균단가', () => {
  it('50000 × 100 + 40000 × 50 = 평균 46666원', () => {
    const result = calculateNewAverage(createAveragingInput({}));

    expect(result.totalQuantity).toBe(150);
    expect(result.totalInvestment).toBe(7_000_000);
    expect(result.averagePrice).toBe(46_666);
  });

  it('추가 매수가 낮음 → 평균 하향 (-6.67%)', () => {
    const result = calculateNewAverage(createAveragingInput({}));

    expect(result.costBasisChangePercent).toBeCloseTo(-6.67, 1);
  });

  it('추가 매수가 높음 → 평균 상향', () => {
    const result = calculateNewAverage(
      createAveragingInput({
        currentPosition: { price: 40_000, quantity: 100 },
        additionalPurchase: { price: 50_000, quantity: 100 },
      })
    );

    expect(result.costBasisChangePercent).toBeCloseTo(12.5, 1);
  });

  it('추가 수량 0 → 평균 = 기존, warning', () => {
    const result = calculateNewAverage(
      createAveragingInput({
        additionalPurchase: { price: 40_000, quantity: 0 },
      })
    );

    expect(result.totalQuantity).toBe(100);
    expect(result.averagePrice).toBe(50_000);
    expect(result.warnings.some((w) => w.includes('추가'))).toBe(true);
  });

  it('반드시 투자 면책 경고', () => {
    const result = calculateNewAverage(createAveragingInput({}));
    expect(result.warnings.some((w) => w.includes('투자'))).toBe(true);
  });
});

describe('calculateQuantityForTargetAverage — 기본 계산', () => {
  it('목표 45000 달성: 추가 100주 필요', () => {
    const result = calculateQuantityForTargetAverage(createTargetInput({}));

    expect(result.achievable).toBe(true);
    expect(result.requiredAdditionalQuantity).toBe(100);
    expect(result.requiredAdditionalCost).toBe(4_000_000);
  });

  it('목표가 기존가보다 높으면 불가능', () => {
    const result = calculateQuantityForTargetAverage(
      createTargetInput({
        targetAveragePrice: 55_000,
      })
    );

    expect(result.achievable).toBe(false);
    expect(result.warnings.some((w) => w.includes('달성'))).toBe(true);
  });

  it('새 매수가 >= 목표가 → 불가능', () => {
    const result = calculateQuantityForTargetAverage(
      createTargetInput({
        newPurchasePrice: 50_000,
        targetAveragePrice: 50_000,
      })
    );

    expect(result.achievable).toBe(false);
  });

  it('기존 보유 0 → 불가능', () => {
    const result = calculateQuantityForTargetAverage(
      createTargetInput({
        currentPosition: { price: 50_000, quantity: 0 },
      })
    );

    expect(result.achievable).toBe(false);
  });

  it('반드시 투자 면책 경고', () => {
    const result = calculateQuantityForTargetAverage(createTargetInput({}));
    expect(result.warnings.some((w) => w.includes('투자'))).toBe(true);
  });
});

describe('calculateNewAverage — 실제 시나리오', () => {
  it('50000 × 100주, 40000 × 100주 추가 = 평균 45000', () => {
    const result = calculateNewAverage({
      currentPosition: { price: 50_000, quantity: 100 },
      additionalPurchase: { price: 40_000, quantity: 100 },
    });

    expect(result.averagePrice).toBe(45_000);
    expect(result.totalQuantity).toBe(200);
    expect(result.costBasisChangePercent).toBeCloseTo(-10, 1);
  });
});

describe('calculateQuantityForTargetAverage — 실제 시나리오', () => {
  it('50000 × 100주에서 45000으로 평균 내리려면 40000 × 100주 필요', () => {
    const result = calculateQuantityForTargetAverage({
      currentPosition: { price: 50_000, quantity: 100 },
      newPurchasePrice: 40_000,
      targetAveragePrice: 45_000,
    });

    expect(result.achievable).toBe(true);
    expect(result.requiredAdditionalQuantity).toBe(100);
  });
});
