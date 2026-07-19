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

const URL = 'https://calculatorhost.com/guide/earned-income-tax-credit-semiannual-application-2026/';
const DATE_PUBLISHED = '2026-07-20';
const DATE_MODIFIED = '2026-07-20';

export const metadata: Metadata = {
  title: '근로장려금 반기신청 2026, 9월 신청기간과 정기신청 차이',
  description:
    '근로소득만 있는 직장인은 5월 정기신청 대신 9월 반기신청으로 근로장려금을 미리 받을 수 있습니다. 반기신청 대상, 상반기분 9월 1~15일 기간, 정기신청과의 차이를 조세특례제한법 §100의6 기준으로 정리했습니다.',
  keywords: [
    '근로장려금 반기신청',
    '근로장려금 9월 신청',
    '반기신청 정기신청 차이',
    '근로장려금 신청자격',
    '반기 근로장려금 지급',
    '조세특례제한법 100조의6',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '근로장려금 반기신청 2026, 9월 신청기간과 정기신청 차이' }],
    title: '근로장려금 반기신청 2026, 9월 신청으로 먼저 받는 법',
    description: '근로소득만 있는 거주자는 5월 정기신청 대신 9월 1~15일 반기신청으로 근로장려금을 앞당겨 받을 수 있습니다. 조세특례제한법 §100의6 기준 완전 정리.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '근로장려금 반기신청 2026, 9월 신청과 선지급 방식',
    description: '반기신청 대상, 신청기간(9월 1~15일), 정기신청과의 차이를 조세특례제한법 §100의6 기준으로 정리.',
  },
};

