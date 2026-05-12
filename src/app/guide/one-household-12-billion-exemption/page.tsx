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

const URL = 'https://calculatorhost.com/guide/one-household-12-billion-exemption/';
const DATE_PUBLISHED = '2026-05-12';
const DATE_MODIFIED = '2026-05-12';

export const metadata: Metadata = {
  title: '1세대1주택 양도세 12억 한도 완전 정리 2026 | 비례 과세 공식',
  description:
    '1세대1주택 비과세 12억 한도 완전 정리. 12억 초과 시 비례 과세 공식((양도가-12억)/양도가)·거주 요건(조정지역 취득만 2년)·장기보유공제 80% 동시 적용·실제 사례 3개·소득세법 §89·§95.',
  keywords: [
    '1세대1주택 12억 한도',
    '12억 초과 양도세',
    '1세대1주택 비과세 조건',
    '양도세 비례 과세',
    '1세대1주택 거주 요건',
    '조정대상지역 거주',
    '장기보유공제 80%',
    '일시적 2주택 12억',
    '양도세 §89',
    '2026 양도세',
  ],
  alternates: { canonical: URL },
  openGraph: {
    title: '1세대1주택 양도세 12억 한도 완전 정리 2026',
    description: '비례 과세 공식·거주 요건·장기보유공제 80%·실제 사례 3개.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '1세대1주택 12억 한도 완전 정리 2026',
    description: '12억 초과 비례 과세·거주 요건·장기보유공제 80%.',
  },
};

const FAQ_ITEMS = [
  {
    question: '양도가 12억 원 정확히면 전액 비과세인가요?',
    answer:
      '네. 1세대1주택 비과세는 양도가액 12억 원 이하면 양도차익 전액 비과세입니다(소득세법 §89). 12억 원 정확히는 한도 내이므로 비과세. 12억 1원이라도 초과하면 초과분만 비례 과세 시작. 12억은 양도가 기준이며 취득가가 아님에 유의.',
  },
  {
    question: '12억 초과분 양도세는 어떻게 계산하나요?',
    answer:
      '비례 과세 공식: 과세 양도차익 = 양도차익 × (양도가 − 12억) ÷ 양도가. 예: 취득 6억·양도 15억 → 양도차익 9억 × (15억−12억)÷15억 = 9억 × 20% = 1.8억만 과세. 나머지 7.2억은 비과세. 1.8억에 누진세율(38%) − 누진공제(1,994만) ≈ 약 4,846만 원 양도세.',
  },
  {
    question: '거주 요건은 모든 1세대1주택에 적용되나요?',
    answer:
      '아닙니다. 비조정대상지역에서 취득한 주택은 보유 2년만 만족하면 비과세 가능(거주 요건 X). 조정대상지역에서 취득한 주택만 보유 2년 + 거주 2년 의무(시행령 §154). 취득 당시 조정대상지역이었는지가 기준이며, 양도 시점 해제는 영향 없음.',
  },
  {
    question: '12억 초과분에도 장기보유공제 80%가 적용되나요?',
    answer:
      '네. 1세대1주택 비과세 조건 충족 + 보유 10년 이상 + 거주 10년 이상이면 과세 양도차익에 최대 80% 공제(소득세법 §95). 보유 연 4% × 10년 = 40% + 거주 연 4% × 10년 = 40% 합 80%. 예: 과세 양도차익 1.8억 × (1−80%) = 3,600만 과세표준 → 누진 6% 구간으로 약 216만 원 양도세.',
  },
  {
    question: '1세대 합산 기준은 무엇인가요?',
    answer:
      '1세대 = 거주자 + 배우자 + 같은 주소에서 생계를 같이하는 직계존비속·형제자매(소득세법 §89, 시행령 §154의 4). 배우자 소유 주택도 본인 1세대에 합산. 부부 합산 2주택이면 1세대1주택 비과세 불가. 자녀가 혼인·독립 세대주는 별도 세대로 분리.',
  },
];

