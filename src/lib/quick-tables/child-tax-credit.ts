import { calculateChildTaxCredit, type HouseholdType } from '@/lib/tax/child-tax-credit';
import {
  CHILD_TAX_BENEFIT_PER_CHILD,
  CHILD_TAX_BENEFIT_INCOME_CAP,
  CHILD_TAX_BENEFIT_INCOME_PHASE_OUT_START,
  CHILD_TAX_BENEFIT_DUAL_PHASE_OUT_START,
  CHILD_TAX_BENEFIT_ASSET_CAP,
  CHILD_TAX_BENEFIT_ASSET_REDUCTION_START,
} from '@/lib/constants/tax-rates-2026';
import type { QuickTableData } from './types';
import { manWon, won } from './format';

/**
 * 가구 유형·부부 합산 총소득·자녀 수별 자녀장려금 추정액.
 * 총소득 = 총급여액등, 재산 1.7억 원 미만(감액 없음)으로 고정한다.
 */
export function childTaxCreditQuickTable(): QuickTableData {
  const households: { type: HouseholdType; label: string }[] = [
    { type: 'singleEarner', label: '홑벌이' },
    { type: 'dualEarner', label: '맞벌이' },
  ];
  const incomes = [20_000_000, 30_000_000, 40_000_000, 50_000_000, 60_000_000, 65_000_000];
  const childCounts = [1, 2, 3];
  const calc = (householdType: HouseholdType, income: number, childCount: number) =>
    calculateChildTaxCredit({
      householdType,
      totalAnnualIncome: income,
      annualGrossPay: income,
      childCount,
      passesAssetTest: true,
      householdAssets: 0,
    }).finalPayment;
  return {
    title: '가구 소득과 자녀 수별 자녀장려금은 얼마인가요?',
    caption: `홑벌이·맞벌이 가구의 연간 자녀장려금 추정액 (재산 ${manWon(CHILD_TAX_BENEFIT_ASSET_REDUCTION_START)} 미만)`,
    headers: ['가구 · 부부 합산 총소득', ...childCounts.map((n) => `자녀 ${n}명`)],
    rows: households.flatMap(({ type, label }) =>
      incomes.map((income) => [
        `${label} ${manWon(income)}`,
        ...childCounts.map((n) => won(calc(type, income, n))),
      ]),
    ),
    note: `부부 합산 총소득과 지급액을 정하는 총급여액등이 같고, 가구 재산이 ${manWon(CHILD_TAX_BENEFIT_ASSET_REDUCTION_START)} 미만이며, 자녀가 18세 미만 등 부양자녀 요건을 갖췄다고 가정했습니다. 자녀 1명당 최대 ${manWon(CHILD_TAX_BENEFIT_PER_CHILD)}이고, 홑벌이는 ${manWon(CHILD_TAX_BENEFIT_INCOME_PHASE_OUT_START)}, 맞벌이는 ${manWon(CHILD_TAX_BENEFIT_DUAL_PHASE_OUT_START)}부터 줄어 ${manWon(CHILD_TAX_BENEFIT_INCOME_CAP)} 직전에 1명당 ${manWon(CHILD_TAX_BENEFIT_PER_CHILD / 2)}이 됩니다(조세특례제한법 §100의29). 이 산식을 끊김 없이 이어 계산한 추정액이라 국세청 산정표의 구간 금액과 조금 다를 수 있습니다. 총소득이 ${manWon(CHILD_TAX_BENEFIT_INCOME_CAP)} 이상이거나 재산이 ${manWon(CHILD_TAX_BENEFIT_ASSET_CAP)} 이상이면 받을 수 없고(§100의28), 재산이 ${manWon(CHILD_TAX_BENEFIT_ASSET_REDUCTION_START)} 이상 ${manWon(CHILD_TAX_BENEFIT_ASSET_CAP)} 미만이면 절반만 받습니다. 자녀세액공제와 겹치는 금액 조정과 기한 후 신청 감액은 넣지 않았으니, 다른 조건은 위 계산기에서 확인하세요.`,
  };
}
