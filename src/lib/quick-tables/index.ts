/**
 * 계산기별 "구간별 바로 보기" 표 빌더.
 *
 * 모든 칸은 그 계산기가 쓰는 순수 함수(src/lib/tax·finance·work)로 빌드 때 계산한다.
 * 손으로 적은 숫자가 없으므로 계산기와 표가 서로 다를 수 없다. 가정은 note 에 적는다.
 * 2026-10-14 도입: 입력하지 않아도 검색엔진과 독자가 읽을 수 있는 대표값 표.
 */
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
import {
  MINIMUM_HOURLY_WAGE_2026,
  MINIMUM_HOURLY_WAGE_2027,
} from '@/lib/constants/labor-rules-2026';
import type { QuickTableData } from './types';
import { manWon, pct, won } from './format';

export type { QuickTableData } from './types';

const range = (from: number, to: number, step: number) =>
  Array.from({ length: Math.floor((to - from) / step) + 1 }, (_, i) => from + i * step);

export function salaryQuickTable(): QuickTableData {
  const salaries = [...range(30_000_000, 100_000_000, 5_000_000), 120_000_000, 150_000_000];
  return {
    title: '연봉별 월 실수령액은 얼마인가요? (2026)',
    caption: '연봉 3,000만~1억 5,000만 원 월 실수령액 (2026년 7월 기준)',
    headers: ['연봉', '월 실수령액', '월 세전', '4대보험', '소득세+지방소득세'],
    rows: salaries.map((wageAmount) => {
      const r = calculateTakeHome({
        wageType: 'yearly',
        wageAmount,
        severance: 'separate',
        nontaxableMonthly: 200_000,
        dependents: 1,
        children: 0,
        calculationMonth: 7,
        withholdingRate: 100,
      });
      return [
        manWon(wageAmount),
        won(r.monthlyNetIncome),
        won(r.monthlyGrossIncome),
        won(r.totalInsuranceDeductions),
        won(r.incomeTax + r.localIncomeTax),
      ];
    }),
    note: '퇴직금 별도 연봉, 비과세 식대 월 20만 원, 공제대상 가족 본인 1명, 8~20세 자녀 0명, 간이세액표 100% 원천징수, 2026년 7월 지급 기준입니다. 4대보험은 국민연금 4.75%, 건강보험 3.595%, 장기요양(건강보험료의 13.14%), 고용보험 0.9%입니다. 가족 수와 비과세 금액이 다르면 위 계산기에 넣어 보세요.',
  };
}

export function loanQuickTable(): QuickTableData {
  const principals = [50_000_000, 100_000_000, 200_000_000, 300_000_000, 400_000_000, 500_000_000];
  const rates = [3.5, 4.5, 5.5];
  return {
    title: '대출금·금리별 월 상환액은 얼마인가요?',
    caption: '30년 원리금균등 상환 월 상환액',
    headers: ['대출금', ...rates.map((r) => `연 ${r.toFixed(1)}%`)],
    rows: principals.map((principal) => [
      manWon(principal),
      ...rates.map((annualRate) =>
        won(
          calculateLoan({
            principal,
            annualRate,
            term: 30,
            termUnit: 'years',
            repayment: 'amortization',
          }).firstMonthPayment,
        ),
      ),
    ]),
    note: '대출기간 30년, 원리금균등 상환, 거치기간 없음 기준의 매월 상환액(원금+이자)입니다. 원금균등이나 만기일시 상환, 다른 기간은 위 계산기에서 바꿔 보세요. 실제 금리는 은행과 신용도에 따라 다릅니다.',
  };
}

export function weeklyHolidayQuickTable(): QuickTableData {
  const hours = [14, 15, 20, 25, 30, 35, 40];
  const calc = (hourlyWage: number, weeklyHours: number) =>
    calculateWeeklyHolidayAllowance({ hourlyWage, weeklyHours, fullAttendance: true });
  return {
    title: '주 근무시간별 주휴수당은 얼마인가요? (최저시급 기준)',
    caption: `2026년 최저시급 ${MINIMUM_HOURLY_WAGE_2026.toLocaleString('ko-KR')}원, 2027년 ${MINIMUM_HOURLY_WAGE_2027.toLocaleString('ko-KR')}원 기준 주휴수당`,
    headers: ['주 근무시간', '1주 주휴수당 (2026년)', '월 환산 (2026년)', '1주 주휴수당 (2027년)', '주휴시간'],
    rows: hours.map((h) => {
      const a = calc(MINIMUM_HOURLY_WAGE_2026, h);
      const b = calc(MINIMUM_HOURLY_WAGE_2027, h);
      return [
        `주 ${h}시간`,
        won(a.weeklyPay),
        won(a.monthlyPay),
        won(b.weeklyPay),
        `${Number(a.paidHours.toFixed(2))}시간`,
      ];
    }),
    note: '그 주 소정근로일을 모두 나온 경우입니다. 주휴시간은 주 근무시간 ÷ 40 × 8(40시간이 넘으면 8시간)이고, 월 환산은 1주 금액 × 365 ÷ 84 입니다. 주 15시간 미만이거나 결근한 주에는 주휴수당이 생기지 않습니다(근로기준법 §18③·§55, 시행령 §30①).',
  };
}

