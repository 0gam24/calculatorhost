/**
 * 가이드 카테고리 전용 목록 페이지 공용 컴포넌트.
 *
 * /guide/category/{slug}/ 5개 라우트가 이 컴포넌트를 감싸는 얇은 page.tsx 로 사용.
 * 데이터는 /guide/page.tsx 의 GUIDES SSoT 를 그대로 읽으므로 신규 가이드 발행 시
 * 별도 등록 없이 자동 반영된다 (빌드 시점 정적 생성).
 *
 * 주의: guide/page.tsx 가 본 파일을 import 하면 순환 참조가 되므로,
 * 카테고리 메타(슬러그·설명)는 여기서 자체 정의한다 (guide/page.tsx 의 CATEGORIES 와 동기 유지).
 */

import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { Footer } from '@/components/layout/Footer';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import Icon, { type IconName } from '@/components/ui/Icon';
import {
  buildBreadcrumbJsonLd,
  buildWebPageJsonLd,
  buildItemListJsonLd,
} from '@/lib/seo/jsonld';
import { GUIDES, type GuideCategory } from '@/app/guide/page';

export type GuideCategorySlug = 'tax' | 'tax-real-estate' | 'finance' | 'investment' | 'work';

interface CategoryPageMeta {
  slug: GuideCategorySlug;
  id: GuideCategory;
  icon: IconName;
  /** 페이지 리드 문단 겸 meta description 소재 */
  description: string;
  /** metadata.title 의 키워드부 (개수 미포함 — 제목 안정성 유지) */
  titleKeywords: string;
}

export const GUIDE_CATEGORY_PAGES: CategoryPageMeta[] = [
  {
    slug: 'tax',
    id: '세금',
    icon: 'receipt',
    description: '종합소득세·양도세·취득세·부가세 신고와 절세 실전 가이드.',
    titleKeywords: '종합소득세·양도세·부가세 신고 절세',
  },
  {
    slug: 'tax-real-estate',
    id: '세금·부동산',
    icon: 'home',
    description: '재산세·종합부동산세·임대차 세제 등 부동산 보유·거래 세금 가이드.',
    titleKeywords: '재산세·종부세·임대차 세제',
  },
  {
    slug: 'finance',
    id: '금융',
    icon: 'banknote',
    description: 'DSR·LTV·대출한도·예적금·환율 등 금융 의사결정 가이드.',
    titleKeywords: 'DSR·대출한도·예적금·환율',
  },
  {
    slug: 'investment',
    id: '투자',
    icon: 'trending-up',
    description: '주식·코인 평단·분할매수·분할매도 등 투자 계산 가이드.',
    titleKeywords: '주식·코인 평단·분할매매',
  },
  {
    slug: 'work',
    id: '근로',
    icon: 'briefcase',
    description: '연봉 실수령액·프리랜서 세금·N잡러 건강보험 등 근로소득 가이드.',
    titleKeywords: '연봉 실수령·프리랜서·N잡러',
  },
];

function getMeta(slug: GuideCategorySlug): CategoryPageMeta {
  const meta = GUIDE_CATEGORY_PAGES.find((c) => c.slug === slug);
  if (!meta) throw new Error(`unknown guide category slug: ${slug}`);
  return meta;
}

export function buildGuideCategoryMetadata(slug: GuideCategorySlug): Metadata {
  const meta = getMeta(slug);
  const url = `https://calculatorhost.com/guide/category/${slug}/`;
  const title = `${meta.id} 가이드 모음 | ${meta.titleKeywords} | calculatorhost`;
  const description = `${meta.description} 2026년 최신 세율·기준 반영, 법조항 근거와 단계별 계산 사례 포함. 무료·회원가입 불필요.`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: 'website',
      images: ['/og-default.png'],
      locale: 'ko_KR',
    },
    twitter: { card: 'summary_large_image', images: ['/og-default.png'] },
  };
}

