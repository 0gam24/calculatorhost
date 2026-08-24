// [revenue-lever: indexing+traffic] 초단시간 근로자(주15시간 미만) 주휴·연차·퇴직금·4대보험 (단시간 근로자 롱테일 흡수)
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

const URL = 'https://calculatorhost.com/guide/ultra-short-time-worker-rights-2026/';
const DATE_PUBLISHED = '2026-08-25';
const DATE_MODIFIED = '2026-08-25';

export const metadata: Metadata = {
  title: '초단시간 근로자 2026, 주15시간 미만 주휴·연차·퇴직금',
  description:
    '주 15시간 미만 초단시간 근로자는 주휴수당·연차·퇴직금이 원칙적으로 적용 제외됩니다. 다만 최저임금과 산재보험은 반드시 적용되고 실제 근로시간이 기준입니다. 4대보험 적용 여부까지 근로기준법 §18 기준으로 정리합니다.',
  keywords: [
    '초단시간 근로자',
    '주 15시간 미만',
    '주휴수당 15시간',
    '초단시간 4대보험',
    '알바 퇴직금',
    '단시간 근로자',
    '근로기준법 18조',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '초단시간 근로자 2026, 주15시간 미만 주휴·연차·퇴직금' }],
    title: '초단시간 근로자 2026, 주15시간 미만이면 달라지는 권리',
    description: '주휴·연차·퇴직금은 제외, 최저임금·산재는 적용. 4대보험 적용 여부와 실제 근로시간 판단까지 근로기준법 §18 기준으로 정리.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '초단시간 근로자 2026, 주15시간 미만 권리 정리',
    description: '주휴·연차·퇴직금 제외, 최저임금·산재 적용. 근로기준법 §18 기준.',
  },
};

const FAQ_ITEMS = [
  {
    question: '초단시간 근로자는 정확히 어떤 기준인가요?',
    answer:
      '4주를 평균해 1주 소정근로시간이 15시간 미만인 근로자를 말합니다(근로기준법 §18). 예를 들어 주 2일, 하루 7시간씩 일해 1주 14시간이면 초단시간에 해당합니다. 하루 근무시간이나 요일 수가 아니라 4주 평균 주간 소정근로시간이 판단 기준입니다.',
  },
  {
    question: '초단시간이면 주휴수당을 정말 못 받나요?',
    answer:
      '원칙적으로 못 받습니다. 근로기준법 §18은 4주 평균 1주 소정근로시간이 15시간 미만인 근로자에게 주휴일(§55)을 적용하지 않는다고 규정합니다. 따라서 유급 주휴일과 주휴수당이 발생하지 않습니다. 다만 실제로 매주 15시간 이상 일했다면 초단시간으로 볼 수 없어 주휴수당 지급 의무가 생길 수 있습니다.',
  },
  {
    question: '연차휴가와 퇴직금도 적용되지 않나요?',
    answer:
      '네, 둘 다 원칙적으로 적용 제외입니다. 연차유급휴가(§60)는 근로기준법 §18에 따라 초단시간 근로자에게 적용되지 않고, 퇴직금은 4주 평균 1주 소정근로시간이 15시간 미만이면 근로자퇴직급여 보장법 §4에 따라 지급 대상에서 제외됩니다. 다만 실제 근로시간이 기준을 넘으면 지급 의무가 발생합니다.',
  },
  {
    question: '초단시간 근로자도 4대보험에 가입되나요?',
    answer:
      '보험마다 다릅니다. 산재보험은 근로시간과 무관하게 반드시 적용됩니다. 반면 국민연금과 건강보험은 월 소정근로시간 60시간 미만이면 직장가입에서 제외되는 것이 원칙이고, 고용보험은 3개월 이상 계속 근로하면 적용됩니다. 사업장 상황에 따라 달라지므로 근로복지공단과 국민연금공단에 확인하세요.',
  },
  {
    question: '초단시간이라도 반드시 지켜지는 권리는 무엇인가요?',
    answer:
      '최저임금, 근로계약서 작성·교부, 산재보험은 근로시간과 관계없이 모두 적용됩니다. 초단시간이라고 해서 최저임금보다 낮게 줄 수 없고, 근로계약서를 서면으로 작성·교부하지 않으면 사업주에게 과태료가 부과됩니다(근로기준법 §17). 일하다 다치면 산재보험으로 보상받을 수 있습니다.',
  },
  {
    question: '계약서에 15시간 미만이라고 적으면 무조건 초단시간인가요?',
    answer:
      '아닙니다. 법원은 계약서 문구가 아니라 실제 근로시간을 기준으로 소정근로시간을 판단합니다. 계약서에는 14시간이라 적어 두고 상시적으로 16~18시간을 근무시켰다면 초단시간으로 인정되지 않아 주휴수당·연차·퇴직금 지급 의무가 발생할 수 있습니다. 실제 근무 실태가 핵심입니다.',
  },
  {
    question: '여러 곳에서 초단시간으로 일하면 합쳐서 계산되나요?',
    answer:
      '주휴·연차·퇴직금은 각 사업장별로 15시간 기준을 따로 적용하므로 사업장이 다르면 합산하지 않습니다. 다만 국민연금·건강보험 등은 소득 기준으로 별도 판단될 수 있습니다. 두 곳 모두 초단시간이면 각각 주휴·퇴직금 대상에서 빠질 수 있으니, 한 곳에서 15시간 이상으로 몰아 일하는 편이 권리 보호에 유리할 수 있습니다.',
  },
  {
    question: '초단시간 근무 중 근로시간이 늘면 소급해서 권리가 생기나요?',
    answer:
      '늘어난 실제 근로시간이 4주 평균 15시간 이상이 되면 그 기간에 대해 주휴수당 등이 발생할 수 있습니다. 계속근로기간이 1년 이상이고 평균 15시간 이상이면 퇴직금 대상이 될 수도 있습니다. 근무기록(출퇴근 기록, 급여명세서)을 보관해 두면 나중에 권리를 주장할 때 중요한 증거가 됩니다.',
  },
];

