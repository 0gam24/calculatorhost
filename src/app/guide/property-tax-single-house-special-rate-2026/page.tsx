import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { Footer } from '@/components/layout/Footer';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { AdSlot } from '@/components/ads/AdSlot';
import { FaqSection } from '@/components/calculator/FaqSection';
import { ShareButtons } from '@/components/calculator/ShareButtons';
import {
  buildBreadcrumbJsonLd,
  buildArticleJsonLd,
  buildWebPageJsonLd,
  buildFaqPageJsonLd,
  buildSpeakableJsonLd,
} from '@/lib/seo/jsonld';

const URL = 'https://calculatorhost.com/guide/property-tax-single-house-special-rate-2026/';
const DATE_PUBLISHED = '2026-06-30';
const DATE_MODIFIED = '2026-06-30';

export const metadata: Metadata = {
  title: '1세대1주택 재산세 특례세율 2026 — 0.05%p 인하 구조 정리',
  description:
    '1세대1주택 공시가격 9억 이하 재산세 특례세율 완벽 설명. 일반세율 대비 0.05%p 인하, 누진공제 구조, 세액 절감 사례. 지방세법 §111의2 기준.',
  keywords: [
    '1세대1주택 재산세 특례',
    '재산세 특례세율',
    '공시가격 9억',
    '특례세율 계산',
    '재산세 절감',
    '지방세법 111의2',
    '재산세 인하',
    '1세대1주택 감면',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '1세대1주택 재산세 특례세율 2026' }],
    title: '1세대1주택 재산세 특례세율 2026 — 0.05%p 인하 구조',
    description: '공시가격 9억 이하 1주택자가 받는 재산세 특례세율. 일반세율과 비교해 얼마나 줄어드나?',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
};

const FAQ_ITEMS = [
  {
    question: '1세대1주택 특례세율은 일반세율보다 얼마나 낮나요?',
    answer:
      '특례세율은 모든 구간에서 일반세율 대비 0.05%p 낮습니다 (지방세법 §111의2). 예를 들어 일반 0.1% 구간은 특례 0.05%, 일반 0.15% 구간은 특례 0.1%로 인하됩니다. 누진공제도 함께 조정되어 세액 절감 효과는 과세표준 구간별로 3만~42만 원까지 차이가 납니다.',
  },
  {
    question: '공시가격 9억 초과면 특례세율을 못 받나요?',
    answer:
      '맞습니다. 과세기준일(6월 1일) 현재 공시가격이 9억원을 초과하면 특례세율이 적용되지 않으며, 일반세율 4구간 체계를 적용받습니다. 공시가격 인상으로 9억을 초과했다면 다음해부터는 일반세율이 됩니다. 이의신청으로 공시가격을 낮추지 못하면 특례 혜택이 사라집니다.',
  },
  {
    question: '부부 공동명의는 1세대1주택 특례를 받나요?',
    answer:
      '네, 부부 공동명의도 1세대1주택으로 인정됩니다. "1세대"는 세대원 전체를 기준이므로, 부부와 미성년 자녀는 모두 한 세대이고, 공동명의 주택 1채는 1세대1주택 조건을 만족합니다. 단 부부 각자 명의로 별도 주택을 소유하면 각각 1주택씩 = 2세대 2주택이 되어 특례 대상이 아닙니다.',
  },
  {
    question: '전세 또는 월세 보증금이 있어도 1세대1주택 특례가 되나요?',
    answer:
      '네, 자신 소유 주택 1채만 있으면 전세나 월세는 무관합니다. "1세대1주택"은 소유 주택만 카운트되므로, 전세 거주나 월세 거주는 영향을 주지 않습니다. 다만 본인이 소유한 주택이 2채 이상이면 특례 대상이 아닙니다.',
  },
  {
    question: '올해 집을 사면 6월 1일 기준으로 특례를 받나요?',
    answer:
      '과세기준일(6월 1일)을 기준으로 판단하므로, 그해 6월 1일 이전에 취득했다면 즉시 특례 대상에 포함됩니다. 6월 2일 이후 취득하면 그해는 과세 대상이 아니고, 다음해 6월 1일부터 특례세율이 적용됩니다. 거래 시점이 월말~월초라면 과세기준일까지의 시간이 매우 중요합니다.',
  },
  {
    question: '누진공제도 특례세율에 따라 바뀌나요?',
    answer:
      '아닙니다. 누진공제는 일반세율과 특례세율이 동일하게 적용됩니다 (지방세법 §111의2). 따라서 절감 효과는 오직 세율 인하분(0.05%p)에만 반영됩니다. 예: 과세표준 1억원 시 절감액 = 1억 × 0.05% = 5만원(지방교육세 제외).',
  },
  {
    question: '특례세율은 자동 적용되나요, 신청해야 하나요?',
    answer:
      '1세대1주택 조건을 만족하면 자동으로 적용됩니다 (지방세법 §111의2). 따로 신청서를 제출할 필요 없으며, 위택스나 세무서에서 소유 현황을 자동 확인하여 특례세율을 적용합니다. 다만 명의 이전·상속·증여 등 변화가 있으면 재판정이 필요하므로 신고하세요.',
  },
  {
    question: '과세표준 5000만원일 때 특례세율로 얼마를 내나요?',
    answer:
      '특례세율 적용 시 재산세 = 5,000만 × 0.05% − 0 = 2.5만원입니다 (지방교육세 포함 시 약 3만원). 일반세율(0.1%)이었다면 5만원이므로, 특례로 2.5만원 절감됩니다. 다만 공정시장가액비율 변동이나 지자체 도시지역분이 있으면 최종 금액은 다릅니다.',
  },
];

