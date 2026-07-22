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

const URL = 'https://calculatorhost.com/guide/pension-savings-irp-tax-credit-2026/';
const DATE_PUBLISHED = '2026-07-01';
const DATE_MODIFIED = '2026-07-01';

export const metadata: Metadata = {
  title: '연금저축·IRP 세액공제 2026 | 900만원 한도·최대 148만원 환급',
  description:
    '연금저축과 퇴직연금(IRP) 세액공제 완벽 정리. 합산 900만원 한도, 소득별 공제율(15%·12%), 최대 환급액 148.5만원 계산법. 소득세법 §59의3.',
  keywords: [
    '연금저축 세액공제',
    'IRP 세액공제',
    '세액공제 한도 2026',
    '연금계좌 세액공제',
    '소득세법 59조의3',
    '세액공제 환급',
    '연금저축 최대 한도',
    '퇴직연금 공제',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '연금저축·IRP 세액공제 2026 | 900만원 한도·최대 148만원 환급' }],
    title: '연금저축·IRP 세액공제 2026 — 소득별 최대 148만원 환급받기',
    description: '연금저축·퇴직연금 합산 900만원 납입 시 세액공제 혜택. 소득 5,500만원 이하 15%, 초과 12%. 정확한 계산법과 주의사항.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '연금저축·IRP 세액공제 2026 — 최대 148만원 환급',
    description: '900만원 한도에 15~12% 세액공제. 중도해지 시 기타소득세 16.5% 부과 주의.',
  },
};

const FAQ_ITEMS = [
  {
    question: '연금저축과 IRP 세액공제가 무엇인가요?',
    answer:
      '소득세법 §59의3에 따른 연금계좌세액공제(연금저축·퇴직연금)는 개인이 연금저축 또는 IRP에 납입한 금액의 일부를 소득세에서 직접 공제해주는 제도입니다. 예를 들어 연금저축에 600만원, IRP에 300만원을 납입했을 때, 합산 900만원에 대해 최대 148.5만원(15% 적용)까지 세액공제를 받을 수 있습니다.',
  },
  {
    question: '연금저축과 IRP 한도는 따로인가요?',
    answer:
      '아니요, 연금저축과 IRP의 세액공제는 합산 한도 900만원입니다(소득세법 §59의3). 연금저축만 600만원까지 공제 대상이고, 퇴직연금(IRP)은 별도 한도가 없으므로 합산해서 900만원을 초과하지 않으면 전액 공제됩니다. 예를 들어 연금저축 700만원을 납입했다면 IRP는 200만원까지만 공제 대상입니다.',
  },
  {
    question: '소득별로 공제율이 다르다는데 정확히 얼마인가요?',
    answer:
      '총급여 또는 종합소득금액에 따라 공제율이 달라집니다(소득세법 §59의3). 총급여 5,500만원 이하(종합소득금액 4,500만원 이하) → 15% / 초과 → 12%. 지방소득세를 포함하면 실질 환급률은 16.5%(15%+1.5%)·13.2%(12%+1.2%)입니다. 예를 들어 총급여 5,000만원이면 900만원 납입 시 최대 148.5만원 환급, 8,000만원이면 118.8만원 환급입니다.',
  },
  {
    question: '최대 얼마까지 세액공제를 받을 수 있나요?',
    answer:
      '합산 한도 900만원 × 공제율(15% 또는 12%)입니다. 소득 5,500만원 이하면 900만원 × 16.5% = 최대 148.5만원, 초과면 118.8만원 환급입니다. 다만 이는 실제 납입액 범위 내에서만 적용되므로, 600만원만 납입했다면 그 금액에 대해서만 공제됩니다.',
  },
  {
    question: '중도해지하면 세액공제 혜택을 못 받나요?',
    answer:
      '중도해지(연금 외 목적의 수령)를 하면 그동안 받은 세액공제 혜택을 토해내야 합니다(소득세법 §59의3). 인출한 원금과 운용수익에 대해 기타소득세 16.5%가 부과되므로, 결국 세액공제 혜택이 상쇄됩니다. 만 55세 이후 연금수령(10년 이상)은 연금소득세 3.3~5.5%만 적용되어 세 효율이 좋습니다.',
  },
  {
    question: 'ISA에서 전환한 자금도 세액공제 대상인가요?',
    answer:
      '네, ISA 만기계좌를 연금계좌로 전환할 때 추가 공제가 있습니다(소득세법 §59의3). 전환금액의 10%(연 300만원 한도)를 추가로 세액공제받을 수 있습니다. 예를 들어 ISA에서 전환한 금액이 500만원이면 추가 공제 50만원(한도 300만원 내)을 받을 수 있습니다.',
  },
  {
    question: '연금저축 세액공제 신청은 어떻게 하나요?',
    answer:
      '5월 연말정산 또는 다음 해 종합소득세 신고 시 자동으로 적용되거나, 홈택스에서 "연금계좌세액공제" 항목을 입력하면 됩니다. 회사에 다니면 회계담당자에게 연금저축 납입 영수증을 제출하면 됩니다. 프리랜서나 자영업자는 종합소득세 신고 시 증빙서류(통장 내역 또는 금융기관 영수증)를 첨부하면 됩니다.',
  },
  {
    question: '한도 초과분은 다음 해로 이월할 수 없나요?',
    answer:
      '아니요, 연금계좌세액공제 한도는 매년 새로 리셋됩니다(소득세법 §59의3). 2026년에 900만원 미만을 납입했다면 남은 한도는 소실되며, 2027년에는 다시 900만원 한도가 적용됩니다. 계획적으로 연간 납입액을 정해서 한도를 효율적으로 사용하는 것이 중요합니다.',
  },
];

