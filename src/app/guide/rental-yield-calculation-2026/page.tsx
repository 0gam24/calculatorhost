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

const URL = 'https://calculatorhost.com/guide/rental-yield-calculation-2026/';
const DATE_PUBLISHED = '2026-06-24';
const DATE_MODIFIED = '2026-06-24';

export const metadata: Metadata = {
  title: '임대수익률 계산 2026 | 월세 수익률·표면수익률·갭투자 실투자금',
  description:
    '부동산 임대수익률 계산법을 쉽게 정리합니다. 순수익률 vs 표면수익률 차이, 갭투자 실투자금 계산, 월세 수익성 판단 기준을 명확히 설명합니다. 2026년 기준.',
  keywords: [
    '임대수익률',
    '월세 수익률',
    '순수익률',
    '표면수익률',
    '갭투자',
    '실투자금',
    '임대료',
    '부동산 투자',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [
      {
        url: '/og-default.png',
        width: 1200,
        height: 630,
        alt: '임대수익률 계산 2026 | 월세 수익률·표면수익률·갭투자 실투자금',
      },
    ],
    title: '임대수익률 계산 2026',
    description: '부동산 월세 수익률을 정확히 계산하는 공식과 실제 사례를 정리합니다.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '임대수익률 계산 2026',
    description: '월세 수익률, 갭투자 실투자금, 제경비를 포함한 정확한 수익률 계산',
  },
};

const FAQ_ITEMS = [
  {
    question: '임대수익률과 표면수익률은 뭐가 다른가요?',
    answer:
      '표면수익률(gross yield)은 연월세를 매매가로 나눈 것이고, 임대수익률(순수익률, net yield)은 연월세에서 제경비(재산세, 보험, 관리비 등)를 뺀 후 실투자금으로 나눈 것입니다. 예를 들어 월세 70만 원 / 매매가 2억인 경우, 표면수익률은 4.2%이지만, 연제경비 100만 원을 빼면 순수익률은 3.78%로 낮아집니다. 실제 수익은 순수익률로 판단해야 합니다.',
  },
  {
    question: '갭투자할 때 실투자금은 어떻게 계산하나요?',
    answer:
      '실투자금 = 매매가 − 임대보증금(또는 전세금) + 취득부대비용입니다. 예를 들어 매매가 3억, 전세보증금 1.5억, 취득부대비용 600만 원이라면, 실투자금은 3억 − 1.5억 + 600만 = 1.56억 원입니다. 이 경우 본인이 실제로 내는 현금이 1.56억 원이므로, 이 금액에 대한 월세 수익률을 계산해야 합니다. 전세보증금이 크면 실투자금이 작아져 수익률이 높아지지만, 전세 만료 시 보증금을 반환해야 한다는 리스크가 있습니다.',
  },
  {
    question: '제경비에는 뭐가 포함되나요?',
    answer:
      '제경비는 임대인이 부담하는 모든 연간 비용을 의미합니다. 재산세, 종부세, 건물관리비(아파트), 보험료, 수리비, 공실 손실, 금리(대출금) 등이 포함됩니다. 건물 상태와 지역에 따라 크게 달라질 수 있습니다. 예를 들어 강남 아파트와 지방 오피스텔의 제경비 비율이 다르므로, 투자 대상별로 실제 제경비를 조사하고 포함해야 정확한 수익률을 계산할 수 있습니다.',
  },
  {
    question: '월세와 전월세(전세)는 수익률 계산에서 어떻게 다른가요?',
    answer:
      '월세는 매달 고정 현금 수익이므로 계산이 단순합니다. 전월세(전세금)는 2년 후 전액 반환해야 하므로, 보유 기간 동안의 월세 수익만 계산하고 기회비용을 함께 고려해야 합니다. 예를 들어 2년 전세 4억 원이라면, 2년간의 월세 수익과 전세금 반환 리스크를 함께 평가해야 합니다. 순수익률은 현금 흐름 기준이므로, 전세는 월세 부분만 포함하고 전세금 반환은 별도 리스크로 간주합니다.',
  },
  {
    question: '공실이나 관리 문제로 손실이 나면 수익률이 마이너스가 될까요?',
    answer:
      '그럴 수 있습니다. 만약 표면수익률이 3%인데 제경비와 공실 손실이 4%라면, 실제 순수익률은 음수(−1%)가 될 수 있습니다. 특히 금리가 높은 시기에 대출금을 활용한 투자는 월세로 대출이자를 다 감당하지 못하면 손실이 발생합니다. 이것이 갭투자의 주된 위험입니다. 따라서 투자 전에 현실적인 제경비와 공실율을 반영한 수익률을 계산해야 마이너스 투자를 피할 수 있습니다.',
  },
  {
    question: '부동산 시세가 올라가면 수익률이 높아지나요?',
    answer:
      '아닙니다. 수익률은 월세 수익을 기반으로 계산되므로, 시세 상승과 무관합니다. 다만 시세 상승으로 인한 자본이득(시세차익)이 발생하면, 총 수익률(월세 수익 + 시세차익)은 올라갑니다. 예를 들어 월세 3%의 부동산이 1년 후 시세가 10% 올라가면, 총 수익은 13%가 되지만, 순수 임대수익률은 여전히 3%입니다. 장기 투자자는 월세와 시세차익을 함께 고려하고, 단기 투자자는 시세차익만 고려하는 방식으로 투자 목표를 달리해야 합니다.',
  },
];