export function acquisitionQuickTable(): QuickTableData {
  const prices = [
    100_000_000, 300_000_000, 500_000_000, 600_000_000, 700_000_000, 800_000_000, 900_000_000,
    1_000_000_000, 1_200_000_000, 1_500_000_000,
  ];
  const calc = (acquisitionPrice: number, areaOver85: boolean) =>
    calculateAcquisitionTax({
      method: 'purchase',
      target: 'residential',
      houseCount: 1,
      adjustedArea: false,
      firstHomeBuyerDiscount: false,
      purchaseSpecial: 'ordinary',
      areaOver85,
      acquisitionPrice,
    });
  return {
    title: '집값별 취득세는 얼마인가요? (1주택 매매)',
    caption: '1주택 일반 매매 취득세·지방교육세·농어촌특별세 합계',
    headers: ['매매가', '국민주택규모 이하 합계', '국민주택규모 초과 합계', '취득세율'],
    rows: prices.map((p) => {
      const small = calc(p, false);
      const large = calc(p, true);
      return [manWon(p), won(small.totalPayment), won(large.totalPayment), pct(small.appliedRate)];
    }),
    note: '취득 후 1주택, 감면이나 중과가 없는 일반 매매 기준입니다(지방세법 §11①8호). 국민주택규모는 전용 85㎡(수도권 밖 비도시 읍·면은 100㎡)이고, 넘으면 농어촌특별세가 붙습니다. 생애최초 감면, 2주택 이상 중과, 증여·상속 취득은 위 계산기에서 조건을 바꿔 확인하세요.',
  };
}

export function giftQuickTable(): QuickTableData {
  const values = [
    50_000_000, 100_000_000, 200_000_000, 300_000_000, 500_000_000, 700_000_000, 1_000_000_000,
    1_500_000_000, 2_000_000_000, 3_000_000_000,
  ];
  const calc = (giftValue: number, relation: 'adultDescendant' | 'spouse') =>
    calculateGiftTax({
      giftValue,
      relation,
      priorGiftValue: 0,
      assumedDebt: 0,
      reportWithinDeadline: true,
    }).finalTax;
  return {
    title: '증여 금액별 증여세는 얼마인가요?',
    caption: '받는 사람별 증여세 (신고세액공제 3% 반영)',
    headers: ['증여액', '성년 자녀', '배우자'],
    rows: values.map((v) => [manWon(v), won(calc(v, 'adultDescendant')), won(calc(v, 'spouse'))]),
    note: '10년 안에 같은 사람에게 받은 증여가 없고, 기한 안에 신고해 신고세액공제 3%를 받는 경우입니다. 증여재산공제는 성년 자녀 5,000만 원, 배우자 6억 원(상속세및증여세법 §53)이고 세율은 10~50% 5단계입니다(§56). 혼인·출산 공제와 부담부증여는 위 계산기에서 확인하세요.',
  };
}

export function capitalGainsQuickTable(): QuickTableData {
  const gains = [
    50_000_000, 100_000_000, 200_000_000, 300_000_000, 500_000_000, 700_000_000, 1_000_000_000,
  ];
  const acquisitionPrice = 300_000_000;
  return {
    title: '양도차익별 양도소득세는 얼마인가요? (2주택·5년 보유)',
    caption: '일반 과세 주택 양도소득세 (지방소득세 포함)',
    headers: ['양도차익', '양도소득세 합계', '장기보유특별공제', '과세표준'],
    rows: gains.map((gain) => {
      const r = calculateTransferTax({
        caseType: 'general',
        assetType: 'house',
        salePrice: acquisitionPrice + gain,
        acquisitionPrice,
        necessaryExpenses: 0,
        holdingYears: 5,
        residentYears: 0,
        householdHouseCount: 2,
        adjustedAreaSurcharge: 'none',
        isShortTerm: false,
      });
      return [manWon(gain), won(r.totalTax), won(r.longTermHoldingDeduction), won(r.taxableBase)];
    }),
    note: '비조정지역 2주택자가 5년 보유한 주택을 판 경우입니다(중과 없음, 장기보유특별공제 10%, 기본공제 250만 원, 필요경비 0원). 세율은 6~45% 누진세율이고(소득세법 §104·§55), 합계에 지방소득세 10%를 넣었습니다. 1세대1주택 비과세(양도가 12억 원 이하)나 일시적 2주택은 위 계산기에서 확인하세요.',
  };
}

