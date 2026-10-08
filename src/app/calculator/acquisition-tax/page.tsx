import { CalculatorPageContent } from '@/components/calculator/CalculatorPageContent';
import type { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { StructuredSummary } from '@/components/calculator/StructuredSummary';
import { FaqSection } from '@/components/calculator/FaqSection';
import { RateBarChart } from '@/components/charts/RateBarChart';
import { RelatedCalculators } from '@/components/calculator/RelatedCalculators';
import { EmbedCodeBox } from '@/components/calculator/EmbedCodeBox';
import Icon from '@/components/ui/Icon';
import {
  buildSoftwareApplicationJsonLd,
  buildFaqPageJsonLd,
  buildBreadcrumbJsonLd,
  buildSpeakableJsonLd,
  buildWebPageJsonLd,
  getCategoryUrlForCalculator,
  buildHowToJsonLd,
  buildDefinedTermSetJsonLd,
} from '@/lib/seo/jsonld';
import { AcquisitionCalculator } from './AcquisitionCalculator';
import { AuthorByline } from '@/components/calculator/AuthorByline';

const URL = 'https://calculatorhost.com/calculator/acquisition-tax/';

export const metadata: Metadata = {
  title: '취득세 계산기 2026 | 주택 매매 예상세액·조건 확인',
  description:
    '주택 매매가와 주택 수로 취득세·지방교육세·농어촌특별세 예상액을 계산합니다. 증여·상속·감면은 따로 확인하세요.',
  keywords: [
    '취득세 계산기',
    '아파트 취득세',
    '주택 취득세 세율',
    '1주택 10억 취득세',
    '생애최초 감면',
    '조정지역 취득세',
    '2026 취득세',
  ],
  alternates: { canonical: URL },
  twitter: {
    card: 'summary_large_image',
  },
  openGraph: {
    title: '취득세 계산기 2026 | 주택 매매 예상세액',
    description: '주택 수·면적·조정지역과 확인된 취득 조건에 따른 예상액. 특례·감면 등 미지원 조건은 확인 안내를 표시합니다.',
    url: URL,
    type: 'website',
  },
};

const FAQ_ITEMS = [
  {
    question: '1주택 85㎡ 이하 취득세는 얼마인가요?',
    answer:
      '중과·감면이 없는 일반 주택 매매는 6억 원 이하 1%, 9억 원 이상 3%입니다. 6억 원 초과 9억 원 이하에서는 (취득가액 × 2 ÷ 3억원 − 3) ÷ 100으로 구한 세율 소수를 소수점 다섯째 자리에서 반올림해 넷째 자리까지 적용합니다. 7억 원은 0.0167(1.67%), 8억 원은 0.0233(2.33%)입니다. 법정 국민주택규모 이하인 일반 매매는 농어촌특별세가 제외되고 지방교육세가 추가됩니다.',
  },
  {
    question: '조정대상지역 3주택자의 취득세율은?',
    answer:
      '취득 후 세대 기준 조정대상지역 3주택 이상이며 중과 제외 요건에 해당하지 않으면 12% 중과세율이 적용됩니다. 지방교육세는 과세표준의 0.4%, 국민주택규모 초과 시 농어촌특별세는 1%입니다. 주택 수 산정과 중과 제외 요건은 별도 확인하세요.',
  },
  {
    question: '생애최초 주택 취득세 감면 조건은?',
    answer:
      '생애최초 주택 취득세 감면은 취득 시점의 주택 요건과 사후관리 등 세부 조건을 확인해야 합니다(지특법 §36의3). 현재 계산기는 이 감면을 자동 적용하지 않으며 선택 시 조건 확인 안내를 표시합니다. 적용 여부·한도·신청 절차는 관할 지방자치단체와 위택스에서 확인하세요.',
  },
  {
    question: '증여 취득세는 매매와 어떻게 다른가요?',
    answer:
      '일반적인 증여 취득세 기본 세율은 3.5%입니다. 증여 중과는 매매의 3주택 기준과 다르며, 조정대상지역 소재 여부·주택의 시가표준액·증여자와의 관계 및 예외를 별도로 확인해야 합니다(지방세법 제13조의2). 증여 과세표준은 시가인정액이 원칙이며 소액 부동산·시가인정액 산정 곤란 등의 예외가 있습니다(제10조의2). 현재 계산기는 실제 과세표준·특례·부담부증여 여부를 자동 판정하지 않습니다. 확인한 과세표준과 일반 취득 요건을 입력한 경우에만 예상액을 제공하고, 미확인 조건 또는 특례 거래는 결과를 보류합니다.',
  },
  {
    question: '주택 매매 취득세 납부 기한은?',
    answer:
      '일반적인 주택 매매는 취득일부터 60일 이내에 취득세를 신고·납부합니다. 다만 그 전에 등기를 신청하면 신청서를 접수하는 날까지 신고·납부해야 합니다. 증여·상속은 기한의 기준일과 기간이 다르므로 아래 취득 원인별 안내를 확인하세요.',
  },
  {
    question: '85㎡ 이하와 85㎡ 초과 취득세 차이는?',
    answer:
      '감면이 없는 일반 주택 매매에서 법정 국민주택규모 이하이면 농어촌특별세가 제외됩니다. 통상 전용면적 85㎡ 기준이며 수도권을 제외한 도시지역이 아닌 읍·면은 100㎡ 기준이 적용됩니다. 국민주택규모 초과 시 과세표준에 일반세율은 0.2%, 취득세 8% 중과는 0.6%, 취득세 12% 중과는 1%의 농어촌특별세가 추가됩니다(농특세법 §5). 감면 관련 농어촌특별세는 별도 조건 확인이 필요합니다.',
  },
  {
    question: '9억 원 vs 10억 원 경계에서 취득세 차이는?',
    answer:
      '중과·감면이 없는 일반 주택 매매는 9억 원과 10억 원 모두 본세율이 3%입니다. 본세는 각각 2,700만 원과 3,000만 원으로 300만 원 차이가 나며 지방교육세와 해당 농어촌특별세가 별도로 추가됩니다. 재산세는 취득가액이 아닌 별도 과세표준·공시가격 기준으로 확인해야 합니다.',
  },
  {
    question: '전용면적 85㎡를 초과하면 취득세가 얼마나 늘어나나요?',
    answer:
      '감면이 없는 일반 주택 매매에서 법정 국민주택규모를 초과한 주택의 농어촌특별세는 과세표준의 0.2%, 취득세 8% 중과 시 0.6%, 12% 중과 시 1%입니다(농특세법 §5). 본세는 가격과 취득 후 주택 수·조정지역 여부 등으로 결정되며 감면·특례가 있으면 면적별 적용도 따로 확인해야 합니다.',
  },
  {
    question: '취득세는 언제까지 신고·납부해야 하나요?',
    answer:
      '일반적인 주택 매매는 취득일부터 60일 이내에 신고·납부합니다(지방세법 §20, 2026년 1월 1일 시행 기준). 무상취득(상속 제외)과 부담부 증여는 취득일이 속한 달의 말일부터 3개월, 상속은 상속개시일이 속한 달의 말일부터 6개월이며 외국에 주소를 둔 상속인이 있으면 9개월입니다. 이 기한 전에 등기를 신청하면 등기 신청서를 접수하는 날까지 신고·납부해야 합니다. 기한을 넘기면 가산세가 발생할 수 있으므로 취득 원인별로 확인하세요. 거래 직전이라면 재산세 과세기준일(6월 1일)도 함께 점검하세요. 관련 가이드는 아래 "관련 계산기·가이드"에서 확인할 수 있습니다.',
  },
  {
    question: '취득세 외에 추가로 내는 세금은 무엇인가요?',
    answer:
      '지방교육세와 해당 농어촌특별세가 추가됩니다. 지방교육세는 일반 주택 매매에서 본세의 10%에 해당하지만 8%·12% 중과는 과세표준의 0.4%, 일반 증여는 0.3%, 일반 상속은 0.16%로 취득 원인에 따라 다릅니다(지방세법 제151조). 감면·특례 없는 일반 매매의 농어촌특별세는 국민주택규모 초과 시 일반 0.2%·8% 중과 0.6%·12% 중과 1%입니다. 이 도구의 지원 범위 내 예상액과 실제 신고액은 다를 수 있습니다.',
  },
] as const;

const RELATED = [
  { href: '/calculator/capital-gains-tax', title: '양도소득세', description: '주택 판매 시' },
  { href: '/calculator/property-tax', title: '재산세', description: '연간 부과' },
  { href: '/calculator/broker-fee', title: '중개수수료', description: '거래수수료' },
];

export default function AcquisitionTaxPage() {
  const softwareLd = buildSoftwareApplicationJsonLd({
    name: '취득세 계산기',
    description: '조건이 확인된 일반 주택 취득 예상세액과 특례·감면 확인 안내',
    url: URL,
  });
  const webPageLd = buildWebPageJsonLd({
    name: '취득세 계산기 2026',
    description: '조건이 확인된 일반 주택 취득의 예상세액과 미지원 조건의 확인사항을 안내합니다.',
    url: URL,
    datePublished: '2026-04-24',
    dateModified: '2026-09-30',
    isPartOf: getCategoryUrlForCalculator('acquisition-tax'),
  });
  const howToLd = buildHowToJsonLd({
    name: '취득세 계산기 사용 방법',
    description: '부동산 구매금액, 거래유형, 주택수를 입력하여 취득세를 계산하는 단계별 가이드',
    steps: [
      { name: '거래금액 입력', text: '부동산 구매 금액(과세표준)을 입력합니다.' },
      { name: '거래유형 선택', text: '매매·증여·상속 중 거래 유형을 선택합니다.' },
      { name: '주택 정보 입력', text: '취득 후 주택 수, 면적(㎡), 조정지역 여부를 입력합니다.' },
      { name: '지원 조건 확인', text: '증여·상속·감면·가격 경계 등 조건 확인 안내가 있는지 확인합니다.' },
      { name: '취득세 결과 확인', text: '지원 범위의 본세와 부가세 예상액을 확인합니다.' },
    ],
  });
  const faqLd = buildFaqPageJsonLd(
    FAQ_ITEMS.map((f) => ({ question: f.question, answer: f.answer })),
  );
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '세금', url: 'https://calculatorhost.com/category/tax/' },
    { name: '취득세' },
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            buildDefinedTermSetJsonLd({
              name: '취득세 핵심 용어',
              description: '주택·부동산 취득 시 적용되는 취득세 산정 용어집',
              url: `${URL}#glossary`,
              terms: [
                {
                  name: '취득세',
                  description:
                    '부동산·자동차·선박·항공기 등 자산 취득 시 부과되는 지방세. 주택은 취득 원인·과세표준·세대 주택 수와 특례에 따라 달라짐. 근거: 지방세법 §10 이하.',
                  url: 'https://www.wetax.go.kr',
                },
                {
                  name: '농어촌특별세',
                  alternateName: '농특세',
                  description:
                    '일반 주택 매매의 국민주택규모 초과 시 과세표준에 일반 0.2%, 8% 중과 0.6%, 12% 중과 1% 적용. 감면 관련 과세는 별도 확인. 근거: 농어촌특별세법.',
                },
                {
                  name: '지방교육세',
                  description:
                    '취득 원인별로 다른 지방세. 일반 매매는 본세의 10%, 중과는 과세표준의 0.4%, 일반 증여 0.3%, 일반 상속 0.16%. 근거: 지방세법 제151조.',
                },
                {
                  name: '생애최초 주택구입 감면',
                  description:
                    '취득 시점의 요건과 사후관리를 확인해야 하는 감면. 이 계산기에서는 자동 적용하지 않고 조건 확인을 안내. 근거: 지방세특례제한법 §36의3.',
                },
                {
                  name: '조정대상지역 다주택 중과',
                  description:
                    '일반 주택 매매에서 취득 후 조정지역 2주택·비조정지역 3주택은 8%, 조정지역 3주택 이상·비조정지역 4주택 이상은 12%. 예외는 별도 확인. 근거: 지방세법 §13의2.',
                },
              ],
            }),
          ),
        }}
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
                      { name: '세금', href: '/category/tax/' },
                      { name: '취득세' },
                    ]}
                  />
                  <h1 className="mb-3 text-4xl font-bold tracking-tight">취득세 계산기 2026</h1>
                  <p className="text-lg text-text-secondary" data-speakable>
                    조건이 확인된 일반 주택 취득의 예상세액과 확인사항을 살펴보세요.
                  </p>
                  <AuthorByline dateModified="2026-09-30" />
                </header>
              }
              calculator={<AcquisitionCalculator />}
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
              tools={
                <>
                  <EmbedCodeBox
                    embedPath="/embed/acquisition-tax/"
                    canonicalPath="/calculator/acquisition-tax/"
                    title="취득세 계산기"
                  />
                </>
              }
            >
              <StructuredSummary
                definition="취득세는 부동산을 취득할 때 부과되는 지방세입니다. 매매·증여·상속 등 취득 방법과 취득 시점의 주택 수, 조정대상지역 여부, 주택 면적에 따라 세율이 달라집니다(지방세법 §10-§17)."
                table={{
                  caption: '주택 매매 취득세율과 현재 계산 범위 (특례·감면 제외)',
                  headers: ['취득가액·조건', '취득세율·지원 범위'],
                  rows: [
                    ['일반 매매 6억 원 이하', '1.0%'],
                    ['일반 매매 6억 원 초과~9억 원 이하', '법정 산식·세율 소수 넷째 자리 반올림 적용'],
                    ['일반 매매 9억 원 이상', '3.0%'],
                    ['조정지역 2주택·비조정지역 3주택', '8% (중과 제외 요건 별도 확인)'],
                    ['조정지역 3주택 이상·비조정지역 4주택 이상', '12% (중과 제외 요건 별도 확인)'],
                  ],
                }}
                tldr={[
                  '조건이 확인된 일반 주택 취득의 예상세액을 계산하며, 특례·감면은 별도 확인 필요',
                  '일반 매매 6억 원 이하 1%, 6억 초과~9억 이하 법정 산식·반올림, 9억 초과 3%',
                  '중과 대상이면 조정지역 2주택·비조정지역 3주택 8%, 그 이상은 12%',
                  '국민주택규모 초과 농어촌특별세는 일반 0.2%, 8% 중과 0.6%, 12% 중과 1%',
                  '증여·상속은 과세표준·일반 취득 요건 확인 필요; 감면·지분 특례는 별도 판단',
                ]}
              />
              <section aria-label="취득 원인별 취득세 비교" className="card">
                <h2 className="mb-4 text-2xl font-semibold">
                  같은 집이라도 매매·증여·상속에 따라 취득세가 다른가요?
                </h2>
                <p className="mb-4 text-text-secondary" data-speakable>
                  네, 과세표준 산정과 적용 세율이 다릅니다. 각 유형의 과세표준을 동일하게 5억 원으로
                  가정하고, 85㎡ 이하·중과·감면·특례가 없는 기본 세율만 비교하면 취득세와 지방교육세의
                  합계는 매매 550만 원, 상속 1,480만 원, 증여 1,900만 원입니다. 아래는 참고 예시이며,
                  증여·상속은 현재 계산기에서 조건 확인이 필요합니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse text-sm">
                    <caption className="mb-2 text-left text-xs text-text-tertiary">
                      표. 유형별 과세표준을 각각 5억 원으로 가정한 기본세액 (85㎡ 이하·중과·감면·특례 제외)
                    </caption>
                    <thead>
                      <tr className="border border-border-base bg-primary-500/10">
                        <th scope="col" className="px-4 py-3 text-left font-bold text-text-primary">
                          취득 원인
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-3 text-right font-bold text-text-primary"
                        >
                          세율
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-3 text-right font-bold text-text-primary"
                        >
                          취득세+지방교육세
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-3 text-right font-bold text-text-primary"
                        >
                          신고·납부 기한
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="hover:bg-bg-card/50 border border-border-base">
                        <td className="px-4 py-2">매매</td>
                        <td className="px-4 py-2 text-right tabular-nums">1.0%</td>
                        <td className="px-4 py-2 text-right font-bold tabular-nums text-primary-700 dark:text-primary-300">
                          550만 원 (본세 500 + 지방교육세 50)
                        </td>
                        <td className="px-4 py-2 text-right">취득일부터 60일</td>
                      </tr>
                      <tr className="hover:bg-bg-card/50 border border-border-base">
                        <td className="px-4 py-2">상속</td>
                        <td className="px-4 py-2 text-right tabular-nums">2.8%</td>
                        <td className="px-4 py-2 text-right font-bold tabular-nums text-primary-700 dark:text-primary-300">
                          1,480만 원 (본세 1,400 + 지방교육세 80)
                        </td>
                        <td className="px-4 py-2 text-right">상속개시월 말일부터 6개월 (해외 주소 상속인 9개월)</td>
                      </tr>
                      <tr className="hover:bg-bg-card/50 border border-border-base">
                        <td className="px-4 py-2">증여</td>
                        <td className="px-4 py-2 text-right tabular-nums">3.5%</td>
                        <td className="px-4 py-2 text-right font-bold tabular-nums text-primary-700 dark:text-primary-300">
                          1,900만 원 (본세 1,750 + 지방교육세 150)
                        </td>
                        <td className="px-4 py-2 text-right">취득일이 속한 달 말일부터 3개월</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-3 text-xs text-text-tertiary">
                  * 같은 시가라도 취득 유형에 따라 과세표준이 달라질 수 있습니다. 국민주택규모 초과 시
                  농어촌특별세는 일반 0.2%, 8% 중과 0.6%, 12% 중과 1%이며 감면 관련 세액은 별도입니다.
                  신고기한 전에 등기를 접수하면 접수일까지 납부해야 합니다. 실제 적용 요건은 관할 지자체에 확인하세요.
                </p>
              </section>
              <RateBarChart
                title="취득세율, 주택 수·가격별 (지방세법 §11)"
                caption="특례·감면이 없는 일반 매매는 6억 원 이하 1%, 9억 원 이상 3%입니다. 6억 원 초과~9억 원 이하는 법정 산식으로 구한 세율 소수를 넷째 자리까지 반올림해 계산합니다. 중과 대상인 조정지역 2주택·비조정지역 3주택은 8%, 조정지역 3주택 이상·비조정지역 4주택 이상은 12%입니다. 지방교육세와 농어촌특별세는 별도입니다."
                unit="%"
                max={13}
                bars={[
                  { label: '1주택 6억↓', value: 1, display: '1.0%' },
                  { label: '1주택 7.5억', value: 2, display: '2.0%' },
                  { label: '1주택 9억↑', value: 3, display: '3.0%' },
                  { label: '조정 2주택', value: 8, display: '8%' },
                  { label: '조정 3주택↑', value: 12, display: '12%', highlight: true },
                  { label: '비조정 3주택', value: 8, display: '8%' },
                  { label: '비조정 4주택↑', value: 12, display: '12%' },
                ]}
              />
              <section
                aria-label="취득세 구간별 해설"
                className="card border-l-4 border-l-primary-500"
              >
                <h2 className="mb-3 text-xl font-semibold">왜 1.0~3.0%를 오가는가?</h2>
                <p className="mb-3 text-text-secondary" data-speakable>
                  지방세법 제11조는 일반 주택 매매의 취득가액 구간에 따라 기본 세율을 정합니다.
                  6억 원 이하는 1%, 9억 원 초과는 3%이며 6억 원 초과~9억 원 이하에는
                  (취득가액 × 2 ÷ 3억원 − 3) ÷ 100의 산식을 적용합니다. 산출한 세율 소수는
                  소수점 다섯째 자리에서 반올림하여 넷째 자리까지 사용합니다. 퍼센트 표시값을
                  소수점 넷째 자리로 반올림하는 방식과는 다릅니다. 예를 들어 7억 원의 0.016666…은
                  0.0167(1.67%), 8억 원의 0.023333…은 0.0233(2.33%)가 됩니다.
                </p>
                <p className="text-text-secondary" data-speakable>
                  지방세법 제13조의2에 따른 중과 대상은 조정지역 2주택·비조정지역 3주택 8%,
                  조정지역 3주택 이상·비조정지역 4주택 이상 12%입니다. 국민주택규모 초과 농어촌특별세는
                  일반 0.2%, 8% 중과 0.6%, 12% 중과 1%입니다. 지방교육세는 일반 매매에서
                  취득세의 10%이지만, 중과에서는 과세표준의 0.4%를 적용합니다(지방세법 제151조).
                  중과 제외·감면 등은 별도 조건 확인이 필요합니다.
                </p>
              </section>
              <section aria-label="일반 매매 세액 예시" className="card">
                <h2 className="mb-3 text-xl font-semibold">7억·8억 원 일반 매매 세액 예시</h2>
                <p className="text-sm text-text-secondary">
                  중과·감면·특례가 없고 법정 국민주택규모 이하인 주택의 경우, 7억 원은 본세
                  11,690,000원에 지방교육세 1,169,000원을 더해 12,859,000원입니다. 8억 원은 본세
                  18,640,000원에 지방교육세 1,864,000원을 더해 20,504,000원입니다.
                  국민주택규모를 초과하면 일반 농어촌특별세 0.2%가 추가되어 각각 14,259,000원과
                  22,104,000원이 됩니다.
                </p>
              </section>
              <section aria-label="취득세 개념" className="card">
                <h2 className="mb-4 text-2xl font-semibold">취득세란 무엇인가요?</h2>
                <p className="mb-4 text-text-secondary">
                  취득세는 토지·건물·주택 등 부동산을 취득할 때 부과되는 지방세입니다(지방세법 §10).
                  매매·증여·상속·교환 등 유상·무상 취득에 적용됩니다. 일반 매매의 신고·납부 기한은
                  취득일부터 60일이며, 증여와 상속은 취득 월 말일부터 각각 3개월과 6개월입니다.
                  해외 주소 상속인은 9개월이며, 기한 전에 등기를 접수하면 접수일까지 납부해야 합니다.
                </p>
                <p className="text-text-secondary">
                  취득세는 과세표준과 적용 세율을 기준으로 산정합니다. 일반 매매는 취득가액,
                  무상취득은 시가인정액을 원칙으로 하되 상속·소액 취득 등에는 시가표준액 등의 예외가
                  있습니다(지방세법 제10조의2). 부담부증여는 유상·무상 부분을 나누는 등 별도 판단이
                  필요합니다. 농어촌특별세와 지방교육세도 취득 유형·면적·중과·감면에 따라 달라집니다.
                </p>
              </section>
              <section aria-label="계산 공식" className="card">
                <h2 className="mb-4 text-2xl font-semibold">2026년 취득세는 어떻게 계산하나요?</h2>
                <ol className="space-y-3 text-sm leading-relaxed">
                  <li>
                    <strong>1. 과세표준 확인</strong>: 일반 매매는 취득가액을 입력합니다. 증여·상속은
                    시가인정액 원칙과 예외를 별도로 확인해 입력해야 하며 미확인 조건은 결과를 보류합니다.
                  </li>
                  <li>
                    <strong>2. 세율 결정</strong>: 일반 매매 6억 원 이하 1%, 9억 원 이상 3%.
                    중과 대상은 조정지역 2주택·비조정지역 3주택 8%, 그 이상 12%입니다.
                    일반 매매의 6억 원 초과~9억 원 이하는 법정 산식으로 구한 세율 소수를
                    소수점 다섯째 자리에서 반올림해 넷째 자리까지 적용합니다.
                  </li>
                  <li>
                    <strong>3. 취득세 계산</strong>: 지원 조건에 해당하면 과세표준에 적용 세율을 곱합니다.
                  </li>
                  <li>
                    <strong>4. 농어촌특별세</strong>: 국민주택규모 초과 시 과세표준 × 0.2%(일반),
                    0.6%(8% 중과), 1%(12% 중과). 감면 관련 농어촌특별세는 별도 확인합니다.
                  </li>
                  <li>
                    <strong>5. 지방교육세</strong>: 일반 매매는 취득세의 10%, 중과는 과세표준의 0.4%.
                    증여 기본 0.3%, 상속 기본 0.16%는 참고 기준이며 특례는 별도 확인합니다.
                  </li>
                  <li>
                    <strong>6. 감면·특례 확인</strong>: 생애최초·지분 취득 등은 적용 조건 확인이 필요하여
                    현재 자동 감면 또는 특례 계산을 제공하지 않습니다.
                  </li>
                  <li>
                    <strong>7. 예상 합계</strong>: 지원 범위에서는 취득세 + 농어촌특별세 + 지방교육세를
                    표시합니다. 실제 신고·납부액은 관할 지자체에 확인하세요.
                  </li>
                </ol>
              </section>
              <section aria-label="주의사항" className="card">
                <h2 className="mb-3 text-2xl font-semibold">주의사항</h2>
                <ul className="list-disc space-y-2 pl-5 text-sm text-text-secondary">
                  <li>
                    이 계산기는 지원 조건에 해당하는 일반 주택 취득의 예상세액을 제공합니다.
                    일시적 2주택 등 중과 제외 여부와 특례·감면은 관할 지자체에 확인하세요.
                  </li>
                  <li>
                    생애최초 감면은 취득 시점의 자격·기한·사후 관리 요건을 별도로 확인해야 합니다.
                    계산기에서 해당 조건을 선택하면 조건 확인 안내를 제공하며 감면액을 자동 차감하지 않습니다.
                  </li>
                  <li>
                    증여의 과세표준은 시가인정액 원칙과 예외가 있고, 상속은 시가표준액이 적용됩니다.
                    부담부증여와 상속 특례는 별도 판단해야 합니다. 현재 계산기는 확인된 일반 증여·상속만
                    지원하며, 과세표준·예외 요건이 미확인되거나 특례가 적용되면 결과를 보류합니다.
                  </li>
                  <li>
                    취득 원인에 따라 신고·납부 기한이 다릅니다. 위 FAQ의 매매·증여·상속 기한과
                    등기 접수 전 납부 요건을 확인하세요. 지연 신고·납부에는 가산세가 발생할 수 있습니다.
                  </li>
                  <li>
                    2026년 세율을 기준으로 합니다. 세법 개정 시 변경될 수 있으므로 거래 전 최신
                    정보를 확인하세요.
                  </li>
                </ul>
              </section>
              <section aria-label="절세 팁" className="card">
                <h2 className="mb-3 text-2xl font-semibold">절세·활용 팁</h2>
                <ul className="space-y-3 text-sm text-text-secondary">
                  <li>
                    <strong>생애최초 감면 확인</strong>: 대상 여부와 신청·사후 관리 요건을 관할 지자체에
                    확인하세요. 이 계산기는 감면액을 자동 적용하지 않습니다.
                  </li>
                  <li>
                    <strong>면적 확인</strong>: 주택의 전용면적과 농어촌특별세 제외 요건을 확인하세요.
                    통상 기준은 전용면적 85㎡이며 수도권을 제외한 도시지역이 아닌 읍·면은 100㎡입니다.
                    법정 국민주택규모 초과 여부를 확인해 선택하세요.
                  </li>
                  <li>
                    <strong>거래가 협상</strong>: 취득세는 거래가에 직결되므로 계약 전 정확한 계산이
                    중요합니다.
                  </li>
                  <li>
                    <strong>중과 조건 확인</strong>: 조정지역 여부뿐 아니라 취득 후 주택 수와 중과 제외
                    요건을 함께 확인하세요. 비조정지역도 3주택 이상 취득 시 중과 대상이 될 수 있습니다.
                  </li>
                </ul>
              </section>
              <section
                aria-label="관련 가이드"
                className="card border-l-4 border-l-primary-500 bg-primary-500/5"
              >
                <h2 className="mb-2 text-xl font-semibold">함께 보면 좋은 가이드</h2>
                <ul className="space-y-2 text-sm">
                  <li>
                    <a
                      href="/guide/property-tax-base-date-june-1-2026/"
                      className="inline-flex items-center gap-1 font-medium text-primary-700 underline dark:text-primary-300"
                    >
                      <Icon name="chevron-right" size={14} />
                      <span>재산세 과세기준일 6월 1일, 매매 잔금 타이밍과 부담자 판정</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="/guide/june-property-tax/"
                      className="inline-flex items-center gap-1 font-medium text-primary-700 underline dark:text-primary-300"
                    >
                      <Icon name="chevron-right" size={14} />
                      <span>재산세 완벽 가이드 (6월 부과·7월 납부)</span>
                    </a>
                  </li>
                </ul>
              </section>
              <section aria-label="업데이트" className="card">
                <h2 className="mb-2 text-lg font-semibold">업데이트</h2>
                <ul className="text-sm text-text-secondary">
                  <li>2026-09-30: 6~9억원 법정 세율 반올림 반영, 지원 범위·국민주택규모·부가세 설명 정비</li>
                  <li>2026-06-01: FAQ 3개 추가 (85㎡ 초과 구간·생애최초 감면·추가 세금 구조)</li>
                  <li>2026-04-24: 2026년 지방세율 반영 초판 공개</li>
                </ul>
              </section>
              <section aria-label="참고 자료" className="card">
                <h2 className="mb-3 text-lg font-semibold">법적 근거 및 공식 출처</h2>
                <ul className="space-y-2 text-sm text-text-secondary">
                  <li>
                    <a
                      href="https://rt.molit.go.kr"
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="text-primary-500 hover:underline"
                    >
                      국토교통부 실거래가, 거래가액 확인
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.law.go.kr/LSW/lsSideInfoP.do?docCls=jo&joBrNo=00&joNo=0011&lsiSeq=282559&urlMode=lsScJoRltInfoR"
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="text-primary-600 underline dark:text-primary-500"
                    >
                      국가법령정보센터, 지방세법 제11조 (취득세 세율·반올림, 2026년 1월 1일 시행)
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.daedeok.go.kr/ebook/site/src/viewer/download.php?host=main&no=2&site=20200103_154912"
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="text-primary-600 underline dark:text-primary-500"
                    >
                      대덕구 2020년 안내자료, 주택 유상거래 세율·7억 및 8억원 예시 (인쇄 11쪽)
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.law.go.kr/LSW/lsSideInfoP.do?docCls=jo&joBrNo=00&joNo=0151&lsiSeq=282559&urlMode=lsScJoRltInfoR"
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="text-primary-600 underline dark:text-primary-500"
                    >
                      국가법령정보센터, 지방세법 제151조 (지방교육세, 2026년 1월 1일 시행)
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.law.go.kr/법령/지방세법"
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="text-primary-600 underline dark:text-primary-500"
                    >
                      국가법령정보센터, 지방세법 (전체)
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.wetax.go.kr"
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="text-primary-600 underline dark:text-primary-500"
                    >
                      위택스, 지방세 신고
                    </a>
                  </li>
                </ul>
              </section>
              <section
                aria-label="출처 및 면책"
                className="rounded-lg border border-border-base p-4 text-caption text-text-tertiary"
              >
                <p className="mb-2">
                  <strong>계산 기준</strong>: 2026-09-30 확인. 지방세법 제10조의2·제11조·제13조의2·제20조·제151조,
                  농어촌특별세법. 일반 매매의 6~9억원 구간은 법정 세율 반올림을 적용하며, 감면·특례는 별도 확인이 필요합니다.
                </p>
                <p>
                  이 계산기는 참고용이며 법적 효력이 없습니다. 공식 요건 전체를 자동 판정하지 않으며,
                  실제 취득세 신고·납부는 관할 지자체 세무부서 또는 세무사의 안내를 따르시기 바랍니다.
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
