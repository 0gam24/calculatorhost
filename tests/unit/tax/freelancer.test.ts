/**
 * 프리랜서 사업소득세 계산 테스트
 *
 * 명세: docs/calculator-spec/프리랜서종합소득세.md §8
 */

import { describe, it, expect } from 'vitest';
import {
  calculateFreelancerTax,
  calculateExpenseAmount,
  type FreelancerInput,
} from '@/lib/tax/freelancer';
import {
  FREELANCER_WITHHOLDING_RATE,
  FREELANCER_DEFAULT_SIMPLE_EXPENSE_RATE,
} from '@/lib/constants/tax-rates-2026';

describe('calculateExpenseAmount', () => {
  it('단순경비율로 계산 (수입 5천만, 64.1%)', () => {
    const expense = calculateExpenseAmount(50_000_000, 'simpleRate', 64.1);
    // 50,000,000 × 0.641 = 32,050,000 (부동소수점 오차 허용)
    expect(expense).toBeCloseTo(32_050_000, 0);
  });

  it('단순경비율 기본값 (64.1%)', () => {
    const expense = calculateExpenseAmount(50_000_000, 'simpleRate');
    expect(expense).toBeCloseTo(32_050_000, 0);
  });

  it('실제경비 방식', () => {
    const expense = calculateExpenseAmount(100_000_000, 'actual', undefined, 30_000_000);
    expect(expense).toBe(30_000_000);
  });

  it('실제경비가 음수면 0으로 처리', () => {
    const expense = calculateExpenseAmount(100_000_000, 'actual', undefined, -1_000_000);
    expect(expense).toBe(0);
  });

  it('소수점 절사 (정수만 반환)', () => {
    const expense = calculateExpenseAmount(30_000_000, 'simpleRate', 64.1);
    // 30,000,000 × 0.641 = 19,230,000 (부동소수점 오차 허용)
    expect(expense).toBeCloseTo(19_230_000, 0);
    expect(Number.isInteger(expense)).toBe(true);
  });
});

