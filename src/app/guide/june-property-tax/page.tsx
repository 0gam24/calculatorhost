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
  buildFaqPageJsonLd,
  buildSpeakableJsonLd,
} from '@/lib/seo/jsonld';

const URL = 'https://calculatorhost.com/guide/june-property-tax/';
const DATE_PUBLISHED = '2026-05-03';
const DATE_MODIFIED = '2026-05-03';

export const metadata: Metadata = {
  title: '재산세 완벽 가이드 2026 | 6월 부과·7월 납부·공정시장가액비율 | calculatorhost',
  description:
    '2026년 재산세 부과·납부 완벽 가이드. 6월 1일 과세 기준일·7월 16~31일 1차 납부·공시가격·공정시장가액비율 60%·1세대1주택 특례·세부담 상한·연납 할인까지 한 페이지.',
  keywords: [
    '재산세',
    '재산세 계산',
    '재산세 납부',
    '재산세 7월',
    '주택 재산세',
    '공정시장가액비율',
    '1세대1주택 재산세 특례',
    '세부담상한',
    '재산세 분할납부',
    '위택스 재산세',
  ],
  alternates: { canonical: URL },
  openGraph: {
    title: '재산세 완벽 가이드 2026 — 7월 납부 시즌 직전 필독',
    description: '공시가격 × 공정시장가액 60% 산정 + 1세대1주택 특례 + 분할 납부.',
    url: URL,
    type: 'article',
    images: ['/og-default.png'],
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '재산세 완벽 가이드 2026 — 7월 납부 시즌',
    description: '공시가격·공정시장가액·1세대1주택 특례·분할 납부 정리.',
    images: ['/og-default.png'],
  },
};

const FAQ_ITEMS = [
  {
    question: '재산세 과세 기준일은 언제인가요?',
    answer:
      '매년 6월 1일 (지방세법 §114). 6월 1일 0시 기준 부동산 소유자에게 부과. 5월 31일까지 매도해 잔금 받았으면 매도자가, 6월 1일 이후 잔금 받았으면 매수자가 1년치 재산세 부담. 6월 1일 직전 거래는 잔금일 기준 한 끗 차이로 수십~수백만 원 차이.',
  },
  {
    question: '재산세 납부 기한은 언제인가요?',
    answer:
      '주택분 재산세는 1년 2회 분할 납부: ① 1차 7월 16일~31일 (1/2 납부) ② 2차 9월 16일~30일 (나머지 1/2). 단 본세가 20만 원 이하면 7월에 전액 납부. 토지·건축물·선박·항공기 등은 9월 일괄 납부. 기한 초과 시 가산금 3% + 매월 0.75% 중가산금 (최대 60개월).',
  },
  {
    question: '재산세 계산식은?',
    answer:
      '① 과세표준 = 공시가격 × 공정시장가액비율 (주택 60%) ② 본세 = 과세표준 × 누진세율 (4단계, 0.1%~0.4%) ③ 도시지역분 = 과세표준 × 0.14% (도시 한정) ④ 지방교육세 = 본세 × 20% ⑤ 총 납부액 = 본세 + 도시지역분 + 지방교육세. 1세대1주택 특례 적용 시 더 낮은 세율 표 사용.',
  },
  {
    question: '1세대1주택 재산세 특례는 무엇인가요?',
    answer:
      '공시가격 9억 원 이하 1주택 보유자(1세대 기준)에게 적용되는 특례 세율. 일반 세율 대비 약 50% 낮음 (예: 6천만 이하 일반 0.1% → 특례 0.05%). 9억 초과는 일반 세율 적용. 신청 자동 적용 (위택스 자동 판정), 단 1세대 1주택 요건은 6월 1일 기준 모든 세대원 합산 1주택만.',
  },
  {
    question: '공정시장가액비율 60%는 어떻게 적용되나요?',
    answer:
      '재산세 과세표준 산정 시 공시가격에 곱하는 비율. 2026년 주택 60% 유지 (지방세법 시행령 §109). 예: 공시가격 5억 주택 → 과세표준 5억 × 60% = 3억. 본세 산정은 3억 기준. 공정시장가액비율은 정부 정책에 따라 변동 가능 (2022년 60%, 2023년 45% 한시 인하 후 복귀 등).',
  },
  {
    question: '세부담 상한제는 무엇인가요?',
    answer:
      '공시가격 급등으로 재산세가 폭증하지 않도록 전년 대비 상승 한도 설정. 주택 공시가격 3억 이하 105%, 3~6억 110%, 6억 초과 130%. 즉 작년 100만 원 → 올해 110~130만 원 한도. 상한 초과분은 다음 해로 이월. 공시가격 변동 큰 해는 세부담 상한이 결정적.',
  },
  {
    question: '재산세 분할 납부·신용카드 납부는?',
    answer:
      '본세 250만 원 초과 시 분할 납부 신청 가능 (납기 다음 달 말까지 2개월 분납). 신청은 위택스(wetax.go.kr) 또는 시·군·구청. 신용카드 납부는 위택스에서 가능 — 일부 카드사 무이자 할부 (2~6개월). 단, 신용카드 결제 수수료 약 0.8% 본인 부담.',
  },
  {
    question: '재산세와 종합부동산세 차이는?',
    answer:
      '재산세는 지방세 (시·군 부과), 종부세는 국세 (국세청 부과). 재산세는 모든 부동산 보유자, 종부세는 1세대 합산 공시가 9억 초과 (1주택 12억) 또는 다주택자 6억 초과만. 7월/9월 재산세 납부 → 12월 종부세 별도 납부. 종부세 납부분은 재산세에서 차감되지 않음 (이중과세 아님).',
  },
] as const;

