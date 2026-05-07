/**
 * smartdatashop network — 메인 사이트(smartdatashop.kr) backref 매핑.
 *
 * calculatorhost(자매·인터랙티브 계산기 페르소나)에서 메인 데이터 저널로
 * 자연 funnel 시키기 위한 카테고리 → 메인 hub URL 변환 헬퍼.
 *
 * NETWORK.md v0.6 dual-brand 규약 §3.1 (CATEGORY_MAP):
 *   - tax / finance / real-estate / work → tax-finance hub
 *   - lifestyle → stats hub
 *
 * 매핑 누락 시 stats hub 로 fallback (메인 홈 직링크는 soft 404 회피 위해 사용 안 함).
 */

export const MAIN_SITE_URL = 'https://smartdatashop.kr';
export const MAIN_SITE_NAME = 'smartdatashop.kr';
export const MAIN_SITE_LEGAL_NAME = '스마트데이터샵';

type MainHub = 'tax-finance' | 'stats';

const CALCULATORHOST_TO_MAIN: Record<string, MainHub> = {
  tax: 'tax-finance',
  finance: 'tax-finance',
  'real-estate': 'tax-finance',
  work: 'tax-finance',
  lifestyle: 'stats',
};

/**
 * 자매(calculatorhost) 카테고리 → 메인(smartdatashop.kr) 카테고리 hub URL.
 * 매핑 없으면 stats hub 로 fallback.
 */
export function getMainCategoryUrl(calculatorhostCategory: string): string {
  const hub = CALCULATORHOST_TO_MAIN[calculatorhostCategory] ?? 'stats';
  return `${MAIN_SITE_URL}/category/${hub}/`;
}

const SLUG_TO_CATEGORY: Record<string, string> = {
  // 근로
  salary: 'work',
  severance: 'work',
  retirement: 'work',
  'freelancer-tax': 'work',
  'n-jobber-insurance': 'work',
  'child-tax-credit': 'work',
  // 세금
  vat: 'tax',
  'acquisition-tax': 'tax',
  'capital-gains-tax': 'tax',
  'gift-tax': 'tax',
  'inheritance-tax': 'tax',
  'comprehensive-property-tax': 'tax',
  'vehicle-tax': 'tax',
  // 부동산
  'property-tax': 'real-estate',
  'broker-fee': 'real-estate',
  'rent-conversion': 'real-estate',
  'rental-yield': 'real-estate',
  'housing-subscription': 'real-estate',
  // 금융
  loan: 'finance',
  'loan-limit': 'finance',
  deposit: 'finance',
  savings: 'finance',
  exchange: 'finance',
  inflation: 'finance',
  'split-buy': 'finance',
  'split-sell': 'finance',
  'averaging-down': 'finance',
  // 생활
  bmi: 'lifestyle',
  'd-day': 'lifestyle',
  area: 'lifestyle',
};

/**
 * 계산기 슬러그 → 메인 hub URL (편의 함수).
 * 매핑 누락 시 stats hub 로 fallback.
 */
export function getMainCategoryUrlForCalculatorSlug(slug: string): string {
  const category = SLUG_TO_CATEGORY[slug];
  return getMainCategoryUrl(category ?? '');
}
