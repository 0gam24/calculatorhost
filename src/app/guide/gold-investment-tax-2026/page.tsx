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

const URL = 'https://calculatorhost.com/guide/gold-investment-tax-2026/';
const DATE_PUBLISHED = '2026-07-20';
const DATE_MODIFIED = '2026-07-20';

export const metadata: Metadata = {
  title: '금 투자 세금 2026, KRX금·골드바·금통장·금ETF 과세 비교',
  description:
    '금 투자 방식마다 세금이 완전히 다릅니다. KRX 금현물시장은 매매차익 비과세, 골드바는 부가세 10%, 금통장·금ETF는 배당소득세 15.4%. 조세특례제한법 §126의7 기준으로 4가지 방식의 세금과 비용을 비교했습니다.',
  keywords: [
    '금 투자 세금',
    'KRX 금시장 비과세',
    '골드바 부가세',
    '금통장 세금',
    '금ETF 배당소득세',
    '조세특례제한법 126조의7',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '금 투자 세금 2026, KRX금·골드바·금통장·금ETF 과세 비교' }],
    title: '금 투자 세금 2026, 4가지 방식의 과세 구조를 한눈에',
    description: 'KRX 금현물시장은 매매차익 비과세·부가세 면제, 골드바는 부가세 10%, 금통장·국내 금ETF는 15.4%, 해외 금ETF는 22%. 조세특례제한법 §126의7 기준 완전 비교.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '금 투자 세금 2026, 방식별 과세 완전 비교',
    description: 'KRX 금시장 비과세, 골드바 부가세 10%, 금통장·금ETF 배당소득세 15.4%. 조세특례제한법 §126의7.',
  },
};

const FAQ_ITEMS = [
  {
    question: '금 투자 방식별 세금이 얼마나 다른가요?',
    answer:
      '같은 금이라도 매입 방식에 따라 부가세, 매매차익 과세, 금융소득종합과세 여부가 완전히 달라집니다. KRX 금현물시장은 매매차익이 비과세이고 부가세도 면제입니다(조세특례제한법 §126의7). 실물 골드바는 매입 시 부가세 10%가 붙지만 차익은 비과세, 금통장과 국내 상장 금ETF는 매매차익에 배당소득세 15.4%가 원천징수되고, 해외 상장 금ETF는 양도소득세 22%가 부과됩니다.',
  },
  {
    question: 'KRX 금현물시장의 매매차익은 정말 완전히 비과세인가요?',
    answer:
      '네, 한국거래소 KRX 금시장 내에서 발생한 매매차익은 소득세법상 과세대상 소득 어디에도 열거되지 않아 비과세입니다. 우리나라 소득세는 열거주의를 채택하고 있어 법에 명시되지 않은 소득은 과세하지 않습니다. 또한 조세특례제한법 §126의7 제2호에 따라 시장 내 거래는 부가가치세도 면제됩니다. 금융소득종합과세에도 포함되지 않아 고소득자에게 특히 유리합니다.',
  },
  {
    question: '골드바를 사면 부가세 10%를 나중에 돌려받나요?',
    answer:
      '돌려받지 못합니다. 부가가치세법 §9에 따른 재화의 공급으로 실물 골드바를 매입할 때 부가세 10%는 매수 가격에 포함되어 즉시 납부되며, 이후 매도해도 환급 대상이 아닙니다. 여기에 세공비, 브랜드 프리미엄 등이 추가되면 매입 시점에 국제 금시세 대비 15% 안팎이 이미 반영된 가격을 지불하는 셈이므로, 금값이 그 이상 상승해야 손익분기에 도달합니다.',
  },
  {
    question: '금통장(골드뱅킹)의 매매차익은 왜 배당소득으로 잡히나요?',
    answer:
      '금통장은 금 실물을 예치하는 것이 아니라 은행이 발행한 파생결합 성격의 금 계좌 잔고를 사고파는 구조이기 때문에, 그 이익은 소득세법 §17이 규정한 배당소득에 준해 15.4%(지방소득세 포함)로 원천징수됩니다. 부가세는 없지만 연간 금융소득이 2천만원을 초과하면 금융소득종합과세 대상에 편입될 수 있어 고소득자는 세율이 크게 오를 수 있습니다.',
  },
  {
    question: '국내 상장 금 ETF와 해외 상장 금 ETF의 세금 차이는?',
    answer:
      '국내 상장 금현물 ETF의 매매차익은 배당소득세 15.4%가 원천징수되고 금융소득종합과세 대상입니다. 반면 해외 상장 금 ETF는 양도소득세 22%(지방세 포함)가 적용되고 연 250만원 기본공제 후 다음 해 5월 자진 신고합니다. 대신 해외분은 분류과세라 아무리 이익이 커도 금융소득종합과세에는 포함되지 않아 고소득자의 종합소득 세율 상승은 피할 수 있습니다.',
  },
  {
    question: '금 투자로 얻은 소득이 금융소득종합과세 대상이 되나요?',
    answer:
      '방식에 따라 다릅니다. KRX 금현물시장 매매차익과 실물 골드바 차익은 애초 과세 대상이 아니라 종합과세와 무관합니다. 금통장 매매차익과 국내 상장 금ETF 분배·매매이익은 배당소득으로 잡혀 연 2천만원 초과 시 종합과세됩니다. 해외 금ETF는 양도소득세 분류과세라 종합과세에 포함되지 않지만 매년 5월 자진 신고가 필요합니다.',
  },
  {
    question: 'KRX 금시장에서 실물로 인출하면 얼마의 세금이 붙나요?',
    answer:
      '조세특례제한법 §126의7과 부가가치세법 §9에 따라, 보관기관에서 실물 골드바로 인출하는 순간 부가가치세 10%가 부과됩니다. 시장 안에서 계속 거래하면 부가세가 면제되지만 실물로 반출하는 시점부터는 일반 재화의 공급으로 취급되기 때문입니다. 실물 소유가 반드시 필요한 경우가 아니라면, KRX 계좌에 그대로 두는 편이 세제상 유리합니다.',
  },
  {
    question: '손익분기 관점에서 가장 유리한 금 투자 방식은?',
    answer:
      '단순 매매차익만 놓고 보면 KRX 금현물시장이 가장 유리합니다. 부가세 없이 시장가에 매입할 수 있고 매매차익도 비과세이며 금융소득종합과세에도 포함되지 않기 때문입니다. 실물 보유가 필요하면 골드바지만 부가세와 부대비용 15% 안팎을 감안해야 하고, 소액 분할 매수와 자동 이체가 필요하면 금통장, 매매 편의성과 분산이 필요하면 금 ETF가 대안입니다.',
  },
];

