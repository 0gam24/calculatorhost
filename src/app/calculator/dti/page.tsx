import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { Footer } from '@/components/layout/Footer';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { FaqSection } from '@/components/calculator/FaqSection';
import { ShareButtons } from '@/components/calculator/ShareButtons';
import { MainBackrefBox } from '@/components/network/MainBackrefBox';
import { getMainCategoryUrl } from '@/lib/network/main-backref';
import {
  buildSoftwareApplicationJsonLd,
  buildFaqPageJsonLd,
  buildBreadcrumbJsonLd,
  buildWebPageJsonLd,
  buildHowToJsonLd,
  buildSpeakableJsonLd,
} from '@/lib/seo/jsonld';

const URL = 'https://calculatorhost.com/calculator/dti/';
const DATE_PUBLISHED = '2026-05-11';
const DATE_MODIFIED = '2026-05-11';

export const metadata: Metadata = {
  title: 'DTI 계산기 2026 | LTV·DSR 함께 계산 | calculatorhost',
  description:
    'DTI(부채상환비율) 계산기 2026. 신규 대출 원리금 + 기존 이자 ÷ 연소득 비율 공식. DSR·LTV 와 동시 계산해 주택담보대출 한도 정확히 확인. 무료.',
  keywords: [
    'DTI 계산기',
    'DTI 대출한도 계산',
    'DTI DSR 계산',
    'LTV DTI DSR 계산',
    '주택담보대출 DTI',
    '2026 DTI',
  ],
  alternates: { canonical: URL },
  openGraph: {
    title: 'DTI 계산기 2026 | LTV·DSR 함께 계산',
    description: 'DTI 공식 + 한도 자동 계산.',
    url: URL,
    type: 'website',
    locale: 'ko_KR',
  },
  twitter: { card: 'summary_large_image' },
};

const FAQ_ITEMS = [
  {
    question: 'DTI란 무엇인가요?',
    answer:
      'DTI(Debt to Income, 부채상환비율)는 신규 대출의 연간 원리금 상환액에 기존 대출의 연간 이자를 더한 금액을 연소득으로 나눈 비율입니다. 산식: (신규 원리금 + 기존 이자) ÷ 연소득 × 100. DSR과 달리 기존 대출은 이자만 포함합니다.',
  },
  {
    question: 'DTI 와 DSR 의 차이는?',
    answer:
      'DSR 은 모든 대출(신규 + 기존)의 원금과 이자를 모두 더해 연소득 비율을 계산하지만, DTI 는 신규 대출의 원리금만 합산하고 기존 대출은 이자만 포함합니다. 따라서 DTI 한도가 같아도 기존 대출이 많을수록 DSR이 먼저 빠듯해집니다.',
  },
  {
    question: 'DTI 한도는 몇 % 인가요?',
    answer:
      '2026년 기준 일반 주택담보대출 DTI 한도는 비규제지역 50%, 조정·투기과열지역 40% 입니다. 단, 은행은 DSR(40%/50%)을 우선 적용하므로 DTI 한도만 봐서는 안 됩니다. DSR·LTV·DTI 3개 규제를 모두 통과해야 실 한도가 결정됩니다.',
  },
  {
    question: 'DTI 계산기는 어디서 사용하나요?',
    answer:
      '본 사이트의 [대출한도(DSR/LTV/DTI) 계산기](/calculator/loan-limit/)에서 연소득·기존 대출·신규 대출 조건을 입력하면 DTI·DSR·LTV 3개 규제와 결정적 제약 요인을 한 번에 확인할 수 있습니다.',
  },
  {
    question: 'LTV·DTI·DSR 동시 계산 의미는?',
    answer:
      '한국의 주택담보대출 한도는 LTV(담보가치 대비 대출액)·DTI(부채상환비율)·DSR(부채원리금 상환비율) 3개 규제를 모두 통과해야 합니다. 셋 중 가장 빠듯한 한도가 실 한도가 되며, 본 사이트 통합 계산기에서 결정적 제약(bindingConstraint)을 자동 표시합니다.',
  },
  {
    question: 'DTI 계산 예시는?',
    answer:
      '연소득 6,000만 원, 기존 대출 연이자 200만 원, 신규 주담대 월 100만 원 원리금(연 1,200만 원) 가정 시 DTI = (1,200 + 200) ÷ 6,000 × 100 = 23.3%. 조정지역 40% 한도 안쪽이므로 DTI 측면에서는 통과합니다.',
  },
];

