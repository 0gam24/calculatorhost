import { calculateExchange } from '@/lib/finance/exchange';
import type { QuickTableData } from './types';
import { manWon } from './format';

/**
 * 예시 값. ExchangeCalculator 기본값(기준환율 1,350원, 스프레드 1.5%)과 같으며 실제 환율이 아니다.
 * 환율은 매일 바뀌므로 표는 "우대율에 따라 얼마나 달라지는지"를 보여 주는 예시로만 쓴다.
 */
const EXAMPLE_BASE_RATE = 1350;
const EXAMPLE_SPREAD_PERCENT = 1.5;
const PREFERENTIAL_RATES = [0, 50, 90];

/** 달러 금액: 소수점 둘째 자리 + "달러" */
const usd = (n: number): string =>
  `${n.toLocaleString('ko-KR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}달러`;

/** 우대율(%)만큼 깎은 스프레드(%). 우대 90%면 1.5%가 0.15%가 된다 */
const spreadAfterPreference = (preferentialRate: number): number =>
  Math.round(EXAMPLE_SPREAD_PERCENT * (100 - preferentialRate)) / 100;

const krwToUsd = (amount: number, preferentialRate: number) =>
  calculateExchange({
    direction: 'krwToForeign',
    amount,
    baseRate: EXAMPLE_BASE_RATE,
    spreadPercent: spreadAfterPreference(preferentialRate),
    feePercent: 0,
    feeFlat: 0,
  });

/** 원화 → 달러 환전, 우대율별 받는 달러 (예시 환율) */
export function exchangeQuickTable(): QuickTableData {
  const amounts = [
    100_000, 300_000, 500_000, 1_000_000, 2_000_000, 3_000_000, 5_000_000, 10_000_000,
  ];
  const label = (p: number) => (p === 0 ? '우대 없음' : `우대 ${p}%`);
  const rateText = (p: number) =>
    `${krwToUsd(1, p).appliedRate.toLocaleString('ko-KR', { maximumFractionDigits: 3 })}원`;
  const baseRate = EXAMPLE_BASE_RATE.toLocaleString('ko-KR');
  return {
    title: '환전 우대율에 따라 받는 달러는 얼마나 달라지나요?',
    caption: `예시: 기준환율 1달러 = ${baseRate}원, 은행 스프레드 ${EXAMPLE_SPREAD_PERCENT}%로 원화를 달러로 바꿀 때 (실제 환율 아님)`,
    headers: ['환전할 원화', ...PREFERENTIAL_RATES.map(label)],
    rows: amounts.map((amount) => [
      manWon(amount),
      ...PREFERENTIAL_RATES.map((p) => usd(krwToUsd(amount, p).netAmount)),
    ]),
    note: `오늘 환율이 아니라 계산기 기본값인 기준환율 1달러 = ${baseRate}원, 은행 스프레드 ${EXAMPLE_SPREAD_PERCENT}%를 넣은 예시입니다. 원화로 달러를 살 때 은행은 기준환율에 스프레드를 더한 환율을 쓰고, 환율 우대 90%는 이 스프레드의 90%를 깎아 줍니다. 그래서 1달러 값은 우대 없음 ${rateText(0)}, 우대 50% ${rateText(50)}, 우대 90% ${rateText(90)}이 됩니다. 별도 수수료는 없다고 보고 받는 달러는 센트(0.01달러) 단위로 반올림했습니다. 실제로 받을 금액은 오늘 은행이 알려 주는 기준환율과 스프레드를 위 계산기에 넣어 확인하세요.`,
  };
}
