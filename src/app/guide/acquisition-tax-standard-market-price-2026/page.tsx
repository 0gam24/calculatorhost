// [revenue-lever: indexing+traffic]
// indexing: 신규 슬러그 색인 표면 확장, 내부 링크 mesh 7개(취득세 계산법·증여 취득세 시가·다주택 중과·생애최초 감면·세금 허브·취득세 계산기·증여세 계산기).
// traffic: "취득세 시가표준액"·"취득세 실거래가"·"시가인정액 뜻"·"증여 취득세 기준" 롱테일 흡수(지방세법 §4·§10·§10의2).
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

const URL = 'https://calculatorhost.com/guide/acquisition-tax-standard-market-price-2026/';
const DATE_PUBLISHED = '2026-09-24';
const DATE_MODIFIED = '2026-09-24';

export const metadata: Metadata = {
  title: '취득세 시가표준액 실거래가 차이 2026 | calculatorhost',
  description:
    '부동산을 사서 등기할 때 취득세는 실제로 지급한 사실상의 취득가격 기준으로 매겨지지만, 증여·상속으로 받을 때는 시가인정액 또는 시가표준액이 기준이 됩니다. 지방세법 §4·§10·§10의2에 따라 취득 유형별로 달라지는 과세표준 기준과 확인 방법을 정리했습니다.',
  keywords: [
    '취득세 시가표준액',
    '취득세 실거래가',
    '시가인정액 뜻',
    '증여 취득세 기준',
    '상속 취득세 시가표준액',
    '지방세법 4조',
    '지방세법 10조의2',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '취득세 시가표준액 실거래가 차이 2026' }],
    title: '취득세 시가표준액 실거래가 차이 2026',
    description: '유상취득은 사실상의 취득가격, 증여는 시가인정액, 상속은 시가표준액이 원칙. 취득 유형별 과세표준 기준 정리.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '취득세 시가표준액 실거래가 차이 2026',
    description: '유상취득은 사실상의 취득가격, 증여는 시가인정액, 상속은 시가표준액. 지방세법 §4·§10·§10의2 기준.',
  },
};

const FAQ_ITEMS = [
  {
    question: '취득세 시가표준액과 실거래가는 무엇이 다른가요?',
    answer:
      '시가표준액은 지방자치단체가 세금 부과를 위해 공시가격을 기준으로 정해 둔 고정된 금액이고, 실거래가는 실제로 주고받은 매매 가격입니다(지방세법 §4). 시가표준액은 매년 한 번씩만 갱신되므로 현재 시세와 차이가 날 수 있지만, 실거래가는 그 거래 당시의 실제 지급액을 그대로 보여줍니다.',
  },
  {
    question: '집을 사서 등기할 때는 어떤 금액이 취득세 기준이 되나요?',
    answer:
      '2023년 1월 1일 이후 취득분부터는 시가표준액이 아니라 실제로 지급한 사실상의 취득가격이 기준입니다(지방세법 §10). 과거에는 신고가액과 시가표준액 중 더 높은 금액이 적용됐지만, 지금은 시가표준액이 더 높더라도 실제 지급액으로만 과세됩니다.',
  },
  {
    question: '증여받은 부동산은 왜 시가표준액이 아니라 시가인정액으로 과세되나요?',
    answer:
      '증여 등 상속을 제외한 무상취득은 시장가치를 더 정확히 반영하기 위해 매매사례가액ㆍ감정가액ㆍ경공매가액 등 시가인정액을 원칙 과세표준으로 삼기 때문입니다(지방세법 §10의2①). 공시가격 기반인 시가표준액보다 시가인정액이 대체로 더 높게 나와 세부담이 늘어나는 경우가 많습니다.',
  },
  {
    question: '상속받은 부동산은 왜 예외적으로 시가표준액이 그대로 적용되나요?',
    answer:
      '상속은 본인의 의사와 무관하게 발생하고 상속세 신고에서 이미 재산가액을 별도로 평가받기 때문에, 취득세에서는 종전처럼 시가표준액을 유지하도록 예외를 뒀습니다(지방세법 §10의2②1호). 같은 무상취득이라도 증여보다 상속의 취득세 과세표준이 낮게 나오는 경우가 많은 이유입니다.',
  },
  {
    question: '시가표준액은 어디에서 확인할 수 있나요?',
    answer:
      '국토교통부 부동산공시가격알리미에서 개별공시지가ㆍ개별주택가격ㆍ공동주택가격을 무료로 조회할 수 있습니다. 위택스(wetax.go.kr)에서도 취득세 미리계산 서비스로 시가표준액 기준 예상 세액을 확인할 수 있습니다.',
  },
  {
    question: '시가표준액이 1억원 이하인 부동산도 시가인정액으로 과세되나요?',
    answer:
      '아닙니다. 상속을 제외한 무상취득이라도 시가표준액이 1억원 이하인 소액 부동산은 납세자가 시가인정액과 시가표준액 중 유리한 쪽을 선택할 수 있습니다(지방세법 §10의2②2호). 소액 증여에서 세부담을 예측하기 쉽도록 둔 예외 규정입니다.',
  },
  {
    question: '재산세도 취득세와 같은 시가표준액을 쓰나요?',
    answer:
      '네, 같은 개념의 시가표준액을 사용하지만 세목별로 목적이 다릅니다. 취득세는 취득 시점 한 번 적용되는 반면, 재산세는 매년 6월 1일 기준 보유자에게 그 해의 시가표준액으로 부과됩니다. 취득 당시와 보유 중 재산세 부과 시점의 시가표준액이 다를 수 있으므로 별개로 확인해야 합니다.',
  },
];

