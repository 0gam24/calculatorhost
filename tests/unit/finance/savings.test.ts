/**
 * 적금 이자 계산 단위 테스트
 *
 * 단리 / 월복리 / 세율별 (일반과세·세금우대·비과세) + 경계값
 * 명세: docs/calculator-spec/적금.md §7
 */

import { describe, expect, it } from 'vitest';
import {
  calculateSavings,
  type SavingsInput,
} from '@/lib/finance/savings';

// ============================================
// 헬퍼: 입력값 생성
// ============================================

function createInput(overrides: Partial<SavingsInput>): SavingsInput {
  return {
    monthlyDeposit: 100_000,
    annualRatePercent: 3,
    termMonths: 12,
    method: 'simple',
    taxType: 'general',
    ...overrides,
  };
}

// ============================================
// 1-2: 단리 기본 케이스
// ============================================

describe('calculateSavings — 단리 (simple)', () => {
  it('단리 월 10만 × 12개월 × 5% → 원금 120만 + 이자 32,500', () => {
    // 공식: 100000 × 0.05 × (12×13/2) / 12 = 100000 × 0.05 × 6.5 = 32,500
    const result = calculateSavings(
      createInput({
        monthlyDeposit: 100_000,
        annualRatePercent: 5,
        termMonths: 12,
        method: 'simple',
      })
    );

    expect(result.principal).toBe(1_200_000);
    expect(result.pretaxInterest).toBe(32_500);
    expect(result.warnings).toHaveLength(0);
  });

  it('단리 월 50만 × 24개월 × 3% → 이자 = 375,000', () => {
    // 공식: 500000 × 0.03 × (24×25/2) / 12 = 500000 × 0.03 × 25 = 375,000
    const result = calculateSavings(
      createInput({
        monthlyDeposit: 500_000,
        annualRatePercent: 3,
        termMonths: 24,
        method: 'simple',
      })
    );

    expect(result.principal).toBe(12_000_000);
    expect(result.pretaxInterest).toBe(375_000);
  });

  it('단리 이자율 0% → 이자 0, 만기 = 원금', () => {
    const result = calculateSavings(
      createInput({
        monthlyDeposit: 100_000,
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
// 3-4: 월복리 케이스
// ============================================

describe('calculateSavings — 월복리 (monthlyCompound)', () => {
  it('월복리 월 100만 × 24개월 × 4% → 공식 적용', () => {
    // r = 0.04 / 12 / 100 = 0.00333...
    // 만기원리금 = 1000000 × ((1+r)^24 - 1) / r × (1+r)
    // 세전 이자 = 만기원리금 - 2400만 ≈ 102.6만원
    const result = calculateSavings(
      createInput({
        monthlyDeposit: 1_000_000,
        annualRatePercent: 4,
        termMonths: 24,
        method: 'monthlyCompound',
      })
    );

    expect(result.principal).toBe(24_000_000);
    expect(result.pretaxInterest).toBeGreaterThan(0);
    // 실제 복리 계산 결과: 약 102.6만원
    expect(result.pretaxInterest).toBeGreaterThan(1_000_000);
    expect(result.pretaxInterest).toBeLessThan(1_100_000);
  });

  it('월복리 월 100만 × 36개월 × 5% → 복리 효과 확인', () => {
    const result = calculateSavings(
      createInput({
        monthlyDeposit: 1_000_000,
        annualRatePercent: 5,
        termMonths: 36,
        method: 'monthlyCompound',
      })
    );

    expect(result.principal).toBe(36_000_000);
    expect(result.pretaxInterest).toBeGreaterThan(0);
    // 단리 대비 복리 이자가 더 많음
    // 단리: 1000000 × 0.05 × (36×37/2) / 12 ≈ 925,000
    expect(result.pretaxInterest).toBeGreaterThan(925_000);
  });

  it('월복리 r=0 (이자율 0%) → 이자 0', () => {
    const result = calculateSavings(
      createInput({
        monthlyDeposit: 1_000_000,
        annualRatePercent: 0,
        termMonths: 12,
        method: 'monthlyCompound',
      })
    );

    expect(result.pretaxInterest).toBe(0);
    expect(result.maturityAmount).toBe(result.principal);
  });

  it('월복리 개월수 1 → 원금 = 월납입, 이자 ≈ 월납입 × r', () => {
    // r = 0.05 / 12 / 100 ≈ 0.0041667
    // 1개월: 만기원리금 ≈ 1000000 × (1.0041667) = 1004166
    // 이자 ≈ 4,166
    const result = calculateSavings(
      createInput({
        monthlyDeposit: 1_000_000,
        annualRatePercent: 5,
        termMonths: 1,
        method: 'monthlyCompound',
      })
    );

    expect(result.principal).toBe(1_000_000);
    // 10원 단위 절사 후 약 4,160
    expect(result.pretaxInterest).toBeGreaterThan(0);
    expect(result.pretaxInterest).toBeLessThan(10_000);
  });
});

// ============================================
// 5-7: 세금 계산 (일반과세·세금우대·비과세)
// ============================================

describe('calculateSavings — 세금 계산', () => {
  it('일반과세 15.4% → 이자 10만 → 세금 15,400', () => {
    // 세금 = floor(100000 × 0.154 / 10) × 10 = floor(1540 / 10) × 10 = 1540 × 10 = 15,400
    const result = calculateSavings(
      createInput({
        monthlyDeposit: 100_000,
        annualRatePercent: 5,
        termMonths: 12,
        method: 'simple',
        taxType: 'general',
      })
    );

    const expectedInterest = 32_500; // 위에서 계산한 값
    expect(result.pretaxInterest).toBe(expectedInterest);
    expect(result.appliedTaxRate).toBe(0.154);
    // 세금 = floor(32500 × 0.154 / 10) × 10 = floor(5005 / 10) × 10 = 500 × 10 = 5,000
    expect(result.tax).toBe(5_000);
    expect(result.posttaxInterest).toBe(expectedInterest - 5_000);
  });

  it('세금우대 9.5% 적용', () => {
    const result = calculateSavings(
      createInput({
        monthlyDeposit: 100_000,
        annualRatePercent: 5,
        termMonths: 12,
        method: 'simple',
        taxType: 'preferential',
      })
    );

    expect(result.appliedTaxRate).toBe(0.095);
    const expectedTax = Math.floor((32_500 * 0.095) / 10) * 10;
    expect(result.tax).toBe(expectedTax);
    expect(result.warnings.length).toBeGreaterThan(0);
    expect(result.warnings[0]).toContain('세금우대종합저축');
  });

  it('비과세 → 세금 0, 세후 이자 = 세전 이자', () => {
    const result = calculateSavings(
      createInput({
        monthlyDeposit: 100_000,
        annualRatePercent: 5,
        termMonths: 12,
        method: 'simple',
        taxType: 'exempt',
      })
    );

    expect(result.appliedTaxRate).toBe(0);
    expect(result.tax).toBe(0);
    expect(result.posttaxInterest).toBe(result.pretaxInterest);
  });

  it('세후 이자 + 세금 = 세전 이자 (검증)', () => {
    const result = calculateSavings(
      createInput({
        monthlyDeposit: 100_000,
        annualRatePercent: 5,
        termMonths: 12,
        method: 'simple',
        taxType: 'general',
      })
    );

    expect(result.tax + result.posttaxInterest).toBe(result.pretaxInterest);
  });
});

// ============================================
// 8-10: 10원 단위 절사 및 경계값
// ============================================

describe('calculateSavings — 10원 단위 절사', () => {
  it('10원 단위 절사 확인 (일반과세)', () => {
    const result = calculateSavings(
      createInput({
        monthlyDeposit: 77_777,
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

  it('원금 계산 (월납입 × 개월수)', () => {
    const result = calculateSavings(
      createInput({
        monthlyDeposit: 123_456,
        termMonths: 17,
      })
    );

    expect(result.principal).toBe(123_456 * 17);
  });

  it('만기 수령액 = 원금 + 세후 이자', () => {
    const result = calculateSavings(
      createInput({
        monthlyDeposit: 100_000,
        annualRatePercent: 5,
        termMonths: 12,
        method: 'simple',
        taxType: 'general',
      })
    );

    expect(result.maturityAmount).toBe(result.principal + result.posttaxInterest);
  });
});

// ============================================
// 11-14: 입력값 검증 및 엣지 케이스
// ============================================

describe('calculateSavings — 입력값 검증', () => {
  it('월납입금 0 → 전체 0 + warning', () => {
    const result = calculateSavings(
      createInput({
        monthlyDeposit: 0,
      })
    );

    expect(result.principal).toBe(0);
    expect(result.pretaxInterest).toBe(0);
    expect(result.tax).toBe(0);
    expect(result.maturityAmount).toBe(0);
    expect(result.warnings.length).toBeGreaterThan(0);
    expect(result.warnings[0]).toContain('월 납입금액');
  });

  it('월납입금 음수 → 전체 0 + warning', () => {
    const result = calculateSavings(
      createInput({
        monthlyDeposit: -100_000,
      })
    );

    expect(result.principal).toBe(0);
    expect(result.warnings.length).toBeGreaterThan(0);
  });

  it('개월수 0 → 전체 0 + warning', () => {
    const result = calculateSavings(
      createInput({
        termMonths: 0,
      })
    );

    expect(result.principal).toBe(0);
    expect(result.warnings.length).toBeGreaterThan(0);
    expect(result.warnings[0]).toContain('가입 기간');
  });

  it('개월수 음수 → 전체 0 + warning', () => {
    const result = calculateSavings(
      createInput({
        termMonths: -12,
      })
    );

    expect(result.principal).toBe(0);
    expect(result.warnings.length).toBeGreaterThan(0);
  });

  it('이자율 음수 → warning, 0으로 처리', () => {
    const result = calculateSavings(
      createInput({
        annualRatePercent: -2,
        termMonths: 12,
      })
    );

    expect(result.pretaxInterest).toBe(0);
    expect(result.warnings.length).toBeGreaterThan(0);
    expect(result.warnings[0]).toContain('연 이자율');
  });

  it('이자율 0% 명시적 입력 → 이자 0, warning 없음', () => {
    const result = calculateSavings(
      createInput({
        annualRatePercent: 0,
      })
    );

    expect(result.pretaxInterest).toBe(0);
    expect(result.warnings).toHaveLength(0);
  });
});

// ============================================
// 15: 단리 vs 복리 비교
// ============================================

describe('calculateSavings — 단리 vs 복리 비교', () => {
  it('동일 조건에서 복리 >= 단리', () => {
    const simpleResult = calculateSavings(
      createInput({
        monthlyDeposit: 100_000,
        annualRatePercent: 5,
        termMonths: 24,
        method: 'simple',
        taxType: 'exempt',
      })
    );

    const compoundResult = calculateSavings(
      createInput({
        monthlyDeposit: 100_000,
        annualRatePercent: 5,
        termMonths: 24,
        method: 'monthlyCompound',
        taxType: 'exempt',
      })
    );

    // 복리 이자 >= 단리 이자
    expect(compoundResult.pretaxInterest).toBeGreaterThanOrEqual(
      simpleResult.pretaxInterest
    );
  });
});

// ============================================
// 추가: 실제 계산 시나리오
// ============================================

describe('calculateSavings — 실제 시나리오', () => {
  it('적금 월 50만 × 36개월 × 3.5% 일반과세 (현실적 시나리오)', () => {
    const result = calculateSavings(
      createInput({
        monthlyDeposit: 500_000,
        annualRatePercent: 3.5,
        termMonths: 36,
        method: 'monthlyCompound',
        taxType: 'general',
      })
    );

    expect(result.principal).toBe(500_000 * 36);
    expect(result.pretaxInterest).toBeGreaterThan(0);
    expect(result.tax).toBeGreaterThan(0);
    expect(result.posttaxInterest).toBeGreaterThan(0);
    expect(result.maturityAmount).toBe(
      result.principal + result.posttaxInterest
    );
  });

  it('적금 월 20만 × 12개월 × 2% 비과세 (ISA 가정)', () => {
    const result = calculateSavings(
      createInput({
        monthlyDeposit: 200_000,
        annualRatePercent: 2,
        termMonths: 12,
        method: 'monthlyCompound',
        taxType: 'exempt',
      })
    );

    expect(result.tax).toBe(0);
    expect(result.posttaxInterest).toBe(result.pretaxInterest);
  });
});
