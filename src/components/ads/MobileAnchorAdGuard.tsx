'use client';

/**
 * 모바일 앵커 광고 라우트 가드 (AdSense 정책 준수)
 *
 * 정책 페이지(/privacy, /terms, /contact, /about)에서는 광고 비활성화
 * AdSense 정책 §3 — 정책·약관 페이지는 광고 배치 금지 (유저 신뢰도 저하 우려)
 *
 * 관련: .claude/skills/adsense-policy-reference/REFERENCE.md §3
 *       src/app/layout.tsx 에서 import 필요
 */

import { usePathname } from 'next/navigation';
import { MobileAnchorAd } from './MobileAnchorAd';

const LEGAL_PAGES = ['/privacy', '/terms', '/contact', '/about'];

export function MobileAnchorAdGuard() {
  const pathname = usePathname();

  // 정책 페이지인지 확인 (정확한 매칭만, 서브 경로 무관)
  const isLegalPage = LEGAL_PAGES.some((page) => pathname === page || pathname === `${page}/`);

  // 임베드 위젯(/embed/*)은 외부 사이트 iframe 내부로 배포되므로 광고 금지.
  // AdSense 정책: 게시자 소유가 아닌 도메인의 iframe 안에서 광고 노출 = 무효 트래픽·정책 위반 위험.
  const isEmbed = pathname?.startsWith('/embed/') ?? false;

  // 정책 페이지·임베드 위젯이면 광고 렌더 안 함
  if (isLegalPage || isEmbed) {
    return null;
  }

  return <MobileAnchorAd slot="mobile-anchor-default" />;
}
