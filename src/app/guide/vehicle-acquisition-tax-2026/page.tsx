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

const URL = 'https://calculatorhost.com/guide/vehicle-acquisition-tax-2026/';
const DATE_PUBLISHED = '2026-06-25';
const DATE_MODIFIED = '2026-06-25';

export const metadata: Metadata = {
  title: '자동차 취득세 계산 2026 — 승용 7%·경차 4%·과세표준 완전정리',
  description:
    '자동차를 구매할 때 내는 취득세를 정확히 계산하는 방법을 설명합니다. 비영업용 승용차 7%, 경차 4%, 신차·중고차 과세표준 차이, 친환경차 감면 요건까지 2026년 기준으로 완벽 정리합니다.',
  keywords: [
    '자동차 취득세',
    '취득세 계산',
    '차 사는데 세금',
    '신차 취득세',
    '중고차 취득세',
    '경차 취득세',
    '자동차세',
    '지방세',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [
      {
        url: '/og-default.png',
        width: 1200,
        height: 630,
        alt: '자동차 취득세 계산 2026 — 승용 7%·경차 4%·과세표준 완전정리',
      },
    ],
    title: '자동차 취득세 계산 2026',
    description: '신차·중고차 취득세 세율과 계산법, 과세표준 결정 방식, 감면 요건을 명확히 설명합니다.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '자동차 취득세 계산 2026',
    description: '자동차 구매 시 내야 할 취득세 세율과 계산방법을 정리합니다.',
  },
};

const FAQ_ITEMS = [
  {
    question: '자동차 취득세란?',
    answer:
      '자동차를 구매할 때 구청이나 지방청에 신규등록할 때 내는 지방세입니다. 부동산 취득세와는 별개이며, 차량 구입가격(신차) 또는 시가표준액(중고차)을 기준으로 과세됩니다. 비영업용 승용차는 7%, 경차는 4%의 세율이 적용됩니다.',
  },
  {
    question: '신차와 중고차 취득세가 다른가요?',
    answer:
      '과세표준의 기준이 다릅니다. 신차는 매매계약서상 취득가격을 기준으로 하고, 중고차는 시가표준액(국세청 고시가 또는 감정가)을 기준으로 합니다. 중고차는 차량 연식·주행거리·상태 등에 따라 시가표준액이 달라질 수 있으므로, 구매 전에 딜러나 관할 지방청에서 예상 과세표준을 확인하는 것이 좋습니다.',
  },
  {
    question: '경차면 취득세가 4%로 더 싼가요?',
    answer:
      '네, 맞습니다. 경차(배기량 1,000cc 이하 등 경형 기준 충족 차량)는 일반 승용차(7%)보다 낮은 4% 세율이 적용됩니다. 예를 들어 신차 구입가 1,500만원이면, 경차는 60만원(4%), 일반 승용차라면 105만원(7%)의 취득세가 부과됩니다.',
  },
  {
    question: '전기차나 하이브리드는 취득세 감면이 있나요?',
    answer:
      '네, 지방세특례제한법에 따라 전기차, 수소전기차, 일부 하이브리드 차량의 취득세 감면이 있습니다. 다만 감면 대상, 한도 금액, 적용 기간은 매년 정부 정책에 따라 변동됩니다. 정확한 감면 여부와 한도는 구매 전에 위택스나 관할 시·군·구청에서 반드시 확인하세요.',
  },
  {
    question: '자동차 취득세 외에 추가로 내는 비용이 있나요?',
    answer:
      '자동차 등록 단계에서 지역개발채권 등 채권 매입 의무가 있을 수 있고, 농어촌특별세 등 부가세목은 차종·용도·감면 요건에 따라 달라집니다. 부동산 취득세처럼 지방교육세가 일률적으로 더해지는 구조가 아니므로, 정확한 총 부담액은 위택스나 관할 시·군·구청에서 확인하세요.',
  },
  {
    question: '농어촌특별세는?',
    answer:
      '자동차 취득세에도 농어촌특별세(농특세)가 부가될 수 있습니다만, 자동차는 부동산과 달리 차종·용도에 따라 세율이 다르므로, 정확한 부가세목과 세율은 위택스나 관할 지방청에 문의해야 합니다.',
  },
  {
    question: '취득세를 줄일 수 있는 방법이 있나요?',
    answer:
      '친환경차(전기차·수소차) 감면, 장애인 감면, 다자녀 감면 등이 있습니다. 다만 모든 감면은 요건과 한도가 정해져 있으므로, 본인이 감면 대상인지 관할 지방청이나 위택스에서 먼저 확인하세요. 또한 감면 신청 기한을 놓치면 적용받지 못하므로 신규등록 시점에 주의해야 합니다.',
  },
];

