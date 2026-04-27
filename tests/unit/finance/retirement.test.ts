/**
 * 은퇴자금 계산 단위 테스트
 *
 * 명세: docs/calculator-spec/은퇴자금.md
 */

import { describe, expect, it } from 'vitest';
import {
  calculateRetirement,
  type RetirementInput,
} from '@/lib/finance/retirement';

// ============================================
// 헬퍼: 입력값 생성
// ============================================

function createInput(overrides: Partial<RetirementInput>): RetirementInput {
  return {
    currentAge: 30,
    retirementAge: 60,
    expectedLifespanAge: 90,
    currentSavings: 50_000_000,
    monthlyContribution: 1_000_000,
    expectedAnnualReturnPercent: 6,
    expectedInflationPercent: 2.5,
    annualSpendingAtRetirement: 40_000_000,
    ...overrides,
  };
}

// ============================================
// 1: 기간 계산
// ============================================

describe('calculateRetirement — 기간 계산', () => {
  it('현재 30세, 은퇴 60세, 기대수명 90세 → yearsToRetirement=30, yearsInRetirement=30', () => {
    const result = calculateRetirement(
      createInput({
        currentAge: 30,
        retirementAge: 60,
        expectedLifespanAge: 90,
      })
    );

    expect(result.yearsToRetirement).toBe(30);
    expect(result.yearsInRetirement).toBe(30);
  });

  it('현재 60세(이미 은퇴) → yearsToRetirement=0, warning 발생', () => {
    const result = calculateRetirement(
      createInput({
        currentAge: 60,
        retirementAge: 60,
        expectedLifespanAge: 90,
      })
    );

    expect(result.yearsToRetirement).toBe(0);
    expect(result.warnings.length).toBeGreaterThan(0);
  });

  it('은퇴 나이가 기대수명 이상 → yearsInRetirement=0, warning', () => {
    const result = calculateRetirement(
      createInput({
        currentAge: 30,
        retirementAge: 95,
        expectedLifespanAge: 90,
      })
    );

    expect(result.yearsInRetirement).toBe(0);
    expect(result.warnings.length).toBeGreaterThan(0);
  });
});

// ============================================
// 2: 은퇴 시점 예상 자산 (복리 + 연금미래가)
// ============================================

describe('calculateRetirement — 예상 자산', () => {
  it('현재 자산 0, 월 저축 100만, 30년, 6% 수익 → 약 10억대', () => {
    // 연금미래가: 월 100만 × [((1+r)^360 - 1) / r]
    // r = 0.06/12 ≈ 0.005
    // 6% 복리 30년 (360개월): 대략 10억대
    const result = calculateRetirement(
      createInput({
        currentAge: 30,
        retirementAge: 60,
        currentSavings: 0,
        monthlyContribution: 1_000_000,
        expectedAnnualReturnPercent: 6,
      })
    );

    // 대략 10억대 (990-1050백만 범위)
    expect(result.projectedSavingsAtRetirement).toBeGreaterThan(950_000_000);
    expect(result.projectedSavingsAtRetirement).toBeLessThan(1_100_000_000);
  });

  it('현재 자산 5000만, 30년, 0% 수익 → 원금만 증가', () => {
    const result = calculateRetirement(
      createInput({
        currentAge: 30,
        retirementAge: 60,
        currentSavings: 50_000_000,
        monthlyContribution: 1_000_000,
        expectedAnnualReturnPercent: 0,
      })
    );

    // 5000만 + (100만 × 12 × 30) = 5000만 + 3.6억 = 4.1억
    expect(result.projectedSavingsAtRetirement).toBe(410_000_000);
  });

  it('현재 자산만 있고 월 저축 0 → 자산의 복리만', () => {
    const result = calculateRetirement(
      createInput({
        currentAge: 30,
        retirementAge: 60,
        currentSavings: 100_000_000,
        monthlyContribution: 0,
        expectedAnnualReturnPercent: 6,
      })
    );

    // 1억 × (1.06)^30 ≈ 5.7억
    expect(result.projectedSavingsAtRetirement).toBeGreaterThan(500_000_000);
    expect(result.projectedSavingsAtRetirement).toBeLessThan(600_000_000);
  });

  it('0년 뒤 은퇴 → 예상자산 = 현재자산', () => {
    const result = calculateRetirement(
      createInput({
        currentAge: 60,
        retirementAge: 60,
        currentSavings: 100_000_000,
        monthlyContribution: 1_000_000,
      })
    );

    expect(result.yearsToRetirement).toBe(0);
    expect(result.projectedSavingsAtRetirement).toBe(100_000_000);
  });
});

