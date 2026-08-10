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

const URL = 'https://calculatorhost.com/guide/income-contingent-loan-repayment-2026/';
const DATE_PUBLISHED = '2026-08-11';
const DATE_MODIFIED = '2026-08-11';

export const metadata: Metadata = {
  title: '취업 후 학자금 상환 2026 | 의무상환 시작 소득과 상환액 계산',
  description:
    '취업 후 학자금 상환(ICL)은 연간 소득금액이 상환기준소득 3,037만원을 넘는 해부터 시작됩니다. 초과분에 학부 20%·대학원 25%를 곱한 의무상환액 계산법과 원천공제, 상환 유예까지 정리했습니다.',
  keywords: [
    '취업 후 학자금 상환',
    'ICL 의무상환',
    '학자금 상환기준소득',
    '학자금 대출 언제부터 갚나',
    '취업후상환 학자금대출',
    '학자금 원천공제',
    '취업 후 학자금 상환 특별법',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '취업 후 학자금 상환 2026 의무상환 소득과 계산법' }],
    title: '취업 후 학자금 상환 2026 | 의무상환 소득과 상환액 계산',
    description: '상환기준소득 3,037만원 초과분 × 학부 20%·대학원 25%. ICL 의무상환액 계산과 원천공제 정리.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '취업 후 학자금 상환 2026 의무상환 계산',
    description: '연간 소득금액이 3,037만원을 넘는 해부터 초과분에 20%(학부)·25%(대학원)를 곱해 상환.',
  },
};

const FAQ_ITEMS = [
  {
    question: '취업 후 학자금 상환은 언제부터 갚기 시작하나요?',
    answer:
      '연간 소득금액이 그해의 상환기준소득을 넘는 해부터 의무상환이 시작됩니다. 2026년 상환기준소득은 3,037만원(연간 소득금액 기준)입니다. 소득금액이 이 기준 이하라면 그해에는 의무상환액이 0원이며, 소득이 없으면 상환 의무도 없는 소득연동형 구조입니다.',
  },
  {
    question: '의무상환액은 어떻게 계산하나요?',
    answer:
      '의무상환액은 (연간 소득금액 − 상환기준소득) × 상환율입니다. 상환율은 학부 대출 20%, 대학원 대출 25%입니다. 예를 들어 근로소득금액이 4,000만원인 학부 대출자는 (4,000만 − 3,037만) × 20% = 192만 6천원이 그해 의무상환액입니다.',
  },
  {
    question: '연간 소득금액은 연봉(총급여)과 같은 말인가요?',
    answer:
      '다릅니다. 연간 소득금액은 종합소득금액, 근로소득금액, 연금·퇴직·양도소득금액 등을 합한 개념입니다. 근로소득자라면 근로소득금액은 총급여에서 근로소득공제를 뺀 금액입니다. 총급여 자체가 아니라 공제 후 소득금액을 상환기준소득 3,037만원과 비교한다는 점을 기억하세요.',
  },
  {
    question: '회사에서 급여를 통해 원천공제로 갚나요?',
    answer:
      '근로소득자는 국세청이 전년도 소득을 바탕으로 의무상환액을 정하면 회사가 매월 급여에서 원천공제해 납부하는 방식이 기본입니다. 원천공제는 다음 해에 12개월로 나누어 이루어집니다. 원천공제가 부담스러우면 미리 자발적으로 상환하거나 국세청에 자진납부를 선택할 수도 있습니다.',
  },
  {
    question: '소득이 줄거나 실직하면 상환을 미룰 수 있나요?',
    answer:
      '네, 육아휴직, 실직, 폐업 등 상환이 곤란한 사유가 있으면 국세청에 신청해 의무상환을 유예할 수 있습니다. 유예 기간에는 상환이 미뤄지지만 이자는 계속 발생할 수 있으므로, 형편이 되면 자발적 수시상환으로 원금을 줄이는 편이 유리합니다.',
  },
  {
    question: '2026년에 달라진 점은 무엇인가요?',
    answer:
      '2026년 상환기준소득이 3,037만원으로 전년 대비 인상됐고, 취업 후 상환 학자금 대출의 소득 요건이 폐지되어 소득 수준과 관계없이 모든 대학·대학원생이 신청할 수 있게 됐습니다. 상환기준소득이 오르면 그만큼 의무상환이 시작되는 소득 문턱도 높아집니다.',
  },
  {
    question: '자발적으로 미리 갚으면 이득이 있나요?',
    answer:
      '수시상환(자발적 상환)은 원금을 직접 줄여 이자 부담을 낮춥니다. 의무상환은 소득이 기준을 넘을 때만 발생하지만, 대출 잔액에는 계속 이자가 붙으므로 여유가 있을 때 원금을 갚으면 총 상환액이 줄어듭니다. 다만 생활자금이 빠듯하다면 무리한 조기상환보다 비상금 확보가 우선입니다.',
  },
  {
    question: '상환기준소득 이하인데도 신고를 해야 하나요?',
    answer:
      '별도 신고 없이도 국세청이 소득 자료로 의무상환액을 산정합니다. 소득금액이 상환기준소득 이하이면 그해 의무상환액이 0원으로 처리됩니다. 다만 소득 자료가 누락되면 정확한 산정이 어려울 수 있으므로, 종합소득세 신고 대상이라면 성실히 신고하는 것이 좋습니다.',
  },
];

