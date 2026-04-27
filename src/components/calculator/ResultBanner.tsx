import type { ReactNode } from 'react';

interface ResultBannerProps {
  year?: number;
  note?: ReactNode;
}

export function ResultBanner({ year = 2026, note }: ResultBannerProps) {
  return (
    <div
      role="note"
      className="mt-4 flex items-start gap-2 rounded-lg border border-border-base bg-bg-card px-4 py-2 text-xs text-text-secondary sm:text-sm"
    >
      <svg
        className="mt-0.5 h-4 w-4 flex-shrink-0"
        viewBox="0 0 16 16"
        fill="none"
        aria-hidden="true"
      >
        <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
        <path
          d="M8 7v4M8 5v.01"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
      <p>
        <strong>{year}년 세율·요율 기준</strong> · 참고용입니다. 실제 납부액과 차이가 있을 수 있습니다.
        {note ? <> {note}</> : null}
      </p>
    </div>
  );
}
