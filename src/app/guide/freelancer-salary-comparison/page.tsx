import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { Footer } from '@/components/layout/Footer';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { AdSlot } from '@/components/ads/AdSlot';
import { FaqSection } from '@/components/calculator/FaqSection';
import {
  buildBreadcrumbJsonLd,
  buildArticleJsonLd,
  buildFaqPageJsonLd,
  buildSpeakableJsonLd,
} from '@/lib/seo/jsonld';

const URL = 'https://calculatorhost.com/guide/freelancer-salary-comparison/';
const DATE_PUBLISHED = '2026-05-03';
const DATE_MODIFIED = '2026-05-03';

export const metadata: Metadata = {
  title: '프리랜서 vs 일반직 실수령액 비교 2026 — 4대보험·세금 차이 | calculatorhost',
  description:
    '같은 연봉 5천만 원이라도 프리랜서(사업소득)와 일반직(근로소득)의 실수령액은 큰 차이. 4대보험 부담·종합소득세·경비 인정 차이를 시뮬레이션과 함께 비교.',
  keywords: ['프리랜서 실수령액', '프리랜서 vs 직장인', '프리랜서 4대보험', '프리랜서 종합소득세', '사업소득 vs 근로소득', '3.3% 원천징수'],
  alternates: { canonical: URL },
  openGraph: {
    title: '프리랜서 vs 일반직 실수령액 비교 2026',
    description: '같은 연봉이라도 다른 실수령. 4대보험·세금·경비 차이 시뮬레이션.',
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
    question: '프리랜서의 3.3% 원천징수는 무엇인가요?',
    answer:
      '용역대가 지급 시 사업소득세 3% + 지방소득세 0.3% = 3.3%를 원천징수. 이는 연말 종합소득세 산정 시 기납부세액으로 차감됩니다. 즉 미리 낸 세금일 뿐 최종 세액은 종합소득세 신고로 확정.',
  },
  {
    question: '프리랜서가 단순경비율과 기준경비율 중 어떤 것을 선택해야 하나요?',
    answer:
      '단순경비율: 영수증 없어도 업종별 일정 비율(IT 64.1%, 컨설팅 70.1% 등)을 경비로 인정. 기준경비율: 실제 영수증으로 입증, 일반적으로 단순경비율보다 큰 경비 인정 가능. 매출 7,500만 미만이면 단순경비율 자동 적용. 7,500만~3억은 단순/기준 선택, 3억 초과는 기준경비율 의무.',
  },
  {
    question: '프리랜서는 4대보험을 어떻게 가입하나요?',
    answer:
      '국민연금: 지역가입자로 본인 100% 부담 (소득의 9%). 건강보험: 지역가입자로 소득·재산·자동차 점수제. 고용보험·산재보험: 임의 가입(예술인·특수고용직 의무화 추세). 일반직 4대보험은 회사가 절반 부담하지만 프리랜서는 본인 100% — 부담률이 약 2배.',
  },
  {
    question: '프리랜서가 직장인보다 실수령액이 적을 수도 있나요?',
    answer:
      '네. 같은 연 5,000만 원 매출이라도 경비 인정이 적고 4대보험 본인 100% 부담이면 실수령액이 직장인 동일 연봉보다 적을 수 있음. 단, 경비를 충분히 인정받고(IT 단순경비율 64.1% 등) 절세 전략을 잘 활용하면 직장인보다 유리할 수도 있음. 시뮬레이션 필수.',
  },
  {
    question: 'N잡러(직장 + 프리랜서)는 어떻게 신고하나요?',
    answer:
      '근로소득(직장) + 사업소득(프리랜서) 모두 포함해 종합소득세 신고. 직장에서 연말정산 끝나도 5월 종합소득세 신고 의무. 합산 소득이 높아져 누진세율 상위 적용 가능. 또한 건강보험은 부가소득 합산 시 추가 부담.',
  },
  {
    question: '프리랜서 절세 핵심 3가지는?',
    answer:
      '① 영수증 보관 — 업무 관련 비용 모두 영수증·세금계산서로 입증. ② 노란우산공제·연금저축 — 소득공제·세액공제 활용. ③ 부가세 신고 — 일반과세자라면 매입세액공제 누락 없이.',
  },
];

