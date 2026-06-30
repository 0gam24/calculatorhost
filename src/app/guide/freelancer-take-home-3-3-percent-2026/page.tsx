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

const URL = 'https://calculatorhost.com/guide/freelancer-take-home-3-3-percent-2026/';
const DATE_PUBLISHED = '2026-06-30';
const DATE_MODIFIED = '2026-06-30';

export const metadata: Metadata = {
  title: '프리랜서 3.3% 원천징수와 실수령액 2026 | 5월 정산·환급·추가납부',
  description:
    '프리랜서가 받는 3.3% 원천징수(소득세 3% + 지방세 0.3%)의 정체와 실수령액 계산. 월 용역료 300만원 = 실수령 290만원. 다음해 5월 종합소득세 신고로 환급 또는 추가납부. 계산 공식·예시·함정 정리.',
  keywords: [
    '프리랜서 3.3% 원천징수',
    '프리랜서 실수령액',
    '용역대가 원천징수',
    '소득세법 127조',
    '5월 종합소득세 정산',
    '원천징수 환급',
    '프리랜서 세금',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '프리랜서 3.3% 원천징수와 실수령액 2026' }],
    title: '프리랜서 3.3% 원천징수 정체 및 실수령액',
    description: '용역료 300만 → 3.3% 떼고 290만 받음. 5월 정산 시 환급되거나 추가납부.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '프리랜서 3.3% 원천징수 정체와 실수령',
    description: '월급도 아닌데 세금 3.3%가 떨어진다? 정산 프로세스 완벽 이해.',
  },
};

const FAQ_ITEMS = [
  {
    question: '3.3% 원천징수는 최종 세금인가요?',
    answer:
      '아닙니다. 3.3%는 "미리 낸 세금"일 뿐입니다. 다음해 5월 종합소득세 신고 시 총 소득(다른 사업·근로·투자 소득 포함)에 따라 실제 세액이 결정됩니다. 기납부한 3.3%보다 최종 세금이 작으면 환급, 크면 추가납부합니다.',
  },
  {
    question: '월 300만원 용역료 받으면 실수령은 얼마인가요?',
    answer:
      '원천징수 9.9만원(3.3%) 차감 → 실수령 290.1만원입니다. 공식: 300만 × 96.7% = 290.1만. 하지만 이것도 "당월 실수령"이고, 5월에 신고 시 연 소득 합계·경비·공제에 따라 환급 또는 추가납부 여부가 결정됩니다.',
  },
  {
    question: '5월 신고할 때 환급받을 가능성은?',
    answer:
      '높습니다. 연소득이 적거나 경비·공제가 크면 실제 세금이 3.3%보다 훨씬 작습니다. 예: 연 3,000만 매출, 단순경비율 70% 적용 시 소득금액 약 900만 → 6% 세율 적용 → 세액 약 54만. 기납부 3.3%는 약 99만이므로 약 45만 환급 기대.',
  },
  {
    question: '3.3%가 아니라 다른 세율이 적용되나요?',
    answer:
      '통상 3.3%입니다. 소득세법 §127에서 인적용역(고용 관계 없는 용역) 사업소득의 원천징수 세율은 3%이고, 지방세법 §151에서 지방소득세는 소득세의 10%이므로 총 3.3%입니다. 일부 특수 용역(건설일용·이벤트 스태프 등)은 다를 수 있으니 용역료 영수증 확인.',
  },
  {
    question: '직장 다니면서 프리랜서 일도 하면 어떻게 신고하나요?',
    answer:
      '근로소득(직장) + 사업소득(프리랜서)을 모두 5월 종합소득세 신고에 포함합니다. 직장은 2월 연말정산으로 끝나지만, 사업소득 때문에 5월 추가 신고 의무 발생. 합산 소득이 높아져 누진세율 상위 적용되므로 세금이 높아질 가능성 높음. 경비·공제로 절세 필수.',
  },
  {
    question: '영수증 없이 3.3% 떼어진다고 불평하면 환급받을 수 있나요?',
    answer:
      '불가능합니다. 3.3% 원천징수는 지급자(용역비 지불인)의 법적 의무(소득세법 §127)이므로, 받는 쪽(프리랜서)이 "영수증 안 줄래" 해도 세금은 떨어집니다. 대신 5월에 계산기로 정확 계산 후 환급받는 것이 정답.',
  },
  {
    question: '원천징수된 세금을 중간에 돌려받을 수 있나요?',
    answer:
      '불가능합니다. 원천징수 환급은 오직 5월 종합소득세 신고 후에만 가능합니다. 월별로 돌려받을 수 없으니, 자금 유동성이 필요하면 미리 5월 환급을 고려한 현금 흐름 관리 필수.',
  },
  {
    question: '3.3% 원천징수 대상이 아닌 경우도 있나요?',
    answer:
      '네, 있습니다. 원천징수 대상은 "인적용역(고용 관계 없는 용역)" 한정입니다. 일반 도소매·제조 사업소득이나, 회사원으로 고용되어 근로소득으로 분류되면 3.3% 미적용. 용역료 명목이어도 실질이 고용관계면 근로소득으로 분류될 수 있으니 세무사 상담 권장.',
  },
];

