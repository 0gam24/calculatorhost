import type { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { Footer } from '@/components/layout/Footer';
import { AdSlot } from '@/components/ads/AdSlot';
import { StructuredSummary } from '@/components/calculator/StructuredSummary';
import { FaqSection } from '@/components/calculator/FaqSection';
import { RelatedCalculators } from '@/components/calculator/RelatedCalculators';
import {
  buildSoftwareApplicationJsonLd,
  buildFaqPageJsonLd,
  buildBreadcrumbJsonLd,
  buildSpeakableJsonLd,
  buildWebPageJsonLd,
  buildHowToJsonLd,
} from '@/lib/seo/jsonld';
import { AreaConverter } from './AreaConverter';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { AuthorByline } from '@/components/calculator/AuthorByline';

const URL = 'https://calculatorhost.com/calculator/area/';

export const metadata: Metadata = {
  title: '평수 계산기 2026 | 평↔제곱미터 변환 | calculatorhost',
  description:
    '1평 = 약 3.3058㎡ 공식 기반 양방향 변환 계산기. 전용·공급·대지면적 구분, 주요 평수(24·32·34평 등) 변환표까지 한눈에. 계량법 표준 반영.',
  alternates: { canonical: URL },
  openGraph: {
    title: '평수 계산기 2026 | 평↔제곱미터 변환',
    description: '1평 = 약 3.3058㎡ 공식 기반 양방향 변환 계산기.',
    url: URL,
    type: 'website',
    images: ['/og-default.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: '평수 계산기 2026',
    description: '평과 제곱미터를 즉시 양방향 변환하세요.',
  },
};

const FAQ_ITEMS = [
  {
    question: '1평은 몇 제곱미터인가요?',
    answer:
      '1평은 약 3.3058㎡입니다(정확히는 400/121㎡). 이는 일본의 전통 척관법에서 유래한 한국의 관습 단위로, 한국의 부동산 표기에서 아직도 널리 사용됩니다(계량법 시행령 §9).',
  },
  {
    question: '34평은 몇 제곱미터인가요?',
    answer:
      '34평은 약 112.40㎡입니다(34 × 3.3058 ≒ 112.40). 아파트 표기에서 "34평"은 건설사가 분양 기준으로 사용하는 대략적인 면적이며, 실제 공급면적은 단지마다 다를 수 있습니다.',
  },
  {
    question: '전용면적·공급면적·대지면적은 무엇인가요?',
    answer:
      '전용면적은 실제로 사용할 수 있는 면적(거실, 침실, 욕실 등), 공급면적은 전용면적에 공용 부분(엘리베이터, 복도 등)을 포함한 면적, 대지면적은 건물이 지어진 땅의 면적입니다. 일반적으로 아파트 "평수"는 공급면적을 기준으로 표기됩니다.',
  },
  {
    question: '국토교통부는 왜 제곱미터를 사용하나요?',
    answer:
      '제곱미터(㎡)는 국제표준 단위계(SI)의 넓이 단위로, 2002년부터 모든 공식 부동산 거래와 정부 문서에서 의무적으로 사용됩니다(계량법 §1 및 시행령 §9). 반면 "평"은 관습 단위로 일반 거래에서만 선택적으로 사용됩니다.',
  },
  {
    question: '아파트 84㎡는 평으로 몇 평인가요?',
    answer:
      '84㎡는 약 25.41평입니다(84 ÷ 3.3058 ≒ 25.4). 하지만 건설사 표기에서는 보통 "26평"이라고 표현합니다. 공급면적(84㎡)과 전용면적의 차이 때문에 실제 표기되는 평수가 다를 수 있습니다.',
  },
  {
    question: '음수나 0을 입력하면 어떻게 되나요?',
    answer:
      '음수를 입력하면 경고 메시지와 함께 0으로 처리됩니다. 0을 입력하면 변환값도 0이 됩니다. 일반적으로 면적은 양수만 입력하므로, 음수 입력은 실수로 본 것으로 간주합니다.',
  },
] as const;

const RELATED = [
  { href: '/calculator/acquisition-tax', title: '취득세', description: '주택 구매 시' },
  { href: '/calculator/property-tax', title: '재산세', description: '연간 부과' },
  { href: '/calculator/broker-fee', title: '중개수수료', description: '거래수수료' },
];

export default function AreaConversionPage() {
  const softwareLd = buildSoftwareApplicationJsonLd({
    name: '평수 계산기',
    description: '계량법 기준 평과 제곱미터 양방향 변환 계산기',
    url: URL,
  });
  const webPageLd = buildWebPageJsonLd({
    name: '평수 계산기 2026',
    description: '평과 제곱미터를 양방향으로 변환하는 무료 계산기',
    url: URL,
    datePublished: '2026-04-24',
    dateModified: '2026-04-27',
  });
  const howToLd = buildHowToJsonLd({
    name: '평수 계산기 사용 방법',
    description: '평과 제곱미터를 양방향으로 변환하는 단계별 가이드',
    steps: [
      { name: '변환 유형 선택', text: '평에서 제곱미터로 변환할지, 제곱미터에서 평으로 변환할지 선택합니다.' },
      { name: '숫자 입력', text: '변환할 면적 수치를 입력합니다. 소수점까지 입력 가능합니다.' },
      { name: '결과 확인', text: '계산기가 자동으로 변환된 값을 표시합니다. 주요 평수 변환표도 참고하세요.' },
      { name: '면적 유형 고려', text: '전용면적, 공급면적, 대지면적 등 면적의 종류를 구분하여 정확히 변환합니다.' },
      { name: '결과 활용', text: '변환된 값을 거래 계약서나 부동산 거래에 참고합니다.' },
    ],
  });
  const faqLd = buildFaqPageJsonLd(FAQ_ITEMS.map((f) => ({ question: f.question, answer: f.answer })));
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
          <Sidebar />
          <main id="main-content" className="flex-1 px-4 py-8 md:px-8">
            <div className="mx-auto flex max-w-4xl flex-col gap-8">
              {/* H1 + 리드 */}
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
                  한국의 부동산 표기에서 자주 쓰이는 "평"과 국제표준 "제곱미터(㎡)"를 양방향으로 자유롭게 변환할 수 있는 무료 계산기입니다. 전용면적, 공급면적, 대지면적을 구분하여 입력할 수 있으며, 자주 쓰는 평수(24평, 32평, 34평 등)의 변환표도 함께 제공합니다.
                </p>
                <AuthorByline datePublished="2026-04-24" dateModified="2026-04-27" />
              </header>

              {/* GEO/AEO Structured Summary */}
              <StructuredSummary
                definition="평(坪)은 한국 부동산에서 관습적으로 사용되는 단위로, 1평 = 약 3.3058㎡입니다. 국제표준인 제곱미터(㎡)와 달리 계량법상 법정 단위가 아니지만, 일반 부동산 거래와 아파트 분양 기준으로 광범위하게 사용됩니다(계량법 시행령 §9)."
                table={{
                  caption: '주요 평수 변환표',
                  headers: ['평', '제곱미터 (㎡)'],
                  rows: [
                    ['12평', '약 39.67㎡'],
                    ['24평', '약 79.34㎡'],
                    ['34평', '약 112.40㎡'],
                    ['60평', '약 198.35㎡'],
                  ],
                }}
                tldr={[
                  '1평 = 3.3058㎡, 1㎡ = 0.3025평',
                  '전용면적(실사용), 공급면적(공용포함), 대지면적(땅)의 3가지 구분',
                  '아파트 분양은 주로 "공급면적" 기준으로 "평"으로 표기',
                  '실제 거래·등기에는 제곱미터만 공식',
                  '건설사 "34평"과 공시가격 "84㎡"는 같은 아파트를 다르게 표현한 것',
                ]}
              />

              <AdSlot slot="area-top" format="horizontal" />

              {/* 계산기 */}
              <AreaConverter />

              {/* FAQ (중간 배치 - GEO 권장) */}
              <FaqSection items={[...FAQ_ITEMS]} />

              {/* 평과 제곱미터의 관계 */}
              <section aria-label="평과 제곱미터의 관계" className="card">
                <h2 className="mb-4 text-2xl font-semibold">평과 제곱미터의 관계</h2>
                <p className="mb-4 text-text-secondary">
                  한국의 부동산 시장에서 "평"은 여전히 널리 사용되는 단위이지만, 국제표준인 제곱미터(㎡)도 함께 사용됩니다. "평"은 일본의 척관법에서 유래한 단위로, 1평은 정확히 400/121㎡ 즉 약 3.3058㎡입니다(계량법 시행령 §9).
                </p>
                <p className="mb-4 text-text-secondary">
                  정부와 공공 문서에서는 2002년부터 제곱미터만 사용하도록 의무화했지만, 일반인의 부동산 거래에서는 아직도 "평"으로 표현하는 것이 관습입니다. 예를 들어 아파트 분양 광고에서 "34평"이라고 하면, 이는 공급면적이 약 112.4㎡ 정도라는 의미입니다.
                </p>
                <p className="text-text-secondary">
                  양쪽 단위를 모두 이해하고 자유롭게 변환할 수 있으면, 부동산 거래 시 정확한 의사 결정을 내리는 데 도움이 됩니다.
                </p>
              </section>

              {/* 전용·공급·공용·대지 면적 차이 */}
              <section aria-label="면적 종류 설명" className="card">
                <h2 className="mb-4 text-2xl font-semibold">아파트의 4가지 면적: 전용·공급·공용·대지</h2>
                <div className="mb-6 overflow-x-auto">
                  <table className="w-full border-collapse text-sm">
                    <thead>
                      <tr className="border-b border-border-base">
                        <th className="px-3 py-2 text-left font-semibold text-text-primary">
                          면적 종류
                        </th>
                        <th className="px-3 py-2 text-left font-semibold text-text-primary">
                          포함 범위
                        </th>
                        <th className="px-3 py-2 text-left font-semibold text-text-primary">
                          용도
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base/50">
                        <td className="px-3 py-2 font-medium text-text-primary">전용면적</td>
                        <td className="px-3 py-2 text-text-secondary">
                          거실, 침실, 주방, 욕실, 발코니 확장 등 입주자만 사용 가능한 면적
                        </td>
                        <td className="px-3 py-2 text-text-secondary">
                          개인 거주 공간, 계약·등기 기준
                        </td>
                      </tr>
                      <tr className="border-b border-border-base/50">
                        <td className="px-3 py-2 font-medium text-text-primary">공급면적</td>
                        <td className="px-3 py-2 text-text-secondary">
                          전용면적 + 엘리베이터홀, 복도, 계단실 등 공용 부분 배분액
                        </td>
                        <td className="px-3 py-2 text-text-secondary">
                          분양가 기준, 아파트 분양 광고 "평수" 기준
                        </td>
                      </tr>
                      <tr className="border-b border-border-base/50">
                        <td className="px-3 py-2 font-medium text-text-primary">공용면적</td>
                        <td className="px-3 py-2 text-text-secondary">
                          로비, 복도, 계단실, 엘리베이터, 기계실 등 모든 주민이 사용하는 공간
                        </td>
                        <td className="px-3 py-2 text-text-secondary">
                          아파트 전체 면적 파악, 관리비 기준
                        </td>
                      </tr>
                      <tr>
                        <td className="px-3 py-2 font-medium text-text-primary">대지면적</td>
                        <td className="px-3 py-2 text-text-secondary">
                          아파트 건물이 지어진 부지(땅)의 면적
                        </td>
                        <td className="px-3 py-2 text-text-secondary">
                          등기부등본 기재, 양도세·취득세 기준
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-text-secondary">
                  <strong>예시</strong>: 아파트 공급면적 84㎡(약 25.4평)인 경우, 전용면적은 약 59㎡(18평), 공용면적 배분액이 약 25㎡(7.6평) 정도가 됩니다. 광고에서는 보통 공급면적 기준으로 "26평"이라고 표기합니다.
                </p>
              </section>

              {/* "34평" vs "84㎡" 실무 팁 */}
              <section aria-label="아파트 표기 팁" className="card">
                <h2 className="mb-4 text-2xl font-semibold">
                  아파트 거래 시 주의: "34평" vs "84㎡" 차이
                </h2>
                <p className="mb-4 text-text-secondary">
                  부동산 거래 시 가장 혼동하기 쉬운 부분이 "평"과 "제곱미터"의 표기 차이입니다. 예를 들어 건설사 광고에서는 "34평 아파트"라고 하지만, 실제 등기부등본이나 공시가격은 "공급면적 84㎡"로 표기됩니다.
                </p>
                <p className="mb-4 text-text-secondary">
                  이 차이는 단순한 단위 변환이 아니라, <strong>기준이 다르기 때문</strong>입니다:
                </p>
                <ul className="mb-4 list-disc space-y-2 pl-5 text-text-secondary">
                  <li>
                    <strong>건설사 "34평"</strong>: 분양 기준 공급면적을 대략적인 평수로 표현한 것.
                    실제로는 84~86㎡ 수준일 수 있음.
                  </li>
                  <li>
                    <strong>정부 "84㎡"</strong>: 공식 등기와 공시가격에 기재되는 정확한 공급면적.
                    양도세, 취득세, 재산세 계산의 기준.
                  </li>
                  <li>
                    <strong>계약서</strong>: 보통 "공급면적 84.56㎡(약 25.6평)"이라고 양쪽 단위를 모두
                    기재합니다.
                  </li>
                </ul>
                <p className="mb-4 text-text-secondary">
                  <strong>거래 팁</strong>: 아파트 계약 전에 계약서의 "공급면적(㎡)"을 정확히 확인하고, 이것이 광고 "평수"와 실제로 맞는지 재확인하세요. 1평 차이도 거래액에 몇 백만원의 영향을 미칠 수 있습니다.
                </p>
              </section>

              {/* 자주 쓰는 대조표 */}
              <section aria-label="주요 평수 대조표" className="card">
                <h2 className="mb-4 text-2xl font-semibold">주요 평수와 제곱미터 대조표</h2>
                <p className="mb-4 text-sm text-text-tertiary">
                  한국 아파트 분양에서 자주 사용되는 평수별 공급면적 대조표입니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse text-sm">
                    <thead>
                      <tr className="border-b border-border-base">
                        <th className="px-3 py-2 text-left font-semibold text-text-primary">
                          분양 표기 (평)
                        </th>
                        <th className="px-3 py-2 text-right font-semibold text-text-primary">
                          공급면적 (㎡)
                        </th>
                        <th className="px-3 py-2 text-right font-semibold text-text-primary">
                          전용면적 (대략)
                        </th>
                        <th className="px-3 py-2 text-left font-semibold text-text-primary">
                          비고
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base/50">
                        <td className="px-3 py-2 text-text-secondary">12평</td>
                        <td className="px-3 py-2 text-right text-text-primary font-medium tabular-nums">
                          39.67㎡
                        </td>
                        <td className="px-3 py-2 text-right text-text-secondary tabular-nums">
                          약 28㎡
                        </td>
                        <td className="px-3 py-2 text-text-tertiary">원룸·오피스텔</td>
                      </tr>
                      <tr className="border-b border-border-base/50">
                        <td className="px-3 py-2 text-text-secondary">18평</td>
                        <td className="px-3 py-2 text-right text-text-primary font-medium tabular-nums">
                          59.50㎡
                        </td>
                        <td className="px-3 py-2 text-right text-text-secondary tabular-nums">
                          약 42㎡
                        </td>
                        <td className="px-3 py-2 text-text-tertiary">1침실</td>
                      </tr>
                      <tr className="border-b border-border-base/50">
                        <td className="px-3 py-2 text-text-secondary">24평</td>
                        <td className="px-3 py-2 text-right text-text-primary font-medium tabular-nums">
                          79.34㎡
                        </td>
                        <td className="px-3 py-2 text-right text-text-secondary tabular-nums">
                          약 56㎡
                        </td>
                        <td className="px-3 py-2 text-text-tertiary">2침실 소형</td>
                      </tr>
                      <tr className="border-b border-border-base/50">
                        <td className="px-3 py-2 text-text-secondary">32평</td>
                        <td className="px-3 py-2 text-right text-text-primary font-medium tabular-nums">
                          105.78㎡
                        </td>
                        <td className="px-3 py-2 text-right text-text-secondary tabular-nums">
                          약 75㎡
                        </td>
                        <td className="px-3 py-2 text-text-tertiary">2-3침실 표준</td>
                      </tr>
                      <tr className="border-b border-border-base/50">
                        <td className="px-3 py-2 text-text-secondary">34평</td>
                        <td className="px-3 py-2 text-right text-text-primary font-medium tabular-nums">
                          112.40㎡
                        </td>
                        <td className="px-3 py-2 text-right text-text-secondary tabular-nums">
                          약 79㎡
                        </td>
                        <td className="px-3 py-2 text-text-tertiary">3침실 표준</td>
                      </tr>
                      <tr className="border-b border-border-base/50">
                        <td className="px-3 py-2 text-text-secondary">45평</td>
                        <td className="px-3 py-2 text-right text-text-primary font-medium tabular-nums">
                          148.76㎡
                        </td>
                        <td className="px-3 py-2 text-right text-text-secondary tabular-nums">
                          약 105㎡
                        </td>
                        <td className="px-3 py-2 text-text-tertiary">3-4침실 대형</td>
                      </tr>
                      <tr>
                        <td className="px-3 py-2 text-text-secondary">60평</td>
                        <td className="px-3 py-2 text-right text-text-primary font-medium tabular-nums">
                          198.35㎡
                        </td>
                        <td className="px-3 py-2 text-right text-text-secondary tabular-nums">
                          약 140㎡
                        </td>
                        <td className="px-3 py-2 text-text-tertiary">4침실 초대형</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4 text-caption text-text-tertiary">
                  <strong>주의</strong>: 실제 아파트의 공급면적은 단지와 구조에 따라 다소 차이가 날 수 있습니다.
                  정확한 면적은 항상 계약서와 등기부등본을 확인하세요.
                </p>
              </section>

              {/* 주의사항 */}
              <section aria-label="주의사항" className="card">
                <h2 className="mb-3 text-2xl font-semibold">평수환산 시 주의사항</h2>
                <ul className="list-disc space-y-2 pl-5 text-sm text-text-secondary">
                  <li>
                    <strong>발코니 확장 영향</strong>: 발코니를 확장한 경우 전용면적이 증가하므로 기본 전용면적과 다릅니다. 계약서에서 확장 전후 면적을 확인하세요.
                  </li>
                  <li>
                    <strong>서비스 면적</strong>: 일부 아파트는 "서비스 면적"(발코니 등 조건부 면적)을 별도로 표기하기도 합니다. 이는 면적 계산에 포함되지 않습니다.
                  </li>
                  <li>
                    <strong>건물 구조에 따른 차이</strong>: 같은 34평이라도 건설사, 지역, 연도에 따라 실제 공급면적(㎡)은 달를 수 있습니다.
                  </li>
                  <li>
                    <strong>정부 공식 기준</strong>: 세금 계산, 등기, 공시가격은 모두 제곱미터(㎡) 기준입니다. 평은 참고용일 뿐 법적 기준이 아닙니다.
                  </li>
                  <li>
                    <strong>해외 아파트</strong>: 미국(평방피트), 일본(제곱미터), 유럽(제곱미터) 등 국가마다 단위가 다르므로 별도 변환이 필요합니다.
                  </li>
                  <li>
                    본 계산기는 참고용이며, 실제 부동산 거래나 세금 계산 시에는 공식 문서(계약서, 등기부등본, 공시가격)를 반드시 확인하세요.
                  </li>
                </ul>
              </section>

              {/* 계산 공식 */}
              <section aria-label="계산 공식" className="card">
                <h2 className="mb-4 text-2xl font-semibold">평 ↔ 제곱미터 계산 공식</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="mb-2 text-lg font-medium text-text-primary">평에서 제곱미터로 변환</h3>
                    <p className="mb-3 rounded-lg bg-bg-card p-3 text-sm font-mono text-text-primary">
                      제곱미터 (㎡) = 평 × 3.3058
                    </p>
                    <p className="text-sm text-text-secondary">
                      <strong>예시</strong>: 34평 × 3.3058 = 112.40㎡
                    </p>
                  </div>
                  <div>
                    <h3 className="mb-2 text-lg font-medium text-text-primary">제곱미터에서 평으로 변환</h3>
                    <p className="mb-3 rounded-lg bg-bg-card p-3 text-sm font-mono text-text-primary">
                      평 = 제곱미터 (㎡) × 0.3025
                    </p>
                    <p className="text-sm text-text-secondary">
                      <strong>예시</strong>: 112.40㎡ × 0.3025 = 34.00평
                    </p>
                  </div>
                  <div>
                    <h3 className="mb-2 text-lg font-medium text-text-primary">정확한 계수</h3>
                    <p className="text-sm text-text-secondary">
                      <strong>1평 = 400/121 m² = 3.3057851239669...㎡</strong>
                    </p>
                    <p className="text-caption text-text-tertiary">
                      출처: 계량법 시행령 §9. 한국은 1평을 정확히 400/121㎡로 규정합니다.
                    </p>
                  </div>
                </div>
              </section>

              {/* 관련 계산기 */}
              <RelatedCalculators items={RELATED} />

              {/* 업데이트 로그 */}
              <section aria-label="업데이트" className="card">
                <h2 className="mb-2 text-lg font-semibold">업데이트</h2>
                <ul className="text-sm text-text-secondary">
                  <li>2026-04-24: 평수 환산 계산기 초판 공개</li>
                </ul>
              </section>

              {/* 출처·면책 */}
              <section
                aria-label="출처 및 면책"
                className="rounded-lg border border-border-base p-4 text-caption text-text-tertiary"
              >
                <p className="mb-2">
                  <strong>법적 근거</strong>: 계량법 §1 · 계량법 시행령 §9 · 건축법 시행령 §2 (바닥면적)
                </p>
                <p className="mb-2">
                  <strong>공식 출처</strong>: <a href="https://www.law.go.kr" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-600 underline dark:text-primary-500">국가법령정보센터</a> 법령 검색, <a href="https://kostat.go.kr" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-600 underline dark:text-primary-500">통계청</a> 표준 단위 정보.
                </p>
                <p>
                  본 계산기의 결과는 참고용이며 법적 효력이 없습니다. 실제 부동산 거래, 세금 계산, 등기 시에는 정부 공식 문서(계약서, 등기부등본, 공시가격)를 반드시 확인하시기 바랍니다.
                </p>
              </section>

            </div>
          </main>
        </div>
        <Footer />
      </div>
    </>
  );
}
