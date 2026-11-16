import type { Metadata } from 'next';
import { GuideCalculatorCta } from '@/components/guide/GuideCalculatorCta';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { Footer } from '@/components/layout/Footer';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { FaqSection } from '@/components/calculator/FaqSection';
import { ShareButtons } from '@/components/calculator/ShareButtons';
import {
  buildBreadcrumbJsonLd,
  buildArticleJsonLd,
  buildWebPageJsonLd,
  buildFaqPageJsonLd,
  buildSpeakableJsonLd,
} from '@/lib/seo/jsonld';

const URL = 'https://calculatorhost.com/guide/comprehensive-real-estate-tax-who-pays-2026/';
const DATE_PUBLISHED = '2026-06-02';
const DATE_MODIFIED = '2026-11-16';

export const metadata: Metadata = {
  title: '종합부동산세 2026, 누가 내나, 12억 공제, 과세기준일 6월 1일',
  description:
    '종합부동산세는 6월 1일 소유자에게 부과되며, 1주택자는 공시가 12억원, 다주택자는 9억원까지 공제됩니다. 세율과 사례를 정리했습니다.',
  keywords: [
    '종합부동산세',
    '종부세 2026',
    '종부세 12억 공제',
    '과세기준일 6월 1일',
    '1주택 종합부동산세',
    '종합부동산세법',
    '다주택 종부세',
    '종부세 세율',
    '12월 납부',
  ],
  alternates: { canonical: URL },
  openGraph: {
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
  },
};

const FAQ_ITEMS = [
  {
    question: '종합부동산세는 언제 납부하나요?',
    answer:
      '종합부동산세는 매년 12월 1일부터 12월 15일까지 납부합니다(종합부동산세법 §16). 재산세(7월·9월)와는 별개로 12월에만 납부하므로 혼동하지 않도록 주의하세요. 국세라서 홈택스·손택스, 은행·우체국 창구, 신용카드로 납부합니다.',
  },
  {
    question: '과세기준일이 6월 1일이라는 게 무슨 뜻인가요?',
    answer:
      '과세기준일은 종부세 납세의무 판정 시점입니다(종합부동산세법 §3). 2026년 6월 1일 현재 부동산을 소유한 자가 납세의무자입니다. 5월 31일에 판 사람은 내지 않고, 6월 2일에 산 사람도 2026년 종부세는 내지 않습니다(6월 1일 소유자인 매도인이 냅니다). 과세기준일 전후에 거래한다면 잔금일을 기준으로 누가 내는지 확인하세요.',
  },
  {
    question: '1주택자는 몇 억까지 세금을 안 내나요?',
    answer:
      '1세대1주택자는 공시가 합계 12억 원까지 기본공제가 적용됩니다(종합부동산세법 §8①). 공시가가 12억 이하면 과세표준이 0원이 되어 종부세가 부과되지 않습니다. 12억을 초과하면 초과분만 과세 대상이 됩니다. 단, 고령자·장기보유공제를 받으려면 추가 요건이 필요합니다.',
  },
  {
    question: '2주택자는 공제가 얼마인가요?',
    answer:
      '2주택자(다주택)는 1주택 12억이 아닌 9억 원의 기본공제가 적용됩니다(종합부동산세법 §8①). 2채의 공시가 합계에서 9억을 차감한 후 60% 공정시장가액비율을 곱해 과세표준을 구합니다. 또한 2주택은 일반 세율 0.5~2.7%가 적용됩니다.',
  },
  {
    question: '3주택 이상이면 세금이 훨씬 많이 부과되나요?',
    answer:
      '예. 3주택 이상은 2가지 불리함이 있습니다. 첫째, 기본공제가 9억 원으로 동일하지만, 둘째 과세표준 12억 원을 넘는 구간의 세율이 일반세율(1.3~2.7%)이 아닌 중과세율(2.0~5.0%)로 올라갑니다(종합부동산세법 §9①2호). 12억 원 이하 구간은 2주택 이하와 같습니다. 예를 들어 과세표준 12억을 초과하면 일반세율은 1.3% 구간이지만 3주택 이상은 2.0% 중과 구간이 적용되어 세액이 크게 높아집니다. 구간별 누진공제가 차감되므로 정확한 세액은 종합부동산세 계산기에서 확인하세요.',
  },
  {
    question: '종부세와 재산세는 중복해서 내나요?',
    answer:
      '네, 둘 다 냅니다. 다만 서로 다른 목적의 세금입니다. 재산세(지방세법 §111 기준)는 7월·9월에 공시가 기준으로 납부하고, 종부세(종합부동산세법 §8)는 12월에 공정시장가액비율(60%)을 적용한 과세표준으로 납부합니다. 이중과세를 막기 위해 종부세 산출세액에서 같은 과세표준에 매긴 재산세 상당액(공제할 재산세액, 종합부동산세법 §9③)을 빼 주는 제도가 있습니다.',
  },
  {
    question: '공정시장가액비율 60%는 뭔가요?',
    answer:
      '공정시장가액비율은 과세표준을 구할 때 공제금액을 뺀 공시가격에 곱하는 비율입니다(종합부동산세법 §8①). 2026년 기준 60%이므로, 1세대1주택 공시가 15억이면 (15억 − 12억) × 60% = 1.8억이 과세표준입니다. 법은 60~100% 범위에서 시행령으로 정하도록 하고 있어 비율은 바뀔 수 있습니다.',
  },
  {
    question: '1주택자도 고령자 공제나 장기보유 공제를 받을 수 있나요?',
    answer:
      '네. 1세대1주택자이면서 추가 요건을 충족하면 가능합니다(종합부동산세법 §9). 고령자공제는 60세 이상(60~64세 20%, 65~69세 30%, 70세 이상 40%)이고, 장기보유공제는 5년 이상 보유(5~10년 20%, 10~15년 40%, 15년 이상 50%)해야 합니다. 두 공제를 합산해도 최대 80%입니다.',
  },
  {
    question: '종부세를 절세하는 방법이 있나요?',
    answer:
      '주요 절세법은 다음과 같습니다. ① 1주택자: 60세 이상이거나 15년 이상 보유하면 공제율이 높습니다. ② 합산배제·특례 신청: 등록 임대주택은 합산배제, 일시적 2주택·상속주택은 1세대1주택 특례를 신청할 수 있습니다(9월 16~30일). ③ 다주택 1주택으로 변경: 세금 납부 후 초과 부동산을 양도하면 향후 세액 경감. ④ 전문가 상담: 개별 상황에 따라 세무사와 검토하세요.',
  },
] as const;