export default function GuideCategoryIndex({ slug }: { slug: GuideCategorySlug }) {
  const meta = getMeta(slug);
  const URL = `https://calculatorhost.com/guide/category/${slug}/`;
  const guides = GUIDES.filter((g) => g.category === meta.id).sort((a, b) =>
    b.publishedAt.localeCompare(a.publishedAt)
  );
  const others = GUIDE_CATEGORY_PAGES.filter((c) => c.slug !== slug);

  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: meta.id },
  ]);
  const webpageLd = buildWebPageJsonLd({
    name: `${meta.id} 가이드 모음`,
    description: meta.description,
    url: URL,
    datePublished: '2026-07-22',
    dateModified: guides[0]?.publishedAt ?? '2026-07-22',
  });
  const itemListLd = buildItemListJsonLd(
    guides.map((g) => ({
      name: g.title,
      url: `https://calculatorhost.com/guide/${g.slug}/`,
    })),
    `${meta.id} 가이드`
  );

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webpageLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListLd) }} />

      <div className="min-h-screen bg-bg-base">
        <Header />
        <div className="flex">
          <Sidebar />
          <main id="main-content" className="flex-1 px-4 py-8 md:px-8">
            <article className="mx-auto max-w-5xl space-y-8">
              <header>
                <Breadcrumb
                  items={[{ name: '홈', href: '/' }, { name: '가이드', href: '/guide/' }, { name: meta.id }]}
                />
                <h1 className="mb-3 flex items-center gap-3 text-4xl font-bold tracking-tight">
                  <span
                    aria-hidden
                    className="inline-flex h-11 w-11 items-center justify-center rounded-chip bg-primary-50 text-primary-600 dark:bg-primary-900/40 dark:text-primary-300"
                  >
                    <Icon name={meta.icon} size={24} />
                  </span>
                  {meta.id} 가이드
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  {meta.description} 현재 <strong>{guides.length}편</strong> 발행, 최신순 정렬.
                </p>
              </header>

              {/* 카테고리 전환 칩 */}
              <nav aria-label="가이드 카테고리 전환" className="card flex flex-wrap gap-2">
                <Link
                  href="/guide/"
                  className="rounded-chip border border-border-base bg-bg-card px-3 py-1.5 text-sm font-medium hover:border-primary-500 hover:text-primary-500"
                >
                  전체 가이드
                </Link>
                {GUIDE_CATEGORY_PAGES.map((c) =>
                  c.slug === slug ? (
                    <span
                      key={c.slug}
                      aria-current="page"
                      className="inline-flex items-center gap-1.5 rounded-chip border border-primary-500 bg-primary-500/10 px-3 py-1.5 text-sm font-semibold text-primary-500"
                    >
                      <Icon name={c.icon} size={14} />
                      {c.id} ({guides.length})
                    </span>
                  ) : (
                    <Link
                      key={c.slug}
                      href={`/guide/category/${c.slug}/`}
                      className="inline-flex items-center gap-1.5 rounded-chip border border-border-base bg-bg-card px-3 py-1.5 text-sm font-medium hover:border-primary-500 hover:text-primary-500"
                    >
                      <Icon name={c.icon} size={14} />
                      {c.id}
                    </Link>
                  )
                )}
              </nav>

              {/* 카테고리 글 목록 (최신순) */}
              <section aria-label={`${meta.id} 가이드 목록`} className="card space-y-1">
                <ul className="divide-y divide-border-base">
                  {guides.map((g) => (
                    <li key={g.slug}>
                      <Link
                        href={`/guide/${g.slug}/`}
                        className="flex flex-col gap-1 py-3 hover:bg-primary-500/5"
                      >
                        <span className="flex items-center justify-between gap-3">
                          <span className="text-base font-semibold text-text-primary hover:text-primary-500">
                            {g.title}
                          </span>
                          <span className="hidden shrink-0 text-caption text-text-tertiary sm:inline">
                            {g.publishedAt} · {g.readingMinutes}분
                          </span>
                        </span>
                        <span className="text-sm text-text-tertiary line-clamp-2">{g.description}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>

              {/* 다른 카테고리 안내 */}
              <section className="card space-y-3">
                <h2 className="text-xl font-semibold">다른 카테고리 가이드</h2>
                <ul className="grid gap-2 sm:grid-cols-2">
                  {others.map((c) => (
                    <li key={c.slug}>
                      <Link
                        href={`/guide/category/${c.slug}/`}
                        className="flex items-center gap-2 rounded-chip border border-border-base px-3 py-2 text-sm hover:border-primary-500 hover:text-primary-500"
                      >
                        <span aria-hidden className="text-primary-500">
                          <Icon name={c.icon} size={16} />
                        </span>
                        <span className="font-medium">{c.id}</span>
                        <span className="text-text-tertiary">{c.titleKeywords}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            </article>
          </main>
        </div>
        <Footer />
      </div>
    </>
  );
}
