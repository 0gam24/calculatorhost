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
