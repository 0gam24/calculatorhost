'use client';

import { useState, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

export function CalculatorDetails({
  title = '내 조건 더 설정',
  summary,
  children,
  className,
  lazy = false,
}: {
  title?: string;
  summary?: string;
  children: ReactNode;
  className?: string;
  lazy?: boolean;
}) {
  const [open, setOpen] = useState(false);
  return (
    <details
      onToggle={(event) => setOpen(event.currentTarget.open)}
      className={cn('group rounded-xl border border-border-base bg-bg-card', className)}
    >
      <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-3 px-4 py-3 text-sm font-semibold text-text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary-500">
        <span>
          {title}
          {summary ? (
            <span className="mt-1 block text-xs font-normal text-text-secondary">{summary}</span>
          ) : null}
        </span>
        <span
          aria-hidden="true"
          className="text-lg text-text-secondary transition-transform group-open:rotate-45"
        >
          +
        </span>
      </summary>
      <div className="flex flex-col gap-5 border-t border-border-subtle p-4">
        {!lazy || open ? children : null}
      </div>
    </details>
  );
}
