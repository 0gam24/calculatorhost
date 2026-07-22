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

const URL = 'https://calculatorhost.com/guide/isa-account-tax-benefit-2026/';
const DATE_PUBLISHED = '2026-07-07';
const DATE_MODIFIED = '2026-07-07';

export const metadata: Metadata = {
  title: 'ISA 계좌 세제혜택 2026 | 200만원 비과세·9.9% 분리과세',
  description:
    '개인종합자산관리계좌(ISA)의 세제혜택 완벽 정리. 일반형 200만·서민형 400만원 비과세, 9.9% 분리과세, 3년 의무가입, 손익통산. 조세특례제한법 §91의18.',
  keywords: [
    'ISA 계좌 세제혜택',
    '개인종합자산관리계좌',
    'ISA 비과세 한도',
    'ISA 분리과세',
    '조세특례제한법 91의18',
    'ISA 세금',
    '금융소득종합과세 제외',
    'ISA 비과세 한도 초과',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: 'ISA 계좌 세제혜택 2026 | 200만원 비과세·9.9% 분리과세' }],
    title: 'ISA 계좌 세제혜택 2026 — 비과세 한도·분리과세율·의무기간 완전 정리',
    description: '일반형 200만원, 서민형 400만원까지 이익이 비과세. 초과분은 9.9% 분리과세(금융소득종합과세 제외). 3년 의무가입, 손익통산 가능.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ISA 계좌 세제혜택 2026 — 비과세·분리과세 완벽 이해',
    description: 'ISA 비과세 한도 200만~400만원, 초과분 9.9% 분리과세, 일반 금융소득 15.4% vs ISA 분리과세 최대 90% 절세 효과.',
  },
};

const FAQ_ITEMS = [
  {
    question: 'ISA 계좌의 세제혜택은 정확히 무엇인가요?',
    answer:
      '개인종합자산관리계좌(ISA)의 핵심 세제혜택은 두 가지입니다(조세특례제한법 §91의18). 첫째, 일반형은 연간 이익 200만원까지, 서민형은 400만원까지 비과세입니다. 둘째, 이 한도를 초과한 순이익은 9.9% 분리과세로 과세되어 일반 금융소득의 15.4%보다 훨씬 유리합니다. 또한 ISA 계좌의 순이익은 금융소득종합과세 대상에서 제외되므로, 다른 금융소득이 많은 고소득자도 절세 효과를 볼 수 있습니다.',
  },
  {
    question: '일반형과 서민형의 비과세 한도가 다른 이유는?',
    answer:
      '서민형은 저소득층·서민을 위한 혜택입니다(조세특례제한법 §91의18 ②). 가입 조건이 총급여 5,000만원 또는 종합소득금액 3,800만원 이하로 제한되는 대신, 비과세 한도가 200만원이 아닌 400만원으로 2배 확대됩니다. 소득이 낮을수록 더 큰 절세 혜택을 받을 수 있도록 설계된 것입니다.',
  },
  {
    question: '초과분이 9.9%라는 것이 언제 적용되나요?',
    answer:
      '계좌의 순이익(이익-손실의 합산) 기준입니다. 예를 들어 이익이 500만원이고 손실이 200만원이면 순이익은 300만원입니다. 일반형이면 200만원은 비과세, 초과분 100만원에만 9.9% 세금(9.9만원)이 부과됩니다(조세특례제한법 §91의18 ③). 의무가입 3년 만료 후 자금을 인출할 때 한 번에 계산됩니다.',
  },
  {
    question: '3년 의무가입은 어떤 뜻인가요?',
    answer:
      'ISA는 가입 후 최소 3년 동안은 유지해야 합니다(조세특례제한법 §91의18 ④). 이 기간 내 중도해지하면 비과세·분리과세 혜택이 소멸하고, 계산된 이익에 대해 일반 금융소득세(15.4%)를 추징당합니다. 다만 3년 만료 후에는 자유롭게 인출하거나 자동갱신할 수 있습니다.',
  },
  {
    question: '금융소득종합과세 대상자도 ISA에 가입할 수 있나요?',
    answer:
      'ISA의 순이익은 금융소득종합과세 대상에서 제외되므로, 개념상 금융소득이 많은 대상자도 가입 가능합니다. 다만 금융소득종합과세 대상 판정 전년도(직전 3년 중 1회 이상)에 이미 금융소득이 많았다면, ISA 가입 시점에 따라 적용 여부가 달라질 수 있으므로 금융기관에 반드시 확인하세요.',
  },
  {
    question: '손익통산이 정확히 무엇인가요?',
    answer:
      'ISA 계좌 내의 모든 상품 손익을 합산한다는 뜻입니다(조세특례제한법 §91의18 ⑤). 주식으로 100만원 이익, 채권으로 50만원 손실이 나면 순이익 50만원이 과세 기준이 됩니다. 계정 외 거래(일반 증권계좌의 손실)는 상계할 수 없습니다.',
  },
  {
    question: '만기자금을 연금계좌로 옮기면 추가 혜택이 있나요?',
    answer:
      '네, ISA 만기자금(3년 후)을 연금계좌(IRP·연금저축)로 전환하면 전환금액의 10%(연 300만원 한도)를 세액공제받습니다(소득세법 §59의3). 이는 IRP의 기존 세액공제(12%)와 별개로 추가되는 혜택으로, 장기자산 형성을 장려하는 정책입니다.',
  },
  {
    question: '농어민형 ISA는 어떤 차이가 있나요?',
    answer:
      '농어민형도 서민형처럼 비과세 한도 400만원, 분리과세율 9.9%로 동일합니다(조세특례제한법 §91의18 ②). 다만 가입 자격이 농어민(농사·어업 종사자)으로 제한되며, 일반·서민형과 동시 가입은 불가능합니다. 자격 확인은 금융기관에서 담당합니다.',
  },
];

