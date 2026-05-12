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
  buildHowToJsonLd,
} from '@/lib/seo/jsonld';

const URL = 'https://calculatorhost.com/guide/october-vat-q2-preliminary/';
const DATE_PUBLISHED = '2026-05-12';
const DATE_MODIFIED = '2026-05-12';

export const metadata: Metadata = {
  title: '10월 부가세 2기 예정신고 가이드 2026 | 환급·예정고지·연말 절세',
  description:
    '2026년 10월 1~25일 부가가치세 2기 예정신고(7~9월 매출분) 완벽 가이드. 예정신고 vs 예정고지 차이·환급 가능성 점검·연말 절세 4가지·4분기 매입 계획·법인 vs 개인 차이.',
  keywords: [
    '부가세 2기 예정신고',
    '10월 부가세',
    '부가가치세 2기',
    '예정신고 vs 예정고지',
    '부가세 환급',
    '부가세 절세',
    '3분기 부가세',
    '연말 부가세 계획',
    '4분기 매입',
    '2026 부가가치세',
  ],
  alternates: { canonical: URL },
  openGraph: {
    title: '10월 부가세 2기 예정신고 가이드 2026',
    description: '예정신고 vs 예정고지·환급 가능성·연말 절세 4가지·4분기 매입 계획.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '10월 부가세 2기 예정신고 가이드 2026',
    description: '하반기 부가세 절세 시작점. 예정신고·환급·연말 매입 계획.',
  },
};

const FAQ_ITEMS = [
  {
    question: '예정신고와 예정고지는 무엇이 다른가요?',
    answer:
      '예정신고는 직접 매출·매입을 계산해 신고·납부하는 의무, 예정고지는 국세청이 직전 과세기간 납부세액의 1/2을 자동으로 통지해 납부만 하는 방식입니다(부가가치세법 §48 + 시행령 §90). 모든 법인은 예정신고 의무. 일반과세 개인사업자는 직전 2기 납부세액 50만 원 미만 면제, 50만~100만 미만은 예정고지(납부만), 100만 이상은 예정신고(직접).',
  },
  {
    question: '예정신고 안 하면 어떻게 되나요?',
    answer:
      '예정신고 의무자가 무신고 시 무신고 가산세 20%(부정행위 40%) + 납부지연가산세 일 0.022% 부과(부가가치세법 §66, 국세기본법 §47의2). 예정고지 대상자는 신고 의무 없이 통지 세액만 납부하면 가산세 없음. 단, 납부도 놓치면 납부지연 가산세 별도.',
  },
  {
    question: '10월에 환급받을 수 있는 경우는?',
    answer:
      '7~9월 매입세액이 매출세액보다 크면 환급 발생. 대표적인 경우: 신규 시설·장비 투자, 수출 사업(영세율로 매출세액 0), 거래처 결산·휴가로 매출 일시 감소, 면세 매입 비중 낮음. 신고 후 보통 2~4주 내 본인 명의 통장으로 입금. 홈택스 "환급 조회"에서 실시간 추적 가능.',
  },
  {
    question: '간이과세자는 10월에 무엇을 해야 하나요?',
    answer:
      '간이과세자는 10월 신고 의무 없습니다. 1월 1~25일 연 1회 1년치(1~12월) 정기신고만 하면 됩니다(부가가치세법 §67). 다만 연 매출 4,800만 원 이상 간이과세자는 세금계산서 발급 의무가 있고, 매입자가 일반과세자라면 발급 요청 가능합니다.',
  },
  {
    question: '연말 부가세 절세는 어떻게 시작하나요?',
    answer:
      '4분기(10~12월) 매입 가속이 핵심입니다. 12월 중 외주비·재료비·소모품을 선구매하고 세금계산서를 12월 자로 받으면 1월 확정신고 시 매입세액 공제 → 납부세액 감소. 단 세금계산서 일자가 12월이어야 인정. 또한 면세 매입(식료품·도서·교육비 등)과 개인비 사용분은 공제 불가이므로 사업비와 명확히 구분해야 합니다.',
  },
];

