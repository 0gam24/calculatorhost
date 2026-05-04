import type { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { Footer } from '@/components/layout/Footer';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { AdSlot } from '@/components/ads/AdSlot';
import { StructuredSummary } from '@/components/calculator/StructuredSummary';
import { FaqSection } from '@/components/calculator/FaqSection';
import { RelatedCalculators } from '@/components/calculator/RelatedCalculators';
import {
  buildSoftwareApplicationJsonLd,
  buildFaqPageJsonLd,
  buildBreadcrumbJsonLd,
  buildWebPageJsonLd,
  getCategoryUrlForCalculator,
  buildHowToJsonLd,
  buildSpeakableJsonLd,
} from '@/lib/seo/jsonld';
import { ExchangeCalculator } from './ExchangeCalculator';
import { AuthorByline } from '@/components/calculator/AuthorByline';

const URL = 'https://calculatorhost.com/calculator/exchange/';

export const metadata: Metadata = {
  title: '환율·환전 계산기 2026 | 스프레드·수수료 반영 | calculatorhost',
  description:
    '2026년 환율·환전 계산기. 기준환율·스프레드·수수료를 입력해 실제 수령액과 실질 환율을 즉시 계산. 원→외화·외화→원 양방향 지원.',
  alternates: { canonical: URL },
  openGraph: {
    title: '환율·환전 계산기 2026 — 스프레드·수수료 반영',
    description:
      '기준환율·스프레드·수수료로 실제 환전액과 실질 환율을 계산합니다.',
    url: URL,
    type: 'website',
    images: ['/og-default.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: '환율·환전 계산기 2026',
    description: '실시간 기준환율·은행 스프레드·수수료를 반영한 환전액 계산.',
  },
};

const FAQ_ITEMS = [
  {
    question: '기준환율과 실제 환율(적용환율)의 차이는 무엇인가요?',
    answer:
      '기준환율은 한국은행이 매일 발표하는 중간값입니다. 하지만 실제로 환전할 때는 은행이 "스프레드(bid-ask spread)"를 더해 책정한 적용환율을 사용합니다. 원→외화(매도)일 때는 기준환율보다 높은 환율을, 외화→원(매입)일 때는 낮은 환율을 제시합니다. 예: 기준환율 1350인데도 매도는 1370, 매입은 1330 같은 식입니다.',
  },
  {
    question: '은행 스프레드는 얼마나 되나요?',
    answer:
      '스프레드는 은행마다, 거래 방식마다 다릅니다. 일반적으로 물리적 환전(현금)은 1~2%, 송금은 0.5~1.5%, 카드/여행자수표는 2~3% 정도입니다. 본 계산기는 기본값 1.5%를 제시하지만, 실제 거래 전에 은행에 문의해 정확한 스프레드를 확인하세요.',
  },
  {
    question: '수수료는 언제 발생하나요?',
    answer:
      '환전·송금·카드 발급 등 거래마다 발생합니다. 은행 송금은 보통 정액 수수료(5,000~15,000원), 카드 현금화는 % 수수료(2~3%), 여행자수표는 1~2% 정도입니다. 본 계산기는 % 수수료와 정액 수수료를 동시에 반영합니다.',
  },
  {
    question: '실질환율은 어떻게 해석하나요?',
    answer:
      '실질환율은 스프레드와 수수료를 모두 반영한 "내가 실제로 적용받는 환율"입니다. 예: 원→외화 시 실질환율 1400이면, 1원당 1400의 외화를 받는 것보다 적게 받는다는 뜻입니다. 따라서 기준환율과 실질환율의 차이가 클수록 은행 수수료가 크다는 의미입니다.',
  },
  {
    question: '송금 환율 vs 매매 환율은 뭐가 다른가요?',
    answer:
      '해외송금(T/T 송금)은 별도의 송금환율을 쓰며, 보통 기준환율보다 약간 낮습니다(매입 기준). 현금 매매는 현장에서 즉시 거래하는 환율을 쓰므로 더 타이트한 스프레드를 적용합니다. 본 계산기는 일반적인 현금 매매 기준이며, 송금은 별도 수수료와 환율을 은행에 확인하세요.',
  },
  {
    question: '여행자수표나 트래블카드로 하면 환전이 더 유리한가요?',
    answer:
      '일반적으로 여행자수표와 트래블카드는 현금 환전보다 스프레드가 작지만, 발급 수수료와 사용 수수료가 있어 결과적으로는 비슷하거나 더 비쌀 수 있습니다. 일회성 소액 환전은 현금, 장기 해외생활은 트래블카드, 정기 송금은 송금 서비스 이용이 효율적입니다.',
  },
  {
    question: '앞으로 환율이 오를까요? 계산기는 투자 조언인가요?',
    answer:
      '본 계산기는 현재 환율로 "얼마나 환전할 수 있는가"를 계산합니다. 환율 움직임 예측은 금융 전문가 상담이 필요하며, 본 서비스는 투자 조언이 아닙니다. 본인의 환전 필요액을 정확히 파악하고, 환율과 수수료를 모두 고려해 결정하세요.',
  },
  {
    question: '환전 수수료를 절약하는 방법이 있나요?',
    answer:
      '환전 수수료 절약 팁: (1) 대량 환전 시 협상 가능한 은행 이용, (2) 신용카드 대신 체크카드 해외 사용 고려(직수수, 수수료 1~2%), (3) 해외 ATM 이용(스프레드는 크지만 정액 수수료 회피), (4) P2P 환전 서비스(합법 범위), (5) 국내 수령 후 출국 (해외보다 국내가 유리) 등이 있습니다.',
  },
];

const RELATED = [
  {
    href: '/calculator/savings',
    title: '적금 이자',
    description: '단리·복리 이자 계산',
  },
  {
    href: '/calculator/deposit',
    title: '예금 이자',
    description: '예금 만기 이자 및 세금',
  },
  {
    href: '/calculator/loan',
    title: '대출이자',
    description: '월 상환액·총 이자 계산',
  },
];

export default function ExchangePage() {
  const softwareLd = buildSoftwareApplicationJsonLd({
    name: '환율·환전 계산기',
    description:
      '기준환율, 스프레드, 수수료를 입력해 실제 환전액과 실질 환율을 즉시 계산합니다. 원→외화, 외화→원 양방향 지원.',
    url: URL,
  });
  const webPageLd = buildWebPageJsonLd({
    name: '환율·환전 계산기 2026',
    description: '실시간 기준환율·은행 스프레드·수수료를 반영한 환전액 계산',
    url: URL,
    datePublished: '2026-04-24',
    dateModified: '2026-04-27',
    isPartOf: getCategoryUrlForCalculator('exchange'),
  });
  const howToLd = buildHowToJsonLd({
    name: '환율·환전 계산기 사용 방법',
    description: '기준환율, 스프레드, 수수료를 입력하여 실제 환전액을 계산하는 단계별 가이드',
    steps: [
      { name: '환전 방향 선택', text: '원→외화 또는 외화→원 중 원하는 방향을 선택합니다.' },
      { name: '기준환율 입력', text: '한국은행 기준환율(또는 은행 적용환율)을 입력합니다.' },
      { name: '스프레드 입력', text: '은행이 정한 스프레드(%) 또는 수수료(원)를 입력합니다.' },
      { name: '환전액 입력', text: '환전하려는 금액(원 또는 외화)을 입력합니다.' },
      { name: '결과 확인', text: '실제 수령액과 실질 환율을 확인합니다.' },
    ],
  });
  const faqLd = buildFaqPageJsonLd(
    FAQ_ITEMS.map((f) => ({ question: f.question, answer: f.answer }))
  );
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '금융', url: 'https://calculatorhost.com/category/finance/' },
    { name: '환율' },
  ]);
  const speakableLd = buildSpeakableJsonLd(['[data-speakable]']);

  return (
    <div className="flex min-h-screen flex-col bg-bg-base text-text-primary">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableLd) }}
      />
      <Header />
      <div className="flex flex-1 flex-col lg:flex-row">
        <Sidebar />
        <main id="main-content" className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
          <article className="mx-auto max-w-4xl">
            {/* 헤더 */}
            <Breadcrumb
              items={[
                { name: '홈', href: '/' },
                { name: '금융', href: '/category/finance/' },
                { name: '환율·환전' },
              ]}
            />
            <h1 className="text-4xl font-bold tracking-tight">
              환율·환전 계산기 2026
            </h1>
            <p className="mt-4 text-lg text-text-secondary">
              기준환율과 은행 스프레드, 수수료를 반영한 실제 환전액과 실질
              환율을 즉시 계산하세요. 원화에서 외화로, 외화에서 원화로 양방향
              지원합니다.
            </p>
            <AuthorByline datePublished="2026-04-24" dateModified="2026-04-27" />

            {/* Structured Summary */}
            <StructuredSummary
              definition="환율 계산기는 기준환율에 은행 스프레드와 수수료를 적용해, 실제 받게 될 환전액을 계산하는 도구입니다. 원화를 외화로 바꿀 때와 외화를 원화로 바꿀 때 적용되는 환율이 다르며, 각각 은행의 매도/매입 환율과 수수료가 영향을 미칩니다."
              table={{
                caption: '환율 계산 핵심 항목',
                headers: ['항목', '설명'],
                rows: [
                  ['기준환율', '한국은행 공시 중간값'],
                  ['적용환율', '스프레드 포함 실제 환율'],
                  ['실질환율', '수수료까지 반영한 최종 환율'],
                ],
              }}
              tldr={[
                '기준환율은 한국은행이 매일 발표하는 중간값입니다.',
                '은행은 스프레드(1~2%)를 더해 실제 환율을 책정합니다.',
                '수수료까지 고려하면 실질환율은 기준환율과 크게 다를 수 있습니다.',
              ]}
            />

            {/* AD-1 헤더 광고 */}
            <div className="my-8">
              <AdSlot slot="exchange-top" format="horizontal" />
            </div>

            {/* 계산기 폼 */}
            <ExchangeCalculator />

            {/* AD-2 중간 광고 */}
            <div className="my-8">
            </div>

            {/* FAQ */}
            <FaqSection items={FAQ_ITEMS} />

            {/* 환율 설명 */}
            <section className="mt-12 space-y-6">
              <h2 className="text-2xl font-bold">환율·환전이란 무엇인가요?</h2>
              <p>
                환율은 한 나라 통화를 다른 나라 통화로 바꿀 때의 가격입니다.
                예를 들어, 기준환율이 USD 1 = KRW 1,350이면, 달러 1달러를
                1,350원에 교환할 수 있다는 뜻입니다. 하지만 실제로는 은행이 수익을
                위해 매도/매입 환율을 다르게 책정하고, 거래 수수료를 징수합니다.
              </p>
              <p>
                한국은행은 매일 오전 중앙은행 기준환율(중간값)을 발표합니다.
                이것이 바로 뉴스에 나오는 "오늘 환율"입니다. 하지만 은행 창구나
                환전소에서는 이 기준환율을 그대로 쓰지 않고, 은행의 거래비용과
                수익을 반영한 "매도/매입 환율"을 쓰며, 여기에 거래 수수료를
                추가합니다.
              </p>
            </section>

            {/* 계산 공식 */}
            <section className="mt-12 space-y-6">
              <h2 className="text-2xl font-bold">환율 계산 공식</h2>
              <div className="space-y-4">
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <h3 className="font-semibold">원 → 외화 (매도)</h3>
                  <code className="mt-2 block text-sm">
                    적용환율 = 기준환율 × (1 + 스프레드%)
                  </code>
                  <code className="mt-1 block text-sm">
                    받을외화 = 환전원화 ÷ 적용환율
                  </code>
                  <code className="mt-1 block text-sm">
                    최종수령액 = 받을외화 - 수수료
                  </code>
                  <p className="mt-3 text-sm text-text-secondary">
                    은행이 기준환율보다 높은 환율을 제시하므로, 실제로 받는
                    외화는 계산보다 적습니다.
                  </p>
                </div>

                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <h3 className="font-semibold">외화 → 원 (매입)</h3>
                  <code className="mt-2 block text-sm">
                    적용환율 = 기준환율 × (1 - 스프레드%)
                  </code>
                  <code className="mt-1 block text-sm">
                    받을원화 = 환전외화 × 적용환율
                  </code>
                  <code className="mt-1 block text-sm">
                    최종수령액 = 받을원화 - 수수료
                  </code>
                  <p className="mt-3 text-sm text-text-secondary">
                    은행이 기준환율보다 낮은 환율을 제시하므로, 실제로 받는
                    원화는 계산보다 적습니다.
                  </p>
                </div>
              </div>
            </section>

            {/* 거래 방식별 환율 비교 */}
            <section className="mt-12 space-y-6">
              <h2 className="text-2xl font-bold">거래 방식별 환율 및 수수료 비교</h2>
              <p className="text-text-secondary">
                같은 금액을 환전하더라도 거래 방식에 따라 실질 환율과 수수료가 크게 다릅니다. 상황별로 최적의 방식을 선택하세요.
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-primary-500/10 border border-border-base">
                      <th className="px-4 py-3 text-left font-semibold">거래 방식</th>
                      <th className="px-4 py-3 text-center font-semibold">스프레드</th>
                      <th className="px-4 py-3 text-center font-semibold">수수료</th>
                      <th className="px-4 py-3 text-left font-semibold">장점·단점</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border border-border-base">
                      <td className="px-4 py-3 font-medium">은행 현금 환전</td>
                      <td className="px-4 py-3 text-center">1.0~2.0%</td>
                      <td className="px-4 py-3 text-center">없음</td>
                      <td className="px-4 py-3 text-text-secondary">안전, 스프레드 상대적 높음</td>
                    </tr>
                    <tr className="border border-border-base bg-bg-card/50">
                      <td className="px-4 py-3 font-medium">해외 송금</td>
                      <td className="px-4 py-3 text-center">1.0~1.5%</td>
                      <td className="px-4 py-3 text-center">5,000~15,000원</td>
                      <td className="px-4 py-3 text-text-secondary">대액 송금에 유리, 정액 수수료</td>
                    </tr>
                    <tr className="border border-border-base">
                      <td className="px-4 py-3 font-medium">신용카드(해외)</td>
                      <td className="px-4 py-3 text-center">1.5~2.0%</td>
                      <td className="px-4 py-3 text-center">1~2%</td>
                      <td className="px-4 py-3 text-text-secondary">편리, 총 수수료 높음</td>
                    </tr>
                    <tr className="border border-border-base bg-bg-card/50">
                      <td className="px-4 py-3 font-medium">여행자수표</td>
                      <td className="px-4 py-3 text-center">0.5~1.0%</td>
                      <td className="px-4 py-3 text-center">1~2%</td>
                      <td className="px-4 py-3 text-text-secondary">안전, 발급 수수료 추가</td>
                    </tr>
                    <tr className="border border-border-base">
                      <td className="px-4 py-3 font-medium">해외 ATM</td>
                      <td className="px-4 py-3 text-center">1.0~3.0%</td>
                      <td className="px-4 py-3 text-center">2,000~5,000원</td>
                      <td className="px-4 py-3 text-text-secondary">정액 수수료, 소액 환전 유리</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* 상황별 환전 전략 */}
            <section className="mt-12 space-y-6">
              <h2 className="text-2xl font-bold">상황별 환전 전략 가이드</h2>
              <div className="space-y-4">
                <div className="rounded-lg border-l-4 border-primary-500 bg-bg-card p-4">
                  <h3 className="font-semibold text-primary-500 mb-2">단기 해외 여행 (1~2주)</h3>
                  <p className="text-sm text-text-secondary mb-2">
                    현금 환전 또는 신용카드 병행. 현금은 필요액의 30~50%만 준비하고, 나머지는 카드 사용.
                    출국 3일 전 은행에서 현금 환전하면 환율 변동을 피할 수 있습니다. 예상 지출: 500만 원이면 현금 200만 원 + 카드.
                  </p>
                </div>
                <div className="rounded-lg border-l-4 border-secondary-500 bg-bg-card p-4">
                  <h3 className="font-semibold text-secondary-500 mb-2">해외 유학 또는 장기 체류 (3개월+)</h3>
                  <p className="text-sm text-text-secondary mb-2">
                    해외 송금 또는 트래블카드 추천. 대액 송금 시 은행에 우대 환율 협상 가능. 거액이면 분할 송금도 검토.
                    현지 은행 개설 후 현지 송금이 더 저렴할 수 있으므로 도착 후 확인하세요.
                  </p>
                </div>
                <div className="rounded-lg border-l-4 border-highlight-500 bg-bg-card p-4">
                  <h3 className="font-semibold text-highlight-500 mb-2">사업 관련 정기 송금</h3>
                  <p className="text-sm text-text-secondary mb-2">
                    고정 송금은 은행의 "수시 송금" 또는 "정액 송금" 상품 이용. VIP 고객 대우 시 우대 환율 가능.
                    월 1,000만 원 이상이면 은행 관리자에게 직접 상담 요청해 수수료 인하 협상하세요.
                  </p>
                </div>
                <div className="rounded-lg border-l-4 border-danger-500 bg-bg-card p-4">
                  <h3 className="font-semibold text-danger-500 mb-2">긴급 소액 환전</h3>
                  <p className="text-sm text-text-secondary mb-2">
                    해외 ATM 이용이 가장 빠름. 수수료는 약간 높지만 대기 시간이 없고, 현지 화폐를 즉시 확보 가능.
                    카드사 환율 + 정액 수수료 방식이므로, 100만 원 이상이면 현지 환전소 추가 확인.
                  </p>
                </div>
              </div>
            </section>

            {/* 주의사항 */}
            <section className="mt-12 space-y-6">
              <h2 className="text-2xl font-bold">환율 거래 시 주의사항</h2>
              <ul className="list-inside list-disc space-y-2 text-text-secondary">
                <li>
                  본 계산기의 결과는 참고용입니다. 실제 환율과 수수료는 거래 시점,
                  은행, 거래 방식에 따라 달라질 수 있습니다.
                </li>
                <li>
                  기준환율은 한국은행이 매일 오전 10시 30분경 발표하며, 오후에는 변동합니다.
                  가장 유리한 환율 기준은 매일 다르므로, 거래 직전에 신문이나 은행 홈페이지에서 확인하세요.
                </li>
                <li>
                  현금 환전, 송금, 카드 거래는 서로 다른 환율과 수수료를
                  적용합니다. 거래 전 은행에 정확히 확인하세요.
                </li>
                <li>
                  해외 ATM, P2P 환전, 환전소 등 다양한 방법이 있습니다. 금액·상황에 따라 최적의 방법을 선택하세요.
                  불법 거래나 추천하지 않는 채널은 피하고, 공식 금융기관 이용을 권합니다.
                </li>
                <li>
                  본 계산기는 금융 투자 조언이 아니며, 환율 상승/하락 예측 자료가
                  아닙니다. 환율 변동 위험을 자체적으로 판단하고 거래하세요.
                </li>
                <li>
                  대액 환전 (1,000만 원 이상)은 신분증 확인 및 특정 금융거래 보고서 제출이 필요할 수 있습니다.
                  사전에 은행에 문의하세요.
                </li>
              </ul>
            </section>

            {/* 환율 절약 팁 */}
            <section className="mt-12 space-y-6">
              <h2 className="text-2xl font-bold">환전 수수료 절약 팁</h2>
              <div className="space-y-3">
                <div className="rounded-lg border-l-4 border-highlight-500 bg-bg-card p-4">
                  <h3 className="font-semibold">1. 대량 환전</h3>
                  <p className="mt-2 text-sm text-text-secondary">
                    대액 환전 시 은행 VIP 고객을 위한 우대 환율을 받을 수 있습니다.
                  </p>
                </div>

                <div className="rounded-lg border-l-4 border-highlight-500 bg-bg-card p-4">
                  <h3 className="font-semibold">2. 거래 방식 비교</h3>
                  <p className="mt-2 text-sm text-text-secondary">
                    현금 환전 &gt; 송금 &gt; 카드 사용 순으로 실질 환율이 유리할 수
                    있습니다. 상황에 맞춰 선택하세요.
                  </p>
                </div>

                <div className="rounded-lg border-l-4 border-highlight-500 bg-bg-card p-4">
                  <h3 className="font-semibold">3. 체크카드 해외 사용</h3>
                  <p className="mt-2 text-sm text-text-secondary">
                    신용카드보다 체크카드가 수수료가 낮을 수 있습니다. 수수료 없는
                    상품도 있으니 확인하세요.
                  </p>
                </div>

                <div className="rounded-lg border-l-4 border-highlight-500 bg-bg-card p-4">
                  <h3 className="font-semibold">4. 해외 ATM 활용</h3>
                  <p className="mt-2 text-sm text-text-secondary">
                    정액 수수료만 내면 되어, 큰 금액 환전 시 % 수수료보다
                    유리할 수 있습니다.
                  </p>
                </div>

                <div className="rounded-lg border-l-4 border-highlight-500 bg-bg-card p-4">
                  <h3 className="font-semibold">5. 환전소 비교</h3>
                  <p className="mt-2 text-sm text-text-secondary">
                    공항 환전소는 편하지만 수수료가 높습니다. 일반 환전소가 더
                    저렴할 수 있으니 비교하세요.
                  </p>
                </div>
              </div>
            </section>

            {/* AD-4 인피드 광고 */}
            <div className="my-8">
            </div>

            {/* 관련 계산기 */}
            <RelatedCalculators items={RELATED} />

            {/* 업데이트 로그 */}
            <section className="mt-12 border-t border-border-base pt-6">
              <h2 className="text-lg font-semibold">업데이트 로그</h2>
              <ul className="mt-3 space-y-2 text-sm text-text-secondary">
                <li>2026-04-24: 초판 발행 (2026 기준환율 반영)</li>
              </ul>
            </section>

            {/* 출처·면책 */}
            <section className="mt-6 border-t border-border-base pt-6 mb-6">
              <p className="text-xs text-text-secondary mb-2">
                <strong>공식 출처</strong>: 한국은행 <a href="https://ecos.bok.or.kr" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-600 underline dark:text-primary-500">ECOS(경제통계시스템)</a> 기준환율 데이터, <a href="https://www.koreaexim.go.kr" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-600 underline dark:text-primary-500">한국수출입은행</a> 환율 정보.
              </p>
            </section>

            {/* 면책조항 */}
            <section className="mt-6 border-t border-border-base pt-6">
              <p className="text-xs text-text-secondary">
                본 계산기는 참고용입니다. 실제 환율, 스프레드, 수수료는 은행,
                시점, 거래 방식에 따라 달라질 수 있습니다. 중요한 거래 전에
                금융기관에 정확한 정보를 확인하세요. 본 서비스는 금융 투자 조언이
                아닙니다.
              </p>
            </section>
          </article>
        </main>

        {/* AD-3 우측 스티키 광고 (lg+ 이상) */}
        <aside className="hidden w-80 bg-bg-base p-4 lg:block">
          <div className="sticky top-[5rem]">
          </div>
        </aside>
      </div>
      <Footer />

      {/* JSON-LD 스크립트 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
    </div>
  );
}
