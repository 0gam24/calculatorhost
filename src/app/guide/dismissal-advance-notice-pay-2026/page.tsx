// [revenue-lever: indexing+traffic]
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

const URL = 'https://calculatorhost.com/guide/dismissal-advance-notice-pay-2026/';
const DATE_PUBLISHED = '2026-08-09';
const DATE_MODIFIED = '2026-08-09';

export const metadata: Metadata = {
  title: '해고예고수당 2026, 30일분 통상임금 계산과 예외',
  description:
    '해고 30일 전 예고를 받지 못했다면 30일분 통상임금을 받습니다. 계산법, 3개월 미만·천재지변 등 예외 3가지, 권고사직과의 차이, 못 받았을 때 대응까지 근로기준법 §26으로 정리했습니다.',
  keywords: [
    '해고예고수당',
    '해고예고수당 계산',
    '해고예고수당 3개월 미만',
    '권고사직 해고예고수당',
    '수습 해고예고수당',
    '30일분 통상임금',
    '근로기준법 26조',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '해고예고수당 2026 계산과 예외' }],
    title: '해고예고수당 2026, 30일분 통상임금 계산과 예외',
    description: '30일 전 예고를 못 받으면 30일분 통상임금. 예외 3가지, 권고사직과의 차이, 미지급 시 대응을 근로기준법 §26으로 정리했습니다.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '해고예고수당 2026 계산과 예외',
    description: '30일분 통상임금 계산법과 3개월 미만 등 예외, 미지급 시 진정 절차. 근로기준법 §26.',
  },
};

const FAQ_ITEMS = [
  {
    question: '해고예고수당은 정확히 무엇인가요?',
    answer:
      '30일 전에 해고를 예고받지 못한 근로자가 받는 30일분 통상임금입니다. 근로기준법 §26은 사용자가 근로자를 해고하려면 적어도 30일 전에 예고해야 하고, 그러지 못하면 30일분 이상의 통상임금을 지급하도록 정합니다. 해고 자체를 막는 제도가 아니라 갑작스러운 실직에 대비할 시간을 보장하는 장치입니다.',
  },
  {
    question: '해고예고수당은 얼마를 받나요?',
    answer:
      '1일 통상임금에 30일을 곱한 금액입니다. 평균임금이 아니라 통상임금을 기준으로 하며, 실제 근무일수와 무관하게 30일분 전액입니다. 예를 들어 1일 통상임금이 12만 원이면 360만 원을 받습니다.',
  },
  {
    question: '입사한 지 3개월이 안 됐으면 못 받나요?',
    answer:
      '계속 근로한 기간이 3개월 미만이면 예고수당 대상이 아닙니다. 근로기준법 §26 단서의 예외로, 근속이 3개월 미만이면 예고 없이 해고해도 수당 지급 의무가 없습니다. 다만 3개월이 되는 날부터는 대상이 되므로 89일과 91일의 차이가 큽니다.',
  },
  {
    question: '권고사직이나 자진 퇴사도 받을 수 있나요?',
    answer:
      '받을 수 없습니다. 해고예고수당은 사용자가 일방적으로 근로관계를 끝내는 해고에만 적용됩니다. 근로자가 사직서를 내고 나가는 자진 퇴사, 노사가 합의로 그만두는 권고사직은 해고가 아니므로 대상이 아닙니다. 권고사직 합의서에 서명하기 전 성격을 확인해야 합니다.',
  },
  {
    question: '부당해고인 경우에도 예고수당을 받나요?',
    answer:
      '받을 수 있으며, 두 문제는 별개입니다. 해고가 부당한지와 30일 전 예고를 했는지는 서로 다른 쟁점입니다. 부당해고 구제를 노동위원회에 다투는 것과 별도로, 예고 없이 해고당했다면 예고수당을 청구할 수 있습니다.',
  },
  {
    question: '5인 미만 사업장도 해고예고수당을 지급하나요?',
    answer:
      '네, 규모와 관계없이 적용됩니다. 연장·야간 가산수당과 달리 해고예고 규정(§26)은 상시 근로자 5인 미만 사업장에도 그대로 적용됩니다. 따라서 소규모 사업장에서 예고 없이 해고당했더라도 예외 사유가 없는 한 30일분 통상임금을 청구할 수 있습니다.',
  },
  {
    question: '예고수당을 안 주면 어떻게 하나요?',
    answer:
      '관할 지방고용노동청에 진정을 넣을 수 있습니다. 해고 통보 시점과 방법을 입증할 자료(문자, 메일, 녹취 등)를 모아 두면 도움이 됩니다. 진정으로 해결되지 않으면 민사 소송으로 청구할 수 있으며, 임금채권 소멸시효는 3년입니다.',
  },
];

