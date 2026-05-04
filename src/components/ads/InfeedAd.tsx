'use client';

/**
 * 인피드 광고 컴포넌트 (AD-4, 반응형 fluid format)
 *
 * 규칙:
 * - 본문 단락 사이 중간 배치
 * - 반응형 fluid format (200~400px 높이 가변)
 * - 라이트 배경 강제 (AdSense 정책)
 * - min-height 280px (CLS 방지)
 * - 모바일·데스크톱 모두 노출
 * - 여백: 상하 space-4 (16px)
 *
 * 사용:
 * <InfeedAd slot="calculator-infeed" />
 *
 * 관련: docs/design-system.md §9 AD-4 Infeed
 */

import { AdSlot } from './AdSlot';
import { cn } from '@/lib/utils';

export interface InfeedAdProps {
  slot: string;
  className?: string;
}

export function InfeedAd({ slot, className }: InfeedAdProps) {
  return (
    <div
      className={cn(
        'my-6 md:my-8',
        // 라이트 배경 카드
        'bg-white rounded-lg shadow-sm p-3 md:p-4',
        className
      )}
      role="region"
      aria-label="본문 중간 광고"
    >
      <AdSlot slot={slot} format="fluid" />
    </div>
  );
}
