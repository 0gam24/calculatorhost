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

const URL = 'https://calculatorhost.com/guide/may-31-deadline-day-income-tax-filing-2026/';
const DATE_PUBLISHED = '2026-05-31';
const DATE_MODIFIED = '2026-05-31';

export const metadata: Metadata = {
  title: '5월 31일 마감 당일 종합소득세 신고 2026 | 24시간 가이드·홈택스 폭주 회피',
  description:
    '당일 신고 최후의 선택! 5월 31일 자정(24:00) 마감 1시간 남았다면? 홈택스 폭주 시간대 회피·빠른 신고 5단계·자정 1분 후 무신고가산세 20%·분납 신청 가능·당일 제출 시 자진신고 감면 최대 50%.',
  keywords: [
    '5월 31일 당일 신고',
    '종합소득세 마감',
    '홈택스 폭주',
    '자정 마감',
    '무신고가산세 20%',
    '당일 신고 가능',
    '자진신고 감면',
    '분납 신청 타이밍',
    '소득세법 §70',
    '국세기본법 §47의2',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '5월 31일 마감 당일 종합소득세 신고 2026 | 24시간 가이드·홈택스 폭주 회피' }],
    title: '5월 31일 마감 당일 종합소득세 신고 완벽 2026 | 24시간 라이브 가이드',
    description: '당일 신고 당황스럽다면? 빠른 신고 5단계·홈택스 폭주 회피·자정 제출 시 무신고가산세 0원 안내.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '5월 31일 마감 당일 종합소득세 신고 2026',
    description: '마감 1시간 남았다? 자정까지 5단계로 신고 완료 + 무신고가산세 0원 처리.',
  },
};

const FAQ_ITEMS = [
  {
    question: '자정 1분 전에 신고하면 정상 신고인가요?',
    answer:
      '네. 소득세법 §70에서 "신고는 5월 31일 자정(24:00)까지"라고 규정했으므로, 5월 31일 23:59:59에 제출해도 정상 신고입니다. 다만 홈택스 폭주로 제출 지연이 발생할 수 있으므로 여유 있는 제출을 권장합니다.',
  },
  {
    question: '자정 정확히 넘어서 신고하면 어떻게 되나요?',
    answer:
      '6월 1일 00:00:01에 제출하면 무신고 상태로 처리되어 국세기본법 §47의2에 따라 무신고가산세 20%가 부과됩니다. 다만 자진신고 감면 규정이 있어, 6월 중에 신고하면 50%까지 감면 받을 수 있으므로 완전히 끝나지는 않습니다.',
  },
  {
    question: '5월 31일이 일요일이면 월요일이 마감인가요?',
    answer:
      '네. 2026년 5월 31일은 일요일입니다. 국세기본법 §48에서 마감일이 일요일이면 다음 영업일(6월 1일 월요일)이 마감입니다. 다만 당일 야간 제출 대비 여유 있게 6월 1일 오전 중에 제출하세요.',
  },
  {
    question: '홈택스가 먹통이면 증명 자료를 남길 수 있나요?',
    answer:
      '예외적으로 홈택스 접속 불가 또는 시스템 장애 증거(스크린샷 등)를 제시하면 국세청이 기한 내 신고로 인정할 수 있습니다. 다만 개인의 인터넷 연결 오류는 인정되지 않으므로, 될 수 있으면 오후 3시~6시(낮은 트래픽) 신고를 권장합니다.',
  },
  {
    question: '지금 신고할 시간이 없으면 6월 1일 신고해도 되나요?',
    answer:
      '아닙니다. 소득세법 §70 기한을 넘기면 무신고가산세 20% 부과입니다. 다만 6월 내 신고 시 자진신고 감면이 50% 적용되므로 실질 가산세는 10%가 됩니다(국세기본법 §48). 시간이 부족하면 당일 "모두채움" 또는 간편 신고로라도 기한 내 접수하세요.',
  },
  {
    question: '당일 신고하면 환급금은 언제 받나요?',
    answer:
      '당일 신고하면 6월 말~7월 초 환급금 입금이 예상됩니다. 신고 후 홈택스 "신고 현황 조회"에서 상태를 추적할 수 있으며, 환급 가능 상태로 바뀌면 약 5영업일 후 지정 계좌에 입금됩니다.',
  },
  {
    question: '당일에 분납 신청은 가능한가요?',
    answer:
      '네. 당일 신고와 동시에 분납 신청이 가능합니다. 분납 가능 조건은 세액이 1,000만 원 초과일 때이며, 분납 기한은 2개월(6월 말 + 7월 말)입니다. 당일 신고 시 홈택스에서 "분납 신청" 메뉴를 선택해 동시에 처리하세요.',
  },
  {
    question: '오후 8시~자정 사이에 제출 폭주가 있나요?',
    answer:
      '예. 오후 8시 이후 홈택스 접속자가 급증해 제출 지연 및 "서버 과부하" 오류가 발생하기 쉽습니다. 가능하면 오후 1시~6시(낮은 트래픽)에 제출하거나, 불가피하게 야간 제출할 땐 오후 10시 이전 완료를 권장합니다.',
  },
];

