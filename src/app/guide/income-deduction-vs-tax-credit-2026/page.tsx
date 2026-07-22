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

const URL = 'https://calculatorhost.com/guide/income-deduction-vs-tax-credit-2026/';
const DATE_PUBLISHED = '2026-05-23';
const DATE_MODIFIED = '2026-05-23';

export const metadata: Metadata = {
  title: '소득공제 vs 세액공제 2026 | 어느 쪽이 더 절세? 순서·차이·계산',
  description:
    '5월 31일 종소세 신고! 소득공제(매출 먼저 차감)와 세액공제(세액에서 차감) 어느 쪽이 유리한가? 누진세율 적용 순서·기본공제 250만·표준세액공제 13만 선택권·중복 불가 항목·4티어 절세 가이드.',
  keywords: [
    '소득공제',
    '세액공제',
    '소득공제 vs 세액공제',
    '표준세액공제 13만',
    '근로소득공제',
    '의료비 공제',
    '교육비 공제',
    '누진세율 절세',
    '종합소득세 공제',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '소득공제 vs 세액공제 2026 | 어느 쪽이 더 절세? 순서·차이·계산' }],
    title: '소득공제 vs 세액공제 2026 차이와 선택 기준',
    description: '소득공제는 과세표준 감소, 세액공제는 세금에서 차감. 누진세가 높을수록 소득공제 유리? 5월 신고 필독.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '소득공제와 세액공제 차이 (2026 종소세 신고)',
    description: '소득공제 vs 세액공제 누가 더 절세? 계산 순서·선택권 정리.',
  },
};

const FAQ_ITEMS = [
  {
    question: '소득공제와 세액공제는 정확히 뭐가 다른가요?',
    answer:
      '소득공제는 "과세표준을 감소시키는 것"(소득세법 §50~§52), 세액공제는 "산출세액에서 직접 차감하는 것"(소득세법 §59~§59의5)입니다. 예: 소득공제 1,000만 원이면 누진세율 15% 구간에서 150만 원 절세. 세액공제 150만 원이면 세금에서 직접 150만 원 차감.',
  },
  {
    question: '소득이 높을수록 어느 공제가 더 유리한가요?',
    answer:
      '소득이 높을수록 "소득공제"가 더 유리합니다. 누진세율 구간이 높아지기 때문입니다. 예: 연봉 8,000만 → 누진세율 24% 구간일 때, 소득공제 1,000만 = 240만 원 절세. 세액공제 150만 원과 비교하면 소득공제가 90만 원 더 유리.',
  },
  {
    question: '의료비 공제, 소득공제?아니면 세액공제?',
    answer:
      '의료비는 "세액공제(15%)"입니다(소득세법 §59의3). 의료비 지출액 × 15%를 세금에서 직접 깎으면 됩니다. 반면 근로소득공제는 "소득공제"이므로 (소득세법 §50), 두 개는 별개입니다. 중복 적용 불가.',
  },
  {
    question: '표준세액공제 13만원은 뭔가요?',
    answer:
      '표준세액공제(소득세법 §59의4)는 특별세액공제를 못 받거나, 받은 특별세액공제의 합이 13만 원보다 작을 때 적용되는 최소 보장 공제입니다. "표준 OR 특별 중 더 큰 것 선택" 구조.',
  },
  {
    question: '기부금은 소득공제?세액공제?',
    answer:
      '기부금은 둘 다 있습니다. 법정기부금(종교단체·적십자 등)은 "소득공제"(소득세법 §51의3), 정치자금·선거자금 기부는 "세액공제"(소득세법 §59의2). 신고 시 구분하여 신청해야 합니다.',
  },
  {
    question: '교육비 공제, 언제까지 받을 수 있나요?',
    answer:
      '자녀 교육비는 "세액공제 15%"(소득세법 §59의2)입니다. 초·중·고 학비 + 학원비 300만 + 교복비 60만 등이 대상. 다만 종일제 수료생이나 대학생 자신의 수강료는 대상 아님. 신청 기한은 5월 31일.',
  },
  {
    question: '중복 적용 불가 공제가 있나요?',
    answer:
      '있습니다. 예: 의료비는 세액공제 15% OR 소득공제 중 하나만 선택(복합 불가). 기부금도 법정기부금(소득공제) + 정치기부(세액공제)는 별개지만, 기부금 세액공제와 근로소득세액공제는 모두 적용 가능합니다(국세기본법 §14 실질과세 원칙에 위배되지 않는 한).',
  },
  {
    question: '5월 31일 신고 시 어떻게 신청하나요?',
    answer:
      '홈택스 종합소득세 신고 → "소득공제" 섹션에서 인적공제·근로소득공제·특별소득공제 선택 → "세액공제" 섹션에서 자녀·의료비·교육비 등 신청. 표준세액공제는 자동 계산.',
  },
];

