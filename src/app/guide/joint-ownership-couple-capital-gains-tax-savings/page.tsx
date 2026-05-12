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

const URL = 'https://calculatorhost.com/guide/joint-ownership-couple-capital-gains-tax-savings/';
const DATE_PUBLISHED = '2026-05-12';
const DATE_MODIFIED = '2026-05-12';

export const metadata: Metadata = {
  title: '부부 공동명의 양도세 절세 완전 정리 2026 | 누진세 분산 효과',
  description:
    '부부 공동명의 부동산 양도 시 명의자별 분리 과세로 누진세 분산 → 절세. 양도소득 명의자별 별도 신고·기본공제 250만 × 2명·장기보유공제 분배·증여 후 매도 전략. 사례별 시뮬 + 법조항.',
  keywords: [
    '부부 공동명의 양도세',
    '공동명의 절세',
    '양도세 누진세 분산',
    '명의자별 분리 과세',
    '공동명의 기본공제',
    '장기보유공제 분배',
    '부부 증여 후 매도',
    '1세대1주택 공동명의',
    '12억 한도 합산',
    '2026 양도세',
  ],
  alternates: { canonical: URL },
  openGraph: {
    title: '부부 공동명의 양도세 절세 완전 정리 2026',
    description: '명의자별 누진세 분산·기본공제 2배·장기보유공제 분배·증여 후 매도.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '부부 공동명의 양도세 절세 완전 정리 2026',
    description: '누진세 분산·기본공제 2배·증여 6억 활용.',
  },
};

const FAQ_ITEMS = [
  {
    question: '공동명의면 1세대1주택 12억 한도가 각각 12억씩인가요?',
    answer:
      '아닙니다. 1세대1주택 비과세 12억 한도는 1세대(부부 합산) 기준이며 명의자별 X(소득세법 §89, 시행령 §154). 양도가 10억 공동명의(50%+50%) → 각자 5억씩 양도지만 12억 한도는 1세대 합산으로 적용 → 양도가 12억 미만이라 전액 비과세. 공동명의는 비과세 한도 확장 효과 X.',
  },
  {
    question: '부부 공동명의가 항상 절세에 유리한가요?',
    answer:
      '아닙니다. 1세대1주택 비과세 적용 시 단독/공동 세금 동일(둘 다 0원). 공동명의 절세 효과는 누진세율 적용 시(다주택·12억 초과·일반 양도) 큼. 양도차익 5억 사례: 단독 약 1.59억 vs 공동(50%+50%) 합 약 8,400만 → 약 7,500만 절세. 차익 작거나 비과세면 효과 미미.',
  },
  {
    question: '양도소득 기본공제 250만은 명의자당 별도 적용되나요?',
    answer:
      '네, 양도소득 기본공제 250만 원은 각 명의자별로 적용(소득세법 §103). 공동명의 부부면 합 500만 원 공제 가능. 단 자산 그룹별 연 1회 한도이므로 같은 해 다른 부동산 양도 시 추가 공제 X. 그룹 1(부동산·기타자산)·그룹 2(주식)·그룹 3(파생) 각자 별도.',
  },
  {
    question: '장기보유공제는 공동명의 시 어떻게 분배되나요?',
    answer:
      '장기보유특별공제(소득세법 §95)는 명의자 각자의 보유·거주 기간으로 별도 적용. 부부 공동명의 보유 10년 + 부부 모두 거주 10년이면 각자 80% 공제. 다만 부부 중 한 명만 거주(예: 배우자 별거)면 거주 기간 단절로 공제율 낮아짐. 1세대1주택 비과세 12억 초과분에만 적용.',
  },
  {
    question: '취득 후 배우자에게 일부 증여한 후 매도하면 절세되나요?',
    answer:
      '가능하나 증여세 부담 vs 양도세 절세 비교 필수. 배우자 증여 공제 10년 6억(상증법 §53). 6억 이내 증여는 증여세 0. 그러나 양도세 이월 과세(상증법 §97의2) 적용 — 증여 후 10년 이내 양도 시 증여 전 취득가 기준으로 양도차익 계산 → 절세 효과 무력화 가능. 10년 후 양도해야 효과 발휘.',
  },
];

