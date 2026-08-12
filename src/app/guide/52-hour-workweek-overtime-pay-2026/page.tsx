// [revenue-lever: indexing+traffic]
import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { Footer } from '@/components/layout/Footer';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { FaqSection } from '@/components/calculator/FaqSection';
import { ShareButtons } from '@/components/calculator/ShareButtons';
import {
  buildBreadcrumbJsonLd,
  buildArticleJsonLd,
  buildWebPageJsonLd,
  buildFaqPageJsonLd,
  buildSpeakableJsonLd,
} from '@/lib/seo/jsonld';

const URL = 'https://calculatorhost.com/guide/52-hour-workweek-overtime-pay-2026/';
const DATE_PUBLISHED = '2026-08-09';
const DATE_MODIFIED = '2026-08-09';

export const metadata: Metadata = {
  title: '주 52시간 연장근로수당 2026, 계산법과 1.5배 기준',
  description:
    '주 52시간은 법정 40시간에 연장 12시간을 더한 상한입니다. 연장근로수당 1.5배 계산법, 야간·휴일 중복 가산, 1일 8시간 초과와 주 40시간 초과의 차이, 5인 미만 예외까지 근로기준법 조문으로 정리했습니다.',
  keywords: [
    '주 52시간 계산법',
    '연장근로수당 계산',
    '연장근로 12시간 초과',
    '연장근로수당 1.5배',
    '야간근로수당 휴일근로수당',
    '5인 미만 연장수당',
    '근로기준법 56조',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '주 52시간 연장근로수당 2026 계산법' }],
    title: '주 52시간 연장근로수당 2026, 계산법과 1.5배 기준',
    description: '법정 40시간 + 연장 12시간 = 주 52시간. 연장·야간·휴일 가산수당 계산법과 흔한 함정을 근로기준법 조문으로 정리했습니다.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '주 52시간 연장근로수당 2026 계산법',
    description: '연장근로 통상임금 50% 가산, 야간·휴일 중복 가산, 5인 미만 예외까지. 근로기준법 §50·§53·§56.',
  },
};

const FAQ_ITEMS = [
  {
    question: '주 52시간에서 52시간은 어떻게 나온 숫자인가요?',
    answer:
      '법정근로 40시간에 연장근로 한도 12시간을 더한 값입니다. 근로기준법 §50은 1주 근로시간을 40시간, 1일을 8시간으로 정하고, §53은 당사자가 합의하면 1주 12시간까지 연장할 수 있게 합니다. 두 값을 합쳐 1주 최대 52시간이 됩니다.',
  },
  {
    question: '연장근로수당은 통상임금의 몇 배인가요?',
    answer:
      '통상임금의 1.5배입니다. 근로기준법 §56은 연장근로에 통상임금의 50%를 가산하도록 정합니다. 통상시급이 1만 원이면 연장 1시간당 1만 5천 원을 받습니다. 다만 상시 근로자 5인 미만 사업장은 이 가산 규정이 적용되지 않습니다.',
  },
  {
    question: '하루 10시간씩 나흘 일하면 주 40시간인데 연장수당이 없나요?',
    answer:
      '아닙니다. 하루 8시간을 넘은 부분은 연장근로수당 대상입니다. 하루 10시간 근무는 매일 2시간씩 연장이므로 나흘이면 8시간이 가산 대상입니다. 주 40시간 초과 여부는 §53 연장 한도(주 12시간) 위반을 따질 때의 기준이고, 가산수당(§56)은 1일 8시간 초과에도 발생합니다.',
  },
  {
    question: '야간에 연장근로를 하면 수당이 어떻게 되나요?',
    answer:
      '연장 가산과 야간 가산이 함께 붙습니다. 오후 10시부터 다음 날 오전 6시 사이 근로는 야간근로로 50%가 추가됩니다. 이 시간대에 연장근로까지 겹치면 연장 50%와 야간 50%를 더해 통상임금의 2배(200%)를 받습니다.',
  },
  {
    question: '휴일에 8시간을 넘겨 일하면 얼마를 받나요?',
    answer:
      '8시간까지는 1.5배, 8시간을 넘는 시간은 2배입니다. 근로기준법 §56은 휴일근로 8시간 이내는 50% 가산, 8시간 초과분은 100% 가산으로 정합니다. 휴일에 10시간 일했다면 8시간은 1.5배, 나머지 2시간은 2배로 계산합니다.',
  },
  {
    question: '5인 미만 사업장도 주 52시간과 연장수당이 적용되나요?',
    answer:
      '연장 한도와 가산수당은 적용되지 않습니다. 상시 근로자 5인 미만 사업장은 §53 연장 한도와 §56 가산수당 규정이 제외됩니다. 다만 최저임금, 주휴수당, 퇴직금 등 다른 보호는 그대로 적용되므로 초과 근로 자체가 무보수라는 뜻은 아닙니다.',
  },
  {
    question: '포괄임금제 계약이면 연장수당을 따로 못 받나요?',
    answer:
      '실제 연장근로가 계약에 포함된 시간을 넘으면 차액을 받을 수 있습니다. 포괄임금이 유효해도 약정한 연장시간을 초과한 부분은 별도로 정산해야 합니다. 근로시간을 기록으로 남겨 두면 초과분 청구에 도움이 됩니다.',
  },
];

