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

const URL = 'https://calculatorhost.com/guide/january-vehicle-tax-prepayment/';
const DATE_PUBLISHED = '2026-05-03';
const DATE_MODIFIED = '2026-05-03';

export const metadata: Metadata = {
  title: '자동차세 연납 6.4% 할인 가이드 2026 | calculatorhost',
  description:
    '2026년 1월 16~31일 자동차세 연납 신청·납부 가이드. 약 6.4% 할인 + 신용카드 무이자 할부.',
  keywords: [
    '자동차세 연납',
    '자동차세 1월',
    '자동차세 할인',
    '자동차세 6.4% 할인',
    '자동차세 미리납부',
    '위택스 자동차세',
    '자동차세 카드 무이자',
    '연납 신청',
  ],
  alternates: { canonical: URL },
  openGraph: {
    title: '자동차세 연납 6.4% 할인 가이드 2026',
    description: '1월 16~31일 신청 시 최대 9.15% 할인.',
    url: URL,
    type: 'article',

    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '자동차세 연납 6.4% 할인 가이드 2026',
    description: '1월 신청 = 최대 9% 할인.',

  },
};

const FAQ_ITEMS = [
  {
    question: '자동차세 연납 할인율은 정확히 몇 %인가요?',
    answer:
      '신청 시기에 따라 다릅니다. 1월 16~31일 신청·납부 시 1~2월분 면제 효과로 약 6.4%, 3월 신청 시 약 5.3%, 6월 신청 시 약 3.5%, 9월 신청 시 약 1.8%. 1월 신청이 최대 절약. 일부 지자체는 추가 카드사 할인 결합 시 최대 9% 가까이 절약 가능.',
  },
  {
    question: '자동차세 연납은 어디서 신청하나요?',
    answer:
      '① 위택스(wetax.go.kr) — 가장 편리, 24시간 가능 ② 자동차세 미리납부 앱 ③ 시·군·구청 직접 방문 ④ 은행 창구. 서울은 STAX, 경기·인천 등 지자체별 별도 앱도 있음. 위택스 추천.',
  },
  {
    question: '연납 후 차량 매도하면 환급받나요?',
    answer:
      '네, 일할 계산해 환급. 매도일 기준 미경과 일수 × 일할 세액 환급. 위택스에서 자동 처리 또는 시·군청 신청. 단, 환급 처리에 약 1~2개월 소요. 매도 전 환급 액 미리 확인 가능.',
  },
  {
    question: '신용카드 무이자 할부 가능한가요?',
    answer:
      '네, 카드사별 2~6개월 무이자 할부 제공. 단 결제 수수료 약 0.8% 본인 부담. 위택스 또는 카드사 앱에서 신청. 하나·신한·KB·삼성 등 주요 카드사 모두 지원. 카드사 이벤트(캐시백) 결합 시 추가 절약.',
  },
  {
    question: '연납 신청 안 하면 언제 내나요?',
    answer:
      '연납 미신청 시 6월 16~30일 1차 (1/2) + 12월 16~31일 2차 (1/2) 분할 납부. 단 본세 10만 원 이하면 6월에 일괄. 연납 대비 약 6.4% 손해 (1600cc 차량 기준 약 1.9만 원).',
  },
  {
    question: '경차도 연납 할인 받나요?',
    answer:
      '네, 모든 차량 가능. 단 경차는 연 자동차세 자체가 작아(1000cc = 약 10.4만/년) 절대 할인액은 약 6,700원. 그래도 위택스에서 1분이면 신청 가능하니 이득.',
  },
  {
    question: '자동차세 연납 신청 후 취소·변경 가능한가요?',
    answer:
      '신청 후 납부 전이면 취소 가능. 납부 후에는 환급 신청 (단, 매도·말소 사유에 한함). 차량 보유 중 단순 취소는 어려움. 신청 시 신중히.',
  },
  {
    question: 'cc별 자동차세 절감액은 얼마?',
    answer:
      '예: 1000cc 경차 약 10.4만 → 6,700원 / 1600cc 약 29.1만 → 18,600원 / 2000cc 약 52만 → 33,300원 / 3000cc 약 78만 → 49,900원 절약. 본 사이트 자동차세 계산기에서 본인 차종 정확한 절감액 확인.',
  },
] as const;

