import type { ReactNode } from 'react';

interface EmbedShellProps {
  /** 위젯 본문 (계산기 클라이언트 컴포넌트) */
  children: ReactNode;
  /** 앵커 텍스트 키워드 (예: 양도소득세 계산기) */
  title: string;
  /** 출처 링크가 향할 정식 계산기 절대 URL */
  canonicalUrl: string;
}

/**
 * 임베드 위젯 공용 셸 — chrome-less 컨테이너 + 출처 링크.
 *
 * 모든 /embed/* 위젯 페이지가 재사용. Header/Sidebar/Footer/AdSlot 없음.
 * 하단 출처 링크는 사용자 클릭 유입 퍼널 역할(위젯을 본 방문자를 정식 페이지로 유도).
 */
export function EmbedShell({ children, title, canonicalUrl }: EmbedShellProps) {
  return (
    <main className="min-h-screen bg-bg-base px-3 py-4">
      <div className="mx-auto max-w-2xl">
        {children}
        <p className="mt-4 text-center text-xs text-text-tertiary">
          제공:{' '}
          <a
            href={canonicalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-primary-600 underline dark:text-primary-400"
          >
            {title} — calculatorhost.com
          </a>{' '}
          · 2026년 최신 세율 반영
        </p>
      </div>
    </main>
  );
}
