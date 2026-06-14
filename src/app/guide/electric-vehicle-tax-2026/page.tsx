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

const URL = 'https://calculatorhost.com/guide/electric-vehicle-tax-2026/';
const DATE_PUBLISHED = '2026-06-15';
const DATE_MODIFIED = '2026-06-15';

export const metadata: Metadata = {
  title: '전기차 자동차세 2026 | 정액 세율·하이브리드 차이 | calculatorhost',
  description:
    '2026년 전기차·수소차는 배기량이 없어 정액 자동차세(연 10만원 수준)가 부과되고, 하이브리드는 배기량 기준 일반세율이 적용됩니다. 지방세법 §127 기준 전기차 vs 내연기관·하이브리드 세액 비교, 지방교육세·연납 할인 정리.',
  keywords: [
    '전기차 자동차세',
    '전기차 자동차세 2026',
    '하이브리드 자동차세',
    '전기차 세금',
    '친환경차 자동차세',
    '정액세율',
    '지방세법 127조',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '전기차 자동차세 2026 정액 세율 가이드' }],
    title: '전기차 자동차세 2026 | 정액 세율·하이브리드 차이',
    description: '배기량 없는 전기·수소차는 정액 세율 적용. 하이브리드는 일반 cc 세율.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '전기차 자동차세 2026 정액 세율·하이브리드 차이',
    description: '배기량 없어 정액 세율 + 지방교육세 30%',
  },
};

const FAQ_ITEMS = [
  {
    question: '전기차 자동차세는 정확히 얼마인가요?',
    answer:
      '비영업용 전기차는 배기량이 없어 "그 밖의 비영업용 승용자동차"로 분류돼 정액 세율이 적용됩니다. 지방세법 §127에 따르면 연간 약 10만 원 수준의 정액 자동차세가 부과되며, 여기에 지방교육세 30%가 추가되어 실제 납부액은 약 13만 원입니다. 본 계산기에서 본인 차종 정확한 액수를 확인할 수 있습니다.',
  },
  {
    question: '왜 전기차는 배기량 기준이 아닌가요?',
    answer:
      '자동차세의 배기량 기준은 차량의 환경 오염 정도를 반영한 것입니다(지방세법 §127). 전기차·수소차는 배기가스를 배출하지 않으므로 배기량이라는 개념 자체가 없습니다. 대신 정책적으로 정액 세율(최저 수준)을 적용해 환경친화 자동차 구매를 장려하고 있습니다.',
  },
  {
    question: '하이브리드 자동차세는 어떻게 계산하나요?',
    answer:
      '하이브리드는 내연기관을 포함하고 있어 배기량이 존재합니다. 따라서 일반 내연기관 자동차와 동일하게 cc 기준 세율이 적용됩니다(지방세법 §127). 예를 들어 1600cc 하이브리드는 cc당 140원 × 1600 = 약 22.4만 원의 기본 세액이 부과되며, 여기에 지방교육세 30%를 더합니다.',
  },
  {
    question: '전기차도 지방교육세가 부과되나요?',
    answer:
      '네, 정액 세율이든 배기량 기준이든 모든 차량에 지방교육세(지방세법 §151)가 30% 가산됩니다. 전기차의 경우 정액 10만 원 × 130% = 약 13만 원이 됩니다. 하이브리드도 기본 자동차세 × 130%로 계산하면 됩니다.',
  },
  {
    question: '전기차도 연납 할인이 가능한가요?',
    answer:
      '네, 가능합니다. 전기차도 1월에 연납 신청하면 지방세법 시행령 §125에 따라 5% 한도의 할인을 받습니다. 정액 13만 원 × 5% ≈ 6,500원 절약. 절대액이 작지만 위택스(wetax.go.kr)에서 1분 만에 신청 가능하므로 챙길 만한 혜택입니다.',
  },
  {
    question: '영업용 전기차 자동차세는 다른가요?',
    answer:
      '영업용 차량은 별도 세율 체계가 있습니다(지방세법 §127 제2항). 전기 택시나 배송용 전기 화물차는 비영업용보다 높은 세율이 적용될 수 있으니, 정확한 금액은 위택스 미리계산 또는 시·군청에 문의하시기 바랍니다.',
  },
  {
    question: '전기차 취득세도 감면되나요?',
    answer:
      '네, 전기차는 개별소비세·취득세 감면 대상입니다(지방세특례제한법). 단 감면 한도가 있으며 차량 가격과 등록 연도에 따라 달라집니다. 본 사이트 취득세 계산기에서 감면액을 확인하거나, 위택스 미리계산 기능을 활용하세요.',
  },
] as const;

