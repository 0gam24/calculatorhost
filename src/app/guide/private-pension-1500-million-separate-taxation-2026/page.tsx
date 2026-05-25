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

const URL = 'https://calculatorhost.com/guide/private-pension-1500-million-separate-taxation-2026/';
const DATE_PUBLISHED = '2026-05-23';
const DATE_MODIFIED = '2026-05-23';

export const metadata: Metadata = {
  title: '🏦 사적연금 1,500만 원 분리과세 vs 종합과세 2026 | calculatorhost',
  description:
    '2026년 사적연금 1,500만 원 이하 분리과세(3.3~5.5% 저세율) vs 초과분 종합과세 완벽 가이드. 연령별 세율·신고 방법·절세 전략·5/31 마감 필수 신고.',
  keywords: [
    '사적연금 분리과세',
    '연금저축 분리과세',
    'IRP 분리과세',
    '사적연금 1500만 원',
    '연금소득 분리과세',
    '사적연금 세율',
    '연금저축 수령액 과세',
    '퇴직연금 과세',
    '연금소득 종합과세',
    '사적연금 종소세',
    '연금저축 종합소득세',
  ],
  alternates: { canonical: URL },
  openGraph: {
    title: '사적연금 1,500만 원 분리과세 vs 종합과세 완벽 가이드 (2026)',
    description: '연금저축·IRP 수령액 1,500만 원 기준 분리과세 저세율 활용법. 연령별 세율·신고·절세 전략.',
    url: URL,
    type: 'article',

    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '사적연금 1,500만 원 분리과세 vs 종합과세 가이드',
    description: '연금저축·IRP 수령액 저세율 신고법. 5/31 마감 전 필독.',

  },
};

