import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { Footer } from '@/components/layout/Footer';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { AdSlot } from '@/components/ads/AdSlot';
import { FaqSection } from '@/components/calculator/FaqSection';
import {
  buildBreadcrumbJsonLd,
  buildArticleJsonLd,
  buildWebPageJsonLd,
  buildFaqPageJsonLd,
  buildSpeakableJsonLd,
} from '@/lib/seo/jsonld';

const URL = 'https://calculatorhost.com/guide/deposit-vs-savings-vs-parking-account-2026/';
const DATE_PUBLISHED = '2026-06-27';
const DATE_MODIFIED = '2026-06-27';

export const metadata: Metadata = {
  title: '정기예금 vs 정기적금 vs 파킹통장 2026 — 이자·유동성·세금 완전비교',
  description:
    '정기예금, 정기적금, 파킹통장의 차이를 이자 계산방식, 유동성, 세금, 적합한 상황별로 명확히 정리합니다. 예금자보호, 이자소득세 15.4%, 실제 선택 기준까지 2026년 기준 최신 정보.',
  keywords: [
    '정기예금 정기적금 차이',
    '파킹통장',
    '정기예금 이자',
    '정기적금 이자',
    '예금 적금 비교',
    '수시입출금 고금리',
    '예금자보호',
    '이자소득세 15.4%',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [
      {
        url: '/og-default.png',
        width: 1200,
        height: 630,
        alt: '정기예금 vs 정기적금 vs 파킹통장 2026 — 이자·유동성·세금 완전비교',
      },
    ],
    title: '정기예금 vs 정기적금 vs 파킹통장 2026',
    description: '이자 계산방식부터 세금까지 한눈에 비교. 어떤 상품을 선택해야 할까?',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '정기예금 vs 정기적금 vs 파킹통장 2026',
    description: '이자 차이, 유동성, 세금을 비교하고 선택하는 기준 제시',
  },
};

const FAQ_ITEMS = [
  {
    question: '정기예금과 정기적금의 가장 핵심 차이가 뭔가요?',
    answer:
      '정기예금은 목돈을 한 번에 맡기고 만기까지 거치하는 방식이고, 정기적금은 매달 일정액을 꾸준히 납입합니다. 이자 계산도 다릅니다. 정기예금은 예치액 전체가 전 기간 거치되므로 단순하지만, 적금은 각 회차마다 거치기간이 달라서 실제 수익률이 표면금리보다 낮습니다.',
  },
  {
    question: '파킹통장은 정말 금리가 좋은가요?',
    answer:
      '파킹통장은 비교적 높은 금리를 제공하지만 제약이 있습니다. 대부분 월 입금액 한도(예: 월 500만원), 총 잔액 한도(예: 잔액 1,000만원 초과 시 금리 인하)가 있습니다. 또한 금리는 은행별·시기별로 크게 변하고, 높은 금리를 제공할 때는 보통 한정된 기간입니다. 현재 금리 확인 후 선택하세요.',
  },
  {
    question: '1년에 1,200만 원을 저축한다면, 정기예금과 적금 중 어느 게 더 많은 이자?',
    answer:
      '정기예금(1년에 1,200만 원 예치, 연 4%): 이자 약 48만 원. 적금(월 100만 원, 연 4%): 이자 약 26만 원. 세후는 각각 약 40.6만 원과 22만 원입니다. 같은 원금이라도 정기예금의 이자가 훨씬 크지만, 적금은 매달 저축하는 훈련 효과가 있습니다.',
  },
  {
    question: '이자소득세 15.4%는 모든 상품에 다 적용되나요?',
    answer:
      '네, 정기예금, 정기적금, 파킹통장 모두 이자소득은 동일하게 이자소득세 15.4%가 원천징수됩니다(소득세법 §129 기본 14% + 지방소득세 1.4%). 은행이 자동으로 세금을 떼고 입금하므로, 추가로 세금신고 할 필요 없습니다.',
  },
  {
    question: '파킹통장의 금리가 높은 이유가 뭔가요?',
    answer:
      '파킹통장은 은행 입장에서 단기 자금 수급이 필요할 때 사용하는 상품입니다. 고금리로 유동성 있는 자금을 모으되, 한도 제한으로 규모를 통제합니다. 금리는 금융시장의 유동성 상황에 따라 크게 변동하므로, 지금의 높은 금리가 계속 지속된다고 기대하기 어렵습니다.',
  },
  {
    question: '정기예금 중도해지하면 이자가 깎여나가나요?',
    answer:
      '대부분 그렇습니다. 정기예금 중도해지 시 약정이율이 아닌 훨씬 낮은 기본금리(보통 연 0.1% 수준)가 적용됩니다. 따라서 정기예금은 만기까지 거치할 수 있는 여유자금으로만 선택하는 것이 좋습니다. 반면 파킹통장은 수시입출금이므로 중도해지 걱정 없습니다.',
  },
  {
    question: '예금자보호는 어느 상품에 다 적용되나요?',
    answer:
      '정기예금, 정기적금, 파킹통장 모두 예금자보호법 대상입니다. 1인당 원리금 보호(금액은 예금보험공사 기준 확인 필요)되므로, 은행이 망해도 보호받습니다. 단 보호한도 이상의 금액은 보호되지 않으므로, 큰 금액은 여러 은행에 분산하세요.',
  },
];

