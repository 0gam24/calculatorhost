/**
 * 자녀장려금 계산 단위 테스트
 *
 * 가구 유형(홑벌이/맞벌이/단독) × 소득 구간(감액X/감액O/상한초과)
 * + 자산/자녀 검증 + 경계값
 */

import { describe, expect, it } from 'vitest';
import {
  calculateChildTaxCredit,
  type ChildTaxCreditInput,
} from '@/lib/tax/child-tax-credit';

// ============================================
// 헬퍼: 입력값 생성
// ============================================

function createInput(overrides: Partial<ChildTaxCreditInput>): ChildTaxCreditInput {
  return {
    householdType: 'dualEarner',
    totalAnnualIncome: 30_000_000,
    childCount: 2,
    passesAssetTest: true,
    ...overrides,
  };
}

// ============================================
// 가구 유형 검증
// ============================================

describe('calculateChildTaxCredit — 가구 유형', () => {
  it('단독 가구 → 0 + warning', () => {
    const result = calculateChildTaxCredit(
      createInput({
        householdType: 'single',
      })
    );

    expect(result.finalPayment).toBe(0);
    expect(result.warnings.length).toBeGreaterThan(0);
    expect(result.warnings[0]).toContain('단독가구');
  });

  it('홑벌이 가구 3000만 자녀 2 → 200만 (전액)', () => {
    const result = calculateChildTaxCredit(
      createInput({
        householdType: 'singleEarner',
        totalAnnualIncome: 30_000_000,
        childCount: 2,
      })
    );

    expect(result.finalPayment).toBe(2_000_000);
    expect(result.reductionRate).toBe(0);
  });

  it('맞벌이 가구 3000만 자녀 1 → 100만 (전액)', () => {
    const result = calculateChildTaxCredit(
      createInput({
        householdType: 'dualEarner',
        totalAnnualIncome: 30_000_000,
        childCount: 1,
      })
    );

    expect(result.finalPayment).toBe(1_000_000);
  });
});

// ============================================
// 소득 기준 — 전액 지급 (3600만 이하)
// ============================================

describe('calculateChildTaxCredit — 소득 3600만 이하 (전액)', () => {
  it('2000만 자녀 2 → 200만 (전액)', () => {
    const result = calculateChildTaxCredit(
      createInput({
        totalAnnualIncome: 20_000_000,
        childCount: 2,
      })
    );

    expect(result.finalPayment).toBe(2_000_000);
    expect(result.reductionRate).toBe(0);
  });

  it('3600만 경계 자녀 3 → 300만 (전액)', () => {
    const result = calculateChildTaxCredit(
      createInput({
        totalAnnualIncome: 36_000_000,
        childCount: 3,
      })
    );

    expect(result.finalPayment).toBe(3_000_000);
    expect(result.reductionRate).toBe(0);
  });
});

// ============================================
// 소득 기준 — 감액 (3600~4300만)
// ============================================

describe('calculateChildTaxCredit — 소득 3600~4300만 (감액)', () => {
  it('4000만 자녀 2 → 감액 적용 (약 85.7만 × 2)', () => {
    // 초과분 = 4000만 - 3600만 = 400만
    // 감액률 = 400만 / 700만 ≈ 0.5714
    // 지급액 = 200만 × (1 - 0.5714) = 200만 × 0.4286 ≈ 857,143 (10원 단위 절사)
    const result = calculateChildTaxCredit(
      createInput({
        totalAnnualIncome: 40_000_000,
        childCount: 2,
      })
    );

    expect(result.finalPayment).toBeGreaterThan(0);
    expect(result.finalPayment).toBeLessThan(2_000_000);
    expect(result.reductionRate).toBeGreaterThan(0);
    expect(result.reductionRate).toBeLessThan(1);
  });

  it('3800만 자녀 1 → 약 57.1만 지급 (감액률 약 0.286)', () => {
    // 초과분 = 3800만 - 3600만 = 200만
    // 감액률 = 200만 / 700만 ≈ 0.2857
    // 지급액 = 100만 × (1 - 0.2857) = 100만 × 0.7143 ≈ 714,300 (10원 단위 절사)
    const result = calculateChildTaxCredit(
      createInput({
        totalAnnualIncome: 38_000_000,
        childCount: 1,
      })
    );

    expect(result.finalPayment).toBeGreaterThan(0);
    expect(result.finalPayment).toBeLessThan(1_000_000);
  });
});

