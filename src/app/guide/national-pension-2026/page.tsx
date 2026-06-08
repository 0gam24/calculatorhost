import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { Footer } from '@/components/layout/Footer';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { AdSlot } from '@/components/ads/AdSlot';
import { FaqSection } from '@/components/calculator/FaqSection';
import { ShareButtons } from '@/components/calculator/ShareButtons';
import {
  buildBreadcrumbJsonLd,
  buildArticleJsonLd,
  buildWebPageJsonLd,
  buildFaqPageJsonLd,
  buildSpeakableJsonLd,
} from '@/lib/seo/jsonld';

const URL = 'https://calculatorhost.com/guide/national-pension-2026/';
const DATE_PUBLISHED = '2026-06-08';
const DATE_MODIFIED = '2026-06-08';

export const metadata: Metadata = {
  title: '국민연금 2026 — 보험료율 9.5%·수령나이·예상수령액·개혁',
  description:
    '2026년 국민연금 개혁으로 보험료율 9%→9.5%, 소득대체율 41.5%→43%로 인상됩니다. 출생연도별 수령나이(61~65세), 예상수령액 결정 방법, 조기수령(최대 30%↓)·연기연금(최대 36%↑) 손익까지 정리했습니다.',
  keywords: [
    '국민연금',
    '국민연금 2026',
    '국민연금 보험료율',
    '국민연금 수령나이',
    '국민연금 예상수령액',
    '국민연금 개혁',
    '조기노령연금',
    '연기연금',
    '소득대체율',
    '국민연금법 61조',
  ],
  alternates: { canonical: URL },
  openGraph: {
    title: '국민연금 2026 — 보험료율 9.5%·수령나이·예상수령액·개혁',
    description:
      '2026년 보험료율 9%→9.5%, 소득대체율 41.5%→43%. 출생연도별 수령나이, 조기수령·연기연금 손익 정리.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
    images: ['/og-default.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: '국민연금 2026 — 보험료율 9.5%·수령나이·개혁',
    description: '보험료율·소득대체율 인상, 수령나이, 조기·연기연금 손익 완정리.',
    images: ['/og-default.png'],
  },
};

const FAQ_ITEMS = [
  {
    question: '2026년 국민연금 보험료율은 얼마인가요?',
    answer:
      '2026년 보험료율은 9.5%입니다. 2025년까지 9%였으나 연금개혁에 따라 2026년부터 매년 0.5%포인트씩 올라 2033년 13%에 도달합니다. 직장가입자는 회사와 절반씩 부담하므로 본인 부담은 4.75%이고, 지역가입자는 9.5% 전액을 본인이 냅니다.',
  },
  {
    question: '국민연금은 몇 살부터 받을 수 있나요?',
    answer:
      '출생연도에 따라 다릅니다. 1953~56년생은 61세, 1957~60년생은 62세, 1961~64년생은 63세, 1965~68년생은 64세, 1969년생 이후는 65세부터 노령연금을 받습니다. 가입기간이 10년(120개월) 이상이어야 받을 수 있습니다.',
  },
  {
    question: '국민연금을 일찍 받으면 얼마나 줄어드나요?',
    answer:
      '조기노령연금은 1년 일찍 받을 때마다 6%씩 감액됩니다. 최대 5년까지 앞당길 수 있어 최대 30%가 줄어듭니다. 예를 들어 정상 수령액이 월 100만원이면 5년 일찍 받을 경우 70만원만 받습니다. 한번 감액된 금액은 평생 유지되므로 신중해야 합니다.',
  },
  {
    question: '연기연금은 얼마나 늘어나나요?',
    answer:
      '연기연금은 1년 미룰 때마다 7.2%씩 늘어납니다. 최대 5년까지 미룰 수 있어 최대 36%가 증액됩니다. 월 100만원이면 5년 연기 시 136만원을 평생 받습니다. 건강하고 다른 소득이 있어 당장 연금이 급하지 않다면 유리할 수 있습니다.',
  },
  {
    question: '소득대체율이 43%로 오르면 내 연금도 오르나요?',
    answer:
      '2026년 이후 가입기간에 대해 적용됩니다. 소득대체율은 40년 가입 기준 생애 평균소득 대비 연금 비율로, 2025년 41.5%에서 2026년 43%로 인상됩니다. 다만 이는 전체 가입기간에 일괄 소급되는 것이 아니라 연도별 가입분에 비례해 반영되므로, 실제 인상 폭은 개인의 남은 가입기간에 따라 다릅니다.',
  },
  {
    question: '내 예상수령액은 어디서 정확히 확인하나요?',
    answer:
      '국민연금공단 누리집(nps.or.kr)이나 모바일 앱 "내 곁에 국민연금"의 "내 연금 알아보기"에서 확인합니다. 공동인증서나 간편인증으로 로그인하면 현재까지 낸 보험료를 기준으로 한 예상연금액을 바로 조회할 수 있습니다. 가입 내역과 추후 납부 계획도 함께 확인하세요.',
  },
  {
    question: '국민연금 보험료도 연말정산에서 공제되나요?',
    answer:
      '전액 소득공제됩니다. 근로자가 낸 국민연금 보험료(본인 부담분)는 연말정산 시 연금보험료 공제로 전액 공제됩니다. 반대로 나중에 연금을 받을 때는 2002년 이후 납입분에 대응하는 연금에 연금소득세가 부과되어, 납입 때 공제하고 수령 때 과세하는 구조입니다.',
  },
] as const;

export default function NationalPension2026() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '국민연금 2026 — 보험료율·수령나이·예상수령액' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '국민연금 2026 — 보험료율 9.5%·수령나이·예상수령액·개혁',
    description:
      '2026년 국민연금 개혁(보험료율 9%→9.5%, 소득대체율 41.5%→43%), 출생연도별 수령나이, 예상수령액 확인 방법, 조기수령·연기연금 손익을 정리했습니다.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['국민연금', '국민연금 보험료율', '국민연금 수령나이', '조기노령연금', '연기연금'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '국민연금 2026 — 보험료율·수령나이·예상수령액·개혁',
    description:
      '2026년 보험료율 9.5%·소득대체율 43%. 출생연도별 수령나이(61~65세), 조기수령(최대 30%↓)·연기연금(최대 36%↑) 손익.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
  });
  const faqLd = buildFaqPageJsonLd([...FAQ_ITEMS]);
  const speakableLd = buildSpeakableJsonLd(['[data-speakable]']);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableLd) }} />

      <div className="min-h-screen bg-bg-base">
        <Header />
        <div className="flex">
          <Sidebar />
          <main id="main-content" className="flex-1 px-4 py-8 md:px-8">
            <article className="mx-auto max-w-3xl space-y-8">
              <header>
                <Breadcrumb
                  items={[
                    { name: '홈', href: '/' },
                    { name: '가이드', href: '/guide/' },
                    { name: '국민연금 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">근로 · 10분 읽기 · 2026-06-08</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  국민연금 2026
                  <br />
                  <span className="text-2xl text-text-secondary">— 보험료율 9.5%·수령나이·예상수령액·개혁</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  2026년은 18년 만의 국민연금 개혁이 처음 적용되는 해입니다.
                  보험료율은 9%에서 <strong>9.5%</strong>로, 소득대체율은 41.5%에서 <strong>43%</strong>로 오릅니다.
                  내 국민연금은 몇 살부터, 얼마를 받을 수 있는지 — 출생연도별 수령나이, 예상수령액 확인 방법, 조기수령과 연기연금의 손익까지 정확히 정리했습니다.
                </p>
              </header>

              <AdSlot slot="guide-national-pension-top" format="horizontal" />

              <section aria-label="핵심 요약" className="card border-l-4 border-l-primary-500">
                <h2 className="mb-2 text-caption uppercase tracking-wider text-primary-500">핵심 요약</h2>
                <div className="space-y-3 text-sm" data-speakable>
                  <table className="w-full border-collapse text-sm">
                    <caption className="mb-2 font-semibold text-text-primary">2026년 국민연금 주요 정보</caption>
                    <thead>
                      <tr className="bg-primary-500/10">
                        <th scope="col" className="border border-border-base px-2 py-2 text-left">항목</th>
                        <th scope="col" className="border border-border-base px-2 py-2 text-left">내용</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="bg-primary-500/5">
                        <td className="border border-border-base px-2 py-1 font-semibold">2026 보험료율</td>
                        <td className="border border-border-base px-2 py-1 font-bold text-primary-600 dark:text-primary-400">
                          9.5% (2025년 9% → 매년 0.5%p, 2033년 13%)
                        </td>
                      </tr>
                      <tr className="bg-primary-500/5">
                        <td className="border border-border-base px-2 py-1 font-semibold">2026 소득대체율</td>
                        <td className="border border-border-base px-2 py-1 font-bold text-primary-600 dark:text-primary-400">
                          43% (2025년 41.5% → 일시 인상)
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-border-base px-2 py-1 font-semibold">수령나이</td>
                        <td className="border border-border-base px-2 py-1">출생연도별 61~65세 (1969년생~ 65세)</td>
                      </tr>
                      <tr>
                        <td className="border border-border-base px-2 py-1 font-semibold">최소 가입기간</td>
                        <td className="border border-border-base px-2 py-1">10년(120개월) 이상</td>
                      </tr>
                      <tr>
                        <td className="border border-border-base px-2 py-1 font-semibold">조기노령연금</td>
                        <td className="border border-border-base px-2 py-1">최대 5년 일찍, 1년당 6% 감액 (최대 30%↓)</td>
                      </tr>
                      <tr>
                        <td className="border border-border-base px-2 py-1 font-semibold">연기연금</td>
                        <td className="border border-border-base px-2 py-1">최대 5년 연기, 1년당 7.2% 증액 (최대 36%↑)</td>
                      </tr>
                      <tr>
                        <td className="border border-border-base px-2 py-1 font-semibold">시행</td>
                        <td className="border border-border-base px-2 py-1">2026년 1월 1일</td>
                      </tr>
                      <tr>
                        <td className="border border-border-base px-2 py-1 font-semibold">법적 근거</td>
                        <td className="border border-border-base px-2 py-1">국민연금법 §61·§62·§63·§88</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">1. 국민연금이란? — 10년 채우면 평생 받는 노령연금</h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  국민연금의 대표 급여는 노령연금이며, 가입기간이 10년(120개월) 이상이면 출생연도별 지급개시연령부터 사망할 때까지 매월 받습니다(국민연금법 §61).
                  보험료는 기준소득월액에 보험료율을 곱해 정해집니다.
                  직장가입자는 회사와 본인이 절반씩 부담하고, 지역가입자(자영업자·프리랜서)는 본인이 전액 부담합니다.
                </p>
                <div className="rounded-lg border border-danger-500 border-l-4 bg-danger-500/5 p-4">
                  <p className="text-sm text-danger-700 dark:text-danger-300">
                    <strong>⚠️ 다만,</strong> 가입기간이 10년에 못 미치면 노령연금을 받지 못하고 그동안 낸 보험료에 이자를 더한 반환일시금만 받습니다.
                    가입기간이 부족하면 임의계속가입이나 추후납부(추납)로 10년을 채우는 방법을 검토하세요.
                  </p>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">2. 2026년 무엇이 바뀌나? — 보험료율과 소득대체율 인상</h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  2025년 통과된 연금개혁으로 2026년부터 더 내고 더 받는 구조로 바뀝니다.
                  보험료율은 2026년 9.5%로 오른 뒤 매년 0.5%포인트씩 인상되어 2033년 13%에 도달합니다(국민연금법 §88).
                  소득대체율은 2026년 43%로 한 번에 올라 고정됩니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-3 font-semibold text-text-primary">보험료율 인상 로드맵 (2025~2033년)</caption>
                    <thead>
                      <tr className="bg-primary-500/10 border border-border-base">
                        <th scope="col" className="px-3 py-2 text-left">연도</th>
                        <th scope="col" className="px-3 py-2 text-left">보험료율</th>
                        <th scope="col" className="px-3 py-2 text-left">직장인 본인부담</th>
                      </tr>
                    </thead>
                    <tbody className="text-text-secondary">
                      <tr className="border border-border-base">
                        <td className="px-3 py-2 font-semibold">2025년</td>
                        <td className="px-3 py-2">9.0%</td>
                        <td className="px-3 py-2">4.5%</td>
                      </tr>
                      <tr className="border border-border-base bg-primary-500/5">
                        <td className="px-3 py-2 font-semibold">2026년</td>
                        <td className="px-3 py-2 font-bold text-primary-600 dark:text-primary-400">9.5%</td>
                        <td className="px-3 py-2 font-bold text-primary-600 dark:text-primary-400">4.75%</td>
                      </tr>
                      <tr className="border border-border-base">
                        <td className="px-3 py-2 font-semibold">2027년</td>
                        <td className="px-3 py-2">10.0%</td>
                        <td className="px-3 py-2">5.0%</td>
                      </tr>
                      <tr className="border border-border-base">
                        <td className="px-3 py-2 font-semibold">…매년 0.5%p…</td>
                        <td className="px-3 py-2">…</td>
                        <td className="px-3 py-2">…</td>
                      </tr>
                      <tr className="border border-border-base">
                        <td className="px-3 py-2 font-semibold">2033년</td>
                        <td className="px-3 py-2 font-bold text-primary-600 dark:text-primary-400">13.0%</td>
                        <td className="px-3 py-2 font-bold text-primary-600 dark:text-primary-400">6.5%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-raised p-4">
                  <p className="text-sm text-text-secondary">
                    <strong>💡 보험료가 얼마나 오르나:</strong> 전체 가입자 평균소득(약 월 309만원)에 해당하는 사람이라면 보험료(총액)가 2025년 약 27.8만원에서 2026년 약 29.4만원으로 오릅니다.
                    직장가입자는 이 중 절반만 본인이 부담합니다. 함께 시행되는 <strong>국가의 연금 지급 보장</strong> 명문화로 기금 소진 우려에 대한 안전장치도 마련됐습니다.
                  </p>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">3. 몇 살부터 받나? — 출생연도별 수령나이</h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  노령연금 지급개시연령은 출생연도에 따라 61세에서 65세까지 단계적으로 높아집니다.
                  1969년생 이후는 모두 65세부터 받습니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-3 font-semibold text-text-primary">출생연도별 노령연금 지급개시연령</caption>
                    <thead>
                      <tr className="bg-primary-500/10 border border-border-base">
                        <th scope="col" className="px-3 py-2 text-left">출생연도</th>
                        <th scope="col" className="px-3 py-2 text-left">수령나이</th>
                        <th scope="col" className="px-3 py-2 text-left">조기수령 가능</th>
                      </tr>
                    </thead>
                    <tbody className="text-text-secondary">
                      <tr className="border border-border-base">
                        <td className="px-3 py-2 font-semibold">1953~1956년생</td>
                        <td className="px-3 py-2">61세</td>
                        <td className="px-3 py-2">56세</td>
                      </tr>
                      <tr className="border border-border-base">
                        <td className="px-3 py-2 font-semibold">1957~1960년생</td>
                        <td className="px-3 py-2">62세</td>
                        <td className="px-3 py-2">57세</td>
                      </tr>
                      <tr className="border border-border-base">
                        <td className="px-3 py-2 font-semibold">1961~1964년생</td>
                        <td className="px-3 py-2">63세</td>
                        <td className="px-3 py-2">58세</td>
                      </tr>
                      <tr className="border border-border-base">
                        <td className="px-3 py-2 font-semibold">1965~1968년생</td>
                        <td className="px-3 py-2">64세</td>
                        <td className="px-3 py-2">59세</td>
                      </tr>
                      <tr className="border border-border-base bg-primary-500/5">
                        <td className="px-3 py-2 font-semibold">1969년생 이후</td>
                        <td className="px-3 py-2 font-bold text-primary-600 dark:text-primary-400">65세</td>
                        <td className="px-3 py-2">60세</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              <AdSlot slot="guide-national-pension-mid" format="rectangle" />

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">4. 얼마나 받나? — 예상수령액을 정하는 3가지</h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  노령연금액은 크게 세 가지로 정해집니다(국민연금법 §63).
                  ① 전체 가입자의 평균소득(A값, 균등 부분), ② 내가 가입 기간 동안 번 평균소득(B값, 소득비례 부분), ③ 가입기간입니다.
                  가입기간이 길수록, 소득이 높을수록 연금이 늘어나며, A값이 포함돼 소득이 낮아도 일정 수준이 보장되는 소득재분배 구조입니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <h3 className="font-semibold text-text-primary mb-2">정확한 금액은 공단 모의계산으로</h3>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    기본연금액 산식에는 매년 바뀌는 A값과 소득대체율 비례상수가 들어가 손으로 계산하기 어렵습니다.
                    국민연금공단 누리집(nps.or.kr) 또는 앱 &ldquo;내 곁에 국민연금&rdquo;의 &ldquo;내 연금 알아보기&rdquo;에서 로그인하면, 지금까지 낸 보험료를 기준으로 한 예상연금액을 바로 확인할 수 있습니다.
                  </p>
                </div>
                <div className="rounded-lg border border-danger-500 border-l-4 bg-danger-500/5 p-4">
                  <p className="text-sm text-danger-700 dark:text-danger-300">
                    <strong>⚠️ 주의:</strong> 블로그 등에서 보이는 &ldquo;평균 수령액 ○○만원&rdquo;은 본인 상황과 다를 수 있습니다.
                    가입기간·소득 이력이 사람마다 달라, 반드시 본인 인증 후 조회한 금액을 기준으로 노후를 설계하세요.
                  </p>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">5. 일찍 받을까 미룰까? — 조기수령 vs 연기연금</h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  수령 시기는 정상 시기보다 최대 5년 앞당기거나(조기노령연금, §61②) 최대 5년 미룰 수 있습니다(연기연금, §62).
                  앞당기면 1년당 6%씩 줄고(최대 30% 감액), 미루면 1년당 7.2%씩 늘어납니다(최대 36% 증액).
                  한번 정해진 감액·증액률은 평생 유지됩니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-3 font-semibold text-text-primary">수령 시기별 연금액 (정상 월 100만원 가정)</caption>
                    <thead>
                      <tr className="bg-primary-500/10 border border-border-base">
                        <th scope="col" className="px-3 py-2 text-left">수령 시기</th>
                        <th scope="col" className="px-3 py-2 text-left">조정률</th>
                        <th scope="col" className="px-3 py-2 text-left">월 수령액</th>
                      </tr>
                    </thead>
                    <tbody className="text-text-secondary">
                      <tr className="border border-border-base">
                        <td className="px-3 py-2 font-semibold">5년 조기</td>
                        <td className="px-3 py-2">-30%</td>
                        <td className="px-3 py-2">70만원</td>
                      </tr>
                      <tr className="border border-border-base">
                        <td className="px-3 py-2 font-semibold">1년 조기</td>
                        <td className="px-3 py-2">-6%</td>
                        <td className="px-3 py-2">94만원</td>
                      </tr>
                      <tr className="border border-border-base bg-primary-500/5">
                        <td className="px-3 py-2 font-semibold">정상 수령</td>
                        <td className="px-3 py-2">0%</td>
                        <td className="px-3 py-2 font-bold text-primary-600 dark:text-primary-400">100만원</td>
                      </tr>
                      <tr className="border border-border-base">
                        <td className="px-3 py-2 font-semibold">1년 연기</td>
                        <td className="px-3 py-2">+7.2%</td>
                        <td className="px-3 py-2">107.2만원</td>
                      </tr>
                      <tr className="border border-border-base">
                        <td className="px-3 py-2 font-semibold">5년 연기</td>
                        <td className="px-3 py-2">+36%</td>
                        <td className="px-3 py-2">136만원</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-raised p-4">
                  <p className="text-sm text-text-secondary">
                    <strong>💡 어떻게 고를까:</strong> 당장 생활비가 급하거나 건강이 좋지 않아 기대수명이 짧다면 조기수령이 유리할 수 있습니다.
                    반대로 다른 소득이 있고 건강해 오래 받을 것으로 예상되면 연기연금이 총수령액에서 유리합니다.
                    또 조기수령은 다른 소득이 일정 기준을 넘으면 신청이 제한되므로 본인 소득 상황도 함께 확인하세요.
                  </p>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">6. 보험료는 공제, 연금은 과세 — 세금 구조</h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  국민연금은 낼 때 세금을 깎아주고 받을 때 세금을 매기는 구조입니다.
                  근로자가 낸 보험료(본인 부담분)는 연말정산에서 연금보험료 공제로 전액 소득공제됩니다.
                  반대로 노령연금을 받을 때는 2002년 1월 이후 납입분에 대응하는 연금에 연금소득세가 부과됩니다(2001년 이전 납입분 대응 연금은 비과세).
                </p>
              </section>

              <FaqSection items={[...FAQ_ITEMS]} />

              <section className="card">
                <h2 className="mb-3 text-lg font-semibold">관련 가이드</h2>
                <ul className="space-y-2 text-sm">
                  <li>
                    →{' '}
                    <Link href="/calculator/salary/" className="text-primary-600 underline dark:text-primary-500">
                      연봉 실수령액 계산기
                    </Link>
                    {' — 국민연금 등 4대보험 공제 후 세후 월급 확인'}
                  </li>
                  <li>
                    →{' '}
                    <Link href="/guide/severance-vs-pension-dc-db/" className="text-primary-600 underline dark:text-primary-500">
                      퇴직금 DC·DB 비교
                    </Link>
                    {' — 국민연금과 함께 노후를 떠받치는 퇴직연금'}
                  </li>
                  <li>
                    →{' '}
                    <Link href="/guide/private-pension-1500-million-separate-taxation-2026/" className="text-primary-600 underline dark:text-primary-500">
                      사적연금 1,500만원 분리과세 2026
                    </Link>
                    {' — 연금저축·IRP 수령 시 세금 갈림길'}
                  </li>
                  <li>
                    →{' '}
                    <Link href="/guide/income-deduction-vs-tax-credit-2026/" className="text-primary-600 underline dark:text-primary-500">
                      소득공제 vs 세액공제 2026
                    </Link>
                    {' — 국민연금 보험료 공제가 적용되는 연말정산 구조'}
                  </li>
                  <li>
                    →{' '}
                    <Link href="/category/work/" className="text-primary-600 underline dark:text-primary-500">
                      근로 계산기·가이드
                    </Link>
                    {' — 연봉·퇴직금·은퇴자금 등 직장인·은퇴 필수 도구'}
                  </li>
                </ul>
              </section>

              <ShareButtons
                title="국민연금 2026 — 보험료율 9.5%·수령나이·예상수령액·개혁"
                url={URL}
                description="2026년 보험료율 9%→9.5%, 소득대체율 41.5%→43%. 출생연도별 수령나이, 조기수령·연기연금 손익 정리."
              />

              <section
                aria-label="출처 및 면책"
                className="rounded-lg border border-border-base p-4 text-caption text-text-tertiary"
              >
                <p className="mb-2">
                  <strong>법적 근거</strong>: 국민연금법 §61(노령연금 수급권자)·§61②(조기노령연금)·§62(연기연금, 월 0.6% 증액)·§63(노령연금액)·§88(연금보험료) ·{' '}
                  <a
                    href="https://www.nps.or.kr"
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="text-primary-600 underline dark:text-primary-500"
                  >
                    국민연금공단 (nps.or.kr)
                  </a>{' '}
                  ·{' '}
                  <a
                    href="https://www.mohw.go.kr"
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="text-primary-600 underline dark:text-primary-500"
                  >
                    보건복지부 (mohw.go.kr)
                  </a>{' '}
                  ·{' '}
                  <a
                    href="https://www.law.go.kr"
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="text-primary-600 underline dark:text-primary-500"
                  >
                    국가법령정보센터 (law.go.kr)
                  </a>{' '}
                  .
                </p>
                <p className="mb-2">
                  <strong>면책조항</strong>: 본 가이드는 2026년 6월 8일 기준 시행 중인 국민연금법령과 2025년 연금개혁 내용을 바탕으로 작성되었습니다.
                  보험료율·소득대체율·지급개시연령은 법령 개정에 따라 달라질 수 있고, A값 등 산식 변수는 매년 변동됩니다.
                  본인의 정확한 예상수령액과 수급 조건은 국민연금공단(nps.or.kr) &ldquo;내 연금 알아보기&rdquo; 또는 국번 없이 1355에서 확인하시기 바랍니다.
                  본 콘텐츠는 AI 보조 작성 후 운영자 검수를 거쳤습니다.
                </p>
                <p>
                  <strong>업데이트</strong>: {DATE_MODIFIED} · 작성·검수: 김준혁 (calculatorhost)
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
