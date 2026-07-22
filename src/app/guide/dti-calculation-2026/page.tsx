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

const URL = 'https://calculatorhost.com/guide/dti-calculation-2026/';
const DATE_PUBLISHED = '2026-06-29';
const DATE_MODIFIED = '2026-06-29';

export const metadata: Metadata = {
  title: 'DTI 계산법 2026 — 주택담보대출 총부채상환비율·연소득 기준 한도',
  description:
    'DTI(총부채상환비율) 계산법을 명확히 정리합니다. 주담대 원리금 공식, 연소득 산정, 기타 대출 이자 포함, 연소득 대비 한도 계산, DSR과의 차이를 사례로 설명. 2026년 기준.',
  keywords: [
    'DTI 계산',
    '총부채상환비율',
    '주택담보대출 한도',
    'DTI DSR 차이',
    '연소득 기준 대출',
    '주담대 원리금',
    '대출 규제',
    '금리 인상',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [
      {
        url: '/og-default.png',
        width: 1200,
        height: 630,
        alt: 'DTI 계산법 2026 — 총부채상환비율·연소득 기준 대출한도',
      },
    ],
    title: 'DTI 계산법 2026',
    description: '주택담보대출 한도를 결정하는 DTI의 정의, 공식, 한도, 계산 방법을 정리합니다.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DTI 계산법 2026',
    description: '총부채상환비율 DTI의 의미, 계산 공식, 실제 대출한도 결정 방식',
  },
};

const FAQ_ITEMS = [
  {
    question: 'DTI가 뭔가요?',
    answer:
      'DTI(Debt-to-Income Ratio, 총부채상환비율)는 당신의 연소득에 대해 주택담보대출의 원리금 상환액이 차지하는 비율을 뜻합니다. 은행이 당신의 소득 수준에서 감당할 수 있는 주담대의 최대 규모를 결정하는 규제 지표입니다.',
  },
  {
    question: '연소득 6,000만 원, DTI 60% 기준이면 얼마까지 빌릴 수 있나요?',
    answer:
      '연소득의 60%는 3,600만 원입니다. 다만 이것은 주담대 원리금 + 기타 대출 이자의 한도입니다. 실제 대출 가능액은 금리와 상환 기간에 따라 달라집니다. 대출한도 계산기에서 정확히 확인하세요.',
  },
  {
    question: 'DTI와 DSR의 가장 큰 차이는?',
    answer:
      'DTI는 주담대의 원리금 + 기타 대출의 이자만 봅니다. DSR은 모든 대출(주담대, 신용대출, 자동차할부)의 원리금을 전부 봅니다. 따라서 다른 대출이 많을수록 DSR이 더 제한적입니다.',
  },
  {
    question: '신용대출 5,000만 원이 있으면 DTI 한도가 얼마나 줄어드나요?',
    answer:
      '신용대출 5,000만 원의 월 이자에 따라 다릅니다. 예를 들어 월 이자가 20만 원이면 연 240만 원이 DTI 한도에서 차감됩니다. 정확한 영향은 대출의 금리, 잔액, 상환 기간에 따라 달라집니다.',
  },
  {
    question: 'DTI 규제 한도가 60%라고 했는데, 정말 그만큼 빌릴 수 있나요?',
    answer:
      '아니요. DTI 60% 한도는 소득 기준 최대이지만, 실제 대출은 LTV(담보 기준)와 DSR(모든 대출 기준)도 함께 적용됩니다. 세 규제 중 가장 낮은 한도가 실제 대출 가능액입니다.',
  },
  {
    question: 'DTI는 언제 DSR 대신 적용되나요?',
    answer:
      'DTI와 DSR은 동시에 적용되는 독립적인 규제입니다. 은행은 두 기준을 모두 확인하고, 더 낮은 한도로 대출 가능액을 결정합니다. "DTI 대신" 적용되는 것이 아니라 "DTI와 DSR 중 더 낮은 것"이 적용됩니다.',
  },
  {
    question: '기타 대출이 없으면 DTI와 DSR이 같나요?',
    answer:
      '기타 대출이 전혀 없으면 두 수치가 같아집니다. DTI는 주담대 원리금에 기타 대출의 이자를 더하고, DSR은 모든 대출의 원리금을 합산하는데, 기타 대출이 없으면 양쪽 모두 주담대 원리금만 남기 때문입니다. 다만 기타 대출이 하나라도 있으면 정의 차이로 수치가 벌어집니다.',
  },
  {
    question: 'DTI 규제는 어떻게 변동되나요?',
    answer:
      'DTI 규제 한도(예: 60%, 70%)는 금리 환경, 부동산 시장, 가계 부채 상황에 따라 금융위원회가 수시로 변경합니다. 대출 신청 시점의 최신 한도를 금융위 공식 발표나 은행 상담으로 반드시 확인하세요.',
  },
];

