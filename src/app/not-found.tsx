import Link from 'next/link';
import type { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Sidebar } from '@/components/layout/Sidebar';

export const metadata: Metadata = {
  title: '페이지를 찾을 수 없습니다 (404) | calculatorhost',
  description:
    '요청한 페이지가 존재하지 않거나 이동·변경되었습니다. 근로·세금·금융·부동산·생활 카테고리에서 원하는 계산기를 빠르게 찾아보세요.',
  robots: { index: false, follow: false },
};

const CATEGORIES = [
  { href: '/category/work/', label: '근로 계산기', desc: '연봉·퇴직금·실수령액' },
  { href: '/category/tax/', label: '세금 계산기', desc: '양도세·취득세·재산세·종부세' },
  { href: '/category/finance/', label: '금융 계산기', desc: '대출·예금·적금·환율·은퇴자금' },
  { href: '/category/real-estate/', label: '부동산 계산기', desc: '중개수수료·평수·청약가점·임대수익률' },
  { href: '/category/lifestyle/', label: '생활 계산기', desc: 'BMI·D-day·자동차세' },
];

const POPULAR = [
  { href: '/calculator/salary/', label: '연봉 실수령액 계산기' },
  { href: '/calculator/capital-gains-tax/', label: '양도소득세 계산기' },
  { href: '/calculator/loan/', label: '대출이자 계산기' },
  { href: '/calculator/loan-limit/', label: '대출한도 (DSR/LTV) 계산기' },
  { href: '/calculator/acquisition-tax/', label: '취득세 계산기' },
  { href: '/calculator/severance/', label: '퇴직금 계산기' },
];

export default function NotFound() {
  return (
    <div className="min-h-screen bg-bg-base">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 px-4 py-12 md:px-8">
          <article className="mx-auto max-w-4xl space-y-10">
            <header>
              <p className="mb-2 text-caption uppercase tracking-wide text-text-tertiary">
                ERROR 404
              </p>
              <h1
                className="mb-3 text-4xl font-bold tracking-tight lg:text-5xl"
                style={{ letterSpacing: '-0.02em' }}
              >
                페이지를 찾을 수 없습니다
              </h1>
              <p className="text-lg text-text-secondary">
                요청한 주소가 존재하지 않거나 이동·변경되었을 수 있습니다.
                아래 카테고리에서 원하는 계산기를 찾아보세요.
              </p>
            </header>

            <section>
              <h2 className="mb-4 text-xl font-semibold">카테고리에서 찾기</h2>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {CATEGORIES.map((cat) => (
                  <Link
                    key={cat.href}
                    href={cat.href}
                    className="card transition-transform hover:-translate-y-0.5"
                  >
                    <div className="flex flex-col gap-1">
                      <span className="font-semibold text-text-primary">{cat.label}</span>
                      <span className="text-caption text-text-tertiary">{cat.desc}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </section>

            <section>
              <h2 className="mb-4 text-xl font-semibold">인기 계산기</h2>
              <ul className="grid gap-2 sm:grid-cols-2">
                {POPULAR.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="block rounded-2xl border border-border-base bg-bg-card px-4 py-3 text-text-primary transition-colors hover:border-primary-500 hover:text-primary-500"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-semibold">다른 방법으로 찾기</h2>
              <p className="text-text-secondary">
                헤더 상단의 검색창에 계산기 이름을 입력하면 즉시 자동완성됩니다.
                또는{' '}
                <Link href="/" className="text-primary-500 underline-offset-4 hover:underline">
                  홈
                </Link>
                으로 돌아가 전체 30개 계산기 목록을 확인하세요.
              </p>
            </section>
          </article>
        </main>
      </div>
      <Footer />
    </div>
  );
}
