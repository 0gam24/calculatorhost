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

const URL = 'https://calculatorhost.com/guide/mortgage-refinance-savings-2026/';
const DATE_PUBLISHED = '2026-06-26';
const DATE_MODIFIED = '2026-06-26';

export const metadata: Metadata = {
  title:
    '대출 갈아타기 손익 계산 2026 — 중도상환수수료를 빼고도 이득일까',
  description:
    '대출 갈아타기(대환)가 이득인지 계산하려면 금리 인하분에서 중도상환수수료와 부대비용을 차감해야 합니다. 손익분기 회수기간 공식, 실제 계산 예시, DSR·LTV 재심사 주의점을 정리합니다.',
  keywords: [
    '대출 갈아타기',
    '대환대출',
    '중도상환수수료',
    '금리 비교',
    '손익분기',
    '대출이자 절감',
    '대출 재계약',
    '금리 인하',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [
      {
        url: '/og-default.png',
        width: 1200,
        height: 630,
        alt: '대출 갈아타기 손익 계산 2026',
      },
    ],
    title: '대출 갈아타기 손익 계산 2026',
    description:
      '중도상환수수료를 고려한 대환대출 손익계산 공식과 실제 계산 사례.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '대출 갈아타기 손익 계산 2026',
    description: '금리 인하분과 수수료를 계산해 갈아타기 가치 판단하기.',
  },
};

const FAQ_ITEMS = [
  {
    question: '대출 갈아타기는 언제 이득인가요?',
    answer:
      '금리 인하분으로 줄어드는 이자의 현재가가 중도상환수수료와 부대비용을 초과할 때 이득입니다. 단순히 금리 차이만 보면 안 되고, 남은 상환 기간 동안의 누적 절감액에서 모든 비용을 뺀 순이익을 계산해야 합니다.',
  },
  {
    question: '중도상환수수료는 보통 얼마인가요?',
    answer:
      '금융기관과 상품마다 다릅니다. 일반적으로 중도상환원금의 0.5~1.5% 수준이며, 보유 기간에 따라 체감됩니다. 예를 들어 3년 면제 기간이 있으면 3년 경과 후엔 수수료가 0이 됩니다. 정확한 수수료율은 약정서를 확인하거나 은행에 문의하세요.',
  },
  {
    question: '갈아타기 시 DSR·LTV 재심사가 필요한가요?',
    answer:
      '네, 새로운 대출이므로 금융기관의 심사가 필요합니다. 특히 DSR이 증가했다면 신청이 거절될 수 있습니다. 신용도가 하락했거나 다른 대출이 늘었다면 심사 결과가 현재와 다를 수 있으므로, 사전에 은행에 예상 한도를 확인하는 것이 좋습니다.',
  },
  {
    question: '갈아타기 시 근저당 설정·말소비는 얼마나 드나요?',
    answer:
      '근저당 설정·말소 비용은 은행과 지역마다 다르지만, 합계 수십만 원대입니다. 예를 들어 설정비 10~20만 원, 말소비 5~10만 원 정도가 일반적입니다. 정확한 비용은 해당 은행이나 법무사 상담으로 확인하세요.',
  },
  {
    question: '갈아타기 후 일시금 상환이나 기간 단축이 가능한가요?',
    answer:
      '네, 새로운 대출이므로 약정 조건에 따라 가능합니다. 다만 일시금 상환 시 또 다른 중도상환수수료가 발생할 수 있으므로, 약정 내용을 꼼꼼히 확인하세요.',
  },
  {
    question: '신용점수가 갈아타기 후 회복되나요?',
    answer:
      '새 대출 신청은 신용조회로 인해 단기적 점수 하락을 초래합니다. 이후 성실한 상환으로 점수가 서서히 회복됩니다. 다만 갈아타기 자체가 신용불량을 의미하진 않으므로 과도히 걱정할 필요는 없습니다.',
  },
  {
    question: '온라인 갈아타기 플랫폼과 은행 직거래, 어느 것이 유리한가요?',
    answer:
      '온라인 플랫폼은 여러 기관의 금리를 비교할 수 있는 장점이 있고, 은행 직거래는 기존 거래 실적에 따른 우대가 가능합니다. 두 경로 모두 수수료와 금리를 비교해 더 유리한 쪽을 선택하세요.',
  },
];