export default function JanuaryVehicleTaxPage() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '자동차세 연납 6.4% 할인' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '자동차세 연납 6.4% 할인 가이드 (2026) — 1월 신청·납부',
    description: '1월 신청 = 최대 약 9% 할인 + 신용카드 무이자 할부 + cc별 절감액.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['자동차세 연납', '6.4% 할인', '위택스', '무이자 할부'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '자동차세 연납 6.4% 할인 가이드 2026',
    description: '2026년 1월 16~31일 자동차세 연납 신청·납부 가이드. 약 6.4% 할인 (최대 약 9.15%까지) + 신용카드 무이자 할부 + 위택스/모바일 신청법 + cc별 할인액 시뮬레이션.',
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
                    { name: '자동차세 연납 6.4% 할인' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">세금·자동차 · 6분 읽기 · 2026-05-03</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  자동차세 연납 6.4% 할인 가이드 (2026)
                  <br />
                  <span className="text-2xl text-text-secondary">— 1월 16~31일 신청 = 최대 9% 절약</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  자동차세는 1년에 6월·12월 2회 분할 납부가 기본이지만, 1월에 1년치를 미리 내면
                  약 <strong>6.4% 할인</strong>됩니다 (카드사 이벤트 결합 시 최대 9%까지). 위택스에서
                  1분 신청 + 신용카드 무이자 할부 가능. cc별 절감액과 신청 방법을 정리합니다.
                </p>
              </header>

              <AdSlot slot="guide-vehicle-prepay-top" format="horizontal" />

              <section aria-label="핵심 요약" className="card border-l-4 border-l-primary-500">
                <h2 className="mb-2 text-caption uppercase tracking-wider text-primary-500">핵심 요약</h2>
                <ul className="space-y-1.5 text-sm" data-speakable>
                  <li>📅 <strong>1월 16~31일 신청·납부</strong> = 최대 6.4% 할인 (지자체별 추가 할인 가능)</li>
                  <li>🌐 <strong>신청처</strong>: 위택스(wetax.go.kr) 또는 자동차세 앱</li>
                  <li>💳 <strong>신용카드</strong>: 2~6개월 무이자 할부 가능 (수수료 약 0.8% 본인)</li>
                  <li>🚗 <strong>1600cc 절감액</strong>: 약 18,600원 / 2000cc 약 33,300원</li>
                  <li>↩️ <strong>매도 시</strong>: 일할 환급 (위택스 자동 처리)</li>
                  <li>⚠️ <strong>3월 신청도 가능</strong> 단 할인율 5.3%로 감소</li>
                </ul>
              </section>

              <section aria-label="할인율표" className="card">
                <h2 className="mb-3 text-xl font-bold">📊 신청 시기별 할인율 (지방세법 §128)</h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <thead>
                      <tr className="bg-primary-500/10 border border-border-base">
                        <th className="px-3 py-2 text-left">신청 시기</th>
                        <th className="px-3 py-2 text-right">할인율 (정부 공시)</th>
                        <th className="px-3 py-2 text-right">1600cc 차량 기준 절감액</th>
                      </tr>
                    </thead>
                    <tbody className="text-text-secondary">
                      <tr className="border border-border-base bg-primary-500/5">
                        <td className="px-3 py-2 font-bold">1월 16~31일 ⭐</td>
                        <td className="px-3 py-2 text-right font-bold text-primary-700 dark:text-primary-300">약 6.4%</td>
                        <td className="px-3 py-2 text-right font-bold tabular-nums">약 18,600원</td>
                      </tr>
                      <tr className="border border-border-base">
                        <td className="px-3 py-2">3월 16~31일</td>
                        <td className="px-3 py-2 text-right">약 5.3%</td>
                        <td className="px-3 py-2 text-right tabular-nums">약 15,400원</td>
                      </tr>
                      <tr className="border border-border-base">
                        <td className="px-3 py-2">6월 16~30일</td>
                        <td className="px-3 py-2 text-right">약 3.5%</td>
                        <td className="px-3 py-2 text-right tabular-nums">약 10,200원</td>
                      </tr>
                      <tr className="border border-border-base">
                        <td className="px-3 py-2">9월 16~30일</td>
                        <td className="px-3 py-2 text-right">약 1.8%</td>
                        <td className="px-3 py-2 text-right tabular-nums">약 5,200원</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-3 text-xs text-text-tertiary">
                  * 1월 신청이 가장 큰 절약. 지자체에 따라 추가 할인 (서울 STAX 자동이체 0.5% 등) 가능.
                </p>
              </section>

              <section aria-label="cc별 절감액" className="card">
                <h2 className="mb-3 text-xl font-bold">🚗 cc별 자동차세 + 1월 연납 절감액</h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <thead>
                      <tr className="bg-primary-500/10 border border-border-base">
                        <th className="px-3 py-2 text-left">대표 차종</th>
                        <th className="px-3 py-2 text-right">배기량</th>
                        <th className="px-3 py-2 text-right">연 자동차세 (본세+교육세)</th>
                        <th className="px-3 py-2 text-right">1월 연납 절감</th>
                        <th className="px-3 py-2 text-right">실제 납부액</th>
                      </tr>
                    </thead>
                    <tbody className="text-text-secondary">
                      <tr className="border border-border-base">
                        <td className="px-3 py-2">경차 (모닝)</td>
                        <td className="px-3 py-2 text-right">1000cc</td>
                        <td className="px-3 py-2 text-right tabular-nums">104,000원</td>
                        <td className="px-3 py-2 text-right tabular-nums">−6,700원</td>
                        <td className="px-3 py-2 text-right font-bold tabular-nums text-primary-700 dark:text-primary-300">97,300원</td>
                      </tr>
                      <tr className="border border-border-base">
                        <td className="px-3 py-2">아반떼</td>
                        <td className="px-3 py-2 text-right">1600cc</td>
                        <td className="px-3 py-2 text-right tabular-nums">291,200원</td>
                        <td className="px-3 py-2 text-right tabular-nums">−18,600원</td>
                        <td className="px-3 py-2 text-right font-bold tabular-nums text-primary-700 dark:text-primary-300">272,600원</td>
                      </tr>
                      <tr className="border border-border-base">
                        <td className="px-3 py-2">쏘나타</td>
                        <td className="px-3 py-2 text-right">2000cc</td>
                        <td className="px-3 py-2 text-right tabular-nums">520,000원</td>
                        <td className="px-3 py-2 text-right tabular-nums">−33,300원</td>
                        <td className="px-3 py-2 text-right font-bold tabular-nums text-primary-700 dark:text-primary-300">486,700원</td>
                      </tr>
                      <tr className="border border-border-base">
                        <td className="px-3 py-2">그랜저</td>
                        <td className="px-3 py-2 text-right">2500cc</td>
                        <td className="px-3 py-2 text-right tabular-nums">650,000원</td>
                        <td className="px-3 py-2 text-right tabular-nums">−41,600원</td>
                        <td className="px-3 py-2 text-right font-bold tabular-nums text-primary-700 dark:text-primary-300">608,400원</td>
                      </tr>
                      <tr className="border border-border-base">
                        <td className="px-3 py-2">G80·카니발</td>
                        <td className="px-3 py-2 text-right">3000cc</td>
                        <td className="px-3 py-2 text-right tabular-nums">780,000원</td>
                        <td className="px-3 py-2 text-right tabular-nums">−49,900원</td>
                        <td className="px-3 py-2 text-right font-bold tabular-nums text-primary-700 dark:text-primary-300">730,100원</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-3 text-xs text-text-tertiary">
                  →{' '}
                  <Link href="/calculator/vehicle-tax/" className="text-primary-600 underline dark:text-primary-500">
                    자동차세 계산기
                  </Link>
                  에서 본인 차량 정확히 계산
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">신청 방법 — 위택스 3단계 (가장 간편)</h2>
                <ol className="space-y-3 text-sm">
                  <li className="rounded-lg border border-border-base bg-bg-card p-4">
                    <strong className="text-text-primary block mb-1">Step 1. 위택스 로그인</strong>
                    <p className="text-text-secondary">
                      <a href="https://www.wetax.go.kr" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-600 underline dark:text-primary-500">위택스(wetax.go.kr)</a> 접속 → 공동인증서·간편인증·PASS 로그인. 모바일은 "스마트 위택스" 앱.
                    </p>
                  </li>
                  <li className="rounded-lg border border-border-base bg-bg-card p-4">
                    <strong className="text-text-primary block mb-1">Step 2. 자동차세 연납 메뉴 진입</strong>
                    <p className="text-text-secondary">
                      "납부" → "자동차세 미리납부" → 본인 차량 자동 조회. 차량번호 정확한지 확인.
                    </p>
                  </li>
                  <li className="rounded-lg border border-border-base bg-bg-card p-4">
                    <strong className="text-text-primary block mb-1">Step 3. 결제</strong>
                    <p className="text-text-secondary">
                      ① 신용카드 (무이자 할부 선택) ② 계좌이체 ③ 간편결제 (카카오·네이버페이). 영수증
                      자동 발급 + 메일 송부. 처리 즉시 완료.
                    </p>
                  </li>
                </ol>
                <div className="rounded-lg border border-border-base bg-bg-raised p-4 text-sm">
                  <strong className="text-text-primary">신용카드 무이자 할부 활용 팁</strong>
                  <ul className="mt-2 space-y-1 text-text-secondary">
                    <li>• <strong>카드사별 무이자 기간</strong>: 하나·신한·KB·삼성 등 주요 카드 모두 2~6개월 무이자 지원</li>
                    <li>• <strong>수수료</strong>: 0.8% 본인 부담 (6억 기준 약 48,000원)</li>
                    <li>• <strong>이벤트 결합</strong>: 일부 카드사는 캐시백 또는 마일리지 추가 (신한카드 1% 등록금전 등)</li>
                    <li>• <strong>월 예산 분산</strong>: 월 정기 납부 기한(6월·12월) 대비 1월 무이자 할부면 현금흐름 유리</li>
                  </ul>
                </div>
              </section>

              <FaqSection items={[...FAQ_ITEMS]} />

              <section className="card border-l-4 border-l-danger-500 bg-danger-500/5">
                <h2 className="mb-2 text-lg font-semibold text-danger-700 dark:text-danger-300">⚠️ 주의사항</h2>
                <ul className="space-y-2 text-sm text-danger-700 dark:text-danger-300">
                  <li>• 할인율은 정부 정책 — 매년 변동 가능. 위택스 안내 확인 필수.</li>
                  <li>• 신청 후 차량 매도·말소 시 환급 신청 필요 (위택스 자동 처리 또는 신청).</li>
                  <li>• 카드 결제 수수료 0.8% 본인 부담 — 무이자 할부 활용 시 실질 부담 줄임.</li>
                  <li>• 1월 16일 이전·31일 이후는 할인율 다름 — 정확히 16~31일 사이 신청.</li>
                </ul>
              </section>

              <section className="card">
                <h2 className="mb-3 text-lg font-semibold">📊 관련 도구</h2>
                <ul className="space-y-2 text-sm">
                  <li>→ <Link href="/calculator/vehicle-tax/" className="text-primary-600 underline dark:text-primary-500">자동차세 계산기 — 본인 차종 정확한 세액·연납 절감액</Link></li>
                  <li>→ <Link href="/guide/tax-calendar-2026/" className="text-primary-600 underline dark:text-primary-500">2026 세금 캘린더 — 모든 세금 일정</Link></li>
                </ul>
              </section>

              <ShareButtons title="자동차세 연납 6.4% 할인 가이드 (2026)" url={URL} description="1월 신청 = 최대 9% 절약." />

              <section aria-label="출처 및 면책" className="rounded-lg border border-border-base p-4 text-caption text-text-tertiary">
                <p className="mb-2">
                  <strong>법적 근거</strong>: 지방세법 §128 (자동차세 연납 공제) · 시행령 §125. 참고:{' '}
                  <a href="https://www.wetax.go.kr/guide/guide0401000001.jsp" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-600 underline dark:text-primary-500">위택스 자동차세 미리납부 안내</a>,{' '}
                  <a href="https://www.nongshim.com/kcard/pro/card_benefit.do" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-600 underline dark:text-primary-500">신용카드 무이자 할부 카드사 정보</a>.
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