export function vatQuickTable(): QuickTableData {
  const supplies = [
    100_000, 500_000, 1_000_000, 3_000_000, 5_000_000, 10_000_000, 30_000_000, 50_000_000,
    100_000_000,
  ];
  return {
    title: '공급가액별 부가세와 합계 금액은 얼마인가요?',
    caption: '일반과세 부가가치세 10% 환산',
    headers: ['공급가액', '부가세 10%', '합계 (부가세 포함)'],
    rows: supplies.map((s) => {
      const r = addVatToSupplyValue(s);
      return [manWon(s), won(r.vat), won(r.totalPrice)];
    }),
    note: '일반과세자의 세금계산서 금액 기준입니다(부가가치세법 §30, 세율 10%). 부가세가 포함된 금액에서 공급가액을 거꾸로 구하거나, 간이과세자 업종별 납부세액은 위 계산기에서 계산하세요.',
  };
}

export function depositQuickTable(): QuickTableData {
  const principals = [10_000_000, 30_000_000, 50_000_000, 100_000_000];
  const rates = [2.5, 3.0, 3.5];
  return {
    title: '예금 1년 세후 이자는 얼마인가요?',
    caption: '정기예금 12개월 단리 세후 이자 (이자소득세 15.4%)',
    headers: ['예치금', ...rates.map((r) => `연 ${r.toFixed(1)}%`)],
    rows: principals.map((principal) => [
      manWon(principal),
      ...rates.map((annualRatePercent) =>
        won(
          calculateDeposit({
            principal,
            annualRatePercent,
            termMonths: 12,
            method: 'simple',
            taxType: 'general',
          }).posttaxInterest,
        ),
      ),
    ]),
    note: '12개월 만기, 단리, 일반과세(이자소득세 14% + 지방소득세 1.4%) 기준 세후 이자입니다. 비과세종합저축·세금우대나 복리 상품은 위 계산기에서 바꿔 보세요.',
  };
}

export function savingsQuickTable(): QuickTableData {
  const deposits = [100_000, 300_000, 500_000, 1_000_000];
  const rates = [3.0, 4.0, 5.0];
  return {
    title: '적금 1년 세후 이자는 얼마인가요?',
    caption: '정기적금 12개월 단리 세후 이자 (이자소득세 15.4%)',
    headers: ['월 납입액', ...rates.map((r) => `연 ${r.toFixed(1)}%`)],
    rows: deposits.map((monthlyDeposit) => [
      `월 ${manWon(monthlyDeposit)}`,
      ...rates.map((annualRatePercent) =>
        won(
          calculateSavings({
            monthlyDeposit,
            annualRatePercent,
            termMonths: 12,
            method: 'simple',
            taxType: 'general',
          }).posttaxInterest,
        ),
      ),
    ]),
    note: '매달 같은 날 넣는 12개월 정기적금, 단리, 일반과세(15.4%) 기준입니다. 적금은 나중에 넣은 돈일수록 이자가 붙는 기간이 짧아서 같은 금리의 예금보다 이자가 적습니다. 복리·비과세 상품은 위 계산기에서 확인하세요.',
  };
}

export function severanceQuickTable(): QuickTableData {
  const years = [1, 3, 5, 10, 15, 20, 30];
  const wages = [3_000_000, 4_000_000, 5_000_000];
  const leaveDate = '2026-10-01';
  return {
    title: '근속연수·월급별 퇴직금은 얼마인가요?',
    caption: '법정 퇴직금 세전 금액 (2026년 10월 1일 퇴직 가정)',
    headers: ['근속', ...wages.map((w) => `월 ${manWon(w)}`)],
    rows: years.map((y) => [
      `${y}년`,
      ...wages.map((w) =>
        won(
          calculateSeverance({
            hireDate: `${2026 - y}-10-01`,
            leaveDate,
            monthlyOrdinaryWage: w,
            averageMonthlyWage: w,
            monthlyExtraAllowance: 0,
            annualBonus: 0,
            annualLeaveAllowance: 0,
            planType: 'statutory',
            includeTax: true,
          }).statutorySeverance,
        ),
      ),
    ]),
    note: '퇴직 전 3개월 월평균 임금이 표의 월급이고 상여금·연차수당이 없는 경우의 세전 법정 퇴직금입니다(근로자퇴직급여 보장법 §8: 1일 평균임금 × 30일 × 재직일수 ÷ 365). 퇴직소득세와 세후 금액은 위 계산기에 입사일·퇴직일을 넣어 확인하세요.',
  };
}
