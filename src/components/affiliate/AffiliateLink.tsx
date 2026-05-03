/**
 * 어필리에이트 링크 (안전·합법·신뢰 3원칙)
 *
 * 1. **rel="sponsored nofollow noopener noreferrer"** — Google 정책 준수 (sponsored 명시)
 * 2. **표시광고법 준수** — "광고" 마이크로 라벨 시각적 표시 (공정위 가이드라인)
 * 3. **외부 origin** — target="_blank" + 클릭 추적 비활성 (개인정보 보호)
 *
 * AdSense 정책 100% 호환:
 * - 어필리에이트 링크와 광고를 명확히 구분 표시
 * - 회색지대 서비스(계정공유 등) 사용 금지 (별도 정책)
 *
 * 관련: https://support.google.com/adsense/answer/1346295 (정책)
 */

import type { ReactNode } from 'react';

export interface AffiliateLinkProps {
  /** 어필리에이트 URL (env var 에서 주입된 추적 코드 포함) */
  href: string;
  /** 링크 라벨 (사용자에게 표시) */
  children: ReactNode;
  /** 파트너명 — 마이크로 라벨에 표시 (예: "광고 · 삼쩜삼") */
  partner?: string;
  /** 추가 className (Tailwind) */
  className?: string;
  /** 라벨 위치 — 'inline'(같은 줄) 또는 'top'(위쪽) */
  labelPosition?: 'inline' | 'top';
}

export function AffiliateLink({
  href,
  children,
  partner,
  className = '',
  labelPosition = 'inline',
}: AffiliateLinkProps) {
  // href 가 비어있거나 placeholder 면 비활성 — 운영자 미가입 상태에서 빈 링크 방지
  if (!href || href.includes('YOUR_AFFILIATE') || href.length < 8) {
    return null;
  }

  const labelText = partner ? `광고 · ${partner}` : '광고';

  if (labelPosition === 'top') {
    return (
      <span className={`inline-flex flex-col gap-0.5 ${className}`}>
        <span className="text-[10px] font-medium uppercase tracking-wide text-text-tertiary">
          {labelText}
        </span>
        <a
          href={href}
          target="_blank"
          rel="sponsored nofollow noopener noreferrer"
          className="text-primary-700 underline hover:text-primary-500 dark:text-primary-300"
        >
          {children}
        </a>
      </span>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="sponsored nofollow noopener noreferrer"
      className={`inline-flex items-center gap-1.5 text-primary-700 underline hover:text-primary-500 dark:text-primary-300 ${className}`}
    >
      {children}
      <span className="rounded bg-text-tertiary/15 px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide text-text-tertiary">
        {labelText}
      </span>
    </a>
  );
}
