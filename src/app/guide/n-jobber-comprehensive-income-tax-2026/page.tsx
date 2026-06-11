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

const URL = 'https://calculatorhost.com/guide/n-jobber-comprehensive-income-tax-2026/';
const DATE_PUBLISHED = '2026-05-21';
const DATE_MODIFIED = '2026-05-21';

export const metadata: Metadata = {
  title: 'N잡러 직장+부업 종합소득세 합산 신고 2026 | 5월 31일 선택 기준',
  description:
    '직장 연봉 + 부업 소득 합산 의무? 근로소득 연말정산 완료해도 5월 종소세 신고? 소득 종류별 합산·분리 기준·누진세율 상향 효과·기타소득 300만 분리과세·금융소득 2천만 기준 완벽 정리.',
  keywords: [
    'N잡러 종합소득세',
    '부업 종합소득세',
    '직장인 부수입 신고',
    '종합소득세 합산',
    '기타소득 300만 분리과세',
    '금융소득 2천만 종합과세',
    '5월 종소세 신고',
    '근로소득 사업소득 합산',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: 'N잡러 직장+부업 종합소득세 합산 신고 2026 | 5월 31일 선택 기준' }],
    title: 'N잡러 종합소득세 합산 신고 2026 | 직장+부업 세액 계산',
    description: '연봉 5천만+부업 2천만 → 합산하면 누진세율 24% 상향? 분리과세 선택권? 5월 31일 선택 기준.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'N잡러 종소세 합산 신고 2026 — 연말정산과 다른 5월 신고',
    description: '부업 소득 얼마부터 신고? 연말정산했는데 또 신고?',
  },
};

const FAQ_ITEMS = [
  {
    question: '직장 다녀도 5월에 종소세를 신고해야 하나요?',
    answer:
      '예, 부업이나 기타소득이 있으면 의무입니다(소득세법 §70). 직장은 연말정산(12월)으로 근로소득만 정산하지만, 사업소득·기타소득·이자배당 등은 5월 종소세 신고에 포함되어야 합니다. 근로소득과 다른 소득을 합산한 "종합과세표준"을 다시 계산하므로 누진세율이 올라갈 수 있습니다.',
  },
  {
    question: '부업 강의료 200만 원, 분리과세로 22% 떼면 5월에 또 신고해야 하나요?',
    answer:
      '아닙니다. 기타소득 300만 원 이하는 분리과세(22% 원천징수) 선택 시 신고 의무 면제입니다(소득세법 §14 ⑦). 하지만 선택권이므로 합산하려면 신고로 합산할 수 있습니다. 300만 원 초과면 무조건 종합과세 신고 의무.',
  },
  {
    question: '연봉 5천만 + 부업 2천만, 누진세율이 올라가나요?',
    answer:
      '예, 올라갑니다(소득세법 §55 누진 8단계). 근로소득 5천만(연말정산 후 과세표준 약 4,000만) + 사업소득 2천만 = 과세표준 약 6,000만 → 세율 24% 구간 상향, 누진공제 576만 적용. 합산하지 않으면 각각 낮은 세율(15% 미만)을 받지만, 합산 의무이므로 회피 불가능합니다.',
  },
  {
    question: '기타소득 300만 원 기준은 뭔가요? 강의료 300만, 코칭료 200만 두 개면?',
    answer:
      '소득세법 §14 ⑦에서 "기타소득"의 종류별로 별도 계산합니다. 강의료 300만 원 이하 분리과세, 코칭료 200만 원 이하 분리과세 각각 선택 가능(총합이 아닌 각각). 다만 2개 이상 기타소득이 합쳐지면 판단이 복잡하므로 세무사 상담 권장.',
  },
  {
    question: '금융소득(이자·배당) 2천만 원은 언제부터 합산 의무인가요?',
    answer:
      '금융소득(이자배당소득)이 연 2,000만 원을 초과하면 종합과세 합산 의무입니다(소득세법 §14 ⑥). 2,000만 원 이하면 분리과세(15.4% + 지방세) 선택 가능. 예: 금융소득 2,500만 → 500만 초과분부터 합산 의무, 단 2,000만까지는 분리과세로 처리 후 초과분만 종합과세 적용.',
  },
  {
    question: '직장 연말정산에서 기타소득 공제가 빠졌는데 5월에 신고하면 환급 받을 수 있나요?',
    answer:
      '예. 5월 종소세 신고할 때 직장 소득(1099 또는 국세청 자동 수집) + 기타소득을 합산 후 부양가족·신용카드·의료비 등 공제를 새로 적용합니다. 직장 연말정산은 기타소득 미반영이므로 5월 신고 시 추가 공제로 환급받을 가능성이 높습니다.',
  },
  {
    question: '부업 사업소득 신고 안 하고 프리랜서 3.3% 원천징수만 받으면 괜찮나요?',
    answer:
      '아닙니다. 의무 신고 대상입니다(소득세법 §70 ② 확정신고 면제 요건 미충족). 원천징수는 선금 개념이고 실제 세액이 다를 수 있으므로 신고 의무가 생깁니다. 신고하지 않으면 무신고가산세 20% + 환급 포기 위험(법정기한 5년 경과 시 환급 청구권 소멸).',
  },
  {
    question: '근로소득 1곳 + 부업 사업소득 발생, 5월 신고 않고 6월에 하면 가산세 50% 감면 받나요?',
    answer:
      '네, 자진신고 감면 적용(국세기본법 §48). 6월 1~30일 신고 시 가산세 50% 감면. 다만 신고하지 않으면 무신고가산세 20% 부과 후 50% 감면이므로 원점은 10%의 가산세가 남습니다. 5월 31일까지 신고하는 것이 가장 유리(가산세 0).',
  },
];