export default function VehicleAcquisitionTax2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '자동차 취득세 계산 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '자동차 취득세 계산 2026',
    description:
      '자동차를 구매할 때 내는 취득세 세율, 과세표준 결정 방식, 신차·중고차 차이, 감면 요건을 정리합니다.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['자동차 취득세', '세율', '과세표준', '경차', '감면', '지방세'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '자동차 취득세 계산 2026 | calculatorhost',
    description:
      '비영업용 승용차 7%, 경차 4%, 신차·중고차 과세표준, 감면 요건을 명확히 정리합니다.',
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
                    { name: '자동차 취득세 계산 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">
                  자동차 · 8분 읽기 · 2026-06-25
                </p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  자동차 취득세 계산 2026
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  자동차를 구매할 때 구청에서 신규등록할 때 내는 세금이 자동차 취득세입니다. 부동산
                  취득세와 혼동하기 쉽지만 전혀 다른 세금입니다. 비영업용 승용차는 7%, 경차는 4%의
                  세율이 적용되며, 신차와 중고차의 과세표준 기준도 다릅니다. 이 가이드에서는
                  자동차 취득세의 정의, 세율, 과세표준 결정 방식, 신차·중고차 차이, 감면 요건을
                  명확히 설명합니다.
                </p>
              </header>

              <AdSlot slot="guide-vehicle-acquisition-tax-top" format="horizontal" />

              <section aria-label="요약" className="card border-l-4 border-l-primary-500">
                <h2 className="mb-2 text-caption uppercase tracking-wider text-primary-500">
                  핵심 요약
                </h2>
                <table className="w-full border-collapse text-sm">
                  <caption className="mb-2 text-left font-semibold text-text-primary">
                    자동차 취득세 세율 및 과세표준 (2026 기준)
                  </caption>
                  <thead>
                    <tr className="border-b border-border-base">
                      <th scope="col" className="pb-2 pr-3 text-left font-semibold">
                        차종
                      </th>
                      <th scope="col" className="pb-2 text-left font-semibold">
                        세율
                      </th>
                      <th scope="col" className="pb-2 text-left font-semibold">
                        과세표준
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-text-secondary">
                    <tr className="border-b border-border-base">
                      <td className="py-2 pr-3 font-semibold">비영업용 승용차</td>
                      <td>7%</td>
                      <td>신차: 취득가격 | 중고차: 시가표준액</td>
                    </tr>
                    <tr className="border-b border-border-base">
                      <td className="py-2 pr-3 font-semibold">경차 (1000cc 이하)</td>
                      <td>4%</td>
                      <td>신차: 취득가격 | 중고차: 시가표준액</td>
                    </tr>
                    <tr className="border-b border-border-base">
                      <td className="py-2 pr-3 font-semibold">영업용 승용차</td>
                      <td>4%</td>
                      <td>신차: 취득가격 | 중고차: 시가표준액</td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-3 font-semibold">
                        승합차·화물차·기타 차종
                      </td>
                      <td>별도 (문의 필요)</td>
                      <td>위택스·관할 지방청 확인</td>
                    </tr>
                  </tbody>
                </table>
              </section>

              <section className="space-y-4">
                <h2 className="border-b border-border-base pb-2 text-2xl font-bold">
                  자동차 취득세란?
                </h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  자동차 취득세는 자동차를 새로 구매할 때 구청이나 지방청에 신규등록할 때 내는
                  지방세입니다. 부동산을 살 때 내는 부동산 취득세와는 완전히 별개의 세금입니다.
                </p>
                <p className="text-text-secondary leading-relaxed">
                  <strong>기본 공식은 간단합니다:</strong>
                </p>
                <div className="rounded-lg bg-bg-raised p-4">
                  <p className="font-mono text-sm font-semibold text-text-primary">
                    자동차 취득세 = 과세표준 × 세율
                  </p>
                  <p className="mt-2 text-xs text-text-tertiary">
                    세율은 차종·용도에 따라 다릅니다 (비영업용 승용 7%, 경차 4%)
                  </p>
                </div>
                <p className="text-text-secondary leading-relaxed">
                  다만 과세표준은 신차와 중고차가 다릅니다. 신차는 취득가격(매매계약서상 금액)을
                  기준으로 하고, 중고차는 국세청 시가표준액 또는 감정가를 기준으로 합니다. 같은 모델
                  차량이라도 연식·주행거리·상태에 따라 과세표준이 크게 달라질 수 있습니다.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="border-b border-border-base pb-2 text-2xl font-bold">
                  비영업용 승용차 7%, 경차 4% 세율이란?
                </h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  자동차 취득세는 차량의 용도와 종류에 따라 세율이 다릅니다. 가장 흔한
                  비영업용(개인용) 승용차와 경차의 세율을 정리합니다.
                </p>

                <table className="w-full border-collapse text-sm">
                  <caption className="mb-2 text-left font-semibold text-text-primary">
                    자동차 취득세 세율표 (지방세법 §12①)
                  </caption>
                  <thead>
                    <tr className="border-b border-border-base">
                      <th scope="col" className="pb-2 pr-3 text-left font-semibold">
                        구분
                      </th>
                      <th scope="col" className="pb-2 text-left font-semibold">
                        세율
                      </th>
                      <th scope="col" className="pb-2 text-left font-semibold">
                        비고
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-text-secondary">
                    <tr className="border-b border-border-base">
                      <td className="py-2 pr-3">
                        <strong>비영업용 승용차</strong>
                      </td>
                      <td>7%</td>
                      <td>일반인 개인용 자동차</td>
                    </tr>
                    <tr className="border-b border-border-base">
                      <td className="py-2 pr-3">
                        <strong>경차</strong>
                      </td>
                      <td>4%</td>
                      <td>배기량 1,000cc 이하 등 경형 기준</td>
                    </tr>
                    <tr className="border-b border-border-base">
                      <td className="py-2 pr-3">
                        <strong>영업용 승용차</strong>
                      </td>
                      <td>4%</td>
                      <td>택시, 렌터카 등</td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-3">
                        <strong>승합·화물·기타</strong>
                      </td>
                      <td>차종별 상이</td>
                      <td>위택스·관할 지방청 확인 필수</td>
                    </tr>
                  </tbody>
                </table>

                <p className="text-text-secondary leading-relaxed">
                  경차가 일반 승용차보다 더 낮은 4% 세율이 적용되는 이유는 정부가 소형차 구매를
                  장려하기 위함입니다. 따라서 같은 가격대 차를 사더라도 경차인지 일반 승용차인지
                  확인하는 것이 중요합니다.
                </p>

                <p className="text-text-secondary leading-relaxed">
                  다만 승합차, 화물차, 특수 용도 차량(장애인용 개조차 등)은 세율이 상이하므로,
                  정확한 세율은 구매 전에 위택스(wetax.go.kr)나 관할 지방청에서 반드시 확인하세요.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="border-b border-border-base pb-2 text-2xl font-bold">
                  신차와 중고차 취득세, 과세표준이 다른 이유
                </h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  신차와 중고차의 취득세를 계산할 때 기준이 되는 '과세표준'이 다릅니다.
                </p>

                <div className="rounded-lg bg-bg-raised p-4">
                  <h3 className="mb-3 font-semibold text-text-primary">신차 취득세</h3>
                  <ul className="space-y-2 text-sm text-text-secondary">
                    <li>
                      <strong>과세표준</strong>: 매매계약서상 취득가격(구입 금액)
                    </li>
                    <li>
                      <strong>예시</strong>: 신차 3,000만원 구매 → 과세표준 3,000만원 × 7% = 210만원
                    </li>
                    <li>
                      <strong>장점</strong>: 계약서상 금액이 명확하므로 과세표준 결정이 간단함
                    </li>
                  </ul>
                </div>

                <div className="rounded-lg bg-bg-raised p-4">
                  <h3 className="mb-3 font-semibold text-text-primary">중고차 취득세</h3>
                  <ul className="space-y-2 text-sm text-text-secondary">
                    <li>
                      <strong>과세표준</strong>: 국세청 시가표준액 또는 감정평가가(둘 중 큰 값)
                    </li>
                    <li>
                      <strong>예시</strong>: 2020년식 중고차, 계약가 2,000만원이나 시가표준액 2,500만원 →
                      과세표준 2,500만원 × 7% = 175만원
                    </li>
                    <li>
                      <strong>주의</strong>: 실제 거래가(계약가)가 시가표준액보다 낮아도, 시가표준액을
                      기준으로 과세되는 경우가 많음
                    </li>
                  </ul>
                </div>

                <p className="text-text-secondary leading-relaxed">
                  중고차 구매자 입장에서는 불리할 수 있습니다. 실제 구매 가격(계약가)이 2,000만원이더라도,
                  시가표준액이 2,500만원으로 평가되면 2,500만원 기준으로 취득세를 내야 하기 때문입니다.
                </p>

                <p className="text-text-secondary leading-relaxed">
                  다만 중고차 구매 시 예상 취득세를 정확히 알기 위해서는 딜러나 관할 지방청에서
                  해당 차량의 시가표준액을 사전에 문의해야 합니다. 시가표준액은 차량 연식, 주행거리,
                  상태, 시장 동향 등 여러 요소에 따라 달라질 수 있습니다.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="border-b border-border-base pb-2 text-2xl font-bold">
                  신차 구입가격 3,000만원일 때 취득세 계산 예시
                </h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  실제 신차 구매 시 취득세가 어떻게 계산되는지 몇 가지 사례로 봅시다.
                </p>

                <div className="rounded-lg bg-bg-raised p-4">
                  <h3 className="mb-3 font-semibold text-text-primary">
                    사례 1: 일반 승용차 (비영업용, 배기량 1,600cc)
                  </h3>
                  <ul className="space-y-2 text-sm text-text-secondary">
                    <li>
                      <strong>구입가격</strong>: 3,000만원
                    </li>
                    <li>
                      <strong>세율</strong>: 7%
                    </li>
                    <li>
                      <strong>취득세</strong>: 3,000만원 × 7% = <strong>210만원</strong>
                    </li>
                  </ul>
                </div>

                <div className="rounded-lg bg-bg-raised p-4">
                  <h3 className="mb-3 font-semibold text-text-primary">
                    사례 2: 경차 (1,000cc 이하)
                  </h3>
                  <ul className="space-y-2 text-sm text-text-secondary">
                    <li>
                      <strong>구입가격</strong>: 1,500만원
                    </li>
                    <li>
                      <strong>세율</strong>: 4% (경차 우대)
                    </li>
                    <li>
                      <strong>취득세</strong>: 1,500만원 × 4% = <strong>60만원</strong>
                    </li>
                  </ul>
                </div>

                <div className="rounded-lg bg-bg-raised p-4">
                  <h3 className="mb-3 font-semibold text-text-primary">
                    사례 3: 대형 승용차 (2,000cc 이상)
                  </h3>
                  <ul className="space-y-2 text-sm text-text-secondary">
                    <li>
                      <strong>구입가격</strong>: 5,000만원
                    </li>
                    <li>
                      <strong>세율</strong>: 7%
                    </li>
                    <li>
                      <strong>취득세</strong>: 5,000만원 × 7% = <strong>350만원</strong>
                    </li>
                  </ul>
                </div>

                <p className="text-text-secondary leading-relaxed">
                  위 계산에서 주목할 점은 경차와 일반 승용차의 세율 차이입니다. 같은 가격대(1,500~3,000만원)라도
                  경차 4%와 일반 승용차 7%로 세액이 크게 차이납니다. 자동차 선택 시 총 구입가뿐 아니라 취득세도
                  고려해야 합니다.
                </p>

                <p className="text-text-secondary leading-relaxed">
                  다만 위는 기본 취득세 계산이며, 농어촌특별세, 감면 혜택 등 추가 요소가 있을 수 있습니다.
                  정확한 취득세는 구매 예정 차량의 세부 사항을 들고 관할 지방청이나 위택스에서 확인해야 합니다.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="border-b border-border-base pb-2 text-2xl font-bold">
                  전기차·수소차·하이브리드 취득세 감면
                </h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  정부는 친환경 자동차 보급 확대를 위해 취득세 감면 정책을 운영하고 있습니다. 다만 감면 대상,
                  한도, 적용 기간이 매년 정책에 따라 달라집니다.
                </p>

                <div className="rounded-lg bg-bg-raised p-4">
                  <h3 className="mb-3 font-semibold text-text-primary">친환경차 감면 예시</h3>
                  <ul className="space-y-3 text-sm text-text-secondary">
                    <li>
                      <strong>전기자동차(BEV)</strong>: 지방세특례제한법에 따라 취득세 감면
                      <br />
                      (감면 한도·대상 차종 연마다 변동)
                    </li>
                    <li>
                      <strong>수소전기차(FCEV)</strong>: 전기차와 동일한 감면 적용
                    </li>
                    <li>
                      <strong>플러그인 하이브리드(PHEV)</strong>: 조건부 감면
                      <br />
                      (배터리 용량·차량가격 기준 상이)
                    </li>
                  </ul>
                </div>

                <p className="text-text-secondary leading-relaxed">
                  <strong>주의할 점:</strong> 친환경차 취득세 감면은 차량 종류·차량가격·연도별 정책에 따라
                  감면 한도와 적용 요건이 달라집니다. 또한 감면을 받기 위해서는 신규등록 시점에 감면 신청을
                  반드시 해야 하며, 기한을 놓치면 소급 적용이 어렵습니다.
                </p>

                <p className="text-text-secondary leading-relaxed">
                  다만 친환경차 감면은 지방세특례제한법에 규정되어 있으나, 구체적인 조문 번호, 한도 금액,
                  적용 요건은 정부 정책에 따라 자주 변동됩니다. 친환경차 구매를 고려 중이라면, 구매 전에 반드시
                  위택스나 관할 시·군·구청에서 최신 감면 정책을 확인하세요.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="border-b border-border-base pb-2 text-2xl font-bold">
                  자동차 취득세와 자동차세는 다른 세금
                </h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  많은 사람들이 자동차 취득세와 자동차세를 혼동합니다. 두 세금은 완전히 다릅니다.
                </p>

                <table className="w-full border-collapse text-sm">
                  <caption className="mb-2 text-left font-semibold text-text-primary">
                    취득세 vs 자동차세 비교표
                  </caption>
                  <thead>
                    <tr className="border-b border-border-base">
                      <th scope="col" className="pb-2 pr-3 text-left font-semibold">
                        구분
                      </th>
                      <th scope="col" className="pb-2 text-left font-semibold">
                        취득세
                      </th>
                      <th scope="col" className="pb-2 text-left font-semibold">
                        자동차세
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-text-secondary">
                    <tr className="border-b border-border-base">
                      <td className="py-2 pr-3">
                        <strong>납부 시점</strong>
                      </td>
                      <td>신규등록할 때 (일회성)</td>
                      <td>매년 6월, 12월 (연 2회)</td>
                    </tr>
                    <tr className="border-b border-border-base">
                      <td className="py-2 pr-3">
                        <strong>세율</strong>
                      </td>
                      <td>7% (비영업용), 4% (경차)</td>
                      <td>
                        80~200원/cc (배기량 기준),
                        <br />
                        전기차 13만원 정액
                      </td>
                    </tr>
                    <tr className="border-b border-border-base">
                      <td className="py-2 pr-3">
                        <strong>기준</strong>
                      </td>
                      <td>구입 금액(신차) or 시가표준액(중고차)</td>
                      <td>배기량 또는 정액</td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-3">
                        <strong>용도</strong>
                      </td>
                      <td>취득 시 일회성 부담</td>
                      <td>자동차 보유 기간 동안 매년 부담</td>
                    </tr>
                  </tbody>
                </table>

                <p className="text-text-secondary leading-relaxed">
                  자동차 취득세는 <strong>구매 시 한 번</strong> 내는 세금이고, 자동차세는 <strong>매년</strong> 내는
                  세금입니다. 따라서 자동차 구매 시에는 취득세뿐 아니라 앞으로 매년 내야 할 자동차세도 함께
                  고려해야 합니다.
                </p>

                <p className="text-text-secondary leading-relaxed">
                  다만 부동산 취득세는 자동차 취득세와 별개이며, 부동산 거래 시에만 적용됩니다. 자동차와
                  부동산을 혼동하지 않도록 주의하세요.
                </p>
              </section>

              <AdSlot slot="guide-vehicle-acquisition-tax-mid" format="rectangle" />

              <FaqSection items={FAQ_ITEMS} />

              <section className="card border-l-2 border-l-danger-500 bg-danger-500/5">
                <h2 className="mb-2 text-lg font-semibold text-danger-700 dark:text-danger-300">
                  주의사항 및 면책조항
                </h2>
                <ul className="space-y-2 text-sm text-danger-700 dark:text-danger-300">
                  <li>
                    • 본 가이드는 일반 세금 정보 제공 목적이며, 특정 차량의 실제 취득세를 보장하지
                    않습니다.
                  </li>
                  <li>
                    • 자동차 취득세 세율과 감면은 <strong>정부 정책에 따라 수시 변동</strong>됩니다.
                    신규등록 시점에 위택스나 관할 지방청의 최신 기준을 반드시 확인하세요.
                  </li>
                  <li>
                    • 중고차 과세표준(시가표준액)은 차량 연식, 주행거리, 상태, 시장 동향에 따라
                    달라질 수 있습니다.
                  </li>
                  <li>
                    • 친환경차(전기차, 수소차, 하이브리드) 감면 대상, 한도 금액, 신청 요건은 매년
                    변동되므로, 구매 전에 반드시 관할 지방청에서 확인하세요.
                  </li>
                  <li>
                    • 승합차, 화물차, 특수 용도 차량의 취득세 세율은 본 가이드와 다를 수 있습니다.
                    정확한 세율은 위택스나 관할 지방청에 문의하세요.
                  </li>
                  <li>
                    • 본 사이트는 세금 납부를 권유하거나 강제하지 않으며, 모든 세금 결정은 본인
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
                      href="/calculator/vehicle-tax/"
                      className="text-primary-600 underline dark:text-primary-500"
                    >
                      자동차세 계산기
                    </Link>{' '}
                    — 배기량별 cc당 세율, 차령경감, 지방교육세 반영
                  </li>
                  <li>
                    →{' '}
                    <Link
                      href="/guide/vehicle-tax-calculation-2026/"
                      className="text-primary-600 underline dark:text-primary-500"
                    >
                      자동차세 계산법 2026
                    </Link>{' '}
                    — 배기량 구간, 차령경감, 연납 할인 완벽 가이드
                  </li>
                  <li>
                    →{' '}
                    <Link
                      href="/guide/electric-vehicle-tax-2026/"
                      className="text-primary-600 underline dark:text-primary-500"
                    >
                      전기차 자동차세 2026
                    </Link>{' '}
                    — 전기차 정액 세율, 하이브리드와의 차이
                  </li>
                  <li>
                    →{' '}
                    <Link
                      href="/guide/vehicle-individual-consumption-tax-deadline-2026-june/"
                      className="text-primary-600 underline dark:text-primary-500"
                    >
                      자동차 개별소비세
                    </Link>{' '}
                    — 취득세와 함께 내는 개소세 개념과 신청 기한
                  </li>
                  <li>
                    →{' '}
                    <Link
                      href="/guide/acquisition-tax-calculation-2026/"
                      className="text-primary-600 underline dark:text-primary-500"
                    >
                      부동산 취득세 계산 (자동차 X)
                    </Link>{' '}
                    — 주택·건물 거래 시 취득세 (자동차 취득세와 무관)
                  </li>
                  <li>
                    →{' '}
                    <Link
                      href="/category/lifestyle/"
                      className="text-primary-600 underline dark:text-primary-500"
                    >
                      생활 계산기 카테고리
                    </Link>{' '}
                    — 자동차, BMI, D-day 등 생활 관련 모든 계산 도구
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
                    href="https://www.law.go.kr/"
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="text-primary-600 underline dark:text-primary-500"
                  >
                    법제처 법령검색 (지방세법)
                  </a>
                  ,{' '}
                  <a
                    href="https://www.wetax.go.kr/"
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="text-primary-600 underline dark:text-primary-500"
                  >
                    위택스 (위택스 취득세 계산)
                  </a>
                  ,{' '}
                  <a
                    href="https://etax.seoul.go.kr/"
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="text-primary-600 underline dark:text-primary-500"
                  >
                    서울시청 이택스
                  </a>
                  .
                </p>
                <p>
                  <strong>업데이트</strong>: {DATE_MODIFIED}. AI 보조 작성 후 운영자 검수 완료.
                </p>
                <p className="mt-2 text-xs">
                  <strong>법조항 인용</strong>: 지방세법 §12① (자동차 취득세 세율) ·
                  지방세특례제한법 (친환경차·장애인 등 감면)
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
