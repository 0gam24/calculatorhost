/**
 * 대출한도 계산 테스트 — DSR·LTV·DTI·스트레스 DSR·주담대 최대한도
 *
 * 2026-10-14 개정: 2025·2026 규제 반영 (규제지역 LTV 40%, 수도권·규제지역 주담대 6억·4억·2억,
 * 수도권·규제지역 스트레스 금리 3.0%p, 지방 0.75%p, 생애최초 수도권 70%·지방 80%, 만기 최장 30년).
 * 근거: 금융위원회 2025-10-15·2026-04-01·2026-06-30·2026-08-13 발표, 정책브리핑 2025-06-27.
 *
 * 테스트 케이스 설계:
 * 1. 상수 헬퍼 (LTV·DTI·DSR·최대한도·스트레스 가산)
 * 2. DSR·LTV·DTI·최대한도 개별 한도
 * 3. 최종 결정적 제약 식별
 * 4. 상환 방식별 차이
 * 5. 스트레스 DSR (지역·금리 유형)
 * 6. 경계값 및 엣지 케이스
 *
 * 명세: docs/calculator-spec/대출한도.md §8
 */

import { describe, it, expect } from 'vitest';
import {
  calculateLoanLimit,
  calculatePrincipalFromMonthlyPayment,
  type LoanLimitInput,
} from '../../../src/lib/finance/loan-limit';
import {
  getLtvRate,
  getDsrLimit,
  getDtiLimit,
  getMortgageCap,
  getStressAddOnPercent,
} from '../../../src/lib/constants/loan-rules-2026';

// ============================================
// 헬퍼 함수
// ============================================

