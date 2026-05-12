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
  title: '가이드 — 카테고리별 모음 (세금·금융·투자·근로·부동산) | calculatorhost',
  description:
    '한국 거주자가 자주 마주치는 금융·세금·부동산·투자·근로 의사결정을 위한 실전 가이드 모음. 시기성 콘텐츠(5월 종소세, 7월 재산세) + 분야별 절세·전략 가이드.',
  alternates: { canonical: URL },
  openGraph: {
    title: 'calculatorhost 가이드 — 카테고리별 모음',
    description: '시기성 + 분야별 실전 의사결정 가이드.',
    url: URL,
    type: 'website',

    locale: 'ko_KR',
  },
};

interface GuideEntry {
  slug: string;
  title: string;
  description: string;
  category: GuideCategory;
  publishedAt: string;
  readingMinutes: number;
  /** 시즌 강조 표기 (예: '5월 신고 시즌', '7월 납부 직전') */
  seasonal?: string;
}

type GuideCategory = '세금' | '세금·부동산' | '금융' | '투자' | '근로';

interface CategoryMeta {
  id: GuideCategory;
  emoji: string;
  description: string;
}

const CATEGORIES: CategoryMeta[] = [
  { id: '세금', emoji: '🧾', description: '종합소득세·양도세·취득세·VAT 신고와 절세' },
  { id: '세금·부동산', emoji: '🏠', description: '재산세·종합부동산세·임대차 세제' },
  { id: '금융', emoji: '💰', description: 'DSR·LTV·대출한도·예적금·환율' },
  { id: '투자', emoji: '📈', description: '주식·코인 평단·분할매수·분할매도' },
  { id: '근로', emoji: '💼', description: '연봉·실수령·프리랜서·N잡러' },
];

