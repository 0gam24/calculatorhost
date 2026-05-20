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

const URL = 'https://calculatorhost.com/guide/freelancer-simplified-vs-standard-expense-rate-2026/';
const DATE_PUBLISHED = '2026-05-21';
const DATE_MODIFIED = '2026-05-21';

export const metadata: Metadata = {
  title: '프리랜서 단순경비율 vs 기준경비율 2026 | 5월 31일 신고 선택 기준',
  description:
    '5월 31일까지 10일! 프리랜서·1인사업자 경비율 선택 기준. 단순(6~80%) vs 기준경비율 비교·업종별 매출 기준·실경비가 크면 기준이 유리·추계신고 vs 장부신고 의무·매출 경계값별 시뮬.',
  alternates: { canonical: URL },
  openGraph: {
    title: '프리랜서 단순경비율 vs 기준경비율 2026 선택 기준',
    description: '강사 3,000만 → 단순경비율? 기준경비율? 세율표 + 실거래 사례 3개 + 함정 정리.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '프리랜서 경비율 선택 기준 — 5월 31일까지',
    description: '단순 vs 기준경비율 세전 손익 시뮬레이션',
  },
};

const FAQ_ITEMS = [
  {
    question: '매출 3,000만 원이면 단순경비율 대상인가요?',
    answer:
      '업종에 따라 다릅니다(소득세법 시행령 §143). 서비스업(강사·컨설턴트) 기준은 2,400만 원이므로 3,000만 원이면 "단순경비율 초과"입니다. 하지만 단순경비율 선택 가능합니다(의무 X, 선택). 실경비가 크다면 기준경비율(70~80%)이 더 유리할 수 있습니다.',
  },
  {
    question: '단순경비율과 기준경비율 중 어느 쪽이 더 유리한가요?',
    answer:
      '실제 경비에 따라 다릅니다. 실경비 = (매출 × 경비율%)보다 작으면 단순경비율이 유리합니다. 예: 매출 1억, 실경비 2,500만일 때 단순 70%은 3,000만 소득·기준 70% 합산 약 4,000만 소득이므로 단순이 유리(기준은 기본경비 + 실경비이므로 실제 경비액이 단순 기준을 초과할 때만 기준 유리).',
  },
  {
    question: '5월 31일까지 선택 안 하면 어떻게 되나요?',
    answer:
      '신고 시점에 선택합니다. 정해진 기한은 없지만 종합소득세 신고(5월 31일) 시 신고서에 경비율 명기합니다. 신고 후 변경 불가. 추계신고(국세청 일방 통지)가 아니라면 신고 시 본인이 선택합니다.',
  },
  {
    question: '간편장부 의무는 매출 얼마부터인가요?',
    answer:
      '소득세법 시행령 §209 — 사업소득 7,500만 이상이면 장부 비치 의무(간편 이상). 7,500만 미만이면 선택사항. 다만 기준경비율 선택 시 장부 비치 권장(감시 시 실거래 입증 용이).',
  },
  {
    question: '추계신고와 장부신고는 뭐가 다른가요?',
    answer:
      '추계신고(소득세법 §80): 국세청이 일방적으로 과세표준 추정. 경비율 이의 불가. 장부신고(§81): 본인 제출 장부 기반 신고. 경비 입증 가능하면 실경비 인정. 매출 1억 이상이면 장부신고 권장(세율 누진 고려).',
  },
  {
    question: '세무조사 시 경비율이 인정 안 되면 어떻게 되나요?',
    answer:
      '국세기본법 §14(실질과세 원칙) 적용. 예: 간편장부 없이 단순경비율 주장하면 조사관이 추정소득 재계산. 가산세 20~40% + 미납세액 추가 부과. 따라서 단순경비율 선택 시라도 거래기록(통장·카드 내역) 보존 필수.',
  },
  {
    question: '복식부기는 언제 해야 하나요?',
    answer:
      '사업소득 1억 이상이거나 기준경비율보다 실경비가 훨씬 크면 고려. 복식부기 시 세액공제 회계 기장료는 경비 인정, 신용카드 수수료 등도 실경비로 인정. 하지만 기장 비용(월 5~20만) vs 세금 절감 비교 필수.',
  },
  {
    question: '부양가족 공제나 신용카드 공제는 경비와 별개인가요?',
    answer:
      '맞습니다. 경비율은 "사업소득" 산출용(매출 - 사업경비). 부양가족·신용카드·의료비는 "과세표준" 단계에서 인적공제·공제(소득세법 §50~§59). 경비율을 낮췄어도 공제로 추가 세금 절감 가능합니다.',
  },
];

