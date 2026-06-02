import type { MetadataRoute } from 'next';
import { statSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

// next.config.ts 의 output: 'export' 모드에서 route handler 도 정적 생성 필수.
export const dynamic = 'force-static';

const BASE = 'https://calculatorhost.com';

/**
 * 각 페이지의 page.tsx 파일 mtime 을 lastModified 로 사용.
 * 빌드 시점 일괄 'now' 보다 정확 — 변경된 페이지만 Google 이 우선 크롤링.
 * 파일 없거나 stat 실패 시 빌드 시점(now) fallback.
 */
function pageLastModified(relativePath: string): string {
  try {
    const filePath = resolve(process.cwd(), relativePath);
    if (!existsSync(filePath)) return new Date().toISOString();
    return statSync(filePath).mtime.toISOString();
  } catch {
    return new Date().toISOString();
  }
}

const CALCULATOR_SLUGS = [
  'salary',
  'severance',
  'loan',
  'loan-limit',
  'capital-gains-tax',
  'acquisition-tax',
  'property-tax',
  'comprehensive-property-tax',
  'broker-fee',
  'rent-conversion',
  'area',
  'savings',
  'deposit',
  'retirement',
  'bmi',
  'd-day',
  'freelancer-tax',
  'gift-tax',
  'inheritance-tax',
  'vehicle-tax',
  'exchange',
  'housing-subscription',
  'child-tax-credit',
  'n-jobber-insurance',
  'rental-yield',
  'inflation',
  'averaging-down',
  'split-buy',
  'split-sell',
  'vat',
  'dti',
];

const CATEGORY_SLUGS = ['work', 'tax', 'finance', 'real-estate', 'lifestyle'];

// 가이드 콘텐츠 (Article schema)
const GUIDE_SLUGS = [
  // 시기성 (월별)
  'tax-calendar-2026',
  'year-end-tax-settlement',
  'january-vehicle-tax-prepayment',
  'february-tax-refund-tracking',
  'march-corporate-tax',
  'april-vat-preliminary-q1',
  'april-comprehensive-property-tax-exclusion',
  'may-comprehensive-income-tax',
  'june-property-tax',
  'property-tax-base-date-june-1-2026',
  'vehicle-individual-consumption-tax-deadline-2026-june',
  'vehicle-tax-june-payment-annual-discount-2026',
  'comprehensive-real-estate-tax-who-pays-2026',
  // 분야별
  'dsr-loan-limit-tips',
  'averaging-down-vs-loss-cut',
  'capital-gains-tax-tips',
  'dsr-regulation-zones',
  'freelancer-salary-comparison',
  // Phase M: 신규 가이드 2개 (트래픽 가치 높은 니치)
  'jeonse-deposit-safety',
  'capital-gains-tax-5-steps',
  // Phase N: 신규 가이드 1개 (블루오션 C 페르소나)
  'salary-negotiation-take-home',
  // Phase O: 신규 가이드 (5월 신고 시즈널 — 근로·자녀장려금 헷갈림)
  'earned-income-tax-credit-vs-child',
  // GSC 노출 42회 단일 토픽 (페이지 부재 → 즉시 캡처)
  'rent-conversion-rate-2026-housing-lease-act',
  // 퇴직금 vs 연금 DC/DB 비교 가이드 (sitemap 누락 보강)
  'severance-vs-pension-dc-db',
  // 시즈널 7월 부가세 1기 확정신고 (Phase 3 시즈널 6편 첫 발행)
  'july-vat-final-1st-half',
  // 시즈널 8월 양도세 절세 검토
  'august-capital-gains-tax-review',
  // 시즈널 9월 재산세 2차 납부
  'september-property-tax-second',
  // 시즈널 10월 부가세 2기 예정신고
  'october-vat-q2-preliminary',
  // 시즈널 11월 연말정산 준비
  'november-year-end-tax-prep',
  // 시즈널 12월 양도세 마감 결정 (마지막 시즈널)
  'december-capital-gains-tax-deadline',
  // 분양권 양도세 완전 정리 (4티어 핫 키워드)
  'presale-right-capital-gains-tax',
  // 1세대1주택 12억 한도 완전 정리 (4티어 핫 키워드)
  'one-household-12-billion-exemption',
  // N잡 건강보험 피부양자 탈락 가이드 (4티어 핫 키워드)
  'n-jobber-insurance-dependent-disqualification',
  // 주택임대소득 분리과세 2,000만 원 가이드 (4티어 핫 키워드)
  'housing-rental-income-separate-taxation',
  // 자녀·근로장려금 신청 가이드 (5월 31일 마감 시즈널 + 4티어)
  'child-earned-income-tax-credit-application-2026',
  // 부부 공동명의 양도세 절세 가이드 (4티어 핫 키워드)
  'joint-ownership-couple-capital-gains-tax-savings',
  // 상속세 사전 증여 합산 10년/5년 가이드 (4티어 핫 키워드 — 상증법 §13)
  'inheritance-tax-10-year-prior-gift-aggregation',
  // 일시적 2주택 양도세 비과세 3년 가이드 (4티어 핫 키워드 — 시행령 §155)
  'temporary-two-houses-capital-gains-exemption',
  // 장기보유특별공제 80% 가이드 (4티어 핫 키워드 — 1세대1주택 §95 ② / 시행령 §159의3)
  'long-term-holding-special-deduction-80-percent',
  // 부담부증여 양도+증여세 가이드 (4티어 핫 키워드 — 상증법 §47 ②)
  'burden-gift-debt-assumption-tax',
  // 금융소득 종합과세 vs 분리과세 가이드 (4티어 핫 키워드 + 5월 신고 시즈널 — 소득세법 §14 ⑦ / §62)
  'financial-income-comprehensive-vs-separate-taxation',
  // 이월과세 5년→10년 확대 가이드 (4티어 핫 키워드 — 소득세법 §97의2 / 2025-01-01 시행)
  'carry-over-basis-spouse-gift-5-10-year',
  // 자녀 주택 증여 vs 매매 비교 가이드 (4티어 핫 키워드 — 상증법 §35 ① / 시행령 §26)
  'child-house-gift-vs-sale-comparison',
  // 자경농지 8년 100% 감면 가이드 (4티어 핫 키워드 — 조특법 §69 / §133)
  'self-farming-land-100-percent-exemption',
  // 가족 간 차용증·금전대여 증여세 가이드 (4티어 핫 키워드 — 상증법 §41의4 / 시행령 §31의5 적정이자율 4.6%)
  'family-loan-agreement-gift-tax-avoidance',
  'july-vat-and-tax-withholding',
  // 종합소득세 무신고·지연 가산세 (4티어 핫 키워드 — 국세기본법 §47의2 / §47의4 / §48 / 5월 31일 마감 시즈널)
  'income-tax-late-filing-penalty-2026',
  // 프리랜서 단순경비율 vs 기준경비율 (4티어 핫 키워드 — 소득세법 §80 / 시행령 §143·§145 / 5월 31일 마감 시즈널)
  'freelancer-simplified-vs-standard-expense-rate-2026',
  // N잡러 종합소득세 합산 신고 (4티어 핫 키워드 — 소득세법 §14 / §55 / §70 / 5월 31일 마감 시즈널)
  'n-jobber-comprehensive-income-tax-2026',
  // 소득공제 vs 세액공제 (4티어 — 소득세법 §50~§59의5 / 5월 31일 마감 시즈널)
  'income-deduction-vs-tax-credit-2026',
  // 사적연금 1,500만 원 분리과세 (4티어 — 소득세법 §14 ③ 9호 / §129 ⑤ / 5월 마감 시즈널 + 은퇴자 페르소나)
  'private-pension-1500-million-separate-taxation-2026',
  // 월세 세액공제 (4티어 — 조세특례제한법 §95의2 / 5월 추가 신고 시즌 + 무주택 직장인 페르소나)
  'monthly-rent-tax-credit-2026',
  // 종합소득세 환급금 입금 시기 (4티어 — 국세기본법 §51~§52 / 5월 마감 7일 전 시즌 후행 직격)
  'comprehensive-income-tax-refund-timing-2026',
  // 종소세 경정청구 5년 (4티어 — 국세기본법 §45의2 / 장기 트래픽 + 시즌 보강)
  'income-tax-correction-claim-5-year-2026',
  // 상속주택 양도세 1세대1주택 합가 5년 (4티어 — 소득세법 §89 / 시행령 §155 ② / 양도세 hub 강화)
  'inherited-house-capital-gains-exemption-5-year-2026',
  // 종합소득세 분납 신청 1천만 초과 2개월 분할 (4티어 — 소득세법 §77 / 5월 마감 5일 전 시즌 직격)
  'income-tax-installment-payment-2026',
  // 의료비 세액공제 3% 초과 15% 700만 한도 (4티어 — 조세특례제한법 §53 / 누락 회복형)
  'medical-expense-tax-credit-3-percent-2026',
  // 인적공제 부양가족 150만 (4티어 — 소득세법 §50 §51 / 직계존비속·형제자매 요건)
  'personal-deduction-dependent-150-2026',
  // 사업소득 vs 기타소득 분류 (4티어 — 소득세법 §19 / §21 / §37 / 시행령 §87)
  'business-income-vs-other-income-classification-2026',
  // 외국납부세액공제 해외주식·배당 (4티어 블루오션 — 소득세법 §57)
  'foreign-tax-credit-overseas-stock-2026',
  // 사망자 종합소득세 상속인 신고 (4티어 블루오션 — 소득세법 §74 / 6개월 기한)
  'deceased-comprehensive-income-tax-heir-filing-2026',
  // 5월 31일 마감 당일 신고 가이드 (시즌 직격 — 소득세법 §70 / 자정 24:00 마감)
  'may-31-deadline-day-income-tax-filing-2026',
  // 자진신고 6월 30일 50% 감면 (시즌 후행 — 국세기본법 §48 / 마감 후 첫 30일)
  'voluntary-filing-june-50-percent-reduction-2026',
  // 분리과세 vs 종합과세 마스터 (4티어 정리형 — 소득세법 §14 / 사적연금·금융·기타소득)
  'separate-vs-comprehensive-taxation-master-2026',
];

export default function sitemap(): MetadataRoute.Sitemap {
  // next.config.ts 의 trailingSlash: true 와 일관성을 위해 모든 URL 끝에 / 추가.
  // canonical 과 sitemap 의 URL 형식이 일치해야 Google 색인 충돌 X.
  return [
    {
      url: `${BASE}/`,
      lastModified: pageLastModified('src/app/page.tsx'),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    ...CATEGORY_SLUGS.map((slug) => ({
      url: `${BASE}/category/${slug}/`,
      lastModified: pageLastModified(`src/app/category/${slug}/page.tsx`),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    })),
    ...CALCULATOR_SLUGS.map((slug) => ({
      url: `${BASE}/calculator/${slug}/`,
      lastModified: pageLastModified(`src/app/calculator/${slug}/page.tsx`),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    })),
    // 용어사전 (단일 페이지, 18개 용어)
    {
      url: `${BASE}/glossary/`,
      lastModified: pageLastModified('src/app/glossary/page.tsx'),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    // 가이드 인덱스
    {
      url: `${BASE}/guide/`,
      lastModified: pageLastModified('src/app/guide/page.tsx'),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    // 변경 이력 (Changelog) — Freshness 신호용 hub
    {
      url: `${BASE}/updates/`,
      lastModified: pageLastModified('src/lib/constants/updates-log.ts'),
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    },
    // 가이드 개별 게시물
    ...GUIDE_SLUGS.map((slug) => ({
      url: `${BASE}/guide/${slug}/`,
      lastModified: pageLastModified(`src/app/guide/${slug}/page.tsx`),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
    ...['about', 'privacy', 'terms', 'contact', 'affiliate-disclosure'].map((slug) => ({
      url: `${BASE}/${slug}/`,
      lastModified: pageLastModified(`src/app/${slug}/page.tsx`),
      changeFrequency: 'monthly' as const,
      priority: 0.3,
    })),
  ];
}
