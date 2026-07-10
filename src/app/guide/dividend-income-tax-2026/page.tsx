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

const URL = 'https://calculatorhost.com/guide/dividend-income-tax-2026/';
const DATE_PUBLISHED = '2026-07-10';
const DATE_MODIFIED = '2026-07-10';

export const metadata: Metadata = {
  title: '배당소득세 2026 | 15.4% 원천징수·금융소득 종합과세',
  description:
    '주식·펀드 배당금에 적용되는 배당소득세. 원천징수 15.4%, 금융소득 2,000만원 이하 분리과세·초과분 종합과세. 소득세법 §17·§129 기준 2026년 완벽 가이드.',
  keywords: [
    '배당소득세',
    '배당소득세 계산',
    '15.4% 원천징수',
    '금융소득 종합과세',
    '2,000만원',
    '분리과세',
    '소득세법 17조',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '배당소득세 2026 | 15.4% 원천징수·금융소득 종합과세' }],
    title: '배당소득세 2026 — 원천징수부터 종합과세까지 완벽 정리',
    description: '배당금 15.4% 원천징수되지만, 이자 포함 금융소득 2,000만원 초과 시 종합과세. 실제 계산 사례로 정확히 이해하세요.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '배당소득세 2026 — 15.4% 원천징수·2천만원 기준 종합과세',
    description: '주식·펀드 배당금은 매번 15.4% 떼인다. 하지만 이자 합산 2천만원 초과 시 전체 다른 소득과 합산해 다시 계산된다.',
  },
};

const FAQ_ITEMS = [
  {
    question: '배당소득세가 정확히 무엇인가요?',
    answer:
      '배당소득세(소득세법 §17)는 상장사·펀드·채권형 금융상품에서 받은 배당금에 대한 세금입니다. 배당금 지급 시 이미 14% + 지방소득세 1.4% = 15.4%가 원천징수되어 빠져나갑니다. 이것이 배당소득세입니다. 소액 투자자는 이것으로 종결되지만, 금융소득(이자 + 배당)이 2,000만원을 초과하면 다른 종합소득과 함께 누진세율로 다시 계산됩니다.',
  },
  {
    question: '왜 매번 15.4%가 떼어나가나요?',
    answer:
      '소득세법 §129에 따른 원천징수입니다. 배당소득은 발생 즉시 세금을 거두는 방식이므로, 배당금을 받으면 자동으로 15.4%가 공제된 금액을 지급받습니다. 이는 근로소득의 원천징수세와 같은 개념입니다. 나중에 종합소득세 신고 시 이미 낸 세금을 고려해서 추가 세금을 내거나 환급받게 됩니다.',
  },
  {
    question: '금융소득 2,000만원이란 이자+배당을 합산한 것인가요?',
    answer:
      '네, 정확히 맞습니다(소득세법 §14③). 금융소득은 이자소득 + 배당소득을 합산합니다. 예를 들어 배당금 1,500만원 + 정기예금 이자 600만원 = 2,100만원이면 2,000만원 기준을 초과하므로 초과분 100만원이 종합과세 대상입니다. 같은 해의 다른 금융상품의 이자·배당을 모두 합산해야 합니다.',
  },
  {
    question: '2,000만원 이하면 15.4%로 정말 끝나나요?',
    answer:
      '네, 1년 동안 이자 + 배당 합산이 2,000만원 이하면 각각 15.4%만 원천징수되고 추가 세금을 내지 않습니다. 다만 이미 원천징수된 15.4%는 결국 가서 소득세 신고를 할 때 차감되거나 환급받으므로, 사실 최종 세율은 개인의 다른 소득 상황에 따라 달라질 수 있습니다.',
  },
  {
    question: '2,000만원 초과 시 얼마를 더 내나요?',
    answer:
      '초과분이 다른 모든 종합소득(근로소득·사업소득 등)과 합산되어 누진세율(6~45%)이 적용됩니다. 예를 들어 연봉 5,000만원 + 배당 2,500만원인 경우, 2,000만원 초과 500만원이 연봉과 함께 과세표준에 합산되고, 누진공제를 고려한 종합소득세가 계산됩니다. 추가 세액은 이미 낸 배당세액공제(약 11%)를 고려하면 실제 부담은 그보다 낮습니다.',
  },
  {
    question: 'ISA·연금계좌 배당은 다르게 과세되나요?',
    answer:
      '네, ISA(개인종합자산관리계좌)의 배당은 연 400만원(비과세) 또는 800만원(9.9% 분리과세) 범위에서 비과세 또는 저율 과세됩니다. 연금계좌(401k·IRP 등) 내 배당은 거의 비과세입니다. 다만 계좌 해지 시 원금 + 수익에 따라 세금이 달라질 수 있으므로, 각 상품의 규칙을 반드시 확인하세요.',
  },
  {
    question: '해외 주식 배당은 어떻게 과세되나요?',
    answer:
      '미국·싱가포르 등 현지에서 이미 10~30% 선 원천징수된 후, 한국에서 받습니다. 한국에서 받은 배당금은 다시 15.4% 원천징수 대상이므로 이중 과세처럼 보일 수 있습니다. 다행히 소득세법 §53에서 외국납부세액공제를 인정하므로, 현지에서 낸 세금의 일부를 한국 세금에서 공제받을 수 있습니다. 정확한 계산은 세무사 상담이 권장됩니다.',
  },
  {
    question: '그로스업과 배당세액공제는 무엇인가요?',
    answer:
      '금융소득 2,000만원 초과 시 종합과세될 때, 회사가 배당금에서 이미 낸 법인세를 고려합니다. 배당금에 11%를 더해서(그로스업) 과세표준에 포함시킨 후, 나중에 배당세액공제(약 11%)를 적용하는 방식입니다. 이는 이중과세를 완화하기 위한 제도입니다. 계산이 복잡하므로 종합소득세 신고 시 세무사에게 상담하는 것이 안전합니다.',
  },
];

