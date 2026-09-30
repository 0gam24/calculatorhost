'use client';

import Link from 'next/link';
import { SearchBox } from './SearchBox';

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border-base bg-bg-card">
      <nav
        aria-label="주요 메뉴"
        className="mx-auto flex min-h-16 max-w-6xl items-center gap-3 px-4 md:gap-8 md:px-8"
      >
        <Link
          href="/"
          aria-label="calculatorhost 홈"
          className="shrink-0 text-base font-bold tracking-tight text-primary-700 dark:text-primary-300"
        >
          <span className="sm:hidden">계산기</span>
          <span className="hidden sm:inline">
            calculatorhost<span className="text-primary-500">.</span>
          </span>
        </Link>
        <div className="min-w-0 flex-1">
          <SearchBox />
        </div>
        <Link
          href="/#all-calculators"
          className="inline-flex min-h-12 shrink-0 items-center text-sm font-medium text-text-secondary hover:text-primary-700"
        >
          <span className="sm:hidden">전체</span>
          <span className="hidden sm:inline">전체 계산기</span>
        </Link>
      </nav>
    </header>
  );
}
