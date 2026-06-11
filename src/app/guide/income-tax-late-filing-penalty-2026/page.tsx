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

const URL = 'https://calculatorhost.com/guide/income-tax-late-filing-penalty-2026/';
const DATE_PUBLISHED = '2026-05-20';
const DATE_MODIFIED = '2026-05-20';

export const metadata: Metadata = {
  title: '종합소득세 가산세 2026 무신고·지연 계산 | calculatorhost',
  description:
    '5월 31일 마감 11일 전! 종합소득세 무신고가산세 20% + 납부지연가산세 일 0.022% 계산 방법·자진신고 감면 50~10% 타이밍·부정행위 40% 중과·공식 계산기 제공.',
  keywords: [
    '종합소득세 가산세',
    '무신고가산세 20%',
    '납부지연가산세 0.022%',
    '자진신고 감면',
    '부정행위 40%',
    '5월 31일 종소세 마감',
    '종소세 환급 상실',
    '국세기본법 47조의2',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '종합소득세 가산세 2026 무신고·지연 계산 | calculatorhost' }],
    title: '종합소득세 가산세 2026 무신고·지연 정확 계산',
    description: '산출세액 500만 → 무신고가산세 100만? 마감 후 환급도 못 받는다! 자진신고 감면 기한 정리.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '종합소득세 무신고·지연 가산세 실시간 계산',
    description: '5월 31일 마감 11일 전. 가산세 얼마? 자진신고 감면은?',
  },
};

const FAQ_ITEMS = [
  {
    question: '종합소득세 신고 안 하면 가산세가 얼마나 되나요?',
    answer:
      '산출세액의 20%입니다(국세기본법 §47의2). 예: 산출세액 500만 원이면 가산세 100만 원. 소득을 의도적으로 숨겼다면 40%. 추가로 납부가 늦은 날에 따라 일 0.022% 납부지연가산세도 붙습니다.',
  },
  {
    question: '지금 신고하면 가산세를 얼마나 깎을 수 있나요?',
    answer:
      '자진신고 감면(국세기본법 §48): 신고기한(5월 31일) 후 1개월 내 신고 시 50% 감면, 3개월 내 30%, 6개월 내 20%, 1년 6개월 내 10%. 5월 31일 마감이므로 6월 1~30일 신고 시 50% 감면(50만 원 → 25만 원).',
  },
  {
    question: '5월 31일 자정까지 신고하면 가산세 없나요?',
    answer:
      '맞습니다. 신고기한 내 신고하면 무신고가산세는 없습니다. 다만 세금 납부가 늦으면 납부지연가산세는 붙을 수 있습니다(일 0.022% × 납부지연일수).',
  },
  {
    question: '5월 31일은 토요일인데 언제까지 신고해야 하나요?',
    answer:
      '5월 31일(토)이 신고기한이지만 주말이므로 다음 영업일인 6월 2일(월)까지 자동 연장됩니다. 성실신고확인대상자는 6월 30일까지 가능.',
  },
  {
    question: '소득이 작으면(100만 원) 가산세를 안 내도 되나요?',
    answer:
      '가산세는 산출세액에 비례합니다. 소득 100만 원이면 종소세 약 6만 원, 무신고가산세 약 1만 2천 원. 소액이라도 가산세는 부과되며, 신고하지 않으면 나중에 무신고 적발 시 이중 처벌(가산세 + 연체료)을 받을 수 있습니다.',
  },
  {
    question: '환급 대상인데 신고 안 하면 어떻게 되나요?',
    answer:
      '환급을 받으려면 반드시 신고해야 합니다. 예를 들어 프리랜서 3.3% 원천징수가 월 165만 원(연 1,980만 원)이라도 신고하지 않으면 환급을 못 받습니다. 신고하지 않으면 환급 가능 금액이 완전히 소실됩니다.',
  },
  {
    question: '부정행위 40% 가산세가 뭔가요?',
    answer:
      '국세기본법 §47의2에서 정하는 "부정행위"는 의도적 탈세(영수증 조작, 소득 위장, 이중 거래처 기록 등)입니다. 단순 무신고(모르고 안 한 경우)는 20%, 소득을 알면서도 의도적으로 숨기면 40%. 판단은 세무조사 과정에서 이루어집니다.',
  },
  {
    question: '6월 1일에 신고하고 세금을 7월에 내도 괜찮나요?',
    answer:
      '신고는 6월 1일에 해도 자진신고 감면(50%)이 적용되지만, 세금 납부가 6월 말까지 안 되면 납부지연가산세가 붙습니다(일 0.022% × 지연일수). 신고와 납부는 별개이므로 신고 후 가능한 빨리 납부하세요.',
  },
];

