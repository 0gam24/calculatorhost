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
    ...['about', 'privacy', 'terms', 'contact'].map((slug) => ({
      url: `${BASE}/${slug}/`,
      lastModified: pageLastModified(`src/app/${slug}/page.tsx`),
      changeFrequency: 'monthly' as const,
      priority: 0.3,
    })),
  ];
}
