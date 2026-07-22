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

const URL = 'https://calculatorhost.com/guide/annual-leave-allowance-2026/';
const DATE_PUBLISHED = '2026-06-19';
const DATE_MODIFIED = '2026-06-19';

export const metadata: Metadata = {
  title: '연차수당 계산법 2026 | 미사용 연차 1일 통상임금 계산 | calculatorhost',
  description:
    '연차수당 정확히 계산하는 법. 1일 통상임금 = 월 통상임금 ÷ 209 × 8. 퇴사 시 미사용 연차 수당 청구 방법, 법적 한도 25일, 근로기준법 §60 완벽 해설.',
  keywords: [
    '연차수당',
    '통상임금',
    '미사용 연차',
    '퇴사 연차수당',
    '209시간',
    '연차 계산',
    '근로기준법',
    '퇴직수당',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '연차수당 계산법 2026 | 미사용 연차 1일 통상임금 계산 | calculatorhost' }],
    title: '연차수당 계산법 2026 — 통상임금 ÷ 209 × 8',
    description: '퇴사 전에 꼭 알아야 할 연차수당 정확 계산. 법정 최대 25일, 근로기준법 §60으로 회사에 청구하는 방법.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
};

const FAQ_ITEMS = [
  {
    question: '연차수당이 뭔가요? 월급과 다른가요?',
    answer:
      '연차수당은 사용하지 않은 연차(유급휴가)를 돈으로 받는 것입니다. 근로기준법 §60⑤에 따라 회사는 미사용 연차에 대해 통상임금으로 수당을 지급해야 합니다. 통상임금은 월급이 아니라, 기본급 + 고정적 수당(직책급, 기술급 등)을 합한 금액입니다.',
  },
  {
    question: '통상임금이 뭔가요? 월급과 차이가 있나요?',
    answer:
      '통상임금은 근로의 대가로 정기적·고정적으로 지급되는 금액입니다. 기본급 + 직책급 + 기술급 = 통상임금. 상여금, 복리후생비, 1회성 보상금은 포함되지 않습니다. 연차수당·시간외 근무수당·휴일근무수당 계산 기준이 되므로 정확히 확인하는 게 중요합니다.',
  },
  {
    question: '월 통상임금 300만 원이면 연차수당 1일은 얼마인가요?',
    answer:
      '계산 공식: 월 통상임금 ÷ 209 × 8. 300만 원 ÷ 209 × 8 ≈ 114,832원입니다. 여기서 209는 주40시간 근무자의 월 소정근로시간(주휴 포함)이고, 8은 1일 근로시간입니다. 미사용 연차 5일이면 114,832 × 5 ≈ 574,160원이 됩니다.',
  },
  {
    question: '연차는 최대 몇 일까지 받을 수 있나요?',
    answer:
      '법정 최대는 25일입니다(근로기준법 §60④). 1~2년차는 15일, 3~4년차는 16일, … , 21년차 이상은 25일입니다. 매 2년마다 1일씩 가산되지만 25일을 초과할 수 없습니다. 회사가 자체 규정으로 더 많이 주기로 했다면 그 규정이 우선입니다.',
  },
  {
    question: '퇴사할 때 남은 연차는 모두 수당으로 받나요?',
    answer:
      '네, 근로기준법 §60⑤에 따라 미사용 연차는 퇴사 시 모두 연차수당으로 지급받아야 합니다. 단, 회사가 §61의 사용촉진 절차(휴가 사용 권고)를 이행했다면 이 의무가 면제될 수 있습니다만, 실제로는 대부분의 회사가 수당으로 지급합니다. 만약 미지급되면 한국노동청에 신고할 수 있습니다.',
  },
  {
    question: '연차가 매년 소멸되나요? 발생일로부터 언제까지 쓸 수 있나요?',
    answer:
      '근로기준법 §60⑦에 따라 연차는 발생일로부터 1년간 미사용 시 소멸됩니다. 예: 2025년 7월에 발생한 15일은 2026년 6월 30일까지만 사용 가능. 다만 회사가 사용을 촉진하는 방법으로 연차 사용을 강제하거나, 일부 소멸을 막을 수 있습니다(이 경우도 복잡하므로 회사 정책 확인 필수).',
  },
  {
    question: '상여금도 통상임금에 포함되나요?',
    answer:
      '아니요, 상여금은 통상임금에 포함되지 않습니다. 상여금은 정기적이지만 정해진 금액이 아니므로 "고정적"이 아닙니다. 따라서 연차수당·초과근무수당 계산에는 기본급 + 직책급 + 기술급 같은 고정 수당만 포함합니다.',
  },
  {
    question: '연차수당은 세금이 나가나요? 어떤 세금이 부과되나요?',
    answer:
      '네, 연차수당은 근로소득으로 간주되어 소득세·지방소득세·4대보험료가 공제됩니다. 퇴직금처럼 별도의 세제 혜택은 없습니다. 따라서 통상임금 300만 × 5일 = 150만 원이면, 실제로는 소득세 약 15~20만 원 + 4대보험료 약 10만 원이 공제되어 약 120~125만 원을 받게 됩니다.',
  },
];

