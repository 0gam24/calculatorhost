/**
 * 전월세 전환 계산 단위 테스트
 *
 * 3가지 모드 + 경계값 + 법정 상한 적용 검증
 * 명세: docs/calculator-spec/전월세전환.md §9
 */

import { describe, expect, it } from 'vitest';
import {
  calculateRentConversion,
  type RentConversionInput,
} from '@/lib/finance/rent-conversion';

// ============================================
// 헬퍼: 입력값 생성
// ============================================

function createInput(overrides: Partial<RentConversionInput>): RentConversionInput {
  return {
    mode: 'jeonseToMonthly',
    ...overrides,
  };
}

// ============================================
// Mode A: 전세 → 월세
// ============================================

describe('calculateRentConversion — Mode A (jeonseToMonthly)', () => {
  it('전세 5억 → 보증금 2억 (기본 전환율 5.5%): 월세 = (5억-2억) × 0.055 / 12 = 1,375,000', () => {
    // 차액 3억 × 5.5% / 12 = 1,375,000
    const result = calculateRentConversion(
      createInput({
        mode: 'jeonseToMonthly',
        jeonseDeposit: 500_000_000,
        newDeposit: 200_000_000,
      })
    );

    expect(result.resultMonthlyRent).toBe(1_375_000);
    expect(result.appliedConversionRatePercent).toBeCloseTo(5.5, 1);
    expect(result.warnings).toHaveLength(0);
  });

  it('전세 1억 → 보증금 0.5억 (5.5%): 월세 계산 검증', () => {
    // 차액 5000만 × 5.5% / 12 = 229,166.67 → 10원 단위 절사 = 229,160
    const result = calculateRentConversion(
      createInput({
        mode: 'jeonseToMonthly',
        jeonseDeposit: 100_000_000,
        newDeposit: 50_000_000,
      })
    );

    const expected = Math.floor((50_000_000 * 0.055) / 12 / 10) * 10;
    expect(result.resultMonthlyRent).toBe(expected);
    expect(result.warnings).toHaveLength(0);
  });

  it('전세 = 보증금 (0원 차액) → 월세 0, warning 발생', () => {
    const result = calculateRentConversion(
      createInput({
        mode: 'jeonseToMonthly',
        jeonseDeposit: 200_000_000,
        newDeposit: 200_000_000,
      })
    );

    expect(result.resultMonthlyRent).toBe(0);
    expect(result.warnings.length).toBeGreaterThan(0);
    expect(result.warnings[0]).toContain('월세 발생이 없습니다');
  });

  it('새 보증금 > 전세 보증금 → 월세 0, warning', () => {
    const result = calculateRentConversion(
      createInput({
        mode: 'jeonseToMonthly',
        jeonseDeposit: 100_000_000,
        newDeposit: 150_000_000,
      })
    );

    expect(result.resultMonthlyRent).toBe(0);
    expect(result.warnings.length).toBeGreaterThan(0);
  });

  it('환산보증금 = 새보증금 + 월세×100 검증', () => {
    const result = calculateRentConversion(
      createInput({
        mode: 'jeonseToMonthly',
        jeonseDeposit: 500_000_000,
        newDeposit: 200_000_000,
      })
    );

    const expectedConverted = 200_000_000 + result.resultMonthlyRent! * 100;
    expect(result.convertedDeposit).toBe(expectedConverted);
  });

  it('입력값 누락 → warning 반환', () => {
    const result = calculateRentConversion(
      createInput({
        mode: 'jeonseToMonthly',
        jeonseDeposit: undefined,
        newDeposit: 200_000_000,
      })
    );

    expect(result.warnings.length).toBeGreaterThan(0);
    expect(result.resultMonthlyRent).toBeUndefined();
  });
});

// ============================================
// Mode B: 월세 → 전세
// ============================================

