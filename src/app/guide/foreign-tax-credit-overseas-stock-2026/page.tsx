import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { Footer } from '@/components/layout/Footer';
import { GuideHeader } from '@/components/guide/GuideHeader';
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

const URL = 'https://calculatorhost.com/guide/foreign-tax-credit-overseas-stock-2026/';
const DATE_PUBLISHED = '2026-05-28';
const DATE_MODIFIED = '2026-05-28';

export const metadata: Metadata = {
  title: '외국납부세액공제 2026 해외주식·배당 환급 신청 | 5월 31일',
  description:
    '해외주식 배당·이자 미국 15% 원천징수 → 한국 종합소득세에서 환급? 외국납부세액공제 한도·계산·신청 절차·10년 이월·증빙 서류·해외근로소득·양도소득 제외 완벽 정리.',
  keywords: [
    '외국납부세액공제',
    '해외주식 배당 15%',
    '미국 배당 원천징수',
    '소득세법 57조',
    '해외근로소득 종합소득세',
    '환차익 신고',
    '종합소득세 외국세액',
    '10년 이월',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '외국납부세액공제 2026 해외주식·배당 환급 신청 | 5월 31일' }],
    title: '외국납부세액공제 2026 해외주식·배당 환급',
    description:
      '미국 주식 배당 1,000만 원 × 15% 원천징수 = 150만 환급? 한도·계산·신청 완벽 정리.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '외국납부세액공제 2026 — 해외주식 배당 환급 5월 신청',
    description: '미국·일본·싱가포르 배당세 먼저 나갔는데 한국에서도 내야 하나?',
  },
};

const FAQ_ITEMS = [
  {
    question: '해외주식 배당금에서 이미 미국 15% 떴는데, 한국 종합소득세에서도 세금을 내나요?',
    answer:
      '예, 한국 소득세 대상입니다. 하지만 이미 미국에서 낸 15% 세금을 "외국납부세액공제"로 한국 세액에서 차감할 수 있습니다(소득세법 §57). 한도 내에서 전액 공제 가능하고, 초과분은 10년 이월됩니다.',
  },
  {
    question: '외국납부세액공제 한도가 뭔가요? 1,000만 배당에 150만 모두 공제되나요?',
    answer:
      '한도 = min(외국납부세액, 한국 산출세액 × 외국소득/총소득) 입니다(소득세법 §57 ①). 배당 1,000만 × 15% = 150만 외국납부세액이 있고, 한국 산출세액이 500만이라면, 한도 = min(150만, 500만 × 50%) = 250만 → 150만 전액 공제됩니다.',
  },
  {
    question: '해외주식 양도차익(팔 때 이익)도 외국납부세액공제 대상인가요?',
    answer:
      '아닙니다. 해외주식 양도소득은 한국에서 분리과세(22% 자동 원천징수)되며, 외국납부세액공제 대상이 아닙니다(소득세법 §129). 다만 배당·이자·해외근로소득은 공제 대상입니다.',
  },
  {
    question: '해외에서 근무하면서 받은 급여에도 외국납부세액공제가 가능한가요?',
    answer:
      '예. 해외근로소득(expatriate)도 포함됩니다(소득세법 §57). 단, 한국에서 근무했던 기간 급여는 국내소득으로 분류되어 공제 범위가 달라집니다. 근무 지역·기간별 정확한 분류가 필요하므로 세무사 상담 권장.',
  },
  {
    question: '5월 31일까지 제출할 증빙 서류는 뭔가요?',
    answer:
      '외국 납세증명서(Tax Statement, 1099-DIV, 1099-INT 등) 또는 배당 지급 명세서를 제출해야 합니다(소득세법 §70). 미국의 경우 증권사 또는 국세청 웹사이트(IRS.gov)에서 1099-DIV 다운로드 가능합니다.',
  },
  {
    question: '외국납부세액공제 신청을 안 했으면 언제까지 소급 청구할 수 있나요?',
    answer:
      '경정청구는 신고한 날부터 5년 이내입니다(국세기본법 §48). 5월 31일 신고를 안 했다면 현재 신고 시 동시 신청 가능하고, 지난해 신고 시 누락했다면 올해 5월 경정청구로 5년 소급 가능합니다.',
  },
  {
    question: '한도를 초과한 150만 공제 못 받은 부분, 다음 연도에 쓸 수 있나요?',
    answer:
      '예. 소득세법 §57 ②에 따라 10년 이월됩니다. 올해 공제 못 받은 150만은 내년·모년·… 10년 안에 과세표준 구조 변화로 한도 여유가 생기면 적용할 수 있습니다.',
  },
  {
    question: '5월 31일까지 홈택스에서 신고할 때 외국납부세액 어디에 입력하나요?',
    answer:
      '종합소득세 신고서 → "외국납부세액공제" 항목을 찾아 외국 납부 세액 + 증빙 첨부. 홈택스 단계별 가이드(국세청 홈페이지)를 참고하거나, 세무사에 위임하면 자동 반영됩니다.',
  },
];

