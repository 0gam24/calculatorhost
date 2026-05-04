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
} from '@/lib/seo/jsonld';

const URL = 'https://calculatorhost.com/category/real-estate/';

export const metadata: Metadata = {
  title: '부동산 계산기 모음 2026 | 양도세·중개수수료·평수',
  description:
    '2026년 최신 상정 반영 부동산 거래 관련 계산기. 양도소득세, 취득세, 재산세, 중개수수료, 전월세전환, 평수 환산을 한 곳에서 계산하세요.',
  alternates: { canonical: URL },
  openGraph: {
    title: '부동산 계산기 모음 2026',
    description: '양도세·취득세·중개수수료 계산기 모음',
    url: URL,
    type: 'website',
    images: ['/og-default.png'],
  },
};

const CALCULATORS = [
  {
    title: '양도소득세 계산기',
    description: '주택 또는 토지 매각 시 발생하는 양도소득세를 계산합니다. 보유 기간, 조정지역, 다주택 여부를 반영합니다.',
    href: '/calculator/capital-gains-tax',
    tags: ['매각', '세금'],
  },
  {
    title: '취득세 계산기',
    description: '부동산 매입 시 납부하는 취득세와 농특세, 지방교육세를 2026년 최신 세율로 계산합니다.',
    href: '/calculator/acquisition-tax',
    tags: ['구매', '세금'],
  },
  {
    title: '재산세 계산기',
    description: '보유 중인 부동산에 대한 연간 재산세를 공시가격 기준으로 계산합니다.',
    href: '/calculator/property-tax',
    tags: ['보유', '세금'],
  },
  {
    title: '중개수수료 계산기',
    description: '부동산 거래 시 부동산중개소에 지급하는 중개수수료를 거래가격과 거래 유형에 따라 계산합니다.',
    href: '/calculator/broker-fee',
    tags: ['거래비용', '중개'],
  },
  {
    title: '전월세 전환율 계산기',
    description: '보증금을 월세(또는 반대)로 변환할 때 공정한 전환율을 계산합니다. 금리와 기간을 반영합니다.',
    href: '/calculator/rent-conversion',
    tags: ['전월세', '환산'],
  },
  {
    title: '평수 환산 계산기',
    description: '제곱미터를 평수로 또는 평수를 제곱미터로 환산합니다. 부동산 공시가 확인에 필수입니다.',
    href: '/calculator/area',
    tags: ['단위환산', '면적'],
  },
];

const FAQ_ITEMS = [
  {
    question: '중개수수료는 얼마인가요?',
    answer:
      '부동산 중개수수료는 거래가격의 0.1~0.5% 범위입니다. 가격대별로 세분화되는데, 일반적으로 저가 부동산은 0.5%, 고가 부동산은 0.1%에 가깝습니다. 정부 실거래가 공개 시스템에서 유사 거래 사례를 확인할 수 있습니다.',
  },
  {
    question: '전월세 전환율은 보통 몇 %인가요?',
    answer:
      '전월세 전환율은 금리 상황에 따라 변합니다. 저금리 시기에는 보증금 1억 원이 월 30~40만 원 대의 월세로 변환되며, 고금리 시기에는 월 50~70만 원대까지 올라갑니다. 금리가 0.1% 변하면 월세도 수십만 원씩 달라집니다.',
  },
  {
    question: '1평은 정확히 몇 제곱미터인가요?',
    answer:
      '1평은 정확히 3.3058㎡입니다. 부동산 거래에서는 공식적으로 이 수치를 기준으로 합니다. 84.6㎡ = 약 25.6평, 85㎡ = 약 25.7평 정도로 환산됩니다.',
  },
  {
    question: '양도세와 취득세를 모두 내야 하나요?',
    answer:
      '네, 같은 거래에서 판매자는 양도소득세를 내고 구매자는 취득세를 냅니다. 이는 별도 세금이므로 거래 시 양쪽 모두 세금을 부담해야 합니다. 거래가가 높을수록 부담이 커지므로 거래 전에 반드시 계산해야 합니다.',
  },
  {
    question: '생애 첫 주택 구입 시 취득세 감면이 있나요?',
    answer:
      '생애최초 주택 구입 시 취득세가 감면되는 제도가 있었으나, 현재는 축소되었습니다. 정부 정책에 따라 수시로 변경되므로 시점의 취득세 계산기를 통해 감면 여부를 확인하는 것이 정확합니다.',
  },
];

