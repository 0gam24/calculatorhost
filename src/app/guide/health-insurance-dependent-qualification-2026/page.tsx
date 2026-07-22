import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { Footer } from '@/components/layout/Footer';
import { GuideHeader } from '@/components/guide/GuideHeader';
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

const URL = 'https://calculatorhost.com/guide/health-insurance-dependent-qualification-2026/';
const DATE_PUBLISHED = '2026-06-15';
const DATE_MODIFIED = '2026-06-15';

export const metadata: Metadata = {
  title: '건강보험 피부양자 자격조건 2026 | 소득·재산 요건 총정리 | calculatorhost',
  description:
    '2026년 건강보험 피부양자 자격은 소득요건과 재산요건을 모두 충족해야 인정됩니다. 합산소득 2,000만원 기준, 재산세 과세표준 5억 4천만원 한도, 형제자매 범위, 탈락 시 지역가입자 전환까지 국민건강보험공단 기준으로 정리했습니다.',
  keywords: [
    '건강보험 피부양자 조건',
    '피부양자 자격',
    '피부양자 소득기준',
    '피부양자 재산기준',
    '전업주부 건강보험',
    '피부양자 탈락',
    '국민건강보험법 시행규칙',
    '지역가입자 전환',
    '2026 피부양자',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '건강보험 피부양자 자격조건 2026' }],
    title: '건강보험 피부양자 자격조건 2026 | 소득·재산 요건 총정리',
    description: '합산소득 2,000만원, 재산세 과세표준 5억 4천만원 — 피부양자 자격 판단 기준.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '건강보험 피부양자 자격조건 2026',
    description: '소득 2,000만원 + 재산 5.4억 = 피부양자 기본 자격.',
  },
};

const FAQ_ITEMS = [
  {
    question: '피부양자란 정확히 누구인가요?',
    answer:
      '직장가입자(직장인)의 배우자·직계존비속(부모·자녀)·형제자매 중에서 소득과 재산 요건을 모두 충족하는 가족입니다. 보험료를 본인이 내지 않고 직장가입자의 보험료에 포함되어 혜택을 받습니다(국민건강보험법 §5·시행규칙 §2).',
  },
  {
    question: '형제자매도 피부양자가 될 수 있나요?',
    answer:
      '조건부입니다. 형제자매는 만 30세 미만 또는 만 65세 이상일 때만 피부양자로 인정됩니다. 30~64세 형제자매는 경제활동이 가능하다고 판단되어 소득·재산 요건을 충족해도 자격이 없습니다(시행규칙 §2①④).',
  },
  {
    question: '연 소득 2,000만원을 1원만 초과해도 탈락하나요?',
    answer:
      '네, 연 합산소득이 2,000만원을 초과하면 자격이 상실됩니다. 공단은 전년도 세금신고 소득을 기준으로 매년 11월 정기 재산정하므로, 2,000만원을 넘으면 다음 11월에 탈락 통보를 받을 가능성이 큽니다.',
  },
  {
    question: '사업자등록 없는 프리랜서는 소득 한도가 다른가요?',
    answer:
      '네, 다릅니다. 사업자등록이 없는 프리랜서·부업자는 사업소득이 연 500만원을 초과하면 탈락합니다(시행규칙 §2②). 근로소득은 2,000만원 한도지만 사업소득은 500만원 한도로 더 엄격합니다.',
  },
  {
    question: '재산이 5억 4천만원을 조금 초과하면 무조건 탈락인가요?',
    answer:
      '5억 4천만원~9억원 사이라면 조건부입니다. 이 구간에서 연소득이 1,000만원 이하면 피부양자 자격을 유지할 수 있습니다. 다만 9억원을 초과하면 소득과 무관하게 즉시 탈락합니다(시행규칙 §2①②).',
  },
  {
    question: '부부가 모두 피부양자 자격을 만족하면 둘 다 등재되나요?',
    answer:
      '네, 부부 각각이 별도 자격 심사를 받아 모두 기준을 충족하면 둘 다 피부양자로 등재됩니다. 다만 부부 중 한 명의 소득·재산이 초과하면 그 사람만 탈락하고, 다른 한 명은 계속 피부양자 자격을 유지할 수 있습니다.',
  },
  {
    question: '피부양자 탈락 후 지역가입자 보험료는 얼마나 되나요?',
    answer:
      '소득·재산을 종합 계산하므로 개인별 큰 차이가 있습니다. 일반적으로 연소득 2,000~3,000만원이면 월 15~25만원, 3,000~5,000만원이면 월 25~40만원 수준입니다. 정확한 계산은 공단 홈페이지나 "건강보험25시" 앱의 모의계산기 이용을 권장합니다.',
  },
];

