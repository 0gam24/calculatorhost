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

const URL = 'https://calculatorhost.com/guide/very-short-time-worker-15-hours-2026/';
const DATE_PUBLISHED = '2026-08-10';
const DATE_MODIFIED = '2026-08-10';

export const metadata: Metadata = {
  title: '초단시간 근로자 2026, 주 15시간 미만 주휴·퇴직금·4대보험',
  description:
    '주 15시간 미만으로 일하는 초단시간 근로자는 주휴수당과 퇴직금, 연차가 원칙적으로 적용되지 않습니다. 4대보험 가입 여부, 최저임금·근로계약서처럼 그래도 적용되는 권리, 여러 곳에서 일할 때 합산 여부를 근로기준법 §18로 정리했습니다.',
  keywords: [
    '초단시간 근로자',
    '주 15시간 미만 주휴수당',
    '초단시간 퇴직금',
    '초단시간 4대보험',
    '단시간 근로자',
    '초단시간 최저임금',
    '근로기준법 18조',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '초단시간 근로자 2026, 주 15시간 미만 주휴·퇴직금·4대보험' }],
    title: '초단시간 근로자 2026, 주 15시간 미만의 권리 총정리',
    description: '주휴·퇴직금·연차는 원칙 제외, 최저임금·근로계약서는 그대로. 4대보험 기준까지.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '초단시간 근로자 2026, 주 15시간 미만 권리',
    description: '근로기준법 §18③, 퇴직급여법 §4. 주휴·퇴직금·4대보험 적용 여부 정리.',
  },
};

const FAQ_ITEMS = [
  {
    question: '초단시간 근로자가 정확히 무엇인가요?',
    answer:
      '4주를 평균해 1주 소정근로시간이 15시간 미만인 근로자를 초단시간 근로자라고 합니다. 여기서 소정근로시간은 근로계약으로 정한 일하기로 한 시간이며, 실제로 더 일한 연장근로는 포함하지 않습니다. 4주 평균이 15시간 미만이면 초단시간에 해당해 근로기준법의 일부 규정이 적용되지 않습니다(근로기준법 §18③).',
  },
  {
    question: '초단시간도 주휴수당을 받나요?',
    answer:
      '원칙적으로 받지 않습니다. 주휴수당은 4주 평균 1주 소정근로시간이 15시간 이상이고 소정근로일을 개근했을 때 발생합니다. 초단시간 근로자는 근로기준법 §55(주휴일) 적용에서 제외되므로(§18③) 주휴수당 지급 의무가 없습니다. 반대로 15시간 이상이면 초단시간이 아니어서 주휴수당이 발생합니다.',
  },
  {
    question: '초단시간 근로자도 퇴직금을 받을 수 있나요?',
    answer:
      '원칙적으로 받지 못합니다. 근로자퇴직급여 보장법 §4① 단서는 4주 평균 1주 소정근로시간이 15시간 미만인 근로자를 퇴직급여 적용 대상에서 제외합니다. 다만 근무 기간 중 일부 기간만 15시간 이상이었다면 그 기간을 따로 따져야 할 수 있으므로, 소정근로시간이 오르내렸다면 고용노동부나 노무사에게 확인하는 것이 좋습니다.',
  },
  {
    question: '초단시간 근로자는 4대보험에 가입하나요?',
    answer:
      '보험마다 기준이 다릅니다. 건강보험과 국민연금은 월 소정근로시간이 60시간 미만이면 원칙적으로 적용 제외입니다. 고용보험도 월 60시간 미만이면 원칙적으로 적용되지 않지만, 3개월 이상 계속 근로하면 적용될 수 있습니다. 산재보험은 근로시간과 무관하게 모든 근로자에게 적용됩니다. 개별 사업장 상황은 국민건강보험공단·근로복지공단에 확인하세요.',
  },
  {
    question: '초단시간도 최저임금과 근로계약서는 적용되나요?',
    answer:
      '네, 적용됩니다. 최저임금은 근로시간과 관계없이 모든 근로자에게 적용되므로 초단시간 근로자도 시급이 최저임금 이상이어야 합니다. 근로계약서 작성·교부 의무(근로기준법 §17)도 그대로 적용되어, 사용자는 근로조건을 서면으로 명시해 교부해야 합니다. 이를 어기면 사용자가 처벌·과태료 대상이 됩니다.',
  },
  {
    question: '초단시간 근로자도 연차휴가가 있나요?',
    answer:
      '없습니다. 연차 유급휴가(근로기준법 §60)는 초단시간 근로자에게 적용되지 않습니다(§18③). 다만 이는 소정근로시간이 15시간 미만인 경우이며, 15시간 이상 단시간 근로자라면 통상근로자의 근로시간에 비례해 연차가 부여됩니다.',
  },
  {
    question: '여러 곳에서 초단시간으로 일하면 시간이 합산되나요?',
    answer:
      '주휴·퇴직금 같은 근로기준법상 판단은 원칙적으로 사업장별로 이뤄집니다. 즉 A 카페에서 주 10시간, B 편의점에서 주 10시간을 일해도 각 사업장 기준으로 15시간 미만이면 각각 초단시간으로 봅니다. 반면 국민연금·건강보험은 소득 기준 등 별도 규정이 있어 판단이 다를 수 있으니, 두 곳 이상 근무 시에는 공단에 확인하는 것이 정확합니다.',
  },
  {
    question: '초단시간 근로자도 실업급여를 받을 수 있나요?',
    answer:
      '고용보험에 가입되어 있고 피보험 단위기간 등 수급 요건을 충족하면 가능합니다. 초단시간이라도 3개월 이상 계속 근로해 고용보험이 적용되면 피보험 기간이 쌓입니다. 다만 요건 충족 여부는 개인별로 달라 근로복지공단·고용센터에서 확인해야 합니다.',
  },
];

