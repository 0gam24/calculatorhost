import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { Footer } from '@/components/layout/Footer';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { FaqSection } from '@/components/calculator/FaqSection';
import { ShareButtons } from '@/components/calculator/ShareButtons';
import {
  buildBreadcrumbJsonLd,
  buildArticleJsonLd,
  buildWebPageJsonLd,
  buildFaqPageJsonLd,
  buildSpeakableJsonLd,
} from '@/lib/seo/jsonld';

const URL = 'https://calculatorhost.com/guide/national-pension-credit-system-2026/';
const DATE_PUBLISHED = '2026-07-26';
const DATE_MODIFIED = '2026-07-26';
// 북극성 수익 레버: [revenue-lever: indexing+traffic] (신규 색인 표면 + 국민연금 크레딧 검색 의도 흡수)

export const metadata: Metadata = {
  title: '국민연금 크레딧 2026, 출산·군복무·실업 가입기간 추가',
  description:
    '국민연금 크레딧은 출산·군복무·실업 기간을 가입기간으로 더 인정해 연금을 늘려주는 제도입니다. 출산 최대 50개월, 군복무 6개월, 실업 최대 12개월의 조건과 신청 방법을 국민연금법 §18·§19 기준으로 정리했습니다.',
  keywords: [
    '국민연금 크레딧',
    '출산 크레딧',
    '군복무 크레딧',
    '실업 크레딧',
    '국민연금 가입기간 추가',
    '국민연금 크레딧 신청',
    '국민연금법 19조',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '국민연금 크레딧 2026, 출산·군복무·실업 가입기간 추가' }],
    title: '국민연금 크레딧 2026, 출산·군복무·실업으로 연금 늘리기',
    description: '보험료를 더 내지 않고도 가입기간을 인정받는 세 가지 크레딧. 출산 최대 50개월, 군복무 6개월, 실업 최대 12개월.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '국민연금 크레딧 2026, 출산·군복무·실업',
    description: '가입기간을 추가로 인정해 연금을 늘려주는 크레딧 제도. 국민연금법 §18·§19·§19의2.',
  },
};

const FAQ_ITEMS = [
  {
    question: '국민연금 크레딧이 정확히 무엇인가요?',
    answer:
      '국민연금 크레딧은 사회적으로 가치 있는 행위에 대한 보상으로 국민연금 가입기간을 추가로 인정해주는 제도입니다. 출산·군복무·실업이라는 세 가지 상황에서 실제로 보험료를 낸 기간이 아니어도 일정 개월 수를 가입기간에 더해줍니다. 가입기간이 늘어나면 노령연금 수령액도 늘어납니다.',
  },
  {
    question: '출산 크레딧은 몇 개월을 인정받나요?',
    answer:
      '출산 크레딧은 둘째 자녀부터 인정되며 최대 50개월까지 가능합니다(국민연금법 §19). 둘째 자녀는 12개월, 셋째 이상은 자녀 한 명당 18개월을 추가로 인정합니다. 예를 들어 자녀가 셋이면 12개월(둘째)에 18개월(셋째)을 더해 30개월을 인정받습니다. 2008년 1월 1일 이후 출생한 자녀부터 대상입니다.',
  },
  {
    question: '군복무 크레딧은 얼마나 인정되나요?',
    answer:
      '군복무 크레딧은 6개월의 가입기간을 인정합니다(국민연금법 §18). 현역병, 사회복무요원 등 병역법에 따라 일정 기간 복무한 사람이 대상입니다. 다만 실제 복무기간이 6개월 이상이어야 하며, 인정되는 기간은 복무기간과 무관하게 6개월로 고정입니다.',
  },
  {
    question: '실업 크레딧은 어떻게 받나요?',
    answer:
      '실업 크레딧은 구직급여(실업급여)를 받는 사람이 연금보험료 납부를 희망할 때 국가가 보험료의 75%를 지원하고 그 기간을 가입기간으로 인정하는 제도입니다(국민연금법 §19의2). 본인이 25%를 부담하며, 생애 최대 12개월까지 지원받을 수 있습니다. 구직급여 종료일이 속하는 달의 다음 달 15일 이전까지 신청해야 합니다.',
  },
  {
    question: '크레딧은 언제 신청하나요?',
    answer:
      '크레딧마다 신청 시점이 다릅니다. 출산 크레딧과 군복무 크레딧은 노령연금을 청구할 때 함께 신청해 가입기간에 반영합니다. 반면 실업 크레딧은 구직급여를 받는 도중에 신청해야 하며, 구직급여 종료일이 속한 달의 다음 달 15일까지가 기한입니다.',
  },
  {
    question: '크레딧으로 늘어난 기간에도 보험료를 내야 하나요?',
    answer:
      '출산·군복무 크레딧은 본인이 추가로 보험료를 내지 않아도 국가와 지자체가 재원을 부담해 가입기간을 인정합니다. 반면 실업 크레딧은 본인이 보험료의 25%를 부담하고 나머지 75%를 국가가 지원하는 구조여서, 소액이지만 본인 부담이 있습니다.',
  },
  {
    question: '군복무 크레딧과 실업 크레딧을 모두 받을 수 있나요?',
    answer:
      '네, 서로 다른 크레딧은 각각의 요건을 충족하면 중복해 받을 수 있습니다. 군 복무를 한 사람이 이후 실직해 구직급여를 받으며 실업 크레딧을 신청하면 두 크레딧이 모두 가입기간에 반영됩니다. 다만 각 크레딧의 인정 한도(군복무 6개월, 실업 최대 12개월)는 개별적으로 적용됩니다.',
  },
  {
    question: '크레딧이 연금액을 얼마나 늘려주나요?',
    answer:
      '가입기간이 길어질수록 노령연금이 늘어나므로, 크레딧으로 인정된 개월 수만큼 연금액이 증가합니다. 국민연금은 가입기간과 가입 중 평균소득을 반영해 연금액을 산정하므로, 예를 들어 실업 크레딧 12개월을 인정받으면 그 1년이 가입기간에 더해져 매달 받는 연금이 소폭 늘어납니다. 정확한 증가액은 국민연금공단 예상연금 조회로 확인할 수 있습니다.',
  },
];

