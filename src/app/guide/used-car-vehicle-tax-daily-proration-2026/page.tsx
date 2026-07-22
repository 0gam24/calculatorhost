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

const URL = 'https://calculatorhost.com/guide/used-car-vehicle-tax-daily-proration-2026/';
const DATE_PUBLISHED = '2026-06-27';
const DATE_MODIFIED = '2026-06-27';

export const metadata: Metadata = {
  title: '중고차 자동차세 일할계산 2026 — 매도·매수 정산 누가 얼마',
  description:
    '중고차 매매 시 자동차세를 소유 일수만큼 나눠 내는 "일할계산" 가이드. 매도인·매수인 정산 규칙(지방세법 §128) + 실제 계산 사례 3가지 + 위택스 정산 방법.',
  keywords: [
    '중고차 자동차세',
    '자동차세 일할계산',
    '자동차세 정산',
    '자동차세 매도',
    '자동차세 소유권 이전',
    '지방세법 128조',
    '자동차세 월할',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [
      {
        url: '/og-default.png',
        width: 1200,
        height: 630,
        alt: '중고차 자동차세 일할계산 2026 — 매도·매수 정산 누가 얼마',
      },
    ],
    title: '중고차 자동차세 일할계산 2026',
    description: '소유권 이전일 기준 매도인·매수인이 일수만큼 부담. 정산 공식 + 3가지 실제 계산 사례.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '중고차 자동차세 일할계산 2026',
    description: '매도인·매수인 정산 규칙 + 계산 공식 + 위택스 처리',
  },
};

const FAQ_ITEMS = [
  {
    question: '자동차세 일할계산이 뭔가요?',
    answer:
      '자동차세는 매년 6월·12월 두 번 납부합니다. 중고차를 팔거나 살 때 소유권이 이전되는 그 날을 기준으로, 그 해 남은 납기분을 매도인과 매수인이 소유한 일수만큼 나눠 내는 것을 "일할계산"이라고 합니다. 지방세법 §128에 명시된 정산 규칙입니다.',
  },
  {
    question: '매도인·매수인 각각 누가 얼마를 내나요?',
    answer:
      '소유권 이전일 전날까지가 매도인, 이전일부터 연말까지가 매수인입니다. 공식은 "해당 연도 자동차세 × (소유 일수 ÷ 365일)"입니다. 예를 들어 8월 15일 소유권 이전 시 매도인은 1/1~8/14(226일), 매수인은 8/15~12/31(139일) 부담합니다.',
  },
  {
    question: '언제까지 정산해야 하나요?',
    answer:
      '정기분 자동차세 납기는 정확합니다. 예를 들어 6월 말 중고차를 사면 매수인은 별도 7~12월분(2기분) 자동차세를 12월 16~31일에 내면 됩니다. 정산은 위택스 또는 시·군청에서 1~2개월 이내에 자동으로 처리되는 경우가 많습니다.',
  },
  {
    question: '일할계산 과정에서 반올림은 어떻게 되나요?',
    answer:
      '정산액은 법정 통화인 원 단위입니다. 10원 단위로 절사하거나 반올림하는 것이 관례입니다. 지자체별로 약간의 차이가 있을 수 있으므로, 위택스나 시·군청에서 정산 고지서 받을 때 그 금액을 확인하시면 됩니다.',
  },
  {
    question: '전기차·수소차는 일할계산이 다른가요?',
    answer:
      '아닙니다. 전기차·수소차도 동일하게 일할계산됩니다. 다만 전기차는 배기량이 없어서 비영업용 13만원 정액과세(지방세법 §127①제3호)이고, 차령경감이 적용되지 않습니다. 일할계산 공식 자체는 모든 차종에 동일합니다.',
  },
  {
    question: '매도 직후 환급은 나오나요?',
    answer:
      '네, 위택스 또는 시·군청에 소유권 이전 증명 제출 시 정산 요청할 수 있습니다. 매도인이 이미 6월 또는 12월에 정기분 자동차세를 다 냈다면, 경과 일수분만 환급받습니다. 처리 기간은 보통 1~2개월입니다.',
  },
  {
    question: '세부 정산 공식 예시를 하나 더 보여주실 수 있나요?',
    answer:
      '예시: 1600cc 승용차 연세액 29.12만원, 4월 30일 소유권 이전. 매도인 1/1~4/29(119일) → 291,200 × 119/365 = 95,207원. 매수인 4/30~12/31(246일) → 291,200 × 246/365 = 195,993원. 합계 95,207 + 195,993 = 291,200원 ✓. 위택스의 "자동차세 일할계산" 메뉴에서 소유권 이전 증명서만 업로드하면 자동 계산됩니다.',
  },
  {
    question: '아직 1기분(1~6월) 자동차세 안 냈는데 8월에 사면?',
    answer:
      '이 경우 복잡합니다. 매도인이 1기분을 안 냈다면 "탈루"로 분류돼 이자·가산세가 붙을 수 있습니다. 중고차 거래 전에 위택스에서 "차량 세금 미납 여부" 확인 필수. 매수인도 매도인의 기존 체납을 물려받지 않으려면 거래 전 확인이 중요합니다.',
  },
] as const;

