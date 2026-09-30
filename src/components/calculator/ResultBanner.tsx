import type { ReactNode } from 'react';

interface ResultBannerProps {
  year?: number;
  note?: ReactNode;
}

export function ResultBanner({ year = 2026, note }: ResultBannerProps) {
  return (
    <div
      role="note"
      className="col-span-full flex items-start gap-2 px-1 py-2 text-xs leading-relaxed text-text-secondary"
    >
      <svg
        className="mt-0.5 h-4 w-4 flex-shrink-0"
        viewBox="0 0 16 16"
        fill="none"
        aria-hidden="true"
      >
        <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
        <path d="M8 7v4M8 5v.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
      <p>
        <strong>{year}년 입력 조건 기준</strong> · 예상 결과입니다. 적용 기준과 가정은 아래 계산
        기준에서 확인하세요.
        {note ? <> {note}</> : null}
      </p>
    </div>
  );
}
