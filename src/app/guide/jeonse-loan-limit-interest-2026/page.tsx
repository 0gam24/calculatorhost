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

const URL = 'https://calculatorhost.com/guide/jeonse-loan-limit-interest-2026/';
const DATE_PUBLISHED = '2026-06-29';
const DATE_MODIFIED = '2026-06-29';

export const metadata: Metadata = {
  title: '전세자금대출 한도·금리 구조 2026 | 보증기관별 상품 가이드',
  description:
    '전세자금대출의 한도 결정 구조, 금리 기준, 보증기관(HF·HUG·SGI) 비교, 버팀목 정책상품과 시중상품의 차이를 명확히 설명합니다. 보증비율·DSR 규제·우대금리 조건까지 정리했습니다.',
  keywords: [
    '전세자금대출',
    '전세대출 한도',
    '전세대출 금리',
    '전세자금 보증',
    '버팀목 전세자금',
    '주택도시기금',
    'HUG HF SGI',
    '대출한도 계산',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [
      {
        url: '/og-default.png',
        width: 1200,
        height: 630,
        alt: '전세자금대출 한도·금리 구조 2026 | 보증기관별 상품 가이드',
      },
    ],
    title: '전세자금대출 한도·금리 구조 2026',
    description: '보증기관별 한도 기준, 금리 결정 요소, 정책상품 조건, 실제 대출 가능액 계산',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '전세자금대출 한도·금리 구조',
    description: '3대 보증기관별 한도 비교, 정책상품 우대금리, DSR 규제',
  },
};

const FAQ_ITEMS = [
  {
    question: '전세자금대출 한도는 보증금의 몇 %인가요?',
    answer:
      '통상 보증금의 70~80% 수준이지만, 보증기관·상품·소득·신용도에 따라 크게 달라집니다. 예를 들어 보증금 2억 원이라도 어떤 은행은 1.4억 원, 다른 은행은 1.6억 원을 한도로 제시할 수 있습니다. 대출 신청 전에 관심 있는 은행과 보증기관에 직접 상담받아 정확한 한도를 확인해야 합니다.',
  },
  {
    question: '버팀목 전세자금대출과 시중은행 상품은 뭐가 다른가요?',
    answer:
      '버팀목 전세자금대출은 주택도시기금(정부 정책상품)으로, 청년·신혼·저소득 대상 소득 및 보증금 요건이 정해져 있습니다. 조건을 충족하면 시중은행보다 낮은 우대금리를 받을 수 있습니다. 하지만 요건이 엄격하고 한도가 제한되어(통상 2억 전후) 높은 보증금에는 부족할 수 있습니다. 조건·금리·한도는 매년 변동하므로 가입 전 확인이 필수입니다.',
  },
  {
    question: '3대 보증기관(HF, HUG, SGI)은 뭐가 다른가요?',
    answer:
      '한국주택금융공사(HF), 주택도시보증공사(HUG), SGI서울보증이 전세자금대출을 보증합니다. 각 기관마다 보증한도·수수료·상품 구성이 다르므로, 같은 보증금이라도 보증기관별로 가능한 한도가 다를 수 있습니다. 금융기관 상담 시 어느 보증기관으로 진행되는지, 그 기관의 한도가 얼마인지 확인하는 것이 중요합니다.',
  },
  {
    question: '전세자금대출은 DSR에 포함되나요?',
    answer:
      '전세자금대출은 DSR(총부채상환비율) 규제 적용 시 일반 주담대와 달리, 원금은 제외되고 이자 일부만 반영되는 경향이 있습니다. 따라서 같은 조건이라면 전세자금대출이 주담대보다 더 많이 빌릴 수 있는 구조입니다. 단, 정책 변동이 있을 수 있으므로 가입 전 금융기관에 현재 기준을 확인해야 합니다.',
  },
  {
    question: '전세자금대출 금리는 정해져 있나요?',
    answer:
      '금리는 고정되지 않으며, 기준금리·보증기관·상품·신용도·소득에 따라 달라집니다. 일반적으로 정책상품(버팀목)은 시중은행보다 낮은 우대금리, 시중상품은 변동금리(코픽스 등 지표 연동)가 주류입니다. 실제 금리는 은행·시점에 따라 변동하므로, 여러 은행에 상담받아 비교하는 것이 현명합니다.',
  },
  {
    question: '전세자금대출을 받으면 보증금이 통장에 직접 입금되나요?',
    answer:
      '네, 대출금은 세입자 통장으로 입금됩니다. 건물주에게 직접 이체하거나 계약금·중도금으로 나누어 지급하는 방식은 금융기관별로 상이하므로, 상담 시 입금 방식·시기를 명확히 확인하세요. 건물주 통장 확인·등기부등본 검증 등 전세 계약의 기본 절차는 대출과 별개로 반드시 이행해야 합니다.',
  },
  {
    question: '전세자금대출 중도상환수수료가 있나요?',
    answer:
      '상품마다 다릅니다. 정책상품 중 일부는 중도상환수수료가 없거나 매우 낮은 반면, 시중상품은 수수료가 있을 수 있습니다. 계약 전에 약정서에서 ① 금리 인상 시점(갱신까지 고정) ② 중도상환수수료 ③ 우대금리 조건(급여이체·적금 등)을 반드시 확인하세요.',
  },
  {
    question: '전세자금대출을 받은 후 계약 연장 시 어떻게 되나요?',
    answer:
      '기존 전세자금대출이 만료되기 전에 연장 신청을 해야 합니다. 연장 시 대출잔액·신용도·소득이 재산정되어 한도가 줄어들 수 있습니다. 특히 중간에 소득이 감소했거나 다른 대출이 많아졌다면 갱신 한도가 낮아질 가능성이 높으므로, 충분한 시간을 두고 다른 상품을 비교 검토하는 것이 좋습니다.',
  },
];

