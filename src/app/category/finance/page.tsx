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

const URL = 'https://calculatorhost.com/category/finance';

export const metadata: Metadata = {
  title: '금융 계산기 모음 2026 | 대출·예금·적금',
  description:
    '2026년 최신 금리 반영 대출이자, 대출한도(DSR), 예금 이자, 적금 이자 계산기. 주담대·전세대출·신용대출 월 상환액과 예상 이자를 정확하게 계산하세요.',
  alternates: { canonical: URL },
  openGraph: {
    title: '금융 계산기 모음 2026',
    description: '대출·예금·적금 계산기 모음',
    url: URL,
    type: 'website',
  },
};

const CALCULATORS = [
  {
    title: '대출이자 계산기',
    description: '대출 원금, 금리, 상환 기간을 입력하면 월 상환액과 총 이자액을 계산합니다. 원리금균등·만기일시 방식 모두 지원합니다.',
    href: '/calculator/loan',
    tags: ['대출', '금리'],
  },
  {
    title: '대출한도 (DSR) 계산기',
    description: '소득, 기존 대출 현황을 기반으로 추가 대출 가능 한도를 DSR 기준으로 계산합니다. 주담대 가능액을 파악하세요.',
    href: '/calculator/loan-limit',
    tags: ['주담대', '한도'],
  },
  {
    title: '정기예금 이자 계산기',
    description: '예금액, 금리, 기간을 입력하면 세후 이자를 계산합니다. 이자소득세와 지방소득세가 자동 공제됩니다.',
    href: '/calculator/deposit',
    tags: ['예금', '이자'],
  },
  {
    title: '적금 이자 계산기',
    description: '월 적립액과 금리로 만기 시 받을 원리금을 계산합니다. 월급 자동이체 예상액을 파악하세요.',
    href: '/calculator/savings',
    tags: ['적금', '이자'],
  },
];

const FAQ_ITEMS = [
  {
    question: '원리금균등과 만기일시 상환의 차이는?',
    answer:
      '원리금균등 방식은 매월 원금과 이자를 합쳐 같은 금액을 상환하는 방식입니다. 만기일시 방식은 만기까지 이자만 납부하다가 만기에 원금을 한 번에 상환합니다. 초반 부담은 만기일시가 적지만, 만기에 큰 자금이 필요합니다.',
  },
  {
    question: 'DSR은 무엇이고 어떻게 계산되나요?',
    answer:
      'DSR(Debt Service Ratio)은 연 소득 대비 모든 대출 상환액의 비율입니다. 금감원이 권고하는 한도는 40% 수준이며, 이를 초과하면 신규 대출을 받기 어렵습니다. 계산식은 (연간 모든 대출 상환액 ÷ 연 소득) × 100 입니다.',
  },
  {
    question: '예금 이자에는 세금이 떨어지나요?',
    answer:
      '네, 정기예금과 정기적금의 이자소득은 15.4% 세금(이자소득세 14% + 지방소득세 1.4%)이 자동으로 공제됩니다. 계산기가 세후 이자를 자동 계산해 주므로 실제 받을 금액을 확인할 수 있습니다.',
  },
  {
    question: '고금리 적금은 실제 얼마의 이자를 받나요?',
    answer:
      '고금리 적금도 이자소득세가 부과됩니다. 예를 들어 5% 적금의 실제 이자 수령률은 약 4.23% 수준입니다. 금리가 높을수록 세금도 많이 떨어지므로 반드시 세후 기준으로 계산해야 합니다.',
  },
];

