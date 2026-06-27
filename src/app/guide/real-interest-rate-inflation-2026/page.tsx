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

const URL = 'https://calculatorhost.com/guide/real-interest-rate-inflation-2026/';
const DATE_PUBLISHED = '2026-06-28';
const DATE_MODIFIED = '2026-06-28';

export const metadata: Metadata = {
  title: '실질금리 계산 2026 — 예금 이자가 물가를 이기려면',
  description:
    '명목금리와 실질금리의 차이를 명확히 이해하고, 세후 명목금리에서 물가상승률을 차감하는 실질 수익률을 계산합니다. 피셔방정식·이자소득세 15.4% 반영.',
  keywords: [
    '실질금리',
    '실질수익률',
    '명목금리',
    '물가상승률',
    '인플레이션',
    '세후 실질금리',
    '피셔방정식',
    '예금 수익률',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [
      {
        url: '/og-default.png',
        width: 1200,
        height: 630,
        alt: '실질금리 계산 2026 — 예금 이자가 물가를 이기려면',
      },
    ],
    title: '실질금리 계산 2026',
    description: '명목금리 vs 실질금리. 당신의 예금 수익률을 제대로 계산해보세요.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '실질금리 계산 2026',
    description: '예금 이자가 물가를 이기는지 확인하는 실질 수익률 계산법',
  },
};

const FAQ_ITEMS = [
  {
    question: '실질금리와 명목금리의 가장 간단한 차이가 뭐예요?',
    answer:
      '명목금리는 은행이 제시하는 수면 위의 금리이고, 실질금리는 물가상승을 고려한 실제 구매력 증가분입니다. 예를 들어 연 4% 금리를 받았지만 물가가 3% 올랐다면, 실질 이득은 약 1% 수준입니다.',
  },
  {
    question: '명목 4%, 물가 3%이면 실질금리는 정확히 1%인가요?',
    answer:
      '근사로는 1%이지만, 정확한 계산(피셔방정식)은 (1.04 ÷ 1.03) − 1 ≈ 0.97%입니다. 차이는 작지만, 큰 금액에서는 의미가 있습니다.',
  },
  {
    question: '이자소득세 15.4%를 낸 후 실질금리는 어떻게 되나요?',
    answer:
      '명목 4% × (1 − 0.154) = 3.384% (세후 명목금리). 여기서 물가 3%를 빼면 세후 실질금리 약 0.384%입니다. 세금을 먼저 떼고 나서 물가를 고려해야 합니다.',
  },
  {
    question: '명목금리 3%, 물가 3.5%면 실질금리가 음수인가요?',
    answer:
      '네, 마이너스 실질금리입니다. 세후로는 3% × 0.846 = 2.538% − 3.5% = −0.96%, 즉 구매력을 0.96% 잃게 됩니다.',
  },
  {
    question: '현재(2026) 정기예금 금리 4~5%는 물가를 이기나요?',
    answer:
      '물가상승률이 3% 이하라면 세후로도 이깁니다. 명목 4% × 0.846 = 3.384% > 3%이므로 세후 실질금리 약 0.4% 수익. 다만 물가가 3.5% 이상으로 상승하면 손실이 됩니다.',
  },
  {
    question: '저금리 시대에 예금을 할 의미가 있나요?',
    answer:
      '예금 수익률로만 물가를 이기기는 어렵지만, 안정성과 유동성이 필요하면 예금은 여전히 기초 자산입니다. 주식·채권 등과 분산하거나, 목돈이 필요할 때까지 급할 상황에 대비하는 용도로는 가치가 있습니다.',
  },
  {
    question: '실질금리를 개선하려면 어떻게 해야 하나요?',
    answer:
      '예금만으로는 한계가 있습니다. 적금·파킹통장·채권·주식 등 다양한 상품을 비교하거나, 금리가 높은 시기에 장기 고정금리로 잠금하는 방법도 있습니다. 다만 투자 상품은 원금 손실 위험이 있으므로 신중하게 선택하세요.',
  },
];

