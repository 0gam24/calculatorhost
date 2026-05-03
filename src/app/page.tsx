import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Sidebar } from '@/components/layout/Sidebar';
import { AdSlot } from '@/components/ads/AdSlot';
import {
  buildOrganizationJsonLd,
  buildWebSiteJsonLd,
  buildFaqPageJsonLd,
} from '@/lib/seo/jsonld';
import { getRecentUpdates } from '@/lib/constants/updates-log';

export const metadata: Metadata = {
  title: '한국 금융·세금·부동산 계산기 31개 | calculatorhost',
  description:
    '2026년 최신 세율·금리 반영 한국 계산기 31개 모음. 연봉 실수령액·양도소득세·대출이자·취득세·DSR 한도 등 모든 계산기 무료. 회원가입 불필요, 모바일 최적.',
  alternates: { canonical: 'https://calculatorhost.com/' },
};

const CATEGORIES = [
  { slug: 'work', title: '근로', icon: '💼', desc: '연봉·퇴직금·실수령액' },
  { slug: 'tax', title: '세금', icon: '🧾', desc: '양도세·취득세·재산세' },
  { slug: 'finance', title: '금융', icon: '💰', desc: '대출·예금·적금·환율' },
  { slug: 'real-estate', title: '부동산', icon: '🏠', desc: '중개료·평수·임대수익률' },
  { slug: 'lifestyle', title: '생활', icon: '📅', desc: 'BMI·D-day·자동차세' },
] as const;

const POPULAR = [
  { href: '/calculator/salary', title: '연봉 실수령액', tag: '근로' },
  { href: '/calculator/capital-gains-tax', title: '양도소득세', tag: '세금' },
  { href: '/calculator/acquisition-tax', title: '취득세', tag: '세금' },
  { href: '/calculator/loan', title: '대출이자', tag: '금융' },
  { href: '/calculator/severance', title: '퇴직금', tag: '근로' },
  { href: '/calculator/broker-fee', title: '중개수수료', tag: '부동산' },
] as const;

