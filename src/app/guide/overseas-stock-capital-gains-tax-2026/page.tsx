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

const URL = 'https://calculatorhost.com/guide/overseas-stock-capital-gains-tax-2026/';
const DATE_PUBLISHED = '2026-07-09';
const DATE_MODIFIED = '2026-07-09';

export const metadata: Metadata = {
  title: '해외주식 양도소득세 2026 | 250만원 공제·22% 세율·5월 신고',
  description:
    '미국주식 등 해외주식 매도 시 양도소득세 계산법. 연 250만원 기본공제, 22% 세율(20% + 지방소득세 2%), 5월 확정신고. 손익통산·환율 기준일·외국납부세액공제까지 완전 정리.',
  keywords: [
    '해외주식 양도소득세',
    '미국주식 세금',
    '국외자산 양도소득',
    '해외주식 250만원 공제',
    '소득세법 118조의2',
    '해외주식 5월 신고',
    '양도소득 손익통산',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '해외주식 양도소득세 2026 | 250만원 공제·22%·5월 신고' }],
    title: '해외주식 양도소득세 2026 — 미국주식 매도 시 세금 정산법',
    description: '해외주식 양도차익에 연 250만원 기본공제, 22% 세율 적용. 거래일 기준환율로 환산하고 5월 확정신고. 손익통산·외국납부세액공제까지 해설.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '해외주식 양도소득세 2026 — 250만원 공제·22%·5월 신고',
    description: '미국주식 등 해외주식 매도 차익에 대한 소득세. 연 250만원 공제, 22% 세율, 다음해 5월 확정신고.',
  },
};

const FAQ_ITEMS = [
  {
    question: '해외주식 양도소득세는 언제 신고하나요?',
    answer:
      '해외주식을 매도한 해의 다음해 5월 1일~31일에 확정신고합니다. 예를 들어 2026년에 매도한 주식은 2027년 5월에 신고합니다(소득세법 §118의2). 국내주식과 달리 예정신고 제도가 없으므로 5월 한 달 안에 반드시 신고해야 합니다.',
  },
  {
    question: '250만원 공제는 언제 적용되나요?',
    answer:
      '연 250만원은 국외주식 양도소득에 대한 기본공제입니다(소득세법 §118의2). 국내 대주주 등 다른 양도소득이 있다면 합산하되, 총 공제액은 250만원 한도입니다. 따라서 양도차익이 250만원 이하면 세금이 없습니다.',
  },
  {
    question: '미국주식 손실이 있으면 이익과 상계할 수 있나요?',
    answer:
      '네, 같은 과세연도(1월~12월) 내 국외주식 매매 손익은 모두 통산됩니다. 예를 들어 이익 500만원, 손실 200만원이면 순익 300만원을 기준으로 세금을 계산합니다(소득세법 §118의4). 다만 손실을 다음해로 이월할 수는 없습니다.',
  },
  {
    question: '환차익도 양도소득에 포함되나요?',
    answer:
      '네, 환차익도 양도소득의 일부입니다. 취득가와 양도가를 각각 거래일 기준환율로 원화 환산할 때 발생하는 환차도 계산에 포함됩니다. 예: 100달러 주식을 1,100달러에 팔고, 취득환율 1,200원/달러, 양도환율 1,300달러/원이면 (130만원 − 120만원) − 공제 = 세금 대상.',
  },
  {
    question: '증권사의 양도소득세 대행신고 서비스를 쓸 수 있나요?',
    answer:
      '일부 증권사가 편의 서비스로 기본정보 제출만으로 세무신고를 돕는 경우가 있습니다. 다만 최종 신고 책임은 본인에게 있으므로, 증권사 서비스를 이용해도 반드시 국세청 홈택스에서 확정신고 상태를 확인하세요.',
  },
  {
    question: '미국에서도 세금을 내야 하면 한국에서 다시 내야 하나요?',
    answer:
      '미국은 개인의 주식 양도차익에 원천징수를 하지 않으므로 미국 세금 부담은 보통 없습니다. 다만 다른 국가에서 양도소득세를 냈다면 외국납부세액공제를 신청해 한국 세금에서 공제받을 수 있습니다(소득세법 §118의7). 상세한 절차는 국세청에 문의하세요.',
  },
  {
    question: '개인형 IRA나 401k 내 주식 매도는 양도소득세 대상인가요?',
    answer:
      '미국의 IRA나 401k는 은퇴자산 계정으로, 계정 내 주식 매도는 미국에서는 비과세입니다. 하지만 향후 인출 시 소득으로 과세되므로 한국 세무와 이중과세 문제가 복잡합니다. ISA나 연금계좌 내 해외주식과는 별도 규칙이 적용되므로 세무전문가에게 상담받으세요.',
  },
  {
    question: '해외주식 기록(거래내역)이 없으면 어떻게 하나요?',
    answer:
      '증권사 거래 명세서가 1차 증거입니다. 국내 증권계좌 내역, 은행 해외송금 기록, 증권사 년도별 보고서 등을 수집해서 신고하세요. 기록이 불충분하면 국세청 조사 시 세금을 추가로 낼 수 있으므로, 가능한 한 상세히 정리해 신고하는 것이 안전합니다.',
  },
];