export default function IncomeDeductionVsTaxCredit2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '소득공제 vs 세액공제 가이드' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '소득공제 vs 세액공제 2026 완벽 정리',
    description:
      '소득공제(과세표준 차감) vs 세액공제(세액 차감) 차이·누진세 효과·표준 vs 특별 선택권·기부금·의료비·교육비 공제 구분·중복 불가 항목·5월 신고 신청 방법.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['소득공제', '세액공제', '누진세', '절세', '5월 신고'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '소득공제 vs 세액공제 2026 완벽 정리',
    description:
      '5월 31일 종합소득세 신고! 소득공제(과세표준 감소) vs 세액공제(세액 차감) 차이·누진세 적용 순서·기본공제 250만·표준세액공제 13만 선택권·의료비·교육비·기부금 구분·함정 5가지·절세 시뮬 3개.',
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
                    { name: '소득공제 vs 세액공제' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">세금 · 10분 읽기 · 2026-05-23</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  소득공제 vs 세액공제 2026
                  <br />
                  <span className="text-2xl text-text-secondary">— 누가 더 절세? 5월 신고 완벽 정리</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  5월 31일 종합소득세 신고가 다가오면서 많은 사람이 혼동해하는 것이 바로{' '}
                  <strong>소득공제와 세액공제</strong>의 차이입니다. 이 두 개념은 계산 순서부터 절세 효과까지 완전히
                  다릅니다.
                  <strong>
                    소득공제는 과세표준을 먼저 차감하고 세율을 곱하는 것이고, 세액공제는 산출된 세액에서 직접
                    깎는 것
                  </strong>
                  입니다. 연봉이 높을수록, 누진세율이 높을수록 소득공제가 유리합니다. 이 페이지에서는 공제의 종류,
                  계산 순서, 그리고 언제 어느 공제가 유리한지를 완벽하게 정리합니다.
                </p>
              </header>

              <AdSlot slot="guide-income-deduction-vs-tax-credit-top" format="horizontal" />

              {/* 핵심 요약 */}
              <section aria-label="핵심 요약" className="card border-l-4 border-l-primary-500">
                <h2 className="mb-4 text-2xl font-bold text-primary-700 dark:text-primary-300">핵심 정리</h2>
                <div className="mb-4 overflow-x-auto">
                  <table className="w-full text-sm" data-speakable>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th className="px-3 py-2 text-left">항목</th>
                        <th className="px-3 py-2 text-left">소득공제</th>
                        <th className="px-3 py-2 text-left">세액공제</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="px-3 py-2 font-semibold">의미</td>
                        <td className="px-3 py-2">과세표준 감소</td>
                        <td className="px-3 py-2">산출세액에서 차감</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="px-3 py-2 font-semibold">계산 단계</td>
                        <td className="px-3 py-2">세율 곱하기 전</td>
                        <td className="px-3 py-2">세율 곱한 후</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="px-3 py-2 font-semibold">절세 효과</td>
                        <td className="px-3 py-2">공제 × 누진세율(%)</td>
                        <td className="px-3 py-2">공제액 100%</td>
                      </tr>
                      <tr>
                        <td className="px-3 py-2 font-semibold">유리한 상황</td>
                        <td className="px-3 py-2">고소득 (높은 세율 구간)</td>
                        <td className="px-3 py-2">저소득 + 자녀 많음</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="rounded-lg bg-primary-500/10 p-4 text-sm text-primary-700 dark:text-primary-300">
                  <p className="font-semibold">TL;DR</p>
                  <ul className="mt-2 list-inside list-disc space-y-1">
                    <li>
                      <strong>소득공제</strong>: 근로소득공제·인적공제·기부금·연금저축 (과세표준 차감)
                    </li>
                    <li>
                      <strong>세액공제</strong>: 자녀·의료비·교육비·신용카드·근로장려금 (세금에서 직접 깎음)
                    </li>
                    <li>
                      <strong>누진세 높을수록</strong> 소득공제 유리 (세율 35% vs 15%)
                    </li>
                    <li>
                      <strong>표준 vs 특별</strong> 세액공제는 "더 큰 것" 선택 (양자택일)
                    </li>
                  </ul>
                </div>
              </section>

              {/* 1. 소득공제 정의 및 종류 */}
              <section className="space-y-4">
                <h2 className="text-2xl font-bold">1. 소득공제 — 과세표준을 줄인다 (소득세법 §50~§52)</h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  소득공제는 <strong>총소득에서 일정 금액을 먼저 차감해서 과세표준을 줄이는 방식</strong>입니다.
                  결과적으로 누진세율을 적용받는 "기초"가 작아지므로, 특히 고소득자일수록 큰 절세 효과를 봅니다.
                </p>

                <div className="rounded-lg bg-bg-card p-4">
                  <p className="mb-3 font-semibold text-text-primary">소득공제 계산 순서</p>
                  <div className="space-y-2 text-sm text-text-secondary">
                    <div className="flex items-center gap-2">
                      <span className="rounded-full bg-primary-500 w-6 h-6 flex items-center justify-center text-white font-bold text-xs">
                        1
                      </span>
                      <span>
                        <strong>총소득</strong> (급여·사업소득·이자배당)
                      </span>
                    </div>
                    <div className="ml-8 border-l-2 border-primary-500 pl-4 py-2">
                      ↓
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="rounded-full bg-primary-500 w-6 h-6 flex items-center justify-center text-white font-bold text-xs">
                        2
                      </span>
                      <span>
                        <strong>소득공제</strong> (인적·근로소득·기부금 차감)
                      </span>
                    </div>
                    <div className="ml-8 border-l-2 border-primary-500 pl-4 py-2">
                      ↓
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="rounded-full bg-primary-500 w-6 h-6 flex items-center justify-center text-white font-bold text-xs">
                        3
                      </span>
                      <span>
                        <strong>과세표준</strong> = 총소득 − 소득공제
                      </span>
                    </div>
                    <div className="ml-8 border-l-2 border-primary-500 pl-4 py-2">
                      ↓
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="rounded-full bg-primary-500 w-6 h-6 flex items-center justify-center text-white font-bold text-xs">
                        4
                      </span>
                      <span>
                        <strong>산출세액</strong> = 과세표준 × 누진세율 − 누진공제
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 rounded-lg bg-bg-raised p-4">
                  <p className="font-semibold text-text-primary">주요 소득공제 항목 (소득세법 §50~§52)</p>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-border-base">
                          <th className="px-3 py-2 text-left">항목</th>
                          <th className="px-3 py-2 text-left">기준·한도</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-border-base">
                          <td className="px-3 py-2 font-semibold">기본공제</td>
                          <td className="px-3 py-2">1인당 150만 (부양가족 모두 적용)</td>
                        </tr>
                        <tr className="border-b border-border-base">
                          <td className="px-3 py-2 font-semibold">추가공제</td>
                          <td className="px-3 py-2">장애인 200만, 60세 이상 100만</td>
                        </tr>
                        <tr className="border-b border-border-base">
                          <td className="px-3 py-2 font-semibold">근로소득공제</td>
                          <td className="px-3 py-2">소득 따라 3~400만 (소득세법 §50)</td>
                        </tr>
                        <tr className="border-b border-border-base">
                          <td className="px-3 py-2 font-semibold">연금보험료공제</td>
                          <td className="px-3 py-2">국민연금, 공무원·군인·교원 연금 100% (한도 있음)</td>
                        </tr>
                        <tr className="border-b border-border-base">
                          <td className="px-3 py-2 font-semibold">특별소득공제</td>
                          <td className="px-3 py-2">신용카드·연금저축·기부금</td>
                        </tr>
                        <tr>
                          <td className="px-3 py-2 font-semibold">법정기부금</td>
                          <td className="px-3 py-2">종교단체·적십자·고향세액 100%</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </section>

              {/* 2. 세액공제 정의 및 종류 */}
              <section className="space-y-4">
                <h2 className="text-2xl font-bold">2. 세액공제 — 세금에서 직접 깎는다 (소득세법 §59~§59의5)</h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  세액공제는 <strong>산출세액이 나온 후, 세금 자체에서 직접 차감하는 방식</strong>입니다. 공제액이
                  크수록 직접적인 절세 효과를 봅니다. 다만 누진세율의 영향을 받지 않으므로 소득 수준과 관계없이
                  공제액이 동일합니다.
                </p>

                <div className="rounded-lg bg-bg-card p-4">
                  <p className="mb-3 font-semibold text-text-primary">세액공제 계산 순서</p>
                  <div className="space-y-2 text-sm text-text-secondary">
                    <div className="flex items-center gap-2">
                      <span className="rounded-full bg-secondary-500 w-6 h-6 flex items-center justify-center text-white font-bold text-xs">
                        1
                      </span>
                      <span>
                        <strong>산출세액</strong> 계산 완료
                      </span>
                    </div>
                    <div className="ml-8 border-l-2 border-secondary-500 pl-4 py-2">
                      ↓
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="rounded-full bg-secondary-500 w-6 h-6 flex items-center justify-center text-white font-bold text-xs">
                        2
                      </span>
                      <span>
                        <strong>세액공제</strong> (자녀·의료비·교육비 등 차감)
                      </span>
                    </div>
                    <div className="ml-8 border-l-2 border-secondary-500 pl-4 py-2">
                      ↓
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="rounded-full bg-secondary-500 w-6 h-6 flex items-center justify-center text-white font-bold text-xs">
                        3
                      </span>
                      <span>
                        <strong>결정세액</strong> = 산출세액 − 세액공제
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 rounded-lg bg-bg-raised p-4">
                  <p className="font-semibold text-text-primary">주요 세액공제 항목 (소득세법 §59~§59의5)</p>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-border-base">
                          <th className="px-3 py-2 text-left">항목</th>
                          <th className="px-3 py-2 text-left">요율·한도</th>
                          <th className="px-3 py-2 text-left">법조항</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-border-base">
                          <td className="px-3 py-2 font-semibold">근로소득세액공제</td>
                          <td className="px-3 py-2">근로소득 8.8% (한도 750만)</td>
                          <td className="px-3 py-2 text-xs">§59</td>
                        </tr>
                        <tr className="border-b border-border-base">
                          <td className="px-3 py-2 font-semibold">자녀세액공제</td>
                          <td className="px-3 py-2">자녀 1~2명 15만 (3명 25만)</td>
                          <td className="px-3 py-2 text-xs">§59의2</td>
                        </tr>
                        <tr className="border-b border-border-base">
                          <td className="px-3 py-2 font-semibold">의료비세액공제</td>
                          <td className="px-3 py-2">초과분 × 15% (700만 초과)</td>
                          <td className="px-3 py-2 text-xs">§59의3</td>
                        </tr>
                        <tr className="border-b border-border-base">
                          <td className="px-3 py-2 font-semibold">표준세액공제</td>
                          <td className="px-3 py-2">특별공제 합 &lt; 13만시 13만 적용</td>
                          <td className="px-3 py-2 text-xs">§59의4</td>
                        </tr>
                        <tr className="border-b border-border-base">
                          <td className="px-3 py-2 font-semibold">교육비세액공제</td>
                          <td className="px-3 py-2">지출액 × 15% (한도 300만)</td>
                          <td className="px-3 py-2 text-xs">§59의2</td>
                        </tr>
                        <tr>
                          <td className="px-3 py-2 font-semibold">기부금세액공제</td>
                          <td className="px-3 py-2">초과분 × 15% (1,000만 초과)</td>
                          <td className="px-3 py-2 text-xs">§59의2</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </section>

              <AdSlot slot="guide-income-deduction-vs-tax-credit-mid" format="rectangle" />

              {/* 3. 누진세 효과 비교 */}
              <section className="space-y-4">
                <h2 className="text-2xl font-bold">3. 누진세 효과: 소득공제가 왜 고소득자 유리한가</h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  소득공제의 절세 효과는 누진세율에 비례합니다. 같은 1,000만 원을 공제받아도, 누진세율 15%인 사람은
                  150만 원 절세, 누진세율 38%인 사람은 380만 원 절세를 받습니다. 이것이 "소득공제는 고소득자
                  유리"라는 이유입니다.
                </p>

                <div className="rounded-lg bg-highlight-500/10 p-4">
                  <p className="mb-3 font-semibold text-highlight-700 dark:text-highlight-300">실제 계산 사례</p>
                  <div className="space-y-3 text-sm text-text-secondary">
                    <div className="rounded-lg bg-bg-card p-3">
                      <p className="font-semibold text-text-primary mb-2">
                        사례 A: 연봉 3,000만 (누진세율 15%)
                      </p>
                      <ul className="list-inside list-disc space-y-1">
                        <li>기본공제 150만 차감</li>
                        <li>소득공제 절세 = 150만 × 15% = 22.5만 원</li>
                        <li>자녀세액공제 15만 원 (절세액 동일)</li>
                        <li className="text-xs italic text-text-tertiary">
                          → 소득공제와 세액공제 절세액 거의 동등
                        </li>
                      </ul>
                    </div>

                    <div className="rounded-lg bg-bg-card p-3">
                      <p className="font-semibold text-text-primary mb-2">
                        사례 B: 연봉 8,000만 (누진세율 24%)
                      </p>
                      <ul className="list-inside list-disc space-y-1">
                        <li>기본공제 150만 차감</li>
                        <li>소득공제 절세 = 150만 × 24% = 36만 원</li>
                        <li>자녀세액공제 15만 원 (절세액 고정)</li>
                        <li className="text-xs italic text-text-tertiary">
                          → 소득공제가 21만 원 더 유리!
                        </li>
                      </ul>
                    </div>

                    <div className="rounded-lg bg-bg-card p-3">
                      <p className="font-semibold text-text-primary mb-2">
                        사례 C: 연봉 1억 5,000만 (누진세율 35%)
                      </p>
                      <ul className="list-inside list-disc space-y-1">
                        <li>기본공제 150만 차감</li>
                        <li>소득공제 절세 = 150만 × 35% = 52.5만 원</li>
                        <li>자녀세액공제 15만 원 (절세액 고정)</li>
                        <li className="text-xs italic text-text-tertiary">
                          → 소득공제가 37.5만 원 더 유리!
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border-l-4 border-l-highlight-500 bg-highlight-500/5 p-4 text-sm text-text-secondary">
                  <p className="font-semibold text-text-primary">핵심 원칙</p>
                  <p className="mt-2">
                    <strong>소득공제 절세액 = 공제액 × 본인의 누진세율</strong>
                    <br />
                    소득이 높을수록 세율이 높으므로, 같은 공제액에서 더 큰 절세 효과를 봅니다.
                  </p>
                </div>
              </section>

              {/* 4. 표준세액공제 vs 특별세액공제 */}
              <section className="space-y-4">
                <h2 className="text-2xl font-bold">4. 표준세액공제 13만 vs 특별세액공제 선택 (소득세법 §59의4)</h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  세액공제에는 두 가지 방식이 있습니다. 기본적으로 특별세액공제(자녀·의료비·교육비 등) 합계를
                  받지만, 그 합이 13만 원보다 작으면 "표준세액공제" 13만 원을 받는 방식입니다. 사실상 "더 큰 것을
                  선택"하는 구조입니다.
                </p>

                <div className="rounded-lg bg-bg-card p-4">
                  <p className="mb-3 font-semibold text-text-primary">표준 vs 특별 선택 로직</p>
                  <div className="text-sm text-text-secondary space-y-2">
                    <div className="rounded-lg bg-bg-raised p-2">
                      <p className="font-semibold mb-1">특별세액공제 합계 {'>'} 13만:</p>
                      <p className="ml-3">→ 특별세액공제 합계 사용 (예: 자녀 25만 + 의료비 10만 = 35만 사용)</p>
                    </div>
                    <div className="rounded-lg bg-bg-raised p-2">
                      <p className="font-semibold mb-1">특별세액공제 합계 &lt; 13만:</p>
                      <p className="ml-3">→ 표준세액공제 13만 자동 적용 (예: 자녀 5만만 해당 시 13만 대신 적용)</p>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg bg-bg-raised p-4 text-sm text-text-secondary">
                  <p className="font-semibold text-text-primary mb-3">실제 계산 사례</p>
                  <div className="space-y-3">
                    <div>
                      <p className="font-semibold text-text-primary">자녀 2명 (각 15만 = 30만)</p>
                      <p className="ml-3">
                        특별세액공제 30만 &gt; 13만 → <strong>30만 적용</strong>
                      </p>
                    </div>
                    <div>
                      <p className="font-semibold text-text-primary">자녀 0명, 의료비 5만만</p>
                      <p className="ml-3">
                        특별세액공제 5만 &lt; 13만 → <strong>표준 13만 적용</strong>
                      </p>
                    </div>
                    <div>
                      <p className="font-semibold text-text-primary">자녀 2명(30만) + 의료비 10만</p>
                      <p className="ml-3">
                        특별세액공제 40만 &gt; 13만 → <strong>40만 적용</strong>
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* 5. 중복 불가 항목과 함정 */}
              <section className="space-y-4">
                <h2 className="text-2xl font-bold">5. 함정: 중복 불가 공제 (국세기본법 §14 실질과세 원칙)</h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  일부 공제는 소득공제와 세액공제 중 하나만 선택해야 합니다. 의료비, 기부금, 신용카드 공제 중
                  일부가 해당합니다. 이를 모르고 "중복으로 신청"하면 국세청에서 실질과세 원칙(§14)을 적용해
                  가산세를 부과할 수 있습니다.
                </p>

                <div className="rounded-lg border-l-2 border-l-danger-500 bg-danger-500/5 p-4">
                  <p className="font-semibold text-danger-700 dark:text-danger-300 mb-3">중복 불가 항목 5가지</p>
                  <ul className="text-sm text-danger-600 dark:text-danger-400 list-inside list-disc space-y-1">
                    <li>
                      <strong>의료비:</strong> 세액공제(15%) OR 소득공제 중 택1. 동시 신청 시 국세청 판단에 따라 더
                      큰 것만 인정
                    </li>
                    <li>
                      <strong>기부금:</strong> 법정기부금(소득공제) + 정치기부(세액공제)는 별개지만, 같은 종류 중복
                      금지
                    </li>
                    <li>
                      <strong>신용카드 공제:</strong> 신용카드 사용 소득공제 OR 특별소비세 환급 중 택1
                    </li>
                    <li>
                      <strong>연금저축 공제:</strong> 600만 소득공제 한도를 초과하면 세액공제 불가
                    </li>
                    <li>
                      <strong>배우자 공제:</strong> 기본공제 또는 배우자 추가공제 중 택1 (동시 불가)
                    </li>
                  </ul>
                </div>

                <div className="rounded-lg bg-bg-raised p-4 text-sm text-text-secondary">
                  <p className="font-semibold text-text-primary mb-2">주의: 세무조사 시나리오</p>
                  <p>
                    프리랜서가 의료비 800만을 소득공제(누진세율 24% 적용 = 192만 절세)와 세액공제(15% = 120만
                    절세)를 동시에 신청했다면, 세무조사 시{' '}
                    <strong>
                      "중복 신청으로 인한 과소신고"로 판정되어 과소신고 가산세 10% + 가산세 이자(0.022%/일)
                    </strong>{' '}
                    부과됨.
                  </p>
                </div>
              </section>

              {/* 6. 최종 선택 가이드 */}
              <section className="space-y-4">
                <h2 className="text-2xl font-bold">6. 어느 공제가 유리한가? 최종 선택 가이드</h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  결론적으로, 소득공제와 세액공제는 "누적 효과"를 노려야 합니다. 소득공제로 과세표준을 줄인 후,
                  세액공제로 추가 절세를 하는 식입니다. 다만 중복 불가 항목은 신중히 선택해야 합니다.
                </p>

                <div className="rounded-lg bg-bg-card p-4">
                  <p className="mb-3 font-semibold text-text-primary">선택 판단 기준</p>
                  <div className="space-y-3 text-sm text-text-secondary">
                    <div className="rounded-lg bg-bg-raised p-3">
                      <p className="font-semibold text-text-primary mb-1">단독자 (부양가족 0)</p>
                      <p className="ml-3">
                        기본공제 150만 소득공제 + 근로소득세액공제 + 표준세액공제 13만. 세액공제 기본값 13만만 받으므로
                        추가 절세 가능성 낮음.
                      </p>
                    </div>
                    <div className="rounded-lg bg-bg-raised p-3">
                      <p className="font-semibold text-text-primary mb-1">부양가족 2명 + 자녀 1명</p>
                      <p className="ml-3">
                        기본공제 450만 소득공제 + 자녀세액공제 15만. 의료비·교육비 추가 시 세액공제 합계 30만~40만.
                        둘 다 최대 활용 추천.
                      </p>
                    </div>
                    <div className="rounded-lg bg-bg-raised p-3">
                      <p className="font-semibold text-text-primary mb-1">고소득자 (연봉 8천만 이상)</p>
                      <p className="ml-3">
                        누진세율 24% 이상. 소득공제 절세 효과 크므로 기본공제·근로소득공제·기부금 모두 최대. 세액공제
                        기본값만 해도 충분.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              <FaqSection items={[...FAQ_ITEMS]} />

              {/* 주의사항 */}
              <section className="card border-l-2 border-l-danger-500 bg-danger-500/5">
                <h2 className="mb-3 text-lg font-semibold text-danger-700 dark:text-danger-300">최종 주의사항</h2>
                <ul className="space-y-2 text-sm text-danger-700 dark:text-danger-300">
                  <li>
                    • <strong>중복 공제 금지</strong> — 의료비·기부금·신용카드 공제 "중복 신청" 시 가산세 부과 위험
                  </li>
                  <li>
                    • <strong>소득공제 절세 = 공제액 × 누진세율</strong> — 고소득자일수록 유리
                  </li>
                  <li>
                    • <strong>표준세액공제 13만</strong> — 특별공제 합이 13만 미만이면 자동 적용
                  </li>
                  <li>
                    • <strong>5월 31일 신고 시</strong> 공제 종류별로 구분하여 신청 (소득공제 / 세액공제 섹션
                    분리)
                  </li>
                  <li>
                    • <strong>국세기본법 §14 실질과세</strong> — 형식만 맞춰도, 실질이 중복이면 가산세 부과
                  </li>
                </ul>
              </section>

              {/* 관련 계산기·가이드 */}
              <section className="card">
                <h2 className="mb-4 text-lg font-semibold">관련 계산기·가이드</h2>
                <ul className="space-y-2 text-sm">
                  <li>
                    →{' '}
                    <Link href="/calculator/salary/" className="text-primary-600 underline dark:text-primary-500">
                      연봉 실수령액 계산기
                    </Link>
                    {' '}— 4대보험·세금·공제 모두 반영
                  </li>
                  <li>
                    →{' '}
                    <Link href="/guide/medical-expense-tax-credit-3-percent-2026/" className="text-primary-600 underline dark:text-primary-500">
                      의료비 세액공제 2026
                    </Link>
                    {' '}— 대표적 세액공제, 총급여 3% 초과분 15% 공제
                  </li>
                  <li>
                    →{' '}
                    <Link href="/calculator/freelancer-tax/" className="text-primary-600 underline dark:text-primary-500">
                      프리랜서 종합소득세 계산기
                    </Link>
                    {' '}— 소득공제·경비율 세액 계산
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
                    <Link href="/guide/freelancer-simplified-vs-standard-expense-rate-2026/" className="text-primary-600 underline dark:text-primary-500">
                      프리랜서 단순경비율 vs 기준경비율
                    </Link>
                    {' '}— 경비율 선택으로 추가 절세
                  </li>
                  <li>
                    →{' '}
                    <Link href="/guide/year-end-tax-settlement/" className="text-primary-600 underline dark:text-primary-500">
                      연말정산 완벽 가이드
                    </Link>
                    {' '}— 공제 항목 정정 및 추가 신청
                  </li>
                </ul>
              </section>

              <ShareButtons
                title="소득공제 vs 세액공제 2026 완벽 정리"
                url={URL}
                description="소득공제(과세표준 감소) vs 세액공제(세금에서 차감). 누진세 높을수록 소득공제 유리. 5월 신고 필독."
              />

              {/* 출처 및 면책 */}
              <section
                aria-label="출처 및 면책"
                className="rounded-lg border border-border-base p-4 text-caption text-text-tertiary"
              >
                <p className="mb-2">
                  <strong>법적 근거</strong>: 소득세법 §50~§52 (소득공제) · §59~§59의5 (세액공제) · §55 (누진세율) ·
                  국세기본법 §14 (실질과세 원칙). 참고:{' '}
                  <a
                    href="https://www.hometax.go.kr/guide/0202000000.jsp"
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="text-primary-600 underline dark:text-primary-500"
                  >
                    국세청 공제 안내
                  </a>
                  ,{' '}
                  <a
                    href="https://www.law.go.kr/"
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="text-primary-600 underline dark:text-primary-500"
                  >
                    법제처 법령 정보
                  </a>
                  .
                </p>
                <p className="mb-2">
                  <strong>면책 조항</strong>: 본 가이드는 정보 제공 목적이며 세무·법적 조언이 아닙니다. 개별 상황에
                  따라 세무상 결과가 달라질 수 있으며, 실제 신고 전 세무사 또는 국세청 상담을 받으시기 바랍니다.
                </p>
                <p>
                  <strong>AI 보조 작성</strong>: 본 가이드는 AI 보조 작성 후 운영자 검수를 거쳤습니다(Google AI
                  Content Policy 준수). 업데이트: {DATE_MODIFIED}
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
