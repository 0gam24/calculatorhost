// [revenue-lever: indexing+traffic]
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

const URL = 'https://calculatorhost.com/guide/spouse-inheritance-deduction-2026/';
const DATE_PUBLISHED = '2026-08-12';
const DATE_MODIFIED = '2026-08-12';

export const metadata: Metadata = {
  title: '배우자 상속공제 2026, 최소 5억 최대 30억 계산법',
  description:
    '배우자가 살아 있으면 상속세 계산에서 최소 5억원은 무조건 공제됩니다. 실제 상속액과 법정상속분에 따라 최대 30억원까지 늘어나는 배우자 상속공제의 한도 계산법과 사례를 상속세및증여세법 §19 기준으로 정리했습니다.',
  keywords: [
    '배우자 상속공제',
    '배우자 상속공제 한도',
    '배우자 상속공제 5억',
    '배우자 상속공제 30억',
    '법정상속분 계산',
    '상속세 배우자 공제',
    '상속세및증여세법 19조',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '배우자 상속공제 2026, 최소 5억 최대 30억 계산법' }],
    title: '배우자 상속공제 2026, 최소 5억 최대 30억까지 공제받는 법',
    description: '배우자가 실제로 한 푼도 안 받아도 5억원은 공제. 실제 상속액과 법정상속분에 따라 최대 30억원. 상증법 §19.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '배우자 상속공제 2026, 최소 5억 최대 30억',
    description: '배우자 생존 시 상속세에서 최소 5억, 실제 상속액과 법정상속분에 따라 최대 30억 공제. 상증법 §19.',
  },
};

const FAQ_ITEMS = [
  {
    question: '배우자가 실제로 상속을 하나도 안 받아도 공제되나요?',
    answer:
      '네, 5억원은 무조건 공제됩니다(상속세및증여세법 §19④). 배우자가 상속을 포기하거나 실제 상속받은 금액이 5억원보다 적어도, 배우자가 생존해 있으면 최소 5억원의 배우자 상속공제가 적용됩니다. 다만 이 최소 5억원 공제를 받으려면 배우자가 상속인으로 남아 있어야 하며, 협의분할 등으로 상속인 지위 자체가 없어지면 달라질 수 있습니다.',
  },
  {
    question: '배우자 상속공제 한도는 어떻게 정해지나요?',
    answer:
      '공제액은 배우자가 실제 상속받은 금액을 기준으로 하되, 배우자의 법정상속분 상당액과 30억원 중 작은 금액을 한도로 합니다(상증법 §19①). 즉 실제 상속액, 법정상속분 상당액, 30억원 이 세 가지 중 가장 작은 값이 공제되며, 그 값이 5억원보다 작으면 최소 5억원이 보장됩니다.',
  },
  {
    question: '법정상속분은 어떻게 계산하나요?',
    answer:
      '배우자는 1.5, 자녀는 각각 1의 비율입니다(민법 §1009). 예를 들어 배우자와 자녀 2명이면 1.5 대 1 대 1이므로 전체 3.5 중 배우자 몫은 1.5, 즉 3/7입니다. 상속재산이 20억원이면 배우자 법정상속분 상당액은 약 8억 5,700만원입니다.',
  },
  {
    question: '배우자 상속공제와 일괄공제를 같이 받을 수 있나요?',
    answer:
      '네, 별개 제도라 중복 적용됩니다. 기초공제와 그 밖의 인적공제 합계 대신 선택하는 일괄공제 5억원(상증법 §21)과 배우자 상속공제는 함께 적용됩니다. 따라서 배우자가 있으면 일괄공제 5억원에 더해 배우자 상속공제를 추가로 받아, 최소 10억원까지 공제받는 구조가 일반적입니다.',
  },
  {
    question: '배우자 상속공제를 최대로 받으려면 어떻게 해야 하나요?',
    answer:
      '배우자가 법정상속분 한도까지 실제로 상속을 받고, 상속세 신고기한 다음 날부터 9개월이 되는 날까지 상속재산을 배우자 명의로 분할(등기·등록·명의개서 등)해야 합니다(상증법 §19②). 이 기한 내에 분할 신고를 하지 않으면 실제 상속액을 인정받지 못하고 최소 5억원만 공제될 수 있으므로 분할과 신고 시점 관리가 중요합니다.',
  },
  {
    question: '자녀 없이 배우자만 있으면 공제가 어떻게 되나요?',
    answer:
      '자녀가 없고 배우자와 직계존속(부모)이 공동상속인이면 배우자 법정상속분은 1.5 대 1 비율로 계산됩니다. 직계존속도 없어 배우자가 단독상속인이면 법정상속분이 상속재산 전체가 되므로, 실제 상속액과 30억원 한도 안에서 공제됩니다. 구체적 상황은 상속인 구성에 따라 달라지므로 세무 전문가 확인을 권장합니다.',
  },
  {
    question: '배우자 상속공제만으로 상속세가 0원이 될 수도 있나요?',
    answer:
      '상속재산이 배우자 상속공제와 일괄공제 합계 이하이면 과세표준이 0이 되어 낼 세금이 없을 수 있습니다. 예를 들어 상속재산 10억원 이하이면 일괄공제 5억원과 배우자 상속공제 최소 5억원만으로 과세표준이 0이 되는 경우가 많습니다. 다만 사전증여재산 합산, 추정상속재산 등으로 과세가액이 늘 수 있으니 실제 신고 전 확인이 필요합니다.',
  },
  {
    question: '배우자 상속공제에도 종합한도가 적용되나요?',
    answer:
      '네, 모든 상속공제는 상속세 과세가액에서 일정 항목을 뺀 공제 종합한도 내에서만 적용됩니다(상증법 §24). 상속인이 아닌 자에게 유증한 재산, 상속인의 상속포기로 후순위가 받은 재산, 사전증여재산 과세표준 등은 종합한도에서 차감됩니다. 따라서 공제 항목을 단순 합산한 금액이 그대로 인정되지 않을 수 있어 정확한 계산은 국세청 홈택스나 세무 전문가를 통해 확인하세요.',
  },
];

