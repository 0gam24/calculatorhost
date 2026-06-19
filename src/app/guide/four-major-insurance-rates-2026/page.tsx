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

const URL = 'https://calculatorhost.com/guide/four-major-insurance-rates-2026/';
const DATE_PUBLISHED = '2026-06-19';
const DATE_MODIFIED = '2026-06-19';

export const metadata: Metadata = {
  title: '4대보험 요율 2026 — 국민연금·건강·고용·산재 근로자 부담 총정리 | calculatorhost',
  description:
    '2026년 4대보험(국민연금·건강보험·고용보험·산재보험) 요율 및 근로자 부담금 완벽 정리. 7월 국민연금 인상, 기준소득월액 상한, 장기요양보험료 계산법까지.',
  keywords: [
    '4대보험',
    '국민연금 2026',
    '건강보험료',
    '고용보험료',
    '산재보험',
    '4대보험료 계산',
    '근로자 부담',
    '국민연금 인상',
    '기준소득월액',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '4대보험 요율 2026 — 국민연금·건강·고용·산재 근로자 부담 총정리 | calculatorhost' }],
    title: '4대보험 요율 2026 — 근로자 부담금 완벽 정리',
    description: '2026년 최신 4대보험 요율, 7월 국민연금 인상, 장기요양보험료 계산, 기준소득월액 상한선까지 종합 가이드.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
};

const FAQ_ITEMS = [
  {
    question: '2026년 국민연금이 7월부터 인상되는 이유는 무엇인가요?',
    answer:
      '국민연금제도 개혁의 단계적 인상에 따른 것입니다. 국민연금법 §88에 따라 1~6월은 9.0%, 7월부터 9.5%로 인상되며, 이는 국민연금의 장기 재정 안정성 확보를 위한 조치입니다. 근로자 부담률도 4.5%에서 4.75%로 오릅니다.',
  },
  {
    question: '월급 300만 원일 때 실제 4대보험료는 얼마인가요?',
    answer:
      '7월 기준으로 국민연금 14만 2,500원(4.75%), 건강보험 10만 6,350원(3.545%), 장기요양 1만 3,772원, 고용보험 2만 7,000원으로 합계 약 28만 9,600원입니다. 다만 국민연금은 기준소득월액 상한(7월~ 659만 원)에 따라 조정될 수 있으므로 정확히는 급여명세서를 확인해야 합니다.',
  },
  {
    question: '산재보험료는 근로자가 부담하지 않나요?',
    answer:
      '네, 산재보험료는 전액 사업주가 부담합니다. 근로자는 보험료를 납부하지 않으며, 기존 고용안정·직업능력개발사업분(사업주 부담액) 역시 근로자 부담이 없습니다. 따라서 근로자가 부담하는 4대보험은 국민연금, 건강보험, 고용보험 3가지입니다.',
  },
  {
    question: '기준소득월액 상한이란 무엇인가요?',
    answer:
      '국민연금료는 보수의 일정 비율로 계산되지만, 최대 기준소득월액 상한선 이상은 공제되지 않습니다. 2026년 1~6월은 637만 원, 7월~12월은 659만 원이 상한입니다. 예: 월급이 700만 원이면 국민연금료는 659만 원(7월~)을 기준으로 계산되어, 추가 인상분은 공제되지 않습니다.',
  },
  {
    question: '장기요양보험료는 어떻게 계산하나요?',
    answer:
      '장기요양보험료는 건강보험료의 12.95%입니다. 건강보험료가 10만 6,350원이면 장기요양보험료는 약 1만 3,772원(106,350 × 12.95% = 13,772)입니다. 이는 급여명세서에서 "장기요양"으로 별도 표시되며, 건강보험과 함께 공제됩니다.',
  },
  {
    question: '고용보험료 중 실업급여만 해당하고, 고용안정은 따로 있다고 했는데요?',
    answer:
      '고용보험은 실업급여(근로자·사업주 공동 부담)와 고용안정·직업능력개발사업분(사업주 전액 부담)으로 나뉩니다. 근로자가 기여하는 것은 실업급여 계정(총 1.8% 중 근로자 0.9%)뿐이고, 고용안정·직업능력개발사업분(규모별 0.25~0.85%)은 근로자와 무관하게 사업주가 부담합니다.',
  },
  {
    question: '여러 회사에 다니는 경우(N잡) 4대보험료를 중복으로 내나요?',
    answer:
      '국민연금·건강보험·고용보험 모두 중복 가입이 가능하며, 각 회사별로 따로 보험료를 납부합니다. 다만 기준소득월액 상한(국민연금)이 적용되어, 여러 회사의 보수 합계가 상한을 넘으면 전체 구간에서 한 번만 상한선이 적용됩니다. N잡러는 세무사·노무사 상담이 필수입니다.',
  },
  {
    question: '자영업자나 프리랜서의 4대보험료는 어떻게 다른가요?',
    answer:
      '자영업자는 건강보험(약 9~10%)과 국민연금(18%, 전액 본인 부담)을 납부하지만, 고용보험·산재보험은 별도로 가입하지 않습니다. 프리랜서도 마찬가지로 국민연금(자발적 가입 시) + 건강보험만 납부합니다. 직장인의 4대보험료 구조와 완전히 다르므로, 사업 시작 전에 국세청·보험공단에 확인하세요.',
  },
];

