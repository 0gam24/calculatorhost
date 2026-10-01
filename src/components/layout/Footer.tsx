import Link from 'next/link';
import { ThemeToggle } from './ThemeToggle';
import { MainBackrefBox } from '@/components/network/MainBackrefBox';

export function Footer() {
  const links = [
    ['/guide/', '계산·생활정보'],
    ['/updates/', '변경 이력'],
    ['/about/', '소개'],
    ['/privacy/', '개인정보처리방침'],
    ['/terms/', '이용약관'],
    ['/contact/', '문의'],
  ] as const;
  return (
    <footer className="mt-10 border-t border-border-base bg-bg-card">
      <div className="mx-auto max-w-6xl px-4 py-7 md:px-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Link href="/" className="font-semibold">
            calculatorhost.
          </Link>
          <div className="flex items-center gap-2 text-sm text-text-secondary">
            <span>화면 테마</span>
            <ThemeToggle />
          </div>
        </div>
        <nav
          aria-label="사이트 정보"
          className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-text-secondary"
        >
          {links.map(([href, label]) => (
            <Link
              key={href}
              href={href}
              className="inline-flex min-h-12 items-center hover:text-primary-700 focus-visible:rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 dark:hover:text-primary-300"
            >
              {label}
            </Link>
          ))}
        </nav>
        <p className="mt-4 max-w-3xl text-sm text-text-tertiary">
          계산 결과는 입력한 조건에 따른 참고값입니다. 실제 세금·금융 거래는 담당 기관에 확인하세요.
        </p>
        <details className="mt-4 text-sm text-text-tertiary">
          <summary className="cursor-pointer">피드 · 추가 정보</summary>
          <div className="mt-3 flex flex-wrap gap-4">
            <Link href="/feeds/">RSS·Atom·JSON 피드</Link>
            <Link href="/glossary/">용어사전</Link>
            <Link href="/affiliate-disclosure/">어필리에이트 공시</Link>
            <Link href="/guide/tax-calendar-2026/">2026 세금 캘린더</Link>
          </div>
          <div className="mt-4">
            <MainBackrefBox variant="footer" />
          </div>
        </details>
        <p className="mt-5 text-xs text-text-tertiary">
          운영: 스마트데이터샵 · 대표 김준혁 · 사업자등록번호 406-06-34485
        </p>
        <p className="mt-1 text-xs text-text-tertiary">
          © {new Date().getFullYear()} calculatorhost · 스마트데이터샵.
        </p>
      </div>
    </footer>
  );
}