export default function OneHousehold12BillionGuide() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '1세대1주택 12억 한도 완전 정리' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '1세대1주택 양도세 12억 한도 완전 정리 2026',
    description:
      '1세대1주택 비과세 12억 한도 비례 과세 공식·거주 요건·장기보유공제 80%·실전 사례 3개.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    type: 'Article',
    keywords: ['1세대1주택', '12억 한도', '비례 과세', '거주 요건', '2026'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '1세대1주택 양도세 12억 한도 완전 정리 2026',
    description: '12억 초과 비례 과세·거주 요건·장기보유공제 80%·실전 사례.',
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
                    { name: '1세대1주택 12억 한도 완전 정리' },
                  ]}
                />
                <h1 className="mt-4 text-3xl font-bold text-text-primary md:text-4xl">
                  1세대1주택 양도세 12억 한도 완전 정리 2026
                </h1>
                <p className="mt-3 text-lg text-text-secondary" data-speakable>
                  "양도가 15억이면 15억 전체에 세금?", "12억 초과분 전부 과세?" — 자주 헷갈리는
                  1세대1주택 비과세 12억 한도를 정확히 정리합니다. 12억 초과 시 <strong>비례 과세 공식</strong>으로
                  초과분 일부만 과세되고, 보유·거주 10년 이상이면 장기보유공제 80%까지 동시 적용
                  (소득세법 §89·§95).
                </p>
              </header>

              <AdSlot slot="guide-12bill-top" format="horizontal" />

              {/* 1. 비과세 3가지 조건 */}
              <section aria-label="비과세 조건" className="card">
                <h2 className="mb-4 text-2xl font-semibold">1세대1주택 비과세 3가지 필수 조건</h2>
                <ol className="list-inside list-decimal space-y-3 text-text-secondary" data-speakable>
                  <li>
                    <strong>① 보유 2년 이상</strong> — 취득일(잔금 청산일)부터 양도일까지 만 2년 이상
                    (소득세법 §89, 시행령 §154).
                  </li>
                  <li>
                    <strong>② 거주 요건 (취득 당시 조정대상지역만)</strong> — 비조정대상지역에서 취득한 주택은
                    거주 요건 X (보유 2년만). 조정대상지역에서 취득한 주택만 보유 2년 + 거주 2년.
                    취득 당시 지역이 기준이며 양도 시점 조정 해제는 영향 없음.
                  </li>
                  <li>
                    <strong>③ 양도가 12억 원 이하</strong> — 12억 초과 시 초과분만 비례 과세 (전부 과세 아님).
                    양도가 기준(취득가 아님).
                  </li>
                </ol>
              </section>

              {/* 2. 12억 비례 과세 공식 */}
              <section aria-label="12억 비례 과세 공식" className="card border-l-4 border-l-primary-500">
                <h2 className="mb-4 text-2xl font-semibold">12억 초과 비례 과세 공식</h2>
                <div className="rounded-lg bg-bg-card p-4 font-mono text-sm" data-speakable>
                  과세 양도차익 = 양도차익 × (양도가 − 12억) ÷ 양도가<br />
                  비과세 양도차익 = 양도차익 − 과세 양도차익
                </div>
                <p className="mt-3 text-text-secondary">
                  <strong>흔한 오해</strong>: "12억 초과분 = 양도가 − 12억" 전부가 과세된다? <strong>X</strong>.
                  실제는 양도차익을 양도가 비율로 안분해 일부만 과세.
                </p>
              </section>

              {/* 3. 사례 시뮬 */}
              <section aria-label="사례 시뮬레이션" className="card">
                <h2 className="mb-4 text-2xl font-semibold">실제 사례 3개 — 양도가 12억 / 15억 / 20억</h2>
                <div className="overflow-x-auto" data-speakable>
                  <table className="w-full text-sm">
                    <caption className="sr-only">12억 한도 사례별 양도세</caption>
                    <thead>
                      <tr className="border-b border-border-base text-left">
                        <th className="py-2 pr-4 font-semibold">양도가</th>
                        <th className="py-2 pr-4 font-semibold">취득가</th>
                        <th className="py-2 pr-4 font-semibold">양도차익</th>
                        <th className="py-2 pr-4 font-semibold">과세 비율</th>
                        <th className="py-2 font-semibold">과세 양도차익</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-subtle"><td className="py-2 pr-4">10억</td><td className="py-2 pr-4">3억</td><td className="py-2 pr-4">7억</td><td className="py-2 pr-4">0% (전액 비과세)</td><td className="py-2">0원</td></tr>
                      <tr className="border-b border-border-subtle"><td className="py-2 pr-4">15억</td><td className="py-2 pr-4">6억</td><td className="py-2 pr-4">9억</td><td className="py-2 pr-4">20%</td><td className="py-2">1.8억</td></tr>
                      <tr><td className="py-2 pr-4">20억</td><td className="py-2 pr-4">5억</td><td className="py-2 pr-4">15억</td><td className="py-2 pr-4">40%</td><td className="py-2">6억</td></tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-3 text-sm text-text-tertiary">
                  계산: 과세 비율 = (양도가 − 12억) ÷ 양도가. 15억 사례 → 9억 × 20% = 1.8억 과세 → 누진세 38% − 누진공제 1,994만 ≈ 약 4,846만 원 양도세 (지방세 별도).
                </p>
              </section>

              <AdSlot slot="guide-12bill-mid" format="rectangle" />

              {/* 4. FAQ */}
              <FaqSection items={[...FAQ_ITEMS]} />

              {/* 5. 장기보유공제 80% */}
              <section aria-label="장기보유공제 80%" className="card">
                <h2 className="mb-4 text-2xl font-semibold">12억 초과분 + 장기보유공제 80% 동시 적용</h2>
                <p className="mb-3 text-text-secondary" data-speakable>
                  1세대1주택 비과세 조건 충족 + 보유 10년 이상 + 거주 10년 이상이면 <strong>과세 양도차익에
                  최대 80% 장기보유공제</strong>(소득세법 §95). 보유 연 4% × 최대 40% + 거주 연 4% × 최대 40% = 합 80%.
                </p>
                <div className="rounded-lg bg-bg-card p-4 text-sm text-text-secondary">
                  <p className="mb-2"><strong className="text-text-primary">사례</strong>: 양도가 15억, 취득가 6억, 보유 10년 + 거주 10년</p>
                  <ul className="list-inside list-disc space-y-1">
                    <li>양도차익 9억 → 12억 비례 과세 → 과세 양도차익 1.8억</li>
                    <li>장기보유공제 80% → 1.8억 × (1−80%) = 3,600만 원 과세표준</li>
                    <li>누진 6% 구간 → 약 216만 원 양도세 + 지방세 10%</li>
                  </ul>
                </div>
                <p className="mt-3 text-sm text-text-tertiary">
                  공제 미적용 (15억 사례) 양도세 약 4,846만 원과 비교 시 4,600만 원 절세. 거주 기간 단절 X 주의 (이사 후 재입주는 단절).
                </p>
              </section>

              {/* 6. 1세대 정의 */}
              <section aria-label="1세대 정의" className="card">
                <h2 className="mb-4 text-2xl font-semibold">1세대 합산 기준</h2>
                <p className="text-text-secondary">
                  1세대 = 거주자 + 배우자 + 같은 주소에서 생계를 같이하는 직계존비속·형제자매(소득세법 §89, 시행령 §154의 4).
                  배우자 소유 주택도 본인 1세대에 합산되므로 부부 합산 2주택이면 비과세 불가.
                  자녀가 혼인·독립 세대주(주민등록 분리)면 별도 세대로 분리.
                </p>
              </section>

              {/* 7. 주의사항 */}
              <section aria-label="주의사항" className="card border-l-4 border-l-danger-500">
                <h2 className="mb-3 text-xl font-semibold">⚠️ 주의사항</h2>
                <ul className="list-inside list-disc space-y-1.5 text-sm text-text-secondary">
                  <li>거주 요건은 <strong>취득 당시 조정대상지역</strong> 여부가 기준 — 양도 시점 해제는 영향 없음.</li>
                  <li>거주 입증 자료(주민등록등본·공과금 명세) 사전 준비 — 단순 주소 이전만으로는 인정 X.</li>
                  <li>배우자 소유 주택은 1세대에 합산. 부모·자녀와 같은 주소면 합산 가능성.</li>
                  <li>1세대1주택 비과세 적용 시 양도소득 기본공제 250만 원 별도 적용 X (시행령 §154의 8).</li>
                  <li>일시적 2주택 비과세 특례 적용 시에도 12억 한도 동일 적용(시행령 §155).</li>
                </ul>
              </section>

              {/* 8. 관련 계산기·가이드 */}
              <section aria-label="관련 계산기·가이드" className="card">
                <h2 className="mb-4 text-2xl font-semibold">관련 계산기·가이드</h2>
                <ul className="space-y-2 text-text-secondary">
                  <li>→ <Link href="/calculator/capital-gains-tax/" className="text-primary-600 underline dark:text-primary-500">양도소득세 계산기</Link> — 12억 한도 시뮬</li>
                  <li>→ <Link href="/guide/capital-gains-tax-tips/" className="text-primary-600 underline dark:text-primary-500">양도세 절세 7가지</Link> — 추가 절세 전략</li>
                  <li>→ <Link href="/guide/august-capital-gains-tax-review/" className="text-primary-600 underline dark:text-primary-500">8월 양도세 검토 가이드</Link> — 일시적2주택 D-day·장기보유 80%</li>
                  <li>→ <Link href="/guide/december-capital-gains-tax-deadline/" className="text-primary-600 underline dark:text-primary-500">12월 양도세 마감 가이드</Link> — 연말 매도 결정</li>
                  <li>→ <Link href="/guide/presale-right-capital-gains-tax/" className="text-primary-600 underline dark:text-primary-500">분양권 양도세</Link> — 70%/60% 고정세율</li>
                </ul>
              </section>

              <ShareButtons title="1세대1주택 양도세 12억 한도 완전 정리 2026" url={URL} description="12억 초과 비례 과세·거주 요건·장기보유공제 80%." />

              {/* 출처·면책 */}
              <section
                aria-label="출처 및 면책"
                className="rounded-lg border border-border-base p-4 text-caption text-text-tertiary"
              >
                <p className="mb-2">
                  <strong>법적 근거</strong>: 소득세법 §89 (1세대1주택 비과세) · §94 (양도소득) · §95 (장기보유특별공제) · §98 (양도일) · §103 (양도소득 기본공제) · §104 (양도세율) · §118 (예정신고) · 시행령 §154 (1세대1주택 범위·거주 요건) · §154의 4 (1세대 정의) · §154의 8 (기본공제 X) · §155 (일시적 2주택). 참고: <a href="https://www.hometax.go.kr" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-600 underline dark:text-primary-500">홈택스</a>, <a href="https://www.nts.go.kr" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-600 underline dark:text-primary-500">국세청</a>, <a href="https://www.law.go.kr" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-600 underline dark:text-primary-500">법령정보센터</a>.
                </p>
                <p className="mb-2">
                  <strong>면책조항</strong>: 본 가이드는 일반 정보 제공 목적이며 세무·법적 조언이 아닙니다. 일시적 2주택, 상속·증여, 거주 기간 단절 등 개별 사정에 따라 적용이 달라지므로 반드시 세무사 또는 국세청 상담을 통해 확정하시기 바랍니다.
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