export default function DividendIncomeTax2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '배당소득세 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '배당소득세 2026 — 원천징수부터 종합과세까지 완벽 정리',
    description:
      '주식·펀드 배당금에 적용되는 배당소득세. 15.4% 원천징수 원리, 금융소득 2,000만원 분리과세 기준, 초과분 종합과세 계산법을 실제 사례로 완전 정리.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['배당소득세', '원천징수', '금융소득', '종합과세', '배당금 세금'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '배당소득세 2026',
    description:
      '배당소득세 원천징수(15.4%)의 의미와 금융소득 2,000만원 종합과세 기준을 정확히 이해하는 가이드.',
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
                    { name: '배당소득세 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">주식 투자자 · 9분 읽기 · 2026-07-10</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  배당소득세 2026
                  <br />
                  <span className="text-2xl text-text-secondary">— 원천징수부터 종합과세까지</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  주식이나 펀드에서 받은 배당금은 받을 때마다 15.4%가 세금으로 빠져나갑니다. 하지만 이것이 최종 세금이 아닐 수도 있습니다. 이자와 배당금을 합친 금융소득이 연 2,000만원을 초과하면, 다른 종합소득과 함께 더 높은 누진세율로 다시 계산됩니다. 이 가이드는 배당소득세가 어떻게 계산되고, 언제 추가 세금이 필요한지 명확히 정리합니다.
                </p>
              </header>

              <AdSlot slot="guide-dividend-income-tax-top" format="horizontal" />

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">배당소득세란 무엇인가</h2>
                <p>
                  배당소득세(소득세법 §17)는 주식·펀드·채권형 금융상품에서 받은 배당금에 부과되는 세금입니다. 근로소득처럼 발생 즉시 원천징수되는 방식이므로, 배당금을 받으면 이미 세금이 차감된 상태입니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">배당소득세의 기본 구조</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    배당금 100만원을 받으면: 14%(국세) + 1.4%(지방소득세) = <strong>15.4% = 15만 4천원</strong>이 세금으로 빠집니다.
                    <br />
                    실제 받는 금액: 100만원 − 15만 4천원 = <strong>84만 6천원</strong>
                    <br />
                    이는 소득세법 §129의 원천징수 규정에 따릅니다.
                  </p>
                </div>
                <p className="mt-4">
                  배당소득세는 단순히 "매번 15.4% 떼인다"는 의미만은 아닙니다. 연간 이자소득(배당 제외)을 합쳐서 2,000만원을 초과하면, 초과분이 종합소득세로 다시 계산되기 때문입니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">배당소득세 원천징수 15.4%의 의미</h2>
                <p>
                  배당금을 받을 때마다 15.4%가 빠져나가는 이유는, 배당소득을 "최종 결정세(final withholding tax)"로 처리하기 때문입니다. 즉, 소액 투자자는 이 15.4%만으로 세 의무가 끝나고, 추가로 세금을 내거나 환급받지 않습니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 배당소득세 원천징수 구성 (소득세법 §129)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">항목</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">세율</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">대상</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">배당소득세(국세)</td>
                        <td className="p-3"><strong>14%</strong></td>
                        <td className="p-3">배당금 전액</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">지방소득세</td>
                        <td className="p-3"><strong>1.4%</strong></td>
                        <td className="p-3">배당소득세의 10%</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">합계</td>
                        <td className="p-3"><strong>15.4%</strong></td>
                        <td className="p-3">배당금에서 동시 공제</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  이미 원천징수된 15.4%는 나중에 연말정산이나 종합소득세 신고 시 차감 또는 환급됩니다. 단, 금융소득이 2,000만원을 초과하면 다시 계산되는 부분이 중요합니다.
                </p>
                <p className="mt-4">
                  ⚠️ 다만 원천징수율 15.4%는 금융소득 2,000만원 이하일 때의 "분리과세" 기준이며, 초과 시에는 초과분이 다른 종합소득과 합산되어 누진세율(6~45%)이 적용됩니다. 따라서 "15.4%가 최종 세율"이라는 가정은 위험합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">금융소득 2,000만원 기준과 종합과세</h2>
                <p>
                  소득세법 §14③에 따르면, 이자소득과 배당소득을 합산한 금융소득이 2,000만원을 초과하면 초과분은 다른 모든 종합소득과 합산되어 누진세율로 과세됩니다. 이것이 배당소득세에서 가장 중요한 변곡점입니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">금융소득 2,000만원의 정의</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    금융소득 = <strong>이자소득 + 배당소득</strong>
                    <br />
                    예: 은행 이자 600만원 + 주식 배당 1,500만원 = 2,100만원
                    <br />
                    → 2,000만원 기준 초과: <strong>초과분 100만원</strong>이 종합과세
                    <br />
                    (소득세법 §14③)
                  </p>
                </div>
                <p className="mt-4">
                  여기서 주의할 점은 "이자"입니다. 많은 투자자가 배당금만 세어서 2,000만원 기준을 체크하는데, 실제로는 정기예금·채권·하이일드펀드 등에서 받은 이자를 모두 합산해야 합니다.
                </p>
                <p className="mt-4">
                  ⚠️ 다만 ISA(개인종합자산관리계좌)와 연금계좌(401k·IRP) 내 배당·이자는 이 기준에서 제외됩니다. 각 특수 계좌의 규칙을 별도로 확인하세요.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">금융소득 2,000만원 이하 vs 초과 시 세금 계산</h2>
                <p>
                  같은 배당금을 받아도 다른 소득 상황에 따라 최종 세액이 크게 달라집니다. 다음 3가지 사례를 통해 차이를 명확히 봅시다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 1. 배당금만 받고 금융소득 2,000만원 이하</p>
                  <p className="text-sm text-text-secondary">
                    · 배당소득: 1,000만원
                    <br />
                    · 이자소득: 0원
                    <br />
                    · 금융소득 합계: 1,000만원 (2,000만원 이하)
                    <br />
                    · 원천징수: 1,000만원 × 15.4% = <strong>154만원</strong>
                    <br />
                    · 추가 세금: <strong>0원</strong> (15.4%로 종결)
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 배당금 받을 때 15.4%만 떼이고, 추가 세금 없음.</span>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 2. 이자+배당 합산 2,000만원 초과 (다른 소득 없음)</p>
                  <p className="text-sm text-text-secondary">
                    · 배당소득: 1,500만원
                    <br />
                    · 이자소득: 600만원
                    <br />
                    · 금융소득 합계: 2,100만원
                    <br />
                    · 초과분: 100만원 (종합과세 대상)
                    <br />
                    · 원천징수 (분리): 2,000만원 × 15.4% = 308만원
                    <br />
                    · 초과분 종합과세 (100만원): 6% 세율 적용 = <strong>약 6만원</strong> (누진공제 고려 시 실제는 다를 수 있음)
                    <br />
                    · 이미 낸 배당세액공제: 약 1만 1천원 차감
                    <br />
                    · 추가 납부액: 약 5만원
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 2,000만원 초과분 100만원에 대해 추가 세금 약 5만원 발생.</span>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 3. 연봉 5,000만원 + 배당 1,500만원</p>
                  <p className="text-sm text-text-secondary">
                    · 근로소득: 5,000만원
                    <br />
                    · 배당소득: 1,500만원
                    <br />
                    · 근로소득공제 후 과세표준: 약 4,300만원
                    <br />
                    · 배당금 원천징수: 1,500만원 × 15.4% = 231만원
                    <br />
                    · 종합소득(배당금 2,000만원 이하이므로 분리): 근로소득만 누진세 적용
                    <br />
                    · 총 소득세: 약 450만원
                    <br />
                    · 이미 낸 배당세액공제 + 원천징수액 고려하면 최종 환급 또는 소액 추가 납부
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 직장인의 경우 배당금이 2,000만원 이하면 15.4%로 대부분 해결되고 연말정산으로 정산.</span>
                  </p>
                </div>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">그로스업과 배당세액공제 개념</h2>
                <p>
                  금융소득이 2,000만원을 초과해 종합과세될 때, 배당금에 특별한 계산 방식이 적용됩니다. 이를 "그로스업(grossup)"과 "배당세액공제"라고 부릅니다.
                </p>
                <p className="mt-4">
                  회사가 배당금을 지급하기 전에 이미 법인세를 냈습니다. 국가는 이 이중과세를 완화하기 위해, 배당소득 종합과세 시 배당금을 실제보다 약 11% 더 높게 평가해서(그로스업) 과세하고, 나중에 배당세액공제로 약 11%를 깎아주는 방식을 씁니다. 최종 효과는 국세청이 지급한 배당금에 대한 법인세를 일부 인정해주는 것입니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">그로스업·공제 예시 (개념 설명)</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    · 받은 배당금: 500만원 (이미 원천징수 15.4% 차감된 금액)
                    <br />
                    · 그로스업 후: 500만원 × 111% ≈ 555만원 (과세표준에 포함)
                    <br />
                    · 종합세율 25% 적용 시 세액: 약 139만원
                    <br />
                    · 배당세액공제: 약 61만원 (그로스업 배수의 대략 11%)
                    <br />
                    · 실제 배당세액: 139만원 − 61만원 = 78만원 (이미 낸 77만원과 유사)
                    <br />
                    <span className="text-xs text-text-tertiary">실제 계산은 매우 복잡하므로 세무사 상담이 권장됩니다.</span>
                  </p>
                </div>
                <p className="mt-4">
                  ⚠️ 다만 그로스업과 배당세액공제는 상당히 복잡한 계산이고, 개인 투자자가 정확히 파악하기 어렵습니다. 금융소득이 2,000만원을 초과할 것으로 예상되면, 종합소득세 신고 시 세무사나 국세청 상담을 반드시 받으세요.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">해외주식 배당과 외국납부세액공제</h2>
                <p>
                  미국·싱가포르·일본 등 해외 주식에서 배당금을 받으면, 현지에서 이미 원천징수(10~30% 범위)된 후 한국으로 입금됩니다. 그 다음 한국에서 또 15.4%가 공제됩니다. 이중과세처럼 보일 수 있으나, 소득세법 §53에서 외국납부세액공제를 인정합니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">해외 배당금 계산 흐름</p>
                  <p className="text-sm text-text-secondary">
                    1단계: 미국 배당금 100달러 → 미국 원천징수 10% = 90달러 수령
                    <br />
                    2단계: 90달러를 한국 계좌로 (한국은행 환율로 약 11만 7천원)
                    <br />
                    3단계: 11만 7천원에 대해 한국에서 다시 15.4% 원천징수
                    <br />
                    → 최종 수령: 약 9만 9천원
                    <br />
                    → 실제 총 세부담: 약 25%
                    <br />
                    (단, 외국납부세액공제로 일부 조정 가능)
                  </p>
                </div>
                <p className="mt-4">
                  해외 배당금에 대한 정확한 외국납부세액공제 계산은 상당히 복잡합니다. 배당 규모가 크거나 여러 국가의 배당을 받는다면, 전문 세무사에게 상담하는 것이 비용 대비 이득입니다.
                </p>
                <p className="mt-4">
                  ⚠️ 다만 환율 변동에 따라 배당금의 실제 금액이 달라지고, 외국납부세액공제 계산 기준도 매년 국세청 고시를 따릅니다. 정확한 정보는 국세청 홈택스나 세무사에게 확인하세요.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">ISA·연금계좌 배당금은 어떻게 다른가</h2>
                <p>
                  일반 계좌에서는 배당금이 15.4% 원천징수되지만, ISA(개인종합자산관리계좌)와 연금계좌(401k·IRP·연금저축 등)는 특별한 세제 혜택을 제공합니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 2. 특수 계좌별 배당 과세 비교</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">계좌 유형</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">배당금 과세</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">금융소득 2,000만 기준</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">일반 계좌</td>
                        <td className="p-3">15.4% 원천징수</td>
                        <td className="p-3">포함</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">ISA (비과세)</td>
                        <td className="p-3">연 400만원 비과세</td>
                        <td className="p-3">제외</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">ISA (저율과세)</td>
                        <td className="p-3">연 400-800만원 9.9% 분리과세</td>
                        <td className="p-3">제외</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">연금계좌</td>
                        <td className="p-3">거의 비과세</td>
                        <td className="p-3">제외</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  ISA의 비과세 한도 400만원은 연간 누적 기준입니다. 즉, 한 해에 배당 300만원 + 양도차익 200만원 = 500만원이면, 400만원만 비과세되고 초과 100만원은 9.9% 분리과세됩니다. 연금계좌 내 배당은 계좌 보유 중에는 거의 과세되지 않으며, 인출 시에만 과세됩니다.
                </p>
                <p className="mt-4">
                  ⚠️ 다만 ISA와 연금계좌 규칙은 연도마다 변경될 수 있으므로, 가입 전에 금융기관에서 최신 기준을 반드시 확인하세요.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">배당소득세 신고·납부 체크포인트</h2>
                <p>
                  배당금을 받았다면, 다음을 반드시 체크해서 세금을 절약하거나 환급받을 수 있도록 준비하세요.
                </p>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li>
                    <strong>원천징수 확인:</strong> 배당금 지급 시 15.4%가 정확히 차감되었는지 증권사 계좌명세에서 확인하세요.
                  </li>
                  <li>
                    <strong>금융소득 2,000만원 판정:</strong> 1월부터 12월까지 받은 이자 + 배당을 모두 합산해서 2,000만원 초과 여부를 미리 파악하세요. 계산 착오 시 추가 세금이 발생합니다.
                  </li>
                  <li>
                    <strong>배당세액공제 신청:</strong> 2,000만원 초과 시 종합과세 신고 때 배당세액공제를 빠뜨리지 마세요. 세무사 또는 국세청 문의로 정확한 공제액을 확인하세요.
                  </li>
                  <li>
                    <strong>ISA·연금계좌 분리 추적:</strong> 여러 계좌에서 배당을 받으면, 특수 계좌의 배당은 금융소득 2,000만원 기준에서 제외되어야 합니다. 증권사별 배당내역을 모아서 정리하세요.
                  </li>
                  <li>
                    <strong>해외 배당 기록:</strong> 해외 주식 배당을 받았다면, 현지 세금 영수증과 환율을 기록해두고 외국납부세액공제를 신청할 준비를 하세요.
                  </li>
                  <li>
                    <strong>5월 종합소득세 신고:</strong> 배당금이 있었다면 5월 신고 기간에 반드시 신고하세요. 미신고 시 가산세가 발생합니다.
                  </li>
                </ul>
              </section>

              <AdSlot slot="guide-dividend-income-tax-mid" format="rectangle" />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h2 className="text-2xl font-bold">배당소득세 절약 전략 3가지</h2>
                <p>
                  배당소득에 대한 세금을 줄일 수 있는 방법들을 소개합니다.
                </p>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li>
                    <strong>ISA·연금계좌 최우선 활용:</strong> 배당 수익이 나는 주식·펀드는 가능한 한 ISA(비과세 400만원)나 연금계좌에서 매매하세요. 일반 계좌의 15.4%보다 훨씬 유리합니다.
                  </li>
                  <li>
                    <strong>금융소득 2,000만원 관리:</strong> 배당 수익이 크다면, 이자수익(예금·채권)을 의도적으로 줄여서 2,000만원 기준을 맞추는 것도 전략입니다. 다만 세무사와 상담 후 진행하세요.
                  </li>
                  <li>
                    <strong>손실 보전(세액공제 극대화):</strong> 양도 손실이 있었다면, 배당금 과세액을 일부 상쇄할 수 있습니다. 증권사와 세무사에게 손실 보전 신청 방법을 상담하세요.
                  </li>
                </ul>
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
                    <p className="mt-1 text-sm text-text-secondary">주식·펀드 매매 차익의 세금을 계산하세요.</p>
                  </Link>
                  <Link
                    href="/guide/interest-income-tax-15-4-percent-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">이자소득세 15.4% 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">예금·채권 이자 세금의 기본을 배우세요.</p>
                  </Link>
                  <Link
                    href="/guide/financial-income-comprehensive-vs-separate-taxation/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">금융소득 종합과세 vs 분리과세</div>
                    <p className="mt-1 text-sm text-text-secondary">2,000만원 기준의 의미를 정확히 이해하세요.</p>
                  </Link>
                  <Link
                    href="/guide/isa-account-tax-benefit-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">ISA 계좌 세금 혜택 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">배당금 비과세 400만원 한도 활용법.</p>
                  </Link>
                  <Link
                    href="/guide/overseas-stock-capital-gains-tax-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">해외 주식 배당세·양도세 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">외국납부세액공제 기초를 배우세요.</p>
                  </Link>
                  <Link
                    href="/category/finance/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">모든 금융 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">대출·예금·투자 수익률 모음.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 교육 목적으로 작성되었으며, 개인 맞춤형 세무 조언이 아닙니다. 실제 배당소득세 계산, 금융소득 2,000만원 기준 판정, 종합과세 여부, 배당세액공제 규모 등은 개인의 소득 상황에 따라 크게 달라집니다. 반드시 국세청 홈택스(hometax.go.kr) 또는 세무사·회계사와 상담하세요. 본 콘텐츠는 2026-07-10을 기준으로 작성되었으며, 소득세법 개정 시 즉시 업데이트됩니다. 배당소득세의 정확한 기준은 <strong>소득세법 §17(배당소득), §129(원천징수), §14③(금융소득 종합과세), §53(외국납부세액공제)</strong>를 따릅니다. AI 보조 작성 후 운영자 검수 완료.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터</a>,{' '}
                  <a href="https://www.nts.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">국세청 공식 홈페이지</a>,{' '}
                  <a href="https://hometax.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">홈택스 (배당금 조회·신고)</a>.
                </p>
              </section>

              <ShareButtons
                title="배당소득세 2026 가이드"
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
