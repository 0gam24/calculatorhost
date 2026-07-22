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

const URL = 'https://calculatorhost.com/guide/unemployment-benefit-2026/';
const DATE_PUBLISHED = '2026-06-07';
const DATE_MODIFIED = '2026-06-07';

export const metadata: Metadata = {
  title: '실업급여 2026 — 상한 68,100원·하한 66,048원, 조건·금액·신청',
  description:
    '2026년 실업급여(구직급여) 1일 상한액 68,100원·하한액 66,048원으로 인상. 수급조건(피보험단위기간 180일·비자발적 이직), 소정급여일수 120~270일, 지급액 계산(평균임금 60%), 신청 방법까지 한 번에 정리했습니다.',
  keywords: [
    '실업급여',
    '실업급여 조건',
    '실업급여 2026',
    '실업급여 상한액',
    '실업급여 하한액',
    '실업급여 계산',
    '구직급여',
    '실업급여 신청방법',
    '소정급여일수',
    '고용보험법 46조',
  ],
  alternates: { canonical: URL },
  openGraph: {
    title: '실업급여 2026 — 상한 68,100원·하한 66,048원, 조건·금액·신청방법',
    description:
      '2026년 실업급여 상한 68,100원·하한 66,048원. 수급조건·소정급여일수(120~270일)·지급액 계산·신청 방법 정리.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '실업급여 2026 — 상한 68,100원·하한 66,048원, 조건·금액·신청' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: '실업급여 2026 — 상한 68,100원·하한 66,048원',
    description: '수급조건·소정급여일수·지급액 계산·신청 방법 완정리.',
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '실업급여 2026 — 상한 68,100원·하한 66,048원, 조건·금액·신청' }],
  },
};

const FAQ_ITEMS = [
  {
    question: '자진퇴사해도 실업급여를 받을 수 있나요?',
    answer:
      '원칙적으로는 받을 수 없지만, 정당한 사유가 인정되면 가능합니다. 2개월 이상 임금 체불, 질병·부상으로 업무 수행이 어려운 경우, 통근 시간 왕복 3시간 이상, 회사의 위법·부당 처우, 계약기간 만료 등은 자진퇴사라도 수급 자격이 인정됩니다. 단순 이직·창업·개인 사정에 의한 자발적 퇴사는 원칙적으로 제외됩니다.',
  },
  {
    question: '2026년 실업급여는 하루에 얼마인가요?',
    answer:
      '1일 상한액은 68,100원, 하한액은 66,048원입니다. 실제 지급액은 퇴직 전 3개월 평균임금의 60%로 계산하되, 이 금액이 하한액보다 낮으면 66,048원을, 상한액보다 높으면 68,100원을 적용합니다. 2026년에는 상·하한 차이가 2,052원에 불과해 대부분 둘 중 하나가 적용됩니다.',
  },
  {
    question: '실업급여는 며칠 동안 받을 수 있나요?',
    answer:
      '퇴직 당시 만 나이와 고용보험 가입기간에 따라 120일에서 270일까지입니다. 50세 미만은 가입기간 1년 미만 120일부터 10년 이상 240일까지, 50세 이상과 장애인은 1년 미만 120일부터 10년 이상 270일까지 받습니다. 가입기간이 길고 나이가 많을수록 길어집니다.',
  },
  {
    question: '실업급여 신청은 어디서 하나요?',
    answer:
      '거주지 관할 고용센터에 실업을 신고하고 수급자격을 신청합니다. 먼저 워크넷(work.go.kr)에서 구직 등록을 하고, 고용보험 누리집의 온라인 교육을 들은 뒤 고용센터를 방문하면 됩니다. 퇴직 후 지체 없이 신청하는 것이 좋습니다. 수급기간이 이직일 다음 날부터 12개월로 제한되기 때문입니다.',
  },
  {
    question: '계약직인데 계약 만료로 퇴사하면 받을 수 있나요?',
    answer:
      '받을 수 있습니다. 계약기간 만료는 비자발적 이직으로 보아 수급 자격이 인정됩니다. 다만 회사가 재계약을 제안했는데 본인이 거부한 경우에는 자발적 이직으로 처리되어 제외될 수 있습니다. 피보험단위기간 180일 요건은 동일하게 충족해야 합니다.',
  },
  {
    question: '실업급여를 받으면서 아르바이트를 할 수 있나요?',
    answer:
      '가능하지만 반드시 신고해야 합니다. 실업인정일에 근로 사실과 소득을 신고하지 않고 일하면 부정수급에 해당해 받은 금액 반환은 물론 추가 징수와 형사처벌까지 받을 수 있습니다. 소액 단기 근로라도 일한 날은 실업 상태로 인정되지 않아 그날의 구직급여는 지급되지 않습니다.',
  },
  {
    question: '소정급여일수를 다 못 받고 재취업하면 손해인가요?',
    answer:
      '오히려 조기재취업수당으로 보상받을 수 있습니다. 소정급여일수를 2분의 1 이상 남기고 재취업해 12개월 이상 근무하면 남은 구직급여의 50%를 일시금으로 지급합니다. 빨리 취업하는 것이 금전적으로도 유리하게 설계되어 있습니다.',
  },
] as const;

