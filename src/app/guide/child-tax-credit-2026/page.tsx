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

const URL = 'https://calculatorhost.com/guide/child-tax-credit-2026/';
const DATE_PUBLISHED = '2026-07-03';
const DATE_MODIFIED = '2026-07-03';

export const metadata: Metadata = {
  title: '자녀세액공제 2026 | 8세 이상 1명 25만원·다자녀·출산공제',
  description:
    '소득세 감면 자녀세액공제(자녀·손자녀). 1명 연 25만원, 2명 55만원, 3명 이상 95만원+. 2024년 개정 현행값 및 적용 기준 완전 정리. 소득세법 §59의2',
  keywords: [
    '자녀세액공제',
    '자녀 세액공제',
    '다자녀공제',
    '출산입양공제',
    '소득세법 59조의2',
    '자녀 세금 감면',
    '연 25만원',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '자녀세액공제 2026 가이드' }],
    title: '자녀세액공제 2026 — 8세 이상 자녀·손자녀 최대 연 115만원 세감 메커니즘',
    description: '2024년 개정으로 확대된 자녀세액공제. 1명 25만원부터 3명 이상 95만원까지, 출산·입양 추가 공제.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '자녀세액공제 2026 — 자녀 1명 연 25만원, 다자녀·출산 추가 혜택',
    description: '소득세법 §59의2 자녀세액공제의 정확한 공제액·적용 기준·계산 사례.',
  },
};

const FAQ_ITEMS = [
  {
    question: '자녀세액공제란 무엇인가요?',
    answer:
      '자녀세액공제는 소득세법 §59의2에 따라 기본공제대상 자녀 및 손자녀가 있는 납세자에게 소득세에서 직접 공제해주는 제도입니다(2024년 개정 확대). 근로소득자·종합소득자·퇴직소득자 모두 적용됩니다. 예: 자녀 1명이면 연 25만원을 소득세에서 직접 차감합니다.',
  },
  {
    question: '8세 미만 자녀는 자녀세액공제 대상이 아닌가요?',
    answer:
      '맞습니다. 자녀세액공제는 기본공제대상 8세 이상 자녀·손자녀만 대상입니다(소득세법 §59의2). 8세 미만 자녀는 아동수당 수급 대상이므로 정책상 자녀세액공제와 중복 배제됩니다. 다만 출산·입양 세액공제(§59의2②)는 연령 무관하게 첫 출생·입양 시 추가 공제됩니다.',
  },
  {
    question: '자녀 2명이면 정확히 얼마를 공제받나요?',
    answer:
      '자녀 2명(모두 8세 이상)이면 연 55만원을 소득세에서 공제합니다(2024년 개정 현행값). 이는 1명 25만원 + 2명 추가 30만원의 합입니다. 다만 맞벌이 부부인 경우, 한 명의 자녀만 기본공제를 받는 배우자만 자녀세액공제 대상이 됩니다.',
  },
  {
    question: '3명 이상 자녀가 있으면 최대 얼마까지 공제받나요?',
    answer:
      '3명 이상이면 기본액 55만원(1명+2명) + (3명 초과분) × 40만원입니다. 예: 3명 → 55만 + 40만 = 95만원, 4명 → 55만 + 80만 = 135만원. 추가 자녀 1명당 연 40만원씩 누적됩니다.',
  },
  {
    question: '출산·입양 세액공제와 자녀세액공제가 다른가요?',
    answer:
      '네, 다릅니다(소득세법 §59의2②). 자녀세액공제는 매년 8세 이상 자녀당 공제이고, 출산·입양 세액공제는 출생·입양 첫해만 추가로 공제됩니다. 예: 첫아이 출산 시 30만원 추가, 둘째 출산 시 50만원 추가, 셋째 이상 70만원 추가.',
  },
  {
    question: '손자녀도 자녀세액공제 대상인가요?',
    answer:
      '네, 2024년 개정으로 손자녀가 대상에 포함되었습니다(소득세법 §59의2). 기본공제대상 손자녀(8세 이상, 부양 관계)가 있으면 자녀와 동일하게 공제됩니다. 다만 생계를 함께하거나 연간 소득 100만원 이하여야 기본공제대상 인정됩니다.',
  },
  {
    question: '맞벌이 부부이면 둘 다 공제받나요?',
    answer:
      '아닙니다. 기본공제는 한 명의 배우자만 자녀를 공제할 수 있으므로, 자녀세액공제도 그 배우자만 받습니다(소득세법 §51). 예: 부인이 자녀를 기본공제하면 부인만 자녀세액공제 대상입니다. 부부가 협의하여 공제 대상을 정할 수 있습니다.',
  },
  {
    question: '프리랜서나 사업가도 자녀세액공제를 받을 수 있나요?',
    answer:
      '네, 근로소득자뿐 아니라 종합소득자(프리랜서·사업가), 퇴직소득자도 적용됩니다(소득세법 §59의2). 연말정산이나 종합소득세 신고 시 자녀세액공제를 신청하면 됩니다.',
  },
];

