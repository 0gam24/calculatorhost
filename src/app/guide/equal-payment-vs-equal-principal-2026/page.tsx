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

const URL = 'https://calculatorhost.com/guide/equal-payment-vs-equal-principal-2026/';
const DATE_PUBLISHED = '2026-06-22';
const DATE_MODIFIED = '2026-06-22';

export const metadata: Metadata = {
  title: '원리금균등 vs 원금균등 2026 | 대출 상환방식 비교 가이드',
  description:
    '원리금균등과 원금균등 상환 방식의 차이를 정리합니다. 월 상환액, 총이자, 초기 부담 비교, 선택 기준을 공식·계산 사례로 설명합니다. 2026년 기준.',
  keywords: [
    '원리금균등',
    '원금균등',
    '대출 상환방식',
    '월 상환액 비교',
    '총이자 계산',
    '주담대',
    '전세대출',
    '대출',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [
      {
        url: '/og-default.png',
        width: 1200,
        height: 630,
        alt: '원리금균등 vs 원금균등 2026 | 대출 상환방식 비교 가이드',
      },
    ],
    title: '원리금균등 vs 원금균등 2026',
    description: '두 상환 방식의 공식, 월 부담, 총이자 차이를 비교 분석합니다.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '원리금균등 vs 원금균등',
    description: '대출 상환방식 비교 — 월 부담, 총이자, 선택 기준',
  },
};

const FAQ_ITEMS = [
  {
    question: '어느 상환 방식이 더 유리한가요?',
    answer:
      '상황에 따라 다릅니다. 초기 월 부담을 낮추고 싶으면 원리금균등이 유리하고, 총이자를 최소화하고 초기 여유자금이 충분하면 원금균등이 유리합니다. 개인의 현금 흐름과 재무 계획을 고려해 선택하세요.',
  },
  {
    question: '1억 원, 연 5%, 30년 상환 시 총이자는 얼마나 다르나요?',
    answer:
      '원리금균등은 총이자 약 9,326만 원, 원금균등은 총이자 약 7,521만 원입니다. 원금균등이 약 1,805만 원 더 적습니다. 다만 초기 월부담은 원금균등(약 69.4만 원)이 원리금균등(약 53.7만 원)보다 약 15.7만 원 더 큽니다.',
  },
  {
    question: '주택담보대출은 어느 상환 방식이 일반적인가요?',
    answer:
      '일반적으로 원리금균등이 더 흔하며, 은행도 이를 기본 상품으로 제공하는 경우가 많습니다. 원금균등은 초기 부담이 크기 때문에 선택 고객이 적습니다. 상품에 따라 두 방식 모두 가능한 경우도 있으니 은행에 문의하세요.',
  },
  {
    question: '상환 도중에 방식을 바꿀 수 있나요?',
    answer:
      '은행마다 정책이 다릅니다. 일부 은행은 중도에 상환 방식 변경을 허용하지만, 수수료가 발생할 수 있습니다. 변경을 고려한다면 반드시 해당 은행에 문의해 조건을 확인하세요.',
  },
  {
    question: '중간에 일시상환하거나 추가로 상환하면 총이자가 줄어드나요?',
    answer:
      '네, 맞습니다. 원금을 빨리 갚을수록 남은 잔액에 적용되는 이자가 줄어들므로 총이자가 감소합니다. 원리금균등과 원금균등 모두 동일하게 적용되므로, 여유 자금이 있을 때 추가 상환하는 것이 유리합니다.',
  },
];

