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

const URL = 'https://calculatorhost.com/guide/national-pension-additional-payment-2026/';
const DATE_PUBLISHED = '2026-07-19';
const DATE_MODIFIED = '2026-07-19';

export const metadata: Metadata = {
  title: '국민연금 추납 2026 | 추후납부 대상·한도·계산법',
  description:
    '국민연금 추납(추후납부)은 과거 못 낸 보험료를 나중에 내 가입기간을 복원하는 제도입니다. 최대 119개월, 60회 분할 가능하며 국민연금법 92조 기준 2025년 11월 개정으로 보험료 산정 기준월이 바뀌었습니다.',
  keywords: [
    '국민연금 추납',
    '국민연금 추후납부',
    '추납 한도 119개월',
    '국민연금 가입기간 복원',
    '경력단절 국민연금',
    '전업주부 국민연금 추납',
    '국민연금법 92조',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '국민연금 추납 2026, 추후납부 대상·한도·계산법' }],
    title: '국민연금 추납 2026, 추후납부로 가입기간 복원하는 법',
    description: '경력단절·전업주부도 신청 가능한 국민연금 추후납부. 최대 119개월 한도와 분할납부, 계산 사례까지 정리.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '국민연금 추납 2026, 추후납부 한도·계산법',
    description: '가입기간을 늘려 노령연금 수급요건을 채우는 추납 제도. 국민연금법 §92 기준 최대 119개월, 60회 분할.',
  },
};

const FAQ_ITEMS = [
  {
    question: '국민연금 추납이 정확히 무엇인가요?',
    answer:
      '추납(추후납부)은 과거 소득이 없어 보험료를 내지 못한 기간의 연금보험료를 나중에 추가로 납부해 가입기간을 복원·연장하는 제도입니다(국민연금법 §92). 실직·휴직·경력단절·전업주부 시기처럼 납부예외였거나 적용제외였던 기간이 대상이며, 현재 국민연금에 가입 중이어야(임의가입 포함) 신청할 수 있습니다.',
  },
  {
    question: '추납은 최대 몇 개월까지 가능한가요?',
    answer:
      '최대 119개월(약 10년 미만)까지 가능합니다(국민연금법 §92). 과거 납부예외·적용제외 기간이 이보다 길어도 119개월을 초과하는 부분은 추납 대상에서 제외됩니다. 분할납부는 최대 60회까지 나눠 낼 수 있어 목돈 부담을 줄일 수 있습니다.',
  },
  {
    question: '추납보험료는 어떻게 계산하나요?',
    answer:
      '추납보험료는 신청 시점의 월 연금보험료에 추납하려는 개월수를 곱해 산정합니다(국민연금법 §92). 예를 들어 월 보험료가 9만원이고 60개월을 추납하면 9만원×60개월=540만원이 되며, 이 금액을 최대 60회로 나눠 분할납부할 수 있습니다.',
  },
  {
    question: '2025년 11월 개정으로 무엇이 바뀌었나요?',
    answer:
      '2025년 11월 25일 국민연금법 §92 개정으로 추납보험료 산정 기준월이 종전 신청한 날이 속하는 달에서 납부기한이 속하는 달로 바뀌었습니다. 분할납부처럼 납부 시점이 늦어지는 경우에도 기준월이 실제 납부기한에 맞춰지도록 조정해 가입자 간 형평성을 개선한 조치입니다.',
  },
  {
    question: '전업주부도 국민연금 추납을 신청할 수 있나요?',
    answer:
      '네, 가능합니다. 전업주부는 통상 임의가입으로 국민연금에 가입한 뒤, 과거 소득이 없어 납부예외였던 기간에 대해 추납을 신청할 수 있습니다. 다만 임의가입자는 기준소득월액에 상한·하한이 적용되므로 월 보험료 수준은 국민연금공단 고시를 확인해야 합니다.',
  },
  {
    question: '추납을 하면 노령연금 수급요건을 채울 수 있나요?',
    answer:
      '가입기간이 늘어나므로 도움이 될 수 있습니다. 노령연금은 최소 가입기간 10년(120개월)을 채워야 받을 수 있는데, 경력단절 등으로 가입기간이 모자란 경우 추납으로 최대 119개월분 기간을 복원하면 수급요건 충족에 근접하거나 도달할 수 있습니다. 다만 정확한 잔여 가입기간은 국민연금공단에서 개별 확인이 필요합니다.',
  },
  {
    question: '추납보험료를 한 번에 내야 하나요?',
    answer:
      '아니요, 최대 60회까지 나눠 낼 수 있습니다(국민연금법 §92). 예를 들어 540만원을 60회로 나누면 회당 약 9만원 수준이 되어 목돈 부담이 크게 줄어듭니다. 다만 분할 회차가 길어질수록 완납 시점도 늦어져 가입기간 복원 효과가 늦게 반영될 수 있습니다.',
  },
  {
    question: '추납 신청은 어디서 하나요?',
    answer:
      '국민연금공단 지사 방문 또는 국민연금공단 홈페이지·전화상담을 통해 신청할 수 있습니다. 신청 전 본인의 납부예외·적용제외 기간과 추납 가능 개월수, 예상 보험료를 국민연금공단에서 먼저 확인하는 것이 안전합니다.',
  },
];