export default function OctoberVatGuide() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '10월 부가세 2기 예정신고 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '10월 부가세 2기 예정신고 가이드 2026',
    description:
      '10월 1~25일 부가가치세 2기 예정신고. 예정신고 vs 예정고지 차이, 환급 가능성, 연말 절세 4가지, 4분기 매입 계획.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    type: 'Article',
    keywords: ['10월 부가세', '2기 예정신고', '예정고지', '환급', '2026'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '10월 부가세 2기 예정신고 가이드 2026',
    description:
      '하반기 부가세 절세 시작점. 예정신고·환급·연말 매입 전략.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
  });
  const faqLd = buildFaqPageJsonLd([...FAQ_ITEMS]);
  const speakableLd = buildSpeakableJsonLd(['[data-speakable]']);
  const howtoLd = buildHowToJsonLd({
    name: '홈택스에서 부가세 2기 예정신고하기',
    description: '10월 부가세 2기 예정신고 5단계',
    steps: [
      {
        name: '신고 대상 확인',
        text: '직전 과세기간(2025년 2기) 납부세액 100만 원 이상 일반과세 개인사업자 + 모든 법인 → 예정신고. 50만 미만은 면제, 50~100만 미만은 예정고지 자동.',
      },
      {
        name: '홈택스 로그인 + 메뉴 진입',
        text: '홈택스(hometax.go.kr) → "신고/납부" → "부가가치세" → "예정신고" 선택.',
      },
      {
        name: '과세기간 + 자료 확인',
        text: '"2026년 2기 예정 (7~9월)" 선택. 국세청 연계 자료(세금계산서·신용카드 매출) 자동 입력 + 누락 직접 입력.',
      },
      {
        name: '매출·매입 입력 + 환급 자동 계산',
        text: '매출세액 = 매출액 × 10/110, 매입세액 = 세금계산서·신용카드·현금영수증 매입의 부가세. 매입 > 매출이면 환급 자동 계산.',
      },
      {
        name: '전자신고 + 납부 또는 환급',
        text: '"전자신고" → 신고증명서 PDF 보관. 납부는 신용카드·계좌이체·가상계좌로 10월 25일까지. 환급은 본인 통장 입력.',
      },
    ],
  });

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howtoLd) }} />

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
                    { name: '10월 부가세 2기 예정신고' },
                  ]}
                />
                <h1 className="mt-4 text-3xl font-bold text-text-primary md:text-4xl">
                  10월 부가세 2기 예정신고 가이드 2026
                </h1>
                <p className="mt-3 text-lg text-text-secondary" data-speakable>
                  2026년 10월 1~25일은 부가가치세 2기 예정신고(7~9월 매출분) 시즌입니다. 4월 1기 예정신고와 같은
                  구조이나, 하반기 시작점에서 <strong>환급 가능성 점검</strong>과 <strong>연말 절세 계획</strong>까지
                  검토해야 합니다(부가가치세법 §48 + 시행령 §90).
                </p>
              </header>

              <AdSlot slot="guide-oct-vat-top" format="horizontal" />

              {/* 1. 신고 대상 구분 */}
              <section aria-label="신고 대상 구분" className="card">
                <h2 className="mb-4 text-2xl font-semibold">예정신고 vs 예정고지 vs 면제</h2>
                <div className="overflow-x-auto" data-speakable>
                  <table className="w-full text-sm">
                    <caption className="sr-only">2기 예정신고 대상 구분</caption>
                    <thead>
                      <tr className="border-b border-border-base text-left">
                        <th className="py-2 pr-4 font-semibold">대상</th>
                        <th className="py-2 pr-4 font-semibold">조건</th>
                        <th className="py-2 font-semibold">10월 의무</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-subtle"><td className="py-2 pr-4">법인</td><td className="py-2 pr-4">모든 법인 (예외 X)</td><td className="py-2">예정신고 (직접)</td></tr>
                      <tr className="border-b border-border-subtle"><td className="py-2 pr-4">일반과세 개인</td><td className="py-2 pr-4">직전 2기 납부세액 100만 이상</td><td className="py-2">예정신고 (직접)</td></tr>
                      <tr className="border-b border-border-subtle"><td className="py-2 pr-4">일반과세 개인</td><td className="py-2 pr-4">직전 2기 50만 ~ 100만 미만</td><td className="py-2">예정고지 (납부만)</td></tr>
                      <tr className="border-b border-border-subtle"><td className="py-2 pr-4">일반과세 개인</td><td className="py-2 pr-4">직전 2기 50만 미만</td><td className="py-2">면제</td></tr>
                      <tr className="border-b border-border-subtle"><td className="py-2 pr-4">간이과세자</td><td className="py-2 pr-4">연 1회 (1월) 신고</td><td className="py-2">10월 면제</td></tr>
                      <tr><td className="py-2 pr-4">신규 사업자</td><td className="py-2 pr-4">사업등록 1년 미만</td><td className="py-2">첫 신고까지 면제</td></tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-3 text-sm text-text-tertiary">
                  근거: 부가가치세법 §48 (예정신고) + 시행령 §90 (예정고지 기준). 직전 2기 납부세액은 홈택스
                  "신고/납부 → 과거 신고 현황"에서 확인.
                </p>
              </section>

              {/* 2. 4월 1기 vs 10월 2기 차별화 */}
              <section aria-label="4월 vs 10월 차별화" className="card">
                <h2 className="mb-4 text-2xl font-semibold">4월 1기 예정 vs 10월 2기 예정</h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm" data-speakable>
                    <thead>
                      <tr className="border-b border-border-base text-left">
                        <th className="py-2 pr-4 font-semibold">항목</th>
                        <th className="py-2 pr-4 font-semibold">4월 1기 예정</th>
                        <th className="py-2 font-semibold">10월 2기 예정 ⭐</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-subtle"><td className="py-2 pr-4">과세기간</td><td className="py-2 pr-4">1~3월</td><td className="py-2">7~9월</td></tr>
                      <tr className="border-b border-border-subtle"><td className="py-2 pr-4">신고 기한</td><td className="py-2 pr-4">4/1~25</td><td className="py-2">10/1~25</td></tr>
                      <tr className="border-b border-border-subtle"><td className="py-2 pr-4">환급 가능성</td><td className="py-2 pr-4">낮음</td><td className="py-2"><strong>높음</strong> (상반기 시설 투자 누적)</td></tr>
                      <tr><td className="py-2 pr-4">연말 연계</td><td className="py-2 pr-4">간접</td><td className="py-2"><strong>직접</strong> (4분기 매입 계획 시작점)</td></tr>
                    </tbody>
                  </table>
                </div>
              </section>

              <AdSlot slot="guide-oct-vat-mid" format="rectangle" />

              {/* 3. FAQ (중간 배치 — GEO) */}
              <FaqSection items={[...FAQ_ITEMS]} />

              {/* 4. 환급 가능성 점검 */}
              <section aria-label="환급 가능성" className="card">
                <h2 className="mb-4 text-2xl font-semibold">10월 환급 가능성 점검</h2>
                <p className="mb-3 text-text-secondary" data-speakable>
                  매입세액(7~9월 사업 매입의 부가세) &gt; 매출세액(7~9월 매출의 부가세)이면 환급 발생.
                  10월은 특히 환급 사례가 많은 시기입니다.
                </p>
                <ul className="list-inside list-disc space-y-1.5 text-sm text-text-secondary">
                  <li><strong>신규 시설·장비 투자</strong>: 상반기 계획한 매입이 7~9월 실행 → 매입세액 폭증</li>
                  <li><strong>수출 사업</strong>: 영세율(0%) 적용으로 매출세액 0 + 전체 매입세액 환급 가능</li>
                  <li><strong>매출 일시 감소</strong>: 거래처 결산·휴가로 7~9월 실적 부진</li>
                  <li><strong>면세 매입 비중 낮음</strong>: 사업 관련 매입의 대부분이 과세 거래</li>
                </ul>
                <p className="mt-3 text-sm text-text-tertiary">
                  환급은 신고 후 2~4주 내 본인 명의 통장 입금. 홈택스 "환급 조회"에서 실시간 추적.
                </p>
              </section>

              {/* 5. 연말 절세 4가지 */}
              <section aria-label="연말 절세 4가지" className="card">
                <h2 className="mb-4 text-2xl font-semibold">연말 부가세 절세 4가지 (10월 시작)</h2>
                <div className="space-y-3 text-text-secondary">
                  <div>
                    <h3 className="font-semibold text-text-primary">① 4분기 매입 가속화</h3>
                    <p className="text-sm">
                      12월 중 외주비·재료비·소모품 선구매 + 세금계산서 12월 자 수령 → 1월 확정신고 시
                      매입세액 공제. 예: 12월 매입 300만 + 부가세 30만 → 1월 납부세액 30만 감소.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-text-primary">② 세금계산서 발급 시점 확인</h3>
                    <p className="text-sm">
                      거래처가 12월 자 세금계산서를 1월에 발급하면 다음 기로 이월. 11~12월 중 거래처에
                      발급 일정 미리 확인 + 12월 20일경까지 마감 권장.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-text-primary">③ 면세 매입 vs 과세 매입 구분</h3>
                    <p className="text-sm">
                      면세 매입(식료품·도서·교육비·의료비·주택임대)은 매입세액 공제 불가. 과세 매입만 공제.
                      4분기 구매 시 사업 관련 과세 매입 우선.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-text-primary">④ 개인비 vs 사업비 명확히</h3>
                    <p className="text-sm">
                      본인·가족 의료비, 거주용 주택 비용, 개인카드 사용분은 공제 불가. 10월 예정신고 때
                      매입 내역 재점검 → 개인비 오신고 정정 기회.
                    </p>
                  </div>
                </div>
              </section>

              {/* 6. 신고 준비물 */}
              <section aria-label="신고 준비물" className="card">
                <h2 className="mb-4 text-2xl font-semibold">신고 준비물 + 자동 입력 자료</h2>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <h3 className="mb-2 font-semibold text-text-primary">필수 서류</h3>
                    <ul className="list-inside list-disc space-y-1 text-sm text-text-secondary">
                      <li>세금계산서 매출/매입 합계</li>
                      <li>신용카드 매출 명세</li>
                      <li>현금영수증 (발급/수령)</li>
                      <li>지난해 1월 확정신고 사본</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="mb-2 font-semibold text-text-primary">홈택스 자동 입력</h3>
                    <ul className="list-inside list-disc space-y-1 text-sm text-text-secondary">
                      <li>전자세금계산서 매출/매입</li>
                      <li>신용카드 매출 자동 수집</li>
                      <li>통신·전기·가스 영수증</li>
                      <li>(미입력 항목은 직접 입력)</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* 7. 주의사항 */}
              <section aria-label="주의사항" className="card border-l-4 border-l-danger-500">
                <h2 className="mb-3 text-xl font-semibold">⚠️ 주의사항</h2>
                <ul className="list-inside list-disc space-y-1.5 text-sm text-text-secondary">
                  <li>법인은 예외 없이 예정신고 의무 — 미신고 시 가산세 20%(부가가치세법 §66).</li>
                  <li>예정고지 대상자도 통지 세액 미납 시 납부지연 가산세 부과.</li>
                  <li>전자세금계산서 의무: 모든 법인 + 직전 연도 사업장별 과세 공급가액 8천만 원 이상 개인사업자(§32).</li>
                  <li>예정신고 환급과 1월 확정신고 환급은 별도 처리. 중복 환급 X.</li>
                </ul>
              </section>

              {/* 8. 관련 계산기·가이드 */}
              <section aria-label="관련 계산기·가이드" className="card">
                <h2 className="mb-4 text-2xl font-semibold">관련 계산기·가이드</h2>
                <ul className="space-y-2 text-text-secondary">
                  <li>→ <Link href="/calculator/vat/" className="text-primary-600 underline dark:text-primary-500">부가가치세 계산기</Link> — 매출/매입 입력 즉시 시뮬</li>
                  <li>→ <Link href="/guide/april-vat-preliminary-q1/" className="text-primary-600 underline dark:text-primary-500">4월 1기 예정신고 가이드</Link> — 1기 기본 설명</li>
                  <li>→ <Link href="/guide/july-vat-final-1st-half/" className="text-primary-600 underline dark:text-primary-500">7월 1기 확정신고 가이드</Link> — 확정신고 완벽</li>
                  <li>→ <Link href="/calculator/freelancer-tax/" className="text-primary-600 underline dark:text-primary-500">프리랜서 종합소득세 계산기</Link> — 부가세 + 종소세 동시</li>
                </ul>
              </section>

              <ShareButtons title="10월 부가세 2기 예정신고 가이드 2026" url={URL} description="예정신고 vs 예정고지·환급·연말 절세 4가지." />

              {/* 출처·면책 */}
              <section
                aria-label="출처 및 면책"
                className="rounded-lg border border-border-base p-4 text-caption text-text-tertiary"
              >
                <p className="mb-2">
                  <strong>법적 근거</strong>: 부가가치세법 §32 (전자세금계산서) · §38 (매입세액공제) · §48 (예정신고·예정고지) · §63 (간이과세자) · §66 (가산세) · §67 (간이과세자 신고) · 시행령 §90 (예정신고·예정고지 기준) · 국세기본법 §5 (기한 연장) · §47의2 (무신고가산세). 참고: <a href="https://www.hometax.go.kr" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-600 underline dark:text-primary-500">국세청 홈택스</a>, <a href="https://www.nts.go.kr" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-600 underline dark:text-primary-500">국세청</a>, <a href="https://www.law.go.kr" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-600 underline dark:text-primary-500">법령정보센터</a>.
                </p>
                <p className="mb-2">
                  <strong>면책조항</strong>: 본 가이드는 일반 정보 제공 목적이며 세무·법적 조언이 아닙니다. 개별 사정(복잡한 거래, 특수 산업, 수출 환급 신청 등)은 반드시 세무사 또는 국세청 상담을 통해 확정하시기 바랍니다.
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