export default function RentalYieldCalculation2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '임대수익률 계산 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '임대수익률 계산 2026',
    description:
      '부동산 월세 수익률 계산 공식, 표면수익률 vs 순수익률, 갭투자 실투자금 계산, 제경비 포함 방법을 상세히 정리합니다.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['임대수익률', '월세 수익률', '갭투자', '실투자금', '순수익률'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '임대수익률 계산 2026 | calculatorhost',
    description:
      '월세 수익률을 정확히 계산하는 공식과 실제 투자 사례를 정리합니다.',
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
                    { name: '임대수익률 계산 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">
                  부동산 · 8분 읽기 · 2026-06-24
                </p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  임대수익률 계산 2026
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  부동산 투자할 때 가장 중요한 지표 중 하나가 임대수익률입니다. 많은 초보 투자자들이
                  단순히 월세를 매매가로 나눈 "표면수익률"만 보고 투자 결정을 하지만, 실제 수익은
                  제경비를 뺀 "순수익률"에서 나옵니다. 갭투자할 때는 실투자금 계산이 더욱
                  중요합니다. 이 가이드에서는 임대수익률의 정의, 정확한 계산 공식, 실제 투자 사례를
                  통해 명확히 설명합니다.
                </p>
              </header>

              <AdSlot slot="guide-rental-yield-calculation-top" format="horizontal" />

              <section aria-label="요약" className="card border-l-4 border-l-primary-500">
                <h2 className="mb-2 text-caption uppercase tracking-wider text-primary-500">
                  핵심 요약
                </h2>
                <table className="w-full border-collapse text-sm">
                  <caption className="mb-2 text-left font-semibold text-text-primary">
                    임대수익률 주요 개념 비교 (2026)
                  </caption>
                  <thead>
                    <tr className="border-b border-border-base">
                      <th scope="col" className="pb-2 pr-3 text-left font-semibold">
                        구분
                      </th>
                      <th scope="col" className="pb-2 text-left font-semibold">
                        공식
                      </th>
                      <th scope="col" className="pb-2 text-left font-semibold">
                        특징
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-text-secondary">
                    <tr className="border-b border-border-base">
                      <td className="py-2 pr-3 font-semibold">표면수익률</td>
                      <td>연월세 ÷ 매매가</td>
                      <td>제경비 미포함, 과장될 수 있음</td>
                    </tr>
                    <tr className="border-b border-border-base">
                      <td className="py-2 pr-3 font-semibold">순수익률</td>
                      <td>(연월세 − 제경비) ÷ 실투자금</td>
                      <td>제경비 포함, 정확한 수익</td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-3 font-semibold">실투자금</td>
                      <td>매매가 − 보증금 + 취득부대비용</td>
                      <td>갭투자 시 핵심 변수</td>
                    </tr>
                  </tbody>
                </table>
              </section>

              <section className="space-y-4">
                <h2 className="border-b border-border-base pb-2 text-2xl font-bold">
                  임대수익률이란 뭔가요?
                </h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  임대수익률은 부동산 투자로 얻는 연간 월세 수익을 투자 금액으로 나눈 비율을
                  뜻합니다. 간단히 말해 "내가 부동산에 투자한 돈이 1년에 몇 퍼센트 벌어주는가"를
                  나타내는 지표입니다.
                </p>
                <p className="text-text-secondary leading-relaxed">
                  <strong>기본 공식은 다음과 같습니다:</strong>
                </p>
                <div className="rounded-lg bg-bg-raised p-4">
                  <p className="font-mono text-sm font-semibold text-text-primary">
                    순수익률(%) = (연월세 − 연간 제경비) ÷ 실투자금 × 100
                  </p>
                  <p className="mt-3 text-xs text-text-tertiary">
                    · 연월세 = 월세 × 12 개월
                  </p>
                  <p className="text-xs text-text-tertiary">
                    · 실투자금 = 매매가 − 임대보증금 + 취득부대비용(취득세·중개수수료 등)
                  </p>
                  <p className="text-xs text-text-tertiary">
                    · 제경비 = 재산세, 보험, 관리비, 수리비 등 임대인 부담 연간 비용
                  </p>
                </div>
                <p className="text-text-secondary leading-relaxed">
                  다만 많은 부동산 광고는 제경비를 뺀 "순수익률" 대신 제경비를 포함하지 않은
                  "표면수익률"을 표기합니다. 높아 보이지만 실제 수익과는 다르므로, 항상 제경비를
                  먼저 조사한 후 순수익률로 판단해야 합니다.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="border-b border-border-base pb-2 text-2xl font-bold">
                  표면수익률 vs 순수익률 — 뭐가 다른가요?
                </h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  부동산 광고에서 자주 보는 "수익률 4%"라는 표현은 보통 제경비를 빼기 전의
                  "표면수익률"입니다. 반면 "순수익률"은 제경비를 모두 뺀 실제 수익입니다.
                </p>

                <div className="rounded-lg bg-bg-raised p-4">
                  <h3 className="mb-3 font-semibold text-text-primary">두 가지 수익률 비교</h3>
                  <ul className="space-y-3 text-sm text-text-secondary">
                    <li>
                      <strong>표면수익률(Gross Yield)</strong>
                      <br />
                      = 연월세 ÷ 매매가 × 100
                      <br />
                      예: 월세 70만 원 ÷ 매매가 2억 × 100 = 4.2%
                    </li>
                    <li>
                      <strong>순수익률(Net Yield)</strong>
                      <br />
                      = (연월세 − 제경비) ÷ 실투자금 × 100
                      <br />
                      예: (840만 − 100만) ÷ 1억9,600만 × 100 = 3.78%
                    </li>
                  </ul>
                </div>

                <p className="text-text-secondary leading-relaxed">
                  위 예시에서 표면수익률과 순수익률 차이는 0.42%p입니다. 부동산이 클수록 제경비가
                  크므로, 차이가 더 벌어질 수 있습니다. 투자 판단은 반드시 순수익률로 해야
                  실제 손익을 예측할 수 있습니다.
                </p>

                <p className="text-text-secondary leading-relaxed">
                  다만 제경비 추정값도 주관적이므로, 실제 비슷한 건물의 재산세·관리비·수리비
                  내역을 직접 확인하고 보수적으로 계산하는 것이 현명합니다. 시뮬레이션한 수익률이
                  현실과 다를 수 있으므로, 기간 경과 후에 실제 수익과 비교하여 가정값을 조정해야
                  합니다.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="border-b border-border-base pb-2 text-2xl font-bold">
                  실투자금은 어떻게 계산하나요?
                </h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  부동산을 구매할 때 매매가 전액을 내는 경우는 드물고, 보증금이나 전세금을 끼고
                  구매하는 "갭투자"가 흔합니다. 이 경우 실제로 투자하는 금액(실투자금)을 정확히
                  계산해야 수익률도 정확해집니다.
                </p>

                <div className="rounded-lg bg-bg-raised p-4">
                  <h3 className="mb-3 font-semibold text-text-primary">
                    실투자금 계산 공식
                  </h3>
                  <p className="text-sm font-mono text-text-primary">
                    실투자금 = 매매가 − 임대보증금(또는 전세금) + 취득부대비용
                  </p>
                  <p className="mt-3 text-xs text-text-tertiary">
                    · 매매가: 계약한 구매 가격
                  </p>
                  <p className="text-xs text-text-tertiary">
                    · 임대보증금 / 전세금: 세입자로부터 받는 선금(2년 후 반환해야 함)
                  </p>
                  <p className="text-xs text-text-tertiary">
                    · 취득부대비용: 취득세, 중개수수료, 등기비, 감정비, 인테리어 비용 등
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="mb-2 font-semibold text-text-primary">계산 사례 1: 보증금 있는 월세</h4>
                    <ul className="space-y-2 text-sm text-text-secondary">
                      <li>매매가: 2억 원</li>
                      <li>세입자 보증금: 1,000만 원</li>
                      <li>취득부대비용: 600만 원 (취득세 400만 + 중개수수료 200만)</li>
                      <li className="border-t border-border-base pt-2">
                        <strong>실투자금 = 2억 − 1,000만 + 600만 = 1억9,600만 원</strong>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="mb-2 font-semibold text-text-primary">계산 사례 2: 갭투자 (전세 끼고 매입)</h4>
                    <ul className="space-y-2 text-sm text-text-secondary">
                      <li>매매가: 3억 원</li>
                      <li>기존 전세보증금: 1.5억 원 (2년 후 반환해야 함)</li>
                      <li>취득부대비용: 600만 원</li>
                      <li className="border-t border-border-base pt-2">
                        <strong>실투자금 = 3억 − 1.5억 + 600만 = 1억5,600만 원</strong>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="mb-2 font-semibold text-text-primary">계산 사례 3: 오피스텔 (소액 투자)</h4>
                    <ul className="space-y-2 text-sm text-text-secondary">
                      <li>매매가: 1.5억 원</li>
                      <li>보증금: 500만 원</li>
                      <li>취득부대비용: 400만 원</li>
                      <li className="border-t border-border-base pt-2">
                        <strong>실투자금 = 1.5억 − 500만 + 400만 = 1억4,900만 원</strong>
                      </li>
                    </ul>
                  </div>
                </div>

                <p className="text-text-secondary leading-relaxed">
                  갭투자(사례 2)를 보면, 1.5억의 전세금을 끼고 구매하면 실제로 투자하는 돈은
                  1.56억이 됩니다. 전체 매매가가 3억이지만 실투자금 기준 수익률을 계산하면, 표면
                  수익률보다 훨씬 높아집니다.
                </p>

                <p className="text-text-secondary leading-relaxed">
                  다만 갭투자는 수익률이 높아지는 대신 리스크도 큽니다. 2년 후 전세보증금
                  1.5억을 일시불로 반환해야 하는데, 그사이 시세가 떨어지거나 월세 수익이 대출이자를
                  감당하지 못하면 손실이 날 수 있습니다. 따라서 갭투자는 신중하게 계획해야 합니다.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="border-b border-border-base pb-2 text-2xl font-bold">
                  제경비에는 뭐가 포함되나요?
                </h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  임대수익률을 계산할 때 가장 실수하기 쉬운 부분이 제경비 계산입니다. 제경비는
                  임대인이 부담하는 모든 연간 비용입니다. 건물 위치와 상태에 따라 크게 달라집니다.
                </p>

                <table className="w-full border-collapse text-sm">
                  <caption className="mb-2 text-left font-semibold text-text-primary">
                    제경비 주요 항목 (연간)
                  </caption>
                  <thead>
                    <tr className="border-b border-border-base">
                      <th scope="col" className="pb-2 pr-3 text-left font-semibold">
                        항목
                      </th>
                      <th scope="col" className="pb-2 text-left font-semibold">
                        설명
                      </th>
                      <th scope="col" className="pb-2 text-left font-semibold">
                        참고
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-text-secondary">
                    <tr className="border-b border-border-base">
                      <td className="py-2 pr-3">
                        <strong>재산세·종부세</strong>
                      </td>
                      <td>보유 부동산에 부과되는 세금</td>
                      <td>공시지가·건물평가액 기준</td>
                    </tr>
                    <tr className="border-b border-border-base">
                      <td className="py-2 pr-3">
                        <strong>건물관리비</strong>
                      </td>
                      <td>아파트 경우 월 관리비 × 12</td>
                      <td>오피스텔은 관리비 높음</td>
                    </tr>
                    <tr className="border-b border-border-base">
                      <td className="py-2 pr-3">
                        <strong>화재보험료</strong>
                      </td>
                      <td>건물 및 임차인 배상책임보험</td>
                      <td>연 30~50만원 수준</td>
                    </tr>
                    <tr className="border-b border-border-base">
                      <td className="py-2 pr-3">
                        <strong>수리·유지비</strong>
                      </td>
                      <td>벽지, 도배, 설비 교체 등</td>
                      <td>예측 어려움, 보수적 추정 필요</td>
                    </tr>
                    <tr className="border-b border-border-base">
                      <td className="py-2 pr-3">
                        <strong>공실 손실</strong>
                      </td>
                      <td>세입자 없는 기간의 월세 손실</td>
                      <td>평균 1~3개월 추정</td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-3">
                        <strong>대출이자 (선택)</strong>
                      </td>
                      <td>대출을 사용한 경우 연이자</td>
                      <td>현금 투자만 있으면 제외</td>
                    </tr>
                  </tbody>
                </table>

                <p className="text-text-secondary leading-relaxed">
                  위 사례(월세 70만, 연제경비 100만)에서 제경비 비율은 약 11.9%입니다. 강남 아파트와
                  지방 오피스텔의 제경비 비율이 크게 다를 수 있으므로, 투자 대상을 정할 때는 현지
                  비슷한 건물의 실제 제경비를 조사하고 보수적으로 추정하는 것이 중요합니다.
                </p>

                <p className="text-text-secondary leading-relaxed">
                  다만 제경비는 시간이 지나면서 변동됩니다. 재산세는 공시지가 변동에 따라
                  변하고, 건물이 노후되면 수리비가 증가합니다. 특히 장기 투자자는 10년 후 제경비가
                  현재의 1.5배 이상 증가할 수 있다고 보수적으로 가정하는 것이 현명합니다.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="border-b border-border-base pb-2 text-2xl font-bold">
                  실제 투자 시나리오로 수익률을 계산해봅시다
                </h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  지금까지 배운 공식을 실제 투자 시나리오에 적용해봅시다. 각 사례의 순수익률을
                  비교하면 실제 수익성 차이를 명확히 볼 수 있습니다.
                </p>

                <div className="space-y-4">
                  <div className="rounded-lg bg-bg-raised p-4">
                    <h3 className="mb-3 font-semibold text-text-primary">
                      시나리오 1: 강남 아파트 (월세)
                    </h3>
                    <ul className="space-y-2 text-sm text-text-secondary">
                      <li>· 매매가: 2억 원</li>
                      <li>· 보증금: 1,000만 원</li>
                      <li>· 취득부대: 600만 원</li>
                      <li>· 월세: 70만 원</li>
                      <li>· 연제경비: 100만 원</li>
                      <li className="border-t border-border-base pt-2">
                        <strong>
                          실투자금 = 2억 − 1,000만 + 600만 = 1억9,600만 원
                        </strong>
                      </li>
                      <li>
                        <strong>
                          순수익률 = (840만 − 100만) ÷ 1억9,600만 × 100 = 3.78%
                        </strong>
                      </li>
                    </ul>
                  </div>

                  <div className="rounded-lg bg-bg-raised p-4">
                    <h3 className="mb-3 font-semibold text-text-primary">
                      시나리오 2: 갭투자 (전세 끼고 매입, 높은 수익률)
                    </h3>
                    <ul className="space-y-2 text-sm text-text-secondary">
                      <li>· 매매가: 3억 원</li>
                      <li>· 전세보증금: 1.5억 원 (2년 후 반환)</li>
                      <li>· 취득부대: 600만 원</li>
                      <li>· 월세: 90만 원 (세입자)</li>
                      <li>· 연제경비: 150만 원</li>
                      <li className="border-t border-border-base pt-2">
                        <strong>
                          실투자금 = 3억 − 1.5억 + 600만 = 1억5,600만 원
                        </strong>
                      </li>
                      <li>
                        <strong>
                          순수익률 = (1,080만 − 150만) ÷ 1억5,600만 × 100 = 5.96%
                        </strong>
                      </li>
                    </ul>
                  </div>

                  <div className="rounded-lg bg-bg-raised p-4">
                    <h3 className="mb-3 font-semibold text-text-primary">
                      시나리오 3: 지방 오피스텔 (소액 투자)
                    </h3>
                    <ul className="space-y-2 text-sm text-text-secondary">
                      <li>· 매매가: 1.5억 원</li>
                      <li>· 보증금: 500만 원</li>
                      <li>· 취득부대: 400만 원</li>
                      <li>· 월세: 50만 원</li>
                      <li>· 연제경비: 80만 원</li>
                      <li className="border-t border-border-base pt-2">
                        <strong>
                          실투자금 = 1.5억 − 500만 + 400만 = 1억4,900만 원
                        </strong>
                      </li>
                      <li>
                        <strong>
                          순수익률 = (600만 − 80만) ÷ 1억4,900만 × 100 = 3.49%
                        </strong>
                      </li>
                    </ul>
                  </div>
                </div>

                <p className="text-text-secondary leading-relaxed">
                  위 세 사례를 비교하면, 시나리오 2(갭투자)의 수익률이 5.96%로 가장 높습니다. 하지만
                  갭투자는 2년 후 1.5억을 일시불로 반환해야 하는 리스크가 있습니다. 그 시점에 시세가
                  떨어졌거나 재정 상황이 나쁘면 손실을 입을 수 있습니다.
                </p>

                <p className="text-text-secondary leading-relaxed">
                  다만 높은 수익률에만 주목하여 갭투자를 무리하게 추진하면, 전세 만료 시점의
                  자금 부담, 금리 인상에 따른 대출이자 증가, 시세 하락에 따른 손실 등을 감당하지
                  못할 수 있습니다. 각 시나리오의 리스크와 수익을 함께 평가한 후 투자 결정을 해야
                  합니다.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="border-b border-border-base pb-2 text-2xl font-bold">
                  부동산 투자할 때 수익률 이외에 고려할 점
                </h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  임대수익률은 중요한 지표이지만, 이것만으로는 투자 결정을 할 수 없습니다. 함께
                  고려해야 할 요소들이 많습니다.
                </p>

                <div className="space-y-4">
                  <div className="rounded-lg bg-bg-raised p-4">
                    <h3 className="mb-2 font-semibold text-text-primary">
                      1. 시세차익 (자본이득)
                    </h3>
                    <p className="text-sm text-text-secondary">
                      임대수익률이 낮아도 시세가 크게 오르면 총 수익은 높아집니다. 예를 들어 수익률 2%인
                      부동산이 5년 후 시세가 50% 오르면, 총 수익은 (2% × 5년) + 50% = 60%가 됩니다. 따라서
                      투자 지역의 개발 전망, 인구 추이, 주변 시설 등을 함께 고려해야 합니다.
                    </p>
                  </div>

                  <div className="rounded-lg bg-bg-raised p-4">
                    <h3 className="mb-2 font-semibold text-text-primary">
                      2. 유동성 (매도 용이성)
                    </h3>
                    <p className="text-sm text-text-secondary">
                      수익률이 높아도 팔기 어려운 지역이라면, 현금이 필요할 때 손해를 입고 팔아야 할 수
                      있습니다. 강남, 송파, 서초 같은 강세 지역은 언제든 빨리 팔 수 있지만, 낙후 지역은
                      수개월 걸릴 수 있습니다.
                    </p>
                  </div>

                  <div className="rounded-lg bg-bg-raised p-4">
                    <h3 className="mb-2 font-semibold text-text-primary">
                      3. 공실 위험 (임차인 공백)
                    </h3>
                    <p className="text-sm text-text-secondary">
                      월세 수익이 안정적이려면 항상 세입자가 있어야 합니다. 만약 위치가 좋지 않아 3개월
                      이상 공실이 생기면, 그동안 월세 수익이 0이지만 제경비는 계속 나갑니다. 지역의 임차
                      수요를 먼저 조사해야 합니다.
                    </p>
                  </div>

                  <div className="rounded-lg bg-bg-raised p-4">
                    <h3 className="mb-2 font-semibold text-text-primary">
                      4. 금리 변동 위험 (대출 이용 시)
                    </h3>
                    <p className="text-sm text-text-secondary">
                      갭투자로 대출을 사용했다면, 금리가 오르면 이자 비용이 증가합니다. 월세 수익이 이자를
                      감당하지 못하면 손실이 납니다. 투자 시점에 금리 인상 시나리오도 함께 계산해야
                      합니다.
                    </p>
                  </div>

                  <div className="rounded-lg bg-bg-raised p-4">
                    <h3 className="mb-2 font-semibold text-text-primary">
                      5. 정부 정책 변화 (세법, 규제)
                    </h3>
                    <p className="text-sm text-text-secondary">
                      임대수익에 대한 세금, 보유세(종부세), 취득세 등이 정부 정책에 따라 변할 수 있습니다.
                      예를 들어 다주택 보유세가 강화되면, 실제 순수익이 낮아집니다. 법정 변화를 주시해야
                      합니다.
                    </p>
                  </div>
                </div>

                <p className="text-text-secondary leading-relaxed">
                  다만 부동산 투자는 결국 개인의 재정 상황, 투자 목표, 리스크 성향에 따라 달라집니다.
                  높은 수익률만 좇다가 예기치 않은 손실을 입을 수 있으므로, 보수적인 시나리오와
                  공격적인 시나리오를 함께 계획하고 진행해야 합니다.
                </p>
              </section>

              <AdSlot slot="guide-rental-yield-calculation-mid" format="rectangle" />

              <FaqSection items={FAQ_ITEMS} />

              <section className="card border-l-2 border-l-danger-500 bg-danger-500/5">
                <h2 className="mb-2 text-lg font-semibold text-danger-700 dark:text-danger-300">
                  주의사항 및 면책조항
                </h2>
                <ul className="space-y-2 text-sm text-danger-700 dark:text-danger-300">
                  <li>
                    • 본 가이드는 일반 부동산 정보 제공 목적이며, 특정 부동산 투자를 권유하지
                    않습니다.
                  </li>
                  <li>
                    • 임대수익률은 제경비 추정값에 따라 크게 변동되며, 실제 수익과 다를 수
                    있습니다.
                  </li>
                  <li>
                    • 시세 하락, 공실, 임차인 분쟁, 금리 인상 등 다양한 리스크가 존재합니다.
                  </li>
                  <li>
                    • 갭투자는 높은 수익률을 제공하지만, 전세금 반환 시점의 자금 부담이
                    큽니다. 신중하게 계획해야 합니다.
                  </li>
                  <li>
                    • 부동산 투자 전에 법무사, 감정평가사, 세무사 등 전문가 상담을 받으시기
                    바랍니다.
                  </li>
                  <li>
                    • 본 사이트는 투자 손실에 대한 책임을 지지 않으며, 모든 투자 결정은 본인
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
                      href="/calculator/rental-yield/"
                      className="text-primary-600 underline dark:text-primary-500"
                    >
                      임대수익률 계산기
                    </Link>{' '}
                    — 월세, 보증금, 제경비를 입력하여 순수익률 자동 계산
                  </li>
                  <li>
                    →{' '}
                    <Link
                      href="/calculator/loan/"
                      className="text-primary-600 underline dark:text-primary-500"
                    >
                      대출이자 계산기
                    </Link>{' '}
                    — 갭투자 시 대출이자 월 상환액 확인
                  </li>
                  <li>
                    →{' '}
                    <Link
                      href="/calculator/loan-limit/"
                      className="text-primary-600 underline dark:text-primary-500"
                    >
                      대출한도 계산기 (DSR/LTV)
                    </Link>{' '}
                    — 부동산 구매 시 최대 대출 한도 확인
                  </li>
                  <li>
                    →{' '}
                    <Link
                      href="/guide/ltv-calculation-2026/"
                      className="text-primary-600 underline dark:text-primary-500"
                    >
                      LTV 계산법 2026
                    </Link>{' '}
                    — 담보인정비율·대출가능액·DSR/DTI 차이
                  </li>
                  <li>
                    →{' '}
                    <Link
                      href="/calculator/broker-fee/"
                      className="text-primary-600 underline dark:text-primary-500"
                    >
                      중개수수료 계산기
                    </Link>{' '}
                    — 취득부대비용 추정 (중개수수료·취득세)
                  </li>
                  <li>
                    →{' '}
                    <Link
                      href="/category/real-estate/"
                      className="text-primary-600 underline dark:text-primary-500"
                    >
                      부동산 카테고리
                    </Link>{' '}
                    — 전월세·평수·전환율·임대수익률 모든 계산기
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
                    href="https://www.moef.go.kr/"
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="text-primary-600 underline dark:text-primary-500"
                  >
                    기획재정부 부동산 세금
                  </a>
                  ,{' '}
                  <a
                    href="https://www.re.go.kr/"
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="text-primary-600 underline dark:text-primary-500"
                  >
                    한국부동산원
                  </a>
                  ,{' '}
                  <a
                    href="https://www.reb.or.kr/"
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="text-primary-600 underline dark:text-primary-500"
                  >
                    한국감정원 공시가격
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
