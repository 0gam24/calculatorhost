/**
 * 예금 이자 계산 단위 테스트
 *
 * 단리 / 월복리 / 일복리 / 세율별 (일반과세·세금우대·비과세) + 경계값
 * 명세: docs/calculator-spec/예금.md §7
 */

import { describe, expect, it } from 'vitest';
import {
  calculateDeposit,
  type DepositInput,
} from '@/lib/finance/deposit';

// ============================================
// 헬퍼: 입력값 생성
// ============================================

function createInput(overrides: Partial<DepositInput>): DepositInput {
  return {
    principal: 10_000_000,
    annualRatePercent: 3,
    termMonths: 12,
    method: 'simple',
    taxType: 'general',
    ...overrides,
  };
}

// ============================================
// 1-3: 단리 기본 케이스
// ============================================

describe('calculateDeposit — 단리 (simple)', () => {
  it('단리 1000만 × 12개월 × 3% → 이자 30만', () => {
    // 공식: 10000000 × 0.03 × 12/12 = 300,000
    const result = calculateDeposit(
      createInput({
        principal: 10_000_000,
        annualRatePercent: 3,
        termMonths: 12,
        method: 'simple',
      })
    );

    expect(result.principal).toBe(10_000_000);
    expect(result.pretaxInterest).toBe(300_000);
    expect(result.warnings).toHaveLength(0);
  });

  it('단리 5000만 × 24개월 × 4% → 이자 400만', () => {
    // 공식: 50000000 × 0.04 × 24/12 = 4,000,000
    const result = calculateDeposit(
      createInput({
        principal: 50_000_000,
        annualRatePercent: 4,
        termMonths: 24,
        method: 'simple',
      })
    );

    expect(result.principal).toBe(50_000_000);
    expect(result.pretaxInterest).toBe(4_000_000);
  });

  it('단리 이자율 0% → 이자 0, 만기 = 원금', () => {
    const result = calculateDeposit(
      createInput({
        principal: 10_000_000,
        annualRatePercent: 0,
        termMonths: 12,
        method: 'simple',
      })
    );

    expect(result.pretaxInterest).toBe(0);
    expect(result.tax).toBe(0);
    expect(result.maturityAmount).toBe(result.principal);
  });
});

// ============================================
// 4-6: 월복리 케이스
// ============================================

describe('calculateDeposit — 월복리 (monthlyCompound)', () => {
  it('월복리 1000만 × 12개월 × 5% → (1+r)^12 공식', () => {
    // r = 0.05 / 12 / 100 ≈ 0.00416667
    // 만기원리금 = 10000000 × (1.00416667)^12 ≈ 10,512,663
    // 이자 ≈ 512,663
    const result = calculateDeposit(
      createInput({
        principal: 10_000_000,
        annualRatePercent: 5,
        termMonths: 12,
        method: 'monthlyCompound',
      })
    );

    expect(result.principal).toBe(10_000_000);
    expect(result.pretaxInterest).toBeGreaterThan(500_000);
    expect(result.pretaxInterest).toBeLessThan(520_000);
  });

  it('월복리 1000만 × 24개월 × 4% → 복리 효과 확인', () => {
    const result = calculateDeposit(
      createInput({
        principal: 10_000_000,
        annualRatePercent: 4,
        termMonths: 24,
        method: 'monthlyCompound',
      })
    );

    expect(result.principal).toBe(10_000_000);
    expect(result.pretaxInterest).toBeGreaterThan(0);
    // 단리: 10000000 × 0.04 × 24/12 = 800,000
    // 월복리는 단리보다 많음
    expect(result.pretaxInterest).toBeGreaterThan(800_000);
  });

  it('월복리 r=0 (이자율 0%) → 이자 0', () => {
    const result = calculateDeposit(
      createInput({
        principal: 10_000_000,
        annualRatePercent: 0,
        termMonths: 12,
        method: 'monthlyCompound',
      })
    );

    expect(result.pretaxInterest).toBe(0);
    expect(result.maturityAmount).toBe(result.principal);
  });
});

// ============================================
// 7-9: 일복리 케이스
// ============================================

