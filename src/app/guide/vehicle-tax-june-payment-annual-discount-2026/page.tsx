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

const URL = 'https://calculatorhost.com/guide/vehicle-tax-june-payment-annual-discount-2026/';
const DATE_PUBLISHED = '2026-06-02';
const DATE_MODIFIED = '2026-06-02';

export const metadata: Metadata = {
  title: '자동차세 제1기 6월 납부 완전 가이드 — 연납·차령경감 2026',
  description:
    '2026년 자동차세 제1기(6/16~30) 납부 시즌 가이드. 연납(1월 일괄 선납) 할인, 3년차부터 차령경감 연 5% 최대 50%. 세액 계산 사례 및 납부 방법 전체 해설.',
  keywords: [
    '자동차세 6월 납부',
    '자동차세 제1기',
    '자동차세 연납 할인',
    '차령경감 2026',
    '자동차세 계산',
    '보유세 납부 일정',
    '지방세법 127조',
    '비영업용 승용차 세금',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '자동차세 제1기 6월 납부 완전 가이드 — 연납·차령경감 2026' }],
    title: '자동차세 제1기 6월 납부 완전 가이드 — 연납·차령경감',
    description: '3년차부터 차령경감 5%/년, 연납 할인. 1600cc 이하 예상 세액부터 납부 방법까지.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '자동차세 제1기 6월 납부 완전 가이드',
    description: '연납 할인, 차령경감 최대 50%. 2026년 세액 계산·납부 방법 전체.',
  },
};

const FAQ_ITEMS = [
  {
    question: '자동차세는 1년에 몇 번 내나요?',
    answer:
      '자동차세(보유세)는 연 2회 납부합니다. 제1기(6월 16일~30일)와 제2기(12월 16일~31일)에 각각 납부합니다. 차량 구매 시점과 관계없이 매년 같은 기간에 납부하므로 2026년 신차 구매자라면 12월부터 자동차세 납부가 시작됩니다.',
  },
  {
    question: '자동차세 연납(1월 일시납)은 어떻게 신청하나요?',
    answer:
      '연납은 매년 1월 중(1월 1일~31일)에 관할 지자체 세무서 또는 위택스(wetax.go.kr)에서 신청합니다. 2026년 공제율은 5%(지방세법 시행령 §125)이며, 기간 비례식으로 계산됩니다. 1월 신청 시 실효율 약 4.81%, 3월 약 3.74%, 6월 약 2.93%, 9월 약 1.67%입니다. 1월을 놓친 경우 6월·12월 정기 납부 시에는 연납 공제가 적용되지 않습니다.',
  },
  {
    question: '1600cc 세단 기준 연간 자동차세는 얼마나 되나요?',
    answer:
      '1600cc 이하 비영업용 승용차 기준 세율은 배기량 1cc당 140원입니다. 따라서 1600cc × 140원 = 224,000원의 기본 자동차세가 산출됩니다. 차령경감이 있으면 그보다 낮아지고, 지방교육세(자동차세의 30%)가 추가되어 약 291,200원 정도입니다. 정확한 세액은 차령과 지자체별 시 조정에 따라 달라질 수 있습니다.',
  },
  {
    question: '차령 5년 차면 어느 정도 경감되나요?',
    answer:
      '차령경감은 3년차부터 시작되며, 매년 5%씩 경감됩니다(지방세법 §127). 5년차라면 (5 - 2) × 5% = 15% 경감됩니다. 기본 세액에서 15%를 빼면 되므로, 앞의 1600cc 예시라면 224,000원 × 85% ≈ 190,400원이 자동차세가 됩니다. 12년차 이상은 최대 50% 경감이 고정됩니다.',
  },
  {
    question: '개별소비세와 자동차세는 뭐가 다른가요?',
    answer:
      '개별소비세는 신차 구매 시 1회만 내는 세금입니다(6월 30일까지 인하 정책 진행 중). 자동차세는 차를 소유한 동안 매년 내는 보유세입니다. 개별소비세는 등록 시 한 번, 자동차세는 1월 1일 기준 소유자가 매해 2회(6월·12월)에 나눠 또는 1월에 연납으로 지불합니다. 완전히 다른 세금이므로 혼동 주의하세요.',
  },
  {
    question: '전기차 자동차세는 얼마인가요?',
    answer:
      '비영업용 전기차는 정액으로 연 13만원(기본 세액 10만원 + 지방교육세 3만원)입니다. 배기량 기준이 없으므로 차종 크기와 관계없이 동일합니다. 1월 일시납(연납) 시 공제도 적용되며, 공제율은 매년 달라지므로 위택스에서 확인하세요.',
  },
  {
    question: '자동차세 미납 시 어떤 불이익이 있나요?',
    answer:
      '자동차세를 기한 내에 납부하지 않으면 페널티(가산세)가 붙습니다. 납기일로부터 3개월 이내면 1.2배, 3개월 초과 6개월 이내면 1.5배, 6개월 초과면 1.8배 이상의 세액을 내야 합니다. 또한 납기일로부터 60일 경과 후 신규 등록·이전 등록 금지 등 행정 제제가 있을 수 있습니다.',
  },
  {
    question: '차량 양도 시 자동차세는 어떻게 되나요?',
    answer:
      '차량을 양도할 때 자동차세는 양도일을 기준으로 정산합니다. 연초에 미리 낸 자동차세가 있다면, 양수인이 남은 기간에 해당하는 세액을 양도인에게 되돌려줍니다. 예를 들어 6월 15일에 차량을 양도했다면, 양수인은 6월 16일부터 12월 31일까지의 자동차세를 새로 납부합니다.',
  },
] as const;