export default function NationalPensionCreditSystem2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '국민연금 크레딧 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '국민연금 크레딧 2026, 출산·군복무·실업 가입기간 추가',
    description:
      '보험료를 더 내지 않고도 가입기간을 인정받는 국민연금 크레딧. 출산 최대 50개월, 군복무 6개월, 실업 최대 12개월의 조건·신청 방법·연금 증가 효과를 정리.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['국민연금 크레딧', '출산 크레딧', '군복무 크레딧', '실업 크레딧', '가입기간'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '국민연금 크레딧 2026',
    description: '출산·군복무·실업 크레딧으로 국민연금 가입기간을 늘리는 방법을 정리한 가이드.',
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
                    { name: '국민연금 크레딧 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">직장인·은퇴 준비층 · 8분 읽기 · 2026-07-26</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  국민연금 크레딧 2026
                  <br />
                  <span className="text-2xl text-text-secondary">출산·군복무·실업 가입기간 추가</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  국민연금은 가입기간이 길수록 노후에 받는 연금이 늘어납니다. 그런데 출산, 군복무, 실업처럼 보험료를 내기 어려웠던 기간을 국가가 가입기간으로 대신 인정해주는 제도가 있습니다. 바로 국민연금 크레딧입니다. 이 가이드는 출산·군복무·실업 크레딧이 각각 몇 개월을 인정하는지, 누가 언제 어떻게 신청하는지, 그리고 연금액이 얼마나 늘어나는지를 정리합니다.
                </p>
              </header>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">국민연금 크레딧이란 무엇인가요?</h2>
                <p>
                  국민연금 크레딧은 사회적으로 가치 있는 행위를 한 사람에게 가입기간을 추가로 인정해주는 제도입니다. 아이를 낳아 기르거나, 국방의 의무를 다하거나, 실직 중에도 노후를 준비하려는 노력에 대해 국가가 연금 가입기간을 보태주는 것입니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">세 가지 크레딧 요약</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    · 출산 크레딧: 둘째부터, 최대 50개월 (국민연금법 §19)
                    <br />
                    · 군복무 크레딧: 6개월 인정 (국민연금법 §18)
                    <br />
                    · 실업 크레딧: 최대 12개월, 보험료 75% 국가 지원 (국민연금법 §19의2)
                  </p>
                </div>
                <p className="mt-4">
                  다만 크레딧은 자동으로 붙는 것이 아니라 요건과 신청 절차가 있습니다. 특히 실업 크레딧은 신청 기한을 놓치면 받을 수 없으므로 시점을 정확히 챙겨야 합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">출산 크레딧은 몇 개월을 인정받나요?</h2>
                <p>
                  출산 크레딧은 둘째 자녀부터 인정되며 최대 50개월까지 가능합니다. 첫째 자녀는 대상이 아니고, 둘째부터 자녀 수에 따라 개월 수가 늘어납니다. 2008년 1월 1일 이후 출생·입양한 자녀가 대상입니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 자녀 수별 출산 크레딧 인정 개월 (국민연금법 §19)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">자녀 수</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">인정 개월</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">계산</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">2명</td>
                        <td className="p-3"><strong>12개월</strong></td>
                        <td className="p-3">둘째 12</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">3명</td>
                        <td className="p-3"><strong>30개월</strong></td>
                        <td className="p-3">12 + 18</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">4명</td>
                        <td className="p-3"><strong>48개월</strong></td>
                        <td className="p-3">12 + 18 + 18</td>
                      </tr>
                      <tr>
                        <td className="p-3">5명 이상</td>
                        <td className="p-3"><strong>50개월</strong></td>
                        <td className="p-3">상한 적용</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  예외: 출산 크레딧은 부모 중 한 사람에게만 인정되는 것이 원칙이며, 부부가 합의하면 나누거나 한쪽에 몰아줄 수 있습니다. 구체적 배분은 노령연금 청구 시 국민연금공단에서 확인합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">군복무 크레딧은 얼마나 인정되나요?</h2>
                <p>
                  군복무 크레딧은 6개월의 가입기간을 인정합니다. 병역법에 따라 현역병, 사회복무요원, 상근예비역 등으로 일정 기간 복무한 사람이 대상입니다. 인정 개월 수는 실제 복무기간과 무관하게 6개월로 고정되어 있습니다.
                </p>
                <p className="mt-4">
                  이 크레딧은 노령연금을 청구할 때 신청해 반영됩니다. 재원은 국가가 전액 부담하므로 본인이 추가로 내야 하는 보험료는 없습니다.
                </p>
                <p className="mt-4">
                  다만 군 복무 기간 중 이미 국민연금 보험료를 낸 기간이 있다면 그 부분과 크레딧 인정의 관계는 개별적으로 판단되므로, 정확한 반영 내역은 국민연금공단에서 확인하는 것이 좋습니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">실업 크레딧은 어떻게 신청하나요?</h2>
                <p>
                  실업 크레딧은 구직급여를 받는 동안 신청해야 합니다. 실직해 고용보험 구직급여를 받는 사람이 국민연금 보험료 납부를 희망하면, 국가가 보험료의 75%를 지원하고 그 기간을 가입기간으로 인정합니다. 본인은 25%만 부담합니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">실업 크레딧 핵심 조건</p>
                  <p className="text-sm text-text-secondary">
                    · 대상: 구직급여 수급자 (18세 이상 60세 미만)
                    <br />
                    · 지원: 연금보험료의 75%를 국가가 지원, 본인 25% 부담
                    <br />
                    · 한도: 생애 최대 12개월
                    <br />
                    · 신청 기한: 구직급여 종료일이 속한 달의 다음 달 15일 이전
                    <br />
                    · 창구: 국민연금공단 지사 또는 고용센터
                  </p>
                </div>
                <p className="mt-4">
                  예외: 일정 수준 이상의 재산이나 소득이 있으면 실업 크레딧 지원 대상에서 제외될 수 있습니다. 지원 자격은 신청 시점에 국민연금공단이 확인합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">크레딧으로 연금이 얼마나 늘어나나요?</h2>
                <p>
                  가입기간이 길수록 노령연금이 늘어나므로, 크레딧으로 인정된 개월 수만큼 연금액이 증가합니다. 국민연금 연금액은 전체 가입자의 평균소득과 본인의 가입기간·소득을 함께 반영해 산정되므로, 인정 개월이 곧바로 연금 증가로 이어집니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례. 세 자녀를 둔 가입자의 출산 크레딧</p>
                  <p className="text-sm text-text-secondary">
                    · 자녀 3명: 12개월(둘째) + 18개월(셋째) = 30개월 인정
                    <br />
                    · 효과: 가입기간이 2년 6개월 늘어난 것과 동일
                    <br />
                    · 결과: 노령연금 산정 시 가입기간 30개월이 추가되어 매달 받는 연금이 상승
                    <br />
                    <span className="text-xs text-text-tertiary">정확한 증가액은 소득·가입기간에 따라 다르므로 예상연금 조회로 확인하세요.</span>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례. 실업 크레딧 12개월을 채운 경우</p>
                  <p className="text-sm text-text-secondary">
                    · 실직 기간 중 실업 크레딧 12개월 신청·인정
                    <br />
                    · 본인 부담: 인정 소득 기준 보험료의 25%만 납부
                    <br />
                    · 결과: 가입기간 1년이 더해져 노후 연금이 소폭 증가하고, 최소 가입기간(10년) 충족에도 도움
                    <br />
                    <span className="text-xs text-text-tertiary">가입기간 10년을 못 채우면 노령연금 대신 반환일시금만 받으므로, 크레딧이 수급 자격 확보에 유리할 수 있습니다.</span>
                  </p>
                </div>
                <p className="mt-4">
                  다만 크레딧의 실제 반영 여부와 증가액은 개인별로 다르므로, 국민연금공단 홈페이지나 앱의 예상연금 조회, 가까운 지사 상담으로 확인하는 것이 정확합니다.
                </p>
              </section>

              <h2 className="text-2xl font-bold mb-6">자주 묻는 질문</h2>
              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h3 className="text-lg font-semibold text-text-primary">관련 계산기 및 가이드</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link
                    href="/guide/national-pension-expected-benefit-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">국민연금 예상 수령액 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">가입기간·소득으로 노령연금 예상액을 확인하세요.</p>
                  </Link>
                  <Link
                    href="/guide/national-pension-additional-payment-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">국민연금 추납(추후납부)</div>
                    <p className="mt-1 text-sm text-text-secondary">빈 가입기간을 메워 연금을 늘리는 추납 제도.</p>
                  </Link>
                  <Link
                    href="/guide/national-pension-voluntary-subscription-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">국민연금 임의가입</div>
                    <p className="mt-1 text-sm text-text-secondary">소득이 없어도 스스로 가입해 연금을 쌓는 방법.</p>
                  </Link>
                  <Link
                    href="/guide/national-pension-lump-sum-refund-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">국민연금 반환일시금</div>
                    <p className="mt-1 text-sm text-text-secondary">가입기간 10년 미달 시 받는 일시금 조건.</p>
                  </Link>
                  <Link
                    href="/guide/national-pension-early-deferred-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">국민연금 조기·연기수령</div>
                    <p className="mt-1 text-sm text-text-secondary">받는 시점을 앞당기거나 미룰 때의 손익.</p>
                  </Link>
                  <Link
                    href="/category/finance/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">모든 금융·연금 가이드</div>
                    <p className="mt-1 text-sm text-text-secondary">연금·대출·예적금 전략 모음.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 교육 목적으로 작성되었으며, 개인 맞춤형 재무·연금 조언이 아닙니다. 실제 크레딧 인정 개월, 신청 가능 여부, 연금 증가액은 개인의 가입 이력과 소득에 따라 달라지므로 국민연금공단(1355) 또는 지사 상담으로 반드시 확인하세요. 본 콘텐츠는 2026-07-26을 기준으로 작성되었으며, 국민연금법 개정 시 즉시 업데이트됩니다. 인용 법조항: <strong>국민연금법 §18(군복무 크레딧), §19(출산 크레딧), §19의2(실업 크레딧)</strong>. AI 보조 작성 후 운영자 검수 완료.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터</a>,{' '}
                  <a href="https://www.nps.or.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">국민연금공단</a>.
                </p>
              </section>

              <ShareButtons
                title="국민연금 크레딧 2026 가이드"
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
