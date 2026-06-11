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

const URL = 'https://calculatorhost.com/guide/comprehensive-income-tax-refund-timing-2026/';
const DATE_PUBLISHED = '2026-05-24';
const DATE_MODIFIED = '2026-05-24';

export const metadata: Metadata = {
  title: '종합소득세 환급금 입금 시기 2026 | 신고 후 언제 받을까?',
  description:
    '5월 31일 종소세 신고 후 환급금은 언제 입금될까? 신고 시점별 환급 일정(6월 중순~7월 말) · 계좌 미등록 시 우편 통지 지연 · 가산세 발생 시 자동 차감 · 홈택스 추적 방법 · 환급 우선순위 · 국세기본법 §51-§52 완벽 정리.',
  keywords: [
    '환급금 입금 시기',
    '종합소득세 환급',
    '홈택스 환급 조회',
    '신고 후 환급 일정',
    '5월 신고 환급금',
    '환급가산금',
    '국세 환급',
    '신고 후 몇 일',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '종합소득세 환급금 입금 시기 2026 | 신고 후 언제 받을까?' }],
    title: '종합소득세 환급금 입금 시기 2026 — 신고 후 언제 받을까?',
    description: '5월 신고 후 약 30~45일, 6월 중순~7월 말 환급금 입금 예상. 신고 시점·계좌 등록 여부·가산세 발생 시 차감.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '종합소득세 환급금 입금 시기 2026',
    description: '신고 후 환급금은 언제 받을까? 신고 시점별 환급 예상일 정리.',
  },
};

const FAQ_ITEMS = [
  {
    question: '종합소득세 신고 후 환급금은 정확히 언제 입금되나요?',
    answer:
      '신고 후 약 30~45일(국세기본법 §51). 5월 초 신고 시 6월 중순~하순, 5월 말 신고 시 7월 중순~말 입금을 예상하면 됩니다. 국세청이 신고 검사→환급액 결정→입금까지 약 30~45일 소요합니다.',
  },
  {
    question: '5월 5일 신고와 5월 28일 신고 환급일이 다른가요?',
    answer:
      '네, 다릅니다. 5월 초 신고 시 검사가 빨리 끝나 6월 중순 입금, 5월 말 신고 시 검사 밀려 7월 말까지 지연 가능합니다. 또한 5월 31일 후 신고(6월 이후) 시 자진신고 감면 적용으로 50%만 차감되어 환급액도 재계산됩니다.',
  },
  {
    question: '계좌를 안 등록했으면 환급금을 어떻게 받나요?',
    answer:
      '국세청에서 우편 통지(약신청서)를 발송합니다. 통지 수령 후 은행 방문해 신청하는 방식인데, 이 과정에서 1~2주 추가 지연됩니다. 홈택스 "계좌 등록"하면 자동 입금 가능(약 1주 단축).',
  },
  {
    question: '홈택스에서 환급금 입금 상태를 어디서 확인하나요?',
    answer:
      '홈택스 메인 → "환급금 조회·신청" → "환급금 조회" 클릭. 신고 상태(신고됨·검사 중·환급 결정·입금 완료) 단계별 확인 가능. 손택스 앱도 지원.',
  },
  {
    question: '환급금이 예정일까지 입금 안 됐으면?',
    answer:
      '신고 후 60일 경과해도 입금 미실시 시 국세청 콜센터(1588-0060)로 문의. 계좌 오류·통지 미수령·추가 검사 등 이유 확인 가능. 개인정보 인증 후 상담원에게 상황 설명.',
  },
  {
    question: '가산세가 발생했는데 환급금에서 자동 차감되나요?',
    answer:
      '네. 국세기본법 §51의2(국세환급금 충당). 예: 환급액 100만, 무신고가산세 20만 발생 시 환급액은 80만으로 자동 차감됩니다. 차감 사항은 홈택스 "국세 부과·결정내역"에서 확인 가능.',
  },
  {
    question: '부분 환급이 될 수도 있다던데, 언제 그런가요?',
    answer:
      '국세청 직권 정정(소득세법 §70의2)이 일어나는 경우. 신고한 소득·공제를 재검사해 과다 공제 적발 시 공제액 일부 재조정 → 환급액 감소. 이 경우 통지 후 약 1~2주 추가 검사.',
  },
  {
    question: '환급금이 체납세 우선 충당된다는데?',
    answer:
      '국세기본법 §51 ②. 환급금 결정 시 본인의 미납 세금이 있으면 환급금에서 우선 충당됩니다. 예: 환급 100만, 과거 취득세 미납 30만 있으면 환급금은 70만만 수령. 차감 내역은 교부결정통지서에 기재.',
  },
];

