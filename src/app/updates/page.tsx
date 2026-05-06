import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { Footer } from '@/components/layout/Footer';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import {
  buildBreadcrumbJsonLd,
  buildWebPageJsonLd,
  buildArticleJsonLd,
  buildItemListJsonLd,
} from '@/lib/seo/jsonld';
import { UPDATES_LOG, type UpdateCategory } from '@/lib/constants/updates-log';

const URL = 'https://calculatorhost.com/updates/';
const PAGE_TITLE = '변경 이력 (Changelog) — 2026년 calculatorhost 업데이트';

export const metadata: Metadata = {
  title: '변경 이력 (Changelog) 2026 | calculatorhost',
  description:
    '2026년 calculatorhost 계산기·세율·금리·규제 변경 이력 실시간 업데이트. 신규 계산기 추가, 세법 개정, 금감원 규제, 금리 변동 등 모든 이력을 시계열로 확인하세요.',
  alternates: { canonical: URL },
  openGraph: {
    title: PAGE_TITLE,
    description:
      '2026년 calculatorhost 모든 변경 이력 — 신규·세율·규제·금리·제도 카테고리별 시계열 업데이트',
    url: URL,
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: '변경 이력 (Changelog) 2026',
    description: '2026년 계산기·세율·규제 변경 이력 실시간 추적',
  },
};

const CATEGORY_STYLES: Record<UpdateCategory, string> = {
  '신규': 'bg-primary-500/10 text-primary-700 dark:text-primary-300 border-primary-500/30',
  '세율': 'bg-secondary-500/10 text-secondary-600 border-secondary-500/30',
  '규제': 'bg-danger-500/10 text-danger-700 dark:text-danger-300 border-danger-500/30',
  '금리': 'bg-highlight-500/10 text-highlight-500 border-highlight-500/30',
  '제도': 'bg-secondary-500/10 text-secondary-600 border-secondary-500/30',
  '버그수정': 'bg-bg-card text-text-secondary border-border-base',
};

// 월별 그룹화 (시계열 내림차순)
function groupByMonth() {
  const groups = new Map<string, typeof UPDATES_LOG>();
  for (const entry of UPDATES_LOG) {
    const month = entry.date.slice(0, 7); // YYYY-MM
    if (!groups.has(month)) groups.set(month, []);
    groups.get(month)!.push(entry);
  }
  return Array.from(groups.entries()).sort((a, b) => b[0].localeCompare(a[0]));
}

// 카테고리별 카운트 (요약)
function categoryStats() {
  const counts = new Map<UpdateCategory, number>();
  for (const entry of UPDATES_LOG) {
    counts.set(entry.category, (counts.get(entry.category) ?? 0) + 1);
  }
  return Array.from(counts.entries()).sort((a, b) => b[1] - a[1]);
}

