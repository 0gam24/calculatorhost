import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { Footer } from '@/components/layout/Footer';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import {
  buildBreadcrumbJsonLd,
  buildWebPageJsonLd,
  buildDefinedTermSetJsonLd,
  buildSpeakableJsonLd,
  type DefinedTermEntry,
} from '@/lib/seo/jsonld';

const URL = 'https://calculatorhost.com/glossary/';
const DATE_PUBLISHED = '2026-05-03';
const DATE_MODIFIED = '2026-05-03';

export const metadata: Metadata = {
  title: '금융·세금·투자 용어사전 2026 | calculatorhost',
  description:
    '한국 거주자가 일상에서 자주 마주치는 금융·세금·부동산·투자 핵심 용어 정의 모음. DSR·LTV·양도차익·장기보유공제·평균단가·BEP 등을 법조항·공식 출처와 함께 정리.',
  alternates: { canonical: URL },
  openGraph: {
    title: '금융·세금·투자 용어사전 — calculatorhost',
    description: 'DSR·LTV·양도차익·평단·BEP 등 핵심 용어 정의 + 법적 근거.',
    url: URL,
    type: 'website',
    images: ['/og-default.png'],
    locale: 'ko_KR',
  },
  twitter: {
    card: 'summary_large_image',
    title: '금융·세금·투자 용어사전',
    description: 'DSR·LTV·양도차익·평단·BEP 등 핵심 용어 정의.',
    images: ['/og-default.png'],
  },
};

interface GlossarySection {
  category: string;
  description: string;
  terms: Array<DefinedTermEntry & { relatedCalculator?: { href: string; label: string } }>;
}

