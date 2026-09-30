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
  getPensionBounds,
  estimateMonthlyIncomeTax,
  calculateTakeHome,
  inferGrossFromNet,
} from '@/lib/tax/income';
import { INCOME_TAX_BRACKETS } from '@/lib/constants/tax-rates-2026';

describe('검색 가이드 보험료 예시 회귀', () => {
  it.each([
    [0, 0],
    [2_999_999, 26_999],
    [3_000_000, 27_000],
    [3_000_001, 27_000],
  ])('고용보험 %i원의 원 단위 경계는 %i원', (income, expected) => {
    expect(calculateEmployment(income)).toBe(expected);
  });
  it.each([1, 6, 7, 12])(
    '2026년 %i월 월급 300만원 보험료는 같은 연중 요율을 적용한다',
    (calculationMonth) => {
      const result = calculateTakeHome({
        wageType: 'monthly',
        wageAmount: 3_000_000,
        severance: 'separate',
        nontaxableMonthly: 0,
        dependents: 1,
        children: 0,
        calculationMonth,
      });
      expect(result.pension).toBe(142_500);
      expect(result.health).toBe(107_850);
      expect(result.longTermCare).toBe(14_171);
      expect(result.employment).toBe(27_000);
      expect(result.totalInsuranceDeductions).toBe(291_521);
    },
  );
});

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

