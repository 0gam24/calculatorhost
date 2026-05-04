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

const URL = 'https://calculatorhost.com/guide/february-tax-refund-tracking/';
const DATE_PUBLISHED = '2026-05-03';
const DATE_MODIFIED = '2026-05-03';

export const metadata: Metadata = {
  title: '2월 연말정산 환급 추적 + 5월 종소세 사전 준비 가이드 2026 | calculatorhost',
  description:
    '2월 연말정산 환급/추가 납부 결과 확인·이의제기·5월 종합소득세 누락 공제 정정·사전 준비 완벽 가이드. 환급 안 들어왔을 때, 추가 납부 결과 받았을 때 대응법.',
  keywords: [
    '연말정산 환급',
    '환급 안들어옴',
    '환급 늦음',
    '연말정산 추가납부',
    '경정청구',
    '5월 종소세 준비',
    '연말정산 이의제기',
  ],
  alternates: { canonical: URL },
  openGraph: {
    title: '2월 연말정산 환급 추적 + 5월 종소세 사전 준비',
    description: '환급 결과 확인 + 추가 납부 대응 + 5월 정정 신고 준비.',
    url: URL,
    type: 'article',

    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
};

const FAQ_ITEMS = [
  {
    question: '연말정산 환급은 언제 들어오나요?',
    answer:
      '회사 일정에 따라 다름. 일반적으로 2월 급여일 또는 3월 급여일 반영. 회사가 1월 말까지 신고 마치고 국세청 처리 완료되면 2월 급여에 추가/차감 형태로 반영. 늦으면 3월까지 가능. 4월까지 안 들어오면 회사 인사팀 문의.',
  },
  {
    question: '환급금 정확한 금액 미리 확인하려면?',
    answer:
      '회사가 발급한 "연말정산 결과 확인서" 또는 "근로소득 원천징수영수증"의 "차감징수세액" 항목 확인. 음수면 환급(돌려받음), 양수면 추가 납부. 홈택스 → "지급명세서 등 제출 내역 조회"에서도 확인.',
  },
  {
    question: '환급을 더 받을 수 있는 누락 공제는?',
    answer:
      '대표 누락 사례 ① 안경·콘텍트렌즈 구입비 (의료비 50만 한도) ② 신용카드 가족 사용분 (본인 명의 카드만) ③ 월세 (무주택·총급여 7천 이하 750만 한도 17%) ④ 기부금 (연말 기부 영수증) ⑤ 부모님·시부모님 인적공제 (소득 100만 이하면 부양가족) ⑥ 중도 입사 전 직장 자료. 5월 종소세 신고로 정정·환급 가능.',
  },
  {
    question: '5월 종합소득세 신고로 환급 추가 받을 수 있나요?',
    answer:
      '네, 가능합니다. 연말정산에서 누락된 공제·소득은 5월 1~31일 종소세 신고 (또는 5년 이내 경정청구)로 정정 가능. 본인이 직접 홈택스 신고. 환급은 신고 후 6월 말~7월 초 입금. 추가 납부도 가능하므로 사전 시뮬레이션 필수.',
  },
  {
    question: '경정청구(경정신청)란 무엇인가요?',
    answer:
      '연말정산·종소세 신고 후 누락·오류 발견 시 정정 신청. 5년 이내 가능 (국세기본법 §45의2). 환급세액이 늘어나면 환급, 줄어들면 추가 납부. 홈택스 → "신고/납부" → "경정청구" 메뉴 또는 세무사 위임. 개인이 직접 신청 가능.',
  },
  {
    question: '추가 납부 결과 받았는데 어떻게 대응?',
    answer:
      '① 추가 납부 금액·이유 확인 (회사 발급 결과서) ② 누락 공제 점검 (본 가이드 Q3 참고) ③ 누락 발견 시 5월 종소세 신고로 정정 ④ 추가 납부는 회사가 2~3월 급여에서 차감. 분납 신청은 회사 인사팀 문의 (일반적으로 한 번에 차감).',
  },
  {
    question: '5월 종소세 신고를 위해 2~4월 미리 준비할 것은?',
    answer:
      '① 부업 소득 자료 정리 (3.3% 원천징수영수증, 매출 기록) ② 사업 경비 영수증 모음 (단순경비율 적용 시 X) ③ 노란우산공제·연금저축 가입 여부 ④ 기부금 영수증 ⑤ 임대료·수도광열비 등 사업 경비. 5월 1일부터 홈택스 신고 가능.',
  },
] as const;

export default function FebruaryRefundTrackingPage() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '2월 환급 추적 + 5월 종소세 준비' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '2월 연말정산 환급 추적 + 5월 종소세 사전 준비 (2026)',
    description: '환급 결과 확인 + 누락 공제 정정 + 5월 종소세 사전 준비.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['연말정산 환급', '경정청구', '5월 종소세 준비'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '2월 연말정산 환급 추적 + 5월 종소세 사전 준비 가이드 2026',
    description: '2월 연말정산 환급/추가 납부 결과 확인·이의제기·5월 종합소득세 누락 공제 정정·사전 준비 완벽 가이드. 환급 안 들어왔을 때, 추가 납부 결과 받았을 때 대응법.',
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
                    { name: '2월 환급 추적 + 5월 종소세 준비' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">세금·근로 · 7분 읽기 · 2026-05-03</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  2월 연말정산 환급 추적 + 5월 종소세 사전 준비
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  연말정산 결과 환급 잘 들어왔나요? 추가 납부 받으셨나요? 2월~4월은 결과 확인 +
                  누락 공제 점검 + 5월 종합소득세 신고로 정정·환급 추가 받기 위한 골든타임입니다.
                  환급 안 들어왔을 때 대응부터 5월 종소세 사전 준비까지 정리합니다.
                </p>
              </header>

              <AdSlot slot="guide-feb-refund-top" format="horizontal" />

              <section aria-label="핵심 요약" className="card border-l-4 border-l-primary-500">
                <h2 className="mb-2 text-caption uppercase tracking-wider text-primary-500">핵심 요약</h2>
                <ul className="space-y-1.5 text-sm" data-speakable>
                  <li>📅 <strong>환급 시기</strong>: 2~3월 급여일 (회사별 다름)</li>
                  <li>🔍 <strong>확인 방법</strong>: 회사 결과서 또는 홈택스 "지급명세서 조회"</li>
                  <li>💡 <strong>누락 공제 발견 시</strong>: 5월 종소세 신고로 정정 → 환급 추가</li>
                  <li>⏰ <strong>경정청구</strong>: 5년 이내 가능 (국세기본법 §45의2)</li>
                  <li>📝 <strong>5월 종소세 준비</strong>: 부업 소득·기부금·노란우산 자료 정리</li>
                </ul>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">1. 환급 결과 확인하는 3가지 방법</h2>
                <div className="space-y-3">
                  <div className="rounded-lg border border-border-base bg-bg-card p-4">
                    <h3 className="mb-2 font-semibold text-text-primary">① 회사 발급 "연말정산 결과 확인서"</h3>
                    <p className="text-sm text-text-secondary">
                      가장 빠른 방법. 1월 말~2월 초 회사 인사팀이 사내 시스템 또는 이메일로 발급.
                      "차감징수세액" 항목 확인 — <strong>음수 = 환급, 양수 = 추가 납부</strong>.
                    </p>
                  </div>
                  <div className="rounded-lg border border-border-base bg-bg-card p-4">
                    <h3 className="mb-2 font-semibold text-text-primary">② 홈택스 "지급명세서 등 제출 내역 조회"</h3>
                    <p className="text-sm text-text-secondary">
                      홈택스 로그인 → "MY 홈택스" → "연말정산·지급명세서". 회사가 국세청에 제출한
                      자료 그대로 확인 가능. 보통 2월 중순 이후 조회 가능.
                    </p>
                  </div>
                  <div className="rounded-lg border border-border-base bg-bg-card p-4">
                    <h3 className="mb-2 font-semibold text-text-primary">③ 급여명세서</h3>
                    <p className="text-sm text-text-secondary">
                      2월 또는 3월 급여명세서에 "연말정산 환급" 또는 "추가 납부" 항목 표시.
                      급여 + 환급액 합쳐서 입금 또는 급여 − 추가 납부.
                    </p>
                  </div>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">2. 환급 늦거나 안 들어왔을 때 대응</h2>
                <ol className="space-y-2 text-sm">
                  <li className="rounded-lg border border-border-base bg-bg-raised p-3">
                    <strong>① 회사 인사팀 문의</strong>: 가장 우선. 회사가 신고 미완 또는 처리 지연 가능성.
                  </li>
                  <li className="rounded-lg border border-border-base bg-bg-raised p-3">
                    <strong>② 4월까지 미입금</strong>: 회사 정산 완료 여부 + 국세청 환급 처리 상태 확인.
                  </li>
                  <li className="rounded-lg border border-border-base bg-bg-raised p-3">
                    <strong>③ 회사 처리 안 한 경우</strong>: 5월 종소세 신고로 본인이 직접 정산 → 6월 말 환급.
                  </li>
                  <li className="rounded-lg border border-border-base bg-bg-raised p-3">
                    <strong>④ 회사 폐업·통신두절</strong>: 관할 세무서 또는 국세상담센터 (126) 문의.
                  </li>
                </ol>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">3. 자주 누락하는 공제 7가지</h2>
                <p className="text-text-secondary">
                  본인 또는 회사가 빠뜨리기 쉬운 공제. 5월 종소세 신고로 정정 가능 → 환급 추가.
                </p>
                <ul className="space-y-2 text-sm text-text-secondary">
                  <li className="flex items-start gap-2"><span className="text-primary-500 font-bold">1.</span> <span><strong>안경·콘택트렌즈</strong> — 의료비 (한도 50만)</span></li>
                  <li className="flex items-start gap-2"><span className="text-primary-500 font-bold">2.</span> <span><strong>월세 세액공제</strong> — 무주택·총급여 7천 이하 (한도 750만, 17% = 약 127만)</span></li>
                  <li className="flex items-start gap-2"><span className="text-primary-500 font-bold">3.</span> <span><strong>부모님·시부모님 인적공제</strong> — 소득 100만 이하면 1인 150만 공제 (형제 중 1명만)</span></li>
                  <li className="flex items-start gap-2"><span className="text-primary-500 font-bold">4.</span> <span><strong>중도 입사 전 직장 자료</strong> — 전 직장 원천징수영수증 추가 합산</span></li>
                  <li className="flex items-start gap-2"><span className="text-primary-500 font-bold">5.</span> <span><strong>연말 기부금</strong> — 12월 후반 기부 영수증 누락 사례 多</span></li>
                  <li className="flex items-start gap-2"><span className="text-primary-500 font-bold">6.</span> <span><strong>주택자금공제</strong> — 무주택 세대주 주택청약저축 240만 한도 40% 공제</span></li>
                  <li className="flex items-start gap-2"><span className="text-primary-500 font-bold">7.</span> <span><strong>장애인 추가공제</strong> — 본인·가족 장애인 200만 추가 공제</span></li>
                </ul>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">4. 5월 종합소득세 신고로 정정·환급 추가</h2>
                <p className="text-text-secondary leading-relaxed">
                  연말정산은 회사가 대신 처리하지만, <strong>5월 종합소득세 신고로 본인이 직접
                  누락 공제 정정 가능</strong>. 누락된 의료비·월세·인적공제 등 추가하면 환급 추가.
                </p>
                <div className="rounded-lg bg-primary-500/5 border-l-4 border-l-primary-500 p-4">
                  <h3 className="mb-2 font-semibold text-primary-700 dark:text-primary-300">📝 5월 신고 대상 (직장인 기준)</h3>
                  <ul className="text-sm text-text-secondary space-y-1">
                    <li>✅ <strong>의무</strong>: 부업 소득 (사업소득·임대료·기타소득 300만 초과)</li>
                    <li>💡 <strong>선택 (환급 추가 목적)</strong>: 연말정산 누락 공제 정정</li>
                    <li>💡 <strong>선택 (5년 이내)</strong>: 경정청구로 과거 연도 정정</li>
                  </ul>
                </div>
                <p className="text-sm text-text-secondary">
                  자세한 5월 종소세 신고 가이드는{' '}
                  <Link href="/guide/may-comprehensive-income-tax/" className="text-primary-600 underline dark:text-primary-500">
                    5월 종합소득세 신고 완벽 가이드
                  </Link>{' '}
                  참고.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">5. 2~4월 5월 종소세 사전 준비 체크리스트</h2>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 text-sm">
                  <ul className="space-y-2 text-text-secondary">
                    <li>☐ 부업 소득 자료 정리 (3.3% 원천징수영수증 모음)</li>
                    <li>☐ 사업 경비 영수증 정리 (단순경비율 X 시)</li>
                    <li>☐ 노란우산공제 가입·추가 납입 (한도 500만)</li>
                    <li>☐ 연금저축·IRP 추가 납입 (한도 700만, 13.2~16.5% 세액공제)</li>
                    <li>☐ 기부금 영수증 모음 (정치자금·법정·지정·종교)</li>
                    <li>☐ 의료비·교육비 누락 영수증 점검</li>
                    <li>☐ 월세 송금영수증 + 임대차계약서 (무주택·7천 이하)</li>
                    <li>☐ 안경·콘택트렌즈 영수증 (의료비 추가)</li>
                    <li>☐ 임대 소득 (전세보증금 환산보증금 + 월세) 정리</li>
                  </ul>
                </div>
              </section>

              <FaqSection items={[...FAQ_ITEMS]} />

              <section className="card border-l-4 border-l-danger-500 bg-danger-500/5">
                <h2 className="mb-2 text-lg font-semibold text-danger-700 dark:text-danger-300">⚠️ 주의사항</h2>
                <ul className="space-y-2 text-sm text-danger-700 dark:text-danger-300">
                  <li>• 경정청구는 5년 이내 가능 — 너무 오래된 누락은 못 받음.</li>
                  <li>• 추가 납부 결과를 5월 종소세로 줄이려면 누락 공제 명확히 입증 필요.</li>
                  <li>• 부업 소득 신고 안 하면 가산세 20%+ 부과 — 적은 금액이라도 신고.</li>
                </ul>
              </section>

              <section className="card">
                <h2 className="mb-3 text-lg font-semibold">📊 관련 가이드</h2>
                <ul className="space-y-2 text-sm">
                  <li>→ <Link href="/guide/year-end-tax-settlement/" className="text-primary-600 underline dark:text-primary-500">연말정산 완벽 가이드</Link></li>
                  <li>→ <Link href="/guide/may-comprehensive-income-tax/" className="text-primary-600 underline dark:text-primary-500">5월 종합소득세 신고 완벽 가이드</Link></li>
                  <li>→ <Link href="/guide/freelancer-salary-comparison/" className="text-primary-600 underline dark:text-primary-500">프리랜서 vs 일반직 비교</Link></li>
                  <li>→ <Link href="/calculator/salary/" className="text-primary-600 underline dark:text-primary-500">연봉 실수령액 계산기</Link></li>
                </ul>
              </section>

              <ShareButtons title="2월 연말정산 환급 추적 + 5월 종소세 준비" url={URL} />

              <section aria-label="출처 및 면책" className="rounded-lg border border-border-base p-4 text-caption text-text-tertiary">
                <p className="mb-2"><strong>법적 근거</strong>: 소득세법 §70·§134·§137 · 국세기본법 §45의2 (경정청구). 참고:{' '}
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