export default function JointOwnershipCgtGuide() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '부부 공동명의 양도세 절세' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '부부 공동명의 양도세 절세 완전 정리 2026',
    description:
      '부부 공동명의 부동산 양도 시 명의자별 분리 과세 누진세 분산·기본공제 2배·장기보유공제 분배·사례별 시뮬.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    type: 'Article',
    keywords: ['부부 공동명의', '양도세 절세', '누진세 분산', '2026'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '부부 공동명의 양도세 절세 완전 정리 2026',
    description: '명의자별 분리 과세·누진세 분산·기본공제 2배·장기보유공제 분배.',
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
                    { name: '부부 공동명의 양도세 절세' },
                  ]}
                />
                <h1 className="mt-4 text-3xl font-bold text-text-primary md:text-4xl">
                  부부 공동명의 양도세 절세 완전 정리 2026
                </h1>
                <p className="mt-3 text-lg text-text-secondary" data-speakable>
                  부부 공동명의 부동산 양도 시 양도소득은 <strong>명의자별로 분리 과세</strong>됩니다.
                  누진세율(6~45%)이 명의자별 과세표준에 별도 적용 → 같은 양도차익도 단독명의 대비 누진세 한 단계 낮아져 절세 가능.
                  양도차익 5억 사례 기준 약 7,500만 원 절세 효과 (소득세법 §94·§103·§104).
                </p>
              </header>

              <AdSlot slot="guide-joint-cgt-top" format="horizontal" />

              {/* 1. 분리 과세 원칙 */}
              <section aria-label="분리 과세 원칙" className="card">
                <h2 className="mb-4 text-2xl font-semibold">양도소득 명의자별 분리 과세 원칙</h2>
                <p className="mb-3 text-text-secondary" data-speakable>
                  양도소득세는 등기 명의자 각자가 자신의 지분에 해당하는 양도차익을 별도로 신고·납부합니다.
                  공동명의 50%+50%면 양도차익도 50%씩 분리되어 각자의 누진세율 구간에 적용.
                </p>
                <p className="text-text-secondary">
                  단, 1세대1주택 비과세 12억 한도(소득세법 §89)·다주택 중과(§104의3)는 1세대 합산 기준이라
                  공동명의로 한도가 늘어나지 않음에 유의.
                </p>
              </section>

              {/* 2. 사례 시뮬 */}
              <section aria-label="단독 vs 공동 시뮬" className="card border-l-4 border-l-primary-500">
                <h2 className="mb-4 text-2xl font-semibold">단독명의 vs 공동명의 시뮬레이션</h2>
                <div className="overflow-x-auto" data-speakable>
                  <table className="w-full text-sm">
                    <caption className="sr-only">양도차익별 단독 vs 공동명의 양도세</caption>
                    <thead>
                      <tr className="border-b border-border-base text-left">
                        <th className="py-2 pr-4 font-semibold">양도차익</th>
                        <th className="py-2 pr-4 font-semibold">단독명의 양도세</th>
                        <th className="py-2 pr-4 font-semibold">공동명의(50+50) 합</th>
                        <th className="py-2 font-semibold">절세액</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-subtle"><td className="py-2 pr-4">2억</td><td className="py-2 pr-4">약 2,864만 (24%)</td><td className="py-2 pr-4">각 977만 × 2 = 1,954만 (15%)</td><td className="py-2">약 910만</td></tr>
                      <tr className="border-b border-border-subtle"><td className="py-2 pr-4">3억</td><td className="py-2 pr-4">약 8,155만 (35%)</td><td className="py-2 pr-4">각 1,723만 × 2 = 3,446만 (24%)</td><td className="py-2">약 4,709만</td></tr>
                      <tr><td className="py-2 pr-4">5억</td><td className="py-2 pr-4">약 1.59억 (38%)</td><td className="py-2 pr-4">각 4,200만 × 2 = 8,400만 (24%)</td><td className="py-2">약 7,500만</td></tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-3 text-sm text-text-tertiary">
                  계산: 누진세율 6/15/24/35/38/40/42/45% 적용. 누진공제 (5천만 126만/8.8천 576만/1.5억 1,544만/3억 1,994만 등) 차감 후. 지방소득세 10% 별도.
                </p>
              </section>

              <AdSlot slot="guide-joint-cgt-mid" format="rectangle" />

              {/* 3. FAQ */}
              <FaqSection items={[...FAQ_ITEMS]} />

              {/* 4. 1세대1주택 12억 한도 (합산) */}
              <section aria-label="1세대1주택 12억 한도" className="card">
                <h2 className="mb-4 text-2xl font-semibold">1세대1주택 비과세에서 공동명의 효과</h2>
                <p className="mb-3 text-text-secondary" data-speakable>
                  1세대1주택 비과세 12억 한도는 <strong>1세대(부부 합산) 기준</strong>이며 명의자별 X(소득세법 §89).
                  따라서 공동명의로 비과세 한도가 24억으로 늘어나지 않음.
                </p>
                <ul className="list-inside list-disc space-y-1.5 text-sm text-text-secondary">
                  <li>양도가 12억 이하: 단독·공동 모두 전액 비과세 (효과 동일)</li>
                  <li>양도가 12억 초과: 비례 과세 후 공동명의 누진세 분산 효과 큼 → 절세</li>
                  <li>예: 양도가 15억·취득 6억 → 양도차익 9억 × 20% = 1.8억 과세. 단독 38% vs 공동 각 24%</li>
                </ul>
              </section>

              {/* 5. 기본공제 + 장기보유 */}
              <section aria-label="기본공제 + 장기보유" className="card">
                <h2 className="mb-4 text-2xl font-semibold">기본공제 250만 × 2 + 장기보유공제 분배</h2>
                <div className="space-y-3 text-text-secondary">
                  <div data-speakable>
                    <h3 className="font-semibold text-text-primary">기본공제 (소득세법 §103)</h3>
                    <p className="text-sm">양도소득 기본공제 250만 원은 명의자별로 적용. 공동명의 부부면 합 500만 원 공제 가능 (단독 250만 대비 +250만).</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-text-primary">장기보유공제 (소득세법 §95)</h3>
                    <p className="text-sm">명의자 각자의 보유·거주 기간으로 별도 적용. 부부 공동명의 + 모두 10년 거주 → 각자 80% 공제. 한 명만 거주 시 거주 기간 단절 주의.</p>
                  </div>
                </div>
              </section>

              {/* 6. 사전 증여 후 매도 */}
              <section aria-label="사전 증여 후 매도" className="card border-l-4 border-l-secondary-500">
                <h2 className="mb-4 text-2xl font-semibold">사전 증여 후 매도 — 10년 후 효과</h2>
                <p className="mb-3 text-text-secondary" data-speakable>
                  배우자 증여 공제 10년 6억(상속세 및 증여세법 §53)을 활용해 부동산 일부를 증여한 후 매도하면
                  명의가 분산되어 누진세 절세. 단 <strong>증여 후 10년 이내 양도 시 이월 과세(상증법 §97의2)</strong> 적용 →
                  증여 전 취득가 기준으로 양도차익 계산되어 절세 효과 무력화.
                </p>
                <ul className="list-inside list-disc space-y-1.5 text-sm text-text-secondary">
                  <li>10년 이상 보유 후 양도해야 효과 발휘 (장기 계획 필수)</li>
                  <li>증여세 0(6억 이내) + 양도세 절세액 비교 시뮬 필수</li>
                  <li>증여 등기 비용·취득세(증여 4%·일반 1~3%) 추가 부담 고려</li>
                </ul>
              </section>

              {/* 7. 다주택 중과 회피 */}
              <section aria-label="다주택 중과" className="card">
                <h2 className="mb-4 text-2xl font-semibold">다주택 중과세 회피 한계</h2>
                <p className="text-text-secondary">
                  조정대상지역에서 2주택 이상이면 양도세 기본세율 + 20%p(2주택) 또는 30%p(3주택)
                  중과(소득세법 §104의3, 시행령 §167의3). 부부 공동명의 단일 주택은 1세대1주택으로
                  취급되므로 중과 X. 그러나 부부 각자 단독 명의 주택 + 공동명의 추가 시 1세대 다주택으로
                  중과 적용 가능. 명의 분산이 다주택 중과 회피 수단으로 활용은 제한적.
                </p>
              </section>

              {/* 8. 주의사항 */}
              <section aria-label="주의사항" className="card border-l-4 border-l-danger-500">
                <h2 className="mb-3 text-xl font-semibold">⚠️ 주의사항 + 흔한 오해</h2>
                <ul className="list-inside list-disc space-y-1.5 text-sm text-text-secondary">
                  <li>"공동명의 12억 = 24억" 오해 X — 1세대 합산 12억.</li>
                  <li>공동명의 비율과 실제 출자 비율 불일치 → 증여 추정 (증여세 부과 가능).</li>
                  <li>증여 후 10년 이내 양도 → 이월 과세로 절세 효과 무력화.</li>
                  <li>1세대1주택 비과세 적용 시 공동명의 효과 미미 (이미 0원).</li>
                  <li>혼인 중 공동명의 → 혼인 해제 시 재산 분할 대상 + 양도세 추가 부담 가능.</li>
                </ul>
              </section>

              {/* 9. 관련 가이드·계산기 */}
              <section aria-label="관련 가이드·계산기" className="card">
                <h2 className="mb-4 text-2xl font-semibold">관련 가이드·계산기</h2>
                <ul className="space-y-2 text-text-secondary">
                  <li>→ <Link href="/calculator/capital-gains-tax/" className="text-primary-600 underline dark:text-primary-500">양도소득세 계산기</Link> — 단독/공동명의 시뮬</li>
                  <li>→ <Link href="/guide/one-household-12-billion-exemption/" className="text-primary-600 underline dark:text-primary-500">1세대1주택 12억 한도 완전 정리</Link></li>
                  <li>→ <Link href="/guide/capital-gains-tax-tips/" className="text-primary-600 underline dark:text-primary-500">양도세 절세 7가지</Link></li>
                  <li>→ <Link href="/guide/august-capital-gains-tax-review/" className="text-primary-600 underline dark:text-primary-500">8월 양도세 검토 가이드</Link></li>
                  <li>→ <Link href="/calculator/gift-tax/" className="text-primary-600 underline dark:text-primary-500">증여세 계산기</Link> — 사전 증여 부담 시뮬</li>
                </ul>
              </section>

              <ShareButtons title="부부 공동명의 양도세 절세 완전 정리 2026" url={URL} description="명의자별 분리 과세·누진세 분산·기본공제 2배·증여 6억 활용." />

              {/* 출처·면책 */}
              <section
                aria-label="출처 및 면책"
                className="rounded-lg border border-border-base p-4 text-caption text-text-tertiary"
              >
                <p className="mb-2">
                  <strong>법적 근거</strong>: 소득세법 §2의2 (분리 과세) · §89 (1세대1주택 비과세) · §94 (양도소득) · §95 (장기보유공제) · §103 (양도소득 기본공제) · §104 (양도세율) · §104의3 (다주택 중과) · §118 (예정신고) · 시행령 §154 (1세대1주택) · §167의3 (중과 적용 주택) · 상속세 및 증여세법 §53 (배우자 증여 공제 10년 6억) · §97의2 (증여 후 10년 이내 양도 이월 과세). 참고: <a href="https://www.hometax.go.kr" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-600 underline dark:text-primary-500">홈택스</a>, <a href="https://www.nts.go.kr" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-600 underline dark:text-primary-500">국세청</a>, <a href="https://www.law.go.kr" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-600 underline dark:text-primary-500">법령정보센터</a>.
                </p>
                <p className="mb-2">
                  <strong>면책조항</strong>: 본 가이드는 일반 정보 제공 목적이며 세무·법적 조언이 아닙니다. 부부 재산분할·혼인 해제·해외 거주·증여 이월 과세 등 개별 사정에 따라 적용이 달라지므로 반드시 세무사 또는 국세청 상담을 통해 확정하시기 바랍니다. 사전 증여 전략은 증여 등기 비용·취득세까지 종합 비교 필수.
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
