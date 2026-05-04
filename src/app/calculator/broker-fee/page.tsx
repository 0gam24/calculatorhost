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
  getCategoryUrlForCalculator,
  buildHowToJsonLd,
  buildDefinedTermSetJsonLd,
} from '@/lib/seo/jsonld';
import { CommissionCalculator } from './CommissionCalculator';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { AuthorByline } from '@/components/calculator/AuthorByline';

const URL = 'https://calculatorhost.com/calculator/broker-fee/';

export const metadata: Metadata = {
  title: '중개수수료 계산기 2026 | 법정 상한요율·한도액 | calculatorhost',
  description:
    '2026년 공인중개사법 시행규칙 기준 중개수수료 무료 계산기. 매매·전세·월세·오피스텔 법정 상한요율·한도액·부가세를 즉시 계산. 회원가입 불필요, 모바일 최적화.',
  alternates: { canonical: URL },
  openGraph: {
    title: '중개수수료 계산기 2026 | 법정 상한요율 및 한도액',
    description:
      '2026년 공인중개사법 기준. 매매·전세·월세·오피스텔 중개수수료를 거래 직전 정확히 계산.',
    url: URL,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '중개수수료 계산기 2026',
    description: '2026년 법정 상한요율·한도액 기준 중개수수료 계산.',
  },
};

const FAQ_ITEMS = [
  {
    question: '9억 주택 매매 중개수수료 상한은 얼마인가요?',
    answer:
      '9억 원의 주택 매매는 상한요율 0.5% 구간에 해당합니다(공인중개사법 시행규칙 §20). 따라서 중개수수료는 9억 × 0.5% = 450만 원입니다. 부가세(10%)를 포함하면 495만 원입니다.',
  },
  {
    question: '전세 중개수수료는 협의 가능한가요?',
    answer:
      '네, 가능합니다. 중개수수료는 법정 상한요율 이내에서 중개인과 의뢰인이 자유롭게 협의할 수 있습니다. 단, 상한요율을 초과할 수는 없으므로 협상 범위는 제한됩니다. 계산기에 협의 요율을 입력하면 실제 지급액을 확인할 수 있습니다.',
  },
  {
    question: '부가세 10%는 중개수수료에 별도로 붙나요?',
    answer:
      '네, 부가세는 별도입니다(부가가치세법). 예를 들어 상한 중개수수료가 450만 원이면 부가세는 45만 원으로 총 495만 원을 지급합니다. 중개인이 세금계산서를 발급하면 부가세가 부과됩니다.',
  },
  {
    question: '월세 중개수수료 계산 시 거래금액은 어떻게 되나요?',
    answer:
      '월세 거래금액 = 보증금 + (월세 × 100)을 기본으로 합니다(공인중개사법 시행규칙 §20 ③). 단, 이 결과가 5,000만 원 미만이면 월세 × 70으로 다시 계산합니다. 예: 보증금 1,000만 + 월세 50만이면 (1,000 + 50×100 = 6,000)만 원 ≥ 5,000만 이므로 6,000만 원을 거래금액으로 합니다.',
  },
  {
    question: '오피스텔 중개보수는 주택과 다른가요?',
    answer:
      '네, 다릅니다(공인중개사법 시행규칙 §20 ④). 오피스텔(주거용, 전용 85㎡ 이하)은 매매·교환 시 0.5%, 임대차 시 0.4%의 고정 요율이 적용됩니다. 구간별 차등 요율 없이 고정이고, 한도액도 없습니다.',
  },
  {
    question: '중개수수료 한도액이 언제 적용되나요?',
    answer:
      '소액 거래 시에만 한도액이 적용됩니다(공인중개사법 시행규칙 §20). 예: 주택 매매 5,000만 원 이하는 0.6% 요율이지만 한도 25만 원이므로, 실제 중개수수료는 25만 원입니다. 고액 거래(2억 원 초과)는 한도액이 없습니다.',
  },
] as const;

const RELATED = [
  { href: '/calculator/acquisition-tax', title: '취득세', description: '주택 매매·증여' },
  { href: '/calculator/capital-gains-tax', title: '양도소득세', description: '주택 판매' },
  { href: '/calculator/property-tax', title: '재산세', description: '연간 부과' },
  { href: '/calculator/rent-conversion', title: '전월세전환율', description: '보증금 환산' },
];