export default function PensionSavingsIrpTaxCredit2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '연금저축·IRP 세액공제 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '연금저축·IRP 세액공제 2026 — 900만원 한도에서 최대 148만원 환급받기',
    description:
      '연금저축과 퇴직연금(IRP) 세액공제 완전 정리. 합산 900만원 한도, 소득별 공제율(15%·12%), 최대 환급액 계산, 중도해지 주의사항.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['연금저축', 'IRP', '세액공제', '900만원 한도', '소득세법 59조의3'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '연금저축·IRP 세액공제 2026',
    description: '연금저축과 퇴직연금 세액공제 한도, 공제율, 계산법, 주의사항 완벽 정리.',
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
                    { name: '연금저축·IRP 세액공제 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">직장인·자영업자 · 9분 읽기 · 2026-07-01</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  연금저축·IRP 세액공제 2026
                  <br />
                  <span className="text-2xl text-text-secondary">— 900만원 한도에서 최대 148만원 환급</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  연금저축과 퇴직연금(IRP)에 납입하면 받을 수 있는 세액공제는 절세의 가장 기본이면서도 실질적인 효과가 큰 제도입니다. 소득세법 §59의3에 따른 이 혜택은 직장인뿐만 아니라 프리랜서, 자영업자도 활용할 수 있습니다. 이 가이드에서는 한도, 공제율, 실제 환급액, 그리고 중도해지 시 주의사항까지 완벽하게 정리해드립니다.
                </p>
              </header>

              <AdSlot slot="guide-pension-savings-irp-tax-credit-top" format="horizontal" />

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">연금계좌세액공제란</h2>
                <p>
                  소득세법 §59의3에 따른 연금계좌세액공제는 개인이 은퇴 자금을 마련하도록 정부가 지원하는 세제 혜택입니다. 연금저축(연금보험, 연금신탁, 퇴직연금펀드)과 퇴직연금(IRP)에 납입한 금액에 대해 소득세를 직접 줄여주는 것입니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">세액공제의 기본 원리</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    연금계좌에 낸 돈 × 공제율(15% 또는 12%) = 소득세에서 직접 깎아주는 금액
                    <br />
                    예: 연금저축 600만원 + IRP 300만원 = 합산 900만원
                    <br />
                    900만원 × 15%(공제율) = <strong>135만원 세액공제</strong>
                    <br />
                    지방소득세 포함 시: 900만원 × 16.5% = <strong>148.5만원 환급</strong>
                  </p>
                </div>
                <p className="mt-4">
                  이 혜택은 한 번의 신청으로 지속적으로 적용되는 것이 아니라, 매년 새롭게 신청해야 합니다. 연말정산 또는 종합소득세 신고 시마다 해당 연도의 납입액을 신고하면, 그해의 공제 혜택을 받을 수 있습니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">연금저축과 IRP 한도 — 합산 900만원</h2>
                <p>
                  연금저축과 퇴직연금(IRP)의 세액공제는 각각 별도 한도가 아니라 합산으로 계산됩니다(소득세법 §59의3). 이는 개인이 자신의 상황에 맞춰 연금저축과 IRP를 자유롭게 조합할 수 있도록 설계된 것입니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 연금계좌 세액공제 한도 (소득세법 §59의3, 2026 기준)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">계정 구분</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">개별 한도</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">합산 한도</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">설명</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3"><strong>연금저축</strong></td>
                        <td className="p-3">연 600만원</td>
                        <td className="p-3 rowspan-3">합산 <strong>900만원</strong></td>
                        <td className="p-3 text-xs text-text-secondary">2023년부터 400만 → 600만원 상향</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3"><strong>퇴직연금(IRP)</strong></td>
                        <td className="p-3">별도 한도 없음</td>
                        <td className="p-3 rowspan-2"></td>
                        <td className="p-3 text-xs text-text-secondary">합산 900만원 범위 내에서 자유</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3"><strong>ISA 전환 추가</strong></td>
                        <td className="p-3">전환액 × 10%<br/>(연 300만원 한도)</td>
                        <td className="p-3"></td>
                        <td className="p-3 text-xs text-text-secondary">ISA 만기계좌 → 연금계좌 전환 시</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  다만 이 한도는 매년 리셋되므로, 2026년에 900만원을 납입하지 못했다면 남은 한도는 다음 해로 이월되지 않습니다. 해마다 계획적으로 납입액을 정해 한도를 효율적으로 활용하는 것이 중요합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">소득별 공제율 — 15% vs 12%</h2>
                <p>
                  세액공제 혜택의 크기는 개인의 소득 수준에 따라 달라집니다(소득세법 §59의3). 소득이 낮을수록 높은 공제율을 받는 정책으로, 저소득층의 노후자금 마련을 더 적극 지원하는 취지입니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 2. 소득별 공제율 (소득세법 §59의3, 2026 기준)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">소득 구간</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">공제율</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">지방소득세 포함</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">900만원 기준 환급액</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3"><strong>5,500만원 이하</strong></td>
                        <td className="p-3"><strong>15%</strong></td>
                        <td className="p-3"><strong>16.5%</strong></td>
                        <td className="p-3"><strong>148.5만원</strong></td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3"><strong>5,500만원 초과</strong></td>
                        <td className="p-3"><strong>12%</strong></td>
                        <td className="p-3"><strong>13.2%</strong></td>
                        <td className="p-3"><strong>118.8만원</strong></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  여기서 말하는 소득은 근로소득(연봉) 기준 총급여 또는 자영업자의 종합소득금액 기준입니다. 다만 공제율 판정은 과세연도 직전 연도 소득을 기준으로 하므로, 현재 연도 소득 변화가 있어도 내년 공제부터 반영됩니다.
                </p>
                <p className="mt-4">
                  다만 정확한 공제율 판정을 위해서는 해당 연도 세법 기준을 홈택스 또는 관할 세무서에 확인하는 것이 안전합니다. 소득 경계선 근처라면 특히 주의가 필요합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">세액공제 계산 사례</h2>
                <p>
                  다음 3가지 사례를 통해 연금계좌세액공제가 실제로 얼마나 큰 혜택을 주는지 살펴보겠습니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 1. 총급여 5,000만원 직장인 (공제율 15%)</p>
                  <p className="text-sm text-text-secondary">
                    · 연금저축 납입: 600만원
                    <br />
                    · IRP 납입: 300만원
                    <br />
                    · 합산 납입액: 900만원
                    <br />
                    · 세액공제: 900만원 × 15% = <strong>135만원</strong>
                    <br />
                    · 지방소득세 포함: 900만원 × 16.5% = <strong>148.5만원</strong>
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 최대 148.5만원의 세금 감면 혜택으로 실질 납입액을 크게 줄일 수 있습니다.</span>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 2. 총급여 8,000만원 직장인 (공제율 12%)</p>
                  <p className="text-sm text-text-secondary">
                    · 연금저축 납입: 600만원
                    <br />
                    · IRP 납입: 300만원
                    <br />
                    · 합산 납입액: 900만원
                    <br />
                    · 세액공제: 900만원 × 12% = <strong>108만원</strong>
                    <br />
                    · 지방소득세 포함: 900만원 × 13.2% = <strong>118.8만원</strong>
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 소득이 높으면 공제율이 낮아지지만, 여전히 100만원 이상의 절세 효과를 봅니다.</span>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 3. 연금저축만 700만원 납입 (공제율 15%)</p>
                  <p className="text-sm text-text-secondary">
                    · 연금저축 납입: 700만원
                    <br />
                    · 세액공제 대상: 600만원 한도(초과분 100만원 제외)
                    <br />
                    · 세액공제: 600만원 × 15% = <strong>90만원</strong>
                    <br />
                    · 지방소득세 포함: 600만원 × 16.5% = <strong>99만원</strong>
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 연금저축만 사용할 때는 600만원까지만 공제되므로, IRP를 함께 활용해 900만원 한도를 채우는 것이 효율적입니다.</span>
                  </p>
                </div>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">중도해지 시 세액공제 환수</h2>
                <p>
                  연금계좌세액공제를 받은 후 연금 이외의 목적으로 중도에 자금을 인출하면, 받은 세액공제 혜택을 토해내야 합니다(소득세법 §59의3). 이것이 연금계좌 세액공제의 가장 중요한 주의사항입니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">중도해지 시 세무 처리</p>
                  <p className="text-sm text-text-secondary">
                    · 인출 원금 + 운용수익 → <strong>기타소득세 16.5% 부과</strong>
                    <br />
                    · 예: 600만원 납입 + 50만원 수익 = 650만원 인출
                    <br />
                    · 부과 세액: 650만원 × 16.5% = 약 107만원 세금
                    <br />
                    · 세액공제 혜택(90만원) + 추가 세금(107만원) = 결국 손해
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 중도해지 유혹에 빠지면 세액공제 혜택을 모두 토해내고 추가 세금까지 내게 됩니다.</span>
                  </p>
                </div>
                <p className="mt-4">
                  반면 만 55세 이후에 연금 수령 목적으로 인출하면 연금소득세 3.3~5.5%만 적용되어 세 효율이 훨씬 좋습니다. 또한 10년 이상 장기적으로 유지한 계좌에서 연금으로 받으면 분할수령 시 추가 공제까지 받을 수 있습니다.
                </p>
                <p className="mt-4">
                  다만 개인의 상황에 따라 세무 처리가 달라질 수 있으므로, 중도해지가 필요하다면 반드시 관할 세무서에 먼저 상담하고 진행하는 것이 안전합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">연금계좌 세액공제 신청 방법</h2>
                <p>
                  연금계좌세액공제를 받기 위해서는 매년 새로 신청해야 합니다. 직장인과 자영업자에 따라 신청 절차가 다릅니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">직장인 (연말정산)</p>
                  <p className="text-sm text-text-secondary">
                    · 회사의 회계/인사 담당자에게 연금저축 납입 영수증 제출
                    <br />
                    · 은행이나 보험회사에서 발급하는 "연금저축 납입증명서" 또는 "연금계좌 거래 내역" 제출
                    <br />
                    · 연말정산 시 "신용카드 등 사용액 명세서" 항목이나 별도 "연금계좌 세액공제" 항목에 입력
                    <br />
                    · 회계담당자가 처리 후 12월 급여 또는 1월 급여에 세금 환급액 반영
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">프리랜서·자영업자 (종합소득세 신고)</p>
                  <p className="text-sm text-text-secondary">
                    · 홈택스(hometax.go.kr)에 로그인 → "신고하기" → "종합소득세"
                    <br />
                    · "세액공제 및 감면" 섹션에서 "연금계좌세액공제" 항목 입력
                    <br />
                    · 납입액과 공제율을 입력하면 자동 계산
                    <br />
                    · 영수증·통장 사본 등 증빙자료 별도 준비 (세무조사 시 제출용)
                    <br />
                    · 5월 종소세 신고 기간 내 제출하면 세금 환급
                  </p>
                </div>
              </section>

              <AdSlot slot="guide-pension-savings-irp-tax-credit-mid" format="rectangle" />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h2 className="text-2xl font-bold">ISA에서 연금계좌로 전환 시 추가 공제</h2>
                <p>
                  ISA(개인종합자산관리계좌) 만기계좌를 연금계좌로 전환할 때는 추가 세액공제를 받을 수 있습니다(소득세법 §59의3). 이는 개인의 장기 자산 형성을 돕기 위한 정책입니다.
                </p>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li>
                    <strong>전환금액의 10% 세액공제:</strong> ISA에서 연금계좌로 옮긴 금액의 10%를 추가로 세액공제받습니다.
                  </li>
                  <li>
                    <strong>연 300만원 한도:</strong> 추가 공제는 연간 300만원까지만 인정됩니다. 예를 들어 ISA 만기금 5,000만원을 전환해도 추가 공제는 300만원(= 3,000만원 × 10%)입니다.
                  </li>
                  <li>
                    <strong>기존 한도와 별개:</strong> ISA 전환 추가 공제는 기존 900만원 한도와 별도로 계산됩니다. 즉, 연금저축·IRP로 900만원 납입하고 ISA 전환 추가 공제까지 받을 수 있습니다.
                  </li>
                  <li>
                    <strong>신청 방법:</strong> 홈택스 종소세 신고 시 "ISA 전환 추가공제" 항목에 전환금액 입력하면 자동 계산됩니다.
                  </li>
                </ul>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">연금소득세 vs 기타소득세</h2>
                <p>
                  연금계좌에서 자금을 인출할 때의 세금은 인출 방식에 따라 크게 달라집니다. 이것이 연금계좌를 제대로 활용하는 데 가장 중요한 포인트입니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 3. 인출 방식별 세금 (소득세법 §58, §99)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">인출 방식</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">세금 종류</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">세율</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">설명</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3"><strong>중도해지</strong><br/>(연금 외)</td>
                        <td className="p-3">기타소득세</td>
                        <td className="p-3"><strong>16.5%</strong></td>
                        <td className="p-3 text-xs text-text-secondary">세액공제 환수 + 추가 세금. 손실 위험</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3"><strong>만 55세 이후<br/>연금수령</strong><br/>(10년 이상)</td>
                        <td className="p-3">연금소득세</td>
                        <td className="p-3"><strong>3.3~5.5%</strong></td>
                        <td className="p-3 text-xs text-text-secondary">가장 세 효율 좋은 방식. 추가 공제 가능</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3"><strong>연금수령<br/>(5~10년)</strong></td>
                        <td className="p-3">연금소득세</td>
                        <td className="p-3"><strong>5.5~6.6%</strong></td>
                        <td className="p-3 text-xs text-text-secondary">10년 미만은 세율 더 높음</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  연금계좌세액공제는 장기 저축을 전제로 한 제도입니다. 만 55세 이후에 연금으로 받을 때의 세율(3.3~5.5%)이 기타소득세(16.5%)보다 훨씬 낮으므로, 최소 10년 이상 유지하는 것이 최고의 절세 전략입니다.
                </p>
                <p className="mt-4">
                  다만 개인의 재정 상황이 급변할 수 있으므로, 연금계좌 개설 시부터 "만 55세까지 절대 손을 대지 않겠다"는 다짐이 필요합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">한 해 최적의 연금계좌 활용 전략</h2>
                <p>
                  연금계좌세액공제 한도 900만원을 효과적으로 활용하는 방법을 정리했습니다.
                </p>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li>
                    <strong>연금저축 600만원 + IRP 300만원 기본 구성:</strong> 연금저축은 600만원 한도가 있으므로 거의 대부분 채우고, 나머지 300만원은 IRP로 보충하는 것이 가장 간단합니다.
                  </li>
                  <li>
                    <strong>소득 변동이 있으면 하반기 조정:</strong> 직장 이동이나 퇴직 등으로 올해 소득이 예상과 달라지면, 연말정산 전에 추가 납입으로 한도를 조정할 수 있습니다.
                  </li>
                  <li>
                    <strong>ISA 만기 시 연금계좌 전환:</strong> ISA가 만기가 되면 연금계좌로 전환하여 추가 공제(전환금액 × 10%, 연 300만원 한도) 혜택을 받습니다.
                  </li>
                  <li>
                    <strong>장기 자산 형성 목표 설정:</strong> "만 55세 이후 연금으로 받겠다"는 명확한 목표를 세우고, 그 때까지 절대 중도해지하지 않는 것이 핵심입니다.
                  </li>
                </ul>
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
                    <p className="mt-1 text-sm text-text-secondary">세액공제 반영한 세후 월급 계산.</p>
                  </Link>
                  <Link
                    href="/guide/retirement-income-tax-deferral-irp-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">IRP 운용·세무 완벽 가이드</div>
                    <p className="mt-1 text-sm text-text-secondary">퇴직연금 이연과 연금수령 전략.</p>
                  </Link>
                  <Link
                    href="/guide/national-pension-expected-benefit-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">국민연금 수령액 계산</div>
                    <p className="mt-1 text-sm text-text-secondary">40년 납입 후 예상 연금액 조회.</p>
                  </Link>
                  <Link
                    href="/guide/private-pension-1500-million-separate-taxation-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">개인연금 분리과세 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">보험료·이자소득 분리과세 조건.</p>
                  </Link>
                  <Link
                    href="/guide/housing-pension-reverse-mortgage-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">주택연금(역모기지) 세금</div>
                    <p className="mt-1 text-sm text-text-secondary">주택연금 지급액 과세 여부.</p>
                  </Link>
                  <Link
                    href="/category/tax/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">모든 세금 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">양도세·취득세·상속세 모음.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 교육 목적으로 작성되었으며, 개인 맞춤형 세무 조언이 아닙니다. 실제 연금계좌 세액공제 대상, 공제율, 한도, 최종 환급액은 개인의 소득 구분, 계약 시점, 납입 이력에 따라 달라질 수 있습니다. 정확한 세무 처리를 위해서는 관할 세무서에 직접 상담하거나, 홈택스 종소세 신고 시 자동 계산 기능을 사용하세요. 본 콘텐츠는 2026-07-01을 기준으로 작성되었으며, 소득세법 개정 시 즉시 업데이트됩니다. 연금계좌 세액공제의 정확한 기준은 법조항 <strong>소득세법 §59의3(연금계좌세액공제)</strong>을 따릅니다. AI 보조 작성 후 운영자 검수 완료.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터</a>,{' '}
                  <a href="https://www.nts.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">국세청 홈택스</a>,{' '}
                  <a href="https://www.pensionservice.or.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">사적연금정보센터</a>.
                </p>
              </section>

              <ShareButtons
                title="연금저축·IRP 세액공제 2026 가이드"
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
