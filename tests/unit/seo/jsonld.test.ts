import { describe, expect, it } from 'vitest';
import {
  buildArticleJsonLd,
  buildBreadcrumbJsonLd,
  buildDefinedTermJsonLd,
  buildDefinedTermSetJsonLd,
  buildFaqPageJsonLd,
  buildHowToJsonLd,
  buildItemListJsonLd,
  buildOrganizationJsonLd,
  buildSoftwareApplicationJsonLd,
  buildSpeakableJsonLd,
  buildWebPageJsonLd,
  buildWebSiteJsonLd,
} from '../../../src/lib/seo/jsonld';

const requireSchemaShape = (value: Record<string, unknown>, type: string) => {
  expect(value['@context']).toBe('https://schema.org');
  expect(value['@type']).toBe(type);
};

describe('Organization JSON-LD', () => {
  it('생성 결과는 schema.org 형태를 갖는다', () => {
    const ld = buildOrganizationJsonLd();
    requireSchemaShape(ld, 'Organization');
    expect(ld.url).toMatch(/^https:\/\//);
    expect(ld.name).toBeTruthy();
  });

  it('NEXT_PUBLIC_SAMEAS_URLS 비어있으면 sameAs 필드가 생성되지 않는다 (soft 404 회피)', () => {
    const prev = process.env.NEXT_PUBLIC_SAMEAS_URLS;
    process.env.NEXT_PUBLIC_SAMEAS_URLS = '';
    const ld = buildOrganizationJsonLd();
    expect(ld.sameAs).toBeUndefined();
    process.env.NEXT_PUBLIC_SAMEAS_URLS = prev;
  });

  it('NEXT_PUBLIC_SAMEAS_URLS 가 있으면 sameAs 배열로 포함된다', () => {
    const prev = process.env.NEXT_PUBLIC_SAMEAS_URLS;
    process.env.NEXT_PUBLIC_SAMEAS_URLS =
      'https://blog.naver.com/example,https://brunch.co.kr/@example';
    const ld = buildOrganizationJsonLd();
    expect(Array.isArray(ld.sameAs)).toBe(true);
    expect((ld.sameAs as string[]).length).toBe(2);
    process.env.NEXT_PUBLIC_SAMEAS_URLS = prev;
  });

  it('잘못된 URL(http(s)// 미시작)은 sameAs 에서 필터된다', () => {
    const prev = process.env.NEXT_PUBLIC_SAMEAS_URLS;
    process.env.NEXT_PUBLIC_SAMEAS_URLS =
      'invalid,ftp://x.com,https://valid.example.com';
    const ld = buildOrganizationJsonLd();
    expect(ld.sameAs).toEqual(['https://valid.example.com']);
    process.env.NEXT_PUBLIC_SAMEAS_URLS = prev;
  });
});

describe('WebSite JSON-LD', () => {
  it('@type=WebSite, ko-KR 명시', () => {
    const ld = buildWebSiteJsonLd();
    requireSchemaShape(ld, 'WebSite');
    expect(ld.inLanguage).toBe('ko-KR');
    expect(ld.publisher).toBeDefined();
  });
});

describe('SoftwareApplication JSON-LD', () => {
  const baseOpts = {
    name: '연봉실수령액 계산기',
    description: '2026 4대보험·소득세 반영',
    url: 'https://calculatorhost.com/calculator/salary/',
  };

  it('필수 필드 + offers price 0 KRW + 무료', () => {
    const ld = buildSoftwareApplicationJsonLd(baseOpts);
    requireSchemaShape(ld, 'SoftwareApplication');
    expect(ld.applicationCategory).toBe('FinanceApplication');
    expect(ld.isAccessibleForFree).toBe(true);
    expect((ld.offers as { price: number; priceCurrency: string }).price).toBe(0);
    expect((ld.offers as { priceCurrency: string }).priceCurrency).toBe('KRW');
  });

  it('image 옵션 단일/배열 모두 지원', () => {
    const single = buildSoftwareApplicationJsonLd({
      ...baseOpts,
      image: 'https://calculatorhost.com/og/salary.png',
    });
    expect(single.image).toBe('https://calculatorhost.com/og/salary.png');

    const multi = buildSoftwareApplicationJsonLd({
      ...baseOpts,
      image: ['https://x/1.png', 'https://x/2.png'],
    });
    expect(Array.isArray(multi.image)).toBe(true);
  });

  it('applicationCategory 오버라이드 가능', () => {
    const ld = buildSoftwareApplicationJsonLd({
      ...baseOpts,
      applicationCategory: 'BusinessApplication',
    });
    expect(ld.applicationCategory).toBe('BusinessApplication');
  });

  it('image 미지정 시 image 키 자체가 생성되지 않음', () => {
    const ld = buildSoftwareApplicationJsonLd(baseOpts);
    expect('image' in ld).toBe(false);
  });
});

describe('FAQPage JSON-LD', () => {
  it('mainEntity 가 Question 배열을 생성한다', () => {
    const ld = buildFaqPageJsonLd([
      { question: 'Q1', answer: 'A1' },
      { question: 'Q2', answer: 'A2' },
    ]);
    requireSchemaShape(ld, 'FAQPage');
    const main = ld.mainEntity as Array<{
      '@type': string;
      name: string;
      acceptedAnswer: { text: string };
    }>;
    expect(main).toHaveLength(2);
    expect(main[0]?.['@type']).toBe('Question');
    expect(main[0]?.acceptedAnswer.text).toBe('A1');
  });

  it('빈 배열도 정상 생성', () => {
    const ld = buildFaqPageJsonLd([]);
    expect((ld.mainEntity as unknown[]).length).toBe(0);
  });
});

describe('BreadcrumbList JSON-LD', () => {
  it('position 1부터 시작', () => {
    const ld = buildBreadcrumbJsonLd([
      { name: '홈', url: 'https://calculatorhost.com/' },
      { name: '세금', url: 'https://calculatorhost.com/category/tax/' },
    ]);
    requireSchemaShape(ld, 'BreadcrumbList');
    const list = ld.itemListElement as Array<{ position: number; item?: string }>;
    expect(list[0]?.position).toBe(1);
    expect(list[1]?.position).toBe(2);
  });

  it('url 미지정 항목은 item 키가 빠진다 (현재 페이지)', () => {
    const ld = buildBreadcrumbJsonLd([{ name: '홈' }]);
    const list = ld.itemListElement as Array<{ item?: string }>;
    expect(list[0] && 'item' in list[0]).toBe(false);
  });
});

describe('HowTo JSON-LD', () => {
  it('step 배열에 position 자동 할당', () => {
    const ld = buildHowToJsonLd({
      name: '연봉실수령액 계산하는 법',
      description: '2026 기준',
      steps: [
        { name: '연봉 입력', text: '세전 연봉을 만원 단위로' },
        { name: '비과세 입력', text: '식대 등' },
      ],
    });
    requireSchemaShape(ld, 'HowTo');
    const steps = ld.step as Array<{ position: number }>;
    expect(steps[0]?.position).toBe(1);
    expect(steps[1]?.position).toBe(2);
  });
});

describe('WebPage JSON-LD', () => {
  const baseOpts = {
    name: '연봉실수령액 계산기',
    description: '2026 기준',
    url: 'https://calculatorhost.com/calculator/salary/',
    datePublished: '2026-01-01',
    dateModified: '2026-05-04',
  };

  it('필수 필드 + author/publisher 자동 부여', () => {
    const ld = buildWebPageJsonLd(baseOpts);
    requireSchemaShape(ld, 'WebPage');
    expect(ld.inLanguage).toBe('ko-KR');
    expect(ld.author).toBeDefined();
    expect(ld.publisher).toBeDefined();
  });

  it('isPartOf 지정 시 WebSite @id 로 연결', () => {
    const ld = buildWebPageJsonLd({
      ...baseOpts,
      isPartOf: 'https://calculatorhost.com/#site',
    });
    expect(ld.isPartOf).toEqual({
      '@type': 'WebSite',
      '@id': 'https://calculatorhost.com/#site',
    });
  });

  it('image 미지정 시 image 키 자체가 생성되지 않음', () => {
    const ld = buildWebPageJsonLd(baseOpts);
    expect('image' in ld).toBe(false);
  });
});

describe('Speakable JSON-LD', () => {
  it('cssSelector 배열 그대로 전달', () => {
    const ld = buildSpeakableJsonLd(['.tldr', '.faq-answer']);
    requireSchemaShape(ld, 'WebPage');
    const speakable = ld.speakable as { cssSelector: string[] };
    expect(speakable.cssSelector).toEqual(['.tldr', '.faq-answer']);
  });
});

describe('ItemList JSON-LD', () => {
  it('listName 옵션 처리', () => {
    const ld = buildItemListJsonLd(
      [
        { name: '연봉', url: 'https://x/salary' },
        { name: '대출', url: 'https://x/loan' },
      ],
      '인기 계산기',
    );
    requireSchemaShape(ld, 'ItemList');
    expect(ld.name).toBe('인기 계산기');
    const list = ld.itemListElement as Array<{ position: number }>;
    expect(list[0]?.position).toBe(1);
  });

  it('listName 미지정 시 name 키 없음', () => {
    const ld = buildItemListJsonLd([{ name: 'x', url: 'https://x' }]);
    expect('name' in ld).toBe(false);
  });
});

describe('DefinedTerm JSON-LD', () => {
  it('필수 필드 + 옵셔널 필드 처리', () => {
    const ld = buildDefinedTermJsonLd({
      name: 'DSR(부채원리금상환비율)',
      description: '연소득 대비 모든 대출의 연간 원리금 상환액 비율',
      alternateName: 'DSR',
      url: 'https://www.fss.or.kr/...',
      inDefinedTermSet: 'https://calculatorhost.com/glossary',
    });
    requireSchemaShape(ld, 'DefinedTerm');
    expect(ld.alternateName).toBe('DSR');
    expect(ld.url).toBeTruthy();
    expect(ld.inDefinedTermSet).toBeTruthy();
  });

  it('옵셔널 필드 미지정 시 키 자체가 빠진다', () => {
    const ld = buildDefinedTermJsonLd({
      name: 'LTV',
      description: '담보인정비율',
    });
    expect('alternateName' in ld).toBe(false);
    expect('url' in ld).toBe(false);
    expect('inDefinedTermSet' in ld).toBe(false);
  });
});

describe('DefinedTermSet JSON-LD', () => {
  it('hasDefinedTerm 배열 생성', () => {
    const ld = buildDefinedTermSetJsonLd({
      name: '금융 용어집',
      description: '핵심 금융 용어',
      url: 'https://calculatorhost.com/glossary',
      terms: [
        { name: 'DSR', description: '부채원리금상환비율', alternateName: 'DSR' },
        { name: 'LTV', description: '담보인정비율' },
      ],
    });
    requireSchemaShape(ld, 'DefinedTermSet');
    const terms = ld.hasDefinedTerm as Array<{ name: string; alternateName?: string }>;
    expect(terms).toHaveLength(2);
    expect(terms[0]?.alternateName).toBe('DSR');
    expect(terms[1] && 'alternateName' in terms[1]).toBe(false);
  });
});

describe('Article JSON-LD', () => {
  const baseOpts = {
    headline: '일시적 2주택 양도세 비과세 가이드',
    description: '2026 기준 종전·신규 주택 처분 기한',
    url: 'https://calculatorhost.com/guides/temporary-2-house/',
    datePublished: '2026-04-01',
    dateModified: '2026-05-04',
    authorName: 'calculatorhost 편집팀',
  };

  it('기본 type=Article + 저자/발행자 명시', () => {
    const ld = buildArticleJsonLd(baseOpts);
    requireSchemaShape(ld, 'Article');
    expect(ld.author).toBeDefined();
    expect(ld.publisher).toBeDefined();
    expect(ld.mainEntityOfPage).toBeDefined();
  });

  it('type 오버라이드 (NewsArticle/BlogPosting)', () => {
    const news = buildArticleJsonLd({ ...baseOpts, type: 'NewsArticle' });
    expect(news['@type']).toBe('NewsArticle');
    const blog = buildArticleJsonLd({ ...baseOpts, type: 'BlogPosting' });
    expect(blog['@type']).toBe('BlogPosting');
  });

  it('keywords 배열을 콤마 구분 문자열로 변환', () => {
    const ld = buildArticleJsonLd({
      ...baseOpts,
      keywords: ['양도세', '일시적 2주택', '비과세'],
    });
    expect(ld.keywords).toBe('양도세, 일시적 2주택, 비과세');
  });

  it('authorUrl 미지정 시 author 객체에 url 키가 빠진다', () => {
    const ld = buildArticleJsonLd(baseOpts);
    const author = ld.author as { url?: string };
    expect('url' in author).toBe(false);
  });

  it('authorUrl 지정 시 author.url 포함', () => {
    const ld = buildArticleJsonLd({ ...baseOpts, authorUrl: 'https://x/about' });
    const author = ld.author as { url?: string };
    expect(author.url).toBe('https://x/about');
  });
});
