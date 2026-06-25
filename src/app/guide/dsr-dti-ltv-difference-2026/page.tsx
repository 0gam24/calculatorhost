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

const URL = 'https://calculatorhost.com/guide/dsr-dti-ltv-difference-2026/';
const DATE_PUBLISHED = '2026-06-25';
const DATE_MODIFIED = '2026-06-25';

export const metadata: Metadata = {
  title: 'DSR·DTI·LTV 차이와 계산법 2026 — 헷갈리는 대출 3대 지표 정리',
  description:
    'DSR·DTI·LTV 세 대출 규제 지표의 정의와 차이를 명확히 정리합니다. 각 지표 계산 공식, 한도 기준, 실제 대출한도 결정 방식을 사례로 설명. 2026년 기준 최신 정보.',
  keywords: [
    'DSR DTI LTV 차이',
    'DSR 계산',
    'DTI 계산',
    'LTV 계산',
    'DSR 한도',
    'DTI 한도',
    '대출 규제',
    '주담대',
    '주택담보대출',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [
      {
        url: '/og-default.png',
        width: 1200,
        height: 630,
        alt: 'DSR·DTI·LTV 차이와 계산법 2026',
      },
    ],
    title: 'DSR·DTI·LTV 차이와 계산법 2026',
    description: '대출 예정자가 반드시 알아야 할 LTV, DTI, DSR의 개념과 실제 한도 결정 방식.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DSR·DTI·LTV 차이와 계산법 2026',
    description: '헷갈리는 대출 3대 지표의 정의, 공식, 한도, 차이점을 한 페이지에 정리.',
  },
};

const FAQ_ITEMS = [
  {
    question: 'DSR, DTI, LTV 중 가장 엄격한 규제는?',
    answer:
      'DSR이 가장 엄격합니다. 모든 대출의 원리금을 포함하므로 한도가 가장 낮습니다. 주담대만 보는 DTI보다 보수적이고, 담보가치만 보는 LTV와는 관점 자체가 다릅니다. 세 규제 중 가장 낮은 한도가 최종 대출 가능액을 결정합니다.',
  },
  {
    question: '연소득 5,000만 원이면 DSR 45% 기준 최대 몇 원까지 대출 가능한가요?',
    answer:
      '연 상환액 한도는 2,250만 원(5,000만 × 45%)입니다. 다만 기존 대출이 없다면, 월 원리금으로 환산하면 약 187.5만 원입니다. 금리와 대출 기간에 따라 실제 빌릴 수 있는 금액이 달라지므로, 대출한도 계산기를 통해 정확히 확인하세요.',
  },
  {
    question: 'LTV는 왜 필요한가요? 소득 기준인 DSR이면 충분하지 않나요?',
    answer:
      'LTV는 담보 가치를 기준으로 은행의 손실 위험을 제한합니다. 만약 LTV가 없으면 담보가 30억 원인데도 무제한 빌릴 수 있는 위험이 생깁니다. LTV와 DSR이 함께 작용하여 은행의 리스크를 제어하고 차용인의 과다 부채를 방지합니다.',
  },
  {
    question: 'DTI와 DSR의 가장 큰 차이는?',
    answer:
      'DTI는 주택담보대출만 본인의 원리금으로 계산하고 기타 대출은 이자만 포함합니다. DSR은 모든 대출(주담대, 신용대출, 자동차할부 등)의 원리금을 전부 포함합니다. 따라서 다른 대출이 많을수록 DSR이 DTI보다 훨씬 높아져 한도가 낮아집니다.',
  },
  {
    question: '규제지역(조정지역)이면 DSR도 낮아지나요?',
    answer:
      '아니오. 조정지역에서 낮아지는 것은 LTV입니다. DSR은 지역과 무관하게 정부 정책에 따라 일괄 적용됩니다. 다만 LTV가 낮아지면 담보가치 기준 한도가 줄어들어 간접적으로 대출 가능액이 감소합니다.',
  },
  {
    question: '기존 신용대출 5,000만 원이 있으면 DSR 한도가 얼마나 줄어드나요?',
    answer:
      '신용대출 5,000만 원의 월 원리금 상환액에 따라 다릅니다. 예를 들어 월 100만 원씩 상환한다면 연 1,200만 원이 DSR 한도에 차감됩니다. 정확한 영향은 해당 신용대출의 금리, 상환 기간, 현재 잔액에 따라 달라지므로 은행에 확인하세요.',
  },
  {
    question: '스트레스 DSR(보수적 DSR)이 뭔가요?',
    answer:
      '스트레스 DSR은 미래 금리 인상을 대비해 가산금리를 미리 더해서 계산하는 방식입니다. 예를 들어 현재 금리가 4%인데, 2% 가산금리를 더해 6%를 기준으로 한도를 산정하는 것입니다. 금리가 오를 때 도입되며, 금융기관과 시기에 따라 가산금리가 다릅니다.',
  },
];

