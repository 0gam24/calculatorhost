import type { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { Footer } from '@/components/layout/Footer';
import { AdSlot } from '@/components/ads/AdSlot';
import { StructuredSummary } from '@/components/calculator/StructuredSummary';
import { FaqSection } from '@/components/calculator/FaqSection';
import { RelatedCalculators } from '@/components/calculator/RelatedCalculators';
import { ShareButtons } from '@/components/calculator/ShareButtons';
import {
  buildSoftwareApplicationJsonLd,
  buildFaqPageJsonLd,
  buildBreadcrumbJsonLd,
  buildSpeakableJsonLd,
  buildWebPageJsonLd,
  buildHowToJsonLd,
} from '@/lib/seo/jsonld';
import { SalaryCalculator } from './SalaryCalculator';
import { Breadcrumb } from '@/components/layout/Breadcrumb';

const URL = 'https://calculatorhost.com/calculator/salary';

export const metadata: Metadata = {
  title: '연봉 실수령액 계산기 2026 — 4대보험·소득세 자동',
  description:
    '2026년 최신 소득세율과 4대보험 요율을 반영한 연봉 실수령액 계산기. 부양가족·자녀·비과세까지 반영해 월 실수령과 시급까지 즉시 확인. 회원가입 불필요.',
  alternates: { canonical: URL },
  openGraph: {
    title: '연봉 실수령액 계산기 2026',
    description: '2026년 최신 세율로 연봉 실수령액 즉시 계산',
    url: URL,
    type: 'website',
  },
};

const FAQ_ITEMS = [
  {
    question: '연봉 3000만 원의 월 실수령액은 얼마인가요?',
    answer:
      '부양가족 1인, 비과세 없음 기준 월 실수령액은 약 227만 원입니다. 세전 월급 250만 원에서 4대보험과 소득세·지방소득세가 공제됩니다. 비과세 식대 20만 원을 설정하면 실수령액이 약 5,000원 더 늘어납니다.',
  },
  {
    question: '연봉 5000만 원의 월 실수령액은 얼마인가요?',
    answer:
      '부양가족 1인, 비과세 없음 기준 월 실수령액은 약 350만 원입니다. 자녀 2인 공제를 반영하면 360만 원대까지 증가합니다. 계산기 상단의 부양가족·자녀 수를 조정해 본인 조건으로 확인하세요.',
  },
  {
    question: '4대보험은 어떻게 계산되나요?',
    answer:
      '2026년 기준 국민연금 4.5% · 건강보험 3.545% · 장기요양(건보료의 12.95%) · 고용보험 0.9%가 근로자 부담분으로 공제됩니다. 국민연금은 기준소득월액 상한 637만 원이 적용됩니다.',
  },
  {
    question: '비과세 식대 20만 원은 어떻게 적용되나요?',
    answer:
      '월 20만 원 이하의 식대는 소득세법상 비과세 근로소득으로 분류되어 과세표준과 4대보험 과세 기준에서 제외됩니다. 본 계산기의 "비과세 (월)" 항목에 200,000 을 입력하세요.',
  },
  {
    question: '부양가족·자녀 공제 기준은?',
    answer:
      '부양가족 1인당 기본공제 150만 원, 20세 이하 자녀는 자녀세액공제가 추가 적용됩니다. 1인 15만 원, 2인 20만 원, 3인째부터는 각 40만 원을 세액에서 직접 공제합니다.',
  },
  {
    question: '연봉에 퇴직금이 포함되면 어떻게 다른가요?',
    answer:
      '퇴직금 포함 연봉은 관행상 연봉을 13 등분하여 1/13 을 월급으로 간주합니다. 동일 연봉에서 별도 표기 대비 월 실수령액이 약 7.7% 낮아집니다. 근로계약서 문구를 확인하세요.',
  },
  {
    question: '연봉 협상 시 세후로 얼마를 고려해야 하나요?',
    answer:
      '세후 기준 월 30만 원 차이를 원한다면 세전 연봉 기준으로는 약 450~500만 원 추가 협상이 필요합니다. 연봉 구간이 높아질수록 누진세 때문에 세전 추가분 대비 세후 증가율이 둔화되므로, 실수령액 기준으로 협상 목표를 설정하는 것이 합리적입니다.',
  },
] as const;

const RELATED = [
  { href: '/calculator/severance', title: '퇴직금', description: 'DB·DC 퇴직금 예상' },
  { href: '/calculator/loan-limit', title: '대출한도 (DSR)', description: '연소득 기반 대출 가능액' },
  { href: '/calculator/freelancer-tax', title: '프리랜서 종합소득세', description: '경비율 반영' },
  { href: '/calculator/savings', title: '적금 이자', description: '월급 저축 계획' },
];

export default function SalaryPage() {
  const softwareLd = buildSoftwareApplicationJsonLd({
    name: '연봉 실수령액 계산기',
    description: '2026년 최신 소득세율과 4대보험 요율 반영',
    url: URL,
  });
  const webPageLd = buildWebPageJsonLd({
    name: '연봉 실수령액 계산기 2026',
    description: '2026년 최신 세율로 연봉 실수령액 즉시 계산',
    url: URL,
    datePublished: '2026-04-24',
    dateModified: '2026-04-27',
  });
  const howToLd = buildHowToJsonLd({
    name: '연봉 실수령액 계산기 사용 방법',
    description: '연봉을 입력하여 월 실수령액, 4대보험, 소득세를 계산하는 단계별 가이드',
    steps: [
      { name: '연봉 입력', text: '세전 연봉(또는 월급) 금액을 입력합니다.' },
      { name: '부양가족 설정', text: '본인을 포함한 부양가족 수와 20세 이하 자녀 수를 입력합니다.' },
      { name: '비과세 입력', text: '월 식대 등 비과세 근로소득이 있으면 입력합니다(선택).' },
      { name: '세금·보험료 자동계산', text: '2026년 기준 4대보험과 소득세·지방소득세가 자동 계산됩니다.' },
      { name: '결과 확인', text: '월 실수령액, 시급, 세금 상세내역을 확인합니다.' },
    ],
  });
  const faqLd = buildFaqPageJsonLd(FAQ_ITEMS.map((f) => ({ question: f.question, answer: f.answer })));
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '근로', url: 'https://calculatorhost.com/category/work' },
    { name: '연봉 실수령액' },
  ]);
  const speakableLd = buildSpeakableJsonLd(['[data-speakable]']);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableLd) }}
      />

      <div className="min-h-screen bg-bg-base">
        <Header />
        <div className="flex">
          <Sidebar />
          <main className="flex-1 px-4 py-8 md:px-8">
            <div className="mx-auto flex max-w-4xl flex-col gap-8">
              {/* H1 + 리드 */}
              <header>
                <Breadcrumb
                  items={[
                    { name: '홈', href: '/' },
                    { name: '근로', href: '/category/work/' },
                    { name: '연봉 실수령액' },
                  ]}
                />
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  연봉 실수령액 계산기 2026
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  2026년 최신 소득세율·4대보험 요율을 반영한 무료 연봉 실수령액 계산기입니다.
                  연봉·월급 입력 만으로 월 실수령액과 시급을 즉시 확인할 수 있으며, 부양가족·자녀·비과세까지
                  반영됩니다.
                </p>
              </header>

              {/* GEO/AEO Structured Summary */}
              <StructuredSummary
                definition="연봉 실수령액은 세전 연봉에서 국민연금·건강보험·장기요양·고용보험 등 4대보험과 근로소득세·지방소득세를 공제한 후 실제 수령하는 금액입니다."
                table={{
                  caption: '연봉별 월 실수령액 요약 (부양 1인 기준)',
                  headers: ['연봉 (세전)', '월 실수령 (대략)'],
                  rows: [
                    ['3,000만 원', '약 227만 원'],
                    ['4,000만 원', '약 293만 원'],
                    ['5,000만 원', '약 350만 원'],
                    ['7,000만 원', '약 472만 원'],
                    ['1억 원', '약 644만 원'],
                  ],
                }}
                tldr={[
                  '실수령액 = 세전 월급 − 4대보험 − 근로소득세 − 지방소득세',
                  '4대보험 합계는 월 소득의 약 9% 내외',
                  '연봉 1억 초과부터는 국민연금 상한(637만 원)이 적용됩니다',
                  '비과세 식대 월 20만 원 설정 시 실수령액이 소폭 증가',
                  '자녀 세액공제는 20세 이하 기준, 3인째부터 40만 원',
                ]}
              />

              <AdSlot slot="salary-top" format="horizontal" />

              {/* 계산기 */}
              <SalaryCalculator />

              {/* FAQ (중간 배치 - GEO 권장) */}
              <FaqSection items={[...FAQ_ITEMS]} />

              {/* 월급별 실수령액 빠른 조회표 — 검색 의도 직접 매칭 */}
              <section aria-label="월급별 실수령액 빠른 조회" className="card">
                <h2 className="mb-3 text-2xl font-semibold">월급별 실수령액 빠른 조회 (2026)</h2>
                <p className="mb-4 text-sm text-text-secondary">
                  자주 검색되는 세전 월급액의 실수령액 (부양가족 1인, 비과세 식대 미적용 기준).
                  자녀 공제·식대 비과세 적용 시 약 5~15만 원 더 늘어납니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <thead>
                      <tr className="bg-primary-500/10 border border-border-base">
                        <th className="px-4 py-3 text-right font-bold text-text-primary">세전 월급</th>
                        <th className="px-4 py-3 text-right font-bold text-text-primary">연봉 환산</th>
                        <th className="px-4 py-3 text-right font-bold text-text-primary">4대보험</th>
                        <th className="px-4 py-3 text-right font-bold text-text-primary">소득세+지방세</th>
                        <th className="px-4 py-3 text-right font-bold text-text-primary">월 실수령</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border border-border-base hover:bg-bg-card/50">
                        <td className="px-4 py-2 text-right tabular-nums">2,000,000원</td>
                        <td className="px-4 py-2 text-right tabular-nums text-text-tertiary">2,400만</td>
                        <td className="px-4 py-2 text-right tabular-nums">−180,000</td>
                        <td className="px-4 py-2 text-right tabular-nums">−10,500</td>
                        <td className="px-4 py-2 text-right font-bold text-primary-700 dark:text-primary-300 tabular-nums">약 1,810,000원</td>
                      </tr>
                      <tr className="border border-border-base hover:bg-bg-card/50">
                        <td className="px-4 py-2 text-right tabular-nums">2,500,000원</td>
                        <td className="px-4 py-2 text-right tabular-nums text-text-tertiary">3,000만</td>
                        <td className="px-4 py-2 text-right tabular-nums">−225,000</td>
                        <td className="px-4 py-2 text-right tabular-nums">−48,000</td>
                        <td className="px-4 py-2 text-right font-bold text-primary-700 dark:text-primary-300 tabular-nums">약 2,270,000원</td>
                      </tr>
                      <tr className="border border-border-base hover:bg-bg-card/50">
                        <td className="px-4 py-2 text-right tabular-nums">3,000,000원</td>
                        <td className="px-4 py-2 text-right tabular-nums text-text-tertiary">3,600만</td>
                        <td className="px-4 py-2 text-right tabular-nums">−270,000</td>
                        <td className="px-4 py-2 text-right tabular-nums">−85,000</td>
                        <td className="px-4 py-2 text-right font-bold text-primary-700 dark:text-primary-300 tabular-nums">약 2,690,000원</td>
                      </tr>
                      <tr className="border border-border-base hover:bg-bg-card/50">
                        <td className="px-4 py-2 text-right tabular-nums">3,300,000원</td>
                        <td className="px-4 py-2 text-right tabular-nums text-text-tertiary">3,960만</td>
                        <td className="px-4 py-2 text-right tabular-nums">−297,000</td>
                        <td className="px-4 py-2 text-right tabular-nums">−110,000</td>
                        <td className="px-4 py-2 text-right font-bold text-primary-700 dark:text-primary-300 tabular-nums">약 2,930,000원</td>
                      </tr>
                      <tr className="border border-border-base hover:bg-bg-card/50">
                        <td className="px-4 py-2 text-right tabular-nums">3,500,000원</td>
                        <td className="px-4 py-2 text-right tabular-nums text-text-tertiary">4,200만</td>
                        <td className="px-4 py-2 text-right tabular-nums">−315,000</td>
                        <td className="px-4 py-2 text-right tabular-nums">−135,000</td>
                        <td className="px-4 py-2 text-right font-bold text-primary-700 dark:text-primary-300 tabular-nums">약 3,090,000원</td>
                      </tr>
                      <tr className="border border-border-base hover:bg-bg-card/50">
                        <td className="px-4 py-2 text-right tabular-nums">4,000,000원</td>
                        <td className="px-4 py-2 text-right tabular-nums text-text-tertiary">4,800만</td>
                        <td className="px-4 py-2 text-right tabular-nums">−360,000</td>
                        <td className="px-4 py-2 text-right tabular-nums">−210,000</td>
                        <td className="px-4 py-2 text-right font-bold text-primary-700 dark:text-primary-300 tabular-nums">약 3,470,000원</td>
                      </tr>
                      <tr className="border border-border-base hover:bg-bg-card/50">
                        <td className="px-4 py-2 text-right tabular-nums">4,500,000원</td>
                        <td className="px-4 py-2 text-right tabular-nums text-text-tertiary">5,400만</td>
                        <td className="px-4 py-2 text-right tabular-nums">−405,000</td>
                        <td className="px-4 py-2 text-right tabular-nums">−290,000</td>
                        <td className="px-4 py-2 text-right font-bold text-primary-700 dark:text-primary-300 tabular-nums">약 3,860,000원</td>
                      </tr>
                      <tr className="border border-border-base hover:bg-bg-card/50">
                        <td className="px-4 py-2 text-right tabular-nums">5,000,000원</td>
                        <td className="px-4 py-2 text-right tabular-nums text-text-tertiary">6,000만</td>
                        <td className="px-4 py-2 text-right tabular-nums">−450,000</td>
                        <td className="px-4 py-2 text-right tabular-nums">−385,000</td>
                        <td className="px-4 py-2 text-right font-bold text-primary-700 dark:text-primary-300 tabular-nums">약 4,200,000원</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-3 text-xs text-text-tertiary">
                  * 위 표는 부양가족 1인·비과세 항목 미적용·근로소득공제 표준 적용 추정치입니다.
                  실제 본인 조건(부양가족, 자녀, 비과세 식대, 퇴직금 포함 여부)으로 정확한 실수령액을
                  확인하려면 위 계산기를 사용하세요.
                </p>
              </section>

              {/* 계산 공식 */}
              <section aria-label="계산 공식" className="card">
                <h2 className="mb-4 text-2xl font-semibold">계산 공식</h2>
                <ol className="space-y-3 text-sm leading-relaxed">
                  <li>
                    <strong>1. 월 소득(세전) 산출</strong>: 연봉 ÷ 12 (퇴직금 포함 시 ÷ 13).
                  </li>
                  <li>
                    <strong>2. 과세 대상 소득</strong>: 월 소득 − 비과세 항목(식대 등).
                  </li>
                  <li>
                    <strong>3. 4대보험 공제</strong>: 과세 대상 소득 × 각 요율. 국민연금은
                    기준소득월액 하한 40만 원, 상한 637만 원 적용.
                  </li>
                  <li>
                    <strong>4. 소득세</strong>: 연 과세표준에 8단계 누진세율(§소득세법 55조) 적용,
                    자녀세액공제 차감 후 월 환산.
                  </li>
                  <li>
                    <strong>5. 지방소득세</strong>: 소득세 × 10%.
                  </li>
                  <li>
                    <strong>6. 실수령액</strong>: 월 소득(세전) − 4대보험 − 근로소득세 −
                    지방소득세.
                  </li>
                </ol>
              </section>

              {/* 4대보험 상세 설명 */}
              <section aria-label="4대보험 상세" className="card">
                <h2 className="mb-4 text-2xl font-semibold">4대보험 요율 상세</h2>
                <p className="mb-4 text-text-secondary text-sm">
                  2026년 기준, 근로자가 부담하는 4대보험 요율은 다음과 같습니다(국민연금법·건강보험법·고용보험법):
                </p>
                <div className="overflow-x-auto mb-4">
                  <table className="w-full text-sm border-collapse">
                    <thead>
                      <tr className="bg-primary-500/10 border border-border-base">
                        <th className="px-3 py-2 text-left font-semibold">보험 종류</th>
                        <th className="px-3 py-2 text-center font-semibold">근로자 부담률</th>
                        <th className="px-3 py-2 text-left font-semibold">상한선</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border border-border-base">
                        <td className="px-3 py-2 text-text-secondary">국민연금</td>
                        <td className="px-3 py-2 text-center font-medium">4.5%</td>
                        <td className="px-3 py-2 text-text-secondary">기준소득월액 최고 637만원</td>
                      </tr>
                      <tr className="border border-border-base bg-bg-card/50">
                        <td className="px-3 py-2 text-text-secondary">건강보험</td>
                        <td className="px-3 py-2 text-center font-medium">3.545%</td>
                        <td className="px-3 py-2 text-text-secondary">상한선 없음</td>
                      </tr>
                      <tr className="border border-border-base">
                        <td className="px-3 py-2 text-text-secondary">장기요양보험</td>
                        <td className="px-3 py-2 text-center font-medium">건보료의 12.95%</td>
                        <td className="px-3 py-2 text-text-secondary">건강보험료 기준</td>
                      </tr>
                      <tr className="border border-border-base bg-bg-card/50">
                        <td className="px-3 py-2 text-text-secondary">고용보험</td>
                        <td className="px-3 py-2 text-center font-medium">0.9%</td>
                        <td className="px-3 py-2 text-text-secondary">상한선 없음</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-text-secondary text-sm">
                  <strong>예시:</strong> 월 소득 350만 원일 때, 4대보험 합계 공제액은 약 31.5만 원(9%)입니다.
                  연봉이 높아질수록 국민연금 상한으로 인해 전체 공제율이 하락합니다.
                </p>
              </section>

              {/* 연봉별 절세 팁 */}
              <section aria-label="절세 팁" className="card">
                <h2 className="mb-4 text-2xl font-semibold">연봉별 실수령액 최대화 팁</h2>
                <div className="space-y-4">
                  <div className="rounded-lg bg-bg-card p-4">
                    <h3 className="font-semibold text-primary-500 mb-2">비과세 식대 활용</h3>
                    <p className="text-sm text-text-secondary">
                      월 20만 원 이하의 식비·식사비는 소득세법 §12(1)에 따라 비과세입니다. 회사에 식대 지급을
                      요청하면 실수령액을 증가시킬 수 있습니다. 기숙사 숙식비(월 15만 원)도 비과세 대상입니다.
                    </p>
                  </div>
                  <div className="rounded-lg bg-bg-card p-4">
                    <h3 className="font-semibold text-secondary-500 mb-2">자녀 세액공제 확인</h3>
                    <p className="text-sm text-text-secondary">
                      20세 이하 자녀가 있으면 자녀 세액공제(1인 15만, 2인 20만, 3인째부터 40만 원)를 받을 수 있습니다.
                      부양가족 등록을 통해 기본공제(1인 150만 원)도 놓치지 마세요.
                    </p>
                  </div>
                  <div className="rounded-lg bg-bg-card p-4">
                    <h3 className="font-semibold text-highlight-500 mb-2">연말정산 활용</h3>
                    <p className="text-sm text-text-secondary">
                      의료비·교육비·기부금·주택담보대출 이자 등의 세액공제를 충분히 활용하면 환급금을 받을 수 있습니다.
                      올해 예상 급여 기준으로 계산기를 통해 미리 실수령액을 추정해두면 가계 계획이 용이합니다.
                    </p>
                  </div>
                  <div className="rounded-lg bg-bg-card p-4">
                    <h3 className="font-semibold text-danger-500 mb-2">연봉 협상 전략</h3>
                    <p className="text-sm text-text-secondary">
                      세전 기준이 아닌 세후 월 실수령액을 기준으로 협상하세요. 예를 들어 "월 400만 원(세후)"
                      목표라면 세전 연봉은 약 5,800~6,000만 원 수준이 필요합니다. 이 계산기를 활용해 상대방을
                      설득할 근거 자료를 만드세요.
                    </p>
                  </div>
                </div>
              </section>

              {/* 주의사항 */}
              <section aria-label="주의사항" className="card">
                <h2 className="mb-3 text-2xl font-semibold">주의사항</h2>
                <ul className="list-disc space-y-2 pl-5 text-sm text-text-secondary">
                  <li>
                    본 계산기의 소득세는 연 과세표준을 12등분한 근사치입니다. 실제 월 원천징수는 국세청 근로소득
                    간이세액표에 따라 소폭 다를 수 있으며, 연말정산으로 정산됩니다.
                  </li>
                  <li>건강보험료 및 장기요양요율은 매년 조정됩니다. 배포 시점 기준 2026년 요율.</li>
                  <li>연봉 1억 초과 시 국민연금 기준소득월액 상한이 자동 적용됩니다.</li>
                  <li>실제 급여명세서와는 회사의 비과세 운영 방식에 따라 차이가 있을 수 있습니다.</li>
                  <li>본 계산기는 정규 직원 기준이며, 일용직·프리랜서는 다른 세율 적용 대상입니다.</li>
                </ul>
              </section>

              {/* 관련 계산기 */}
              {/* 관련 가이드 CTA */}
              <section aria-label="관련 가이드" className="card border-l-4 border-l-primary-500 bg-primary-500/5">
                <h2 className="mb-2 text-xl font-semibold">📚 함께 보면 좋은 가이드</h2>
                <ul className="space-y-2 text-sm">
                  <li>
                    →{' '}
                    <a href="/guide/freelancer-salary-comparison/" className="text-primary-700 dark:text-primary-300 underline font-medium">
                      프리랜서 vs 일반직 실수령액 비교
                    </a>{' '}
                    — 같은 연봉이라도 다른 실수령. 4대보험·세금·경비 차이
                  </li>
                </ul>
              </section>

              <ShareButtons title="연봉 실수령액 계산기 (2026)" url="https://calculatorhost.com/calculator/salary/" />

              <RelatedCalculators items={RELATED} />

              {/* 업데이트 로그 */}
              <section aria-label="업데이트" className="card">
                <h2 className="mb-2 text-lg font-semibold">업데이트</h2>
                <ul className="text-sm text-text-secondary">
                  <li>2026-04-24: 2026년 소득세율·4대보험 요율 반영 초판 공개</li>
                </ul>
              </section>

              {/* 참고 자료 */}
              <section aria-label="참고 자료" className="card">
                <h2 className="mb-3 text-lg font-semibold">참고 자료 및 출처</h2>
                <ul className="space-y-2 text-sm text-text-secondary">
                  <li>
                    <a
                      href="https://www.hometax.go.kr"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary-600 underline dark:text-primary-500"
                    >
                      국세청 홈택스 — 근로소득 세액계산 및 간이세액표 조회
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.moef.go.kr"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary-600 underline dark:text-primary-500"
                    >
                      기획재정부 — 소득세법 개정사항 공시
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.bok.or.kr"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary-600 underline dark:text-primary-500"
                    >
                      한국은행 — 금리 정보 및 경제 지표
                    </a>
                  </li>
                </ul>
              </section>

              {/* 출처·면책 */}
              <section
                aria-label="출처 및 면책"
                className="rounded-lg border border-border-base p-4 text-caption text-text-tertiary"
              >
                <p className="mb-2">
                  <strong>법적 근거</strong>: 소득세법 §55, §59의2, 국민건강보험법, 국민연금법, 국세청
                  근로소득 간이세액표(2026).
                </p>
                <p>
                  본 계산기의 결과는 참고용이며 법적 효력이 없습니다. 실제 세무 처리는 세무사의 안내를
                  받으시기 바랍니다.
                </p>
              </section>

            </div>
          </main>
        </div>
        <Footer />
      </div>
    </>
  );
}
