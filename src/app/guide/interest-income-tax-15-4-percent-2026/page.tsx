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

const URL = 'https://calculatorhost.com/guide/interest-income-tax-15-4-percent-2026/';
const DATE_PUBLISHED = '2026-06-16';
const DATE_MODIFIED = '2026-06-16';

export const metadata: Metadata = {
  title: '예금·적금 이자소득세 15.4% 완전정리 2026 | 세후 이자·세금우대 | calculatorhost',
  description:
    '예금·적금 이자소득세는 원천징수 15.4%(소득세 14%+지방소득세 1.4%)입니다. 세금우대종합저축은 9.5%. 금융소득 2천만 초과 시 종합과세. 정기예금 1,000만원·연3.5% 예시로 세후이자 계산법, 종합과세 시 세율 비교, ISA 비과세 조건을 2026년 기준으로 정리.',
  keywords: [
    '이자소득세 15.4%',
    '예금 이자소득세',
    '적금 세금',
    '세후이자 계산',
    '세금우대종합저축',
    '금융소득 종합과세',
    '소득세법 129조',
    '정기예금 세금',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '예금·적금 이자소득세 15.4% 2026' }],
    title: '예금·적금 이자소득세 15.4% 완전정리 2026',
    description: '세율 구조, 세후 계산, 세금우대·종합과세 조건',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '예금·적금 이자소득세 15.4% 2026',
    description: '세율 구조, 세후 이자 계산, 절감 방법',
  },
};

const FAQ_ITEMS = [
  {
    question: '예금 이자에 15.4%를 내야 하나요?',
    answer:
      '맞습니다. 정기예금·적금·초단기펀드 등의 이자소득은 소득세법 §129에 따라 14% 원천징수되고, 지방세법에서 1.4%(소득세의 10%)가 추가되어 총 15.4%입니다. 다만 세금우대종합저축(가입 조건 충족 시)은 9.5%(소득세 9%+지방소득세 0.9%), ISA(연 400만원 한도)는 비과세입니다.',
  },
  {
    question: '정기예금 1,000만원·3.5% 1년이면 세금이 얼마?',
    answer:
      '세전이자는 약 35만원입니다. 세금은 35만×15.4%=53,900원(10원절사)이고, 세후이자는 약 296,100원입니다. 최종 수령액은 약 10,296,100원입니다. 단, 세금우대 가입 시 세금은 33,250원으로 약 20,650원 절감됩니다.',
  },
  {
    question: '금융소득이 2,000만원을 넘으면 어떻게 되나요?',
    answer:
      '소득세법 §14③에 따라 금융소득(이자+배당) 합계가 연 2,000만원 초과 시, 초과분에 대해 종합과세가 됩니다. 분리과세 15.4% 대신 누진세율(6~45%)을 적용받아 세금이 크게 증가할 수 있습니다. 예: 금융소득 3,000만원이면 2,000만원까지는 분리과세, 1,000만원은 종합과세 처리.',
  },
  {
    question: '세금우대종합저축은 언제까지 가입 가능한가요?',
    answer:
      '세금우대종합저축은 조세특례제한법 §89의2에 따라 특정 연령(보통 청년, 취업자, 노후자 등 카테고리별로 다름)과 납입 기간(보통 5년 이상), 월 납입 한도 제약이 있습니다. 가입 조건이 종류별로 다르므로 금융회사에서 확인 후 신청하세요.',
  },
  {
    question: 'ISA 비과세 한도는 몇 년?',
    answer:
      'ISA(개인종합자산관리계좌)는 연 400만원(일반 ISA) 또는 600만원(청년·종부세 주택보유자 ISA) 이상 이자·배당을 비과세로 운용할 수 있습니다. 계약 주기는 상품별로 다르며, 비과세 기간도 종류에 따라 3년~5년입니다. 금융감독원(fss.or.kr)에서 현재 조건을 확인하세요.',
  },
  {
    question: '세금 떼인 후 추가 세금을 내야 하나요?',
    answer:
      '이자소득이 연 2,000만원 이하면 추가 세금은 없습니다. 원천징수된 15.4%(또는 9.5%)가 최종 세금입니다. 하지만 2,000만원 초과 시 초과분에 대해 5월 종합소득세 신고 때 추가 세금을 내거나 환급받아야 합니다.',
  },
];

