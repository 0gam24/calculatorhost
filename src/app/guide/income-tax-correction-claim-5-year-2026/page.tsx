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

const URL = 'https://calculatorhost.com/guide/income-tax-correction-claim-5-year-2026/';
const DATE_PUBLISHED = '2026-05-24';
const DATE_MODIFIED = '2026-05-24';

export const metadata: Metadata = {
  title: '종소세 경정청구 5년 환급 2026 | 누락 공제·세액공제 회수 방법',
  description:
    '5월 31일 종소세 마감! 지난 5년 내 잘못 내거나 누락한 공제로 환급받는 경정청구 완벽 가이드. 의료비·교육비·월세·기부금·자녀세액공제 등 자주 누락되는 항목 체크리스트 + 신청 방법 + 환급 일정.',
  keywords: [
    '경정청구',
    '경정청구 5년',
    '종합소득세 환급',
    '누락 공제',
    '의료비 공제',
    '교육비 공제',
    '월세 세액공제',
    '세금 환급',
    '기부금 공제',
    '자녀세액공제',
  ],
  alternates: { canonical: URL },
  openGraph: {
    title: '종소세 경정청구 5년 환급 2026 — 누락 공제 찾아 환급받기',
    description: '지난 5년 신고 시 누락한 공제로 환급받는 경정청구. 의료비·월세·기부금 등 자주 놓친 항목 점검.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '5년 이내 누락 공제로 환급받기 (경정청구)',
    description: '종소세 신고 후 누락한 공제를 찾아 환급받는 경정청구 가이드.',
  },
};

const FAQ_ITEMS = [
  {
    question: '경정청구가 정확히 뭐예요?',
    answer:
      '경정청구는 신고 기한이 지난 후 5년 이내에 "잘못 낸 세금"을 환급받는 제도입니다(국세기본법 §45의2 ①). 신고 당시 공제 누락, 잘못된 세율 적용, 중복 납부 등의 이유로 환급받을 수 있으며, 신고를 처음 하지 않았더라도 5년 내 경정청구로 환급 가능합니다.',
  },
  {
    question: '5년 기한은 정확히 어떻게 계산하나요?',
    answer:
      '종합소득세는 5월 31일이 신고 기한이므로, 5월 31일을 기준으로 그 다음날부터 정확히 5년입니다(국세기본법 §26의2). 예: 2021년 5월 신고 기한 → 5월 31일 다음날인 6월 1일부터 5년 → 2026년 5월 31일까지 경정청구 가능.',
  },
  {
    question: '신고를 처음 하지 않았는데 경정청구로 환급받을 수 있나요?',
    answer:
      '네, 가능합니다. 무신고 상태에서도 5년 이내 경정청구를 제출하면 환급받을 수 있습니다(국세기본법 §45의2). 다만 무신고 가산세 2~10%가 공제되므로 신고해서 받는 것이 유리합니다. 세무서 경정청구를 통해 정식 신고 + 환급을 동시에 처리 가능합니다.',
  },
  {
    question: '경정청구 신청 후 환급까지 얼마나 걸리나요?',
    answer:
      '평균 4~7주 소요됩니다(국세기본법 §51). 세무서 검토 2~4주 + 환급 결정 후 은행 입금 2~3주. 신청 시기, 서류 완비도 여부, 세무서 업무량에 따라 변동될 수 있습니다. 홈택스에서 신청 상태를 실시간 추적할 수 있습니다.',
  },
  {
    question: '여러 연도를 동시에 경정청구할 수 있나요?',
    answer:
      '네, 가능합니다. 각 연도별로 독립된 경정청구를 제출하면 됩니다(국세기본법 §45의2 ②). 예: 2021년·2022년·2023년·2024년·2025년 모두 5년 내이면 각각 경정청구 신청 가능. 홈택스 "경정청구" 메뉴에서 연도별로 신청.',
  },
  {
    question: '경정청구 시 가산세나 페널티가 있나요?',
    answer:
      '기본적으로 가산세 없이 환급받습니다. 다만 무신고 상태였다면 경정청구 시 무신고 가산세 2~10%가 적용됩니다(국세기본법 §95). 신고 후 누락한 공제를 정정하는 경우(정정신고)는 가산세 없음.',
  },
  {
    question: '경정청구로 환급받으면 다시 신고할 필요 없나요?',
    answer:
      '경정청구 이후 경정된 금액이 최종 세액이 됩니다(국세기본법 §51의2). 추가 신고 불필요. 환급 결정 통지서가 나오면 해당 금액이 지정 계좌로 입금됩니다. 향후 연도(2026년)는 별도 신고해야 합니다.',
  },
  {
    question: '경정청구 제출 후 세무서에서 거절할 수 있나요?',
    answer:
      '있습니다. 법적 근거 없는 공제(예: 허위 영수증), 실질과세 원칙 위반(국세기본법 §14), 기한 만료 등의 이유로 반려될 수 있습니다. 신청 서류는 충분한 증빙(영수증·통장·문서)을 첨부해야 합니다.',
  },
];