export default function RealEstateCategoryPage() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '부동산' },
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
                    { name: '부동산 계산기' },
                  ]}
                />
                <h1 className="mb-4 text-4xl font-bold text-text-primary">
                  부동산 계산기 모음 2026
                </h1>
                <p className="text-lg text-text-secondary">
                  부동산 거래, 보유, 임대차의 모든 계산을 한 곳에서 처리하세요. 세금, 중개수수료, 면적 환산, 전월세 전환까지 부동산 의사결정에 필요한 정확한 숫자를 확인할 수 있습니다.
                </p>
              </div>

              {/* AD-1 리더보드 */}
              <AdSlot
                slot="category-real-estate-top"
                format="horizontal"
                className="my-6 rounded-lg border border-border-base"
              />

              {/* Structured Summary */}
              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <h2 className="text-xl font-semibold text-text-primary">부동산 계산기 라인업</h2>
                <p className="text-text-secondary">
                  아래 6가지 계산기는 부동산 거래자, 임차인, 임대인의 거래와 보유 관련 계산을 돕습니다.
                </p>
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b border-border-base">
                      <th className="py-3 text-left text-text-primary">계산기</th>
                      <th className="py-3 text-left text-text-primary">용도</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-border-base">
                      <td className="py-3 text-text-primary">양도소득세</td>
                      <td className="text-text-secondary">주택 판매 시 세금 계산</td>
                    </tr>
                    <tr className="border-b border-border-base">
                      <td className="py-3 text-text-primary">취득세</td>
                      <td className="text-text-secondary">주택 구매 시 세금 계산</td>
                    </tr>
                    <tr className="border-b border-border-base">
                      <td className="py-3 text-text-primary">재산세</td>
                      <td className="text-text-secondary">매년 보유세 계산</td>
                    </tr>
                    <tr className="border-b border-border-base">
                      <td className="py-3 text-text-primary">중개수수료</td>
                      <td className="text-text-secondary">거래 시 중개인 비용 계산</td>
                    </tr>
                    <tr className="border-b border-border-base">
                      <td className="py-3 text-text-primary">전월세 전환율</td>
                      <td className="text-text-secondary">보증금 ↔ 월세 변환</td>
                    </tr>
                    <tr>
                      <td className="py-3 text-text-primary">평수 환산</td>
                      <td className="text-text-secondary">면적 단위 변환</td>
                    </tr>
                  </tbody>
                </table>
              </section>

              {/* 계산기 카드 그리드 */}
              <section className="space-y-6">
                <h2 className="text-2xl font-bold text-text-primary">부동산 계산기</h2>
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
                            className="rounded-full bg-danger-500 bg-opacity-10 px-3 py-1 text-sm text-danger-500"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <Link
                        href={calc.href}
                        className="inline-block w-fit rounded-lg bg-danger-500 px-4 py-2 font-semibold text-white transition-colors hover:bg-danger-600"
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
                  부동산 계산기가 필요한 순간
                </h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-text-primary">집 거래 계약을 하기 전</h3>
                    <p className="text-text-secondary">
                      양도세(판매자), 취득세(구매자), 중개수수료를 모두 계산해 실제 수령액과 실제 구매비를 확인합니다. 수억 원대 거래에서 실수하면 큰 손실이 발생합니다.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-text-primary">전세나 월세를 알아볼 때</h3>
                    <p className="text-text-secondary">
                      전월세 전환율 계산기로 제시된 조건이 시장 가격에 부합하는지 확인합니다. 보증금과 월세의 조합이 합리적인지 판단할 수 있습니다.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-text-primary">광고에서 본 평수를 이해할 때</h3>
                    <p className="text-text-secondary">
                      "60평", "84㎡" 등 다양한 면적 표기가 혼재할 때 평수 환산 계산기로 통일된 기준으로 비교합니다.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-text-primary">매년 재산세 납부 전</h3>
                    <p className="text-text-secondary">
                      소유 부동산의 공시가격 변동이 재산세에 미치는 영향을 미리 계산해 세금 납부 예산을 준비합니다.
                    </p>
                  </div>
                </div>
              </section>

              {/* 부동산 핵심 용어 */}
              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <h2 className="text-2xl font-bold text-text-primary">부동산 계산기 핵심 용어</h2>
                <dl className="space-y-4 text-text-secondary">
                  <div>
                    <dt className="font-semibold text-text-primary">공시가격</dt>
                    <dd className="mt-1">
                      정부가 부동산의 공정한 시장가격을 추정해 공시하는 가격. 재산세, 취득세, 종합부동산세의 기준이 되며, 매년 1월 공시됩니다. 실제 거래가와 다를 수 있지만, 세금 계산의 법정 기준이므로 공시가격에 따라 세금이 크게 달라집니다.
                    </dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-text-primary">공정시장가액비율</dt>
                    <dd className="mt-1">
                      실제 거래가격을 공시가격으로 나눈 비율로, 시장 수급을 반영합니다. 이 비율이 높으면 공시가격이 낮다는 뜻이고, 낮으면 공시가격이 높다는 뜻입니다. 2026년 기준 60% 정도이며, 종합부동산세 과세표준 산정 시 사용됩니다.
                    </dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-text-primary">조정대상지역</dt>
                    <dd className="mt-1">
                      정부가 가격 상승이 심한 지역으로 지정해 부동산 거래를 규제하는 지역. 취득세와 양도세 세율이 일반지역보다 높으며, 대출 규제(LTV·DSR 강화)도 더 엄격합니다. 조정지역 부동산은 거래 시 세금 부담이 크므로 사전에 정확히 계산해야 합니다.
                    </dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-text-primary">전월세 전환율</dt>
                    <dd className="mt-1">
                      보증금을 월세로, 또는 월세를 보증금으로 환산할 때의 비율. 금리 상황에 따라 변동되며, 저금리 시기에는 보증금 대비 월세가 낮고, 고금리 시기에는 높습니다. 공정한 거래를 위해 시세 기준 전환율을 확인하는 것이 중요합니다.
                    </dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-text-primary">환산보증금</dt>
                    <dd className="mt-1">
                      월세를 기준으로 계산한 보증금 상당액. 월세 거주 중 전월세 전환을 고려할 때나, 전세 계약으로 전환할 때 사용됩니다. 현재 금리 수준에서 월세 수익이 보증금 형태로는 얼마나 되는지를 나타내므로 전환의 공정성을 판단하는 기준이 됩니다.
                    </dd>
                  </div>
                </dl>
              </section>

              {/* 공식 출처 및 법적 근거 */}
              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <h2 className="text-2xl font-bold text-text-primary">공식 출처 및 법적 근거</h2>
                <p className="text-text-secondary">
                  본 카테고리의 모든 계산기는 국토교통부, 한국부동산원, 국세청의 공식 자료를 기반으로 합니다. 공시가격은 매년 1월에 갱신되며, 실거래가와 조정대상지역 지정은 월별로 변동되므로 최신 정보 확인 필수입니다.
                </p>
                <ul className="grid gap-2">
                  <li>
                    <a
                      href="https://rt.molit.go.kr"
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="flex flex-col rounded-xl border border-border-base px-4 py-2 transition-colors hover:border-danger-500"
                    >
                      <span className="font-medium text-danger-500">국토부 실거래가 공개</span>
                      <span className="text-caption text-text-secondary">부동산 거래 시세, 지역별 시세</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.reb.or.kr"
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="flex flex-col rounded-xl border border-border-base px-4 py-2 transition-colors hover:border-danger-500"
                    >
                      <span className="font-medium text-danger-500">한국부동산원</span>
                      <span className="text-caption text-text-secondary">공시가격, 시세 분석 자료</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.wetax.go.kr"
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="flex flex-col rounded-xl border border-border-base px-4 py-2 transition-colors hover:border-danger-500"
                    >
                      <span className="font-medium text-danger-500">위택스</span>
                      <span className="text-caption text-text-secondary">취득세, 재산세 세율 기준</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.applyhome.co.kr"
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="flex flex-col rounded-xl border border-border-base px-4 py-2 transition-colors hover:border-danger-500"
                    >
                      <span className="font-medium text-danger-500">청약홈</span>
                      <span className="text-caption text-text-secondary">주택청약, 분양권 정보</span>
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
                    href="/category/work"
                    className="rounded-lg border border-border-base bg-bg-card p-4 transition-all hover:shadow-md"
                  >
                    <h3 className="font-semibold text-highlight-500">근로 계산기</h3>
                    <p className="text-sm text-text-secondary">연봉·퇴직금 계산</p>
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