const PERSONAS = [
  {
    icon: '💼',
    title: '직장인',
    desc: '연봉 협상·이직 전 세후 수치 확인이 필요한',
    calculators: [
      { href: '/calculator/salary', title: '연봉 실수령액' },
      { href: '/calculator/severance', title: '퇴직금' },
      { href: '/calculator/loan', title: '대출이자' },
    ],
  },
  {
    icon: '🏠',
    title: '부동산 거래 직전자',
    desc: '매매·전세 계약 전 세금과 취득 비용을 확인해야 하는',
    calculators: [
      { href: '/calculator/capital-gains-tax', title: '양도소득세' },
      { href: '/calculator/acquisition-tax', title: '취득세' },
      { href: '/calculator/broker-fee', title: '중개수수료' },
    ],
  },
  {
    icon: '💻',
    title: '프리랜서·1인사업자',
    desc: '종합소득세·경비율·세액공제를 정확히 계산해야 하는',
    calculators: [
      { href: '/calculator/freelancer-tax', title: '프리랜서 종합소득세' },
      { href: '/calculator/salary', title: '4대보험 기초' },
      { href: '/calculator/loan-limit', title: '대출한도' },
    ],
  },
  {
    icon: '🏦',
    title: '대출 실행 예정자',
    desc: '주담대·전세대출 한도와 월 상환액을 시뮬하려는',
    calculators: [
      { href: '/calculator/loan-limit', title: '대출한도(DSR)' },
      { href: '/calculator/loan', title: '대출이자' },
      { href: '/calculator/acquisition-tax', title: '취득세' },
    ],
  },
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

// 홈페이지 노출용 — 최근 7건만 (전체 이력은 /updates 페이지에서)
const UPDATES_2026 = getRecentUpdates(7);

const HOME_FAQ = [
  {
    question: '회원가입이 필요한가요?',
    answer:
      '아니요. calculatorhost의 모든 계산기는 회원가입 없이 무료로 사용 가능합니다. 계산 결과는 당신의 브라우저에서만 처리되므로 개인정보 입력도 최소화됩니다.',
  },
  {
    question: '계산 결과를 법적 근거로 사용할 수 있나요?',
    answer:
      '본 계산기의 결과는 참고용이며, 실제 세금·대출금 등은 개별 상황에 따라 달라집니다. 정확한 계산과 신고는 국세청 홈택스, 금융기관, 세무 전문가와 상담하시기 바랍니다.',
  },
  {
    question: '세율은 얼마나 자주 업데이트되나요?',
    answer:
      '주요 세율·금리 변경은 1년에 1회 이상 반영됩니다. 기획재정부·국세청·한국은행·금융감독원의 공식 개정안을 기반으로 즉시 업데이트하며, 각 계산기 하단에 갱신 날짜를 명시합니다.',
  },
  {
    question: '모바일에서도 사용 가능한가요?',
    answer:
      '네. calculatorhost는 모바일 퍼스트 설계로 스마트폰, 태블릿, 데스크톱 모두에서 최적화되어 있습니다. 모바일 앱은 현재 없으며, 웹브라우저에서 사용하시면 됩니다.',
  },
  {
    question: '계산 결과는 저장되나요?',
    answer:
      '현재 계산 결과는 당신의 브라우저 로컬스토리지에만 임시 저장됩니다(향후 히스토리 기능 예정). 서버에는 개인정보가 저장되지 않으므로 안심하고 사용하셔도 됩니다.',
  },
];

export default function HomePage() {
  const orgJsonLd = buildOrganizationJsonLd();
  const webSiteJsonLd = buildWebSiteJsonLd();
  const faqJsonLd = buildFaqPageJsonLd(HOME_FAQ);

  // ItemList JSON-LD (모든 계산기)
  const allCalcsFlat = ALL_CALCULATORS.flatMap((cat) => cat.items);
  const itemListJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: allCalcsFlat.map((item, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: item.title,
      url: `https://calculatorhost.com${item.href}`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />

      <div className="min-h-screen bg-bg-base">
        <Header />
        <div className="flex">
          <Sidebar />
          <main id="main-content" className="flex-1 px-4 py-8 md:px-8">
            <article className="mx-auto max-w-6xl space-y-10">
              {/* H1 + 리드 */}
              <header>
                <h1 className="mb-4 text-4xl font-bold tracking-tight lg:text-5xl" style={{ letterSpacing: '-0.02em' }}>
                  <span className="text-primary-500">31개</span> 한국 생활 계산기,{' '}
                  <br className="hidden sm:inline" />
                  한 곳에서 정확하게
                </h1>
                <p className="text-lg text-text-secondary max-w-3xl">
                  2026년 최신 세율·금리를 반영한 세금·금융·부동산·근로·생활 계산기 모음.
                  회원가입 불필요, 모바일 최적, 완전 무료.
                </p>
              </header>

              {/* AD-1 리더보드 */}
              <AdSlot slot="home-top" format="horizontal" className="rounded-lg border border-border-base" />

              {/* 카테고리 */}
              <section>
                <h2 className="mb-6 text-2xl font-bold text-text-primary">카테고리별 계산기</h2>
                <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
                  {CATEGORIES.map((cat) => (
                    <Link
                      key={cat.slug}
                      href={`/category/${cat.slug}`}
                      className="card card-hover flex flex-col items-start"
                    >
                      <span className="mb-3 text-3xl" aria-hidden>
                        {cat.icon}
                      </span>
                      <span className="mb-1 font-semibold text-text-primary">{cat.title}</span>
                      <span className="text-sm text-text-tertiary">{cat.desc}</span>
                    </Link>
                  ))}
                </div>
              </section>

              {/* 인기 계산기 */}
              <section>
                <h2 className="mb-6 text-2xl font-bold text-text-primary">인기 계산기 TOP 6</h2>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {POPULAR.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="card card-hover flex items-center justify-between"
                    >
                      <div className="flex flex-col gap-1">
                        <span className="font-semibold text-text-primary">{item.title}</span>
                        <span className="text-xs text-text-tertiary">{item.tag}</span>
                      </div>
                      <span className="rounded-lg bg-primary-500/10 px-3 py-2 text-sm font-semibold text-primary-500">
                        →
                      </span>
                    </Link>
                  ))}
                </div>
              </section>

              {/* 페르소나별 추천 */}
              <section className="space-y-6">
                <h2 className="text-2xl font-bold text-text-primary">당신에게 필요한 계산기</h2>
                <div className="grid gap-6 sm:grid-cols-2">
                  {PERSONAS.map((persona) => (
                    <div
                      key={persona.title}
                      className="card card-hover flex flex-col"
                    >
                      <div className="mb-4 flex items-start gap-4">
                        <span className="text-5xl shrink-0" aria-hidden>
                          {persona.icon}
                        </span>
                        <div className="flex-1">
                          <h3 className="font-bold text-base text-text-primary">{persona.title}</h3>
                          <p className="mt-1 text-sm text-text-tertiary">{persona.desc}</p>
                        </div>
                      </div>
                      <div className="flex flex-1 flex-col justify-end gap-2 border-t border-border-subtle pt-4">
                        {persona.calculators.map((calc) => (
                          <Link
                            key={calc.href}
                            href={calc.href}
                            className="text-sm text-primary-500 font-medium transition hover:text-primary-400 hover:underline"
                          >
                            → {calc.title}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* 2026 주요 업데이트 — 시계열 Changelog 테이블 (GEO/AEO Freshness 신호) */}
              <section className="card card-hover space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-text-primary">2026년 세율·금리 변경사항 (Changelog)</h2>
                  <p className="mt-2 text-text-secondary">
                    기획재정부·국세청·금융감독원의 공식 개정안을 시계열로 정리합니다. 각 항목은 해당 계산기에 즉시 반영되었으며, 상세 산식·예시는 개별 페이지에서 확인하세요.
                  </p>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse text-sm">
                    <caption className="sr-only">
                      2026년 calculatorhost 계산기 세율·금리 변경 이력 (반영일자 내림차순)
                    </caption>
                    <thead>
                      <tr className="border-b-2 border-border-base bg-primary-500/5">
                        <th scope="col" className="px-3 py-2 text-left font-semibold text-text-primary">반영일자</th>
                        <th scope="col" className="px-3 py-2 text-left font-semibold text-text-primary">계산기</th>
                        <th scope="col" className="px-3 py-2 text-left font-semibold text-text-primary">반영 항목</th>
                        <th scope="col" className="px-3 py-2 text-left font-semibold text-text-primary">변경 내용</th>
                      </tr>
                    </thead>
                    <tbody>
                      {UPDATES_2026.map((upd, idx) => (
                        <tr key={idx} className="border-b border-border-subtle hover:bg-bg-raised/50">
                          <td className="px-3 py-2 align-top tabular-nums text-text-secondary whitespace-nowrap">
                            <time dateTime={upd.date}>{upd.date}</time>
                          </td>
                          <td className="px-3 py-2 align-top">
                            {upd.calculator ? (
                              <Link
                                href={`/calculator/${upd.calculator.slug}/`}
                                className="font-medium text-primary-700 underline hover:text-primary-500 dark:text-primary-300"
                              >
                                {upd.calculator.title}
                              </Link>
                            ) : (
                              <span className="text-text-tertiary">전체</span>
                            )}
                          </td>
                          <td className="px-3 py-2 align-top font-medium text-text-primary whitespace-nowrap">
                            {upd.item}
                          </td>
                          <td className="px-3 py-2 align-top text-text-secondary">{upd.detail}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="text-xs text-text-tertiary border-t border-border-subtle pt-4">
                  최종 갱신: <time dateTime="2026-05-03">2026-05-03</time>. 변경사항 발생 시 즉시 업데이트됩니다.
                  전체 변경 이력은{' '}
                  <Link href="/updates/" className="underline hover:text-primary-500 font-medium">/updates 변경 이력 페이지</Link>에서,
                  실시간 알림은{' '}
                  <Link href="/feed.xml" className="underline hover:text-primary-500">RSS 피드</Link>로 구독할 수 있습니다.
                </p>
              </section>

              {/* 전체 계산기 목록 */}
              <section className="space-y-6">
                <h2 className="text-2xl font-bold text-text-primary">전체 계산기 (31개)</h2>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {ALL_CALCULATORS.map((cat) => (
                    <div key={cat.category} className="card card-hover space-y-4">
                      <h3 className="font-bold text-lg text-primary-500 border-b border-border-subtle pb-3">
                        {cat.category}
                      </h3>
                      <ul className="space-y-2">
                        {cat.items.map((calc) => (
                          <li key={calc.href}>
                            <Link
                              href={calc.href}
                              className="text-sm text-text-secondary transition hover:text-primary-500 hover:underline flex items-center gap-2 group"
                            >
                              <span className="text-primary-500 opacity-0 group-hover:opacity-100 transition">→</span>
                              <span>{calc.title}</span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </section>

              {/* FAQ */}
              <section className="card card-hover space-y-6">
                <h2 className="text-2xl font-bold text-text-primary">자주 묻는 질문</h2>
                <div className="space-y-3">
                  {HOME_FAQ.map((item, idx) => (
                    <details
                      key={idx}
                      className="group rounded-2xl border border-border-subtle bg-bg-raised/50 p-4 transition-all hover:border-border-base"
                    >
                      <summary className="cursor-pointer font-semibold text-text-primary flex items-center justify-between">
                        {item.question}
                        <span className="text-lg group-open:rotate-180 transition-transform">▼</span>
                      </summary>
                      <p className="mt-3 text-text-secondary text-sm">{item.answer}</p>
                    </details>
                  ))}
                </div>
              </section>

              {/* 데이터 출처·품질 보장 */}
              <section className="card card-hover space-y-6 border-primary-500/10 bg-primary-500/5">
                <h2 className="text-xl font-bold text-text-primary">신뢰할 수 있는 계산기</h2>
                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="space-y-3">
                    <h3 className="font-semibold text-primary-700 dark:text-primary-300 flex items-center gap-2">
                      <span>✓</span> 공식 데이터 기반
                    </h3>
                    <ul className="space-y-2 text-sm text-text-secondary">
                      <li className="flex items-start gap-2"><span className="shrink-0">•</span> <span>국세청 세율표 및 공제 기준</span></li>
                      <li className="flex items-start gap-2"><span className="shrink-0">•</span> <span>금융감독원 DSR/LTV 규제</span></li>
                      <li className="flex items-start gap-2"><span className="shrink-0">•</span> <span>한국은행 기준금리</span></li>
                      <li className="flex items-start gap-2"><span className="shrink-0">•</span> <span>국토교통부 실거래가</span></li>
                      <li className="flex items-start gap-2"><span className="shrink-0">•</span> <span>대한비만학회 표준체중</span></li>
                    </ul>
                  </div>
                  <div className="space-y-3">
                    <h3 className="font-semibold text-primary-700 dark:text-primary-300 flex items-center gap-2">
                      <span>✓</span> 품질 관리
                    </h3>
                    <ul className="space-y-2 text-sm text-text-secondary">
                      <li className="flex items-start gap-2"><span className="shrink-0">•</span> <span>392개 테스트 케이스 통과</span></li>
                      <li className="flex items-start gap-2"><span className="shrink-0">•</span> <span>국세청 홈택스 샘플 교차 검증</span></li>
                      <li className="flex items-start gap-2"><span className="shrink-0">•</span> <span>연 1회 이상 세율 개정 반영</span></li>
                      <li className="flex items-start gap-2"><span className="shrink-0">•</span> <span>각 페이지에 갱신 날짜 표시</span></li>
                      <li className="flex items-start gap-2"><span className="shrink-0">•</span> <span>법조항 원문 인용 필수</span></li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* 면책조항 */}
              <section className="card space-y-3 border-l-4 border-l-danger-500 bg-danger-500/5">
                <p className="text-sm text-text-secondary">
                  본 계산기는 일반적인 세율·공식을 기반으로 하며, 실제 세금·대출·수익 등은 개별 상황, 거주지역, 부양가족, 특수 공제 등에 따라 크게 달라질 수 있습니다. 정확한 계산과 신고는 국세청 홈택스(www.hometax.go.kr), 금융기관, 세무 전문가와 상담하시기 바랍니다.
                </p>
                <p className="text-sm text-text-secondary">
                  본 사이트는 정보 제공만을 목적으로 하며, 투자·금융상품 권유, 수익 보장, 절세 확정을 하지 않습니다.
                </p>
                <p className="text-xs text-text-secondary border-t border-border-subtle pt-3">
                  최종 업데이트: 2026년 5월
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