export default function GoldInvestmentTax2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '금 투자 세금 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '금 투자 세금 2026, KRX금·골드바·금통장·금ETF 과세 비교',
    description:
      'KRX 금현물시장, 실물 골드바, 금통장, 금 ETF 등 4가지 금 투자 방식의 부가세·매매차익 과세·금융소득종합과세 여부를 조세특례제한법 §126의7 기준으로 비교한 가이드.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['금 투자 세금', 'KRX 금시장', '골드바 부가세', '금통장', '금ETF'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '금 투자 세금 2026, 방식별 과세 완전 비교',
    description:
      'KRX 금시장·골드바·금통장·금ETF 4가지 금 투자 방식의 세금 구조와 비용 손익분기 비교.',
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
                    { name: '금 투자 세금 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">금 투자자 · 8분 읽기 · 2026-07-20</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  금 투자 세금 2026
                  <br />
                  <span className="text-2xl text-text-secondary">방식별 과세 한눈에 비교</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  같은 금을 사더라도 어떤 창구로 사느냐에 따라 세금이 완전히 달라집니다. KRX 금현물시장은 매매차익 비과세에 부가세도 면제, 실물 골드바는 매입 시 부가세 10%, 금통장과 국내 상장 금ETF는 매매차익에 배당소득세 15.4%가 붙습니다. 이 가이드는 조세특례제한법 §126의7과 부가가치세법 §9, 소득세법 §17을 근거로 4가지 방식의 세금과 비용, 금융소득종합과세 여부까지 한 페이지에서 비교합니다.
                </p>
              </header>

              <AdSlot slot="guide-gold-investment-tax-2026-top" format="horizontal" />

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">금 투자하면 세금 얼마나 내나요?</h2>
                <p>
                  결론부터 말하면 방식마다 다릅니다. 같은 1kg 금을 매입하더라도 KRX 금현물시장에서 사는지, 은행 창구에서 골드바를 받는지, 골드뱅킹 계좌에 예치하는지, 증권 계좌에서 금 ETF를 사는지에 따라 부가세 10%가 붙기도 하고 매매차익 15.4%나 22%가 부과되기도 합니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">4가지 방식의 세금 요약</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    · KRX 금현물시장: 매매차익 비과세, 부가세 면제(조세특례제한법 §126의7)
                    <br />
                    · 실물 골드바: 매입 시 부가세 10% + 세공비, 매매차익 비과세
                    <br />
                    · 금통장(골드뱅킹): 매매차익 배당소득세 15.4%(소득세법 §17)
                    <br />
                    · 금 ETF: 국내 상장 15.4% / 해외 상장 22%(양도소득세, 250만원 공제)
                  </p>
                </div>
                <p className="mt-4">
                  ⚠️ 다만 KRX 금시장에서 실물로 인출하는 순간부터는 부가가치세법 §9의 재화 공급에 해당해 부가세 10%가 부과됩니다. 실물 소유가 반드시 필요한 경우가 아니라면 계좌에 그대로 두는 편이 세제상 유리합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">KRX 금현물시장은 왜 세금이 없나요?</h2>
                <p>
                  한국거래소가 운영하는 KRX 금시장은 조세특례제한법 §126의7에 따라 특별한 세제 혜택을 받습니다. 시장 내에서 이루어지는 금 매매거래는 같은 조항 제2호로 부가가치세가 면제되며, 매매차익 역시 소득세법이 열거한 과세 대상 소득 어디에도 해당하지 않아 결과적으로 비과세입니다.
                </p>
                <p>
                  우리나라 소득세는 열거주의를 채택하고 있어 법률에 명시된 소득 종류만 과세됩니다. KRX 금시장의 매매차익은 배당소득에도, 이자소득에도, 양도소득에도 열거되어 있지 않기 때문에 과세 근거 자체가 없습니다. 이 덕분에 금융소득종합과세에도 포함되지 않아 이자·배당 소득이 이미 2천만원을 넘긴 고소득자에게도 세율 상승 부담이 없습니다.
                </p>
                <p>
                  실전 장점은 세 가지입니다. 첫째, 부가세 10%가 원가에 붙지 않으니 국제 금 시세와 거의 동일한 가격에 매수할 수 있습니다. 둘째, 아무리 큰 차익이 발생해도 원천징수나 신고 의무가 없습니다. 셋째, 종합과세 회피 목적으로도 사용할 수 있어 절세 포트폴리오의 핵심 자산으로 활용됩니다.
                </p>
                <p className="mt-4">
                  ⚠️ 다만 이 혜택은 시장 안에서 거래를 이어갈 때만 유지됩니다. 보관기관에 예치된 금을 실물 골드바로 인출하는 순간 조세특례제한법 §126의7과 부가가치세법 §9의 결합 효과로 부가세 10%가 새로 부과됩니다. 실물 반출은 신중하게 결정해야 합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">골드바를 사면 부가세 10%가 붙나요?</h2>
                <p>
                  네, 붙습니다. 은행 창구, 금은방, 백화점 어디에서 사든 실물 골드바는 부가가치세법 §9가 규정한 재화의 공급에 해당하기 때문에 매매 대금에 부가세 10%가 포함되어 결제됩니다. 여기에 세공비, 브랜드 프리미엄, 유통 마진이 얹혀 국제 금시세보다 통상 12~18% 비싼 가격에 매입하는 셈입니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례. 1kg 골드바 매입 손익분기 시뮬레이션</p>
                  <p className="text-sm text-text-secondary">
                    · 국제 금 시세 기준 원가: 1억원 가정
                    <br />
                    · 부가가치세 10%: 1,000만원
                    <br />
                    · 세공비·유통 마진 약 5%: 500만원
                    <br />
                    · 실제 매입 가격: <strong>약 1억 1,500만원</strong>
                    <br />
                    · 매도 시 시세가 원가 대비 15% 상승한 1억 1,500만원이 되어야 손익분기
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 매매차익 자체는 비과세지만, 초기 부대비용 15% 안팎을 회수하기 전까지는 실질 손실 구간.</span>
                  </p>
                </div>
                <p className="mt-4">
                  한편 매도 단계에서는 별도의 세금이 없습니다. 실물 골드바 매매차익은 소득세법이 열거한 과세 대상에 없어 KRX 금시장 차익과 마찬가지로 비과세입니다. 종합과세 대상도 아닙니다. 다만 이 비과세 혜택도 이미 매입 시 지불한 부가세와 부대비용을 상쇄할 만큼 시세가 오른 뒤에야 실감할 수 있습니다.
                </p>
                <p className="mt-4">
                  ⚠️ 다만 사업 목적으로 대량 매매하거나 반복적으로 매매하면 사업소득 또는 기타소득으로 재분류될 수 있습니다. 단순 개인 재산 보유 목적을 넘어서면 국세기본법 §14의 실질과세 원칙에 따라 별도 판단이 이루어질 수 있으니 유의하세요.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">금통장(골드뱅킹) 세금은?</h2>
                <p>
                  금통장 매매차익은 배당소득세 15.4%(소득세, 지방소득세 포함)가 원천징수됩니다. 금통장은 은행이 국제 금 시세에 연동한 파생결합 성격의 계좌 잔고를 그램 단위로 사고파는 상품이라, 이익이 실물 금 매매차익이 아닌 소득세법 §17이 규정한 배당소득에 준하는 것으로 취급됩니다.
                </p>
                <p>
                  부가세는 없어 매수 시점의 부담은 골드바보다 훨씬 가볍습니다. 은행 앱에서 100원 단위로도 매수할 수 있고 자동 이체 적립도 가능해 소액 분할 투자에는 최적입니다. 다만 은행 매수·매도 스프레드가 시세 대비 통상 3~5% 붙기 때문에 완전히 무비용은 아닙니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례. 금통장 500만원 매수 후 700만원 매도</p>
                  <p className="text-sm text-text-secondary">
                    · 매수액: 500만원 (스프레드 3% 포함해 실제 확보 잔고는 시세 기준 약 485만원 상당)
                    <br />
                    · 매도액: 700만원
                    <br />
                    · 매매차익 과세표준: 200만원
                    <br />
                    · 배당소득세 15.4% 원천징수: <strong>약 30만 8천원</strong>
                    <br />
                    · 실수령 차익: 약 169만 2천원
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 금액이 크지 않아도 매도 시점에 은행이 자동으로 15.4%를 원천징수해 국세청에 납부.</span>
                  </p>
                </div>
                <p className="mt-4">
                  ⚠️ 다만 이자·배당 소득이 이미 있는 경우 문제가 커질 수 있습니다. 금통장 차익은 배당소득이라 다른 이자·배당과 합산해 연 2천만원을 초과하면 금융소득종합과세에 편입됩니다. 종합소득 최고 세율은 지방세 포함 49.5%까지 오르므로 고소득자는 KRX 금시장이나 해외 금 ETF로 우회하는 것이 유리할 수 있습니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">금 ETF 세금은 어떻게 되나요?</h2>
                <p>
                  국내 상장 금현물 ETF는 매매차익에 배당소득세 15.4%가 원천징수되고 금융소득종합과세 대상에 포함됩니다. 한국거래소에 상장된 국내 원화 표시 금 ETF, 국내 금 선물 ETF 대부분이 이 방식으로 과세됩니다. 소득세법 §17의 배당소득 규정을 준용해 증권사가 매도 결제 시점에 자동 원천징수합니다.
                </p>
                <p>
                  반면 해외 증권거래소에 상장된 금 ETF는 양도소득세 22%(지방소득세 포함)가 부과되며, 연 250만원 기본공제 후 초과분에 대해 다음 해 5월 자진 신고합니다. 대신 분류과세이기 때문에 아무리 이익이 커도 금융소득종합과세 대상에 포함되지 않아 종합소득 세율을 끌어올리지 않습니다. 이 점이 고소득자에게 결정적인 장점입니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 국내 상장 금 ETF vs 해외 상장 금 ETF 과세 비교(2026 기준)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">구분</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">국내 상장 금 ETF</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">해외 상장 금 ETF</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">매매차익 세율</td>
                        <td className="p-3">15.4% (배당소득세)</td>
                        <td className="p-3">22% (양도소득세)</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">기본공제</td>
                        <td className="p-3">없음</td>
                        <td className="p-3">연 250만원</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">신고 방식</td>
                        <td className="p-3">증권사 원천징수</td>
                        <td className="p-3">다음 해 5월 자진 신고</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">금융소득종합과세</td>
                        <td className="p-3">포함(2천만원 초과 시)</td>
                        <td className="p-3">제외(분류과세)</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">환율 변동</td>
                        <td className="p-3">해당 없음</td>
                        <td className="p-3">달러 표시라 환율 위험 존재</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  ⚠️ 다만 해외 금 ETF는 환율 변동을 그대로 떠안습니다. 금 시세가 올라도 원달러가 크게 떨어지면 원화 기준 수익이 줄어들 수 있습니다. 또한 5월 자진 신고를 누락하면 무신고 가산세와 납부 지연 이자가 붙으니 매년 신고 일정을 챙겨야 합니다.
                </p>
              </section>

              <AdSlot slot="guide-gold-investment-tax-2026-mid" format="rectangle" />

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">네 가지 방식 세금·비용 비교</h2>
                <p>
                  앞서 살펴본 4가지 방식을 한 표로 비교하면 각 방식의 장단점이 뚜렷하게 드러납니다. 부가세, 매매차익 과세, 금융소득종합과세 여부, 실물 보유 가능성이라는 네 가지 축이 판단 기준입니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 2. 금 투자 4가지 방식 종합 비교(조세특례제한법 §126의7, 부가가치세법 §9, 소득세법 §17)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">방식</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">부가세</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">매매차익세</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">종합과세</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">실물</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3"><strong>KRX 금현물시장</strong></td>
                        <td className="p-3">면제</td>
                        <td className="p-3">비과세</td>
                        <td className="p-3">제외</td>
                        <td className="p-3">인출 시 부가세 10%</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3"><strong>실물 골드바</strong></td>
                        <td className="p-3">10% + 세공비</td>
                        <td className="p-3">비과세</td>
                        <td className="p-3">제외</td>
                        <td className="p-3">가능</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3"><strong>금통장</strong></td>
                        <td className="p-3">없음</td>
                        <td className="p-3">15.4%</td>
                        <td className="p-3">포함</td>
                        <td className="p-3">불가</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3"><strong>국내 금 ETF</strong></td>
                        <td className="p-3">없음</td>
                        <td className="p-3">15.4%</td>
                        <td className="p-3">포함</td>
                        <td className="p-3">불가</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3"><strong>해외 금 ETF</strong></td>
                        <td className="p-3">없음</td>
                        <td className="p-3">22% (공제 250만원)</td>
                        <td className="p-3">제외</td>
                        <td className="p-3">불가</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  종합 관점의 결론은 세 가지로 정리할 수 있습니다. 순수 세금 효율만 보면 KRX 금현물시장이 압도적으로 우세합니다. 실물 소유 필요성이 있다면 골드바이지만 초기 비용 15% 안팎을 감안해야 합니다. 소액 분할 매수 편의를 원하면 금통장, 매매 편의성과 분산 투자를 원하면 국내 또는 해외 금 ETF가 대안이 됩니다.
                </p>
                <p className="mt-4">
                  ⚠️ 다만 실제 선택은 세금 외에도 유동성, 매매 스프레드, 접근성, 실물 보관비 등을 함께 따져야 합니다. 한 방식만 고집하기보다 목적별로 나눠서 KRX와 금 ETF, 골드바를 병행하는 사례도 많습니다. 특정 상품 매수를 권유하는 정보가 아니라는 점을 기억해 주세요.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">금융소득종합과세 대상이 되나요?</h2>
                <p>
                  방식별로 종합과세 편입 여부가 크게 다릅니다. 결론부터 말하면 KRX 금현물시장 차익, 실물 골드바 차익, 해외 상장 금 ETF 양도차익은 종합과세 대상이 아니고, 금통장 차익과 국내 상장 금 ETF 매매차익만 종합과세 대상입니다.
                </p>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li>
                    <strong>KRX 금현물시장 매매차익:</strong> 소득세법 열거주의상 과세 대상 자체가 아니므로 종합과세와 무관합니다. 이자·배당이 이미 연 2천만원을 넘긴 고소득자에게 가장 유리한 창구입니다.
                  </li>
                  <li>
                    <strong>실물 골드바 차익:</strong> 개인의 재산 매매로 취급되어 별도 과세 대상이 아니며 종합과세에도 포함되지 않습니다. 다만 반복적 매매는 실질과세 원칙으로 재분류될 수 있습니다.
                  </li>
                  <li>
                    <strong>금통장 매매차익:</strong> 소득세법 §17의 배당소득으로 다른 이자·배당과 합산해 연 2천만원을 초과하면 종합과세 대상에 편입됩니다.
                  </li>
                  <li>
                    <strong>국내 상장 금 ETF 이익:</strong> 마찬가지로 배당소득으로 잡혀 연 2천만원 기준을 넘기면 종합과세 됩니다. 원천징수 15.4%가 최종세율이 아니라 미리 낸 세금 성격이 됩니다.
                  </li>
                  <li>
                    <strong>해외 상장 금 ETF 양도차익:</strong> 양도소득세로 분류과세되므로 이익 규모와 상관없이 종합과세 대상이 아닙니다. 다만 매년 5월 자진 신고 의무가 있습니다.
                  </li>
                </ul>
                <p className="mt-4">
                  ⚠️ 다만 종합과세 여부 판단은 다른 금융소득 규모와 소득 구성에 따라 크게 달라집니다. 고소득 근로자, 사업소득자, 부동산 임대소득자는 종합소득세 최고 세율 구간과 맞물릴 위험이 있으므로 세무사와 상담 후 방식을 결정하는 것이 안전합니다.
                </p>
              </section>

              <h2 className="text-2xl font-bold mb-6">자주 묻는 질문</h2>
              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h3 className="text-lg font-semibold text-text-primary">관련 계산기 및 가이드</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link
                    href="/calculator/exchange/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">환율 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">해외 상장 금 ETF 매매·정산 시 원달러 환산을 확인하세요.</p>
                  </Link>
                  <Link
                    href="/guide/etf-tax-domestic-overseas-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">국내·해외 ETF 세금 비교</div>
                    <p className="mt-1 text-sm text-text-secondary">배당소득세 15.4%와 양도소득세 22%가 갈리는 기준을 정리했습니다.</p>
                  </Link>
                  <Link
                    href="/guide/dividend-income-tax-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">배당소득세 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">금통장과 국내 금ETF 이익에 붙는 15.4%의 정확한 구조를 이해하세요.</p>
                  </Link>
                  <Link
                    href="/guide/financial-income-comprehensive-vs-separate-taxation/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">금융소득종합과세 vs 분리과세</div>
                    <p className="mt-1 text-sm text-text-secondary">연 2천만원 초과 시 세율이 어떻게 뛰어오르는지 시나리오로 비교합니다.</p>
                  </Link>
                  <Link
                    href="/guide/isa-account-tax-benefit-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">ISA 계좌 세제혜택</div>
                    <p className="mt-1 text-sm text-text-secondary">금 관련 ETF를 ISA에 담을 때 얻는 세제 이점과 한도.</p>
                  </Link>
                  <Link
                    href="/category/finance/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">모든 금융 가이드</div>
                    <p className="mt-1 text-sm text-text-secondary">예금·적금·대출·환율·투자 가이드를 한 페이지에서.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 교육 및 정보 제공 목적으로 작성되었으며 특정 상품 매수를 권유하지 않습니다. 개인 맞춤형 세무 조언이 아니므로 실제 매입·매도 전에는 반드시 세무사, 관할 세무서, 국세청 상담 창구를 통해 개별 상황을 확인하시기 바랍니다. 특히 금통장이나 해외 상장 금 ETF는 다른 금융소득과 합산해 금융소득종합과세 여부가 달라질 수 있으므로 개인 소득 구조를 함께 검토해야 합니다. 본 콘텐츠는 2026-07-20을 기준으로 작성되었으며, 관련 법령이 개정되면 즉시 업데이트됩니다. 인용한 법조항은 <strong>조세특례제한법 §126의7(금 관련 조세특례), 부가가치세법 §9(재화의 공급), 소득세법 §17(배당소득)</strong>입니다. AI 보조 작성 후 운영자 검수 완료.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터</a>,{' '}
                  <a href="https://www.krx.co.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">한국거래소 KRX</a>,{' '}
                  <a href="https://www.nts.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">국세청</a>.
                </p>
              </section>

              <ShareButtons
                title="금 투자 세금 2026 가이드"
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
