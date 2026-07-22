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

const URL = 'https://calculatorhost.com/guide/separate-vs-comprehensive-taxation-master-2026/';
const DATE_PUBLISHED = '2026-05-31';
const DATE_MODIFIED = '2026-05-31';

export const metadata: Metadata = {
  title: '분리과세 vs 종합과세 2026 마스터 가이드 — 금융소득·사적연금·기타소득',
  description:
    '5월 31일 종합소득세 마감일. 금융소득(이자배당) 2,000만·사적연금 1,500만·기타소득 300만 한도 내 분리과세 vs 누진세 종합과세 선택 기준. 실제 시뮬 3개로 최대 절세액 계산.',
  keywords: [
    '분리과세 종합과세',
    '금융소득 2000만',
    '사적연금 1500만',
    '기타소득 300만',
    '분리과세 선택권',
    '누진세율 합산',
    '소득세법 14조',
    '5월 신고 마감',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '분리과세 vs 종합과세 2026 마스터 가이드 — 금융소득·사적연금·기타소득' }],
    title: '분리과세 vs 종합과세 선택 마스터 2026 | 최대 절세 전략',
    description: '금융소득·사적연금·기타소득 분리과세 한도 완벽 정리. 언제 분리? 언제 합산? 시뮬 3개로 당신의 최적 선택 계산.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '분리과세 vs 종합과세 2026 선택 기준',
    description: '5월 마감 당일 신고 전 필독. 금융소득 2,000만·사적연금 1,500만·기타소득 300만 한도 판단.',
  },
};

const FAQ_ITEMS = [
  {
    question: '금융소득이 정확히 얼마부터 분리과세 불가능한가요?',
    answer:
      '소득세법 §14 ⑥에서 "금융소득 2,000만 원 초과"이면 분리과세 선택권이 없고 반드시 종합과세합니다. 2,000만이 정확한 경계이므로, 2,000만 1원이면 전액 종합과세 의무입니다. 국세청 홈택스에서 종합소득세 신고 시 금융소득 합계가 2,000만을 초과하면 자동으로 분리과세 선택 옵션이 비활성화됩니다.',
  },
  {
    question: '사적연금과 금융소득을 합치면 2,000만 넘으면 어떻게 되나요?',
    answer:
      '각각 별도로 계산합니다. 소득세법 §14 ③에서 사적연금은 "1,500만 원 이하" 분리과세(3.3%~5.5%), 금융소득은 "2,000만 원 이하" 분리과세(15.4%)로 정해져 있습니다. 둘을 합산하지 않으므로, 사적연금 1,500만 + 금융소득 2,000만 = 총 3,500만이 분리과세 대상이 될 수 있습니다.',
  },
  {
    question: '기타소득이 250만이면 정말 분리과세(22%) 선택만 하고 신고 면제되나요?',
    answer:
      '맞습니다. 기타소득이 300만 원 이하면 분리과세 선택 시 5월 31일 신고 의무가 면제됩니다(소득세법 §14 ⑦). 국세청이 이미 22% 원천징수를 하고 종결하므로, 별도 신고할 필요가 없습니다. 다만 환급받고 싶으면 나중에 수정신고(종소세 신고)를 할 수 있습니다.',
  },
  {
    question: '누진세 계산 시 "누진공제"는 정확히 뭔가요?',
    answer:
      '누진공제는 누진세율 적용 시 자동으로 차감되는 금액입니다(소득세법 §55). 예: 과세표준 5,000만원 × 15% − 누진공제 126만 = 세액 654만 원. 누진공제가 없다면 매우 높은 세액이 되므로, 계산 시 반드시 포함해야 합니다. 각 세율 구간마다 정해진 누진공제 금액이 있습니다.',
  },
  {
    question: '분리과세 선택을 포기하고 싶으면 어떻게 하나요?',
    answer:
      '홈택스 "종합소득세 신고" 메뉴에서 "분리과세 배제 선택" 항목을 체크해야 합니다(소득세법 §14 ⑦의2). 기본 선택이 분리과세이므로, 합산 종합과세를 원하면 명시적으로 "배제 선택"을 하지 않으면 자동으로 분리과세로 처리됩니다. 신고 전 반드시 확인하세요.',
  },
  {
    question: '사적연금 1,500만 초과하면 일시금 수령을 미루는 게 맞나요?',
    answer:
      '상황에 따라 다릅니다. 사적연금이 1,500만을 초과하면 분리과세(3.3~5.5%) 대신 종합과세(누진세 6~45%)로 올라갑니다. 다만 수령을 다음 연도로 미루면 그 해 1,500만 한도 내에서 분리과세 가능합니다. 장기적으로는 절세 효과가 있으나, 각 연도 소득 규모를 종합 고려해 결정해야 합니다.',
  },
  {
    question: '기타소득 300만과 금융소득 300만을 동시에 받으면요?',
    answer:
      '각각 독립적입니다. 기타소득 300만은 분리과세 선택권이 있고(22%), 금융소득 300만도 분리과세 가능(15.4%)합니다. 두 소득의 한도를 독립적으로 판단하므로, 기타소득 300만 + 금융소득 300만 = 총 600만이 분리과세 대상이 될 수 있습니다. 단, 각각의 한도를 초과하면 그 초과분만 종합과세합니다.',
  },
  {
    question: '직장이 없는 사람이 기타소득 200만 + 금융소득 500만 받으면?',
    answer:
      '이 경우 종합과세 의무입니다. 기타소득 200만(분리과세 선택 가능, 22%)과 금융소득 500만(2,000만 초과 아니므로 분리과세 선택 가능, 15.4%)을 각각 분리과세하면 총 약 126.8만 원의 세액입니다. 합산할 이유가 없으므로 각각 분리과세 선택이 최고로 유리합니다. 신고 의무: 기타소득 300만 초과 아님 면제, 금융소득만 신고(분리과세 선택 시 자동 처리).',
  },
];

