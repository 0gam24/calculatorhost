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

const URL = 'https://calculatorhost.com/guide/weekly-holiday-allowance-2026/';
const DATE_PUBLISHED = '2026-06-19';
const DATE_MODIFIED = '2026-06-19';

export const metadata: Metadata = {
  title: '주휴수당 계산법 2026 — 주 15시간·개근 조건과 시급 환산 | calculatorhost',
  description:
    '주휴수당이란? 근로기준법에서 정한 1주 평균 15시간 이상·개근 조건. 월급제와 시급·일급제별 계산 방법, 결근 시 미발생 규칙, 단시간 근로자 적용 기준을 정리합니다.',
  keywords: [
    '주휴수당',
    '주휴수당 계산',
    '주 15시간',
    '개근 조건',
    '시급 환산',
    '근로기준법 55조',
    '단시간 근로자',
    '주휴일',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '주휴수당 계산법 2026 — 주 15시간·개근 조건과 시급 환산 | calculatorhost' }],
    title: '주휴수당 계산법 2026 — 근로기준법 §55',
    description: '주휴수당 요건·계산법·결근 시 규칙. 월급제·시급제별 사례 계산.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
};

const FAQ_ITEMS = [
  {
    question: '주휴수당이 정확히 무엇인가요?',
    answer:
      '근로기준법 §55①에 따른 법정 유급휴일입니다. 사용자는 근로자에게 1주 평균 1회 이상 유급휴일을 보장해야 하는데, 이를 근무하지 않고 급여를 받는 "주휴일"이라 하며, 그 급여액을 주휴수당이라 합니다. 근로시간이 1주 평균 15시간 이상이고, 1주를 개근해야만 발생합니다.',
  },
  {
    question: '주 20시간만 일하는데 주휴수당을 받을 수 있나요?',
    answer:
      '네, 받을 수 있습니다. 근로기준법 시행령 §30①에서는 1주 소정근로시간이 15시간 이상이면 주휴일 적용 대상입니다. 따라서 주 20시간 이상이면 충분합니다. 다만 1주를 모두 출근해야 하고, 한 번이라도 결근하면 그 주 주휴수당은 미발생합니다. (단시간·초단시간 기준은 근로기준법 §18)',
  },
  {
    question: '월급 200만 원인데 주휴수당이 얼마인가요?',
    answer:
      '월급 200만 원인 경우, 월급에 이미 주휴수당이 포함되어 있는지 여부를 근로계약서·급여명세서에서 확인해야 합니다. 포함되어 있다면 추가 계산 불필요. 미포함이라면, 월 200만 원 ÷ 주당 소정근로시간 ÷ 4주 = 시급을 계산한 후, 시급 × 해당주 소정근로시간분(보통 8시간)이 주휴수당입니다.',
  },
  {
    question: '주당 30시간 일할 때 주휴수당 계산 방법은?',
    answer:
      '주당 30시간 근무하는 경우, 주휴수당 = (30시간 ÷ 40시간) × 8시간 × 시급입니다. 예를 들어 시급 10,000원이면 주휴수당 = 0.75 × 8 × 10,000 = 60,000원. 이는 풀타임 기준 8시간과의 비례 계산입니다.',
  },
  {
    question: '한 주 중 하루 결근했는데 주휴수당은 어떻게 되나요?',
    answer:
      '근로기준법 시행령 §30①에 따르면, 1주를 개근해야 주휴일이 적용됩니다. 따라서 한 번이라도 결근하면 그 주의 주휴수당은 발생하지 않습니다. 다만 "정당한 사유"(질병, 공상, 공용·공식 행사 참석 등)가 있다면 개근 판정에 포함될 수 있으니, 회사에 반드시 사전에 신고하세요.',
  },
  {
    question: '월급제와 시급제의 주휴수당 계산 방식이 다른가요?',
    answer:
      '월급제는 월급 자체에 주휴수당이 포함되는 경우가 대부분이므로 별도 계산 불필요. 시급·일급제는 주휴수당을 따로 계산·지급합니다. 근로계약서에 "주휴수당 포함" 또는 "제외" 여부가 명시되어 있으므로, 입사 시 반드시 확인하세요.',
  },
  {
    question: '주 14시간만 일하는데 주휴수당을 못 받는다고 했어요.',
    answer:
      '맞습니다. 근로기준법 시행령 §30①과 근로기준법 §18③에 따르면, "1주 평균 소정근로시간이 15시간 미만"인 초단시간 근로자는 주휴일과 연차휴가가 적용되지 않습니다. 따라서 주 14시간이면 주휴수당 자격이 없습니다.',
  },
  {
    question: '월급 명세서에 주휴수당이 별도 항목으로 나타나야 하나요?',
    answer:
      '근로계약서에 주휴수당 포함 여부를 명시했다면, 월급 명세서에 별도 항목으로 표시할 의무는 법적으로 없습니다. 하지만 투명성을 위해 대부분의 회사는 "기본급 + 주휴수당" 또는 "월급(주휴수당 포함)"으로 표기합니다. 불명확하면 인사팀에 확인하세요.',
  },
];