export default function FinanceCategoryPage() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '금융' },
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
                    { name: '금융 계산기' },
                  ]}
                />
                <h1 className="mb-4 text-4xl font-bold text-text-primary">
                  금융 계산기 모음 2026
                </h1>
                <p className="text-lg text-text-secondary">
                  대출금의 월 상환액, 대출 가능 한도, 예금과 적금의 세후 이자를 한 곳에서 계산하세요. 금융 의사결정을 위한 정확한 숫자를 확인할 수 있습니다.
                </p>
              </div>

              {/* AD-1 리더보드 */}
              <AdSlot
                slot="category-finance-top"
                format="horizontal"
                className="my-6 rounded-lg border border-border-base"
              />

              {/* Structured Summary */}
              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <h2 className="text-xl font-semibold text-text-primary">금융 계산기 라인업</h2>
                <p className="text-text-secondary">
                  아래 4가지 계산기는 대출자, 예금자, 적금자의 금융 의사결정을 돕습니다.
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
                      <td className="py-3 text-text-primary">대출이자</td>
                      <td className="text-text-secondary">주담대·전세대출·신용대출 차입자</td>
                    </tr>
                    <tr className="border-b border-border-base">
                      <td className="py-3 text-text-primary">대출한도 (DSR)</td>
                      <td className="text-text-secondary">추가 대출 계획자</td>
                    </tr>
                    <tr className="border-b border-border-base">
                      <td className="py-3 text-text-primary">정기예금 이자</td>
                      <td className="text-text-secondary">예금 가입자</td>
                    </tr>
                    <tr>
                      <td className="py-3 text-text-primary">적금 이자</td>
                      <td className="text-text-secondary">월급 저축자</td>
                    </tr>
                  </tbody>
                </table>
              </section>

              {/* 계산기 카드 그리드 */}
              <section className="space-y-6">
                <h2 className="text-2xl font-bold text-text-primary">금융 계산기</h2>
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
                            className="rounded-full bg-secondary-500 bg-opacity-10 px-3 py-1 text-sm text-secondary-500"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <Link
                        href={calc.href}
                        className="inline-block w-fit rounded-lg bg-secondary-500 px-4 py-2 font-semibold text-white transition-colors hover:bg-secondary-600"
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
                  금융 계산기가 필요한 순간
                </h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-text-primary">주택담보대출 실행 전</h3>
                    <p className="text-text-secondary">
                      예상 금리로 월 상환액과 총 이자액을 미리 계산해 월 예산을 확보하세요. 금리가 0.1% 올라가도 장기 상환액에는 큰 영향을 미칩니다.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-text-primary">추가 대출을 받기 전</h3>
                    <p className="text-text-secondary">
                      현재 소득과 기존 대출 상황에서 추가 대출 가능액을 DSR 기준으로 계산합니다. 은행에서 제시한 한도가 적절한지 판단할 수 있습니다.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-text-primary">예금·적금에 가입할 때</h3>
                    <p className="text-text-secondary">
                      고금리 상품도 세후 이자는 다릅니다. 실제 받을 세후 이자를 미리 계산해 상품을 비교하세요.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-text-primary">금리 인상/인하 뉴스를 들을 때</h3>
                    <p className="text-text-secondary">
                      금리 변동이 실제 월 상환액에 미치는 영향을 계산해 금융 뉴스를 더 정확하게 이해할 수 있습니다.
                    </p>
                  </div>
                </div>
              </section>

              {/* 금융 핵심 용어 */}
              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <h2 className="text-2xl font-bold text-text-primary">금융 계산기 핵심 용어</h2>
                <dl className="space-y-4 text-text-secondary">
                  <div>
                    <dt className="font-semibold text-text-primary">DSR (Debt Service Ratio)</dt>
                    <dd className="mt-1">
                      연간 모든 대출 상환액을 연 소득으로 나눈 비율(%). 금융감독원이 권고하는 한도는 40% 수준이며, 이를 초과하면 신규 대출을 받기 어렵습니다. 주담대 실행 전에 현재 소득과 기존 대출로부터 추가 대출 가능액을 판단하는 핵심 지표입니다.
                    </dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-text-primary">LTV (Loan to Value)</dt>
                    <dd className="mt-1">
                      대출액을 담보 부동산 시가로 나눈 비율(%). 은행의 담보 인정 범위를 결정하며, 조정지역과 다주택 보유 여부에 따라 규제됩니다. 일반적으로 70~80% 이내에서만 대출이 가능하며, 높은 LTV는 금리 인상 또는 대출 불승인의 요인이 됩니다.
                    </dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-text-primary">원리금균등상환</dt>
                    <dd className="mt-1">
                      매월 동일한 금액의 원금 + 이자를 갚는 방식. 초반에는 이자 비중이 높고 후반으로 갈수록 원금 비중이 높아집니다. 계획적인 상환이 가능하고 총 이자액도 방식 중 가장 적어 일반적으로 선호됩니다.
                    </dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-text-primary">만기일시상환</dt>
                    <dd className="mt-1">
                      만기까지 매월 이자만 내다가 만기에 원금을 일시에 상환하는 방식. 초반 월 부담은 적지만, 만기에 큰 자금(원금 전액)이 필요합니다. 부동산 담보대출이나 사업자금에 주로 사용되며, 금리 인상 시 월 이자 부담도 함께 늘어납니다.
                    </dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-text-primary">이자소득세</dt>
                    <dd className="mt-1">
                      정기예금·적금의 이자 수익에 부과되는 세금. 2026년 기준 14% 이자소득세 + 1.4% 지방소득세 = 15.4%가 자동 공제됩니다. 고금리 상품도 이 세율은 동일하므로, 세후 이자를 기준으로 상품을 비교해야 실제 수익을 정확하게 판단할 수 있습니다.
                    </dd>
                  </div>
                </dl>
              </section>

              {/* 공식 출처 및 법적 근거 */}
              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <h2 className="text-2xl font-bold text-text-primary">공식 출처 및 법적 근거</h2>
                <p className="text-text-secondary">
                  본 카테고리의 모든 계산기는 한국은행, 금융감독원, 은행권 공식 지침을 기반으로 합니다. 기준금리와 DSR 규제는 월별로 변동되며, 금리는 각 금융기관의 실시간 공시 기준을 참고해 사용자가 직접 입력하도록 설계되었습니다.
                </p>
                <ul className="grid gap-2">
                  <li>
                    <a
                      href="https://www.bok.or.kr"
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="flex flex-col rounded-xl border border-border-base px-4 py-2 transition-colors hover:border-secondary-500"
                    >
                      <span className="font-medium text-secondary-500">한국은행</span>
                      <span className="text-caption text-text-secondary">기준금리, 통화정책, 금리 동향</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.fss.or.kr"
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="flex flex-col rounded-xl border border-border-base px-4 py-2 transition-colors hover:border-secondary-500"
                    >
                      <span className="font-medium text-secondary-500">금융감독원</span>
                      <span className="text-caption text-text-secondary">DSR·LTV 기준, 가계대출 규제</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://finlife.fss.or.kr"
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="flex flex-col rounded-xl border border-border-base px-4 py-2 transition-colors hover:border-secondary-500"
                    >
                      <span className="font-medium text-secondary-500">금감원 금융상품 한눈에</span>
                      <span className="text-caption text-text-secondary">예적금·대출 상품 비교·공시 금리</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://portal.kfb.or.kr"
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="flex flex-col rounded-xl border border-border-base px-4 py-2 transition-colors hover:border-secondary-500"
                    >
                      <span className="font-medium text-secondary-500">은행연합회 소비자포털</span>
                      <span className="text-caption text-text-secondary">은행별 금리 공시, 상품 안내</span>
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
                  본 계산기는 일반적인 금리와 공식을 기반으로 하며, 실제 금리는 개별 금융기관 및 신용도에 따라 달라질 수 있습니다. 정확한 대출 조건은 은행에 직접 문의하시기 바랍니다.
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