export default function JunePropertyTaxPage() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '재산세 완벽 가이드' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '재산세 완벽 가이드 (2026) — 6월 부과·7월 납부·공정시장가액 60%',
    description:
      '재산세 과세 기준일·납부 기한·계산식·1세대1주택 특례·세부담 상한·분할 납부 한 페이지.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['재산세', '7월 납부', '공정시장가액비율', '1세대1주택 특례', '세부담상한'],
  });
  const faqLd = buildFaqPageJsonLd([...FAQ_ITEMS]);
  const speakableLd = buildSpeakableJsonLd(['[data-speakable]']);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableLd) }} />

      <div className="min-h-screen bg-bg-base">
        <Header />
        <div className="flex">
          <Sidebar />
          <main className="flex-1 px-4 py-8 md:px-8">
            <article className="mx-auto max-w-3xl space-y-8">
              <header>
                <Breadcrumb
                  items={[
                    { name: '홈', href: '/' },
                    { name: '가이드', href: '/guide/' },
                    { name: '재산세 완벽 가이드' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">세금·부동산 · 10분 읽기 · 2026-05-03</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  재산세 완벽 가이드 (2026)
                  <br />
                  <span className="text-2xl text-text-secondary">— 6월 부과·7월 납부·공정시장가액 60%</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  재산세는 매년 6월 1일 부동산 소유자에게 부과되어 7월·9월 두 차례 납부합니다.
                  공시가격 × 공정시장가액비율 60%로 과세표준을 정하고, 1세대1주택은 특례 세율로
                  약 50% 절세 가능. 세부담 상한·분할 납부·신용카드 납부까지 한 페이지에 정리합니다.
                </p>
              </header>

              <AdSlot slot="guide-property-tax-top" format="horizontal" />

              <section aria-label="핵심 요약" className="card border-l-4 border-l-primary-500">
                <h2 className="mb-2 text-caption uppercase tracking-wider text-primary-500">핵심 요약</h2>
                <ul className="space-y-1.5 text-sm" data-speakable>
                  <li>📅 <strong>과세 기준일</strong>: 매년 6월 1일 (0시 기준 소유자에게 부과)</li>
                  <li>💰 <strong>1차 납부</strong>: 7월 16~31일 (주택 본세의 1/2)</li>
                  <li>💰 <strong>2차 납부</strong>: 9월 16~30일 (주택 나머지 1/2 + 토지·건축물 일괄)</li>
                  <li>📊 <strong>과세표준</strong>: 공시가격 × 공정시장가액 60% (주택 기준)</li>
                  <li>🏠 <strong>1세대1주택 특례</strong>: 공시 9억 이하 일반세율 1/2 적용</li>
                  <li>📈 <strong>세부담 상한</strong>: 105~130% (공시가 구간별)</li>
                </ul>
              </section>

              <section aria-label="신고 일정" className="card bg-danger-500/5 border-l-4 border-l-danger-500">
                <h2 className="mb-3 text-xl font-bold text-danger-700 dark:text-danger-300">
                  🚨 2026년 재산세 일정표
                </h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border-base">
                        <th className="px-3 py-2 text-left">날짜</th>
                        <th className="px-3 py-2 text-left">일정</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-subtle">
                        <td className="px-3 py-2 font-bold">6월 1일 (월)</td>
                        <td className="px-3 py-2 font-bold">⚠️ 과세 기준일 — 이날 0시 기준 소유자에게 부과</td>
                      </tr>
                      <tr className="border-b border-border-subtle">
                        <td className="px-3 py-2">7월 초</td>
                        <td className="px-3 py-2">재산세 고지서 발송 (전자고지·우편)</td>
                      </tr>
                      <tr className="border-b border-border-subtle bg-danger-500/10">
                        <td className="px-3 py-2 font-bold">7월 16~31일</td>
                        <td className="px-3 py-2 font-bold">1차 납부 (주택 본세의 1/2 또는 전액 if 20만 이하)</td>
                      </tr>
                      <tr className="border-b border-border-subtle bg-danger-500/10">
                        <td className="px-3 py-2 font-bold">9월 16~30일</td>
                        <td className="px-3 py-2 font-bold">2차 납부 (주택 나머지 1/2 + 토지·건축물 일괄)</td>
                      </tr>
                      <tr>
                        <td className="px-3 py-2">10월 이후</td>
                        <td className="px-3 py-2 text-danger-700 dark:text-danger-300">미납 시 가산금 3% + 매월 0.75% (최대 60개월)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">1. 재산세란? — 누구에게 부과되나</h2>
                <p className="text-text-secondary leading-relaxed">
                  재산세는 부동산(주택·토지·건축물)·자동차·선박·항공기 보유자에게 매년 부과되는
                  지방세입니다. 시·군·구청에서 부과·징수하며, 6월 1일 기준 소유자에게 부과합니다
                  (지방세법 §107, §114).
                </p>
                <div className="rounded-lg border-l-4 border-l-danger-500 bg-danger-500/5 p-4">
                  <p className="text-sm text-danger-700 dark:text-danger-300">
                    <strong>⚠️ 6월 1일 거래 주의</strong>: 5월 31일까지 잔금 → 매도자가 1년치 재산세 부담.
                    6월 1일 이후 잔금 → 매수자가 부담. 한 끗 차이로 수십~수백만 원 부담 변동.
                    부동산 거래 계약 시 잔금 일정 신중히 협상.
                  </p>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">2. 재산세 계산식 — 단계별 정리</h2>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <ol className="space-y-3 text-sm">
                    <li>
                      <strong className="text-text-primary">Step 1. 과세표준 산정</strong>
                      <p className="mt-1 text-text-secondary font-mono text-xs bg-bg-raised p-2 rounded">
                        과세표준 = 공시가격 × 공정시장가액비율 (주택 60%, 토지·건축물 70%)
                      </p>
                      <p className="mt-1 text-text-secondary">예: 공시 5억 주택 → 5억 × 60% = 3억</p>
                    </li>
                    <li>
                      <strong className="text-text-primary">Step 2. 본세 산정 (누진세율 4단계)</strong>
                      <table className="mt-1 w-full text-xs border-collapse">
                        <thead>
                          <tr className="bg-bg-raised">
                            <th className="px-2 py-1 text-left">과세표준</th>
                            <th className="px-2 py-1 text-right">일반</th>
                            <th className="px-2 py-1 text-right">1세대1주택 특례</th>
                          </tr>
                        </thead>
                        <tbody className="text-text-secondary">
                          <tr className="border-b border-border-subtle"><td className="px-2 py-1">6천만 이하</td><td className="px-2 py-1 text-right">0.1%</td><td className="px-2 py-1 text-right">0.05%</td></tr>
                          <tr className="border-b border-border-subtle"><td className="px-2 py-1">6천만~1.5억</td><td className="px-2 py-1 text-right">0.15%</td><td className="px-2 py-1 text-right">0.1%</td></tr>
                          <tr className="border-b border-border-subtle"><td className="px-2 py-1">1.5억~3억</td><td className="px-2 py-1 text-right">0.25%</td><td className="px-2 py-1 text-right">0.2%</td></tr>
                          <tr><td className="px-2 py-1">3억 초과</td><td className="px-2 py-1 text-right">0.4%</td><td className="px-2 py-1 text-right">0.35%</td></tr>
                        </tbody>
                      </table>
                    </li>
                    <li>
                      <strong className="text-text-primary">Step 3. 도시지역분 (도시 한정)</strong>
                      <p className="mt-1 text-text-secondary font-mono text-xs bg-bg-raised p-2 rounded">
                        도시지역분 = 과세표준 × 0.14%
                      </p>
                    </li>
                    <li>
                      <strong className="text-text-primary">Step 4. 지방교육세</strong>
                      <p className="mt-1 text-text-secondary font-mono text-xs bg-bg-raised p-2 rounded">
                        지방교육세 = 본세 × 20%
                      </p>
                    </li>
                    <li>
                      <strong className="text-text-primary">Step 5. 총 납부액</strong>
                      <p className="mt-1 text-text-secondary font-mono text-xs bg-bg-raised p-2 rounded">
                        총 납부액 = 본세 + 도시지역분 + 지방교육세
                      </p>
                    </li>
                  </ol>
                </div>
                <div className="rounded-lg bg-bg-raised p-4 text-sm">
                  <strong className="text-text-primary">📌 시뮬레이션 — 공시 5억 1세대1주택 (도시지역)</strong>
                  <ul className="mt-2 text-text-secondary space-y-1">
                    <li>과세표준: 5억 × 60% = 3억</li>
                    <li>본세 (특례): (6천만 × 0.05%) + (9천만 × 0.1%) + (1.5억 × 0.2%) = 3만 + 9만 + 30만 = <strong>42만 원</strong></li>
                    <li>도시지역분: 3억 × 0.14% = 42만 원</li>
                    <li>지방교육세: 42만 × 20% = 8.4만 원</li>
                    <li className="pt-2 border-t border-border-base"><strong>총 납부액: 약 92.4만 원/년</strong> (1차 46.2만 + 2차 46.2만)</li>
                  </ul>
                  <p className="mt-2 text-text-tertiary">
                    →{' '}
                    <Link href="/calculator/property-tax/" className="text-primary-600 underline dark:text-primary-500">
                      재산세 계산기
                    </Link>
                    에서 본인 공시가격으로 즉시 계산
                  </p>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">3. 1세대1주택 특례 — 절세 50%</h2>
                <p className="text-text-secondary leading-relaxed">
                  공시가격 9억 원 이하 1주택 보유 1세대에게 적용되는 특례 세율. 일반 세율 대비 약
                  50% 낮은 세율 적용. 위택스에서 자동 판정되어 별도 신청 불필요.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 text-sm">
                  <h3 className="mb-2 font-semibold text-text-primary">특례 적용 조건</h3>
                  <ul className="text-text-secondary space-y-1">
                    <li>• 6월 1일 기준 1세대 합산 1주택</li>
                    <li>• 공시가격 9억 원 이하 (9억 초과는 일반 세율)</li>
                    <li>• 분리과세 토지·자동차는 별도 적용</li>
                  </ul>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">4. 세부담 상한제 — 급등 방지</h2>
                <p className="text-text-secondary leading-relaxed">
                  공시가격 급등으로 재산세가 폭증하지 않도록 전년 대비 상승 한도를 설정하는 제도
                  (지방세법 §122).
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <thead>
                      <tr className="bg-primary-500/10 border border-border-base">
                        <th className="px-3 py-2 text-left">공시가격</th>
                        <th className="px-3 py-2 text-right">전년 대비 상한</th>
                      </tr>
                    </thead>
                    <tbody className="text-text-secondary">
                      <tr className="border border-border-base"><td className="px-3 py-2">3억 이하</td><td className="px-3 py-2 text-right">105%</td></tr>
                      <tr className="border border-border-base"><td className="px-3 py-2">3억 ~ 6억</td><td className="px-3 py-2 text-right">110%</td></tr>
                      <tr className="border border-border-base"><td className="px-3 py-2">6억 초과</td><td className="px-3 py-2 text-right">130%</td></tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-text-secondary text-sm">
                  예: 작년 재산세 100만 원 (공시 4억) → 올해 공시 5억으로 상승 → 본세 인상에도
                  세부담 상한 110%로 110만 원만 부과. 초과분은 다음 해로 이월.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">5. 납부 방법 — 5가지 옵션</h2>
                <div className="space-y-3">
                  <div className="rounded-lg border border-border-base bg-bg-raised p-4">
                    <h3 className="font-semibold text-text-primary mb-1">① 위택스(wetax.go.kr) — 가장 편리</h3>
                    <p className="text-sm text-text-secondary">로그인 → "납부" → 재산세 선택 → 계좌이체·신용카드·간편결제</p>
                  </div>
                  <div className="rounded-lg border border-border-base bg-bg-raised p-4">
                    <h3 className="font-semibold text-text-primary mb-1">② 신용카드 — 무이자 할부 가능</h3>
                    <p className="text-sm text-text-secondary">위택스 또는 카드사 앱. 일부 카드사 2~6개월 무이자. 결제 수수료 약 0.8% 본인 부담.</p>
                  </div>
                  <div className="rounded-lg border border-border-base bg-bg-raised p-4">
                    <h3 className="font-semibold text-text-primary mb-1">③ 분할 납부 — 본세 250만 원 초과 시</h3>
                    <p className="text-sm text-text-secondary">납기 다음 달 말까지 2개월 분납. 위택스 또는 시·군·구청 신청.</p>
                  </div>
                  <div className="rounded-lg border border-border-base bg-bg-raised p-4">
                    <h3 className="font-semibold text-text-primary mb-1">④ 자동이체 신청 — 한 번 등록 매년 자동</h3>
                    <p className="text-sm text-text-secondary">위택스 자동이체 신청. 일부 시·군은 0.5% 할인.</p>
                  </div>
                  <div className="rounded-lg border border-border-base bg-bg-raised p-4">
                    <h3 className="font-semibold text-text-primary mb-1">⑤ 은행·편의점 가상계좌</h3>
                    <p className="text-sm text-text-secondary">고지서 가상계좌 번호로 송금. 24시간 가능.</p>
                  </div>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">6. 재산세 vs 종합부동산세 — 차이 정리</h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <thead>
                      <tr className="bg-primary-500/10 border border-border-base">
                        <th className="px-3 py-2 text-left">항목</th>
                        <th className="px-3 py-2">재산세</th>
                        <th className="px-3 py-2">종합부동산세</th>
                      </tr>
                    </thead>
                    <tbody className="text-text-secondary">
                      <tr className="border border-border-base"><td className="px-3 py-2 font-semibold">부과 주체</td><td className="px-3 py-2">시·군·구청 (지방세)</td><td className="px-3 py-2">국세청 (국세)</td></tr>
                      <tr className="border border-border-base"><td className="px-3 py-2 font-semibold">대상</td><td className="px-3 py-2">모든 부동산 보유자</td><td className="px-3 py-2">1세대 합산 공시가 9억 초과 (1주택 12억) 또는 다주택 6억 초과</td></tr>
                      <tr className="border border-border-base"><td className="px-3 py-2 font-semibold">기준일</td><td className="px-3 py-2">6월 1일</td><td className="px-3 py-2">6월 1일 (동일)</td></tr>
                      <tr className="border border-border-base"><td className="px-3 py-2 font-semibold">납부</td><td className="px-3 py-2">7·9월 (주택 분할)</td><td className="px-3 py-2">12월 1일~15일</td></tr>
                      <tr className="border border-border-base"><td className="px-3 py-2 font-semibold">세율</td><td className="px-3 py-2">0.1~0.4% (4단계)</td><td className="px-3 py-2">0.5~7.0% (다주택)</td></tr>
                    </tbody>
                  </table>
                </div>
              </section>

              <FaqSection items={[...FAQ_ITEMS]} />

              <section className="card border-l-4 border-l-danger-500 bg-danger-500/5">
                <h2 className="mb-2 text-lg font-semibold text-danger-700 dark:text-danger-300">⚠️ 주의사항</h2>
                <ul className="space-y-2 text-sm text-danger-700 dark:text-danger-300">
                  <li>• 본 가이드는 일반론이며 개별 사정(상속·증여 직후, 1세대 판정 모호)은 시·군청 상담 권장.</li>
                  <li>• 공정시장가액비율은 정부 정책에 따라 변경 가능 (시행령 §109).</li>
                  <li>• 1세대1주택 특례는 6월 1일 기준 — 5월말 매수 시 본인이 특례 받을지 매도자가 받을지 계약서 확인.</li>
                  <li>• 미납 가산금 누적 — 7월 31일·9월 30일 기한 절대 엄수.</li>
                </ul>
              </section>

              <section className="card">
                <h2 className="mb-3 text-lg font-semibold">📊 관련 계산기·가이드</h2>
                <ul className="space-y-2 text-sm">
                  <li>→ <Link href="/calculator/property-tax/" className="text-primary-600 underline dark:text-primary-500">재산세 계산기</Link> — 본인 공시가격으로 즉시 시뮬레이션</li>
                  <li>→ <Link href="/calculator/comprehensive-property-tax/" className="text-primary-600 underline dark:text-primary-500">종합부동산세 계산기</Link></li>
                  <li>→ <Link href="/calculator/acquisition-tax/" className="text-primary-600 underline dark:text-primary-500">취득세 계산기</Link></li>
                  <li>→ <Link href="/guide/capital-gains-tax-tips/" className="text-primary-600 underline dark:text-primary-500">가이드: 양도세 절세 7가지</Link></li>
                  <li>→ <Link href="/glossary/" className="text-primary-600 underline dark:text-primary-500">용어사전 — 공정시장가액비율·1세대1주택 등</Link></li>
                </ul>
              </section>

              <ShareButtons
                title="재산세 완벽 가이드 (2026) — 6월 부과·7월 납부"
                url={URL}
                description="공시가격 × 공정시장가액 60% + 1세대1주택 특례 + 분할 납부."
              />

              <section
                aria-label="출처 및 면책"
                className="rounded-lg border border-border-base p-4 text-caption text-text-tertiary"
              >
                <p className="mb-2">
                  <strong>법적 근거</strong>: 지방세법 §107·§110·§114·§122·§150 · 시행령 §109. 참고:{' '}
                  <a href="https://www.wetax.go.kr" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-600 underline dark:text-primary-500">위택스</a>,{' '}
                  <a href="https://www.molit.go.kr" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-600 underline dark:text-primary-500">국토교통부</a> 공시가격,{' '}
                  <a href="https://www.reb.or.kr" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-600 underline dark:text-primary-500">한국부동산원</a>.
                </p>
                <p>
                  <strong>업데이트</strong>: {DATE_MODIFIED} · 작성·검수: 김준혁 (스마트데이터샵)
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