describe('calculateDeposit — 일복리 (dailyCompound)', () => {
  it('일복리 1000만 × 12개월 × 5% → (1+r)^d 공식 (d = 30.4167 근사)', () => {
    // r = 0.05 / 365 ≈ 0.0001369863
    // days = 12 × 30.4167 ≈ 365.0004
    // 만기원리금 ≈ 10000000 × (1.0001369863)^365 ≈ 10,512,739
    // 이자 ≈ 512,739
    const result = calculateDeposit(
      createInput({
        principal: 10_000_000,
        annualRatePercent: 5,
        termMonths: 12,
        method: 'dailyCompound',
      })
    );

    expect(result.principal).toBe(10_000_000);
    // 월복리 대비 약간 더 많음 (일복리가 더 유리)
    expect(result.pretaxInterest).toBeGreaterThan(500_000);
    expect(result.pretaxInterest).toBeLessThan(520_000);
  });

  it('일복리 1000만 × 24개월 × 4% → 일복리 결과 계산', () => {
    const result = calculateDeposit(
      createInput({
        principal: 10_000_000,
        annualRatePercent: 4,
        termMonths: 24,
        method: 'dailyCompound',
      })
    );

    expect(result.principal).toBe(10_000_000);
    expect(result.pretaxInterest).toBeGreaterThan(0);
    expect(result.pretaxInterest).toBeGreaterThan(800_000);
  });

  it('일복리 r=0 (이자율 0%) → 이자 0', () => {
    const result = calculateDeposit(
      createInput({
        principal: 10_000_000,
        annualRatePercent: 0,
        termMonths: 12,
        method: 'dailyCompound',
      })
    );

    expect(result.pretaxInterest).toBe(0);
    expect(result.maturityAmount).toBe(result.principal);
  });
});

// ============================================
// 10-12: 세금 계산 (일반과세·세금우대·비과세)
// ============================================

describe('calculateDeposit — 세금 계산', () => {
  it('일반과세 15.4% 적용 → 세금 계산', () => {
    const result = calculateDeposit(
      createInput({
        principal: 10_000_000,
        annualRatePercent: 3,
        termMonths: 12,
        method: 'simple',
        taxType: 'general',
      })
    );

    expect(result.pretaxInterest).toBe(300_000);
    expect(result.appliedTaxRate).toBe(0.154);
    // 세금 = floor(300000 × 0.154 / 10) × 10 = floor(4620 / 10) × 10 = 46 × 10 = 460 × 10 = 46,200
    expect(result.tax).toBe(46_200);
    expect(result.posttaxInterest).toBe(300_000 - 46_200);
  });

  it('세금우대 9.5% 적용 + warning', () => {
    const result = calculateDeposit(
      createInput({
        principal: 10_000_000,
        annualRatePercent: 3,
        termMonths: 12,
        method: 'simple',
        taxType: 'preferential',
      })
    );

    expect(result.appliedTaxRate).toBe(0.095);
    const expectedTax = Math.floor((300_000 * 0.095) / 10) * 10;
    expect(result.tax).toBe(expectedTax);
    expect(result.warnings.length).toBeGreaterThan(0);
    expect(result.warnings[0]).toContain('세금우대종합저축');
  });

  it('비과세 → 세금 0, 세후 이자 = 세전 이자', () => {
    const result = calculateDeposit(
      createInput({
        principal: 10_000_000,
        annualRatePercent: 3,
        termMonths: 12,
        method: 'simple',
        taxType: 'exempt',
      })
    );

    expect(result.appliedTaxRate).toBe(0);
    expect(result.tax).toBe(0);
    expect(result.posttaxInterest).toBe(result.pretaxInterest);
  });
});

// ============================================
// 13-15: 10원 단위 절사 및 만기 수령액
// ============================================

