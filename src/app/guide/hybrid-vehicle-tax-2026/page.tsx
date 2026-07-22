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

const URL = 'https://calculatorhost.com/guide/hybrid-vehicle-tax-2026/';
const DATE_PUBLISHED = '2026-06-25';
const DATE_MODIFIED = '2026-06-25';

export const metadata: Metadata = {
  title: '하이브리드 자동차세 2026 — 배기량 cc 과세·차령경감·전기차 정액 비교',
  description:
    '하이브리드 자동차세는 전기차처럼 정액 과세가 아니라 내연기관 배기량 기준 cc 과세입니다. 2026년 배기량별 세율, 차령경감, 전기차와의 차이를 명확히 정리합니다.',
  keywords: [
    '하이브리드 자동차세',
    'HEV PHEV 자동차세',
    '배기량 cc 세율',
    '차령경감',
    '전기차 정액 과세',
    '하이브리드 세금',
    '자동차세 2026',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [
      {
        url: '/og-default.png',
        width: 1200,
        height: 630,
        alt: '하이브리드 자동차세 2026 — 배기량 cc 과세·차령경감·전기차 정액 비교',
      },
    ],
    title: '하이브리드 자동차세 2026',
    description: '하이브리드는 전기차와 달리 배기량 cc 과세 + 차령경감 적용. 세율 및 실제 세액 계산.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '하이브리드 자동차세 2026',
    description: '배기량 기준 cc 과세 세율과 전기차 정액(13만원) 과세의 차이점',
  },
};

const FAQ_ITEMS = [
  {
    question: '하이브리드는 전기차처럼 자동차세가 13만원 정액인가요?',
    answer:
      '아닙니다. 하이브리드(HEV/PHEV)는 내연기관이 있어 배기량 cc 기준으로 과세되며, 전기차는 배기량이 없어 정액 13만원으로 과세됩니다. 같은 금액이 아닙니다.',
  },
  {
    question: '하이브리드 자동차세는 어떻게 계산하나요?',
    answer:
      '배기량(cc) × 세율을 기본으로 합니다. 예: 1,598cc HEV = 1,598 × 140원 = 약 22만원. 여기에 지방교육세(30%)와 차령경감을 추가로 적용합니다.',
  },
  {
    question: '1,500cc 가솔린과 1,500cc 하이브리드 자동차세가 같은가요?',
    answer:
      '네, 같습니다. 둘 다 내연기관 배기량이 1,500cc이므로 동일하게 1,500 × 140 = 21만원(+지방교육세 6.3만원) 과세됩니다. 동력원 상관없이 cc만 기준입니다.',
  },
  {
    question: '하이브리드도 차령경감이 적용되나요?',
    answer:
      '네, 적용됩니다. 3년차부터 연 5% 감액되므로, 5년차 = 15% 할인입니다. 예: 3년차 = 5%, 4년차 = 10%, 5년차 = 15%, 최대 50%(12년차+).',
  },
  {
    question: 'PHEV(플러그인 하이브리드)도 하이브리드와 같은 세율인가요?',
    answer:
      '네, 같습니다. PHEV도 내연기관 배기량이 있으면 그 cc에 따라 배기량 세율이 적용되며 차령경감도 받습니다. 단순히 충전식이라고 다른 것은 아닙니다.',
  },
  {
    question: '수소차는 전기차처럼 정액 과세 13만원인가요?',
    answer:
      '네, 정액 과세입니다. 수소전기차(FCEV)는 배기량이 없어 전기차와 같이 연 13만원(지방교육세 포함)으로 정액 과세되며 차령경감도 없습니다.',
  },
  {
    question: '하이브리드 자동차세를 줄일 수 있는 방법이 있나요?',
    answer:
      '주요 방법은 1월에 일시납으로 5% 할인을 받거나, 차령경감 혜택(3년차 이상)을 받는 것입니다. 그 외 특별 감면 정책은 지역·차량 유형에 따라 다르니 관할 시·군·구청이나 위택스·이택스에 문의하세요.',
  },
];

