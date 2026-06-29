import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { Footer } from '@/components/layout/Footer';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { AdSlot } from '@/components/ads/AdSlot';
import { FaqSection } from '@/components/calculator/FaqSection';
import {
  buildBreadcrumbJsonLd,
  buildArticleJsonLd,
  buildWebPageJsonLd,
  buildFaqPageJsonLd,
  buildSpeakableJsonLd,
} from '@/lib/seo/jsonld';

const URL = 'https://calculatorhost.com/guide/salary-take-home-2026-july-insurance-increase/';
const DATE_PUBLISHED = '2026-06-29';
const DATE_MODIFIED = '2026-06-29';

export const metadata: Metadata = {
  title: '2026년 7월 국민연금 인상 후 월급 실수령액 변화 (9.0→9.5%)',
  description:
    '7월 1일 국민연금 요율 9.0→9.5% 인상으로 월 실수령액이 얼마나 줄어드나? 기준소득월액 상한선 인상(637만→659만원)과 함께 정확한 시뮬레이션. 근로자 부담 3,000~45,000원 추가 인상.',
  keywords: [
    '국민연금 인상 2026',
    '7월 실수령액',
    '월급 변화',
    '기준소득월액 상한',
    '국민연금법 88조',
    '근로자 부담',
    '4대보험료',
    '세후 월급',
    '연봉 실수령',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '2026년 7월 국민연금 인상 후 월급 실수령액 변화' }],
    title: '2026년 7월 국민연금 인상 후 월급 실수령액 변화',
    description: '7월부터 국민연금 요율 인상, 월급에서 공제액이 얼마나 늘어나는지 실제 시뮬레이션.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
};

const FAQ_ITEMS = [
  {
    question: '7월부터 국민연금이 9.5%로 올라가는 이유는?',
    answer:
      '국민연금법 §88에 따른 2026년 단계적 인상입니다. 국민연금의 장기 재정 안정성 확보를 위해 1단계로 7월부터 0.25%p 인상되며, 1~6월은 기존 9.0%, 7월부터 9.5%가 적용됩니다.',
  },
  {
    question: '월급 300만원이면 7월부터 실수령액이 얼마나 줄어드나?',
    answer:
      '국민연금 부담만 월 7,500원 증가합니다(300만×0.25%=7,500원). 인상은 하반기 6개월에만 적용되므로 연간으로는 약 45,000원(7,500원×6개월) 추가 부담입니다. 건강보험·고용보험은 7월 변동이 없습니다.',
  },
  {
    question: '월급이 700만원 이상이면 인상 영향이 적다고?',
    answer:
      '오히려 영향이 더 큽니다. 상한선(7월~659만원)까지만 부과되지만, 상한 자체가 637만→659만으로 올라 1~6월 286,650원(637만×4.5%)에서 7~12월 313,025원(659만×4.75%)으로 월 약 26,375원 늘어납니다. 300만원 기준(월 7,500원)보다 추가 부담이 큽니다.',
  },
  {
    question: '기준소득월액 상한선이 637만→659만원으로 올라가는데, 이게 뭐예요?',
    answer:
      '국민연금료는 월급의 일정 비율이지만, 최대 기준소득월액 상한까지만 적용됩니다. 1~6월에는 637만원, 7월부터는 659만원입니다. 월급이 659만원을 초과하면 초과분에 대해서는 국민연금료가 공제되지 않습니다.',
  },
  {
    question: '7월에 연봉협상을 한다면 뭘 주의해야 할까?',
    answer:
      '연간 실수령액을 계산할 때, 1~6월은 국민연금 4.5%, 7~12월은 4.75%를 각각 반영해야 합니다. 단순히 월급 × 12를 하면 실수령액을 과다하게 계산합니다. 연봉 실수령액 계산기의 "6개월 경계" 옵션을 활용하거나, 상반기 합계 + 하반기 합계로 나눠 계산하세요.',
  },
  {
    question: '월급 500만원일 때 정확한 7월 공제액은?',
    answer:
      '국민연금 500만×4.75%=237,500원, 건강보험 500만×3.545%=177,250원, 장기요양 177,250×12.95%=약 22,954원, 고용보험 500만×0.9%=45,000원. 합계 약 482,700원(약 9.7% 공제율). 1~6월에는 국민연금이 225,000원으로 월 12,500원 적게 공제됩니다.',
  },
  {
    question: '7월 인상은 실수령액뿐 아니라 퇴직금에도 영향을 줄까?',
    answer:
      '네, 퇴직금 계산 시 1~6월 동안의 국민연금 공제액(4.5%)과 7월 이후 공제액(4.75%)이 별도로 적용됩니다. 연중 퇴직하는 경우 정확한 계산을 위해 상반기·하반기를 나누어 계산해야 실수령액을 정확히 파악할 수 있습니다.',
  },
  {
    question: '기준소득월액 상한선이 있으면 고소득자는 7월 인상의 영향을 거의 안 받나?',
    answer:
      '상한선 이상 고소득자도 영향을 받습니다. 예를 들어 월급 800만원이라면, 1~6월은 637만×4.5%=286,650원, 7월~은 659만×4.75%=313,025원으로 월 26,375원 추가 부담. 월급이 높아도 상한선 인상(637만→659만)과 요율 인상이 함께 반영됩니다.',
  },
];