export default function DsrDtiLtvDifference2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: 'DSR·DTI·LTV 차이와 계산법 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: 'DSR·DTI·LTV 차이와 계산법 2026',
    description:
      '대출 규제의 세 핵심 지표 DSR, DTI, LTV의 정의, 공식, 한도, 차이점을 명확히 정리합니다.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['DSR', 'DTI', 'LTV', '대출 규제', '대출한도', '주담대'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: 'DSR·DTI·LTV 차이와 계산법 2026 | calculatorhost',
    description:
      'DSR, DTI, LTV 세 대출 규제 지표의 개념, 공식, 한도, 실제 적용 사례를 명확히 정리합니다.',
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
                    { name: 'DSR·DTI·LTV 차이와 계산법 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">
                  대출 예정자 · 8분 읽기 · 2026-06-25
                </p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  DSR·DTI·LTV 차이와 계산법 2026
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  주택담보대출을 받을 때 나오는 세 개의 규제 지표 DSR, DTI, LTV. 이 셋을 제대로
                  이해하지 못하면 대출 가능액을 잘못 예상할 수 있습니다. 이 가이드에서는 세 지표의
                  정의, 계산 공식, 기준 한도, 그리고 실제 어떻게 대출을 결정하는지 명확히
                  설명합니다.
                </p>
              </header>

              <AdSlot slot="guide-dsr-dti-ltv-top" format="horizontal" />

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
                        지표
                      </th>
                      <th scope="col" className="pb-2 pr-3 text-left font-semibold">
                        공식
                      </th>
                      <th scope="col" className="pb-2 text-left font-semibold">
                        기준 한도
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-text-secondary">
                    <tr className="border-b border-border-base">
                      <td className="py-2 pr-3 font-semibold">LTV</td>
                      <td className="py-2 pr-3 text-xs">
                        대출금액 ÷ 담보가치 × 100
                      </td>
                      <td className="py-2">
                        일반: 70%, 조정: 60% (예시)
                      </td>
                    </tr>
                    <tr className="border-b border-border-base">
                      <td className="py-2 pr-3 font-semibold">DTI</td>
                      <td className="py-2 pr-3 text-xs">
                        주담대 연원리금 ÷ 연소득 × 100
                      </td>
                      <td className="py-2">
                        60~70% (정책 변동)
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-3 font-semibold">DSR</td>
                      <td className="py-2 pr-3 text-xs">
                        모든 대출 연원리금 ÷ 연소득 × 100
                      </td>
                      <td className="py-2">
                        40~45% (정책 변동)
                      </td>
                    </tr>
                  </tbody>
                </table>
              </section>

              <section className="space-y-4">
                <h2 className="border-b border-border-base pb-2 text-2xl font-bold">
                  세 지표는 왜 필요한가요?
                </h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  은행은 대출을 줄 때 여러 각도에서 위험을 평가합니다. LTV는 담보 가치 관점, DTI와
                  DSR은 소득 관점에서 차용인의 상환 능력을 봅니다. 세 규제가 동시에 작용하면서 대출
                  부실을 방지합니다.
                </p>
                <div className="rounded-lg bg-bg-raised p-4">
                  <p className="text-sm text-text-secondary">
                    <strong>정책 관점:</strong> LTV는 부동산 가격 안정, DTI·DSR은 가계 부채 관리가
                    목표입니다. 따라서 경기 침체기에는 LTV를 높이고 부동산 과열기에는 LTV를 낮추거나
                    DSR을 강화하는 식으로 조정됩니다.
                  </p>
                </div>
                <p className="text-text-secondary leading-relaxed">
                  ⚠️ 다만 세 규제의 구체적 한도는 정부 정책과 금융기관 자율 기준에 따라 수시로
                  변동되므로, 현재 기준은 금융위 공식 발표나 해당 은행의 상담으로 최신 정보를 확인해야
                  합니다.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="border-b border-border-base pb-2 text-2xl font-bold">
                  LTV란 무엇인가요?
                </h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  LTV(Loan-to-Value, 담보인정비율)는 주택 담보가치 대비 대출 비율을 뜻합니다. 담보
                  자체의 가치만 봅니다.
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
                  <strong>예시:</strong> 주택 담보가치 5억 원, LTV 70% → 최대 3.5억 원까지 대출 가능
                  (담보 기준)
                </p>
                <p className="text-text-secondary leading-relaxed">
                  ⚠️ 다만 금융기관마다 담보가치 계산 기준이 다릅니다. KB시세, 감정가, 매매계약가 중
                  가장 낮은 값을 선택하므로, 같은 집도 은행별로 담보가치가 1~2억 원 차이날 수 있습니다.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="border-b border-border-base pb-2 text-2xl font-bold">
                  DTI란 무엇인가요?
                </h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  DTI(Debt-to-Income Ratio, 총부채상환비율)는 연소득 대비 주택담보대출의 원리금
                  비율입니다. 주담대만 봅니다.
                </p>
                <div className="rounded-lg bg-bg-raised p-4">
                  <p className="font-mono text-sm font-semibold text-text-primary">
                    DTI (%) = (주담대 연 원리금상환액) ÷ 연소득 × 100
                  </p>
                  <p className="mt-2 text-xs text-text-tertiary">
                    기타 대출(신용대출, 자동차할부)의 이자만 포함, 원금은 미포함
                  </p>
                </div>
                <p className="text-text-secondary leading-relaxed">
                  <strong>예시:</strong> 연소득 6,000만 원, 주담대 월 150만 원 상환 → DTI =
                  (150만 × 12) ÷ 6,000만 × 100 = 30%
                </p>
                <p className="text-text-secondary leading-relaxed">
                  ⚠️ 다만 DTI는 주담대만 정확히 계산하고 기타 대출은 이자만 봅니다. 신용대출이 크면
                  DSR이 더 제한적이 될 수 있습니다.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="border-b border-border-base pb-2 text-2xl font-bold">
                  DSR이란 무엇인가요?
                </h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  DSR(Debt Service Ratio, 총부채원리금상환비율)은 연소득 대비 모든 대출의 원리금
                  비율입니다. 주담대, 신용대출, 자동차할부 등 모든 대출의 원금과 이자를 포함하므로
                  가장 보수적인 규제입니다.
                </p>
                <div className="rounded-lg bg-bg-raised p-4">
                  <p className="font-mono text-sm font-semibold text-text-primary">
                    DSR (%) = (모든 대출 연 원리금상환액 합계) ÷ 연소득 × 100
                  </p>
                  <p className="mt-2 text-xs text-text-tertiary">
                    주담대 + 신용대출 + 자동차할부 + 기타 모든 대출의 원리금 전부 포함
                  </p>
                </div>
                <p className="text-text-secondary leading-relaxed">
                  <strong>예시:</strong> 연소득 6,000만 원, 주담대 월 150만 원 + 신용대출 월 50만
                  원 → DSR = ((150+50)만 × 12) ÷ 6,000만 × 100 = 40%
                </p>
                <p className="text-text-secondary leading-relaxed">
                  ⚠️ 다만 기타 대출이 많을수록 DSR이 높아져 주담대 한도가 급격히 낮아질 수 있습니다.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="border-b border-border-base pb-2 text-2xl font-bold">
                  세 지표가 실제로 어떻게 작용하는가?
                </h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  세 규제는 독립적으로 작동합니다. 대출 가능액은 세 규제 중 가장 낮은 한도로 결정됩니다.
                </p>

                <div className="rounded-lg bg-bg-raised p-4">
                  <h3 className="mb-3 font-semibold text-text-primary">실제 계산 사례</h3>
                  <ul className="space-y-3 text-sm text-text-secondary">
                    <li>
                      <strong>상황:</strong>
                      <br />
                      · 주택 담보가치: 5억 원
                      <br />
                      · 연소득: 6,000만 원
                      <br />
                      · 기존 신용대출: 5,000만 원 (월 100만 원 상환 중, 월 이자 20만 원)
                      <br />
                      · 현재 LTV 규제: 70% / DTI: 60% / DSR: 45%
                    </li>
                    <li>
                      <strong>LTV 한도:</strong>
                      <br />
                      5억 × 70% = 3.5억 원
                    </li>
                    <li>
                      <strong>DTI 한도:</strong>
                      <br />
                      연소득의 60% = 6,000만 × 60% = 3,600만 원(주담대 원리금 + 기타대출 이자 한도)
                      <br />
                      · 기존 신용대출 이자: 연 240만 원(월 20만)
                      <br />
                      · 주담대 연 원리금 한도 = 3,600만 − 240만 = 3,360만 원 → 월 280만 원
                      <br />
                      → 금리 4%·30년 원리금균등 가정 역산 시 약 5.9억 원
                    </li>
                    <li>
                      <strong>DSR 한도:</strong>
                      <br />
                      연소득의 45% = 6,000만 × 45% = 2,700만 원(모든 대출 연 원리금)
                      <br />
                      · 기존 신용대출: 월 100만(원금) + 월 20만(이자) = 월 120만 원 = 연 1,440만 원
                      <br />
                      · 주담대 한도 = 2,700만 − 1,440만 = 1,260만 원(연 원리금)
                      <br />
                      → 월 상환 한도 = 1,260만 ÷ 12 = 105만 원
                      <br />
                      → 금리 4%·30년 원리금균등 가정 역산 시 약 2.2억 원
                    </li>
                    <li>
                      <strong>최종 대출 가능액: 약 2.2억 원</strong> (LTV 3.5억·DTI 5.9억보다 낮은 DSR이 결정)
                    </li>
                  </ul>
                </div>

                <p className="text-text-secondary leading-relaxed">
                  위 예시에서 LTV 한도는 3.5억 원이지만, 기존 신용대출 때문에 DSR 한도가 약 2.2억
                  원으로 가장 낮아 실제 주담대 한도는 약 2.2억 원이 됩니다. 이렇게 세 규제 중 가장
                  낮은 한도가 최종 결정값입니다.
                </p>

                <p className="text-text-secondary leading-relaxed">
                  ⚠️ 다만 위 계산은 이해를 돕기 위한 예시입니다. 실제로는 금리 변동, 신용도, 보증보험료,
                  기존 대출의 정확한 상환액 등이 복합적으로 적용되므로, 정확한 한도는 대출한도 계산기나
                  은행 상담을 통해 확인하세요.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="border-b border-border-base pb-2 text-2xl font-bold">
                  DTI와 DSR의 차이는 무엇인가요?
                </h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  DTI와 DSR의 가장 큰 차이는 포함 범위입니다. DTI는 주담대와 기타 대출의 이자만,
                  DSR은 모든 대출의 원리금 전부를 봅니다.
                </p>

                <table className="w-full border-collapse text-sm">
                  <caption className="mb-2 text-left font-semibold text-text-primary">
                    DTI vs DSR 비교
                  </caption>
                  <thead>
                    <tr className="border-b border-border-base">
                      <th scope="col" className="pb-2 pr-3 text-left font-semibold">
                        항목
                      </th>
                      <th scope="col" className="pb-2 pr-3 text-left font-semibold">
                        DTI
                      </th>
                      <th scope="col" className="pb-2 text-left font-semibold">
                        DSR
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-text-secondary">
                    <tr className="border-b border-border-base">
                      <td className="py-2 pr-3">
                        <strong>주담대</strong>
                      </td>
                      <td className="py-2 pr-3">원리금 전부</td>
                      <td className="py-2">원리금 전부</td>
                    </tr>
                    <tr className="border-b border-border-base">
                      <td className="py-2 pr-3">
                        <strong>신용대출</strong>
                      </td>
                      <td className="py-2 pr-3">이자만 포함</td>
                      <td className="py-2">원리금 전부</td>
                    </tr>
                    <tr className="border-b border-border-base">
                      <td className="py-2 pr-3">
                        <strong>자동차할부</strong>
                      </td>
                      <td className="py-2 pr-3">이자만 포함</td>
                      <td className="py-2">원리금 전부</td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-3">
                        <strong>결과</strong>
                      </td>
                      <td className="py-2 pr-3">한도가 더 높음</td>
                      <td className="py-2">한도가 더 낮음 (보수적)</td>
                    </tr>
                  </tbody>
                </table>

                <p className="text-text-secondary leading-relaxed">
                  신용대출 5,000만 원이 있다면, DTI는 이자만(약 연 200만 원) 계산하지만, DSR은
                  원금과 이자를 전부(연 1,200만 원 이상) 계산합니다. 기타 대출이 많을수록 DSR이
                  DTI보다 훨씬 높아집니다.
                </p>

                <p className="text-text-secondary leading-relaxed">
                  ⚠️ 다만 DSR은 기타 대출의 원금을 모두 포함하므로, 신용대출을 먼저 상환하고 주담대를
                  신청하는 것이 유리합니다.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="border-b border-border-base pb-2 text-2xl font-bold">
                  규제지역(조정지역)이면 세 지표가 모두 낮아지나요?
                </h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  아니요. LTV만 낮아집니다. DTI와 DSR은 지역과 무관하게 정부 정책에 따라 일괄 적용됩니다.
                </p>

                <div className="rounded-lg bg-bg-raised p-4">
                  <h3 className="mb-3 font-semibold text-text-primary">지역별 한도 영향</h3>
                  <ul className="space-y-2 text-sm text-text-secondary">
                    <li>
                      <strong>일반지역:</strong> LTV 70%, DTI 60%, DSR 45%
                    </li>
                    <li>
                      <strong>조정지역:</strong> LTV 60%, DTI 60%, DSR 45%
                    </li>
                    <li>
                      <strong>→ 차이:</strong> LTV만 10%p 낮아짐
                    </li>
                  </ul>
                </div>

                <p className="text-text-secondary leading-relaxed">
                  다만 LTV가 낮아지면 담보가치 기준 한도가 줄어들므로, 간접적으로 대출 가능액이 감소합니다.
                </p>

                <p className="text-text-secondary leading-relaxed">
                  ⚠️ 다만 정부가 지역을 지정하거나 해제할 때마다 LTV 한도가 변동되므로, 특정 지역의
                  현재 규제 상태는 금융위 공식 발표나 은행 상담으로 확인해야 합니다.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="border-b border-border-base pb-2 text-2xl font-bold">
                  스트레스 DSR이란 무엇인가요?
                </h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  스트레스 DSR은 미래 금리 인상을 대비해 현재 금리에 가산금리를 더한 상태에서 한도를
                  계산하는 방식입니다. 금리가 오를 것으로 예상될 때 도입되어 차용인의 과다 부채를
                  방지합니다.
                </p>

                <div className="rounded-lg bg-bg-raised p-4">
                  <h3 className="mb-3 font-semibold text-text-primary">예시</h3>
                  <ul className="space-y-2 text-sm text-text-secondary">
                    <li>
                      <strong>일반 DSR 계산:</strong> 현재 금리 4%로 한도 산정
                    </li>
                    <li>
                      <strong>스트레스 DSR 계산:</strong> 현재 금리 4% + 가산금리 2% = 6%로 한도 산정
                    </li>
                    <li>
                      <strong>→ 결과:</strong> 스트레스 DSR이 훨씬 보수적이므로 한도가 낮음
                    </li>
                  </ul>
                </div>

                <p className="text-text-secondary leading-relaxed">
                  스트레스 DSR의 가산금리는 금융기관과 정책 시기에 따라 다릅니다. 구체적 가산금리를 은행에
                  문의하세요.
                </p>

                <p className="text-text-secondary leading-relaxed">
                  ⚠️ 다만 스트레스 DSR은 선택적으로 적용하는 금융기관도 있고 필수적으로 적용하는 기관도
                  있으므로, 현재 기준은 해당 은행에 확인하세요.
                </p>
              </section>

              <AdSlot slot="guide-dsr-dti-ltv-mid" format="rectangle" />

              <FaqSection items={FAQ_ITEMS} />

              <section className="card border-l-2 border-l-danger-500 bg-danger-500/5">
                <h2 className="mb-2 text-lg font-semibold text-danger-700 dark:text-danger-300">
                  ⚠️ 주의사항 및 면책조항
                </h2>
                <ul className="space-y-2 text-sm text-danger-700 dark:text-danger-300">
                  <li>
                    • 본 가이드는 일반 금융 정보 제공 목적이며, 특정 금융기관의 실제 규정을
                    보장하지 않습니다.
                  </li>
                  <li>
                    • DSR, DTI, LTV 한도는 <strong>정부 정책에 따라 수시 변동</strong>되므로, 대출
                    신청 시점에 금융위 공식 발표나 해당 은행의 최신 기준을 반드시 확인하세요.
                  </li>
                  <li>
                    • 실제 대출 가능액은 담보가치 평가, 신용도, 기존 대출 현황, 금리 환경, 소득 증빙
                    등 다양한 요소에 영향을 받습니다.
                  </li>
                  <li>
                    • 정확한 한도 조회는 은행 상담이나 대출한도 계산기를 이용하세요.
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
                      href="/guide/ltv-calculation-2026/"
                      className="text-primary-600 underline dark:text-primary-500"
                    >
                      LTV 계산법 2026
                    </Link>{' '}
                    — 담보인정비율의 정의, 공식, 대출가능액 역산
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
                    href="https://www.fsc.go.kr/"
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="text-primary-600 underline dark:text-primary-500"
                  >
                    금융위원회
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
                  ,{' '}
                  <a
                    href="https://www.bok.or.kr/"
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="text-primary-600 underline dark:text-primary-500"
                  >
                    한국은행
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
