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

const URL = 'https://calculatorhost.com/guide/child-earned-income-tax-credit-application-2026/';
const DATE_PUBLISHED = '2026-05-12';
const DATE_MODIFIED = '2026-05-12';

export const metadata: Metadata = {
  title: '2026 자녀·근로장려금 신청 가이드 | 5월 31일 마감 + 환급 시점',
  description:
    '5월 31일 마감 자녀장려금·근로장려금 신청 완벽 가이드. 자격(소득·재산·가구유형)·금액(자녀당 100만/단독 165만/맞벌이 330만)·홈택스 신청 5단계·정기 vs 반기 차이·환급 8~9월 정리.',
  keywords: [
    '자녀장려금 신청',
    '근로장려금 신청',
    '자녀장려금 2026',
    '근로장려금 자격',
    '자녀장려금 100만',
    '근로장려금 330만',
    '5월 31일 마감',
    '근로장려금 반기 신청',
    '홈택스 장려금',
    '2026 장려금',
  ],
  alternates: { canonical: URL },
  openGraph: {
    title: '2026 자녀·근로장려금 신청 가이드',
    description: '5월 31일 마감·자격 기준·금액·홈택스 신청 5단계·환급 시점.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '2026 자녀·근로장려금 신청 가이드',
    description: '5월 31일 마감 + 자녀당 100만 + 맞벌이 330만 + 8~9월 환급.',
  },
};

const FAQ_ITEMS = [
  {
    question: '자녀장려금과 근로장려금을 동시에 받을 수 있나요?',
    answer:
      '네, 자격 요건을 모두 만족하면 동시 수령 가능합니다(조세특례제한법 §100의2·§100의3). 예: 부부 합산 4,500만 원 + 자녀 2명 + 근로소득 → 자녀장려금(약 200만) + 근로장려금(홑벌이 약 200만) 동시 수령 가능. 5월 홈택스 신청 시 두 항목 모두 체크.',
  },
  {
    question: '소득·재산 기준은 정확히 어떻게 되나요?',
    answer:
      '자녀장려금: 부부 합산 총소득 7,000만 원 미만 + 가구 합산 재산 2.4억 원 미만 + 18세 미만 자녀 1인 이상. 근로장려금: 단독 2,200만/홑벌이 3,200만/맞벌이 3,800만 원 미만 + 재산 2.4억 미만 + 근로·사업소득(자녀 무관). 재산은 부동산·예금·주식 등 합산.',
  },
  {
    question: '5월 31일을 놓치면 영영 못 받나요?',
    answer:
      '근로소득자는 9월(반기 1차) + 익년 3월(반기 2차) 추가 신청 가능. 사업자는 5월 정기 신청만 가능. 다만 반기 신청은 환급액이 정기 대비 적을 수 있으므로 5월 내 신청 권장. 5월 31일이 토요일이면 익영업일까지 자동 연장(국세기본법 §5).',
  },
  {
    question: '환급은 언제 받을 수 있나요?',
    answer:
      '정기 신청(5월) → 8월 말~9월 초 본인 명의 통장 입금. 반기 신청 1차(9월) → 12월 입금. 반기 2차(3월) → 6월 입금. 진행 상황은 홈택스 "장려금 조회" 또는 "건강보험25시" 앱에서 실시간 확인. 본인 명의 통장 미입력 시 환급 지연.',
  },
  {
    question: '작년 수급자는 자동 신청 안내가 오나요?',
    answer:
      '네. 전년도 자녀·근로장려금 수급자에게는 5월 초 홈택스 알림 + 안내 문자가 자동 발송됩니다. 안내 링크에서 "신청 확인" 클릭 시 전년 정보가 자동 채워져 간소 신청 가능. 변동 사항(소득·자녀 수·재산)이 있으면 수정 후 신청.',
  },
];

