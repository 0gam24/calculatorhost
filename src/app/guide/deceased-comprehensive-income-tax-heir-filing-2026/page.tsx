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

const URL = 'https://calculatorhost.com/guide/deceased-comprehensive-income-tax-heir-filing-2026/';
const DATE_PUBLISHED = '2026-05-28';
const DATE_MODIFIED = '2026-05-28';

export const metadata: Metadata = {
  title: '사망자 종합소득세 상속인 신고 2026 | 6개월 기한·소득세법 §74',
  description:
    '사망한 부모·배우자 소득, 상속인이 신고해야 할까? 사망자 종합소득세 신고 의무·기한(사망일+6개월)·신고 대상 소득·상속인 신고 규칙·세액 계산·5월 31일 마감 연장·신고 안 하면 가산세 20% 완벽 정리.',
  keywords: [
    '사망자 종합소득세',
    '상속인 신고 의무',
    '사망 6개월 신고 기한',
    '소득세법 74',
    '상속인 신고',
    '사망 연도 소득',
    '상속세 종합소득세 차이',
    '사망자 세무신고',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '사망자 종합소득세 상속인 신고 2026 | 6개월 기한·소득세법 §74' }],
    title: '사망자 종합소득세 상속인 신고 2026 | 6개월 기한',
    description: '사망자 소득은 상속인 전원이 신고 의무. 기한은 사망일+6개월. 상속세와 다른 종합소득세 신고 정리.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '사망자 종합소득세 상속인 신고 2026',
    description: '사망 후 소득신고는 누가? 기한은? 가산세는?',
  },
};

const FAQ_ITEMS = [
  {
    question: '사망자가 남긴 소득도 세금을 내야 하나요?',
    answer:
      '예, 내야 합니다(소득세법 §74). 사망일 이전까지의 소득(근로소득·사업소득·이자배당·임대소득 등)은 사망 연도의 종합소득세 신고 대상입니다. 상속재산과 별도로, 사망 연도의 "소득"에 대해 신고·납부 의무가 발생합니다.',
  },
  {
    question: '사망자 종합소득세를 누가 신고하나요?',
    answer:
      '상속인 전원이 신고 의무입니다(소득세법 §74 ①). 자녀 3명이면 3명 모두 신고해야 하거나, 1명을 대표로 신고하고 다른 상속인은 신고 의무를 면제받을 수 있습니다. 다만 1명만 신고하는 경우는 사전에 합의해야 분쟁이 없습니다.',
  },
  {
    question: '신고 기한이 언제인가요?',
    answer:
      '사망일로부터 6개월 이내입니다(소득세법 §74 ①). 예: 2026년 1월 사망 → 7월 31일 신고 기한, 2026년 3월 사망 → 9월 30일 신고 기한. 단, 5월 31일(연말정산 확정신고 마감)이 더 빠르면 5월 31일이 기한입니다.',
  },
  {
    question: '사망 연도 1월부터의 모든 소득을 신고하나요?',
    answer:
      '예, 사망 연도 1월 1일부터 사망일까지의 모든 소득입니다(소득세법 §14 ①). 근로소득·사업소득·이자배당·임대소득·기타소득 등 모든 종류를 합산합니다. 사망일 이후의 소득은 제외됩니다.',
  },
  {
    question: '사망자 소득 신고와 상속세는 다른 건가요?',
    answer:
      '네, 완전히 다릅니다(소득세법 §74 vs 상증법). 종합소득세는 "사망 연도 소득"에 대한 세금이고, 상속세는 "상속받은 재산"에 대한 세금입니다. 순서로는 종합소득세 신고(6개월) → 상속세 신고(10개월)입니다.',
  },
  {
    question: '신고하지 않으면 어떻게 되나요?',
    answer:
      '무신고가산세 20% + 납부 지연가산세 일 0.022%가 부과됩니다(국세기본법 §47의2·§47의3). 또한 신고하지 않으면 환급받을 금액(있으면)도 5년 후 소멸합니다. 가산세와 환급 손실을 고려하면 반드시 신고하는 것이 유리합니다.',
  },
  {
    question: '사망자가 개인사업자였다면 어떻게 신고하나요?',
    answer:
      '사업소득을 신고합니다(소득세법 §74 ①). 사망일까지의 매출에서 경비를 차감한 소득금액을 신고합니다. 경비율(단순경비율·기준경비율)을 적용하거나 실경비를 입증합니다. 근로소득이 함께 있으면 합산하여 누진세율을 적용합니다.',
  },
  {
    question: '혼합 신고(상속인 1명 + 다른 상속인 면제)는 어떻게 하나요?',
    answer:
      '상속인 중 1명이 대표로 신고하고, 나머지 상속인은 신고 의무 면제 신청을 할 수 있습니다(소득세법 §73 ③). 다만 면제받은 상속인도 신고 내용에 대해 법적 책임이 있을 수 있으므로, 신고 전 합의하고 기록해두는 것이 중요합니다.',
  },
  {
    question: '사망자 소득에서 공제(부양가족·신용카드 등)를 받을 수 있나요?',
    answer:
      '제한적으로 가능합니다(소득세법 §14). 사망 연도에 실제로 발생한 공제(신용카드·의료비·기부금·월세 등)는 인정되나, 인적공제(부양가족)는 사망자 기준 1월 1일 현재 기준입니다. 자세한 공제는 홈택스 또는 세무사 상담이 필요합니다.',
  },
];

