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

const URL = 'https://calculatorhost.com/guide/non-taxable-salary-allowances-2026/';
const DATE_PUBLISHED = '2026-07-21';
const DATE_MODIFIED = '2026-07-21';

export const metadata: Metadata = {
  title: '비과세 급여 항목 2026, 식대·자가운전·보육수당 20만원',
  description:
    '월급에서 세금을 떼지 않는 비과세 급여 항목이 있습니다. 식대 월 20만원, 자가운전보조금 월 20만원, 6세 이하 자녀 보육수당 월 20만원 등 주요 비과세 한도와 요건, 주의할 점을 소득세법 §12 기준으로 정리했습니다.',
  keywords: [
    '비과세 급여',
    '식대 비과세 20만원',
    '자가운전보조금 비과세',
    '보육수당 비과세',
    '비과세 근로소득',
    '비과세 한도',
    '소득세법 12조',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '비과세 급여 항목 2026' }],
    title: '비과세 급여 항목 2026, 식대·자가운전·보육수당 20만원',
    description:
      '식대 20만·자가운전보조금 20만·보육수당 20만 등 비과세 급여 항목과 한도. 소득세법 §12.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '비과세 급여 항목 2026',
    description: '식대·자가운전보조금·보육수당 각 월 20만원 비과세. 한도와 요건, 주의점. 소득세법 §12.',
  },
};

const FAQ_ITEMS = [
  {
    question: '비과세 급여가 정확히 무엇인가요?',
    answer:
      '비과세 급여는 소득세를 매기지 않는 근로소득 항목입니다(소득세법 §12 제3호). 급여에 포함돼 통장에 들어오지만 총급여에서 제외되어 소득세와 4대보험 산정 기준에서 빠집니다. 실수령액이 올라가는 효과가 있어, 같은 연봉이라도 비과세 항목을 잘 챙긴 급여 구성이 유리합니다.',
  },
  {
    question: '식대는 얼마까지 비과세인가요?',
    answer:
      '현물 식사를 제공받지 않고 현금으로 받는 식대는 월 20만원까지 비과세입니다(소득세법 §12 제3호, 시행령 §17의2). 회사에서 구내식당 등으로 식사를 현물 제공받으면서 별도로 식대를 받으면 그 식대는 과세됩니다. 두 곳 이상에서 식대를 받아도 합산 월 20만원까지만 비과세입니다.',
  },
  {
    question: '자가운전보조금은 어떤 조건에서 비과세되나요?',
    answer:
      '본인 명의 차량을 업무에 사용하고, 회사 규정에 따라 실비 대신 받는 자가운전보조금이 월 20만원까지 비과세입니다(소득세법 §12 제3호). 반드시 본인 명의 차량이어야 하며 배우자·부모 명의 차량은 인정되지 않습니다. 또한 시내출장비 등 실제 여비를 별도로 정산받으면 그 부분은 비과세 대상에서 제외됩니다.',
  },
  {
    question: '6세 이하 자녀 보육수당도 비과세인가요?',
    answer:
      '네, 6세 이하 자녀의 보육과 관련해 사용자로부터 받는 출산·보육수당은 자녀 1인당 월 20만원까지 비과세입니다(소득세법 §12 제3호). 맞벌이 부부는 각자의 회사에서 받을 수 있어 부부 합산 월 40만원까지 비과세 혜택이 가능합니다. 자녀 나이는 과세기간 중 6세가 되는 시점 등 세부 기준을 확인하세요.',
  },
  {
    question: '비과세 한도를 넘으면 어떻게 되나요?',
    answer:
      '한도를 초과한 금액은 일반 근로소득으로 과세됩니다. 예를 들어 식대를 월 30만원 받으면 20만원은 비과세, 나머지 10만원은 과세 대상입니다. 즉 항목별 한도까지만 세금이 빠지고, 초과분은 일반 급여와 똑같이 소득세·4대보험이 부과됩니다.',
  },
  {
    question: '비과세 급여가 많으면 무조건 이득인가요?',
    answer:
      '단기적으로는 세금·4대보험이 줄어 실수령액이 늘지만, 장기적으로는 불리한 면도 있습니다. 국민연금 보험료 산정 기준(기준소득월액)이 낮아지면 나중에 받는 노령연금도 줄고, 퇴직금(평균임금) 산정에서 제외되며, 대출 심사 시 소득 증빙이 낮게 잡힐 수 있습니다. 균형 있게 판단해야 합니다.',
  },
  {
    question: '비과세 급여도 연말정산에 신고하나요?',
    answer:
      '아니요, 비과세 소득은 애초에 총급여에서 제외되므로 연말정산에서 별도로 신고하거나 공제받을 필요가 없습니다. 회사가 급여 지급 단계에서 이미 비과세로 처리해 원천징수영수증에 반영합니다. 다만 항목·한도가 규정에 맞게 적용됐는지 원천징수영수증에서 확인해 두는 것이 좋습니다.',
  },
  {
    question: '생산직 야간근로수당도 비과세가 되나요?',
    answer:
      '일정 요건을 갖춘 생산직 근로자의 연장·야간·휴일근로수당은 연 240만원 한도로 비과세됩니다(소득세법 §12 제3호, 시행령 §17). 직전 과세기간 총급여와 월정액급여가 기준 이하인 생산직·서비스직 등에 적용되며, 사무직에는 해당하지 않습니다. 구체적 요건은 회사·세무 담당에게 확인하세요.',
  },
];