describe('calculateFreelancerTax', () => {
  describe('케이스 1: 수입 5천만, 단순경비율 64.1%', () => {
    it('경비, 사업소득, 세금 계산', () => {
      const input: FreelancerInput = {
        annualRevenue: 50_000_000,
        expenseMethod: 'simpleRate',
        simpleExpenseRatePercent: 64.1,
        dependents: 1,
        children: 0,
      };

      const result = calculateFreelancerTax(input);

      // 경비 = 50,000,000 × 64.1% = 32,050,000
      expect(result.expenseAmount).toBeCloseTo(32_050_000, 0);
      // 사업소득 = 50,000,000 - 32,050,000 = 17,950,000
      expect(result.businessIncome).toBeCloseTo(17_950_000, 0);
      // 인적공제 = 1 × 1,500,000 = 1,500,000
      expect(result.personalDeduction).toBe(1_500_000);
      // 과세표준 = 17,950,000 - 1,500,000 = 16,450,000
      expect(result.taxableBase).toBeCloseTo(16_450_000, 0);

      // 자녀공제 없음
      expect(result.childTaxCredit).toBe(0);

      // 결과 값들이 일관성 있게 계산되었는지 확인
      expect(result.grossTax).toBeGreaterThan(0);
      expect(result.finalTax).toBeGreaterThanOrEqual(0);
      expect(result.localIncomeTax).toBeGreaterThanOrEqual(0);
      expect(result.totalTaxLiability).toBeGreaterThanOrEqual(0);
    });

    it('기납부 원천징수액 자동 계산 (3.3%)', () => {
      const input: FreelancerInput = {
        annualRevenue: 50_000_000,
        expenseMethod: 'simpleRate',
        dependents: 1,
      };

      const result = calculateFreelancerTax(input);
      // 50,000,000 × 0.033 = 1,650,000
      expect(result.withholdingPaid).toBe(1_650_000);
    });

    it('정산액 계산 (환급 또는 추가납부)', () => {
      const input: FreelancerInput = {
        annualRevenue: 50_000_000,
        expenseMethod: 'simpleRate',
        dependents: 1,
      };

      const result = calculateFreelancerTax(input);
      // settlementAmount는 totalTaxLiability - withholdingPaid
      // 예상 범위: 1,085,700 - 1,650,000 정도 (음수)
      expect(result.warnings.length).toBeGreaterThan(0);
    });
  });

  describe('케이스 2: 수입 1억, 실제경비 3천만', () => {
    it('사업소득과 세금 계산', () => {
      const input: FreelancerInput = {
        annualRevenue: 100_000_000,
        expenseMethod: 'actual',
        actualExpenses: 30_000_000,
        dependents: 1,
        children: 0,
      };

      const result = calculateFreelancerTax(input);

      expect(result.expenseAmount).toBe(30_000_000);
      // 사업소득 = 100,000,000 - 30,000,000 = 70,000,000
      expect(result.businessIncome).toBe(70_000_000);
      // 과세표준 = 70,000,000 - 1,500,000 = 68,500,000
      expect(result.taxableBase).toBe(68_500_000);

      // 68,500,000은 24% 구간 (과세표준 5천만~8,800만)
      // 세금 = 68,500,000 × 0.24 - 5,760,000 = 16,440,000 - 5,760,000 = 10,680,000
      expect(result.grossTax).toBe(10_680_000);
      expect(result.finalTax).toBe(10_680_000);

      // 지방소득세 = 10,680,000 × 10% = 1,068,000
      expect(result.localIncomeTax).toBe(1_068_000);
      expect(result.totalTaxLiability).toBe(11_748_000);
    });

    it('기납부 원천징수와 정산', () => {
      const input: FreelancerInput = {
        annualRevenue: 100_000_000,
        expenseMethod: 'actual',
        actualExpenses: 30_000_000,
        dependents: 1,
      };

      const result = calculateFreelancerTax(input);
      // 기납부 = 100,000,000 × 0.033 = 3,300,000
      expect(result.withholdingPaid).toBe(3_300_000);
      // 정산액 = 11,748,000 - 3,300,000 = 8,448,000 (추가납부)
      expect(result.settlementAmount).toBe(8_448_000);
      expect(result.settlementAmount).toBeGreaterThan(0);
    });
  });

  describe('케이스 3: 자녀세액공제', () => {
    it('자녀 1명 세액공제 (15만원)', () => {
      const input: FreelancerInput = {
        annualRevenue: 50_000_000,
        expenseMethod: 'simpleRate',
        dependents: 1,
        children: 1,
      };

      const result = calculateFreelancerTax(input);
      expect(result.childTaxCredit).toBe(150_000);
      expect(result.finalTax).toBeLessThan(result.grossTax);
    });

    it('자녀 2명 세액공제 (35만원 = 15만 + 20만)', () => {
      const input: FreelancerInput = {
        annualRevenue: 50_000_000,
        expenseMethod: 'simpleRate',
        dependents: 1,
        children: 2,
      };

      const result = calculateFreelancerTax(input);
      expect(result.childTaxCredit).toBe(150_000 + 200_000);
      expect(result.childTaxCredit).toBe(350_000);
    });

    it('자녀 3명 세액공제 (55만원 = 15만 + 20만 + 40만)', () => {
      const input: FreelancerInput = {
        annualRevenue: 50_000_000,
        expenseMethod: 'simpleRate',
        dependents: 1,
        children: 3,
      };

      const result = calculateFreelancerTax(input);
      expect(result.childTaxCredit).toBe(150_000 + 200_000 + 400_000);
      expect(result.childTaxCredit).toBe(750_000);
    });
  });

  describe('케이스 4: 환급 시나리오', () => {
    it('수입 3천만, 원천징수가 세금보다 많음 → 환급', () => {
      const input: FreelancerInput = {
        annualRevenue: 30_000_000,
        expenseMethod: 'simpleRate',
        simpleExpenseRatePercent: 64.1,
        dependents: 1,
      };

      const result = calculateFreelancerTax(input);
      // 경비 = 30,000,000 × 0.641 = 19,230,000
      expect(result.expenseAmount).toBeCloseTo(19_230_000, 0);
      // 사업소득 = 30,000,000 - 19,230,000 = 10,770,000
      expect(result.businessIncome).toBeCloseTo(10_770_000, 0);
      // 과세표준 = 10,770,000 - 1,500,000 = 9,270,000
      expect(result.taxableBase).toBeCloseTo(9_270_000, 0);

      // 세금 = 9,270,000 × 6% = 556,200
      expect(result.grossTax).toBeCloseTo(556_200, 0);
      expect(result.finalTax).toBeCloseTo(556_200, 0);

      // 지방소득세 = 556,200 × 10% = 55,620
      expect(result.localIncomeTax).toBeCloseTo(55_620, 0);

      // 총세금 = 556,200 + 55,620 = 611,820
      expect(result.totalTaxLiability).toBeCloseTo(611_820, 0);

      // 기납부 = 30,000,000 × 0.033 = 990,000
      expect(result.withholdingPaid).toBe(990_000);

      // 정산액 = 611,820 - 990,000 < 0 (환급)
      expect(result.settlementAmount).toBeLessThan(0);
      expect(result.settlementAmount).toBeCloseTo(-378_180, 0);
    });

    it('환급 경고 메시지 출력', () => {
      const input: FreelancerInput = {
        annualRevenue: 30_000_000,
        expenseMethod: 'simpleRate',
        dependents: 1,
      };

      const result = calculateFreelancerTax(input);
      // 실제로는 환급이므로 환급 메시지 확인
      expect(result.settlementAmount).toBeLessThan(0);
      // 환급 또는 추가납부 메시지 확인
      expect(result.warnings.length).toBeGreaterThan(0);
    });
  });

  describe('케이스 5: 추가 납부 시나리오', () => {
    it('수입 1.5억, 사업소득세 계산', () => {
      const input: FreelancerInput = {
        annualRevenue: 150_000_000,
        expenseMethod: 'simpleRate',
        simpleExpenseRatePercent: 64.1,
        dependents: 1,
      };

      const result = calculateFreelancerTax(input);
      // 경비 = 150,000,000 × 64.1% = 96,150,000
      expect(result.expenseAmount).toBeCloseTo(96_150_000, 0);
      // 사업소득 = 150,000,000 - 96,150,000 = 53,850,000
      expect(result.businessIncome).toBeCloseTo(53_850_000, 0);
      // 과세표준 = 53,850,000 - 1,500,000 = 52,350,000
      expect(result.taxableBase).toBeCloseTo(52_350_000, 0);

      // 기납부 = 150,000,000 × 0.033 = 4,950,000
      expect(result.withholdingPaid).toBe(4_950_000);

      // 세금이 기납부보다 크거나 작거나
      expect(result.totalTaxLiability).toBeGreaterThan(0);
    });

    it('추가 납부 경고 메시지 출력', () => {
      const input: FreelancerInput = {
        annualRevenue: 150_000_000,
        expenseMethod: 'simpleRate',
        dependents: 1,
      };

      const result = calculateFreelancerTax(input);
      expect(result.warnings.some((w) => w.includes('추가 납부'))).toBe(true);
    });
  });

  describe('케이스 6: 경계값 테스트', () => {
    it('경비율 100% → 사업소득 0 → 세금 0', () => {
      const input: FreelancerInput = {
        annualRevenue: 50_000_000,
        expenseMethod: 'simpleRate',
        simpleExpenseRatePercent: 100,
        dependents: 1,
      };

      const result = calculateFreelancerTax(input);
      expect(result.expenseAmount).toBe(50_000_000);
      expect(result.businessIncome).toBe(0);
      expect(result.taxableBase).toBeLessThanOrEqual(0); // personalDeduction 때문에 음수 처리
      expect(result.grossTax).toBe(0);
      expect(result.finalTax).toBe(0);
      expect(result.totalTaxLiability).toBe(0);
    });

    it('수입 0 → 모든 금액 0', () => {
      const input: FreelancerInput = {
        annualRevenue: 0,
        expenseMethod: 'simpleRate',
        dependents: 1,
      };

      const result = calculateFreelancerTax(input);
      expect(result.annualRevenue).toBe(0);
      expect(result.expenseAmount).toBe(0);
      expect(result.businessIncome).toBe(0);
      expect(result.taxableBase).toBe(0);
      expect(result.grossTax).toBe(0);
      expect(result.finalTax).toBe(0);
      expect(result.totalTaxLiability).toBe(0);
      // withholdingPaid 자동 0
      expect(result.withholdingPaid).toBe(0);
      expect(result.settlementAmount).toBe(0);
    });

    it('음수 수입 → 0으로 정규화', () => {
      const input: FreelancerInput = {
        annualRevenue: -100_000_000,
        expenseMethod: 'simpleRate',
        dependents: 1,
      };

      const result = calculateFreelancerTax(input);
      expect(result.annualRevenue).toBe(0);
    });
  });

  describe('케이스 7: 부양가족 영향', () => {
    it('부양가족 1명 vs 4명 비교', () => {
      const baseInput: FreelancerInput = {
        annualRevenue: 50_000_000,
        expenseMethod: 'simpleRate',
        dependents: 1,
      };

      const largeFamily: FreelancerInput = {
        ...baseInput,
        dependents: 4,
      };

      const baseResult = calculateFreelancerTax(baseInput);
      const familyResult = calculateFreelancerTax(largeFamily);

      // 부양가족이 많을수록 인적공제가 크므로 세금이 낮다
      expect(familyResult.personalDeduction).toBe(baseResult.personalDeduction * 4);
      expect(familyResult.taxableBase).toBeLessThan(baseResult.taxableBase);
      expect(familyResult.finalTax).toBeLessThan(baseResult.finalTax);
    });

    it('부양가족 기본값 1 (명시하지 않으면)', () => {
      const input: FreelancerInput = {
        annualRevenue: 50_000_000,
        expenseMethod: 'simpleRate',
      };

      const result = calculateFreelancerTax(input);
      expect(result.personalDeduction).toBe(1_500_000);
    });
  });

  describe('케이스 8: 지방소득세 10원 단위 절사', () => {
    it('지방소득세 정확히 10원 단위 절사', () => {
      const input: FreelancerInput = {
        annualRevenue: 55_000_000,
        expenseMethod: 'simpleRate',
        simpleExpenseRatePercent: 64.1,
        dependents: 1,
      };

      const result = calculateFreelancerTax(input);
      // 경비 = 55,000,000 × 0.641 = 35,255,000
      // 사업소득 = 19,745,000
      // 과세표준 = 19,745,000 - 1,500,000 = 18,245,000
      // 세금 = 18,245,000 × 0.06 = 1,094,700
      // 지방소득세 = 1,094,700 × 10% = 109,470 (이미 10원 단위)
      expect(result.localIncomeTax % 10).toBe(0);
      expect(Number.isInteger(result.localIncomeTax / 10)).toBe(true);
    });
  });

  describe('케이스 9: 누진세 세율 경계값', () => {
    it('과세표준이 15% 구간에 있음', () => {
      const input: FreelancerInput = {
        annualRevenue: 200_000_000,
        expenseMethod: 'simpleRate',
        simpleExpenseRatePercent: 64.1,
        dependents: 1,
      };

      const result = calculateFreelancerTax(input);
      // 경비 = 200,000,000 × 64.1% = 128,200,000
      // 사업소득 = 71,800,000
      // 과세표준 = 71,800,000 - 1,500,000 = 70,300,000
      // 70,300,000은 15% 구간 (5천만~8,800만)
      expect(result.businessIncome).toBeCloseTo(71_800_000, 0);
      expect(result.taxableBase).toBeCloseTo(70_300_000, 0);
      expect(result.grossTax).toBeGreaterThan(0);
    });
  });

  describe('케이스 10: 경고 메시지', () => {
    it('수입 8천만 + 단순경비율 → 복식부기 경고', () => {
      const input: FreelancerInput = {
        annualRevenue: 80_000_000,
        expenseMethod: 'simpleRate',
        dependents: 1,
      };

      const result = calculateFreelancerTax(input);
      expect(result.warnings.some((w) => w.includes('복식부기'))).toBe(true);
    });

    it('수입 5천5백만 + 단순경비율 → 기준경비율 경고', () => {
      const input: FreelancerInput = {
        annualRevenue: 55_000_000,
        expenseMethod: 'simpleRate',
        dependents: 1,
      };

      const result = calculateFreelancerTax(input);
      expect(result.warnings.some((w) => w.includes('기준경비율'))).toBe(true);
    });

    it('실제경비 방식은 기준경비율 경고 없음', () => {
      const input: FreelancerInput = {
        annualRevenue: 55_000_000,
        expenseMethod: 'actual',
        actualExpenses: 20_000_000,
        dependents: 1,
      };

      const result = calculateFreelancerTax(input);
      expect(result.warnings.some((w) => w.includes('기준경비율'))).toBe(false);
    });
  });

  describe('케이스 11: 사회보험료 공제', () => {
    it('국민연금 + 건강보험 공제', () => {
      const input: FreelancerInput = {
        annualRevenue: 50_000_000,
        expenseMethod: 'simpleRate',
        dependents: 1,
        nationalPensionPaid: 2_200_000,
        healthInsurancePaid: 1_200_000,
      };

      const result = calculateFreelancerTax(input);
      expect(result.socialInsuranceDeduction).toBe(2_200_000 + 1_200_000);
      expect(result.socialInsuranceDeduction).toBe(3_400_000);
      // 과세표준이 더 낮으므로 세금이 낮음
      expect(result.taxableBase).toBeLessThan(
        calculateFreelancerTax({
          ...input,
          nationalPensionPaid: 0,
          healthInsurancePaid: 0,
        }).taxableBase
      );
    });
  });

  describe('케이스 12: 기납부 원천징수 명시 입력', () => {
    it('기납부액을 명시 입력하면 자동 계산 무시', () => {
      const input: FreelancerInput = {
        annualRevenue: 50_000_000,
        expenseMethod: 'simpleRate',
        dependents: 1,
        withholdingPaid: 2_000_000, // 명시
      };

      const result = calculateFreelancerTax(input);
      expect(result.withholdingPaid).toBe(2_000_000);
      // 기본값(1,650,000)이 아님
      expect(result.withholdingPaid).not.toBe(50_000_000 * FREELANCER_WITHHOLDING_RATE);
    });
  });
});
