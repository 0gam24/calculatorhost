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

const URL = 'https://calculatorhost.com/guide/chuseok-bonus-tax-2026/';
const DATE_PUBLISHED = '2026-08-14';
const DATE_MODIFIED = '2026-08-14';

export const metadata: Metadata = {
  title: '추석 상여금 세금 2026, 명절 보너스 얼마나 떼나',
  description:
    '추석 상여금은 월급과 같은 근로소득이라 소득세와 4대보험을 모두 뗍니다. 명절 선물세트도 원칙적으로 과세되며, 더 낸 세금은 연말정산으로 정산됩니다. 상여금 원천징수와 실수령액 계산을 소득세법 §20 기준으로 정리했습니다.',
  keywords: [
    '추석 상여금 세금',
    '명절 보너스 세금',
    '상여금 4대보험',
    '명절 선물 과세',
    '상여금 실수령액',
    '상여금 원천징수',
    '소득세법 20조',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '추석 상여금 세금 2026, 명절 보너스 얼마나 떼나' }],
    title: '추석 상여금 세금 2026, 명절 보너스 얼마나 떼나',
    description: '상여금도 근로소득이라 소득세·4대보험 부과. 명절 선물세트 과세 여부와 실수령액 계산까지 정리.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '추석 상여금 세금 2026, 명절 보너스 얼마나 떼나',
    description: '상여금 100만원 받으면 실수령 얼마? 근로소득 과세와 4대보험, 명절 선물 과세를 정리.',
  },
};

const FAQ_ITEMS = [
  {
    question: '추석 상여금도 세금을 떼나요?',
    answer:
      '네, 뗍니다. 추석 상여금은 소득세법 §20의 근로소득에 해당하므로 회사가 소득세와 지방소득세를 원천징수한 뒤 지급합니다. 월급과 성격이 같아 별도의 비과세 혜택이 있는 것이 아니며, 상여를 받은 달의 급여와 합산해 원천징수 세액을 계산합니다.',
  },
  {
    question: '상여금은 4대보험도 떼나요?',
    answer:
      '네. 상여금도 보수에 포함되므로 건강보험·고용보험 등 4대보험 부과 대상입니다. 다만 국민연금은 매월 기준소득월액을 기준으로 부과되어 상여마다 곧바로 떼지 않을 수 있고, 건강보험은 연말에 보수총액으로 정산됩니다. 정확한 공제는 회사 급여 시스템과 각 공단 기준을 따릅니다.',
  },
  {
    question: '명절 선물세트를 받아도 세금을 내나요?',
    answer:
      '원칙적으로 과세됩니다. 회사가 상여금 대신 명절 선물세트를 주더라도 소득세법상 근로소득에 포함되어 근로소득세 과세 대상입니다. 현금이든 현물이든 회사가 직원에게 준 경제적 이익은 근로소득으로 보는 것이 원칙입니다.',
  },
  {
    question: '상여금 세금은 어떻게 계산하나요?',
    answer:
      '상여금 원천징수는 지급대상기간이 정해졌는지에 따라 다릅니다. 지급대상기간이 없으면 그 해 1월 1일부터 상여 지급월까지를 기간으로 보아 월 환산액으로 간이세액을 계산합니다. 계산이 복잡해 회사가 급여 시스템으로 처리하며, 최종 세액은 연말정산으로 정산됩니다.',
  },
  {
    question: '보너스 100만원 받으면 실수령은 얼마인가요?',
    answer:
      '부양가족 수와 급여 수준에 따라 다르지만, 소득세와 4대보험을 합쳐 대략 10~20%가 공제되는 경우가 많습니다. 예를 들어 공제율이 15%라면 100만원 중 약 15만원이 빠져 실수령은 약 85만원입니다. 다만 이는 예시일 뿐, 정확한 금액은 개인별 원천징수 조건에 따라 달라집니다.',
  },
  {
    question: '뗀 세금은 돌려받을 수 있나요?',
    answer:
      '상여를 받은 달에 원천징수가 많이 됐더라도, 1년 소득을 합산하는 연말정산에서 최종 세액이 확정됩니다. 원천징수 합계가 결정세액보다 많으면 차액을 환급받습니다. 즉 상여금에서 세금을 많이 뗐다고 손해 보는 것이 아니라, 연말정산으로 조정됩니다.',
  },
  {
    question: '회사가 거래처에 준 명절 선물도 근로소득인가요?',
    answer:
      '아니요. 직원에게 준 선물은 근로소득이지만, 거래처·고객에게 준 명절 선물은 사업자의 접대비(기업업무추진비)로 분류됩니다. 받는 사람이 직원인지 외부 거래처인지에 따라 세무 처리가 완전히 달라집니다.',
  },
  {
    question: '경조사비나 복지포인트도 과세되나요?',
    answer:
      '사규에 따른 경조사비 중 사회통념상 타당한 범위는 과세하지 않는 것이 일반적이나, 복지포인트는 근로소득으로 보아 과세하는 것이 과세관청의 입장입니다. 항목별 판정이 다르므로 구체적 사안은 회사 세무 담당이나 세무대리인에게 확인하세요.',
  },
];