export default function InterestIncomeTax2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '예금·적금 이자소득세 15.4% 2026' },
  ]);

  const articleLd = buildArticleJsonLd({
    headline: '예금·적금 이자소득세 15.4% 완전정리 2026 — 세후 이자 계산법',
    description:
      '예금·적금 이자소득세 원천징수율 15.4% 구조 분석, 세금우대종합저축 9.5%, 금융소득 종합과세 2천만원 한계, 정기예금 세후 이자 계산 실예시.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: [
      '이자소득세',
      '세금우대',
      '금융소득종합과세',
      '정기예금세금',
      '적금세금',
      '소득세법 129조',
    ],
  });

  const webPageLd = buildWebPageJsonLd({
    name: '예금·적금 이자소득세 15.4% 완전정리 2026 — 세후 이자 계산법',
    description:
      '소득세법 §129 기준 이자소득세 14%+1.4% 구조, 세금우대 조건, 금융소득 2천만원 종합과세 경계선, 실제 사례 계산.',
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
                    { name: '예금·적금 이자소득세 15.4% 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">금융·세금 · 10분 읽기 · 2026-06-16</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  예금·적금 이자소득세 15.4%
                  <br />
                  <span className="text-2xl text-text-secondary">— 세후 이자 계산법 완전정리 2026</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  예금·적금의 이자는 원천징수로 기본 15.4%(소득세 14%+지방소득세 1.4%)의 세금이 공제됩니다. 소득세법 §129에 따른 이 세율은 모든 개인 금융상품(정기예금, 적금, 초단기펀드 등)에 일괄 적용되지만, 세금우대종합저축(9.5%)이나 ISA(비과세) 같은 대체수단으로 절감할 수 있습니다. 또한 연 금융소득 2,000만원을 초과하면 종합과세로 세금이 크게 증가합니다. 2026년 기준으로 정확한 세율 구조, 세금우대 조건, 종합과세 경계선, 실제 계산 사례를 한눈에 정리했습니다.
                </p>
              </header>

              <AdSlot slot="guide-interest-income-tax-top" format="horizontal" />

              {/* Structured Summary */}
              <div className="space-y-4 rounded-lg border border-border-base bg-bg-card p-4">
                <div>
                  <h3 className="font-bold text-text-primary">정의</h3>
                  <p className="mt-1 text-sm text-text-secondary">
                    이자소득세는 개인이 예금·적금·채권 등에서 발생하는 이자에 대해 금융기관이 원천징수하는 세금입니다. 소득세법 §129에 따라 기본 14% 원천징수되고, 지방소득세 1.4%가 추가되어 총 15.4%입니다.
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-text-primary">핵심 수치</h3>
                  <table className="w-full text-sm">
                    <thead className="hidden">
                      <tr>
                        <th scope="col">항목</th>
                        <th scope="col">수치</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-t border-border-base">
                        <td className="py-2 text-text-secondary">기본 이자소득세 세율</td>
                        <td className="py-2 font-semibold text-text-primary">15.4% (14%+1.4%)</td>
                      </tr>
                      <tr className="border-t border-border-base">
                        <td className="py-2 text-text-secondary">세금우대종합저축 세율</td>
                        <td className="py-2 font-semibold text-text-primary">9.5% (9%+0.9%)</td>
                      </tr>
                      <tr className="border-t border-border-base">
                        <td className="py-2 text-text-secondary">금융소득 종합과세 기준</td>
                        <td className="py-2 font-semibold text-text-primary">연 2,000만원 초과</td>
                      </tr>
                      <tr className="border-t border-border-base">
                        <td className="py-2 text-text-secondary">ISA 비과세 한도</td>
                        <td className="py-2 font-semibold text-text-primary">연 400만원 (일반) / 600만원 (청년 등)</td>
                      </tr>
                      <tr className="border-t border-border-base">
                        <td className="py-2 text-text-secondary">세금 계산 기준 단위</td>
                        <td className="py-2 font-semibold text-text-primary">10원 단위 절사</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div>
                  <h3 className="font-bold text-text-primary">TL;DR</h3>
                  <ul className="mt-2 space-y-1 text-sm text-text-secondary">
                    <li>• 예금·적금 이자는 자동 15.4% 원천징수 (소득세법 §129)</li>
                    <li>• 세금우대종합저축 조건 충족 시 9.5%로 절감 가능</li>
                    <li>• 금융소득(이자+배당) 연 2,000만원 초과 시 종합과세로 세금 급증</li>
                    <li>• 정기예금 1,000만원·3.5% 1년: 세후이자 약 296,100원 (세금 53,900원)</li>
                    <li>• ISA·청년도약계좌 등 비과세 계좌는 조건 충족 시 선택 검토</li>
                  </ul>
                </div>
              </div>

              {/* Section 1: 15.4% 세율 구조 */}
              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-text-primary">
                  예금 이자소득세 15.4%는 어떻게 구성되나요?
                </h2>
                <p data-speakable className="text-text-secondary">
                  예금·적금의 이자는 소득세법 §129에 따라 <strong>원천징수 14%</strong>가 기본으로 공제됩니다. 여기에 지방소득세법에서 소득세의 <strong>10%인 1.4%</strong>를 추가하여, 최종 세율은 <strong>15.4%</strong>입니다.
                </p>

                <div className="rounded-lg border-l-4 border-primary-500 bg-bg-card p-4">
                  <h3 className="font-semibold text-text-primary">이자소득세 구성 (소득세법 §129, 지방세법)</h3>
                  <table className="mt-3 w-full text-sm">
                    <thead>
                      <tr>
                        <th scope="col" className="border-b border-border-base px-2 py-2 text-left font-semibold text-text-primary">세목</th>
                        <th scope="col" className="border-b border-border-base px-2 py-2 text-right font-semibold text-text-primary">세율</th>
                        <th scope="col" className="border-b border-border-base px-2 py-2 text-left text-xs text-text-secondary">근거</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="px-2 py-2 text-text-secondary">소득세(이자 원천징수)</td>
                        <td className="px-2 py-2 text-right font-semibold text-text-primary">14%</td>
                        <td className="px-2 py-2 text-xs text-text-tertiary">소득세법 §129</td>
                      </tr>
                      <tr>
                        <td className="px-2 py-2 text-text-secondary">지방소득세</td>
                        <td className="px-2 py-2 text-right font-semibold text-text-primary">1.4%</td>
                        <td className="px-2 py-2 text-xs text-text-tertiary">지방세법 (소득세의 10%)</td>
                      </tr>
                      <tr className="border-t-2 border-primary-500">
                        <td className="px-2 py-2 font-semibold text-text-primary">합계</td>
                        <td className="px-2 py-2 text-right font-bold text-primary-500">15.4%</td>
                        <td className="px-2 py-2 text-xs text-text-tertiary">실제 공제액</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <p className="text-text-secondary">
                  이 15.4%는 개인이 직접 신청하지 않아도 금융기관에서 자동 원천징수합니다. 은행 통장을 조회할 때 "이자" 항목과 별도로 "이자세금" 또는 "세금공제액"이 표시되는 이유입니다.
                </p>

                <div className="rounded-lg border border-yellow-600/20 bg-yellow-50/10 p-3 text-sm text-text-secondary dark:border-yellow-500/30 dark:bg-yellow-900/10">
                  <p className="mb-1 font-semibold text-text-primary">다만</p>
                  <p>
                    기본 15.4%는 분리과세 세율입니다. 만약 연 금융소득(이자+배당) 합계가 <strong>2,000만원을 초과</strong>하면, 초과분에 대해 <strong>종합과세</strong>가 적용되어 누진 세율(6~45%)을 납부해야 하므로 세금이 훨씬 커집니다. 자세한 내용은 아래 "2천만원 초과 시 종합과세" 섹션을 참조하세요.
                  </p>
                </div>
              </section>

              {/* Section 2: 실제 계산 예시 */}
              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-text-primary">
                  예금 세후이자는 어떻게 계산하나요?
                </h2>
                <p data-speakable className="text-text-secondary">
                  예금이자 계산은 매우 단순합니다. 세전이자에서 15.4%를 빼면 세후이자가 됩니다. 10원 단위로 절사되므로, 정확한 계산을 위해 단계별로 진행합니다.
                </p>

                <div className="space-y-3">
                  <div className="rounded-lg border border-border-base bg-bg-card p-4">
                    <h4 className="flex items-center font-semibold text-text-primary">
                      <span className="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-primary-500 text-white text-sm">1</span>
                      세전이자 계산
                    </h4>
                    <p className="mt-2 text-sm text-text-secondary">
                      <code className="block bg-bg-base p-2 text-xs leading-relaxed">
                        세전이자 = 원금 × 연이자율 / 12 × 개월 수
                      </code>
                      예: 1,000만원 × 3.5% / 12 × 12개월 = 350,000원
                    </p>
                  </div>

                  <div className="rounded-lg border border-border-base bg-bg-card p-4">
                    <h4 className="flex items-center font-semibold text-text-primary">
                      <span className="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-primary-500 text-white text-sm">2</span>
                      세금 계산 (10원 단위 절사)
                    </h4>
                    <p className="mt-2 text-sm text-text-secondary">
                      <code className="block bg-bg-base p-2 text-xs leading-relaxed">
                        세금 = Math.floor(세전이자 × 15.4% / 10) × 10
                      </code>
                      예: Math.floor(350,000 × 15.4% / 10) × 10 = Math.floor(5,390 / 10) × 10 = 53,900원
                    </p>
                  </div>

                  <div className="rounded-lg border border-border-base bg-bg-card p-4">
                    <h4 className="flex items-center font-semibold text-text-primary">
                      <span className="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-primary-500 text-white text-sm">3</span>
                      세후이자 계산
                    </h4>
                    <p className="mt-2 text-sm text-text-secondary">
                      <code className="block bg-bg-base p-2 text-xs leading-relaxed">
                        세후이자 = 세전이자 - 세금
                      </code>
                      예: 350,000 - 53,900 = 296,100원
                    </p>
                  </div>

                  <div className="rounded-lg border border-border-base bg-bg-card p-4">
                    <h4 className="flex items-center font-semibold text-text-primary">
                      <span className="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-primary-500 text-white text-sm">4</span>
                      최종 수령액
                    </h4>
                    <p className="mt-2 text-sm text-text-secondary">
                      <code className="block bg-bg-base p-2 text-xs leading-relaxed">
                        최종 수령액 = 원금 + 세후이자
                      </code>
                      예: 10,000,000 + 296,100 = 10,296,100원
                    </p>
                  </div>
                </div>

                <div className="rounded-lg border border-blue-600/20 bg-blue-50/10 p-3 text-sm text-text-secondary dark:border-blue-500/30 dark:bg-blue-900/10">
                  <p className="mb-2 font-semibold text-text-primary">실제 사례</p>
                  <table className="w-full border-collapse text-xs">
                    <thead>
                      <tr className="border-b border-blue-300/30">
                        <th scope="col" className="px-2 py-1 text-left text-text-primary">항목</th>
                        <th scope="col" className="px-2 py-1 text-right text-text-primary">금액</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-blue-300/20">
                        <td className="px-2 py-1">원금</td>
                        <td className="px-2 py-1 text-right font-semibold">10,000,000원</td>
                      </tr>
                      <tr className="border-b border-blue-300/20">
                        <td className="px-2 py-1">연이자율</td>
                        <td className="px-2 py-1 text-right font-semibold">3.5%</td>
                      </tr>
                      <tr className="border-b border-blue-300/20">
                        <td className="px-2 py-1">기간</td>
                        <td className="px-2 py-1 text-right font-semibold">1년(12개월)</td>
                      </tr>
                      <tr className="border-b border-blue-300/30">
                        <td className="px-2 py-1 font-semibold">세전이자</td>
                        <td className="px-2 py-1 text-right font-bold text-text-primary">350,000원</td>
                      </tr>
                      <tr className="border-b border-blue-300/20">
                        <td className="px-2 py-1">세금(15.4%)</td>
                        <td className="px-2 py-1 text-right text-orange-600">53,900원</td>
                      </tr>
                      <tr className="border-b border-blue-300/30">
                        <td className="px-2 py-1 font-semibold">세후이자</td>
                        <td className="px-2 py-1 text-right font-bold text-green-600">296,100원</td>
                      </tr>
                      <tr>
                        <td className="px-2 py-1 font-semibold">최종 수령</td>
                        <td className="px-2 py-1 text-right font-bold text-text-primary">10,296,100원</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="rounded-lg border border-yellow-600/20 bg-yellow-50/10 p-3 text-sm text-text-secondary dark:border-yellow-500/30 dark:bg-yellow-900/10">
                  <p className="mb-1 font-semibold text-text-primary">다만</p>
                  <p>
                    은행마다 이자 계산 방식(월복리·연복리·단리)과 세금 공제 시점이 약간 다를 수 있습니다. 정확한 금액은 금융기관 모바일 앱이나 통장에서 확인하는 것이 가장 정확합니다.
                  </p>
                </div>
              </section>

              {/* Section 3: 세금우대 */}
              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-text-primary">
                  세금우대종합저축으로 9.5%까지 줄일 수 있나요?
                </h2>
                <p data-speakable className="text-text-secondary">
                  맞습니다. 조세특례제한법 §89의2에 따라 <strong>세금우대종합저축</strong>에 가입하면 세율이 <strong>9.5%(소득세 9%+지방소득세 0.9%)</strong>로 낮아집니다. 기본 15.4%에서 약 38% 절감되는 효과입니다.
                </p>

                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <h3 className="font-semibold text-text-primary">세금우대 자격 요건 (상품별로 다름)</h3>
                  <ul className="mt-3 space-y-2 text-sm text-text-secondary">
                    <li>
                      <strong>기본 조건:</strong> 만 18세 이상 개인 (법인 제외)
                    </li>
                    <li>
                      <strong>연령/신분 제한:</strong> 청년(20대), 취업자, 근로자, 중소기업 근무자 등 카테고리별로 상이 (금융기관 확인 필수)
                    </li>
                    <li>
                      <strong>가입 기한:</strong> 상품별로 정해진 모집 기간 내에만 신청 가능
                    </li>
                    <li>
                      <strong>보유 기간:</strong> 보통 5년 이상 (도중 해지 시 세금우대 상실)
                    </li>
                    <li>
                      <strong>월 납입 한도:</strong> 보통 월 100만~200만원 이내
                    </li>
                  </ul>
                </div>

                <div className="rounded-lg border border-blue-600/20 bg-blue-50/10 p-3 text-sm text-text-secondary dark:border-blue-500/30 dark:bg-blue-900/10">
                  <p className="mb-2 font-semibold text-text-primary">절감 비교: 기본 15.4% vs 세금우대 9.5%</p>
                  <table className="w-full border-collapse text-xs">
                    <thead>
                      <tr className="border-b border-blue-300/30">
                        <th scope="col" className="px-2 py-1 text-left text-text-primary">항목</th>
                        <th scope="col" className="px-2 py-1 text-right text-text-primary">일반 상품(15.4%)</th>
                        <th scope="col" className="px-2 py-1 text-right text-text-primary">세금우대(9.5%)</th>
                        <th scope="col" className="px-2 py-1 text-right text-green-600">절감액</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-blue-300/20">
                        <td className="px-2 py-1">원금</td>
                        <td className="px-2 py-1 text-right">1,000만원</td>
                        <td className="px-2 py-1 text-right">1,000만원</td>
                        <td className="px-2 py-1 text-right">—</td>
                      </tr>
                      <tr className="border-b border-blue-300/20">
                        <td className="px-2 py-1">연이자율</td>
                        <td className="px-2 py-1 text-right">3.5%</td>
                        <td className="px-2 py-1 text-right">3.5%</td>
                        <td className="px-2 py-1 text-right">—</td>
                      </tr>
                      <tr className="border-b border-blue-300/20">
                        <td className="px-2 py-1">1년 세전이자</td>
                        <td className="px-2 py-1 text-right">350,000원</td>
                        <td className="px-2 py-1 text-right">350,000원</td>
                        <td className="px-2 py-1 text-right">—</td>
                      </tr>
                      <tr className="border-b border-blue-300/30">
                        <td className="px-2 py-1 font-semibold">세금</td>
                        <td className="px-2 py-1 text-right font-semibold text-orange-600">53,900원</td>
                        <td className="px-2 py-1 text-right font-semibold">33,250원</td>
                        <td className="px-2 py-1 text-right font-bold text-green-600">20,650원</td>
                      </tr>
                      <tr>
                        <td className="px-2 py-1 font-semibold">세후이자</td>
                        <td className="px-2 py-1 text-right font-semibold">296,100원</td>
                        <td className="px-2 py-1 text-right font-semibold text-green-600">316,750원</td>
                        <td className="px-2 py-1 text-right">—</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="rounded-lg border border-yellow-600/20 bg-yellow-50/10 p-3 text-sm text-text-secondary dark:border-yellow-500/30 dark:bg-yellow-900/10">
                  <p className="mb-1 font-semibold text-text-primary">다만</p>
                  <p>
                    세금우대종합저축은 <strong>각 은행·증권사마다 가입 조건이 다릅니다</strong>. 시중은행(국민·신한·우리·하나 등), 인터넷은행, 증권사가 각각 독립적인 상품을 운영하므로, 직접 금융기관에 문의하여 "현재 세금우대 상품" 가입 가능 여부와 조건을 확인해야 합니다.
                  </p>
                </div>
              </section>

              <AdSlot slot="guide-interest-income-tax-mid" format="rectangle" />

              {/* Section 4: 금융소득 종합과세 */}
              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-text-primary">
                  금융소득 2천만원 초과 시 종합과세가 되면 얼마나 세금이 늘나요?
                </h2>
                <p data-speakable className="text-text-secondary">
                  소득세법 §14③에 따라 <strong>연 금융소득(이자+배당) 합계가 2,000만원을 초과</strong>하면, 초과분에 대해 <strong>종합과세</strong>가 적용됩니다. 분리과세 15.4% 대신 누진 세율(6~45%)이 적용되므로 세금이 크게 증가합니다.
                </p>

                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <h3 className="font-semibold text-text-primary">금융소득 종합과세 구조</h3>
                  <ul className="mt-3 space-y-2 text-sm text-text-secondary">
                    <li>
                      <strong>2,000만원 이하:</strong> 분리과세 15.4% (원천징수로 최종 확정)
                    </li>
                    <li>
                      <strong>2,000만원 초과:</strong> 초과분에 대해 <strong>종합소득세 누진세율(소득세법 §55)</strong> 적용
                    </li>
                    <li>
                      <strong>누진 세율:</strong> 6%~45% (과세표준 1,400만원 이하 6% → 10억 초과 45%)
                    </li>
                    <li>
                      <strong>신고 시기:</strong> 다음해 5월 종합소득세 신고 시 추가 세금 납부 또는 환급
                    </li>
                  </ul>
                </div>

                <p className="text-text-secondary">
                  예를 들어, 연 금융소득이 3,000만원이라면:
                </p>

                <ul className="space-y-2 text-sm text-text-secondary">
                  <li>
                    <strong>2,000만원:</strong> 분리과세 15.4% → 원천징수로 약 308만원 세금
                  </li>
                  <li>
                    <strong>초과 1,000만원:</strong> 종합과세(누진) → 5월 신고 때 추가 계산 (6~15% 수준이지만, 다른 소득과 합산되면 달라짐)
                  </li>
                </ul>

                <div className="rounded-lg border border-yellow-600/20 bg-yellow-50/10 p-3 text-sm text-text-secondary dark:border-yellow-500/30 dark:bg-yellow-900/10">
                  <p className="mb-1 font-semibold text-text-primary">다만</p>
                  <p>
                    <strong>금융소득에 "이자만" 해당하는 것이 아닙니다</strong>. 이자(예금·적금·채권), 배당금(주식·펀드), 배당 대체 소득 등이 모두 합산됩니다. 주식 배당을 받거나 펀드 배당금을 받는 투자자라면 더욱 주의해야 합니다.
                  </p>
                </div>
              </section>

              {/* Section 5: ISA·비과세 계좌 */}
              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-text-primary">
                  ISA나 비과세 계좌로 세금을 완전히 피할 수 있나요?
                </h2>
                <p data-speakable className="text-text-secondary">
                  일부 가능합니다. <strong>ISA(개인종합자산관리계좌)</strong>와 <strong>청년도약계좌</strong> 같은 조세특혜 계좌는 연 한도 범위 내에서 발생하는 이자·배당을 비과세로 운용할 수 있습니다. 하지만 한도 초과분은 일반 세율을 적용받습니다.
                </p>

                <div className="space-y-3">
                  <div className="rounded-lg border border-border-base bg-bg-card p-4">
                    <h4 className="font-semibold text-text-primary">1. ISA (개인종합자산관리계좌)</h4>
                    <ul className="mt-2 space-y-1 text-sm text-text-secondary">
                      <li>
                        • <strong>비과세 한도:</strong> 연 400만원(일반 ISA) 또는 600만원(청년·종부세 주택보유자)
                      </li>
                      <li>
                        • <strong>운용 대상:</strong> 예금, 주식, 펀드, 채권 등 다양한 상품 조합 가능
                      </li>
                      <li>
                        • <strong>한도 내 수익:</strong> 100% 비과세
                      </li>
                      <li>
                        • <strong>한도 초과분:</strong> 일반 15.4% 또는 배당금 세율 적용
                      </li>
                    </ul>
                  </div>

                  <div className="rounded-lg border border-border-base bg-bg-card p-4">
                    <h4 className="font-semibold text-text-primary">2. 청년도약계좌 (특정 저소득 청년용)</h4>
                    <ul className="mt-2 space-y-1 text-sm text-text-secondary">
                      <li>
                        • <strong>대상:</strong> 일정 연소득 이하 청년(정의 기준 연간 변동)
                      </li>
                      <li>
                        • <strong>비과세 한도:</strong> 연 600만원 (5년 최대 3,000만원)
                      </li>
                      <li>
                        • <strong>의무 보유:</strong> 최소 5년 이상 (도중 해지 시 전액 과세)
                      </li>
                      <li>
                        • <strong>현황:</strong> 2026년 신청 조건은 금융감독원(fss.or.kr)에서 확인
                      </li>
                    </ul>
                  </div>

                  <div className="rounded-lg border border-border-base bg-bg-card p-4">
                    <h4 className="font-semibold text-text-primary">3. 기타 비과세 계좌</h4>
                    <ul className="mt-2 space-y-1 text-sm text-text-secondary">
                      <li>
                        • <strong>장기펀드:</strong> 보유 기간 충족 시 분배금 일부 비과세 (조건 복잡)
                      </li>
                      <li>
                        • <strong>개별 조세특혜:</strong> 저축 통장, 주택마련 저축 등 (각각 조건 상이)
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="rounded-lg border border-yellow-600/20 bg-yellow-50/10 p-3 text-sm text-text-secondary dark:border-yellow-500/30 dark:bg-yellow-900/10">
                  <p className="mb-1 font-semibold text-text-primary">다만</p>
                  <p>
                    비과세 계좌의 정의 기준, 가입 자격, 연간 한도는 정부 정책에 따라 매년 변경될 수 있습니다. <strong>금융감독원(fss.or.kr)</strong> 또는 <strong>국세청(nts.go.kr)</strong>의 최신 안내를 반드시 확인하세요.
                  </p>
                </div>
              </section>

              {/* FAQ Section */}
              <FaqSection items={FAQ_ITEMS} />

              {/* Related Links */}
              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-text-primary">관련 계산기 & 가이드</h2>
                <div className="grid gap-3 sm:grid-cols-2">
                  <Link
                    href="/calculator/deposit/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 transition hover:border-primary-500 hover:bg-bg-card/80"
                  >
                    <h4 className="font-semibold text-primary-500">정기예금 이자 계산기</h4>
                    <p className="mt-1 text-sm text-text-secondary">
                      원금·기간·금리 입력 → 세후 이자 실시간 계산
                    </p>
                  </Link>

                  <Link
                    href="/calculator/savings/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 transition hover:border-primary-500 hover:bg-bg-card/80"
                  >
                    <h4 className="font-semibold text-primary-500">적금 이자 계산기</h4>
                    <p className="mt-1 text-sm text-text-secondary">
                      월 납입액·금리 입력 → 최종 수령액 자동 계산
                    </p>
                  </Link>

                  <Link
                    href="/guide/financial-income-comprehensive-vs-separate-taxation/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 transition hover:border-primary-500 hover:bg-bg-card/80"
                  >
                    <h4 className="font-semibold text-primary-500">금융소득 종합과세 vs 분리과세</h4>
                    <p className="mt-1 text-sm text-text-secondary">
                      이자+배당 2천만원 초과 시 세금 비교
                    </p>
                  </Link>

                  <Link
                    href="/guide/separate-vs-comprehensive-taxation-master-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 transition hover:border-primary-500 hover:bg-bg-card/80"
                  >
                    <h4 className="font-semibold text-primary-500">분리과세 vs 종합과세 마스터</h4>
                    <p className="mt-1 text-sm text-text-secondary">
                      금융·사적연금·기타소득 과세 방식 총정리
                    </p>
                  </Link>

                  <Link
                    href="/category/finance/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 transition hover:border-primary-500 hover:bg-bg-card/80"
                  >
                    <h4 className="font-semibold text-primary-500">금융 카테고리</h4>
                    <p className="mt-1 text-sm text-text-secondary">
                      대출·예금·투자·환율 계산기 모음
                    </p>
                  </Link>

                  <Link
                    href="/calculator/salary/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 transition hover:border-primary-500 hover:bg-bg-card/80"
                  >
                    <h4 className="font-semibold text-primary-500">연봉 실수령액 계산기</h4>
                    <p className="mt-1 text-sm text-text-secondary">
                      소득세·4대보험 공제 자동 계산
                    </p>
                  </Link>
                </div>
              </section>

              {/* 면책조항 & AI 표기 */}
              <footer className="border-t border-border-base pt-8 text-xs text-text-tertiary">
                <p className="mb-3">
                  이 가이드는 <strong>2026년 6월 16일</strong> 기준으로 작성되었습니다. 소득세법 §129, 조세특례제한법 §89의2 등 관련 법령을 참고하여 정확성을 기했으나, 정책 개정 시 달라질 수 있습니다.
                </p>
                <p className="mb-3">
                  <strong>세금우대 가입 조건, ISA 한도, 비과세 계좌 자격</strong>은 정부 정책과 금융기관별로 상시 변경되므로, 반드시 <Link href="https://fss.or.kr" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">
                    금융감독원(fss.or.kr)
                  </Link> 또는 거래 금융기관에서 최신 정보를 확인하세요.
                </p>
                <p className="mb-3">
                  본 가이드는 <strong>Claude(Anthropic)의 지원을 받아 작성된 후 운영자가 소득세법, 국세청 공식 자료, 금융감독원 기준으로 검수</strong>했습니다. 실제 계산 사례는 개인의 정확한 거래 내역 기반으로 금융기관이나 국세청(hometax.go.kr)에서 재확인하시기 바랍니다.
                </p>
                <p>
                  © 2026 <Link href="/" className="text-primary-500 underline">
                    calculatorhost.com
                  </Link>
                  . 모든 권리 보유.
                </p>
              </footer>

              <ShareButtons
                title="예금·적금 이자소득세 15.4% 완전정리 2026"
                url={URL}
                description="세율 구조, 세금우대 9.5%, 종합과세 2천만원, 세후 이자 계산"
              />
            </article>
          </main>
        </div>
        <Footer />
      </div>
    </>
  );
}