describe('calculateRentConversion — Mode B (monthlyToJeonse)', () => {
  it('보증금 1억 + 월세 50만 (5.5% 전환율): 환산전세 = 1억 + 50만×12/0.055 = 209,090,909', () => {
    // 50만 × 12 / 0.055 = 109,090,909 → 10원 단위 절사
    // 전체 = 100,000,000 + 109,090,900 = 209,090,900
    const result = calculateRentConversion(
      createInput({
        mode: 'monthlyToJeonse',
        baseDeposit: 100_000_000,
        monthlyRent: 500_000,
      })
    );

    const calculated = 100_000_000 + Math.floor((500_000 * 12 / 0.055) / 10) * 10;
    expect(result.resultJeonseAmount).toBe(calculated);
    expect(result.warnings).toHaveLength(0);
  });

  it('월세 0 + 보증금 1억 → 환산전세 = 1억', () => {
    const result = calculateRentConversion(
      createInput({
        mode: 'monthlyToJeonse',
        baseDeposit: 100_000_000,
        monthlyRent: 0,
      })
    );

    expect(result.resultJeonseAmount).toBe(100_000_000);
  });

  it('환산보증금 = 기본보증금 + 월세×100', () => {
    const result = calculateRentConversion(
      createInput({
        mode: 'monthlyToJeonse',
        baseDeposit: 100_000_000,
        monthlyRent: 500_000,
      })
    );

    const expected = 100_000_000 + 500_000 * 100;
    expect(result.convertedDeposit).toBe(expected);
  });

  it('입력값 누락 → warning', () => {
    const result = calculateRentConversion(
      createInput({
        mode: 'monthlyToJeonse',
        baseDeposit: undefined,
        monthlyRent: 500_000,
      })
    );

    expect(result.warnings.length).toBeGreaterThan(0);
    expect(result.resultJeonseAmount).toBeUndefined();
  });
});

// ============================================
// Mode C: 전환율 역산
// ============================================

describe('calculateRentConversion — Mode C (rateReverse)', () => {
  it('전세 5억, 보증금 2억, 월세 150만 → 역산 전환율 = 150만×12/(3억)×100 = 6%', () => {
    // 1,500,000 × 12 / (500,000,000 - 200,000,000) × 100
    // = 18,000,000 / 300,000,000 × 100 = 6%
    const result = calculateRentConversion(
      createInput({
        mode: 'rateReverse',
        jeonseDeposit: 500_000_000,
        newDeposit: 200_000_000,
        monthlyRent: 1_500_000,
      })
    );

    expect(result.resultActualRate).toBe(6.0);
    // 6% > 5.5% 법정 상한 → warning
    expect(result.warnings.length).toBeGreaterThan(0);
    expect(result.warnings[0]).toContain('법정 상한');
  });

  it('전세 5억, 보증금 2억, 월세 120만 → 역산 전환율 = 4.8% (법정 상한 이내)', () => {
    // 1,200,000 × 12 / 300,000,000 × 100 = 4.8%
    const result = calculateRentConversion(
      createInput({
        mode: 'rateReverse',
        jeonseDeposit: 500_000_000,
        newDeposit: 200_000_000,
        monthlyRent: 1_200_000,
      })
    );

    expect(result.resultActualRate).toBe(4.8);
    // 4.8% < 5.5% → warning 없음
    expect(result.warnings.length).toBe(0);
  });

  it('전세 = 보증금 → 역산 불가, warning', () => {
    const result = calculateRentConversion(
      createInput({
        mode: 'rateReverse',
        jeonseDeposit: 200_000_000,
        newDeposit: 200_000_000,
        monthlyRent: 500_000,
      })
    );

    expect(result.resultActualRate).toBe(0);
    expect(result.warnings.length).toBeGreaterThan(0);
  });

  it('환산보증금 = 새보증금 + 월세×100', () => {
    const result = calculateRentConversion(
      createInput({
        mode: 'rateReverse',
        jeonseDeposit: 500_000_000,
        newDeposit: 200_000_000,
        monthlyRent: 1_500_000,
      })
    );

    const expected = 200_000_000 + 1_500_000 * 100;
    expect(result.convertedDeposit).toBe(expected);
  });

  it('입력값 누락 → warning', () => {
    const result = calculateRentConversion(
      createInput({
        mode: 'rateReverse',
        jeonseDeposit: 500_000_000,
        newDeposit: undefined,
        monthlyRent: 1_500_000,
      })
    );

    expect(result.warnings.length).toBeGreaterThan(0);
    expect(result.resultActualRate).toBeUndefined();
  });
});

// ============================================
// 법정 상한 적용 검증
// ============================================