export default function ComprehensiveIncomeTaxRefundTiming2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '종소세 환급금 입금 시기' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '종합소득세 환급금 입금 시기 2026 완벽 정리',
    description:
      '5월 신고 후 환급금 입금 일정(30~45일) · 신고 시점별 환급일 예상 · 계좌 등록 필수 · 가산세 자동 차감 · 홈택스 추적 방법 · 환급가산금률 1.2% · 국세기본법 §51-§52 법적 근거.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['환급금 입금 시기', '종소세 환급', '홈택스 환급', '신고 후 환급 일정'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '종합소득세 환급금 입금 시기 2026 완벽 정리',
    description:
      '5월 31일 종소세 신고 후 환급금은 언제 입금될까? 신고 시점별 예상 입금일(6월 중순~7월 말) · 계좌 미등록 시 우편 통지 지연 · 가산세 자동 차감 · 환급가산금 1.2% · 홈택스 추적 방법 · 국세기본법 근거 완벽 정리.',
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
                    { name: '종소세 환급금 입금 시기' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">세금 · 7분 읽기 · 2026-05-24</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  종합소득세 환급금 입금 시기 2026
                  <br />
                  <span className="text-2xl text-text-secondary">— 신고 후 언제 받을까?</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  5월 31일을 앞두고 종합소득세 신고를 준비 중이라면, 환급금이 정말 중요한 관심사입니다.{' '}
                  <strong>신고 후 환급금은 일반적으로 30~45일 소요</strong>되지만, 신고 시점·계좌 등록 여부·가산세 발생 여부에
                  따라 입금일이 크게 달라집니다. 5월 초 신고하면 6월 중순 입금, 5월 말 신고하면 7월 말까지 기다려야 할 수
                  있습니다. 이 페이지에서는 신고 시점별 환급 일정, 홈택스 추적 방법, 그리고 예상 못한 차감 사유까지 모두
                  정리합니다.
                </p>
              </header>

              <AdSlot slot="guide-refund-timing-top" format="horizontal" />

              {/* 핵심 요약 */}
              <section aria-label="핵심 요약" className="card border-l-4 border-l-primary-500">
                <h2 className="mb-4 text-2xl font-bold text-primary-700 dark:text-primary-300">⚡ 핵심 정리</h2>
                <div className="mb-4 overflow-x-auto">
                  <table className="w-full text-sm" data-speakable>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th className="px-3 py-2 text-left">신고 시점</th>
                        <th className="px-3 py-2 text-left">예상 환급일</th>
                        <th className="px-3 py-2 text-left">주의</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="px-3 py-2 font-semibold">5월 1~10일</td>
                        <td className="px-3 py-2">6월 15~20일</td>
                        <td className="px-3 py-2 text-xs">가장 빠름</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="px-3 py-2 font-semibold">5월 11~20일</td>
                        <td className="px-3 py-2">6월 25~30일</td>
                        <td className="px-3 py-2 text-xs">표준</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="px-3 py-2 font-semibold">5월 21~31일</td>
                        <td className="px-3 py-2">7월 10~20일</td>
                        <td className="px-3 py-2 text-xs">약간 지연</td>
                      </tr>
                      <tr>
                        <td className="px-3 py-2 font-semibold">6월 이후 (자진)</td>
                        <td className="px-3 py-2">7월 말~8월</td>
                        <td className="px-3 py-2 text-xs">가산세 50% 차감</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="rounded-lg bg-primary-500/10 p-4 text-sm text-primary-700 dark:text-primary-300">
                  <p className="font-semibold">TL;DR</p>
                  <ul className="mt-2 list-inside list-disc space-y-1">
                    <li>
                      <strong>신고 후 30~45일</strong> 소요 (국세기본법 §51)
                    </li>
                    <li>
                      <strong>5월 초 신고 = 6월 중순</strong>, 5월 말 신고 = 7월 중순~말
                    </li>
                    <li>
                      <strong>계좌 등록 필수</strong> — 미등록 시 우편 통지 후 1~2주 추가 지연
                    </li>
                    <li>
                      <strong>가산세 발생 시 자동 차감</strong> (국세기본법 §51의2)
                    </li>
                    <li>
                      <strong>홈택스에서 단계별 확인</strong> — 신고→검사→결정→입금 추적 가능
                    </li>
                  </ul>
                </div>
              </section>

              {/* 1. 환급금 입금 기본 기간 */}
              <section className="space-y-4">
                <h2 className="text-2xl font-bold">1. 환급금 입금 기본 기간 — 30~45일 (국세기본법 §51)</h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  종합소득세 신고 후 환급금 지급까지는{' '}
                  <strong>국세기본법 §51에 따라 일반적으로 30~45일 소요</strong>됩니다. 이 기간은 국세청이
                  신고서를 접수 → 형식적 검사 → 소득·공제 검증 → 환급액 결정 → 은행 이체까지의 모든 과정을 포함합니다.
                </p>

                <div className="rounded-lg bg-bg-card p-4">
                  <p className="mb-3 font-semibold text-text-primary">환급금 처리 단계별 일정</p>
                  <div className="space-y-2 text-sm text-text-secondary">
                    <div className="flex items-center gap-2">
                      <span className="rounded-full bg-primary-500 w-6 h-6 flex items-center justify-center text-white font-bold text-xs">
                        1
                      </span>
                      <span>
                        <strong>신고 접수</strong> — 홈택스 또는 세무서 직접 제출
                      </span>
                    </div>
                    <div className="ml-8 border-l-2 border-primary-500 pl-4 py-2">
                      ↓ (1~3일)
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="rounded-full bg-primary-500 w-6 h-6 flex items-center justify-center text-white font-bold text-xs">
                        2
                      </span>
                      <span>
                        <strong>형식 검사</strong> — 신고서 필수 항목 확인
                      </span>
                    </div>
                    <div className="ml-8 border-l-2 border-primary-500 pl-4 py-2">
                      ↓ (3~10일)
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="rounded-full bg-primary-500 w-6 h-6 flex items-center justify-center text-white font-bold text-xs">
                        3
                      </span>
                      <span>
                        <strong>소득·공제 심사</strong> — 이전 연도 자료와 대조, 공제 적격성 검증
                      </span>
                    </div>
                    <div className="ml-8 border-l-2 border-primary-500 pl-4 py-2">
                      ↓ (10~25일)
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="rounded-full bg-primary-500 w-6 h-6 flex items-center justify-center text-white font-bold text-xs">
                        4
                      </span>
                      <span>
                        <strong>환급액 결정</strong> — 홈택스 공지 + 교부결정통지서 발송
                      </span>
                    </div>
                    <div className="ml-8 border-l-2 border-primary-500 pl-4 py-2">
                      ↓ (1~7일)
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="rounded-full bg-primary-500 w-6 h-6 flex items-center justify-center text-white font-bold text-xs">
                        5
                      </span>
                      <span>
                        <strong>환급금 입금</strong> — 등록 계좌로 자동 이체 (또는 우편 통지)
                      </span>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border-l-4 border-l-highlight-500 bg-highlight-500/5 p-4 text-sm text-text-secondary">
                  <p className="font-semibold text-text-primary">💡 핵심</p>
                  <p className="mt-2">
                    신고 후 환급금까지의 시간은{' '}
                    <strong>
                      신고 시점이 빠를수록 짧습니다. 검사가 순차적으로 진행되므로 5월 초 신고 시 약 30일, 5월 말 신고 시
                      45일 이상 소요될 수 있습니다.
                    </strong>
                  </p>
                </div>
              </section>

              {/* 2. 신고 시점별 환급 예상일 */}
              <section className="space-y-4">
                <h2 className="text-2xl font-bold">2. 신고 시점별 환급 예상일 — 5월 초 vs 5월 말</h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  5월 31일이 신고 마감이지만, 신고 시점에 따라 환급금 입금일이 최대 4주까지 차이납니다. 이는
                  국세청의 순차 처리로 인한 것입니다. 5월 초 신고자들을 먼저 검사하고, 월말에 가까워질수록 신고량이 폭증해
                  검사 기간이 늘어납니다.
                </p>

                <div className="rounded-lg bg-highlight-500/10 p-4">
                  <p className="mb-3 font-semibold text-highlight-700 dark:text-highlight-300">실제 계산 사례</p>
                  <div className="space-y-3 text-sm text-text-secondary">
                    <div className="rounded-lg bg-bg-card p-3">
                      <p className="font-semibold text-text-primary mb-2">사례 A: 5월 5일 신고</p>
                      <ul className="list-inside list-disc space-y-1">
                        <li>신고 직후 형식 검사 (5/5~5/7)</li>
                        <li>소득·공제 심사 (5/7~5/20, 약 13일)</li>
                        <li>환급액 결정·입금 (5/20~6/10)</li>
                        <li className="font-semibold text-primary-700 dark:text-primary-300">
                          → 예상 입금일: 6월 10~15일
                        </li>
                      </ul>
                    </div>

                    <div className="rounded-lg bg-bg-card p-3">
                      <p className="font-semibold text-text-primary mb-2">사례 B: 5월 20일 신고</p>
                      <ul className="list-inside list-disc space-y-1">
                        <li>신고 직후 형식 검사 (5/20~5/22)</li>
                        <li>소득·공제 심사 (5/22~6/5, 약 14일 + 대기)</li>
                        <li>환급액 결정·입금 (6/5~6/25)</li>
                        <li className="font-semibold text-primary-700 dark:text-primary-300">
                          → 예상 입금일: 6월 25~30일
                        </li>
                      </ul>
                    </div>

                    <div className="rounded-lg bg-bg-card p-3">
                      <p className="font-semibold text-text-primary mb-2">사례 C: 5월 28일 신고 (마감 직전)</p>
                      <ul className="list-inside list-disc space-y-1">
                        <li>신고 직후 형식 검사 (5/28~5/30)</li>
                        <li>소득·공제 심사 (5/30~6/20, 약 21일 + 대기)</li>
                        <li>환급액 결정·입금 (6/20~7/20)</li>
                        <li className="font-semibold text-primary-700 dark:text-primary-300">
                          → 예상 입금일: 7월 15~25일
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              <AdSlot slot="guide-refund-timing-mid" format="rectangle" />

              {/* 3. 계좌 등록의 중요성 */}
              <section className="space-y-4">
                <h2 className="text-2xl font-bold">3. 계좌 등록 필수 — 미등록 시 우편 통지 1~2주 추가 지연</h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  환급금 입금 방식은 두 가지입니다.{' '}
                  <strong>
                    (1) 홈택스에서 계좌 등록 → 자동 입금(약 1주), (2) 미등록 → 우편 통지 수령 후 은행 방문 신청(약 2~3주)
                  </strong>
                  . 계좌를 미리 등록하지 않으면 환급금 지급이 한두 주 늦어집니다.
                </p>

                <div className="rounded-lg bg-bg-raised p-4">
                  <p className="font-semibold text-text-primary mb-3">홈택스 계좌 등록 단계</p>
                  <div className="space-y-2 text-sm text-text-secondary">
                    <p>
                      <strong className="text-text-primary">1단계:</strong> 홈택스 로그인 → 마이페이지 → 정보수정 → 환급
                      계좌 등록 (계좌명의인 확인 필수)
                    </p>
                    <p>
                      <strong className="text-text-primary">2단계:</strong> 은행명·계좌번호·예금주명 입력 → 저장
                    </p>
                    <p>
                      <strong className="text-text-primary">3단계:</strong> 신고 시점에 같은 계좌가 기본값으로 반영됨
                    </p>
                    <p className="rounded-lg bg-bg-card p-2 text-xs italic">
                      💡 Tip: 5월 신고 전에 미리 계좌 등록하면 신고 후 자동 이체되어 약 1주 단축됨.
                    </p>
                  </div>
                </div>

                <div className="rounded-lg border-l-2 border-l-danger-500 bg-danger-500/5 p-4">
                  <p className="font-semibold text-danger-700 dark:text-danger-300 mb-2">⚠️ 미등록 시 절차</p>
                  <ol className="text-sm text-danger-600 dark:text-danger-400 list-inside list-decimal space-y-1">
                    <li>
                      <strong>환급액 결정</strong> — 홈택스 공지 (약 신고 후 25~30일)
                    </li>
                    <li>
                      <strong>우편 통지(약신청서) 발송</strong> — 1주 후 수령
                    </li>
                    <li>
                      <strong>은행 방문 신청</strong> — 통지서 + 신분증 지참, 계좌 이체 신청
                    </li>
                    <li>
                      <strong>환급금 입금</strong> — 신청 후 1~2주 (총 3~4주 추가 소요)
                    </li>
                  </ol>
                </div>
              </section>

              {/* 4. 가산세 발생 시 자동 차감 */}
              <section className="space-y-4">
                <h2 className="text-2xl font-bold">4. 가산세 발생 시 환급금에서 자동 차감 (국세기본법 §51의2)</h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  신고 후 환급액이 결정됐더라도, 국세청이 추가 가산세를 부과하면 환급금에서 자동으로 차감됩니다.
                  특히 5월 31일 이후 신고(자진신고)하면 무신고가산세의 50%만 차감되지만, 여전히 환급액에 영향을 줍니다.
                </p>

                <div className="rounded-lg bg-bg-raised p-4">
                  <p className="font-semibold text-text-primary mb-3">가산세 자동 차감 메커니즘</p>
                  <div className="space-y-3 text-sm text-text-secondary">
                    <div>
                      <p className="font-semibold text-text-primary">무신고가산세 (소득세법 §70의2)</p>
                      <p className="ml-3">
                        5월 31일까지 신고: 20% · 6월 이후(자진신고): 10% (50% 감면) · 양도세 미신고 시 세액의 40%
                      </p>
                    </div>
                    <div>
                      <p className="font-semibold text-text-primary">납부지연가산세 (국세기본법 §47)</p>
                      <p className="ml-3">
                        일 0.022%(연 약 8%) · 5월 31일 이후 신고해 추가 납부세액이 생기면 자동 부과
                      </p>
                    </div>
                    <div>
                      <p className="font-semibold text-text-primary">과소신고가산세 (국세기본법 §§76-77)</p>
                      <p className="ml-3">
                        신고 후 세무조사로 탈루 적발 시 10~40% (환급금 입금 후 추적징수)
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg bg-highlight-500/10 p-4">
                  <p className="mb-3 font-semibold text-highlight-700 dark:text-highlight-300">실제 계산 사례</p>
                  <div className="space-y-3 text-sm text-text-secondary">
                    <div className="rounded-lg bg-bg-card p-3">
                      <p className="font-semibold text-text-primary mb-2">사례: 5월 25일 신고, 환급액 100만 원</p>
                      <ul className="list-inside list-disc space-y-1">
                        <li>신고한 환급액: 100만 원</li>
                        <li>검사 중 공제 오류 발견 (과다 공제 50만)</li>
                        <li>재계산 환급액: 50만 원</li>
                        <li>추가 납부세액(추정소득세) 상환: 10만 원</li>
                        <li className="font-semibold text-primary-700 dark:text-primary-300">
                          → 최종 환급액: 40만 원 (환급액 50만 - 추가 납부세액 10만)
                        </li>
                      </ul>
                    </div>

                    <div className="rounded-lg bg-bg-card p-3">
                      <p className="font-semibold text-text-primary mb-2">사례: 6월 10일 자진신고, 환급액 80만 원</p>
                      <ul className="list-inside list-disc space-y-1">
                        <li>신고한 환급액: 80만 원</li>
                        <li>무신고가산세: 20만 원 × 50% = 10만 원 (자진신고 감면)</li>
                        <li>가산세는 별도 납부(환급금 차감 안 함)</li>
                        <li className="font-semibold text-primary-700 dark:text-primary-300">
                          → 환급액: 80만 원 (가산세는 따로 고지)
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border-l-2 border-l-danger-500 bg-danger-500/5 p-4 text-sm text-text-secondary">
                  <p className="font-semibold text-danger-700 dark:text-danger-300">⚠️ 주의</p>
                  <p>
                    국세기본법 §51의2(국세환급금 충당)에 따르면, 환급금 결정 시점에 발견된 가산세·미납세금은 환급액에서
                    우선 차감됩니다. 예상한 환급액과 실제 입금액이 다를 수 있으니 홈택스에서 교부결정통지서를 확인해야
                    합니다.
                  </p>
                </div>
              </section>

              {/* 5. 홈택스 환급금 추적 방법 */}
              <section className="space-y-4">
                <h2 className="text-2xl font-bold">5. 홈택스 환급금 추적 — 단계별 상태 확인 방법</h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  신고 후 환급금이 지급될 때까지 홈택스에서 단계별로 상태를 확인할 수 있습니다. 신고됨 → 검사 중 →
                  환급액 결정 → 입금 완료로 진행되며, 각 단계에서 예상 일정을 파악할 수 있습니다.
                </p>

                <div className="rounded-lg bg-bg-card p-4">
                  <p className="mb-3 font-semibold text-text-primary">홈택스 환급금 조회 단계별 가이드</p>
                  <div className="space-y-3 text-sm text-text-secondary">
                    <div className="rounded-lg bg-bg-raised p-2">
                      <p className="font-semibold text-text-primary">Step 1: 홈택스 로그인</p>
                      <p className="ml-3">
                        hometax.go.kr 또는 손택스 앱 → 공인인증서/금융인증서 로그인
                      </p>
                    </div>
                    <div className="rounded-lg bg-bg-raised p-2">
                      <p className="font-semibold text-text-primary">Step 2: 메뉴 이동</p>
                      <p className="ml-3">
                        메인 → 조회/발급 → 환급금 조회 → 국세환급금 조회·신청 클릭
                      </p>
                    </div>
                    <div className="rounded-lg bg-bg-raised p-2">
                      <p className="font-semibold text-text-primary">Step 3: 상태 확인</p>
                      <p className="ml-3">
                        신고 상태(신고됨·검사 중·환급결정·입금완료) 표시 + 예상 입금일·환급액·차감액 조회
                      </p>
                    </div>
                    <div className="rounded-lg bg-bg-raised p-2">
                      <p className="font-semibold text-text-primary">Step 4: 상세 확인</p>
                      <p className="ml-3">
                        "국세 부과·결정내역" 클릭 → 신고 소득·공제·세액·가산세·환급액 상세 기록
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg bg-bg-raised p-4">
                  <p className="font-semibold text-text-primary mb-2">각 단계별 소요 일정</p>
                  <div className="space-y-2 text-sm text-text-secondary">
                    <div className="flex justify-between">
                      <span>
                        <strong>신고됨</strong> — 신고서 제출 후 1~3일
                      </span>
                      <span className="text-xs text-text-tertiary">형식 검사 중</span>
                    </div>
                    <div className="flex justify-between">
                      <span>
                        <strong>검사 중</strong> — 신고 후 3~25일
                      </span>
                      <span className="text-xs text-text-tertiary">소득·공제 검증</span>
                    </div>
                    <div className="flex justify-between">
                      <span>
                        <strong>환급 결정</strong> — 신고 후 25~35일
                      </span>
                      <span className="text-xs text-text-tertiary">최종 환급액 확정</span>
                    </div>
                    <div className="flex justify-between">
                      <span>
                        <strong>입금 완료</strong> — 신고 후 30~45일
                      </span>
                      <span className="text-xs text-text-tertiary">계좌 자동 이체</span>
                    </div>
                  </div>
                </div>
              </section>

              {/* 6. 환급금이 늦어질 수 있는 상황 */}
              <section className="space-y-4">
                <h2 className="text-2xl font-bold">6. 예상 못한 지연 — 환급금이 45일을 넘을 때</h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  신고 후 60일이 넘어도 환급금이 입금되지 않으면, 뭔가 문제가 있는 것입니다. 흔한 원인은 (1)
                  계좌 오류, (2) 추가 검사, (3) 미등록 상태에서 우편 통지 미수령, (4) 체납 세금 우선 충당입니다.
                </p>

                <div className="rounded-lg border-l-2 border-l-danger-500 bg-danger-500/5 p-4">
                  <p className="font-semibold text-danger-700 dark:text-danger-300 mb-3">⚠️ 환급 지연 원인 5가지</p>
                  <ul className="text-sm text-danger-600 dark:text-danger-400 list-inside list-disc space-y-1">
                    <li>
                      <strong>계좌 오류</strong> — 계좌번호·예금주명 오기 시 자동 이체 실패. 홈택스에서 계좌 재확인 후
                      다시 신청.
                    </li>
                    <li>
                      <strong>추가 검사</strong> — 소득·공제 대조 과정에서 문제 발견 시 국세청에서 추가 서류 요청. 회신
                      기간 더해짐.
                    </li>
                    <li>
                      <strong>우편 통지 미수령</strong> — 계좌 미등록 시 우편으로 발송되는 약신청서 미수령. 주소 변경
                      필수.
                    </li>
                    <li>
                      <strong>체납세금 우선 충당</strong> (국세기본법 §51 ②) — 본인의 과거 미납 세금(취득세·자동차세 등)이
                      있으면 환급금에서 차감.
                    </li>
                    <li>
                      <strong>세무조사 진행 중</strong> — 신고 후 세무조사 대상으로 선정 시 환급금 지급이 보류될 수
                      있음.
                    </li>
                  </ul>
                </div>

                <div className="rounded-lg bg-highlight-500/10 p-4">
                  <p className="font-semibold text-highlight-700 dark:text-highlight-300 mb-2">예상 못한 환급 상황 대응</p>
                  <div className="space-y-2 text-sm text-text-secondary">
                    <p>
                      <strong>Step 1:</strong> 홈택스 "환급금 조회·신청"에서 상태 재확인 (신고됨/검사 중/결정 중/지연 등)
                    </p>
                    <p>
                      <strong>Step 2:</strong> "국세 부과·결정내역"에서 가산세·차감액·체납세금 확인
                    </p>
                    <p>
                      <strong>Step 3:</strong> 국세청 콜센터(1588-0060) 또는 관할 세무서 환급금 담당자에 전화 문의
                    </p>
                    <p>
                      <strong>Step 4:</strong> 필요 시 계좌 재확인·주소 변경·체납세금 납부 진행
                    </p>
                  </div>
                </div>
              </section>

              {/* 7. 환급가산금 1.2% */}
              <section className="space-y-4">
                <h2 className="text-2xl font-bold">7. 의외의 수익 — 환급가산금 1.2% (국세기본법 §52)</h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  환급금이 입금될 때 환급가산금이 함께 지급됩니다. 환급가산금은 국세청이 환급 결정 지연에 따른 사용자의
                  금융 비용을 보상하는 개념으로, 연 1.2% 수준입니다. 이는 자동으로 계산되어 환급금에 합산되므로 별도
                  신청이 필요 없습니다.
                </p>

                <div className="rounded-lg bg-bg-card p-4">
                  <p className="mb-3 font-semibold text-text-primary">환급가산금 계산 공식</p>
                  <div className="space-y-2 text-sm text-text-secondary">
                    <p>
                      <strong>환급가산금</strong> = 환급금 × 연 1.2% × (입금일까지의 일수 / 365)
                    </p>
                    <p className="ml-3">
                      예: 환급금 100만 원, 신고 후 45일 만에 입금
                      <br />
                      가산금 = 100만 × 1.2% × (45 / 365) = 약 1,479원
                    </p>
                  </div>
                </div>

                <div className="rounded-lg bg-bg-raised p-4 text-sm text-text-secondary">
                  <p className="font-semibold text-text-primary mb-2">🎁 환급가산금의 의의</p>
                  <p>
                    환급금이 늦을수록 환급가산금이 조금이라도 늘어나므로, "5월 말에 신고해도 환급 때까지 이자가 붙는다"는
                    뜻입니다. 다만 금액은 매우 미미합니다 (45일 기준 약 1,500원/100만 원당).
                  </p>
                </div>
              </section>

              <FaqSection items={[...FAQ_ITEMS]} />

              {/* 최종 요약 */}
              <section className="card border-l-2 border-l-primary-500 bg-primary-500/5">
                <h2 className="mb-3 text-lg font-semibold text-primary-700 dark:text-primary-300">📋 최종 체크리스트</h2>
                <ul className="space-y-2 text-sm text-primary-700 dark:text-primary-300">
                  <li>☐ 5월 31일 이전 신고 완료 (자진신고 시 가산세 50% 차감)</li>
                  <li>☐ 홈택스에서 계좌 사전 등록 (미등록 시 우편 통지 1~2주 추가 지연)</li>
                  <li>
                    ☐ 신고 후 25~30일 경과 시 홈택스 "환급금 조회"에서 환급액 확인 (교부결정통지서 발송 후 1주일 내)
                  </li>
                  <li>☐ 신고 후 45일 이상 지연 시 국세청 콜센터(1588-0060) 문의</li>
                  <li>☐ 체납세금 확인 (환급금에서 우선 차감됨)</li>
                </ul>
              </section>

              {/* 관련 계산기·가이드 */}
              <section className="card">
                <h2 className="mb-4 text-lg font-semibold">📊 관련 계산기·가이드</h2>
                <ul className="space-y-2 text-sm">
                  <li>
                    →{' '}
                    <Link href="/calculator/freelancer-tax/" className="text-primary-600 underline dark:text-primary-500">
                      프리랜서 종합소득세 계산기
                    </Link>
                    {' '}— 소득·공제·환급액 시뮬
                  </li>
                  <li>
                    →{' '}
                    <Link href="/guide/may-comprehensive-income-tax/" className="text-primary-600 underline dark:text-primary-500">
                      5월 종합소득세 신고 완벽 가이드
                    </Link>
                    {' '}— 신고 대상·기한·절세 5가지
                  </li>
                  <li>
                    →{' '}
                    <Link href="/guide/income-tax-late-filing-penalty-2026/" className="text-primary-600 underline dark:text-primary-500">
                      무신고·지연 가산세 2026 정확 계산
                    </Link>
                    {' '}— 6월 신고 시 가산세 50% 감면
                  </li>
                  <li>
                    →{' '}
                    <Link href="/guide/income-deduction-vs-tax-credit-2026/" className="text-primary-600 underline dark:text-primary-500">
                      소득공제 vs 세액공제 2026
                    </Link>
                    {' '}— 신고 전 공제 전략
                  </li>
                  <li>
                    →{' '}
                    <Link href="/calculator/salary/" className="text-primary-600 underline dark:text-primary-500">
                      연봉 실수령액 계산기
                    </Link>
                    {' '}— 세후 월급 추정
                  </li>
                </ul>
              </section>

              <ShareButtons
                title="종합소득세 환급금 입금 시기 2026"
                url={URL}
                description="신고 후 환급금은 30~45일 소요. 5월 초 신고 시 6월 중순, 5월 말 신고 시 7월 말. 계좌 등록 필수."
              />

              {/* 출처 및 면책 */}
              <section
                aria-label="출처 및 면책"
                className="rounded-lg border border-border-base p-4 text-caption text-text-tertiary"
              >
                <p className="mb-2">
                  <strong>법적 근거</strong>: 국세기본법 §51 (국세환급금) · §51의2 (국세환급금 충당) · §52 (환급가산금) ·
                  소득세법 §70의2 (무신고가산세). 참고:{' '}
                  <a
                    href="https://www.hometax.go.kr/guide/0202000000.jsp"
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="text-primary-600 underline dark:text-primary-500"
                  >
                    국세청 환급금 안내
                  </a>
                  ,{' '}
                  <a
                    href="https://www.law.go.kr/"
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="text-primary-600 underline dark:text-primary-500"
                  >
                    법제처 법령 정보
                  </a>
                  .
                </p>
                <p className="mb-2">
                  <strong>면책 조항</strong>: 본 가이드는 정보 제공 목적이며 세무·법적 조언이 아닙니다. 실제 환급 일정은
                  신고 시점·검사 여부·부가 서류 제출 등에 따라 달라질 수 있습니다. 정확한 환급 일정은 홈택스 조회 또는
                  국세청 상담을 통해 확인하시기 바랍니다.
                </p>
                <p>
                  <strong>AI 보조 작성</strong>: 본 가이드는 AI 보조 작성 후 운영자 검수를 거쳤습니다(Google AI
                  Content Policy 준수). 업데이트: {DATE_MODIFIED}
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
