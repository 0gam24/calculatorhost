'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ThemeToggle } from './ThemeToggle';
import { SearchBox } from './SearchBox';
import { MobileDrawer } from './MobileDrawer';

function HamburgerIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );
}

function CalculatorLogoIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="4" y="2" width="16" height="20" rx="2" />
      <line x1="8" x2="16" y1="6" y2="6" />
      <line x1="8" x2="8" y1="10" y2="10" />
      <line x1="12" x2="12" y1="10" y2="10" />
      <line x1="16" x2="16" y1="10" y2="10" />
      <line x1="8" x2="8" y1="14" y2="14" />
      <line x1="12" x2="12" y1="14" y2="14" />
      <line x1="16" x2="16" y1="14" y2="14" />
      <line x1="8" x2="8" y1="18" y2="18" />
      <line x1="12" x2="12" y1="18" y2="18" />
      <line x1="16" x2="16" y1="18" y2="18" />
    </svg>
  );
}

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 bg-bg-base/95 backdrop-blur-sm border-b border-border-subtle">
        <div className="mx-auto flex h-18 items-center justify-between gap-6 px-4 md:px-8">
          {/* 좌측: 모바일 햄버거 + 로고 (모든 브레이크포인트에서 노출). */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="inline-flex md:hidden items-center justify-center h-10 w-10 rounded-lg text-text-secondary hover:bg-bg-raised transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base"
              aria-label="메뉴"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-drawer"
            >
              <HamburgerIcon />
            </button>
          <Link
            href="/"
            className="flex items-center gap-2.5 shrink-0"
          >
            <span className="inline-flex h-10 w-10 rounded-xl bg-primary-500/15 text-primary-500 items-center justify-center shrink-0">
              <CalculatorLogoIcon />
            </span>
            <span className="hidden sm:flex flex-col leading-tight">
              <span className="font-bold text-base text-text-primary">calculatorhost</span>
              <span className="text-caption text-text-tertiary">계산기 · 2026년 한국 세율 반영</span>
            </span>
          </Link>
        </div>

        {/* 중앙: 검색창 — 항상 중앙. 모바일에선 컴팩트하게. */}
        <div className="flex flex-1 justify-center px-2 md:px-6">
          <div className="w-full max-w-xl">
            <SearchBox />
          </div>
        </div>

        {/* 우측: 테마 토글 */}
        <div className="flex items-center gap-2 shrink-0">
          <ThemeToggle />
        </div>
      </div>
    </header>
      <MobileDrawer isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
    </>
  );
}
