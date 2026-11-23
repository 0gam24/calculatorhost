import { describe, expect, it } from 'vitest';
import {
  calculateCardDeduction,
  calculateChildTaxCredit,
  calculateEarnedIncomeTaxCredit,
  calculateYearEndTax,
} from '@/lib/tax/year-end-tax';

describe('calculateEarnedIncomeTaxCredit (소득세법 §59)', () => {
  it('산출세액 130만 원 이하는 55% 적용 (총급여 3,300만 이하 한도 74만)', () => {
    expect(calculateEarnedIncomeTaxCredit(1_000_000, 30_000_000)).toBe(550_000);
    expect(calculateEarnedIncomeTaxCredit(1_300_000, 30_000_000)).toBe(715_000);
  });

  it('산출세액 130만 원 초과는 71.5만 + 초과분 30% 적용 후 총급여별 한도 적용', () => {
    // 3,300만 이하: 한도 74만
    expect(calculateEarnedIncomeTaxCredit(2_000_000, 33_000_000)).toBe(740_000);
    // 3,300만~7,000만: 74만 - (5,000만 - 3,300만) * 0.008 = 740,000 - 136,000 = 604,000 → 하한 660,000 적용
    expect(calculateEarnedIncomeTaxCredit(5_000_000, 50_000_000)).toBe(660_000);
    // 3,500만: 74만 - 200만 * 0.008 = 724,000
    expect(calculateEarnedIncomeTaxCredit(5_000_000, 35_000_000)).toBe(724_000);
    // 7,000만~1.2억: 66만 - (7,020만 - 7,000만) * 0.5 = 560,000
    expect(calculateEarnedIncomeTaxCredit(10_000_000, 70_200_000)).toBe(560_000);
    // 8,000만: 하한 500,000
    expect(calculateEarnedIncomeTaxCredit(10_000_000, 80_000_000)).toBe(500_000);
    // 1.2억 초과: 1억 2,020만 → 50만 - 20만 * 0.5 = 400,000
    expect(calculateEarnedIncomeTaxCredit(20_000_000, 120_200_000)).toBe(400_000);
    // 1.5억: 하한 200,000
    expect(calculateEarnedIncomeTaxCredit(20_000_000, 150_000_000)).toBe(200_000);
  });
});

describe('calculateChildTaxCredit (소득세법 §59의2, 2026년 귀속)', () => {
  it('자녀 0명 0원, 1명 25만, 2명 55만, 3명 95만, 4명 135만', () => {
    expect(calculateChildTaxCredit(0)).toBe(0);
    expect(calculateChildTaxCredit(1)).toBe(250_000);
    expect(calculateChildTaxCredit(2)).toBe(550_000);
    expect(calculateChildTaxCredit(3)).toBe(950_000);
    expect(calculateChildTaxCredit(4)).toBe(1_350_000);
  });
});

