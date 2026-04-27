import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { Footer } from '@/components/layout/Footer';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { AdSlot } from '@/components/ads/AdSlot';
import {
  buildBreadcrumbJsonLd,
} from '@/lib/seo/jsonld';

const URL = 'https://calculatorhost.com/category/work';

export const metadata: Metadata = {
  title: '근로 계산기 모음 2026 | 연봉·퇴직금',
  description:
    '2026년 최신 세율 반영 연봉 실수령액, 퇴직금, 프리랜서 종합소득세 계산기. 소득세·4대보험을 정확하게 계산해 월급과 퇴직금 실수령액을 확인하세요.',
  alternates: { canonical: URL },
  openGraph: {
    title: '근로 계산기 모음 2026',
    description: '연봉·퇴직금 계산기 모음',
    url: URL,
    type: 'website',
  },
};

const CALCULATORS = [
  {
    title: '연봉 실수령액 계산기',
    description: '연봉에서 소득세, 4대보험, 지방소득세를 공제한 월 실수령액과 시급을 계산합니다. 부양가족과 자녀 공제도 반영됩니다.',
    href: '/calculator/salary',
    tags: ['근로소득', '실수령액'],
  },
  {
    title: '퇴직금 계산기',
    description: '근속연수와 월 평균급여로 퇴직금을 계산하고, 퇴직소득세를 공제한 최종 수령액을 확인합니다.',
    href: '/calculator/severance',
    tags: ['퇴직금', '수익'],
  },
  {
    title: '프리랜서 종합소득세 계산기',
    description: '1인 사업자와 프리랜서의 사업소득에 경비율을 적용해 종합소득세를 계산합니다. 기본경비율과 실제경비율을 모두 지원합니다.',
    href: '/calculator/freelancer-tax',
    tags: ['사업소득', '세금'],
  },
];

const FAQ_ITEMS = [
  {
    question: '연봉에서 4대보험은 얼마가 공제되나요?',
    answer:
      '2026년 기준 근로자가 부담하는 4대보험은 다음과 같습니다. 국민연금 4.5%, 건강보험 3.545%, 장기요양보험(건보료의 12.95%), 고용보험 0.9%입니다. 이 중 국민연금은 기준소득월액 상한 637만 원이 적용되므로, 고소득자라도 일정 금액 이상은 공제되지 않습니다.',
  },
  {
    question: '부양가족 공제는 어떻게 적용되나요?',
    answer:
      '부양가족 1인당 기본공제 150만 원이 공제소득에서 차감됩니다. 20세 이하 자녀는 추가로 자녀세액공제가 적용됩니다. 1명 15만 원, 2명 20만 원, 3명 이상은 각각 40만 원씩 세액에서 직접 공제되어 실수령액이 늘어납니다.',
  },
  {
    question: '퇴직금은 어떤 세금이 붙나요?',
    answer:
      '퇴직금은 퇴직소득으로 분류되어 별도 과세 대상입니다. 퇴직금의 40%를 공제하고 나머지에 종합소득세 누진세율을 적용하는 방식입니다. 소득세 외 4대보험료는 퇴직금에서 공제되지 않으므로 세전 금액을 기준으로 계산해야 합니다.',
  },
  {
    question: '연봉 협상 시 세후로 얼마를 고려해야 하나요?',
    answer:
      '세금은 누진세이므로 높은 구간일수록 세전 추가분 대비 세후 증가율이 낮아집니다. 월 실수령액 기준으로 협상 목표를 세우는 것이 합리적입니다. 예를 들어 세후 월 30만 원 추가를 원한다면 세전 기준 약 450~500만 원의 추가 협상이 필요할 수 있습니다.',
  },
  {
    question: '비과세 식대 20만 원은 어떻게 신청하나요?',
    answer:
      '비과세 식대는 회사에서 자동으로 처리하는 경우가 일반적입니다. 근로계약서나 취업규칙에 식대 규정이 있으면 회사에 확인하세요. 월 20만 원 이하는 비과세 소득으로 분류되어 소득세와 4대보험 과세 기준에서 제외됩니다.',
  },
];

