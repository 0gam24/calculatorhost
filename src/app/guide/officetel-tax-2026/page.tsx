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

const URL = 'https://calculatorhost.com/guide/officetel-tax-2026/';
const DATE_PUBLISHED = '2026-07-10';
const DATE_MODIFIED = '2026-07-10';

export const metadata: Metadata = {
  title: '오피스텔 세금 2026 | 주택용 vs 업무용 취득·재산·양도세',
  description:
    '오피스텔 세금 가이드. 주택용 vs 업무용 사용에 따른 취득세(4.6% vs 1~3%), 재산세, 종합부동산세, 양도세, 부가세 차이. 지방세법 기준 완전 정리.',
  keywords: [
    '오피스텔 세금',
    '오피스텔 취득세',
    '주택용 오피스텔',
    '업무용 오피스텔',
    '오피스텔 양도세',
    '오피스텔 재산세',
    '지방세법',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '오피스텔 세금 2026 | 주택용 vs 업무용 취득·재산·양도세' }],
    title: '오피스텔 세금 2026 — 주택용 vs 업무용 세금 차이 완벽 정리',
    description: '오피스텔은 건축법상 업무시설이지만 실제 사용 용도에 따라 취득세·재산세·양도세가 완전히 달라집니다. 정확한 계산과 주택 수 포함 규칙.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '오피스텔 세금 2026 — 주택용 vs 업무용 세금 완전 정리',
    description: '오피스텔 취득세 4.6% vs 주택 1~3%, 재산세·종부세·양도세 차이. 실제 사용 용도에 따른 세금 판정 기준.',
  },
};

const FAQ_ITEMS = [
  {
    question: '오피스텔이 주택으로 분류되나요?',
    answer:
      '건축법상 오피스텔은 "업무시설"이지만, 실제 사용 용도에 따라 세법상 주택으로 인정될 수 있습니다(지방세법 §2·§3). 즉, 실제로 살고 있으면 주택으로 봐서 취득세·양도세·종부세에서 주택 수에 포함되고, 업무 목적이면 일반 건물로 봅니다.',
  },
  {
    question: '오피스텔 취득세는 정확히 얼마인가요?',
    answer:
      '주택용 오피스텔(2020년 8월 12일 이후 취득, 실제 주거용)은 일반 주택 취득세율(1~3%)이 적용되지만, 일반 업무용 오피스텔은 건축물 세율 4.6%(본세 4% + 지방교육세 0.4% + 농특세 0.2%)가 적용됩니다(지방세법 §11①7호).',
  },
  {
    question: '오피스텔은 재산세 주택분 과세 대상인가요?',
    answer:
      '실제 주거용 오피스텔은 재산세 주택분(0.1~0.4%)으로 과세되며 1세대1주택 특례를 받을 수 있습니다. 업무용 오피스텔은 건축물분(0.25%)으로 과세되고, 토지도 별도로 과세됩니다(지방세법 §12).',
  },
  {
    question: '주거용 오피스텔을 팔 때 1세대1주택 비과세가 되나요?',
    answer:
      '네, 2년 이상 보유하고 공시가 12억원 이하인 주거용 오피스텔은 양도소득세 비과세 대상이 됩니다(소득세법 §89①제3호). 실제 주거 용도로 사용했음을 증명할 수 있다면 다주택 보유 여부 판정에서도 주택으로 인정되므로 다른 주택의 양도세에도 영향을 줍니다.',
  },
  {
    question: '업무용으로 취득한 오피스텔을 나중에 주거용으로 바꾸면?',
    answer:
      '실제 주거 전환 후 보유 기간을 다시 계산합니다. 다만 취득 당시 부가세 환급을 받은 경우, 주거 전환 후 면세 전용이 되면 환급받은 부가세를 추징당하므로 주의가 필요합니다(부가가치세법 §39).',
  },
  {
    question: '오피스텔 보유 시 종합부동산세 과세 대상이 되나요?',
    answer:
      '주거용 오피스텔은 종합부동산세 주택분 과세 대상이 되며, 주택 수에 포함됩니다(종합부동산세법 §7·§8). 업무용 오피스텔은 종부세 대상이 아닙니다. 공정시장가액비율 60% 적용, 세율은 2주택 이하 0.5~2.7%(3주택 이상 0.5~5.0%) 누진.',
  },
  {
    question: '취득가 2억 오피스텔 구입 시 취득세는 얼마인가요?',
    answer:
      '업무용 오피스텔의 경우 2억 × 4.6% = 920만원입니다. 주거용 오피스텔(2020년 8월 이후)은 2억 × 1.5% = 300만원 정도입니다(가격대별 정확한 세율은 지자체에 확인). 생애최초 조건이면 추가 감면이 있을 수 있습니다.',
  },
  {
    question: '오피스텔과 주택을 함께 보유하면 다주택 중과세를 받나요?',
    answer:
      '주거용 오피스텔은 주택으로 인정되므로, 주택과 함께 보유하면 2주택 이상으로 분류됩니다. 취득세·양도세·종부세에서 다주택 중과세를 받습니다(지방세법 §11①2호 등).',
  },
];

