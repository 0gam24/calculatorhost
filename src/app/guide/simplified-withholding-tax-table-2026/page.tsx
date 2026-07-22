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

const URL = 'https://calculatorhost.com/guide/simplified-withholding-tax-table-2026/';
const DATE_PUBLISHED = '2026-07-17';
const DATE_MODIFIED = '2026-07-17';

export const metadata: Metadata = {
  title: '근로소득 간이세액표 2026, 매월 원천징수 80·100·120% 선택',
  description:
    '매월 급여에서 떼는 소득세는 근로소득 간이세액표로 정합니다. 소득세법 §134 원천징수와 시행령 §194 간이세액표, 80·100·120% 선택이 연말정산에 미치는 영향을 직장인 사례로 정리합니다.',
  keywords: [
    '근로소득 간이세액표',
    '원천징수 80 100 120',
    '매월 소득세',
    '간이세액표 선택',
    '연말정산 환급',
    '월급 세금',
    '소득세법 134조',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '근로소득 간이세액표 2026, 매월 원천징수 80·100·120% 선택' }],
    title: '근로소득 간이세액표 2026, 원천징수 비율 선택과 연말정산의 관계',
    description: '매월 떼는 소득세는 간이세액표 기준. 80·100·120% 선택이 연말정산 환급·추가납부에 미치는 영향을 정리합니다.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '근로소득 간이세액표 2026, 원천징수 80·100·120%',
    description: '매월 소득세 원천징수의 기준과 선택 비율. 소득세법 §134.',
  },
};

const FAQ_ITEMS = [
  {
    question: '근로소득 간이세액표가 무엇인가요?',
    answer:
      '간이세액표는 회사가 매월 급여에서 뗄 소득세를 정할 때 쓰는 기준표입니다(소득세법 시행령 §194). 월급여액과 부양가족 수에 따라 원천징수할 세액이 정해져 있어, 회사는 이 표에 따라 매월 소득세와 지방소득세를 떼어 국세청에 냅니다. 실제 확정 세액은 이듬해 연말정산으로 정산됩니다.',
  },
  {
    question: '원천징수 80%, 100%, 120%는 무슨 뜻인가요?',
    answer:
      '근로자가 매월 뗄 세액의 비율을 간이세액표 기준의 80%, 100%, 120% 중에서 선택할 수 있다는 뜻입니다(시행령 §194). 100%가 기본이고, 80%를 고르면 매월 덜 떼는 대신 연말정산에서 추가납부 가능성이 커지며, 120%를 고르면 매월 더 떼는 대신 환급 가능성이 커집니다. 총 부담 세액은 어느 쪽을 골라도 같습니다.',
  },
  {
    question: '80%를 선택하면 세금을 덜 내는 건가요?',
    answer:
      '아닙니다. 연간 총 세액은 동일하고, 납부 시점만 달라집니다. 80%는 매월 원천징수를 줄여 당장의 실수령액을 늘리는 대신, 연말정산 때 덜 낸 만큼을 추가로 납부하게 됩니다. 세금 자체가 줄어드는 것이 아니라 미리 낼지 나중에 낼지의 차이일 뿐입니다.',
  },
  {
    question: '어떤 비율을 선택하는 게 유리한가요?',
    answer:
      '현금 흐름 성향에 따라 다릅니다. 매월 실수령액을 늘리고 싶으면 80%, 연말정산 환급을 목돈으로 받고 싶으면 120%가 맞습니다. 다만 80%를 선택했다가 연말정산에서 예상보다 큰 추가납부가 나오면 부담이 될 수 있으니, 공제 항목이 적은 경우에는 100% 또는 120%가 안전합니다.',
  },
  {
    question: '원천징수 비율은 어떻게 바꾸나요?',
    answer:
      '회사(원천징수의무자)에 원천징수세액 조정 신청서를 제출하면 됩니다. 연중에 신청할 수 있으며, 한 번 선택하면 재신청 전까지 유지됩니다. 회사 급여 담당 부서나 인사팀을 통해 신청하면 다음 급여부터 반영됩니다.',
  },
  {
    question: '매월 뗀 세금이 정확한 확정 세액인가요?',
    answer:
      '아닙니다. 간이세액표는 어디까지나 추정치입니다. 각종 소득공제·세액공제(의료비, 교육비, 신용카드 등)는 연말정산에서 반영되므로, 매월 원천징수액과 최종 확정 세액은 차이가 납니다. 그래서 연말정산에서 환급 또는 추가납부가 발생하는 것입니다.',
  },
  {
    question: '부양가족이 많으면 매월 세금이 줄어드나요?',
    answer:
      '네, 간이세액표는 공제대상 부양가족 수를 반영합니다. 본인 포함 부양가족(20세 이하 자녀 포함) 수가 많을수록 매월 원천징수 세액이 줄어듭니다. 다만 이는 어디까지나 매월 임시 반영이며, 정확한 인적공제는 연말정산에서 최종 확정됩니다.',
  },
  {
    question: '연말정산에서 무조건 환급받으려면 120%가 좋은가요?',
    answer:
      '환급 가능성은 높아지지만 최선은 아닐 수 있습니다. 120%는 매월 더 많은 세금을 미리 내는 것이라, 그만큼의 돈을 1년간 활용하지 못한다는 기회비용이 있습니다. 환급은 결국 더 낸 세금을 돌려받는 것이므로, 무이자 예치와 비슷합니다. 현금 흐름과 심리적 선호를 함께 고려해 선택하세요.',
  },
];

