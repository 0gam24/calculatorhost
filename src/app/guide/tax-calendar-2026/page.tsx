import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { Footer } from '@/components/layout/Footer';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { AdSlot } from '@/components/ads/AdSlot';
import { ShareButtons } from '@/components/calculator/ShareButtons';
import {
  buildBreadcrumbJsonLd,
  buildArticleJsonLd,
  buildSpeakableJsonLd,
} from '@/lib/seo/jsonld';

const URL = 'https://calculatorhost.com/guide/tax-calendar-2026/';
const DATE_PUBLISHED = '2026-05-03';
const DATE_MODIFIED = '2026-05-03';

export const metadata: Metadata = {
  title: '2026 세금 캘린더 — 1월부터 12월까지 한눈에 | calculatorhost',
  description:
    '2026년 1월~12월 세금·납부 일정 한눈에. 연말정산·종소세·재산세·종부세·자동차세·부가세·법인세까지 월별 D-day와 관련 가이드 링크 모음.',
  keywords: [
    '세금 캘린더',
    '2026 세금 일정',
    '세금 납부 일정',
    '월별 세금',
    '연말정산 시기',
    '재산세 납부',
    '종합소득세 일정',
    '부가세 신고',
    '자동차세 연납',
  ],
  alternates: { canonical: URL },
  openGraph: {
    title: '2026 세금 캘린더 — 1월부터 12월까지 한눈에',
    description: '월별 D-day + 관련 가이드 링크 모음.',
    url: URL,
    type: 'article',
    images: ['/og-default.png'],
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
};

interface MonthEntry {
  month: number;
  emoji: string;
  events: Array<{
    date: string;
    title: string;
    description: string;
    target: string; // 직장인·사업자·자동차주·다주택자 등
    guideHref?: string;
    calculatorHref?: string;
  }>;
}

const CALENDAR: MonthEntry[] = [
  {
    month: 1,
    emoji: '❄️',
    events: [
      {
        date: '1월 15일',
        title: '연말정산 간소화 서비스 오픈',
        description: '홈택스에서 의료비·교육비·기부금 등 자료 일괄 다운로드.',
        target: '직장인',
        guideHref: '/guide/year-end-tax-settlement/',
        calculatorHref: '/calculator/salary/',
      },
      {
        date: '1월 16~31일',
        title: '자동차세 연납 (6.4% 할인)',
        description: '1월 일괄 납부 시 약 6.4% 할인. 위택스 또는 자동차세 앱.',
        target: '자동차 보유자',
        guideHref: '/guide/january-vehicle-tax-prepayment/',
        calculatorHref: '/calculator/vehicle-tax/',
      },
      {
        date: '1월 25일',
        title: '부가세 2기 확정신고 (법인)',
        description: '12월 결산 법인 부가세 2기(7~12월) 확정 신고·납부.',
        target: '법인 사업자',
        calculatorHref: '/calculator/vat/',
      },
    ],
  },
  {
    month: 2,
    emoji: '💝',
    events: [
      {
        date: '2월 급여일',
        title: '연말정산 환급/추가 납부 반영',
        description: '회사가 1월 정산 완료 → 2월 급여에 차액 반영.',
        target: '직장인',
        guideHref: '/guide/february-tax-refund-tracking/',
      },
    ],
  },
  {
    month: 3,
    emoji: '🌱',
    events: [
      {
        date: '3월 31일',
        title: '법인세 신고·납부 (12월 결산 법인)',
        description: '연결법인 4월 30일까지. 미신고 가산세 20%.',
        target: '법인 사업자',
        guideHref: '/guide/march-corporate-tax/',
      },
    ],
  },
  {
    month: 4,
    emoji: '🌸',
    events: [
      {
        date: '4월 1~25일',
        title: '부가세 1기 예정신고 (개인사업자)',
        description: '1~3월 매출/매입 기준 부가세 예정 신고·납부.',
        target: '일반과세 개인사업자',
        guideHref: '/guide/april-vat-preliminary-q1/',
        calculatorHref: '/calculator/vat/',
      },
      {
        date: '4월 1~30일',
        title: '종부세 합산배제·과세특례 신청',
        description: '임대주택·미분양·사원용 주택 등 합산배제 신청 마감.',
        target: '다주택자·임대사업자',
        guideHref: '/guide/april-comprehensive-property-tax-exclusion/',
        calculatorHref: '/calculator/comprehensive-property-tax/',
      },
    ],
  },
  {
    month: 5,
    emoji: '🌷',
    events: [
      {
        date: '5월 1~31일',
        title: '종합소득세 신고·납부',
        description: '프리랜서·1인사업자·N잡러·임대인 등. 무신고 시 가산세 20%+.',
        target: '프리랜서·사업자·N잡러',
        guideHref: '/guide/may-comprehensive-income-tax/',
        calculatorHref: '/calculator/freelancer-tax/',
      },
      {
        date: '5월 1~31일',
        title: '양도소득세 정산 (전년 양도분)',
        description: '전년도 부동산·주식 양도분 합산 신고.',
        target: '부동산·주식 매도자',
        calculatorHref: '/calculator/capital-gains-tax/',
      },
    ],
  },
  {
    month: 6,
    emoji: '🌿',
    events: [
      {
        date: '6월 1일',
        title: '재산세·종부세 과세 기준일',
        description: '이날 0시 기준 부동산 소유자에게 1년치 부과. 거래 시 잔금 일정 주의.',
        target: '부동산 보유자',
        guideHref: '/guide/june-property-tax/',
        calculatorHref: '/calculator/property-tax/',
      },
      {
        date: '6월 30일',
        title: '종합소득세 성실신고확인 마감',
        description: '성실신고확인대상자 (수입금액 일정 이상) 신고 기한.',
        target: '성실신고확인대상',
      },
    ],
  },
  {
    month: 7,
    emoji: '☀️',
    events: [
      {
        date: '7월 1~25일',
        title: '부가세 1기 확정신고 (개인사업자)',
        description: '1~6월 매출/매입 기준 부가세 확정 신고·납부.',
        target: '일반과세 개인사업자',
        calculatorHref: '/calculator/vat/',
      },
      {
        date: '7월 16~31일',
        title: '재산세 1차 납부 (주택분 1/2)',
        description: '주택 본세의 1/2 (본세 20만 이하면 전액). 위택스 신용카드 무이자 할부.',
        target: '주택 보유자',
        guideHref: '/guide/june-property-tax/',
        calculatorHref: '/calculator/property-tax/',
      },
      {
        date: '7월 16~31일',
        title: '주민세 균등분 (지방세)',
        description: '세대당 1만 원 내외. 자동 부과 (위택스).',
        target: '세대주',
      },
    ],
  },
  {
    month: 8,
    emoji: '🌻',
    events: [
      {
        date: '8월 1~31일',
        title: '주민세 사업소분 (사업자)',
        description: '사업자 종업원·연면적 기준 부과.',
        target: '사업자',
      },
      {
        date: '8월 말',
        title: '종부세 합산배제 추가 신청 가능',
        description: '4월 미신청분 추가 신청 기간 (일부 케이스).',
        target: '다주택자',
      },
    ],
  },
  {
    month: 9,
    emoji: '🍂',
    events: [
      {
        date: '9월 16~30일',
        title: '재산세 2차 납부 (주택분 잔여 1/2 + 토지·건축물 일괄)',
        description: '주택 1차 납부분 제외 잔여 + 토지·건축물 전액.',
        target: '부동산 보유자',
        guideHref: '/guide/june-property-tax/',
        calculatorHref: '/calculator/property-tax/',
      },
    ],
  },
  {
    month: 10,
    emoji: '🍁',
    events: [
      {
        date: '10월 1~25일',
        title: '부가세 2기 예정신고 (개인사업자)',
        description: '7~9월 매출/매입 기준 부가세 예정 신고·납부.',
        target: '일반과세 개인사업자',
        calculatorHref: '/calculator/vat/',
      },
    ],
  },
  {
    month: 11,
    emoji: '🍃',
    events: [
      {
        date: '11월 30일',
        title: '종합소득세 중간예납 (사업자)',
        description: '전년 종소세 1/2 미리 납부. 분납 가능.',
        target: '사업자·임대인',
      },
    ],
  },
  {
    month: 12,
    emoji: '🎄',
    events: [
      {
        date: '12월 1~15일',
        title: '종합부동산세 신고·납부',
        description: '1세대 합산 공시가 9억 초과(1주택 12억) 또는 다주택 6억 초과 대상.',
        target: '다주택자·고가주택자',
        calculatorHref: '/calculator/comprehensive-property-tax/',
      },
      {
        date: '12월 16~31일',
        title: '자동차세 2기 정기분 납부',
        description: '6월에 1차 납부 안 한 경우. 1월 연납 신청자는 면제.',
        target: '자동차 보유자',
        calculatorHref: '/calculator/vehicle-tax/',
      },
      {
        date: '12월 31일',
        title: '⚠️ 연말 절세 마감 — 연금저축·IRP·기부금',
        description: '연금저축 600만 + IRP 100만 = 700만 한도, 13.2~16.5% 세액공제.',
        target: '직장인·사업자',
        guideHref: '/guide/year-end-tax-settlement/',
      },
    ],
  },
];

export default function TaxCalendar2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '2026 세금 캘린더' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '2026 세금 캘린더 — 1월부터 12월까지 한눈에',
    description: '월별 세금·납부 일정 + D-day + 관련 가이드 링크 모음.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['2026 세금', '세금 일정', '세금 캘린더', '납부 일정'],
  });
  const speakableLd = buildSpeakableJsonLd(['[data-speakable]']);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableLd) }} />

      <div className="min-h-screen bg-bg-base">
        <Header />
        <div className="flex">
          <Sidebar />
          <main className="flex-1 px-4 py-8 md:px-8">
            <article className="mx-auto max-w-4xl space-y-8">
              <header>
                <Breadcrumb
                  items={[
                    { name: '홈', href: '/' },
                    { name: '가이드', href: '/guide/' },
                    { name: '2026 세금 캘린더' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">세금 허브 · 6분 읽기 · 2026-05-03</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  2026 세금 캘린더 — 1월부터 12월까지 한눈에
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  2026년 한 해 동안 내야 할 모든 세금·신고 일정을 월별로 정리했습니다. 각 일정에서
                  관련 가이드와 계산기로 1-click 이동 가능. 직장인·사업자·자동차주·다주택자 누구나
                  본인 해당 일정만 빠르게 확인하세요.
                </p>
              </header>

              <AdSlot slot="guide-calendar-top" format="horizontal" />

              {/* 월별 빠른 이동 */}
              <nav aria-label="월별 빠른 이동" className="card flex flex-wrap gap-2">
                {CALENDAR.map((m) => (
                  <a
                    key={m.month}
                    href={`#m${m.month}`}
                    className="rounded-chip border border-border-base bg-bg-card px-3 py-1.5 text-sm font-medium hover:border-primary-500 hover:text-primary-500"
                  >
                    {m.emoji} {m.month}월
                  </a>
                ))}
              </nav>

              {/* 페르소나별 핵심 일정 요약 */}
              <section className="card border-l-4 border-l-primary-500">
                <h2 className="mb-3 text-xl font-bold">👤 본인 유형별 핵심 일정</h2>
                <div className="grid gap-3 md:grid-cols-2 text-sm">
                  <div className="rounded-lg bg-bg-raised p-3">
                    <strong className="text-text-primary block mb-1">💼 직장인</strong>
                    <ul className="text-text-secondary space-y-0.5">
                      <li>• 1월 15일~2월: 연말정산</li>
                      <li>• 5월: (누락 공제) 종소세 신고</li>
                      <li>• 12월 31일: 연금저축·IRP 마감</li>
                    </ul>
                  </div>
                  <div className="rounded-lg bg-bg-raised p-3">
                    <strong className="text-text-primary block mb-1">💻 프리랜서·N잡러</strong>
                    <ul className="text-text-secondary space-y-0.5">
                      <li>• 5월 1~31일: 종합소득세 신고</li>
                      <li>• 11월 30일: 중간예납</li>
                    </ul>
                  </div>
                  <div className="rounded-lg bg-bg-raised p-3">
                    <strong className="text-text-primary block mb-1">🏪 사업자 (일반과세)</strong>
                    <ul className="text-text-secondary space-y-0.5">
                      <li>• 4·10월: 부가세 예정신고</li>
                      <li>• 7월·1월: 부가세 확정신고</li>
                      <li>• 5월: 종소세 신고</li>
                    </ul>
                  </div>
                  <div className="rounded-lg bg-bg-raised p-3">
                    <strong className="text-text-primary block mb-1">🏠 부동산 보유자</strong>
                    <ul className="text-text-secondary space-y-0.5">
                      <li>• 6월 1일: 과세 기준일</li>
                      <li>• 7월·9월: 재산세 1·2차</li>
                      <li>• 12월 1~15일: 종부세 (해당 시)</li>
                    </ul>
                  </div>
                  <div className="rounded-lg bg-bg-raised p-3">
                    <strong className="text-text-primary block mb-1">🚗 자동차 보유자</strong>
                    <ul className="text-text-secondary space-y-0.5">
                      <li>• 1월 16~31일: 연납 (6.4% 할인)</li>
                      <li>• 6월·12월: 정기분 (연납 X 시)</li>
                    </ul>
                  </div>
                  <div className="rounded-lg bg-bg-raised p-3">
                    <strong className="text-text-primary block mb-1">🏢 법인 사업자</strong>
                    <ul className="text-text-secondary space-y-0.5">
                      <li>• 1월 25일: 부가세 2기 확정</li>
                      <li>• 3월 31일: 법인세 (12월 결산)</li>
                      <li>• 4·7·10월: 부가세 예정·확정</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* 월별 상세 */}
              {CALENDAR.map((m) => (
                <section key={m.month} id={`m${m.month}`} aria-label={`${m.month}월 일정`} className="space-y-3">
                  <header className="flex items-baseline justify-between border-b border-border-base pb-2">
                    <h2 className="text-2xl font-bold">
                      <span aria-hidden>{m.emoji}</span> {m.month}월{' '}
                      <span className="text-base text-text-tertiary font-normal">
                        ({m.events.length}건)
                      </span>
                    </h2>
                    <a href="#" className="text-caption text-text-tertiary hover:text-primary-500">↑ 맨 위로</a>
                  </header>
                  <div className="space-y-3">
                    {m.events.map((e, i) => (
                      <div key={i} className="card">
                        <div className="flex flex-wrap items-baseline justify-between gap-2 mb-2">
                          <h3 className="font-semibold text-text-primary">
                            <span className="text-primary-700 dark:text-primary-300">{e.date}</span>{' '}
                            — {e.title}
                          </h3>
                          <span className="rounded-chip bg-bg-raised px-2 py-0.5 text-caption text-text-tertiary">
                            {e.target}
                          </span>
                        </div>
                        <p className="text-sm text-text-secondary mb-3">{e.description}</p>
                        <div className="flex flex-wrap gap-2 text-sm">
                          {e.guideHref && (
                            <Link
                              href={e.guideHref}
                              className="rounded-chip border border-primary-500/30 bg-primary-500/10 px-3 py-1 text-primary-700 dark:text-primary-300 hover:bg-primary-500/20"
                            >
                              📖 가이드
                            </Link>
                          )}
                          {e.calculatorHref && (
                            <Link
                              href={e.calculatorHref}
                              className="rounded-chip border border-border-base bg-bg-card px-3 py-1 hover:border-primary-500 hover:text-primary-500"
                            >
                              🧮 계산기
                            </Link>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              ))}

              <section className="card border-l-4 border-l-danger-500 bg-danger-500/5">
                <h2 className="mb-2 text-lg font-semibold text-danger-700 dark:text-danger-300">⚠️ 주의사항</h2>
                <ul className="space-y-2 text-sm text-danger-700 dark:text-danger-300">
                  <li>• 본 캘린더는 일반 일정 — 정책 변경 시 변동 가능 (홈택스·위택스 공지 확인).</li>
                  <li>• 무신고·미납 시 가산세 부과 — 기한 절대 엄수.</li>
                  <li>• 일부 일정은 휴일에 따라 자동 연장 가능 (예: 5월 31일 토요일 → 6월 2일).</li>
                </ul>
              </section>

              <ShareButtons title="2026 세금 캘린더 — 1월부터 12월까지 한눈에" url={URL} description="월별 세금 일정 + 가이드/계산기 1-click 이동." />

              <section aria-label="출처 및 면책" className="rounded-lg border border-border-base p-4 text-caption text-text-tertiary">
                <p className="mb-2">
                  <strong>참고</strong>:{' '}
                  <a href="https://www.hometax.go.kr" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-600 underline dark:text-primary-500">국세청 홈택스</a>{' '}
                  ·{' '}
                  <a href="https://www.wetax.go.kr" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-600 underline dark:text-primary-500">위택스</a>{' '}
                  ·{' '}
                  <a href="https://www.nts.go.kr" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-600 underline dark:text-primary-500">국세청</a>
                </p>
                <p><strong>업데이트</strong>: {DATE_MODIFIED} · 작성·검수: 김준혁 (스마트데이터샵)</p>
              </section>
            </article>
          </main>
        </div>
        <Footer />
      </div>
    </>
  );
}