export default function FreelancerSalaryComparisonPage() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '프리랜서 vs 일반직 비교' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '프리랜서 vs 일반직 실수령액 비교 (2026)',
    description: '같은 연봉이라도 다른 실수령. 4대보험·세금·경비 인정 시뮬레이션.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['프리랜서', '실수령액', '4대보험', '종합소득세', '사업소득'],
  });
  const faqLd = buildFaqPageJsonLd(FAQ_ITEMS);
  const speakableLd = buildSpeakableJsonLd(['[data-speakable]']);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableLd) }} />

      <div className="min-h-screen bg-bg-base">
        <Header />
        <div className="flex">
          <Sidebar />
          <main className="flex-1 px-4 py-8 md:px-8">
            <article className="mx-auto max-w-3xl space-y-8">
              <header>
                <Breadcrumb
                  items={[
                    { name: '홈', href: '/' },
                    { name: '가이드', href: '/guide/' },
                    { name: '프리랜서 vs 일반직 비교' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">근로 · 7분 읽기 · 2026-05-03</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  프리랜서 vs 일반직 실수령액 비교 (2026)
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  같은 연 5천만 원 받아도 프리랜서(사업소득)와 일반직(근로소득)의 실수령액은
                  최대 1천만 원 이상 차이 날 수 있습니다. 4대보험 부담·종합소득세·경비 인정 차이를
                  시뮬레이션과 함께 비교합니다.
                </p>
              </header>

              <AdSlot slot="guide-freelancer-top" format="horizontal" />

              <section aria-label="요약 비교" className="card border-l-4 border-l-primary-500">
                <h2 className="mb-3 text-xl font-bold">한눈에 보기 — 핵심 차이</h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse" data-speakable>
                    <caption className="sr-only">프리랜서와 일반직 핵심 차이 비교</caption>
                    <thead>
                      <tr className="bg-primary-500/10 border border-border-base">
                        <th className="px-3 py-2 text-left">항목</th>
                        <th className="px-3 py-2">프리랜서 (사업소득)</th>
                        <th className="px-3 py-2">일반직 (근로소득)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border border-border-base">
                        <td className="px-3 py-2 font-semibold">소득 분류</td>
                        <td className="px-3 py-2">사업소득</td>
                        <td className="px-3 py-2">근로소득</td>
                      </tr>
                      <tr className="border border-border-base">
                        <td className="px-3 py-2 font-semibold">원천징수</td>
                        <td className="px-3 py-2">3.3% (사업소득세 3 + 지방세 0.3)</td>
                        <td className="px-3 py-2">간이세액표 기준</td>
                      </tr>
                      <tr className="border border-border-base">
                        <td className="px-3 py-2 font-semibold">4대보험 본인부담</td>
                        <td className="px-3 py-2 text-danger-700 dark:text-danger-300">100% (지역가입자)</td>
                        <td className="px-3 py-2 text-primary-700 dark:text-primary-300">50% (회사 50%)</td>
                      </tr>
                      <tr className="border border-border-base">
                        <td className="px-3 py-2 font-semibold">경비 인정</td>
                        <td className="px-3 py-2 text-primary-700 dark:text-primary-300">단순/기준경비율 (수입의 60~80%)</td>
                        <td className="px-3 py-2">근로소득공제 (정액)</td>
                      </tr>
                      <tr className="border border-border-base">
                        <td className="px-3 py-2 font-semibold">신고</td>
                        <td className="px-3 py-2">5월 종합소득세 (본인 신고)</td>
                        <td className="px-3 py-2">2월 연말정산 (회사 처리)</td>
                      </tr>
                      <tr className="border border-border-base">
                        <td className="px-3 py-2 font-semibold">퇴직금</td>
                        <td className="px-3 py-2 text-danger-700 dark:text-danger-300">없음</td>
                        <td className="px-3 py-2">법정 (1년 이상)</td>
                      </tr>
                      <tr className="border border-border-base">
                        <td className="px-3 py-2 font-semibold">고용 안정</td>
                        <td className="px-3 py-2">계약 유연 (불안정)</td>
                        <td className="px-3 py-2">정규직 보호</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">시나리오 1. 연 3,000만 원 (월 250만)</h2>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="rounded-lg border border-border-base bg-bg-card p-4 text-sm">
                    <h3 className="mb-2 font-semibold text-text-primary">📌 프리랜서 (IT 단순경비율 64.1%)</h3>
                    <ul className="space-y-1 text-text-secondary">
                      <li>총 매출: 3,000만</li>
                      <li>경비 인정: 1,923만 (64.1%)</li>
                      <li>소득금액: 1,077만</li>
                      <li>종합소득세: 약 70만 (6%)</li>
                      <li>건강보험: 약 200만 (지역)</li>
                      <li>국민연금: 약 270만 (9%)</li>
                    </ul>
                    <p className="mt-2 pt-2 border-t border-border-base">
                      <strong>실수령: 약 2,460만</strong>
                    </p>
                  </div>
                  <div className="rounded-lg border border-border-base bg-bg-card p-4 text-sm">
                    <h3 className="mb-2 font-semibold text-text-primary">📌 일반직 (부양 1인)</h3>
                    <ul className="space-y-1 text-text-secondary">
                      <li>연봉: 3,000만</li>
                      <li>4대보험(본인): 약 270만</li>
                      <li>소득세+지방세: 약 60만</li>
                      <li>(회사 4대보험 부담 270만 별도)</li>
                    </ul>
                    <p className="mt-2 pt-2 border-t border-border-base">
                      <strong>실수령: 약 2,670만</strong>
                    </p>
                  </div>
                </div>
                <p className="text-sm text-text-secondary">
                  <strong>차이</strong>: 일반직 약 +210만 (회사 4대보험 50% 부담 효과). 프리랜서는 경비
                  인정으로 세금은 적지만 4대보험 본인 100% 부담이 결정적.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">시나리오 2. 연 5,000만 원 (월 417만)</h2>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="rounded-lg border border-border-base bg-bg-card p-4 text-sm">
                    <h3 className="mb-2 font-semibold text-text-primary">📌 프리랜서 (IT 단순경비율)</h3>
                    <ul className="space-y-1 text-text-secondary">
                      <li>총 매출: 5,000만</li>
                      <li>경비 인정: 3,205만 (64.1%)</li>
                      <li>소득금액: 1,795만</li>
                      <li>종합소득세: 약 145만 (15% 구간)</li>
                      <li>건강보험: 약 330만</li>
                      <li>국민연금: 약 450만</li>
                    </ul>
                    <p className="mt-2 pt-2 border-t border-border-base">
                      <strong>실수령: 약 4,075만</strong>
                    </p>
                  </div>
                  <div className="rounded-lg border border-border-base bg-bg-card p-4 text-sm">
                    <h3 className="mb-2 font-semibold text-text-primary">📌 일반직 (부양 1인)</h3>
                    <ul className="space-y-1 text-text-secondary">
                      <li>연봉: 5,000만</li>
                      <li>4대보험(본인): 약 450만</li>
                      <li>소득세+지방세: 약 350만</li>
                    </ul>
                    <p className="mt-2 pt-2 border-t border-border-base">
                      <strong>실수령: 약 4,200만</strong>
                    </p>
                  </div>
                </div>
                <p className="text-sm text-text-secondary">
                  <strong>차이</strong>: 거의 비슷 (일반직 +125만). 프리랜서는 경비 인정 잘 받으면 일반직과
                  거의 동률 달성 가능.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">시나리오 3. 연 1억 원 (고소득)</h2>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="rounded-lg border border-border-base bg-bg-card p-4 text-sm">
                    <h3 className="mb-2 font-semibold text-text-primary">📌 프리랜서 (기준경비율 권장)</h3>
                    <ul className="space-y-1 text-text-secondary">
                      <li>총 매출: 1억</li>
                      <li>실제 경비(영수증): 4,000만</li>
                      <li>소득금액: 6,000만</li>
                      <li>종합소득세: 약 884만 (24% 구간)</li>
                      <li>건강·연금: 약 1,200만</li>
                    </ul>
                    <p className="mt-2 pt-2 border-t border-border-base">
                      <strong>실수령: 약 7,916만</strong>
                    </p>
                  </div>
                  <div className="rounded-lg border border-border-base bg-bg-card p-4 text-sm">
                    <h3 className="mb-2 font-semibold text-text-primary">📌 일반직</h3>
                    <ul className="space-y-1 text-text-secondary">
                      <li>연봉: 1억</li>
                      <li>4대보험(본인): 약 900만</li>
                      <li>소득세+지방세: 약 1,400만</li>
                    </ul>
                    <p className="mt-2 pt-2 border-t border-border-base">
                      <strong>실수령: 약 7,700만</strong>
                    </p>
                  </div>
                </div>
                <p className="text-sm text-text-secondary">
                  <strong>차이</strong>: 프리랜서 +216만 우위. 고소득 구간에서는 경비 인정 효과가 4대보험
                  부담을 능가. 단, 영수증·세무 신고 부담 대신 자율성·세무 리스크 감수.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">의사결정 가이드</h2>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 text-sm text-text-secondary leading-loose">
                  <p><strong className="text-text-primary">프리랜서가 유리한 경우</strong></p>
                  <ul className="ml-5 list-disc">
                    <li>고소득(연 5천 이상) + 경비 인정 가능한 업종(IT 64.1%, 컨설팅 70.1%, 디자인 등)</li>
                    <li>실제 사업 비용 영수증 관리 가능</li>
                    <li>퇴직금·고용 안정보다 자율성·복수 클라이언트 선호</li>
                  </ul>
                  <p className="mt-3"><strong className="text-text-primary">일반직이 유리한 경우</strong></p>
                  <ul className="ml-5 list-disc">
                    <li>저소득(연 3천 이하) — 회사 4대보험 50% 부담 효과 큼</li>
                    <li>퇴직금·연차·복지 + 고용 안정 우선</li>
                    <li>세무 신고·영수증 관리 부담 회피</li>
                  </ul>
                </div>
              </section>

              <FaqSection items={FAQ_ITEMS} />

              <section className="card border-l-4 border-l-danger-500 bg-danger-500/5">
                <h2 className="mb-2 text-lg font-semibold text-danger-700 dark:text-danger-300">⚠️ 주의사항</h2>
                <ul className="space-y-2 text-sm text-danger-700 dark:text-danger-300">
                  <li>• 본 시뮬레이션은 일반론(경비율 IT 기준, 부양 1인) — 실제는 업종·부양가족·세액공제에 따라 달라집니다.</li>
                  <li>• 건강·연금 보험료는 지역가입자 점수제로 재산·자동차 등 추가 변수 영향. 정확한 부담은 건강보험공단 확인.</li>
                  <li>• 프리랜서 종합소득세 신고는 5월. 무신고 시 가산세 20% — 반드시 신고.</li>
                </ul>
              </section>

              <section className="card">
                <h2 className="mb-3 text-lg font-semibold">관련 도구</h2>
                <ul className="space-y-2 text-sm">
                  <li>→ <Link href="/calculator/freelancer-tax/" className="text-primary-600 underline dark:text-primary-500">프리랜서 종합소득세 계산기</Link></li>
                  <li>→ <Link href="/calculator/salary/" className="text-primary-600 underline dark:text-primary-500">연봉 실수령액 계산기 (직장인)</Link></li>
                  <li>→ <Link href="/calculator/n-jobber-insurance/" className="text-primary-600 underline dark:text-primary-500">N잡러 건강보험 계산기</Link></li>
                  <li>→ <Link href="/calculator/vat/" className="text-primary-600 underline dark:text-primary-500">부가가치세 계산기 (프리랜서 사업자)</Link></li>
                </ul>
              </section>

              <section
                aria-label="출처 및 면책"
                className="rounded-lg border border-border-base p-4 text-caption text-text-tertiary"
              >
                <p className="mb-2">
                  <strong>법적 근거</strong>: 소득세법 §19·§20 · 국민건강보험법 §69 · 국민연금법 §88 ·
                  부가가치세법 시행령 §111. 참고:{' '}
                  <a href="https://www.hometax.go.kr" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-600 underline dark:text-primary-500">국세청 홈택스</a>,{' '}
                  <a href="https://www.nhis.or.kr" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-600 underline dark:text-primary-500">국민건강보험공단</a>.
                </p>
                <p><strong>업데이트</strong>: {DATE_MODIFIED}</p>
              </section>
            </article>
          </main>
        </div>
        <Footer />
      </div>
    </>
  );
}
