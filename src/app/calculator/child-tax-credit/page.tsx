import { CalculatorPageContent } from '@/components/calculator/CalculatorPageContent';
import type { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
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
import { ChildTaxCreditCalculator } from './ChildTaxCreditCalculator';
import { AuthorByline } from '@/components/calculator/AuthorByline';

const URL = 'https://calculatorhost.com/calculator/child-tax-credit/';

export const metadata: Metadata = {
  title: '자녀장려금 계산기 2026 | 자녀 1인당 100만 | calculatorhost',
  description:
    '2026년 자녀장려금 계산기. 가구 유형(홑벌이·맞벌이·한부모·다자녀)별 자녀 1인당 최대 100만 원 지급액을 계산. 소득 기준 자동 확인. 무료.',
  keywords: [
    '자녀장려금 계산기',
    '자녀장려금 계산',
    '자녀장려금 지급액',
    '자녀장려금 소득 기준',
    '근로장려금 자녀장려금',
    '2026 자녀장려금',
  ],
  alternates: { canonical: URL },
  openGraph: {
    title: '자녀장려금 계산기 2026, 자녀 1인당 100만원',
    description: '가구 유형, 연소득, 자녀 수로 자녀장려금(CTC)을 즉시 계산합니다.',
    url: URL,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '자녀장려금 계산기 2026',
    description: '자녀장려금 즉시 계산: 가구 유형, 연소득, 자녀 수로 지급액 확인.',
  },
};

const FAQ_ITEMS = [
  {
    question: '누가 자녀장려금 대상인가요?',
    answer:
      '근로·사업·종교인 소득이 있고 부양자녀 요건을 충족하며, 부부합산 연 총소득7,000만원 미만·가구 재산2.4억원 미만인 경우를 대상으로 합니다. 국적·부양자녀·가구 유형 등 다른 신청요건은 국세청에서 확인하세요(조세특례제한법100의28).',
  },
  {
    question: '자녀장려금은 어떻게 계산하나요?',
    answer:
      '지급액은 총급여액등 기준입니다. 홑벌이는2,100만원, 맞벌이는2,500만원까지 자녀당 최대100만원이며, 그 이상7,000만원 미만은 자녀당50만원까지 선형 감액합니다. 실제 지급은 국세청 산정표의 구간값을 사용하므로 이 도구의 연속산식 추정과 차이가 날 수 있습니다.',
  },
  {
    question: '재산이1.7억원 이상이면 어떻게 되나요?',
    answer:
      '가구재산1.7억원 이상2.4억원 미만이면 산정액의50%를 감액합니다.2.4억원 이상이면 대상이 아닙니다. 재산의 기준일·평가방법과 가구원 범위는 국세청 안내를 확인하세요.',
  },
  {
    question: '총소득과 총급여액등은 같은가요?',
    answer:
      '총소득은 신청자격 판정용이고 총급여액등은 지급액 산정용입니다. 소득 종류와 사업소득 조정률 등 때문에 두 금액이 다를 수 있습니다. 이자·배당 등 총소득만 입력한 경우 총급여액등을 같다고 가정하므로 정확한 금액은 국세청에서 확인하세요.',
  },
  {
    question: '실제 지급액과 다른 이유는 무엇인가요?',
    answer:
      '국세청 산정표 직접 조회, 자녀세액공제 중복조정, 기한후 신청 감액·체납 충당 및 모든 신청요건 판정은 미반영입니다. 이 도구는 연속산식의 예상액이며 국세청 결정액이 아닙니다.',
  },
];

const RELATED = [
  {
    href: '/calculator/salary',
    title: '연봉 실수령액',
    description: '세금·보험료 공제 후 실제 수령액',
  },
  {
    href: '/calculator/n-jobber-insurance',
    title: 'N잡러 건강보험',
    description: '부업 시 추가 건보료 계산',
  },
  {
    href: '/calculator/freelancer-tax',
    title: '프리랜서 종합소득세',
    description: '프리랜서 세금 계산',
  },
];

export default function ChildTaxCreditPage() {
  const softwareLd = buildSoftwareApplicationJsonLd({
    name: '자녀장려금 계산기',
    description:
      '가구 유형(홑벌이·맞벌이), 연소득(7,000만원 미만), 자녀 수를 입력해 연 지급 추정액과 연간 자녀장려금(CTC)을 즉시 계산합니다.',
    url: URL,
  });
  const webPageLd = buildWebPageJsonLd({
    name: '자녀장려금 계산기 2026',
    description: '자녀장려금 즉시 계산: 가구 유형, 연소득, 자녀 수로 지급액 확인',
    url: URL,
    datePublished: '2026-04-24',
    dateModified: '2026-09-30',
    isPartOf: getCategoryUrlForCalculator('child-tax-credit'),
  });
  const howToLd = buildHowToJsonLd({
    name: '자녀장려금 계산기 사용 방법',
    description: '가구 유형, 연소득, 자녀 수를 입력하여 자녀장려금(CTC)을 계산하는 단계별 가이드',
    steps: [
      {
        name: '가구 유형 선택',
        text: '홑벌이 가구 또는 맞벌이 가구 중 해당하는 유형을 선택합니다.',
      },
      {
        name: '가구 연 총소득 입력',
        text: '지난해 종합소득세 신고액 또는 예상 연소득을 입력합니다(7,000만원 미만).',
      },
      { name: '자녀 수 입력', text: '18세 미만 자녀 수를 입력합니다.' },
      {
        name: '자녀장려금 자동 계산',
        text: '입력한 정보로 연 지급 추정액과 연간 자녀장려금이 자동 계산됩니다.',
      },
      { name: '지급액 및 신청 안내 확인', text: '예상 지급액과 신청 방법을 확인합니다.' },
    ],
  });
  const faqLd = buildFaqPageJsonLd(
    FAQ_ITEMS.map((f) => ({ question: f.question, answer: f.answer })),
  );
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '근로', url: 'https://calculatorhost.com/category/work/' },
    { name: '자녀장려금' },
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
        <main
          id="main-content"
          className="calculator-page min-w-0 flex-1 px-4 py-5 md:px-8 md:py-8"
        >
          <CalculatorPageContent
            intro={
              <header>
                <Breadcrumb
                  items={[
                    { name: '홈', href: '/' },
                    { name: '세금', href: '/category/tax/' },
                    { name: '자녀장려금' },
                  ]}
                />
                <h1 className="text-4xl font-bold tracking-tight">자녀장려금 계산기 2026</h1>
                <p className="mt-4 text-lg text-text-secondary">
                  가구 소득과 재산으로 자녀장려금 예상액을 확인하세요.
                </p>
                <AuthorByline datePublished="2026-04-24" dateModified="2026-09-30" />
              </header>
            }
            calculator={<ChildTaxCreditCalculator />}
            related={
              <>
                <RelatedCalculators items={RELATED} />
              </>
            }
            faq={
              <>
                <FaqSection items={FAQ_ITEMS} />
              </>
            }
          >
            <StructuredSummary
              definition="자녀장려금은 18세 미만 자녀가 있는 저소득 가구에 지급하는 정부 지원금입니다. 조세특례제한법 §100의28·제100조의29에 따라 자녀 1인당 연 100만원을 기준으로, 가구 소득과 재산 기준에 따라 지급액이 결정됩니다."
              table={{
                caption: '자녀장려금 소득 구간별 지급',
                headers: ['소득 구간', '지급액'],
                rows: [
                  ['홑벌이2,100만·맞벌이2,500만원 이하', '자녀당 최대100만원'],
                  ['홑벌이 2,100만·맞벌이 2,500만 이상 7,000만원 미만', '자녀당 100만→50만원 감액'],
                  ['7,000만원 이상', '0원 (지급 불가)'],
                ],
              }}
              tldr={[
                '자녀 1인당 기본 100만원입니다.',
                '소득과 자녀 수에 따라 지급액이 결정됩니다.',
                '재산 2.4억원 기준을 충족해야 합니다.',
              ]}
            />
            <div className="my-8"></div>
            <div className="my-8"></div>
            <section className="mt-8 space-y-4 text-sm leading-relaxed text-text-secondary">
              <h2 className="text-xl font-semibold text-text-primary">
                자녀장려금 지급 기준과 산정 가정
              </h2>
              <p>
                조세특례제한법 제100조의28·제100조의29 기준 연간 예상액입니다. 부부합산 연
                총소득7,000만원 미만, 가구 재산2.4억원 미만, 자녀장려금 부양자녀 및 소득 요건을
                충족한다고 가정합니다. 소득·재산·가족의 기준일과 평가방법은 국세청 안내를
                확인하세요.
              </p>
              <p>
                지급액 산정용 총급여액등은 신청자격 총소득과 다릅니다. 홑벌이 감액 시작2,100만원,
                맞벌이2,500만원입니다. 자녀당 최대100만원에서7,000만원 직전50만원까지 선형
                감액합니다. 가구 재산1.7억원 이상2.4억원 미만이면50%를 추가 감액합니다.
              </p>
              <p>
                이 도구는 국세청 산정표를 직접 조회하지 않는 연속산식 추정입니다. 자녀세액공제
                중복조정, 기한후 신청·체납 충당은 미반영입니다. 총급여액등을 별도로 입력하지 않으면
                총소득과 같다고 가정하며 재산 미입력 시1.7억원 미만으로 가정합니다. 신청·지급일과
                확정액은 홈택스에서 확인하세요.
              </p>
              <p>
                <a
                  href="https://www.law.go.kr/법령/조세특례제한법/제100조의28"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  공식 신청자격
                </a>{' '}
                ·{' '}
                <a
                  href="https://www.law.go.kr/법령/조세특례제한법/제100조의29"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  공식 지급산식
                </a>{' '}
                ·{' '}
                <a
                  href="https://www.law.go.kr/법령/조세특례제한법/제100조의5"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  재산감액(제100조의31준용)
                </a>
              </p>
            </section>
            <section className="mt-12 border-t border-border-base pt-6">
              <h2 className="text-lg font-semibold">업데이트 로그</h2>
              <ul className="mt-3 space-y-2 text-sm text-text-secondary">
                <li>2026-09-30: 총소득 7,000만원 기준, 가구별 지급산식과 재산 감액 수정</li>
              </ul>
            </section>
            <section className="mt-6 border-t border-border-base pt-6">
              <p className="text-xs text-text-secondary">
                본 계산기는 참고용입니다. 실제 자녀장려금 지급액은 국세청의 심사 결과에 따라 달라질
                수 있습니다. 자녀 기준, 소득 범위, 재산 범위 등 복잡한 규칙이 있으므로, 정확한 수급
                여부는 국세청(hometax.go.kr) 또는 세무서에 문의하세요. 본 서비스는 법률·세무 조언이
                아닙니다.
              </p>
            </section>
          </CalculatorPageContent>
        </main>

        {/* AD-3 우측 스티키 광고 (lg+ 이상) */}
        <aside className="hidden w-80 bg-bg-base p-4 lg:block">
          <div className="sticky top-[5rem]"></div>
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
