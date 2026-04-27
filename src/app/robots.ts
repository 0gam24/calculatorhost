import type { MetadataRoute } from 'next';

// next.config.ts 의 output: 'export' 모드에서 route handler 도 정적 생성 필수.
export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // 일반 검색 봇 (Googlebot, Bingbot, NaverBot 등)
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',          // Pages Functions 프록시 — 색인 X
          '/*.json$',       // 데이터 파일
          '/_next/',        // Next.js 내부 자산
        ],
      },
      // Google AdsBot — 광고 페이지 품질 평가용 (광고 슬롯 페이지 모두 허용)
      {
        userAgent: 'AdsBot-Google',
        allow: '/',
        disallow: ['/api/'],
      },
      // Google 이미지 검색 — public/fonts 같은 자산은 색인 X
      {
        userAgent: 'Googlebot-Image',
        allow: '/',
        disallow: ['/fonts/', '/api/'],
      },
      // 적극 차단할 악성 스크래퍼 (필요 시 확장)
      {
        userAgent: ['SemrushBot', 'AhrefsBot', 'MJ12bot', 'DotBot'],
        disallow: '/',
      },
    ],
    sitemap: 'https://calculatorhost.com/sitemap.xml',
    host: 'https://calculatorhost.com',
  };
}
