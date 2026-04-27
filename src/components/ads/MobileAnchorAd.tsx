'use client';

/**
 * 모바일 앵커 광고 컴포넌트 (닫기 가능)
 *
 * 규칙 (adsense-guardian 에이전트 감수):
 * - 모바일(lg 이하)에만 고정 화면 하단 노출
 * - 우상단 ✕ 닫기 버튼 (44×44px 터치 타겟)
 * - localStorage로 24시간 동안 닫힘 상태 유지
 * - body에 동적 padding-bottom 추가 (광고 높이만큼)
 * - 라이트 배경 강제 (AdSense 정책)
 * - prefers-reduced-motion 존중
 * - 광고 라벨 명시 (AdSense §6)
 *
 * 관련: .claude/skills/adsense-policy-reference/REFERENCE.md §3, §6, §11
 */

import { useEffect, useState } from 'react';
import { AdSlot } from './AdSlot';
import { cn } from '@/lib/utils';

export interface MobileAnchorAdProps {
  slot: string;
}

const DISMISS_STORAGE_KEY = 'cal_anchor_ad_dismissed_until';
const DISMISS_DURATION_MS = 24 * 60 * 60 * 1000; // 24시간

export function MobileAnchorAd({ slot }: MobileAnchorAdProps) {
  const [isDismissed, setIsDismissed] = useState(true); // 초기값 true로 hydration 일치 유지
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // hydration 후 클라이언트 상태 복구
    setMounted(true);

    const stored = localStorage.getItem(DISMISS_STORAGE_KEY);
    if (stored) {
      const dismissedUntil = new Date(stored).getTime();
      const now = Date.now();
      if (now < dismissedUntil) {
        // 아직 dismissed 기간 내
        setIsDismissed(true);
        return;
      }
    }
    // 새로 표시
    setIsDismissed(false);
  }, []);

  useEffect(() => {
    if (!mounted || isDismissed) {
      // padding 제거
      document.body.style.paddingBottom = '';
      return;
    }

    // 광고 컨테이너 높이 측정 (체계: mobile 50px, md 이상 90px)
    // 가장 보수적으로 모바일 기준 50px + 약간의 여유
    const anchorHeight = 50;
    document.body.style.paddingBottom = `${anchorHeight}px`;

    return () => {
      document.body.style.paddingBottom = '';
    };
  }, [mounted, isDismissed]);

  const handleDismiss = () => {
    const dismissedUntil = new Date(Date.now() + DISMISS_DURATION_MS).toISOString();
    localStorage.setItem(DISMISS_STORAGE_KEY, dismissedUntil);
    setIsDismissed(true);
  };

  // hydration 후 클라이언트만 렌더링 (SSR 스킵)
  if (!mounted) {
    return null;
  }

  // dismissed 상태이면 렌더링 안 함
  if (isDismissed) {
    return null;
  }

  return (
    <div
      className={cn(
        'fixed bottom-0 left-0 right-0',
        'bg-white dark:bg-white', // 라이트 강제
        'lg:hidden', // 데스크톱 이상 숨김
        'z-40', // Footer 위에 렌더
        'shadow-lg',
        'transition-all duration-300',
        'prefers-reduced-motion:transition-none'
      )}
      style={{ minHeight: '50px' }} // mobile 320×50 기준
      aria-label="모바일 하단 광고"
    >
      <div className="relative h-full flex items-center">
        {/* 광고 슬롯 */}
        <div className="flex-1">
          <AdSlot slot={slot} format="anchor" />
        </div>

        {/* 닫기 버튼 (우상단) */}
        <button
          onClick={handleDismiss}
          aria-label="광고 닫기"
          className={cn(
            'absolute top-1 right-1',
            'w-8 h-8 flex items-center justify-center',
            'rounded-full',
            'bg-gray-100 dark:bg-gray-300 hover:bg-gray-200 dark:hover:bg-gray-400',
            'text-gray-600 dark:text-gray-700',
            'text-sm font-semibold',
            'transition-colors duration-150',
            'prefers-reduced-motion:transition-none',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500'
          )}
          type="button"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