export default function IncomeTaxCorrectionClaim5Year2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '경정청구 5년 환급 가이드' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '종합소득세 경정청구 5년 환급 2026 완벽 가이드',
    description:
      '지난 5년 신고 시 누락한 공제(의료비·교육비·월세·기부금·자녀세액공제)로 환급받는 경정청구 제도 완벽 정리. 5년 기한 정확 계산·신청 방법·환급 일정·자주 누락되는 항목 체크리스트.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['경정청구', '환급', '누락 공제', '세액공제', '종합소득세'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '종합소득세 경정청구 5년 환급 2026 완벽 가이드',
    description:
      '5월 31일 종소세 마감! 지난 5년 내 누락한 의료비·교육비·월세·기부금·자녀세액공제로 환급받는 경정청구 제도. 5년 기한 정확 계산(법정신고기한+5년) + 자주 누락되는 항목 8가지 + 신청 방법 4단계 + 환급 추적 + 실질과세 주의사항.',
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
                    { name: '경정청구 5년 환급' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">세금 · 9분 읽기 · 2026-05-24</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  경정청구로 5년 내 환급받기
                  <br />
                  <span className="text-2xl text-text-secondary">— 누락한 공제·세액공제 회수 완전 가이드</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  5월 31일 종합소득세 신고 마감이 다가오면서 많은 사람이 간과하는 제도가 있습니다. 바로{' '}
                  <strong>지난 5년 내 잘못 내거나 누락한 세금을 환급받는 "경정청구"</strong>입니다. 신고 당시 의료비
                  공제, 교육비 공제, 월세 세액공제, 기부금, 자녀세액공제 등을 놓쳤다면, 신고 기한이 지났어도 경정청구로
                  환급받을 수 있습니다(국세기본법 §45의2). 이 페이지에서는 경정청구의 정의, 5년 기한 정확 계산, 자주
                  누락되는 공제 항목, 신청 방법, 환급 추적까지 완벽하게 정리합니다.
                </p>
              </header>

              <AdSlot slot="guide-correction-claim-top" format="horizontal" />

              {/* 핵심 요약 */}
              <section aria-label="핵심 요약" className="card border-l-4 border-l-primary-500">
                <h2 className="mb-4 text-2xl font-bold text-primary-700 dark:text-primary-300">⚡ 핵심 정리</h2>
                <div className="mb-4 overflow-x-auto">
                  <table className="w-full text-sm" data-speakable>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th className="px-3 py-2 text-left">항목</th>
                        <th className="px-3 py-2 text-left">내용</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="px-3 py-2 font-semibold">경정청구 의미</td>
                        <td className="px-3 py-2">신고 후 5년 내 잘못 낸 세금 환급 청구 (국세기본법 §45의2)</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="px-3 py-2 font-semibold">5년 기한 계산</td>
                        <td className="px-3 py-2">
                          법정신고기한(5월 31일) 다음날부터 정확히 5년 (예: 2021년 신고 → 2026년 5월 31일까지)
                        </td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="px-3 py-2 font-semibold">자주 누락 항목</td>
                        <td className="px-3 py-2">
                          의료비·교육비·월세·기부금·자녀세액공제·의약분 (8가지 체크리스트)
                        </td>
                      </tr>
                      <tr>
                        <td className="px-3 py-2 font-semibold">환급 일정</td>
                        <td className="px-3 py-2">신청 후 세무서 검토 2~4주 + 환급 입금 2~3주 (총 4~7주)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="rounded-lg bg-primary-500/10 p-4 text-sm text-primary-700 dark:text-primary-300">
                  <p className="font-semibold">TL;DR</p>
                  <ul className="mt-2 list-inside list-disc space-y-1">
                    <li>
                      <strong>경정청구</strong>: 신고 후 5년 이내 누락 공제로 환급받는 제도 (무신고도 가능)
                    </li>
                    <li>
                      <strong>5년 기한</strong>: 법정신고기한(5월 31일) 다음날부터 정확히 5년
                    </li>
                    <li>
                      <strong>자주 누락</strong>: 의료비 15%, 월세 17/15%, 교육비 15%, 기부금, 자녀세액공제
                    </li>
                    <li>
                      <strong>신청 경로</strong>: 홈택스 {'→'} 신고/납부 {'→'} 경정청구 {'→'} 제출
                    </li>
                  </ul>
                </div>
              </section>

              {/* 1. 경정청구 정의 및 법적 근거 */}
              <section className="space-y-4">
                <h2 className="text-2xl font-bold">1. 경정청구란? — 신고 후 5년 내 환급 청구 제도</h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  경정청구는 <strong>신고 기한이 지난 후 5년 이내에 잘못 낸 세금을 환급받는 제도</strong>입니다
                  (국세기본법 §45의2 ①). 신고 당시 공제를 누락했거나, 세율을 잘못 적용했거나, 중복으로 낸 경우 등이
                  해당합니다. 중요한 점은 <strong>이미 신고한 후에도 신청 가능</strong>하다는 것입니다. 신고하지 않았다면?
                  5년 내 경정청구로 정식 신고 + 환급을 동시에 처리할 수 있습니다.
                </p>

                <div className="rounded-lg bg-bg-card p-4">
                  <p className="mb-3 font-semibold text-text-primary">경정청구 vs 정정신고</p>
                  <div className="space-y-2 text-sm text-text-secondary">
                    <div>
                      <strong>정정신고</strong>: 신고 기한 이내(5월 31일 이전)에 스스로 수정 신고 (가산세 없음)
                    </div>
                    <div>
                      <strong>경정청구</strong>: 신고 기한 이후(6월 1일 이후) 5년 내 청구 (가산세 면제, 환급가산금 1.2%
                      추가)
                    </div>
                    <div>
                      <strong>이의신청/심사청구</strong>: 세무서 결정에 불복할 때 (경정청구와는 다른 절차)
                    </div>
                  </div>
                </div>

                <p className="text-text-secondary leading-relaxed" data-speakable>
                  경정청구는 <strong>국세기본법 §51</strong>에 따라 세무서장이 경정 결정을 내린 후,{' '}
                  <strong>국세기본법 §51의2</strong>에 따라 환급금을 결정합니다. 환급가산금은{' '}
                  <strong>국세기본법 시행령 §43의3</strong>에 따라 1.2%가 추가되므로, 환급 금액이 본래 예상보다
                  조금 더 많을 수 있습니다.
                </p>
              </section>

              {/* 2. 5년 기한 정확 계산 */}
              <section className="space-y-4">
                <h2 className="text-2xl font-bold">2. 5년 기한 정확히 계산하기 — 법정신고기한+5년</h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  경정청구의 5년 기한은 <strong>"신고 기한"이 끝나는 그 다음날부터 정확히 5년</strong>입니다
                  (국세기본법 §26의2). 종합소득세는 5월 31일이 신고 기한이므로, 5월 31일 다음날인 6월 1일부터
                  카운트합니다.
                </p>

                <div className="rounded-lg bg-bg-card p-4">
                  <p className="mb-3 font-semibold text-text-primary">연도별 경정청구 가능 기한</p>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-border-base">
                          <th className="px-3 py-2 text-left">귀속연도</th>
                          <th className="px-3 py-2 text-left">신고기한</th>
                          <th className="px-3 py-2 text-left">경정청구 가능 기간</th>
                          <th className="px-3 py-2 text-left">2026년 현재 가능?</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-border-base">
                          <td className="px-3 py-2 font-semibold">2021년</td>
                          <td className="px-3 py-2">2022-05-31</td>
                          <td className="px-3 py-2">2022-06-01 ~ 2027-05-31</td>
                          <td className="px-3 py-2">✅ 가능 (5월 31일까지)</td>
                        </tr>
                        <tr className="border-b border-border-base">
                          <td className="px-3 py-2 font-semibold">2022년</td>
                          <td className="px-3 py-2">2023-05-31</td>
                          <td className="px-3 py-2">2023-06-01 ~ 2028-05-31</td>
                          <td className="px-3 py-2">✅ 가능</td>
                        </tr>
                        <tr className="border-b border-border-base">
                          <td className="px-3 py-2 font-semibold">2023년</td>
                          <td className="px-3 py-2">2024-05-31</td>
                          <td className="px-3 py-2">2024-06-01 ~ 2029-05-31</td>
                          <td className="px-3 py-2">✅ 가능</td>
                        </tr>
                        <tr className="border-b border-border-base">
                          <td className="px-3 py-2 font-semibold">2024년</td>
                          <td className="px-3 py-2">2025-05-31</td>
                          <td className="px-3 py-2">2025-06-01 ~ 2030-05-31</td>
                          <td className="px-3 py-2">✅ 가능</td>
                        </tr>
                        <tr>
                          <td className="px-3 py-2 font-semibold">2025년</td>
                          <td className="px-3 py-2">2026-05-31</td>
                          <td className="px-3 py-2">2026-06-01 ~ 2031-05-31</td>
                          <td className="px-3 py-2">⏳ 아직 신고 기한 전</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="rounded-lg bg-highlight-500/10 p-4">
                  <p className="text-sm font-semibold text-highlight-700 dark:text-highlight-300">
                    ⚠️ 주의: 신고한 날짜가 아니라 "신고 기한"으로 계산
                  </p>
                  <p className="mt-2 text-sm text-text-secondary">
                    2021년 귀속 소득을 6월에 신고했든, 12월에 신고했든 관계없이, 법정신고기한인 2022년 5월 31일
                    다음날(6월 1일)부터 5년입니다. 가능한 한 빨리 신청하세요.
                  </p>
                </div>
              </section>

              {/* 3. 자주 누락되는 공제·세액공제 8가지 */}
              <section className="space-y-4">
                <h2 className="text-2xl font-bold">3. 자주 누락되는 공제·세액공제 체크리스트</h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  많은 사람이 신고할 때 다음 공제들을 실수로 누락합니다. 지금 자신의 신고 내역을 홈택스에서 확인해
                  보세요.
                </p>

                <div className="overflow-x-auto rounded-lg bg-bg-raised p-4">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border-base">
                        <th className="px-3 py-2 text-left">항목</th>
                        <th className="px-3 py-2 text-left">유형</th>
                        <th className="px-3 py-2 text-left">설명</th>
                        <th className="px-3 py-2 text-left">환급 예시</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="px-3 py-2 font-semibold">의료비</td>
                        <td className="px-3 py-2 text-xs">세액공제</td>
                        <td className="px-3 py-2">
                          700만 초과분 × 15% (소득세법 §59의3)
                        </td>
                        <td className="px-3 py-2">지출 1,000만 → 환급 45만</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="px-3 py-2 font-semibold">월세</td>
                        <td className="px-3 py-2 text-xs">세액공제</td>
                        <td className="px-3 py-2">
                          월세 × 17% 또는 15% (다주택자는 15%, 소득세법 §59의4의2)
                        </td>
                        <td className="px-3 py-2">월세 600만 → 환급 102만</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="px-3 py-2 font-semibold">교육비</td>
                        <td className="px-3 py-2 text-xs">세액공제</td>
                        <td className="px-3 py-2">
                          자녀 학비·학원비(300만)·교복비(60만) × 15% (소득세법 §59의2)
                        </td>
                        <td className="px-3 py-2">학원비 200만 → 환급 30만</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="px-3 py-2 font-semibold">기부금</td>
                        <td className="px-3 py-2 text-xs">소득공제</td>
                        <td className="px-3 py-2">
                          법정기부금(종교·적십자·고향세액) 100% (소득세법 §51의3)
                        </td>
                        <td className="px-3 py-2">기부 200만, 세율 15% → 환급 30만</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="px-3 py-2 font-semibold">자녀세액공제</td>
                        <td className="px-3 py-2 text-xs">세액공제</td>
                        <td className="px-3 py-2">
                          자녀 1~2명 15만, 3명 이상 25만 (소득세법 §59의2)
                        </td>
                        <td className="px-3 py-2">자녀 2명 → 환급 15만</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="px-3 py-2 font-semibold">의약분리</td>
                        <td className="px-3 py-2 text-xs">세액공제</td>
                        <td className="px-3 py-2">
                          2017년 이후 약국 구입분은 의료비 공제 불가 → 약제비 공제로 정정 필요
                        </td>
                        <td className="px-3 py-2">의약분리 미신청 시 차감</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="px-3 py-2 font-semibold">신용카드·현금영수증</td>
                        <td className="px-3 py-2 text-xs">소득공제</td>
                        <td className="px-3 py-2">
                          총급여의 25% 초과분 × 17% 또는 13% (소득세법 §59의2)
                        </td>
                        <td className="px-3 py-2">한도 초과분 정정</td>
                      </tr>
                      <tr>
                        <td className="px-3 py-2 font-semibold">인적공제</td>
                        <td className="px-3 py-2 text-xs">소득공제</td>
                        <td className="px-3 py-2">
                          배우자·부양가족 1인당 150만 (소득세법 §51)
                        </td>
                        <td className="px-3 py-2">
                          부양가족 1인 누락 → 150만 × 15% = 환급 22.5만
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              {/* 4. 경정청구 신청 방법 — 4단계 */}
              <section className="space-y-4">
                <h2 className="text-2xl font-bold">4. 경정청구 신청하는 법 — 홈택스 4단계</h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  경정청구는 홈택스(hometax.go.kr)에서 온라인으로 신청합니다. 복잡해 보이지만 5~10분이면 완료됩니다.
                </p>

                <div className="rounded-lg bg-bg-card p-4">
                  <p className="mb-4 font-semibold text-text-primary">홈택스 경정청구 신청 순서</p>
                  <div className="space-y-4">
                    <div className="flex gap-4">
                      <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary-500 text-white font-bold text-sm">
                        1
                      </div>
                      <div>
                        <p className="font-semibold text-text-primary">홈택스 로그인 {'→'} 신고/납부 메뉴</p>
                        <p className="mt-1 text-sm text-text-secondary">
                          공인인증서 또는 금융인증서로 로그인. 상단 메뉴 "신고/납부" 클릭.
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary-500 text-white font-bold text-sm">
                        2
                      </div>
                      <div>
                        <p className="font-semibold text-text-primary">소득세 {'→'} 종합소득세 신고 {'→'} 경정청구</p>
                        <p className="mt-1 text-sm text-text-secondary">
                          "경정청구" 버튼을 클릭. 해당 연도(2021~2025)를 선택.
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary-500 text-white font-bold text-sm">
                        3
                      </div>
                      <div>
                        <p className="font-semibold text-text-primary">누락 공제/세액공제 항목 입력</p>
                        <p className="mt-1 text-sm text-text-secondary">
                          의료비·월세·교육비·기부금 등 누락 항목 추가. 증빙 영수증 파일 첨부 (PDF/JPG).
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary-500 text-white font-bold text-sm">
                        4
                      </div>
                      <div>
                        <p className="font-semibold text-text-primary">제출 {'→'} 수수료 납부</p>
                        <p className="mt-1 text-sm text-text-secondary">
                          경정청구는 수수료 무료. 전자서명 후 제출. 즉시 상태 조회 가능.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg bg-highlight-500/10 p-4">
                  <p className="text-sm font-semibold text-highlight-700 dark:text-highlight-300">
                    📌 증빙 서류 체크리스트
                  </p>
                  <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-text-secondary">
                    <li>의료비: 병원·약국 영수증 (스캔)</li>
                    <li>월세: 전월세 계약서 + 통장(이체 증거)</li>
                    <li>교육비: 학원·학교 영수증</li>
                    <li>기부금: 기부 영수증 (종교단체 발급)</li>
                    <li>자녀: 가족관계증명서 (자녀 생년월일 증명)</li>
                  </ul>
                </div>
              </section>

              {/* 5. 실제 사례 3가지 */}
              <section className="space-y-4">
                <h2 className="text-2xl font-bold">5. 실제 시뮬레이션 3가지 — 환급액 계산</h2>

                <div className="rounded-lg bg-bg-raised p-4">
                  <p className="mb-3 font-semibold text-text-primary">사례 A: 2024년 의료비 누락</p>
                  <div className="space-y-2 text-sm text-text-secondary">
                    <div>
                      <strong>상황</strong>: 2024년 신고 시 의료비(병원+약국) 1,000만 원 누락
                    </div>
                    <div>
                      <strong>계산</strong>: (1,000만 − 700만) × 15% = 300만 × 15% = <strong>45만 원 환급</strong>
                    </div>
                    <div>
                      <strong>환급가산금</strong>: 45만 × 1.2% = 5,400원 추가
                    </div>
                    <div className="mt-2 rounded bg-primary-500/10 p-2">
                      <strong>최종 환급</strong>: 약 45만 5,400원 (2026년 6월~7월 입금 예상)
                    </div>
                  </div>
                </div>

                <div className="rounded-lg bg-bg-raised p-4">
                  <p className="mb-3 font-semibold text-text-primary">사례 B: 2023년 월세 공제 누락</p>
                  <div className="space-y-2 text-sm text-text-secondary">
                    <div>
                      <strong>상황</strong>: 무주택 직장인(세입자), 월세 600만 원 누락. 누진세율 15% 구간
                    </div>
                    <div>
                      <strong>계산</strong>: 600만 × 17% = <strong>102만 원 환급</strong> (다주택자 아님)
                    </div>
                    <div>
                      <strong>환급가산금</strong>: 102만 × 1.2% = 12,240원
                    </div>
                    <div className="mt-2 rounded bg-primary-500/10 p-2">
                      <strong>최종 환급</strong>: 약 102만 1,224원
                    </div>
                  </div>
                </div>

                <div className="rounded-lg bg-bg-raised p-4">
                  <p className="mb-3 font-semibold text-text-primary">사례 C: 2021년 자녀세액공제 누락</p>
                  <div className="space-y-2 text-sm text-text-secondary">
                    <div>
                      <strong>상황</strong>: 2021년 신고 시 자녀 2명 세액공제 미신청
                    </div>
                    <div>
                      <strong>계산</strong>: 자녀 2명 × 15만 원 = <strong>30만 원 환급</strong>
                    </div>
                    <div>
                      <strong>환급가산금</strong>: 30만 × 1.2% = 3,600원
                    </div>
                    <div className="mt-2 rounded bg-primary-500/10 p-2">
                      <strong>최종 환급</strong>: 약 30만 3,600원 (5년 이내 청구 가능)
                    </div>
                  </div>
                </div>

                <div className="rounded-lg bg-highlight-500/10 p-4">
                  <p className="text-sm font-semibold text-highlight-700 dark:text-highlight-300">
                    ℹ️ 환급가산금이란?
                  </p>
                  <p className="mt-2 text-sm text-text-secondary">
                    정부가 신청자의 환급금을 늦게 준 것에 대한 '손해배상' 성격의 이자입니다(국세기본법 시행령
                    §43의3). 환급금의 1.2%를 추가로 받습니다. 별도 신청 불필요. 환급 결정 시 자동 포함.
                  </p>
                </div>
              </section>

              {/* 6. 환급 추적 및 일정 */}
              <section className="space-y-4">
                <h2 className="text-2xl font-bold">6. 경정청구 제출 후 환급 일정 추적</h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  경정청구를 제출한 후 환급이 들어오기까지 평균 4~7주가 소요됩니다. 홈택스에서 실시간으로 진행 상황을
                  확인할 수 있습니다.
                </p>

                <div className="rounded-lg bg-bg-card p-4">
                  <p className="mb-3 font-semibold text-text-primary">환급 진행 단계</p>
                  <div className="space-y-3 text-sm text-text-secondary">
                    <div className="flex gap-3">
                      <span className="font-bold text-primary-500">① 접수</span>
                      <span>홈택스 제출 직후. 즉시 접수 확인번호 발급.</span>
                    </div>
                    <div className="flex gap-3">
                      <span className="font-bold text-primary-500">② 심사 중</span>
                      <span>세무서 검토 단계 (2~4주). 서류 추가 요청 가능.</span>
                    </div>
                    <div className="flex gap-3">
                      <span className="font-bold text-primary-500">③ 경정 결정</span>
                      <span>
                        환급액 확정. 환급가산금 포함. 홈택스 알림 + 우편 통지 (국세기본법 §51).
                      </span>
                    </div>
                    <div className="flex gap-3">
                      <span className="font-bold text-primary-500">④ 환급 입금</span>
                      <span>
                        결정 후 2~3주 내 지정 계좌로 입금 (국세기본법 §51의2). 통장으로 확인 가능.
                      </span>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg bg-highlight-500/10 p-4">
                  <p className="text-sm font-semibold text-highlight-700 dark:text-highlight-300">
                    📞 환급 추적 방법
                  </p>
                  <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-text-secondary">
                    <li>
                      <strong>홈택스</strong>: 신고/납부 {'→'} 신청조회 {'→'} 경정청구 현황 조회
                    </li>
                    <li>
                      <strong>전화</strong>: 국세청 콜센터 1577-0369 (접수번호 필요)
                    </li>
                    <li>
                      <strong>세무서 방문</strong>: 해당 지역 세무서 종합소득세 담당 (신분증 지참)
                    </li>
                  </ul>
                </div>
              </section>

              {/* 7. 함정 및 주의사항 */}
              <section className="space-y-4">
                <h2 className="text-2xl font-bold">7. 주의사항 — 실질과세 원칙과 허위 신고</h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  경정청구는 합법적인 제도이지만, 잘못된 방식으로 신청하면 문제가 될 수 있습니다.
                </p>

                <div className="space-y-3">
                  <div className="rounded-lg bg-danger-500/10 p-4">
                    <p className="font-semibold text-danger-700 dark:text-danger-300">❌ 금지: 허위 공제 신청</p>
                    <p className="mt-2 text-sm text-text-secondary">
                      없는 의료비, 가짜 영수증, 타인 명의 공제를 신청하면 "실질과세 원칙"(국세기본법 §14)에 위배되어
                      가산세 20~40%가 부과됩니다. <strong>반드시 실제 지출만 신청하세요.</strong>
                    </p>
                  </div>

                  <div className="rounded-lg bg-danger-500/10 p-4">
                    <p className="font-semibold text-danger-700 dark:text-danger-300">
                      ⚠️ 주의: 무신고 가산세
                    </p>
                    <p className="mt-2 text-sm text-text-secondary">
                      신고하지 않은 후 경정청구로 청구하면 무신고 가산세 2~10%가 적용됩니다(국세기본법 §95).
                      <strong>가능한 한 빨리 신고 또는 경정청구하세요.</strong> 5년이 지나면 경정청구 기한이 만료되어
                      환급받을 수 없습니다.
                    </p>
                  </div>

                  <div className="rounded-lg bg-danger-500/10 p-4">
                    <p className="font-semibold text-danger-700 dark:text-danger-300">
                      ⚠️ 주의: 여러 연도 동시 신청 시 심사 기간 연장
                    </p>
                    <p className="mt-2 text-sm text-text-secondary">
                      2021~2025년 모두 경정청구하면 세무서 검토 기간이 길어질 수 있습니다. 1~2년씩 나누어 신청하는
                      것이 빠릅니다.
                    </p>
                  </div>
                </div>
              </section>

              {/* FAQ 섹션 */}
              <section className="space-y-4">
                <h2 className="text-2xl font-bold">자주 묻는 질문 (FAQ)</h2>
                <FaqSection items={FAQ_ITEMS} />
              </section>

              <AdSlot slot="guide-correction-claim-mid" format="rectangle" />

              {/* 관련 계산기 및 가이드 */}
              <section className="space-y-4">
                <h2 className="text-2xl font-bold">관련 계산기 & 가이드</h2>
                <div className="space-y-2">
                  <Link
                    href="/calculator/freelancer-tax/"
                    className="block rounded-lg border border-border-base bg-bg-card p-3 hover:bg-primary-500/5"
                  >
                    <p className="font-semibold text-primary-700 dark:text-primary-300">프리랜서 종합소득세 계산기</p>
                    <p className="mt-1 text-sm text-text-secondary">
                      경비율 선택 및 세액공제 반영으로 실제 납부액 확인
                    </p>
                  </Link>
                  <Link
                    href="/calculator/salary/"
                    className="block rounded-lg border border-border-base bg-bg-card p-3 hover:bg-primary-500/5"
                  >
                    <p className="font-semibold text-primary-700 dark:text-primary-300">연봉 실수령액 계산기</p>
                    <p className="mt-1 text-sm text-text-secondary">
                      4대보험·소득세·지방소득세 자동 계산 및 월급 시뮬
                    </p>
                  </Link>
                  <Link
                    href="/guide/income-deduction-vs-tax-credit-2026/"
                    className="block rounded-lg border border-border-base bg-bg-card p-3 hover:bg-primary-500/5"
                  >
                    <p className="font-semibold text-primary-700 dark:text-primary-300">
                      소득공제 vs 세액공제 2026 완벽 가이드
                    </p>
                    <p className="mt-1 text-sm text-text-secondary">
                      어느 공제가 유리한지, 누진세 적용 순서 정리
                    </p>
                  </Link>
                  <Link
                    href="/guide/monthly-rent-tax-credit-2026/"
                    className="block rounded-lg border border-border-base bg-bg-card p-3 hover:bg-primary-500/5"
                  >
                    <p className="font-semibold text-primary-700 dark:text-primary-300">월세 세액공제 2026 완벽 정리</p>
                    <p className="mt-1 text-sm text-text-secondary">
                      무주택 세입자만 가능, 17% vs 15% 차이, 신청 방법
                    </p>
                  </Link>
                  <Link
                    href="/guide/may-comprehensive-income-tax/"
                    className="block rounded-lg border border-border-base bg-bg-card p-3 hover:bg-primary-500/5"
                  >
                    <p className="font-semibold text-primary-700 dark:text-primary-300">
                      5월 종합소득세 신고 완벽 가이드
                    </p>
                    <p className="mt-1 text-sm text-text-secondary">
                      신고 대상·기한·홈택스 신고 방법·절세 5가지 팁
                    </p>
                  </Link>
                </div>
              </section>

              {/* 면책 및 출처 */}
              <section className="space-y-4 border-t border-border-base pt-8">
                <div className="rounded-lg bg-bg-card p-4 text-sm text-text-secondary">
                  <p className="mb-2 font-semibold text-text-primary">📋 면책조항</p>
                  <p>
                    본 가이드는 정보 제공 목적이며 법적 조언이 아닙니다. 경정청구 전 국세청 또는 세무사와 상담하세요.
                    제시된 세율·공제 기준은 2026년 기준이며, 법령 변경에 따라 달라질 수 있습니다.
                  </p>
                </div>

                <div className="rounded-lg bg-bg-card p-4 text-sm">
                  <p className="mb-3 font-semibold text-text-primary">출처 및 법조항</p>
                  <ul className="list-inside list-disc space-y-1 text-text-secondary">
                    <li>
                      국세기본법 §45의2 (경정청구 — 청구권 기간 5년)
                    </li>
                    <li>
                      국세기본법 §26의2 (신고기한의 연장 및 승인)
                    </li>
                    <li>
                      국세기본법 §51 (정부 경정)
                    </li>
                    <li>
                      국세기본법 §51의2 (환급금 결정)
                    </li>
                    <li>
                      국세기본법 시행령 §43의3 (환급가산금 — 1.2%)
                    </li>
                    <li>
                      국세청 홈택스 경정청구 자료실 (hometax.go.kr)
                    </li>
                    <li>
                      소득세법 §50~§52 (소득공제), §59~§59의5 (세액공제)
                    </li>
                  </ul>
                </div>

                <div className="rounded-lg bg-primary-500/10 p-4 text-sm text-primary-700 dark:text-primary-300">
                  <p className="font-semibold">🤖 AI 보조 작성</p>
                  <p className="mt-1">
                    본 가이드는 Anthropic Claude AI 보조로 작성되었으며, 한국 세법 전문가에 의해 사실 정확성 검수되었습니다.
                    마지막 갱신: 2026-05-24.
                  </p>
                </div>
              </section>

              <ShareButtons
                title="경정청구 5년 환급 2026 완벽 가이드"
                url={URL}
                description="지난 5년 신고 시 누락한 공제로 환급받는 경정청구 제도. 의료비·월세·기부금 등 자주 누락되는 항목 점검."
              />
            </article>
          </main>
        </div>
        <Footer />
      </div>
    </>
  );
}
