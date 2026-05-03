import { describe, expect, it } from 'vitest';
import {
  calculateSplitBuy,
  generateEqualSplit,
  type SplitBuyInput,
} from '@/lib/finance/split-buy';

function input(overrides: Partial<SplitBuyInput> = {}): SplitBuyInput {
  return {
    entries: [
      { price: 10_000, quantity: 100 },
      { price: 8_000, quantity: 100 },
      { price: 6_000, quantity: 100 },
    ],
    ...overrides,
  };
}

describe('calculateSplitBuy — 가중평균 평단가', () => {
  it('3차 분할매수: 평균단가 = (1,000,000 + 800,000 + 600,000) / 300 = 8,000원', () => {
    const r = calculateSplitBuy(input());
    expect(r.totalQuantity).toBe(300);
    expect(r.totalAmount).toBe(2_400_000);
    expect(r.averagePrice).toBe(8_000);
  });

  it('차수가 다른 수량으로 가중평균 정확히 계산 (10000×100 + 5000×400 = 평균 6000)', () => {
    const r = calculateSplitBuy(
      input({
        entries: [
          { price: 10_000, quantity: 100 },
          { price: 5_000, quantity: 400 },
        ],
      })
    );
    expect(r.totalQuantity).toBe(500);
    expect(r.totalAmount).toBe(3_000_000);
    expect(r.averagePrice).toBe(6_000);
  });

  it('단일 차수도 동작 + 경고 출력', () => {
    const r = calculateSplitBuy(
      input({ entries: [{ price: 10_000, quantity: 50 }] })
    );
    expect(r.totalQuantity).toBe(50);
    expect(r.averagePrice).toBe(10_000);
    expect(r.warnings.some((w) => w.includes('1개'))).toBe(true);
  });

  it('빈 입력 → 0 결과 + 경고', () => {
    const r = calculateSplitBuy({ entries: [] });
    expect(r.totalQuantity).toBe(0);
    expect(r.averagePrice).toBe(0);
    expect(r.warnings.some((w) => w.includes('차수'))).toBe(true);
  });

  it('수량 0 또는 단가 0 인 차수는 누적에서 제외 (경고)', () => {
    const r = calculateSplitBuy(
      input({
        entries: [
          { price: 10_000, quantity: 100 },
          { price: 0, quantity: 100 },
          { price: 5_000, quantity: 0 },
        ],
      })
    );
    expect(r.totalQuantity).toBe(100);
    expect(r.averagePrice).toBe(10_000);
  });

  it('음수/NaN 입력은 0으로 안전 처리', () => {
    const r = calculateSplitBuy(
      input({
        entries: [
          { price: -1, quantity: 100 },
          { price: 10_000, quantity: -50 },
          { price: NaN, quantity: 100 },
          { price: 8_000, quantity: 100 },
        ],
      })
    );
    expect(r.totalQuantity).toBe(100);
    expect(r.averagePrice).toBe(8_000);
  });
});

describe('calculateSplitBuy — 차수별 누적 평단 추이', () => {
  it('각 차수마다 누적 평균이 단계적으로 변화', () => {
    const r = calculateSplitBuy(input());
    expect(r.entries).toHaveLength(3);
    expect(r.entries[0]?.cumulativeAverage).toBe(10_000); // 1차
    expect(r.entries[1]?.cumulativeAverage).toBe(9_000); // (1,000,000 + 800,000) / 200
    expect(r.entries[2]?.cumulativeAverage).toBe(8_000); // (2,400,000) / 300
  });

  it('차수 번호가 1부터 순차 증가', () => {
    const r = calculateSplitBuy(input());
    expect(r.entries.map((e) => e.step)).toEqual([1, 2, 3]);
  });
});

