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

const URL = 'https://calculatorhost.com/guide/inheritance-tax-10-year-prior-gift-aggregation/';
const DATE_PUBLISHED = '2026-05-12';
const DATE_MODIFIED = '2026-05-12';

export const metadata: Metadata = {
  title: '상속세 사전 증여 합산 10년/5년 완벽 정리 2026 | 절세 시뮬',
  description:
    '상속개시일 이전 10년(상속인) / 5년(비상속인) 이내 증여재산은 상속재산에 합산(상증법 §13). 합산 평가는 증여 당시 가액·납부 증여세 공제·10년 초과 증여로 합산 회피·세율 5단계·증여공제 한도 정리.',
  keywords: [
    '상속세 사전 증여',
    '10년 합산',
    '5년 합산',
    '상속인 비상속인',
    '증여재산공제',
    '배우자 6억',
    '상속세 누진세율',
    '상속세 절세',
    '상속세 §13',
    '2026 상속세',
  ],
  alternates: { canonical: URL },
  openGraph: {
    title: '상속세 사전 증여 합산 10년/5년 완벽 정리 2026',
    description: '10년/5년 합산 차이·증여 당시 평가액·이중과세 공제·10년 초과 증여 절세.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '상속세 사전 증여 합산 10년/5년 완벽 정리 2026',
    description: '상속인 10년·비상속인 5년 합산·이중과세 공제·10년 초과 절세.',
  },
};

const FAQ_ITEMS = [
  {
    question: '사전 증여가 상속세 합산되는 기간은 정확히 얼마인가요?',
    answer:
      '상속인(배우자·직계비속·직계존속)은 상속개시일 이전 10년 이내, 비상속인(며느리·사위·손주 등)은 5년 이내 증여재산이 상속재산에 합산됩니다(상증법 §13). 사망일 기준 정확히 일자 계산. 10년 1일 초과면 합산 X. 누가 받았는지(상속인 vs 비상속인)에 따라 합산 기간 다름.',
  },
  {
    question: '합산되는 증여재산은 현재가치로 평가하나요?',
    answer:
      '아닙니다. 합산되는 평가액은 <strong>증여 당시 평가액</strong>(시가 또는 보충적 평가액) 기준입니다(상증법 §13). 증여 후 가치가 올랐거나 내렸어도 증여 당시 가액으로 합산. 예: 2019년 5억으로 증여한 아파트가 2026년 8억이어도 합산은 5억으로.',
  },
  {
    question: '이미 납부한 증여세는 상속세에서 공제되나요?',
    answer:
      '네, 이중과세 방지를 위해 합산 증여재산에 대해 이미 낸 증여세를 상속세에서 공제합니다(상증법 §28). 단 공제 한도는 합산 증여재산의 산출세액 비율 한도 내. 정확한 산정은 상속세 신고 시 세무사 확인 필수.',
  },
  {
    question: '10년 초과한 증여는 상속세에 영향을 주지 않나요?',
    answer:
      '네, 상속개시일 기준 10년 초과 증여(상속인) 또는 5년 초과 증여(비상속인)는 합산 X. 핵심 절세 전략: 60대 부모가 70대 후반 사망 예상 시, 60대 초반에 증여하면 10년 경과로 합산 회피. 단 갑작스러운 임종 직전 증여는 국세청 추적·소명 요구 가능.',
  },
  {
    question: '배우자에게 6억까지 증여하면 무세금인가요?',
    answer:
      '네, 배우자 증여 공제 6억 원/10년(상증법 §53). 10년 합산 6억까지 증여세 0. 단 상속 시 사망일 이전 10년 이내 증여분이라면 이 6억도 상속재산에 합산되어 상속세 과세표준에 포함. 배우자 상속세 공제(최소 5억~최대 30억)는 별도로 추가 적용.',
  },
];