export default function ChuseokBonusTax2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '추석 상여금 세금 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '추석 상여금 세금 2026, 명절 보너스 얼마나 떼나',
    description:
      '추석 상여금과 명절 선물의 근로소득 과세, 4대보험 부과, 원천징수 방식, 실수령액, 연말정산 정산까지 소득세법 §20 기준으로 정리한 직장인 가이드.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['추석 상여금', '명절 보너스', '근로소득', '4대보험', '원천징수'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '추석 상여금 세금 2026',
    description:
      '추석 상여금·명절 선물의 근로소득 과세와 4대보험, 실수령액과 연말정산 정산 정리.',
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
                    { name: '추석 상여금 세금 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">직장인 · 7분 읽기 · 2026-08-14</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  추석 상여금 세금 2026
                  <br />
                  <span className="text-2xl text-text-secondary">· 명절 보너스, 얼마나 떼나</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  추석을 앞두고 상여금이나 명절 선물세트를 받는 직장인이 많습니다. 그런데 통장에 찍힌 금액이 회사가 말한 상여금보다 적어 당황하는 경우가 흔합니다. 이유는 간단합니다. 상여금도 월급과 똑같은 근로소득이라 소득세와 4대보험을 떼기 때문입니다. 이 글은 상여금과 명절 선물에 붙는 세금의 원리, 실수령액 계산, 그리고 뗀 세금이 연말정산에서 어떻게 정산되는지를 정리합니다.
                </p>
              </header>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">추석 상여금도 세금을 떼나요?</h2>
                <p>
                  네, 뗍니다. 추석 상여금은 소득세법 §20이 정한 근로소득에 해당합니다. 근로를 제공한 대가로 받는 모든 금품이 근로소득이므로, 명목이 상여든 보너스든 회사는 소득세와 지방소득세(소득세의 10%)를 원천징수한 뒤 나머지를 지급합니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">30초 요약</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    · 상여금 = 근로소득 → 소득세 + 지방소득세 + 4대보험 공제
                    <br />
                    · 명절 선물세트 = 원칙적으로 근로소득 과세
                    <br />
                    · 상여 원천징수는 지급대상기간 기준으로 월 환산해 계산
                    <br />
                    · 많이 뗀 세금은 <strong>연말정산</strong>에서 정산·환급
                  </p>
                </div>
                <p>
                  다만 식대(월 20만원 이하), 자가운전보조금(월 20만원 이하) 등 법이 정한 비과세 항목은 상여와 별개로 과세되지 않습니다. 상여금 자체에는 이런 비과세가 적용되지 않는다는 점을 기억하세요.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">상여금에서 무엇을 얼마나 떼나요?</h2>
                <p>
                  상여금에서 빠지는 항목은 크게 소득세·지방소득세와 4대보험입니다. 4대보험 근로자 부담률은 다음과 같습니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 2026년 4대보험 근로자 부담률 (참고)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">항목</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">근로자 부담률</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">비고</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">국민연금</td>
                        <td className="p-3">4.5% (7월부터 4.75%)</td>
                        <td className="p-3">기준소득월액 기준, 상한 있음</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">건강보험</td>
                        <td className="p-3">3.545%</td>
                        <td className="p-3">보수총액으로 연말 정산</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">장기요양</td>
                        <td className="p-3">건강보험료의 12.95%</td>
                        <td className="p-3">건강보험에 부가</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">고용보험</td>
                        <td className="p-3">0.9%</td>
                        <td className="p-3">실업급여분</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p>
                  다만 국민연금은 매월 기준소득월액을 기준으로 부과되므로, 상여를 받았다고 그 달에 곧바로 연금 보험료가 더 늘지 않을 수 있습니다. 건강보험은 연말에 실제 보수총액으로 정산합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">보너스 100만원 받으면 실수령은 얼마?</h2>
                <p>
                  결론부터 말하면 부양가족과 급여에 따라 다르지만, 소득세와 4대보험을 합쳐 대략 10~20%가 공제됩니다. 예시로 살펴봅니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 1. 상여금 100만원 (공제율 15% 가정)</p>
                  <p className="text-sm text-text-secondary">
                    · 상여금: 100만원
                    <br />
                    · 소득세 + 지방소득세 + 4대보험 공제(가정 15%): 약 15만원
                    <br />
                    · 실수령액: 100만원 − 15만원 = <strong>약 85만원</strong>
                    <br />
                    <span className="text-xs text-text-tertiary">공제율은 예시입니다. 실제는 부양가족 수, 급여 수준, 간이세액표에 따라 달라집니다.</span>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 2. 명절 선물세트 30만원</p>
                  <p className="text-sm text-text-secondary">
                    · 회사가 30만원 상당의 선물세트를 지급
                    <br />
                    · 근로소득에 포함되어 그 달 급여와 합산해 원천징수
                    <br />
                    <span className="text-xs text-text-tertiary">현물이라도 경제적 이익이므로 과세가 원칙입니다.</span>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 3. 연말정산 환급</p>
                  <p className="text-sm text-text-secondary">
                    · 상여로 원천징수가 많이 된 해에 각종 공제를 챙김
                    <br />
                    · 연간 원천징수 합계 &gt; 결정세액 → 차액 환급
                    <br />
                    <span className="text-xs text-text-tertiary">상여에서 세금을 많이 뗐어도 연말정산으로 조정되므로 최종 부담은 1년 단위로 결정됩니다.</span>
                  </p>
                </div>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">상여금 세금은 어떻게 계산하나요?</h2>
                <p>
                  상여금 원천징수는 지급대상기간이 정해졌는지에 따라 방식이 나뉩니다. 핵심은 상여를 월 단위로 환산해 간이세액표를 적용한다는 것입니다.
                </p>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li>
                    <strong>지급대상기간이 있는 경우:</strong> 상여를 해당 기간의 월수로 나눠 월 급여에 더한 뒤 간이세액을 계산하고, 다시 월수를 곱해 상여 세액을 구합니다.
                  </li>
                  <li>
                    <strong>지급대상기간이 없는 경우:</strong> 그 해 1월 1일부터 상여 지급월까지를 기간으로 보아 같은 방식으로 계산합니다.
                  </li>
                </ul>
                <p>
                  다만 이 계산은 회사 급여 시스템이 자동으로 처리하므로 직원이 직접 계산할 일은 드뭅니다. 중요한 것은 그 달의 원천징수가 늘어난 것이 최종 세금이 아니라는 점입니다.
                </p>
              </section>

              <section className="space-y-6 border-t border-border-base pt-8">
                <h2 className="text-2xl font-bold">직원 선물과 거래처 선물, 세무가 다릅니다</h2>
                <p>
                  회사(사업주) 입장에서 명절 선물은 받는 사람에 따라 처리가 완전히 달라집니다. 이 구분은 사업자에게 특히 중요합니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 2. 명절 선물의 세무 처리 구분</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">받는 사람</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">회사 처리</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">직원 과세</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">직원</td>
                        <td className="p-3">복리후생비 성격, 근로소득 처리</td>
                        <td className="p-3">근로소득 과세</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">거래처·고객</td>
                        <td className="p-3">접대비(기업업무추진비)</td>
                        <td className="p-3">해당 없음</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p>
                  다만 접대비는 한도가 있고 증빙 요건이 엄격하므로, 사업자는 거래처 선물의 증빙을 반드시 갖춰야 합니다.
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
                    <p className="mt-1 text-sm text-text-secondary">월급과 상여에서 떼는 세금·4대보험을 확인하세요.</p>
                  </Link>
                  <Link
                    href="/guide/non-taxable-salary-allowances-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">비과세 급여 항목 정리</div>
                    <p className="mt-1 text-sm text-text-secondary">식대·보육수당 등 세금 안 떼는 항목을 챙기세요.</p>
                  </Link>
                  <Link
                    href="/guide/four-major-insurance-rates-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">4대보험 요율 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">국민연금·건강보험 부담률을 한눈에 보세요.</p>
                  </Link>
                  <Link
                    href="/guide/year-end-tax-settlement/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">연말정산 완벽 가이드</div>
                    <p className="mt-1 text-sm text-text-secondary">뗀 세금을 돌려받는 연말정산의 원리.</p>
                  </Link>
                  <Link
                    href="/guide/welfare-points-taxation-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">복지포인트 과세</div>
                    <p className="mt-1 text-sm text-text-secondary">복지포인트가 근로소득인지 궁금하다면.</p>
                  </Link>
                  <Link
                    href="/category/work/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">근로·급여 가이드 모음</div>
                    <p className="mt-1 text-sm text-text-secondary">연봉·실수령·수당 관련 가이드 전체.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 교육 목적으로 작성되었으며, 개인 맞춤형 세무 조언이 아닙니다. 상여금 원천징수액, 4대보험 공제, 복지포인트·경조사비 과세 여부 등은 회사 급여 담당이나 세무대리인, 국세청 상담(126)으로 확인하세요. 본 콘텐츠는 2026-08-14 기준으로 작성되었으며, 관련 법령·요율 개정 시 즉시 업데이트됩니다. 인용한 법조항은 <strong>소득세법 §20(근로소득), §134~§137(원천징수·연말정산)</strong>이며, 4대보험 요율은 각 공단 고시를 따릅니다. AI 보조 작성 후 운영자 검수 완료.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.nts.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">국세청</a>,{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터</a>,{' '}
                  <a href="https://www.nhis.or.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">국민건강보험공단</a>.
                </p>
              </section>

              <ShareButtons
                title="추석 상여금 세금 2026 가이드"
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
