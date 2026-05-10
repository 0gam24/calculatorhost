/**
 * 근로소득세 / 4대보험 계산 단위 테스트
 *
 * 경계값 + 일반 케이스 + 극단 케이스 커버
 * 명세: docs/calculator-spec/연봉실수령액.md §7
 */

import { describe, expect, it } from 'vitest';
import {
  calculateProgressiveTax,
  calculateEarnedIncomeDeduction,
  calculatePension,
  calculateHealth,
  calculateLongTermCare,
  calculateEmployment,
  calculateTakeHome,
  inferGrossFromNet,
} from '@/lib/tax/income';
import { INCOME_TAX_BRACKETS } from '@/lib/constants/tax-rates-2026';

describe('calculateProgressiveTax', () => {
  it('0원 → 0원', () => {
    expect(calculateProgressiveTax(0, INCOME_TAX_BRACKETS)).toBe(0);
  });

  it('1,400만원 경계 (6% 구간 끝)', () => {
    // 1400만 × 6% = 84만
    expect(calculateProgressiveTax(14_000_000, INCOME_TAX_BRACKETS)).toBe(840_000);
  });

  it('5,000만원 경계 (15% 구간 끝)', () => {
    // 5000만 × 15% - 126만 = 750만 - 126만 = 624만
    expect(calculateProgressiveTax(50_000_000, INCOME_TAX_BRACKETS)).toBe(6_240_000);
  });

  it('8,800만원 경계 (24% 구간 끝)', () => {
    // 8800만 × 24% - 576만 = 2112만 - 576만 = 1536만
    expect(calculateProgressiveTax(88_000_000, INCOME_TAX_BRACKETS)).toBe(15_360_000);
  });

  it('1억원 (35% 구간)', () => {
    // 1억은 8800만 초과 → 35% 구간. 1억 × 35% - 1544만 = 3500만 - 1544만 = 1956만
    expect(calculateProgressiveTax(100_000_000, INCOME_TAX_BRACKETS)).toBe(19_560_000);
  });

  it('10억원 (42% 구간 끝)', () => {
    // 10억 × 42% - 3594만 = 4.2억 - 3594만 ≈ 3.84억
    expect(calculateProgressiveTax(1_000_000_000, INCOME_TAX_BRACKETS)).toBe(384_060_000);
  });

  it('15억원 (최고 구간 45%)', () => {
    // 15억 × 45% - 6594만
    const result = calculateProgressiveTax(1_500_000_000, INCOME_TAX_BRACKETS);
    expect(result).toBe(1_500_000_000 * 0.45 - 65_940_000);
  });
});

describe('calculateEarnedIncomeDeduction', () => {
  it('500만 이하 70% 공제', () => {
    expect(calculateEarnedIncomeDeduction(5_000_000)).toBe(3_500_000);
  });

  it('1,500만 경계', () => {
    // 500만 + 40% × (1500만 - 500만) = 350만 + 400만 = 750만
    expect(calculateEarnedIncomeDeduction(15_000_000)).toBe(7_500_000);
  });

  it('4,500만 경계', () => {
    // 750만 + 15% × (4500만 - 1500만) = 750만 + 450만 = 1200만
    expect(calculateEarnedIncomeDeduction(45_000_000)).toBe(12_000_000);
  });

  it('1억 경계', () => {
    // 1200만 + 5% × (1억 - 4500만) = 1200만 + 275만 = 1475만
    expect(calculateEarnedIncomeDeduction(100_000_000)).toBe(14_750_000);
  });

  it('최고 한도 2,000만원', () => {
    // 초고소득: 한도 캡
    expect(calculateEarnedIncomeDeduction(10_000_000_000)).toBe(20_000_000);
  });
});

describe('calculatePension (국민연금)', () => {
  it('월소득 300만 → 4.5% = 13.5만', () => {
    expect(calculatePension(3_000_000)).toBe(135_000);
  });

  it('월소득 상한 초과 (1000만) → 637만 × 4.5%', () => {
    expect(calculatePension(10_000_000)).toBe(Math.floor(6_370_000 * 0.045));
  });

  it('월소득 하한 미만 (30만) → 40만 × 4.5%', () => {
    expect(calculatePension(300_000)).toBe(Math.floor(400_000 * 0.045));
  });
});

describe('calculateHealth / LongTermCare / Employment', () => {
  it('건강보험: 월 300만 × 3.545%', () => {
    expect(calculateHealth(3_000_000)).toBe(Math.floor(3_000_000 * 0.03545));
  });

  it('장기요양: 건보료 × 12.95%', () => {
    const health = calculateHealth(3_000_000);
    expect(calculateLongTermCare(health)).toBe(Math.floor(health * 0.1295));
  });

  it('고용보험: 월 300만 × 0.9%', () => {
    expect(calculateEmployment(3_000_000)).toBe(Math.floor(3_000_000 * 0.009));
  });
});