export default function NonTaxableSalaryAllowances2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '비과세 급여 항목 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '비과세 급여 항목 2026, 식대·자가운전·보육수당 20만원',
    description:
      '식대·자가운전보조금·보육수당 각 월 20만원 등 비과세 급여 항목과 한도·요건, 국민연금·퇴직금에 미치는 영향까지 완전 정리.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['비과세 급여', '식대', '자가운전보조금', '보육수당', '소득세법 12조'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '비과세 급여 항목 2026',
    description: '식대·자가운전보조금·보육수당 등 근로소득 비과세 항목과 한도, 요건, 주의점을 정리.',
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
                    { name: '비과세 급여 항목 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">직장인 · 7분 읽기 · 2026-07-21</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  비과세 급여 항목 2026
                  <br />
                  <span className="text-2xl text-text-secondary">식대·자가운전·보육수당 각 월 20만원</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  이 가이드는 같은 연봉이라도 실수령액을 한 푼이라도 늘리고 싶은 직장인을 위한 것입니다. 월급 중 일부는 소득세와 4대보험을 매기지 않는 비과세 항목으로 구성할 수 있습니다. 식대, 자가운전보조금, 보육수당처럼 자주 쓰이는 비과세 항목의 한도와 요건, 그리고 무작정 늘리면 생기는 함정까지 근거 조항과 함께 정리했습니다.
                </p>
              </header>

              <AdSlot slot="guide-non-taxable-salary-allowances-top" format="horizontal" />

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">비과세 급여가 무엇인가요?</h2>
                <p>
                  비과세 급여는 소득세를 부과하지 않는 근로소득 항목입니다(소득세법 §12 제3호). 통장에는 들어오지만 총급여에서 빠지므로 소득세뿐 아니라 국민연금·건강보험 등 4대보험 산정 기준에서도 제외됩니다. 결과적으로 세전 연봉이 같아도 실수령액이 달라집니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">비과세 급여의 효과</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    · 총급여에서 제외 → 소득세 과세표준 감소
                    <br />
                    · 4대보험 부과 기준(보수월액·기준소득월액)에서 제외
                    <br />
                    · 실수령액 증가
                    <br />
                    → 단, 국민연금·퇴직금 산정에서도 빠진다는 점은 아래에서 별도 설명
                  </p>
                </div>
                <p className="mt-4">
                  다만 회사가 급여 항목을 마음대로 비과세로 만들 수 있는 것은 아닙니다. 법에서 정한 항목과 한도 내에서만 비과세가 인정되며, 요건을 벗어나면 과세 대상으로 되돌아갑니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">대표 비과세 항목과 한도는?</h2>
                <p>
                  실무에서 가장 많이 쓰이는 비과세 항목을 한도와 함께 표로 정리했습니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 주요 근로소득 비과세 항목과 한도 (소득세법 §12 제3호, 2026 기준)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">항목</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">비과세 한도</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">핵심 요건</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">식대(현금)</td>
                        <td className="p-3"><strong>월 20만원</strong></td>
                        <td className="p-3">현물 식사 미제공</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">자가운전보조금</td>
                        <td className="p-3"><strong>월 20만원</strong></td>
                        <td className="p-3">본인 명의 차량 업무 사용</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">출산·보육수당(6세 이하)</td>
                        <td className="p-3"><strong>자녀당 월 20만원</strong></td>
                        <td className="p-3">6세 이하 자녀 보육</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">생산직 야간근로수당</td>
                        <td className="p-3"><strong>연 240만원</strong></td>
                        <td className="p-3">총급여·월정액급여 기준 이하</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">일직·숙직료, 실비 여비</td>
                        <td className="p-3">실비 수준</td>
                        <td className="p-3">사회통념상 타당한 범위</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  ⚠️ 다만 각 항목은 요건을 모두 충족해야 비과세됩니다. 예를 들어 자가운전보조금은 본인 명의 차량이 아니면 전액 과세되고, 식대는 현물 급식을 함께 받으면 과세로 전환됩니다. 형식만 비과세 명목으로 붙인다고 인정되지 않습니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">비과세 급여가 실수령액을 얼마나 바꾸나요?</h2>
                <p>
                  대표 항목을 최대로 활용했을 때의 효과를 계산해 보겠습니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 1. 식대·자가운전·보육수당 모두 적용</p>
                  <p className="text-sm text-text-secondary">
                    · 식대 20만 + 자가운전보조금 20만 + 6세 이하 자녀 1인 보육수당 20만 = 월 60만원
                    <br />
                    · 연간 비과세 = 60만 × 12 = <strong>720만원</strong>
                    <br />
                    · 이 720만원은 소득세 과세표준과 4대보험 산정에서 제외
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 세율 구간·보험료율에 따라 연 수십만원의 실수령액 차이가 발생합니다.</span>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 2. 한도 초과 시</p>
                  <p className="text-sm text-text-secondary">
                    · 식대를 월 30만원 지급 → 20만원 비과세, 10만원 과세
                    <br />
                    · 초과 10만원은 일반 급여처럼 소득세·4대보험 부과
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 항목별 한도까지만 비과세되고 초과분은 세금이 붙습니다.</span>
                  </p>
                </div>
              </section>

              <AdSlot slot="guide-non-taxable-salary-allowances-mid" format="rectangle" />

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">비과세 급여, 장점만 있을까요?</h2>
                <p>
                  아닙니다. 비과세는 당장의 세금·보험료를 줄이지만, 소득 기준으로 정해지는 다른 제도에서 불리해질 수 있습니다. 아래 표로 득과 실을 비교했습니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 2. 비과세 급여 확대의 득과 실</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">구분</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">유리(득)</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">불리(실)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">소득세</td>
                        <td className="p-3">과세표준 감소</td>
                        <td className="p-3">-</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">국민연금</td>
                        <td className="p-3">보험료 감소</td>
                        <td className="p-3">노령연금 수령액 감소</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">퇴직금</td>
                        <td className="p-3">-</td>
                        <td className="p-3">평균임금 산정에서 제외</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">대출·소득 증빙</td>
                        <td className="p-3">-</td>
                        <td className="p-3">인정 소득이 낮게 잡힘</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  즉 사회초년생이나 대출·연금 수령이 먼 경우에는 비과세 확대가 대체로 유리하지만, 곧 대출을 받거나 은퇴가 가까운 경우에는 소득 증빙·연금 측면을 함께 따져야 합니다.
                </p>
              </section>

              <section className="space-y-6 border-t border-border-base pt-8">
                <h2 className="text-2xl font-bold">비과세 항목을 챙길 때 확인할 것</h2>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li><strong>원천징수영수증 확인:</strong> 매년 연말정산 후 원천징수영수증에서 비과세 항목·금액이 규정대로 반영됐는지 봅니다.</li>
                  <li><strong>중복 수령 합산:</strong> 두 곳 이상에서 같은 항목(식대 등)을 받으면 합산 한도가 적용됩니다.</li>
                  <li><strong>요건 서류 보관:</strong> 자가운전보조금은 차량등록증, 보육수당은 가족관계증명 등 요건 입증 자료를 보관하면 사후 확인에 대비할 수 있습니다.</li>
                </ul>
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
                    <p className="mt-1 text-sm text-text-secondary">비과세 항목을 반영해 실수령액을 계산해보세요.</p>
                  </Link>
                  <Link
                    href="/guide/four-major-insurance-rates-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">4대보험 요율 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">국민연금·건강보험 등 보험료율 정리.</p>
                  </Link>
                  <Link
                    href="/guide/simplified-withholding-tax-table-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">근로소득 간이세액표</div>
                    <p className="mt-1 text-sm text-text-secondary">매월 원천징수되는 소득세 계산 원리.</p>
                  </Link>
                  <Link
                    href="/guide/salary-take-home-2026-july-insurance-increase/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">7월 보험료 인상 실수령액</div>
                    <p className="mt-1 text-sm text-text-secondary">국민연금 요율 변화가 월급에 미치는 영향.</p>
                  </Link>
                  <Link
                    href="/guide/mid-year-resignation-year-end-tax-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">중도퇴사 연말정산</div>
                    <p className="mt-1 text-sm text-text-secondary">퇴사자의 연말정산 처리 방법.</p>
                  </Link>
                  <Link
                    href="/category/work/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">모든 근로 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">연봉·실수령·퇴직금 계산기 모음.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 교육 목적으로 작성되었으며, 개인 맞춤형 세무 조언이 아닙니다. 실제 비과세 항목 적용 여부, 한도, 요건 충족 판단은 급여 구성과 회사 규정에 따라 달라지므로 회사 급여 담당·세무대리인 또는 국세청에서 반드시 확인하세요. 본 콘텐츠는 2026-07-21 기준이며 세법 개정 시 업데이트됩니다. 근거 법조항은 <strong>소득세법 §12(비과세소득) 제3호</strong> 및 소득세법 시행령 §12·§17·§17의2입니다. AI 보조 작성 후 운영자 검수 완료.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터</a>,{' '}
                  <a href="https://www.nts.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">국세청</a>,{' '}
                  <a href="https://www.hometax.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">홈택스</a>.
                </p>
              </section>

              <ShareButtons
                title="비과세 급여 항목 2026 가이드"
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
