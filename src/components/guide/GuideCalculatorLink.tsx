'use client';

import type { ReactNode } from 'react';
import Link from 'next/link';
import type { CalculatorSlug } from '@/lib/analytics/calculator-events';
import {
  getGuideCalculatorHref,
  trackGuideCalculatorOpen,
  type GuideSource,
} from '@/lib/analytics/guide-events';

interface GuideCalculatorLinkProps {
  source: GuideSource;
  target: CalculatorSlug;
  children: ReactNode;
}

/** Crawlable navigation; only an explicit click records the fixed source and target. */
export function GuideCalculatorLink({ source, target, children }: GuideCalculatorLinkProps) {
  const href = getGuideCalculatorHref(source, target);
  if (!href) return null;

  return (
    <Link
      href={href}
      data-guide-source={source}
      data-calculator-target={target}
      onClick={() => trackGuideCalculatorOpen(source, target)}
      className="flex min-h-12 items-center justify-between gap-3 rounded-chip border border-border-base bg-bg-card px-4 py-3 font-semibold text-primary-600 hover:border-primary-500 hover:bg-primary-500/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 dark:text-primary-300"
    >
      <span>{children}</span>
      <span aria-hidden="true">→</span>
    </Link>
  );
}