describe('calculateCardDeduction (조특법 §126의2, 2026년 귀속 자녀 한도 확대)', () => {
  it('총급여 25% 이하 사용 시 공제 0원', () => {
    const res = calculateCardDeduction({
      annualGrossSalary: 40_000_000,
      children: 0,
      creditCardSpend: 10_000_000,
      debitAndCashSpend: 0,
      marketAndTransitSpend: 0,
    });
    expect(res.minimumUsage).toBe(10_000_000);
    expect(res.deduction).toBe(0);
  });

  it('총급여 7,000만 이하 기본한도는 자녀 0명 300만 / 1명 350만 / 2명 이상 400만', () => {
    const base = {
      annualGrossSalary: 50_000_000,
      creditCardSpend: 12_500_000, // 정확히 25% 최저사용금액 소진
      debitAndCashSpend: 20_000_000, // 30% = 600만 (기본한도 초과)
      marketAndTransitSpend: 0,
    };
    expect(calculateCardDeduction({ ...base, children: 0 }).deduction).toBe(3_000_000);
    expect(calculateCardDeduction({ ...base, children: 1 }).deduction).toBe(3_500_000);
    expect(calculateCardDeduction({ ...base, children: 2 }).deduction).toBe(4_000_000);
    expect(calculateCardDeduction({ ...base, children: 3 }).deduction).toBe(4_000_000);
  });

  it('총급여 7,000만 초과 기본한도는 자녀 0명 250만 / 1명 275만 / 2명 이상 300만', () => {
    const base = {
      annualGrossSalary: 80_000_000,
      creditCardSpend: 20_000_000, // 25% 최저사용금액 소진
      debitAndCashSpend: 20_000_000, // 30% = 600만
      marketAndTransitSpend: 0,
    };
    expect(calculateCardDeduction({ ...base, children: 0 }).deduction).toBe(2_500_000);
    expect(calculateCardDeduction({ ...base, children: 1 }).deduction).toBe(2_750_000);
    expect(calculateCardDeduction({ ...base, children: 2 }).deduction).toBe(3_000_000);
  });

  it('최저사용금액은 공제율 낮은 신용카드(15%)부터 먼저 차감하고 전통시장·대중교통은 추가한도 적용', () => {
    // 총급여 4,000만 → 최저사용금액 1,000만
    // 신용카드 1,000만(최저금액 전부 소진) + 체크카드 1,000만(300만) + 전통시장 500만(200만)
    // 합계 500만 → 기본 300만 + 전통시장 추가 200만(추가한도 300만 이내) = 500만
    const res = calculateCardDeduction({
      annualGrossSalary: 40_000_000,
      children: 0,
      creditCardSpend: 10_000_000,
      debitAndCashSpend: 10_000_000,
      marketAndTransitSpend: 5_000_000,
    });
    expect(res.deduction).toBe(5_000_000);
  });

  it('추가공제는 7,000만 이하 300만 / 7,000만 초과 200만 한도로 제한된다', () => {
    const under70 = calculateCardDeduction({
      annualGrossSalary: 60_000_000,
      children: 0,
      creditCardSpend: 15_000_000,
      debitAndCashSpend: 15_000_000, // 450만
      marketAndTransitSpend: 10_000_000, // 400만 → 추가한도 300만
    });
    expect(under70.deduction).toBe(6_000_000); // 기본 300 + 추가 300

    const over70 = calculateCardDeduction({
      annualGrossSalary: 80_000_000,
      children: 0,
      creditCardSpend: 20_000_000,
      debitAndCashSpend: 15_000_000,
      marketAndTransitSpend: 10_000_000, // 400만 → 추가한도 200만
    });
    expect(over70.deduction).toBe(4_500_000); // 기본 250 + 추가 200
  });
});