export default function ChildEarnedIncomeCreditGuide() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '자녀·근로장려금 신청 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '2026 자녀·근로장려금 신청 완벽 가이드',
    description:
      '5월 31일 마감 자녀장려금·근로장려금 자격·금액·홈택스 신청 5단계·정기 vs 반기·환급 시점.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    type: 'Article',
    keywords: ['자녀장려금', '근로장려금', '5월 31일', '2026'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '2026 자녀·근로장려금 신청 완벽 가이드',
    description: '5월 31일 마감 자녀·근로장려금 자격·금액·신청·환급.',
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
                    { name: '자녀·근로장려금 신청 2026' },
                  ]}
                />
                <h1 className="mt-4 text-3xl font-bold text-text-primary md:text-4xl">
                  2026 자녀·근로장려금 신청 완벽 가이드
                </h1>
                <p className="mt-3 text-lg text-text-secondary" data-speakable>
                  <strong>5월 31일</strong>은 자녀장려금·근로장려금 정기 신청 마감일입니다.
                  저소득·중위소득 가구라면 자녀당 최대 100만 원 + 가구 유형별 최대 330만 원 환급 가능
                  (조세특례제한법 §100의2·§100의3). 홈택스 5단계 신청·자격·금액·환급 시점을 한 페이지에 정리.
                </p>
              </header>

              <AdSlot slot="guide-credit-app-top" format="horizontal" />

              {/* 1. 비교 */}
              <section aria-label="자녀 vs 근로 장려금 비교" className="card">
                <h2 className="mb-4 text-2xl font-semibold">자녀장려금 vs 근로장려금 비교</h2>
                <div className="overflow-x-auto" data-speakable>
                  <table className="w-full text-sm">
                    <caption className="sr-only">자녀장려금과 근로장려금 비교</caption>
                    <thead>
                      <tr className="border-b border-border-base text-left">
                        <th className="py-2 pr-4 font-semibold">항목</th>
                        <th className="py-2 pr-4 font-semibold">자녀장려금</th>
                        <th className="py-2 font-semibold">근로장려금</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-subtle"><td className="py-2 pr-4">법조항</td><td className="py-2 pr-4">조특법 §100의3</td><td className="py-2">조특법 §100의2</td></tr>
                      <tr className="border-b border-border-subtle"><td className="py-2 pr-4">필수 요건</td><td className="py-2 pr-4">18세 미만 자녀 1인 이상</td><td className="py-2">근로·사업소득 (자녀 무관)</td></tr>
                      <tr className="border-b border-border-subtle"><td className="py-2 pr-4">소득 기준</td><td className="py-2 pr-4">부부 합산 7,000만 미만</td><td className="py-2">단독 2,200만 / 홑벌이 3,200만 / 맞벌이 3,800만 미만</td></tr>
                      <tr className="border-b border-border-subtle"><td className="py-2 pr-4">재산 기준</td><td className="py-2 pr-4">2.4억 미만</td><td className="py-2">2.4억 미만</td></tr>
                      <tr className="border-b border-border-subtle"><td className="py-2 pr-4">최대 지급</td><td className="py-2 pr-4">자녀당 100만</td><td className="py-2">단독 165만 / 홑벌이 285만 / 맞벌이 330만</td></tr>
                      <tr><td className="py-2 pr-4">반기 신청</td><td className="py-2 pr-4">불가 (정기 5월만)</td><td className="py-2">9월·익년 3월 (근로소득자)</td></tr>
                    </tbody>
                  </table>
                </div>
              </section>

              {/* 2. 자녀장려금 자격·금액 */}
              <section aria-label="자녀장려금" className="card border-l-4 border-l-primary-500">
                <h2 className="mb-4 text-2xl font-semibold">자녀장려금 — 자녀당 100만 원</h2>
                <div className="space-y-3 text-text-secondary" data-speakable>
                  <div>
                    <h3 className="font-semibold text-text-primary">자격 요건 (모두 충족)</h3>
                    <ul className="list-inside list-disc text-sm space-y-1">
                      <li>18세 미만(2008-01-01 이후 출생) 자녀 1인 이상</li>
                      <li>부부 합산 총소득 7,000만 원 미만</li>
                      <li>가구 합산 재산 2.4억 원 미만 (부동산·예금·주식 등)</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold text-text-primary">지급액 (소득 구간별 점감)</h3>
                    <ul className="list-inside list-disc text-sm space-y-1">
                      <li>부부 합산 3,500만 이하: 자녀당 100만 (최대)</li>
                      <li>3,500만 ~ 7,000만: 점감 (소득 ↑ → 금액 ↓)</li>
                      <li>7,000만 초과: 0원</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* 3. 근로장려금 자격·금액 */}
              <section aria-label="근로장려금" className="card border-l-4 border-l-secondary-500">
                <h2 className="mb-4 text-2xl font-semibold">근로장려금 — 가구 유형별 최대 330만 원</h2>
                <div className="overflow-x-auto" data-speakable>
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border-base text-left">
                        <th className="py-2 pr-4 font-semibold">가구 유형</th>
                        <th className="py-2 pr-4 font-semibold">소득 기준</th>
                        <th className="py-2 font-semibold">최대 지급</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-subtle"><td className="py-2 pr-4">단독 (부양가족 X)</td><td className="py-2 pr-4">2,200만 미만</td><td className="py-2">165만 원</td></tr>
                      <tr className="border-b border-border-subtle"><td className="py-2 pr-4">홑벌이 (배우자·자녀 부양)</td><td className="py-2 pr-4">3,200만 미만</td><td className="py-2">285만 원</td></tr>
                      <tr><td className="py-2 pr-4">맞벌이 (부부 모두 소득)</td><td className="py-2 pr-4">합산 3,800만 미만</td><td className="py-2">330만 원</td></tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-3 text-sm text-text-tertiary">
                  소득 구간별 점감 적용. 정확한 금액은 홈택스 "장려금 자동 계산" 메뉴에서 시뮬 가능. 재산 기준 2.4억 미만 동일.
                </p>
              </section>

              <AdSlot slot="guide-credit-app-mid" format="rectangle" />

              {/* 4. FAQ */}
              <FaqSection items={[...FAQ_ITEMS]} />

              {/* 5. 신청 방법 5가지 */}
              <section aria-label="신청 방법 5가지" className="card">
                <h2 className="mb-4 text-2xl font-semibold">신청 방법 5가지</h2>
                <ol className="list-inside list-decimal space-y-2 text-text-secondary" data-speakable>
                  <li>
                    <strong>홈택스 (가장 일반)</strong>: hometax.go.kr → 공동·간편 인증 → "신고/납부 → 장려금" → 신청
                  </li>
                  <li>
                    <strong>손택스 앱 (모바일)</strong>: 앱 설치 → 로그인 → 하단 "신청" → 자녀/근로장려금 탭
                  </li>
                  <li>
                    <strong>전화 1566-3636</strong>: 국세청 장려금 전용 상담 → 안내 받아 신청
                  </li>
                  <li>
                    <strong>세무서 방문</strong>: 주소지 관할 세무서 → 신청서 작성 → 제출
                  </li>
                  <li>
                    <strong>자동 신청 안내</strong>: 전년도 수급자 → 5월 초 안내 문자 + 홈택스 자동 입력
                  </li>
                </ol>
              </section>

              {/* 6. 정기 vs 반기 */}
              <section aria-label="정기 vs 반기" className="card">
                <h2 className="mb-4 text-2xl font-semibold">정기 신청(5월) vs 반기 신청(근로소득자)</h2>
                <div className="overflow-x-auto" data-speakable>
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border-base text-left">
                        <th className="py-2 pr-4 font-semibold">유형</th>
                        <th className="py-2 pr-4 font-semibold">신청 기한</th>
                        <th className="py-2 font-semibold">환급 시점</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-subtle"><td className="py-2 pr-4">정기 (모든 가구)</td><td className="py-2 pr-4">5월 1~31일</td><td className="py-2">8월 말~9월 초</td></tr>
                      <tr className="border-b border-border-subtle"><td className="py-2 pr-4">반기 1차 (근로소득자만)</td><td className="py-2 pr-4">9월 1~30일</td><td className="py-2">12월</td></tr>
                      <tr><td className="py-2 pr-4">반기 2차 (근로소득자만)</td><td className="py-2 pr-4">익년 3월 1~31일</td><td className="py-2">6월</td></tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-3 text-sm text-text-tertiary">
                  사업소득자는 정기(5월)만 신청 가능. 반기는 환급액 정기 대비 적을 수 있어 5월 내 정기 신청 권장.
                </p>
              </section>

              {/* 7. 주의사항 */}
              <section aria-label="주의사항" className="card border-l-4 border-l-danger-500">
                <h2 className="mb-3 text-xl font-semibold">⚠️ 주의사항</h2>
                <ul className="list-inside list-disc space-y-1.5 text-sm text-text-secondary">
                  <li>소득 1원이라도 기준 초과 시 지급액 0원 (점감 X 절대 한도).</li>
                  <li>자녀 나이는 신청 기한(5월 31일) 기준 — 2008년 1월 1일 이후 출생.</li>
                  <li>재산은 가구원 합산 (배우자·미혼 자녀 명의 포함).</li>
                  <li>본인 명의 통장 미입력 시 환급 지연 또는 불가.</li>
                  <li>5월 31일 이후 정기 신청 불가 (근로소득자만 9월 반기).</li>
                </ul>
              </section>

              {/* 8. 관련 가이드·계산기 */}
              <section aria-label="관련 가이드·계산기" className="card">
                <h2 className="mb-4 text-2xl font-semibold">관련 가이드·계산기</h2>
                <ul className="space-y-2 text-text-secondary">
                  <li>→ <Link href="/guide/may-comprehensive-income-tax/" className="text-primary-600 underline dark:text-primary-500">5월 종합소득세 신고 가이드</Link> — 장려금과 동시 신고</li>
                  <li>→ <Link href="/guide/earned-income-tax-credit-vs-child/" className="text-primary-600 underline dark:text-primary-500">근로장려금 vs 자녀세액공제 차이</Link></li>
                  <li>→ <Link href="/calculator/salary/" className="text-primary-600 underline dark:text-primary-500">연봉 실수령액 계산기</Link> — 본인 소득 정확히 파악</li>
                  <li>→ <Link href="/calculator/freelancer-tax/" className="text-primary-600 underline dark:text-primary-500">프리랜서 종합소득세</Link> — 사업소득 신고</li>
                  <li>→ <Link href="/calculator/child-tax-credit/" className="text-primary-600 underline dark:text-primary-500">자녀세액공제 계산기</Link> — 별도 세액공제(연말정산)</li>
                </ul>
              </section>

              <ShareButtons title="2026 자녀·근로장려금 신청 가이드" url={URL} description="5월 31일 마감·자격·금액·신청 5단계·환급 시점." />

              {/* 출처·면책 */}
              <section
                aria-label="출처 및 면책"
                className="rounded-lg border border-border-base p-4 text-caption text-text-tertiary"
              >
                <p className="mb-2">
                  <strong>법적 근거</strong>: 조세특례제한법 §100의2 (근로장려금) · §100의3 (자녀장려금) · §100의4 ~ §100의30 (수급 요건·신청·환급) · 시행령 §100의2 (소득·재산 세부 기준) · 국세기본법 §5 (기한 연장). 참고: <a href="https://www.hometax.go.kr" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-600 underline dark:text-primary-500">홈택스</a>, <a href="https://www.nts.go.kr" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-600 underline dark:text-primary-500">국세청 1566-3636</a>, <a href="https://www.law.go.kr" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-600 underline dark:text-primary-500">법령정보센터</a>.
                </p>
                <p className="mb-2">
                  <strong>면책조항</strong>: 본 가이드는 일반 정보 제공 목적이며 세무·법적 조언이 아닙니다. 소득·재산 산정, 점감 구간별 정확한 금액, 가구 유형 판정 등 개별 사정은 반드시 국세청(1566-3636) 또는 세무사와 상담을 통해 확정하시기 바랍니다. 정확한 시뮬은 홈택스 "장려금 자동 계산" 메뉴 활용.
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