const FAQ_ITEMS = [
  {
    question: '사적연금이란 무엇인가요?',
    answer:
      '연금저축(연금계좌) + IRP(개인형 퇴직연금) + 퇴직연금(정기인출)을 통해 개인이 가입한 연금 상품에서 받는 수령액입니다. 공적연금(국민연금, 공무원연금, 군인연금)과 달리 본인이 선택해 가입하고 자기 돈으로 운영합니다. 분리과세는 소득세법 §14 ③ 9호에 근거하며, 1,500만 원 이하 시 3.3~5.5% 저세율을 적용할 수 있습니다.',
  },
  {
    question: '연금저축과 IRP에서 각각 1,500만 원씩인가요?',
    answer:
      '아닙니다. 1,500만 원은 연금저축 + IRP + 퇴직연금(정기인출)의 전체 합산 기준입니다. 예를 들어 연금저축 800만 원 + IRP 700만 원 = 1,500만 원이면 분리과세 기준 이내. 1,500만 원을 초과하는 순간 초과분은 종합과세 대상이 됩니다 (또는 6%·15% 단일세율 분리과세 선택 가능).',
  },
  {
    question: '왜 1,500만 원에서 2024년부터 상향되었나요?',
    answer:
      '국민의 노후 보장 강화를 위해 소득세법 §14 ③ 9호가 2024년에 개정되었습니다. 이전(2023년)엔 1,200만 원 한도였으나, 저금리·저출산 시대에 자발적 퇴직연금 준비를 장려하기 위해 300만 원이 상향되었습니다. 이 개정안은 2026년 5월 종소세 신고에서부터 적용 대상입니다.',
  },
  {
    question: '분리과세 세율 5.5%, 4.4%, 3.3%는 어떻게 결정되나요?',
    answer:
      '수령자 연령에 따라 차등 적용됩니다 (소득세법 §129 ⑤). 70세 미만 5.5%, 70~79세 4.4%, 80세 이상 3.3%입니다. 지방세(1.4%)가 포함된 수치입니다. 나이가 많을수록 저세율이 적용되어 노후 보장에 유리합니다. 예: 80세 이상 수령액 1,500만 원 × 3.3% = 49.5만 원 세금.',
  },
  {
    question: '1,500만 원 초과 시 종합과세로 얼마나 더 내나요?',
    answer:
      '종합과세 시 다른 소득(근로소득, 사업소득, 이자, 배당 등)과 합산되어 누진세율(6~45%)이 적용됩니다. 예: 연봉 5,000만 원 직장인이 사적연금 2,000만 원 수령 시, 1,500만 원은 분리 66만 원, 초과 500만 원은 종합소득에 합산되어 누진세율 15~24% 적용 → 75~120만 원. 총 141~186만 원 vs 분리과세만 시 66만 원 = 약 75~120만 원 추가 부담.',
  },
  {
    question: '종합과세 선택 외에 6% 또는 15% 단일세율 분리과세가 있다는데?',
    answer:
      '2026년부터 소득세법 §64의4가 신설되어, 1,500만 원 초과분에 대해 종합과세 대신 6% 또는 15% 단일세율 분리과세를 선택할 수 있습니다. 다만 이는 신규 선택 규정이며 국세청 가이드 확정 필요. 분리과세가 종합과세보다 유리한 경우 6% 선택 권장.',
  },
  {
    question: '공적연금(국민연금)은 분리과세 기준에 포함되나요?',
    answer:
      '아닙니다. 국민연금, 공무원연금, 군인연금 등 공적연금은 별도로 "공적연금소득"(소득세법 §20의3)으로 분류되며, 이들은 분리과세가 아닌 정해진 세율(3.3~4.4%)을 일괄 적용합니다. 사적연금 1,500만 원 기준과 분리됩니다. 즉, 국민연금 수령액은 사적연금 한도에 포함되지 않습니다.',
  },
  {
    question: '5월 종소세 신고 때 분리과세 또는 종합과세 어느 쪽을 선택하나요?',
    answer:
      '호택스(hometax.go.kr) 종합소득세 신고 화면에서 "연금소득" 섹션에 수령액 입력 시 1,500만 원 기준이 자동 표시됩니다. 1,500만 원 이하면 자동 분리과세 적용. 초과 시 종합과세 또는 6%·15% 분리과세 선택지 제시. 선택 후 결정세액 확인 후 5월 31일까지 전자신고 → 납부.',
  },
  {
    question: '이미 2024~2025년에 수령한 연금은 소급적용되나요?',
    answer:
      '아닙니다. 2024년 개정(1,200만 → 1,500만 원)은 2024년 귀속분(2025년 5월 신고)부터 적용됩니다. 2023년 귀속분(2024년 5월 신고)은 1,200만 원 한도 기준이 유지됩니다. 단, 본인이 이전 연도에 종합과세 신고한 경우 경정청구로 환급받을 수 있으므로 세무사 상담 권장.',
  },
  {
    question: '신고 안 하면 어떻게 되나요?',
    answer:
      '사적연금 수령액은 금융기관에서 국세청에 자동 보고되므로, 신고 누락은 즉시 적발됩니다. 무신고가산세(20%) + 납부지연가산세(일 0.022%) + 환급 불가. 예: 1,500만 원 분리과세 66만 원 신고 의무를 무신고 시 가산세만 13만 원 이상 발생. 반드시 5월 31일까지 신고하세요.',
  },
] as const;

