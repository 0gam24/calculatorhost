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

const URL = 'https://calculatorhost.com/guide/capital-gains-tax-installment-payment-2026/';
const DATE_PUBLISHED = '2026-09-13';
const DATE_MODIFIED = '2026-09-13';

export const metadata: Metadata = {
  title: '양도소득세 분납 조건과 신청 방법 2026, 1천만원 초과 기준',
  description:
    '양도소득세 납부세액이 1천만원을 초과하면 최대 절반까지 납부기한 경과 후 2개월 이내 나눠 낼 수 있습니다. 소득세법 §112·시행령 §175 기준 분납 가능 금액과 확정신고서 기재 방법을 세액 구간별 계산 사례로 정리했습니다.',
  keywords: [
    '양도소득세 분납',
    '양도세 분할납부',
    '양도소득세 분납 조건',
    '양도세 확정신고 분납',
    '소득세법 112조',
    '양도소득세 납부기한',
    '분납 신청 방법',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '양도소득세 분납 조건과 신청 방법 2026' }],
    title: '양도소득세 분납 조건과 신청 방법 2026, 1천만원 초과 기준',
    description: '세액 1천만원 초과 시 최대 절반까지 2개월 분납. 소득세법 §112·시행령 §175 기준 정리.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '양도소득세 분납 조건과 신청 방법 2026',
    description: '세액 1천만원 초과 시 최대 절반까지 2개월 분납 가능. 소득세법 §112 기준.',
  },
};

const FAQ_ITEMS = [
  {
    question: '양도소득세 분납 신청은 어디서 하나요?',
    answer:
      '홈택스로 전자신고할 때 예정신고서나 확정신고서 화면에서 분납할 세액을 직접 입력하면 됩니다. 서면으로 신고한다면 신고서의 분납세액란에 금액을 적어 관할 세무서에 제출하면 되고, 별도의 분납 신청서를 미리 낼 필요는 없습니다.',
  },
  {
    question: '분납 기한을 넘기면 어떻게 되나요?',
    answer:
      '분납 세액을 납부기한 경과 후 2개월인 분납기한까지 내지 않으면 그 금액에 대해 납부지연가산세가 하루 단위로 붙습니다(국세기본법 §47의4). 가산세는 미납 일수와 세액에 비례해 커지므로 분납기한을 확정신고 기한과 별도로 달력에 표시해두는 것이 안전합니다.',
  },
  {
    question: '세액이 정확히 1천만원이면 분납할 수 있나요?',
    answer:
      '아니요. 소득세법 §112는 납부할 세액이 1천만원을 초과하는 경우로 한정하므로, 세액이 정확히 1천만원이면 분납 대상이 아니며 전액을 납부기한까지 내야 합니다. 1,001만원부터 초과분 1만원에 대해 분납이 가능해집니다.',
  },
  {
    question: '지방소득세도 분납할 수 있나요?',
    answer:
      '양도소득세에 부가되는 지방소득세(양도소득분)는 지방세법에 따라 별도로 신고·납부하는 세목입니다. 분납 가능 여부와 한도는 국세인 양도소득세 분납 요건과 자동으로 연동되지 않으므로, 관할 지방자치단체나 위택스에서 별도로 확인해야 합니다.',
  },
  {
    question: '예정신고 때 분납했는데 확정신고 때도 분납할 수 있나요?',
    answer:
      '네, 가능합니다. 예정신고(소득세법 §105)와 확정신고(소득세법 §110)는 각각 별개의 신고이므로, 각 신고에서 계산된 납부세액이 1천만원을 넘으면 그때마다 분납 요건을 새로 판단합니다. 다만 확정신고 시에는 이미 낸 예정신고 세액을 기납부세액으로 정산한 뒤 남은 세액을 기준으로 분납 여부를 다시 계산합니다.',
  },
  {
    question: '신고서 제출 후에 분납 금액을 바꿀 수 있나요?',
    answer:
      '신고기한 안에 수정신고를 하면 분납 세액도 함께 조정할 수 있습니다. 다만 신고기한이 지난 뒤에는 이미 확정된 분납 금액만 임의로 바꾸기 어려우므로, 처음 신고할 때 자금 계획을 감안해 분납 여부와 금액을 정확히 정하는 것이 안전합니다.',
  },
  {
    question: '분납해도 국세완납증명 발급에 영향이 있나요?',
    answer:
      '분납기한 안에 정상적으로 납부하면 체납으로 처리되지 않으므로 국세완납증명 발급 등에 지장이 없는 것이 원칙입니다. 다만 분납기한을 넘겨 체납으로 전환되면 완납증명 발급이나 각종 정부 지원사업 신청에서 불이익을 받을 수 있습니다.',
  },
];

