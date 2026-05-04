import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { Footer } from '@/components/layout/Footer';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { AdSlot } from '@/components/ads/AdSlot';
import {
  buildBreadcrumbJsonLd,
  buildItemListJsonLd,
  buildFaqPageJsonLd,
  buildDefinedTermSetJsonLd,
} from '@/lib/seo/jsonld';

const URL = 'https://calculatorhost.com/category/tax/';

export const metadata: Metadata = {
  title: '세금 계산기 모음 2026 | 양도·취득·재산·증여·상속 | calculatorhost',
  description:
    '2026년 최신 세율 반영 세금 계산기 모음. 양도소득세, 취득세, 재산세, 퇴직금, 프리랜서 종합소득세 등 부동산 거래·보유·근로 소득 관련 세금을 정확하게 계산하세요. 회원가입 불필요, 모바일 최적, 완전 무료.',
  alternates: { canonical: URL },
  openGraph: {
    title: '세금 계산기 모음 2026',
    description: '양도세·취득세·재산세·종부세 계산기 모음',
    url: URL,
    type: 'website',

  },
};

const CALCULATORS = [
  {
    title: '양도소득세 계산기',
    description: '주택 또는 토지 매각 시 발생하는 양도소득세를 계산합니다. 보유 기간, 조정지역, 다주택 여부를 반영합니다.',
    href: '/calculator/capital-gains-tax',
    tags: ['부동산 거래', '세금'],
  },
  {
    title: '취득세 계산기',
    description: '부동산 매입 시 납부하는 취득세와 농특세, 지방교육세를 2026년 최신 세율로 계산합니다.',
    href: '/calculator/acquisition-tax',
    tags: ['구매비용', '세금'],
  },
  {
    title: '재산세 계산기',
    description: '보유 중인 부동산에 대한 연간 재산세를 공시가격 기준으로 계산합니다.',
    href: '/calculator/property-tax',
    tags: ['부동산 보유', '세금'],
  },
  {
    title: '퇴직금 계산기',
    description: '근속연수와 월 평균급여를 기반으로 예상 퇴직금과 퇴직소득세를 계산합니다.',
    href: '/calculator/severance',
    tags: ['근로소득', '세금'],
  },
  {
    title: '프리랜서 종합소득세 계산기',
    description: '1인 사업자·프리랜서의 종합소득세를 경비율 반영하여 계산합니다.',
    href: '/calculator/freelancer-tax',
    tags: ['사업소득', '세금'],
  },
  {
    title: '연봉 실수령액 계산기',
    description: '연봉에서 소득세, 4대보험, 지방소득세를 공제한 월 실수령액을 계산합니다.',
    href: '/calculator/salary',
    tags: ['근로소득', '세금'],
  },
  {
    title: '부가가치세(VAT) 계산기',
    description: '한국 부가세 10% 일반과세·간이과세 산출 + VAT 포함↔공급가액 환산. 사업자·프리랜서 필수.',
    href: '/calculator/vat',
    tags: ['VAT', '부가세', '사업자'],
  },
];

const FAQ_ITEMS = [
  {
    question: '양도소득세와 취득세의 차이는?',
    answer:
      '양도소득세는 부동산 판매 시 판매 수익에 대해 판매자가 납부하는 세금입니다. 취득세는 부동산 구매 시 구매자가 구매가액에 대해 납부합니다. 같은 거래에서 판매자는 양도세, 구매자는 취득세를 각각 부담합니다.',
  },
  {
    question: '1주택 보유자 양도세 비과세 조건은?',
    answer:
      '소득세법 §94에 따라 1세대 1주택을 2년 이상 보유 후 양도하되, 공시가격 9억 원 이하인 경우 양도소득세가 비과세됩니다. 거주 요건은 보유 기간 중 대부분 거주해야 한다는 실질적 기준이 적용됩니다.',
  },
  {
    question: '일시적 2주택은 언제 비과세되나요?',
    answer:
      '구 주택 양도와 신 주택 취득이 2년 내에 일어나는 경우, 구 주택이 양도세 비과세 요건을 충족하면 비과세될 수 있습니다. 다만 양도 당시 기준으로 2주택 이상 보유했다면 세율이 올라가므로 정확한 일정 확인이 중요합니다.',
  },
  {
    question: '재산세와 종합부동산세 차이는?',
    answer:
      '재산세는 시·군에서 징수하는 지방세로, 개별 부동산 공시가격을 기준으로 일반세율을 적용합니다. 종합부동산세는 국세청에서 징수하며, 1세대가 보유한 모든 부동산의 합산 가액에 높은 세율을 적용합니다.',
  },
  {
    question: '프리랜서 종합소득세에서 경비율은?',
    answer:
      '국세청이 정한 경비율은 업종별로 다르며, 2026년 기준 대부분 30~80% 범위입니다. 실제 경비 입증이 어려울 경우 기본경비율을 적용할 수 있으나, 세무조사 대상이 될 수 있으므로 영수증 관리가 필수입니다.',
  },
];