export default function RealInterestRateInflation2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '실질금리 계산 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '실질금리 계산 2026 — 예금 이자가 물가를 이기려면',
    description:
      '명목금리 vs 실질금리. 세후 수익률에서 물가상승률을 차감하는 정확한 계산법과 실전 사례.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: [
      '실질금리',
      '명목금리',
      '물가상승률',
      '세후 실질 수익률',
      '피셔방정식',
      '인플레이션',
    ],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '실질금리 계산 2026 | calculatorhost',
    description:
      '예금 이자가 물가를 이기는지 판단하는 실질금리 계산법. 명목금리·세금·물가를 종합 반영.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
  });
  const faqLd = buildFaqPageJsonLd(FAQ_ITEMS);
  const speakableLd = buildSpeakableJsonLd(['[data-speakable]']);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableLd) }}
      />

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
                    { name: '실질금리 계산 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">
                  금융 · 10분 읽기 · 2026-06-28
                </p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  실질금리 계산 2026 — 예금 이자가 물가를 이기려면
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  정기예금이 연 4% 이자를 준다면, 당신의 실제 구매력은 4% 늘어날까요? 아닙니다.
                  물가가 3% 올랐다면, 실질 이득은 약 1% 수준입니다. 명목금리와 실질금리의 차이를
                  정확히 이해하고, 세금과 물가를 모두 고려한 실질 수익률을 계산해보세요.
                </p>
              </header>

              <AdSlot
                slot="guide-real-interest-rate-inflation-2026-top"
                format="horizontal"
              />

              <section aria-label="요약" className="card border-l-4 border-l-primary-500">
                <h2 className="mb-2 text-caption uppercase tracking-wider text-primary-500">
                  핵심 요약
                </h2>
                <table className="w-full border-collapse text-sm">
                  <caption className="mb-2 text-left font-semibold text-text-primary">
                    실질금리 계산 사례
                  </caption>
                  <thead>
                    <tr className="border-b border-border-base">
                      <th scope="col" className="pb-2 pr-3 text-left font-semibold">
                        상황
                      </th>
                      <th scope="col" className="pb-2 text-left font-semibold">
                        명목금리
                      </th>
                      <th scope="col" className="pb-2 text-left font-semibold">
                        물가상승률
                      </th>
                      <th scope="col" className="pb-2 text-left font-semibold">
                        세후 실질금리
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-text-secondary">
                    <tr className="border-b border-border-base">
                      <td className="py-2 pr-3 font-semibold">기본 사례</td>
                      <td>4%</td>
                      <td>3%</td>
                      <td>약 0.38%</td>
                    </tr>
                    <tr className="border-b border-border-base">
                      <td className="py-2 pr-3 font-semibold">낮은 금리</td>
                      <td>3%</td>
                      <td>3.5%</td>
                      <td>−0.96% (손실)</td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-3 font-semibold">높은 금리</td>
                      <td>5%</td>
                      <td>3%</td>
                      <td>약 1.23%</td>
                    </tr>
                  </tbody>
                </table>
              </section>

              <section className="space-y-4">
                <h2 className="border-b border-border-base pb-2 text-2xl font-bold">
                  명목금리와 실질금리란 무엇인가요?
                </h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  명목금리는 은행이 광고하는 이자율이고, 실질금리는 물가상승을 고려한 실제 구매력
                  증가분입니다. 같은 명목금리라도 물가가 높으면 실질 수익은 작아집니다.
                </p>

                <div className="space-y-3">
                  <div className="rounded-lg bg-bg-raised p-4">
                    <h3 className="mb-2 font-semibold text-text-primary">명목금리</h3>
                    <p className="text-sm text-text-secondary">
                      은행에서 제시하는 기본 금리입니다. 예를 들어 정기예금 연 4%는 명목금리입니다.
                      세금을 떼기 전의 순수 이자 수익률입니다.
                    </p>
                  </div>

                  <div className="rounded-lg bg-bg-raised p-4">
                    <h3 className="mb-2 font-semibold text-text-primary">실질금리 (근사식)</h3>
                    <p className="text-sm text-text-secondary">
                      <strong>실질금리 ≈ 명목금리 − 물가상승률</strong>
                    </p>
                    <p className="mt-2 text-xs text-text-tertiary">
                      예: 명목 4% − 물가 3% = 실질 1% (근사)
                    </p>
                  </div>

                  <div className="rounded-lg bg-bg-raised p-4">
                    <h3 className="mb-2 font-semibold text-text-primary">
                      실질금리 (정확한 피셔방정식)
                    </h3>
                    <p className="text-sm text-text-secondary">
                      <strong>실질금리 = (1 + 명목금리) ÷ (1 + 물가상승률) − 1</strong>
                    </p>
                    <p className="mt-2 text-xs text-text-tertiary">
                      예: (1.04 ÷ 1.03) − 1 ≈ 0.97% (정확)
                    </p>
                    <p className="mt-2 text-xs text-text-tertiary">
                      대부분의 경우 근사식과 차이가 작지만, 금리나 물가가 높은 환경에서는 정확한
                      계산이 중요합니다.
                    </p>
                  </div>
                </div>

                <p className="text-text-secondary leading-relaxed">
                  ⚠️ 다만 위 계산은 세금을 반영하지 않습니다. 이자소득세 15.4%가 떨어지면 명목금리
                  자체가 줄어들므로, 세금을 먼저 차감한 후 물가를 빼야 합니다.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="border-b border-border-base pb-2 text-2xl font-bold">
                  이자소득세 15.4%를 반영하면 어떻게 되나요?
                </h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  예금 이자는 한국은행이 자동으로 이자소득세 15.4%를 원천징수합니다. 따라서 실질
                  수익률을 계산할 때는 먼저 세금을 떼고 시작해야 합니다.
                </p>

                <div className="space-y-3">
                  <div className="rounded-lg bg-bg-raised p-4">
                    <h3 className="mb-2 font-semibold text-text-primary">이자소득세 구조</h3>
                    <ul className="space-y-2 text-sm text-text-secondary">
                      <li>
                        <strong>소득세</strong>: 14% (소득세법 §129 기본세율)
                      </li>
                      <li>
                        <strong>지방소득세</strong>: 1.4% (소득세의 10%)
                      </li>
                      <li>
                        <strong>합계</strong>: 15.4%
                      </li>
                    </ul>
                  </div>

                  <div className="rounded-lg bg-bg-raised p-4">
                    <h3 className="mb-2 font-semibold text-text-primary">
                      세후 명목금리 계산
                    </h3>
                    <p className="text-sm text-text-secondary">
                      <strong>세후 명목금리 = 명목금리 × (1 − 0.154)</strong>
                    </p>
                    <p className="mt-2 text-sm text-text-secondary">
                      예: 4% × (1 − 0.154) = 4% × 0.846 = 약 3.384%
                    </p>
                  </div>

                  <div className="rounded-lg bg-bg-raised p-4">
                    <h3 className="mb-2 font-semibold text-text-primary">
                      세후 실질금리 = 세후 명목금리 − 물가상승률
                    </h3>
                    <p className="text-sm text-text-secondary">
                      예: 세후 명목 3.384% − 물가 3% = 세후 실질 약 0.384%
                    </p>
                    <p className="mt-2 text-xs text-text-tertiary">
                      명목 4% 금리를 받았지만, 세금을 떼면 3.384%, 물가를 고려하면 0.384% 수준의
                      실질 이득입니다.
                    </p>
                  </div>
                </div>

                <p className="text-text-secondary leading-relaxed">
                  ⚠️ 다만 이자소득세 15.4%는 2026년 기준입니다. 세법이 변경되면 세율이 달라질 수
                  있으므로, 국세청 공시 기준을 따르세요. 또한 종합소득이 높으면 추가 누진세가
                  부과될 수 있습니다.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="border-b border-border-base pb-2 text-2xl font-bold">
                  실제 사례로 보면 어떤가요?
                </h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  현재 정기예금 금리가 4~5%라고 하면, 물가 상황에 따라 실질 수익이 크게
                  달라집니다. 몇 가지 시나리오를 확인해보세요.
                </p>

                <div className="space-y-3">
                  <div className="rounded-lg bg-bg-raised p-4">
                    <h3 className="mb-2 font-semibold text-text-primary">
                      사례 1: 명목 4%, 물가 3% (기본)
                    </h3>
                    <ul className="space-y-1 text-sm text-text-secondary">
                      <li>
                        세후 명목금리: 4% × 0.846 = <strong>3.384%</strong>
                      </li>
                      <li>
                        세후 실질금리: 3.384% − 3% = <strong>약 0.384%</strong>
                      </li>
                    </ul>
                    <p className="mt-2 text-xs text-text-tertiary">
                      결론: 예금 수익으로 물가를 간신히 이기지만, 실질 이득은 0.4% 수준입니다.
                    </p>
                  </div>

                  <div className="rounded-lg bg-bg-raised p-4">
                    <h3 className="mb-2 font-semibold text-text-primary">
                      사례 2: 명목 3%, 물가 3.5% (저금리·고물가)
                    </h3>
                    <ul className="space-y-1 text-sm text-text-secondary">
                      <li>
                        세후 명목금리: 3% × 0.846 = <strong>2.538%</strong>
                      </li>
                      <li>
                        세후 실질금리: 2.538% − 3.5% = <strong>−0.96% (손실)</strong>
                      </li>
                    </ul>
                    <p className="mt-2 text-xs text-text-tertiary">
                      결론: 세금과 물가를 고려하면 0.96% 구매력을 잃게 됩니다. 현금 가치가
                      하락합니다.
                    </p>
                  </div>

                  <div className="rounded-lg bg-bg-raised p-4">
                    <h3 className="mb-2 font-semibold text-text-primary">
                      사례 3: 명목 5%, 물가 2% (고금리·저물가)
                    </h3>
                    <ul className="space-y-1 text-sm text-text-secondary">
                      <li>
                        세후 명목금리: 5% × 0.846 = <strong>4.23%</strong>
                      </li>
                      <li>
                        세후 실질금리: 4.23% − 2% = <strong>약 2.23%</strong>
                      </li>
                    </ul>
                    <p className="mt-2 text-xs text-text-tertiary">
                      결론: 세금을 차감해도 2.23% 이상의 실질 이득을 얻습니다. 이 경우 예금이
                      상대적으로 가치가 있습니다.
                    </p>
                  </div>
                </div>

                <p className="text-text-secondary leading-relaxed">
                  ⚠️ 다만 현재(2026) 정기예금 금리는 4~5%대이고, 물가상승률은 정부 통계청
                  소비자물가지수(CPI) 기준입니다. 예금금리는 시시각각 변하고, 물가도 산업별로
                  다르므로 단순 비교 목적으로만 참고하세요.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="border-b border-border-base pb-2 text-2xl font-bold">
                  정확한 피셔방정식은 언제 사용하나요?
                </h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  대부분의 경우 근사식(명목금리 − 물가상승률)으로 충분하지만, 금리나 물가가 높은
                  환경에서는 정확한 피셔방정식을 사용해야 합니다.
                </p>

                <div className="rounded-lg bg-bg-raised p-4">
                  <h3 className="mb-2 font-semibold text-text-primary">
                    피셔방정식과 근사식의 차이
                  </h3>
                  <ul className="space-y-2 text-sm text-text-secondary">
                    <li>
                      <strong>근사식</strong>: 실질금리 ≈ 명목금리 − 물가 (빠르고 단순)
                    </li>
                    <li>
                      <strong>정확식</strong>: 실질금리 = (1 + 명목금리) ÷ (1 + 물가) − 1
                      (복합이자 반영)
                    </li>
                    <li>
                      <strong>차이가 큰 경우</strong>: 금리나 물가가 5%를 초과할 때 (고인플레이션
                      국가 기준)
                    </li>
                  </ul>
                  <p className="mt-3 text-sm text-text-secondary">
                    예를 들어 명목 20%, 물가 15%인 국가:
                  </p>
                  <ul className="space-y-1 text-sm text-text-secondary">
                    <li>근사: 20% − 15% = 5%</li>
                    <li>정확: (1.20 ÷ 1.15) − 1 ≈ 4.35%</li>
                    <li>차이: 0.65%p (의미 있는 차이)</li>
                  </ul>
                </div>

                <p className="text-text-secondary leading-relaxed">
                  ⚠️ 다만 한국(2026)은 명목금리 4~5%, 물가상승률 2~3% 수준이므로, 근사식과
                  정확식의 차이는 0.3% 미만입니다. 대부분의 가계금융 의사결정에서는 근사식으로
                  충분합니다.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="border-b border-border-base pb-2 text-2xl font-bold">
                  실질금리가 음수면 어떻게 해야 하나요?
                </h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  실질금리가 음수라는 것은 세금과 물가를 고려했을 때 구매력을 잃고 있다는 의미입니다.
                  이 경우 단순 예금만으로는 자산 보전이 어렵습니다.
                </p>

                <div className="space-y-3">
                  <div className="rounded-lg bg-bg-raised p-4">
                    <h3 className="mb-2 font-semibold text-text-primary">
                      음수 실질금리의 의미
                    </h3>
                    <p className="text-sm text-text-secondary">
                      예: 세후 명목 2.5%, 물가 3.5% → 실질 −1%
                    </p>
                    <p className="mt-2 text-sm text-text-secondary">
                      당신의 100만원이 1년 후 1년 전의 99만원 가치를 잃는다는 의미입니다. 세금을
                      낸 뒤에도 물가 속도를 따라가지 못합니다.
                    </p>
                  </div>

                  <div className="rounded-lg bg-bg-raised p-4">
                    <h3 className="mb-2 font-semibold text-text-primary">
                      대응 전략 (여러 선택지)
                    </h3>
                    <ul className="space-y-2 text-sm text-text-secondary">
                      <li>
                        <strong>1. 금리 높은 상품 비교</strong>: 적금, 파킹통장, 채권 등 다른
                        금융상품 검토
                      </li>
                      <li>
                        <strong>2. 장기 고정금리 선택</strong>: 금리 인상 시점에 미리 장기 계약
                      </li>
                      <li>
                        <strong>3. 인플레이션 헤지</strong>: 부동산, 금, 물가연동 상품 고려
                      </li>
                      <li>
                        <strong>4. 포트폴리오 분산</strong>: 예금·채권·주식 등을 혼합하여 기대
                        수익률 향상
                      </li>
                      <li>
                        <strong>5. 단기 현금 보유</strong>: 3~6개월 생활비만 고금리 통장에
                        보관, 나머지는 투자
                      </li>
                    </ul>
                  </div>
                </div>

                <p className="text-text-secondary leading-relaxed">
                  ⚠️ 다만 투자 상품은 원금 손실 위험이 있습니다. 실질금리가 음수라고 해서 무조건
                  주식이나 채권으로 옮기는 것은 위험합니다. 자신의 위험 성향과 투자 기간을 고려한
                  분산 전략을 수립하고, 필요하면 재무 전문가와 상담하세요.
                </p>
              </section>

              <AdSlot
                slot="guide-real-interest-rate-inflation-2026-mid"
                format="rectangle"
              />

              <FaqSection items={FAQ_ITEMS} />

              <section className="card border-l-2 border-l-danger-500 bg-danger-500/5">
                <h2 className="mb-2 text-lg font-semibold text-danger-700 dark:text-danger-300">
                  ⚠️ 주의사항 및 면책조항
                </h2>
                <ul className="space-y-2 text-sm text-danger-700 dark:text-danger-300">
                  <li>
                    • 본 가이드의 모든 계산은 교육 및 추정 목적이며, 실제 금융상품의 수익을
                    보장하지 않습니다.
                  </li>
                  <li>
                    • 명목금리, 물가상승률, 이자소득세는 시시각각 변하므로, 현재 기준을 확인 후
                    의사결정하세요.
                  </li>
                  <li>
                    • 이자소득세 15.4%(소득세법 §129 기본 14% + 지방소득세 1.4%)는 2026년
                    기준입니다. 세법 변경 시 달라질 수 있습니다.
                  </li>
                  <li>
                    • 물가상승률은 통계청 소비자물가지수(CPI)를 기준으로 하며, 산업별·지역별로
                    차이가 있을 수 있습니다.
                  </li>
                  <li>
                    • 본 가이드는 정보 제공만을 목적으로 하며, 특정 상품 구매를 권유하지
                    않습니다.
                  </li>
                  <li>
                    • 개인의 금융 의사결정은 본인의 재무 상황, 위험 성향, 투자 기간을 고려하여
                    신중하게 하세요.
                  </li>
                </ul>
              </section>

              <section aria-label="관련 도구" className="card">
                <h2 className="mb-3 text-lg font-semibold">관련 계산기 및 가이드</h2>
                <ul className="space-y-2 text-sm">
                  <li>
                    →{' '}
                    <Link
                      href="/calculator/deposit/"
                      className="text-primary-600 underline dark:text-primary-500"
                    >
                      정기예금 이자 계산기
                    </Link>{' '}
                    — 명목금리와 세후 이자 계산
                  </li>
                  <li>
                    →{' '}
                    <Link
                      href="/calculator/savings/"
                      className="text-primary-600 underline dark:text-primary-500"
                    >
                      정기적금 이자 계산기
                    </Link>{' '}
                    — 월불입 적금의 세후 이자 계산
                  </li>
                  <li>
                    →{' '}
                    <Link
                      href="/calculator/inflation/"
                      className="text-primary-600 underline dark:text-primary-500"
                    >
                      인플레이션 계산기
                    </Link>{' '}
                    — 물가상승으로 인한 화폐가치 변화
                  </li>
                  <li>
                    →{' '}
                    <Link
                      href="/guide/inflation-money-value-2026/"
                      className="text-primary-600 underline dark:text-primary-500"
                    >
                      인플레이션과 화폐가치 2026
                    </Link>{' '}
                    — 명목 vs 실질의 완전 해설
                  </li>
                  <li>
                    →{' '}
                    <Link
                      href="/guide/deposit-vs-savings-vs-parking-account-2026/"
                      className="text-primary-600 underline dark:text-primary-500"
                    >
                      정기예금 vs 정기적금 vs 파킹통장 2026
                    </Link>{' '}
                    — 세 가지 저축 상품 비교
                  </li>
                  <li>
                    →{' '}
                    <Link
                      href="/category/finance/"
                      className="text-primary-600 underline dark:text-primary-500"
                    >
                      금융 카테고리
                    </Link>{' '}
                    — 모든 금융 계산기 및 가이드
                  </li>
                </ul>
              </section>

              <section
                aria-label="출처 및 면책"
                className="rounded-lg border border-border-base p-4 text-caption text-text-tertiary"
              >
                <p className="mb-2">
                  <strong>참고 자료</strong>:{' '}
                  <a
                    href="https://finlife.fss.or.kr/"
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="text-primary-600 underline dark:text-primary-500"
                  >
                    금융감독원 금융소비자 정보
                  </a>
                  ,{' '}
                  <a
                    href="https://www.bok.or.kr/"
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="text-primary-600 underline dark:text-primary-500"
                  >
                    한국은행 금리 정보
                  </a>
                  ,{' '}
                  <a
                    href="https://kostat.go.kr/"
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="text-primary-600 underline dark:text-primary-500"
                  >
                    통계청 소비자물가지수
                  </a>
                  .
                </p>
                <p>
                  <strong>업데이트</strong>: {DATE_MODIFIED}. AI 보조 작성 후 운영자 검수 완료.
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
