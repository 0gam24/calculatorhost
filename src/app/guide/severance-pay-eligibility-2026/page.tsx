// [revenue-lever: indexing+traffic]
import type { Metadata } from 'next';
import Link from 'next/link';
import { GuideCalculatorCta } from '@/components/guide/GuideCalculatorCta';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { Footer } from '@/components/layout/Footer';
import { GuideHeader } from '@/components/guide/GuideHeader';
import { FaqSection } from '@/components/calculator/FaqSection';
import { ShareButtons } from '@/components/calculator/ShareButtons';
import {
  buildBreadcrumbJsonLd,
  buildArticleJsonLd,
  buildWebPageJsonLd,
  buildFaqPageJsonLd,
  buildSpeakableJsonLd,
} from '@/lib/seo/jsonld';

const URL = 'https://calculatorhost.com/guide/severance-pay-eligibility-2026/';
const DATE_PUBLISHED = '2026-10-25';
const DATE_MODIFIED = '2026-10-25';

export const metadata: Metadata = {
  title: '퇴직금 지급 기준 2026, 1년·주 15시간 알바·계약직도 받나',
  description:
    '퇴직금은 1년 이상, 주 15시간 이상이면 받습니다. 알바·계약직·5인 미만·IRP까지 근퇴법 §4·§8·§9 기준으로 정리.',
  keywords: [
    '퇴직금 지급 기준',
    '퇴직금 받는 조건',
    '1년 미만 퇴직금',
    '알바 퇴직금',
    '계약직 퇴직금',
    '5인 미만 퇴직금',
    '퇴직금 주 15시간',
    '퇴직금 IRP',
    '근로자퇴직급여보장법 4조',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '퇴직금 지급 기준 2026' }],
    title: '퇴직금 지급 기준 2026, 1년·주 15시간 알바·계약직',
    description: '1년 이상·주 15시간 이상이면 받습니다. 1년 미만, 알바, 5인 미만, IRP까지 §4·§8·§9 기준으로 정리.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '퇴직금 지급 기준 2026',
    description: '1년 이상·주 15시간 이상이면 받습니다. 알바·계약직·5인 미만도 포함. §4·§8·§9 기준.',
  },
};

const FAQ_ITEMS = [
  {
    question: '퇴직금 받는 조건은 무엇인가요?',
    answer:
      '계속근로기간이 1년 이상이고, 4주를 평균해 1주 소정근로시간이 15시간 이상이면 퇴직금을 받습니다(근로자퇴직급여 보장법 §4①). 두 조건 중 하나라도 못 채우면 법정 퇴직금은 발생하지 않지만, 회사 취업규칙이나 근로계약으로 더 유리하게 정했다면 그에 따릅니다.',
  },
  {
    question: '1년에서 하루라도 모자라면 퇴직금을 못 받나요?',
    answer:
      '네, 법정 퇴직금은 받지 못합니다. 입사일로부터 달력상 1년이 되는 날의 전날까지 일해야 1년을 채운 것입니다(퇴직일은 마지막 근무일 다음 날). 입사 2025년 11월 1일이면 2026년 10월 31일까지 일해야 하고, 10월 30일에 그만두면 재직 364일이라 0원입니다. 1년 사이에 2월 29일이 끼면 366일을 채워야 합니다.',
  },
  {
    question: '알바·계약직·일용직도 퇴직금을 받나요?',
    answer:
      '네, 고용 형태가 아니라 근로자 여부와 1년·주 15시간 요건만 봅니다. 아르바이트, 계약직, 일용직도 같은 사업장에서 1년 이상 계속 근로하고 4주 평균 주 15시간 이상 일했다면 §4①에 따라 퇴직금을 받습니다. 사용자가 "알바라서 안 준다"고 해도 효력이 없습니다.',
  },
  {
    question: '5인 미만 사업장도 퇴직금을 줘야 하나요?',
    answer:
      '네, 사업장 규모와 무관합니다. 근퇴법 §3은 "근로자를 사용하는 모든 사업"에 적용된다고 정합니다. 적용 제외 대상은 동거 친족만 사용하는 사업과 가구 내 고용활동(가사사용인) 두 가지뿐입니다. 5인 미만 식당·카페·사무실도 1년·주 15시간 요건만 채우면 퇴직금을 지급해야 합니다.',
  },
  {
    question: '퇴직금은 꼭 IRP 계정으로 받아야 하나요?',
    answer:
      '원칙은 그렇습니다. 근퇴법 §9②는 근로자가 지정한 개인형퇴직연금제도 계정등으로 이전해 지급해야 한다고 정합니다. 다만 55세 이후에 퇴직해 급여를 받는 경우 등 대통령령으로 정한 사유에 해당하면 통장 입금 등 다른 방식으로 받을 수 있습니다. 거래 은행·증권사에서 IRP 계좌를 먼저 만든 뒤 회사에 계좌 번호를 알려주면 됩니다.',
  },
  {
    question: '주 15시간이 안 되거나 들쭉날쭉하면 어떻게 되나요?',
    answer:
      '하루·한 주가 아니라 4주를 평균해 판단합니다. 4주 평균 1주 소정근로시간이 15시간 미만이면 §4① 단서에 따라 퇴직금 대상에서 빠집니다. 바쁜 주와 한가한 주가 섞여 있는 경우 평균이 15시간 이상이면 포함되고, 15시간 이상·미만 기간이 반복되면 미만 기간은 빼고 15시간 이상인 기간만 계속근로기간으로 봅니다(고용노동부 질의회시 실무).',
  },
  {
    question: '1년 미만도 퇴직금을 준다는 뉴스가 있던데 지금 적용되나요?',
    answer:
      '아직 적용되지 않습니다. 1년 미만 근로자에게도 근로일수에 비례해 주는 내용이 담긴 개정안이 2025년 4월 발의됐지만, 2026년 2월 다른 개정안과 하나로 합쳐질 때 그 내용은 빠졌습니다. 그렇게 만들어진 개정 법률(2026년 3월 17일 공포, 법률 제21475호)은 중소기업퇴직연금기금 가입 대상을 넓히고 미지급 처벌을 무겁게 했을 뿐, §4①의 1년·주 15시간 요건은 그대로입니다.',
  },
] as const;

