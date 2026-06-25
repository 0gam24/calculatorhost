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

const URL = 'https://calculatorhost.com/guide/currency-exchange-fee-preferential-rate-2026/';
const DATE_PUBLISHED = '2026-06-25';
const DATE_MODIFIED = '2026-06-25';

export const metadata: Metadata = {
  title: '환전 수수료·환율 우대율 계산 2026 — 매매기준율·스프레드 완전정리',
  description:
    '환전할 때 "우대 90%"가 실제로 얼마를 절약하는지, 매매기준율·현찰 스프레드·우대율의 의미와 계산법을 공식으로 설명합니다. 해외 송금과 현찰의 차이도 정리.',
  keywords: [
    '환전 수수료',
    '환율 우대율',
    '매매기준율',
    '현찰 스프레드',
    '환율 계산',
    '해외 송금 수수료',
    '환전 절약',
    '달러 환율',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [
      {
        url: '/og-default.png',
        width: 1200,
        height: 630,
        alt: '환전 수수료·환율 우대율 계산 2026',
      },
    ],
    title: '환전 수수료·환율 우대율 계산 2026',
    description: '매매기준율, 스프레드, 우대율이 실제 환전 비용에 미치는 영향을 계산해봅시다.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '환전 수수료·환율 우대율 계산 2026',
    description: '해외여행 환전 시 우대율이 실제로 얼마를 절약하는지 명확하게 정리',
  },
};

const FAQ_ITEMS = [
  {
    question: '매매기준율이 뭔가요?',
    answer:
      '매매기준율은 한국은행이나 수출입은행에서 고시하는 기준 환율로, 실제 환전할 때의 출발점입니다. 이는 외환시장의 거래로 결정되는 시장 중간값이며, 모든 은행이 이를 바탕으로 각자의 환전 환율을 정합니다. 예를 들어 USD 매매기준율이 1,350원이라면, 은행은 이를 기준으로 현찰 구매 환율(더 높음)과 현찰 판매 환율(더 낮음)을 정하게 됩니다.',
  },
  {
    question: '현찰 스프레드는 뭐고, 얼마나 높나요?',
    answer:
      '현찰 스프레드는 "은행이 현찰 보관·수송·보험 비용"으로 받는 수수료율입니다. 매매기준율에 비해 현찰을 살 때는 얼마나 더 비싼지(%), 현찰을 팔 때는 얼마나 더 싼지(%)를 나타냅니다. 예를 들어 USD 현찰은 통상 약 1.75% 수준이지만, 통화와 은행, 시기에 따라 다릅니다. "우대율 90%"는 이 스프레드 비용의 90%를 깎는다는 의미입니다.',
  },
  {
    question: '우대 90%면 환율 전체가 90% 싼 거 아닌가요?',
    answer:
      '아닙니다. 흔한 오해입니다. 우대율 90%는 스프레드(수수료)의 90%만 깎는다는 뜻이지, 환율 전체를 90% 깎는다는 뜻이 아닙니다. 예를 들어 스프레드가 1.75%인데 우대 90%면 스프레드의 10%(=0.175%)만 부담하는 것입니다. 약 1.575%의 수수료를 절약할 수 있다는 의미입니다.',
  },
  {
    question: '전신환(T/T)과 현찰 환율이 다른 이유가 뭔가요?',
    answer:
      '전신환(해외 송금)은 현찰이 필요 없으므로 현금 보관·수송·보험 비용이 들지 않습니다. 따라서 현찰보다 스프레드가 훨씬 작아서 더 좋은 환율을 받을 수 있습니다. 예를 들어 USD 현찰 스프레드가 1.75%라면, 전신환은 0.5~1% 수준으로 낮을 수 있습니다. 해외 송금이나 신용카드 결제는 현찰 환전보다 훨씬 경제적입니다.',
  },
  {
    question: '은행별로 현찰 스프레드가 다르다고 했는데, 어디가 제일 싼가요?',
    answer:
      '같은 시간에도 은행별로 스프레드가 상이하며, 대형 은행(국민, 우리, 신한, 하나)이 중소 은행보다 일반적으로 낮은 편입니다. 다만 시기와 통화에 따라 수시로 변동되므로, 환전 전에 여러 은행의 현찰 환율을 직접 비교하는 것이 가장 정확합니다. 은행 웹사이트나 모바일 앱에서 실시간 환율을 확인할 수 있습니다.',
  },
  {
    question: '해외에서 현지 환전소를 쓰면 한국 은행보다 싼가요?',
    answer:
      '대부분의 경우 한국에서 미리 환전하는 것이 더 유리합니다. 해외의 공항 환전소나 환전 전문점은 수수료가 훨씬 높은 경향이 있습니다. 다만 목적지 국가와 통화, 환율 변동에 따라 다를 수 있으므로, 가능하면 한국에서 사전 환전하고, 부족분은 현지 신용카드나 ATM 인출을 병행하는 것을 추천합니다.',
  },
  {
    question: '환율이 매일 변하는데, 가장 싼 날이 있나요?',
    answer:
      '환율은 외환시장의 24시간 거래로 수시로 움직이며, 특정 요일이나 시간대가 항상 싼 것은 아닙니다. 다만 일반적으로 미 기준금리 결정 직후나 경제 지표 발표 후에 환율이 크게 움직일 수 있으므로, 이런 시기는 피하는 것도 전략입니다. 여행 일정이 정해지면 비행기 예매 후 1~2주일 내에 환전하는 것을 추천합니다(급격한 변동 회피).',
  },
];