export default function IsaAccountTaxBenefit2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: 'ISA 계좌 세제혜택 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: 'ISA 계좌 세제혜택 2026 — 비과세 한도·분리과세율·의무기간 완전 정리',
    description:
      '개인종합자산관리계좌(ISA)의 세제혜택 완벽 정리. 일반형 200만원·서민형 400만원 비과세, 초과분 9.9% 분리과세, 3년 의무가입, 손익통산, 연금계좌 전환 추가혜택.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['ISA', '개인종합자산관리계좌', '비과세', '분리과세', '세제혜택'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: 'ISA 계좌 세제혜택 2026',
    description:
      '비과세 한도 200만~400만원, 초과분 9.9% 분리과세, 3년 의무가입, 금융소득종합과세 제외의 완벽 정리.',
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
                    { name: 'ISA 계좌 세제혜택 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">금융투자자 · 9분 읽기 · 2026-07-07</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  ISA 계좌 세제혜택 2026
                  <br />
                  <span className="text-2xl text-text-secondary">— 200만원 비과세·9.9% 분리과세</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  금융투자를 하다 보면 이자와 배당, 시세차익에 대한 세금이 부담입니다. 특히 금융소득이 2,000만원을 넘으면 금융소득종합과세 대상이 되어 최고 45%까지 세금을 내야 합니다. 그런데 개인종합자산관리계좌(ISA)는 일정 한도 내에서 이 세금을 완전히 면제해주고, 초과분도 15.4%가 아닌 9.9%만 부과합니다. 이 가이드는 ISA의 비과세 한도, 분리과세율, 의무가입 기간, 손익통산 방식까지 완전히 정리해드립니다.
                </p>
              </header>

              <AdSlot slot="guide-isa-account-tax-benefit-top" format="horizontal" />

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">ISA 계좌란 무엇인가</h2>
                <p>
                  ISA는 Individual Savings Account의 약자로, 국내에서는 개인종합자산관리계좌라고 부릅니다(조세특례제한법 §91의18). 주식, 채권, 펀드, 예금 등 다양한 금융상품을 한 계좌에서 관리하고, 그 계좌 내의 이익에 대해 세제혜택을 받는 특별한 투자 계좌입니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">ISA의 핵심 특징</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    · 비과세 한도: 일반형 200만원, 서민형 400만원, 농어민형 400만원
                    <br />
                    · 초과분 세율: 9.9% (일반 금융소득 15.4% 대비 35% 절세)
                    <br />
                    · 의무가입 기간: 3년
                    <br />
                    · 손익통산: 계좌 내 모든 상품의 손익을 합산하여 순이익 기준 과세
                    <br />
                    · 금융소득종합과세 제외: ISA 수익은 금융소득종합과세 판정에서 제외
                  </p>
                </div>
                <p className="mt-4">
                  ISA는 2016년 금융위원회가 도입한 제도로, 영국의 ISA 제도를 모범으로 설계되었습니다. 장기 자산 형성과 중산층의 세 부담 경감을 목표로 운영되고 있습니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">ISA 비과세 한도 및 세율 (조세특례제한법 §91의18)</h2>
                <p>
                  ISA의 가장 중요한 세제혜택은 일정 한도 내에서 이익이 비과세되고, 그 이상은 분리과세라는 것입니다. 유형에 따라 한도가 다릅니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. ISA 유형별 비과세 한도 및 세율 (조세특례제한법 §91의18, 2026 기준)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">유형</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">가입 자격</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">비과세 한도</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">초과분 세율</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3"><strong>일반형</strong></td>
                        <td className="p-3">만 18세 이상 국내거주자</td>
                        <td className="p-3"><strong>200만원</strong>/년</td>
                        <td className="p-3"><strong>9.9%</strong> 분리과세</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3"><strong>서민형</strong></td>
                        <td className="p-3">총급여 5,000만원 또는 종합소득 3,800만원 이하</td>
                        <td className="p-3"><strong>400만원</strong>/년</td>
                        <td className="p-3"><strong>9.9%</strong> 분리과세</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3"><strong>농어민형</strong></td>
                        <td className="p-3">농사·어업 종사자(농어민)</td>
                        <td className="p-3"><strong>400만원</strong>/년</td>
                        <td className="p-3"><strong>9.9%</strong> 분리과세</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  분리과세율 9.9%는 소득세 9% + 지방소득세 0.9%입니다. 일반 금융소득의 경우 소득세 15% + 지방소득세 1.4% = 16.4%(누진세로 인해 최대 15.4~45%)인 것과 비교하면 매우 유리합니다.
                </p>
                <p className="mt-4">
                  다만 연 납입한도(2,000만원)와 총 누적 한도(1억원)가 있습니다. 또한 비과세 한도는 매년 초기화되며, 한 해에 200만원(또는 400만원) 초과 이익이 나면 그 초과분만 9.9%로 과세됩니다. 3년 의무가입 만료 후 인출할 때 최종 계산됩니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">ISA 비과세 한도와 분리과세의 실제 계산 사례</h2>
                <p>
                  ISA의 세제혜택이 실제로 얼마나 효과적인지 구체적인 수치로 살펴보겠습니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 1. 일반형 ISA, 순이익 300만원</p>
                  <p className="text-sm text-text-secondary">
                    · 계좌 내 이익: 주식 200만 + 채권 100만 = 총 300만원
                    <br />
                    · 비과세 한도(일반형): 200만원
                    <br />
                    · 과세 대상: 300만 − 200만 = 100만원
                    <br />
                    · ISA 세액: 100만원 × 9.9% = <strong>9.9만원</strong>
                    <br />
                    · 일반 금융소득 세액(15.4%): 300만원 × 15.4% = <strong>46.2만원</strong>
                    <br />
                    <span className="text-xs text-text-tertiary">결론: ISA 대비 약 36.3만원 절세 (78% 세금 감소)</span>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 2. 서민형 ISA, 순이익 400만원</p>
                  <p className="text-sm text-text-secondary">
                    · 계좌 내 이익: 펀드 400만원
                    <br />
                    · 비과세 한도(서민형): 400만원
                    <br />
                    · 과세 대상: 0원 (전액 비과세)
                    <br />
                    · ISA 세액: <strong>0원</strong>
                    <br />
                    · 일반 금융소득 세액(15.4%): 400만원 × 15.4% = <strong>61.6만원</strong>
                    <br />
                    <span className="text-xs text-text-tertiary">결론: ISA로 61.6만원 완전 절세</span>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 3. ISA 손익통산, 이익 500만·손실 200만</p>
                  <p className="text-sm text-text-secondary">
                    · 계좌 내 이익: 주식 500만원
                    <br />
                    · 계좌 내 손실: 채권 200만원
                    <br />
                    · 순이익: 500만 − 200만 = 300만원 (손익통산)
                    <br />
                    · 비과세 한도(일반형): 200만원
                    <br />
                    · 과세 대상: 300만 − 200만 = 100만원
                    <br />
                    · ISA 세액: 100만원 × 9.9% = <strong>9.9만원</strong>
                    <br />
                    · 일반 계좌 세액(손실 상계 불가): 500만원 × 15.4% = <strong>77만원</strong>
                    <br />
                    <span className="text-xs text-text-tertiary">결론: ISA 손익통산의 강점. 같은 순이익 기준 약 67.1만원 절세</span>
                  </p>
                </div>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">3년 의무가입 기간과 중도해지 페널티</h2>
                <p>
                  ISA의 가장 중요한 제약은 3년 의무가입입니다(조세특례제한법 §91의18 ④). 이 기간을 지키지 않으면 세제혜택이 모두 소멸합니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">의무가입 기간의 의미</p>
                  <p className="text-sm text-text-secondary">
                    · 계좌 개설 후 3년 동안은 유지해야 함
                    <br />
                    · 3년 만료 전 중도해지 시 모든 비과세·분리과세 혜택 소멸
                    <br />
                    · 중도해지 시 원래 계산되어야 할 세금(일반 금융소득세 15.4%) 추징
                    <br />
                    · 3년 만료 후는 자유롭게 인출 또는 자동갱신 선택 가능
                  </p>
                </div>
                <p className="mt-4">
                  예를 들어 1년 6개월 만에 중도해지하면, 지금까지 받은 비과세 혜택을 모두 잃게 됩니다. 그래서 ISA는 "5년 이상 투자하지 않을 자금"으로는 절대 가입하면 안 됩니다.
                </p>
                <p className="mt-4">
                  다만 사망, 중증질환, 기초생활수급자 전락 등의 특수한 사유는 중도해지가 허용될 수 있습니다. 정확한 기준은 금융기관에 문의하세요.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">손익통산 — ISA의 강점</h2>
                <p>
                  ISA의 중요한 특징은 계좌 내의 모든 상품 손익을 합산한다는 것입니다(조세특례제한법 §91의18 ⑤). 이를 손익통산이라고 부릅니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">손익통산의 작동 원리</p>
                  <p className="text-sm text-text-secondary">
                    · 주식 100만원 이익 + 채권 50만원 손실 → 순이익 50만원
                    <br />
                    · 펀드 200만원 이익 + 적금 20만원 손실 → 순이익 180만원
                    <br />
                    · 각 상품별로 세금을 따지지 않음. 전체 합산 순이익 기준 과세
                    <br />
                    · 일반 계좌의 경우 주식과 펀드 손익은 상계 불가(원천징수율 다름)
                  </p>
                </div>
                <p className="mt-4">
                  이것이 ISA의 가장 강력한 장점입니다. 일반 증권계좌에서는 한 종목에서 손실이 나면 다른 종목의 이익으로 상계할 수 없습니다. 하지만 ISA는 계좌 내 모든 거래를 "순이익" 기준으로 평가하므로, 잘못된 종목의 손실이 나머지 이익을 깎아줍니다.
                </p>
                <p className="mt-4">
                  다만 ISA 계좌 외의 거래(일반 증권계좌, 국민은행 예금 등)는 ISA와 손익통산할 수 없습니다. ISA 내부끼리만 상계됩니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">금융소득종합과세 제외 혜택</h2>
                <p>
                  금융소득이 2,000만원을 넘으면 금융소득종합과세 대상이 되어, 최고 45%까지 세금을 납부할 수 있습니다. ISA 수익은 이 종합과세 계산에서 완전히 제외됩니다(조세특례제한법 §91의18 ①).
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">금융소득종합과세 대상자의 ISA 효과</p>
                  <p className="text-sm text-text-secondary">
                    · 일반 금융소득: 배당 1,500만 + 이자 600만 = 2,100만원
                    <br />
                    · 금융소득종합과세 대상 (세율 최고 45%)
                    <br />
                    · ISA 순이익: 300만원 (이 금액은 종합과세 판정에 미포함)
                    <br />
                    · 효과: 300만원이 종합과세 판정 금액을 증가시키지 않음
                    <br />
                    · ISA 세액: 300만 중 200만 비과세 + 100만 × 9.9% = 9.9만원
                  </p>
                </div>
                <p className="mt-4">
                  이는 특히 고소득자에게 매우 유리합니다. ISA 수익이 종합과세를 초래하지 않으므로, 결과적으로 추가 세부담 없이 투자 이익을 얻을 수 있기 때문입니다.
                </p>
              </section>

              <AdSlot slot="guide-isa-account-tax-benefit-mid" format="rectangle" />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h2 className="text-2xl font-bold">만기 자금을 연금계좌로 전환할 때의 추가 혜택</h2>
                <p>
                  ISA 의무가입 3년이 만료되고 자금을 인출할 때, 그 자금을 연금계좌(IRP·연금저축)로 전환하면 추가 세액공제를 받을 수 있습니다(소득세법 §59의3).
                </p>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li>
                    <strong>세액공제 요율:</strong> 전환금액의 10% (최대 연 300만원 한도)
                  </li>
                  <li>
                    <strong>예시:</strong> ISA에서 1,000만원을 IRP로 전환 → 100만원의 10%(10만원) 세액공제 (300만원 한도 내)
                  </li>
                  <li>
                    <strong>적용 시기:</strong> ISA 전환금을 IRP에 납입한 다음 해 종합소득세 신고 시 공제
                  </li>
                  <li>
                    <strong>IRP 기존 공제:</strong> IRP 납입액은 이미 13% 세액공제 대상이므로, 이 10% 공제와는 별개로 추가 혜택
                  </li>
                </ul>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">서민형 ISA의 가입 자격과 소득 기준</h2>
                <p>
                  서민형 ISA는 비과세 한도가 200만원이 아닌 400만원이므로, 자격이 있다면 반드시 서민형으로 가입하는 것이 유리합니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">서민형 가입 자격 (조세특례제한법 §91의18 ②)</p>
                  <p className="text-sm text-text-secondary">
                    · 총급여 5,000만원 이하 (근로소득자 기준)
                    <br />
                    · 또는 종합소득금액 3,800만원 이하 (사업소득자·프리랜서 기준)
                    <br />
                    · 직전 3개 연도 평균으로 판정
                    <br />
                    · 농어민형은 농사·어업 종사 여부로 판정
                  </p>
                </div>
                <p className="mt-4">
                  자격 여부는 금융기관에 소득 증명(원천징수영수증·사업자등록증명·종합소득세 신고확인서 등)을 제시하여 확인받습니다. 만약 처음에 서민형으로 가입했다가 나중에 소득이 증가하면, 금융기관에서 일반형으로 전환하도록 권유받을 수 있습니다.
                </p>
                <p className="mt-4">
                  다만 일반형·서민형·농어민형은 중복 가입 불가입니다. 계좌는 1개만 유지할 수 있습니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">ISA 가입 시 주의사항</h2>
                <p>
                  ISA의 큰 장점이 있지만, 반드시 주의해야 할 점들이 있습니다.
                </p>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li>
                    <strong>3년은 유지해야 함:</strong> 중도해지 시 모든 혜택 소멸. 5년 이상 보유할 자신이 없으면 가입 금지.
                  </li>
                  <li>
                    <strong>연 납입한도 2,000만원:</strong> 한 해 최대 2,000만원까지만 넣을 수 있습니다.
                  </li>
                  <li>
                    <strong>총 누적한도 1억원:</strong> ISA 계좌를 통틀어 최대 1억원까지만 적립 가능. (국내외 ISA 합산)
                  </li>
                  <li>
                    <strong>손실은 계좌 외 상계 불가:</strong> ISA 내에서만 손익통산 가능. 일반 계좌 손실과 상계 불가.
                  </li>
                  <li>
                    <strong>금융소득종합과세 대상 판정:</strong> 금융소득종합과세 대상 전년도(직전 3년 중 1회 이상)에는 가입 제한 또는 재계약 불가 금융기관도 있습니다. 가입 시 반드시 확인하세요.
                  </li>
                  <li>
                    <strong>수익은 매년 비과세 한도로 리셋:</strong> 1년차에 200만원 비과세를 받았다면, 2년차는 또 다시 200만원(또는 400만원)입니다. 누적되지 않습니다.
                  </li>
                </ul>
              </section>

              <h2 className="text-2xl font-bold mb-6">자주 묻는 질문</h2>
              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h3 className="text-lg font-semibold text-text-primary">관련 계산기 및 가이드</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link
                    href="/calculator/savings/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">적금 이자 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">단리·복리 적금 이자를 계산해보세요.</p>
                  </Link>
                  <Link
                    href="/calculator/deposit/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">정기예금 이자 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">세후 이자를 정확하게 계산합니다.</p>
                  </Link>
                  <Link
                    href="/guide/interest-income-tax-15-4-percent-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">금융소득종합과세 15.4%</div>
                    <p className="mt-1 text-sm text-text-secondary">2,000만원 기준과 세율 구간을 완벽 정리.</p>
                  </Link>
                  <Link
                    href="/guide/financial-income-comprehensive-vs-separate-taxation/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">금융소득 종합과세 vs 분리과세</div>
                    <p className="mt-1 text-sm text-text-secondary">배당과 이자의 과세 방식 비교.</p>
                  </Link>
                  <Link
                    href="/guide/pension-savings-irp-tax-credit-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">연금계좌 세액공제 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">IRP·연금저축 납입공제 및 전환혜택.</p>
                  </Link>
                  <Link
                    href="/category/finance/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">모든 금융 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">대출·예금·적금·환율 계산기 모음.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 교육 목적으로 작성되었으며, 개인 맞춤형 투자 조언이 아닙니다. ISA 가입 여부, 유형 선택, 세제혜택의 정확한 적용은 금융기관(증권사·은행·보험사)과 국세청에 반드시 확인하세요. 특히 금융소득종합과세 대상 여부, 서민형 소득 기준 심사, 중도해지 페널티 등은 개별 상황에 따라 달라질 수 있습니다. 본 콘텐츠는 2026-07-07을 기준으로 작성되었으며, 조세특례제한법 개정 시 즉시 업데이트됩니다. ISA의 정확한 기준은 법조항 <strong>조세특례제한법 §91의18(개인종합자산관리계좌에 대한 과세특례)</strong> 및 <strong>소득세법 §59의3(연금계좌 전환 세액공제)</strong>을 따릅니다. AI 보조 작성 후 운영자 검수 완료.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터</a>,{' '}
                  <a href="https://www.fsc.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">금융감독원(FSC)</a>,{' '}
                  <a href="https://www.nts.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">국세청</a>.
                </p>
              </section>

              <ShareButtons
                title="ISA 계좌 세제혜택 2026 가이드"
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
