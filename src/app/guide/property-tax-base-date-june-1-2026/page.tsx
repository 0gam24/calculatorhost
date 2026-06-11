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

const URL = 'https://calculatorhost.com/guide/property-tax-base-date-june-1-2026/';
const DATE_PUBLISHED = '2026-05-31';
const DATE_MODIFIED = '2026-05-31';

export const metadata: Metadata = {
  title: '재산세 과세기준일 6월 1일 — 매매 잔금 타이밍과 부담자 판정 | calculatorhost',
  description:
    '재산세는 매년 6월 1일 기준 소유자에게 부과됩니다. 잔금일이 5월 31일 vs 6월 2일이면 누가 재산세를 내는가? 지방세법 §114에 따른 과세기준일 판정법과 거래 전 필수 협상 가이드.',
  keywords: [
    '재산세 과세기준일',
    '재산세 6월 1일',
    '재산세 누가 내나',
    '잔금일 재산세',
    '잔금 과세기준일',
    '매도자 재산세',
    '매수자 재산세',
    '부동산 거래 재산세',
    '지방세법 114조',
    '6월 재산세',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '재산세 과세기준일 6월 1일 — 매매 잔금 타이밍과 부담자 판정 | calculatorhost' }],
    title: '재산세 과세기준일 6월 1일 — 잔금 타이밍과 부담자',
    description: '지방세법 §114: 6월 1일 현재 소유자가 그 해 재산세 전액 부담. 5월 31일 잔금 vs 6월 2일 잔금 시 부담자 변경.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '재산세 과세기준일 6월 1일 — 잔금 타이밍과 부담자',
    description: '지방세법 §114 기준 매도자/매수자 재산세 부담 판정.',
  },
};

const FAQ_ITEMS = [
  {
    question: '5월 31일 잔금과 6월 2일 잔금, 재산세 부담이 어떻게 달라나요?',
    answer:
      '재산세는 6월 1일 0시 기준 소유자(사실상 취득자)가 그 해 재산세 전액을 부담합니다 (지방세법 §114). 5월 31일 잔금 → 매수자가 6월 1일 현재 주인 → 매수자 부담. 6월 2일 잔금 → 매도자가 6월 1일 현재 주인 → 매도자 부담. 한 끗 차이로 같은 부동산 재산세를 누가 내는지 결정되므로 계약 단계에서 반드시 명시해야 합니다.',
  },
  {
    question: '등기일과 잔금일 중 어느 것이 재산세 기준이 되나요?',
    answer:
      '지방세법 §114에서 "사실상 소유자"를 기준으로 하기 때문에 등기 완료일이 아니라 **사실상 취득일(잔금일)**을 기준으로 판정합니다. 일반적으로 잔금 지급이 소유권 이전의 실질이므로, 잔금일이 6월 1일 이전인지 이후인지가 중요합니다. 등기는 이후 진행되어도 무방합니다.',
  },
  {
    question: '재산세 납부 기한은 언제인가요?',
    answer:
      '주택분 재산세는 1년 2회 분할 납부입니다 (지방세법 §115). ① 1차: 7월 16~31일 (1/2 납부) ② 2차: 9월 16~30일 (나머지 1/2). 단 본세가 20만 원 이하면 7월에 전액 납부. 6월 1일 기준 소유자가 이 두 차례 모두 나눠 내야 합니다.',
  },
  {
    question: '6월 중순에 잔금받기로 예정되어 있다면?',
    answer:
      '6월 중순 잔금은 6월 1일 이후이므로, 매도자가 그 해 전체 재산세를 부담합니다. 매매계약서에 "재산세는 매도자 부담" 명시 필수. 계약서에 기재하지 않으면 추후 분쟁 시 판례상 매수자에게 기한 내 납부 청구가 들어올 수 있습니다.',
  },
  {
    question: '양도세와 재산세를 함께 고려하려면?',
    answer:
      '매도자는 양도세(거래 이익에 부과)와 재산세(6월 1일 기준 소유 부담)를 동시에 고려해야 합니다. 잔금 지연으로 재산세까지 부담하면 총 세부담이 크게 늘어납니다. 거래 계약 협상 시 "잔금일 = 재산세 부담자 기준"을 명확히 하고, 잔금 지연 시 재산세 환급 약정을 추가 조항으로 기재하는 것이 분쟁 방지 팁입니다.',
  },
  {
    question: '부동산 중개인에게 꼭 확인해야 할 사항은?',
    answer:
      '매매계약서 작성 시 ① 잔금일 명시 (5월 31일 vs 6월 이후?) ② 재산세 부담 명시 (매도자 vs 매수자?) ③ 취득세 부담 주체 명시를 중개인과 함께 확인합니다. 계약서에 명시하지 않으면 관례상 매수자가 취득세를, 잔금 후 소유자가 그 해 재산세를 부담하는 것으로 해석되므로 주의가 필요합니다.',
  },
] as const;

