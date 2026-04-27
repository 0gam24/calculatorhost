import type { MetadataRoute } from 'next';

// next.config.ts 의 output: 'export' 모드에서 route handler 도 정적 생성 필수.
export const dynamic = 'force-static';

/**
 * 정책: 모든 검색엔진·AI 봇 허용 (GEO/AEO 전략).
 *  - 한국 포털 (네이버 Yeti, 다음 Daum), 글로벌 검색 (Google, Bing 등) 전부 `*` 매칭으로 자동 허용
 *  - AI 학습/답변 봇 (GPTBot, ClaudeBot, PerplexityBot, Google-Extended 등) 도 `*` 자동 허용
 *  - 기술 경로만 차단: /api (Pages Functions 프록시), /_next (빌드 산출물), /*.json (데이터 파일)
 *
 * Google 사양 핵심:
 *  - 그룹 매칭은 "가장 구체적인 첫 번째 그룹 1개"만 적용. 별도 그룹은 `*` 의 disallow 를 상속받지 않음.
 *  - AdsBot-Google 은 와일드카드 `*` 에서 자동 제외 → 별도 명시 그룹 필수.
 *  - 비표준 `host:` 필드는 제거 (Google·Bing 모두 무시).
 *
 * 참고:
 *  - https://developers.google.com/search/docs/crawling-indexing/robots/intro?hl=ko
 *  - https://developers.google.com/search/docs/crawling-indexing/robots/create-robots-txt?hl=ko
 *  - docs/seo-keyword-map.md §9 GEO/AEO 원칙 (LLM 인용 유도)
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // 모든 봇 — 기술 경로만 차단
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/', '/*.json$'],
      },
      // AdsBot-Google — `*` 에서 자동 제외되므로 별도 명시 (Google 사양 강제)
      {
        userAgent: 'AdsBot-Google',
        allow: '/',
        disallow: '/api/',
      },
      // Mediapartners-Google — AdSense 광고 미디어 봇 (광고 품질·송출 안정성)
      {
        userAgent: 'Mediapartners-Google',
        allow: '/',
      },
    ],
    sitemap: 'https://calculatorhost.com/sitemap.xml',
  };
}