describe('calculateDeposit — 10원 단위 절사', () => {
  it('10원 단위 절사 확인 (일반과세)', () => {
    const result = calculateDeposit(
      createInput({
        principal: 7_777_777,
        annualRatePercent: 3.77,
        termMonths: 13,
        method: 'simple',
        taxType: 'general',
      })
    );

    // 모든 금액이 10원 단위로 절사되어야 함
    expect(result.pretaxInterest % 10).toBe(0);
    expect(result.tax % 10).toBe(0);
    expect(result.posttaxInterest % 10).toBe(0);
  });

  it('세후 이자 + 세금 = 세전 이자 (검증)', () => {
    const result = calculateDeposit(
      createInput({
        principal: 10_000_000,
        annualRatePercent: 3,
        termMonths: 12,
        method: 'simple',
        taxType: 'general',
      })
    );

    expect(result.tax + result.posttaxInterest).toBe(result.pretaxInterest);
  });

  it('만기 수령액 = 원금 + 세후 이자', () => {
    const result = calculateDeposit(
      createInput({
        principal: 10_000_000,
        annualRatePercent: 3,
        termMonths: 12,
        method: 'simple',
        taxType: 'general',
      })
    );

    expect(result.maturityAmount).toBe(result.principal + result.posttaxInterest);
  });
});

// ============================================
// 16-18: 입력값 검증 및 엣지 케이스
// ============================================

describe('calculateDeposit — 입력값 검증', () => {
  it('원금 0 → 전체 0 + warning', () => {
    const result = calculateDeposit(
      createInput({
        principal: 0,
      })
    );

    expect(result.principal).toBe(0);
    expect(result.pretaxInterest).toBe(0);
    expect(result.tax).toBe(0);
    expect(result.maturityAmount).toBe(0);
    expect(result.warnings.length).toBeGreaterThan(0);
    expect(result.warnings[0]).toContain('예치 원금');
  });

  it('원금 음수 → 전체 0 + warning', () => {
    const result = calculateDeposit(
      createInput({
        principal: -10_000_000,
      })
    );

    expect(result.principal).toBe(0);
    expect(result.warnings.length).toBeGreaterThan(0);
  });

  it('예치 기간 0 → 전체 0 + warning', () => {
    const result = calculateDeposit(
      createInput({
        termMonths: 0,
      })
    );

    expect(result.principal).toBe(0);
    expect(result.warnings.length).toBeGreaterThan(0);
    expect(result.warnings[0]).toContain('예치 기간');
  });

  it('예치 기간 음수 → 전체 0 + warning', () => {
    const result = calculateDeposit(
      createInput({
        termMonths: -12,
      })
    );

    expect(result.principal).toBe(0);
    expect(result.warnings.length).toBeGreaterThan(0);
  });

  it('이자율 음수 → warning, 0으로 처리', () => {
    const result = calculateDeposit(
      createInput({
        principal: 10_000_000,
        annualRatePercent: -2,
        termMonths: 12,
      })
    );

    expect(result.pretaxInterest).toBe(0);
    expect(result.warnings.length).toBeGreaterThan(0);
    expect(result.warnings[0]).toContain('연 이자율');
  });

  it('이자율 0% 명시적 입력 → 이자 0, warning 없음', () => {
    const result = calculateDeposit(
      createInput({
        principal: 10_000_000,
        annualRatePercent: 0,
      })
    );

    expect(result.pretaxInterest).toBe(0);
    expect(result.warnings).toHaveLength(0);
  });
});

// ============================================
// 19: 연환산 세후 이자율 계산
// ============================================

describe('calculateDeposit — 연환산 세후 이자율', () => {
  it('연환산 세후 이자율 = 세후이자/원금 × 12/기간 × 100', () => {
    const result = calculateDeposit(
      createInput({
        principal: 10_000_000,
        annualRatePercent: 3,
        termMonths: 24,
        method: 'simple',
        taxType: 'exempt',
      })
    );

    // 세전이자 = 10000000 × 0.03 × 24/12 = 600,000
    // 세후이자 = 600,000 (비과세)
    // 연환산 세후율 = (600000 / 10000000) × (12 / 24) × 100 = 0.06 × 0.5 × 100 = 3%
    expect(result.annualizedNetRate).toBeCloseTo(3, 2);
  });

  it('연환산 세후 이자율 (일반과세 포함)', () => {
    const result = calculateDeposit(
      createInput({
        principal: 10_000_000,
        annualRatePercent: 3,
        termMonths: 12,
        method: 'simple',
        taxType: 'general',
      })
    );

    // 세전이자 = 300,000
    // 세금 = 46,200 (위의 테스트에서 계산)
    // 세후이자 = 253,800
    // 연환산 세후율 = (253800 / 10000000) × (12 / 12) × 100 = 0.02538 × 100 = 2.538%
    expect(result.annualizedNetRate).toBeCloseTo(2.538, 2);
  });

  it('원금 0일 때 연환산 세후 이자율 = 0', () => {
    const result = calculateDeposit(
      createInput({
        principal: 0,
      })
    );

    expect(result.annualizedNetRate).toBe(0);
  });

  it('기간 0일 때 연환산 세후 이자율 = 0', () => {
    const result = calculateDeposit(
      createInput({
        termMonths: 0,
      })
    );

    expect(result.annualizedNetRate).toBe(0);
  });
});

