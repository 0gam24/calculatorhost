import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { Footer } from '@/components/layout/Footer';
import { AdSlot } from '@/components/ads/AdSlot';
import { FaqSection } from '@/components/calculator/FaqSection';
import { ShareButtons } from '@/components/calculator/ShareButtons';
import { GuideHeader } from '@/components/guide/GuideHeader';
import {
  buildBreadcrumbJsonLd,
  buildArticleJsonLd,
  buildWebPageJsonLd,
  buildFaqPageJsonLd,
} from '@/lib/seo/jsonld';

const URL = 'https://calculatorhost.com/guide/health-insurance-regional-subscriber-2026/';
const DATE_PUBLISHED = '2026-06-15';
const DATE_MODIFIED = '2026-06-15';

export const metadata: Metadata = {
  title: '지역가입자 건강보험료 2026 | 소득·재산 점수 계산법 | calculatorhost',
  description:
    '2026년 건강보험 지역가입자 보험료는 소득점수와 재산점수를 합산해 부과점수당 금액 211.5원을 곱해 산정합니다. 직장 퇴사 후 임의계속가입으로 보험료를 낮추는 방법과 국민건강보험공단 기준을 정리했습니다.',
  keywords: [
    '지역가입자 건강보험료',
    '건강보험 지역가입자',
    '지역가입자 보험료 계산',
    '직장 퇴사 건강보험',
    '프리랜서 건강보험료',
    '국민건강보험법 69조',
    '임의계속가입',
    '소득점수',
    '재산점수',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '지역가입자 건강보험료 2026' }],
    title: '지역가입자 건강보험료 2026 | 소득·재산 점수 계산법',
    description: '소득점수·재산점수 계산법, 부과점수당 금액 211.5원, 임의계속가입 제도 완정리.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '지역가입자 건강보험료 2026',
    description: '소득·재산 점수 계산, 부과점수당 금액, 임의계속가입 제도',
    images: ['/og-default.png'],
  },
};

const FAQ_ITEMS = [
  {
    question: '지역가입자란 무엇인가요?',
    answer:
      '직장가입자가 아닌 모든 국민 — 자영업자, 프리랜서, 은퇴자, 무직자 등이 지역가입자로 분류됩니다(국민건강보험법 §5). 직장에서 건강보험료를 절반 내주지 않으므로 전액 본인이 부담합니다. 소득과 재산을 기준으로 보험료가 달라집니다.',
  },
  {
    question: '지역가입자 보험료는 어떻게 계산하나요?',
    answer:
      '월 보험료 = (소득월액 × 보험료율 7.19%) + (재산점수 × 부과점수당 금액 211.5원)입니다. 소득은 이자·배당·연금·기타소득을 포함한 합산 기준이고, 재산은 주택·토지·차량·보증금 등을 점수화합니다. 최저 월 20,160원, 최고 약 459만원의 상한과 하한이 있습니다.',
  },
  {
    question: '2026년 부과점수당 금액이 얼마인가요?',
    answer:
      '부과점수당 금액은 2026년 기준 211.5원입니다. 이는 정부가 정한 고시 금액으로 매년 변동할 수 있습니다. 재산 기본공제액(주택 6,000만원·토지 4,000만원) 차감 후 남은 재산 평가액을 점수로 환산해 211.5원을 곱합니다.',
  },
  {
    question: '직장을 그만두면 건강보험료가 얼마나 올라요?',
    answer:
      '소득과 재산에 따라 상이합니다. 연소득 3,000만원·재산 5억원인 경우 직장가입자 월 약 11만원에서 지역가입자 월 약 18~22만원으로 오를 수 있습니다. 다만 퇴직 후 임의계속가입(최대 36개월)을 신청하면 퇴직 전 직장 보험료 수준으로 낼 수 있습니다.',
  },
  {
    question: '임의계속가입 제도는 무엇인가요?',
    answer:
      '직장 퇴사 후 지역가입자 보험료 폭증을 대비한 제도입니다. 퇴직일로부터 60일 이내에 국민건강보험공단에 신청하면, 퇴직 시점의 직장 보험료 수준을 유지하면서 최대 36개월을 가입할 수 있습니다(국민건강보험법 §165). 재정이 어려운 은퇴자와 프리랜서에게 중요한 선택지입니다.',
  },
  {
    question: '소득정산은 언제 하나요?',
    answer:
      '매년 11월 정기심사에서 전년도 소득·재산을 기준으로 보험료를 재산정합니다. 실제 소득이 신고한 금액보다 적으면 차액을 환급받고, 많으면 추가 납부합니다. 특히 프리랜서나 사업소득자는 종합소득세 신고 금액이 건강보험 소득기준에 영향을 주므로 유의해야 합니다.',
  },
  {
    question: '지역가입자도 피부양자가 될 수 있나요?',
    answer:
      '지역가입자는 피부양자가 될 수 없습니다. 피부양자가 되려면 직장가입자 가족이어야 합니다. 다만 직장을 그만낀 후 소득과 재산이 기준 이하면 피부양자로 등록할 수 있고, 기준을 초과하면 지역가입자로만 가능합니다. 피부양자 요건은 소득 연 2,000만원 이하·재산 과표 9억원 이하입니다.',
  },
];

