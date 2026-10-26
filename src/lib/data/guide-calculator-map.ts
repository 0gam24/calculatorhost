/**
 * 가이드 ↔ 계산기 연결 규칙 (SSoT).
 *
 * - 가이드 본문 맨 위(첫 H2 앞)에 "이 글과 함께 쓰는 계산기" 카드를 붙일 때
 * - 계산기 페이지 아래에 "이 계산기와 함께 보는 가이드" 목록을 붙일 때
 * 둘 다 이 규칙 하나로 정한다. 가이드 제목(한국어)과 slug 를 보고 위에서부터 처음 맞는 규칙을 쓴다.
 * 더 좁은 주제(주휴수당·종부세 등)를 넓은 주제(연봉·대출)보다 먼저 둔다.
 *
 * 2026-10-14 도입: 가이드 383편이 계산기로 가는 고정 링크가 없어 계산기(사이트의 핵심 페이지)에
 * 내부 링크가 모이지 않던 문제.
 */

export const CALCULATOR_LABELS = {
  salary: '연봉 실수령액 계산기',
  severance: '퇴직금 계산기',
  'weekly-holiday-allowance': '주휴수당 계산기',
  'annual-leave': '연차 계산기',
  loan: '대출이자 계산기',
  'loan-limit': '대출한도 계산기',
  dti: 'DTI 계산기',
  'capital-gains-tax': '양도소득세 계산기',
  'acquisition-tax': '취득세 계산기',
  'property-tax': '재산세 계산기',
  'comprehensive-property-tax': '종부세 계산기',
  'broker-fee': '중개수수료 계산기',
  'rent-conversion': '전월세 전환 계산기',
  area: '평수 계산기',
  savings: '적금이자 계산기',
  deposit: '예금이자 계산기',
  retirement: '은퇴자금 계산기',
  bmi: 'BMI 계산기',
  'd-day': '디데이 계산기',
  'freelancer-tax': '프리랜서 종합소득세 계산기',
  'gift-tax': '증여세 계산기',
  'inheritance-tax': '상속세 계산기',
  'vehicle-tax': '자동차세 계산기',
  exchange: '환율 계산기',
  'housing-subscription': '청약가점 계산기',
  'child-tax-credit': '자녀장려금 계산기',
  'n-jobber-insurance': 'N잡러 건강보험료 계산기',
  'rental-yield': '임대수익률 계산기',
  inflation: '인플레이션 계산기',
  'averaging-down': '물타기 계산기',
  'split-buy': '분할매수 계산기',
  'split-sell': '분할매도 계산기',
  vat: '부가세 계산기',
} as const;

export type MappedCalculator = keyof typeof CALCULATOR_LABELS;

/**
 * 계산기를 붙이지 않는 주제. 계산기와 직접 관련이 없거나(정부 지원금·휴가·신고 절차),
 * 우리 계산기가 다루지 않는 대상(주식·코인·배당 과세)이라 엉뚱한 계산기로 보내지 않는다.
 */
const NO_CALCULATOR =
  /실업급여|구직촉진|국민취업지원|상병수당|부모급여|아동수당|육아휴직|출산전후휴가|배우자 출산휴가|유산·사산|조기재취업|근로시간 단축|기초연금|에너지바우처|피해지원금|가족돌봄|대지급금|산재|근로계약서|전세사기|권리금|상가건물|공모주|대주주|해외주식|비상장주식|ETF|코인|가상자산|배당|리츠|증권거래세|스톡옵션|금 투자|압류|체납|세제개편안|세금 캘린더|법인세|주민세|^전입신고|토지거래|실거래 신고|분양권 전매|재건축부담금|미환급금|납부기한 연장|간이지급명세서|원천세 반기|본인부담상한/;

