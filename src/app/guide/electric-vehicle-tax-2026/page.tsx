import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { Footer } from '@/components/layout/Footer';
import { GuideHeader } from '@/components/guide/GuideHeader';
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
const DATE_PUBLISHED = '2026-06-17';
const DATE_MODIFIED = '2026-06-17';

export const metadata: Metadata = {
  title: '전기차 자동차세 2026 | 13만원 정액·차령경감 총정리 | calculatorhost',
  description:
    '전기차(BEV)·수소전기차(FCEV)는 연 13만원 정액 과세. 가솔린차와 달리 10년, 20년 지나도 자동차세가 깎이지 않습니다. 차령경감 미적용 이유, 영업용 2.6만원, 하이브리드와의 차이까지 지방세법 §127 기준 정확 정리.',
  keywords: [
    '전기차 자동차세',
    '전기차 자동차세 13만원',
    '그 밖의 승용자동차',
    '전기차 차령경감',
    '지방세법 127조',
    '배터리전기차 BEV',
    '수소연료전지차 FCEV',
    '전기차 vs 하이브리드',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '전기차 자동차세 2026 | 13만원 정액·차령경감 총정리' }],
    title: '전기차 자동차세 2026 | 13만원 정액',
    description: '전기차는 왜 자동차세가 13만원 정액일까? 차령경감 안 되는 이유, 하이브리드와 차이 명확히.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '전기차 자동차세 2026 | 13만원 정액·차령경감 총정리',
    description: '배기량 없는 전기차는 정액 과세. 10년 후에도 여전히 13만원.',
  },
};

const FAQ_ITEMS = [
  {
    question: '전기차 자동차세는 정확히 얼마인가요?',
    answer:
      '비영업용 전기차는 연 100,000원, 지방교육세 30,000원으로 총 130,000원입니다(지방세법 §127①제3호). 정액 과세이므로 차의 가격이나 성능에 상관없이 누구나 같습니다. 영업용(택시)은 20,000원에 지방교육세 6,000원으로 총 26,000원입니다.',
  },
  {
    question: '전기차도 오래되면 자동차세가 깎이나요?',
    answer:
      '아닙니다. 전기차는 차령경감이 적용되지 않습니다(지방세법 §127①제2호 미적용). 신차든 10년차든 20년차든 매년 130,000원을 납부합니다. 가솔린차는 3년차부터 5%씩 깎아 최대 50% 감면되지만, 전기차는 이 혜택이 없습니다.',
  },
  {
    question: '왜 전기차는 차령경감이 안 되나요?',
    answer:
      '지방세법 §127①제2호의 차령경감 계산식은 "제1호에 따른 연세액"(배기량 과세차만)을 기준으로 하기 때문입니다. 정액 과세 대상인 제3호(전기차, 수소차)는 이 계산식 범위 밖이므로 차령이 무관합니다. 정책적으로 전기차 보급 초기에는 세제 혜택이 필요했고, 아직도 정액 과세 유지되고 있습니다.',
  },
  {
    question: '하이브리드차는 전기차와 같나요?',
    answer:
      '아닙니다. 하이브리드(HEV/PHEV)는 배기량이 있으므로 일반 가솔린·디젤차처럼 cc 기준 과세됩니다(지방세법 §127①제1호). 예: 1,500cc 하이브리드는 140원/cc × 1,500 = 210,000원 + 지방교육세 63,000원 = 273,000원. 차령경감도 적용됩니다. 전기차 130,000원보다 비쌉니다.',
  },
  {
    question: '전기차도 연납(선납) 할인이 되나요?',
    answer:
      '됩니다. 1월 일시납부 시 5% 할인이 적용됩니다(지방세법 시행령 §125). 130,000원의 5% = 약 6,500원 할인되어 약 123,500원을 납부합니다. 다만 신청은 1월 1~31일 한정이며, 2월 이후 신청은 불가능합니다.',
  },
  {
    question: '전기차 취득세나 개소세는 깎이나요?',
    answer:
      '네, 취득세·개별소비세는 별도로 감면됩니다. 다만 자동차세는 매년 내는 보유세이고 취득세·개소세는 구매 시 한 번 내는 세금이라 규칙이 분리됩니다. 취득세·개소세 감면 한도와 적용 기간은 연도별로 달라지므로 구매 전 위택스·관할 시·군·구청에서 확인하세요. 자동차세 정액 130,000원은 이와 무관하게 매년 부과됩니다.',
  },
  {
    question: '수소차(연료전지차)도 전기차와 같나요?',
    answer:
      '네, 정확히 같습니다. 수소연료전지차(FCEV)도 배기량이 없으므로 "그 밖의 승용자동차"로 분류되어 비영업용 연 130,000원(영업용 26,000원)입니다(지방세법 §127①제3호). 차령경감도 마찬가지로 미적용됩니다.',
  },
  {
    question: '전기차로 바꾸면 자동차세를 얼마나 절약하나요?',
    answer:
      '가솔린차 1,500cc(지방교육세 포함 273,000원)와 비교하면, 신차 273,000원, 5년차 약 232,000원(15% 경감), 12년차 이후 136,500원(50% 경감)입니다. 전기차는 차령과 무관하게 항상 130,000원이라, 차령이 오래될수록 격차는 줄지만 전기차가 계속 더 저렴합니다. 다만 취득세·보험료·유지비 등 다른 비용도 함께 고려하세요.',
  },
] as const;