export default function SimplifiedWithholdingTaxTable2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '근로소득 간이세액표 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '근로소득 간이세액표 2026, 매월 원천징수 80·100·120% 선택 완전 정리',
    description:
      '매월 급여에서 떼는 소득세를 정하는 근로소득 간이세액표(소득세법 시행령 §194)와 80·100·120% 선택이 연말정산 환급·추가납부에 미치는 영향을 직장인 관점에서 정리.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['근로소득 간이세액표', '원천징수', '80 100 120', '연말정산', '소득세법 134조'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '근로소득 간이세액표 2026',
    description:
      '매월 급여 소득세 원천징수의 기준인 간이세액표와 80·100·120% 선택의 의미 정리.',
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
                    { name: '근로소득 간이세액표 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">직장인 · 7분 읽기 · 2026-07-17</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  근로소득 간이세액표 2026
                  <br />
                  <span className="text-2xl text-text-secondary">매월 원천징수 80·100·120% 선택</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  월급 명세서를 보면 소득세가 얼마씩 빠져나가는데, 그 금액이 어떻게 정해지는지 궁금했던 적이 있을 것입니다. 매월 떼는 소득세는 근로소득 간이세액표라는 기준으로 계산되고, 근로자는 그 비율을 80·100·120% 중에서 고를 수 있습니다. 이 가이드는 간이세액표의 원리와 선택 비율이 연말정산 환급·추가납부에 어떻게 연결되는지 소득세법 §134를 기준으로 설명합니다.
                </p>
              </header>

              <AdSlot slot="guide-simplified-withholding-tax-table-top" format="horizontal" />

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">간이세액표는 어떻게 작동하나요?</h2>
                <p>
                  간이세액표는 회사가 매월 급여에서 뗄 소득세를 정하는 기준표입니다. 소득세법 §134는 근로소득을 지급할 때 원천징수하도록 규정하고, 시행령 §194는 그 세액을 간이세액표에 따라 정하도록 하고 있습니다. 표는 월급여액(비과세 제외)과 공제대상 부양가족 수를 두 축으로 세액을 제시합니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">간이세액표 세액 결정의 2요소</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    1. 월급여액: 비과세소득(식대 등)을 제외한 과세 대상 급여
                    <br />
                    2. 부양가족 수: 본인 포함 공제대상 가족(20세 이하 자녀 포함) 수
                    <br />
                    → 두 값의 교차점 세액을 매월 원천징수
                  </p>
                </div>
                <p className="mt-4">
                  다만 간이세액표는 확정 세액이 아니라 추정치입니다. 의료비·교육비·기부금 등 개인별 공제는 반영되지 않으므로, 매월 뗀 세금과 실제 확정 세액은 반드시 차이가 납니다. 이 차이를 정산하는 절차가 연말정산입니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">80·100·120% 선택은 무슨 의미인가요?</h2>
                <p>
                  근로자는 매월 뗄 세액을 간이세액표 기준의 80%, 100%, 120% 중에서 선택할 수 있습니다(시행령 §194). 100%가 기본값이며, 나머지는 근로자가 신청해야 적용됩니다. 총 세액은 같고 납부 시점만 앞당기거나 미루는 개념입니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 원천징수 비율 선택별 특징 (소득세법 시행령 §194)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">선택 비율</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">매월 실수령</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">연말정산 경향</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3"><strong>80%</strong></td>
                        <td className="p-3">많음(덜 뗌)</td>
                        <td className="p-3">추가납부 가능성 큼</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3"><strong>100% (기본)</strong></td>
                        <td className="p-3">표준</td>
                        <td className="p-3">공제에 따라 환급 또는 납부</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3"><strong>120%</strong></td>
                        <td className="p-3">적음(더 뗌)</td>
                        <td className="p-3">환급 가능성 큼</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  다만 어떤 비율을 골라도 1년 총 세액은 동일합니다. 80%는 세금을 덜 내는 것이 아니라 나중에 몰아 내는 것이고, 120%는 미리 내고 환급으로 돌려받는 것입니다. 세금이 줄어드는 선택은 없다는 점을 오해하지 마세요.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">선택에 따라 실수령액이 얼마나 달라지나요?</h2>
                <p>
                  간이세액표 세액은 국세청 자동계산으로 확인해야 정확하므로, 여기서는 가상의 월 원천징수액을 100% 기준으로 두고 비율별 차이를 설명하겠습니다. 구체 세액표 값은 국세청 간이세액표를 참조하세요.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례. 100% 기준 월 소득세가 15만원인 직장인</p>
                  <p className="text-sm text-text-secondary">
                    · 100% 선택: 월 15만원 원천징수 → 연 180만원 선납
                    <br />
                    · 80% 선택: 월 12만원 원천징수 → 연 144만원 선납 (월 3만원 실수령 증가)
                    <br />
                    · 120% 선택: 월 18만원 원천징수 → 연 216만원 선납 (월 3만원 실수령 감소)
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 확정 세액이 200만원이라면 80% 선택자는 약 56만원 추가납부, 120% 선택자는 약 16만원 환급.</span>
                  </p>
                </div>
                <p className="mt-4">
                  다만 위 금액은 이해를 돕기 위한 가정치이며, 실제 월 원천징수액은 본인의 월급여액과 부양가족 수에 따라 국세청 간이세액표로 정확히 정해집니다. 정확한 매월 세액은 국세청 홈택스의 간이세액표 조회를 이용하세요.
                </p>
              </section>

              <AdSlot slot="guide-simplified-withholding-tax-table-mid" format="rectangle" />

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">원천징수 비율은 어떻게 바꾸나요?</h2>
                <p>
                  회사(원천징수의무자)에 신청하면 됩니다. 절차는 간단하며 연중 언제든 신청할 수 있습니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">단계별 신청 방법</p>
                  <p className="text-sm text-text-secondary">
                    1. 회사 급여·인사 부서에 원천징수세액 조정 의사 전달
                    <br />
                    2. 소득세 원천징수세액 조정 신청서에 원하는 비율(80/100/120%) 표시
                    <br />
                    3. 제출 후 다음 급여 지급분부터 반영
                    <br />
                    4. 재신청 전까지 선택 비율 유지
                  </p>
                </div>
                <p className="mt-4">
                  다만 한 번 선택하면 다시 신청하기 전까지 그대로 유지되므로, 급여나 가족 구성이 크게 바뀌면 비율을 재검토하는 것이 좋습니다. 특히 공제 항목이 적은 사회초년생은 80%를 선택했다가 연말정산에서 예상외 추가납부를 겪을 수 있으니 주의하세요.
                </p>
              </section>

              <section className="space-y-6 border-t border-border-base pt-8">
                <h2 className="text-2xl font-bold">간이세액표와 연말정산의 관계</h2>
                <p>
                  간이세액표는 1년치 세금을 미리 나눠 내는 임시 장치이고, 연말정산은 이를 실제 공제와 대조해 확정하는 절차입니다. 두 개념의 관계를 이해하면 왜 환급·추가납부가 생기는지 명확해집니다.
                </p>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li>
                    <strong>매월(간이세액표):</strong> 월급여와 부양가족만 반영한 추정 세액을 원천징수.
                  </li>
                  <li>
                    <strong>연말(연말정산):</strong> 의료비·교육비·신용카드·기부금 등 실제 공제를 모두 반영해 확정 세액 계산.
                  </li>
                  <li>
                    <strong>정산:</strong> 확정 세액보다 많이 뗐으면 환급, 적게 뗐으면 추가납부.
                  </li>
                </ul>
                <p className="mt-4">
                  결국 간이세액표 비율 선택은 세금의 크기가 아니라 흐름을 조절하는 도구입니다. 연말정산 공제 자료를 잘 챙기는 것이 실제 세금을 줄이는 유일한 방법입니다.
                </p>
              </section>

              <h2 className="text-2xl font-bold mb-6">자주 묻는 질문</h2>
              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h3 className="text-lg font-semibold text-text-primary">관련 계산기 및 가이드</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link
                    href="/calculator/salary/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">연봉 실수령액 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">4대보험과 소득세를 반영한 세후 월급을 확인하세요.</p>
                  </Link>
                  <Link
                    href="/guide/year-end-tax-settlement/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">연말정산 가이드</div>
                    <p className="mt-1 text-sm text-text-secondary">간이세액표로 뗀 세금을 정산하는 전체 흐름.</p>
                  </Link>
                  <Link
                    href="/guide/salary-take-home-2026-july-insurance-increase/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">2026 실수령액과 보험료 인상</div>
                    <p className="mt-1 text-sm text-text-secondary">7월 4대보험 변동이 실수령액에 미치는 영향.</p>
                  </Link>
                  <Link
                    href="/guide/personal-deduction-dependent-150-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">부양가족 인적공제</div>
                    <p className="mt-1 text-sm text-text-secondary">간이세액표 세액을 좌우하는 부양가족 요건.</p>
                  </Link>
                  <Link
                    href="/guide/income-deduction-vs-tax-credit-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">소득공제 vs 세액공제</div>
                    <p className="mt-1 text-sm text-text-secondary">연말정산에서 세금을 실제로 줄이는 두 방식.</p>
                  </Link>
                  <Link
                    href="/category/work/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">모든 근로 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">연봉·퇴직금·4대보험 모음.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 교육 목적으로 작성되었으며, 개인 맞춤형 세무 조언이 아닙니다. 매월 원천징수 세액과 연말정산 결과는 개인의 급여·부양가족·공제 항목에 따라 달라지므로, 정확한 세액은 국세청 홈택스 간이세액표 조회 또는 회사 급여 담당 부서에서 확인하세요. 본 콘텐츠는 2026-07-17을 기준으로 작성되었으며, 관련 법령은 <strong>소득세법 §134(근로소득 원천징수), 시행령 §194(간이세액표), §55(세율)</strong>를 따릅니다. 구체 세액표 값은 국세청 간이세액표를 참조하도록 헤지하였습니다. AI 보조 작성 후 운영자 검수 완료.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터</a>,{' '}
                  <a href="https://www.nts.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">국세청 간이세액표</a>,{' '}
                  <a href="https://www.hometax.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">국세청 홈택스</a>.
                </p>
              </section>

              <ShareButtons
                title="근로소득 간이세액표 2026 가이드"
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
