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

const URL = 'https://calculatorhost.com/guide/overtime-night-holiday-allowance-2026/';
const DATE_PUBLISHED = '2026-06-26';
const DATE_MODIFIED = '2026-06-26';

export const metadata: Metadata = {
  title: '연장·야간·휴일근로수당 2026 | 1.5배·2배 가산 계산 | calculatorhost',
  description:
    '연장근로는 1.5배, 야간근로는 0.5배 추가, 휴일근로는 1.5배(8시간 이내)·2배(초과). 근로기준법 §56 가산율·통상시급 환산·중복 계산 완벽 정리.',
  keywords: [
    '연장근로수당',
    '야간근로수당',
    '휴일근로수당',
    '가산율',
    '통상임금',
    '가산수당',
    '근로기준법',
    '야간 추가 근무',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '연장·야간·휴일근로수당 2026 | 1.5배·2배 가산 계산 | calculatorhost' }],
    title: '연장·야간·휴일근로수당 계산 2026 — 근로기준법 §56',
    description: '통상임금의 1.5배, 0.5배, 2배 가산. 시간대별·조건별 정확한 계산법과 예시.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
};

const FAQ_ITEMS = [
  {
    question: '연장근로는 몇 시간부터 인정되나요?',
    answer:
      '1주 40시간 기준 초과분부터 연장근로로 인정됩니다. 예를 들어 월요일~금요일 각 9시간씩 근무하면(45시간), 5시간이 연장근로입니다. 근로기준법 §50 참조.',
  },
  {
    question: '야간근로의 시간대가 정확히 언제부터 언제까지인가요?',
    answer:
      '근로기준법 §56③에 따라 야간근로는 저녁 10시(22:00)부터 다음 날 오전 6시(06:00) 사이입니다. 이 시간대에 근무한 시간은 50% 가산(추가 0.5배)을 받습니다. 오후 9시 59분은 주간, 오후 10시 1분은 야간입니다.',
  },
  {
    question: '야간에 연장근로하면 1.5배를 더하나요, 곱하나요?',
    answer:
      '더합니다. 공식은 통상임금 × (1 + 0.5연장 + 0.5야간) = 통상임금 × 2.0(=2배)입니다. 연장근로 50% + 야간근로 50%를 각각 더하므로, 결과적으로 2배가 됩니다.',
  },
  {
    question: '휴일근로는 주중 근로와 어떻게 다른가요?',
    answer:
      '휴일근로(일요일, 법정휴일 근무)는 최초 8시간까지 50% 가산(1.5배)이고, 8시간 초과분은 100% 가산(2배)입니다. 주중 연장근로는 시간 제한이 없으므로 계산이 다릅니다.',
  },
  {
    question: '통상시급이 12,000원인데 야간에 4시간 연장근로하면?',
    answer:
      '12,000원 × 4시간 × 2.0(=1+0.5+0.5) = 96,000원입니다. 주간 연장(0.5배) 50% + 야간(0.5배) 50%를 더하므로 2배 배수가 적용됩니다.',
  },
  {
    question: '아르바이트도 이 가산수당을 받나요?',
    answer:
      '근로기준법 §56은 상시 5인 이상 사업장에 적용됩니다. 5인 미만 사업장(개인 카페, 소형 가게 등)은 법적 가산 의무가 없습니다. 다만 계약서에 명시되어 있으면 지급받을 수 있습니다.',
  },
  {
    question: '포괄임금제 계약이면 가산수당을 받지 못하나요?',
    answer:
      '아닙니다. 포괄임금제라도 근로기준법 §56 가산수당은 기본권입니다. 법원에서 포괄임금제 계약의 유효성을 인정하지 않는 경우가 많으므로, 실제 근무시간을 기록하고 필요시 노무사와 상담하세요.',
  },
  {
    question: '가산수당도 세금이 나가나요?',
    answer:
      '네, 가산수당은 근로소득으로 간주되어 소득세·지방소득세·4대보험료가 공제됩니다. 가산수당 = 기본 급여와 동일한 세무 처리입니다.',
  },
];

