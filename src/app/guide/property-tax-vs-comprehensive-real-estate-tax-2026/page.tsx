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

const URL = 'https://calculatorhost.com/guide/property-tax-vs-comprehensive-real-estate-tax-2026/';
const DATE_PUBLISHED = '2026-06-26';
const DATE_MODIFIED = '2026-06-26';

export const metadata: Metadata = {
  title: '재산세 vs 종부세 차이 2026 — 둘 다 내나? 과세기준·세율 비교 | calculatorhost',
  description:
    '재산세는 모든 주택 보유자에게 부과되는 지방세, 종합부동산세는 공시가격 합계가 기준을 넘는 보유자에게 부과되는 국세입니다. 과세기준일·부과기관·과세대상·세율·납부시기의 차이와 이중과세 조정을 정리합니다.',
  keywords: [
    '재산세',
    '종합부동산세',
    '재산세 vs 종부세',
    '둘 다 내나',
    '이중과세',
    '과세기준',
    '과세기준일',
    '지방세법 §111',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '재산세 vs 종합부동산세 2026 비교 가이드 | calculatorhost' }],
    title: '재산세 vs 종부세 — 둘 다 내나? 2026 완벽 비교',
    description: '지방세 재산세와 국세 종합부동산세의 차이점. 과세기준·세율·부과기관·납부시기 정리.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
};

const FAQ_ITEMS = [
  {
    question: '재산세와 종부세를 둘 다 내야 하나요?',
    answer:
      '공시가격 합계가 종부세 기준(1세대1주택 12억, 그 외 9억)을 초과하면 재산세는 반드시 내고, 종부세도 함께 내게 됩니다. 둘은 별개 세목이며 이중과세가 방지되도록 종부세 계산 시 재산세액의 일부가 공제됩니다.',
  },
  {
    question: '왜 종부세가 있는데 재산세도 내야 하나요?',
    answer:
      '재산세는 모든 주택 보유자가 내는 지방세(세수는 지자체 예산)이고, 종부세는 고가 주택·다주택 보유자가 내는 국세(세수는 정부 예산)입니다. 정책 목표와 세수 체계가 다르므로 두 세목이 존재합니다.',
  },
  {
    question: '과세기준일이 둘 다 6월 1일인가요?',
    answer:
      '맞습니다. 재산세와 종부세 모두 과세기준일이 6월 1일입니다. 6월 1일 현재 소유 중인 모든 주택이 그 해의 재산세·종부세 부과 대상입니다.',
  },
  {
    question: '재산세는 7월·9월, 종부세는 12월이라고요?',
    answer:
      '맞습니다. 재산세는 지방세이므로 7월과 9월 두 번에 나눠서 내고(분납), 종부세는 국세이므로 12월 한 번에 냅니다. 납부 기한을 놓치면 각각 가산세가 부과되므로 주의하세요.',
  },
  {
    question: '1세대1주택이면 종부세를 안 내도 되나요?',
    answer:
      '공시가격 합계가 12억원 이하면 종부세 기본공제 범위 내에서 과세되지 않습니다. 하지만 12억을 초과하면 그 초과분에 대해서는 종부세를 내야 합니다. 재산세는 여전히 내야 합니다.',
  },
  {
    question: '이중과세 조정은 어떻게 되나요?',
    answer:
      '종부세 계산 시 동일 재산에 대해 이미 부과된 재산세액 중 종부세 과세표준에 해당하는 부분을 공제합니다(종합부동산세법 §9). 따라서 같은 주택에 대해 재산세와 종부세를 완전히 이중으로 내지는 않습니다.',
  },
  {
    question: '재산세율은 누진이고 종부세율도 누진인가요?',
    answer:
      '둘 다 누진세입니다. 재산세는 과세표준(공시가격 기준)에 따라 0.1%~0.4% 누진(지방세법 §111), 종부세는 공시가격 합계에 따라 0.5%~5.0% 누진(종합부동산세법)입니다.',
  },
];

