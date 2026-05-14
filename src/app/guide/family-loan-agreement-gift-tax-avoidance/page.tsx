

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

const URL = 'https://calculatorhost.com/guide/family-loan-agreement-gift-tax-avoidance/';
const DATE_PUBLISHED = '2026-05-14';
const DATE_MODIFIED = '2026-05-14';

export const metadata: Metadata = {
  title: '가족 간 차용증·금전대여 증여세 정확 정리 2026',
  description:
    '가족 간 금전대여 무이자·저리 대출로 적정이자율 차액 정리·적정이자율 4.6% 차액·1,000만원 면제 한도·차용증 작성·실질과세 입증·함정 5가지·신고 완벽 정리.',
  keywords: [
    '부모 자녀 금전대여',
    '차용증 증여세',
    '무이자 대출',
    '적정이자율 4.6%',
    '금전대여 증여세 절감',
    '차용증 작성',
    '특수관계인 금전거래',
    '가족 간 대출',
    '차용증 샘플',
    '2026 금전대여 세금',
  ],
  alternates: { canonical: URL },
  openGraph: {
    title: '가족 간 차용증·금전대여 증여세 정확 정리 2026',
    description: '무이자 대출 적정이자율 4.6% 차액·1,000만원 면제·차용증 필수 요소·실질과세 입증·함정 5가지.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '가족 간 차용증·금전대여 증여세 정확 정리 2026',
    description: '5억 무이자 대여 → 차액 2,300만 → 1,000만 초과 1,300만 증여세. 차용증 필수 요소 + 실질 입증 방법.',
  },
};

const FAQ_ITEMS = [
  {
    question: '부모로부터 받은 무이자 대출이 전부 증여세 안 하나요?',
    answer:
      '아니요. 상증법 §41의4에 따라 적정이자율(연 4.6%)과 실제 이자율의 차액에만 증여세가 과세됩니다. 차액이 연 1,000만 원 이하면 비과세입니다(시행령 §31의5). 예: 5억 무이자 대여 시 연 차액 = 5억 × 4.6% = 2,300만 원. 1,000만 원 초과 부분 1,300만 원만 증여세 대상입니다.',
  },
  {
    question: '몇 억까지 무이자로 빌릴 수 있나요?',
    answer:
      '차액이 1,000만 원이 되는 금액까지는 비과세입니다. 1,000만 ÷ 4.6% ≈ 2억 1,700만 원입니다. 예: 2억 1,700만 원을 무이자로 대여받으면 연 차액 약 1,000만 원 = 면제 한도선입니다. 2억 1,700만 원을 초과하면 초과분에 대한 차액 × 세율로 증여세가 발생합니다.',
  },
  {
    question: '차용증 없이 통장 이체만으로 증여세를 피할 수 있나요?',
    answer:
      '불가능합니다. 국세청은 실질과세 원칙(국세기본법 §14)에 따라 통장 송금 기록만으로는 "실제 대여인지 증여인지" 판단하기 어렵습니다. 따라서 차용증(차용액·이자율·만기·상환 방식 기재)이 필수 증거입니다. 차용증 없이 적발되면 전체 금액이 증여로 재과세될 수 있습니다.',
  },
  {
    question: '차용증에 이자를 "무이자"로 명시해도 괜찮나요?',
    answer:
      '괜찮습니다. 차용증에 "이자 없음" 또는 "무이자"를 명확히 기재하면 정당한 금전대여 거래입니다(상증법 §41의4). 다만 이자 차액이 1,000만 원을 초과하면 그 초과분이 증여세 대상이 됩니다. 무이자 대출 자체가 불법이 아니라, 단지 적정이자율과의 차액이 기준을 넘으면 세금을 내는 것입니다.',
  },
  {
    question: '부모님이 자녀에게 돈을 빌려줬는데 나중에 상환하지 않으면 어떻게 되나요?',
    answer:
      '국세청이 "실제로 상환 의사가 없었던 증여"로 재분류할 수 있습니다(국세기본법 §14). 차용증이 있어도 정기적인 이자 지급 기록이나 일부 원금 반환 기록이 없으면 "차용증은 위장이고 실제로는 증여"라고 판단합니다. 따라서 차용증 작성 후 일정 기간 정기적으로 이자를 지급하거나, 차용금의 일부를 상환해야 신뢰성이 생깁니다.',
  },
  {
    question: '부모님으로부터 차용금으로 부동산을 샀는데 문제가 되나요?',
    answer:
      '부동산 취득 자금의 출처가 명확하면 문제없습니다. 다만 국세청이 "자금출처 조사"를 할 수 있으므로 부모님으로부터의 차용증·송금 기록·상환 기록이 명확해야 합니다. 만약 자녀가 "차용금으로 샀다고 했지만 실제로는 부모님이 원금을 상환해줬다"는 증거가 나오면 전체가 증여로 재과세될 수 있습니다. 따라서 명확한 상환 계획과 기록이 필수입니다.',
  },
  {
    question: '적정이자율 4.6%는 어디서 나온 기준인가요?',
    answer:
      '상증법 시행령 §31의5에 따라 매년 1월 1일 기준 금융통화위원회가 정하는 기준금리를 고려하여 기획재정부가 고시합니다. 2026년 적정이자율은 연 4.6%입니다. 이 기준은 특수관계인(부모·자녀·배우자 등) 간의 금전 무상·저리 대여 여부를 판단하는 데 사용됩니다. 공식 기준금리이므로 이를 기준으로 이자를 계산하면 세무상 신뢰성이 높습니다.',
  },
];