// 누진세 경계값 백스톱 테스트 — content-writer 시뮬 오차 (50x off) 방지용.
// 각 구간 전환점 ±1원에서 누진공제가 정확히 적용되는지 검증.
// 참고: docs/data-model.md §2-1 누진세율 표 / .claude/VERIFICATION_CHECKLIST.md
describe('calculateProgressiveTax — 경계값 ±1원 누진공제 검증', () => {
  // 1,400만 ↔ 5,000만 (6% → 15%, 누진공제 126만)
  it('1,400만 + 1원 (15% 구간 진입, 누진공제 126만 즉시 적용)', () => {
    const v = calculateProgressiveTax(14_000_001, INCOME_TAX_BRACKETS);
    // 14,000,001 × 0.15 - 1,260,000 = 2,100,000.15 - 1,260,000 = 840,000.15
    // 정수 반올림 또는 소수 허용에 따라 ±1원 오차 가능
    expect(Math.round(v)).toBeGreaterThanOrEqual(840_000);
    expect(Math.round(v)).toBeLessThanOrEqual(840_001);
  });

  it('5,000만 + 1원 (24% 구간 진입, 누진공제 576만)', () => {
    const v = calculateProgressiveTax(50_000_001, INCOME_TAX_BRACKETS);
    // 50,000,001 × 0.24 - 5,760,000 ≈ 6,240,000.24
    expect(Math.round(v)).toBeGreaterThanOrEqual(6_240_000);
    expect(Math.round(v)).toBeLessThanOrEqual(6_240_001);
  });

  it('8,800만 + 1원 (35% 구간 진입, 누진공제 1,544만)', () => {
    const v = calculateProgressiveTax(88_000_001, INCOME_TAX_BRACKETS);
    // 88,000,001 × 0.35 - 15,440,000 ≈ 15,360,000.35
    expect(Math.round(v)).toBeGreaterThanOrEqual(15_360_000);
    expect(Math.round(v)).toBeLessThanOrEqual(15_360_001);
  });

  it('1.5억 + 1원 (38% 구간 진입, 누진공제 1,994만)', () => {
    const v = calculateProgressiveTax(150_000_001, INCOME_TAX_BRACKETS);
    // 150,000,001 × 0.38 - 19,940,000 ≈ 37,060,000.38
    expect(Math.round(v)).toBeGreaterThanOrEqual(37_060_000);
    expect(Math.round(v)).toBeLessThanOrEqual(37_060_001);
  });

  it('1.975억 (양도세 사례 — 38% 구간, 양도차익 2억 - 기본공제 250만)', () => {
    // 자녀 주택 증여 가이드의 부모 양도세 시나리오 검증.
    // 1억 9,750만 × 38% - 1,994만 = 7,505만 - 1,994만 = 5,511만
    const v = calculateProgressiveTax(197_500_000, INCOME_TAX_BRACKETS);
    expect(Math.round(v)).toBe(55_110_000);
  });

  it('3억 + 1원 (40% 구간 진입, 누진공제 2,594만)', () => {
    const v = calculateProgressiveTax(300_000_001, INCOME_TAX_BRACKETS);
    // 300,000,001 × 0.40 - 25,940,000 ≈ 94,060,000.40
    expect(Math.round(v)).toBeGreaterThanOrEqual(94_060_000);
    expect(Math.round(v)).toBeLessThanOrEqual(94_060_001);
  });

  it('5억 + 1원 (42% 구간 진입, 누진공제 3,594만)', () => {
    const v = calculateProgressiveTax(500_000_001, INCOME_TAX_BRACKETS);
    // 500,000,001 × 0.42 - 35,940,000 ≈ 174,060,000.42
    expect(Math.round(v)).toBeGreaterThanOrEqual(174_060_000);
    expect(Math.round(v)).toBeLessThanOrEqual(174_060_001);
  });

  it('10억 + 1원 (45% 구간 진입, 누진공제 6,594만)', () => {
    const v = calculateProgressiveTax(1_000_000_001, INCOME_TAX_BRACKETS);
    // 1,000,000,001 × 0.45 - 65,940,000 ≈ 384,060,000.45
    expect(Math.round(v)).toBeGreaterThanOrEqual(384_060_000);
    expect(Math.round(v)).toBeLessThanOrEqual(384_060_001);
  });

  it('누진공제 누락 회귀 테스트: 4.775억 × 38% - 1,994만 ≈ 1.61억 (이월과세 가이드 사례)', () => {
    // 이월과세 5년→10년 가이드의 양도세 시뮬 (양도차익 4.8억 - 기본공제 250만 = 4.775억).
    // 1.5~3억 구간이 아니라 3~5억 구간이라 40%, 누진공제 2,594만.
    // 4.775억 × 40% - 2,594만 = 19,100만 - 2,594만 = 16,506만 = 약 1.65억
    const v = calculateProgressiveTax(477_500_000, INCOME_TAX_BRACKETS);
    expect(Math.round(v)).toBe(165_060_000);
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
  it('2026년 월소득 300만 → 4.75% = 142,500원', () => {
    expect(calculatePension(3_000_000)).toBe(142_500);
  });

  it('7월 이후 월소득 상한 초과 → 659만 × 4.75%', () => {
    expect(calculatePension(10_000_000)).toBe(313_025);
  });

  it('7월 이후 월소득 하한 미만 → 41만 × 4.75%', () => {
    expect(calculatePension(300_000)).toBe(19_475);
  });

  it('1~6월 상하한과 7월 전환을 적용한다', () => {
    expect(getPensionBounds(6)).toEqual({ lowerMonthly: 400_000, upperMonthly: 6_370_000 });
    expect(getPensionBounds(7)).toEqual({ lowerMonthly: 410_000, upperMonthly: 6_590_000 });
    expect(calculatePension(300_000, 6)).toBe(19_000);
    expect(calculatePension(10_000_000, 6)).toBe(302_575);
  });

  it.each([1, 6, 7, 12])('월 %i 상하한의 안팎과 기준소득 천원미만 절사', (month) => {
    const { lowerMonthly, upperMonthly } = getPensionBounds(month);
    const minimum = Math.floor(lowerMonthly * 0.0475);
    const maximum = Math.floor(upperMonthly * 0.0475);
    expect(calculatePension(lowerMonthly - 1, month)).toBe(minimum);
    expect(calculatePension(lowerMonthly, month)).toBe(minimum);
    expect(calculatePension(lowerMonthly + 999, month)).toBe(minimum);
    expect(calculatePension(upperMonthly - 1, month)).toBe(
      Math.floor((upperMonthly - 1_000) * 0.0475),
    );
    expect(calculatePension(upperMonthly, month)).toBe(maximum);
    expect(calculatePension(upperMonthly + 1, month)).toBe(maximum);
    expect(calculatePension(3_000_999, month)).toBe(142_500);
  });

  it('0원은 무급여 추정, 잘못된 값·적용월은 거부한다', () => {
    expect(calculatePension(0)).toBe(0);
    for (const amount of [-1, NaN, Infinity])
      expect(() => calculatePension(amount)).toThrow(RangeError);
    for (const month of [0, 13, 6.5, NaN])
      expect(() => getPensionBounds(month)).toThrow(RangeError);
  });
});

describe('calculateHealth / LongTermCare / Employment', () => {
  it('건강보험: 월 300만 × 3.595%', () => {
    expect(calculateHealth(3_000_000)).toBe(107_850);
  });

  it('장기요양: 건보료 × 13.14%', () => {
    const health = calculateHealth(3_000_000);
    expect(calculateLongTermCare(health)).toBe(14_171);
  });

  it('고용보험: 월 300만 × 0.9%', () => {
    expect(calculateEmployment(3_000_000)).toBe(27_000);
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
    expect(result.monthlyGrossIncome).toBe(0);
    expect(result.monthlyNetIncome).toBe(0);
    expect(result.pension).toBe(0);
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
    expect(result.pension).toBe(313_025);
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

  it('역산에서도 적용월을 보존한다', () => {
    for (const calculationMonth of [6, 7]) {
      const options = { ...baseOptions, calculationMonth };
      const annualGross = inferGrossFromNet(6_000_000, options);
      const result = calculateTakeHome({
        wageType: 'yearly',
        wageAmount: annualGross,
        severance: 'separate',
        ...options,
      });
      expect(result.calculationMonth).toBe(calculationMonth);
      expect(Math.abs(result.monthlyNetIncome - 6_000_000)).toBeLessThan(1_000);
    }
  });
});

describe('2026 급여 산식 입력·세액 경계', () => {
  const base = {
    wageType: 'monthly' as const,
    wageAmount: 3_000_000,
    severance: 'separate' as const,
    nontaxableMonthly: 0,
    dependents: 1,
    children: 0,
    calculationMonth: 7,
  };

  it('비과세가 월급보다 커도 월급까지만 적용한다', () => {
    const result = calculateTakeHome({ ...base, nontaxableMonthly: 4_000_000 });
    expect(result.monthlyNontaxable).toBe(3_000_000);
    expect(result.monthlyTaxableIncome).toBe(0);
    expect(result.monthlyNetIncome).toBe(3_000_000);
  });

  it.each([-1, NaN, Infinity])('유효하지 않은 급여 %s를 거부한다', (wageAmount) => {
    expect(() => calculateTakeHome({ ...base, wageAmount })).toThrow(RangeError);
  });

  it('잘못된 비과세·가족 수를 거부한다', () => {
    expect(() => calculateTakeHome({ ...base, nontaxableMonthly: NaN })).toThrow(RangeError);
    expect(() => calculateTakeHome({ ...base, dependents: 1.5 })).toThrow(RangeError);
    expect(() => calculateTakeHome({ ...base, children: -1 })).toThrow(RangeError);
  });

  it('비과세 제외 총급여로 근로소득공제를 산정한다 (소득세법 §47)', () => {
    // 3000만 - 비과세240만 - 공제939만 - 기본공제150만 = 과세표준1671만
    // (1671만 ×15% -126만) /12 = 103875 → 103870
    expect(estimateMonthlyIncomeTax(30_000_000, 2_400_000, 1, 0)).toBe(103_870);
  });

  it('공제대상 자녀 0~3명에 연 25만·55만·95만원 세액공제 적용', () => {
    expect(estimateMonthlyIncomeTax(60_000_000, 0, 1, 0)).toBe(466_870);
    expect(estimateMonthlyIncomeTax(60_000_000, 0, 1, 1)).toBe(446_040);
    expect(estimateMonthlyIncomeTax(60_000_000, 0, 1, 2)).toBe(421_040);
    expect(estimateMonthlyIncomeTax(60_000_000, 0, 1, 3)).toBe(387_700);
    expect(estimateMonthlyIncomeTax(5_000_000, 0, 1, 3)).toBe(0);
  });
});