export default function CurrencyExchangeFeePreferentialRate2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '환전 수수료·환율 우대율 계산 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '환전 수수료·환율 우대율 계산 2026',
    description:
      '해외여행 환전할 때 매매기준율, 현찰 스프레드, 우대율이 실제 환전 비용에 미치는 영향을 공식으로 설명합니다.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['환전', '환율', '우대율', '스프레드', '매매기준율', '해외여행'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '환전 수수료·환율 우대율 계산 2026 | calculatorhost',
    description:
      '환전 환율의 구성요소(매매기준율·스프레드·우대율)와 계산 공식을 명확하게 정리합니다.',
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
                    { name: '환전 수수료·환율 우대율 계산 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">
                  금융 · 8분 읽기 · 2026-06-25
                </p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  환전 수수료·환율 우대율 계산 2026
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  해외 여행을 떠나면서 "환율 우대 90%"라는 광고를 자주 봅니다. 과연 환율 자체가
                  90% 깎인다는 뜻일까요? 아닙니다. 환전 환율은 매매기준율, 현찰 스프레드,
                  우대율이라는 세 가지 요소로 이루어져 있으며, 각각의 의미를 알아야 실제로
                  얼마를 절약할 수 있는지 계산할 수 있습니다. 이 가이드에서는 환전 수수료의
                  구조를 명확하게 정리하고, 실제 계산 공식과 사례를 제시합니다.
                </p>
              </header>

              <AdSlot slot="guide-currency-exchange-top" format="horizontal" />

              <section aria-label="요약" className="card border-l-4 border-l-primary-500">
                <h2 className="mb-2 text-caption uppercase tracking-wider text-primary-500">
                  핵심 요약
                </h2>
                <table className="w-full border-collapse text-sm">
                  <caption className="mb-2 text-left font-semibold text-text-primary">
                    환전 환율의 구성 요소 (2026 기준)
                  </caption>
                  <thead>
                    <tr className="border-b border-border-base">
                      <th scope="col" className="pb-2 pr-3 text-left font-semibold">
                        개념
                      </th>
                      <th scope="col" className="pb-2 text-left font-semibold">
                        정의
                      </th>
                      <th scope="col" className="pb-2 text-left font-semibold">
                        예시값 (USD)
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-text-secondary">
                    <tr className="border-b border-border-base">
                      <td className="py-2 pr-3 font-semibold">매매기준율</td>
                      <td>은행권 기준 환율 (시장 중간값)</td>
                      <td>1,350원</td>
                    </tr>
                    <tr className="border-b border-border-base">
                      <td className="py-2 pr-3 font-semibold">현찰 스프레드</td>
                      <td>현금 보관·수송 비용 (기준율 대비 %)</td>
                      <td>약 1.75% 내외</td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-3 font-semibold">우대율</td>
                      <td>스프레드 할인 비율</td>
                      <td>90% (스프레드 10%만 부담)</td>
                    </tr>
                  </tbody>
                </table>
              </section>

              <section className="space-y-4">
                <h2 className="border-b border-border-base pb-2 text-2xl font-bold">
                  환전 환율, 세 가지 요소로 이루어져 있습니다
                </h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  환전할 때 실제로 적용되는 환율은 단순한 숫자가 아닙니다. 매매기준율, 현찰
                  스프레드, 우대율이라는 세 가지 요소가 복합적으로 작용합니다.
                </p>
                <p className="text-text-secondary leading-relaxed">
                  <strong>기본 공식은 이렇습니다:</strong>
                </p>
                <div className="rounded-lg bg-bg-raised p-4">
                  <p className="mb-3 font-mono text-sm font-semibold text-text-primary">
                    현찰 살 때의 환율 = 매매기준율 × (1 + 스프레드율 × (1 − 우대율))
                  </p>
                  <p className="font-mono text-sm font-semibold text-text-primary">
                    현찰 팔 때의 환율 = 매매기준율 × (1 − 스프레드율 × (1 − 우대율))
                  </p>
                  <p className="mt-2 text-xs text-text-tertiary">
                    총 환전비용(수수료) = (적용환율 − 매매기준율) × 환전액
                  </p>
                </div>
                <p className="text-text-secondary leading-relaxed">
                  ⚠️ 다만 현찰 스프레드는 은행, 통화, 시기에 따라 수시로 변합니다. 일반적으로
                  USD는 약 1.75% 수준이지만, EUR이나 JPY는 다를 수 있으므로 환전 전에 은행에
                  확인하세요.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="border-b border-border-base pb-2 text-2xl font-bold">
                  매매기준율이란 뭔가요?
                </h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  매매기준율은 한국은행이나 수출입은행에서 고시하는 기준 환율로, 모든 은행이
                  환전 환율을 계산할 때 출발점이 되는 값입니다. 이는 외환시장의 실제 거래로
                  결정되는 시장 중간값이며, 매일 변합니다.
                </p>
                <p className="text-text-secondary leading-relaxed">
                  예를 들어 오늘 USD 매매기준율이 1,350원이라면, 은행들은 이를 기준으로 자신의
                  현찰 환율을 정합니다. 현찰을 사려는 고객을 위해서는 더 높은 환율(수수료 포함),
                  현찰을 팔려는 고객을 위해서는 더 낮은 환율(수수료 차감)을 제시하는 식입니다.
                </p>
                <div className="rounded-lg bg-bg-raised p-4">
                  <h3 className="mb-3 font-semibold text-text-primary">구체적 예시</h3>
                  <ul className="space-y-2 text-sm text-text-secondary">
                    <li>
                      <strong>오늘 USD 매매기준율: 1,350원</strong>
                    </li>
                    <li>
                      • 은행 A: 현찰 구매 환율 1,373원 (매매기준율보다 1.7% 더 비쌈)
                    </li>
                    <li>
                      • 은행 B: 현찰 구매 환율 1,375원 (매매기준율보다 1.85% 더 비쌈)
                    </li>
                    <li>
                      → 은행 A에서 1만 USD를 사면 1,373만 원 필요 (1,373 × 10,000)
                    </li>
                    <li>
                      → 은행 B에서 사면 1,375만 원 필요 (차이: 2만 원)
                    </li>
                  </ul>
                </div>
                <p className="text-text-secondary leading-relaxed">
                  ⚠️ 다만 매매기준율은 은행마다 기준이 다를 수 있습니다. 한국은행 기준율,
                  수출입은행 기준율, 또는 자신의 시장거래 평균값을 사용하는 은행도 있습니다.
                  따라서 같은 시간에도 은행별로 기초가 되는 매매기준율이 약간 다를 수 있습니다.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="border-b border-border-base pb-2 text-2xl font-bold">
                  현찰 스프레드 — 은행의 수수료
                </h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  현찰 스프레드(spread)는 은행이 현찰 때문에 발생하는 비용을 고객에게 전가하는
                  수수료입니다. 현금은 보관해야 하고, 수송해야 하고, 보험도 들어야 합니다.
                  이런 모든 비용이 환율에 반영되는 것입니다.
                </p>
                <p className="text-text-secondary leading-relaxed">
                  <strong>스프레드 계산식:</strong>
                </p>
                <div className="rounded-lg bg-bg-raised p-4">
                  <p className="font-mono text-sm font-semibold text-text-primary">
                    스프레드율 (%) = (현찰 살 때 환율 − 매매기준율) ÷ 매매기준율 × 100
                  </p>
                  <p className="mt-3 text-sm text-text-secondary">
                    또는 역으로, 금액 기준:
                  </p>
                  <p className="font-mono text-sm font-semibold text-text-primary">
                    스프레드 수수료 = 환전액 × 스프레드율 (%)
                  </p>
                </div>
                <div className="rounded-lg bg-bg-raised p-4">
                  <h3 className="mb-3 font-semibold text-text-primary">
                    실제 계산 사례 (우대 없음)
                  </h3>
                  <ul className="space-y-3 text-sm text-text-secondary">
                    <li>
                      <strong>조건</strong>: USD 1,000 환전, 매매기준율 1,350원, 현찰 스프레드
                      1.75%
                    </li>
                    <li>
                      스프레드 적용 후 환율 = 1,350 × (1 + 0.0175) = 1,373.625원
                    </li>
                    <li>
                      환전 비용 = (1,373.625 − 1,350) × 1,000 = 23,625원
                    </li>
                    <li>
                      → 즉, 1,000 달러를 사기 위해 매매기준율로는 135만 원이면 되지만,
                      현찰 때문에 1,373,625원을 내야 합니다.
                    </li>
                  </ul>
                </div>
                <p className="text-text-secondary leading-relaxed">
                  ⚠️ 다만 은행별, 통화별로 스프레드가 다릅니다. USD는 약 1.75%, EUR은 2~2.5%,
                  JPY는 1~1.5% 수준이 일반적이지만, 은행과 시기에 따라 상이하므로 정확한 값은
                  환전 전에 은행에 문의하세요.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="border-b border-border-base pb-2 text-2xl font-bold">
                  우대율 90%는 무엇을 의미하나요?
                </h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  "환율 우대 90%"는 가장 많이 오해되는 표현입니다. 환율 전체를 90% 깎는다는
                  뜻이 아니라, 스프레드(수수료)의 90%를 깎는다는 의미입니다.
                </p>
                <div className="rounded-lg bg-bg-raised p-4">
                  <h3 className="mb-3 font-semibold text-text-primary">
                    우대 없는 경우 vs 우대 90% 비교
                  </h3>
                  <ul className="space-y-3 text-sm text-text-secondary">
                    <li>
                      <strong>조건</strong>: USD 1,000 환전, 매매기준율 1,350원, 스프레드 1.75%
                    </li>
                    <li>
                      <strong>우대 없음:</strong>
                      <br />
                      환율 = 1,350 × (1 + 0.0175) = 1,373.625원
                      <br />
                      비용 = (1,373.625 − 1,350) × 1,000 = 23,625원
                    </li>
                    <li>
                      <strong>우대 90%:</strong>
                      <br />
                      스프레드 적용 = 1.75% × (1 − 0.90) = 0.175% (스프레드 10%만 부담)
                      <br />
                      환율 = 1,350 × (1 + 0.00175) = 1,352.3625원
                      <br />
                      비용 = (1,352.3625 − 1,350) × 1,000 = 2,362.5원
                    </li>
                    <li>
                      <strong>절약 = 23,625 − 2,362.5 = 21,262.5원 (약 90% 절약)</strong>
                    </li>
                  </ul>
                </div>
                <p className="text-text-secondary leading-relaxed">
                  결국 우대 90%는 원래 내야 할 스프레드 비용(23,625원)의 90%를 깎아준다는
                  뜻입니다. 매매기준율 1,350원이 1,350의 90%인 1,215원이 되는 게 아니라, 수수료
                  부분만 극적으로 절감된다는 의미입니다.
                </p>
                <p className="text-text-secondary leading-relaxed">
                  ⚠️ 다만 우대율도 시기와 은행에 따라 다릅니다. 명절이나 성수기, 시장 변동성이
                  높을 때는 우대율이 줄어들 수 있으므로, 확실한 우대율은 환전 당일에 은행에
                  확인하세요.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="border-b border-border-base pb-2 text-2xl font-bold">
                  전신환(T/T, 해외 송금)은 왜 더 싼가요?
                </h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  해외로 돈을 보낼 때 두 가지 방법이 있습니다. 현찰을 들고 가거나, 은행을 통해
                  송금하는 것입니다. 송금(전신환)은 현찰보다 훨씬 좋은 환율을 받을 수 있습니다.
                </p>
                <div className="rounded-lg bg-bg-raised p-4">
                  <h3 className="mb-3 font-semibold text-text-primary">
                    현찰 vs 전신환(송금) 환율 비교
                  </h3>
                  <table className="w-full border-collapse text-sm">
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="pb-2 text-left font-semibold">
                          방식
                        </th>
                        <th scope="col" className="pb-2 text-left font-semibold">
                          스프레드
                        </th>
                        <th scope="col" className="pb-2 text-left font-semibold">
                          예상 환율 (USD 1,000)
                        </th>
                      </tr>
                    </thead>
                    <tbody className="text-text-secondary">
                      <tr className="border-b border-border-base">
                        <td className="py-2">현찰 환전</td>
                        <td>1.75% (보관·수송 비용)</td>
                        <td>약 1,373,625원</td>
                      </tr>
                      <tr>
                        <td className="py-2">전신환(송금)</td>
                        <td>0.5~1% (수수료만)</td>
                        <td>약 1,357,000~1,363,000원</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-text-secondary leading-relaxed">
                  현찰은 물리적 현금이므로 보관 비용이 크지만, 송금은 디지털 거래이므로 비용이
                  훨씬 낮습니다. 따라서 <strong>미리 계획된 해외 거래는 송금</strong>이,{' '}
                  <strong>현지 현금이 필요하면 현찰 환전</strong>이 최적입니다. 요즘은 해외 ATM
                  인출도 환율이 좋은 편이므로 혼합 전략을 추천합니다.
                </p>
                <p className="text-text-secondary leading-relaxed">
                  ⚠️ 다만 송금 수수료는 별도(보통 5,000~10,000원)이므로, 소액 송금은 현찰 환전이
                  더 유리할 수도 있습니다. 금액과 방식에 따라 각 은행의 환율과 수수료를 비교한
                  후 선택하세요.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="border-b border-border-base pb-2 text-2xl font-bold">
                  은행별·통화별 스프레드가 왜 다르나요?
                </h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  같은 시간에도 은행별로, 그리고 통화별로 스프레드가 다릅니다. 이는 각 은행이
                  다른 비용 구조와 사업 전략을 가지고 있기 때문입니다.
                </p>
                <div className="rounded-lg bg-bg-raised p-4">
                  <h3 className="mb-3 font-semibold text-text-primary">
                    일반적인 패턴 (시기별로 변동 가능)
                  </h3>
                  <ul className="space-y-2 text-sm text-text-secondary">
                    <li>
                      <strong>USD</strong>: 약 1.5~2.0% (가장 거래량 많음, 스프레드 작음)
                    </li>
                    <li>
                      <strong>EUR</strong>: 약 2.0~2.5% (거래량 중간)
                    </li>
                    <li>
                      <strong>JPY</strong>: 약 1.0~1.5% (소액 거래용, 상대적으로 작음)
                    </li>
                    <li>
                      <strong>중국 위안(CNY)</strong>: 약 2.5~3.0% (거래량 적음, 높음)
                    </li>
                    <li>
                      <strong>일반적으로 대형 은행(국민, 우리, 신한, 하나) {'>'} 중소 은행</strong>
                    </li>
                  </ul>
                </div>
                <p className="text-text-secondary leading-relaxed">
                  대형 은행은 거래량이 많아 현찰 보관 비용을 분산할 수 있어 스프레드가 낮은
                  편입니다. 반면 중소 은행은 개별 거래 비용이 크므로 스프레드가 높습니다. 또한
                  거래량이 적은 통화(말레이시아 링기, 태국 바트 등)는 스프레드가 높아지는
                  경향이 있습니다.
                </p>
                <p className="text-text-secondary leading-relaxed">
                  ⚠️ 다만 정기적으로 변동되므로, 환전 전에 여러 은행의 실시간 현찰 환율을
                  비교하는 것이 가장 확실합니다. 대부분의 은행 모바일 앱이나 웹사이트에서
                  실시간 환율을 제공합니다.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="border-b border-border-base pb-2 text-2xl font-bold">
                  결국 가장 싼 환전 방법은?
                </h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  환전 비용을 최소화하려면 방법, 통화, 은행, 시기를 종합적으로 고려해야
                  합니다.
                </p>
                <div className="rounded-lg bg-bg-raised p-4">
                  <h3 className="mb-3 font-semibold text-text-primary">
                    최저 비용 환전 전략
                  </h3>
                  <ul className="space-y-2 text-sm text-text-secondary">
                    <li>
                      <strong>1순위: 전신환(해외 송금)</strong> — 스프레드 0.5~1%, 수수료 별도
                      (대액 송금이나 미리 계획된 거래)
                    </li>
                    <li>
                      <strong>2순위: 현찰 + 우대율 최대</strong> — 여행 1주 전부터 은행들 비교,
                      은행 모바일 앱의 환전 우대 쿠폰 활용
                    </li>
                    <li>
                      <strong>3순위: 해외 ATM</strong> — 신용카드·체크카드로 현지 ATM 인출 (환율
                      양호, 수수료 1~2만 원)
                    </li>
                    <li>
                      <strong>4순위: 신용카드</strong> — 현지 카드 결제 (환율 양호하나 카드 수수료
                      가능)
                    </li>
                    <li>
                      <strong>피할 것</strong>: 공항 환전소 (스프레드 2.5~3.5%, 가장 비쌈)
                    </li>
                  </ul>
                </div>
                <p className="text-text-secondary leading-relaxed">
                  결론적으로, 여행 경비를 완전히 현찰로 준비할 필요는 없습니다. 기본 생활비만
                  현찰로 환전하고(500달러~1,000달러 정도), 나머지는 신용카드나 현지 ATM으로
                  충당하면 환전 수수료를 크게 줄일 수 있습니다.
                </p>
                <p className="text-text-secondary leading-relaxed">
                  ⚠️ 다만 목적지 국가의 카드 인수 상황, 환율 변동성, 현지 수수료 정책을 미리
                  조사하고 출발하세요. 특히 마이너한 통화나 개발도상국 여행은 현지 ATM이
                  없을 수도 있으므로 미리 준비가 필요합니다.
                </p>
              </section>

              <AdSlot slot="guide-currency-exchange-mid" format="rectangle" />

              <FaqSection items={FAQ_ITEMS} />

              <section className="card border-l-2 border-l-danger-500 bg-danger-500/5">
                <h2 className="mb-2 text-lg font-semibold text-danger-700 dark:text-danger-300">
                  ⚠️ 주의사항 및 면책조항
                </h2>
                <ul className="space-y-2 text-sm text-danger-700 dark:text-danger-300">
                  <li>
                    • 본 가이드는 일반 금융 정보 제공 목적이며, 특정 은행의 실제 환율 및
                    수수료를 보장하지 않습니다.
                  </li>
                  <li>
                    • 매매기준율, 현찰 스프레드, 우대율은 <strong>은행·통화·시기에 따라 수시
                    변동</strong>되므로, 환전 당일에 은행에 최신 환율을 문의하세요.
                  </li>
                  <li>
                    • 본 가이드의 계산 사례(스프레드 1.75%, 우대율 90% 등)는 설명을 위한 예시
                    값일 뿐, 실제 환율과 다를 수 있습니다.
                  </li>
                  <li>
                    • 환율은 외환시장의 24시간 거래로 매일 변동되며, 특정 요일이나 시간이
                    항상 유리하다는 보장이 없습니다.
                  </li>
                  <li>
                    • 해외 ATM 인출이나 신용카드 사용 시 추가 수수료가 발생할 수 있으므로,
                    카드 발급사의 정책을 미리 확인하세요.
                  </li>
                  <li>
                    • 본 사이트는 금융상품 권유를 하지 않으며, 모든 환전 결정은 본인 책임입니다.
                  </li>
                </ul>
              </section>

              <section aria-label="관련 도구" className="card">
                <h2 className="mb-3 text-lg font-semibold">관련 계산기 및 가이드</h2>
                <ul className="space-y-2 text-sm">
                  <li>
                    →{' '}
                    <Link
                      href="/calculator/exchange/"
                      className="text-primary-600 underline dark:text-primary-500"
                    >
                      환율 계산기
                    </Link>{' '}
                    — 실시간 환율 및 환전 비용 계산
                  </li>
                  <li>
                    →{' '}
                    <Link
                      href="/category/finance/"
                      className="text-primary-600 underline dark:text-primary-500"
                    >
                      금융 카테고리
                    </Link>{' '}
                    — 대출, 예금, 적금, 환율 관련 모든 계산기
                  </li>
                  <li>
                    →{' '}
                    <Link
                      href="/guide/"
                      className="text-primary-600 underline dark:text-primary-500"
                    >
                      전체 가이드 목록
                    </Link>{' '}
                    — 금융, 세금, 부동산 관련 실용 정보
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
                    href="https://www.bok.or.kr/"
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="text-primary-600 underline dark:text-primary-500"
                  >
                    한국은행
                  </a>
                  ,{' '}
                  <a
                    href="https://www.koreaexim.go.kr/"
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="text-primary-600 underline dark:text-primary-500"
                  >
                    한국수출입은행 환율
                  </a>
                  ,{' '}
                  <a
                    href="https://www.fss.or.kr/"
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="text-primary-600 underline dark:text-primary-500"
                  >
                    금융감독원
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