export default function OverseasStockCapitalGainsTax2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '해외주식 양도소득세 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '해외주식 양도소득세 2026 — 미국주식 매도 시 세금 정산법',
    description:
      '해외주식 양도차익에 연 250만원 기본공제, 22% 세율 적용. 거래일 기준환율로 환산하고 다음해 5월 확정신고. 손익통산·환차익·외국납부세액공제까지 완전 정리.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['해외주식 양도소득세', '미국주식 세금', '국외자산', '250만원 공제', '22% 세율'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '해외주식 양도소득세 2026',
    description:
      '미국주식 등 해외주식 매도 시 양도소득세 계산·신고 완전 가이드.',
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
                    { name: '해외주식 양도소득세 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">해외투자자 · 7분 읽기 · 2026-07-09</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  해외주식 양도소득세 2026
                  <br />
                  <span className="text-2xl text-text-secondary">— 250만원 공제·22% 세율·5월 신고</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  미국주식, 홍콩 ETF, 인도 종목 등 해외에서 주식을 매도할 때 한국에 양도소득세를 내야 합니다. 하지만 국내주식과 달리 신고 시점, 공제액, 환율 기준일이 다르기 때문에 실수하기 쉽습니다. 이 가이드는 소득세법 §118의2에 따른 해외주식 양도소득세의 정확한 계산법, 250만원 기본공제, 22% 세율, 다음해 5월 신고 절차까지 완전히 정리해드립니다.
                </p>
              </header>

              <AdSlot slot="guide-overseas-stock-capital-gains-tax-top" format="horizontal" />

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">해외주식 양도소득세란</h2>
                <p>
                  해외주식 양도소득세는 국외에서 구매한 주식, ETF, 채권 등을 매도할 때 발생하는 차익에 대해 한국 정부가 부과하는 세금입니다(소득세법 §118의2). 미국주식이 가장 흔하지만, 홍콩 증시, 싱가포르 거래소, 일본 거래소 등 세계 어디에서 거래하든 한국 거주자라면 이 세금이 적용됩니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">해외주식 양도소득세 기본 원리</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    양도차익 = (양도가액 − 취득가액 − 필요경비), 각각을 거래일 기준환율로 원화 환산
                    <br />
                    과세표준 = 양도차익 − 기본공제 250만원
                    <br />
                    세액 = 과세표준 × 22% (양도소득세 20% + 지방소득세 2%)
                    <br />
                    <br />
                    예: 양도차익 1,000만원 → (1,000 − 250) × 22% = <strong>165만원</strong>
                  </p>
                </div>
                <p className="mt-4">
                  국내주식 양도소득세와의 가장 큰 차이는 신고 시점입니다. 국내주식은 거래 당해연도 간접 지정, 해외주식은 다음해 5월 확정신고로 정산합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">기본공제 250만원 — 연간 한도</h2>
                <p>
                  해외주식 양도소득에는 연 250만원의 기본공제가 적용됩니다(소득세법 §118의2). 이는 국내 대주주 등 다른 양도소득과 합산되지만, 총 공제액은 250만원이 최대입니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 해외주식 양도차익별 세금 계산 (250만원 공제 적용)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">양도차익</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">공제 후 과세표준</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">세액 (22%)</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">납부액</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">200만원</td>
                        <td className="p-3">0원 (공제만)</td>
                        <td className="p-3">0원</td>
                        <td className="p-3"><strong>0원</strong></td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">500만원</td>
                        <td className="p-3">250만원</td>
                        <td className="p-3">55만원</td>
                        <td className="p-3"><strong>55만원</strong></td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">1,000만원</td>
                        <td className="p-3">750만원</td>
                        <td className="p-3">165만원</td>
                        <td className="p-3"><strong>165만원</strong></td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">5,000만원</td>
                        <td className="p-3">4,750만원</td>
                        <td className="p-3">1,045만원</td>
                        <td className="p-3"><strong>1,045만원</strong></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  ⚠️ 다만 국내 대주주 양도소득이 동일 과세년도에 있다면, 둘을 합산한 후 총 250만원 공제를 한 번만 적용합니다. 예를 들어 해외주식 차익 300만원 + 국내주식 차익 300만원 = 총 600만원이면, (600 − 250) × 22% = 77만원을 납부합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">22% 세율 구성 — 양도소득세 20% + 지방소득세 2%</h2>
                <p>
                  해외주식 양도소득세의 세율은 일정합니다(소득세법 §118의7). 누진세가 아니라 모든 양도차익에 22% 균일 세율이 적용됩니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">세율 구성</p>
                  <p className="text-sm text-text-secondary">
                    · 양도소득세 기본세율: <strong>20%</strong> (소득세법 §118의7)
                    <br />
                    · 지방소득세: 기본세율의 <strong>10%</strong> = 2% (지방세법 §103)
                    <br />
                    · 합계: <strong>22%</strong> (별도 공시, 추가 부가세 없음)
                  </p>
                </div>
                <p className="mt-4">
                  국내 대주주 양도소득의 누진세(12~42%)와 다르게, 해외주식은 차익 크기와 상관없이 항상 22% 균일입니다.
                </p>
                <p className="mt-4">
                  ⚠️ 다만 외국에서 이미 양도소득세를 낸 경우, 외국납부세액공제를 신청해 한국 세금에서 그 금액만큼 공제받을 수 있습니다. 미국은 개인 주식 양도에 원천징수를 하지 않으므로 보통 미국 세금 부담이 없지만, 다른 국가는 다를 수 있으니 확인하세요.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">양도차익 계산 — 거래일 기준환율</h2>
                <p>
                  해외주식의 양도차익을 계산할 때 가장 중요한 원칙은 취득가와 양도가를 각각의 거래일 기준환율로 원화 환산한다는 것입니다(소득세법 §118의4).
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">계산 공식</p>
                  <p className="text-sm text-text-secondary">
                    양도차익 = (양도가액(원화) − 취득가액(원화)) − 필요경비
                    <br />
                    <br />
                    양도가액(원화) = 양도가(외화) × 양도일 기준환율
                    <br />
                    취득가액(원화) = 취득가(외화) × 취득일 기준환율
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례: 애플주식 100주 매도</p>
                  <p className="text-sm text-text-secondary">
                    · 취득: 2024년 1월, $100/주 × 100주 = $10,000, 환율 1,200원/달러 → 1,200만원
                    <br />
                    · 양도: 2026년 6월, $150/주 × 100주 = $15,000, 환율 1,300원/달러 → 1,950만원
                    <br />
                    · 양도차익 = 1,950만 − 1,200만 = <strong>750만원</strong>
                    <br />
                    · 과세표준 = 750 − 250 = 500만원
                    <br />
                    · 세액 = 500만 × 22% = <strong>110만원</strong>
                    <br />
                    <span className="text-xs text-text-tertiary">주의: 환차익(200만원) + 주식가격 상승(550만원) = 총 750만원이 과세 대상.</span>
                  </p>
                </div>
                <p className="mt-4">
                  기준환율은 국세청이 매일 공시하는 기준환율을 사용합니다. 금융기관에서 실제로 거래한 환율과는 다를 수 있으므로, 신고 시 반드시 국세청 환율표를 확인하세요.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">손익통산 — 같은 연도 이익·손실 상계</h2>
                <p>
                  해외주식 거래에서 이익이 난 종목도 있고 손실이 난 종목도 있다면, 같은 과세연도(1월~12월) 내에서 모두 통산합니다(소득세법 §118의4).
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">손익통산 사례</p>
                  <p className="text-sm text-text-secondary">
                    · 애플 매도 이익: 750만원
                    <br />
                    · 테슬라 매도 손실: −200만원
                    <br />
                    · 마이크로소프트 매도 이익: 300만원
                    <br />
                    · 순익 = 750 − 200 + 300 = <strong>850만원</strong>
                    <br />
                    · 과세표준 = 850 − 250 = 600만원
                    <br />
                    · 세액 = 600 × 22% = <strong>132만원</strong>
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 손실 종목이 250만원 공제를 먼저 상계하고, 남은 순익에 22% 세금 부과.</span>
                  </p>
                </div>
                <p className="mt-4">
                  ⚠️ 다만 손실을 다음해로 이월할 수는 없습니다. 2026년 손실이 2027년 이익과 통산되지 않으므로, 해마다 독립적으로 계산해야 합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">신고 절차 — 5월 확정신고</h2>
                <p>
                  해외주식을 매도한 해의 다음해 5월 1일~31일에 확정신고를 합니다(소득세법 §118의2). 국내주식과 달리 예정신고가 없으므로, 5월에 한 번만 신고하면 됩니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">신고 타이밍</p>
                  <p className="text-sm text-text-secondary">
                    · 2026년 해외주식 매도 → 2027년 5월 1~31일 신고
                    <br />
                    · 2027년 해외주식 매도 → 2028년 5월 1~31일 신고
                    <br />
                    · 기한 후 신고 시 가산세(무신고세 20~30%) 부과됨
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">신고 방법</p>
                  <p className="text-sm text-text-secondary">
                    1. 국세청 홈택스(hometax.go.kr) 접속
                    <br />
                    2. 상단 메뉴 → 신고납부 → 신고 선택
                    <br />
                    3. 종합소득세 확정신고 선택
                    <br />
                    4. 기타소득(또는 양도소득) 항목에 해외주식 데이터 입력
                    <br />
                    5. 해외주식 거래 명세서 첨부 (증권사 거래내역서)
                    <br />
                    6. 신고 제출 및 납부 (5월 말까지)
                  </p>
                </div>
                <p className="mt-4">
                  일부 증권사는 기본정보 제출만으로 세무신고를 돕는 서비스를 제공하기도 합니다. 다만 최종 신고 책임은 본인이므로, 반드시 홈택스에서 신고 상태를 확인하세요.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">외국납부세액공제 — 중복과세 방지</h2>
                <p>
                  다른 국가에서 해외주식 양도소득세를 이미 냈다면, 한국 세금에서 그 금액만큼 공제받을 수 있습니다(소득세법 §118의7). 다만 미국은 개인의 주식 양도에 원천징수를 하지 않으므로 보통 미국에서의 세금 부담이 없습니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">외국납부세액공제 적용 조건</p>
                  <p className="text-sm text-text-secondary">
                    · 다른 국가에서 해외주식 양도에 대해 세금을 냈을 것
                    <br />
                    · 그 국가의 세금이 한국에서 부과하는 세금 이하일 것 (초과분은 공제 불가)
                    <br />
                    · 공제신청 전 해당 국가 세금 납부 증명서 보유
                  </p>
                </div>
                <p className="mt-4">
                  ⚠️ 다만 미국의 IRA, 401k 등 은퇴계좌 내 주식 양도나, 싱가포르 등 다른 국가의 특수 계좌 내 거래는 이중과세 규정이 복잡하므로 세무전문가와 상담하는 것이 안전합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">필요한 기록과 증거 — 신고 준비물</h2>
                <p>
                  해외주식 양도소득세를 신고할 때는 다음 기록들을 반드시 준비해야 합니다.
                </p>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li>
                    <strong>증권사 거래명세서:</strong> 각 종목별 취득일, 취득가(외화), 양도일, 양도가(외화), 거래수량, 거래수수료 등. 국내 증권사를 통한 거래면 한글 명세서, 해외 증권사면 영문 명세서 필수.
                  </li>
                  <li>
                    <strong>은행 해외송금 기록:</strong> 초기 투자금 송금 기록 (왕복 송금 명세서, 송금 수수료 포함).
                  </li>
                  <li>
                    <strong>환율 확인 기록:</strong> 국세청 기준환율(stat.kita.net 또는 KOSTAT 공시환율) 또는 거래일 환율 기록. 증권사가 환산 기준환율을 표시해주는 경우도 있음.
                  </li>
                  <li>
                    <strong>배당금/이자 기록:</strong> 해외주식에서 받은 배당금이나 채권이자도 별도로 신고 대상일 수 있으니 기록 보관.
                  </li>
                </ul>
                <p className="mt-4">
                  기록이 불충분하면 국세청 조사 시 세금을 추가로 낼 수 있으므로, 매년 거래가 끝난 후 정리본을 만들어 3년 이상 보관하는 것이 안전합니다.
                </p>
              </section>

              <AdSlot slot="guide-overseas-stock-capital-gains-tax-mid" format="rectangle" />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h2 className="text-2xl font-bold">ISA, 연금계좌 내 해외주식과의 차이</h2>
                <p>
                  일반 계좌의 해외주식 양도소득세와 특수 계좌(ISA, 연금계좌) 내 해외주식의 세금 처리는 매우 다릅니다.
                </p>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li>
                    <strong>ISA(개인종합자산관리계좌):</strong> ISA 내에서 거래하는 국내·외 주식은 연 400만원(청년 600만원) 이익까지 세금이 없습니다. 해외주식 매도 차익도 ISA 한도 내이면 비과세입니다.
                  </li>
                  <li>
                    <strong>개인연금계좌(IRP):</strong> IRP 내 해외주식 매도는 계좌 내에서는 비과세이지만, 향후 인출 시 소득으로 과세됩니다. 운용수익 전체가 과세 대상이 됩니다.
                  </li>
                  <li>
                    <strong>일반과세계좌:</strong> 이 가이드가 설명하는 250만원 공제, 22% 세율이 적용됩니다.
                  </li>
                </ul>
                <p className="mt-4">
                  ⚠️ 다만 해외 은퇴계좌(미국 IRA, 401k 등)는 한국 세무와 이중과세 문제가 발생할 수 있으므로, 이 경우는 반드시 세무전문가에게 상담받으세요.
                </p>
              </section>

              <h2 className="text-2xl font-bold mb-6">자주 묻는 질문</h2>
              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h3 className="text-lg font-semibold text-text-primary">관련 계산기 및 가이드</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link
                    href="/guide/financial-income-comprehensive-vs-separate-taxation/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">금융소득 종합과세 vs 분리과세</div>
                    <p className="mt-1 text-sm text-text-secondary">이자·배당금 2,000만원 기준과 누진세 계산.</p>
                  </Link>
                  <Link
                    href="/calculator/capital-gains-tax/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">양도소득세 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">부동산 양도세를 계산하고 절세 전략을 세우세요.</p>
                  </Link>
                  <Link
                    href="/guide/capital-gains-tax-5-steps/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">양도소득세 5단계 이해</div>
                    <p className="mt-1 text-sm text-text-secondary">과세표준·누진공제·보유기간 세율까지 완전 가이드.</p>
                  </Link>
                  <Link
                    href="/guide/isa-account-tax-benefit-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">ISA 계좌 세금 혜택 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">400만원 이익 비과세와 해외주식 활용.</p>
                  </Link>
                  <Link
                    href="/category/tax/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">모든 세금 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">소득세·양도세·상속세·증여세 모음.</p>
                  </Link>
                  <Link
                    href="/category/finance/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">투자 수익 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">배당금·이자·복리 계산까지 한 곳에서.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 교육 목적으로 작성되었으며, 개인 맞춤형 세무 조언이 아닙니다. 해외주식 양도소득세 신고 시 실제 환율, 거래 기록, 필요경비 계산은 개별 상황에 따라 달라질 수 있습니다. 특히 외국 세금이 있거나 은퇴계좌를 활용한 경우, 이중과세 문제가 발생할 수 있으므로 반드시 세무전문가 또는 국세청에 문의하세요. 본 콘텐츠는 2026-07-09을 기준으로 작성되었으며, 소득세법 개정 시 즉시 업데이트됩니다. 해외주식 양도소득세의 정확한 기준은 법조항 <strong>소득세법 §118의2(국외자산 양도소득의 범위), §118의4(양도차익 계산), §118의7(세율)</strong>을 따릅니다. AI 보조 작성 후 운영자 검수 완료.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터</a>,{' '}
                  <a href="https://hometax.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">국세청 홈택스 (확정신고)</a>,{' '}
                  <a href="https://www.nts.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">국세청 공식사이트</a>.
                </p>
              </section>

              <ShareButtons
                title="해외주식 양도소득세 2026 완벽 가이드"
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
