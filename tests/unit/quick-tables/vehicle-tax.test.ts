// 자동차세 "구간별 바로 보기" 표 (src/lib/quick-tables/vehicle-tax.ts).
// 표의 숫자는 계산기와 같은 순수 함수에서 나와야 한다. 칸을 직접 계산값과 대조한다.
import { describe, expect, it } from 'vitest';
import { vehicleTaxQuickTable } from '@/lib/quick-tables/vehicle-tax';
import { calculateVehicleTax } from '@/lib/tax/vehicle';
import type { QuickTableData } from '@/lib/quick-tables/types';

const won = (n: number) => `${Math.round(n).toLocaleString('ko-KR')}원`;
const row = (t: QuickTableData, first: string) => t.rows.find((r) => r[0] === first);

function shape(t: QuickTableData, minRows: number) {
  expect(t.title.endsWith('?')).toBe(true);
  expect(t.caption.length).toBeGreaterThan(5);
  expect(t.note.length).toBeGreaterThan(10);
  expect(t.rows.length).toBeGreaterThanOrEqual(minRows);
  for (const r of t.rows) expect(r).toHaveLength(t.headers.length);
  const text = JSON.stringify(t);
  expect(text).not.toMatch(/NaN|Infinity|undefined|[—–]/);
}

const annual = (engineCc: number, vehicleAgeYears: number) =>
  calculateVehicleTax({
    usage: 'passengerNonBusiness',
    engineCc,
    vehicleAgeYears,
    vehicleAgeYearsSecondHalf: vehicleAgeYears,
    includeAnnualDiscount: false,
    taxYear: 2026,
  });

describe('자동차세 표', () => {
  const t = vehicleTaxQuickTable();
  it('2,000cc 신차·1,600cc 차령 5년, 계산기와 같은 1년 합계', () => {
    shape(t, 6);
    const fresh = annual(2_000, 0);
    expect(fresh.warnings).toEqual([]);
    expect(row(t, '2,000cc')?.[1]).toBe(won(fresh.totalAnnual));
    const col = t.headers.indexOf('차령 5년');
    expect(row(t, '1,600cc')?.[col]).toBe(won(annual(1_600, 5).totalAnnual));
  });

  it('차령 12년 이상은 신차의 절반 (경감 최대 50%)', () => {
    expect(row(t, '3,000cc')?.[3]).toBe(won(annual(3_000, 0).totalAnnual / 2));
  });
});