export const GUIDES: GuideEntry[] = [
  // ─── 허브 ───
  {
    slug: 'tax-calendar-2026',
    title: '2026 세금 캘린더 — 1월부터 12월까지 한눈에',
    description:
      '2026년 한 해 동안 내야 할 모든 세금·신고 일정을 월별로 정리. 각 일정에서 관련 가이드와 계산기로 1-click 이동. 직장인·사업자·자동차주·다주택자 페르소나별 핵심 일정.',
    category: '세금',
    publishedAt: '2026-05-03',
    readingMinutes: 6,
  },
  // ─── 1월 ───
  {
    slug: 'year-end-tax-settlement',
    title: '연말정산 완벽 가이드 (2026) — "13월의 월급" 받는 법',
    description:
      '신용카드·의료비·교육비·기부금·연금저축 공제 + 인적공제 + 환급 추적 + 추가 납부 회피 전략. 1월~2월 시즌 필독.',
    category: '세금',
    publishedAt: '2026-05-03',
    readingMinutes: 12,
    seasonal: '1~2월 정산 시즌',
  },
  {
    slug: 'january-vehicle-tax-prepayment',
    title: '자동차세 연납 6.4% 할인 가이드 (2026) — 1월 16~31일 신청',
    description:
      '1월 신청 시 약 6.4% 할인 (최대 9%). 위택스 신청법 + cc별 절감액 (1600cc 약 18,600원, 2000cc 약 33,300원).',
    category: '세금·부동산',
    publishedAt: '2026-05-03',
    readingMinutes: 6,
    seasonal: '1월 16~31일',
  },
  // ─── 2월 ───
  {
    slug: 'february-tax-refund-tracking',
    title: '2월 연말정산 환급 추적 + 5월 종소세 사전 준비',
    description:
      '환급 결과 확인 + 누락 공제 정정 + 경정청구 + 5월 종소세 신고 준비 체크리스트.',
    category: '근로',
    publishedAt: '2026-05-03',
    readingMinutes: 7,
    seasonal: '2~4월 환급/준비',
  },
  // ─── 3월 ───
  {
    slug: 'march-corporate-tax',
    title: '법인세 신고 가이드 (2026) — 3월 31일 마감',
    description:
      '12월 결산 법인 법인세 세율 (9·19·21·24%) + R&D·고용증대 등 세액공제 + 분납 + 홈택스 전자신고.',
    category: '세금',
    publishedAt: '2026-05-03',
    readingMinutes: 8,
    seasonal: '3월 31일 마감',
  },
  // ─── 4월 ───
  {
    slug: 'april-vat-preliminary-q1',
    title: '4월 부가세 1기 예정신고 가이드 (2026) — 1~3월 매출·매입',
    description:
      '4월 1~25일 일반과세자 부가세 신고. 매출세액·매입세액공제·홈택스 단계별 신고법 + 환급 받는 케이스.',
    category: '세금',
    publishedAt: '2026-05-03',
    readingMinutes: 8,
    seasonal: '4월 1~25일',
  },
  {
    slug: 'april-comprehensive-property-tax-exclusion',
    title: '4월 종부세 합산배제·과세특례 신청 가이드 (2026)',
    description:
      '임대주택·일시적 2주택·고령자·장기보유 등 우대 신청. 4월 1~30일 마감 → 12월 종부세 절세 핵심.',
    category: '세금·부동산',
    publishedAt: '2026-05-03',
    readingMinutes: 9,
    seasonal: '4월 1~30일',
  },
  // ─── 5월 (기존) ───
  {
    slug: 'may-comprehensive-income-tax',
    title: '5월 종합소득세 신고 완벽 가이드 (2026) — 프리랜서·사업자·N잡러 필독',
    description:
      '신고 대상·기한·홈택스 단계별 신고법·단순경비율 vs 기준경비율·절세 5가지·환급 받는 법까지 한 페이지에 정리. 5월 신고 시즌 직전 필독.',
    category: '세금',
    publishedAt: '2026-05-03',
    readingMinutes: 12,
    seasonal: '5월 신고 시즌',
  },
  {
    slug: 'june-property-tax',
    title: '재산세 완벽 가이드 (2026) — 6월 부과·7월 납부·공정시장가액 60%',
    description:
      '재산세 과세 기준일·납부 기한·계산식·1세대1주택 특례·세부담 상한·분할 납부까지 한 페이지. 7월 납부 시즌 직전 필독.',
    category: '세금·부동산',
    publishedAt: '2026-05-03',
    readingMinutes: 10,
    seasonal: '7월 납부 직전',
  },
  // ─── 7월 ───
  {
    slug: 'july-vat-final-1st-half',
    title: '7월 부가세 1기 확정신고 가이드 (2026) — 일반·간이과세 완전정리',
    description:
      '7월 1~25일 부가가치세 1기 확정신고. 일반과세 vs 간이과세 차이·세액계산·홈택스 6단계·환급·절세 5가지.',
    category: '세금',
    publishedAt: '2026-05-12',
    readingMinutes: 11,
    seasonal: '7월 1~25일',
  },
  // ─── 8월 ───
  {
    slug: 'august-capital-gains-tax-review',
    title: '8월 양도소득세 절세 검토 가이드 (2026) — 일시적2주택·장기보유 80%',
    description:
      '8월 부동산 양도 검토. 일시적2주택 3년 만료·장기보유공제 80%·단기 1년/2년 경계·양도 시점 vs 귀속연도·절세 5가지.',
    category: '세금·부동산',
    publishedAt: '2026-05-12',
    readingMinutes: 12,
    seasonal: '8월 양도 직전',
  },
  // ─── 9월 ───
  {
    slug: 'september-property-tax-second',
    title: '9월 재산세 2차 납부 가이드 (2026) — 위택스·신용카드 할부·가산세',
    description:
      '9월 16~30일 재산세 2차 납부. 주택 분할 vs 토지 일괄·위택스 5가지 방법·신용카드 무이자 할부·미납 가산세·과오납 환급.',
    category: '세금·부동산',
    publishedAt: '2026-05-12',
    readingMinutes: 9,
    seasonal: '9월 16~30일',
  },
  // ─── 10월 ───
  {
    slug: 'october-vat-q2-preliminary',
    title: '10월 부가세 2기 예정신고 가이드 (2026) — 환급·예정고지·연말 절세',
    description:
      '10월 1~25일 부가세 2기 예정신고. 예정신고 vs 예정고지 차이·환급 가능성·연말 절세 4가지·4분기 매입 계획.',
    category: '세금',
    publishedAt: '2026-05-12',
    readingMinutes: 10,
    seasonal: '10월 1~25일',
  },
  // ─── 11월 ───
  {
    slug: 'november-year-end-tax-prep',
    title: '11월 연말정산 준비 가이드 (2026) — 12월 31일 마감 전 절세 8가지',
    description:
      '12월 31일 마감 전 마지막 절세 기회. 연금저축·IRP 900만 한도·신용카드·의료비·기부금·청약통장·월세 공제까지 단계별.',
    category: '세금',
    publishedAt: '2026-05-12',
    readingMinutes: 13,
    seasonal: '11~12월 골든타임',
  },
  // ─── 12월 ───
  {
    slug: 'december-capital-gains-tax-deadline',
    title: '12월 양도세 vs 1월 양도세 가이드 (2026) — 연말 매도 결정 프레임',
    description:
      '12월 잔금 vs 1월 잔금. 귀속연도·신고 일정·2027 세법 개정 영향·양도손실 통산 4단계 의사결정.',
    category: '세금·부동산',
    publishedAt: '2026-05-12',
    readingMinutes: 11,
    seasonal: '12월 양도 직전',
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
    slug: 'dsr-loan-limit-tips',
    title: 'DSR 대출한도를 늘리는 5가지 실전 방법 (2026)',
    description:
      '스트레스 DSR 1.5%p 풀 적용된 2026년, 같은 소득으로 대출한도를 더 받는 5가지 방법을 시뮬레이션과 함께 정리.',
    category: '금융',
    publishedAt: '2026-05-03',
    readingMinutes: 7,
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
    slug: 'averaging-down-vs-loss-cut',
    title: '물타기 vs 손절 vs 비중조절 — 언제 무엇을 선택해야 하나',
    description:
      '하락 종목을 만났을 때 평단을 낮추는 물타기, 즉시 매도하는 손절, 단계적 매도하는 비중조절 — 3가지 전략의 의사결정 기준.',
    category: '투자',
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

// 시기성 가이드만 추출 (상단 배너용)
const SEASONAL_GUIDES = GUIDES.filter((g) => g.seasonal);

// 카테고리별 그룹화
const GUIDES_BY_CATEGORY: Record<GuideCategory, GuideEntry[]> = {
  '세금': [],
  '세금·부동산': [],
  '금융': [],
  '투자': [],
  '근로': [],
};
GUIDES.forEach((g) => GUIDES_BY_CATEGORY[g.category].push(g));

export default function GuideIndexPage() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드' },
  ]);
  const webpageLd = buildWebPageJsonLd({
    name: 'calculatorhost 가이드 — 카테고리별 모음',
    description: '한국 거주자 대상 금융·세금·부동산·투자·근로 실전 가이드 모음 (카테고리별 분류).',
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webpageLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListLd) }} />

      <div className="min-h-screen bg-bg-base">
        <Header />
        <div className="flex">
          <Sidebar />
          <main id="main-content" className="flex-1 px-4 py-8 md:px-8">
            <article className="mx-auto max-w-5xl space-y-10">
              <header>
                <Breadcrumb items={[{ name: '홈', href: '/' }, { name: '가이드' }]} />
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  가이드 — 카테고리별 모음
                </h1>
                <p className="text-lg text-text-secondary">
                  한국 거주자가 자주 마주치는 금융·세금·부동산·투자·근로 의사결정 가이드.
                  현재 <strong>{GUIDES.length}개</strong> 발행 · 5개 카테고리 · 매월 추가됨.
                </p>
              </header>

              {/* 카테고리 빠른 이동 칩 */}
              <nav aria-label="카테고리 빠른 이동" className="card flex flex-wrap gap-2">
                <a
                  href="#seasonal"
                  className="rounded-chip border border-danger-500 bg-danger-500/10 px-3 py-1.5 text-sm font-semibold text-danger-700 dark:text-danger-300 hover:bg-danger-500/20"
                >
                  🔥 시즌 가이드 ({SEASONAL_GUIDES.length})
                </a>
                {CATEGORIES.map((cat) => {
                  const count = GUIDES_BY_CATEGORY[cat.id].length;
                  if (count === 0) return null;
                  return (
                    <a
                      key={cat.id}
                      href={`#${encodeURIComponent(cat.id)}`}
                      className="rounded-chip border border-border-base bg-bg-card px-3 py-1.5 text-sm font-medium hover:border-primary-500 hover:text-primary-500"
                    >
                      {cat.emoji} {cat.id} ({count})
                    </a>
                  );
                })}
              </nav>

              {/* 시즌 가이드 — 강조 배너 */}
              {SEASONAL_GUIDES.length > 0 && (
                <section
                  id="seasonal"
                  aria-label="시즌 가이드"
                  className="card border-l-4 border-l-danger-500 bg-danger-500/5 space-y-4"
                >
                  <h2 className="text-2xl font-bold text-danger-700 dark:text-danger-300">
                    🔥 시즌 가이드 — 지금 가장 검색 많은 주제
                  </h2>
                  <div className="grid gap-4 md:grid-cols-2">
                    {SEASONAL_GUIDES.map((g) => (
                      <Link
                        key={g.slug}
                        href={`/guide/${g.slug}/`}
                        className="card card-hover flex flex-col gap-2 bg-bg-card border-2 border-danger-500/30"
                      >
                        <div className="flex items-center justify-between text-caption">
                          <span className="rounded-chip bg-danger-500/20 px-2 py-0.5 text-danger-700 dark:text-danger-300 font-semibold">
                            {g.seasonal}
                          </span>
                          <span className="text-text-tertiary">{g.readingMinutes}분 읽기</span>
                        </div>
                        <h3 className="text-base font-semibold text-text-primary">{g.title}</h3>
                        <p className="text-sm text-text-secondary leading-relaxed line-clamp-3">
                          {g.description}
                        </p>
                      </Link>
                    ))}
                  </div>
                </section>
              )}

              {/* 카테고리별 그룹화 */}
              {CATEGORIES.map((cat) => {
                const guides = GUIDES_BY_CATEGORY[cat.id];
                if (guides.length === 0) return null;
                return (
                  <section key={cat.id} id={cat.id} aria-label={`${cat.id} 가이드`} className="space-y-4">
                    <header className="flex items-baseline justify-between border-b border-border-base pb-2">
                      <h2 className="text-2xl font-bold">
                        <span aria-hidden>{cat.emoji}</span> {cat.id}{' '}
                        <span className="text-base text-text-tertiary font-normal">
                          ({guides.length})
                        </span>
                      </h2>
                      <a
                        href="#"
                        className="text-caption text-text-tertiary hover:text-primary-500"
                      >
                        ↑ 맨 위로
                      </a>
                    </header>
                    <p className="text-text-secondary text-sm">{cat.description}</p>
                    <div className="grid gap-4 md:grid-cols-2">
                      {guides.map((g) => (
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
                          <h3 className="text-base font-semibold text-text-primary">{g.title}</h3>
                          <p className="text-sm text-text-secondary leading-relaxed line-clamp-3">
                            {g.description}
                          </p>
                          <p className="text-caption text-text-tertiary mt-auto">
                            {g.publishedAt}
                          </p>
                        </Link>
                      ))}
                    </div>
                  </section>
                );
              })}

              {/* 관련 자원 */}
              <section className="card space-y-3">
                <h2 className="text-xl font-semibold">📚 관련 자원</h2>
                <ul className="space-y-2 text-sm">
                  <li>
                    →{' '}
                    <Link href="/glossary/" className="text-primary-600 underline dark:text-primary-500">
                      용어사전 (28개)
                    </Link>{' '}
                    — DSR·LTV·평단·BEP·양도차익 등 핵심 용어 정의
                  </li>
                  <li>
                    →{' '}
                    <Link href="/" className="text-primary-600 underline dark:text-primary-500">
                      홈 — 31개 계산기 모음
                    </Link>
                  </li>
                  <li>
                    →{' '}
                    <Link href="/feed.xml" className="text-primary-600 underline dark:text-primary-500">
                      📡 RSS 피드 구독
                    </Link>{' '}
                    — 새 가이드 알림
                  </li>
                </ul>
              </section>

              <section
                aria-label="안내"
                className="rounded-lg border border-border-base p-4 text-caption text-text-tertiary"
              >
                <p className="mb-2">
                  <strong>법적 근거</strong>: 본 가이드 카테고리에 포함된 콘텐츠는 다음 법령을 근거로 작성됩니다 — 소득세법 §55·§70·§94·§103·§148의4 (소득세·양도세·퇴직소득세) · 지방세법 §11·§13의2·§111·§128·§150 (취득세·재산세·자동차세·지방교육세) · 주택임대차보호법 §3·§3의2·§8 (임대차) · 은행법 §38·시행령 §24의4 (DSR·대출 규제) · 부가가치세법 §49 (예정 신고).
                </p>
                <p>
                  <strong>업데이트</strong>: {DATE_MODIFIED} · 작성·검수: 김준혁 (스마트데이터샵).
                  새 가이드는 매월 1~2개 추가됩니다. 알림은 위 RSS 또는 카카오톡 채널 (출시 예정).
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
