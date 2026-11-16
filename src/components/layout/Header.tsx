'use client';

import Link from 'next/link';
import { SearchBox } from './SearchBox';

// 분야별 허브로 가는 구조화된 메뉴 (네이버 FAQ 12-04 서브링크: GNB 로 주요 섹션을 알려 준다).
// 링크 글자는 가리키는 페이지를 설명하는 말로 (네이버 07-03 앵커 텍스트)
const SECTIONS = [
  { href: '/category/tax/', label: '세금 계산기' },
  { href: '/category/work/', label: '근로 계산기' },
  { href: '/category/finance/', label: '금융 계산기' },
  { href: '/category/real-estate/', label: '부동산 계산기' },
  { href: '/category/lifestyle/', label: '생활 계산기' },
  { href: '/guide/', label: '가이드' },
] as const;

export function Header() {
  return (
    <>
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
            {/* 휴대폰은 "계산기", 넓은 화면은 "calculatorhost." 로 보인다. 링크 이름은 aria-label.
              CSS 를 읽지 않는 수집기에 두 글자가 붙어 읽히지 않도록 사이에 공백을 둔다 */}
            <span className="sm:hidden" aria-hidden="true" data-nosnippet>
              계산기
            </span>{' '}
            <span className="hidden sm:inline" data-nosnippet>
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
            전체<span className="hidden sm:inline"> 계산기</span>
          </Link>
        </nav>
      </header>
      {/* 고정 머리글 아래에서 같이 스크롤되는 한 줄. 휴대폰은 가로로 밀어서 본다 */}
      <nav aria-label="분야별 메뉴" className="border-b border-border-base bg-bg-card">
        <div className="mx-auto flex max-w-6xl gap-1 overflow-x-auto px-2 md:px-6">
          {SECTIONS.map((section) => (
            <Link
              key={section.href}
              href={section.href}
              className="inline-flex min-h-10 shrink-0 items-center whitespace-nowrap rounded-md px-2 text-sm text-text-secondary hover:text-primary-700"
            >
              {section.label}
            </Link>
          ))}
        </div>
      </nav>
    </>
  );
}