export default function FamilyLoanAgreementGiftTaxAvoidanceGuide() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '가족 간 차용증·금전대여 증여세 정확 정리' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '가족 간 차용증·금전대여 증여세 정확 정리 2026',
    description:
      '가족 간 무이자·저리 대출 시 증여세 적용 기준·적정이자율 4.6% 차액 계산·1,000만 원 면제 한도·차용증 필수 요소·실질과세 입증 자료·함정 5가지·신고 절차 완전 정리.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    type: 'Article',
    keywords: ['금전대여', '차용증', '증여세', '무이자 대출', '적정이자율'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '가족 간 차용증·금전대여 증여세 정확 정리 2026',
    description:
      '무이자·저리 대출·적정이자율 4.6%·차액 계산·1,000만원 면제·차용증 필수 요소·실질과세 입증·함정 5가지.',
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
                    { name: '가족 간 차용증·금전대여 증여세 가이드' },
                  ]}
                />
                <h1 className="mt-4 text-3xl font-bold text-text-primary md:text-4xl">
                  가족 간 차용증·금전대여 증여세 정확 정리 2026
                </h1>
                <p className="mt-3 text-lg text-text-secondary" data-speakable>
                  부모가 자녀에게 집을 사는 자금이나 창업 자금을 빌려줄 때 어떻게 하면 증여세 없이 대출로 인정받을 수
                  있을까요? 핵심은 <strong>차용증</strong>과 <strong>적정이자율 기준 4.6%</strong>입니다. 무이자로
                  빌려도 그 차액이 <strong>연 1,000만 원 이하</strong>면 비과세입니다(상증법 §41의4, 시행령 §31의5).
                  차용증 작성법부터 함정 5가지, 신고 절차까지 정확히 정리합니다.
                </p>
              </header>

              <AdSlot slot="guide-family-loan-top" format="horizontal" />

              {/* Structured Summary */}
              <section aria-label="핵심 요약" className="card border-l-4 border-l-primary-500">
                <h2 className="mb-4 text-2xl font-semibold">핵심 정리</h2>
                <div className="mb-4 overflow-x-auto">
                  <table className="w-full text-sm" data-speakable>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th className="px-3 py-2 text-left text-text-primary">항목</th>
                        <th className="px-3 py-2 text-left text-text-primary">내용</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="px-3 py-2 text-text-secondary">적정이자율</td>
                        <td className="px-3 py-2 text-text-primary">연 4.6% (상증법 시행령 §31의5)</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="px-3 py-2 text-text-secondary">면제 한도</td>
                        <td className="px-3 py-2 text-text-primary">연 차액 1,000만 원 이하 비과세</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="px-3 py-2 text-text-secondary">무이자 한도액</td>
                        <td className="px-3 py-2 text-text-primary">약 2억 1,700만 원</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="px-3 py-2 text-text-secondary">필수 증거</td>
                        <td className="px-3 py-2 text-text-primary">차용증(금액·이자율·만기 기재)</td>
                      </tr>
                      <tr>
                        <td className="px-3 py-2 text-text-secondary">입증 자료</td>
                        <td className="px-3 py-2 text-text-primary">송금 기록·이자 지급 기록·상환 기록</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="rounded-lg bg-bg-card p-4 text-sm text-text-secondary">
                  <p className="font-semibold text-text-primary">TL;DR</p>
                  <ul className="mt-2 list-inside list-disc space-y-1 text-text-secondary">
                    <li>차용증만 있으면 증여세 피할 수 있다? 아니요. 실제 상환 기록도 필요합니다.</li>
                    <li>5억 무이자 대여 시 차액 2,300만 → 1,000만 초과한 1,300만만 증여세 대상입니다.</li>
                    <li>차용증 없으면 국세청이 "증여"로 재분류할 수 있습니다(국세기본법 §14).</li>
                  </ul>
                </div>
              </section>

              {/* 1. 정의 */}
              <section aria-label="기본 개념" className="card">
                <h2 className="mb-4 text-2xl font-semibold">특수관계인 간 금전대여란?</h2>
                <p className="mb-3 text-text-secondary" data-speakable>
                  부모와 자녀, 배우자처럼 가족 관계인 "특수관계인"(상증법 §50) 간에 금전을 무이자 또는 저리로
                  대여하는 경우, 법정 적정이자율과 실제 이자율의 차액은 <strong>이익의 증여</strong>로 간주됩니다(상증법
                  §41의4). 다만 그 차액이 <strong>연 1,000만 원 이하</strong>면 비과세입니다(시행령 §31의5). 이는
                  가족 간의 합리적인 금전 거래를 보호하면서도 과도한 절세를 막기 위한 규정입니다.
                </p>
                <div className="rounded-lg bg-bg-card p-4 text-sm text-text-secondary">
                  <p className="mb-2">
                    <strong className="text-text-primary">특수관계인의 범위</strong>
                  </p>
                  <ul className="list-inside list-disc space-y-1">
                    <li>배우자</li>
                    <li>직계비속(자녀, 손자녀)</li>
                    <li>직계존속(부모, 조부모)</li>
                    <li>형제자매</li>
                    <li>배우자의 직계비속·직계존속</li>
                  </ul>
                </div>
              </section>

              {/* 2. 적정이자율과 차액 계산 */}
              <section aria-label="적정이자율 기준" className="card border-l-4 border-l-secondary-500">
                <h2 className="mb-4 text-2xl font-semibold">적정이자율 4.6% 차액 계산</h2>
                <p className="mb-4 text-text-secondary" data-speakable>
                  상증법 시행령 §31의5에 따르면 매년 금융통화위원회가 정하는 기준금리를 고려하여 기획재정부가 고시하는
                  "적정이자율"을 기준으로 합니다. <strong>2026년 적정이자율은 연 4.6%</strong>입니다. 만약 부모가
                  자녀에게 무이자 또는 이보다 낮은 이자로 돈을 빌려주면 차액이 계산되어 증여세 대상이 될 수 있습니다.
                </p>

                <div className="mb-6 space-y-3 rounded-lg bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">차액 계산 공식</p>
                  <div className="text-sm text-text-secondary">
                    <p className="mb-2">
                      <strong>이자 차액 = 차용액 × (적정이자율 4.6% − 실제 이자율)</strong>
                    </p>
                    <p className="text-xs italic text-text-tertiary">차액이 연 1,000만 원 이하면 비과세</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="rounded-lg bg-bg-card p-4">
                    <p className="mb-3 font-semibold text-text-primary">사례 1: 5억 무이자 대여</p>
                    <div className="text-sm text-text-secondary">
                      <p className="mb-1">차용액: 5억 원</p>
                      <p className="mb-1">실제 이자율: 0%</p>
                      <p className="mb-1">차액 = 5억 × 4.6% = 2,300만 원</p>
                      <p className="mb-1 font-semibold text-text-primary">증여세 대상: 2,300만 − 1,000만 = 1,300만 원</p>
                      <p className="mt-2 text-xs italic text-text-tertiary">
                        1,300만 원을 기준으로 증여세 계산 (직계비속 공제 5천만 원 적용 후)
                      </p>
                    </div>
                  </div>

                  <div className="rounded-lg bg-bg-card p-4">
                    <p className="mb-3 font-semibold text-text-primary">사례 2: 2억 1,700만 원 무이자 대여</p>
                    <div className="text-sm text-text-secondary">
                      <p className="mb-1">차용액: 2억 1,700만 원</p>
                      <p className="mb-1">차액 = 2억 1,700만 × 4.6% ≈ 1,000만 원</p>
                      <p className="mb-1 font-semibold text-text-primary">증여세: 0원 (면제 한도)</p>
                      <p className="mt-2 text-xs italic text-text-tertiary">
                        이것이 무이자로 비과세받을 수 있는 최대 금액입니다.
                      </p>
                    </div>
                  </div>

                  <div className="rounded-lg bg-bg-card p-4">
                    <p className="mb-3 font-semibold text-text-primary">사례 3: 3억 연 2% 저리 대여</p>
                    <div className="text-sm text-text-secondary">
                      <p className="mb-1">차용액: 3억 원</p>
                      <p className="mb-1">적정이자율: 4.6%, 실제 이자율: 2%</p>
                      <p className="mb-1">차액 = 3억 × (4.6% − 2%) = 780만 원</p>
                      <p className="mb-1 font-semibold text-text-primary">증여세: 0원 (1,000만 원 이하 면제)</p>
                    </div>
                  </div>
                </div>
              </section>

              {/* 3. 1,000만 원 면제 한도 */}
              <section aria-label="면제 한도" className="card">
                <h2 className="mb-4 text-2xl font-semibold">연 1,000만 원 면제 한도 정확히 이해하기</h2>
                <p className="mb-3 text-text-secondary" data-speakable>
                  상증법 시행령 §31의5에서 규정한 "기준금액 1,000만 원"은 매우 중요합니다. 이 1,000만 원을 초과하는
                  이자 차액만 증여세 계산 대상이 되므로, 실제로는 <strong>약 2억 1,700만 원까지는 무이자로 빌려도
                  비과세</strong>입니다. 다만 이 한도는 <strong>"연 차액"</strong> 기준이므로 매년 새로 계산됩니다.
                </p>

                <div className="mb-4 rounded-lg bg-highlight-500/10 p-4 text-sm text-text-secondary">
                  <p className="mb-2">
                    <strong className="text-text-primary">중요: "1,000만 원"의 의미</strong>
                  </p>
                  <ul className="list-inside list-disc space-y-1">
                    <li>한 번에 1,000만 원 이하를 차입하는 것이 아닙니다.</li>
                    <li>"차용액 × (적정이자율 − 실제 이자율)"의 <strong>연 차액</strong>이 1,000만 원 이하라는 의미입니다.</li>
                    <li>따라서 매해 새로운 차용을 추가로 할 수 있지만, 전체 누적 차액이 1,000만 원을 넘지 않아야 합니다.</li>
                  </ul>
                </div>

                <div className="rounded-lg bg-bg-card p-4 text-sm text-text-secondary">
                  <p className="mb-3 font-semibold text-text-primary">실제 사례: 여러 번에 나누어 차용하는 경우</p>
                  <div>
                    <p className="mb-2">
                      <strong>Year 1</strong>
                    </p>
                    <p className="mb-2 ml-3">1억 5,000만 원 무이자 대여 → 차액 690만 원</p>
                    <p className="mb-3">
                      <strong>Year 2</strong>
                    </p>
                    <p className="mb-2 ml-3">7,000만 원 무이자 추가 대여 → 차액 322만 원</p>
                    <p>
                      <strong>Year 2 누적 차액</strong>: 690만 + 322만 = 1,012만 원 → 12만 원만 증여세 대상
                    </p>
                  </div>
                </div>
              </section>

              <AdSlot slot="guide-family-loan-mid" format="rectangle" />

              {/* 4. 차용증 필수 요소 */}
              <section aria-label="차용증 작성법" className="card border-l-4 border-l-highlight-500">
                <h2 className="mb-4 text-2xl font-semibold">차용증 필수 요소 5가지</h2>
                <p className="mb-4 text-text-secondary" data-speakable>
                  국세청이 금전 대여를 인정하는 가장 중요한 증거는 <strong>차용증</strong>입니다. 차용증이 없으면 국세청은
                  통장 송금을 "증여"로 재분류할 수 있습니다(국세기본법 §14 실질과세 원칙). 차용증에는 반드시 다음 5가지
                  요소가 명확하게 기재되어야 합니다.
                </p>

                <div className="space-y-3">
                  <div className="rounded-lg bg-bg-card p-4">
                    <p className="mb-2 font-semibold text-text-primary">1. 당사자의 인적 사항</p>
                    <p className="text-sm text-text-secondary">
                      차용인(빌리는 사람)의 이름, 주민등록번호, 주소 / 차용증인(빌려주는 사람)의 이름, 주민등록번호,
                      주소. 모두 주민등록증과 일치해야 합니다.
                    </p>
                  </div>

                  <div className="rounded-lg bg-bg-card p-4">
                    <p className="mb-2 font-semibold text-text-primary">2. 차용액 및 단위</p>
                    <p className="text-sm text-text-secondary">
                      "3억 원" 또는 "3,000,000원"으로 명확하게 기재. 숫자와 한글을 모두 적으면 위변조 의혹을 피할 수
                      있습니다.
                    </p>
                  </div>

                  <div className="rounded-lg bg-bg-card p-4">
                    <p className="mb-2 font-semibold text-text-primary">3. 이자율 명시</p>
                    <p className="text-sm text-text-secondary">
                      "무이자" 또는 "이자 없음" 또는 "연 2%"처럼 명확히 기재. 이자율이 없으면 무이자로 간주되지만,
                      명시하는 것이 더 안전합니다.
                    </p>
                  </div>

                  <div className="rounded-lg bg-bg-card p-4">
                    <p className="mb-2 font-semibold text-text-primary">4. 차용 기간 및 반환기한</p>
                    <p className="text-sm text-text-secondary">
                      "2026년 5월 14일부터 2028년 5월 14일까지 2년" 같이 명확한 만기를 기재. "일시에 상환" 또는 "월
                      500만 원씩 24개월" 같은 상환 방식도 중요합니다.
                    </p>
                  </div>

                  <div className="rounded-lg bg-bg-card p-4">
                    <p className="mb-2 font-semibold text-text-primary">5. 당사자 서명 및 작성일</p>
                    <p className="text-sm text-text-secondary">
                      차용인, 차용증인 모두 자필 서명(도장 또는 지장). 작성 날짜 명기. 우체국 내용증명으로 발송하거나
                      주민센터 확정일자를 받으면 위변조 의혹을 피할 수 있습니다.
                    </p>
                  </div>
                </div>

                <div className="mt-6 rounded-lg bg-danger-500/10 p-4">
                  <p className="mb-2 text-sm font-semibold text-danger-500">경고: 차용증 없거나 부실하면 안 되는 이유</p>
                  <p className="text-sm text-text-secondary">
                    국세청이 세무조사 시 통장 송금 기록만으로는 "정말 대여인지, 증여인지" 판단할 수 없습니다. 따라서 차용증이
                    없으면 "실질과세 원칙"에 따라 전체 금액을 증여로 재과세합니다. 또한 무신고 기간에 따라 최고 40% 가산세가
                    부과될 수 있습니다(국세기본법 §47의2).
                  </p>
                </div>
              </section>

              {/* 5. 실질과세 입증 자료 */}
              <section aria-label="입증 자료" className="card">
                <h2 className="mb-4 text-2xl font-semibold">실질과세 입증 자료 5가지</h2>
                <p className="mb-4 text-text-secondary" data-speakable>
                  차용증만으로는 부족합니다. 국세청은 "실제로 대여 관계가 존재했는가"를 확인하기 위해 이자 지급, 원금
                  상환, 송금 기록 같은 후속 증거를 요구합니다(국세기본법 §14). 특히 무이자로 빌린 경우 "정말 갚을 의사가
                  있었는가"를 증명해야 합니다.
                </p>

                <div className="space-y-3">
                  <div className="rounded-lg bg-bg-card p-4">
                    <p className="mb-2 font-semibold text-text-primary">1. 차용금 송금 기록</p>
                    <p className="text-sm text-text-secondary">
                      부모 계좌에서 자녀 계좌로 송금한 통장 기록. 송금 시 적요(메모)에 "차용금" 또는 "2억 무이자 대여"라고
                      명기하면 더 좋습니다. 일괄 송금보다는 분할 송금이 더 신뢰성이 있습니다.
                    </p>
                  </div>

                  <div className="rounded-lg bg-bg-card p-4">
                    <p className="mb-2 font-semibold text-text-primary">2. 이자 지급 기록 (저리 대여 시)</p>
                    <p className="text-sm text-text-secondary">
                      이자율을 명시했다면 정기적으로(분기별 또는 반기별) 이자를 송금한 기록. 무이자라 해도 일부 기간 이자를
                      송금했다면 "실제로 대여 의도가 있었다"는 증거가 됩니다.
                    </p>
                  </div>

                  <div className="rounded-lg bg-bg-card p-4">
                    <p className="mb-2 font-semibold text-text-primary">3. 원금 일부 상환 기록</p>
                    <p className="text-sm text-text-secondary">
                      차용금의 일부를 상환한 통장 기록. 전액을 상환하지 않았더라도 일부 상환 기록이 있으면 "진정한 대여"로 간주될
                      가능성이 높습니다. 상환 시에도 적요에 "차용금 상환"이라 적으세요.
                    </p>
                  </div>

                  <div className="rounded-lg bg-bg-card p-4">
                    <p className="mb-2 font-semibold text-text-primary">4. 부동산 구매에 사용한 증거</p>
                    <p className="text-sm text-text-secondary">
                      차용금으로 부동산을 샀다면 부동산 등기부등본, 거래명세서, 중개비 영수증 등이 도움됩니다. 자금출처 조사
                      시에 "부모님 차용금으로 구매했다"는 것을 증명할 수 있습니다.
                    </p>
                  </div>

                  <div className="rounded-lg bg-bg-card p-4">
                    <p className="mb-2 font-semibold text-text-primary">5. 상환 약속 및 일정 기록</p>
                    <p className="text-sm text-text-secondary">
                      차용증 이후 부모와 자녀가 상환 일정을 재협의했다면 그 기록(문자, 카톡, 이메일)도 도움됩니다. "2028년 5월
                      분할 상환하기로 약속"같은 메모는 진정한 대여 의도를 보여줍니다.
                    </p>
                  </div>
                </div>
              </section>

              {/* 6. 함정 5가지 */}
              <section aria-label="주의사항" className="card">
                <h2 className="mb-4 text-2xl font-semibold">가족 간 금전대여 함정 5가지</h2>
                <p className="mb-4 text-text-secondary" data-speakable>
                  차용증과 적정이자율을 알고 있어도 많은 사람이 함정에 빠집니다. 다음 5가지는 반드시 주의해야 하는
                  상황들입니다.
                </p>

                <div className="space-y-4">
                  <div className="rounded-lg border-l-4 border-l-danger-500 bg-bg-card p-4">
                    <p className="mb-2 font-semibold text-text-primary">
                      함정 1: 차용증 후 아무 상환 기록도 없음
                    </p>
                    <p className="text-sm text-text-secondary">
                      차용증만 있고 5년 동안 한 푼도 상환하지 않았다면 국세청은 "실제로는 증여였고 차용증은 위장"이라고
                      판단합니다. 아무리 차용증이 완벽해도 상환 의사가 없다면 증여로 재과세됩니다(국세기본법 §14). 해결: 적어도
                      분기별 이자 지급이나 연 1회 이상의 일부 원금 상환 기록이 필요합니다.
                    </p>
                  </div>

                  <div className="rounded-lg border-l-4 border-l-danger-500 bg-bg-card p-4">
                    <p className="mb-2 font-semibold text-text-primary">
                      함정 2: 부모님 사망 후 상속세 문제로 재부상
                    </p>
                    <p className="text-sm text-text-secondary">
                      부모님이 사망 후 상속 재산을 계산할 때 "아, 아들에게 3억 차용해줬었지?"라고 상속세 신고에 빠뜨렸다가 나중에
                      적발되면 증여세 + 가산세로 이중 과세될 수 있습니다. 해결: 부모님이 생존 중에 차용증 기록을 명시하고, 상속
                      신고 시 차용금을 명시하거나, 상속 재산에서 차용액을 차감하는 절차가 필요합니다.
                    </p>
                  </div>

                  <div className="rounded-lg border-l-4 border-l-danger-500 bg-bg-card p-4">
                    <p className="mb-2 font-semibold text-text-primary">
                      함정 3: 여러 자녀에게 각각 차용해주면 합산되나?
                    </p>
                    <p className="text-sm text-text-secondary">
                      네, 합산됩니다. 부모가 자녀 A에게 1억 무이자 대여(차액 460만), 자녀 B에게 1억 무이자 대여(차액 460만)를
                      동일 연도에 했다면 전체 차액 920만 원으로 계산됩니다. 만약 자녀 3명이라면 차액 1,380만 원 → 380만 원이
                      증여세 대상입니다. 해결: 연도를 나누어 대여하거나 저리로 설정하여 차액을 줄이는 방법이 있습니다.
                    </p>
                  </div>

                  <div className="rounded-lg border-l-4 border-l-danger-500 bg-bg-card p-4">
                    <p className="mb-2 font-semibold text-text-primary">
                      함정 4: 차용금으로 부동산 구매 후 자금출처 조사
                    </p>
                    <p className="text-sm text-text-secondary">
                      국세청이 "자금출처 조사"를 할 때 부모님 계좌에서 자녀 계좌로 송금된 기록을 볼 수 있습니다. "이 돈이 정말
                      차용금인가, 증여인가?" 확인 차원에서 부모님 통장, 부모님 소득 원천까지 역추적합니다. 만약 부모님 계좌에 그
                      정도의 저축이 없었다면 "빌려줄 자금이 어디서 나왔나?"라는 의문이 생길 수 있습니다. 해결: 부모님의 충분한
                      저축 증거(수년간의 통장 내역)를 준비해두세요.
                    </p>
                  </div>

                  <div className="rounded-lg border-l-4 border-l-danger-500 bg-bg-card p-4">
                    <p className="mb-2 font-semibold text-text-primary">
                      함정 5: 1,000만 원 면제를 착각한 다중 차용
                    </p>
                    <p className="text-sm text-text-secondary">
                      "연 1,000만 원 이하면 비과세니까 매년 1억씩 무이자로 차용해도 괜찮겠네?"라고 생각하면 안 됩니다. 매년 새로운
                      차용은 누적되며, 각 연도 차액이 1,000만 원을 넘으면 그해에 증여세가 과세됩니다. 또한 동일 연도 여러 차용
                      시 차액이 합산됩니다. 해결: 장기간의 대여 계획을 세울 때는 세무사 상담을 받는 것이 좋습니다.
                    </p>
                  </div>
                </div>
              </section>

              <AdSlot slot="guide-family-loan-mid-lower" format="rectangle" />

              {/* 7. 신고 절차 */}
              <section aria-label="신고 방법" className="card">
                <h2 className="mb-4 text-2xl font-semibold">증여세 신고 절차</h2>
                <p className="mb-4 text-text-secondary" data-speakable>
                  만약 이자 차액이 1,000만 원을 초과한다면 증여세를 신고해야 합니다. 신고하지 않으면 무신고 가산세(10~40%)가
                  부과됩니다(국세기본법 §47의2).
                </p>

                <div className="space-y-3">
                  <div className="rounded-lg bg-bg-card p-4">
                    <p className="mb-2 font-semibold text-text-primary">1단계: 과세표준 산출</p>
                    <p className="text-sm text-text-secondary">
                      증여재산가액(차액) − 공제액(직계비속 5천만 원) = 과세표준
                    </p>
                    <p className="mt-2 text-xs italic text-text-tertiary">예: 1,300만 차액 − 0 = 1,300만 (공제 초과)</p>
                  </div>

                  <div className="rounded-lg bg-bg-card p-4">
                    <p className="mb-2 font-semibold text-text-primary">2단계: 세율 적용</p>
                    <p className="text-sm text-text-secondary">
                      1,300만 원 과세표준에 증여세율(10%~50%)을 적용합니다.
                    </p>
                    <p className="mt-2 text-xs italic text-text-tertiary">예: 1,300만 × 10% = 130만 원 증여세</p>
                  </div>

                  <div className="rounded-lg bg-bg-card p-4">
                    <p className="mb-2 font-semibold text-text-primary">3단계: 신고</p>
                    <p className="text-sm text-text-secondary">
                      수증자(자녀)가 증여받은 날로부터 <strong>3개월 이내</strong>에 "증여세 신고서"를 관할 세무서에 제출합니다.
                      (자기 지역의 시군구세무소 또는 국세청 홈택스)
                    </p>
                  </div>

                  <div className="rounded-lg bg-bg-card p-4">
                    <p className="mb-2 font-semibold text-text-primary">4단계: 납부</p>
                    <p className="text-sm text-text-secondary">
                      계산된 증여세를 납부기한(신고 후 30일 이내, 또는 신고서 기한 후 30일)까지 납부합니다.
                    </p>
                  </div>
                </div>

                <div className="mt-6 rounded-lg bg-bg-card p-4">
                  <p className="mb-2 text-sm font-semibold text-text-primary">신고 시 제출 서류</p>
                  <ul className="list-inside list-disc space-y-1 text-sm text-text-secondary">
                    <li>증여세 신고서</li>
                    <li>차용증 사본</li>
                    <li>송금 기록(통장 사본)</li>
                    <li>상환 기록(있으면 첨부)</li>
                    <li>이자 지급 증거(저리 대여 시)</li>
                  </ul>
                </div>
              </section>

              {/* 8. FAQ */}
              <section aria-label="자주 묻는 질문" className="card">
                <h2 className="mb-6 text-2xl font-semibold">자주 묻는 질문 (FAQ)</h2>
                <FaqSection items={FAQ_ITEMS} />
              </section>

              {/* 9. 면책조항 */}
              <section aria-label="면책 및 출처" className="card">
                <h2 className="mb-4 text-xl font-semibold">면책조항 및 출처</h2>
                <div className="rounded-lg bg-bg-card p-4 text-sm text-text-secondary">
                  <p className="mb-3">
                    본 가이드는 2026년 현재 세법을 기준으로 작성한 <strong>참고 자료</strong>이며, 법적 효력이 없습니다.
                    개인의 구체적인 상황(소득, 자산, 부채, 거주지역)에 따라 세무상 결과가 달라질 수 있습니다. 실제 차용 계약
                    전에는 반드시 <strong>세무사나 국세청 상담</strong>을 받으시기 바랍니다.
                  </p>
                  <p className="mb-3">
                    본 콘텐츠는 <strong>AI 보조 작성 후 운영자 검수</strong>를 거쳤습니다(Google AI Content Policy 준수).
                  </p>
                  <p className="mb-3">
                    <strong>법적 근거:</strong>
                  </p>
                  <ul className="list-inside list-disc space-y-1">
                    <li>
                      <a
                        href="https://www.law.go.kr/lsInfoP.do?lsId=001561&ancYnChk=0"
                        target="_blank"
                        rel="nofollow"
                        className="text-primary-500 hover:underline"
                      >
                        상속세 및 증여세법 §41의4 (특수관계인 간 금전 무상·저리 대여)
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://www.law.go.kr/lsLawLinkInfo.do?lsJoLnkSeq=900410895&chrClsCd=010202"
                        target="_blank"
                        rel="nofollow"
                        className="text-primary-500 hover:underline"
                      >
                        상속세 및 증여세법 시행령 §31의5 (적정이자율·1,000만 원 기준금액)
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://www.law.go.kr/lsLawLinkInfo.do?lsId=001560&ancYnChk=0"
                        target="_blank"
                        rel="nofollow"
                        className="text-primary-500 hover:underline"
                      >
                        국세기본법 §14 (실질과세 원칙)
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?mi=6533&cntntsId=7960"
                        target="_blank"
                        rel="nofollow"
                        className="text-primary-500 hover:underline"
                      >
                        국세청 — 증여세 신고 안내
                      </a>
                    </li>
                  </ul>
                </div>
              </section>

              {/* 관련 링크 */}
              <section aria-label="관련 가이드" className="card">
                <h2 className="mb-4 text-2xl font-semibold">관련 가이드</h2>
                <div className="grid gap-3 md:grid-cols-2">
                  <Link href="/guide/burden-gift-debt-assumption-tax/">
                    <div className="rounded-lg border border-border-base bg-bg-card p-4 hover:bg-primary-500/10">
                      <h3 className="font-semibold text-text-primary">부담부증여 양도+증여세</h3>
                      <p className="mt-1 text-sm text-text-secondary">
                        자산과 채무를 함께 이전할 때 양도세·증여세 분리 계산법
                      </p>
                    </div>
                  </Link>
                  <Link href="/guide/child-house-gift-vs-sale-comparison/">
                    <div className="rounded-lg border border-border-base bg-bg-card p-4 hover:bg-primary-500/10">
                      <h3 className="font-semibold text-text-primary">자녀 주택 증여 vs 매매</h3>
                      <p className="mt-1 text-sm text-text-secondary">
                        자녀에게 집을 물려줄 때 증여와 매매의 세금 차이
                      </p>
                    </div>
                  </Link>
                  <Link href="/guide/inheritance-tax-10-year-prior-gift-aggregation/">
                    <div className="rounded-lg border border-border-base bg-bg-card p-4 hover:bg-primary-500/10">
                      <h3 className="font-semibold text-text-primary">증여세 10년 합산 규칙</h3>
                      <p className="mt-1 text-sm text-text-secondary">
                        부모로부터 받은 증여가 10년 단위로 합산되는 이유와 대책
                      </p>
                    </div>
                  </Link>
                  <Link href="/calculator/capital-gains-tax/">
                    <div className="rounded-lg border border-border-base bg-bg-card p-4 hover:bg-primary-500/10">
                      <h3 className="font-semibold text-text-primary">양도소득세 계산기</h3>
                      <p className="mt-1 text-sm text-text-secondary">
                        부동산 양도 시 양도세를 즉시 계산해보세요
                      </p>
                    </div>
                  </Link>
                </div>
              </section>

              <ShareButtons
                title="가족 간 차용증·금전대여 증여세 정확 정리 2026"
                description="무이자 대출 적정이자율 4.6% 차액·1,000만원 면제·차용증 필수 요소·실질과세 입증·함정 5가지."
              />
            </article>
          </main>
        </div>
        <Footer />
      </div>
    </>
  );
}