export default function PrivatePension1500MillionSeparateTaxationPage() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '사적연금 1,500만 원 분리과세 vs 종합과세' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '사적연금 1,500만 원 분리과세 vs 종합과세 완벽 가이드 (2026)',
    description:
      '연금저축·IRP 수령액 1,500만 원 이하 분리과세(3.3~5.5% 저세율) vs 초과분 종합과세. 연령별 세율·신고 의무·절세 전략·5/31 마감 신고.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['사적연금 분리과세', '연금저축', 'IRP', '종소세 신고', '연금소득'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '사적연금 1,500만 원 분리과세 vs 종합과세 가이드 2026',
    description:
      '연금저축·IRP 수령액 1,500만 원 기준 분리과세(3.3~5.5% 연령별 저세율) 완전 가이드. 2024년 상향 개정(1,200만→1,500만), 종합과세 비교, 신고 방법, 절세 전략, 5/31 마감.',
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
                    { name: '사적연금 1,500만 원 분리과세 vs 종합과세' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">세금 · 13분 읽기 · 2026-05-23</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  사적연금 1,500만 원 분리과세 vs 종합과세
                  <br />
                  <span className="text-2xl text-text-secondary">— 연령별 세율·신고·절세 완벽 가이드 (2026)</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  연금저축(연금계좌)이나 IRP(개인형 퇴직연금)에서 수령액이 연 1,500만 원 이하면
                  분리과세로 3.3~5.5% 저세율을 적용할 수 있습니다. 2024년부터 기준이 1,200만 원에서 1,500만 원으로
                  상향되었으므로, 이제 더 많은 사람이 저세율 혜택을 받을 수 있습니다.
                  하지만 1,500만 원을 초과하면 다른 소득과 합산되어 최대 45% 누진세율이 적용될 수 있습니다.
                  이 가이드 한 페이지로 분리과세 vs 종합과세 선택 기준, 연령별 세율, 신고 방법, 절세 전략까지 모두 정리됩니다.
                </p>
              </header>

              <AdSlot slot="guide-pension-1500-million-top" format="horizontal" />

              {/* 핵심 요약 */}
              <section aria-label="핵심 요약" className="card border-l-4 border-l-primary-500">
                <h2 className="mb-2 text-caption uppercase tracking-wider text-primary-500">핵심 요약</h2>
                <ul className="space-y-1.5 text-sm" data-speakable>
                  <li>📊 <strong>분리과세 기준</strong>: 연금저축 + IRP + 퇴직연금 합산 1,500만 원 이하 (소득세법 §14 ③ 9호)</li>
                  <li>💰 <strong>연령별 분리과세 세율</strong>: 70세 미만 5.5% / 70~79세 4.4% / 80세 이상 3.3% (소득세법 §129 ⑤)</li>
                  <li>📈 <strong>1,500만 원 초과</strong>: 종합과세(6~45% 누진) vs 6%·15% 단일세율 분리과세 선택 (소득세법 §64의4)</li>
                  <li>⚠️ <strong>공적연금 별개</strong>: 국민연금, 공무원연금 등은 분리되어 계산 (소득세법 §20의3)</li>
                  <li>📋 <strong>신고 기한</strong>: 2026년 5월 1일~5월 31일 (홈택스 종합소득세 신고)</li>
                  <li>🚫 <strong>무신고 시</strong>: 가산세 20% + 납부지연가산세 일 0.022%</li>
                </ul>
              </section>

              {/* 1. 사적연금 분리과세란? */}
              <section className="space-y-4">
                <h2 className="text-2xl font-bold">1. 사적연금 분리과세란? — 정의와 기준</h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  사적연금 분리과세는 개인이 자발적으로 가입한 연금 상품(연금저축, IRP, 퇴직연금 정기인출)에서
                  받는 수령액에 대해 다른 소득과 분리하여 낮은 세율(3.3~5.5%)을 적용하는 제도입니다.
                  소득세법 §14 ③ 9호에 근거하며, 노후 준비를 장려하기 위해 마련되었습니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <thead>
                      <tr className="bg-primary-500/10 border border-border-base">
                        <th className="px-3 py-2 text-left">항목</th>
                        <th className="px-3 py-2 text-left">사적연금</th>
                        <th className="px-3 py-2 text-left">공적연금</th>
                      </tr>
                    </thead>
                    <tbody className="text-text-secondary">
                      <tr className="border border-border-base">
                        <td className="px-3 py-2 font-semibold">정의</td>
                        <td className="px-3 py-2">개인이 선택해 가입한 연금 (연금저축, IRP, 퇴직연금)</td>
                        <td className="px-3 py-2">법정 의무 연금 (국민연금, 공무원연금, 군인연금)</td>
                      </tr>
                      <tr className="border border-border-base">
                        <td className="px-3 py-2 font-semibold">1,500만 원 기준</td>
                        <td className="px-3 py-2">적용됨 (분리과세 vs 종합과세 선택)</td>
                        <td className="px-3 py-2">미적용 (별도 과세)</td>
                      </tr>
                      <tr className="border border-border-base">
                        <td className="px-3 py-2 font-semibold">세율</td>
                        <td className="px-3 py-2">3.3~5.5% (연령별 분리) 또는 종합과세 선택</td>
                        <td className="px-3 py-2">정해진 저세율(3.3~4.4%)</td>
                      </tr>
                      <tr className="border border-border-base">
                        <td className="px-3 py-2 font-semibold">신고 의무</td>
                        <td className="px-3 py-2">5월 종합소득세 신고 (소득세법 §70)</td>
                        <td className="px-3 py-2">자동 신고(금융기관 보고)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-text-secondary leading-relaxed">
                  <strong>2024년 개정의 의미</strong>: 이전 1,200만 원 기준에서 1,500만 원으로 300만 원이 상향되었습니다
                  (소득세법 §14 ③ 9호 개정). 저금리 시대 자발적 은퇴자금 준비 장려 목적입니다.
                  2024년 귀속분(2025년 5월 신고)부터 적용되며, 2026년 5월 신고에는 완전히 정착된 상태입니다.
                </p>
              </section>

              {/* 2. 연금저축 + IRP = 합산 1,500만 원 */}
              <section className="space-y-4">
                <h2 className="text-2xl font-bold">2. 연금저축 + IRP 합산 기준 — "개별"이 아닌 "통합"</h2>
                <p className="text-text-secondary leading-relaxed">
                  중요한 포인트: 분리과세 기준 1,500만 원은 연금저축 또는 IRP 개별이 아니라
                  <strong> 전체 합산</strong> 기준입니다.
                </p>
                <div className="space-y-3">
                  <div className="rounded-lg border border-border-base bg-bg-raised p-4">
                    <h3 className="mb-2 font-semibold text-text-primary">합산 예시</h3>
                    <ul className="text-sm text-text-secondary space-y-2">
                      <li><strong>예 1 (분리과세 해당)</strong><br/>
                        연금저축 700만 + IRP 800만 = 1,500만 원 → 분리과세 적용 ✓</li>
                      <li><strong>예 2 (분리과세 초과)</strong><br/>
                        연금저축 900만 + IRP 700만 = 1,600만 원 → 초과 100만 원은 종합과세 또는 6%/15% 선택</li>
                      <li><strong>예 3 (종합과세 선택)</strong><br/>
                        연금저축 1,500만 원 수령 (IRP 미수령) → 분리과세 자동 적용. IRP 추가 수령 시 합산.</li>
                    </ul>
                  </div>
                </div>
                <p className="text-text-secondary leading-relaxed">
                  여러 금융기관에서 연금저축을 개설했어도(A은행 300만 + B증권 200만)
                  합산되어 500만 원으로 계산됩니다. 따라서 <strong>5월 신고 전 본인의 모든 연금 계좌를 파악</strong>하고
                  합산액을 미리 계산하는 것이 중요합니다.
                </p>
              </section>

              {/* 3. 연령별 분리과세 세율 */}
              <section className="space-y-4">
                <h2 className="text-2xl font-bold">3. 연령별 분리과세 세율 — 나이가 많을수록 저세율</h2>
                <p className="text-text-secondary leading-relaxed">
                  분리과세가 적용되는 경우 수령자의 연령에 따라 세율이 달라집니다
                  (소득세법 §129 ⑤). 지방세(1.4%)가 포함된 최종 세율입니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <thead>
                      <tr className="bg-primary-500/10 border border-border-base">
                        <th className="px-3 py-2 text-left">수령자 연령</th>
                        <th className="px-3 py-2 text-center">분리과세율</th>
                        <th className="px-3 py-2 text-left">예시 (1,500만 원)</th>
                      </tr>
                    </thead>
                    <tbody className="text-text-secondary">
                      <tr className="border border-border-base">
                        <td className="px-3 py-2 font-semibold">70세 미만</td>
                        <td className="px-3 py-2 text-center font-semibold">5.5%</td>
                        <td className="px-3 py-2">1,500만 × 5.5% = 82.5만 원</td>
                      </tr>
                      <tr className="border border-border-base">
                        <td className="px-3 py-2 font-semibold">70~79세</td>
                        <td className="px-3 py-2 text-center font-semibold">4.4%</td>
                        <td className="px-3 py-2">1,500만 × 4.4% = 66만 원</td>
                      </tr>
                      <tr className="border border-border-base">
                        <td className="px-3 py-2 font-semibold">80세 이상</td>
                        <td className="px-3 py-2 text-center font-semibold">3.3%</td>
                        <td className="px-3 py-2">1,500만 × 3.3% = 49.5만 원</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-text-secondary leading-relaxed">
                  <strong>설계 의도</strong>: 나이가 많을수록 절세 혜택을 크게 받아 실질적인 노후 자금을 보호합니다.
                  예를 들어 80세 이상이 1,500만 원을 수령할 때 세금은 49.5만 원에 불과하며,
                  실수령액은 1,450.5만 원입니다. 만약 종합과세로 처리되었다면 (누진세율 6~15% 적용 시)
                  90~225만 원의 세금이 부과될 수 있으므로, 분리과세 선택이 중요합니다.
                </p>
              </section>

              {/* 4. 분리과세 vs 종합과세 비교 */}
              <section className="space-y-4">
                <h2 className="text-2xl font-bold">4. 1,500만 원 초과 시 — 분리과세 vs 종합과세 선택</h2>
                <p className="text-text-secondary leading-relaxed">
                  사적연금 수령액이 1,500만 원을 초과하면 두 가지 선택이 있습니다:
                  (1) 초과분을 다른 소득과 합산하여 누진세율 적용 (종합과세),
                  또는 (2) 단일 세율(6% 또는 15%)로 분리과세 (소득세법 §64의4, 2026년 신설).
                </p>
                <div className="rounded-lg border border-border-base bg-bg-raised p-4">
                  <h3 className="mb-3 font-semibold text-text-primary">실제 시뮬레이션</h3>
                  <p className="text-sm text-text-secondary mb-3">
                    <strong>가정</strong>: 60세 직장인, 연봉 5,000만 원, 사적연금 수령액 2,000만 원
                  </p>
                  <div className="space-y-2 text-sm text-text-secondary">
                    <div className="flex justify-between">
                      <span>1️⃣ 분리과세 선택 (1,500만 + 초과 500만)</span>
                      <span className="font-semibold"></span>
                    </div>
                    <ul className="ml-4 space-y-1 text-xs text-text-secondary">
                      <li>• 1,500만 × 5.5% = 82.5만 원 (저세율)</li>
                      <li>• 초과 500만 × 6% = 30만 원 (단일세율, 선택 시)</li>
                      <li>• <strong>합계: 약 112.5만 원</strong></li>
                    </ul>
                    <div className="flex justify-between mt-3">
                      <span>2️⃣ 종합과세 선택 (전체 2,000만 합산)</span>
                      <span className="font-semibold"></span>
                    </div>
                    <ul className="ml-4 space-y-1 text-xs text-text-secondary">
                      <li>• 연봉 5,000만 + 연금 2,000만 = 7,000만 원 합산</li>
                      <li>• 누진세율 15% 적용 (근로소득공제·인적공제 후)</li>
                      <li>• <strong>합계: 약 150~180만 원</strong></li>
                    </ul>
                    <div className="flex justify-between border-t border-border-base pt-2 mt-3">
                      <span className="font-semibold">💰 절감액</span>
                      <span className="font-semibold">약 37.5~67.5만 원</span>
                    </div>
                  </div>
                </div>
                <p className="text-text-secondary leading-relaxed mt-4">
                  <strong>의사결정</strong>: 1,500만 원 초과분이 작거나 다른 소득(사업, 배당 등)이 크면
                  분리과세 선택이 거의 항상 유리합니다. 다만 초과분이 매우 크거나 다른 소득이 크면
                  세무사와 시뮬레이션 후 결정하세요.
                </p>
              </section>

              {/* 5. 공적연금과의 구분 */}
              <section className="space-y-4">
                <h2 className="text-2xl font-bold">5. 공적연금은 별개 — 국민연금, 공무원연금</h2>
                <p className="text-text-secondary leading-relaxed">
                  중요한 구분: 국민연금, 공무원연금, 군인연금 등 공적연금(공적연금소득, 소득세법 §20의3)은
                  <strong> 사적연금 1,500만 원 기준에 포함되지 않습니다</strong>.
                  공적연금은 별도의 정해진 세율(3.3~4.4%)이 자동 적용됩니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <h3 className="mb-2 font-semibold text-text-primary">혼동하지 말 것</h3>
                  <p className="text-sm text-text-secondary">
                    "국민연금도 많이 받으니 1,500만 원을 깎아야 하나?"
                    <br />
                    ❌ <strong>아닙니다</strong>. 국민연금은 별개입니다.
                    <br />
                    예: 국민연금 월 200만 (연 2,400만) + 연금저축 1,500만 수령 시,
                    <br />
                    공적연금 2,400만은 공식대로 과세, 연금저축 1,500만은 분리과세 적용.
                  </p>
                </div>
              </section>

              {/* 6. 5월 신고 방법 */}
              <section className="space-y-4">
                <h2 className="text-2xl font-bold">6. 홈택스 5월 종소세 신고 방법</h2>
                <p className="text-text-secondary leading-relaxed">
                  사적연금을 수령한 경우 5월 1일~31일(또는 6월 2일)에 종합소득세 신고가 필수입니다.
                </p>
                <ol className="space-y-3 text-sm">
                  <li className="rounded-lg border border-border-base bg-bg-card p-4">
                    <strong className="text-text-primary block mb-1">Step 1. 홈택스 접속 및 로그인</strong>
                    <p className="text-text-secondary">
                      <a href="https://www.hometax.go.kr" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-600 underline dark:text-primary-500">홈택스(hometax.go.kr)</a> 접속 → 공동인증서 또는 간편인증(카카오·네이버) 로그인.
                      모바일: 손택스 앱 권장.
                    </p>
                  </li>
                  <li className="rounded-lg border border-border-base bg-bg-card p-4">
                    <strong className="text-text-primary block mb-1">Step 2. 종합소득세 신고 메뉴 진입</strong>
                    <p className="text-text-secondary">
                      상단 메뉴 "신고/납부" → "종합소득세" → "신고/납부" 클릭.
                    </p>
                  </li>
                  <li className="rounded-lg border border-border-base bg-bg-card p-4">
                    <strong className="text-text-primary block mb-1">Step 3. 소득 입력 — 연금소득 섹션</strong>
                    <p className="text-text-secondary">
                      금융기관에서 보고한 연금소득이 자동 채워짐.
                      <br/>
                      <strong>확인사항</strong>: 소득 금액이 정확한지, 모든 계좌(연금저축 A·B + IRP)가 합산되어 있는지 검토.
                    </p>
                  </li>
                  <li className="rounded-lg border border-border-base bg-bg-card p-4">
                    <strong className="text-text-primary block mb-1">Step 4. 1,500만 원 기준 선택</strong>
                    <p className="text-text-secondary">
                      수입금액이 1,500만 원 이하면 자동으로 분리과세 선택지 표시.
                      <br/>
                      초과 시 종합과세 또는 6%/15% 선택지 제시 → 본인이 선택.
                    </p>
                  </li>
                  <li className="rounded-lg border border-border-base bg-bg-card p-4">
                    <strong className="text-text-primary block mb-1">Step 5. 인적공제·세액공제 반영</strong>
                    <p className="text-text-secondary">
                      배우자, 자녀 등 인적공제 + 기부금, 의료비 등 세액공제 입력.
                      (선택사항이나 절세에 중요)
                    </p>
                  </li>
                  <li className="rounded-lg border border-border-base bg-bg-card p-4">
                    <strong className="text-text-primary block mb-1">Step 6. 결과 확인 → 전자신고</strong>
                    <p className="text-text-secondary">
                      결정세액(추가 납부 또는 환급) 확인.
                      이상 없으면 "전자신고" 클릭 → <strong>접수증 PDF 보관 필수</strong>.
                    </p>
                  </li>
                  <li className="rounded-lg border border-border-base bg-bg-card p-4">
                    <strong className="text-text-primary block mb-1">Step 7. 납부 또는 환급</strong>
                    <p className="text-text-secondary">
                      <strong>추가 납부</strong>: 신용카드(0.8% 수수료) / 계좌이체 / 가상계좌 (5월 31일까지)<br/>
                      <strong>환급</strong>: 본인 명의 통장 입력 → 6월 중순~7월 초 입금
                    </p>
                  </li>
                </ol>
              </section>

              {/* 7. 주요 함정 & 절세 팁 */}
              <section className="space-y-4">
                <h2 className="text-2xl font-bold">7. 흔한 실수 & 절세 팁</h2>
                <div className="space-y-3">
                  <div className="rounded-lg border border-danger-500/30 bg-danger-500/5 p-4">
                    <h3 className="mb-2 font-semibold text-danger-700 dark:text-danger-300">⚠️ 실수 1: 여러 계좌를 각각 분리과세로 신고</h3>
                    <p className="text-sm text-danger-700 dark:text-danger-300">
                      연금저축 A은행 500만 + B증권 600만 을 각각 분리과세 신고 시
                      "각 1,500만 이하"로 착각하는 경우. 정답: 1,100만 원으로 합산 신고.
                    </p>
                  </div>
                  <div className="rounded-lg border border-danger-500/30 bg-danger-500/5 p-4">
                    <h3 className="mb-2 font-semibold text-danger-700 dark:text-danger-300">⚠️ 실수 2: 공적연금도 1,500만 원에 포함시키기</h3>
                    <p className="text-sm text-danger-700 dark:text-danger-300">
                      국민연금 월 150만 + 연금저축 1,400만 = 2,150만 으로 계산.
                      정답: 국민연금은 별도(공적연금소득), 연금저축만 1,400만 으로 분리과세.
                    </p>
                  </div>
                  <div className="rounded-lg border border-primary-500/30 bg-primary-500/5 p-4">
                    <h3 className="mb-2 font-semibold text-primary-700 dark:text-primary-300">💡 절세 팁 1: 다른 소득 합산 효과 확인</h3>
                    <p className="text-sm text-primary-700 dark:text-primary-300">
                      프리랜서(사업소득 3,000만 + 연금 1,800만)인 경우,
                      연금 초과분 300만을 종합과세하면 전체 누진세율이 상향됩니다.
                      이 경우 초과분만 따로 6% 분리과세 선택이 유리.
                    </p>
                  </div>
                  <div className="rounded-lg border border-primary-500/30 bg-primary-500/5 p-4">
                    <h3 className="mb-2 font-semibold text-primary-700 dark:text-primary-300">💡 절세 팁 2: 수령 연도 조정 검토</h3>
                    <p className="text-sm text-primary-700 dark:text-primary-300">
                      연금저축이 충분히 준비되었다면, 본인이 고령(80세↑)이 될 때까지
                      수령을 지연하여 3.3% 저세율 혜택을 받는 것도 전략입니다.
                      다만 수령 제한(60세 이상 등)을 확인해야 합니다.
                    </p>
                  </div>
                  <div className="rounded-lg border border-primary-500/30 bg-primary-500/5 p-4">
                    <h3 className="mb-2 font-semibold text-primary-700 dark:text-primary-300">💡 절세 팁 3: 배우자 공제 활용</h3>
                    <p className="text-sm text-primary-700 dark:text-primary-300">
                      배우자가 없거나 소득이 없으면 본인이 단독 신고.
                      배우자가 있으면 인적공제(기본 150만 × 2 = 300만) 가능 → 약 45만 원 절세.
                    </p>
                  </div>
                </div>
              </section>

              <FaqSection items={[...FAQ_ITEMS]} />

              {/* 주의사항 */}
              <section className="card border-l-4 border-l-danger-500 bg-danger-500/5">
                <h2 className="mb-2 text-lg font-semibold text-danger-700 dark:text-danger-300">⚠️ 중요 주의사항</h2>
                <ul className="space-y-2 text-sm text-danger-700 dark:text-danger-300">
                  <li>• 본 가이드는 정보 제공 목적이며 개별 세무 조언이 아닙니다. 복잡한 다중 소득, 특수 공제는 세무사 상담 필수.</li>
                  <li>• 2024년 개정(1,200만 → 1,500만 원)은 2024년 귀속분부터 적용. 이전 연도와 기준 다름.</li>
                  <li>• 사적연금 수령액은 금융기관에서 자동 보고되므로, 신고 누락 시 즉시 적발 (무신고가산세 20%).</li>
                  <li>• 신고 기한: 2026년 5월 1일~5월 31일 (성실신고확인대상자 6월 30일). 5월 25일 이후는 홈택스 트래픽 집중 → 가급적 5월 20일까지 신고.</li>
                  <li>• 환급 시 본인 명의 통장 정확히 입력. 타인 명의 입력 시 환급 지연·반환.</li>
                  <li>• 6% 또는 15% 단일세율 분리과세(§64의4)는 2026년 신설 규정이므로, 국세청 최신 가이드 확인 필수.</li>
                </ul>
              </section>

              {/* 관련 도구 */}
              <section className="card">
                <h2 className="mb-3 text-lg font-semibold">📊 관련 계산기·가이드</h2>
                <ul className="space-y-2 text-sm">
                  <li>
                    →{' '}
                    <Link href="/calculator/freelancer-tax/" className="text-primary-600 underline dark:text-primary-500">
                      프리랜서 종합소득세 계산기
                    </Link>
                    {' '}— 연금 수령액 포함 시뮬레이션 가능
                  </li>
                  <li>
                    →{' '}
                    <Link href="/calculator/salary/" className="text-primary-600 underline dark:text-primary-500">
                      연봉 실수령액 계산기
                    </Link>
                    {' '}— 직장인 연금 수령 시 합산 세액 확인
                  </li>
                  <li>
                    →{' '}
                    <Link href="/guide/financial-income-comprehensive-vs-separate-taxation/" className="text-primary-600 underline dark:text-primary-500">
                      가이드: 금융소득 종합과세 vs 분리과세 (2,000만 기준)
                    </Link>
                    {' '}— 비슷한 구조의 이자·배당 과세
                  </li>
                  <li>
                    →{' '}
                    <Link href="/guide/may-comprehensive-income-tax/" className="text-primary-600 underline dark:text-primary-500">
                      가이드: 5월 종합소득세 신고 완벽 가이드
                    </Link>
                    {' '}— 종소세 신고 전체 프로세스
                  </li>
                  <li>
                    →{' '}
                    <Link href="/guide/severance-vs-pension-dc-db/" className="text-primary-600 underline dark:text-primary-500">
                      가이드: 퇴직금 vs DC·DB 연금 비교
                    </Link>
                    {' '}— 퇴직연금 구조 이해
                  </li>
                  <li>
                    →{' '}
                    <Link href="/glossary/" className="text-primary-600 underline dark:text-primary-500">
                      용어사전 — 연금저축, IRP, 분리과세, 공적연금 등
                    </Link>
                  </li>
                </ul>
              </section>

              <ShareButtons
                title="사적연금 1,500만 원 분리과세 vs 종합과세 가이드 (2026)"
                url={URL}
                description="연금저축·IRP 수령액 1,500만 원 이하 분리과세(3.3~5.5% 저세율) 완벽 가이드. 2024년 상향, 신고 방법, 절세 전략."
              />

              <section
                aria-label="출처 및 면책"
                className="rounded-lg border border-border-base p-4 text-caption text-text-tertiary"
              >
                <p className="mb-2">
                  <strong>법적 근거</strong>: 소득세법 §14 ③ 9호 (사적연금 분리과세 1,500만 원 기준) ·
                  소득세법 §20의3 (공적연금소득) · 소득세법 §64의4 (연금소득 분리과세 선택) ·
                  소득세법 §70 (종합소득세 신고) · 소득세법 §129 ⑤ (연령별 분리과세 세율). 참고:{' '}
                  <a href="https://www.hometax.go.kr/guide/0206000000.jsp" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-600 underline dark:text-primary-500">국세청 홈택스 종소세 신고 가이드</a>,{' '}
                  <a href="https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?rbsSn=1447" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-600 underline dark:text-primary-500">국세청 사적연금소득 안내</a>.
                </p>
                <p className="mb-2">
                  <strong>AI 보조 표기</strong>: 본 콘텐츠는 AI 보조 작성 후 운영자 검수를 거쳤습니다
                  (Google AI Content Policy 준수).
                </p>
                <p className="mb-2">
                  <strong>면책 조항</strong>: 본 가이드는 정보 제공 목적이며 세무·법적 조언이 아닙니다.
                  개별 사정(복잡한 다중 소득, 특수 공제, 경정청구 등)은 반드시 세무사 또는 세무서 상담을 통해
                  확정하시기 바랍니다. 무신고 또는 부정신고에 따른 책임은 신고자가 부담합니다.
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