export default function NationalPensionAdditionalPayment2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '국민연금 추납 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '국민연금 추납 2026, 추후납부로 가입기간 복원하는 법',
    description:
      '경력단절·전업주부·노후준비 대상자를 위한 국민연금 추후납부(추납) 완전 정리. 대상 요건, 최대 119개월 한도, 60회 분할납부, 2025년 11월 개정 내용, 계산 사례까지.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['국민연금', '추납', '추후납부', '가입기간', '임의가입'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '국민연금 추납 2026',
    description:
      '과거 납부예외·적용제외 기간의 보험료를 나중에 납부해 국민연금 가입기간을 복원하는 추납 제도의 대상·한도·계산법.',
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
                    { name: '국민연금 추납 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">국민연금 가입자 · 8분 읽기 · 2026-07-19</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  국민연금 추납 2026
                  <br />
                  <span className="text-2xl text-text-secondary">추후납부로 가입기간 복원하는 법</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  경력단절·전업주부처럼 한동안 소득이 없어 국민연금 보험료를 내지 못한 기간이 있다면, 추후납부(추납) 제도로 그 기간을 나중에 채워 가입기간을 복원할 수 있습니다. 이 가이드는 누가 신청할 수 있는지, 최대 몇 개월까지 가능한지, 보험료는 어떻게 계산되는지, 그리고 2025년 11월 개정으로 무엇이 바뀌었는지까지 정리합니다.
                </p>
              </header>

              <AdSlot slot="guide-national-pension-additional-payment-top" format="horizontal" />

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">국민연금 추납이란 무엇인가</h2>
                <p>
                  국민연금 추납은 과거 납부예외기간·적용제외기간(실직·휴직·경력단절·무소득 등) 동안 내지 못한 보험료를 나중에 추가로 납부해 가입기간을 복원·연장하는 제도입니다(국민연금법 §92). 신청하려면 현재 국민연금에 가입 중이어야 하며, 소득이 없는 전업주부라도 임의가입으로 국민연금에 가입한 상태라면 신청 대상이 됩니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">추납의 기본 원리</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    과거 보험료를 내지 못한 기간만큼 가입기간이 빠져 있는 상태에서, 그 기간에 해당하는 보험료를 지금 납부하면 그만큼 가입기간이 그대로 복원됩니다.
                    <br />
                    예: 경력단절 3년(36개월) 동안 보험료 미납 → 지금 36개월분을 추납 → 가입기간 36개월 복원
                  </p>
                </div>
                <p className="mt-4">
                  다만 추납은 국민연금 가입 이력이 있는 사람만 신청할 수 있는 제도입니다. 국민연금에 한 번도 가입한 적이 없다면 추납 대상 자체가 존재하지 않으므로, 우선 임의가입부터 신청해야 합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">추납 한도와 분할납부는 어떻게 되나</h2>
                <p>
                  추납 가능 기간은 최대 119개월(약 10년 미만)로 제한됩니다(국민연금법 §92). 과거 미납 기간이 이보다 길더라도 119개월을 초과하는 부분은 추납할 수 없습니다. 보험료 납부 부담을 줄이기 위해 분할납부도 가능한데, 최대 60회까지 나눠 낼 수 있습니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 국민연금 추후납부 한도 및 분할납부 요약 (국민연금법 §92, 2026 기준)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">구분</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">내용</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">근거</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">신청 자격</td>
                        <td className="p-3">현재 국민연금 가입 중(임의가입 포함)</td>
                        <td className="p-3">§92</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">추납 가능 기간 한도</td>
                        <td className="p-3"><strong>최대 119개월</strong>(약 10년 미만)</td>
                        <td className="p-3">§92</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">분할납부 회차</td>
                        <td className="p-3"><strong>최대 60회</strong></td>
                        <td className="p-3">§92</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">보험료 산정 기준월</td>
                        <td className="p-3">납부기한이 속하는 달 (2025-11-25 개정)</td>
                        <td className="p-3">§92</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  다만 분할납부 회차를 늘릴수록 완납까지 걸리는 기간도 길어져, 가입기간이 실제로 모두 복원되는 시점 역시 늦춰집니다. 노령연금 수급 시기가 임박했다면 완납 일정을 미리 계산해두는 것이 안전합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">2025년 11월 개정으로 무엇이 바뀌었나</h2>
                <p>
                  2025년 11월 25일 국민연금법 §92 개정으로 추납보험료 산정 기준월이 종전 신청한 날이 속하는 달에서 납부기한이 속하는 달로 변경되었습니다. 이전에는 분할납부처럼 실제 납부가 늦어져도 보험료 산정 기준이 최초 신청일에 고정되어 있었는데, 이번 개정으로 실제 납부기한을 기준으로 산정하도록 바뀌어 가입자 간 형평성이 개선되었습니다.
                </p>
                <p className="mt-4">
                  다만 이 개정이 모든 기존 신청 건에 소급 적용되는지는 신청 시점과 개별 사정에 따라 달라질 수 있으므로, 이미 추납을 신청했거나 진행 중이라면 국민연금공단에 정확한 적용 기준을 확인하는 것이 필요합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">추납보험료 계산 사례</h2>
                <p>
                  추납보험료는 신청 시점의 월 연금보험료에 추납 개월수를 곱해 산정합니다(국민연금법 §92). 다음 사례로 실제 계산 흐름을 확인해보겠습니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 1. 60개월 추납, 분할납부 활용</p>
                  <p className="text-sm text-text-secondary">
                    · 신청 시점 월 연금보험료: 9만원
                    <br />
                    · 추납 개월수: 60개월
                    <br />
                    · 추납보험료: 9만원 × 60개월 = <strong>540만원</strong>
                    <br />
                    · 60회 분할납부 시 회당 약 9만원 수준으로 부담 완화
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 가입기간 60개월이 복원되며, 목돈 대신 분할로 부담을 나눌 수 있습니다.</span>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 2. 경력단절 3년(36개월) 추납</p>
                  <p className="text-sm text-text-secondary">
                    · 신청 시점 월 연금보험료: 9만원
                    <br />
                    · 추납 개월수: 36개월
                    <br />
                    · 추납보험료: 9만원 × 36개월 = <strong>324만원</strong>
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 경력단절 3년분 가입기간이 그대로 복원됩니다.</span>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 3. 한도 초과 경계값</p>
                  <p className="text-sm text-text-secondary">
                    · 과거 미납 기간: 10년(120개월)
                    <br />
                    · 추납 가능 한도: 최대 119개월
                    <br />
                    · 결과: 119개월분만 추납 신청 가능, 초과분 1개월은 추납 대상에서 제외
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 미납 기간이 한도를 넘으면 초과분은 복원되지 않으므로 전체 미납 기간을 미리 확인해야 합니다.</span>
                  </p>
                </div>
              </section>

              <AdSlot slot="guide-national-pension-additional-payment-mid" format="rectangle" />

              <section className="space-y-6 border-t border-border-base pt-8" data-speakable>
                <h2 className="text-2xl font-bold">추납, 노령연금 수급요건에 어떻게 도움이 되나</h2>
                <p>
                  추납으로 가입기간이 늘면 노령연금 최소 가입요건인 10년(120개월) 충족에 가까워지거나 도달할 수 있습니다. 가입기간이 짧아 아예 노령연금을 받지 못할 처지였던 경우, 추납으로 부족한 개월수를 채우면 수급 자체가 가능해질 수 있습니다. 또한 가입기간이 길어질수록 매월 받는 연금월액도 늘어나는 구조입니다.
                </p>
                <p className="mt-4">
                  다만 추납만으로 항상 수급요건이 채워지는 것은 아닙니다. 추납 한도가 최대 119개월로 제한되어 있어, 미납 기간이 이보다 훨씬 길다면 추납만으로는 부족분을 전부 메우지 못할 수 있습니다. 이 경우 임의계속가입 등 다른 제도와 병행을 검토해야 합니다.
                </p>
              </section>

              <section className="space-y-6 border-t border-border-base pt-8">
                <h2 className="text-2xl font-bold">추납 신청 전 꼭 확인해야 할 것</h2>
                <p>
                  추납은 가입기간을 늘려주는 유용한 제도이지만, 신청 전에 다음 사항을 반드시 확인해야 합니다.
                </p>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li>
                    <strong>목돈 부담:</strong> 추납보험료는 개월수에 비례해 커지므로, 119개월 전액을 한 번에 신청하면 수백만원에서 천만원 이상의 목돈이 필요할 수 있습니다. 분할납부와 신청 시점을 함께 고려해야 합니다.
                  </li>
                  <li>
                    <strong>임의가입자 기준소득월액 상·하한:</strong> 임의가입자는 기준소득월액에 상한과 하한이 적용되므로, 월 보험료가 임의로 정해지는 것이 아니라 국민연금공단 고시 범위 안에서 결정됩니다.
                  </li>
                  <li>
                    <strong>완납 시점:</strong> 분할납부를 선택하면 완납 시점이 늦어지고, 그만큼 가입기간이 완전히 복원되는 시점도 늦춰집니다. 노령연금 수급 시기가 가까우면 완납 일정을 미리 계산해야 합니다.
                  </li>
                </ul>
              </section>

              <h2 className="text-2xl font-bold mb-6">자주 묻는 질문</h2>
              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h3 className="text-lg font-semibold text-text-primary">관련 계산기 및 가이드</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link
                    href="/guide/national-pension-voluntary-subscription-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">국민연금 임의가입 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">전업주부·무소득자의 임의가입 조건과 절차를 확인하세요.</p>
                  </Link>
                  <Link
                    href="/guide/national-pension-expected-benefit-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">국민연금 예상수령액 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">가입기간을 늘리면 연금월액이 얼마나 늘어나는지 확인하세요.</p>
                  </Link>
                  <Link
                    href="/guide/national-pension-early-deferred-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">국민연금 조기·연기수령 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">수령 시기를 앞당기거나 늦출 때 연금액이 어떻게 달라지는지 알아보세요.</p>
                  </Link>
                  <Link
                    href="/guide/national-pension-premium-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">국민연금 보험료 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">기준소득월액과 보험료율 계산법을 정리했습니다.</p>
                  </Link>
                  <Link
                    href="/guide/basic-pension-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">기초연금 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">국민연금과 별도로 받는 기초연금 수급 조건을 확인하세요.</p>
                  </Link>
                  <Link
                    href="/category/work/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">직장인·소득 계산기 모음</div>
                    <p className="mt-1 text-sm text-text-secondary">연봉·퇴직금·4대보험 등 관련 계산기를 모아봤습니다.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 교육 목적으로 작성되었으며, 개인 맞춤형 연금·재무 조언이 아닙니다. 실제 추납 가능 개월수, 보험료액, 기준소득월액 상·하한, 분할납부 조건은 국민연금공단에서 반드시 확인하세요. 본 콘텐츠는 2026-07-19를 기준으로 작성되었으며, 국민연금법 개정 시 즉시 업데이트됩니다. 추납의 정확한 기준은 법조항 <strong>국민연금법 §92(연금보험료의 추후납부)</strong>를 따릅니다. AI 보조 작성 후 운영자 검수 완료.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터</a>,{' '}
                  <a href="https://www.nps.or.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">국민연금공단</a>,{' '}
                  <a href="https://www.moel.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">고용노동부</a>.
                </p>
              </section>

              <ShareButtons
                title="국민연금 추납 2026 가이드"
                url={URL}
              />
            </article>
          </main>
        </div>
        <Footer />
      </div>
    </>
  );
}