export default function OvertimeNightHolidayAllowancePage() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '연장·야간·휴일근로수당' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '연장·야간·휴일근로수당 계산 2026 — 통상임금의 1.5배·2배 완벽 정리',
    description:
      '근로기준법 §56 기준 연장근로(1.5배), 야간근로(0.5배 추가), 휴일근로(1.5~2배) 가산수당 계산법. 통상시급 환산, 중복 적용, 세금 처리까지 완전 해설.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['연장근로수당', '야간근로수당', '휴일근로수당', '근로기준법', '가산율'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '연장·야간·휴일근로수당 계산 2026 | 근로기준법 §56',
    description:
      '연장근로 50% 가산·야간근로 50% 추가·휴일근로 50~100% 가산. 통상임금 기준, 시간대별 계산, 중복 적용 원칙, 세금 처리.',
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
                    { name: '근로수당' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">근로 · 8분 읽기 · 2026-06-26</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  연장·야간·휴일근로수당 계산 2026 — 1.5배·2배 가산 완전정리
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  잔업, 야근, 휴일 근무에는 추가 가산수당이 나옵니다.
                  근로기준법 §56에 따르면 연장근로는 통상임금의 50% 이상 가산(1.5배), 야간근로는 추가 50% 가산, 휴일근로는 1.5배 또는 2배입니다.
                  정확한 계산법과 세금 처리를 정리했습니다.
                </p>
              </header>

              <AdSlot slot="guide-overtime-night-holiday-allowance-2026-top" format="horizontal" />

              <section aria-label="요약" className="card border-l-4 border-l-primary-500">
                <h2 className="mb-2 text-caption uppercase tracking-wider text-primary-500">가산수당 요약</h2>
                <div className="space-y-2 text-sm" data-speakable>
                  <table className="w-full border-collapse text-sm">
                    <caption className="mb-2 text-left text-xs font-semibold text-text-secondary">근로기준법 §56 가산율 기준</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="py-2 pr-4 text-left font-semibold">근로 종류</th>
                        <th scope="col" className="py-2 pr-4 text-left font-semibold">가산율</th>
                        <th scope="col" className="py-2 text-left font-semibold">배수</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="py-2 pr-4">연장근로 (주 40시간 초과)</td>
                        <td className="py-2 pr-4">50% 이상</td>
                        <td className="py-2">1.5배</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="py-2 pr-4">야간근로 (22:00~06:00)</td>
                        <td className="py-2 pr-4">50%</td>
                        <td className="py-2">0.5배 추가</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="py-2 pr-4">휴일근로 (8시간 이내)</td>
                        <td className="py-2 pr-4">50%</td>
                        <td className="py-2">1.5배</td>
                      </tr>
                      <tr>
                        <td className="py-2 pr-4">휴일근로 (8시간 초과)</td>
                        <td className="py-2 pr-4">100%</td>
                        <td className="py-2">2배</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="mt-4 bg-bg-card p-3 rounded text-sm space-y-1" data-speakable>
                  <p><strong>TL;DR:</strong> 연장=1.5배, 야간=추가 0.5배(=합산 2배), 휴일=1.5~2배</p>
                  <p><strong>적용 범위:</strong> 상시 5인 이상 사업장 (5인 미만은 미적용)</p>
                  <p><strong>법적 근거:</strong> 근로기준법 §56①②③</p>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">연장근로수당이란? 언제부터 받나?</h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  근로기준법 §50은 주당 40시간 근로를 기준으로 규정합니다.
                  이를 초과하는 근로를 "연장근로"라 하며, §56①에 따라 <strong>통상임금의 50% 이상을 가산</strong>해야 합니다.
                </p>
                <div className="border-l-4 border-l-primary-500 bg-card pl-4 py-3 text-sm">
                  <p className="font-semibold">연장근로 기준 계산</p>
                  <p className="text-text-secondary">1주 = 월~일 합산 시간. 예: 월~금 각 9시간(45시간) = 5시간 연장근로</p>
                </div>
                <p className="mt-3 text-sm text-text-tertiary">
                  다만 포괄임금제 계약이라도 가산수당은 기본권입니다.
                  "월급에 모든 수당 포함"이라는 계약이 있어도 실제 근무시간을 기록하면 차액을 청구할 수 있습니다.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">야간근로수당 — 22:00~06:00 추가 가산</h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  근로기준법 §56③은 야간근로(저녁 10시~오전 6시)에 대해 <strong>추가 50% 가산</strong>을 규정합니다.
                  이는 연장근로와 <strong>별도</strong>로 중첩되어 적용됩니다.
                </p>
                <div className="space-y-3 text-sm">
                  <div className="border-l-4 border-l-primary-500 bg-card pl-4 py-3">
                    <p className="font-semibold">야간 시간대</p>
                    <p className="text-text-secondary">저녁 10시(22:00) 이상 다음 날 오전 6시(06:00) 미만. 분 단위까지 엄격.</p>
                  </div>
                  <div className="border-l-4 border-l-primary-500 bg-card pl-4 py-3">
                    <p className="font-semibold">가산 방식</p>
                    <p className="text-text-secondary">야간 시간만 추가 50% (연장+야간이면 합산 2배)</p>
                  </div>
                </div>
                <div className="mt-4 bg-bg-card p-3 rounded text-sm">
                  <p className="font-semibold">예: 통상시급 12,000원</p>
                  <p>• 주간 2시간 연장근로: 12,000 × 2 × 1.5 = <strong>36,000원</strong></p>
                  <p>• 야간 2시간 근로(연장 아님): 12,000 × 2 × 1.5(=1+0.5) = <strong>36,000원</strong></p>
                  <p>• 야간 2시간 연장근로: 12,000 × 2 × 2.0(=1+0.5+0.5) = <strong>48,000원</strong></p>
                </div>
                <p className="mt-3 text-sm text-text-tertiary">
                  다만 포괄임금제 계약이나 "야간비 별도 불가" 특약이 있어도, 실제 근무 사실이 있으면 가산수당을 청구할 수 있습니다.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">휴일근로수당 — 일요일·법정휴일 1.5배·2배</h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  근로기준법 §56②는 휴일근로(일요일, 공휴일, 회사가 정한 휴무일)에 대해 <strong>8시간 이내 50%, 8시간 초과 100% 가산</strong>을 규정합니다.
                  즉 <strong>8시간 이내 1.5배, 8시간 초과 2배</strong>입니다.
                </p>
                <div className="space-y-3 text-sm">
                  <div className="border-l-4 border-l-highlight-500 bg-card pl-4 py-3">
                    <p className="font-semibold">휴일근로 처음 8시간</p>
                    <p className="text-text-secondary">50% 가산 (1.5배)</p>
                  </div>
                  <div className="border-l-4 border-l-highlight-500 bg-card pl-4 py-3">
                    <p className="font-semibold">휴일근로 8시간 초과분</p>
                    <p className="text-text-secondary">100% 가산 (2배), 또는 추가 연장근로로 인정</p>
                  </div>
                </div>
                <div className="mt-4 bg-bg-card p-3 rounded text-sm">
                  <p className="font-semibold">예: 통상시급 12,000원, 일요일 10시간 근무</p>
                  <p className="mt-2">• 처음 8시간: 12,000 × 8 × 1.5 = <strong>144,000원</strong></p>
                  <p>• 초과 2시간: 12,000 × 2 × 2.0 = <strong>48,000원</strong></p>
                  <p className="font-semibold mt-2">• 합계: 192,000원</p>
                </div>
                <p className="mt-3 text-sm text-text-tertiary">
                  다만 근로자대표와 서면으로 합의하면, 가산수당 지급을 갈음하여 보상휴가를 부여할 수 있습니다(근로기준법 §57 보상휴가제).
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">통상임금이란? 가산수당의 기준</h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  가산수당은 모두 "통상임금"을 기준으로 계산됩니다.
                  통상임금은 근로의 대가로 <strong>정기적·고정적</strong>으로 지급되는 금액입니다.
                </p>
                <ul className="space-y-2 text-sm">
                  <li>
                    <strong>✓ 포함:</strong> 기본급, 직책급, 기술급, 근속급, 정기적 수당(보직수당, 위험수당 등)
                  </li>
                  <li>
                    <strong>✗ 제외:</strong> 상여금, 성과급, 복리후생비, 교통비, 식사비, 상반기·하반기 특별상여, 1회성 보상금
                  </li>
                </ul>
                <p className="mt-3 text-sm">
                  급여명세서에서 기본급 + 고정 수당 = 통상임금입니다.
                  여기서 <strong>시급 = 월 통상임금 ÷ 209시간</strong> (209는 주 40시간 근무자의 월 소정근로시간)
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">연장·야간·휴일근로수당 정확히 계산하기</h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  가산수당은 다음 공식으로 계산됩니다. 중첩되는 경우 각 배수를 더합니다.
                </p>

                <div className="mt-6 space-y-4">
                  <h3 className="font-semibold">예시 1: 주간 연장근로 3시간 (통상시급 12,000원)</h3>
                  <div className="space-y-2 text-sm bg-bg-card p-3 rounded">
                    <p>기본급 = 12,000원 × 3시간</p>
                    <p>가산수당 = 12,000원 × 3시간 × 0.5(=50%)</p>
                    <p className="font-semibold">소계 = 12,000 × 3 × 1.5 = <strong>54,000원</strong></p>
                  </div>
                </div>

                <div className="mt-4 space-y-4">
                  <h3 className="font-semibold">예시 2: 야간 연장근로 2시간 (22:00 이후, 통상시급 12,000원)</h3>
                  <div className="space-y-2 text-sm bg-bg-card p-3 rounded">
                    <p>기본: 12,000원</p>
                    <p>연장 가산: +50%</p>
                    <p>야간 가산: +50%</p>
                    <p>배수 = 1.0 + 0.5 + 0.5 = 2.0 (2배)</p>
                    <p className="font-semibold">합계 = 12,000 × 2 × 2.0 = <strong>48,000원</strong></p>
                  </div>
                </div>

                <div className="mt-4 space-y-4">
                  <h3 className="font-semibold">예시 3: 휴일근로 10시간 (일요일, 통상시급 12,000원)</h3>
                  <div className="space-y-2 text-sm bg-bg-card p-3 rounded">
                    <p>처음 8시간: 12,000 × 8 × 1.5 = 144,000원</p>
                    <p>초과 2시간: 12,000 × 2 × 2.0 = 48,000원</p>
                    <p className="font-semibold">합계 = <strong>192,000원</strong></p>
                  </div>
                </div>

                <p className="mt-4 text-sm text-text-tertiary">
                  다만 이 금액은 <strong>세전</strong>이며, 실제로는 소득세·지방소득세·4대보험료가 공제됩니다.
                  실수령액은 약 80~85% 정도입니다.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">가산수당 세금 — 소득세·4대보험료</h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  가산수당도 일반 근로소득으로 간주되어 소득세, 지방소득세, 4대보험료가 공제됩니다.
                  퇴직금처럼 특별 세제 혜택은 없습니다.
                </p>
                <div className="space-y-2 text-sm">
                  <div className="border-l-4 border-l-primary-500 bg-card pl-4 py-3">
                    <p className="font-semibold">소득세</p>
                    <p className="text-text-secondary">누진세율 적용 (소득세법 §55). 과세표준에 따라 6~45% 범위</p>
                  </div>
                  <div className="border-l-4 border-l-primary-500 bg-card pl-4 py-3">
                    <p className="font-semibold">지방소득세</p>
                    <p className="text-text-secondary">소득세의 10%</p>
                  </div>
                  <div className="border-l-4 border-l-primary-500 bg-card pl-4 py-3">
                    <p className="font-semibold">4대보험료</p>
                    <p className="text-text-secondary">국민연금 4.5% + 건강보험 3.545% + 장기요양(건보료의 12.95%) + 고용보험 0.9% (합계 약 9.4%)</p>
                  </div>
                </div>
                <p className="mt-3 text-sm text-text-tertiary">
                  <strong>예시:</strong> 가산수당 50만 원 → 소득세 약 4만 원 + 보험료 약 5만 원 공제 → 실제 수령 약 41만 원
                </p>
              </section>

              <AdSlot slot="guide-overtime-night-holiday-allowance-2026-mid" format="rectangle" />

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">적용 범위 — 누가 받을 수 있나?</h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  근로기준법 §56은 <strong>상시 5인 이상 사업장</strong>에 적용됩니다.
                  5인 미만 사업장(개인 카페, 소형 가게, 치과 등)은 가산수당 의무가 없습니다.
                </p>
                <div className="space-y-3 text-sm">
                  <div className="border-l-4 border-l-primary-500 bg-card pl-4 py-3">
                    <p className="font-semibold">5인 이상 사업장</p>
                    <p className="text-text-secondary">근로기준법 §56 전면 적용. 연장·야간·휴일근로수당 의무</p>
                  </div>
                  <div className="border-l-4 border-l-primary-500 bg-card pl-4 py-3">
                    <p className="font-semibold">5인 미만 사업장</p>
                    <p className="text-text-secondary">법적 의무 없음. 단, 단체협약이나 취업규칙에 규정되어 있으면 지급 의무 발생</p>
                  </div>
                </div>
                <p className="mt-3 text-sm text-text-tertiary">
                  다만 5인 미만이라도 채용공고나 계약서에 "가산수당 지급"이라고 명시했으면, 그 약정을 지켜야 합니다.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">자주 하는 실수와 주의할 점</h2>
                <ol className="space-y-2 text-sm">
                  <li>
                    <strong>월급을 통상임금으로 착각하기</strong>
                    <br />
                    <span className="text-text-tertiary">월급(총 급여) ≠ 통상임금. 상여금, 성과급, 식사비 등을 제외한 기본급 + 고정 수당만 포함.</span>
                  </li>
                  <li>
                    <strong>야간 시간대를 잘못 이해하기</strong>
                    <br />
                    <span className="text-text-tertiary">야간은 정확히 22:00~06:00. 오후 9시 59분까지는 주간, 오후 10시 1분부터는 야간입니다.</span>
                  </li>
                  <li>
                    <strong>연장+야간을 곱하기로 계산하기</strong>
                    <br />
                    <span className="text-text-tertiary">배수를 더합니다. 연장 50% + 야간 50% = 합계 100% 가산(=2배), 곱셈 아님.</span>
                  </li>
                  <li>
                    <strong>포괄임금제면 가산수당을 못 받는다고 생각하기</strong>
                    <br />
                    <span className="text-text-tertiary">포괄임금제라도 가산수당은 기본권. 실제 근무시간을 증명하면 차액을 청구할 수 있습니다.</span>
                  </li>
                  <li>
                    <strong>휴일근로 8시간 경계를 무시하기</strong>
                    <br />
                    <span className="text-text-tertiary">휴일근로는 8시간 이내(1.5배)와 초과(2배)를 구분해 계산. 한꺼번에 2배로 계산하면 과소 수당.</span>
                  </li>
                  <li>
                    <strong>세전 금액으로 기대하기</strong>
                    <br />
                    <span className="text-text-tertiary">가산수당도 세금 공제 대상. 실제 수령액은 세전의 80~85% 정도입니다.</span>
                  </li>
                </ol>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">가산수당 미지급 시 대처 방법</h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  근무했는데 가산수당을 받지 못했다면, 다음 단계를 따르세요.
                </p>
                <ol className="space-y-3 text-sm">
                  <li>
                    <strong>1단계: 급여명세서·타임카드 확보</strong>
                    <br />
                    <span className="text-text-tertiary">실제 근무시간을 증명할 수 있는 모든 기록(급여명세서, 근태기록, 이메일 시간 등)</span>
                  </li>
                  <li>
                    <strong>2단계: 회사에 서면 청구</strong>
                    <br />
                    <span className="text-text-tertiary">인사팀에 미지급 가산수당 계산서를 첨부하여 정산 요청(근로기준법 §56 기준)</span>
                  </li>
                  <li>
                    <strong>3단계: 합의 불일치 시 신고</strong>
                    <br />
                    <span className="text-text-tertiary">관할 노동청 또는 근로기준감시관에 신고. 고용노동부 1350 상담도 가능</span>
                  </li>
                  <li>
                    <strong>4단계: 노무사·변호사 상담</strong>
                    <br />
                    <span className="text-text-tertiary">미지급액이 크거나 회사가 불응하면 법적 소송 검토</span>
                  </li>
                </ol>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">관련 법령 &amp; 공식 출처</h2>
                <ul className="space-y-2 text-sm">
                  <li>
                    국가법령정보센터 - 근로기준법: <a href="https://www.law.go.kr/LSW/lsInfoP.do?lsiSeq=231110#0000" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">law.go.kr</a>
                  </li>
                  <li>
                    고용노동부 - 근로기준 정보: <a href="https://www.moel.go.kr" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">moel.go.kr</a>
                  </li>
                  <li>
                    근로기준법 §50 (주당 근로시간), §56 (가산수당), §57 (보상휴가제)
                  </li>
                  <li>
                    국세청 - 소득세 안내: <a href="https://www.nts.go.kr" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">nts.go.kr</a>
                  </li>
                </ul>
              </section>

              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">관련 계산기 · 가이드</h2>
                <ul className="space-y-2 text-sm">
                  <li>
                    <Link href="/calculator/salary/" className="font-semibold text-primary-500 hover:underline">
                      연봉 실수령액 계산기
                    </Link>
                    {' — 기본급 + 가산수당의 세후 수령액 확인'}
                  </li>
                  <li>
                    <Link href="/guide/annual-leave-allowance-2026/" className="font-semibold text-primary-500 hover:underline">
                      연차수당 계산법 2026
                    </Link>
                    {' — 퇴사 시 받을 수 있는 미사용 연차 수당'}
                  </li>
                  <li>
                    <Link href="/guide/weekly-holiday-allowance-2026/" className="font-semibold text-primary-500 hover:underline">
                      주휴수당 계산법 2026
                    </Link>
                    {' — 주중 근무하지 않은 날 받는 유급휴일 수당'}
                  </li>
                  <li>
                    <Link href="/guide/four-major-insurance-rates-2026/" className="font-semibold text-primary-500 hover:underline">
                      4대보험 요율 2026
                    </Link>
                    {' — 국민연금, 건강보험, 장기요양, 고용보험 최신 요율'}
                  </li>
                  <li>
                    <Link href="/category/work/" className="font-semibold text-primary-500 hover:underline">
                      근로 카테고리
                    </Link>
                    {' — 급여, 세금, 수당 관련 모든 가이드'}
                  </li>
                </ul>
              </section>

              <section className="space-y-3 border-t border-border-base pt-6">
                <p className="text-xs text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 참고용이며 법적 효력이 없습니다.
                  복잡한 가산수당 정산이나 근로 분쟁은 고용노동부(1350), 노무사, 변호사의 전문 상담을 받으시기 바랍니다.
                  근로기준법은 지속적으로 개정되므로, 최신 정보는 law.go.kr 또는 고용노동부 공식 사이트를 참고하세요.
                </p>
              </section>

              <section className="space-y-3 border-t border-border-base pt-6">
                <p className="text-xs text-text-tertiary">
                  <strong>AI 보조 작성 · 운영자 검수:</strong> 본 가이드는 AI 보조로 작성되었으며, 법조항·가산율 정보는 운영자가 검수했습니다.
                </p>
                <p className="text-xs text-text-tertiary">
                  인용한 법조항: 근로기준법 §50 (주당 근로시간), §56 (가산수당), §55 (대체휴무)
                </p>
                <p className="text-xs text-text-tertiary">
                  마지막 갱신: 2026-06-26 | 2026년 최신 근로기준법 반영
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