export default function NJobberComprehensiveIncomeTax2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: 'N잡러 종합소득세 합산 신고 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: 'N잡러 직장+부업 종합소득세 합산 신고 2026 가이드',
    description:
      '근로소득 연말정산 완료 후 5월 종합소득세 신고는 왜 필수? 부업 소득 종류별 합산·분리 기준 + 누진세율 상향 효과 + 기타소득 300만 분리과세 선택권 + 금융소득 2천만 합산 기준 + 세액 시뮬 3가지 완벽 정리.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['N잡러 종합소득세', '부업 소득 합산', '기타소득 분리과세', '금융소득 2천만', '5월 신고'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: 'N잡러 종합소득세 합산 신고 2026 — 근로+부업 소득 합산 필수',
    description:
      '5월 31일 마감 10일 전! N잡러(직장+부업) 종합소득세 신고 필수 기준·소득 종류별 합산 의무·기타소득 300만 분리과세 선택권·누진세율 상향·세액 시뮬 3가지·신고 체크리스트 완벽 정리.',
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
                    { name: 'N잡러 종합소득세 합산 신고' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">세금 · 11분 읽기 · 2026-05-21</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  N잡러 직장+부업 종합소득세 합산 신고 2026
                  <br />
                  <span className="text-2xl text-text-secondary">— 연말정산과 다른 5월 신고 완벽 가이드</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  직장을 다니면서 부업도 한다면 주의하세요.
                  <strong> 12월 연말정산은 직장 소득만 정산</strong>하고,
                  <strong> 5월 종합소득세는 부업·기타소득·금융소득까지 모두 합산</strong>해야 합니다. 이 과정에서
                  누진세율이 상향되어 생각보다 큰 세금을 내게 될 수 있습니다. 본 가이드에서는 N잡러(N개 직업 병행)가 꼭 알아야 할
                  소득 합산 규칙·분리과세 선택권·누진세율 효과를 완벽히 정리합니다.
                </p>
              </header>

              <AdSlot slot="guide-n-jobber-comprehensive-tax-top" format="horizontal" />

              {/* 핵심 요약 */}
              <section aria-label="핵심 요약" className="card border-l-4 border-l-primary-500">
                <h2 className="mb-4 text-2xl font-bold text-primary-700 dark:text-primary-300">⚡ 핵심 정리</h2>
                <div className="mb-4 overflow-x-auto">
                  <table className="w-full text-sm" data-speakable>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th className="px-3 py-2 text-left">소득 종류</th>
                        <th className="px-3 py-2 text-left">합산 의무</th>
                        <th className="px-3 py-2 text-left">분리과세 선택</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="px-3 py-2 font-semibold">근로소득 (직장)</td>
                        <td className="px-3 py-2">필수 (연말정산 후)</td>
                        <td className="px-3 py-2">불가</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="px-3 py-2 font-semibold">사업소득 (프리랜서·개인사업)</td>
                        <td className="px-3 py-2">필수</td>
                        <td className="px-3 py-2">불가</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="px-3 py-2 font-semibold">기타소득 (강의료·원고료 등)</td>
                        <td className="px-3 py-2">300만 초과 시 필수</td>
                        <td className="px-3 py-2">300만 이하 선택 가능</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="px-3 py-2 font-semibold">금융소득 (이자·배당)</td>
                        <td className="px-3 py-2">2천만 초과 시 필수</td>
                        <td className="px-3 py-2">2천만 이하 선택 가능</td>
                      </tr>
                      <tr>
                        <td className="px-3 py-2 font-semibold">연금소득 (국민·개인연금)</td>
                        <td className="px-3 py-2">400만 초과 시 필수</td>
                        <td className="px-3 py-2">400만 이하 선택 가능</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="rounded-lg bg-primary-500/10 p-4 text-sm text-primary-700 dark:text-primary-300">
                  <p className="font-semibold">TL;DR</p>
                  <ul className="mt-2 list-inside list-disc space-y-1">
                    <li>
                      <strong>근로소득 + 사업소득은 무조건 합산:</strong> 누진세율 상향 불가피
                    </li>
                    <li>
                      <strong>기타소득 ≤ 300만:</strong> 22% 원천징수 분리과세로 신고 면제 선택권 있음
                    </li>
                    <li>
                      <strong>금융소득 ≤ 2천만:</strong> 15.4% 분리과세 선택 가능
                    </li>
                    <li>
                      <strong>합산 시 누진세율 1~2단계 상향:</strong> 세금 50~200만 원 추가
                    </li>
                  </ul>
                </div>
              </section>

              {/* 1. N잡러 종합소득세 신고, 왜 필수인가 */}
              <section className="space-y-4">
                <h2 className="text-2xl font-bold">1. 근로소득 연말정산 후 왜 5월 종소세를 또 신고해야 하나?</h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  직장인들은 연말정산으로 충분하다고 착각합니다. 하지만 연말정산은 "근로소득만"을 대상으로 합니다(소득세법 §127~§137).
                  부업·강의료·원고료·이자·배당 등 다른 소득은 연말정산에 포함되지 않습니다. 따라서 5월 종합소득세 신고에서
                  <strong> 근로소득 + 부업 소득을 합쳐서 "종합과세표준"을 다시 계산</strong>해야 합니다
                  (소득세법 §70, §14).
                </p>

                <div className="rounded-lg bg-bg-card p-4">
                  <p className="mb-3 font-semibold text-text-primary">종합소득세 신고 대상 확인 (소득세법 §70)</p>
                  <div className="space-y-3 text-sm text-text-secondary">
                    <div>
                      <p className="font-semibold text-text-primary mb-1">신고 의무 있음</p>
                      <p className="italic text-text-tertiary">
                        근로소득(1곳) + 사업소득 또는 기타소득(300만 초과) 또는 금융소득(2천만 초과) 또는 연금소득(400만 초과)
                        또는 임대소득
                      </p>
                    </div>
                    <hr className="border-border-base" />
                    <div>
                      <p className="font-semibold text-text-primary mb-1">신고 면제 가능</p>
                      <p className="italic text-text-tertiary">
                        근로소득 1곳만 있고, 기타소득 ≤ 300만(분리과세 선택), 금융소득 ≤ 2천만(분리과세 선택), 연금소득 ≤ 400만(분리과세
                        선택)
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border-l-2 border-l-danger-500 bg-danger-500/5 p-4 text-sm text-text-secondary">
                  <p className="font-semibold text-danger-700 dark:text-danger-300">⚠️ 신고 안 하면 가산세</p>
                  <p className="mt-2">
                    종합소득세 신고 대상인데 신고하지 않으면 무신고가산세 20% 부과(국세기본법 §47의2). 부정행위(영수증 조작 등) 적발
                    시 40% 중과까지 가능합니다.
                  </p>
                </div>
              </section>

              {/* 2. 소득 종류별 합산·분리 기준 */}
              <section className="space-y-4">
                <h2 className="text-2xl font-bold">2. 소득 종류별 합산·분리 기준 (소득세법 §4, §14, §15)</h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  모든 소득이 자동으로 합산되는 것은 아닙니다. 소득 종류에 따라 "필수 합산"과 "선택적 분리과세"가 나뉩니다. 핵심은
                  기타소득과 금융소득의 임계값(기타 300만, 금융 2천만)입니다.
                </p>

                <div className="overflow-x-auto rounded-lg">
                  <table className="w-full text-sm border-collapse">
                    <thead>
                      <tr className="border-b border-border-base bg-primary-500/10">
                        <th className="px-3 py-2 text-left text-text-primary">소득</th>
                        <th className="px-3 py-2 text-left text-text-primary">예시</th>
                        <th className="px-3 py-2 text-left text-text-primary">합산 규칙</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="px-3 py-2 font-semibold">근로소득</td>
                        <td className="px-3 py-2">직장 월급</td>
                        <td className="px-3 py-2">무조건 합산 (연말정산 후 과세표준)</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="px-3 py-2 font-semibold">사업소득</td>
                        <td className="px-3 py-2">프리랜서, 개인사업</td>
                        <td className="px-3 py-2">무조건 합산 (경비율·공제 공제 후)</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="px-3 py-2 font-semibold">기타소득</td>
                        <td className="px-3 py-2">강의료, 원고료, 상금</td>
                        <td className="px-3 py-2">300만 이하 → 분리과세(22%) 선택 / 초과 → 합산</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="px-3 py-2 font-semibold">금융소득</td>
                        <td className="px-3 py-2">이자, 배당, 펀드 수익</td>
                        <td className="px-3 py-2">2천만 이하 → 분리과세(15.4%) 선택 / 초과 → 합산</td>
                      </tr>
                      <tr>
                        <td className="px-3 py-2 font-semibold">임대소득</td>
                        <td className="px-3 py-2">월세, 보증금 이자</td>
                        <td className="px-3 py-2">무조건 합산 (종부세 별도)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="rounded-lg bg-bg-card p-4 text-sm text-text-secondary">
                  <p className="font-semibold text-text-primary mb-2">기타소득 300만 원 분리과세의 의미</p>
                  <p>
                    기타소득이 300만 원 이하면 국세청이 22% 세금(지방세 포함)을 먼저 원천징수하고, 신고 의무를 면제합니다. 즉,
                    강의료 200만 원을 받으면 22% 44만 원을 자동 공제하고, 5월에 별도 신고를 할 필요 없습니다. 하지만 선택권이므로
                    합산하려면 신고로 합산 가능합니다.
                  </p>
                </div>
              </section>

              {/* 3. 누진세율 상향 효과 */}
              <section className="space-y-4">
                <h2 className="text-2xl font-bold">3. 소득 합산 시 누진세율 상향 — 세금은 50~200만 원 증가</h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  근로소득과 부업 소득을 합산하면 과세표준이 높아져 누진세율 구간이 상향됩니다(소득세법 §55). 예를 들어 연봉 5,000만
                  원은 15% 구간이지만, 부업 2,000만을 합산하면 과세표준이 약 6,000~7,000만이 되어 24% 구간으로 올라갑니다. 이
                  차이가 실제로는 50~200만 원의 추가 세금으로 이어집니다.
                </p>

                <div className="space-y-3 rounded-lg bg-bg-raised p-4">
                  <p className="font-semibold text-text-primary">누진세율 8단계 (소득세법 §55)</p>
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs text-text-secondary border-collapse">
                      <thead>
                        <tr className="border-b border-border-base">
                          <th className="px-2 py-1 text-left">과세표준</th>
                          <th className="px-2 py-1 text-right">세율</th>
                          <th className="px-2 py-1 text-right">누진공제</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-border-base">
                          <td className="px-2 py-1">~1,400만</td>
                          <td className="px-2 py-1 text-right">6%</td>
                          <td className="px-2 py-1 text-right">0</td>
                        </tr>
                        <tr className="border-b border-border-base">
                          <td className="px-2 py-1">~5,000만</td>
                          <td className="px-2 py-1 text-right">15%</td>
                          <td className="px-2 py-1 text-right">126만</td>
                        </tr>
                        <tr className="border-b border-border-base bg-primary-500/5">
                          <td className="px-2 py-1 font-semibold">~8,800만</td>
                          <td className="px-2 py-1 text-right font-semibold">24%</td>
                          <td className="px-2 py-1 text-right font-semibold">576만</td>
                        </tr>
                        <tr className="border-b border-border-base">
                          <td className="px-2 py-1">~1.5억</td>
                          <td className="px-2 py-1 text-right">35%</td>
                          <td className="px-2 py-1 text-right">1,544만</td>
                        </tr>
                        <tr className="border-b border-border-base">
                          <td className="px-2 py-1">~3억</td>
                          <td className="px-2 py-1 text-right">38%</td>
                          <td className="px-2 py-1 text-right">1,994만</td>
                        </tr>
                        <tr className="border-b border-border-base">
                          <td className="px-2 py-1">~5억</td>
                          <td className="px-2 py-1 text-right">40%</td>
                          <td className="px-2 py-1 text-right">2,594만</td>
                        </tr>
                        <tr className="border-b border-border-base">
                          <td className="px-2 py-1">~10억</td>
                          <td className="px-2 py-1 text-right">42%</td>
                          <td className="px-2 py-1 text-right">3,594만</td>
                        </tr>
                        <tr>
                          <td className="px-2 py-1">10억 초과</td>
                          <td className="px-2 py-1 text-right">45%</td>
                          <td className="px-2 py-1 text-right">6,594만</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="space-y-3 rounded-lg bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">세액 증가 실제 사례</p>
                  <div className="space-y-2 text-sm text-text-secondary">
                    <div className="mb-3 rounded-lg bg-bg-raised p-3">
                      <p className="font-semibold text-text-primary">사례 A: 직장 연봉 5,000만 + 부업 없음</p>
                      <ul className="mt-2 list-inside list-disc space-y-1">
                        <li>근로소득 (연말정산 후 과세표준) ≈ 4,000만</li>
                        <li>세액 = 4,000만 × 15% − 126만 = 474만</li>
                        <li className="text-xs italic text-text-tertiary">→ 분담금: 약 월 39.5만 (12월 이미 정산)</li>
                      </ul>
                    </div>

                    <div className="mb-3 rounded-lg bg-bg-raised p-3">
                      <p className="font-semibold text-text-primary">사례 B: 직장 연봉 5,000만 + 부업 사업소득 2,000만</p>
                      <ul className="mt-2 list-inside list-disc space-y-1">
                        <li>근로소득 과세표준 약 4,000만 + 사업소득 과세표준 약 2,500만 (경비율 70%) = 6,500만</li>
                        <li>세액 = 6,500만 × 24% − 576만 = 984만</li>
                        <li className="font-semibold text-danger-500">추가 납부: 984만 − 474만 = 약 510만 원</li>
                        <li className="text-xs italic text-text-tertiary">⚠️ 누진세율이 15% → 24%로 상향되어 추가 세금 510만</li>
                      </ul>
                    </div>

                    <div className="rounded-lg bg-bg-raised p-3">
                      <p className="font-semibold text-text-primary">사례 C: 직장 5,000만 + 금융소득(배당) 3,000만</p>
                      <ul className="mt-2 list-inside list-disc space-y-1">
                        <li>금융소득 2,000만 초과 → 합산 의무 (2,000만 이하 분리과세 선택 불가)</li>
                        <li>근로소득 4,000만 + 금융소득(소득금액계산 후) 2,000만 = 과세표준 약 6,000만</li>
                        <li>세액 = 6,000만 × 24% − 576만 = 864만</li>
                        <li className="font-semibold text-primary-600">추가 납부: 864만 − 474만 = 약 390만 원</li>
                        <li className="text-xs italic text-text-tertiary">💡 2,000만 초과분만 합산이므로 1,000만분의 추가 세금 약 150만 + 기존 15.4% 308만 = 총 약 390만</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border-l-4 border-l-highlight-500 bg-highlight-500/5 p-4 text-sm text-text-secondary">
                  <p className="font-semibold text-text-primary">💡 결론: 부업 소득은 합산 회피 불가능</p>
                  <p className="mt-2">
                    사업소득과 임대소득은 무조건 합산이므로 누진세율 상향을 피할 수 없습니다. 다만 기타소득과 금융소득은 작으면 분리과세로
                    선택할 여지가 있습니다.
                  </p>
                </div>
              </section>

              <AdSlot slot="guide-n-jobber-comprehensive-tax-mid" format="rectangle" />

              {/* 4. 기타소득 300만 원 분리과세 선택 */}
              <section className="space-y-4">
                <h2 className="text-2xl font-bold">4. 기타소득 300만 원 이하 분리과세 선택 (소득세법 §14 ⑦)</h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  강의료, 원고료, 상금 등 기타소득은 연 300만 원 이하면 분리과세(22% 원천징수) 선택권이 있습니다. 이를 선택하면
                  5월 종소세 신고 의무가 면제되고, 국세청이 이미 22%를 공제하므로 추가 납부 없이 종결됩니다.
                </p>

                <div className="rounded-lg bg-bg-card p-4">
                  <p className="mb-3 font-semibold text-text-primary">기타소득 분리과세의 조건</p>
                  <div className="space-y-3 text-sm text-text-secondary">
                    <div>
                      <p className="font-semibold text-text-primary mb-1">분리과세 가능 (소득세법 §14 ⑦)</p>
                      <p className="italic text-text-tertiary">
                        기타소득 ≤ 300만 원 / 필요경비 공제(60% 또는 실경비) / 세율 22% 원천징수 / 신고 면제 선택 가능
                      </p>
                    </div>
                    <hr className="border-border-base" />
                    <div>
                      <p className="font-semibold text-text-primary mb-1">합산 과세 (신고 선택)</p>
                      <p className="italic text-text-tertiary">
                        기타소득을 종합소득에 포함 신고 / 누진세율 적용 / 다른 공제(부양가족·신용카드)도 반영 가능
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 rounded-lg bg-bg-raised p-4">
                  <p className="font-semibold text-text-primary">기타소득 분리과세 vs 합산 비교</p>
                  <div className="space-y-2 text-sm text-text-secondary">
                    <div className="mb-3 rounded-lg bg-bg-card p-3">
                      <p className="font-semibold text-text-primary">강의료 200만 원, 분리과세 선택</p>
                      <ul className="mt-2 list-inside list-disc space-y-1">
                        <li>소득금액 = 200만 × 40% (필요경비 60%) = 80만</li>
                        <li>세액 = 80만 × 22% = 약 17.6만 원</li>
                        <li className="font-semibold text-primary-600">실제 수령: 200만 − 17.6만 = 약 182.4만 원</li>
                      </ul>
                    </div>

                    <div className="rounded-lg bg-bg-card p-3">
                      <p className="font-semibold text-text-primary">같은 강의료 200만 + 직장 5,000만, 합산 신고</p>
                      <ul className="mt-2 list-inside list-disc space-y-1">
                        <li>근로소득 4,000만 + 기타소득(합산) 80만 = 4,080만</li>
                        <li>세액 = 4,080만 × 15% − 126만 = 486만</li>
                        <li>기타소득 부분 세액 ≈ 80만 × 15% = 12만 (누진공제 분배 후)</li>
                        <li className="text-xs italic text-text-tertiary">→ 분리과세 17.6만 vs 합산 약 12만 (합산이 더 유리!)</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border-l-2 border-l-primary-500 bg-primary-500/5 p-4 text-sm text-text-secondary">
                  <p className="font-semibold text-text-primary">선택 기준</p>
                  <p className="mt-2">
                    <strong>기타소득 100만 이하:</strong> 누진세율이 충분히 낮으면 합산이 유리. 분리과세(22%) vs 합산(6~15%)을 계산 비교.
                    <br />
                    <strong>기타소득 200~300만:</strong> 분리과세(22%)가 더 나을 가능성. 직장 소득이 높으면 합산 시 누진세율이 높아질
                    수 있음.
                  </p>
                </div>
              </section>

              {/* 5. 금융소득 2천만 원 합산 기준 */}
              <section className="space-y-4">
                <h2 className="text-2xl font-bold">5. 금융소득 2천만 원 초과 시 종합과세 합산 (소득세법 §14 ⑥)</h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  이자·배당·펀드 수익 등 금융소득이 연 2,000만 원을 초과하면 다른 소득과 합산하여 종합과세해야 합니다(소득세법 §14
                  ⑥). 2,000만 원 이하면 분리과세(15.4% 원천징수) 선택이 가능합니다. 주식이나 정기예금으로 큰 수익을 기대하는 고액자는
                  주의가 필요합니다.
                </p>

                <div className="rounded-lg bg-bg-card p-4 text-sm text-text-secondary">
                  <p className="font-semibold text-text-primary mb-2">금융소득 2천만 원 기준의 의미</p>
                  <p>
                    2,000만 원 이하이면 국세청이 15.4%(지방세 포함)를 자동 공제하고 "금융소득종합과세 제외" 선택권이 있습니다. 예를
                    들어 배당금 1,500만 원을 받으면 소득금액 약 600만(필요경비·공제 후)의 15.4% 약 92만을 공제하고, 추가 신고 없이
                    종결됩니다. 하지만 2,500만 원 이상 받으면 초과분부터 강제로 다른 소득과 합산되어 누진세율이 올라갑니다.
                  </p>
                </div>

                <div className="rounded-lg bg-bg-raised p-4 text-sm text-text-secondary">
                  <p className="font-semibold text-text-primary mb-3">금융소득과 근로소득 합산 사례</p>
                  <div className="space-y-2">
                    <div className="rounded-lg bg-bg-card p-3">
                      <p className="font-semibold text-text-primary">직장 5,000만 + 배당금 1,500만</p>
                      <ul className="mt-2 list-inside list-disc space-y-1">
                        <li>금융소득 1,500만 ≤ 2,000만 → 분리과세(15.4%) 선택 가능</li>
                        <li>분리과세 선택: 배당금 세액만 15.4%, 직장은 별도 정산</li>
                        <li className="text-xs italic text-text-tertiary">→ 추가 종소세 신고 불필요</li>
                      </ul>
                    </div>

                    <div className="rounded-lg bg-bg-card p-3">
                      <p className="font-semibold text-text-primary">직장 5,000만 + 배당금 3,000만</p>
                      <ul className="mt-2 list-inside list-disc space-y-1">
                        <li>금융소득 3,000만 {'>'} 2,000만 → 초과분 1,000만 합산 의무</li>
                        <li>근로소득 과세표준 4,000만 + 금융소득 합산분(1,000만 기준) ≈ 4,500만</li>
                        <li>세율: 15% 구간 유지 (합산 시 누진세율 상향 크지 않음)</li>
                        <li className="text-xs italic text-text-tertiary">→ 종소세 신고 의무, 추가 세금 약 100~150만 (초과분 1,000만에 대한 누진)</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border-l-4 border-l-highlight-500 bg-highlight-500/5 p-4 text-sm text-text-secondary">
                  <p className="font-semibold text-text-primary">주의: 2,000만 원은 "소득금액" 아닌 "수익금액"</p>
                  <p className="mt-2">
                    법상 2,000만 원 기준은 "이자배당소득"의 수익금액입니다. 배당금 2,500만을 받았어도 필요경비(신용카드 수수료 등) 차감
                    후 2,000만 미만이면 분리과세 가능. 다만 국세청 공지를 따르므로 세무사 상담 권장.
                  </p>
                </div>
              </section>

              {/* 6. N잡러 체크리스트 */}
              <section className="space-y-4">
                <h2 className="text-2xl font-bold">6. 5월 31일 신고 전 N잡러 체크리스트</h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  신고 2~3일 전에 다음을 확인하고 신고 여부를 최종 결정하세요.
                </p>

                <div className="space-y-2 rounded-lg bg-bg-card p-4 text-sm">
                  <div className="flex items-start gap-2">
                    <input type="checkbox" id="check1" className="mt-1" />
                    <label htmlFor="check1" className="text-text-secondary">
                      <strong>소득 종류 분류</strong> — 근로(직장) / 사업(프리랜서) / 기타(강의료 등) / 금융(배당 등) 구분
                    </label>
                  </div>
                  <div className="flex items-start gap-2">
                    <input type="checkbox" id="check2" className="mt-1" />
                    <label htmlFor="check2" className="text-text-secondary">
                      <strong>수입 집계</strong> — 올해 예상 전체 소득액 (직장, 부업 각각)
                    </label>
                  </div>
                  <div className="flex items-start gap-2">
                    <input type="checkbox" id="check3" className="mt-1" />
                    <label htmlFor="check3" className="text-text-secondary">
                      <strong>기타소득 300만 판단</strong> — 강의료·원고료·상금 합계 300만 이상 여부
                    </label>
                  </div>
                  <div className="flex items-start gap-2">
                    <input type="checkbox" id="check4" className="mt-1" />
                    <label htmlFor="check4" className="text-text-secondary">
                      <strong>금융소득 2천만 판단</strong> — 이자·배당 합계 2,000만 이상 여부
                    </label>
                  </div>
                  <div className="flex items-start gap-2">
                    <input type="checkbox" id="check5" className="mt-1" />
                    <label htmlFor="check5" className="text-text-secondary">
                      <strong>신고 의무 판단</strong> — 위 항목 중 하나라도 해당하면 신고 의무 있음
                    </label>
                  </div>
                  <div className="flex items-start gap-2">
                    <input type="checkbox" id="check6" className="mt-1" />
                    <label htmlFor="check6" className="text-text-secondary">
                      <strong>세액 미리 계산</strong> —{' '}
                      <Link href="/calculator/salary/" className="text-primary-600 underline">
                        연봉 실수령액 계산기
                      </Link>
                      또는{' '}
                      <Link href="/calculator/freelancer-tax/" className="text-primary-600 underline">
                        프리랜서 종합소득세 계산기
                      </Link>
                      로 예상 세액 확인
                    </label>
                  </div>
                  <div className="flex items-start gap-2">
                    <input type="checkbox" id="check7" className="mt-1" />
                    <label htmlFor="check7" className="text-text-secondary">
                      <strong>공제 확인</strong> — 부양가족, 신용카드, 의료비, 교육비, 기부금, 연금저축
                    </label>
                  </div>
                  <div className="flex items-start gap-2">
                    <input type="checkbox" id="check8" className="mt-1" />
                    <label htmlFor="check8" className="text-text-secondary">
                      <strong>분리과세 선택</strong> — 기타소득 ≤ 300만 또는 금융소득 ≤ 2천만이면 분리과세 여부 결정
                    </label>
                  </div>
                </div>
              </section>

              <FaqSection items={[...FAQ_ITEMS]} />

              {/* 주의사항 */}
              <section className="card border-l-2 border-l-danger-500 bg-danger-500/5">
                <h2 className="mb-3 text-lg font-semibold text-danger-700 dark:text-danger-300">⚠️ 최종 주의사항</h2>
                <ul className="space-y-2 text-sm text-danger-700 dark:text-danger-300">
                  <li>
                    • <strong>5월 31일(금)</strong> 신고 기한. 주말이므로 다음 영업일 <strong>6월 2일(월)</strong> 자동 연장
                  </li>
                  <li>
                    • 근로소득 + 사업소득(사업소득)은 무조건 합산 의무. 누진세율 상향 회피 불가능
                  </li>
                  <li>
                    • 기타소득 ≤ 300만, 금융소득 ≤ 2천만은 분리과세 "선택권"이 있음. 자신의 세율에 따라 합산 또는 분리 결정
                  </li>
                  <li>
                    • 신고하지 않으면 무신고가산세 20% (부정행위 시 40%) + 환급 포기 (5년 후 완전 소멸)
                  </li>
                  <li>
                    • 6월에 신고해도 자진신고 감면(50%)으로 가산세 반감 가능
                  </li>
                  <li>
                    • 복잡하면 세무사 상담 (수수료 10~50만 vs 누진세율 판단 비용 가치)
                  </li>
                </ul>
              </section>

              {/* 관련 계산기·가이드 */}
              <section className="card">
                <h2 className="mb-4 text-lg font-semibold">📊 관련 계산기·가이드</h2>
                <ul className="space-y-2 text-sm">
                  <li>
                    →{' '}
                    <Link href="/calculator/salary/" className="text-primary-600 underline dark:text-primary-500">
                      연봉 실수령액 계산기
                    </Link>
                    {' '}— 근로소득 기준 세액 계산
                  </li>
                  <li>
                    →{' '}
                    <Link href="/calculator/freelancer-tax/" className="text-primary-600 underline dark:text-primary-500">
                      프리랜서 종합소득세 계산기
                    </Link>
                    {' '}— 사업소득 경비율별 세액
                  </li>
                  <li>
                    →{' '}
                    <Link href="/guide/income-tax-late-filing-penalty-2026/" className="text-primary-600 underline dark:text-primary-500">
                      종합소득세 무신고·지연 가산세 2026
                    </Link>
                    {' '}— 신고 안 하면 가산세 얼마? 자진신고 감면
                  </li>
                  <li>
                    →{' '}
                    <Link href="/guide/freelancer-simplified-vs-standard-expense-rate-2026/" className="text-primary-600 underline dark:text-primary-500">
                      프리랜서 단순경비율 vs 기준경비율 2026 선택 기준
                    </Link>
                    {' '}— 부업 사업소득 경비율 선택
                  </li>
                  <li>
                    →{' '}
                    <Link href="/guide/may-comprehensive-income-tax/" className="text-primary-600 underline dark:text-primary-500">
                      5월 종합소득세 신고 완벽 가이드
                    </Link>
                    {' '}— 신고 대상·기한·절세 5가지
                  </li>
                </ul>
              </section>

              <ShareButtons
                title="N잡러 직장+부업 종합소득세 합산 신고 2026 완벽 가이드"
                url={URL}
                description="5월 31일 마감 10일 전! 근로소득+부업 소득 합산 의무·누진세율 상향·기타소득 300만 분리과세·금융소득 2천만 기준 완벽 정리."
              />

              {/* 출처 및 면책 */}
              <section
                aria-label="출처 및 면책"
                className="rounded-lg border border-border-base p-4 text-caption text-text-tertiary"
              >
                <p className="mb-2">
                  <strong>법적 근거</strong>: 소득세법 §4 (소득의 분류) · §14 (종합소득과세표준 / 소득의 합산, 분리과세) · §15 (소득금액)
                  · §55 (세율) · §70 (확정신고) · §73 (확정신고 면제) · §129 (기타소득세) · §137 (원천징수). 참고:{' '}
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
                  <strong>면책 조항</strong>: 본 가이드는 정보 제공 목적이며 세무·법적 조언이 아닙니다. 개별 상황에 따라
                  세무상 결과가 달라질 수 있으며, 실제 신고 전 세무사 또는 국세청 상담을 받으시기 바랍니다.
                </p>
                <p>
                  <strong>AI 보조 작성</strong>: 본 가이드는 AI 보조 작성 후 운영자 검수를 거쳤습니다(Google AI Content
                  Policy 준수). 업데이트: {DATE_MODIFIED}
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
