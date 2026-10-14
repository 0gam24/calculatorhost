import { calculateNJobberInsurance } from '@/lib/tax/n-jobber-insurance';
import { SOCIAL_INSURANCE_2026 } from '@/lib/constants/tax-rates-2026';
import type { QuickTableData } from './types';
import { manWon, pct, won } from './format';

/** 계산기 기본값과 같은 직장 연봉 (월 합계 열에만 쓰임) */
const MAIN_WAGE_INCOME = 50_000_000;

/** 부업 사업소득(필요경비 뺀 금액)별 직장인 추가 건강보험료(소득월액보험료) */
export function nJobberInsuranceQuickTable(): QuickTableData {
  const sideIncomes = [
    10_000_000, 20_000_000, 25_000_000, 30_000_000, 40_000_000, 50_000_000, 60_000_000,
    80_000_000, 100_000_000,
  ];
  const totalRate = pct(SOCIAL_INSURANCE_2026.health.total);
  return {
    title: '부업 소득별 추가 건강보험료는 얼마인가요?',
    caption: `직장인이 부업 사업소득을 벌 때 더 내는 건강보험료 (2026년 보험료율 ${totalRate})`,
    headers: [
      '부업 사업소득 (연)',
      '월 추가 보험료',
      '연 추가 보험료',
      `월 합계 (연봉 ${manWon(MAIN_WAGE_INCOME)})`,
    ],
    rows: sideIncomes.map((sideBusinessIncome) => {
      const r = calculateNJobberInsurance({
        mainWageIncome: MAIN_WAGE_INCOME,
        sideBusinessIncome,
        sideOtherIncome: 0,
        isDependent: false,
      });
      return [
        manWon(sideBusinessIncome),
        won(r.extraIncomeMonthlyPremium),
        won(r.extraIncomeMonthlyPremium * 12),
        won(r.totalMonthlyPremium),
      ];
    }),
    note: `연봉 ${manWon(MAIN_WAGE_INCOME)}을 받는 직장인에게 부업 사업소득(필요경비를 뺀 금액)만 더 있는 경우입니다. 이 소득이 1년에 2,000만 원을 넘으면 넘는 금액을 12로 나눈 뒤 건강보험료율 ${totalRate}(국민건강보험법 시행령 §44)를 곱한 보험료를 매달 더 내며, 이 보험료는 회사가 나눠 내지 않아 본인이 모두 냅니다. 월 합계에는 월급에서 떼는 건강보험료(연봉 ÷ 12의 ${pct(SOCIAL_INSURANCE_2026.health.employee, 3)})를 더했습니다. 장기요양보험료는 넣지 않았고 10원 미만은 버렸습니다. 이자·배당 같은 다른 소득이 있거나 피부양자 자격이 궁금하면 위 계산기와 국민건강보험공단에서 확인하세요.`,
  };
}
