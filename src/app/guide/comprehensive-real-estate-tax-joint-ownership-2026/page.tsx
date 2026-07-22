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

const URL = 'https://calculatorhost.com/guide/comprehensive-real-estate-tax-joint-ownership-2026/';
const DATE_PUBLISHED = '2026-06-29';
const DATE_MODIFIED = '2026-06-29';

export const metadata: Metadata = {
  title: '부부 공동명의 종부세 특례 vs 단독명의 유불리 2026',
  description:
    '부부 공동명의 종합부동산세(종부세) 계산법 완벽 정리. 공동명의 vs 단독명의 공제 차이(18억 vs 12억), 종부세법 §10의2 특례 신청(9월), 고령자·장기보유 세액공제 분배. 유불리 판단·사례 시뮬.',
  keywords: [
    '부부 공동명의 종부세',
    '종부세 공동명의',
    '종부세법 10의2',
    '인별 과세 공제',
    '고령자 세액공제',
    '장기보유 세액공제',
    '공동명의 vs 단독명의',
    '종부세 절세',
    '2026 종부세',
    '9월 신청 기한',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '부부 공동명의 종부세 특례 vs 단독명의 유불리 2026' }],
    title: '부부 공동명의 종부세 특례 vs 단독명의 유불리 2026',
    description: '공동명의 18억 공제 vs §10의2 특례 12억 + 세액공제. 매년 9월 신청 기한 주의.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '부부 공동명의 종부세 — 공동명의 18억 vs §10의2 특례 12억 비교',
    description: '공동명의 인별 9억씩 공제 vs 특례 12억 + 세액공제. 고령·장기보유 시 유리.',
  },
};

const FAQ_ITEMS = [
  {
    question: '부부 공동명의면 종부세 공제가 각자 9억씩 총 18억인가요?',
    answer:
      '네, 맞습니다. 부부 공동명의 1주택은 인별(명의자별) 과세되어 각자 9억 원의 기본공제가 적용되므로 합계 18억 원 공제입니다(종합부동산세법 §8①). 단독명의 1세대1주택은 12억 단일 공제이지만, 공동명의는 각자가 별도 납세의무자로 9억씩 공제받습니다. 따라서 공시가 18억 이하면 종부세 0원.',
  },
  {
    question: '부부 중 1인만 60세 이상이면 세액공제는 한 명만 받나요?',
    answer:
      '고령자·장기보유 세액공제(종합부동산세법 §9)는 1세대1주택자에게 적용되므로, 특례(§10의2)를 신청해 부부 중 1인을 납세의무자로 지정한 경우에만 그 사람의 나이·보유 기간으로 공제받습니다. 특례를 신청하지 않은 일반 공동명의 상태에서는 이 세액공제가 적용되지 않습니다. 그래서 고령·장기보유라면 특례 신청 유불리를 따져봐야 합니다.',
  },
  {
    question: '9월에 §10의2 특례 신청 안 하면 어떻게 되나요?',
    answer:
      '특례 신청을 하지 않으면 기본적으로 공동명의 인별 과세(각자 9억씩, 18억 합계 공제) 적용됩니다. 매년 9월 16일~30일에 신청 기한이 있으므로(종합부동산세법 §10의2), 신청 기한을 놓치면 그 해는 특례 혜택을 받을 수 없습니다. 이듬해 신청은 불가능하므로 신청 여부를 사전에 결정해야 합니다.',
  },
  {
    question: '공동명의와 특례 신청, 어느 쪽이 항상 유리한가요?',
    answer:
      '공시가 규모·고령자 여부·보유 기간에 따라 다릅니다. 공시가 18억 이하 + 고령·장기보유 요건 미충족 → 공동명의(18억 공제로 0원). 공시가 20억 이상 + 나이 65세 이상 + 15년 보유 → 특례 신청(12억 공제 + 세액공제 80%)이 유리할 수 있습니다. 매년 유불리가 변하므로 9월 전에 전문가와 비교 필수.',
  },
  {
    question: '장기보유 세액공제는 공동명의 시 어떻게 적용되나요?',
    answer:
      '일반 공동명의(특례 미신청) 상태에서는 고령자·장기보유 세액공제가 적용되지 않습니다. 이 세액공제는 1세대1주택자 대상이므로, §10의2 특례를 신청해 부부 중 1인을 납세의무자로 지정해야 그 사람의 보유 기간(5년 20%·10년 40%·15년 50%)으로 공제받을 수 있습니다(종합부동산세법 §9). 그래서 장기보유라면 특례 신청이 유리할 수 있습니다.',
  },
  {
    question: '공동명의가 혼인 해제 시 문제가 될까요?',
    answer:
      '공동명의 부동산은 혼인 중 공동재산(재산분할 대상)입니다. 혼인 해제 시 공동명의 부동산을 분할하려면 지분 이전 등기 또는 매각이 필요하며, 지분 이전 등기 시 취득세가 발생합니다. 또한 혼인 해제 후 각자 다른 주택을 보유하면 "1세대 다주택"이 되어 이후 양도 시 중과세 대상이 될 수 있습니다(중과 규정은 한시 배제·변동이 잦으므로 양도 시점 기준 확인 필요).',
  },
];