export default function MortgageRefinanceSavings2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '대출 갈아타기 손익 계산 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '대출 갈아타기 손익 계산 2026',
    description:
      '중도상환수수료와 부대비용을 고려한 대환대출 손익분기점 계산법.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: [
      '대출갈아타기',
      '대환',
      '중도상환수수료',
      '금리절감',
      '손익분기',
    ],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '대출 갈아타기 손익 계산 2026 | calculatorhost',
    description:
      '대출 갈아타기 이득 판단을 위한 손익분기 회수기간 계산 가이드.',
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
                    { name: '대출 갈아타기 손익 계산 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">
                  대출 예정자 · 8분 읽기 · 2026-06-26
                </p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  대출 갈아타기 손익 계산 2026
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  금리가 인하되면 대출을 갈아타기(대환)를 고려하게 됩니다. 하지만 단순히 금리 차이만
                  보면 안 됩니다. 중도상환수수료, 근저당 설정·말소비, 인지세 등 모든 비용을 빼야 진정한
                  이득인지 판단할 수 있습니다. 이 가이드에서는 손익분기점 계산 공식, 실제 사례,
                  그리고 갈아타기 후 주의할 점들을 정리합니다.
                </p>
              </header>

              <AdSlot slot="guide-mortgage-refinance-savings-2026-top" format="horizontal" />

              <section aria-label="요약" className="card border-l-4 border-l-primary-500">
                <h2 className="mb-2 text-caption uppercase tracking-wider text-primary-500">
                  핵심 요약
                </h2>
                <table className="w-full border-collapse text-sm">
                  <caption className="mb-2 text-left font-semibold text-text-primary">
                    대출 갈아타기 손익 계산 프레임워크
                  </caption>
                  <thead>
                    <tr className="border-b border-border-base">
                      <th scope="col" className="pb-2 pr-3 text-left font-semibold">
                        항목
                      </th>
                      <th scope="col" className="pb-2 text-left font-semibold">
                        설명
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-text-secondary">
                    <tr className="border-b border-border-base">
                      <td className="py-2 pr-3 font-semibold">이자 절감액</td>
                      <td className="py-2">
                        (기존금리 − 신규금리) × 대출잔액 × 잔존년수
                      </td>
                    </tr>
                    <tr className="border-b border-border-base">
                      <td className="py-2 pr-3 font-semibold">중도상환수수료</td>
                      <td className="py-2">
                        대출잔액 × 수수료율 × 체감계수 (보통 1~3년 후 감면)
                      </td>
                    </tr>
                    <tr className="border-b border-border-base">
                      <td className="py-2 pr-3 font-semibold">부대비용</td>
                      <td className="py-2">
                        근저당 설정·말소비, 인지세 등 합계
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-3 font-semibold">순이익</td>
                      <td className="py-2">
                        이자 절감액 − 중도상환수수료 − 부대비용
                      </td>
                    </tr>
                  </tbody>
                </table>
              </section>

              <section className="space-y-4">
                <h2 className="border-b border-border-base pb-2 text-2xl font-bold">
                  대출 갈아타기란 무엇인가요?
                </h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  대출 갈아타기(대환대출)는 기존 대출을 새로운 대출로 상환하는 방식입니다. 보통 금리가
                  낮아졌을 때 이전 대출을 상환하고 새 대출을 받아 남은 기간의 이자를 줄이려는 목적으로
                  진행됩니다.
                </p>
                <div className="rounded-lg bg-bg-raised p-4">
                  <p className="font-mono text-sm font-semibold text-text-primary">
                    기존 대출 상환 (중도상환) ← 새로운 대출 실행 → 이자 절감
                  </p>
                </div>
                <p className="text-text-secondary leading-relaxed">
                  예를 들어, 5년 전 금리 5.0%로 2억을 빌렸는데 지금 금리가 3.8%가 되었다면, 남은 기간 동안
                  절감할 이자가 중도상환수수료보다 크면 갈아타기가 이득입니다.
                </p>
                <p className="text-text-secondary leading-relaxed">
                  다만 갈아타기는 새로운 대출 신청이므로 금융기관의 심사를 다시 받아야 하며, DSR·LTV
                  규제에 따라 한도가 줄어들 수 있습니다.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="border-b border-border-base pb-2 text-2xl font-bold">
                  이자 절감액을 어떻게 계산하나요?
                </h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  이자 절감액은 금리 차이와 남은 기간, 그리고 대출잔액으로 계산합니다. 단순한 공식이지만,
                  상환 방식에 따라 결과가 달라집니다.
                </p>
                <div className="rounded-lg bg-bg-raised p-4">
                  <h3 className="mb-2 font-semibold text-text-primary">
                    연 이자 절감액 (근사값)
                  </h3>
                  <p className="font-mono text-sm font-semibold text-text-primary">
                    연 절감액 ≈ (기존금리 − 신규금리) × 현재 대출잔액
                  </p>
                  <p className="mt-3 text-xs text-text-tertiary">
                    예: 대출잔액 2억, 기존금리 5.0% → 신규금리 3.8% (금리차 1.2%)
                    <br />
                    연 절감액 ≈ 1.2% × 2억 = 240만 원
                  </p>
                </div>
                <p className="text-text-secondary leading-relaxed">
                  위 공식은 원리금균등 상환 중간 시점에서의 근사값입니다. 정확한 계산은 현재 잔액, 남은
                  기간, 정확한 금리, 상환 방식 등을 모두 고려해야 하므로 은행이나 대출 계산기를 활용하세요.
                </p>
                <p className="text-text-secondary leading-relaxed">
                  다만 대출을 받은 지 오래될수록(상환이 진행될수록) 남은 원금이 줄어들므로 절감액도
                  줄어듭니다. 예를 들어 20년 약정 중 10년이 지났다면, 절감 기간은 약 10년 남습니다.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="border-b border-border-base pb-2 text-2xl font-bold">
                  중도상환수수료는 왜 내야 하나요?
                </h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  중도상환수수료는 약정된 이자 수입의 손실을 보전하는 대출기관의 수수료입니다. 은행 입장에서
                  상환 일정을 단축당하면 받을 수 있었던 이자가 줄어들기 때문입니다.
                </p>
                <div className="rounded-lg bg-bg-raised p-4">
                  <h3 className="mb-2 font-semibold text-text-primary">
                    중도상환수수료 계산 (일반적 예시)
                  </h3>
                  <p className="font-mono text-sm font-semibold text-text-primary">
                    수수료 = 중도상환원금 × 수수료율 × 체감계수
                  </p>
                  <p className="mt-3 text-xs text-text-tertiary">
                    예: 잔액 2억, 수수료율 1.2%, 잔존기간 1.5년/면제기간 3년
                    <br />
                    체감계수 = 1.5년 ÷ 3년 = 0.5
                    <br />
                    수수료 ≈ 2억 × 1.2% × 0.5 = 120만 원
                  </p>
                </div>
                <p className="text-text-secondary leading-relaxed">
                  수수료율과 체감 방식은 금융기관과 상품마다 큰 차이가 납니다. 일부 상품은 3년 경과 후
                  수수료를 완전 면제하고, 어떤 상품은 점진적으로 체감하는 방식을 씁니다. 정확한 조건은 약정서를
                  꼼꼼히 확인하거나 은행에 문의하세요.
                </p>
                <p className="text-text-secondary leading-relaxed">
                  다만 최근에는 중도상환수수료가 없거나 매우 낮은 상품도 있으니, 갈아타기 전 현재 대출의
                  약정 내용을 반드시 확인하세요.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="border-b border-border-base pb-2 text-2xl font-bold">
                  부대비용에는 무엇이 포함되나요?
                </h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  갈아타기 시 중도상환수수료 외에도 여러 비용이 발생합니다. 이들을 모두 합산해야 정확한 손익을
                  판단할 수 있습니다.
                </p>
                <div className="rounded-lg bg-bg-raised p-4">
                  <h3 className="mb-3 font-semibold text-text-primary">
                    주요 부대비용 항목
                  </h3>
                  <ul className="space-y-2 text-sm text-text-secondary">
                    <li>
                      <strong>근저당 설정비:</strong> 새 대출기관의 권리 설정 비용, 보통 10~20만 원
                    </li>
                    <li>
                      <strong>근저당 말소비:</strong> 기존 대출기관의 권리 해제 비용, 보통 5~10만 원
                    </li>
                    <li>
                      <strong>인지세:</strong> 대출금액 구간별 정액 세금이며, 보통 은행과 차주가 절반씩 분담
                    </li>
                    <li>
                      <strong>등기료:</strong> 설정·말소 등기 비용, 수십만 원대
                    </li>
                    <li>
                      <strong>법무사 대리비:</strong> 등기 대리 비용, 상황에 따라 10~30만 원
                    </li>
                  </ul>
                </div>
                <p className="text-text-secondary leading-relaxed">
                  합산하면 보통 100~150만 원대의 부대비용이 발생합니다. 정확한 견적은 대출 신청 은행에 미리
                  요청하세요.
                </p>
                <p className="text-text-secondary leading-relaxed">
                  다만 은행과 지역, 등기 전문가에 따라 비용이 크게 다르므로, 여러 기관에 견적을 받아
                  비교하는 것이 좋습니다.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="border-b border-border-base pb-2 text-2xl font-bold">
                  손익분기점은 언제인가요?
                </h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  손익분기점은 연간 이자 절감액이 모든 비용을 상쇄하는 기간입니다. 이 기간이 남은 상환 기간보다
                  짧으면 갈아타기가 이득입니다.
                </p>
                <div className="rounded-lg bg-bg-raised p-4">
                  <h3 className="mb-2 font-semibold text-text-primary">
                    손익분기 회수기간 공식
                  </h3>
                  <p className="font-mono text-sm font-semibold text-text-primary">
                    회수기간 (년) = (중도상환수수료 + 부대비용) ÷ 연 이자 절감액
                  </p>
                  <p className="mt-3 text-xs text-text-tertiary">
                    예: 중도상환수수료 120만 + 부대비용 120만 = 240만 원
                    <br />
                    연 이자 절감액 240만 원
                    <br />
                    회수기간 = 240만 ÷ 240만 = 1년
                  </p>
                </div>
                <p className="text-text-secondary leading-relaxed">
                  위 예시에서는 1년 후부터 순이익이 발생합니다. 만약 남은 상환 기간이 10년이라면, 이후 9년간
                  연 240만 원씩 절감할 수 있으므로 총 약 2,160만 원의 순이익이 생깁니다.
                </p>
                <p className="text-text-secondary leading-relaxed">
                  다만 위 계산은 금리 변동이 없다고 가정한 것입니다. 변동금리 대출이라면 금리 변동에 따라
                  결과가 달라질 수 있습니다.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="border-b border-border-base pb-2 text-2xl font-bold">
                  실제 계산 사례: 잔액 2억, 금리차 1.2%p
                </h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  다음은 실제 갈아타기 시나리오입니다. 계산 과정을 단계별로 따라가며 이해해 보세요.
                </p>

                <div className="rounded-lg bg-bg-raised p-4">
                  <h3 className="mb-3 font-semibold text-text-primary">상황 설정 (가정)</h3>
                  <ul className="space-y-2 text-sm text-text-secondary">
                    <li>· 현재 대출잔액: 2억 원</li>
                    <li>· 기존 금리: 5.0%, 신규 금리: 3.8% (금리차 1.2%p)</li>
                    <li>· 상환 기간: 원래 30년 약정, 현재 1.5년 경과 (잔존 28.5년)</li>
                    <li>
                      · 중도상환수수료: 수수료율 1.2%, 3년 면제 → 1.5년 경과 시 체감계수 0.5 → 수수료
                      120만 원
                    </li>
                    <li>· 부대비용(근저당 설정·말소·인지세 등): 약 120만 원</li>
                    <li>· 신용도 양호, DSR·LTV 재심사 통과 가능 가정</li>
                  </ul>
                </div>

                <div className="rounded-lg bg-bg-raised p-4">
                  <h3 className="mb-3 font-semibold text-text-primary">계산 단계</h3>
                  <ul className="space-y-2 text-sm text-text-secondary">
                    <li>
                      <strong>Step 1. 연 이자 절감액</strong>
                      <br />
                      이자 절감액 ≈ 1.2% × 2억 = 240만 원/년
                    </li>
                    <li>
                      <strong>Step 2. 총 비용</strong>
                      <br />
                      중도상환수수료 120만 + 부대비용 120만 = 240만 원
                    </li>
                    <li>
                      <strong>Step 3. 손익분기 회수기간</strong>
                      <br />
                      회수기간 = 240만 ÷ 240만 = 1년
                    </li>
                    <li>
                      <strong>Step 4. 잔존 기간에서의 순이익</strong>
                      <br />
                      남은 기간 = 28.5년 − 1년 = 27.5년
                      <br />
                      순이익 = 240만 × 27.5년 = 6,600만 원 (대략)
                    </li>
                  </ul>
                </div>

                <p className="text-text-secondary leading-relaxed">
                  위 사례에서는 1년 후부터 순이익이 발생하며, 남은 27.5년 동안 약 6,600만 원을 절감할 수
                  있습니다. 따라서 갈아타기는 충분히 이득입니다.
                </p>

                <p className="text-text-secondary leading-relaxed">
                  다만 이 계산은 단순화한 예시입니다. 실제로는 상환액이 매달 줄어들고, 변동금리 대출일 경우
                  금리가 변할 수 있으며, 중도상환수수료와 체감 방식도 상품마다 다릅니다. 정확한 계산은 대출
                  계산기나 은행 상담을 통해 확인하세요.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="border-b border-border-base pb-2 text-2xl font-bold">
                  갈아타기 후 주의할 점은?
                </h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  갈아타기는 이자 절감의 기회이지만, 신청 전에 여러 요소를 확인해야 합니다.
                </p>

                <div className="rounded-lg bg-bg-raised p-4">
                  <h3 className="mb-3 font-semibold text-text-primary">
                    체크리스트
                  </h3>
                  <ul className="space-y-2 text-sm text-text-secondary">
                    <li>
                      <strong>1. DSR·LTV 재심사 준비</strong>
                      <br />
                      신용 점수가 하락했거나 다른 대출이 늘었다면 신청이 거절될 수 있습니다. 사전에 은행에
                      예상 한도를 확인하세요.
                    </li>
                    <li>
                      <strong>2. 수수료와 부대비용 정확히 파악</strong>
                      <br />
                      중도상환수수료는 약정서에서, 부대비용은 은행 견적서와 법무사 상담으로 미리 확인하세요.
                    </li>
                    <li>
                      <strong>3. 신규 대출 조건 꼼꼼히 확인</strong>
                      <br />
                      금리, 기간, 만기 후 금리 인상, 중도상환수수료 등 약정 내용을 다시 한 번 읽으세요.
                    </li>
                    <li>
                      <strong>4. 금리 고정 vs 변동 검토</strong>
                      <br />
                      지금은 금리가 낮지만 향후 인상될 수 있습니다. 고정금리와 변동금리의 장단점을 비교하세요.
                    </li>
                    <li>
                      <strong>5. 신용점수 영향 인식</strong>
                      <br />
                      새 대출 신청은 신용조회로 단기 점수 하락을 초래합니다. 향후 중요한 대출 계획이 있다면
                      시점을 조정하세요.
                    </li>
                  </ul>
                </div>

                <p className="text-text-secondary leading-relaxed">
                  다만 갈아타기가 항상 이득인 것은 아닙니다. 금리 차이가 작거나 남은 기간이 짧다면 비용 때문에
                  손해볼 수 있습니다. 정확한 계산 후 신청하세요.
                </p>
              </section>

              <AdSlot
                slot="guide-mortgage-refinance-savings-2026-mid"
                format="rectangle"
              />

              <FaqSection items={FAQ_ITEMS} />

              <section className="card border-l-2 border-l-danger-500 bg-danger-500/5">
                <h2 className="mb-2 text-lg font-semibold text-danger-700 dark:text-danger-300">
                  주의사항 및 면책조항
                </h2>
                <ul className="space-y-2 text-sm text-danger-700 dark:text-danger-300">
                  <li>
                    • 본 가이드는 일반 금융 정보 제공 목적이며, 특정 금융기관의 실제 조건을 보장하지
                    않습니다.
                  </li>
                  <li>
                    • 중도상환수수료, 금리, 부대비용은 <strong>금융기관과 상품마다 상이</strong>
                    하므로, 갈아타기 신청 전에 반드시 약정서와 은행 견적서를 확인하세요.
                  </li>
                  <li>
                    • 실제 이자 절감액은 정확한 상환 방식, 남은 기간, 변동금리 여부 등에 따라 달라집니다.
                  </li>
                  <li>
                    • DSR·LTV 재심사 결과에 따라 신청이 거절되거나 조건이 변경될 수 있습니다.
                  </li>
                  <li>
                    • 신용도 변화, 금리 변동, 정책 변경 등 예측 불가능한 요소가 있으므로, 최종 판단은
                    은행 상담을 통해 하세요.
                  </li>
                  <li>
                    • 본 사이트는 금융상품 권유를 하지 않으며, 모든 재무 결정은 본인 책임입니다.
                  </li>
                </ul>
              </section>

              <section aria-label="관련 도구" className="card">
                <h2 className="mb-3 text-lg font-semibold">관련 계산기 및 가이드</h2>
                <ul className="space-y-2 text-sm">
                  <li>
                    →{' '}
                    <Link
                      href="/calculator/loan/"
                      className="text-primary-600 underline dark:text-primary-500"
                    >
                      대출이자 계산기
                    </Link>{' '}
                    — 원리금균등·만기일시별 월 상환액 및 총 이자 비교
                  </li>
                  <li>
                    →{' '}
                    <Link
                      href="/calculator/loan-limit/"
                      className="text-primary-600 underline dark:text-primary-500"
                    >
                      대출한도 계산기 (DSR/LTV/DTI)
                    </Link>{' '}
                    — 갈아타기 후 신규 한도 확인
                  </li>
                  <li>
                    →{' '}
                    <Link
                      href="/guide/dsr-dti-ltv-difference-2026/"
                      className="text-primary-600 underline dark:text-primary-500"
                    >
                      DSR·DTI·LTV 차이와 계산법 2026
                    </Link>{' '}
                    — 대출 재심사 시 영향받을 규제 지표 학습
                  </li>
                  <li>
                    →{' '}
                    <Link
                      href="/guide/prepayment-penalty-fee-2026/"
                      className="text-primary-600 underline dark:text-primary-500"
                    >
                      중도상환수수료와 계산법 2026
                    </Link>{' '}
                    — 수수료 상세 설명
                  </li>
                  <li>
                    →{' '}
                    <Link
                      href="/category/finance/"
                      className="text-primary-600 underline dark:text-primary-500"
                    >
                      금융 카테고리
                    </Link>{' '}
                    — 대출, 예금, 적금 관련 모든 계산기 및 가이드
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
                    href="https://www.fsc.go.kr/"
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="text-primary-600 underline dark:text-primary-500"
                  >
                    금융위원회
                  </a>
                  ,{' '}
                  <a
                    href="https://www.fss.or.kr/"
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="text-primary-600 underline dark:text-primary-500"
                  >
                    금융감독원
                  </a>
                  ,{' '}
                  <a
                    href="https://www.bok.or.kr/"
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="text-primary-600 underline dark:text-primary-500"
                  >
                    한국은행
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