describe('calculateRentConversion — 법정 상한 계산', () => {
  it('기준금리 3.5% + 가산비율 2% = 5.5% (연 10% 상한보다 낮음)', () => {
    const result = calculateRentConversion(
      createInput({
        mode: 'jeonseToMonthly',
        jeonseDeposit: 100_000_000,
        newDeposit: 50_000_000,
        baseRatePercent: 3.5,
        additionalRatePercent: 2.0,
        annualCapPercent: 10.0,
      })
    );

    expect(result.appliedConversionRatePercent).toBeCloseTo(5.5, 1);
  });

  it('기준금리 10% + 가산비율 2% = 12% → 상한 10%로 제한', () => {
    const result = calculateRentConversion(
      createInput({
        mode: 'jeonseToMonthly',
        jeonseDeposit: 100_000_000,
        newDeposit: 50_000_000,
        baseRatePercent: 10.0,
        additionalRatePercent: 2.0,
        annualCapPercent: 10.0,
      })
    );

    expect(result.appliedConversionRatePercent).toBeCloseTo(10.0, 1);
  });

  it('기준금리 0% + 가산비율 2% = 2% → 전환율 2%', () => {
    const result = calculateRentConversion(
      createInput({
        mode: 'jeonseToMonthly',
        jeonseDeposit: 100_000_000,
        newDeposit: 50_000_000,
        baseRatePercent: 0.0,
        additionalRatePercent: 2.0,
        annualCapPercent: 10.0,
      })
    );

    expect(result.appliedConversionRatePercent).toBeCloseTo(2.0, 1);
  });
});

// ============================================
// 기본값 테스트
// ============================================

describe('calculateRentConversion — 기본값 적용', () => {
  it('기본값 미지정 시 BANK_OF_KOREA_BASE_RATE_DEFAULT (3.5%) 적용', () => {
    const result = calculateRentConversion(
      createInput({
        mode: 'jeonseToMonthly',
        jeonseDeposit: 100_000_000,
        newDeposit: 50_000_000,
        baseRatePercent: undefined,
        additionalRatePercent: undefined,
        annualCapPercent: undefined,
      })
    );

    // 기본 3.5% + 2% = 5.5% 또는 10% (더 낮은 값) = 5.5%
    expect(result.appliedConversionRatePercent).toBeCloseTo(5.5, 1);
  });
});

// ============================================
// 10원 단위 절사 검증
// ============================================

describe('calculateRentConversion — 10원 단위 절사', () => {
  it('Mode A: 월세 계산 후 10원 단위 절사', () => {
    // 33,333,333 × 0.055 / 12 = 152,881.77... → 10원 단위 절사 = 152,880
    const result = calculateRentConversion(
      createInput({
        mode: 'jeonseToMonthly',
        jeonseDeposit: 100_000_000,
        newDeposit: 66_666_667,
      })
    );

    const raw = (100_000_000 - 66_666_667) * 0.055 / 12;
    const expected = Math.floor(raw / 10) * 10;
    expect(result.resultMonthlyRent).toBe(expected);
  });

  it('Mode B: 환산전세 계산 후 10원 단위 절사', () => {
    // 1,000,000 × 12 / 0.055 = 218,181,818.18... → 10원 단위 절사
    const result = calculateRentConversion(
      createInput({
        mode: 'monthlyToJeonse',
        baseDeposit: 100_000_000,
        monthlyRent: 1_000_000,
      })
    );

    const raw = 1_000_000 * 12 / 0.055;
    const expected = 100_000_000 + Math.floor(raw / 10) * 10;
    expect(result.resultJeonseAmount).toBe(expected);
  });
});

// ============================================
// 경계값 테스트
// ============================================

describe('calculateRentConversion — 경계값', () => {
  it('차액이 매우 작은 경우 (1원): 월세 0', () => {
    const result = calculateRentConversion(
      createInput({
        mode: 'jeonseToMonthly',
        jeonseDeposit: 100_000_001,
        newDeposit: 100_000_000,
      })
    );

    expect(result.resultMonthlyRent).toBe(0);
  });

  it('매우 큰 금액 (100억): 계산 정확성 검증', () => {
    const result = calculateRentConversion(
      createInput({
        mode: 'jeonseToMonthly',
        jeonseDeposit: 10_000_000_000,
        newDeposit: 5_000_000_000,
      })
    );

    const expected = Math.floor((5_000_000_000 * 0.055) / 12 / 10) * 10;
    expect(result.resultMonthlyRent).toBe(expected);
  });
});