export default function UnemploymentBenefit2026() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '실업급여 2026 — 조건·금액·신청방법' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '실업급여 2026 — 상한 68,100원·하한 66,048원, 조건·금액·신청방법',
    description:
      '2026년 실업급여(구직급여) 1일 상한액 68,100원·하한액 66,048원으로 인상. 수급조건, 소정급여일수 120~270일, 지급액 계산(평균임금 60%), 신청 방법을 정리했습니다.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['실업급여', '구직급여', '실업급여 상한액', '소정급여일수', '실업급여 계산'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '실업급여 2026 — 수급조건·지급액·신청 방법',
    description:
      '2026년 실업급여 상한 68,100원·하한 66,048원. 수급조건(180일·비자발), 소정급여일수 120~270일, 지급액 계산, 신청 절차.',
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
                    { name: '실업급여 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">근로 · 9분 읽기 · 2026-06-07</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  실업급여 2026
                  <br />
                  <span className="text-2xl text-text-secondary">— 상한 68,100원·하한 66,048원, 조건·금액·신청방법</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  실업급여(구직급여)는 고용보험에 가입한 근로자가 비자발적으로 일자리를 잃었을 때, 재취업을 준비하는 동안 생활을 지원하는 급여입니다.
                  2026년에는 1일 상한액이 <strong>68,100원</strong>으로 7년 만에 올랐고, 하한액도 최저임금 인상에 따라 <strong>66,048원</strong>이 되었습니다.
                  수급조건, 받는 기간(소정급여일수), 지급액 계산, 신청 방법을 정확히 정리했습니다.
                </p>
              </header>

              <AdSlot slot="guide-unemployment-benefit-top" format="horizontal" />

              <section aria-label="핵심 요약" className="card border-l-4 border-l-primary-500">
                <h2 className="mb-2 text-caption uppercase tracking-wider text-primary-500">핵심 요약</h2>
                <div className="space-y-3 text-sm" data-speakable>
                  <table className="w-full border-collapse text-sm">
                    <caption className="mb-2 font-semibold text-text-primary">2026년 실업급여(구직급여) 주요 정보</caption>
                    <thead>
                      <tr className="bg-primary-500/10">
                        <th scope="col" className="border border-border-base px-2 py-2 text-left">항목</th>
                        <th scope="col" className="border border-border-base px-2 py-2 text-left">내용</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-border-base px-2 py-1 font-semibold">제도명</td>
                        <td className="border border-border-base px-2 py-1">고용보험 구직급여 (실업급여)</td>
                      </tr>
                      <tr>
                        <td className="border border-border-base px-2 py-1 font-semibold">관할</td>
                        <td className="border border-border-base px-2 py-1">고용노동부 · 관할 고용센터</td>
                      </tr>
                      <tr className="bg-primary-500/5">
                        <td className="border border-border-base px-2 py-1 font-semibold">2026 1일 상한액</td>
                        <td className="border border-border-base px-2 py-1 font-bold text-primary-600 dark:text-primary-400">
                          68,100원 (2025년 66,000원 → +2,100원)
                        </td>
                      </tr>
                      <tr className="bg-primary-500/5">
                        <td className="border border-border-base px-2 py-1 font-semibold">2026 1일 하한액</td>
                        <td className="border border-border-base px-2 py-1 font-bold text-primary-600 dark:text-primary-400">
                          66,048원 (최저임금일액 82,560원 × 80%)
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-border-base px-2 py-1 font-semibold">지급액</td>
                        <td className="border border-border-base px-2 py-1">평균임금의 60% (상·하한 적용)</td>
                      </tr>
                      <tr>
                        <td className="border border-border-base px-2 py-1 font-semibold">소정급여일수</td>
                        <td className="border border-border-base px-2 py-1">120~270일 (연령·가입기간별)</td>
                      </tr>
                      <tr>
                        <td className="border border-border-base px-2 py-1 font-semibold">수급요건</td>
                        <td className="border border-border-base px-2 py-1">이직 전 18개월간 피보험단위기간 180일 이상 + 비자발적 이직</td>
                      </tr>
                      <tr>
                        <td className="border border-border-base px-2 py-1 font-semibold">수급기간</td>
                        <td className="border border-border-base px-2 py-1">이직일 다음 날부터 12개월 이내</td>
                      </tr>
                      <tr>
                        <td className="border border-border-base px-2 py-1 font-semibold">법적 근거</td>
                        <td className="border border-border-base px-2 py-1">고용보험법 §40·§45·§46·§48·§50</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">1. 실업급여란? — 누가 받을 수 있나</h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  실업급여의 핵심은 구직급여이며, 고용보험 가입 근로자가 본인의 의사와 무관하게 직장을 잃었을 때 지급됩니다.
                  고용보험법 §40에 따른 수급요건은 네 가지를 모두 충족해야 합니다.
                  ① 이직일 이전 18개월간 피보험단위기간이 통산 180일 이상일 것, ② 근로의 의사와 능력이 있는데도 취업하지 못한 상태일 것,
                  ③ 비자발적 이직(또는 정당한 사유의 자진퇴사)일 것, ④ 적극적으로 재취업 활동을 할 것입니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <h3 className="font-semibold text-text-primary mb-2">피보험단위기간 180일이란?</h3>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    단순히 재직한 날이 아니라 <strong>보수가 지급된 날</strong>을 합산합니다(고용보험법 §41).
                    주 5일제라면 무급휴일(보통 일요일)이 제외되므로, 통상 약 7~8개월 이상 근무해야 180일을 채웁니다.
                    이직 전 18개월(초단시간 근로자는 24개월) 안의 기간만 인정됩니다.
                  </p>
                </div>
                <div className="rounded-lg border-l-2 border-l-danger-500 bg-danger-500/5 p-4">
                  <p className="text-sm text-danger-700 dark:text-danger-300">
                    <strong>다만</strong>, 65세 이후에 새로 고용된 사람과 주 15시간(월 60시간) 미만 초단시간 근로자(3개월 이상 계속 근로 시 제외)는 구직급여 적용에서 빠질 수 있습니다.
                    본인이 고용보험 피보험자인지 먼저 확인하세요.
                  </p>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">2. 2026년 실업급여는 얼마? — 상한 68,100원·하한 66,048원</h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  2026년 1일 구직급여 상한액은 68,100원, 하한액은 66,048원입니다.
                  하한액은 최저임금과 연동되는데(고용보험법 §46②), 2026년 최저시급 10,320원 기준 최저임금일액은 82,560원(10,320원 × 8시간)이고 그 80%인 66,048원이 하한이 됩니다.
                  하한액이 기존 상한액(66,000원)을 넘어서는 역전을 막기 위해 상한액도 7년 만에 68,100원으로 올랐습니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-3 font-semibold text-text-primary">실업급여 1일 상·하한액 비교 (2025년 vs 2026년)</caption>
                    <thead>
                      <tr className="bg-primary-500/10 border border-border-base">
                        <th scope="col" className="px-3 py-2 text-left">구분</th>
                        <th scope="col" className="px-3 py-2 text-left">2025년</th>
                        <th scope="col" className="px-3 py-2 text-left">2026년</th>
                      </tr>
                    </thead>
                    <tbody className="text-text-secondary">
                      <tr className="border border-border-base">
                        <td className="px-3 py-2 font-semibold">1일 상한액</td>
                        <td className="px-3 py-2">66,000원</td>
                        <td className="px-3 py-2 font-bold text-primary-600 dark:text-primary-400">68,100원</td>
                      </tr>
                      <tr className="border border-border-base">
                        <td className="px-3 py-2 font-semibold">1일 하한액</td>
                        <td className="px-3 py-2">64,192원</td>
                        <td className="px-3 py-2 font-bold text-primary-600 dark:text-primary-400">66,048원</td>
                      </tr>
                      <tr className="border border-border-base bg-primary-500/5">
                        <td className="px-3 py-2 font-semibold">월 환산 (30일)</td>
                        <td className="px-3 py-2">약 192.6만~198.0만원</td>
                        <td className="px-3 py-2 font-bold text-primary-600 dark:text-primary-400">약 198.1만~204.3만원</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-raised p-4">
                  <p className="text-sm text-text-secondary">
                    <strong>2026년만의 특이점:</strong> 상한액과 하한액의 차이가 단 2,052원입니다.
                    구직급여일액은 평균임금의 60%인데, 이 값이 66,048원~68,100원 사이에 들어오려면 1일 평균임금이 약 110,080원~113,500원이어야 합니다.
                    그 범위를 벗어나면 대부분 하한액 또는 상한액이 적용됩니다. 즉 <strong>월급이 아주 적지 않은 한 대부분 상한액 68,100원</strong>을 받게 됩니다.
                  </p>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">3. 며칠 동안 받나? — 소정급여일수 120~270일</h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  실업급여를 받는 일수(소정급여일수)는 퇴직 당시 만 나이와 고용보험 가입기간에 따라 120일에서 270일 사이로 정해집니다(고용보험법 §50, 별표2).
                  가입기간이 길수록, 나이가 많을수록 더 오래 받습니다.
                  기준 나이는 이직일 당시 만 50세입니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-3 font-semibold text-text-primary">연령·가입기간별 소정급여일수 (고용보험법 별표2)</caption>
                    <thead>
                      <tr className="bg-primary-500/10 border border-border-base">
                        <th scope="col" className="px-3 py-2 text-left">가입기간</th>
                        <th scope="col" className="px-3 py-2 text-left">50세 미만</th>
                        <th scope="col" className="px-3 py-2 text-left">50세 이상·장애인</th>
                      </tr>
                    </thead>
                    <tbody className="text-text-secondary">
                      <tr className="border border-border-base">
                        <td className="px-3 py-2 font-semibold">1년 미만</td>
                        <td className="px-3 py-2">120일</td>
                        <td className="px-3 py-2">120일</td>
                      </tr>
                      <tr className="border border-border-base">
                        <td className="px-3 py-2 font-semibold">1년 이상 3년 미만</td>
                        <td className="px-3 py-2">150일</td>
                        <td className="px-3 py-2">180일</td>
                      </tr>
                      <tr className="border border-border-base">
                        <td className="px-3 py-2 font-semibold">3년 이상 5년 미만</td>
                        <td className="px-3 py-2">180일</td>
                        <td className="px-3 py-2">210일</td>
                      </tr>
                      <tr className="border border-border-base">
                        <td className="px-3 py-2 font-semibold">5년 이상 10년 미만</td>
                        <td className="px-3 py-2">210일</td>
                        <td className="px-3 py-2">240일</td>
                      </tr>
                      <tr className="border border-border-base bg-primary-500/5">
                        <td className="px-3 py-2 font-semibold">10년 이상</td>
                        <td className="px-3 py-2 font-bold text-primary-600 dark:text-primary-400">240일</td>
                        <td className="px-3 py-2 font-bold text-primary-600 dark:text-primary-400">270일</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="rounded-lg border-l-2 border-l-danger-500 bg-danger-500/5 p-4">
                  <p className="text-sm text-danger-700 dark:text-danger-300">
                    <strong>주의:</strong> 소정급여일수가 남아 있어도 수급기간(이직일 다음 날부터 12개월)이 지나면 잔여 급여는 모두 소멸됩니다(고용보험법 §48).
                    퇴직 후 신청을 미루면 받을 수 있는 일수가 줄어들 수 있으니 곧바로 신청하세요.
                  </p>
                </div>
              </section>

              <AdSlot slot="guide-unemployment-benefit-mid" format="rectangle" />

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">4. 내 실업급여는 얼마일까? — 계산 방법과 예시</h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  계산 순서는 간단합니다. 먼저 퇴직 전 3개월 평균임금을 구하고, 그 60%를 1일 구직급여일액으로 잡습니다(고용보험법 §45·§46).
                  이 값이 하한액(66,048원)보다 낮으면 66,048원을, 상한액(68,100원)보다 높으면 68,100원을 적용합니다.
                  여기에 소정급여일수를 곱하면 총 수령액이 됩니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-4">
                  <div>
                    <h3 className="font-semibold text-text-primary mb-1">예시 1 — 저임금 근로자 (하한액 적용)</h3>
                    <p className="text-sm text-text-secondary leading-relaxed">
                      만 40세, 가입 2년, 1일 평균임금 9만원. 60%는 54,000원으로 하한액보다 낮으므로 <strong>66,048원</strong> 적용.
                      소정급여일수 150일 → 66,048원 × 150일 = <strong>약 990만원</strong>.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-text-primary mb-1">예시 2 — 중간 구간 (60% 그대로 적용)</h3>
                    <p className="text-sm text-text-secondary leading-relaxed">
                      만 45세, 가입 4년, 1일 평균임금 112,000원. 60%는 67,200원으로 상·하한 사이에 들어와 그대로 적용.
                      소정급여일수 180일 → 67,200원 × 180일 = <strong>약 1,210만원</strong>.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-text-primary mb-1">예시 3 — 고임금 근로자 (상한액 적용)</h3>
                    <p className="text-sm text-text-secondary leading-relaxed">
                      만 48세, 가입 6년, 1일 평균임금 20만원. 60%는 120,000원으로 상한액을 넘으므로 <strong>68,100원</strong> 적용.
                      소정급여일수 210일 → 68,100원 × 210일 = <strong>약 1,430만원</strong>.
                    </p>
                  </div>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-raised p-4">
                  <p className="text-sm text-text-secondary">
                    <strong>정확한 모의계산:</strong> 고용보험 누리집(고용24·work24.go.kr)의 &ldquo;실업급여 모의계산&rdquo;에서 평균임금·나이·가입기간을 넣으면 예상액을 확인할 수 있습니다.
                    퇴직 전 3개월 임금이 정확해야 하므로 급여명세서를 준비하세요.
                  </p>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">5. 신청 방법은? — 워크넷 구직등록부터 고용센터까지</h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  실업급여는 자동으로 나오지 않으며, 본인이 실업을 신고하고 수급자격을 인정받아야 합니다(고용보험법 §42·§43).
                  순서대로 진행하면 어렵지 않습니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <ol className="space-y-2 text-sm text-text-secondary">
                    <li>
                      <strong>1) 이직확인서 처리 확인</strong> — 퇴사한 회사가 고용센터에 이직확인서와 피보험자격 상실신고를 제출했는지 확인합니다.
                    </li>
                    <li>
                      <strong>2) 워크넷 구직 등록</strong> — work.go.kr에서 구직 신청을 합니다.
                    </li>
                    <li>
                      <strong>3) 수급자격 신청자 온라인 교육</strong> — 고용보험 누리집에서 온라인 교육을 수강합니다.
                    </li>
                    <li>
                      <strong>4) 고용센터 방문·수급자격 신청</strong> — 거주지 관할 고용센터를 방문해 수급자격 인정을 신청합니다.
                    </li>
                    <li>
                      <strong>5) 실업인정·구직급여 지급</strong> — 보통 1~4주 단위 실업인정일마다 재취업 활동을 신고하면 구직급여가 지급됩니다.
                    </li>
                  </ol>
                </div>
                <div className="rounded-lg border-l-2 border-l-danger-500 bg-danger-500/5 p-4">
                  <p className="text-sm text-danger-700 dark:text-danger-300">
                    <strong>다만,</strong> 수급기간이 이직일 다음 날부터 12개월이므로 퇴직 직후 곧바로 신청해야 합니다.
                    또 첫 실업인정 전 7일은 대기기간으로 구직급여가 지급되지 않습니다.
                  </p>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">6. 2026년 무엇이 바뀌었나? — 상하한 인상과 반복수급 감액</h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  2026년 가장 큰 변화는 상·하한액 인상입니다. 하한액이 최저임금 인상으로 66,048원이 되면서 상한액도 68,100원으로 올랐습니다.
                  반면 자격 요건은 더 엄격해지는 흐름입니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <h3 className="font-semibold text-text-primary mb-2">반복수급 감액에 유의</h3>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    단기간에 실업급여를 반복해서 받는 경우 구직급여가 단계적으로 감액됩니다.
                    5년 동안 받은 횟수가 많을수록 감액률이 커지는 구조로, 반복수급을 줄이려는 제도 개편이 이어지고 있습니다.
                    자세한 적용 여부와 감액률은 관할 고용센터에서 본인의 수급 이력을 기준으로 확인하세요.
                  </p>
                </div>
                <div className="rounded-lg border-l-2 border-l-danger-500 bg-danger-500/5 p-4">
                  <p className="text-sm text-danger-700 dark:text-danger-300">
                    <strong>주의: 부정수급은 금물:</strong> 취업·근로 사실을 숨기고 받으면 부정수급으로 분류되어 지급액 반환, 추가징수(최대 5배), 형사처벌 대상이 됩니다.
                    아르바이트·단기근로를 했다면 실업인정일에 반드시 신고하세요.
                  </p>
                </div>
              </section>

              <FaqSection items={[...FAQ_ITEMS]} />

              <section className="card">
                <h2 className="mb-3 text-lg font-semibold">관련 가이드</h2>
                <ul className="space-y-2 text-sm">
                  <li>
                    →{' '}
                    <Link href="/calculator/salary/" className="text-primary-600 underline dark:text-primary-500">
                      연봉 실수령액 계산기
                    </Link>
                    {' — 평균임금·세후 월급을 미리 확인하고 재취업 협상에 활용'}
                  </li>
                  <li>
                    →{' '}
                    <Link href="/guide/severance-vs-pension-dc-db/" className="text-primary-600 underline dark:text-primary-500">
                      퇴직금 DC·DB 비교
                    </Link>
                    {' — 퇴직 시 함께 챙겨야 할 퇴직급여 제도'}
                  </li>
                  <li>
                    →{' '}
                    <Link href="/guide/n-jobber-comprehensive-income-tax-2026/" className="text-primary-600 underline dark:text-primary-500">
                      N잡러 종합소득세 2026
                    </Link>
                    {' — 실업급여 수급 중 부업·아르바이트 소득 신고'}
                  </li>
                  <li>
                    →{' '}
                    <Link href="/guide/year-end-tax-settlement/" className="text-primary-600 underline dark:text-primary-500">
                      연말정산 가이드
                    </Link>
                    {' — 실업급여는 비과세, 재취업 후 연말정산 정리'}
                  </li>
                  <li>
                    →{' '}
                    <Link href="/guide/youth-future-savings-account-2026/" className="text-primary-600 underline dark:text-primary-500">
                      청년미래적금 2026
                    </Link>
                    {' — 재취업 후 목돈 마련, 정부기여금 6~12% 청년 적금'}
                  </li>
                  <li>
                    →{' '}
                    <Link href="/category/work/" className="text-primary-600 underline dark:text-primary-500">
                      근로 계산기·가이드
                    </Link>
                    {' — 연봉·퇴직금·실수령액 등 직장인 필수 도구'}
                  </li>
                </ul>
              </section>

              <ShareButtons
                title="실업급여 2026 — 상한 68,100원·하한 66,048원, 조건·금액·신청방법"
                url={URL}
                description="2026년 실업급여 상한 68,100원·하한 66,048원. 수급조건·소정급여일수(120~270일)·지급액 계산·신청 방법 정리."
              />

              <section
                aria-label="출처 및 면책"
                className="rounded-lg border border-border-base p-4 text-caption text-text-tertiary"
              >
                <p className="mb-2">
                  <strong>법적 근거</strong>: 고용보험법 §40(수급요건)·§41(피보험단위기간)·§42(실업의 신고)·§45(기초일액)·§46(구직급여일액·상하한)·§48(수급기간)·§50(소정급여일수, 별표2) ·{' '}
                  <a
                    href="https://www.moel.go.kr"
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="text-primary-600 underline dark:text-primary-500"
                  >
                    고용노동부 (moel.go.kr)
                  </a>{' '}
                  ·{' '}
                  <a
                    href="https://www.work24.go.kr"
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="text-primary-600 underline dark:text-primary-500"
                  >
                    고용24 (work24.go.kr)
                  </a>{' '}
                  ·{' '}
                  <a
                    href="https://www.easylaw.go.kr"
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="text-primary-600 underline dark:text-primary-500"
                  >
                    찾기쉬운 생활법령정보 (easylaw.go.kr)
                  </a>{' '}
                  .
                </p>
                <p className="mb-2">
                  <strong>면책조항</strong>: 본 가이드는 2026년 6월 7일 기준 공개된 고용보험법령과 고용노동부 공식 정보를 바탕으로 작성되었습니다.
                  실업급여 상·하한액, 소정급여일수, 수급요건은 법령 개정과 최저임금 변동에 따라 달라질 수 있습니다.
                  본인의 정확한 수급 자격과 예상 지급액은 고용24(work24.go.kr) 실업급여 모의계산 또는 관할 고용센터(국번 없이 1350)에서 확인하시기 바랍니다.
                  본 콘텐츠는 AI 보조 작성 후 운영자 검수를 거쳤습니다.
                </p>
                <p>
                  <strong>업데이트</strong>: {DATE_MODIFIED} · 작성·검수: 김준혁 (calculatorhost)
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
