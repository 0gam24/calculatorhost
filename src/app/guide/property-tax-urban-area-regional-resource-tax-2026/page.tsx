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

const URL = 'https://calculatorhost.com/guide/property-tax-urban-area-regional-resource-tax-2026/';
const DATE_PUBLISHED = '2026-06-25';
const DATE_MODIFIED = '2026-06-25';

export const metadata: Metadata = {
  title: '재산세 도시지역분·지역자원시설세 2026 — 고지서 항목 완전 정리',
  description:
    '7월 재산세 고지서를 받으면 본세 외에 도시지역분·지역자원시설세·지방교육세가 함께 붙어옵니다. 각 항목이 무엇이고 어떻게 계산되는지, 고지서를 읽는 방법을 명확히 정리합니다. 2026년 기준.',
  keywords: [
    '재산세',
    '도시지역분',
    '지역자원시설세',
    '재산세 고지서',
    '재산세 계산',
    '지방교육세',
    '재산세 항목',
    '주택 세금',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [
      {
        url: '/og-default.png',
        width: 1200,
        height: 630,
        alt: '재산세 도시지역분·지역자원시설세 2026 — 고지서 항목 완전 정리',
      },
    ],
    title: '재산세 도시지역분·지역자원시설세 2026',
    description: '7월 재산세 고지서의 4개 항목(본세·도시지역분·지역자원시설세·지방교육세)을 이해하는 방법',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '재산세 도시지역분·지역자원시설세 2026',
    description: '고지서의 4개 세금 항목 계산 원리와 의미',
  },
};

const FAQ_ITEMS = [
  {
    question: '도시지역분이 뭐가 붙는 이유가 뭔가요?',
    answer:
      '도시지역분은 도시계획구역이나 도시 내 부동산에 부과되는 지방세입니다(지방세법 §112). 옛날의 도시계획세를 통합한 것으로, 도시 기반시설 유지·확충(도로, 상수도, 하수도 등) 재원 목적입니다. 도시 경계 안의 주택이면 자동으로 붙으므로 선택할 수 없습니다.',
  },
  {
    question: '지역자원시설세는 뭔가요?',
    answer:
      '지역자원시설세는 지방세법 §146에 따라 건축물·주택의 건물분 시가표준액을 기준으로 부과되는 세금입니다. 소방시설, 환경시설, 관광시설, 문화시설 등 지역 공공시설의 설치·운영 재원을 마련하기 위함입니다. 도시지역분과 달리 누진세율 구조로 시가표준액이 높을수록 세율이 올라갑니다.',
  },
  {
    question: '재산세 본세·도시지역분·지역자원시설세·지방교육세 차이가 뭔가요?',
    answer:
      '고지서에 적힌 4개 항목의 역할이 다릅니다. 본세(지방세법 §111)는 공시가격 기준으로 지방정부 운영 재원용, 도시지역분(§112)은 도시 기반시설(도로·상수도) 재원용, 지역자원시설세(§146)는 소방·환경시설 재원용, 지방교육세(§151)는 교육 재원용입니다. 셋 다 합쳐야 실제 내는 재산세 총액이 됩니다.',
  },
  {
    question: '과세표준이 뭐고 어떻게 계산되나요?',
    answer:
      '과세표준은 세금을 계산하는 기준이 됩니다. 재산세의 경우 공시가격에 공정시장가액비율(주택 60%)을 곱해서 구합니다(지방세법 §114). 예를 들어 공시가격이 3억 원이면 과세표준은 3억 × 60% = 1.8억 원이 됩니다. 이 과세표준에 세율을 곱해 세액을 계산합니다.',
  },
  {
    question: '1세대1주택이면 재산세가 낮아지나요?',
    answer:
      '네, 맞습니다. 공시가격 9억 원 이하인 1세대1주택은 본세에 세율 특례를 받습니다(지방세법 §111의2). 일반 세율보다 낮은 특례세율이 적용되어 약 절반 수준으로 낮아집니다. 다만 도시지역분과 지역자원시설세는 특례가 없어 정상 부과되고, 지방교육세는 본세에 연동돼 함께 줄어듭니다.',
  },
  {
    question: '지방교육세는 왜 따로 붙나요?',
    answer:
      '지방교육세(지방세법 §151)는 학교 운영·교육시설 확충 재원으로 쓰입니다. 재산세 본세의 20%가 자동으로 붙는 구조입니다. 따라서 본세가 높아지면 지방교육세도 함께 올라갑니다. 이는 재산세 납부자가 지역 교육에 기여하는 방식입니다.',
  },
  {
    question: '고지서에 "부과액"과 "납부액"이 다른데, 왜 그런가요?',
    answer:
      '부과액은 계산된 세액, 납부액은 실제 내는 금액입니다. 차이는 보유세 감면(정책 지원), 농어촌특별세 감면, 또는 기납금(미리 낸 돈)이 있을 때 생깁니다. 고지서를 받으면 항상 부과액과 납부액을 함께 확인하세요.',
  },
];

