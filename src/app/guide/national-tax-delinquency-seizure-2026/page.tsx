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

const URL = 'https://calculatorhost.com/guide/national-tax-delinquency-seizure-2026/';
const DATE_PUBLISHED = '2026-09-10';
const DATE_MODIFIED = '2026-09-10';

export const metadata: Metadata = {
  title: '국세 체납 압류 절차·해제 조건 2026, 예금·급여 압류 기준',
  description:
    '국세를 기한까지 못 내면 독촉 후 압류로 이어집니다. 압류가 시작되는 시점, 예금·급여 압류가 제한되는 금액, 공매까지 가는 순서, 완납 외에 압류가 즉시 해제되는 조건을 국세징수법 §10·§31·§41·§42·§57 기준으로 정리했습니다.',
  keywords: [
    '국세 체납 압류',
    '압류 해제 조건',
    '체납 압류 절차',
    '예금 압류 금지 금액',
    '급여 압류 제한',
    '국세징수법 57조',
    '체납처분 공매',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '국세 체납 압류 절차·해제 조건 2026, 예금·급여 압류 기준' }],
    title: '국세 체납 압류 절차·해제 조건 2026',
    description: '독촉부터 압류, 공매까지 순서와 예금·급여 압류 금지 금액, 압류가 즉시 해제되는 4가지 조건.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '국세 체납 압류 절차·해제 조건 2026',
    description: '독촉부터 공매까지 순서, 예금·급여 압류 금지 금액, 압류 해제 4가지 조건. 국세징수법 §57.',
  },
};

const FAQ_ITEMS = [
  {
    question: '국세를 며칠 연체하면 바로 압류되나요?',
    answer:
      '연체 즉시가 아니라 독촉장에서 정한 기한까지도 내지 않아야 압류로 이어집니다(국세징수법 §10, §31). 관할 세무서는 체납이 발생하면 먼저 독촉장을 발급하고, 그 독촉장에 적힌 납부기한까지 완납하지 않으면 재산을 압류할 수 있습니다. 실무적으로는 독촉 후에도 바로 압류되지 않고 안내·상담 절차가 이어지는 경우가 많지만, 법적으로는 독촉 기한 경과가 압류 요건입니다.',
  },
  {
    question: '통장에 있는 돈은 얼마까지 압류가 안 되나요?',
    answer:
      '개인별 잔액이 250만 원 미만인 예금·적금·부금 등은 압류금지재산에 해당합니다(국세징수법 §41, 시행령 §31). 다만 이는 계좌 하나의 잔액이 아니라 체납자 명의의 모든 계좌를 합산해 판단하는 것이 원칙이므로, 여러 계좌에 나눠 두어도 합산액이 기준을 넘으면 압류 대상이 될 수 있습니다. 정확한 판단은 관할 세무서에 확인해야 합니다.',
  },
  {
    question: '월급도 전액 압류될 수 있나요?',
    answer:
      '아니요, 급여채권은 원칙적으로 총액의 2분의 1까지만 압류할 수 있습니다(국세징수법 §42①). 다만 이렇게 계산한 금액이 표준적인 최저생계비에 못 미치면 그 최저생계비만큼은 추가로 보호되고, 반대로 최저생계비 기준을 넘으면 그 기준까지만 압류가 금지됩니다(§42②). 최저생계비 기준액은 시행령으로 정해지며 개정으로 바뀔 수 있으므로 현재 시행 중인 금액은 국세청이나 관할 세무서에서 확인하는 것이 정확합니다.',
  },
  {
    question: '압류된 재산은 바로 팔리나요?',
    answer:
      '바로 팔리지는 않습니다. 압류 후에도 체납액을 납부할 시간이 남아 있으며, 그래도 계속 미납되면 압류재산을 공매(공개 매각)에 부쳐 그 대금으로 체납액에 충당합니다(국세징수법 §61). 국세 부과에 대해 이의신청·심판청구 등 불복 절차가 진행 중이면 그 결정이 확정되기 전까지는 원칙적으로 공매를 진행하지 않습니다.',
  },
  {
    question: '체납액을 다 갚으면 압류가 자동으로 풀리나요?',
    answer:
      '완납하면 세무서장은 압류를 즉시 해제해야 합니다(국세징수법 §57①1호). 다만 "즉시 해제"는 법적 의무이지 은행 전산에 실시간으로 반영된다는 뜻은 아니므로, 완납 후에도 해제 처리에 며칠이 걸릴 수 있습니다. 급하게 계좌를 써야 한다면 완납 영수증을 지참해 관할 세무서에 압류 해제를 직접 요청하는 것이 빠릅니다.',
  },
  {
    question: '체납액을 일부만 갚아도 압류가 풀리나요?',
    answer:
      '전부 납부가 원칙적인 해제 요건이지만, 여러 재산을 한꺼번에 공매해 그중 일부 재산의 매각대금만으로 체납액 전부가 징수된 경우나 국세 부과 자체가 전부 취소된 경우, 남은 재산 가치로는 강제징수비조차 건지기 어려운 경우에도 압류가 해제될 수 있습니다(국세징수법 §57①). 단순히 일부 금액만 갚았다고 자동으로 해제되는 것은 아니며, 분납·납부유예를 신청해 압류를 유예받는 방법을 관할 세무서와 별도로 상담하는 것이 현실적입니다.',
  },
];

