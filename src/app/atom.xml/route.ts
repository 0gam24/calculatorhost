/**
 * Atom 1.0 피드 — 가이드 SSoT(GUIDES) 기반 자동 생성.
 * 정적 export 호환 (force-static).
 */
import { GUIDES } from '@/app/guide/page';
import { guidesToFeedItems, buildAtom } from '@/lib/feeds';

export const dynamic = 'force-static';

export function GET() {
  return new Response(buildAtom(guidesToFeedItems(GUIDES)), {
    headers: {
      'Content-Type': 'application/atom+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, must-revalidate',
    },
  });
}
