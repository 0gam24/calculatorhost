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

const URL = 'https://calculatorhost.com/guide/housing-subscription-score-84-points-2026/';
const DATE_PUBLISHED = '2026-06-27';
const DATE_MODIFIED = '2026-06-27';

export const metadata: Metadata = {
  title: '청약가점 84점 만점 계산법 2026 | 무주택·부양가족·통장 점수표',
  description:
    '청약가점 3요소(무주택기간 32점·부양가족수 35점·청약통장 17점) 배분 방식. 각 항목 점수 계산 표·경계값 사례·유의사항. 민영주택·국민주택 가점제·순위제 구분. 한국주택공급규칙(별표1) 기준.',
  keywords: [
    '청약가점 84점',
    '청약 점수',
    '무주택 기간 점수',
    '부양가족 가점',
    '청약통장 가입기간 점수',
    '주택공급에 관한 규칙',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '청약가점 84점 계산법' }],
    title: '청약가점 84점 만점 계산법 2026',
    description: '무주택기간·부양가족·청약통장 3요소 점수 배분. 각 항목별 계산 표와 사례.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
};

const FAQ_ITEMS = [
  {
    question: '청약가점 84점은 어떻게 구성되나요?',
    answer:
      '무주택기간 최대 32점 + 부양가족수 최대 35점 + 청약통장 가입기간 최대 17점 = 84점 만점. 이는 주택공급에 관한 규칙(별표1) 가점제 기준. 각 항목은 독립적으로 계산되며, 점수 반올림은 없습니다. 만 30세 미만 미혼자나 결혼 이전자는 무주택기간 산정 제외 등 특례가 있으니 유의하세요.',
  },
  {
    question: '무주택 기간은 1년에 2점씩 가산되나요?',
    answer:
      '정확히는, 1년 미만 2점이고, 1년 이상부터 매 1년마다 추가 2점씩 가산입니다. 예) 1년 미만=2점, 1년 이상 2년 미만=4점, 2년 이상 3년 미만=6점... 15년 이상=32점(상한). 월 단위는 절사되므로 14년 11개월은 14년차 30점입니다.',
  },
  {
    question: '부양가족은 본인도 포함되나요?',
    answer:
      '네. 부양가족은 본인+배우자+직계비속입니다. 예) 본인 1명=5점, 본인+자녀 2명=3명 15점, 본인+자녀 2명+부모 1명=4명 20점. 단, 만 30세 이상 미혼 자녀는 제외되는 경우가 많으니 청약홈에서 본인 정보를 사전 등록해 확인하세요.',
  },
  {
    question: '청약통장을 6개월만 유지해도 점수가 나오나요?',
    answer:
      '네. 청약통장 가입기간 최소 6개월 미만 시 1점, 6개월 이상 1년 미만 시 2점. 단, 실제 청약 자격은 통장 개설 12개월 경과 후 월납(또는 일시납)을 시작해야 하는데, 자격 요건과 가점 계산은 별개입니다. 가점은 "6개월 이상이면 2점"이지만, 청약 신청은 "12개월 경과해야 가능".',
  },
  {
    question: '무주택 15년, 부양가족 본인 포함 5명, 청약통장 7년이면 몇 점인가요?',
    answer:
      '무주택 15년 이상 = 32점(상한), 부양가족 본인 포함 5명 = 25점, 청약통장 7년(7년 이상 8년 미만) = 9점. 합계 32 + 25 + 9 = 66점입니다. 각 항목은 독립적으로 계산되며 점수 반올림은 없습니다. 정확한 점수는 청약홈 가점조회에서 확인하세요.',
  },
  {
    question: '가점이 높아도 당첨이 안 될 수 있나요?',
    answer:
      '네. 청약 모집 인원이 적거나 신청자가 많으면, 같은 84점이라도 상대 순위에 따라 당첨이 결정됩니다. 예) 모집 10명, 신청자 100명 가운데 84점이 15명이면, 상위 10명만 당첨. 또한 추첨제 비율(보통 15%)에 선발되면 가점과 무관하게 복권식으로 당첨됩니다. 정확한 확률은 청약홈의 "통계" 탭에서 과거 청약 결과를 참고하세요.',
  },
  {
    question: '민영주택과 국민주택의 가점제가 다른가요?',
    answer:
      '네. 민영주택(전용면적 85㎡ 이하)은 가점제(3요소 84점)를 적용합니다. 국민주택(전용면적 85㎡ 이하)은 순위제를 적용하는 경우가 많습니다. 순위제는 가점이 아닌 "청약신청 순서"로 당첨 여부를 결정하므로, 같은 청약홈이라도 모집 공고를 꼭 읽고 "가점제" vs "순위제" 여부를 확인하세요.',
  },
  {
    question: '혼인 상태가 가점에 영향을 주나요?',
    answer:
      '주택공급에 관한 규칙(별표1)의 3요소(무주택·부양가족·통장)에는 혼인 여부가 없습니다. 다만, 일부 LH 청약이나 특화단지 청약에서는 "혼인자 추가 1점" 같은 별도 가점이 있을 수 있습니다. 모집공고별로 다르므로, 청약홈에서 각 단지마다 "청약자격" → "추가가점" 항목을 꼭 확인하세요.',
  },
];

