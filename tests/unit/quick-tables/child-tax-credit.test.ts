// 자녀장려금 계산기의 "구간별 바로 보기" 표.
// 표의 숫자는 계산기와 같은 순수 함수(calculateChildTaxCredit)에서 나와야 한다.
import { describe, expect, it } from 'vitest';
import { childTaxCreditQuickTable } from '@/lib/quick-tables/child-tax-credit';
import { calculateChildTaxCredit, type HouseholdType } from '@/lib/tax/child-tax-credit';
import { CHILD_TAX_BENEFIT_PER_CHILD } from '@/lib/constants/tax-rates-2026';
import type { QuickTableData } from '@/lib/quick-tables/types';

const won = (n: number) => `${Math.round(n).toLocaleString('ko-KR')}원`;
const row = (t: QuickTableData, first: string) => t.rows.find((r) => r[0] === first);

function shape(t: QuickTableData, minRows: number) {
  expect(t.title.length).toBeGreaterThan(5);
  expect(t.title.endsWith('?')).toBe(true);
  expect(t.caption.length).toBeGreaterThan(5);
  expect(t.note.length).toBeGreaterThan(10);
  expect(t.rows.length).toBeGreaterThanOrEqual(minRows);
  for (const r of t.rows) expect(r).toHaveLength(t.headers.length);
  const text = JSON.stringify(t);
  expect(text).not.toMatch(/NaN|Infinity|undefined|[\u2014\u2013]/);
}

const calc = (householdType: HouseholdType, income: number, childCount: number) =>
  calculateChildTaxCredit({
    householdType,
    totalAnnualIncome: income,
    annualGrossPay: income,
    childCount,
    passesAssetTest: true,
    householdAssets: 0,
  }).finalPayment;

describe('자녀장려금 표', () => {
  const t = childTaxCreditQuickTable();

  it('맞벌이 3,000만 원 자녀 2명, 홑벌이 5,000만 원 자녀 1명이 계산기 값과 같다', () => {
    shape(t, 6);
    expect(row(t, '맞벌이 3,000만 원')?.[t.headers.indexOf('자녀 2명')]).toBe(
      won(calc('dualEarner', 30_000_000, 2)),
    );
    expect(row(t, '홑벌이 5,000만 원')?.[t.headers.indexOf('자녀 1명')]).toBe(
      won(calc('singleEarner', 50_000_000, 1)),
    );
  });

  it('감액 시작 전 소득은 자녀 1명당 최대 금액, 모든 칸이 0원보다 크다', () => {
    expect(row(t, '홑벌이 2,000만 원')?.[1]).toBe(won(CHILD_TAX_BENEFIT_PER_CHILD));
    for (const r of t.rows) for (const cell of r.slice(1)) expect(cell).not.toBe('0원');
  });
});
