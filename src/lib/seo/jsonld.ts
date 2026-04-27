/**
 * JSON-LD 구조화 데이터 헬퍼
 * seo-auditor 에이전트가 참조하는 SSoT 구현체.
 *
 * 관련:
 * - .claude/skills/google-seo-reference/REFERENCE.md §6
 * - docs/adr/006-geo-aeo-first.md
 */

const SITE_URL = 'https://calculatorhost.com';
const SITE_NAME = 'calculatorhost';

export interface JsonLd {
  '@context': 'https://schema.org';
  '@type': string;
  [key: string]: unknown;
}

export function buildOrganizationJsonLd(): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
  };
}

export function buildWebSiteJsonLd(): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    inLanguage: 'ko-KR',
    potentialAction: {
      '@type': 'SearchAction',
      target: `${SITE_URL}/검색?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };
}

export interface SoftwareApplicationOptions {
  name: string;
  description: string;
  url: string;
}

export function buildSoftwareApplicationJsonLd(opts: SoftwareApplicationOptions): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: opts.name,
    description: opts.description,
    url: opts.url,
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      price: 0,
      priceCurrency: 'KRW',
    },
    // aggregateRating 은 실제 사용자 평점 수집 후에만 추가 (가짜 평점 금지 - AdSense/Google 정책)
  };
}

export interface FaqItem {
  question: string;
  answer: string;
}

export function buildFaqPageJsonLd(items: FaqItem[]): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}

export interface BreadcrumbItem {
  name: string;
  url?: string;
}

export function buildBreadcrumbJsonLd(items: BreadcrumbItem[]): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: item.name,
      ...(item.url ? { item: item.url } : {}),
    })),
  };
}

export interface HowToStep {
  name: string;
  text: string;
}

export function buildHowToJsonLd(opts: {
  name: string;
  description: string;
  steps: HowToStep[];
}): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: opts.name,
    description: opts.description,
    step: opts.steps.map((s, idx) => ({
      '@type': 'HowToStep',
      position: idx + 1,
      name: s.name,
      text: s.text,
    })),
  };
}

/**
 * WebPage: 페이지 메타데이터 (모든 계산기 페이지 필수)
 * 검색 엔진이 페이지의 발행/수정 일자, 설명을 인식하도록 명시
 */
export interface WebPageOptions {
  name: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified: string;
}

export function buildWebPageJsonLd(opts: WebPageOptions): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: opts.name,
    description: opts.description,
    url: opts.url,
    datePublished: opts.datePublished,
    dateModified: opts.dateModified,
  };
}

/**
 * Speakable: 음성 비서 / AI 답변 엔진 최적화 (GEO/AEO)
 * ADR-006 참조
 */
export function buildSpeakableJsonLd(cssSelectors: string[]): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: cssSelectors,
    },
  };
}

/**
 * ItemList: 카테고리 허브 페이지에서 계산기 모음을 명시 (리치 결과 후보)
 * https://schema.org/ItemList
 */
export interface ItemListEntry {
  name: string;
  url: string;
}

export function buildItemListJsonLd(items: ItemListEntry[], listName?: string): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    ...(listName ? { name: listName } : {}),
    itemListElement: items.map((item, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: item.name,
      url: item.url,
    })),
  };
}