export default function NationalTaxDelinquencySeizure2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '국세 체납 압류 절차·해제 조건 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '국세 체납 압류 절차·해제 조건 2026, 예금·급여 압류 기준',
    description:
      '독촉부터 압류·공매까지 순서, 예금·급여 압류가 제한되는 금액, 압류가 즉시 해제되는 4가지 조건을 국세징수법 §10·§31·§41·§42·§57·§61 기준으로 정리.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['국세 체납 압류', '압류 해제', '예금 압류 금지', '급여 압류 제한', '국세징수법'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '국세 체납 압류 절차·해제 조건 2026',
    description:
      '체납 후 압류가 시작되는 시점, 예금·급여 압류 제한 금액, 공매까지의 절차, 압류가 즉시 해제되는 조건.',
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
                    { name: '국세 체납 압류 절차·해제 조건 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">체납자 · 8분 읽기 · 2026-09-10</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  국세 체납 압류 절차·해제 조건 2026
                  <br />
                  <span className="text-2xl text-text-secondary">· 예금·급여 압류 기준</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  국세를 기한까지 내지 못하면 독촉장을 받고, 그래도 내지 않으면 예금·급여·부동산 같은 재산이 압류될 수 있습니다. 이 가이드는 압류가 시작되는 정확한 시점, 예금·급여 압류가 제한되는 금액, 압류 후 공매까지 이어지는 절차, 그리고 완납 외에 압류가 해제되는 조건을 정리합니다. 대상 독자는 국세 체납 통지를 받았거나 체납이 걱정되는 개인·사업자입니다.
                </p>
              </header>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">국세 체납 압류란 무엇인가요?</h2>
                <p>
                  국세 체납 압류는 세금을 기한까지 내지 않은 사람의 재산을 국가가 강제로 확보해 처분할 수 있는 상태로 묶는 절차입니다. 관할 세무서장은 예금·급여·부동산·자동차·채권 등 금전적 가치가 있는 재산이면 원칙적으로 압류할 수 있으며, 이후 재산을 팔아 그 대금으로 체납액에 충당합니다.
                </p>
                <p>
                  다만 압류는 체납했다는 사실만으로 곧바로 이뤄지는 것이 아니라 독촉이라는 사전 절차를 거쳐야 합니다(국세징수법 §10, §31). 또한 생계 유지에 필요한 최소한의 재산은 압류할 수 없도록 법으로 제한되어 있습니다(§41, §42).
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">30초 요약</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    정의: 체납 세금을 확보하기 위해 재산을 강제로 묶는 절차.
                    <br />
                    시작 조건: 독촉장 기한까지 미납(국세징수법 §31).
                    <br />
                    보호 대상: 예금 250만 원 미만(§41), 급여 총액의 2분의 1(§42).
                    <br />
                    해제: 완납·충당 시 즉시 해제 의무(§57).
                  </p>
                </div>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">압류는 정확히 언제부터 시작되나요?</h2>
                <p>
                  압류는 독촉장에서 정한 납부기한까지 국세를 완납하지 않았을 때 시작됩니다. 국세징수법 §10에 따라 관할 세무서장은 체납이 발생하면 독촉장을 발급하고, §31은 이 독촉장에서 정한 기한까지 완납하지 않은 경우를 압류의 요건으로 규정합니다. 즉 체납 당일이 아니라 독촉 절차를 한 번 거친 뒤에야 압류가 법적으로 가능해집니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 체납 후 압류까지의 절차 단계 (국세징수법 §10·§31·§61)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">단계</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">내용</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">근거</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">1. 체납 발생</td>
                        <td className="p-3">신고·고지된 세금을 납부기한까지 내지 않음</td>
                        <td className="p-3">-</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">2. 독촉</td>
                        <td className="p-3">세무서가 독촉장 발급, 납부기한 재지정</td>
                        <td className="p-3">§10</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">3. 압류</td>
                        <td className="p-3">독촉 기한까지도 미납 시 재산 압류</td>
                        <td className="p-3">§31</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">4. 공매</td>
                        <td className="p-3">계속 미납 시 압류재산을 공개 매각</td>
                        <td className="p-3">§61</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  다만, 독촉장을 받았다고 반드시 며칠 안에 압류되는 것은 아닙니다. 실무적으로는 독촉 이후에도 세무서의 안내·상담·분납 신청 등 여지가 있는 경우가 많으며, 압류 시점은 체납 금액과 체납자의 협조 여부에 따라 달라집니다. 압류를 피하고 싶다면 독촉장을 받은 즉시 관할 세무서에 분납이나 납부유예를 상담하는 것이 안전합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">예금·급여는 얼마까지 압류가 금지되나요?</h2>
                <p>
                  생계 유지에 필요한 최소한의 재산은 국세징수법이 압류 대상에서 제외합니다. 대표적으로 예금 등 소액 금융재산과 급여채권이 이에 해당합니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 2. 주요 압류금지·제한 재산 (국세징수법 §41·§42, 시행령 §31·§32)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">재산 종류</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">보호 범위</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">근거</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">예금·적금·부금 등</td>
                        <td className="p-3">개인별 잔액 합산 250만 원 미만</td>
                        <td className="p-3">§41, 시행령 §31</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">사망보험금</td>
                        <td className="p-3">1,500만 원 이하 부분</td>
                        <td className="p-3">§41, 시행령 §31</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">급여·임금·퇴직연금 등</td>
                        <td className="p-3">원칙적으로 총액의 2분의 1</td>
                        <td className="p-3">§42①</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">급여 중 최저생계비</td>
                        <td className="p-3">2분의 1이 최저생계비 미달 시 그만큼 추가 보호</td>
                        <td className="p-3">§42②, 시행령 §32</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  예금 압류금지 기준은 계좌 하나가 아니라 체납자 명의의 모든 예금성 자산을 합산해 판단하는 것이 원칙입니다. 여러 은행에 나눠 넣어도 합산액이 기준을 넘으면 초과분은 압류 대상이 될 수 있습니다. 급여의 최저생계비 보호 기준액은 시행령 개정으로 조정될 수 있으므로, 현재 적용되는 정확한 금액은 국세청 또는 관할 세무서에서 확인하는 것이 가장 정확합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">압류된 재산은 어떻게 공매로 넘어가나요?</h2>
                <p>
                  압류 이후에도 체납액이 계속 납부되지 않으면 세무서장은 압류재산을 공매에 부쳐 그 대금을 체납액에 충당합니다(국세징수법 §61). 공매는 통상 입찰이나 경매 방식으로 진행되며, 부동산·자동차 같은 유형재산뿐 아니라 채권·무체재산권도 대상이 될 수 있습니다.
                </p>
                <p>
                  매각대금이 들어오면 세무서는 강제징수비, 체납된 국세, 가산금 순으로 배분해 충당합니다. 이의신청·심사청구·심판청구·행정소송 등 불복 절차가 진행 중인 국세와 관련해 압류된 재산은, 그 결정이나 판결이 확정되기 전까지는 원칙적으로 공매를 진행하지 않습니다.
                </p>
                <p className="mt-4">
                  다만, 여러 재산을 한꺼번에 공매에 부친 경우 일부 재산의 매각대금만으로 체납액 전부가 충당되면 나머지 재산은 공매 대상에서 빠지고 압류도 해제됩니다. 즉 압류된 재산 전부가 반드시 매각되는 것은 아닙니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">압류는 어떤 조건에서 해제되나요?</h2>
                <p>
                  완납이 가장 확실한 해제 조건이지만, 그 외에도 국세징수법 §57①은 세무서장이 압류를 즉시 해제해야 하는 경우를 정해 두고 있습니다.
                </p>
                <ul className="space-y-3 ml-6 list-decimal text-text-secondary">
                  <li>
                    <strong>완납 또는 충당:</strong> 압류와 관계된 체납액 전부가 납부되거나, 국세환급금 등으로 체납액과 상계되어 소멸한 경우.
                  </li>
                  <li>
                    <strong>부과 전부 취소:</strong> 압류의 근거가 된 국세 부과 자체가 전부 취소된 경우.
                  </li>
                  <li>
                    <strong>일부 매각으로 전액 충당:</strong> 여러 재산을 한꺼번에 공매하는 과정에서 일부 재산의 매각대금만으로 체납액 전부가 징수된 경우.
                  </li>
                  <li>
                    <strong>실익 없음:</strong> 남은 재산의 추산가액으로는 강제징수비조차 회수하기 어려워 강제징수를 계속할 실익이 없는 경우.
                  </li>
                </ul>
                <p className="mt-4">
                  다만, 체납액 중 일부만 납부했다고 해서 자동으로 압류가 해제되는 것은 아닙니다. 조세채권 확보에 지장이 없다고 세무서장이 판단하는 경우 재량으로 일부 해제를 검토할 수는 있지만, 이는 §57①의 즉시 해제 의무와는 별개의 재량 판단입니다. 완납이 당장 어렵다면 분할납부나 납부유예 제도를 함께 상담하는 것이 현실적입니다.
                </p>
              </section>

              <h2 className="text-2xl font-bold mb-6">자주 묻는 질문</h2>
              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h3 className="text-lg font-semibold text-text-primary">관련 계산기 및 가이드</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link
                    href="/guide/income-tax-installment-payment-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">종합소득세 분할납부</div>
                    <p className="mt-1 text-sm text-text-secondary">압류를 피하려면 먼저 확인할 분납 조건.</p>
                  </Link>
                  <Link
                    href="/guide/tax-appeal-objection-procedure-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">세금 이의신청 절차</div>
                    <p className="mt-1 text-sm text-text-secondary">부과 자체가 부당하다면 압류 전에 다툴 방법.</p>
                  </Link>
                  <Link
                    href="/guide/tax-audit-selection-criteria-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">세무조사 대상 선정 기준</div>
                    <p className="mt-1 text-sm text-text-secondary">체납 이전 단계, 세무조사가 시작되는 조건.</p>
                  </Link>
                  <Link
                    href="/guide/property-tax-installment-payment-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">재산세 분할납부</div>
                    <p className="mt-1 text-sm text-text-secondary">재산세도 미납하면 같은 압류 절차를 밟습니다.</p>
                  </Link>
                  <Link
                    href="/calculator/freelancer-tax/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">프리랜서 종합소득세 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">미리 세액을 계산해 체납 자체를 예방하세요.</p>
                  </Link>
                  <Link
                    href="/category/tax/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">모든 세금 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">양도세·취득세·재산세·종합소득세 모음.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 이 글은 AI 보조로 자동 생성되어 자동 품질 게이트를 통과한 뒤 발행되었습니다. 발행 시점에 사람의 사전 검수는 없었으며, 운영자가 사후 점검합니다. 본 가이드는 교육 목적으로 작성되었으며 개인 맞춤형 세무·법률 조언이 아닙니다. 실제 압류 여부·해제 조건·압류금지 금액은 체납액 규모, 재산 종류, 시행령 개정 시점에 따라 달라질 수 있으므로 반드시 관할 세무서 또는 국세청, 세무사·변호사 등 전문가에게 확인하세요. 본 콘텐츠는 2026-09-10을 기준으로 작성되었으며, 관련 법령 개정 시 업데이트됩니다. 인용 법조항: 국세징수법 §10(독촉), §31(압류의 요건 등), §41(압류금지재산), §42(급여채권의 압류 제한), §57(압류 해제의 요건), §61(공매).
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터</a>,{' '}
                  <a href="https://www.nts.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">국세청</a>,{' '}
                  <a href="https://www.hometax.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">홈택스</a>.
                </p>
              </section>

              <ShareButtons
                title="국세 체납 압류 절차·해제 조건 2026 가이드"
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