const GLOSSARY: GlossarySection[] = [
  {
    category: '금융·대출',
    description: '대출한도·이자·예적금 관련 핵심 용어',
    terms: [
      {
        name: 'DSR (부채원리금상환비율)',
        alternateName: 'DSR',
        description:
          'Debt Service Ratio. 모든 금융권 대출의 연간 원리금 상환액을 연소득으로 나눈 비율. 은행 40%, 2금융권 50% 이하로 규제. 산식: (신규+기존 모든 대출 연원리금) ÷ 연소득 × 100. 근거: 은행법 시행령 §24의4.',
        url: 'https://www.fss.or.kr',
        relatedCalculator: { href: '/calculator/loan-limit/', label: '대출한도 계산기' },
      },
      {
        name: 'LTV (담보인정비율)',
        alternateName: 'LTV',
        description:
          'Loan To Value. 대출액을 담보가치로 나눈 비율. 비규제 70%, 조정·투기과열 50%, 생애최초·서민실수요 80%. 산식: 신규 대출액 ÷ 담보가치(주택가격) × 100.',
        url: 'https://www.fss.or.kr',
        relatedCalculator: { href: '/calculator/loan-limit/', label: '대출한도 계산기' },
      },
      {
        name: 'DTI (부채상환비율)',
        alternateName: 'DTI',
        description:
          'Debt To Income ratio. 신규 대출 원리금과 기존 대출 이자를 합산해 연소득으로 나눈 비율. 규제지역 40%, 비규제지역 50%. DSR과 달리 기존 대출은 이자만 포함.',
        relatedCalculator: { href: '/calculator/loan-limit/', label: '대출한도 계산기' },
      },
      {
        name: '스트레스 DSR',
        description:
          '변동금리·혼합형·주기형 대출의 DSR 산정 시 현재 금리에 1.5%p(2026년 풀 적용)를 가산해 부담 능력을 보수적으로 평가하는 제도. 시행: 2024년 2월 도입 → 2026년 전면 적용.',
        relatedCalculator: { href: '/calculator/loan-limit/', label: '대출한도 계산기' },
      },
      {
        name: '원리금균등상환',
        description:
          '대출 원금과 이자를 합한 월 상환액이 매월 동일한 방식. 초기엔 이자 비중이 높고 후기엔 원금 비중이 높아짐. 가장 흔한 주담대 상환 방식.',
        relatedCalculator: { href: '/calculator/loan/', label: '대출이자 계산기' },
      },
      {
        name: '이자소득세',
        description:
          '예금·적금·채권 등 이자 수익에 부과되는 세금. 14% (이자소득세) + 1.4% (지방소득세) = 15.4% 원천징수.',
        relatedCalculator: { href: '/calculator/savings/', label: '적금 이자 계산기' },
      },
    ],
  },
  {
    category: '세금·부동산',
    description: '양도세·취득세·재산세·종부세 관련 핵심 용어',
    terms: [
      {
        name: '양도차익',
        description:
          '양도가액에서 취득가액·필요경비(중개수수료, 세금 등)를 뺀 금액. 양도소득세 과세 표준의 출발점. 산식: 양도가액 − 취득가액 − 필요경비 − 장기보유특별공제.',
        relatedCalculator: { href: '/calculator/capital-gains-tax/', label: '양도소득세 계산기' },
      },
      {
        name: '장기보유특별공제',
        alternateName: '장특공제',
        description:
          '부동산을 일정 기간 이상 보유한 경우 양도차익에서 공제하는 제도. 일반 부동산 3년 이상 6~30%, 1세대1주택 8~80%(최대 80%). 근거: 소득세법 §95.',
        url: 'https://www.nts.go.kr',
        relatedCalculator: { href: '/calculator/capital-gains-tax/', label: '양도소득세 계산기' },
      },
      {
        name: '1세대1주택 비과세',
        description:
          '1세대가 1주택만 보유하고 2년 이상 보유(조정대상지역 거주 2년 이상) 후 양도 시 양도차익 비과세. 양도가액 12억 원 초과분은 과세. 근거: 소득세법 §89.',
        relatedCalculator: { href: '/calculator/capital-gains-tax/', label: '양도소득세 계산기' },
      },
      {
        name: '농어촌특별세',
        alternateName: '농특세',
        description:
          '취득세·증여세 등에 부가되는 국세. 표준세율 0.2% (감면 대상은 다른 비율). 근거: 농어촌특별세법.',
        relatedCalculator: { href: '/calculator/acquisition-tax/', label: '취득세 계산기' },
      },
      {
        name: '공정시장가액비율',
        description:
          '재산세·종합부동산세 과세표준 산정 시 공시가격에 곱하는 비율. 2026년 주택 60% 유지. 산식: 공시가격 × 공정시장가액비율 = 과세표준.',
        relatedCalculator: { href: '/calculator/property-tax/', label: '재산세 계산기' },
      },
    ],
  },
  {
    category: '주식·코인 투자',
    description: '평단·물타기·분할매수 관련 핵심 용어',
    terms: [
      {
        name: '평균단가 (가중평균)',
        alternateName: '평단',
        description:
          '보유 종목의 매입 단가를 가중평균한 값. 산식: Σ(매입가 × 매입수량) ÷ 총 보유수량. 분할매도 후에도 잔여분 평단은 변하지 않음.',
        relatedCalculator: { href: '/calculator/averaging-down/', label: '물타기 계산기' },
      },
      {
        name: '물타기 (Averaging Down)',
        alternateName: '평단 낮추기',
        description:
          '보유 종목 가격이 하락했을 때 추가 매수해 평균단가를 낮추는 전략. 손익분기점이 낮아져 회복에 필요한 상승률 감소. 추가 하락 시 손실 가중 위험.',
        relatedCalculator: { href: '/calculator/averaging-down/', label: '물타기 계산기' },
      },
      {
        name: '분할매수 (DCA)',
        alternateName: 'Dollar Cost Averaging',
        description:
          '한 종목을 한 번에 매수하지 않고 여러 차수에 나눠 매수하는 전략. 시점 분산으로 평균단가 안정화, 단기 변동성 부담 완화.',
        relatedCalculator: { href: '/calculator/split-buy/', label: '분할매수 계산기' },
      },
      {
        name: '손익분기점 (BEP)',
        alternateName: 'BEP',
        description:
          'Break-Even Point. 매수·매도 수수료, 거래세를 모두 차감하고도 본전이 되는 매도 단가. 한국 주식 매도 시 거래세 0.18% 추가 부담.',
        relatedCalculator: { href: '/calculator/split-buy/', label: '분할매수 계산기' },
      },
      {
        name: '증권거래세',
        description:
          '한국 주식 매도 시 부과되는 세금. 2026년 코스피·코스닥 모두 0.18% (농어촌특별세 0.15% + 거래세 0.03%). 코인은 거래세 없음.',
        url: 'https://www.nts.go.kr',
        relatedCalculator: { href: '/calculator/split-sell/', label: '분할매도 계산기' },
      },
    ],
  },
];

const ALL_TERMS_FLAT = GLOSSARY.flatMap((s) => s.terms);

