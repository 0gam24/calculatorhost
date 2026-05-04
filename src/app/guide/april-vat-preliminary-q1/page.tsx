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

const URL = 'https://calculatorhost.com/guide/april-vat-preliminary-q1/';
const DATE_PUBLISHED = '2026-05-03';
const DATE_MODIFIED = '2026-05-03';

export const metadata: Metadata = {
  title: '4월 부가세 1기 예정신고 가이드 2026 | 1~3월 매출·매입 신고 | calculatorhost',
  description:
    '2026년 4월 1~25일 부가가치세 1기 예정신고·납부 완벽 가이드. 일반과세자 의무·간이과세자 면제·신고 대상·매출세액 vs 매입세액공제·홈택스 단계별 신고법.',
  keywords: [
    '부가세 1기 예정신고',
    '부가세 4월 신고',
    '부가가치세 신고',
    '부가세 신고 방법',
    '일반과세 부가세',
    '간이과세 부가세',
    '홈택스 부가세 신고',
    '부가세 매입세액공제',
  ],
  alternates: { canonical: URL },
  openGraph: {
    title: '4월 부가세 1기 예정신고 가이드 2026',
    description: '4월 1~25일 신고 마감. 매출세액·매입세액공제 정리.',
    url: URL,
    type: 'article',

    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
};

const FAQ_ITEMS = [
  {
    question: '부가세 1기 예정신고 대상은 누구인가요?',
    answer:
      '일반과세자 (개인사업자·법인). 간이과세자는 1년에 1회 (1월) 신고 — 4월 예정신고 의무 X. 단 일반과세자 중 직전 1년 매출 4,800만 원 미만은 예정고지서 자동 발급 (직전 부가세의 1/2). 신규 사업자는 예정신고 면제.',
  },
  {
    question: '신고 기한과 방법은?',
    answer:
      '2026년 4월 1~25일 (25일 토요일이면 다음 영업일). 홈택스(hometax.go.kr) 전자신고 의무. 25일 23:59 마감. 미신고 시 무신고가산세 20% + 납부지연 일 0.022%. 4월 25일 이후 종이 신고도 가능하나 가산세 부과.',
  },
  {
    question: '부가세 계산식은?',
    answer:
      '납부세액 = 매출세액 (매출 × 10%) − 매입세액 (매입 × 10%, 사업 관련만 공제). 예: 1~3월 매출 5천만 + 매입 2천만 → 매출세액 500만 − 매입세액 200만 = 납부세액 300만. 매입이 매출보다 많으면 환급.',
  },
  {
    question: '매입세액공제 받을 수 있는 비용은?',
    answer:
      '사업 관련 모든 매입 (세금계산서·신용카드영수증·현금영수증 발급분). 임대료·통신비·소모품·외주비·교통비·접대비 (한도) 등. 단, ①사업과 무관 ②면세 매입 ③접대비 한도 초과 ④비영업용 차량 ⑤간이과세 매입 일부 ⑥세금계산서 미발급분 → 공제 불가.',
  },
  {
    question: '간이과세자도 4월에 신고하나요?',
    answer:
      '아니요. 간이과세자는 1년에 1회 (1월 25일까지 직전 연도 1년치) 신고. 4월·10월 예정신고 면제. 단 연 매출 4,800만 원 미만이면 부가세 납부 의무 자체 면제 (신고는 필요).',
  },
  {
    question: '홈택스 부가세 신고는 어떻게?',
    answer:
      '홈택스 → "신고/납부" → "부가가치세" → "정기신고" 또는 "예정신고". ①사업자등록번호 입력 ②매출 (세금계산서·신용카드·현금영수증 자동 자료) ③매입세액공제 ④납부 또는 환급. 신고 후 가상계좌·신용카드·계좌이체로 납부.',
  },
  {
    question: '환급 받을 수 있는 케이스는?',
    answer:
      '①사업 초기 시설 투자 큰 매입 ②영세율 매출 (수출·국제운송) ③매출 일시 감소 + 매입 유지. 일반과세자는 환급 가능, 간이과세자는 환급 X (납부세액 0이 최저). 환급은 신고 후 약 30일 이내 입금.',
  },
  {
    question: '전자세금계산서 발급 의무는?',
    answer:
      '직전 연도 매출 8천만 원 이상 개인사업자 + 모든 법인사업자 의무. 미발급·지연발급 시 매출액의 0.5~2% 가산세. 홈택스에서 무료 발급 또는 더존·이카운트 등 회계SW 활용.',
  },
] as const;

export default function AprilVatPreliminaryQ1Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '4월 부가세 1기 예정신고' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '4월 부가세 1기 예정신고 가이드 (2026) — 4월 1~25일',
    description: '일반과세자 부가세 신고·매출세액·매입세액공제·홈택스 신고법.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['부가세 1기 예정신고', '부가가치세 신고', '4월 부가세'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '4월 부가세 1기 예정신고 가이드 2026',
    description: '2026년 4월 1~25일 부가가치세 1기 예정신고·납부 완벽 가이드. 일반과세자 의무·간이과세자 면제·신고 대상·매출세액 vs 매입세액공제·홈택스 단계별 신고법.',
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
                    { name: '4월 부가세 1기 예정신고' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">세금·사업자 · 8분 읽기 · 2026-05-03</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  4월 부가세 1기 예정신고 가이드 (2026)
                  <br />
                  <span className="text-2xl text-text-secondary">— 4월 1~25일 신고·납부</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  일반과세 개인사업자·법인은 4월 1~25일 부가세 1기 예정신고·납부 의무. 1~3월 매출과
                  매입을 정리해 매출세액에서 매입세액을 차감한 납부세액을 신고합니다. 환급 발생 시
                  약 30일 내 입금. 홈택스 전자신고 절차와 절세 핵심을 정리합니다.
                </p>
              </header>

              <AdSlot slot="guide-vat-q1-top" format="horizontal" />

              <section aria-label="핵심 요약" className="card border-l-4 border-l-primary-500">
                <h2 className="mb-2 text-caption uppercase tracking-wider text-primary-500">핵심 요약</h2>
                <ul className="space-y-1.5 text-sm" data-speakable>
                  <li>📅 <strong>기간</strong>: 4월 1~25일 (25일 토요일이면 익영업일)</li>
                  <li>👥 <strong>대상</strong>: 일반과세 개인사업자·법인 (간이과세자 면제)</li>
                  <li>📊 <strong>공식</strong>: 매출세액 (매출 × 10%) − 매입세액공제 = 납부세액</li>
                  <li>💰 <strong>환급</strong>: 매입 &gt; 매출 시 약 30일 내 입금</li>
                  <li>🛠 <strong>도구</strong>: 홈택스 전자신고 (의무)</li>
                  <li>⚠️ <strong>가산세</strong>: 무신고 20%, 부정 40%, 납부지연 일 0.022%</li>
                </ul>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">1. 부가세 1기 예정신고란?</h2>
                <p className="text-text-secondary leading-relaxed">
                  부가가치세는 1년에 2기로 나누어 신고. 1기는 1~6월, 2기는 7~12월. 각 기마다
                  예정신고 (3개월 분) + 확정신고 (6개월 분 합산) 2회. 일반과세자는 의무, 간이과세자는
                  1년 1회만 (1월) — 예정신고 면제.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <thead>
                      <tr className="bg-primary-500/10 border border-border-base">
                        <th className="px-3 py-2 text-left">신고 시기</th>
                        <th className="px-3 py-2 text-left">대상 기간</th>
                        <th className="px-3 py-2 text-left">대상자</th>
                      </tr>
                    </thead>
                    <tbody className="text-text-secondary">
                      <tr className="border border-border-base bg-primary-500/5">
                        <td className="px-3 py-2 font-bold">4월 1~25일 ⭐</td>
                        <td className="px-3 py-2">1~3월</td>
                        <td className="px-3 py-2">일반과세 (1기 예정신고)</td>
                      </tr>
                      <tr className="border border-border-base">
                        <td className="px-3 py-2">7월 1~25일</td>
                        <td className="px-3 py-2">1~6월 (예정 차감)</td>
                        <td className="px-3 py-2">일반과세 (1기 확정)</td>
                      </tr>
                      <tr className="border border-border-base">
                        <td className="px-3 py-2">10월 1~25일</td>
                        <td className="px-3 py-2">7~9월</td>
                        <td className="px-3 py-2">일반과세 (2기 예정)</td>
                      </tr>
                      <tr className="border border-border-base">
                        <td className="px-3 py-2">1월 1~25일</td>
                        <td className="px-3 py-2">7~12월 (예정 차감)</td>
                        <td className="px-3 py-2">일반과세 (2기 확정) + 간이과세 (연 1회)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">2. 부가세 계산식</h2>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-mono text-sm bg-bg-raised p-3 rounded">
                    납부세액 = (매출 × 10%) − (매입 × 10% × 공제율)
                  </p>
                </div>
                <div className="rounded-lg bg-bg-raised p-4 text-sm">
                  <strong className="text-text-primary">📌 시뮬레이션 — 1~3월 신고</strong>
                  <ul className="mt-2 text-text-secondary space-y-1">
                    <li>매출: 5,000만 원 (공급가액 기준, VAT 미포함)</li>
                    <li>매입: 2,000만 원 (사업 관련, 세금계산서 보유)</li>
                    <li>매출세액: 5,000만 × 10% = <strong>500만 원</strong></li>
                    <li>매입세액공제: 2,000만 × 10% = <strong>200만 원</strong></li>
                    <li className="pt-2 border-t border-border-base"><strong>납부세액: 500만 − 200만 = 300만 원</strong></li>
                  </ul>
                  <p className="mt-2 text-text-tertiary">
                    →{' '}
                    <Link href="/calculator/vat/" className="text-primary-600 underline dark:text-primary-500">
                      부가세 계산기
                    </Link>
                    에서 본인 시뮬레이션
                  </p>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">3. 매입세액공제 받을 수 있는 비용</h2>
                <div className="grid gap-3 md:grid-cols-2">
                  <div className="rounded-lg border border-primary-500/30 bg-primary-500/5 p-4">
                    <h3 className="mb-2 font-semibold text-primary-700 dark:text-primary-300">✅ 공제 가능</h3>
                    <ul className="text-sm text-text-secondary space-y-1">
                      <li>• 임대료 (사업장)</li>
                      <li>• 통신비·인터넷</li>
                      <li>• 소모품·재료비</li>
                      <li>• 외주·용역비 (세금계산서)</li>
                      <li>• 광고선전비</li>
                      <li>• 직원 식대 (한도)</li>
                      <li>• 사업용 차량 유지비 (영업용)</li>
                      <li>• 사무용 가구·기기</li>
                    </ul>
                  </div>
                  <div className="rounded-lg border border-danger-500/30 bg-danger-500/5 p-4">
                    <h3 className="mb-2 font-semibold text-danger-700 dark:text-danger-300">❌ 공제 불가</h3>
                    <ul className="text-sm text-text-secondary space-y-1">
                      <li>• 사업과 무관 매입 (사적 사용)</li>
                      <li>• 면세 매입 (의료·교육 등)</li>
                      <li>• 접대비 (한도 초과분)</li>
                      <li>• 비영업용 차량 (중·대형 SUV)</li>
                      <li>• 간이과세 매입 (제한적 공제)</li>
                      <li>• 세금계산서 미발급분</li>
                      <li>• 부가세 면세 사업자 매입</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">4. 홈택스 신고 단계</h2>
                <ol className="space-y-3 text-sm">
                  <li className="rounded-lg border border-border-base bg-bg-card p-4">
                    <strong className="text-text-primary block mb-1">Step 1. 자료 정리 (3월 31일까지)</strong>
                    <p className="text-text-secondary">매출 (세금계산서·신용카드·현금영수증) + 매입 (세금계산서) 일자별 정리. 회계 SW 사용 시 자동 집계.</p>
                  </li>
                  <li className="rounded-lg border border-border-base bg-bg-card p-4">
                    <strong className="text-text-primary block mb-1">Step 2. 홈택스 로그인</strong>
                    <p className="text-text-secondary">사업자등록증 보유자만 가능. 공동인증서·간편인증 로그인.</p>
                  </li>
                  <li className="rounded-lg border border-border-base bg-bg-card p-4">
                    <strong className="text-text-primary block mb-1">Step 3. 부가세 신고서 작성</strong>
                    <p className="text-text-secondary">"신고/납부" → "부가가치세" → "예정신고". 매출·매입 자료 자동 채움 + 누락분 직접 입력.</p>
                  </li>
                  <li className="rounded-lg border border-border-base bg-bg-card p-4">
                    <strong className="text-text-primary block mb-1">Step 4. 결과 확인 → 전자신고</strong>
                    <p className="text-text-secondary">납부세액 또는 환급액 확인. 전자신고 → 접수증 PDF 보관.</p>
                  </li>
                  <li className="rounded-lg border border-border-base bg-bg-card p-4">
                    <strong className="text-text-primary block mb-1">Step 5. 납부 (4월 25일까지)</strong>
                    <p className="text-text-secondary">신용카드 (수수료 0.8%) / 계좌이체 / 가상계좌. 환급 시 통장 입력.</p>
                  </li>
                </ol>
              </section>

              <FaqSection items={[...FAQ_ITEMS]} />

              <section className="card border-l-4 border-l-danger-500 bg-danger-500/5">
                <h2 className="mb-2 text-lg font-semibold text-danger-700 dark:text-danger-300">⚠️ 주의사항</h2>
                <ul className="space-y-2 text-sm text-danger-700 dark:text-danger-300">
                  <li>• 본 가이드는 일반론 — 복잡한 케이스(다업종·해외 거래·면세 사업)는 세무사 상담 권장.</li>
                  <li>• 전자세금계산서 발급 의무 위반 시 매출액 0.5~2% 가산세.</li>
                  <li>• 매입세액공제는 세금계산서·적격증빙 필수 — 영수증만으로는 공제 불가.</li>
                  <li>• 직전 연도 매출 4,800만 미만 일반과세자는 예정고지서 자동 발급 — 신고 X.</li>
                </ul>
              </section>

              <section className="card">
                <h2 className="mb-3 text-lg font-semibold">📊 관련 도구·가이드</h2>
                <ul className="space-y-2 text-sm">
                  <li>→ <Link href="/calculator/vat/" className="text-primary-600 underline dark:text-primary-500">부가가치세 계산기</Link></li>
                  <li>→ <Link href="/guide/april-comprehensive-property-tax-exclusion/" className="text-primary-600 underline dark:text-primary-500">4월 종부세 합산배제 신청</Link></li>
                  <li>→ <Link href="/guide/may-comprehensive-income-tax/" className="text-primary-600 underline dark:text-primary-500">5월 종합소득세 신고</Link></li>
                  <li>→ <Link href="/guide/tax-calendar-2026/" className="text-primary-600 underline dark:text-primary-500">2026 세금 캘린더</Link></li>
                </ul>
              </section>

              <ShareButtons title="4월 부가세 1기 예정신고 가이드 2026" url={URL} />

              <section aria-label="출처 및 면책" className="rounded-lg border border-border-base p-4 text-caption text-text-tertiary">
                <p className="mb-2">
                  <strong>법적 근거</strong>: 부가가치세법 §3·§13·§14·§38·§48 (예정신고). 참고:{' '}
                  <a href="https://www.hometax.go.kr" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-600 underline dark:text-primary-500">국세청 홈택스</a>.
                </p>
                <p><strong>업데이트</strong>: {DATE_MODIFIED} · 작성·검수: 김준혁 (스마트데이터샵)</p>
              </section>
            </article>
          </main>
        </div>
        <Footer />
      </div>
    </>
  );
}