export default function EqualPaymentVsPrincipal2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '원리금균등 vs 원금균등 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '원리금균등 vs 원금균등 2026',
    description:
      '원리금균등과 원금균등 상환 방식의 공식, 월 상환액, 총이자, 적용 사례를 비교합니다.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['원리금균등', '원금균등', '대출 상환방식', '총이자', '월 상환액'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '원리금균등 vs 원금균등 2026 | calculatorhost',
    description:
      '두 대출 상환 방식의 개념, 계산 공식, 월 부담과 총이자 비교, 선택 기준을 정리합니다.',
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
                    { name: '원리금균등 vs 원금균등 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">
                  금융 · 7분 읽기 · 2026-06-22
                </p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  원리금균등 vs 원금균등 2026
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  대출을 받으면 상환 방식을 선택해야 합니다. 원리금균등과 원금균등은 두 가지
                  대표적인 상환 방식인데, 월 상환액과 총이자가 크게 다릅니다. 이 가이드에서는
                  두 방식의 공식, 계산 사례, 장단점을 비교하여 본인에게 맞는 상환 방식을
                  선택하는 데 도움을 드립니다.
                </p>
              </header>

              <AdSlot slot="guide-equal-payment-vs-principal-top" format="horizontal" />

              <section aria-label="요약" className="card border-l-4 border-l-primary-500">
                <h2 className="mb-2 text-caption uppercase tracking-wider text-primary-500">
                  핵심 요약
                </h2>
                <table className="w-full border-collapse text-sm">
                  <caption className="mb-2 text-left font-semibold text-text-primary">
                    원리금균등 vs 원금균등 상환 방식 비교 (원금 1억 원, 연 5%, 30년 기준)
                  </caption>
                  <thead>
                    <tr className="border-b border-border-base">
                      <th scope="col" className="pb-2 pr-3 text-left font-semibold">
                        구분
                      </th>
                      <th scope="col" className="pb-2 text-left font-semibold">
                        원리금균등
                      </th>
                      <th scope="col" className="pb-2 text-left font-semibold">
                        원금균등
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-text-secondary">
                    <tr className="border-b border-border-base">
                      <td className="py-2 pr-3">월 상환액 (1회차)</td>
                      <td>약 536,822원 (고정)</td>
                      <td>약 694,444원 (가장 많음)</td>
                    </tr>
                    <tr className="border-b border-border-base">
                      <td className="py-2 pr-3">월 상환액 (마지막)</td>
                      <td>약 536,822원 (동일)</td>
                      <td>약 278,935원 (가장 적음)</td>
                    </tr>
                    <tr className="border-b border-border-base">
                      <td className="py-2 pr-3">총 상환액</td>
                      <td>약 1억 9,326만 원</td>
                      <td>약 1억 7,521만 원</td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-3">총이자</td>
                      <td>약 9,326만 원</td>
                      <td>약 7,521만 원 (1,805만 원 적음)</td>
                    </tr>
                  </tbody>
                </table>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">
                  원리금균등과 원금균등, 뭐가 다른가요?
                </h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  원리금균등(equal payment)과 원금균등(equal principal)은 매월 갚는 원금과
                  이자의 비중이 다릅니다. 둘 다 일정 기간에 원금과 이자를 모두 상환하지만,
                  분할 방식에서 차이가 납니다.
                </p>
                <p className="text-text-secondary leading-relaxed">
                  <strong>원리금균등</strong>은 매월 갚는 총액(원금 + 이자)이 항상 동일합니다. 초기에는
                  이자의 비중이 크고 원금의 비중이 작다가, 회차가 지날수록 원금의 비중이 커집니다.
                </p>
                <p className="text-text-secondary leading-relaxed">
                  <strong>원금균등</strong>은 매월 갚는 원금이 P÷n(원금÷개월 수)으로 고정되어 있고,
                  이자는 남은 잔액에 따라 매월 달라집니다. 따라서 월 상환액은 점차 감소합니다.
                </p>
                <p className="text-text-secondary leading-relaxed">
                  ⚠️ 다만 은행 상품마다 상환 방식 선택 범위가 다릅니다. 일부는 원리금균등만
                  제공하고, 일부는 선택 가능합니다. 가입 전 반드시 상품 약관을 확인하세요.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">계산 공식과 월 상환액 구조</h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  두 상환 방식의 계산 공식을 정리하면 다음과 같습니다.
                </p>

                <div className="rounded-lg bg-bg-raised p-4">
                  <h3 className="mb-3 font-semibold text-text-primary">
                    ① 원리금균등 상환 공식
                  </h3>
                  <div className="space-y-2 text-sm font-mono text-text-primary">
                    <p>월상환액 = P × r(1+r)^n ÷ ((1+r)^n − 1)</p>
                    <ul className="ml-4 space-y-1 text-text-secondary">
                      <li>P = 원금</li>
                      <li>r = 월이자율 (= 연이자율 ÷ 12)</li>
                      <li>n = 상환 개월 수</li>
                    </ul>
                  </div>
                  <p className="mt-3 text-xs text-text-tertiary">
                    이 공식으로 계산한 월상환액은 모든 기간에 동일합니다. 각 회차마다 이자 = 남은
                    잔액 × 월이자율, 원금 = 월상환액 − 이자로 계산됩니다.
                  </p>
                </div>

                <div className="rounded-lg bg-bg-raised p-4">
                  <h3 className="mb-3 font-semibold text-text-primary">
                    ② 원금균등 상환 구조
                  </h3>
                  <div className="space-y-2 text-sm text-text-primary">
                    <p>
                      <strong>매월 원금 = P ÷ n (고정)</strong>
                    </p>
                    <p>
                      <strong>매월 이자 = 남은 잔액 × r (변동)</strong>
                    </p>
                    <p>
                      <strong>월상환액 = 매월 원금 + 매월 이자 (감소)</strong>
                    </p>
                  </div>
                  <p className="mt-3 text-xs text-text-tertiary">
                    첫 달부터 마지막 달까지 이자 기반이 줄어들므로, 월상환액이 점차 감소합니다.
                  </p>
                </div>

                <p className="text-text-secondary leading-relaxed">
                  ⚠️ 다만 위는 표준 금융 공식이며, 실제 은행 상품에서는 기산일(월중 거래일),
                  일수 계산(30일 기준 또는 실제 일수), 반올림 방식이 다를 수 있으므로, 정확한
                  계산은 각 은행의 대출 계산기를 통해 확인하는 것이 좋습니다.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">실제 사례 시뮬레이션</h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  동일한 조건(원금 1억 원, 연 5%, 30년=360개월)에서 두 상환 방식의 차이를
                  구체적으로 계산해 봅시다.
                </p>

                <div className="rounded-lg bg-bg-raised p-4">
                  <h3 className="mb-3 font-semibold text-text-primary">
                    원리금균등 상환 (Equal Payment)
                  </h3>
                  <ul className="space-y-2 text-sm text-text-secondary">
                    <li>원금: 1억 원</li>
                    <li>연이자율: 5.0% (가정)</li>
                    <li>기간: 30년 (360개월)</li>
                  </ul>
                  <div className="mt-3 space-y-2 text-text-primary">
                    <p>
                      <strong>월상환액: 약 536,822원 (매월 동일)</strong>
                    </p>
                    <p>
                      <strong>총상환액: 약 1억 9,326만 원</strong>
                    </p>
                    <p>
                      <strong>총이자: 약 9,326만 원</strong>
                    </p>
                  </div>
                  <p className="mt-3 text-xs text-text-tertiary">
                    첫 회차: 이자 약 416,667원 + 원금 약 120,155원 = 536,822원
                    <br />
                    마지막 회차: 이자 약 220원 + 원금 약 536,602원 = 536,822원
                  </p>
                </div>

                <div className="rounded-lg bg-bg-raised p-4">
                  <h3 className="mb-3 font-semibold text-text-primary">
                    원금균등 상환 (Equal Principal)
                  </h3>
                  <ul className="space-y-2 text-sm text-text-secondary">
                    <li>원금: 1억 원</li>
                    <li>연이자율: 5.0% (가정)</li>
                    <li>기간: 30년 (360개월)</li>
                  </ul>
                  <div className="mt-3 space-y-2 text-text-primary">
                    <p>
                      <strong>월 원금: 약 277,778원 (고정)</strong>
                    </p>
                    <p>
                      <strong>1회차 월상환액: 약 694,444원 (가장 높음)</strong>
                    </p>
                    <p>
                      <strong>마지막 회차 월상환액: 약 278,935원 (가장 낮음)</strong>
                    </p>
                    <p>
                      <strong>총상환액: 약 1억 7,521만 원</strong>
                    </p>
                    <p>
                      <strong>총이자: 약 7,521만 원</strong>
                    </p>
                  </div>
                  <p className="mt-3 text-xs text-text-tertiary">
                    첫 회차: 이자 약 416,667원 + 원금 약 277,778원 = 694,444원
                    <br />
                    마지막 회차: 이자 약 1,157원 + 원금 약 277,778원 = 278,935원
                  </p>
                </div>

                <p className="text-text-secondary leading-relaxed">
                  <strong>비교 결과:</strong> 원금균등이 총이자를 약 1,805만 원 절감하지만,
                  초기 월부담이 원리금균등보다 약 15.7만 원 많습니다. 이것이 상환 방식 선택의
                  핵심 트레이드오프입니다.
                </p>

                <p className="text-text-secondary leading-relaxed">
                  ⚠️ 다만 위 계산은 이해를 돕기 위한 가정이며, 실제 대출은 금리 변동, 중도
                  상환, 보너스 상황에 따라 달라집니다. 정확한 계산은 대출이자 계산기에서 직접
                  확인하세요.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">어느 방식이 이자를 더 적게 낼 수 있나요?</h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  동일한 원금·금리·기간 조건에서 <strong>원금균등이 항상 원리금균등보다 총이자가
                  적습니다</strong>. 원금균등은 원금을 더 빨리 갚기 때문입니다.
                </p>
                <p className="text-text-secondary leading-relaxed">
                  앞의 예시에서 같은 1억 원, 5%, 30년 조건이었는데, 원금균등이 약 1,805만 원을
                  더 적게 낼 수 있었습니다. 이는 원금을 먼저 집중적으로 갚기 때문에 이자 계산
                  기반이 빠르게 줄어드는 효과입니다.
                </p>
                <p className="text-text-secondary leading-relaxed">
                  다만 초기 월부담이 크므로, 초기에 현금 흐름이 부족하면 실행하기 어려울 수
                  있습니다. 또한 금리가 변동금리라면, 미래 금리 인상으로 인한 부담 증가 가능성도
                  고려해야 합니다.
                </p>
                <p className="text-text-secondary leading-relaxed">
                  ⚠️ 다만 총이자 절감이 항상 최선은 아닙니다. 초기 월부담을 더 견딜 수 있는
                  여유자금이 다른 투자에 더 높은 수익을 가져올 수도 있기 때문입니다. 개인의
                  금융 상황과 목표에 맞춰 선택해야 합니다.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">월 부담이 작은 쪽은 어느 것인가요?</h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  초기 월부담(first month payment)이 가장 낮은 쪽은 <strong>원리금균등</strong>입니다.
                  원리금균등은 고정된 월상환액(약 53.7만 원)을 유지하므로, 초기 부담이 가장
                  적습니다.
                </p>
                <p className="text-text-secondary leading-relaxed">
                  반면 원금균등은 초기에 원금 비중이 높기 때문에 첫 달 월상환액이 가장 높고(약
                  69.4만 원), 이후 점차 감소합니다. 월급이 일정한 직장인이라면 일정한 부담을
                  선호하기 쉬우므로, 원리금균등이 더 선호되는 이유입니다.
                </p>
                <p className="text-text-secondary leading-relaxed">
                  ⚠️ 다만 현금 흐름이 향후 증가할 계획이라면(예: 3년 후 승진 예정, 추가 소득),
                  초기에는 원리금균등으로 부담을 낮추다가 소득이 증가한 후 추가 상환으로
                  원금균등의 이점을 살릴 수도 있습니다. 유연한 대출 상환 정책이 있는지 은행에
                  문의해 보세요.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">내 상황에 맞는 상환 방식을 고르는 기준</h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  두 상환 방식의 선택은 개인의 재무 상황과 목표에 따라 달라집니다.
                </p>

                <h3 className="mb-2 font-semibold text-text-primary">① 원리금균등을 추천하는 경우</h3>
                <ul className="space-y-2 text-text-secondary">
                  <li>
                    • <strong>월급이 고정되어 있고</strong> 일정한 부담을 선호하는 경우
                  </li>
                  <li>
                    • 초기에 현금 흐름이 부족해서 <strong>월 부담을 낮춰야</strong> 하는 경우
                  </li>
                  <li>
                    • 향후 금리가 오를 가능성이 있어 <strong>고정 부담이 안정적</strong>인
                    경우
                  </li>
                  <li>
                    • <strong>상환 일정을 미리 계획</strong>하고 싶은 경우
                  </li>
                </ul>

                <h3 className="mb-2 font-semibold text-text-primary">② 원금균등을 추천하는 경우</h3>
                <ul className="space-y-2 text-text-secondary">
                  <li>
                    • <strong>초기에 현금 여유가 충분해서</strong> 높은 월부담을 감당할 수
                    있는 경우
                  </li>
                  <li>
                    • <strong>총이자 절감을 최우선</strong>으로 생각하는 경우
                  </li>
                  <li>
                    • 향후 소득이 증가할 것으로 예상되는 경우 (예: 연봉 인상)
                  </li>
                  <li>
                    • 빨리 대출을 상환하고 <strong>금융 부담에서 벗어나고</strong> 싶은 경우
                  </li>
                </ul>

                <p className="text-text-secondary leading-relaxed">
                  ⚠️ 다만 은행 상품에 따라 선택 범위가 제한될 수 있습니다. 또한 변동금리 대출의
                  경우, 금리 인상 시 원금균등은 초기 고부담이 더욱 커질 수 있으므로 신중히
                  선택해야 합니다.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">
                  중간에 추가 상환하면 두 방식의 차이가 줄어드나요?
                </h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  네, 맞습니다. 여유 자금이 생겼을 때 원금을 일시에 상환하거나 매달 추가로
                  상환하면, 남은 잔액이 빠르게 줄어들어 총이자가 급격히 감소합니다.
                </p>
                <p className="text-text-secondary leading-relaxed">
                  원리금균등과 원금균등 모두 동일한 원리가 적용됩니다. 예를 들어, 5년 후
                  보너스로 5,000만 원을 일시 상환하면, 남은 25년의 이자 계산 기반이 5,000만
                  원 줄어들기 때문입니다.
                </p>
                <p className="text-text-secondary leading-relaxed">
                  실제로 대출이자 계산기에서 정기적인 추가 상환 일정을 입력하면, 두 방식 간의
                  총이자 차이가 유의미하게 줄어드는 모습을 확인할 수 있습니다.
                </p>
                <p className="text-text-secondary leading-relaxed">
                  ⚠️ 다만 일부 은행은 추가 상환 시 중도상환수수료를 부과하거나, 월 한도를
                  제한할 수 있습니다. 추가 상환을 계획한다면 반드시 대출 약관에서 조건을
                  확인하세요.
                </p>
              </section>

              <AdSlot slot="guide-equal-payment-vs-principal-mid" format="rectangle" />

              <FaqSection items={FAQ_ITEMS} />

              <section className="card border-l-2 border-l-danger-500 bg-danger-500/5">
                <h2 className="mb-2 text-lg font-semibold text-danger-700 dark:text-danger-300">
                  ⚠️ 주의사항 및 면책조항
                </h2>
                <ul className="space-y-2 text-sm text-danger-700 dark:text-danger-300">
                  <li>
                    • 본 가이드는 일반 금융 산술 정보 제공 목적이며, 특정 은행·상품의 상환
                    구조를 보장하지 않습니다.
                  </li>
                  <li>
                    • 시뮬레이션에 사용된 모든 금리, 기간, 계산 가정은 <strong>이해를 돕기 위한
                    것</strong>이며, 실제 대출 조건과 다를 수 있습니다.
                  </li>
                  <li>
                    • 실제 대출 시 변동금리, 중도상환수수료, 보험료, 거래일 기산법 등이 다양하게
                    적용되므로, 정확한 월상환액과 총이자는 은행 대출 계산기나 상담을 통해
                    확인하세요.
                  </li>
                  <li>
                    • 상환 방식 선택은 개인의 재무 상황, 현금 흐름, 미래 계획을 종합적으로
                    고려한 후 신중히 결정하세요.
                  </li>
                  <li>
                    • 본 사이트는 투자·금융상품 권유를 하지 않으며, 모든 재정 결정은 본인
                    책임입니다.
                  </li>
                </ul>
              </section>

              <section aria-label="관련 도구" className="card">
                <h2 className="mb-3 text-lg font-semibold">관련 계산기 및 가이드</h2>
                <ul className="space-y-2 text-sm">
                  <li>
                    →{' '}
                    <Link
                      href="/calculator/loan/"
                      className="text-primary-600 underline dark:text-primary-500"
                    >
                      대출이자 계산기
                    </Link>{' '}
                    — 원리금균등·원금균등·만기일시별 월 상환액 및 총 이자 계산
                  </li>
                  <li>
                    →{' '}
                    <Link
                      href="/calculator/loan-limit/"
                      className="text-primary-600 underline dark:text-primary-500"
                    >
                      대출한도 계산기 (DSR/LTV/DTI)
                    </Link>{' '}
                    — 주담대·전세자금대출 최대 한도 확인
                  </li>
                  <li>
                    →{' '}
                    <Link
                      href="/guide/prepayment-penalty-fee-2026/"
                      className="text-primary-600 underline dark:text-primary-500"
                    >
                      중도상환수수료 계산·면제 조건 2026
                    </Link>{' '}
                    — 빨리 갚거나 갈아탈 때 발생하는 수수료
                  </li>
                  <li>
                    →{' '}
                    <Link
                      href="/guide/dsr-loan-limit-tips/"
                      className="text-primary-600 underline dark:text-primary-500"
                    >
                      DSR 대출한도 늘리는 5가지 방법
                    </Link>{' '}
                    — 신용대출 상환, 소득 합산 등 한도 확보 전략
                  </li>
                  <li>
                    →{' '}
                    <Link
                      href="/guide/interest-rate-hike-dsr-loan-limit-july-2026/"
                      className="text-primary-600 underline dark:text-primary-500"
                    >
                      기준금리 오르면 대출한도 줄어들까? 2026
                    </Link>{' '}
                    — 금리 인상 시 대출한도 및 월 상환액 영향 분석
                  </li>
                  <li>
                    →{' '}
                    <Link
                      href="/category/finance/"
                      className="text-primary-600 underline dark:text-primary-500"
                    >
                      금융 카테고리
                    </Link>{' '}
                    — 대출, 예금, 적금, 환율 관련 모든 가이드 및 계산기
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
                    금융감독원 핀라이프
                  </a>
                  ,{' '}
                  <a
                    href="https://www.fss.or.kr/"
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="text-primary-600 underline dark:text-primary-500"
                  >
                    금융감독원 공시
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
