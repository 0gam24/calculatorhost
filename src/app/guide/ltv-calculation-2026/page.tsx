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

const URL = 'https://calculatorhost.com/guide/ltv-calculation-2026/';
const DATE_PUBLISHED = '2026-06-24';
const DATE_MODIFIED = '2026-06-24';

export const metadata: Metadata = {
  title: 'LTV 계산법 2026 | 담보인정비율·대출가능액·DSR/DTI 차이',
  description:
    'LTV(담보인정비율) 계산법을 쉽게 정리합니다. 대출가능액 역산, 담보가치 기준, DSR/DTI/LTV 규제 차이, 실제 대출한도 결정 요소를 명확히 설명합니다. 2026년 기준.',
  keywords: [
    'LTV 계산',
    '담보인정비율',
    '대출가능액',
    'LTV DTI DSR 차이',
    '대출한도',
    '주담대',
    '주택담보대출',
    '금융 규제',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [
      {
        url: '/og-default.png',
        width: 1200,
        height: 630,
        alt: 'LTV 계산법 2026 | 담보인정비율·대출가능액·DSR/DTI 차이',
      },
    ],
    title: 'LTV 계산법 2026',
    description: '담보인정비율의 개념, 계산 공식, 대출가능액 역산, DSR/DTI와의 관계를 정리합니다.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LTV 계산법 2026',
    description: '대출가능액을 결정하는 LTV, DSR, DTI의 의미와 규제 기준',
  },
};

const FAQ_ITEMS = [
  {
    question: 'LTV가 뭔가요?',
    answer:
      'LTV는 Loan-to-Value의 약자로, 담보(주택)의 가치 대비 대출 비율을 뜻합니다. 예를 들어 주택 가치가 5억 원이고 LTV가 70%라면, 최대 3.5억 원까지 대출 가능하다는 의미입니다. 금융기관이 위험을 관리하기 위해 설정하는 가장 기본적인 규제입니다.',
  },
  {
    question: '담보가치는 어떻게 결정되나요?',
    answer:
      '담보가치는 일반적으로 KB시세, 금융기관 감정가, 또는 매매계약가 중 가장 보수적인 값으로 결정됩니다. 금융기관마다 다른 기준을 사용하므로, 같은 주택이라도 은행별로 담보가치가 다를 수 있습니다. 대출 신청 전에 상담을 통해 해당 기관의 담보가치 기준을 확인하는 것이 중요합니다.',
  },
  {
    question: 'LTV 70% 맥스라고 했는데, 실제로 그 한도까지 빌릴 수 있나요?',
    answer:
      '아닙니다. LTV 70%는 담보가치 기준 최대 한도이지만, 실제 대출은 DSR(총 부채 상환 비율) 규제가 더 낮을 수 있습니다. 예를 들어 LTV 70% 한도가 3.5억 원이더라도, 당신의 연소득이 낮거나 기존 대출이 많으면 DSR 때문에 2.5억 원만 가능할 수 있습니다. 세 규제(LTV·DTI·DSR) 중 가장 낮은 한도가 실제 대출 가능액입니다.',
  },
  {
    question: 'DTI, DSR, LTV가 뭐가 다른가요?',
    answer:
      '세 가지 모두 대출 규제 기준입니다. LTV는 담보가치 대비 대출비(%), DTI는 연소득 대비 주담대만의 원리금 비(%), DSR은 연소득 대비 모든 대출의 원리금 비(%)입니다. LTV는 부동산 가격 기준, DTI·DSR은 소득 기준으로 움직입니다. 따라서 같은 집이라도 당신의 소득에 따라 빌릴 수 있는 금액이 달라집니다.',
  },
  {
    question: '규제지역(조정지역, 투기지역)이면 LTV가 더 낮아지나요?',
    answer:
      '네, 정부가 지역을 지정한 조정지역, 투기지역은 일반지역보다 LTV 한도가 낮습니다. 예를 들어 일반지역 70% 한도가 조정지역에서는 60% 이하로 제한될 수 있습니다. 정부 정책에 따라 규제지역 지정이 수시 변동되므로, 특정 지역의 현재 LTV 한도는 금융위 공식 발표나 은행 상담을 통해 확인해야 합니다.',
  },
  {
    question: 'LTV 70% 한도가 있어도 방공제(소액임차보증금)가 있으면 줄어드나요?',
    answer:
      '네, 맞습니다. 예를 들어 주택 담보가치가 5억 원, 기존 보증금 3,000만 원(방공제), LTV 70% 한도 3.5억 원이라면, 실제 대출 가능액은 3.5억 − 3,000만 = 3.2억 원이 됩니다. 기존 담보대출(선순위)도 동일하게 차감되므로, 명목 한도와 실제 한도는 크게 다를 수 있습니다.',
  },
];

