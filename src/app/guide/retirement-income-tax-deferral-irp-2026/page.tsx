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

const URL = 'https://calculatorhost.com/guide/retirement-income-tax-deferral-irp-2026/';
const DATE_PUBLISHED = '2026-06-19';
const DATE_MODIFIED = '2026-06-19';

export const metadata: Metadata = {
  title: '퇴직소득세 이연 2026 | IRP 이체로 30% 감면받는 법 | calculatorhost',
  description:
    '퇴직금을 IRP·연금저축에 이체해 세금을 미루고, 연금 수령 시 30~40% 감면받는 법. 과세이연 조건, 제한 시간, 실제 절감액 시뮬레이션.',
  keywords: [
    '퇴직소득세 이연',
    'IRP 이체',
    '퇴직금 세금',
    '연금계좌',
    '연금저축',
    '종합소득세',
    '세금 감면',
    '소득세법 146의2',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '퇴직소득세 이연 2026 | IRP 이체로 30% 감면받는 법 | calculatorhost' }],
    title: '퇴직소득세 이연 2026 — IRP 이체로 30% 감면',
    description: '퇴직금을 연금계좌에 이체해 세금을 미루고, 나중에 30~40% 절감받는 구체적 방법.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
};

const FAQ_ITEMS = [
  {
    question: '퇴직소득세 1,000만 원을 이연하면 실제로 얼마나 절세되나요?',
    answer:
      '10년 이내 연금으로 수령하면 700만 원만 세금으로 내게 되어 300만 원이 절감됩니다. 10년 초과로 수령하면 600만 원만 내서 400만 원이 절감되죠. 단, 중간에 일시금으로 받으면 과세이연이 종료되어 전액 세금을 내야 합니다.',
  },
  {
    question: 'IRP에 이체하는 60일 기한을 놓치면 어떻게 되나요?',
    answer:
      '퇴직금을 받은 날부터 60일 이내에 이체하지 않으면 과세이연 혜택을 받을 수 없습니다. 이 경우 퇴직급여를 받은 당해 연도에 퇴직소득세를 그대로 내야 합니다. 반드시 회사에서 받은 퇴직금 지급 확인증(원천징수 영수증)에서 지급일을 확인하고, 그 날부터 60일 안에 금융기관(은행·증권사)에 이체 신청하세요.',
  },
  {
    question: '연금저축과 IRP 둘 다에 이체할 수 있나요?',
    answer:
      '네, 퇴직금을 여러 계좌에 분할 이체할 수 있습니다. 단, 이후 세액공제를 받을 때는 연금저축 + IRP 합산 연 900만 원까지만 공제됩니다. 또한 이연퇴직소득세가 부과되는 계좌별로 과세이연 적용이 분리되므로, 금융기관에 정확한 이체 목적과 금액을 명시해야 합니다.',
  },
  {
    question: '과세이연 기간 동안 연금계좌가 줄어들면 어떻게 되나요?',
    answer:
      '과세이연 퇴직금으로 운용 손실이 발생하면, 연금 수령 시 그 손실도 반영되어 과세 대상 금액이 줄어듭니다. 예: 이연 1,000만 원이 운용 손실로 800만 원이 되면, 과세이연세액(이연 당시 계산된 세금)은 그대로지만, 추가 운용수익·손실은 별도 과세됩니다. 따라서 보수적 자산배분 권장.',
  },
  {
    question: '법인 퇴직금도 IRP 이체해서 과세이연 가능한가요?',
    answer:
      '법인사원으로서 퇴직급여를 받으면 동일하게 과세이연 적용이 가능합니다(소득세법 §146의2). 단, 법인 퇴직금이 퇴직연금(DB·DC) 형태인지 순수 퇴직금인지 확인이 필요하며, 각 회사의 퇴직금 정책을 인사팀에 문의해야 합니다.',
  },
  {
    question: '55세 미만인데 IRP를 이체할 수 있나요?',
    answer:
      '과세이연 목적으로 IRP에 이체하는 것 자체는 나이 제한이 없습니다. 다만 이연 퇴직금을 실제로 연금으로 수령하려면 만 55세 이상이어야 합니다. 55세 미만에서 일시금으로 받으면 과세이연이 종료되고 전액 세금이 부과되므로, 이연의 의미가 없게 됩니다.',
  },
  {
    question: '여러 회사를 다니며 받은 퇴직금을 모두 한 IRP에 이체할 수 있나요?',
    answer:
      '네, 여러 퇴직금을 하나의 IRP 계좌에 통합할 수 있습니다. 이 경우 이체 순서와 일자를 명확히 기록해 두어야 각각의 과세이연 시점과 세금 계산을 정확히 할 수 있습니다. 금융기관에 "이체 목적: 퇴직금 과세이연" 명시와 함께 각 회사별 퇴직금 지급 확인증을 제출하세요.',
  },
  {
    question: '과세이연 중 사망하면 상속인은 어떻게 되나요?',
    answer:
      '과세이연 중 수령자가 사망하면, 상속인이 해당 계좌를 인수할 수 있습니다. 이 경우 상속인이 이후 연금을 수령할 때 원래의 과세이연 감면율(30~40%)이 적용될 수 있으나, 구체적 상속세·소득세 처리는 세무사 상담이 필수입니다.',
  },
];