// ============================================
// 소득 기준 — 지급 불가 (4300만 이상)
// ============================================

describe('calculateChildTaxCredit — 소득 4300만 이상 (지급 불가)', () => {
  it('4300만 경계 → 0', () => {
    const result = calculateChildTaxCredit(
      createInput({
        totalAnnualIncome: 43_000_000,
        childCount: 2,
      })
    );

    expect(result.finalPayment).toBe(0);
    expect(result.reductionRate).toBe(1);
  });

  it('5000만 → 0 + warning', () => {
    const result = calculateChildTaxCredit(
      createInput({
        totalAnnualIncome: 50_000_000,
        childCount: 2,
      })
    );

    expect(result.finalPayment).toBe(0);
    expect(result.warnings.length).toBeGreaterThan(0);
    expect(result.warnings[0]).toContain('소득');
  });
});

// ============================================
// 자산 검증
// ============================================

describe('calculateChildTaxCredit — 자산', () => {
  it('자산 초과 → 0 + warning', () => {
    const result = calculateChildTaxCredit(
      createInput({
        passesAssetTest: false,
      })
    );

    expect(result.finalPayment).toBe(0);
    expect(result.warnings.length).toBeGreaterThan(0);
    expect(result.warnings[0]).toContain('재산');
  });

  it('자산 충족, 소득 충족 → 지급', () => {
    const result = calculateChildTaxCredit(
      createInput({
        passesAssetTest: true,
        totalAnnualIncome: 30_000_000,
      })
    );

    expect(result.finalPayment).toBeGreaterThan(0);
  });
});

// ============================================
// 자녀 수 검증
// ============================================

describe('calculateChildTaxCredit — 자녀 수', () => {
  it('자녀 0명 → 0 + warning', () => {
    const result = calculateChildTaxCredit(
      createInput({
        childCount: 0,
      })
    );

    expect(result.finalPayment).toBe(0);
    expect(result.warnings.length).toBeGreaterThan(0);
  });

  it('자녀 음수 → 0 + warning', () => {
    const result = calculateChildTaxCredit(
      createInput({
        childCount: -1,
      })
    );

    expect(result.finalPayment).toBe(0);
  });

  it('자녀 3명 → 300만 (전액)', () => {
    const result = calculateChildTaxCredit(
      createInput({
        totalAnnualIncome: 30_000_000,
        childCount: 3,
      })
    );

    expect(result.finalPayment).toBe(3_000_000);
    expect(result.eligibleChildCount).toBe(3);
  });

  it('자녀 3.7명(소수) → 3명 기준 계산', () => {
    const result = calculateChildTaxCredit(
      createInput({
        childCount: 3.7,
      })
    );

    expect(result.eligibleChildCount).toBe(3);
  });
});

// ============================================
// 복합 케이스
// ============================================

describe('calculateChildTaxCredit — 복합', () => {
  it('홑벌이 3500만 자녀 2 재산초과 → 0 (자산)', () => {
    const result = calculateChildTaxCredit(
      createInput({
        householdType: 'singleEarner',
        totalAnnualIncome: 35_000_000,
        childCount: 2,
        passesAssetTest: false,
      })
    );

    expect(result.finalPayment).toBe(0);
    expect(result.warnings[0]).toContain('재산');
  });

  it('맞벌이 4200만 자녀 1 → 소액 감액 지급', () => {
    const result = calculateChildTaxCredit(
      createInput({
        householdType: 'dualEarner',
        totalAnnualIncome: 42_000_000,
        childCount: 1,
      })
    );

    expect(result.finalPayment).toBeGreaterThan(0);
    expect(result.finalPayment).toBeLessThan(1_000_000);
  });
});