const FAQ_ITEMS = [
  {
    question: '근로장려금 반기신청이 정확히 무엇인가요?',
    answer:
      '반기신청은 근로소득만 있는 거주자가 반기별로 나눠 근로장려금을 신청하는 방식입니다(조세특례제한법 §100의6). 5월 정기신청 대신 상반기 소득분은 그해 9월 1일부터 15일까지, 하반기 소득분은 이듬해 3월 1일부터 15일까지 신청할 수 있습니다. 정기신청보다 지원금을 먼저 받을 수 있는 것이 핵심 특징이며, 근로소득 외 다른 소득이 없는 근로소득자에게만 허용됩니다.',
  },
  {
    question: '사업소득이 조금 있어도 반기신청이 가능한가요?',
    answer:
      '아닙니다, 사업소득이 조금이라도 있으면 반기신청 대상이 아닙니다. 조세특례제한법 §100의6은 반기 동안 근로소득만 있는 거주자(배우자 포함)에게만 반기신청을 허용합니다. 3.3% 원천징수를 받는 프리랜서도 세법상 사업소득자로 분류되므로 반기신청 대상에서 제외되고, 5월 정기신청을 이용해야 합니다. 종교인소득이 함께 있는 경우에도 마찬가지로 정기신청 대상입니다.',
  },
  {
    question: '상반기 근로소득분은 언제 신청하나요?',
    answer:
      '상반기(1월부터 6월까지) 근로소득분은 그해 9월 1일부터 9월 15일까지 15일간 신청합니다. 하반기(7월부터 12월까지) 소득분은 이듬해 3월 1일부터 3월 15일까지 신청 가능합니다. 각 신청 창구는 15일씩만 열리므로 미리 캘린더에 표시해두는 것을 권장합니다. 놓치면 6개월 이내 기한 후 신청이 가능하지만 지급액이 감액될 수 있습니다.',
  },
  {
    question: '반기신청하면 얼마를 언제 받나요?',
    answer:
      '각 반기 산정액 중 일부(국세청 홈택스 공고 기준 약 35% 수준)를 선지급받고, 다음 해 정기 정산 시점에 잔여분을 정산합니다. 상반기분(9월 신청)은 그해 12월경 선지급, 하반기분(이듬해 3월 신청)은 6월경 선지급되는 것이 일반적입니다. 정확한 선지급 비율과 지급 일정은 매년 국세청 홈택스 공고를 기준으로 확인해야 합니다.',
  },
  {
    question: '반기신청과 정기신청, 어느 것이 유리한가요?',
    answer:
      '소득이 안정적이라면 반기신청, 소득 급증 가능성이 있으면 정기신청이 유리합니다. 반기신청은 정기신청보다 최대 6개월 이상 먼저 지원금을 받을 수 있어 자금 유동성에 도움이 됩니다. 반면 선지급 후 실제 확정 소득이 신청 기준을 넘어서면 정산 시 초과분을 환수당할 수 있으므로, 성과급이나 상여로 연말 소득이 크게 늘어날 가능성이 있는 경우 정기신청이 더 안전합니다.',
  },
  {
    question: '상반기 신청 후 하반기도 따로 신청해야 하나요?',
    answer:
      '아닙니다, 상반기분을 신청하면 하반기분도 자동으로 신청된 것으로 간주됩니다(조세특례제한법 §100의6). 상반기 신청자는 별도 조치 없이 하반기분 지급 대상으로 자동 등록되므로 3월에 재신청할 필요가 없습니다. 다만 하반기 중 사업소득이 발생하거나 반기신청 대상 요건이 바뀌면 반기신청이 취소될 수 있으니 국세청 안내문을 반드시 확인하세요.',
  },
  {
    question: '신청 자격 요건, 총소득과 재산 기준은 얼마인가요?',
    answer:
      '부부합산 총소득이 가구유형별 기준금액 미만이고, 2025년 6월 1일 기준 가구원 재산 합계액이 2억 4천만원 미만이어야 합니다(조세특례제한법 §100의3). 가구유형은 단독가구, 홑벌이 가구, 맞벌이 가구로 구분되며 각 유형별 총소득 기준금액과 최대지급액은 매년 개정될 수 있으므로 국세청 홈택스 공고를 반드시 확인하세요. 재산에는 부동산, 예금, 주식, 자동차 등이 포함됩니다.',
  },
  {
    question: '반기신청 방법과 신청처는 어디인가요?',
    answer:
      '홈택스와 손택스 앱, ARS(1544-9944), 장려금 상담센터에서 신청할 수 있습니다. 국세청 안내문(모바일 안내)을 받은 경우 안내문 내 링크로 간편신청도 가능합니다. 신청기간(상반기분 9월 1~15일 또는 하반기분 이듬해 3월 1~15일) 내 마감 시각 전까지 접수해야 하며, 놓치면 신청일부터 6개월 이내 기한 후 신청을 이용할 수 있습니다. 다만 기한 후 신청은 산정액의 일부만 지급되므로 정기 신청기간을 지키는 것이 유리합니다.',
  },
];