export default function CommissionPage() {
  const softwareLd = buildSoftwareApplicationJsonLd({
    name: '중개수수료 계산기',
    description: '2026년 법정 상한요율 반영, 매매·전세·월세·오피스텔 중개수수료',
    url: URL,
  });
  const webPageLd = buildWebPageJsonLd({
    name: '중개수수료 계산기 2026',
    description: '2026년 법정 상한요율·한도액 기준 중개수수료 계산',
    url: URL,
    datePublished: '2026-04-24',
    dateModified: '2026-04-27',
    isPartOf: getCategoryUrlForCalculator('broker-fee'),
  });
  const howToLd = buildHowToJsonLd({
    name: '중개수수료 계산기 사용 방법',
    description: '거래금액과 거래유형을 입력하여 법정 상한 중개수수료를 계산하는 단계별 가이드',
    steps: [
      { name: '거래유형 선택', text: '매매·전세·월세·오피스텔 중 거래 유형을 선택합니다.' },
      { name: '거래금액 입력', text: '부동산 거래 금액을 입력합니다(월세는 보증금+월세×100).' },
      { name: '협의요율 설정', text: '법정 상한요율 이내에서 협의 요율을 입력합니다(선택).' },
      { name: '상한수수료 계산', text: '입력된 금액과 요율에 따라 상한 중개수수료가 자동 계산됩니다.' },
      { name: '부가세 포함 최종액 확인', text: '부가세 10%를 포함한 최종 지급액을 확인합니다.' },
    ],
  });
  const faqLd = buildFaqPageJsonLd(FAQ_ITEMS.map((f) => ({ question: f.question, answer: f.answer })));
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '부동산', url: 'https://calculatorhost.com/category/real-estate/' },
    { name: '중개수수료' },
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
              name: '중개수수료 핵심 용어',
              description: '부동산 거래 시 적용되는 중개수수료 산정 용어집',
              url: `${URL}#glossary`,
              terms: [
                {
                  name: '중개수수료',
                  alternateName: '중개보수·복비',
                  description: '부동산 거래 시 공인중개사에게 지급하는 수수료. 거래 금액과 물건 종류에 따라 법정 상한요율이 정해짐 (공인중개사법 §32).',
                },
                {
                  name: '상한요율',
                  description: '공인중개사법에서 정한 중개수수료의 최대 비율. 거래금액별 구간에 따라 0.3%~0.9%로 다름 (시행규칙 §20).',
                },
                {
                  name: '한도액',
                  description: '소액 거래 시 적용되는 중개수수료의 최대 금액. 상한요율로 계산한 금액이 한도액을 초과할 때 한도액이 상한으로 작용 (예: 소액 주택매매 25만원).',
                },
                {
                  name: '월세 거래금액',
                  description: '월세 임대차에서 중개수수료 산정 기준이 되는 금액. 보증금 + (월세×100) 또는 (월세×70) 중 더 큰 값 (공인중개사법 시행규칙 §20 ③).',
                },
              ],
            })
          ),
        }}
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
                    { name: '중개수수료' },
                  ]}
                />
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  중개수수료 계산기 2026
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  2026년 공인중개사법 시행규칙을 반영한 무료 중개수수료(복비) 계산기입니다.
                  매매·교환·전세·월세 거래 시 법정 상한요율과 한도액을 즉시 확인하고, 협의
                  요율과 부가세를 포함한 총 지급액을 거래 직전 정확하게 계산할 수 있습니다.
                </p>
                <AuthorByline datePublished="2026-04-24" dateModified="2026-04-27" />
              </header>

              {/* GEO/AEO Structured Summary */}
              <StructuredSummary
                definition="중개수수료(복비)는 부동산 매매·전세·월세 거래 시 공인중개사에게 지급하는 수수료입니다. 거래 금액과 물건 종류(주택·오피스텔·기타)에 따라 법정 상한요율이 정해져 있으며, 중개인과 의뢰인이 그 범위 내에서 자유롭게 협의할 수 있습니다(공인중개사법 §32, 시행규칙 §20)."
                table={{
                  caption: '물건별 중개수수료 상한요율 (2026)',
                  headers: ['물건·거래 유형', '상한 요율'],
                  rows: [
                    ['주택 매매 (2억~9억원)', '0.4%'],
                    ['주택 매매 (9억 이상)', '0.5% 이상'],
                    ['주택 전세 (1억~6억)', '0.3%'],
                    ['오피스텔 주거용', '0.5% (고정)'],
                    ['기타 (상가·토지)', '0.9% 협의'],
                  ],
                }}
                tldr={[
                  '중개수수료 = 거래금액 × 상한요율 (한도액 존재 시 최소값)',
                  '소액 거래(5천만 이하)는 한도액 25~30만원으로 제한',
                  '법정 상한 이내에서 중개인과 협의 가능',
                  '부가세(10%)는 별도 부과 (세금계산서 발급 시)',
                  '월세 거래금액 = 보증금 + (월세×100) 또는 × 70',
                ]}
              />

              <AdSlot slot="broker-fee-top" format="horizontal" />

              {/* 계산기 */}
              <CommissionCalculator />

              {/* FAQ (중간 배치 - GEO 권장) */}
              <FaqSection items={[...FAQ_ITEMS]} />

              {/* 중개수수료란 무엇인가 */}
              <section aria-label="중개수수료 개념" className="card">
                <h2 className="mb-4 text-2xl font-semibold">중개수수료란 무엇인가요?</h2>
                <p className="mb-4 text-text-secondary">
                  중개수수료(또는 중개보수·복비)는 부동산 거래 시 공인중개사에게 지급하는
                  수수료입니다(공인중개사법 §32). 매매·교환·전세·월세 등 모든 형태의 임대차·양도
                  거래에 적용됩니다. 중개수수료는 거래 당사자(매도자·매수자, 전세금 제공자·차용자)가
                  각각 부담하는 것이 원칙입니다.
                </p>
                <p className="text-text-secondary">
                  거래금액과 물건의 종류(주택·오피스텔·기타)에 따라 법정 상한요율이 결정되며, 중개인과
                  의뢰인은 그 상한 범위 내에서 자유롭게 요율을 협의할 수 있습니다. 협의 없이 거래하면
                  법정 상한요율이 기본 적용됩니다. 중개수수료 외에 부가세(VAT 10%)와 전월세 전환·명의
                  변경 등 부대비용이 별도로 발생할 수 있으므로 주의가 필요합니다.
                </p>
              </section>

              {/* 현행 요율표 */}
              <section aria-label="중개수수료 요율표" className="card">
                <h2 className="mb-4 text-2xl font-semibold">2026년 중개수수료 요율표</h2>

                <h3 className="mb-3 text-lg font-semibold text-text-secondary">
                  1. 주택 매매·교환
                </h3>
                <div className="overflow-x-auto mb-6">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-sm text-text-tertiary">
                      거래금액별 상한요율 및 한도액
                    </caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="py-2 px-3 text-left font-semibold">
                          거래금액
                        </th>
                        <th scope="col" className="py-2 px-3 text-right font-semibold">
                          상한요율
                        </th>
                        <th scope="col" className="py-2 px-3 text-right font-semibold">
                          한도액
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-subtle">
                        <td className="py-2 px-3">~5,000만 원</td>
                        <td className="py-2 px-3 text-right">0.6%</td>
                        <td className="py-2 px-3 text-right font-medium">25만 원</td>
                      </tr>
                      <tr className="border-b border-border-subtle">
                        <td className="py-2 px-3">5,000만 ~ 2억</td>
                        <td className="py-2 px-3 text-right">0.5%</td>
                        <td className="py-2 px-3 text-right font-medium">80만 원</td>
                      </tr>
                      <tr className="border-b border-border-subtle">
                        <td className="py-2 px-3">2억 ~ 9억</td>
                        <td className="py-2 px-3 text-right">0.4%</td>
                        <td className="py-2 px-3 text-right">—</td>
                      </tr>
                      <tr className="border-b border-border-subtle">
                        <td className="py-2 px-3">9억 ~ 12억</td>
                        <td className="py-2 px-3 text-right">0.5%</td>
                        <td className="py-2 px-3 text-right">—</td>
                      </tr>
                      <tr className="border-b border-border-subtle">
                        <td className="py-2 px-3">12억 ~ 15억</td>
                        <td className="py-2 px-3 text-right">0.6%</td>
                        <td className="py-2 px-3 text-right">—</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-3">15억 이상</td>
                        <td className="py-2 px-3 text-right">0.7%</td>
                        <td className="py-2 px-3 text-right">—</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <h3 className="mb-3 text-lg font-semibold text-text-secondary">
                  2. 주택 임대차 (전세·월세)
                </h3>
                <div className="overflow-x-auto mb-6">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-sm text-text-tertiary">
                      거래금액별 상한요율 및 한도액
                    </caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="py-2 px-3 text-left font-semibold">
                          거래금액
                        </th>
                        <th scope="col" className="py-2 px-3 text-right font-semibold">
                          상한요율
                        </th>
                        <th scope="col" className="py-2 px-3 text-right font-semibold">
                          한도액
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-subtle">
                        <td className="py-2 px-3">~5,000만 원</td>
                        <td className="py-2 px-3 text-right">0.5%</td>
                        <td className="py-2 px-3 text-right font-medium">20만 원</td>
                      </tr>
                      <tr className="border-b border-border-subtle">
                        <td className="py-2 px-3">5,000만 ~ 1억</td>
                        <td className="py-2 px-3 text-right">0.4%</td>
                        <td className="py-2 px-3 text-right font-medium">30만 원</td>
                      </tr>
                      <tr className="border-b border-border-subtle">
                        <td className="py-2 px-3">1억 ~ 6억</td>
                        <td className="py-2 px-3 text-right">0.3%</td>
                        <td className="py-2 px-3 text-right">—</td>
                      </tr>
                      <tr className="border-b border-border-subtle">
                        <td className="py-2 px-3">6억 ~ 12억</td>
                        <td className="py-2 px-3 text-right">0.4%</td>
                        <td className="py-2 px-3 text-right">—</td>
                      </tr>
                      <tr className="border-b border-border-subtle">
                        <td className="py-2 px-3">12억 ~ 15억</td>
                        <td className="py-2 px-3 text-right">0.5%</td>
                        <td className="py-2 px-3 text-right">—</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-3">15억 이상</td>
                        <td className="py-2 px-3 text-right">0.6%</td>
                        <td className="py-2 px-3 text-right">—</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <h3 className="mb-3 text-lg font-semibold text-text-secondary">
                  3. 오피스텔 (주거용, 전용 85㎡ 이하)
                </h3>
                <div className="overflow-x-auto mb-6">
                  <table className="w-full text-sm border-collapse">
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="py-2 px-3 text-left font-semibold">
                          거래 유형
                        </th>
                        <th scope="col" className="py-2 px-3 text-right font-semibold">
                          요율
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-subtle">
                        <td className="py-2 px-3">매매·교환</td>
                        <td className="py-2 px-3 text-right">0.5% (한도 없음)</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-3">임대차</td>
                        <td className="py-2 px-3 text-right">0.4% (한도 없음)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <h3 className="mb-3 text-lg font-semibold text-text-secondary">
                  4. 기타 물건 (상가·토지·비주거용 오피스텔)
                </h3>
                <p className="text-sm text-text-secondary mb-2">
                  상한요율 0.9% 이내에서 중개인과 협의 (구간 없음)
                </p>

                <div className="rounded-lg border border-border-subtle bg-bg-raised p-4 text-sm text-text-secondary">
                  <strong>법적 근거:</strong> 공인중개사법 §32 (중개보수·실비), 공인중개사법 시행규칙
                  §20 (중개보수 요율 및 한도액), 국토교통부 고시 「부동산 중개보수 요율」 (2023.10.19
                  개정 이후 현행 요율 유지)
                </div>
              </section>

              {/* 계산 공식 */}
              <section aria-label="계산 공식" className="card">
                <h2 className="mb-4 text-2xl font-semibold">계산 공식</h2>
                <ol className="space-y-3 text-sm leading-relaxed">
                  <li>
                    <strong>1. 거래금액 결정</strong>: 매매/전세는 거래가격, 월세는 보증금 +
                    (월세×100) 또는 × 70을 기준으로 계산합니다.
                  </li>
                  <li>
                    <strong>2. 물건 종류 확인</strong>: 주택(매매/임차별 요율), 오피스텔(고정
                    0.5%/0.4%), 기타(0.9% 협의).
                  </li>
                  <li>
                    <strong>3. 상한요율 결정</strong>: 거래금액에 해당하는 요율을 찾습니다. 소액
                    구간은 한도액 확인 필수.
                  </li>
                  <li>
                    <strong>4. 상한 중개수수료 계산</strong>: 거래금액 × 요율 (10원 단위 절사).
                    한도액 존재 시 Math.min(계산액, 한도액).
                  </li>
                  <li>
                    <strong>5. 협의 요율 반영</strong>: 협의 요율 입력 시 그 값으로 다시 계산
                    (상한 이하만 유효).
                  </li>
                  <li>
                    <strong>6. 부가세</strong>: 최종 중개수수료 × 10% (세금계산서 발급 시).
                  </li>
                  <li>
                    <strong>7. 총 지급액</strong>: (상한 또는 협의 중개수수료) + 부가세.
                  </li>
                </ol>
              </section>

              {/* 주의사항 */}
              <section aria-label="주의사항" className="card">
                <h2 className="mb-3 text-2xl font-semibold">주의사항</h2>
                <ul className="list-disc space-y-2 pl-5 text-sm text-text-secondary">
                  <li>
                    본 계산기는 2026년 공인중개사법 시행규칙 기준으로 합니다. 세법 개정 시
                    결과가 달라질 수 있으므로 거래 전 최신 정보를 확인하세요.
                  </li>
                  <li>
                    중개수수료는 법정 상한요율 이내에서 협의 가능하며, 실제 지급액은 지역·시장
                    상황·중개사의 정책에 따라 다를 수 있습니다.
                  </li>
                  <li>
                    부가세는 중개인이 세금계산서를 발급할 때만 부과됩니다. 세금계산서 미발급
                    거래는 부가세가 발생하지 않습니다.
                  </li>
                  <li>
                    월세 거래금액 계산 시 보증금 + (월세 × 100)의 결과가 5,000만 원 미만이면
                    월세 × 70으로 다시 계산합니다.
                  </li>
                  <li>
                    중개수수료 외에 명의 변경·전월세 전환·등기비용 등 부대비용이 발생할 수
                    있습니다.
                  </li>
                  <li>
                    거래 당사자가 각각 부담하는 것이 원칙이지만, 합의에 따라 한쪽이 전액
                    부담하거나 분담할 수 있습니다.
                  </li>
                </ul>
              </section>

              {/* 절세·활용 팁 */}
              <section aria-label="절세 팁" className="card">
                <h2 className="mb-3 text-2xl font-semibold">절약·활용 팁</h2>
                <ul className="space-y-3 text-sm text-text-secondary">
                  <li>
                    <strong>협의 요율 적극 활용</strong>: 법정 상한요율 이내에서 중개인과
                    협상하세요. 특히 고액 거래(2억 이상)에서는 몇 % 차이만 해도 수십만 원의
                    차이가 납니다.
                  </li>
                  <li>
                    <strong>한도액 확인</strong>: 소액 거래(5,000만 원 이하)에서는 한도액이
                    적용되므로, 상한요율보다 한도액으로 계산하는 것이 유리합니다.
                  </li>
                  <li>
                    <strong>부가세 여부 확인</strong>: 세금계산서 발급 여부를 미리 확인하고
                    부가세를 포함한 총액을 계산하세요.
                  </li>
                  <li>
                    <strong>양측 요율 차이 협상</strong>: 매도자와 매수자의 요율이 다를 수
                    있습니다. 둘 다 낮추도록 협상하거나 한쪽만 부담하도록 할 수 있습니다.
                  </li>
                  <li>
                    <strong>겸업 중개사 활용</strong>: 양방 중개를 같은 사무소가 하는 경우,
                    협의 요율 인하 가능성이 높습니다.
                  </li>
                </ul>
              </section>

              {/* 관련 계산기 */}
              <RelatedCalculators items={RELATED} />

              {/* 업데이트 로그 */}
              <section aria-label="업데이트" className="card">
                <h2 className="mb-2 text-lg font-semibold">업데이트</h2>
                <ul className="text-sm text-text-secondary">
                  <li>2026-04-24: 2026년 공인중개사법 기준 초판 공개</li>
                </ul>
              </section>

              {/* 출처·면책 */}
              <section
                aria-label="출처 및 면책"
                className="rounded-lg border border-border-base p-4 text-caption text-text-tertiary"
              >
                <p className="mb-2">
                  <strong>출처</strong>: 공인중개사법 §32, 공인중개사법 시행규칙 §20, 국토교통부
                  고시 「부동산 중개보수 요율」(2023.10.19 개정), <a href="https://www.kar.or.kr" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 hover:underline">한국공인중개사협회</a> (법정 상한요율), <a href="https://www.molit.go.kr" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-600 underline dark:text-primary-500">국토교통부</a>, <a href="https://www.wetax.go.kr" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-600 underline dark:text-primary-500">위택스</a> 공식 자료.
                </p>
                <p>
                  본 계산기의 결과는 참고용이며 법적 효력이 없습니다. 법정 상한·한도액은 참고용이고,
                  실제 중개수수료는 중개인과의 협의를 통해 결정됩니다. 거래 시 공인중개사와 개별 협의
                  후 중개수수료 계약서(또는 중개의뢰 확인서)를 작성하시기 바랍니다.
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
