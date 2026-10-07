// 주제별 광고 수익성 배수 + 하루 달러 추정.
//
// 원본: awoo `scripts/lib/revenue-weight.mjs` (운영자 결정 2026-10-06 "빈틈 목록 순서에 수익성 반영")
// 와 `scripts/ops-widget.mjs` 의 usdPerDay.
//
// calculatorhost 는 애드센스 수익 자료가 아직 없다(3개월 0원). 운영자 결정(2026-10-07): 전 주제 1.0(중립)으로
// 시작하고, 애드센스 페이지별 자료가 생기면 아래 weight 를 맞춘다. 묶음 구조는 미리 둔다.
//
// 하루 달러 추정:
//   주 방문자 = 데이터랩 최근 7일(실업급여=100 눈금) × 50
//     50 은 awoo docs/ops/volume-scale.json 실측 계수 중앙값(1~2위일 때 1점당 주 방문자).
//     기준어가 같아서 눈금은 같지만, 계산기 검색어의 클릭률은 지원금과 다를 수 있다 — 자사 실유입이 생기면 다시 맞춘다.
//   하루 달러 = 주 방문자 × 방문당 PV × RPM(달러) / 1000 / 7
// 금액 설정은 docs/ops/adsense-private/rpm-groups.json (gitignore). 없으면 금액 칸을 통째로 뺀다.

export const VISITORS_PER_POINT = 50;

export const REVENUE_GROUPS = [
  { key: 'tax', label: '세금', weight: 1.0, re: /양도|취득세|증여|상속|재산세|종부세|종합부동산|자동차세|부가세|부가가치세|종합소득세|종소세|연말정산/ },
  { key: 'work', label: '근로·급여', weight: 1.0, re: /퇴직금|퇴직소득|주휴|연차|4대보험|사대보험|실수령|최저임금|월급|연봉|프리랜서|3\.3/ },
  { key: 'finance', label: '금융', weight: 1.0, re: /대출|이자|예금|적금|환율|환전|중도상환|DSR|LTV|복리/i },
  { key: 'realestate', label: '부동산 거래비용', weight: 1.0, re: /중개수수료|복비|전월세|전환율|임대수익|평수|제곱미터/ },
  { key: 'invest', label: '투자 계산', weight: 1.0, re: /물타기|평단|분할매수|분할매도/ },
  { key: 'life', label: '생활', weight: 1.0, re: /BMI|비만도|디데이|D-day|날짜 계산|화폐가치|물가/i },
];
const NEUTRAL = { key: 'other', label: '기타', weight: 1.0 };

/**
 * @param {{query?:string}} item
 * @returns {{key:string, label:string, weight:number, tag:string}}
 *   tag = 목록 꼬리표(돈 되는 주제 / 광고 수익 적음 / ''). 배수가 모두 1.0 인 지금은 항상 ''.
 */
export function revenueOf(item) {
  const g = REVENUE_GROUPS.find((x) => x.re.test(String(item?.query ?? ''))) ?? NEUTRAL;
  const tag = g.weight >= 1.5 ? '돈 되는 주제' : g.weight <= 0.5 ? '광고 수익 적음' : '';
  return { key: g.key, label: g.label, weight: g.weight, tag };
}

/** 1~3위에 들었을 때 하루 예상 수익(달러). 검색량·금액 자료가 없으면 null. */
export function usdPerDay(item, money) {
  if (!money?.rpmUsd) return null;
  if (item.recent7 == null) return null;
  const visitors = Number(item.recent7) * VISITORS_PER_POINT;
  const rpm = money.rpmUsd[revenueOf(item).key] ?? money.rpmUsd.default ?? 0;
  return (visitors * (money.pvPerVisitor ?? 1.2) * rpm) / 1000 / 7;
}

const READY = 45;
const value = (i) => (i.exposure?.score ?? 0) * revenueOf(i).weight;

/** 정렬: 자리 잡을 수 있는 것(노출 가능성 45 이상)이 먼저, 그 안에서 노출 가능성 × 수익 배수. */
export function valueOrder(a, b) {
  const ra = (a.exposure?.score ?? 0) >= READY ? 1 : 0;
  const rb = (b.exposure?.score ?? 0) >= READY ? 1 : 0;
  return rb - ra || value(b) - value(a);
}
