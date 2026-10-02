import { CalculatorPageContent } from '@/components/calculator/CalculatorPageContent';
import type { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { StructuredSummary } from '@/components/calculator/StructuredSummary';
import { FaqSection } from '@/components/calculator/FaqSection';
import { RelatedCalculators } from '@/components/calculator/RelatedCalculators';
import {
  buildSoftwareApplicationJsonLd,
  buildFaqPageJsonLd,
  buildBreadcrumbJsonLd,
  buildSpeakableJsonLd,
  buildWebPageJsonLd,
  getCategoryUrlForCalculator,
  buildHowToJsonLd,
} from '@/lib/seo/jsonld';
import { AreaConverter } from './AreaConverter';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { AuthorByline } from '@/components/calculator/AuthorByline';

const URL = 'https://calculatorhost.com/calculator/area/';
const PAGE_TITLE = '평수 계산기 | ㎡↔평 변환·84㎡는 몇 평?';
const PAGE_DESCRIPTION =
  '제곱미터(㎡)와 평을 양방향으로 환산합니다. 84㎡는 25.41평, 34평은 약 112.40㎡입니다. 같은 면적의 단위만 변환하며 전용·공급면적을 서로 환산하지 않습니다.';

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  keywords: [
    '평수 계산기',
    '평 계산기',
    '평 변환',
    '평 전환',
    '평 단위환산',
    '평수 제곱미터 전환',
    '면적 평수 전환',
    '넓이 환산',
    '제곱미터 평 변환',
    '80 제곱미터 평수',
  ],
  alternates: { canonical: URL },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: URL,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
  },
};

const FAQ_ITEMS = [
  {
    question: '1평은 몇 제곱미터인가요?',
    answer:
      '이 계산기는 관습 단위인 평을 환산할 때 1평 = 400/121㎡(약 3.3058㎡), 1㎡ = 0.3025평의 계수를 사용합니다.',
  },
  {
    question: '34평은 몇 제곱미터인가요?',
    answer:
      '34평은 약 112.40㎡입니다. 같은 면적을 다른 단위로 표현한 값이며, 전용면적 34평인지 공급면적 34평인지는 해당 문서에서 따로 확인해야 합니다.',
  },
  {
    question: '전용면적·공급면적·대지면적은 무엇인가요?',
    answer:
      '전용면적은 세대 내부의 전용 공간, 공급면적은 전용면적과 주거공용면적을 합한 면적, 대지면적은 땅의 면적을 가리킵니다. 포함 범위가 다르므로 계약서의 면적 종류를 확인하세요. 이 계산기는 전용면적과 공급면적을 서로 환산하지 않습니다.',
  },
  {
    question: '평과 제곱미터를 비교할 때 무엇을 확인해야 하나요?',
    answer:
      '두 수치가 같은 면적 종류인지 먼저 확인하세요. 전용면적은 전용면적끼리, 공급면적은 공급면적끼리 단위를 바꾸어 비교해야 합니다. 단위가 다른 것과 면적 기준이 다른 것은 별개의 문제입니다.',
  },
  {
    question: '아파트 84㎡는 평으로 몇 평인가요?',
    answer:
      '84㎡는 25.41평입니다(84 × 0.3025 = 25.41). 전용면적 84㎡라면 전용면적 25.41평이라는 뜻입니다. 공급면적이나 광고의 평형과 같은 값으로 볼 수는 없습니다.',
  },
  {
    question: '면적을 입력할 때 주의할 점은 무엇인가요?',
    answer:
      '선택한 단위에 맞는 유효한 숫자를 입력하세요. 빈 입력이나 잘못된 값은 입력 안내를 확인해 수정해야 합니다. 0과 빈 입력은 서로 다르며, 소수점이 있는 면적도 입력할 수 있습니다.',
  },
  {
    question: '80 제곱미터는 몇 평인가요?',
    answer:
      '80㎡는 24.20평입니다(80 × 0.3025 = 24.20). 같은 방식으로 100㎡는 30.25평, 60㎡는 18.15평, 40㎡는 12.10평입니다. 모두 같은 면적의 단위 환산값입니다.',
  },
  {
    question: '평 변환·평수 제곱미터 전환·넓이 환산은 어떻게 다른가요?',
    answer:
      '이 페이지에서는 모두 평과 제곱미터 사이의 단위 환산을 뜻합니다. 전용면적과 공급면적의 포함 범위를 바꾸는 계산은 지원하지 않습니다.',
  },
  {
    question: '평수 계산기와 평 계산기, 평수 계산은 어떻게 다른가요?',
    answer:
      '명칭만 다를 뿐 동일 기능입니다. 한국 부동산·건설 업계에서는 단위 환산 작업을 "평수 계산", "평 변환", "평 전환" 등 다양하게 부르며, 모두 평과 제곱미터(㎡) 간 환산을 의미합니다.',
  },
] as const;

