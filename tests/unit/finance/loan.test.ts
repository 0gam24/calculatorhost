/**
 * 대출 상환 계산 단위 테스트
 *
 * 원리금균등 / 원금균등 / 만기일시 + 거치 기간 + 경계값
 * 명세: docs/calculator-spec/대출이자.md §7
 */

import { describe, expect, it } from 'vitest';
import {
  calculateLoan,
  type LoanInput,
} from '@/lib/finance/loan';

// ============================================
// 헬퍼: 입력값 생성
// ============================================

function createInput(overrides: Partial<LoanInput>): LoanInput {
  return {
    principal: 100_000_000, // 1억
    annualRate: 4,
    term: 30,
    termUnit: 'years',
    repayment: 'amortization',
    ...overrides,
  };
}

// ============================================
// 테스트 1-2: 원리금균등상환 기본 케이스
// ============================================

describe('calculateLoan — 원리금균등상환', () => {
  it('원리금균등 1억 연4% 30년 → 월 약 47.76만', () => {
    const result = calculateLoan(
      createInput({
        principal: 100_000_000,
        annualRate: 4,
        term: 30,
        termUnit: 'years',
        repayment: 'amortization',
      })
    );

    expect(result.repaymentType).toBe('amortization');
    expect(result.totalMonths).toBe(360);
    expect(result.firstMonthPayment).toBeCloseTo(477619, -3); // ±1000 허용
    expect(result.lastMonthPayment).toBeCloseTo(477619, -3);
    expect(result.schedule).toHaveLength(360);
    expect(result.schedule[359]!.balance).toBe(0); // 마지막 잔금 0
  });

  it('원리금균등 5000만 연5% 10년 → 월 약 53만', () => {
    const result = calculateLoan(
      createInput({
        principal: 50_000_000,
        annualRate: 5,
        term: 10,
        termUnit: 'years',
        repayment: 'amortization',
      })
    );

    expect(result.totalMonths).toBe(120);
    expect(result.firstMonthPayment).toBeCloseTo(530333, -2); // ±100 허용
    expect(result.schedule).toHaveLength(120);

    // 총 이자 검증: 전 스케줄의 이자 합 = totalInterest
    let sumInterest = 0;
    for (const row of result.schedule) {
      sumInterest += row.interest;
    }
    expect(sumInterest).toBe(result.totalInterest);
  });

  it('원리금균등 0% 이자 1200만 12개월 → 월 100만 정확', () => {
    const result = calculateLoan(
      createInput({
        principal: 12_000_000,
        annualRate: 0,
        term: 12,
        termUnit: 'months',
        repayment: 'amortization',
      })
    );

    expect(result.totalMonths).toBe(12);
    expect(result.firstMonthPayment).toBe(1_000_000);
    expect(result.lastMonthPayment).toBe(1_000_000);
    expect(result.totalInterest).toBe(0);

    // 모든 달이 정확히 100만
    for (const row of result.schedule) {
      expect(row.totalPayment).toBe(1_000_000);
      expect(row.interest).toBe(0);
      expect(row.principal).toBe(1_000_000);
    }
  });
});

// ============================================
// 테스트 3-4: 원금균등상환
// ============================================

describe('calculateLoan — 원금균등상환', () => {
  it('원금균등 1억 연4% 30년 첫달 vs 마지막달 비교', () => {
    const result = calculateLoan(
      createInput({
        principal: 100_000_000,
        annualRate: 4,
        term: 30,
        termUnit: 'years',
        repayment: 'principal-equal',
      })
    );

    expect(result.repaymentType).toBe('principal-equal');
    expect(result.totalMonths).toBe(360);

    // 첫달: 원금 약 27.80만, 이자 약 333.33만
    const firstRow = result.schedule[0]!;
    expect(firstRow.principal).toBeCloseTo(278057, -3); // 1억/360 ≈ 278057
    expect(firstRow.interest).toBeCloseTo(333333, -2); // 1억 × 0.04/12
    expect(firstRow.totalPayment).toBeCloseTo(611390, -3); // 278057 + 333333 = 611390

    // 마지막달: 원금 = 잔금, 이자 거의 0
    const lastRow = result.schedule[359]!;
    expect(lastRow.principal).toBeCloseTo(278057, -2);
    expect(lastRow.interest).toBeLessThan(10000); // 약 1원대
    expect(lastRow.balance).toBe(0);

    // 첫달 > 마지막달 (점감)
    expect(firstRow.totalPayment).toBeGreaterThan(lastRow.totalPayment);
  });

  it('원금균등 3000만 연6% 60개월', () => {
    const result = calculateLoan(
      createInput({
        principal: 30_000_000,
        annualRate: 6,
        term: 60,
        termUnit: 'months',
        repayment: 'principal-equal',
      })
    );

    expect(result.totalMonths).toBe(60);
    // 매월 원금 = 3000만 / 60 = 50만
    expect(result.schedule[0]!.principal).toBe(500_000);
    expect(result.schedule[59]!.principal).toBeCloseTo(500_000, -1);

    // 스케줄 원금 합 = 원래 원금
    let sumPrincipal = 0;
    for (const row of result.schedule) {
      sumPrincipal += row.principal;
    }
    expect(sumPrincipal).toBe(30_000_000);
  });
});

