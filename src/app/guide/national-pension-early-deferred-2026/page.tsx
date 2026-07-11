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

const URL = 'https://calculatorhost.com/guide/national-pension-early-deferred-2026/';
const DATE_PUBLISHED = '2026-07-12';
const DATE_MODIFIED = '2026-07-12';

export const metadata: Metadata = {
  title: '국민연금 조기수령·연기연금 2026, 감액 6%·증액 7.2%',
  description:
    '국민연금은 최대 5년 조기 수령하면 연 6%씩 최대 30% 깎이고, 최대 5년 연기하면 연 7.2%씩 최대 36% 늘어납니다. 조기·연기의 손익분기와 선택 기준을 국민연금법 §61·§62로 정리합니다.',
  keywords: [
    '국민연금 조기수령',
    '연기연금',
    '조기노령연금 감액',
    '국민연금 손익분기',
    '연금 연기 증액',
    '국민연금법 62조',
    '노령연금 수령 나이',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '국민연금 조기수령·연기연금 2026, 감액 6%·증액 7.2%' }],
    title: '국민연금 조기수령·연기연금 2026, 얼마 깎이고 얼마 늘어날까',
    description: '조기 수령은 연 6% 감액(최대 30%), 연기 수령은 연 7.2% 증액(최대 36%). 손익분기와 선택 기준 정리.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '국민연금 조기수령·연기연금 2026',
    description: '조기 최대 30% 감액, 연기 최대 36% 증액. 손익분기는 대략 조기 77세·연기 84세.',
  },
};

const FAQ_ITEMS = [
  {
    question: '국민연금 조기수령은 몇 살부터 가능한가요?',
    answer:
      '노령연금 수급 개시 연령보다 최대 5년 앞당겨 받을 수 있습니다(국민연금법 §61). 1969년생 이후는 정상 수급 연령이 65세이므로 60세부터 조기 수령이 가능합니다. 단, 일정 수준 이상의 근로·사업 소득이 있으면 조기수령 신청이 제한됩니다.',
  },
  {
    question: '조기수령하면 얼마나 깎이나요?',
    answer:
      '1년 앞당길 때마다 연 6%씩 감액되어, 최대 5년 조기 수령 시 30%가 깎입니다. 예를 들어 정상 연금이 월 100만원이면 5년 조기 수령 시 월 70만원이 됩니다. 이 감액은 평생 유지되는 영구 감액이라는 점이 핵심입니다.',
  },
  {
    question: '연기연금은 얼마나 늘어나나요?',
    answer:
      '수급을 미루면 1개월당 0.6%, 즉 연 7.2%씩 증액됩니다(국민연금법 §62). 최대 5년 연기하면 36%가 늘어, 정상 월 100만원 연금이 월 136만원이 됩니다. 조기수령과 반대로 이 증액도 평생 유지됩니다.',
  },
  {
    question: '조기수령과 연기 중 무엇이 유리한가요?',
    answer:
      '오래 살수록 연기가, 일찍 받을 사정이 있으면 조기가 유리합니다. 대략 조기수령은 77세 안팎, 연기연금은 84세 안팎을 넘겨 생존하면 미룬 쪽의 누적 수령액이 앞섭니다. 건강 상태, 다른 소득, 당장의 생활비 필요 여부를 함께 고려해 결정하세요.',
  },
  {
    question: '조기수령 중 소득이 생기면 어떻게 되나요?',
    answer:
      '조기노령연금은 소득이 있는 업무에 종사하지 않는 것을 전제로 지급됩니다. 수령 중 일정 기준을 넘는 근로·사업 소득이 생기면 지급이 정지되거나 조정될 수 있습니다. 재취업 계획이 있다면 조기수령 신청 전에 소득 기준을 확인하는 것이 좋습니다.',
  },
  {
    question: '연금을 받으면 건강보험료에 영향이 있나요?',
    answer:
      '공적연금 소득은 건강보험 지역가입자 보험료 산정에 반영되고, 피부양자 자격 판단의 소득 기준에도 포함될 수 있습니다. 연기연금으로 수령액이 커지면 피부양자 자격에서 벗어나 지역가입자로 전환될 수 있으므로, 건강보험 영향까지 함께 따져보세요.',
  },
  {
    question: '일부만 연기할 수도 있나요?',
    answer:
      '네, 연기연금은 노령연금의 전부 또는 일부(일정 비율)를 연기할 수 있습니다. 예를 들어 절반만 연기하면 나머지 절반은 정상 수령하면서, 연기한 부분에 대해서만 증액을 적용받습니다. 생활비와 증액 효과를 절충하고 싶을 때 활용할 수 있습니다.',
  },
  {
    question: '한 번 조기수령을 신청하면 되돌릴 수 있나요?',
    answer:
      '조기노령연금은 신청 후 사유가 발생하면 지급 정지·재산정 등이 가능하지만, 감액률 자체는 원칙적으로 유지됩니다. 신중한 판단이 필요하므로, 신청 전 국민연금공단에서 본인 예상 수령액과 감액 후 금액을 모의계산으로 비교해보는 것을 권합니다.',
  },
];

