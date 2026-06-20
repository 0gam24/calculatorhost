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

const URL = 'https://calculatorhost.com/guide/national-pension-expected-benefit-2026/';
const DATE_PUBLISHED = '2026-06-15';
const DATE_MODIFIED = '2026-06-15';

export const metadata: Metadata = {
  title: '국민연금 예상 수령액 2026 | 조회·계산법·조기/연기 손익 | calculatorhost',
  description:
    '2026년 국민연금 예상 수령액은 가입기간과 평균소득으로 결정됩니다. 공단 예상연금액 조회 방법, 조기노령연금 감액률 6%/년, 연기연금 증액률 7.2%/년, 최소 가입기간 10년까지 국민연금공단 기준으로 정리했습니다.',
  keywords: [
    '국민연금 예상 수령액',
    '국민연금 수령액 조회',
    '국민연금 조기수령',
    '연기연금',
    '국민연금 얼마 받나',
    '국민연금 노령연금',
    '국민연금법 51조',
    '조기노령연금',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '국민연금 예상 수령액 2026' }],
    title: '국민연금 예상 수령액 2026',
    description: '공단 예상연금액 조회, 조기/연기 수령 손익 비교, 법조항 기준',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '국민연금 예상 수령액 2026',
    description: '조회·계산법·조기/연기 손익 비교',
  },
};

const FAQ_ITEMS = [
  {
    question: '국민연금 예상 수령액은 어떻게 정해지나요?',
    answer:
      '국민연금 수령액은 가입기간(월 수)과 가입 중 평균소득에 의해 결정됩니다. 국민연금법 제51조에 따라 기본연금액 = 평균소득월액 × 가입기간/480 + 전국평균소득월액 × (480-가입기간)/480 공식으로 계산되며, 가입기간이 20년을 초과하면 초과분 1년마다 50/1,000을 추가 적용합니다. 최종 수령액은 국민연금공단의 "내 연금 알아보기" 조회로 정확히 확인하세요.',
  },
  {
    question: '국민연금은 몇 살부터 받을 수 있나요?',
    answer:
      '국민연금법 제61조에 따라 1969년 이후 출생자는 65세부터 정상 수령이 가능합니다. 다만 60세부터 조기노령연금을 신청할 수 있으나, 감액이 적용됩니다. 최소 가입기간 10년(120개월) 이상 충족해야 노령연금 수급권이 발생합니다.',
  },
  {
    question: '조기에 받으면 얼마나 줄어드나요?',
    answer:
      '국민연금법 제62조에 따라 조기노령연금은 수령을 앞당기는 매 1년마다 연금액의 6%씩 감액되며, 최대 5년 앞당길 경우 총 30%가 줄어듭니다. 이 감액률은 평생 유지되므로 65세 대신 60세에 신청하면 매월 70% 수준만 받게 됩니다. 조기 수령 결정 전 장수 기대수명을 고려해야 합니다.',
  },
  {
    question: '연금을 미루면 더 많이 받나요?',
    answer:
      '네. 국민연금법 제66조에 따라 연기연금은 수령을 미루는 매 1년마다 기본연금액에 7.2%씩 증액되며, 최대 5년 미룰 경우(70세) 총 36%가 영구 증액됩니다. 월 0.6%(7.2%/12)씩 가산되므로, 정상 월 100만 원이면 70세에 신청 시 월 136만 원을 평생 받게 됩니다.',
  },
  {
    question: '최소 몇 년을 납입해야 받을 수 있나요?',
    answer:
      '국민연금은 최소 가입기간 10년(120개월) 이상 납부해야 노령연금을 받을 수 있습니다. 10년 미만이면 납부한 보험료는 환급받을 수 있으나 연금으로는 받을 수 없습니다. 임의가입(자영업자 등) 또는 추납(과거 기간)을 통해 가입기간을 늘릴 수 있습니다.',
  },
  {
    question: '조기 vs 정상 vs 연기, 어떤 것이 이득인가요?',
    answer:
      '개인의 기대수명이 핵심 판단 기준입니다. 단명(75세 이전 사망 예상)이면 조기수령, 평균(75~85세)이면 정상수령, 장수(85세 이후 기대)이면 연기수령이 유리합니다. 65세 정상 월 100만 원 기준: 60세 조기(월 70만)는 약 81개월(6.75년) 후인 86.75세, 70세 연기(월 136만)는 약 55개월(4.6년) 후인 74.6세 시점에 누적 손익이 역전됩니다.',
  },
  {
    question: '국민연금 수령 중 다시 일하면 어떻게 되나요?',
    answer:
      '조기노령연금 수령자가 소득 있는 업무에 종사하면 일부 연금이 정지될 수 있습니다. 정상 수령(65세 이상)이나 연기연금 수령자는 일해도 감액 없이 전액 지급됩니다. 정확한 소득 기준과 감액 규모는 국민연금공단(☎1355)에 상담하세요.',
  },
];