export default function EarnedIncomeTaxCreditSemiannualApplication2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '근로장려금 반기신청 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '근로장려금 반기신청 2026, 9월 신청기간과 정기신청 차이',
    description:
      '근로소득만 있는 거주자가 선택할 수 있는 반기신청 제도. 상반기분 9월 1~15일, 하반기분 이듬해 3월 1~15일 신청, 산정액 일부 선지급 후 정기 정산. 조세특례제한법 §100의6·§100의3 기준 완전 정리.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['근로장려금', '반기신청', '9월 신청', '정기신청', '조세특례제한법 100조의6'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '근로장려금 반기신청 2026',
    description:
      '근로소득자가 5월 정기신청 대신 9월 반기신청으로 근로장려금을 앞당겨 받는 방법과 조건.',
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
                    { name: '근로장려금 반기신청 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">근로소득자 · 8분 읽기 · 2026-07-20</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  근로장려금 반기신청 2026
                  <br />
                  <span className="text-2xl text-text-secondary">9월 신청으로 먼저 받는 법</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  근로소득만 있는 직장인이라면 5월 정기신청을 기다리지 않아도 됩니다. 조세특례제한법 §100의6에 따라 상반기 근로소득분은 그해 9월, 하반기분은 이듬해 3월에 나눠 신청하는 반기신청 제도를 선택하면 근로장려금을 최대 6개월 이상 먼저 받을 수 있습니다. 이 가이드에서는 반기신청 대상, 신청 기간과 지급 구조, 정기신청과의 차이, 그리고 반기신청이 유리한 경우와 그렇지 않은 경우까지 실무 관점에서 정리합니다.
                </p>
              </header>

              <AdSlot slot="guide-earned-income-tax-credit-semiannual-application-2026-top" format="horizontal" />

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">근로장려금 반기신청이란 무엇인가요?</h2>
                <p>
                  반기신청은 근로소득만 있는 거주자가 상반기와 하반기 소득분에 대해 반기별로 나눠 근로장려금을 신청하는 방식입니다. 조세특례제한법 §100의6은 이 제도를 규정하면서, 5월 정기신청 대신 그해 9월과 이듬해 3월 두 차례 신청 창구를 두고 있습니다. 상반기(1월부터 6월까지) 소득분은 그해 9월 1일부터 9월 15일까지, 하반기(7월부터 12월까지) 소득분은 이듬해 3월 1일부터 3월 15일까지 신청합니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">반기신청의 기본 구조</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    · 근거: 조세특례제한법 §100의6(근로장려금의 신청 등)
                    <br />
                    · 대상: 반기 동안 근로소득만 있는 거주자(배우자 포함)
                    <br />
                    · 신청 시점: 상반기분 9월 1~15일, 하반기분 이듬해 3월 1~15일
                    <br />
                    · 지급 구조: 각 반기 산정액 일부 선지급 후 정기 정산
                  </p>
                </div>
                <p className="mt-4">
                  이 제도는 근로소득자의 자금 유동성을 개선하기 위한 목적으로 도입됐습니다. 정기신청은 매년 5월에 전년도 소득 전체를 대상으로 한 번에 처리하지만, 반기신청은 상반기 소득분을 그해 하반기에 미리 받을 수 있어 실질적으로 지원금을 앞당겨 받는 효과가 있습니다.
                </p>
                <p className="mt-4">
                  ⚠️ 다만 반기신청은 근로소득만 있는 사람에게만 허용됩니다. 사업소득이나 종교인소득이 조금이라도 발생한 경우 반기신청 대상이 아니므로 5월 정기신청을 이용해야 하며, 이 원칙은 부부합산 기준으로 판단합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">반기신청 대상은 누구인가요?</h2>
                <p>
                  반기신청 대상은 근로소득만 있는 거주자(배우자 포함)입니다. 조세특례제한법 §100의6은 "반기 동안 근로소득만 있는 거주자"를 반기신청 대상으로 명시합니다. 여기서 근로소득만이라는 표현은 본인과 배우자 모두 근로소득 외의 다른 소득이 없어야 한다는 의미로 해석됩니다.
                </p>
                <p className="mt-4">
                  구체적으로 다음 조건을 모두 충족해야 반기신청이 가능합니다.
                </p>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li>
                    <strong>근로소득만 존재:</strong> 본인·배우자 모두 근로소득만 있어야 하며, 사업소득·종교인소득이 발생하지 않아야 합니다.
                  </li>
                  <li>
                    <strong>거주자 요건:</strong> 국내에 주소를 두고 있거나 183일 이상 거소를 둔 거주자여야 합니다.
                  </li>
                  <li>
                    <strong>소득·재산 요건:</strong> 조세특례제한법 §100의3의 총소득·재산 기준을 충족해야 합니다(자세한 요건은 아래 별도 섹션에서 설명).
                  </li>
                  <li>
                    <strong>안내 대상 여부:</strong> 국세청이 별도로 발송하는 반기신청 안내문을 받은 경우 대상자 확인이 쉽습니다.
                  </li>
                </ul>
                <p className="mt-4">
                  ⚠️ 예외: 3.3% 원천징수를 받는 프리랜서는 세법상 사업소득자로 분류됩니다. 원천징수영수증 형식이 근로소득(간이세액표 적용)인지, 사업소득(3.3% 원천)인지에 따라 반기신청 가능 여부가 갈리므로 자신의 소득 유형을 정확히 확인해야 합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">반기신청과 정기신청, 무엇이 다른가요?</h2>
                <p>
                  가장 큰 차이는 신청 시점과 지급 방식입니다. 정기신청은 전년도 소득 전체를 대상으로 5월에 한 번에 신청하고 8~9월경 일괄 지급받는 반면, 반기신청은 상·하반기 소득분을 나눠 신청하고 각 반기 산정액의 일부를 선지급받은 뒤 다음 해 정기 정산 시점에 잔여분을 정산합니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 반기신청과 정기신청 비교 (조세특례제한법 §100의6·§100의5, 2026 기준)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">구분</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">반기신청</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">정기신청</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">신청 시기</td>
                        <td className="p-3">상반기분 9월 1~15일<br />하반기분 이듬해 3월 1~15일</td>
                        <td className="p-3">매년 5월 1~31일</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">대상 소득</td>
                        <td className="p-3">근로소득만</td>
                        <td className="p-3">근로·사업·종교인소득</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">지급 시기</td>
                        <td className="p-3">상반기분 그해 12월경<br />하반기분 이듬해 6월경(선지급)</td>
                        <td className="p-3">신청 연도 8~9월(일괄)</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">지급 방식</td>
                        <td className="p-3">산정액 일부 선지급 후 정기 정산</td>
                        <td className="p-3">확정 산정액 일괄 지급</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  ⚠️ 주의: 반기신청은 근로소득 외 다른 소득이 없는 경우에만 선택할 수 있습니다. 반기신청을 했더라도 그해 안에 사업소득이 발생하면 정기신청으로 재조정될 수 있고, 소득 구조가 바뀌었을 때 국세청 안내에 따라 신청 방식을 다시 확인해야 합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">상반기분은 언제 신청하나요?</h2>
                <p>
                  상반기 근로소득분은 그해 9월 1일부터 9월 15일까지 15일간 신청합니다. 조세특례제한법 §100의6은 반기 소득분별 신청 창구를 다음과 같이 명확히 규정합니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">반기별 신청 창구</p>
                  <p className="text-sm text-text-secondary">
                    · <strong>상반기(1~6월) 소득분</strong>: 그해 9월 1일부터 9월 15일까지 (15일간)
                    <br />
                    · <strong>하반기(7~12월) 소득분</strong>: 이듬해 3월 1일부터 3월 15일까지 (15일간)
                    <br />
                    · 각 신청 창구는 15일씩만 운영되므로 미리 캘린더에 표시해두는 것이 안전합니다.
                  </p>
                </div>
                <p className="mt-4">
                  중요한 점은 상반기분을 신청하면 하반기분도 자동으로 신청된 것으로 간주된다는 것입니다. 즉, 상반기 9월에 한 번 신청하면 이듬해 3월에 다시 신청 절차를 밟을 필요가 없습니다. 다만 하반기 중에 소득 구조가 바뀌어 사업소득이 발생하면 반기신청 자격이 취소될 수 있으므로 국세청 안내문을 확인해야 합니다.
                </p>
                <p className="mt-4">
                  ⚠️ 다만 신청 기간을 놓쳐도 6개월 이내에는 기한 후 신청이 가능하지만, 산정액의 일부만 지급되므로 감액 부담이 있습니다. 관련 상세는{' '}
                  <Link href="/guide/earned-income-tax-credit-late-application-2026/" className="text-primary-500 underline">
                    근로·자녀장려금 기한 후 신청 가이드
                  </Link>
                  를 참조하세요.
                </p>
              </section>

              <AdSlot slot="guide-earned-income-tax-credit-semiannual-application-2026-mid" format="rectangle" />

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">반기신청하면 얼마를 언제 받나요?</h2>
                <p>
                  각 반기 산정액 중 일부(국세청 홈택스 공고 기준 약 35% 수준)를 먼저 받고, 다음 해 정기 정산 시점에 잔여분을 정산합니다. 정확한 선지급 비율과 지급 시기는 매년 국세청 홈택스 공고에서 확정 발표되므로 신청 전에 반드시 확인해야 합니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">반기신청 지급 흐름 예시</p>
                  <p className="text-sm text-text-secondary">
                    · 2026년 상반기(1~6월) 근로소득 → 2026년 9월 1~15일 신청 → 2026년 12월경 산정액 일부 선지급
                    <br />
                    · 2026년 하반기(7~12월) 근로소득 → 2026년 상반기 신청자는 자동 → 2027년 6월경 선지급
                    <br />
                    · 2026년 연간 확정 소득 확정 → 2027년 정기 정산 시점에 잔여분 정산 지급 또는 초과분 환수
                  </p>
                </div>
                <p className="mt-4">
                  이 지급 흐름의 핵심은 선지급받은 금액은 아직 확정된 금액이 아니라는 점입니다. 조세특례제한법 §100의5에 따라 최종 산정액은 연간 확정 소득을 기준으로 다음 해에 계산되며, 선지급액과의 차액만큼 추가 지급 또는 환수 조정이 이루어집니다.
                </p>
                <p className="mt-4">
                  ⚠️ 예외: 선지급 이후 실제 확정 소득이 신청 기준을 넘어서면 정산 시 초과분을 환수당할 수 있습니다. 특히 성과급이나 상여로 하반기 소득이 크게 늘어날 가능성이 있는 경우, 반기신청보다 정기신청이 오히려 안전할 수 있습니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">소득·재산 요건은 어떻게 되나요?</h2>
                <p>
                  반기신청도 정기신청과 동일한 소득·재산 요건이 적용됩니다. 조세특례제한법 §100의3은 근로장려금 신청 자격을 크게 두 가지 축으로 규정합니다.
                </p>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li>
                    <strong>부부합산 총소득 기준:</strong> 과세기간(2025년 소득이라면 2026년 신청분) 부부합산 총소득이 가구유형별 기준금액 미만이어야 합니다. 가구유형은 단독가구, 홑벌이 가구, 맞벌이 가구로 나뉘고, 각 유형별 총소득 기준금액과 최대지급액은 매년 국세청 홈택스 공고로 확정됩니다.
                  </li>
                  <li>
                    <strong>가구원 재산 기준:</strong> 2025년 6월 1일 기준 가구원 전원의 재산 합계액이 2억 4천만원 미만이어야 합니다. 재산에는 부동산, 예금, 주식, 자동차, 회원권 등이 포함됩니다.
                  </li>
                </ul>
                <p className="mt-4">
                  가구유형 판정 기준은 다음과 같습니다. 단독가구는 배우자·부양자녀·70세 이상 직계존속이 없는 가구, 홑벌이 가구는 배우자나 부양가족이 있으면서 총급여액 등이 배우자 300만원 미만인 가구, 맞벌이 가구는 부부 모두 총급여액 등이 300만원 이상인 가구로 분류됩니다.
                </p>
                <p className="mt-4">
                  ⚠️ 다만 총소득 기준금액과 최대지급액은 매년 개정될 수 있으므로 반드시 국세청 홈택스 공고를 기준으로 확인해야 합니다. 본 가이드에서 임의의 원 단위 금액을 인용하지 않는 이유이며, 정확한 최신 금액은 국세청 근로·자녀장려금 안내 페이지에서 확인 가능합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">반기신청이 항상 유리한가요?</h2>
                <p>
                  미리 받는 이점이 있지만 소득 급변 시 정산 부담이 발생할 수 있습니다. 반기신청의 장점과 단점을 정확히 이해하고 자신의 소득 구조에 맞는 방식을 선택하는 것이 중요합니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">반기신청이 유리한 경우</p>
                  <p className="text-sm text-text-secondary">
                    · 근로소득이 안정적으로 유지되는 정규직 근로자
                    <br />
                    · 급여 외 성과급·상여가 크지 않아 연말 소득이 예측 가능한 경우
                    <br />
                    · 지원금이 필요한 시점이 정기신청 지급 시기(8~9월)보다 이른 경우
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">정기신청이 유리한 경우</p>
                  <p className="text-sm text-text-secondary">
                    · 하반기 성과급·상여로 연말 소득이 크게 늘어날 가능성이 있는 경우
                    <br />
                    · 이직·퇴사·재취업 등으로 소득 구조가 바뀔 가능성이 있는 경우
                    <br />
                    · 하반기 중 사업소득이 발생할 예정인 경우(반기신청 자격 상실)
                  </p>
                </div>
                <p className="mt-4">
                  판단의 핵심은 소득 예측 가능성입니다. 소득이 연중 안정적이면 반기신청으로 자금 흐름을 개선할 수 있지만, 소득 급증 가능성이 있다면 정기신청으로 정산 위험을 피하는 것이 안전합니다.
                </p>
                <p className="mt-4">
                  ⚠️ 주의: 반기신청을 선택했다가 그해 안에 사업소득이 발생하면 반기신청 자격을 잃고 정기신청 대상으로 전환됩니다. 이 경우 별도로 5월 정기신청 절차를 진행해야 하며, 국세청 안내를 확인하지 못하면 신청 시기를 놓칠 수 있으니 유의하세요.
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
                    <p className="mt-1 text-sm text-text-secondary">근로소득자의 세후 월급과 4대보험 공제액을 확인하세요.</p>
                  </Link>
                  <Link
                    href="/guide/earned-income-tax-credit-late-application-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">근로·자녀장려금 기한 후 신청</div>
                    <p className="mt-1 text-sm text-text-secondary">정기신청 놓쳤을 때 6개월 이내 기한 후 신청 절차와 감액.</p>
                  </Link>
                  <Link
                    href="/guide/earned-income-tax-credit-vs-child/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">근로장려금 vs 자녀장려금</div>
                    <p className="mt-1 text-sm text-text-secondary">두 장려금의 차이와 중복 신청 가능 여부를 정리합니다.</p>
                  </Link>
                  <Link
                    href="/guide/child-earned-income-tax-credit-application-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">자녀장려금 신청 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">자녀장려금 대상, 신청 방법, 지급 시기와 금액.</p>
                  </Link>
                  <Link
                    href="/guide/year-end-tax-settlement/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">연말정산 가이드</div>
                    <p className="mt-1 text-sm text-text-secondary">근로소득자의 연말정산 준비와 공제 항목을 한눈에.</p>
                  </Link>
                  <Link
                    href="/category/tax/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">모든 세금 가이드</div>
                    <p className="mt-1 text-sm text-text-secondary">양도세·취득세·상속세·종소세 등 세금 가이드 모음.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 교육 목적으로 작성되었으며, 개인 맞춤형 세무 조언이 아닙니다. 반기신청 대상 여부, 실제 산정액, 선지급 비율, 총소득·재산 기준금액은 매년 개정될 수 있으므로 국세청 홈택스(hometax.go.kr) 공고와 관할 세무서를 반드시 확인하세요. 특히 소득 구조가 근로소득만인지, 사업소득이 함께 있는지에 따라 신청 방식이 달라지므로 원천징수 유형을 정확히 파악한 뒤 신청해야 합니다. 본 콘텐츠는 2026-07-20을 기준으로 작성되었으며, 관련 법령 개정 시 즉시 업데이트됩니다. 근로장려금 반기신청의 정확한 기준은 법조항 <strong>조세특례제한법 §100의3(신청자격), §100의5(산정), §100의6(신청 등)</strong>을 따릅니다. AI 보조 작성 후 운영자 검수 완료.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터</a>,{' '}
                  <a href="https://www.hometax.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">국세청 홈택스</a>,{' '}
                  <a href="https://www.nts.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">국세청 근로·자녀장려금 안내</a>.
                </p>
              </section>

              <ShareButtons
                title="근로장려금 반기신청 2026 가이드"
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