export default function CapitalGainsTaxInstallmentPayment2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '양도소득세 분납 조건과 신청 방법 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '양도소득세 분납 조건과 신청 방법 2026, 1천만원 초과 기준',
    description:
      '납부할 세액이 1천만원을 초과하면 납부기한 경과 후 2개월 이내 최대 절반까지 분납할 수 있습니다. 소득세법 §112·시행령 §175 기준 분납 한도, 신청 방법, 가산세 위험을 세액 구간별 사례로 정리.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['양도소득세 분납', '양도세 분할납부', '소득세법 112조', '분납 신청 방법'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '양도소득세 분납 조건과 신청 방법 2026',
    description: '세액 1천만원 초과 시 분납 조건, 분납 가능 금액 계산, 신청 방법, 가산세 위험 정리.',
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
                    { name: '양도소득세 분납 조건과 신청 방법 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">양도인·투자자 · 8분 읽기 · 2026-09-13</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  양도소득세 분납 조건과 신청 방법 2026
                  <br />
                  <span className="text-2xl text-text-secondary">· 1천만원 초과 기준</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  양도소득세 확정신고서를 앞두고 세액이 예상보다 커서 한 번에 내기 부담스러운 경우가 많습니다. 이 가이드는 양도소득세 분납이 가능한 조건, 세액 구간별 분납 가능 금액, 확정신고서에 분납을 기재하는 방법, 기한을 넘겼을 때의 가산세 위험을 실제 계산 사례와 함께 정리합니다. 대상 독자는 양도소득세 예정신고·확정신고를 앞두고 세액 규모가 큰 매도인·투자자입니다.
                </p>
              </header>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">양도소득세 분납이란 무엇인가요?</h2>
                <p>
                  양도소득세 분납은 납부할 세액이 클 때 그 일부를 납부기한이 지난 후 2개월 이내에 나누어 낼 수 있게 해주는 제도입니다. 부동산·주식을 팔고 확정신고를 하면 세액을 원칙적으로 신고기한까지 한 번에 내야 하지만, 세액이 일정 금액을 넘으면 자금 부담을 덜어주기 위해 소득세법 §112가 분납을 허용합니다.
                </p>
                <p>
                  분납은 세무서의 별도 승인을 받는 제도가 아니라, 신고서 자체에 분납할 세액을 기재하면 적용되는 신고자의 권리입니다. 다만 아무 세액이나 나눠 낼 수 있는 것은 아니고, 소득세법 시행령 §175가 정한 한도 안에서만 가능합니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">30초 요약</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    정의: 세액 일부를 납부기한 후 2개월 이내 나눠 내는 제도.
                    <br />
                    조건: 납부할 세액이 1천만원 초과(소득세법 §112).
                    <br />
                    한도: 2천만원 이하는 1천만원 초과분, 2천만원 초과는 세액의 50% 이하(시행령 §175).
                    <br />
                    신청: 예정신고서·확정신고서에 분납할 세액을 기재해 제출.
                  </p>
                </div>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">분납 조건은 무엇인가요?</h2>
                <p>
                  양도소득세 예정신고 또는 확정신고에 따라 납부할 세액이 1천만원을 초과해야 분납할 수 있습니다(소득세법 §112). 예정신고(§105·§106)와 확정신고(§110·§111) 중 어느 쪽이든, 그 신고에서 계산된 납부세액이 1천만원을 넘으면 분납 대상이 됩니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 양도소득세 분납 가능 금액 (소득세법 시행령 §175)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">납부할 세액 구간</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">분납 가능 금액</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">신고기한 즉시납부</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">1천만원 이하</td>
                        <td className="p-3">분납 불가</td>
                        <td className="p-3">전액</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">1천만원 초과 ~ 2천만원 이하</td>
                        <td className="p-3">1천만원 초과분</td>
                        <td className="p-3">1천만원</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">2천만원 초과</td>
                        <td className="p-3">세액의 50% 이하</td>
                        <td className="p-3">세액의 50% 이상</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  다만, 세액이 정확히 1천만원이면 초과 요건을 충족하지 못해 분납 대상이 아닙니다. 예를 들어 세액이 1,000만원이면 전액을 신고기한까지 내야 하고, 1,001만원부터 초과분 1만원에 대해 분납이 가능해집니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">세액 구간별로 얼마까지 분납할 수 있나요?</h2>
                <p>
                  세액이 2천만원 이하인 구간과 2천만원을 초과하는 구간에서 분납 가능 금액을 계산하는 방식이 다릅니다. 아래 표는 실제 세액을 기준으로 분납 가능 최대 금액과 즉시 내야 할 최소 금액을 정리한 예시입니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 2. 세액 구간별 분납 계산 예시</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">총 납부세액</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">분납 가능 최대금액</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">신고기한 즉시납부</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">1,500만원</td>
                        <td className="p-3">500만원</td>
                        <td className="p-3">1,000만원</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">2,000만원</td>
                        <td className="p-3">1,000만원</td>
                        <td className="p-3">1,000만원</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">2,001만원</td>
                        <td className="p-3">1,000만 500원</td>
                        <td className="p-3">1,000만 500원</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">4,000만원</td>
                        <td className="p-3">2,000만원</td>
                        <td className="p-3">2,000만원</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  다만, 세액이 2천만원을 넘는 순간 분납 한도 계산식이 초과분 방식에서 세액의 50% 방식으로 바뀝니다. 경계값인 2,000만원과 2,001만원의 분납 가능 금액이 1,000만원에서 1,000만 500원으로 크게 달라지지 않는 것도 이 때문이며, 세액이 커질수록 두 방식의 차이는 벌어집니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">분납 신청은 언제, 어떻게 하나요?</h2>
                <p>
                  별도의 분납 신청서를 미리 낼 필요 없이, 신고기한까지 예정신고서(소득세법 §105) 또는 확정신고서(소득세법 §110)에 분납할 세액을 기재해 제출하면 됩니다. 홈택스로 전자신고할 경우 세액 입력 화면에서 분납 가능 여부와 한도를 자동으로 계산해 보여주므로, 분납할 금액만 정해 입력하면 됩니다.
                </p>
                <p>
                  서면으로 신고하는 경우에는 양도소득세 과세표준 신고 및 자진납부계산서의 분납세액란에 직접 금액을 적어 관할 세무서에 제출합니다. 분납을 선택하면 신고서에 즉시납부세액과 분납세액이 각각 표시됩니다.
                </p>
                <p className="mt-4">
                  다만, 신고기한이 지난 뒤에는 분납을 새로 신청할 수 없습니다. 신고서를 제출하는 시점에 자금 계획을 미리 세워 분납 여부와 금액을 확정해야 하며, 신고 이후 분납 금액만 임의로 늘리거나 줄이기는 어렵습니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">예정신고 분납과 확정신고 분납은 다른가요?</h2>
                <p>
                  적용되는 조문과 판단 시점이 다를 뿐, 분납 조건과 한도 계산 방식은 같습니다. 예정신고에 따른 납부세액(소득세법 §106)과 확정신고에 따른 납부세액(소득세법 §111)은 각각 별도로 계산되며, 그 세액이 1천만원을 넘는지도 각 신고 시점마다 따로 판단합니다.
                </p>
                <p>
                  예를 들어 부동산을 양도한 달의 말일부터 2개월 이내에 하는 예정신고에서 세액이 1,500만원이면 500만원을 분납할 수 있습니다. 다음 해 5월 확정신고에서는 이미 낸 예정신고 세액을 기납부세액으로 차감한 뒤, 남은 확정신고 납부세액을 기준으로 분납 요건을 다시 계산합니다.
                </p>
                <p className="mt-4">
                  다만, 양도소득이 그해에 한 번뿐이고 예정신고만으로 납세의무가 사실상 종결되는 경우에는 별도의 확정신고 세액이 발생하지 않을 수 있습니다. 여러 건의 자산을 같은 해에 양도했다면 합산 과세표준이 달라져 확정신고 세액이 예정신고 세액과 다르게 계산될 수 있으므로 유의해야 합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">분납해도 가산세가 붙나요?</h2>
                <p>
                  분납 세액을 분납기한, 즉 신고기한 경과 후 2개월 안에 내면 가산세는 붙지 않습니다. 분납은 소득세법 §112가 인정하는 합법적인 납부 방법이므로 그 자체로는 이자나 가산세가 발생하지 않습니다.
                </p>
                <p>
                  다만, 분납기한까지 분납 세액을 내지 않으면 그 다음 날부터 미납 세액에 대해 납부지연가산세가 부과됩니다(국세기본법 §47의4). 가산세는 미납 일수에 비례해 계속 늘어나므로, 분납을 선택했다면 분납기한을 신고기한과 별도로 반드시 챙겨야 합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">분납과 납부기한 연장·징수유예는 어떻게 다른가요?</h2>
                <p>
                  분납은 세액이 1천만원을 넘으면 별도 사유 소명 없이 신고서 기재만으로 쓸 수 있는 제도인 반면, 납부기한 연장이나 징수유예는 재해·사업상 심각한 손실 등 별도 사유를 소명해 관할 세무서장의 승인을 받아야 합니다.
                </p>
                <p>
                  두 제도는 함께 쓰기도 합니다. 세액이 커서 분납 요건을 충족하더라도 그 분납 세액조차 당장 내기 어려운 특별한 사정이 있다면, 납부기한 연장을 별도로 신청하는 절차와 요건을 확인해볼 수 있습니다.
                </p>
                <p className="mt-4">
                  다만, 납부기한 연장·징수유예는 승인 여부가 재량 판단에 달려 있어 분납처럼 요건만 맞으면 확정적으로 쓸 수 있는 것은 아닙니다. 신청 요건과 절차는{' '}
                  <Link href="/guide/tax-payment-deadline-extension-2026/" className="text-primary-500 underline">
                    납부기한 연장·징수유예 신청 요건
                  </Link>{' '}
                  가이드에서 자세히 다룹니다.
                </p>
              </section>

              <h2 className="text-2xl font-bold mb-6">자주 묻는 질문</h2>
              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h3 className="text-lg font-semibold text-text-primary">관련 계산기 및 가이드</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link
                    href="/calculator/capital-gains-tax/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">양도소득세 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">양도차익을 입력해 예상 세액과 분납 가능 여부를 먼저 가늠해보세요.</p>
                  </Link>
                  <Link
                    href="/guide/capital-gains-tax-preliminary-return-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">양도소득세 예정신고</div>
                    <p className="mt-1 text-sm text-text-secondary">양도 후 2개월 이내 예정신고 절차와 이번 분납 요건의 연결고리.</p>
                  </Link>
                  <Link
                    href="/guide/tax-payment-deadline-extension-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">납부기한 연장·징수유예</div>
                    <p className="mt-1 text-sm text-text-secondary">분납으로도 부담이 크다면 확인할 별도 승인 절차.</p>
                  </Link>
                  <Link
                    href="/guide/income-tax-installment-payment-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">종합소득세 분납(소득세법 §77)</div>
                    <p className="mt-1 text-sm text-text-secondary">같은 분납 개념이지만 근거 조항과 비율이 다른 종합소득세 분납 정리.</p>
                  </Link>
                  <Link
                    href="/calculator/acquisition-tax/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">취득세 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">매도 후 새 부동산을 취득할 때의 세액도 함께 확인해보세요.</p>
                  </Link>
                  <Link
                    href="/category/tax/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">모든 세금 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">양도세·취득세·상속세·증여세 모음.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 이 글은 AI 보조로 자동 생성되어 자동 품질 게이트를 통과한 뒤 발행되었습니다. 발행 시점에 사람의 사전 검수는 없었으며, 운영자가 사후 점검합니다. 본 가이드는 교육 목적으로 작성되었으며 개인 맞춤형 세무 조언이 아닙니다. 분납 가능 여부와 정확한 금액은 개인의 신고 내역과 세액에 따라 달라지므로 반드시 홈택스 또는 관할 세무서·세무사와 확인하세요. 본 콘텐츠는 2026-09-13을 기준으로 작성되었으며, 관련 법령 개정 시 업데이트됩니다. 인용 법조항: 소득세법 §105(양도소득과세표준 예정신고), §106(예정신고납부), §110(양도소득과세표준 확정신고), §111(확정신고납부), §112(양도소득세의 분할납부), 소득세법 시행령 §175(양도소득세의 분납), 국세기본법 §47의4(납부지연가산세).
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.nts.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">국세청</a>,{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터</a>,{' '}
                  <a href="https://www.hometax.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">국세청 홈택스</a>.
                </p>
              </section>

              <ShareButtons
                title="양도소득세 분납 조건과 신청 방법 2026 가이드"
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