export default function HealthInsuranceDependentQualificationGuide() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '건강보험 피부양자 자격조건' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '건강보험 피부양자 자격조건 2026 | 소득·재산 요건 총정리',
    description:
      '직장인 부모의 자녀·배우자·형제자매가 피부양자로 인정되는 정확한 기준. 소득 2,000만원 한도, 재산세 과세표준 5.4억원 기준, 형제자매 나이 제한, 탈락 시 지역가입자 전환.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: 'calculatorhost',
    authorUrl: 'https://calculatorhost.com/about/',
    type: 'Article',
    keywords: ['피부양자', '건강보험', '자격기준', '소득기준', '재산기준', '2026'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '건강보험 피부양자 자격조건 2026',
    description: '소득·재산 요건으로 피부양자 자격 판단 — 2,000만원 기준, 5.4억원 한도, 국민건강보험법 시행규칙 §2',
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
              <GuideHeader
                breadcrumbItems={[
                  { name: '홈', href: '/' },
                  { name: '가이드', href: '/guide/' },
                  { name: '보험·연금', href: '/guide/' },
                ]}
                category="보험·연금"
                readingMinutes={7}
                publishedDate="2026-06-15"
                title="건강보험 피부양자 자격조건 2026"
                subtitle="— 소득·재산 요건 총정리"
                lead={
                  <p data-speakable>
                    건강보험 피부양자는 직장가입자에게 생계를 의존하면서 소득·재산 요건을 모두 충족하는 가족으로, 국민건강보험법 시행규칙 §2에서 정한 기준을 따릅니다. 요건을 벗어나면 지역가입자로 전환되어 월 15~40만원의 보험료가 새로 부과됩니다.
                  </p>
                }
              />

              <AdSlot slot="guide-health-dependent-top" format="horizontal" />

              {/* 1. 피부양자 정의 및 기본 요건 */}
              <section aria-label="피부양자 정의" className="space-y-4">
                <h2 className="text-2xl font-semibold">1⃣ 피부양자란? — 정의와 기본 요건</h2>
                <div className="bg-bg-card rounded-lg border border-border-base p-4">
                  <p className="text-sm font-semibold text-text-primary">정의</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    직장가입자(직장인)의 배우자·직계존비속·형제자매 중에서 소득과 재산 요건을 동시에 충족하는 가족 구성원입니다. 보험료를 직장가입자가 대납하므로, 본인 부담 보험료가 없습니다(국민건강보험법 §5·시행규칙 §2①).
                  </p>
                </div>
                <div className="overflow-x-auto" data-speakable>
                  <table className="w-full border-collapse text-sm">
                    <caption className="mb-3 text-xs font-semibold text-text-secondary text-left">피부양자 자격 기본 조건 (3가지 동시 만족 필수)</caption>
                    <thead>
                      <tr className="border-b-2 border-border-base">
                        <th scope="col" className="py-2 pr-4 text-left font-semibold">항목</th>
                        <th scope="col" className="py-2 text-left font-semibold">기준</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="py-2 pr-4 font-semibold text-text-primary">① 부양 관계</td>
                        <td className="py-2">배우자·직계존비속(부모/자녀)·형제자매 (§5)</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="py-2 pr-4 font-semibold text-text-primary">② 소득 기준</td>
                        <td className="py-2">연간 합산소득 2,000만원 이하</td>
                      </tr>
                      <tr>
                        <td className="py-2 pr-4 font-semibold text-text-primary">③ 재산 기준</td>
                        <td className="py-2">재산세 과세표준 5억 4,000만원 이하 (조건부 9억)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-sm text-text-tertiary">
                  <strong>다만</strong> 3가지 중 하나라도 초과하면 즉시 자격 상실. 공단은 매년 11월을 기준으로 전년도 소득·재산을 정기 재산정하여 자동 심사합니다.
                </p>
              </section>

              {/* 2. 소득 요건 상세 */}
              <section aria-label="소득 요건" className="space-y-4">
                <h2 className="text-2xl font-semibold">2⃣ 소득 요건 — 연 2,000만원 기본, 프리랜서 500만원</h2>
                <div className="bg-bg-card rounded-lg border border-border-base p-4">
                  <p className="text-sm font-semibold text-text-primary">핵심 기준</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    근로소득·사업소득·연금소득·이자·배당금 등 <strong>모든 소득을 합산했을 때 연 2,000만원을 초과하면 탈락</strong>(시행규칙 §2①). 1원만 초과해도 기준 불만족입니다.
                  </p>
                </div>

                <h3 className="text-lg font-semibold">합산 대상 소득 (2,000만원 한도)</h3>
                <ul className="space-y-2 text-sm text-text-secondary">
                  <li>
                    <strong>근로소득</strong>: 직장 급여, 일시적 근로소득
                  </li>
                  <li>
                    <strong>사업소득</strong>: 프리랜서 수입, 임대료 (월세·보증금 이자)
                  </li>
                  <li>
                    <strong>연금소득</strong>: 국민연금·공무원연금·사립학교교직원연금 등 (단, 개인연금은 제외)
                  </li>
                  <li>
                    <strong>이자·배당금</strong>: 연 1,000만원 이상인 경우에만 합산
                  </li>
                  <li>
                    <strong>기타 소득</strong>: 간주임대료, 양도소득(주식 제외) 등
                  </li>
                </ul>

                <div className="bg-primary-50 dark:bg-primary-900/10 rounded-lg border border-primary-200 dark:border-primary-800 p-4">
                  <h4 className="font-semibold text-sm mb-2">사업자등록 보유 여부에 따른 차등 기준</h4>
                  <div className="space-y-2 text-sm text-text-secondary">
                    <div>
                      <p className="font-semibold text-text-primary">사업자등록 있음</p>
                      <p className="mt-1">사업소득이 1원이라도 발생하면 <strong>즉시 탈락</strong>. 합산소득 2,000만원 기준이 적용되지 않습니다(국민건강보험법 §5의2, 시행령 §2). 매출은 0이어도 사업소득이 발생하는 순간 자격 상실.</p>
                    </div>
                    <div>
                      <p className="font-semibold text-text-primary">사업자등록 없음 (프리랜서)</p>
                      <p className="mt-1">사업소득 합산이 <strong>500만원 초과</strong>하면 탈락(시행규칙 §2②). 근로소득은 2,000만원 한도이지만 사업소득은 500만원 한도로 더 엄격합니다. 예: 근로소득 1,900만원 + 사업소득 200만원 = 합격.</p>
                    </div>
                  </div>
                </div>

                <p className="text-sm text-text-tertiary">
                  <strong>예외</strong>: 사적 연금(퇴직금, 개인연금보험 수령금)은 소득에 포함되지 않습니다. 국민연금은 포함되므로 월 170만원(연 2,040만원)을 받으면 2,000만원 한도를 초과합니다.
                </p>
              </section>

              {/* 3. 재산 요건 상세 */}
              <section aria-label="재산 요건" className="space-y-4">
                <h2 className="text-2xl font-semibold">3⃣ 재산 요건 — 과세표준 5.4억원 / 조건부 9억</h2>
                <div className="bg-bg-card rounded-lg border border-border-base p-4">
                  <p className="text-sm font-semibold text-text-primary">핵심 기준</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    재산은 <strong>재산세 과세표준</strong>으로 판단합니다. 실제 시장가(중개가)가 아닌 정부 공시가격을 바탕으로 산정된 과세표준이 기준입니다.
                  </p>
                </div>

                <div className="overflow-x-auto" data-speakable>
                  <table className="w-full border-collapse text-sm">
                    <caption className="mb-3 text-xs font-semibold text-text-secondary text-left">재산 규모별 자격 판정</caption>
                    <thead>
                      <tr className="border-b-2 border-border-base">
                        <th scope="col" className="py-2 pr-4 text-left font-semibold">재산세 과세표준</th>
                        <th scope="col" className="py-2 text-left font-semibold">자격 판정</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="py-2 pr-4 font-semibold text-text-primary">5억 4,000만원 이하</td>
                        <td className="py-2">소득 요건 충족 시 자격 유지</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="py-2 pr-4 font-semibold text-text-primary">5.4억 초과 ~ 9억 미만</td>
                        <td className="py-2">주의: 연소득 1,000만원 이하일 때만 유지</td>
                      </tr>
                      <tr>
                        <td className="py-2 pr-4 font-semibold text-text-primary">9억원 초과</td>
                        <td className="py-2">소득과 무관하게 즉시 탈락</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <h4 className="text-base font-semibold mt-4">재산 계산 예시</h4>
                <ul className="space-y-2 text-sm text-text-secondary">
                  <li>
                    <strong>주택</strong>: 공시지가 기준 80% × 0.6 (공정시장가액비율)
                  </li>
                  <li>
                    <strong>토지</strong>: 공시지가 기준 100% × 0.7
                  </li>
                  <li>
                    <strong>자동차</strong>: 취득세 과세표준 기준
                  </li>
                  <li>
                    <strong>예금·주식</strong>: 기준일 현가
                  </li>
                </ul>

                <p className="text-sm text-text-tertiary">
                  <strong>다만</strong> 부부 공동명의 재산은 합산됩니다. 배우자와 함께 피부양자 신청할 경우 두 사람의 재산을 모두 더하여 판정합니다.
                </p>
              </section>

              {/* 4. 형제자매 특수 규칙 */}
              <section aria-label="형제자매 규칙" className="space-y-4">
                <h2 className="text-2xl font-semibold">4⃣ 형제자매 범위 — 만 30세 미만 또는 65세 이상만</h2>
                <div className="bg-bg-card rounded-lg border border-border-base p-4">
                  <p className="text-sm font-semibold text-text-primary">형제자매 나이 제한</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    형·누나·언니·동생이 피부양자가 되려면 <strong>만 30세 미만 또는 만 65세 이상</strong>이어야 합니다(시행규칙 §2①④). 30~64세 형제자매는 소득·재산 요건을 충족해도 <strong>자격이 없습니다</strong>.
                  </p>
                </div>

                <div className="space-y-2 text-sm text-text-secondary">
                  <div>
                    <p className="font-semibold text-text-primary">30세 미만 형제자매</p>
                    <p className="mt-1">대학교 재학 중 또는 취업 전 형제자매가 피부양자 등록 가능. 29세 마지막 날까지만 자격 유지.</p>
                  </div>
                  <div>
                    <p className="font-semibold text-text-primary">65세 이상 형제자매</p>
                    <p className="mt-1">노령층 형제자매가 직장인 형제의 피부양자가 될 수 있습니다. 소득·재산 기준은 동일하게 적용.</p>
                  </div>
                  <div>
                    <p className="font-semibold text-text-primary">30~64세 형제자매</p>
                    <p className="mt-1">경제활동이 가능한 나이로 판단되어 자격이 없습니다. 예: 직장이 없어도 30~64세면 불가.</p>
                  </div>
                </div>
              </section>

              {/* 5. 탈락 기준 및 전환 */}
              <section aria-label="탈락 기준" className="space-y-4">
                <h2 className="text-2xl font-semibold">5⃣ 탈락 기준 — 언제 지역가입자로 바뀌나?</h2>
                <div className="bg-bg-card rounded-lg border border-border-base p-4">
                  <p className="text-sm font-semibold text-text-primary">탈락 시점</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    공단은 전년도 세무신고 소득·재산을 기준으로 <strong>매년 11월에 정기 재산정</strong>하여 자동 심사합니다. 탈락 판정 시 <strong>11월 중에 탈락 통보</strong>를 받으면 12월 1일부터 지역가입자로 전환됩니다.
                  </p>
                </div>

                <h4 className="text-base font-semibold">탈락 사유별 기준</h4>
                <ul className="space-y-2 text-sm text-text-secondary">
                  <li>
                    <strong>소득 초과</strong>: 연 합산소득 2,000만원 초과 (프리랜서 사업소득 500만원 초과)
                  </li>
                  <li>
                    <strong>재산 초과</strong>: 재산세 과세표준 5.4억원 초과 (9억원 초과는 소득 무관 탈락)
                  </li>
                  <li>
                    <strong>사업자등록</strong>: 사업자등록 후 사업소득 1원이라도 발생 시 즉시 탈락
                  </li>
                  <li>
                    <strong>부양관계 상실</strong>: 혼인·사망·이혼 등으로 직장가입자와 관계 끊김
                  </li>
                  <li>
                    <strong>주민등록 분리</strong>: 피부양자 신청 후 주민등록을 별도 분리한 경우
                  </li>
                </ul>

                <div className="bg-danger-50 dark:bg-danger-900/10 rounded-lg border border-danger-200 dark:border-danger-800 p-4 mt-4">
                  <p className="text-sm font-semibold text-danger-700 dark:text-danger-300">중요 — 지역가입자 전환 시 새로운 보험료 부과</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    피부양자에서 탈락하면 <strong>지역가입자</strong>로 전환되어 월 15~40만원의 보험료가 새로 부과됩니다. 보험료는 소득·재산을 종합 고려하여 산정되므로 개인별로 큰 차이가 발생합니다.
                  </p>
                </div>
              </section>

              <AdSlot slot="guide-health-dependent-mid" format="rectangle" />

              {/* FAQ */}
              <section aria-label="자주 묻는 질문">
                <FaqSection items={FAQ_ITEMS} />
              </section>

              {/* 내부 링크 */}
              <section aria-label="관련 페이지" className="space-y-4 border-t border-border-base pt-8">
                <h3 className="text-lg font-semibold">관련 계산기 및 가이드</h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <Link
                      href="/calculator/n-jobber-insurance/"
                      className="text-primary-500 hover:underline"
                    >
                      N잡러 건강보험 계산기 →
                    </Link>
                    <span className="text-text-secondary ml-2">부업 소득 추정 시 피부양자 탈락 여부 미리 확인</span>
                  </li>
                  <li>
                    <Link
                      href="/guide/n-jobber-insurance-dependent-disqualification/"
                      className="text-primary-500 hover:underline"
                    >
                      N잡러 피부양자 탈락 기준 →
                    </Link>
                    <span className="text-text-secondary ml-2">프리랜서·부업 특화된 탈락 함정 5가지</span>
                  </li>
                  <li>
                    <Link
                      href="/guide/health-insurance-premium-2026/"
                      className="text-primary-500 hover:underline"
                    >
                      2026 건강보험료 인상률 →
                    </Link>
                    <span className="text-text-secondary ml-2">지역가입자로 전환 시 예상 보험료 추정</span>
                  </li>
                  <li>
                    <Link
                      href="/guide/national-pension-premium-2026/"
                      className="text-primary-500 hover:underline"
                    >
                      국민연금 소득기준 2026 →
                    </Link>
                    <span className="text-text-secondary ml-2">국민연금 수령이 피부양자 소득 기준에 영향을 주는 방식</span>
                  </li>
                  <li>
                    <Link
                      href="/guide/basic-pension-2026/"
                      className="text-primary-500 hover:underline"
                    >
                      기초연금 수급자격 →
                    </Link>
                    <span className="text-text-secondary ml-2">65세 이상 형제자매가 피부양자가 되는 경우 기초연금 자격 확인</span>
                  </li>
                </ul>
              </section>

              {/* 면책조항 */}
              <div className="bg-bg-card rounded-lg border border-border-base p-4 text-xs text-text-tertiary">
                <p className="font-semibold text-text-secondary mb-2">면책조항 및 정보 출처</p>
                <ul className="space-y-1 list-inside list-disc">
                  <li>
                    본 가이드는 2026년 6월 15일 기준 국민건강보험공단 공식 기준(국민건강보험법 §5, 시행규칙 §2)을 참조합니다.
                  </li>
                  <li>
                    개별 사례는 소득 신고 방식·재산 구성·부양 관계에 따라 달라질 수 있으므로, 최종 판정은 국민건강보험공단(전화 1577-1000)에 문의하시기 바랍니다.
                  </li>
                  <li>
                    본 콘텐츠는 AI 보조 작성 후 운영자가 법적 검증을 거쳐 발행했습니다.
                  </li>
                  <li>
                    내용 오류 발견 시 <Link href="/contact/" className="text-primary-500 hover:underline">문의 페이지</Link>로 알려주세요.
                  </li>
                </ul>
              </div>

              <ShareButtons
                title="건강보험 피부양자 자격조건 2026 | 소득·재산 요건 총정리"
                description="직장인 부모 자녀·배우자·형제자매 피부양자 자격 정확하게 판단. 소득 2,000만원, 재산 5.4억원 기준."
                url={URL}
              />
            </article>
          </main>
        </div>
        <Footer />
      </div>
    </>
  );
}