/** 원리금균등 원금 1원당 월상환액 (검증용) */
function amortizationFactor(annualRate: number, termYears: number): number {
  const r = annualRate / 12 / 100;
  const n = Math.round(termYears * 12);
  if (r === 0) return 1 / n;
  return (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
}

function createInput(overrides?: Partial<LoanLimitInput>): LoanLimitInput {
  return {
    annualIncome: 60_000_000,
    existingDebtAnnualPayment: 0,
    existingDebtAnnualInterest: 0,
    collateralValue: 500_000_000,
    region: 'local',
    housingStatus: 'general',
    lender: 'bank',
    newLoanAnnualRate: 4.0,
    newLoanTermYears: 30,
    applyStressDsr: false,
    repaymentType: 'amortization',
    ...overrides,
  };
}

// ============================================
// 1. 상수 헬퍼
// ============================================

describe('상수 및 헬퍼 함수 (2026-10 규제)', () => {
  it('getLtvRate: 규제지역 40%, 그 밖의 수도권·지방 70% (무주택·처분조건부 1주택)', () => {
    expect(getLtvRate('regulated', 'general')).toBe(0.4);
    expect(getLtvRate('capitalArea', 'general')).toBe(0.7);
    expect(getLtvRate('local', 'general')).toBe(0.7);
  });

  it('getLtvRate: 생애최초는 수도권·규제지역 70%, 지방 80%', () => {
    expect(getLtvRate('regulated', 'firstHome')).toBe(0.7);
    expect(getLtvRate('capitalArea', 'firstHome')).toBe(0.7);
    expect(getLtvRate('local', 'firstHome')).toBe(0.8);
  });

  it('getDsrLimit: 은행 40%, 2금융 50%', () => {
    expect(getDsrLimit('bank')).toBe(0.4);
    expect(getDsrLimit('nonBank')).toBe(0.5);
  });

  it('getDtiLimit: 규제지역 40%, 그 밖의 지역 60%', () => {
    expect(getDtiLimit('regulated')).toBe(0.4);
    expect(getDtiLimit('capitalArea')).toBe(0.6);
    expect(getDtiLimit('local')).toBe(0.6);
  });

  it('getMortgageCap: 수도권·규제지역 시가 15억 이하 6억, 25억 이하 4억, 초과 2억', () => {
    expect(getMortgageCap('regulated', 1_500_000_000, 'general')).toBe(600_000_000);
    expect(getMortgageCap('regulated', 1_500_000_001, 'general')).toBe(400_000_000);
    expect(getMortgageCap('regulated', 2_500_000_000, 'general')).toBe(400_000_000);
    expect(getMortgageCap('regulated', 2_500_000_001, 'general')).toBe(200_000_000);
    expect(getMortgageCap('capitalArea', 800_000_000, 'general')).toBe(600_000_000);
  });

  it('getMortgageCap: 지방 일반은 한도 없음, 지방 생애최초는 6억', () => {
    expect(getMortgageCap('local', 2_000_000_000, 'general')).toBeNull();
    expect(getMortgageCap('local', 900_000_000, 'firstHome')).toBe(600_000_000);
  });

  it('getStressAddOnPercent: 수도권·규제지역 변동 3.0, 혼합 2.4, 주기 1.2, 고정 0', () => {
    expect(getStressAddOnPercent('regulated', 'variable')).toBe(3);
    expect(getStressAddOnPercent('capitalArea', 'variable')).toBe(3);
    expect(getStressAddOnPercent('capitalArea', 'mixed')).toBe(2.4);
    expect(getStressAddOnPercent('capitalArea', 'periodic')).toBe(1.2);
    expect(getStressAddOnPercent('regulated', 'fixed')).toBe(0);
  });

  it('getStressAddOnPercent: 지방 변동 0.75, 혼합 0.45, 주기 0.225, 고정 0', () => {
    expect(getStressAddOnPercent('local', 'variable')).toBe(0.75);
    expect(getStressAddOnPercent('local', 'mixed')).toBe(0.45);
    expect(getStressAddOnPercent('local', 'periodic')).toBe(0.225);
    expect(getStressAddOnPercent('local', 'fixed')).toBe(0);
  });
});

// ============================================
// 2. DSR 기반 한도
// ============================================

describe('DSR 기반 대출한도', () => {
  it('[명세 케이스] 연소득 6000만, 기존연원리금 600만 → 여력 연1800만', () => {
    const result = calculateLoanLimit(
      createInput({ existingDebtAnnualPayment: 6_000_000, existingDebtAnnualInterest: 6_000_000 }),
    );
    // DSR 40%: 60M × 0.4 = 24M, 기존 6M → 여력 18M → 월 1.5M
    const expectedPrincipal = calculatePrincipalFromMonthlyPayment(1_500_000, 4.0, 30, 'amortization');
    expect(result.dsrLimit).toBeGreaterThan(0);
    expect(Math.abs(result.dsrLimit - expectedPrincipal)).toBeLessThanOrEqual(1);
  });

  it('기존 연원리금이 DSR 한도 초과 → 신규 한도 0', () => {
    const result = calculateLoanLimit(
      createInput({ existingDebtAnnualPayment: 25_000_000, existingDebtAnnualInterest: 25_000_000 }),
    );
    expect(result.dsrLimit).toBe(0);
    expect(result.warnings.length).toBeGreaterThan(0);
  });

  it('은행(40%) vs 2금융(50%) → 2금융이 더 큰 한도', () => {
    const bank = calculateLoanLimit(createInput({ lender: 'bank' }));
    const nonBank = calculateLoanLimit(createInput({ lender: 'nonBank' }));
    expect(nonBank.dsrLimit).toBeGreaterThan(bank.dsrLimit);
  });
});

// ============================================
// 3. 스트레스 DSR (지역·금리 유형)
// ============================================

describe('스트레스 DSR (2026-10)', () => {
  it('수도권 변동형: 약정 4.0% + 3.0%p = 7.0% 로 DSR 한도 계산', () => {
    const result = calculateLoanLimit(
      createInput({ region: 'capitalArea', applyStressDsr: true, rateType: 'variable' }),
    );
    const expected = Math.floor(2_000_000 / amortizationFactor(7.0, 30));
    expect(result.appliedStressRate).toBe(3);
    expect(Math.abs(result.dsrLimit - expected)).toBeLessThanOrEqual(1);
  });

  it('지방 변동형은 0.75%p 만 더한다', () => {
    const result = calculateLoanLimit(
      createInput({ region: 'local', applyStressDsr: true, rateType: 'variable' }),
    );
    const expected = Math.floor(2_000_000 / amortizationFactor(4.75, 30));
    expect(result.appliedStressRate).toBe(0.75);
    expect(Math.abs(result.dsrLimit - expected)).toBeLessThanOrEqual(1);
  });

  it('금리 유형별 한도: 고정 > 주기 > 혼합 > 변동 (수도권)', () => {
    const limit = (rateType: LoanLimitInput['rateType']) =>
      calculateLoanLimit(createInput({ region: 'capitalArea', applyStressDsr: true, rateType }))
        .dsrLimit;
    expect(limit('fixed')).toBeGreaterThan(limit('periodic'));
    expect(limit('periodic')).toBeGreaterThan(limit('mixed'));
    expect(limit('mixed')).toBeGreaterThan(limit('variable'));
  });

  it('혼합형: 수도권 2.4%p, 지방 0.45%p 를 더해 DSR 한도 계산', () => {
    const capital = calculateLoanLimit(
      createInput({ region: 'capitalArea', applyStressDsr: true, rateType: 'mixed' }),
    );
    const local = calculateLoanLimit(
      createInput({ region: 'local', applyStressDsr: true, rateType: 'mixed' }),
    );
    expect(capital.appliedStressRate).toBe(2.4);
    expect(local.appliedStressRate).toBe(0.45);
    expect(Math.abs(capital.dsrLimit - Math.floor(2_000_000 / amortizationFactor(6.4, 30)))).toBeLessThanOrEqual(1);
    expect(Math.abs(local.dsrLimit - Math.floor(2_000_000 / amortizationFactor(4.45, 30)))).toBeLessThanOrEqual(1);
  });

  it('고정형은 가산 0, 스트레스 끄면 appliedStressRate null', () => {
    const fixed = calculateLoanLimit(
      createInput({ region: 'regulated', applyStressDsr: true, rateType: 'fixed' }),
    );
    const off = calculateLoanLimit(createInput({ region: 'regulated', applyStressDsr: false }));
    expect(fixed.appliedStressRate).toBe(0);
    expect(off.appliedStressRate).toBeNull();
    expect(fixed.dsrLimit).toBe(off.dsrLimit);
  });

  it('rateType 생략 시 변동형으로 본다 (가장 보수적)', () => {
    const omitted = calculateLoanLimit(createInput({ region: 'capitalArea', applyStressDsr: true }));
    expect(omitted.appliedStressRate).toBe(3);
  });

  it('월 예상 상환액은 스트레스 금리가 아니라 실제 약정금리로 계산한다', () => {
    const result = calculateLoanLimit(
      createInput({ region: 'capitalArea', applyStressDsr: true, rateType: 'variable' }),
    );
    const expected = Math.floor(result.finalLimit * amortizationFactor(4.0, 30));
    expect(result.monthlyPaymentAtLimit).toBe(expected);
  });
});

// ============================================
// 4. LTV·주담대 최대한도
// ============================================

describe('LTV·주담대 최대한도 (2026-10)', () => {
  it('지방 5억 일반 → LTV 70% 3.5억, 최대한도 없음', () => {
    const result = calculateLoanLimit(createInput({ annualIncome: 100_000_000 }));
    expect(result.ltvLimit).toBe(350_000_000);
    expect(result.mortgageCap).toBeNull();
  });

  it('규제지역(서울) 12억 → LTV 40% 4.8억, 최대한도 6억 → LTV 가 결정', () => {
    const result = calculateLoanLimit(
      createInput({ region: 'regulated', collateralValue: 1_200_000_000, annualIncome: 300_000_000 }),
    );
    expect(result.ltvLimit).toBe(480_000_000);
    expect(result.mortgageCap).toBe(600_000_000);
    expect(result.finalLimit).toBe(480_000_000);
    expect(result.bindingConstraint).toBe('LTV');
  });

  it('그 밖의 수도권 10억 → LTV 7억이어도 최대한도 6억', () => {
    const result = calculateLoanLimit(
      createInput({
        region: 'capitalArea',
        collateralValue: 1_000_000_000,
        annualIncome: 300_000_000,
      }),
    );
    expect(result.ltvLimit).toBe(700_000_000);
    expect(result.mortgageCap).toBe(600_000_000);
    expect(result.finalLimit).toBe(600_000_000);
    expect(result.bindingConstraint).toBe('CAP');
  });

  it('규제지역 시가 정확히 15억 → LTV 6억 = 최대한도 6억', () => {
    const result = calculateLoanLimit(
      createInput({
        region: 'regulated',
        collateralValue: 1_500_000_000,
        annualIncome: 300_000_000,
      }),
    );
    expect(result.ltvLimit).toBe(600_000_000);
    expect(result.mortgageCap).toBe(600_000_000);
    expect(result.finalLimit).toBe(600_000_000);
  });

  it('규제지역 시가 15억 1원 → 최대한도 4억 (15억 초과)', () => {
    const result = calculateLoanLimit(
      createInput({
        region: 'regulated',
        collateralValue: 1_500_000_001,
        annualIncome: 300_000_000,
      }),
    );
    expect(result.mortgageCap).toBe(400_000_000);
    expect(result.finalLimit).toBe(400_000_000);
    expect(result.bindingConstraint).toBe('CAP');
  });

  it('규제지역 20억 → LTV 8억이어도 시가 15억 초과라 최대 4억', () => {
    const result = calculateLoanLimit(
      createInput({
        region: 'regulated',
        collateralValue: 2_000_000_000,
        annualIncome: 500_000_000,
      }),
    );
    expect(result.finalLimit).toBe(400_000_000);
    expect(result.bindingConstraint).toBe('CAP');
  });

  it('규제지역 30억 → 최대 2억', () => {
    const result = calculateLoanLimit(
      createInput({
        region: 'regulated',
        collateralValue: 3_000_000_000,
        annualIncome: 500_000_000,
      }),
    );
    expect(result.finalLimit).toBe(200_000_000);
  });

  it('생애최초: 지방 5억 → 80% 4억, 수도권 5억 → 70% 3.5억', () => {
    const local = calculateLoanLimit(
      createInput({ housingStatus: 'firstHome', annualIncome: 200_000_000 }),
    );
    const capital = calculateLoanLimit(
      createInput({ region: 'capitalArea', housingStatus: 'firstHome', annualIncome: 200_000_000 }),
    );
    expect(local.ltvLimit).toBe(400_000_000);
    expect(capital.ltvLimit).toBe(350_000_000);
  });

  // 2026-10-14: 700_000_000 × 0.7 = 489,999,999.99999994 (부동소수 오차) → 내림하면 1원 모자랐다
  it('LTV 한도는 부동소수 오차 없이 정확한 금액: 7억 × 70% = 4.9억', () => {
    const result = calculateLoanLimit(
      createInput({ region: 'capitalArea', collateralValue: 700_000_000, annualIncome: 300_000_000 }),
    );
    expect(result.ltvLimit).toBe(490_000_000);
  });

  it('생애최초 지방 9억 → LTV 7.2억이어도 최대 6억', () => {
    const result = calculateLoanLimit(
      createInput({
        housingStatus: 'firstHome',
        collateralValue: 900_000_000,
        annualIncome: 300_000_000,
      }),
    );
    expect(result.ltvLimit).toBe(720_000_000);
    expect(result.finalLimit).toBe(600_000_000);
    expect(result.bindingConstraint).toBe('CAP');
  });
});

// ============================================
// 5. DTI 기반 한도
// ============================================

describe('DTI 기반 대출한도', () => {
  it('규제지역 DTI 40%: 연소득 6000만, 기존 이자 300만 → 여력 연 2,100만', () => {
    const result = calculateLoanLimit(
      createInput({ region: 'regulated', existingDebtAnnualInterest: 3_000_000 }),
    );
    const expected = Math.floor(1_750_000 / amortizationFactor(4.0, 30));
    expect(Math.abs(result.dtiLimit - expected)).toBeLessThanOrEqual(1);
  });

  it('그 밖의 지역 DTI 60% 는 규제지역 40% 보다 큰 한도', () => {
    const regulated = calculateLoanLimit(createInput({ region: 'regulated' }));
    const local = calculateLoanLimit(createInput({ region: 'local' }));
    expect(local.dtiLimit).toBeGreaterThan(regulated.dtiLimit);
  });
});

// ============================================
// 6. 최종 한도 (교차)
// ============================================

describe('[명세 케이스] 최종 한도 = Min(DSR/LTV/DTI/최대한도)', () => {
  it('소득이 낮으면 DSR 이 결정', () => {
    const result = calculateLoanLimit(createInput({ annualIncome: 30_000_000 }));
    expect(result.bindingConstraint).toBe('DSR');
    expect(result.finalLimit).toBe(result.dsrLimit);
  });

  it('LTV 가 가장 작음: LTV binding', () => {
    const result = calculateLoanLimit(
      createInput({ region: 'regulated', annualIncome: 200_000_000, collateralValue: 200_000_000 }),
    );
    expect(result.ltvLimit).toBe(80_000_000);
    expect(result.bindingConstraint).toBe('LTV');
  });

  it('담보가치가 매우 작아도 최종 한도는 담보가치 이하', () => {
    const result = calculateLoanLimit(
      createInput({ annualIncome: 200_000_000, collateralValue: 10_000_000 }),
    );
    expect(result.finalLimit).toBeLessThanOrEqual(10_000_000);
    expect(result.finalLimit).toBeGreaterThanOrEqual(0);
  });

  it('2금융권·규제지역은 DTI 40% 가 DSR 50% 보다 먼저 묶일 수 있다', () => {
    // 집값 14억: LTV 5.6억, 최대한도 6억 / 연소득 5천만: DSR(50%) 약 4.36억 > DTI(40%) 약 3.49억
    const result = calculateLoanLimit(
      createInput({
        region: 'regulated',
        lender: 'nonBank',
        annualIncome: 50_000_000,
        collateralValue: 1_400_000_000,
      }),
    );
    expect(result.dtiLimit).toBeLessThan(result.dsrLimit);
    expect(result.bindingConstraint).toBe('DTI');
    expect(result.finalLimit).toBe(result.dtiLimit);
  });

  it('2금융권·규제지역 50억 집은 최대한도 2억이 가장 작다', () => {
    const result = calculateLoanLimit(
      createInput({
        region: 'regulated',
        lender: 'nonBank',
        annualIncome: 100_000_000,
        collateralValue: 5_000_000_000,
      }),
    );
    expect(result.bindingConstraint).toBe('CAP');
    expect(result.finalLimit).toBe(200_000_000);
  });
});

// ============================================
// 7. 상환 방식
// ============================================

describe('상환 방식별 한도 비교', () => {
  it('[명세 케이스] 원리금균등 기반 DSR 역산이 40% 이하', () => {
    const result = calculateLoanLimit(createInput());
    const monthly = Math.floor(result.dsrLimit * amortizationFactor(4.0, 30));
    expect((monthly * 12) / 60_000_000).toBeLessThanOrEqual(0.4 + 0.0001);
  });

  it('[명세 케이스] 만기일시·원리금균등 모두 계산된다', () => {
    expect(calculateLoanLimit(createInput({ repaymentType: 'bullet' })).dsrLimit).toBeGreaterThan(0);
    expect(calculateLoanLimit(createInput({ repaymentType: 'amortization' })).dsrLimit).toBeGreaterThan(0);
  });

  it('원금균등(첫 달 기준)은 원리금균등보다 한도가 작다', () => {
    const pe = calculateLoanLimit(createInput({ repaymentType: 'principal-equal' }));
    const am = calculateLoanLimit(createInput({ repaymentType: 'amortization' }));
    expect(pe.dsrLimit).toBeLessThan(am.dsrLimit);
  });
});

// ============================================
// 8. 만기 30년 규제
// ============================================

describe('수도권·규제지역 만기 최장 30년', () => {
  it('수도권에서 40년을 고르면 30년으로 계산하고 안내한다', () => {
    const forty = calculateLoanLimit(createInput({ region: 'capitalArea', newLoanTermYears: 40 }));
    const thirty = calculateLoanLimit(createInput({ region: 'capitalArea', newLoanTermYears: 30 }));
    expect(forty.dsrLimit).toBe(thirty.dsrLimit);
    expect(forty.warnings.some((w) => w.includes('30년'))).toBe(true);
  });

  it('지방은 40년 그대로 계산한다', () => {
    const forty = calculateLoanLimit(createInput({ region: 'local', newLoanTermYears: 40 }));
    const thirty = calculateLoanLimit(createInput({ region: 'local', newLoanTermYears: 30 }));
    expect(forty.dsrLimit).toBeGreaterThan(thirty.dsrLimit);
  });
});

// ============================================
// 9. 경계값 및 엣지 케이스
// ============================================

describe('경계값 및 엣지 케이스', () => {
  it('[명세 케이스] 기존 대출 연원리금 = 연소득 × 40% → 신규 한도 0', () => {
    const result = calculateLoanLimit(
      createInput({
        annualIncome: 50_000_000,
        existingDebtAnnualPayment: 20_000_000,
        existingDebtAnnualInterest: 20_000_000,
      }),
    );
    expect(result.dsrLimit).toBe(0);
  });

  it('[명세 케이스] 연소득 0 → 모든 한도 0 + 경고', () => {
    const result = calculateLoanLimit(createInput({ annualIncome: 0 }));
    expect(result.dsrLimit).toBe(0);
    expect(result.finalLimit).toBe(0);
    expect(result.warnings.length).toBeGreaterThan(0);
  });

  it('금리 0% (보조금 상품 등)', () => {
    const result = calculateLoanLimit(createInput({ newLoanAnnualRate: 0 }));
    expect(result.dsrLimit).toBe(Math.floor(2_000_000 * 360));
  });

  it('담보가치 0 → LTV·최종 한도 0', () => {
    const result = calculateLoanLimit(createInput({ collateralValue: 0 }));
    expect(result.ltvLimit).toBe(0);
    expect(result.finalLimit).toBe(0);
  });

  it('매우 짧은 대출 기간 (1년)', () => {
    const result = calculateLoanLimit(createInput({ newLoanTermYears: 1 }));
    expect(result.dsrLimit).toBeGreaterThan(0);
    expect(result.dsrLimit).toBeLessThan(60_000_000);
  });

  it('음수 연소득·담보가치 → 경고 + 모든 한도 0', () => {
    const income = calculateLoanLimit(createInput({ annualIncome: -1 }));
    const collateral = calculateLoanLimit(createInput({ collateralValue: -1 }));
    expect(income.finalLimit).toBe(0);
    expect(income.mortgageCap).toBeNull();
    expect(income.warnings.some((w) => w.includes('음수'))).toBe(true);
    expect(collateral.finalLimit).toBe(0);
    expect(collateral.warnings.some((w) => w.includes('음수'))).toBe(true);
  });

  it('음수 금리 → 경고를 남기고 계산은 계속', () => {
    const result = calculateLoanLimit(createInput({ newLoanAnnualRate: -1 }));
    expect(result.warnings.some((w) => w.includes('음수'))).toBe(true);
  });

  it('대출 기간 0 → 경고 + 0', () => {
    const result = calculateLoanLimit(createInput({ newLoanTermYears: 0 }));
    expect(result.finalLimit).toBe(0);
    expect(result.warnings.length).toBeGreaterThan(0);
  });
});

// ============================================
// 10. 월 상환액
// ============================================

describe('월 상환액 계산', () => {
  it('최종 한도 기준 월 상환액이 0이 아님', () => {
    const result = calculateLoanLimit(createInput());
    expect(result.finalLimit).toBeGreaterThan(0);
    expect(result.monthlyPaymentAtLimit).toBeGreaterThan(0);
  });

  it('스트레스 미적용이면 월 상환액 × 12 / 연소득 ≤ 40%', () => {
    const result = calculateLoanLimit(createInput());
    expect((result.monthlyPaymentAtLimit * 12) / 60_000_000).toBeLessThanOrEqual(0.4 + 0.0001);
  });
});

// ============================================
// 11. 경고 메시지
// ============================================

describe('경고 및 안내 메시지', () => {
  it('기존 DSR 초과 시 warning 포함', () => {
    const result = calculateLoanLimit(
      createInput({
        annualIncome: 50_000_000,
        existingDebtAnnualPayment: 25_000_000,
        existingDebtAnnualInterest: 25_000_000,
      }),
    );
    expect(result.warnings.some((w) => w.includes('DSR'))).toBe(true);
  });

  it('최종 한도 0일 때 warning 포함', () => {
    const result = calculateLoanLimit(createInput({ annualIncome: 0, collateralValue: 0 }));
    expect(result.warnings.some((w) => w.includes('불가능'))).toBe(true);
  });
});

// ============================================
// 12. 헬퍼: calculatePrincipalFromMonthlyPayment
// ============================================

describe('calculatePrincipalFromMonthlyPayment 헬퍼', () => {
  it('월 100만원 × 30년 4% 원리금균등 역산 → 약 2.09억', () => {
    const principal = calculatePrincipalFromMonthlyPayment(1_000_000, 4.0, 30, 'amortization');
    expect(principal).toBeGreaterThan(200_000_000);
    expect(principal).toBeLessThan(220_000_000);
  });

  it('월 상환액 0 → 원금 0', () => {
    expect(calculatePrincipalFromMonthlyPayment(0, 4.0, 30, 'amortization')).toBe(0);
  });
});