export default function WeeklyHolidayAllowancePage() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '주휴수당 계산법' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '주휴수당 계산법 2026 — 주 15시간·개근 조건과 시급 환산',
    description:
      '근로기준법 §55에 정한 주휴수당이란 무엇인가? 주 15시간 이상·개근 조건, 월급제와 시급제별 계산 방법, 결근 시 미발생 규칙, 그리고 초단시간 근로자 예외 규칙을 정리합니다.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['주휴수당', '근로기준법', '주휴일', '개근 조건', '시급'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '주휴수당 계산법 2026 — 주 15시간·개근 조건과 시급 환산',
    description:
      '주휴수당 요건·계산식·지급 형태. 월급제·시급제·단시간 근로자 별 규칙. 결근 시 미발생, 정당한 사유 판단.',
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
                    { name: '주휴수당 계산법' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">근로 · 6분 읽기 · 2026-06-19</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  주휴수당 계산법 2026 — 주 15시간·개근 조건과 시급 환산
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  주휴수당은 근로기준법 §55에서 정한 법정 유급휴일입니다.
                  1주 평균 15시간 이상 근무하고 개근해야만 발생하는데,
                  많은 단시간·시급 근로자들이 조건과 계산 방법을 제대로 모르고 있습니다.
                  이 가이드에서는 주휴수당의 요건부터 월급제·시급제별 계산 방법, 결근 규칙까지 정확히 정리합니다.
                </p>
              </header>

              <AdSlot slot="guide-weekly-holiday-allowance-top" format="horizontal" />

              <section aria-label="요약" className="card border-l-4 border-l-primary-500">
                <h2 className="mb-2 text-caption uppercase tracking-wider text-primary-500">주휴수당 기본 요건</h2>
                <ul className="space-y-1.5 text-sm" data-speakable>
                  <li>✓ <strong>1주 소정근로시간</strong> — 평균 15시간 이상 필수</li>
                  <li>✓ <strong>개근</strong> — 1주를 모두 출근해야 주휴수당 발생</li>
                  <li>✓ <strong>유급휴일</strong> — 근무하지 않아도 급여 지급</li>
                  <li>✓ <strong>법적 근거</strong> — 근로기준법 §55①, 시행령 §30①</li>
                  <li>✓ <strong>지급 형태</strong> — 월급제 포함 vs 시급제 별도 계산</li>
                  <li>✓ <strong>결근 시</strong> — 해당 주 주휴수당 미발생</li>
                </ul>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">주휴수당이란 무엇인가?</h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  근로기준법 §55①에 따르면, 사용자는 근로자에게 1주 평균 1회 이상 유급휴일을 보장해야 합니다.
                  이 유급휴일을 "주휴일"이라 하며, 근무하지 않고 받는 급여를 "주휴수당"이라 합니다.
                  풀타임 직원뿐만 아니라 시급·일급·단시간 근로자도 대상인데,
                  단 <strong>1주 평균 15시간 이상</strong> 근무하고 <strong>해당 주를 개근</strong>해야만 발생합니다.
                </p>
                <p className="text-text-secondary leading-relaxed">
                  주휴수당은 근로자가 권리를 주장해야 받는 게 아니라, 회사가 자동으로 산정·지급해야 하는 법정 의무입니다.
                  월급제 직원은 보통 월급에 포함되어 있고,
                  시급·일급제는 별도로 계산하는 것이 일반적입니다.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">주휴수당 요건 — "주 15시간 + 개근" 기준</h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  근로기준법 시행령 §30①은 주휴일 적용의 명확한 기준을 제시합니다.
                  "1주의 소정근로일을 개근한 자에게 1일 유급휴일을 부여한다"는 것인데,
                  이는 두 가지 조건을 동시에 만족해야 함을 의미합니다.
                </p>
                <ul className="space-y-2 border-l-4 border-l-highlight-500 bg-card pl-4 py-3 text-sm">
                  <li>
                    <strong>첫 번째 조건: 1주 소정근로시간 15시간 이상</strong>
                    <br />
                    <span className="text-text-tertiary">근로기준법 §18③ "초단시간 근로자(1주 평균 15시간 미만)"는 주휴일과 연차휴가 미적용</span>
                  </li>
                  <li>
                    <strong>두 번째 조건: 1주 개근</strong>
                    <br />
                    <span className="text-text-tertiary">해당 주의 모든 소정근로일에 출근해야 주휴수당 발생. 한 번 결근하면 미발생.</span>
                  </li>
                </ul>
                <p className="text-sm text-text-tertiary">
                  다만 질병·공상·공용·공식 행사 참석 등 "정당한 사유"가 있으면 개근 판정에 포함될 수 있습니다.
                  회사 규정에 따르므로, 미리 인사팀에 확인하는 것이 좋습니다.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">주휴수당 계산 방법 — 월급제 vs 시급제</h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  주휴수당 계산 방식은 근로 형태에 따라 크게 두 가지로 나뉩니다.
                  월급제는 주로 월급에 포함되지만, 시급·일급제는 별도로 산정합니다.
                </p>

                <div className="space-y-3">
                  <div className="border-l-4 border-l-primary-500 bg-card p-4">
                    <h3 className="mb-2 font-semibold">월급제: 이미 월급에 포함된 경우가 많음</h3>
                    <p className="text-sm text-text-secondary">
                      월급제 직원의 경우, 근로계약서 또는 취업 규칙에 "월급에 주휴수당 포함"이라고 명시되어 있으면,
                      별도 계산 없이 받는 월급 자체가 주휴수당을 포함한 것입니다.
                    </p>
                    <p className="mt-2 text-sm">
                      <strong>예:</strong> 월급 200만 원 (주휴수당 포함) → 추가 계산 불필요
                    </p>
                  </div>

                  <div className="border-l-4 border-l-secondary-500 bg-card p-4">
                    <h3 className="mb-2 font-semibold">시급·일급제: 별도 계산 필수</h3>
                    <p className="text-sm text-text-secondary">
                      시급 또는 일급으로 근무하는 경우, 주휴수당을 따로 계산합니다.
                      계산식은: <strong>주휴수당 = (1주 소정근로시간 ÷ 40시간) × 8시간 × 시급</strong>
                    </p>
                    <p className="mt-3">
                      <strong>사례 1. 주 30시간, 시급 10,000원</strong>
                    </p>
                    <ul className="mt-1 space-y-1 text-sm">
                      <li>주휴수당 = (30 ÷ 40) × 8 × 10,000 = 60,000원</li>
                    </ul>

                    <p className="mt-3">
                      <strong>사례 2. 주 20시간, 시급 10,000원</strong>
                    </p>
                    <ul className="mt-1 space-y-1 text-sm">
                      <li>주휴수당 = (20 ÷ 40) × 8 × 10,000 = 40,000원</li>
                    </ul>
                  </div>
                </div>

                <p className="mt-4 text-sm text-text-tertiary">
                  💡 <strong>주의:</strong> 풀타임(주 40시간) 기준으로 계산하는 이유는,
                  법정 유급휴일이 풀타임 기준 1일(8시간)이기 때문입니다.
                  따라서 시간제는 비례 계산하게 됩니다.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">결근하면 주휴수당은 어떻게 되나?</h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  근로기준법 시행령 §30①의 "1주의 소정근로일을 개근한 자"라는 표현이 핵심입니다.
                  <strong>1주 중 한 번이라도 결근하면, 그 주의 주휴수당은 발생하지 않습니다.</strong>
                </p>
                <ul className="space-y-2 text-sm">
                  <li>
                    <strong>결근 발생:</strong> 해당 주 주휴수당 0원
                  </li>
                  <li>
                    <strong>정당한 사유로 결근:</strong> 회사 규정에 따라 개근 판정에 포함 가능 (사전 신고 필수)
                  </li>
                  <li>
                    <strong>유급 휴가:</strong> 연차·특별휴가·출산휴가 등 유급 사유는 개근에 포함될 수 있음
                  </li>
                  <li>
                    <strong>무단 결근:</strong> 개근에 포함되지 않음 → 주휴수당 미발생
                  </li>
                </ul>
                <p className="mt-3 text-sm text-text-tertiary">
                  결근의 정당성 판단은 회사가 하므로, 불가피한 상황에서는 즉시 회사에 연락하고,
                  가능한 한 빨리 사유를 증명하는 서류(진단서, 처방전, 공문 등)를 제출하세요.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">초단시간 근로자 — 주 15시간 미만이면 제외</h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  근로기준법 §18③이 "1주 평균 15시간 미만"을 초단시간 근로자로 규정하며,
                  이 경우 주휴일과 연차휴가가 적용되지 않습니다.
                </p>
                <table className="w-full text-sm">
                  <caption className="mb-2 text-left font-semibold">주휴수당 적용 기준</caption>
                  <thead>
                    <tr className="border-b border-border-base">
                      <th scope="col" className="bg-bg-raised px-3 py-2 text-left font-semibold">근무 형태</th>
                      <th scope="col" className="bg-bg-raised px-3 py-2 text-left font-semibold">주휴수당 적용</th>
                      <th scope="col" className="bg-bg-raised px-3 py-2 text-left font-semibold">근거</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-border-base">
                      <td className="px-3 py-2">주 15시간 이상</td>
                      <td className="px-3 py-2"><strong>적용</strong></td>
                      <td className="px-3 py-2 text-text-tertiary">근로기준법 시행령 §30①</td>
                    </tr>
                    <tr className="bg-bg-card">
                      <td className="px-3 py-2">주 15시간 미만</td>
                      <td className="px-3 py-2"><strong>미적용</strong></td>
                      <td className="px-3 py-2 text-text-tertiary">근로기준법 §18③ (초단시간)</td>
                    </tr>
                  </tbody>
                </table>
                <p className="mt-3 text-sm text-text-tertiary">
                  따라서 주 14시간만 일하는 경우, 아무리 근무해도 주휴수당을 받을 수 없습니다.
                  대신 고용보험료나 사회보험료 부담이 줄어드는 이점이 있습니다.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">주휴수당 지급 형태 — 월급에 포함? 별도 지급?</h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  주휴수당이 월급에 포함되는지, 아니면 별도로 지급되는지는
                  근로계약서와 회사의 급여 규정에 명시되어 있어야 합니다.
                </p>
                <ul className="space-y-3 text-sm">
                  <li>
                    <strong>월급제 (일반):</strong> 월급 350만 원(주휴수당 포함) → 별도 계산 불필요
                  </li>
                  <li>
                    <strong>월급제 (명확 분리):</strong> 기본급 320만 원 + 주휴수당 30만 원 = 월급 350만 원 → 명세서에 항목 분리
                  </li>
                  <li>
                    <strong>시급제:</strong> 시급 10,000원 × 근로시간 + 주휴수당 별도 계산 → 급여명세서에 "주휴수당" 항목 표기
                  </li>
                </ul>
                <p className="mt-3 text-sm text-text-tertiary">
                  중요한 것은, 근로계약서나 취업 규칙에 명확히 명시되어 있어야 한다는 점입니다.
                  불명확하면 인사팀에 서면 확인을 요청하세요.
                </p>
              </section>

              <AdSlot slot="guide-weekly-holiday-allowance-mid" format="rectangle" />

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">주휴수당 계산 가이드 — 실제 사례</h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  다양한 근무 형태에서 주휴수당이 어떻게 계산되는지 예시로 정리했습니다.
                  본인의 상황과 비교해 보세요.
                </p>

                <div className="space-y-4">
                  <div className="border-l-4 border-l-primary-500 bg-card p-4">
                    <h3 className="mb-3 font-semibold">사례 1. 풀타임 월급제 (주 40시간)</h3>
                    <ul className="space-y-2 text-sm">
                      <li>월급: 300만 원 (주휴수당 포함)</li>
                      <li>주 소정근로시간: 40시간</li>
                      <li>개근 여부: 개근 (지난주 결근 없음)</li>
                      <li className="border-t border-border-base pt-2">
                        <strong>결론:</strong> 주휴수당은 이미 월급 300만 원에 포함됨. 별도 지급 없음.
                      </li>
                    </ul>
                  </div>

                  <div className="border-l-4 border-l-secondary-500 bg-card p-4">
                    <h3 className="mb-3 font-semibold">사례 2. 단시간 시급제 (주 20시간, 시급 11,000원)</h3>
                    <ul className="space-y-2 text-sm">
                      <li>주 소정근로시간: 20시간</li>
                      <li>시급: 11,000원</li>
                      <li>개근 여부: 개근</li>
                      <li>
                        주휴수당 계산: (20 ÷ 40) × 8시간 × 11,000원 = <strong>44,000원</strong>
                      </li>
                      <li className="border-t border-border-base pt-2">
                        <strong>결론:</strong> 이번 주 급여에 44,000원 별도 지급.
                      </li>
                    </ul>
                  </div>

                  <div className="border-l-4 border-l-danger-500 bg-card p-4">
                    <h3 className="mb-3 font-semibold">사례 3. 초단시간 근로자 (주 12시간)</h3>
                    <ul className="space-y-2 text-sm">
                      <li>주 소정근로시간: 12시간 (15시간 미만)</li>
                      <li>시급: 10,500원</li>
                      <li>개근 여부: 개근</li>
                      <li>
                        주휴수당: <strong>미적용</strong> (근로기준법 §18③)
                      </li>
                      <li className="border-t border-border-base pt-2">
                        <strong>결론:</strong> 주휴수당 없음. 그 주에 12시간분 급여만 지급.
                      </li>
                    </ul>
                  </div>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">자주 하는 질문 5가지</h2>
                <ol className="space-y-3 text-sm">
                  <li>
                    <strong>❌ "주휴수당은 안 받아도 되나요?"</strong>
                    <br />
                    <span className="text-text-tertiary">
                      아닙니다. 근로기준법 §55는 의무 규정입니다. 회사가 주휴수당을 지급하지 않는 것은 위법이며,
                      근로자가 포기하겠다고 해도 무효입니다.
                    </span>
                  </li>
                  <li>
                    <strong>❌ "주 15시간을 약간 넘으면 괜찮나요?"</strong>
                    <br />
                    <span className="text-text-tertiary">
                      아닙니다. 기준은 "평균 15시간 이상"입니다. 4주 평균으로 계산하므로 정확한 계산이 필요합니다.
                      인사팀에 시간 기록을 확인해 달라고 요청하세요.
                    </span>
                  </li>
                  <li>
                    <strong>❌ "휴가를 쓰면 그 주는 결근인가요?"</strong>
                    <br />
                    <span className="text-text-tertiary">
                      아닙니다. 연차·특별휴가·출산휴가 등 유급 휴가는 개근에 포함됩니다.
                      문제는 무단 결근, 징계 정지, 병가 등입니다.
                    </span>
                  </li>
                  <li>
                    <strong>❌ "회사가 주휴수당을 안 주는데, 포기하면 월급을 더 받나요?"</strong>
                    <br />
                    <span className="text-text-tertiary">
                      절대 아닙니다. 주휴수당은 법정 최소 급여입니다. 포기할 수 없습니다.
                      회사가 안 주면 미지급 임금으로 신고해야 합니다.
                    </span>
                  </li>
                  <li>
                    <strong>❌ "주휴수당을 미리 계산해서 제시할 수 있나요?"</strong>
                    <br />
                    <span className="text-text-tertiary">
                      네, 가능합니다. 이 가이드의 계산식을 이용해 본인의 주휴수당을 미리 계산할 수 있습니다.
                      급여명세서와 비교해서 맞는지 확인하세요.
                    </span>
                  </li>
                </ol>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">관련 법령 & 공식 출처</h2>
                <ul className="space-y-2 text-sm">
                  <li>
                    국가법령정보센터 근로기준법: <a href="https://www.law.go.kr" rel="nofollow" className="text-primary-500 underline">https://www.law.go.kr</a>
                  </li>
                  <li>
                    고용노동부 근로조건 정보: <a href="https://www.moel.go.kr" rel="nofollow" className="text-primary-500 underline">https://www.moel.go.kr</a>
                  </li>
                  <li>
                    근로기준법 §55① (주휴일 보장)
                  </li>
                  <li>
                    근로기준법 시행령 §30① (주휴일 적용 요건)
                  </li>
                  <li>
                    근로기준법 §18③ (초단시간 근로자 정의)
                  </li>
                </ul>
              </section>

              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">관련 계산기 & 가이드</h2>
                <ul className="space-y-2 text-sm">
                  <li>
                    ➜ <Link href="/calculator/salary/" className="font-semibold text-primary-500 hover:underline">
                      연봉 실수령액 계산기
                    </Link>
                    {' — 월급에서 공제되는 4대보험·세금 확인'}
                  </li>
                  <li>
                    ➜ <Link href="/guide/annual-leave-allowance-2026/" className="font-semibold text-primary-500 hover:underline">
                      연차수당 계산법 2026
                    </Link>
                    {' — 주휴수당과 함께 알아둬야 할 연차 규칙'}
                  </li>
                  <li>
                    ➜ <Link href="/guide/four-major-insurance-rates-2026/" className="font-semibold text-primary-500 hover:underline">
                      4대보험 요율 2026
                    </Link>
                    {' — 국민연금·건강보험·장기요양·고용보험 요율'}
                  </li>
                  <li>
                    ➜ <Link href="/guide/salary-negotiation-take-home/" className="font-semibold text-primary-500 hover:underline">
                      연봉협상 전 확인사항
                    </Link>
                    {' — 이직 제안 검증 가이드'}
                  </li>
                </ul>
              </section>

              <section className="space-y-3 border-t border-border-base pt-6">
                <p className="text-xs text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 참고용이며 법적 효력이 없습니다.
                  개인의 상황과 회사 규칙이 다를 수 있으므로, 정확한 주휴수당 계산은 회사의 인사팀 또는 노동 법무사에게 상담받으시기 바랍니다.
                </p>
              </section>

              <section className="space-y-3 border-t border-border-base pt-6">
                <p className="text-xs text-text-tertiary">
                  <strong>마지막 갱신:</strong> 2026-06-19 | 근로기준법 §55, 시행령 §30, 근로기준법 §18 기준
                </p>
                <p className="text-xs text-text-tertiary">
                  <strong>AI 보조 작성:</strong> 본 가이드는 AI 보조 작성 후 운영자 검수를 거쳤습니다.
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