export default function JeonseeLoanLimitInterest2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '전세자금대출 한도·금리 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '전세자금대출 한도·금리 구조 2026',
    description:
      '보증기관별 한도 결정 기준, 정책상품과 시중상품의 차이, 금리 결정 요소, DSR 규제, 실무 체크리스트를 종합 정리합니다.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['전세자금대출', '한도 계산', '금리 비교', '버팀목', '보증기관'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '전세자금대출 한도·금리 구조 2026',
    description:
      '보증기관(HF·HUG·SGI) 비교, 정책상품 조건, 시중상품 금리, 한도 결정 요소를 명확히 정리합니다.',
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
                    { name: '전세자금대출 한도·금리 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">무주택 대출자 · 8분 읽기 · 2026-06-29</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  전세자금대출 한도·금리 구조
                  <br />
                  <span className="text-2xl text-text-secondary">— 보증기관별 상품 비교 & 실제 가능액 확인</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  전세 계약을 앞두고 부족한 보증금을 대출로 채우려면, 한도·금리·보증기관의 차이를 이해해야 합니다. 이 가이드는 3대 보증기관(한국주택금융공사·주택도시보증공사·SGI서울보증)의 상품 구조, 정책상품과 시중상품의 차이, 실제 대출 가능액을 결정하는 요소를 정리합니다.
                </p>
              </header>

              <AdSlot slot="guide-jeonse-loan-limit-top" format="horizontal" />

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">전세자금대출의 기본 구조 — 한도 결정 3가지 요소</h2>
                <p>
                  전세자금대출의 한도는 다음 3가지 기준에 의해 결정됩니다. 금융기관과의 상담 시 이 3가지를 반드시 확인해야 실제 가능액을 알 수 있습니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <table className="w-full border-collapse">
                    <caption className="mb-3 text-sm font-semibold text-text-primary">전세자금대출 한도 결정 3대 요소</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="py-2 px-3 text-left font-semibold text-text-primary">기준</th>
                        <th scope="col" className="py-2 px-3 text-left font-semibold text-text-primary">의미</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-subtle">
                        <td className="py-2 px-3 font-semibold text-text-primary">1. 보증비율</td>
                        <td className="py-2 px-3 text-text-secondary">보증금의 70~85% 범위 내 (보증기관·상품마다 상이)</td>
                      </tr>
                      <tr className="border-b border-border-subtle">
                        <td className="py-2 px-3 font-semibold text-text-primary">2. 보증한도</td>
                        <td className="py-2 px-3 text-text-secondary">보증기관별 최대 보증액 (예: 2억 원 한정 정책상품)</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-3 font-semibold text-text-primary">3. DSR 규제</td>
                        <td className="py-2 px-3 text-text-secondary">당신의 연소득 대비 모든 대출 상환액 비율 (통상 40~50% 이내)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-sm text-text-tertiary">
                  <strong>다만:</strong> 3가지 기준 중 가장 낮은 한도가 실제 가능액입니다. 예를 들어 보증비율상 1.6억 원이 가능하더라도, 보증한도가 1.4억 원이거나 DSR 때문에 1.3억 원으로 제한될 수 있습니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">3대 보증기관 비교 — 한도·상품·특성</h2>
                <p>
                  전세자금대출을 보증하는 3개 기관의 상품 특성을 정리했습니다. 금융기관마다 어느 보증기관을 사용하는지 다르므로, 관심 있는 은행의 상담 시 어느 보증기관인지 확인하는 것이 중요합니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 overflow-x-auto">
                  <table className="w-full border-collapse text-sm">
                    <caption className="mb-3 font-semibold text-text-primary">3대 보증기관 특성</caption>
                    <thead>
                      <tr className="border-b border-border-base bg-bg-raised">
                        <th scope="col" className="py-2 px-3 text-left font-semibold text-text-primary">보증기관</th>
                        <th scope="col" className="py-2 px-3 text-left font-semibold text-text-primary">특징</th>
                        <th scope="col" className="py-2 px-3 text-left font-semibold text-text-primary">통상 한도 수준</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-subtle">
                        <td className="py-2 px-3 font-semibold text-primary-500">HF (한국주택금융)</td>
                        <td className="py-2 px-3 text-text-secondary">정책상품 중심, 저금리 우대</td>
                        <td className="py-2 px-3 text-text-secondary">보증금 70~75% 내 (한도별 상품)</td>
                      </tr>
                      <tr className="border-b border-border-subtle">
                        <td className="py-2 px-3 font-semibold text-primary-500">HUG (주택도시보증)</td>
                        <td className="py-2 px-3 text-text-secondary">가장 큰 기관, 상품 다양</td>
                        <td className="py-2 px-3 text-text-secondary">보증금 75~85% (상품별 상이)</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-3 font-semibold text-primary-500">SGI (서울보증)</td>
                        <td className="py-2 px-3 text-text-secondary">시중은행 중심, 신속 심사</td>
                        <td className="py-2 px-3 text-text-secondary">보증금 70~80% (신용도 기반)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-sm text-text-tertiary">
                  <strong>다만:</strong> 위 통상 수준은 참고용이며, 실제 한도는 보증금·소득·신용도·지역에 따라 크게 달라집니다. 정확한 한도는 금융기관 상담을 통해서만 확인할 수 있습니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">정책상품(버팀목) vs 시중상품 — 금리와 조건 비교</h2>
                <p>
                  전세자금대출은 크게 정부 정책상품(주택도시기금)과 금융기관의 시중상품 2가지로 나뉩니다. 금리와 조건이 크게 다르므로, 자신의 자격을 먼저 확인한 후 비교하는 것이 좋습니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <table className="w-full border-collapse text-sm">
                    <caption className="mb-3 font-semibold text-text-primary">정책상품(버팀목) vs 시중상품</caption>
                    <thead>
                      <tr className="border-b border-border-base bg-bg-raised">
                        <th scope="col" className="py-2 px-3 text-left font-semibold text-text-primary">구분</th>
                        <th scope="col" className="py-2 px-3 text-left font-semibold text-text-primary">정책상품 (버팀목 전세자금)</th>
                        <th scope="col" className="py-2 px-3 text-left font-semibold text-text-primary">시중상품</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-subtle">
                        <td className="py-2 px-3 font-semibold text-text-primary">금리</td>
                        <td className="py-2 px-3 text-text-secondary">저금리 우대 (시중보다 낮음)</td>
                        <td className="py-2 px-3 text-text-secondary">변동금리 (코픽스 연동)</td>
                      </tr>
                      <tr className="border-b border-border-subtle">
                        <td className="py-2 px-3 font-semibold text-text-primary">대상</td>
                        <td className="py-2 px-3 text-text-secondary">청년·신혼·저소득 (소득 한도 있음)</td>
                        <td className="py-2 px-3 text-text-secondary">모두 (신용도·소득 만족 시)</td>
                      </tr>
                      <tr className="border-b border-border-subtle">
                        <td className="py-2 px-3 font-semibold text-text-primary">한도</td>
                        <td className="py-2 px-3 text-text-secondary">통상 2억 원 이내 한정</td>
                        <td className="py-2 px-3 text-text-secondary">보증비율·DSR에 따라 다양</td>
                      </tr>
                      <tr className="border-b border-border-subtle">
                        <td className="py-2 px-3 font-semibold text-text-primary">보증기관</td>
                        <td className="py-2 px-3 text-text-secondary">주로 HF (한국주택금융)</td>
                        <td className="py-2 px-3 text-text-secondary">HUG, HF, SGI 등 다양</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-3 font-semibold text-text-primary">중도상환수수료</td>
                        <td className="py-2 px-3 text-text-secondary">없거나 극히 낮음</td>
                        <td className="py-2 px-3 text-text-secondary">상품별 상이</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-sm text-text-tertiary">
                  <strong>다만:</strong> 정책상품 조건(소득·보증금·나이·신용도)은 매년 변동합니다. 가입 전에 주택도시기금 공식 사이트에서 최신 조건을 반드시 확인하세요. 조건을 조금 벗어나더라도 상담받을 가치는 있습니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">금리 결정 요소 — 어떤 조건에 금리가 달라지나</h2>
                <p>
                  시중상품 금리는 고정된 숫자가 아니며, 여러 요소에 따라 결정됩니다. 동일한 상품이라도 고객의 조건에 따라 금리가 다를 수 있으므로, 여러 은행에 문의해보는 것이 현명합니다.
                </p>
                <div className="space-y-3">
                  <div className="rounded-lg border border-border-base bg-bg-card p-3">
                    <p className="font-semibold text-text-primary">① 기준금리</p>
                    <p className="mt-1 text-sm text-text-secondary">한국은행 기준금리나 코픽스(은행 평균금리) 등 시장 지표를 기준으로 가산금리를 더합니다. 기준금리가 오르면 전세자금대출 금리도 함께 오릅니다.</p>
                  </div>
                  <div className="rounded-lg border border-border-base bg-bg-card p-3">
                    <p className="font-semibold text-text-primary">② 신용도</p>
                    <p className="mt-1 text-sm text-text-secondary">신용등급이 높을수록(1~3등급) 더 낮은 가산금리를 받습니다. 같은 상품이라도 신용등급에 따라 0.3~1.0%p 차이가 날 수 있습니다.</p>
                  </div>
                  <div className="rounded-lg border border-border-base bg-bg-card p-3">
                    <p className="font-semibold text-text-primary">③ 소득 수준</p>
                    <p className="mt-1 text-sm text-text-secondary">일부 상품은 소득이 낮을수록 우대금리를 제공합니다. 또한 소득이 높을수록 한도가 늘어나는 구조가 일반적입니다.</p>
                  </div>
                  <div className="rounded-lg border border-border-base bg-bg-card p-3">
                    <p className="font-semibold text-text-primary">④ 우대금리 조건</p>
                    <p className="mt-1 text-sm text-text-secondary">급여이체·적금 개설·보험 가입 등 특정 조건을 충족하면 0.1~0.5%p 우대금리를 받을 수 있습니다. 조건을 확인하고 충족할 수 있으면 신청하세요.</p>
                  </div>
                  <div className="rounded-lg border border-border-base bg-bg-card p-3">
                    <p className="font-semibold text-text-primary">⑤ 상품 종류</p>
                    <p className="mt-1 text-sm text-text-secondary">고정금리, 변동금리, 혼합형(초반 고정 후 변동) 상품마다 금리가 다릅니다. 고정금리가 일반적으로 높지만 미래 인상 리스크가 없다는 장점이 있습니다.</p>
                  </div>
                </div>
              </section>

              <AdSlot slot="guide-jeonse-loan-limit-mid" format="rectangle" />

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">DSR 규제와 전세자금대출 — 실제 대출 한도에 미치는 영향</h2>
                <p>
                  보증비율상 가능한 금액이 있더라도, DSR(총부채상환비율) 규제 때문에 더 적은 금액만 빌릴 수 있는 경우가 많습니다. 전세자금대출은 일반 주담대보다 DSR 규제가 덜 엄격한 편이지만, 여전히 중요한 한도 제약입니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">DSR 계산 기본</p>
                  <p className="mt-2 text-text-secondary">
                    DSR = (모든 대출의 연간 원리금 상환액) ÷ 연소득 × 100%
                  </p>
                  <p className="mt-2 text-sm text-text-tertiary">
                    금융당국 기준상 DSR은 통상 40~50% 이내로 제한됩니다. 예를 들어 연소득 5,000만 원이라면, 모든 대출의 연간 상환액이 2,000~2,500만 원을 넘으면 안 된다는 의미입니다.
                  </p>
                </div>
                <p className="text-sm text-text-tertiary mt-4">
                  <strong>다만:</strong> 전세자금대출은 원금 상환이 만료 시점에 일괄 이루어지므로, DSR 계산 시 이자만 반영되거나 우대되는 경우가 많습니다. 하지만 기존에 다른 대출이 있으면 그것도 포함되므로, 정확한 한도는 금융기관에서 직접 계산해주어야 합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">전세자금대출 신청 전 체크리스트 — 실제 가능액 정확히 파악하기</h2>
                <p>
                  여러 은행에서 상담받을 때, 다음 항목들을 반드시 정리하고 질문하세요. 이 정보들을 통해 실제 가능액을 정확히 판단할 수 있습니다.
                </p>
                <div className="space-y-3">
                  <div className="rounded-lg border border-border-base bg-bg-card p-3">
                    <p className="font-semibold text-text-primary">① 보증기관과 상품명 확인</p>
                    <p className="mt-1 text-sm text-text-secondary">HF, HUG, SGI 중 어느 기관이며, 상품명이 무엇인지 명확히 합니다. 정책상품인지 시중상품인지도 확인합니다.</p>
                  </div>
                  <div className="rounded-lg border border-border-base bg-bg-card p-3">
                    <p className="font-semibold text-text-primary">② 보증비율과 한도액</p>
                    <p className="mt-1 text-sm text-text-secondary">보증금의 몇 %까지 가능한지(예: 75%), 절대 한도액이 있는지(예: 2억 원 한정) 물어봅니다.</p>
                  </div>
                  <div className="rounded-lg border border-border-base bg-bg-card p-3">
                    <p className="font-semibold text-text-primary">③ DSR·DTI 계산 결과</p>
                    <p className="mt-1 text-sm text-text-secondary">금융기관이 직접 당신의 소득·기존 대출을 토대로 DSR 한도액을 계산해줘야 합니다. 이것이 실제 가능액의 핵심입니다.</p>
                  </div>
                  <div className="rounded-lg border border-border-base bg-bg-card p-3">
                    <p className="font-semibold text-text-primary">④ 보증수수료와 기타 수수료</p>
                    <p className="mt-1 text-sm text-text-secondary">보증기관 보증료(상품·보증금별 상이), 은행 취급수수료, 인지세 등이 얼마인지 확인합니다. 이것들이 별도로 추가되거나 대출액에서 차감될 수 있습니다.</p>
                  </div>
                  <div className="rounded-lg border border-border-base bg-bg-card p-3">
                    <p className="font-semibold text-text-primary">⑤ 금리·상환기간·우대조건</p>
                    <p className="mt-1 text-sm text-text-secondary">월 금리(연 금리 ÷ 12), 상환 기간(보통 2년), 급여이체 등 우대금리 조건을 정확히 합니다.</p>
                  </div>
                  <div className="rounded-lg border border-border-base bg-bg-card p-3">
                    <p className="font-semibold text-text-primary">⑥ 중도상환수수료 및 조건</p>
                    <p className="mt-1 text-sm text-text-secondary">상환 기간 중 일부를 미리 갚을 때 수수료가 있는지, 있다면 몇 %인지 확인합니다. 정책상품은 보통 없거나 극히 낮습니다.</p>
                  </div>
                  <div className="rounded-lg border border-border-base bg-bg-card p-3">
                    <p className="font-semibold text-text-primary">⑦ 입금 방식과 시기</p>
                    <p className="mt-1 text-sm text-text-secondary">대출금이 당신 계좌로 언제 입금되는지(계약금 전, 중도금 후?), 건물주에게 이체하는 방식(자동 이체? 수동?)을 확인합니다.</p>
                  </div>
                  <div className="rounded-lg border border-border-base bg-bg-card p-3">
                    <p className="font-semibold text-text-primary">⑧ 계약서·약정서 용어 검증</p>
                    <p className="mt-1 text-sm text-text-secondary">계약 체결 전에 약정서를 받아 ① 금리 고정 기간 ② 갱신 시 인상 한도 ③ 중도상환수수료 규정을 반드시 읽습니다.</p>
                  </div>
                </div>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">전세자금대출 받은 후 주의사항 — 보증금 안전과 계약 관리</h2>
                <p>
                  대출을 받은 후에도, 부족한 부분을 건물주에게 안전하게 지급하고 계약을 철저히 관리해야 합니다. 대출 자체만으로는 보증금이 보호되지 않습니다.
                </p>
                <div className="space-y-3">
                  <div className="rounded-lg border border-border-base bg-bg-card p-3">
                    <p className="font-semibold text-text-primary">전입신고·확정일자 즉시 확보</p>
                    <p className="mt-1 text-sm text-text-secondary">전세 계약 후 전입신고와 확정일자를 받으면 보증금에 대한 대항력과 우선변제권이 생겨, 건물이 경매에 넘어가도 후순위 채권자보다 먼저 보증금을 변제받을 수 있습니다. 이사 당일 전입신고와 동시에 확정일자를 받으세요.</p>
                  </div>
                  <div className="rounded-lg border border-border-base bg-bg-card p-3">
                    <p className="font-semibold text-text-primary">건물주 자산 사전 검증</p>
                    <p className="mt-1 text-sm text-text-secondary">대출을 받은 것만으로 보증금이 안전한 것은 아닙니다. 건물주의 등기부등본·선순위 저당권·근저당 채권최고액 등을 확인하는 기본 전세 안전 절차는 반드시 이행해야 합니다.</p>
                  </div>
                  <div className="rounded-lg border border-border-base bg-bg-card p-3">
                    <p className="font-semibold text-text-primary">전세보증금 반환보증 검토</p>
                    <p className="mt-1 text-sm text-text-secondary">HUG·HF 등의 전세보증금 반환보증에 가입하면, 계약 종료 시 임대인이 보증금을 돌려주지 못해도 보증기관이 대신 반환합니다. 보증료율과 보장 한도는 보증금·주택유형별로 다르므로 가입 전 해당 기관에서 확인하세요.</p>
                  </div>
                  <div className="rounded-lg border border-border-base bg-bg-card p-3">
                    <p className="font-semibold text-text-primary">월 상환액 확인</p>
                    <p className="mt-1 text-sm text-text-secondary">대출금을 받았더라도, 매월 이자를 지속적으로 납부해야 합니다. 초기에는 이자만 내고 만료 시 원금을 일괄 상환하는 방식이 일반적이므로, 만료 시점을 미리 준비하세요.</p>
                  </div>
                </div>
              </section>

              <h2 className="text-2xl font-bold mb-6">자주 묻는 질문</h2>
              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h3 className="text-lg font-semibold text-text-primary">관련 계산기</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link
                    href="/calculator/loan-limit/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">대출한도 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">DSR·DTI·LTV를 통해 실제 대출 가능액을 계산하세요.</p>
                  </Link>
                  <Link
                    href="/calculator/loan/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">대출이자 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">대출금, 금리, 기간을 입력하면 월 이자와 총 이자를 계산합니다.</p>
                  </Link>
                  <Link
                    href="/guide/jeonse-deposit-safety/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">전세 보증금 안전 가이드</div>
                    <p className="mt-1 text-sm text-text-secondary">전세 계약 전 필수 확인 항목, 깡통전세 예방법을 정리했습니다.</p>
                  </Link>
                  <Link
                    href="/guide/dsr-dti-ltv-difference-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">DSR·DTI·LTV 차이 가이드</div>
                    <p className="mt-1 text-sm text-text-secondary">세 규제 지표의 의미, 계산법, 실제 대출 한도 결정 메커니즘을 설명합니다.</p>
                  </Link>
                  <Link
                    href="/guide/jeonse-vs-monthly-rent-comparison-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">전세 vs 월세 비교</div>
                    <p className="mt-1 text-sm text-text-secondary">중장기 비용·리스크·거주 기간별 선택 기준을 정리했습니다.</p>
                  </Link>
                  <Link
                    href="/calculator/broker-fee/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">중개수수료 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">전세 계약 시 중개보수 상한과 실제 수수료를 계산하세요.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="mb-2 text-sm text-text-tertiary">
                  <strong>관련 법규:</strong> 주택도시기금법, 한국주택금융공사법, 주택도시보증공사법, 금융감독 관련 규제(LTV·DSR·DTI), 주택임대차보호법.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 교육 목적으로 작성되었으며, 법적 조언이나 투자 조언이 아닙니다. 전세자금대출 신청 시 금융기관 정식 상담을 받고, 계약 전 법무사·변호사와 상의하세요. 본 콘텐츠는 {DATE_MODIFIED}을 기준으로 작성되었으며, 금융 정책·세율 변경 시 즉시 업데이트됩니다. 본 가이드는 AI 보조 작성 후 운영자 검수 과정을 거쳤습니다.
                </p>
              </section>

              <ShareButtons
                title="전세자금대출 한도·금리 구조 2026"
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