export default function LtvCalculation2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: 'LTV 계산법 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: 'LTV 계산법 2026',
    description:
      '담보인정비율(LTV)의 개념, 계산 공식, 대출가능액 역산, DSR·DTI와의 차이, 실제 대출한도 결정 요소를 정리합니다.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['LTV', '담보인정비율', '대출가능액', 'DSR', 'DTI', '주담대'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: 'LTV 계산법 2026 | calculatorhost',
    description:
      '담보인정비율 계산, 대출가능액 역산, DSR·DTI·LTV 차이를 명확히 정리합니다.',
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
                    { name: 'LTV 계산법 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">
                  금융 · 7분 읽기 · 2026-06-24
                </p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  LTV 계산법 2026
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  주택담보대출을 받을 때 꼭 알아야 할 개념이 LTV(담보인정비율)입니다. 많은 사람들이
                  LTV만 보고 대출 가능액을 예상하지만, 실제로는 DSR과 DTI 규제가 더 큰 영향을
                  미칩니다. 이 가이드에서는 LTV의 정의, 계산 방법, 실제 대출한도 결정 방식을
                  명확히 설명합니다.
                </p>
              </header>

              <AdSlot slot="guide-ltv-calculation-top" format="horizontal" />

              <section aria-label="요약" className="card border-l-4 border-l-primary-500">
                <h2 className="mb-2 text-caption uppercase tracking-wider text-primary-500">
                  핵심 요약
                </h2>
                <table className="w-full border-collapse text-sm">
                  <caption className="mb-2 text-left font-semibold text-text-primary">
                    LTV, DTI, DSR 비교표 (2026 기준)
                  </caption>
                  <thead>
                    <tr className="border-b border-border-base">
                      <th scope="col" className="pb-2 pr-3 text-left font-semibold">
                        구분
                      </th>
                      <th scope="col" className="pb-2 text-left font-semibold">
                        정의
                      </th>
                      <th scope="col" className="pb-2 text-left font-semibold">
                        기준값
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-text-secondary">
                    <tr className="border-b border-border-base">
                      <td className="py-2 pr-3 font-semibold">LTV</td>
                      <td>대출금액 ÷ 담보가치</td>
                      <td>일반: 70%, 조정: 60% (예시)</td>
                    </tr>
                    <tr className="border-b border-border-base">
                      <td className="py-2 pr-3 font-semibold">DTI</td>
                      <td>주담대 연원리금 ÷ 연소득</td>
                      <td>60~70% (정책 변동)</td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-3 font-semibold">DSR</td>
                      <td>모든 대출 연원리금 ÷ 연소득</td>
                      <td>40~45% (정책 변동)</td>
                    </tr>
                  </tbody>
                </table>
              </section>

              <section className="space-y-4">
                <h2 className="border-b border-border-base pb-2 text-2xl font-bold">
                  LTV란 뭔가요?
                </h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  LTV(Loan-to-Value, 담보인정비율)는 담보로 제시된 주택의 가치 대비 은행이 빌려주는
                  금액의 비율을 뜻합니다. 즉, 주택을 담보로 최대 몇 퍼센트까지 돈을 빌릴 수
                  있는지를 나타내는 규제 기준입니다.
                </p>
                <p className="text-text-secondary leading-relaxed">
                  <strong>기본 공식은 간단합니다:</strong>
                </p>
                <div className="rounded-lg bg-bg-raised p-4">
                  <p className="font-mono text-sm font-semibold text-text-primary">
                    LTV (%) = (대출금액 ÷ 담보가치) × 100
                  </p>
                  <p className="mt-2 text-xs text-text-tertiary">
                    역산: 대출가능액 = 담보가치 × LTV비율 (%)
                  </p>
                </div>
                <p className="text-text-secondary leading-relaxed">
                  ⚠️ 다만 금융기관마다 담보가치 계산 방식이 다릅니다. KB시세, 감정가, 매매계약가
                  중 어느 것을 기준으로 삼느냐에 따라 같은 집도 담보가치가 1~2억 원 차이날 수
                  있습니다.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="border-b border-border-base pb-2 text-2xl font-bold">
                  대출가능액을 LTV로 역산하는 방법
                </h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  LTV 한도를 알면 대출 가능액을 역산할 수 있습니다. 예를 들어보겠습니다.
                </p>

                <div className="rounded-lg bg-bg-raised p-4">
                  <h3 className="mb-3 font-semibold text-text-primary">계산 사례</h3>
                  <ul className="space-y-3 text-sm text-text-secondary">
                    <li>
                      <strong>시나리오 1: 일반지역, 주택 담보가치 5억 원, LTV 70%</strong>
                      <br />
                      대출가능액 = 5억 × 70% = 3.5억 원
                    </li>
                    <li>
                      <strong>시나리오 2: 조정지역, 주택 담보가치 4억 원, LTV 60%</strong>
                      <br />
                      대출가능액 = 4억 × 60% = 2.4억 원
                    </li>
                    <li>
                      <strong>시나리오 3: 주택 담보가치 3억 원, LTV 80% (우대형)</strong>
                      <br />
                      대출가능액 = 3억 × 80% = 2.4억 원
                    </li>
                  </ul>
                </div>

                <p className="text-text-secondary leading-relaxed">
                  ⚠️ 다만 위는 LTV만 고려한 한도입니다. 실제 대출 시에는 DSR 규제가 이보다 더
                  낮은 한도를 정할 수 있으므로, LTV 한도만으로 확정하지 말고 은행 대출 계산기나
                  상담을 통해 정확한 한도를 확인하세요.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="border-b border-border-base pb-2 text-2xl font-bold">
                  담보가치는 어떻게 결정되나요?
                </h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  같은 주택이라도 담보가치가 기관마다 다를 수 있습니다. 담보가치의 기준은 크게
                  세 가지입니다.
                </p>

                <table className="w-full border-collapse text-sm">
                  <caption className="mb-2 text-left font-semibold text-text-primary">
                    담보가치 결정 기준
                  </caption>
                  <thead>
                    <tr className="border-b border-border-base">
                      <th scope="col" className="pb-2 pr-3 text-left font-semibold">
                        기준
                      </th>
                      <th scope="col" className="pb-2 text-left font-semibold">
                        설명
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-text-secondary">
                    <tr className="border-b border-border-base">
                      <td className="py-2 pr-3">
                        <strong>KB시세</strong>
                      </td>
                      <td>시장 거래 데이터 기반 평가, 가장 객관적</td>
                    </tr>
                    <tr className="border-b border-border-base">
                      <td className="py-2 pr-3">
                        <strong>감정가</strong>
                      </td>
                      <td>감정평가사 의뢰로 조사, 보수적인 경향</td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-3">
                        <strong>매매계약가</strong>
                      </td>
                      <td>실제 거래 계약 가격, 협상 여지 있음</td>
                    </tr>
                  </tbody>
                </table>

                <p className="text-text-secondary leading-relaxed">
                  금융기관은 일반적으로 세 가지 중 <strong>가장 낮은 값</strong>을 선택합니다. 이는
                  대출 부도 위험을 최소화하기 위함입니다. 따라서 같은 집을 여러 은행에 맡겨도
                  담보가치가 다를 수 있으며, 이에 따라 LTV 한도도 달라집니다.
                </p>

                <p className="text-text-secondary leading-relaxed">
                  ⚠️ 다만 시장 상황이 급변하면 담보가치도 수시로 조정됩니다. 특히 경기 침체기에는
                  담보가치가 매입가보다 낮아지는 경우도 있으므로, 대출 신청 시점의 정확한 감정가를
                  확인하는 것이 중요합니다.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="border-b border-border-base pb-2 text-2xl font-bold">
                  LTV, DTI, DSR 세 규제는 어떻게 다른가요?
                </h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  대출 규제는 세 가지 기준이 동시에 적용됩니다. 각각 다른 관점에서 대출 가능액을
                  결정하므로, 이 셋을 모두 이해해야 실제 한도를 파악할 수 있습니다.
                </p>

                <div className="space-y-4">
                  <div className="rounded-lg bg-bg-raised p-4">
                    <h3 className="mb-2 font-semibold text-text-primary">
                      ① LTV (담보 기준)
                    </h3>
                    <p className="text-sm text-text-secondary">
                      <strong>정의</strong>: 주택 담보가치 대비 대출 비율
                    </p>
                    <p className="text-sm text-text-secondary">
                      <strong>공식</strong>: 대출금액 ÷ 담보가치 × 100
                    </p>
                    <p className="text-sm text-text-secondary">
                      <strong>기준값</strong>: 일반지역 70%, 조정지역 60% (예시, 변동 가능)
                    </p>
                    <p className="text-xs text-text-tertiary">
                      집값에만 초점을 맞춘 규제. 당신의 소득은 무관.
                    </p>
                  </div>

                  <div className="rounded-lg bg-bg-raised p-4">
                    <h3 className="mb-2 font-semibold text-text-primary">
                      ② DTI (주담대 소득 기준)
                    </h3>
                    <p className="text-sm text-text-secondary">
                      <strong>정의</strong>: 연소득 대비 주택담보대출 원리금 비율
                    </p>
                    <p className="text-sm text-text-secondary">
                      <strong>공식</strong>: (주담대 월 원리금 × 12) ÷ 연소득 × 100
                    </p>
                    <p className="text-sm text-text-secondary">
                      <strong>기준값</strong>: 60~70% (정책에 따라 변동)
                    </p>
                    <p className="text-xs text-text-tertiary">
                      주담대만 고려. 신용대출·자동차할부 등 다른 대출은 미포함.
                    </p>
                  </div>

                  <div className="rounded-lg bg-bg-raised p-4">
                    <h3 className="mb-2 font-semibold text-text-primary">
                      ③ DSR (모든 대출 소득 기준)
                    </h3>
                    <p className="text-sm text-text-secondary">
                      <strong>정의</strong>: 연소득 대비 모든 대출의 원리금 비율
                    </p>
                    <p className="text-sm text-text-secondary">
                      <strong>공식</strong>: (모든 대출 월 원리금 × 12) ÷ 연소득 × 100
                    </p>
                    <p className="text-sm text-text-secondary">
                      <strong>기준값</strong>: 40~45% (정책에 따라 변동)
                    </p>
                    <p className="text-xs text-text-tertiary">
                      가장 엄격한 규제. 주담대·신용대출·자동차할부 등 모든 대출 포함.
                    </p>
                  </div>
                </div>

                <p className="text-text-secondary leading-relaxed">
                  <strong>실제 대출 한도 결정:</strong> 세 규제 중 가장 낮은 한도가 최종 대출
                  가능액입니다. 예를 들어 LTV 한도 3.5억, DTI 한도 2.8억, DSR 한도 2.3억이라면,
                  실제로는 DSR이 결정하는 2.3억 원까지만 빌릴 수 있습니다.
                </p>

                <p className="text-text-secondary leading-relaxed">
                  ⚠️ 다만 세 기준의 정확한 값은 정부 정책에 따라 자주 변동됩니다. 특히 금리가
                  오를 때나 부동산 시장이 과열될 때 금융위가 DTI·DSR 한도를 강화하므로, 대출 신청
                  시점에 최신 규제를 확인해야 합니다.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="border-b border-border-base pb-2 text-2xl font-bold">
                  LTV 한도만으로는 실제 대출을 예상할 수 없나요?
                </h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  정확합니다. LTV 한도가 충분해도 DSR이나 DTI 때문에 훨씬 낮은 금액만 빌릴 수
                  있습니다. 실제 사례를 봅시다.
                </p>

                <div className="rounded-lg bg-bg-raised p-4">
                  <h3 className="mb-3 font-semibold text-text-primary">
                    실제 케이스: LTV 한도와 DSR 한도 차이
                  </h3>
                  <ul className="space-y-3 text-sm text-text-secondary">
                    <li>
                      <strong>상황</strong>: 주택 담보가치 5억 원, 연소득 5,000만 원, 기존 신용대출
                      5,000만 원
                    </li>
                    <li>
                      <strong>LTV 한도</strong>: 5억 × 70% = 3.5억 원 ✓
                    </li>
                    <li>
                      <strong>DSR 계산</strong>: 연소득의 45% 한도
                      <br />
                      = 5,000만 × 45% = 2,250만 원(연 원리금)
                      <br />
                      이미 신용대출 5,000만 원의 월이자(월 20만 원 가정)가 있으므로,
                      <br />
                      주담대 월 원리금 한도 = (2,250만 − 240만) ÷ 12 ≈ 167.5만 원
                      <br />
                      → 이 경우 주담대로 빌릴 수 있는 금액은 약 3억 원 미만 (LTV 70%보다 훨씬 낮음)
                    </li>
                  </ul>
                </div>

                <p className="text-text-secondary leading-relaxed">
                  위 사례는 극단적이지만 현실에서 흔합니다. DSR 규제가 더 낮기 때문에 LTV 한도만 보고
                  대출 가능액을 예상하면 큰 실수를 할 수 있습니다.
                </p>

                <p className="text-text-secondary leading-relaxed">
                  ⚠️ 다만 위 계산은 이해를 돕기 위한 예시이며, 실제로는 금리 변동, 변동금리 인상률
                  예측, 보증보험료 등이 복합적으로 적용되므로, 정확한 한도는 대출한도 계산기나
                  은행 상담을 통해 확인하세요.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="border-b border-border-base pb-2 text-2xl font-bold">
                  규제지역(조정, 투기)이면 LTV가 더 낮아지나요?
                </h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  네, 정부가 지정한 조정지역과 투기지역은 일반지역보다 LTV 한도가 낮습니다. 이는
                  과열된 부동산 시장을 식히기 위한 정책 규제입니다.
                </p>

                <table className="w-full border-collapse text-sm">
                  <caption className="mb-2 text-left font-semibold text-text-primary">
                    지역별 LTV 한도 예시 (정책 변동 가능)
                  </caption>
                  <thead>
                    <tr className="border-b border-border-base">
                      <th scope="col" className="pb-2 pr-3 text-left font-semibold">
                        지역 구분
                      </th>
                      <th scope="col" className="pb-2 text-left font-semibold">
                        LTV 한도
                      </th>
                      <th scope="col" className="pb-2 text-left font-semibold">
                        비고
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-text-secondary">
                    <tr className="border-b border-border-base">
                      <td className="py-2 pr-3">
                        <strong>일반지역</strong>
                      </td>
                      <td>70% (예시)</td>
                      <td>규제 미지정 지역</td>
                    </tr>
                    <tr className="border-b border-border-base">
                      <td className="py-2 pr-3">
                        <strong>조정지역</strong>
                      </td>
                      <td>60% (예시)</td>
                      <td>정부 조정지역 지정</td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-3">
                        <strong>투기지역</strong>
                      </td>
                      <td>50% 이하 (예시)</td>
                      <td>투기 과열 지역</td>
                    </tr>
                  </tbody>
                </table>

                <p className="text-text-secondary leading-relaxed">
                  조정지역에 지정되면 대출 가능액이 크게 줄어듭니다. 예를 들어 담보가치 5억 원인
                  주택이라면, 일반지역은 3.5억 원(70%)까지 빌릴 수 있지만, 조정지역에서는 3억
                  원(60%)까지만 가능합니다.
                </p>

                <p className="text-text-secondary leading-relaxed">
                  ⚠️ 다만 정부의 지역 지정은 시장 상황에 따라 자주 변동됩니다. 특정 지역의 현재
                  규제 상태와 LTV 한도는 금융위 공식 발표나 은행 상담을 통해 확인해야 하며, 구체적인
                  규제지역 목록은 수시로 변경되므로 항상 최신 정보를 참고하세요.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="border-b border-border-base pb-2 text-2xl font-bold">
                  기존 대출이나 보증금이 있으면 실제 한도가 더 줄어드나요?
                </h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  네, 맞습니다. 기존의 선순위 대출이나 소액임차보증금(방공제)은 담보가치에서 차감되므로
                  실제 대출 가능액이 줄어듭니다.
                </p>

                <div className="rounded-lg bg-bg-raised p-4">
                  <h3 className="mb-3 font-semibold text-text-primary">
                    기존 담보대출이 있는 경우
                  </h3>
                  <p className="text-sm text-text-secondary">
                    <strong>예시</strong>: 주택 담보가치 5억 원, 기존 대출 1억 원(선순위), LTV 70%
                  </p>
                  <p className="text-sm text-text-secondary mt-2">
                    · 명목 한도: 5억 × 70% = 3.5억 원
                  </p>
                  <p className="text-sm text-text-secondary">
                    · 실제 한도: 3.5억 − 1억(선순위 대출) = 2.5억 원 ← 실제 빌릴 수 있는 금액
                  </p>
                </div>

                <div className="rounded-lg bg-bg-raised p-4">
                  <h3 className="mb-3 font-semibold text-text-primary">
                    소액임차보증금(방공제)이 있는 경우
                  </h3>
                  <p className="text-sm text-text-secondary">
                    <strong>예시</strong>: 주택 담보가치 5억 원, 전세 보증금 3,000만 원(선순위), LTV
                    70%
                  </p>
                  <p className="text-sm text-text-secondary mt-2">
                    · 명목 한도: 5억 × 70% = 3.5억 원
                  </p>
                  <p className="text-sm text-text-secondary">
                    · 실제 한도: 3.5억 − 3,000만 = 3.2억 원 ← 실제 빌릴 수 있는 금액
                  </p>
                </div>

                <p className="text-text-secondary leading-relaxed">
                  이러한 감액을 <strong>담보차감</strong>이라고 합니다. 명목상 높은 LTV 한도가 있어도
                  실제로는 훨씬 낮은 금액만 빌릴 수 있으므로, 기존 대출이나 보증금을 모두 파악한 후
                  한도를 계산해야 합니다.
                </p>

                <p className="text-text-secondary leading-relaxed">
                  ⚠️ 다만 방공제(소액임차보증금) 범위는 정부 정책에 따라 변동됩니다. 예를 들어
                  수도권과 비수도권의 범위가 다르므로, 자신의 지역이 해당하는지 확인하고 은행에
                  상담하세요.
                </p>
              </section>

              <AdSlot slot="guide-ltv-calculation-mid" format="rectangle" />

              <FaqSection items={FAQ_ITEMS} />

              <section className="card border-l-2 border-l-danger-500 bg-danger-500/5">
                <h2 className="mb-2 text-lg font-semibold text-danger-700 dark:text-danger-300">
                  ⚠️ 주의사항 및 면책조항
                </h2>
                <ul className="space-y-2 text-sm text-danger-700 dark:text-danger-300">
                  <li>
                    • 본 가이드는 일반 금융 정보 제공 목적이며, 특정 금융기관의 실제 대출
                    규정을 보장하지 않습니다.
                  </li>
                  <li>
                    • LTV·DTI·DSR 한도는 <strong>정부 정책에 따라 수시 변동</strong>되므로, 대출 신청
                    시점에 금융위 공식 발표나 해당 은행의 최신 기준을 반드시 확인하세요.
                  </li>
                  <li>
                    • 규제지역(조정지역, 투기지역) 지정도 수시로 변경되며, 지역별 LTV 한도가
                    상이합니다.
                  </li>
                  <li>
                    • 실제 대출 가능액은 담보가치 평가, 신용도, 기존 대출 현황, 금리 환경 등 다양한
                    요소에 영향을 받으므로, 정확한 한도 조회는 은행 상담이나 대출한도 계산기를
                    이용하세요.
                  </li>
                  <li>
                    • 본 사이트는 금융상품 권유를 하지 않으며, 모든 대출 결정은 본인 책임입니다.
                  </li>
                </ul>
              </section>

              <section aria-label="관련 도구" className="card">
                <h2 className="mb-3 text-lg font-semibold">관련 계산기 및 가이드</h2>
                <ul className="space-y-2 text-sm">
                  <li>
                    →{' '}
                    <Link
                      href="/calculator/loan-limit/"
                      className="text-primary-600 underline dark:text-primary-500"
                    >
                      대출한도 계산기 (DSR/LTV/DTI)
                    </Link>{' '}
                    — 주담대·전세자금대출 최대 한도 실시간 확인
                  </li>
                  <li>
                    →{' '}
                    <Link
                      href="/calculator/loan/"
                      className="text-primary-600 underline dark:text-primary-500"
                    >
                      대출이자 계산기
                    </Link>{' '}
                    — 원리금균등·만기일시별 월 상환액 및 총이자
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
                      href="/guide/dsr-regulation-zones/"
                      className="text-primary-600 underline dark:text-primary-500"
                    >
                      조정지역·투기지역 DSR 규제 2026
                    </Link>{' '}
                    — 지역별 LTV·DTI·DSR 한도 정리
                  </li>
                  <li>
                    →{' '}
                    <Link
                      href="/guide/interest-rate-hike-dsr-loan-limit-july-2026/"
                      className="text-primary-600 underline dark:text-primary-500"
                    >
                      기준금리 오르면 대출한도 줄어들까? 2026
                    </Link>{' '}
                    — 금리 인상 시 LTV·DSR·DTI 영향 분석
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
                    href="https://www.fss.or.kr/"
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="text-primary-600 underline dark:text-primary-500"
                  >
                    금융감독원 공시
                  </a>
                  ,{' '}
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
                    href="https://www.moef.go.kr/"
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="text-primary-600 underline dark:text-primary-500"
                  >
                    기획재정부
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
