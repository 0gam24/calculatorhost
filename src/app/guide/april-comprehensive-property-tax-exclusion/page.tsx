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

const URL = 'https://calculatorhost.com/guide/april-comprehensive-property-tax-exclusion/';
const DATE_PUBLISHED = '2026-05-03';
const DATE_MODIFIED = '2026-05-03';

export const metadata: Metadata = {
  title: '4월 종부세 합산배제·과세특례 신청 | calculatorhost',
  description:
    '2026년 4월 1~30일 종합부동산세 합산배제·과세특례 신청 가이드. 임대주택·미분양·일시적 2주택. 한국 거주자 기준 실전 가이드. 법조항·관련 계산기 링크 포함.',
  keywords: [
    '종부세 합산배제',
    '종합부동산세 합산배제',
    '종부세 과세특례',
    '종부세 4월 신청',
    '임대주택 종부세',
    '일시적 2주택 종부세',
    '고령자 종부세 감면',
    '종부세 신청 방법',
  ],
  alternates: { canonical: URL },
  openGraph: {
    title: '4월 종부세 합산배제·과세특례 신청 가이드 2026',
    description: '4월 1~30일 마감. 임대주택·일시적 2주택·고령자 등 절세 핵심.',
    url: URL,
    type: 'article',

    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
};

const FAQ_ITEMS = [
  {
    question: '종부세 합산배제와 과세특례 차이는?',
    answer:
      '합산배제: 일정 요건 부동산을 종부세 합산에서 아예 제외 (임대주택·미분양·사원용·기숙사·문화재 등). 과세특례: 합산은 하되 세율·공제 우대 적용 (일시적 2주택, 고령자, 장기보유, 상속 등). 둘 다 4월 1~30일 신청해야 12월 종부세 산정 시 반영.',
  },
  {
    question: '신청하지 않으면 어떻게 되나요?',
    answer:
      '12월 종부세 산정 시 모든 보유 주택 합산 + 일반 세율 적용 → 세부담 폭증. 예: 합산배제 가능한 임대주택 3채 미신청 → 다주택 중과 세율 (최고 6%) 적용 → 수천만 원 추가 부담. 매년 4월 신청 필수 (변동 사항만 신청해도 됨).',
  },
  {
    question: '합산배제 가능한 임대주택 요건은?',
    answer:
      '①공시가격 6억 이하 (수도권 외 3억 이하) ②임대 의무기간 5년 (장기 일반민간임대) 또는 10년 (장기일반민간매입임대) ③임대료 인상률 연 5% 이내 ④임대사업자 등록 (지자체 + 세무서). 임대 중 자가 거주 시 합산배제 박탈. 1세대 합산 5년 보유 + 임대 중 매도 시 양도세 중과 면제 추가.',
  },
  {
    question: '일시적 2주택 종부세 특례는?',
    answer:
      '신규 주택 취득 후 기존 주택 양도까지 일시 2주택 보유 시 1주택자 우대 적용 가능. 신규 취득일부터 3년 (조정대상지역 2년) 이내 기존 주택 양도 조건. 양도소득세 일시적 2주택 비과세와 별도 — 종부세 신청 필요. 4월 신청 + 12월 산정 시 반영.',
  },
  {
    question: '고령자·장기보유 공제는?',
    answer:
      '①고령자 공제: 만 60세 이상 20%, 65세 이상 30%, 70세 이상 40% ②장기보유 공제: 5년 이상 20%, 10년 이상 40%, 15년 이상 50% ③합산 한도 80%. 만 70세 + 15년 보유 = 80% 공제 (최대). 1세대1주택자에게만 적용.',
  },
  {
    question: '신청은 어디서 어떻게?',
    answer:
      '국세청 홈택스(hometax.go.kr) → "신청/제출" → "종합부동산세 합산배제·과세특례 신청". 4월 1~30일. 임대등록증·임대차계약서 등 증빙 PDF 첨부. 변동 사항만 신청해도 되며, 처음 신청 후 다음 해부터 자동 반영. 단, 요건 변동 시 매년 재신청 권장.',
  },
  {
    question: '종부세 자체는 언제 납부?',
    answer:
      '12월 1~15일. 합산배제·과세특례 신청 결과 반영된 고지서 11월 말 발송. 250만 원 초과 시 분납 가능 (납부기한 다음날부터 6개월 이내). 본 가이드는 4월 신청용 — 12월 종부세 별도 가이드 예정.',
  },
] as const;

export default function AprilCptExclusionPage() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '4월 종부세 합산배제·과세특례 신청' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '4월 종합부동산세 합산배제·과세특례 신청 가이드 (2026)',
    description: '임대주택·일시적 2주택·고령자·장기보유 종부세 우대 신청.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['종부세 합산배제', '종부세 과세특례', '4월 신청', '임대주택 종부세'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '4월 종합부동산세 합산배제·과세특례 신청 가이드 2026',
    description: '2026년 4월 1~30일 종부세 합산배제·과세특례 신청 가이드. 임대주택·미분양·사원용·기숙사·문화재 등 합산배제 + 일시적 2주택·고령자 등 과세특례 + 12월 종부세 절세 핵심.',
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
                    { name: '4월 종부세 합산배제·과세특례 신청' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">세금·부동산 · 9분 읽기 · 2026-05-03</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  4월 종부세 합산배제·과세특례 신청 (2026)
                  <br />
                  <span className="text-2xl text-text-secondary">— 12월 종부세 절세의 시작</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  종합부동산세 신청은 12월에 납부하지만 <strong>합산배제·과세특례 신청은 4월 1~30일</strong>이
                  골든타임. 임대주택·일시적 2주택·고령자·장기보유 등 우대 적용은 4월 신청해야 12월
                  종부세 산정에 반영됩니다. 미신청 시 다주택 중과 세율(최고 6%) 폭탄 가능성.
                </p>
              </header>

              <AdSlot slot="guide-cpt-excl-top" format="horizontal" />

              <section aria-label="핵심 요약" className="card border-l-4 border-l-primary-500">
                <h2 className="mb-2 text-caption uppercase tracking-wider text-primary-500">핵심 요약</h2>
                <ul className="space-y-1.5 text-sm" data-speakable>
                  <li>📅 <strong>신청 기간</strong>: 4월 1~30일 (홈택스)</li>
                  <li>🏠 <strong>합산배제</strong>: 임대주택·미분양·사원용·기숙사·문화재 등</li>
                  <li>🎁 <strong>과세특례</strong>: 일시적 2주택·고령자·장기보유·상속</li>
                  <li>👴 <strong>고령자+장기보유</strong>: 합산 최대 80% 공제 (1세대1주택)</li>
                  <li>⚠️ <strong>미신청 시</strong>: 다주택 중과 세율 (최고 6%) 적용 → 폭탄</li>
                  <li>💰 <strong>종부세 납부</strong>: 12월 1~15일 (별도)</li>
                </ul>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">1. 합산배제 vs 과세특례 — 차이</h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <thead>
                      <tr className="bg-primary-500/10 border border-border-base">
                        <th className="px-3 py-2 text-left">구분</th>
                        <th className="px-3 py-2">합산배제</th>
                        <th className="px-3 py-2">과세특례</th>
                      </tr>
                    </thead>
                    <tbody className="text-text-secondary">
                      <tr className="border border-border-base">
                        <td className="px-3 py-2 font-semibold">의미</td>
                        <td className="px-3 py-2">합산에서 제외 (해당 부동산 종부세 X)</td>
                        <td className="px-3 py-2">합산은 하되 세율·공제 우대</td>
                      </tr>
                      <tr className="border border-border-base">
                        <td className="px-3 py-2 font-semibold">대상</td>
                        <td className="px-3 py-2">임대주택·미분양·사원용·기숙사·문화재</td>
                        <td className="px-3 py-2">일시적 2주택·고령자·장기보유·상속·종중</td>
                      </tr>
                      <tr className="border border-border-base">
                        <td className="px-3 py-2 font-semibold">신청 빈도</td>
                        <td className="px-3 py-2">최초 + 변동 시</td>
                        <td className="px-3 py-2">매년 (요건 매년 충족 확인)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">2. 합산배제 가능한 부동산</h2>
                <div className="space-y-3">
                  <div className="rounded-lg border border-border-base bg-bg-card p-4">
                    <h3 className="mb-2 font-semibold text-text-primary">① 임대주택 (가장 많이 신청)</h3>
                    <ul className="text-sm text-text-secondary space-y-1">
                      <li>• 공시가격 6억 이하 (수도권 외 3억 이하)</li>
                      <li>• 임대 의무기간 5년 (장기 일반민간임대) 또는 10년 (장기일반민간매입임대)</li>
                      <li>• 임대료 인상률 연 5% 이내</li>
                      <li>• 임대사업자 등록 (지자체 + 세무서)</li>
                    </ul>
                    <div className="mt-3 pt-3 border-t border-border-base">
                      <strong className="text-xs text-text-primary">임대주택 절세 수치 예시</strong>
                      <p className="mt-1 text-xs text-text-secondary">
                        공시 5억 임대주택 미신청: 다주택자 중과 세율(최고 6%) 적용 → 연 3,000만 원 종부세.
                        합산배제 신청 시: 종부세 부과 0원 → 연 3,000만 원 절세.
                        5년 보유 기준 약 1.5억 원 절감 효과.
                      </p>
                    </div>
                  </div>
                  <div className="rounded-lg border border-border-base bg-bg-card p-4">
                    <h3 className="mb-2 font-semibold text-text-primary">② 미분양 주택 (사업자 보유)</h3>
                    <p className="text-sm text-text-secondary">건설사·시행사가 분양 후 일정 기간 미분양 상태로 보유한 주택. 5년 한도.</p>
                  </div>
                  <div className="rounded-lg border border-border-base bg-bg-card p-4">
                    <h3 className="mb-2 font-semibold text-text-primary">③ 사원용·기숙사</h3>
                    <p className="text-sm text-text-secondary">법인이 직원에게 무상 또는 시세 이하로 제공하는 주택·기숙사.</p>
                  </div>
                  <div className="rounded-lg border border-border-base bg-bg-card p-4">
                    <h3 className="mb-2 font-semibold text-text-primary">④ 문화재·등록문화재</h3>
                    <p className="text-sm text-text-secondary">국가지정·시도지정·등록문화재 또는 그 부속토지.</p>
                  </div>
                  <div className="rounded-lg border border-border-base bg-bg-card p-4">
                    <h3 className="mb-2 font-semibold text-text-primary">⑤ 어린이집·노인복지시설 등 공익 시설</h3>
                    <p className="text-sm text-text-secondary">공익 목적 사용 시설.</p>
                  </div>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">3. 과세특례 — 1세대1주택자 우대</h2>
                <div className="space-y-3">
                  <div className="rounded-lg border border-border-base bg-bg-card p-4">
                    <h3 className="mb-2 font-semibold text-text-primary">① 고령자 공제</h3>
                    <table className="w-full text-xs">
                      <tbody className="text-text-secondary">
                        <tr><td className="py-1">만 60세 이상</td><td className="text-right">20%</td></tr>
                        <tr><td className="py-1">만 65세 이상</td><td className="text-right">30%</td></tr>
                        <tr><td className="py-1">만 70세 이상</td><td className="text-right">40%</td></tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="rounded-lg border border-border-base bg-bg-card p-4">
                    <h3 className="mb-2 font-semibold text-text-primary">② 장기보유 공제</h3>
                    <table className="w-full text-xs">
                      <tbody className="text-text-secondary">
                        <tr><td className="py-1">5년 이상</td><td className="text-right">20%</td></tr>
                        <tr><td className="py-1">10년 이상</td><td className="text-right">40%</td></tr>
                        <tr><td className="py-1">15년 이상</td><td className="text-right">50%</td></tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="rounded-lg border-l-4 border-l-primary-500 bg-primary-500/5 p-4">
                    <p className="text-sm text-text-secondary">
                      <strong className="text-text-primary">합산 한도 80%</strong>:
                      만 70세 + 15년 보유 = 40% + 50% = 90% → 한도 80% 적용. 1세대1주택자만.
                      예: 종부세 1,000만 → 800만 공제 → <strong>실제 200만</strong>.
                    </p>
                  </div>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">4. 일시적 2주택 종부세 특례</h2>
                <p className="text-text-secondary leading-relaxed">
                  신규 주택 취득 후 기존 주택 양도 전 일시 2주택 상태에서도 1주택자 우대 적용
                  가능. 양도소득세 일시적 2주택 비과세와 별도 — 종부세도 신청 필요.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 text-sm">
                  <h3 className="mb-2 font-semibold text-text-primary">조건</h3>
                  <ul className="text-text-secondary space-y-1">
                    <li>• 신규 취득일부터 3년 (조정대상지역 2년) 이내 기존 주택 양도</li>
                    <li>• 양도세 일시적 2주택 비과세 요건 충족</li>
                    <li>• 4월 신청 → 12월 종부세 1주택자 우대 적용</li>
                  </ul>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">5. 신청 단계 (홈택스)</h2>
                <ol className="space-y-3 text-sm">
                  <li className="rounded-lg border border-border-base bg-bg-card p-4">
                    <strong className="text-text-primary block mb-1">Step 1. 증빙 자료 준비</strong>
                    <p className="text-text-secondary">임대등록증 + 임대차계약서 + 가족관계증명서 (1세대1주택) + 등기부등본 + 임대료 인상률 자료 (5% 이내).</p>
                  </li>
                  <li className="rounded-lg border border-border-base bg-bg-card p-4">
                    <strong className="text-text-primary block mb-1">Step 2. 홈택스 로그인</strong>
                    <p className="text-text-secondary">국세청 홈택스 → "신청/제출" → "종합부동산세 합산배제 신청" 또는 "과세특례 신청" 메뉴 선택.</p>
                  </li>
                  <li className="rounded-lg border border-border-base bg-bg-card p-4">
                    <strong className="text-text-primary block mb-1">Step 3. 신청서 작성 + 자료 첨부</strong>
                    <p className="text-text-secondary">대상 부동산·물건번호·요건별 정보 입력. 증빙 PDF 업로드.</p>
                  </li>
                  <li className="rounded-lg border border-border-base bg-bg-card p-4">
                    <strong className="text-text-primary block mb-1">Step 4. 접수증 보관 + 결과 확인</strong>
                    <p className="text-text-secondary">접수번호로 처리 상태 추적. 6~8월 국세청 검토 → 11월 종부세 고지서에 반영.</p>
                  </li>
                </ol>
              </section>

              <FaqSection items={[...FAQ_ITEMS]} />

              <section className="card border-l-4 border-l-danger-500 bg-danger-500/5">
                <h2 className="mb-2 text-lg font-semibold text-danger-700 dark:text-danger-300">⚠️ 주의사항</h2>
                <ul className="space-y-2 text-sm text-danger-700 dark:text-danger-300">
                  <li>• 임대 의무기간 중 자가 거주·매도 시 합산배제 박탈 + 과거 분 추징.</li>
                  <li>• 임대료 인상률 5% 초과 시 동일 — 신중한 임대료 관리.</li>
                  <li>• 4월 30일 이후 신청 불가 — 12월 종부세 일반 세율 적용.</li>
                  <li>• 본 가이드는 일반론 — 다주택자·복잡한 사례는 세무사 상담.</li>
                </ul>
              </section>

              <section className="card">
                <h2 className="mb-3 text-lg font-semibold">📊 관련 도구·가이드</h2>
                <ul className="space-y-2 text-sm">
                  <li>→ <Link href="/calculator/comprehensive-property-tax/" className="text-primary-600 underline dark:text-primary-500">종합부동산세 계산기</Link></li>
                  <li>→ <Link href="/calculator/property-tax/" className="text-primary-600 underline dark:text-primary-500">재산세 계산기</Link></li>
                  <li>→ <Link href="/guide/june-property-tax/" className="text-primary-600 underline dark:text-primary-500">6월 재산세 완벽 가이드</Link></li>
                  <li>→ <Link href="/guide/capital-gains-tax-tips/" className="text-primary-600 underline dark:text-primary-500">양도세 절세 7가지</Link></li>
                  <li>→ <Link href="/guide/tax-calendar-2026/" className="text-primary-600 underline dark:text-primary-500">2026 세금 캘린더</Link></li>
                </ul>
              </section>

              <ShareButtons title="4월 종부세 합산배제·과세특례 신청 가이드 2026" url={URL} />

              <section aria-label="출처 및 면책" className="rounded-lg border border-border-base p-4 text-caption text-text-tertiary">
                <p className="mb-2">
                  <strong>법적 근거</strong>: 종합부동산세법 §8 (합산배제) · §9 (과세특례) · §15·§16 ·
                  민간임대주택법. 참고:{' '}
                  <a href="https://www.hometax.go.kr/ncs/notice/bbsView.do?bbsId=36&nttId=2949" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-600 underline dark:text-primary-500">국세청 홈택스 종부세 합산배제 신청</a>,{' '}
                  <a href="https://www.molit.go.kr/USR/PRESSROOM/m_71/dtl.jsp?lcmspage=1&id=95003333" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-600 underline dark:text-primary-500">국토교통부 민간임대주택 정책 안내</a>.
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
