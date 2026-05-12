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

const URL = 'https://calculatorhost.com/guide/housing-rental-income-separate-taxation/';
const DATE_PUBLISHED = '2026-05-12';
const DATE_MODIFIED = '2026-05-12';

export const metadata: Metadata = {
  title: '주택임대소득 분리과세 2,000만 원 완전 정리 2026 | 종합과세 비교',
  description:
    '월세·전세 보증금 임대소득 2,000만 원 이하 → 14% 분리과세 선택 가능(소득세법 §64의2). 1/2/3주택 과세 차이·간주임대료 공식·등록임대 60% 경비율·필요경비 50%·기본공제 정리.',
  keywords: [
    '주택임대소득',
    '분리과세 14%',
    '임대소득 2000만',
    '간주임대료',
    '전세 보증금 과세',
    '등록임대사업자',
    '주택임대 종합과세',
    '필요경비율',
    '기준시가 12억',
    '2026 임대소득',
  ],
  alternates: { canonical: URL },
  openGraph: {
    title: '주택임대소득 분리과세 2,000만 원 완전 정리 2026',
    description: '14% 분리과세 vs 종합과세·1/2/3주택 차이·간주임대료·등록임대 혜택.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '주택임대소득 분리과세 2,000만 원 완전 정리 2026',
    description: '14% 분리과세·1/2/3주택·간주임대료·등록임대.',
  },
};

const FAQ_ITEMS = [
  {
    question: '1주택자가 월세를 받으면 무조건 비과세인가요?',
    answer:
      '아닙니다. 1주택자라도 기준시가 12억 원 초과 고가주택을 임대하면 월세가 과세됩니다(소득세법 §12①4호 단서). 12억 이하 1주택 자가거주 또는 임대는 비과세. 단 전세 보증금은 1주택자 항상 비과세 — 간주임대료 과세는 3주택 이상부터 적용.',
  },
  {
    question: '연 임대소득 2,000만 원의 기준은 무엇인가요?',
    answer:
      '연간 월세 + 간주임대료 합계입니다. 2,000만 원 이하면 14% 분리과세 선택 가능(소득세법 §64의2). 초과 시 자동 종합과세(누진세율 6~45%) 적용. 매년 5월 종합소득세 신고 시점에 본인이 분리/종합 중 유리한 쪽 선택.',
  },
  {
    question: '간주임대료는 어떻게 계산하나요?',
    answer:
      '3주택 이상 보유자의 전세·월세 보증금 합계가 3억 원을 초과하면 초과분의 60%에 정기예금 이자율(매년 국세청 고시)을 곱해 간주임대료로 과세(소득세법 시행령 §53). 1·2주택자는 보증금 간주임대료 비과세. 정확한 이자율은 매년 국세청 고시 확인.',
  },
  {
    question: '분리과세 14% 세액 계산 방법은?',
    answer:
      '분리과세 세액 = (총 임대소득 − 필요경비 − 기본공제) × 14%. 미등록 임대인은 필요경비율 50%, 등록임대사업자는 60%. 분리과세 선택 시 본인의 다른 종합소득금액이 2,000만 원 이하면 기본공제 400만 원 추가 (시행령 §122의2). 다른 소득 2,000만 초과면 기본공제 0원.',
  },
  {
    question: '등록임대사업자가 되면 어떤 혜택이 있나요?',
    answer:
      '필요경비율 60%로 상승(미등록 50% 대비), 일정 조건 충족 시 양도소득세 장기보유공제 우대·감면, 종합부동산세 합산배제 등 혜택. 단 임대료 인상률 연 5% 이하 제한 + 의무 임대 기간(단기 4년·장기 10년) 준수 필요. 민간임대주택에 관한 특별법 기준.',
  },
];