// ============================================
// 20-22: 단리 vs 복리 비교
// ============================================

describe('calculateDeposit — 단리 vs 복리 비교', () => {
  it('동일 조건에서 월복리 >= 단리', () => {
    const simpleResult = calculateDeposit(
      createInput({
        principal: 10_000_000,
        annualRatePercent: 5,
        termMonths: 24,
        method: 'simple',
        taxType: 'exempt',
      })
    );

    const monthlyResult = calculateDeposit(
      createInput({
        principal: 10_000_000,
        annualRatePercent: 5,
        termMonths: 24,
        method: 'monthlyCompound',
        taxType: 'exempt',
      })
    );

    // 복리 이자 >= 단리 이자
    expect(monthlyResult.pretaxInterest).toBeGreaterThanOrEqual(
      simpleResult.pretaxInterest
    );
  });

  it('동일 조건에서 일복리 >= 월복리', () => {
    const monthlyResult = calculateDeposit(
      createInput({
        principal: 10_000_000,
        annualRatePercent: 5,
        termMonths: 12,
        method: 'monthlyCompound',
        taxType: 'exempt',
      })
    );

    const dailyResult = calculateDeposit(
      createInput({
        principal: 10_000_000,
        annualRatePercent: 5,
        termMonths: 12,
        method: 'dailyCompound',
        taxType: 'exempt',
      })
    );

    // 일복리 >= 월복리 (일반적으로 약간 더 많음)
    expect(dailyResult.pretaxInterest).toBeGreaterThanOrEqual(
      monthlyResult.pretaxInterest
    );
  });

  it('단리 기간 12개월 vs 24개월 — 기간 2배 시 이자도 약 2배', () => {
    const result12 = calculateDeposit(
      createInput({
        principal: 10_000_000,
        annualRatePercent: 3,
        termMonths: 12,
        method: 'simple',
      })
    );

    const result24 = calculateDeposit(
      createInput({
        principal: 10_000_000,
        annualRatePercent: 3,
        termMonths: 24,
        method: 'simple',
      })
    );

    // 단리이므로 이자가 정확히 2배
    expect(result24.pretaxInterest).toBe(result12.pretaxInterest * 2);
  });
});

// ============================================
// 23-24: 실제 시나리오
// ============================================

describe('calculateDeposit — 실제 시나리오', () => {
  it('정기예금 1000만 × 36개월 × 3.5% 일반과세 (현실적 시나리오)', () => {
    const result = calculateDeposit(
      createInput({
        principal: 10_000_000,
        annualRatePercent: 3.5,
        termMonths: 36,
        method: 'monthlyCompound',
        taxType: 'general',
      })
    );

    expect(result.principal).toBe(10_000_000);
    expect(result.pretaxInterest).toBeGreaterThan(0);
    expect(result.tax).toBeGreaterThan(0);
    expect(result.posttaxInterest).toBeGreaterThan(0);
    expect(result.maturityAmount).toBe(
      result.principal + result.posttaxInterest
    );
    expect(result.annualizedNetRate).toBeGreaterThan(0);
  });

  it('정기예금 2000만 × 12개월 × 2% 비과세 (ISA 가정)', () => {
    const result = calculateDeposit(
      createInput({
        principal: 20_000_000,
        annualRatePercent: 2,
        termMonths: 12,
        method: 'monthlyCompound',
        taxType: 'exempt',
      })
    );

    expect(result.tax).toBe(0);
    expect(result.posttaxInterest).toBe(result.pretaxInterest);
    expect(result.maturityAmount).toBe(
      result.principal + result.pretaxInterest
    );
  });
});