describe('calculateSplitBuy — 수수료 포함 실효 평단가', () => {
  it('수수료 0.015% 적용 시 effectiveAveragePrice 가 averagePrice 보다 약간 높음', () => {
    const r = calculateSplitBuy(input({ buyFeeRate: 0.015 }));
    expect(r.averagePrice).toBe(8_000);
    expect(r.effectiveAveragePrice).toBeGreaterThan(r.averagePrice);
    expect(r.totalFee).toBe(360); // 2,400,000 × 0.015% = 360
  });

  it('수수료 0% 또는 미입력 → effectiveAveragePrice = averagePrice', () => {
    const r = calculateSplitBuy(input());
    expect(r.effectiveAveragePrice).toBe(r.averagePrice);
    expect(r.totalFee).toBe(0);
  });

  it('비정상 수수료(음수, 100% 이상)는 0으로 처리', () => {
    const r1 = calculateSplitBuy(input({ buyFeeRate: -1 }));
    const r2 = calculateSplitBuy(input({ buyFeeRate: 150 }));
    expect(r1.totalFee).toBe(0);
    expect(r2.totalFee).toBe(0);
  });
});

describe('calculateSplitBuy — 손익분기점(BEP)', () => {
  it('수수료/세금 없으면 BEP = 평단', () => {
    const r = calculateSplitBuy(input());
    expect(r.breakEvenPrice).toBe(r.averagePrice);
  });

  it('한국 주식 매도 시 거래세 0.18% 적용 → BEP > 평단', () => {
    const r = calculateSplitBuy(
      input({ buyFeeRate: 0.015, sellFeeRate: 0.015, taxRate: 0.18 })
    );
    expect(r.breakEvenPrice).toBeGreaterThan(r.averagePrice);
    // 평단 8000 × (1 + 0.00015) ÷ (1 - 0.00015 - 0.0018) ≈ 8017
    expect(r.breakEvenPrice).toBeGreaterThanOrEqual(8_015);
    expect(r.breakEvenPrice).toBeLessThanOrEqual(8_020);
  });
});

describe('calculateSplitBuy — 면책 경고', () => {
  it('항상 투자 권유 아님 경고 포함', () => {
    const r = calculateSplitBuy(input());
    expect(r.warnings.some((w) => w.includes('투자'))).toBe(true);
  });
});

describe('generateEqualSplit — 균등분할 헬퍼', () => {
  it('총 300만원, 3회 분할, 단가 [10000, 8000, 6000] → 차수별 수량 [100, 125, 166]', () => {
    const r = generateEqualSplit({
      totalAmount: 3_000_000,
      prices: [10_000, 8_000, 6_000],
    });
    expect(r.perStepAmount).toBe(1_000_000);
    expect(r.entries).toEqual([
      { price: 10_000, quantity: 100 },
      { price: 8_000, quantity: 125 },
      { price: 6_000, quantity: 166 },
    ]);
  });

  it('단가 0 인 차수는 수량 0', () => {
    const r = generateEqualSplit({
      totalAmount: 1_000_000,
      prices: [10_000, 0, 5_000],
    });
    expect(r.entries[1]?.quantity).toBe(0);
  });

  it('빈 prices 또는 totalAmount 0 → 빈 결과', () => {
    expect(generateEqualSplit({ totalAmount: 0, prices: [10_000] }).entries).toEqual([]);
    expect(generateEqualSplit({ totalAmount: 100_000, prices: [] }).entries).toEqual([]);
  });
});

describe('calculateSplitBuy — 실제 시나리오: 코인 균등 분할매수', () => {
  it('총 600만원, 3회 균등분할, 단가 변동 시 평단 정확', () => {
    const split = generateEqualSplit({
      totalAmount: 6_000_000,
      prices: [60_000, 50_000, 40_000],
    });
    const r = calculateSplitBuy({ entries: split.entries });
    // 60000×33 + 50000×40 + 40000×50 = 1,980,000 + 2,000,000 + 2,000,000 = 5,980,000
    // 총수량 = 33 + 40 + 50 = 123
    // 평단 ≈ 48,617
    expect(r.totalQuantity).toBe(123);
    expect(r.averagePrice).toBe(48_617);
  });
});
