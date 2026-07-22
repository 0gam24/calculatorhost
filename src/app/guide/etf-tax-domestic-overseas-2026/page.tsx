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

const URL = 'https://calculatorhost.com/guide/etf-tax-domestic-overseas-2026/';
const DATE_PUBLISHED = '2026-07-11';
const DATE_MODIFIED = '2026-07-11';

export const metadata: Metadata = {
  title: 'ETF 세금 2026, 국내 vs 해외상장 매매차익·분배금 과세 비교',
  description:
    'ETF 투자 세금의 모든 것. 국내상장 주식형·기타 ETF의 배당소득세 15.4%, 해외상장 ETF의 양도소득세 22% 구조 차이. 금융소득 2000만원 종합과세 기준.',
  keywords: [
    'ETF 세금',
    'ETF 과세',
    '국내 vs 해외 ETF 세금',
    '배당소득세',
    '양도소득세',
    'ETF 매매차익',
    '금융소득 종합과세',
    '소득세법 17조',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: 'ETF 세금 2026, 국내 vs 해외상장 매매차익·분배금 과세 비교' }],
    title: 'ETF 세금 2026, 국내 vs 해외상장 매매차익·분배금 과세 비교',
    description: 'ETF 투자 세금의 모든 것. 국내상장 주식형·기타 ETF의 배당소득세 15.4%, 해외상장 ETF의 양도소득세 22% 차이.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ETF 세금 2026, 국내 vs 해외상장 매매차익·분배금 과세 비교',
    description: 'ETF 투자 세금 완벽 가이드. 국내 vs 해외 상장 ETF의 세금 구조와 실제 세액 계산법.',
  },
};

const FAQ_ITEMS = [
  {
    question: 'ETF 투자 수익에는 어떤 세금이 붙나요?',
    answer:
      'ETF 수익은 매매차익과 분배금(배당)으로 나뉘며, 각각 다른 세금이 붙습니다(소득세법 §17·§94). 국내상장 국내주식형 ETF는 매매차익 비과세, 분배금 배당소득세 15.4%입니다. 국내상장 기타 ETF(채권형·해외지수형 등)와 해외상장 ETF는 다른 과세 방식이 적용됩니다.',
  },
  {
    question: '국내상장 국내주식형 ETF의 매매차익이 정말 비과세인가요?',
    answer:
      '네, 국내 주식 지수를 추종하는 국내상장 ETF의 매매차익은 비과세입니다(소득세법 §94 양도소득 과세대상에 해당하지 않음). 다만 분배금(연배당)은 배당소득으로 처리되어 15.4% 세금을 납부해야 합니다. ISA 계좌나 IRP 같은 세제 혜택 계좌에서 거래하면 분배금도 비과세됩니다.',
  },
  {
    question: '국내상장 기타 ETF(채권형, 해외지수형)는 매매차익도 과세되나요?',
    answer:
      '네, 국내상장이라도 국내주식형이 아닌 ETF(채권형, 해외지수형, 파생형 등)는 매매차익도 배당소득 과세 대상입니다(소득세법 §17). 정확히는 보유 기간 중 과표기준가 증가분에 배당소득세 15.4%가 붙습니다.',
  },
  {
    question: '해외상장 ETF(미국 ETF 등)의 세금이 가장 높은가요?',
    answer:
      '해외상장 ETF의 매매차익은 양도소득세 22%가 적용되며(소득세법 §118의2), 이는 국내상장 기타 ETF의 배당소득세 15.4%보다 높습니다. 분배금(배당)도 배당소득세 15.4%를 납부해야 하는데, 현지 원천징수가 먼저 이루어진 후 조정됩니다.',
  },
  {
    question: '금융소득 2000만원 초과 시 종합과세가 뭔가요?',
    answer:
      '이자와 배당소득의 합계가 연 2000만원을 초과하면 초과분을 종합소득에 포함하여 더 높은 누진세율로 과세됩니다(소득세법 §14③). 예를 들어 배당 2500만원이면 500만원이 종합과세되어 35~45% 세율이 적용될 수 있습니다. 다만 해외상장 ETF 양도소득은 분류과세(종합과세 대상 제외)입니다.',
  },
  {
    question: 'ISA나 연금계좌 안의 ETF는 비과세인가요?',
    answer:
      '네, ISA(개인종합자산관리계좌)와 IRP(개인퇴직계좌) 같은 세제 혜택 계좌 내 ETF 수익은 비과세이거나 저과세됩니다. ISA는 계좌당 연 400~500만원까지 이익이 비과세이고, IRP는 퇴직금처럼 연금 목적으로만 인출 시 분리과세(3.3~5.5%)입니다.',
  },
  {
    question: '국내상장 해외지수 추종 ETF와 미국 상장 ETF는 무엇이 다른가요?',
    answer:
      '국내상장 해외지수 ETF(예: 해외주식형)는 보유 기간 중 배당소득세 15.4% 과세이고 매매차익도 배당소득으로 분류됩니다. 반면 미국 등에 직접 상장된 ETF는 매매차익이 양도소득세 22%, 분배금이 배당소득세 15.4%로 따로 적용됩니다. 세금 구조가 완전히 다릅니다.',
  },
  {
    question: '2026년 ETF 세금이 바뀐 게 있나요?',
    answer:
      '2026년 기준으로 ETF 세금의 기본 구조는 2025년과 동일합니다. 국내상장 국내주식형 매매차익 비과세, 배당소득세 15.4%, 금융소득 2000만원 종합과세 한도 등이 유지 중입니다. 다만 세법 개정 시 변경될 수 있으므로, 최신 정보는 국세청 공식 사이트에서 확인하세요.',
  },
];