export default function ChildTaxCredit2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '자녀세액공제 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '자녀세액공제 2026 — 8세 이상 자녀·손자녀 최대 연 115만원 세감 메커니즘',
    description:
      '2024년 개정 자녀세액공제 완전 정리. 공제액(1명 25만·2명 55만·3명 95만), 출산입양 추가공제, 8세 기준, 맞벌이 적용, 손자녀 포함 여부까지.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['자녀세액공제', '다자녀', '출산공제', '세액공제', '소득세 감면'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '자녀세액공제 2026',
    description:
      '자녀·손자녀 세액공제의 정확한 공제액·적용 기준·계산법·출산·입양 공제.',
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
                    { name: '자녀세액공제 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">직장인·프리랜서 · 7분 읽기 · 2026-07-03</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  자녀세액공제 2026
                  <br />
                  <span className="text-2xl text-text-secondary">— 8세 이상 자녀·손자녀 최대 연 115만원 세감</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  자녀가 있으면 연말정산이나 종합소득세 신고 시 자녀세액공제를 받을 수 있습니다. 2024년 세법 개정으로 공제액이 크게 확대되었는데, 많은 사람들이 정확한 금액을 모르고 계신다는 것이 현실입니다. 이 가이드는 자녀세액공제의 정확한 공제액, 8세 기준, 출산·입양 추가공제, 맞벌이 적용 방법까지 완전히 정리해드립니다.
                </p>
              </header>

              <AdSlot slot="guide-child-tax-credit-top" format="horizontal" />

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">자녀세액공제란 무엇인가</h2>
                <p>
                  소득세법 §59의2에 따른 자녀세액공제는 기본공제대상 자녀 및 손자녀가 있는 납세자에게 소득세에서 직접 공제해주는 혜택입니다. 2024년 12월 31일 개정으로 공제액이 대폭 확대되었으며, 2025년 1월 1일 이후 발생하는 소득부터 적용됩니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">자녀세액공제의 기본 원리</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    산출된 소득세에서 직접 공제되는 혜택입니다(세액공제).
                    <br />
                    예: 산출 소득세 500만원, 자녀 1명 → 25만원 공제 → 실제 납부세액 = 475만원
                    <br />
                    ※ 소득공제(공제액만큼 소득 자체를 줄임)와는 다르며, 세액공제가 훨씬 효과가 큽니다.
                  </p>
                </div>
                <p className="mt-4">
                  세액공제는 소득공제와 달리 직접 세금에서 차감되므로, 같은 금액도 훨씬 효과가 큽니다. 근로소득자(연말정산), 종합소득자(사업가·프리랜서), 퇴직소득자 모두 적용됩니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">자녀세액공제 공제액 (2024 개정, 2026 현행)</h2>
                <p>
                  자녀세액공제는 기본공제대상 자녀의 수에 따라 다릅니다(소득세법 §59의2①). 2024년 12월 31일 개정으로 1명 당 공제액이 대폭 인상되었습니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 자녀수별 연간 세액공제액 (소득세법 §59의2, 2026 현행)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">자녀수</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">공제액</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">계산 구조</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">1명</td>
                        <td className="p-3"><strong>연 25만원</strong></td>
                        <td className="p-3">기본</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">2명</td>
                        <td className="p-3"><strong>연 55만원</strong></td>
                        <td className="p-3">1명 25만 + 2명 30만</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">3명</td>
                        <td className="p-3"><strong>연 95만원</strong></td>
                        <td className="p-3">1명 25만 + 2명 30만 + 3명 40만</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">4명 이상</td>
                        <td className="p-3"><strong>55만 + (명수−2) × 40만</strong></td>
                        <td className="p-3">기본 55만 + 추가분 누적</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  예를 들어 자녀가 4명이면 55만 + (4−2) × 40만 = 55만 + 80만 = <strong>135만원</strong>을 연간 소득세에서 공제합니다.
                </p>
                <p className="mt-4">
                  ⚠️ 다만 맞벌이 부부인 경우, 한 명의 배우자가 기본공제를 받는 자녀만 세액공제 대상입니다. 예: 부인이 자녀를 기본공제하면 부인만 자녀세액공제를 받으며, 남편은 같은 자녀에 대해 공제를 받을 수 없습니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">자녀세액공제 적용 기준 — 8세 이상이 핵심</h2>
                <p>
                  자녀세액공제가 적용되려면 몇 가지 기준을 만족해야 합니다. 가장 중요한 것이 8세 이상 기준입니다.
                </p>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li>
                    <strong>8세 이상:</strong> 기본공제대상이 되려면 대상 자녀가 8세 이상이어야 합니다(소득세법 §59의2①). 8세 미만 자녀는 아동수당 대상이므로 정책상 자녀세액공제에서 제외됩니다.
                  </li>
                  <li>
                    <strong>기본공제대상:</strong> 한국 국적 보유, 생계 동일, 연간 소득 100만원 이하여야 합니다.
                  </li>
                  <li>
                    <strong>손자녀 포함:</strong> 2024년 개정으로 기본공제대상 손자녀(8세 이상)도 포함되었습니다(소득세법 §59의2①).
                  </li>
                  <li>
                    <strong>한 배우자만:</strong> 부부의 경우 한 명만 기본공제를 받으므로, 같은 자녀에 대해 둘 다 공제를 받을 수는 없습니다.
                  </li>
                </ul>
                <p className="mt-4">
                  ⚠️ 다만 2026년 4월 21일부터 연령 기준이 단계적으로 인상되는 규정이 적용됩니다. 자세한 정보는 국세청 공식 공지를 참조하세요.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">자녀세액공제 실제 계산 사례</h2>
                <p>
                  다음 3가지 사례를 통해 자녀세액공제가 실제로 얼마나 효과가 있는지 살펴보겠습니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 1. 자녀 1명 (8세)</p>
                  <p className="text-sm text-text-secondary">
                    · 기본공제대상 자녀: 1명 (8세 이상)
                    <br />
                    · 연 25만원 공제액
                    <br />
                    · 산출 소득세액: 600만원
                    <br />
                    · 세액공제 후 실제 납부세액: 600만원 − 25만원 = <strong>575만원</strong>
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 연 25만원의 세금 감면 효과. 월 약 2만원대 절감.</span>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 2. 자녀 2명 (8세, 11세)</p>
                  <p className="text-sm text-text-secondary">
                    · 기본공제대상 자녀: 2명 (모두 8세 이상)
                    <br />
                    · 1명 25만 + 2명 30만 = 연 55만원 공제액
                    <br />
                    · 산출 소득세액: 700만원
                    <br />
                    · 세액공제 후 실제 납부세액: 700만원 − 55만원 = <strong>645만원</strong>
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 연 55만원 세감. 월 약 4.5만원 절감.</span>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 3. 자녀 3명 (7세, 10세, 13세)</p>
                  <p className="text-sm text-text-secondary">
                    · 기본공제대상 자녀: 2명 (8세 이상만 해당 = 10세, 13세)
                    <br />
                    · ※ 7세는 아동수당 대상이므로 자녀세액공제 제외
                    <br />
                    · 공제액: 1명 25만 + 2명 30만 = <strong>55만원</strong>
                    <br />
                    · 산출 소득세액: 800만원
                    <br />
                    · 세액공제 후 실제 납부세액: 800만원 − 55만원 = <strong>745만원</strong>
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 7세 자녀는 포함되지 않아 2명 기준으로 공제. 3명 모두 8세 이상이면 95만원 가능.</span>
                  </p>
                </div>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">출산·입양 세액공제 (자녀세액공제와 별개)</h2>
                <p>
                  자녀세액공제와는 별도로, 출산 또는 입양 시 그 첫해에만 추가로 공제받을 수 있는 제도가 있습니다(소득세법 §59의2②).
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 2. 출산·입양 세액공제액 (소득세법 §59의2②, 2026 현행)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">출산/입양 순서</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">세액공제액</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">적용 시점</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">첫째 (출산/입양)</td>
                        <td className="p-3"><strong>30만원</strong></td>
                        <td className="p-3">출생/입양 첫해만</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">둘째 (출산/입양)</td>
                        <td className="p-3"><strong>50만원</strong></td>
                        <td className="p-3">출생/입양 첫해만</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">셋째 이상 (출산/입양)</td>
                        <td className="p-3"><strong>70만원</strong></td>
                        <td className="p-3">출생/입양 첫해만</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  예를 들어 올해 첫 자녀를 출산하면, 그 자녀가 8세가 되어 자녀세액공제를 받기 시작하는 해가 올 때까지 매년 25만원씩 공제받습니다. 단, 출산한 첫해에는 25만원이 아니라 30만원(출산공제)을 추가로 받게 됩니다.
                </p>
                <p className="mt-4">
                  ⚠️ 다만 출산·입양 공제는 그 해 한 번만 적용되며, 이후 해에는 일반적인 자녀세액공제 규칙을 따릅니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">맞벌이 부부의 자녀세액공제</h2>
                <p>
                  맞벌이 부부인 경우 자녀세액공제를 받는 방법이 다릅니다. 기본공제와 연동되기 때문입니다.
                </p>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li>
                    <strong>기본공제는 한 명만:</strong> 소득세법 §51에 따라 부부 중 한 명만 자녀를 기본공제할 수 있습니다.
                  </li>
                  <li>
                    <strong>자녀세액공제도 한 명만:</strong> 기본공제를 받는 배우자만 자녀세액공제를 신청할 수 있습니다.
                  </li>
                  <li>
                    <strong>부부 협의로 결정:</strong> 예를 들어 부인의 소득세가 남편보다 높으면 부인이 기본공제를 받아 자녀세액공제 효과를 극대화하는 것이 유리합니다.
                  </li>
                  <li>
                    <strong>매년 변경 가능:</strong> 부부가 협의하여 매년 누가 기본공제를 받을지 결정할 수 있습니다.
                  </li>
                </ul>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">맞벌이 사례: 부부 최적화 전략</p>
                  <p className="text-sm text-text-secondary">
                    · 부: 연봉 7,000만원, 예상 산출 소득세 550만원
                    <br />
                    · 부인: 연봉 4,000만원, 예상 산출 소득세 200만원
                    <br />
                    · 자녀 2명 (모두 8세 이상)
                    <br />
                    <br />
                    전략: 부인이 기본공제 + 자녀세액공제(55만원) 신청
                    <br />
                    → 부인 소득세: 200만 − 55만 = 145만 절감 (효과 큼)
                    <br />
                    vs 부가 공제 시: 550만 − 55만 = 495만 (동일 효과)
                    <br />
                    <br />
                    결론: 소득세가 낮은 배우자가 공제를 받으면 누진세율로 인해 절감 효과는 동일하나, 가정의 전체 세부담을 고려하면 고소득 배우자가 공제받는 것이 효율적일 수 있습니다.
                  </p>
                </div>
                <p className="mt-4">
                  ⚠️ 다만 맞벌이 부부의 최적 전략은 배우자의 소득수준·세 부담 현황 등에 따라 달라지므로, 연말정산 시 전문가와 상담하는 것이 좋습니다.
                </p>
              </section>

              <AdSlot slot="guide-child-tax-credit-mid" format="rectangle" />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h2 className="text-2xl font-bold">자녀세액공제 신청 방법</h2>
                <p>
                  근로소득자와 종합소득자의 신청 방법이 다릅니다.
                </p>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li>
                    <strong>근로소득자 (직장인):</strong> 연말정산 시 제출하는 <strong>근로소득자 기본공제 신청 서식</strong>에 기본공제대상 자녀를 기재하면 자동으로 자녀세액공제가 계산됩니다. 별도 신청서는 불필요합니다.
                  </li>
                  <li>
                    <strong>종합소득자 (프리랜서·사업가):</strong> 종합소득세 신고 시 소득세 신고 서식의 "세액공제" 항목에 자녀 수를 입력하고, 기본공제대상 임을 증명하는 서류(가족관계증명서 등)를 첨부하면 됩니다.
                  </li>
                  <li>
                    <strong>퇴직소득자:</strong> 퇴직소득 연말정산 서식에 자녀 정보를 기재합니다.
                  </li>
                </ul>
                <p className="mt-4">
                  ⚠️ 다만 출산·입양 세액공제는 별도의 증명 서류(출생증명서, 입양 관련 서류)가 필요할 수 있으므로, 신청 전에 관련 서류를 준비하는 것이 좋습니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">프리랜서·사업가도 자녀세액공제를 받을 수 있습니다</h2>
                <p>
                  자녀세액공제는 근로소득자뿐 아니라 종합소득자(프리랜서, 사업가)도 적용됩니다(소득세법 §59의2). 많은 사람들이 직장인만 받을 수 있다고 생각하는데, 이는 잘못된 정보입니다.
                </p>
                <p className="mt-4">
                  프리랜서나 소상공인이 매년 종합소득세 신고를 할 때 기본공제대상 자녀를 기재하면, 위와 동일하게 자녀수별 공제액이 자동으로 계산되어 납부세액에서 차감됩니다.
                </p>
                <p className="mt-4">
                  ⚠️ 다만 프리랜서·사업가의 경우 소득이 년간 100만원 이상 자녀는 기본공제 대상이 아니므로, 세액공제도 받을 수 없습니다. 예: 대학 다니는 성인 자녀가 아르바이트로 연 150만원을 버는 경우, 그 자녀는 기본공제 대상이 아니므로 자녀세액공제 대상도 아닙니다.
                </p>
              </section>

              <h2 className="text-2xl font-bold mb-6">자주 묻는 질문</h2>
              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h3 className="text-lg font-semibold text-text-primary">관련 계산기 및 가이드</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link
                    href="/calculator/salary/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">연봉 실수령액 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">세액공제 반영된 세후 월급을 계산해보세요.</p>
                  </Link>
                  <Link
                    href="/guide/personal-deduction-dependent-150-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">기본공제·부양가족 기준 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">자녀세액공제의 전제 조건인 기본공제를 완벽하게 이해하세요.</p>
                  </Link>
                  <Link
                    href="/guide/income-deduction-vs-tax-credit-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">소득공제 vs 세액공제</div>
                    <p className="mt-1 text-sm text-text-secondary">왜 세액공제가 더 효과적인지 정확히 알아보세요.</p>
                  </Link>
                  <Link
                    href="/guide/year-end-tax-settlement/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">연말정산 완벽 가이드</div>
                    <p className="mt-1 text-sm text-text-secondary">자녀세액공제를 포함한 연말정산 전체 프로세스.</p>
                  </Link>
                  <Link
                    href="/category/tax/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">모든 세금 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">양도세·취득세·상속세·상여세 등 전체 계산기.</p>
                  </Link>
                  <Link
                    href="/guide/child-earned-income-tax-credit-application-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">자녀 근로소득 세액공제</div>
                    <p className="mt-1 text-sm text-text-secondary">아르바이트 자녀가 받을 수 있는 별도의 공제.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 교육 목적으로 작성되었으며, 개인 맞춤형 세무 조언이 아닙니다. 실제 자녀세액공제 신청 시 기본공제대상 여부, 출산·입양 증명 서류, 맞벌이 최적화 전략 등은 국세청 또는 세무 전문가와 상담하세요. 본 콘텐츠는 2026-07-03을 기준으로 작성되었으며, 세법 개정 시 즉시 업데이트됩니다. 자녀세액공제의 정확한 기준은 법조항 <strong>소득세법 §59의2(자녀세액공제)</strong>를 따릅니다. AI 보조 작성 후 운영자 검수 완료.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터</a>,{' '}
                  <a href="https://www.nts.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">국세청(세법 해석·신청)</a>,{' '}
                  <a href="https://easylaw.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">찾기쉬운 생활법령정보</a>.
                </p>
              </section>

              <ShareButtons
                title="자녀세액공제 2026 가이드"
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