export default function SpouseInheritanceDeduction2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '배우자 상속공제 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '배우자 상속공제 2026, 최소 5억 최대 30억 계산법',
    description:
      '배우자 생존 시 상속세에서 최소 5억원, 실제 상속액과 법정상속분에 따라 최대 30억원까지 공제되는 배우자 상속공제의 한도 계산법과 사례, 분할신고 기한까지 상속세및증여세법 §19 기준으로 정리.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['배우자 상속공제', '법정상속분', '상속세', '일괄공제', '상증법 19조'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '배우자 상속공제 2026',
    description:
      '배우자 상속공제의 최소 5억 보장과 최대 30억 한도, 법정상속분 계산법과 분할신고 기한을 정리한 가이드.',
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
                    { name: '배우자 상속공제 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">상속인·자산가 · 8분 읽기 · 2026-08-12</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  배우자 상속공제 2026
                  <br />
                  <span className="text-2xl text-text-secondary">최소 5억, 최대 30억까지 공제</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  부모 중 한 분이 돌아가시고 배우자가 생존해 있으면 상속세 부담이 크게 줄어듭니다. 배우자 상속공제 덕분에 최소 5억원은 조건 없이 공제되고, 상황에 따라 최대 30억원까지 공제되기 때문입니다. 이 가이드는 배우자 상속공제의 정확한 한도 계산법, 법정상속분과의 관계, 분할신고 기한, 그리고 실제 계산 사례를 상속세및증여세법 §19를 기준으로 정리합니다.
                </p>
              </header>

              <AdSlot slot="guide-spouse-inheritance-deduction-top" format="horizontal" />

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">배우자 상속공제란 무엇인가요?</h2>
                <p>
                  배우자 상속공제는 피상속인의 배우자가 생존해 있을 때 상속세 과세가액에서 일정 금액을 빼주는 제도입니다(상증법 §19). 부부가 함께 형성한 재산에 대해 한 사람이 사망했다는 이유로 곧바로 무거운 세금을 매기는 것이 부당하다는 취지에서 마련됐습니다.
                </p>
                <p>
                  핵심은 두 가지입니다. 첫째, 배우자가 실제로 상속을 받았는지와 무관하게 최소 5억원은 공제됩니다. 둘째, 배우자가 법정상속분 범위에서 실제로 많이 상속받으면 최대 30억원까지 공제가 늘어납니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">한 줄 요약</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    배우자 상속공제 = 실제 상속액, 법정상속분 상당액, 30억원 중 가장 작은 값. 단, 그 값이 5억원 미만이면 5억원을 공제.
                  </p>
                </div>
                <p>
                  다만 여기서 말하는 배우자는 법률상 혼인 관계에 있는 배우자를 의미합니다. 사실혼 배우자는 상속인이 아니므로 원칙적으로 배우자 상속공제 대상이 아닙니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">공제 한도는 얼마까지인가요?</h2>
                <p>
                  공제 한도는 배우자가 실제 상속받은 금액을 기준으로 하되, 배우자의 법정상속분 상당액과 30억원 중 작은 금액을 상한으로 둡니다. 아래 표로 정리하면 이해가 빠릅니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 배우자 실제 상속액에 따른 공제액 (상증법 §19)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">배우자 실제 상속액</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">공제액</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">0원 포함 5억원 이하</td>
                        <td className="p-3"><strong>5억원</strong> (최소 보장)</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">5억원 초과, 법정상속분 상당액 이내</td>
                        <td className="p-3">실제 상속액 전액</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">법정상속분 상당액 초과</td>
                        <td className="p-3">법정상속분 상당액 (최대 30억원)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p>
                  즉 배우자가 아무리 많이 상속받아도 법정상속분 상당액과 30억원을 넘는 부분은 공제되지 않습니다. 반대로 한 푼도 안 받아도 5억원은 보장됩니다.
                </p>
                <p>
                  예외: 여기서 실제 상속액은 배우자가 상속받은 재산에서 배우자가 승계한 채무와 공과금을 뺀 순액으로 계산하며, 배우자가 상속개시 전 10년 이내에 미리 증여받아 합산된 재산이 있으면 그 과세표준을 법정상속분 상당액에서 차감합니다. 계산이 복잡해지므로 큰 금액은 반드시 검산이 필요합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">법정상속분은 어떻게 계산하나요?</h2>
                <p>
                  법정상속분은 민법 §1009에 따라 정해집니다. 배우자는 다른 상속인보다 5할을 더 받는 구조로, 배우자 1.5 대 자녀 각 1의 비율입니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 2. 상속인 구성별 배우자 법정상속분 (민법 §1009)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">상속인 구성</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">배우자 법정상속분</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">배우자 + 자녀 1명</td>
                        <td className="p-3">1.5 / 2.5 = 3/5 (60%)</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">배우자 + 자녀 2명</td>
                        <td className="p-3">1.5 / 3.5 = 3/7 (약 42.9%)</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">배우자 + 자녀 3명</td>
                        <td className="p-3">1.5 / 4.5 = 1/3 (약 33.3%)</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">배우자 + 부모 (자녀 없음)</td>
                        <td className="p-3">1.5 / 2.5 이상 (부모 수에 따라)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p>
                  다만 상속을 포기한 사람이 있으면 남은 상속인끼리 비율을 다시 나눠 계산하므로, 배우자 몫이 커질 수 있습니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">배우자 상속공제 실제 계산 사례</h2>
                <p>
                  아래 세 가지 사례로 공제가 실제로 어떻게 적용되는지 살펴봅니다. 모두 상속인이 배우자와 자녀 2명인 경우를 가정합니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 1. 상속재산 20억원, 배우자가 10억원 상속</p>
                  <p className="text-sm text-text-secondary">
                    · 배우자 법정상속분 상당액: 20억원 × 3/7 = 약 8억 5,700만원
                    <br />
                    · 공제액: min(실제 10억원, 법정 8억 5,700만원, 30억원) = <strong>약 8억 5,700만원</strong>
                    <br />
                    · 일괄공제 5억원 추가 → 총공제 약 13억 5,700만원
                    <br />
                    · 과세표준(단순): 20억원 − 13억 5,700만원 = 약 6억 4,300만원
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 실제로 10억원을 받아도 법정상속분인 약 8.57억원까지만 공제.</span>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 2. 상속재산 20억원, 배우자가 3억원만 상속</p>
                  <p className="text-sm text-text-secondary">
                    · 실제 상속액 3억원은 5억원보다 적음
                    <br />
                    · 공제액: 최소 보장 <strong>5억원</strong> 적용
                    <br />
                    · 일괄공제 5억원 추가 → 총공제 10억원
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 적게 받으면 최소 5억원이 보장되어 오히려 실제 상속액보다 공제가 큼.</span>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 3. 상속재산 100억원, 배우자가 법정상속분 이상 상속</p>
                  <p className="text-sm text-text-secondary">
                    · 배우자 법정상속분 상당액: 100억원 × 3/7 = 약 42억 8,600만원
                    <br />
                    · 공제 상한 30억원 적용 → 공제액 <strong>30억원</strong>
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 법정상속분이 30억원을 넘어도 배우자 상속공제 상한은 30억원.</span>
                  </p>
                </div>
                <p className="mt-4">
                  위 과세표준에 상속세율(상증법 §26, 10~50% 누진)을 적용해 산출세액을 계산합니다. 예를 들어 과세표준 6억 4,300만원은 5억원 초과 10억원 이하 구간이라 30% 세율에 누진공제 6,000만원이 적용됩니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">일괄공제와 함께 받으면 얼마나 줄어드나요?</h2>
                <p>
                  배우자 상속공제와 일괄공제는 별개 제도라 함께 적용됩니다. 배우자가 있으면 일괄공제 5억원에 배우자 상속공제 최소 5억원을 더해, 합계 10억원까지는 상속세가 나오지 않는 경우가 많습니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">자주 쓰이는 조합</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    일괄공제 5억원 + 배우자 상속공제 최소 5억원 = <strong>10억원</strong>
                    <br />
                    → 상속재산이 10억원 이하이고 다른 합산 재산이 없으면 과세표준이 0이 되어 낼 세금이 없을 수 있습니다.
                  </p>
                </div>
                <p>
                  다만 사망 전 10년 이내에 상속인에게 증여한 재산(5년 이내 상속인 외 증여 포함)은 상속재산에 합산되고, 보험금이나 추정상속재산이 과세가액에 더해질 수 있습니다. 따라서 단순히 재산이 10억원 이하라고 해서 무조건 세금이 0이 되는 것은 아닙니다.
                </p>
              </section>

              <AdSlot slot="guide-spouse-inheritance-deduction-mid" format="rectangle" />

              <section className="space-y-6 border-t border-border-base pt-8" data-speakable>
                <h2 className="text-2xl font-bold">분할신고 기한을 놓치면 어떻게 되나요?</h2>
                <p>
                  배우자가 법정상속분 한도까지 공제를 받으려면 상속재산을 실제로 배우자 앞으로 분할하고 신고해야 합니다. 기한은 상속세 신고기한 다음 날부터 9개월이 되는 날(배우자 상속재산 분할기한)까지입니다(상증법 §19②).
                </p>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li>
                    <strong>분할 방법:</strong> 부동산은 등기, 예금은 명의개서, 주식은 명의개서 등 실제 소유권 이전 절차를 마쳐야 합니다.
                  </li>
                  <li>
                    <strong>기한 도과 시:</strong> 분할신고를 못 하면 실제 상속액을 인정받지 못하고 최소 5억원만 공제될 수 있습니다.
                  </li>
                  <li>
                    <strong>부득이한 사유:</strong> 상속재산에 관한 소송 등 부득이한 사유가 있으면 그 사유 종료일까지 분할기한이 연장될 수 있으나, 사유 신고 등 요건을 갖춰야 합니다.
                  </li>
                </ul>
                <p>
                  예외: 상속인들이 협의분할을 하면서 배우자 몫을 지나치게 늘리면, 나중에 자녀에게 다시 넘길 때 증여 문제가 생길 수 있습니다. 절세 효과와 향후 이전 계획을 함께 고려해야 합니다.
                </p>
              </section>

              <h2 className="text-2xl font-bold mb-6">자주 묻는 질문</h2>
              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h3 className="text-lg font-semibold text-text-primary">관련 계산기 및 가이드</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link
                    href="/calculator/inheritance-tax/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">상속세 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">상속재산과 공제를 입력해 예상 상속세를 계산하세요.</p>
                  </Link>
                  <Link
                    href="/guide/inheritance-tax-calculation-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">상속세 계산법 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">과세가액·공제·세율의 전체 흐름을 이해하세요.</p>
                  </Link>
                  <Link
                    href="/guide/inheritance-tax-deduction-limit-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">상속공제 종합한도</div>
                    <p className="mt-1 text-sm text-text-secondary">공제가 그대로 인정되지 않는 종합한도 규칙을 확인하세요.</p>
                  </Link>
                  <Link
                    href="/guide/inheritance-tax-10-year-prior-gift-aggregation/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">10년 내 사전증여 합산</div>
                    <p className="mt-1 text-sm text-text-secondary">상속재산에 합산되는 사전증여의 범위를 짚어봅니다.</p>
                  </Link>
                  <Link
                    href="/guide/inheritance-vs-gift-tax-comparison-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">상속세 vs 증여세 비교</div>
                    <p className="mt-1 text-sm text-text-secondary">어느 쪽이 유리한지 세율·공제 구조로 비교합니다.</p>
                  </Link>
                  <Link
                    href="/category/tax/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">모든 세금 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">양도세·취득세·상속세·증여세 모음.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 교육 목적으로 작성되었으며, 개인 맞춤형 세무 조언이 아닙니다. 배우자 상속공제액, 법정상속분 상당액, 사전증여 합산, 공제 종합한도 등은 상속인 구성과 재산 내역에 따라 크게 달라집니다. 실제 상속세 신고 전에는 국세청 홈택스 또는 세무 전문가를 통해 반드시 확인하세요. 본 콘텐츠는 2026-08-12 기준으로 작성되었으며, 관련 법령 개정 시 업데이트됩니다. 인용 법조항: <strong>상속세및증여세법 §19(배우자 상속공제), §21(일괄공제), §24(공제 적용의 한도), §26(세율), 민법 §1009(법정상속분)</strong>. AI 보조 작성 후 운영자 검수 완료.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터</a>,{' '}
                  <a href="https://www.nts.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">국세청</a>,{' '}
                  <a href="https://hometax.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">홈택스</a>.
                </p>
              </section>

              <ShareButtons
                title="배우자 상속공제 2026 가이드"
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
