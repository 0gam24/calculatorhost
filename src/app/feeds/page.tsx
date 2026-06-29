import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { Footer } from '@/components/layout/Footer';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { buildBreadcrumbJsonLd, buildWebPageJsonLd } from '@/lib/seo/jsonld';

const URL = 'https://calculatorhost.com/feeds/';
const DATE_PUBLISHED = '2026-06-29';
const DATE_MODIFIED = '2026-06-29';

export const metadata: Metadata = {
  title: '피드 구독 — RSS · Atom · JSON Feed | calculatorhost',
  description:
    'calculatorhost의 새 가이드·계산기 업데이트를 RSS·Atom·JSON Feed로 구독하세요. RSS 리더 등록 방법과 AI·검색 엔진용 파일(llms.txt·robots.txt·사이트맵)도 함께 안내합니다.',
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '피드 구독 — RSS · Atom · JSON Feed' }],
    title: '피드 구독 — RSS · Atom · JSON Feed',
    description: '새 가이드·계산기 업데이트를 RSS·Atom·JSON Feed로 구독하세요.',
    url: URL,
    type: 'website',
    locale: 'ko_KR',
  },
  twitter: {
    card: 'summary_large_image',
    title: '피드 구독 — RSS · Atom · JSON Feed',
    description: 'RSS·Atom·JSON Feed 구독 안내',
  },
};

const FEEDS = [
  {
    href: '/feed.xml',
    label: 'RSS 2.0',
    desc: '가장 널리 쓰이는 표준. Feedly·Inoreader 등 대부분의 리더가 지원합니다.',
    type: 'application/rss+xml',
  },
  {
    href: '/atom.xml',
    label: 'Atom 1.0',
    desc: '엄격한 표준 포맷. NetNewsWire 등 일부 리더가 선호합니다.',
    type: 'application/atom+xml',
  },
  {
    href: '/feed.json',
    label: 'JSON Feed 1.1',
    desc: 'JSON 기반 모던 포맷. 개발·자동화·AI 도구 연동에 편리합니다.',
    type: 'application/feed+json',
  },
];

const ENGINE = [
  { href: '/llms.txt', label: 'llms.txt', desc: 'AI·LLM 검색/답변 엔진용 사이트 안내 파일.' },
  { href: '/sitemap.xml', label: 'sitemap.xml', desc: '검색 엔진 색인용 전체 페이지 목록.' },
  { href: '/robots.txt', label: 'robots.txt', desc: '크롤러 접근 정책 + 사이트맵 위치.' },
];

export default function FeedsPage() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '피드 구독' },
  ]);
  const webPageLd = buildWebPageJsonLd({
    name: '피드 구독 — RSS · Atom · JSON Feed',
    description:
      'calculatorhost의 새 가이드·계산기 업데이트를 구독하는 RSS·Atom·JSON Feed와 AI·검색 엔진용 파일 안내.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
  });

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageLd) }} />

      <div className="min-h-screen bg-bg-base">
        <Header />
        <div className="flex">
          <Sidebar />
          <main id="main-content" className="flex-1 px-4 py-8 md:px-8">
            <article className="mx-auto max-w-3xl space-y-8">
              <header>
                <Breadcrumb items={[{ name: '홈', href: '/' }, { name: '피드 구독' }]} />
                <h1 className="mb-3 mt-2 text-4xl font-bold tracking-tight">구독 · 피드</h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  calculatorhost의 새 가이드와 계산기 업데이트를 RSS·Atom·JSON Feed로 받아보세요. RSS 리더에 아래 주소를
                  등록하면 새 글이 올라올 때마다 자동으로 알림을 받습니다. 회원가입이나 이메일 입력은 필요하지 않습니다.
                </p>
              </header>

              <section className="space-y-4">
                <h2 className="border-b border-border-base pb-2 text-2xl font-bold">전체 피드</h2>
                <ul className="space-y-3">
                  {FEEDS.map((f) => (
                    <li key={f.href} className="rounded-lg border border-border-base bg-bg-card p-4">
                      <a
                        href={f.href}
                        type={f.type}
                        className="font-semibold text-primary-600 underline dark:text-primary-500"
                      >
                        {f.label} <span className="text-text-tertiary">— {f.href}</span>
                      </a>
                      <p className="mt-1 text-sm text-text-secondary">{f.desc}</p>
                    </li>
                  ))}
                </ul>
              </section>

              <section className="space-y-4">
                <h2 className="border-b border-border-base pb-2 text-2xl font-bold">AI · 검색 엔진</h2>
                <ul className="space-y-3">
                  {ENGINE.map((f) => (
                    <li key={f.href} className="rounded-lg border border-border-base bg-bg-card p-4">
                      <a href={f.href} className="font-semibold text-primary-600 underline dark:text-primary-500">
                        {f.label} <span className="text-text-tertiary">— {f.href}</span>
                      </a>
                      <p className="mt-1 text-sm text-text-secondary">{f.desc}</p>
                    </li>
                  ))}
                </ul>
              </section>

              <section className="space-y-4">
                <h2 className="border-b border-border-base pb-2 text-2xl font-bold">피드를 어떻게 쓰나요?</h2>
                <ol className="list-decimal space-y-2 pl-5 text-text-secondary">
                  <li>Feedly·Inoreader·NetNewsWire 등 RSS 리더 앱이나 서비스를 준비합니다.</li>
                  <li>리더의 “구독 추가”에 위 피드 주소(예: https://calculatorhost.com/feed.xml)를 붙여넣습니다.</li>
                  <li>새 가이드가 발행되면 리더가 자동으로 가져와 알려줍니다.</li>
                </ol>
                <p className="text-sm text-text-tertiary">
                  대부분의 브라우저·리더는 각 페이지 머리말의 자동 발견 링크로 피드를 인식합니다. 자세한 콘텐츠는{' '}
                  <Link href="/guide/" className="text-primary-600 underline dark:text-primary-500">
                    가이드 목록
                  </Link>
                  과{' '}
                  <Link href="/" className="text-primary-600 underline dark:text-primary-500">
                    홈
                  </Link>
                  에서 확인하세요.
                </p>
              </section>
            </article>
          </main>
        </div>
        <Footer />
      </div>
    </>
  );
}
