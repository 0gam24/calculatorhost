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
import Link from 'next/link';

const URL = 'https://calculatorhost.com/calculator/area/';
const PAGE_TITLE = '평수 계산기 | ㎡↔평 변환·84㎡는 몇 평?';
const PAGE_DESCRIPTION =
  '제곱미터와 평을 서로 바꿔 줍니다. 84㎡는 25.41평, 34평은 약 112.40㎡입니다. 전용·공급면적 환산은 하지 않습니다.';
const DATE_MODIFIED = '2026-10-10';

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
    '84제곱미터 평수',
    '방 평수 계산',
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
      '1평은 약 3.3058㎡입니다. 이 계산기는 1평 = 400/121㎡, 1㎡ = 0.3025평으로 환산합니다. 그래서 ㎡에 0.3025를 곱하면 평, 평에 3.3058을 곱하면 ㎡가 됩니다.',
  },
  {
    question: '아파트 84㎡는 평으로 몇 평인가요?',
    answer:
      '84㎡는 25.41평입니다(84 × 0.3025). 전용면적 84㎡라면 전용면적 25.41평이라는 뜻입니다. 흔히 부르는 "34평형"은 공급면적 기준 숫자라서 이 값과 다릅니다.',
  },
  {
    question: '59㎡는 몇 평인가요?',
    answer:
      '59㎡는 약 17.85평입니다(59 × 0.3025). 같은 방식으로 74㎡는 약 22.39평, 101㎡는 약 30.55평, 114㎡는 약 34.49평입니다. 계산기의 전용면적 빠른 선택 버튼을 누르면 바로 나옵니다.',
  },
  {
    question: '34평은 몇 제곱미터인가요?',
    answer:
      '34평은 약 112.40㎡입니다(34 × 3.3058). 같은 면적을 다른 단위로 표현한 값이며, 전용면적 34평인지 공급면적 34평인지는 해당 문서에서 따로 확인해야 합니다.',
  },
  {
    question: '방 크기(가로·세로)로 평수를 어떻게 계산하나요?',
    answer:
      '가로(m) × 세로(m)로 ㎡를 구한 뒤 0.3025를 곱합니다. 가로 3.6m, 세로 4.2m인 방은 15.12㎡이고 약 4.57평입니다. 계산기의 "방 크기로 평수 계산" 칸에 길이를 넣으면 바로 나옵니다.',
  },
  {
    question: '34평형 아파트인데 전용면적이 25평인 이유는?',
    answer:
      '평형은 보통 공급면적(전용면적 + 계단·복도 같은 주거공용면적)을 평으로 바꾼 숫자이기 때문입니다. 전용 84㎡(25.41평) 아파트도 공급면적이 크면 34평형으로 부릅니다. 공용면적은 단지마다 달라 비율로 추정할 수 없으니 분양 공고나 건축물대장을 확인하세요.',
  },
  {
    question: '전용면적·공급면적·대지면적은 무엇인가요?',
    answer:
      '전용면적은 세대 내부의 전용 공간, 공급면적은 전용면적과 주거공용면적을 합한 면적, 대지면적은 땅의 면적입니다. 포함 범위가 다르므로 같은 종류끼리 비교해야 하며, 이 계산기는 전용면적과 공급면적을 서로 환산하지 않습니다.',
  },
  {
    question: '80 제곱미터는 몇 평인가요?',
    answer:
      '80㎡는 24.20평입니다(80 × 0.3025). 같은 방식으로 100㎡는 30.25평, 60㎡는 18.15평, 40㎡는 12.10평입니다. 평 변환, 평수 제곱미터 전환, 넓이 환산 모두 이 계산을 뜻합니다.',
  },
] as const;

const RELATED = [
  { href: '/calculator/acquisition-tax/', title: '취득세', description: '주택 구매 시' },
  { href: '/calculator/property-tax/', title: '재산세', description: '연간 부과' },
  { href: '/calculator/broker-fee/', title: '중개수수료', description: '거래수수료' },
];

const EXCLUSIVE_ROWS = [
  ['59㎡', '약 17.85평', '소형 아파트에서 흔한 면적'],
  ['74㎡', '약 22.39평', ''],
  ['84㎡', '25.41평', '국민주택규모(85㎡) 바로 아래'],
  ['85㎡', '약 25.71평', '국민주택규모 상한'],
  ['101㎡', '약 30.55평', ''],
  ['114㎡', '약 34.49평', ''],
  ['135㎡', '약 40.84평', ''],
] as const;

