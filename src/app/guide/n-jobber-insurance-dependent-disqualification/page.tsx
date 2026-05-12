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

const URL = 'https://calculatorhost.com/guide/n-jobber-insurance-dependent-disqualification/';
const DATE_PUBLISHED = '2026-05-12';
const DATE_MODIFIED = '2026-05-12';

export const metadata: Metadata = {
  title: 'N잡 건강보험 피부양자 탈락 기준 완벽 정리 2026 | 재취득 절차',
  description:
    '2026 피부양자 탈락 기준: 소득 합산 2,000만 초과·사업자등록 + 사업소득 1원 이상·프리랜서 500만 초과. 재산세 과세표준 5억 4천만 + 소득 1,000만 초과 시도 탈락. 지역가입자 전환·재취득 절차 정리.',
  keywords: [
    'N잡 건강보험',
    '피부양자 탈락',
    '피부양자 자격',
    '프리랜서 500만',
    '사업자등록 피부양자',
    '지역가입자 전환',
    '건강보험료 폭증',
    '피부양자 재취득',
    '국민건강보험법',
    '2026 피부양자',
  ],
  alternates: { canonical: URL },
  openGraph: {
    title: 'N잡 건강보험 피부양자 탈락 기준 완벽 정리 2026',
    description: '소득·재산·관계 3대 기준 + 사업자등록 자동 탈락 + 재취득 절차.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'N잡 건강보험 피부양자 탈락 기준 2026',
    description: '소득 2,000만·프리랜서 500만·사업자등록 1원 = 탈락.',
  },
};

const FAQ_ITEMS = [
  {
    question: '프리랜서 연 600만 원 벌면 피부양자 탈락인가요?',
    answer:
      '네, 사업자등록이 없는 프리랜서·부업자는 연간 사업소득 합산 500만 원 초과 시 피부양자 자격 상실(국민건강보험법 시행규칙 §2의2). 600만 원이면 100만 원 초과로 탈락 대상. 다만 공단은 전년도 소득을 다음 해 11월 정기 재산정 시 반영하므로 즉시 탈락은 아니나, 다음 재산정 주기에 탈락 가능성 큼.',
  },
  {
    question: '사업자등록을 하면 무조건 피부양자 탈락인가요?',
    answer:
      '사업자등록이 있고 사업소득이 1원이라도 발생하면 즉시 탈락(국민건강보험법 §5·시행령 §2). 매출 0이라도 사업자등록 자체로는 유지 가능하지만 소득 발생 시점부터 자격 상실. 사업자등록 + 사업소득 0이면 피부양자 유지 가능하나, 공단 심사 시 추가 증빙 요청 가능.',
  },
  {
    question: '피부양자 탈락 시 지역가입자 보험료는 얼마나 되나요?',
    answer:
      '소득·재산 기반 산정이라 개인별 큰 차이. 일반적으로 연 소득 2,000~3,000만 원이면 월 약 15~25만 원, 3,000~5,000만 원이면 월 25~40만 원 수준. 정확한 계산은 국민건강보험공단 "건강보험25시" 앱 또는 nhis.or.kr → 지역가입자 보험료 모의계산.',
  },
  {
    question: '부부 중 한 명만 소득 초과해도 둘 다 탈락하나요?',
    answer:
      '아닙니다. 피부양자 자격은 개별 판정으로, 본인이 기준 초과 시 본인만 탈락. 단 직장가입자(부양자)의 보험료는 피부양자 수에 따라 책정되므로 피부양자 1인 감소 시 부양자 보험료가 상승할 수 있음. 부부가 모두 N잡 활동이면 각자 별도로 점검 필요.',
  },
  {
    question: '탈락 후 다시 피부양자가 되려면 얼마나 기다려야 하나요?',
    answer:
      '소득·재산 기준을 다시 충족하면 재신청 가능합니다. 사업자등록은 폐업 신고 + 사업소득 발생 중단 후 다음 정기 재산정(11월) 시 반영. 즉시 재취득보다는 공단에 직접 신청 후 심사(통상 1~2주). 재취득 후에도 매년 11월 정기 재확인 심사 지속됩니다.',
  },
];

