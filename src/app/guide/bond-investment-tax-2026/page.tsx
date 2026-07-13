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

const URL = 'https://calculatorhost.com/guide/bond-investment-tax-2026/';
const DATE_PUBLISHED = '2026-07-14';
const DATE_MODIFIED = '2026-07-14';

export const metadata: Metadata = {
  title: '채권투자 세금 2026, 표면이자 15.4%·매매차익 비과세',
  description:
    '개인투자자의 채권 표면이자는 15.4% 원천징수, 매매차익은 소득세법 열거주의로 개인 직접보유 시 비과세. 금융소득 2,000만원 기준, 저쿠폰 절세 원리, 펀드·ETF 예외까지 정리.',
  keywords: [
    '채권 세금',
    '채권 이자소득세',
    '채권 매매차익 비과세',
    '표면이자 15.4%',
    '금융소득종합과세',
    '저쿠폰 채권 절세',
    '채권 ETF 세금',
    '소득세법 16조',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '채권투자 세금 2026 가이드' }],
    title: '채권투자 세금 2026, 표면이자 15.4%·매매차익 비과세',
    description: '표면이자는 이자소득으로 15.4% 원천징수, 개인 직접보유 채권의 매매차익은 열거주의로 비과세. 사례로 정리한 채권 세제.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '채권투자 세금 2026, 표면이자 15.4%·매매차익 비과세',
    description: '표면이자 15.4%, 개인 직접보유 매매차익 비과세, 금융소득 2,000만원 종합과세 기준까지 사례로 정리.',
  },
};

const FAQ_ITEMS = [
  {
    question: '채권 표면이자와 매매차익은 세금이 어떻게 다른가요?',
    answer:
      '표면이자(이표)는 이자소득으로 15.4% 원천징수되지만, 개인이 직접 보유한 채권의 매매차익은 소득세법상 열거되지 않아 비과세입니다(소득세법 §16). 다만 채권형 펀드나 채권 ETF를 통해 투자한 경우 매매차익도 배당소득으로 과세되므로, 직접 보유와 간접 보유의 세제 차이를 반드시 구분해야 합니다.',
  },
  {
    question: '15.4% 세율은 어떻게 계산된 것인가요?',
    answer:
      '소득세 14%(소득세법 §16 이자소득)와 지방소득세 1.4%(소득세의 10%)를 합한 원천징수 세율입니다. 채권 이자를 지급받을 때 원천징수기관이 자동으로 떼고 지급하므로, 금융소득이 연 2,000만원 이하라면 별도 신고 없이 분리과세로 종결됩니다. 초과 시에는 금융소득종합과세로 넘어갑니다.',
  },
  {
    question: '금융소득종합과세 2,000만원 기준은 어떻게 판정하나요?',
    answer:
      '이자소득과 배당소득을 모두 합한 연간 금액이 2,000만원을 초과하면, 초과분이 다른 종합소득(근로·사업 등)과 합산되어 누진세율로 재계산됩니다(소득세법 §14). 예를 들어 채권 이자 1,500만원과 예금 이자 800만원이면 총 2,300만원으로, 300만원이 종합과세 대상이 됩니다.',
  },
  {
    question: '저쿠폰(할인)채권이 세금 측면에서 유리한 이유는 무엇인가요?',
    answer:
      '표면이율이 낮으면 과세되는 표면이자가 적고, 만기까지 보유하면 액면가와 매입가의 차이(자본차익)가 상대적으로 커집니다. 개인이 직접 보유한 채권의 매매차익은 비과세이므로, 표면이율이 높은 채권보다 세후수익률이 유리할 수 있습니다. 다만 신용위험, 유동성, 금리 변동 리스크는 별도로 확인해야 합니다.',
  },
  {
    question: '채권형 펀드나 채권 ETF도 매매차익이 비과세인가요?',
    answer:
      '아닙니다. 집합투자기구(펀드·ETF)를 통해 투자한 경우 매매차익도 배당소득으로 과세됩니다. 개인이 직접 채권을 보유해 시장금리 변동으로 얻은 매매차익만 비과세이며, 간접 보유는 소득세법상 배당소득으로 분류되어 15.4% 원천징수 대상이 됩니다. 상품 유형별 과세 구분을 먼저 확인하세요.',
  },
  {
    question: '채권을 만기 전 중도매도하면 세금이 달라지나요?',
    answer:
      '이자지급일 사이에 매도하면 보유기간에 해당하는 보유기간 이자상당액이 이자소득으로 과세될 수 있습니다. 매도가와 매입가의 순수 시세 차익만 비과세이고, 경과이자 부분은 원천징수 대상이므로, 매도 시점의 정확한 과세 구분은 금융회사의 원천징수내역서로 확인하는 것이 안전합니다.',
  },
  {
    question: '환매조건부채권(RP)의 수익도 채권과 같이 처리되나요?',
    answer:
      '아닙니다. RP는 예금성 상품에 가까워 지급받는 수익 전액이 이자소득으로 15.4% 원천징수됩니다. 순수한 채권 직접 보유에서 얻는 매매차익 비과세 혜택은 적용되지 않으므로, 상품 유형(직접 채권 / RP / 펀드 / ETF)에 따른 과세 구분을 반드시 사전에 확인하세요.',
  },
  {
    question: '채권 이자를 신고할 때 필요한 자료는 무엇인가요?',
    answer:
      '금융회사가 발급한 이자 지급 명세서 또는 원천징수영수증이 기본 자료입니다. 금융소득이 2,000만원을 넘어 종합과세 대상이 되면 5월 종합소득세 신고 때 국세청 홈택스에서 금융소득 자료를 조회해 신고서에 합산합니다. 정확한 신고 방법은 국세청 안내를 참고하시기 바랍니다.',
  },
];

