// 계산기 페이지의 "구간별 바로 보기" 표 (src/lib/quick-tables).
// 표의 숫자는 계산기와 같은 순수 함수에서 나와야 한다. 칸마다 직접 계산값과 대조한다.
import { describe, expect, it } from 'vitest';
import {
  salaryQuickTable,
  loanQuickTable,
  weeklyHolidayQuickTable,
  acquisitionQuickTable,
  giftQuickTable,
  capitalGainsQuickTable,
  vatQuickTable,
  depositQuickTable,
  savingsQuickTable,
  severanceQuickTable,
} from '@/lib/quick-tables';
import { calculateTakeHome } from '@/lib/tax/income';
import { calculateLoan } from '@/lib/finance/loan';
import { calculateWeeklyHolidayAllowance } from '@/lib/work/weekly-holiday-allowance';
import { calculateAcquisitionTax } from '@/lib/tax/acquisition';
import { calculateGiftTax } from '@/lib/tax/gift';
import { calculateTransferTax } from '@/lib/tax/transfer';
import { addVatToSupplyValue } from '@/lib/tax/vat';
import { calculateDeposit } from '@/lib/finance/deposit';
import { calculateSavings } from '@/lib/finance/savings';
import { calculateSeverance } from '@/lib/tax/severance';
import type { QuickTableData } from '@/lib/quick-tables/types';

const won = (n: number) => `${Math.round(n).toLocaleString('ko-KR')}원`;
const row = (t: QuickTableData, first: string) => t.rows.find((r) => r[0] === first);

function shape(t: QuickTableData, minRows: number) {
  expect(t.title.length).toBeGreaterThan(5);
  expect(t.caption.length).toBeGreaterThan(5);
  expect(t.note.length).toBeGreaterThan(10);
  expect(t.rows.length).toBeGreaterThanOrEqual(minRows);
  for (const r of t.rows) expect(r).toHaveLength(t.headers.length);
  const text = JSON.stringify(t);
  expect(text).not.toMatch(/NaN|Infinity|undefined|[\u2014\u2013]/);
}

describe('연봉 실수령액 표', () => {
  const t = salaryQuickTable();
  it('3,000만~1억 5,000만, 계산기와 같은 월 실수령액', () => {
    shape(t, 15);
    const r = calculateTakeHome({
      wageType: 'yearly', wageAmount: 50_000_000, severance: 'separate', nontaxableMonthly: 200_000,
      dependents: 1, children: 0, calculationMonth: 7, withholdingRate: 100,
    });
    expect(row(t, '5,000만 원')?.[1]).toBe(won(r.monthlyNetIncome));
    expect(row(t, '1억 5,000만 원')).toBeDefined();
  });
});

describe('대출 월 상환액 표', () => {
  const t = loanQuickTable();
  it('3억 · 연 4.5% · 30년 원리금균등', () => {
    shape(t, 6);
    const r = calculateLoan({ principal: 300_000_000, annualRate: 4.5, term: 30, termUnit: 'years', repayment: 'amortization' });
    const col = t.headers.indexOf('연 4.5%');
    expect(row(t, '3억 원')?.[col]).toBe(won(r.firstMonthPayment));
  });
});

describe('주휴수당 표', () => {
  const t = weeklyHolidayQuickTable();
  it('주 15시간 미만은 0원, 40시간은 계산기 값', () => {
    shape(t, 6);
    expect(row(t, '주 14시간')?.[1]).toBe('0원');
    const r = calculateWeeklyHolidayAllowance({ hourlyWage: 10_320, weeklyHours: 40, fullAttendance: true });
    expect(row(t, '주 40시간')?.[1]).toBe(won(r.weeklyPay));
  });
});

describe('취득세 표', () => {
  const t = acquisitionQuickTable();
  it('1주택 매매 6억·9억, 국민주택규모 이하 합계', () => {
    shape(t, 8);
    const base = {
      method: 'purchase' as const, target: 'residential' as const, houseCount: 1 as const,
      adjustedArea: false, firstHomeBuyerDiscount: false, purchaseSpecial: 'ordinary' as const,
    };
    const r6 = calculateAcquisitionTax({ ...base, areaOver85: false, acquisitionPrice: 600_000_000 });
    expect(row(t, '6억 원')?.[1]).toBe(won(r6.totalPayment));
    const r9 = calculateAcquisitionTax({ ...base, areaOver85: true, acquisitionPrice: 900_000_000 });
    expect(row(t, '9억 원')?.[2]).toBe(won(r9.totalPayment));
  });
});

describe('증여세 표', () => {
  const t = giftQuickTable();
  it('성년 자녀 3억, 신고세액공제 반영', () => {
    shape(t, 8);
    const r = calculateGiftTax({ giftValue: 300_000_000, relation: 'adultDescendant', priorGiftValue: 0, assumedDebt: 0, reportWithinDeadline: true });
    expect(row(t, '3억 원')?.[1]).toBe(won(r.finalTax));
  });
});

describe('양도소득세 표', () => {
  const t = capitalGainsQuickTable();
  it('양도차익 2억, 2주택 비조정 5년 보유', () => {
    shape(t, 6);
    const r = calculateTransferTax({
      caseType: 'general', assetType: 'house', salePrice: 500_000_000, acquisitionPrice: 300_000_000,
      necessaryExpenses: 0, holdingYears: 5, residentYears: 0, householdHouseCount: 2,
      adjustedAreaSurcharge: 'none', isShortTerm: false,
    });
    expect(row(t, '2억 원')?.[1]).toBe(won(r.totalTax));
  });
});

describe('부가세 표', () => {
  const t = vatQuickTable();
  it('공급가액 100만 원 → 부가세 10만 원', () => {
    shape(t, 6);
    const r = addVatToSupplyValue(1_000_000);
    expect(row(t, '100만 원')?.[1]).toBe(won(r.vat));
    expect(row(t, '100만 원')?.[2]).toBe(won(r.totalPrice));
  });
});

describe('예금 이자 표', () => {
  const t = depositQuickTable();
  it('5,000만 원 · 연 3.0% · 12개월 세후 이자', () => {
    shape(t, 4);
    const r = calculateDeposit({ principal: 50_000_000, annualRatePercent: 3, termMonths: 12, method: 'simple', taxType: 'general' });
    const col = t.headers.indexOf('연 3.0%');
    expect(row(t, '5,000만 원')?.[col]).toBe(won(r.posttaxInterest));
  });
});

describe('적금 이자 표', () => {
  const t = savingsQuickTable();
  it('월 50만 원 · 연 4.0% · 12개월 세후 이자', () => {
    shape(t, 4);
    const r = calculateSavings({ monthlyDeposit: 500_000, annualRatePercent: 4, termMonths: 12, method: 'simple', taxType: 'general' });
    const col = t.headers.indexOf('연 4.0%');
    expect(row(t, '월 50만 원')?.[col]).toBe(won(r.posttaxInterest));
  });
});

describe('퇴직금 표', () => {
  const t = severanceQuickTable();
  it('월 400만 원 · 10년 근속 세전 퇴직금', () => {
    shape(t, 6);
    const r = calculateSeverance({
      hireDate: '2016-10-01', leaveDate: '2026-10-01', monthlyOrdinaryWage: 4_000_000, averageMonthlyWage: 4_000_000,
      monthlyExtraAllowance: 0, annualBonus: 0, annualLeaveAllowance: 0, planType: 'statutory', includeTax: true,
    });
    const col = t.headers.indexOf('월 400만 원');
    expect(row(t, '10년')?.[col]).toBe(won(r.statutorySeverance));
  });
});
