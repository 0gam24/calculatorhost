import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { Footer } from '@/components/layout/Footer';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { AdSlot } from '@/components/ads/AdSlot';
import { FaqSection } from '@/components/calculator/FaqSection';
import {
  buildBreadcrumbJsonLd,
  buildArticleJsonLd,
  buildWebPageJsonLd,
  buildFaqPageJsonLd,
  buildSpeakableJsonLd,
} from '@/lib/seo/jsonld';

const URL = 'https://calculatorhost.com/guide/capital-gains-tax-tips/';
const DATE_PUBLISHED = '2026-05-03';
const DATE_MODIFIED = '2026-05-03';

export const metadata: Metadata = {
  title: '양도소득세 절세 7가지 방법 2026 | 장기보유공제·1세대1주택 | calculatorhost',
  description:
    '주택·토지 양도 전 알아야 할 절세 핵심 7가지: 1세대1주택 비과세 조건, 장기보유특별공제 최대 80% 활용, 일시적 2주택 3년 특례, 자경 농지 100% 감면 등. 시뮬레이션과 함께 정리.',
  keywords: ['양도세 절세', '양도소득세 절세', '1세대1주택 비과세', '장기보유특별공제', '일시적 2주택', '토지 양도세', '농지 자경 감면'],
  alternates: { canonical: URL },
  openGraph: {
    title: '양도소득세 절세 7가지 방법 2026',
    description: '1세대1주택 비과세·장기보유공제·일시적 2주택·자경 감면 활용법.',
    url: URL,
    type: 'article',

    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
};

const FAQ_ITEMS = [
  {
    question: '1세대1주택 비과세 12억 한도는 어떻게 적용되나요?',
    answer:
      '양도가액 12억 원 이하면 전액 비과세입니다. 12억 원을 초과하면 초과분만 과세됩니다. 예: 양도가 15억 원이면 (15억 − 12억) ÷ 15억 = 20%만 과세 대상이 되어, 양도차익도 같은 비율로 안분 계산됩니다. 근거: 소득세법 §89.',
  },
  {
    question: '장기보유공제 80%는 어떤 조건에서 적용되나요?',
    answer:
      '1세대1주택은 보유 10년(연 4%, 최대 40%) + 거주 10년(연 4%, 최대 40%) = 합산 최대 80% 공제. 일반 부동산(다주택·토지)은 보유 15년 이상 시 최대 30%만 가능. 거주는 1세대1주택의 비과세 요건이 충족된 경우에만 가산. 근거: 소득세법 시행령 §159의3.',
  },
  {
    question: '일시적 2주택 3년 특례는 신규 취득일부터 계산하나요?',
    answer:
      '네, 신규 주택 취득일부터 3년 이내에 기존 주택을 양도해야 1세대1주택과 동일한 비과세를 받습니다. 조정대상지역 → 조정대상지역으로 이동 시 2년 이내(2024년부터 3년으로 확대 가능, 정책 확인 필수). 근거: 소득세법 시행령 §155.',
  },
  {
    question: '농지 자경 8년 감면은 누구나 받을 수 있나요?',
    answer:
      '자경 8년 이상 + 농지 소재지 거주 + 직접 농업 종사 입증이 필요합니다. 농지원부·자경증명서·세금계산서 등으로 입증해야 하며, 임대해서 농사 짓게 한 경우는 자경 인정 안 됨. 감면 한도: 1년 1억 원, 5년 합산 2억 원. 근거: 조세특례제한법 §69.',
  },
  {
    question: '조정대상지역 다주택자 중과세는 얼마나 되나요?',
    answer:
      '조정대상지역 내 2주택자 양도 시 기본 누진세율(6~45%)에 +20%p 가산, 3주택 이상은 +30%p 가산. 예: 과세표준 3억 원이면 38% + 20% = 58% 또는 38% + 30% = 68%까지. 단, 한시적 중과 유예 시기 적용 시 가산 면제. 근거: 소득세법 §104의7.',
  },
  {
    question: '양도세 신고 기한을 놓치면 어떻게 되나요?',
    answer:
      '양도일 속한 달의 말일부터 2개월 이내 신고·납부. 무신고 시 무신고가산세 20%, 납부지연가산세 일 0.022% 발생. 거래 후 즉시 홈택스 신고 권장. 1세대1주택 비과세 적용 받더라도 신고는 필요. 근거: 소득세법 §118, 국세기본법 §47의2.',
  },
];

export default function CapitalGainsTaxTipsPage() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '양도세 절세 7가지' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '양도소득세 절세 7가지 방법 (2026)',
    description: '1세대1주택 비과세·장기보유공제·일시적 2주택·자경 감면 등 양도세 절세 핵심.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['양도세 절세', '1세대1주택', '장기보유공제', '일시적 2주택', '자경 농지'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '양도소득세 절세 7가지 방법 2026',
    description: '주택·토지 양도 전 알아야 할 절세 핵심 7가지: 1세대1주택 비과세 조건, 장기보유특별공제 최대 80% 활용, 일시적 2주택 3년 특례, 자경 농지 100% 감면 등. 시뮬레이션과 함께 정리.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
  });
  const faqLd = buildFaqPageJsonLd(FAQ_ITEMS);
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
                    { name: '양도세 절세 7가지' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">세금 · 9분 읽기 · 2026-05-03</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  양도소득세 절세 7가지 방법 (2026)
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  주택·토지를 양도하기 전 알아야 할 절세 핵심 7가지를 시뮬레이션과 함께 정리합니다.
                  1세대1주택 비과세·장기보유공제 최대 80%·일시적 2주택 3년 특례·자경 농지 100% 감면 등
                  잘만 활용하면 수천만 원의 양도세를 절감할 수 있습니다.
                </p>
              </header>

              <AdSlot slot="guide-cgt-top" format="horizontal" />

              <section aria-label="요약" className="card border-l-4 border-l-primary-500">
                <h2 className="mb-2 text-caption uppercase tracking-wider text-primary-500">핵심 요약</h2>
                <ul className="space-y-1.5 text-sm" data-speakable>
                  <li>① <strong>1세대1주택 비과세</strong> — 보유 2년 + 12억 이하 = 양도세 0원</li>
                  <li>② <strong>장기보유공제 80%</strong> — 1주택 10년 보유 + 10년 거주</li>
                  <li>③ <strong>일시적 2주택 3년 특례</strong> — 신규 취득 후 3년 내 구주택 양도</li>
                  <li>④ <strong>자경 농지 100% 감면</strong> — 8년 이상 직접 농업 종사 (한도 2억)</li>
                  <li>⑤ <strong>다주택 중과 면제 활용</strong> — 한시적 유예 시기 매도</li>
                  <li>⑥ <strong>양도시기 분산</strong> — 연도 분산으로 누진세율 회피</li>
                  <li>⑦ <strong>필요경비 적극 인정</strong> — 중개수수료·취득세 등 영수증 보관</li>
                </ul>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">방법 1. 1세대1주택 비과세 — 가장 강력한 무기</h2>
                <p className="text-text-secondary leading-relaxed">
                  1세대가 1주택만 보유하고 <strong>2년 이상 보유</strong>(조정대상지역은 2년 거주 추가) 후
                  양도하면 양도가액 <strong>12억 원 이하 전액 비과세</strong>. 대한민국 양도세 절세의
                  가장 강력한 도구입니다.
                </p>
                <div className="rounded-lg bg-bg-raised p-4 text-sm">
                  <strong className="text-text-primary">시뮬레이션 — 1세대1주택 양도</strong>
                  <p className="mt-2 text-text-secondary">
                    취득 5억 (2020) → 양도 11억 (2026), 보유 6년<br />
                    <strong>비과세 적용</strong>: 양도세 <strong className="text-primary-700 dark:text-primary-300">0원</strong> (12억 이하)<br />
                    <strong>비과세 미적용 (다주택)</strong>: 양도차익 6억 → 약 1.96억 양도세 (38% × 5.4억 등)<br />
                    <strong>차이: 약 1.96억 원 절세</strong>
                  </p>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">방법 2. 장기보유특별공제 최대 80% 활용</h2>
                <p className="text-text-secondary leading-relaxed">
                  1세대1주택은 <strong>보유 연 4% + 거주 연 4% (각 최대 40%)</strong>로 합산
                  최대 80%까지 공제. 일반 부동산(다주택·토지)은 연 2%, 최대 30%로 차이가 큽니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <thead>
                      <tr className="bg-primary-500/10 border border-border-base">
                        <th className="px-3 py-2 text-left">보유</th>
                        <th className="px-3 py-2 text-right">1세대1주택 (보유+거주)</th>
                        <th className="px-3 py-2 text-right">일반 (보유만)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border border-border-base"><td className="px-3 py-2">3년</td><td className="px-3 py-2 text-right">24%</td><td className="px-3 py-2 text-right">6%</td></tr>
                      <tr className="border border-border-base"><td className="px-3 py-2">5년</td><td className="px-3 py-2 text-right">40%</td><td className="px-3 py-2 text-right">10%</td></tr>
                      <tr className="border border-border-base"><td className="px-3 py-2">10년</td><td className="px-3 py-2 text-right">80% (보유10+거주10)</td><td className="px-3 py-2 text-right">20%</td></tr>
                      <tr className="border border-border-base"><td className="px-3 py-2">15년+</td><td className="px-3 py-2 text-right">80% (한도)</td><td className="px-3 py-2 text-right">30% (한도)</td></tr>
                    </tbody>
                  </table>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">방법 3. 일시적 2주택 3년 특례</h2>
                <p className="text-text-secondary leading-relaxed">
                  신규 주택 취득 후 <strong>3년 이내</strong>에 기존 주택을 양도하면 1세대1주택과 동일한
                  비과세 적용. 이사 시기를 3년으로 맞추는 것이 핵심. 신규 취득일부터 카운트되니
                  계약 시점·잔금 시점 명확히 구분.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">방법 4. 자경 농지 100% 감면 (조특법 §69)</h2>
                <p className="text-text-secondary leading-relaxed">
                  <strong>8년 이상 자경</strong> + <strong>농지 소재지 거주</strong> + 직접 농업 종사 시
                  양도세 100% 감면. 한도: 연 1억, 5년 합 2억. 농지원부·자경증명서로 입증 필수.
                  임대해서 농사지은 경우 자경 인정 안 됨.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">방법 5. 다주택 중과 한시 유예 활용</h2>
                <p className="text-text-secondary leading-relaxed">
                  조정대상지역 2주택 +20%p, 3주택 이상 +30%p 중과는 정부 정책에 따라 <strong>한시
                  유예</strong>되는 시기가 있습니다. 2024년 5월~ 한시 유예 기간 동안 매도하면 일반세율
                  적용 가능. 정책 변경 시기 모니터링 필수.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">방법 6. 양도시기 분산 — 누진세율 회피</h2>
                <p className="text-text-secondary leading-relaxed">
                  양도세는 누진세율(6~45%)이라 1년에 큰 양도가 몰리면 최고 구간 적용. 두 부동산을
                  연도를 나눠(예: 12월 vs 1월) 양도하면 각각 낮은 세율 적용 가능.
                </p>
                <div className="rounded-lg bg-bg-raised p-4 text-sm">
                  <p className="text-text-secondary">
                    예: 양도차익 5억 + 5억 한 해 합산 → 10억 과세표준 → 42% 적용<br />
                    분산 (5억 × 2회 다른 연도) → 각각 5억 과세표준 → 38% 적용<br />
                    <strong>약 4% × 5억 = 2,000만 원 절세</strong>
                  </p>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">방법 7. 필요경비 적극 인정</h2>
                <p className="text-text-secondary leading-relaxed">
                  양도차익에서 차감 가능한 필요경비: 취득세·등록세, 중개수수료(취득·양도 모두),
                  법무사·세무사 수수료, 부동산 자본적 지출(인테리어·증축, 단순 도배·페인트는 X).
                  <strong>영수증·세금계산서 보관 필수</strong>. 영수증 없으면 인정 불가.
                </p>
              </section>

              <FaqSection items={FAQ_ITEMS} />

              <section className="card border-l-4 border-l-danger-500 bg-danger-500/5">
                <h2 className="mb-2 text-lg font-semibold text-danger-700 dark:text-danger-300">⚠️ 주의사항</h2>
                <ul className="space-y-2 text-sm text-danger-700 dark:text-danger-300">
                  <li>• 본 가이드는 일반론이며 실제 양도세는 거주 지역·정책 변경·개별 사정에 따라 달라집니다.</li>
                  <li>• 비과세·감면 적용 여부는 반드시 세무사 또는 국세청 홈택스 상담을 통해 확정하세요.</li>
                  <li>• 정책(중과 유예, 비과세 한도, 자경 인정 기준)은 자주 변경되므로 거래 직전 최신 확인 필수.</li>
                </ul>
              </section>

              <section className="card">
                <h2 className="mb-3 text-lg font-semibold">관련 도구</h2>
                <ul className="space-y-2 text-sm">
                  <li>→ <Link href="/calculator/capital-gains-tax/" className="text-primary-600 underline dark:text-primary-500">양도소득세 계산기</Link> — 위 7가지 시나리오 직접 시뮬레이션</li>
                  <li>→ <Link href="/calculator/acquisition-tax/" className="text-primary-600 underline dark:text-primary-500">취득세 계산기</Link></li>
                  <li>→ <Link href="/glossary/" className="text-primary-600 underline dark:text-primary-500">용어사전 — 양도차익·장기보유공제·1세대1주택</Link></li>
                </ul>
              </section>

              <section
                aria-label="출처 및 면책"
                className="rounded-lg border border-border-base p-4 text-caption text-text-tertiary"
              >
                <p className="mb-2">
                  <strong>법적 근거</strong>: 소득세법 §89·§94·§95·§104·§118 · 시행령 §154·§155·§159의3 · 조세특례제한법 §69. 참고:{' '}
                  <a href="https://www.hometax.go.kr" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-600 underline dark:text-primary-500">국세청 홈택스</a>,{' '}
                  <a href="https://www.nts.go.kr" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-600 underline dark:text-primary-500">국세청</a>.
                </p>
                <p><strong>업데이트</strong>: {DATE_MODIFIED}</p>
              </section>
            </article>
          </main>
        </div>
        <Footer />
      </div>
    </>
  );
}
