/**
 * RSS 2.0 피드 — 가이드 신규/업데이트 알림.
 * 아이템은 가이드 SSoT(GUIDES)에서 자동 생성 → 신규 발행 시 피드 자동 최신화.
 * (이전엔 하드코딩 목록이 2026-05 시점에 고정되어 신규 가이드가 누락됨)
 * 정적 export 호환 (force-static).
 */
import { GUIDES } from '@/app/guide/page';
import { guidesToFeedItems, buildRss } from '@/lib/feeds';

export const dynamic = 'force-static';

export function GET() {
  const rss = buildRss(guidesToFeedItems(GUIDES));
  return new Response(rss, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, must-revalidate',
    },
  });
}