const thClass = 'px-3 py-2 font-semibold text-text-primary';

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
    dateModified: DATE_MODIFIED,
    isPartOf: getCategoryUrlForCalculator('area'),
  });
  const howToLd = buildHowToJsonLd({
    name: '평수 계산기 사용 방법',
    description:
      '같은 면적의 평과 제곱미터 단위를 양방향으로 환산하고 방 크기로 평수를 구하는 안내',
    steps: [
      {
        name: '단위 선택',
        text: '평에서 제곱미터로 바꿀지, 제곱미터에서 평으로 바꿀지 선택합니다.',
      },
      {
        name: '숫자 입력',
        text: '면적을 입력하거나 아파트 전용면적 빠른 선택(59·74·84·101·114㎡)을 누릅니다.',
      },
      {
        name: '방 크기 계산',
        text: '방 평수가 궁금하면 가로·세로 길이(m)를 넣어 ㎡와 평을 함께 확인합니다.',
      },
      {
        name: '면적 종류 확인',
        text: '문서의 면적이 전용·공급·대지 중 무엇인지 확인합니다. 이 계산기는 면적 종류를 서로 환산하지 않습니다.',
      },
      { name: '결과 활용', text: '환산값을 매물 비교나 계약서 확인에 참고합니다.' },
    ],
  });
  const faqLd = buildFaqPageJsonLd(
    FAQ_ITEMS.map((f) => ({ question: f.question, answer: f.answer })),
  );
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '부동산', url: 'https://calculatorhost.com/category/real-estate/' },
    { name: '평수 계산기' },
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
                      { name: '평수 계산기' },
                    ]}
                  />
                  <h1 className="mb-3 text-4xl font-bold tracking-tight">
                    평수 계산기 (㎡ ↔ 평 변환)
                  </h1>
                  <p className="text-lg text-text-secondary" data-speakable>
                    제곱미터(㎡)와 평을 서로 바꾸고, 방 가로·세로 길이로 평수도 구합니다. 아파트
                    전용 84㎡는 25.41평입니다.
                  </p>
                  <AuthorByline datePublished="2026-04-24" dateModified={DATE_MODIFIED} />
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
                definition="평은 관습적으로 쓰는 면적 단위입니다. 이 계산기는 1평 = 400/121㎡(약 3.3058㎡), 1㎡ = 0.3025평으로 같은 면적의 단위를 바꿉니다."
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
                  '㎡ × 0.3025 = 평, 평 × 3.3058 = ㎡',
                  '84㎡ = 25.41평, 59㎡ ≒ 17.85평, 34평 ≒ 112.40㎡',
                  '방 평수 = 가로(m) × 세로(m) × 0.3025',
                  '광고의 "34평형"은 공급면적 기준이라 전용 평수와 다름',
                  '전용·공급면적을 서로 바꾸는 계산은 지원하지 않음',
                ]}
              />
              <section aria-label="평과 제곱미터의 관계" className="card">
                <h2 className="mb-4 text-2xl font-semibold">평과 제곱미터, 어떻게 바꾸나요?</h2>
                <p className="mb-4 text-text-secondary" data-speakable>
                  제곱미터에 0.3025를 곱하면 평이고, 평에 3.3058을 곱하면 제곱미터입니다. 같은
                  면적을 다른 단위로 적은 것일 뿐이라 숫자만 바뀌고 넓이는 그대로입니다.
                </p>
                <p className="mb-4 text-text-secondary">
                  예를 들어 34평은 약 112.40㎡이고, 84㎡는 25.41평입니다. 법정 단위는 제곱미터라
                  계약서·등기부·건축물대장에는 ㎡로 적히고, 평은 생활에서 넓이를 짐작할 때 주로
                  씁니다.
                </p>
                <p className="text-sm text-text-secondary">
                  다만, 광고의 평형과 문서의 면적을 비교할 때는 단위만 맞추면 안 됩니다.
                  전용면적인지 공급면적인지가 다르면 같은 단위로 바꿔도 숫자가 맞지 않습니다.
                </p>
              </section>
              <section aria-label="아파트 전용면적별 평수" className="card">
                <h2 className="mb-4 text-2xl font-semibold">아파트 전용면적은 몇 평인가요?</h2>
                <p className="mb-4 text-text-secondary">
                  분양 공고와 매물 정보에서 자주 보는 전용면적을 평으로 바꾼 값입니다. 계산기의
                  전용면적 빠른 선택 버튼으로도 바로 볼 수 있습니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse text-sm">
                    <caption className="mb-2 text-left text-text-tertiary">
                      전용면적 ㎡를 평으로 환산 (㎡ × 0.3025)
                    </caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className={`${thClass} text-left`}>
                          전용면적
                        </th>
                        <th scope="col" className={`${thClass} text-right`}>
                          평
                        </th>
                        <th scope="col" className={`${thClass} text-left`}>
                          참고
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {EXCLUSIVE_ROWS.map(([sqm, pyeong, note]) => (
                        <tr key={sqm} className="border-border-base/50 border-b">
                          <td className="px-3 py-2 text-text-secondary">{sqm}</td>
                          <td className="px-3 py-2 text-right font-medium tabular-nums text-text-primary">
                            {pyeong}
                          </td>
                          <td className="px-3 py-2 text-text-secondary">{note}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
              <section aria-label="84제곱미터가 많은 이유" className="card">
                <h2 className="mb-4 text-2xl font-semibold">왜 전용 84㎡ 아파트가 많을까요?</h2>
                <p className="mb-4 text-text-secondary" data-speakable>
                  국민주택규모 상한이 전용 85㎡이기 때문입니다. 주택법 §2 제6호는 주거전용면적이
                  1세대당 85㎡ 이하인 주택(수도권을 제외한 도시지역이 아닌 읍·면은 100㎡ 이하)을
                  국민주택규모로 정합니다. 그래서 그 바로 아래인 84㎡ 평면이 많이 지어집니다.
                </p>
                <p className="mb-4 text-text-secondary">
                  85㎡는 약 25.71평입니다. 이 경계는 세금에도 쓰입니다. 일반 주택을 살 때
                  국민주택규모 이하면 취득세에 붙는 농어촌특별세가 빠지고, 넘으면 붙습니다. 실제
                  금액은{' '}
                  <Link
                    href="/calculator/acquisition-tax/"
                    className="text-primary-600 underline dark:text-primary-500"
                  >
                    취득세 계산기
                  </Link>
                  에서 면적 조건을 넣어 확인하세요.
                </p>
                <p className="text-sm text-text-secondary">
                  예외: 같은 84㎡라도 광고에서는 공급면적 기준으로 &quot;33평형&quot;,
                  &quot;34평형&quot;처럼 다르게 부를 수 있습니다. 계단·복도 같은 주거공용면적이
                  단지마다 달라서이며, 정확한 공급면적은 분양 공고나 건축물대장에서 확인해야 합니다.
                </p>
              </section>
              <section aria-label="방 크기로 평수 구하기" className="card">
                <h2 className="mb-4 text-2xl font-semibold">
                  방 크기(가로·세로)로 평수 구하는 법은?
                </h2>
                <p className="mb-4 text-text-secondary" data-speakable>
                  가로와 세로 길이(m)를 곱해 ㎡를 구하고, 거기에 0.3025를 곱하면 평입니다. 줄자로 벽
                  안쪽 길이를 재서 cm를 m로 바꿔 넣으면 됩니다.
                </p>
                <div className="mb-4 overflow-x-auto">
                  <table className="w-full border-collapse text-sm">
                    <caption className="mb-2 text-left text-text-tertiary">
                      가로 × 세로 예시 (직사각형 공간)
                    </caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className={`${thClass} text-left`}>
                          공간
                        </th>
                        <th scope="col" className={`${thClass} text-right`}>
                          가로 × 세로
                        </th>
                        <th scope="col" className={`${thClass} text-right`}>
                          면적
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-border-base/50 border-b">
                        <td className="px-3 py-2 text-text-secondary">작은 방</td>
                        <td className="px-3 py-2 text-right tabular-nums">3.6m × 4.2m</td>
                        <td className="px-3 py-2 text-right tabular-nums text-text-primary">
                          15.12㎡ (약 4.57평)
                        </td>
                      </tr>
                      <tr className="border-border-base/50 border-b">
                        <td className="px-3 py-2 text-text-secondary">원룸</td>
                        <td className="px-3 py-2 text-right tabular-nums">5m × 4m</td>
                        <td className="px-3 py-2 text-right tabular-nums text-text-primary">
                          20㎡ (6.05평)
                        </td>
                      </tr>
                      <tr>
                        <td className="px-3 py-2 text-text-secondary">거실</td>
                        <td className="px-3 py-2 text-right tabular-nums">6m × 4.5m</td>
                        <td className="px-3 py-2 text-right tabular-nums text-text-primary">
                          27㎡ (약 8.17평)
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-sm text-text-secondary">
                  다만, ㄱ자처럼 꺾인 공간은 직사각형 두 개로 나눠 각각 구한 뒤 더하세요. 4m × 3m와
                  2m × 2m로 나뉘면 12㎡ + 4㎡ = 16㎡, 약 4.84평입니다. 벽 두께가 들어간 도면 치수로
                  재면 실제 바닥보다 조금 크게 나옵니다.
                </p>
              </section>
              <section aria-label="면적 종류 설명" className="card">
                <h2 className="mb-4 text-2xl font-semibold">
                  전용면적과 공급면적, 무엇이 다른가요?
                </h2>
                <p className="mb-4 text-text-secondary">
                  전용면적은 세대 내부의 전용 공간을, 공급면적은 전용면적과 주거공용면적을 합한
                  면적을 가리킵니다. 대지면적은 땅의 면적입니다. 문서에 적힌 면적 종류를 확인한 뒤
                  같은 기준끼리 비교하세요.
                </p>
                <p className="text-text-secondary">
                  전용면적 84㎡를 환산하면 전용면적 25.41평입니다. 공급면적은 별도로 확인해야 하며,
                  일정 비율을 곱해 추정할 수 없습니다. 계산기의 면적 종류 선택은 참고 표시이며 환산
                  계수를 바꾸지 않습니다.
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
                        <th scope="col" className={`${thClass} text-left`}>
                          평
                        </th>
                        <th scope="col" className={`${thClass} text-right`}>
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
                        <tr key={pyeong} className="border-border-base/50 border-b">
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
                    <strong>소수점 표시</strong>: 환산값을 반올림해 표시하면 마지막 자릿수에 차이가
                    생길 수 있습니다. 정확한 원래 면적은 해당 문서에서 확인하세요.
                  </li>
                  <li>
                    본 계산기는 단위 환산 참고용입니다. 실제 거래나 세금 계산에 필요한 면적의 종류와
                    수치는 계약서 등 해당 자료에서 별도로 확인하세요.
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
                    <h3 className="mb-2 text-lg font-medium text-text-primary">
                      가로·세로로 평수 구하기
                    </h3>
                    <p className="mb-3 rounded-lg bg-bg-card p-3 font-mono text-sm text-text-primary">
                      평 = 가로(m) × 세로(m) × 0.3025
                    </p>
                    <p className="text-sm text-text-secondary">
                      <strong>예시</strong>: 3.6m × 4.2m = 15.12㎡, × 0.3025 ≒ 4.57평
                    </p>
                  </div>
                  <div>
                    <h3 className="mb-2 text-lg font-medium text-text-primary">
                      계산기에 사용하는 계수
                    </h3>
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
                <ul className="space-y-1 text-sm text-text-secondary">
                  <li>
                    2026-10-10: 방 크기(가로 × 세로) 평수 계산, 아파트 전용면적 빠른 선택,
                    전용면적별 평수 표와 국민주택규모(85㎡) 설명 추가
                  </li>
                  <li>2026-04-24: 평수 환산 계산기 초판 공개</li>
                </ul>
              </section>
              <section
                aria-label="출처 및 면책"
                className="rounded-lg border border-border-base p-4 text-caption text-text-tertiary"
              >
                <p className="mb-2">
                  <strong>단위 안내</strong>: 국가기술표준원은 제곱미터(㎡)를 법정단위로, 평을
                  비법정단위로 안내하며 1평의 환산값을 약 3.3058㎡로 제시합니다.
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
                  ,{' '}
                  <a
                    href="https://www.law.go.kr/%EB%B2%95%EB%A0%B9/%EC%A3%BC%ED%83%9D%EB%B2%95"
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="text-primary-600 underline dark:text-primary-500"
                  >
                    국가법령정보센터 주택법(§2 제6호 국민주택규모)
                  </a>
                </p>
                <p>
                  계산기에 적용한 400/121 계수 설명과 법정단위 안내는 구분됩니다. 결과는 단위 환산
                  참고값이며, 계약서의 면적 종류를 바꾸거나 법적 면적을 확정하지 않습니다.
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
