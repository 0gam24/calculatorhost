'use client';

/**
 * 우측 Skyscraper 광고 컴포넌트 (AD-3, 300×600 sticky)
 *
 * 규칙:
 * - lg(1024px) 이상에서만 우측 사이드바로 sticky 고정
 * - 모바일/태블릿에서는 숨김 (lg:hidden)
 * - 라이트 배경 강제 (AdSense 정책)
 * - min-height 620px (vertical format CLS 방지)
 * - keyboard accessible
 *
 * 사용:
 * <SkyscraperAd slot="calculator-skyscraper" />
 *
 * 관련: docs/design-system.md §9 AD-3 Skyscraper
 */

import { AdSlot } from './AdSlot';
import { cn } from '@/lib/utils';

export interface SkyscraperAdProps {
  slot: string;
  className?: string;
}

export function SkyscraperAd({ slot, className }: SkyscraperAdProps) {
  return (
    <aside
      className={cn(
        // lg+ 데스크톱에만 표시
        'hidden lg:block',
        // 우측 사이드바 정위치
        'sticky top-20',
        // 가로 300px 고정, CLS 방지
        'w-[300px]',
        // 배경 라이트 카드
        'bg-white rounded-lg shadow-sm p-2',
        // 수직 스크롤 시에도 화면 내 유지
        'z-30',
        className
      )}
      aria-label="우측 광고 영역"
    >
      <AdSlot slot={slot} format="vertical" />
    </aside>
  );
}