export default function PropertyTaxSingleHouseSpecialRate2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '1세대1주택 재산세 특례세율 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '1세대1주택 재산세 특례세율 2026 — 0.05%p 인하 구조 완전 이해',
    description:
      '공시가격 9억원 이하 1세대1주택 보유자가 받는 재산세 특례세율. 일반세율과의 차이, 누진공제 구조, 절감 효과를 사례로 정리.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['1세대1주택', '특례세율', '재산세', '지방세법', '절감'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '1세대1주택 재산세 특례세율 2026',
    description:
      '1세대1주택 특례세율의 구조, 요건, 계산 방법, 실제 절감액을 완벽하게 설명합니다.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
  });
  const faqLd = buildFaqPageJsonLd([...FAQ_ITEMS]);
  const speakableLd = buildSpeakableJsonLd(['[data-speakable]']);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableLd) }} />

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
                    { name: '1세대1주택 재산세 특례세율 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">세금·부동산 · 8분 읽기 · 2026-06-30</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  1세대1주택 재산세 특례세율 2026
                  <br />
                  <span className="text-2xl text-text-secondary">— 0.05%p 인하, 실제 절감액 완벽 정리</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  매년 6월 재산세 고지서가 도착할 때마다 많은 1세대1주택 보유자들이 궁금해합니다. "왜 남들과 세율이 다른가?" "특례세율이 정확히 뭔가?" 이 가이드는 1세대1주택을 위한 재산세 특례세율을 집중 분석합니다. 일반세율 대비 0.05%p 인하의 의미, 누진공제 구조, 실제 절감액을 사례와 함께 정리해드립니다.
                </p>
              </header>

              <AdSlot slot="guide-property-tax-single-house-special-rate-top" format="horizontal" />

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">1세대1주택 특례세율이란?</h2>
                <p>
                  1세대1주택 특례세율은 지방세법 §111의2에 따라 공시가격 9억원 이하의 주택을 1채만 소유한 1세대 보유자에게 적용되는 특별 세율입니다. 일반 주택 재산세율보다 모든 구간에서 <strong>0.05%p 낮게 책정</strong>되어 있습니다.
                </p>
                <p className="mt-4">
                  정부가 1세대1주택 보유자를 보호하기 위해 도입한 제도로, 부동산 시장에서 "집 한 채는 지켜주겠다"는 정책 의지를 반영하고 있습니다. 따라서 조건만 충족하면 따로 신청 없이 자동으로 특례세율이 적용됩니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">1세대1주택 특례 조건 — 꼭 알아야 할 4가지</h2>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3">
                  <div>
                    <p className="font-semibold text-text-primary">① 공시가격 9억원 이하</p>
                    <p className="text-sm text-text-secondary mt-1">과세기준일(6월 1일) 현재 공시가격 기준. 6월 중순 고시된 새 공시가격이 9억을 초과하면 특례 미적용.</p>
                  </div>
                  <div className="border-t border-border-base pt-3">
                    <p className="font-semibold text-text-primary">② 1세대 기준 주택 1채만 보유</p>
                    <p className="text-sm text-text-secondary mt-1">"1세대"는 세대원 전체 합산 (부부 + 미성년 자녀 포함). 본인 + 배우자 명의 = 1세대 1주택(특례 적용). 본인 단독 + 배우자 단독 = 2주택 (특례 미적용).</p>
                  </div>
                  <div className="border-t border-border-base pt-3">
                    <p className="font-semibold text-text-primary">③ 과세기준일 6월 1일</p>
                    <p className="text-sm text-text-secondary mt-1">6월 1일 0시 현재 소유 현황을 기준으로 판단. 5월에 구매하면 그해 특례 대상, 6월 2일 이후 구매하면 내년부터 적용.</p>
                  </div>
                  <div className="border-t border-border-base pt-3">
                    <p className="font-semibold text-text-primary">④ 자동 적용 (별도 신청 불필요)</p>
                    <p className="text-sm text-text-secondary mt-1">위택스와 세무서에서 자동으로 소유 현황을 확인하여 특례세율을 적용. 명의 변경·상속 등 변화가 있을 때만 신고 필요.</p>
                  </div>
                </div>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">특례세율 vs 일반세율 비교표</h2>
                <p>
                  다음 표는 지방세법 §111 (일반세율)과 §111의2 (특례세율)를 나란히 비교한 것입니다:
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 재산세 일반세율 vs 1세대1주택 특례세율 (지방세법 §111, §111의2)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">과세표준</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">일반 세율</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">특례 세율</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">일반 누진공제</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">특례 누진공제</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">6천만원 이하</td>
                        <td className="p-3 font-mono">0.1%</td>
                        <td className="p-3 font-mono text-primary-500 font-semibold">0.05%</td>
                        <td className="p-3 font-mono">0</td>
                        <td className="p-3 font-mono">0</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">6천만~1.5억</td>
                        <td className="p-3 font-mono">0.15%</td>
                        <td className="p-3 font-mono text-primary-500 font-semibold">0.1%</td>
                        <td className="p-3 font-mono">3만원</td>
                        <td className="p-3 font-mono">3만원*</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">1.5억~3억</td>
                        <td className="p-3 font-mono">0.25%</td>
                        <td className="p-3 font-mono text-primary-500 font-semibold">0.2%</td>
                        <td className="p-3 font-mono">18만원</td>
                        <td className="p-3 font-mono">18만원*</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">3억 초과</td>
                        <td className="p-3 font-mono">0.4%</td>
                        <td className="p-3 font-mono text-primary-500 font-semibold">0.35%</td>
                        <td className="p-3 font-mono">63만원</td>
                        <td className="p-3 font-mono">63만원*</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  * 특례세율의 누진공제는 일반세율과 동일하게 적용됩니다 (지방세법 §111의2). 따라서 절감 효과는 세율 인하분(0.05%p)에만 반영됩니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">특례세율 적용 계산 공식</h2>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">1세대1주택 재산세 = 과세표준 × 특례세율 − 누진공제 + 지방교육세</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    · 과세표준 = 공시가격 × 공정시장가액비율 (주택 일반 60%)*
                    <br />
                    · 누진공제 = 일반세율과 동일 (3만~63만원, 구간별)
                    <br />
                    · 지방교육세 = (재산세액) × 20%
                    <br />
                    <span className="text-xs">* 1세대1주택에 대한 특례 공정시장가액비율(시행령)은 연도·지역에 따라 43~45% 수준으로 더 낮을 수 있으므로, 정확값은 위택스·세무서 확인 필수.</span>
                  </p>
                </div>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">실제 계산 사례 4가지 — 특례 vs 일반</h2>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 1. 과세표준 5,000만원</p>
                  <div className="text-sm text-text-secondary grid grid-cols-2 gap-2 mt-2">
                    <div>
                      <p className="font-semibold text-primary-500">특례 적용</p>
                      · 세율 0.05% (6천만 이하)
                      <br />
                      · 재산세 = 5,000만 × 0.05% − 0 = <strong>2.5만원</strong>
                      <br />
                      · 지방교육세 = 2.5만 × 20% = 0.5만원
                      <br />
                      · 총: <strong>3만원</strong>
                    </div>
                    <div>
                      <p className="font-semibold text-red-500">특례 미적용 (일반)</p>
                      · 세율 0.1%
                      <br />
                      · 재산세 = 5,000만 × 0.1% − 0 = <strong>5만원</strong>
                      <br />
                      · 지방교육세 = 5만 × 20% = 1만원
                      <br />
                      · 총: <strong>6만원</strong>
                    </div>
                  </div>
                  <p className="text-primary-500 font-semibold mt-2">절감액: 3만원</p>
                </div>

                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 2. 과세표준 1억원</p>
                  <div className="text-sm text-text-secondary grid grid-cols-2 gap-2 mt-2">
                    <div>
                      <p className="font-semibold text-primary-500">특례 적용</p>
                      · 세율 0.1% (6천만~1.5억)
                      <br />
                      · 재산세 = 1억 × 0.1% − 3만 = <strong>7만원</strong>
                      <br />
                      · 지방교육세 = 7만 × 20% = 1.4만원
                      <br />
                      · 총: <strong>8.4만원</strong>
                    </div>
                    <div>
                      <p className="font-semibold text-red-500">특례 미적용 (일반)</p>
                      · 세율 0.15%
                      <br />
                      · 재산세 = 1억 × 0.15% − 3만 = <strong>12만원</strong>
                      <br />
                      · 지방교육세 = 12만 × 20% = 2.4만원
                      <br />
                      · 총: <strong>14.4만원</strong>
                    </div>
                  </div>
                  <p className="text-primary-500 font-semibold mt-2">절감액: 6만원</p>
                </div>

                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 3. 과세표준 2억원</p>
                  <div className="text-sm text-text-secondary grid grid-cols-2 gap-2 mt-2">
                    <div>
                      <p className="font-semibold text-primary-500">특례 적용</p>
                      · 세율 0.2% (1.5억~3억)
                      <br />
                      · 재산세 = 2억 × 0.2% − 18만 = <strong>22만원</strong>
                      <br />
                      · 지방교육세 = 22만 × 20% = 4.4만원
                      <br />
                      · 총: <strong>26.4만원</strong>
                    </div>
                    <div>
                      <p className="font-semibold text-red-500">특례 미적용 (일반)</p>
                      · 세율 0.25%
                      <br />
                      · 재산세 = 2억 × 0.25% − 18만 = <strong>32만원</strong>
                      <br />
                      · 지방교육세 = 32만 × 20% = 6.4만원
                      <br />
                      · 총: <strong>38.4만원</strong>
                    </div>
                  </div>
                  <p className="text-primary-500 font-semibold mt-2">절감액: 12만원</p>
                </div>

                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 4. 과세표준 3.5억원</p>
                  <div className="text-sm text-text-secondary grid grid-cols-2 gap-2 mt-2">
                    <div>
                      <p className="font-semibold text-primary-500">특례 적용</p>
                      · 세율 0.35% (3억 초과)
                      <br />
                      · 재산세 = 3.5억 × 0.35% − 63만 = <strong>59.5만원</strong>
                      <br />
                      · 지방교육세 = 59.5만 × 20% = 11.9만원
                      <br />
                      · 총: <strong>71.4만원</strong>
                    </div>
                    <div>
                      <p className="font-semibold text-red-500">특례 미적용 (일반)</p>
                      · 세율 0.4%
                      <br />
                      · 재산세 = 3.5억 × 0.4% − 63만 = <strong>77만원</strong>
                      <br />
                      · 지방교육세 = 77만 × 20% = 15.4만원
                      <br />
                      · 총: <strong>92.4만원</strong>
                    </div>
                  </div>
                  <p className="text-primary-500 font-semibold mt-2">절감액: 21만원</p>
                </div>

                <p className="mt-4 text-sm text-text-secondary">
                  위 사례들에서 보듯이, 과세표준이 클수록 특례세율로 인한 절감액이 더 커집니다. 절감액은 세율 인하분(0.05%p) × 과세표준이므로, 과세표준이 크면 그 효과도 선형적으로 증가합니다.
                </p>
              </section>

              <AdSlot slot="guide-property-tax-single-house-special-rate-mid" format="rectangle" />

              <section className="space-y-6 border-t border-border-base pt-8" data-speakable>
                <h2 className="text-2xl font-bold">특례세율 관련 주의사항</h2>
                <ul className="space-y-4">
                  <li>
                    <strong>1. 공시가격 9억 초과 시 특례 탈락:</strong> 공시가격이 최근 상승하여 9억을 넘으면 다음해부터 일반세율 4단계 체계를 적용받습니다. 공시가격 이의신청 검토 필요.
                  </li>
                  <li>
                    <strong>2. 공동명의 시 명의자 전체 합산 판단:</strong> 부부 공동명의 = 1주택, 본인 단독 + 배우자 단독 = 2주택. 따라서 명의 분산은 특례를 잃는 결과를 초래합니다.
                  </li>
                  <li>
                    <strong>3. 상속·증여 시 재판정 필요:</strong> 배우자 상속 후 배우자 명의가 1주택이면 특례 적용, 성인 자녀 상속 시 다주택이 되어 특례 미적용. 반드시 상속세·증여세 전 세무전문가와 상담.
                  </li>
                  <li>
                    <strong>4. 전세 사기 구제 대출 시 다주택 여부:</strong> 전세 사기 피해자가 긴급 대출받아 주택을 한 채 더 구매했다면 일시적 2주택으로 판정될 수 있으므로, 구제 신청 시 세무 혜택도 함께 점검.
                  </li>
                  <li>
                    <strong>5. 지방교육세 20%는 별도:</strong> 특례세율 적용해도 지방교육세(재산세의 20%)는 추가로 부과됩니다. 절감액이 생각보다 작을 수 있다는 점을 인식.
                  </li>
                </ul>
              </section>

              <h2 className="text-2xl font-bold mb-6">자주 묻는 질문</h2>
              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h3 className="text-lg font-semibold text-text-primary">관련 계산기 및 가이드</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link
                    href="/calculator/property-tax/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">재산세 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">1세대1주택 특례세율을 직접 계산해보세요. 과세표준과 지역을 입력하면 즉시 결과.</p>
                  </Link>
                  <Link
                    href="/guide/property-tax-calculation-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">재산세 계산법 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">과세표준부터 누진공제, 지방교육세까지 재산세 전체 계산 과정 이해.</p>
                  </Link>
                  <Link
                    href="/guide/june-property-tax/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">6월 재산세 완벽 준비</div>
                    <p className="mt-1 text-sm text-text-secondary">7월 납부 시즌 직전 필수 체크리스트와 납부 방법.</p>
                  </Link>
                  <Link
                    href="/calculator/comprehensive-property-tax/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">종합부동산세 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">다주택 보유자를 위한 종부세 계산. 재산세와는 별개.</p>
                  </Link>
                  <Link
                    href="/guide/capital-gains-tax-5-steps/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">양도소득세 5단계 가이드</div>
                    <p className="mt-1 text-sm text-text-secondary">1세대1주택 주택 판매 시 양도세 계산과 비과세 요건.</p>
                  </Link>
                  <Link
                    href="/category/tax/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">모든 세금 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">양도세·취득세·상속세·종부세 한곳에서.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 교육 목적으로 작성되었으며, 개인 맞춤형 세무 조언이 아닙니다. 실제 재산세 계산 및 특례세율 적용은 해당 시군구 세무서 또는 세무사와 상담 후 진행하세요. 본 콘텐츠는 2026-06-30을 기준으로 작성되었으며, 세율 변경 시 즉시 업데이트됩니다. 1세대1주택 특례세율은 지방세법 <strong>§111의2</strong>에 따르며, 공정시장가액비율(시행령 §109), 도시지역분(§112), 공시가격 이의신청 규정 등 연도별·지역별 변동사항은 행정안전부 고시, 해당 지자체 조례, 위택스(wetax.go.kr), 세무서를 반드시 참고하세요. AI 보조 작성 후 운영자 검수 완료.
                </p>
              </section>

              <ShareButtons
                title="1세대1주택 재산세 특례세율 2026 가이드"
                url={URL}
              />
            </article>
          </main>
        </div>
        <Footer />
      </div>
    </>
  );
}
