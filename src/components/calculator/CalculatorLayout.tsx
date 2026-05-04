import { ReactNode } from 'react';
import { SkyscraperAd } from '@/components/ads/SkyscraperAd';
import { cn } from '@/lib/utils';

/**
 * 계산기 페이지 공통 레이아웃 (grid: 본문 + 우측 sticky 광고)
 *
 * 구조:
 * - 모바일/태블릿(lg 미만): flex 단일 열 (본문만)
 * - lg+: grid-cols-[1fr_300px] → 본문 + 우측 sticky 광고 (AD-3)
 * - CLS 방지: 광고 영역 min-height 고정
 *
 * 사용:
 * <CalculatorLayout
 *   mainContent={<div>본문 내용</div>}
 *   skyscraperSlot="calculator-skyscraper"
 * />
 *
 * 관련: docs/design-system.md §9 광고 배치 아키텍처
 */

export interface CalculatorLayoutProps {
  mainContent: ReactNode;
  skyscraperSlot?: string;
  className?: string;
}

export function CalculatorLayout({
  mainContent,
  skyscraperSlot = 'calculator-skyscraper-default',
  className,
}: CalculatorLayoutProps) {
  return (
    <div className={cn('flex flex-col lg:grid lg:grid-cols-[1fr_300px] gap-6', className)}>
      {/* 메인 콘텐츠 (본문) */}
      <div className="flex-1 min-w-0">{mainContent}</div>

      {/* 우측 sticky 광고 (AD-3 Skyscraper, lg+ 데스크톱만) */}
      <SkyscraperAd slot={skyscraperSlot} />
    </div>
  );
}