export default function DepositVsSavingsVsParkingAccount2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '정기예금 vs 정기적금 vs 파킹통장 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '정기예금 vs 정기적금 vs 파킹통장 2026',
    description:
      '세 가지 저축 상품의 이자 계산방식, 유동성, 세금, 적합한 상황을 명확히 비교합니다. 실제 선택 기준을 제시합니다.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: [
      '정기예금',
      '정기적금',
      '파킹통장',
      '이자 계산',
      '예금 적금 차이',
      '수시입출금 고금리',
    ],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '정기예금 vs 정기적금 vs 파킹통장 2026 | calculatorhost',
    description:
      '정기예금, 정기적금, 파킹통장의 이자 구조·유동성·세금 비교. 어떤 상품을 선택할 것인가?',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
  });
  const faqLd = buildFaqPageJsonLd(FAQ_ITEMS);
  const speakableLd = buildSpeakableJsonLd(['[data-speakable]']);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableLd) }}
      />

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
                    { name: '정기예금 vs 정기적금 vs 파킹통장 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">
                  금융 · 12분 읽기 · 2026-06-27
                </p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  정기예금 vs 정기적금 vs 파킹통장 2026
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  목돈을 안전하게 불리려면 어떤 상품을 선택해야 할까요? 정기예금, 정기적금,
                  파킹통장은 모두 이자를 받는 저축 상품이지만, 이자 계산방식, 유동성, 세금이
                  크게 다릅니다. 이 가이드에서는 세 상품의 구조를 정확히 이해하고, 당신의
                  상황에 맞는 상품을 선택하는 기준을 제시합니다.
                </p>
              </header>

              <AdSlot slot="guide-deposit-vs-savings-vs-parking-account-2026-top" format="horizontal" />

              <section aria-label="요약" className="card border-l-4 border-l-primary-500">
                <h2 className="mb-2 text-caption uppercase tracking-wider text-primary-500">
                  핵심 요약
                </h2>
                <table className="w-full border-collapse text-sm">
                  <caption className="mb-2 text-left font-semibold text-text-primary">
                    세 가지 저축 상품 비교표
                  </caption>
                  <thead>
                    <tr className="border-b border-border-base">
                      <th scope="col" className="pb-2 pr-3 text-left font-semibold">
                        상품
                      </th>
                      <th scope="col" className="pb-2 text-left font-semibold">
                        납입 방식
                      </th>
                      <th scope="col" className="pb-2 text-left font-semibold">
                        이자 계산
                      </th>
                      <th scope="col" className="pb-2 text-left font-semibold">
                        유동성
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-text-secondary">
                    <tr className="border-b border-border-base">
                      <td className="py-2 pr-3 font-semibold">정기예금</td>
                      <td>목돈 1회</td>
                      <td>단리 적용</td>
                      <td>만기까지 거치</td>
                    </tr>
                    <tr className="border-b border-border-base">
                      <td className="py-2 pr-3 font-semibold">정기적금</td>
                      <td>매달 일정액</td>
                      <td>회차별 단리</td>
                      <td>중도해지 가능(이자 손실)</td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-3 font-semibold">파킹통장</td>
                      <td>자유로운 입출금</td>
                      <td>일별 잔액 단리</td>
                      <td>수시입출금 가능</td>
                    </tr>
                  </tbody>
                </table>
              </section>

              <section className="space-y-4">
                <h2 className="border-b border-border-base pb-2 text-2xl font-bold">
                  정기예금이란 뭔가요?
                </h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  정기예금은 목돈을 한 번에 맡기고, 약정된 만기일까지 거치하는 저축 상품입니다.
                  거치 기간 동안 인출할 수 없으며, 만기에 원금과 이자를 모두 받습니다.
                </p>

                <div className="space-y-3">
                  <div className="rounded-lg bg-bg-raised p-4">
                    <h3 className="mb-2 font-semibold text-text-primary">정기예금의 특징</h3>
                    <ul className="space-y-2 text-sm text-text-secondary">
                      <li>
                        <strong>납입</strong>: 최초 한 번만 목돈을 예치 (이후 추가 입금 불가)
                      </li>
                      <li>
                        <strong>거치 기간</strong>: 3개월, 6개월, 1년, 2년 등 정해진 기간만 가능
                      </li>
                      <li>
                        <strong>중도해지</strong>: 약정이율이 아닌 기본금리(약 0.1%) 적용 → 손실
                      </li>
                      <li>
                        <strong>이자 지급</strong>: 만기일시(만기에 일괄), 월이자(매달), 연이자
                        등 선택 가능
                      </li>
                    </ul>
                  </div>

                  <div className="rounded-lg bg-bg-raised p-4">
                    <h3 className="mb-2 font-semibold text-text-primary">이자 계산 공식</h3>
                    <p className="text-sm text-text-secondary">
                      <strong>이자 = 원금 × 연이율 × (기간 ÷ 12)</strong>
                    </p>
                    <p className="mt-2 text-sm text-text-secondary">
                      예: 원금 1,200만, 연 4%, 1년 → 이자 = 1,200만 × 0.04 × (12 ÷ 12) = 48만 원
                    </p>
                    <p className="mt-2 text-xs text-text-tertiary">
                      정기예금은 단리입니다. 예치액 전체가 전 기간 동안 약정이율로 거치되므로
                      계산이 단순합니다.
                    </p>
                  </div>
                </div>

                <p className="text-text-secondary leading-relaxed">
                  ⚠️ 다만 현재(2026) 은행의 정기예금 금리는 대체로 4~5%대입니다. 또한 중도해지
                  시 약정이율이 적용되지 않으므로, 반드시 만기까지 거치할 수 있는 여유자금으로만
                  선택하세요.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="border-b border-border-base pb-2 text-2xl font-bold">
                  정기적금이란 뭔가요?
                </h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  정기적금은 매달 정해진 금액을 꾸준히 저축하는 상품입니다. 예금과 달리 여러 번
                  입금하므로, 각 회차마다 거치기간이 달라져서 실제 수익률이 생각보다 낮을 수
                  있습니다.
                </p>

                <div className="space-y-3">
                  <div className="rounded-lg bg-bg-raised p-4">
                    <h3 className="mb-2 font-semibold text-text-primary">정기적금의 특징</h3>
                    <ul className="space-y-2 text-sm text-text-secondary">
                      <li>
                        <strong>납입</strong>: 매달 일정액을 정기적으로 저축 (예: 월 100만 원 × 12
                        개월)
                      </li>
                      <li>
                        <strong>납입 횟수</strong>: 12개월, 24개월 등 정해진 횟수만 가능
                      </li>
                      <li>
                        <strong>거치기간 차이</strong>: 첫 달은 12개월 거치, 마지막 달은 1개월만
                        거치 → 평균 거치기간은 6.5개월
                      </li>
                      <li>
                        <strong>중도해지</strong>: 가능하지만 이자 일부가 지급되지 않음
                      </li>
                    </ul>
                  </div>

                  <div className="rounded-lg bg-bg-raised p-4">
                    <h3 className="mb-2 font-semibold text-text-primary">이자 계산 공식 (단리 기준)</h3>
                    <p className="text-sm text-text-secondary">
                      <strong>이자 = 월납입액 × 연이율 × (n(n+1)/2) / 12</strong>
                    </p>
                    <p className="mt-2 text-sm text-text-secondary">
                      여기서 n은 납입 개월수입니다.
                    </p>
                    <p className="mt-2 text-xs text-text-tertiary">
                      예: 월 100만 × 12개월, 연 4% → 이자 = 100만 × 0.04 × (12 × 13 / 2) / 12 =
                      100만 × 0.04 × 6.5 = 약 26만 원
                    </p>
                  </div>

                  <div className="rounded-lg bg-bg-raised p-4">
                    <h3 className="mb-2 font-semibold text-text-primary">
                      정기예금 vs 정기적금 이자 차이 (같은 원금, 같은 금리)
                    </h3>
                    <p className="text-sm text-text-secondary">
                      <strong>정기예금</strong> (1,200만 1회, 연 4%, 1년): 이자 48만 원
                    </p>
                    <p className="text-sm text-text-secondary">
                      <strong>정기적금</strong> (월 100만 × 12개월, 연 4%): 이자 약 26만 원
                    </p>
                    <p className="mt-2 text-xs text-text-tertiary">
                      같은 원금 1,200만이라도, 적금은 매달 조금씩 입금되므로 전체 거치기간이
                      짧아서 이자가 훨씬 적습니다. 이것이 적금의 가장 중요한 특징입니다.
                    </p>
                  </div>
                </div>

                <p className="text-text-secondary leading-relaxed">
                  ⚠️ 다만 적금은 목돈이 없어도 매달 꾸준히 저축할 수 있다는 장점이 있습니다.
                  또한 중도해지가 가능하므로 예비자금이 필요할 때 인출할 수 있습니다(다만 미납
                  기간의 이자는 지급되지 않음).
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="border-b border-border-base pb-2 text-2xl font-bold">
                  파킹통장이란 뭔가요?
                </h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  파킹통장은 정기예금이나 적금처럼 거치 약정이 없으면서도, 비교적 높은 이자를
                  제공하는 수시입출금 상품입니다. 하루만 입금해도 이자를 받을 수 있어서, 임시로
                  목돈을 보관해야 할 때 유용합니다.
                </p>

                <div className="space-y-3">
                  <div className="rounded-lg bg-bg-raised p-4">
                    <h3 className="mb-2 font-semibold text-text-primary">파킹통장의 특징</h3>
                    <ul className="space-y-2 text-sm text-text-secondary">
                      <li>
                        <strong>입출금</strong>: 자유로운 수시입출금 (정기상품 아님)
                      </li>
                      <li>
                        <strong>금리</strong>: 정기예금보다 높게 책정 (현재 3.5~5%대)
                      </li>
                      <li>
                        <strong>한도 제약</strong>: 대부분 월 입금한도(예: 월 500만원), 최대
                        잔액한도(예: 1,000만원 초과 시 금리 인하) 설정
                      </li>
                      <li>
                        <strong>금리 변동</strong>: 은행의 유동성 필요에 따라 수시로 변동
                      </li>
                    </ul>
                  </div>

                  <div className="rounded-lg bg-bg-raised p-4">
                    <h3 className="mb-2 font-semibold text-text-primary">이자 계산 (일별 단리)</h3>
                    <p className="text-sm text-text-secondary">
                      <strong>일이자 = 일일 잔액 × 연이율 ÷ 365</strong>
                    </p>
                    <p className="mt-2 text-sm text-text-secondary">
                      예: 잔액 1,000만, 연 4%인 날 → 일이자 = 1,000만 × 0.04 ÷ 365 = 약 1,096원
                    </p>
                    <p className="mt-2 text-xs text-text-tertiary">
                      파킹통장은 매일의 잔액에 금리를 적용하므로, 입금한 날부터 이자가 발생합니다.
                    </p>
                  </div>
                </div>

                <p className="text-text-secondary leading-relaxed">
                  ⚠️ 다만 파킹통장의 높은 금리는 일시적입니다. 은행이 단기 자금이 필요한 시기에
                  고금리로 모금하는 전술이므로, 3개월~6개월 후 금리가 크게 인하될 수 있습니다.
                  또한 한도 제약이 있어서, 금액이 크면 분산 입금이나 다른 은행 이용을 고려해야
                  합니다.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="border-b border-border-base pb-2 text-2xl font-bold">
                  세 상품의 이자소득세는 똑같은가요?
                </h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  네, 정기예금, 정기적금, 파킹통장에서 발생한 이자는 모두 동일한 세율로 과세됩니다.
                  이자소득세는 소득세법에 따라 원천징수되므로, 상품 선택과 무관하게 적용됩니다.
                </p>

                <div className="rounded-lg bg-bg-raised p-4">
                  <h3 className="mb-2 font-semibold text-text-primary">이자소득세 구조</h3>
                  <ul className="space-y-2 text-sm text-text-secondary">
                    <li>
                      <strong>소득세</strong>: 14% (소득세법 §129 기본세율)
                    </li>
                    <li>
                      <strong>지방소득세</strong>: 1.4% (소득세의 10%)
                    </li>
                    <li>
                      <strong>합계</strong>: 15.4%
                    </li>
                  </ul>
                  <p className="mt-3 text-sm text-text-secondary">
                    <strong>세후 이자 계산:</strong> 예상 이자 × (1 − 0.154) = 세후 이자
                  </p>
                  <p className="mt-2 text-xs text-text-tertiary">
                    예: 이자 48만 원 → 세금 7.39만 원 공제 → 세후 이자 약 40.6만 원
                  </p>
                </div>

                <p className="text-text-secondary leading-relaxed">
                  ⚠️ 다만 이자소득세 15.4%는 국내 은행 상품 기준입니다. 외화 상품, 해외 은행
                  송금 이자 등은 세율이 다를 수 있습니다. 또한 종합소득이 일정 수준 이상이면
                  추가 세금이 부과될 수 있으므로, 큰 금액은 세무사 상담을 권장합니다.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="border-b border-border-base pb-2 text-2xl font-bold">
                  어떤 상품을 선택해야 할까요?
                </h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  최적의 상품은 당신의 자금 상황과 목표에 따라 다릅니다. 몇 가지 상황별 기준을
                  제시합니다.
                </p>

                <div className="space-y-3">
                  <div className="rounded-lg bg-bg-raised p-4">
                    <h3 className="mb-2 font-semibold text-text-primary">
                      상황 1: 목돈이 있고, 1년 이상 인출할 일이 없다면?
                    </h3>
                    <p className="text-sm text-text-secondary">
                      <strong>→ 정기예금 추천</strong>
                    </p>
                    <p className="text-sm text-text-secondary mt-2">
                      정기예금은 이자 계산이 단순하고, 만기까지 거치하면 약정이율이 보장됩니다.
                      같은 원금이라면 적금보다 훨씬 많은 이자를 받습니다. 다만 중도해지하면
                      손실이므로, 반드시 거치 기간을 맞춰 선택하세요.
                    </p>
                  </div>

                  <div className="rounded-lg bg-bg-raised p-4">
                    <h3 className="mb-2 font-semibold text-text-primary">
                      상황 2: 매달 꾸준히 저축하고 싶다면?
                    </h3>
                    <p className="text-sm text-text-secondary">
                      <strong>→ 정기적금 추천</strong>
                    </p>
                    <p className="text-sm text-text-secondary mt-2">
                      정기적금은 목돈이 없어도 시작할 수 있고, 저축 습관을 들이기 좋습니다.
                      중도해지도 가능하므로 예비자금이 필요할 때 인출할 수 있습니다. 다만
                      정기예금보다 이자가 훨씬 적다는 점을 이해하고 선택하세요.
                    </p>
                  </div>

                  <div className="rounded-lg bg-bg-raised p-4">
                    <h3 className="mb-2 font-semibold text-text-primary">
                      상황 3: 금액이 일정치 않고 자주 입출금해야 한다면?
                    </h3>
                    <p className="text-sm text-text-secondary">
                      <strong>→ 파킹통장 추천</strong>
                    </p>
                    <p className="text-sm text-text-secondary mt-2">
                      파킹통장은 입출금이 자유로우면서도 정기예금보다 높은 금리를 제공합니다.
                      예를 들어 이사비용, 전세자금, 차량 구입비 등 임시로 보관해야 할 목돈에
                      적합합니다. 단, 금리가 변동하고 한도가 제한되므로 현재 금리를 확인 후
                      선택하세요.
                    </p>
                  </div>

                  <div className="rounded-lg bg-bg-raised p-4">
                    <h3 className="mb-2 font-semibold text-text-primary">
                      상황 4: 대안으로 세 상품을 함께 활용한다면?
                    </h3>
                    <p className="text-sm text-text-secondary">
                      <strong>→ 계층화 전략</strong>
                    </p>
                    <p className="text-sm text-text-secondary mt-2">
                      예를 들어, 3개월 응급자금은 파킹통장(유동성), 6개월~1년 저축은 정기예금(높은
                      이자), 매달 저축은 정기적금(습관 형성)으로 분산하면, 유동성과 수익을 모두
                      충족할 수 있습니다.
                    </p>
                  </div>
                </div>

                <p className="text-text-secondary leading-relaxed">
                  ⚠️ 다만 현재 금리 환경은 저금리입니다. 정기예금 4~5%, 적금 3~4%, 파킹통장
                  3.5~5%대는 임시 책정이며, 시간에 따라 변할 수 있습니다. 상품 선택 전에 각
                  은행의 현재 금리를 비교한 후 선택하세요.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="border-b border-border-base pb-2 text-2xl font-bold">
                  예금자보호는 어느 정도까지 적용될까요?
                </h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  정기예금, 정기적금, 파킹통장 모두 예금자보호법 대상이므로, 은행이 파산해도 일정
                  수준까지 보호받습니다. 다만 보호 한도가 있으므로 큰 금액은 분산 입금이 필요합니다.
                </p>

                <div className="rounded-lg bg-bg-raised p-4">
                  <h3 className="mb-2 font-semibold text-text-primary">예금자보호 원칙</h3>
                  <ul className="space-y-2 text-sm text-text-secondary">
                    <li>
                      <strong>보호 범위</strong>: 1인당 원리금(원금 + 이자) 보호
                    </li>
                    <li>
                      <strong>보호 한도</strong>: 은행별·예금자별로 보호한도 있음 (구체적 금액은
                      예금보험공사 확인 필요)
                    </li>
                    <li>
                      <strong>분산 입금의 중요성</strong>: 보호한도 이상의 금액은 여러 은행에
                      분산해야 안전
                    </li>
                  </ul>
                </div>

                <p className="text-text-secondary leading-relaxed">
                  ⚠️ 다만 보호한도가 연도별로 변하고, 상품별로도 차이가 있을 수 있으므로, 큰
                  금액을 예치하기 전에 예금보험공사(kdic.or.kr)에서 정확한 한도를 확인하세요.
                </p>
              </section>

              <AdSlot slot="guide-deposit-vs-savings-vs-parking-account-2026-mid" format="rectangle" />

              <FaqSection items={FAQ_ITEMS} />

              <section className="card border-l-2 border-l-danger-500 bg-danger-500/5">
                <h2 className="mb-2 text-lg font-semibold text-danger-700 dark:text-danger-300">
                  ⚠️ 주의사항 및 면책조항
                </h2>
                <ul className="space-y-2 text-sm text-danger-700 dark:text-danger-300">
                  <li>
                    • 본 가이드의 모든 계산은 교육 및 추정 목적이며, 실제 금융상품의 수익을
                    보장하지 않습니다.
                  </li>
                  <li>
                    • 정기예금, 적금, 파킹통장의 금리는 시시각각 변하므로, 상품 선택 시 각
                    금융기관의 최신 금리를 반드시 확인하세요.
                  </li>
                  <li>
                    • 이자소득세 15.4%(소득세법 §129 기본 14% + 지방소득세 1.4%)는 2026년
                    기준입니다. 세법 변경 시 달라질 수 있으므로 국세청 기준을 따르세요.
                  </li>
                  <li>
                    • 중도해지 시 이자가 삭감되는 정도는 상품 설명서에 명시되므로, 계약 전에
                    꼭 확인하세요.
                  </li>
                  <li>
                    • 파킹통장의 한도 제약(월 입금한도, 최대 잔액한도)은 은행별로 다르므로,
                    현재 기준을 확인 후 선택하세요.
                  </li>
                  <li>
                    • 모든 금융 거래는 본인 책임이며, 필요하면 은행 상담원이나 금융 전문가의
                    조언을 받으세요.
                  </li>
                </ul>
              </section>

              <section aria-label="관련 도구" className="card">
                <h2 className="mb-3 text-lg font-semibold">관련 계산기 및 가이드</h2>
                <ul className="space-y-2 text-sm">
                  <li>
                    →{' '}
                    <Link
                      href="/calculator/deposit/"
                      className="text-primary-600 underline dark:text-primary-500"
                    >
                      정기예금 이자 계산기
                    </Link>{' '}
                    — 목돈 예치의 만기금액 및 세후 이자 실시간 계산
                  </li>
                  <li>
                    →{' '}
                    <Link
                      href="/calculator/savings/"
                      className="text-primary-600 underline dark:text-primary-500"
                    >
                      정기적금 이자 계산기
                    </Link>{' '}
                    — 월불입 적금의 최종 원리금 및 이자 계산
                  </li>
                  <li>
                    →{' '}
                    <Link
                      href="/guide/compound-interest-72-rule-2026/"
                      className="text-primary-600 underline dark:text-primary-500"
                    >
                      복리 계산법과 72의 법칙 2026
                    </Link>{' '}
                    — 단리 vs 복리 차이, 원금 2배 기간 추정
                  </li>
                  <li>
                    →{' '}
                    <Link
                      href="/guide/inflation-money-value-2026/"
                      className="text-primary-600 underline dark:text-primary-500"
                    >
                      인플레이션과 화폐가치 2026
                    </Link>{' '}
                    — 명목 이자율 vs 실질 수익률 이해
                  </li>
                  <li>
                    →{' '}
                    <Link
                      href="/calculator/loan/"
                      className="text-primary-600 underline dark:text-primary-500"
                    >
                      대출이자 계산기
                    </Link>{' '}
                    — 대출 상환액과 총이자 비교
                  </li>
                  <li>
                    →{' '}
                    <Link
                      href="/category/finance/"
                      className="text-primary-600 underline dark:text-primary-500"
                    >
                      금융 카테고리
                    </Link>{' '}
                    — 대출, 예금, 적금, 환율 관련 모든 계산기 및 가이드
                  </li>
                </ul>
              </section>

              <section
                aria-label="출처 및 면책"
                className="rounded-lg border border-border-base p-4 text-caption text-text-tertiary"
              >
                <p className="mb-2">
                  <strong>참고 자료</strong>:{' '}
                  <a
                    href="https://finlife.fss.or.kr/"
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="text-primary-600 underline dark:text-primary-500"
                  >
                    금융감독원 금융소비자 정보
                  </a>
                  ,{' '}
                  <a
                    href="https://www.kdic.or.kr/"
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="text-primary-600 underline dark:text-primary-500"
                  >
                    예금보험공사 예금자보호 기준
                  </a>
                  ,{' '}
                  <a
                    href="https://www.bok.or.kr/"
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="text-primary-600 underline dark:text-primary-500"
                  >
                    한국은행 금리 정보
                  </a>
                  .
                </p>
                <p>
                  <strong>업데이트</strong>: {DATE_MODIFIED}. AI 보조 작성 후 운영자 검수 완료.
                </p>
              </section>
            </article>
          </main>
        </div>
        <Footer />
      </div>
    </>
  );
}
