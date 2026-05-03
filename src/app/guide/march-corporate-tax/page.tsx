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

const URL = 'https://calculatorhost.com/guide/march-corporate-tax/';
const DATE_PUBLISHED = '2026-05-03';
const DATE_MODIFIED = '2026-05-03';

export const metadata: Metadata = {
  title: '법인세 신고 가이드 2026 (3월 31일 마감) — 12월 결산법인 필독 | calculatorhost',
  description:
    '12월 결산 법인의 법인세 신고·납부 마감 3월 31일. 법인세 세율 (9%·19%·21%·24%) + 주요 공제·세액공제 + 분납·전자신고 + 미신고 가산세까지 한 페이지.',
  keywords: [
    '법인세 신고',
    '법인세',
    '12월 결산 법인',
    '법인세 세율',
    '법인세 신고 기한',
    '3월 31일 법인세',
    '법인세 분납',
    '법인세 가산세',
    '연결법인세',
  ],
  alternates: { canonical: URL },
  openGraph: {
    title: '법인세 신고 가이드 2026 — 3월 31일 마감',
    description: '법인세 세율·공제·분납·전자신고 종합.',
    url: URL,
    type: 'article',
    images: ['/og-default.png'],
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
};

const FAQ_ITEMS = [
  {
    question: '법인세 신고 기한은 언제인가요?',
    answer:
      '사업연도 종료일로부터 3개월 이내. 12월 결산 법인 → 3월 31일까지. 연결법인은 4월 30일까지. 해외 자회사 보유 법인 등 일부는 추가 연장 가능. 무신고 시 무신고가산세 20% (40% 극대) + 납부지연가산세.',
  },
  {
    question: '법인세 세율은 몇 단계인가요?',
    answer:
      '4단계 누진세율 (법인세법 §55). 과세표준 2억 이하 9%, 2억~200억 19%, 200억~3000억 21%, 3000억 초과 24%. 추가로 지방소득세 10% (법인세 × 10%) 별도. 예: 과표 5억 → 본세 (2억 × 9%) + (3억 × 19%) = 1,800만 + 5,700만 = 7,500만.',
  },
  {
    question: '법인세 분납 가능한가요?',
    answer:
      '네. 납부세액 1천만 원 초과 시 분납 가능. 납부기한 (3월 31일) 다음 날부터 1개월 이내 (중소기업 2개월). 예: 1천만 원 초과 ~ 2천만 원 → 분납가능액 = 초과분 / 1천만 ~ 2천만 → 1/2 분납. 홈택스 신고 시 분납 신청.',
  },
  {
    question: '법인세 신고는 어디서 하나요?',
    answer:
      '국세청 홈택스(hometax.go.kr) 전자신고 의무. 종이 신고 가능하나 권장 X. 결산서 + 세무조정계산서 + 부속서류 (대차대조표, 손익계산서, 자본변동표 등) 첨부. 외부조정 의무 법인은 세무사·회계사 검토 필수.',
  },
  {
    question: '주요 세액공제는?',
    answer:
      '① 연구·인력개발비 세액공제 (R&D, 중소 25%, 중견 8~15%) ② 통합투자세액공제 (시설투자 1~10%) ③ 고용증대 세액공제 (1인당 400~1,200만 원) ④ 외국납부세액공제 ⑤ 영농·중소기업 특별세액감면. 본 가이드는 일반 사항이며 세무사 상담 권장.',
  },
  {
    question: '미신고·과소 신고 가산세는?',
    answer:
      '① 무신고가산세: 일반 20%, 부정 40% ② 과소신고: 일반 10%, 부정 40% ③ 납부지연: 일 0.022% (연 약 8%) ④ 영세율 위반·자료 제출 의무 위반 등 추가 가산세. 신고 안 하면 환급 대상도 환급 못 받음.',
  },
] as const;

export default function MarchCorporateTaxPage() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '3월 법인세 신고' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '법인세 신고 가이드 (2026) — 3월 31일 마감',
    description: '법인세 세율 (9~24%) + 공제·세액공제 + 분납 + 전자신고.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['법인세', '12월 결산 법인', '법인세 세율', '법인세 신고'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '법인세 신고 가이드 2026 (3월 31일 마감)',
    description: '12월 결산 법인의 법인세 신고·납부 마감 3월 31일. 법인세 세율 (9%·19%·21%·24%) + 주요 공제·세액공제 + 분납·전자신고 + 미신고 가산세까지 한 페이지.',
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
                    { name: '3월 법인세 신고' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">세금·법인 · 8분 읽기 · 2026-05-03</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  법인세 신고 가이드 (2026)
                  <br />
                  <span className="text-2xl text-text-secondary">— 12월 결산 법인 3월 31일 마감</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  12월 결산 법인의 법인세 신고·납부 기한은 매년 3월 31일입니다. 무신고 시 가산세
                  20%+, 분납 신청도 신고 시점에 함께. 법인세 세율 (9·19·21·24%) + 주요 세액공제 +
                  분납 + 전자신고 절차를 한 페이지에 정리합니다.
                </p>
              </header>

              <AdSlot slot="guide-corp-tax-top" format="horizontal" />

              <section aria-label="핵심 요약" className="card border-l-4 border-l-primary-500">
                <h2 className="mb-2 text-caption uppercase tracking-wider text-primary-500">핵심 요약</h2>
                <ul className="space-y-1.5 text-sm" data-speakable>
                  <li>📅 <strong>마감</strong>: 12월 결산 법인 3월 31일 / 연결법인 4월 30일</li>
                  <li>📊 <strong>세율 4단계</strong>: 9% (2억 이하) / 19% / 21% / 24% (3000억 초과)</li>
                  <li>➕ <strong>지방소득세</strong>: 법인세 × 10% (별도 신고)</li>
                  <li>💰 <strong>분납</strong>: 1천만 초과 시 가능 (1개월, 중소 2개월)</li>
                  <li>📝 <strong>전자신고</strong>: 홈택스 의무 + 외부조정 (세무사 검토)</li>
                  <li>⚠️ <strong>가산세</strong>: 무신고 20%, 부정 40%, 납부지연 일 0.022%</li>
                </ul>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">1. 법인세란? — 누가 신고하나</h2>
                <p className="text-text-secondary leading-relaxed">
                  법인세는 영리법인의 사업연도 소득에 부과되는 국세 (법인세법 §3, §55). 주식회사·
                  유한회사·합자회사·합명회사 등 모든 영리법인이 대상. 비영리법인도 수익사업 한정.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 text-sm">
                  <h3 className="mb-2 font-semibold text-text-primary">신고 의무 법인</h3>
                  <ul className="text-text-secondary space-y-1">
                    <li>• 영리법인 (12월 결산 → 3월 31일 / 6월 결산 → 9월 30일 등)</li>
                    <li>• 외국법인 (한국 내 사업장 보유)</li>
                    <li>• 비영리법인 (수익사업 한정)</li>
                    <li>• 결손법인도 신고 의무 (납부세액 0이라도)</li>
                  </ul>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">2. 법인세 세율 (4단계 누진)</h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <thead>
                      <tr className="bg-primary-500/10 border border-border-base">
                        <th className="px-3 py-2 text-left">과세표준</th>
                        <th className="px-3 py-2 text-right">법인세율</th>
                        <th className="px-3 py-2 text-right">누진공제</th>
                      </tr>
                    </thead>
                    <tbody className="text-text-secondary">
                      <tr className="border border-border-base"><td className="px-3 py-2">2억 이하</td><td className="px-3 py-2 text-right">9%</td><td className="px-3 py-2 text-right">—</td></tr>
                      <tr className="border border-border-base"><td className="px-3 py-2">2억 ~ 200억</td><td className="px-3 py-2 text-right">19%</td><td className="px-3 py-2 text-right tabular-nums">2,000만</td></tr>
                      <tr className="border border-border-base"><td className="px-3 py-2">200억 ~ 3000억</td><td className="px-3 py-2 text-right">21%</td><td className="px-3 py-2 text-right tabular-nums">4억 2,000만</td></tr>
                      <tr className="border border-border-base"><td className="px-3 py-2">3000억 초과</td><td className="px-3 py-2 text-right">24%</td><td className="px-3 py-2 text-right tabular-nums">94억 2,000만</td></tr>
                    </tbody>
                  </table>
                </div>
                <div className="rounded-lg bg-bg-raised p-4 text-sm">
                  <strong className="text-text-primary">📌 시뮬레이션</strong>
                  <ul className="mt-2 text-text-secondary space-y-1">
                    <li>과표 1억 → 1억 × 9% = <strong>900만</strong> + 지방소득세 90만 = 990만</li>
                    <li>과표 5억 → 5억 × 19% − 2,000만 = <strong>7,500만</strong> + 지방소득세 750만 = 8,250만</li>
                    <li>과표 50억 → 50억 × 19% − 2,000만 = <strong>9억 3,000만</strong> + 지방소득세 9,300만 = 10억 2,300만</li>
                  </ul>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">3. 주요 세액공제 — 절세 핵심</h2>
                <div className="space-y-3">
                  <div className="rounded-lg border border-border-base bg-bg-card p-4">
                    <h3 className="mb-1 font-semibold text-text-primary">① 연구·인력개발비 세액공제 (R&D)</h3>
                    <p className="text-sm text-text-secondary">
                      중소기업 25% / 중견 8~15% / 대기업 0~2%. 신성장·원천기술 분야는 추가 우대.
                      가장 큰 절세 항목 — 연구개발 비용 명확히 입증.
                    </p>
                  </div>
                  <div className="rounded-lg border border-border-base bg-bg-card p-4">
                    <h3 className="mb-1 font-semibold text-text-primary">② 통합투자세액공제</h3>
                    <p className="text-sm text-text-secondary">
                      사업용 시설투자 (기계장치·SW 등) 일정 비율 세액공제. 중소 10%, 중견 5%, 대기업 1%.
                      신성장 시설은 추가 우대.
                    </p>
                  </div>
                  <div className="rounded-lg border border-border-base bg-bg-card p-4">
                    <h3 className="mb-1 font-semibold text-text-primary">③ 고용증대 세액공제</h3>
                    <p className="text-sm text-text-secondary">
                      신규 정규직 1인당 400~1,200만 원 (수도권·지방, 청년·장년 등에 따라 다름).
                      3년간 적용. 사회보험료 세액공제 별도.
                    </p>
                  </div>
                  <div className="rounded-lg border border-border-base bg-bg-card p-4">
                    <h3 className="mb-1 font-semibold text-text-primary">④ 외국납부세액공제</h3>
                    <p className="text-sm text-text-secondary">
                      해외에서 납부한 법인세를 국내 법인세에서 공제. 이중과세 방지.
                    </p>
                  </div>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">4. 신고 단계 (홈택스 전자신고)</h2>
                <ol className="space-y-3 text-sm">
                  <li className="rounded-lg border border-border-base bg-bg-card p-4">
                    <strong className="text-text-primary block mb-1">Step 1. 결산서 작성</strong>
                    <p className="text-text-secondary">대차대조표·손익계산서·자본변동표·이익잉여금처분계산서·현금흐름표 작성. 회계 프로그램(더존·이카운트 등) 활용.</p>
                  </li>
                  <li className="rounded-lg border border-border-base bg-bg-card p-4">
                    <strong className="text-text-primary block mb-1">Step 2. 세무조정</strong>
                    <p className="text-text-secondary">회계상 이익을 세무상 소득으로 조정. 외부조정 의무 법인은 세무사·회계사 검토 필수. 조정계산서 작성.</p>
                  </li>
                  <li className="rounded-lg border border-border-base bg-bg-card p-4">
                    <strong className="text-text-primary block mb-1">Step 3. 홈택스 전자신고</strong>
                    <p className="text-text-secondary">홈택스 → "신고/납부" → "법인세" → 신고서 + 부속서류 PDF 첨부.</p>
                  </li>
                  <li className="rounded-lg border border-border-base bg-bg-card p-4">
                    <strong className="text-text-primary block mb-1">Step 4. 납부 (3월 31일까지)</strong>
                    <p className="text-text-secondary">신용카드·계좌이체·가상계좌. 1천만 초과 시 분납 신청.</p>
                  </li>
                  <li className="rounded-lg border border-border-base bg-bg-card p-4">
                    <strong className="text-text-primary block mb-1">Step 5. 지방소득세 신고 (4월 말)</strong>
                    <p className="text-text-secondary">법인세 × 10% 별도 신고·납부. 위택스 또는 홈택스 연계.</p>
                  </li>
                </ol>
              </section>

              <FaqSection items={[...FAQ_ITEMS]} />

              <section className="card border-l-4 border-l-danger-500 bg-danger-500/5">
                <h2 className="mb-2 text-lg font-semibold text-danger-700 dark:text-danger-300">⚠️ 주의사항</h2>
                <ul className="space-y-2 text-sm text-danger-700 dark:text-danger-300">
                  <li>• 외부조정 의무 법인은 세무사·회계사 검토 필수 — 본 가이드는 일반 정보만.</li>
                  <li>• 결손법인도 신고 의무. 미신고 시 결손금 이월 못 받음.</li>
                  <li>• 법인세 세율 변경은 매년 정부 발표 — 신고 직전 확인.</li>
                  <li>• 과세표준 2억 이하 9% 우대 세율은 중소·중견기업 한정 (대기업 적용 X 케이스).</li>
                </ul>
              </section>

              <section className="card">
                <h2 className="mb-3 text-lg font-semibold">📊 관련 가이드</h2>
                <ul className="space-y-2 text-sm">
                  <li>→ <Link href="/guide/april-vat-preliminary-q1/" className="text-primary-600 underline dark:text-primary-500">4월 부가세 1기 예정신고</Link></li>
                  <li>→ <Link href="/guide/may-comprehensive-income-tax/" className="text-primary-600 underline dark:text-primary-500">5월 종합소득세 신고 (개인사업자)</Link></li>
                  <li>→ <Link href="/calculator/vat/" className="text-primary-600 underline dark:text-primary-500">부가가치세 계산기</Link></li>
                  <li>→ <Link href="/guide/tax-calendar-2026/" className="text-primary-600 underline dark:text-primary-500">2026 세금 캘린더</Link></li>
                </ul>
              </section>

              <ShareButtons title="법인세 신고 가이드 2026 — 3월 31일 마감" url={URL} />

              <section aria-label="출처 및 면책" className="rounded-lg border border-border-base p-4 text-caption text-text-tertiary">
                <p className="mb-2">
                  <strong>법적 근거</strong>: 법인세법 §3·§55·§60·§64·§76 · 조세특례제한법 (R&D·고용증대 등). 참고:{' '}
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
