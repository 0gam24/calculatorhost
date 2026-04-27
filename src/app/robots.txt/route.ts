/**
 * robots.txt Route Handler
 *
 * Next.js MetadataRoute.Robots 는 주석(#) 미지원. 다음 검색엔진 검증 토큰 등
 * 외부 도구가 요구하는 주석/특수 라인이 필요하므로 route handler 로 전환.
 *
 * 정책:
 *  - 모든 검색엔진·AI 봇 허용 (GEO/AEO 전략, docs/seo-keyword-map.md §9)
 *  - 기술 경로만 차단 (/api, /_next, *.json)
 *  - AdsBot-Google 명시 그룹 (Google 사양 — `*` 와일드카드 자동 제외)
 *  - Mediapartners-Google 명시 (AdSense 광고 미디어 봇)
 *  - Daum 웹마스터 도구 검증 토큰 주석으로 포함
 *
 * 참조:
 *  - https://developers.google.com/search/docs/crawling-indexing/robots/intro
 *  - https://developers.google.com/search/docs/crawling-indexing/robots/create-robots-txt
 */

// next.config.ts 의 output: 'export' 모드에서 route handler 도 정적 생성 필수.
export const dynamic = 'force-static';

const ROBOTS_TXT = `#DaumWebMasterTool:d65a9e7443b7bdfbbe7ab7116b497016204b0b38aad141180625241b8b1a58d4:mnbfnUfBcH3+tkC3lYI3ZA==

User-Agent: *
Allow: /
Disallow: /api/
Disallow: /_next/
Disallow: /*.json$

User-Agent: AdsBot-Google
Allow: /
Disallow: /api/

User-Agent: Mediapartners-Google
Allow: /

Sitemap: https://calculatorhost.com/sitemap.xml
`;

export function GET() {
  return new Response(ROBOTS_TXT, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=14400, must-revalidate',
    },
  });
}
