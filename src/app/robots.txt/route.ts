/**
 * robots.txt Route Handler
 *
 * Next.js MetadataRoute.Robots 는 주석(#) 미지원. 다음 검색엔진 검증 토큰 등
 * 외부 도구가 요구하는 주석/특수 라인이 필요하므로 route handler 로 전환.
 *
 * 정책:
 *  - 모든 검색엔진·AI 봇 허용 (GEO/AEO 전략, docs/seo-keyword-map.md §9)
 *  - 기술 경로만 차단 (/api, *.json)
 *  - 옛 WordPress 주소는 막지 않는다. 지운 페이지를 robots.txt 로 막으면 로봇이 404 를
 *    확인하지 못해 검색에서 빠지지 않는다 (네이버 가이드 01-05 웹 사이트 이전, 12-03 웹 검색 제외)
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
Allow: /network-mirror.json
Allow: /feed.json
Disallow: /api/
Disallow: /*.json$
Allow: /_next/static/
Allow: /_next/image

User-Agent: AdsBot-Google
Allow: /
Disallow: /api/

User-Agent: Mediapartners-Google
Allow: /

# ─── AI 검색·답변 엔진 봇 — 명시 허용 (인용 + AI 검색 트래픽 유입) ───
# 정책 근거: AdSense 호환 + GEO/AEO 인용 가치 > 학습 부담
User-Agent: GPTBot
Allow: /
Disallow: /api/

User-Agent: ChatGPT-User
Allow: /

User-Agent: OAI-SearchBot
Allow: /

User-Agent: ClaudeBot
Allow: /
Disallow: /api/

User-Agent: Claude-Web
Allow: /

User-Agent: Claude-User
Allow: /

User-Agent: Claude-SearchBot
Allow: /

User-Agent: anthropic-ai
Allow: /

User-Agent: PerplexityBot
Allow: /
Disallow: /api/

User-Agent: Perplexity-User
Allow: /

User-Agent: Google-Extended
Allow: /
Disallow: /api/

User-Agent: Applebot-Extended
Allow: /

# ─── 학습 전용·고비용 스크레이퍼 — 차단 ───
# 인용·트래픽 유입 가치 적음 + 콘텐츠 무단 학습 방지
User-Agent: CCBot
Disallow: /

User-Agent: Bytespider
Disallow: /

User-Agent: Meta-ExternalAgent
Disallow: /

User-Agent: FacebookBot
Disallow: /

User-Agent: Amazonbot
Disallow: /

User-Agent: cohere-ai
Disallow: /

User-Agent: Diffbot
Disallow: /

User-Agent: ImagesiftBot
Disallow: /

User-Agent: Omgili
Disallow: /

User-Agent: omgilibot
Disallow: /

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