export default function ElectricVehicleTax2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '전기차 자동차세 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '전기차 자동차세 2026 | 13만원 정액 과세·차령경감 미적용 정확 정리',
    description:
      '전기차(BEV)·수소차(FCEV)는 배기량이 없어 지방세법 §127①제3호 "그 밖의 승용자동차"로 분류. 연 130,000원 정액 과세, 차령경감 미적용. 가솔린차 1,500cc(273,000원)와의 비교, 하이브리드 혼동 바로잡기.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['전기차 자동차세', '차령경감', '지방세법 127조'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '전기차 자동차세 2026 | 13만원 정액·차령경감 총정리',
    description: '전기차는 왜 정액 13만원일까? 배기량 없는 차의 자동차세 규칙과 기존 차량과의 비교.',
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
              <GuideHeader
                breadcrumbItems={[
                  { name: '홈', href: '/' },
                  { name: '가이드', href: '/guide/' },
                  { name: '전기차 자동차세 2026' },
                ]}
                category="세금"
                readingMinutes={7}
                publishedDate="2026-06-17"
                title="전기차 자동차세 2026"
                subtitle="— 13만원 정액 과세·차령경감 미적용 완벽 정리"
                lead={
                  <p data-speakable>
                    <strong>전기차(배터리전기차 BEV)와 수소연료전지차(FCEV)를 구매했거나 구입 예정이신가요?</strong>
                    자동차세를 낼 때, 가솔린차와 큰 차이가 있다는 것을 아실 겁니다.
                    가솔린 1,500cc 승용차는 매년 약 27만 원을 내지만, 전기차는 <strong>연 13만원(지방교육세 포함)</strong>으로 절반 이상 저렴합니다.
                    하지만 많은 사람들이 착각하는 게 있습니다. <strong>"전기차도 오래되면 자동차세가 깎인다"</strong>고 생각하는 것입니다.
                    답은 <strong>'아니오'입니다.</strong> 전기차는 신차든 10년차든 매년 정확히 13만원입니다.
                    이 가이드는 지방세법 §127을 기준으로, 전기차 자동차세가 정액인 이유, 차령경감이 미적용되는 법적 근거, 그리고 가솔린차·하이브리드와의 명확한 차이까지 정확히 설명합니다.
                  </p>
                }
              />

              <AdSlot slot="guide-electric-vehicle-tax-top" format="horizontal" />

              {/* 핵심 요약 */}
              <section aria-label="핵심 요약" className="card border-l-4 border-l-primary-500">
                <h2 className="mb-4 text-2xl font-bold text-primary-700 dark:text-primary-300">핵심 정리</h2>
                <div className="mb-4 overflow-x-auto">
                  <table className="w-full text-sm" data-speakable>
                    <caption className="mb-2 text-left font-semibold text-text-primary">
                      전기차·가솔린차 자동차세 비교표
                    </caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th className="px-3 py-2 text-left" scope="col">
                          차종
                        </th>
                        <th className="px-3 py-2 text-center" scope="col">
                          자동차세
                        </th>
                        <th className="px-3 py-2 text-center" scope="col">
                          지방교육세
                        </th>
                        <th className="px-3 py-2 text-right" scope="col">
                          연 총액
                        </th>
                        <th className="px-3 py-2 text-center" scope="col">
                          차령경감
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="px-3 py-2 font-semibold">전기차(BEV)</td>
                        <td className="px-3 py-2 text-center">100,000원</td>
                        <td className="px-3 py-2 text-center">30,000원</td>
                        <td className="px-3 py-2 text-right font-semibold">130,000원</td>
                        <td className="px-3 py-2 text-center text-danger-600">불가</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="px-3 py-2 font-semibold">수소차(FCEV)</td>
                        <td className="px-3 py-2 text-center">100,000원</td>
                        <td className="px-3 py-2 text-center">30,000원</td>
                        <td className="px-3 py-2 text-right font-semibold">130,000원</td>
                        <td className="px-3 py-2 text-center text-danger-600">불가</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="px-3 py-2 font-semibold">1,500cc 가솔린</td>
                        <td className="px-3 py-2 text-center">210,000원</td>
                        <td className="px-3 py-2 text-center">63,000원</td>
                        <td className="px-3 py-2 text-right">273,000원</td>
                        <td className="px-3 py-2 text-center text-primary-600">○ (최대 50%)</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="px-3 py-2 font-semibold">하이브리드 1,500cc</td>
                        <td className="px-3 py-2 text-center">210,000원</td>
                        <td className="px-3 py-2 text-center">63,000원</td>
                        <td className="px-3 py-2 text-right">273,000원</td>
                        <td className="px-3 py-2 text-center text-primary-600">○ (최대 50%)</td>
                      </tr>
                      <tr>
                        <td className="px-3 py-2 font-semibold text-text-tertiary">전기차 영업용(택시)</td>
                        <td className="px-3 py-2 text-center text-text-tertiary">20,000원</td>
                        <td className="px-3 py-2 text-center text-text-tertiary">6,000원</td>
                        <td className="px-3 py-2 text-right text-text-tertiary">26,000원</td>
                        <td className="px-3 py-2 text-center text-text-tertiary">불가</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="rounded-lg bg-primary-500/10 p-4 text-sm text-primary-700 dark:text-primary-300">
                  <p className="font-semibold">TL;DR — 5가지 핵심</p>
                  <ul className="mt-2 list-inside list-disc space-y-1">
                    <li>
                      <strong>전기차 정액 13만원(130,000원):</strong> 신차부터 20년차까지 변화 없음 (지방세법 §127①제3호)
                    </li>
                    <li>
                      <strong>차령경감 미적용:</strong> §127①제2호 경감식이 배기량 차량만 대상이므로 전기차 제외
                    </li>
                    <li>
                      <strong>가솔린 1,500cc vs 전기차:</strong> 초기 273,000원 → 10년차 약 163,800원 vs 전기차는 항상 130,000원
                    </li>
                    <li>
                      <strong>하이브리드는 다름:</strong> 배기량 있음 → cc 기준 세율 + 차령경감 적용 (273,000원 기준)
                    </li>
                    <li>
                      <strong>수소차도 전기차와 동일:</strong> BEV/FCEV 모두 배기량 없음 → 정액 130,000원
                    </li>
                  </ul>
                </div>
              </section>

              {/* 1. 전기차 자동차세 정의 */}
              <section className="space-y-4">
                <h2 className="text-2xl font-bold">1. 전기차 자동차세는 정확히 얼마인가요?</h2>
                <div className="rounded-lg bg-bg-card p-3 text-sm">
                  <p className="font-semibold text-text-primary">정의</p>
                  <p className="mt-1 text-text-secondary">
                    전기차(배터리전기차 BEV, 수소연료전지차 FCEV)는 배기량이 없으므로 지방세법 §127①제3호 "그 밖의
                    승용자동차"로 분류됩니다. 비영업용은 정액 100,000원 + 지방교육세 30,000원 = 연 130,000원입니다.
                  </p>
                </div>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  전기차는 배기량(cc)이 없는 차량입니다. 따라서 지방세법 §127①제1호의 cc 기준 세율(80원/cc, 140원/cc,
                  200원/cc)을 적용할 수 없습니다. 대신 정액 과세 대상인 제3호 "그 밖의 승용자동차"에 분류되어 배터리
                  용량이나 차 가격과 무관하게 누구나 같은 세액을 냅니다(지방세법 §127①제3호).
                </p>

                <div className="space-y-3 rounded-lg bg-bg-raised p-4">
                  <p className="font-semibold text-text-primary">전기차 자동차세 구성</p>
                  <div className="space-y-2 text-sm text-text-secondary">
                    <div className="rounded-lg bg-bg-card p-3">
                      <p className="font-semibold text-text-primary">비영업용 (일반 승용)</p>
                      <ul className="mt-2 list-inside list-disc space-y-1">
                        <li>자동차세: 연 100,000원</li>
                        <li>지방교육세: 자동차세의 30% = 30,000원</li>
                        <li className="font-semibold">연 총 납부액: 130,000원</li>
                        <li className="text-xs italic text-text-tertiary">
                          (테슬라 Model 3, 기아 EV6, 현대 아이오닉 등 모두 동일)
                        </li>
                      </ul>
                    </div>

                    <div className="rounded-lg bg-bg-card p-3">
                      <p className="font-semibold text-text-primary">영업용 (택시, 렌터카)</p>
                      <ul className="mt-2 list-inside list-disc space-y-1">
                        <li>자동차세: 연 20,000원</li>
                        <li>지방교육세: 자동차세의 30% = 6,000원</li>
                        <li className="font-semibold">연 총 납부액: 26,000원</li>
                        <li className="text-xs italic text-text-tertiary">(전국 택시 중 전기차 비율 증가 중)</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border-l-4 border-l-highlight-500 bg-highlight-500/5 p-4 text-sm text-text-secondary">
                  <p className="font-semibold text-text-primary">법적 근거</p>
                  <p className="mt-2">
                    지방세법 §127①제3호 "그 밖의 승용자동차" — 배기량으로 분류되지 않는 승용자동차는 정액으로
                    과세합니다. 전기차·수소차는 내연기관 배기량이 없으므로 이 정액 항목이 적용됩니다.
                  </p>
                </div>
              </section>

              {/* 2. 차령경감 미적용 이유 */}
              <section className="space-y-4">
                <h2 className="text-2xl font-bold">2. Q. 전기차도 오래되면 자동차세가 깎이지 않나요?</h2>
                <div className="rounded-lg bg-bg-card p-3 text-sm">
                  <p className="font-semibold text-text-primary">정의</p>
                  <p className="mt-1 text-text-secondary">
                    전기차는 차령경감이 적용되지 않습니다. 지방세법 §127①제2호의 차령경감 규정은 "제1호에 따른
                    연세액"(배기량 과세차만)을 기준으로 하므로, 정액 과세 대상인 제3호(전기차)는 이 계산식 범위 밖입니다.
                  </p>
                </div>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  이것이 많은 사람들이 착각하는 부분입니다. 가솔린차는 구입 후 3년차부터 자동차세가 매년 5%씩 줄어
                  최대 50%까지 경감됩니다. 다만 전기차는 이 혜택이 없습니다. 신차든 오래된 차든
                  <strong>매년 130,000원</strong>을 내야 합니다. 왜일까요? 지방세법 §127①제2호의 차령경감은 그 경감액을
                  산정할 때 "제1호에 따른 연세액"(=배기량 기준 세액)을 기준으로 하기 때문입니다. 즉 차령경감은 배기량
                  과세차(제1호)에만 적용됩니다. 정액으로 과세되는 제3호 "그 밖의 승용자동차"(전기차·수소차)는 애초에
                  이 경감 규정의 대상이 아니므로 차령경감이 원천적으로 불가능합니다.
                </p>

                <div className="space-y-3 rounded-lg bg-bg-raised p-4">
                  <p className="font-semibold text-text-primary">차령경감 비교 (신차 기준 같은 세액 차)</p>
                  <div className="space-y-2 text-sm text-text-secondary">
                    <div className="mb-3 rounded-lg bg-bg-card p-3">
                      <p className="font-semibold text-text-primary">전기차 (정액, 차령경감 없음)</p>
                      <ul className="mt-2 list-inside list-disc space-y-1">
                        <li>신차(1년차): 130,000원</li>
                        <li>5년차: 130,000원 (변화 없음)</li>
                        <li>10년차: 130,000원</li>
                        <li>20년차: 130,000원</li>
                        <li className="font-semibold text-text-primary">20년 누적: 2,600,000원</li>
                      </ul>
                    </div>

                    <div className="rounded-lg bg-bg-card p-3">
                      <p className="font-semibold text-text-primary">가솔린 1,500cc (차령경감 3년차부터 5%/년, 최대 50%)</p>
                      <ul className="mt-2 list-inside list-disc space-y-1">
                        <li>신차(1~2년차): 273,000원 (경감 0%)</li>
                        <li>3년차: 273,000원 × 95% ≈ 259,400원 (경감 (3−2)×5% = 5%)</li>
                        <li>5년차: 273,000원 × 85% ≈ 232,100원 (경감 (5−2)×5% = 15%)</li>
                        <li>10년차: 273,000원 × 60% ≈ 163,800원 (경감 (10−2)×5% = 40%)</li>
                        <li>12년차 이후: 273,000원 × 50% = 136,500원 (50% 상한 도달)</li>
                        <li className="font-semibold text-text-primary">20년 누적: 약 362만원</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border-l-2 border-l-danger-500 bg-danger-500/5 p-4 text-sm text-text-secondary">
                  <p className="font-semibold text-danger-700 dark:text-danger-300">주의: "전기차도 깎인다"는 잘못된 정보</p>
                  <p className="mt-2">
                    많은 온라인 블로그나 자동차 관련 뉴스에서 "전기차 자동차세도 나이 먹으면 경감된다"고 잘못 설명합니다.
                    이는 <strong>사실이 아닙니다.</strong> 지방세법 원문(§127①제2호)을 확인하면, 차령경감의 계산식은 배기량
                    과세차만 대상입니다. 전기차는 정액이므로 경감 대상이 아닙니다.
                  </p>
                </div>
              </section>

              {/* 3. 하이브리드와의 차이 */}
              <section className="space-y-4">
                <h2 className="text-2xl font-bold">3. 하이브리드차는 전기차와 같은 세율을 받나요?</h2>
                <div className="rounded-lg bg-bg-card p-3 text-sm">
                  <p className="font-semibold text-text-primary">정의</p>
                  <p className="mt-1 text-text-secondary">
                    아닙니다. 하이브리드(HEV, Hybrid Electric Vehicle)는 배기량이 있으므로 일반 가솔린·디젤차처럼 cc 기준
                    과세됩니다(지방세법 §127①제1호). 전기차(배기량 없음)와는 완전히 다릅니다.
                  </p>
                </div>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  하이브리드는 배터리와 내연기관을 함께 사용합니다. 때문에 가솔린 엔진이 있고, 배기량도 명시되어 있습니다.
                  예를 들어, 토요타 프리우스 4세대는 1,800cc 가솔린 엔진을 탑재하고 있습니다. 따라서 자동차세는 1,800cc
                  가솔린차와 정확히 같은 금액입니다. 차령경감도 마찬가지로 적용됩니다.
                </p>

                <div className="space-y-3 rounded-lg bg-bg-raised p-4">
                  <p className="font-semibold text-text-primary">전기차 vs 하이브리드 자동차세 비교</p>
                  <div className="space-y-2 text-sm text-text-secondary">
                    <div className="mb-3 rounded-lg bg-bg-card p-3">
                      <p className="font-semibold text-text-primary">전기차 (배기량 없음 = 정액)</p>
                      <ul className="mt-2 list-inside list-disc space-y-1">
                        <li>예: 테슬라 Model 3, 기아 EV6, 현대 Ioniq 5</li>
                        <li>자동차세 기준: 정액 100,000원</li>
                        <li>지방세법: §127①제3호 "그 밖의 승용자동차"</li>
                        <li>차령경감: 불가능</li>
                        <li className="font-semibold text-text-primary">연간 총 납부: 130,000원 (항상 동일)</li>
                      </ul>
                    </div>

                    <div className="rounded-lg bg-bg-card p-3">
                      <p className="font-semibold text-text-primary">하이브리드 1,500cc (배기량 있음 = cc 기준)</p>
                      <ul className="mt-2 list-inside list-disc space-y-1">
                        <li>예: 토요타 프리우스, 현대 그랜저 하이브리드</li>
                        <li>자동차세 기준: 140원/cc × 1,500 = 210,000원</li>
                        <li>지방세법: §127①제1호 "배기량 과세차"</li>
                        <li>차령경감: 가능 (3년차부터 5%/년, 최대 50%)</li>
                        <li className="font-semibold text-text-primary">신차: 273,000원 → 10년차: 약 163,800원</li>
                      </ul>
                    </div>

                    <div className="rounded-lg bg-bg-card p-3">
                      <p className="font-semibold text-text-primary">플러그인 하이브리드(PHEV) 1,500cc (배기량 있음)</p>
                      <ul className="mt-2 list-inside list-disc space-y-1">
                        <li>예: BMW X5 45e, 포르쉐 Cayenne S E-Hybrid</li>
                        <li>자동차세 기준: 140원/cc × 1,500 = 210,000원</li>
                        <li>지방세법: §127①제1호 (배기량 있으므로 PHEV도 같음)</li>
                        <li>차령경감: 가능</li>
                        <li className="font-semibold text-text-primary">신차: 273,000원 (하이브리드와 동일)</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border-l-4 border-l-highlight-500 bg-highlight-500/5 p-4 text-sm text-text-secondary">
                  <p className="font-semibold text-text-primary">핵심 구분</p>
                  <p className="mt-2">
                    <strong>배기량이 있으면 = cc 기준 세율 + 차령경감</strong> (하이브리드, PHEV) <br />
                    <strong>배기량이 없으면 = 정액 130,000원 + 차령경감 불가</strong> (전기차, 수소차)
                  </p>
                </div>
              </section>

              <AdSlot slot="guide-electric-vehicle-tax-mid" format="rectangle" />

              {/* 4. 실제 비교 시뮬레이션 */}
              <section className="space-y-4">
                <h2 className="text-2xl font-bold">4. 실제 사례로 보는 전기차 vs 가솔린차 자동차세 비교</h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  다음 시나리오로 20년간의 자동차세 누적을 비교해보세요.
                </p>

                <div className="space-y-3 rounded-lg bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">시나리오 A: 전기차 vs 1,500cc 가솔린 20년 누적</p>
                  <div className="space-y-2 text-sm text-text-secondary">
                    <div className="rounded-lg bg-bg-raised p-3">
                      <p className="mb-2 font-semibold">전기차 (정액)</p>
                      <ul className="list-inside list-disc space-y-1">
                        <li>1~20년차 각 130,000원</li>
                        <li className="font-semibold">20년 총액: 2,600,000원</li>
                        <li className="text-xs italic text-text-tertiary">(연간 130,000원 × 20년)</li>
                      </ul>
                    </div>
                    <div className="rounded-lg bg-bg-raised p-3">
                      <p className="mb-2 font-semibold">1,500cc 가솔린 (차령경감 3년차부터 5%/년, 최대 50%)</p>
                      <ul className="list-inside list-disc space-y-1">
                        <li>1~2년차: 273,000원 (경감 0%)</li>
                        <li>3~11년차: 273,000원에서 매년 5%씩 경감 (5%→45%)</li>
                        <li>12~20년차: 136,500원 (50% 상한)</li>
                        <li className="font-semibold">20년 총액: 약 362만원</li>
                        <li className="text-xs italic text-text-tertiary">(초기 높지만 중반부터 절감 — 정확액은 계산기로 확인)</li>
                      </ul>
                    </div>
                    <div className="rounded-lg bg-highlight-500/10 p-3">
                      <p className="font-semibold text-text-primary">결론</p>
                      <p className="mt-1">
                        전기차(20년 260만원)가 1,500cc 가솔린차(약 362만원)보다 20년간 약 <strong>100만원</strong> 더
                        저렴합니다. 다만 초기 구매가는 전기차가 높으므로, 장기 보유 계획일 때 의미 있는 절감입니다.
                        차종·배기량별 정확한 누적액은 아래{' '}
                        <Link href="/calculator/vehicle-tax/" className="text-primary-600 underline dark:text-primary-500">
                          자동차세 계산기
                        </Link>
                        에서 확인하세요.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 rounded-lg bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">시나리오 B: 연납(선납) 할인 효과</p>
                  <div className="space-y-2 text-sm text-text-secondary">
                    <div className="rounded-lg bg-bg-raised p-3">
                      <p className="mb-2 font-semibold">전기차 1월 선납 (5% 할인)</p>
                      <ul className="list-inside list-disc space-y-1">
                        <li>기본 130,000원 × 5% = 6,500원 할인</li>
                        <li className="font-semibold">1월 선납 금액: 123,500원</li>
                        <li className="text-xs italic text-text-tertiary">(신청: 1월 1~31일만 가능)</li>
                      </ul>
                    </div>
                    <div className="rounded-lg bg-bg-raised p-3">
                      <p className="mb-2 font-semibold">1,500cc 가솔린 1월 선납</p>
                      <ul className="list-inside list-disc space-y-1">
                        <li>신차(신청 1월): 273,000원 × 5% ≈ 13,650원 할인</li>
                        <li className="font-semibold">1월 선납 금액: 약 259,350원</li>
                        <li>12년차 이후(50% 경감): 136,500원 × 5% ≈ 6,825원 할인</li>
                      </ul>
                    </div>
                    <div className="rounded-lg bg-highlight-500/10 p-3">
                      <p className="font-semibold text-text-primary">결론</p>
                      <p className="mt-1">
                        전기차도 연납 할인이 가능합니다. 다만 정액이므로 절감액도 약 6,500원으로 크지 않습니다. 신청은 매년
                        1월 1~31일 한정이며, 2월 이후는 선납 불가합니다.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* 5. 취득세·개소세와의 혼동 */}
              <section className="space-y-4">
                <h2 className="text-2xl font-bold">5. Q. 전기차 취득세·개소세 감면과 자동차세는 다른가요?</h2>
                <div className="rounded-lg bg-bg-card p-3 text-sm">
                  <p className="font-semibold text-text-primary">정의</p>
                  <p className="mt-1 text-text-secondary">
                    네, 완전히 다릅니다. 자동차세는 매년 내는 보유세이고, 취득세·개별소비세(개소세)는 구매 시점에만 한 번 내는
                    세금입니다. 전기차는 구매 시 취득세·개소세를 별도로 감면받지만, 매년 내는 자동차세는 그와 무관하게
                    정액 130,000원입니다.
                  </p>
                </div>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  이 부분에서 많은 사람들이 혼동합니다. "전기차는 세금 감면을 받는다"는 말은 맞지만, 어떤 세금을 감면받는지를
                  구분해야 합니다. 전기차 구입 시 받는 혜택은 <strong>취득세·개별소비세 감면</strong>입니다(지방세특례제한법·
                  개별소비세법, 감면 한도·일몰 기간은 연도별로 달라지므로 구매 전 별도 확인 필요). 이는 일회성입니다. 반면
                  자동차세는 구매 후 매년 내야 하는 보유세이고, 전기차는 이것이 정액 130,000원으로 고정되어 있습니다.
                </p>

                <div className="space-y-3 rounded-lg bg-bg-raised p-4">
                  <p className="font-semibold text-text-primary">전기차 관련 세금 구분</p>
                  <div className="space-y-2 text-sm text-text-secondary">
                    <div className="mb-3 rounded-lg bg-bg-card p-3">
                      <p className="font-semibold text-text-primary">구매 시 (일회성)</p>
                      <ul className="mt-2 list-inside list-disc space-y-1">
                        <li>
                          <strong>취득세:</strong> 비영업 승용 7% (지방세법 §12) — 전기차는 지방세특례제한법에 따라 일정
                          한도까지 감면
                        </li>
                        <li>
                          <strong>개별소비세:</strong> 개별소비세법에 따라 한도 내 감면 (교육세·부가세도 연동 감소)
                        </li>
                        <li className="text-xs italic text-text-tertiary">
                          (감면 한도·적용 기간은 연도·지자체별로 변동 — 위택스·관할 시·군·구 확인)
                        </li>
                      </ul>
                    </div>

                    <div className="rounded-lg bg-bg-card p-3">
                      <p className="font-semibold text-text-primary">매년 (지속적)</p>
                      <ul className="mt-2 list-inside list-disc space-y-1">
                        <li>
                          <strong>자동차세:</strong> 정액 100,000원 (§127①제3호)
                        </li>
                        <li>
                          <strong>지방교육세:</strong> 자동차세의 30% = 30,000원 (§151)
                        </li>
                        <li className="font-semibold text-text-primary">연 총 130,000원 (초기 취득세·개소세 감면과는 별개)</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border-l-4 border-l-danger-500 bg-danger-500/5 p-4 text-sm text-text-secondary">
                  <p className="font-semibold text-danger-700 dark:text-danger-300">주의: 혼동하기 쉬운 부분</p>
                  <p className="mt-2">
                    "전기차는 세금이 싸다" = 맞습니다. 다만 가장 큰 혜택은 <strong>구매 시점의 취득세·개소세 감면</strong>입니다.
                    자동차세만 보면 일반 가솔린차 1,500cc(273,000원)의 약 절반인 130,000원이지만, 이는 정책적 감면이 아니라
                    배기량이 없어 <strong>원래 정액으로 매겨지는</strong> 금액입니다. 차령경감도 받지 않으므로 20년 후에도 여전히
                    130,000원입니다.
                  </p>
                </div>
              </section>

              {/* 6. 영업용 전기차 */}
              <section className="space-y-4">
                <h2 className="text-2xl font-bold">6. 전기 택시나 영업용 차는 어떻게 되나요?</h2>
                <div className="rounded-lg bg-bg-card p-3 text-sm">
                  <p className="font-semibold text-text-primary">정의</p>
                  <p className="mt-1 text-text-secondary">
                    영업용 전기차는 자동차세 20,000원 + 지방교육세 6,000원 = 연 26,000원입니다. 비영업용의 130,000원보다
                    훨씬 저렴합니다. 다만 영업용도 차령경감은 적용되지 않습니다.
                  </p>
                </div>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  택시·렌터카 등 영업용으로 등록된 차량은 영업용 자동차세를 적용받습니다. 영업용 전기차의 자동차세는
                  연 20,000원 + 지방교육세 6,000원 = <strong>총 26,000원</strong>으로(§127①제3호), 비영업용 개인차
                  130,000원의 약 5분의 1 수준입니다. 영업용 전기차 역시 배기량이 없으므로 차령경감 대상은 아닙니다.
                </p>

                <div className="rounded-lg border-l-4 border-l-primary-500 bg-primary-500/5 p-4 text-sm text-text-secondary">
                  <p className="font-semibold text-text-primary">영업용 등록 시 참고</p>
                  <p className="mt-2">
                    영업용(택시 등) 전기차는 자동차세 자체가 비영업용보다 낮게 책정됩니다. 다만 영업용 등록 요건·구매 시
                    취득세·개별소비세 감면 한도는 별도 규정을 따르므로, 정확한 적용은 관할 시·군·구청 세무과 또는 위택스에서
                    확인하시기 바랍니다.
                  </p>
                </div>
              </section>

              <FaqSection items={[...FAQ_ITEMS]} />

              {/* 최종 주의사항 */}
              <section className="card border-l-2 border-l-danger-500 bg-danger-500/5">
                <h2 className="mb-3 text-lg font-semibold text-danger-700 dark:text-danger-300">
                  주의: 전기차 자동차세 결정 전 필독 주의사항
                </h2>
                <ul className="space-y-2 text-sm text-danger-700 dark:text-danger-300">
                  <li>
                    • <strong>차령경감 없음:</strong> 신차든 20년차든 매년 130,000원. "나중에 깎인다"는 말은 거짓입니다.
                  </li>
                  <li>
                    • <strong>배기량이 없음 = 정액 과세:</strong> 차량 가격, 배터리 용량, 성능과 무관하게 모두 같습니다.
                  </li>
                  <li>
                    • <strong>하이브리드는 다름:</strong> 배기량 있음 → cc 기준 과세 + 차령경감 적용 (273,000원 기준).
                  </li>
                  <li>
                    • <strong>취득세 감면과 구분:</strong> 구매 시 취득세·개소세 감면(한도·기간은 별도 확인)과 매년
                    자동차세(정액 130,000원)는 다른 세금입니다.
                  </li>
                  <li>
                    • <strong>1월 선납 할인:</strong> 연 5% 할인 가능하지만 신청은 1월 1~31일 한정입니다.
                  </li>
                  <li>
                    • <strong>지법 원문 확인:</strong> 지방세법 §127①제2호와 제3호를 직접 비교해보세요.
                  </li>
                </ul>
              </section>

              {/* 관련 계산기·가이드 */}
              <section className="card">
                <h2 className="mb-4 text-lg font-semibold">관련 계산기·가이드</h2>
                <ul className="space-y-2 text-sm">
                  <li>
                    →{' '}
                    <Link href="/calculator/vehicle-tax/" className="text-primary-600 underline dark:text-primary-500">
                      자동차세 계산기
                    </Link>
                    {' '}— 배기량별 세액 즉시 계산
                  </li>
                  <li>
                    →{' '}
                    <Link
                      href="/guide/vehicle-tax-june-payment-annual-discount-2026/"
                      className="text-primary-600 underline dark:text-primary-500"
                    >
                      자동차세 6월 납부·연납 할인 완벽 가이드
                    </Link>
                    {' '}— 1월 선납 5% 할인 신청 방법
                  </li>
                  <li>
                    →{' '}
                    <Link
                      href="/guide/january-vehicle-tax-prepayment/"
                      className="text-primary-600 underline dark:text-primary-500"
                    >
                      1월 자동차세 선납 할인 최대 절감법
                    </Link>
                    {' '}— 신청 기간·기한·할인율
                  </li>
                  <li>
                    →{' '}
                    <Link href="/category/lifestyle/" className="text-primary-600 underline dark:text-primary-500">
                      생활 계산기 카테고리
                    </Link>
                    {' '}— BMI, D-day, 평수 등 일상 계산
                  </li>
                </ul>
              </section>

              <ShareButtons
                title="전기차 자동차세 2026 | 13만원 정액·차령경감 총정리"
                url={URL}
                description="전기차는 배기량이 없어 정액 13만원 과세. 10년, 20년 지나도 변함없습니다. 차령경감 미적용 이유와 가솔린차·하이브리드와의 정확한 차이."
              />

              {/* 출처 및 면책 */}
              <section
                aria-label="출처 및 면책"
                className="rounded-lg border border-border-base p-4 text-caption text-text-tertiary"
              >
                <p className="mb-2">
                  <strong>법적 근거</strong>: 지방세법 §127①제2호(차령경감) · §127①제3호(그 밖의 승용자동차·정액) ·
                  §151(지방교육세) · 지방세법 시행령 §125(연납 할인). 참고:{' '}
                  <a
                    href="https://www.law.go.kr/"
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="text-primary-600 underline dark:text-primary-500"
                  >
                    국가법령정보센터 (law.go.kr)
                  </a>
                  ,{' '}
                  <a
                    href="https://www.easylaw.go.kr/"
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="text-primary-600 underline dark:text-primary-500"
                  >
                    찾기쉬운 생활법령 (easylaw.go.kr)
                  </a>
                  ,{' '}
                  <a
                    href="https://www.wetax.go.kr/"
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="text-primary-600 underline dark:text-primary-500"
                  >
                    위택스 자동차세 안내 (wetax.go.kr)
                  </a>
                  .
                </p>
                <p className="mb-2">
                  <strong>면책 조항</strong>: 본 가이드는 정보 제공 목적이며 세무·법적 조언이 아닙니다. 지방자치단체별 추가
                  감면 정책이 다를 수 있으므로, 실제 납부 전 주민센터 또는 시청 세무과 상담을 권장합니다.
                </p>
                <p>
                  <strong>AI 보조 작성</strong>: 본 가이드는 AI 보조 작성 후 운영자 검수를 거쳤습니다(Google AI Content Policy
                  준수). 업데이트: {DATE_MODIFIED}
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