export default function HealthInsuranceRegionalSubscriber2026() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '보험·연금', url: 'https://calculatorhost.com/guide/?category=insurance' },
    { name: '지역가입자 건강보험료 2026' },
  ]);

  const articleLd = buildArticleJsonLd({
    headline: '2026 건강보험 지역가입자 보험료 — 소득·재산 점수 계산법',
    description:
      '지역가입자 보험료 = 소득월액 × 7.19% + 재산점수 × 211.5원. 직장 퇴사 후 보험료 폭증 시 임의계속가입으로 완화 가능. 국민건강보험법 §69·§72 기준 정리.',
    authorName: 'calculatorhost',
    authorUrl: 'https://calculatorhost.com',
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    url: URL,
  });

  const webPageLd = buildWebPageJsonLd({
    name: '지역가입자 건강보험료 2026',
    description:
      '2026년 건강보험 지역가입자 보험료 계산 기준, 소득·재산 점수 구조, 임의계속가입 제도',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
  });

  const faqLd = buildFaqPageJsonLd(
    FAQ_ITEMS.map((item) => ({
      question: item.question,
      answer: item.answer,
    }))
  );

  return (
    <div className="min-h-screen flex flex-col bg-bg-base">
      <Header />
      <div className="flex flex-1 max-w-7xl mx-auto w-full gap-6 px-4 py-8 md:px-6">
        <Sidebar />
        <main className="flex-1 mx-auto max-w-3xl space-y-8">
          {/* Schema.org */}
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageLd) }} />
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />

          {/* Guide Header */}
          <GuideHeader
            breadcrumbItems={[
              { name: '홈', href: '/' },
              { name: '가이드', href: '/guide/' },
              { name: '보험·연금' },
            ]}
            category="보험·연금"
            readingMinutes={8}
            publishedDate="2026-06-15"
            title="2026 건강보험 지역가입자 보험료"
            subtitle="— 소득·재산 점수 계산법"
            lead={
              <p data-speakable>
                지역가입자 건강보험료는 직장가입자와 달리 소득과 재산을 점수로 환산해 부과점수당 금액을 곱하는 방식으로 산정되며,
                직장 퇴사 후 임의계속가입으로 보험료 폭증을 완화할 수 있습니다.
              </p>
            }
          />

          {/* Top Ad */}
          <AdSlot slot="guide-health-regional-top" format="horizontal" />

          {/* Structured Summary */}
          <section className="space-y-4">
            <div className="bg-bg-card rounded-lg p-4 border border-border-base">
              <h2 className="text-sm font-semibold text-text-primary mb-3">직장가입자 vs 지역가입자 보험료 비교</h2>
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border-base">
                    <th scope="col" className="text-left py-2 px-2 font-semibold">항목</th>
                    <th scope="col" className="text-left py-2 px-2 font-semibold">직장가입자</th>
                    <th scope="col" className="text-left py-2 px-2 font-semibold">지역가입자</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border-base">
                    <td className="py-2 px-2 text-text-secondary">산정 방식</td>
                    <td className="py-2 px-2">보수월액 × 7.19%</td>
                    <td className="py-2 px-2">(소득 × 7.19%) + (재산점수 × 211.5원)</td>
                  </tr>
                  <tr className="border-b border-border-base">
                    <td className="py-2 px-2 text-text-secondary">부담률</td>
                    <td className="py-2 px-2">회사 절반 + 본인 절반</td>
                    <td className="py-2 px-2">전액 본인 부담</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-2 text-text-secondary">2026 평균월</td>
                    <td className="py-2 px-2">약 160,699원</td>
                    <td className="py-2 px-2">약 90,242원</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-primary-50 dark:bg-primary-950 rounded-lg p-4 border-l-4 border-l-primary-500">
              <h3 className="font-semibold text-text-primary mb-2">TL;DR</h3>
              <ul className="space-y-1 text-sm text-text-secondary">
                <li>
                  • 월 보험료 = <strong>소득월액 × 7.19%</strong> + <strong>재산점수 × 211.5원</strong> (국민건강보험법 §69·§72)
                </li>
                <li>• 최저 월 20,160원 ~ 최고 약 459만원</li>
                <li>• 퇴직 후 임의계속가입(36개월) 신청으로 직장 보험료 수준 유지 가능</li>
                <li>• 매년 11월 정기심사에서 소득·재산 재정산</li>
              </ul>
            </div>
          </section>

          {/* Section 1: 지역가입자 정의 */}
          <section className="space-y-3">
            <h2 className="text-2xl font-bold text-text-primary">지역가입자란?</h2>
            <p data-speakable>
              지역가입자는 직장가입자가 <strong>아닌 모든 국민</strong>을 의미합니다. 자영업자, 프리랜서, 은퇴자, 무직자, 학생 등이
              포함됩니다(국민건강보험법 §5). 직장가입자와 달리 회사에서 보험료를 절반 내주지 않으므로 개인이 전액 부담합니다.
            </p>

            <h3 className="text-lg font-semibold text-text-primary">직장 퇴사 후 지역가입자 전환 시점</h3>
            <p>
              퇴직일 다음달부터 지역가입자로 자동 전환됩니다. 예를 들어 5월 31일 퇴사하면 6월 1일부터 지역가입자 보험료를 납부하게
              됩니다. 이때 갑자기 보험료가 크게 올라 당황하는 경우가 많은데, 임의계속가입 제도로 부담을 줄일 수 있습니다.
            </p>

            <div className="bg-yellow-50 dark:bg-yellow-950 rounded-lg p-3 border-l-4 border-l-highlight-500">
              <p className="text-sm text-text-secondary">
                <strong>다만:</strong> 퇴사 후 소득과 재산이 기준 이하면 직장가입자 배우자의 피부양자로 등록하는 것이 유리할 수
                있습니다. 피부양자 요건은 연소득 2,000만원 이하·재산 과표 9억원 이하입니다.
              </p>
            </div>
          </section>

          {/* Mid Ad */}
          <AdSlot slot="guide-health-regional-mid" format="rectangle" />

          {/* Section 2: 소득점수 계산 */}
          <section className="space-y-3">
            <h2 className="text-2xl font-bold text-text-primary">소득점수는 어떻게 계산하나요?</h2>
            <p data-speakable>
              지역가입자의 <strong>월 보험료 = (소득월액 × 7.19%) + (재산점수 × 211.5원)</strong>입니다. 소득월액은 전년도 합산소득을
              12개월로 나눈 금액입니다(국민건강보험법 §71).
            </p>

            <h3 className="text-lg font-semibold text-text-primary">포함되는 소득</h3>
            <ul className="space-y-2 list-disc list-inside text-sm">
              <li>이자소득·배당소득 (전액)</li>
              <li>사업소득 (세액공제 전 금액)</li>
              <li>근로소득 (4대보험료 제외 보수월액)</li>
              <li>연금소득 (국민연금·퇴직금·기타연금)</li>
              <li>기타소득 (강사료·원고료 등)</li>
            </ul>

            <h3 className="text-lg font-semibold text-text-primary mt-4">계산 사례</h3>
            <div className="bg-bg-card rounded-lg p-4 space-y-3">
              <div>
                <p className="font-semibold text-sm text-text-primary">사례 1: 연소득 3,600만원 프리랜서</p>
                <ul className="text-sm text-text-secondary space-y-1 mt-1">
                  <li>• 소득월액 = 3,600만원 ÷ 12 = 300만원</li>
                  <li>• 건강보험료(소득부) = 300만원 × 7.19% = 약 21만 5,700원</li>
                  <li>• 여기에 재산점수 부분이 더해집니다</li>
                </ul>
              </div>
              <div className="pt-3 border-t border-border-base">
                <p className="font-semibold text-sm text-text-primary">사례 2: 연소득 2,400만원 + 월세 보증금 2억원</p>
                <ul className="text-sm text-text-secondary space-y-1 mt-1">
                  <li>• 소득월액 = 2,400만원 ÷ 12 = 200만원</li>
                  <li>• 건강보험료(소득부) = 200만원 × 7.19% = 약 14만 3,800원</li>
                  <li>• 재산점수 계산은 다음 섹션 참조</li>
                </ul>
              </div>
            </div>

            <div className="bg-yellow-50 dark:bg-yellow-950 rounded-lg p-3 border-l-4 border-l-highlight-500">
              <p className="text-sm text-text-secondary">
                <strong>다만:</strong> 비과세 근로소득(월 20만원 식대, 1인당 연 500만원 이내 학자금 지원 등)은 제외됩니다. 또한
                국민연금 수령액은 전액 포함되므로 은퇴자의 보험료가 생각보다 높을 수 있습니다.
              </p>
            </div>
          </section>

          {/* Section 3: 재산점수 계산 */}
          <section className="space-y-3">
            <h2 className="text-2xl font-bold text-text-primary">재산점수는 어떻게 계산하나요?</h2>
            <p data-speakable>
              재산점수는 <strong>주택·토지·차량·보증금 등의 재산 평가액에서 기본공제를 뺀 후 점수로 환산</strong>합니다. 같은 소득이라도
              재산이 많으면 보험료가 크게 올라갑니다(국민건강보험법 §72).
            </p>

            <h3 className="text-lg font-semibold text-text-primary">재산 기본공제액</h3>
            <table className="w-full text-sm border-collapse rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-bg-card">
                  <th scope="col" className="text-left py-2 px-3 font-semibold border-b border-border-base">재산 항목</th>
                  <th scope="col" className="text-left py-2 px-3 font-semibold border-b border-border-base">기본공제액</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border-base">
                  <td className="py-2 px-3">주택</td>
                  <td className="py-2 px-3">6,000만원</td>
                </tr>
                <tr className="border-b border-border-base">
                  <td className="py-2 px-3">토지</td>
                  <td className="py-2 px-3">4,000만원</td>
                </tr>
                <tr className="border-b border-border-base">
                  <td className="py-2 px-3">차량</td>
                  <td className="py-2 px-3">가격 전액 공제</td>
                </tr>
                <tr>
                  <td className="py-2 px-3">전월세 보증금</td>
                  <td className="py-2 px-3">1,500만원</td>
                </tr>
              </tbody>
            </table>

            <h3 className="text-lg font-semibold text-text-primary mt-4">점수 환산 방식</h3>
            <p className="text-sm text-text-secondary">
              공제액을 뺀 재산 평가액에 대해 국민건강보험공단 고시 환산율을 적용해 점수를 계산합니다. 예를 들어:
            </p>
            <div className="bg-bg-card rounded-lg p-4 space-y-3 text-sm">
              <div>
                <p className="font-semibold text-text-primary">주택 가격 8억원</p>
                <ul className="text-text-secondary space-y-1 mt-1">
                  <li>• 재산가액 = 8억원 - 6,000만원(공제) = 7,400만원</li>
                  <li>• 점수 환산(구체적 계산은 국민건강보험공단 고시 참조)</li>
                  <li>• 예상 재산점수 × 211.5원 = 월 보험료 재산부</li>
                </ul>
              </div>
              <div className="pt-3 border-t border-border-base">
                <p className="font-semibold text-text-primary">전월세 보증금 2억원</p>
                <ul className="text-text-secondary space-y-1 mt-1">
                  <li>• 재산가액 = 2억원 - 1,500만원(공제) = 1.85억원</li>
                  <li>• 차입금(월세)이 있으면 추가 공제 가능</li>
                  <li>• 일반적으로 주택 소유보다 보증금 부담이 낮음</li>
                </ul>
              </div>
            </div>

            <div className="bg-yellow-50 dark:bg-yellow-950 rounded-lg p-3 border-l-4 border-l-highlight-500">
              <p className="text-sm text-text-secondary">
                <strong>다만:</strong> 재산 평가액은 <strong>실거래가나 공시가격이 아니라 시세 추정액</strong>을 기준으로 합니다.
                정확한 계산은 국민건강보험공단 가입자 맞춤 모의계산기(nhis.or.kr)를 사용하는 것이 가장 정확합니다.
              </p>
            </div>
          </section>

          {/* Section 4: 부과점수당 금액 및 산정 절차 */}
          <section className="space-y-3">
            <h2 className="text-2xl font-bold text-text-primary">부과점수당 금액 & 산정 절차</h2>
            <p data-speakable>
              2026년 <strong>부과점수당 금액은 211.5원</strong>입니다. 이는 정부가 매년 고시하는 금액으로, 경제 상황에 따라 변동합니다.
              재산점수에 이 금액을 곱하면 월 보험료의 재산 부분이 나옵니다.
            </p>

            <h3 className="text-lg font-semibold text-text-primary">월 보험료 산정 절차</h3>
            <ol className="space-y-2 list-decimal list-inside text-sm">
              <li>
                <strong>전년도 소득·재산 신고</strong> — 지역가입자로 등록되면 소득세·재산세 신고 내역 자동 반영
              </li>
              <li>
                <strong>소득월액 계산</strong> — 합산소득 ÷ 12개월 = 소득월액
              </li>
              <li>
                <strong>소득 부분 산정</strong> — 소득월액 × 7.19% (보험료율)
              </li>
              <li>
                <strong>재산점수 계산</strong> — 기본공제 차감 후 점수 환산
              </li>
              <li>
                <strong>재산 부분 산정</strong> — 재산점수 × 211.5원
              </li>
              <li>
                <strong>월 보험료 결정</strong> — (소득부) + (재산부) = 최종 월 보험료 (최저~최고 한도 적용)
              </li>
            </ol>

            <div className="bg-blue-50 dark:bg-blue-950 rounded-lg p-4 mt-4 space-y-2">
              <p className="font-semibold text-sm text-text-primary">가입자 맞춤 모의계산</p>
              <p className="text-sm text-text-secondary">
                정확한 보험료 예상액은 국민건강보험공단 가입자 맞춤 모의계산기에서 소득·재산 정보를 입력해 확인할 수 있습니다.
              </p>
              <p className="text-sm">
                <a
                  href="https://www.nhis.or.kr"
                  rel="nofollow"
                  className="text-primary-500 hover:text-primary-600 underline"
                >
                  국민건강보험공단 사이트
                </a>
                {' → '}
                <span className="text-text-secondary">가입관리 → 보험료 조회</span>
              </p>
            </div>

            <div className="bg-yellow-50 dark:bg-yellow-950 rounded-lg p-3 border-l-4 border-l-highlight-500">
              <p className="text-sm text-text-secondary">
                <strong>다만:</strong> 본 안내는 기본 구조에 대한 설명이며, 신고 누락·착오·변동사항에 따라 실제 부과액이 달라질 수
                있습니다. 정정·감면 등 권리 신청은 국민건강보험공단 상담(1577-1000)을 통해 확인하세요.
              </p>
            </div>
          </section>

          {/* Section 5: 임의계속가입 선택 */}
          <section className="space-y-3">
            <h2 className="text-2xl font-bold text-text-primary">임의계속가입으로 보험료 부담 줄이기</h2>
            <p data-speakable>
              직장을 그만낀 후 지역가입자로 전환되면 <strong>보험료가 크게 오르는 경우</strong>가 많습니다. 이때 <strong>임의계속가입</strong>을
              신청하면 퇴직 시점의 직장 보험료 수준을 유지하면서 최대 36개월을 가입할 수 있습니다(국민건강보험법 §165).
            </p>

            <h3 className="text-lg font-semibold text-text-primary">임의계속가입 신청 요건</h3>
            <ul className="space-y-2 list-disc list-inside text-sm">
              <li>퇴직일로부터 <strong>60일 이내</strong> 신청 필수</li>
              <li>직장가입자 피보험자 자격상실 후 신청 가능</li>
              <li>최대 <strong>36개월 가입</strong> (그 이후 지역가입자로 전환)</li>
            </ul>

            <h3 className="text-lg font-semibold text-text-primary mt-4">신청 방법 & 보험료</h3>
            <div className="bg-bg-card rounded-lg p-4 space-y-2">
              <p className="text-sm">
                <strong>1. 신청처:</strong> 국민건강보험공단 지사 또는 온라인(nhis.or.kr)
              </p>
              <p className="text-sm">
                <strong>2. 필요서류:</strong> 신청서 + 퇴직증명서 + 건강보험 자격확인서
              </p>
              <p className="text-sm">
                <strong>3. 보험료:</strong> 퇴직 직전 월 직장가입자 보험료 기준 (본인이 낸 절반만 추가 납부)
              </p>
            </div>

            <h3 className="text-lg font-semibold text-text-primary mt-4">보험료 비교 사례</h3>
            <div className="bg-bg-card rounded-lg p-4 space-y-2 text-sm">
              <p className="font-semibold text-text-primary">연소득 4,800만원 은퇴자</p>
              <table className="w-full mt-2">
                <thead>
                  <tr className="border-b border-border-base">
                    <th scope="col" className="text-left py-1 px-2 font-semibold">항목</th>
                    <th scope="col" className="text-right py-1 px-2 font-semibold">월 보험료</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border-base">
                    <td className="py-1 px-2">직장가입자 (퇴직 전)</td>
                    <td className="py-1 px-2 text-right">약 17만 2,560원</td>
                  </tr>
                  <tr className="border-b border-border-base">
                    <td className="py-1 px-2">본인 부담분</td>
                    <td className="py-1 px-2 text-right">약 8만 6,280원</td>
                  </tr>
                  <tr className="border-b border-border-base">
                    <td className="py-1 px-2">지역가입자 (재산 5억)</td>
                    <td className="py-1 px-2 text-right">약 32~38만원</td>
                  </tr>
                  <tr>
                    <td className="py-1 px-2 text-text-secondary">임의계속가입 선택 시</td>
                    <td className="py-1 px-2 text-right text-primary-500 font-semibold">약 8만 6,280원 (36개월)</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-yellow-50 dark:bg-yellow-950 rounded-lg p-3 border-l-4 border-l-highlight-500">
              <p className="text-sm text-text-secondary">
                <strong>다만:</strong> 임의계속가입은 "보험료 납부"의 편의일 뿐, 보험 급여(의료비 청구 시 실손 청구 등)는 일반
                지역가입자와 동일합니다. 또한 36개월이 끝나면 지역가입자로 전환되어 다시 보험료가 올라가므로, 그 이후 대비를 미리
                해야 합니다.
              </p>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-text-primary">자주 묻는 질문</h2>
            <FaqSection items={FAQ_ITEMS} />
          </section>

          {/* Related Calculators */}
          <section className="space-y-4 pt-4 border-t border-border-base">
            <h2 className="text-2xl font-bold text-text-primary">관련 계산기 & 가이드</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <Link href="/guide/health-insurance-premium-2026/">
                <a className="p-4 rounded-lg bg-bg-card border border-border-base hover:border-primary-500 transition">
                  <h3 className="font-semibold text-text-primary mb-1">건강보험료 2026</h3>
                  <p className="text-sm text-text-secondary">직장·지역가입자 비교, 피부양자 요건</p>
                </a>
              </Link>
              <Link href="/calculator/n-jobber-insurance/">
                <a className="p-4 rounded-lg bg-bg-card border border-border-base hover:border-primary-500 transition">
                  <h3 className="font-semibold text-text-primary mb-1">N잡러 건강보험 계산기</h3>
                  <p className="text-sm text-text-secondary">다중소득 피부양자 탈락 판정</p>
                </a>
              </Link>
              <Link href="/calculator/freelancer-tax/">
                <a className="p-4 rounded-lg bg-bg-card border border-border-base hover:border-primary-500 transition">
                  <h3 className="font-semibold text-text-primary mb-1">프리랜서 종합소득세</h3>
                  <p className="text-sm text-text-secondary">소득 신고 시뮬레이션</p>
                </a>
              </Link>
              <Link href="/guide/national-pension-premium-2026/">
                <a className="p-4 rounded-lg bg-bg-card border border-border-base hover:border-primary-500 transition">
                  <h3 className="font-semibold text-text-primary mb-1">국민연금료 2026</h3>
                  <p className="text-sm text-text-secondary">자영업자·프리랜서 보험료</p>
                </a>
              </Link>
            </div>
          </section>

          {/* Share & Disclaimer */}
          <section className="space-y-4 pt-4 border-t border-border-base">
            <ShareButtons
              title="2026 건강보험 지역가입자 보험료 — 소득·재산 점수 계산법"
              url={URL}
              description="지역가입자 월 보험료 = 소득 × 7.19% + 재산점수 × 211.5원. 임의계속가입 제도로 보험료 부담 완화."
            />

            <div className="bg-bg-card rounded-lg p-4 border border-border-base">
              <h3 className="text-sm font-semibold text-text-primary mb-2">면책 및 정보 출처</h3>
              <ul className="space-y-1 text-xs text-text-secondary">
                <li>
                  • 본 가이드는 국민건강보험법(§69, §71, §72, §165) 및{' '}
                  <a
                    href="https://www.nhis.or.kr"
                    rel="nofollow"
                    className="text-primary-500 hover:underline"
                  >
                    국민건강보험공단
                  </a>
                  공식 기준 기준 작성되었습니다.
                </li>
                <li>
                  • 실제 보험료는 소득·재산 신고 현황, 지자체별 재산 평가액 변동에 따라 달라질 수 있습니다.
                </li>
                <li>
                  • 정확한 예상액은 국민건강보험공단 가입자 맞춤 모의계산기(nhis.or.kr)에서 확인하시기 바랍니다.
                </li>
                <li>
                  • 본 내용은 AI 보조 작성 후 운영자 검수를 거쳤습니다. (2026-06-15)
                </li>
              </ul>
            </div>
          </section>
        </main>
      </div>
      <Footer />
    </div>
  );
}
