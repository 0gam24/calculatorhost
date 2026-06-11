import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { Footer } from '@/components/layout/Footer';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { AdSlot } from '@/components/ads/AdSlot';
import { FaqSection } from '@/components/calculator/FaqSection';
import { ShareButtons } from '@/components/calculator/ShareButtons';
import { RateBarChart } from '@/components/charts/RateBarChart';
import {
  buildBreadcrumbJsonLd,
  buildArticleJsonLd,
  buildWebPageJsonLd,
  buildFaqPageJsonLd,
  buildSpeakableJsonLd,
} from '@/lib/seo/jsonld';

const URL = 'https://calculatorhost.com/guide/health-insurance-premium-2026/';
const DATE_PUBLISHED = '2026-06-11';
const DATE_MODIFIED = '2026-06-11';

export const metadata: Metadata = {
  title: '건강보험료 2026 — 요율 7.19%·피부양자 자격·지역가입자',
  description:
    '2026년 건강보험료율 7.09%→7.19%, 장기요양보험료율 12.95%→13.14%로 인상. 직장가입자 보험료 계산(근로자 3.595%), 피부양자 자격(소득 2,000만원·재산 과표 9억), 지역가입자 산정까지 1차출처로 정리했습니다.',
  keywords: [
    '건강보험료',
    '건강보험료 2026',
    '건강보험료율',
    '건강보험 피부양자 자격',
    '피부양자 소득기준',
    '장기요양보험료율',
    '지역가입자 건강보험료',
    '직장가입자 건강보험료',
    '4대보험',
    '국민건강보험법 73조',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '건강보험료 2026 — 요율 7.19%·피부양자 자격·지역가입자' }],
    title: '건강보험료 2026 — 요율 7.19%·피부양자 자격·지역가입자',
    description:
      '2026년 건강보험료율 7.19%·장기요양 13.14%. 직장·지역가입자 보험료, 피부양자 자격(소득 2천만·재산 과표 9억) 정리.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '건강보험료 2026 — 요율 7.19%·피부양자 자격',
    description: '직장·지역가입자 보험료, 피부양자 소득·재산 요건 완정리.',
    images: ['/og-default.png'],
  },
};

const FAQ_ITEMS = [
  {
    question: '2026년 건강보험료율은 얼마인가요?',
    answer:
      '직장가입자 건강보험료율은 7.19%입니다. 2025년 7.09%에서 0.1%포인트(1.48%) 올랐습니다. 직장가입자는 회사와 절반씩 부담하므로 근로자 본인 부담은 보수월액의 3.595%입니다. 여기에 장기요양보험료(건강보험료의 13.14%)가 더해집니다.',
  },
  {
    question: '건강보험 피부양자가 되려면 소득이 얼마 이하여야 하나요?',
    answer:
      '연간 합산소득이 2,000만원 이하여야 합니다. 근로·이자·배당·연금·기타소득을 모두 합산한 금액 기준입니다(국민건강보험법 시행규칙 §2). 사업소득은 사업자등록이 없으면 연 500만원 이하, 등록이 있으면 원칙적으로 0원이어야 하며, 과세 대상 주택임대소득이 있으면 피부양자에서 제외됩니다.',
  },
  {
    question: '피부양자 재산 기준은 어떻게 되나요?',
    answer:
      '재산세 과세표준 9억원이 핵심 기준입니다. 과세표준이 9억원을 초과하면 소득과 무관하게 즉시 탈락합니다. 5억 4천만원 초과~9억원 이하인 경우에는 연간 소득이 1,000만원 이하여야 피부양자 자격이 유지됩니다. 실거래가나 공시가격이 아니라 재산세 과세표준 기준이라는 점에 유의하세요.',
  },
  {
    question: '직장을 그만두면 건강보험료는 어떻게 되나요?',
    answer:
      '퇴직하면 지역가입자로 전환되거나, 요건을 충족하면 가족의 피부양자로 등록할 수 있습니다. 소득·재산이 많으면 지역가입자 보험료가 직장 때보다 오를 수 있는데, 이때 임의계속가입(최대 36개월) 제도를 신청하면 퇴직 전 직장 보험료 수준으로 낼 수 있습니다. 퇴직일로부터 일정 기한 내 신청해야 합니다.',
  },
  {
    question: '지역가입자 건강보험료는 어떻게 산정되나요?',
    answer:
      '소득과 재산을 점수로 환산해 부과점수에 점수당 금액을 곱해 산정합니다(국민건강보험법 §72). 직장가입자처럼 회사가 절반을 내주지 않고 전액 본인이 부담합니다. 소득(사업·이자·배당·연금 등)과 재산(주택·토지·전월세 보증금 등)이 모두 반영되므로, 같은 소득이라도 재산에 따라 보험료가 크게 달라집니다.',
  },
  {
    question: '건강보험료를 줄일 수 있는 방법이 있나요?',
    answer:
      '피부양자 등록, 임의계속가입, 소득·재산 시점 관리가 대표적입니다. 소득이 적은 은퇴자는 가족 피부양자 등록으로 보험료를 0원으로 만들 수 있고, 퇴직 직후에는 임의계속가입으로 부담을 낮출 수 있습니다. 다만 피부양자는 소득 2,000만원·재산 과표 9억 요건을 매년 11월 정기심사에서 확인하므로 기준 초과 여부를 미리 점검해야 합니다.',
  },
] as const;