export default function HousingRentalIncomeGuide() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '주택임대소득 분리과세 2,000만' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '주택임대소득 분리과세 2,000만 원 완전 정리 2026',
    description:
      '월세·전세 보증금 임대소득 2,000만 원 이하 14% 분리과세 선택. 1/2/3주택 과세 차이·간주임대료·등록임대 혜택.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    type: 'Article',
    keywords: ['주택임대소득', '분리과세', '간주임대료', '등록임대', '2026'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '주택임대소득 분리과세 2,000만 원 완전 정리 2026',
    description: '14% 분리과세 vs 종합과세·1/2/3주택·간주임대료·등록임대.',
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
                    { name: '주택임대소득 분리과세 2,000만' },
                  ]}
                />
                <h1 className="mt-4 text-3xl font-bold text-text-primary md:text-4xl">
                  주택임대소득 분리과세 2,000만 원 완전 정리 2026
                </h1>
                <p className="mt-3 text-lg text-text-secondary" data-speakable>
                  월세·전세 보증금 임대소득이 연 2,000만 원 이하면 <strong>14% 분리과세</strong>를 선택할 수 있습니다
                  (소득세법 §64의2). 1주택·2주택·3주택 이상에서 과세 방식이 다르고, 등록임대사업자는 필요경비율
                  60% 우대를 받습니다. 본 가이드는 분리과세 vs 종합과세 비교부터 간주임대료 공식, 등록임대 혜택까지
                  정리합니다.
                </p>
              </header>

              <AdSlot slot="guide-rental-income-top" format="horizontal" />

              {/* 1. 1/2/3주택 과세 차이 */}
              <section aria-label="주택 수별 과세" className="card">
                <h2 className="mb-4 text-2xl font-semibold">1주택 vs 2주택 vs 3주택 이상 과세 차이</h2>
                <div className="overflow-x-auto" data-speakable>
                  <table className="w-full text-sm">
                    <caption className="sr-only">주택 수별 임대소득 과세</caption>
                    <thead>
                      <tr className="border-b border-border-base text-left">
                        <th className="py-2 pr-4 font-semibold">상황</th>
                        <th className="py-2 pr-4 font-semibold">월세</th>
                        <th className="py-2 font-semibold">전세 보증금</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-subtle"><td className="py-2 pr-4">1주택 (기준시가 12억 이하)</td><td className="py-2 pr-4">비과세</td><td className="py-2">비과세</td></tr>
                      <tr className="border-b border-border-subtle"><td className="py-2 pr-4">1주택 (기준시가 12억 초과)</td><td className="py-2 pr-4">과세 (분리/종합)</td><td className="py-2">비과세</td></tr>
                      <tr className="border-b border-border-subtle"><td className="py-2 pr-4">2주택자</td><td className="py-2 pr-4">과세 (분리/종합)</td><td className="py-2">비과세</td></tr>
                      <tr><td className="py-2 pr-4">3주택 이상</td><td className="py-2 pr-4">과세</td><td className="py-2">간주임대료 과세 (보증금 3억 초과분)</td></tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-3 text-sm text-text-tertiary">
                  근거: 소득세법 §12①4호 (1주택 비과세) · §19 (사업소득) · 시행령 §53 (간주임대료). 부부 합산 주택 수 기준.
                </p>
              </section>

              {/* 2. 분리과세 vs 종합과세 */}
              <section aria-label="분리 vs 종합" className="card border-l-4 border-l-primary-500">
                <h2 className="mb-4 text-2xl font-semibold">분리과세 14% vs 종합과세</h2>
                <p className="mb-3 text-text-secondary" data-speakable>
                  연 임대소득 2,000만 원 이하면 매년 5월 종합소득세 신고 시 분리/종합 중 유리한 쪽 선택 가능
                  (소득세법 §64의2). 다른 종합소득이 많을수록 분리과세 14%가 유리.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm" data-speakable>
                    <thead>
                      <tr className="border-b border-border-base text-left">
                        <th className="py-2 pr-4 font-semibold">다른 종합소득</th>
                        <th className="py-2 pr-4 font-semibold">종합과세 누진세율</th>
                        <th className="py-2 font-semibold">유리한 선택</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-subtle"><td className="py-2 pr-4">1,400만 이하</td><td className="py-2 pr-4">6%</td><td className="py-2">종합과세 유리</td></tr>
                      <tr className="border-b border-border-subtle"><td className="py-2 pr-4">5,000만 이하</td><td className="py-2 pr-4">15%</td><td className="py-2">대부분 분리과세</td></tr>
                      <tr><td className="py-2 pr-4">8,800만 초과</td><td className="py-2 pr-4">24%~45%</td><td className="py-2">분리과세 유리</td></tr>
                    </tbody>
                  </table>
                </div>
              </section>

              {/* 3. 분리과세 14% 계산 */}
              <section aria-label="분리과세 계산" className="card">
                <h2 className="mb-4 text-2xl font-semibold">분리과세 14% 세액 계산 단계</h2>
                <div className="rounded-lg bg-bg-card p-4 font-mono text-sm" data-speakable>
                  과세표준 = 총 임대소득 − 필요경비 − 기본공제<br />
                  세액 = 과세표준 × 14%
                </div>
                <ul className="mt-3 list-inside list-disc space-y-1.5 text-sm text-text-secondary">
                  <li><strong>필요경비율</strong>: 미등록 50%, 등록임대 60% (시행령 §122의2)</li>
                  <li><strong>기본공제</strong>: 분리과세 선택 + 다른 종합소득 2,000만 이하면 400만 원 추가공제. 다른 소득 2,000만 초과면 0원.</li>
                </ul>
                <div className="mt-3 rounded-lg bg-bg-card p-3 text-sm text-text-secondary">
                  <p className="mb-1"><strong className="text-text-primary">사례</strong>: 미등록 임대인 연 월세 1,800만 원 + 다른 종합소득 1,500만 원</p>
                  <ul className="list-inside list-disc space-y-0.5">
                    <li>필요경비: 1,800만 × 50% = 900만 원</li>
                    <li>기본공제: 400만 원 (다른 소득 2,000만 이하)</li>
                    <li>과세표준: 1,800 − 900 − 400 = 500만 원</li>
                    <li>세액: 500만 × 14% = 70만 원 (지방세 별도)</li>
                  </ul>
                </div>
              </section>

              <AdSlot slot="guide-rental-income-mid" format="rectangle" />

              {/* 4. FAQ */}
              <FaqSection items={[...FAQ_ITEMS]} />

              {/* 5. 간주임대료 */}
              <section aria-label="간주임대료" className="card">
                <h2 className="mb-4 text-2xl font-semibold">간주임대료 — 3주택 이상 보증금 과세</h2>
                <p className="mb-3 text-text-secondary" data-speakable>
                  3주택 이상 보유자가 받은 전세·월세 보증금 합계가 3억 원을 초과하면 초과분에 대해 간주임대료로 과세
                  (소득세법 시행령 §53). 1·2주택자는 보증금 간주임대료 비과세.
                </p>
                <div className="rounded-lg bg-bg-card p-4 font-mono text-sm" data-speakable>
                  간주임대료 = (보증금 합계 − 3억) × 60% × 정기예금이자율(연)
                </div>
                <p className="mt-3 text-sm text-text-tertiary">
                  정기예금이자율은 매년 국세청 고시 (2024년 약 2.9%, 2025년 변동 가능). 정확한 비율은
                  <a href="https://www.nts.go.kr" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-600 underline dark:text-primary-500">국세청</a> 매년 고시 확인.
                </p>
              </section>

              {/* 6. 등록 vs 미등록 */}
              <section aria-label="등록 vs 미등록 임대" className="card">
                <h2 className="mb-4 text-2xl font-semibold">등록임대 vs 미등록 임대</h2>
                <div className="overflow-x-auto" data-speakable>
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border-base text-left">
                        <th className="py-2 pr-4 font-semibold">항목</th>
                        <th className="py-2 pr-4 font-semibold">미등록</th>
                        <th className="py-2 font-semibold">등록임대 (단기 4년 / 장기 10년)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-subtle"><td className="py-2 pr-4">필요경비율</td><td className="py-2 pr-4">50%</td><td className="py-2">60%</td></tr>
                      <tr className="border-b border-border-subtle"><td className="py-2 pr-4">기본공제 (다른 소득 2천 이하)</td><td className="py-2 pr-4">400만</td><td className="py-2">400만 + 임대료 인상률 5% 제한 추가공제</td></tr>
                      <tr className="border-b border-border-subtle"><td className="py-2 pr-4">의무 임대 기간</td><td className="py-2 pr-4">없음</td><td className="py-2">4년 또는 10년</td></tr>
                      <tr className="border-b border-border-subtle"><td className="py-2 pr-4">임대료 인상 제한</td><td className="py-2 pr-4">없음</td><td className="py-2">연 5% 이하</td></tr>
                      <tr><td className="py-2 pr-4">양도세·종부세 우대</td><td className="py-2 pr-4">없음</td><td className="py-2">조건부 적용 (장기·소형주택)</td></tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-3 text-sm text-text-tertiary">
                  근거: 민간임대주택에 관한 특별법 + 소득세법 시행령 §122의2. 등록임대 신청은 사업장 소재지 시·군·구청.
                </p>
              </section>

              {/* 7. 주의사항 */}
              <section aria-label="주의사항" className="card border-l-4 border-l-danger-500">
                <h2 className="mb-3 text-xl font-semibold">⚠️ 주의사항</h2>
                <ul className="list-inside list-disc space-y-1.5 text-sm text-text-secondary">
                  <li>주택 수는 부부 합산 기준 (배우자 명의 주택 포함).</li>
                  <li>분리과세 선택은 매년 신고 시 변경 가능 — 다른 소득 변동 시 재검토 필수.</li>
                  <li>임대 사업자등록은 임대 개시일·취득일로부터 30일 이내 (지자체 + 세무서).</li>
                  <li>미등록 임대인도 종합소득세 신고 의무 — 미신고 시 가산세 20% (국세기본법 §47의2).</li>
                  <li>간주임대료 정기예금 이자율은 매년 국세청 고시 — 변동 가능.</li>
                </ul>
              </section>

              {/* 8. 관련 계산기·가이드 */}
              <section aria-label="관련 계산기·가이드" className="card">
                <h2 className="mb-4 text-2xl font-semibold">관련 계산기·가이드</h2>
                <ul className="space-y-2 text-text-secondary">
                  <li>→ <Link href="/calculator/rental-yield/" className="text-primary-600 underline dark:text-primary-500">임대수익률 계산기</Link> — 월세·보증금 실제 수익률</li>
                  <li>→ <Link href="/calculator/rent-conversion/" className="text-primary-600 underline dark:text-primary-500">전월세 전환율 계산기</Link></li>
                  <li>→ <Link href="/calculator/freelancer-tax/" className="text-primary-600 underline dark:text-primary-500">프리랜서 종합소득세 계산기</Link> — 임대 소득 합산 시</li>
                  <li>→ <Link href="/guide/may-comprehensive-income-tax/" className="text-primary-600 underline dark:text-primary-500">5월 종합소득세 신고 가이드</Link></li>
                  <li>→ <Link href="/calculator/comprehensive-property-tax/" className="text-primary-600 underline dark:text-primary-500">종합부동산세 계산기</Link> — 다주택 보유세</li>
                </ul>
              </section>

              <ShareButtons title="주택임대소득 분리과세 2,000만 원 완전 정리 2026" url={URL} description="14% 분리과세·1/2/3주택·간주임대료·등록임대 혜택." />

              {/* 출처·면책 */}
              <section
                aria-label="출처 및 면책"
                className="rounded-lg border border-border-base p-4 text-caption text-text-tertiary"
              >
                <p className="mb-2">
                  <strong>법적 근거</strong>: 소득세법 §12①4호 (1주택 비과세 단서) · §14 (소득의 분류) · §19 (사업소득) · §25 (필요경비) · §64의2 (분리과세) · 시행령 §53 (간주임대료) · §122의2 (필요경비율·기본공제) · 국세기본법 §47의2 (가산세) · 민간임대주택에 관한 특별법 (등록임대). 참고: <a href="https://www.hometax.go.kr" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-600 underline dark:text-primary-500">홈택스</a>, <a href="https://www.nts.go.kr" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-600 underline dark:text-primary-500">국세청</a>, <a href="https://www.law.go.kr" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-600 underline dark:text-primary-500">법령정보센터</a>.
                </p>
                <p className="mb-2">
                  <strong>면책조항</strong>: 본 가이드는 일반 정보 제공 목적이며 세무·법적 조언이 아닙니다. 간주임대료 정기예금 이자율, 등록임대 양도세 감면 조건, 부부 합산 등 개별 사정은 반드시 세무사 또는 국세청 상담을 통해 확정하시기 바랍니다.
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