export default function FreelancerTakeHome3Percent2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '프리랜서 3.3% 원천징수와 실수령액' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '프리랜서 3.3% 원천징수와 실수령액 2026 — 5월 정산·환급·추가납부 완벽 이해',
    description:
      '프리랜서가 받는 3.3% 원천징수(소득세 3% + 지방세 0.3%)의 정체. 월 용역료 300만 → 3.3% 원천징수 9.9만 → 실수령 290.1만. 그러나 최종 세액은 다음해 5월 종합소득세 신고로 확정. 환급·추가납부 판단 기준·경비율·5가지 함정 정리.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['프리랜서 3.3%', '원천징수', '실수령액', '종합소득세 정산', '소득세법 127조'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '프리랜서 3.3% 원천징수와 실수령액 2026',
    description:
      '프리랜서 용역료에서 떨어지는 3.3% 원천징수의 의미, 실수령액 계산법, 5월 종합소득세 신고 시 환급·추가납부 판단·예시 3개·함정 5가지.',
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
                    { name: '프리랜서 3.3% 원천징수' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">근로 · 8분 읽기 · 2026-06-30</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  프리랜서 3.3% 원천징수와 실수령액 2026
                  <br />
                  <span className="text-2xl text-text-secondary">— 5월 정산·환급·추가납부 완벽 이해</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  프리랜서가 용역비를 받을 때마다 느껴지는 답답함. <strong>월급처럼 3.3%가 톡 떨어진다</strong>는 것이죠.
                  하지만 이 3.3% 원천징수는 최종 세금이 아닙니다. 다음해 5월 종합소득세 신고 때 정산되며,
                  <strong> 환급받을 수도, 추가로 내야 할 수도 있습니다</strong>. 본 가이드에서는 3.3%의 정체,
                  실수령액 계산, 5월 정산 메커니즘을 명확하게 정리합니다.
                </p>
              </header>

              <AdSlot slot="guide-freelancer-take-home-top" format="horizontal" />

              {/* 핵심 요약 */}
              <section aria-label="핵심 요약" className="card border-l-4 border-l-primary-500">
                <h2 className="mb-4 text-2xl font-bold text-primary-700 dark:text-primary-300">⚡ 한눈에 정리</h2>
                <div className="mb-4 overflow-x-auto">
                  <table className="w-full text-sm" data-speakable>
                    <caption className="sr-only">프리랜서 3.3% 원천징수 요약</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th className="px-3 py-2 text-left">항목</th>
                        <th className="px-3 py-2 text-left">내용</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="px-3 py-2 font-semibold">원천징수 구성</td>
                        <td className="px-3 py-2">소득세 3% + 지방소득세 0.3% = 합계 3.3%</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="px-3 py-2 font-semibold">법적 근거</td>
                        <td className="px-3 py-2">소득세법 §127(원천징수) · 지방소득세(소득세의 10%)</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="px-3 py-2 font-semibold">적용 대상</td>
                        <td className="px-3 py-2">인적용역(고용 관계 없는 용역비)</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="px-3 py-2 font-semibold">월 300만 실수령</td>
                        <td className="px-3 py-2">300만 × 96.7% = 290.1만원</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="px-3 py-2 font-semibold">최종 세액 결정</td>
                        <td className="px-3 py-2">5월 종합소득세 신고 (연소득·경비·공제 기반)</td>
                      </tr>
                      <tr>
                        <td className="px-3 py-2 font-semibold">정산 결과</td>
                        <td className="px-3 py-2">환급 또는 추가납부</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="rounded-lg bg-primary-500/10 p-4 text-sm text-primary-700 dark:text-primary-300">
                  <p className="font-semibold">핵심 원칙</p>
                  <ul className="mt-2 list-inside list-disc space-y-1">
                    <li>
                      <strong>3.3%는 최종 세금이 아닌 "기납부세액"</strong> — 미리 낸 세금일 뿐
                    </li>
                    <li>
                      <strong>5월 신고 시 정산</strong> — 총 소득·경비·공제 종합 계산
                    </li>
                    <li>
                      <strong>소득이 적거나 경비가 크면 환급</strong> — 3.3%보다 최종 세금이 작을 가능성 높음
                    </li>
                  </ul>
                </div>
              </section>

              {/* 1. 3.3% 원천징수의 정체 */}
              <section className="space-y-4">
                <h2 className="text-2xl font-bold">1. 3.3% 원천징수는 무엇인가?</h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  프리랜서가 용역비를 받을 때, 지급자(클라이언트)가 미리 떼어내는 세금입니다(소득세법 §127). 이것은
                  소득세 3%와 지방소득세 0.3%로 구성되며, 법적으로 지급자가 당신의 계좌에 송금하기 전에 반드시
                  떼어야 합니다.
                </p>

                <div className="rounded-lg bg-bg-card p-4">
                  <p className="mb-3 font-semibold text-text-primary">3.3% = 소득세 3% + 지방소득세 0.3%</p>
                  <div className="space-y-3 text-sm text-text-secondary">
                    <div>
                      <p className="font-semibold text-text-primary mb-1">소득세 3% (소득세법 §127)</p>
                      <p className="text-xs mt-1">
                        인적용역(고용 관계 없는 용역대가)에 적용되는 원천징수 세율. 근로소득이 아닌 사업소득이므로 간이세액표가 아닌 고정 3% 적용.
                      </p>
                    </div>
                    <hr className="border-border-base" />
                    <div>
                      <p className="font-semibold text-text-primary mb-1">지방소득세 0.3% (소득세의 10%)</p>
                      <p className="text-xs mt-1">
                        소득세의 10%를 지방소득세로 납부. 3% × 10% = 0.3%. 따라서 합계 3.3%.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border-l-2 border-l-primary-500 bg-primary-500/5 p-4 text-sm text-text-secondary">
                  <p className="font-semibold text-text-primary">⚠️ 다만 원천징수는 선택이 아닌 의무</p>
                  <p className="mt-2">
                    "영수증 없이 줄게" 또는 "세금 앞당겨서 줄게" 해도 지급자(클라이언트)가 법적으로 3.3%를 떼야 합니다.
                    이를 위반하면 지급자가 가산세를 내야 하므로, 실무에서는 거의 모든 프리랜서 용역비에 3.3%가 적용됩니다.
                  </p>
                </div>
              </section>

              {/* 2. 실수령액 계산 */}
              <section className="space-y-4">
                <h2 className="text-2xl font-bold">2. 당월 실수령액 계산</h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  용역료를 받을 때 실제로 입금되는 금액은 원천징수 3.3%를 뺀 96.7%입니다. 간단한 계산식으로
                  월별 실수령액을 즉시 파악할 수 있습니다.
                </p>

                <div className="rounded-lg bg-bg-raised p-4">
                  <p className="font-semibold text-text-primary mb-3">실수령액 공식</p>
                  <div className="space-y-2 text-sm text-text-secondary">
                    <div>
                      <p className="italic text-text-tertiary">실수령액 = 용역료 × 96.7% (또는 용역료 − 용역료 × 3.3%)</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 rounded-lg bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">실전 계산 예시</p>
                  <div className="space-y-3 text-sm text-text-secondary">
                    <div className="rounded-lg bg-primary-500/5 p-3">
                      <p className="font-semibold text-text-primary mb-2">사례 1: 월 300만원 용역료</p>
                      <ul className="list-inside list-disc space-y-1">
                        <li>용역료(세전): 300만원</li>
                        <li>원천징수액: 300만 × 3.3% = 9.9만원</li>
                        <li className="font-semibold text-text-primary mt-2">실수령액: 300만 − 9.9만 = 290.1만원</li>
                        <li className="text-xs italic text-text-tertiary mt-1">✓ 검증: 300만 × 96.7% = 290.1만</li>
                      </ul>
                    </div>

                    <div className="rounded-lg bg-primary-500/5 p-3">
                      <p className="font-semibold text-text-primary mb-2">사례 2: 월 500만원 용역료</p>
                      <ul className="list-inside list-disc space-y-1">
                        <li>용역료(세전): 500만원</li>
                        <li>원천징수액: 500만 × 3.3% = 16.5만원</li>
                        <li className="font-semibold text-text-primary mt-2">실수령액: 500만 − 16.5만 = 483.5만원</li>
                      </ul>
                    </div>

                    <div className="rounded-lg bg-primary-500/5 p-3">
                      <p className="font-semibold text-text-primary mb-2">사례 3: 월 1,000만원 용역료</p>
                      <ul className="list-inside list-disc space-y-1">
                        <li>용역료(세전): 1,000만원</li>
                        <li>원천징수액: 1,000만 × 3.3% = 33만원</li>
                        <li className="font-semibold text-text-primary mt-2">실수령액: 1,000만 − 33만 = 967만원</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border-l-2 border-l-highlight-500 bg-highlight-500/5 p-4 text-sm text-text-secondary">
                  <p className="font-semibold text-text-primary">⚠️ 주의: 당월 실수령 = 최종 세후 수익이 아님</p>
                  <p className="mt-2">
                    위의 290.1만원은 "당월 입금액"입니다. 이것이 최종 세금이 적용된 수익은 아닙니다. 연말에 다른 소득·경비·공제를
                    모두 합산하여 5월에 종합소득세 신고를 하면, 최종 세액이 결정되고, 3.3%보다 많이 내거나 환급받을 수 있습니다.
                  </p>
                </div>
              </section>

              {/* 3. 5월 정산 메커니즘 */}
              <section className="space-y-4">
                <h2 className="text-2xl font-bold">3. 5월 종합소득세 신고 시 정산</h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  3.3% 원천징수는 "미리 낸 세금"일 뿐입니다. 최종 세액은 다음해 5월 종합소득세 신고 때 결정됩니다.
                  이때 당신의 총 소득, 경비, 공제를 모두 계산한 후 "실제 세금"을 산출하고, 기납부한 3.3%와 비교하여
                  환급하거나 추가 납부합니다.
                </p>

                <div className="rounded-lg bg-bg-card p-4">
                  <p className="font-semibold text-text-primary mb-3">5월 정산 프로세스</p>
                  <div className="space-y-4 text-sm text-text-secondary">
                    <div>
                      <p className="font-semibold text-text-primary mb-1">Step 1: 연 소득금액 산출</p>
                      <p className="italic text-text-tertiary">연 매출액 − 필요경비(단순/기준경비율 또는 실경비) = 소득금액</p>
                      <p className="text-xs mt-1">예: 연 3,600만 − (3,600만 × 70% 단순경비율) = 1,080만 소득금액</p>
                    </div>
                    <hr className="border-border-base" />
                    <div>
                      <p className="font-semibold text-text-primary mb-1">Step 2: 과세표준 산출</p>
                      <p className="italic text-text-tertiary">소득금액 − 소득공제(본인, 부양가족 등) = 과세표준</p>
                      <p className="text-xs mt-1">예: 1,080만 − 150만(본인공제) = 930만 과세표준</p>
                    </div>
                    <hr className="border-border-base" />
                    <div>
                      <p className="font-semibold text-text-primary mb-1">Step 3: 산출세액 계산</p>
                      <p className="italic text-text-tertiary">과세표준 × 세율(6~45% 누진) − 누진공제 = 산출세액</p>
                      <p className="text-xs mt-1">예: 930만 × 6%(1,400만 이하) = 55.8만 (누진공제 0) = 55.8만 산출세액</p>
                    </div>
                    <hr className="border-border-base" />
                    <div>
                      <p className="font-semibold text-text-primary mb-1">Step 4: 최종 납부액 결정</p>
                      <p className="italic text-text-tertiary">산출세액 − 기납부세액(원천징수 3.3%) = 환급 또는 추가납부</p>
                      <p className="text-xs mt-1">
                        예: 55.8만 − 118.8만(연 3,600만 × 3.3%) = −63만 → 63만 환급
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border-l-2 border-l-primary-500 bg-primary-500/5 p-4 text-sm text-text-secondary">
                  <p className="font-semibold text-text-primary">💡 정산 결과의 3가지 경우</p>
                  <ul className="mt-2 space-y-2 list-inside list-disc">
                    <li>
                      <strong>환급 (가장 일반적)</strong> — 최종 세금 &lt; 기납부 3.3% → 차액 환급 (예: 계산 55.8만, 기납부
                      118.8만 → 63만 환급)
                    </li>
                    <li>
                      <strong>추가납부</strong> — 최종 세금 &gt; 기납부 3.3% → 차액 납부 (고소득·누진세율 상위 적용 시)
                    </li>
                    <li>
                      <strong>정산완료 (드물)</strong> — 최종 세금 = 기납부 3.3% → 추가 납부·환급 없음
                    </li>
                  </ul>
                </div>
              </section>

              <AdSlot slot="guide-freelancer-take-home-mid" format="rectangle" />

              {/* 4. 환급·추가납부 예측 */}
              <section className="space-y-4">
                <h2 className="text-2xl font-bold">4. 환급 vs 추가납부 — 언제 무엇을 예상할까?</h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  프리랜서가 5월에 "얼마나 환급받을지" "얼마를 더 낼지"는 연소득, 경비, 공제에 따라 달라집니다.
                  주요 판단 기준을 이해하면 미리 자금 계획을 세울 수 있습니다.
                </p>

                <div className="space-y-3 rounded-lg bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">환급이 나올 가능성이 높은 경우</p>
                  <div className="text-sm text-text-secondary space-y-2">
                    <div className="ml-4">
                      <p>
                        <strong>1. 연소득이 적을 때 (3,000만 이하)</strong>
                      </p>
                      <p className="text-xs text-text-tertiary ml-2 mt-1">
                        3.3% 원천징수는 용역료 기준이지만, 최종 세금은 경비 차감 후 소득금액 기준입니다. 연소득 3,000만 +
                        경비 70% 적용 시 소득금액 900만 → 6% 세율 약 54만 세금. 기납부 99만 원천징수 → 45만 환급 기대.
                      </p>
                    </div>
                    <hr className="border-border-base" />
                    <div className="ml-4">
                      <p>
                        <strong>2. 경비 인정이 클 때</strong>
                      </p>
                      <p className="text-xs text-text-tertiary ml-2 mt-1">
                        IT·컨설팅·디자인 등 단순경비율이 높은 업종 + 영수증(실경비) 추가 인정 시 소득금액이
                        낮아져 세금 감소 → 환급 확대.
                      </p>
                    </div>
                    <hr className="border-border-base" />
                    <div className="ml-4">
                      <p>
                        <strong>3. 공제가 많을 때</strong>
                      </p>
                      <p className="text-xs text-text-tertiary ml-2 mt-1">
                        부양가족 공제, 신용카드 소비액 공제, 의료비 공제 등이 크면 과세표준 감소 → 세금 감소 → 환급 확대.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 rounded-lg bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">추가납부가 나올 가능성이 높은 경우</p>
                  <div className="text-sm text-text-secondary space-y-2">
                    <div className="ml-4">
                      <p>
                        <strong>1. 고소득 (1억 이상)</strong>
                      </p>
                      <p className="text-xs text-text-tertiary ml-2 mt-1">
                        연 1억 매출 + 경비 40% 적용 시 소득금액 6,000만 → 24% 세율 구간 진입. 산출세액 약 864만(6,000만×24%−576만) vs 기납부
                        330만 → 약 534만 추가납부.
                      </p>
                    </div>
                    <hr className="border-border-base" />
                    <div className="ml-4">
                      <p>
                        <strong>2. N잡(직장+프리랜서) 합산 고소득</strong>
                      </p>
                      <p className="text-xs text-text-tertiary ml-2 mt-1">
                        직장 연봉 5,000만 + 프리랜서 2,000만 → 합산 소득 누진세율 상향 적용 → 세율이 15%~24% 상향 → 추가납부.
                      </p>
                    </div>
                    <hr className="border-border-base" />
                    <div className="ml-4">
                      <p>
                        <strong>3. 경비 인정이 작을 때</strong>
                      </p>
                      <p className="text-xs text-text-tertiary ml-2 mt-1">
                        도소매·음식점 등 단순경비율이 낮은 업종 또는 영수증 부족 시 소득금액이 크게 잡혀 → 추가납부.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* 5. 함정 5가지 */}
              <section className="space-y-4">
                <h2 className="text-2xl font-bold">5. 프리랜서 3.3% 원천징수 함정 5가지</h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  3.3% 원천징수 시스템 운영 시 자주 실수하는 함정들입니다. 미리 알아두면 세무조사나 추가납부를
                  회피할 수 있습니다.
                </p>

                <div className="rounded-lg border-l-2 border-l-danger-500 bg-danger-500/5 p-4">
                  <p className="font-semibold text-danger-700 dark:text-danger-300 mb-3">함정 5가지</p>
                  <ul className="text-sm text-danger-600 dark:text-danger-400 list-inside list-disc space-y-2">
                    <li>
                      <strong>함정 1: 3.3% = 최종 세금이라고 착각</strong>
                      <span className="text-xs text-text-tertiary block ml-5 mt-1">
                        3.3%는 기납부일 뿐. 5월에 정산 시 환급 또는 추가납부가 발생하는 경우가 대부분. 고소득이면 확실히
                        추가납부.
                      </span>
                    </li>
                    <li>
                      <strong>함정 2: 원천징수 영수증 미수령</strong>
                      <span className="text-xs text-text-tertiary block ml-5 mt-1">
                        지급자(클라이언트)가 "따로 안 줄게" 하면 안 됩니다. 5월 신고 시 기납부세액 증빙이 필요. 크레딧 카드
                        매출전표나 세금계산서·일반영수증 확보 필수.
                      </span>
                    </li>
                    <li>
                      <strong>함정 3: 경비율 선택 오류</strong>
                      <span className="text-xs text-text-tertiary block ml-5 mt-1">
                        단순경비율을 선택했어도, 세무조사 시 "실제 경비"를 묻습니다. 영수증 없으면 경비 불인정 → 추정소득
                        상향 → 가산세. 업종별 경비율은 목안일 뿐, 최종은 입증.
                      </span>
                    </li>
                    <li>
                      <strong>함정 4: 무신고·지연신고</strong>
                      <span className="text-xs text-text-tertiary block ml-5 mt-1">
                        5월 31일까지 신고 안 하면 가산세 20% 납부. 원천징수로 이미 기납부했어도 신고는 의무. 신고하지 않으면
                        환급금도 영구 상실(5년 경과 후 청구 불가).
                      </span>
                    </li>
                    <li>
                      <strong>함정 5: 비사업용역 오분류</strong>
                      <span className="text-xs text-text-tertiary block ml-5 mt-1">
                        일부 용역은 인적용역이 아니라 다른 분류(근로소득, 일반 도급비 등)일 수 있음. 실질 판단 시 고용 관계로
                        분류되면 근로소득으로 재분류되어 세액 달라짐.
                      </span>
                    </li>
                  </ul>
                </div>
              </section>

              {/* 6. 절세·대비 전략 */}
              <section className="space-y-4">
                <h2 className="text-2xl font-bold">6. 5월 신고 전 자금 및 절세 대비</h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  원천징수 후 환급 또는 추가납부가 예상되는 만큼, 미리 자금 계획과 절세 전략을 세워야 합니다.
                  특히 추가납부가 예상되면 5월 전에 자금 준비가 필수입니다.
                </p>

                <div className="rounded-lg bg-bg-raised p-4">
                  <p className="font-semibold text-text-primary mb-3">5월 신고 전 체크리스트</p>
                  <ul className="space-y-2 text-sm text-text-secondary">
                    <li className="flex items-start gap-2">
                      <span className="text-primary-600 dark:text-primary-400 font-bold">1.</span>
                      <span>
                        <strong>연 매출액 집계</strong> — 모든 용역비 내역(월별, 클라이언트별) 정리. 누락된 수입 없는지 확인.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary-600 dark:text-primary-400 font-bold">2.</span>
                      <span>
                        <strong>경비 영수증 보관</strong> — 사무실 임차료, 통신비, 교재료, 장비 구매 등 사업 관련 영수증 모두
                        수집.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary-600 dark:text-primary-400 font-bold">3.</span>
                      <span>
                        <strong>원천징수액 합계</strong> — 연중 받은 모든 용역료의 3.3% 원천징수액 합산. (매월 영수증 필수)
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary-600 dark:text-primary-400 font-bold">4.</span>
                      <span>
                        <strong>세액 미리계산</strong> —{' '}
                        <Link href="/calculator/freelancer-tax/" className="text-primary-600 underline dark:text-primary-500">
                          프리랜서 종합소득세 계산기
                        </Link>
                        로 예상 세액 산출. 환급 또는 추가납부 규모 파악.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary-600 dark:text-primary-400 font-bold">5.</span>
                      <span>
                        <strong>절세 수단 점검</strong> — 연금저축(공제), 노란우산공제(공제), 신용카드 소비(공제) 추가 여부.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary-600 dark:text-primary-400 font-bold">6.</span>
                      <span>
                        <strong>추가납부 자금 준비</strong> — 고소득이면 추가납부 규모 예상하여 현금 확보.
                      </span>
                    </li>
                  </ul>
                </div>
              </section>

              {/* FAQ */}
              <FaqSection items={FAQ_ITEMS} />

              {/* 주의사항 */}
              <section className="card border-l-2 border-l-danger-500 bg-danger-500/5">
                <h2 className="mb-3 text-lg font-semibold text-danger-700 dark:text-danger-300">⚠️ 최종 주의사항</h2>
                <ul className="space-y-2 text-sm text-danger-700 dark:text-danger-300">
                  <li>
                    • <strong>3.3%는 최종 세금이 아닙니다</strong> — 5월 신고 시 환급·추가납부 가능. 현금 흐름 관리
                    필수.
                  </li>
                  <li>
                    • <strong>경비율은 업종별·상황별로 다릅니다</strong> — 본 가이드 수치는 일반론. 정확한 계산은 세무사
                    상담.
                  </li>
                  <li>
                    • <strong>5월 31일 신고 기한 필수</strong> — 무신고·지연 시 가산세 20%. 환급금도 환급 청구 기한
                    5년(경과 후 상실).
                  </li>
                  <li>
                    • <strong>영수증·통장 기록 5년 보관</strong> — 세무조사 대비 필수. 경비 입증 자료 확보.
                  </li>
                  <li>
                    • <strong>N잡 또는 고소득이면 세무사 상담 강력 권고</strong> — 누진세율·가산세 위험 회피.
                  </li>
                </ul>
              </section>

              {/* 관련 계산기·가이드 */}
              <section className="card">
                <h2 className="mb-4 text-lg font-semibold">📊 관련 계산기·가이드</h2>
                <ul className="space-y-2 text-sm">
                  <li>
                    →{' '}
                    <Link href="/calculator/freelancer-tax/" className="text-primary-600 underline dark:text-primary-500">
                      프리랜서 종합소득세 계산기
                    </Link>
                    {' '}— 연소득·경비율·공제 입력 후 세액·환급액 즉시 계산
                  </li>
                  <li>
                    →{' '}
                    <Link
                      href="/guide/freelancer-simplified-vs-standard-expense-rate-2026/"
                      className="text-primary-600 underline dark:text-primary-500"
                    >
                      프리랜서 단순경비율 vs 기준경비율 2026 선택 기준
                    </Link>
                    {' '}— 경비율 선택으로 세금 50만~200만 차이
                  </li>
                  <li>
                    →{' '}
                    <Link href="/guide/freelancer-salary-comparison/" className="text-primary-600 underline dark:text-primary-500">
                      프리랜서 vs 일반직 실수령액 비교
                    </Link>
                    {' '}— 같은 연봉이라도 4대보험·세금 차이
                  </li>
                  <li>
                    →{' '}
                    <Link href="/guide/may-comprehensive-income-tax/" className="text-primary-600 underline dark:text-primary-500">
                      5월 종합소득세 신고 완벽 가이드
                    </Link>
                    {' '}— 신고 대상·기한·절세 5가지
                  </li>
                  <li>
                    →{' '}
                    <Link href="/category/work/" className="text-primary-600 underline dark:text-primary-500">
                      근로·소득 계산기 모음
                    </Link>
                    {' '}— 연봉·N잡·부업 세금 계산 도구
                  </li>
                </ul>
              </section>

              <ShareButtons
                title="프리랜서 3.3% 원천징수와 실수령액 2026"
                url={URL}
                description="용역료 300만 → 3.3% 떼고 290만 받음. 그런데 이건 최종 세금이 아니라 미리 낸 세금. 5월 신고 시 환급 또는 추가납부. 정산 메커니즘·환급 예측·함정 5가지 완벽 정리."
              />

              {/* 출처 및 면책 */}
              <section
                aria-label="출처 및 면책"
                className="rounded-lg border border-border-base p-4 text-caption text-text-tertiary"
              >
                <p className="mb-2">
                  <strong>법적 근거</strong>: 소득세법 §127(원천징수) · §129(원천징수세율) · 지방소득세(소득세의 10%) ·
                  소득세법 §55(누진세율). 참고:{' '}
                  <a
                    href="https://www.hometax.go.kr/guide/0206000000.jsp"
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="text-primary-600 underline dark:text-primary-500"
                  >
                    국세청 종합소득세 신고 안내
                  </a>
                  ,{' '}
                  <a
                    href="https://www.nts.go.kr"
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="text-primary-600 underline dark:text-primary-500"
                  >
                    국세청 (nts.go.kr)
                  </a>
                  .
                </p>
                <p className="mb-2">
                  <strong>면책 조항</strong>: 본 가이드는 정보 제공 목적이며 세무·법적 조언이 아닙니다. 업종별 경비율, 최종
                  세액 계산은 상황·소득·공제에 따라 크게 달라질 수 있으므로, 정확한 신고 전 세무사 또는 국세청 상담을
                  받으시기 바랍니다.
                </p>
                <p>
                  <strong>AI 보조 작성</strong>: 본 가이드는 AI 보조 작성 후 운영자 검수를 거쳤습니다(Google AI Content
                  Policy 준수). 업데이트: {DATE_MODIFIED}
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