export default function OfficetelTax2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '오피스텔 세금 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '오피스텔 세금 2026 — 주택용 vs 업무용 세금 차이 완벽 정리',
    description:
      '오피스텔은 건축법상 업무시설이지만 실제 사용 용도에 따라 취득세·재산세·종부세·양도세가 완전히 달라집니다. 주택용(1~3%) vs 업무용(4.6%) 취득세, 주택 수 포함 규칙, 양도세 비과세 조건까지 완벽 정리.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['오피스텔', '취득세', '양도세', '재산세', '주택용 오피스텔'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '오피스텔 세금 2026',
    description:
      '오피스텔 주택용 vs 업무용 세금 차이. 취득세·재산세·종부세·양도세·부가세 완벽 정리.',
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
                    { name: '오피스텔 세금 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">부동산 투자자 · 10분 읽기 · 2026-07-10</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  오피스텔 세금 2026
                  <br />
                  <span className="text-2xl text-text-secondary">— 주택용 vs 업무용 취득·재산·양도세 완벽 정리</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  오피스텔은 건축법상 "업무시설"이지만, 실제 사용 용도에 따라 세법상 주택으로 분류될 수 있습니다. 이것이 핵심입니다. 주거용으로 쓰면 주택처럼 취득세·양도세·종부세가 적용되고, 업무용으로 쓰면 일반 건물 세율이 적용됩니다. 이 가이드는 오피스텔 취득부터 보유·양도까지 모든 단계에서 주택용과 업무용의 세금 차이를 정확히 설명합니다.
                </p>
              </header>

              <AdSlot slot="guide-officetel-tax-top" format="horizontal" />

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">오피스텔이란 무엇인가</h2>
                <p>
                  오피스텔(officetел)은 "사무실(office) + 호텔(hotel)"의 합성어로, 건축법상 "업무시설"으로 분류됩니다. 하지만 실제 사용 용도는 매우 다양합니다. 1인 가구나 신혼부부가 살기도 하고, 임대 사무실·코워킹 스페이스로 운영되기도 합니다. 바로 이 차이가 세금 판정의 분기점입니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">정의: 오피스텔의 두 얼굴</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    · <strong>건축법상</strong>: 업무시설 (상업·업무 목적)
                    <br />
                    · <strong>세법상(실제 사용 용도)</strong>: 주택 또는 건물 (사실상 주거 판정 여부)
                    <br />
                    → 세금 판정은 건축 분류가 아니라 <strong>실제 사용 용도</strong>에 따라 결정됩니다(지방세법 §2·§3).
                  </p>
                </div>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">취득세: 주택용(1~3%) vs 업무용(4.6%)</h2>
                <p>
                  오피스텔 세금의 가장 큰 차이는 취득세에서 나타납니다. 업무용과 주택용의 세율이 최대 3배 이상 차이 납니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 오피스텔 취득세 비교 (지방세법 §11①7호, 2026 기준)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">분류</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">세율</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">구성</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">취득가 2억 시</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3"><strong>주택용 오피스텔</strong><br />(2020.8.12 이후, 주거용)</td>
                        <td className="p-3"><strong>1.0~3.0%</strong></td>
                        <td className="p-3">가격대별 누진<br />+ 지방교육세 10%</td>
                        <td className="p-3">약 300만원<br />(1.5% 기준)</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3"><strong>업무용 오피스텔</strong></td>
                        <td className="p-3"><strong>4.6%</strong></td>
                        <td className="p-3">본세 4.0%<br />+ 지방교육세 0.4%<br />+ 농특세 0.2%</td>
                        <td className="p-3"><strong>920만원</strong><br />(4.6% 고정)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  <strong>핵심: 2020년 8월 12일 이후 취득한 주거용 오피스텔은 다른 주택과 동일한 취득세율을 받습니다.</strong> 그 전에 취득한 것이나 업무 목적 오피스텔은 건축물 기준 4.6%를 적용합니다.
                </p>
                <p className="mt-4">
                  ⚠️ 다만 주택용 오피스텔이라 해도 2주택 이상 보유 시에는 중과세가 적용됩니다. 기존 주택을 이미 보유 중이라면 현재 구입하는 오피스텔은 "2주택째" 세율이 적용되므로 1.0~3.0% 기본율에 +20~30%p 추가되어 8~9%대가 될 수 있습니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">재산세: 주택분(0.1~0.4%) vs 건축물분(0.25%)</h2>
                <p>
                  매년 납부하는 재산세도 주택용과 업무용에서 크게 달라집니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 2. 오피스텔 재산세 비교 (지방세법 §12·§122, 2026 기준)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">분류</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">세율</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">공시가 2억 시<br />연 재산세</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">특징</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3"><strong>주거용 오피스텔</strong></td>
                        <td className="p-3">0.1~0.4%<br />(누진)</td>
                        <td className="p-3">약 20~80만원</td>
                        <td className="p-3">1세대1주택 특례<br />+ 지방교육세 20%<br />+ 세부담상한제</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3"><strong>업무용 오피스텔</strong></td>
                        <td className="p-3">0.25%<br />(고정)</td>
                        <td className="p-3">약 50만원</td>
                        <td className="p-3">건축물분만<br />토지 별도 과세<br />특례 없음</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  주거용 오피스텔은 공시가 9억원 이하일 때 1세대1주택 특례를 받을 수 있습니다. 세부담상한제도 적용되어, 공시가가 급등해도 전년 대비 5~30% 범위 내에서만 인상폭이 제한됩니다.
                </p>
                <p className="mt-4">
                  ⚠️ 다만 주거용 오피스텔이라 하더라도 2주택 이상 보유 중이면 특례를 받지 못합니다. 또한 토지와 건물이 별도로 과세되는데, 부동산 공시가 기준이 적용되므로 실제 보유 위치와 시장 변동에 따라 매년 달라질 수 있습니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">실제 계산 사례 3가지</h2>
                <p>
                  다음 3가지 시나리오를 통해 취득세, 재산세, 양도세가 어떻게 달라지는지 살펴보겠습니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 1. 취득가 2억원 주거용 오피스텔 (무주택자)</p>
                  <p className="text-sm text-text-secondary">
                    · 취득가: 2억원
                    <br />
                    · <strong>취득세</strong>: 2억 × 1.5% ≈ 300만원 (주택 세율 적용)
                    <br />
                    · <strong>재산세(연)</strong>: 공시가 기반, 약 30~50만원 (1세대1주택 특례 적용)
                    <br />
                    · <strong>양도 시(3년 후)</strong>: 1세대1주택 비과세 가능 (2년 보유, 공시가 12억 이하)
                    <br />
                    <span className="text-xs text-text-tertiary">핵심: 무주택자 신규 취득이므로 가장 낮은 세부담. 주택처럼 대우.</span>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 2. 취득가 2억원 업무용 오피스텔</p>
                  <p className="text-sm text-text-secondary">
                    · 취득가: 2억원
                    <br />
                    · <strong>취득세</strong>: 2억 × 4.6% = 920만원 (건축물 세율)
                    <br />
                    · <strong>재산세(연)</strong>: 공시가 기반, 약 50만원 (건축물분 0.25%)
                    <br />
                    · <strong>부가가치세(분양 시)</strong>: 건물분 10%, 토지분 비과세
                    <br />
                    · <strong>양도 시</strong>: 일반 건물 양도세 적용, 1세대1주택 혜택 없음
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 취득세만 920만원 추가 부담. 장기 보유 시 재산세는 저렴.</span>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 3. 주거용 오피스텔 + 주택 2채 보유 시</p>
                  <p className="text-sm text-text-secondary">
                    · 기존: 주택 2채 보유
                    <br />
                    · 신규 취득: 주거용 오피스텔 2억원
                    <br />
                    · <strong>취득세</strong>: 2억 × (1.5% + 20%p 중과) = 약 430만원 (3주택이므로 최대 중과)
                    <br />
                    · <strong>재산세</strong>: 특례 제외, 일반 세율(0.4%) 적용 ≈ 80만원/년
                    <br />
                    · <strong>종부세</strong>: 주택 수에 포함되어 누진 3주택 세율 적용
                    <br />
                    · <strong>양도세</strong>: 다주택 중과세(기본+10~20%p)
                    <br />
                    <span className="text-xs text-text-tertiary">주의: 주거용 오피스텔도 "주택"으로 분류되므로 보유세·양도세 모두 중과세 적용.</span>
                  </p>
                </div>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">종합부동산세: 주거용은 과세, 업무용은 제외</h2>
                <p>
                  종합부동산세(종부세)는 3주택 이상 보유하거나 일정 금액 이상 부동산을 보유한 사람에게 부과됩니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">주거용 오피스텔</p>
                  <p className="text-sm text-text-secondary">
                    · <strong>과세 대상</strong>: YES (주택분 종부세)
                    <br />
                    · <strong>주택 수 포함</strong>: YES (다른 주택과 함께 세금 부과)
                    <br />
                    · <strong>세율</strong>: 0.5~5.0% 누진 (주택 수·보유액에 따라)
                    <br />
                    · <strong>공정시장가액비율</strong>: 60% 적용
                    <br />
                    예시: 공시가 3억원 주거용 오피스텔 → 과세표준 1.8억원 → 0.5% 세율 적용 ≈ 90만원/년
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">업무용 오피스텔</p>
                  <p className="text-sm text-text-secondary">
                    · <strong>과세 대상</strong>: NO (일반 건물이므로 종부세 제외)
                    <br />
                    · <strong>주택 수 포함</strong>: NO
                    <br />
                    · <strong>다만</strong>: 토지는 일반 재산세만 적용
                  </p>
                </div>
                <p className="mt-4">
                  ⚠️ 다만 주거용 오피스텔이 "주택"으로 분류되면 종부세 과세 기준에 포함되므로, 기존 주택 1채와 오피스텔 1채 보유 시 3주택 판정이 되는 건 아니지만, 보유액 합계가 공제금액(1세대1주택 12억, 다주택 9억)을 초과하면 종부세가 부과될 수 있습니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">양도세: 1세대1주택 비과세 vs 일반 양도세</h2>
                <p>
                  오피스텔을 팔 때의 세금도 주택용과 업무용이 완전히 다릅니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 3. 오피스텔 양도세 비교 (소득세법 §89·§92, 2026 기준)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">분류</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">조건</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">양도가 3억, 취득가 2억 시<br />양도차익 1억</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3"><strong>주거용 오피스텔</strong><br />(1세대1주택 비과세)</td>
                        <td className="p-3">· 2년 보유<br />· 공시가 12억 이하<br />· 다른 주택 없음</td>
                        <td className="p-3"><strong>0원</strong><br />(완전 비과세)</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3"><strong>주거용 오피스텔</strong><br />(다주택)</td>
                        <td className="p-3">· 다른 주택 보유<br />· 기본 양도세 + 중과</td>
                        <td className="p-3">약 350~450만원<br />(기본율 38% + 중과 10~20%p)</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3"><strong>업무용 오피스텔</strong></td>
                        <td className="p-3">· 일반 건물 양도세<br />· 누진 세율 적용</td>
                        <td className="p-3">약 300~400만원<br />(해당 양도차익 구간의 누진세율)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  <strong>핵심: 주거용 오피스텔은 1세대1주택으로 판정되면 완벽하게 비과세</strong>이지만, 다른 주택이 하나라도 있으면 중과세가 적용됩니다. 업무용 오피스텔은 1세대1주택 혜택이 없으므로 항상 양도세를 내야 합니다.
                </p>
                <p className="mt-4">
                  ⚠️ 다만 주거용으로 구분해도 양도 시점의 공시가가 12억원을 초과하면 비과세 대상에서 제외됩니다. 공시가 12억원, 양도가 13억원이면 초과분 1억원에 대해서만 양도세가 부과됩니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">부가세: 업무용 오피스텔의 숨은 비용</h2>
                <p>
                  오피스텔을 업무용으로 분양받거나 구입했다면 부가가치세(부가세) 문제를 주의해야 합니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">분양 당시 부가세</p>
                  <p className="text-sm text-text-secondary">
                    · <strong>대상</strong>: 업무용으로 분양받는 오피스텔
                    <br />
                    · <strong>건물분 부가세</strong>: 10% (토지는 비과세)
                    <br />
                    · <strong>환급 가능</strong>: 일반과세자 등록 후 사업용으로 사용하면 환급 가능(부가가치세법 §39)
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">주거로 전환 시 부가세 추징</p>
                  <p className="text-sm text-text-secondary">
                    · 부가세 환급을 받은 후 나중에 주거용으로 전환하고 면세 전용으로 사용하면?
                    <br />
                    · <strong>추징</strong>: 환급받은 부가세를 반납해야 함
                    <br />
                    · 예: 분양가 2억원, 부가세 환급 2,000만원 → 나중에 주거 전환 시 2,000만원 추징
                  </p>
                </div>
                <p className="mt-4">
                  ⚠️ 주의: 부가세 환급은 일시적 혜택입니다. 사용 용도를 변경할 계획이 있다면 처음부터 신중하게 검토하세요. 환급받은 부가세 때문에 나중에 더 큰 세금을 낼 수 있습니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">주택 수 포함 규칙: 가장 중요한 세금 요소</h2>
                <p>
                  오피스텔 세금에서 가장 중요한 것은 "주택 수 포함" 여부입니다. 이것이 취득세 중과, 양도세 중과, 종부세 판정을 크게 좌우합니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">주택으로 인정받는 조건</p>
                  <p className="text-sm text-text-secondary">
                    · <strong>사실상 주거</strong>: 실제로 살고 있거나 살 의도로 취득
                    <br />
                    · <strong>2020년 8월 12일 이후 취득</strong>: 법적 근거(지방세법 §2 개정)
                    <br />
                    · <strong>공시가 상관없음</strong>: 고가든 저가든 사용 용도가 주거면 주택
                    <br />
                    → 주택 수에 포함되어 다주택 중과세 적용 가능
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">주택으로 인정받지 않는 경우</p>
                  <p className="text-sm text-text-secondary">
                    · <strong>업무 전용</strong>: 임대 사무실, 코워킹, 셰어하우스(사업 운영)
                    <br />
                    · <strong>방치·미사용</strong>: 거주도 사업도 하지 않음
                    <br />
                    → 건축물 세율 4.6% 적용, 주택 수 미포함
                  </p>
                </div>
                <p className="mt-4">
                  ⚠️ 실제 판정은 세무서에서 합니다. 겉으로는 주거용이라 주장해도 거주 증거(전입신고, 공과금, 근처 주민 증언 등)가 없으면 인정받지 못할 수 있습니다. 반대로 임대 사무실로 운영하지만 가끔 쉬러 간다면? 세무서 판정이 엄격할 수 있으니 명확히 하세요.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">오피스텔 세금 최소화 전략</h2>
                <p>
                  완전하게 세금을 피할 수는 없지만, 합리적으로 줄일 수는 있습니다.
                </p>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li>
                    <strong>무주택자라면 주거용으로:</strong> 주택용 세율 1~3%는 업무용 4.6%보다 훨씬 저렴합니다. 실제 거주 계획이 있다면 전입신고를 하고 공과금 납입 증거를 남기세요.
                  </li>
                  <li>
                    <strong>이미 주택이 있다면 신중히:</strong> 주거용 오피스텔을 추가 취득하면 다주택이 되어 취득세 중과, 재산세 특례 제외, 종부세 과세 등이 발생합니다. 미리 계산해보세요.
                  </li>
                  <li>
                    <strong>부가세 환급은 신중히:</strong> 부가세 환급은 일시적입니다. 나중에 주거로 전환할 계획이 있다면 처음부터 과세 사업자 등록을 피하세요.
                  </li>
                  <li>
                    <strong>양도 시점 고려:</strong> 1세대1주택 비과세를 받으려면 2년 이상 보유하고 공시가 12억 이하여야 합니다. 공시가 인상이 예상된다면 일찍 처분하는 것도 전략입니다.
                  </li>
                  <li>
                    <strong>공시가 이의신청:</strong> 공시가가 실제 시세보다 높다고 판단되면 고시 후 60일 내에 이의신청할 수 있습니다. 재산세·종부세의 과세표준이 낮아지므로 신중히 검토하세요.
                  </li>
                </ul>
              </section>

              <AdSlot slot="guide-officetel-tax-mid" format="rectangle" />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h2 className="text-2xl font-bold">오피스텔 세금 체크리스트</h2>
                <p>
                  오피스텔 취득·보유·양도 시 반드시 확인해야 할 항목들입니다.
                </p>
                <div className="space-y-3">
                  <div className="rounded-lg border border-border-base bg-bg-card p-4">
                    <p className="font-semibold text-text-primary mb-2">취득 전 확인</p>
                    <ul className="space-y-2 ml-6 list-disc text-sm text-text-secondary">
                      <li>현재 보유 중인 부동산이 있는지 (다주택 판정 여부)</li>
                      <li>취득 시점 (2020년 8월 12일 이전/이후 — 세율 차이 큼)</li>
                      <li>용도 (실제 주거 vs 업무용)</li>
                      <li>취득세 예상액 (1~3% vs 4.6%)</li>
                      <li>공시가 등급 (9억 이상이면 1세대1주택 특례 제외)</li>
                    </ul>
                  </div>
                  <div className="rounded-lg border border-border-base bg-bg-card p-4">
                    <p className="font-semibold text-text-primary mb-2">취득 후 보유 중 확인</p>
                    <ul className="space-y-2 ml-6 list-disc text-sm text-text-secondary">
                      <li>매년 6월 재산세 고지서 확인 (세부담상한 적용 여부)</li>
                      <li>전입신고·거주 증거 유지 (주거용 판정용)</li>
                      <li>공시가 인상 추이 (12억 넘을 경우 1세대1주택 비과세 불가)</li>
                      <li>위택스 계정에서 재산세 상세 조회</li>
                    </ul>
                  </div>
                  <div className="rounded-lg border border-border-base bg-bg-card p-4">
                    <p className="font-semibold text-text-primary mb-2">양도 전 확인</p>
                    <ul className="space-y-2 ml-6 list-disc text-sm text-text-secondary">
                      <li>보유 기간 (2년 이상인지 확인)</li>
                      <li>1세대1주택 비과세 조건 충족 (공시가 12억 이하, 다른 주택 없음)</li>
                      <li>양도 예상가 (고가면 조정지역 판정 시 중과세 가능)</li>
                      <li>양도세 예상액 (비과세 vs 과세 큰 차이)</li>
                      <li>부가세 환급 여부 (환급받았다면 추징 가능성)</li>
                    </ul>
                  </div>
                </div>
              </section>

              <h2 className="text-2xl font-bold mb-6">자주 묻는 질문</h2>
              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h3 className="text-lg font-semibold text-text-primary">관련 계산기 및 가이드</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link
                    href="/calculator/acquisition-tax/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">취득세 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">오피스텔·주택 취득세를 정확히 계산하세요.</p>
                  </Link>
                  <Link
                    href="/calculator/property-tax/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">재산세 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">오피스텔 연간 재산세를 계산해보세요.</p>
                  </Link>
                  <Link
                    href="/calculator/capital-gains-tax/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">양도소득세 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">오피스텔 판매 시 양도세를 미리 계산하세요.</p>
                  </Link>
                  <Link
                    href="/guide/acquisition-tax-calculation-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">취득세 계산법 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">중과세·감면·세율 기준을 배우세요.</p>
                  </Link>
                  <Link
                    href="/guide/property-tax-calculation-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">재산세 계산법 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">세율·누진공제·특례를 정확히 이해하세요.</p>
                  </Link>
                  <Link
                    href="/category/tax/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">모든 세금 가이드</div>
                    <p className="mt-1 text-sm text-text-secondary">부동산·금융 세금 전체 가이드 보기.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 교육 목적으로 작성되었으며, 개인 맞춤형 세무 조언이 아닙니다. 오피스텔의 실제 세금 판정(주택용 vs 업무용), 취득세율, 재산세 특례 적용은 관할 시·군·구청 세무서, 위택스(wetax.go.kr), 또는 공인중개사·세무사와 직접 상담하여 확인하세요. 공시가 기반 세금 변동, 용도 변경, 중과세 판정 등은 개별 상황에 따라 크게 달라질 수 있습니다. 본 콘텐츠는 2026-07-10을 기준으로 작성되었으며, 지방세법·소득세법 개정 시 즉시 업데이트됩니다. 정확한 법적 기준은 <strong>지방세법 §2(세금과세 기준)·§3(주택의 정의)·§11①7호(취득세 세율)·§122(재산세 상한)·종합부동산세법 §7·§8(종부세)·소득세법 §89①제3호(1세대1주택 비과세)</strong>를 따릅니다. AI 보조 작성 후 운영자 검수 완료.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료:</strong>{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터</a>,{' '}
                  <a href="https://www.wetax.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">위택스(지방세 종합정보)</a>,{' '}
                  <a href="https://www.nts.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">국세청 홈택스</a>.
                </p>
              </section>

              <ShareButtons
                title="오피스텔 세금 2026 가이드"
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