export default function UltraShortTimeWorkerRightsPage() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '초단시간 근로자 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '초단시간 근로자 2026, 주15시간 미만이면 달라지는 권리',
    description:
      '주 15시간 미만 초단시간 근로자의 주휴수당·연차·퇴직금 적용 제외와 최저임금·산재·근로계약서 적용, 4대보험 가입 여부, 실제 근로시간 판단 원칙을 근로기준법 §18 기준으로 정리.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['초단시간 근로자', '주휴수당', '연차', '퇴직금', '4대보험'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '초단시간 근로자 2026',
    description:
      '주 15시간 미만 초단시간 근로자에게 적용되는 권리와 제외되는 권리를 근로기준법 §18 기준으로 정리한 가이드.',
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
                <p className="mb-2 text-caption text-text-tertiary">단시간 근로자 · 근로 · 8분 읽기 · 2026-08-25</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  초단시간 근로자 2026
                  <br />
                  <span className="text-2xl text-text-secondary">· 주15시간 미만 주휴·연차·퇴직금</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  주말에만 잠깐 카페에서 일하거나 평일 몇 시간 아르바이트를 하는 분이라면 주휴수당이나 퇴직금을 받을 수 있는지 궁금할 것입니다. 근로시간이 짧으면 이 권리들이 적용되지 않는 경우가 있는데, 그 갈림길이 바로 주 15시간입니다. 이 가이드는 초단시간 근로자를 위해 무엇이 적용되고 무엇이 제외되는지, 그리고 계약서와 실제 근무의 차이가 왜 중요한지를 근로기준법 §18 기준으로 정리합니다.
                </p>
              </header>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">초단시간 근로자란 정확히 무엇인가요?</h2>
                <p>
                  초단시간 근로자는 4주를 평균해 1주 소정근로시간이 15시간 미만인 근로자를 말합니다(근로기준법 §18). 하루 근무시간이나 며칠 나오는지가 아니라, 4주 평균 주간 소정근로시간이 판단 기준입니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">정의: 초단시간 근로자 (근로기준법 §18)</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    4주간(4주 미만은 그 기간)을 평균하여 1주 소정근로시간이 15시간 미만인 근로자. 핵심 수치: 주 15시간 미만.
                  </p>
                </div>
                <p>
                  소정근로시간은 근로계약으로 정한 일하기로 한 시간입니다. 주 2일, 하루 7시간이면 1주 14시간이므로 초단시간에 해당합니다. 반대로 주 3일, 하루 6시간이면 18시간이라 일반 단시간 근로자입니다.
                </p>
                <p>
                  다만, 이 15시간 기준이 넘느냐 아니냐에 따라 주휴수당·연차·퇴직금이라는 큰 권리가 갈리므로, 자신의 실제 주간 근로시간을 정확히 계산해 두는 것이 중요합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">주휴수당을 못 받는다는 게 사실인가요?</h2>
                <p>
                  원칙적으로 사실입니다. 근로기준법 §18은 4주 평균 1주 소정근로시간이 15시간 미만인 근로자에게 주휴일(§55)을 적용하지 않는다고 규정합니다. 따라서 유급 주휴일이 발생하지 않고 주휴수당도 지급되지 않습니다.
                </p>
                <p>
                  반대로 1주 소정근로시간이 15시간 이상이면 개근을 조건으로 유급 주휴일이 생기고, 근무시간에 비례한 주휴수당을 받습니다. 15시간이라는 한 시간 차이가 주휴수당의 유무를 가르는 셈입니다.
                </p>
                <p>
                  다만, 계약상 14시간이라도 매주 실제로 15시간 이상 일했다면 초단시간으로 보지 않아 주휴수당을 청구할 수 있습니다. 실제 근무 실태가 계약서 문구보다 우선합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">연차휴가와 퇴직금도 안 주나요?</h2>
                <p>
                  둘 다 원칙적으로 적용되지 않습니다. 연차유급휴가(근로기준법 §60)는 §18에 따라 초단시간 근로자에게 적용 제외되고, 퇴직금은 4주 평균 1주 소정근로시간이 15시간 미만이면 근로자퇴직급여 보장법 §4에 따라 지급 대상에서 빠집니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 초단시간 근로자 권리 적용 여부(주 15시간 미만)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">항목</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">적용 여부</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">근거</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">최저임금</td>
                        <td className="p-3"><strong>적용</strong></td>
                        <td className="p-3">최저임금법</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">근로계약서 작성·교부</td>
                        <td className="p-3"><strong>적용</strong></td>
                        <td className="p-3">근로기준법 §17</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">산재보험</td>
                        <td className="p-3"><strong>적용</strong></td>
                        <td className="p-3">산업재해보상보험법</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">주휴수당</td>
                        <td className="p-3">원칙 제외</td>
                        <td className="p-3">근로기준법 §18, §55</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">연차유급휴가</td>
                        <td className="p-3">원칙 제외</td>
                        <td className="p-3">근로기준법 §18, §60</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">퇴직금</td>
                        <td className="p-3">원칙 제외</td>
                        <td className="p-3">퇴직급여법 §4</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p>
                  다만, 위 제외 항목은 모두 실제 근로시간이 15시간 미만일 때의 이야기입니다. 계약과 달리 상시적으로 15시간 이상 근무했다면 소급해 권리가 인정될 수 있습니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">초단시간도 4대보험에 가입되나요?</h2>
                <p>
                  보험마다 기준이 달라 한마디로 답하기 어렵습니다. 산재보험은 예외 없이 적용되지만, 나머지 셋은 근로시간과 계속근로 기간에 따라 갈립니다.
                </p>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li><strong>산재보험:</strong> 근로시간과 무관하게 반드시 적용. 일하다 다치면 보상 대상.</li>
                  <li><strong>고용보험:</strong> 원칙 제외이나 3개월 이상 계속 근로하면 적용되는 것이 일반적.</li>
                  <li><strong>국민연금:</strong> 월 소정근로시간 60시간 미만이면 사업장가입에서 제외되는 것이 원칙.</li>
                  <li><strong>건강보험:</strong> 월 소정근로시간 60시간 미만이면 직장가입 제외(지역가입 또는 피부양자).</li>
                </ul>
                <p>
                  다만, 위 기준은 원칙이며 사업장 규모와 근무 형태에 따라 예외가 있습니다. 정확한 가입 여부는 근로복지공단, 국민연금공단, 건강보험공단에 문의해 확인하는 것이 안전합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">초단시간이어도 반드시 지켜지는 권리는?</h2>
                <p>
                  근로시간이 짧다고 해서 모든 보호가 사라지는 것은 아닙니다. 다음 세 가지는 초단시간 근로자에게도 온전히 적용됩니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3">
                  <p className="font-semibold text-text-primary">초단시간에도 보장되는 3가지</p>
                  <p className="text-sm text-text-secondary">
                    1) 최저임금: 시급을 최저임금 미만으로 줄 수 없음
                    <br />
                    2) 근로계약서: 서면 작성·교부 의무(위반 시 사업주 과태료, 근로기준법 §17)
                    <br />
                    3) 산재보험: 업무 중 재해 시 보상
                  </p>
                </div>
                <p>
                  다만, 실무에서는 초단시간이라는 이유로 근로계약서를 쓰지 않거나 최저임금을 지키지 않는 경우가 있습니다. 이는 명백한 위반이므로 근로계약서 미교부, 임금 체불은 관할 고용노동청에 진정할 수 있습니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">계약서상 15시간 미만이면 무조건 초단시간인가요?</h2>
                <p>
                  아닙니다. 법원과 노동청은 계약서 문구가 아니라 실제 근로 실태를 기준으로 소정근로시간을 판단합니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3">
                  <p className="font-semibold text-text-primary">사례. 계약과 실제가 다른 경우</p>
                  <p className="text-sm text-text-secondary">
                    · 계약서: 주 14시간(초단시간)
                    <br />
                    · 실제 근무: 매주 17시간(4주 평균 17시간)
                    <br />
                    · 판단: 실제 근로시간 기준 15시간 이상이므로 초단시간이 아님
                    <br />
                    · 결과: 주휴수당 발생, 1년 이상 근무 시 연차·퇴직금 대상 가능
                  </p>
                </div>
                <p>
                  따라서 근로자는 출퇴근 기록, 근무표, 급여명세서 등을 보관해 실제 근로시간을 입증할 수 있도록 준비하는 것이 좋습니다. 반대로 사업주는 실제 근무를 초단시간으로 유지하려면 근무시간 관리가 필요합니다.
                </p>
              </section>

              <h2 className="text-2xl font-bold mb-6">자주 묻는 질문</h2>
              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h3 className="text-lg font-semibold text-text-primary">관련 계산기 및 가이드</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link href="/calculator/salary/" className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition">
                    <div className="font-semibold text-primary-500">연봉 실수령액 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">시급·근로시간을 기준으로 급여를 계산해 보세요.</p>
                  </Link>
                  <Link href="/guide/weekly-holiday-allowance-2026/" className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition">
                    <div className="font-semibold text-primary-500">주휴수당 계산 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">15시간 이상일 때 받는 주휴수당 계산법.</p>
                  </Link>
                  <Link href="/guide/minimum-wage-2026/" className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition">
                    <div className="font-semibold text-primary-500">2026 최저임금</div>
                    <p className="mt-1 text-sm text-text-secondary">초단시간에도 적용되는 최저임금을 확인하세요.</p>
                  </Link>
                  <Link href="/guide/employment-contract-written-obligation-2026/" className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition">
                    <div className="font-semibold text-primary-500">근로계약서 작성 의무</div>
                    <p className="mt-1 text-sm text-text-secondary">서면 미교부 시 과태료와 대응 방법.</p>
                  </Link>
                  <Link href="/guide/annual-leave-allowance-2026/" className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition">
                    <div className="font-semibold text-primary-500">연차수당 계산 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">연차유급휴가와 수당의 발생 요건.</p>
                  </Link>
                  <Link href="/category/work/" className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition">
                    <div className="font-semibold text-primary-500">모든 근로 가이드</div>
                    <p className="mt-1 text-sm text-text-secondary">연봉·수당·4대보험 근로 가이드 모음.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 교육 목적으로 작성되었으며 개인 맞춤형 노무 조언이 아닙니다. 초단시간 판단, 4대보험 가입 여부, 주휴·연차·퇴직금 발생 여부는 실제 근로 실태와 사업장 상황에 따라 달라지므로 고용노동부·근로복지공단·관할 고용노동청에서 반드시 확인하세요. 본 콘텐츠는 2026-08-25 기준이며 관련 법령·판례 변화 시 업데이트됩니다. 근거 법조항은 <strong>근로기준법 §18(단시간근로자 근로조건), §55(주휴일), §60(연차), §17(근로조건 명시), 근로자퇴직급여 보장법 §4</strong>입니다. AI 보조 작성 후 운영자 검수 완료.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터</a>,{' '}
                  <a href="https://www.moel.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">고용노동부</a>,{' '}
                  <a href="https://www.comwel.or.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">근로복지공단</a>.
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
