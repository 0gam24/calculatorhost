/**
 * N잡러 건강보험 계산 단위 테스트
 *
 * 주근로 + 부업/기타 조합 × 소득 기준 + 피부양자 상실 판정
 */

import { describe, expect, it } from 'vitest';
import {
  calculateNJobberInsurance,
  type NJobberInsuranceInput,
} from '@/lib/tax/n-jobber-insurance';

// ============================================
// 헬퍼: 입력값 생성
// ============================================

function createInput(overrides: Partial<NJobberInsuranceInput>): NJobberInsuranceInput {
  return {
    mainWageIncome: 50_000_000,
    sideBusinessIncome: 0,
    sideOtherIncome: 0,
    isDependent: false,
    ...overrides,
  };
}

// ============================================
// 주 근로 건보료만
// ============================================

describe('calculateNJobberInsurance — 주 근로만', () => {
  it('주근로 5000만 자영업 0 → 월 약 148K (근로 기준)', () => {
    // 5000만 / 12 × 3.545% = 약 148,542
    const result = calculateNJobberInsurance(
      createInput({
        mainWageIncome: 50_000_000,
      })
    );

    expect(result.monthlyWagePremium).toBeGreaterThan(140_000);
    expect(result.monthlyWagePremium).toBeLessThan(160_000);
    expect(result.extraIncomeMonthlyPremium).toBe(0);
    expect(result.totalMonthlyPremium).toBe(result.monthlyWagePremium);
  });

  it('주근로 0 → 월 건보 0', () => {
    const result = calculateNJobberInsurance(
      createInput({
        mainWageIncome: 0,
      })
    );

    expect(result.monthlyWagePremium).toBe(0);
  });
});

// ============================================
// 부업 소득 — 2000만 미만 (추가보험 0)
// ============================================

describe('calculateNJobberInsurance — 부업 2000만 미만', () => {
  it('주근로 5000만 + 부업 1000만 → 추가보험 0', () => {
    const result = calculateNJobberInsurance(
      createInput({
        mainWageIncome: 50_000_000,
        sideBusinessIncome: 10_000_000,
      })
    );

    expect(result.totalExtraIncome).toBe(10_000_000);
    expect(result.extraIncomeMonthlyPremium).toBe(0);
    expect(result.dependentLossRisk).toBe(false);
  });

  it('주근로 0 + 부업 1500만 → 피부양자 유지 가능', () => {
    const result = calculateNJobberInsurance(
      createInput({
        mainWageIncome: 0,
        sideBusinessIncome: 15_000_000,
        isDependent: true,
      })
    );

    expect(result.totalExtraIncome).toBe(15_000_000);
    expect(result.dependentLossRisk).toBe(false);
  });
});

// ============================================
// 부업 소득 — 2000만 이상 (추가보험 부과)
// ============================================

describe('calculateNJobberInsurance — 부업 2000만 이상', () => {
  it('주근로 5000만 + 부업 3000만 → 추가보험 약 59K (월)', () => {
    // 초과분 = 3000만 - 2000만 = 1000만
    // 추가월 = 1000만 / 12 × 7.09% ≈ 59,083
    const result = calculateNJobberInsurance(
      createInput({
        mainWageIncome: 50_000_000,
        sideBusinessIncome: 30_000_000,
      })
    );

    expect(result.totalExtraIncome).toBe(30_000_000);
    expect(result.extraIncomeMonthlyPremium).toBeGreaterThan(55_000);
    expect(result.extraIncomeMonthlyPremium).toBeLessThan(65_000);
    expect(result.warnings.length).toBeGreaterThan(0);
  });

  it('부업 2500만 자녀 2 피부양자 → dependentLossRisk true', () => {
    const result = calculateNJobberInsurance(
      createInput({
        mainWageIncome: 50_000_000,
        sideBusinessIncome: 25_000_000,
        isDependent: true,
      })
    );

    expect(result.dependentLossRisk).toBe(true);
    expect(result.warnings.length).toBeGreaterThan(0);
    expect(result.warnings[0]).toContain('피부양자');
  });
});

// ============================================
// 기타 소득 포함
// ============================================