export default function EtfTaxDomesticOverseas2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: 'ETF 세금 2026, 국내 vs 해외상장' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: 'ETF 세금 2026, 국내 vs 해외상장 매매차익·분배금 과세 비교',
    description:
      'ETF 투자 세금 완벽 가이드. 국내상장 주식형·기타·해외상장 ETF의 과세 구조, 배당소득세 15.4% vs 양도소득세 22%, 금융소득 종합과세 조건까지 정확히 정리.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['ETF', '세금', '과세', '배당소득', '양도소득'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: 'ETF 세금 2026, 국내 vs 해외상장 매매차익·분배금 과세 비교',
    description:
      'ETF 투자 세금의 완전한 이해. 국내상장과 해외상장 ETF의 세금 차이, 계산법, 절세 팁.',
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
                    { name: 'ETF 세금 2026, 국내 vs 해외상장' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">주식 투자자 · 10분 읽기 · 2026-07-11</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  ETF 세금 2026
                  <br />
                  <span className="text-2xl text-text-secondary">국내 vs 해외상장 매매차익·분배금 과세 비교</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  ETF는 간편한 분산 투자 수단으로 인기이지만, 세금 구조는 종류마다 크게 다릅니다. 국내상장 국내주식형 ETF는 매매차익이 비과세인 반면, 국내상장 기타 ETF와 해외상장 ETF는 다른 방식으로 과세됩니다. 이 가이드는 ETF 종류별 과세 기준, 배당소득세와 양도소득세의 차이, 그리고 실제 세액 계산법까지 완벽하게 정리해드립니다.
                </p>
              </header>

              <AdSlot slot="guide-etf-tax-domestic-overseas-top" format="horizontal" />

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">ETF 세금의 기본 원리</h2>
                <p>
                  ETF 투자 수익은 두 가지로 나뉩니다. 하나는 매매차익(사고팔 때 발생), 다른 하나는 분배금(주기적 배당)입니다(소득세법 §17·§94). 국내상장과 해외상장, 그리고 ETF의 종류(국내주식형·채권형·해외지수형 등)에 따라 세금 처리가 완전히 달라집니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">ETF 세금의 세 가지 핵심</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    첫째, 국내상장 국내주식형 ETF는 매매차익 비과세, 분배금만 배당소득세 15.4% 과세입니다.
                    <br />
                    둘째, 국내상장 기타 ETF(채권형, 해외지수형 등)는 매매차익도 배당소득으로 분류되어 15.4% 과세됩니다.
                    <br />
                    셋째, 해외상장 ETF의 매매차익은 양도소득세 22%, 분배금은 배당소득세 15.4%로 분리 적용됩니다.
                  </p>
                </div>
                <p className="mt-4">
                  또한 이자와 배당금의 합계가 연 2000만원을 초과하면 초과분이 종합소득에 포함되어 더 높은 세율이 적용될 수 있습니다(소득세법 §14③). 이를 "금융소득 종합과세"라고 부릅니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">ETF 종류별 과세 기준</h2>
                <p>
                  ETF의 과세 방식은 국내·해외 상장 여부와 추종 대상에 따라 결정됩니다. 같은 지수를 추종하는 ETF라도 상장된 국가에 따라 세금이 달라질 수 있습니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. ETF 종류별 과세 비교 (소득세법 §17·§94·§118의2 기준)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">ETF 유형</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">매매차익</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">분배금·배당</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3"><strong>국내상장 국내주식형</strong></td>
                        <td className="p-3"><strong>비과세</strong></td>
                        <td className="p-3"><strong>배당소득세 15.4%</strong></td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3"><strong>국내상장 채권형·해외지수형·파생형</strong></td>
                        <td className="p-3"><strong>배당소득세 15.4%</strong></td>
                        <td className="p-3"><strong>배당소득세 15.4%</strong></td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3"><strong>해외상장 ETF(미국, 싱가포르 등)</strong></td>
                        <td className="p-3"><strong>양도소득세 22%</strong></td>
                        <td className="p-3"><strong>배당소득세 15.4%</strong></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  다만 배당소득세 15.4%는 10% 국세 + 2.6% 지방소득세 + 2.8% 농어촌특별세의 합계입니다. 현지 원천징수가 있는 해외상장 ETF는 추가로 환율 변동과 외국 납부세액공제를 고려해야 합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">실제 세액 계산 사례</h2>
                <p>
                  다음 세 가지 사례를 통해 각 ETF 유형별 실제 세액이 어떻게 계산되는지 살펴보겠습니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 1. 국내상장 국내주식형 ETF 차익 500만원</p>
                  <p className="text-sm text-text-secondary">
                    · 매매차익: 500만원
                    <br />
                    · 매매차익 세금: <strong>0원</strong> (비과세, 소득세법 §94 양도소득 과세대상 아님)
                    <br />
                    · 배당 수령: 연 50만원
                    <br />
                    · 배당소득세: 50만원 × 15.4% = <strong>7.7만원</strong>
                    <br />
                    · 실제 배당 수령액: 50만원 - 7.7만원 = <strong>42.3만원</strong>
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 매매 차익에 대한 세금이 없어 가장 유리한 구조.</span>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 2. 국내상장 해외지수형 ETF 차익 1000만원</p>
                  <p className="text-sm text-text-secondary">
                    · 매매 차익: 1000만원
                    <br />
                    · 보유기간 중 배당소득세: 1000만원 × 15.4% = <strong>154만원</strong> (배당소득 분류)
                    <br />
                    · 분배금 연 100만원
                    <br />
                    · 분배금 배당소득세: 100만원 × 15.4% = <strong>15.4만원</strong>
                    <br />
                    · 총 세액: 154만원 + 15.4만원 = <strong>169.4만원</strong>
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 국내주식형과 달리 차익도 과세되어 세 부담이 높음.</span>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 3. 해외상장 ETF(미국) 차익 1000만원</p>
                  <p className="text-sm text-text-secondary">
                    · 매매 차익: 1000만원
                    <br />
                    · 양도소득세(기본공제 250만원 차감): (1000만 - 250만) × 22% = <strong>165만원</strong>
                    <br />
                    · 분배금 연 80만원
                    <br />
                    · 배당소득세(현지 원천징수 15% 선입금): 80만원 × 15.4% = <strong>12.32만원</strong>
                    <br />
                    · 총 세액: 165만원 + 12.32만원 = <strong>177.32만원</strong>
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 차익이 가장 높게 과세되지만 기본공제 250만원이 있어 부분 완화.</span>
                  </p>
                </div>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">금융소득 2000만원 종합과세</h2>
                <p>
                  개인이 1년간 얻은 이자·배당소득의 합계가 2000만원을 초과하면, 초과분이 종합소득에 포함되어 더 높은 누진세율로 과세됩니다(소득세법 §14③). 이는 특히 배당금을 많이 받는 투자자에게 중요한 기준입니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">금융소득 종합과세 예시</p>
                  <p className="text-sm text-text-secondary">
                    · 국내 적금 이자: 300만원
                    <br />
                    · 국내 배당: 800만원
                    <br />
                    · 국내 ETF 분배금: 1000만원
                    <br />
                    · 해외 ETF 분배금: 500만원
                    <br />
                    · 총 금융소득: 2600만원
                    <br />
                    · 종합과세 대상: 2600만원 - 2000만원 = <strong>600만원</strong>
                    <br />
                    · 초과분 세율: 종합소득에 포함되어 누진세율(24~45%) 적용
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 600만원이 기본 15.4% 대신 더 높은 세율로 과세될 수 있음. 다만 해외상장 ETF 양도소득은 분류과세(종합 대상 제외).</span>
                  </p>
                </div>
                <p className="mt-4">
                  다만 주의할 점은 해외상장 ETF의 양도소득입니다. 양도소득은 분류과세(따로 분리 과세)이므로 2000만원 한도에 포함되지 않습니다. 예를 들어 해외 ETF 양도소득 1000만원은 별도로 22% 양도소득세를 내면서, 동시에 배당 소득만으로 2000만원을 초과하면 그 초과분을 종합과세하는 식입니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">ISA, 연금계좌 같은 세제 혜택 계좌</h2>
                <p>
                  ETF를 세제 혜택 계좌에서 거래하면 세금을 크게 줄일 수 있습니다. ISA와 연금계좌의 세금 혜택은 다릅니다.
                </p>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li>
                    <strong>ISA(개인종합자산관리계좌):</strong> 계좌당 연 400~500만원(청년은 600만원)까지의 수익이 비과세입니다. 이 한도 이내라면 ETF 차익과 배당금 모두 비과세이므로 가장 효율적입니다. 다만 매년 이용 한도가 정해져 있고, 가입 및 인출 시기에 제약이 있습니다.
                  </li>
                  <li>
                    <strong>IRP(개인퇴직계좌):</strong> 자유롭게 운용할 수 있는 계좌이나, 인출 시점에 따라 세금이 결정됩니다. 퇴직금처럼 일시금으로 인출하면 3.3~5.5% 분리과세이고, 연금 수령(5년 이상)하면 비과세됩니다. ETF 수익이 얼마가 되든 계좌 내에서는 비과세이므로 장기 투자에 유리합니다.
                  </li>
                </ul>
                <p className="mt-4">
                  다만 ISA는 주식·펀드·신탁 등 여러 자산군을 섞어 운용해야 하고, 해외주식·해외 ETF는 ISA 대상에 포함되지 않을 수 있으므로 사전 확인이 필요합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">국내상장 해외지수 ETF vs 해외상장 ETF 차이</h2>
                <p>
                  같은 미국 지수를 추종하는 ETF라도 국내에 상장된 것과 미국에 상장된 것은 세금이 완전히 다릅니다. 이를 혼동하면 예상과 다른 세금 부담이 발생할 수 있습니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 2. 국내상장 해외지수 vs 해외상장 ETF 비교</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">항목</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">국내상장 미국지수 ETF</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">미국 상장 ETF</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3"><strong>거래 장소</strong></td>
                        <td className="p-3">한국 거래소</td>
                        <td className="p-3">뉴욕증권거래소(NYSE)</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3"><strong>매매차익 과세</strong></td>
                        <td className="p-3">배당소득세 15.4%</td>
                        <td className="p-3">양도소득세 22% (기본공제 250만원)</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3"><strong>분배금 과세</strong></td>
                        <td className="p-3">배당소득세 15.4%</td>
                        <td className="p-3">배당소득세 15.4% (현지 원천징수 후)</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3"><strong>금융소득 2000만원 적용</strong></td>
                        <td className="p-3">배당만 포함</td>
                        <td className="p-3">배당만 포함 (양도소득 제외)</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3"><strong>거래 난이도</strong></td>
                        <td className="p-3">한국 증권사에서 간단히 거래</td>
                        <td className="p-3">해외 거래 절차, 환전 필요</td>
                      </tr>
                      <tr>
                        <td className="p-3"><strong>세금 효율성</strong></td>
                        <td className="p-3">중간 수준 (15.4%)</td>
                        <td className="p-3">낮음 (22%) 하지만 기본공제로 일부 완화</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  다만 해외상장 ETF의 양도소득세 22%는 기본공제 250만원이 있으므로 1000만원 차익이면 실제 과세표준은 750만원입니다. 국내상장 해외지수 ETF의 15.4%는 기본공제가 없으므로 상황에 따라 둘의 실효세율이 비슷할 수 있습니다.
                </p>
              </section>

              <AdSlot slot="guide-etf-tax-domestic-overseas-mid" format="rectangle" />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h2 className="text-2xl font-bold">ETF 투자 시 세금 절감 전략</h2>
                <p>
                  같은 수익을 올리더라도 세금을 고려한 계획으로 실제 수익을 크게 늘릴 수 있습니다.
                </p>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li>
                    <strong>국내주식형 ETF 우선 고려:</strong> 비과세인 국내상장 국내주식형 ETF는 매매차익 관점에서 가장 유리합니다. 분산 투자 목표라면 국내주식형을 주축으로 구성하는 것이 효율적입니다.
                  </li>
                  <li>
                    <strong>ISA·IRP 최대 활용:</strong> ETF 수익이 많을 것으로 예상되면 ISA(연 400~500만원 비과세 한도)나 IRP(계좌 내 비과세)를 우선 활용하세요. 특히 IRP는 인출 시기를 조절하면 연금 수령 시 비과세 혜택을 받을 수 있습니다.
                  </li>
                  <li>
                    <strong>배당금 타이밍 고려:</strong> 금융소득이 2000만원에 가까우면, 배당금 수령 시점을 연도 말로 미루거나 앞당기는 방식으로 세 부담을 조절할 수 있습니다.
                  </li>
                  <li>
                    <strong>손실 인정 활용:</strong> 개별 주식(공매도 아님)에서 손실이 나면 배당소득과 상계할 수 있습니다. 배당금 150만원 + 주식 손실 50만원이면 순 100만원만 배당소득 과세됩니다(소득세법 §17).
                  </li>
                  <li>
                    <strong>기본공제 확인 후 해외 ETF 거래:</strong> 해외상장 ETF의 양도소득은 기본공제 250만원이 있습니다. 연간 차익이 250만원 이하면 과세 대상 자체가 없으므로 전략적으로 활용할 수 있습니다.
                  </li>
                </ul>
                <p className="mt-4">
                  다만 절세 목적으로 인위적 거래를 반복하면 국세청이 "실질과세 원칙"(국세기본법 §14)을 적용하여 거래를 인정하지 않을 수 있습니다. 정당한 투자 목적 하에서만 절세 전략을 사용하세요.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">환율 변동이 세금에 미치는 영향</h2>
                <p>
                  해외상장 ETF를 거래할 때는 환율도 고려해야 합니다. 환율 변동으로 인한 환차익도 세금 대상이 될 수 있습니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">해외 ETF 환차익 과세 예시</p>
                  <p className="text-sm text-text-secondary">
                    · 미국 ETF 매입 가격: 100달러 (당시 환율 1200원, 12만원)
                    <br />
                    · 미국 ETF 매도 가격: 120달러 (당시 환율 1300원, 15.6만원)
                    <br />
                    · ETF 가격 상승: 120달러 - 100달러 = 20달러
                    <br />
                    · 환율 상승: 1300원 - 1200원 = 100원
                    <br />
                    · 총 차익: 15.6만원 - 12만원 = 3.6만원
                    <br />
                    · 양도소득세(기본공제 250만원 이하면 비과세): <strong>0원</strong>
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 환차익도 포함한 총 매매차익이 기본공제 대상입니다.</span>
                  </p>
                </div>
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
                    <p className="mt-1 text-sm text-text-secondary">주식·부동산 매매차익의 양도소득세를 직접 계산해보세요.</p>
                  </Link>
                  <Link
                    href="/guide/dividend-income-tax-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">배당소득세 2026 완벽 가이드</div>
                    <p className="mt-1 text-sm text-text-secondary">배당금, 분배금, 이자에 붙는 세금의 모든 것.</p>
                  </Link>
                  <Link
                    href="/guide/financial-income-comprehensive-vs-separate-taxation/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">금융소득 종합과세 vs 분리과세</div>
                    <p className="mt-1 text-sm text-text-secondary">2000만원 기준, 언제 높은 세율이 적용될까?</p>
                  </Link>
                  <Link
                    href="/guide/isa-account-tax-benefit-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">ISA 계좌 세금 혜택 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">투자 수익 비과세, ISA 한도와 활용법.</p>
                  </Link>
                  <Link
                    href="/guide/overseas-stock-capital-gains-tax-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">해외 주식 양도소득세 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">미국, 일본, 싱가포르 주식 거래의 세금 처리.</p>
                  </Link>
                  <Link
                    href="/category/finance/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">모든 금융 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">대출, 이자, 환율, 적금 계산기 모음.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 교육 목적으로 작성되었으며, 개인 맞춤형 세무 조언이 아닙니다. ETF 투자 세금은 개인의 소득 상황, 보유 기간, 거래소, 계좌 유형에 따라 달라집니다. 실제 세금 계산은 반드시 국세청 공식 사이트 또는 세무사·회계사와 상담하세요. 본 콘텐츠는 2026-07-11을 기준으로 작성되었으며, 세법 개정 시 즉시 업데이트됩니다. 정확한 기준은 <strong>소득세법 §14③ (금융소득 종합과세)</strong>, <strong>소득세법 §17 (배당소득)</strong>, <strong>소득세법 §94 (양도소득)</strong>, <strong>소득세법 §118의2 (국외자산 양도소득)</strong>를 따릅니다. AI 보조 작성 후 운영자 검수 완료.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터</a>,{' '}
                  <a href="https://www.nts.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">국세청 국세일반정보</a>,{' '}
                  <a href="https://www.kofia.or.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">금융투자협회 ETF 교육자료</a>.
                </p>
              </section>

              <ShareButtons
                title="ETF 세금 2026, 국내 vs 해외상장 매매차익·분배금 과세 비교 가이드"
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