export default function May31DeadlineDayIncomeTexFiling2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '5월 31일 마감 당일 신고' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '5월 31일 마감 당일 종합소득세 신고 2026 | 24시간 긴급 가이드',
    description:
      '당일 신고 완벽 가이드. 빠른 신고 5단계 · 자정 정확히 전까지 정상 신고 · 1분 후 무신고가산세 20% · 홈택스 폭주 회피 방법 · 분납 신청 · 자진신고 감면 최대 50% · 일요일 마감 월요일 연장 안내 · 당일 환급금 입금 시기.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['마감 당일', '종합소득세', '당일 신고', '자정', '무신고가산세'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '5월 31일 마감 당일 종합소득세 신고 2026',
    description:
      '5월 31일 당일! 지금 신고해야 하는 당신을 위한 24시간 가이드. 빠른 신고 5단계 · 오후 8시 이후 홈택스 폭주 회피 · 자정 1분 전까지 정상 신고 · 자진신고 감면 50% 옵션 · 분납 신청 타이밍 · 환급금 입금 일정.',
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
                  { name: '5월 31일 마감 당일 신고' },
                ]}
                category="세금"
                readingMinutes={9}
                publishedDate="2026-05-31"
                title="5월 31일 마감 당일 종합소득세 신고 2026"
                subtitle="— 자정까지 5단계로 완료하기"
                lead={
                  <p data-speakable>
                    5월 31일 자정까지 남은 시간이 제한적이신가요?
                    <strong> 걱정하지 마세요. 빠른 신고 5단계로 20분 안에 완료 가능합니다.</strong>
                    다만 자정(24:00) 1분 후 제출하면 무신고가산세 20%가 부과되므로(국세기본법 §47의2),
                    <strong>소득세법 §70의 기한을 반드시 지켜야 합니다.</strong>
                    이 가이드에서는 당일 신고 완벽 체크리스트, 홈택스 폭주 회피법, 자진신고 감면 50% 옵션까지 설명합니다.
                  </p>
                }
              />

              <AdSlot slot="guide-may-31-deadline-day-top" format="horizontal" />

              {/* 핵심 정리 */}
              <section aria-label="핵심 정리" className="card border-l-4 border-l-primary-500">
                <h2 className="mb-4 text-2xl font-bold text-primary-700 dark:text-primary-300">⚡ 5분 요약</h2>
                <div className="mb-4 overflow-x-auto">
                  <table className="w-full text-sm" data-speakable>
                    <caption className="mb-2 text-left font-semibold text-text-primary">5월 31일 당일 신고 핵심 타임라인</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th className="px-3 py-2 text-left">시각</th>
                        <th className="px-3 py-2 text-left">상황</th>
                        <th className="px-3 py-2 text-left">권고사항</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="px-3 py-2 font-semibold">오전~오후 3시</td>
                        <td className="px-3 py-2 text-sm">홈택스 트래픽 낮음</td>
                        <td className="px-3 py-2 text-sm font-semibold text-primary-600">추천! 안정적 제출</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="px-3 py-2 font-semibold">오후 3~8시</td>
                        <td className="px-3 py-2 text-sm">트래픽 증가</td>
                        <td className="px-3 py-2 text-sm">가능하면 피하기</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="px-3 py-2 font-semibold">오후 8시 이후</td>
                        <td className="px-3 py-2 text-sm">극심한 폭주 (버퍼링·오류)</td>
                        <td className="px-3 py-2 text-sm">불가피할 때만, 10시 이전 완료</td>
                      </tr>
                      <tr className="border-b border-border-base bg-primary-500/5">
                        <td className="px-3 py-2 font-semibold">23:59:59</td>
                        <td className="px-3 py-2 text-sm">마감 최후 1초</td>
                        <td className="px-3 py-2 text-sm font-semibold">정상 신고 (§70 기한 내)</td>
                      </tr>
                      <tr className="border-b border-border-base bg-danger-500/5">
                        <td className="px-3 py-2 font-semibold">00:00:01 이후</td>
                        <td className="px-3 py-2 text-sm">무신고 상태</td>
                        <td className="px-3 py-2 text-sm text-danger-600">가산세 20% 자동 부과</td>
                      </tr>
                      <tr>
                        <td className="px-3 py-2 font-semibold">6월 중 신고</td>
                        <td className="px-3 py-2 text-sm">자진신고 감면</td>
                        <td className="px-3 py-2 text-sm font-semibold">감면 50% (실질 10%)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="rounded-lg bg-primary-500/10 p-4 text-sm text-primary-700 dark:text-primary-300">
                  <p className="font-semibold">TL;DR</p>
                  <ul className="mt-2 list-inside list-disc space-y-1">
                    <li>
                      <strong>자정 전 제출:</strong> 소득세법 §70 기한 내 = 정상 신고, 무신고가산세 0원
                    </li>
                    <li>
                      <strong>자정 후 제출:</strong> 무신고 상태 = 가산세 20% 부과 (다만 자진신고 감면 50%)
                    </li>
                    <li>
                      <strong>빠른 신고 5단계:</strong> 홈택스 로그인 → 모두채움 → 공제 입력 → 결과 확인 → 전자신고 (약 20분)
                    </li>
                    <li>
                      <strong>홈택스 폭주:</strong> 오후 8시 이후 접속 지연 + "서버 과부하" 오류 (오후 1~6시 추천)
                    </li>
                    <li>
                      <strong>분납:</strong> 세액 1,000만 초과 시 당일 신고 & 분납 신청 동시 가능 (6월 + 7월 2개월 분할)
                    </li>
                  </ul>
                </div>
              </section>

              {/* 1. 당일 신고 가능한가? 법적 근거 */}
              <section className="space-y-4">
                <h2 className="text-2xl font-bold">1. Q. 지금 신고해도 정상인가요? 자정은 정확히 언제인가요?</h2>
                <div className="rounded-lg bg-bg-card p-3 text-sm">
                  <p className="font-semibold text-text-primary">정의</p>
                  <p className="mt-1 text-text-secondary">
                    소득세법 §70에서 "종합소득의 확정신고는 5월 31일까지"라고 규정했으므로, 5월 31일 자정(24:00, 즉 6월 1일 00:00)까지
                    신고하면 정상입니다. 자정의 정확한 시각은 24:00(자정) 또는 00:00(자정 정확히)입니다.
                  </p>
                </div>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  5월 31일 23:59:59에 홈택스에 접속해 신고를 완료하면 정상 신고입니다. 다만 중요한 것은 <strong>국세청 서버에 신고 접수 시각</strong>이므로,
                  홈택스 마지막 화면에서 "신고" 버튼을 클릭한 시각이 5월 31일 자정 이전이어야 합니다. 만약 5월 31일 23:59에 신고
                  버튼을 클릭했는데 네트워크 지연으로 6월 1일 00:15에 접수되면? 안타깝게도 무신고 상태로 처리됩니다. 따라서 <strong>여유 있게 5월 31일 오후 10시 이전 완료</strong>를
                  권장합니다.
                </p>

                <div className="space-y-3 rounded-lg bg-bg-raised p-4">
                  <p className="font-semibold text-text-primary">법적 기한 정확히 이해하기</p>
                  <div className="space-y-2 text-sm text-text-secondary">
                    <div className="rounded-lg bg-bg-card p-3">
                      <p className="font-semibold text-text-primary">소득세법 §70 기한</p>
                      <p className="mt-1">
                        "종합소득의 확정신고는 매년 5월 31일까지 신고자 거주지 관할 세무서에 제출"이라고 규정. 즉 5월 31일 자정(24:00) =
                        6월 1일 00:00까지 제출 완료.
                      </p>
                    </div>

                    <div className="rounded-lg bg-bg-card p-3">
                      <p className="font-semibold text-text-primary">마감일이 일요일인 경우</p>
                      <p className="mt-1">
                        2026년 5월 31일은 일요일입니다. 국세기본법 §48에 따라 마감일이 일요일이면 다음 영업일(월요일 6월 1일)이 자동 마감일로
                        연장됩니다. 따라서 당일 신고가 어려우면 6월 1일 월요일 자정까지 신고 가능합니다(자진신고 감면 없음).
                      </p>
                    </div>

                    <div className="rounded-lg bg-danger-500/10 p-3">
                      <p className="font-semibold text-danger-700 dark:text-danger-300">⚠️ 주의: "6월 1일"의 의미</p>
                      <p className="mt-1 text-xs">
                        일요일(5/31) 다음 영업일이 월요일(6/1)이므로, 6월 1일 자정까지 신고하면 기한 내로 인정됩니다. 다만 이것은 마감일 연장이지,
                        초과 신고가 아닙니다.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border-l-4 border-l-danger-500 bg-danger-500/10 p-4 text-sm text-text-secondary">
                  <p className="font-semibold text-danger-700 dark:text-danger-300">⚠️ 실수로 가산세 부과받는 사례</p>
                  <p className="mt-2">
                    많은 사람이 "6월 1일까지 신고 가능하다"는 것을 착각해 6월 1일 오후나 6월 2일에 신고합니다. 하지만 5월 31일(일요일)이 마감이므로,
                    <strong>5월 31일 자정 또는 6월 1일 자정까지만</strong> 기한 내 신고입니다. 6월 2일 신고는 무신고가산세 20% + 납부지연가산세 발생합니다.
                  </p>
                </div>
              </section>

              {/* 2. 빠른 신고 5단계 */}
              <section className="space-y-4">
                <h2 className="text-2xl font-bold">2. Q. 지금부터 20분 안에 신고 완료하려면?</h2>
                <div className="rounded-lg bg-bg-card p-3 text-sm">
                  <p className="font-semibold text-text-primary">정의</p>
                  <p className="mt-1 text-text-secondary">
                    당일 신고가 불가피한 경우, 홈택스 "모두채움" 기능을 이용하면 이미 입력된 소득·공제 정보를 자동 불러와 약 20분 안에 신고 완료
                    가능합니다. 수정할 사항만 추가 입력하면 됩니다.
                  </p>
                </div>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  당일 신고의 핵심은 "단순화"입니다. 세무사 의뢰나 세세한 기준경비율 계산은 시간이 부족하므로, 홈택스의 "모두채움" 또는 "간편 신고" 기능으로
                  5분 안에 신고를 완료하는 것입니다. 최악의 경우 <strong>신고 없이 기한을 넘기는 것</strong>보다는 <strong>부정확한 신고라도 기한 내 완료</strong>가 무신고가산세
                  20%를 피하는 최선입니다.
                </p>

                <div className="space-y-3 rounded-lg bg-bg-raised p-4">
                  <p className="font-semibold text-text-primary">당일 신고 빠른 5단계</p>
                  <div className="space-y-2 text-sm text-text-secondary">
                    <div className="rounded-lg bg-bg-card p-3">
                      <p className="font-semibold text-text-primary">1단계: 홈택스 로그인 (2분)</p>
                      <p className="mt-1">
                        hometax.go.kr 접속 → 공동인증서 또는 간편인증(삼성패스·카톡) 로그인 → "신고·납부" → "종합소득세" → "신고하기" 클릭
                      </p>
                    </div>

                    <div className="rounded-lg bg-bg-card p-3">
                      <p className="font-semibold text-text-primary">2단계: "모두채움" 또는 "간편 신고" 선택 (1분)</p>
                      <p className="mt-1">
                        2개 옵션 선택 가능: ① "모두채움" (이전 신고 + 공제 자동 불러오기), ② "간편 신고" (가장 단순, 소득 + 기본공제만). 시간이
                        부족하면 "간편 신고" 추천.
                      </p>
                    </div>

                    <div className="rounded-lg bg-bg-card p-3">
                      <p className="font-semibold text-text-primary">3단계: 소득 및 공제 입력 (10분)</p>
                      <p className="mt-1">
                        직장 월급(연말정산 완료): 이미 입력 (수정 불필요)
                        <br />
                        기타소득 또는 사업소득: 금액·발행처 입력 (이미 있으면 확인만)
                        <br />
                        기본공제(부양가족)·특별공제(의료비·신용카드): 필요한 것만 추가
                        <br />
                        세액공제(근로소득세액공제): 자동 계산
                      </p>
                    </div>

                    <div className="rounded-lg bg-bg-card p-3">
                      <p className="font-semibold text-text-primary">4단계: 결과 확인 (3분)</p>
                      <p className="mt-1">
                        홈택스 자동 계산 결과 확인 → 세액(납부액 또는 환급액) 확인 → 오류 없으면 다음 단계
                        <br />
                        분납: 세액 1,000만 초과면 "분납 신청" 버튼 클릭 (6월 + 7월 2개월)
                      </p>
                    </div>

                    <div className="rounded-lg bg-bg-card p-3 border-l-4 border-l-primary-500">
                      <p className="font-semibold text-text-primary">5단계: 전자서명 & 신고 제출 (4분)</p>
                      <p className="mt-1">
                        공동인증서 또는 간편인증 재확인 → "신고" 버튼 클릭 → 신고 접수 완료 팝업 확인 (중요! 이 화면 캡처해두기)
                        <br />
                        <strong>이 버튼을 클릭한 시각이 5월 31일 자정 이전이면 정상 신고입니다.</strong>
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border-l-4 border-l-highlight-500 bg-highlight-500/5 p-4 text-sm text-text-secondary">
                  <p className="font-semibold text-text-primary">💡 당일 신고 팁</p>
                  <p className="mt-2">
                    "분납 가능한가?" 확인하며 진행하세요. 세액이 1,000만 원 초과면 5단계에서 분납 신청 체크박스가 활성화됩니다. 분납하면 가산세는 동일하나
                    6월 말 + 7월 말 2개월에 나눠 납부 가능합니다.
                  </p>
                </div>
              </section>

              {/* 3. 자정 후 신고하면? 무신고가산세 */}
              <section className="space-y-4">
                <h2 className="text-2xl font-bold">
                  3. Q. 자정 1분 후 신고하면 정확히 어떻게 되나요? 가산세는 얼마인가요?
                </h2>
                <div className="rounded-lg bg-bg-card p-3 text-sm">
                  <p className="font-semibold text-text-primary">정의</p>
                  <p className="mt-1 text-text-secondary">
                    6월 1일 00:00:01 이후 신고하면 국세기본법 §47의2(무신고가산세)에 따라 세액의 20%가 자동 부과됩니다. 다만 국세기본법 §48의
                    자진신고 감면 규정이 있어, 6월 중에 신고하면 감면 50%를 받을 수 있습니다.
                  </p>
                </div>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  무신고가산세는 <strong>"신고하지 않은 소득이 있을 때" 부과되는 패널티</strong>입니다. 세액의 20%를 기본으로 부과하며, 추적 과정에서 적발되면
                  가중치가 올라갈 수 있습니다. 다만 <strong>자진신고 감면</strong>이라는 구제 방법이 있어, 6월 중에 신고하면 감면율 50%를 받아 실질 가산세가
                  10%로 줄어듭니다.
                </p>

                <div className="space-y-3 rounded-lg bg-bg-raised p-4">
                  <p className="font-semibold text-text-primary">무신고가산세 정확 계산 (국세기본법 §47의2)</p>
                  <div className="space-y-2 text-sm text-text-secondary">
                    <div className="mb-3 rounded-lg bg-bg-card p-3">
                      <p className="font-semibold text-text-primary">시나리오: 과세표준 5,000만, 세액 624만 원</p>
                      <ul className="mt-2 list-inside list-disc space-y-1">
                        <li>5월 31일 신고: 세액 624만 원 납부 또는 환급</li>
                        <li>6월 1일 이후 신고 (기한 초과): 무신고가산세 20% 적용</li>
                        <li>가산세 = 624만 × 20% = 약 125만 원</li>
                        <li>실제 납부: 624만 + 125만 = 749만 원</li>
                      </ul>
                    </div>

                    <div className="rounded-lg bg-highlight-500/10 p-3">
                      <p className="font-semibold text-text-primary">자진신고 감면 (국세기본법 §48) — 6월 신고 시</p>
                      <ul className="mt-2 list-inside list-disc space-y-1">
                        <li className="font-semibold text-highlight-700">감면율: 50% (6월 신고 기준)</li>
                        <li>감면된 가산세 = 125만 × 50% = 약 62.5만 원</li>
                        <li className="font-semibold text-primary-600">실제 납부: 624만 + 62.5만 = 약 686.5만 원</li>
                        <li className="text-xs italic text-text-tertiary">→ 5월 신고 대비 약 62.5만 원 손해</li>
                      </ul>
                    </div>

                    <div className="rounded-lg bg-danger-500/10 p-3">
                      <p className="font-semibold text-danger-700 dark:text-danger-300">7월 이후 신고 시 감면율 강화</p>
                      <ul className="mt-2 list-inside list-disc space-y-1">
                        <li>7월 신고: 감면율 40% (감면 가산세 약 50만)</li>
                        <li>8월 신고: 감면율 30% (감면 가산세 약 37.5만)</li>
                        <li>9월 신고: 감면율 20% (감면 가산세 약 25만)</li>
                        <li className="text-xs italic">감면율이 낮아질수록 가산세 부담 증가</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border-l-4 border-l-danger-500 bg-danger-500/10 p-4 text-sm text-text-secondary">
                  <p className="font-semibold text-danger-700 dark:text-danger-300">⚠️ 추적 적발 시 가산세 50~100%</p>
                  <p className="mt-2">
                    자진신고 감면은 <strong>"스스로 신고할 때만"</strong> 적용됩니다. 만약 국세청이 세무조사로 적발하면 가산세가 50~100% 상향될 수 있습니다. 특히
                    4대보험 기록·계좌이체·원천징수 등으로 적발되면 부정행위로 판정되어 추가 가산세까지 부과됩니다.
                  </p>
                </div>
              </section>

              <AdSlot slot="guide-may-31-deadline-day-mid" format="rectangle" />

              {/* 4. 홈택스 폭주 시간대 회피 */}
              <section className="space-y-4">
                <h2 className="text-2xl font-bold">4. Q. 오후 8시 이후 홈택스가 먹통인데, 이때 신고해도 되나요?</h2>
                <div className="rounded-lg bg-bg-card p-3 text-sm">
                  <p className="font-semibold text-text-primary">정의</p>
                  <p className="mt-1 text-text-secondary">
                    5월 31일 오후 8시 이후는 홈택스 접속자가 급증해 "서버 과부하", "시간 초과" 등의 오류가 빈번합니다. 하지만 이것이 신고 기한 연장 사유가 되지는
                    않으므로, <strong>가능하면 오후 6시 이전 신고</strong>를 권장합니다.
                  </p>
                </div>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  역년도 5월 31일 오후 8시부터 자정까지는 "신고 마감 시즌"으로 국세청 서버에 동시 접속자가 수백만 명에 달합니다. 결과적으로 홈택스 페이지 로딩
                  지연, 신고 버튼 클릭 후 5~10분 지연, "서버 과부하" 오류 등이 발생합니다. <strong>국세청이 인정한 시스템 장애 증거(스크린샷 등)가 없으면 기한 연장이 불가능</strong>하므로,
                  개인의 접속 문제는 자신의 책임이 됩니다.
                </p>

                <div className="space-y-3 rounded-lg bg-bg-raised p-4">
                  <p className="font-semibold text-text-primary">홈택스 폭주 시간대 및 대응</p>
                  <div className="space-y-2 text-sm text-text-secondary">
                    <div className="rounded-lg bg-bg-card p-3">
                      <p className="font-semibold text-text-primary">오전 9시~오후 3시 (권장)</p>
                      <p className="mt-1">
                        직장인들이 근무 중이어서 접속자 수가 적음. 홈택스 로딩도 빠르고 신고 오류가 거의 없음. 가능하면 이 시간대에 신고하는 것이 가장
                        안전합니다. "당일 신고"라고 해도 마감 며칠 전부터 준비하면 이 시간대에 신고 가능합니다.
                      </p>
                    </div>

                    <div className="rounded-lg bg-bg-card p-3">
                      <p className="font-semibold text-text-primary">오후 3~8시 (주의)</p>
                      <p className="mt-1">
                        퇴근 시간부터 접속자 증가. 로딩이 약간 느려지고 간헐적 오류 가능. 불가피하면 신고 가능하지만, 여유 있다면 피하는 것을 권장합니다.
                      </p>
                    </div>

                    <div className="rounded-lg bg-danger-500/10 p-3">
                      <p className="font-semibold text-danger-700 dark:text-danger-300">오후 8시 이후 (위험)</p>
                      <p className="mt-1">
                        마감 3~4시간 전부터 극심한 폭주 시작. "서버 과부하" 오류, 신고 버튼 클릭 후 10분 이상 지연, 중도 접속 끊김 등 다양한 오류 발생.
                        <strong>오후 10시 이전 신고 완료</strong>를 강력 권장합니다.
                      </p>
                    </div>

                    <div className="rounded-lg bg-bg-card p-3 border-l-4 border-l-primary-500">
                      <p className="font-semibold text-text-primary">최후의 1시간 (23:00~24:00)</p>
                      <p className="mt-1">
                        극한의 폭주. 로그인부터 10분, 신고 버튼 클릭 후 20분 지연 가능. 이 시간에 신고를 시작하면 자정을 넘길 위험이 매우 높습니다.
                        <strong>적어도 오후 10시 이전에 신고 완료</strong>를 목표로 하세요.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border-l-4 border-l-highlight-500 bg-highlight-500/5 p-4 text-sm text-text-secondary">
                  <p className="font-semibold text-text-primary">💡 시스템 장애로 인정받으려면</p>
                  <p className="mt-2">
                    만약 오후 10시에 신고를 시작했는데 시스템 장애로 자정 이후 제출되면? 국세청에 "시스템 장애 증거"(스크린샷, 접속 기록 등)를 제출하면
                    기한 연장이 인정될 수 있습니다. 다만 개인의 인터넷 연결 끊김, 컴퓨터 오류는 인정되지 않으므로, <strong>여유 있게 오후 8시 이전 완료</strong>를
                    권장합니다.
                  </p>
                </div>
              </section>

              {/* 5. 분납 신청 */}
              <section className="space-y-4">
                <h2 className="text-2xl font-bold">5. Q. 당일 분납 신청은 가능한가요? 가산세는 어떻게 되나요?</h2>
                <div className="rounded-lg bg-bg-card p-3 text-sm">
                  <p className="font-semibold text-text-primary">정의</p>
                  <p className="mt-1 text-text-secondary">
                    분납(분할 납부)은 세액이 1,000만 원 초과할 때 가능하며, 당일 신고 시에도 분납 신청이 동시에 가능합니다. 분납 기한은 2개월(1차 6월 말, 2차
                    7월 말)이며, 분납 자체는 가산세에 영향을 주지 않습니다.
                  </p>
                </div>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  분납은 <strong>"기한 내 신고했으나 현금이 부족한 경우" 납부 기한을 연장해주는 제도</strong>입니다. 당일 신고 시 홈택스 마지막 단계에서 "분납 신청"
                  체크박스를 선택하면 자동으로 처리됩니다. 분납해도 세액 자체는 변하지 않으며, 가산세도 달라지지 않습니다. 다만 <strong>납부 기한을 넘기면 납부지연가산세</strong>가 추가로 발생합니다.
                </p>

                <div className="space-y-3 rounded-lg bg-bg-raised p-4">
                  <p className="font-semibold text-text-primary">분납 신청 조건 및 절차</p>
                  <div className="space-y-2 text-sm text-text-secondary">
                    <div className="rounded-lg bg-bg-card p-3">
                      <p className="font-semibold text-text-primary">분납 가능 조건</p>
                      <ul className="mt-2 list-inside list-disc space-y-1">
                        <li>세액 1,000만 원 초과</li>
                        <li>당일 신고 또는 기한 내 신고</li>
                        <li>홈택스 "분납 신청" 또는 세무서 방문 신청</li>
                      </ul>
                    </div>

                    <div className="rounded-lg bg-bg-card p-3">
                      <p className="font-semibold text-text-primary">분납 기한</p>
                      <ul className="mt-2 list-inside list-disc space-y-1">
                        <li>1차 분납금: 6월 말 (30일)</li>
                        <li>2차 분납금: 7월 말 (31일)</li>
                        <li>비율: 세액 1천~2천만은 1차 50% 2차 50% / 2천만 초과는 비율 다름</li>
                      </ul>
                    </div>

                    <div className="rounded-lg bg-highlight-500/10 p-3">
                      <p className="font-semibold text-text-primary">분납과 가산세의 관계</p>
                      <ul className="mt-2 list-inside list-disc space-y-1">
                        <li>
                          분납 신청 시 <strong>기한 내 신고로 인정</strong> → 무신고가산세 0원
                        </li>
                        <li>분납해도 세액 자체 변화 없음</li>
                        <li>다만 분납 기한을 놓치면 (예: 6월 말을 못 냄) 납부지연가산세 발생</li>
                        <li className="text-xs italic">납부지연가산세 = 미납액 × 일 0.022% × 기한 경과일</li>
                      </ul>
                    </div>

                    <div className="rounded-lg bg-bg-card p-3">
                      <p className="font-semibold text-text-primary">당일 분납 신청 절차</p>
                      <ul className="mt-2 list-inside list-disc space-y-1">
                        <li>홈택스 신고 5단계 중 "결과 확인" 화면에서 "분납 신청" 체크박스 선택</li>
                        <li>분납 비율 자동 계산 후 1차·2차 금액 확인</li>
                        <li>신고 제출 시 분납 신청도 함께 접수됨</li>
                        <li>6월 말·7월 말에 각각 납부 (지정 계좌 또는 카드)</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border-l-4 border-l-primary-500 bg-primary-500/5 p-4 text-sm text-text-secondary">
                  <p className="font-semibold text-text-primary">💡 분납 후 일찍 납부하면?</p>
                  <p className="mt-2">
                    분납 신청했더라도 6월에 전액 납부 가능합니다. 일찍 납부하면 납부지연가산세 절감 효과가 있으므로, 여유가 되면 1차 기한(6월 말) 전에 1차분을
                    먼저 납부하는 것이 좋습니다.
                  </p>
                </div>
              </section>

              {/* FAQ */}
              <FaqSection items={[...FAQ_ITEMS]} />

              {/* 최종 체크리스트 */}
              <section className="card">
                <h2 className="mb-4 text-lg font-semibold">📋 당일 신고 최종 체크리스트</h2>
                <div className="space-y-2 text-sm">
                  <div className="flex items-start gap-2">
                    <input type="checkbox" id="check1" className="mt-1" />
                    <label htmlFor="check1" className="text-text-secondary">
                      <strong>서류 준비:</strong> 신분증, 공동인증서 또는 휴대폰 (간편인증용)
                    </label>
                  </div>
                  <div className="flex items-start gap-2">
                    <input type="checkbox" id="check2" className="mt-1" />
                    <label htmlFor="check2" className="text-text-secondary">
                      <strong>정보 확인:</strong> 직장 사업자등록번호, 기타소득·사업소득 발급처명
                    </label>
                  </div>
                  <div className="flex items-start gap-2">
                    <input type="checkbox" id="check3" className="mt-1" />
                    <label htmlFor="check3" className="text-text-secondary">
                      <strong>시간 확보:</strong> 오전~오후 3시에 신고 예정 (폭주 회피)
                    </label>
                  </div>
                  <div className="flex items-start gap-2">
                    <input type="checkbox" id="check4" className="mt-1" />
                    <label htmlFor="check4" className="text-text-secondary">
                      <strong>신고 방식 선택:</strong> "모두채움" (자동 불러오기) 또는 "간편 신고" (최단)
                    </label>
                  </div>
                  <div className="flex items-start gap-2">
                    <input type="checkbox" id="check5" className="mt-1" />
                    <label htmlFor="check5" className="text-text-secondary">
                      <strong>공제 추가:</strong> 부양가족, 의료비, 신용카드, 기부금 필수 입력 항목 확인
                    </label>
                  </div>
                  <div className="flex items-start gap-2">
                    <input type="checkbox" id="check6" className="mt-1" />
                    <label htmlFor="check6" className="text-text-secondary">
                      <strong>분납 여부:</strong> 세액 1,000만 초과면 분납 신청 옵션 선택
                    </label>
                  </div>
                  <div className="flex items-start gap-2">
                    <input type="checkbox" id="check7" className="mt-1" />
                    <label htmlFor="check7" className="text-text-secondary">
                      <strong>신고 완료 증명:</strong> "신고 완료" 팝업 캡처 (환급·가산세 분쟁 시 증거)
                    </label>
                  </div>
                  <div className="flex items-start gap-2">
                    <input type="checkbox" id="check8" className="mt-1" />
                    <label htmlFor="check8" className="text-text-secondary">
                      <strong>환급금 추적:</strong> 신고 후 홈택스 "신고 현황" → "환급 여부" 확인 (3~5일)
                    </label>
                  </div>
                </div>
              </section>

              {/* 관련 링크 */}
              <section className="card">
                <h2 className="mb-4 text-lg font-semibold">📊 관련 계산기·가이드</h2>
                <ul className="space-y-2 text-sm">
                  <li>
                    →{' '}
                    <Link href="/calculator/salary/" className="text-primary-600 underline dark:text-primary-500">
                      연봉 실수령액 계산기
                    </Link>
                    {' '}— 당일 신고 전 세액 확인
                  </li>
                  <li>
                    →{' '}
                    <Link href="/calculator/freelancer-tax/" className="text-primary-600 underline dark:text-primary-500">
                      프리랜서 종합소득세 계산기
                    </Link>
                    {' '}— 기타소득·사업소득 세액 시뮬
                  </li>
                  <li>
                    →{' '}
                    <Link href="/guide/may-comprehensive-income-tax/" className="text-primary-600 underline dark:text-primary-500">
                      5월 종합소득세 신고 완벽 가이드
                    </Link>
                    {' '}— 신고 대상·절세·환급
                  </li>
                  <li>
                    →{' '}
                    <Link href="/guide/income-tax-late-filing-penalty-2026/" className="text-primary-600 underline dark:text-primary-500">
                      종합소득세 무신고 가산세 정확 계산
                    </Link>
                    {' '}— 자진신고 감면 가능성
                  </li>
                  <li>
                    →{' '}
                    <Link href="/guide/income-tax-installment-payment-2026/" className="text-primary-600 underline dark:text-primary-500">
                      종합소득세 분납 신청 가이드
                    </Link>
                    {' '}— 분납 기한·절차·이점
                  </li>
                </ul>
              </section>

              <ShareButtons
                title="5월 31일 마감 당일 종합소득세 신고 2026"
                url={URL}
                description="마감 1시간 남았다면? 빠른 신고 5단계·자정 제출·무신고가산세 0원 회피·분납 신청."
              />

              {/* 출처 및 면책 */}
              <section
                aria-label="출처 및 면책"
                className="rounded-lg border border-border-base p-4 text-caption text-text-tertiary"
              >
                <p className="mb-2">
                  <strong>법적 근거</strong>: 소득세법 §70 (확정신고 기한) · 국세기본법 §47의2 (무신고가산세) · 국세기본법 §48
                  (자진신고 감면·기한 연장) · 국세기본법 §51-§52 (환급 절차). 참고:{' '}
                  <a
                    href="https://www.hometax.go.kr/guide/0202000000.jsp"
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="text-primary-600 underline dark:text-primary-500"
                  >
                    국세청 종합소득세 신고 안내
                  </a>
                  ,{' '}
                  <a
                    href="https://www.nts.go.kr"
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="text-primary-600 underline dark:text-primary-500"
                  >
                    국세청 (nts.go.kr)
                  </a>
                  .
                </p>
                <p className="mb-2">
                  <strong>면책 조항</strong>: 본 가이드는 정보 제공 목적이며 세무·법적 조언이 아닙니다. 당일 신고 시 발생 가능한 시스템 오류·홈택스 폭주로 인한
                  기한 초과에 대해 calculatorhost는 책임지지 않습니다. 정확한 신고를 위해 국세청 상담(☎ 1330) 또는 세무사 문의를 권장합니다.
                </p>
                <p>
                  <strong>AI 보조 작성</strong>: 본 가이드는 AI 보조 작성 후 운영자 검수를 거쳤습니다(Google AI Content Policy
                  준수). 업데이트: {DATE_MODIFIED}
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
