/**
 * 자동차세 계산기 "구간별 바로 보기" 표.
 * 모든 칸은 계산기와 같은 calculateVehicleTax 로 빌드 때 계산한다 (손으로 적은 숫자 없음).
 * 전기차·수소차 정액 과세는 이 함수의 지원 범위 밖이라 행에 넣지 않는다.
 */
import { calculateVehicleTax } from '@/lib/tax/vehicle';
import { YEAR } from '@/lib/constants/tax-rates-2026';
import type { QuickTableData } from './types';
import { won } from './format';

export function vehicleTaxQuickTable(): QuickTableData {
  const engines = [1_000, 1_600, 2_000, 2_200, 2_500, 3_000, 3_500];
  const ages = [
    { label: '차령 2년 이하', years: 0 },
    { label: '차령 5년', years: 5 },
    { label: '차령 12년 이상', years: 12 },
  ];
  // 연납 할인 없음, 상·하반기 차령 같음 (계산기 기본값과 같음)
  const annual = (engineCc: number, vehicleAgeYears: number) =>
    calculateVehicleTax({
      usage: 'passengerNonBusiness',
      engineCc,
      vehicleAgeYears,
      vehicleAgeYearsSecondHalf: vehicleAgeYears,
      includeAnnualDiscount: false,
      taxYear: YEAR,
    }).totalAnnual;
  return {
    title: `${YEAR}년 배기량별 자동차세는 1년에 얼마인가요?`,
    caption: '비영업용 승용차 1년 자동차세 + 지방교육세 (연납 할인 전)',
    headers: ['배기량', ...ages.map((a) => a.label)],
    rows: engines.map((cc) => [
      `${cc.toLocaleString('ko-KR')}cc`,
      ...ages.map((a) => won(annual(cc, a.years))),
    ]),
    note: '휘발유·경유·하이브리드처럼 배기량이 있는 비영업용 승용차를 1년 내내 같은 차령으로 가진 경우, 연납 할인 없이 내는 자동차세와 지방교육세(자동차세의 30%, 지방세법 §151)의 합계입니다. cc당 세액은 1,000cc 이하 80원, 1,600cc 이하 140원, 1,600cc 초과 200원이고(§127), 차령 3년부터 해마다 5%씩 최대 50%까지 줄어듭니다(§127①제2호). 1월 연납 할인, 상반기·하반기 납부액, 반기마다 차령이 다른 경우는 위 계산기에서 확인하세요. 전기차·수소차는 배기량이 없어 비영업용 연 13만 원 정액(§127①제3호)이라 표에서 뺐습니다.',
  };
}