export default function InheritanceTax10YearGuide() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '상속세 사전 증여 합산 10년/5년' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '상속세 사전 증여 합산 10년/5년 완벽 정리 2026',
    description:
      '상속개시일 이전 10년/5년 증여재산 합산 규정·증여 당시 평가액·이중과세 공제·10년 초과 절세 전략.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    type: 'Article',
    keywords: ['상속세', '사전 증여', '10년 합산', '2026'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '상속세 사전 증여 합산 10년/5년 완벽 정리 2026',
    description: '10년/5년 합산 차이·평가액·이중과세 공제·10년 초과 절세.',
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
                    { name: '상속세 사전 증여 합산 10년/5년' },
                  ]}
                />
                <h1 className="mt-4 text-3xl font-bold text-text-primary md:text-4xl">
                  상속세 사전 증여 합산 10년/5년 완벽 정리 2026
                </h1>
                <p className="mt-3 text-lg text-text-secondary" data-speakable>
                  상속개시일(사망일) 이전 일정 기간 내 증여재산은 상속재산에 합산되어 상속세 과세 대상이 됩니다
                  (상증법 §13). 상속인은 <strong>10년</strong>, 비상속인은 <strong>5년</strong>. 10년 초과 증여는
                  합산 X — 사전 증여 절세의 핵심. 합산 평가는 증여 당시 가액 기준이며 이미 낸 증여세는 상속세에서
                  공제(§28).
                </p>
              </header>

              <AdSlot slot="guide-inherit-10yr-top" format="horizontal" />

              {/* 1. 10년 vs 5년 차이 */}
              <section aria-label="10년 vs 5년" className="card">
                <h2 className="mb-4 text-2xl font-semibold">상속인 10년 vs 비상속인 5년 합산</h2>
                <div className="overflow-x-auto" data-speakable>
                  <table className="w-full text-sm">
                    <caption className="sr-only">사전 증여 합산 기간</caption>
                    <thead>
                      <tr className="border-b border-border-base text-left">
                        <th className="py-2 pr-4 font-semibold">수증자 분류</th>
                        <th className="py-2 pr-4 font-semibold">합산 기간</th>
                        <th className="py-2 font-semibold">대상</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-subtle"><td className="py-2 pr-4">상속인</td><td className="py-2 pr-4">사망일 이전 10년</td><td className="py-2">배우자·직계비속(자녀·손주가 대습)·직계존속</td></tr>
                      <tr><td className="py-2 pr-4">비상속인</td><td className="py-2 pr-4">사망일 이전 5년</td><td className="py-2">며느리·사위·손주(직계비속 대습 X)·조카</td></tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-3 text-sm text-text-tertiary">
                  근거: 상증법 §13 (증여재산 합산). 사망일 정확한 날짜 기준이며 1일이라도 초과 시 합산 X.
                </p>
              </section>

              {/* 2. 합산 평가 + 이중과세 공제 */}
              <section aria-label="합산 평가 + 공제" className="card border-l-4 border-l-primary-500">
                <h2 className="mb-4 text-2xl font-semibold">합산 평가액 + 이중과세 공제</h2>
                <div className="space-y-3 text-text-secondary">
                  <p data-speakable>
                    <strong className="text-text-primary">평가 기준</strong>: 증여 당시 평가액(시가 또는 보충적 평가액)으로 합산
                    (상증법 §13). 증여 이후 가치 변동(상승·하락)은 무시.
                  </p>
                  <p>
                    <strong className="text-text-primary">이중과세 공제</strong>: 합산되는 증여재산에 대해 이미 납부한 증여세는
                    상속세에서 공제(§28). 공제 한도는 합산 증여재산의 산출세액 비율 한도 내.
                  </p>
                </div>
              </section>

              {/* 3. 상속세 누진세율 5단계 */}
              <section aria-label="상속세 누진세율" className="card">
                <h2 className="mb-4 text-2xl font-semibold">상속세 누진세율 5단계 (상증법 §26)</h2>
                <div className="overflow-x-auto" data-speakable>
                  <table className="w-full text-sm">
                    <caption className="sr-only">상속세 누진세율</caption>
                    <thead>
                      <tr className="border-b border-border-base text-left">
                        <th className="py-2 pr-4 font-semibold">과세표준</th>
                        <th className="py-2 pr-4 font-semibold">세율</th>
                        <th className="py-2 font-semibold">누진공제</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-subtle"><td className="py-2 pr-4">1억 이하</td><td className="py-2 pr-4">10%</td><td className="py-2">0</td></tr>
                      <tr className="border-b border-border-subtle"><td className="py-2 pr-4">1억~5억</td><td className="py-2 pr-4">20%</td><td className="py-2">1,000만</td></tr>
                      <tr className="border-b border-border-subtle"><td className="py-2 pr-4">5억~10억</td><td className="py-2 pr-4">30%</td><td className="py-2">6,000만</td></tr>
                      <tr className="border-b border-border-subtle"><td className="py-2 pr-4">10억~30억</td><td className="py-2 pr-4">40%</td><td className="py-2">1억 6,000만</td></tr>
                      <tr><td className="py-2 pr-4">30억 초과</td><td className="py-2 pr-4">50%</td><td className="py-2">4억 6,000만</td></tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-3 text-sm text-text-tertiary">
                  계산: 과세표준 × 세율 − 누진공제. 예: 5억 → 5억 × 20% − 1,000만 = 9,000만 원.
                </p>
              </section>

              <AdSlot slot="guide-inherit-10yr-mid" format="rectangle" />

              {/* 4. FAQ */}
              <FaqSection items={[...FAQ_ITEMS]} />

              {/* 5. 증여재산 공제 10년 한도 */}
              <section aria-label="증여재산 공제 10년" className="card">
                <h2 className="mb-4 text-2xl font-semibold">증여재산 공제 10년 한도</h2>
                <div className="overflow-x-auto" data-speakable>
                  <table className="w-full text-sm">
                    <caption className="sr-only">증여재산 공제</caption>
                    <thead>
                      <tr className="border-b border-border-base text-left">
                        <th className="py-2 pr-4 font-semibold">관계</th>
                        <th className="py-2 font-semibold">10년 누적 공제</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-subtle"><td className="py-2 pr-4">배우자</td><td className="py-2">6억</td></tr>
                      <tr className="border-b border-border-subtle"><td className="py-2 pr-4">성년 직계비속(자녀)</td><td className="py-2">5,000만</td></tr>
                      <tr className="border-b border-border-subtle"><td className="py-2 pr-4">미성년 직계비속</td><td className="py-2">2,000만</td></tr>
                      <tr className="border-b border-border-subtle"><td className="py-2 pr-4">직계존속(부모)</td><td className="py-2">5,000만</td></tr>
                      <tr><td className="py-2 pr-4">기타 친족</td><td className="py-2">1,000만</td></tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-3 text-sm text-text-tertiary">
                  근거: 상증법 §53. 10년 단위 합산. 공제 범위 내 증여는 증여세 0이지만, 상속 시 합산 대상에 포함됨에 유의.
                </p>
              </section>

              {/* 6. 사전 증여 시뮬 */}
              <section aria-label="사전 증여 시뮬" className="card border-l-4 border-l-secondary-500">
                <h2 className="mb-4 text-2xl font-semibold">30억 자산 사전 증여 시뮬</h2>
                <div className="space-y-3 text-text-secondary">
                  <div data-speakable>
                    <h3 className="font-semibold text-text-primary">전략 1: 사전 증여 없음 (사망 시 일괄 상속)</h3>
                    <ul className="list-inside list-disc text-sm space-y-1">
                      <li>상속재산 30억 − 일괄공제 5억 = 과세표준 25억</li>
                      <li>25억 × 40% − 1.6억 = 약 8.4억 상속세</li>
                    </ul>
                  </div>
                  <div data-speakable>
                    <h3 className="font-semibold text-text-primary">전략 2: 60대부터 10년 분산 증여</h3>
                    <ul className="list-inside list-disc text-sm space-y-1">
                      <li>60세에 자녀 2명·배우자에 6.5억 증여 (공제 범위)</li>
                      <li>70세 사망 시 상속재산 23.5억 − 공제 5억 = 18.5억 과세표준</li>
                      <li>증여 10년 경과 → 합산 X → 상속세 과세 대상 23.5억만</li>
                      <li>약 5.8억 상속세 → <strong>약 2.6억 절세</strong></li>
                    </ul>
                  </div>
                  <p className="text-sm text-text-tertiary">
                    실제 절세 효과는 가족 구성·배우자 공제(§19)·자녀 공제(§20)·일괄공제 5억 등에 따라 변동.
                    정확한 시뮬은 세무사·상속세 계산기로 확인.
                  </p>
                </div>
              </section>

              {/* 7. 10년 초과 절세 핵심 */}
              <section aria-label="10년 초과 절세" className="card">
                <h2 className="mb-4 text-2xl font-semibold">10년 초과 증여 — 핵심 절세 전략</h2>
                <p className="mb-3 text-text-secondary" data-speakable>
                  상속개시일 기준 10년 초과 증여는 상속재산에 합산되지 않습니다. 따라서 충분한 시간을 두고
                  사전 증여하면 합산 자체를 회피 가능. 60대 초반부터 자산 분산 증여 시작이 가장 효과적.
                </p>
                <ul className="list-inside list-disc space-y-1.5 text-sm text-text-secondary">
                  <li>증여 시점 = 잔금 청산일 또는 명의 이전일</li>
                  <li>국세청은 사망 임박 직전 증여를 조세 회피로 추적·소명 요구 가능</li>
                  <li>평소 꾸준한 증여 실적이 절세 신뢰성 확보의 핵심</li>
                </ul>
              </section>

              {/* 8. 주의사항 */}
              <section aria-label="주의사항" className="card border-l-4 border-l-danger-500">
                <h2 className="mb-3 text-xl font-semibold">⚠️ 주의사항</h2>
                <ul className="list-inside list-disc space-y-1.5 text-sm text-text-secondary">
                  <li>증여 후 관계 단절(사실상 증여로 보기 어려운 경우) 국세청 추적 가능.</li>
                  <li>배우자 증여 공제 6억은 10년 누적 — 매년 6억 X.</li>
                  <li>상속세 신고 기한: 사망일 속한 달 말일부터 6개월 (상증법 §67).</li>
                  <li>이중과세 공제 한도 산정 복잡 — 세무사 상담 필수.</li>
                  <li>해외 거주 상속인은 별도 규정 적용.</li>
                </ul>
              </section>

              {/* 9. 관련 가이드·계산기 */}
              <section aria-label="관련 가이드·계산기" className="card">
                <h2 className="mb-4 text-2xl font-semibold">관련 가이드·계산기</h2>
                <ul className="space-y-2 text-text-secondary">
                  <li>→ <Link href="/calculator/inheritance-tax/" className="text-primary-600 underline dark:text-primary-500">상속세 계산기</Link> — 실제 상속세 시뮬</li>
                  <li>→ <Link href="/calculator/gift-tax/" className="text-primary-600 underline dark:text-primary-500">증여세 계산기</Link> — 증여 단계별 부담</li>
                  <li>→ <Link href="/guide/joint-ownership-couple-capital-gains-tax-savings/" className="text-primary-600 underline dark:text-primary-500">부부 공동명의 양도세 절세</Link> — 사전 증여 후 매도 이월 과세</li>
                  <li>→ <Link href="/guide/one-household-12-billion-exemption/" className="text-primary-600 underline dark:text-primary-500">1세대1주택 12억 한도</Link></li>
                </ul>
              </section>

              <ShareButtons title="상속세 사전 증여 합산 10년/5년 완벽 정리 2026" url={URL} description="10년 합산·이중과세 공제·10년 초과 절세 전략." />

              {/* 출처·면책 */}
              <section
                aria-label="출처 및 면책"
                className="rounded-lg border border-border-base p-4 text-caption text-text-tertiary"
              >
                <p className="mb-2">
                  <strong>법적 근거</strong>: 상속세 및 증여세법 §13 (증여재산 합산) · §19 (배우자 상속공제) · §20 (그 밖의 인적공제 — 자녀·연로자·미성년자·장애인) · §21 (일괄공제 5억) · §26 (상속세율) · §28 (증여세액공제) · §53 (증여재산 공제 — 배우자·직계비속) · §56 (증여세율) · §67 (상속세 신고 기한 6개월). 참고: <a href="https://www.hometax.go.kr" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-600 underline dark:text-primary-500">홈택스</a>, <a href="https://www.nts.go.kr" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-600 underline dark:text-primary-500">국세청</a>, <a href="https://www.law.go.kr" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-600 underline dark:text-primary-500">법령정보센터</a>.
                </p>
                <p className="mb-2">
                  <strong>면책조항</strong>: 본 가이드는 일반 정보 제공 목적이며 세무·법적 조언이 아닙니다. 가족 구성·해외 거주·법인 자산 등 개별 사정에 따라 적용이 달라지므로 반드시 세무사 또는 국세청 상담을 통해 확정하시기 바랍니다. 사전 증여 전략은 증여세 + 양도세 + 상속세 종합 비교 필수.
                </p>
                <p>
                  <strong>업데이트</strong>: {DATE_MODIFIED} · 작성·검수: 김준혁 (스마트데이터샵). 본 가이드는 AI 보조 작성 후 운영자 검수 발행되었습니다.
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
