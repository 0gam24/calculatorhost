import type { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { Footer } from '@/components/layout/Footer';
import { AdSlot } from '@/components/ads/AdSlot';
import { StructuredSummary } from '@/components/calculator/StructuredSummary';
import { FaqSection } from '@/components/calculator/FaqSection';
import { RelatedCalculators } from '@/components/calculator/RelatedCalculators';
import {
  buildSoftwareApplicationJsonLd,
  buildFaqPageJsonLd,
  buildBreadcrumbJsonLd,
  buildSpeakableJsonLd,
  buildWebPageJsonLd,
  buildHowToJsonLd,
} from '@/lib/seo/jsonld';
import { FreelancerCalculator } from './FreelancerCalculator';
import { Breadcrumb } from '@/components/layout/Breadcrumb';

const URL = 'https://calculatorhost.com/calculator/freelancer-tax';

export const metadata: Metadata = {
  title: '프리랜서 종합소득세 계산기 2026 | 3.3% 원천징수 | calculatorhost',
  description:
    '프리랜서·개인사업자 종합소득세를 2026년 최신 세율로 계산. 3.3% 원천징수, 단순경비율, 자녀세액공제, 최종 납부액·환급액을 한눈에 확인하는 무료 도구.',
  alternates: { canonical: URL },
  openGraph: {
    title: '프리랜서 종합소득세 계산기 2026',
    description: '프리랜서 소득에 따른 정확한 세금 계산. 5월 신고 전 확인하세요.',
    url: URL,
    type: 'website',
    images: [
      {
        url: 'https://calculatorhost.com/og-freelancer-tax.png',
        width: 1200,
        height: 630,
        alt: '프리랜서 종합소득세 계산기 - 환급액과 납부액 즉시 계산',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '프리랜서 종합소득세 계산기 2026 - 환급액·납부액 즉시 확인',
    description: '3.3% 원천징수, 단순경비율 적용 · 2026 최신 세율',
  },
};

const FAQ_ITEMS = [
  {
    question: '프리랜서가 내야 할 세금은 무엇인가요?',
    answer:
      '프리랜서(개인사업자)는 종합소득세를 내야 합니다. 사업소득(수입 - 경비)에 대해 누진세를 적용하며, 이에 따라 지방소득세도 함께 납부합니다. 또한 매달 소득에서 3.3% 원천징수가 선행되어 5월 종합소득세 신고 시 정산합니다.',
  },
  {
    question: '3.3% 원천징수는 무엇인가요?',
    answer:
      '3.3% 원천징수는 발주처가 프리랜서에게 금액을 지급할 때 미리 걷어가는 세금입니다. 이는 소득세법 §127에 따른 의무 원천징수이며, 사업소득 = 수입 - 경비로 계산된 실제 세금과 다를 수 있습니다. 5월 신고 시 차이를 정산합니다.',
  },
  {
    question: '단순경비율과 실제 경비는 무엇이 다른가요?',
    answer:
      '단순경비율은 업종별로 정해진 비율로 자동 계산하는 경비입니다. 예를 들어 인적용역은 64.1%입니다. 실제 경비는 영수증·통장을 기반으로 직접 계산한 경비입니다. 일반적으로 단순경비율을 사용하면 간편하지만, 실제 경비가 더 크면 실제 경비를 사용할 수 있습니다.',
  },
  {
    question: '수입 7,500만원을 초과하면 어떻게 되나요?',
    answer:
      '수입 7,500만원 초과 시는 간편장부가 아닌 복식부기 기장이 원칙이며, 단순경비율 적용이 제한됩니다. 또한 인적용역은 4,800만원 초과 시 기준경비율이 원칙입니다. 정확한 계산은 세무사나 홈택스 상담을 통해 확인하세요.',
  },
  {
    question: '자녀세액공제는 어떻게 받나요?',
    answer:
      '종합소득세법에 따라 20세 이하 자녀가 있으면 세액공제를 받을 수 있습니다. 첫 자녀 150만원, 둘째 자녀 200만원, 셋째 이상 각 400만원입니다. 본 계산기에 자녀 수를 입력하면 자동으로 적용됩니다.',
  },
  {
    question: '국민연금·건강보험 보험료는 공제되나요?',
    answer:
      '예, 국민연금과 건강보험료는 사회보험료공제로 과세표준을 낮춥니다. 지역가입자의 경우 본인이 납부한 금액을 입력하면 됩니다. 이를 통해 최종 세액을 절감할 수 있습니다.',
  },
  {
    question: '프리랜서가 환급받으려면 어떻게 해야 하나요?',
    answer:
      '환급받으려면 실제 세금(사업소득-경비에 따른 누진세)이 기납부 원천징수액(3.3%)보다 적어야 합니다. 경비율이 높거나 부양가족·자녀가 많으면 환급 가능성이 높습니다. 본 계산기에서 최종 정산액이 음수면 그 금액이 환급액입니다. 5월 종합소득세 신고 시 환급 신청서를 제출하면 약 2-3주 후 지정 계좌로 환급받습니다.',
  },
] as const;

const RELATED = [
  {
    href: '/calculator/salary',
    title: '연봉 실수령액',
    description: '근로자의 세후 월급 계산',
  },
  {
    href: '/calculator/severance',
    title: '퇴직금 계산',
    description: '퇴직금과 세금 계산',
  },
  {
    href: '/calculator/loan-limit',
    title: 'DSR 대출한도',
    description: '주담대 한도 계산',
  },
] as const;

export default function FreelancerTaxPage() {
  const softwareLd = buildSoftwareApplicationJsonLd({
    name: '프리랜서 종합소득세 계산기',
    description:
      '프리랜서 및 개인사업자를 위한 종합소득세 계산기. 3.3% 원천징수, 단순경비율, 자녀세액공제, 사회보험료 공제를 적용하여 2026년 최신 세율로 정확한 세금 계산.',
    url: URL,
  });
  const webPageLd = buildWebPageJsonLd({
    name: '프리랜서 종합소득세 계산기 2026',
    description: '프리랜서 소득에 따른 정확한 세금 계산. 5월 신고 전 확인하세요',
    url: URL,
    datePublished: '2026-04-24',
    dateModified: '2026-04-27',
  });
  const howToLd = buildHowToJsonLd({
    name: '프리랜서 종합소득세 계산기 사용 방법',
    description: '연수입, 경비, 원천징수액을 입력하여 종합소득세를 계산하는 단계별 가이드',
    steps: [
      { name: '연 수입 입력', text: '지난해(또는 올해 예상) 프리랜서 총 수입을 입력합니다.' },
      { name: '필요경비 입력', text: '단순경비율을 적용하거나, 실제 경비를 직접 입력합니다.' },
      { name: '원천징수 입력', text: '발주처에서 받은 3.3% 원천징수 총액을 입력합니다.' },
      { name: '자녀·보험료 공제 입력', text: '자녀세액공제, 국민연금·건강보험료를 입력합니다(선택).' },
      { name: '납부액·환급액 확인', text: '최종 납부액 또는 환급액을 확인합니다.' },
    ],
  });
  const faqLd = buildFaqPageJsonLd(
    FAQ_ITEMS.map((f) => ({ question: f.question, answer: f.answer }))
  );
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '세금', url: 'https://calculatorhost.com/category/tax' },
    { name: '프리랜서 종합소득세' },
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
                    { name: '세금', href: '/category/tax/' },
                    { name: '프리랜서 종합소득세' },
                  ]}
                />
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  프리랜서 종합소득세 계산기 2026
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  프리랜서와 개인사업자를 위한 종합소득세 계산 도구입니다. 3.3% 원천징수, 단순경비율,
                  자녀세액공제, 사회보험료 공제를 적용하여 2026년 최신 세율로 정확한 세금을 계산합니다.
                  회원가입 없이 무료로 이용할 수 있으며, 5월 종합소득세 신고 전 납부액과 환급액을
                  미리 확인하세요.
                </p>
              </header>

              {/* GEO/AEO Structured Summary */}
              <StructuredSummary
                definition="프리랜서 종합소득세는 프리랜서의 사업소득(수입 - 경비)에 대해 부과되는 누진세입니다. 3.3% 원천징수 후 5월 31일 소득세 신고 시 최종 정산하며, 과세표준에서 부양가족 공제와 사회보험료 공제를 뺀 후 8단계 누진세율을 적용합니다."
                table={{
                  caption: '종합소득세 8단계 누진 세율 (2026)',
                  headers: ['과세표준', '세율'],
                  rows: [
                    ['1,400만원 이하', '6% (누진공제: 0원)'],
                    ['5,000만원 이하', '15% (누진공제: 126만원)'],
                    ['8,800만원 이하', '24% (누진공제: 576만원)'],
                    ['1.5억원 이하', '35% (누진공제: 1,544만원)'],
                    ['3억원 이하', '38% (누진공제: 1,994만원)'],
                  ],
                }}
                tldr={[
                  '프리랜서는 종합소득세법에 따라 사업소득에 대해 누진세 적용',
                  '3.3% 원천징수는 의무 선행징수로 5월 신고 시 정산',
                  '단순경비율(기본 64.1%) 또는 실제 경비로 사업소득 계산',
                  '부양가족·자녀·사회보험료 공제로 세금 절감 가능',
                  '수입 7,500만원 초과 시 단순경비율 적용 제한, 세무사 상담 권장',
                ]}
              />

              <AdSlot slot="freelancer-tax-top" format="horizontal" />

              {/* 계산기 */}
              <FreelancerCalculator />

              {/* FAQ (중간 배치 - GEO 권장) */}
              <FaqSection items={[...FAQ_ITEMS]} />

              {/* 프리랜서 종합소득세란? */}
              <section aria-label="프리랜서 종합소득세 개념" className="card">
                <h2 className="mb-4 text-2xl font-semibold">프리랜서 종합소득세란?</h2>
                <p className="mb-4 text-text-secondary">
                  프리랜서 종합소득세는 개인이 사업을 통해 얻은 소득(사업소득)에 대해 부과되는
                  세금입니다. 소득세법 §55에 따라 누진세가 적용되며, 같은 소득액이라도 과세표준에
                  따라 세율이 달라집니다. 프리랜서·프로그래머·번역가·디자이너·강사·컨설턴트 등
                  다양한 직종의 자영업자가 대상입니다.
                </p>
                <p className="mb-4 text-text-secondary">
                  종합소득세는 매년 1월 1일부터 12월 31일까지의 수입을 기준으로 계산되며, 매해
                  5월 31일까지 국세청(홈택스)에 신고하고 납부합니다. 이때 발주처가 미리 걷어간
                  3.3% 원천징수액을 차감하여 최종 납부액 또는 환급액을 결정합니다.
                </p>
                <p className="text-text-secondary">
                  특히 단순경비율 적용 조건, 수입 규모, 업종코드, 기록 방식(간편장부·복식부기) 등에
                  따라 세금이 크게 달라질 수 있으므로, 본 계산기로 대략의 규모를 파악한 후 세무사나
                  국세청 홈택스 상담을 통해 정확한 신고를 권장합니다.
                </p>
              </section>

              {/* 3.3% 원천징수 메커니즘 */}
              <section aria-label="3.3% 원천징수" className="card">
                <h2 className="mb-4 text-2xl font-semibold">3.3% 원천징수는 무엇인가요?</h2>
                <p className="mb-4 text-text-secondary">
                  3.3% 원천징수는 소득세법 §127·§129에 따른 의무 선행징수입니다. 발주처(용역비
                  지급처)가 프리랜서에게 금액을 지급할 때, 세금의 일부를 미리 걷어서 국세청에
                  납부하는 제도입니다.
                </p>

                <div className="mb-6 rounded-lg bg-bg-card p-4">
                  <h3 className="font-semibold text-text-primary mb-3">계산 예시</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>계약금(수입)</span>
                      <span className="font-medium">100,000,000원</span>
                    </div>
                    <div className="flex justify-between">
                      <span>원천징수 (3.3%)</span>
                      <span className="font-medium text-danger-500">-3,300,000원</span>
                    </div>
                    <div className="border-t border-border-base pt-2 flex justify-between font-medium">
                      <span>실제 입금액</span>
                      <span>96,700,000원</span>
                    </div>
                  </div>
                </div>

                <p className="mb-4 text-text-secondary">
                  원천징수된 금액은 세금이지만, 실제 계산된 최종 세금(사업소득 - 경비에 따른
                  과세표준의 종합소득세 + 지방소득세)과 다를 수 있습니다. 예를 들어:
                </p>

                <ul className="space-y-2 text-sm text-text-secondary">
                  <li>
                    • <strong>환급 경우</strong>: 경비율이 높거나 부양가족·자녀가 많으면, 원천징수액이
                    최종 세금보다 많아 환급받을 수 있습니다.
                  </li>
                  <li>
                    • <strong>추가납부 경우</strong>: 과세표준이 높아지면 최종 세금이 원천징수액보다
                    많아 5월 신고 시 추가로 납부합니다.
                  </li>
                </ul>

                <p className="mt-4 text-xs text-text-tertiary">
                  원천징수는 세금 선납 제도일 뿐, 최종 세금이 아닙니다. 반드시 5월 종합소득세 신고를
                  통해 정산하세요.
                </p>
              </section>

              {/* 단순경비율 vs 기준경비율 vs 복식부기 */}
              <section aria-label="경비 산정 방식" className="card">
                <h2 className="mb-4 text-2xl font-semibold">
                  단순경비율 vs 기준경비율 vs 복식부기
                </h2>
                <p className="mb-6 text-text-secondary">
                  프리랜서의 사업소득 = 수입 - 경비입니다. 경비를 계산하는 방식은 3가지가 있으며,
                  수입 규모와 기록 능력에 따라 선택할 수 있습니다.
                </p>

                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="px-3 py-2 text-left font-semibold">
                          구분
                        </th>
                        <th scope="col" className="px-3 py-2 text-left font-semibold">
                          특징
                        </th>
                        <th scope="col" className="px-3 py-2 text-left font-semibold">
                          적용 수입 상한
                        </th>
                        <th scope="col" className="px-3 py-2 text-left font-semibold">
                          예시 (인적용역)
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-subtle">
                        <td className="px-3 py-2 font-semibold text-text-primary">단순경비율</td>
                        <td className="px-3 py-2 text-text-secondary">
                          업종별 정해진 비율로 자동 계산. 영수증 불필요. 가장 간편.
                        </td>
                        <td className="px-3 py-2 text-text-secondary">4,800만원 이하</td>
                        <td className="px-3 py-2 text-text-secondary">수입 1억 × 64.1% = 경비 6,410만</td>
                      </tr>
                      <tr className="border-b border-border-subtle">
                        <td className="px-3 py-2 font-semibold text-text-primary">기준경비율</td>
                        <td className="px-3 py-2 text-text-secondary">
                          단순경비율보다 낮은 비율. 실제 경비가 많으면 장부 제출로 차이 인정 가능.
                        </td>
                        <td className="px-3 py-2 text-text-secondary">
                          4,800만~7,500만원
                        </td>
                        <td className="px-3 py-2 text-text-secondary">
                          수입 5,000만 × 52% = 경비 2,600만
                        </td>
                      </tr>
                      <tr>
                        <td className="px-3 py-2 font-semibold text-text-primary">복식부기</td>
                        <td className="px-3 py-2 text-text-secondary">
                          전표·통장 전체 기록. 실제 경비를 정확히 계산. 가장 복잡. 세무사 필요.
                        </td>
                        <td className="px-3 py-2 text-text-secondary">
                          7,500만원 초과 (의무)
                        </td>
                        <td className="px-3 py-2 text-text-secondary">
                          영수증·통장 기록으로 실제 경비 산출
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="mt-6 rounded-lg border border-highlight-500/30 bg-highlight-500/5 p-4">
                  <p className="text-sm text-text-secondary">
                    <strong>주의:</strong> 수입 규모와 영수증 보유 상태에 따라 국세청에서 세무 조사 시
                    적용 기준이 달라질 수 있습니다. 정확한 판단은 세무사와 상담하세요.
                  </p>
                </div>
              </section>

              {/* 업종별 단순경비율 참고표 */}
              <section aria-label="업종별 단순경비율" className="card">
                <h2 className="mb-4 text-2xl font-semibold">업종별 단순경비율 참고표</h2>
                <p className="mb-4 text-text-secondary">
                  다음은 대표적인 프리랜서 업종의 단순경비율입니다. 정확한 업종코드는 국세청 홈택스에서
                  확인하세요. (상세 업종코드는 총 100개 이상 존재)
                </p>

                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="px-3 py-2 text-left font-semibold">
                          업종
                        </th>
                        <th scope="col" className="px-3 py-2 text-center font-semibold">
                          업종코드
                        </th>
                        <th scope="col" className="px-3 py-2 text-center font-semibold">
                          단순경비율 (%)
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-subtle">
                        <td className="px-3 py-2">인적용역(프리랜서)</td>
                        <td className="px-3 py-2 text-center">94</td>
                        <td className="px-3 py-2 text-center font-medium">64.1</td>
                      </tr>
                      <tr className="border-b border-border-subtle">
                        <td className="px-3 py-2">컨설팅</td>
                        <td className="px-3 py-2 text-center">73</td>
                        <td className="px-3 py-2 text-center">70.2</td>
                      </tr>
                      <tr className="border-b border-border-subtle">
                        <td className="px-3 py-2">소프트웨어 개발</td>
                        <td className="px-3 py-2 text-center">62</td>
                        <td className="px-3 py-2 text-center">66.6</td>
                      </tr>
                      <tr className="border-b border-border-subtle">
                        <td className="px-3 py-2">디지털콘텐츠 제작</td>
                        <td className="px-3 py-2 text-center">72</td>
                        <td className="px-3 py-2 text-center">66.0</td>
                      </tr>
                      <tr className="border-b border-border-subtle">
                        <td className="px-3 py-2">학원 및 교육 강사</td>
                        <td className="px-3 py-2 text-center">85</td>
                        <td className="px-3 py-2 text-center">58.0</td>
                      </tr>
                      <tr className="border-b border-border-subtle">
                        <td className="px-3 py-2">번역</td>
                        <td className="px-3 py-2 text-center">71</td>
                        <td className="px-3 py-2 text-center">71.1</td>
                      </tr>
                      <tr className="border-b border-border-subtle">
                        <td className="px-3 py-2">디자인(그래픽·웹)</td>
                        <td className="px-3 py-2 text-center">72</td>
                        <td className="px-3 py-2 text-center">66.0</td>
                      </tr>
                      <tr>
                        <td className="px-3 py-2">사진촬영 및 서비스</td>
                        <td className="px-3 py-2 text-center">92</td>
                        <td className="px-3 py-2 text-center">65.0</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <p className="mt-4 text-xs text-text-tertiary">
                  <strong>출처:</strong> 소득세법 시행령 §143 (단순경비율 고시). 더 많은 업종 및
                  정확한 수치는 국세청 홈택스 또는 세무사와 상담하세요.
                </p>
              </section>

              {/* 주의사항 */}
              <section aria-label="주의사항" className="card">
                <h2 className="mb-4 text-2xl font-semibold">프리랜서 종합소득세 주의사항</h2>

                <div className="space-y-4">
                  <div className="rounded-lg border border-border-base bg-bg-card p-4">
                    <h3 className="font-semibold text-text-primary mb-2">
                      1. 업종코드는 정확하게
                    </h3>
                    <p className="text-sm text-text-secondary">
                      같은 "프리랜서"라도 구체적인 업무 내용에 따라 업종코드가 달라집니다. 예를 들어
                      "IT 개발"과 "학원 강사"는 다른 단순경비율이 적용됩니다. 홈택스 신고 시 업종코드를
                      정확히 선택해야 합니다.
                    </p>
                  </div>

                  <div className="rounded-lg border border-border-base bg-bg-card p-4">
                    <h3 className="font-semibold text-text-primary mb-2">
                      2. 수입 규모에 따른 제약
                    </h3>
                    <p className="text-sm text-text-secondary">
                      • 수입 4,800만원 초과(인적용역 기준): 기준경비율 적용 가능, 기납부 원천징수액이
                      높음
                      <br />
                      • 수입 7,500만원 초과: 간편장부 대신 복식부기 기장 필수. 세무사 도움 강력 권장.
                    </p>
                  </div>

                  <div className="rounded-lg border border-border-base bg-bg-card p-4">
                    <h3 className="font-semibold text-text-primary mb-2">
                      3. 부양가족 공제 조건
                    </h3>
                    <p className="text-sm text-text-secondary">
                      인적공제(1인당 150만원)는 기본공제입니다. 본인 포함 부양가족에 대해 적용되지만,
                      배우자와 자녀의 소득 요건 등이 있으므로 자세한 내용은 국세청 상담을 받으세요.
                    </p>
                  </div>

                  <div className="rounded-lg border border-border-base bg-bg-card p-4">
                    <h3 className="font-semibold text-text-primary mb-2">
                      4. 사회보험료 공제
                    </h3>
                    <p className="text-sm text-text-secondary">
                      지역가입자(프리랜서)의 국민연금·건강보험료는 사회보험료공제로 과세표준을 낮춥니다.
                      피부양자 요건이나 소득 제한 등 세부 조건이 있으므로, 납부한 금액을 정확히 입력하세요.
                    </p>
                  </div>

                  <div className="rounded-lg border border-border-base bg-bg-card p-4">
                    <h3 className="font-semibold text-text-primary mb-2">
                      5. 호출처(원천징수의무자) 확인
                    </h3>
                    <p className="text-sm text-text-secondary">
                      모든 발주처가 원천징수를 하는 것은 아닙니다. 현금 거래나 소규모 계약은 3.3%를
                      안 뺄 수 있으므로, 본인이 실제로 받은 금액 기준으로 계산해야 합니다.
                    </p>
                  </div>

                  <div className="rounded-lg border border-border-base bg-bg-card p-4">
                    <h3 className="font-semibold text-text-primary mb-2">
                      6. 5월 신고 기한 준수
                    </h3>
                    <p className="text-sm text-text-secondary">
                      종합소득세 신고 기한은 매해 5월 31일입니다. 지연 시 가산세 및 지연이자가
                      부과됩니다. 온라인 신고(홈택스)는 편리하지만, 복잡한 경우 세무사 신고를 권장합니다.
                    </p>
                  </div>
                </div>

                <p className="mt-6 text-sm text-text-secondary border-t border-border-subtle pt-4">
                  <strong>면책:</strong> 본 계산기의 결과는 참고용입니다. 정확한 세금 계산은 국세청
                  홈택스 간편신고 또는 세무사 상담을 통해 이루어져야 합니다. 개인의 상황(주택 보유,
                  이전 연도 이월 손실, 특수 공제 등)에 따라 세금이 다를 수 있으므로, 반드시 전문가
                  검토를 거치세요.
                </p>
              </section>

              {/* 환급 vs 추가납부 시나리오 */}
              <section aria-label="환급·추가납부 시나리오" className="card">
                <h2 className="mb-4 text-2xl font-semibold">환급 vs 추가납부 시나리오</h2>
                <p className="mb-6 text-text-secondary">
                  같은 3.3% 원천징수를 받아도, 경비율, 부양가족, 자녀 수에 따라 최종 정산액이 달라집니다.
                </p>

                <div className="space-y-4">
                  <div className="rounded-lg border border-green-500/30 bg-green-500/5 p-4">
                    <h3 className="font-semibold text-green-600 dark:text-green-400 mb-3">
                      시나리오 1: 환급 (경비율 높음)
                    </h3>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span>수입</span>
                        <span className="font-medium">50,000,000원</span>
                      </div>
                      <div className="flex justify-between">
                        <span>경비 (64.1%)</span>
                        <span className="font-medium">-32,050,000원</span>
                      </div>
                      <div className="flex justify-between border-t border-green-500/30 pt-1">
                        <span>사업소득</span>
                        <span className="font-medium">17,950,000원</span>
                      </div>
                      <div className="flex justify-between">
                        <span>인적공제 (1인)</span>
                        <span className="font-medium">-1,500,000원</span>
                      </div>
                      <div className="flex justify-between border-t border-green-500/30 pt-1">
                        <span>과세표준</span>
                        <span className="font-medium">16,450,000원</span>
                      </div>
                      <div className="flex justify-between">
                        <span>산출세액 (15%)</span>
                        <span className="font-medium">1,793,400원</span>
                      </div>
                      <div className="flex justify-between">
                        <span>지방소득세 (10%)</span>
                        <span className="font-medium">179,340원</span>
                      </div>
                      <div className="flex justify-between border-t border-green-500/30 pt-1">
                        <span>총 세금</span>
                        <span className="font-medium">1,972,740원</span>
                      </div>
                      <div className="flex justify-between">
                        <span>원천징수 (3.3%)</span>
                        <span className="font-medium text-red-500">-1,650,000원</span>
                      </div>
                      <div className="flex justify-between border-t border-green-500/30 pt-1 font-medium">
                        <span>추가납부액</span>
                        <span className="text-danger-600 dark:text-danger-400">
                          322,740원
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-lg border border-danger-500/30 bg-danger-500/5 p-4">
                    <h3 className="font-semibold text-danger-600 dark:text-danger-400 mb-3">
                      시나리오 2: 추가납부 (부양가족 많음)
                    </h3>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span>수입</span>
                        <span className="font-medium">1억원</span>
                      </div>
                      <div className="flex justify-between">
                        <span>경비 (64.1%)</span>
                        <span className="font-medium">-6,410만원</span>
                      </div>
                      <div className="flex justify-between border-t border-danger-500/30 pt-1">
                        <span>사업소득</span>
                        <span className="font-medium">3,590만원</span>
                      </div>
                      <div className="flex justify-between">
                        <span>인적공제 (3인)</span>
                        <span className="font-medium">-450만원</span>
                      </div>
                      <div className="flex justify-between">
                        <span>자녀공제 (2명)</span>
                        <span className="font-medium">-350만원</span>
                      </div>
                      <div className="flex justify-between border-t border-danger-500/30 pt-1">
                        <span>과세표준</span>
                        <span className="font-medium">2,790만원</span>
                      </div>
                      <div className="flex justify-between">
                        <span>산출세액 (15%)</span>
                        <span className="font-medium">2,813,400원</span>
                      </div>
                      <div className="flex justify-between">
                        <span>지방소득세 (10%)</span>
                        <span className="font-medium">281,340원</span>
                      </div>
                      <div className="flex justify-between border-t border-danger-500/30 pt-1">
                        <span>총 세금</span>
                        <span className="font-medium">3,094,740원</span>
                      </div>
                      <div className="flex justify-between">
                        <span>원천징수 (3.3%)</span>
                        <span className="font-medium text-green-500">-3,300,000원</span>
                      </div>
                      <div className="flex justify-between border-t border-danger-500/30 pt-1 font-medium">
                        <span>환급액</span>
                        <span className="text-green-600 dark:text-green-400">
                          205,260원 ✓
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <p className="mt-6 text-xs text-text-tertiary">
                  위는 가정적 예시입니다. 실제 계산은 다양한 변수(주택 보유, 이전 연도 손실, 기타
                  소득)를 고려하므로 더 복잡합니다.
                </p>
              </section>

              {/* 관련 계산기 */}
              <RelatedCalculators items={[...RELATED]} />

              {/* 업데이트 로그 */}
              <section aria-label="업데이트" className="card">
                <h2 className="mb-2 text-lg font-semibold">업데이트</h2>
                <ul className="text-sm text-text-secondary">
                  <li>2026-04-24: 프리랜서 종합소득세 계산기 초판 공개 (2026 세율 적용)</li>
                </ul>
              </section>

              {/* 출처·면책 */}
              <section
                aria-label="출처 및 면책"
                className="rounded-lg border border-border-base p-4 text-caption text-text-tertiary"
              >
                <p className="mb-2">
                  <strong>공식 근거</strong>: 소득세법 §55(종합소득세율) · §80(과세표준) ·
                  §127·§129(원천징수) · 시행령 §143(단순경비율). 참고: <a href="https://www.hometax.go.kr" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-600 hover:underline dark:text-primary-500">국세청 홈택스</a>, <a href="https://www.moef.go.kr" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-600 hover:underline dark:text-primary-500">기획재정부</a>.
                </p>
                <p className="mb-2">
                  <strong>계산 기준</strong>: 2026년 세율 기준, 누진 8단계 적용, 지방소득세
                  10%, 3.3% 원천징수, 부양가족 공제 1인당 150만원, 자녀세액공제 차등 적용
                </p>
                <p>
                  <strong>YMYL 면책</strong>: 본 계산기의 결과는 일반 정보 제공 목적이며 개인의
                  세금 신고 상담이 아닙니다. 실제 납부 의무는 개인의 상황(주택 보유, 해외 소득,
                  이전 연도 이월손실 등)을 모두 고려해야 하므로, 반드시 홈택스 간편신고 또는 세무사
                  상담을 거쳐 정확한 신고를 진행하세요. 신고 오류로 인한 손실은 본 사이트에서 책임지지
                  않습니다.
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