export default function SalaryTakeHome2026JulyInsuranceIncreasePage() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '2026년 7월 국민연금 인상 후 월급 변화' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '2026년 7월 국민연금 인상 후 월급 실수령액 변화 — 정확한 시뮬레이션',
    description:
      '7월 1일부터 시작되는 국민연금 요율 9.0→9.5% 인상(국민연금법 §88)으로 월급 실수령액이 얼마나 줄어드는지 정확히 계산. 기준소득월액 상한선 인상(637만→659만원) 함께 정리.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['국민연금', '7월 인상', '실수령액', '기준소득월액', '4대보험'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '2026년 7월 국민연금 인상 후 월급 실수령액 변화',
    description:
      '7월부터 국민연금 인상(9.0→9.5%, 국민연금법 §88), 기준소득월액 상한(637만→659만원 인상). 월급 300만~800만원 기준 정확한 추가 공제액 시뮬레이션.',
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
                    { name: '2026년 7월 국민연금 인상 후 월급 변화' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">근로 · 8분 읽기 · 2026-06-29</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  2026년 7월 국민연금 인상 후 월급 실수령액 변화
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  2026년 7월 1일부터 국민연금 요율이 9.0%에서 9.5%로 인상됩니다(국민연금법 §88).
                  근로자 부담률도 4.5%에서 4.75%로 올라가며, 기준소득월액 상한선도 637만원에서 659만원으로 조정됩니다.
                  월급에서 공제되는 4대보험료가 얼마나 달라지는지 정확히 계산해 봅시다.
                </p>
              </header>

              <AdSlot slot="guide-salary-take-home-july-top" format="horizontal" />

              {/* Structured Summary */}
              <section aria-label="요약" className="card border-l-4 border-l-primary-500">
                <h2 className="mb-2 text-caption uppercase tracking-wider text-primary-500">2026년 7월 국민연금 인상 요약</h2>
                <table className="w-full border-collapse text-sm">
                  <caption className="mb-2 text-left text-xs font-semibold text-text-secondary">국민연금 요율 변화 (국민연금법 §88)</caption>
                  <thead>
                    <tr className="border-b border-border-base">
                      <th scope="col" className="px-3 py-2 text-left font-semibold">항목</th>
                      <th scope="col" className="px-3 py-2 text-center font-semibold">1~6월</th>
                      <th scope="col" className="px-3 py-2 text-center font-semibold">7월~12월</th>
                      <th scope="col" className="px-3 py-2 text-center font-semibold">변화</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-border-base">
                      <td className="px-3 py-2 font-semibold">국민연금(총)</td>
                      <td className="px-3 py-2 text-center"><strong>9.0%</strong></td>
                      <td className="px-3 py-2 text-center"><strong>9.5%</strong></td>
                      <td className="px-3 py-2 text-center text-highlight-500">+0.5%p</td>
                    </tr>
                    <tr className="border-b border-border-base">
                      <td className="px-3 py-2 font-semibold">근로자 부담</td>
                      <td className="px-3 py-2 text-center"><strong>4.5%</strong></td>
                      <td className="px-3 py-2 text-center"><strong>4.75%</strong></td>
                      <td className="px-3 py-2 text-center text-highlight-500">+0.25%p</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2 font-semibold">기준소득월액 상한</td>
                      <td className="px-3 py-2 text-center"><strong>637만원</strong></td>
                      <td className="px-3 py-2 text-center"><strong>659만원</strong></td>
                      <td className="px-3 py-2 text-center text-highlight-500">+22만원</td>
                    </tr>
                  </tbody>
                </table>
              </section>

              {/* TL;DR */}
              <section className="card bg-card p-3">
                <h2 className="mb-2 text-xs font-semibold uppercase tracking-wider text-primary-500">한눈에 보기</h2>
                <ul className="space-y-1 text-sm" data-speakable>
                  <li>✓ 국민연금 근로자 부담 4.5% → 4.75% (0.25%p 인상)</li>
                  <li>✓ 월급 300만원 기준 월 7,500원 추가 공제</li>
                  <li>✓ 월급 500만원 기준 월 12,500원 추가 공제</li>
                  <li>✓ 기준소득월액 상한선 637만 → 659만원 인상</li>
                  <li>✓ 건강보험·고용보험·산재보험은 7월 변동 없음</li>
                  <li>✓ 연봉협상 시 1~6월(4.5%) + 7~12월(4.75%) 구분 필수</li>
                </ul>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">국민연금 인상 — 2026년 단계적 개혁의 첫 단계</h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  국민연금 재정 안정을 위한 2026년 개혁의 일환으로, <strong>7월 1일부터 국민연금 요율이 9.0%에서 9.5%로 인상</strong>됩니다(국민연금법 §88).
                  근로자가 부담하는 비율은 4.5%에서 4.75%로 올라갑니다.
                  이는 1~6월까지만 기존 요율이 적용되고, 7월부터는 새로운 요율이 적용된다는 뜻입니다.
                </p>
                <p className="text-text-secondary leading-relaxed">
                  동시에 기준소득월액 상한선도 조정됩니다.
                  1~6월에는 637만 원, 7월부터는 659만 원입니다.
                  고소득자의 경우 이 상한선 인상이 추가 공제액을 결정하게 됩니다.
                </p>
                <div className="border-l-4 border-l-highlight-500 bg-card pl-4 py-3 text-sm">
                  <p className="font-semibold mb-1">💡 핵심: 누가 얼마나 부담이 증가하나?</p>
                  <ul className="space-y-1 text-text-secondary">
                    <li><strong>월급 300만원:</strong> 300만 × 0.25% = 월 7,500원 추가 공제</li>
                    <li><strong>월급 500만원:</strong> 500만 × 0.25% = 월 12,500원 추가 공제</li>
                    <li><strong>월급 700만원(상한 초과):</strong> 1~6월 637만×4.5% → 7~12월 659만×4.75%, 월 약 26,375원 추가(상한 인상 포함)</li>
                  </ul>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">월급 300만원 기준 — 1~6월 vs 7~12월 비교</h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  월급 300만원을 기준으로 1~6월과 7~12월의 4대보험료 공제액을 정확히 비교해 봅시다.
                  국민연금 변화가 가장 크지만, 건강보험·고용보험·산재보험은 변하지 않습니다.
                </p>
                <table className="w-full border-collapse text-sm">
                  <caption className="mb-2 text-left text-xs font-semibold text-text-secondary">월급 300만원 기준 4대보험료 공제액 비교</caption>
                  <thead>
                    <tr className="border-b border-border-base">
                      <th scope="col" className="px-3 py-2 text-left font-semibold">항목</th>
                      <th scope="col" className="px-3 py-2 text-center font-semibold">1~6월</th>
                      <th scope="col" className="px-3 py-2 text-center font-semibold">7~12월</th>
                      <th scope="col" className="px-3 py-2 text-center font-semibold">월차</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-border-base">
                      <td className="px-3 py-2 font-semibold">국민연금</td>
                      <td className="px-3 py-2 text-center text-xs">300만 × 4.5%</td>
                      <td className="px-3 py-2 text-center text-xs">300만 × 4.75%</td>
                      <td className="px-3 py-2 text-center"><strong>+7,500원</strong></td>
                    </tr>
                    <tr className="border-b border-border-base">
                      <td className="px-3 py-2 text-xs font-semibold"></td>
                      <td className="px-3 py-2 text-center"><strong>13만 5,000원</strong></td>
                      <td className="px-3 py-2 text-center"><strong>14만 2,500원</strong></td>
                      <td className="px-3 py-2 text-center"></td>
                    </tr>
                    <tr className="border-b border-border-base">
                      <td className="px-3 py-2 font-semibold">건강보험</td>
                      <td className="px-3 py-2 text-center"><strong>10만 6,350원</strong></td>
                      <td className="px-3 py-2 text-center"><strong>10만 6,350원</strong></td>
                      <td className="px-3 py-2 text-center">무</td>
                    </tr>
                    <tr className="border-b border-border-base">
                      <td className="px-3 py-2 font-semibold">장기요양</td>
                      <td className="px-3 py-2 text-center"><strong>1만 3,772원</strong></td>
                      <td className="px-3 py-2 text-center"><strong>1만 3,772원</strong></td>
                      <td className="px-3 py-2 text-center">무</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2 font-semibold">고용보험</td>
                      <td className="px-3 py-2 text-center"><strong>2만 7,000원</strong></td>
                      <td className="px-3 py-2 text-center"><strong>2만 7,000원</strong></td>
                      <td className="px-3 py-2 text-center">무</td>
                    </tr>
                  </tbody>
                </table>
                <p className="font-semibold text-center bg-card p-3 text-lg mt-3">
                  <strong>1~6월 합계: 약 28만 2,100원 | 7~12월 합계: 약 28만 9,600원 | 월 차이: 7,500원</strong>
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">월급 500만원 기준 — 기준소득월액 상한선 미적용</h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  월급 500만원은 기준소득월액 상한선(1~6월 637만, 7월~ 659만)보다 낮으므로, 전액 기준으로 국민연금료가 계산됩니다.
                </p>
                <table className="w-full border-collapse text-sm">
                  <caption className="mb-2 text-left text-xs font-semibold text-text-secondary">월급 500만원 기준 4대보험료 공제액 비교</caption>
                  <thead>
                    <tr className="border-b border-border-base">
                      <th scope="col" className="px-3 py-2 text-left font-semibold">항목</th>
                      <th scope="col" className="px-3 py-2 text-center font-semibold">1~6월</th>
                      <th scope="col" className="px-3 py-2 text-center font-semibold">7~12월</th>
                      <th scope="col" className="px-3 py-2 text-center font-semibold">월차</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-border-base">
                      <td className="px-3 py-2 font-semibold">국민연금</td>
                      <td className="px-3 py-2 text-center"><strong>22만 5,000원</strong></td>
                      <td className="px-3 py-2 text-center"><strong>23만 7,500원</strong></td>
                      <td className="px-3 py-2 text-center"><strong>+12,500원</strong></td>
                    </tr>
                    <tr className="border-b border-border-base">
                      <td className="px-3 py-2 font-semibold">건강보험</td>
                      <td className="px-3 py-2 text-center"><strong>17만 7,250원</strong></td>
                      <td className="px-3 py-2 text-center"><strong>17만 7,250원</strong></td>
                      <td className="px-3 py-2 text-center">무</td>
                    </tr>
                    <tr className="border-b border-border-base">
                      <td className="px-3 py-2 font-semibold">장기요양</td>
                      <td className="px-3 py-2 text-center"><strong>2만 2,953원</strong></td>
                      <td className="px-3 py-2 text-center"><strong>2만 2,953원</strong></td>
                      <td className="px-3 py-2 text-center">무</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2 font-semibold">고용보험</td>
                      <td className="px-3 py-2 text-center"><strong>4만 5,000원</strong></td>
                      <td className="px-3 py-2 text-center"><strong>4만 5,000원</strong></td>
                      <td className="px-3 py-2 text-center">무</td>
                    </tr>
                  </tbody>
                </table>
                <p className="font-semibold text-center bg-card p-3 text-lg mt-3">
                  <strong>1~6월 합계: 약 47만 203원 | 7~12월 합계: 약 48만 2,703원 | 월 차이: 12,500원</strong>
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">월급 700만원 기준 — 기준소득월액 상한선 적용</h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  월급 700만원은 기준소득월액 상한선을 초과합니다.
                  1~6월에는 637만원, 7월부터는 659만원을 상한으로 국민연금료가 계산되며, 초과분에 대해서는 공제되지 않습니다.
                </p>
                <div className="border-l-4 border-l-highlight-500 bg-card pl-4 py-3 text-sm">
                  <p className="font-semibold mb-1">💡 상한선 적용 계산</p>
                  <ul className="space-y-1 text-text-secondary">
                    <li><strong>1~6월:</strong> 637만(상한) × 4.5% = 28만 6,650원</li>
                    <li><strong>7월~:</strong> 659만(상한) × 4.75% = 31만 3,025원</li>
                    <li><strong>월 차이:</strong> 31만 3,025 - 28만 6,650 = 2만 6,375원</li>
                    <li><strong>설명:</strong> 700만 × 0.25%(=17,500원)로 단순 계산하면 안 됩니다. 상한이 637만→659만으로 함께 올라, 요율·상한 인상이 모두 반영되어 월 26,375원이 늘어납니다.</li>
                  </ul>
                </div>
                <p className="text-sm text-text-tertiary mt-3">
                  ⚠️ 고소득자의 경우 상한선 인상(637만→659만)의 영향도 받습니다. 단순히 0.25%p만 봐서는 안 됩니다.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">연간 누적 효과 — 상반기 vs 하반기</h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  월급 300만원 기준으로 연간 누적 효과를 계산하면, 7월 인상이 얼마나 중요한지 명확히 보입니다.
                </p>
                <table className="w-full border-collapse text-sm">
                  <caption className="mb-2 text-left text-xs font-semibold text-text-secondary">연간 국민연금 공제액 누적 (월급 300만원, 2026년)</caption>
                  <thead>
                    <tr className="border-b border-border-base">
                      <th scope="col" className="px-3 py-2 text-left font-semibold">구간</th>
                      <th scope="col" className="px-3 py-2 text-center font-semibold">개월수</th>
                      <th scope="col" className="px-3 py-2 text-center font-semibold">월 공제액</th>
                      <th scope="col" className="px-3 py-2 text-center font-semibold">소계</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-border-base">
                      <td className="px-3 py-2 font-semibold">1~6월(4.5%)</td>
                      <td className="px-3 py-2 text-center">6개월</td>
                      <td className="px-3 py-2 text-center">13만 5,000원</td>
                      <td className="px-3 py-2 text-center"><strong>81만원</strong></td>
                    </tr>
                    <tr className="border-b border-border-base">
                      <td className="px-3 py-2 font-semibold">7~12월(4.75%)</td>
                      <td className="px-3 py-2 text-center">6개월</td>
                      <td className="px-3 py-2 text-center">14만 2,500원</td>
                      <td className="px-3 py-2 text-center"><strong>85만 5,000원</strong></td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2 font-semibold">연간 합계</td>
                      <td className="px-3 py-2 text-center">12개월</td>
                      <td className="px-3 py-2 text-center">평균 13만 8,750원</td>
                      <td className="px-3 py-2 text-center"><strong>166만 5,000원</strong></td>
                    </tr>
                  </tbody>
                </table>
                <p className="text-sm text-text-secondary mt-3">
                  상반기 6개월은 4.5%, 하반기 6개월은 4.75%가 적용되므로, 평년도(12개월 모두 4.5%)보다 약 45,000원 추가 부담합니다.
                </p>
              </section>

              <AdSlot slot="guide-salary-take-home-july-mid" format="rectangle" />

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">연봉협상 시 주의사항 — "7월 경계"를 반드시 고려하세요</h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  2026년 연봉협상에서 가장 중요한 포인트는 <strong>1~6월과 7~12월의 세율 차이</strong>입니다.
                  단순히 월급 × 12를 계산하면 실제 연간 실수령액보다 많게 계산할 수 있습니다.
                </p>
                <div className="border-l-4 border-l-highlight-500 bg-card pl-4 py-3 text-sm">
                  <p className="font-semibold mb-1">❌ 흔한 실수</p>
                  <p className="text-text-secondary mb-2">월급 300만 × 12개월 = 3,600만원 연봉</p>
                  <p className="text-text-secondary mb-3">이를 4대보험 30% 공제로 계산 → 월평균 공제액 100만원 추정... 오류!</p>
                  <p className="font-semibold mb-1">✅ 올바른 계산</p>
                  <ul className="space-y-1 text-text-secondary">
                    <li>상반기(1~6월): 월 300만 × 6개월 = 1,800만원</li>
                    <li>하반기(7~12월): 월 300만 × 6개월 = 1,800만원</li>
                    <li>상반기 4대보험: 약 169만 2,600원</li>
                    <li>하반기 4대보험: 약 173만 7,600원</li>
                    <li><strong>합계 공제: 약 343만원, 월 평균 28만 5,800원</strong></li>
                  </ul>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">기준소득월액 상한선 인상의 의미</h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  기준소득월액 상한선이 637만→659만원으로 22만원 인상되었습니다.
                  이는 연봉이 높은 직원들에게 긍정적이지만, 동시에 새로운 계산 기준점이 됩니다.
                </p>
                <table className="w-full border-collapse text-sm">
                  <caption className="mb-2 text-left text-xs font-semibold text-text-secondary">월급 수준별 기준소득월액 상한선 영향</caption>
                  <thead>
                    <tr className="border-b border-border-base">
                      <th scope="col" className="px-3 py-2 text-left font-semibold">월급</th>
                      <th scope="col" className="px-3 py-2 text-center font-semibold">1~6월 기준</th>
                      <th scope="col" className="px-3 py-2 text-center font-semibold">7월~ 기준</th>
                      <th scope="col" className="px-3 py-2 text-center font-semibold">영향</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-border-base">
                      <td className="px-3 py-2 font-semibold">400만원</td>
                      <td className="px-3 py-2 text-center">400만 × 4.5%</td>
                      <td className="px-3 py-2 text-center">400만 × 4.75%</td>
                      <td className="px-3 py-2 text-center text-xs">상한 미적용, 0.25%p만</td>
                    </tr>
                    <tr className="border-b border-border-base">
                      <td className="px-3 py-2 font-semibold">600만원</td>
                      <td className="px-3 py-2 text-center">600만 × 4.5%</td>
                      <td className="px-3 py-2 text-center">600만 × 4.75%</td>
                      <td className="px-3 py-2 text-center text-xs">상한 미적용, 0.25%p만</td>
                    </tr>
                    <tr className="border-b border-border-base">
                      <td className="px-3 py-2 font-semibold">700만원</td>
                      <td className="px-3 py-2 text-center">637만 × 4.5%</td>
                      <td className="px-3 py-2 text-center">659만 × 4.75%</td>
                      <td className="px-3 py-2 text-center text-xs"><strong>상한선 +22만</strong></td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2 font-semibold">800만원</td>
                      <td className="px-3 py-2 text-center">637만 × 4.5%</td>
                      <td className="px-3 py-2 text-center">659만 × 4.75%</td>
                      <td className="px-3 py-2 text-center text-xs"><strong>상한선 +22만</strong></td>
                    </tr>
                  </tbody>
                </table>
                <p className="text-sm text-text-tertiary mt-3">
                  ⚠️ 월급 600만원 이하는 기준소득월액 상한선이 아직 미적용되므로, 0.25%p 인상만 반영하면 됩니다.
                  700만원 이상은 상한선 인상이 추가 영향을 미칩니다.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">자주 하는 실수 4가지</h2>
                <ol className="space-y-2 text-sm">
                  <li>
                    <strong>❌ 7월 인상을 무시하고 월급 × 12만 계산하기</strong>
                    <br />
                    <span className="text-text-tertiary">월 300만 × 12 = 3,600만이 아니라, (월 300만 × 6 + 1~6월 4대보험) + (월 300만 × 6 + 7~12월 4대보험)으로 나눠 계산해야 정확한 연간 실수령액을 알 수 있습니다.</span>
                  </li>
                  <li>
                    <strong>❌ 기준소득월액 상한선(659만)을 넘는 고소득 월급 그대로 계산하기</strong>
                    <br />
                    <span className="text-text-tertiary">월급이 700만원이면 국민연금료는 659만 × 4.75%로만 계산되지, 700만 × 4.75%가 아닙니다. 초과분 41만은 공제되지 않습니다.</span>
                  </li>
                  <li>
                    <strong>❌ 6월과 7월의 급여명세서를 다르게 보지 않기</strong>
                    <br />
                    <span className="text-text-tertiary">급여명세서에는 실제 국민연금 공제액이 명시됩니다. 6월은 4.5% 기준, 7월부터는 4.75% 기준으로 다르게 표시될 것입니다. 이를 확인해야 자신의 급여를 정확히 파악할 수 있습니다.</span>
                  </li>
                  <li>
                    <strong>❌ 건강보험·고용보험 변동 없음을 놓치기</strong>
                    <br />
                    <span className="text-text-tertiary">7월에는 국민연금만 인상됩니다. 건강보험(3.545%), 장기요양보험(12.95%), 고용보험(0.9%)은 2026년 변동이 없으므로 혼동하지 않아야 합니다.</span>
                  </li>
                </ol>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">관련 법령 & 공식 출처</h2>
                <ul className="space-y-2 text-sm">
                  <li>
                    국민연금법 제88조 (보험료율): <a href="https://law.go.kr" rel="nofollow" className="text-primary-500 underline">law.go.kr</a>
                  </li>
                  <li>
                    국민연금공단 공식 요율 안내: <a href="https://www.nps.or.kr" rel="nofollow" className="text-primary-500 underline">https://www.nps.or.kr</a>
                  </li>
                  <li>
                    보건복지부 기준소득월액 고시 (2026): <a href="https://www.mohw.go.kr" rel="nofollow" className="text-primary-500 underline">https://www.mohw.go.kr</a>
                  </li>
                  <li>
                    국민건강보험공단: <a href="https://www.nhis.or.kr" rel="nofollow" className="text-primary-500 underline">https://www.nhis.or.kr</a>
                  </li>
                </ul>
              </section>

              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">관련 가이드 & 계산기</h2>
                <ul className="space-y-2 text-sm">
                  <li>
                    ➜ <Link href="/calculator/salary/" className="font-semibold text-primary-500 hover:underline">
                      연봉 실수령액 계산기
                    </Link>
                    {' — 4대보험료·소득세 자동 반영, 7월 인상 미리 계산'}
                  </li>
                  <li>
                    ➜ <Link href="/guide/four-major-insurance-rates-2026/" className="font-semibold text-primary-500 hover:underline">
                      2026년 4대보험 요율 종합 가이드
                    </Link>
                    {' — 국민연금·건강보험·고용보험·산재보험 요율표'}
                  </li>
                  <li>
                    ➜ <Link href="/guide/salary-negotiation-take-home/" className="font-semibold text-primary-500 hover:underline">
                      연봉협상 전 실수령액 정확 시뮬레이션
                    </Link>
                    {' — 세전·세후, 상여금, 비과세 수당 반영'}
                  </li>
                  <li>
                    ➜ <Link href="/category/work/" className="font-semibold text-primary-500 hover:underline">
                      근로 계산기 모음
                    </Link>
                    {' — 연봉, 퇴직금, 4대보험 전체'}
                  </li>
                </ul>
              </section>

              <section className="space-y-3 border-t border-border-base pt-6">
                <p className="text-xs text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 참고용이며 법적 효력이 없습니다.
                  정확한 국민연금료 계산이나 복잡한 급여 문제는 국민연금공단, 회사 인사·급여팀, 세무사·노무사의 상담을 받으시기 바랍니다.
                </p>
              </section>

              <section className="space-y-3 border-t border-border-base pt-6">
                <p className="text-xs text-text-tertiary">
                  <strong>생성 정보:</strong> AI 보조 작성 후 운영자 검수
                </p>
                <p className="text-xs text-text-tertiary">
                  마지막 갱신: 2026-06-29 | 2026년 국민연금법 §88 인상 반영, 기준소득월액 상한선(637만→659만원) 포함
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