export default function NationalPensionExpectedBenefitPage() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '국민연금 예상 수령액 2026' },
  ]);

  const articleLd = buildArticleJsonLd({
    headline: '국민연금 예상 수령액 2026 — 조회·계산법·조기/연기 손익',
    description:
      '가입기간과 평균소득으로 정해지는 국민연금 예상 수령액. 공단 조회 방법, 조기/연기 감액·증액률, 수령 시기별 손익분석.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: [
      '국민연금 예상 수령액',
      '국민연금 수령액 조회',
      '조기노령연금',
      '연기연금',
      '국민연금 계산',
    ],
  });

  const webPageLd = buildWebPageJsonLd({
    name: '국민연금 예상 수령액 2026 — 조회·계산법·조기/연기 손익',
    description:
      '국민연금법 제51조·제61조·제62조·제66조 기준으로 정확히 정리한 예상 수령액 계산법, 조회 방법, 수령 시기별 손익 비교.',
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
                    { name: '국민연금 예상 수령액 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">보험·연금 · 8분 읽기 · 2026-06-15</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  국민연금 예상 수령액 2026
                  <br />
                  <span className="text-2xl text-text-secondary">— 조회·계산법·조기/연기 손익</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  국민연금 예상 수령액은 가입기간과 가입 중 평균소득에 따라 결정되며, 정확한 금액은 국민연금공단 '내 연금 알아보기'에서 조회할 수 있습니다. 60세 조기수령, 65세 정상수령, 70세 연기수령 중 어느 시기를 선택하느냐에 따라 평생 수령액이 30~36% 달라집니다. 국민연금법 제51조·제61조·제62조·제66조 기준으로 정확히 정리한 계산법, 조회 방법, 수령 시기별 손익을 한눈에 비교합니다.
                </p>
              </header>

              <AdSlot slot="guide-pension-benefit-top" format="horizontal" />

              {/* Structured Summary */}
              <div className="space-y-4 rounded-lg border border-border-base bg-bg-card p-4">
                <div>
                  <h3 className="font-bold text-text-primary">정의</h3>
                  <p className="mt-1 text-sm text-text-secondary">
                    국민연금 예상 수령액은 가입자가 일정한 보험료를 납부한 후 수급 연령에 도달했을 때 매달 받을 수 있는 연금 금액입니다.
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-text-primary">핵심 수치</h3>
                  <table className="w-full text-sm">
                    <tbody>
                      <tr className="border-t border-border-base">
                        <td className="py-2 text-text-secondary">정상 수급 나이</td>
                        <td className="py-2 font-semibold text-text-primary">65세 (1969년 이후 출생)</td>
                      </tr>
                      <tr className="border-t border-border-base">
                        <td className="py-2 text-text-secondary">최소 가입기간</td>
                        <td className="py-2 font-semibold text-text-primary">10년 (120개월)</td>
                      </tr>
                      <tr className="border-t border-border-base">
                        <td className="py-2 text-text-secondary">조기수령 감액률</td>
                        <td className="py-2 font-semibold text-text-primary">6% / 년 (최대 30%)</td>
                      </tr>
                      <tr className="border-t border-border-base">
                        <td className="py-2 text-text-secondary">연기연금 증액률</td>
                        <td className="py-2 font-semibold text-text-primary">7.2% / 년 (최대 36%)</td>
                      </tr>
                      <tr className="border-t border-border-base">
                        <td className="py-2 text-text-secondary">기본연금액 결정요소</td>
                        <td className="py-2 font-semibold text-text-primary">가입기간 + 평균소득(A·B값) · 공단 조회</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div>
                  <h3 className="font-bold text-text-primary">TL;DR</h3>
                  <ul className="mt-2 space-y-1 text-sm text-text-secondary">
                    <li>• 정확한 예상 수령액은 국민연금공단 앱/웹에서 '내 연금 알아보기' 조회</li>
                    <li>• 60세 조기는 월 70%, 70세 연기는 월 136% 기준에서 비교</li>
                    <li>• 기대수명 85세 기준으로 연기수령이 누적액 이득 (4.6년 후 역전)</li>
                    <li>• 국민연금법 §51·§61·§62·§66 기준 적용</li>
                  </ul>
                </div>
              </div>

              {/* Section 1: 수령액 결정 요소 */}
              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-text-primary">
                  국민연금 수령액은 어떻게 정해지나요?
                </h2>
                <p data-speakable className="text-text-secondary">
                  국민연금 수령액은 <strong>가입기간(몇 개월 납부했는가)</strong>과 <strong>평균소득(월 평균 얼마를 버셨는가)</strong> 두 가지 요소에 의해 결정됩니다.
                </p>

                <div className="rounded-lg border-l-4 border-primary-500 bg-bg-card p-4">
                  <h3 className="font-semibold text-text-primary">기본연금액 산식 (국민연금법 §51)</h3>
                  <p className="mt-2 text-sm text-text-secondary">
                    <code className="block bg-bg-base p-2 text-xs leading-relaxed">
                      기본연금액 = (평균소득월액 × 가입기간/480) + (전국평균소득월액 × (480-가입기간)/480)
                    </code>
                  </p>
                </div>

                <p className="text-text-secondary">
                  이 공식은 개인이 얼마를 벌었는지(평균소득월액)와 얼마나 오래 납부했는지(가입기간)를 모두 반영합니다. 가입기간이 길수록, 평균소득이 높을수록 수령액이 많아집니다.
                </p>

                <p className="text-text-secondary">
                  다만 <strong>구체적인 계산은 복잡하고 개인 상황에 따라 달라지므로</strong>, 정확한 예상 수령액은 다음 섹션에서 설명하는 국민연금공단 조회 방법을 사용하는 것이 정답입니다.
                </p>

                <div className="rounded-lg border border-yellow-600/20 bg-yellow-50/10 p-3 text-sm text-text-secondary dark:border-yellow-500/30 dark:bg-yellow-900/10">
                  <p className="mb-1 font-semibold text-text-primary">⚠️ 다만</p>
                  <p>
                    가입기간이 <strong>20년을 초과</strong>하면, 초과하는 1년마다 기본연금액에 <strong>50/1,000</strong>을 추가로 곱합니다. 예를 들어 가입기간이 25년(5년 초과)이면 추가 250/1,000이 적용되어 수령액이 추가로 인상됩니다.
                  </p>
                </div>
              </section>

              {/* Section 2: 예상연금액 조회 방법 (단계별) */}
              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-text-primary">
                  예상연금액을 조회하는 정확한 방법은?
                </h2>
                <p data-speakable className="text-text-secondary">
                  개인의 정확한 예상 수령액을 알기 위해서는 <strong>국민연금공단의 '내 연금 알아보기' 서비스</strong>를 이용하는 것이 정답입니다. 단계별로 설명합니다.
                </p>

                <div className="space-y-3">
                  <div className="rounded-lg border border-border-base bg-bg-card p-4">
                    <h4 className="flex items-center font-semibold text-text-primary">
                      <span className="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-primary-500 text-white text-sm">1</span>
                      국민연금공단 홈페이지 방문
                    </h4>
                    <p className="mt-2 text-sm text-text-secondary">
                      <Link href="https://www.nps.or.kr" target="_blank" rel="noopener noreferrer" className="text-primary-500 underline">
                        https://www.nps.or.kr
                      </Link>
                      에 접속합니다. 또는 스마트폰 앱 '국민연금' 다운로드.
                    </p>
                  </div>

                  <div className="rounded-lg border border-border-base bg-bg-card p-4">
                    <h4 className="flex items-center font-semibold text-text-primary">
                      <span className="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-primary-500 text-white text-sm">2</span>
                      본인 인증
                    </h4>
                    <p className="mt-2 text-sm text-text-secondary">
                      '로그인' 또는 '개인 서비스' 탭에서 본인인증(공동인증서, 생체인증, PASS 등)을 합니다.
                    </p>
                  </div>

                  <div className="rounded-lg border border-border-base bg-bg-card p-4">
                    <h4 className="flex items-center font-semibold text-text-primary">
                      <span className="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-primary-500 text-white text-sm">3</span>
                      '내 연금 알아보기' 선택
                    </h4>
                    <p className="mt-2 text-sm text-text-secondary">
                      '연금정보' → '내 연금 알아보기' 메뉴를 클릭합니다. 예상 수령액(노령연금, 조기노령연금, 연기연금 각각)이 월별로 표시됩니다.
                    </p>
                  </div>

                  <div className="rounded-lg border border-border-base bg-bg-card p-4">
                    <h4 className="flex items-center font-semibold text-text-primary">
                      <span className="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-primary-500 text-white text-sm">4</span>
                      수령 시나리오 비교
                    </h4>
                    <p className="mt-2 text-sm text-text-secondary">
                      60세(조기), 65세(정상), 70세(연기) 각각의 월 수령액이 표시되므로, 다음 섹션의 손익분석을 참고해 선택합니다.
                    </p>
                  </div>
                </div>

                <div className="rounded-lg border border-yellow-600/20 bg-yellow-50/10 p-3 text-sm text-text-secondary dark:border-yellow-500/30 dark:bg-yellow-900/10">
                  <p className="mb-1 font-semibold text-text-primary">⚠️ 다만</p>
                  <p>
                    공단의 '예상 수령액'은 <strong>현재 가입 기록 기준의 추정치</strong>입니다. 향후 추가 납부, 임의가입, 추납 등으로 가입기간이 늘어나면 수령액도 인상됩니다. 매년 정기적으로 재조회하여 최신 정보를 확인하세요.
                  </p>
                </div>
              </section>

              {/* Section 3: 조기수령 손익 */}
              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-text-primary">
                  60세에 일찍 받으면 손해는 얼마나 되나요?
                </h2>
                <p data-speakable className="text-text-secondary">
                  조기노령연금은 <strong>수령을 앞당기는 매 1년마다 연금액의 6%씩 감액</strong>됩니다 (국민연금법 §62). 최대 5년까지 앞당길 수 있으므로 총 30%가 줄어듭니다.
                </p>

                <table className="w-full border-collapse border border-border-base text-sm">
                  <caption className="mb-2 text-left text-xs font-semibold text-text-secondary">
                    조기수령 시 월 수령액 비교 (정상 월 100만 원 기준)
                  </caption>
                  <thead>
                    <tr className="bg-bg-card">
                      <th className="border border-border-base px-3 py-2 text-left font-semibold text-text-primary">수령 연령</th>
                      <th className="border border-border-base px-3 py-2 text-left font-semibold text-text-primary">감액률</th>
                      <th className="border border-border-base px-3 py-2 text-left font-semibold text-text-primary">월 수령액</th>
                      <th className="border border-border-base px-3 py-2 text-left font-semibold text-text-primary">평생 손실액*</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-border-base px-3 py-2 text-text-primary">60세</td>
                      <td className="border border-border-base px-3 py-2">30%</td>
                      <td className="border border-border-base px-3 py-2 font-semibold">70만 원</td>
                      <td className="border border-border-base px-3 py-2 text-orange-600">약 7,560만 원</td>
                    </tr>
                    <tr className="bg-bg-card/50">
                      <td className="border border-border-base px-3 py-2 text-text-primary">62세</td>
                      <td className="border border-border-base px-3 py-2">12%</td>
                      <td className="border border-border-base px-3 py-2 font-semibold">88만 원</td>
                      <td className="border border-border-base px-3 py-2 text-orange-600">약 2,860만 원</td>
                    </tr>
                    <tr>
                      <td className="border border-border-base px-3 py-2 text-text-primary">65세</td>
                      <td className="border border-border-base px-3 py-2">0%</td>
                      <td className="border border-border-base px-3 py-2 font-semibold">100만 원</td>
                      <td className="border border-border-base px-3 py-2">—</td>
                    </tr>
                  </tbody>
                </table>

                <p className="text-xs text-text-tertiary">
                  * 평생 손실액은 80세까지 생존 기준으로 65세 정상수령 누적액과의 차이입니다. 장수할수록 손실액이 커집니다.
                </p>

                <p className="text-text-secondary">
                  예를 들어, 정상 수령액이 월 100만 원이라면:
                </p>

                <ul className="space-y-2 text-sm text-text-secondary">
                  <li>
                    <strong>60세 조기수령:</strong> 월 70만 원. 65세부터의 100만 원과 비교하면, 약 6년(81개월) 뒤인 86.75세부터 누적액이 같아집니다. 즉, 85세 이전에 사망하면 조기수령이 손해.
                  </li>
                  <li>
                    <strong>62세 조기수령:</strong> 월 88만 원. 약 2.3년(28개월) 뒤인 67.3세부터 누적액이 같아집니다.
                  </li>
                </ul>

                <div className="rounded-lg border border-yellow-600/20 bg-yellow-50/10 p-3 text-sm text-text-secondary dark:border-yellow-500/30 dark:bg-yellow-900/10">
                  <p className="mb-1 font-semibold text-text-primary">⚠️ 다만</p>
                  <p>
                    조기수령 신청 시 소득 있는 업무에 종사하지 않아야 합니다. 일하고 있다면 조기노령연금 신청이 제한될 수 있습니다. 정확한 소득 기준은 국민연금공단(☎1355)에 확인하세요.
                  </p>
                </div>
              </section>

              <AdSlot slot="guide-pension-benefit-mid" format="rectangle" />

              {/* Section 4: 연기연금 손익 */}
              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-text-primary">
                  70세까지 미루면 얼마나 더 받나요?
                </h2>
                <p data-speakable className="text-text-secondary">
                  연기연금은 <strong>수령을 미루는 매 1년마다 기본연금액에 7.2%씩 증액</strong>됩니다 (국민연금법 §66). 최대 5년까지 미룰 수 있으므로 총 36%가 인상됩니다.
                </p>

                <table className="w-full border-collapse border border-border-base text-sm">
                  <caption className="mb-2 text-left text-xs font-semibold text-text-secondary">
                    연기수령 시 월 수령액 비교 (정상 월 100만 원 기준)
                  </caption>
                  <thead>
                    <tr className="bg-bg-card">
                      <th className="border border-border-base px-3 py-2 text-left font-semibold text-text-primary">수령 연령</th>
                      <th className="border border-border-base px-3 py-2 text-left font-semibold text-text-primary">증액률</th>
                      <th className="border border-border-base px-3 py-2 text-left font-semibold text-text-primary">월 수령액</th>
                      <th className="border border-border-base px-3 py-2 text-left font-semibold text-text-primary">수익 전환점</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-border-base px-3 py-2 text-text-primary">65세</td>
                      <td className="border border-border-base px-3 py-2">0%</td>
                      <td className="border border-border-base px-3 py-2 font-semibold">100만 원</td>
                      <td className="border border-border-base px-3 py-2 text-green-600">—</td>
                    </tr>
                    <tr className="bg-bg-card/50">
                      <td className="border border-border-base px-3 py-2 text-text-primary">67세</td>
                      <td className="border border-border-base px-3 py-2">+14.4%</td>
                      <td className="border border-border-base px-3 py-2 font-semibold">114.4만 원</td>
                      <td className="border border-border-base px-3 py-2 text-green-600">약 71.5세</td>
                    </tr>
                    <tr>
                      <td className="border border-border-base px-3 py-2 text-text-primary">70세</td>
                      <td className="border border-border-base px-3 py-2">+36%</td>
                      <td className="border border-border-base px-3 py-2 font-semibold">136만 원</td>
                      <td className="border border-border-base px-3 py-2 text-green-600">약 74.6세</td>
                    </tr>
                  </tbody>
                </table>

                <p className="text-text-secondary">
                  예를 들어, 정상 수령액이 월 100만 원이라면:
                </p>

                <ul className="space-y-2 text-sm text-text-secondary">
                  <li>
                    <strong>70세 연기수령:</strong> 월 136만 원. 65세부터의 100만 원 누적액과 비교하면, 약 4.6년(55개월) 뒤인 74.6세부터 누적액이 같아집니다. 즉, 85세 이후 장수가 예상되면 연기수령이 유리.
                  </li>
                  <li>
                    <strong>67세 연기수령:</strong> 월 114.4만 원. 약 6.5년(78개월) 뒤인 73.5세부터 누적액이 역전.
                  </li>
                </ul>

                <div className="rounded-lg border border-yellow-600/20 bg-yellow-50/10 p-3 text-sm text-text-secondary dark:border-yellow-500/30 dark:bg-yellow-900/10">
                  <p className="mb-1 font-semibold text-text-primary">⚠️ 다만</p>
                  <p>
                    연기연금 신청 후에도 중간에 취소할 수 있습니다. 예를 들어 70세까지 미루기로 신청했다가 68세에 갑자기 수령이 필요하면, 신청 시점까지의 증액률(14.4%)만 적용되어 수령할 수 있습니다.
                  </p>
                </div>
              </section>

              {/* Section 5: 최소가입·임의가입·추납 */}
              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-text-primary">
                  10년 미만이면 연금을 못 받나요? 가입기간을 늘리는 방법은?
                </h2>
                <p data-speakable className="text-text-secondary">
                  국민연금은 최소 가입기간 <strong>10년(120개월) 이상</strong>을 충족해야 노령연금을 받을 수 있습니다 (국민연금법 §61). 10년 미만이면 납부한 보험료는 환급받을 수 있으나 연금으로는 받을 수 없습니다.
                </p>

                <p className="text-text-secondary">
                  다행히 가입기간을 늘릴 수 있는 방법이 있습니다:
                </p>

                <div className="space-y-3">
                  <div className="rounded-lg border border-border-base bg-bg-card p-4">
                    <h4 className="font-semibold text-text-primary">1. 임의가입 (자영업자·프리랜서)</h4>
                    <p className="mt-2 text-sm text-text-secondary">
                      18세 이상 60세 미만이면 누구나 월별 보험료를 내고 가입할 수 있습니다. 직장 경력이 끝난 후 임의가입으로 기간을 채워 10년 조건을 달성할 수 있습니다.
                    </p>
                  </div>

                  <div className="rounded-lg border border-border-base bg-bg-card p-4">
                    <h4 className="font-semibold text-text-primary">2. 추납 (과거 기간 납부)</h4>
                    <p className="mt-2 text-sm text-text-secondary">
                      과거에 국민연금에서 제외된 기간(예: 2008년 이전 일부 기간)을 추가로 납부할 수 있습니다. 5년 이내 미납 기간을 일괄 추납하면 가입기간으로 인정됩니다.
                    </p>
                  </div>

                  <div className="rounded-lg border border-border-base bg-bg-card p-4">
                    <h4 className="font-semibold text-text-primary">3. 군 복무기간 추가 산입</h4>
                    <p className="mt-2 text-sm text-text-secondary">
                      2008년 4월 이후 현역 군 복무 기간(최대 12개월)이 가입기간으로 자동 인정됩니다. 결혼과 출산 기간도 추가로 인정(자녀 1명당 12개월).
                    </p>
                  </div>
                </div>

                <div className="rounded-lg border border-yellow-600/20 bg-yellow-50/10 p-3 text-sm text-text-secondary dark:border-yellow-500/30 dark:bg-yellow-900/10">
                  <p className="mb-1 font-semibold text-text-primary">⚠️ 다만</p>
                  <p>
                    임의가입·추납 시 장시간이 걸릴 수 있으므로, 조기에 전략을 짜야 합니다. 예를 들어 직장 퇴직 후 60세까지 5년간 임의가입하면 가입기간을 5년(60개월) 연장할 수 있습니다. 정확한 가입 기록은 국민연금공단(☎1355)에서 무료로 조회할 수 있습니다.
                  </p>
                </div>
              </section>

              {/* FAQ Section (중간 배치) */}
              <FaqSection items={FAQ_ITEMS} />

              {/* Related Guides */}
              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-text-primary">관련 가이드 & 계산기</h2>
                <div className="grid gap-3 sm:grid-cols-2">
                  <Link
                    href="/guide/national-pension-premium-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 transition hover:border-primary-500 hover:bg-bg-card/80"
                  >
                    <h4 className="font-semibold text-primary-500">국민연금 보험료 2026</h4>
                    <p className="mt-1 text-sm text-text-secondary">
                      월별 보험료 계산법, 4대보험 통합 공제 기준
                    </p>
                  </Link>

                  <Link
                    href="/guide/basic-pension-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 transition hover:border-primary-500 hover:bg-bg-card/80"
                  >
                    <h4 className="font-semibold text-primary-500">기초연금 2026</h4>
                    <p className="mt-1 text-sm text-text-secondary">
                      국민연금 수령자 추가 수령 자격, 금액
                    </p>
                  </Link>

                  <Link
                    href="/guide/severance-vs-pension-dc-db/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 transition hover:border-primary-500 hover:bg-bg-card/80"
                  >
                    <h4 className="font-semibold text-primary-500">퇴직금 vs DC/DB 선택</h4>
                    <p className="mt-1 text-sm text-text-secondary">
                      3가지 퇴직연금 제도 비교, 세금 정리
                    </p>
                  </Link>

                  <Link
                    href="/calculator/retirement/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 transition hover:border-primary-500 hover:bg-bg-card/80"
                  >
                    <h4 className="font-semibold text-primary-500">은퇴자금 계산기</h4>
                    <p className="mt-1 text-sm text-text-secondary">
                      노후 필요 자금 시뮬레이션, 국민연금 연동
                    </p>
                  </Link>

                  <Link
                    href="/calculator/inflation/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 transition hover:border-primary-500 hover:bg-bg-card/80"
                  >
                    <h4 className="font-semibold text-primary-500">화폐가치 계산기</h4>
                    <p className="mt-1 text-sm text-text-secondary">
                      연금의 미래 실질 구매력 계산, 인플레이션 반영
                    </p>
                  </Link>

                  <Link
                    href="/calculator/salary/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 transition hover:border-primary-500 hover:bg-bg-card/80"
                  >
                    <h4 className="font-semibold text-primary-500">연봉 실수령액 계산기</h4>
                    <p className="mt-1 text-sm text-text-secondary">
                      세금·4대보험 공제 자동 계산, 월급 확인
                    </p>
                  </Link>

                  <Link
                    href="/category/insurance/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 transition hover:border-primary-500 hover:bg-bg-card/80"
                  >
                    <h4 className="font-semibold text-primary-500">보험·연금 카테고리</h4>
                    <p className="mt-1 text-sm text-text-secondary">
                      건강보험, 고용보험 등 전체 가이드
                    </p>
                  </Link>
                </div>
              </section>

              {/* 면책조항 & AI 표기 */}
              <footer className="border-t border-border-base pt-8 text-xs text-text-tertiary">
                <p className="mb-3">
                  이 가이드는 <strong>2026년 6월 15일</strong> 기준으로 작성되었습니다. 국민연금법 제51조·제61조·제62조·제66조 등을 참고하여 정확성을 기했으나, 정책 개정 시 달라질 수 있습니다.
                </p>
                <p className="mb-3">
                  <strong>정확한 예상 수령액</strong>은 반드시 <Link href="https://www.nps.or.kr" target="_blank" rel="noopener noreferrer" className="text-primary-500 underline">
                    국민연금공단
                  </Link> 에서 '내 연금 알아보기' 서비스로 조회하시기 바랍니다. 본 가이드의 시뮬레이션은 예시일 뿐 법적 근거가 되지 않습니다.
                </p>
                <p className="mb-3">
                  본 가이드는 <strong>Claude(Anthropic)의 지원을 받아 작성된 후 운영자가 국민연금법, 국민연금공단 공식 자료, 학술 논문으로 검수</strong>했습니다.
                </p>
                <p>
                  © 2026 <Link href="/" className="text-primary-500 underline">
                    calculatorhost.com
                  </Link>
                  . 모든 권리 보유.
                </p>
              </footer>

              <ShareButtons
                title="국민연금 예상 수령액 2026"
                url={URL}
                description="60세 조기, 65세 정상, 70세 연기 수령 손익 비교"
              />
            </article>
          </main>
        </div>
        <Footer />
      </div>
    </>
  );
}