export default function NationalPensionEarlyDeferred2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '국민연금 조기수령·연기연금 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '국민연금 조기수령·연기연금 2026, 감액·증액과 손익분기 총정리',
    description:
      '국민연금 조기노령연금(연 6% 감액, 최대 30%)과 연기연금(연 7.2% 증액, 최대 36%)의 구조, 손익분기 나이, 상황별 선택 기준을 국민연금법 §61·§62 기준으로 정리.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['국민연금', '조기수령', '연기연금', '감액', '손익분기'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '국민연금 조기수령·연기연금 2026',
    description:
      '국민연금 조기수령 감액·연기연금 증액과 손익분기, 상황별 선택 기준 정리.',
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
                    { name: '국민연금 조기수령·연기연금 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">은퇴 준비자 · 8분 읽기 · 2026-07-12</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  국민연금 조기수령·연기연금 2026
                  <br />
                  <span className="text-2xl text-text-secondary">감액 6%·증액 7.2%</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  국민연금은 정해진 나이에 받는 것이 원칙이지만, 최대 5년 일찍 받거나 최대 5년 늦게 받을 수 있습니다. 다만 일찍 받으면 깎이고 늦게 받으면 늘어나는데, 이 조정이 평생 유지된다는 점이 중요합니다. 이 가이드는 국민연금법 §61·§62를 기준으로 조기수령 감액, 연기연금 증액, 손익분기 나이, 상황별 선택 기준을 정리합니다.
                </p>
              </header>

              <AdSlot slot="guide-national-pension-early-deferred-top" format="horizontal" />

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">조기수령과 연기연금이 무엇인가요?</h2>
                <p>
                  조기수령은 노령연금을 정상 나이보다 최대 5년 당겨 받는 것이고, 연기연금은 최대 5년 미뤄 받는 것입니다. 1969년생 이후는 정상 수급 연령이 65세이므로, 조기는 60세부터, 연기는 70세까지 선택할 수 있습니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">핵심 요약</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    · 조기수령: 1년당 <strong>6% 감액</strong>, 최대 5년 시 30% 감액 (국민연금법 §61)
                    <br />
                    · 연기연금: 1개월당 0.6%(<strong>연 7.2% 증액</strong>), 최대 5년 시 36% 증액 (국민연금법 §62)
                    <br />
                    · 조정은 모두 <strong>평생 유지</strong>되는 영구 조정
                  </p>
                </div>
                <p className="mt-4">
                  ⚠️ 다만 조기수령은 소득이 있는 업무에 종사하지 않는 것을 전제로 합니다. 재취업으로 일정 기준 이상 소득이 생기면 지급이 정지·조정될 수 있습니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">조기수령하면 얼마나 깎이나요?</h2>
                <p>
                  1년 앞당길 때마다 6%씩 감액됩니다. 정상 연금이 월 100만원일 때 조기 수령 기간별 금액은 다음과 같습니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 조기수령 감액 (정상 월 100만원 기준, 국민연금법 §61)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">조기 기간</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">지급률</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">월 수령액</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">1년 (64세)</td>
                        <td className="p-3">94%</td>
                        <td className="p-3">94만원</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">2년 (63세)</td>
                        <td className="p-3">88%</td>
                        <td className="p-3">88만원</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">3년 (62세)</td>
                        <td className="p-3">82%</td>
                        <td className="p-3">82만원</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">4년 (61세)</td>
                        <td className="p-3">76%</td>
                        <td className="p-3">76만원</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">5년 (60세)</td>
                        <td className="p-3"><strong>70%</strong></td>
                        <td className="p-3"><strong>70만원</strong></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  ⚠️ 다만 이 감액은 평생 유지됩니다. 당장 생활비가 급해 5년 조기 수령하면 이후 80대, 90대에도 계속 70%만 받게 되므로 신중해야 합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">연기하면 얼마나 늘어나나요?</h2>
                <p>
                  수급을 미루면 1개월당 0.6%, 연 7.2%씩 증액됩니다. 정상 월 100만원 기준 연기 기간별 금액은 다음과 같습니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 2. 연기연금 증액 (정상 월 100만원 기준, 국민연금법 §62)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">연기 기간</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">지급률</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">월 수령액</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">1년 (66세)</td>
                        <td className="p-3">107.2%</td>
                        <td className="p-3">107.2만원</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">2년 (67세)</td>
                        <td className="p-3">114.4%</td>
                        <td className="p-3">114.4만원</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">3년 (68세)</td>
                        <td className="p-3">121.6%</td>
                        <td className="p-3">121.6만원</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">4년 (69세)</td>
                        <td className="p-3">128.8%</td>
                        <td className="p-3">128.8만원</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">5년 (70세)</td>
                        <td className="p-3"><strong>136%</strong></td>
                        <td className="p-3"><strong>136만원</strong></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  ⚠️ 다만 연기하는 동안에는 연금을 받지 못합니다. 연기 기간의 생활비를 다른 소득이나 저축으로 감당할 수 있어야 연기가 실익이 있습니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">조기 vs 연기, 손익분기는 언제인가요?</h2>
                <p>
                  오래 살수록 늦게 받는 쪽이 유리합니다. 정상 월 100만원을 기준으로 누적 수령액이 역전되는 시점을 계산하면 다음과 같습니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">손익분기 계산 사례 (정상 월 100만원)</p>
                  <p className="text-sm text-text-secondary">
                    · 조기(60세, 월 70만원) vs 정상(65세, 월 100만원)
                    <br />
                    → 70만 × (나이−60) = 100만 × (나이−65) → 약 <strong>77세</strong>에 역전
                    <br />
                    · 정상(65세, 월 100만원) vs 연기(70세, 월 136만원)
                    <br />
                    → 100만 × (나이−65) = 136만 × (나이−70) → 약 <strong>84세</strong>에 역전
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 77세 이전 사망 예상이면 조기, 84세 이상 장수 예상이면 연기가 누적 수령액에서 유리합니다.</span>
                  </p>
                </div>
                <p className="mt-4">
                  다만 손익분기는 물가 상승에 따른 연금액 조정, 세금·건강보험료 영향을 단순화한 계산입니다. 실제 판단에는 건강 상태와 다른 노후 소득을 함께 고려해야 합니다.
                </p>
              </section>

              <AdSlot slot="guide-national-pension-early-deferred-mid" format="rectangle" />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h2 className="text-2xl font-bold">누가 조기수령이 유리한가요?</h2>
                <p>
                  정답은 사람마다 다릅니다. 상황별로 정리하면 판단이 쉬워집니다.
                </p>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li>
                    <strong>조기수령이 나은 경우:</strong> 은퇴 후 당장 생활비가 필요하고 다른 소득이 없을 때, 건강이 좋지 않아 기대여명이 짧을 때, 감액을 감수하고 현금흐름을 앞당기고 싶을 때.
                  </li>
                  <li>
                    <strong>연기가 나은 경우:</strong> 은퇴 후에도 근로·사업 소득이 있어 당장 연금이 급하지 않을 때, 가족력상 장수가 예상될 때, 물가 상승기에 실질 수령액을 키우고 싶을 때.
                  </li>
                  <li>
                    <strong>정상 수령이 무난한 경우:</strong> 특별한 사정이 없고 손익을 예측하기 어려울 때는 정상 개시가 기본값입니다.
                  </li>
                </ul>
                <p className="mt-4">
                  건강보험 피부양자 자격, 종합소득 과세 여부까지 얽히므로, 최종 결정 전 국민연금공단 모의계산과 상담을 활용하세요.
                </p>
              </section>

              <h2 className="text-2xl font-bold mb-6">자주 묻는 질문</h2>
              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h3 className="text-lg font-semibold text-text-primary">관련 계산기 및 가이드</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link
                    href="/calculator/retirement/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">은퇴자금 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">노후 필요자금과 연금 충당 가능성을 계산하세요.</p>
                  </Link>
                  <Link
                    href="/guide/national-pension-expected-benefit-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">국민연금 예상 수령액</div>
                    <p className="mt-1 text-sm text-text-secondary">가입 기간·소득으로 예상 연금을 확인하세요.</p>
                  </Link>
                  <Link
                    href="/guide/national-pension-premium-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">국민연금 보험료 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">요율 인상과 기준소득월액 상한을 확인하세요.</p>
                  </Link>
                  <Link
                    href="/guide/basic-pension-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">기초연금 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">기초연금 대상과 국민연금 연계 감액.</p>
                  </Link>
                  <Link
                    href="/guide/housing-pension-reverse-mortgage-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">주택연금 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">집을 담보로 매달 연금 받는 방법.</p>
                  </Link>
                  <Link
                    href="/category/work/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">모든 근로·노후 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">연봉·퇴직금·은퇴자금 모음.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 교육 목적으로 작성되었으며 개인 맞춤형 재무·연금 자문이 아닙니다. 손익분기 계산은 물가 조정·세금·건강보험료 영향을 단순화한 예시이며, 실제 예상 수령액과 감액·증액 금액은 국민연금공단에서 본인 기준으로 확인하시기 바랍니다. 본 콘텐츠는 2026-07-12 기준으로 작성되었고 제도 변경 시 업데이트됩니다. 인용 법조항: <strong>국민연금법 §61(노령연금·조기노령연금), §62(지급의 연기에 따른 가산)</strong>. AI 보조 작성 후 운영자 검수 완료.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터</a>,{' '}
                  <a href="https://www.nps.or.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">국민연금공단</a>.
                </p>
              </section>

              <ShareButtons
                title="국민연금 조기수령·연기연금 2026 가이드"
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