export default function PropertyTaxBaseDatePage() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '재산세 과세기준일' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '재산세 과세기준일 6월 1일 — 잔금 타이밍과 매도자/매수자 부담 판정',
    description:
      '지방세법 §114에 따른 재산세 과세기준일 6월 1일 판정. 잔금일이 5월 31일 vs 6월 2일이면 누가 재산세를 내는가?',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['재산세', '과세기준일', '6월 1일', '잔금', '매도자', '매수자'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '재산세 과세기준일 6월 1일 — 잔금 타이밍과 부담자 판정',
    description:
      '재산세는 지방세법 §114에 따라 매년 6월 1일 현재 사실상 소유자에게 부과. 잔금 타이밍에 따라 매도자 vs 매수자 중 누가 그 해 전체 재산세를 부담하는지 결정되므로 거래 전 반드시 계약서에 명시.',
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
                    { name: '재산세 과세기준일 6월 1일' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">세금·부동산 · 8분 읽기 · 2026-05-31</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  재산세 과세기준일 6월 1일
                  <br />
                  <span className="text-2xl text-text-secondary">— 잔금 타이밍과 납세 부담자</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  재산세는 지방세법 §114에 따라 매년 6월 1일 0시 기준 현재 소유자(사실상 소유자)가 그 해 전체 재산세를 부담합니다.
                  부동산 거래 시 잔금일이 5월 31일인지 6월 2일인지에 따라 재산세 부담자가 완전히 달라지므로, 매매계약 단계에서 반드시 명시해야 합니다.
                </p>
              </header>

              <AdSlot slot="guide-property-tax-base-date-top" format="horizontal" />

              <section aria-label="핵심 요약" className="card border-l-4 border-l-danger-500">
                <h2 className="mb-2 text-caption uppercase tracking-wider text-danger-500">주의사항</h2>
                <div className="space-y-2 text-sm" data-speakable>
                  <p className="font-bold text-danger-700 dark:text-danger-300">
                    ⚠️ 6월 1일이 재산세 과세기준일 — 거래 잔금 한 끗 차이로 수십~수백만 원 부담 변동
                  </p>
                  <ul className="space-y-1.5 text-text-secondary">
                    <li>📅 <strong>5월 31일 이전 잔금</strong>: 매수자가 6월 1일 소유 → 매수자가 재산세 부담</li>
                    <li>📅 <strong>6월 2일 이후 잔금</strong>: 매도자가 6월 1일 소유 → 매도자가 재산세 부담</li>
                    <li>💰 <strong>재산세 금액</strong>: 공시가격 5억 기준 연 약 50~100만 원 (1세대1주택 특례 적용 시)</li>
                    <li>📜 <strong>필수 조항</strong>: 매매계약서에 "재산세 부담자" 명시 필수 (기재 부재 시 추후 분쟁)</li>
                  </ul>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">1. 재산세 과세기준일이란? — 6월 1일</h2>
                <p className="text-text-secondary leading-relaxed">
                  재산세는 지방세법 §114에 따라 매년 6월 1일 자정(0시) 기준으로 부동산을 소유한 사람(사실상 소유자)에게
                  그 해 1월 1일부터 12월 31일까지 12개월분 전체 재산세를 부과합니다.
                </p>
                <div className="rounded-lg border-l-4 border-l-primary-500 bg-primary-500/5 p-4">
                  <p className="text-sm font-semibold text-primary-700 dark:text-primary-400">
                    📌 핵심: "사실상 소유자" 기준
                  </p>
                  <p className="mt-2 text-sm text-text-secondary">
                    법적 등기일이 아니라 실질적으로 부동산을 취득한 날(=잔금일)을 기준으로 판정합니다.
                    따라서 부동산 거래에서 <strong>등기 완료 여부와 상관없이 잔금 시점</strong>이 재산세 부담자 결정의 핵심입니다.
                  </p>
                </div>
                <p className="text-text-secondary leading-relaxed">
                  예를 들어, 아파트를 5월 30일에 계약하고 6월 10일에 잔금을 받았다면, 등기는 6월 25일에 완료되었더라도
                  실질적 취득은 6월 10일(잔금일)이므로 <strong>6월 10일 이후의 소유자</strong>로 판정됩니다.
                  따라서 그 해 재산세는 매도자가 부담합니다.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">2. 거래 시나리오 — 언제 누가 재산세를 내나?</h2>
                <div className="space-y-3">
                  <div className="rounded-lg border border-border-base bg-bg-card p-4">
                    <h3 className="font-semibold text-text-primary mb-2">시나리오 A: 5월 31일 잔금</h3>
                    <ul className="space-y-1.5 text-sm text-text-secondary">
                      <li>• 5월 31일 00:00 직전 잔금 완료</li>
                      <li>• 6월 1일 0시 기준: <strong>매수자가 소유자</strong></li>
                      <li>• 결과: <strong>매수자가 그 해 전체 재산세 부담</strong> (7월·9월 납부)</li>
                      <li>• 매도자의 책임: 취득세만 부담 (거래가의 1~3%)</li>
                    </ul>
                  </div>
                  <div className="rounded-lg border border-border-base bg-bg-card p-4">
                    <h3 className="font-semibold text-text-primary mb-2">시나리오 B: 6월 2일 잔금</h3>
                    <ul className="space-y-1.5 text-sm text-text-secondary">
                      <li>• 6월 2일 잔금 (6월 1일 이후)</li>
                      <li>• 6월 1일 0시 기준: <strong>매도자가 아직 소유자</strong></li>
                      <li>• 결과: <strong>매도자가 그 해 전체 재산세 부담</strong> (7월·9월 납부)</li>
                      <li>• 매수자의 책임: 취득세 + 다음 해부터 재산세 부담</li>
                    </ul>
                  </div>
                  <div className="rounded-lg border border-border-base bg-bg-raised p-4 text-sm">
                    <strong className="text-text-primary">💡 거래가 5억 일시적2주택 예시</strong>
                    <p className="mt-2 text-text-secondary">
                      • 재산세 추정: 약 100만 원/년 (1세대1주택 특례 미적용 시)<br />
                      • 잔금일 하나 차이로 → 100만 원을 누가 내는가 결정<br />
                      • 동시에 매도자는 양도세까지 부담하므로, 잔금 지연은 매도자에게 매우 불리
                    </p>
                  </div>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">3. 재산세 납부 기한 — 7월·9월 분할</h2>
                <p className="text-text-secondary leading-relaxed">
                  주택분 재산세는 지방세법 §115에 따라 1년을 2회로 나누어 납부합니다. 6월 1일 기준 소유자가 이 두 차례 모두 납부할 책임이 있습니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="sr-only">주택분 재산세 납부 일정</caption>
                    <thead>
                      <tr className="bg-primary-500/10 border border-border-base">
                        <th className="px-3 py-2 text-left">회차</th>
                        <th className="px-3 py-2 text-left">납부 기한</th>
                        <th className="px-3 py-2 text-left">납부액</th>
                      </tr>
                    </thead>
                    <tbody className="text-text-secondary">
                      <tr className="border border-border-base">
                        <td className="px-3 py-2 font-semibold">1차</td>
                        <td className="px-3 py-2">7월 16일 ~ 7월 31일</td>
                        <td className="px-3 py-2">본세의 1/2 (또는 20만 원 이하 시 전액)</td>
                      </tr>
                      <tr className="border border-border-base bg-danger-500/5">
                        <td className="px-3 py-2 font-semibold">2차</td>
                        <td className="px-3 py-2">9월 16일 ~ 9월 30일</td>
                        <td className="px-3 py-2">나머지 1/2 + 도시지역분·교육세</td>
                      </tr>
                      <tr className="border border-border-base">
                        <td className="px-3 py-2 font-semibold">미납 가산금</td>
                        <td className="px-3 py-2">기한 경과 후</td>
                        <td className="px-3 py-2">초과금 3% + 매월 0.75% (최대 60개월)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-sm text-danger-700 dark:text-danger-300 bg-danger-500/5 p-3 rounded-lg mt-3">
                  <strong>⚠️ 주의</strong>: 미납 시 가산금이 누적되므로, 7월 31일, 9월 30일 기한 엄수 필수.
                  거래 시 "잔금 후 재산세 고지서 수령 및 납부 주체"를 계약서에 명확히 기재하세요.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">4. 매매계약서 작성 시 필수 조항</h2>
                <p className="text-text-secondary leading-relaxed">
                  부동산 거래 시 계약서에 다음 항목들을 반드시 명시해야 추후 분쟁을 피할 수 있습니다.
                </p>
                <div className="space-y-3">
                  <div className="rounded-lg border border-border-base bg-bg-raised p-4">
                    <h3 className="font-semibold text-text-primary mb-2">① 잔금일 명시 (가장 중요)</h3>
                    <p className="text-sm text-text-secondary">
                      예: "잔금일: 2026년 5월 25일 오후 2시" — 정확한 날짜·시간 기재.
                      6월 1일 전후로 재산세 부담자가 결정되므로 명확히.
                    </p>
                  </div>
                  <div className="rounded-lg border border-border-base bg-bg-raised p-4">
                    <h3 className="font-semibold text-text-primary mb-2">② 재산세 부담자 명시</h3>
                    <p className="text-sm text-text-secondary">
                      예: "재산세: 매도자 부담 (잔금일: 5월 25일이므로 매도자가 6월 1일 소유자)"
                      또는 "재산세: 매수자 부담 (잔금일: 6월 15일이므로 매수자가 6월 1일 소유자)"
                    </p>
                  </div>
                  <div className="rounded-lg border border-border-base bg-bg-raised p-4">
                    <h3 className="font-semibold text-text-primary mb-2">③ 취득세·양도세 부담자 명시</h3>
                    <p className="text-sm text-text-secondary">
                      • 취득세: 관례상 매수자가 부담 (거래가의 1~3%)<br />
                      • 양도세: 관례상 매도자가 부담 (양도차익의 11~45%)<br />
                      명시하지 않으면 분쟁 위험
                    </p>
                  </div>
                  <div className="rounded-lg border border-border-base bg-bg-raised p-4">
                    <h3 className="font-semibold text-text-primary mb-2">④ 고지서 수령 및 납부 주체 명시</h3>
                    <p className="text-sm text-text-secondary">
                      예: "재산세 고지서 도착 후 매도자 부담자가 7월 16~31일 1차, 9월 16~30일 2차 납부"<br />
                      고지서가 누구에게 발급되는지, 누가 납부 기한을 관리하는지 명확히
                    </p>
                  </div>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">5. 잔금 지연 시 재산세 환급 약정</h2>
                <p className="text-text-secondary leading-relaxed">
                  예측 불가능한 사유(은행 융자 지연, 등기 검사 등)로 잔금이 6월 1일을 넘어가는 경우가 있습니다.
                  이를 대비한 환급 조항을 계약서에 추가하면 분쟁을 줄일 수 있습니다.
                </p>
                <div className="rounded-lg border-l-4 border-l-highlight-500 bg-highlight-500/5 p-4">
                  <p className="text-sm font-semibold text-highlight-700 dark:text-highlight-400 mb-2">
                    💰 추천 조항 예시
                  </p>
                  <p className="text-sm text-text-secondary">
                    "예상 잔금일이 6월 1일을 넘어가는 경우, 매도자가 부담한 재산세 중 매수자 점유분
                    (잔금일부터 연말까지의 월할액)을 최종 정산 시 매수자에게 환급한다."
                  </p>
                  <p className="text-xs text-text-tertiary mt-2">
                    예: 잔금이 6월 15일로 지연 → 매도자가 그 해 전체 재산세 납부 →
                    매수자가 6월 15일부터 12월 31일까지 약 210일분(월할액)을 매도자에게 지급
                  </p>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">6. 1세대1주택 특례와 재산세 부담</h2>
                <p className="text-text-secondary leading-relaxed">
                  6월 1일 기준 소유자가 1세대1주택 조건을 만족하면 재산세 세율이 약 절반으로 낮아집니다.
                  이 조건을 언제 충족하는지가 중요합니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 text-sm">
                  <h3 className="font-semibold text-text-primary mb-2">1세대1주택 특례 조건 (6월 1일 기준)</h3>
                  <ul className="space-y-1.5 text-text-secondary">
                    <li>• 세대원 전원이 1주택만 소유</li>
                    <li>• 공시가격 9억 원 이하</li>
                    <li>• 주택(분양권·미등기 건물 포함)</li>
                  </ul>
                  <p className="mt-3 text-text-tertiary border-t border-border-base pt-2">
                    💡 거래 시나리오: 첫 주택을 5월 15일에 계약하고 6월 20일에 잔금받으면,
                    6월 1일 현재 매도자가 여전히 소유자이므로 매도자가 1세대1주택 특례를 적용받습니다.
                    매수자는 그 다음해(2027년)부터 적용받을 수 있습니다.
                  </p>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">7. 양도세와 재산세 동시 고려</h2>
                <p className="text-text-secondary leading-relaxed">
                  매도자 입장에서는 양도세(거래 이익에 부과)와 재산세(6월 1일 기준 부담)를 함께 고려해야 합니다.
                  특히 잔금 지연으로 인해 재산세까지 부담하면 총 세액이 크게 증가합니다.
                </p>
                <div className="bg-bg-raised p-4 rounded-lg text-sm">
                  <strong className="text-text-primary">📊 공시 5억 아파트 매도 시나리오 비교</strong>
                  <ul className="mt-3 space-y-2 text-text-secondary">
                    <li>
                      <strong>A. 5월 30일 잔금</strong><br />
                      양도세: 약 500만 원 (거래 이익 가정) | 재산세: 0원 (매수자가 6월 1일 소유자)<br />
                      <strong>총 세액: 약 500만 원</strong>
                    </li>
                    <li>
                      <strong>B. 6월 15일 잔금</strong><br />
                      양도세: 약 500만 원 | 재산세: 약 100만 원 (예상)<br />
                      <strong>총 세액: 약 600만 원</strong>
                    </li>
                  </ul>
                  <p className="mt-2 text-text-tertiary">
                    → 잔금을 6월 이후로 지연하면 매도자 세부담 100만 원 증가.
                    거래 계약 시 "5월 중 잔금" 협상이 매도자에게 유리합니다.
                  </p>
                </div>
              </section>

              <AdSlot slot="guide-property-tax-base-date-mid" format="rectangle" />

              <FaqSection items={[...FAQ_ITEMS]} />

              <section className="card">
                <h2 className="mb-3 text-lg font-semibold">관련 계산기·가이드</h2>
                <ul className="space-y-2 text-sm">
                  <li>
                    →{' '}
                    <Link href="/calculator/property-tax/" className="text-primary-600 underline dark:text-primary-500">
                      재산세 계산기
                    </Link>
                    {' — 본인 공시가격으로 즉시 시뮬레이션'}
                  </li>
                  <li>
                    →{' '}
                    <Link href="/guide/june-property-tax/" className="text-primary-600 underline dark:text-primary-500">
                      재산세 완벽 가이드 2026
                    </Link>
                    {' — 세율·공제·납부 방법 전체'}
                  </li>
                  <li>
                    →{' '}
                    <Link href="/calculator/acquisition-tax/" className="text-primary-600 underline dark:text-primary-500">
                      취득세 계산기
                    </Link>
                    {' — 매수자의 취득세 부담 계산'}
                  </li>
                  <li>
                    →{' '}
                    <Link href="/calculator/capital-gains-tax/" className="text-primary-600 underline dark:text-primary-500">
                      양도소득세 계산기
                    </Link>
                    {' — 매도자의 양도세 부담 계산'}
                  </li>
                  <li>
                    →{' '}
                    <Link href="/guide/property-tax-timing-2020-after-acquisition-tax/" className="text-primary-600 underline dark:text-primary-500">
                      부동산 거래 시 세금 정산 가이드
                    </Link>
                  </li>
                  <li>
                    →{' '}
                    <Link href="/guide/tax-calendar-2026/" className="text-primary-600 underline dark:text-primary-500">
                      2026년 세금 달력 — 월별 신고·납부 일정
                    </Link>
                  </li>
                </ul>
              </section>

              <ShareButtons
                title="재산세 과세기준일 6월 1일 — 잔금 타이밍과 부담자"
                url={URL}
                description="지방세법 §114: 6월 1일 현재 소유자가 그 해 전체 재산세 부담. 5월 31일 vs 6월 2일 잔금으로 누가 내는가 결정."
              />

              <section
                aria-label="출처 및 면책"
                className="rounded-lg border border-border-base p-4 text-caption text-text-tertiary"
              >
                <p className="mb-2">
                  <strong>법적 근거</strong>: 지방세법 §114(과세기준일), §115(납부 기한) ·{' '}
                  <a
                    href="https://www.wetax.go.kr"
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="text-primary-600 underline dark:text-primary-500"
                  >
                    위택스(wetax.go.kr)
                  </a>{' '}
                  ·{' '}
                  <a
                    href="https://www.molit.go.kr"
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="text-primary-600 underline dark:text-primary-500"
                  >
                    국토교통부 실거래가 공시
                  </a>
                  .
                </p>
                <p className="mb-2">
                  <strong>면책조항</strong>: 본 가이드는 일반 정보 제공 목적이며, 개별 거래 상황(상속·증여 직후, 부부 공동명의, 조정지역 등)에 따라
                  적용이 다를 수 있습니다. 매매계약 작성 시 변호사·공인중개사·세무사와 상담 후 계약서를 작성하시기 바랍니다.
                  본 콘텐츠는 AI 보조 작성 후 운영자 검수를 거쳤습니다.
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
