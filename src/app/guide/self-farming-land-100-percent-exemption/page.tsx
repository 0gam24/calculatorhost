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

const URL = 'https://calculatorhost.com/guide/self-farming-land-100-percent-exemption/';
const DATE_PUBLISHED = '2026-05-13';
const DATE_MODIFIED = '2026-05-13';

export const metadata: Metadata = {
  title: '자경농지 8년 100% 감면 완벽 정리 2026 | 조특법 §69 1억 한도',
  description:
    '자경농지 8년 양도세 100% 감면 조건·자경 요건(직접 종사 50% 이상)·거주 요건(30km 이내)·한도(연 1억/5년 2억)·신청 절차·함정 5가지·시뮬 사례.',
  keywords: [
    '자경농지',
    '자경농지 양도세',
    '자경농지 감면',
    '자경농지 100%',
    '8년 자경',
    '농지 양도세 감면',
    '조세특례제한법 69조',
    '농지 절세',
    '자경 요건',
    '농지 거주 요건',
  ],
  alternates: { canonical: URL },
  openGraph: {
    title: '자경농지 8년 100% 감면 완벽 정리 2026',
    description: '자경농지 8년 = 양도세 100% 감면. 자경(50% 이상 자기 노동) + 거주(30km) + 한도 1억.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '자경농지 8년 100% 감면 완벽 정리 2026',
    description: '조세특례제한법 §69 자경농지 양도세 100% 감면. 한도 연 1억, 5년 2억.',
  },
};

const FAQ_ITEMS = [
  {
    question: '자경농지 8년 100% 감면은 어느 법을 근거로 하나요?',
    answer:
      '조세특례제한법 §69 ①에 따릅니다. 농지를 8년 이상 직접 경작하면 양도소득세를 100% 감면받을 수 있습니다. 다만 조세특례제한법 §133에서 정한 한도(연 1억, 5년 합계 2억)가 있으므로, 양도차익이 1억을 초과하면 초과분은 일반 양도세 대상이 됩니다.',
  },
  {
    question: '자경의 정의가 무엇인가요? 위탁경영은 인정되나요?',
    answer:
      '자경은 직접 농작업에 종사하거나 농작물·다년생식물 경작에 상시 종사하는 것을 의미합니다(조특법 시행령 §66 ②). 50% 이상의 자기 노동력이 투입되어야 하며, 위탁경영이나 대리경작은 인정되지 않습니다. 자동화 농장이나 회사 고용 형태로는 자경 요건을 충족할 수 없습니다.',
  },
  {
    question: '거주 요건은 어떻게 되나요? 농지에서 떨어진 곳에 살면 안 되나요?',
    answer:
      '거주 요건(조특법 시행령 §66 ① 1호)은 농지 소재지로부터 직선거리 30km 이내에 거주해야 합니다. 또한 해당 시·군·구 또는 인접 시·군·구에도 포함됩니다. 예: 강원도 춘천의 농지를 소유하면 춘천, 인접 지역, 또는 직선거리 30km 이내 거주지에서만 요건 충족. 거주 입증은 주민등록등본으로 합니다.',
  },
  {
    question: '양도차익이 1억을 초과하면 초과분은 어떻게 과세되나요?',
    answer:
      '조세특례제한법 §133 한도에 따라 연 1억, 5년 합계 2억까지만 100% 감면됩니다. 예: 양도차익 2.9억인 경우 1억(감면) + 1.9억(일반 양도세 대상). 자경농지는 사업용 토지로 분류되므로 비사업용 중과는 적용되지 않고 일반 누진세 적용. 1.875억(기본공제 250만 차감) × 38% − 누진공제 1,994만 ≈ 약 5,131만 + 지방소득세 513만 = 약 5,644만 정도.',
  },
  {
    question: '상속받은 농지도 8년 자경하면 100% 감면이 되나요?',
    answer:
      '네. 상속받은 농지의 경우 피상속인(전 소유자)이 자경한 기간을 합산하여 8년 요건을 판단합니다(조특법 §69 + 시행령 §66). 예: 아버지가 5년 자경 후 상속받고 본인이 3년 더 자경 → 합산 8년으로 100% 감면 대상. 다만 상속개시일로부터 일정 기간 내 양도해야 하는 등 추가 요건이 있을 수 있으므로 세무사 확인 필수.',
  },
];

