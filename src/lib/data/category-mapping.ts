/**
 * 카테고리 → 계산기·가이드·용어 단일 SSoT 매핑.
 *
 * 5개 카테고리 허브 페이지(`src/app/category/{slug}/page.tsx`)가 본 매핑을 import
 * → topic cluster 형성·내부 링크 강화·색인 압력 증가.
 *
 * **하드코딩 5번 금지** — 카테고리·계산기·가이드·용어 추가/이동 시 본 파일 1곳만 갱신.
 *
 * 가이드: `src/app/guide/page.tsx` 의 GUIDES export 를 카테고리별 자동 필터.
 * 용어: `src/app/glossary/page.tsx` 의 카테고리 anchor (#section.category) deep-link.
 */

export type CategoryId = 'work' | 'tax' | 'finance' | 'real-estate' | 'lifestyle';

// ─────────────────────────────────────────────────────────────
// 카테고리 → 계산기 슬러그 (31개 전부 매핑, 하나의 계산기는 여러 카테고리 가능)
// ─────────────────────────────────────────────────────────────
export const CATEGORY_CALCULATORS: Record<CategoryId, string[]> = {
  work: [
    'salary',
    'severance',
    'freelancer-tax',
    'n-jobber-insurance',
    'child-tax-credit',
  ],
  tax: [
    'capital-gains-tax',
    'acquisition-tax',
    'property-tax',
    'comprehensive-property-tax',
    'gift-tax',
    'inheritance-tax',
    'vehicle-tax',
    'vat',
    'severance',
    'freelancer-tax',
    'salary',
    'child-tax-credit',
  ],
  finance: [
    'loan',
    'loan-limit',
    'savings',
    'deposit',
    'exchange',
    'retirement',
    'dti',
    'inflation',
    'averaging-down',
    'split-buy',
    'split-sell',
  ],
  'real-estate': [
    'capital-gains-tax',
    'acquisition-tax',
    'property-tax',
    'comprehensive-property-tax',
    'broker-fee',
    'rent-conversion',
    'rental-yield',
    'housing-subscription',
    'area',
  ],
  lifestyle: ['bmi', 'd-day', 'area', 'inflation'],
};

// ─────────────────────────────────────────────────────────────
// 카테고리 → 가이드 (GUIDES.category 와 1:1 매칭, 추가 cross-category 매핑은 cross-link)
// 사용처: GUIDES.filter((g) => CROSS_GUIDES[cat].includes(g.slug) || g.category === GUIDE_CATEGORY[cat])
// ─────────────────────────────────────────────────────────────
// 카테고리 페이지 → 가이드 카테고리 매핑 (GUIDES.category 한국어 라벨)
export const GUIDE_CATEGORY_LABEL: Record<CategoryId, string[]> = {
  work: ['근로'],
  tax: ['세금'],
  finance: ['금융'],
  'real-estate': ['세금·부동산'],
  lifestyle: ['투자'], // 투자 가이드는 lifestyle 에서 cross-link
};

// 같은 카테고리 라벨에 안 잡히지만 토픽 매칭 가이드 추가 (cross-link)
export const CROSS_GUIDES: Record<CategoryId, string[]> = {
  work: [
    'earned-income-tax-credit-vs-child',
    'child-earned-income-tax-credit-application-2026',
    'may-comprehensive-income-tax',
    'february-tax-refund-tracking',
  ],
  tax: [
    // 세금·부동산 가이드 중 양도세 hub 다수도 cross-link
    'capital-gains-tax-tips',
    'one-household-12-billion-exemption',
    'long-term-holding-special-deduction-80-percent',
    'temporary-two-houses-capital-gains-exemption',
    'joint-ownership-couple-capital-gains-tax-savings',
    'presale-right-capital-gains-tax',
    'inheritance-tax-10-year-prior-gift-aggregation',
    'burden-gift-debt-assumption-tax',
    'carry-over-basis-spouse-gift-5-10-year',
    'child-house-gift-vs-sale-comparison',
    'self-farming-land-100-percent-exemption',
    'family-loan-agreement-gift-tax-avoidance',
    'financial-income-comprehensive-vs-separate-taxation',
  ],
  finance: [],
  'real-estate': [
    'jeonse-deposit-safety',
    'rent-conversion-rate-2026-housing-lease-act',
    'housing-rental-income-separate-taxation',
    'april-comprehensive-property-tax-exclusion',
  ],
  lifestyle: [],
};

// ─────────────────────────────────────────────────────────────
// 카테고리 → 용어사전 핵심 anchor (deep-link)
// `/glossary/page.tsx` 의 GLOSSARY[*].category 한글 anchor 와 카테고리 페이지의 핵심 용어 명시
// 매칭 애매한 카테고리는 빈 배열 — 억지 매칭 금지 (가드레일)
// ─────────────────────────────────────────────────────────────
export interface GlossaryRef {
  /** /glossary/#anchor 로 점프할 anchor (id={section.category}) */
  sectionAnchor: string;
  /** 노출할 핵심 용어 이름 (사용자 클릭 미끼) */
  highlightTerms: string[];
}

export const CATEGORY_GLOSSARY: Record<CategoryId, GlossaryRef | null> = {
  work: {
    sectionAnchor: '근로·사업소득',
    highlightTerms: ['4대보험', '단순경비율', '기준경비율', '퇴직소득세'],
  },
  tax: {
    sectionAnchor: '세금·부동산',
    highlightTerms: ['양도차익', '장기보유특별공제', '1세대1주택 비과세', '이월과세', '저가양수도', '부담부증여'],
  },
  finance: {
    sectionAnchor: '금융·대출',
    highlightTerms: ['DSR (부채원리금상환비율)', 'LTV (담보인정비율)', '스트레스 DSR', '원리금균등상환'],
  },
  'real-estate': {
    sectionAnchor: '세금·부동산',
    highlightTerms: ['공정시장가액비율', '조정대상지역', '환산보증금', '농어촌특별세', '비사업용 토지'],
  },
  lifestyle: {
    sectionAnchor: '주식·코인 투자',
    highlightTerms: ['평균단가 (가중평균)', '물타기 (Averaging Down)', '분할매수 (DCA)', '손익분기점 (BEP)'],
  },
};
