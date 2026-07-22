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

const URL = 'https://calculatorhost.com/guide/compound-interest-72-rule-2026/';
const DATE_PUBLISHED = '2026-06-24';
const DATE_MODIFIED = '2026-06-24';

export const metadata: Metadata = {
  title: '복리 계산법과 72의 법칙 2026 | 원금 2배 기간·단리 vs 복리',
  description:
    '복리의 마법을 이해하는 복리 계산 공식과 72의 법칙을 정리합니다. 단리와의 차이, 월복리 vs 연복리, 원금 2배 달성 기간 추정, 실제 금융상품 적용 방법을 명확히 설명합니다. 2026년 기준.',
  keywords: [
    '복리 계산',
    '72의 법칙',
    '복리 공식',
    '단리 vs 복리',
    '원금 2배',
    '월복리',
    '연복리',
    '금융 수학',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [
      {
        url: '/og-default.png',
        width: 1200,
        height: 630,
        alt: '복리 계산법과 72의 법칙 2026 | 원금 2배 기간·단리 vs 복리',
      },
    ],
    title: '복리 계산법과 72의 법칙 2026',
    description: '복리의 마법: 단리 vs 복리 차이, 원금 2배 기간 추정, 72의 법칙 활용법',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '복리 계산법과 72의 법칙 2026',
    description: '원금을 2배로 만드는 데 걸리는 기간, 단리보다 얼마나 많은 이자?',
  },
};

const FAQ_ITEMS = [
  {
    question: '복리와 단리의 가장 큰 차이가 뭔가요?',
    answer:
      '단리는 원금에만 이자가 붙지만, 복리는 이자에도 이자가 붙습니다. 예를 들어 원금 1,000만 원, 연 5% 10년이면 단리는 이자 500만 원만 붙어 1,500만이 되지만, 복리는 이자 628만 원이 붙어 1,628만이 됩니다. 시간이 길수록 차이가 커집니다.',
  },
  {
    question: '72의 법칙은 정확한 건가요?',
    answer:
      '72의 법칙은 근사값입니다. 연 5% 이율이면 72÷5=14.4년이라고 추정하는데, 실제로는 약 14.2년입니다. 이율이 낮거나 중간대(3~8%)일 때 매우 정확하지만, 이율이 높거나 낮아질수록 오차가 커집니다. 빠른 추정용으로는 충분합니다.',
  },
  {
    question: '월복리와 연복리 중 어느 게 유리한가요?',
    answer:
      '월복리가 더 유리합니다. 복리 빈도가 높을수록 이자가 더 많이 쌓입니다. 예를 들어 원금 1,000만 원, 연 5% 1년이면 연복리는 1,050만, 월복리는 약 1,051.1만이 됩니다. 차이는 작지만, 기간이 길어질수록 커집니다.',
  },
  {
    question: '세후 이자를 고려하면 복리가 줄어드나요?',
    answer:
      '네, 맞습니다. 이자소득세는 소득세법 §129에 따른 원천징수세율 14%에 지방소득세 1.4%를 합쳐 15.4%입니다. 예를 들어 원금 1,000만 원에서 이자가 50만이 발생했다면, 세금 7.7만을 내고 세후 이자는 42.3만입니다. 은행 적금이나 예금의 실제 수익률은 이자 × (1−0.154)입니다.',
  },
  {
    question: '정기예금과 적금 중 어느 게 복리가 더 좋은가요?',
    answer:
      '같은 금리라면 복리 방식에 따라 달라집니다. 정기예금은 보통 만기일시로 이자를 한 번에 받으므로 고정이자입니다. 반면 적금은 매달 원금을 추가하면서 복리 이자가 누적되는 구조라 효과가 다릅니다. 자세한 비교는 적금 계산기를 사용하세요.',
  },
  {
    question: '72의 법칙으로 목표 자산을 만들 수 있나요?',
    answer:
      '72의 법칙은 "원금이 2배 되는 기간"만 알려줍니다. 목표 자산에 도달하는 시간을 계산하려면 복리 공식(원리금 = 원금 × (1+이율)의 n승)을 사용해야 합니다. 예를 들어 원금 1,000만에서 2,000만이 목표면 2배 기간을 사용하면 되지만, 3,000만이 목표면 복리 공식을 직접 사용하세요.',
  },
  {
    question: '연 10% 금리로 72의 법칙을 쓰면?',
    answer:
      '72÷10=7.2년입니다. 원금이 약 7.2년에 2배가 됩니다. 다만 이율이 높을수록 근사값의 오차가 커지므로, 실제로는 약 7.27년입니다. 금융상품에서 연 10% 이상의 이율은 매우 드물고, 높은 수익을 약속하는 상품은 위험도 높다는 점을 기억하세요.',
  },
];