export default function DismissalAdvanceNoticePay2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '해고예고수당 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '해고예고수당 2026, 30일분 통상임금 계산과 예외',
    description:
      '해고예고수당의 정의(근로기준법 §26), 30일분 통상임금 계산법, 3개월 미만·천재지변·근로자 귀책 등 예외 3가지, 권고사직과의 차이, 5인 미만 적용, 미지급 시 진정 절차까지 정리.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['해고예고수당', '30일분 통상임금', '권고사직', '근로기준법 26조', '부당해고'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '해고예고수당 2026',
    description:
      '30일 전 예고 없이 해고당했을 때 받는 30일분 통상임금의 계산법과 예외, 대응 절차를 근로기준법 조문으로 정리한 가이드.',
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
                    { name: '해고예고수당 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">직장인 · 7분 읽기 · 2026-08-09</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  해고예고수당 2026
                  <br />
                  <span className="text-2xl text-text-secondary">30일분 통상임금 계산과 예외</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  갑자기 그만두라는 통보를 받고 30일분 급여를 받을 수 있는지 막막한 직장인을 위한 가이드입니다. 해고예고수당이 무엇인지, 얼마를 어떻게 계산하는지, 수습이나 3개월 미만이면 받을 수 있는지, 권고사직과는 어떻게 다른지, 그리고 못 받았을 때 어디에 도움을 청하는지를 근로기준법 조문과 계산 사례로 정리했습니다.
                </p>
              </header>

              <AdSlot slot="guide-dismissal-advance-notice-pay-top" format="horizontal" />

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">해고예고수당이란 무엇인가요?</h2>
                <p>
                  해고예고수당은 30일 전에 예고받지 못한 근로자가 받는 30일분 통상임금입니다. 근로기준법 §26은 사용자가 근로자를 해고하려면(경영상 이유에 의한 해고를 포함해) 적어도 30일 전에 예고해야 하고, 30일 전에 예고하지 않았을 때에는 30일분 이상의 통상임금을 지급하도록 정합니다.
                </p>
                <p>
                  이 제도의 취지는 해고를 금지하는 데 있지 않습니다. 근로자가 다음 일자리를 찾을 준비 시간을 갖도록 최소 30일의 완충 기간이나 그에 상응하는 금전을 보장하는 것입니다. 그래서 예고를 제대로 했다면 수당을 지급할 의무는 없고, 예고를 하지 않았거나 늦게 했을 때 30일분 통상임금이 발생합니다.
                </p>
                <p>
                  다만 해고 사유를 서면으로 통지하는 의무(§27)는 예고와 별개입니다. 상시 5인 이상 사업장은 해고 사유와 시기를 서면으로 알려야 하며, 이를 지키지 않은 해고는 절차 위반이 될 수 있습니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">해고예고수당은 얼마인가요?</h2>
                <p>
                  1일 통상임금에 30일을 곱한 금액입니다. 기준은 평균임금이 아니라 통상임금이며, 실제 근무일수와 상관없이 30일분 전액을 지급합니다. 1일 통상임금은 통상시급에 1일 소정근로시간(보통 8시간)을 곱해 구합니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">계산 공식</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    해고예고수당 = 1일 통상임금 × 30일
                    <br />
                    1일 통상임금 = 통상시급 × 1일 소정근로시간(8시간)
                    <br />
                    통상시급 = 월 통상임금 ÷ 209시간(주 40시간 기준 월 환산시간)
                  </p>
                </div>
                <p className="mt-4">
                  다만 통상임금에는 기본급뿐 아니라 정기적·일률적으로 지급되는 수당이 포함될 수 있어, 급여 구성에 따라 실제 금액이 달라집니다. 명세서의 항목별 성격을 확인하는 것이 정확한 계산의 출발점입니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">3개월 미만이면 못 받나요? 예외 3가지</h2>
                <p>
                  근로기준법 §26 단서는 예고수당을 지급하지 않아도 되는 예외를 정합니다. 아래 세 가지 중 하나에 해당하면 예고 없이 해고해도 수당 의무가 없습니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 해고예고수당이 면제되는 예외 (근로기준법 §26 단서)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">예외 사유</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">내용</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">근속 3개월 미만</td>
                        <td className="p-3">근로자가 계속 근로한 기간이 3개월 미만인 경우</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">부득이한 사업 중단</td>
                        <td className="p-3">천재·사변, 그 밖의 부득이한 사유로 사업을 계속하는 것이 불가능한 경우</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">근로자 귀책</td>
                        <td className="p-3">근로자가 고의로 사업에 막대한 지장을 주거나 재산상 손해를 끼쳐 고용노동부령이 정하는 사유에 해당하는 경우</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  가장 자주 문제되는 것이 첫 번째 예외입니다. 기준은 3개월 미만이므로, 계속 근로가 3개월에 도달한 다음부터는 예고수당 대상이 됩니다. 수습이라는 이름이 붙었더라도 근속이 3개월 이상이면 예고수당이 적용됩니다.
                </p>
                <p>
                  다만 세 번째 예외인 근로자 귀책은 고용노동부령의 별표에서 구체적 사유를 한정하고 있어, 사용자가 자의적으로 판단해 적용할 수 있는 것이 아닙니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">해고예고수당 계산 사례</h2>
                <p>
                  통상시급과 근속에 따라 결과가 어떻게 달라지는지 두 가지 사례로 살펴보겠습니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 1. 근속 1년, 통상시급 15,000원</p>
                  <p className="text-sm text-text-secondary">
                    · 1일 통상임금: 15,000원 × 8시간 = 120,000원
                    <br />
                    · 해고예고수당: 120,000원 × 30일 = <strong>3,600,000원</strong>
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 예고 없이 해고당했다면 360만 원을 청구할 수 있습니다.</span>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 2. 근속 경계 (입사 89일 vs 91일)</p>
                  <p className="text-sm text-text-secondary">
                    · 입사 89일째 해고: 근속 3개월 미만 예외에 해당하여 <strong>지급 대상 아님</strong>
                    <br />
                    · 입사 91일째 해고: 근속 3개월 이상이므로 30일분 통상임금 <strong>지급 대상</strong>
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 며칠 차이로 수백만 원이 갈리므로 해고 통보 날짜를 정확히 확인해야 합니다.</span>
                  </p>
                </div>
              </section>

              <AdSlot slot="guide-dismissal-advance-notice-pay-mid" format="rectangle" />

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">권고사직·자진 퇴사와는 어떻게 다른가요?</h2>
                <p>
                  해고예고수당은 사용자의 일방적 해고에만 적용됩니다. 아래 표로 상황별 적용 여부를 정리했습니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 2. 근로관계 종료 유형별 예고수당 적용</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">종료 유형</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">성격</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">예고수당</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">해고 (예고 없음)</td>
                        <td className="p-3">사용자의 일방적 종료</td>
                        <td className="p-3"><strong>지급 대상</strong></td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">권고사직</td>
                        <td className="p-3">노사 합의로 종료</td>
                        <td className="p-3">대상 아님</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">자진 퇴사</td>
                        <td className="p-3">근로자의 사직</td>
                        <td className="p-3">대상 아님</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">계약기간 만료</td>
                        <td className="p-3">기간의 자연 종료</td>
                        <td className="p-3">원칙적으로 대상 아님</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  다만 권고사직 형식을 취했더라도 실질이 일방적 해고에 가깝다면 다툼의 여지가 있습니다. 합의서에 서명하기 전에 문서의 표현과 성격을 반드시 확인하세요.
                </p>
              </section>

              <section className="space-y-6 border-t border-border-base pt-8">
                <h2 className="text-2xl font-bold">예고수당을 못 받았을 때 대응 절차</h2>
                <p>
                  예고 없이 해고당하고도 수당을 받지 못했다면 다음 순서로 대응할 수 있습니다.
                </p>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li>
                    <strong>증거 확보:</strong> 해고 통보의 시점과 방법을 보여 주는 문자, 메일, 녹취, 카카오톡 대화 등을 모읍니다. 해고일이 확정되어야 근속 3개월 여부와 예고 여부를 따질 수 있습니다.
                  </li>
                  <li>
                    <strong>고용노동청 진정:</strong> 관할 지방고용노동청에 임금(예고수당) 미지급 진정을 제기합니다. 온라인 민원으로도 접수할 수 있습니다.
                  </li>
                  <li>
                    <strong>민사 청구:</strong> 진정으로 해결되지 않으면 민사 소송으로 청구할 수 있습니다. 예고수당도 임금채권이므로 소멸시효는 3년입니다.
                  </li>
                </ul>
                <p className="mt-4">
                  예외: 부당해고 자체를 다투려면 노동위원회 구제신청이라는 별도 절차가 필요하며, 이는 예고수당 청구와 함께 진행할 수 있습니다.
                </p>
              </section>

              <h2 className="text-2xl font-bold mb-6">자주 묻는 질문</h2>
              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h3 className="text-lg font-semibold text-text-primary">관련 계산기 및 가이드</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link
                    href="/guide/unemployment-benefit-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">실업급여 조건과 금액 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">비자발적 이직 시 받을 수 있는 구직급여를 확인하세요.</p>
                  </Link>
                  <Link
                    href="/guide/severance-pay-deadline-14-days-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">퇴직금 지급기한 14일</div>
                    <p className="mt-1 text-sm text-text-secondary">퇴직 후 받아야 할 금품의 정산 기한을 정리했습니다.</p>
                  </Link>
                  <Link
                    href="/guide/employment-contract-written-obligation-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">근로계약서 작성 의무</div>
                    <p className="mt-1 text-sm text-text-secondary">해고 다툼의 출발점이 되는 근로조건 서면 명시를 확인하세요.</p>
                  </Link>
                  <Link
                    href="/guide/average-wage-vs-ordinary-wage-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">평균임금 vs 통상임금</div>
                    <p className="mt-1 text-sm text-text-secondary">예고수당의 기준인 통상임금의 범위를 이해하세요.</p>
                  </Link>
                  <Link
                    href="/guide/small-business-under-5-employees-labor-law-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">5인 미만 사업장 근로기준법</div>
                    <p className="mt-1 text-sm text-text-secondary">규모별로 달라지는 근로기준법 적용을 정리했습니다.</p>
                  </Link>
                  <Link
                    href="/category/work/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">모든 근로·급여 가이드</div>
                    <p className="mt-1 text-sm text-text-secondary">해고·수당·퇴직 관련 가이드 모음.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 교육 목적으로 작성되었으며 개인 맞춤형 노무 조언이 아닙니다. 실제 예고수당 지급 여부와 금액은 근속기간, 통상임금 구성, 해고의 성격에 따라 달라질 수 있으므로, 구체적 사안은 고용노동부 또는 공인노무사와 상담하시기 바랍니다. 본 콘텐츠는 2026-08-09를 기준으로 작성되었으며 법령 개정 시 업데이트됩니다. 인용 조문은 <strong>근로기준법 §26(해고의 예고), §27(해고사유 등의 서면통지)</strong>이며, 임금채권 소멸시효는 근로기준법 §49를 따릅니다. AI 보조 작성 후 운영자 검수 완료.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터</a>,{' '}
                  <a href="https://www.moel.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">고용노동부</a>.
                </p>
              </section>

              <ShareButtons
                title="해고예고수당 2026 가이드"
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