export default function BondInvestmentTax2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '채권투자 세금 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '채권투자 세금 2026, 표면이자 15.4%·매매차익 비과세',
    description:
      '개인투자자의 채권 세제 정리. 표면이자는 이자소득으로 15.4% 원천징수, 매매차익은 열거주의로 개인 직접보유 시 비과세. 금융소득 2,000만원 기준, 저쿠폰 절세, 펀드·ETF 예외 포함.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['채권 세금', '표면이자', '매매차익 비과세', '금융소득종합과세', '저쿠폰 채권'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '채권투자 세금 2026',
    description:
      '개인투자자의 채권 표면이자·매매차익 과세 구분과 금융소득종합과세 판정 기준을 사례 중심으로 정리.',
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
                    { name: '채권투자 세금 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">개인 투자자 · 9분 읽기 · 2026-07-14</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  채권투자 세금 2026
                  <br />
                  <span className="text-2xl text-text-secondary">표면이자 15.4%, 매매차익 비과세의 구조</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  개인투자자가 채권에서 얻는 수익은 크게 두 갈래로 나뉩니다. 정기적으로 받는 표면이자(이표)와, 시장금리 변동에 따라 발생하는 매매차익(자본이득)이 그것입니다. 세법은 이 둘을 완전히 다르게 취급합니다. 이자소득은 15.4%가 원천징수되지만, 개인이 직접 보유한 채권의 매매차익은 소득세법상 과세대상으로 열거되어 있지 않아 비과세입니다. 이 구조를 정확히 이해하면 상품 선택과 절세 전략이 크게 달라집니다.
                </p>
              </header>

              <AdSlot slot="guide-bond-investment-tax-2026-top" format="horizontal" />

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">채권 세금의 기본 구조: 이자소득과 매매차익</h2>
                <p>
                  채권 투자수익은 세법상 두 가지 성격으로 구분됩니다. 첫째는 채권 발행 시 약정된 표면이율에 따라 정기적으로 지급되는 이자(표면이자·이표)로, 이는 소득세법 §16의 이자소득에 해당합니다. 둘째는 시장금리가 변해 채권 가격이 오르내리면서 발생하는 매매차익(자본이득)입니다. 우리나라 소득세법은 열거주의를 취하기 때문에, 법에 과세대상으로 열거되지 않은 소득은 원칙적으로 과세하지 않습니다. 개인이 직접 보유한 채권의 매매차익은 이 열거된 항목에 포함되지 않아 비과세로 처리됩니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 채권 수익 유형별 과세 구분 (개인 직접보유 기준)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">수익 유형</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">세법상 분류</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">세율</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">표면이자(이표)</td>
                        <td className="p-3">이자소득(소득세법 §16)</td>
                        <td className="p-3"><strong>15.4% 원천징수</strong></td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">매매차익(시세차익)</td>
                        <td className="p-3">열거 외 소득</td>
                        <td className="p-3"><strong>비과세</strong></td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">보유기간 이자상당액</td>
                        <td className="p-3">이자소득</td>
                        <td className="p-3">15.4% 원천징수</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  다만 이 구분은 개인이 채권을 직접 매매·보유하는 경우에 한정됩니다. 뒤에서 살펴볼 채권형 펀드나 채권 ETF, 환매조건부채권(RP) 등은 과세 방식이 다르므로 상품 유형을 먼저 확인해야 합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">표면이자는 왜 15.4%가 원천징수될까?</h2>
                <p>
                  결론부터 말하면, 소득세 14%와 지방소득세 1.4%가 합쳐진 이자소득 원천징수 세율이기 때문입니다. 소득세법 §16은 채권의 이자와 할인액을 이자소득으로 열거하고 있으며, 이자소득의 기본 원천징수세율은 14%입니다. 여기에 지방소득세가 소득세의 10%로 부과되어 1.4%가 더해집니다. 원천징수기관이 이자 지급 시점에 자동으로 15.4%를 떼고 나머지를 지급하므로, 투자자는 별도의 신고 없이 세금이 정리됩니다.
                </p>
                <p className="mt-4">
                  이 원천징수는 금융소득이 연 2,000만원 이하일 때 분리과세로 완결됩니다. 즉, 근로소득이나 사업소득이 아무리 많아도 채권 이자 자체는 15.4%로 종결되고 종합소득세에 합산되지 않습니다. 예금·적금 이자와 동일한 방식입니다.
                </p>
                <p className="mt-4">
                  다만 예외가 있습니다. 금융소득종합과세 대상이 되면 원천징수된 세금은 기납부세액으로 처리되고, 초과분에 대해서는 누진세율로 재계산됩니다. 또한 비영업대금의 이익 같은 특수 이자소득은 25%의 다른 원천징수율이 적용되는 경우도 있으므로, 자신이 받는 이자의 유형을 정확히 구분해야 합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">채권 매매차익은 정말 비과세인가요?</h2>
                <p>
                  개인이 직접 보유한 채권을 팔거나 만기 상환받아 얻은 매매차익은 원칙적으로 비과세입니다. 앞서 설명한 대로 우리나라 소득세법은 열거주의이므로, 법에 과세대상으로 명시되지 않은 소득은 과세하지 않습니다. 채권의 매매차익은 상장주식의 매매차익과 마찬가지로 소득세법상 이자소득이나 배당소득으로 열거되어 있지 않아 과세 대상에서 제외됩니다.
                </p>
                <p className="mt-4">
                  이 비과세 혜택은 시장금리 하락 국면에서 특히 두드러집니다. 시장금리가 내려가면 이미 발행된 고금리 채권의 가격이 오르고, 이를 만기 전에 매도하면 상당한 자본차익을 얻을 수 있는데, 이 차익 전액이 세금 없이 투자자에게 귀속됩니다.
                </p>
                <p className="mt-4">
                  다만 몇 가지 예외를 반드시 알아야 합니다. 첫째, 채권형 펀드나 채권 ETF를 통해 간접 투자한 경우 매매차익도 배당소득으로 과세됩니다. 둘째, 이자지급일 사이에 채권을 매도하면 보유기간에 해당하는 이자상당액은 매매차익이 아닌 이자소득으로 과세될 수 있습니다. 셋째, RP나 예금성 상품의 수익은 순수한 채권 매매가 아니라 이자소득으로 처리됩니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">금융소득 2,000만원 초과 시 무엇이 달라지는가?</h2>
                <p>
                  분리과세로 끝나던 이자·배당 소득이 종합소득에 합산되기 시작합니다. 소득세법 §14에 따라 이자소득과 배당소득의 합계가 연 2,000만원을 초과하면, 초과분이 근로소득·사업소득 등 다른 종합소득과 합산되어 6%부터 45%까지의 누진세율로 재계산됩니다. 이를 금융소득종합과세라고 부릅니다.
                </p>
                <p className="mt-4">
                  주의할 점은 판정 기준이 이자와 배당을 모두 합한 총액이라는 사실입니다. 채권 이자만 계산할 것이 아니라 예금 이자, 배당금, 채권형 펀드 배당 등이 모두 합쳐집니다. 예를 들어 채권 이자 1,500만원과 예금 이자 800만원을 받았다면 합계 2,300만원이 되어 300만원이 종합과세 대상이 됩니다. 이때 300만원에 대한 최종 세부담은 다른 종합소득 규모에 따라 달라지며, 근로소득이 많은 고소득자일수록 실효세율이 15.4%를 크게 웃돌 수 있습니다.
                </p>
                <p className="mt-4">
                  다만 이미 원천징수된 15.4%는 기납부세액으로 인정되어 최종 세액에서 차감됩니다. 따라서 종합과세로 넘어가더라도 이중과세가 되는 것은 아니며, 5월 종합소득세 신고 때 정산이 이뤄집니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">세금으로 본 저쿠폰(할인)채권의 원리</h2>
                <p>
                  표면이율이 낮은 저쿠폰 채권은 과세되는 표면이자 자체가 적습니다. 대신 액면가보다 할인된 가격에 매입하기 때문에, 만기 상환 시 액면가와 매입가의 차이가 매매차익 형태로 실현됩니다. 개인이 직접 보유하는 경우 이 매매차익은 비과세이므로, 표면이율이 높은 채권보다 세후수익률이 유리하게 나올 수 있습니다.
                </p>
                <p className="mt-4">
                  예를 들어 총수익이 같은 두 채권이 있다고 가정해봅시다. 표면이율 3% 채권과 표면이율 1% 저쿠폰 채권이 모두 만기 총수익률 3%를 낸다면, 전자는 3% 전액이 15.4% 과세 대상이지만, 후자는 1%만 과세되고 2%는 매매차익으로 비과세 처리됩니다. 세전수익률은 같아도 세후수익률은 후자가 확연히 앞섭니다.
                </p>
                <p className="mt-4">
                  다만 저쿠폰 채권이 항상 유리한 것은 아닙니다. 신용등급, 만기, 유동성, 발행자의 상환 능력 등 세제 외 요소가 훨씬 중요할 수 있습니다. 특히 금리가 상승하는 국면에서는 저쿠폰 채권의 가격 하락 폭이 더 크므로 금리 위험도 함께 고려해야 합니다. 본 가이드는 세제 구조를 설명할 뿐, 특정 채권의 매수·매도를 추천하지 않습니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">채권형 펀드·ETF는 왜 세금이 다른가요?</h2>
                <p>
                  집합투자기구를 거치기 때문에 매매차익도 배당소득으로 재분류되기 때문입니다. 개인이 직접 채권을 보유하는 경우와 달리, 채권형 펀드나 채권 ETF는 자산운용사가 다수 투자자의 자금을 모아 채권에 투자하는 구조입니다. 세법은 이 집합투자기구에서 발생한 모든 손익을 투자자에게 분배할 때 배당소득으로 취급합니다.
                </p>
                <div className="overflow-x-auto mt-4">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 2. 개인 직접보유 vs 채권형 펀드·ETF 세제 비교</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">구분</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">표면이자·이자수익</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">매매차익</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">개인 직접보유 채권</td>
                        <td className="p-3">이자소득 15.4% 원천징수</td>
                        <td className="p-3"><strong>비과세</strong></td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">채권형 펀드</td>
                        <td className="p-3">배당소득 15.4%</td>
                        <td className="p-3">배당소득 15.4% 과세</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">채권 ETF(국내 상장)</td>
                        <td className="p-3">배당소득 15.4%</td>
                        <td className="p-3">배당소득 15.4% 과세</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  이 구조 때문에 매매차익이 큰 국면에서는 직접보유가 세제상 유리할 수 있고, 반대로 소액·분산·유동성이 중요한 경우에는 펀드·ETF가 편리할 수 있습니다.
                </p>
                <p className="mt-4">
                  다만 국내 상장 채권 ETF와 해외 상장 채권 ETF는 과세 구조가 또 다릅니다. 해외 ETF는 매매차익이 양도소득세(22% 분리과세, 250만원 기본공제)로 과세되는 등 규정이 상이하니, 상품 선택 전 개별 상품설명서와 판매사의 세제 안내를 반드시 확인하시기 바랍니다.
                </p>
              </section>

              <AdSlot slot="guide-bond-investment-tax-2026-mid" format="rectangle" />

              <section className="space-y-6 border-t border-border-base pt-8" data-speakable>
                <h2 className="text-2xl font-bold">채권 세금 계산: 3가지 실전 사례</h2>
                <p>
                  구체적인 숫자로 세금이 어떻게 달라지는지 살펴보겠습니다. 아래 사례는 계산 원리를 보여주기 위한 예시이며, 실제 투자 수익은 시장 상황·수수료·중도매도 여부에 따라 달라집니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 1. 액면 1억원 · 표면이율 3% · 1년 보유</p>
                  <p className="text-sm text-text-secondary">
                    · 연간 표면이자: 1억원 × 3% = <strong>300만원</strong>
                    <br />
                    · 원천징수(15.4%): 300만원 × 15.4% = <strong>46.2만원</strong>
                    <br />
                    · 세후 이자수령액: 300만원 - 46.2만원 = <strong>253.8만원</strong>
                    <br />
                    · 시장금리 하락으로 채권가격 상승, 매도 시 발생한 매매차익: <strong>비과세</strong>
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 표면이자에는 15.4% 원천징수, 매매차익은 개인 직접보유이므로 세금 없음.</span>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 2. 저쿠폰 할인채권 · 표면이율 1% · 액면 1억원(매입가 9,500만원)</p>
                  <p className="text-sm text-text-secondary">
                    · 연간 표면이자: 1억원 × 1% = <strong>100만원</strong> (과세대상)
                    <br />
                    · 이자 원천징수(15.4%): 100만원 × 15.4% = <strong>15.4만원</strong>
                    <br />
                    · 만기 상환 시 자본차익: 1억원 - 9,500만원 = <strong>500만원</strong>
                    <br />
                    · 이 500만원 자본차익: 개인 직접보유 시 <strong>비과세</strong>
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 과세 표면이자를 최소화하고 비과세 자본차익 비중을 키운 절세 구조. 다만 신용·유동성 위험은 별도 확인.</span>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 3. 금융소득종합과세 판정 · 채권이자 1,500만원 + 예금이자 800만원</p>
                  <p className="text-sm text-text-secondary">
                    · 채권 이자소득: <strong>1,500만원</strong>
                    <br />
                    · 예금 이자소득: <strong>800만원</strong>
                    <br />
                    · 금융소득 합계: 1,500만원 + 800만원 = <strong>2,300만원</strong>
                    <br />
                    · 2,000만원 초과분: 2,300만원 - 2,000만원 = <strong>300만원</strong>
                    <br />
                    · 이 300만원은 다른 종합소득과 합산 누진과세(소득세법 §14)
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 개별 세목이 아닌 이자·배당 총합으로 판정. 원천징수된 15.4%는 기납부세액으로 정산.</span>
                  </p>
                </div>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">중도매도·RP 등 예외 상황 정리</h2>
                <p>
                  실무에서 세금 계산이 꼬이는 대부분의 경우는 아래 예외에서 비롯됩니다. 상품별 과세 구분을 미리 확인해두면 예상치 못한 세부담을 피할 수 있습니다.
                </p>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li>
                    <strong>중도매도 시 보유기간 이자상당액:</strong> 이자지급일 사이에 채권을 매도하면 보유기간에 대응하는 이자상당액이 이자소득으로 과세될 수 있습니다. 순수한 시세 차익만 비과세이며, 경과이자 부분은 원천징수 대상입니다.
                  </li>
                  <li>
                    <strong>환매조건부채권(RP):</strong> 정해진 기간 뒤 미리 약정한 가격으로 되사주는 상품이라, 실질적으로 예금과 유사합니다. 수익 전액이 이자소득 15.4% 원천징수 대상이며, 채권 매매차익 비과세 혜택은 적용되지 않습니다.
                  </li>
                  <li>
                    <strong>채권형 펀드·ETF:</strong> 집합투자기구 특성상 매매차익도 배당소득으로 과세되어 15.4% 원천징수됩니다. 개인 직접보유의 세제 이점이 사라집니다.
                  </li>
                  <li>
                    <strong>해외 채권·해외 채권 ETF:</strong> 국내 채권과 별도의 과세 구조가 적용될 수 있으며, 환차익·양도소득세·외국납부세액공제 등이 얽힙니다. 개별 상품 안내를 확인하고 필요 시 세무 전문가와 상담하시기 바랍니다.
                  </li>
                  <li>
                    <strong>비영업대금의 이익 등 특수 이자소득:</strong> 원천징수 세율이 25%로 다른 경우가 있습니다. 자신이 받는 이자의 유형을 원천징수영수증으로 확인하세요.
                  </li>
                </ul>
                <p className="mt-4">
                  다만 위 예외는 개별 사안에 따라 판정이 달라질 수 있으므로, 큰 금액을 다룰 때는 반드시 국세청 홈택스 안내나 세무 전문가의 확인을 거치는 것이 안전합니다.
                </p>
              </section>

              <h2 className="text-2xl font-bold mb-6">자주 묻는 질문</h2>
              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h3 className="text-lg font-semibold text-text-primary">관련 계산기 및 가이드</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link
                    href="/guide/interest-income-tax-15-4-percent-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">이자소득세 15.4% 완전정리</div>
                    <p className="mt-1 text-sm text-text-secondary">소득세 14% + 지방소득세 1.4% 구조와 원천징수 원리.</p>
                  </Link>
                  <Link
                    href="/guide/financial-income-comprehensive-vs-separate-taxation/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">금융소득 종합과세 vs 분리과세</div>
                    <p className="mt-1 text-sm text-text-secondary">2,000만원 초과 판정 기준과 실전 절세 흐름.</p>
                  </Link>
                  <Link
                    href="/guide/dividend-income-tax-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">배당소득세 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">배당소득 원천징수와 종합과세 편입 기준.</p>
                  </Link>
                  <Link
                    href="/guide/etf-tax-domestic-overseas-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">국내·해외 ETF 세금 비교</div>
                    <p className="mt-1 text-sm text-text-secondary">배당소득 15.4% vs 양도소득세 22%, 상품별 과세 지도.</p>
                  </Link>
                  <Link
                    href="/guide/isa-account-tax-benefit-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">ISA 계좌 절세 활용법</div>
                    <p className="mt-1 text-sm text-text-secondary">채권·예금·펀드를 담아 200만원까지 비과세 활용.</p>
                  </Link>
                  <Link
                    href="/calculator/deposit/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">정기예금 세후 이자 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">15.4% 원천징수 반영 세후 이자를 즉시 확인.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 세금 정보 제공용으로 작성되었으며, 특정 상품의 매수·매도를 추천하는 것이 아닙니다. 개인 맞춤형 세무·재무 조언이 필요하시면 국세청 상담 또는 세무 전문가에게 문의하시기 바랍니다. 실제 원천징수 세율, 금융소득종합과세 판정, 채권 상품별 세제는 상품 유형(직접보유 채권 / RP / 채권형 펀드 / 채권 ETF / 해외 채권 등)에 따라 달라질 수 있으므로, 매매 전 판매사의 상품설명서와 세제 안내를 반드시 확인하세요. 본 콘텐츠는 2026-07-14를 기준으로 작성되었으며, 세법 개정 시 즉시 업데이트됩니다. 인용 조항: <strong>소득세법 §16(이자소득)</strong>, <strong>소득세법 §14(금융소득종합과세)</strong>. AI 보조 작성 후 운영자 검수 완료.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터(소득세법)</a>,{' '}
                  <a href="https://www.nts.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">국세청 홈페이지</a>,{' '}
                  <a href="https://www.kofia.or.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">금융투자협회</a>.
                </p>
              </section>

              <ShareButtons
                title="채권투자 세금 2026 가이드"
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