export default function VehicleTaxJunePaymentAnnualDiscountPage() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '자동차세 제1기 6월 납부·연납 할인 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '자동차세 제1기 6월 납부 완전 가이드 — 연납·차령경감 2026',
    description:
      '2026년 자동차세 제1기(6/16~30) 납부 시즌. 연납 할인, 차령경감 최대 50%, cc당 세율·지방교육세 완벽 해설. 세액 계산 사례·납부방법·주의사항 전체.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['자동차세', '6월 납부', '연납 할인', '차령경감', '보유세'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '자동차세 제1기 6월 납부 완전 가이드 — 연납·차령경감 2026',
    description:
      '2026년 자동차세 제1기(6/16~30) 완전 가이드. 비영업용 승용차 연간 세액 계산, 연납할인 신청 방법, 차령경감 최대 50%, 납부 방법 및 주의사항 전체 해설.',
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
                    { name: '자동차세 제1기 6월 납부·연납 할인 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">세금·자동차 · 8분 읽기 · 2026-06-02</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  자동차세 제1기 6월 납부
                  <br />
                  <span className="text-2xl text-text-secondary">— 연납·차령경감 완전 가이드</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  자동차세는 자동차 소유자가 매년 내는 보유세입니다. 2026년 제1기 납부 기간은 6월 16일부터 6월 30일까지.
                  미리 1월에 연납하면 공제를 받을 수 있고, 3년 이상 차량이라면 차령경감으로 매년 최대 50%까지 세액을 줄일 수 있습니다.
                  정확한 세액 계산법과 절세 방법을 완벽히 설명합니다.
                </p>
              </header>

              <AdSlot slot="guide-vehicle-tax-june-top" format="horizontal" />

              <section aria-label="핵심 요약" className="card border-l-4 border-l-primary-500">
                <h2 className="mb-2 text-caption uppercase tracking-wider text-primary-500">핵심 요약</h2>
                <div className="space-y-3 text-sm" data-speakable>
                  <div className="bg-primary-500/5 p-3 rounded-lg border border-primary-500/20">
                    <p className="font-bold text-primary-700 dark:text-primary-400 mb-2">
                      2026년 자동차세 제1기 납부 기한: 6월 16일 ~ 30일
                    </p>
                    <ul className="space-y-1.5 text-text-secondary">
                      <li><strong>1600cc 비영업용 승용차</strong>: 기본 224,000원 + 지방교육세(30%) = 약 291,200원</li>
                      <li><strong>차령경감</strong>: 3년차부터 연 5%씩 (최대 50%)</li>
                      <li><strong>연납할인(1월 선납)</strong>: 공제율만큼 추가 절감</li>
                      <li>주의: <strong>미납 불이익</strong>: 가산세 + 행정 제제 (신규 등록 불가 등)</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">1. 자동차세란? 개별소비세와의 차이</h2>
                <p className="text-text-secondary leading-relaxed">
                  자동차세와 개별소비세는 완전히 다른 세금입니다. 혼동하면 예상치 못한 납부액 때문에 당황할 수 있습니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-3 font-semibold text-text-primary">자동차세 vs 개별소비세</caption>
                    <thead>
                      <tr className="bg-primary-500/10 border border-border-base">
                        <th scope="col" className="px-3 py-2 text-left">구분</th>
                        <th scope="col" className="px-3 py-2 text-left">자동차세 (보유세)</th>
                        <th scope="col" className="px-3 py-2 text-left">개별소비세</th>
                      </tr>
                    </thead>
                    <tbody className="text-text-secondary">
                      <tr className="border border-border-base">
                        <td className="px-3 py-2 font-semibold">시기</td>
                        <td className="px-3 py-2">매년 납부 (6월·12월)</td>
                        <td className="px-3 py-2">신차 등록 시 1회만</td>
                      </tr>
                      <tr className="border border-border-base">
                        <td className="px-3 py-2 font-semibold">근거 법령</td>
                        <td className="px-3 py-2">지방세법 §127·§128</td>
                        <td className="px-3 py-2">개별소비세법</td>
                      </tr>
                      <tr className="border border-border-base">
                        <td className="px-3 py-2 font-semibold">징수처</td>
                        <td className="px-3 py-2">지자체 세무서</td>
                        <td className="px-3 py-2">지자체 (신차등록 시)</td>
                      </tr>
                      <tr className="border border-border-base">
                        <td className="px-3 py-2 font-semibold">현황</td>
                        <td className="px-3 py-2">연중 상시 (변동 없음)</td>
                        <td className="px-3 py-2">2026년 6월 30일까지 5% → 3.5% 인하 중</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-sm text-text-tertiary mt-3 italic">
                  ※ 지방교육세: 자동차세의 30% (지방세법 §151). 자동차세에 포함되어 함께 납부.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">2. 비영업용 승용차 세율 — cc당 얼마인가?</h2>
                <p className="text-text-secondary leading-relaxed">
                  자동차세는 배기량(cc)을 기준으로 cc당 일정 금액을 곱해 산출합니다. 지방세법 §127에 따라 다음과 같이 적용됩니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-3 font-semibold text-text-primary">2026년 비영업용 승용차 세율 (지방세법 §127)</caption>
                    <thead>
                      <tr className="bg-primary-500/10 border border-border-base">
                        <th scope="col" className="px-3 py-2 text-left">배기량 구간</th>
                        <th scope="col" className="px-3 py-2 text-left">cc당 세율 (원)</th>
                        <th scope="col" className="px-3 py-2 text-left">예시 (연간 기본 세액)</th>
                      </tr>
                    </thead>
                    <tbody className="text-text-secondary">
                      <tr className="border border-border-base">
                        <td className="px-3 py-2 font-semibold">1000cc 이하</td>
                        <td className="px-3 py-2">80원</td>
                        <td className="px-3 py-2">800cc × 80 = 64,000원</td>
                      </tr>
                      <tr className="border border-border-base">
                        <td className="px-3 py-2 font-semibold">1000cc 초과 ~ 1600cc 이하</td>
                        <td className="px-3 py-2">140원</td>
                        <td className="px-3 py-2">1600cc × 140 = 224,000원</td>
                      </tr>
                      <tr className="border border-border-base bg-primary-500/5">
                        <td className="px-3 py-2 font-semibold">1600cc 초과</td>
                        <td className="px-3 py-2">200원</td>
                        <td className="px-3 py-2">2000cc × 200 = 400,000원</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-sm text-text-tertiary mt-3 italic">
                  ※ 위 금액은 차령경감과 지방교육세를 제외한 기본 자동차세 기준입니다.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">3. 차령경감 — 3년차부터 최대 50%까지</h2>
                <p className="text-text-secondary leading-relaxed">
                  지방세법 §127①제2호에 따라 차량 나이(차령)가 증가하면서 자동차세가 경감됩니다.
                  3년 이상 차량부터 매년 5%씩 경감되며, 12년차 이상일 때는 최대 50%까지 경감됩니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <h3 className="font-semibold text-text-primary mb-3">차령경감 계산 공식</h3>
                  <p className="text-sm text-text-secondary mb-3 font-mono bg-bg-base p-2 rounded">
                    경감율(%) = (차령연수 - 2) × 5% (단, 최대 50%)
                  </p>
                  <p className="text-sm text-text-secondary">
                    예) 5년차 세단: (5 - 2) × 5% = 15% 경감
                  </p>
                </div>
                <div className="overflow-x-auto mt-4">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-3 font-semibold text-text-primary">1600cc 세단 기준 차령경감 적용 사례</caption>
                    <thead>
                      <tr className="bg-primary-500/10 border border-border-base">
                        <th scope="col" className="px-3 py-2 text-left">차령</th>
                        <th scope="col" className="px-3 py-2 text-left">경감율</th>
                        <th scope="col" className="px-3 py-2 text-left">자동차세</th>
                        <th scope="col" className="px-3 py-2 text-left">지방교육세</th>
                        <th scope="col" className="px-3 py-2 text-left">합계</th>
                      </tr>
                    </thead>
                    <tbody className="text-text-secondary">
                      <tr className="border border-border-base">
                        <td className="px-3 py-2 font-semibold">신차~2년차</td>
                        <td className="px-3 py-2">0%</td>
                        <td className="px-3 py-2">224,000</td>
                        <td className="px-3 py-2">67,200</td>
                        <td className="px-3 py-2 font-bold">291,200</td>
                      </tr>
                      <tr className="border border-border-base">
                        <td className="px-3 py-2 font-semibold">3년차</td>
                        <td className="px-3 py-2">5%</td>
                        <td className="px-3 py-2">212,800</td>
                        <td className="px-3 py-2">63,840</td>
                        <td className="px-3 py-2 font-bold">276,640</td>
                      </tr>
                      <tr className="border border-border-base">
                        <td className="px-3 py-2 font-semibold">5년차</td>
                        <td className="px-3 py-2">15%</td>
                        <td className="px-3 py-2">190,400</td>
                        <td className="px-3 py-2">57,120</td>
                        <td className="px-3 py-2 font-bold">247,520</td>
                      </tr>
                      <tr className="border border-border-base">
                        <td className="px-3 py-2 font-semibold">10년차</td>
                        <td className="px-3 py-2">40%</td>
                        <td className="px-3 py-2">134,400</td>
                        <td className="px-3 py-2">40,320</td>
                        <td className="px-3 py-2 font-bold">174,720</td>
                      </tr>
                      <tr className="border border-border-base bg-primary-500/5">
                        <td className="px-3 py-2 font-semibold">12년차 이상</td>
                        <td className="px-3 py-2">50% (최대)</td>
                        <td className="px-3 py-2">112,000</td>
                        <td className="px-3 py-2">33,600</td>
                        <td className="px-3 py-2 font-bold">145,600</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-raised p-4 mt-4">
                  <p className="text-sm text-text-secondary">
                    <strong>주의:</strong> 위 표는 기본 세율 140원/cc와 지방교육세 30% 기준 예시입니다.
                    실제 세액은 지자체의 시 조정이 있을 수 있으므로, 정확한 금액은 지자체 세무서 또는 위택스(wetax.go.kr)에서 확인하세요.
                  </p>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">4. 연납할인 — 1월에 미리 내면 절감</h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  자동차세를 6월·12월 두 번에 나눠 내는 대신 1월에 연간 세액을 미리 내면 공제(할인)를 받을 수 있습니다.
                  2026년 현행 공제율은 <strong>5%(지방세법 시행령 §125)</strong>이며,
                  기간 비례식으로 계산됩니다(선납일수/365 × 5%). 신청 시기에 따라 실효율이 달라집니다.
                </p>
                <div className="overflow-x-auto mb-4">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-3 font-semibold text-text-primary">2026년 연납 신청 시기별 실효 공제율</caption>
                    <thead>
                      <tr className="bg-primary-500/10 border border-border-base">
                        <th scope="col" className="px-3 py-2 text-left">신청월</th>
                        <th scope="col" className="px-3 py-2 text-left">선납일수</th>
                        <th scope="col" className="px-3 py-2 text-left">공제 계산식</th>
                        <th scope="col" className="px-3 py-2 text-left">실효율</th>
                      </tr>
                    </thead>
                    <tbody className="text-text-secondary">
                      <tr className="border border-border-base">
                        <td className="px-3 py-2 font-semibold">1월</td>
                        <td className="px-3 py-2">351일</td>
                        <td className="px-3 py-2">(351/365) × 5%</td>
                        <td className="px-3 py-2 font-bold">약 4.81%</td>
                      </tr>
                      <tr className="border border-border-base">
                        <td className="px-3 py-2 font-semibold">3월</td>
                        <td className="px-3 py-2">273일</td>
                        <td className="px-3 py-2">(273/365) × 5%</td>
                        <td className="px-3 py-2">약 3.74%</td>
                      </tr>
                      <tr className="border border-border-base">
                        <td className="px-3 py-2 font-semibold">6월</td>
                        <td className="px-3 py-2">214일</td>
                        <td className="px-3 py-2">(214/365) × 5%</td>
                        <td className="px-3 py-2">약 2.93%</td>
                      </tr>
                      <tr className="border border-border-base bg-primary-500/5">
                        <td className="px-3 py-2 font-semibold">9월</td>
                        <td className="px-3 py-2">122일</td>
                        <td className="px-3 py-2">(122/365) × 5%</td>
                        <td className="px-3 py-2">약 1.67%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="space-y-3">
                  <div className="rounded-lg border border-border-base bg-bg-card p-4">
                    <h3 className="font-semibold text-text-primary mb-2">연납할인 신청 방법</h3>
                    <ul className="space-y-2 text-sm text-text-secondary">
                      <li><strong>① 신청 기간:</strong> 매년 1월 1일 ~ 31일 (1월 말까지만 신청 가능 — 6월·12월 정기 납부 시는 연납할인 미적용)</li>
                      <li><strong>② 신청처:</strong> 관할 지자체 세무서 또는 위택스(wetax.go.kr) 온라인 신청</li>
                      <li><strong>③ 납부:</strong> 신청 후 지정된 기한 내(보통 1월 말) 연간 세액을 일괄 입금</li>
                      <li><strong>④ 공제 공식:</strong> 할인액 = 연간 세액 × (선납일수/365) × 5% (지방세법 시행령 §125)</li>
                    </ul>
                  </div>
                  <div className="rounded-lg border border-border-base bg-primary-500/5 p-4">
                    <h3 className="font-semibold text-primary-700 dark:text-primary-400 mb-3">연납할인 계산 사례</h3>
                    <div className="space-y-2 text-sm text-text-secondary font-mono bg-bg-base p-3 rounded">
                      <p>1600cc 세단 (차령 5년차, 1월 신청 기준)</p>
                      <p className="mt-2">기본 자동차세: 224,000원</p>
                      <p>- 차령경감 15%: 224,000 × 85% = 190,400원</p>
                      <p>+ 지방교육세 30%: 190,400 × 30% = 57,120원</p>
                      <p className="border-t border-border-base pt-2"><strong>연간 납부액: 247,520원</strong></p>
                      <p className="mt-2 text-primary-700 dark:text-primary-400"><strong>1월 연납할인:</strong></p>
                      <p className="text-primary-700 dark:text-primary-400">247,520 × (351/365) × 5% ≈ 18,870원</p>
                      <p className="text-primary-700 dark:text-primary-400 border-t border-primary-500 pt-2"><strong>최종 납부액: 247,520 - 18,870 = 약 228,650원</strong></p>
                    </div>
                  </div>
                </div>
                <div className="rounded-lg border-l-2 border-l-danger-500 bg-danger-500/5 p-4 mt-4">
                  <p className="text-sm text-danger-700 dark:text-danger-300">
                    <strong>중요:</strong> 1월을 놓친 경우 6월·12월 정기 납부 시에는 할인이 적용되지 않습니다.
                    다만 위택스나 각 지자체 자동차세 관련 페이지에서 6월·12월 납부 시에도 소정의 기간 할인이 있을 수 있으니 확인하세요.
                  </p>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">5. 전기차 자동차세 — 정액 13만원</h2>
                <p className="text-text-secondary leading-relaxed">
                  비영업용 전기차는 배기량 개념이 없으므로, 차종 크기와 관계없이 연간 정액으로 세금을 납부합니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <h3 className="font-semibold text-text-primary mb-3">비영업용 전기차 자동차세</h3>
                  <div className="space-y-2 text-sm text-text-secondary">
                    <p><strong>기본 자동차세:</strong> 10만원 (정액 — 그 밖의 승용자동차, 지방세법 §127)</p>
                    <p><strong>지방교육세:</strong> 3만원 (자동차세의 30%)</p>
                    <p className="border-t border-border-base pt-2 font-bold text-text-primary"><strong>연간 합계:</strong> 13만원</p>
                    <p className="mt-2 text-xs"><strong>연납할인:</strong> 1월 선납 시 약 2만원 절감 가능</p>
                  </div>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">6. 2026년 제1기 납부 일정 및 방법</h2>
                <p className="text-text-secondary leading-relaxed">
                  자동차세 제1기는 매년 6월 16일부터 6월 30일까지 납부하는 기간입니다(지방세법 §128).
                </p>
                <div className="space-y-3">
                  <div className="rounded-lg border border-border-base bg-bg-raised p-4">
                    <h3 className="font-semibold text-text-primary mb-2">납부 기한</h3>
                    <p className="text-sm text-text-secondary font-semibold">
                      2026년 6월 16일(화) ~ 6월 30일(화)
                    </p>
                    <p className="text-sm text-text-tertiary mt-1">
                      ※ 6월 30일 이후 납부는 가산세 대상이 됩니다.
                    </p>
                  </div>
                  <div className="rounded-lg border border-border-base bg-bg-raised p-4">
                    <h3 className="font-semibold text-text-primary mb-2">납부 방법</h3>
                    <ul className="space-y-1.5 text-sm text-text-secondary">
                      <li><strong>1. 온라인 (위택스):</strong> wetax.go.kr → 세금 조회·납부 → 신용카드/계좌이체</li>
                      <li><strong>2. 지자체 방문:</strong> 관할 시·군·구 세무서 방문 납부 (현금·신용카드 가능)</li>
                      <li><strong>3. 자동이체:</strong> 미리 신청하면 6월 16일 자동 인출</li>
                      <li><strong>4. 편의점:</strong> 납부 고지서를 들고 GS·CU·편의점 수납</li>
                    </ul>
                  </div>
                </div>
              </section>

              <AdSlot slot="guide-vehicle-tax-june-mid" format="rectangle" />

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">7. 차량 양도 시 자동차세 정산</h2>
                <p className="text-text-secondary leading-relaxed">
                  차량을 팔거나 양도할 때는 자동차세를 양도일을 기준으로 정산해야 합니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <h3 className="font-semibold text-text-primary mb-2">자동차세 정산 원칙</h3>
                  <ul className="space-y-2 text-sm text-text-secondary">
                    <li>
                      <strong>양도일 기준:</strong> 양도인(판매자)은 양도일까지, 양수인(구매자)은 양도일 다음날부터의 세금을 납부합니다.
                    </li>
                    <li>
                      <strong>선납분 환급:</strong> 연납으로 미리 낸 세금이 있다면, 남은 기간 세액을 환급받습니다.
                    </li>
                    <li>
                      <strong>정산 예시:</strong> 6월 15일 차량 양도 시, 양수인은 6월 16일부터 12월 31일까지의 제1기 남은 세액 + 제2기 세액을 납부합니다.
                    </li>
                  </ul>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">8. 미납 시 불이익 및 가산세</h2>
                <p className="text-text-secondary leading-relaxed">
                  자동차세를 기한 내에 납부하지 않으면 가산세가 붙을 뿐만 아니라 행정 제제를 받을 수 있습니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-3 font-semibold text-text-primary">자동차세 미납 시 가산세</caption>
                    <thead>
                      <tr className="bg-danger-500/10 border border-border-base">
                        <th scope="col" className="px-3 py-2 text-left">구간</th>
                        <th scope="col" className="px-3 py-2 text-left">가산세율</th>
                        <th scope="col" className="px-3 py-2 text-left">예시 (247,520원 미납)</th>
                      </tr>
                    </thead>
                    <tbody className="text-text-secondary">
                      <tr className="border border-border-base">
                        <td className="px-3 py-2 font-semibold">3개월 이내</td>
                        <td className="px-3 py-2">1.2배 (20% 가산세)</td>
                        <td className="px-3 py-2">약 297,000원</td>
                      </tr>
                      <tr className="border border-border-base">
                        <td className="px-3 py-2 font-semibold">3개월~6개월</td>
                        <td className="px-3 py-2">1.5배 (50% 가산세)</td>
                        <td className="px-3 py-2">약 371,000원</td>
                      </tr>
                      <tr className="border border-border-base bg-danger-500/5">
                        <td className="px-3 py-2 font-semibold">6개월 초과</td>
                        <td className="px-3 py-2">1.8배 이상 (80% 가산세 이상)</td>
                        <td className="px-3 py-2">약 445,000원 이상</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="rounded-lg border-l-2 border-l-danger-500 bg-danger-500/5 p-4 mt-4">
                  <h3 className="font-semibold text-danger-700 dark:text-danger-300 mb-2">행정 제제</h3>
                  <ul className="space-y-1.5 text-sm text-danger-700 dark:text-danger-300">
                    <li><strong>신규 등록·이전 등록 불가:</strong> 납기일로부터 60일 경과 후</li>
                    <li><strong>차량 운행 제지:</strong> 일부 지자체에서 단속 강화</li>
                    <li><strong>신용등급 하락:</strong> 체계적 추심 및 신용 조회 시 기록 남음</li>
                  </ul>
                </div>
              </section>

              <FaqSection items={[...FAQ_ITEMS]} />

              <section className="card">
                <h2 className="mb-3 text-lg font-semibold">관련 계산기·가이드</h2>
                <ul className="space-y-2 text-sm">
                  <li>
                    →{' '}
                    <Link href="/calculator/vehicle-tax/" className="text-primary-600 underline dark:text-primary-500">
                      자동차세 계산기
                    </Link>
                    {' — 배기량·차령·할인율 입력 후 즉시 세액 계산'}
                  </li>
                  <li>
                    →{' '}
                    <Link href="/guide/vehicle-individual-consumption-tax-deadline-2026-june/" className="text-primary-600 underline dark:text-primary-500">
                      자동차 개별소비세 6월 30일 마감 가이드
                    </Link>
                    {' — 신차 구매 시 개소세 인하(5% → 3.5%) 혜택 가이드'}
                  </li>
                  <li>
                    →{' '}
                    <Link href="/guide/january-vehicle-tax-prepayment/" className="text-primary-600 underline dark:text-primary-500">
                      1월 자동차세 연납 신청 가이드
                    </Link>
                    {' — 내년 1월 연납 신청으로 약 5% 할인 받는 법'}
                  </li>
                  <li>
                    →{' '}
                    <Link href="/guide/electric-vehicle-tax-2026/" className="text-primary-600 underline dark:text-primary-500">
                      전기차 자동차세 2026 가이드
                    </Link>
                    {' — 전기차·수소차는 배기량 없이 정액 13만원, 차령경감 미적용'}
                  </li>
                  <li>
                    →{' '}
                    <Link href="/guide/tax-calendar-2026/" className="text-primary-600 underline dark:text-primary-500">
                      2026년 세금 달력
                    </Link>
                    {' — 자동차세·취득세·양도세 전체 신고·납부 일정'}
                  </li>
                  <li>
                    →{' '}
                    <Link href="/calculator/acquisition-tax/" className="text-primary-600 underline dark:text-primary-500">
                      취득세 계산기
                    </Link>
                    {' — 부동산 취득 시 세금 (자동차와 별개)'}
                  </li>
                </ul>
              </section>

              <ShareButtons
                title="자동차세 제1기 6월 납부 완전 가이드 — 연납·차령경감 2026"
                url={URL}
                description="자동차세 제1기(6/16~30) 납부 시즌. 연납 할인, 차령경감 최대 50%, 세액 계산·납부방법 전체."
              />

              <section
                aria-label="출처 및 면책"
                className="rounded-lg border border-border-base p-4 text-caption text-text-tertiary"
              >
                <p className="mb-2">
                  <strong>법적 근거</strong>: 지방세법 §127(세율·차령경감 §127①제2호)·§128(납기)·§151(지방교육세) ·{' '}
                  <a
                    href="https://www.law.go.kr/법령/지방세법"
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="text-primary-600 underline dark:text-primary-500"
                  >
                    지방세법(국가법령정보센터)
                  </a>{' '}
                  ·{' '}
                  <a
                    href="https://wetax.go.kr"
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="text-primary-600 underline dark:text-primary-500"
                  >
                    위택스(자동차세 조회·납부)
                  </a>{' '}
                  ·{' '}
                  <a
                    href="https://www.mois.go.kr"
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="text-primary-600 underline dark:text-primary-500"
                  >
                    행정안전부(지방세 정책)
                  </a>
                  .
                </p>
                <p className="mb-2">
                  <strong>면책조항</strong>: 본 가이드는 2026년 6월 2일 기준 정보를 제공합니다.
                  세금 법령 및 정부 정책은 변경될 수 있으므로, 자동차세 납부 전 위택스 또는 관할 지자체 세무서에 최신 정보를 확인하시기 바랍니다.
                  특히 연납 공제율은 매년 국고예규에 따라 정해지므로, 신청 전 위택스에서 현재 공제율을 반드시 확인하세요.
                  개별 차량(영업용 차량, 특수 용도, 법인 소유 등)에 따라 세액이 달라질 수 있습니다.
                  본 콘텐츠는 AI 보조 작성 후 운영자 검수를 거쳤습니다.
                </p>
                <p>
                  <strong>업데이트</strong>: {DATE_MODIFIED} · 작성·검수: 김준혁 (calculatorhost)
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
