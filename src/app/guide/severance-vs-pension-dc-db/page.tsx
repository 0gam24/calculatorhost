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

const URL = 'https://calculatorhost.com/guide/severance-vs-pension-dc-db/';
const DATE_PUBLISHED = '2026-05-04';
const DATE_MODIFIED = '2026-05-04';

export const metadata: Metadata = {
  title: '퇴직금 vs DC/DB 퇴직연금 선택 가이드 2026 | calculatorhost',
  description:
    '퇴직금·DC형·DB형 차이점, 세금·수익성 비교. 임금피크제 대비 전환 전략까지 한눈에. 한국 거주자 기준 실전 가이드. 법조항·관련 계산기 링크 포함.',
  keywords: [
    '퇴직금',
    'DC형 퇴직연금',
    'DB형 퇴직연금',
    '퇴직연금 선택',
    '임금피크제',
    '퇴직금 세금',
    '확정급여',
    '확정기여',
  ],
  alternates: { canonical: URL },
  openGraph: {
    title: '퇴직금 vs DC/DB 퇴직연금 선택 가이드 2026',
    description: '3가지 제도 특징·세금·수익성 비교, 최적 선택 기준.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
};

const FAQ_ITEMS = [
  {
    question: 'DC형과 DB형 전환은 언제하는 것이 유리한가요?',
    answer:
      '임금피크제 도입 직전이 최적 시기입니다. DB형은 퇴직 시점의 3개월 평균임금을 기준으로 계산되므로, 임금 감소 전 DC형으로 전환하면 이미 적립된 DB급여를 고정시키고 남은 기간을 DC로 받아 평균임금 하락 영향을 최소화할 수 있습니다. 단, DB→DC 전환은 역방향 불가능하므로 신중히 결정하세요.',
  },
  {
    question: '퇴직금과 퇴직연금, 둘 다 받을 수는 없나요?',
    answer:
      '2005년 12월 31일 이후 입사자는 퇴직연금(DC/DB), 이전 입사자는 퇴직금 선택. 다만 회사가 퇴직금 → 퇴직연금으로 일괄 전환 시 적립금을 받고 새 제도로 이동합니다. 기존 퇴직금은 소급 적용되지 않으므로 입사 시기 확인 필수.',
  },
  {
    question: '퇴직연금 이전/중도인출은 세금이 어떻게 되나요?',
    answer:
      'DC형 계좌 이전 시 일단위 소득세·지방소득세 없음. 중도인출 시 수익분만 기타소득세 16.5% 부담. 퇴직금 인출은 1회에 한해 과세연도 합산 최대 1,200만원까지 14% 세액공제 가능. 55세 이후 퇴직 시 일시금 또는 연금 선택 가능.',
  },
  {
    question: '회사가 DB에서 DC로 전환을 강요할 수 있나요?',
    answer:
      '2010년 이후 입사자는 회사가 선택, 2005~2009년 입사자는 근로자 동의 필수. 다만 전환 후 DB로 복귀는 불가능하므로 서면 동의 전 충분한 검토 시간을 요구할 수 있습니다. 노조가 있으면 단체협상 대상이 될 수도 있습니다.',
  },
  {
    question: '퇴직금 vs DC, 수익성은 어디가 유리한가요?',
    answer:
      '저금리 장기간(15년+)이면 DC 운용성 좋음, 단기면 DB 확정성 유리. DB는 회사가 운용하므로 개인 책임 없음. DC는 주식·채권 비중 선택하므로 고금리·부동산 시대엔 DC 유리할 수 있으나, 개인이 운용 실패 시 손실 감당. 자산배분 역량 없으면 DB·퇴직금이 안정적.',
  },
  {
    question: '55세 이후 연금 선택 시 税率 차이가 있나요?',
    answer:
      '일시금 수령: 퇴직소득세 적용 (최대 1,200만원까지 14% 세액공제, 초과분 누진세율 적용). 연금 수령: 연금소득세 3.3~5.5% + 지방소득세로 일시금보다 유리할 수 있습니다. 본인 기대수명·자산 규모를 감안해 선택하면, 장수 시 연금이 유리합니다.',
  },
  {
    question: '퇴직 후 계약직 전환 시 퇴직금은?',
    answer:
      '계약직은 법정 퇴직금 대상 아님. 다만 계약 기간 중 퇴직연금 가입하면 DC로 관리. 이전 정직원 기간 퇴직금/퇴직연금은 일시금 또는 IRP 이전으로 관리. 회사 복귀 시 기존 계좌 인수 가능(DB는 불가).',
  },
];

export default function SeveranceVsPensionDcDbPage() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '퇴직금 vs DC/DB 선택 가이드' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '퇴직금 vs DC/DB 퇴직연금 선택 가이드 (2026)',
    description:
      '퇴직금·DC형·DB형 3가지 제도 특징, 세금, 수익성 비교. 임금피크제 시 최적 전환 시기.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['퇴직금', 'DC형', 'DB형', '퇴직연금', '선택'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '퇴직금 vs DC/DB 퇴직연금 선택 가이드 2026',
    description:
      '2026년 퇴직금·DC형·DB형 비교. 세금, 수익성, 임금피크제 대비 전략까지. 회사별 선택 기준 정리.',
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
                    { name: '퇴직금 vs DC/DB 선택 가이드' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">직장인 · 11분 읽기 · 2026-05-04</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  퇴직금 vs DC/DB 퇴직연금
                  <br />
                  <span className="text-2xl text-text-secondary">— 어떤 것을 선택할까?</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  퇴직연금 제도 선택은 평생 급여 차이를 만드는 중요한 결정입니다. 퇴직금·DC형(확정기여)·DB형(확정급여)
                  세 가지 제도의 특징, 세금, 운용 방식, 임금피크제 시 최적 전환 전략을 한눈에 비교합니다.
                </p>
              </header>

              <AdSlot slot="guide-sev-top" format="horizontal" />

              <section aria-label="핵심 요약" className="card border-l-4 border-l-primary-500">
                <h2 className="mb-2 text-caption uppercase tracking-wider text-primary-500">3가지 제도 한눈에</h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs" data-speakable>
                    <thead>
                      <tr className="bg-primary-500/10">
                        <th className="px-2 py-2 text-left">항목</th>
                        <th className="px-2 py-2 text-left">퇴직금</th>
                        <th className="px-2 py-2 text-left">DB형</th>
                        <th className="px-2 py-2 text-left">DC형</th>
                      </tr>
                    </thead>
                    <tbody className="text-text-secondary">
                      <tr className="border-b border-border-subtle">
                        <td className="px-2 py-2 font-semibold">대상</td>
                        <td>2005.12.31 이전 입사</td>
                        <td>선택형 (회사 정책)</td>
                        <td>신입사자 기본</td>
                      </tr>
                      <tr className="border-b border-border-subtle">
                        <td className="px-2 py-2 font-semibold">적립</td>
                        <td>회사가 최종 자산 책임</td>
                        <td>회사가 운용</td>
                        <td>근로자 운용</td>
                      </tr>
                      <tr className="border-b border-border-subtle">
                        <td className="px-2 py-2 font-semibold">운용 결과</td>
                        <td>固定 (3개월 평균임금 기준)</td>
                        <td>고정 (회사 책임)</td>
                        <td>변동 (개인 책임)</td>
                      </tr>
                      <tr className="border-b border-border-subtle">
                        <td className="px-2 py-2 font-semibold">세금</td>
                        <td>퇴직소득세 14%~</td>
                        <td>퇴직소득세 14%~</td>
                        <td>퇴직소득세 14%~</td>
                      </tr>
                      <tr>
                        <td className="px-2 py-2 font-semibold">임금피크 영향</td>
                        <td>큼 (평균 기준)</td>
                        <td>큼</td>
                        <td>적음 (과거 누적)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">제도 1. 퇴직금 — 고전 방식, 보수적</h2>
                <p className="text-text-secondary leading-relaxed">
                  2005년 12월 31일 이전 입사자의 기본 제도(근로기준법 §34).
                  회사가 퇴직 시점의 <strong>3개월 평균임금 × 근속연수 ÷ 12 × 30일</strong>로 계산.
                  별도 적립 의무 없고, 퇴직 시점에 지급.
                </p>
                <div className="rounded-lg border border-primary-500/30 bg-primary-500/5 p-4">
                  <strong className="text-text-primary block mb-2">장점</strong>
                  <ul className="text-sm text-text-secondary space-y-1">
                    <li>• 최종 금액 확정 (회사 파산 제외)</li>
                    <li>• 임금 상승 시 마지막 근로 반영 (최고 급여 기준)</li>
                    <li>• 운용 책임 없음 (노후 안정성)</li>
                  </ul>
                </div>
                <div className="rounded-lg border border-danger-500/30 bg-danger-500/5 p-4">
                  <strong className="text-text-primary block mb-2">단점</strong>
                  <ul className="text-sm text-text-secondary space-y-1">
                    <li>• 임금피크제 도입 시 급격히 감소</li>
                    <li>• 중도인출 불가 (퇴직까지 격리)</li>
                    <li>• 기간 이익 (주식 상승 등) 미반영</li>
                  </ul>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">제도 2. DB형 (확정급여형) — 회사 책임형</h2>
                <p className="text-text-secondary leading-relaxed">
                  퇴직금을 연금화한 제도. 회사가 운용 책임. 퇴직 시점의 임금·근속연수 기반으로
                  금액 미리 약속 (연금보험사 또는 기금). 퇴직금처럼 예측 가능.
                </p>
                <div className="rounded-lg border border-primary-500/30 bg-primary-500/5 p-4">
                  <strong className="text-text-primary block mb-2">장점</strong>
                  <ul className="text-sm text-text-secondary space-y-1">
                    <li>• 예측 가능한 퇴직금 (약정)</li>
                    <li>• 회사가 운용 리스크 承保</li>
                    <li>• 장기 금리 변동 (금리 인하) 영향 적음</li>
                  </ul>
                </div>
                <div className="rounded-lg border border-danger-500/30 bg-danger-500/5 p-4">
                  <strong className="text-text-primary block mb-2">단점</strong>
                  <ul className="text-sm text-text-secondary space-y-1">
                    <li>• 주식 상승 시 수익 미반영</li>
                    <li>• 임금피크제 시 감소 (전환 불가)</li>
                    <li>• DC 전환 후 DB 복귀 불가능</li>
                  </ul>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">제도 3. DC형 (확정기여형) — 개인 운용형</h2>
                <p className="text-text-secondary leading-relaxed">
                  회사가 월급의 일정 비율(최소 임금의 8.33%)을 개인 계좌에 적립.
                  근로자가 주식·채권·펀드를 직접 선택해 운용. 최종 금액은 수익률에 따라 결정.
                </p>
                <div className="rounded-lg border border-primary-500/30 bg-primary-500/5 p-4">
                  <strong className="text-text-primary block mb-2">장점</strong>
                  <ul className="text-sm text-text-secondary space-y-1">
                    <li>• 주식·부동산 상승 시 수익 모두 내 것</li>
                    <li>• 임금피크제 시에도 과거 적립액 고정 (손실 최소)</li>
                    <li>• 회사 파산 시 별도 계좌 보호</li>
                    <li>• 이직 시 계좌 이전 용이</li>
                  </ul>
                </div>
                <div className="rounded-lg border border-danger-500/30 bg-danger-500/5 p-4">
                  <strong className="text-text-primary block mb-2">단점</strong>
                  <ul className="text-sm text-text-secondary space-y-1">
                    <li>• 운용 손실 개인 책임 (주가 하락 시)</li>
                    <li>• 자산배분 실패 시 원금 훼손</li>
                    <li>• 예측 불가능 (리스크)</li>
                  </ul>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">🎯 임금피크제 앞두고 DC로 전환해야 할까?</h2>
                <p className="text-text-secondary leading-relaxed mb-4">
                  DB 또는 퇴직금은 <strong>최종 3개월 평균임금</strong>이 기준이므로, 임금 감소는 퇴직금 급감으로 직결.
                  DC로 전환하면 기존 적립액을 고정시킬 수 있습니다.
                </p>
                <div className="rounded-lg bg-bg-raised p-4 text-sm">
                  <strong className="text-text-primary block mb-2">시뮬레이션 — DB → DC 전환</strong>
                  <p className="text-text-secondary">
                    현재 연봉 6,000만 (DB 적립액 2.5억) → 임금피크제로 5년 후 4,500만 → 5년 후 3,000만<br />
                    <strong>DB 미전환</strong>: 3,000만 기준 계산 → 약 1.2억 퇴직금 손실<br />
                    <strong>DC 전환 (임금피크 직전)</strong>: 2.5억 고정 + 향후 5년 추가 적립 약 7,500만<br />
                    <strong>손실 회피: 약 1.2억 원</strong>
                  </p>
                </div>
                <p className="text-text-secondary text-sm mt-4">
                  ⚠️ 주의: 임금피크제 실시 1년 전부터 근로자 동의 하에 전환 가능.
                  회사가 일방 강요 시 노조·노동청 상담 권장.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">세금 비교 — 퇴직소득세</h2>
                <p className="text-text-secondary mb-3">
                  퇴직금·DC/DB 모두 <strong>퇴직소득세</strong> 적용. 일시금 vs 연금 선택 시 세율 차이 발생.
                </p>
                <div className="rounded-lg border border-border-base p-4 text-sm">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-bg-raised border-b border-border-base">
                        <th className="px-2 py-2 text-left">선택</th>
                        <th className="px-2 py-2 text-left">세제</th>
                        <th className="px-2 py-2 text-left">예시 (1억)</th>
                      </tr>
                    </thead>
                    <tbody className="text-text-secondary">
                      <tr className="border-b border-border-subtle">
                        <td className="px-2 py-2 font-semibold">일시금</td>
                        <td className="px-2 py-2">퇴직소득세 14%~40% (누진)</td>
                        <td className="px-2 py-2">약 1,400만 세금</td>
                      </tr>
                      <tr>
                        <td className="px-2 py-2 font-semibold">연금 (55세+)</td>
                        <td className="px-2 py-2">연금소득세 3.3%~5.5%</td>
                        <td className="px-2 py-2">약 330~550만 연간</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              <FaqSection items={[...FAQ_ITEMS]} />

              <section className="card border-l-4 border-l-danger-500 bg-danger-500/5">
                <h2 className="mb-2 text-lg font-semibold text-danger-700 dark:text-danger-300">⚠️ 주의사항</h2>
                <ul className="space-y-2 text-sm text-danger-700 dark:text-danger-300">
                  <li>• 제도 선택은 회사 정책에 따라 결정 — 개인 선택 불가능한 경우 다수</li>
                  <li>• DB→DC 전환 후 역방향 불가능 — 신중히 결정</li>
                  <li>• 임금피크제 시행 1년 전 사전 공고 필수 (법정)</li>
                  <li>• 본 분석은 일반론 — 회사 규약·노조 협약 확인 필수</li>
                </ul>
              </section>

              <section className="card">
                <h2 className="mb-3 text-lg font-semibold">📊 관련 계산기·가이드</h2>
                <ul className="space-y-2 text-sm">
                  <li>→ <Link href="/calculator/severance/" className="text-primary-600 underline dark:text-primary-500">퇴직금 계산기</Link> — DC/DB 시나리오 비교</li>
                  <li>→ <Link href="/calculator/salary/" className="text-primary-600 underline dark:text-primary-500">연봉 실수령액 계산기</Link> — 임금피크 후 세후 월급 확인</li>
                  <li>→ <Link href="/guide/year-end-tax-settlement/" className="text-primary-600 underline dark:text-primary-500">연말정산 완벽 가이드</Link> — 퇴직 전 세액공제 극대화</li>
                </ul>
              </section>

              <ShareButtons
                title="퇴직금 vs DC/DB 퇴직연금 선택 가이드"
                url={URL}
                description="3가지 제도 비교, 임금피크제 전환 전략까지."
              />

              <section aria-label="출처 및 면책" className="rounded-lg border border-border-base p-4 text-caption text-text-tertiary">
                <p className="mb-2">
                  <strong>법적 근거</strong>: 근로기준법 §34 (퇴직금) · 근로자퇴직급여보장법 (퇴직연금) · 소득세법 §104의2 (퇴직소득세). 참고:{' '}
                  <a href="https://www.law.go.kr/lsSc.do?tabMenuId=tab18&query=%EA%B7%BC%EB%A1%9C%EA%B8%B0%EC%A4%80%EB%B2%95" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-600 underline dark:text-primary-500">근로기준법 (법제처)</a>,{' '}
                  <a href="https://www.kdie.go.kr" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-600 underline dark:text-primary-500">근로자퇴직급여보장 공단</a>,{' '}
                  <a href="https://www.nts.go.kr" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-600 underline dark:text-primary-500">국세청</a>.
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
