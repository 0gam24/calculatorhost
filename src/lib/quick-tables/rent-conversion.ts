import bokRates from '@/data/bok-rates.json';
import { calculateRentConversion } from '@/lib/finance/rent-conversion';
import {
  RENT_CONVERSION_ADDITIONAL_RATE,
  RENT_CONVERSION_ANNUAL_CAP,
} from '@/lib/constants/rent-rules-2026';
import type { QuickTableData } from './types';
import { manWon, won } from './format';

/**
 * 보증금 차액을 월세로 바꿀 때의 법정 상한 월세.
 * 기준금리는 페이지와 같은 src/data/bok-rates.json 값(손으로 적지 않음),
 * 가산비율·연 상한은 rent-rules 상수에서 가져온다.
 * 주의: 함수 기본값(BANK_OF_KOREA_BASE_RATE_DEFAULT)이 아니라 현행 기준금리를 넘긴다.
 */
export function rentConversionQuickTable(): QuickTableData {
  const amounts = [
    10_000_000, 20_000_000, 30_000_000, 50_000_000, 70_000_000, 100_000_000, 150_000_000,
    200_000_000, 300_000_000, 500_000_000,
  ];
  const baseRatePercent = bokRates.baseRate * 100;
  const additionalRatePercent = RENT_CONVERSION_ADDITIONAL_RATE * 100;
  const annualCapPercent = RENT_CONVERSION_ANNUAL_CAP * 100;
  const calc = (amount: number) =>
    calculateRentConversion({
      mode: 'jeonseToMonthly',
      jeonseDeposit: amount,
      newDeposit: 0,
      baseRatePercent,
      additionalRatePercent,
      annualCapPercent,
    });
  // 적용 전환율(상한)은 금액과 무관하다
  const capText = `${calc(100_000_000).appliedConversionRatePercent.toFixed(2)}%`;
  const baseText = `${baseRatePercent.toFixed(2)}%`;
  const addText = `${additionalRatePercent.toFixed(1)}%p`;
  const yyyymm = bokRates.baseRateDate;
  const baseDate = `${yyyymm.slice(0, 4)}년 ${Number(yyyymm.slice(4, 6))}월`;
  return {
    title: '보증금을 월세로 바꾸면 월세는 얼마인가요?',
    caption: `전환율 상한 ${capText} 기준 (한국은행 기준금리 ${baseText} + ${addText}, ${baseDate} 기준)`,
    headers: ['월세로 바꾸는 보증금', '월세 상한', '1년 월세 합계'],
    rows: amounts.map((amount) => {
      const monthly = calc(amount).resultMonthlyRent ?? Number.NaN;
      return [manWon(amount), won(monthly), won(monthly * 12)];
    }),
    note: `주택임대차보호법 §7의2와 시행령 §9에 따라 보증금을 월세로 바꿀 때 전환율은 한국은행 기준금리에 ${addText}를 더한 비율과 연 ${annualCapPercent.toFixed(0)}% 중 낮은 값을 넘을 수 없습니다. 이 표는 그 상한(${capText})으로 계산했고 10원 미만은 버렸습니다. 실제 월세는 임대인과 임차인이 이보다 낮게 정할 수 있고, 기준금리가 바뀌면 상한도 함께 바뀝니다. 남길 보증금을 정해 계산하거나 계약한 월세의 전환율을 확인하려면 위 계산기를 쓰세요.`,
  };
}