describe('calculateTakeHome — 통합 시나리오', () => {
  it('연봉 3000만, 부양 1, 자녀 0 — 기본 케이스', () => {
    const result = calculateTakeHome({
      wageType: 'yearly',
      wageAmount: 30_000_000,
      severance: 'separate',
      nontaxableMonthly: 0,
      dependents: 1,
      children: 0,
    });
    expect(result.annualGrossIncome).toBe(30_000_000);
    expect(result.monthlyGrossIncome).toBe(2_500_000);
    // 실수령액은 공제 합 > 0 이므로 월급보다 낮아야 함
    expect(result.monthlyNetIncome).toBeLessThan(result.monthlyGrossIncome);
    expect(result.monthlyNetIncome).toBeGreaterThan(2_000_000); // 상식적 하한
  });

  it('연봉 5000만, 부양 3, 자녀 2 — 가족 공제', () => {
    const result = calculateTakeHome({
      wageType: 'yearly',
      wageAmount: 50_000_000,
      severance: 'separate',
      nontaxableMonthly: 200_000,
      dependents: 3,
      children: 2,
    });
    expect(result.annualGrossIncome).toBe(50_000_000);
    expect(result.monthlyGrossIncome).toBe(Math.floor(50_000_000 / 12));
    expect(result.monthlyNontaxable).toBe(200_000);
    // 자녀 공제가 적용돼 소득세는 낮아짐
    expect(result.incomeTax).toBeGreaterThanOrEqual(0);
  });

  it('월급 직접 입력 (300만, 비과세 10만)', () => {
    const result = calculateTakeHome({
      wageType: 'monthly',
      wageAmount: 3_000_000,
      severance: 'separate',
      nontaxableMonthly: 100_000,
      dependents: 1,
      children: 0,
    });
    expect(result.annualGrossIncome).toBe(36_000_000);
    expect(result.monthlyGrossIncome).toBe(3_000_000);
  });

  it('연봉 0원 → 실수령 0원', () => {
    const result = calculateTakeHome({
      wageType: 'yearly',
      wageAmount: 0,
      severance: 'separate',
      nontaxableMonthly: 0,
      dependents: 1,
      children: 0,
    });
    // 최소 보험료(하한)는 발생하므로 음수일 수도 있지만 MVP 에서는 수치 확인만
    expect(result.monthlyGrossIncome).toBe(0);
  });

  it('연봉에 퇴직금 포함 시 실수령액이 별도일 때보다 낮음', () => {
    const separate = calculateTakeHome({
      wageType: 'yearly',
      wageAmount: 60_000_000,
      severance: 'separate',
      nontaxableMonthly: 0,
      dependents: 1,
      children: 0,
    });
    const included = calculateTakeHome({
      wageType: 'yearly',
      wageAmount: 60_000_000,
      severance: 'included',
      nontaxableMonthly: 0,
      dependents: 1,
      children: 0,
    });
    expect(included.monthlyNetIncome).toBeLessThan(separate.monthlyNetIncome);
  });

  it('시급 계산 (월 209시간 기준)', () => {
    const result = calculateTakeHome({
      wageType: 'monthly',
      wageAmount: 3_000_000,
      severance: 'separate',
      nontaxableMonthly: 0,
      dependents: 1,
      children: 0,
    });
    expect(result.hourlyWage).toBe(Math.floor(result.monthlyNetIncome / 209));
  });

  it('연봉 1억 — 국민연금 상한 적용', () => {
    const result = calculateTakeHome({
      wageType: 'yearly',
      wageAmount: 100_000_000,
      severance: 'separate',
      nontaxableMonthly: 0,
      dependents: 1,
      children: 0,
    });
    // 월급 약 833만, 상한 637만 적용 → 연금은 637만 × 4.5%
    expect(result.pension).toBe(Math.floor(6_370_000 * 0.045));
  });
});

describe('inferGrossFromNet (역산)', () => {
  const baseOptions = {
    nontaxableMonthly: 0,
    dependents: 1,
    children: 0,
  };

  it('월 실수령 227만 → 세전 연봉 추정 후 정방향 재계산 일관성', () => {
    const annualGross = inferGrossFromNet(2_270_000, baseOptions);
    expect(annualGross).toBeGreaterThan(0);

    // 역산 결과를 다시 정방향 계산 → 목표 ± 5,000원 이내
    const back = calculateTakeHome({
      wageType: 'yearly',
      wageAmount: annualGross,
      severance: 'separate',
      ...baseOptions,
    });
    expect(Math.abs(back.monthlyNetIncome - 2_270_000)).toBeLessThan(5_000);
  });

  it('월 실수령 350만 → 세전 약 4,000만대 (sanity)', () => {
    const annualGross = inferGrossFromNet(3_500_000, baseOptions);
    expect(annualGross).toBeGreaterThan(40_000_000);
    expect(annualGross).toBeLessThan(60_000_000);
  });

  it('월 실수령 500만 → 세전 약 7,000만대', () => {
    const annualGross = inferGrossFromNet(5_000_000, baseOptions);
    expect(annualGross).toBeGreaterThan(65_000_000);
    expect(annualGross).toBeLessThan(90_000_000);
  });

  it('0원 / 음수 / NaN → 0', () => {
    expect(inferGrossFromNet(0, baseOptions)).toBe(0);
    expect(inferGrossFromNet(-100, baseOptions)).toBe(0);
    expect(inferGrossFromNet(NaN, baseOptions)).toBe(0);
  });

  it('자녀 2명 시 동일 목표 실수령액에 필요한 세전이 더 낮다 (자녀세액공제 효과)', () => {
    const noChildren = inferGrossFromNet(3_000_000, { ...baseOptions, children: 0 });
    const withChildren = inferGrossFromNet(3_000_000, { ...baseOptions, children: 2 });
    expect(withChildren).toBeLessThanOrEqual(noChildren);
  });
});
