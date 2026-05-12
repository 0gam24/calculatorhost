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

const URL = 'https://calculatorhost.com/guide/presale-right-capital-gains-tax/';
const DATE_PUBLISHED = '2026-05-12';
const DATE_MODIFIED = '2026-05-12';

export const metadata: Metadata = {
  title: '분양권 양도세 완전 정리 2026 | 70% / 60% 고정세율 + 입주권 차이',
  description:
    '분양권 양도세 1년 미만 70% / 1년 이상 60% 고정세율(소득세법 §104). 누진세 미적용·1세대1주택 비과세 X·장기보유공제 X. 입주권·주택과 차이, 보유기간 기산점, 신고 기한까지 한 페이지에 정리.',
  keywords: [
    '분양권 양도세',
    '분양권 70%',
    '분양권 60%',
    '분양권 세율',
    '분양권 양도소득세',
    '입주권 차이',
    '분양권 보유기간',
    '분양권 신고',
    '분양권 비과세',
    '2026 양도세',
  ],
  alternates: { canonical: URL },
  openGraph: {
    title: '분양권 양도세 완전 정리 2026',
    description: '70%/60% 고정세율·입주권 차이·보유기간 기산점·신고 기한.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '분양권 양도세 완전 정리 2026',
    description: '70%/60% 고정·입주권/주택 차이·보유기간·신고.',
  },
};

const FAQ_ITEMS = [
  {
    question: '분양권 양도세 70%는 정확히 언제 적용되나요?',
    answer:
      '분양권 취득일(잔금 청산일)로부터 1년 미만 보유 후 양도 시 양도차익의 70% 단일세율(소득세법 §104①2호 나목). 일반 주택과 달리 누진세 적용 X, 장기보유공제 X. 예: 차익 1억 × 70% = 7,000만 원 양도세 + 지방소득세 10%.',
  },
  {
    question: '분양권 60%는 어떻게 적용되나요?',
    answer:
      '분양권 보유 1년 이상이면 60% 단일세율 적용. 일반 주택과 달리 보유기간을 더 늘려도 누진세율로 전환되지 않고 계속 60% 고정입니다. 예: 차익 1억 × 60% = 6,000만 원 + 지방소득세. 1년 미만 70%와 비교해 1년만 넘기면 1,000만 원 절세.',
  },
  {
    question: '분양권은 1세대1주택 비과세가 가능한가요?',
    answer:
      '아닙니다. 1세대1주택 비과세(소득세법 §89)는 "주택"에만 적용되며, 분양권은 권리에 해당하므로 비과세 대상이 아닙니다. 또한 장기보유특별공제(§95)도 적용되지 않습니다. 다만 분양권을 보유하다가 입주권·주택으로 전환된 후 양도하면 일반 주택 세제(누진세·비과세) 적용 가능.',
  },
  {
    question: '분양권 보유기간은 어떻게 계산하나요?',
    answer:
      '분양권 취득일은 잔금 청산일이 원칙(소득세법 §98). 분양권을 최초 분양받은 경우 분양사 잔금 완납일, 재매매로 양수한 경우 매도자에게 잔금 지급한 날이 취득일. 신청일·계약서 서명일이 아니라 실제 비용 완납일 기준이며, 이 날부터 1년·2년 보유 기간을 카운트합니다.',
  },
  {
    question: '분양권도 다주택자 주택 수에 포함되나요?',
    answer:
      '네, 1세대1주택 비과세 판정 시 분양권도 주택 수에 합산됩니다(소득세법 시행령 §155). 즉 본인 주택 1채 + 분양권 1개면 양도 시 1세대1주택 비과세 적용 불가. 다만 분양권 자체 양도세는 70%/60% 고정세율로 별도 적용되며, 다주택 중과(+20/+30%p)는 분양권에는 별도 적용되지 않습니다.',
  },
];