export default function NJobberDependentGuide() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: 'N잡 건강보험 피부양자 탈락' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: 'N잡 건강보험 피부양자 탈락 기준 완벽 정리 2026',
    description:
      'N잡러·프리랜서가 피부양자 자격을 잃는 3대 기준과 탈락 시 지역가입자 전환·보험료 폭증·재취득 절차.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    type: 'Article',
    keywords: ['피부양자', 'N잡', '건강보험', '지역가입자', '2026'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: 'N잡 건강보험 피부양자 탈락 기준 완벽 정리 2026',
    description: '소득·재산·관계 3대 기준 + 사업자등록 자동 탈락 + 재취득 절차.',
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
                    { name: 'N잡 건강보험 피부양자 탈락' },
                  ]}
                />
                <h1 className="mt-4 text-3xl font-bold text-text-primary md:text-4xl">
                  N잡 건강보험 피부양자 탈락 기준 완벽 정리 2026
                </h1>
                <p className="mt-3 text-lg text-text-secondary" data-speakable>
                  직장인 부모·배우자에게 피부양자로 등재된 N잡러·프리랜서가 가장 많이 놓치는 함정 — 합산소득 2,000만 원 초과,
                  사업자등록 + 사업소득 1원 이상, 사업자 없는 프리랜서 사업소득 500만 원 초과 시 자격 상실
                  (국민건강보험법 §5·§6·시행령 §2). 탈락 시 지역가입자로 전환되어 월 보험료 15~40만 원으로 폭증.
                </p>
              </header>

              <AdSlot slot="guide-dependent-top" format="horizontal" />

              {/* 1. 3대 자격 기준 */}
              <section aria-label="3대 자격 기준" className="card">
                <h2 className="mb-4 text-2xl font-semibold">피부양자 자격 3대 기준</h2>
                <div className="overflow-x-auto" data-speakable>
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border-base text-left">
                        <th className="py-2 pr-4 font-semibold">기준</th>
                        <th className="py-2 font-semibold">조건</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-subtle"><td className="py-2 pr-4">① 부양관계</td><td className="py-2">직장가입자의 배우자·직계존비속·형제자매 (국민건강보험법 §5)</td></tr>
                      <tr className="border-b border-border-subtle"><td className="py-2 pr-4">② 소득</td><td className="py-2">연 합산소득 2,000만 원 이하 (시행령 §2)</td></tr>
                      <tr><td className="py-2 pr-4">③ 재산</td><td className="py-2">재산세 과세표준 5억 4,000만 원 이하 (또는 9억 초과 + 소득 1,000만 이하)</td></tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-3 text-sm text-text-tertiary">
                  3가지 모두 동시 만족 필수. 하나라도 초과 시 즉시 탈락. 매년 11월 정기 재산정 시점에 자동 심사
                  (전년도 소득 기준).
                </p>
              </section>

              {/* 2. 소득 기준 상세 */}
              <section aria-label="소득 기준" className="card border-l-4 border-l-primary-500">
                <h2 className="mb-4 text-2xl font-semibold">소득 기준 — 합산 2,000만 + 프리랜서 500만</h2>
                <div className="space-y-3 text-text-secondary" data-speakable>
                  <div>
                    <h3 className="font-semibold text-text-primary">합산 대상 소득 (2,000만 한도)</h3>
                    <ul className="list-inside list-disc text-sm space-y-1 mt-1">
                      <li>근로소득 (직장 급여)</li>
                      <li>사업소득 (프리랜서·임대료)</li>
                      <li>이자·배당금 (연 1,000만 원 이상만 합산)</li>
                      <li>기타 양도소득 (주식 양도차익 제외)</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold text-text-primary">사업자등록 별도 트랙</h3>
                    <ul className="list-inside list-disc text-sm space-y-1 mt-1">
                      <li><strong>사업자등록 있음</strong>: 사업소득 1원이라도 발생 시 즉시 탈락</li>
                      <li><strong>사업자등록 없음 (프리랜서)</strong>: 사업소득 합산 500만 원 초과 시 탈락 (시행규칙 §2의2)</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* 3. 재산 기준 */}
              <section aria-label="재산 기준" className="card">
                <h2 className="mb-4 text-2xl font-semibold">재산 기준 — 과세표준 5.4억 / 9억</h2>
                <ul className="list-inside list-disc space-y-1.5 text-sm text-text-secondary" data-speakable>
                  <li>재산세 과세표준 <strong>5억 4,000만 원 이하</strong> → 무조건 유지</li>
                  <li>5.4억 초과 ~ 9억 미만 + 연 소득 <strong>1,000만 원 이하</strong> → 유지 가능</li>
                  <li>9억 초과 → 무조건 탈락 (소득 무관)</li>
                </ul>
                <p className="mt-3 text-sm text-text-tertiary">
                  재산세 과세표준 = 공시가격 × 공정시장가액비율 60%. 공시 9억 = 과세표준 약 5.4억. 자세한 산정은
                  국민건강보험공단 "재산 모의계산" 메뉴에서 확인.
                </p>
              </section>

              <AdSlot slot="guide-dependent-mid" format="rectangle" />

              {/* 4. FAQ */}
              <FaqSection items={[...FAQ_ITEMS]} />

              {/* 5. 탈락 시 보험료 시뮬 */}
              <section aria-label="탈락 시 보험료" className="card border-l-4 border-l-danger-500">
                <h2 className="mb-4 text-2xl font-semibold">탈락 시 지역가입자 보험료 시뮬</h2>
                <div className="overflow-x-auto" data-speakable>
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border-base text-left">
                        <th className="py-2 pr-4 font-semibold">상태</th>
                        <th className="py-2 pr-4 font-semibold">월 보험료 (대략)</th>
                        <th className="py-2 font-semibold">연 부담</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-subtle"><td className="py-2 pr-4">피부양자</td><td className="py-2 pr-4">0원</td><td className="py-2">0원</td></tr>
                      <tr className="border-b border-border-subtle"><td className="py-2 pr-4">지역가입자 (소득 2~3천)</td><td className="py-2 pr-4">15~25만</td><td className="py-2">180~300만</td></tr>
                      <tr><td className="py-2 pr-4">지역가입자 (소득 3~5천)</td><td className="py-2 pr-4">25~40만</td><td className="py-2">300~480만</td></tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-3 text-sm text-text-tertiary">
                  부양자(직장가입자)의 보험료도 피부양자 수 감소 시 일부 상승 가능. 정확한 산정은
                  <a href="https://www.nhis.or.kr" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-600 underline dark:text-primary-500">국민건강보험공단</a> "지역가입자 보험료 모의계산" 또는 1577-1000 상담.
                </p>
              </section>

              {/* 6. 자동 탈락 트리거 */}
              <section aria-label="자동 탈락 트리거" className="card">
                <h2 className="mb-4 text-2xl font-semibold">자동 탈락 트리거 — 사업자등록의 함정</h2>
                <ul className="list-inside list-disc space-y-1.5 text-sm text-text-secondary">
                  <li>플랫폼 셀러 (쿠팡·네이버 스마트스토어·배민 등) 사업자등록 → 사업소득 1원으로 탈락</li>
                  <li>블로그·유튜브 수익화 후 사업자등록 권유 받음 → 등록 전 피부양자 영향 점검 필수</li>
                  <li>크몽·탤런트뱅크 등 프리랜서 마켓 → 일정 매출 이상 시 사업자등록 강제될 수 있음</li>
                  <li>월세 임대 부가세 발생 → 자동 사업자등록 권고</li>
                </ul>
              </section>

              {/* 7. 재취득 절차 */}
              <section aria-label="재취득 절차" className="card">
                <h2 className="mb-4 text-2xl font-semibold">탈락 후 재취득 절차</h2>
                <ol className="list-inside list-decimal space-y-2 text-text-secondary">
                  <li>소득·재산 기준 다시 충족 (사업자등록은 폐업 신고 필수)</li>
                  <li>국민건강보험공단 방문·전화(1577-1000)·온라인 신청 ("건강보험25시" 앱)</li>
                  <li>피부양자 자격 신청서 + 증빙 자료 제출 (소득 증빙·가족관계증명서)</li>
                  <li>공단 심사 (통상 1~2주)</li>
                  <li>승인 시 자격 회복. 단 소급 환급 X (탈락 기간 보험료는 환급 안 됨).</li>
                </ol>
              </section>

              {/* 8. 주의사항 */}
              <section aria-label="주의사항" className="card border-l-4 border-l-danger-500">
                <h2 className="mb-3 text-xl font-semibold">⚠️ 주의사항 + 예방 체크리스트</h2>
                <ul className="list-inside list-disc space-y-1.5 text-sm text-text-secondary">
                  <li>부업 소득이 연 400~500만 원대면 추가 소득 자제 (한도 임박).</li>
                  <li>사업자등록 신청 전 세무사·공단 사전 상담 필수.</li>
                  <li>이자·배당금 연 950만 원이면 합산 0 (1,000만 미만), 1,001만 원이면 전액 합산.</li>
                  <li>매년 11월 정기 재산정 시점 직전(10월 말)까지 소득 정리 권장.</li>
                  <li>재산세 공시가 변경 시 과세표준도 변경 — 6월 1일 기준으로 갱신.</li>
                </ul>
              </section>

              {/* 9. 관련 계산기·가이드 */}
              <section aria-label="관련 계산기·가이드" className="card">
                <h2 className="mb-4 text-2xl font-semibold">관련 계산기·가이드</h2>
                <ul className="space-y-2 text-text-secondary">
                  <li>→ <Link href="/calculator/n-jobber-insurance/" className="text-primary-600 underline dark:text-primary-500">N잡 건강보험료 계산기</Link> — 지역가입자 보험료 시뮬</li>
                  <li>→ <Link href="/calculator/freelancer-tax/" className="text-primary-600 underline dark:text-primary-500">프리랜서 종합소득세 계산기</Link> — 사업소득 신고</li>
                  <li>→ <Link href="/calculator/salary/" className="text-primary-600 underline dark:text-primary-500">연봉 실수령액 계산기</Link> — 직장 급여 + 부업 시뮬</li>
                  <li>→ <Link href="/guide/may-comprehensive-income-tax/" className="text-primary-600 underline dark:text-primary-500">5월 종합소득세 신고 가이드</Link> — 부업 소득 신고</li>
                </ul>
              </section>

              <ShareButtons title="N잡 건강보험 피부양자 탈락 기준 완벽 정리 2026" url={URL} description="소득·재산·관계 3대 기준 + 사업자등록 자동 탈락 + 재취득 절차." />

              {/* 출처·면책 */}
              <section
                aria-label="출처 및 면책"
                className="rounded-lg border border-border-base p-4 text-caption text-text-tertiary"
              >
                <p className="mb-2">
                  <strong>법적 근거</strong>: 국민건강보험법 §5 (가입자 범위) · §6 (피부양자 범위) · §72 (보험료 부과) · §72의2 (피부양자 인정 기준 위임) · 시행령 §2 (피부양자 자격 인정 기준 — 소득·재산) · 시행규칙 §2의2 (소득 산정 세부). 참고: <a href="https://www.nhis.or.kr" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-600 underline dark:text-primary-500">국민건강보험공단</a> (1577-1000), <a href="https://www.gov.kr" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-600 underline dark:text-primary-500">정부24</a>, <a href="https://www.law.go.kr" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-600 underline dark:text-primary-500">법령정보센터</a>.
                </p>
                <p className="mb-2">
                  <strong>면책조항</strong>: 본 가이드는 일반 정보 제공 목적이며 세무·보험 조언이 아닙니다. 피부양자 자격은 개인 사정(상속·증여 병행, 임대사업, 해외 거주 등)에 따라 적용이 달라지므로 반드시 국민건강보험공단(1577-1000) 또는 세무 전문가와 상담 후 결정하시기 바랍니다. 보험료 정확한 산정은 공단 모의계산 시스템에서 확인 가능.
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