export default function FourMajorInsuranceRates2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '4대보험 요율 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '4대보험 요율 2026 — 국민연금·건강·고용·산재 근로자 부담 총정리',
    description:
      '2026년 4대보험(국민연금·건강보험·고용보험·산재보험) 요율 및 근로자 부담금 완벽 정리. 7월 국민연금 인상, 기준소득월액 상한, 장기요양보험료 계산법까지.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['4대보험', '국민연금', '건강보험', '고용보험', '산재보험', '2026'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '4대보험 요율 2026',
    description:
      '2026년 최신 4대보험 요율, 7월 국민연금 인상, 장기요양보험료 계산, 기준소득월액 상한선, 근로자 부담금 완전 정리.',
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
                    { name: '4대보험 요율 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">근로 · 8분 읽기 · 2026-06-19</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  4대보험 요율 2026 — 국민연금·건강·고용·산재 근로자 부담 총정리
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  직장인이라면 반드시 알아야 할 4대보험(국민연금·건강보험·고용보험·산재보험). 2026년 7월 국민연금 인상, 기준소득월액 상한, 장기요양보험료 계산법을 정확히 정리했습니다.
                </p>
              </header>

              <AdSlot slot="guide-insurance-rates-top" format="horizontal" />

              {/* Structured Summary */}
              <section aria-label="요약" className="card border-l-4 border-l-primary-500">
                <h2 className="mb-2 text-caption uppercase tracking-wider text-primary-500">2026년 4대보험 핵심 요율</h2>
                <table className="w-full border-collapse text-sm">
                  <caption className="mb-2 text-left text-xs font-semibold text-text-secondary">근로자 부담 요율 기준(국민연금법 §88, 건강보험법, 고용보험법)</caption>
                  <thead>
                    <tr className="border-b border-border-base">
                      <th scope="col" className="px-3 py-2 text-left font-semibold">보험</th>
                      <th scope="col" className="px-3 py-2 text-center font-semibold">1~6월</th>
                      <th scope="col" className="px-3 py-2 text-center font-semibold">7월~</th>
                      <th scope="col" className="px-3 py-2 text-left font-semibold">비고</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-border-base">
                      <td className="px-3 py-2 font-semibold">국민연금</td>
                      <td className="px-3 py-2 text-center"><strong>4.5%</strong></td>
                      <td className="px-3 py-2 text-center"><strong>4.75%</strong></td>
                      <td className="px-3 py-2 text-xs text-text-secondary">7월부터 +0.25%p 인상</td>
                    </tr>
                    <tr className="border-b border-border-base">
                      <td className="px-3 py-2 font-semibold">건강보험</td>
                      <td className="px-3 py-2 text-center"><strong>3.545%</strong></td>
                      <td className="px-3 py-2 text-center"><strong>3.545%</strong></td>
                      <td className="px-3 py-2 text-xs text-text-secondary">변화 없음</td>
                    </tr>
                    <tr className="border-b border-border-base">
                      <td className="px-3 py-2 font-semibold">고용보험</td>
                      <td className="px-3 py-2 text-center"><strong>0.9%</strong></td>
                      <td className="px-3 py-2 text-center"><strong>0.9%</strong></td>
                      <td className="px-3 py-2 text-xs text-text-secondary">실업급여 계정만</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2 font-semibold">산재보험</td>
                      <td className="px-3 py-2 text-center"><strong>0%</strong></td>
                      <td className="px-3 py-2 text-center"><strong>0%</strong></td>
                      <td className="px-3 py-2 text-xs text-text-secondary">전액 사업주 부담</td>
                    </tr>
                  </tbody>
                </table>
              </section>

              {/* TL;DR */}
              <section className="card bg-card p-3">
                <h2 className="mb-2 text-xs font-semibold uppercase tracking-wider text-primary-500">한눈에 보기</h2>
                <ul className="space-y-1 text-sm" data-speakable>
                  <li>✓ 국민연금 7월부터 9.0%→9.5% 인상 (근로자 4.5%→4.75%)</li>
                  <li>✓ 기준소득월액 상한: 1~6월 637만원, 7월~ 659만원</li>
                  <li>✓ 장기요양보험료 = 건강보험료 × 12.95%</li>
                  <li>✓ 산재보험은 근로자 부담 없음</li>
                  <li>✓ 월급 300만원 기준 총 4대보험료 약 28~29만원(7월~)</li>
                </ul>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">2026년 국민연금료 인상 — 7월부터 변화</h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  2026년 가장 주목할 변화는 <strong>7월부터 국민연금 요율 인상</strong>입니다.
                  1~6월에는 기존대로 9.0% 요율이 적용되지만, 7월부터는 9.5%로 상향됩니다(국민연금법 §88).
                  근로자가 부담하는 비율도 4.5%에서 4.75%로 오릅니다.
                </p>
                <p className="text-text-secondary leading-relaxed">
                  또한 기준소득월액 상한선도 함께 인상됩니다. 1~6월은 637만 원, 7월부터는 659만 원입니다.
                  월급이 659만 원을 초과하면, 상한선 이상의 급여에 대해서는 국민연금료가 공제되지 않습니다.
                </p>
                <div className="border-l-4 border-l-highlight-500 bg-card pl-4 py-3 text-sm">
                  <p className="font-semibold mb-1">💡 예시: 월급 300만 원 기준</p>
                  <ul className="space-y-1 text-text-secondary">
                    <li><strong>1~6월:</strong> 300만 × 4.5% = 13만 5,000원</li>
                    <li><strong>7월~12월:</strong> 300만 × 4.75% = 14만 2,500원</li>
                    <li><strong>연간 추가 부담:</strong> (14.25 - 13.5) × 6개월 = 약 4만 5,000원</li>
                  </ul>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">건강보험료 계산 — 보수월액 기준</h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  건강보험료는 <strong>보수월액에 3.545%를 곱해</strong> 계산됩니다. 2026년에는 변화가 없습니다.
                  건강보험료 계산 후, 추가로 <strong>장기요양보험료(건강보험료의 12.95%)</strong>가 별도 공제됩니다.
                </p>
                <div className="border-l-4 border-l-highlight-500 bg-card pl-4 py-3 text-sm">
                  <p className="font-semibold mb-1">💡 예시: 월급 300만 원 기준</p>
                  <ul className="space-y-1 text-text-secondary">
                    <li><strong>건강보험료:</strong> 300만 × 3.545% = 10만 6,350원</li>
                    <li><strong>장기요양보험료:</strong> 10만 6,350 × 12.95% ≈ 1만 3,772원</li>
                    <li><strong>합계:</strong> 약 12만 200원 (건강 + 장기요양)</li>
                  </ul>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">고용보험료 — 실업급여 계정만 근로자 부담</h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  고용보험료는 총 1.8%이지만, 근로자가 부담하는 것은 <strong>실업급여 계정 0.9%뿐</strong>입니다.
                  나머지 고용안정·직업능력개발사업분(규모별 0.25~0.85%)은 사업주가 전액 부담합니다.
                </p>
                <div className="border-l-4 border-l-highlight-500 bg-card pl-4 py-3 text-sm">
                  <p className="font-semibold mb-1">💡 예시: 월급 300만 원 기준</p>
                  <ul className="space-y-1 text-text-secondary">
                    <li><strong>고용보험료(근로자 부담):</strong> 300만 × 0.9% = 2만 7,000원</li>
                    <li><strong>고용안정·직업개발사업분:</strong> 사업주 부담 (근로자 무관)</li>
                  </ul>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">산재보험료 — 근로자는 부담하지 않음</h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  산재보험료는 <strong>전액 사업주가 부담</strong>합니다. 근로자는 보험료를 납부하지 않으며, 급여명세서에도 표시되지 않습니다.
                  따라서 직장인이 실제로 부담하는 보험료는 국민연금, 건강보험(장기요양 포함), 고용보험 3가지입니다.
                </p>
                <p className="text-sm text-text-tertiary">
                  ⚠️ 단, 자영업자는 산재보험에 임의 가입할 수 있으며, 이 경우 본인이 부담합니다.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">기준소득월액 상한선 — 높은 연봉자는 유의</h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  국민연금료는 월급의 일정 비율로 계산되지만, <strong>기준소득월액 상한선 이상은 공제되지 않습니다</strong>.
                  2026년 1~6월은 637만 원, 7월부터는 659만 원이 상한선입니다.
                </p>
                <div className="border-l-4 border-l-highlight-500 bg-card pl-4 py-3 text-sm">
                  <p className="font-semibold mb-1">💡 예시: 월급 700만 원 기준 (7월~)</p>
                  <ul className="space-y-1 text-text-secondary">
                    <li><strong>계산:</strong> 659만(상한) × 4.75% = 31만 3,025원</li>
                    <li><strong>설명:</strong> 700만 × 4.75% = 33만 2,500원이지만, 상한선 이상은 공제 안 함</li>
                    <li><strong>절감액:</strong> (700 - 659) × 4.75% = 약 1만 9,475원</li>
                  </ul>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">월급 300만 원 기준 4대보험료 실제 계산</h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  직장인이 실제로 받는 월급에서 공제되는 4대보험료를 정확히 계산해 봅시다(7월 이후 기준).
                </p>
                <table className="w-full border-collapse text-sm">
                  <caption className="mb-2 text-left text-xs font-semibold text-text-secondary">월급 300만 원 기준 4대보험료 공제액 (2026년 7월~12월)</caption>
                  <thead>
                    <tr className="border-b border-border-base">
                      <th scope="col" className="px-3 py-2 text-left font-semibold">항목</th>
                      <th scope="col" className="px-3 py-2 text-center font-semibold">계산식</th>
                      <th scope="col" className="px-3 py-2 text-center font-semibold">공제액</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-border-base">
                      <td className="px-3 py-2 font-semibold">국민연금</td>
                      <td className="px-3 py-2 text-center text-xs">300만 × 4.75%</td>
                      <td className="px-3 py-2 text-center"><strong>14만 2,500원</strong></td>
                    </tr>
                    <tr className="border-b border-border-base">
                      <td className="px-3 py-2 font-semibold">건강보험</td>
                      <td className="px-3 py-2 text-center text-xs">300만 × 3.545%</td>
                      <td className="px-3 py-2 text-center"><strong>10만 6,350원</strong></td>
                    </tr>
                    <tr className="border-b border-border-base">
                      <td className="px-3 py-2 font-semibold">장기요양</td>
                      <td className="px-3 py-2 text-center text-xs">106,350 × 12.95%</td>
                      <td className="px-3 py-2 text-center"><strong>1만 3,772원</strong></td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2 font-semibold">고용보험</td>
                      <td className="px-3 py-2 text-center text-xs">300만 × 0.9%</td>
                      <td className="px-3 py-2 text-center"><strong>2만 7,000원</strong></td>
                    </tr>
                  </tbody>
                </table>
                <p className="font-semibold text-center bg-card p-3 text-lg">
                  <strong>합계: 약 28만 9,600원</strong> (월급 300만 원의 약 9.7%)
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">자주 하는 실수 5가지</h2>
                <ol className="space-y-2 text-sm">
                  <li>
                    <strong>❌ 4대보험료를 세금으로 착각하기</strong>
                    <br />
                    <span className="text-text-tertiary">4대보험료는 소득세와 별개입니다. 국민연금·건강보험은 사회보장 제도이며, 추가로 소득세와 지방소득세가 공제됩니다.</span>
                  </li>
                  <li>
                    <strong>❌ 기준소득월액 상한선을 모르고 계산하기</strong>
                    <br />
                    <span className="text-text-tertiary">월급이 700만 원이라도 국민연금료는 상한선(659만 원)을 기준으로만 공제됩니다. 초과분은 공제 안 됨.</span>
                  </li>
                  <li>
                    <strong>❌ 7월 인상을 미리 반영하지 않기</strong>
                    <br />
                    <span className="text-text-tertiary">연봉협상 시 1월부터 12월까지 월급을 계산하면, 7월부터 국민연금이 0.25%p 인상되어 실제 연간 실수령액이 줄어듭니다.</span>
                  </li>
                  <li>
                    <strong>❌ 장기요양보험료를 놓치기</strong>
                    <br />
                    <span className="text-text-tertiary">급여명세서에 따로 표시되지만, 건강보험료 계산 후 반드시 확인해야 실제 4대보험료를 제대로 파악할 수 있습니다.</span>
                  </li>
                  <li>
                    <strong>❌ 산재보험료를 근로자가 부담한다고 생각하기</strong>
                    <br />
                    <span className="text-text-tertiary">산재보험은 사업주만 납부합니다. 근로자는 부담하지 않으므로, 급여명세서에도 없어야 정상입니다.</span>
                  </li>
                </ol>
              </section>

              <AdSlot slot="guide-insurance-rates-mid" format="rectangle" />

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">관련 법령 & 공식 출처</h2>
                <ul className="space-y-2 text-sm">
                  <li>
                    국민연금공단 요율 안내: <a href="https://www.nps.or.kr" rel="nofollow" className="text-primary-500 underline">https://www.nps.or.kr</a>
                  </li>
                  <li>
                    국민건강보험공단: <a href="https://www.nhis.or.kr" rel="nofollow" className="text-primary-500 underline">https://www.nhis.or.kr</a>
                  </li>
                  <li>
                    근로복지공단 산재보험: <a href="https://www.comwel.or.kr" rel="nofollow" className="text-primary-500 underline">https://www.comwel.or.kr</a>
                  </li>
                  <li>
                    고용노동부 고용보험: <a href="https://www.moel.go.kr" rel="nofollow" className="text-primary-500 underline">https://www.moel.go.kr</a>
                  </li>
                  <li>
                    국민연금법 제88조 (보험료율)
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
                    {' — 4대보험료·세금 자동 반영해서 월급 확인'}
                  </li>
                  <li>
                    ➜ <Link href="/guide/national-pension-premium-2026/" className="font-semibold text-primary-500 hover:underline">
                      국민연금 보험료 2026 상세 가이드
                    </Link>
                    {' — 7월 인상, 기준소득월액 상한 자세히'}
                  </li>
                  <li>
                    ➜ <Link href="/guide/health-insurance-premium-2026/" className="font-semibold text-primary-500 hover:underline">
                      건강보험료 계산 가이드
                    </Link>
                    {' — 피부양자 조건, 금액 산정법'}
                  </li>
                  <li>
                    ➜ <Link href="/guide/unemployment-benefit-2026/" className="font-semibold text-primary-500 hover:underline">
                      고용보험·실업급여 2026
                    </Link>
                    {' — 실업급여 수급 조건, 금액'}
                  </li>
                  <li>
                    ➜ <Link href="/calculator/severance/" className="font-semibold text-primary-500 hover:underline">
                      퇴직금 계산기
                    </Link>
                    {' — 퇴직 시 받을 금액 확인'}
                  </li>
                </ul>
              </section>

              <section className="space-y-3 border-t border-border-base pt-6">
                <p className="text-xs text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 참고용이며 법적 효력이 없습니다.
                  정확한 보험료 계산이나 복잡한 세무 문제는 국민연금공단, 국민건강보험공단, 고용노동부, 세무사·노무사의 상담을 받으시기 바랍니다.
                </p>
              </section>

              <section className="space-y-3 border-t border-border-base pt-6">
                <p className="text-xs text-text-tertiary">
                  <strong>생성 정보:</strong> AI 보조 작성 후 운영자 검수
                </p>
                <p className="text-xs text-text-tertiary">
                  마지막 갱신: 2026-06-19 | 2026년 최신 국민연금법 §88·4대보험 요율 반영
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