export default function HybridVehicleTax2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '하이브리드 자동차세 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '하이브리드 자동차세 2026',
    description:
      '하이브리드(HEV/PHEV)는 배기량 cc 기준 과세이며 차령경감이 적용됩니다. 2026년 배기량별 세율 및 전기차와의 차이를 상세히 정리합니다.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: [
      '하이브리드 자동차세',
      '배기량 cc',
      '차령경감',
      '전기차 정액 과세',
      'HEV PHEV',
    ],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '하이브리드 자동차세 2026 | calculatorhost',
    description: '하이브리드 배기량 cc 과세 세율, 차령경감, 전기차 비교.',
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
                    { name: '하이브리드 자동차세 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">
                  자동차 소유자 · 8분 읽기 · 2026-06-25
                </p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  하이브리드 자동차세 2026
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  하이브리드 차량을 구매하면서 자동차세가 얼마나 될지 궁금한 분들이 많습니다.
                  특히 전기차는 13만원 정액이라는 소문 때문에 하이브리드도 비슷할 거라고 생각하기
                  쉽습니다. 하지만 현실은 다릅니다. 하이브리드는 내연기관이 있어 배기량 기준으로
                  과세되며, 차령에 따라 경감까지 받습니다. 이 가이드에서는 하이브리드 자동차세의
                  정확한 계산법과 전기차와의 차이를 명확히 설명합니다.
                </p>
              </header>

              <AdSlot slot="guide-hybrid-vehicle-tax-top" format="horizontal" />

              <section aria-label="요약" className="card border-l-4 border-l-primary-500">
                <h2 className="mb-2 text-caption uppercase tracking-wider text-primary-500">
                  핵심 요약
                </h2>
                <table className="w-full border-collapse text-sm">
                  <caption className="mb-2 text-left font-semibold text-text-primary">
                    하이브리드 vs 전기차 자동차세 비교 (2026)
                  </caption>
                  <thead>
                    <tr className="border-b border-border-base">
                      <th scope="col" className="pb-2 pr-3 text-left font-semibold">
                        구분
                      </th>
                      <th scope="col" className="pb-2 text-left font-semibold">
                        과세 기준
                      </th>
                      <th scope="col" className="pb-2 text-left font-semibold">
                        연 세액 예시
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-text-secondary">
                    <tr className="border-b border-border-base">
                      <td className="py-2 pr-3 font-semibold">하이브리드 (1,598cc)</td>
                      <td>배기량 cc × 세율 (지방세법 §127①1호)</td>
                      <td>약 29만원 (차령경감 전)</td>
                    </tr>
                    <tr className="border-b border-border-base">
                      <td className="py-2 pr-3 font-semibold">전기차 (배기량 없음)</td>
                      <td>정액 (지방세법 §127①3호)</td>
                      <td>13만원 (고정)</td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-3 font-semibold">수소차 (배기량 없음)</td>
                      <td>정액 (지방세법 §127①3호)</td>
                      <td>13만원 (고정)</td>
                    </tr>
                  </tbody>
                </table>
                <div className="mt-4 rounded-lg bg-bg-raised p-3 text-sm">
                  <p className="mb-2 font-semibold text-text-primary">
                    TL;DR: 하이브리드는 배기량 cc 과세, 전기차는 정액 13만
                  </p>
                  <ul className="space-y-1 text-text-secondary">
                    <li>
                      • 하이브리드(HEV/PHEV)는 내연기관 배기량이 있어 §127①제1호 배기량 세율 적용
                    </li>
                    <li>• 전기차(BEV)·수소차(FCEV)는 배기량이 없어 §127①제3호 정액(13만원) 적용</li>
                    <li>• 차령경감: 하이브리드만 3년차 이상 적용 (연 5%, 최대 50%)</li>
                  </ul>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="border-b border-border-base pb-2 text-2xl font-bold">
                  하이브리드 자동차세는 어떻게 과세되나요?
                </h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  하이브리드(HEV, 일반 하이브리드) 및 PHEV(플러그인 하이브리드)는 내연기관을 가지고
                  있습니다. 따라서 배기량(cc)을 기준으로 자동차세가 결정됩니다.
                </p>
                <p className="text-text-secondary leading-relaxed">
                  <strong>기본 공식:</strong>
                </p>
                <div className="rounded-lg bg-bg-raised p-4">
                  <p className="font-mono text-sm font-semibold text-text-primary">
                    자동차세 = 배기량(cc) × 세율(원/cc)
                  </p>
                  <p className="mt-2 text-xs text-text-tertiary">
                    지방세법 §127①제1호. 지방교육세는 별도 30% 추가.
                  </p>
                </div>
                <p className="text-text-secondary leading-relaxed">
                  예를 들어 1,600cc 하이브리드라면, 1,600 × 140원/cc = 224,000원이 자동차세의 기본
                  세액입니다. 여기에 지방교육세(224,000 × 30% = 67,200원)를 합하면 약 29만원이
                  연 자동차세 총액입니다.
                </p>

                <p className="text-text-secondary leading-relaxed">
                  다만 차량 구매 시점의 배기량이 모두 기준이 됩니다. 같은 모델이라도 연식이나
                  트림에 따라 배기량이 1,400cc ~ 1,700cc 범위로 다를 수 있으므로, 자신의 차량
                  등록증(자동차등록원부)에 기재된 배기량을 확인하는 것이 중요합니다.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="border-b border-border-base pb-2 text-2xl font-bold">
                  배기량별 자동차세 세율은 얼마인가요?
                </h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  하이브리드 자동차세의 세율은 배기량에 따라 3단계로 나뉩니다. (지방세법 §127①제1호)
                </p>

                <table className="w-full border-collapse text-sm">
                  <caption className="mb-2 text-left font-semibold text-text-primary">
                    배기량별 자동차세 세율 (2026)
                  </caption>
                  <thead>
                    <tr className="border-b border-border-base">
                      <th scope="col" className="pb-2 pr-3 text-left font-semibold">
                        배기량 구간
                      </th>
                      <th scope="col" className="pb-2 text-left font-semibold">
                        세율 (원/cc)
                      </th>
                      <th scope="col" className="pb-2 text-left font-semibold">
                        연 기본 세액 예시
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-text-secondary">
                    <tr className="border-b border-border-base">
                      <td className="py-2 pr-3 font-semibold">1,000cc 이하</td>
                      <td>80원/cc</td>
                      <td>8만원 (1,000cc 기준)</td>
                    </tr>
                    <tr className="border-b border-border-base">
                      <td className="py-2 pr-3 font-semibold">1,001cc ~ 1,600cc</td>
                      <td>140원/cc</td>
                      <td>22.4만원 (1,600cc 기준)</td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-3 font-semibold">1,601cc 이상</td>
                      <td>200원/cc</td>
                      <td>약 32만원 (1,601cc 기준)</td>
                    </tr>
                  </tbody>
                </table>

                <div className="rounded-lg bg-bg-raised p-4">
                  <h3 className="mb-3 font-semibold text-text-primary">실제 계산 사례</h3>
                  <ul className="space-y-3 text-sm text-text-secondary">
                    <li>
                      <strong>사례 1: 1,498cc 하이브리드 (신차)</strong>
                      <br />
                      자동차세 = 1,498 × 140 = 209,720원
                      <br />
                      지방교육세 = 209,720 × 30% = 62,916원
                      <br />
                      합계 = 약 272,636원 (연간)
                    </li>
                    <li>
                      <strong>사례 2: 1,598cc 하이브리드 (신차)</strong>
                      <br />
                      자동차세 = 1,598 × 140 = 223,720원
                      <br />
                      지방교육세 = 223,720 × 30% = 67,116원
                      <br />
                      합계 = 약 290,836원 (연간)
                    </li>
                    <li>
                      <strong>사례 3: 1,995cc 가솔린 (일반 엔진)</strong>
                      <br />
                      자동차세 = 1,995 × 200 = 399,000원
                      <br />
                      지방교육세 = 399,000 × 30% = 119,700원
                      <br />
                      합계 = 약 518,700원 (연간)
                    </li>
                  </ul>
                </div>

                <p className="text-text-secondary leading-relaxed">
                  다만 1,001~1,600cc 구간의 경계가 중요합니다. 1,600cc와 1,601cc는 1원의 차이지만
                  세율이 140원에서 200원으로 크게 올라갑니다. 따라서 자신의 정확한 배기량을
                  확인하고 계산하는 것이 매우 중요합니다.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="border-b border-border-base pb-2 text-2xl font-bold">
                  차령경감은 뭔가요? 몇 년부터 받나요?
                </h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  차령경감은 자동차가 오래될수록 자동차세를 깎아주는 제도입니다. 하이브리드는 이
                  혜택을 받을 수 있습니다. (지방세법 §127①제2호)
                </p>

                <div className="rounded-lg bg-bg-raised p-4">
                  <h3 className="mb-3 font-semibold text-text-primary">차령경감 규칙</h3>
                  <ul className="space-y-2 text-sm text-text-secondary">
                    <li>
                      <strong>시작점:</strong> 차량 등록 후 3년차부터 시작
                    </li>
                    <li>
                      <strong>감액률:</strong> 연 5% (매년 누적)
                    </li>
                    <li>
                      <strong>공식:</strong> (차령 − 2) × 5% (단, 50% 상한)
                    </li>
                    <li>
                      <strong>상한선:</strong> 12년차부터 최대 50% 할인 유지
                    </li>
                  </ul>
                </div>

                <table className="w-full border-collapse text-sm">
                  <caption className="mb-2 text-left font-semibold text-text-primary">
                    차령별 경감율 예시
                  </caption>
                  <thead>
                    <tr className="border-b border-border-base">
                      <th scope="col" className="pb-2 pr-3 text-left font-semibold">
                        차령 (년)
                      </th>
                      <th scope="col" className="pb-2 text-left font-semibold">
                        경감율
                      </th>
                      <th scope="col" className="pb-2 text-left font-semibold">
                        공식
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-text-secondary">
                    <tr className="border-b border-border-base">
                      <td className="py-2 pr-3">신차 ~ 2년차</td>
                      <td>0% (할인 없음)</td>
                      <td>-</td>
                    </tr>
                    <tr className="border-b border-border-base">
                      <td className="py-2 pr-3">3년차</td>
                      <td>5%</td>
                      <td>(3−2)×5%</td>
                    </tr>
                    <tr className="border-b border-border-base">
                      <td className="py-2 pr-3">5년차</td>
                      <td>15%</td>
                      <td>(5−2)×5%</td>
                    </tr>
                    <tr className="border-b border-border-base">
                      <td className="py-2 pr-3">10년차</td>
                      <td>40%</td>
                      <td>(10−2)×5%</td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-3">12년차 이상</td>
                      <td>50% (상한)</td>
                      <td>상한선</td>
                    </tr>
                  </tbody>
                </table>

                <div className="rounded-lg bg-bg-raised p-4">
                  <h3 className="mb-3 font-semibold text-text-primary">
                    차령경감 적용 사례 (1,598cc HEV)
                  </h3>
                  <ul className="space-y-3 text-sm text-text-secondary">
                    <li>
                      <strong>신차 (0년차):</strong> 자동차세 223,720 + 지교세 67,116 = 290,836원
                    </li>
                    <li>
                      <strong>3년차:</strong> 290,836 × (1 − 5%) = 276,294원 (약 14,500원 절감)
                    </li>
                    <li>
                      <strong>5년차:</strong> 290,836 × (1 − 15%) = 247,210원 (약 43,600원 절감)
                    </li>
                    <li>
                      <strong>10년차:</strong> 290,836 × (1 − 40%) = 174,502원 (약 116,300원 절감)
                    </li>
                    <li>
                      <strong>12년차 이상:</strong> 290,836 × (1 − 50%) = 145,418원 (약 145,400원
                      절감)
                    </li>
                  </ul>
                </div>

                <p className="text-text-secondary leading-relaxed">
                  다만 차령경감은 자동으로 적용되지 않습니다. 등록 후 적용해야 하므로, 매해 5월
                  자동차세 고지서를 확인할 때 경감액이 제대로 반영되었는지 확인하세요. 혹시
                  빠졌다면 관할 시·군·구청이나 이택스에서 직접 신청할 수 있습니다.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="border-b border-border-base pb-2 text-2xl font-bold">
                  하이브리드와 전기차의 자동차세 차이는 정확히 뭔가요?
                </h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  이것이 가장 중요한 부분입니다. 하이브리드와 전기차는 과세 방식이 완전히 다릅니다.
                </p>

                <div className="space-y-4">
                  <div className="rounded-lg bg-bg-raised p-4">
                    <h3 className="mb-2 font-semibold text-text-primary">
                      ① 하이브리드 (HEV/PHEV)
                    </h3>
                    <p className="text-sm text-text-secondary">
                      <strong>법적 기준:</strong> 지방세법 §127①제1호
                    </p>
                    <p className="text-sm text-text-secondary">
                      <strong>과세 방식:</strong> 배기량(cc) 기준 비례 과세
                    </p>
                    <p className="text-sm text-text-secondary">
                      <strong>세액 범위:</strong> 8만원 ~ 30만원+ (배기량에 따라)
                    </p>
                    <p className="text-sm text-text-secondary">
                      <strong>차령경감:</strong> 3년차부터 연 5% (최대 50%)
                    </p>
                    <p className="text-xs text-text-tertiary mt-2">
                      내연기관이 있어 배기량 cc로 세금을 계산. 차가 오래될수록 세금이 깎인다.
                    </p>
                  </div>

                  <div className="rounded-lg bg-bg-raised p-4">
                    <h3 className="mb-2 font-semibold text-text-primary">
                      ② 전기차 (BEV) · 수소차 (FCEV)
                    </h3>
                    <p className="text-sm text-text-secondary">
                      <strong>법적 기준:</strong> 지방세법 §127①제3호
                    </p>
                    <p className="text-sm text-text-secondary">
                      <strong>과세 방식:</strong> 정액 과세 (배기량 없음)
                    </p>
                    <p className="text-sm text-text-secondary">
                      <strong>세액:</strong> 연 13만원 고정 (지방교육세 포함)
                    </p>
                    <p className="text-sm text-text-secondary">
                      <strong>차령경감:</strong> 미적용 (차령 무관 매년 13만원)
                    </p>
                    <p className="text-xs text-text-tertiary mt-2">
                      배기량이 없어 정액으로만 과세. 신차 1년차나 15년차나 동일.
                    </p>
                  </div>
                </div>

                <table className="w-full border-collapse text-sm">
                  <caption className="mb-2 text-left font-semibold text-text-primary">
                    하이브리드 vs 전기차 비교표
                  </caption>
                  <thead>
                    <tr className="border-b border-border-base">
                      <th scope="col" className="pb-2 pr-3 text-left font-semibold">
                        항목
                      </th>
                      <th scope="col" className="pb-2 text-left font-semibold">
                        하이브리드
                      </th>
                      <th scope="col" className="pb-2 text-left font-semibold">
                        전기차
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-text-secondary">
                    <tr className="border-b border-border-base">
                      <td className="py-2 pr-3 font-semibold">배기량</td>
                      <td>있음 (예: 1,598cc)</td>
                      <td>없음</td>
                    </tr>
                    <tr className="border-b border-border-base">
                      <td className="py-2 pr-3 font-semibold">세금 기준</td>
                      <td>cc 비례</td>
                      <td>정액</td>
                    </tr>
                    <tr className="border-b border-border-base">
                      <td className="py-2 pr-3 font-semibold">신차 연간 세액</td>
                      <td>약 21~32만원</td>
                      <td>13만원 (고정)</td>
                    </tr>
                    <tr className="border-b border-border-base">
                      <td className="py-2 pr-3 font-semibold">5년차 세액</td>
                      <td>약 18~27만원 (15% 할인)</td>
                      <td>13만원 (고정)</td>
                    </tr>
                    <tr className="border-b border-border-base">
                      <td className="py-2 pr-3 font-semibold">차령경감</td>
                      <td>3년차부터 적용</td>
                      <td>미적용</td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-3 font-semibold">법적 근거</td>
                      <td>지방세법 §127①제1호</td>
                      <td>지방세법 §127①제3호</td>
                    </tr>
                  </tbody>
                </table>

                <p className="text-text-secondary leading-relaxed">
                  결론은 이렇습니다. 배기량이 있는 하이브리드는 배기량 세율이 적용되고 차령경감
                  혜택도 있지만, 배기량이 없는 전기차는 정액 13만원만 내면 됩니다. 따라서
                  <strong>
                    자동차세만 보면 전기차가 훨씬 유리합니다
                  </strong>
                  .
                </p>

                <p className="text-text-secondary leading-relaxed">
                  다만 자동차세는 차량 구매 의사결정의 작은 부분입니다. 구매가, 유지비, 충전
                  인프라, 주행거리, 에너지 효율 등을 함께 종합적으로 판단하고 선택하는 것이
                  중요합니다.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="border-b border-border-base pb-2 text-2xl font-bold">
                  1월에 일시납으로 자동차세를 깎을 수 있나요?
                </h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  네, 가능합니다. 자동차세를 1월에 일시납하면 5% 할인을 받을 수 있습니다.
                  (지방세법 시행령 §125)
                </p>

                <div className="rounded-lg bg-bg-raised p-4">
                  <h3 className="mb-3 font-semibold text-text-primary">
                    1월 일시납 할인 계산 (1,598cc HEV 신차 기준)
                  </h3>
                  <ul className="space-y-2 text-sm text-text-secondary">
                    <li>
                      <strong>기본 세액:</strong> 약 290,836원 (연간)
                    </li>
                    <li>
                      <strong>할인액:</strong> 290,836 × 5% ≈ 14,542원
                    </li>
                    <li>
                      <strong>납부액:</strong> 290,836 − 14,542 = 약 276,294원
                    </li>
                    <li className="text-xs text-text-tertiary">
                      매년 1월 1~31일 신청 가능. 이후 신청은 할인 미적용.
                    </li>
                  </ul>
                </div>

                <p className="text-text-secondary leading-relaxed">
                  실제로는 5% 할인이 그리 큰 금액이 아니지만, 받을 수 있는 혜택이므로 매년 1월에
                  신청하는 것이 좋습니다. 이택스(etax) 또는 관할 시·군·구청에서 신청할 수 있으며, 자동
                  납부 설정도 가능합니다.
                </p>

                <p className="text-text-secondary leading-relaxed">
                  다만 1월 일시납 기한(1월 31일)을 놓치면 5월 납부 기한(5월 말)에 기본 세액 전액을
                  납부해야 합니다. 미납 시 연체료(0.3%/일)가 가산되므로 반드시 기한을 확인하세요.
                </p>
              </section>

              <AdSlot slot="guide-hybrid-vehicle-tax-mid" format="rectangle" />

              <FaqSection items={FAQ_ITEMS} />

              <section className="card border-l-2 border-l-danger-500 bg-danger-500/5">
                <h2 className="mb-2 text-lg font-semibold text-danger-700 dark:text-danger-300">
                  주의사항 및 면책조항
                </h2>
                <ul className="space-y-2 text-sm text-danger-700 dark:text-danger-300">
                  <li>
                    • 본 가이드는 일반 정보 제공 목적이며, 실제 세무 처리의 정확성을 보장하지
                    않습니다.
                  </li>
                  <li>
                    • 자동차세 세율·차령경감·할인 규정은{' '}
                    <strong>지방세법에 따라 수시 변동</strong>될 수 있으므로, 정확한 정보는 관할
                    시·군·구청 또는 이택스(etax) 공식 안내를 확인하세요.
                  </li>
                  <li>
                    • 개별 차량의 배기량, 차령, 규제 지역 등에 따라 실제 세액이 달라질 수 있습니다.
                  </li>
                  <li>
                    • 특별히 지자체 감면 정책이나 환경차량 기타 세제 혜택이 있을 수 있으므로,
                    해당 지역의 최신 정보를 확인하세요.
                  </li>
                  <li>
                    • 본 사이트는 세금 관련 상담을 제공하지 않으며, 실제 납부·환급·이의제기는
                    관할 지자체(시·군·구청)의 안내를 받으시기 바랍니다.
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
                    — 배기량 입력으로 즉시 연 세액 계산
                  </li>
                  <li>
                    →{' '}
                    <Link
                      href="/guide/electric-vehicle-tax-2026/"
                      className="text-primary-600 underline dark:text-primary-500"
                    >
                      전기차 자동차세 2026 — 배기량 없어 정액 13만
                    </Link>{' '}
                    — 전기차 vs 하이브리드 세금 차이
                  </li>
                  <li>
                    →{' '}
                    <Link
                      href="/guide/vehicle-tax-2026/"
                      className="text-primary-600 underline dark:text-primary-500"
                    >
                      자동차세 세율 2026 — 배기량·차령·차량종별 정리
                    </Link>{' '}
                    — 모든 자동차세 정보 한곳에
                  </li>
                  <li>
                    →{' '}
                    <Link
                      href="/guide/vehicle-tax-calculation-2026/"
                      className="text-primary-600 underline dark:text-primary-500"
                    >
                      자동차세 계산법 2026 — 차령경감·취등록세·1월 할인
                    </Link>{' '}
                    — 실제 납부액 산출 가이드
                  </li>
                  <li>
                    →{' '}
                    <Link
                      href="/category/lifestyle/"
                      className="text-primary-600 underline dark:text-primary-500"
                    >
                      생활 계산기 카테고리
                    </Link>{' '}
                    — 자동차, 임대, 환율 등 생활 관련 모든 계산기
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
                    법제처 국가법령정보센터 (지방세법 §127)
                  </a>
                  ,{' '}
                  <a
                    href="https://www.wetax.go.kr/"
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="text-primary-600 underline dark:text-primary-500"
                  >
                    위택스 공식 안내
                  </a>
                  ,{' '}
                  <a
                    href="https://etax.seoul.go.kr/"
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="text-primary-600 underline dark:text-primary-500"
                  >
                    서울시 이택스
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