export default function ComprehensiveRealEstateTaxJointOwnership2026() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '부부 공동명의 종부세 특례 vs 단독명의 유불리 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '부부 공동명의 종합부동산세(종부세) 특례 vs 단독명의 유불리 2026',
    description:
      '부부 공동명의 종부세: 인별 9억씩 18억 공제 vs 종부세법 §10의2 특례 신청(12억 + 세액공제). 고령자·장기보유 세액공제 분배. 유불리 판단 기준·사례 시뮬.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['부부 공동명의 종부세', '종부세법 10의2', '공동명의 공제', '세액공제', '2026'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '부부 공동명의 종합부동산세(종부세) 특례 vs 단독명의 유불리 2026',
    description:
      '부부 공동명의 종부세 계산: 인별 과세(각자 9억 공제, 18억 합계) vs 종부세법 §10의2 특례(12억 공제 + 고령자·장기보유 세액공제). 유불리 판단·신청 기한 9월.',
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
                    { name: '부부 공동명의 종부세 특례 vs 단독명의 유불리 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">세금·부동산 · 9분 읽기 · 2026-06-29</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  부부 공동명의 종합부동산세(종부세) 완벽 비교
                  <br />
                  <span className="text-2xl text-text-secondary">— 공동명의 18억 공제 vs §10의2 특례 12억 + 세액공제</span>
                </h1>
                <p className="text-lg text-text-secondary leading-relaxed" data-speakable>
                  부부 공동명의 주택의 종합부동산세(종부세) 납부액은 <strong>명의 구조와 특례 신청 여부</strong>에 따라 크게 달라집니다.
                  기본적으로 부부 공동명의는 인별 과세되어 각자 9억 원의 공제가 적용(합계 18억)되지만,
                  종부세법 §10의2에 따른 특례를 신청하면 단독명의처럼 12억 공제 + 고령자·장기보유 세액공제를 받을 수 있습니다.
                  두 방식의 차이를 정확히 이해하고, 매년 9월 신청 기한 전에 유불리를 판단해야 합니다.
                </p>
              </header>

              <AdSlot slot="guide-comprehensive-real-estate-tax-joint-top" format="horizontal" />

              <section aria-label="핵심 비교" className="card border-l-4 border-l-primary-500">
                <h2 className="mb-2 text-caption uppercase tracking-wider text-primary-500">핵심 요약</h2>
                <div className="space-y-3 text-sm" data-speakable>
                  <table className="w-full border-collapse text-sm">
                    <caption className="mb-2 font-semibold text-text-primary">부부 공동명의 vs 단독명의 종부세 비교 (2026)</caption>
                    <thead>
                      <tr className="bg-primary-500/10">
                        <th scope="col" className="border border-border-base px-2 py-2 text-left font-semibold">항목</th>
                        <th scope="col" className="border border-border-base px-2 py-2 text-left font-semibold">부부 공동명의 (신청 X)</th>
                        <th scope="col" className="border border-border-base px-2 py-2 text-left font-semibold">§10의2 특례 신청</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-border-base px-2 py-1 font-semibold">공제 방식</td>
                        <td className="border border-border-base px-2 py-1">인별 과세 (각자 9억)</td>
                        <td className="border border-border-base px-2 py-1">단독명의 방식 (12억)</td>
                      </tr>
                      <tr>
                        <td className="border border-border-base px-2 py-1 font-semibold">기본공제</td>
                        <td className="border border-border-base px-2 py-1">합계 18억 원</td>
                        <td className="border border-border-base px-2 py-1">12억 원</td>
                      </tr>
                      <tr>
                        <td className="border border-border-base px-2 py-1 font-semibold">세액공제</td>
                        <td className="border border-border-base px-2 py-1">불가능 (인별 과세)</td>
                        <td className="border border-border-base px-2 py-1">고령자·장기보유 80% 한도</td>
                      </tr>
                      <tr>
                        <td className="border border-border-base px-2 py-1 font-semibold">신청 기한</td>
                        <td className="border border-border-base px-2 py-1">—</td>
                        <td className="border border-border-base px-2 py-1">9월 16~30일 (매년)</td>
                      </tr>
                      <tr className="bg-primary-500/5">
                        <td className="border border-border-base px-2 py-1 font-semibold">유리한 경우</td>
                        <td className="border border-border-base px-2 py-1">공시가 18억 이하</td>
                        <td className="border border-border-base px-2 py-1">공시가 높음 + 고령·장기보유</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">1. 부부 공동명의 종부세 기본 구조 — 인별 과세, 각자 9억 공제</h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  부부 공동명의 1주택은 종합부동산세법 §8에 따라 명의자(부부) 각자가 <strong>개별 납세의무자</strong>가 됩니다.
                  따라서 1세대1주택 단독명의의 12억 공제 대신, 인별(명의자별) 9억 원의 공제가 각자에게 적용됩니다.
                  부부 공동명의 50%+50%면 기본공제가 합계 18억 원입니다(§8①).
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <h3 className="font-semibold text-text-primary mb-3">공동명의 인별 과세 구조</h3>
                  <div className="space-y-2 text-sm text-text-secondary font-mono bg-bg-base p-3 rounded">
                    <p className="text-text-primary font-semibold">예: 공시가 24억원 부부 공동명의(50%+50%)</p>
                    <p className="border-t border-border-base pt-2 mt-2">남편: 본인 지분 공시가 12억 − 공제 9억 = 3억 × 공정시장가액비율 60% = 과세표준 1.8억</p>
                    <p>아내: 본인 지분 공시가 12억 − 공제 9억 = 3억 × 60% = 과세표준 1.8억</p>
                    <p className="text-text-primary font-semibold">→ 각자 과세표준 1.8억에 개별 누진세율 적용 (부부 각자가 별도 납세의무자)</p>
                    <p className="border-t border-border-base pt-2 mt-2">※ 공시가 18억 이하(각자 지분 9억 이하)면 양쪽 모두 공제로 상쇄되어 종부세 0원</p>
                  </div>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-raised p-4 mt-4">
                  <p className="text-sm text-text-secondary">
                    <strong>다만:</strong> 부부 공동명의는 각자가 본인 지분에 대해 <strong>개별적으로 9억을 공제</strong>받는 별도 납세의무자입니다.
                    따라서 1세대1주택 단독명의(12억 단일 공제)와 달리, 부부 합산으로는 18억까지 공제 효과가 생깁니다.
                  </p>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">2. 종부세법 §10의2 특례 — 부부 중 1인을 납세의무자로 12억 공제 + 세액공제</h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  부부 공동명의 부동산도 <strong>종부세법 §10의2에 따른 특례 신청</strong>을 하면,
                  부부 중 1인을 납세의무자로 지정하여 단독명의처럼 12억 공제를 받을 수 있습니다(§10의2①).
                  추가로 고령자공제(20~40%)·장기보유공제(20~50%)를 받을 수 있으며, 두 공제를 합산해도 80% 한도입니다(§9).
                </p>
                <div className="overflow-x-auto mb-4">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-3 font-semibold text-text-primary">§10의2 특례 신청 조건·효과 (종합부동산세법)</caption>
                    <thead>
                      <tr className="bg-primary-500/10 border border-border-base">
                        <th scope="col" className="px-3 py-2 text-left font-semibold">항목</th>
                        <th scope="col" className="px-3 py-2 text-left font-semibold">내용</th>
                      </tr>
                    </thead>
                    <tbody className="text-text-secondary">
                      <tr className="border border-border-base">
                        <td className="px-3 py-2 font-semibold">신청 대상</td>
                        <td className="px-3 py-2">부부 공동명의 1주택(1세대1주택 요건)</td>
                      </tr>
                      <tr className="border border-border-base">
                        <td className="px-3 py-2 font-semibold">신청 기한</td>
                        <td className="px-3 py-2">매년 9월 16일 ~ 30일 (온라인·위택스·지자체)</td>
                      </tr>
                      <tr className="border border-border-base">
                        <td className="px-3 py-2 font-semibold">신청 대상자 지정</td>
                        <td className="px-3 py-2">부부 중 1인 (일반적으로 고령자 또는 주 거주자)</td>
                      </tr>
                      <tr className="border border-border-base">
                        <td className="px-3 py-2 font-semibold">기본공제</td>
                        <td className="px-3 py-2">12억 원(단독명의 1세대1주택 동일)</td>
                      </tr>
                      <tr className="border border-border-base">
                        <td className="px-3 py-2 font-semibold">세액공제 대상</td>
                        <td className="px-3 py-2">고령자공제, 장기보유공제 적용 가능</td>
                      </tr>
                      <tr className="bg-primary-500/5 border border-border-base">
                        <td className="px-3 py-2 font-semibold">미신청 시</td>
                        <td className="px-3 py-2">기본 인별 과세(각자 9억) 적용 → 그 해 특례 혜택 상실</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">3. 세액공제 분배 — 고령자공제 + 장기보유공제</h2>
                <p className="text-text-secondary leading-relaxed">
                  특례를 신청하면 §10의2로 지정된 납세의무자가 고령자공제(종부세법 §9①)와 장기보유공제(§9②)를 받을 수 있습니다.
                </p>
                <div className="overflow-x-auto mb-4">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-3 font-semibold text-text-primary">세액공제율 (종합부동산세법 §9)</caption>
                    <thead>
                      <tr className="bg-primary-500/10 border border-border-base">
                        <th scope="col" className="px-3 py-2 text-left font-semibold">공제 유형</th>
                        <th scope="col" className="px-3 py-2 text-left font-semibold">조건</th>
                        <th scope="col" className="px-3 py-2 text-left font-semibold">공제율</th>
                      </tr>
                    </thead>
                    <tbody className="text-text-secondary">
                      <tr className="border border-border-base">
                        <td className="px-3 py-2 font-semibold">고령자공제</td>
                        <td className="px-3 py-2">60~64세</td>
                        <td className="px-3 py-2">20%</td>
                      </tr>
                      <tr className="border border-border-base">
                        <td className="px-3 py-2"></td>
                        <td className="px-3 py-2">65~69세</td>
                        <td className="px-3 py-2">30%</td>
                      </tr>
                      <tr className="border border-border-base">
                        <td className="px-3 py-2"></td>
                        <td className="px-3 py-2">70세 이상</td>
                        <td className="px-3 py-2">40%</td>
                      </tr>
                      <tr className="border border-border-base">
                        <td className="px-3 py-2 font-semibold">장기보유공제</td>
                        <td className="px-3 py-2">5년 이상 10년 미만</td>
                        <td className="px-3 py-2">20%</td>
                      </tr>
                      <tr className="border border-border-base">
                        <td className="px-3 py-2"></td>
                        <td className="px-3 py-2">10년 이상 15년 미만</td>
                        <td className="px-3 py-2">40%</td>
                      </tr>
                      <tr className="border border-border-base">
                        <td className="px-3 py-2"></td>
                        <td className="px-3 py-2">15년 이상</td>
                        <td className="px-3 py-2">50%</td>
                      </tr>
                      <tr className="bg-primary-500/5 border border-border-base">
                        <td className="px-3 py-2 font-semibold">합산 한도</td>
                        <td className="px-3 py-2">고령자 + 장기보유 합산</td>
                        <td className="px-3 py-2">최대 80%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="rounded-lg border border-border-base bg-primary-500/5 p-4">
                  <h3 className="font-semibold text-primary-700 dark:text-primary-400 mb-3">세액공제 적용 사례</h3>
                  <div className="space-y-3 text-sm text-text-secondary font-mono bg-bg-base p-3 rounded">
                    <p><strong className="text-text-primary">사례: 공시 20억 공동명의 (특례 신청, 남편 70세 + 15년 보유)</strong></p>
                    <p className="border-t border-border-base pt-2 mt-2">기본공제: 12억 (특례 적용)</p>
                    <p>과세표준: (20억 − 12억) × 공정시장가액비율 60% = 4.8억</p>
                    <p>고령자공제: 40% (70세 이상)</p>
                    <p>장기보유공제: 50% (15년 이상)</p>
                    <p>합산 세액공제율: min(40% + 50%, 80%) = 80%</p>
                    <p className="border-t border-border-base pt-2 font-bold text-text-primary">→ 과세표준 4.8억에 §9 누진세율로 산출한 세액에서 80%를 공제 → 종부세 부담 대폭 감소</p>
                    <p className="text-text-tertiary">※ 정확한 산출세액·세율은 과세표준 구간별 누진세율(종부세법 §9)에 따라 달라지므로 위택스·홈택스 계산으로 확인하세요.</p>
                  </div>
                </div>
              </section>

              <AdSlot slot="guide-comprehensive-real-estate-tax-joint-mid" format="rectangle" />

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">4. 공동명의(신청 X) vs 특례(§10의2) 유불리 판단 기준</h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  공동명의와 특례 신청 중 어느 쪽이 유리한지는 <strong>공시가, 나이, 보유 기간, 매년 변동</strong>합니다.
                  따라서 매년 9월 신청 기한 전에 유불리를 비교 계산해야 합니다.
                </p>
                <ul className="space-y-3 text-text-secondary text-sm">
                  <li>
                    <strong>◆ 공동명의(신청 X)가 유리한 경우:</strong>
                    <ul className="list-inside list-disc mt-1 ml-4 space-y-1">
                      <li>공시가 18억 이하 → 기본공제 18억으로 종부세 0원</li>
                      <li>고령자·장기보유 요건 미충족 → 세액공제 받을 수 없음</li>
                      <li>1세대1주택 비과세 12억 초과 금액이 적을 때</li>
                    </ul>
                  </li>
                  <li>
                    <strong>◆ 특례(§10의2)가 유리한 경우:</strong>
                    <ul className="list-inside list-disc mt-1 ml-4 space-y-1">
                      <li>공시가 20억 이상</li>
                      <li>납세의무자 지정 대상(남편 또는 아내)이 60세 이상</li>
                      <li>보유 기간 5년 이상 (특히 15년 이상이면 공제율 80% 최대)</li>
                    </ul>
                  </li>
                </ul>
                <div className="rounded-lg border-l-2 border-l-highlight-500 bg-highlight-500/5 p-4 mt-4">
                  <p className="text-sm text-highlight-700 dark:text-highlight-300">
                    <strong>권장:</strong> 공시가·나이·보유 기간을 종합하여 매년 9월 중에 위택스(홈택스)로 임시 시뮬레이션하거나,
                    관할 지자체 세무서에 문의하여 유불리를 확정한 후 9월 30일 이전에 신청 여부를 결정하세요.
                  </p>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">5. 9월 신청 기한 — 매년 필수 재신청</h2>
                <p className="text-text-secondary leading-relaxed">
                  §10의2 특례는 <strong>1회 신청이 영구적이지 않으며, 매년 재신청</strong>해야 합니다(종합부동산세법 §10의2④).
                  신청 기한은 9월 16일 ~ 30일이며, 이 기간을 놓치면 그 해는 자동으로 기본 인별 과세(각자 9억 공제)가 적용됩니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <h3 className="font-semibold text-text-primary mb-3">9월 신청 일정 (2026년 기준)</h3>
                  <div className="space-y-2 text-sm text-text-secondary">
                    <p><strong className="text-text-primary">신청 기한:</strong> 2026년 9월 16일(수) ~ 30일(수) 17:00 종료</p>
                    <p><strong className="text-text-primary">신청 방법:</strong></p>
                    <ul className="list-inside list-disc ml-3 space-y-1">
                      <li>온라인: 위택스(wetax.go.kr) 〉 종합부동산세 〉 특례 신청</li>
                      <li>대면: 관할 시·군·구 세무서 방문</li>
                      <li>서류: 신분증·부부관계증명서·부동산 등기사항증명서 준비</li>
                    </ul>
                    <p className="border-t border-border-base pt-2 mt-2"><strong className="text-danger-600 dark:text-danger-400">주의:</strong> 종부세는 과세기준일(6월 1일) 기준으로 그해 11월 말 고지서가 발송되고 12월 1~15일에 납부합니다. 9월 신청 기한을 놓치면 그해는 특례를 적용받을 수 없습니다.</p>
                  </div>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">6. 혼인 해제·재산분할 시 주의사항</h2>
                <p className="text-text-secondary leading-relaxed">
                  공동명의 부동산은 혼인 중 공동재산이므로, 혼인 해제 시 <strong>지분 분할·양도에 따른 세금</strong>이 발생합니다.
                </p>
                <div className="rounded-lg border-l-2 border-l-danger-500 bg-danger-500/5 p-4">
                  <h3 className="font-semibold text-danger-700 dark:text-danger-300 mb-2">주의: 혼인 해제 시 리스크</h3>
                  <ul className="space-y-1.5 text-sm text-danger-700 dark:text-danger-300">
                    <li>
                      <strong>① 지분 이전 등기:</strong> 공동명의를 각자 단독명의로 분할하려면 등기가 필요 → 취득세 발생
                    </li>
                    <li>
                      <strong>② 1세대 다주택:</strong> 혼인 해제 후 각자 다른 주택 보유 → "1세대 다주택"이 되어
                      이후 양도 시 중과세 대상이 될 수 있음 (중과 규정은 한시 배제·변동 잦음)
                    </li>
                    <li>
                      <strong>③ 종부세 추적:</strong> 혼인 해제 년도의 종부세 과세기준일(6월 1일)이 중요 → 그 전후로 소유자 변경 시 세 부담 달라짐
                    </li>
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
                    {' — 공시가 입력 후 공동명의 vs 특례 유불리 시뮬'}
                  </li>
                  <li>
                    →{' '}
                    <Link href="/guide/comprehensive-real-estate-tax-who-pays-2026/" className="text-primary-600 underline dark:text-primary-500">
                      종부세 누가 내나? 12억 공제 완벽 정리 2026
                    </Link>
                    {' — 종부세 기본 개념·세율·납부 일정'}
                  </li>
                  <li>
                    →{' '}
                    <Link href="/guide/comprehensive-real-estate-tax-calculation-2026/" className="text-primary-600 underline dark:text-primary-500">
                      종부세 계산법 완벽 이해 2026
                    </Link>
                    {' — 과세표준·공정시장가액비율 60%·누진세율'}
                  </li>
                  <li>
                    →{' '}
                    <Link href="/guide/joint-ownership-couple-capital-gains-tax-savings/" className="text-primary-600 underline dark:text-primary-500">
                      부부 공동명의 양도세 절세 완전 정리
                    </Link>
                    {' — 공동명의 양도 시 누진세 분산 효과'}
                  </li>
                  <li>
                    →{' '}
                    <Link href="/category/tax/" className="text-primary-600 underline dark:text-primary-500">
                      세금 계산기 모음
                    </Link>
                    {' — 모든 세금 계산기 한눈에'}
                  </li>
                </ul>
              </section>

              <ShareButtons
                title="부부 공동명의 종부세 특례 vs 단독명의 유불리 2026"
                url={URL}
                description="공동명의 18억 공제 vs 종부세법 §10의2 특례 12억+세액공제. 매년 9월 신청 기한 주의."
              />

              <section
                aria-label="출처 및 면책"
                className="rounded-lg border border-border-base p-4 text-caption text-text-tertiary"
              >
                <p className="mb-2">
                  <strong>법적 근거</strong>: 종합부동산세법 §3(과세기준일)·§8(공제·세율)·§9(세액공제)·§10의2(특례)·§16(납부기한) · {' '}
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
                    href="https://wetax.go.kr"
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="text-primary-600 underline dark:text-primary-500"
                  >
                    위택스(종부세 조회·신청)
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
                  <strong>면책조항</strong>: 본 가이드는 2026년 6월 29일 기준 종합부동산세 제도를 설명합니다.
                  부부 공동명의 여부·특례 신청 여부는 개별 사정(공시가, 나이, 보유 기간, 향후 양도 계획, 혼인 상황)에 따라 세금이 크게 달라지므로,
                  정확한 신청 판단이 필요하면 반드시 위택스(시뮬레이션)·관할 지자체 세무서·세무사 상담을 받으시기 바랍니다.
                  특히 매년 9월 신청 기한을 놓치면 그 해 특례 혜택을 받을 수 없으므로 주의하세요.
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