export default function ElectricVehicleTaxPage() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '세금', url: 'https://calculatorhost.com/category/tax/' },
  ]);

  const articleLd = buildArticleJsonLd({
    headline: '2026 전기차·하이브리드 자동차세 — 정액 세율·내연기관 차이',
    description: '전기차는 배기량이 없어 정액 세율, 하이브리드는 일반 cc 기준 세율 적용. 지방교육세·연납 할인 정보.',
    authorName: 'calculatorhost',
    authorUrl: 'https://calculatorhost.com',
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    url: URL,
    keywords: ['전기차 자동차세', '하이브리드 자동차세', '지방세법 127조', '정액세율'],
  });

  const webpageLd = buildWebPageJsonLd({
    name: '2026 전기차·하이브리드 자동차세',
    description: '전기차·수소차 정액 세율 vs 하이브리드 cc 기준. 지방세법 §127 기준.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
  });

  const faqLd = buildFaqPageJsonLd(
    FAQ_ITEMS.map(item => ({
      question: item.question,
      answer: item.answer,
    }))
  );

  const speakableLd = buildSpeakableJsonLd(['[data-speakable]']);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 bg-bg-base px-4 py-8">
          <div className="mx-auto max-w-3xl space-y-8">
            {/* 구조화 데이터 */}
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webpageLd) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableLd) }} />

            {/* 경로 */}
            <Breadcrumb
              items={[
                { name: '홈', href: '/' },
                { name: '가이드', href: '/guide/' },
                { name: '세금', href: '/category/tax/' },
              ]}
            />

            {/* 제목 영역 */}
            <div className="space-y-4">
              <h1 className="text-4xl font-bold text-text-primary">2026 전기차·하이브리드 자동차세</h1>
              <p className="text-lg text-text-secondary">정액 세율·내연기관 차이</p>
              <div className="flex flex-wrap items-center gap-4 text-sm text-text-secondary">
                <span>📅 {DATE_PUBLISHED}</span>
                <span>⏱️ 읽기 시간 약 6분</span>
                <span>🔖 세금</span>
              </div>
            </div>

            {/* 리드 문단 */}
            <p className="text-base leading-relaxed text-text-primary" data-speakable>
              전기차와 수소차는 배기가스를 배출하지 않기 때문에 배기량이라는 개념이 없습니다. 따라서 지방세법 §127에 따라 일반 내연기관 자동차처럼 배기량 기준으로 계산하는 것이 아니라 '그 밖의 비영업용 승용자동차'로 분류되어 정액 세율이 적용됩니다. 반면 하이브리드 자동차는 내연기관을 포함하고 있어 배기량이 존재하므로 일반 cc 기준 세율이 그대로 적용됩니다. 이번 가이드에서는 전기차·하이브리드·내연기관 자동차의 세율 차이와 지방교육세, 연납 할인까지 정리했습니다.
            </p>

            {/* Structured Summary 카드 */}
            <div className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
              <h2 className="text-lg font-semibold text-text-primary">핵심 요약</h2>
              <table className="w-full text-sm text-text-primary">
                <thead>
                  <tr className="border-b border-border-base">
                    <th className="px-4 py-2 text-left font-semibold">차종</th>
                    <th className="px-4 py-2 text-right font-semibold">기본 세액</th>
                    <th className="px-4 py-2 text-right font-semibold">지교세 30% 포함</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border-base">
                    <td className="px-4 py-2">전기차 (모든 용량)</td>
                    <td className="px-4 py-2 text-right">약 10만 원</td>
                    <td className="px-4 py-2 text-right font-semibold text-highlight-500">약 13만 원</td>
                  </tr>
                  <tr className="border-b border-border-base">
                    <td className="px-4 py-2">하이브리드 1600cc</td>
                    <td className="px-4 py-2 text-right">약 22.4만 원</td>
                    <td className="px-4 py-2 text-right font-semibold">약 29.1만 원</td>
                  </tr>
                  <tr className="border-b border-border-base">
                    <td className="px-4 py-2">내연기관 1600cc</td>
                    <td className="px-4 py-2 text-right">약 22.4만 원</td>
                    <td className="px-4 py-2 text-right font-semibold">약 29.1만 원</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2">전기차 연납 (5% 할인 후)</td>
                    <td className="px-4 py-2 text-right">약 9.5만 원</td>
                    <td className="px-4 py-2 text-right font-semibold text-primary-500">약 12.4만 원</td>
                  </tr>
                </tbody>
              </table>
              <div className="rounded bg-bg-base p-3 text-xs text-text-secondary">
                <strong>지방교육세:</strong> 자동차세 기본액의 30% 별도 부과 (지방세법 §151)
              </div>
            </div>

            <AdSlot slot="guide-electric-vehicle-tax-top" format="horizontal" />

            {/* 본문 */}
            <div className="space-y-8">
              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-text-primary">전기차 자동차세 — 배기량이 없는 이유</h2>
                <p className="leading-relaxed text-text-primary" data-speakable>
                  전기차와 수소차는 내연기관이 아닌 전기모터로 주행하기 때문에 가솔린이나 경유를 연소하지 않습니다. 따라서 기존 자동차처럼 배기량(cc)이라는 물리적 지표가 없습니다. 이는 단순히 기술적 차이가 아니라 세법상 완전히 다른 분류를 의미합니다.
                </p>
                <p className="leading-relaxed text-text-primary">
                  지방세법 §127제1항은 비영업용 승용자동차의 자동차세를 "배기량에 따라 시시당 세액으로" 규정합니다. 하지만 같은 조 제3항에서 "그 밖의 비영업용 승용자동차"에 대해서는 별도의 정액 세율을 정하도록 했고, 이것이 바로 전기차가 적용받는 규정입니다. 실제로 2026년 기준으로 정책적으로 최저 수준의 정액 세율을 적용하는 것으로 알려져 있습니다.
                </p>
                <p className="leading-relaxed text-text-primary">
                  이렇게 정액 세율을 적용하는 이유는 환경친화 자동차 구매를 장려하기 위함입니다. 전기차는 배출가스가 없으므로 배기량 기준으로 세액을 산정할 필요가 없으며, 오히려 정책적으로 저세율을 부과해 소비자의 구매 유인을 높이고 있습니다.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-text-primary">하이브리드 자동차세 — 여전히 일반 cc 기준</h2>
                <p className="leading-relaxed text-text-primary" data-speakable>
                  하이브리드 자동차는 한 가지 중요한 차이가 있습니다. 배터리와 전기모터를 가지고 있지만, 동시에 내연기관(가솔린 또는 경유 엔진)도 포함하고 있다는 점입니다. 따라서 배기량이 존재하며, 지방세법 §127에 따라 그 배기량 기준으로 자동차세가 부과됩니다.
                </p>
                <p className="leading-relaxed text-text-primary">
                  예를 들어 1600cc 하이브리드 자동차의 경우, cc당 140원(지방세법 §127) × 1600cc = 약 22.4만 원이 기본 세액이 됩니다. 이는 같은 배기량의 일반 내연기관 자동차와 정확히 동일한 금액입니다. 환경 친화성에도 불구하고 자동차세 계산은 기존과 동일하게 적용되는 것입니다.
                </p>
                <p className="leading-relaxed text-text-primary">
                  다만 하이브리드 자동차는 취득세나 개별소비세에서 감면 혜택을 받을 수 있습니다. 이는 자동차세와는 별개의 정책이므로, 하이브리드 구매를 검토할 때는 취득 단계의 감면과 함께 자동차세까지 종합적으로 비교해야 합니다.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-text-primary">지방교육세 30% — 모든 차량에 부과</h2>
                <p className="leading-relaxed text-text-primary" data-speakable>
                  전기차와 하이브리드를 막론하고 모든 차량의 자동차세에는 지방교육세가 30% 추가됩니다(지방세법 §151). 이는 지방 교육 재정을 확보하기 위한 세금으로, 자동차세 기본액에 자동으로 곱해지는 방식입니다.
                </p>
                <p className="leading-relaxed text-text-primary">
                  전기차 예시: 정액 기본세액 10만 원 × 130% = 13만 원
                  <br />
                  하이브리드 1600cc 예시: 기본세액 22.4만 원 × 130% = 29.12만 원
                </p>
                <p className="leading-relaxed text-text-primary">
                  즉, 실제 납부 금액을 계산할 때는 항상 30%를 추가로 고려해야 합니다. 본 사이트의 자동차세 계산기에서는 이 모든 요소를 자동으로 반영하고 있으므로 정확한 납부 예상액을 즉시 확인할 수 있습니다.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-text-primary">연납 할인 5% — 전기차도 동일 적용</h2>
                <p className="leading-relaxed text-text-primary" data-speakable>
                  자동차세를 1월에 미리 내면 5% 한도 내에서 할인을 받을 수 있습니다. 이는 전기차, 하이브리드, 일반 내연기관 모두에 동일하게 적용됩니다(지방세법 시행령 §125).
                </p>
                <p className="leading-relaxed text-text-primary">
                  다만 전기차의 경우 기본 세액이 작기 때문에 절대 할인액도 작습니다. 예를 들어 13만 원 × 5% = 약 6,500원입니다. 절대액으로는 작지만, 위택스(https://www.wetax.go.kr) 또는 자동차세 미리납부 앱에서 1분 안에 신청 가능하므로 챙길 만한 혜택입니다.
                </p>
                <p className="leading-relaxed text-text-primary">
                  ⚠️ 다만 연납 신청 기간은 매년 1월 1~31일로 한정되어 있습니다. 1월을 놓치면 그해는 5% 할인을 받을 수 없고, 대신 6월과 12월에 분할 납부해야 합니다. 매년 1월이 되면 미리 신청하는 것을 추천합니다.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-text-primary">전기차 vs 내연기관 자동차세 비교</h2>
                <p className="leading-relaxed text-text-primary" data-speakable>
                  전기차로 전환했을 때 자동차세 면에서 얼마나 절약할 수 있는지 구체적으로 살펴봅시다. 일반적인 중형 자동차(1600cc 내연기관)를 예로 들어 봅시다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-6">
                  <p className="mb-4 font-semibold text-text-primary">연간 자동차세 비교 (2026년 기준)</p>
                  <ul className="space-y-3 text-sm">
                    <li className="flex justify-between">
                      <span className="text-text-secondary">1600cc 내연기관</span>
                      <span className="font-semibold text-text-primary">약 29.1만 원/년</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-text-secondary">1600cc 하이브리드</span>
                      <span className="font-semibold text-text-primary">약 29.1만 원/년 (동일)</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-text-secondary">전기차 (모든 용량)</span>
                      <span className="font-semibold text-primary-500">약 13만 원/년</span>
                    </li>
                    <li className="border-t border-border-base pt-3 flex justify-between">
                      <span className="text-text-secondary font-semibold">연간 절감액</span>
                      <span className="font-bold text-highlight-500">약 16.1만 원</span>
                    </li>
                  </ul>
                </div>
                <p className="leading-relaxed text-text-primary">
                  자동차세만 보면 전기차가 연간 약 16만 원 이상 저렴합니다. 다만 자동차 구매 결정에는 취득세, 개별소비세 감면, 연비, 충전 인프라 등 다양한 요소가 복합적으로 작용하므로, 세금만 고려하기보다는 종합적으로 판단해야 합니다.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-text-primary">전기차 취득세·개별소비세 감면 (별도)</h2>
                <p className="leading-relaxed text-text-primary" data-speakable>
                  자동차세 외에도 전기차는 구매 단계에서 취득세와 개별소비세 감면을 받을 수 있습니다. 이는 지방세특례제한법에 따른 별도의 정책이며, 차량 가격과 전기차 유형(승용, 화물 등)에 따라 달라집니다.
                </p>
                <p className="leading-relaxed text-text-primary">
                  예를 들어 취득세 감면은 구입가의 일정 비율을 면제해주는 방식인데, 한도가 있습니다. 정확한 감면액은 시·군청 또는 위택스의 미리계산 기능에서 확인할 수 있습니다. 본 사이트의 취득세 계산기에서도 전기차 감면 옵션을 선택하면 자동으로 계산됩니다.
                </p>
                <p className="leading-relaxed text-text-primary">
                  ⚠️ 주의: 취득세 감면은 일시적인 정책이므로 매년 또는 분기별로 기한이 연장되거나 폐지될 수 있습니다. 전기차 구매 예정이라면 현재 적용 중인 감면 혜택과 한도를 미리 확인하고 결정하시기 바랍니다.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-text-primary">자동차세 계산 및 납부 방법</h2>
                <p className="leading-relaxed text-text-primary" data-speakable>
                  전기차의 자동차세를 정확하게 확인하고 납부하는 방법은 다음과 같습니다. 먼저 본 사이트의 자동차세 계산기에서 기본 세액을 확인한 후, 위택스나 지자체 앱에서 최종 확인과 납부를 진행하면 됩니다.
                </p>
                <ol className="space-y-3 text-text-primary">
                  <li className="flex gap-4">
                    <span className="flex-shrink-0 font-semibold text-primary-500">1단계</span>
                    <span>본 사이트 <Link href="/calculator/vehicle-tax/" className="font-semibold text-primary-500 hover:underline">자동차세 계산기</Link> 에서 차종·배기량 입력 후 기본 세액 확인</span>
                  </li>
                  <li className="flex gap-4">
                    <span className="flex-shrink-0 font-semibold text-primary-500">2단계</span>
                    <span>위택스(https://www.wetax.go.kr) 또는 지자체 자동차세 앱에서 최종 확인</span>
                  </li>
                  <li className="flex gap-4">
                    <span className="flex-shrink-0 font-semibold text-primary-500">3단계</span>
                    <span>연납할인 신청 여부 결정 (1월에만 신청 가능, 최대 5% 할인)</span>
                  </li>
                  <li className="flex gap-4">
                    <span className="flex-shrink-0 font-semibold text-primary-500">4단계</span>
                    <span>위택스, 은행, 편의점, 신용카드 중 선택해 납부 (신용카드는 수수료 0.8% 별도)</span>
                  </li>
                </ol>
              </section>
            </div>

            <AdSlot slot="guide-electric-vehicle-tax-mid" format="rectangle" />

            {/* FAQ */}
            <section className="space-y-6">
              <h2 className="text-2xl font-semibold text-text-primary">자주 묻는 질문 (FAQ)</h2>
              <FaqSection items={FAQ_ITEMS} />
            </section>

            {/* 관련 계산기·가이드 링크 */}
            <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
              <h3 className="font-semibold text-text-primary">관련 계산기 및 가이드</h3>
              <div className="space-y-3">
                <div>
                  <Link href="/calculator/vehicle-tax/" className="font-semibold text-primary-500 hover:underline">
                    자동차세 계산기
                  </Link>
                  <p className="mt-1 text-sm text-text-secondary">배기량 입력 후 실시간으로 자동차세 및 지방교육세 확인. 연납 할인 적용 가능.</p>
                </div>
                <div>
                  <Link href="/guide/january-vehicle-tax-prepayment/" className="font-semibold text-primary-500 hover:underline">
                    자동차세 연납 5% 할인 가이드 2026
                  </Link>
                  <p className="mt-1 text-sm text-text-secondary">1월 신청 방법, 할인 계산법, 위택스·카드 무이자 할부 정보.</p>
                </div>
                <div>
                  <Link href="/calculator/acquisition-tax/" className="font-semibold text-primary-500 hover:underline">
                    취득세 계산기
                  </Link>
                  <p className="mt-1 text-sm text-text-secondary">전기차 취득세 감면 옵션으로 실제 납부액 비교 가능.</p>
                </div>
                <div>
                  <Link href="/category/tax/" className="font-semibold text-primary-500 hover:underline">
                    세금 계산기 전체 보기
                  </Link>
                  <p className="mt-1 text-sm text-text-secondary">양도세, 재산세, 상속세 등 모든 세금 계산기 한 곳에서 확인.</p>
                </div>
              </div>
            </section>

            {/* 공식 참고 */}
            <section className="space-y-3 border-t border-border-base pt-6 text-sm text-text-secondary">
              <p>
                <strong>공식 참고 자료:</strong>
              </p>
              <ul className="space-y-2">
                <li>
                  • 지방세법 §127 — 자동차세 세율 기준
                  <br />
                  <a
                    href="https://law.go.kr/법령/지방세법"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-500 hover:underline"
                  >
                    법제처 법령정보
                  </a>
                </li>
                <li>
                  • 위택스 공식 사이트 — 자동차세 미리계산 및 납부
                  <br />
                  <a
                    href="https://www.wetax.go.kr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-500 hover:underline"
                  >
                    https://www.wetax.go.kr
                  </a>
                </li>
                <li>
                  • 찾기쉬운 생활법령정보 — 환경친화 자동차 세금
                  <br />
                  <a
                    href="https://easylaw.go.kr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-500 hover:underline"
                  >
                    https://easylaw.go.kr
                  </a>
                </li>
              </ul>
            </section>

            {/* 면책 및 AI 표기 */}
            <section className="rounded-lg bg-bg-card p-4 text-xs text-text-secondary">
              <p>
                <strong>면책조항:</strong> 본 가이드는 지방세법 §127·§151, 지방세법 시행령 §125 등 관련 법규를 기준으로 작성되었습니다. 세법은 자주 개정되므로 정확한 세액은 위택스나 관할 시·군청에 문의하시기 바랍니다. 개별 사건의 세금 절세 방법은 전문 세무사와 상담하시기 바랍니다.
              </p>
              <p className="mt-2">
                <strong>AI 보조 작성:</strong> 본 콘텐츠는 AI 기술의 보조를 받아 작성된 후 운영자가 검수했습니다. (최종 수정: {DATE_MODIFIED})
              </p>
            </section>

            {/* 공유 버튼 */}
            <div className="border-t border-border-base pt-6">
              <ShareButtons
                title="2026 전기차·하이브리드 자동차세 — 정액 세율·내연기관 차이"
                url={URL}
                description="전기차는 정액 세율 적용, 하이브리드는 일반 cc 기준. 지방세법 §127 기준 정리."
              />
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}