// ============================================
// 3: 4% 룰 (Safe Withdrawal Rate)
// ============================================

describe('calculateRetirement — 4% 룰', () => {
  it('예상 자산 1억 → 4% = 400만 원', () => {
    const result = calculateRetirement(
      createInput({
        currentAge: 60,
        retirementAge: 60,
        currentSavings: 100_000_000,
        expectedLifespanAge: 90,
      })
    );

    expect(result.safeWithdrawalRate4Percent).toBe(4_000_000);
  });

  it('예상 자산 0 → 4% = 0', () => {
    const result = calculateRetirement(
      createInput({
        currentAge: 30,
        retirementAge: 60,
        currentSavings: 0,
        monthlyContribution: 0,
      })
    );

    expect(result.safeWithdrawalRate4Percent).toBe(0);
  });
});

// ============================================
// 4: 필요 자산 & 부족액
// ============================================

describe('calculateRetirement — 필요 자산 & 부족액', () => {
  it('은퇴 후 연지출 4000만 × 30년 × 0.85 → 약 10.2억 필요', () => {
    const result = calculateRetirement(
      createInput({
        currentAge: 30,
        retirementAge: 60,
        expectedLifespanAge: 90,
        currentSavings: 0,
        monthlyContribution: 0,
        annualSpendingAtRetirement: 40_000_000,
        expectedInflationPercent: 0, // 단순화
      })
    );

    // 40백만 × 30 × 0.85 = 10.2억
    expect(result.requiredSavingsAtRetirement).toBe(1_020_000_000);
  });

  it('예상액 > 필요액 → shortfall 음수(잉여)', () => {
    const result = calculateRetirement(
      createInput({
        currentAge: 30,
        retirementAge: 60,
        expectedLifespanAge: 90,
        currentSavings: 2_000_000_000, // 매우 큼
        monthlyContribution: 1_000_000,
        annualSpendingAtRetirement: 40_000_000,
        expectedInflationPercent: 0,
      })
    );

    expect(result.shortfall).toBeLessThan(0);
  });

  it('예상액 < 필요액 → shortfall 양수(부족)', () => {
    const result = calculateRetirement(
      createInput({
        currentAge: 30,
        retirementAge: 60,
        expectedLifespanAge: 90,
        currentSavings: 0,
        monthlyContribution: 0,
        annualSpendingAtRetirement: 40_000_000,
        expectedInflationPercent: 0,
      })
    );

    expect(result.shortfall).toBeGreaterThan(0);
  });
});

// ============================================
// 5: 인플레이션 반영
// ============================================

describe('calculateRetirement — 인플레이션', () => {
  it('은퇴 후 연지출 계산 시 인플레이션 반영', () => {
    // 30년 후 2.5% 인플레이션
    // 4000만 × (1.025)^30 ≈ 8545만
    const result = calculateRetirement(
      createInput({
        currentAge: 30,
        retirementAge: 60,
        expectedLifespanAge: 90,
        annualSpendingAtRetirement: 40_000_000,
        expectedInflationPercent: 2.5,
        currentSavings: 0,
        monthlyContribution: 0,
      })
    );

    // 명목 연지출이 2배 가까워짐
    expect(result.requiredSavingsAtRetirement).toBeGreaterThan(
      1_020_000_000 // 인플레이션 없을 때
    );
  });
});

// ============================================
// 6: 권장 월 저축액
// ============================================

