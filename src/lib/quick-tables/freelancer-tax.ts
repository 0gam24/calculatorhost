import { calculateFreelancerTax } from '@/lib/tax/freelancer';
import {
  FREELANCER_DEFAULT_SIMPLE_EXPENSE_RATE,
  FREELANCER_WITHHOLDING_RATE,
  LOCAL_INCOME_TAX_RATE,
  PERSONAL_DEDUCTION,
} from '@/lib/constants/tax-rates-2026';
import type { QuickTableData } from './types';
import { manWon, pct, won } from './format';

/** 5월 정산액 표기: 음수면 환급, 양수면 추가납부 */
const settlementLabel = (amount: number): string => {
  if (amount < 0) return `환급 ${won(-amount)}`;
  if (amount > 0) return `추가납부 ${won(amount)}`;
  return '0원';
};

/**
 * 연 수입별 프리랜서 5월 종합소득세 정산 (계산기 기본값: 인적용역 단순경비율, 본인 1명, 3.3% 자동).
 * 단순경비율 대상일 가능성이 큰 수입 구간(4,500만 원까지)만 보여 준다.
 */
export function freelancerTaxQuickTable(): QuickTableData {
  const revenues = [
    5_000_000, 10_000_000, 15_000_000, 20_000_000, 25_000_000, 30_000_000, 35_000_000,
    40_000_000, 45_000_000,
  ];
  const rate = FREELANCER_DEFAULT_SIMPLE_EXPENSE_RATE;
  const withholding = pct(FREELANCER_WITHHOLDING_RATE, 1);
  return {
    title: `프리랜서 수입별 ${withholding} 환급액은 얼마인가요?`,
    caption: `인적용역 단순경비율 ${rate}%, 본인 1명 기준 5월 종합소득세 정산`,
    headers: [
      '연 수입 (매출)',
      '5월 정산 결과',
      '종합소득세+지방소득세',
      `미리 낸 세금 (${withholding})`,
    ],
    rows: revenues.map((annualRevenue) => {
      const r = calculateFreelancerTax({
        annualRevenue,
        expenseMethod: 'simpleRate',
        simpleExpenseRatePercent: rate,
        dependents: 1,
        children: 0,
        nationalPensionPaid: 0,
        healthInsurancePaid: 0,
      });
      return [
        manWon(annualRevenue),
        settlementLabel(r.settlementAmount),
        won(r.totalTaxLiability),
        won(r.withholdingPaid),
      ];
    }),
    note: `인적용역 단순경비율 ${rate}%로 필요경비를 빼고 본인 1명 기본공제 ${manWon(PERSONAL_DEDUCTION.basic)}만 넣은 값입니다(자녀세액공제, 국민연금·건강보험료 공제 없음). 미리 낸 세금은 수입의 ${withholding}(소득세 3% + 지방소득세 0.3%)이고, 종합소득세율은 6~45%(소득세법 §55), 지방소득세는 종합소득세의 ${pct(LOCAL_INCOME_TAX_RATE, 0)}입니다. 표준세액공제 7만 원(소득세법 §59의4⑨)은 반영했고, 다른 세액공제는 넣지 않았습니다. 단순경비율은 직전 연도 수입이 업종별 기준금액보다 적거나, 그해 새로 시작해 수입이 일정 금액에 못 미치는 사업자만 쓸 수 있습니다(소득세법 시행령 §143). 수입이 클수록 기준경비율이나 장부로 경비를 계산하는 경우가 많아 세금이 더 나올 수 있으므로 표는 4,500만 원까지만 보여 줍니다. 가족 공제, 납부한 보험료, 실제 경비는 위 계산기에 넣어 보세요.`,
  };
}
