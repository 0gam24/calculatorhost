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

const URL = 'https://calculatorhost.com/guide/foreign-currency-deposit-tax-2026/';
const DATE_PUBLISHED = '2026-08-15';
const DATE_MODIFIED = '2026-08-15';

export const metadata: Metadata = {
  title: '달러예금 세금 2026, 이자 15.4%와 환차익 과세 정리 | calculatorhost',
  description:
    '달러예금 이자는 15.4% 원천징수되고, 개인의 환차익은 원칙적으로 비과세입니다. 연 2,000만원 초과 시 금융소득종합과세로 합산되며, 원화 환산 1억원까지 예금자보호됩니다.',
  keywords: [
    '달러예금 세금',
    '외화예금 세금',
    '환차익 세금',
    '달러예금 이자 세금',
    '금융소득종합과세 2000만원',
    '소득세법 16조',
    '외화예금 예금자보호',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '달러예금 세금 2026, 이자 15.4%와 환차익 과세 정리' }],
    title: '달러예금 세금 2026, 이자 15.4%와 환차익 과세 정리',
    description: '달러예금 이자는 15.4% 원천징수, 개인 환차익은 원칙적 비과세. 금융소득종합과세 기준과 외화예금 예금자보호 한도까지 한 번에 정리.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '달러예금 세금 2026, 이자 15.4%와 환차익 과세 정리',
    description: '외화예금 이자는 15.4% 원천징수, 개인 환차익은 원칙적 비과세. 소득세법 §16·§129·§14③, 예금자보호법 기준.',
  },
};

const FAQ_ITEMS = [
  {
    question: '달러예금 이자에는 세금이 얼마 붙나요?',
    answer:
      '이자에 총 15.4%의 세금이 원천징수됩니다. 소득세 14%(소득세법 §129)와 지방소득세 1.4%가 합쳐진 금액으로, 원화예금과 세율은 동일합니다. 이자는 소득세법 §16의 이자소득에 해당하며, 은행이 지급 시점의 환율로 원화 환산해 세금을 떼고 남은 금액을 계좌에 입금합니다.',
  },
  {
    question: '환율이 올라 생긴 환차익도 세금을 내야 하나요?',
    answer:
      '개인이 재산 증식 목적으로 보유한 외화예금의 환차익은 원칙적으로 비과세입니다. 우리나라 소득세법은 열거주의를 채택하고 있어 법에 명시된 소득만 과세하는데, 개인의 단순한 외화예금 환차익은 열거된 과세소득에 포함되지 않기 때문입니다. 다만 외환매매를 사업적으로 하거나 파생결합상품, 외화 관련 금융투자상품은 별도 과세 규정이 적용될 수 있으므로 개별 상품마다 확인이 필요합니다.',
  },
  {
    question: '금융소득종합과세는 언제부터 대상이 되나요?',
    answer:
      '이자와 배당을 합친 금융소득이 연 2,000만원을 초과하면 초과분이 다른 종합소득과 합산되어 누진세율(6~45%)로 과세됩니다(소득세법 §14③). 2,000만원 이하이면 15.4% 원천징수로 납세 의무가 종결되므로 별도 신고가 필요하지 않습니다. 달러예금 이자만으로 2,000만원을 넘으려면 상당한 원금과 금리가 필요하지만, 다른 금융상품 이자·배당과 합산해 계산해야 하므로 매년 5월 종합소득세 신고 시점에 자신의 총 금융소득을 확인해두는 것이 좋습니다.',
  },
  {
    question: '외화예금도 예금자보호가 되나요?',
    answer:
      '네, 외화예금도 예금자보호법에 따라 원화로 환산한 금액 기준으로 1인당 원리금 합계 1억원까지 보호됩니다. 2025년 9월부터 예금자보호 한도가 기존 5,000만원에서 1억원으로 상향됐고, 외화예금 역시 동일 한도가 적용됩니다. 다만 CMA, 펀드, ELS, 외화 RP 같은 투자상품은 예금자보호 대상이 아니므로 상품 가입 전 반드시 예금자보호 여부를 확인해야 합니다.',
  },
  {
    question: '이자와 환차익 중 어떤 게 세금 면에서 유리한가요?',
    answer:
      '단순 세율만 비교하면 환차익이 유리합니다. 이자는 최소 15.4%가 원천징수되지만 개인의 환차익은 원칙적으로 비과세이기 때문입니다. 다만 환차익은 원금이 손실될 위험, 즉 환율이 반대로 움직여 원화 기준 원금이 줄어들 위험이 함께 있으므로 세금 유불리만으로 판단할 성격은 아닙니다. 예외로 사업 목적 외환매매나 파생결합상품은 다른 과세 규칙을 따르므로 상품 유형을 먼저 확인하세요.',
  },
  {
    question: '달러예금 세금은 따로 신고해야 하나요?',
    answer:
      '금융소득이 연 2,000만원 이하이면 은행이 원천징수로 세금을 마무리하므로 별도 신고가 필요하지 않습니다. 2,000만원을 초과한 해에는 매년 5월 종합소득세 신고 기간에 금융소득을 다른 소득과 합산해 신고해야 합니다. 홈택스에서 지급명세서를 조회하면 은행이 신고한 이자소득 내역을 확인할 수 있으며, 정확한 계산이 어렵다면 세무사나 홈택스 상담을 이용하는 것이 안전합니다.',
  },
  {
    question: '환차익이 5,000만원 넘게 났는데도 진짜 세금이 없나요?',
    answer:
      '개인이 재산 보유 목적으로 예치한 외화예금에서 발생한 환차익은 금액과 무관하게 원칙적으로 비과세입니다. 소득세법이 열거하지 않은 소득은 과세하지 않는 열거주의 원칙 때문입니다. 다만 국세청이 개별 사안을 실질과세 원칙에 따라 판단할 여지가 있으므로, 대규모 외환거래나 반복적 매매가 있는 경우에는 사업소득 또는 기타소득으로 재분류될 가능성을 세무 전문가와 상담해두는 것이 안전합니다.',
  },
  {
    question: '외화예금 이자를 달러로 받아도 세금을 원화로 뗄까요?',
    answer:
      '네, 은행은 이자 지급 시점의 매매기준율로 원화 환산한 금액을 기준으로 15.4%를 원천징수합니다. 실제 이자는 외화 그대로 계좌에 남지만, 세금 부분에 해당하는 원화 금액이 별도로 계산되어 원천징수됩니다. 원천징수 내역서에는 외화 이자와 환산 원화 금액, 원천징수 세액이 모두 표시되므로 5월 종합소득세 신고나 예금자보호 한도 계산에 활용할 수 있습니다.',
  },
];