export default function SeparateVsComprehensiveTaxationMaster2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '분리과세 vs 종합과세' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '분리과세 vs 종합과세 2026 마스터 가이드 — 금융소득·사적연금·기타소득 선택 기준',
    description:
      '5월 31일 종합소득세 마감. 금융소득 2,000만·사적연금 1,500만·기타소득 300만 한도 내 분리과세 vs 누진세 종합과세 선택 판단. 실제 사례 3개 시뮬로 최대 절세액 계산. 소득세법 §14.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['분리과세', '종합과세', '금융소득', '기타소득', '사적연금'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '분리과세 vs 종합과세 2026 마스터 가이드',
    description:
      '5월 31일 신고 당일 최종 점검. 금융소득 2,000만·사적연금 1,500만·기타소득 300만 분리과세 한도 판단·선택권 활용·세액 비교·실제 사례.',
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
                  { name: '분리과세 vs 종합과세 마스터' },
                ]}
                category="세금"
                readingMinutes={15}
                publishedDate="2026-05-31"
                title="분리과세 vs 종합과세 2026 마스터"
                subtitle="— 금융소득·사적연금·기타소득 한도별 선택 기준"
                lead={
                  <p data-speakable>
                    <strong>5월 31일 오늘, 종합소득세 신고 당일입니다.</strong>
                    금융소득(이자배당)을 받거나 사적연금·기타소득(강사료, 원고료)이 있다면 마지막 결정이 필요합니다.
                    받은 소득을 <strong>"분리과세"(낮은 일괄 세율)로 처리할지, "종합과세"(누진세 적용)로 합산할지</strong>
                    가 당신의 최종 납부액을 크게 좌우합니다. 같은 금액을 받아도 선택에 따라 세금이 2배~3배 달라질 수 있습니다.
                    이 가이드는 소득세법 §14를 근거로 금융소득 2,000만 원·사적연금 1,500만 원·기타소득 300만 원의 한도 판단과
                    실제 3가지 사례 시뮬로 당신의 최적 선택을 안내합니다.
                  </p>
                }
              />

              <AdSlot slot="guide-separate-vs-comprehensive-taxation-top" format="horizontal" />

              {/* 핵심 요약 */}
              <section aria-label="핵심 요약" className="card border-l-4 border-l-primary-500">
                <h2 className="mb-4 text-2xl font-bold text-primary-700 dark:text-primary-300">핵심 정리</h2>
                <div className="mb-4 overflow-x-auto">
                  <table className="w-full text-sm" data-speakable>
                    <caption className="mb-2 text-left font-semibold text-text-primary">분리과세 한도 일괄표</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th className="px-3 py-2 text-left">소득 종류</th>
                        <th className="px-3 py-2 text-center">분리과세 한도</th>
                        <th className="px-3 py-2 text-right">분리과세 세율</th>
                        <th className="px-3 py-2 text-left">초과 시</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="px-3 py-2 font-semibold">금융소득(이자배당)</td>
                        <td className="px-3 py-2 text-center">2,000만 원 이하</td>
                        <td className="px-3 py-2 text-right">15.4%</td>
                        <td className="px-3 py-2">누진세 종합과세</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="px-3 py-2 font-semibold">사적연금</td>
                        <td className="px-3 py-2 text-center">1,500만 원 이하</td>
                        <td className="px-3 py-2 text-right">3.3~5.5%</td>
                        <td className="px-3 py-2">누진세 종합과세</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="px-3 py-2 font-semibold">기타소득</td>
                        <td className="px-3 py-2 text-center">300만 원 이하</td>
                        <td className="px-3 py-2 text-right">22% (선택)</td>
                        <td className="px-3 py-2">합산 필수</td>
                      </tr>
                      <tr>
                        <td className="px-3 py-2 font-semibold text-text-tertiary">근로소득</td>
                        <td className="px-3 py-2 text-center text-text-tertiary">-</td>
                        <td className="px-3 py-2 text-right text-text-tertiary">누진세만</td>
                        <td className="px-3 py-2 text-text-tertiary">다른 소득과 합산</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="rounded-lg bg-primary-500/10 p-4 text-sm text-primary-700 dark:text-primary-300">
                  <p className="font-semibold">TL;DR — 5가지 판단 포인트</p>
                  <ul className="mt-2 list-inside list-disc space-y-1">
                    <li>
                      <strong>금융소득 2,000만:</strong> 넘으면 분리과세 불가능 → 모두 누진세 종합과세 의무
                    </li>
                    <li>
                      <strong>사적연금 1,500만:</strong> 각각 독립 판단 (금융소득과 합산 X)
                    </li>
                    <li>
                      <strong>기타소득 300만:</strong> 선택권 있음 (분리 22% or 합산)
                    </li>
                    <li>
                      <strong>근로소득이 있으면:</strong> 높은 누진세 구간이므로 금융·기타는 분리과세 유리할 가능성 높음
                    </li>
                    <li>
                      <strong>근로소득 없으면:</strong> 금융소득 합산 시 세율이 낮을 수 있으므로 비교 필수
                    </li>
                  </ul>
                </div>
              </section>

              {/* 1. 분리과세 vs 종합과세 정의 */}
              <section className="space-y-4">
                <h2 className="text-2xl font-bold">1. Q. 분리과세와 종합과세는 정확히 뭔가요?</h2>
                <div className="rounded-lg bg-bg-card p-3 text-sm">
                  <p className="font-semibold text-text-primary">정의</p>
                  <p className="mt-1 text-text-secondary">
                    소득세법 §14에서 정한 두 가지 과세 방식입니다. 분리과세는 특정 소득에 대해 낮은 일괄 세율을 적용하고 다른 소득과 합산하지 않는 것입니다. 종합과세는 여러 소득을 합산하여 누진세율을 적용하는 것입니다.
                  </p>
                </div>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  분리과세는 소득세법이 정한 특정 소득 종류(금융소득, 사적연금, 기타소득)에 대해 일괄적인 낮은 세율을 정하고, 다른 소득(근로소득 등)과 분리하여 계산하는 방식입니다(소득세법 §14 ⑥·⑦·③). 반면 종합과세는 모든 소득을 합산하여 누진세율(소득세법 §55, 6~45%)을 적용하는 것입니다.
                </p>

                <div className="space-y-3 rounded-lg bg-bg-raised p-4">
                  <p className="font-semibold text-text-primary">분리과세 vs 종합과세 비교</p>
                  <div className="space-y-2 text-sm text-text-secondary">
                    <div className="rounded-lg bg-bg-card p-3">
                      <p className="font-semibold text-text-primary">분리과세 방식</p>
                      <ul className="mt-2 list-inside list-disc space-y-1">
                        <li>특정 소득(금융, 사적연금, 기타)만 별도로 계산</li>
                        <li>일괄 세율 적용 (15.4%, 3.3~5.5%, 22% 등)</li>
                        <li>다른 소득과 합산 안 함 = 낮은 누진세 회피</li>
                        <li>신고 절차 간편 (300만 이하 기타소득은 면제 가능)</li>
                      </ul>
                    </div>

                    <div className="rounded-lg bg-bg-card p-3">
                      <p className="font-semibold text-text-primary">종합과세 방식</p>
                      <ul className="mt-2 list-inside list-disc space-y-1">
                        <li>근로소득, 기타소득, 금융소득 등 모두 합산</li>
                        <li>누진세율 적용 (6~45%, 누진공제 차감)</li>
                        <li>높은 소득일수록 높은 세율 (누진세 효과)</li>
                        <li>부양가족 공제, 신용카드 공제 등 추가 혜택 가능</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border-l-4 border-l-highlight-500 bg-highlight-500/5 p-4 text-sm text-text-secondary">
                  <p className="font-semibold text-text-primary">핵심 원리</p>
                  <p className="mt-2">
                    분리과세는 "소수의 특정 소득에 낮은 일괄 세율을 주겠다"는 정책이고, 종합과세는 "모든 소득을 합산하여 공평하게 누진세를 적용한다"는 원칙입니다. 어느 것이 더 유리한지는 <strong>당신의 전체 소득 규모</strong>에 따라 달라집니다.
                  </p>
                </div>
              </section>

              {/* 2. 금융소득 2,000만 한도 */}
              <section className="space-y-4">
                <h2 className="text-2xl font-bold">2. Q. 금융소득 2,000만 원이 정확히 어디서 나온 기준인가요?</h2>
                <div className="rounded-lg bg-bg-card p-3 text-sm">
                  <p className="font-semibold text-text-primary">정의</p>
                  <p className="mt-1 text-text-secondary">
                    소득세법 §14 ⑥에서 정한 분리과세 한도입니다. 금융소득(이자, 배당)이 2,000만 원 이하면 15.4% 분리과세 선택 가능. 2,000만 원을 초과하면 분리과세 선택권이 없고 모든 금융소득이 종합과세 대상입니다.
                  </p>
                </div>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  금융소득 2,000만 원 한도는 국회에서 2010년 정한 정책 결정으로, 일반 직장인의 이자·배당 소득을 보호하면서도 고액 자산가는 누진세를 적용하겠다는 취지입니다. 정기예금 이자, 적금 이자, 주식 배당금, 뮤추얼펀드 분배금 등이 모두 금융소득으로 분류됩니다.
                </p>

                <div className="space-y-3 rounded-lg bg-bg-raised p-4">
                  <p className="font-semibold text-text-primary">금융소득 2,000만 경계 판정</p>
                  <div className="space-y-2 text-sm text-text-secondary">
                    <div className="mb-3 rounded-lg bg-bg-card p-3">
                      <p className="font-semibold text-text-primary">금융소득 2,000만 이하 (분리과세 가능)</p>
                      <ul className="mt-2 list-inside list-disc space-y-1">
                        <li>정기예금 이자 1,000만 + 적금 이자 500만 + 주식배당 400만 = 1,900만 원</li>
                        <li>세액: 1,900만 × 15.4% = 약 293만 원</li>
                        <li className="text-xs italic text-text-tertiary">→ 분리과세 선택 가능 (신고 면제 가능)</li>
                      </ul>
                    </div>

                    <div className="rounded-lg bg-bg-card p-3">
                      <p className="font-semibold text-text-primary">금융소득 2,000만 초과 (종합과세 의무)</p>
                      <ul className="mt-2 list-inside list-disc space-y-1">
                        <li>정기예금 이자 1,200만 + 적금 이자 600만 + 주식배당 300만 = 2,100만 원</li>
                        <li>세액: 2,100만 원 전체가 종합과세 (누진세율 6~15% 이상)</li>
                        <li className="font-semibold text-danger-500">수정: 분리과세 불가능 → 누진세 강제 적용</li>
                        <li className="text-xs italic text-text-tertiary">→ 근로소득 없으면 세율 15%, 근로소득 있으면 더 높아질 수 있음</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border-l-2 border-l-danger-500 bg-danger-500/5 p-4 text-sm text-text-secondary">
                  <p className="font-semibold text-danger-700 dark:text-danger-300">주의: 2,000만 1원이라도 경계 초과</p>
                  <p className="mt-2">
                    금융소득이 정확히 2,000만 원이면 분리과세 가능하지만, 2,000만 원 1원이 되는 순간 전액 종합과세 의무입니다(소득세법 §14 ⑥). 국세청 홈택스는 센트 단위까지 계산하므로, 금융소득 신고 전에 정확한 합계를 확인하세요.
                  </p>
                </div>
              </section>

              {/* 3. 사적연금 1,500만 한도 */}
              <section className="space-y-4">
                <h2 className="text-2xl font-bold">3. Q. 사적연금(퇴직금 수령·연금상품)이 1,500만 원을 넘으면?</h2>
                <div className="rounded-lg bg-bg-card p-3 text-sm">
                  <p className="font-semibold text-text-primary">정의</p>
                  <p className="mt-1 text-text-secondary">
                    소득세법 §14 ③ 9호에서 "사적연금 소득" 1,500만 원 이하는 분리과세(3.3~5.5%) 선택 가능. 초과 시 종합과세 의무입니다. 사적연금은 퇴직소득(퇴직금), 연금 수령(연금보험, 개인연금), 기타 연금 상품을 의미합니다.
                  </p>
                </div>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  사적연금은 금융소득과 별개입니다. 즉, 금융소득 2,000만 + 사적연금 1,500만이 동시에 분리과세 가능할 수 있다는 뜻입니다(각각 독립적 한도). 다만 각 한도를 초과하면 그 초과분이 종합과세 대상이 되어 누진세가 적용됩니다(소득세법 §14).
                </p>

                <div className="space-y-3 rounded-lg bg-bg-raised p-4">
                  <p className="font-semibold text-text-primary">사적연금 분리과세 세율 (연령별)</p>
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs text-text-secondary border-collapse">
                      <thead>
                        <tr className="border-b border-border-base">
                          <th className="px-2 py-1 text-left">연령</th>
                          <th className="px-2 py-1 text-right">분리과세 세율</th>
                          <th className="px-2 py-1 text-left">예시</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-border-base">
                          <td className="px-2 py-1">55세 이상</td>
                          <td className="px-2 py-1 text-right font-semibold">3.3%</td>
                          <td className="px-2 py-1">55세 이상 연금 수령 시 최저 세율</td>
                        </tr>
                        <tr className="border-b border-border-base">
                          <td className="px-2 py-1">45세 이상 55세 미만</td>
                          <td className="px-2 py-1 text-right font-semibold">4.4%</td>
                          <td className="px-2 py-1">조기 수령 시</td>
                        </tr>
                        <tr>
                          <td className="px-2 py-1">45세 미만</td>
                          <td className="px-2 py-1 text-right font-semibold">5.5%</td>
                          <td className="px-2 py-1">조기 수령 시 최고 세율</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="space-y-3 rounded-lg bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">실제 사례: 사적연금 1,500만 한도</p>
                  <div className="space-y-2 text-sm text-text-secondary">
                    <div className="mb-3 rounded-lg bg-bg-raised p-3">
                      <p className="font-semibold text-text-primary">A씨 (60세), 개인연금보험 1,200만 수령</p>
                      <ul className="mt-2 list-inside list-disc space-y-1">
                        <li>분리과세 선택: 1,200만 × 3.3% = 약 39.6만 원</li>
                        <li>한도 내 → 분리과세 선택 가능, 신고 면제</li>
                        <li className="text-xs italic text-text-tertiary">→ 최저 세율 적용으로 절세</li>
                      </ul>
                    </div>

                    <div className="rounded-lg bg-bg-raised p-3">
                      <p className="font-semibold text-text-primary">B씨 (40세), 퇴직금 1,800만 + 개인연금 500만 수령</p>
                      <ul className="mt-2 list-inside list-disc space-y-1">
                        <li>총 사적연금 = 1,800만 + 500만 = 2,300만</li>
                        <li>분리과세 한도: 1,500만까지만</li>
                        <li>초과분: 2,300만 − 1,500만 = 800만 (종합과세 의무)</li>
                        <li className="font-semibold text-danger-500">세율: 분리 1,500만 × 5.5% + 초과 800만 × 누진세(15~24%)</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border-l-2 border-l-primary-500 bg-primary-500/5 p-4 text-sm text-text-secondary">
                  <p className="font-semibold text-text-primary">팁: 수령 시기 전략</p>
                  <p className="mt-2">
                    사적연금이 1,500만을 초과하면 다음 연도로 수령을 미루는 것도 전략입니다. 예: 2026년에 1,800만을 받을 예정이면, 1,500만은 2026년에, 300만은 2027년에 수령하면 각각 분리과세(3.3~5.5%)로 처리 가능합니다. 다만 연금 계약 조건을 먼저 확인하세요.
                  </p>
                </div>
              </section>

              <AdSlot slot="guide-separate-vs-comprehensive-taxation-mid" format="rectangle" />

              {/* 4. 기타소득 300만 선택권 */}
              <section className="space-y-4">
                <h2 className="text-2xl font-bold">4. Q. 기타소득 300만 이하 분리과세(22%) 선택권을 어떻게 쓰나요?</h2>
                <div className="rounded-lg bg-bg-card p-3 text-sm">
                  <p className="font-semibold text-text-primary">정의</p>
                  <p className="mt-1 text-text-secondary">
                    소득세법 §14 ⑦에서 기타소득(강사료, 원고료 등) 300만 원 이하면 "선택권"이 있습니다. 22% 분리과세를 선택하거나, 다른 소득과 합산하여 종합과세할 수 있습니다. 선택하지 않으면 자동으로 분리과세로 처리됩니다.
                  </p>
                </div>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  기타소득이 300만 원 이하면 국세청이 이미 22% 원천징수를 하기 때문에, 신고 의무가 자동 면제됩니다. 다만 "분리과세를 포기하고 싶다"면 홈택스 신고 시 "분리과세 배제 선택"을 명시해야 합니다. 이 경우 다른 소득(근로소득 등)과 합산하여 종합과세하면 세금을 더 절감할 수 있는 경우도 있습니다.
                </p>

                <div className="space-y-3 rounded-lg bg-bg-raised p-4">
                  <p className="font-semibold text-text-primary">기타소득 300만 선택 판단표</p>
                  <div className="space-y-2 text-sm text-text-secondary">
                    <div className="rounded-lg bg-bg-card p-3">
                      <p className="font-semibold text-text-primary">분리과세(22%) 선택해야 할 경우</p>
                      <ul className="mt-2 list-inside list-disc space-y-1">
                        <li>근로소득 5,000만 이상 (높은 누진세 구간)</li>
                        <li>기타소득 300만 이하</li>
                        <li>신고 절차를 피하고 싶을 때</li>
                        <li>분리과세 22% &lt; 합산 누진세율일 때</li>
                      </ul>
                    </div>

                    <div className="rounded-lg bg-bg-card p-3">
                      <p className="font-semibold text-text-primary">합산 종합과세 선택해야 할 경우</p>
                      <ul className="mt-2 list-inside list-disc space-y-1">
                        <li>근로소득 1,500~3,000만 (낮은 누진세 구간)</li>
                        <li>기타소득 합산 시 세율이 6~15% 유지되는 경우</li>
                        <li>부양가족 공제, 신용카드 공제로 환급받고 싶을 때</li>
                        <li>합산 누진세액 &lt; 분리과세 22%일 때</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 rounded-lg bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">실제 사례: 기타소득 300만 선택 비교</p>
                  <div className="space-y-2 text-sm text-text-secondary">
                    <div className="mb-3 rounded-lg bg-bg-raised p-3">
                      <p className="font-semibold text-text-primary">시나리오 A: 직장 2,000만 + 기타소득(강사료) 200만</p>
                      <ul className="mt-2 list-inside list-disc space-y-1">
                        <li>분리과세: 200만 × 60% × 22% = 약 26.4만 원</li>
                        <li>합산: (1,600만 + 120만) × 6% = 약 103.2만 원</li>
                        <li className="font-semibold text-primary-600">분리과세가 훨씬 유리 (약 76.8만 절감)</li>
                      </ul>
                    </div>

                    <div className="rounded-lg bg-bg-raised p-3">
                      <p className="font-semibold text-text-primary">시나리오 B: 근로소득 없음 + 기타소득 250만</p>
                      <ul className="mt-2 list-inside list-disc space-y-1">
                        <li>분리과세 선택: 250만 × 60% × 22% = 약 33만 원 (신고 면제)</li>
                        <li>합산 신고: 150만 × 6% = 약 9만 원</li>
                        <li className="font-semibold text-danger-500">합산이 훨씬 유리 (약 24만 절감) + 신고 필수</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border-l-4 border-l-highlight-500 bg-highlight-500/5 p-4 text-sm text-text-secondary">
                  <p className="font-semibold text-text-primary">홈택스 신고 팁</p>
                  <p className="mt-2">
                    분리과세는 기본 선택입니다. 합산하려면 홈택스 종합소득세 신고 화면에서 <strong>"분리과세 배제 선택"</strong> 항목을 명시적으로 체크해야 합니다. 체크하지 않으면 자동으로 분리과세 22%로 처리됩니다.
                  </p>
                </div>
              </section>

              {/* 5. 실제 시뮬레이션 3가지 */}
              <section className="space-y-4">
                <h2 className="text-2xl font-bold">5. 실제 사례로 보는 최적 선택 시뮬레이션 3가지</h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  다음 3가지 사례로 당신의 상황과 비교하여 최적 선택을 판단하세요.
                </p>

                <div className="space-y-3 rounded-lg bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">사례 A: 직장 월급 + 금융소득 + 기타소득 복합 보유</p>
                  <div className="space-y-2 text-sm text-text-secondary">
                    <div className="rounded-lg bg-bg-raised p-3">
                      <p className="mb-2 font-semibold">상황</p>
                      <ul className="list-inside list-disc space-y-1">
                        <li>근로소득: 4,000만 (과세표준 약 3,200만)</li>
                        <li>금융소득(주식 배당 + 적금 이자): 1,500만</li>
                        <li>기타소득(강사료): 200만 (필요경비 60% = 120만)</li>
                      </ul>
                    </div>
                    <div className="rounded-lg bg-bg-raised p-3">
                      <p className="mb-2 font-semibold">선택 1: 모두 분리과세</p>
                      <ul className="list-inside list-disc space-y-1">
                        <li>금융소득: 1,500만 × 15.4% = 231만 원</li>
                        <li>기타소득: 120만 × 22% = 26.4만 원</li>
                        <li className="font-semibold">분리과세 합계: 약 257.4만 원</li>
                      </ul>
                    </div>
                    <div className="rounded-lg bg-bg-raised p-3">
                      <p className="mb-2 font-semibold">선택 2: 모두 합산 종합과세</p>
                      <ul className="list-inside list-disc space-y-1">
                        <li>과세표준: 3,200만 + 1,500만 + 120만 = 4,820만</li>
                        <li>누진세: 4,820만 × 15% − 누진공제 126만 = 약 597만 원</li>
                        <li className="font-semibold">종합과세 합계: 약 597만 원</li>
                      </ul>
                    </div>
                    <div className="rounded-lg bg-highlight-500/10 p-3">
                      <p className="font-semibold text-text-primary">결론</p>
                      <p className="mt-1">분리과세가 약 339.6만 원 더 유리합니다. 근로소득 4,000만 구간은 누진세가 15%이므로, 분리과세의 15.4%와 22%가 오히려 더 낮습니다.</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 rounded-lg bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">사례 B: 사적연금 1,500만 + 금융소득 1,000만 (무직자)</p>
                  <div className="space-y-2 text-sm text-text-secondary">
                    <div className="rounded-lg bg-bg-raised p-3">
                      <p className="mb-2 font-semibold">상황</p>
                      <ul className="list-inside list-disc space-y-1">
                        <li>근로소득: 0 (올해 퇴직)</li>
                        <li>사적연금(퇴직금 + 개인연금): 1,500만</li>
                        <li>금융소득(정기예금 이자): 1,000만</li>
                      </ul>
                    </div>
                    <div className="rounded-lg bg-bg-raised p-3">
                      <p className="mb-2 font-semibold">선택 1: 모두 분리과세</p>
                      <ul className="list-inside list-disc space-y-1">
                        <li>사적연금(55세): 1,500만 × 3.3% = 49.5만 원</li>
                        <li>금융소득: 1,000만 × 15.4% = 154만 원</li>
                        <li className="font-semibold">분리과세 합계: 약 203.5만 원</li>
                      </ul>
                    </div>
                    <div className="rounded-lg bg-bg-raised p-3">
                      <p className="mb-2 font-semibold">선택 2: 모두 합산 종합과세</p>
                      <ul className="list-inside list-disc space-y-1">
                        <li>과세표준: 1,500만 + 1,000만 = 2,500만</li>
                        <li>누진세: 2,500만 × 15% − 누진공제 126만 = 약 249만 원</li>
                        <li className="font-semibold">종합과세 합계: 약 249만 원</li>
                      </ul>
                    </div>
                    <div className="rounded-lg bg-highlight-500/10 p-3">
                      <p className="font-semibold text-text-primary">결론</p>
                      <p className="mt-1">분리과세가 약 45.5만 원 더 유리합니다. 각각 독립적 한도(1,500만, 1,000만)를 활용하는 것이 효율적입니다.</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 rounded-lg bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">사례 C: 기타소득 250만 (근로소득 1,200만)</p>
                  <div className="space-y-2 text-sm text-text-secondary">
                    <div className="rounded-lg bg-bg-raised p-3">
                      <p className="mb-2 font-semibold">상황</p>
                      <ul className="list-inside list-disc space-y-1">
                        <li>근로소득: 1,200만 (과세표준 약 960만)</li>
                        <li>기타소득(강사료): 250만 (필요경비 60% = 150만)</li>
                        <li>부양가족: 배우자 + 자녀 2명 (공제 예상)</li>
                      </ul>
                    </div>
                    <div className="rounded-lg bg-bg-raised p-3">
                      <p className="mb-2 font-semibold">선택 1: 분리과세(22%)</p>
                      <ul className="list-inside list-disc space-y-1">
                        <li>기타소득: 150만 × 22% = 33만 원</li>
                        <li>근로소득: 960만 × 6% = 57.6만 원</li>
                        <li className="font-semibold">분리과세 합계: 약 90.6만 원 (신고 면제)</li>
                      </ul>
                    </div>
                    <div className="rounded-lg bg-bg-raised p-3">
                      <p className="mb-2 font-semibold">선택 2: 합산 종합과세 + 부양가족 공제</p>
                      <ul className="list-inside list-disc space-y-1">
                        <li>과세표준(합산): 960만 + 150만 = 1,110만</li>
                        <li>누진세: 1,110만 × 6% = 66.6만 원</li>
                        <li>부양가족 공제(4명): 약 42.4만 원</li>
                        <li className="font-semibold">종합과세 순세액: 약 24.2만 원 (환급)</li>
                      </ul>
                    </div>
                    <div className="rounded-lg bg-highlight-500/10 p-3">
                      <p className="font-semibold text-text-primary">결론</p>
                      <p className="mt-1">합산 종합과세가 약 114.8만 원 더 유리합니다. 낮은 소득 구간 + 부양가족 공제로 환급까지 가능합니다. 5월 신고는 필수지만, 절세 효과가 큽니다.</p>
                    </div>
                  </div>
                </div>
              </section>

              {/* 6. 선택 체크리스트 */}
              <section className="space-y-4">
                <h2 className="text-2xl font-bold">6. 신고 전 최종 선택 체크리스트</h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  5월 31일 자정 전에 다음을 확인하고 최종 선택을 하세요.
                </p>

                <div className="space-y-2 rounded-lg bg-bg-card p-4 text-sm">
                  <div className="flex items-start gap-2">
                    <input type="checkbox" id="sep1" className="mt-1" />
                    <label htmlFor="sep1" className="text-text-secondary">
                      <strong>금융소득 합계 확인:</strong> 2,000만 이하? 초과? 증권사·은행 소득명세서 확인
                    </label>
                  </div>
                  <div className="flex items-start gap-2">
                    <input type="checkbox" id="sep2" className="mt-1" />
                    <label htmlFor="sep2" className="text-text-secondary">
                      <strong>사적연금 합계 확인:</strong> 1,500만 이하? 개인연금 + 퇴직금 모두 합산
                    </label>
                  </div>
                  <div className="flex items-start gap-2">
                    <input type="checkbox" id="sep3" className="mt-1" />
                    <label htmlFor="sep3" className="text-text-secondary">
                      <strong>기타소득 합계 확인:</strong> 300만 이하? (강사료, 원고료, 상금 등)
                    </label>
                  </div>
                  <div className="flex items-start gap-2">
                    <input type="checkbox" id="sep4" className="mt-1" />
                    <label htmlFor="sep4" className="text-text-secondary">
                      <strong>근로소득 확인:</strong> 직장 월급 또는 퇴직금 전체 금액
                    </label>
                  </div>
                  <div className="flex items-start gap-2">
                    <input type="checkbox" id="sep5" className="mt-1" />
                    <label htmlFor="sep5" className="text-text-secondary">
                      <strong>분리 vs 합산 세액 비교:</strong>{' '}
                      <Link href="/calculator/salary/" className="text-primary-600 underline">
                        연봉 계산기
                      </Link>{' '}
                      또는 홈택스 시뮬레이션으로 직접 계산
                    </label>
                  </div>
                  <div className="flex items-start gap-2">
                    <input type="checkbox" id="sep6" className="mt-1" />
                    <label htmlFor="sep6" className="text-text-secondary">
                      <strong>부양가족 공제 여부:</strong> 부양가족이 있으면 합산 시 추가 공제 가능 (환급 기회)
                    </label>
                  </div>
                  <div className="flex items-start gap-2">
                    <input type="checkbox" id="sep7" className="mt-1" />
                    <label htmlFor="sep7" className="text-text-secondary">
                      <strong>최종 결정:</strong> 분리과세 선택 (자동 기본값) or 합산 신고(홈택스에서 "분리과세 배제 선택" 명시)
                    </label>
                  </div>
                </div>
              </section>

              <FaqSection items={[...FAQ_ITEMS]} />

              {/* 최종 주의사항 */}
              <section className="card border-l-2 border-l-danger-500 bg-danger-500/5">
                <h2 className="mb-3 text-lg font-semibold text-danger-700 dark:text-danger-300">5월 31일 신고 전 필독 주의사항</h2>
                <ul className="space-y-2 text-sm text-danger-700 dark:text-danger-300">
                  <li>
                    • <strong>금융소득 2,000만 경계:</strong> 1원 차이로 분리과세 전체 불가능. 정확한 합계 확인 필수.
                  </li>
                  <li>
                    • <strong>사적연금·금융소득·기타소득 각각 독립:</strong> 합산 X. 각각의 한도를 초과하면 그 초과분만 종합과세.
                  </li>
                  <li>
                    • <strong>분리과세는 기본 선택:</strong> 기타소득 300만 이하는 22% 분리과세가 기본값. 합산하려면 홈택스에서 명시 필수.
                  </li>
                  <li>
                    • <strong>누진공제 반드시 차감:</strong> 종합과세 세액 계산 시 누진공제 누락 금지 (50% 이상 오차 가능).
                  </li>
                  <li>
                    • <strong>근로소득 5,000만 이상:</strong> 분리과세(15.4%, 22%)가 누진세보다 훨씬 유리할 가능성 높음.
                  </li>
                  <li>
                    • <strong>근로소득 1,500~3,000만 + 기타소득:</strong> 합산 시 세율 6% 유지 가능 → 분리과세(22%) 포기 고려.
                  </li>
                  <li>
                    • <strong>5월 31일(금) 자정 마감:</strong> 온라인 신고는 자정까지, 오프라인은 영업시간까지. 서둘러주세요.
                  </li>
                </ul>
              </section>

              {/* 관련 링크 */}
              <section className="card">
                <h2 className="mb-4 text-lg font-semibold">관련 계산기·가이드</h2>
                <ul className="space-y-2 text-sm">
                  <li>
                    →{' '}
                    <Link href="/calculator/salary/" className="text-primary-600 underline dark:text-primary-500">
                      연봉 실수령액 계산기
                    </Link>
                    {' '}— 근로소득 세액 시뮬레이션
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
                    <Link
                      href="/guide/financial-income-comprehensive-vs-separate-taxation/"
                      className="text-primary-600 underline dark:text-primary-500"
                    >
                      금융소득 2,000만 한도 분리과세 상세 가이드
                    </Link>
                    {' '}— 금융소득만 집중 분석
                  </li>
                  <li>
                    →{' '}
                    <Link
                      href="/guide/business-income-vs-other-income-classification-2026/"
                      className="text-primary-600 underline dark:text-primary-500"
                    >
                      사업소득 vs 기타소득 분류 기준
                    </Link>
                    {' '}— 강사료·원고료 분류 판정
                  </li>
                  <li>
                    →{' '}
                    <Link
                      href="/guide/n-jobber-comprehensive-income-tax-2026/"
                      className="text-primary-600 underline dark:text-primary-500"
                    >
                      N잡러 종합소득세 합산 신고 2026
                    </Link>
                    {' '}— 복수 소득 합산 규칙
                  </li>
                </ul>
              </section>

              <ShareButtons
                title="분리과세 vs 종합과세 2026 마스터 가이드"
                url={URL}
                description="금융소득 2,000만·사적연금 1,500만·기타소득 300만 한도 선택 기준. 5월 31일 신고 전 필독."
              />

              {/* 출처 및 면책 */}
              <section
                aria-label="출처 및 면책"
                className="rounded-lg border border-border-base p-4 text-caption text-text-tertiary"
              >
                <p className="mb-2">
                  <strong>법적 근거</strong>: 소득세법 §14 (종합소득과세표준·분리과세) · §55 (세율·누진공제) · §129
                  (분리과세 세율). 참고:{' '}
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
                  <strong>면책 조항</strong>: 본 가이드는 정보 제공 목적이며 세무·법적 조언이 아닙니다. 개별 상황·세율 변경·과세관청 판단에 따라 결과가 달라질 수 있으므로, 실제 신고 전 세무사 또는 국세청 상담을 받으시기 바랍니다.
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
