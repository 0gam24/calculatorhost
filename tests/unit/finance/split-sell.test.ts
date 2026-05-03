import { describe, expect, it } from 'vitest';
import {
  calculateSplitSell,
  priceFromTargetReturn,
  targetReturnFromPrice,
  type SplitSellInput,
} from '@/lib/finance/split-sell';

function input(overrides: Partial<SplitSellInput> = {}): SplitSellInput {
  return {
    averagePrice: 10_000,
    holdingQuantity: 300,
    entries: [
      { price: 11_000, quantity: 100 },
      { price: 12_000, quantity: 100 },
      { price: 13_000, quantity: 100 },
    ],
    ...overrides,
  };
}

describe('calculateSplitSell — 기본 실현손익', () => {
  it('수수료/세금 없는 단순 매도: 손익 = (매도가 - 평단) × 수량', () => {
    const r = calculateSplitSell(input());
    expect(r.totalSoldQuantity).toBe(300);
    expect(r.remainingQuantity).toBe(0);
    // 1차: (11000-10000)×100 = 100,000
    // 2차: (12000-10000)×100 = 200,000
    // 3차: (13000-10000)×100 = 300,000
    expect(r.totalRealizedPnL).toBe(600_000);
  });

  it('차수별 누적 손익이 단계적으로 증가', () => {
    const r = calculateSplitSell(input());
    expect(r.entries[0]?.cumulativeRealizedPnL).toBe(100_000);
    expect(r.entries[1]?.cumulativeRealizedPnL).toBe(300_000);
    expect(r.entries[2]?.cumulativeRealizedPnL).toBe(600_000);
  });

  it('차수별 잔여 수량이 단계적으로 감소', () => {
    const r = calculateSplitSell(input());
    expect(r.entries[0]?.remainingQuantity).toBe(200);
    expect(r.entries[1]?.remainingQuantity).toBe(100);
    expect(r.entries[2]?.remainingQuantity).toBe(0);
  });

  it('차수별 수익률 (%) 정확', () => {
    const r = calculateSplitSell(input());
    expect(r.entries[0]?.realizedPnLPercent).toBeCloseTo(10, 1);
    expect(r.entries[1]?.realizedPnLPercent).toBeCloseTo(20, 1);
    expect(r.entries[2]?.realizedPnLPercent).toBeCloseTo(30, 1);
  });
});

describe('calculateSplitSell — 수수료·거래세 반영', () => {
  it('한국 주식 매도(수수료 0.015% + 거래세 0.18%) 차감 → 실현손익 감소', () => {
    const noFee = calculateSplitSell(input());
    const withFee = calculateSplitSell(input({ sellFeeRate: 0.015, taxRate: 0.18 }));
    expect(withFee.totalRealizedPnL).toBeLessThan(noFee.totalRealizedPnL);
    expect(withFee.totalFee).toBeGreaterThan(0);
    expect(withFee.totalTax).toBeGreaterThan(0);
  });

  it('총 매도금액 = 차수별 매도금액 합계 (gross)', () => {
    const r = calculateSplitSell(input({ sellFeeRate: 0.015, taxRate: 0.18 }));
    // 11000×100 + 12000×100 + 13000×100 = 3,600,000
    expect(r.totalGrossProceeds).toBe(3_600_000);
  });

  it('totalNetProceeds = gross - fee - tax', () => {
    const r = calculateSplitSell(input({ sellFeeRate: 0.015, taxRate: 0.18 }));
    expect(r.totalNetProceeds).toBe(r.totalGrossProceeds - r.totalFee - r.totalTax);
  });

  it('코인은 거래세 0 (수수료만 차감)', () => {
    const r = calculateSplitSell(input({ sellFeeRate: 0.05, taxRate: 0 }));
    expect(r.totalTax).toBe(0);
    expect(r.totalFee).toBeGreaterThan(0);
  });
});

describe('calculateSplitSell — 보유 수량 초과 매도 자동 조정', () => {
  it('차수 합계가 보유보다 크면 자동으로 잔여만큼만 매도 + 경고', () => {
    const r = calculateSplitSell(
      input({
        holdingQuantity: 150,
        entries: [
          { price: 11_000, quantity: 100 },
          { price: 12_000, quantity: 100 }, // 잔여 50만 매도 가능
        ],
      })
    );
    expect(r.entries[0]?.quantity).toBe(100);
    expect(r.entries[1]?.quantity).toBe(50);
    expect(r.totalSoldQuantity).toBe(150);
    expect(r.remainingQuantity).toBe(0);
    expect(r.warnings.some((w) => w.includes('초과'))).toBe(true);
  });

  it('잔여 0 후 추가 차수는 수량 0 처리', () => {
    const r = calculateSplitSell(
      input({
        holdingQuantity: 100,
        entries: [
          { price: 11_000, quantity: 100 },
          { price: 12_000, quantity: 100 },
        ],
      })
    );
    expect(r.entries[1]?.quantity).toBe(0);
    expect(r.entries[1]?.realizedPnL).toBe(0);
  });
});

describe('calculateSplitSell — 부분 매도 시나리오', () => {
  it('보유 300주 중 100주만 매도 → 잔여 200주', () => {
    const r = calculateSplitSell(
      input({
        entries: [{ price: 11_000, quantity: 100 }],
      })
    );
    expect(r.totalSoldQuantity).toBe(100);
    expect(r.remainingQuantity).toBe(200);
    expect(r.totalRealizedPnL).toBe(100_000);
  });

  it('손해 매도(매도가 < 평단) → 음수 손익', () => {
    const r = calculateSplitSell(
      input({
        entries: [{ price: 8_000, quantity: 100 }],
      })
    );
    expect(r.totalRealizedPnL).toBe(-200_000);
    expect(r.entries[0]?.realizedPnLPercent).toBeCloseTo(-20, 1);
  });
});

describe('calculateSplitSell — 면책 경고', () => {
  it('항상 투자 권유 아님 경고 포함', () => {
    const r = calculateSplitSell(input());
    expect(r.warnings.some((w) => w.includes('투자'))).toBe(true);
  });

  it('빈 차수 → 경고', () => {
    const r = calculateSplitSell(input({ entries: [] }));
    expect(r.warnings.some((w) => w.includes('차수'))).toBe(true);
  });
});

describe('priceFromTargetReturn / targetReturnFromPrice 환산', () => {
  it('평단 10000, 목표 수익률 +20% → 매도가 12000', () => {
    expect(priceFromTargetReturn(10_000, 20)).toBe(12_000);
  });

  it('평단 10000, 매도가 13000 → 수익률 30%', () => {
    expect(targetReturnFromPrice(10_000, 13_000)).toBeCloseTo(30, 1);
  });

  it('평단 0 → 환산 0 안전 처리', () => {
    expect(priceFromTargetReturn(0, 20)).toBe(0);
    expect(targetReturnFromPrice(0, 12_000)).toBe(0);
  });
});