export default function UsedCarVehicleTaxDailyProrateionPage() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '중고차 자동차세 일할계산' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '중고차 자동차세 일할계산 2026 — 매도·매수인 정산 규칙 + 계산 공식',
    description:
      '중고차 매매 시 소유권 이전일 기준 자동차세 정산. 매도인·매수인 일수별 부담 공식 + 3가지 실제 계산 사례 + 위택스·시청 정산 절차.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['자동차세 일할계산', '중고차 정산', '소유권 이전', '지방세법 128조'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '중고차 자동차세 일할계산 2026',
    description:
      '중고차를 매매할 때 소유권 이전일 기준으로 자동차세를 매도인·매수인이 소유한 일수만큼 나눠 내는 정산 규칙. 공식·계산 사례·위택스 처리 절차 안내.',
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
                    { name: '중고차 자동차세 일할계산' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">세금·자동차 · 7분 읽기 · 2026-06-27</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  중고차 자동차세 일할계산 2026
                  <br />
                  <span className="text-2xl text-text-secondary">— 매도인·매수인 정산 규칙 + 계산 공식</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  중고차를 매매하거나 소유권을 이전할 때, 그 해의 자동차세를 매도인과 매수인이
                  <strong>소유한 일수만큼 나눠 내는 것</strong>을 "일할계산"이라고 합니다 (지방세법 §128). 누가 얼마를 내야 하는지, 어떻게 계산하는지,
                  위택스에서 어떻게 정산하는지 정리했습니다.
                </p>
              </header>

              <AdSlot slot="guide-used-car-vehicle-tax-daily-proration-2026-top" format="horizontal" />

              <section aria-label="핵심 요약" className="card border-l-4 border-l-primary-500">
                <h2 className="mb-2 text-caption uppercase tracking-wider text-primary-500">핵심 요약</h2>
                <ul className="space-y-1.5 text-sm" data-speakable>
                  <li><strong>기준일</strong>: 소유권 이전일 (매도인 범위: 그 전날까지 / 매수인: 이전일부터 연말까지)</li>
                  <li><strong>공식</strong>: 연 자동차세 × (소유 일수 ÷ 365일)</li>
                  <li><strong>예시</strong>: 8월 15일 이전 시 매도인 226일, 매수인 139일 부담</li>
                  <li><strong>정산</strong>: 위택스 또는 시·군청에서 소유권 이전 증명서 제출 후 자동 처리 (1~2개월)</li>
                  <li><strong>환급</strong>: 매도인이 이미 낸 세금 중 경과 일수분 환급받음</li>
                  <li><strong>주의</strong>: 이전 전 위택스에서 세금 미납 여부 확인 필수</li>
                </ul>
              </section>

              <section aria-label="일할계산 정의" className="card">
                <h2 className="mb-3 border-b-2 border-b-border-base pb-3 text-xl font-bold">
                  자동차세 일할계산이란?
                </h2>
                <p className="text-text-secondary mb-3" data-speakable>
                  자동차세는 해마다 <strong>6월 16~30일(1기분: 1~6월)</strong>과 <strong>12월 16~31일(2기분: 7~12월)</strong> 두 번
                  납부합니다. 중고차를 팔거나 살 때, 소유권 이전이 이루어지면 그 해의 남은 납기분을 매도인과 매수인이 소유한 일수만큼 나눠 내야 합니다. 이를 "일할계산" 또는 "일할정산"이라고 부릅니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 text-sm">
                  <p className="font-semibold text-text-primary mb-2">법적근거</p>
                  <p className="text-text-secondary">
                    지방세법 §128 (자동차세 납기·징수) 및 시행령 관련 규정에 명시되어 있습니다. 정확한 정산은 지자체의 자동차세 과에서 담당하며, 위택스에서
                    전자 신청·확인이 가능합니다.
                  </p>
                </div>
              </section>

              <section aria-label="정산 공식" className="card">
                <h2 className="mb-3 border-b-2 border-b-border-base pb-3 text-xl font-bold">
                  일할계산 공식 + 계산 단계
                </h2>
                <div className="overflow-x-auto mb-4">
                  <table className="w-full text-sm border-collapse">
                    <caption className="text-left text-xs text-text-secondary mb-2 font-semibold">자동차세 일할계산 공식</caption>
                    <thead>
                      <tr className="bg-primary-500/10 border border-border-base">
                        <th className="px-3 py-2 text-left font-bold">구분</th>
                        <th className="px-3 py-2 text-left">계산식</th>
                      </tr>
                    </thead>
                    <tbody className="text-text-secondary">
                      <tr className="border border-border-base">
                        <td className="px-3 py-2 font-semibold">매도인 부담</td>
                        <td className="px-3 py-2">연 자동차세 × (소유 일수 ÷ 365)</td>
                      </tr>
                      <tr className="border border-border-base bg-primary-500/5">
                        <td className="px-3 py-2 font-semibold">매수인 부담</td>
                        <td className="px-3 py-2">연 자동차세 × (소유 일수 ÷ 365)</td>
                      </tr>
                      <tr className="border border-border-base">
                        <td className="px-3 py-2 font-semibold">검증</td>
                        <td className="px-3 py-2">매도인 부담 + 매수인 부담 = 연 자동차세</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-raised p-4 text-sm">
                  <p className="font-semibold text-text-primary mb-2">계산 단계</p>
                  <ol className="space-y-2 text-text-secondary">
                    <li><strong>Step 1.</strong> 본인 차량의 연 자동차세 확인 (배기량 × 단가 + 지방교육세)</li>
                    <li><strong>Step 2.</strong> 소유권 이전일 확인 (계약서·등록증 상 이전 예정일)</li>
                    <li><strong>Step 3.</strong> 매도인 소유 일수 = 1월 1일부터 이전 전날까지 (평년 365일 기준)</li>
                    <li><strong>Step 4.</strong> 매수인 소유 일수 = 이전일부터 12월 31일까지</li>
                    <li><strong>Step 5.</strong> 각 금액 = 연 세액 × (해당 일수 ÷ 365) → 10원 단위 절사/반올림</li>
                  </ol>
                </div>
              </section>

              <section aria-label="실제 계산 사례" className="card">
                <h2 className="mb-3 border-b-2 border-b-border-base pb-3 text-xl font-bold">
                  3가지 실제 계산 사례
                </h2>

                <div className="space-y-4">
                  <div className="rounded-lg border border-border-base bg-bg-card p-4">
                    <p className="font-semibold text-text-primary mb-3">사례 1. 경차 1000cc, 8월 15일 이전</p>
                    <ul className="space-y-1.5 text-sm text-text-secondary">
                      <li>• 연 자동차세: 104,000원 (80원/cc × 1000cc + 지방교육세)</li>
                      <li>• 매도인 소유 기간: 1/1 ~ 8/14 = <strong>226일</strong> (31+28+31+30+31+30+31+14=226)</li>
                      <li>• 매도인 부담: 104,000 × (226 ÷ 365) = <strong>64,598원</strong></li>
                      <li>• 매수인 소유 기간: 8/15 ~ 12/31 = <strong>139일</strong></li>
                      <li>• 매수인 부담: 104,000 × (139 ÷ 365) = <strong>39,402원</strong></li>
                      <li className="font-semibold text-text-primary">✓ 합계: 64,598 + 39,402 = 104,000원</li>
                    </ul>
                  </div>

                  <div className="rounded-lg border border-border-base bg-bg-card p-4">
                    <p className="font-semibold text-text-primary mb-3">사례 2. 1600cc 승용차, 4월 30일 이전</p>
                    <ul className="space-y-1.5 text-sm text-text-secondary">
                      <li>• 연 자동차세: 291,200원 (140원/cc × 1600cc + 지방교육세)</li>
                      <li>• 매도인 소유 기간: 1/1 ~ 4/29 = <strong>119일</strong> (31+28+31+29=119)</li>
                      <li>• 매도인 부담: 291,200 × (119 ÷ 365) = <strong>95,207원</strong></li>
                      <li>• 매수인 소유 기간: 4/30 ~ 12/31 = <strong>246일</strong> (365 - 119 = 246)</li>
                      <li>• 매수인 부담: 291,200 × (246 ÷ 365) = <strong>195,993원</strong></li>
                      <li className="font-semibold text-text-primary">✓ 합계: 95,207 + 195,993 = 291,200원</li>
                    </ul>
                  </div>

                  <div className="rounded-lg border border-border-base bg-bg-card p-4">
                    <p className="font-semibold text-text-primary mb-3">사례 3. 2000cc 고급 승용차, 2월 28일 이전</p>
                    <ul className="space-y-1.5 text-sm text-text-secondary">
                      <li>• 연 자동차세: 520,000원 (200원/cc × 2000cc + 지방교육세)</li>
                      <li>• 매도인 소유 기간: 1/1 ~ 2/27 = <strong>58일</strong> (31+27=58)</li>
                      <li>• 매도인 부담: 520,000 × (58 ÷ 365) = <strong>82,466원</strong></li>
                      <li>• 매수인 소유 기간: 2/28 ~ 12/31 = <strong>307일</strong> (365 - 58 = 307)</li>
                      <li>• 매수인 부담: 520,000 × (307 ÷ 365) = <strong>437,534원</strong></li>
                      <li className="font-semibold text-text-primary">✓ 합계: 82,466 + 437,534 = 520,000원</li>
                    </ul>
                  </div>
                </div>

                <p className="mt-4 text-xs text-text-tertiary">
                  <strong>팁</strong>: 3가지 사례 모두 매도인 부담 + 매수인 부담 = 연 자동차세임을 확인하세요. 반올림 또는 절사로 1원 차이가 날 수 있습니다.
                </p>
              </section>

              <section aria-label="정기분 납기와의 관계" className="card">
                <h2 className="mb-3 border-b-2 border-b-border-base pb-3 text-xl font-bold">
                  정기분(1기·2기) 납기와 일할계산의 관계
                </h2>
                <p className="text-text-secondary mb-3" data-speakable>
                  자동차세 정기분은 매년 정해진 날짜에 납부합니다. 예를 들어 8월 20일에 중고차를 사면, 매수인은 그 해 2기분(7~12월)
                  자동차세만 내면 됩니다. 이때 1기분(1~6월) 자동차세와 7~8월 20일까지 자동차세는 매도인이 이미 낸 것이므로,
                  위택스에서 자동으로 정산됩니다.
                </p>
                <div className="overflow-x-auto mb-4">
                  <table className="w-full text-sm border-collapse">
                    <caption className="text-left text-xs text-text-secondary mb-2 font-semibold">이전 시기별 정기분 정산 예시</caption>
                    <thead>
                      <tr className="bg-primary-500/10 border border-border-base">
                        <th className="px-3 py-2 text-left font-bold">이전 시기</th>
                        <th className="px-3 py-2 text-left">매도인 부담</th>
                        <th className="px-3 py-2 text-left">매수인 부담</th>
                      </tr>
                    </thead>
                    <tbody className="text-text-secondary">
                      <tr className="border border-border-base">
                        <td className="px-3 py-2 font-semibold">1월~5월</td>
                        <td className="px-3 py-2">1기분 일할 + 2기분 전액</td>
                        <td className="px-3 py-2">1기분 일할만</td>
                      </tr>
                      <tr className="border border-border-base bg-primary-500/5">
                        <td className="px-3 py-2 font-semibold">6월 16일 이후</td>
                        <td className="px-3 py-2">1기분 전액 + 2기분 일할</td>
                        <td className="px-3 py-2">2기분 일할만</td>
                      </tr>
                      <tr className="border border-border-base">
                        <td className="px-3 py-2 font-semibold">7월~11월</td>
                        <td className="px-3 py-2">2기분 일할</td>
                        <td className="px-3 py-2">2기분 일할</td>
                      </tr>
                      <tr className="border border-border-base">
                        <td className="px-3 py-2 font-semibold">12월 16일 이후</td>
                        <td className="px-3 py-2">2기분 전액</td>
                        <td className="px-3 py-2">없음 (다음해부터)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-xs text-text-tertiary" data-speakable>
                  <strong>주의</strong>: 6월 16일 정기분 납기 기한 전후로 기준이 달라집니다. 예를 들어 6월 15일 이전 이전이면
                  1기분을 미리 내야 하는 경우도 있으니, 위택스에서 정확히 확인 필수입니다.
                </p>
              </section>

              <section aria-label="위택스 정산 절차" className="card">
                <h2 className="mb-3 border-b-2 border-b-border-base pb-3 text-xl font-bold">
                  위택스에서 정산하기 (3단계)
                </h2>
                <ol className="space-y-3">
                  <li className="rounded-lg border border-border-base bg-bg-card p-4">
                    <strong className="text-text-primary block mb-1">Step 1. 위택스 로그인 → 자동차세 메뉴 진입</strong>
                    <p className="text-text-secondary text-sm">
                      <a
                        href="https://www.wetax.go.kr"
                        target="_blank"
                        rel="noopener noreferrer nofollow"
                        className="text-primary-600 underline dark:text-primary-500"
                      >
                        wetax.go.kr
                      </a>
                      에 로그인 → "자동차세" 메뉴 → "소유권 이전 정산" 또는 "일할 정산" 항목 선택. 차량번호 자동 조회됨.
                    </p>
                  </li>
                  <li className="rounded-lg border border-border-base bg-bg-card p-4">
                    <strong className="text-text-primary block mb-1">Step 2. 소유권 이전 증명서 제출</strong>
                    <p className="text-text-secondary text-sm">
                      자동차 등록증·소유권 이전 계약서·중개인증(부동산중개사무소 발급)·보험료 납입증 등 이전 증거 서류 업로드. 거래 완료일 기준.
                    </p>
                  </li>
                  <li className="rounded-lg border border-border-base bg-bg-card p-4">
                    <strong className="text-text-primary block mb-1">Step 3. 확인 후 결과 조회</strong>
                    <p className="text-text-secondary text-sm">
                      정산 처리 완료 (1~2개월 소요) 후 위택스에서 "정산 고지서" 다운로드. 매도인 환급액 또는 매수인 추가 납부액 확인. 환급금은
                      계좌이체 또는 수표 발급.
                    </p>
                  </li>
                </ol>
                <div className="mt-4 rounded-lg border border-border-base bg-bg-raised p-4 text-sm">
                  <p className="font-semibold text-text-primary mb-2">위택스 상담·확인</p>
                  <p className="text-text-secondary">
                    위택스 고객지원: 1544-0111 (평일 9~18시) · 시·군청 자동차세과 직접 방문 또는 전화 가능. 거래 전 "미납 세금 확인" 조회도 이곳에서
                    가능합니다.
                  </p>
                </div>
              </section>

              <section aria-label="주의사항" className="card">
                <h2 className="mb-3 border-b-2 border-b-border-base pb-3 text-xl font-bold">
                  주의: 중고차 거래 전 체크리스트
                </h2>
                <ul className="space-y-2 text-sm text-text-secondary">
                  <li>
                    ✓ <strong>매도인 세금 미납 확인</strong>: 위택스에서 차량번호 입력 → "자동차세 미납 조회" → 미납이 있으면 매수인이 물려받을 수 있음
                  </li>
                  <li>
                    ✓ <strong>정기분 납기 기한 확인</strong>: 6월 16~30일(1기) · 12월 16~31일(2기). 기한 전후로 정산 방식이 다름
                  </li>
                  <li>
                    ✓ <strong>계약서에 이전일 명시</strong>: 중고차 거래 계약서에 "소유권 이전 예정일" 명확히 기재 (분쟁 예방)
                  </li>
                  <li>
                    ✓ <strong>등록증 갱신 후 정산</strong>: 소유권 이전 후 새 등록증 받은 다음, 위택스에서 정산 신청 (보통 1~2주 후)
                  </li>
                  <li>
                    ✓ <strong>환급 처리 기한</strong>: 정산 신청 후 1~2개월 소요. 연말 또는 연초는 지연될 수 있음
                  </li>
                </ul>
              </section>

              <AdSlot slot="guide-used-car-vehicle-tax-daily-proration-2026-mid" format="rectangle" />

              <FaqSection items={[...FAQ_ITEMS]} />

              <section className="card">
                <h2 className="mb-3 text-lg font-semibold">관련 도구 · 가이드</h2>
                <ul className="space-y-2 text-sm">
                  <li>
                    → <Link href="/calculator/vehicle-tax/" className="text-primary-600 underline dark:text-primary-500">
                      자동차세 계산기
                    </Link>{' '}
                    — 본인 차량 배기량 입력 후 연세액 및 월할 한도, 차령경감 포함 확인
                  </li>
                  <li>
                    → <Link href="/guide/vehicle-tax-2026/" className="text-primary-600 underline dark:text-primary-500">
                      자동차세 2026 기본 가이드
                    </Link>{' '}
                    — 세율표, 차령경감, 전기차 정액과세 상세 설명
                  </li>
                  <li>
                    → <Link href="/guide/january-vehicle-tax-prepayment/" className="text-primary-600 underline dark:text-primary-500">
                      자동차세 연납 5% 할인 가이드
                    </Link>{' '}
                    — 1월 미리납부로 절감액 확인 및 위택스 신청 방법
                  </li>
                  <li>
                    → <Link href="/category/tax/" className="text-primary-600 underline dark:text-primary-500">
                      모든 세금 계산기·가이드
                    </Link>{' '}
                    — 양도세, 취득세, 재산세 등
                  </li>
                </ul>
              </section>

              <ShareButtons
                title="중고차 자동차세 일할계산 2026 — 매도·매수 정산 누가 얼마"
                url={URL}
                description="소유권 이전 기준 자동차세 정산. 공식 + 3가지 계산 사례 + 위택스 절차"
              />

              <section aria-label="출처 및 면책" className="rounded-lg border border-border-base p-4 text-caption text-text-tertiary">
                <p className="mb-2">
                  <strong>법적 근거</strong>: 지방세법 §128 (자동차세 납기·징수). 참고:{' '}
                  <a href="https://law.go.kr" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-600 underline dark:text-primary-500">
                    law.go.kr 국가법령정보센터
                  </a>
                  ,{' '}
                  <a href="https://www.wetax.go.kr" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-600 underline dark:text-primary-500">
                    위택스(wetax.go.kr)
                  </a>
                  .
                </p>
                <p>
                  <strong>업데이트</strong>: {DATE_MODIFIED} · <strong>작성·검수</strong>: 김준혁 · <strong>공시</strong>: AI 보조 작성 후 운영자 검수.
                  정산 금액은 지자체별·반올림 규칙별로 1원 이상 차이가 날 수 있으니, 위택스 고지서를 최종 기준으로 하세요.
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