const RELATED = [
  { href: '/calculator/acquisition-tax', title: '취득세', description: '주택 구매 시' },
  { href: '/calculator/property-tax', title: '재산세', description: '연간 부과' },
  { href: '/calculator/broker-fee', title: '중개수수료', description: '거래수수료' },
];

export default function AreaConversionPage() {
  const softwareLd = buildSoftwareApplicationJsonLd({
    name: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: URL,
  });
  const webPageLd = buildWebPageJsonLd({
    name: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: URL,
    datePublished: '2026-04-24',
    dateModified: '2026-04-27',
    isPartOf: getCategoryUrlForCalculator('area'),
  });
  const howToLd = buildHowToJsonLd({
    name: '평수 계산기 사용 방법',
    description: '같은 면적의 평과 제곱미터 단위를 양방향으로 환산하는 단계별 안내',
    steps: [
      {
        name: '변환 유형 선택',
        text: '평에서 제곱미터로 변환할지, 제곱미터에서 평으로 변환할지 선택합니다.',
      },
      { name: '숫자 입력', text: '변환할 면적 수치를 입력합니다. 소수점까지 입력 가능합니다.' },
      {
        name: '결과 확인',
        text: '계산기가 자동으로 변환된 값을 표시합니다. 주요 평수 변환표도 참고하세요.',
      },
      {
        name: '면적 유형 고려',
        text: '문서의 면적 종류를 확인합니다. 면적 종류 선택은 참고 표시이며 전용면적과 공급면적을 서로 환산하지 않습니다.',
      },
      { name: '결과 활용', text: '변환된 값을 거래 계약서나 부동산 거래에 참고합니다.' },
    ],
  });
  const faqLd = buildFaqPageJsonLd(
    FAQ_ITEMS.map((f) => ({ question: f.question, answer: f.answer })),
  );
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '부동산', url: 'https://calculatorhost.com/category/real-estate/' },
    { name: '평수 환산' },
  ]);
  const speakableLd = buildSpeakableJsonLd(['[data-speakable]']);

  return (
    <>
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

      <div className="min-h-screen bg-bg-base">
        <Header />
        <div className="flex">
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
                      { name: '부동산', href: '/category/real-estate/' },
                      { name: '평수 환산' },
                    ]}
                  />
                  <h1 className="mb-3 text-4xl font-bold tracking-tight">평수 계산기 2026</h1>
                  <p className="text-lg text-text-secondary" data-speakable>
                    평과 제곱미터를 같은 면적으로 바꿔 보세요.
                  </p>
                  <AuthorByline datePublished="2026-04-24" dateModified="2026-04-27" />
                </header>
              }
              calculator={<AreaConverter />}
              related={
                <>
                  <RelatedCalculators items={RELATED} />
                </>
              }
              faq={
                <>
                  <FaqSection items={[...FAQ_ITEMS]} />
                </>
              }
            >
              <StructuredSummary
                definition="평은 관습적으로 사용되는 면적 단위입니다. 이 계산기는 1평 = 400/121㎡(약 3.3058㎡), 1㎡ = 0.3025평의 계수로 같은 면적의 단위를 환산합니다."
                table={{
                  caption: '같은 면적의 평·제곱미터 환산표',
                  headers: ['평', '제곱미터 (㎡)'],
                  rows: [
                    ['12평', '약 39.67㎡'],
                    ['24평', '약 79.34㎡'],
                    ['34평', '약 112.40㎡'],
                    ['60평', '약 198.35㎡'],
                  ],
                }}
                tldr={[
                  '84㎡ = 25.41평, 34평 ≒ 112.40㎡',
                  '평과 ㎡는 같은 면적을 표현하는 서로 다른 단위',
                  '전용면적과 공급면적은 포함 범위가 다른 면적 기준',
                  '전용·공급면적을 서로 바꾸는 계산은 지원하지 않음',
                  '비교할 때는 계약서의 면적 종류와 단위를 함께 확인',
                ]}
              />
              <section aria-label="평과 제곱미터의 관계" className="card">
                <h2 className="mb-4 text-2xl font-semibold">평과 제곱미터의 관계</h2>
                <p className="mb-4 text-text-secondary">
                  같은 면적을 평으로 표시하거나 제곱미터(㎡)로 표시할 수 있습니다. 이 계산기는
                  관습 단위인 평을 환산할 때 1평 = 400/121㎡의 계수를 사용합니다.
                </p>
                <p className="text-text-secondary">
                  예를 들어 34평은 약 112.40㎡이고, 84㎡는 25.41평입니다. 두 수치는 서로 같은
                  면적이 아닙니다. 광고의 평형과 문서의 면적을 비교하려면 단위뿐 아니라 면적의
                  종류도 확인해야 합니다.
                </p>
              </section>
              <section aria-label="면적 종류 설명" className="card">
                <h2 className="mb-4 text-2xl font-semibold">전용면적과 공급면적 구분하기</h2>
                <p className="mb-4 text-text-secondary">
                  전용면적은 세대 내부의 전용 공간을, 공급면적은 전용면적과 주거공용면적을 합한
                  면적을 가리킵니다. 대지면적은 땅의 면적입니다. 문서에 적힌 면적 종류를 확인한
                  뒤 같은 기준끼리 비교하세요.
                </p>
                <p className="text-text-secondary">
                  전용면적 84㎡를 환산하면 전용면적 25.41평입니다. 공급면적은 별도로 확인해야
                  하며, 일정 비율을 곱해 추정할 수 없습니다. 계산기의 면적 종류 선택은 참고
                  표시이며 환산 계수를 바꾸지 않습니다.
                </p>
              </section>
              <section aria-label="아파트 표기 팁" className="card">
                <h2 className="mb-4 text-2xl font-semibold">광고의 평형과 계약서 면적 비교하기</h2>
                <ul className="list-disc space-y-2 pl-5 text-text-secondary">
                  <li>계약서나 매물 자료에서 전용·공급·대지 중 어떤 면적인지 확인하세요.</li>
                  <li>같은 면적 종류의 수치를 평 또는 ㎡로 맞추어 비교하세요.</li>
                  <li>광고의 ‘34평형’만으로 전용면적이나 공급면적을 확정하지 마세요.</li>
                  <li>발코니·서비스 면적은 문서에서 별도로 어떻게 표시하는지 확인하세요.</li>
                </ul>
              </section>
              <section aria-label="주요 평수 대조표" className="card">
                <h2 className="mb-4 text-2xl font-semibold">같은 면적의 평·제곱미터 대조표</h2>
                <p className="mb-4 text-sm text-text-tertiary">
                  아래 값은 단위 환산 결과입니다. 전용면적 비율이나 침실 수를 나타내지 않습니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse text-sm">
                    <thead>
                      <tr className="border-b border-border-base">
                        <th className="px-3 py-2 text-left font-semibold text-text-primary">평</th>
                        <th className="px-3 py-2 text-right font-semibold text-text-primary">
                          같은 면적의 제곱미터 (㎡)
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ['12평', '39.67㎡'],
                        ['18평', '59.50㎡'],
                        ['24평', '79.34㎡'],
                        ['32평', '105.79㎡'],
                        ['34평', '112.40㎡'],
                        ['45평', '148.76㎡'],
                        ['60평', '198.35㎡'],
                      ].map(([pyeong, sqm]) => (
                        <tr key={pyeong} className="border-b border-border-base/50">
                          <td className="px-3 py-2 text-text-secondary">{pyeong}</td>
                          <td className="px-3 py-2 text-right font-medium tabular-nums text-text-primary">
                            약 {sqm}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
              <section aria-label="주의사항" className="card">
                <h2 className="mb-3 text-2xl font-semibold">평수 환산 시 주의사항</h2>
                <ul className="list-disc space-y-2 pl-5 text-sm text-text-secondary">
                  <li>
                    <strong>면적 기준</strong>: 전용면적과 공급면적은 서로 다른 범위입니다. 같은
                    단위로 바꾸어도 두 면적이 같아지는 것은 아닙니다.
                  </li>
                  <li>
                    <strong>발코니 확장</strong>: 확장 여부만으로 계약서의 전용면적이 늘었다고
                    판단하지 마세요. 계약서에 적힌 면적 종류와 별도 면적 표시를 확인하세요.
                  </li>
                  <li>
                    <strong>소수점 표시</strong>: 환산값을 반올림해 표시하면 마지막 자릿수에
                    차이가 생길 수 있습니다. 정확한 원래 면적은 해당 문서에서 확인하세요.
                  </li>
                  <li>
                    본 계산기는 단위 환산 참고용입니다. 실제 거래나 세금 계산에 필요한 면적의
                    종류와 수치는 계약서 등 해당 자료에서 별도로 확인하세요.
                  </li>
                </ul>
              </section>
              <section aria-label="계산 공식" className="card">
                <h2 className="mb-4 text-2xl font-semibold">평 ↔ 제곱미터 계산 공식</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="mb-2 text-lg font-medium text-text-primary">
                      평에서 제곱미터로 변환
                    </h3>
                    <p className="mb-3 rounded-lg bg-bg-card p-3 font-mono text-sm text-text-primary">
                      제곱미터 (㎡) = 평 × (400 / 121)
                    </p>
                    <p className="text-sm text-text-secondary">
                      <strong>예시</strong>: 34평 × (400 / 121) ≒ 112.40㎡
                    </p>
                  </div>
                  <div>
                    <h3 className="mb-2 text-lg font-medium text-text-primary">
                      제곱미터에서 평으로 변환
                    </h3>
                    <p className="mb-3 rounded-lg bg-bg-card p-3 font-mono text-sm text-text-primary">
                      평 = 제곱미터 (㎡) × 0.3025
                    </p>
                    <p className="text-sm text-text-secondary">
                      <strong>예시</strong>: 84㎡ × 0.3025 = 25.41평
                    </p>
                  </div>
                  <div>
                    <h3 className="mb-2 text-lg font-medium text-text-primary">계산기에 사용하는 계수</h3>
                    <p className="text-sm text-text-secondary">
                      <strong>1평 = 400/121㎡ ≒ 3.3057851239669…㎡</strong>
                    </p>
                    <p className="text-caption text-text-tertiary">
                      관습 단위인 평을 환산하기 위해 이 계산기에 적용한 계수입니다.
                    </p>
                  </div>
                </div>
              </section>
              <section aria-label="업데이트" className="card">
                <h2 className="mb-2 text-lg font-semibold">업데이트</h2>
                <ul className="text-sm text-text-secondary">
                  <li>2026-04-24: 평수 환산 계산기 초판 공개</li>
                </ul>
              </section>
              <section
                aria-label="출처 및 면책"
                className="rounded-lg border border-border-base p-4 text-caption text-text-tertiary"
              >
                <p className="mb-2">
                  <strong>단위 안내</strong>: 국가기술표준원은 제곱미터(㎡)를 법정단위로,
                  평을 비법정단위로 안내하며 1평의 환산값을 약 3.3058㎡로 제시합니다.
                </p>
                <p className="mb-2">
                  <strong>공식 출처</strong>:{' '}
                  <a
                    href="https://www.kats.go.kr/content.do?cmsid=78"
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="text-primary-600 underline dark:text-primary-500"
                  >
                    국가기술표준원 법정단위 FAQ
                  </a>
                </p>
                <p>
                  계산기에 적용한 400/121 계수 설명과 법정단위 안내는 구분됩니다. 결과는 단위
                  환산 참고값이며, 계약서의 면적 종류를 바꾸거나 법적 면적을 확정하지 않습니다.
                </p>
              </section>
            </CalculatorPageContent>
          </main>
        </div>
        <Footer />
      </div>
    </>
  );
}