export default function AnnualLeaveAllowancePage() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '연차수당 계산법' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '연차수당 계산법 2026 — 미사용 연차 1일 통상임금 ÷ 209 × 8',
    description:
      '퇴사 시 받아야 할 연차수당을 정확히 계산하는 법. 근로기준법 §60 기준 1일 통상임금 계산, 연차 발생 및 소멸 규칙, 회사에 청구하는 방법을 완벽 해설합니다.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['연차수당', '통상임금', '근로기준법', '미사용 연차', '퇴사수당'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '연차수당 계산법 2026 | 미사용 연차 통상임금 계산',
    description:
      '연차수당을 정확히 계산하고 퇴사 시 회사에 청구하는 방법. 209시간 기준, 통상임금 정의, 법정 최대 25일 규칙, 소멸 기한까지 근로기준법 §60 완벽 설명.',
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
                    { name: '연차수당 계산법' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">근로 · 8분 읽기 · 2026-06-19</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  연차수당 계산법 2026 — 미사용 연차 정확히 받기
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  퇴사하기 전에 가장 많이 받는 질문은 "남은 연차는 돈으로 받을 수 있나요?"입니다.
                  근로기준법 §60에 따르면 미사용 연차는 반드시 통상임금으로 수당을 받아야 합니다.
                  정확한 계산법과 회사에 청구하는 방법을 정리했습니다.
                </p>
              </header>

              <AdSlot slot="guide-annual-leave-top" format="horizontal" />

              <section aria-label="요약" className="card border-l-4 border-l-primary-500">
                <h2 className="mb-2 text-caption uppercase tracking-wider text-primary-500">연차수당 요약</h2>
                <div className="space-y-2 text-sm" data-speakable>
                  <table className="w-full border-collapse text-sm">
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="whitespace-nowrap py-2 pr-4 font-semibold">계산 공식</td>
                        <td className="py-2">월 통상임금 ÷ 209 × 8 × 미사용 연차 일수</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="whitespace-nowrap py-2 pr-4 font-semibold">예시</td>
                        <td className="py-2">월 300만 원 × 5일 = 약 574,160원</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="whitespace-nowrap py-2 pr-4 font-semibold">법적 근거</td>
                        <td className="py-2">근로기준법 §60④⑤ (최대 25일, 반드시 지급)</td>
                      </tr>
                      <tr>
                        <td className="whitespace-nowrap py-2 pr-4 font-semibold">세금</td>
                        <td className="py-2">소득세, 지방소득세, 4대보험료 공제</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">연차수당이란? 왜 받을 수 있나?</h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  근로기준법은 모든 직장인에게 연간 유급휴가(연차)를 보장합니다.
                  1년에 최소 15일(80% 이상 출근 기준)을 주어야 하고, 이를 사용하지 않으면 통상임금으로 수당을 지급해야 합니다.
                  연차수당은 "받지 못한 휴가의 보상"이므로, 퇴사 시 회사는 반드시 지급할 의무가 있습니다.
                </p>
                <p className="text-text-secondary leading-relaxed">
                  <strong>다만 주의할 점</strong>은 연차는 발생일로부터 1년간 미사용 시 소멸된다는 것입니다(§60⑦).
                  예를 들어 2025년 7월에 발생한 15일은 2026년 6월 30일까지만 사용 가능합니다.
                  그 이후에는 법적 보호를 받지 못합니다.
                  다만 회사가 사용촉진 절차(연차 사용 권고)를 명확히 이행했다면, 소멸된 연차에 대한 수당 청구 의무가 면제될 수도 있습니다.
                  실제로는 대부분의 회사가 수당으로 지급하므로, 퇴사 시 명확히 요청하세요.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">연차 발생 규칙 — 몇 일을 받을 수 있나?</h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  근로기준법 §60①②에 따르면 연차 발생 규칙은 다음과 같습니다.
                </p>
                <div className="space-y-3 text-sm">
                  <div className="border-l-4 border-l-primary-500 bg-card pl-4 py-3">
                    <p className="font-semibold">기본: 1년 이상 근무 + 80% 이상 출근</p>
                    <p className="text-text-secondary">1년 만근 시 15일 연차 발생</p>
                  </div>
                  <div className="border-l-4 border-l-primary-500 bg-card pl-4 py-3">
                    <p className="font-semibold">1년 미만 또는 80% 미만 출근</p>
                    <p className="text-text-secondary">1개월 개근마다 1일 연차 발생. 예: 6개월 개근 = 6일</p>
                  </div>
                  <div className="border-l-4 border-l-primary-500 bg-card pl-4 py-3">
                    <p className="font-semibold">3년 이상 계속근로</p>
                    <p className="text-text-secondary">최초 1년 초과 후 매 2년마다 1일 가산 (법정 최대 25일 한도)</p>
                  </div>
                </div>
                <p className="mt-3 text-sm text-text-tertiary">
                  <strong>예시:</strong> 2020년 7월 입사 → 2021년 7월(1년) 15일 / 2023년 7월(3년) 16일 / 2025년 7월(5년) 17일 발생
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">통상임금이란? 어떻게 계산하나?</h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  연차수당 계산의 핵심은 "통상임금"을 정확히 파악하는 것입니다.
                  통상임금은 근로의 대가로 정기적·고정적으로 지급되는 금액입니다.
                </p>
                <ul className="space-y-2 text-sm">
                  <li>
                    <strong>✓ 포함:</strong> 기본급, 직책급, 기술급, 근속급, 보직수당(정기적이면)
                  </li>
                  <li>
                    <strong>✗ 제외:</strong> 상여금, 복리후생비, 교통비, 식사비, 1회성 보상, 초과근무수당
                  </li>
                </ul>
                <p className="mt-3 text-sm text-text-tertiary">
                  회사 급여명세서에서 기본급 + 고정 수당을 합친 금액이 통상임금입니다.
                  명확하지 않으면 인사팀에 "연차수당 계산용 통상임금"을 명시해 달라고 요청하세요.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">연차수당 정확히 계산하기 — 공식과 단계별 예시</h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  연차수당 계산은 다음 공식을 따릅니다.
                </p>
                <div className="border-l-4 border-l-highlight-500 bg-card pl-4 py-4 font-mono text-sm">
                  연차수당 = 월 통상임금 ÷ 209 × 8 × 미사용 연차 일수
                </div>
                <p className="mt-3 text-sm">
                  <strong>• 209:</strong> 주 40시간 근무 기준 월 소정근로시간 (주휴 포함, 모든 직장인 동일)
                  <br />
                  <strong>• 8:</strong> 1일 소정근로시간
                </p>

                <div className="mt-6 space-y-4">
                  <h3 className="font-semibold">예시 1: 월 통상임금 300만 원, 미사용 연차 5일</h3>
                  <div className="space-y-2 text-sm bg-bg-card p-3 rounded">
                    <p>1일 통상임금 = 3,000,000 ÷ 209 × 8</p>
                    <p>         = 114,832원 (반올림)</p>
                    <p className="font-semibold">연차수당 = 114,832 × 5 = 574,160원</p>
                  </div>
                </div>

                <div className="mt-4 space-y-4">
                  <h3 className="font-semibold">예시 2: 월 통상임금 250만 원, 미사용 연차 10일</h3>
                  <div className="space-y-2 text-sm bg-bg-card p-3 rounded">
                    <p>1일 통상임금 = 2,500,000 ÷ 209 × 8</p>
                    <p>         = 95,694원 (반올림)</p>
                    <p className="font-semibold">연차수당 = 95,694 × 10 = 956,940원</p>
                  </div>
                </div>

                <p className="mt-4 text-sm text-text-tertiary">
                  다만 이 금액은 <strong>세전</strong>이며, 실제로는 소득세·지방소득세·4대보험료가 공제됩니다.
                  따라서 실제 수령액은 약 80~85% 정도입니다.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">연차 소멸 규칙 — 발생일로부터 1년</h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  근로기준법 §60⑦에 따르면 연차는 발생일로부터 <strong>1년간 미사용 시 소멸</strong>됩니다.
                  이는 매우 중요한 규칙입니다.
                </p>
                <div className="space-y-2 text-sm">
                  <div className="border-l-4 border-l-danger-500 bg-card pl-4 py-3">
                    <p className="font-semibold">소멸 기한</p>
                    <p className="text-text-secondary">발생일로부터 정확히 1년. 예: 2025년 7월 15일 발생 → 2026년 7월 14일 자정 소멸</p>
                  </div>
                  <div className="border-l-4 border-l-danger-500 bg-card pl-4 py-3">
                    <p className="font-semibold">소멸된 연차의 수당</p>
                    <p className="text-text-secondary">회사가 사용촉진 절차를 이행했다면 수당 지급 의무 면제 가능(§61). 다만 실무에서는 대부분 지급.</p>
                  </div>
                </div>
                <p className="mt-3 text-sm text-text-tertiary">
                  따라서 <strong>연차 사용 기한을 꼭 확인</strong>하고, 남은 일수를 계산해 두세요.
                  퇴사 예정이면 소멸 전에 사용하거나 수당 청구를 준비해야 합니다.
                </p>
              </section>

              <AdSlot slot="guide-annual-leave-mid" format="rectangle" />

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">연차수당 청구 방법 — 퇴사 시 체크리스트</h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  퇴사할 때 연차수당을 받기 위한 실질적인 방법을 정리했습니다.
                </p>
                <ol className="space-y-3 text-sm">
                  <li>
                    <strong>1단계: 본인의 연차 현황 파악</strong>
                    <br />
                    <span className="text-text-tertiary">급여명세서·인사포털에서 발생 연차, 사용한 연차, 남은 연차 확인</span>
                  </li>
                  <li>
                    <strong>2단계: 통상임금 확인</strong>
                    <br />
                    <span className="text-text-tertiary">인사팀에 "연차수당 계산용 통상임금"을 명시해 달라고 요청(기본급 + 고정 수당 합계)</span>
                  </li>
                  <li>
                    <strong>3단계: 연차수당 계산</strong>
                    <br />
                    <span className="text-text-tertiary">월 통상임금 ÷ 209 × 8 × 미사용 연차 일수로 본인이 계산</span>
                  </li>
                  <li>
                    <strong>4단계: 회사에 공식 청구</strong>
                    <br />
                    <span className="text-text-tertiary">퇴사신청 또는 이직 예정 전에 인사팀·회계팀에 서면으로 "미사용 연차수당 정산" 요청</span>
                  </li>
                  <li>
                    <strong>5단계: 최종 급여에 포함 확인</strong>
                    <br />
                    <span className="text-text-tertiary">퇴사 후 최종 급여명세서에서 "연차수당" 항목 확인, 금액이 맞는지 검증</span>
                  </li>
                  <li>
                    <strong>6단계: 미지급 시 신고</strong>
                    <br />
                    <span className="text-text-tertiary">미지급되면 한국노동청 온라인 상담 또는 직업안정기관에 신고 (근로기준법 위반)</span>
                  </li>
                </ol>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">연차수당 세금 — 얼마나 공제되나?</h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  연차수당은 근로소득으로 간주되어 소득세, 지방소득세, 4대보험료가 공제됩니다.
                  퇴직금처럼 특별한 세제 혜택이 없으므로, 계산할 때 이를 고려해야 합니다.
                </p>
                <div className="space-y-2 text-sm">
                  <div className="border-l-4 border-l-primary-500 bg-card pl-4 py-3">
                    <p className="font-semibold">소득세</p>
                    <p className="text-text-secondary">누진세율 적용 (§55). 과세표준에 따라 6~45% 범위</p>
                  </div>
                  <div className="border-l-4 border-l-primary-500 bg-card pl-4 py-3">
                    <p className="font-semibold">지방소득세</p>
                    <p className="text-text-secondary">소득세의 10%</p>
                  </div>
                  <div className="border-l-4 border-l-primary-500 bg-card pl-4 py-3">
                    <p className="font-semibold">4대보험료</p>
                    <p className="text-text-secondary">국민연금 4.5%, 건강보험 3.545%, 장기요양 건강보험의 12.95%, 고용보험 0.9% (합계 약 9.7~10%)</p>
                  </div>
                </div>
                <p className="mt-3 text-sm text-text-tertiary">
                  <strong>예시:</strong> 연차수당 50만 원 → 소득세 약 4만 원 + 보험료 약 5만 원 공제 → 실제 수령 약 41만 원
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">자주 하는 실수와 주의할 점</h2>
                <ol className="space-y-2 text-sm">
                  <li>
                    <strong>월급을 통상임금으로 계산하기</strong>
                    <br />
                    <span className="text-text-tertiary">월급(총 급여) ≠ 통상임금. 상여금, 복리후생비 등을 제외한 기본급 + 고정 수당만 포함.</span>
                  </li>
                  <li>
                    <strong>전체 연차를 일괄로 받을 수 있다고 가정하기</strong>
                    <br />
                    <span className="text-text-tertiary">발생 연차 중 1년 초과 미사용분은 소멸되므로, 발생일별로 따로 계산해야 합니다(단순하려면 현재 미사용분만).</span>
                  </li>
                  <li>
                    <strong>연차수당을 요청하지 않기</strong>
                    <br />
                    <span className="text-text-tertiary">회사가 저절로 주는 경우는 드뭅니다. 인사팀에 서면으로 명확히 요청해야 합니다.</span>
                  </li>
                  <li>
                    <strong>세전 금액으로만 계획하기</strong>
                    <br />
                    <span className="text-text-tertiary">연차수당은 세금을 공제받으므로, 실제 수령액은 약 80~85% 정도입니다. 미리 계산해 두세요.</span>
                  </li>
                  <li>
                    <strong>소멸 기한 무시하기</strong>
                    <br />
                    <span className="text-text-tertiary">발생일로부터 1년 경과 시 소멸됩니다. 퇴사 예정이면 소멸 기한을 반드시 확인하세요.</span>
                  </li>
                </ol>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">관련 법령 & 공식 출처</h2>
                <ul className="space-y-2 text-sm">
                  <li>
                    국가법령정보센터 - 근로기준법: <a href="https://www.law.go.kr/LSW/lsInfoP.do?lsiSeq=231110#0000" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">law.go.kr</a>
                  </li>
                  <li>
                    고용노동부 - 근로기준 정보: <a href="https://www.moel.go.kr" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">moel.go.kr</a>
                  </li>
                  <li>
                    한국노동청 - 근로 상담: <a href="https://www.nts.go.kr" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">nts.go.kr</a>
                  </li>
                  <li>
                    근로기준법 §60 (연차 발생·지급)
                  </li>
                  <li>
                    근로기준법 §61 (연차 사용촉진)
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
                    {' — 월급에서 4대보험·세금이 얼마나 공제되는지 확인'}
                  </li>
                  <li>
                    <Link href="/guide/salary-negotiation-take-home/" className="font-semibold text-primary-500 hover:underline">
                      연봉협상 가이드
                    </Link>
                    {' — 이직 시 정확한 세후 수령액으로 협상하기'}
                  </li>
                  <li>
                    <Link href="/guide/weekly-holiday-allowance-2026/" className="font-semibold text-primary-500 hover:underline">
                      주휴수당 계산법 2026
                    </Link>
                    {' — 주중에 근무한 경우 받을 수 있는 수당'}
                  </li>
                  <li>
                    <Link href="/guide/four-major-insurance-rates-2026/" className="font-semibold text-primary-500 hover:underline">
                      4대보험 요율 2026
                    </Link>
                    {' — 국민연금, 건강보험, 고용보험 최신 세율'}
                  </li>
                </ul>
              </section>

              <section className="space-y-3 border-t border-border-base pt-6">
                <p className="text-xs text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 참고용이며 법적 효력이 없습니다.
                  복잡한 연차 정산이나 근로 분쟁은 한국노동청, 노무사, 변호사의 전문 상담을 받으시기 바랍니다.
                  근로기준법은 지속적으로 개정되므로, 최신 정보는 law.go.kr 또는 고용노동부 공식 사이트를 참고하세요.
                </p>
              </section>

              <section className="space-y-3 border-t border-border-base pt-6">
                <p className="text-xs text-text-tertiary">
                  <strong>AI 보조 작성 · 운영자 검수:</strong> 본 가이드는 AI 보조로 작성되었으며, 법조항·세율 정보는 운영자가 검수했습니다.
                </p>
                <p className="text-xs text-text-tertiary">
                  인용한 법조항: 근로기준법 §60 (연차 발생·지급), §61 (사용촉진)
                </p>
                <p className="text-xs text-text-tertiary">
                  마지막 갱신: 2026-06-19 | 2026년 최신 근로기준법 반영
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