export default function PropertyTaxVsComprehensiveRealEstateTax2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '재산세 vs 종부세 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '재산세 vs 종합부동산세 2026 — 둘 다 내야 할까?',
    description:
      '재산세(지방세)와 종부세(국세)의 차이점. 과세대상·세율·납부시기·이중과세 조정까지 완벽 정리.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['재산세', '종부세', '비교', '차이', '과세기준'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '재산세 vs 종합부동산세 2026',
    description:
      '지방세 재산세와 국세 종부세의 정확한 차이. 과세기준·부과기관·세율·납부시기·이중과세 조정.',
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
                    { name: '재산세 vs 종부세 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">다주택 보유자 · 8분 읽기 · 2026-06-26</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  재산세 vs 종부세
                  <br />
                  <span className="text-2xl text-text-secondary">— 둘 다 내야 하나? 완벽 비교</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  주택 2채 이상을 소유한 사람이라면 매번 궁금해하는 질문이 있습니다. "재산세를 내는데 종부세도 내야 하나?" 답은 네, 둘 다 내야 합니다. 다만 둘은 완전히 다른 세목이며, 이중과세를 방지하기 위한 조정 과정이 있습니다. 이 가이드는 재산세와 종합부동산세의 차이점을 항목별로 정리하고, 어떻게 계산되는지 설명합니다.
                </p>
              </header>

              <AdSlot slot="guide-property-tax-vs-comprehensive-real-estate-tax-top" format="horizontal" />

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold border-l-4 border-primary-500 pl-3 pb-2 border-b border-border-base">재산세 vs 종부세 한눈에 비교</h2>
                <p>
                  가장 헷갈리는 두 세목의 차이를 표로 정리했습니다:
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 재산세 vs 종합부동산세 비교</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">구분</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">재산세</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">종합부동산세</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3 font-semibold">세목 성격</td>
                        <td className="p-3">지방세</td>
                        <td className="p-3">국세</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3 font-semibold">부과 기관</td>
                        <td className="p-3">시·군·구청</td>
                        <td className="p-3">국세청(세무서)</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3 font-semibold">과세 대상</td>
                        <td className="p-3">모든 주택 보유자</td>
                        <td className="p-3">공시가격 합계 일정액 초과자</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3 font-semibold">기본공제(한도)</td>
                        <td className="p-3">해당 없음</td>
                        <td className="p-3">1세대1주택 12억 / 그 외 9억</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3 font-semibold">과세기준일</td>
                        <td className="p-3">6월 1일</td>
                        <td className="p-3">6월 1일</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3 font-semibold">세율</td>
                        <td className="p-3">0.1%~0.4% 누진</td>
                        <td className="p-3">0.5%~5.0% 누진</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3 font-semibold">납부 시기</td>
                        <td className="p-3">7월·9월(분납)</td>
                        <td className="p-3">12월</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold border-l-4 border-primary-500 pl-3 pb-2 border-b border-border-base">1. 세목 성격 — 지방세 vs 국세</h2>
                <p>
                  <strong>재산세</strong>는 지방세입니다. 세수는 해당 시·군·구의 예산으로 사용되며, 시군구청에서 부과합니다. 주민 자치 사업·교육·의료 등에 쓰입니다.
                </p>
                <p className="mt-4">
                  <strong>종합부동산세</strong>는 국세입니다. 세수는 중앙정부의 재정으로 귀속되며, 국세청(관할 세무서)에서 부과합니다. 고가 주택·다주택 보유에 따른 자산 불평등 완화 목표를 가집니다.
                </p>
                <p className="mt-4">
                  ⚠️ 다만 세목이 다르다고 해서 두 세목을 피할 수는 없습니다. 모든 주택 보유자는 재산세를 내야 하고, 공시가격 합계가 기준을 초과하면 종부세도 함께 납부해야 합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold border-l-4 border-primary-500 pl-3 pb-2 border-b border-border-base">2. 과세 대상 — 모든 주택 vs 고가·다주택</h2>
                <p>
                  <strong>재산세</strong>는 주택을 한 채만 소유해도 부과됩니다. 1세대1주택이든 2채 이상 보유자든 모두 내는 보유세입니다.
                </p>
                <p className="mt-4">
                  <strong>종합부동산세</strong>는 공시가격 합계가 기준을 초과하는 사람에게만 부과됩니다:
                </p>
                <ul className="space-y-2 ml-6 list-disc text-text-secondary mt-4">
                  <li>1세대1주택: 공시가격 합계 <strong>12억원 초과</strong> 시 과세 대상</li>
                  <li>1세대2주택 이상: 공시가격 합계 <strong>9억원 초과</strong> 시 과세 대상</li>
                </ul>
                <p className="mt-4">
                  ⚠️ 다만 공시가격 기준이므로, 실제 시세가 높아도 공시가격이 낮으면 종부세 대상이 아닐 수 있습니다. 반대로 시세가 낮아도 공시가격이 높으면 종부세를 내야 합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold border-l-4 border-primary-500 pl-3 pb-2 border-b border-border-base">3. 세율 구간 — 누진세 비교</h2>
                <p>
                  둘 다 누진세이지만, 세율 구간이 다릅니다.
                </p>
                <div className="overflow-x-auto mt-4">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 2. 재산세 세율 (지방세법 §111)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">과세표준</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">세율</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">6천만원 이하</td>
                        <td className="p-3">0.1%</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">6천만~1.5억원</td>
                        <td className="p-3">0.15%</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">1.5억~3억원</td>
                        <td className="p-3">0.25%</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">3억원 초과</td>
                        <td className="p-3">0.4%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  재산세는 0.1%~0.4%의 낮은 세율을 적용합니다. 이는 지방세 성격상 모든 주택 보유자에게 균등하게 부과하는 기본 보유세이기 때문입니다.
                </p>
                <div className="overflow-x-auto mt-6">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 3. 종합부동산세 세율 (종합부동산세법)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">보유 주택 수</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">세율(과세표준 구간별 누진)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">2주택 이하</td>
                        <td className="p-3">0.5% ~ 2.7% 누진</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">3주택 이상</td>
                        <td className="p-3">2.0% ~ 5.0% 누진</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  종부세는 0.5%~5.0%의 훨씬 높은 세율을 적용합니다. 특히 3주택 이상 보유자나 고가 주택 소유자는 최대 5.0% 세율이 적용되므로 세 부담이 상당합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold border-l-4 border-primary-500 pl-3 pb-2 border-b border-border-base">4. 나눠 내는 과정 — 재산세 먼저, 종부세 조정</h2>
                <p>
                  만약 당신이 공시가격 15억원인 주택 1채를 가진 1세대1주택이라면:
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">Step 1. 먼저 재산세 계산</p>
                  <p className="text-sm text-text-secondary">
                    · 공시가격 15억원 × 공정시장가액비율 60% = 과세표준 9억원
                    <br />
                    · 세율: 0.4% (과세표준 3억원 초과 구간, 지방세법 §111)
                    <br />
                    · 누진공제: 63만원
                    <br />
                    · 재산세 ≈ 9억 × 0.4% − 63만 = <strong>약 297만원</strong>
                    <br />
                    · 단, 공시가격 9억원 이하 1세대1주택은 §111의2 특례세율이 적용되어 더 낮아집니다
                    <br />
                    · 납부 시기: 7월·9월(분납)
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">Step 2. 그 다음 종부세 계산</p>
                  <p className="text-sm text-text-secondary">
                    · 공시가격 합계: 15억원
                    <br />
                    · 기본공제(1세대1주택): 12억원
                    <br />
                    · 공제 후 = 15억 − 12억 = 3억원
                    <br />
                    · 과세표준 = 3억 × 공정시장가액비율 60% = 1.8억원
                    <br />
                    · 세율: 2주택 이하 누진(0.5%~2.7%) 구간 적용
                    <br />
                    · <strong>세액공제</strong>: 1세대1주택은 연령·보유기간별 세액공제가 추가 적용
                    <br />
                    · <strong>이중과세 조정</strong>: 이미 납부한 재산세 중 종부세 과세표준에 해당하는 부분을 공제(종합부동산세법 §9)
                    <br />
                    · 납부 시기: 12월
                  </p>
                </div>
                <p className="mt-4">
                  ⚠️ 다만 위 예시는 단순화된 것입니다. 실제 계산은 공정시장가액비율·도시지역분·공제 세부사항 등에 따라 달라집니다. 정확한 금액은 홈택스(hometax.go.kr) 또는 위택스(wetax.go.kr)에서 확인하세요.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold border-l-4 border-primary-500 pl-3 pb-2 border-b border-border-base">5. 이중과세 방지 메커니즘</h2>
                <p>
                  "재산세와 종부세를 둘 다 내면 이중과세 아닌가?" 라는 질문은 자연스럽습니다. 이를 방지하기 위해 법제도가 마련되어 있습니다.
                </p>
                <p className="mt-4">
                  <strong>종합부동산세법 §9</strong>에 따르면, 종부세 계산 시 동일 재산에 대해 <strong>이미 부과된 재산세액 중 종부세 과세표준에 해당하는 부분을 공제</strong>합니다. 즉, 재산세를 먼저 내고, 종부세에서 중복 부분을 빼는 조정 메커니즘이 작동합니다.
                </p>
                <p className="mt-4">
                  따라서 같은 재산에 대해 재산세와 종부세를 완전히 이중으로 내는 것은 아니며, 정책적으로 고가 주택·다주택 보유에 대한 추가 과세(종부세)를 하면서도 기본 보유세(재산세)는 모든 주택에 공평하게 부과하는 구조입니다.
                </p>
              </section>

              <AdSlot slot="guide-property-tax-vs-comprehensive-real-estate-tax-mid" format="rectangle" />

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold border-l-4 border-primary-500 pl-3 pb-2 border-b border-border-base">6. 납부 기한 및 페널티</h2>
                <p>
                  <strong>재산세</strong>는 7월과 9월 두 번에 나눠서 냅니다(분납). 납세 통지서는 6월 중순경 우편으로 발송됩니다.
                </p>
                <ul className="space-y-2 ml-6 list-disc text-text-secondary mt-3">
                  <li>1차 납기: 7월 1~31일</li>
                  <li>2차 납기: 9월 1~30일</li>
                  <li>기한 경과 시 가산세: 1개월 이내 3%, 이후 매월 0.5%</li>
                </ul>
                <p className="mt-4">
                  <strong>종부세</strong>는 12월 한 번에 냅니다. 납세 통지서는 11월 중순경 우편으로 발송됩니다.
                </p>
                <ul className="space-y-2 ml-6 list-disc text-text-secondary mt-3">
                  <li>납기: 12월 1~15일</li>
                  <li>기한 경과 시 가산세: 1개월 이내 3%, 이후 매월 0.5%</li>
                </ul>
                <p className="mt-4">
                  ⚠️ 다만 기한을 놓치면 가산세가 부과되고, 경우에 따라 체납 처분(압류·강제 추징)으로 이어질 수 있으니 반드시 기한 내에 납부하세요. 경제적 어려움이 있으면 미리 세무서에 상담하세요.
                </p>
              </section>

              <section className="space-y-6 border-t border-border-base pt-8">
                <h2 className="text-2xl font-bold">주의할 점들</h2>
                <ul className="space-y-4">
                  <li>
                    <strong>1. 공시가격은 공시일로부터 정해진 기간(통상 30일) 내 이의신청 가능:</strong> 공시가격이 높다면 기한 내에 이의신청을 통해 공시가격을 재검토받을 수 있습니다. 이는 재산세·종부세 모두에 영향을 미칩니다.
                  </li>
                  <li>
                    <strong>2. 조회 및 납부는 온라인에서:</strong> 재산세는 위택스(wetax.go.kr, 서울은 이택스 etax.seoul.go.kr), 종부세는 홈택스(hometax.go.kr)에서 조회·납부합니다. 은행 창구·인터넷뱅킹·편의점(GS25·CU 등)에서도 납부 가능합니다.
                  </li>
                  <li>
                    <strong>3. 외국인 보유 국내 부동산도 과세 대상:</strong> 국내에 있는 모든 부동산이 과세 대상이므로, 외국인이 보유한 국내 부동산도 재산세·종부세 대상입니다.
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
                    <p className="mt-1 text-sm text-text-secondary">공시가격을 입력하여 재산세를 즉시 계산하세요.</p>
                  </Link>
                  <Link
                    href="/calculator/comprehensive-property-tax/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">종합부동산세 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">보유 주택 공시가격으로 종부세를 계산합니다.</p>
                  </Link>
                  <Link
                    href="/guide/property-tax-calculation-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">재산세 계산법 완벽 가이드</div>
                    <p className="mt-1 text-sm text-text-secondary">재산세의 세율·공제·이중 납부에 대해 상세히 설명합니다.</p>
                  </Link>
                  <Link
                    href="/guide/comprehensive-real-estate-tax-calculation-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">종부세 계산법 가이드</div>
                    <p className="mt-1 text-sm text-text-secondary">종부세의 기본공제·세율·납부 방법을 정리합니다.</p>
                  </Link>
                  <Link
                    href="/guide/comprehensive-real-estate-tax-who-pays-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">종부세 대상자 판별 가이드</div>
                    <p className="mt-1 text-sm text-text-secondary">내가 종부세를 내야 하는지 판별하는 방법.</p>
                  </Link>
                  <Link
                    href="/category/tax/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">모든 세금 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">양도세·취득세·상속세 등 다양한 세목 한곳에서.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 교육 목적으로 작성되었으며, 개인 맞춤형 세무 조언이 아닙니다. 실제 재산세·종부세 계산은 홈택스·위택스 또는 해당 세무서와 상담 후 진행하세요. 본 콘텐츠는 2026-06-26을 기준으로 작성되었으며, 세법 변경 시 즉시 업데이트됩니다. 법조항 <strong>지방세법 §111(재산세 세율)·§111의2(1세대1주택 특례), 종합부동산세법 §9(이중과세 조정)</strong>를 참고하세요. 실제 세액은 공시가격·공정시장가액비율·도시지역분·공제 세부사항 등에 따라 달라집니다. AI 보조 작성 후 운영자 검수 완료.
                </p>
              </section>

              <ShareButtons
                title="재산세 vs 종부세 2026 비교 가이드"
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