export default function RetirementIncomeTaxDeferralIrpPage() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '퇴직소득세 이연 — IRP 이체' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '퇴직소득세 이연 2026 — IRP 이체로 30% 감면받는 법',
    description:
      '퇴직금을 IRP·연금저축에 60일 이내 이체하면 세금을 미룰 수 있고, 나중에 연금으로 수령할 때 30~40% 감면받을 수 있습니다. 과세이연 조건, 제한 시간, 실제 절감액을 정리했습니다.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['퇴직소득세 이연', 'IRP', '연금계좌', '세금 감면', '소득세법 146의2'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '퇴직소득세 이연 2026 | IRP 이체로 30% 감면',
    description:
      '퇴직금을 받은 후 60일 이내에 연금계좌(IRP·연금저축)에 이체하면 세금을 미루고, 연금 수령 시 30~40% 절감받을 수 있습니다. 과세이연 메커니즘과 실전 체크리스트.',
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
                    { name: '퇴직소득세 이연' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">세금 · 9분 읽기 · 2026-06-19</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  퇴직소득세 이연 2026 — IRP 이체로 30% 감면받는 법
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  퇴직금을 받은 직후의 결정이 세금을 크게 줄일 수 있습니다.
                  퇴직급여를 60일 이내에 IRP나 연금저축 같은 연금계좌에 이체하면,
                  즉시 세금을 내지 않고 나중에 연금으로 수령할 때 30~40% 절감받을 수 있는 과세이연 제도를 소개합니다.
                </p>
              </header>

              <AdSlot slot="guide-retirement-irp-top" format="horizontal" />

              <section aria-label="요약" className="card border-l-4 border-l-primary-500">
                <h2 className="mb-2 text-caption uppercase tracking-wider text-primary-500">핵심 체크리스트</h2>
                <ul className="space-y-1.5 text-sm" data-speakable>
                  <li>✓ <strong>60일 기한 확인</strong> — 퇴직급여 지급일부터 정확히 60일 이내 이체</li>
                  <li>✓ <strong>IRP/연금저축 계좌 개설</strong> — 금융기관(은행·증권사) 방문</li>
                  <li>✓ <strong>이체 목적 명시</strong> — "퇴직금 과세이연"으로 신청</li>
                  <li>✓ <strong>30% 절감 수령 조건</strong> — 만 55세 이상 + 10년 이내 연금 수령</li>
                  <li>✓ <strong>중간 인출 위험</strong> — 일시금 인출 시 과세이연 종료, 전액 세금 부과</li>
                  <li>✓ <strong>세액공제와 분리</strong> — 이연(세금 미룰 때) ≠ 세액공제(납입 시 공제)</li>
                </ul>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">퇴직소득세 이연이란?</h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  퇴직금을 받을 때 일반적으로 "퇴직소득세"를 즉시 납부합니다.
                  하지만 <strong>퇴직금을 60일 이내에 연금계좌(IRP·연금저축)에 이체하면,
                  그 세금을 미룰 수 있고, 나중에 연금으로 찾을 때 30~40% 절감받을 수 있습니다.</strong>
                </p>
                <p className="text-text-secondary leading-relaxed">
                  예를 들어, 퇴직소득세로 1,000만 원을 내야 하는 경우, 이를 IRP에 이체하면:
                </p>
                <ul className="space-y-2 border-l-4 border-l-highlight-500 bg-card pl-4 py-3 text-sm">
                  <li>
                    <strong>지금 당장:</strong> 세금 0원 (이연)
                  </li>
                  <li>
                    <strong>55세 이후 10년 안에 연금 수령 시:</strong> 세금 700만 원만 내기 (30% 절감)
                  </li>
                  <li>
                    <strong>절감액:</strong> 300만 원
                  </li>
                </ul>
                <p className="text-sm text-text-tertiary">
                  이것이 바로 "과세이연"의 가치입니다. 세금을 미루면서도,
                  나중에 수령할 때는 원금이 계속 운용되어 추가 수익을 만들 수 있습니다.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">과세이연의 법적 근거 — 소득세법 §146의2</h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  소득세법 제146조의2는 "퇴직소득 과세이연" 규정으로, 다음 조건을 만족하면 세금 납부를 미룰 수 있습니다:
                </p>
                <ul className="space-y-2 text-sm">
                  <li>
                    <strong>1. 이체 기한:</strong> 퇴직급여를 받은 날부터 <strong>60일 이내</strong>
                  </li>
                  <li>
                    <strong>2. 이체 계좌:</strong> IRP(퇴직연금계좌) 또는 연금저축 (세금우대 조건 충족해야 함)
                  </li>
                  <li>
                    <strong>3. 원천징수 대상에서 제외:</strong> 이연 당시 퇴직소득세 원천징수하지 않음
                  </li>
                  <li>
                    <strong>4. 이후 과세:</strong> 연금으로 수령할 때 종합소득세 과세 (단, 감면 적용)
                  </li>
                </ul>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">핵심: 연금 수령 시 30~40% 감면 메커니즘</h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  과세이연의 진짜 가치는 "세금을 미루는 것"이 아니라,
                  나중에 연금으로 받을 때 세율이 낮아진다는 점입니다 (소득세법 §129①제5의2호).
                </p>

                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <caption className="mb-3 text-left text-xs font-semibold text-text-secondary">
                      과세이연 퇴직소득 — 연금 수령 시 세율 (2026 기준)
                    </caption>
                    <thead>
                      <tr className="border-b border-border-base bg-bg-raised">
                        <th scope="col" className="px-3 py-2 text-left font-semibold">수령 기간</th>
                        <th scope="col" className="px-3 py-2 text-right font-semibold">과세율</th>
                        <th scope="col" className="px-3 py-2 text-right font-semibold">절감율</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="px-3 py-2">연금 수령 기간 10년 이하</td>
                        <td className="px-3 py-2 text-right">이연세액의 70%</td>
                        <td className="px-3 py-2 text-right text-highlight-500 font-semibold">30% 감면</td>
                      </tr>
                      <tr className="border-b border-border-base bg-card">
                        <td className="px-3 py-2">연금 수령 기간 10년 초과</td>
                        <td className="px-3 py-2 text-right">이연세액의 60%</td>
                        <td className="px-3 py-2 text-right text-highlight-500 font-semibold">40% 감면</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <p className="text-sm text-text-tertiary mt-3">
                  <strong>주의:</strong> "10년 이하" "10년 초과"는 <strong>실제 연금을 수령하는 연차</strong>를 기준으로 합니다.
                  이체 후 대기 기간이 아닙니다. 예: 50세에 이연 → 65세부터 5년간 연금 수령 = "5년 수령"이므로 10년 이하 기준 적용.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">Step 1. 퇴직금을 받은 직후 60일 이내에 신청</h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  퇴직금을 받은 날부터 정확히 60일 이내에 금융기관에 이체를 신청해야 합니다.
                  기한이 하루 넘어가면 과세이연 혜택을 받을 수 없으므로 주의가 필요합니다.
                </p>
                <ol className="space-y-3 text-sm">
                  <li>
                    <strong>1단계: 퇴직금 지급 확인</strong>
                    <br />
                    회사에서 받은 퇴직금 지급 확인증(원천징수 영수증)에 적힌 "지급일"을 확인합니다.
                    그 날부터 60일이 최종 기한입니다.
                  </li>
                  <li>
                    <strong>2단계: 금융기관 방문</strong>
                    <br />
                    은행(우리, 국민, 신한 등), 증권사(삼성증권, NH투자증권 등), 보험사의 IRP 담당팀을 방문합니다.
                    "퇴직금 과세이연 이체"를 신청하겠다고 명확히 말하세요.
                  </li>
                  <li>
                    <strong>3단계: 필요 서류 준비</strong>
                    <br />
                    퇴직금 지급 확인증, 신분증, 계좌 통장 사본(또는 신규 개설).
                    기관마다 다를 수 있으므로 미리 전화로 확인하세요.
                  </li>
                  <li>
                    <strong>4단계: 이체 목적 명시</strong>
                    <br />
                    이체 신청 시 <strong>"퇴직금 과세이연 목적"</strong>이라고 반드시 명기해야 합니다.
                    단순 "퇴직금 이체"라고 하면 일반 이체로 처리되어 과세이연 혜택을 못 받을 수 있습니다.
                  </li>
                  <li>
                    <strong>5단계: 송금 실행</strong>
                    <br />
                    회사에서 60일 이내에 해당 계좌로 송금하도록 합니다.
                    은행 이체는 1~2일 소요되므로, 마지막 날 신청보다는 여유 있게 하세요.
                  </li>
                </ol>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">Step 2. IRP와 연금저축 중 선택하기</h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  과세이연 목적으로 이체할 수 있는 계좌는 크게 두 가지입니다.
                  각각의 특징을 이해하고 자신의 상황에 맞는 것을 선택하세요.
                </p>

                <div className="space-y-3">
                  <div className="border-l-4 border-l-primary-500 bg-card px-4 py-3">
                    <h3 className="font-semibold text-text-primary mb-2">1. IRP (퇴직연금계좌)</h3>
                    <ul className="space-y-1.5 text-sm text-text-secondary">
                      <li>· <strong>용도:</strong> 퇴직금 이체에 특화된 계좌</li>
                      <li>· <strong>장점:</strong> 수수료 낮음, 투자 상품 다양, 통합 관리 용이</li>
                      <li>· <strong>제약:</strong> 만 55세 이상까지 인출 불가 (조기 인출 시 세금 부과)</li>
                      <li>· <strong>세액공제:</strong> 연 900만 원까지 (연금저축과 합산)</li>
                    </ul>
                  </div>

                  <div className="border-l-4 border-l-secondary-500 bg-card px-4 py-3">
                    <h3 className="font-semibold text-text-primary mb-2">2. 연금저축</h3>
                    <ul className="space-y-1.5 text-sm text-text-secondary">
                      <li>· <strong>용도:</strong> 매년 납입해서 장기 저축하는 계좌</li>
                      <li>· <strong>장점:</strong> 세액공제 가능, 자유로운 인출 (55세 이후, 납입 5년 이상)</li>
                      <li>· <strong>제약:</strong> 수수료 상대적으로 높을 수 있음</li>
                      <li>· <strong>세액공제:</strong> 연 600만 원(연금저축 단독) 또는 900만 원(IRP 합산)</li>
                    </ul>
                  </div>
                </div>

                <p className="text-sm text-text-tertiary mt-3">
                  <strong>추천:</strong> 퇴직금을 한 번에 이체하고, 55세까지 절대 건드릴 계획이라면 <strong>IRP</strong>.
                  중간에 인출 가능성이 있다면 <strong>연금저축</strong> 고려.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">Step 3. 실제 절감액 시뮬레이션</h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  구체적인 예시로, 과세이연이 실제로 얼마나 절세하는지 확인해 봅시다.
                </p>

                <div className="space-y-4 text-sm">
                  <div className="border border-border-base rounded-lg p-4">
                    <h3 className="font-semibold mb-3">예시 1: 퇴직소득세 1,000만 원, 10년 이내 연금 수령</h3>
                    <ul className="space-y-2 text-text-secondary">
                      <li>
                        <strong>상황:</strong> 50세에 퇴직금 5,000만 원 받음 → 퇴직소득세 1,000만 원 예상
                      </li>
                      <li>
                        <strong>선택 1 — 일시금 수령:</strong> 세금 1,000만 원 즉시 납부, 실수령 4,000만 원
                      </li>
                      <li>
                        <strong>선택 2 — IRP 이체 후 연금 수령:</strong>
                        <br />
                        · 지금: 세금 0원 (이연)
                        <br />
                        · 55세 이후 10년 안에 연금 수령 시: 세금 700만 원만 납부
                        <br />
                        · 실제 절감: 300만 원
                      </li>
                      <li className="text-highlight-500 font-semibold">
                        ✓ 결과: 선택 2가 300만 원 더 저축됨
                      </li>
                    </ul>
                  </div>

                  <div className="border border-border-base rounded-lg p-4">
                    <h3 className="font-semibold mb-3">예시 2: 퇴직소득세 2,000만 원, 10년 초과 연금 수령</h3>
                    <ul className="space-y-2 text-text-secondary">
                      <li>
                        <strong>상황:</strong> 45세에 퇴직금 1억 원 받음 → 퇴직소득세 2,000만 원 예상
                      </li>
                      <li>
                        <strong>선택 1 — 일시금 수령:</strong> 세금 2,000만 원 즉시 납부, 실수령 8,000만 원
                      </li>
                      <li>
                        <strong>선택 2 — IRP 이체 후 장기 연금 수령 (11년+):</strong>
                        <br />
                        · 지금: 세금 0원 (이연)
                        <br />
                        · 55세 이후 11년 이상 거쳐 연금 수령 시: 세금 1,200만 원만 납부 (40% 감면)
                        <br />
                        · 실제 절감: 800만 원
                      </li>
                      <li className="text-highlight-500 font-semibold">
                        ✓ 결과: 선택 2가 800만 원 더 저축됨 (장기 보유 시 절감 더 큼)
                      </li>
                    </ul>
                  </div>
                </div>

                <p className="text-sm text-text-tertiary mt-3">
                  시뮬레이션은 예시이며, 실제 퇴직소득세액은 근속연수·환산급여·누진공제 등에 따라 달라집니다.
                  정확한 계산은 <Link href="/calculator/severance/" className="text-primary-500 underline">퇴직금 계산기</Link>를 참고하세요.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">주의: 과세이연 후 일시금 인출은 금지</h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  과세이연의 가장 큰 함정은 <strong>중간에 일시금으로 인출하면 과세이연이 즉시 종료</strong>된다는 점입니다.
                </p>
                <ul className="space-y-2 border-l-4 border-l-danger-500 bg-card pl-4 py-3 text-sm">
                  <li>
                    <strong>❌ 위험한 상황:</strong> IRP에 이체 후 3년 뒤 "급하게 돈이 필요해서" 일시금으로 인출
                  </li>
                  <li>
                    <strong>결과:</strong> 과세이연이 종료되고, 이연되었던 전체 퇴직소득세를 그 시점에 내야 함
                  </li>
                  <li>
                    <strong>추가 페널티:</strong> 중도 인출 수수료 + 기간 이자까지 부과될 수 있음
                  </li>
                </ul>
                <p className="text-sm">
                  따라서 과세이연을 선택한다면, 55세까지는 절대 건드리지 않겠다는 강한 의지가 필요합니다.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">세액공제와의 차이점 — 혼동하면 안 됨</h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  많은 사람이 "과세이연"과 "세액공제"를 헷갈립니다.
                  두 제도는 완전히 다른 혜택이니 명확히 구분하세요.
                </p>

                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <caption className="mb-3 text-left text-xs font-semibold text-text-secondary">
                      과세이연 vs 세액공제 비교 (소득세법 §146의2 vs §59의3)
                    </caption>
                    <thead>
                      <tr className="border-b border-border-base bg-bg-raised">
                        <th scope="col" className="px-3 py-2 text-left font-semibold">항목</th>
                        <th scope="col" className="px-3 py-2 text-left font-semibold">과세이연</th>
                        <th scope="col" className="px-3 py-2 text-left font-semibold">세액공제</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="px-3 py-2 font-semibold">언제 혜택?</td>
                        <td className="px-3 py-2">퇴직금 받을 때 세금 미룸 → 연금 수령 시 30~40% 절감</td>
                        <td className="px-3 py-2">매년 IRP·연금저축에 납입할 때 소득세에서 직접 공제</td>
                      </tr>
                      <tr className="border-b border-border-base bg-card">
                        <td className="px-3 py-2 font-semibold">금액 한도</td>
                        <td className="px-3 py-2">이연 퇴직소득 전액 (제한 없음)</td>
                        <td className="px-3 py-2">연 900만 원 (IRP + 연금저축 합산)</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="px-3 py-2 font-semibold">공제율</td>
                        <td className="px-3 py-2">30~40% 절감 (수령 기간에 따라)</td>
                        <td className="px-3 py-2">총급여 5,500만 원 이하 16.5%, 초과 13.2%</td>
                      </tr>
                      <tr className="border-b border-border-base bg-card">
                        <td className="px-3 py-2 font-semibold">둘 다 가능?</td>
                        <td className="px-3 py-2">네, 가능합니다.</td>
                        <td className="px-3 py-2">예: 과세이연 + 추가 납입분 세액공제</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <p className="text-sm text-text-tertiary mt-3">
                  <strong>실제 활용:</strong> 퇴직금 5,000만 원을 IRP에 과세이연으로 이체한 후,
                  별도로 연금저축에 매년 900만 원씩 납입하면 연 약 148만 원의 세액공제를 받을 수 있습니다.
                  둘을 함께 활용하면 시너지가 큽니다.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">연금 수령 기준 — 만 55세 이상 필수</h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  과세이연 퇴직금을 실제로 연금으로 수령하려면 몇 가지 조건을 충족해야 합니다.
                </p>
                <ul className="space-y-2 text-sm">
                  <li>
                    <strong>나이 조건:</strong> <strong>만 55세 이상</strong>에만 연금 수령 가능
                  </li>
                  <li>
                    <strong>가입 기간:</strong> 과세이연 목적의 IRP는 "5년 이상 가입" 요건이 면제될 수 있음
                    (단, 기관마다 상이하므로 확인 필수)
                  </li>
                  <li>
                    <strong>수령 방식:</strong> 일시금 수령 불가 → 반드시 "연금" 형태로 분할 수령해야 함
                    (예: 월 100만 원씩 5년, 또는 분기마다 일정액)
                  </li>
                  <li>
                    <strong>수령 기간:</strong> 최소 5년 이상 거쳐서 수령해야 "연금 수령" 조건 충족
                  </li>
                </ul>
                <p className="text-sm text-text-tertiary mt-3">
                  55세 이전에 일시금으로 인출하면 과세이연이 종료되고 전액 세금이 부과됩니다.
                  연금 개시 나이와 기간을 미리 확인해 두세요.
                </p>
              </section>

              <AdSlot slot="guide-retirement-irp-mid" format="rectangle" />

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">관련 법령 & 공식 출처</h2>
                <ul className="space-y-2 text-sm">
                  <li>
                    국가법령정보센터 소득세법 제146조의2:
                    <a href="https://www.law.go.kr" className="text-primary-500 underline" rel="nofollow">
                      https://www.law.go.kr
                    </a>
                  </li>
                  <li>
                    국세청 퇴직연금 가이드:
                    <a href="https://www.nts.go.kr" className="text-primary-500 underline" rel="nofollow">
                      https://www.nts.go.kr
                    </a>
                  </li>
                  <li>
                    금감원 연금저축 안내
                  </li>
                  <li>
                    소득세법 제129조 제1항 제5의2호 (연금 수령 시 과세)
                  </li>
                  <li>
                    소득세법 제59조의3 (연금계좌 세액공제)
                  </li>
                </ul>
              </section>

              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">관련 계산기 & 가이드</h2>
                <ul className="space-y-2 text-sm">
                  <li>
                    ➜ <Link href="/calculator/severance/" className="font-semibold text-primary-500 hover:underline">
                      퇴직금 계산기
                    </Link>
                    {' — 퇴직소득세 정확 계산 및 절감 시뮬'}
                  </li>
                  <li>
                    ➜ <Link href="/guide/retirement-income-tax-2026/" className="font-semibold text-primary-500 hover:underline">
                      퇴직소득세 계산법 2026
                    </Link>
                    {' — 연분연승·누진세 상세 가이드'}
                  </li>
                  <li>
                    ➜ <Link href="/guide/severance-vs-pension-dc-db/" className="font-semibold text-primary-500 hover:underline">
                      DC·DB·퇴직금 비교
                    </Link>
                    {' — 연금 상품별 특징'}
                  </li>
                  <li>
                    ➜ <Link href="/guide/private-pension-1500-million-separate-taxation-2026/" className="font-semibold text-primary-500 hover:underline">
                      사적연금 과세
                    </Link>
                    {' — 연금수령 시 종합소득 과세'}
                  </li>
                  <li>
                    ➜ <Link href="/calculator/retirement/" className="font-semibold text-primary-500 hover:underline">
                      은퇴자금 계산기
                    </Link>
                    {' — 필요한 총 은퇴 자산 역산'}
                  </li>
                </ul>
              </section>

              <section className="space-y-3 border-t border-border-base pt-6">
                <p className="text-xs text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 참고용이며 법적 효력이 없습니다.
                  개인의 퇴직금 이연 및 연금 관련 세무 처리는 세무사·회계사와 상담 후 결정하시기 바랍니다.
                  금융기관의 상품 조건 및 수수료도 사전에 확인하세요.
                </p>
              </section>

              <section className="space-y-3 border-t border-border-base pt-6">
                <p className="text-xs text-text-tertiary">
                  <strong>작성 정보:</strong> AI 보조 작성 후 운영자 검수.
                </p>
                <p className="text-xs text-text-tertiary">
                  마지막 갱신: 2026-06-19 | 2026년 최신 세율 및 소득세법 §146의2·§129①제5의2호 반영
                </p>
                <p className="text-xs text-text-tertiary">
                  <strong>인용 법조항:</strong> 소득세법 §146의2 (퇴직소득 과세이연), §129①제5의2호 (연금 수령 세율), §59의3 (세액공제)
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