export default function SelfFarmingLand100PercentExemptionGuide() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '자경농지 8년 100% 감면 완벽 정리' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '자경농지 8년 100% 감면 완벽 정리 2026',
    description:
      '자경농지 양도세 100% 감면 조건·자경 정의(50% 이상 노동력)·거주 요건(30km)·한도(연 1억/5년 2억)·신청 절차·시뮬 사례·함정 5가지.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    type: 'Article',
    keywords: ['자경농지', '양도세 감면', '100%', '8년', '조세특례'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '자경농지 8년 100% 감면 완벽 정리 2026',
    description: '자경농지 8년 양도세 100% 감면 조건·자경/거주 요건·한도 1억·절차·함정.',
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
                    { name: '자경농지 8년 100% 감면 완벽 정리' },
                  ]}
                />
                <h1 className="mt-4 text-3xl font-bold text-text-primary md:text-4xl">
                  자경농지 8년 100% 감면 완벽 정리 2026
                </h1>
                <p className="mt-3 text-lg text-text-secondary" data-speakable>
                  농지를 직접 경작한다면 <strong>양도세를 완전히 면제</strong>받을 수 있습니다. 8년 이상 농지를
                  자경하면 조세특례제한법 §69에 따라 양도소득세를 100% 감면받을 수 있습니다. 하지만 자경의 정의,
                  거주 요건, 1억 원 연간 한도 등 까다로운 조건들이 있습니다. 이 가이드에서는 자경농지 감면의
                  정확한 요건부터 신청 방법, 자주 묻는 함정 5가지까지 완전히 정리합니다(조특법 §69 ①, §133,
                  시행령 §66).
                </p>
              </header>

              <AdSlot slot="guide-farming-top" format="horizontal" />

              {/* 1. 자경농지 감면의 정의 */}
              <section aria-label="자경농지 감면의 정의" className="card">
                <h2 className="mb-4 text-2xl font-semibold">자경농지 양도세 100% 감면이란?</h2>
                <p className="mb-3 text-text-secondary" data-speakable>
                  자경농지 감면은 농지를 장기간 직접 경작하는 농민에게 주는 세제 혜택입니다. 양도차익에서
                  100%를 차감하여 양도세 부담을 완전히 제거하는 것입니다. 다만 이 감면은 연 1억 원, 5년 합계
                  2억 원의 한도가 있으므로(조특법 §133), 이를 초과하는 부분은 일반 양도세 과세 대상이 됩니다.
                </p>
                <div className="rounded-lg bg-bg-card p-4 text-sm text-text-secondary">
                  <p className="mb-2">
                    <strong className="text-text-primary">감면 메커니즘</strong>
                  </p>
                  <p>
                    과세양도소득 = 양도차익 × (1 − 공제율). 자경농지는 공제율이 100%이므로 과세양도소득 = 0이
                    되어 양도세가 발생하지 않습니다. 예: 양도차익 5,000만 원, 100% 감면 → 양도세 0원. 단,
                    차익이 1억을 초과하면 초과분은 일반 양도세 계산.
                  </p>
                </div>
              </section>

              {/* 2. 핵심 요건 한눈에 */}
              <section aria-label="핵심 요건 요약" className="card border-l-4 border-l-primary-500">
                <h2 className="mb-4 text-2xl font-semibold">자경농지 100% 감면 4가지 필수 요건</h2>
                <p className="mb-4 text-text-secondary" data-speakable>
                  조세특례제한법 §69과 시행령 §66에서 정한 요건을 모두 충족해야만 감면이 적용됩니다. 하나라도
                  미충족하면 감면을 받을 수 없습니다.
                </p>
                <div className="space-y-3">
                  <div className="rounded-lg bg-bg-card p-3">
                    <p className="mb-1 font-semibold text-text-primary">요건 1: 보유 기간 8년 이상 (자경 기간)</p>
                    <p className="text-sm text-text-secondary">
                      농지 취득일(잔금 청산일)부터 양도일(거래 완료일)까지 자경 기간이 8년 이상이어야 합니다(조특법
                      §69 ①). 상속받은 경우 피상속인의 자경 기간을 합산합니다(조특법 §69 + 시행령 §66).
                    </p>
                  </div>
                  <div className="rounded-lg bg-bg-card p-3">
                    <p className="mb-1 font-semibold text-text-primary">요건 2: 자경 (직접 경작, 50% 이상 노동력)</p>
                    <p className="text-sm text-text-secondary">
                      직접 농작업에 종사하거나 농작물·다년생식물(과수, 차, 약초 등) 경작에 상시 종사해야 합니다.
                      50% 이상의 자기 노동력이 투입되어야 하며, 위탁경영, 대리경작, 자동화 시설만으로는 인정되지
                      않습니다(시행령 §66 ②).
                    </p>
                  </div>
                  <div className="rounded-lg bg-bg-card p-3">
                    <p className="mb-1 font-semibold text-text-primary">요건 3: 거주 (농지로부터 직선거리 30km)</p>
                    <p className="text-sm text-text-secondary">
                      농지 소재지로부터 직선거리 30km 이내에 거주해야 합니다. 또한 농지가 있는 시·군·구 또는
                      인접한 시·군·구도 포함됩니다(시행령 §66 ① 1호). 거주 입증은 주민등록등본(취득 후 해당
                      주소 이전)으로 합니다.
                    </p>
                  </div>
                  <div className="rounded-lg bg-bg-card p-3">
                    <p className="mb-1 font-semibold text-text-primary">요건 4: 농지 (양도일 현재)</p>
                    <p className="text-sm text-text-secondary">
                      양도일 현재 그 토지가 농지 상태여야 합니다(농지법 §2). 자동화온실, 건물, 비닐하우스가
                      있어도 토지 자체가 농지로 분류되면 인정됩니다. 다만 건물·택지로 전용되거나 휴경상태로
                      장기 방치된 경우는 문제가 될 수 있습니다.
                    </p>
                  </div>
                </div>
              </section>

              {/* 3. 자경의 정의 — 위탁경영과의 구분 */}
              <section aria-label="자경의 정의" className="card">
                <h2 className="mb-4 text-2xl font-semibold">자경의 정의: 직접 경작 vs 위탁경영</h2>
                <p className="mb-3 text-text-secondary" data-speakable>
                  자경(조특법 시행령 §66 ②)은 농업인이 직접 농작업에 종사하는 것입니다. 50% 이상의 자기 노동력
                  투입이 필수이며, 위탁경영이나 대리경작은 자경으로 인정되지 않습니다. 이것이 가장 까다로운
                  입증 요건입니다.
                </p>
                <div className="overflow-x-auto" data-speakable>
                  <table className="w-full text-sm">
                    <caption className="sr-only">자경 vs 위탁경영 비교</caption>
                    <thead>
                      <tr className="border-b border-border-base text-left">
                        <th className="py-2 pr-4 font-semibold">구분</th>
                        <th className="py-2 pr-4 font-semibold">자경 (인정)</th>
                        <th className="py-2 font-semibold">위탁경영 (불인정)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-subtle">
                        <td className="py-2 pr-4 font-semibold">정의</td>
                        <td className="py-2 pr-4">농업인 직접 경작</td>
                        <td className="py-2">타인에게 경작 위탁</td>
                      </tr>
                      <tr className="border-b border-border-subtle">
                        <td className="py-2 pr-4 font-semibold">노동력</td>
                        <td className="py-2 pr-4">50% 이상 자기 투입</td>
                        <td className="py-2">타인이 90% 이상 담당</td>
                      </tr>
                      <tr className="border-b border-border-subtle">
                        <td className="py-2 pr-4 font-semibold">입증</td>
                        <td className="py-2 pr-4">
                          세금 기록, 출하 증명,
                          <br />
                          이웃 증언
                        </td>
                        <td className="py-2">위탁료 지급 증명</td>
                      </tr>
                      <tr>
                        <td className="py-2 pr-4 font-semibold">감면 여부</td>
                        <td className="py-2 pr-4 text-primary-600">✅ 가능</td>
                        <td className="py-2 text-danger-500">❌ 불가</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="mt-4 rounded-lg bg-bg-card p-4 text-sm text-text-secondary">
                  <p className="mb-2">
                    <strong className="text-text-primary">자경 입증 자료</strong>
                  </p>
                  <ul className="list-inside list-disc space-y-1">
                    <li>농산물 출하 영수증 (산지유통센터, 농협 판매 기록)</li>
                    <li>농산물 판매 소득 증명 (세무서 소득신고 기록)</li>
                    <li>마을 이웃 증명 (경작 사실 인정 서류)</li>
                    <li>공과금 납부 기록 (조용수료, 농수도료 등)</li>
                    <li>생산자 인증 기록 (GAP, 유기농 등)</li>
                  </ul>
                </div>
              </section>

              {/* 4. 거주 요건 */}
              <section aria-label="거주 요건" className="card">
                <h2 className="mb-4 text-2xl font-semibold">거주 요건: 직선거리 30km 이내</h2>
                <p className="mb-3 text-text-secondary" data-speakable>
                  거주 요건은 조특법 시행령 §66 ① 1호에 정의되어 있습니다. 농지 소재지로부터 직선거리 30km
                  이내에 거주하거나, 농지와 같은 시·군·구 또는 인접 시·군·구에 거주해야 합니다. 거주 입증은
                  주민등록등본을 통해 합니다.
                </p>
                <div className="rounded-lg bg-bg-card p-4 text-sm text-text-secondary">
                  <p className="mb-2">
                    <strong className="text-text-primary">거주 요건의 3가지 경로 (하나만 충족하면 O)</strong>
                  </p>
                  <ol className="list-inside list-decimal space-y-2">
                    <li>
                      <strong>같은 시·군·구 거주</strong>: 농지와 동일 시·군·구에 거주하는 경우 자동 인정
                    </li>
                    <li>
                      <strong>인접 시·군·구 거주</strong>: 농지와 인접한 시·군·구에 거주하는 경우 인정
                    </li>
                    <li>
                      <strong>직선거리 30km 이내</strong>: 농지로부터 직선거리 30km 이내에 거주하는 경우 인정
                    </li>
                  </ol>
                </div>
                <p className="mt-3 text-sm text-text-tertiary" data-speakable>
                  예: 강원도 춘천시의 농지를 소유하면 춘천시, 또는 인접 시/군(강릉시, 홍천군, 남이섬 등), 또는
                  춘천으로부터 직선거리 30km 이내의 어디든 거주 가능. 거주 입증은 주민등록등본의 주소 이전 시점으로
                  확인합니다.
                </p>
              </section>

              <AdSlot slot="guide-farming-mid" format="rectangle" />

              {/* 5. 한도 (1억/5년 2억) */}
              <section aria-label="한도 규정" className="card border-l-4 border-l-danger-500">
                <h2 className="mb-4 text-2xl font-semibold">한도: 연 1억, 5년 합계 2억</h2>
                <p className="mb-3 text-text-secondary" data-speakable>
                  자경농지 100% 감면은 조세특례제한법 §133에 따라 연 1억 원, 5년 합계 2억 원 한도가 적용됩니다.
                  이 한도를 초과하는 부분은 일반 양도세 대상이 됩니다. 따라서 매우 큰 양도차익이 있는 경우
                  주의가 필요합니다.
                </p>
                <div className="rounded-lg bg-bg-card p-4 text-sm text-text-secondary">
                  <p className="mb-2">
                    <strong className="text-text-primary">한도 계산 원칙</strong>
                  </p>
                  <ul className="list-inside list-disc space-y-1">
                    <li>연도별 한도: 1년에 최대 1억 원까지만 감면 (나머지는 일반 양도세)</li>
                    <li>누적 한도: 5년간 누적 2억 원까지만 감면 (초과분은 일반 양도세)</li>
                    <li>미사용 한도 이월: 불가능 (해당 연도 미사용 한도는 소멸)</li>
                    <li>여러 번 양도: 같은 농지를 여러 번 양도한 경우 각 양도마다 한도 적용</li>
                  </ul>
                </div>
              </section>

              {/* 6. 시뮬레이션 3가지 */}
              <section aria-label="시뮬레이션 3가지" className="card">
                <h2 className="mb-4 text-2xl font-semibold">실제 사례 — 감면액 계산 3가지</h2>

                <div className="mb-6 rounded-lg bg-bg-card p-4">
                  <p className="mb-2 font-semibold text-text-primary">
                    사례 1: 한도 이내 (8년 자경, 양도차익 5,000만 원)
                  </p>
                  <ul className="list-inside list-disc space-y-1 text-sm text-text-secondary">
                    <li>농지 취득가 2억 / 양도가 2.5억 / 경비 500만 = 양도차익 5,000만 원</li>
                    <li>자경 요건: 8년 이상 직접 경작 ✅</li>
                    <li>거주 요건: 농지로부터 20km 이내 거주 ✅</li>
                    <li>한도: 연 1억 미충족 (5,000만 원 &lt; 1억) ✅</li>
                    <li className="font-semibold text-primary-600">감면액 = 5,000만 원 (100% 감면)</li>
                    <li className="font-semibold text-text-primary">양도세 = 0원</li>
                  </ul>
                </div>

                <div className="mb-6 rounded-lg bg-bg-card p-4">
                  <p className="mb-2 font-semibold text-text-primary">
                    사례 2: 한도 초과 (8년 자경, 양도차익 2.9억 원)
                  </p>
                  <ul className="list-inside list-disc space-y-1 text-sm text-text-secondary">
                    <li>농지 취득가 3억 / 양도가 6억 / 경비 1,000만 = 양도차익 2.9억</li>
                    <li>자경 요건: 8년 이상 직접 경작 ✅</li>
                    <li>거주 요건: 농지 인접 시·군·구 거주 ✅</li>
                    <li>감면 대상: 1억 원 (조특법 §133 연 한도)</li>
                    <li>일반 양도세 대상: 1.9억 원 (초과분 — 자경농지는 사업용 토지 분류로 비사업용 중과 X)</li>
                    <li>과세표준 = 1.9억 − 250만(기본공제) = 1.875억 → 누진세율 38%(1.5~3억 구간) − 누진공제 1,994만</li>
                    <li className="font-semibold text-text-primary">
                      양도세 ≈ 1.875억 × 38% − 1,994만 ≈ 5,131만 + 지방소득세 약 513만 = 약 5,644만
                    </li>
                  </ul>
                </div>

                <div className="rounded-lg bg-bg-card p-4">
                  <p className="mb-2 font-semibold text-text-primary">
                    사례 3: 자경 요건 미충족 (위탁경영, 양도차익 5,000만 원)
                  </p>
                  <ul className="list-inside list-disc space-y-1 text-sm text-text-secondary">
                    <li>농지 취득가 2억 / 양도가 2.5억 / 경비 500만 = 양도차익 5,000만 원</li>
                    <li>자경 요건: 위탁경영 (위탁료 지급 기록) ❌</li>
                    <li>거주 요건: 농지로부터 15km 이내 거주 ✅</li>
                    <li className="font-semibold text-danger-500">감면 불가 (자경 요건 미충족)</li>
                    <li className="font-semibold text-text-primary">
                      양도세: 약 2,000만 원 (일반 비사업용 토지 누진세 적용)
                    </li>
                  </ul>
                </div>
              </section>

              {/* 7. FAQ */}
              <FaqSection items={[...FAQ_ITEMS]} />

              {/* 8. 함정 5가지 */}
              <section aria-label="함정 5가지" className="card border-l-4 border-l-danger-500">
                <h2 className="mb-3 text-xl font-semibold">⚠️ 자경농지 양도세 감면 함정 5가지</h2>
                <div className="space-y-3 text-text-secondary">
                  <div>
                    <p className="mb-1">
                      <strong className="text-text-primary">함정 1: 위탁경영으로 인정되면 감면 완전 배제</strong>
                    </p>
                    <p className="text-sm">
                      농사를 아예 타인(이웃 농민, 농업회사)에게 맡기고 위탁료만 지급한 경우, 자경으로 인정되지
                      않습니다. 세무서는 판매 기록, 출하 영수증, 이웃 증언 등을 종합해 판단합니다. 위탁료 수표나
                      계약서만으로 입증하려면 세무사 상담 필수.
                    </p>
                  </div>
                  <div>
                    <p className="mb-1">
                      <strong className="text-text-primary">함정 2: 거주 증명이 부족하면 감면 박탈</strong>
                    </p>
                    <p className="text-sm">
                      주민등록등본에 농지 소재지 또는 인접 지역 주소가 없으면 거주 요건 미충족으로 판정됩니다.
                      예: 농지는 강원도인데 서울에만 거주 기록이 있으면 거주 요건 탈락. 30km 이내 거주도 직선거리
                      계산으로 세무서가 판단하므로, 사전에 확인 필요.
                    </p>
                  </div>
                  <div>
                    <p className="mb-1">
                      <strong className="text-text-primary">함정 3: 자동화 온실·비닐하우스만으로는 자경 미인정</strong>
                    </p>
                    <p className="text-sm">
                      온실 자동화 시스템으로만 경작하거나, 고용 근로자만 일하고 본인은 관리자 역할만 하면 자경
                      미인정. 조특법 시행령 §66 ②에서 명시한 "직접 농작업"·"50% 이상 자기 노동력" 기준 미충족.
                      농지 소유자 본인의 실제 손으로 일하는 증거 필수.
                    </p>
                  </div>
                  <div>
                    <p className="mb-1">
                      <strong className="text-text-primary">함정 4: 한도 초과분에 대한 이월 불가</strong>
                    </p>
                    <p className="text-sm">
                      연 1억 한도를 사용하지 않은 해가 있어도 다음 해로 이월할 수 없습니다(한도 소멸). 예: 올해
                      5,000만 원만 양도하면 남은 5,000만 원 한도는 내년에 사용 불가. 따라서 큰 양도차익이 예상되면
                      연도별 양도 일정을 세무사와 협의 필수.
                    </p>
                  </div>
                  <div>
                    <p className="mb-1">
                      <strong className="text-text-primary">함정 5: 8년 기간 계산 오류 (상속 병합)</strong>
                    </p>
                    <p className="text-sm">
                      상속받은 농지는 피상속인이 자경한 기간을 합산합니다(조특법 §69 + 시행령 §66). 예: 부모가
                      5년 자경 후 상속, 본인 3년 → 8년 계산. 하지만 상속세 과세, 다중 상속, 상속개시일 기한 단절,
                      증여 합산 등 복잡 사정이 있으면 세무사 확인 필수. 상속받은 날짜부터 8년 새로 계산되는 것이
                      아님을 주의.
                    </p>
                  </div>
                </div>
              </section>

              {/* 9. 신청·신고 절차 */}
              <section aria-label="신청 신고 절차" className="card">
                <h2 className="mb-4 text-2xl font-semibold">양도소득세 신고 시 자경농지 감면 신청 절차</h2>
                <p className="mb-4 text-text-secondary" data-speakable>
                  자경농지 양도세 감면을 적용받으려면 양도소득세 신고서에서 올바르게 신청해야 합니다. 신고하지
                  않거나 잘못 입력하면 감면을 받을 수 없으므로, 세무사 자문이 권장됩니다.
                </p>
                <ol className="list-inside list-decimal space-y-3 text-sm text-text-secondary">
                  <li>
                    <strong>홈택스 양도소득세 신고 신청</strong>
                    <br />
                    양도 달의 말일부터 2개월 이내에{' '}
                    <a
                      href="https://www.hometax.go.kr"
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="text-primary-600 underline dark:text-primary-500"
                    >
                      홈택스
                    </a>
                    에서 "양도소득세 신고"를 선택하여 신고 양식 작성.
                  </li>
                  <li>
                    <strong>자경농지 감면 특별신청 란</strong>
                    <br />
                    "조세특례" 또는 "감면" 섹션에서 자경농지 100% 감면 적용을 명시. 홈택스 양식이 업데이트되었으므로
                    최신 버전 확인 필수.
                  </li>
                  <li>
                    <strong>자경·거주 기간 입력</strong>
                    <br />
                    취득일부터 양도일까지의 보유 기간(연도), 실제 자경한 기간(연도), 거주지 주소 및 주민등록 이전일자
                    입력.
                  </li>
                  <li>
                    <strong>첨부 서류 준비</strong>
                    <br />
                    주민등록등본(거주 입증), 농산물 출하 영수증(자경 입증), 공과금 영수증(몇 해 기록), 마을 이웃 증명서
                    (선택), 세금 납부 기록 등. 세무서 제출 시 팩스 또는 방문 제출.
                  </li>
                  <li>
                    <strong>세무서 담당자 사전 상담</strong>
                    <br />
                    신고 전 해당 농지 관할 세무서(농지 소재지 관할)에 전화하여 자경 입증 자료, 거주 요건 확인,
                    한도 계산 등을 상담. 거주 거리 확인도 미리 물어보기.
                  </li>
                  <li>
                    <strong>신고서 제출 및 확인</strong>
                    <br />
                    홈택스 전자 제출 또는 세무서 방문 제출 후, 확정 신고 결과 통지가 올 때까지 기다림. 보정 요청이
                    올 수 있으므로 준비된 서류를 빠르게 제출.
                  </li>
                </ol>
              </section>

              {/* 10. 비사업용 토지 중과 배제 */}
              <section aria-label="비사업용 토지 중과" className="card">
                <h2 className="mb-4 text-2xl font-semibold">자경농지는 비사업용 토지 중과 배제</h2>
                <p className="mb-3 text-text-secondary" data-speakable>
                  자경농지는 소득세법 §104의3에서 사업용 토지로 분류됩니다. 따라서 비사업용 토지에 적용되는
                  60% 중과세(누진세율 + 20%p)를 받지 않습니다(조특법 §69 ①). 이는 자경농지 감면의 또 다른
                  장점입니다.
                </p>
                <div className="rounded-lg bg-bg-card p-4 text-sm text-text-secondary">
                  <p className="mb-2">
                    <strong className="text-text-primary">비사업용 토지와의 비교</strong>
                  </p>
                  <ul className="list-inside list-disc space-y-1">
                    <li>
                      <strong>자경농지</strong>: 사업용 토지 분류 → 누진세율 적용, 중과세(60%) 배제, 감면 가능
                    </li>
                    <li>
                      <strong>비사업용 토지 (논밭이 아닌 일반 토지)</strong>: 누진세율 + 20%p 중과 적용, 감면 불가능
                    </li>
                    <li>
                      <strong>예시</strong>: 양도차익 1억 자경농지 vs 일반 토지. 자경농지는 감면 가능, 일반 토지는 약
                      2,500만 원 세금 발생.
                    </li>
                  </ul>
                </div>
              </section>

              {/* 11. 관련 계산기·가이드 */}
              <section aria-label="관련 계산기·가이드" className="card">
                <h2 className="mb-4 text-2xl font-semibold">관련 계산기·가이드</h2>
                <ul className="space-y-2 text-text-secondary">
                  <li>
                    →{' '}
                    <Link href="/calculator/capital-gains-tax/" className="text-primary-600 underline dark:text-primary-500">
                      양도소득세 계산기
                    </Link>{' '}
                    — 실제 자경농지 감면 후 세금 시뮬레이션
                  </li>
                  <li>
                    →{' '}
                    <Link
                      href="/guide/one-household-12-billion-exemption/"
                      className="text-primary-600 underline dark:text-primary-500"
                    >
                      1세대1주택 12억 한도 완전 정리
                    </Link>{' '}
                    — 주택 양도 시 비과세 조건 비교
                  </li>
                  <li>
                    →{' '}
                    <Link href="/guide/capital-gains-tax-tips/" className="text-primary-600 underline dark:text-primary-500">
                      양도세 절세 7가지
                    </Link>{' '}
                    — 자경농지 외 양도세 감면 전략
                  </li>
                  <li>
                    →{' '}
                    <Link href="/guide/august-capital-gains-tax-review/" className="text-primary-600 underline dark:text-primary-500">
                      8월 양도세 검토 가이드
                    </Link>{' '}
                    — 연간 양도세 일정 및 신고 기한
                  </li>
                  <li>
                    →{' '}
                    <Link href="/guide/capital-gains-tax-5-steps/" className="text-primary-600 underline dark:text-primary-500">
                      양도소득세 5단계 계산법
                    </Link>{' '}
                    — 양도차익 → 기본공제 → 누진세 계산 정확히 이해하기
                  </li>
                </ul>
              </section>

              <ShareButtons
                title="자경농지 8년 100% 감면 완벽 정리 2026"
                url={URL}
                description="자경농지 8년 양도세 100% 감면 조건·자경 요건·거주 요건·한도 1억·절차·함정."
              />

              {/* 출처·면책 */}
              <section
                aria-label="출처 및 면책"
                className="rounded-lg border border-border-base p-4 text-caption text-text-tertiary"
              >
                <p className="mb-2">
                  <strong>법적 근거</strong>: 조세특례제한법 §69 (자경농지에 대한 양도소득세 감면) · §69 ①
                  (8년 이상 자경 시 100% 감면) · §69 ③ (상속 시 피상속인 기간 합산) · §133 (조세특례 적용 한도
                  — 연 1억, 5년 2억) · 시행령 §66 ① 1호 (거주 요건 — 직선거리 30km) · 시행령 §66 ② (자경의 정의
                  — 50% 이상 자기 노동력) · 소득세법 §104의3 (사업용 토지 분류) · §103 (양도소득 기본공제 250만 원)
                  · 농지법 §2 (농지의 정의). 참고:{' '}
                  <a
                    href="https://www.nts.go.kr"
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="text-primary-600 underline dark:text-primary-500"
                  >
                    국세청
                  </a>
                  , <a
                    href="https://www.mafra.go.kr"
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="text-primary-600 underline dark:text-primary-500"
                  >
                    농림축산식품부
                  </a>
                  , <a
                    href="https://www.law.go.kr"
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="text-primary-600 underline dark:text-primary-500"
                  >
                    법령정보센터
                  </a>
                  .
                </p>
                <p className="mb-2">
                  <strong>면책조항</strong>: 본 가이드는 일반 정보 제공 목적이며 세무·법적 조언이 아닙니다. 자경의
                  인정 범위, 거주 거리 계산, 기간 합산, 다중 상속, 휴경 상태 평가 등 개별 사정에 따라 적용이
                  크게 달라질 수 있으므로, 반드시 세무사 또는 국세청 농업세정과 상담을 통해 확정하시기 바랍니다.
                  잘못된 신고로 가산세나 추징이 발생할 수 있습니다.
                </p>
                <p>
                  <strong>업데이트</strong>: {DATE_MODIFIED} · 작성·검수: 김준혁 (스마트데이터샵). 본 가이드는
                  AI 보조 작성 후 운영자 검수 발행되었습니다.
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