export default function DtiCalculation2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: 'DTI 계산법 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: 'DTI 계산법 2026',
    description:
      'DTI(총부채상환비율)의 정의, 계산 공식, 연소득 기준 한도, 기타 대출 이자 포함, 실제 대출한도 결정 방식을 정리합니다.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['DTI', '총부채상환비율', '주담대', '연소득', '대출한도', '대출 규제'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: 'DTI 계산법 2026 | calculatorhost',
    description:
      'DTI 계산, 주담대 원리금, 연소득 산정, 기타 대출 이자, DSR·LTV와의 차이를 명확히 정리합니다.',
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
                    { name: 'DTI 계산법 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">
                  금융 · 8분 읽기 · 2026-06-29
                </p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  DTI 계산법 2026
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  주택담보대출을 받을 때 반드시 알아야 할 핵심 지표가 DTI(총부채상환비율)입니다.
                  많은 사람들이 DTI만 보고 대출 가능액을 예상하지만, 실제로는 LTV, DSR 등 여러
                  규제가 함께 작용합니다. 이 가이드에서는 DTI의 정의, 계산 공식, 연소득 산정 방법,
                  그리고 실제 대출한도가 어떻게 결정되는지 명확히 설명합니다.
                </p>
              </header>

              <AdSlot slot="guide-dti-calculation-top" format="horizontal" />

              <section aria-label="요약" className="card border-l-4 border-l-primary-500">
                <h2 className="mb-2 text-caption uppercase tracking-wider text-primary-500">
                  핵심 요약
                </h2>
                <table className="w-full border-collapse text-sm">
                  <caption className="mb-2 text-left font-semibold text-text-primary">
                    DTI 계산의 핵심 요소 (2026 기준)
                  </caption>
                  <thead>
                    <tr className="border-b border-border-base">
                      <th scope="col" className="pb-2 pr-3 text-left font-semibold">
                        항목
                      </th>
                      <th scope="col" className="pb-2 text-left font-semibold">
                        설명
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-text-secondary">
                    <tr className="border-b border-border-base">
                      <td className="py-2 pr-3 font-semibold">정의</td>
                      <td>주담대 원리금 + 기타 대출 이자 ÷ 연소득 × 100</td>
                    </tr>
                    <tr className="border-b border-border-base">
                      <td className="py-2 pr-3 font-semibold">기준 한도</td>
                      <td>통상 60~70% (정책 변동)</td>
                    </tr>
                    <tr className="border-b border-border-base">
                      <td className="py-2 pr-3 font-semibold">포함 범위</td>
                      <td>주담대 전체 원리금, 기타 대출은 이자만</td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-3 font-semibold">적용 조건</td>
                      <td>LTV, DSR과 동시 적용 → 세 규제 중 가장 낮은 한도 적용</td>
                    </tr>
                  </tbody>
                </table>
              </section>

              <section className="space-y-4">
                <h2 className="border-b border-border-base pb-2 text-2xl font-bold">
                  DTI란 무엇인가요?
                </h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  DTI(Debt-to-Income Ratio, 총부채상환비율)는 당신의 연소득에 대해 주택담보대출의
                  원리금 상환액이 몇 퍼센트를 차지하는지를 나타내는 규제 지표입니다. 은행이 당신의
                  소득 수준을 기준으로 주담대의 최대 규모를 결정할 때 사용됩니다.
                </p>
                <p className="text-text-secondary leading-relaxed">
                  <strong>기본 공식은 다음과 같습니다:</strong>
                </p>
                <div className="rounded-lg bg-bg-raised p-4">
                  <p className="font-mono text-sm font-semibold text-text-primary">
                    DTI (%) = (주담대 연 원리금상환액 + 기타 대출 연 이자) ÷ 연소득 × 100
                  </p>
                  <p className="mt-2 text-xs text-text-tertiary">
                    역산: 주담대 월 상환액 한도 = (연소득 × DTI% - 기타 대출 연 이자) ÷ 12
                  </p>
                </div>
                <p className="text-text-secondary leading-relaxed">
                  다만 DTI 계산에서 중요한 점은 주담대는 원금과 이자를 모두 포함하지만, 신용대출,
                  자동차할부 등 기타 대출은 이자만 포함한다는 것입니다. 이것이 DSR과의 가장 큰
                  차이입니다.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="border-b border-border-base pb-2 text-2xl font-bold">
                  DTI 계산 공식을 이해하기
                </h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  DTI 계산은 세 단계로 나뉩니다. 먼저 주담대의 월 원리금과 기타 대출의 월 이자를
                  파악하고, 이를 연 기준으로 환산한 후, 연소득으로 나누어 백분율을 구합니다.
                </p>

                <div className="rounded-lg bg-bg-raised p-4">
                  <h3 className="mb-3 font-semibold text-text-primary">계산 단계별 구체적 예시</h3>
                  <ul className="space-y-4 text-sm text-text-secondary">
                    <li>
                      <strong>① 주담대 월 원리금 결정</strong>
                      <br />
                      예: 3억 원을 4% 금리, 30년 원리금균등으로 대출 시 월 원리금 약 143만 원
                    </li>
                    <li>
                      <strong>② 기타 대출 월 이자 파악</strong>
                      <br />
                      신용대출 5,000만 원, 월 이자 약 20만 원(연 240만 원, 금리·잔액에 따라 변동)
                    </li>
                    <li>
                      <strong>③ 연 기준으로 환산</strong>
                      <br />
                      주담대 연 원리금 = 143만 × 12 = 1,716만 원
                      <br />
                      기타 대출 연 이자 = 20만 × 12 = 240만 원
                    </li>
                    <li>
                      <strong>④ DTI 계산</strong>
                      <br />
                      연소득 6,000만 원 기준
                      <br />
                      DTI = (1,716만 + 240만) ÷ 6,000만 × 100 = 32.6%
                    </li>
                  </ul>
                </div>

                <p className="text-text-secondary leading-relaxed">
                  위 사례에서 DTI는 32.6%로, 일반적인 60% 한도(연소득의 60%)를 충분히 만족합니다.
                  다만 실제 대출 가능액은 금리 변동, 보증보험료, LTV·DSR 규제 등을 종합 고려해야
                  합니다.
                </p>

                <p className="text-text-secondary leading-relaxed">
                  다만 위 계산은 단순 이해를 위한 예시입니다. 실제 원리금은 금리, 상환 기간,
                  변동금리 인상률 등에 따라 달라지며, 대출한도 계산기나 은행 상담을 통해 정확한
                  한도를 확인하세요.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="border-b border-border-base pb-2 text-2xl font-bold">
                  연소득은 어떻게 산정하나요?
                </h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  DTI 계산에서 사용하는 연소득은 직업 형태에 따라 다르게 산정됩니다. 근로소득,
                  사업소득, 임차수익, 배당금 등 모든 소득을 포함해야 하므로, 정확한 소득 증빙이
                  필수입니다.
                </p>

                <table className="w-full border-collapse text-sm">
                  <caption className="mb-2 text-left font-semibold text-text-primary">
                    직업별 연소득 산정 방법
                  </caption>
                  <thead>
                    <tr className="border-b border-border-base">
                      <th scope="col" className="pb-2 pr-3 text-left font-semibold">
                        직업 형태
                      </th>
                      <th scope="col" className="pb-2 text-left font-semibold">
                        산정 기준
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-text-secondary">
                    <tr className="border-b border-border-base">
                      <td className="py-2 pr-3">
                        <strong>근로소득자</strong>
                      </td>
                      <td>원천징수영수증 또는 급여명세서 기준 연소득</td>
                    </tr>
                    <tr className="border-b border-border-base">
                      <td className="py-2 pr-3">
                        <strong>사업소득자</strong>
                      </td>
                      <td>3년간 종합소득금액 평균 (또는 최근 1년 기준)</td>
                    </tr>
                    <tr className="border-b border-border-base">
                      <td className="py-2 pr-3">
                        <strong>프리랜서</strong>
                      </td>
                      <td>3년 근로소득 평균 또는 세무신고 소득금액</td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-3">
                        <strong>부부 합산 소득</strong>
                      </td>
                      <td>각각의 정확한 소득 증빙 후 합산 (최대 100% 합산)</td>
                    </tr>
                  </tbody>
                </table>

                <p className="text-text-secondary leading-relaxed">
                  은행은 가장 보수적인 소득 기준을 적용합니다. 예를 들어 최근 3년간 소득이
                  변동했다면, 가장 낮은 연도의 소득을 기준으로 DTI를 계산할 수 있습니다. 정확한
                  소득 인정 기준은 금융기관마다 다르므로 사전에 상담하세요.
                </p>

                <p className="text-text-secondary leading-relaxed">
                  다만 부업이나 임차수익이 있어도 세무신고가 되지 않으면 인정받기 어렵습니다.
                  대출 전에 소득을 공식적으로 세무신고하는 것이 한도 결정에 도움이 됩니다.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="border-b border-border-base pb-2 text-2xl font-bold">
                  DTI에서 기타 대출의 이자를 포함하는 이유
                </h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  DTI 계산에서 신용대출, 자동차할부 등 기타 대출의 이자만 포함하는 이유는 무엇일까요?
                  이것은 주담대와 다른 대출의 성질이 다르기 때문입니다.
                </p>

                <div className="rounded-lg bg-bg-raised p-4">
                  <h3 className="mb-3 font-semibold text-text-primary">
                    주담대와 기타 대출의 차이
                  </h3>
                  <ul className="space-y-3 text-sm text-text-secondary">
                    <li>
                      <strong>주담대:</strong> 주택을 담보로 하는 대출. 은행 입장에서 담보 가치가
                      있으므로 전체 원리금을 중심으로 규제
                    </li>
                    <li>
                      <strong>기타 대출:</strong> 신용 기반의 대출. 담보가 없으므로 순 이자 부담만
                      연소득에서 차감하는 방식
                    </li>
                    <li>
                      <strong>정책 의도:</strong> 주담대는 최대한 공급하되, 기타 대출로 인한 연소득
                      고갈을 방지
                    </li>
                  </ul>
                </div>

                <p className="text-text-secondary leading-relaxed">
                  따라서 기타 대출의 원금 상환액은 DTI에 포함되지 않습니다. 그러나 DSR은 기타 대출의
                  원금도 모두 포함하기 때문에, 신용대출이 크면 DSR 규제가 훨씬 엄격해집니다.
                </p>

                <p className="text-text-secondary leading-relaxed">
                  다만 기타 대출이 커질수록 DTI 한도는 높아 보일 수 있지만, 실제 대출 가능액은
                  DSR 규제에 의해 훨씬 낮아질 수 있습니다.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="border-b border-border-base pb-2 text-2xl font-bold">
                  DTI 규제 한도는 얼마인가요?
                </h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  DTI 규제 한도는 정부의 금융정책에 따라 수시로 변동됩니다. 2026년 현재 일반적인 기준과
                  규제지역의 차이를 정리하면 다음과 같습니다.
                </p>

                <table className="w-full border-collapse text-sm">
                  <caption className="mb-2 text-left font-semibold text-text-primary">
                    지역별 DTI 규제 한도 (예시, 변동 가능)
                  </caption>
                  <thead>
                    <tr className="border-b border-border-base">
                      <th scope="col" className="pb-2 pr-3 text-left font-semibold">
                        지역 구분
                      </th>
                      <th scope="col" className="pb-2 text-left font-semibold">
                        DTI 한도
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
                      <td>60~70% (정책에 따라 변동)</td>
                      <td>규제지역 미지정</td>
                    </tr>
                    <tr className="border-b border-border-base">
                      <td className="py-2 pr-3">
                        <strong>조정지역</strong>
                      </td>
                      <td>60~70% (일반지역과 동일)</td>
                      <td>DTI는 지역 무관, LTV만 낮아짐</td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-3">
                        <strong>투기지역</strong>
                      </td>
                      <td>60~70% (일반지역과 동일)</td>
                      <td>규제는 LTV 강화로 작동</td>
                    </tr>
                  </tbody>
                </table>

                <p className="text-text-secondary leading-relaxed">
                  중요한 점은 DTI 한도는 일반지역과 조정지역이 같다는 것입니다. 부동산 과열 지역에서
                  강화되는 규제는 DTI보다는 LTV와 DSR입니다.
                </p>

                <p className="text-text-secondary leading-relaxed">
                  다만 금융위원회가 금리 인상기에는 DTI 한도를 더 강화할 수 있습니다. 대출 신청
                  전에 금융위 공식 발표나 해당 은행의 최신 기준을 반드시 확인하세요.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="border-b border-border-base pb-2 text-2xl font-bold">
                  신용대출이 있으면 DTI 한도가 얼마나 줄어드나요?
                </h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  신용대출의 이자가 DTI 한도에서 차감되므로, 신용대출이 많을수록 주담대로 빌릴 수
                  있는 한도가 줄어듭니다. 구체적인 영향을 시뮬레이션해봅시다.
                </p>

                <div className="rounded-lg bg-bg-raised p-4">
                  <h3 className="mb-3 font-semibold text-text-primary">
                    신용대출에 따른 주담대 한도 변화
                  </h3>
                  <ul className="space-y-3 text-sm text-text-secondary">
                    <li>
                      <strong>상황:</strong> 연소득 6,000만 원, DTI 60% 규제
                    </li>
                    <li>
                      <strong>DTI 상한액:</strong> 6,000만 × 60% = 3,600만 원(연 원리금 + 이자)
                    </li>
                    <li>
                      <strong>신용대출 없는 경우:</strong>
                      <br />
                      주담대 월 원리금 = 3,600만 ÷ 12 = 300만 원
                      <br />
                      → 금리 4%, 30년 기준 약 6.3억 원 대출 가능
                    </li>
                    <li>
                      <strong>신용대출 5,000만 원 있는 경우 (월 이자 20만 원):</strong>
                      <br />
                      신용대출 연 이자 = 20만 × 12 = 240만 원
                      <br />
                      주담대 연 원리금 한도 = 3,600만 − 240만 = 3,360만 원
                      <br />
                      주담대 월 상환 = 3,360만 ÷ 12 = 280만 원
                      <br />
                      → 약 5.9억 원 대출 가능 (약 4,200만 원 감소)
                    </li>
                  </ul>
                </div>

                <p className="text-text-secondary leading-relaxed">
                  신용대출 5,000만 원의 이자가 240만 원일 때, 주담대 한도가 약 4,200만 원 줄어드는
                  것을 볼 수 있습니다. 신용대출의 금리와 잔액에 따라 영향이 달라집니다.
                </p>

                <p className="text-text-secondary leading-relaxed">
                  다만 위 계산은 DTI만 고려한 것입니다. 실제 대출은 DSR 규제가 더 제한적일 수
                  있으므로, 신용대출을 먼저 상환하고 주담대를 신청하는 것이 유리합니다.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="border-b border-border-base pb-2 text-2xl font-bold">
                  DTI와 DSR, LTV는 어떻게 다른가요?
                </h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  대출 규제는 단일 지표가 아니라 세 가지 기준이 동시에 적용됩니다. DTI, DSR, LTV는
                  각각 다른 관점에서 대출을 제한합니다.
                </p>

                <div className="space-y-4">
                  <div className="rounded-lg bg-bg-raised p-4">
                    <h3 className="mb-2 font-semibold text-text-primary">
                      DTI — 주담대 소득 기준
                    </h3>
                    <p className="text-sm text-text-secondary">
                      주담대 원리금 + 기타 대출 이자만 본다. 기타 대출의 원금은 미포함. 한도는 60~70%.
                    </p>
                  </div>

                  <div className="rounded-lg bg-bg-raised p-4">
                    <h3 className="mb-2 font-semibold text-text-primary">
                      DSR — 모든 대출 소득 기준
                    </h3>
                    <p className="text-sm text-text-secondary">
                      주담대, 신용대출, 자동차할부 등 모든 대출의 원리금을 포함. 가장 엄격한 규제. 한도는
                      40~45%.
                    </p>
                  </div>

                  <div className="rounded-lg bg-bg-raised p-4">
                    <h3 className="mb-2 font-semibold text-text-primary">
                      LTV — 담보 기준
                    </h3>
                    <p className="text-sm text-text-secondary">
                      주택 담보가치만 본다. 소득은 무관. 한도는 일반지역 70%, 조정지역 60%.
                    </p>
                  </div>
                </div>

                <p className="text-text-secondary leading-relaxed">
                  <strong>실제 적용:</strong> 세 규제 중 가장 낮은 한도가 최종 대출 가능액을 결정합니다.
                  예를 들어 LTV 한도 3.5억, DTI 한도 3억, DSR 한도 2.5억이라면, 실제로는 DSR이
                  결정하는 2.5억 원까지만 빌릴 수 있습니다.
                </p>

                <p className="text-text-secondary leading-relaxed">
                  다만 정확한 한도는 금융기관의 자체 판단에 따라 달라질 수 있습니다. 대출한도
                  계산기나 은행 상담을 통해 당신의 정확한 한도를 확인하세요.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="border-b border-border-base pb-2 text-2xl font-bold">
                  금리가 올라가면 DTI 한도가 낮아지나요?
                </h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  금리가 상승하면 같은 원금에 대해 더 높은 이자를 내야 하므로, DTI 한도는 간접적으로
                  낮아집니다. 또한 금융위는 금리 인상 시 스트레스 테스트를 통해 DTI 규제를 강화하는
                  경향이 있습니다.
                </p>

                <div className="rounded-lg bg-bg-raised p-4">
                  <h3 className="mb-3 font-semibold text-text-primary">
                    금리 인상에 따른 월 상환액 변화
                  </h3>
                  <ul className="space-y-3 text-sm text-text-secondary">
                    <li>
                      <strong>3억 원 대출, 30년 상환 기준</strong>
                    </li>
                    <li>
                      금리 3% → 월 원리금 약 127만 원
                    </li>
                    <li>
                      금리 4% → 월 원리금 약 143만 원 (월 16만 원 증가, 연 192만 원 증가)
                    </li>
                    <li>
                      금리 5% → 월 원리금 약 161만 원 (월 34만 원 증가, 연 408만 원 증가)
                    </li>
                  </ul>
                </div>

                <p className="text-text-secondary leading-relaxed">
                  금리가 1%p 상승하면, 같은 금액의 대출도 월 상환액이 크게 증가합니다. DTI 규제 한도가
                  고정되어 있다면, 금리 상승은 빌릴 수 있는 금액을 줄입니다.
                </p>

                <p className="text-text-secondary leading-relaxed">
                  다만 금융위는 금리 인상 시 스트레스 DSR(미래 금리 인상을 미리 반영한 보수적
                  계산)을 도입하여 실제 DTI 규제는 더욱 강화될 수 있습니다. 금리 인상기에는 조기 대출
                  신청이 유리할 수 있습니다.
                </p>
              </section>

              <AdSlot slot="guide-dti-calculation-mid" format="rectangle" />

              <FaqSection items={FAQ_ITEMS} />

              <section className="card border-l-2 border-l-danger-500 bg-danger-500/5">
                <h2 className="mb-2 text-lg font-semibold text-danger-700 dark:text-danger-300">
                  주의사항 및 면책조항
                </h2>
                <ul className="space-y-2 text-sm text-danger-700 dark:text-danger-300">
                  <li>
                    • 본 가이드는 일반 금융 정보 제공 목적이며, 특정 금융기관의 실제 대출 규정을
                    보장하지 않습니다.
                  </li>
                  <li>
                    • DTI 한도는 <strong>정부 정책에 따라 수시 변동</strong>되므로, 대출 신청 시점에
                    금융위 공식 발표나 해당 은행의 최신 기준을 반드시 확인하세요.
                  </li>
                  <li>
                    • 실제 대출 가능액은 담보가치, 신용도, 기존 대출 현황, 금리 환경, 소득 증빙, 은행의
                    자체 기준 등 다양한 요소에 영향을 받습니다.
                  </li>
                  <li>
                    • 본 계산은 이해를 돕기 위한 예시이며, 실제 원리금은 금리, 상환 기간, 보증보험료
                    등에 따라 달라집니다.
                  </li>
                  <li>
                    • 정확한 대출한도 조회는 은행 상담이나 대출한도 계산기를 이용하세요.
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
                      href="/calculator/dti/"
                      className="text-primary-600 underline dark:text-primary-500"
                    >
                      DTI 계산기
                    </Link>{' '}
                    — 연소득 대비 주담대 월 상환액 실시간 확인
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
                      href="/guide/dsr-dti-ltv-difference-2026/"
                      className="text-primary-600 underline dark:text-primary-500"
                    >
                      DSR·DTI·LTV 차이와 계산법 2026
                    </Link>{' '}
                    — 세 대출 규제 지표의 정의, 공식, 차이 총정리
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
