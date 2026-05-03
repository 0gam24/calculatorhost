import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { Footer } from '@/components/layout/Footer';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import {
  buildBreadcrumbJsonLd,
  buildWebPageJsonLd,
  buildItemListJsonLd,
} from '@/lib/seo/jsonld';

const URL = 'https://calculatorhost.com/guide/';
const DATE_PUBLISHED = '2026-05-03';
const DATE_MODIFIED = '2026-05-03';

export const metadata: Metadata = {
  title: '가이드 — 금융·세금·투자 실전 팁 2026 | calculatorhost',
  description:
    '계산기만으로는 부족한 실전 의사결정 가이드. DSR 대출한도 늘리는 법, 물타기 전략 선택 기준, 양도세 절세 팁까지 한국 거주자 맞춤 콘텐츠.',
  alternates: { canonical: URL },
  openGraph: {
    title: 'calculatorhost 가이드 — 금융·세금·투자 실전 팁',
    description: '계산기 + 실전 의사결정 가이드.',
    url: URL,
    type: 'website',
    images: ['/og-default.png'],
    locale: 'ko_KR',
  },
};

interface GuideEntry {
  slug: string;
  title: string;
  description: string;
  category: string;
  publishedAt: string;
  readingMinutes: number;
}

export const GUIDES: GuideEntry[] = [
  {
    slug: 'may-comprehensive-income-tax',
    title: '5월 종합소득세 신고 완벽 가이드 (2026) — 프리랜서·사업자·N잡러 필독',
    description:
      '신고 대상·기한·홈택스 단계별 신고법·단순경비율 vs 기준경비율·절세 5가지·환급 받는 법까지 한 페이지에 정리. 5월 신고 시즌 직전 필독.',
    category: '세금',
    publishedAt: '2026-05-03',
    readingMinutes: 12,
  },
  {
    slug: 'dsr-loan-limit-tips',
    title: 'DSR 대출한도를 늘리는 5가지 실전 방법 (2026)',
    description:
      '스트레스 DSR 1.5%p 풀 적용된 2026년, 같은 소득으로 대출한도를 더 받는 5가지 방법을 시뮬레이션과 함께 정리.',
    category: '금융',
    publishedAt: '2026-05-03',
    readingMinutes: 7,
  },
  {
    slug: 'averaging-down-vs-loss-cut',
    title: '물타기 vs 손절 vs 비중조절 — 언제 무엇을 선택해야 하나',
    description:
      '하락 종목을 만났을 때 평단을 낮추는 물타기, 즉시 매도하는 손절, 단계적 매도하는 비중조절 — 3가지 전략의 의사결정 기준.',
    category: '투자',
    publishedAt: '2026-05-03',
    readingMinutes: 8,
  },
  {
    slug: 'capital-gains-tax-tips',
    title: '양도소득세 절세 7가지 방법 (2026)',
    description:
      '1세대1주택 비과세, 장기보유공제 80%, 일시적 2주택 3년 특례, 자경 농지 100% 감면 등 양도세 절세 핵심 7가지를 시뮬레이션과 함께 정리.',
    category: '세금',
    publishedAt: '2026-05-03',
    readingMinutes: 9,
  },
  {
    slug: 'dsr-regulation-zones',
    title: '비규제·조정·투기과열 DSR·LTV 규제 완전 정리 (2026)',
    description:
      '같은 주택이라도 위치(비규제·조정·투기과열)에 따라 대출 한도가 1억 원 이상 차이. 스트레스 DSR + 생애최초 우대 + 다주택 중과까지 종합 비교.',
    category: '금융',
    publishedAt: '2026-05-03',
    readingMinutes: 8,
  },
  {
    slug: 'freelancer-salary-comparison',
    title: '프리랜서 vs 일반직 실수령액 비교 — 4대보험·세금 차이',
    description:
      '같은 연 5천만 원이라도 프리랜서(사업소득)와 일반직(근로소득)의 실수령액 차이. 4대보험 부담·종합소득세·경비 인정 시뮬레이션.',
    category: '근로',
    publishedAt: '2026-05-03',
    readingMinutes: 7,
  },
];

export default function GuideIndexPage() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드' },
  ]);
  const webpageLd = buildWebPageJsonLd({
    name: 'calculatorhost 가이드',
    description: '한국 거주자 대상 금융·세금·투자 실전 의사결정 가이드 모음',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
  });
  const itemListLd = buildItemListJsonLd(
    GUIDES.map((g) => ({
      name: g.title,
      url: `https://calculatorhost.com/guide/${g.slug}/`,
    })),
    'calculatorhost 가이드'
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webpageLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListLd) }}
      />

      <div className="min-h-screen bg-bg-base">
        <Header />
        <div className="flex">
          <Sidebar />
          <main className="flex-1 px-4 py-8 md:px-8">
            <article className="mx-auto max-w-4xl space-y-8">
              <header>
                <Breadcrumb items={[{ name: '홈', href: '/' }, { name: '가이드' }]} />
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  가이드 — 실전 의사결정 콘텐츠
                </h1>
                <p className="text-lg text-text-secondary">
                  계산기 결과만으로는 부족한 부분 — "그래서 무엇을 선택해야 하는가"에
                  답하는 실전 가이드. 각 글에서 관련 계산기로 즉시 시뮬레이션할 수 있습니다.
                </p>
              </header>

              <section className="grid gap-4 md:grid-cols-2">
                {GUIDES.map((g) => (
                  <Link
                    key={g.slug}
                    href={`/guide/${g.slug}/`}
                    className="card card-hover flex flex-col gap-3"
                  >
                    <div className="flex items-center justify-between text-caption text-text-tertiary">
                      <span className="rounded-chip bg-primary-500/10 px-2 py-0.5 text-primary-700 dark:text-primary-300 font-medium">
                        {g.category}
                      </span>
                      <span>{g.readingMinutes}분 읽기</span>
                    </div>
                    <h2 className="text-lg font-semibold text-text-primary">{g.title}</h2>
                    <p className="text-sm text-text-secondary leading-relaxed">
                      {g.description}
                    </p>
                    <p className="text-caption text-text-tertiary mt-auto">
                      {g.publishedAt}
                    </p>
                  </Link>
                ))}
              </section>
            </article>
          </main>
        </div>
        <Footer />
      </div>
    </>
  );
}