export default function DtiPage() {
  const softwareLd = buildSoftwareApplicationJsonLd({
    name: 'DTI 계산기',
    description: 'DTI(부채상환비율) + LTV + DSR 통합 한도 계산',
    url: URL,
  });
  const webPageLd = buildWebPageJsonLd({
    name: 'DTI 계산기 2026',
    description: 'DTI 공식·한도·DSR 비교',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
  });
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '금융', url: 'https://calculatorhost.com/category/finance/' },
    { name: 'DTI 계산기' },
  ]);
  const howToLd = buildHowToJsonLd({
    name: 'DTI 계산기 사용 방법',
    description: 'DTI(부채상환비율) 를 계산하고 대출한도 확인하는 단계별 가이드',
    steps: [
      { name: '연소득 입력', text: '연소득(세전) 을 만 원 단위로 입력합니다.' },
      {
        name: '기존 대출 이자 입력',
        text: '기존 대출의 연간 이자 합계를 입력합니다 (원금 제외).',
      },
      {
        name: '신규 대출 조건 입력',
        text: '신규 주택담보대출 금리·기간·상환방식을 선택합니다.',
      },
      {
        name: 'DTI/DSR/LTV 자동 계산',
        text: '본 사이트 통합 계산기에서 3개 규제와 결정적 제약 요인을 자동 확인합니다.',
      },
      {
        name: '한도 확인',
        text: '실 신청 가능한 최대 대출액과 월 상환액을 확인합니다.',
      },
    ],
  });
  const faqLd = buildFaqPageJsonLd(FAQ_ITEMS);
  const speakableLd = buildSpeakableJsonLd(['[data-speakable]']);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
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
                    { name: '금융', href: '/category/finance/' },
                    { name: 'DTI 계산기' },
                  ]}
                />
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  DTI 계산기 2026 | LTV·DSR 함께 계산
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  DTI(부채상환비율, Debt to Income) 는 신규 대출 원리금 + 기존 대출 이자를
                  연소득으로 나눈 비율입니다. 2026년 비규제지역 50%, 조정·투기과열지역 40%
                  한도가 적용되며, DSR·LTV 와 함께 모두 통과해야 실 대출이 가능합니다.
                </p>
              </header>

              <section className="card border-l-4 border-l-primary-500 bg-primary-500/5">
                <h2 className="mb-2 text-xl font-semibold">🔗 DTI·DSR·LTV 통합 계산</h2>
                <p className="mb-3 text-sm text-text-secondary">
                  DTI 만 단독으로 보면 실 대출한도를 정확히 알기 어렵습니다. 3개 규제 모두
                  통과해야 하므로 통합 계산기에서 결정적 제약 요인까지 확인하세요.
                </p>
                <Link
                  href="/calculator/loan-limit/"
                  className="inline-flex items-center gap-1 rounded-md bg-primary-600 px-4 py-2 text-sm font-bold text-white hover:bg-primary-500"
                >
                  → 통합 대출한도 계산기로 이동
                </Link>
              </section>

              <FaqSection items={FAQ_ITEMS} />

              <section className="card space-y-3">
                <h2 className="text-2xl font-semibold text-text-primary">DTI 공식</h2>
                <pre className="overflow-x-auto rounded-md bg-bg-card p-4 text-sm">
                  <code>{`DTI(%) = (신규 대출 연 원리금 + 기존 대출 연 이자) ÷ 연소득 × 100

신규 대출 연 원리금 = 월 원리금 상환액 × 12
  ※ 원리금균등 상환식: P × r(1+r)^n / ((1+r)^n - 1)
    P = 원금, r = 월이율, n = 개월수

DTI 한도 (2026):
  - 비규제지역:           50%
  - 조정·투기과열지역:    40%`}</code>
                </pre>
                <p className="text-sm text-text-secondary">
                  계산 결과가 한도 안쪽이어도, 같은 차주의 DSR·LTV 가 더 빠듯하면 실 한도는
                  DSR·LTV 기준으로 결정됩니다. 통합 계산기를 통해 결정적 제약(bindingConstraint)
                  을 확인하는 것이 안전합니다.
                </p>
              </section>

              <section className="card space-y-3">
                <h2 className="text-2xl font-semibold text-text-primary">DTI vs DSR 비교</h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border-base bg-primary-500/10">
                        <th className="px-3 py-2 text-left">항목</th>
                        <th className="px-3 py-2 text-left">DTI</th>
                        <th className="px-3 py-2 text-left">DSR</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="px-3 py-2">기존 대출 산정</td>
                        <td className="px-3 py-2">이자만</td>
                        <td className="px-3 py-2">원금 + 이자</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="px-3 py-2">신규 대출 산정</td>
                        <td className="px-3 py-2">원리금 합산</td>
                        <td className="px-3 py-2">원리금 합산</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="px-3 py-2">한도(2026, 일반)</td>
                        <td className="px-3 py-2">40~50%</td>
                        <td className="px-3 py-2">40% (은행) / 50% (2금융)</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="px-3 py-2">스트레스 가산</td>
                        <td className="px-3 py-2">미적용</td>
                        <td className="px-3 py-2">+1.5%p (변동·혼합·주기형)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-sm text-text-secondary">
                  은행 대출 심사 시 보통 DSR 이 먼저 빠듯해지므로, 실무에서는 DSR 한도가 곧
                  실 한도입니다. DTI 는 2018년 이후 DSR 도입과 함께 보조 지표가 되었습니다.
                </p>
              </section>

              <section aria-label="공식 출처" className="card">
                <h2 className="mb-3 text-lg font-semibold">공식 출처 · 법적 근거</h2>
                <p className="mb-3 text-sm text-text-secondary">
                  은행법 §38 (대출 약관) · 은행법 시행령 §24의4 (DSR 기준) · 신용정보의 이용 및 보호에 관한 법률 §2 (신용정보 정의) · 금융감독원 「주택담보대출 가계부채 종합관리방안」 (스트레스 DSR 1.5%p 가산).
                </p>
                <ul className="space-y-2 text-sm">
                  <li>
                    <a
                      href="https://www.fss.or.kr"
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="text-primary-500 hover:underline"
                    >
                      금융감독원 — 주택담보대출 DTI/DSR 규제 안내
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.law.go.kr/법령/은행법시행령"
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="text-primary-500 hover:underline"
                    >
                      법령정보센터 — 은행법 시행령 §24의4 (DSR 기준)
                    </a>
                  </li>
                </ul>
              </section>

              <ShareButtons title="DTI 계산기 2026 | LTV·DSR 함께 계산" url={URL} />

              <MainBackrefBox mainCategoryUrl={getMainCategoryUrl('finance')} />

              <section
                aria-label="면책"
                className="rounded-lg border border-border-base p-4 text-caption text-text-tertiary"
              >
                <p>
                  본 페이지의 DTI 정보·공식은 참고용이며, 실제 대출 심사는 은행·2금융권의
                  내부 기준에 따라 결과가 다를 수 있습니다. 정확한 한도 시뮬레이션은 본 사이트의
                  통합 대출한도 계산기를 사용하시고, 실 신청 전 은행 상담을 받으시기 바랍니다.
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