export default function DeceasedComprehensiveIncomeTaxHeirFilingPage() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '사망자 종합소득세 상속인 신고 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '사망자 종합소득세 상속인 신고 2026 완벽 가이드',
    description:
      '사망자 소득 신고 의무·신고 주체(상속인 전원)·기한(사망일+6개월)·신고 대상 소득·세액 계산·상속세와의 차이·신고 안 하면 가산세 20%까지 완벽 정리. 소득세법 §74.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['사망자 종합소득세', '상속인 신고', '소득세법 74', '6개월 기한', '신고 의무'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '사망자 종합소득세 상속인 신고 2026 — 6개월 기한·신고 의무',
    description:
      '5월 31일 신고 마감! 사망자 소득은 누가? 언제까지? 상속인 신고 의무·기한(사망일+6개월)·신고 대상·상속세와의 차이·무신고 가산세 20%·신고 체크리스트.',
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
              <GuideHeader
                breadcrumbItems={[
                  { name: '홈', href: '/' },
                  { name: '가이드', href: '/guide/' },
                  { name: '사망자 종합소득세 상속인 신고' },
                ]}
                category="세금"
                readingMinutes={8}
                publishedDate="2026-05-28"
                title="사망자 종합소득세 상속인 신고 2026"
                subtitle="— 6개월 기한·신고 의무·상속세와의 차이"
                lead={
                  <p data-speakable>
                    부모님이나 배우자가 작년(또는 올해 사망)에 소득이 있었다면 세금 신고가 필요합니다.
                    <strong> 사망하는 순간 소득 신고 의무가 끝나지 않습니다</strong>. 사망 연도의 소득은
                    <strong> 상속인 전원이 6개월 이내에 종합소득세 신고</strong>해야 합니다. 이 가이드에서는 사망자 소득 신고의 필수 요소를 정리합니다.
                  </p>
                }
              />

              <AdSlot slot="guide-deceased-income-tax-top" format="horizontal" />

              {/* 핵심 요약 */}
              <section aria-label="핵심 요약" className="card border-l-4 border-l-primary-500">
                <h2 className="mb-4 text-2xl font-bold text-primary-700 dark:text-primary-300">⚡ 핵심 정리</h2>
                <div className="mb-4 overflow-x-auto">
                  <table className="w-full text-sm" data-speakable>
                    <caption className="text-left text-xs font-semibold text-text-secondary mb-2">
                      사망자 종합소득세 신고 요약
                    </caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th className="px-3 py-2 text-left" scope="col">
                          항목
                        </th>
                        <th className="px-3 py-2 text-left" scope="col">
                          내용
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="px-3 py-2 font-semibold">신고 의무자</td>
                        <td className="px-3 py-2">상속인 전원 (자녀, 배우자, 부모 등)</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="px-3 py-2 font-semibold">신고 대상 소득</td>
                        <td className="px-3 py-2">사망일 전까지의 근로·사업·이자배당·임대소득 등</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="px-3 py-2 font-semibold">신고 기한</td>
                        <td className="px-3 py-2">사망일로부터 6개월 이내 (또는 5월 31일 중 늦은 날)</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="px-3 py-2 font-semibold">신고 장소</td>
                        <td className="px-3 py-2">홈택스 또는 관할 세무서</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="px-3 py-2 font-semibold">상속세와 관계</td>
                        <td className="px-3 py-2">독립적 신고 (상속세 이전에 종합소득세 신고)</td>
                      </tr>
                      <tr>
                        <td className="px-3 py-2 font-semibold">미신고 시</td>
                        <td className="px-3 py-2">무신고가산세 20% + 지연가산세</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="rounded-lg bg-primary-500/10 p-4 text-sm text-primary-700 dark:text-primary-300">
                  <p className="font-semibold">TL;DR</p>
                  <ul className="mt-2 list-inside list-disc space-y-1">
                    <li>
                      <strong>사망자도 소득세를 냅니다:</strong> 소득세법 §74에 따라 의무
                    </li>
                    <li>
                      <strong>상속인 전원이 신고:</strong> 1명 신고 또는 전원 신고 가능
                    </li>
                    <li>
                      <strong>기한은 6개월:</strong> 사망일+6개월 또는 5월 31일 중 늦은 날
                    </li>
                    <li>
                      <strong>상속세와 별개:</strong> 종합소득세(소득) vs 상속세(재산) 구분 필수
                    </li>
                    <li>
                      <strong>신고 안 하면 가산세:</strong> 무신고가산세 20% 부과
                    </li>
                  </ul>
                </div>
              </section>

              {/* 1. 사망자 종합소득세, 왜 신고해야 할까? */}
              <section className="space-y-4">
                <h2 className="text-2xl font-bold">1. Q. 사망한 사람도 세금을 내야 하나요?</h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  네, 네야 합니다. 소득세는 "소득 발생 시점"을 기준으로 계산됩니다(소득세법 §14 ①). 사망자가 사망일 이전에 번 모든 소득
                  (근로소득, 사업소득, 이자·배당소득, 임대소득, 기타소득)에 대해 세금이 발생합니다. 사망하는 것이 세금 납부 의무를
                  소멸시키지는 않습니다.
                </p>

                <div className="rounded-lg bg-bg-card p-4">
                  <p className="mb-3 font-semibold text-text-primary">사망자 종합소득세의 법적 근거</p>
                  <div className="space-y-3 text-sm text-text-secondary">
                    <div>
                      <p className="font-semibold text-text-primary mb-1">소득세법 §74 ① — 사망자 신고</p>
                      <p className="italic text-text-tertiary">
                        "사망자의 소득에 대해서는 상속인이 사망한 날이 속하는 과세연도의 종합소득세 확정신고를 하여야 한다"
                      </p>
                    </div>
                    <hr className="border-border-base" />
                    <div>
                      <p className="font-semibold text-text-primary mb-1">신고 의무 발생 조건</p>
                      <p className="italic text-text-tertiary">
                        사망일이 속한 연도의 1월 1일 ~ 사망일까지의 모든 소득 = 신고 대상
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border-l-4 border-l-primary-500 bg-primary-500/10 p-4 text-sm text-text-secondary">
                  <p className="font-semibold text-text-primary">💡 예: 2026년 2월 15일 사망</p>
                  <p className="mt-2">
                    2026년 1월 1일 ~ 2월 15일까지 발생한 근로소득·이자·배당 등 모든 소득에 대해 2026년 종합소득세 신고 의무가 발생합니다.
                    2월 15일 이후의 소득은 제외됩니다.
                  </p>
                </div>

                <div className="rounded-lg bg-danger-500/10 border-l-4 border-l-danger-500 p-4 text-sm text-text-secondary">
                  <p className="font-semibold text-danger-700 dark:text-danger-300">⚠️ 다만: 상속세와는 다릅니다</p>
                  <p className="mt-2">
                    "사망자 소득세"와 "상속세"는 완전히 다릅니다. 종합소득세는 사망 연도의 "소득"에 대한 세금이고, 상속세는 상속받은
                    "재산"에 대한 세금입니다. 신고 기한도 다릅니다 (종합소득세 6개월 vs 상속세 10개월).
                  </p>
                </div>
              </section>

              {/* 2. 신고 의무자: 상속인 전원 */}
              <section className="space-y-4">
                <h2 className="text-2xl font-bold">2. Q. 누가 사망자 소득을 신고하나요?</h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  상속인 전원이 신고 의무가 있습니다(소득세법 §74 ①). 자녀 3명이면 3명 모두에게 신고 의무가 있으나, 실제로는 1명을
                  대표로 신고하거나 여러 상속인이 함께 신고할 수 있습니다.
                </p>

                <div className="rounded-lg bg-bg-card p-4 text-sm text-text-secondary">
                  <p className="mb-3 font-semibold text-text-primary">신고 의무자 판정</p>
                  <div className="space-y-2">
                    <div className="mb-3">
                      <p className="font-semibold text-text-primary mb-1">필수 신고 의무자</p>
                      <p className="italic text-text-tertiary">배우자, 직계비속(자녀, 손주), 직계존속(부모, 조부모), 형제자매 등 상속인</p>
                    </div>
                    <div>
                      <p className="font-semibold text-text-primary mb-1">신고 방법 선택권</p>
                      <p className="italic text-text-tertiary">
                        ① 1명이 대표 신고 (다른 상속인은 신고 면제 신청) / ② 각 상속인이 별도 신고 / ③ 여러 상속인이 공동 신고
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg bg-bg-raised p-4 text-sm text-text-secondary">
                  <p className="font-semibold text-text-primary mb-2">신고 시나리오 3가지</p>
                  <div className="space-y-2">
                    <div className="rounded-lg bg-bg-card p-3">
                      <p className="font-semibold text-text-primary">시나리오 A: 자녀 2명, 1명 대표 신고</p>
                      <ul className="mt-2 list-inside list-disc space-y-1">
                        <li>장남이 대표로 신고</li>
                        <li>차남은 신고 면제 신청서 제출</li>
                        <li className="font-semibold text-primary-600">1회 신고로 종료</li>
                      </ul>
                    </div>

                    <div className="rounded-lg bg-bg-card p-3">
                      <p className="font-semibold text-text-primary">시나리오 B: 자녀 2명, 각자 신고</p>
                      <ul className="mt-2 list-inside list-disc space-y-1">
                        <li>장남이 신고</li>
                        <li>차남도 독립적으로 신고</li>
                        <li className="text-xs italic text-text-tertiary">→ 중복 신고 우려 (국세청 조정)</li>
                      </ul>
                    </div>

                    <div className="rounded-lg bg-bg-card p-3">
                      <p className="font-semibold text-text-primary">시나리오 C: 배우자 + 자녀 2명</p>
                      <ul className="mt-2 list-inside list-disc space-y-1">
                        <li>배우자가 대표 신고</li>
                        <li>자녀 2명은 신고 면제 신청</li>
                        <li className="text-xs italic text-text-tertiary">→ 배우자 최우선 순위</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border-l-4 border-l-danger-500 bg-danger-500/10 p-4 text-sm text-text-secondary">
                  <p className="font-semibold text-danger-700 dark:text-danger-300">⚠️ 주의: 중복 신고 시 국세청 조정</p>
                  <p className="mt-2">
                    같은 소득을 여러 상속인이 각각 신고하면 국세청이 조정하여 1건만 인정합니다. 다만 세액 중복 납부 사태를 피하려면
                    신고 전에 상속인 간 합의(대표 신고자 지정)를 문서화하는 것이 좋습니다.
                  </p>
                </div>
              </section>

              {/* 3. 신고 기한: 사망일 + 6개월 */}
              <section className="space-y-4">
                <h2 className="text-2xl font-bold">3. Q. 신고 기한은 언제인가요?</h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  신고 기한은 사망일로부터 6개월 이내입니다(소득세법 §74 ①). 단, 5월 31일 확정신고 마감이 더 앞서면 5월 31일이 기한이
                  됩니다.
                </p>

                <div className="rounded-lg bg-bg-raised p-4 text-sm text-text-secondary">
                  <p className="font-semibold text-text-primary mb-3">신고 기한 계산 방식</p>
                  <div className="space-y-2">
                    <div className="rounded-lg bg-bg-card p-3">
                      <p className="font-semibold text-text-primary">예시 1: 2026년 1월 사망</p>
                      <ul className="mt-2 list-inside list-disc space-y-1">
                        <li>사망일 + 6개월 = 7월 말</li>
                        <li>하지만 5월 31일 확정신고가 더 앞음</li>
                        <li className="font-semibold text-danger-600">→ 신고 기한: 2026년 5월 31일(금)</li>
                      </ul>
                    </div>

                    <div className="rounded-lg bg-bg-card p-3">
                      <p className="font-semibold text-text-primary">예시 2: 2026년 3월 사망</p>
                      <ul className="mt-2 list-inside list-disc space-y-1">
                        <li>사망일 + 6개월 = 9월 30일</li>
                        <li>5월 31일은 이미 지남</li>
                        <li className="font-semibold text-primary-600">→ 신고 기한: 2026년 9월 30일(수)</li>
                      </ul>
                    </div>

                    <div className="rounded-lg bg-bg-card p-3">
                      <p className="font-semibold text-text-primary">예시 3: 2026년 11월 사망</p>
                      <ul className="mt-2 list-inside list-disc space-y-1">
                        <li>사망일 + 6개월 = 2027년 5월</li>
                        <li>5월 31일(2027년)이 6개월보다 앞</li>
                        <li className="font-semibold text-primary-600">→ 신고 기한: 2027년 5월 31일</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border-l-4 border-l-highlight-500 bg-highlight-500/5 p-4 text-sm text-text-secondary">
                  <p className="font-semibold text-text-primary">💡 5월 31일 원칙</p>
                  <p className="mt-2">
                    한국 종합소득세 확정신고 마감은 매년 5월 31일입니다. 사망자 신고 기한도 이 원칙을 따르므로, 사망일이 1월 초라면
                    신고 기한이 5월 31일로 단축됩니다. 신고 여유 시간이 없으니 4월부터 준비하세요.
                  </p>
                </div>
              </section>

              <AdSlot slot="guide-deceased-income-tax-mid" format="rectangle" />

              {/* 4. 신고 대상: 사망일 전까지의 모든 소득 */}
              <section className="space-y-4">
                <h2 className="text-2xl font-bold">4. Q. 사망 연도의 어떤 소득을 신고하나요?</h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  사망한 해의 1월 1일부터 사망일까지 발생한 모든 소득입니다(소득세법 §14). 근로소득, 사업소득, 이자·배당소득, 임대소득,
                  기타소득 등 소득 종류를 가리지 않고 합산하여 종합과세합니다.
                </p>

                <div className="overflow-x-auto rounded-lg">
                  <table className="w-full text-sm border-collapse">
                    <caption className="text-left text-xs font-semibold text-text-secondary mb-2">
                      사망자 신고 대상 소득 종류 (소득세법 §14)
                    </caption>
                    <thead>
                      <tr className="border-b border-border-base bg-primary-500/10">
                        <th className="px-3 py-2 text-left text-text-primary" scope="col">
                          소득 종류
                        </th>
                        <th className="px-3 py-2 text-left text-text-primary" scope="col">
                          신고 포함 여부
                        </th>
                        <th className="px-3 py-2 text-left text-text-primary text-xs" scope="col">
                          주의사항
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="px-3 py-2 font-semibold">근로소득</td>
                        <td className="px-3 py-2">포함 (사망일까지)</td>
                        <td className="px-3 py-2 text-xs">월급, 상여, 수당</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="px-3 py-2 font-semibold">사업소득</td>
                        <td className="px-3 py-2">포함 (폐업까지)</td>
                        <td className="px-3 py-2 text-xs">경비율 또는 실경비 적용</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="px-3 py-2 font-semibold">이자·배당</td>
                        <td className="px-3 py-2">포함 (발생 기준)</td>
                        <td className="px-3 py-2 text-xs">금리 소득, 주식 배당</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="px-3 py-2 font-semibold">임대소득</td>
                        <td className="px-3 py-2">포함</td>
                        <td className="px-3 py-2 text-xs">월세, 보증금 이자</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="px-3 py-2 font-semibold">기타소득</td>
                        <td className="px-3 py-2">포함 (300만 초과 시)</td>
                        <td className="px-3 py-2 text-xs">강의료, 상금, 원고료</td>
                      </tr>
                      <tr>
                        <td className="px-3 py-2 font-semibold">퇴직소득</td>
                        <td className="px-3 py-2">분리 신고</td>
                        <td className="px-3 py-2 text-xs">퇴직금은 별도 신고</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="rounded-lg bg-bg-card p-4 text-sm text-text-secondary">
                  <p className="mb-3 font-semibold text-text-primary">사망자 소득이 있는 실제 사례</p>
                  <div className="space-y-2">
                    <div className="mb-3 rounded-lg bg-bg-raised p-3">
                      <p className="font-semibold text-text-primary">부친이 2026년 2월 15일 사망</p>
                      <ul className="mt-2 list-inside list-disc space-y-1">
                        <li>직장 월급: 1월~2월 중순 약 300만</li>
                        <li>정기예금 이자: 2월 지급분 약 50만</li>
                        <li>임대소득(월세): 2월 수령분 약 200만</li>
                        <li className="font-semibold text-primary-600">→ 신고 대상: 근로 300 + 이자 50 + 임대 200 = 약 550만</li>
                      </ul>
                    </div>

                    <div className="rounded-lg bg-bg-raised p-3">
                      <p className="font-semibold text-text-primary">모친이 자영업 중 2026년 7월 사망</p>
                      <ul className="mt-2 list-inside list-disc space-y-1">
                        <li>1월~7월 매출: 약 2,500만</li>
                        <li>경비율 70% 적용 (또는 실경비 입증)</li>
                        <li>사업소득 = 2,500 × 30% = 약 750만</li>
                        <li className="font-semibold text-primary-600">→ 신고 대상: 사업소득 약 750만</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border-l-4 border-l-primary-500 bg-primary-500/10 p-4 text-sm text-text-secondary">
                  <p className="font-semibold text-text-primary">💡 퇴직금은 따로</p>
                  <p className="mt-2">
                    퇴직금(퇴직소득)은 종합소득세와 별개로 "퇴직소득세"를 신고합니다(소득세법 §145). 연금보험 일시금도 퇴직소득에 포함될 수
                    있으니 상속인 합의 시 이를 고려하세요.
                  </p>
                </div>
              </section>

              {/* 5. 상속세와의 차이 */}
              <section className="space-y-4">
                <h2 className="text-2xl font-bold">5. Q. 상속세와는 어떤 점이 다른가요?</h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  종합소득세와 상속세는 완전히 다릅니다. 종합소득세는 "사망 연도의 소득"에 대한 세금이고, 상속세는 "상속받은 재산"에 대한
                  세금입니다(상증법 §1).
                </p>

                <div className="space-y-3 rounded-lg bg-bg-raised p-4">
                  <p className="font-semibold text-text-primary">종합소득세 vs 상속세 비교</p>
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs text-text-secondary border-collapse">
                      <thead>
                        <tr className="border-b border-border-base">
                          <th className="px-2 py-1 text-left">항목</th>
                          <th className="px-2 py-1 text-left">종합소득세</th>
                          <th className="px-2 py-1 text-left">상속세</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-border-base">
                          <td className="px-2 py-1 font-semibold">과세 대상</td>
                          <td className="px-2 py-1">사망 연도 소득</td>
                          <td className="px-2 py-1">상속받은 재산</td>
                        </tr>
                        <tr className="border-b border-border-base">
                          <td className="px-2 py-1 font-semibold">세율</td>
                          <td className="px-2 py-1">누진 6~45% (소득세법 §55)</td>
                          <td className="px-2 py-1">누진 10~50% (상증법 §31)</td>
                        </tr>
                        <tr className="border-b border-border-base">
                          <td className="px-2 py-1 font-semibold">공제</td>
                          <td className="px-2 py-1">근로공제, 필요경비 등</td>
                          <td className="px-2 py-1">배우자, 직계 10억~5억</td>
                        </tr>
                        <tr className="border-b border-border-base">
                          <td className="px-2 py-1 font-semibold">신고 기한</td>
                          <td className="px-2 py-1">사망일+6개월 or 5월 31일</td>
                          <td className="px-2 py-1">사망일+10개월</td>
                        </tr>
                        <tr>
                          <td className="px-2 py-1 font-semibold">신고 근거</td>
                          <td className="px-2 py-1">소득세법 §74</td>
                          <td className="px-2 py-1">상증법 §66</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="rounded-lg bg-bg-card p-4 text-sm text-text-secondary">
                  <p className="mb-3 font-semibold text-text-primary">신고 순서: 먼저 종합소득세, 나중에 상속세</p>
                  <p>
                    1. <strong>종합소득세 신고</strong> (6개월 or 5월 31일) 2. <strong>상속세 신고</strong> (10개월) — 순서가 중요합니다.
                    종합소득세에서 나올 세금이 상속재산을 줄이기 때문에 상속세 기초가 됩니다.
                  </p>
                </div>

                <div className="rounded-lg border-l-4 border-l-danger-500 bg-danger-500/10 p-4 text-sm text-text-secondary">
                  <p className="font-semibold text-danger-700 dark:text-danger-300">⚠️ 주의: 세금 이중 부담 가능</p>
                  <p className="mt-2">
                    높은 소득이 있으면 종합소득세를 먼저 내고, 남은 재산에 대해 상속세를 다시 냅니다. 따라서 신고 전 세무사와 상의하여
                    납부 순서와 규모를 파악하는 것이 중요합니다.
                  </p>
                </div>
              </section>

              {/* 6. 무신고 가산세 */}
              <section className="space-y-4">
                <h2 className="text-2xl font-bold">6. Q. 신고하지 않으면 어떻게 되나요?</h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  무신고가산세 20%가 부과되고, 추가로 지연가산세와 가산금이 발생합니다(국세기본법 §47의2·§47의3). 또한 신고하지 않으면
                  환급금(있으면)도 5년 후 소멸합니다.
                </p>

                <div className="rounded-lg bg-bg-raised p-4 text-sm text-text-secondary">
                  <p className="font-semibold text-text-primary mb-3">미신고 시 가산세 계산</p>
                  <div className="space-y-2">
                    <div className="rounded-lg bg-bg-card p-3">
                      <p className="font-semibold text-text-primary">예: 사망자 사업소득 1,000만원, 신고 안 함</p>
                      <ul className="mt-2 list-inside list-disc space-y-1">
                        <li>종합소득세액: 약 240만 (과세표준 750만 × 24% − 576만 누진공제)</li>
                        <li>무신고가산세: 240만 × 20% = 48만</li>
                        <li>지연가산세: 240만 × 0.022% × 미신고일수</li>
                        <li className="font-semibold text-danger-600">→ 총 납부: 약 300만+ (세금 + 가산세 포함)</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border-l-4 border-l-highlight-500 bg-highlight-500/5 p-4 text-sm text-text-secondary">
                  <p className="font-semibold text-text-primary">💡 6월 신고는 자진신고 감면 50% 받음</p>
                  <p className="mt-2">
                    5월 31일 기한을 넘기고 6월 1~30일에 신고하면 가산세가 50% 감면됩니다(국세기본법 §48). 즉 무신고가산세 20% → 10%로
                    줄어듭니다. 더 늦으면 감면이 없으므로 최대한 빨리 신고하세요.
                  </p>
                </div>

                <div className="rounded-lg bg-danger-500/10 border-l-4 border-l-danger-500 p-4 text-sm text-text-secondary">
                  <p className="font-semibold text-danger-700 dark:text-danger-300">⚠️ 환급금도 5년 후 소멸</p>
                  <p className="mt-2">
                    신고하지 않으면 돌려받을 환급금까지 5년 경과 후 국고에 귀속됩니다(국세기본법 §51). 그 사이 신고해도 환급받지 못합니다.
                    예를 들어 사망자가 2026년에 과다 납부한 세금이 있으면, 반드시 2026년 안에 신고하여 환급받아야 합니다.
                  </p>
                </div>
              </section>

              {/* FAQ */}
              <FaqSection items={[...FAQ_ITEMS]} />

              {/* 신고 체크리스트 */}
              <section className="space-y-4">
                <h2 className="text-2xl font-bold">7. 사망자 종합소득세 신고 체크리스트</h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  신고 전에 다음을 확인하고 준비하세요.
                </p>

                <div className="space-y-2 rounded-lg bg-bg-card p-4 text-sm">
                  <div className="flex items-start gap-2">
                    <input type="checkbox" id="check1" className="mt-1" />
                    <label htmlFor="check1" className="text-text-secondary">
                      <strong>사망자 기본 정보</strong> — 주민등록번호, 사망일자 확인
                    </label>
                  </div>
                  <div className="flex items-start gap-2">
                    <input type="checkbox" id="check2" className="mt-1" />
                    <label htmlFor="check2" className="text-text-secondary">
                      <strong>소득 자료 수집</strong> — 근무처 원천징수영수증, 통장(이자배당), 임대료 수기 기록
                    </label>
                  </div>
                  <div className="flex items-start gap-2">
                    <input type="checkbox" id="check3" className="mt-1" />
                    <label htmlFor="check3" className="text-text-secondary">
                      <strong>신고 의무자 확정</strong> — 대표 신고자 정하고, 나머지는 신고 면제 신청서 작성
                    </label>
                  </div>
                  <div className="flex items-start gap-2">
                    <input type="checkbox" id="check4" className="mt-1" />
                    <label htmlFor="check4" className="text-text-secondary">
                      <strong>신고 기한 계산</strong> — 사망일 + 6개월 또는 5월 31일 중 늦은 날
                    </label>
                  </div>
                  <div className="flex items-start gap-2">
                    <input type="checkbox" id="check5" className="mt-1" />
                    <label htmlFor="check5" className="text-text-secondary">
                      <strong>신고 방법 선택</strong> — 홈택스 온라인 신고 또는 세무서 방문 신고
                    </label>
                  </div>
                  <div className="flex items-start gap-2">
                    <input type="checkbox" id="check6" className="mt-1" />
                    <label htmlFor="check6" className="text-text-secondary">
                      <strong>공제 확인</strong> — 부양가족, 신용카드, 의료비 등 합법적 공제 적용
                    </label>
                  </div>
                  <div className="flex items-start gap-2">
                    <input type="checkbox" id="check7" className="mt-1" />
                    <label htmlFor="check7" className="text-text-secondary">
                      <strong>세무사 상담</strong> — 복잡하면 전문가 도움 (수수료 vs 가산세 비교)
                    </label>
                  </div>
                </div>
              </section>

              {/* 주의사항 */}
              <section className="card border-l-4 border-l-danger-500 bg-danger-500/5">
                <h2 className="mb-3 text-lg font-semibold text-danger-700 dark:text-danger-300">⚠️ 최종 주의사항</h2>
                <ul className="space-y-2 text-sm text-danger-700 dark:text-danger-300">
                  <li>
                    • <strong>신고 의무는 상속인 전원</strong>이 지지만, 1명 대표 또는 전원 신고 선택 가능
                  </li>
                  <li>
                    • <strong>기한은 사망일+6개월</strong>이나, 5월 31일이 더 앞면 5월 31일이 기한 (매년)
                  </li>
                  <li>
                    • <strong>상속세와 독립적</strong> — 종합소득세 신고(6개월) 후 상속세 신고(10개월)
                  </li>
                  <li>
                    • <strong>신고 안 하면 무신고가산세 20%</strong> 부과 (6월 신고 시 50% 감면)
                  </li>
                  <li>
                    • <strong>환급금은 5년 이내에 신고</strong>하지 않으면 소멸
                  </li>
                  <li>
                    • 세무사(수수료 30~50만) 상담이 가산세 회피보다 저렴할 수 있음
                  </li>
                </ul>
              </section>

              {/* 관련 계산기·가이드 */}
              <section className="card">
                <h2 className="mb-4 text-lg font-semibold">📊 관련 가이드</h2>
                <ul className="space-y-2 text-sm">
                  <li>
                    →{' '}
                    <Link href="/guide/inheritance-tax-10-year-prior-gift-aggregation/" className="text-primary-600 underline dark:text-primary-500">
                      상속세 사전 증여 합산 10년/5년 완벽 정리
                    </Link>
                    {' '}— 사망 전 증여와 상속 합산 규칙
                  </li>
                  <li>
                    →{' '}
                    <Link href="/guide/income-tax-late-filing-penalty-2026/" className="text-primary-600 underline dark:text-primary-500">
                      종합소득세 무신고·지연 가산세 2026
                    </Link>
                    {' '}— 신고하지 않을 시 가산세 규모
                  </li>
                  <li>
                    →{' '}
                    <Link href="/guide/may-comprehensive-income-tax/" className="text-primary-600 underline dark:text-primary-500">
                      5월 종합소득세 신고 완벽 가이드
                    </Link>
                    {' '}— 일반 종합소득세 신고 기본
                  </li>
                  <li>
                    →{' '}
                    <Link href="/guide/inherited-house-capital-gains-exemption-5-year-2026/" className="text-primary-600 underline dark:text-primary-500">
                      상속주택 양도세 1세대1주택 합가 5년 특례 2026
                    </Link>
                    {' '}— 상속 후 주택 양도세 계산
                  </li>
                </ul>
              </section>

              <ShareButtons
                title="사망자 종합소득세 상속인 신고 2026 완벽 가이드 | 6개월 기한·소득세법 §74"
                url={URL}
                description="사망자 소득 신고는 상속인 전원 의무. 기한 사망일+6개월. 신고 안 하면 무신고가산세 20%. 상속세와의 차이까지 정리."
              />

              {/* 출처 및 면책 */}
              <section
                aria-label="출처 및 면책"
                className="rounded-lg border border-border-base p-4 text-caption text-text-tertiary"
              >
                <p className="mb-2">
                  <strong>법적 근거</strong>: 소득세법 §14 (종합소득과세표준) · §55 (세율) · §70 (확정신고) · §74 (사망자의 신고) · 국세기본법 §47의2 (무신고가산세) · §48 (자진신고 감면) · §51 (환급청구권). 참고:{' '}
                  <a
                    href="https://www.hometax.go.kr/guide/0202000000.jsp"
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="text-primary-600 underline dark:text-primary-500"
                  >
                    국세청 종합소득세 신고 안내
                  </a>
                  .
                </p>
                <p className="mb-2">
                  <strong>면책 조항</strong>: 본 가이드는 일반 정보 제공 목적이며, 개별 상황에 따라 세무·법적 결과가 달라질 수 있습니다. 실제 신고 전
                  세무사 또는 국세청 상담을 받으시기 바랍니다.
                </p>
                <p>
                  <strong>AI 보조 작성</strong>: 본 가이드는 AI 보조 작성 후 운영자 검수를 거쳤습니다(Google AI Content Policy 준수). 업데이트: {DATE_MODIFIED}
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