export default function GlossaryPage() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '용어사전' },
  ]);
  const webpageLd = buildWebPageJsonLd({
    name: '금융·세금·투자 용어사전',
    description: 'DSR·LTV·양도차익·장기보유공제·평균단가·BEP 등 핵심 용어 정의 모음.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
  });
  const definedTermSetLd = buildDefinedTermSetJsonLd({
    name: 'calculatorhost 용어사전',
    description: '한국 거주자 대상 금융·세금·부동산·투자 핵심 용어 정의 모음 (법조항·공식 출처 인용)',
    url: URL,
    terms: ALL_TERMS_FLAT.map(({ relatedCalculator: _r, ...t }) => t),
  });
  const speakableLd = buildSpeakableJsonLd(['[data-speakable]']);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webpageLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermSetLd) }}
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
            <article className="mx-auto max-w-4xl space-y-10">
              <header>
                <Breadcrumb
                  items={[
                    { name: '홈', href: '/' },
                    { name: '용어사전' },
                  ]}
                />
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  금융·세금·투자 용어사전
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  한국 거주자가 일상에서 자주 마주치는 금융·세금·부동산·투자 핵심 용어를
                  법조항·공식 출처와 함께 정리합니다. 각 용어 옆 "관련 계산기"로 즉시
                  실전 계산을 시도해볼 수 있습니다.
                </p>
              </header>

              {/* 알파벳/카테고리 인덱스 */}
              <nav aria-label="카테고리 바로가기" className="card flex flex-wrap gap-2">
                {GLOSSARY.map((section) => (
                  <a
                    key={section.category}
                    href={`#${encodeURIComponent(section.category)}`}
                    className="rounded-chip border border-border-base px-3 py-1.5 text-sm font-medium hover:border-primary-500 hover:text-primary-500"
                  >
                    {section.category} ({section.terms.length})
                  </a>
                ))}
              </nav>

              {GLOSSARY.map((section) => (
                <section
                  key={section.category}
                  id={section.category}
                  aria-label={section.category}
                  className="space-y-4"
                >
                  <h2 className="text-2xl font-bold border-b border-border-base pb-2">
                    {section.category}{' '}
                    <span className="text-base text-text-tertiary font-normal">
                      ({section.terms.length}개)
                    </span>
                  </h2>
                  <p className="text-text-secondary">{section.description}</p>
                  <dl className="space-y-6">
                    {section.terms.map((term) => (
                      <div
                        key={term.name}
                        className="card border-l-4 border-l-primary-500"
                        id={`term-${encodeURIComponent(term.name)}`}
                      >
                        <dt className="mb-2 flex flex-wrap items-baseline gap-2">
                          <h3 className="text-lg font-bold text-text-primary">
                            {term.name}
                          </h3>
                          {term.alternateName && term.alternateName !== term.name && (
                            <span className="text-sm text-text-tertiary">
                              {term.alternateName}
                            </span>
                          )}
                        </dt>
                        <dd className="text-text-secondary leading-relaxed">
                          {term.description}
                        </dd>
                        <div className="mt-3 flex flex-wrap gap-3 text-sm">
                          {term.url && (
                            <a
                              href={term.url}
                              target="_blank"
                              rel="noopener noreferrer nofollow"
                              className="text-primary-600 underline dark:text-primary-500"
                            >
                              공식 출처 ↗
                            </a>
                          )}
                          {term.relatedCalculator && (
                            <Link
                              href={term.relatedCalculator.href}
                              className="text-primary-600 underline dark:text-primary-500"
                            >
                              → {term.relatedCalculator.label}
                            </Link>
                          )}
                        </div>
                      </div>
                    ))}
                  </dl>
                </section>
              ))}

              <section
                aria-label="안내"
                className="rounded-lg border border-border-base p-4 text-caption text-text-tertiary"
              >
                <p className="mb-2">
                  <strong>업데이트</strong>: {DATE_MODIFIED} · 총 {ALL_TERMS_FLAT.length}개 용어
                </p>
                <p>
                  <strong>출처</strong>: 모든 정의는 국세청·금융감독원·한국거래소 등 공식
                  자료를 기반으로 작성되었으며, 법조항이 명시된 용어는 해당 법령을
                  직접 인용했습니다. 본 용어사전은 정보 제공 목적이며 법적 효력이 없습니다.
                </p>
              </section>
            </article>
          </main>
        </div>
        <Footer />
      </div>
    </>
  );
}
