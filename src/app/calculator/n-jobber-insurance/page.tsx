import type { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { Footer } from '@/components/layout/Footer';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { AdSlot } from '@/components/ads/AdSlot';
import { StructuredSummary } from '@/components/calculator/StructuredSummary';
import { FaqSection } from '@/components/calculator/FaqSection';
import { RelatedCalculators } from '@/components/calculator/RelatedCalculators';
import {
  buildSoftwareApplicationJsonLd,
  buildFaqPageJsonLd,
  buildBreadcrumbJsonLd,
  buildWebPageJsonLd,
  getCategoryUrlForCalculator,
  buildHowToJsonLd,
  buildSpeakableJsonLd,
} from '@/lib/seo/jsonld';
import { NJobberInsuranceCalculator } from './NJobberInsuranceCalculator';
import { AuthorByline } from '@/components/calculator/AuthorByline';

const URL = 'https://calculatorhost.com/calculator/n-jobber-insurance/';

export const metadata: Metadata = {
  title: 'N잡러 건강보험 계산기 2026 | 추가 보험료·피부양자 | calculatorhost',
  description:
    'N잡러 건강보험 계산기 2026. 다중 직업자(프리랜서·알바·사업) 소득별로 건강보험료·피부양자 탈락 유무를 계산. 4대보험 통합. 무료.',
  alternates: { canonical: URL },
  openGraph: {
    title: 'N잡러 건강보험 계산기 2026',
    description:
      '주근로·부업·기타소득으로 월 건강보험료 및 피부양자 위험을 계산합니다.',
    url: URL,
    type: 'website',

  },
  twitter: {
    card: 'summary_large_image',
    title: 'N잡러 건강보험 계산기 2026',
    description:
      'N잡 건강보험료 즉시 계산: 주근로, 부업, 기타소득으로 월보 확인.',
  },
};

const FAQ_ITEMS = [
  {
    question: 'N잡러가 낼 건강보험료는 얼마인가요?',
    answer:
      'N잡러의 건강보험료는 주 근로소득과 추가소득(부업·기타)에 따라 나뉩니다. 주 근로소득이 있으면 월급의 3.545%(근로자 부담)를 냅니다. 추가소득이 2,000만원을 초과하면, 초과분에 대해 추가로 월 건보료를 냅니다 (7.09% 전액 본인부담). 예를 들어, 주근로 5,000만 + 부업 3,000만이면, 주근로 월보 약 148K + 추가 월보 약 59K = 월 약 207K를 냅니다.',
  },
  {
    question: '피부양자 자격을 잃으면 어떻게 되나요?',
    answer:
      '피부양자 자격을 잃으면 지역가입자로 전환되어 건강보험료가 크게 증가합니다. 지역가입자는 소득뿐만 아니라 재산까지 고려하여 보험료가 산정되므로, 근로자(직장가입)보다 훨씬 높은 보험료를 낼 수 있습니다. 또한 자격 전환 후 보험료 체납 시 국세청 체납 처분 대상이 될 수 있으므로, 피부양자 자격 유지가 중요합니다.',
  },
  {
    question: '피부양자 자격을 잃는 기준은 뭔가요?',
    answer:
      '건강보험 피부양자 자격 상실의 주요 기준은 연 소득 2,000만원입니다. 사업소득·근로소득·이자·배당 등 모든 소득을 합산해 2,000만원 이상이면 피부양자 자격을 잃습니다. 또한 재산 기준(약 5.4억 이상)도 있지만, 일반적으로는 소득 기준이 더 중요합니다. 정확한 판정은 국민건강보험공단에 문의하세요.',
  },
  {
    question: '부업 소득이 정확히 얼마인지 몰라요.',
    answer:
      '부업 소득은 부업으로 버는 순 수익을 의미합니다. 프리랜서라면 "매출 - 필요경비"가 부업소득입니다. 소액 부업은 세금신고 기준(3.3% 원천징수 대상)에 따라 결정됩니다. 정확한 소득을 모르면 지난해 종합소득세 신고액이나 3.3% 영수증을 기준으로 추정하거나, 세무사에 문의하세요. 보험료 계산의 착오를 피하려면 정확한 소득 파악이 중요합니다.',
  },
  {
    question: '주근로가 없고 부업만 하면 어떻게 되나요?',
    answer:
      '주근로 없이 부업만 하면, 부업 소득에 따라 건강보험 가입 유형이 결정됩니다. 부업소득이 2,000만원 미만이고 피부양자 자격이 있으면 피부양자로 남을 수 있습니다. 하지만 2,000만원 이상이면 지역가입자로 전환되어, 부업소득 기준의 높은 보험료를 내야 합니다. 또한 부업소득으로만 피부양자 자격을 유지할 수 없으므로, 가구의 총 소득 기준을 확인하세요.',
  },
  {
    question: '이전에 피부양자였는데, 지금 부업을 시작했어요. 보험료가 안 올랐어요.',
    answer:
      '건강보험 피부양자 자격 상실은 "국민건강보험공단의 자격 조사 후" 공식 통지로 확정됩니다. 부업을 시작했다고 즉시 자격이 없어지는 것이 아니라, 공단이 신고를 받거나 조사해서 확인한 후 자격을 상실 처리합니다. 따라서 현재 보험료가 오르지 않았어도, 향후 자격 심사나 갱신 시 보험료가 인상될 수 있습니다. 미리 공단에 문의해 자격 유지 여부를 확인하세요.',
  },
  {
    question: '기타소득(이자·배당)도 피부양자 자격에 포함되나요?',
    answer:
      '네, 포함됩니다. 이자·배당·강의료·원고료 등 모든 형태의 소득이 "기타소득"으로 분류되어 피부양자 자격 판정에 포함됩니다. 따라서 부업이 없어도 이자·배당소득만 2,000만원 이상이면 피부양자 자격을 잃을 수 있습니다. 고배당 주식이나 대액 이자소득이 있다면, 국민건강보험공단에 미리 문의하여 자격 유지 여부를 확인하세요.',
  },
  {
    question: 'N잡러 소득을 줄이는 방법은 없나요?',
    answer:
      '부업소득의 경우, 필요경비를 적절히 공제하여 순소득을 낮출 수 있습니다. 프리랜서라면 업무 관련 사무실 임차료·통신비·교육비 등을 경비로 처리하세요. 또한 사업소득과 기타소득을 구분하여 신고하면, 세금과 보험료 부담을 줄일 수 있습니다. 하지만 과도한 경비 공제는 세무 조사 대상이 될 수 있으므로, 세무사와 상담하여 합법적인 범위 내에서 절세하세요.',
  },
];

const RELATED = [
  {
    href: '/calculator/salary',
    title: '연봉 실수령액',
    description: '주근로 세후 수령액 계산',
  },
  {
    href: '/calculator/child-tax-credit',
    title: '자녀장려금',
    description: '자녀가 있으면 지원금 확인',
  },
  {
    href: '/calculator/freelancer-tax',
    title: '프리랜서 종합소득세',
    description: '부업소득 세금 계산',
  },
];

export default function NJobberInsurancePage() {
  const softwareLd = buildSoftwareApplicationJsonLd({
    name: 'N잡러 건강보험 계산기',
    description:
      '주 근로소득, 부업 사업소득, 기타 부가소득을 입력해 월 건강보험료와 피부양자 상실 여부를 즉시 계산합니다.',
    url: URL,
  });
  const webPageLd = buildWebPageJsonLd({
    name: 'N잡러 건강보험 계산기 2026',
    description: 'N잡 건강보험료 즉시 계산: 주근로, 부업, 기타소득으로 월보 확인',
    url: URL,
    datePublished: '2026-04-24',
    dateModified: '2026-04-27',
    isPartOf: getCategoryUrlForCalculator('n-jobber-insurance'),
  });
  const howToLd = buildHowToJsonLd({
    name: 'N잡러 건강보험 계산기 사용 방법',
    description: '직장 소득, 부업 소득, 기타 소득을 입력하여 월 건강보험료를 계산하는 단계별 가이드',
    steps: [
      { name: '주근로 소득 입력', text: '직장에서 받는 월 급여(또는 연봉)를 입력합니다.' },
      { name: '부업 소득 입력', text: '자영업·프리랜서 등 부업으로 버는 순 소득(연간)을 입력합니다.' },
      { name: '기타 소득 입력', text: '이자·배당·강의료 등 기타 부가소득이 있으면 입력합니다(선택).' },
      { name: '건강보험료 자동 계산', text: '주근로와 추가소득에 따른 월 건강보험료가 자동 계산됩니다.' },
      { name: '피부양자 위험 확인', text: '총 소득이 2,000만 원을 초과하면 피부양자 자격 상실 위험을 경고합니다.' },
    ],
  });
  const faqLd = buildFaqPageJsonLd(
    FAQ_ITEMS.map((f) => ({ question: f.question, answer: f.answer }))
  );
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '근로', url: 'https://calculatorhost.com/category/work/' },
    { name: 'N잡러건강보험' },
  ]);
  const speakableLd = buildSpeakableJsonLd(['[data-speakable]']);

  return (
    <div className="flex min-h-screen flex-col bg-bg-base text-text-primary">
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
      <Header />
      <div className="flex flex-1 flex-col lg:flex-row">
        <Sidebar />
        <main id="main-content" className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
          <article className="mx-auto max-w-4xl">
            {/* 헤더 */}
            <Breadcrumb
              items={[
                { name: '홈', href: '/' },
                { name: '세금', href: '/category/tax/' },
                { name: 'N잡러 건강보험' },
              ]}
            />
            <h1 className="text-4xl font-bold tracking-tight">
              N잡러 건강보험 계산기 2026
            </h1>
            <p className="mt-4 text-lg text-text-secondary">
              주 근로소득과 부업, 기타소득을 입력해 월 건강보험료를 즉시 계산하세요.
              피부양자 자격 상실 여부도 미리 확인할 수 있습니다.
            </p>
            <AuthorByline datePublished="2026-04-24" dateModified="2026-04-27" />

            {/* Structured Summary */}
            <StructuredSummary
              definition="N잡러 건강보험은 주 직장 외 추가 소득이 있는 근로자의 건강보험료 계산 방식입니다. 주 근로소득과 추가소득(부업·기타)에 따라 보험료가 달라지며, 추가소득 2,000만원 기준으로 피부양자 자격이 상실될 수 있습니다."
              table={{
                caption: 'N잡러 보험료 구간별 계산',
                headers: ['소득 구간', '건보료 계산'],
                rows: [
                  ['주근로만', '월급 × 3.545%'],
                  ['추가소득 ~2,000만', '주근로 보험료만'],
                  ['추가소득 2,000만 초과', '주근로 + 추가 월보'],
                ],
              }}
              tldr={[
                '주근로는 근로자 부담 3.545%입니다.',
                '추가소득 2,000만원이 기준점입니다.',
                '2,000만 초과 시 피부양자 자격 상실 위험이 있습니다.',
              ]}
            />

            {/* AD-1 헤더 광고 */}
            <div className="my-8">
              <AdSlot slot="n-jobber-insurance-top" format="horizontal" />
            </div>

            {/* 계산기 폼 */}
            <NJobberInsuranceCalculator />

            {/* AD-2 중간 광고 */}
            <div className="my-8">
            </div>

            {/* FAQ */}
            <FaqSection items={FAQ_ITEMS} />

            {/* N잡러란 섹션 */}
            <section className="mt-12 space-y-6">
              <h2 className="text-2xl font-bold">N잡러와 건강보험</h2>
              <p>
                "N잡러"는 본 직장 외에 2개 이상의 추가 소득원을 가진 근로자를
                의미합니다. 일반적으로 주 직장의 월급 + 부업(프리랜서, 투잡) +
                기타소득(이자, 배당)의 조합으로 생계를 유지합니다. 이러한 N잡러는
                건강보험료 계산이 복잡해지며, 특히 추가소득이 많을 경우
                피부양자 자격을 잃고 지역가입자로 전환되어 보험료가 크게 인상될 수
                있습니다.
              </p>
              <p>
                따라서 N잡러는 정기적으로 본인의 총 소득을 파악하고, 2,000만원
                기준에 가까워지면 국민건강보험공단에 미리 상담하여 자격 유지 전략을
                세우는 것이 중요합니다.
              </p>
            </section>

            {/* 건보료 계산 방식 */}
            <section className="mt-12 space-y-6">
              <h2 className="text-2xl font-bold">건강보험료 계산 방식</h2>
              <div className="space-y-4">
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <h3 className="font-semibold text-primary-500 mb-3">
                    1. 주 근로소득 건보료
                  </h3>
                  <div className="space-y-2 text-sm text-text-secondary">
                    <p className="font-mono">
                      월 건보료 = 월 급여 × 3.545%
                    </p>
                    <p>
                      직장에서 이미 월급에서 공제되는 건강보험료입니다. 이는 근로자 부담분(3.545%)만 계산하며, 고용주 부담분은 별도입니다.
                    </p>
                  </div>
                </div>

                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <h3 className="font-semibold text-secondary-500 mb-3">
                    2. 추가소득 건보료 (2,000만 초과분)
                  </h3>
                  <div className="space-y-2 text-sm text-text-secondary">
                    <p className="font-mono">
                      월 추가보험료 = (총추가소득 - 2,000만) / 12 × 7.09%
                    </p>
                    <p>
                      추가소득이 2,000만원을 초과하면, 초과분에 대해 추가 건보료를 냅니다. 이 경우 근로자가 전액 부담합니다 (7.09%, 고용주 부담 없음).
                    </p>
                  </div>
                </div>

                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <h3 className="font-semibold text-highlight-500 mb-3">
                    3. 월 총 건보료
                  </h3>
                  <div className="space-y-2 text-sm text-text-secondary">
                    <p className="font-mono">
                      월 총보험료 = 주근로 월보 + 추가소득 월보
                    </p>
                    <p>
                      두 부분을 더한 것이 당신이 실제로 내야 할 월 건강보험료입니다.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* 피부양자 기준 */}
            <section className="mt-12 space-y-6">
              <h2 className="text-2xl font-bold">피부양자 자격 기준</h2>
              <div className="space-y-4">
                <div className="rounded-lg border-l-4 border-danger-500 bg-bg-card p-4">
                  <h3 className="font-semibold text-danger-500 mb-3">
                    ⚠️ 자격 상실 기준
                  </h3>
                  <ul className="space-y-2 text-sm text-text-secondary">
                    <li>
                      <strong>소득 기준:</strong> 연 소득 2,000만원 이상
                    </li>
                    <li>
                      <strong>포함 소득:</strong> 근로·사업·이자·배당·기타 모두
                    </li>
                    <li>
                      <strong>판정 시점:</strong> 국민건강보험공단 자격 조사 후 확정
                    </li>
                  </ul>
                </div>

                <div className="rounded-lg border-l-4 border-primary-500 bg-bg-card p-4">
                  <h3 className="font-semibold text-primary-500 mb-3">
                    ✓ 자격 유지 팁
                  </h3>
                  <ul className="space-y-2 text-sm text-text-secondary">
                    <li>추가소득 2,000만원 미만 유지</li>
                    <li>부업 필요경비 적절히 공제</li>
                    <li>연 1회 건강보험공단 상담</li>
                    <li>소득 변동 시 즉시 신고</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* AD-4 인피드 광고 */}
            <div className="my-8">
            </div>

            {/* 주의사항 */}
            <section className="mt-12 space-y-6">
              <h2 className="text-2xl font-bold">N잡러 건강보험 주의사항</h2>
              <div className="space-y-4 text-sm text-text-secondary">
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <h3 className="font-semibold text-text-primary mb-2">
                    1. 지역가입자 전환 시 보험료 급증
                  </h3>
                  <p>
                    피부양자에서 지역가입자로 전환되면, 소득뿐 아니라 재산까지
                    고려하여 보험료가 산정됩니다. 같은 소득이어도 근로자(직장가입)
                    대비 3-5배 이상 높을 수 있습니다.
                  </p>
                </div>

                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <h3 className="font-semibold text-text-primary mb-2">
                    2. 과거 보험료 소급 징수
                  </h3>
                  <p>
                    건강보험공단이 자격 상실을 뒤늦게 발견하면, 과거 보험료를
                    소급 징수할 수 있습니다. 체납하면 세무 조사 대상이 될 수
                    있으므로, 자격 변동이 있으면 즉시 신고하세요.
                  </p>
                </div>

                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <h3 className="font-semibold text-text-primary mb-2">
                    3. 소득 신고와 보험료
                  </h3>
                  <p>
                    세무서에 신고하는 소득과 건강보험공단에 신고하는 소득이
                    일치해야 합니다. 불일치하면 조사 대상이 될 수 있으므로,
                    정확한 소득을 일관되게 신고하세요.
                  </p>
                </div>

                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <h3 className="font-semibold text-text-primary mb-2">
                    4. 부업 필요경비 적절히
                  </h3>
                  <p>
                    과도한 필요경비 공제는 세무 조사 대상입니다. 합법적인 범위
                    내에서만 공제하고, 세무사와 상담하여 절세 방안을 세우세요.
                  </p>
                </div>
              </div>
            </section>

            {/* 관련 계산기 */}
            <RelatedCalculators items={RELATED} />

            {/* 업데이트 로그 */}
            <section className="mt-12 border-t border-border-base pt-6">
              <h2 className="text-lg font-semibold">업데이트 로그</h2>
              <ul className="mt-3 space-y-2 text-sm text-text-secondary">
                <li>2026-04-24: 초판 발행 (2026 건강보험료율 기준)</li>
              </ul>
            </section>

            {/* 출처·면책 */}
            <section className="mt-6 border-t border-border-base pt-6 mb-6">
              <p className="text-xs text-text-secondary mb-2">
                <strong>공식 출처</strong>: <a href="https://www.nhis.or.kr" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-600 underline dark:text-primary-500">국민건강보험공단</a> 건강보험료 산정 기준, <a href="https://www.nts.go.kr" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-600 underline dark:text-primary-500">국세청</a> 소득 신고 기준.
              </p>
            </section>

            {/* 면책조항 */}
            <section className="mt-6 border-t border-border-base pt-6">
              <p className="text-xs text-text-secondary">
                본 계산기는 참고용입니다. 실제 건강보험료는 국민건강보험공단의 소득 인정
                기준과 재산 평가에 따라 달라질 수 있습니다. 피부양자 자격과 보험료 책정은
                매년 변경될 수 있으므로, 정확한 정보는 국민건강보험공단(1577-1000)에
                문의하세요. 본 서비스는 법률·세무·보험 조언이 아닙니다.
              </p>
            </section>
          </article>
        </main>

        {/* AD-3 우측 스티키 광고 (lg+ 이상) */}
        <aside className="hidden w-80 bg-bg-base p-4 lg:block">
          <div className="sticky top-[5rem]">
          </div>
        </aside>
      </div>
      <Footer />

      {/* JSON-LD 스크립트 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
    </div>
  );
}
