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
const SITE_LEGAL_NAME = '스마트데이터샵';
const SITE_FOUNDER = '김준혁';
const SITE_DESCRIPTION =
  '2026년 최신 세율·금리를 반영한 한국 생활 금융·세금·부동산·근로 계산기 31종을 무료로 제공하는 사이트.';

export interface JsonLd {
  '@context': 'https://schema.org';
  '@type': string;
  [key: string]: unknown;
}

/**
 * Organization (전역 단일) — Knowledge Graph·Rich Result 후보.
 * logo/sameAs/contactPoint 는 실제 자산이 갖춰질 때만 추가 (soft 404 방지).
 */
export function buildOrganizationJsonLd(): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    legalName: SITE_LEGAL_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    foundingDate: '2020-05-21',
    founder: {
      '@type': 'Person',
      name: SITE_FOUNDER,
    },
    taxID: '406-06-34485',
    areaServed: { '@type': 'Country', name: 'South Korea' },
    knowsLanguage: ['ko-KR'],
  };
}

/**
 * WebSite — 사이트 전역 메타.
 * 사이트 내 검색 페이지가 없으므로 SearchAction 미선언 (없는 URL 선언 시 soft 404).
 * 향후 /search 라우트 신설 시 potentialAction 복구.
 */
export function buildWebSiteJsonLd(): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    inLanguage: 'ko-KR',
    publisher: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
  };
}

export interface SoftwareApplicationOptions {
  name: string;
  description: string;
  url: string;
  /** OG 이미지 절대 URL (선택). Rich Result 적격성 ↑ */
  image?: string | string[];
  /** applicationCategory 오버라이드 (기본 FinanceApplication) */
  applicationCategory?: string;
}

export function buildSoftwareApplicationJsonLd(opts: SoftwareApplicationOptions): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: opts.name,
    description: opts.description,
    url: opts.url,
    ...(opts.image ? { image: opts.image } : {}),
    applicationCategory: opts.applicationCategory ?? 'FinanceApplication',
    operatingSystem: 'Web',
    inLanguage: 'ko-KR',
    isAccessibleForFree: true,
    publisher: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
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
 * 검색 엔진이 페이지의 발행/수정 일자, 설명을 인식하도록 명시.
 * E-E-A-T 강화: 기본 author·publisher 자동 부여 (Organization).
 */
export interface WebPageOptions {
  name: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified: string;
  /** OG 이미지 절대 URL (선택). 검색 결과 thumbnail·SNS 미리보기 */
  image?: string | string[];
  /** isPartOf — 카테고리 페이지 URL (선택, 사이트 계층 구조 신호) */
  isPartOf?: string;
}

export function buildWebPageJsonLd(opts: WebPageOptions): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: opts.name,
    description: opts.description,
    url: opts.url,
    inLanguage: 'ko-KR',
    datePublished: opts.datePublished,
    dateModified: opts.dateModified,
    ...(opts.image ? { image: opts.image } : {}),
    ...(opts.isPartOf
      ? { isPartOf: { '@type': 'WebSite', '@id': opts.isPartOf } }
      : {}),
    author: {
      '@type': 'Person',
      name: SITE_FOUNDER,
      url: `${SITE_URL}/about/`,
      affiliation: {
        '@type': 'Organization',
        name: SITE_LEGAL_NAME,
        url: SITE_URL,
      },
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_LEGAL_NAME,
      legalName: SITE_LEGAL_NAME,
      url: SITE_URL,
    },
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

/**
 * DefinedTerm / DefinedTermSet — 용어사전·전문용어 정의 (GEO/AEO 강화)
 * LLM(ChatGPT/Claude/Perplexity)이 본문 용어를 정확히 추출·인용하도록 명시.
 * 계산기 본문에 반복 등장하는 핵심 용어(DSR, LTV, 평단, 양도세 등) 마크업.
 *
 * https://schema.org/DefinedTerm
 * https://schema.org/DefinedTermSet
 */
export interface DefinedTermEntry {
  /** 용어 한글명 (예: "DSR(부채원리금상환비율)") */
  name: string;
  /** 용어 정의 (1-3문장, 100-300자 권장) */
  description: string;
  /** 용어 약어 (선택, 예: "DSR") */
  alternateName?: string;
  /** 외부 권위 출처 URL (선택, 예: 국세청 법조항) */
  url?: string;
  /** 분야 (선택, 예: "금융", "세금") */
  inDefinedTermSet?: string;
}

export function buildDefinedTermJsonLd(entry: DefinedTermEntry): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'DefinedTerm',
    name: entry.name,
    description: entry.description,
    inLanguage: 'ko-KR',
    ...(entry.alternateName ? { alternateName: entry.alternateName } : {}),
    ...(entry.url ? { url: entry.url } : {}),
    ...(entry.inDefinedTermSet ? { inDefinedTermSet: entry.inDefinedTermSet } : {}),
  };
}

export interface DefinedTermSetOptions {
  /** 용어집 이름 (예: "금융 계산기 핵심 용어") */
  name: string;
  /** 용어집 설명 */
  description: string;
  /** 용어집 URL (페이지 URL 또는 anchor) */
  url: string;
  /** 포함 용어 배열 */
  terms: DefinedTermEntry[];
}

/**
 * Article — 가이드·블로그·뉴스 콘텐츠용 (E-E-A-T + Rich Result)
 * 계산기 페이지(SoftwareApplication)와 별개 콘텐츠용.
 */
export interface ArticleOptions {
  headline: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified: string;
  /** 저자 이름 (예: "calculatorhost 편집팀" 또는 실명) */
  authorName: string;
  /** 저자 URL (선택, 예: /about) */
  authorUrl?: string;
  /** 대표 이미지 URL (1200x630 권장) */
  image?: string | string[];
  /** Article 종류 (기본: Article, 대안: NewsArticle, BlogPosting) */
  type?: 'Article' | 'NewsArticle' | 'BlogPosting';
  /** 키워드 (선택, 콤마 구분 또는 배열) */
  keywords?: string[];
}

export function buildArticleJsonLd(opts: ArticleOptions): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': opts.type ?? 'Article',
    headline: opts.headline,
    description: opts.description,
    url: opts.url,
    inLanguage: 'ko-KR',
    datePublished: opts.datePublished,
    dateModified: opts.dateModified,
    ...(opts.image ? { image: opts.image } : {}),
    ...(opts.keywords ? { keywords: opts.keywords.join(', ') } : {}),
    author: {
      '@type': 'Person',
      name: opts.authorName,
      ...(opts.authorUrl ? { url: opts.authorUrl } : {}),
      affiliation: {
        '@type': 'Organization',
        name: SITE_LEGAL_NAME,
        url: SITE_URL,
      },
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_LEGAL_NAME,
      legalName: SITE_LEGAL_NAME,
      url: SITE_URL,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': opts.url,
    },
  };
}

export function buildDefinedTermSetJsonLd(opts: DefinedTermSetOptions): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'DefinedTermSet',
    name: opts.name,
    description: opts.description,
    url: opts.url,
    inLanguage: 'ko-KR',
    hasDefinedTerm: opts.terms.map((t) => ({
      '@type': 'DefinedTerm',
      name: t.name,
      description: t.description,
      inLanguage: 'ko-KR',
      ...(t.alternateName ? { alternateName: t.alternateName } : {}),
      ...(t.url ? { url: t.url } : {}),
    })),
  };
}
