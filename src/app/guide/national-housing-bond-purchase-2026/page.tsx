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

const URL = 'https://calculatorhost.com/guide/national-housing-bond-purchase-2026/';
const DATE_PUBLISHED = '2026-07-19';
const DATE_MODIFIED = '2026-07-19';

export const metadata: Metadata = {
  title: '국민주택채권 매입 2026, 매입금액과 즉시매도 할인 계산법',
  description:
    '부동산 소유권이전등기 시 국민주택채권을 의무 매입해야 하며, 매입금액은 시가표준액에 매입률을 곱해 산정합니다. 즉시매도 본인부담금 계산법과 2026년 절차, 면제 대상까지 정리했습니다. 주택도시기금법 §8 기준.',
  keywords: [
    '국민주택채권 매입',
    '국민주택채권 매입률',
    '국민주택채권 할인율',
    '소유권이전등기 채권',
    '국민주택채권 즉시매도',
    '제1종국민주택채권',
    '국민주택채권 본인부담금',
    '주택도시기금법 8조',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '국민주택채권 매입 2026, 매입금액과 즉시매도 할인 계산법' }],
    title: '국민주택채권 매입 2026, 소유권이전등기 시 매입금액 계산법',
    description: '부동산 매매·상속·증여로 소유권이전등기 시 의무 매입하는 국민주택채권. 매입금액 산정과 즉시매도 본인부담금 계산법.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '국민주택채권 매입 2026, 매입금액·즉시매도 할인 계산법',
    description: '소유권이전등기 시 국민주택채권 매입금액 산정법과 즉시매도 본인부담금 계산 사례. 주택도시기금법 §8.',
  },
};

const FAQ_ITEMS = [
  {
    question: '국민주택채권 매입은 누가 해야 하나요?',
    answer:
      '부동산의 소유권이전등기를 신청하는 사람이 매입 의무자입니다(주택도시기금법 §8). 매매의 매수인, 상속의 상속인, 증여의 수증자 등 등기 명의를 새로 취득하는 쪽이 매입 대상입니다. 등기 신청 시 채권매입 필증(또는 즉시매도 후 영수증)을 첨부해야 등기소에서 접수가 완료됩니다.',
  },
  {
    question: '정확한 매입률은 어디서 확인하나요?',
    answer:
      '정확한 매입률은 주택도시기금 사이트(nhuf.molit.go.kr)의 청약·채권 메뉴에서 시가표준액과 지역을 입력해 바로 조회할 수 있습니다. 매입률은 주택도시기금법 시행령 §8 및 별표에 근거해 고시되며, 개정 시 예고 없이 바뀔 수 있으므로 본 가이드의 예시 수치를 그대로 신뢰하면 안 됩니다.',
  },
  {
    question: '즉시매도란 무엇이고 왜 대부분 이 방법을 쓰나요?',
    answer:
      '즉시매도는 의무 매입한 채권을 만기까지 보유하지 않고, 매입 당일 시장가격으로 즉시 되파는 방식입니다. 채권 표면금리가 시중금리보다 낮아 만기까지 들고 있으면 기회비용이 크기 때문에, 실무에서는 거의 전부 매입 후 즉시매도를 선택하고 그 차액(본인부담금)만 실제로 부담합니다.',
  },
  {
    question: '본인부담금은 정확히 어떻게 계산되나요?',
    answer:
      '본인부담금은 매입금액에 즉시매도 할인율을 곱한 값입니다. 매입금액은 시가표준액 × 매입률로 정해지고, 여기에 그날 채권 시장가격에 따라 고시되는 할인율을 곱하면 실제로 창구에서 지불하는 본인부담금이 나옵니다. 두 비율 모두 시점에 따라 달라지므로 매입 직전 실제 값으로 재계산해야 합니다.',
  },
  {
    question: '할인율은 왜 매일 바뀌나요?',
    answer:
      '할인율은 국민주택채권이 채권시장에서 거래되는 시장가격을 반영해 매일 새로 고시되기 때문입니다. 채권 금리·유통 수익률이 변하면 할인율도 함께 움직이므로, 어제와 오늘의 본인부담금이 달라질 수 있습니다. 매입 당일 은행 창구나 주택도시기금 사이트에서 그날 할인율을 확인하는 것이 정확합니다.',
  },
  {
    question: '국민주택채권 매입이 면제되거나 감액되는 경우가 있나요?',
    answer:
      '네, 국민주택규모 이하 주택의 일부 거래나 국가·지방자치단체가 당사자인 경우 등 주택도시기금법 시행령 별표에 정한 면제·감액 대상이 있습니다. 다만 개별 사안마다 요건이 다르므로, 등기 신청 전 주택도시기금 고객센터 또는 담당 은행 창구에서 해당 여부를 직접 확인해야 합니다.',
  },
  {
    question: '시가표준액과 실거래가가 다른데 어떤 금액으로 계산하나요?',
    answer:
      '매입금액은 실거래가가 아니라 시가표준액(공동주택가격·개별주택가격 등 공시된 금액) 기준으로 계산합니다. 실거래가가 시가표준액보다 높거나 낮아도 매입금액에는 영향을 주지 않으며, 등기 접수 시 등기소가 확인하는 공시가격 자료를 기준으로 산정됩니다.',
  },
  {
    question: '매입금액에 단수가 생기면 어떻게 처리하나요?',
    answer:
      '매입금액 계산 결과 1만원 미만 단수가 발생하면 국민주택채권 발행 규정에 따른 절사 기준으로 정리됩니다. 실무에서는 창구 담당자나 채권 매입 시스템이 자동으로 처리하므로 별도로 신경 쓸 필요는 없지만, 최종 영수증의 매입금액이 계산값과 소액 차이가 나는 이유가 바로 이 단수처리입니다.',
  },
];