// ============================================
// 테스트 5-6: 만기일시상환
// ============================================

describe('calculateLoan — 만기일시상환', () => {
  it('만기일시 1억 연4% → 월 이자 = 33.33만, 마지막달 원금 + 이자', () => {
    const result = calculateLoan(
      createInput({
        principal: 100_000_000,
        annualRate: 4,
        term: 30,
        termUnit: 'years',
        repayment: 'bullet',
      })
    );

    expect(result.repaymentType).toBe('bullet');
    expect(result.totalMonths).toBe(360);

    // 처음 359달: 이자만
    for (let i = 0; i < 359; i++) {
      const row = result.schedule[i]!;
      expect(row.principal).toBe(0);
      expect(row.interest).toBeCloseTo(333333, -2); // 1억 × 0.04/12
      expect(row.totalPayment).toBeCloseTo(333333, -2);
      expect(row.balance).toBe(100_000_000); // 원금 유지
    }

    // 마지막 달: 원금 + 이자
    const lastRow = result.schedule[359]!;
    expect(lastRow.principal).toBe(100_000_000);
    expect(lastRow.interest).toBeCloseTo(333333, -2);
    expect(lastRow.totalPayment).toBeCloseTo(100_333_333, -2);
    expect(lastRow.balance).toBe(0);

    // 총 이자 = 월 이자 × 360
    expect(result.totalInterest).toBeCloseTo(333333 * 360, -1);
  });

  it('만기일시 5000만 연3% 5년', () => {
    const result = calculateLoan(
      createInput({
        principal: 50_000_000,
        annualRate: 3,
        term: 5,
        termUnit: 'years',
        repayment: 'bullet',
      })
    );

    expect(result.totalMonths).toBe(60);
    const monthlyInterest = Math.round(50_000_000 * 0.03 / 12); // 125000

    // 처음 59달
    for (let i = 0; i < 59; i++) {
      expect(result.schedule[i]!.principal).toBe(0);
      expect(result.schedule[i]!.interest).toBe(monthlyInterest);
    }

    // 마지막 달
    expect(result.schedule[59]!.principal).toBe(50_000_000);
    expect(result.schedule[59]!.interest).toBe(monthlyInterest);
  });
});

// ============================================
// 테스트 7-8: 거치 기간
// ============================================

describe('calculateLoan — 거치 기간', () => {
  it('거치 12개월 포함 원리금균등 1억 연4% 총 240개월 (거치 12 + 상환 228)', () => {
    const result = calculateLoan(
      createInput({
        principal: 100_000_000,
        annualRate: 4,
        term: 240,
        termUnit: 'months',
        repayment: 'amortization',
        graceMonths: 12,
      })
    );

    expect(result.totalMonths).toBe(240); // 거치 포함한 총 기간
    expect(result.graceInterestTotal).toBeDefined();
    expect(result.graceInterestTotal!).toBeGreaterThan(0);

    // 처음 12달: 이자만, 원금 0
    for (let i = 0; i < 12; i++) {
      const row = result.schedule[i]!;
      expect(row.principal).toBe(0);
      expect(row.interest).toBeCloseTo(333333, -2);
      expect(row.totalPayment).toBeCloseTo(333333, -2);
      expect(row.balance).toBe(100_000_000); // 원금 유지
    }

    // 13달부터: 원리금균등 (228개월 상환)
    expect(result.schedule[12]!.principal).toBeGreaterThan(0);

    // 마지막 달: 잔금 = 0
    expect(result.schedule[239]!.balance).toBe(0);

    // 거치 이자 합 검증
    let sumGraceInterest = 0;
    for (let i = 0; i < 12; i++) {
      sumGraceInterest += result.schedule[i]!.interest;
    }
    expect(sumGraceInterest).toBe(result.graceInterestTotal);
  });

  it('거치 0개월 → graceInterestTotal undefined', () => {
    const result = calculateLoan(
      createInput({
        principal: 100_000_000,
        annualRate: 4,
        term: 36,
        termUnit: 'months',
        repayment: 'amortization',
        graceMonths: 0,
      })
    );

    expect(result.totalMonths).toBe(36);
    expect(result.graceInterestTotal).toBeUndefined();
  });
});