/** 위에서부터 처음 맞는 규칙(가이드 제목 기준). 좁은 주제를 넓은 주제보다 먼저 둔다 */
const RULES: ReadonlyArray<readonly [RegExp, MappedCalculator]> = [
  [/주휴수당/, 'weekly-holiday-allowance'],
  [/연차/, 'annual-leave'],
  [/퇴직금|퇴직소득/, 'severance'],
  [/종부세|종합부동산세/, 'comprehensive-property-tax'],
  [/재산세/, 'property-tax'],
  [/유산취득세/, 'inheritance-tax'],
  [/자동차|차량|개별소비세/, 'vehicle-tax'],
  [/^취득세|취득세 일시적/, 'acquisition-tax'],
  [/양도(소득)?세|양도차익|양도기한|일시적 ?2주택|장기보유특별공제|1세대1주택|자경농지|상생임대|이월과세/, 'capital-gains-tax'],
  [/취득세|국민주택채권|인지세/, 'acquisition-tax'],
  [/상속|유류분/, 'inheritance-tax'],
  [/증여/, 'gift-tax'],
  [/부가(가치)?세|세금계산서|간이과세|매입세액|사업용 신용카드/, 'vat'],
  [/중개(수수료|보수)/, 'broker-fee'],
  [/청약/, 'housing-subscription'],
  [/간주임대료|주택임대사업자|임대소득|임대수익/, 'rental-yield'],
  [/자녀장려금|근로장려금/, 'child-tax-credit'],
  [/연금저축|IRP/, 'retirement'],
  [/연말정산/, 'salary'],
  [
    /프리랜서|종합소득세|종소세|3\.3%|사업소득|기타소득|기장|성실신고|복식부기|간편장부|사업용계좌|노란우산|업무용 승용차|증빙|현금영수증|기업업무추진비|접대비/,
    'freelancer-tax',
  ],
  [/N잡|투잡|피부양자|건강보험 임의계속|지역가입자/i, 'n-jobber-insurance'],
  [/DSR|LTV|대출 ?한도/i, 'loan-limit'],
  [/DTI/, 'dti'],
  [/대출|원리금|중도상환|금리인하|학자금 상환/, 'loan'],
  [/월세 세액공제/, 'salary'],
  [/전월세|월세|전세|임차|임대차|보증금|계약갱신|확정일자/, 'rent-conversion'],
  [/은퇴|노후|퇴직연금|연금저축|연금계좌|IRP|FIRE|주택연금|사적연금|연금 ?수령|수령 ?나이|예상 ?수령|노령연금|농지연금|연금소득|국민연금 (유족|분할|크레딧|반환|추납|조기|임의)/i, 'retirement'],
  [/ISA|적금|복리|저축/, 'savings'],
  [/예금|채권투자|이자소득|금융소득/, 'deposit'],
  [/환율|환전|해외송금|외화/, 'exchange'],
  [/물가|인플레이션|화폐 ?가치/, 'inflation'],
  [/물타기|평단|평균 ?단가/, 'averaging-down'],
  [/분할 ?매수/, 'split-buy'],
  [/분할 ?매도/, 'split-sell'],
  [/평수|제곱미터|전용면적/, 'area'],
  [/BMI|비만/i, 'bmi'],
  [/디데이|D-day|기념일/i, 'd-day'],
  [
    /연봉|실수령|월급|급여|4대보험|국민연금|건강보험료|고용보험|원천징수|연말정산|상여|보너스|최저임금|최저시급|연차|수당|성과급|간이세액|근로소득|세액공제|소득공제|출산지원금|사회보험료|사택|복지포인트|대중교통|청년 소득세/,
    'salary',
  ],
];

/** 가이드 하나에 붙일 대표 계산기. 맞는 규칙이 없거나 계산기를 붙이지 않는 주제면 null */
export function calculatorForGuide(guide: { slug: string; title: string }): MappedCalculator | null {
  if (NO_CALCULATOR.test(guide.title)) return null;
  for (const [re, calc] of RULES) if (re.test(guide.title)) return calc;
  return null;
}

/**
 * 계산기별 핵심어. 계산기 아래 가이드 목록에서 이 말이 제목에 든 글을 먼저 보여 준다
 * (예: 연봉 계산기 아래에 "엔젤투자 소득공제"보다 "4대보험 요율"·"실수령" 글이 먼저).
 */
const CORE_KEYWORDS: Partial<Record<MappedCalculator, RegExp>> = {
  salary: /실수령|연봉|월급|4대보험|간이세액|원천징수/,
  severance: /퇴직금|퇴직소득세/,
  'weekly-holiday-allowance': /주휴수당/,
  'annual-leave': /연차/,
  loan: /대출 ?이자|원리금|중도상환|금리/,
  'loan-limit': /DSR|LTV|한도/,
  'capital-gains-tax': /양도소득세|양도세/,
  'acquisition-tax': /취득세/,
  'property-tax': /재산세/,
  'comprehensive-property-tax': /종부세|종합부동산세/,
  'gift-tax': /증여세/,
  'inheritance-tax': /상속세/,
  vat: /부가세|부가가치세/,
  'freelancer-tax': /종합소득세|프리랜서|종소세/,
  'vehicle-tax': /자동차세/,
  retirement: /연금/,
  'rent-conversion': /전월세|전환율/,
  savings: /적금|복리/,
  deposit: /예금/,
  'n-jobber-insurance': /건강보험|피부양자/,
  'child-tax-credit': /장려금/,
  'housing-subscription': /청약/,
};

/** 계산기 하나에 붙일 가이드 목록. 핵심어가 든 글 먼저, 그다음 최근 발행 순, 최대 limit 편 */
export function guidesForCalculator<T extends { slug: string; title: string; publishedAt: string }>(
  calc: MappedCalculator,
  guides: readonly T[],
  limit = 6,
): T[] {
  const core = CORE_KEYWORDS[calc];
  const rank = (g: T) => (core && core.test(g.title) ? 0 : 1);
  return guides
    .filter((g) => calculatorForGuide(g) === calc)
    .slice()
    .sort(
      (a, b) =>
        rank(a) - rank(b) ||
        b.publishedAt.localeCompare(a.publishedAt) ||
        a.slug.localeCompare(b.slug),
    )
    .slice(0, limit);
}