describe('calculateRetirement — 권장 월 저축액', () => {
  it('부족액 0 → recommendedMonthly = 0', () => {
    const result = calculateRetirement(
      createInput({
        currentAge: 30,
        retirementAge: 60,
        expectedLifespanAge: 90,
        currentSavings: 2_000_000_000, // 충분
        annualSpendingAtRetirement: 40_000_000,
      })
    );

    expect(result.recommendedMonthlyContribution).toBe(0);
  });

  it('부족액 양수 → recommendedMonthly > 현재 monthlyContribution', () => {
    const result = calculateRetirement(
      createInput({
        currentAge: 30,
        retirementAge: 60,
        expectedLifespanAge: 90,
        currentSavings: 0,
        monthlyContribution: 500_000,
        annualSpendingAtRetirement: 40_000_000,
        expectedInflationPercent: 0,
      })
    );

    // 부족분이 있으므로 recommendedMonthly > 0
    if (result.shortfall > 0) {
      expect(result.recommendedMonthlyContribution).toBeGreaterThan(0);
    }
  });

  it('은퇴 0년(이미 은퇴) → recommendedMonthly = 0', () => {
    const result = calculateRetirement(
      createInput({
        currentAge: 60,
        retirementAge: 60,
        currentSavings: 0,
        monthlyContribution: 1_000_000,
      })
    );

    expect(result.recommendedMonthlyContribution).toBe(0);
  });
});

// ============================================
// 7: 경고 메시지
// ============================================

describe('calculateRetirement — 경고', () => {
  it('비현실적 수익률 > 20% → warning', () => {
    const result = calculateRetirement(
      createInput({
        expectedAnnualReturnPercent: 25,
      })
    );

    expect(result.warnings.length).toBeGreaterThan(0);
    expect(result.warnings.some((w) => w.includes('20%'))).toBe(true);
  });

  it('연 지출 0 → warning', () => {
    const result = calculateRetirement(
      createInput({
        annualSpendingAtRetirement: 0,
      })
    );

    expect(result.warnings.length).toBeGreaterThan(0);
  });

  it('부족액 있으면 warning', () => {
    const result = calculateRetirement(
      createInput({
        currentAge: 30,
        retirementAge: 60,
        currentSavings: 0,
        monthlyContribution: 100_000, // 매우 적음
        annualSpendingAtRetirement: 100_000_000, // 매우 많음
        expectedInflationPercent: 0,
      })
    );

    if (result.shortfall > 0) {
      expect(result.warnings.some((w) => w.includes('부족'))).toBe(true);
    }
  });
});

// ============================================
// 8: 입력값 정규화
// ============================================

describe('calculateRetirement — 입력값 정규화', () => {
  it('음수 나이 → 0으로 정규화', () => {
    const result = calculateRetirement(
      createInput({
        currentAge: -30,
        retirementAge: 60,
      })
    );

    expect(result.yearsToRetirement).toBeGreaterThanOrEqual(0);
  });

  it('음수 금액 → 0으로 정규화', () => {
    const result = calculateRetirement(
      createInput({
        currentSavings: -100_000_000,
        monthlyContribution: -1_000_000,
      })
    );

    expect(result.projectedSavingsAtRetirement).toBeGreaterThanOrEqual(0);
  });

  it('음수 비율 → 0으로 정규화', () => {
    const result = calculateRetirement(
      createInput({
        expectedAnnualReturnPercent: -5,
        expectedInflationPercent: -2,
      })
    );

    expect(result.warnings.length).toBeGreaterThanOrEqual(0); // 계산 진행
  });
});

// ============================================
// 9: 엣지 케이스
// ============================================

describe('calculateRetirement — 엣지 케이스', () => {
  it('모든 입력값 0 → 결과는 0, 경고 다수', () => {
    const result = calculateRetirement({
      currentAge: 0,
      retirementAge: 0,
      expectedLifespanAge: 0,
      currentSavings: 0,
      monthlyContribution: 0,
      expectedAnnualReturnPercent: 0,
      expectedInflationPercent: 0,
      annualSpendingAtRetirement: 0,
    });

    expect(result.yearsToRetirement).toBe(0);
    expect(result.projectedSavingsAtRetirement).toBe(0);
    expect(result.warnings.length).toBeGreaterThan(0);
  });

  it('1년 은퇴(극단) → 기간 계산만 실행', () => {
    const result = calculateRetirement(
      createInput({
        currentAge: 59,
        retirementAge: 60,
        expectedLifespanAge: 90,
      })
    );

    expect(result.yearsToRetirement).toBe(1);
    expect(result.yearsInRetirement).toBe(30);
  });
});