export default function TaxCategoryPage() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '세금' },
  ]);
  const itemListLd = buildItemListJsonLd(
    CALCULATORS.map((c) => ({
      name: c.title,
      url: `https://calculatorhost.com${c.href.endsWith('/') ? c.href : c.href + '/'}`,
    })),
  );
  const faqLd = buildFaqPageJsonLd(
    FAQ_ITEMS.map((f) => ({ question: f.question, answer: f.answer })),
  );
  const definedTermSetLd = buildDefinedTermSetJsonLd({
    name: '세금 계산기 핵심 용어',
    description: '부동산 거래, 부동산 보유, 근로소득 관련 세금 계산에서 자주 나오는 용어 정의',
    url: `${URL}#세금-핵심-용어`,
    terms: [
      {
        name: '과세표준',
        description:
          '세율을 적용하는 대상이 되는 소득금액. 소득세법 §47에 따라 총소득에서 특정 공제를 뺀 금액입니다. 예를 들어 양도소득세는 양도가액에서 취득가와 비용을 뺀 양도소득이 과세표준이 되며, 여기에 세율을 곱해 세액을 계산합니다.',
        url: 'https://www.nts.go.kr',
      },
      {
        name: '누진공제',
        description:
          '누진세에서 낮은 구간 세금을 자동으로 공제하는 금액(소득세법 §55). 누진세율 테이블에 직접 명시되어 있으며, 과세표준이 높아질수록 실제 세율을 조정하는 역할을 합니다. 이를 통해 세율 구간 경계에서 급격한 세금 증가를 완화합니다.',
        url: 'https://www.nts.go.kr',
      },
      {
        name: '양도소득금액',
        description:
          '부동산 판매 시 실제 이득 = (양도가액 - 취득가 - 필요경비). 소득세법 §93에 따라 계산되며, 이것이 과세표준이 됩니다. 양도가액이 높아도 취득가가 높으면 소득은 작아집니다. 장기보유(2년 이상)하면 양도소득 공제(보유 기간별)가 적용되어 과세표준을 낮춥니다.',
        url: 'https://www.nts.go.kr',
      },
      {
        name: '1세대 1주택 비과세',
        description:
          '소득세법 §94에 따른 세제 혜택으로, 1세대가 1주택만 소유하고 2년 이상 보유·거주 후 공시가격 9억 원 이하로 양도할 때 양도소득세를 내지 않습니다. 가장 강력한 세제 혜택이나 조건이 엄격하며, 다주택 전환 시 비과세 지위가 상실됩니다.',
        url: 'https://www.nts.go.kr',
      },
      {
        name: '경비율',
        description:
          '사업소득에서 필요경비를 계산할 때 국세청이 정한 비율(소득세법 §25). 프리랜서와 1인사업자는 실제 경비를 입증할 수 없을 때 기본경비율을 적용할 수 있습니다. 업종별로 30~80% 범위이며, 경비율 선택이 종합소득세 크기에 큰 영향을 미칩니다.',
        url: 'https://www.nts.go.kr',
      },
    ],
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermSetLd) }}
      />
      <div className="flex min-h-screen flex-col">
        <Header />
        <div className="flex flex-1">
          <Sidebar />
          <main id="main-content" className="w-full flex-1 px-4 py-8 md:px-6 lg:px-8">
            <article className="mx-auto max-w-4xl space-y-8">
              {/* H1 */}
              <div>
                <Breadcrumb
                  items={[
                    { name: '홈', href: '/' },
                    { name: '세금 계산기' },
                  ]}
                />
                <h1 className="mb-4 text-4xl font-bold text-text-primary">
                  세금 계산기 모음 2026
                </h1>
                <p className="text-lg text-text-secondary">
                  부동산 거래와 부동산 보유 관련 세금을 정확하게 계산하세요. 양도소득세, 취득세, 재산세, 퇴직금, 프리랜서 소득세까지 한 곳에서 확인할 수 있습니다.
                </p>
              </div>

              {/* AD-1 리더보드 */}
              <AdSlot
                slot="category-tax-top"
                format="horizontal"
                className="my-6 rounded-lg border border-border-base"
              />

              {/* Structured Summary */}
              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <h2 className="text-xl font-semibold text-text-primary">세금 계산기 라인업</h2>
                <p className="text-text-secondary">
                  아래 6가지 계산기는 부동산 거래자, 근로소득자, 자영업자의 세금 계산을 돕습니다.
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
                      <td className="py-3 text-text-primary">양도소득세</td>
                      <td className="text-text-secondary">주택·토지 매각자</td>
                    </tr>
                    <tr className="border-b border-border-base">
                      <td className="py-3 text-text-primary">취득세</td>
                      <td className="text-text-secondary">부동산 구매자</td>
                    </tr>
                    <tr className="border-b border-border-base">
                      <td className="py-3 text-text-primary">재산세</td>
                      <td className="text-text-secondary">부동산 소유자</td>
                    </tr>
                    <tr className="border-b border-border-base">
                      <td className="py-3 text-text-primary">퇴직금</td>
                      <td className="text-text-secondary">퇴직 예정자</td>
                    </tr>
                    <tr className="border-b border-border-base">
                      <td className="py-3 text-text-primary">프리랜서 종합소득세</td>
                      <td className="text-text-secondary">1인 사업자</td>
                    </tr>
                    <tr>
                      <td className="py-3 text-text-primary">연봉 실수령액</td>
                      <td className="text-text-secondary">근로소득자</td>
                    </tr>
                  </tbody>
                </table>
              </section>

              {/* 계산기 카드 그리드 */}
              <section className="space-y-6">
                <h2 className="text-2xl font-bold text-text-primary">세금 계산기</h2>
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
                            className="rounded-full bg-primary-500 bg-opacity-10 px-3 py-1 text-sm text-primary-500"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <Link
                        href={calc.href}
                        className="inline-block w-fit rounded-lg bg-primary-500 px-4 py-2 font-semibold text-white transition-colors hover:bg-primary-600"
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
                  세금 계산기가 필요한 순간
                </h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-text-primary">집을 매매하기 전</h3>
                    <p className="text-text-secondary">
                      양도소득세와 취득세를 미리 계산해 실제 수령액과 거래 비용을 확인하세요. 특히 조정지역이나 다주택자는 세율이 크게 올라가므로 사전 계산이 필수입니다.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-text-primary">매년 재산세 납부 전</h3>
                    <p className="text-text-secondary">
                      소유 부동산의 공시가격이 바뀌면 재산세도 달라집니다. 계산기로 미리 예상액을 확인해 예산을 준비하세요.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-text-primary">퇴직 계획을 세울 때</h3>
                    <p className="text-text-secondary">
                      퇴직금이 실제로 손에 들어올 때 얼마인지 세금을 포함해 계산합니다. 은퇴 자금 계획을 수립하는 데 필수입니다.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-text-primary">사업 소득을 신고할 때</h3>
                    <p className="text-text-secondary">
                      프리랜서나 1인 사업자는 소득세 신고 전에 경비율을 정확하게 파악해야 종합소득세를 계산할 수 있습니다.
                    </p>
                  </div>
                </div>
              </section>

              {/* 세금 계산기 활용 가이드 */}
              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <h2 className="text-2xl font-bold text-text-primary">세금 계산기를 어떻게 활용하나요?</h2>

                <div className="space-y-6 text-text-secondary">
                  <div>
                    <h3 className="mb-2 font-semibold text-text-primary">부동산 거래 시</h3>
                    <p className="mb-3">
                      부동산을 사고팔 때는 거래 비용을 정확히 예측하는 것이 필수입니다. 양도소득세 계산기로 매각 시 세금 부담을 먼저 확인하고, 취득세 계산기로 매입 시 비용을 파악하세요. 거래 전 최소 2-3주 여유를 두고 계산하면 협상 자료로도 활용할 수 있습니다.
                    </p>
                    <ul className="list-inside list-disc space-y-1 ml-2">
                      <li>매도 예정: 양도소득세 → 세후 수익 확인</li>
                      <li>매수 예정: 취득세 → 총 구매 비용 산출</li>
                      <li>보유 중: 재산세 → 연간 세금 예산 계획</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="mb-2 font-semibold text-text-primary">근로소득 협상 시</h3>
                    <p className="mb-3">
                      이직이나 연봉 협상 시 세전 연봉만으로는 부족합니다. 연봉 실수령액 계산기를 사용해 실제로 통장에 들어올 금액을 확인하세요. 부양가족과 자녀 수도 반영되므로 정확한 세후 금액으로 생활비를 검토할 수 있습니다.
                    </p>
                  </div>

                  <div>
                    <h3 className="mb-2 font-semibold text-text-primary">사업 및 프리랜서</h3>
                    <p className="mb-3">
                      프리랜서나 1인사업자라면 종합소득세 계산기로 연간 세금을 미리 예측해 월별 적립금을 준비하세요. 경비율을 반영한 정확한 계산으로 세금 폭탄을 방지할 수 있습니다.
                    </p>
                  </div>

                  <div>
                    <h3 className="mb-2 font-semibold text-text-primary">생애 주요 사건</h3>
                    <p className="mb-3">
                      퇴직이 예정되거나 상속이 발생했다면 해당 계산기를 통해 미리 세금을 파악하세요. 예상치 못한 세금 고지서로 당황하는 것보다 사전에 준비하는 것이 현명합니다.
                    </p>
                  </div>
                </div>

                <div className="mt-6 space-y-2 rounded-lg bg-highlight-500 bg-opacity-10 p-4">
                  <p className="font-semibold text-highlight-500">💡 활용 팁</p>
                  <ul className="space-y-1 text-sm">
                    <li>• 모든 계산기는 2026년 최신 세율을 반영합니다</li>
                    <li>• 결과는 참고용이며, 정확한 신고는 세무 전문가와 상담하세요</li>
                    <li>• 특수한 상황(감면, 특례)은 개별 확인이 필요합니다</li>
                    <li>• 법인세나 상속세 등은 세무사 자문이 필수입니다</li>
                  </ul>
                </div>
              </section>

              {/* 세금 핵심 용어 */}
              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <h2 className="text-2xl font-bold text-text-primary">세금 계산기 핵심 용어</h2>
                <dl className="space-y-4 text-text-secondary">
                  <div>
                    <dt className="font-semibold text-text-primary">과세표준</dt>
                    <dd className="mt-1">
                      세율을 적용하는 대상이 되는 소득금액. 소득세법 §47에 따라 총소득에서 특정 공제를 뺀 금액입니다. 예를 들어 양도소득세는 양도가액에서 취득가와 비용을 뺀 양도소득이 과세표준이 되며, 여기에 세율을 곱해 세액을 계산합니다.
                    </dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-text-primary">누진공제</dt>
                    <dd className="mt-1">
                      누진세에서 낮은 구간 세금을 자동으로 공제하는 금액(소득세법 §55). 누진세율 테이블에 직접 명시되어 있으며, 과세표준이 높아질수록 실제 세율을 조정하는 역할을 합니다. 이를 통해 세율 구간 경계에서 급격한 세금 증가를 완화합니다.
                    </dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-text-primary">양도소득금액</dt>
                    <dd className="mt-1">
                      부동산 판매 시 실제 이득 = (양도가액 - 취득가 - 필요경비). 소득세법 §93에 따라 계산되며, 이것이 과세표준이 됩니다. 양도가액이 높아도 취득가가 높으면 소득은 작아집니다. 장기보유(2년 이상)하면 양도소득 공제(보유 기간별)가 적용되어 과세표준을 낮춥니다.
                    </dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-text-primary">1세대 1주택 비과세</dt>
                    <dd className="mt-1">
                      소득세법 §94에 따른 세제 혜택으로, 1세대가 1주택만 소유하고 2년 이상 보유·거주 후 공시가격 9억 원 이하로 양도할 때 양도소득세를 내지 않습니다. 가장 강력한 세제 혜택이나 조건이 엄격하며, 다주택 전환 시 비과세 지위가 상실됩니다.
                    </dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-text-primary">경비율</dt>
                    <dd className="mt-1">
                      사업소득에서 필요경비를 계산할 때 국세청이 정한 비율(소득세법 §25). 프리랜서와 1인사업자는 실제 경비를 입증할 수 없을 때 기본경비율을 적용할 수 있습니다. 업종별로 30~80% 범위이며, 경비율 선택이 종합소득세 크기에 큰 영향을 미칩니다.
                    </dd>
                  </div>
                </dl>
              </section>

              {/* 공식 출처 및 법적 근거 */}
              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <h2 className="text-2xl font-bold text-text-primary">공식 출처 및 법적 근거</h2>
                <p className="text-text-secondary">
                  본 카테고리의 모든 계산기는 국세청, 기획재정부, 지방세청의 공식 법령과 지침을 기반합니다. 2026년 개정된 세율과 과세 기준은 기획재정부 보도자료를 통해 즉시 반영되며, 월별로 확인·업데이트됩니다.
                </p>
                <ul className="grid gap-2">
                  <li>
                    <a
                      href="https://www.hometax.go.kr"
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="flex flex-col rounded-xl border border-border-base px-4 py-2 transition-colors hover:border-primary-500"
                    >
                      <span className="font-medium text-primary-500">국세청 홈택스</span>
                      <span className="text-caption text-text-secondary">세금 신고, 납부, 간이 계산기</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.nts.go.kr"
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="flex flex-col rounded-xl border border-border-base px-4 py-2 transition-colors hover:border-primary-500"
                    >
                      <span className="font-medium text-primary-500">국세청</span>
                      <span className="text-caption text-text-secondary">국세 법령, 세율, 공제 해석</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.moef.go.kr"
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="flex flex-col rounded-xl border border-border-base px-4 py-2 transition-colors hover:border-primary-500"
                    >
                      <span className="font-medium text-primary-500">기획재정부</span>
                      <span className="text-caption text-text-secondary">세법 개정안, 세제 정책</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.wetax.go.kr"
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="flex flex-col rounded-xl border border-border-base px-4 py-2 transition-colors hover:border-primary-500"
                    >
                      <span className="font-medium text-primary-500">위택스</span>
                      <span className="text-caption text-text-secondary">지방세(취득세, 재산세) 기준</span>
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
                    href="/category/finance"
                    className="rounded-lg border border-border-base bg-bg-card p-4 transition-all hover:shadow-md"
                  >
                    <h3 className="font-semibold text-primary-500">금융 계산기</h3>
                    <p className="text-sm text-text-secondary">대출·예금·적금 계산</p>
                  </Link>
                  <Link
                    href="/category/work"
                    className="rounded-lg border border-border-base bg-bg-card p-4 transition-all hover:shadow-md"
                  >
                    <h3 className="font-semibold text-primary-500">근로 계산기</h3>
                    <p className="text-sm text-text-secondary">연봉·퇴직금 계산</p>
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
