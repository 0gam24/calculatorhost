'use client';

import { useEffect, useState } from 'react';

// Kakao SDK 전역 타입 (sdk.kakao.com/v2 또는 v1 호환)
declare global {
  interface Window {
    Kakao?: {
      isInitialized?: () => boolean;
      init?: (key: string) => void;
      Share?: {
        sendDefault: (options: Record<string, unknown>) => void;
      };
      Link?: {
        sendDefault: (options: Record<string, unknown>) => void;
      };
    };
  }
}

interface ShareButtonsProps {
  /** 공유될 페이지 제목 (계산기명 또는 가이드 제목) */
  title: string;
  /** 공유될 페이지 URL (절대 경로). 미지정 시 현재 location 사용 */
  url?: string;
  /** 공유 텍스트 (선택) */
  description?: string;
  /** OG 이미지 절대 URL (선택). 미지정 시 자동 추정. */
  imageUrl?: string;
}

const KAKAO_SDK_URL = 'https://t1.kakaocdn.net/kakao_js_sdk/2.7.4/kakao.min.js';
const KAKAO_SDK_INTEGRITY = 'sha384-DKYJZ8NLiK8MN4/C5P2dtSmLQ4KwPaoqAfyA/DfmEc1VDxu4yyC7wy6K1Hs90nka';

/**
 * SNS 공유 버튼 모음
 *
 * 지원 채널: 카카오톡(SDK), X/Twitter, 페이스북, 링크 복사, Web Share API
 * - 카카오톡 SDK: NEXT_PUBLIC_KAKAO_JS_KEY 환경변수 있을 때 동적 로드 + 초기화
 * - SDK 미설정 시 Web Share API → 링크 복사 순으로 fallback
 * - 정적 export 환경 호환 (모두 런타임 동작)
 */
export function ShareButtons({ title, url, description, imageUrl }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [kakaoReady, setKakaoReady] = useState(false);
  const kakaoKey = process.env.NEXT_PUBLIC_KAKAO_JS_KEY;

  // Kakao SDK 동적 로드 (key 가 설정된 경우만)
  useEffect(() => {
    if (!kakaoKey) return;
    if (typeof window === 'undefined') return;

    // 이미 로드된 경우
    if (window.Kakao && window.Kakao.isInitialized?.()) {
      setKakaoReady(true);
      return;
    }

    // 스크립트 중복 로드 방지
    let script = document.querySelector<HTMLScriptElement>(`script[src="${KAKAO_SDK_URL}"]`);
    if (!script) {
      script = document.createElement('script');
      script.src = KAKAO_SDK_URL;
      script.integrity = KAKAO_SDK_INTEGRITY;
      script.crossOrigin = 'anonymous';
      script.async = true;
      document.head.appendChild(script);
    }

    const handleLoad = () => {
      try {
        if (window.Kakao && !window.Kakao.isInitialized?.()) {
          window.Kakao.init?.(kakaoKey);
        }
        setKakaoReady(true);
      } catch {
        setKakaoReady(false);
      }
    };

    if (window.Kakao) {
      handleLoad();
    } else {
      script.addEventListener('load', handleLoad, { once: true });
      script.addEventListener('error', () => setKakaoReady(false), { once: true });
    }
  }, [kakaoKey]);

  const getCurrentUrl = () =>
    url ?? (typeof window !== 'undefined' ? window.location.href : '');

  const getImageUrl = () => {
    if (imageUrl) return imageUrl;
    // 페이지 OG 이미지 자동 추정 (Next.js opengraph-image 컨벤션)
    if (typeof window === 'undefined') return 'https://calculatorhost.com/og-default.png';
    const path = window.location.pathname.replace(/\/$/, '');
    return path
      ? `${window.location.origin}${path}/opengraph-image.png`
      : `${window.location.origin}/og-default.png`;
  };

  const handleKakaoShare = () => {
    const shareUrl = getCurrentUrl();
    if (!kakaoReady || !window.Kakao?.Share?.sendDefault) {
      // SDK 미로드 또는 초기화 실패 시 Web Share API fallback
      handleNativeShare();
      return;
    }
    try {
      window.Kakao.Share.sendDefault({
        objectType: 'feed',
        content: {
          title,
          description: description ?? '2026년 최신 세율 반영 계산기 — calculatorhost',
          imageUrl: getImageUrl(),
          link: { mobileWebUrl: shareUrl, webUrl: shareUrl },
        },
        buttons: [
          {
            title: '계산기 열기',
            link: { mobileWebUrl: shareUrl, webUrl: shareUrl },
          },
        ],
      });
    } catch {
      handleNativeShare();
    }
  };

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
        {kakaoKey ? (
          <button
            type="button"
            onClick={handleKakaoShare}
            aria-label="카카오톡으로 공유"
            disabled={!kakaoReady}
            className="rounded-lg border border-[#FEE500] bg-[#FEE500] px-4 py-2 text-sm font-medium text-[#191919] hover:opacity-90 disabled:opacity-50 transition-opacity"
          >
            💬 카카오톡 공유
          </button>
        ) : null}
        <button
          type="button"
          onClick={handleNativeShare}
          aria-label="공유 (네이티브)"
          className="rounded-lg border border-border-base bg-bg-card px-4 py-2 text-sm font-medium hover:border-primary-500 hover:text-primary-500 transition-colors"
        >
          📤 공유 (메일·메신저)
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