export default function ForeignCurrencyDepositTax2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '달러예금 세금 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '달러예금 세금 2026, 이자 15.4%와 환차익 과세 정리',
    description:
      '외화예금 이자는 15.4% 원천징수, 개인의 환차익은 원칙적 비과세. 금융소득종합과세 2,000만원 기준과 원화 환산 1억원 예금자보호까지, 소득세법 §16·§129·§14③에 근거해 정리했습니다.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['달러예금 세금', '외화예금 세금', '환차익', '금융소득종합과세', '예금자보호'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '달러예금 세금 2026',
    description:
      '외화예금 이자 15.4% 원천징수, 개인 환차익 원칙적 비과세, 금융소득종합과세 2,000만원 기준을 정리한 가이드.',
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
                    { name: '달러예금 세금 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">예금 투자자 · 8분 읽기 · 2026-08-15</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  달러예금 세금 2026
                  <br />
                  <span className="text-2xl text-text-secondary">· 이자 15.4%와 환차익 과세 정리</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  환율이 오르내릴 때마다 달러예금 계좌를 열어두는 분들이 궁금해하는 질문은 크게 세 가지입니다. 이자에 세금이 얼마 붙는지, 환율이 올라 생긴 환차익도 세금을 내야 하는지, 그리고 규모가 커지면 종합과세 대상이 되는지입니다. 이 가이드는 개인이 보유한 외화예금을 기준으로 이자소득세 15.4%의 구조, 환차익 비과세 원칙, 금융소득종합과세 2,000만원 기준, 그리고 예금자보호 한도까지 소득세법과 예금자보호법 조문에 근거해 정리했습니다.
                </p>
              </header>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">달러예금 이자에는 세금이 얼마인가요?</h2>
                <p>
                  이자 지급액의 15.4%가 원천징수됩니다. 외화예금 이자는 소득세법 §16에서 정한 이자소득에 해당하며, 원화예금과 완전히 동일한 세율 구조로 과세됩니다. 세율은 소득세 14%(소득세법 §129)와 지방소득세 1.4%가 합쳐진 금액으로, 은행이 이자를 지급할 때 자동으로 떼고 남은 금액이 계좌에 입금됩니다.
                </p>
                <p>
                  은행은 이자를 달러로 지급하더라도 원천징수 계산은 지급 시점의 매매기준율로 원화 환산한 금액을 기준으로 진행합니다. 원천징수 내역서에는 외화 이자, 환산 원화, 원천징수 세액이 각각 표시되므로 5월 종합소득세 신고 시나 예금자보호 한도 계산에 그대로 활용할 수 있습니다.
                </p>
                <p>
                  다만, 개인이 아닌 법인이나 사업 목적의 외환매매는 이자소득이 아닌 다른 소득 유형으로 분류될 수 있고, 파생결합상품이나 외화 ELS 같은 투자상품은 별도 과세 규정을 따르므로 상품 유형을 먼저 확인해야 합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">환율이 올라 번 환차익도 세금을 내나요?</h2>
                <p>
                  개인이 보유한 외화예금의 환차익은 원칙적으로 비과세입니다. 우리나라 소득세법은 법에 열거된 소득만 과세하는 열거주의를 원칙으로 하는데, 개인이 재산 증식이나 보유 목적으로 예치한 외화예금에서 환율 상승으로 생긴 환차익은 이 열거된 과세소득에 포함되지 않기 때문입니다.
                </p>
                <p>
                  예를 들어 1달러당 1,300원에 예치한 1만 달러가 만기 시점에 환율이 1,400원으로 오르면 원화 기준 100만원의 환차익이 발생하는데, 이 부분에는 별도의 소득세가 부과되지 않습니다. 이자에 붙는 15.4%도 환차익에는 적용되지 않습니다.
                </p>
                <p>
                  예외: 외환매매를 사업적으로 반복하거나 파생결합상품, 외화 관련 금융투자상품에서 발생한 손익은 사업소득 또는 별도 금융투자소득 과세 규정이 적용될 수 있습니다. 또한 국세청이 실질과세 원칙에 따라 개별 사안을 재분류할 여지도 있으므로, 대규모 반복 거래가 있는 경우에는 세무 전문가와 상담해두는 것이 안전합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">세금은 어떻게 계산하나요?</h2>
                <p>
                  달러예금 세금 계산은 이자 부분에만 적용됩니다. 세율은 소득세 14%와 지방소득세 1.4%가 합쳐진 15.4%로 고정되어 있어, 이자 금액에 0.154를 곱하면 원천징수액이 나옵니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 외화예금 이자소득 세율 구성 (2026)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">구분</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">세율</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">근거</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">소득세</td>
                        <td className="p-3"><strong>14%</strong></td>
                        <td className="p-3">소득세법 §129 원천징수세율</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">지방소득세</td>
                        <td className="p-3"><strong>1.4%</strong></td>
                        <td className="p-3">소득세의 10%</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">합계 (원천징수)</td>
                        <td className="p-3"><strong>15.4%</strong></td>
                        <td className="p-3">소득세법 §16 이자소득</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 1. 1만 달러 예금, 연 4% 이자, 환율 1,350원</p>
                  <p className="text-sm text-text-secondary">
                    · 이자 발생액: 10,000 USD × 4% = 400 USD
                    <br />
                    · 원화 환산 이자: 400 USD × 1,350원 = 540,000원
                    <br />
                    · 원천징수 세액: 540,000원 × 15.4% = <strong>83,160원</strong>
                    <br />
                    · 실수령 이자(원화 기준): 540,000원 - 83,160원 = 456,840원
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 2. 5만 달러 예금, 환율 1,300원에서 1,400원으로 상승</p>
                  <p className="text-sm text-text-secondary">
                    · 예치 시점 원화 환산: 50,000 USD × 1,300원 = 65,000,000원
                    <br />
                    · 만기 시점 원화 환산: 50,000 USD × 1,400원 = 70,000,000원
                    <br />
                    · 환차익: 70,000,000원 - 65,000,000원 = 5,000,000원
                    <br />
                    · 환차익에 대한 세금: <strong>0원</strong> (개인 원칙 비과세)
                    <br />
                    <span className="text-xs text-text-tertiary">별도로 지급된 이자에는 15.4%가 원천징수됩니다.</span>
                  </p>
                </div>
                <p className="mt-4">
                  다만, 은행 상품에 따라 만기 이자율이 다르고 환전 스프레드로 실수령액이 달라지므로, 정확한 금액은 가입 은행 상품안내서와 원천징수 내역서를 함께 확인해야 합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">금융소득종합과세 대상인가요?</h2>
                <p>
                  이자와 배당을 합친 금융소득이 연 2,000만원을 초과하면 종합과세 대상이 됩니다. 소득세법 §14③에 따라 2,000만원 초과분이 다른 종합소득과 합산되어 6~45%의 누진세율로 다시 계산되며, 원천징수된 15.4%는 기납부세액으로 공제됩니다.
                </p>
                <p>
                  2,000만원 이하이면 원천징수 15.4%로 납세 의무가 그대로 종결되어 별도의 신고가 필요하지 않습니다. 이 경우 국세청 지급명세서에는 소득 내역이 남지만, 종합소득세 신고서에 넣을 필요가 없습니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 2. 분리과세와 종합과세 비교 (금융소득 기준)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">구분</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">분리과세 (2,000만원 이하)</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">종합과세 (2,000만원 초과분)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">세율</td>
                        <td className="p-3">15.4% 고정</td>
                        <td className="p-3">6~45% 누진</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">신고 의무</td>
                        <td className="p-3">별도 신고 없음</td>
                        <td className="p-3">5월 종합소득세 신고</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">합산 대상</td>
                        <td className="p-3">해당 없음</td>
                        <td className="p-3">근로·사업·기타소득 합산</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">근거</td>
                        <td className="p-3">소득세법 §129</td>
                        <td className="p-3">소득세법 §14③</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  다만, 2,000만원은 이자와 배당을 모두 더한 금액이므로 달러예금 이자만 계산해서는 안 됩니다. 은행 정기예금 이자, 채권 이자, 주식 배당 등을 모두 합산해 판단해야 하며, 다른 금융상품이 많은 분은 매년 초 국세청 홈택스에서 지급명세서를 조회해 총합을 확인해두는 것이 안전합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">외화예금도 예금자보호가 되나요?</h2>
                <p>
                  네, 외화예금도 예금자보호법에 따라 원화로 환산한 금액 기준으로 1인당 원리금 합계 1억원까지 보호됩니다. 2025년 9월 예금자보호 한도가 기존 5,000만원에서 1억원으로 상향됐고, 외화예금 역시 동일한 상향된 한도가 적용됩니다.
                </p>
                <p>
                  보호 대상은 은행이 파산했을 때 예금보험공사가 대신 지급하는 금액을 말하며, 원금과 소정 이자가 합쳐진 금액을 원화로 환산해 1억원 한도에서 보호받게 됩니다. 여러 은행에 나눠 예치했다면 각 은행별로 1억원씩 보호되므로 자산 규모가 큰 경우에는 분산 예치를 고려할 수 있습니다.
                </p>
                <p>
                  예외: CMA, 펀드, ELS, 외화 RP 같은 투자상품은 예금자보호 대상이 아닙니다. 상품명에 '예금'이 포함되지 않은 외화 상품은 가입 전에 예금자보호 여부를 반드시 확인해야 하며, 예금보험공사 웹사이트에서 상품별 보호 대상 목록을 조회할 수 있습니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">이자와 환차익 중 무엇이 유리한가요?</h2>
                <p>
                  세율만 비교하면 환차익 쪽이 유리합니다. 이자에는 최소 15.4%가 원천징수되고 규모가 커지면 종합과세로 최고 49.5%(지방소득세 포함)까지 부담이 늘어날 수 있는 반면, 개인의 환차익은 원칙적으로 비과세이기 때문입니다.
                </p>
                <p>
                  다만 환차익은 원금이 손실될 위험을 함께 가지고 있습니다. 환율이 반대로 움직이면 원화 기준 원금이 오히려 줄어들 수 있고, 이 손실분에 대해 세제상 손실 공제도 인정되지 않습니다. 반면 이자는 세금이 붙지만 은행 파산이 아닌 이상 원금이 감소하지 않습니다.
                </p>
                <p>
                  따라서 세금 유불리만 놓고 상품을 선택하는 접근은 위험합니다. 자신의 자금 성격, 필요 시점, 환율 전망, 예금자보호 한도까지 종합적으로 판단해야 하며, 판단이 어려울 때는 은행 창구 상담이나 세무 전문가 조언을 활용하는 것이 안전합니다. 본 가이드는 세제 정보 제공을 위한 것으로 특정 상품 가입을 권유하지 않습니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">신고는 어떻게 하나요?</h2>
                <p>
                  금융소득이 연 2,000만원 이하이면 별도의 신고가 필요하지 않습니다. 은행이 이자 지급 시점에 15.4%를 원천징수하고 국세청에 지급명세서를 제출하면 납세 의무가 그대로 종결됩니다.
                </p>
                <p>
                  연 2,000만원을 초과한 해에는 다음 해 5월 종합소득세 신고 기간에 금융소득을 다른 소득과 합산해 신고해야 합니다. 홈택스에 접속하면 은행이 신고한 지급명세서 내역이 미리 조회되므로, 이를 확인해 신고서에 반영하면 됩니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">신고 시 실무 체크리스트</p>
                  <p className="text-sm text-text-secondary">
                    · 홈택스 지급명세서 조회로 은행별 이자소득 합산 확인
                    <br />
                    · 다른 금융상품(예금·채권·배당) 이자·배당 합산 금액 확인
                    <br />
                    · 원천징수된 15.4%는 기납부세액으로 공제 처리
                    <br />
                    · 계산이 복잡하면 세무사 상담 또는 홈택스 세무 상담 이용
                  </p>
                </div>
                <p className="mt-4">
                  다만 국세청 실무 처리나 세법 개정에 따라 신고 방식이 달라질 수 있으므로, 정확한 절차는 매년 5월 신고 안내 또는 관할 세무서에 문의해 확인하는 것이 안전합니다.
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
                    <div className="font-semibold text-primary-500">이자소득세 15.4% 완전 정리</div>
                    <p className="mt-1 text-sm text-text-secondary">원천징수 구조와 계산법을 상세히 알아보세요.</p>
                  </Link>
                  <Link
                    href="/guide/financial-income-comprehensive-vs-separate-taxation/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">금융소득 분리과세 vs 종합과세</div>
                    <p className="mt-1 text-sm text-text-secondary">2,000만원 기준과 합산 계산 방식을 비교합니다.</p>
                  </Link>
                  <Link
                    href="/guide/deposit-protection-limit-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">예금자보호 한도 1억원 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">외화예금 포함 보호 대상과 한도 계산법.</p>
                  </Link>
                  <Link
                    href="/guide/currency-exchange-fee-preferential-rate-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">환전 수수료·우대율 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">달러 매입·매도 시 실질 비용을 확인하세요.</p>
                  </Link>
                  <Link
                    href="/guide/tax-free-comprehensive-savings-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">비과세종합저축 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">이자 비과세 혜택 조건과 한도 정리.</p>
                  </Link>
                  <Link
                    href="/calculator/exchange/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">환율 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">달러 환산과 환차익을 즉시 계산해보세요.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 교육 및 정보 제공 목적으로 작성되었으며, 개인 맞춤형 세무 조언이나 특정 상품 가입 유도 문서가 아닙니다. 실제 세율, 원천징수 방법, 금융소득종합과세 대상 여부, 예금자보호 적용 여부는 가입 상품과 개인 상황에 따라 달라지므로 반드시 거래 은행, 세무사, 국세청 홈택스, 예금보험공사를 통해 확인하시기 바랍니다. 본 콘텐츠는 2026-08-15을 기준으로 작성되었으며, 관련 법령 개정 시 즉시 업데이트됩니다. 인용 법조항: <strong>소득세법 §16(이자소득), §129(원천징수세율), §14③(금융소득종합과세), 예금자보호법</strong>. AI 보조 작성 후 운영자 검수 완료.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.nts.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">국세청</a>,{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">국가법령정보센터</a>,{' '}
                  <a href="https://www.kdic.or.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">예금보험공사</a>.
                </p>
              </section>

              <ShareButtons
                title="달러예금 세금 2026 가이드"
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