export default function FreelancerSimplifiedVsStandardExpenseRate2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '프리랜서 경비율 선택 기준 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '프리랜서 단순경비율 vs 기준경비율 2026 선택 기준',
    description:
      '5월 31일 종합소득세 신고까지 10일! 프리랜서·1인사업자가 매출 규모·업종·실경비에 따라 경비율을 선택하는 완벽 가이드. 단순(고정비율) vs 기준(추가 경비 인정)의 세전 손익 비교·업종별 매출 기준 표·매출 경계값 시뮬레이션.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['프리랜서 경비율', '단순경비율', '기준경비율', '추계신고', '5월 신고'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '프리랜서 단순경비율 vs 기준경비율 2026 선택 기준',
    description:
      '5월 31일 마감 10일 전! 프리랜서·1인사업자 경비율 선택 기준. 단순(고정 6~80%) vs 기준경비율(주요경비+추가) 비교·업종별 기준점·실거래 3사례·함정 5가지·신고 방법.',
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
                    { name: '프리랜서 경비율 선택 기준' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">세금 · 11분 읽기 · 2026-05-21</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  프리랜서 단순경비율 vs 기준경비율 2026
                  <br />
                  <span className="text-2xl text-text-secondary">— 5월 31일까지 10일, 선택 기준 완벽 정리</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  5월 31일 종합소득세 신고 마감까지 정확히 10일 남았습니다. 프리랜서와 1인사업자가 가장 고민하는 것이 바로
                  <strong> 경비율 선택</strong>입니다.
                  <strong> 단순경비율(고정 6~80%)</strong>과
                  <strong> 기준경비율(주요경비+추가경비)</strong>은 세금 차이가 무려 50만~200만 원까지 날 수 있습니다. 본인의
                  매출 규모·업종·실제 경비를 바탕으로 정확하게 선택하는 방법을 이 페이지에서 모두 정리합니다.
                </p>
              </header>

              <AdSlot slot="guide-freelancer-expense-rate-top" format="horizontal" />

              {/* 핵심 요약 */}
              <section aria-label="핵심 요약" className="card border-l-4 border-l-primary-500">
                <h2 className="mb-4 text-2xl font-bold text-primary-700 dark:text-primary-300">⚡ 핵심 정리</h2>
                <div className="mb-4 overflow-x-auto">
                  <table className="w-full text-sm" data-speakable>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th className="px-3 py-2 text-left">항목</th>
                        <th className="px-3 py-2 text-left">단순경비율</th>
                        <th className="px-3 py-2 text-left">기준경비율</th>
                        <th className="px-3 py-2 text-left">간편장부</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="px-3 py-2 font-semibold">세율</td>
                        <td className="px-3 py-2">고정 6~80% (업종별)</td>
                        <td className="px-3 py-2">주요경비 + 추가 6~50%</td>
                        <td className="px-3 py-2">실경비 100%</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="px-3 py-2 font-semibold">장부 의무</td>
                        <td className="px-3 py-2">없음 (권장)</td>
                        <td className="px-3 py-2">권장</td>
                        <td className="px-3 py-2">필수 (7,500만 이상)</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="px-3 py-2 font-semibold">적용 기준</td>
                        <td className="px-3 py-2">매출 기준 (도소매 6,000만↓)</td>
                        <td className="px-3 py-2">선택지 (모든 매출)</td>
                        <td className="px-3 py-2">선택지 (실경비 입증 필요)</td>
                      </tr>
                      <tr>
                        <td className="px-3 py-2 font-semibold">적합 상황</td>
                        <td className="px-3 py-2">{'경비율 < 실경비율'}</td>
                        <td className="px-3 py-2">균형</td>
                        <td className="px-3 py-2">{'경비율 > 실경비율'}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="rounded-lg bg-primary-500/10 p-4 text-sm text-primary-700 dark:text-primary-300">
                  <p className="font-semibold">TL;DR</p>
                  <ul className="mt-2 list-inside list-disc space-y-1">
                    <li>
                      <strong>실경비 ≤ 단순경비율:</strong> 단순경비율 선택 (더 많은 경비 인정)
                    </li>
                    <li>
                      <strong>{'실경비 > 단순경비율:'}</strong> 기준경비율 선택 (추가경비로 실경비 반영)
                    </li>
                    <li>
                      <strong>매출 7,500만 이상:</strong> 장부 비치 의무 → 실경비 입증 중요
                    </li>
                  </ul>
                </div>
              </section>

              {/* 1. 단순경비율 vs 기준경비율 정의 */}
              <section className="space-y-4">
                <h2 className="text-2xl font-bold">1. 단순경비율 vs 기준경비율 — 기본 개념</h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  두 경비율의 본질적 차이는 "경비 인정 방식"입니다(소득세법 §79, 시행령 §143~§145). 단순경비율은 국세청이
                  정한 고정 비율을 적용하는 간편 방식입니다. 기준경비율은 주요경비(임차료·급여 등)를 먼저 차감한 후, 추가로
                  국세청 기준경비율을 적용합니다.
                </p>

                <div className="rounded-lg bg-bg-card p-4">
                  <p className="mb-3 font-semibold text-text-primary">소득금액 계산 공식 비교</p>
                  <div className="space-y-3 text-sm text-text-secondary">
                    <div>
                      <p className="font-semibold text-text-primary mb-1">단순경비율</p>
                      <p className="italic text-text-tertiary">
                        소득금액 = 매출액 × (1 − 단순경비율%)
                      </p>
                      <p className="text-xs mt-1">예: 매출 1억 × (100% − 70%) = 3,000만 원</p>
                    </div>
                    <hr className="border-border-base" />
                    <div>
                      <p className="font-semibold text-text-primary mb-1">기준경비율</p>
                      <p className="italic text-text-tertiary">
                        소득금액 = (매출액 − 주요경비) × (1 − 기준경비율%) 또는 (매출액 − 주요경비 − 추가경비)
                      </p>
                      <p className="text-xs mt-1">
                        예: (1억 − 임차료 1,500만) × (100% − 70%) = 약 2,550만 원 (또는 추가경비로 더 차감 가능)
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border-l-4 border-l-primary-500 bg-primary-500/5 p-4 text-sm text-text-secondary">
                  <p className="font-semibold text-text-primary">💡 핵심 차이</p>
                  <p className="mt-2">
                    단순은 "매출의 고정%만 경비"이고, 기준은 "입증된 주요경비 + 추가경비"입니다. 따라서 실제 경비가 단순경비율보다
                    크면 기준이 더 유리합니다.
                  </p>
                </div>
              </section>

              {/* 2. 업종별 단순경비율 기준점 */}
              <section className="space-y-4">
                <h2 className="text-2xl font-bold">2. 업종별 단순경비율 기준점 (소득세법 시행령 §143)</h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  매출 규모가 일정 기준 이하인 경우 단순경비율을 "의무적으로 적용"받습니다. 기준을 초과하면 단순경비율 선택이
                  가능하지만, 기준경비율도 선택할 수 있습니다. 본인의 업종과 매출을 먼저 확인하세요.
                </p>

                <div className="overflow-x-auto rounded-lg">
                  <table className="w-full text-sm border-collapse">
                    <thead>
                      <tr className="border-b border-border-base bg-primary-500/10">
                        <th className="px-3 py-2 text-left text-text-primary">업종</th>
                        <th className="px-3 py-2 text-left text-text-primary">단순경비율 기준점</th>
                        <th className="px-3 py-2 text-right text-text-primary">단순경비율 %</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="px-3 py-2 font-semibold">도소매업</td>
                        <td className="px-3 py-2">6,000만 원</td>
                        <td className="px-3 py-2 text-right">20~30%</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="px-3 py-2 font-semibold">음식점</td>
                        <td className="px-3 py-2">1억 5,000만 원</td>
                        <td className="px-3 py-2 text-right">40~50%</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="px-3 py-2 font-semibold">서비스업 (강사·컨설턴트)</td>
                        <td className="px-3 py-2">2,400만 원</td>
                        <td className="px-3 py-2 text-right">60~80%</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="px-3 py-2 font-semibold">제조·건설</td>
                        <td className="px-3 py-2">4,800만 원</td>
                        <td className="px-3 py-2 text-right">35~50%</td>
                      </tr>
                      <tr>
                        <td className="px-3 py-2 font-semibold">의료·법률</td>
                        <td className="px-3 py-2">1억 원</td>
                        <td className="px-3 py-2 text-right">70~80%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="rounded-lg bg-bg-card p-4 text-sm text-text-secondary">
                  <p className="font-semibold text-text-primary mb-2">⚠️ 주의: 기준점은 매출 한계선</p>
                  <p>
                    기준점 이하 (예: 도소매 6,000만 이하)면 단순경비율 의무. 초과 (6,000만 초과)면 "선택지" 생김 — 단순 OR
                    기준경비율. 초과했다고 자동으로 기준경비율이 아니라, 신고 시 본인이 선택합니다.
                  </p>
                </div>
              </section>

              {/* 3. 실경비 비교로 선택 */}
              <section className="space-y-4">
                <h2 className="text-2xl font-bold">3. 어느 경비율이 더 유리? — 실경비와 비교</h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  경비율 선택의 핵심은 "실제 경비액"입니다. 사무실 임차료·장비 구매·통신비·교통비·교육비 등 사업에 쓴
                  실제 금액이 중요합니다.
                </p>

                <div className="space-y-3 rounded-lg bg-bg-raised p-4">
                  <p className="font-semibold text-text-primary">실제 계산 사례</p>
                  <div className="space-y-2 text-sm text-text-secondary">
                    <div className="mb-3 rounded-lg bg-bg-card p-3">
                      <p className="font-semibold text-text-primary">사례 1: 강사 매출 3,000만 (서비스업, 단순경비율 기준점 2,400만 초과)</p>
                      <ul className="mt-2 list-inside list-disc space-y-1">
                        <li>실제 경비 (사무실 임차료 500만 + 통신비 60만 + 교재료 200만) = 760만 원</li>
                        <li>실경비율 = 760만 / 3,000만 = 25.3%</li>
                        <li className="font-semibold text-text-primary mt-2">단순경비율 70% 선택:</li>
                        <li className="ml-4">소득금액 = 3,000만 × (100% − 70%) = 900만 원</li>
                        <li className="font-semibold text-text-primary mt-2">기준경비율 70% 선택:</li>
                        <li className="ml-4">
                          소득금액 = (3,000만 − 임차료 500만) × (100% − 70%) = 약 750만 원 (더 유리)
                        </li>
                        <li className="text-xs italic text-text-tertiary mt-2">
                          🎯 결론: 실경비 25% &lt; 단순경비율 70% → 단순경비율이 더 많은 경비 인정 → 단순 유리
                        </li>
                      </ul>
                    </div>

                    <div className="rounded-lg bg-bg-card p-3">
                      <p className="font-semibold text-text-primary">사례 2: 1인 도소매 매출 8,000만 (기준점 6,000만 초과)</p>
                      <ul className="mt-2 list-inside list-disc space-y-1">
                        <li>실제 경비 (사무실 1,000만 + 종업원급여 1,500만 + 창고료 300만 + 기타 700만) = 3,500만 원</li>
                        <li>실경비율 = 3,500만 / 8,000만 = 43.75%</li>
                        <li className="font-semibold text-text-primary mt-2">단순경비율 25% 선택:</li>
                        <li className="ml-4">소득금액 = 8,000만 × (100% − 25%) = 6,000만 원</li>
                        <li className="font-semibold text-text-primary mt-2">기준경비율 선택:</li>
                        <li className="ml-4">
                          소득금액 = 8,000만 − 급여 1,500만 − 추가경비 etc. ≈ 약 4,800만 원 (더 유리)
                        </li>
                        <li className="text-xs italic text-text-tertiary mt-2">
                          🎯 결론: 실경비 43.75% &gt; 단순경비율 25% → 기준경비율로 더 많은 경비 인정 → 기준 유리
                        </li>
                      </ul>
                    </div>

                    <div className="rounded-lg bg-bg-card p-3">
                      <p className="font-semibold text-text-primary">사례 3: 프리랜서 매출 5,000만 (실경비 2,000만 = 40%)</p>
                      <ul className="mt-2 list-inside list-disc space-y-1">
                        <li>실경비율 = 2,000만 / 5,000만 = 40%</li>
                        <li className="font-semibold text-text-primary mt-2">단순경비율 70% 선택:</li>
                        <li className="ml-4">소득금액 = 5,000만 × 30% = 1,500만 원</li>
                        <li className="font-semibold text-text-primary mt-2">기준경비율 70% 선택:</li>
                        <li className="ml-4">소득금액 = (5,000만 − 2,000만) × (100% − 70%) + 기타경비 ≈ 1,100만 원</li>
                        <li className="text-xs italic text-text-tertiary mt-2">
                          🎯 결론: 실경비 40% ≈ 단순경비율 70% 기준 → 거의 동등. 단순이 간편하므로 단순 선택 권장
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border-l-4 border-l-highlight-500 bg-highlight-500/5 p-4 text-sm text-text-secondary">
                  <p className="font-semibold text-text-primary">💡 선택 판단 기준</p>
                  <p className="mt-2">
                    <strong>실경비 &lt; 단순경비율</strong> → 단순 선택 (경비를 더 많이 인정받음)
                    <br />
                    <strong>실경비 &gt; 단순경비율</strong> → 기준 선택 (실경비를 더 정확히 반영)
                    <br />
                    <strong>확실하지 않다면</strong> → 단순경비율 선택 (간편, 장부 의무 없음)
                  </p>
                </div>
              </section>

              <AdSlot slot="guide-freelancer-expense-rate-mid" format="rectangle" />

              {/* 4. 추계신고 vs 장부신고 의무 */}
              <section className="space-y-4">
                <h2 className="text-2xl font-bold">4. 추계신고 vs 장부신고 — 매출 규모와 의무</h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  경비율 선택만이 아니라, 신고 형식도 중요합니다(소득세법 §80~§81). 매출 규모에 따라 장부 비치 의무가 달라집니다.
                </p>

                <div className="overflow-x-auto rounded-lg">
                  <table className="w-full text-sm border-collapse">
                    <thead>
                      <tr className="border-b border-border-base bg-primary-500/10">
                        <th className="px-3 py-2 text-left text-text-primary">매출 규모</th>
                        <th className="px-3 py-2 text-left text-text-primary">장부 의무</th>
                        <th className="px-3 py-2 text-left text-text-primary">신고 형식</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="px-3 py-2">7,500만 미만</td>
                        <td className="px-3 py-2">선택 (권장)</td>
                        <td className="px-3 py-2">추계·장부 둘 다 가능</td>
                      </tr>
                      <tr>
                        <td className="px-3 py-2 font-semibold">7,500만 이상</td>
                        <td className="px-3 py-2 font-semibold">의무 (간편 이상)</td>
                        <td className="px-3 py-2 font-semibold">장부신고 필수</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="rounded-lg bg-bg-card p-4 text-sm text-text-secondary">
                  <p className="font-semibold text-text-primary mb-2">추계신고 (소득세법 §80)</p>
                  <p className="mb-3">
                    국세청이 일방 통지 → 경비율 이의 불가 → "실경비 증명" 불가능 → 재조사 위험. 예: 매출 2,000만 신고 안
                    하면 국세청이 일반적 경비율로 추정소득 계산 후 세금 부과.
                  </p>

                  <p className="font-semibold text-text-primary mb-2">장부신고 (소득세법 §81)</p>
                  <p>
                    본인 제출 장부 기반 → "경비 입증 가능" → 실경비 인정 → 이의 제기 가능. 매출 1억 이상이면 복식부기 권장.
                  </p>
                </div>
              </section>

              {/* 5. 함정: 세무조사 시 경비 인정 안 될 위험 */}
              <section className="space-y-4">
                <h2 className="text-2xl font-bold">5. 함정: 경비 입증 실패 시 실질과세 원칙 적용 (국세기본법 §14)</h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  단순경비율을 선택했어도, 세무조사 시 "실제 경비"를 묻습니다. 경비 입증이 안 되면 가산세 20~40%가 붙습니다.
                </p>

                <div className="rounded-lg border-l-4 border-l-danger-500 bg-danger-500/10 p-4">
                  <p className="font-semibold text-danger-700 dark:text-danger-300 mb-3">세무조사 함정 5가지</p>
                  <ul className="text-sm text-danger-600 dark:text-danger-400 list-inside list-disc space-y-1">
                    <li>경비 입증 자료 (영수증·통장 기록) 없음 → 경비 인정 안 됨 → 추정소득 재계산</li>
                    <li>개인 경비와 사업 경비 구분 안 됨 → "생활비" 판단 → 경비 불인정</li>
                    <li>장부 없이 단순경비율만 주장 → 조사관이 추정소득 상향 → 가산세</li>
                    <li>
                      현금 거래 기록 (카드 수수료 회피) → 실거래 입증 곤란 → 국세기본법 §14 실질과세 원칙 적용
                    </li>
                    <li>국세청 발표 기준경비율 초과 주장 → "특수 경우" 입증 필요 → 부담 증거</li>
                  </ul>
                </div>

                <div className="rounded-lg bg-bg-raised p-4 text-sm text-text-secondary">
                  <p className="font-semibold text-text-primary mb-2">🚨 조사 대응법</p>
                  <ul className="list-inside list-disc space-y-1">
                    <li>단순경비율 선택해도 거래기록(카드 내역·통장) 보존 (5년)</li>
                    <li>
                      대액 경비(임차료 500만 이상)는 영수증·계약서 첨부 (당일 신고시 첨부, 추후 조사시 "당시 제출" 입증)
                    </li>
                    <li>간편장부 최소한이라도 작성 (매월 매출·주요경비 기록)</li>
                    <li>조사 통지 시 세무사 상담 (경비 추가 인정 협상 가능)</li>
                  </ul>
                </div>
              </section>

              {/* 6. 신고 전 체크리스트 */}
              <section className="space-y-4">
                <h2 className="text-2xl font-bold">6. 5월 31일 신고 전 체크리스트</h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  신고 2~3일 전에 다음을 확인하고 경비율을 최종 결정하세요.
                </p>

                <div className="space-y-2 rounded-lg bg-bg-card p-4 text-sm">
                  <div className="flex items-start gap-2">
                    <input type="checkbox" id="check1" className="mt-1" />
                    <label htmlFor="check1" className="text-text-secondary">
                      <strong>업종 확인</strong> — 본인 업종의 단순경비율 기준점 확인 (도소매 6,000만 / 강사
                      2,400만 등)
                    </label>
                  </div>
                  <div className="flex items-start gap-2">
                    <input type="checkbox" id="check2" className="mt-1" />
                    <label htmlFor="check2" className="text-text-secondary">
                      <strong>매출 집계</strong> — 올해 예상 매출액 재확인 (기준점 초과 여부)
                    </label>
                  </div>
                  <div className="flex items-start gap-2">
                    <input type="checkbox" id="check3" className="mt-1" />
                    <label htmlFor="check3" className="text-text-secondary">
                      <strong>실경비 추정</strong> — 사무실 임차료, 용역비, 통신비, 교육비 합계
                    </label>
                  </div>
                  <div className="flex items-start gap-2">
                    <input type="checkbox" id="check4" className="mt-1" />
                    <label htmlFor="check4" className="text-text-secondary">
                      <strong>경비율 선택</strong> — (실경비 &lt; 단순%) → 단순 / (실경비 &gt; 단순%) → 기준
                    </label>
                  </div>
                  <div className="flex items-start gap-2">
                    <input type="checkbox" id="check5" className="mt-1" />
                    <label htmlFor="check5" className="text-text-secondary">
                      <strong>계산기 활용</strong> —{' '}
                      <Link href="/calculator/freelancer-tax/" className="text-primary-600 underline">
                        프리랜서 종합소득세 계산기
                      </Link>
                      에서 세액 미리 계산
                    </label>
                  </div>
                  <div className="flex items-start gap-2">
                    <input type="checkbox" id="check6" className="mt-1" />
                    <label htmlFor="check6" className="text-text-secondary">
                      <strong>공제 빠짐 확인</strong> — 부양가족, 신용카드, 의료비, 교육비 등
                    </label>
                  </div>
                </div>
              </section>

              <FaqSection items={[...FAQ_ITEMS]} />

              {/* 주의사항 */}
              <section className="card border-l-4 border-l-danger-500 bg-danger-500/5">
                <h2 className="mb-3 text-lg font-semibold text-danger-700 dark:text-danger-300">⚠️ 최종 주의사항</h2>
                <ul className="space-y-2 text-sm text-danger-700 dark:text-danger-300">
                  <li>
                    • <strong>5월 31일(금)</strong> 신고 기한. 주말이므로 다음 영업일 <strong>6월 2일(월)</strong> 자동 연장
                  </li>
                  <li>
                    • 경비율은 신고 시 선택 — 나중에 변경 불가능. 신고 전 충분히 검토
                  </li>
                  <li>
                    • 단순경비율 선택해도 거래기록(카드·통장) 5년 보존 필수 (세무조사 대비)
                  </li>
                  <li>
                    • 매출 7,500만 이상은 간편장부 이상 비치 의무 — 이만원 단위로 기록
                  </li>
                  <li>
                    • 환급 대상이면 신고하지 않으면 영구 상실 (5년 법정기한 후 청구 불가)
                  </li>
                  <li>
                    • 복잡하면 세무사 상담 (수수료 10~50만 vs 가산세 절감 효과)
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
                    {' '}— 경비율별 세액 즉시 계산
                  </li>
                  <li>
                    →{' '}
                    <Link href="/guide/income-tax-late-filing-penalty-2026/" className="text-primary-600 underline dark:text-primary-500">
                      종합소득세 무신고·지연 가산세 2026 정확 계산
                    </Link>
                    {' '}— 마감 임박 시 자진신고 감면
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
                    <Link href="/guide/freelancer-salary-comparison/" className="text-primary-600 underline dark:text-primary-500">
                      프리랜서 vs 일반직 실수령액 비교
                    </Link>
                    {' '}— 4대보험·세금 차이
                  </li>
                  <li>
                    →{' '}
                    <Link href="/calculator/salary/" className="text-primary-600 underline dark:text-primary-500">
                      연봉 실수령액 계산기
                    </Link>
                    {' '}— N잡러 합산 세액
                  </li>
                </ul>
              </section>

              <ShareButtons
                title="프리랜서 단순경비율 vs 기준경비율 2026 선택 기준"
                url={URL}
                description="5월 31일까지 10일! 경비율 선택으로 50만~200만 원 차이. 실경비별 비교·업종별 기준점·3가지 시뮬 완벽 정리."
              />

              {/* 출처 및 면책 */}
              <section
                aria-label="출처 및 면책"
                className="rounded-lg border border-border-base p-4 text-caption text-text-tertiary"
              >
                <p className="mb-2">
                  <strong>법적 근거</strong>: 소득세법 §79~§81 (추계·장부신고) · 시행령 §143~§145 (단순·기준경비율) ·
                  §209 (장부 비치 의무) · 국세기본법 §14 (실질과세 원칙). 참고:{' '}
                  <a
                    href="https://www.hometax.go.kr/guide/0202000000.jsp"
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
                  <strong>면책 조항</strong>: 본 가이드는 정보 제공 목적이며 세무·법적 조언이 아닙니다. 개별 상황에 따라
                  세무상 결과가 달라질 수 있으며, 실제 신고 전 세무사 또는 국세청 상담을 받으시기 바랍니다.
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