export default function IncomeTaxLateFilingPenalty2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '종합소득세 무신고·지연 가산세 가이드' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '종합소득세 무신고·지연 가산세 2026 정확 계산',
    description:
      '산출세액 500만 → 무신고가산세 100만 계산 + 자진신고 감면 50~10% 타이밍 + 부정행위 40% 중과 + 환급 상실 위험 완벽 정리.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['종합소득세 가산세', '무신고 가산세', '납부지연가산세', '자진신고 감면', '5월 신고'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '종합소득세 무신고·지연 가산세 정확 계산 2026',
    description:
      '5월 31일 마감 임박! 종합소득세 무신고가산세 20%/부정행위 40% + 납부지연가산세 일 0.022% 정확 계산 + 자진신고 감면 50~10% 타이밍 + 신고하지 않으면 환급 상실까지 한 페이지 완벽 정리.',
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
                    { name: '종합소득세 무신고·지연 가산세' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">세금 · 9분 읽기 · 2026-05-20</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  종합소득세 무신고·지연 가산세 2026
                  <br />
                  <span className="text-2xl text-text-secondary">— 마감 11일 전 최후의 선택</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  5월 31일 종합소득세 신고 마감까지 딱 11일 남았습니다. 아직 신고 안 했다면 가산세가 얼마나 되는지,
                  지금이라도 신고하면 얼마나 깎일 수 있는지 알아야 합니다.
                  <strong>
                    무신고가산세 20% + 납부지연가산세 일 0.022% + 부정행위 시 40% 중과
                  </strong>
                  . 다만
                  <strong> 지금 신고해도 자진신고 감면(50~10%)이 적용</strong>되어 큰 손실을 막을 수 있습니다.
                  정확한 계산과 타이밍을 이 페이지 한 장으로 정리합니다.
                </p>
              </header>

              <AdSlot slot="guide-income-tax-late-filing-penalty-top" format="horizontal" />

              {/* 핵심 요약 */}
              <section aria-label="핵심 요약" className="card border-l-4 border-l-danger-500">
                <h2 className="mb-4 text-2xl font-bold text-danger-700 dark:text-danger-300">⚠️ 핵심 정리</h2>
                <div className="mb-4 overflow-x-auto">
                  <table className="w-full text-sm" data-speakable>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th className="px-3 py-2 text-left">가산세 유형</th>
                        <th className="px-3 py-2 text-left">발생 기준</th>
                        <th className="px-3 py-2 text-left">세율</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="px-3 py-2 font-semibold">무신고가산세</td>
                        <td className="px-3 py-2">6월 1일 이후 신고 (국세기본법 §47의2)</td>
                        <td className="px-3 py-2 text-right">20%</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="px-3 py-2 font-semibold">부정행위 중과</td>
                        <td className="px-3 py-2">의도적 소득 은폐 (영수증 조작 등)</td>
                        <td className="px-3 py-2 text-right">40%</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="px-3 py-2 font-semibold">납부지연가산세</td>
                        <td className="px-3 py-2">납부 기한 경과 (일단위)</td>
                        <td className="px-3 py-2 text-right">일 0.022%</td>
                      </tr>
                      <tr>
                        <td className="px-3 py-2 font-semibold">자진신고 감면</td>
                        <td className="px-3 py-2">6월 1~30일 신고</td>
                        <td className="px-3 py-2 text-right">−50%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="rounded-lg bg-danger-500/10 p-4 text-sm text-danger-700 dark:text-danger-300">
                  <p className="font-semibold">TL;DR</p>
                  <ul className="mt-2 list-inside list-disc space-y-1">
                    <li>
                      <strong>5월 31일까지 신고하면</strong> 무신고가산세 0 (다만 세금 납부 지연 시
                      지연가산세는 붙음)
                    </li>
                    <li>
                      <strong>6월 1~30일 신고하면</strong> 무신고가산세 50% 감면 (예: 산출세액 500만 →
                      가산세 50만 → 25만으로 반감)
                    </li>
                    <li>
                      <strong>신고 안 하면 환급도 못 받음</strong> (환급 대상이어도 신고 없으면 영구
                      소실)
                    </li>
                  </ul>
                </div>
              </section>

              {/* 1. 무신고가산세 정의 및 계산 */}
              <section className="space-y-4">
                <h2 className="text-2xl font-bold">1. 무신고가산세 20% — 정의 및 계산</h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  무신고가산세는 종합소득세 신고 기한(5월 31일)까지 신고하지 않은 경우, 산출세액에 20%를 붙이는 제재금입니다
                  (국세기본법 §47의2). 단순히 몇 개월 늦은 것이 아니라 신고 자체를 하지 않았을 때 적용됩니다.
                </p>

                <div className="rounded-lg bg-bg-card p-4">
                  <p className="mb-3 font-semibold text-text-primary">무신고가산세 계산 공식</p>
                  <div className="text-sm text-text-secondary">
                    <p className="mb-2">
                      <strong>무신고가산세 = 산출세액 × 20%</strong>
                    </p>
                    <p className="text-xs italic text-text-tertiary">
                      (부정행위 시 40%, 자진신고 시 감면)
                    </p>
                  </div>
                </div>

                <div className="space-y-3 rounded-lg bg-bg-raised p-4">
                  <p className="font-semibold text-text-primary">실제 계산 사례</p>
                  <div className="space-y-2 text-sm text-text-secondary">
                    <div className="mb-3 rounded-lg bg-bg-card p-3">
                      <p className="font-semibold text-text-primary">사례 1: 프리랜서 연매출 1억, 6월 신고</p>
                      <ul className="mt-2 list-inside list-disc space-y-1">
                        <li>소득금액 = 1억 × (100% − 70%) = 3,000만 원 (기준경비율 기준)</li>
                        <li>과세표준 = 3,000만 (공제 제외 가정)</li>
                        <li>산출세액 = 3,000만 × 15% − 126만 = 324만 원</li>
                        <li className="font-semibold text-danger-500">무신고가산세 = 324만 × 20% = 64.8만 원</li>
                        <li className="text-xs italic text-text-tertiary">
                          ⚠️ 6월 1~30일 자진신고 시 50% 감면 → 32.4만 원
                        </li>
                      </ul>
                    </div>

                    <div className="mb-3 rounded-lg bg-bg-card p-3">
                      <p className="font-semibold text-text-primary">사례 2: N잡러 직장 월급 5,000만 + 부업 2,000만, 7월 신고</p>
                      <ul className="mt-2 list-inside list-disc space-y-1">
                        <li>합산 소득금액 = 근로소득(연말정산 누진세 포함) + 사업소득</li>
                        <li>과세표준 (가정) = 약 5,000만 원</li>
                        <li>산출세액 = 5,000만 × 15% − 126만 = 624만 원</li>
                        <li className="font-semibold text-danger-500">무신고가산세 = 624만 × 20% = 124.8만 원</li>
                        <li className="text-xs italic text-text-tertiary">
                          ⚠️ 7월 신고 시 자진신고 감면 대상 아님 (6개월 넘음)
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border-l-2 border-l-primary-500 bg-primary-500/5 p-4 text-sm text-text-secondary">
                  <p className="font-semibold text-text-primary">중요: "산출세액"이란?</p>
                  <p className="mt-2">
                    과세표준에 세율을 곱한 후 누진공제를 뺀 금액입니다. 예: 과세표준 5,000만 × 15% − 126만 = 624만.
                    <strong>세금이 작을수록 가산세도 작지만, 반드시 신고해야 합니다</strong>.
                  </p>
                </div>
              </section>

              {/* 2. 납부지연가산세 */}
              <section className="space-y-4">
                <h2 className="text-2xl font-bold">2. 납부지연가산세 일 0.022% — 매일 쌓인다</h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  신고는 했지만 세금을 내지 않으면 납부지연가산세가 붙습니다. 원래 2022년 2월 15일 이전까지는 일 0.025%였지만,
                  개정되어 현재는 <strong>일 0.022%</strong>입니다(국세기본법 §47의4). 이자 같은 개념으로 매일 쌓입니다.
                </p>

                <div className="rounded-lg bg-bg-card p-4">
                  <p className="mb-3 font-semibold text-text-primary">납부지연가산세 계산 공식</p>
                  <div className="text-sm text-text-secondary">
                    <p className="mb-2">
                      <strong>납부지연가산세 = 미납세액 × 일 0.022% × 납부지연일수</strong>
                    </p>
                    <p className="text-xs italic text-text-tertiary">
                      연 환산율: 약 8% (0.022% × 365일 ≈ 8%)
                    </p>
                  </div>
                </div>

                <div className="rounded-lg bg-bg-raised p-4 text-sm text-text-secondary">
                  <p className="font-semibold text-text-primary mb-3">실제 계산 사례: 산출세액 500만 원, 납부 100일 지연</p>
                  <ul className="list-inside list-disc space-y-1">
                    <li>미납세액 = 500만 원</li>
                    <li>납부지연기간 = 신고일 다음날부터 납부일까지 (예: 6월 1일 신고 → 9월 10일 납부 = 101일)</li>
                    <li>납부지연가산세 = 500만 × 0.022% × 101일 = 약 11.1만 원</li>
                    <li className="font-semibold">총 부담: 500만(세액) + 11.1만(지연가산세)</li>
                  </ul>
                </div>

                <div className="rounded-lg border-l-4 border-l-highlight-500 bg-highlight-500/5 p-4 text-sm text-text-secondary">
                  <p className="font-semibold text-text-primary">💡 조금이라도 빨리 내자</p>
                  <p className="mt-2">
                    매일 0.022%씩 증가합니다. 6개월 지연 시 약 4%, 1년 지연 시 약 8% 추가. 신고 후 가능한 빨리
                    납부하는 것이 이득입니다.
                  </p>
                </div>
              </section>

              <AdSlot slot="guide-income-tax-late-filing-penalty-mid" format="rectangle" />

              {/* 3. 부정행위 시 40% 중과 */}
              <section className="space-y-4">
                <h2 className="text-2xl font-bold">3. 부정행위 40% 중과 — 위험 신호</h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  단순히 "몰랐어요"라는 무신고와 다른 것이 있습니다. 바로
                  <strong> 의도적 탈세 = 부정행위</strong>입니다. 부정행위로 적발되면 가산세가 20%가 아니라
                  <strong> 40%</strong>가 붙으며, 범죄로도 처벌받을 수 있습니다(조세범처벌법 §73 징역 3년 이하).
                </p>

                <div className="rounded-lg border-l-2 border-l-danger-500 bg-danger-500/5 p-4">
                  <p className="font-semibold text-danger-700 dark:text-danger-300 mb-3">국세청이 "부정행위"로 보는 경우 (국세기본법 §47의2)</p>
                  <ul className="text-sm text-danger-600 dark:text-danger-400 list-inside list-disc space-y-1">
                    <li>계약서 위조 또는 영수증 조작</li>
                    <li>이중 거래처 기록 (실제와 다른 금액 신고)</li>
                    <li>해외 계좌 소득 숨김</li>
                    <li>부동산 거래 숨김 (전세사기 방조 등)</li>
                    <li>불법 노동 소득 (상습적 현금 거래)</li>
                    <li>세무대리인 지시로 인한 계획적 탈세</li>
                  </ul>
                </div>

                <div className="rounded-lg bg-bg-card p-4">
                  <p className="mb-3 font-semibold text-text-primary">부정행위 vs 단순 무신고</p>
                  <div className="text-sm text-text-secondary space-y-2">
                    <div>
                      <p className="font-semibold text-text-primary">✅ 단순 무신고 (20% 가산세)</p>
                      <p>
                        "5월까지 바빴어요", "계산 복잡해서 미뤘어요" → 6월에 성의 있게 신고하고 자진신고 감면
                        받음. 가산세 50% 감면.
                      </p>
                    </div>
                    <div>
                      <p className="font-semibold text-danger-600">❌ 부정행위 (40% 가산세 + 형사 처벌)</p>
                      <p>
                        "영수증 조작해서 경비 늘렸어요", "소득 일부 현금으로 받고 안 신고했어요" → 세무조사
                        적발 후 부정행위 판정. 자진신고 감면 불가.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg bg-bg-raised p-4 text-sm text-text-secondary">
                  <p className="font-semibold text-text-primary mb-3">부정행위 기준: 실질과세 원칙 (국세기본법 §14)</p>
                  <p>
                    국세청은 "형식" 뿐만 아니라 "실질"을 봅니다. 예를 들어 프리랜서가 5억 매출을 3억으로 신고했는데
                    통장 기록, 거래처 확인 조사로 실제는 5억이 밝혀지면 부정행위입니다. 단순히 "실수"라고 주장해도 인정 안 됩니다.
                  </p>
                </div>
              </section>

              {/* 4. 자진신고 감면 타이밍 */}
              <section className="space-y-4">
                <h2 className="text-2xl font-bold">4. 자진신고 감면 50~10% — 남은 시간을 활용하라</h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  5월 31일 마감을 지났어도 "자진신고 감면" 제도가 있습니다(국세기본법 §48). 신고 기한 후 일정 기간 내에 자발적으로
                  신고하면 가산세를 50~10%까지 깎을 수 있습니다. 이것이 현재 상황에서 최후의 방어선입니다.
                </p>

                <div className="overflow-x-auto rounded-lg">
                  <table className="w-full text-sm border-collapse">
                    <thead>
                      <tr className="border-b border-border-base bg-primary-500/10">
                        <th className="px-3 py-2 text-left text-text-primary">신고 시기</th>
                        <th className="px-3 py-2 text-left text-text-primary">기한</th>
                        <th className="px-3 py-2 text-right text-text-primary">감면율</th>
                        <th className="px-3 py-2 text-right text-text-primary">실질 가산세 예시 (산출세액 500만)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="px-3 py-2 font-semibold text-text-primary">정기 신고</td>
                        <td className="px-3 py-2 text-text-secondary">~5월 31일 (6월 2일)</td>
                        <td className="px-3 py-2 text-right font-bold text-primary-600">0%</td>
                        <td className="px-3 py-2 text-right font-semibold">0원</td>
                      </tr>
                      <tr className="border-b border-border-base bg-primary-500/5">
                        <td className="px-3 py-2 font-semibold text-primary-700 dark:text-primary-300">자진신고 1차</td>
                        <td className="px-3 py-2 text-primary-600 dark:text-primary-400">6월 1~30일</td>
                        <td className="px-3 py-2 text-right font-bold text-primary-600">50%</td>
                        <td className="px-3 py-2 text-right font-semibold text-primary-600">50만</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="px-3 py-2 font-semibold">자진신고 2차</td>
                        <td className="px-3 py-2">7월 1~8월 31일</td>
                        <td className="px-3 py-2 text-right font-bold">30%</td>
                        <td className="px-3 py-2 text-right font-semibold">100만</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="px-3 py-2 font-semibold">자진신고 3차</td>
                        <td className="px-3 py-2">9월 1일~11월 30일</td>
                        <td className="px-3 py-2 text-right font-bold">20%</td>
                        <td className="px-3 py-2 text-right font-semibold">100만</td>
                      </tr>
                      <tr>
                        <td className="px-3 py-2 font-semibold">자진신고 4차</td>
                        <td className="px-3 py-2">12월 1일~다음해 5월 31일</td>
                        <td className="px-3 py-2 text-right font-bold">10%</td>
                        <td className="px-3 py-2 text-right font-semibold">100만</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="mt-4 rounded-lg bg-bg-raised p-4">
                  <p className="font-semibold text-text-primary mb-3">🚨 지금 신고하면 (2026-05-20 기준)</p>
                  <ul className="text-sm text-text-secondary list-inside list-disc space-y-1">
                    <li>
                      <strong>5월 31일까지 신고 (11일 남음)</strong>: 가산세 0원 (정기 신고 기한)
                    </li>
                    <li>
                      <strong>6월 1일 이후 신고</strong>: 무신고가산세 20% 발생, 하지만 6월 30일까지면 50%
                      감면 적용 가능
                    </li>
                  </ul>
                </div>

                <div className="rounded-lg border-l-4 border-l-highlight-500 bg-highlight-500/5 p-4 text-sm text-text-secondary">
                  <p className="font-semibold text-text-primary">💡 현실적 조언</p>
                  <p className="mt-2">
                    5월 31일까지 신고하는 것이 가장 유리합니다(가산세 0). 하지만 부득이하게 6월에 신고하더라도 6월 말까지면
                    50% 감면을 받을 수 있으므로 서두르세요.
                  </p>
                </div>
              </section>

              {/* 5. 환급 상실 위험 */}
              <section className="space-y-4">
                <h2 className="text-2xl font-bold">5. 신고 안 하면 환급도 못 받는다</h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  가장 큰 손실은 <strong>가산세가 아니라 환급 포기</strong>입니다. 프리랜서, 사업자, N잡러 중에는 3.3%
                  원천징수나 다른 공제로 인해 실제로는 "환급 대상"인 경우가 많습니다. 하지만 신고하지 않으면 그 환급을 영구히
                  받을 수 없습니다.
                </p>

                <div className="rounded-lg bg-danger-500/10 p-4 text-sm">
                  <p className="font-semibold text-danger-700 dark:text-danger-300 mb-3">⚠️ 환급 상실은 영구적입니다</p>
                  <p className="text-text-secondary">
                    5월 31일을 넘으면 "환급 청구권"이 소멸합니다(국세기본법 §26의2, 법정기한 5년이 지나면 완전 소멸).
                    예를 들어 환급 받을 돈이 200만 원인데 신고를 안 하면 그 200만 원은 영영 돌아오지 않습니다.
                  </p>
                </div>

                <div className="space-y-3 rounded-lg bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">환급 대상 전형적 사례</p>
                  <div className="space-y-2 text-sm text-text-secondary">
                    <div className="rounded-lg bg-bg-raised p-3">
                      <p className="font-semibold text-text-primary">프리랜서 월급 300만 × 12개월 = 3,600만 원</p>
                      <ul className="mt-2 list-inside list-disc space-y-1">
                        <li>3.3% 원천징수 = 약 118.8만 원</li>
                        <li>실제 세액 (기준경비율 70% 적용) ≈ 약 50만 원</li>
                        <li className="font-bold text-primary-600">환급 금액: 약 68.8만 원</li>
                      </ul>
                    </div>

                    <div className="rounded-lg bg-bg-raised p-3">
                      <p className="font-semibold text-text-primary">N잡러 직장 5천만 + 부업 1천만 (무신고 상태)</p>
                      <ul className="mt-2 list-inside list-disc space-y-1">
                        <li>부업 3.3% 원천징수 = 약 33만 원</li>
                        <li>합산 시 누진세율 상향 → 추가 세금 가능성도</li>
                        <li>하지만 의료비·교육비 누락으로 환급 가능 (약 50~100만)</li>
                        <li className="font-bold text-primary-600">환급 상실 시 손실: 50~100만 원</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border-l-2 border-l-primary-500 bg-primary-500/5 p-4 text-sm text-text-secondary">
                  <p className="font-semibold text-text-primary">결론: 환급이든 추가 납부든 반드시 신고하세요</p>
                  <p className="mt-2">
                    환급 대상이면 신고로 200~300만 원을 건질 수 있습니다. 추가 납부 대상이어도 자진신고 감면으로 가산세를
                    크게 줄일 수 있습니다. 신고하지 않는 것은 "가산세만 커지는" 최악의 선택입니다.
                  </p>
                </div>
              </section>

              {/* 6. 홈택스 신고 5분 가이드 */}
              <section className="space-y-4">
                <h2 className="text-2xl font-bold">6. 지금 바로 홈택스 신고하기 (5분)</h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  마감 11일 앞. 지금 바로 신고하면 가산세 0입니다. 최대한 간단히 신고하는 방법:
                </p>

                <ol className="space-y-3 text-sm">
                  <li className="rounded-lg border border-border-base bg-bg-card p-4">
                    <strong className="text-text-primary block mb-1">1단계: 홈택스 로그인</strong>
                    <p className="text-text-secondary">
                      <a
                        href="https://www.hometax.go.kr"
                        target="_blank"
                        rel="noopener noreferrer nofollow"
                        className="text-primary-600 underline dark:text-primary-500"
                      >
                        hometax.go.kr
                      </a>{' '}
                      접속 → 공동인증서 또는 간편인증 로그인
                    </p>
                  </li>
                  <li className="rounded-lg border border-border-base bg-bg-card p-4">
                    <strong className="text-text-primary block mb-1">2단계: 신고/납부 → 종합소득세 신고</strong>
                    <p className="text-text-secondary">
                      상단 메뉴에서 "신고/납부" → "종합소득세" → "신고/납부" 클릭. 모바일은 손택스 앱도 가능.
                    </p>
                  </li>
                  <li className="rounded-lg border border-border-base bg-bg-card p-4">
                    <strong className="text-text-primary block mb-1">3단계: 모두채움 신고 선택</strong>
                    <p className="text-text-secondary">
                      국세청이 자동으로 수집한 소득(근로소득, 3.3% 원천징수 등) 확인. 누락된 소득 있으면 직접 입력.
                    </p>
                  </li>
                  <li className="rounded-lg border border-border-base bg-bg-card p-4">
                    <strong className="text-text-primary block mb-1">4단계: 경비·공제 입력</strong>
                    <p className="text-text-secondary">
                      기준경비율 또는 단순경비율 선택, 의료비·교육비·기부금 등 공제 추가.
                    </p>
                  </li>
                  <li className="rounded-lg border border-border-base bg-bg-card p-4">
                    <strong className="text-text-primary block mb-1">5단계: 결과 확인 → 전자신고</strong>
                    <p className="text-text-secondary">
                      세액 확인 후 "전자신고" 클릭. 추가 납부 또는 환급 금액이 표시됨. 신고 완료 접수증 저장.
                    </p>
                  </li>
                </ol>

                <div className="rounded-lg bg-highlight-500/10 p-4 text-sm text-text-secondary">
                  <p className="font-semibold text-text-primary">⏰ 시간 아끼기 팁</p>
                  <ul className="mt-2 list-inside list-disc space-y-1">
                    <li>5월 25일 이후는 홈택스 서버 폭주 → 새벽(오전 6~8시) 또는 5월 20~24일 신고 권장</li>
                    <li>본 사이트{' '}
                      <Link href="/calculator/freelancer-tax/" className="text-primary-600 underline">
                        프리랜서 종합소득세 계산기
                      </Link>
                      로 미리 세액 계산해보세요
                    </li>
                    <li>복잡하면 세무사 상담 (수수료 10~50만, 가산세 감면 효과로 충분히 상쇄됨)</li>
                  </ul>
                </div>
              </section>

              <FaqSection items={[...FAQ_ITEMS]} />

              {/* 주의사항 */}
              <section className="card border-l-2 border-l-danger-500 bg-danger-500/5">
                <h2 className="mb-3 text-lg font-semibold text-danger-700 dark:text-danger-300">⚠️ 최종 주의사항</h2>
                <ul className="space-y-2 text-sm text-danger-700 dark:text-danger-300">
                  <li>
                    • <strong>5월 31일까지</strong> 신고하는 것이 가장 안전 (가산세 0, 자진신고 감면도 불필요)
                  </li>
                  <li>
                    • 신고 후 세금 납부는 별개 — 신고 후 30일 이내에 납부하지 않으면 납부지연가산세 매일 0.022%씩
                    증가
                  </li>
                  <li>
                    • 환급 대상은 신고하지 않으면 영구 상실 (5년 법정기한 후 청구 불가)
                  </li>
                  <li>
                    • 부정행위(영수증 조작, 소득 은폐) 적발 시 가산세 40% + 형사 처벌 위험
                  </li>
                  <li>
                    • 복잡한 경우 세무사 상담 추천. 가산세 절감 효과로 수수료는 충분히 상쇄됨.
                  </li>
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
                    {' '}— 신고 전 세액 미리 계산
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
                    <Link href="/calculator/salary/" className="text-primary-600 underline dark:text-primary-500">
                      연봉 실수령액 계산기
                    </Link>
                    {' '}— N잡러 합산 세액 계산
                  </li>
                  <li>
                    →{' '}
                    <Link href="/guide/financial-income-comprehensive-vs-separate-taxation/" className="text-primary-600 underline dark:text-primary-500">
                      금융소득 종합과세 vs 분리과세
                    </Link>
                    {' '}— 이자·배당 2천만 기준
                  </li>
                  <li>
                    →{' '}
                    <Link href="/guide/year-end-tax-settlement/" className="text-primary-600 underline dark:text-primary-500">
                      연말정산 가이드
                    </Link>
                    {' '}— 다음해 1월 대비 (의료비·교육비 누락 확인)
                  </li>
                </ul>
              </section>

              <ShareButtons
                title="종합소득세 무신고·지연 가산세 2026 정확 계산"
                url={URL}
                description="5월 31일 마감 11일 전! 무신고가산세 20% + 자진신고 감면 50% + 환급 상실 위험 완벽 정리."
              />

              {/* 출처 및 면책 */}
              <section
                aria-label="출처 및 면책"
                className="rounded-lg border border-border-base p-4 text-caption text-text-tertiary"
              >
                <p className="mb-2">
                  <strong>법적 근거</strong>: 국세기본법 §47의2 (무신고가산세) · §47의3 (과소신고가산세) · §47의4
                  (납부지연가산세) · §48 (자진신고 감면) · §26의2 (법정기한). 참고:{' '}
                  <a
                    href="https://www.hometax.go.kr/guide/0202000000.jsp"
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="text-primary-600 underline dark:text-primary-500"
                  >
                    국세청 가산세 안내
                  </a>
                  ,{' '}
                  <a
                    href="https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?mi=6533&cntntsId=7960"
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="text-primary-600 underline dark:text-primary-500"
                  >
                    국세청 증여세 신고
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
