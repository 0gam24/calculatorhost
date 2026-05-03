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

const URL = 'https://calculatorhost.com/guide/dsr-regulation-zones/';
const DATE_PUBLISHED = '2026-05-03';
const DATE_MODIFIED = '2026-05-03';

export const metadata: Metadata = {
  title: '비규제·조정·투기과열지역 DSR·LTV 규제 완전 정리 2026 | calculatorhost',
  description:
    '2026년 비규제지역, 조정대상지역, 투기과열지구별 DSR·LTV·DTI 규제 차이를 한눈에. 스트레스 DSR 1.5%p 풀 적용 + 생애최초 우대 + 다주택 중과까지 모든 규제 비교표.',
  keywords: ['DSR 규제지역', '조정대상지역 DSR', '투기과열지구 LTV', '비규제지역 DSR', '스트레스 DSR', '생애최초 LTV', '다주택자 LTV'],
  alternates: { canonical: URL },
  openGraph: {
    title: 'DSR·LTV 규제지역별 완전 정리 (2026)',
    description: '비규제·조정·투기과열지역 DSR·LTV 차이 + 스트레스 DSR 적용.',
    url: URL,
    type: 'article',
    images: ['/og-default.png'],
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
};

const FAQ_ITEMS = [
  {
    question: '2026년 현재 조정대상지역은 어디인가요?',
    answer:
      '2024년 1월 이후 대부분 조정대상지역이 해제되어 2026년 5월 기준 서울 강남·서초·송파·용산구만 조정대상지역으로 지정되어 있습니다. 정책 변경 잦으니 거래 직전 국토교통부 또는 대한민국공보처 공식 발표 확인 필수.',
  },
  {
    question: '비규제지역과 조정대상지역의 LTV 차이는?',
    answer:
      '비규제지역 일반 70%, 생애최초 80%. 조정대상지역 일반 50%, 생애최초 70% (2026 기준). 같은 6억 주택을 비규제 vs 조정에서 사면 대출 한도가 약 1.2억 원 차이.',
  },
  {
    question: '스트레스 DSR 1.5%p 가산은 모든 대출에 적용되나요?',
    answer:
      '변동금리·혼합형(고정→변동)·주기형(주기 변동) 대출에 적용. 전 기간 고정금리는 가산 없음. 정책서민금융상품 일부는 면제. 2026년 풀 적용으로 변동·혼합·주기형은 현재 금리 + 1.5%p로 DSR 산정.',
  },
  {
    question: '생애최초 구매자는 DSR 우대도 받나요?',
    answer:
      '아니요. 생애최초는 LTV 우대(비규제 80%, 조정 70%)만 있고 DSR 우대는 없습니다. 즉 LTV로는 더 많이 빌릴 수 있어도 DSR 40%(은행) 한도는 동일하게 적용. 결과적으로 DSR이 결정적 제약이 되는 경우 많음.',
  },
  {
    question: '투기과열지구는 별도 규제가 있나요?',
    answer:
      '투기과열지구는 조정대상지역의 상위 개념으로 LTV·DSR 가장 엄격. 2026년 현재 강남 일부 지정. 9억 초과 주택의 경우 LTV 추가 제한 (9억 이하 부분 50%, 9억~15억 30%, 15억 초과 0%).',
  },
  {
    question: '다주택자는 어떻게 규제가 강화되나요?',
    answer:
      '조정대상지역 다주택자는 신규 주택 취득 시 LTV 0% (담보대출 불가). 비규제지역은 일반 LTV 적용되나 DSR이 더 빡세짐(기존 대출 누적). 또한 다주택자 양도세 중과 +20~30%p 별도.',
  },
];

export default function DsrRegulationZonesPage() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: 'DSR·LTV 규제지역 정리' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: 'DSR·LTV 규제지역별 완전 정리 (2026)',
    description: '비규제·조정·투기과열지역 DSR·LTV 차이 + 스트레스 DSR 풀 적용 종합.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['DSR', 'LTV', '조정대상지역', '투기과열지구', '스트레스 DSR'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '비규제·조정·투기과열지역 DSR·LTV 규제 완전 정리 2026',
    description: '2026년 비규제지역, 조정대상지역, 투기과열지구별 DSR·LTV·DTI 규제 차이를 한눈에. 스트레스 DSR 1.5%p 풀 적용 + 생애최초 우대 + 다주택 중과까지 모든 규제 비교표.',
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
                    { name: 'DSR·LTV 규제지역 정리' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">금융 · 8분 읽기 · 2026-05-03</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  비규제·조정·투기과열 DSR·LTV 규제 완전 정리 (2026)
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  같은 주택이라도 위치(비규제·조정·투기과열)에 따라 대출 한도가 1억 원 이상 차이 납니다.
                  2026년 스트레스 DSR 풀 적용 + 생애최초 우대 + 다주택 중과까지 모든 규제를 한 페이지에 정리합니다.
                </p>
              </header>

              <AdSlot slot="guide-dsr-zones-top" format="horizontal" />

              <section aria-label="규제 비교표" className="card border-l-4 border-l-primary-500">
                <h2 className="mb-3 text-xl font-bold">2026년 지역별 LTV·DSR·DTI 비교표</h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse" data-speakable>
                    <caption className="sr-only">2026년 지역별 부동산 대출 규제 비교</caption>
                    <thead>
                      <tr className="bg-primary-500/10 border border-border-base">
                        <th className="px-3 py-2 text-left">규제</th>
                        <th className="px-3 py-2 text-right">비규제지역</th>
                        <th className="px-3 py-2 text-right">조정대상지역</th>
                        <th className="px-3 py-2 text-right">투기과열지구</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border border-border-base">
                        <td className="px-3 py-2 font-semibold">LTV (일반)</td>
                        <td className="px-3 py-2 text-right">70%</td>
                        <td className="px-3 py-2 text-right">50%</td>
                        <td className="px-3 py-2 text-right">40%</td>
                      </tr>
                      <tr className="border border-border-base">
                        <td className="px-3 py-2 font-semibold">LTV (생애최초)</td>
                        <td className="px-3 py-2 text-right">80%</td>
                        <td className="px-3 py-2 text-right">70%</td>
                        <td className="px-3 py-2 text-right">60%</td>
                      </tr>
                      <tr className="border border-border-base">
                        <td className="px-3 py-2 font-semibold">LTV (다주택자)</td>
                        <td className="px-3 py-2 text-right">70%</td>
                        <td className="px-3 py-2 text-right text-danger-500">0% (불가)</td>
                        <td className="px-3 py-2 text-right text-danger-500">0% (불가)</td>
                      </tr>
                      <tr className="border border-border-base bg-bg-raised/30">
                        <td className="px-3 py-2 font-semibold">DSR (은행)</td>
                        <td className="px-3 py-2 text-right">40%</td>
                        <td className="px-3 py-2 text-right">40%</td>
                        <td className="px-3 py-2 text-right">40%</td>
                      </tr>
                      <tr className="border border-border-base bg-bg-raised/30">
                        <td className="px-3 py-2 font-semibold">DSR (2금융권)</td>
                        <td className="px-3 py-2 text-right">50%</td>
                        <td className="px-3 py-2 text-right">50%</td>
                        <td className="px-3 py-2 text-right">50%</td>
                      </tr>
                      <tr className="border border-border-base bg-bg-raised/30">
                        <td className="px-3 py-2 font-semibold">스트레스 DSR</td>
                        <td className="px-3 py-2 text-right">+1.5%p</td>
                        <td className="px-3 py-2 text-right">+1.5%p</td>
                        <td className="px-3 py-2 text-right">+1.5%p</td>
                      </tr>
                      <tr className="border border-border-base">
                        <td className="px-3 py-2 font-semibold">DTI</td>
                        <td className="px-3 py-2 text-right">50%</td>
                        <td className="px-3 py-2 text-right">40%</td>
                        <td className="px-3 py-2 text-right">40%</td>
                      </tr>
                      <tr className="border border-border-base">
                        <td className="px-3 py-2 font-semibold">9억 초과 LTV (투기과열)</td>
                        <td className="px-3 py-2 text-right">—</td>
                        <td className="px-3 py-2 text-right">—</td>
                        <td className="px-3 py-2 text-right text-xs">9억↓ 50% / 9~15억 30% / 15억↑ 0%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-3 text-xs text-text-tertiary">
                  ※ 2026년 5월 기준. 정책 변경 잦으니 거래 직전 국토교통부·금융위원회·금융감독원 공식 발표 확인 필수.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">시나리오별 대출 한도 비교</h2>

                <div className="rounded-lg border border-border-base bg-bg-card p-5">
                  <h3 className="mb-2 font-semibold text-text-primary">📌 시나리오 1. 6억 주택 매매 (생애최초·연소득 6,000만)</h3>
                  <ul className="text-sm text-text-secondary space-y-1">
                    <li>• <strong>비규제지역</strong>: LTV 80% × 6억 = 4.8억 (단, DSR 40% 한도 내)</li>
                    <li>• <strong>조정대상지역</strong>: LTV 70% × 6억 = 4.2억</li>
                    <li>• <strong>투기과열지구</strong>: LTV 60% × 6억 = 3.6억</li>
                  </ul>
                  <p className="mt-3 text-sm text-text-secondary">
                    DSR 적용 시: 변동금리 4% + 1.5%p 스트레스 = 5.5% 산정 → 한도 약 3.3~3.5억 수준 (DSR 결정적)
                  </p>
                </div>

                <div className="rounded-lg border border-border-base bg-bg-card p-5">
                  <h3 className="mb-2 font-semibold text-text-primary">📌 시나리오 2. 12억 주택 매매 (1주택자·연소득 1.2억)</h3>
                  <ul className="text-sm text-text-secondary space-y-1">
                    <li>• <strong>비규제지역</strong>: LTV 70% × 12억 = 8.4억 (DSR 한도 약 7억 추정)</li>
                    <li>• <strong>조정대상지역</strong>: LTV 50% × 12억 = 6억</li>
                    <li>• <strong>투기과열지구</strong>: 9억↓ 50% (4.5억) + 9~12억 30% (9천만) = 5.4억</li>
                  </ul>
                </div>

                <div className="rounded-lg border-l-4 border-l-danger-500 bg-danger-500/5 p-4">
                  <p className="text-sm text-danger-700 dark:text-danger-300">
                    <strong>⚠️ 다주택자 주의</strong>: 조정대상지역·투기과열지구 다주택자는 LTV 0% — 신규 주택담보대출 불가.
                    유일한 대안은 신용대출(별도 DSR 영향) 또는 해당 지역 외 매수.
                  </p>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">스트레스 DSR — 변동금리 한도 큰 영향</h2>
                <p className="text-text-secondary leading-relaxed">
                  2026년 스트레스 DSR 풀 적용으로 변동·혼합·주기형 대출은 <strong>현재 금리 + 1.5%p</strong>로
                  DSR 산정. 같은 4.0% 금리라도 고정 vs 변동 한도가 약 15~20% 차이.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <thead>
                      <tr className="bg-primary-500/10 border border-border-base">
                        <th className="px-3 py-2 text-left">금리 유형</th>
                        <th className="px-3 py-2 text-right">DSR 산정 금리</th>
                        <th className="px-3 py-2 text-right">연소득 6,000만 기준 한도</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border border-border-base">
                        <td className="px-3 py-2">고정금리 (전 기간)</td>
                        <td className="px-3 py-2 text-right">4.0%</td>
                        <td className="px-3 py-2 text-right tabular-nums">약 4.0억</td>
                      </tr>
                      <tr className="border border-border-base">
                        <td className="px-3 py-2">혼합형 (5년 고정→변동)</td>
                        <td className="px-3 py-2 text-right">5.5% (+1.5%p)</td>
                        <td className="px-3 py-2 text-right tabular-nums">약 3.4억 (-15%)</td>
                      </tr>
                      <tr className="border border-border-base">
                        <td className="px-3 py-2">변동금리</td>
                        <td className="px-3 py-2 text-right">5.5% (+1.5%p)</td>
                        <td className="px-3 py-2 text-right tabular-nums">약 3.4억 (-15%)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              <FaqSection items={FAQ_ITEMS} />

              <section className="card border-l-4 border-l-danger-500 bg-danger-500/5">
                <h2 className="mb-2 text-lg font-semibold text-danger-700 dark:text-danger-300">⚠️ 주의사항</h2>
                <ul className="space-y-2 text-sm text-danger-700 dark:text-danger-300">
                  <li>• 본 표는 2026년 5월 기준 — 조정대상지역·투기과열지구 지정·해제 잦으니 거래 직전 확인 필수.</li>
                  <li>• 실제 한도는 금융기관 내부 기준·신용평점·소득 증빙 방식에 따라 달라집니다.</li>
                  <li>• 본 가이드는 일반론이며 개별 상담은 금융기관 또는 모기지 전문가에게 받으세요.</li>
                </ul>
              </section>

              <section className="card">
                <h2 className="mb-3 text-lg font-semibold">관련 도구</h2>
                <ul className="space-y-2 text-sm">
                  <li>→ <Link href="/calculator/loan-limit/" className="text-primary-600 underline dark:text-primary-500">대출한도 계산기 (DSR/LTV/DTI)</Link></li>
                  <li>→ <Link href="/calculator/loan/" className="text-primary-600 underline dark:text-primary-500">대출이자 계산기</Link></li>
                  <li>→ <Link href="/guide/dsr-loan-limit-tips/" className="text-primary-600 underline dark:text-primary-500">DSR 한도 늘리는 5가지 방법</Link></li>
                  <li>→ <Link href="/glossary/" className="text-primary-600 underline dark:text-primary-500">용어사전 — DSR·LTV·DTI·스트레스 DSR</Link></li>
                </ul>
              </section>

              <section
                aria-label="출처 및 면책"
                className="rounded-lg border border-border-base p-4 text-caption text-text-tertiary"
              >
                <p className="mb-2">
                  <strong>법적 근거</strong>: 은행법 시행령 §24의4 ·{' '}
                  <a href="https://www.fss.or.kr" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-600 underline dark:text-primary-500">금융감독원</a> 주택담보대출 규제 고시 ·{' '}
                  <a href="https://www.molit.go.kr" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-600 underline dark:text-primary-500">국토교통부</a> 조정대상지역 지정 고시.
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