export default function HealthInsurancePremium2026() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '건강보험료 2026 — 요율·피부양자·지역가입자' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '건강보험료 2026 — 요율 7.19%·피부양자 자격·지역가입자',
    description:
      '2026년 건강보험료율 7.19%·장기요양 13.14% 인상. 직장가입자 보험료, 피부양자 자격(소득 2,000만원·재산 과표 9억), 지역가입자 산정을 정리했습니다.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['건강보험료', '건강보험료율', '피부양자 자격', '장기요양보험료율', '지역가입자'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '건강보험료 2026 — 요율·피부양자·지역가입자',
    description:
      '2026년 건강보험료율 7.19%·장기요양 13.14%. 직장·지역가입자 보험료, 피부양자 소득·재산 요건.',
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
                    { name: '건강보험료 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">근로 · 10분 읽기 · 2026-06-11</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  건강보험료 2026
                  <br />
                  <span className="text-2xl text-text-secondary">— 요율 7.19%·피부양자 자격·지역가입자</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  2026년 건강보험료율이 7.09%에서 <strong>7.19%</strong>로, 장기요양보험료율도 건강보험료의 12.95%에서 <strong>13.14%</strong>로 올랐습니다.
                  직장가입자는 얼마를 떼이는지, 가족의 피부양자가 되려면 소득·재산이 얼마 이하여야 하는지, 지역가입자 보험료는 어떻게 정해지는지 —
                  국민건강보험공단·보건복지부 공식 기준으로 정확히 정리했습니다.
                </p>
              </header>

              <AdSlot slot="guide-health-insurance-premium-top" format="horizontal" />

              <section aria-label="핵심 요약" className="card border-l-4 border-l-primary-500">
                <h2 className="mb-2 text-caption uppercase tracking-wider text-primary-500">핵심 요약</h2>
                <div className="space-y-3 text-sm" data-speakable>
                  <table className="w-full border-collapse text-sm">
                    <caption className="mb-2 font-semibold text-text-primary">2026년 건강보험료 주요 정보</caption>
                    <thead>
                      <tr className="bg-primary-500/10">
                        <th scope="col" className="border border-border-base px-2 py-2 text-left">항목</th>
                        <th scope="col" className="border border-border-base px-2 py-2 text-left">내용</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="bg-primary-500/5">
                        <td className="border border-border-base px-2 py-1 font-semibold">2026 건강보험료율</td>
                        <td className="border border-border-base px-2 py-1 font-bold text-primary-600 dark:text-primary-400">
                          7.19% (2025년 7.09% → 근로자 부담 3.595%)
                        </td>
                      </tr>
                      <tr className="bg-primary-500/5">
                        <td className="border border-border-base px-2 py-1 font-semibold">장기요양보험료율</td>
                        <td className="border border-border-base px-2 py-1 font-bold text-primary-600 dark:text-primary-400">
                          건강보험료의 13.14% (2025년 12.95%)
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-border-base px-2 py-1 font-semibold">피부양자 소득요건</td>
                        <td className="border border-border-base px-2 py-1">연 합산소득 2,000만원 이하</td>
                      </tr>
                      <tr>
                        <td className="border border-border-base px-2 py-1 font-semibold">피부양자 재산요건</td>
                        <td className="border border-border-base px-2 py-1">재산세 과세표준 9억원 초과 시 탈락</td>
                      </tr>
                      <tr>
                        <td className="border border-border-base px-2 py-1 font-semibold">지역가입자</td>
                        <td className="border border-border-base px-2 py-1">소득+재산 부과점수로 산정(전액 본인 부담)</td>
                      </tr>
                      <tr>
                        <td className="border border-border-base px-2 py-1 font-semibold">시행</td>
                        <td className="border border-border-base px-2 py-1">2026년 1월 1일</td>
                      </tr>
                      <tr>
                        <td className="border border-border-base px-2 py-1 font-semibold">법적 근거</td>
                        <td className="border border-border-base px-2 py-1">국민건강보험법 §69·§72·§73, 시행규칙 §2</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">1. 2026년 무엇이 바뀌나? — 요율 인상</h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  2026년 건강보험료율은 7.19%로 올랐습니다(국민건강보험법 §73).
                  2025년 7.09%에서 0.1%포인트, 비율로는 1.48% 인상으로, 6년 만의 인상 흐름이 이어졌습니다.
                  장기요양보험료율도 건강보험료의 12.95%에서 <strong>13.14%</strong>(보수월액 기준 0.9448%)로 올랐습니다(노인장기요양보험법 §9).
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-3 font-semibold text-text-primary">건강보험·장기요양 요율 (2025 vs 2026)</caption>
                    <thead>
                      <tr className="bg-primary-500/10 border border-border-base">
                        <th scope="col" className="px-3 py-2 text-left">구분</th>
                        <th scope="col" className="px-3 py-2 text-left">2025년</th>
                        <th scope="col" className="px-3 py-2 text-left">2026년</th>
                      </tr>
                    </thead>
                    <tbody className="text-text-secondary">
                      <tr className="border border-border-base">
                        <td className="px-3 py-2 font-semibold">건강보험료율(직장)</td>
                        <td className="px-3 py-2">7.09%</td>
                        <td className="px-3 py-2 font-bold text-primary-600 dark:text-primary-400">7.19%</td>
                      </tr>
                      <tr className="border border-border-base">
                        <td className="px-3 py-2 font-semibold">근로자 본인 부담</td>
                        <td className="px-3 py-2">3.545%</td>
                        <td className="px-3 py-2 font-bold text-primary-600 dark:text-primary-400">3.595%</td>
                      </tr>
                      <tr className="border border-border-base bg-primary-500/5">
                        <td className="px-3 py-2 font-semibold">장기요양(건보료 대비)</td>
                        <td className="px-3 py-2">12.95%</td>
                        <td className="px-3 py-2 font-bold text-primary-600 dark:text-primary-400">13.14%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">2. 직장가입자는 얼마를 내나? — 보수의 3.595% + 장기요양</h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  직장가입자 건강보험료는 보수월액에 7.19%를 곱한 뒤 회사와 절반씩 나눕니다(국민건강보험법 §69).
                  따라서 근로자 본인 부담은 보수월액의 <strong>3.595%</strong>이고, 여기에 장기요양보험료(건강보험료의 13.14%)의 절반이 더해집니다.
                  비과세 식대 등은 보수월액 산정에서 제외됩니다.
                </p>

                <RateBarChart
                  title="직장인 4대보험 근로자 부담률 (2026)"
                  caption="월 보수에서 국민연금 4.5%, 건강보험 3.595%(2026년 7.19%의 절반), 장기요양보험(건강보험료의 13.14% ≈ 보수의 0.47%), 고용보험 0.9%가 공제됩니다. 2026년 건강보험료율이 7.09%에서 7.19%로 올라 부담이 소폭 늘었습니다."
                  unit="%"
                  max={5}
                  bars={[
                    { label: '국민연금', value: 4.5, display: '4.5%' },
                    { label: '건강보험', value: 3.595, display: '3.595%', highlight: true },
                    { label: '장기요양', value: 0.47, display: '≈0.47%' },
                    { label: '고용보험', value: 0.9, display: '0.9%' },
                  ]}
                />

                <div className="rounded-lg border border-border-base bg-bg-raised p-4">
                  <p className="text-sm text-text-secondary">
                    <strong>💡 예시:</strong> 월 보수 300만원이면 건강보험료 본인 부담은 약 107,850원(300만 × 3.595%),
                    장기요양은 그 13.14%의 절반인 약 7,000원대가 추가됩니다. 회사도 같은 금액을 함께 부담합니다.
                  </p>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">3. 피부양자가 되려면? — 소득 2,000만·재산 과표 9억</h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  소득과 재산 요건을 모두 충족해야 합니다(국민건강보험법 §5, 시행규칙 §2).
                  소득은 근로·이자·배당·연금·기타소득을 합산해 연 2,000만원 이하여야 하고, 사업소득은 사업자등록이 없으면 연 500만원 이하, 등록이 있으면 원칙적으로 0원이어야 합니다.
                  과세 대상 주택임대소득이 있으면 피부양자에서 제외됩니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-3 font-semibold text-text-primary">피부양자 재산 기준 (재산세 과세표준)</caption>
                    <thead>
                      <tr className="bg-primary-500/10 border border-border-base">
                        <th scope="col" className="px-3 py-2 text-left">과세표준</th>
                        <th scope="col" className="px-3 py-2 text-left">피부양자 자격</th>
                      </tr>
                    </thead>
                    <tbody className="text-text-secondary">
                      <tr className="border border-border-base">
                        <td className="px-3 py-2 font-semibold">5.4억원 이하</td>
                        <td className="px-3 py-2">유지(소득요건만 충족하면 OK)</td>
                      </tr>
                      <tr className="border border-border-base">
                        <td className="px-3 py-2 font-semibold">5.4억 초과 ~ 9억 이하</td>
                        <td className="px-3 py-2">연소득 1,000만원 이하일 때만 유지</td>
                      </tr>
                      <tr className="border border-border-base bg-danger-500/5">
                        <td className="px-3 py-2 font-semibold">9억원 초과</td>
                        <td className="px-3 py-2 font-bold text-danger-600 dark:text-danger-400">소득 무관 즉시 탈락</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="rounded-lg border-l-2 border-l-danger-500 bg-danger-500/5 p-4">
                  <p className="text-sm text-danger-700 dark:text-danger-300">
                    <strong>⚠️ 주의:</strong> 재산 기준은 실거래가·공시가격이 아니라 <strong>재산세 과세표준</strong>입니다(공시가격 × 공정시장가액비율).
                    또 피부양자 자격은 매년 11월 정기심사에서 소득·재산을 재확인하므로, 기준을 살짝 넘으면 지역가입자로 전환되어 보험료가 새로 부과됩니다.
                  </p>
                </div>
              </section>

              <AdSlot slot="guide-health-insurance-premium-mid" format="rectangle" />

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">4. 지역가입자는 어떻게 산정되나? — 소득+재산 점수</h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  지역가입자는 소득과 재산을 점수로 환산한 부과점수에 점수당 금액을 곱해 보험료를 매깁니다(국민건강보험법 §72).
                  직장가입자처럼 회사가 절반을 내주지 않고 <strong>전액 본인이 부담</strong>합니다.
                  소득(사업·이자·배당·연금 등)뿐 아니라 주택·토지·전월세 보증금 같은 재산도 반영되므로, 같은 소득이라도 재산에 따라 보험료 차이가 큽니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <h3 className="font-semibold text-text-primary mb-2">퇴직 후 보험료가 걱정된다면 — 임의계속가입</h3>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    직장에서 퇴직하면 지역가입자로 전환되어 보험료가 오를 수 있습니다.
                    이때 <strong>임의계속가입</strong>을 신청하면 최대 36개월 동안 퇴직 전 직장가입자 수준의 보험료로 낼 수 있습니다.
                    퇴직일 다음 날부터 일정 기한 내에 공단에 신청해야 하므로 퇴직 전 미리 확인하세요.
                  </p>
                </div>
              </section>

              <FaqSection items={[...FAQ_ITEMS]} />

              <section className="card">
                <h2 className="mb-3 text-lg font-semibold">관련 가이드</h2>
                <ul className="space-y-2 text-sm">
                  <li>
                    →{' '}
                    <Link href="/guide/national-pension-2026/" className="text-primary-600 underline dark:text-primary-500">
                      국민연금 2026 — 보험료율·수령나이
                    </Link>
                    {' — 건강보험과 함께 오른 4대보험 보험료'}
                  </li>
                  <li>
                    →{' '}
                    <Link href="/guide/n-jobber-insurance-dependent-disqualification/" className="text-primary-600 underline dark:text-primary-500">
                      N잡러 건강보험 피부양자 탈락
                    </Link>
                    {' — 부수입이 생기면 피부양자에서 빠지는 기준'}
                  </li>
                  <li>
                    →{' '}
                    <Link href="/calculator/salary/" className="text-primary-600 underline dark:text-primary-500">
                      연봉 실수령액 계산기
                    </Link>
                    {' — 건강보험 등 4대보험 공제 후 세후 월급'}
                  </li>
                  <li>
                    →{' '}
                    <Link href="/guide/basic-pension-2026/" className="text-primary-600 underline dark:text-primary-500">
                      기초연금 2026
                    </Link>
                    {' — 은퇴 후 소득·재산 기준이 함께 걸리는 제도'}
                  </li>
                  <li>
                    →{' '}
                    <Link href="/category/work/" className="text-primary-600 underline dark:text-primary-500">
                      근로 계산기·가이드
                    </Link>
                    {' — 연봉·퇴직금·4대보험 등 직장인 필수 도구'}
                  </li>
                </ul>
              </section>

              <ShareButtons
                title="건강보험료 2026 — 요율 7.19%·피부양자 자격·지역가입자"
                url={URL}
                description="2026년 건강보험료율 7.19%·장기요양 13.14%. 직장·지역가입자 보험료, 피부양자 소득(2천만)·재산(과표 9억) 요건 정리."
              />

              <section
                aria-label="출처 및 면책"
                className="rounded-lg border border-border-base p-4 text-caption text-text-tertiary"
              >
                <p className="mb-2">
                  <strong>법적 근거</strong>: 국민건강보험법 §5(피부양자)·§69(보험료)·§72(보험료부과점수)·§73(보험료율)·시행규칙 §2(피부양자 자격 인정기준) · 노인장기요양보험법 §9 ·{' '}
                  <a
                    href="https://www.nhis.or.kr"
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="text-primary-600 underline dark:text-primary-500"
                  >
                    국민건강보험공단 (nhis.or.kr)
                  </a>{' '}
                  ·{' '}
                  <a
                    href="https://www.mohw.go.kr"
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="text-primary-600 underline dark:text-primary-500"
                  >
                    보건복지부 (mohw.go.kr)
                  </a>{' '}
                  ·{' '}
                  <a
                    href="https://www.law.go.kr"
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="text-primary-600 underline dark:text-primary-500"
                  >
                    국가법령정보센터 (law.go.kr)
                  </a>{' '}
                  .
                </p>
                <p className="mb-2">
                  <strong>면책조항</strong>: 본 가이드는 2026년 6월 11일 기준 보건복지부·국민건강보험공단이 공시한 2026년 보험료율과 피부양자 자격 기준을 바탕으로 작성되었습니다.
                  보험료율·피부양자 소득·재산 기준은 법령·고시 개정에 따라 달라질 수 있습니다.
                  본인의 정확한 보험료와 피부양자 자격은 국민건강보험공단(nhis.or.kr) 모의계산 또는 고객센터(1577-1000)에서 확인하시기 바랍니다.
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
