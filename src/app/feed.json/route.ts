/**
 * JSON Feed 1.1 — 가이드 SSoT(GUIDES) 기반.
 * JSON 기반 모던 포맷으로 LLM·자동화 도구 연동에 친화적.
 * robots.txt 의 /*.json$ 차단을 Allow: /feed.json 으로 예외 처리함.
 * 정적 export 호환 (force-static).
 */
import { GUIDES } from '@/app/guide/page';
import { guidesToFeedItems, buildJsonFeed } from '@/lib/feeds';

export const dynamic = 'force-static';

export function GET() {
  return new Response(buildJsonFeed(guidesToFeedItems(GUIDES)), {
    headers: {
      'Content-Type': 'application/feed+json; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, must-revalidate',
    },
  });
}