export default function PropertyTaxUrbanAreaRegionalResourceTax2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '재산세 도시지역분·지역자원시설세 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '재산세 도시지역분·지역자원시설세 2026 — 고지서 항목 완전 정리',
    description:
      '7월 재산세 고지서의 4개 항목(재산세 본세·도시지역분·지역자원시설세·지방교육세)을 명확히 이해하는 방법',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['재산세', '도시지역분', '지역자원시설세', '지방교육세', '재산세 계산', '고지서'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '재산세 도시지역분·지역자원시설세 2026 | calculatorhost',
    description:
      '7월 재산세 고지서를 받으면 붙는 4개 항목의 의미와 계산 원리를 정리합니다.',
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
                    { name: '재산세 도시지역분·지역자원시설세 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">
                  세금 · 8분 읽기 · 2026-06-25
                </p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  재산세 도시지역분·지역자원시설세 2026
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  7월이 되면 주택 소유자들이 재산세 고지서를 받습니다. 고지서를 열어보면 "재산세
                  본세", "도시지역분", "지역자원시설세", "지방교육세" 4개 항목이 함께 적혀 있습니다.
                  많은 사람들이 이 항목들을 구분하지 못하고 합쳐진 총액만 내곤 합니다. 하지만 각
                  항목이 무엇을 의미하고, 어떻게 계산되는지 알면 고지서를 정확히 읽을 수 있고, 자신의
                  세금이 타당한 수준인지 판단할 수 있습니다. 이 가이드에서는 고지서의 4개 항목을
                  명확히 정리합니다.
                </p>
              </header>

              <AdSlot slot="guide-property-tax-urban-regional-top" format="horizontal" />

              <section aria-label="요약" className="card border-l-4 border-l-primary-500">
                <h2 className="mb-2 text-caption uppercase tracking-wider text-primary-500">
                  핵심 요약
                </h2>
                <table className="w-full border-collapse text-sm">
                  <caption className="mb-2 text-left font-semibold text-text-primary">
                    재산세 고지서의 4개 항목 구성 (2026 기준)
                  </caption>
                  <thead>
                    <tr className="border-b border-border-base">
                      <th scope="col" className="pb-2 pr-3 text-left font-semibold">
                        항목명
                      </th>
                      <th scope="col" className="pb-2 text-left font-semibold">
                        계산 기준
                      </th>
                      <th scope="col" className="pb-2 text-left font-semibold">
                        법적 근거
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-text-secondary">
                    <tr className="border-b border-border-base">
                      <td className="py-2 pr-3 font-semibold">① 재산세 본세</td>
                      <td>공시가격 × 60% × 누진세율</td>
                      <td>지방세법 §111</td>
                    </tr>
                    <tr className="border-b border-border-base">
                      <td className="py-2 pr-3 font-semibold">② 도시지역분</td>
                      <td>과세표준 × 0.14%</td>
                      <td>지방세법 §112</td>
                    </tr>
                    <tr className="border-b border-border-base">
                      <td className="py-2 pr-3 font-semibold">③ 지역자원시설세</td>
                      <td>건물분 시가표준액 × 누진세율</td>
                      <td>지방세법 §146</td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-3 font-semibold">④ 지방교육세</td>
                      <td>재산세 본세 × 20%</td>
                      <td>지방세법 §151</td>
                    </tr>
                  </tbody>
                </table>
              </section>

              <section className="space-y-4">
                <h2 className="border-b border-border-base pb-2 text-2xl font-bold">
                  고지서에 적힌 4개 항목은 뭔가요?
                </h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  재산세 고지서의 총액은 4개 항목을 합친 것입니다. 각각 다른 목적으로 부과되며,
                  계산하는 기준도 다릅니다. 고지서가 어떻게 구성되는지 차근차근 살펴봅시다.
                </p>

                <div className="space-y-4">
                  <div className="rounded-lg bg-bg-raised p-4">
                    <h3 className="mb-2 font-semibold text-text-primary">
                      ① 재산세 본세 (지방세법 §111)
                    </h3>
                    <p className="text-sm text-text-secondary">
                      <strong>목적</strong>: 지방정부(시·군·구청) 일반 행정 운영 재원
                    </p>
                    <p className="text-sm text-text-secondary">
                      <strong>기준</strong>: 공시가격의 60%를 과세표준으로, 누진세율(0.1% ~
                      0.4%) 적용
                    </p>
                    <p className="text-sm text-text-secondary">
                      <strong>예</strong>: 공시가격 3억 원 주택 → 과세표준 1.8억 원 → 0.25% 구간 → 약 27만 원
                    </p>
                    <p className="text-xs text-text-tertiary">
                      1세대1주택(공시가 9억 이하)은 세율 특례 있음 (약 절반 수준)
                    </p>
                  </div>

                  <div className="rounded-lg bg-bg-raised p-4">
                    <h3 className="mb-2 font-semibold text-text-primary">
                      ② 도시지역분 (지방세법 §112)
                    </h3>
                    <p className="text-sm text-text-secondary">
                      <strong>목적</strong>: 도시 기반시설(도로, 상수도, 하수도 등) 유지·확충 재원
                    </p>
                    <p className="text-sm text-text-secondary">
                      <strong>기준</strong>: 과세표준의 0.14% (도시계획구역 내 부동산만)
                    </p>
                    <p className="text-sm text-text-secondary">
                      <strong>예</strong>: 과세표준 1.8억 원 × 0.14% = 약 25.2만 원
                    </p>
                    <p className="text-xs text-text-tertiary">
                      옛 도시계획세를 통합한 세목. 도시 경계 안이면 자동 부과.
                    </p>
                  </div>

                  <div className="rounded-lg bg-bg-raised p-4">
                    <h3 className="mb-2 font-semibold text-text-primary">
                      ③ 지역자원시설세 (지방세법 §146)
                    </h3>
                    <p className="text-sm text-text-secondary">
                      <strong>목적</strong>: 소방, 환경, 관광, 문화시설 설치·운영 재원
                    </p>
                    <p className="text-sm text-text-secondary">
                      <strong>기준</strong>: 건물분 시가표준액 기준 누진세율 구조
                    </p>
                    <p className="text-sm text-text-secondary">
                      <strong>특징</strong>: 시가표준액 구간이 높아질수록 세율 상승 (비례세가 아닌 누진세)
                    </p>
                    <p className="text-xs text-text-tertiary">
                      구체적 세율은 지방자치단체마다 고시. 고지서에 표시된 세율 확인 필수.
                    </p>
                  </div>

                  <div className="rounded-lg bg-bg-raised p-4">
                    <h3 className="mb-2 font-semibold text-text-primary">
                      ④ 지방교육세 (지방세법 §151)
                    </h3>
                    <p className="text-sm text-text-secondary">
                      <strong>목적</strong>: 학교 운영, 교육시설 확충 재원
                    </p>
                    <p className="text-sm text-text-secondary">
                      <strong>기준</strong>: 재산세 본세의 20% (자동 연동)
                    </p>
                    <p className="text-sm text-text-secondary">
                      <strong>예</strong>: 재산세 본세 27만 원 × 20% = 약 5.4만 원
                    </p>
                    <p className="text-xs text-text-tertiary">
                      본세가 높아지면 자동으로 올라감. 독립적인 계산 기준 없음.
                    </p>
                  </div>
                </div>

                <p className="text-text-secondary leading-relaxed">
                  다만 지역자원시설세의 구체적 세율은 지방자치단체(시·군·구)가 조례로 정하므로,
                  지역마다 다를 수 있습니다. 수도권과 비수도권, 또는 시별로도 세율이 달라질 수 있으므로,
                  자신의 고지서에 적힌 세율을 기준으로 이해하는 것이 정확합니다.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="border-b border-border-base pb-2 text-2xl font-bold">
                  과세표준이 뭐고 어떻게 나올까요?
                </h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  재산세 계산의 첫 단계는 "과세표준"을 구하는 것입니다. 과세표준은 세금을 매기기 위한
                  기준이 됩니다. 재산세 과세기준일은 매년 6월 1일이며, 이날을 기준으로 소유자가
                  정해집니다(지방세법 §114).
                </p>

                <div className="rounded-lg bg-bg-raised p-4">
                  <h3 className="mb-3 font-semibold text-text-primary">과세표준 계산식</h3>
                  <p className="font-mono text-sm font-semibold text-text-primary">
                    과세표준 = 공시가격 × 공정시장가액비율(주택 60%)
                  </p>
                  <p className="mt-2 text-xs text-text-tertiary">
                    공시가격: 시장에서 통상적으로 거래되는 가격 (국토부 고시)
                  </p>
                </div>

                <p className="text-text-secondary leading-relaxed">
                  공시가격은 매년 1월에 국토교통부가 공시합니다. 이는 시장 거래가가
                  아니라, 정부가 평가한 표준가이므로, 실제 거래가와 차이가 날 수 있습니다.
                </p>

                <div className="rounded-lg bg-bg-raised p-4">
                  <h3 className="mb-3 font-semibold text-text-primary">실제 사례</h3>
                  <ul className="space-y-3 text-sm text-text-secondary">
                    <li>
                      <strong>시나리오 1: 공시가격 2억 원</strong>
                      <br />
                      과세표준 = 2억 × 60% = 1.2억 원
                      <br />
                      재산세 본세(0.15% 구간) = 1.2억 × 0.15% − 누진공제 3만 = 18만 − 3만 = 15만 원
                    </li>
                    <li>
                      <strong>시나리오 2: 공시가격 3억 원</strong>
                      <br />
                      과세표준 = 3억 × 60% = 1.8억 원
                      <br />
                      재산세 본세(0.25% 구간) = 1.8억 × 0.25% − 누진공제 18만 = 45만 − 18만 = 27만 원
                    </li>
                    <li>
                      <strong>시나리오 3: 공시가격 5억 원</strong>
                      <br />
                      과세표준 = 5억 × 60% = 3억 원
                      <br />
                      재산세 본세(0.25% 구간) = 3억 × 0.25% − 누진공제 18만 = 75만 − 18만 = 57만 원
                    </li>
                  </ul>
                </div>

                <p className="text-text-secondary leading-relaxed">
                  다만 실제 재산세 계산에는 여러 변수가 더 있습니다. 예를 들어 보유세 감면(일부
                  지역·정책), 농어촌특별세, 1세대1주택 특례 여부 등에 따라 최종 세액이 달라질 수
                  있습니다. 고지서의 "부과액"과 "납부액"을 구분해 보면, 부과액에서 감면이 차감되어
                  납부액이 결정되는 구조를 이해할 수 있습니다.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="border-b border-border-base pb-2 text-2xl font-bold">
                  도시지역분은 모든 곳에 붙나요?
                </h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  도시지역분은 도시 경계 안의 모든 부동산에 붙는 것이 아닙니다. 도시계획구역이나
                  정부가 지정한 도시 지역에만 부과됩니다(지방세법 §112).
                </p>

                <table className="w-full border-collapse text-sm">
                  <caption className="mb-2 text-left font-semibold text-text-primary">
                    도시지역분 부과 대상 (예시)
                  </caption>
                  <thead>
                    <tr className="border-b border-border-base">
                      <th scope="col" className="pb-2 pr-3 text-left font-semibold">
                        구분
                      </th>
                      <th scope="col" className="pb-2 text-left font-semibold">
                        도시지역분 부과 여부
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-text-secondary">
                    <tr className="border-b border-border-base">
                      <td className="py-2 pr-3">
                        <strong>도시계획구역 내 주택</strong>
                      </td>
                      <td>○ 부과됨</td>
                    </tr>
                    <tr className="border-b border-border-base">
                      <td className="py-2 pr-3">
                        <strong>도시지역 외 농지·산림</strong>
                      </td>
                      <td>× 부과 안 됨</td>
                    </tr>
                    <tr className="border-b border-border-base">
                      <td className="py-2 pr-3">
                        <strong>읍지역 주택</strong>
                      </td>
                      <td>○ 지자체별로 지정 시 부과</td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-3">
                        <strong>면지역 주택</strong>
                      </td>
                      <td>× 보통 부과 안 됨</td>
                    </tr>
                  </tbody>
                </table>

                <p className="text-text-secondary leading-relaxed">
                  자신의 주택이 도시계획구역 내인지, 면지역인지 확인하려면 해당 시·군·구청의 토지
                  이용계획도를 조회하거나, 고지서에 도시지역분이 붙어 있는지 보면 됩니다. 도시지역분이
                  붙어 있다면 도시계획구역 내라는 뜻입니다.
                </p>

                <p className="text-text-secondary leading-relaxed">
                  다만 도시계획구역은 시간에 따라 변경될 수 있습니다. 신도시 개발이나 행정 경계
                  조정 시 도시계획구역이 확대되거나 축소될 수 있으므로, 고지서를 받을 때마다 항목을
                  꼼꼼히 확인하는 것이 좋습니다.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="border-b border-border-base pb-2 text-2xl font-bold">
                  지역자원시설세는 뭘 하는 세금인가요?
                </h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  지역자원시설세는 비교적 최근(2010년대 이후)에 강화된 세목으로, 건축물·주택의
                  시가표준액을 기준으로 부과됩니다(지방세법 §146). 소방시설, 환경 기초시설, 관광시설,
                  문화시설 등 지역 공공시설의 설치와 운영 재원 목적입니다.
                </p>

                <div className="rounded-lg bg-bg-raised p-4">
                  <h3 className="mb-3 font-semibold text-text-primary">
                    지역자원시설세의 특징
                  </h3>
                  <ul className="space-y-2 text-sm text-text-secondary">
                    <li>
                      <strong>1. 누진세 구조</strong>: 시가표준액이 높을수록 세율이 올라갑니다.
                      비례세(일정 %)가 아닌 누진세입니다.
                    </li>
                    <li>
                      <strong>2. 건물분만</strong>: 토지는 과세 대상이 아니고, 건물분 시가표준액만
                      기준입니다.
                    </li>
                    <li>
                      <strong>3. 지역별 다름</strong>: 세율은 지방자치단체가 조례로 정하므로, 서울,
                      경기, 비수도권마다 다를 수 있습니다.
                    </li>
                    <li>
                      <strong>4. 재산세와 독립</strong>: 재산세 본세와 별도로 계산되며, 감면도
                      독립적입니다.
                    </li>
                  </ul>
                </div>

                <p className="text-text-secondary leading-relaxed">
                  고지서에 적힌 지역자원시설세의 정확한 세율을 보면, 당신의 지역과 시가표준액 구간을
                  알 수 있습니다. 예를 들어 고지서에 "지역자원시설세 0.08%"라고 적혀 있다면, 당신의
                  건물분 시가표준액이 그 세율 구간에 해당한다는 뜻입니다.
                </p>

                <p className="text-text-secondary leading-relaxed">
                  다만 지역자원시설세의 세율 세부 구간과 누진 폭은 지방자치단체마다 다르므로, 정확한
                  세율을 알려면 해당 시·군·구청의 조례를 확인하거나, 고지서의 명세를 참조하는 것이
                  가장 확실합니다.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="border-b border-border-base pb-2 text-2xl font-bold">
                  1세대1주택이면 재산세가 낮아지나요?
                </h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  네, 1세대1주택(공시가격 9억 원 이하)은 재산세 본세에 대해 특례 세율을 받습니다
                  (지방세법 §111의2). 하지만 도시지역분, 지역자원시설세, 지방교육세는 특례가
                  없습니다.
                </p>

                <table className="w-full border-collapse text-sm">
                  <caption className="mb-2 text-left font-semibold text-text-primary">
                    1세대1주택 재산세 특례 (공시가격 9억 이하)
                  </caption>
                  <thead>
                    <tr className="border-b border-border-base">
                      <th scope="col" className="pb-2 pr-3 text-left font-semibold">
                        항목
                      </th>
                      <th scope="col" className="pb-2 text-left font-semibold">
                        일반 세율
                      </th>
                      <th scope="col" className="pb-2 text-left font-semibold">
                        1세대1주택 특례
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-text-secondary">
                    <tr className="border-b border-border-base">
                      <td className="py-2 pr-3 font-semibold">재산세 본세</td>
                      <td>0.1% ~ 0.4%</td>
                      <td>0.05% ~ 0.35% (약 절반)</td>
                    </tr>
                    <tr className="border-b border-border-base">
                      <td className="py-2 pr-3 font-semibold">도시지역분</td>
                      <td>과세표준 × 0.14%</td>
                      <td>× 특례 없음</td>
                    </tr>
                    <tr className="border-b border-border-base">
                      <td className="py-2 pr-3 font-semibold">지역자원시설세</td>
                      <td>누진세율</td>
                      <td>× 특례 없음</td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-3 font-semibold">지방교육세</td>
                      <td>본세 × 20%</td>
                      <td>○ 본세 특례와 연동 (함께 낮아짐)</td>
                    </tr>
                  </tbody>
                </table>

                <div className="rounded-lg bg-bg-raised p-4">
                  <h3 className="mb-3 font-semibold text-text-primary">
                    1세대1주택 특례의 절감 구조
                  </h3>
                  <ul className="space-y-3 text-sm text-text-secondary">
                    <li>
                      <strong>예</strong>: 공시가격 3억 원, 과세표준 1.8억 원 (일반 세율 기준)
                    </li>
                    <li>
                      <strong>일반</strong>: 본세 27만 + 도시지역분 약 25.2만 + 지방교육세 5.4만 ≈ 약
                      57.6만 원 (지역자원시설세 별도)
                    </li>
                    <li>
                      <strong>1세대1주택 특례(§111의2)</strong>: 본세가 약 절반 수준으로 낮아지고,
                      지방교육세도 본세에 연동돼 함께 줄어듭니다.
                    </li>
                    <li>
                      <strong>주의</strong>: 도시지역분·지역자원시설세는 특례가 없어 그대로
                      부과되므로, 절감 효과는 본세와 지방교육세 부분에 집중됩니다. 정확한 특례 세액은
                      고지서 또는 위택스에서 확인하세요.
                    </li>
                  </ul>
                </div>

                <p className="text-text-secondary leading-relaxed">
                  다만 주의할 점은 1세대1주택의 판단 기준입니다. 공시가격뿐만 아니라 실제 거주 여부,
                  다른 주택 보유 여부 등을 종합적으로 본다는 점입니다. 일시적 2주택이거나 학생 자녀가
                  따로 주택을 가지고 있으면 특례가 적용되지 않을 수 있습니다.
                </p>

                <p className="text-text-secondary leading-relaxed">
                  다만 1세대1주택 특례 기준은 지역과 정책에 따라 변경될 수 있습니다. 특히 규제지역
                  지정이나 정부 정책 변화 시 특례 범위가 축소될 수 있으므로, 고지서의 "부과 사유" 또는
                  해당 지자체의 공시를 확인하는 것이 정확합니다.
                </p>
              </section>

              <AdSlot slot="guide-property-tax-urban-regional-mid" format="rectangle" />

              <FaqSection items={FAQ_ITEMS} />

              <section className="card border-l-2 border-l-danger-500 bg-danger-500/5">
                <h2 className="mb-2 text-lg font-semibold text-danger-700 dark:text-danger-300">
                  주의사항 및 면책조항
                </h2>
                <ul className="space-y-2 text-sm text-danger-700 dark:text-danger-300">
                  <li>
                    • 본 가이드는 일반적인 재산세 정보 제공 목적이며, 특정 지자체의 세부 규정과
                    정책을 보장하지 않습니다.
                  </li>
                  <li>
                    • 재산세 세율, 감면 규정, 1세대1주택 기준은 <strong>지방자치단체마다 다를 수
                      있으며</strong>, 매년 조례 개정으로 변경될 수 있습니다.
                  </li>
                  <li>
                    • 도시지역분, 지역자원시설세의 세율 구간과 누진 폭은 지자체 조례로 결정되므로,
                    정확한 계산을 위해서는 해당 시·군·구청에 문의하거나 조례를 확인하세요.
                  </li>
                  <li>
                    • 보유세 감면, 농어촌특별세, 정책 지원금 등 여러 요소가 최종 세액에 반영되므로,
                    정확한 납부액은 고지서의 "납부액"을 기준으로 하세요.
                  </li>
                  <li>
                    • 고지서 내용에 이의가 있거나 재산세 감면 신청을 하려면, 해당 지자체의 세무과
                    또는 위택스(wetax.go.kr)를 통해 직접 확인하세요.
                  </li>
                  <li>
                    • 본 사이트는 세금 감면 또는 절세를 권유하지 않으며, 모든 세금 납부는 본인의
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
                      href="/calculator/property-tax/"
                      className="text-primary-600 underline dark:text-primary-500"
                    >
                      재산세 계산기
                    </Link>{' '}
                    — 공시가격 입력으로 재산세 본세·도시지역분·지방교육세 즉시 계산
                  </li>
                  <li>
                    →{' '}
                    <Link
                      href="/guide/property-tax-calculation-2026/"
                      className="text-primary-600 underline dark:text-primary-500"
                    >
                      재산세 계산 방법 완전 정리 2026
                    </Link>{' '}
                    — 공시가격에서 세액까지 단계별 계산 원리
                  </li>
                  <li>
                    →{' '}
                    <Link
                      href="/guide/property-tax-july-payment-schedule-2026/"
                      className="text-primary-600 underline dark:text-primary-500"
                    >
                      재산세 7월 납기 일정 및 납부 방법 2026
                    </Link>{' '}
                    — 분납 기간, 연납 할인, 납부처 정리
                  </li>
                  <li>
                    →{' '}
                    <Link
                      href="/guide/june-property-tax/"
                      className="text-primary-600 underline dark:text-primary-500"
                    >
                      6월 재산세 시즌, 미리 알아두면 좋은 5가지
                    </Link>{' '}
                    — 고지서 해석, 이의 신청, 감면 자격 확인
                  </li>
                  <li>
                    →{' '}
                    <Link
                      href="/category/real-estate/"
                      className="text-primary-600 underline dark:text-primary-500"
                    >
                      부동산 카테고리
                    </Link>{' '}
                    — 양도세, 취득세, 종부세 등 모든 부동산 세금 관련 계산기 및 가이드
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
                    법제처 국가법령정보센터
                  </a>
                  ,{' '}
                  <a
                    href="https://www.wetax.go.kr/"
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="text-primary-600 underline dark:text-primary-500"
                  >
                    위택스(지방세 자진신고)
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