export default function IncomeContingentLoanRepayment2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '취업 후 학자금 상환 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '취업 후 학자금 상환 2026, 의무상환 시작 소득과 상환액 계산',
    description:
      '취업 후 학자금 상환(ICL) 의무상환액 계산법. 상환기준소득 3,037만원, 초과분 × 학부 20%·대학원 25%, 연간 소득금액 정의, 원천공제와 상환 유예까지 정리.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['취업 후 학자금 상환', 'ICL', '상환기준소득', '의무상환액', '원천공제'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '취업 후 학자금 상환 2026',
    description:
      '취업 후 학자금 상환(ICL) 의무상환 시작 소득과 상환액 계산법을 정리한 실전 가이드.',
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
                    { name: '취업 후 학자금 상환 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">사회초년생 · 7분 읽기 · 2026-08-11</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  취업 후 학자금 상환 2026
                  <br />
                  <span className="text-2xl text-text-secondary">의무상환 소득과 상환액 계산</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  대학 때 받은 취업 후 상환 학자금 대출(ICL)은 취업했다고 무조건 갚는 것이 아니라, 소득이 일정 기준을 넘는 해부터 갚습니다. 이 가이드는 2026년 상환기준소득 3,037만원을 기준으로 의무상환이 언제 시작되는지, 상환액은 어떻게 계산하는지, 회사 원천공제와 상환 유예는 어떻게 되는지 사회초년생 눈높이로 정리합니다.
                </p>
              </header>

              <AdSlot slot="guide-income-contingent-loan-repayment-top" format="horizontal" />

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">취업 후 학자금 상환이란?</h2>
                <p>
                  취업 후 학자금 상환(ICL)은 재학 중 등록금·생활비를 대출받고, 졸업 후 소득이 생기면 소득에 연동해 갚는 제도입니다. 근거 법령은 「취업 후 학자금 상환 특별법」입니다. 핵심은 소득이 기준을 넘어야 의무상환이 시작된다는 점으로, 소득이 없으면 그해에는 갚지 않아도 됩니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">한 줄 요약</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    2026년 연간 소득금액이 3,037만원을 넘는 해부터, 초과분에 학부 20%·대학원 25%를 곱한 금액을 의무상환합니다.
                  </p>
                </div>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">의무상환은 언제부터 시작되나요?</h2>
                <p>
                  연간 소득금액이 그해의 상환기준소득을 넘는 해부터입니다. 2026년 상환기준소득은 3,037만원(연간 소득금액 기준)으로, 전년보다 인상됐습니다. 여기서 연간 소득금액은 연봉(총급여)이 아니라, 각 소득에서 필요경비·공제를 뺀 소득금액의 합입니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 취업 후 학자금 상환 핵심 수치 (2026년)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">항목</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">기준</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">상환기준소득(2026)</td>
                        <td className="p-3">연간 소득금액 3,037만원</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">상환율(학부)</td>
                        <td className="p-3">기준 초과분의 20%</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">상환율(대학원)</td>
                        <td className="p-3">기준 초과분의 25%</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">근로소득금액</td>
                        <td className="p-3">총급여 − 근로소득공제</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p>
                  다만 상환기준소득은 매년 조정되므로, 특정 연도의 정확한 금액은 국세청 취업 후 학자금 상환 안내로 확인해야 합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">의무상환액은 얼마인가요? 계산 사례</h2>
                <p>
                  공식은 (연간 소득금액 − 상환기준소득) × 상환율입니다. 소득금액을 기준으로 단계별 사례를 보겠습니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3">
                  <p className="font-semibold text-text-primary">사례 1. 근로소득금액 4,000만원, 학부 대출</p>
                  <p className="text-sm text-text-secondary">
                    · 초과분: 4,000만 − 3,037만 = 963만원
                    <br />
                    · 의무상환액: 963만 × 20% = <strong>192만 6천원</strong>(연간)
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3">
                  <p className="font-semibold text-text-primary">사례 2. 소득금액 4,000만원, 대학원 대출</p>
                  <p className="text-sm text-text-secondary">
                    · 초과분: 4,000만 − 3,037만 = 963만원
                    <br />
                    · 의무상환액: 963만 × 25% = <strong>240만 7,500원</strong>(연간)
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3">
                  <p className="font-semibold text-text-primary">사례 3. 총급여 5,000만원 근로자, 학부 대출(소득금액 환산)</p>
                  <p className="text-sm text-text-secondary">
                    · 근로소득공제: 1,200만 + (5,000만 − 4,500만) × 5% = 1,225만원
                    <br />
                    · 근로소득금액: 5,000만 − 1,225만 = 3,775만원
                    <br />
                    · 초과분: 3,775만 − 3,037만 = 738만원
                    <br />
                    · 의무상환액: 738만 × 20% = <strong>147만 6천원</strong>(연간)
                    <br />
                    <span className="text-xs text-text-tertiary">연봉 5,000만원이라도 근로소득공제를 빼면 소득금액이 3,775만원이라, 상환액은 총급여 기준이 아닌 소득금액 기준으로 산정됩니다.</span>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3">
                  <p className="font-semibold text-text-primary">사례 4. 경계값 점검</p>
                  <p className="text-sm text-text-secondary">
                    · 소득금액 3,037만원(기준선): 초과분 0원 → 의무상환액 <strong>0원</strong>
                    <br />
                    · 소득금액 3,050만원(기준 바로 위, 학부): (3,050만 − 3,037만) × 20% = 13만 × 20% = <strong>2만 6천원</strong>
                    <br />
                    <span className="text-xs text-text-tertiary">기준을 아주 조금 넘으면 상환액도 아주 작습니다. 문턱을 넘는 순간 전체 소득에 세금이 붙는 방식이 아니라, 초과분에만 상환율이 적용됩니다.</span>
                  </p>
                </div>
              </section>

              <AdSlot slot="guide-income-contingent-loan-repayment-mid" format="rectangle" />

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">회사 원천공제와 자진납부, 무엇이 다른가요?</h2>
                <p>
                  근로소득자는 국세청이 정한 의무상환액을 회사가 다음 해 급여에서 매월 원천공제해 납부하는 것이 기본입니다. 자진납부는 본인이 직접 납부하는 방식으로, 원천공제를 원하지 않을 때 선택합니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 2. 원천공제 vs 자진납부</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">구분</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">원천공제</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">자진납부</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">납부 주체</td>
                        <td className="p-3">회사(급여에서 공제)</td>
                        <td className="p-3">본인</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">납부 시기</td>
                        <td className="p-3">다음 해 매월 12개월 분할</td>
                        <td className="p-3">본인이 지정한 시기</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">특징</td>
                        <td className="p-3">신경 쓸 필요 적음</td>
                        <td className="p-3">회사에 알리지 않아도 됨</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p>
                  다만 소득이 크게 줄거나 실직·육아휴직 등 사유가 생기면 의무상환을 유예할 수 있습니다. 유예 중에도 대출 잔액에는 이자가 붙을 수 있으므로, 형편이 되면 수시상환으로 원금을 줄이는 편이 총부담을 낮춥니다.
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
                    <p className="mt-1 text-sm text-text-secondary">총급여에서 세금·4대보험 뗀 실수령액을 확인하세요.</p>
                  </Link>
                  <Link
                    href="/guide/salary-take-home-2026-july-insurance-increase/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">2026 실수령액 변화</div>
                    <p className="mt-1 text-sm text-text-secondary">7월 국민연금 요율 인상이 월급에 미친 영향.</p>
                  </Link>
                  <Link
                    href="/guide/sme-youth-income-tax-reduction-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">중소기업 취업 청년 소득세 감면</div>
                    <p className="mt-1 text-sm text-text-secondary">사회초년생이 놓치기 쉬운 감면 혜택 정리.</p>
                  </Link>
                  <Link
                    href="/guide/credit-score-loan-interest-rate-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">신용점수와 대출금리</div>
                    <p className="mt-1 text-sm text-text-secondary">학자금 상환 이력이 신용에 주는 영향까지.</p>
                  </Link>
                  <Link
                    href="/guide/youth-future-savings-account-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">청년미래적금 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">사회초년생 목돈 마련 정책 상품 조건.</p>
                  </Link>
                  <Link
                    href="/category/work/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">근로·급여 계산기 모음</div>
                    <p className="mt-1 text-sm text-text-secondary">연봉·퇴직금·프리랜서 세금 한곳에서.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 교육 목적으로 작성되었으며 개인 맞춤형 세무·금융 자문이 아닙니다. 상환기준소득과 상환율, 유예 요건은 연도·개인 상황에 따라 달라지므로, 실제 의무상환액은 국세청 취업 후 학자금 상환 시스템의 간편 계산과 안내로 확인하세요. 인용 법령은 <strong>취업 후 학자금 상환 특별법</strong>이며, 소득금액 산정 시 근로소득공제는 소득세법을 따릅니다. 본 콘텐츠는 2026-08-11 기준이며 제도 개정 시 업데이트됩니다. AI 보조 작성 후 운영자 검수 완료.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터</a>,{' '}
                  <a href="https://www.nts.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">국세청</a>,{' '}
                  <a href="https://www.icl.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">취업 후 학자금 상환 누리집</a>.
                </p>
              </section>

              <ShareButtons
                title="취업 후 학자금 상환 2026 가이드"
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