// ============================================
// 테스트 9-10: 통합 검증
// ============================================

describe('calculateLoan — 통합 검증', () => {
  it('원금 1원 → 유효한 계산 (극소 금액)', () => {
    const result = calculateLoan(
      createInput({
        principal: 1,
        annualRate: 4,
        term: 12,
        termUnit: 'months',
        repayment: 'amortization',
      })
    );

    expect(result.schedule).toHaveLength(12);
    expect(result.totalPayment).toBeGreaterThan(0);
  });

  it('상환스케줄 원금 합 = 대출원금 (1원 오차 이내)', () => {
    const testCases = [
      { principal: 100_000_000, rate: 4, months: 360, repayment: 'amortization' as const },
      { principal: 50_000_000, rate: 5, months: 120, repayment: 'principal-equal' as const },
      { principal: 30_000_000, rate: 6, months: 60, repayment: 'bullet' as const },
    ];

    for (const tc of testCases) {
      const result = calculateLoan(
        createInput({
          principal: tc.principal,
          annualRate: tc.rate,
          term: tc.months,
          termUnit: 'months',
          repayment: tc.repayment,
        })
      );

      let sumPrincipal = 0;
      for (const row of result.schedule) {
        sumPrincipal += row.principal;
      }

      expect(Math.abs(sumPrincipal - tc.principal)).toBeLessThanOrEqual(1);
    }
  });

  it('총이자 = 총상환액 - 원금', () => {
    const result = calculateLoan(
      createInput({
        principal: 100_000_000,
        annualRate: 4,
        term: 30,
        termUnit: 'years',
        repayment: 'amortization',
      })
    );

    const calculated = result.totalPayment - 100_000_000;
    expect(result.totalInterest).toBe(calculated);
  });

  it('상환스케줄 마지막 행 잔금 === 0', () => {
    const testCases = [
      { principal: 50_000_000, rate: 3, months: 120, repayment: 'amortization' as const },
      { principal: 80_000_000, rate: 5, months: 240, repayment: 'principal-equal' as const },
      { principal: 30_000_000, rate: 4, months: 60, repayment: 'bullet' as const },
    ];

    for (const tc of testCases) {
      const result = calculateLoan(
        createInput({
          principal: tc.principal,
          annualRate: tc.rate,
          term: tc.months,
          termUnit: 'months',
          repayment: tc.repayment,
        })
      );

      if (result.schedule.length > 0) {
        expect(result.schedule[result.schedule.length - 1]!.balance).toBe(0);
      }
    }
  });

  it('월별 상환액 = 원금 + 이자', () => {
    const result = calculateLoan(
      createInput({
        principal: 100_000_000,
        annualRate: 4,
        term: 30,
        termUnit: 'years',
        repayment: 'amortization',
      })
    );

    for (const row of result.schedule) {
      expect(row.totalPayment).toBe(row.principal + row.interest);
    }
  });

  it('연도와 개월수 단위 변환 검증', () => {
    const byYear = calculateLoan(
      createInput({
        principal: 100_000_000,
        annualRate: 4,
        term: 3,
        termUnit: 'years',
        repayment: 'amortization',
      })
    );

    const byMonth = calculateLoan(
      createInput({
        principal: 100_000_000,
        annualRate: 4,
        term: 36,
        termUnit: 'months',
        repayment: 'amortization',
      })
    );

    expect(byYear.totalMonths).toBe(byMonth.totalMonths);
    expect(byYear.schedule).toHaveLength(byMonth.schedule.length);
    expect(byYear.firstMonthPayment).toBeCloseTo(byMonth.firstMonthPayment, 0);
  });

  it('term이 정수가 아닐 때 (예: 2.5년) 올림/반올림 처리', () => {
    const result = calculateLoan(
      createInput({
        principal: 100_000_000,
        annualRate: 4,
        term: 2.5,
        termUnit: 'years',
        repayment: 'amortization',
      })
    );

    expect(result.totalMonths).toBe(30); // 2.5 * 12 = 30
  });
});

// ============================================
// 테스트 11-15: 입력 검증
// ============================================