export default function SeverancePayEligibility2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '퇴직금 지급 기준 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '퇴직금 지급 기준 2026, 1년·주 15시간 알바·계약직도 받나',
    description:
      '계속근로 1년 이상, 4주 평균 주 15시간 이상이면 퇴직금 지급 대상. 알바·계약직·5인 미만 사업장 포함 여부, IRP 이전 원칙과 예외, 2026년 10월 현행 조문 기준으로 정리.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: [
      '퇴직금 지급 기준',
      '1년 미만 퇴직금',
      '알바 퇴직금',
      '5인 미만 퇴직금',
      '근로자퇴직급여보장법 4조',
    ],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '퇴직금 지급 기준 2026, 1년·주 15시간 알바·계약직도 받나',
    description:
      '퇴직금 지급 요건과 범위, IRP 이전까지 근로자퇴직급여 보장법 §3·§4·§8·§9 기준으로 정리한 가이드.',
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
              <GuideHeader
                breadcrumbItems={[
                  { name: '홈', href: '/' },
                  { name: '가이드', href: '/guide/' },
                  { name: '퇴직금 지급 기준 2026' },
                ]}
                category="근로"
                readingMinutes={10}
                publishedDate="2026-10-25"
                title="퇴직금 지급 기준 2026"
                subtitle="1년·주 15시간, 알바·계약직도 받나"
                lead={
                  <p data-speakable>
                    <strong>퇴사를 앞두고 "나는 퇴직금을 받을 수 있나" 궁금하신가요?</strong>
                    규정은 간단합니다. 같은 회사에서 1년 이상 계속 일했고, 4주를 평균해 1주에 15시간 이상 일했다면 받습니다.
                    고용 형태가 아르바이트든 계약직이든, 회사가 5명 미만이든 상관없습니다.
                    1년에서 하루 모자라면 못 받고, 주 15시간이 평균적으로 모자라도 못 받습니다.
                    이 가이드는 근로자퇴직급여 보장법 §3·§4·§8·§9를 기준으로 2026년 10월 25일 현재 조문 그대로 어떤 경우에 받고 못 받는지,
                    얼마를 언제 어떤 방식으로 받는지, 그리고 "1년 미만도 준다"는 개정 뉴스가 지금 적용되는지까지 정리했습니다.
                  </p>
                }
              />

              <GuideCalculatorCta slug="severance-pay-eligibility-2026" />

              {/* Structured Summary */}
              <section aria-label="핵심 요약" className="card border-l-4 border-l-primary-500">
                <h2 className="mb-4 text-2xl font-bold text-primary-700 dark:text-primary-300">
                  30초 요약, 지급 기준 한눈에
                </h2>
                <div className="rounded-lg bg-bg-card p-3 text-sm">
                  <p className="font-semibold text-text-primary">정의</p>
                  <p className="mt-1 text-text-secondary" data-speakable>
                    퇴직금은 1년 이상 계속근로 + 4주 평균 주 15시간 이상 근로한 근로자에게 사용자가 지급하는 법정 급여입니다.
                  </p>
                </div>

                <div className="mt-4 overflow-x-auto">
                  <table className="w-full text-sm">
                    <caption className="mb-2 text-left font-semibold text-text-primary">
                      퇴직금 지급 요건 요약표 (근로자퇴직급여 보장법 §3·§4·§8·§9)
                    </caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th className="px-3 py-2 text-left" scope="col">구분</th>
                        <th className="px-3 py-2 text-left" scope="col">내용</th>
                        <th className="px-3 py-2 text-left" scope="col">근거</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="px-3 py-2 font-semibold">계속근로기간</td>
                        <td className="px-3 py-2">1년 이상 (달력 기준, 보통 365일)</td>
                        <td className="px-3 py-2">§4① 단서</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="px-3 py-2 font-semibold">소정근로시간</td>
                        <td className="px-3 py-2">4주 평균 1주 15시간 이상</td>
                        <td className="px-3 py-2">§4① 단서</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="px-3 py-2 font-semibold">사업장 규모</td>
                        <td className="px-3 py-2">제한 없음 (5인 미만 포함)</td>
                        <td className="px-3 py-2">§3 본문</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="px-3 py-2 font-semibold">적용 제외</td>
                        <td className="px-3 py-2">동거 친족만 사용하는 사업, 가구 내 고용활동</td>
                        <td className="px-3 py-2">§3 단서</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="px-3 py-2 font-semibold">지급 공식</td>
                        <td className="px-3 py-2">1일 평균임금 × 30일 × (재직일수 ÷ 365)</td>
                        <td className="px-3 py-2">§8①</td>
                      </tr>
                      <tr>
                        <td className="px-3 py-2 font-semibold">지급 시기·방식</td>
                        <td className="px-3 py-2">퇴직일부터 14일 이내, 원칙 IRP 이전</td>
                        <td className="px-3 py-2">§9①·②</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="mt-4 rounded-lg bg-primary-500/10 p-4 text-sm text-primary-700 dark:text-primary-300">
                  <p className="font-semibold">기억할 네 가지</p>
                  <ul className="mt-2 list-inside list-disc space-y-1">
                    <li><strong>1년 + 주 15시간</strong>, 둘 중 하나라도 못 채우면 법정 퇴직금 0원</li>
                    <li>고용 형태(알바·계약직·일용직)와 <strong>회사 규모는 무관</strong></li>
                    <li>퇴직일부터 <strong>14일 이내</strong> 지급, 늦으면 연 20% 지연이자</li>
                    <li>원칙은 <strong>IRP 계정으로 이전</strong>, 55세 이후 등 대통령령 사유만 예외</li>
                  </ul>
                </div>
              </section>

              {/* 1. 지급 기준 */}
              <section className="space-y-4">
                <h2 className="text-2xl font-bold">1. 퇴직금 지급 기준은 무엇인가요?</h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  두 가지 요건을 동시에 채워야 받습니다. 하나는 같은 사업장에서 1년 이상 계속 근로했을 것, 다른 하나는 4주를 평균해 1주 소정근로시간이 15시간 이상일 것입니다. 근로자퇴직급여 보장법 §4①은 사용자가 퇴직하는 근로자에게 퇴직급여제도 중 하나 이상을 설정해야 한다고 정하면서, 단서로 "계속근로기간이 1년 미만인 근로자, 4주간을 평균하여 1주간의 소정근로시간이 15시간 미만인 근로자에 대하여는 그러하지 아니하다"고 적시합니다. 이 두 요건이 법정 퇴직금 지급의 입구입니다.
                </p>
                <p className="text-text-secondary leading-relaxed">
                  계속근로기간은 입사일부터 마지막 근무일까지 끊김 없이 이어진 기간을 뜻합니다. 퇴직일은 "마지막 근무일 다음 날"이며, 재직일수를 셀 때는 마지막 근무일까지를 포함합니다. 소정근로시간은 사용자와 근로자가 일하기로 정한 시간을 말하며, 실제 더 많이 일했다 적게 일했다 하는 날이 섞여 있어도 평균이 기준입니다.
                </p>
                <div className="rounded-lg bg-bg-raised p-4 text-sm text-text-secondary">
                  <p className="font-semibold text-text-primary">한눈에 보기</p>
                  <ul className="mt-2 list-inside list-disc space-y-1">
                    <li>1년 이상 재직 + 4주 평균 주 15시간 이상 = 지급 대상</li>
                    <li>둘 중 하나라도 못 채우면 법정 퇴직금은 0원</li>
                    <li>단, 회사 취업규칙이나 근로계약으로 더 유리하게 정했다면 그에 따름</li>
                  </ul>
                </div>
                <p className="text-text-secondary leading-relaxed">
                  다만, 사업장의 취업규칙이나 단체협약이 법보다 더 유리한 조건을 두는 경우도 있습니다. 예를 들어 "6개월 근무자에게도 1개월분 급여를 지급한다"고 규정하면 그 규정이 우선합니다. 법은 하한선일 뿐이고, 그 아래로 깎는 특약은 효력이 없습니다.
                </p>
              </section>

              {/* 2. 1년 모자라면 */}
              <section className="space-y-4">
                <h2 className="text-2xl font-bold">2. 1년에서 하루라도 모자라면 못 받나요?</h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  네, 법정 퇴직금은 받지 못합니다. 재직일수가 364일이라도 1년 미만이기 때문에 §4① 단서가 그대로 적용됩니다. 입사일과 퇴직일을 계산기로 세보면 체감보다 하루 이틀 모자란 경우가 많습니다. 퇴사 날짜를 정할 수 있다면 입사일로부터 1년이 되는 날의 전날까지 일하는지 꼭 확인하세요. 1년 사이에 2월 29일이 끼면 366일이 필요합니다.
                </p>

                <div className="rounded-lg bg-bg-card p-4 text-sm text-text-secondary">
                  <p className="font-semibold text-text-primary">사례 비교, 하루 차이의 결과</p>
                  <div className="mt-2 space-y-3">
                    <div className="rounded-lg bg-bg-raised p-3">
                      <p className="font-semibold text-text-primary">사례 B. 입사 2025-11-01, 마지막 근무 2026-10-31, 월급 250만 원</p>
                      <ul className="mt-2 list-inside list-disc space-y-1">
                        <li>재직일수: 365일 (딱 1년)</li>
                        <li>직전 3개월(92일) 임금 750만 원 ÷ 92일 = 1일 평균임금 81,521.74원</li>
                        <li>퇴직금 = 81,521.74원 × 30일 × (365 ÷ 365) = <strong>2,445,652원</strong></li>
                        <li>퇴직소득세 18,690원 + 지방소득세 1,860원 = 20,550원, 세후 2,425,102원</li>
                      </ul>
                    </div>
                    <div className="rounded-lg bg-bg-raised p-3">
                      <p className="font-semibold text-text-primary">사례 C. 같은 조건에서 마지막 근무가 2026-10-30</p>
                      <ul className="mt-2 list-inside list-disc space-y-1">
                        <li>재직일수: 364일 (1년 미만)</li>
                        <li>퇴직금: <strong>0원</strong></li>
                        <li>한 번 산정한 평균임금과는 무관, §4① 단서로 지급 대상 자체가 아님</li>
                      </ul>
                    </div>
                  </div>
                  <p className="mt-3 text-xs text-text-tertiary">
                    위 수치는 상여·연차수당을 반영하지 않은 평균임금 기준, 원 단위 반올림(계산기 기준). 실제 금액은{' '}
                    <Link href="/calculator/severance/" className="text-primary-600 underline dark:text-primary-500">
                      퇴직금 계산기
                    </Link>
                    에서 조건을 넣어 확인하세요.
                  </p>
                </div>

                <p className="text-text-secondary leading-relaxed">
                  다만, 1년이 하루 모자란 경우에도 회사가 자체 규정으로 지급하거나, 노사 합의로 월할 지급하는 경우가 있습니다. 또 "실질적으로 1년을 넘겼는지"가 다툼이 될 때는 입사일이 적힌 근로계약서, 4대보험 자격 취득일, 급여 명세, 출퇴근 기록을 모아 노동청에 상담하면 됩니다.
                </p>
              </section>

              {/* 3. 알바·계약직 */}
              <section className="space-y-4">
                <h2 className="text-2xl font-bold">3. 알바·계약직·일용직도 받나요?</h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  네, 받습니다. 법은 "근로자" 여부만 보고 고용 형태의 이름은 묻지 않습니다. 아르바이트, 계약직, 일용직, 수습 기간 중인 직원 모두 1년 + 주 15시간 요건을 채우면 법정 퇴직금 대상입니다. 사용자가 "너는 알바라서 안 준다"거나 "계약직이라 안 준다"고 해도 그 자체로는 지급 의무를 피할 수 없습니다.
                </p>

                <div className="rounded-lg bg-bg-card p-4 text-sm text-text-secondary">
                  <p className="font-semibold text-text-primary">사례 D. 주 20시간 아르바이트, 월 107만 원</p>
                  <ul className="mt-2 list-inside list-disc space-y-1">
                    <li>입사 2024-11-01, 마지막 근무 2026-10-31, 재직 730일</li>
                    <li>직전 3개월 임금 321만 원 ÷ 92일 = 1일 평균임금 34,891.30원</li>
                    <li>퇴직금 = 34,891.30원 × 30일 × (730 ÷ 365) = <strong>2,093,478원</strong></li>
                    <li>퇴직소득세: 0원 (근속연수공제 200만 원을 빼고 환산한 급여 약 56만 원이 환산급여공제로 전액 공제돼 과세표준 0원)</li>
                  </ul>
                  <p className="mt-3 text-xs text-text-tertiary">
                    1일 평균임금은 상여·연차수당 미반영 기준. 세금은{' '}
                    <Link href="/guide/retirement-income-tax-2026/" className="text-primary-600 underline dark:text-primary-500">
                      퇴직소득세 가이드
                    </Link>
                    참조.
                  </p>
                </div>

                <p className="text-text-secondary leading-relaxed">
                  다만, 명시적으로 사업자등록을 하고 프리랜서로 용역 계약을 맺은 경우는 다릅니다. 세법상 사업소득자(3.3% 원천)로 처리됐더라도 실질이 근로자이면 퇴직금을 받을 수 있으므로, 지시·감독의 정도, 출퇴근 시간, 겸업 가능 여부, 보수 지급 방식을 종합해 판단합니다. 실질이 다툼이 되면 노동청에 "근로자성 판단"을 포함해 진정을 넣을 수 있습니다.
                </p>
              </section>

              {/* 4. 주 15시간 */}
              <section className="space-y-4">
                <h2 className="text-2xl font-bold">4. 주 15시간이 안 되면 어떻게 되나요?</h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  4주를 평균해 1주 소정근로시간이 15시간 미만이면 법정 퇴직금 대상에서 빠집니다. 하루나 한 주 기준이 아니라 4주 평균이기 때문에, 바쁜 주와 한가한 주가 섞여 있어도 평균만 15시간 이상이면 포함됩니다. 반대로 평균이 미만이면 아무리 어떤 주에 20시간을 넘겼더라도 그 기간은 제외됩니다.
                </p>
                <div className="rounded-lg bg-bg-raised p-4 text-sm text-text-secondary">
                  <p className="font-semibold text-text-primary">15시간 기준 적용 요령</p>
                  <ul className="mt-2 list-inside list-disc space-y-1">
                    <li>기본 단위: 4주 평균 소정근로시간</li>
                    <li>소정근로시간은 "일하기로 정한 시간"이며, 실제 더 일한 연장시간은 별도</li>
                    <li>15시간 이상인 기간과 미만인 기간이 번갈아 반복되면, 미만 기간은 빼고 15시간 이상 기간만 계속근로기간으로 계산 (고용노동부 질의회시 실무)</li>
                    <li>초단시간 근로자(주 15시간 미만)는 주휴수당·연차·퇴직금 모두 대상 아님</li>
                  </ul>
                </div>
                <p className="text-text-secondary leading-relaxed">
                  다만, 처음부터 끝까지 평균 주 15시간 미만이면 법정 퇴직금은 지급 의무가 없지만, 근로계약·취업규칙에서 더 유리하게 정했다면 그 조항은 유효합니다. 자세한 초단시간 근로자 권리와 주 15시간 경계 판단은{' '}
                  <Link href="/guide/ultra-short-time-worker-rights-2026/" className="text-primary-600 underline dark:text-primary-500">
                    초단시간 근로자 가이드
                  </Link>
                  와{' '}
                  <Link href="/calculator/weekly-holiday-allowance/" className="text-primary-600 underline dark:text-primary-500">
                    주휴수당 계산기
                  </Link>
                  를 함께 보세요.
                </p>
              </section>

              {/* 5. 5인 미만 */}
              <section className="space-y-4">
                <h2 className="text-2xl font-bold">5. 5인 미만 회사도 퇴직금을 줘야 하나요?</h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  네, 사업장 규모와 상관없이 지급해야 합니다. 근퇴법 §3은 이 법이 근로자를 사용하는 모든 사업 또는 사업장에 적용된다고 정하고, 단서로 동거하는 친족만을 사용하는 사업과 가구 내 고용활동 두 가지만 뺍니다. 즉, 적용에서 빠지는 경우는 가족만 쓰는 가게와 가정에서 쓰는 가사도우미뿐이고, 5인 미만 식당·카페·소규모 사무실·공장은 모두 적용 대상입니다.
                </p>
                <div className="rounded-lg bg-bg-raised p-4 text-sm text-text-secondary">
                  <p className="font-semibold text-text-primary">근퇴법 §3 적용·비적용 정리</p>
                  <table className="mt-3 w-full text-sm">
                    <caption className="sr-only">근로자퇴직급여 보장법 §3 적용 대상 비교</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th className="px-2 py-2 text-left" scope="col">사업장 유형</th>
                        <th className="px-2 py-2 text-left" scope="col">적용 여부</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="px-2 py-2">5인 미만 식당·카페·사무실</td>
                        <td className="px-2 py-2">적용 (요건 충족 시 퇴직금 지급 의무)</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="px-2 py-2">1인 사장과 가족만 일하는 가게 (동거 친족만)</td>
                        <td className="px-2 py-2">비적용</td>
                      </tr>
                      <tr>
                        <td className="px-2 py-2">가정 내 가사·육아 도우미 (가구 내 고용활동)</td>
                        <td className="px-2 py-2">비적용</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-text-secondary leading-relaxed">
                  다만, 5인 미만 사업장은 근로기준법의 일부 조항(연장·휴일·야간수당 가산율, 부당해고 구제 등)이 적용되지 않습니다. 하지만 퇴직금은 근퇴법에 따로 규정되어 있어 사업장 규모와 무관하게 지급해야 합니다. 두 법을 섞어 "5인 미만이라 퇴직금도 없다"고 설명하는 경우가 많은데, 이는 사실이 아닙니다.
                </p>
              </section>

              {/* 6. 계약 쪼개기·수습·육아휴직 */}
              <section className="space-y-4">
                <h2 className="text-2xl font-bold">6. 계약을 쪼개거나 수습·육아휴직이 있으면 어떻게 되나요?</h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  11개월짜리 계약을 반복해 1년을 피하는 방식은 실제로는 통하지 않는 경우가 많습니다. 중간에 공백이 짧고 사용자가 계속해서 같은 일을 지시한 사실관계라면 노동청·법원은 "계속근로기간"으로 묶어 인정하는 경향입니다. 반대로 명시적 사직서 제출, 상당한 공백, 업무 성격 변화가 있으면 끊긴 것으로 봅니다.
                </p>
                <div className="rounded-lg bg-bg-raised p-4 text-sm text-text-secondary">
                  <p className="font-semibold text-text-primary">계속근로 판단에 자주 나오는 상황</p>
                  <ul className="mt-2 list-inside list-disc space-y-1">
                    <li><strong>수습 기간:</strong> 수습·시용 기간도 계속근로기간에 들어갑니다</li>
                    <li><strong>육아휴직 기간:</strong> 근속기간에 포함됩니다(남녀고용평등법 §19④). 평균임금을 셀 때는 그 기간과 그동안 받은 임금을 뺍니다</li>
                    <li><strong>업무상 부상·질병 요양:</strong> 평균임금 산정 기간에서 뺍니다. 개인 사정 휴직이 근속기간에 들어가는지는 회사 규정과 사유에 따라 달라 확인이 필요합니다</li>
                    <li><strong>11개월 쪼개기:</strong> 공백이 짧고 사실상 연속이면 묶어서 계속근로로 인정 가능</li>
                    <li><strong>사업 양도·법인 전환:</strong> 포괄 승계 시 전후 기간 통산</li>
                  </ul>
                </div>
                <p className="text-text-secondary leading-relaxed">
                  다만, 평균임금을 셀 때는 수습 기간, 육아휴직, 업무상 부상·질병 요양 등으로 쉰 기간과 그동안 받은 임금을 3개월 산정 기간에서 뺍니다(근로기준법 시행령 §2①). 휴직으로 임금이 적었던 기간이 평균임금을 끌어내리지 않게 하려는 것입니다. 평균임금과 통상임금 중 어느 쪽이 유리한지는{' '}
                  <Link href="/guide/average-wage-vs-ordinary-wage-2026/" className="text-primary-600 underline dark:text-primary-500">
                    평균임금 vs 통상임금 가이드
                  </Link>
                  에서 더 자세히 다룹니다.
                </p>
              </section>

              {/* 7. 얼마·언제·어떻게 */}
              <section className="space-y-4">
                <h2 className="text-2xl font-bold">7. 퇴직금은 얼마를, 언제, 어떻게 받나요?</h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  법정 공식은 "1일 평균임금 × 30일 × (재직일수 ÷ 365)"입니다. 근퇴법 §8①은 "계속근로기간 1년에 대하여 30일분 이상의 평균임금을 퇴직금으로" 지급할 수 있는 제도를 설정하라고 정하며, 평균임금은 근로기준법 §2① 제6호에 따라 산정 사유 발생 직전 3개월 임금 총액을 그 기간 총일수로 나눈 금액입니다.
                </p>

                <div className="rounded-lg bg-bg-card p-4 text-sm text-text-secondary">
                  <p className="font-semibold text-text-primary">사례 A. 재직 3년, 월급 300만 원</p>
                  <ul className="mt-2 list-inside list-disc space-y-1">
                    <li>입사 2023-11-01, 마지막 근무 2026-10-31, 재직 1,096일</li>
                    <li>직전 3개월(92일) 임금 900만 원 ÷ 92일 = 1일 평균임금 97,826.09원</li>
                    <li>퇴직금 = 97,826.09원 × 30일 × (1,096 ÷ 365) = <strong>8,812,388원</strong></li>
                    <li>퇴직소득세 91,490원 + 지방소득세 9,140원 = 100,630원</li>
                    <li>세후 실수령: <strong>8,711,758원</strong></li>
                  </ul>
                  <p className="mt-3 text-xs text-text-tertiary">
                    상여·연차수당·기타 수당 미반영, 평균임금 기준, 원 단위 반올림(계산기 기준). 조건별 정확 금액은{' '}
                    <Link href="/calculator/severance/" className="text-primary-600 underline dark:text-primary-500">
                      퇴직금 계산기
                    </Link>
                    에서.
                  </p>
                </div>

                <p className="text-text-secondary leading-relaxed">
                  <strong>지급 시기</strong>는 퇴직일(마지막 근무일 다음 날)부터 <strong>14일 이내</strong>입니다(§9①). 특별한 사정이 있으면 당사자 합의로 지급기일을 미룰 수 있습니다(§9① 단서). 14일 안에 주지 않으면 그다음 날부터 실제로 줄 때까지 연 20% 지연이자가 붙고(근로기준법 §37, 시행령 §17), 끝내 주지 않으면 사업주는 5년 이하 징역 또는 5천만 원 이하 벌금 대상입니다(근퇴법 §43 제1호, 2026년 9월 18일 시행). 지연이자 계산과 신고 절차는{' '}
                  <Link href="/guide/severance-pay-deadline-14-days-2026/" className="text-primary-600 underline dark:text-primary-500">
                    퇴직금 14일 지급기한 가이드
                  </Link>
                  에 정리돼 있습니다.
                </p>
                <p className="text-text-secondary leading-relaxed">
                  <strong>지급 방식</strong>은 §9② 원칙에 따라 근로자가 지정한 개인형퇴직연금제도(IRP) 계정등으로 이전해 지급합니다. 55세 이후 퇴직해 급여를 받는 경우 등 대통령령으로 정한 사유에 해당하면 통장 입금 등 다른 방식도 가능합니다. 그래서 퇴사 전에 거래하는 은행·증권사에서 IRP 계좌를 미리 만들어 두고, 회사에 계좌 번호를 알려주는 것이 좋습니다.
                </p>
                <div className="rounded-lg bg-bg-raised p-4 text-sm text-text-secondary">
                  <p className="font-semibold text-text-primary">퇴직금 받는 과정 요약</p>
                  <ol className="mt-2 list-inside list-decimal space-y-1">
                    <li>퇴사 전 IRP 계좌 개설 (은행·증권사 모바일 앱으로 당일 가능)</li>
                    <li>회사에 IRP 계좌 번호 통보, 사직서·근로계약 종료 서류 정리</li>
                    <li>퇴직일부터 14일 이내 IRP로 입금 확인</li>
                    <li>IRP에서 바로 인출하거나, 연금으로 수령해 세금 혜택</li>
                  </ol>
                </div>
              </section>

              {/* 8. 1년 미만 개정 뉴스 */}
              <section className="space-y-4">
                <h2 className="text-2xl font-bold">8. 1년 미만도 준다는 뉴스, 지금 적용되나요?</h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  아직 적용되지 않습니다. 2026년 10월 25일 현재 §4①의 "1년 미만 근로자는 그러하지 아니하다"는 단서는 그대로 유효합니다. 2025년 4월 15일 국회에 발의된 개정안(의안번호 2209825)에는 퇴직급여제도 설정 대상을 계속근로 3개월 이상으로 넓히고 1년 미만 근로자에게 근로일수에 비례해 줄 수 있게 하는 내용이 들어 있었습니다. 하지만 이 안은 2026년 2월 다른 개정안들과 하나의 위원회 대안으로 합쳐지면서 폐기됐고(대안반영폐기), 그 대안에는 1년 미만 지급 내용이 들어가지 않았습니다. 논의는 이어질 수 있지만, 법이 바뀌어 시행되기 전까지는 현행 조문이 기준입니다.
                </p>
                <p className="text-text-secondary leading-relaxed">
                  그 대안이 2026년 3월 17일 공포된 법률 제21475호입니다. 중소기업퇴직연금기금 가입 대상을 상시근로자 30명 이하에서 100명 미만으로 단계적으로 넓히고(2027년 1월부터 100명 미만), 퇴직금 미지급 처벌을 5년 이하 징역 또는 5천만 원 이하 벌금으로 무겁게 했습니다. 시행은 2026년 7월 1일, 벌칙 조항은 9월 18일부터입니다. 퇴직금을 받는 요건(§4①)은 바뀌지 않았습니다.
                </p>
                <div className="rounded-lg bg-bg-raised p-4 text-sm text-text-secondary">
                  <p className="font-semibold text-text-primary">지금 아는 범위에서 확실한 것</p>
                  <ul className="mt-2 list-inside list-disc space-y-1">
                    <li>법정 퇴직금은 여전히 1년 이상 + 주 15시간 이상 요건</li>
                    <li>2026-03-17 공포 개정은 중소기업퇴직연금기금 확대와 미지급 처벌 강화, 지급 요건 변경 아님</li>
                    <li>1년 미만 비례 지급을 담은 2025년 4월 개정안은 대안에 합쳐지며 폐기, 그 내용은 반영 안 됨</li>
                    <li>개정이 통과·시행되면 본문 날짜(2026-10-25)를 함께 갱신</li>
                  </ul>
                </div>
                <p className="text-text-secondary leading-relaxed">
                  다만, 1년 미만이라도 회사가 취업규칙이나 근로계약으로 주기로 정했다면 그 약속대로 받을 수 있습니다. 퇴직연금(DB·DC)에 가입한 회사라도 법이 정한 받을 자격은 같습니다. 두 제도의 차이는{' '}
                  <Link href="/guide/severance-vs-pension-dc-db/" className="text-primary-600 underline dark:text-primary-500">
                    DC vs DB 퇴직연금 비교 가이드
                  </Link>
                  를 참고하세요.
                </p>
              </section>

              {/* FAQ */}
              <FaqSection items={[...FAQ_ITEMS]} />

              {/* 관련 계산기·가이드 */}
              <section className="card">
                <h2 className="mb-4 text-lg font-semibold">관련 계산기·가이드</h2>
                <ul className="space-y-2 text-sm">
                  <li>
                    →{' '}
                    <Link href="/calculator/severance/" className="text-primary-600 underline dark:text-primary-500">
                      퇴직금 계산기
                    </Link>
                    , 근속연수·평균임금 넣고 퇴직금과 세금까지 바로 계산
                  </li>
                  <li>
                    →{' '}
                    <Link href="/guide/severance-pay-deadline-14-days-2026/" className="text-primary-600 underline dark:text-primary-500">
                      퇴직금 지급기한 14일 가이드
                    </Link>
                    , 14일 넘으면 붙는 연 20% 지연이자와 노동청 신고 절차
                  </li>
                  <li>
                    →{' '}
                    <Link href="/guide/ultra-short-time-worker-rights-2026/" className="text-primary-600 underline dark:text-primary-500">
                      초단시간 근로자 권리 가이드
                    </Link>
                    , 주 15시간 미만 근로자의 주휴·연차·4대보험 적용 범위
                  </li>
                  <li>
                    →{' '}
                    <Link href="/guide/average-wage-vs-ordinary-wage-2026/" className="text-primary-600 underline dark:text-primary-500">
                      평균임금 vs 통상임금
                    </Link>
                    , 퇴직금 계산에 쓰이는 두 임금 개념의 차이
                  </li>
                  <li>
                    →{' '}
                    <Link href="/guide/retirement-income-tax-2026/" className="text-primary-600 underline dark:text-primary-500">
                      퇴직소득세 계산 가이드
                    </Link>
                    , 연분연승법으로 떼는 퇴직소득세 산출 방법
                  </li>
                  <li>
                    →{' '}
                    <Link href="/guide/retirement-pay-interim-settlement-2026/" className="text-primary-600 underline dark:text-primary-500">
                      퇴직금 중간정산 가이드
                    </Link>
                    , 중간정산 사유와 절차, 그 이후 근속연수 재계산
                  </li>
                  <li>
                    →{' '}
                    <Link href="/calculator/weekly-holiday-allowance/" className="text-primary-600 underline dark:text-primary-500">
                      주휴수당 계산기
                    </Link>
                    , 주 15시간 경계 판단과 함께 보면 좋은 도구
                  </li>
                </ul>
              </section>

              <ShareButtons
                title="퇴직금 지급 기준 2026, 1년·주 15시간 알바·계약직도 받나"
                url={URL}
                description="퇴직금은 1년 이상, 주 15시간 이상 근로자가 받습니다. 알바·계약직·5인 미만 사업장 포함 여부, IRP 이전까지 §4·§8·§9 기준 정리."
              />

              {/* 출처 및 면책 */}
              <section
                aria-label="출처 및 면책"
                className="rounded-lg border border-border-base p-4 text-caption text-text-tertiary"
              >
                <p className="mb-2">
                  <strong>참고 법령 및 공식 출처</strong>:{' '}
                  <a
                    href="https://www.law.go.kr/"
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="text-primary-600 underline dark:text-primary-500"
                  >
                    국가법령정보센터 (law.go.kr)
                  </a>
                  ,{' '}
                  <a
                    href="https://easylaw.go.kr/"
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="text-primary-600 underline dark:text-primary-500"
                  >
                    찾기 쉬운 생활법령 (easylaw.go.kr)
                  </a>
                  ,{' '}
                  <a
                    href="https://www.moel.go.kr/"
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="text-primary-600 underline dark:text-primary-500"
                  >
                    고용노동부 (moel.go.kr)
                  </a>
                  .
                </p>
                <p className="mb-2">
                  <strong>면책조항</strong>: 본 가이드는 교육 목적의 정보 제공이며 개별 노무·법률 자문이 아닙니다. 계속근로기간 산정, 평균임금 산정에서 빼는 기간, 11개월 쪼개기 계약의 계속근로 인정 여부는 구체적 사실관계에 따라 결론이 달라지므로 고용노동부 상담센터(국번 없이 1350) 또는 공인노무사·변호사와 상담하세요. 본 콘텐츠는 2026-10-25 기준이며, 법령 개정 시 날짜를 함께 갱신합니다. 인용 조문은 <strong>근로자퇴직급여 보장법 §3(적용범위)·§4①(퇴직급여제도의 설정)·§8①(퇴직금제도의 설정 등)·§9①·②(퇴직금의 지급 등)·§43(벌칙)</strong>,{' '}
                  <strong>근로기준법 §2①제6호(평균임금 정의)·§37(미지급 임금 지연이자)·시행령 §2①(평균임금 산정 제외 기간)</strong>,{' '}
                  <strong>남녀고용평등과 일·가정 양립 지원에 관한 법률 §19④(육아휴직 기간의 근속 포함)</strong>입니다.
                </p>
                <p>업데이트: {DATE_MODIFIED}</p>
              </section>
            </article>
          </main>
        </div>
        <Footer />
      </div>
    </>
  );
}