export default function NationalHousingBondPurchase2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '국민주택채권 매입 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '국민주택채권 매입 2026, 매입금액과 즉시매도 본인부담금 계산법',
    description:
      '부동산 소유권이전등기 시 의무 매입하는 국민주택채권의 매입금액 산정 원리와 즉시매도 본인부담금 계산 사례, 면제 대상까지 완전 정리.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['국민주택채권', '매입금액', '즉시매도', '본인부담금', '주택도시기금법'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '국민주택채권 매입 2026',
    description:
      '소유권이전등기 시 국민주택채권 매입금액 산정법과 즉시매도 본인부담금 계산법.',
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
                    { name: '국민주택채권 매입 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">부동산 매수인·상속인·수증자 · 8분 읽기 · 2026-07-19</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  국민주택채권 매입 2026
                  <br />
                  <span className="text-2xl text-text-secondary">소유권이전등기 시 매입금액과 즉시매도 할인 계산법</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  부동산을 매매·상속·증여로 취득해 소유권이전등기를 신청하면 국민주택채권을 의무적으로 매입해야 합니다. 그런데 정작 매입금액이 얼마인지, 즉시매도 시 실제로 얼마를 부담하는지 헷갈리는 분이 많습니다. 이 가이드는 매입금액 산정 원리, 시가표준액 구간별 매입률 예시, 즉시매도 본인부담금 계산 사례까지 정리했습니다.
                </p>
              </header>

              <AdSlot slot="guide-national-housing-bond-purchase-top" format="horizontal" />

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">국민주택채권 매입이란 무엇인가</h2>
                <p>
                  국민주택채권 매입은 부동산의 소유권이전등기를 신청할 때 제1종 국민주택채권을 의무적으로 사야 하는 제도입니다(주택도시기금법 §8). 매입 대상과 매입 기준은 같은 법 시행령 §8 및 별표에서 정하고 있으며, 주택·토지·건물 등 등기 대상 부동산의 종류와 시가표준액에 따라 매입 여부와 금액이 달라집니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">매입금액 산정의 기본 원리</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    매입금액 = 부동산 시가표준액 × 지역·용도별 매입률
                    <br />
                    본인부담금(즉시매도 시) = 매입금액 × 할인율
                    <br />
                    두 비율 모두 고정값이 아니라 시점·지역·시장 상황에 따라 달라집니다.
                  </p>
                </div>
                <p className="mt-4">
                  채권 매입 자체는 등기를 위한 절차적 요건이지만, 실질적으로는 매수인 등이 부담하는 부대비용이라는 점에서 취득세·중개수수료와 함께 거래 총비용을 계산할 때 반드시 포함해야 합니다.
                </p>
                <p className="mt-4">
                  ⚠️ 다만 국민주택채권은 주택 외에도 토지·건물 등기, 각종 인허가 등에도 매입 의무가 있으므로, 본 가이드는 주택 소유권이전등기 상황을 중심으로 설명합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">매입금액은 어떻게 계산하나</h2>
                <p>
                  매입금액은 시가표준액에 매입률을 곱해 산정합니다. 매입률은 지역(특별시·광역시 vs 그 밖의 지역)과 시가표준액 구간에 따라 차등 적용되며, 대략 시가표준액의 1%대 후반에서 3%대 수준으로 알려져 있습니다. 아래 표는 이해를 돕기 위한 예시이며, 실제 매입률은 반드시 주택도시기금 사이트에서 확인해야 합니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">
                      표 1. 시가표준액 구간별 국민주택채권 매입률 예시(주택도시기금법 시행령 §8 별표 기준 구조, 실제 수치는 주택도시기금 사이트 확인 필요)
                    </caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">지역 구분</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">시가표준액 구간</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">매입률(예시)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">특별시·광역시</td>
                        <td className="p-3">5천만원 이상 1억원 미만</td>
                        <td className="p-3"><strong>1.6%</strong></td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">특별시·광역시</td>
                        <td className="p-3">1억원 이상 1억 6천만원 미만</td>
                        <td className="p-3"><strong>2.1%</strong></td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">특별시·광역시</td>
                        <td className="p-3">1억 6천만원 이상</td>
                        <td className="p-3"><strong>2.6%</strong></td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">그 밖의 지역</td>
                        <td className="p-3">5천만원 이상 1억원 미만</td>
                        <td className="p-3"><strong>1.4%</strong></td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">그 밖의 지역</td>
                        <td className="p-3">1억원 이상 1억 6천만원 미만</td>
                        <td className="p-3"><strong>1.9%</strong></td>
                      </tr>
                      <tr>
                        <td className="p-3">그 밖의 지역</td>
                        <td className="p-3">1억 6천만원 이상</td>
                        <td className="p-3"><strong>2.4%</strong></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  ⚠️ 다만 위 표의 매입률 수치는 구조 이해를 돕기 위한 예시일 뿐이며, 실제 고시 매입률은 주택도시기금법 시행령 §8 별표 개정에 따라 달라질 수 있습니다. 등기 신청 전 반드시 주택도시기금 사이트(nhuf.molit.go.kr)에서 시가표준액과 지역을 입력해 실제 매입금액을 재계산하세요.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">즉시매도 본인부담금은 얼마나 될까</h2>
                <p>
                  실무에서는 채권을 만기까지 보유하지 않고 매입 당일 즉시매도하는 경우가 대부분입니다. 이때 실제로 부담하는 금액은 매입금액 전체가 아니라, 매입금액에 그날 고시되는 할인율을 곱한 본인부담금뿐입니다. 다음 두 사례로 계산 흐름을 확인해 보겠습니다. 매입률과 할인율은 모두 예시이며, 실제 값과 다를 수 있습니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 1. 특별시 소재 주택, 시가표준액 5억원</p>
                  <p className="text-sm text-text-secondary">
                    · 시가표준액: 5억원
                    <br />
                    · 매입률(예시): 2.6%
                    <br />
                    · 매입금액: 5억원 × 2.6% = <strong>1,300만원</strong>
                    <br />
                    · 즉시매도 할인율(예시): 8%
                    <br />
                    · 본인부담금: 1,300만원 × 8% = <strong>104만원</strong>
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 채권 액면 1,300만원 중 실제 부담은 104만원. 매입률·할인율은 예시이므로 실제 값으로 재계산 필요.</span>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 2. 그 밖의 지역 소재 주택, 시가표준액 3억원</p>
                  <p className="text-sm text-text-secondary">
                    · 시가표준액: 3억원
                    <br />
                    · 매입률(예시): 2.4%
                    <br />
                    · 매입금액: 3억원 × 2.4% = <strong>720만원</strong>
                    <br />
                    · 즉시매도 할인율(예시): 6%
                    <br />
                    · 본인부담금: 720만원 × 6% = <strong>43만 2천원</strong>
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 지역·시가표준액이 낮으면 매입금액과 본인부담금도 함께 낮아짐.</span>
                  </p>
                </div>
                <p className="mt-4">
                  ⚠️ 다만 할인율은 채권시장 금리에 따라 매일 달라지는 값이라, 같은 조건이라도 매입 시점이 다르면 본인부담금도 달라집니다. 위 사례는 계산 구조를 보여주기 위한 것으로, 실제 거래 전에는 반드시 매입 당일 고시된 매입률·할인율로 다시 계산해야 합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">매입 면제·감액 대상이 있는가</h2>
                <p>
                  모든 소유권이전등기에 국민주택채권 매입이 동일하게 적용되는 것은 아닙니다. 국민주택규모 이하 주택의 일부 거래, 국가·지방자치단체가 당사자인 등기 등 주택도시기금법 시행령 별표에 정한 면제·감액 대상이 있습니다.
                </p>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li>
                    <strong>국민주택규모 이하 일부 거래:</strong> 규모·가액 기준에 따라 매입 의무가 면제되거나 매입률이 낮아지는 경우가 있습니다.
                  </li>
                  <li>
                    <strong>국가·지방자치단체 관련 등기:</strong> 국가나 지자체가 당사자인 일부 등기는 매입 대상에서 제외될 수 있습니다.
                  </li>
                  <li>
                    <strong>상속·증여 등 무상 이전:</strong> 매매와 마찬가지로 매입 의무가 있지만, 과세표준 산정 기준이 다를 수 있어 개별 확인이 필요합니다.
                  </li>
                </ul>
                <p className="mt-4">
                  ⚠️ 다만 면제·감액 요건은 세부 조건이 복잡하고 개정될 수 있으므로, 등기 신청 전 주택도시기금 고객센터 또는 담당 은행 창구에서 해당 여부를 직접 확인하는 것이 안전합니다.
                </p>
              </section>

              <AdSlot slot="guide-national-housing-bond-purchase-mid" format="rectangle" />

              <section className="space-y-6 border-t border-border-base pt-8" data-speakable>
                <h2 className="text-2xl font-bold">매입 절차는 어떻게 진행되나</h2>
                <p>
                  국민주택채권 매입은 등기 신청 전에 완료해야 하는 절차입니다. 일반적인 흐름은 다음과 같습니다.
                </p>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li><strong>1단계.</strong> 등기 접수 은행(우리·국민·기업 등 취급 은행) 창구 또는 주택도시기금 사이트에서 시가표준액과 지역을 입력해 매입금액을 조회합니다.</li>
                  <li><strong>2단계.</strong> 채권을 매입하고, 만기 보유 또는 즉시매도 중 하나를 선택합니다. 실무에서는 즉시매도가 일반적입니다.</li>
                  <li><strong>3단계.</strong> 즉시매도를 선택하면 그날 고시된 할인율로 정산되어 본인부담금만 실제로 지불합니다.</li>
                  <li><strong>4단계.</strong> 채권 매입 필증(또는 즉시매도 영수증)을 등기 신청 서류에 첨부해 등기소에 제출합니다.</li>
                </ul>
                <p className="mt-4">
                  ⚠️ 다만 매입금액 계산 결과 단수(1만원 미만)가 생기면 채권 발행 규정에 따라 절사되며, 이는 창구 시스템이 자동으로 처리하므로 신청인이 별도로 계산할 필요는 없습니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">시가표준액과 실거래가는 왜 다른가</h2>
                <p>
                  매입금액 산정 기준은 실거래가가 아니라 시가표준액(공동주택가격·개별주택가격 등 공시가격)입니다. 실거래가가 시세보다 높거나 낮게 형성되어도 매입금액에는 영향을 주지 않으며, 등기소가 확인하는 공시가격 자료가 유일한 기준입니다.
                </p>
                <p className="mt-4">
                  이 때문에 실거래가 기준으로 취득세를 계산하는 것과, 시가표준액 기준으로 국민주택채권 매입금액을 계산하는 것은 서로 다른 기준을 쓴다는 점을 혼동하지 않아야 합니다. 취득세는 실거래가(또는 시가인정액) 기준, 국민주택채권은 시가표준액 기준으로 각각 별도 계산됩니다.
                </p>
                <p className="mt-4">
                  ⚠️ 다만 신축 등 시가표준액이 아직 고시되지 않은 부동산은 별도의 산정 기준이 적용될 수 있으므로, 이 경우 관할 등기소 또는 주택도시기금 고객센터에 문의해야 합니다.
                </p>
              </section>

              <h2 className="text-2xl font-bold mb-6">자주 묻는 질문</h2>
              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h3 className="text-lg font-semibold text-text-primary">관련 계산기 및 가이드</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link
                    href="/calculator/acquisition-tax/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">취득세 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">부동산 취득 시 함께 발생하는 취득세를 계산해보세요.</p>
                  </Link>
                  <Link
                    href="/guide/acquisition-tax-calculation-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">취득세 계산법 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">세율 구간·중과 기준을 포함한 취득세 전체 계산법.</p>
                  </Link>
                  <Link
                    href="/guide/first-home-acquisition-tax-reduction-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">생애최초 취득세 감면 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">생애최초 주택 구입 시 취득세 감면 조건을 확인하세요.</p>
                  </Link>
                  <Link
                    href="/guide/real-estate-broker-fee-rate-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">중개수수료율 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">거래가액별 중개보수 요율과 상한액을 정리했습니다.</p>
                  </Link>
                  <Link
                    href="/category/real-estate/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">모든 부동산 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">전월세전환·중개수수료·평수·임대수익률 모음.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 교육 목적으로 작성되었으며, 개인 맞춤형 세무·법률 조언이 아닙니다. 본문의 매입률·할인율 수치는 계산 구조를 설명하기 위한 <strong>예시</strong>이며, 실제 매입금액과 본인부담금은 매입 당일 주택도시기금 사이트(nhuf.molit.go.kr) 또는 담당 은행 창구에서 반드시 확인해야 합니다. 본 콘텐츠는 2026-07-19을 기준으로 작성되었으며, 관련 법령 개정 시 즉시 업데이트됩니다. 근거 법조항은 <strong>주택도시기금법 §8(국민주택채권의 매입)</strong> 및 <strong>같은 법 시행령 §8(매입 대상과 매입 기준)</strong>입니다. AI 보조 작성 후 운영자 검수 완료.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터</a>,{' '}
                  <a href="https://nhuf.molit.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">주택도시기금</a>,{' '}
                  <a href="https://www.iros.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">대법원 인터넷등기소</a>,{' '}
                  <a href="https://www.wetax.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">위택스(시가표준액 조회)</a>.
                </p>
              </section>

              <ShareButtons
                title="국민주택채권 매입 2026 가이드"
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