export default function PresaleRightCgtGuide() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '분양권 양도세 완전 정리 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '분양권 양도세 완전 정리 2026',
    description:
      '분양권 70%/60% 고정세율·1세대1주택 비과세 X·입주권/주택과 차이·보유기간·신고 기한.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    type: 'Article',
    keywords: ['분양권 양도세', '70%', '60%', '입주권', '2026'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '분양권 양도세 완전 정리 2026',
    description: '분양권 양도세 고정세율 구조와 입주권·주택 차이.',
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
                    { name: '분양권 양도세 완전 정리' },
                  ]}
                />
                <h1 className="mt-4 text-3xl font-bold text-text-primary md:text-4xl">
                  분양권 양도세 완전 정리 2026 — 70% / 60% 고정세율
                </h1>
                <p className="mt-3 text-lg text-text-secondary" data-speakable>
                  분양권은 일반 주택과 완전히 다른 세제가 적용됩니다. 보유 1년 미만 70%, 1년 이상 60%
                  <strong>단일 고정세율</strong>로, 누진세·1세대1주택 비과세·장기보유공제 모두 미적용
                  (소득세법 §94①4호·§104①2호 나목). 분양권 매도 검토 시 핵심 세제를 한 페이지에 정리합니다.
                </p>
              </header>

              <AdSlot slot="guide-presale-cgt-top" format="horizontal" />

              {/* 1. 분양권 정의 + 입주권/주택 차이 */}
              <section aria-label="분양권 정의" className="card">
                <h2 className="mb-4 text-2xl font-semibold">분양권 vs 입주권 vs 주택 — 단계별 차이</h2>
                <div className="overflow-x-auto" data-speakable>
                  <table className="w-full text-sm">
                    <caption className="sr-only">분양권·입주권·주택 비교</caption>
                    <thead>
                      <tr className="border-b border-border-base text-left">
                        <th className="py-2 pr-4 font-semibold">구분</th>
                        <th className="py-2 pr-4 font-semibold">분양권</th>
                        <th className="py-2 pr-4 font-semibold">입주권</th>
                        <th className="py-2 font-semibold">주택 (소유권등기)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-subtle"><td className="py-2 pr-4">단계</td><td className="py-2 pr-4">건설 중·예정</td><td className="py-2 pr-4">완성·사용승인</td><td className="py-2">소유권등기 완료</td></tr>
                      <tr className="border-b border-border-subtle"><td className="py-2 pr-4">양도세율</td><td className="py-2 pr-4">70%/60% 고정</td><td className="py-2 pr-4">누진 6~45%</td><td className="py-2">누진 또는 비과세</td></tr>
                      <tr className="border-b border-border-subtle"><td className="py-2 pr-4">1세대1주택 비과세</td><td className="py-2 pr-4">❌ 불가</td><td className="py-2 pr-4">✅ 조건부</td><td className="py-2">✅ 가능</td></tr>
                      <tr><td className="py-2 pr-4">장기보유공제</td><td className="py-2 pr-4">❌ 불가</td><td className="py-2 pr-4">✅ 가능</td><td className="py-2">✅ 가능</td></tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-3 text-sm text-text-tertiary">
                  근거: 소득세법 §94①4호 (분양권 정의) · §89 (1세대1주택 비과세) · §95 (장기보유공제) · §104①2호 나목 (분양권 단일세율).
                </p>
              </section>

              {/* 2. 70% / 60% 세율 구조 */}
              <section aria-label="세율 구조" className="card">
                <h2 className="mb-4 text-2xl font-semibold">70% / 60% 단일 고정세율 구조</h2>
                <div className="overflow-x-auto" data-speakable>
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border-base text-left">
                        <th className="py-2 pr-4 font-semibold">보유 기간</th>
                        <th className="py-2 pr-4 font-semibold">세율</th>
                        <th className="py-2 font-semibold">차익 1억 양도세 (지방소득세 별도)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-subtle"><td className="py-2 pr-4">1년 미만</td><td className="py-2 pr-4">70% 단일</td><td className="py-2">7,000만 원</td></tr>
                      <tr><td className="py-2 pr-4">1년 이상 (계속 고정)</td><td className="py-2 pr-4">60% 단일</td><td className="py-2">6,000만 원</td></tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-3 text-sm text-text-tertiary">
                  분양권은 일반 주택과 달리 <strong>보유 기간이 길어져도 누진세율로 전환되지 않고 계속 60% 고정</strong>입니다.
                  근거: 소득세법 §104①2호 나목 (2021-06-01 이후 취득 분양권). 지방소득세 10%(양도세의) 별도 부과.
                </p>
              </section>

              <AdSlot slot="guide-presale-cgt-mid" format="rectangle" />

              {/* 3. FAQ */}
              <FaqSection items={[...FAQ_ITEMS]} />

              {/* 4. 보유기간 기산점 */}
              <section aria-label="보유기간 기산점" className="card">
                <h2 className="mb-4 text-2xl font-semibold">보유 기간 기산점 — 잔금 청산일</h2>
                <p className="mb-3 text-text-secondary" data-speakable>
                  분양권 취득일 = <strong>잔금 청산일</strong>이 원칙(소득세법 §98). 분양 신청일·계약서 서명일이 아닙니다.
                </p>
                <ul className="list-inside list-disc space-y-1.5 text-sm text-text-secondary">
                  <li><strong>최초 분양</strong>: 분양사에 잔금 완납일이 취득일</li>
                  <li><strong>재매매 양수</strong>: 매도자에게 잔금 지급한 날이 양수자의 취득일</li>
                  <li><strong>보유 1년 D-day</strong>: 취득일 + 365일 이후 양도 시 60% 적용</li>
                </ul>
                <p className="mt-3 text-sm text-text-tertiary">
                  잔금일 1일 차이로 70%→60% 변동 → 7,000만 원에서 6,000만 원으로 1,000만 원 절세 가능
                  (차익 1억 기준).
                </p>
              </section>

              {/* 5. 분양권 → 입주권 → 주택 전환 */}
              <section aria-label="단계별 전환 세제" className="card">
                <h2 className="mb-4 text-2xl font-semibold">분양권 → 입주권 → 주택 전환 시 세제</h2>
                <ul className="list-inside list-disc space-y-1.5 text-text-secondary">
                  <li><strong>분양권 단계 양도</strong>: 70%/60% 고정세율 (위 섹션 참조)</li>
                  <li><strong>입주권 단계 양도</strong>: 일반 주택 누진세율(6~45%) 적용. 1세대1주택 비과세 조건부 가능.</li>
                  <li><strong>주택(소유권등기) 양도</strong>: 누진세율 + 보유 2년·12억 이하 시 1세대1주택 비과세(§89). 장기보유공제 적용.</li>
                </ul>
                <p className="mt-3 text-sm text-text-tertiary">
                  분양권 단계에서 양도하면 70%/60% 고정으로 부담이 가장 큼. 입주권 또는 주택으로 전환 후 양도가 일반적으로 절세에 유리.
                  단, 시장 상황(가격 하락 위험·이자 부담) 종합 검토 필수.
                </p>
              </section>

              {/* 6. 신고 기한 + 가산세 */}
              <section aria-label="신고 기한" className="card">
                <h2 className="mb-4 text-2xl font-semibold">신고 기한 + 양도소득 기본공제</h2>
                <div className="space-y-3 text-text-secondary">
                  <p data-speakable>
                    분양권 양도일이 속한 달의 말일부터 <strong>2개월 이내 예정신고·납부</strong>(소득세법 §118).
                    예: 6월 양도 → 8월 31일까지. 무신고 시 무신고가산세 20% + 납부지연가산세 일 0.022%(국세기본법 §47의2·§47의4).
                  </p>
                  <p>
                    양도소득 기본공제 250만 원 적용(소득세법 §103) — 부동산·기타자산 그룹 내 연 1회.
                    예: 차익 1억 → 1억 − 250만 = 9,750만 × 60% = 5,850만 원 양도세.
                  </p>
                </div>
              </section>

              {/* 7. 주의사항 */}
              <section aria-label="주의사항" className="card border-l-4 border-l-danger-500">
                <h2 className="mb-3 text-xl font-semibold">⚠️ 주의사항</h2>
                <ul className="list-inside list-disc space-y-1.5 text-sm text-text-secondary">
                  <li>분양권 70%/60%는 2021-06-01 이후 취득분에 적용. 그 이전 취득은 다른 세율 체계.</li>
                  <li>1세대1주택 비과세 판정 시 분양권도 주택 수에 합산(시행령 §155).</li>
                  <li>분양권 자체에는 다주택 중과(+20/+30%p) 별도 적용 X (이미 70%/60% 고정).</li>
                  <li>분양권 양도 시 부동산 거래신고 의무 (실거래가 기준).</li>
                  <li>분양사 부도·프로젝트 중단 시 손실 인정 여부는 세무사 상담 필수.</li>
                </ul>
              </section>

              {/* 8. 관련 계산기·가이드 */}
              <section aria-label="관련 계산기·가이드" className="card">
                <h2 className="mb-4 text-2xl font-semibold">관련 계산기·가이드</h2>
                <ul className="space-y-2 text-text-secondary">
                  <li>→ <Link href="/calculator/capital-gains-tax/" className="text-primary-600 underline dark:text-primary-500">양도소득세 계산기</Link> — 분양권 차익 즉시 시뮬</li>
                  <li>→ <Link href="/guide/capital-gains-tax-tips/" className="text-primary-600 underline dark:text-primary-500">양도세 절세 7가지</Link> — 일반 주택 절세 전략</li>
                  <li>→ <Link href="/guide/august-capital-gains-tax-review/" className="text-primary-600 underline dark:text-primary-500">8월 양도세 검토 가이드</Link> — 보유 기간·일시적2주택</li>
                  <li>→ <Link href="/guide/december-capital-gains-tax-deadline/" className="text-primary-600 underline dark:text-primary-500">12월 양도세 마감 가이드</Link> — 연말 vs 연초 결정</li>
                  <li>→ <Link href="/calculator/acquisition-tax/" className="text-primary-600 underline dark:text-primary-500">취득세 계산기</Link> — 입주권·주택 전환 시 비용</li>
                </ul>
              </section>

              <ShareButtons title="분양권 양도세 완전 정리 2026" url={URL} description="70%/60% 고정세율·입주권 차이·보유기간·신고." />

              {/* 출처·면책 */}
              <section
                aria-label="출처 및 면책"
                className="rounded-lg border border-border-base p-4 text-caption text-text-tertiary"
              >
                <p className="mb-2">
                  <strong>법적 근거</strong>: 소득세법 §89 (1세대1주택 비과세) · §94①4호 (분양권 정의) · §95 (장기보유공제) · §98 (양도일) · §103 (양도소득 기본공제) · §104①2호 나목 (분양권 단일세율 70%/60%) · §118 (예정신고) · 시행령 §155 (1세대1주택 주택 수 합산) · 국세기본법 §47의2·§47의4 (가산세). 참고: <a href="https://www.hometax.go.kr" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-600 underline dark:text-primary-500">홈택스</a>, <a href="https://www.nts.go.kr" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-600 underline dark:text-primary-500">국세청</a>, <a href="https://www.law.go.kr" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-600 underline dark:text-primary-500">법령정보센터</a>.
                </p>
                <p className="mb-2">
                  <strong>면책조항</strong>: 본 가이드는 일반 정보 제공 목적이며 세무·법적 조언이 아닙니다. 분양권 거래는 개별 프로젝트·지역(조정대상 여부)·정책 변경에 따라 적용 세제가 달라질 수 있으므로 반드시 세무사 또는 국세청 상담을 통해 확정하시기 바랍니다.
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
