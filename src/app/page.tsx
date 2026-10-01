import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import {
  buildOrganizationJsonLd,
  buildWebSiteJsonLd,
  buildWebPageJsonLd,
  buildFaqPageJsonLd,
} from '@/lib/seo/jsonld';

export const metadata: Metadata = {
  title: '한국 금융·세금·부동산 계산기 31개 | calculatorhost',
  description:
    '연봉 실수령액·대출이자·취득세·적금 등 생활 계산기 31개. 내 조건에 따른 예상값과 계산 기준을 함께 확인하세요. 회원가입 없이 무료로 이용할 수 있습니다.',
  alternates: { canonical: 'https://calculatorhost.com/' },
};
const POPULAR = [
  { href: '/calculator/salary', title: '연봉 실수령액', tag: '근로' },
  { href: '/calculator/capital-gains-tax', title: '양도소득세', tag: '세금' },
  { href: '/calculator/acquisition-tax', title: '취득세', tag: '세금' },
  { href: '/calculator/loan', title: '대출이자', tag: '금융' },
  { href: '/calculator/severance', title: '퇴직금', tag: '근로' },
  { href: '/calculator/broker-fee', title: '중개수수료', tag: '부동산' },
] as const;
interface CalcItem {
  href: string;
  title: string;
}
interface CalcCategory {
  category: string;
  items: CalcItem[];
}
const ALL_CALCULATORS: CalcCategory[] = [
  // 세금
  {
    category: '세금',
    items: [
      { href: '/calculator/capital-gains-tax', title: '양도소득세' },
      { href: '/calculator/acquisition-tax', title: '취득세' },
      { href: '/calculator/property-tax', title: '재산세' },
      { href: '/calculator/comprehensive-property-tax', title: '종합부동산세' },
      { href: '/calculator/gift-tax', title: '증여세' },
      { href: '/calculator/inheritance-tax', title: '상속세' },
      { href: '/calculator/vehicle-tax', title: '자동차세' },
      { href: '/calculator/child-tax-credit', title: '자녀장려금' },
      { href: '/calculator/freelancer-tax', title: '프리랜서 종합소득세' },
      { href: '/calculator/n-jobber-insurance', title: 'N잡러 건강보험' },
      { href: '/calculator/vat', title: '부가가치세(VAT)' },
    ],
  },
  // 금융
  {
    category: '금융',
    items: [
      { href: '/calculator/loan', title: '대출이자' },
      { href: '/calculator/loan-limit', title: '대출한도(DSR/LTV)' },
      { href: '/calculator/dti', title: 'DTI (총부채상환비율)' },
      { href: '/calculator/savings', title: '적금 이자' },
      { href: '/calculator/deposit', title: '정기예금 이자' },
      { href: '/calculator/exchange', title: '환율·환전' },
      { href: '/calculator/inflation', title: '화폐가치 (인플레이션)' },
      { href: '/calculator/averaging-down', title: '물타기 (주식·코인)' },
      { href: '/calculator/split-buy', title: '분할매수 (주식·코인)' },
      { href: '/calculator/split-sell', title: '분할매도 (주식·코인)' },
      { href: '/calculator/retirement', title: '은퇴자금 (FIRE)' },
    ],
  },
  // 근로
  {
    category: '근로',
    items: [
      { href: '/calculator/salary', title: '연봉 실수령액' },
      { href: '/calculator/severance', title: '퇴직금' },
    ],
  },
  // 부동산
  {
    category: '부동산',
    items: [
      { href: '/calculator/broker-fee', title: '중개수수료' },
      { href: '/calculator/rent-conversion', title: '전월세전환율' },
      { href: '/calculator/area', title: '평수·㎡ 환산' },
      { href: '/calculator/rental-yield', title: '임대수익률' },
      { href: '/calculator/housing-subscription', title: '청약가점' },
    ],
  },
  // 생활
  {
    category: '생활',
    items: [
      { href: '/calculator/bmi', title: 'BMI' },
      { href: '/calculator/d-day', title: 'D-day' },
    ],
  },
];
const FLOWS = [
  {
    title: '월급에서 저축까지',
    steps: '실수령액 → 내가 정한 저축액 → 적금 만기액',
    href: '/calculator/salary/',
    action: '월 실수령액 확인',
    note: '생활비를 고려해 매월 저축할 금액을 직접 정하세요.',
  },
  {
    title: '대출 부담을 가볍게 비교',
    steps: '대출 조건 → 월 상환액 → 상환 방식 비교',
    href: '/calculator/loan/',
    action: '월 상환액 확인',
    note: '거치 기간과 월별 상환 내역도 확인할 수 있어요.',
  },
  {
    title: '집을 살 때 드는 비용',
    steps: '주택 가격 → 취득세 → 중개수수료',
    href: '/calculator/acquisition-tax/',
    action: '취득세 확인',
    note: '세금과 거래 비용을 각각 계산해 자금 계획에 참고하세요.',
  },
] as const;
const HOME_FAQ = [
  {
    question: '회원가입이 필요한가요?',
    answer: '모든 계산기는 회원가입 없이 무료로 이용할 수 있습니다.',
  },
  {
    question: '결과가 실제 납부 금액과 같은가요?',
    answer:
      '계산 결과는 입력한 조건에 따른 참고값입니다. 계산 기준과 가정을 확인하고, 실제 세금이나 금융 거래는 담당 기관에 확인해 주세요.',
  },
  {
    question: '입력한 금액은 어디에 저장되나요?',
    answer:
      '계산기 입력은 이 브라우저의 현재 세션에 보관합니다. 뒤로 돌아와도 이어서 계산할 수 있으며, 급여나 자산 금액을 분석 이벤트 또는 URL에 자동으로 보내지 않습니다.',
  },
];