export default function ComprehensiveRealEstateTaxWhoPays2026() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '종부세 납세의무자 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '종합부동산세 2026, 누가 내나, 12억 공제, 과세기준일 6월 1일',
    description:
      '종합부동산세 완벽 해설. 1주택 12억/다주택 9억 공제, 6월 1일 과세기준일. 공시가, 공정시장가액비율 60%, 세율표(0.5~5%), 12월 납부, 절세 전략.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['종합부동산세', '종부세 2026', '12억 공제', '과세기준일'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '종합부동산세 2026, 누가 내나, 12억 공제, 과세기준일 6월 1일',
    description:
      '2026년 종합부동산세 가이드. 1주택 12억, 다주택 9억 공제, 6월 1일 과세기준일, 공정시장가액비율 60%, 세율 0.5~5%, 12월 납부.',
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
                    { name: '종부세 납세의무자 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">세금·부동산 · 10분 읽기 · 2026-11-16</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  종합부동산세(종부세) 2026
                  <br />
                  <span className="text-2xl text-text-secondary">· 누가 내나, 12억 공제, 과세기준일</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  종합부동산세(종부세)는 다주택 소유자나 일정 규모 이상의 부동산을 보유한 자가 내는 세금입니다.
                  2026년 과세기준일은 6월 1일이며, 1주택자는 공시가 12억 원까지 기본공제를 받습니다.
                  공정시장가액비율 60%를 적용하여 과세표준을 계산하고, 세율은 보유 주택 수에 따라 0.5~5%가 적용됩니다.
                  12월에 납부하는 이 세금을 완벽히 이해하는 방법을 설명합니다.
                </p>
              </header>
              <GuideCalculatorCta slug="comprehensive-real-estate-tax-who-pays-2026" />

              <section aria-label="핵심 요약" className="card border-l-4 border-l-primary-500">
                <h2 className="mb-2 text-caption uppercase tracking-wider text-primary-500">핵심 요약</h2>
                <div className="space-y-3 text-sm" data-speakable>
                  <table className="w-full border-collapse text-sm">
                    <caption className="mb-2 font-semibold text-text-primary">2026년 종합부동산세 개요</caption>
                    <thead>
                      <tr className="bg-primary-500/10">
                        <th scope="col" className="border border-border-base px-2 py-2 text-left">항목</th>
                        <th scope="col" className="border border-border-base px-2 py-2 text-left">내용</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-border-base px-2 py-1 font-semibold">과세기준일</td>
                        <td className="border border-border-base px-2 py-1">6월 1일 현재 소유자(종합부동산세법 §3)</td>
                      </tr>
                      <tr>
                        <td className="border border-border-base px-2 py-1 font-semibold">1주택 공제</td>
                        <td className="border border-border-base px-2 py-1">12억 원(종합부동산세법 §8①)</td>
                      </tr>
                      <tr>
                        <td className="border border-border-base px-2 py-1 font-semibold">다주택 공제</td>
                        <td className="border border-border-base px-2 py-1">9억 원(2주택 이상)</td>
                      </tr>
                      <tr>
                        <td className="border border-border-base px-2 py-1 font-semibold">공정시장가액비율</td>
                        <td className="border border-border-base px-2 py-1">60%(과세표준 = (공시가 합계 − 공제) × 60%)</td>
                      </tr>
                      <tr>
                        <td className="border border-border-base px-2 py-1 font-semibold">세율(1-2주택)</td>
                        <td className="border border-border-base px-2 py-1">0.5~2.7% (누진 구조)</td>
                      </tr>
                      <tr>
                        <td className="border border-border-base px-2 py-1 font-semibold">세율(3주택↑)</td>
                        <td className="border border-border-base px-2 py-1">0.5~5.0% (과세표준 12억 초과분 중과)</td>
                      </tr>
                      <tr className="bg-primary-500/5">
                        <td className="border border-border-base px-2 py-1 font-semibold">납부 시기</td>
                        <td className="border border-border-base px-2 py-1">12월 1일~15일(종합부동산세법 §16)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">1. 종합부동산세(종부세)란? 재산세와의 차이</h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  종합부동산세(종부세)와 재산세는 서로 다른 세금입니다.
                  재산세는 모든 부동산 소유자가 공시가 기준으로 매년 7월·9월에 내는 지방세이고,
                  종합부동산세는 다주택자나 일정 규모 이상 부동산을 보유한 특정 납세의무자가 12월에 내는 세금입니다.
                  과세표준 계산 방식과 세율도 크게 다릅니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-3 font-semibold text-text-primary">종합부동산세 vs 재산세</caption>
                    <thead>
                      <tr className="bg-primary-500/10 border border-border-base">
                        <th scope="col" className="px-3 py-2 text-left">구분</th>
                        <th scope="col" className="px-3 py-2 text-left">종합부동산세</th>
                        <th scope="col" className="px-3 py-2 text-left">재산세</th>
                      </tr>
                    </thead>
                    <tbody className="text-text-secondary">
                      <tr className="border border-border-base">
                        <td className="px-3 py-2 font-semibold">과세 대상</td>
                        <td className="px-3 py-2">다주택·일정규모↑ 부동산</td>
                        <td className="px-3 py-2">모든 부동산 소유자</td>
                      </tr>
                      <tr className="border border-border-base">
                        <td className="px-3 py-2 font-semibold">과세기준일</td>
                        <td className="px-3 py-2">6월 1일(종부세법 §3)</td>
                        <td className="px-3 py-2">6월 1일(지방세법 §114)</td>
                      </tr>
                      <tr className="border border-border-base">
                        <td className="px-3 py-2 font-semibold">납부 시기</td>
                        <td className="px-3 py-2">12월 1~15일</td>
                        <td className="px-3 py-2">7월 16~31일, 9월 16~30일</td>
                      </tr>
                      <tr className="border border-border-base">
                        <td className="px-3 py-2 font-semibold">과세표준 계산</td>
                        <td className="px-3 py-2">(공시가 합계 − 공제) × 60%</td>
                        <td className="px-3 py-2">공시가×공정시장가액비율(유동적)</td>
                      </tr>
                      <tr className="border border-border-base">
                        <td className="px-3 py-2 font-semibold">공제</td>
                        <td className="px-3 py-2">1주택 12억, 다주택 9억</td>
                        <td className="px-3 py-2">1주택 9억 이하 특례율</td>
                      </tr>
                      <tr className="border border-border-base">
                        <td className="px-3 py-2 font-semibold">세율</td>
                        <td className="px-3 py-2">0.5~5.0%(주택 수별)</td>
                        <td className="px-3 py-2">0.1~0.4%(누진)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-raised p-4 mt-4">
                  <p className="text-sm text-text-secondary">
                    <strong>주의:</strong> 종부세와 재산세는 둘 다 납부합니다. 다만 같은 집에 겹쳐 매겨지는 부분의 재산세는 종부세 산출세액에서 빼 줍니다(공제할 재산세액, 종합부동산세법 §9③).
                  </p>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">2. 과세기준일, 6월 1일 기준 소유자가 납세의무자</h2>
                <p className="text-text-secondary leading-relaxed">
                  종합부동산세의 납세의무자는 <strong>6월 1일 현재 부동산을 소유하는 자</strong>입니다(종합부동산세법 §3, §7).
                  이를 '과세기준일'이라고 하며, 5월 31일 23:59분에 판 사람은 내지 않고, 6월 2일에 산 사람도 2026년 종부세는 내지 않습니다.
                  6월 1일 당일에 잔금을 치르고 소유권이 넘어갔다면 그날 소유자가 된 매수인이 납세의무자입니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <h3 className="font-semibold text-text-primary mb-3">과세기준일 기준 거래 사례</h3>
                  <div className="space-y-2 text-sm text-text-secondary">
                    <p>
                      <strong>사례 1:</strong> A가 5월 20일에 아파트를 매수했다면? → 6월 1일에 A가 소유자이므로, 2026년 종부세는 A가 냅니다.
                    </p>
                    <p>
                      <strong>사례 2:</strong> B가 6월 10일에 빌라를 매도했다면? → 6월 1일에 여전히 B가 소유자이므로, 2026년 종부세는 B가 냅니다.
                    </p>
                    <p>
                      <strong>사례 3:</strong> C가 6월 1일에 계약만 하고 잔금을 6월 15일에 치렀다면? → 6월 1일에는 아직 매도인이 소유자이므로 2026년 종부세는 매도인이 냅니다. 소유권은 보통 잔금일과 등기접수일 중 빠른 날에 넘어간 것으로 봅니다.
                    </p>
                  </div>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">3. 공제, 1주택은 12억, 다주택은 9억</h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  종합부동산세의 과세표준은 <strong>공시가 합계에서 공제를 차감한 후 공정시장가액비율(60%)을 곱해서</strong> 계산합니다.
                  공제 규모에 따라 세금이 크게 달라지므로, 자신의 주택 수 분류가 매우 중요합니다.
                </p>
                <div className="overflow-x-auto mb-4">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-3 font-semibold text-text-primary">공제 규모 비교 (종합부동산세법 §8①)</caption>
                    <thead>
                      <tr className="bg-primary-500/10 border border-border-base">
                        <th scope="col" className="px-3 py-2 text-left">주택 수 분류</th>
                        <th scope="col" className="px-3 py-2 text-left">기본공제</th>
                        <th scope="col" className="px-3 py-2 text-left">세율</th>
                        <th scope="col" className="px-3 py-2 text-left">특징</th>
                      </tr>
                    </thead>
                    <tbody className="text-text-secondary">
                      <tr className="border border-border-base">
                        <td className="px-3 py-2 font-semibold">1세대1주택</td>
                        <td className="px-3 py-2 font-bold text-primary-600 dark:text-primary-400">12억 원</td>
                        <td className="px-3 py-2">0.5~2.7%</td>
                        <td className="px-3 py-2">고령자·장기보유 공제 가능</td>
                      </tr>
                      <tr className="border border-border-base">
                        <td className="px-3 py-2 font-semibold">2주택</td>
                        <td className="px-3 py-2 font-bold">9억 원</td>
                        <td className="px-3 py-2">0.5~2.7%</td>
                        <td className="px-3 py-2">기본공제 9억, 고령자·장기보유 공제 없음</td>
                      </tr>
                      <tr className="border border-border-base bg-danger-500/5">
                        <td className="px-3 py-2 font-semibold">3주택 이상</td>
                        <td className="px-3 py-2 font-bold">9억 원</td>
                        <td className="px-3 py-2">0.5~5.0% (12억 초과분 중과)</td>
                        <td className="px-3 py-2">중과세율, 고령자·장기보유 공제 없음</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="rounded-lg border border-border-base bg-primary-500/5 p-4">
                  <h3 className="font-semibold text-primary-700 dark:text-primary-400 mb-3">공제 계산 사례</h3>
                  <div className="space-y-3 text-sm text-text-secondary font-mono bg-bg-base p-3 rounded">
                    <p><strong className="text-text-primary">1주택자 (공시가 15억):</strong></p>
                    <p>공시가: 15억</p>
                    <p>- 기본공제: 12억</p>
                    <p>= 초과분: 3억</p>
                    <p>× 공정시장가액비율: 60%</p>
                    <p className="border-t border-border-base pt-2 font-bold text-text-primary">과세표준: 3억 × 60% = 1.8억 원</p>
                    <p className="mt-3"><strong className="text-text-primary">2주택자 (공시가 각각 8억, 7억):</strong></p>
                    <p>공시가 합계: 15억</p>
                    <p>- 기본공제: 9억 (1주택자 12억 X)</p>
                    <p>= 초과분: 6억</p>
                    <p>× 공정시장가액비율: 60%</p>
                    <p className="border-t border-border-base pt-2 font-bold text-text-primary">과세표준: 6억 × 60% = 3.6억 원</p>
                  </div>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">4. 세율, 1-2주택 0.5~2.7%, 3주택 이상 2.0~5.0%</h2>
                <p className="text-text-secondary leading-relaxed">
                  과세표준이 결정되면, 누진세 구조에 따라 세율을 적용합니다(종합부동산세법 §8).
                  1-2주택은 일반 세율, 3주택 이상은 중과세율이 적용되며, 각각 다른 구간을 가집니다.
                </p>
                <div className="overflow-x-auto mb-4">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-3 font-semibold text-text-primary">2026년 종합부동산세 세율표</caption>
                    <thead>
                      <tr className="bg-primary-500/10 border border-border-base">
                        <th scope="col" className="px-3 py-2 text-left">과세표준</th>
                        <th scope="col" className="px-3 py-2 text-left">1-2주택 세율</th>
                        <th scope="col" className="px-3 py-2 text-left">3주택 이상 세율</th>
                      </tr>
                    </thead>
                    <tbody className="text-text-secondary">
                      <tr className="border border-border-base">
                        <td className="px-3 py-2 font-semibold">3억 이하</td>
                        <td className="px-3 py-2">0.5%</td>
                        <td className="px-3 py-2">0.5%</td>
                      </tr>
                      <tr className="border border-border-base">
                        <td className="px-3 py-2 font-semibold">3억 초과 ~ 6억</td>
                        <td className="px-3 py-2">0.7%</td>
                        <td className="px-3 py-2">0.7%</td>
                      </tr>
                      <tr className="border border-border-base">
                        <td className="px-3 py-2 font-semibold">6억 초과 ~ 12억</td>
                        <td className="px-3 py-2">1.0%</td>
                        <td className="px-3 py-2">1.0%</td>
                      </tr>
                      <tr className="border border-border-base">
                        <td className="px-3 py-2 font-semibold">12억 초과 ~ 25억</td>
                        <td className="px-3 py-2">1.3%</td>
                        <td className="px-3 py-2">2.0%</td>
                      </tr>
                      <tr className="border border-border-base">
                        <td className="px-3 py-2 font-semibold">25억 초과 ~ 50억</td>
                        <td className="px-3 py-2">1.5%</td>
                        <td className="px-3 py-2">3.0%</td>
                      </tr>
                      <tr className="border border-border-base">
                        <td className="px-3 py-2 font-semibold">50억 초과 ~ 94억</td>
                        <td className="px-3 py-2">2.0%</td>
                        <td className="px-3 py-2">4.0%</td>
                      </tr>
                      <tr className="border border-border-base bg-danger-500/5">
                        <td className="px-3 py-2 font-semibold">94억 초과</td>
                        <td className="px-3 py-2">2.7%</td>
                        <td className="px-3 py-2">5.0%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <h3 className="font-semibold text-text-primary mb-3">세율 적용 사례</h3>
                  <div className="space-y-3 text-sm text-text-secondary font-mono bg-bg-base p-3 rounded">
                    <p><strong className="text-text-primary">1주택자 (공시 15억 → 과세표준 1.8억):</strong></p>
                    <p>과세표준: (15억 − 12억) × 60% = 1.8억</p>
                    <p>세율 구간: 1.8억 ≤ 3억 → 0.5% 적용</p>
                    <p>산출세액: 1.8억 × 0.5% = 90만 원</p>
                    <p>공제할 재산세액(종합부동산세법 §9③): 1.8억 × 45%(1주택 공정시장가액비율) × 0.4% = 32만 4천 원</p>
                    <p className="border-t border-border-base pt-2 font-bold text-text-primary">종부세(세액공제 전): 90만 − 32만 4천 = 57만 6천 원</p>
                    <p className="mt-3"><strong className="text-text-primary">2주택자 (공시 15억 → 과세표준 3.6억):</strong></p>
                    <p>과세표준: (15억 − 9억) × 60% = 3.6억</p>
                    <p>세율 구간: 3.6억 → 0.7% 적용 (누진공제 60만)</p>
                    <p>산출세액: 3.6억 × 0.7% − 60만 = 252만 − 60만 = 192만 원</p>
                    <p>공제할 재산세액(종합부동산세법 §9③): 3.6억 × 60%(일반 공정시장가액비율) × 0.4% = 86만 4천 원</p>
                    <p className="border-t border-border-base pt-2 font-bold text-text-primary">종부세: 192만 − 86만 4천 = 105만 6천 원</p>
                  </div>
                </div>
                <div className="rounded-lg border-l-2 border-l-danger-500 bg-danger-500/5 p-4 mt-4">
                  <p className="text-sm text-danger-700 dark:text-danger-300">
                    <strong>중요:</strong> 과세표준 3.6억까지는 2주택·3주택 세율이 0.7%로 같지만,
                    과세표준 12억을 초과하면 3주택 이상 중과세율(2.0%~)이 일반세율(1.3%~)보다 훨씬 높아져 세액 격차가 크게 벌어집니다.
                    구간별 누진공제가 차감되므로 정확한 세액은 종합부동산세 계산기에서 확인하세요.
                  </p>
                  <p className="text-sm text-danger-700 dark:text-danger-300 mt-2">
                    <strong>참고:</strong> 위 사례의 공제할 재산세액은 과세표준에 재산세 공정시장가액비율(1세대1주택 43~45%, 일반 60%)과 재산세 세율 0.4%를 곱한 값이며, 재산세 세부담 상한 등 개별 사정에 따라 실제 고지서 수치와 조금 다를 수 있습니다.
                  </p>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">5. 농어촌특별세, 종부세 납부세액의 20%</h2>
                <p className="text-text-secondary leading-relaxed">
                  종부세를 산출한 뒤 추가로 <strong>농어촌특별세</strong>가 부과됩니다.
                  농어촌특별세는 산출세액에서 공제할 재산세액(§9③)과 세액공제(§9⑤)를 뺀 <strong>종부세 납부세액의 20%</strong>이므로, 최종 납부액은 종부세 + 농특세입니다(농어촌특별세법 §5).
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <h3 className="font-semibold text-text-primary mb-3">농특세 계산</h3>
                  <div className="space-y-2 text-sm text-text-secondary font-mono bg-bg-base p-3 rounded">
                    <p><strong className="text-text-primary">공식:</strong></p>
                    <p>종부세 납부세액 = 산출세액 − 공제할 재산세액 − 세액공제</p>
                    <p>농어촌특별세 = 종부세 납부세액 × 20%</p>
                    <p>최종 납부액 = 종부세 납부세액 + 농특세</p>
                    <p className="mt-3"><strong className="text-text-primary">사례 (위 1주택 공시 15억, 세액공제 없음):</strong></p>
                    <p>산출세액: 90만 원</p>
                    <p>공제할 재산세액(종합부동산세법 §9③): 32만 4천 원</p>
                    <p>종부세 납부세액: 90만 − 32만 4천 = 57만 6천 원</p>
                    <p>농특세: 57만 6천 × 20% = 11만 5,200 원</p>
                    <p className="border-t border-border-base pt-2 font-bold text-text-primary">최종 납부액: 57만 6천 + 11만 5,200 = 69만 1,200 원</p>
                  </div>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">6. 1세대1주택자 세액공제, 고령자·장기보유</h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  1세대1주택자라면 <strong>고령자공제</strong>나 <strong>장기보유공제</strong>를 받을 수 있습니다(종합부동산세법 §9).
                  이는 산출세액에서 공제할 재산세액(§9③)을 뺀 금액에 공제율을 곱해 차감해주는 제도로, 최대 80%까지 공제 가능합니다.
                </p>
                <div className="overflow-x-auto mb-4">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-3 font-semibold text-text-primary">1세대1주택 공제율</caption>
                    <thead>
                      <tr className="bg-primary-500/10 border border-border-base">
                        <th scope="col" className="px-3 py-2 text-left">공제 유형</th>
                        <th scope="col" className="px-3 py-2 text-left">조건</th>
                        <th scope="col" className="px-3 py-2 text-left">공제율</th>
                      </tr>
                    </thead>
                    <tbody className="text-text-secondary">
                      <tr className="border border-border-base">
                        <td className="px-3 py-2 font-semibold">고령자공제</td>
                        <td className="px-3 py-2">60~64세</td>
                        <td className="px-3 py-2">20%</td>
                      </tr>
                      <tr className="border border-border-base">
                        <td className="px-3 py-2 font-semibold"></td>
                        <td className="px-3 py-2">65~69세</td>
                        <td className="px-3 py-2">30%</td>
                      </tr>
                      <tr className="border border-border-base">
                        <td className="px-3 py-2 font-semibold"></td>
                        <td className="px-3 py-2">70세 이상</td>
                        <td className="px-3 py-2">40%</td>
                      </tr>
                      <tr className="border border-border-base">
                        <td className="px-3 py-2 font-semibold">장기보유공제</td>
                        <td className="px-3 py-2">5~10년 미만</td>
                        <td className="px-3 py-2">20%</td>
                      </tr>
                      <tr className="border border-border-base">
                        <td className="px-3 py-2 font-semibold"></td>
                        <td className="px-3 py-2">10~15년 미만</td>
                        <td className="px-3 py-2">40%</td>
                      </tr>
                      <tr className="border border-border-base">
                        <td className="px-3 py-2 font-semibold"></td>
                        <td className="px-3 py-2">15년 이상</td>
                        <td className="px-3 py-2">50%</td>
                      </tr>
                      <tr className="border border-border-base bg-primary-500/5">
                        <td className="px-3 py-2 font-semibold">합계 한도</td>
                        <td className="px-3 py-2">고령자 + 장기보유 합산</td>
                        <td className="px-3 py-2">최대 80%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="rounded-lg border border-border-base bg-primary-500/5 p-4">
                  <h3 className="font-semibold text-primary-700 dark:text-primary-400 mb-3">공제 적용 사례</h3>
                  <div className="space-y-3 text-sm text-text-secondary font-mono bg-bg-base p-3 rounded">
                    <p><strong className="text-text-primary">70세 + 15년 보유 (위 1주택 공시 15억, 과세표준 1.8억):</strong></p>
                    <p>산출세액: 90만 원</p>
                    <p>공제할 재산세액(종합부동산세법 §9③): 32만 4천 원</p>
                    <p>재산세 공제 후 금액: 90만 − 32만 4천 = 57만 6천 원</p>
                    <p>고령자공제: 40% (70세 이상)</p>
                    <p>장기보유공제: 50% (15년 이상)</p>
                    <p>합계 공제율: min(40% + 50%, 80%) = 80%</p>
                    <p>세액공제액: 57만 6천 × 80% = 46만 800 원</p>
                    <p className="border-t border-border-base pt-2 font-bold text-text-primary">종부세 납부세액: 57만 6천 − 46만 800 = 11만 5,200 원</p>
                    <p>농특세: 11만 5,200 × 20% = 2만 3,040 원</p>
                    <p>최종 납부액: 11만 5,200 + 2만 3,040 = 13만 8,240 원</p>
                  </div>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">7. 합산배제 신청, 절세의 핵심 (9월 16~30일)</h2>
                <p className="text-text-secondary leading-relaxed">
                  다주택자도 특정 조건을 충족하면 <strong>합산배제</strong>를 신청해서 일부 부동산을 종부세 과세 대상에서 제외할 수 있습니다.
                  합산배제 신고와 1세대1주택 특례 신청 기간은 매년 9월 16일부터 30일까지입니다(종합부동산세법 §8③·⑤).
                </p>
                <div className="rounded-lg border border-border-base bg-bg-raised p-4">
                  <h3 className="font-semibold text-text-primary mb-3">합산배제·특례 주요 대상</h3>
                  <ul className="space-y-2 text-sm text-text-secondary">
                    <li>
                      <strong>① 등록 임대주택 (합산배제):</strong> 임대사업자로 등록하고 요건을 갖춘 임대주택
                    </li>
                    <li>
                      <strong>② 사원용 주택·미분양 주택 등 (합산배제):</strong> 종업원 기숙사, 주택건설사업자의 미분양 주택, 가정어린이집용 주택
                    </li>
                    <li>
                      <strong>③ 일시적 2주택 (1세대1주택 특례):</strong> 새 집을 사고 기한 안에 기존 집을 파는 경우
                    </li>
                    <li>
                      <strong>④ 상속주택·지방 저가주택 (1세대1주택 특례):</strong> 1주택과 함께 가진 경우 1세대1주택자로 계산
                    </li>
                  </ul>
                  <p className="text-xs text-text-tertiary mt-3 border-t border-border-base pt-3">
                    ※ 구체적 신청 요건과 서류는 관할 세무서 또는 홈택스(hometax.go.kr)에서 확인하세요.
                  </p>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">8. 납부 일정 및 방법</h2>
                <p className="text-text-secondary leading-relaxed">
                  종합부동산세는 12월 1일부터 15일까지 납부하는 세금입니다(종합부동산세법 §16).
                  국세이므로 홈택스·손택스, 은행·우체국에서 납부합니다.
                </p>
                <div className="space-y-3">
                  <div className="rounded-lg border border-border-base bg-bg-card p-4">
                    <h3 className="font-semibold text-text-primary mb-2">납부 기한</h3>
                    <p className="text-sm text-text-secondary font-semibold">
                      2026년 12월 1일(화) ~ 12월 15일(화)
                    </p>
                    <p className="text-sm text-text-tertiary mt-1">
                      ※ 12월 15일을 넘기면 납부지연가산세가 붙습니다 (국세기본법 §47의4).
                    </p>
                  </div>
                  <div className="rounded-lg border border-border-base bg-bg-card p-4">
                    <h3 className="font-semibold text-text-primary mb-2">납부 방법</h3>
                    <ul className="space-y-1.5 text-sm text-text-secondary">
                      <li><strong>1. 홈택스·손택스:</strong> 로그인 후 고지 내역 조회 → 계좌이체·신용카드 납부</li>
                      <li><strong>2. 가상계좌:</strong> 고지서에 적힌 국세 가상계좌로 이체</li>
                      <li><strong>3. 은행·우체국 창구:</strong> 고지서를 가지고 방문 납부</li>
                      <li><strong>4. 신용카드:</strong> 납부대행수수료는 납세자 부담</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">9. 미납 시 불이익</h2>
                <p className="text-text-secondary leading-relaxed">
                  종합부동산세를 기한 내에 납부하지 않으면 가산세가 붙고, 체납이 이어지면 재산 압류로 이어질 수 있습니다.
                </p>
                <div className="rounded-lg border-l-2 border-l-danger-500 bg-danger-500/5 p-4">
                  <h3 className="font-semibold text-danger-700 dark:text-danger-300 mb-2">미납 시 불이익</h3>
                  <ul className="space-y-1.5 text-sm text-danger-700 dark:text-danger-300">
                    <li><strong>납부지연가산세:</strong> 미납 세액의 3%가 먼저 붙고, 이후 1개월이 지날 때마다 0.67%가 추가됩니다 (국세기본법 §47의4)</li>
                    <li><strong>재산 압류:</strong> 독촉 후에도 내지 않으면 부동산·예금 등 재산이 압류될 수 있습니다 (국세징수법)</li>
                    <li><strong>체납 자료 제공:</strong> 체납액이 크고 오래되면 신용정보기관에 체납 자료가 제공될 수 있습니다</li>
                  </ul>
                </div>
              </section>

              <FaqSection items={[...FAQ_ITEMS]} />

              <section className="card">
                <h2 className="mb-3 text-lg font-semibold">관련 계산기·가이드</h2>
                <ul className="space-y-2 text-sm">
                  <li>
                    →{' '}
                    <Link href="/calculator/comprehensive-property-tax/" className="text-primary-600 underline dark:text-primary-500">
                      종합부동산세 계산기
                    </Link>
                    {'공시가 입력 후 과세표준·세액 즉시 계산'}
                  </li>
                  <li>
                    →{' '}
                    <Link href="/guide/comprehensive-real-estate-tax-payment-2026/" className="text-primary-600 underline dark:text-primary-500">
                      종부세 납부기간 2026
                    </Link>
                    {'12월 1~15일 납부, 분납·카드납부 방법'}
                  </li>
                  <li>
                    →{' '}
                    <Link href="/calculator/property-tax/" className="text-primary-600 underline dark:text-primary-500">
                      재산세 계산기
                    </Link>
                    {'종부세와는 별개의 재산세(7월·9월)'}
                  </li>
                  <li>
                    →{' '}
                    <Link href="/guide/property-tax-base-date-june-1-2026/" className="text-primary-600 underline dark:text-primary-500">
                      재산세 과세기준일 6월 1일
                    </Link>
                    {'종부세와 같은 과세기준일 설명'}
                  </li>
                  <li>
                    →{' '}
                    <Link href="/guide/april-comprehensive-property-tax-exclusion/" className="text-primary-600 underline dark:text-primary-500">
                      종부세 합산배제·특례 신청 가이드 (9월 16~30일)
                    </Link>
                    {'임대주택·일시적2주택 절세 신청'}
                  </li>
                  <li>
                    →{' '}
                    <Link href="/guide/tax-calendar-2026/" className="text-primary-600 underline dark:text-primary-500">
                      2026년 세금 달력
                    </Link>
                    {'종부세·재산세·양도세 전체 납부 일정'}
                  </li>
                </ul>
              </section>

              <ShareButtons
                title="종합부동산세 2026, 누가 내나, 12억 공제, 과세기준일 6월 1일"
                url={URL}
                description="종부세 완벽 해설. 1주택 12억, 다주택 9억 공제. 6월 1일 과세기준일, 12월 납부, 세율 0.5~5%."
              />

              <section
                aria-label="출처 및 면책"
                className="rounded-lg border border-border-base p-4 text-caption text-text-tertiary"
              >
                <p className="mb-2">
                  <strong>법적 근거</strong>: 종합부동산세법 §3(과세기준일)·§7(납세의무자)·§8(과세표준·세율)·§9(세액공제)·§16(납부기한) · {' '}
                  <a
                    href="https://www.law.go.kr/법령/종합부동산세법"
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="text-primary-600 underline dark:text-primary-500"
                  >
                    종합부동산세법(국가법령정보센터)
                  </a>{' '}
                  · 농어촌특별세법 §5 · {' '}
                  <a
                    href="https://www.hometax.go.kr"
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="text-primary-600 underline dark:text-primary-500"
                  >
                    홈택스(종부세 조회·납부)
                  </a>{' '}
                  · {' '}
                  <a
                    href="https://www.nts.go.kr"
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="text-primary-600 underline dark:text-primary-500"
                  >
                    국세청(종부세 정책)
                  </a>{' '}
                  .
                </p>
                <p className="mb-2">
                  <strong>면책조항</strong>: 본 가이드는 2026년 11월 16일 기준 정보를 제공합니다.
                  종합부동산세 제도는 정부 정책 및 세법 개정에 따라 변경될 수 있으므로,
                  정확한 세액 계산이 필요하면 홈택스 또는 관할 세무서, 세무사 상담을 받으시기 바랍니다.
                  특히 합산배제 신고(9월 16~30일)·고령자·장기보유공제·일시적 2주택 특례는 요건이 세부적이므로
                  신청 전에 꼭 확인하세요.
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
