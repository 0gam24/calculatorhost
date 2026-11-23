/**
 * 연말정산 "구간별 바로 보기" 표.
 *
 * 모든 숫자는 src/lib/tax/year-end-tax.ts 의 순수 함수에서 빌드 때 계산한다.
 * 손으로 적은 숫자가 없으므로 계산기와 표가 서로 다를 수 없다.
 * 근거: 소득세법 §47·§50·§51의3·§52·§55·§59·§59의3, 조세특례제한법 §126의2.
 */

import { calculateYearEndTax } from '@/lib/tax/year-end-tax';
import type { QuickTableData } from './types';
import { won } from './format';

export function yearEndTaxQuickTable(): QuickTableData {
  const salaries = [
    { label: '3,000만 원', gross: 30_000_000 },
    { label: '4,000만 원', gross: 40_000_000 },
    { label: '5,000만 원', gross: 50_000_000 },
    { label: '6,000만 원', gross: 60_000_000 },
    { label: '7,000만 원', gross: 70_000_000 },
    { label: '8,000만 원', gross: 80_000_000 },
    { label: '1억 원', gross: 100_000_000 },
    { label: '1억 2,000만 원', gross: 120_000_000 },
  ];

  const rows = salaries.map(({ label, gross }) => {
    // 기본 사례: 부양가족 본인 1명, 총급여의 40%를 체크카드·신용카드(반반)로 사용
    const cardHalf = Math.round(gross * 0.2);
    const base = calculateYearEndTax({
      annualGrossSalary: gross,
      dependents: 1,
      children: 0,
      creditCardSpend: cardHalf,
      debitAndCashSpend: cardHalf,
      prePaidTaxMode: 'auto',
    });

    // 연금저축 600만 원 추가 납입 시 절세 효과(결정세액 감소분, 지방소득세 포함)
    const withPension = calculateYearEndTax({
      annualGrossSalary: gross,
      dependents: 1,
      children: 0,
      creditCardSpend: cardHalf,
      debitAndCashSpend: cardHalf,
      pensionSavings: 6_000_000,
      prePaidTaxMode: 'auto',
    });

    const pensionSaving = Math.max(0, base.determinedTotalTax - withPension.determinedTotalTax);
    const settlementLabel =
      base.refundAmount > 0
        ? `환급 ${won(base.refundAmount)}`
        : base.additionalTaxAmount > 0
          ? `추가납부 ${won(base.additionalTaxAmount)}`
          : '0원';

    return [
      label,
      won(base.determinedTotalTax),
      settlementLabel,
      won(pensionSaving),
    ];
  });

  return {
    title: '연봉별 연말정산 결정세액과 예상 환급액은 얼마인가요? (2026)',
    caption: '2026년 귀속 1인 가구(본인 기본공제·4대보험 자동 반영·총급여 40% 카드 사용) 기준 연말정산 추정표',
    headers: [
      '연간 총급여',
      '총 결정세액 (지방세 포함)',
      '예상 정산 (간이세액표 대비)',
      '연금저축 600만 납입 시 추가 절세',
    ],
    rows,
    note: '부양가족 본인 1명(자녀 0명), 비과세 소득 0원, 2026년 4대보험 본인부담금과 총급여의 40%(신용카드 20% + 체크카드 20%) 지출을 가정해 계산했습니다. 예상 정산액은 2026년 국세청 근로소득 간이세액표(100%) × 12개월 기납부세액과 비교한 값이며, 실제 환급액은 회사 원천징수 비율(80%/100%/120%)과 의료비·월세·부양가족 여부에 따라 달라집니다.',
  };
}