export default function HomePage() {
  const items = ALL_CALCULATORS.flatMap((cat) => cat.items);
  const schemas = [
    buildOrganizationJsonLd(),
    buildWebSiteJsonLd(),
    buildWebPageJsonLd({
      name: '한국 금융·세금·부동산 계산기 모음',
      description: metadata.description as string,
      url: 'https://calculatorhost.com/',
      datePublished: '2026-04-24',
      dateModified: '2026-09-30',
      isPartOf: 'https://calculatorhost.com/#website',
    }),
    buildFaqPageJsonLd(HOME_FAQ),
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      itemListElement: items.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.title,
        url: 'https://calculatorhost.com' + item.href + '/',
      })),
    },
  ];
  return (
    <>
      {schemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <Header />
      <main id="main-content" className="mx-auto max-w-6xl space-y-10 px-4 py-7 md:px-8 md:py-10">
        <header>
          <p className="mb-2 text-sm font-medium text-primary-700 dark:text-primary-300">
            생활에 필요한 31가지 계산
          </p>
          <h1 className="text-2xl font-bold leading-tight md:text-3xl">
            얼마가 남을지, 얼마나 필요할지.
          </h1>
          <p className="mt-3 max-w-2xl text-base text-text-secondary">
            월급부터 대출·세금까지, 내 생활에 필요한 계산을 한곳에서.
          </p>
        </header>
        <section aria-labelledby="popular-calculators">
          <h2 id="popular-calculators" className="mb-4 text-lg font-semibold">
            자주 찾는 계산기
          </h2>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
            {POPULAR.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex min-h-24 flex-col justify-center rounded-2xl border border-border-base bg-bg-card px-4 py-4 shadow-sm hover:border-primary-500 hover:bg-primary-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 dark:hover:bg-bg-raised md:px-6"
              >
                <span className="text-sm text-text-tertiary">{item.tag}</span>
                <span className="mt-1 font-semibold">
                  {item.title}{' '}
                  <span aria-hidden className="ml-1 text-primary-500">
                    ↗
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </section>
        <section aria-labelledby="purpose-flows">
          <h2 id="purpose-flows" className="mb-4 text-lg font-semibold">
            답에서 다음 계획까지
          </h2>
          <div className="grid gap-4 md:grid-cols-3">
            {FLOWS.map((flow) => (
              <article
                key={flow.href}
                className="flex min-w-0 flex-col border-l-2 border-primary-200 py-1 pl-4 dark:border-primary-700"
              >
                <h3 className="text-lg font-semibold">{flow.title}</h3>
                <p className="mt-3 text-sm font-medium text-primary-700 dark:text-primary-300">
                  {flow.steps}
                </p>
                <p className="my-3 text-sm text-text-secondary">{flow.note}</p>
                <Link
                  href={flow.href}
                  className="mt-auto inline-flex min-h-12 items-center self-start font-semibold text-primary-700 focus-visible:rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 dark:text-primary-300"
                >
                  {flow.action}{' '}
                  <span aria-hidden className="ml-2">
                    →
                  </span>
                </Link>
              </article>
            ))}
          </div>
        </section>
        <section
          id="all-calculators"
          aria-labelledby="all-title"
          className="border-t border-border-base pt-6"
        >
          <div className="mb-4 flex items-baseline justify-between gap-4">
            <h2 id="all-title" className="text-lg font-semibold">
              전체 계산기
            </h2>
            <span className="text-sm text-text-tertiary">31개 · 무료</span>
          </div>
          <div className="grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
            {ALL_CALCULATORS.map((cat) => (
              <div key={cat.category}>
                <h3 className="border-b border-border-base pb-2 text-sm font-semibold text-text-tertiary">
                  {cat.category}
                </h3>
                <ul>
                  {cat.items.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="flex min-h-12 items-center justify-between gap-3 border-b border-border-subtle py-2 text-base hover:text-primary-700 focus-visible:rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 dark:hover:text-primary-300"
                      >
                        <span>{item.title}</span>
                        <span aria-hidden className="text-text-tertiary">
                          ↗
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
        <section className="border-t border-border-base pt-6" aria-label="이용 안내">
          <h2 className="mb-3 text-lg font-semibold">이용 안내</h2>
          {HOME_FAQ.map((item) => (
            <details key={item.question} className="border-b border-border-subtle py-3">
              <summary className="min-h-8 cursor-pointer font-medium">{item.question}</summary>
              <p className="pt-3 text-sm text-text-secondary">{item.answer}</p>
            </details>
          ))}
          <p className="mt-4 text-sm text-text-tertiary">
            산식과 공식 출처는 각 계산기의 ‘계산 기준’에서 확인하세요.{' '}
            <Link href="/updates/" className="underline">
              변경 이력
            </Link>{' '}
            ·{' '}
            <Link
              href="/guide/"
              className="inline-flex min-h-12 items-center underline focus-visible:rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
            >
              계산·생활정보
            </Link>
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}