export default function WorkCategoryPage() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '근로' },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <div className="flex min-h-screen flex-col">
        <Header />
        <div className="flex flex-1">
          <Sidebar />
          <main className="w-full flex-1 px-4 py-8 md:px-6 lg:px-8">
            <article className="mx-auto max-w-4xl space-y-8">
              {/* H1 */}
              <div>
                <Breadcrumb
                  items={[
                    { name: '홈', href: '/' },
                    { name: '근로 계산기' },
                  ]}
                />
                <h1 className="mb-4 text-4xl font-bold text-text-primary">
                  근로 계산기 모음 2026
                </h1>
                <p className="text-lg text-text-secondary">
                  직장인과 자영업자의 소득 관련 세금 계산을 한 곳에서 처리하세요. 연봉 협상, 퇴직 준비, 사업 소득 신고에 필요한 정확한 숫자를 즉시 확인할 수 있습니다.
                </p>
              </div>

              {/* AD-1 리더보드 */}
              <AdSlot
                slot="category-work-top"
                format="horizontal"
                className="my-6 rounded-lg border border-border-base"
              />

              {/* Structured Summary */}
              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <h2 className="text-xl font-semibold text-text-primary">근로 계산기 라인업</h2>
                <p className="text-text-secondary">
                  아래 3가지 계산기는 근로소득자, 퇴직 예정자, 자영업자의 소득세 계산을 돕습니다.
                </p>
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b border-border-base">
                      <th className="py-3 text-left text-text-primary">계산기</th>
                      <th className="py-3 text-left text-text-primary">대상</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-border-base">
                      <td className="py-3 text-text-primary">연봉 실수령액</td>
                      <td className="text-text-secondary">직장인, 연봉협상자</td>
                    </tr>
                    <tr className="border-b border-border-base">
                      <td className="py-3 text-text-primary">퇴직금</td>
                      <td className="text-text-secondary">퇴직 예정자</td>
                    </tr>
                    <tr>
                      <td className="py-3 text-text-primary">프리랜서 종합소득세</td>
                      <td className="text-text-secondary">1인 사업자, 프리랜서</td>
                    </tr>
                  </tbody>
                </table>
              </section>

              {/* 계산기 카드 그리드 */}
              <section className="space-y-6">
                <h2 className="text-2xl font-bold text-text-primary">근로 계산기</h2>
                <div className="grid gap-6 sm:grid-cols-2">
                  {CALCULATORS.map((calc) => (
                    <div
                      key={calc.href}
                      className="flex flex-col rounded-lg border border-border-base bg-bg-card p-6 transition-all hover:shadow-md"
                    >
                      <h3 className="mb-2 text-xl font-semibold text-text-primary">
                        {calc.title}
                      </h3>
                      <p className="mb-4 flex-1 text-text-secondary">{calc.description}</p>
                      <div className="mb-4 flex flex-wrap gap-2">
                        {calc.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full bg-highlight-500 bg-opacity-10 px-3 py-1 text-sm text-highlight-500"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <Link
                        href={calc.href}
                        className="inline-block w-fit rounded-lg bg-highlight-500 px-4 py-2 font-semibold text-gray-900 transition-colors hover:bg-opacity-90"
                      >
                        계산기 열기 →
                      </Link>
                    </div>
                  ))}
                </div>
              </section>

              {/* 사용 시점 가이드 */}
              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <h2 className="text-2xl font-bold text-text-primary">
                  근로 계산기가 필요한 순간
                </h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-text-primary">연봉 협상을 할 때</h3>
                    <p className="text-text-secondary">
                      제시받은 연봉을 즉시 월 실수령액으로 환산해 실제 생활 가능성을 판단하세요. 세금과 4대보험을 정확히 파악해야 올바른 협상이 가능합니다.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-text-primary">이직을 고려할 때</h3>
                    <p className="text-text-secondary">
                      현 직장과 이직 제안 회사의 연봉을 동일 기준(세후)으로 비교합니다. 명목 연봉의 차이가 실제 세후 차이로는 얼마나 되는지 정확하게 파악할 수 있습니다.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-text-primary">퇴직을 준비할 때</h3>
                    <p className="text-text-secondary">
                      퇴직금의 실제 수령액을 계산해 은퇴 자금 계획을 수립합니다. 퇴직소득세를 정확히 파악해야 은퇴 후 생활 가능성을 예측할 수 있습니다.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-text-primary">부업 소득을 신고할 때</h3>
                    <p className="text-text-secondary">
                      프리랜서 소득이나 사업소득이 있을 때 종합소득세를 미리 계산해 세금 충격을 줄입니다. 경비율 적용 방법도 확인할 수 있습니다.
                    </p>
                  </div>
                </div>
              </section>

              {/* 근로 핵심 용어 */}
              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <h2 className="text-2xl font-bold text-text-primary">근로 계산기 핵심 용어</h2>
                <dl className="space-y-4 text-text-secondary">
                  <div>
                    <dt className="font-semibold text-text-primary">통상임금</dt>
                    <dd className="mt-1">
                      근로기준법 §2에 따라 근로자가 통상적으로 정기적으로 받는 급여. 기본급, 고정 수당, 고정 상여금 등이 포함되며, 연봉 계산과 퇴직금 산정의 기초가 됩니다. 초과근무비, 보너스 등 비정기적 수당은 제외됩니다.
                    </dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-text-primary">평균임금</dt>
                    <dd className="mt-1">
                      3개월 동안 받은 급여를 90일로 나눈 금액(근로기준법 §2). 퇴직금 계산, 휴직 급여, 산재보험 보상금 산정의 기준이 됩니다. 통상임금보다 넓은 범위로, 상여금 일부도 포함될 수 있습니다.
                    </dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-text-primary">누진공제</dt>
                    <dd className="mt-1">
                      누진세 구간에서 낮은 세율 구간에 대한 세금을 기계적으로 공제하는 방식(소득세법 §57). 예를 들어 5,000만 원 소득 시 1,400만 원까지는 6% 적용 후, 3,600만 원 부분에 대해 별도 세율을 적용합니다. 높은 소득일수록 실제 세율을 낮춥니다.
                    </dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-text-primary">4대보험 요율</dt>
                    <dd className="mt-1">
                      국민연금(4.5%), 건강보험(3.545%), 장기요양(건보 12.95%), 고용보험(0.9%)의 근로자 부담분. 이들은 소득세 과세 기준에서 공제되지만, 일부 상한선(국민연금 기준소득월액 637만 원)이 있어 고소득자도 동일 금액 이상은 공제되지 않습니다.
                    </dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-text-primary">퇴직소득공제</dt>
                    <dd className="mt-1">
                      퇴직금의 40%를 공제 후 나머지에 세율을 적용하는 제도(소득세법 §84). 퇴직금은 근로자의 생애 한 번의 큰 수입이므로 세금 부담을 경감하기 위해 40% 공제를 인정합니다. 근속 연수와 평균임금에 따라 퇴직금 자체가 결정됩니다.
                    </dd>
                  </div>
                </dl>
              </section>

              {/* 공식 출처 및 법적 근거 */}
              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <h2 className="text-2xl font-bold text-text-primary">공식 출처 및 법적 근거</h2>
                <p className="text-text-secondary">
                  본 카테고리의 모든 계산기는 한국 정부 공식 기관의 법령과 지침을 1차 출처로 합니다. 2026년 세율과 공제 기준은 기획재정부 세법 개정안을 즉시 반영하며, 매월 업데이트됩니다.
                </p>
                <ul className="grid gap-2">
                  <li>
                    <a
                      href="https://www.moel.go.kr"
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="flex flex-col rounded-xl border border-border-base px-4 py-2 transition-colors hover:border-primary-500"
                    >
                      <span className="font-medium text-primary-500">고용노동부</span>
                      <span className="text-caption text-text-secondary">근로기준법, 임금정책, 4대보험 기준</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.comwel.or.kr"
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="flex flex-col rounded-xl border border-border-base px-4 py-2 transition-colors hover:border-primary-500"
                    >
                      <span className="font-medium text-primary-500">근로복지공단</span>
                      <span className="text-caption text-text-secondary">퇴직금 법정기준, 산재보험 보상</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.nps.or.kr"
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="flex flex-col rounded-xl border border-border-base px-4 py-2 transition-colors hover:border-primary-500"
                    >
                      <span className="font-medium text-primary-500">국민연금공단</span>
                      <span className="text-caption text-text-secondary">연금 산정 기준, 기준소득월액 상한</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.nhis.or.kr"
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="flex flex-col rounded-xl border border-border-base px-4 py-2 transition-colors hover:border-primary-500"
                    >
                      <span className="font-medium text-primary-500">국민건강보험공단</span>
                      <span className="text-caption text-text-secondary">건강보험·장기요양보험 요율</span>
                    </a>
                  </li>
                </ul>
              </section>

              {/* FAQ */}
              <section className="space-y-6 rounded-lg border border-border-base bg-bg-card p-6">
                <h2 className="text-2xl font-bold text-text-primary">자주 묻는 질문</h2>
                <div className="space-y-4">
                  {FAQ_ITEMS.map((item, idx) => (
                    <details
                      key={idx}
                      className="group rounded-lg border border-border-base p-4"
                    >
                      <summary className="cursor-pointer font-semibold text-text-primary">
                        {item.question}
                      </summary>
                      <p className="mt-3 text-text-secondary">{item.answer}</p>
                    </details>
                  ))}
                </div>
              </section>

              {/* 다른 카테고리 */}
              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-text-primary">다른 카테고리 보기</h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link
                    href="/category/tax"
                    className="rounded-lg border border-border-base bg-bg-card p-4 transition-all hover:shadow-md"
                  >
                    <h3 className="font-semibold text-primary-500">세금 계산기</h3>
                    <p className="text-sm text-text-secondary">양도세·취득세·재산세 계산</p>
                  </Link>
                  <Link
                    href="/category/finance"
                    className="rounded-lg border border-border-base bg-bg-card p-4 transition-all hover:shadow-md"
                  >
                    <h3 className="font-semibold text-secondary-500">금융 계산기</h3>
                    <p className="text-sm text-text-secondary">대출·예금·적금 계산</p>
                  </Link>
                  <Link
                    href="/category/real-estate"
                    className="rounded-lg border border-border-base bg-bg-card p-4 transition-all hover:shadow-md"
                  >
                    <h3 className="font-semibold text-primary-500">부동산 계산기</h3>
                    <p className="text-sm text-text-secondary">중개수수료·평수 계산</p>
                  </Link>
                  <Link
                    href="/category/lifestyle"
                    className="rounded-lg border border-border-base bg-bg-card p-4 transition-all hover:shadow-md"
                  >
                    <h3 className="font-semibold text-primary-500">생활 계산기</h3>
                    <p className="text-sm text-text-secondary">BMI·D-day 계산</p>
                  </Link>
                </div>
              </section>

              {/* 면책조항 */}
              <div className="space-y-2 border-t border-border-base pt-6 text-sm text-text-secondary">
                <p>
                  본 계산기는 일반적인 세율과 공식을 기반으로 하며, 실제 세금은 개별 상황에 따라 달라질 수 있습니다. 정확한 세금 계산 및 신고는 국세청 홈택스나 세무 전문가와 상담하시기 바랍니다.
                </p>
                <p>최종 업데이트: 2026년 4월</p>
              </div>
            </article>
          </main>
        </div>
        <Footer />
      </div>
    </>
  );
}