describe('calculateNJobberInsurance — 기타 소득', () => {
  it('주근로 3000만 + 이자배당 1500만 → 추가보험 0', () => {
    const result = calculateNJobberInsurance(
      createInput({
        mainWageIncome: 30_000_000,
        sideOtherIncome: 15_000_000,
      })
    );

    expect(result.totalExtraIncome).toBe(15_000_000);
    expect(result.extraIncomeMonthlyPremium).toBe(0);
  });

  it('주근로 4000만 + 부업 1500만 + 기타 800만 → 초과 300만', () => {
    // 총추가 = 1500만 + 800만 = 2300만
    // 초과 = 2300만 - 2000만 = 300만
    const result = calculateNJobberInsurance(
      createInput({
        mainWageIncome: 40_000_000,
        sideBusinessIncome: 15_000_000,
        sideOtherIncome: 8_000_000,
      })
    );

    expect(result.totalExtraIncome).toBe(23_000_000);
    expect(result.extraIncomeMonthlyPremium).toBeGreaterThan(0);
  });
});

// ============================================
// 피부양자 상실 판정
// ============================================

describe('calculateNJobberInsurance — 피부양자 상실', () => {
  it('피부양자 + 부업 1500만 → 상실 위험 없음', () => {
    const result = calculateNJobberInsurance(
      createInput({
        isDependent: true,
        sideBusinessIncome: 15_000_000,
      })
    );

    expect(result.dependentLossRisk).toBe(false);
  });

  it('피부양자 + 부업 2000만 → 상실 위험', () => {
    const result = calculateNJobberInsurance(
      createInput({
        isDependent: true,
        sideBusinessIncome: 20_000_000,
      })
    );

    expect(result.dependentLossRisk).toBe(true);
  });

  it('피부양자 + 부업 2500만 + 기타 500만 → 상실 위험', () => {
    const result = calculateNJobberInsurance(
      createInput({
        isDependent: true,
        sideBusinessIncome: 25_000_000,
        sideOtherIncome: 5_000_000,
      })
    );

    expect(result.dependentLossRisk).toBe(true);
  });

  it('비피부양자 + 부업 3000만 → 상실 위험 없음 (이미 지역가입)', () => {
    const result = calculateNJobberInsurance(
      createInput({
        isDependent: false,
        sideBusinessIncome: 30_000_000,
      })
    );

    expect(result.dependentLossRisk).toBe(false);
  });
});

// ============================================
// 경계값
// ============================================

describe('calculateNJobberInsurance — 경계값', () => {
  it('부업 정확히 2000만 → 추가보험 0', () => {
    const result = calculateNJobberInsurance(
      createInput({
        mainWageIncome: 50_000_000,
        sideBusinessIncome: 20_000_000,
      })
    );

    expect(result.extraIncomeMonthlyPremium).toBe(0);
  });

  it('부업 2100만 → 추가보험 부과', () => {
    const result = calculateNJobberInsurance(
      createInput({
        mainWageIncome: 50_000_000,
        sideBusinessIncome: 21_000_000,
      })
    );

    expect(result.extraIncomeMonthlyPremium).toBeGreaterThan(0);
  });
});

// ============================================
// 복합 케이스
// ============================================

describe('calculateNJobberInsurance — 복합', () => {
  it('주근로 6000만 + 부업 3500만 + 기타 1000만 = 월보 급상승', () => {
    const result = calculateNJobberInsurance(
      createInput({
        mainWageIncome: 60_000_000,
        sideBusinessIncome: 35_000_000,
        sideOtherIncome: 10_000_000,
      })
    );

    expect(result.totalExtraIncome).toBe(45_000_000);
    expect(result.extraIncomeMonthlyPremium).toBeGreaterThan(0);
    expect(result.totalMonthlyPremium).toBeGreaterThan(result.monthlyWagePremium);
  });

  it('자영업자 주근로 0 + 부업 4000만 피부양자 → 상실 + 고보료', () => {
    const result = calculateNJobberInsurance(
      createInput({
        mainWageIncome: 0,
        sideBusinessIncome: 40_000_000,
        isDependent: true,
      })
    );

    expect(result.dependentLossRisk).toBe(true);
    expect(result.monthlyWagePremium).toBe(0);
    expect(result.extraIncomeMonthlyPremium).toBeGreaterThan(0);
  });
});

// ============================================
// 음수·0 처리
// ============================================

describe('calculateNJobberInsurance — 음수·0', () => {
  it('정상 소득 입력', () => {
    const result = calculateNJobberInsurance(
      createInput({
        mainWageIncome: 50_000_000,
        sideBusinessIncome: 0,
        sideOtherIncome: 0,
      })
    );

    // 정상적인 주근로 소득만 있을 때
    expect(result.totalMonthlyPremium).toBeGreaterThan(0);
  });

  it('모든 소득 0 → 월보 0', () => {
    const result = calculateNJobberInsurance(
      createInput({
        mainWageIncome: 0,
        sideBusinessIncome: 0,
        sideOtherIncome: 0,
      })
    );

    expect(result.totalMonthlyPremium).toBe(0);
    expect(result.annualPremium).toBe(0);
  });
});