export default function Workweek52OvertimePay2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '주 52시간 연장근로수당 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '주 52시간 연장근로수당 2026, 계산법과 1.5배 기준',
    description:
      '주 52시간의 구조(법정 40시간 + 연장 12시간), 연장근로수당 1.5배 계산법, 야간·휴일 중복 가산, 1일 8시간 초과와 주 40시간 초과의 차이, 5인 미만 예외까지 근로기준법 조문으로 정리.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['주 52시간', '연장근로수당', '야간근로', '휴일근로', '근로기준법 56조'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '주 52시간 연장근로수당 2026',
    description:
      '주 52시간 상한의 구조와 연장·야간·휴일 가산수당 계산법을 근로기준법 조문 기준으로 정리한 실전 가이드.',
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
                    { name: '주 52시간 연장근로수당 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">직장인 · 8분 읽기 · 2026-08-09</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  주 52시간 연장근로수당 2026
                  <br />
                  <span className="text-2xl text-text-secondary">계산법과 1.5배 가산 기준</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  야근을 했는데 급여명세서의 연장수당이 맞는지 헷갈리는 직장인을 위한 가이드입니다. 주 52시간이라는 숫자가 어떻게 만들어지는지, 연장근로수당은 통상임금의 몇 배인지, 야간과 휴일이 겹치면 얼마가 되는지, 그리고 하루 8시간 초과와 주 40시간 초과가 왜 다른 기준인지를 근로기준법 조문과 계산 사례로 정리했습니다.
                </p>
              </header>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">주 52시간은 어떻게 나온 숫자인가요?</h2>
                <p>
                  주 52시간은 법정근로 40시간에 연장근로 한도 12시간을 더한 상한입니다. 근로기준법 §50은 1주 근로시간을 휴게시간을 빼고 40시간, 1일을 8시간으로 정합니다. 여기에 §53은 당사자가 합의하면 1주 12시간을 한도로 근로시간을 연장할 수 있도록 허용합니다. 두 값을 합치면 1주에 실제로 일할 수 있는 최대치가 52시간이 됩니다.
                </p>
                <p>
                  즉 52시간은 근무 목표가 아니라 넘으면 안 되는 법적 한도입니다. 한도를 넘긴 근로는 근로자가 동의했더라도 §53 위반이 되며, 이는 별도의 처벌 대상입니다. 다만 뒤에서 설명하듯 상시 근로자 5인 미만 사업장에는 이 한도가 적용되지 않습니다.
                </p>
                <p>
                  다만 주의할 점은, 52시간 한도를 지켰다고 해서 초과근로수당 의무가 사라지는 것은 아니라는 사실입니다. 한도(§53)와 가산수당(§56)은 서로 다른 조문이며 판단 기준도 다릅니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">연장근로 12시간 한도는 어떻게 계산하나요?</h2>
                <p>
                  연장 한도 초과 여부는 1주 40시간을 넘는 시간을 기준으로 판단합니다. 대법원은 2023년 판결에서, 1주 연장근로가 12시간을 넘었는지는 하루 8시간 초과분을 각각 더하는 방식이 아니라 1주 총 근로시간에서 40시간을 넘는 부분으로 계산해야 한다고 밝혔습니다. 예를 들어 나흘 동안 하루 15시간씩 일해 주 60시간을 근무했다면, 40시간을 뺀 20시간이 연장근로가 되어 12시간 한도를 넘긴 것으로 봅니다.
                </p>
                <p>
                  주의: 이 대법원 기준은 §53 한도 위반, 즉 사용자의 형사처벌 여부를 따질 때 쓰는 것입니다. 근로자가 받는 가산수당(§56)은 뒤에서 보듯 하루 8시간 초과에도 발생하므로, 한도를 지켰더라도 수당은 별도로 챙겨야 합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">연장근로수당은 통상임금의 몇 배인가요?</h2>
                <p>
                  연장근로수당은 통상임금의 1.5배입니다. 근로기준법 §56은 연장근로에 통상임금의 50%를 더해 지급하도록 정합니다. 계산의 출발점은 통상시급이며, 월급제라면 월 통상임금을 209시간(주 40시간과 주휴시간을 월 단위로 환산한 기준시간)으로 나눠 구합니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 근로 유형별 가산율 (근로기준법 §56, 2026 기준)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">근로 유형</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">가산율</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">지급 배수</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">연장근로 (1일 8시간 또는 주 40시간 초과)</td>
                        <td className="p-3">50%</td>
                        <td className="p-3"><strong>통상임금 1.5배</strong></td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">야간근로 (22시부터 익일 06시)</td>
                        <td className="p-3">50%</td>
                        <td className="p-3">통상임금 1.5배</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">연장 + 야간 중복</td>
                        <td className="p-3">50% + 50%</td>
                        <td className="p-3"><strong>통상임금 2배</strong></td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">휴일근로 8시간 이내</td>
                        <td className="p-3">50%</td>
                        <td className="p-3">통상임금 1.5배</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">휴일근로 8시간 초과분</td>
                        <td className="p-3">100%</td>
                        <td className="p-3"><strong>통상임금 2배</strong></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  다만 이 가산율은 상시 근로자 5인 이상 사업장에만 적용됩니다. 5인 미만 사업장은 초과근로를 해도 가산 없이 실제 근로시간만큼만 지급받을 수 있습니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">연장·야간·휴일근로수당 계산 사례</h2>
                <p>
                  통상시급을 1만 2천 원으로 가정하고 세 가지 상황을 단계별로 계산해 보겠습니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 1. 평일 연장근로 (주 48시간 근무)</p>
                  <p className="text-sm text-text-secondary">
                    · 통상시급: 12,000원
                    <br />
                    · 주 근로: 48시간 (법정 40시간 초과 8시간이 연장근로)
                    <br />
                    · 연장수당: 8시간 × 12,000원 × 1.5 = <strong>144,000원</strong>
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 기본 근로 대가와 별도로 주당 14만 4천 원의 연장수당이 추가됩니다.</span>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 2. 야간에 걸친 연장근로 (22시부터 24시까지 2시간)</p>
                  <p className="text-sm text-text-secondary">
                    · 통상시급: 12,000원
                    <br />
                    · 연장 가산 50% + 야간 가산 50% = 통상임금의 2배
                    <br />
                    · 수당: 2시간 × 12,000원 × 2.0 = <strong>48,000원</strong>
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 같은 2시간이라도 야간에 겹치면 평일 연장(3만 6천 원)보다 1만 2천 원 더 받습니다.</span>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 3. 휴일에 10시간 근무</p>
                  <p className="text-sm text-text-secondary">
                    · 통상시급: 12,000원
                    <br />
                    · 8시간 이내: 8시간 × 12,000원 × 1.5 = 144,000원
                    <br />
                    · 8시간 초과분: 2시간 × 12,000원 × 2.0 = 48,000원
                    <br />
                    · 합계: <strong>192,000원</strong>
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 휴일근로는 8시간을 넘기는 순간 가산율이 2배로 뛰므로 초과분 관리가 중요합니다.</span>
                  </p>
                </div>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">하루 8시간 초과와 주 40시간 초과는 왜 다른가요?</h2>
                <p>
                  둘은 적용되는 조문이 다르기 때문입니다. 아래 표로 정리하면 혼동을 줄일 수 있습니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 2. 연장 한도 판단과 가산수당 지급의 기준 비교</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">구분</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">기준</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">근거</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">연장 한도(주 12시간) 위반 여부</td>
                        <td className="p-3">1주 40시간 초과분</td>
                        <td className="p-3">근로기준법 §53, 2023년 대법원</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">연장근로 가산수당 지급</td>
                        <td className="p-3">1일 8시간 또는 주 40시간 초과</td>
                        <td className="p-3">근로기준법 §56</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  예를 들어 하루 10시간씩 나흘 일하면 주 근로가 40시간이라 §53 한도 위반은 아닙니다. 그러나 매일 2시간씩 하루 8시간을 초과했으므로 나흘분 8시간은 §56 가산수당 대상입니다.
                </p>
                <p>
                  다만 회사가 탄력근로제나 선택근로제 같은 유연근로제를 적법하게 도입했다면 특정일이나 특정주의 근로시간 산정 방식이 달라질 수 있습니다. 이 경우 취업규칙과 노사 합의 내용을 함께 확인해야 합니다.
                </p>
              </section>

              <section className="space-y-6 border-t border-border-base pt-8">
                <h2 className="text-2xl font-bold">포괄임금제면 연장수당을 못 받나요?</h2>
                <p>
                  포괄임금제라도 약정한 연장시간을 넘으면 차액을 받을 수 있습니다. 포괄임금은 매달 일정한 연장수당을 급여에 미리 포함하는 방식인데, 실제 연장근로가 계약에 담긴 시간보다 많으면 그 초과분은 별도로 정산해야 합니다. 급여명세서에 고정 연장수당이 몇 시간분으로 잡혀 있는지 확인하고, 실제 근무한 시간과 비교하는 것이 출발점입니다.
                </p>
                <p>
                  예외: 근로시간 산정이 어려운 일부 직무나 관리직 등에서는 포괄임금 약정이 폭넓게 인정될 수 있습니다. 그러나 사무직처럼 출퇴근 기록으로 근로시간을 특정할 수 있는 경우에는 초과분 청구가 인정되는 사례가 많습니다. 출퇴근 기록, 업무용 메신저 로그 등 객관적 근거를 남겨 두면 도움이 됩니다.
                </p>
              </section>

              <h2 className="text-2xl font-bold mb-6">자주 묻는 질문</h2>
              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h3 className="text-lg font-semibold text-text-primary">관련 계산기 및 가이드</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link
                    href="/calculator/salary/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">연봉 실수령액 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">세전 연봉에서 4대보험·세금을 뺀 월 실수령액을 계산해 보세요.</p>
                  </Link>
                  <Link
                    href="/guide/overtime-night-holiday-allowance-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">연장·야간·휴일수당 총정리</div>
                    <p className="mt-1 text-sm text-text-secondary">가산수당의 종류와 중복 적용을 더 자세히 살펴보세요.</p>
                  </Link>
                  <Link
                    href="/guide/ordinary-wage-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">통상임금이란</div>
                    <p className="mt-1 text-sm text-text-secondary">가산수당의 기준이 되는 통상임금의 범위를 이해하세요.</p>
                  </Link>
                  <Link
                    href="/guide/weekly-holiday-allowance-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">주휴수당 조건과 계산</div>
                    <p className="mt-1 text-sm text-text-secondary">통상시급 산정에 쓰이는 209시간의 근거를 확인하세요.</p>
                  </Link>
                  <Link
                    href="/guide/small-business-under-5-employees-labor-law-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">5인 미만 사업장 근로기준법</div>
                    <p className="mt-1 text-sm text-text-secondary">가산수당이 적용되지 않는 규모별 예외를 정리했습니다.</p>
                  </Link>
                  <Link
                    href="/category/work/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">모든 근로·급여 가이드</div>
                    <p className="mt-1 text-sm text-text-secondary">연봉·수당·퇴직금 관련 가이드 모음.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 교육 목적으로 작성되었으며 개인 맞춤형 노무 조언이 아닙니다. 실제 연장·야간·휴일근로수당은 사업장 규모, 취업규칙, 유연근로제 도입 여부, 통상임금 범위에 따라 달라질 수 있으므로, 구체적 사안은 고용노동부 또는 공인노무사와 상담하시기 바랍니다. 본 콘텐츠는 2026-08-09를 기준으로 작성되었으며 법령 개정 시 업데이트됩니다. 인용 조문은 <strong>근로기준법 §50(근로시간), §53(연장 근로의 제한), §56(연장·야간 및 휴일 근로)</strong>이며, 연장 한도 판단 기준은 2023년 대법원 판례를 따릅니다. AI 보조 작성 후 운영자 검수 완료.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터</a>,{' '}
                  <a href="https://www.moel.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">고용노동부</a>.
                </p>
              </section>

              <ShareButtons
                title="주 52시간 연장근로수당 2026 가이드"
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