export default function ForeignTaxCreditOverseasStock2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '외국납부세액공제 2026' },
  ]);

  const faqLd = buildFaqPageJsonLd(FAQ_ITEMS);

  const articleLd = buildArticleJsonLd({
    headline: '외국납부세액공제 2026 — 해외주식·배당 환급 신청 완벽 가이드',
    description:
      '미국 주식 배당·이자·해외근로소득에서 이미 낸 세금을 한국 종소세에서 환급받는 방법.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: 'calculatorhost',
    authorUrl: 'https://calculatorhost.com/',
    keywords: [
      '외국납부세액공제',
      '해외주식 배당',
      '미국 15% 원천징수',
      '소득세법 57',
      '종합소득세',
      '환차익',
      '해외근로소득',
      '10년 이월',
    ],
  });

  const speakableLd = buildSpeakableJsonLd(['[data-speakable]']);

  const webPageLd = buildWebPageJsonLd({
    name: '외국납부세액공제 2026 해외주식·배당 환급 가이드',
    description:
      '미국 주식 배당·이자·해외근로소득에서 이미 낸 세금을 한국 종소세에서 환급받는 방법. 한도 공식 + 10년 이월 + 증빙 서류.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
  });

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
              <GuideHeader
                breadcrumbItems={[
                  { name: '홈', href: '/' },
                  { name: '가이드', href: '/guide/' },
                  { name: '외국납부세액공제' },
                ]}
                category="세금"
                readingMinutes={11}
                publishedDate="2026-05-28"
                title="외국납부세액공제 2026 해외주식·배당 환급 신청"
                subtitle="— 미국 15% 원천징수 한도·계산·증빙"
                lead={
                  <p data-speakable>
                    해외주식 배당·이자에서 이미 낸 외국 세금을 한국 종합소득세에서 환급받는 "외국납부세액공제"
                    완벽 가이드. 한도 계산·신청 절차·10년 이월·증빙 서류까지 5월 31일 신고 직전 필독.
                  </p>
                }
              />

              {/* Structured Summary */}
              <section className="card space-y-4 bg-bg-card border border-border-base p-6" data-speakable>
                <h2 className="text-xl font-semibold">⚡ 핵심 한눈에</h2>
                <table className="w-full text-sm border-collapse">
                  <tbody>
                    <tr className="border-b border-border-base">
                      <th scope="row" className="text-left py-2 px-2 font-semibold text-text-primary">
                        적용 대상
                      </th>
                      <td className="py-2 px-2 text-text-secondary">
                        배당·이자·해외근로소득 (양도소득 제외)
                      </td>
                    </tr>
                    <tr className="border-b border-border-base">
                      <th scope="row" className="text-left py-2 px-2 font-semibold text-text-primary">
                        공제 한도
                      </th>
                      <td className="py-2 px-2 text-text-secondary">
                        min(외국납부세액, 산출세액 × 외국소득/총소득)
                      </td>
                    </tr>
                    <tr className="border-b border-border-base">
                      <th scope="row" className="text-left py-2 px-2 font-semibold text-text-primary">
                        법적 근거
                      </th>
                      <td className="py-2 px-2 text-text-secondary">소득세법 §57, §57 ②</td>
                    </tr>
                    <tr>
                      <th scope="row" className="text-left py-2 px-2 font-semibold text-text-primary">
                        신고 기한
                      </th>
                      <td className="py-2 px-2 text-text-secondary">5월 31일 (증빙 서류 첨부)</td>
                    </tr>
                  </tbody>
                </table>
              </section>

              <AdSlot slot="guide-foreign-tax-credit-top" format="horizontal" />

              {/* 1. 외국납부세액공제란 */}
              <section className="space-y-4">
                <h2 className="text-2xl font-bold">
                  1. 외국납부세액공제란 무엇인가요?
                </h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  외국납부세액공제는 한국 거주자가 외국 소득(배당·이자·급여 등)에서 이미 낸 세금을 한국 종합소득세에서 차감해주는 제도입니다(소득세법 §57).
                  예를 들어, 미국 주식 배당금 1,000만 원에서 미국 현지 15% = 150만 원 세금이 먼저 떨어졌다면,
                  한국에서 종합소득세를 계산할 때 그 150만 원을 공제해주는 방식입니다.
                </p>
                <div className="card bg-primary-500/5 border border-primary-500/20 p-4">
                  <p className="text-sm font-semibold text-primary-700 dark:text-primary-300 mb-2">
                    💡 이중과세 방지 원칙
                  </p>
                  <p className="text-sm text-text-secondary">
                    같은 소득에 외국·한국에서 모두 세금을 물리는 "이중과세"를 피하기 위해,
                    국제조세 협정(조세조약)과 국내법(소득세법 §57)으로 공제를 허용합니다.
                  </p>
                </div>
              </section>

              {/* 2. 외국납부세액공제 대상 소득 */}
              <section className="space-y-4">
                <h2 className="text-2xl font-bold">
                  2. 어떤 소득이 외국납부세액공제 대상인가요?
                </h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  외국납부세액공제는 모든 해외 소득에 적용되지 않습니다. 소득 종류별로 다릅니다(소득세법 §57).
                </p>

                <div className="card space-y-4 border border-border-base p-4">
                  <div>
                    <h3 className="font-semibold text-text-primary mb-2">✅ 공제 대상 (O)</h3>
                    <ul className="space-y-2 text-sm text-text-secondary">
                      <li>
                        <strong>배당소득</strong> — 해외 주식 배당금 (미국 15%, 일본 20.42%, 중국 10% 등)
                      </li>
                      <li>
                        <strong>이자소득</strong> — 해외 은행 이자, 해외 채권 이자
                      </li>
                      <li>
                        <strong>해외근로소득</strong> — 해외 지점/자회사 급여, 파견·주재원 급여
                      </li>
                      <li>
                        <strong>기타 소득</strong> — 해외 저작권료, 강연료 등 일부
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-semibold text-text-primary mb-2">❌ 공제 제외 (X)</h3>
                    <ul className="space-y-2 text-sm text-text-secondary">
                      <li>
                        <strong>해외주식 양도소득</strong> — 주식 팔 때 이익. 한국에서 분리과세(22%)되므로
                        공제 대상 아님 (소득세법 §129)
                      </li>
                      <li>
                        <strong>해외부동산 양도소득</strong> — 해외 부동산 팔 때 이익 (분리과세)
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="card bg-danger-500/5 border border-danger-500/20 p-4">
                  <p className="text-sm font-semibold text-danger-700 dark:text-danger-300 mb-2">
                    ⚠️ 주의: 해외주식 양도소득은 공제 대상이 아님
                  </p>
                  <p className="text-sm text-text-secondary">
                    미국 주식을 1억 원에 샀다가 1억 3,000만 원에 팔아서 3,000만 원 이익이 났다면,
                    한국에서 3,000만 × 22% = 660만 원 자동 원천징수됩니다. 이미 미국에서 세금을 내지 않으므로
                    외국납부세액공제 대상이 아닙니다(소득세법 §94, §129).
                  </p>
                </div>
              </section>

              {/* 3. 외국납부세액공제 한도 계산 */}
              <section className="space-y-4">
                <h2 className="text-2xl font-bold">
                  3. 외국납부세액공제 한도는 어떻게 계산하나요?
                </h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  외국납부세액공제 한도는 실제 낸 외국 세금 전액이 아니라, 한국 산출세액에 비례하는 한도로 제한됩니다(소득세법 §57 ①).
                  공식은 다음과 같습니다:
                </p>

                <div className="card bg-primary-500/5 border border-primary-500/20 p-4 space-y-3">
                  <p className="text-sm font-mono font-semibold text-text-primary">
                    공제 한도 = min(외국납부세액, 산출세액 × 외국소득/총소득)
                  </p>
                  <p className="text-sm text-text-secondary">
                    즉, <strong>두 값 중 작은 값</strong>을 공제합니다.
                  </p>
                </div>

                <p className="text-text-secondary leading-relaxed">
                  이 공식의 의미는: 한국에서 낸 세금만큼만 환급해주고, 외국에서 낸 세금이 이보다 많으면 초과분은 환급 안 한다는 뜻입니다.
                  다만 초과분은 10년 이월됩니다.
                </p>
              </section>

              {/* 4. 실전 사례 계산 */}
              <section className="space-y-4">
                <h2 className="text-2xl font-bold">
                  4. 사례별 계산 3가지
                </h2>

                <div className="space-y-6">
                  {/* 사례 A */}
                  <div className="card border border-border-base p-4 space-y-3">
                    <h3 className="font-semibold text-text-primary">
                      사례 A: 해외배당 1,000만 원 (미국 15% 원천)
                    </h3>
                    <table className="w-full text-sm border-collapse">
                      <tbody>
                        <tr className="border-b border-border-base">
                          <th scope="row" className="text-left py-2 px-2 bg-bg-card font-semibold">
                            해외배당소득
                          </th>
                          <td className="py-2 px-2">1,000만 원</td>
                        </tr>
                        <tr className="border-b border-border-base">
                          <th scope="row" className="text-left py-2 px-2 bg-bg-card font-semibold">
                            미국 원천징수
                          </th>
                          <td className="py-2 px-2">150만 원 (15%)</td>
                        </tr>
                        <tr className="border-b border-border-base">
                          <th scope="row" className="text-left py-2 px-2 bg-bg-card font-semibold">
                            기타소득 없음
                          </th>
                          <td className="py-2 px-2">총소득 = 배당 1,000만 (근로소득 없음 가정)</td>
                        </tr>
                        <tr className="border-b border-border-base">
                          <th scope="row" className="text-left py-2 px-2 bg-bg-card font-semibold">
                            한국 산출세액 (배당특례세율)
                          </th>
                          <td className="py-2 px-2">1,000만 × 15.4% = 154만 원</td>
                        </tr>
                        <tr className="border-b border-border-base">
                          <th scope="row" className="text-left py-2 px-2 bg-bg-card font-semibold">
                            공제 한도 계산
                          </th>
                          <td className="py-2 px-2">
                            min(150만, 154만 × 1,000만/1,000만) = min(150만, 154만) = 150만 원
                          </td>
                        </tr>
                        <tr>
                          <th scope="row" className="text-left py-2 px-2 bg-bg-card font-semibold">
                            결과
                          </th>
                          <td className="py-2 px-2 font-semibold text-primary-600">
                            150만 원 전액 공제 → 환급 또는 추가 납부 없음
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  {/* 사례 B */}
                  <div className="card border border-border-base p-4 space-y-3">
                    <h3 className="font-semibold text-text-primary">
                      사례 B: 해외배당 5,000만 원 + 국내 근로소득 5,000만 원
                    </h3>
                    <table className="w-full text-sm border-collapse">
                      <tbody>
                        <tr className="border-b border-border-base">
                          <th scope="row" className="text-left py-2 px-2 bg-bg-card font-semibold">
                            국내 근로소득
                          </th>
                          <td className="py-2 px-2">5,000만 원</td>
                        </tr>
                        <tr className="border-b border-border-base">
                          <th scope="row" className="text-left py-2 px-2 bg-bg-card font-semibold">
                            해외배당소득
                          </th>
                          <td className="py-2 px-2">5,000만 원</td>
                        </tr>
                        <tr className="border-b border-border-base">
                          <th scope="row" className="text-left py-2 px-2 bg-bg-card font-semibold">
                            미국 원천징수
                          </th>
                          <td className="py-2 px-2">750만 원 (15%)</td>
                        </tr>
                        <tr className="border-b border-border-base">
                          <th scope="row" className="text-left py-2 px-2 bg-bg-card font-semibold">
                            근로소득공제 후 과세표준
                          </th>
                          <td className="py-2 px-2">
                            근로소득 과세표준 약 4,000만 + 배당 5,000만 = 9,000만 원
                          </td>
                        </tr>
                        <tr className="border-b border-border-base">
                          <th scope="row" className="text-left py-2 px-2 bg-bg-card font-semibold">
                            한국 누진세율 적용
                          </th>
                          <td className="py-2 px-2">
                            9,000만 × 15% - 누진공제 126만 = 세액 약 1,224만 원
                          </td>
                        </tr>
                        <tr className="border-b border-border-base">
                          <th scope="row" className="text-left py-2 px-2 bg-bg-card font-semibold">
                            공제 한도
                          </th>
                          <td className="py-2 px-2">
                            min(750만, 1,224만 × 5,000만/9,000만) = min(750만, 679만) = 679만 원
                          </td>
                        </tr>
                        <tr className="border-b border-border-base">
                          <th scope="row" className="text-left py-2 px-2 bg-bg-card font-semibold">
                            이월액
                          </th>
                          <td className="py-2 px-2">750만 - 679만 = 71만 원 (10년 이월)</td>
                        </tr>
                        <tr>
                          <th scope="row" className="text-left py-2 px-2 bg-bg-card font-semibold">
                            결과
                          </th>
                          <td className="py-2 px-2 font-semibold text-primary-600">
                            679만 공제, 71만 초과분은 내년 이후 10년 내 사용 가능
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  {/* 사례 C */}
                  <div className="card border border-border-base p-4 space-y-3">
                    <h3 className="font-semibold text-text-primary">
                      사례 C: 해외주식 양도차익 3,000만 원 (공제 제외)
                    </h3>
                    <table className="w-full text-sm border-collapse">
                      <tbody>
                        <tr className="border-b border-border-base">
                          <th scope="row" className="text-left py-2 px-2 bg-bg-card font-semibold">
                            취득가
                          </th>
                          <td className="py-2 px-2">1억 원</td>
                        </tr>
                        <tr className="border-b border-border-base">
                          <th scope="row" className="text-left py-2 px-2 bg-bg-card font-semibold">
                            양도가
                          </th>
                          <td className="py-2 px-2">1억 3,000만 원</td>
                        </tr>
                        <tr className="border-b border-border-base">
                          <th scope="row" className="text-left py-2 px-2 bg-bg-card font-semibold">
                            양도차익
                          </th>
                          <td className="py-2 px-2">3,000만 원</td>
                        </tr>
                        <tr className="border-b border-border-base">
                          <th scope="row" className="text-left py-2 px-2 bg-bg-card font-semibold">
                            한국 분리과세
                          </th>
                          <td className="py-2 px-2">3,000만 × 22% = 660만 원 자동 원천징수</td>
                        </tr>
                        <tr className="border-b border-border-base">
                          <th scope="row" className="text-left py-2 px-2 bg-bg-card font-semibold">
                            외국에서 낸 세금
                          </th>
                          <td className="py-2 px-2">0원 (양도소득에 대해 외국 세금 없음)</td>
                        </tr>
                        <tr>
                          <th scope="row" className="text-left py-2 px-2 bg-bg-card font-semibold">
                            결과
                          </th>
                          <td className="py-2 px-2 font-semibold text-danger-600">
                            외국납부세액공제 불가 — 분리과세만 적용
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </section>

              <AdSlot slot="guide-foreign-tax-credit-mid" format="rectangle" />

              {/* 5. 10년 이월 */}
              <section className="space-y-4">
                <h2 className="text-2xl font-bold">
                  5. 초과분은 10년 이월됩니다
                </h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  한도를 초과하는 외국납부세액은 버려지지 않습니다. 소득세법 §57 ②에 따라 10년 동안 이월되어,
                  다음 연도 이후 세액에서 사용할 수 있습니다.
                </p>

                <div className="card bg-highlight-500/5 border border-highlight-500/20 p-4">
                  <p className="text-sm font-semibold text-highlight-700 dark:text-highlight-300 mb-2">
                    💼 이월 사례
                  </p>
                  <p className="text-sm text-text-secondary mb-3">
                    올해 외국배당 750만 × 15% = 112.5만 외국납부세액이 있지만, 한도 산출로 80만만 공제된다면,
                    32.5만은 내년부터 10년간 이월됩니다. 내년 종소세 산출 시 초과 한도가 생기면 그 32.5만을 적용할 수 있습니다.
                  </p>
                  <p className="text-sm text-text-secondary">
                    <strong>만료 기한:</strong> 올해 이월분은 11년 뒤(2037년 5월)까지 사용 가능. 그 이후는 소멸.
                  </p>
                </div>
              </section>

              {/* 6. 증빙 서류 */}
              <section className="space-y-4">
                <h2 className="text-2xl font-bold">
                  6. 5월 31일 신고 시 필요한 증빙 서류
                </h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  외국납부세액공제를 신청하려면 반드시 외국 납세증명서를 첨부해야 합니다(소득세법 §70).
                  증권사·은행에서 발급받아 홈택스에 제출하면 됩니다.
                </p>

                <div className="space-y-3">
                  <div className="card border border-border-base p-4">
                    <h3 className="font-semibold text-text-primary mb-2">미국 주식 배당 (가장 흔한 경우)</h3>
                    <ul className="space-y-2 text-sm text-text-secondary">
                      <li>
                        <strong>1099-DIV</strong> — 미국 국세청(IRS)에서 발급. 배당금·원천징수세 기록.
                        증권사(Fidelity, Charles Schwab 등) 웹사이트에서 다운로드 가능.
                      </li>
                      <li>
                        <strong>배당 지급 명세서</strong> — 증권사에서 직접 제공하는 보고서 (PDF 또는 이메일)
                      </li>
                      <li>
                        <strong>한국 세무서 제출 시</strong> — 원본 또는 번역본(공식 영문 번역) 필요.
                        영문 원본만으로도 대부분 수용되나, 세무서에 미리 문의 권장.
                      </li>
                    </ul>
                  </div>

                  <div className="card border border-border-base p-4">
                    <h3 className="font-semibold text-text-primary mb-2">해외 은행 이자</h3>
                    <ul className="space-y-2 text-sm text-text-secondary">
                      <li>
                        <strong>Interest Statement</strong> — 해외 은행에서 발급 (USD, JPY 등)
                      </li>
                      <li>
                        <strong>이자 지급 기록</strong> — 원천징수 세금 명시된 명세서
                      </li>
                    </ul>
                  </div>

                  <div className="card border border-border-base p-4">
                    <h3 className="font-semibold text-text-primary mb-2">해외 근로소득</h3>
                    <ul className="space-y-2 text-sm text-text-secondary">
                      <li>
                        <strong>급여명세서 (Payslip)</strong> — 해외 고용주 발급. 급여·원천징수세액 명시
                      </li>
                      <li>
                        <strong>W-2 (미국)</strong> — 미국 고용주가 1월 말까지 발급
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="card bg-primary-500/5 border border-primary-500/20 p-4">
                  <p className="text-sm font-semibold text-primary-700 dark:text-primary-300 mb-2">
                    📋 홈택스 제출 방법 (5월 31일까지)
                  </p>
                  <ol className="text-sm text-text-secondary space-y-1 list-decimal list-inside">
                    <li>국세청 홈택스 로그인 → 종합소득세 신고 시작</li>
                    <li>"외국납부세액공제" 항목 찾기 (신고서 Page 2~3)</li>
                    <li>외국 납부 세액 + 국가명 입력</li>
                    <li>증빙 서류(1099-DIV 등) 이미지/PDF 첨부</li>
                    <li>신고서 최종 제출</li>
                  </ol>
                </div>
              </section>

              {/* 7. 자주 묻는 질문 */}
              <section className="space-y-4">
                <h2 className="text-2xl font-bold">7. 자주 묻는 질문</h2>
                <FaqSection items={FAQ_ITEMS} />
              </section>

              {/* 8. 함정 5가지 */}
              <section className="space-y-4">
                <h2 className="text-2xl font-bold">
                  8. 실수하기 쉬운 함정 5가지
                </h2>

                <div className="space-y-3">
                  <div className="card border-l-2 border-l-danger-500 bg-danger-500/5 p-4">
                    <h3 className="font-semibold text-danger-700 dark:text-danger-300 mb-2">
                      함정 1: 양도소득도 공제된다고 생각
                    </h3>
                    <p className="text-sm text-text-secondary">
                      <strong>틀림.</strong> 해외주식 양도차익은 한국에서 분리과세(22%)되며, 외국납부세액공제 대상이 아닙니다.
                      배당·이자·근로소득만 공제됩니다.
                    </p>
                  </div>

                  <div className="card border-l-2 border-l-danger-500 bg-danger-500/5 p-4">
                    <h3 className="font-semibold text-danger-700 dark:text-danger-300 mb-2">
                      함정 2: 외국 세금 전액이 공제된다고 생각
                    </h3>
                    <p className="text-sm text-text-secondary">
                      <strong>틀림.</strong> 공제 한도가 적용됩니다. 외국에서 낸 세금이 한국 산출세액 비례분보다 크면,
                      초과분은 공제되지 않습니다(다만 10년 이월).
                    </p>
                  </div>

                  <div className="card border-l-2 border-l-danger-500 bg-danger-500/5 p-4">
                    <h3 className="font-semibold text-danger-700 dark:text-danger-300 mb-2">
                      함정 3: 증빙 서류 없이 신고 후 나중에 제출
                    </h3>
                    <p className="text-sm text-text-secondary">
                      <strong>위험.</strong> 외국납부세액공제는 5월 31일 신고서 제출 시점에 증빙을 함께 제출해야 인정됩니다.
                      나중에 제출하면 신고불성실 가산세(10~20%)가 부과될 수 있습니다.
                    </p>
                  </div>

                  <div className="card border-l-2 border-l-danger-500 bg-danger-500/5 p-4">
                    <h3 className="font-semibold text-danger-700 dark:text-danger-300 mb-2">
                      함정 4: 이월액을 다음 연도 신고에서 자동 적용 (X)
                    </h3>
                    <p className="text-sm text-text-secondary">
                      <strong>수동 입력 필요.</strong> 10년 이월분도 매년 신고할 때 직접 입력해야 합니다.
                      자동으로 적용되지 않으므로, 노트나 엑셀에 기록해두고 다음 해 신고 시 입력하세요.
                    </p>
                  </div>

                  <div className="card border-l-2 border-l-danger-500 bg-danger-500/5 p-4">
                    <h3 className="font-semibold text-danger-700 dark:text-danger-300 mb-2">
                      함정 5: 환율 변동으로 인한 손익을 세액에 포함 (조심)
                    </h3>
                    <p className="text-sm text-text-secondary">
                      <strong>주의.</strong> 외국 소득을 한국 원화로 신고할 때 환율을 적용합니다.
                      환율 변동으로 손익이 생길 수 있으니, 신고일 기준 환율을 일관되게 사용하세요
                      (일반적으로 신고일 또는 소득 발생일 환율).
                    </p>
                  </div>
                </div>
              </section>

              {/* 9. 관련 계산기·가이드 */}
              <section className="space-y-4">
                <h2 className="text-2xl font-bold">9. 관련 계산기 & 가이드</h2>
                <div className="grid gap-3 md:grid-cols-2">
                  <Link
                    href="/calculator/freelancer-tax/"
                    className="card card-hover text-sm text-primary-600 dark:text-primary-500 underline"
                  >
                    → 프리랜서 종합소득세 계산기
                  </Link>
                  <Link
                    href="/guide/financial-income-comprehensive-vs-separate-taxation/"
                    className="card card-hover text-sm text-primary-600 dark:text-primary-500 underline"
                  >
                    → 금융소득 종합·분리과세 비교 가이드
                  </Link>
                  <Link
                    href="/guide/may-comprehensive-income-tax/"
                    className="card card-hover text-sm text-primary-600 dark:text-primary-500 underline"
                  >
                    → 5월 종합소득세 신고 완벽 가이드
                  </Link>
                  <Link
                    href="/guide/comprehensive-income-tax-refund-timing-2026/"
                    className="card card-hover text-sm text-primary-600 dark:text-primary-500 underline"
                  >
                    → 종소세 환급 시기 및 추적
                  </Link>
                  <Link
                    href="/guide/income-deduction-vs-tax-credit-2026/"
                    className="card card-hover text-sm text-primary-600 dark:text-primary-500 underline"
                  >
                    → 소득공제 vs 세액공제 차이
                  </Link>
                  <Link
                    href="/guide/income-tax-correction-claim-5-year-2026/"
                    className="card card-hover text-sm text-primary-600 dark:text-primary-500 underline"
                  >
                    → 경정청구로 5년 내 환급받기
                  </Link>
                </div>
              </section>

              {/* 면책 및 AI 보조 표기 */}
              <section className="card bg-bg-card border border-border-base p-4 space-y-2 text-caption text-text-tertiary">
                <p>
                  <strong>업데이트:</strong> 2026년 5월 28일 작성. 본 가이드는 소득세법 §57, §94, §129 및 국세청
                  공식 지침을 기반으로 작성되었습니다.
                </p>
                <p>
                  <strong>AI 보조 작성:</strong> 본 가이드는 Claude AI의 보조를 받아 작성되었으며, 발행 전 운영자 검수를
                  거쳤습니다.
                </p>
                <p>
                  <strong>개인 상황에 따라 다릅니다.</strong> 본 가이드는 일반 정보이며, 실제 세액은 개인·가구의 소득 구성,
                  거주지, 조세조약 등에 따라 달라질 수 있습니다. 정확한 신고는 세무사·국세청 상담을 권장합니다.
                </p>
              </section>

              {/* 공유 버튼 */}
              <ShareButtons
                title="외국납부세액공제 2026 해외주식·배당 환급 신청"
                url={URL}
                description="미국 주식 배당에서 이미 낸 15% 세금을 한국 종합소득세에서 환급받는 방법. 한도 계산·신청 절차·10년 이월·증빙 서류 완벽 정리."
              />
            </article>
          </main>
        </div>
        <Footer />
      </div>
    </>
  );
}