describe('calculateLoan — 입력 검증', () => {
  it('원금 <= 0 → 에러', () => {
    expect(() => {
      calculateLoan(
        createInput({
          principal: 0,
        })
      );
    }).toThrow('대출원금은 0보다 커야');

    expect(() => {
      calculateLoan(
        createInput({
          principal: -100_000_000,
        })
      );
    }).toThrow('대출원금은 0보다 커야');
  });

  it('연이자율 < 0 → 에러', () => {
    expect(() => {
      calculateLoan(
        createInput({
          annualRate: -1,
        })
      );
    }).toThrow('연 이자율은 0 이상');
  });

  it('기간 <= 0 → 에러', () => {
    expect(() => {
      calculateLoan(
        createInput({
          term: 0,
        })
      );
    }).toThrow('대출 기간은 0보다 커야');
  });

  it('거치 기간 > 총 기간 → 에러', () => {
    expect(() => {
      calculateLoan(
        createInput({
          term: 36,
          termUnit: 'months',
          repayment: 'amortization',
          graceMonths: 37,
        })
      );
    }).toThrow('거치 기간은 0 이상 총 기간 이하여야');
  });

  it('거치 기간 < 0 → 에러', () => {
    expect(() => {
      calculateLoan(
        createInput({
          graceMonths: -1,
        })
      );
    }).toThrow('거치 기간은 0 이상 총 기간 이하여야');
  });
});

// ============================================
// 테스트 16-21: 경계값 및 특례
// ============================================

describe('calculateLoan — 경계값 및 특례', () => {
  it('고금리 장기 대출 (원리금균등): 연 10% 30년', () => {
    const result = calculateLoan(
      createInput({
        principal: 100_000_000,
        annualRate: 10,
        term: 30,
        termUnit: 'years',
        repayment: 'amortization',
      })
    );

    expect(result.totalMonths).toBe(360);
    // 월 상환액 약 87.76만 (연10% 월이자 약 0.833%)
    expect(result.firstMonthPayment).toBeCloseTo(877571, -3);
    expect(result.totalInterest).toBeGreaterThan(100_000_000); // 이자가 원금보다 많음
  });

  it('저금리 단기 대출 (원금균등): 연 1.5% 12개월', () => {
    const result = calculateLoan(
      createInput({
        principal: 50_000_000,
        annualRate: 1.5,
        term: 12,
        termUnit: 'months',
        repayment: 'principal-equal',
      })
    );

    expect(result.totalMonths).toBe(12);
    const monthlyPrincipal = result.schedule[0]!.principal;
    expect(monthlyPrincipal).toBeCloseTo(50_000_000 / 12, -1);
  });

  it('만기일시 극저금리 (연 0.1%) 120개월', () => {
    const result = calculateLoan(
      createInput({
        principal: 100_000_000,
        annualRate: 0.1,
        term: 120,
        termUnit: 'months',
        repayment: 'bullet',
      })
    );

    const monthlyInterest = Math.round(100_000_000 * 0.001 / 12); // 약 83원
    expect(result.schedule[0]!.interest).toBeCloseTo(monthlyInterest, -1);
  });

  it('월 단위 기간 1개월 (최소)', () => {
    const result = calculateLoan(
      createInput({
        principal: 1_000_000,
        annualRate: 4,
        term: 1,
        termUnit: 'months',
        repayment: 'amortization',
      })
    );

    expect(result.totalMonths).toBe(1);
    expect(result.schedule).toHaveLength(1);
    expect(result.schedule[0]!.balance).toBe(0);
    expect(result.totalPayment).toBeCloseTo(1_000_000 + 3333, 0); // 원금 + 이자
  });

  it('거치 기간이 총 기간의 절반', () => {
    const result = calculateLoan(
      createInput({
        principal: 100_000_000,
        annualRate: 4,
        term: 240,
        termUnit: 'months',
        repayment: 'amortization',
        graceMonths: 120,
      })
    );

    expect(result.totalMonths).toBe(240);
    // 처음 120개월: 이자만
    for (let i = 0; i < 120; i++) {
      expect(result.schedule[i]!.principal).toBe(0);
    }
    // 120개월 이후: 원리금균등
    expect(result.schedule[120]!.principal).toBeGreaterThan(0);
  });

  it('소액 대출 1백만원 연 5% 12개월 원리금균등', () => {
    const result = calculateLoan(
      createInput({
        principal: 1_000_000,
        annualRate: 5,
        term: 12,
        termUnit: 'months',
        repayment: 'amortization',
      })
    );

    expect(result.schedule).toHaveLength(12);
    // 매달 약 85,607원 (반올림 후)
    expect(result.firstMonthPayment).toBeCloseTo(85607, -2);
    // 총 이자 약 27,289원
    expect(result.totalInterest).toBeCloseTo(27289, -2);
  });
});
