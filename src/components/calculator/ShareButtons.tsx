'use client';

import { useState } from 'react';

interface ShareButtonsProps {
  /** 공유될 페이지 제목 (계산기명 또는 가이드 제목) */
  title: string;
  /** 공유될 페이지 URL (절대 경로). 미지정 시 현재 location 사용 */
  url?: string;
  /** 공유 텍스트 (선택) */
  description?: string;
}

/**
 * SNS 공유 버튼 모음
 *
 * 지원 채널: 카카오톡(웹공유 fallback), X/Twitter, 페이스북, 링크 복사
 * - 카카오톡 SDK 미설치 환경에서는 Web Share API 또는 링크 복사로 fallback
 * - 정적 export 환경에서도 동작 (런타임 only)
 */
export function ShareButtons({ title, url, description }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getCurrentUrl = () =>
    url ?? (typeof window !== 'undefined' ? window.location.href : '');

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(getCurrentUrl());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setError('링크 복사 실패');
      setTimeout(() => setError(null), 2000);
    }
  };

  const handleNativeShare = async () => {
    const shareUrl = getCurrentUrl();
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title,
          text: description ?? title,
          url: shareUrl,
        });
      } catch {
        // 사용자 취소 — 무시
      }
    } else {
      handleCopy();
    }
  };

  const handleTwitterShare = () => {
    const shareUrl = getCurrentUrl();
    const text = encodeURIComponent(`${title} | calculatorhost`);
    const u = encodeURIComponent(shareUrl);
    window.open(
      `https://twitter.com/intent/tweet?text=${text}&url=${u}`,
      '_blank',
      'noopener,noreferrer,width=550,height=420'
    );
  };

  const handleFacebookShare = () => {
    const shareUrl = getCurrentUrl();
    const u = encodeURIComponent(shareUrl);
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${u}`,
      '_blank',
      'noopener,noreferrer,width=600,height=400'
    );
  };

  return (
    <section
      aria-label="이 페이지 공유"
      className="card flex flex-col gap-3"
    >
      <h2 className="text-base font-semibold">이 페이지 공유</h2>
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={handleNativeShare}
          aria-label="카카오톡 등 공유"
          className="rounded-lg border border-border-base bg-bg-card px-4 py-2 text-sm font-medium hover:border-primary-500 hover:text-primary-500 transition-colors"
        >
          💬 공유 (카톡·메일 등)
        </button>
        <button
          type="button"
          onClick={handleTwitterShare}
          aria-label="X(Twitter)에 공유"
          className="rounded-lg border border-border-base bg-bg-card px-4 py-2 text-sm font-medium hover:border-primary-500 hover:text-primary-500 transition-colors"
        >
          𝕏 X (Twitter)
        </button>
        <button
          type="button"
          onClick={handleFacebookShare}
          aria-label="Facebook 에 공유"
          className="rounded-lg border border-border-base bg-bg-card px-4 py-2 text-sm font-medium hover:border-primary-500 hover:text-primary-500 transition-colors"
        >
          📘 Facebook
        </button>
        <button
          type="button"
          onClick={handleCopy}
          aria-label="링크 복사"
          className="rounded-lg border border-border-base bg-bg-card px-4 py-2 text-sm font-medium hover:border-primary-500 hover:text-primary-500 transition-colors"
        >
          {copied ? '✓ 복사됨' : '🔗 링크 복사'}
        </button>
      </div>
      {error && <p className="text-caption text-danger-500">{error}</p>}
      <p className="text-caption text-text-tertiary">
        도움이 되셨다면 친구에게 공유해주세요. 더 많은 분이 정확한 계산기를 찾을 수 있도록.
      </p>
    </section>
  );
}
