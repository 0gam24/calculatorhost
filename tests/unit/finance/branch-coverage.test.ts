/**
 * finance/** 브랜치 커버리지 보강 — 기존 단위 테스트가 누락한 엣지 분기를 명시적으로 검증.
 * (YORO+TDD 룰의 finance branches 88% 임계 달성용)
 */

import { describe, expect, it } from 'vitest';
import { calculateQuantityForTargetAverage } from '@/lib/finance/averaging-down';
import {
  calculateLoanLimit,
  calculatePrincipalFromMonthlyPayment,
} from '@/lib/finance/loan-limit';
import { calculateSplitSell } from '@/lib/finance/split-sell';

describe('averaging-down — 미커버 분기', () => {
  it('currentQuantity=0 → achievable=false + 보유수량 0 경고', () => {
    const r = calculateQuantityForTargetAverage({
      currentPosition: { price: 50_000, quantity: 0 },
      newPurchasePrice: 40_000,
      targetAveragePrice: 45_000,
    });
    expect(r.achievable).toBe(false);
    expect(r.warnings.some((w) => w.includes('기존 보유 수량이 0'))).toBe(true);
  });

  it('필요수량이 기존량의 10배 초과 시 경고 (line 113-115)', () => {
    // 목표가가 매우 낮고 새 매수가가 그보다 약간만 낮으면 필요 수량이 폭증
    const r = calculateQuantityForTargetAverage({
      currentPosition: { price: 50_000, quantity: 10 },
      newPurchasePrice: 1_000,
      targetAveragePrice: 1_100,
    });
    expect(r.achievable).toBe(true);
    expect(r.requiredAdditionalQuantity).toBeGreaterThan(10 * 10);
    expect(r.warnings.some((w) => w.includes('10배 이상'))).toBe(true);
  });

  it('newPurchasePrice = targetAveragePrice 분기 (분모 0 회피)', () => {
    const r = calculateQuantityForTargetAverage({
      currentPosition: { price: 50_000, quantity: 100 },
      newPurchasePrice: 45_000,
      targetAveragePrice: 45_000,
    });
    // newPurchasePrice >= targetAveragePrice 가드에 의해 achievable=false
    expect(r.achievable).toBe(false);
  });
});

describe('loan-limit — 미커버 분기', () => {
  it('bindingConstraint = DTI 분기 (DSR/LTV/collateral 모두 아닐 때)', () => {
    // 시나리오: 비은행권(DSR=50%)·조정지역(DTI=40%, LTV=50%)·스트레스 OFF
    // → DSR 한도(50%) > DTI 한도(40%), 담보 충분 → DTI 가 결정적
    const r = calculateLoanLimit({
      annualIncome: 100_000_000,
      existingDebtAnnualPayment: 0,
      existingDebtAnnualInterest: 0,
      collateralValue: 5_000_000_000,
      region: 'adjusted',
      housingStatus: 'general',
      lender: 'nonBank',
      newLoanAnnualRate: 4,
      newLoanTermYears: 30,
      repaymentType: 'amortization',
      applyStressDsr: false,
    });
    expect(r.bindingConstraint).toBe('DTI');
  });

  it('calculatePrincipalFromMonthlyPayment: monthlyFactor<=0 일 때 0 반환', () => {
    // termYears=0 → monthlyFactor=0 → 0 반환
    const result = calculatePrincipalFromMonthlyPayment(
      1_000_000,
      4,
      0,
      'amortization'
    );
    expect(result).toBe(0);
  });

  it('calculatePrincipalFromMonthlyPayment: 정상 케이스 (4% 30년 amortization)', () => {
    const result = calculatePrincipalFromMonthlyPayment(
      1_000_000,
      4,
      30,
      'amortization'
    );
    expect(result).toBeGreaterThan(0);
    // 월 100만원 × 30년 ≈ 2억원대 원금
    expect(result).toBeGreaterThan(150_000_000);
    expect(result).toBeLessThan(250_000_000);
  });
});

describe('split-sell — 미커버 분기', () => {
  it('safeRate: 100 이상은 0 으로 클램프 (수수료율 검증)', () => {
    const r = calculateSplitSell({
      averagePrice: 10_000,
      holdingQuantity: 100,
      sellFeeRate: 150, // 100 이상 → 0 으로 클램프
      taxRate: 0,
      entries: [{ price: 12_000, quantity: 50 }],
    });
    // 수수료율 0 으로 처리되어 정상 계산
    expect(r.totalRealizedPnL).toBeGreaterThan(0);
  });

  it('safeRate: 음수 / NaN → 0 으로 클램프', () => {
    const r = calculateSplitSell({
      averagePrice: 10_000,
      holdingQuantity: 100,
      sellFeeRate: -5,
      taxRate: Number.NaN,
      entries: [{ price: 12_000, quantity: 50 }],
    });
    expect(Number.isFinite(r.totalRealizedPnL)).toBe(true);
  });

  it('clampNonNegative: 음수 평균가 → 0 + 경고', () => {
    const r = calculateSplitSell({
      averagePrice: -1_000,
      holdingQuantity: 100,
      sellFeeRate: 0,
      taxRate: 0,
      entries: [{ price: 12_000, quantity: 50 }],
    });
    expect(r.warnings.some((w) => w.includes('평균 매입단가가 0'))).toBe(true);
  });

  it('clampNonNegative: NaN/Infinity → 0', () => {
    const r = calculateSplitSell({
      averagePrice: Number.POSITIVE_INFINITY,
      holdingQuantity: Number.NaN,
      sellFeeRate: 0,
      taxRate: 0,
      entries: [],
    });
    expect(r.warnings.some((w) => w.includes('평균 매입단가가 0'))).toBe(true);
    expect(r.warnings.some((w) => w.includes('보유 수량이 0'))).toBe(true);
  });

  it('잔여 보유보다 큰 매도 요청 → 자동 조정 + 경고', () => {
    const r = calculateSplitSell({
      averagePrice: 10_000,
      holdingQuantity: 50,
      sellFeeRate: 0,
      taxRate: 0,
      entries: [
        { price: 12_000, quantity: 100 }, // 50 만 보유 중인데 100 매도 요청
      ],
    });
    expect(r.warnings.some((w) => w.includes('초과'))).toBe(true);
  });
});