export default function UpdatesPage() {
  const monthGroups = groupByMonth();
  const stats = categoryStats();
  const lastModified = UPDATES_LOG[0]?.date ?? new Date().toISOString().slice(0, 10);

  const webPageLd = buildWebPageJsonLd({
    name: PAGE_TITLE,
    description:
      '2026년 calculatorhost 모든 계산기·세율·금리·규제 변경 이력 시계열',
    url: URL,
    datePublished: '2026-05-03',
    dateModified: lastModified,
  });

  const articleLd = buildArticleJsonLd({
    headline: PAGE_TITLE,
    description:
      '2026년 calculatorhost 변경 이력 — 신규 계산기·세율·규제·제도 변경을 시계열로 정리',
    url: URL,
    datePublished: '2026-05-03',
    dateModified: lastModified,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    type: 'Article',
    keywords: ['changelog', '변경 이력', '2026 세율', 'calculatorhost', '업데이트'],
  });

  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '변경 이력' },
  ]);

  // ItemList: 최신 5건의 변경사항을 LLM 인용용으로 노출
  const recentUpdates = UPDATES_LOG.slice(0, 5).map((entry) => {
    const title = entry.calculator
      ? `${entry.calculator.title} — ${entry.item}`
      : `${entry.item}`;
    return {
      name: title,
      url: URL,
      description: entry.detail,
    };
  });

  const itemListLd = buildItemListJsonLd(recentUpdates, '최신 변경 이력');

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListLd) }}
      />

      <div className="min-h-screen bg-bg-base">
        <Header />
        <div className="flex">
          <Sidebar />
          <main id="main-content" className="flex-1 px-4 py-8 md:px-8">
            <div className="mx-auto flex max-w-4xl flex-col gap-8">
              {/* H1 + 리드 */}
              <header>
                <Breadcrumb
                  items={[
                    { name: '홈', href: '/' },
                    { name: '변경 이력' },
                  ]}
                />
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  변경 이력 (Changelog)
                </h1>
                <p className="text-lg text-text-secondary">
                  calculatorhost의 모든 계산기·세율·금리·제도 변경을 시계열로 기록합니다.
                  세법 개정·규제 변경이 발생하는 즉시 본 페이지와{' '}
                  <Link href="/feed.xml" className="text-primary-500 underline hover:text-primary-700">
                    RSS 피드
                  </Link>
                  에 반영됩니다.
                </p>
                <p className="mt-2 text-sm text-text-tertiary">
                  최종 갱신: <time dateTime={lastModified}>{lastModified}</time> · 총{' '}
                  <strong className="text-text-secondary">{UPDATES_LOG.length}</strong>건의 변경 기록
                </p>
              </header>

              {/* 카테고리 요약 */}
              <section aria-label="카테고리별 변경 통계" className="card">
                <h2 className="mb-4 text-xl font-semibold">카테고리별 요약</h2>
                <div className="flex flex-wrap gap-2">
                  {stats.map(([cat, count]) => (
                    <span
                      key={cat}
                      className={`rounded-full border px-3 py-1 text-sm font-medium ${CATEGORY_STYLES[cat]}`}
                    >
                      {cat} <strong>{count}</strong>
                    </span>
                  ))}
                </div>
                <p className="mt-4 text-sm text-text-secondary">
                  <strong>신규</strong>는 새 계산기 공개, <strong>세율·금리</strong>는 정부 발표 반영,{' '}
                  <strong>규제·제도</strong>는 법령 개정 적용, <strong>문서</strong>는 본문 품질 개선입니다.
                </p>
              </section>

              {/* 월별 시계열 그룹 */}
              {monthGroups.map(([month, entries]) => (
                <section key={month} aria-label={`${month} 변경 이력`} className="card">
                  <h2 className="mb-4 text-2xl font-semibold">
                    <time dateTime={month}>
                      {month.slice(0, 4)}년 {parseInt(month.slice(5, 7), 10)}월
                    </time>{' '}
                    <span className="ml-2 text-sm font-normal text-text-tertiary">
                      ({entries.length}건)
                    </span>
                  </h2>
                  <ol className="space-y-4">
                    {entries.map((entry, idx) => (
                      <li
                        key={`${entry.date}-${idx}`}
                        className="border-l-4 border-l-primary-500/40 pl-4"
                      >
                        <div className="mb-1 flex flex-wrap items-center gap-2 text-sm">
                          <time
                            dateTime={entry.date}
                            className="font-mono tabular-nums text-text-secondary"
                          >
                            {entry.date}
                          </time>
                          <span
                            className={`rounded border px-2 py-0.5 text-xs font-medium ${CATEGORY_STYLES[entry.category]}`}
                          >
                            {entry.category}
                          </span>
                          {entry.calculator ? (
                            <Link
                              href={`/calculator/${entry.calculator.slug}/`}
                              className="font-medium text-primary-700 underline hover:text-primary-500 dark:text-primary-300"
                            >
                              {entry.calculator.title}
                            </Link>
                          ) : (
                            <span className="text-text-tertiary">사이트 전체</span>
                          )}
                        </div>
                        <p className="text-sm font-medium text-text-primary">{entry.item}</p>
                        <p className="mt-1 text-sm text-text-secondary">{entry.detail}</p>
                        {entry.sourceUrl && (
                          <p className="mt-2 text-xs">
                            <a
                              href={entry.sourceUrl}
                              target="_blank"
                              rel="noopener noreferrer nofollow"
                              className="text-primary-600 underline hover:text-primary-500 dark:text-primary-400"
                            >
                              ↗ 출처 / 법령 보기
                            </a>
                          </p>
                        )}
                      </li>
                    ))}
                  </ol>
                </section>
              ))}

              {/* 운영 원칙 */}
              <section aria-label="변경 이력 운영 원칙" className="card">
                <h2 className="mb-3 text-xl font-semibold">변경 이력 운영 원칙</h2>
                <ul className="list-disc space-y-2 pl-5 text-sm text-text-secondary">
                  <li>
                    <strong>출처 우선</strong>: 모든 세율·규제 변경은 국세청·기재부·금감원·한국은행 등{' '}
                    1차 출처 발표를 직접 확인한 뒤 반영합니다. 가능한 항목은 법령 deep-link를 함께 표시합니다.
                  </li>
                  <li>
                    <strong>즉시 반영</strong>: 정부 발표 후 24~72시간 이내 계산 로직과 본 페이지에 동시 반영을 목표로 합니다.
                  </li>
                  <li>
                    <strong>이력 보존</strong>: 폐지된 세율·규제도 과거 거래 계산을 위해 본 페이지에 보존합니다.
                    상수 파일(<code className="rounded bg-bg-card px-1">src/lib/constants/tax-rates-{'{year}'}.ts</code>)도 연도별로 보존합니다.
                  </li>
                  <li>
                    <strong>구독</strong>: 신규 변경을 즉시 받으려면{' '}
                    <Link href="/feed.xml" className="text-primary-500 underline">RSS 피드</Link>를
                    구독하세요. RSS 리더(Feedly·Inoreader 등)에서 본 페이지가 갱신될 때마다 알림을 받을 수 있습니다.
                  </li>
                </ul>
              </section>

              {/* 관련 링크 */}
              <section aria-label="관련 페이지" className="card">
                <h2 className="mb-3 text-xl font-semibold">관련 페이지</h2>
                <ul className="space-y-2 text-sm">
                  <li>
                    →{' '}
                    <Link href="/" className="text-primary-700 underline dark:text-primary-300">
                      홈 (전체 계산기 31종)
                    </Link>
                  </li>
                  <li>
                    →{' '}
                    <Link href="/guide/" className="text-primary-700 underline dark:text-primary-300">
                      가이드 — 시기성 세금·금융 가이드 14종
                    </Link>
                  </li>
                  <li>
                    →{' '}
                    <Link href="/glossary/" className="text-primary-700 underline dark:text-primary-300">
                      용어사전 (28개)
                    </Link>
                  </li>
                  <li>
                    →{' '}
                    <Link href="/about/" className="text-primary-700 underline dark:text-primary-300">
                      운영자 정보 (스마트데이터샵 / 김준혁)
                    </Link>
                  </li>
                </ul>
              </section>
            </div>
          </main>
        </div>
        <Footer />
      </div>
    </>
  );
}