export default function AcquisitionTaxStandardMarketPrice2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '취득세 시가표준액 실거래가 차이 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '취득세 시가표준액 실거래가 차이 2026',
    description:
      '유상취득은 사실상의 취득가격, 증여는 시가인정액, 상속은 시가표준액이 원칙인 이유를 지방세법 §4·§10·§10의2 기준으로 정리. 시가표준액 확인 방법과 소액 부동산 선택 예외까지 정리.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['취득세 시가표준액', '시가인정액', '실거래가 취득세', '지방세법 10조의2', '증여 취득세'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '취득세 시가표준액 실거래가 차이 2026',
    description:
      '유상취득은 사실상의 취득가격, 증여는 시가인정액, 상속은 시가표준액. 취득 유형별로 달라지는 취득세 과세표준 기준 정리.',
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
                    { name: '취득세 시가표준액 실거래가 차이 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">부동산 취득자 · 8분 읽기 · 2026-09-24</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  취득세 시가표준액 실거래가 차이 2026
                  <br />
                  <span className="text-2xl text-text-secondary">· 무엇을 기준으로 세금이 매겨지나</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  같은 부동산이라도 사서 등기했는지, 증여받았는지, 상속받았는지에 따라 취득세를 매기는 기준 금액이 완전히 달라집니다. 이 가이드는 시가표준액ㆍ실거래가(사실상의 취득가격)ㆍ시가인정액의 정의와 차이, 취득 유형별로 어느 것이 적용되는지, 시가표준액을 확인하는 방법을 실제 사례와 함께 정리합니다. 대상 독자는 매매ㆍ증여ㆍ상속으로 부동산을 취득할 예정인 사람입니다.
                </p>
              </header>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">취득세 시가표준액이란 무엇인가요?</h2>
                <p>
                  시가표준액은 지방자치단체가 지방세를 매기기 위해 정해 둔 부동산의 기준 가액입니다. 토지와 주택의 시가표준액은 「부동산 가격공시에 관한 법률」에 따라 공시된 가액으로 하며, 구체적으로는 개별공시지가ㆍ개별주택가격ㆍ공동주택가격을 그대로 가져다 씁니다(지방세법 §4). 해당 공시가격이 아직 없는 신축 등은 시장ㆍ군수ㆍ구청장이 국토교통부의 가격비준표를 활용해 별도로 산정합니다.
                </p>
                <p>
                  시가표준액은 취득세뿐 아니라 재산세ㆍ등록면허세 등 여러 지방세의 공통 기준값으로 쓰입니다. 다만 매년 한 차례 공시되는 값이라 실제 거래되는 시세와는 차이가 날 수 있고, 이 때문에 취득 유형에 따라 시가표준액을 그대로 쓸지, 실제 거래가격이나 별도의 시가 평가액을 쓸지가 갈립니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">30초 요약</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    정의: 시가표준액은 부동산 가격공시법상 공시가격 기준 지방세 산정용 금액(지방세법 §4).
                    <br />
                    유상취득(매매): 사실상의 취득가격, 즉 실제 지급액 기준(지방세법 §10).
                    <br />
                    무상취득(증여): 시가인정액이 원칙, 시가표준액이 아님(지방세법 §10의2①).
                    <br />
                    무상취득(상속): 예외적으로 시가표준액 유지(지방세법 §10의2②1호).
                  </p>
                </div>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">집을 사서 등기하면 왜 시가표준액이 아니라 실거래가로 과세되나요?</h2>
                <p>
                  2023년 1월 1일 취득분부터 유상취득의 과세표준이 사실상의 취득가격, 즉 매수인이 실제로 지급했거나 지급해야 할 총액으로 바뀌었기 때문입니다(지방세법 §10). 그 이전에는 신고가액과 시가표준액 중 더 높은 금액을 과세표준으로 삼았는데, 시가표준액이 실거래가보다 높게 나오는 경우 매수인이 실제 지급액보다 많은 세금을 내야 하는 문제가 있었습니다.
                </p>
                <p>
                  지금은 시가표준액이 실거래가보다 높든 낮든 상관없이 사실상의 취득가격 하나로만 과세됩니다. 매매계약서상 금액에 취득 관련 부대비용(중개보수 제외, 조건에 따라 포함되는 항목 있음)을 더한 실제 지급총액이 곧 과세표준이 됩니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3">
                  <p className="font-semibold text-text-primary">사례 1. 아파트 매매가 시가표준액보다 낮은 경우</p>
                  <p className="text-sm text-text-secondary">
                    · 아파트 실제 매매가(사실상의 취득가격): 3억원
                    <br />
                    · 같은 아파트 공동주택가격(시가표준액): 3억 5천만원
                    <br />
                    · 2023년 이후 과세표준: 3억원(실제 지급액 기준)
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 시가표준액이 실거래가보다 높아도 유상취득은 실제 지급액으로만 과세됩니다.</span>
                  </p>
                </div>
                <p className="mt-4">
                  다만, 부담부증여처럼 매매와 증여의 성격이 섞인 거래는 채무 인수액만큼은 유상취득으로, 나머지는 무상취득으로 나눠 각각 다른 과세표준 기준이 적용되므로 단순 매매와는 계산 방식이 다릅니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">증여나 상속을 받으면 과세표준이 왜 달라지나요?</h2>
                <p>
                  무상취득은 원칙적으로 시가인정액을 과세표준으로 하기 때문입니다(지방세법 §10의2①). 시가인정액이란 취득일 전후 일정 기간 안에 해당 부동산이나 유사 부동산에 대해 성립한 매매사례가액ㆍ감정가액ㆍ경매 또는 공매가액처럼 시장가치를 반영하는 금액을 말합니다. 공시가격 기준인 시가표준액보다 대체로 높게 나와 증여 취득세 부담이 늘어나는 경우가 많습니다.
                </p>
                <p>
                  다만 상속으로 인한 무상취득은 예외입니다. 상속은 시가인정액이 아니라 종전처럼 시가표준액을 그대로 과세표준으로 삼습니다(지방세법 §10의2②1호). 상속재산은 상속세 신고 과정에서 이미 별도로 시가 평가를 받기 때문에, 취득세에서까지 다시 시가인정액을 요구하지 않는 구조입니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 취득 유형별 취득세 과세표준 기준 (지방세법 §4·§10·§10의2)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">취득 유형</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">과세표준 원칙</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">근거</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">매매(유상취득)</td>
                        <td className="p-3">사실상의 취득가격(실제 지급액)</td>
                        <td className="p-3">지방세법 §10</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">증여(무상취득)</td>
                        <td className="p-3">시가인정액(매매사례ㆍ감정ㆍ경공매가액)</td>
                        <td className="p-3">지방세법 §10의2①</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">상속(무상취득)</td>
                        <td className="p-3">시가표준액(예외 유지)</td>
                        <td className="p-3">지방세법 §10의2②1호</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">소액 부동산 증여(시가표준액 1억원 이하)</td>
                        <td className="p-3">시가인정액ㆍ시가표준액 중 납세자 선택</td>
                        <td className="p-3">지방세법 §10의2②2호</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">시가표준액은 어디서, 어떻게 확인하나요?</h2>
                <p>
                  국토교통부가 운영하는 부동산공시가격알리미에서 주소만 입력하면 개별공시지가ㆍ개별주택가격ㆍ공동주택가격을 무료로 조회할 수 있습니다. 매년 4월 말 전후로 그 해 기준 공시가격이 새로 확정되므로, 연도별로 다른 시가표준액이 적용된다는 점을 기억해야 합니다.
                </p>
                <ul className="space-y-3 ml-6 list-decimal text-text-secondary">
                  <li>
                    <strong>주소 확인:</strong> 취득할 부동산의 정확한 지번 또는 도로명 주소를 준비합니다.
                  </li>
                  <li>
                    <strong>공시가격 조회:</strong> 부동산공시가격알리미에서 토지는 개별공시지가, 단독ㆍ다가구는 개별주택가격, 아파트ㆍ연립은 공동주택가격을 확인합니다.
                  </li>
                  <li>
                    <strong>취득세 미리계산:</strong> 위택스(wetax.go.kr)의 지방세 미리계산 서비스로 시가표준액 또는 실거래가를 입력해 예상 세액을 산출합니다.
                  </li>
                  <li>
                    <strong>증여ㆍ상속이라면 시가 평가 병행:</strong> 시가인정액이 필요한 증여는 공인중개사ㆍ감정평가법인을 통해 매매사례가액이나 감정가액을 별도로 확보해야 합니다.
                  </li>
                </ul>
                <p className="mt-4">
                  다만 공시가격이 아직 없는 신축 오피스텔ㆍ분양권처럼 특수한 경우는 알리미에서 조회되지 않을 수 있으므로, 관할 시ㆍ군ㆍ구 세무과나 위택스 상담을 통해 개별 확인하는 것이 안전합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">시가표준액이 1억원 이하인 소액 부동산은 왜 예외인가요?</h2>
                <p>
                  증여받는 부동산의 시가표준액이 1억원 이하라면, 상속을 제외한 무상취득이라도 시가인정액과 시가표준액 중 납세자에게 유리한 쪽을 선택할 수 있습니다(지방세법 §10의2②2호). 소액 부동산까지 매번 매매사례가액ㆍ감정가액을 확보하도록 요구하면 절차 부담이 지나치게 커지기 때문에 둔 예외 규정입니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3">
                  <p className="font-semibold text-text-primary">사례 2. 시가표준액 8천만원 토지를 증여받은 경우</p>
                  <p className="text-sm text-text-secondary">
                    · 토지 시가표준액: 8천만원(1억원 이하)
                    <br />
                    · 인근 매매사례가액(시가인정액): 9천 5백만원
                    <br />
                    · 선택 가능: 납세자가 시가표준액 8천만원을 과세표준으로 선택 가능
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 시가표준액이 1억원을 넘는 순간부터는 이 선택권이 사라지고 시가인정액이 원칙 적용됩니다.</span>
                  </p>
                </div>
                <p className="mt-4">
                  다만 이 선택권은 상속에는 애초에 적용되지 않습니다. 상속은 금액과 무관하게 시가표준액이 원칙이므로, 소액 부동산 예외는 증여 등 상속 이외의 무상취득에만 해당한다는 점을 혼동하지 않아야 합니다.
                </p>
              </section>

              <h2 className="text-2xl font-bold mb-6">자주 묻는 질문</h2>
              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h3 className="text-lg font-semibold text-text-primary">관련 계산기 및 가이드</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link
                    href="/guide/acquisition-tax-calculation-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">취득세 계산법 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">세율ㆍ중과ㆍ농특세까지 취득세 전체 계산 구조.</p>
                  </Link>
                  <Link
                    href="/guide/gift-acquisition-tax-market-value-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">증여 취득세 시가 기준</div>
                    <p className="mt-1 text-sm text-text-secondary">증여로 부동산을 받을 때 시가인정액 산정 방법.</p>
                  </Link>
                  <Link
                    href="/guide/inheritance-house-acquisition-tax-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">상속 주택 취득세</div>
                    <p className="mt-1 text-sm text-text-secondary">상속으로 주택을 받을 때 취득세 계산과 감면.</p>
                  </Link>
                  <Link
                    href="/guide/first-home-acquisition-tax-reduction-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">생애최초 취득세 감면</div>
                    <p className="mt-1 text-sm text-text-secondary">첫 주택 구입 시 취득세 감면 요건 정리.</p>
                  </Link>
                  <Link
                    href="/calculator/acquisition-tax/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">취득세 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">구입가를 입력해 예상 취득세를 바로 계산해보세요.</p>
                  </Link>
                  <Link
                    href="/calculator/gift-tax/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">증여세 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">증여재산가액을 입력해 증여세를 함께 확인해보세요.</p>
                  </Link>
                  <Link
                    href="/category/tax/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">모든 세금 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">양도세ㆍ취득세ㆍ재산세ㆍ상속세ㆍ증여세 모음.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 이 글은 AI 보조로 자동 생성되어 자동 품질 게이트를 통과한 뒤 발행되었습니다. 발행 시점에 사람의 사전 검수는 없었으며, 운영자가 사후 점검합니다. 개별 부동산의 정확한 시가표준액ㆍ시가인정액과 실제 취득세액은 물건별 공시가격ㆍ거래 조건ㆍ지방자치단체 판단에 따라 달라지므로, 신고 전 관할 시ㆍ군ㆍ구 세무과 또는 위택스ㆍ세무 전문가와 반드시 확인하세요. 본 콘텐츠는 2026-09-24를 기준으로 작성되었으며, 관련 법령 개정 시 업데이트됩니다. 인용 법조항: 지방세법 §4(부동산 등의 시가표준액), §10(부동산 등의 유상취득의 경우 과세표준), §10의2(무상취득의 경우 과세표준).
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터</a>,{' '}
                  <a href="https://www.wetax.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">위택스</a>.
                </p>
              </section>

              <ShareButtons
                title="취득세 시가표준액 실거래가 차이 2026 가이드"
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