export default function CompoundInterest72Rule2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '복리 계산법과 72의 법칙 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '복리 계산법과 72의 법칙 2026',
    description:
      '복리 계산 공식, 단리와의 차이, 72의 법칙을 통한 원금 2배 기간 추정, 월복리·세후 이자를 포함한 실제 금융 적용 방법을 명확히 정리합니다.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['복리', '72의 법칙', '단리', '복리 공식', '원금 2배', '월복리', '세후 이자'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '복리 계산법과 72의 법칙 2026 | calculatorhost',
    description:
      '복리의 마법: 단리 vs 복리, 72의 법칙, 원금 2배 기간 계산, 금융상품 적용',
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
                    { name: '복리 계산법과 72의 법칙 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">
                  금융 · 8분 읽기 · 2026-06-24
                </p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  복리 계산법과 72의 법칙 2026
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  복리(compound interest)는 "이자에 붙는 이자"입니다. 같은 금액을 저축해도 복리를
                  이해하면 단리보다 훨씬 큰 수익을 거둘 수 있습니다. 이 가이드에서는 복리 계산
                  공식, 단리와의 구체적 차이, 원금이 2배가 되는 기간을 빠르게 추정하는 72의 법칙을
                  명확히 설명합니다.
                </p>
              </header>

              <AdSlot slot="guide-compound-interest-72-rule-top" format="horizontal" />

              <section aria-label="요약" className="card border-l-4 border-l-primary-500">
                <h2 className="mb-2 text-caption uppercase tracking-wider text-primary-500">
                  핵심 요약
                </h2>
                <table className="w-full border-collapse text-sm">
                  <caption className="mb-2 text-left font-semibold text-text-primary">
                    복리 vs 단리 비교 (예시: 원금 1,000만, 연 5%, 10년)
                  </caption>
                  <thead>
                    <tr className="border-b border-border-base">
                      <th scope="col" className="pb-2 pr-3 text-left font-semibold">
                        구분
                      </th>
                      <th scope="col" className="pb-2 text-left font-semibold">
                        이자 계산
                      </th>
                      <th scope="col" className="pb-2 text-left font-semibold">
                        총 이자
                      </th>
                      <th scope="col" className="pb-2 text-left font-semibold">
                        최종 원리금
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-text-secondary">
                    <tr className="border-b border-border-base">
                      <td className="py-2 pr-3 font-semibold">단리</td>
                      <td>원금에만 이자</td>
                      <td>500만 원</td>
                      <td>1,500만 원</td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-3 font-semibold">복리</td>
                      <td>원금 + 이자에 이자</td>
                      <td>628.9만 원</td>
                      <td>1,628.9만 원</td>
                    </tr>
                  </tbody>
                </table>
              </section>

              <section className="space-y-4">
                <h2 className="border-b border-border-base pb-2 text-2xl font-bold">
                  단리와 복리는 뭐가 다른가요?
                </h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  단리와 복리는 이자를 계산하는 방식의 근본적인 차이입니다. 단리는 원금에만
                  이자가 붙지만, 복리는 원금에 붙은 이자마저도 다시 이자 계산의 기초가 됩니다.
                </p>

                <div className="space-y-3">
                  <div className="rounded-lg bg-bg-raised p-4">
                    <h3 className="mb-2 font-semibold text-text-primary">① 단리 (Simple Interest)</h3>
                    <p className="text-sm text-text-secondary">
                      <strong>정의</strong>: 원금에만 일정한 이자가 붙는 방식
                    </p>
                    <p className="text-sm text-text-secondary">
                      <strong>공식</strong>: 이자 = 원금 × 연이율 × 년수
                    </p>
                    <p className="text-sm text-text-secondary">
                      <strong>예시</strong>: 원금 1,000만, 연 5%, 10년 → 이자 500만
                      (1,000만 × 5% × 10)
                    </p>
                    <p className="text-xs text-text-tertiary">
                      1년차, 2년차, 10년차 모두 매년 이자가 정확히 50만씩 고정입니다.
                    </p>
                  </div>

                  <div className="rounded-lg bg-bg-raised p-4">
                    <h3 className="mb-2 font-semibold text-text-primary">② 복리 (Compound Interest)</h3>
                    <p className="text-sm text-text-secondary">
                      <strong>정의</strong>: 원금과 누적된 이자 모두에 새로운 이자가 붙는 방식
                    </p>
                    <p className="text-sm text-text-secondary">
                      <strong>공식</strong>: 원리금 = 원금 × (1 + 이율)의 n승
                    </p>
                    <p className="text-sm text-text-secondary">
                      <strong>예시</strong>: 원금 1,000만, 연 5%, 10년 → 원리금 약 1,628.9만
                    </p>
                    <p className="text-xs text-text-tertiary">
                      1년차 이자 50만, 2년차 이자 약 52.5만, 10년차 이자 약 64.1만으로 매년
                      증가합니다.
                    </p>
                  </div>
                </div>

                <p className="text-text-secondary leading-relaxed">
                  위 예시에서 두 방식의 이자 차이는 약 128.9만 원입니다. 같은 금액, 같은
                  이율, 같은 기간인데도 복리가 훨씬 더 큰 이자를 만들어냅니다.
                </p>

                <p className="text-text-secondary leading-relaxed">
                  다만 현실의 금융상품에서는 단리를 찾기 어렵습니다. 대부분의 적금, 예금,
                  정기예금이 복리를 기본으로 합니다. 학습 목적으로 단리는 이해하되, 실제 금융
                  상품 선택 시에는 금리(예: 연 5%), 복리 빈도(연 1회, 월 1회, 일 1회), 세후
                  이자를 함께 확인해야 합니다.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="border-b border-border-base pb-2 text-2xl font-bold">
                  복리 공식을 자세히 들여다볼까요?
                </h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  복리 공식은 매우 간단하지만 강력합니다. 이를 이해하면 금융 거래의 본질을
                  파악할 수 있습니다.
                </p>

                <div className="rounded-lg bg-bg-raised p-4">
                  <h3 className="mb-3 font-semibold text-text-primary">기본 복리 공식</h3>
                  <p className="font-mono text-sm font-semibold text-text-primary">
                    원리금 = 원금 × (1 + r)의 n승
                  </p>
                  <ul className="mt-3 space-y-2 text-sm text-text-secondary">
                    <li>
                      <strong>r</strong> = 기간 이율 (월복리면 연이율÷12, 연복리면 연이율)
                    </li>
                    <li>
                      <strong>n</strong> = 기간 수 (월복리면 개월수, 연복리면 년수)
                    </li>
                  </ul>
                </div>

                <div className="rounded-lg bg-bg-raised p-4">
                  <h3 className="mb-3 font-semibold text-text-primary">계산 사례</h3>
                  <ul className="space-y-3 text-sm text-text-secondary">
                    <li>
                      <strong>연복리: 원금 1,000만, 연 5%, 10년</strong>
                      <br />
                      원리금 = 1,000만 × (1.05)의 10승
                      <br />
                      = 1,000만 × 1.62889 = 약 1,628.9만 원
                      <br />
                      이자 = 1,628.9만 − 1,000만 = 약 628.9만 원
                    </li>
                    <li>
                      <strong>월복리: 원금 1,000만, 연 5% (월 0.417%), 120개월</strong>
                      <br />
                      월이율 = 5% ÷ 12 ≈ 0.41667%
                      <br />
                      원리금 = 1,000만 × (1.004167)의 120승
                      <br />
                      = 1,000만 × 1.64701 ≈ 약 1,647.0만 원
                      <br />
                      이자 = 약 647.0만 원 (연복리보다 약 18.1만 더 많음)
                    </li>
                    <li>
                      <strong>분기복리: 원금 1,000만, 연 5% (분기 1.25%), 40분기</strong>
                      <br />
                      분기이율 = 5% ÷ 4 = 1.25%
                      <br />
                      원리금 = 1,000만 × (1.0125)의 40승
                      <br />
                      ≈ 1,000만 × 1.6436 ≈ 약 1,643.6만 원
                    </li>
                  </ul>
                </div>

                <p className="text-text-secondary leading-relaxed">
                  위 사례들에서 보면 복리 빈도가 높을수록(연 → 분기 → 월) 최종 원리금이
                  약간씩 늘어납니다. 다만 차이는 예상보다 작습니다. 1,000만 원을 기준으로 연
                  5% 10년이면 연복리 628.9만 vs 월복리 647.0만으로 약 18만 원 정도의 차이입니다.
                </p>

                <p className="text-text-secondary leading-relaxed">
                  다만 위 계산은 세전(gross) 이자이며, 실제 금융상품의 이자는 이자소득세
                  15.4%(소득세법 §129 원천징수세율 14% + 지방소득세 1.4%)가 공제됩니다. 세후
                  이자는 총 이자 × (1 − 0.154)로 계산하세요.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="border-b border-border-base pb-2 text-2xl font-bold">
                  72의 법칙이란 뭔가요?
                </h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  72의 법칙은 복리로 원금이 정확히 2배가 되는 데 걸리는 기간을 빠르게 추정하는
                  방법입니다. 복리 공식을 수학적으로 변형하면 다음과 같습니다.
                </p>

                <div className="rounded-lg bg-bg-raised p-4">
                  <h3 className="mb-2 font-semibold text-text-primary">72의 법칙 공식</h3>
                  <p className="font-mono text-sm font-semibold text-text-primary">
                    원금이 2배 되는 기간 ≈ 72 ÷ 연이율(%)
                  </p>
                  <p className="mt-3 text-sm text-text-secondary">
                    예: 연 5% 이율이면 72 ÷ 5 = 약 14.4년
                  </p>
                </div>

                <p className="text-text-secondary leading-relaxed">
                  이 공식은 놀랍도록 정확합니다(특히 3~10% 범위). 복잡한 계산 없이 이율 하나만
                  알면 대략적인 기간을 즉시 예측할 수 있습니다.
                </p>

                <table className="w-full border-collapse text-sm">
                  <caption className="mb-2 text-left font-semibold text-text-primary">
                    72의 법칙 적용표 (연이율별 원금 2배 기간)
                  </caption>
                  <thead>
                    <tr className="border-b border-border-base">
                      <th scope="col" className="pb-2 pr-3 text-left font-semibold">
                        연이율
                      </th>
                      <th scope="col" className="pb-2 text-left font-semibold">
                        72의 법칙 추정
                      </th>
                      <th scope="col" className="pb-2 text-left font-semibold">
                        실제 기간
                      </th>
                      <th scope="col" className="pb-2 text-left font-semibold">
                        오차
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-text-secondary">
                    <tr className="border-b border-border-base">
                      <td className="py-2 pr-3">3%</td>
                      <td>24년</td>
                      <td>약 23.45년</td>
                      <td>약 +2%</td>
                    </tr>
                    <tr className="border-b border-border-base">
                      <td className="py-2 pr-3">4%</td>
                      <td>18년</td>
                      <td>약 17.67년</td>
                      <td>약 +2%</td>
                    </tr>
                    <tr className="border-b border-border-base">
                      <td className="py-2 pr-3">5%</td>
                      <td>약 14.4년</td>
                      <td>약 14.21년</td>
                      <td>약 +1.3%</td>
                    </tr>
                    <tr className="border-b border-border-base">
                      <td className="py-2 pr-3">6%</td>
                      <td>12년</td>
                      <td>약 11.90년</td>
                      <td>약 +0.8%</td>
                    </tr>
                    <tr className="border-b border-border-base">
                      <td className="py-2 pr-3">8%</td>
                      <td>9년</td>
                      <td>약 8.99년</td>
                      <td>약 +0.1%</td>
                    </tr>
                    <tr className="border-b border-border-base">
                      <td className="py-2 pr-3">9%</td>
                      <td>8년</td>
                      <td>약 8.04년</td>
                      <td>약 −0.5%</td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-3">10%</td>
                      <td>7.2년</td>
                      <td>약 7.27년</td>
                      <td>약 −1%</td>
                    </tr>
                  </tbody>
                </table>

                <p className="text-text-secondary leading-relaxed">
                  보시면 3~10% 범위에서 72의 법칙이 매우 정확함을 알 수 있습니다. 특히
                  중간대(5~8%)에서는 오차가 거의 1% 미만입니다. 이것이 72의 법칙이 세계적으로
                  널리 사용되는 이유입니다.
                </p>

                <p className="text-text-secondary leading-relaxed">
                  다만 이율이 매우 높거나(20% 이상) 매우 낮을(1% 미만) 때는 오차가 커집니다.
                  또한 72의 법칙은 "명목 이자율"을 기준으로 하며, 세후 이자율이 아닙니다. 실제
                  금융상품에서는 이자소득세 15.4%를 공제한 세후 이율로 다시 계산해야 합니다.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="border-b border-border-base pb-2 text-2xl font-bold">
                  복리가 정말 대박인가요?
                </h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  복리는 강력하지만, 현실에서는 기대보다 느릴 수 있습니다. 몇 가지 현실적인
                  요소를 고려해야 합니다.
                </p>

                <div className="space-y-3">
                  <div className="rounded-lg bg-bg-raised p-4">
                    <h3 className="mb-2 font-semibold text-text-primary">
                      현실 요소 1: 세금(이자소득세 15.4%)
                    </h3>
                    <p className="text-sm text-text-secondary">
                      원금 1,000만, 연 5% 10년의 복리라면 이자는 628.9만입니다. 하지만 이자소득세
                      15.4%를 내면 세후 이자는 약 531.6만입니다. 세후 원리금은 약 1,531.6만이
                      됩니다. 세금이 없을 때(1,628.9만)보다 약 97만 원을 덜 받습니다.
                    </p>
                  </div>

                  <div className="rounded-lg bg-bg-raised p-4">
                    <h3 className="mb-2 font-semibold text-text-primary">
                      현실 요소 2: 인플레이션
                    </h3>
                    <p className="text-sm text-text-secondary">
                      명목 수익률 5%라도 인플레이션이 3%라면 실질 수익률은 약 2%입니다. 더욱이
                      이자소득세 15.4%를 공제하면 실질 수익률은 더 낮아집니다. 장기 자산 형성을
                      계획할 때는 인플레이션을 함께 고려해야 합니다.
                    </p>
                  </div>

                  <div className="rounded-lg bg-bg-raised p-4">
                    <h3 className="mb-2 font-semibold text-text-primary">
                      현실 요소 3: 금리 변동
                    </h3>
                    <p className="text-sm text-text-secondary">
                      72의 법칙이나 복리 공식은 고정 이율을 전제합니다. 실제로는 적금 이율이
                      해마다 변하고, 특히 저금리 환경에서는 기대했던 복리 효과를 얻기 어렵습니다.
                      현재(2026)의 평균 적금 이율은 약 3~4%대입니다.
                    </p>
                  </div>
                </div>

                <p className="text-text-secondary leading-relaxed">
                  다만 복리가 약해 보인다고 해서 무시할 수는 없습니다. 장기적으로는 단리나
                  미적립(저축하지 않음)보다는 훨씬 유리합니다. 특히 은퇴 준비처럼 20~30년의
                  긴 기간이라면, 매달 꾸준히 저축하는 것이 큰 자산을 만듭니다.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="border-b border-border-base pb-2 text-2xl font-bold">
                  복리를 실제로 활용하려면?
                </h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  복리의 이론을 이해한 후에는 실제 금융상품에 적용할 차례입니다. 몇 가지
                  실천 팁을 소개합니다.
                </p>

                <div className="space-y-3">
                  <div className="rounded-lg bg-bg-raised p-4">
                    <h3 className="mb-2 font-semibold text-text-primary">
                      팁 1: 복리 빈도가 높은 상품 선택
                    </h3>
                    <p className="text-sm text-text-secondary">
                      적금이나 예금을 선택할 때, 같은 금리라면 월복리가 연복리보다 약간 더
                      유리합니다. 은행별로 복리 방식이 다르므로, 상품 설명서에서 "복리 계산 방법"
                      또는 "이자 계산"을 꼭 확인하세요.
                    </p>
                  </div>

                  <div className="rounded-lg bg-bg-raised p-4">
                    <h3 className="mb-2 font-semibold text-text-primary">
                      팁 2: 장기 일관성이 가장 중요
                    </h3>
                    <p className="text-sm text-text-secondary">
                      복리는 시간에 매우 민감합니다. 1% 금리 차이보다 1년 더 오래 유지하는 것이
                      더 많은 이자를 만듭니다. 매달 꾸준히 저축하고, 가능하면 이자를 재투자하면
                      복리의 효과가 극대화됩니다.
                    </p>
                  </div>

                  <div className="rounded-lg bg-bg-raised p-4">
                    <h3 className="mb-2 font-semibold text-text-primary">
                      팁 3: 세후 이자로 현실적으로 계획
                    </h3>
                    <p className="text-sm text-text-secondary">
                      광고나 예상 수익은 세전 이자를 표시합니다. 실제 받을 이자는 15.4%를 공제하고
                      생각하세요. 예상 이자가 100만이라면 세후는 약 84.6만입니다. 이를 바탕으로
                      목표 자산 달성 기간을 계획하세요.
                    </p>
                  </div>

                  <div className="rounded-lg bg-bg-raised p-4">
                    <h3 className="mb-2 font-semibold text-text-primary">
                      팁 4: 연 5~6% 이율 상품은 매우 드문 점 명심
                    </h3>
                    <p className="text-sm text-text-secondary">
                      72의 법칙에서 5% 이율이면 14년에 2배라고 했지만, 현실의 연 5% 수익률은
                      찾기 어렵습니다. 현재 적금 금리는 3~4%대, 정기예금은 4~5%대입니다. 높은
                      수익을 약속하는 상품일수록 위험도가 높다는 점을 기억하세요.
                    </p>
                  </div>
                </div>

                <p className="text-text-secondary leading-relaxed">
                  다만 위 팁들은 일반적인 가이드입니다. 금리, 세법, 금융상품은 시간에 따라
                  변합니다. 특정 상품 선택이나 큰 금액 운용 전에는 항상 금융기관 상담이나
                  공식 자료를 확인하세요.
                </p>
              </section>

              <AdSlot slot="guide-compound-interest-72-rule-mid" format="rectangle" />

              <FaqSection items={FAQ_ITEMS} />

              <section className="card border-l-2 border-l-danger-500 bg-danger-500/5">
                <h2 className="mb-2 text-lg font-semibold text-danger-700 dark:text-danger-300">
                  주의사항 및 면책조항
                </h2>
                <ul className="space-y-2 text-sm text-danger-700 dark:text-danger-300">
                  <li>
                    • 본 가이드의 모든 계산은 교육 및 추정 목적이며, 실제 금융상품의 수익을
                    보장하지 않습니다.
                  </li>
                  <li>
                    • 금융상품의 이자율, 복리 빈도, 세율은 시간에 따라 변하므로, 현재 상품
                    선택 시 금융기관 최신 정보를 반드시 확인하세요.
                  </li>
                  <li>
                    • 72의 법칙은 근사값이며, 특히 이율이 1% 미만이거나 20% 이상일 때는 오차가
                    커집니다.
                  </li>
                  <li>
                    • 이자소득세 15.4%(소득세법 §129 원천징수세율 14% + 지방소득세 1.4%)는
                    2026년 기준입니다. 세법 변경 시 달라질 수 있으므로 국세청 공식 기준을
                    따르세요.
                  </li>
                  <li>
                    • 인플레이션, 금리 변동, 기회비용 등 다양한 경제 요소는 실제 수익에 영향을
                    줍니다. 모든 금융 결정은 본인 책임이며, 필요하면 전문가 상담을 받으세요.
                  </li>
                </ul>
              </section>

              <section aria-label="관련 도구" className="card">
                <h2 className="mb-3 text-lg font-semibold">관련 계산기 및 가이드</h2>
                <ul className="space-y-2 text-sm">
                  <li>
                    →{' '}
                    <Link
                      href="/calculator/savings/"
                      className="text-primary-600 underline dark:text-primary-500"
                    >
                      적금 이자 계산기
                    </Link>{' '}
                    — 월불입 적금의 만기금액 및 세후 이자 실시간 계산
                  </li>
                  <li>
                    →{' '}
                    <Link
                      href="/calculator/deposit/"
                      className="text-primary-600 underline dark:text-primary-500"
                    >
                      정기예금 이자 계산기
                    </Link>{' '}
                    — 한 번에 맡기는 예금의 만기금액 및 이자
                  </li>
                  <li>
                    →{' '}
                    <Link
                      href="/guide/inflation-money-value-2026/"
                      className="text-primary-600 underline dark:text-primary-500"
                    >
                      인플레이션과 화폐가치 2026
                    </Link>{' '}
                    — 명목 수익률 vs 실질 수익률의 차이 이해
                  </li>
                  <li>
                    →{' '}
                    <Link
                      href="/calculator/loan/"
                      className="text-primary-600 underline dark:text-primary-500"
                    >
                      대출이자 계산기
                    </Link>{' '}
                    — 대출금의 원리금균등 상환액 및 총이자
                  </li>
                  <li>
                    →{' '}
                    <Link
                      href="/category/finance/"
                      className="text-primary-600 underline dark:text-primary-500"
                    >
                      금융 카테고리
                    </Link>{' '}
                    — 대출, 예금, 적금, 환율 관련 모든 계산기 및 가이드
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
                    한국은행 금리 정보
                  </a>
                  ,{' '}
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
                    href="https://www.nts.go.kr/"
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="text-primary-600 underline dark:text-primary-500"
                  >
                    국세청 세금 기준
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