export default function HousingSubscriptionScore84PointsPage() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '청약가점 84점 계산법' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '청약가점 84점 만점 계산법 (2026)',
    description:
      '무주택기간·부양가족수·청약통장 가입기간 3요소 점수 배분 방식. 각 항목별 점수표·경계값 사례·유의사항.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['청약가점', '무주택', '부양가족', '청약통장', '가점제'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '청약가점 84점 만점 계산법 2026',
    description:
      '청약가점 3요소 배분·각 항목 점수표·경계값 사례·민영 vs 국민주택 구분.',
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
                    { name: '청약가점 84점 계산법' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">청약 대기자 · 10분 읽기 · 2026-06-27</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  청약가점 84점 만점 계산법
                  <br />
                  <span className="text-2xl text-text-secondary">— 무주택·부양가족·통장 3요소 점수표</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  청약 당첨을 목표로 하는 무주택자에게 가점제는 필수 이해 영역입니다. 주택공급에 관한 규칙(별표1)에 정의된 청약가점 3요소—무주택기간(32점)·부양가족수(35점)·청약통장 가입기간(17점)—를 정확히 계산하고 합산하면 총 84점 만점이 나옵니다. 이 가이드는 각 요소별 점수 계산 방식을 표와 함께 명시하고, 실제 시뮬레이션으로 검증합니다.
                </p>
              </header>

              <AdSlot slot="guide-housing-subscription-score-84-points-2026-top" format="horizontal" />

              <div className="rounded-lg border border-border-base bg-bg-card p-4">
                <p className="font-semibold text-text-primary">청약가점 3요소 합산 구조</p>
                <p className="mt-2 text-text-secondary">
                  무주택기간(최대 32점) + 부양가족수(최대 35점) + 청약통장 가입기간(최대 17점) = 84점
                </p>
                <p className="mt-1 text-sm text-text-tertiary">
                  근거: 주택공급에 관한 규칙(별표1). 각 요소는 독립적으로 계산되며, 합산에 상한선은 없습니다.
                </p>
              </div>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">1. 무주택기간(32점 만점) — 1년 미만 시 2점 시작</h2>
                <p>
                  무주택기간은 <strong>청약 신청일 기준</strong>으로 계산됩니다. 1년 미만일 때 2점이 주어지고, 이후 매 1년마다 추가 2점씩 가산되어 15년 이상 시 32점(상한)에 도달합니다.
                </p>
                <table className="w-full border-collapse text-sm">
                  <caption className="mb-2 text-left font-semibold text-text-primary">무주택기간 점수표</caption>
                  <thead>
                    <tr className="border-b border-border-base">
                      <th scope="col" className="border-b border-border-base bg-bg-raised px-3 py-2 text-left font-semibold text-text-primary">무주택 기간</th>
                      <th scope="col" className="border-b border-border-base bg-bg-raised px-3 py-2 text-left font-semibold text-text-primary">점수</th>
                      <th scope="col" className="border-b border-border-base bg-bg-raised px-3 py-2 text-left font-semibold text-text-primary">계산 예시</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-border-base">
                      <td className="px-3 py-2 text-text-primary">1년 미만</td>
                      <td className="px-3 py-2 font-semibold text-text-primary">2점</td>
                      <td className="px-3 py-2 text-text-secondary">기본값</td>
                    </tr>
                    <tr className="border-b border-border-base bg-bg-card">
                      <td className="px-3 py-2 text-text-primary">1년 이상 2년 미만</td>
                      <td className="px-3 py-2 font-semibold text-text-primary">4점</td>
                      <td className="px-3 py-2 text-text-secondary">2 + 2×1</td>
                    </tr>
                    <tr className="border-b border-border-base">
                      <td className="px-3 py-2 text-text-primary">2년 이상 3년 미만</td>
                      <td className="px-3 py-2 font-semibold text-text-primary">6점</td>
                      <td className="px-3 py-2 text-text-secondary">2 + 2×2</td>
                    </tr>
                    <tr className="border-b border-border-base bg-bg-card">
                      <td className="px-3 py-2 text-text-primary">5년 이상 6년 미만</td>
                      <td className="px-3 py-2 font-semibold text-text-primary">12점</td>
                      <td className="px-3 py-2 text-text-secondary">2 + 2×5</td>
                    </tr>
                    <tr className="border-b border-border-base">
                      <td className="px-3 py-2 text-text-primary">10년 이상 11년 미만</td>
                      <td className="px-3 py-2 font-semibold text-text-primary">22점</td>
                      <td className="px-3 py-2 text-text-secondary">2 + 2×10</td>
                    </tr>
                    <tr className="border-b border-border-base bg-bg-card">
                      <td className="px-3 py-2 text-text-primary">15년 이상</td>
                      <td className="px-3 py-2 font-semibold text-text-primary">32점(상한)</td>
                      <td className="px-3 py-2 text-text-secondary">2 + 2×15 = 32</td>
                    </tr>
                  </tbody>
                </table>
                <p className="mt-4 text-sm text-text-tertiary">
                  <strong>유의:</strong> 만 30세 이전 미혼자는 무주택기간을 산정하지 않습니다. 30세가 되거나 혼인신고를 한 이후부터 기산합니다. 월 단위는 절사되므로 8년 11개월은 8년차 18점입니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">2. 부양가족수(35점 만점) — 본인 포함 1명부터 5점씩</h2>
                <p>
                  부양가족은 <strong>본인 포함</strong> 직계비속(자녀, 손주) 및 배우자의 직계비속입니다. 본인 1명부터 5점이 주어지고, 1명 추가될 때마다 5점씩 증가하여 6명 이상 시 35점(상한)에 도달합니다.
                </p>
                <table className="w-full border-collapse text-sm">
                  <caption className="mb-2 text-left font-semibold text-text-primary">부양가족수 점수표</caption>
                  <thead>
                    <tr className="border-b border-border-base">
                      <th scope="col" className="border-b border-border-base bg-bg-raised px-3 py-2 text-left font-semibold text-text-primary">부양가족수(본인 포함)</th>
                      <th scope="col" className="border-b border-border-base bg-bg-raised px-3 py-2 text-left font-semibold text-text-primary">점수</th>
                      <th scope="col" className="border-b border-border-base bg-bg-raised px-3 py-2 text-left font-semibold text-text-primary">구성 예시</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-border-base">
                      <td className="px-3 py-2 text-text-primary">1명(본인)</td>
                      <td className="px-3 py-2 font-semibold text-text-primary">5점</td>
                      <td className="px-3 py-2 text-text-secondary">미혼</td>
                    </tr>
                    <tr className="border-b border-border-base bg-bg-card">
                      <td className="px-3 py-2 text-text-primary">2명</td>
                      <td className="px-3 py-2 font-semibold text-text-primary">10점</td>
                      <td className="px-3 py-2 text-text-secondary">본인 + 배우자</td>
                    </tr>
                    <tr className="border-b border-border-base">
                      <td className="px-3 py-2 text-text-primary">3명</td>
                      <td className="px-3 py-2 font-semibold text-text-primary">15점</td>
                      <td className="px-3 py-2 text-text-secondary">본인 + 배우자 + 자녀 1명</td>
                    </tr>
                    <tr className="border-b border-border-base bg-bg-card">
                      <td className="px-3 py-2 text-text-primary">4명</td>
                      <td className="px-3 py-2 font-semibold text-text-primary">20점</td>
                      <td className="px-3 py-2 text-text-secondary">본인 + 배우자 + 자녀 2명</td>
                    </tr>
                    <tr className="border-b border-border-base">
                      <td className="px-3 py-2 text-text-primary">5명</td>
                      <td className="px-3 py-2 font-semibold text-text-primary">25점</td>
                      <td className="px-3 py-2 text-text-secondary">본인 + 배우자 + 자녀 3명</td>
                    </tr>
                    <tr className="border-b border-border-base bg-bg-card">
                      <td className="px-3 py-2 text-text-primary">6명</td>
                      <td className="px-3 py-2 font-semibold text-text-primary">30점</td>
                      <td className="px-3 py-2 text-text-secondary">본인 + 배우자 + 자녀 4명</td>
                    </tr>
                    <tr className="border-b border-border-base">
                      <td className="px-3 py-2 text-text-primary">7명 이상</td>
                      <td className="px-3 py-2 font-semibold text-text-primary">35점(상한)</td>
                      <td className="px-3 py-2 text-text-secondary">본인 + 배우자 + 자녀 5명 이상</td>
                    </tr>
                  </tbody>
                </table>
                <p className="mt-4 text-sm text-text-tertiary">
                  <strong>주의:</strong> 만 30세 이상 미혼 자녀는 부양가족에서 제외될 수 있습니다. 학생 자녀의 경우 '건강보험 피부양자'로 등재되어야 인정되는 경우가 많으므로, 청약홈에서 사전 등록 후 확인하세요.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">3. 청약통장 가입기간(17점 만점) — 6개월 미만 시 1점</h2>
                <p>
                  청약통장 가입기간은 <strong>실제 가입일부터 청약신청일까지</strong>의 기간입니다. 6개월 미만 시 1점이 주어지고, 6개월 이상부터는 기간이 늘어날수록 1년마다 1점씩 증가하여 15년 이상 시 17점(상한)에 도달합니다.
                </p>
                <table className="w-full border-collapse text-sm">
                  <caption className="mb-2 text-left font-semibold text-text-primary">청약통장 가입기간 점수표</caption>
                  <thead>
                    <tr className="border-b border-border-base">
                      <th scope="col" className="border-b border-border-base bg-bg-raised px-3 py-2 text-left font-semibold text-text-primary">가입 기간</th>
                      <th scope="col" className="border-b border-border-base bg-bg-raised px-3 py-2 text-left font-semibold text-text-primary">점수</th>
                      <th scope="col" className="border-b border-border-base bg-bg-raised px-3 py-2 text-left font-semibold text-text-primary">점수 계산</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-border-base">
                      <td className="px-3 py-2 text-text-primary">6개월 미만</td>
                      <td className="px-3 py-2 font-semibold text-text-primary">1점</td>
                      <td className="px-3 py-2 text-text-secondary">기본값</td>
                    </tr>
                    <tr className="border-b border-border-base bg-bg-card">
                      <td className="px-3 py-2 text-text-primary">6개월 이상 1년 미만</td>
                      <td className="px-3 py-2 font-semibold text-text-primary">2점</td>
                      <td className="px-3 py-2 text-text-secondary">1 + 1</td>
                    </tr>
                    <tr className="border-b border-border-base">
                      <td className="px-3 py-2 text-text-primary">1년 이상 2년 미만</td>
                      <td className="px-3 py-2 font-semibold text-text-primary">3점</td>
                      <td className="px-3 py-2 text-text-secondary">1 + 1 + 1</td>
                    </tr>
                    <tr className="border-b border-border-base bg-bg-card">
                      <td className="px-3 py-2 text-text-primary">2년 이상 3년 미만</td>
                      <td className="px-3 py-2 font-semibold text-text-primary">4점</td>
                      <td className="px-3 py-2 text-text-secondary">1 + 2 + 1</td>
                    </tr>
                    <tr className="border-b border-border-base">
                      <td className="px-3 py-2 text-text-primary">5년 이상 6년 미만</td>
                      <td className="px-3 py-2 font-semibold text-text-primary">7점</td>
                      <td className="px-3 py-2 text-text-secondary">1 + 2 + 1×5</td>
                    </tr>
                    <tr className="border-b border-border-base bg-bg-card">
                      <td className="px-3 py-2 text-text-primary">10년 이상 11년 미만</td>
                      <td className="px-3 py-2 font-semibold text-text-primary">12점</td>
                      <td className="px-3 py-2 text-text-secondary">1 + 2 + 1×10</td>
                    </tr>
                    <tr className="border-b border-border-base">
                      <td className="px-3 py-2 text-text-primary">15년 이상</td>
                      <td className="px-3 py-2 font-semibold text-text-primary">17점(상한)</td>
                      <td className="px-3 py-2 text-text-secondary">1 + 2 + 1×15 = 17</td>
                    </tr>
                  </tbody>
                </table>
                <p className="mt-4 text-sm text-text-tertiary">
                  <strong>중요:</strong> 통장 해약 후 재가입하면 이전 기간은 합산되지 않습니다. 또한 통장 잔액은 가점 계산에 영향을 주지 않으며, 청약 당첨 후에도 월납으로 충당 가능합니다.
                </p>
              </section>

              <AdSlot slot="guide-housing-subscription-score-84-points-2026-mid" format="rectangle" />

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">4. 3요소 합산 시뮬레이션 — 실제 계산 사례</h2>
                <p>
                  다음 세 가지 사례를 통해 84점 만점 구조를 확인해보겠습니다.
                </p>

                <div className="rounded-lg border border-border-base bg-bg-card p-4 mt-4">
                  <p className="font-semibold text-text-primary">사례 1: 신혼부부 표준 케이스</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    · 무주택 5년(5년 이상 6년 미만 구간): 12점
                    <br />
                    · 부양가족 2명(본인+배우자): 10점
                    <br />
                    · 청약통장 2년 6개월(2년 이상 3년 미만 구간): 4점
                    <br />
                    <strong className="text-text-primary">합계: 12 + 10 + 4 = 26점</strong>
                  </p>
                </div>

                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">사례 2: 아이 2명 부모</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    · 무주택 8년(8년 이상 9년 미만 구간): 18점
                    <br />
                    · 부양가족 4명(본인+배우자+자녀 2명): 20점
                    <br />
                    · 청약통장 6년(6년 이상 7년 미만 구간): 8점
                    <br />
                    <strong className="text-text-primary">합계: 18 + 20 + 8 = 46점</strong>
                  </p>
                </div>

                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">사례 3: 장기 준비 고령층</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    · 무주택 20년(15년 이상 → 상한 도달): 32점
                    <br />
                    · 부양가족 3명(본인+배우자+부모 1명): 15점
                    <br />
                    · 청약통장 12년(12년 이상 13년 미만 구간): 14점
                    <br />
                    <strong className="text-text-primary">합계: 32 + 15 + 14 = 61점</strong>
                  </p>
                </div>

                <p className="mt-4 text-sm text-text-tertiary">
                  위 사례들에서 보듯이, 3요소 중 어느 하나도 상한(84점)에 도달하기는 매우 어렵습니다. 일반적으로 50~60점대가 중간층 가점입니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">5. 민영주택 가점제 vs 국민주택 순위제 — 신청 전 꼭 확인</h2>
                <p>
                  본 84점 만점 체계는 <strong>민영주택(전용면적 85㎡ 이하) 가점제</strong> 기준입니다. 그러나 청약 공고마다 가점제 또는 순위제가 다르게 적용됩니다.
                </p>
                <table className="w-full border-collapse text-sm">
                  <caption className="mb-2 text-left font-semibold text-text-primary">주택 유형별 가점제/순위제 구분</caption>
                  <thead>
                    <tr className="border-b border-border-base">
                      <th scope="col" className="border-b border-border-base bg-bg-raised px-3 py-2 text-left font-semibold text-text-primary">주택 유형</th>
                      <th scope="col" className="border-b border-border-base bg-bg-raised px-3 py-2 text-left font-semibold text-text-primary">모집 방식</th>
                      <th scope="col" className="border-b border-border-base bg-bg-raised px-3 py-2 text-left font-semibold text-text-primary">당첨 기준</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-border-base">
                      <td className="px-3 py-2 text-text-primary">민영주택 85㎡ 이하</td>
                      <td className="px-3 py-2 text-text-secondary">가점제(85%) + 추첨제(15%)</td>
                      <td className="px-3 py-2 text-text-secondary">84점 만점 가점 순위</td>
                    </tr>
                    <tr className="border-b border-border-base bg-bg-card">
                      <td className="px-3 py-2 text-text-primary">민영주택 85㎡ 초과</td>
                      <td className="px-3 py-2 text-text-secondary">선착순(일부) 또는 가점제(모집공고 확인)</td>
                      <td className="px-3 py-2 text-text-secondary">공고별 상이</td>
                    </tr>
                    <tr className="border-b border-border-base">
                      <td className="px-3 py-2 text-text-primary">국민주택 85㎡ 이하</td>
                      <td className="px-3 py-2 text-text-secondary">순위제(신청 순서) 또는 추첨제</td>
                      <td className="px-3 py-2 text-text-secondary">청약신청 순서 또는 복권</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2 text-text-primary">LH(공공) 임대주택</td>
                      <td className="px-3 py-2 text-text-secondary">순위제 또는 별도 가점</td>
                      <td className="px-3 py-2 text-text-secondary">공고별 가점 별표 참조</td>
                    </tr>
                  </tbody>
                </table>
                <p className="mt-4 text-sm text-text-tertiary">
                  <strong>다만(주의):</strong> 국민주택 순위제는 가점이 아닌 "청약신청 순서"로 당첨을 결정합니다. 따라서 청약홈에서 모집공고를 읽을 때, 반드시 "가점제" vs "순위제" 항목을 확인하세요.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">6. 주택공급에 관한 규칙(별표1) 법적 근거</h2>
                <p>
                  청약가점 3요소 84점 만점 체계는 <strong>주택공급에 관한 규칙(별표1)</strong>에 명시된 공식 기준입니다. 국토교통부에서 발행하는 이 규칙은 매년 일부 개정될 수 있으므로, 청약 신청 직전에는 반드시 최신 버전을 확인해야 합니다.
                </p>
                <p className="text-sm">
                  참고 링크:
                  <br />
                  · <a href="https://applyhome.co.kr" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 hover:underline">청약홈(applyhome.co.kr)</a> — 공식 청약 포털, 본인 가점 조회 및 모집공고
                  <br />
                  · <a href="https://www.molit.go.kr" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 hover:underline">국토교통부(molit.go.kr)</a> — 주택공급에 관한 규칙 확인
                  <br />
                  · <a href="https://law.go.kr" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 hover:underline">국가법령정보센터(law.go.kr)</a> — 주택공급에 관한 규칙 원문
                </p>
              </section>

              <h2 className="text-2xl font-bold mb-6">자주 묻는 질문</h2>
              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h3 className="text-lg font-semibold text-text-primary">관련 계산기 및 가이드</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link
                    href="/calculator/housing-subscription/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">청약가점 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">본인의 무주택·부양가족·통장 기간을 입력해 총 가점을 즉시 계산하세요.</p>
                  </Link>
                  <Link
                    href="/calculator/loan-limit/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">대출한도(DSR/LTV) 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">청약 당첨 후 주담대 한도를 미리 계산해보세요.</p>
                  </Link>
                  <Link
                    href="/calculator/acquisition-tax/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">취득세 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">청약 당첨 후 취득세 예상액을 계산합니다.</p>
                  </Link>
                  <Link
                    href="/calculator/broker-fee/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">중개수수료 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">주택 매매 또는 전세 거래 중개수수료 상한을 확인하세요.</p>
                  </Link>
                  <Link
                    href="/category/real-estate/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">부동산 계산기 모음</div>
                    <p className="mt-1 text-sm text-text-secondary">청약, 대출, 세금 등 부동산 거래 전 필요한 모든 계산기.</p>
                  </Link>
                  <Link
                    href="/guide/jeonse-deposit-safety/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">전세 보증금 안전 가이드</div>
                    <p className="mt-1 text-sm text-text-secondary">전세 계약 전 필수 확인 8가지 + 깡통전세 예방법.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="mb-2 text-sm text-text-tertiary">
                  <strong>법적 근거:</strong> 주택공급에 관한 규칙(별표1) 가점제. 청약가점은 무주택기간(32점) + 부양가족(35점) + 청약통장(17점)의 3요소로 구성되며 총 84점 만점입니다.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 교육 목적으로 작성되었으며, 법적 조언이 아닙니다. 각 청약 모집공고는 규칙 개정에 따라 가점 항목이 변경될 수 있으므로, 청약홈의 최신 정보를 항상 먼저 확인하세요. 본 콘텐츠는 2026년 6월 27일 기준으로 작성되었습니다. AI 보조 작성 후 운영자 검수를 거쳤습니다.
                </p>
              </section>

              <ShareButtons
                title="청약가점 84점 만점 계산법"
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