export default function VeryShortTimeWorker2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '초단시간 근로자 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '초단시간 근로자 2026, 주 15시간 미만 주휴·퇴직금·4대보험',
    description:
      '주 15시간 미만 초단시간 근로자의 주휴수당·퇴직금·연차 적용 여부와 4대보험 가입 기준, 그래도 적용되는 최저임금·근로계약서 권리를 근로기준법 §18과 퇴직급여법 §4로 정리했습니다.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['초단시간 근로자', '주 15시간 미만', '주휴수당', '퇴직금', '근로기준법 18조'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '초단시간 근로자 2026',
    description:
      '주 15시간 미만 초단시간 근로자의 주휴·퇴직금·연차·4대보험 적용 여부를 근로기준법 조문으로 정리한 가이드.',
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
                    { name: '초단시간 근로자 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">단시간 근로자 · 8분 읽기 · 2026-08-10</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  초단시간 근로자 2026
                  <br />
                  <span className="text-2xl text-text-secondary">주 15시간 미만 주휴·퇴직금·4대보험</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  주 15시간 미만으로 일하는 아르바이트생이나 단시간 근로자라면, 주휴수당과 퇴직금을 받을 수 있는지 늘 헷갈립니다. 이 가이드는 초단시간 근로자를 위해 주휴·퇴직금·연차가 원칙적으로 적용되지 않는 이유, 4대보험 가입 여부, 그럼에도 반드시 지켜지는 최저임금과 근로계약서 권리, 여러 곳에서 일할 때의 합산 문제를 근로기준법 조문에 근거해 정리합니다.
                </p>
              </header>

              <AdSlot slot="guide-very-short-time-worker-15-hours-2026-top" format="horizontal" />

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">초단시간 근로자가 무엇인가요?</h2>
                <p>
                  4주를 평균해 1주 소정근로시간이 15시간 미만인 근로자를 말합니다. 여기서 소정근로시간은 근로계약으로 정한 일하기로 한 시간이며, 그때그때 더 일한 연장근로는 포함하지 않습니다.
                </p>
                <p>
                  판단은 특정 한 주가 아니라 4주 평균으로 합니다. 어떤 주는 16시간, 다른 주는 12시간이었더라도 4주 평균이 15시간 미만이면 초단시간에 해당합니다. 초단시간에 해당하면 근로기준법의 일부 보호 규정이 적용에서 빠집니다(근로기준법 §18③).
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">판단 기준 요약</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    · 기준 시간: 4주 평균 1주 소정근로시간 15시간
                    <br />
                    · 15시간 미만: 초단시간 (주휴·퇴직금·연차 원칙 제외)
                    <br />
                    · 15시간 이상: 일반 단시간 (통상근로자에 비례해 보호)
                    <br />
                    · 포함 안 함: 연장·야간 등 소정근로시간 밖의 추가 근무
                  </p>
                </div>
                <p>
                  다만 소정근로시간이 자주 바뀐다면 어느 기간이 초단시간인지 다툼이 생길 수 있으므로, 근로계약서에 소정근로시간을 명확히 적어두는 것이 중요합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">주휴수당과 퇴직금은 받을 수 있나요?</h2>
                <p>
                  둘 다 원칙적으로 받지 못합니다. 주휴수당은 4주 평균 1주 소정근로시간이 15시간 이상이어야 발생하는데, 초단시간은 이 기준에 못 미치고 주휴일 규정 적용에서도 제외됩니다(근로기준법 §18③, §55). 퇴직금 역시 근로자퇴직급여 보장법 §4① 단서에 따라 4주 평균 1주 15시간 미만 근로자는 적용 대상에서 빠집니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 초단시간 vs 15시간 이상 단시간 근로자 권리 비교</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">항목</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">초단시간(15시간 미만)</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">15시간 이상 단시간</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">주휴수당</td>
                        <td className="p-3">원칙 없음</td>
                        <td className="p-3">개근 시 발생</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">퇴직금</td>
                        <td className="p-3">원칙 없음</td>
                        <td className="p-3">1년 이상 근무 시 발생</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">연차휴가</td>
                        <td className="p-3">원칙 없음</td>
                        <td className="p-3">비례 부여</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">최저임금</td>
                        <td className="p-3">적용</td>
                        <td className="p-3">적용</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">근로계약서</td>
                        <td className="p-3">작성·교부 의무</td>
                        <td className="p-3">작성·교부 의무</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p>
                  예외: 근무 도중 소정근로시간이 15시간 이상으로 늘어난 기간이 있었다면 그 기간은 다르게 판단될 수 있습니다. 시간이 오르내린 경우에는 고용노동부 상담(국번 없이 1350)이나 노무사에게 확인하세요.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">4대보험은 어떻게 되나요?</h2>
                <p>
                  보험 종류마다 기준이 다릅니다. 근로시간과 소득에 따라 적용 여부가 갈리므로 하나씩 확인해야 합니다.
                </p>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li>
                    <strong>건강보험·국민연금:</strong> 월 소정근로시간이 60시간 미만이면 원칙적으로 적용 제외입니다. 다만 국민연금은 복수 사업장 소득 등 별도 기준으로 가입 대상이 될 수 있습니다.
                  </li>
                  <li>
                    <strong>고용보험:</strong> 월 60시간 미만이면 원칙적으로 적용되지 않지만, 3개월 이상 계속 근로하면 적용될 수 있습니다.
                  </li>
                  <li>
                    <strong>산재보험:</strong> 근로시간과 무관하게 모든 근로자에게 적용됩니다. 일하다 다치면 초단시간이라도 산재 보상을 받을 수 있습니다.
                  </li>
                </ul>
                <p>
                  다만 4대보험 적용 여부는 사업장 신고와 개별 요건에 따라 달라집니다. 정확한 가입 여부는 국민건강보험공단, 국민연금공단, 근로복지공단에 확인하는 것이 안전합니다.
                </p>
              </section>

              <AdSlot slot="guide-very-short-time-worker-15-hours-2026-mid" format="rectangle" />

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">초단시간이어도 반드시 지켜지는 권리</h2>
                <p>
                  일부 규정이 빠진다고 해서 아무 보호가 없는 것은 아닙니다. 근로시간과 무관하게 지켜져야 하는 권리가 분명히 있습니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3">
                  <p className="font-semibold text-text-primary">초단시간에도 적용되는 것</p>
                  <p className="text-sm text-text-secondary">
                    · 최저임금: 근로시간 무관, 시급이 최저임금 이상이어야 함
                    <br />
                    · 근로계약서: 작성·서면 교부 의무(근로기준법 §17), 위반 시 사용자 처벌
                    <br />
                    · 임금 전액·정기 지급: 근로한 시간만큼 임금을 정해진 날에 지급
                    <br />
                    · 산재보험: 업무상 재해 시 보상
                    <br />
                    · 부당한 차별 금지: 초단시간이라는 이유만으로 부당하게 대우할 수 없음
                  </p>
                </div>
                <p>
                  예외: 사용자가 초단시간이라는 이유로 근로계약서를 쓰지 않거나 최저임금 미만을 준다면 이는 명백한 위법입니다. 이런 경우 고용노동부에 진정을 넣어 시정을 요구할 수 있습니다.
                </p>
              </section>

              <section className="space-y-6 border-t border-border-base pt-8">
                <h2 className="text-2xl font-bold">사례로 보는 초단시간 판단</h2>
                <p>
                  실제 근무 형태에 대입해 보면 기준이 더 분명해집니다. 아래는 이해를 돕기 위한 가상 사례입니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3">
                  <p className="font-semibold text-text-primary">사례 1. 주말만 일하는 카페 알바</p>
                  <p className="text-sm text-text-secondary">
                    · 근무: 토·일 각 6시간, 주 12시간
                    <br />
                    · 4주 평균: 12시간 → 초단시간
                    <br />
                    · 결과: 주휴수당·퇴직금·연차 원칙 없음, 최저임금·근로계약서는 적용
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3">
                  <p className="font-semibold text-text-primary">사례 2. 평일 저녁 근무로 시간이 늘어난 경우</p>
                  <p className="text-sm text-text-secondary">
                    · 근무: 주 4일 각 4시간, 주 16시간
                    <br />
                    · 4주 평균: 16시간 → 초단시간 아님(일반 단시간)
                    <br />
                    · 결과: 개근 시 주휴수당 발생, 1년 이상 근무 시 퇴직금 대상
                  </p>
                </div>
                <p>
                  다만 사례는 이해를 돕기 위한 예시입니다. 실제 판단은 4주 평균 소정근로시간과 근로계약 내용에 따라 달라지므로, 애매하면 고용노동부 상담을 활용하세요.
                </p>
              </section>

              <h2 className="text-2xl font-bold mb-6">자주 묻는 질문</h2>
              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h3 className="text-lg font-semibold text-text-primary">관련 계산기 및 가이드</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link
                    href="/guide/weekly-holiday-allowance-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">주휴수당 조건과 계산</div>
                    <p className="mt-1 text-sm text-text-secondary">15시간 기준과 개근 요건, 금액 계산법.</p>
                  </Link>
                  <Link
                    href="/guide/minimum-wage-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">2026 최저임금</div>
                    <p className="mt-1 text-sm text-text-secondary">시급·월급 환산과 주휴 포함 계산.</p>
                  </Link>
                  <Link
                    href="/guide/employment-contract-written-obligation-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">근로계약서 작성 의무</div>
                    <p className="mt-1 text-sm text-text-secondary">필수 기재 사항과 미교부 시 처벌.</p>
                  </Link>
                  <Link
                    href="/guide/annual-leave-allowance-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">연차수당 계산</div>
                    <p className="mt-1 text-sm text-text-secondary">연차 발생 기준과 미사용 수당 계산법.</p>
                  </Link>
                  <Link
                    href="/guide/severance-pay-deadline-14-days-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">퇴직금 지급 기한</div>
                    <p className="mt-1 text-sm text-text-secondary">14일 원칙과 지연 시 대응.</p>
                  </Link>
                  <Link
                    href="/category/work/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">근로 계산기 모음</div>
                    <p className="mt-1 text-sm text-text-secondary">연봉·주휴·퇴직금 계산기 한곳에.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 교육 목적으로 작성되었으며 개별 노무 자문이 아닙니다. 소정근로시간 산정, 4대보험 적용, 주휴·퇴직금 발생 여부는 실제 근로 형태와 사업장 신고에 따라 달라질 수 있으므로, 구체적 상황은 고용노동부(국번 없이 1350) 또는 공인노무사에게 확인하세요. 본 콘텐츠는 2026-08-10 기준이며 관련 법령 개정 시 업데이트됩니다. 인용 조문: 근로기준법 §17(근로조건 명시), §18(단시간근로자), §55(주휴일), §60(연차유급휴가), 근로자퇴직급여 보장법 §4(퇴직급여제도의 설정). AI 보조 작성 후 운영자 검수 완료.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터</a>,{' '}
                  <a href="https://www.moel.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">고용노동부</a>,{' '}
                  <a href="https://www.4insure.or.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">4대사회보험 정보연계센터</a>.
                </p>
              </section>

              <ShareButtons
                title="초단시간 근로자 2026 가이드"
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