describe('calculateYearEndTax 통합 검증 (2026년 귀속)', () => {
  it('총급여 0원이면 모든 세액과 공제가 0원이다', () => {
    const res = calculateYearEndTax({
      annualGrossSalary: 0,
      dependents: 1,
      children: 0,
    });
    expect(res.determinedTotalTax).toBe(0);
    expect(res.prePaidTotalTax).toBe(0);
    expect(res.refundAmount).toBe(0);
    expect(res.additionalTaxAmount).toBe(0);
  });

  it('연금저축 600만 + IRP 300만 = 900만 한도, 총급여 5,500만 이하 15% / 초과 12%', () => {
    const low = calculateYearEndTax({
      annualGrossSalary: 55_000_000,
      dependents: 1,
      children: 0,
      pensionSavings: 7_000_000, // 600만 캡
      irpContribution: 4_000_000, // 합산 900만 캡
    });
    expect(low.pensionAccountTaxCredit).toBe(1_350_000); // 900만 * 15%

    const high = calculateYearEndTax({
      annualGrossSalary: 60_000_000,
      dependents: 1,
      children: 0,
      pensionSavings: 6_000_000,
      irpContribution: 3_000_000,
    });
    expect(high.pensionAccountTaxCredit).toBe(1_080_000); // 900만 * 12%
  });

  it('월세 세액공제: 5,500만 이하 17%, 5,500만~8,000만 15%, 8,000만 초과 0원 (한도 1,000만)', () => {
    const tier1 = calculateYearEndTax({
      annualGrossSalary: 50_000_000,
      dependents: 1,
      children: 0,
      annualRent: 12_000_000, // 1,000만 캡
    });
    expect(tier1.monthlyRentEligible).toBe(true);
    expect(tier1.monthlyRentTaxCredit).toBe(1_700_000);

    const tier2 = calculateYearEndTax({
      annualGrossSalary: 80_000_000,
      dependents: 1,
      children: 0,
      annualRent: 10_000_000,
    });
    expect(tier2.monthlyRentEligible).toBe(true);
    expect(tier2.monthlyRentTaxCredit).toBe(1_500_000);

    const over = calculateYearEndTax({
      annualGrossSalary: 80_000_001,
      dependents: 1,
      children: 0,
      annualRent: 10_000_000,
    });
    expect(over.monthlyRentEligible).toBe(false);
    expect(over.monthlyRentTaxCredit).toBe(0);
  });

  it('의료비 세액공제: 총급여 3% 초과분 × 15% (일반 700만 한도), 보장성보험료 100만 × 12%', () => {
    // 총급여 5,000만 → 3% = 150만. 의료비 350만 → 초과 200만 × 15% = 30만
    const res = calculateYearEndTax({
      annualGrossSalary: 50_000_000,
      dependents: 1,
      children: 0,
      medicalExpense: 3_500_000,
      insurancePremium: 1_500_000, // 100만 캡 → 12만
    });
    expect(res.medicalTaxCredit).toBe(300_000);
    expect(res.insuranceTaxCredit).toBe(120_000);

    // 의료비가 총급여 3% 이하이면 0원
    const under = calculateYearEndTax({
      annualGrossSalary: 50_000_000,
      dependents: 1,
      children: 0,
      medicalExpense: 1_500_000,
    });
    expect(under.medicalTaxCredit).toBe(0);
  });

  it('기부금 세액공제: 1,000만 이하 15%, 초과 30%', () => {
    const res = calculateYearEndTax({
      annualGrossSalary: 100_000_000,
      dependents: 1,
      children: 0,
      donationAmount: 12_000_000,
    });
    // 1,000만 * 15% + 200만 * 30% = 150만 + 60만 = 210만
    expect(res.donationTaxCredit).toBe(2_100_000);
  });

  it('직접 입력(manual) 기납부세액 대비 결정세액이 적으면 환급, 많으면 추가납부', () => {
    const base = calculateYearEndTax({
      annualGrossSalary: 50_000_000,
      dependents: 1,
      children: 0,
      prePaidTaxMode: 'manual',
      manualPrePaidTotalTax: 5_000_000,
    });
    expect(base.determinedTotalTax).toBeLessThan(5_000_000);
    expect(base.refundAmount).toBe(5_000_000 - base.determinedTotalTax);
    expect(base.additionalTaxAmount).toBe(0);

    const owe = calculateYearEndTax({
      annualGrossSalary: 50_000_000,
      dependents: 1,
      children: 0,
      prePaidTaxMode: 'manual',
      manualPrePaidTotalTax: 100_000,
    });
    expect(owe.additionalTaxAmount).toBe(owe.determinedTotalTax - 100_000);
    expect(owe.refundAmount).toBe(0);
  });

  it('결정세액은 0원 미만으로 내려가지 않고 환급액은 기납부세액을 넘지 않는다', () => {
    const res = calculateYearEndTax({
      annualGrossSalary: 40_000_000,
      dependents: 3,
      children: 2,
      pensionSavings: 6_000_000,
      irpContribution: 3_000_000,
      annualRent: 10_000_000,
      prePaidTaxMode: 'manual',
      manualPrePaidTotalTax: 800_000,
    });
    expect(res.determinedIncomeTax).toBe(0);
    expect(res.determinedLocalTax).toBe(0);
    expect(res.determinedTotalTax).toBe(0);
    expect(res.refundAmount).toBe(800_000);
  });

  it('음수 금액이나 잘못된 부양가족 수 입력 시 RangeError 를 던진다', () => {
    expect(() =>
      calculateYearEndTax({ annualGrossSalary: -1, dependents: 1, children: 0 }),
    ).toThrow(RangeError);
    expect(() =>
      calculateYearEndTax({ annualGrossSalary: 50_000_000, dependents: 0, children: 0 }),
    ).toThrow(RangeError);
  });
});
