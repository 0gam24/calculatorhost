import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { Footer } from '@/components/layout/Footer';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { AdSlot } from '@/components/ads/AdSlot';
import { StructuredSummary } from '@/components/calculator/StructuredSummary';
import { FaqSection } from '@/components/calculator/FaqSection';
import { RelatedCalculators } from '@/components/calculator/RelatedCalculators';
import { ShareButtons } from '@/components/calculator/ShareButtons';
import { EmbedCodeBox } from '@/components/calculator/EmbedCodeBox';
import { RateBarChart } from '@/components/charts/RateBarChart';

// Dynamic import — AdSense 슬롯 로딩 지연 (First Load JS 최적화)
const SkyscraperAd = dynamic(() => import('@/components/ads/SkyscraperAd').then(mod => ({ default: mod.SkyscraperAd })), {
  loading: () => <div className="hidden lg:block w-[300px] min-h-[620px] sticky top-20 z-30" aria-hidden="true" />,
});

const InfeedAd = dynamic(() => import('@/components/ads/InfeedAd').then(mod => ({ default: mod.InfeedAd })), {
  loading: () => <div className="my-6 md:my-8 min-h-[280px]" aria-hidden="true" />,
});
import {
  buildSoftwareApplicationJsonLd,
  buildFaqPageJsonLd,
  buildBreadcrumbJsonLd,
  buildSpeakableJsonLd,
  buildWebPageJsonLd,
  buildHowToJsonLd,
  buildDefinedTermSetJsonLd,
  getCategoryUrlForCalculator,
} from '@/lib/seo/jsonld';
import { AuthorByline } from '@/components/calculator/AuthorByline';
import { TransferTaxCalculator } from './TransferTaxCalculator';

const URL = 'https://calculatorhost.com/calculator/capital-gains-tax/';

export const metadata: Metadata = {
  title: '양도소득세 계산기 2026 | 1세대1주택 비과세·장기보유공제 자동',
  description:
    '양도소득세 계산기 2026 — 5억 매도 시 양도세 얼마? 1세대1주택 비과세·12억 한도·일시적2주택 특례·장기보유 30% 공제 자동 적용. 거래 전 최종 납부액 30초 확인.',
  keywords: [
    '양도세 계산기',
    '양도소득세 계산기',
    '양도 소득세 계산기',
    '1세대1주택 비과세',
    '일시적 2주택',
    '장기보유 특별공제',
    '2026 양도세',
  ],
  alternates: { canonical: URL },
  openGraph: {
    title: '양도소득세 계산기 2026 — 1세대1주택 · 일시적2주택',
    description: '부동산 양도 시 세금 최종 납부액을 거래 전 정확히 확인하세요.',
    url: URL,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '양도소득세 계산기 2026 — 1세대1주택 · 일시적2주택',
    description: '부동산 양도 시 세금 최종 납부액을 거래 전 정확히 확인하세요.',
  },
};

const FAQ_ITEMS = [
  {
    question: '1세대1주택 양도세 비과세 조건은 무엇인가요?',
    answer:
      '1세대1주택 비과세는 보유 기간 2년 이상, 거주 요건(조정지역 외 2년 이상 또는 조정지역 1년 이상), 양도가액 12억 원 이하를 모두 만족해야 합니다(소득세법 §94). 12억 원을 초과하면 초과분만 과세됩니다.',
  },
  {
    question: '일시적 2주택 3년 특례는 어떻게 적용되나요?',
    answer:
      '신규 주택을 취득한 후 기존 주택을 3년 이내에 양도할 때 1세대1주택과 동일하게 12억 원 이하는 비과세됩니다(시행령 §154). 신규 취득일부터 3년이 기한이므로 이를 초과하면 일반 세율이 적용됩니다.',
  },
  {
    question: '장기보유특별공제 계산 방법은?',
    answer:
      '일반 케이스는 연 2% (3년 이상 보유부터 적용, 최대 30%), 1세대1주택은 보유 + 거주 각 연 4% (각 최대 10년, 합 최대 80%)로 계산됩니다(시행령 §159의3). 공제액은 양도차익에서 차감됩니다.',
  },
  {
    question: '조정대상지역 2주택 양도세는?',
    answer:
      '조정지역에서 2주택 이상을 2년 이상 보유한 경우 기본 누진세율에 20%p(2주택) 또는 30%p(3주택 이상)가 가산됩니다(소득세법 §104의3). 예: 과세표준 3억 원이면 38% + 20% = 58% 세율이 적용됩니다.',
  },
  {
    question: '분양권 양도세율은 주택과 다른가요?',
    answer:
      '분양권은 특별히 높은 세율이 적용됩니다. 1년 미만 보유 시 70%, 1년 이상 보유 시 60%의 고정 세율입니다(소득세법 §100). 기본 누진세율 대신 이 고정 세율을 적용하므로 차익이 작으면 더 높은 세금이 나올 수 있습니다.',
  },
  {
    question: '양도소득세 세율표는 어떻게 되나요?',
    answer:
      '기본세율은 과세표준 구간에 따라 6~45%의 8단계 누진세율입니다(소득세법 §55·§104). 1,400만 이하 6%, 5,000만 이하 15%(누진공제 126만), 8,800만 이하 24%(576만), 1.5억 이하 35%(1,544만), 3억 이하 38%(1,994만), 5억 이하 40%(2,594만), 10억 이하 42%(3,594만), 10억 초과 45%(6,594만)입니다. 단, 주택 1년 미만 보유(40%)와 분양권(60~70%)은 누진세율 대신 단일세율이 우선 적용됩니다.',
  },
  {
    question: '양도소득세 신고 기한은?',
    answer:
      '양도세는 양도한 달의 말일부터 2개월 이내에 신고·납부해야 합니다(소득세법 §118, 소득세 시행령 §247). 기한을 초과하면 가산세와 이자가 부과되므로 거래 후 즉시 신고하는 것이 중요합니다.',
  },
  {
    question: '토지 양도세는 주택 양도세와 어떻게 다른가요?',
    answer:
      '토지(나대지·농지·임야 등)는 1세대1주택 비과세 대상이 아니며, 거주 요건이 없습니다. 일반 누진세율(6~45%) + 장기보유특별공제(연 2%, 최대 30%)가 적용됩니다. 단, 비사업용 토지는 추가 10%p 가산되어 최고 55%까지 부과될 수 있습니다(소득세법 §104의3). 농지·임야는 자경 8년 이상이면 양도세 100% 감면 특례가 있습니다(조세특례제한법 §69).',
  },
  {
    question: '토지 양도세 계산 사례는?',
    answer:
      '예시 1 — 5년 보유 나대지 (취득 1억, 양도 3억): 양도차익 2억 − 장기보유공제 10%(연 2% × 5년) − 기본공제 250만 = 과세표준 1억 7,750만 → 누진세율 38% − 누진공제 1,994만 = 약 4,751만 원 + 지방소득세 10% = 약 5,226만 원. 예시 2 — 10년 보유 농지 자경(취득 5천, 양도 2억): 자경 8년 미만이면 일반 과세, 8년 이상이면 100% 감면 (조특법 §69, 한도 1억).',
  },
  {
    question: '양도차익이 250만 원 이하면 비과세인가요?',
    answer:
      '양도소득세에는 기본공제 250만 원이 있어, 양도차익이 250만 원 이하면 세금이 부과되지 않습니다(소득세법 §103). 이는 1세대1주택 비과세와 별개로, 보유 기간·주택 수·조정지역 여부와 상관없이 모든 양도에 1년 1회 적용됩니다. 예: 일반 주택 양도차익 500만 원이면 (500만 − 250만) × 6% = 약 15만 원이 부과됩니다.',
  },
  {
    question: '일시적 2주택 3년은 언제부터 세나요?',
    answer:
      '일시적 2주택 특례의 3년 기한은 신규 주택 취득일부터 시작됩니다(소득세법 시행령 §154). 예를 들어 2024년 1월 1일에 새 집을 매매 계약하고 2월 15일 잔금을 치르면, 2월 15일부터 3년인 2027년 2월 14일까지 기존 집을 양도하면 특례 적용 가능합니다. 3년을 초과하면 일반 세율이 적용되므로 신규 취득 후 구주택 판매 일정을 명확히 계획하세요.',
  },
  {
    question: '기본공제 250만 원이 적용 안 되는 경우는?',
    answer:
      '기본공제 250만 원은 1년에 1회만 적용됩니다(소득세법 §103). 같은 해에 두 채 이상을 양도하면 첫 번째 양도에만 250만 원을 차감하고, 두 번째 양도부터는 기본공제가 없습니다. 또한 양도차익이 음수(손실)면 기본공제를 적용할 수익이 없으므로 공제 대상이 아닙니다.',
  },
  {
    question: '양도가 12억 초과면 비과세가 사라지나요?',
    answer:
      '아닙니다. 1세대1주택은 양도가 12억 원까지 비과세되고, 12억 초과분에 해당하는 양도차익만 비례 과세됩니다(소득세법 §89). 예: 양도가 15억, 취득가 10억(보유·거주 각 10년)이면 양도차익 5억 중 과세대상은 5억 × (15억−12억)/15억 = 1억 원입니다. 여기에 장기보유특별공제 80%(8,000만 원)와 기본공제 250만 원을 빼면 과세표준은 1,750만 원, 누진세율 15%·누진공제 126만 원 적용 시 양도소득세는 약 137만 원(지방소득세 포함 약 150만 원)입니다. 보유·거주 기간이 짧으면 공제율이 낮아 세액이 커집니다.',
  },
] as const;

const RELATED = [
  { href: '/calculator/acquisition-tax', title: '취득세', description: '주택 구매 시' },
  { href: '/calculator/property-tax', title: '재산세', description: '연간 부과' },
  { href: '/calculator/broker-fee', title: '중개수수료', description: '거래수수료' },
];

export default function TransferTaxPage() {
  const softwareLd = buildSoftwareApplicationJsonLd({
    name: '양도소득세 계산기',
    description: '2026년 최신 소득세율 반영, 주택·분양권 양도세 계산',
    url: URL,
  });
  const webPageLd = buildWebPageJsonLd({
    name: '양도소득세 계산기 2026',
    description: '부동산 양도 시 세금 최종 납부액을 거래 전 정확히 확인',
    url: URL,
    datePublished: '2026-04-24',
    dateModified: '2026-07-03',
    isPartOf: getCategoryUrlForCalculator('capital-gains-tax'),
  });
  const howToLd = buildHowToJsonLd({
    name: '양도소득세 계산기 사용 방법',
    description: '양도가, 취득가, 보유기간을 입력하여 양도소득세를 계산하는 단계별 가이드',
    steps: [
      { name: '양도가 입력', text: '부동산을 판매하는 금액(양도가)을 입력합니다.' },
      { name: '취득가 입력', text: '부동산을 구매한 금액(취득가)을 입력합니다.' },
      { name: '보유기간·주택수 설정', text: '보유 기간(년)과 현재 보유한 주택 수를 입력합니다.' },
      { name: '특례 확인', text: '1세대1주택 비과세, 일시적 2주택 특례 등 적용 여부를 확인합니다.' },
      { name: '양도세 결과 확인', text: '양도차익, 기본세율, 가산세율, 최종 납부액을 확인합니다.' },
    ],
  });
  const faqLd = buildFaqPageJsonLd(FAQ_ITEMS.map((f) => ({ question: f.question, answer: f.answer })));
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '세금', url: 'https://calculatorhost.com/category/tax/' },
    { name: '양도소득세' },
  ]);
  const speakableLd = buildSpeakableJsonLd(['[data-speakable]']);
  const definedTermSetLd = buildDefinedTermSetJsonLd({
    name: '양도소득세 핵심 용어',
    description: '주택·부동산·주식 양도 시 적용되는 양도소득세 산정 용어집',
    url: 'https://calculatorhost.com/calculator/capital-gains-tax/#glossary',
    terms: [
      {
        name: '양도차익',
        description: '양도가액에서 취득가액·필요경비(중개수수료, 세금 등)를 뺀 금액. 양도소득세 과세 표준의 출발점. 산식: 양도가액 − 취득가액 − 필요경비 − 장기보유특별공제.',
      },
      {
        name: '장기보유특별공제',
        alternateName: '장특공제',
        description: '부동산을 일정 기간 이상 보유한 경우 양도차익에서 공제하는 제도. 일반 부동산 3년 이상 6~30%, 1세대1주택 8~80%(최대 80%). 근거: 소득세법 §95.',
        url: 'https://www.nts.go.kr',
      },
      {
        name: '1세대1주택 비과세',
        description: '1세대가 1주택만 보유하고 2년 이상 보유(조정대상지역 거주 2년 이상)한 후 양도 시 양도차익 비과세. 단, 양도가액 12억 원 초과분은 과세. 근거: 소득세법 §89.',
      },
      {
        name: '일시적 2주택 특례',
        description: '기존 주택 보유 중 신규 주택 취득 시 일정 기간(원칙 3년, 조정지역 2년) 내 기존 주택 양도하면 1세대1주택 비과세 적용. 근거: 소득세법 시행령 §155.',
      },
      {
        name: '중과세율',
        description: '조정대상지역 다주택자 양도 시 기본세율에 가산하는 세율. 2주택자 +20%p, 3주택 이상 +30%p (한시적 유예 적용 시 제외). 근거: 소득세법 §104의7.',
      },
    ],
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermSetLd) }}
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
            <div className="mx-auto flex max-w-4xl flex-col gap-8 lg:max-w-none lg:grid lg:grid-cols-[1fr_300px]">
              {/* 메인 콘텐츠 */}
              <div className="flex flex-col gap-8">
              {/* H1 + 리드 */}
              <header>
                <Breadcrumb
                  items={[
                    { name: '홈', href: '/' },
                    { name: '세금', href: '/category/tax/' },
                    { name: '양도소득세' },
                  ]}
                />
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  양도소득세 계산기 2026
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  2026년 최신 소득세율을 반영한 무료 양도소득세 계산기입니다. 주택 판매 시 1세대1주택
                  비과세, 일시적 2주택 특례, 장기보유특별공제까지 모두 반영하여 최종 납부액을 거래 전에
                  정확히 확인할 수 있습니다.
                </p>
                <AuthorByline datePublished="2026-04-24" dateModified="2026-07-03" />
              </header>

              {/* GEO/AEO Structured Summary */}
              <StructuredSummary
                definition="양도소득세는 부동산 양도(판매) 시 발생한 차익에 부과되는 국세입니다. 기본 누진세율(6~45%), 단기 보유 세율(40~70%), 장기보유특별공제, 1세대1주택 비과세 등 다양한 조건에 따라 세액이 달라집니다(소득세법 §92-§118)."
                table={{
                  caption: '3가지 케이스별 양도세 기본 특징',
                  headers: ['케이스', '특징'],
                  rows: [
                    ['일반', '누진세 6~45%, 연 2% 공제 (3년↑, 최대 30%)'],
                    ['1세대1주택', '12억 이하 비과세, 연 4%×2 공제 (각 10년, 최대 80%)'],
                    ['일시적 2주택', '취득 3년 내 양도 시 12억 이하 비과세'],
                  ],
                }}
                tldr={[
                  '양도소득세 = (양도차익 − 장특공제 − 기본공제 250만) × 세율 + 지방소득세(10%)',
                  '1세대1주택은 보유 2년+, 12억 이하 시 비과세',
                  '일시적 2주택도 취득 후 3년 내 구 주택 판매 시 12억 이하 비과세',
                  '분양권은 1년 미만 70%, 1년 이상 60% 고정 세율',
                  '조정지역 2주택↑는 누진세에 20~30%p 중과',
                ]}
              />

              {/* 2026년 세율 기준 및 개정 안내 */}
              <div className="rounded-lg border border-highlight-500/30 bg-highlight-500/5 p-4">
                <p className="text-sm text-text-secondary">
                  <strong className="text-highlight-700 dark:text-highlight-300">2026년 세율 기준:</strong> 본 계산은 2026년 현행 소득세법(누진 6~45%, 장기보유공제, 1세대1주택 비과세 12억)에 따른 계산입니다.
                  정부의 부동산·세제 개혁 계획 예고에 따라 세율·공제·비과세 요건이 변경될 수 있으니,
                  <a href="https://www.nts.go.kr" target="_blank" rel="noopener noreferrer nofollow" className="font-semibold underline">국세청</a>과
                  <a href="https://www.hometax.go.kr" target="_blank" rel="noopener noreferrer nofollow" className="font-semibold underline">홈택스</a>에서 최신 공지를 확인하세요.
                </p>
              </div>

              <AdSlot slot="capital-gains-tax-top" format="horizontal" />

              {/* 계산기 */}
              <TransferTaxCalculator />

              {/* AD-2 Medium Rectangle (계산기-본문 사이, 300x250) */}
              <AdSlot slot="capital-gains-tax-middle" format="rectangle" />

              {/* FAQ (중간 배치 - GEO 권장) */}
              <FaqSection items={[...FAQ_ITEMS]} />

              {/* 답변형 H2 — 12억 초과 비례과세 대안·비교 (검증값: src/lib/tax/transfer.ts) */}
              <section aria-label="12억 초과 양도세" className="card">
                <h2 className="mb-4 text-2xl font-semibold">1세대1주택인데 양도가액이 12억을 넘으면 세금이 얼마인가요?</h2>
                <p className="mb-4 text-text-secondary" data-speakable>
                  1세대1주택은 양도가액 12억 원까지 비과세이고 12억을 초과하는 부분에만 과세되므로, 실제 세액은 생각보다 작습니다. 예를 들어 15억 원에 팔아도(취득 10억·10년 보유·거주) 양도세는 약 150만 원 수준입니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-tertiary">표. 1세대1주택 12억 초과 양도가액별 세액 (취득가 10억, 10년 보유·거주로 장기보유특별공제 80%·기본공제 250만 적용)</caption>
                    <thead>
                      <tr className="bg-primary-500/10 border border-border-base">
                        <th scope="col" className="px-4 py-3 text-right font-bold text-text-primary">양도가액</th>
                        <th scope="col" className="px-4 py-3 text-right font-bold text-text-primary">과세표준</th>
                        <th scope="col" className="px-4 py-3 text-right font-bold text-text-primary">양도세+지방세 총액</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border border-border-base hover:bg-bg-card/50">
                        <td className="px-4 py-2 text-right tabular-nums">13억 원</td>
                        <td className="px-4 py-2 text-right tabular-nums">2,115,385원</td>
                        <td className="px-4 py-2 text-right font-bold text-primary-700 dark:text-primary-300 tabular-nums">약 14만 원 (139,610원)</td>
                      </tr>
                      <tr className="border border-border-base hover:bg-bg-card/50">
                        <td className="px-4 py-2 text-right tabular-nums">15억 원</td>
                        <td className="px-4 py-2 text-right tabular-nums">17,500,000원</td>
                        <td className="px-4 py-2 text-right font-bold text-primary-700 dark:text-primary-300 tabular-nums">약 150만 원 (1,501,500원)</td>
                      </tr>
                      <tr className="border border-border-base hover:bg-bg-card/50">
                        <td className="px-4 py-2 text-right tabular-nums">20억 원</td>
                        <td className="px-4 py-2 text-right tabular-nums">77,500,000원</td>
                        <td className="px-4 py-2 text-right font-bold text-primary-700 dark:text-primary-300 tabular-nums">약 1,412만 원 (14,124,000원)</td>
                      </tr>
                      <tr className="border border-border-base hover:bg-bg-card/50">
                        <td className="px-4 py-2 text-right tabular-nums">30억 원</td>
                        <td className="px-4 py-2 text-right tabular-nums">237,500,000원</td>
                        <td className="px-4 py-2 text-right font-bold text-primary-700 dark:text-primary-300 tabular-nums">약 7,734만 원 (77,341,000원)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-3 text-xs text-text-tertiary">
                  * 취득가액과 보유·거주 기간(장기보유특별공제율), 기본공제에 따라 세액이 달라집니다. 본인 조건의 정확한 세액은 위 계산기로 확인하세요.
                </p>
              </section>

              {/* AD-4 Infeed (본문 중간) */}
              <InfeedAd slot="capital-gains-tax-infeed" />

              {/* 양도소득세란 무엇인가 */}
              <section aria-label="양도소득세 개념" className="card">
                <h2 className="mb-4 text-2xl font-semibold">양도소득세란 무엇인가요?</h2>
                <p className="mb-4 text-text-secondary" data-speakable>
                  양도소득세는 부동산(주택, 토지, 건물)을 양도(판매)할 때 발생한 소득에 부과되는
                  국세입니다(소득세법 §92-§118). 양도 시 취득가보다 높은 가격으로 판매하면 그 차익이
                  양도소득이 되고, 여기에 누진 세율이 적용됩니다. 지방소득세(10%)와 함께 부과됩니다.
                </p>
                <p className="mb-4 text-text-secondary">
                  양도소득세는 보유 기간, 자산 종류(주택/분양권/토지), 세대 주택수, 조정지역 여부에 따라
                  매우 복잡한 계산이 필요합니다. 특히 1세대1주택 비과세(12억 원 이하), 일시적 2주택 특례,
                  장기보유특별공제 등 여러 특례가 있어 정확한 이해 없이는 납부액을 예측하기 어렵습니다.
                </p>
                <p className="text-text-secondary">
                  본 계산기는 일반·1세대1주택·일시적 2주택 3가지 케이스와 주택·분양권 2가지 자산만 지원합니다.
                  상속주택, 농어촌주택, 임대등록주택 등 특수 특례는 세무사 상담을 권장합니다.
                </p>
              </section>

              {/* 3가지 케이스 비교 */}
              <section aria-label="케이스별 비교" className="card">
                <h2 className="mb-4 text-2xl font-semibold">3가지 케이스 비교</h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border-base">
                        <th className="px-3 py-2 text-left font-semibold text-text-primary">항목</th>
                        <th className="px-3 py-2 text-left font-semibold text-text-primary">일반</th>
                        <th className="px-3 py-2 text-left font-semibold text-text-primary">
                          1세대1주택
                        </th>
                        <th className="px-3 py-2 text-left font-semibold text-text-primary">
                          일시적 2주택
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base/50">
                        <td className="px-3 py-2 text-text-secondary">세율</td>
                        <td className="px-3 py-2">누진 6~45%</td>
                        <td className="px-3 py-2">누진 6~45%</td>
                        <td className="px-3 py-2">누진 6~45%</td>
                      </tr>
                      <tr className="border-b border-border-base/50">
                        <td className="px-3 py-2 text-text-secondary">비과세</td>
                        <td className="px-3 py-2">없음</td>
                        <td className="px-3 py-2">12억 이하</td>
                        <td className="px-3 py-2">12억 이하 (취득 3년 내)</td>
                      </tr>
                      <tr className="border-b border-border-base/50">
                        <td className="px-3 py-2 text-text-secondary">장기보유공제</td>
                        <td className="px-3 py-2">연 2% (3년↑, 최대 30%)</td>
                        <td className="px-3 py-2">
                          연 4%×2 (각 10년↑, 최대 80%)
                        </td>
                        <td className="px-3 py-2">연 2% (일반)</td>
                      </tr>
                      <tr className="border-b border-border-base/50">
                        <td className="px-3 py-2 text-text-secondary">조정지역 중과</td>
                        <td className="px-3 py-2">+20% (2주택) /+30% (3주택↑)</td>
                        <td className="px-3 py-2">적용 없음</td>
                        <td className="px-3 py-2">적용 없음</td>
                      </tr>
                      <tr>
                        <td className="px-3 py-2 text-text-secondary">기본공제</td>
                        <td className="px-3 py-2">250만 원</td>
                        <td className="px-3 py-2">250만 원</td>
                        <td className="px-3 py-2">250만 원</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              {/* 세율 체계 */}
              <section aria-label="세율 체계" className="card">
                <h2 className="mb-4 text-2xl font-semibold">양도소득세 세율 체계</h2>

                <h3 className="mb-2 text-lg font-semibold text-text-primary">
                  기본 누진세율 (소득세법 §55)
                </h3>
                <div className="mb-6 overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border-base">
                        <th className="px-3 py-2 text-left font-semibold text-text-primary">
                          과세표준
                        </th>
                        <th className="px-3 py-2 text-right font-semibold text-text-primary">세율</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ['1,400만 원 이하', '6%'],
                        ['1,400만~5,000만', '15%'],
                        ['5,000만~8,800만', '24%'],
                        ['8,800만~1.5억', '35%'],
                        ['1.5억~3억', '38%'],
                        ['3억~5억', '40%'],
                        ['5억~10억', '42%'],
                        ['10억 초과', '45%'],
                      ].map(([range, rate]) => (
                        <tr key={range} className="border-b border-border-base/50">
                          <td className="px-3 py-2 text-text-secondary">{range}</td>
                          <td className="px-3 py-2 text-right font-medium text-primary-500">
                            {rate}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <RateBarChart
                  title="양도소득세 기본세율 — 과세표준 구간별 (소득세법 §55)"
                  caption="양도소득세 기본세율은 과세표준이 커질수록 6%에서 45%까지 8단계로 누진 적용됩니다. 1세대1주택 비과세와 장기보유특별공제를 적용한 뒤의 과세표준 기준이며, 2년 미만 단기 보유 주택은 별도 단일세율(40~70%)이 우선합니다."
                  bars={[
                    { label: '1,400만 이하', value: 6 },
                    { label: '5,000만 이하', value: 15 },
                    { label: '8,800만 이하', value: 24 },
                    { label: '1.5억 이하', value: 35 },
                    { label: '3억 이하', value: 38 },
                    { label: '5억 이하', value: 40 },
                    { label: '10억 이하', value: 42 },
                    { label: '10억 초과', value: 45, highlight: true },
                  ]}
                />

                <h3 className="mb-2 text-lg font-semibold text-text-primary">
                  단기 보유 세율 (주택 1년 미만, 소득세법 §100)
                </h3>
                <p className="mb-4 text-sm text-text-secondary">
                  주택을 1년 미만 보유하면 누진세 대신 40%의 고정 세율이 적용됩니다.
                </p>

                <h3 className="mb-2 text-lg font-semibold text-text-primary">
                  분양권 세율 (소득세법 §100의2)
                </h3>
                <ul className="mb-6 space-y-1 text-sm text-text-secondary">
                  <li>• 1년 미만 보유: 70% (누진세 불가)</li>
                  <li>• 1년 이상 보유: 60% (누진세 불가)</li>
                </ul>

                <h3 className="mb-2 text-lg font-semibold text-text-primary">
                  조정지역 다주택 중과 (소득세법 §104의3)
                </h3>
                <p className="mb-2 text-sm text-text-secondary">
                  조정대상지역에서 여러 주택을 보유한 경우 기본 누진세율에 추가로 중과됩니다:
                </p>
                <ul className="space-y-1 text-sm text-text-secondary">
                  <li>• 2주택 (2년 이상 보유): 기본 누진세율 + 20%p</li>
                  <li>• 3주택 이상 (2년 이상 보유): 기본 누진세율 + 30%p</li>
                </ul>
              </section>

              {/* 장기보유특별공제 */}
              <section aria-label="장기보유특별공제" className="card">
                <h2 className="mb-4 text-2xl font-semibold">장기보유특별공제 (시행령 §159의3)</h2>
                <p className="mb-4 text-sm text-text-secondary">
                  장기간 주택을 보유한 경우 양도차익에서 일정 비율을 공제해줍니다.
                </p>

                <h3 className="mb-2 text-lg font-semibold text-text-primary">일반 주택</h3>
                <ul className="mb-4 space-y-1 text-sm text-text-secondary">
                  <li>
                    • 3년 이상 보유: 연 2% (3년 → 6%, 4년 → 8%, ... 15년 이상 → 최대 30%)
                  </li>
                  <li>• 3년 미만: 공제 불가</li>
                </ul>

                <h3 className="mb-2 text-lg font-semibold text-text-primary">
                  1세대1주택 (보유 + 거주 누적)
                </h3>
                <ul className="space-y-1 text-sm text-text-secondary">
                  <li>
                    • 보유 기간: 연 4% (최대 10년, 40%)
                  </li>
                  <li>
                    • 거주 기간: 연 4% (최대 10년, 40%)
                  </li>
                  <li>
                    • 합계 최대 80% (예: 보유 10년 + 거주 10년 = 80%)
                  </li>
                </ul>
              </section>

              {/* 토지 양도세 (별도 — 주택과 다른 규정) */}
              <section aria-label="토지 양도세" className="card">
                <h2 className="mb-4 text-2xl font-semibold">토지 양도세 — 주택과 다른 규정</h2>
                <p className="mb-4 text-sm text-text-secondary">
                  토지(나대지·농지·임야·잡종지 등)는 주택과 달리 <strong>1세대1주택 비과세 대상이 아닙니다.</strong>
                  거주 요건도 적용되지 않으며, 일반 누진세율 + 장기보유공제만 적용됩니다.
                </p>
                <div className="mb-4 rounded-lg border border-border-base bg-bg-card p-4 space-y-3">
                  <h3 className="font-semibold text-text-primary">토지 양도세 핵심 규정</h3>
                  <ul className="text-sm text-text-secondary space-y-2">
                    <li>• <strong>일반 누진세율</strong>: 6%~45% (8단계, 주택과 동일)</li>
                    <li>• <strong>장기보유공제</strong>: 연 2%, 3년 이상 보유부터, <strong>최대 30%</strong> (주택 1세대1주택 80%와 큰 차이)</li>
                    <li>• <strong>비사업용 토지 가산</strong>: <strong>+10%p</strong> 추가 (소득세법 §104의3) → 최고 55%까지</li>
                    <li>• <strong>비과세·감면 특례</strong>: 8년 이상 자경 농지 100% 감면 (조특법 §69, 한도 연 1억·5년 합 2억)</li>
                  </ul>
                </div>

                <div className="mb-4 rounded-lg border border-border-base bg-bg-raised p-4">
                  <h3 className="mb-2 font-semibold text-text-primary">사례 1. 5년 보유 나대지 양도</h3>
                  <ul className="text-sm text-text-secondary space-y-1">
                    <li>취득가: 1억 원 (2021년)</li>
                    <li>양도가: 3억 원 (2026년)</li>
                    <li>양도차익: 2억 원</li>
                    <li>장기보유공제: 2억 × 10% (5년 × 2%) = 2,000만 원</li>
                    <li>기본공제: 250만 원 (소득세법 §103)</li>
                    <li>과세표준: 1억 7,750만 원</li>
                  </ul>
                  <div className="mt-3 pt-3 border-t border-border-base text-sm">
                    <p className="text-text-secondary">
                      <strong>세액 계산:</strong> 1억 7,750만 × 38% − 누진공제 1,994만 = <strong>4,751만 원</strong> (양도세)<br />
                      <strong>지방소득세:</strong> 4,751만 × 10% = 475만 원<br />
                      <strong>총 부담:</strong> 약 <strong className="text-primary-700 dark:text-primary-300">5,226만 원</strong> (양도차익의 약 26.1%)
                    </p>
                  </div>
                </div>

                <div className="mb-4 rounded-lg border border-border-base bg-bg-raised p-4">
                  <h3 className="mb-2 font-semibold text-text-primary">사례 2. 8년 자경 농지 양도 (감면 적용)</h3>
                  <ul className="text-sm text-text-secondary space-y-1">
                    <li>취득가: 5,000만 원 (2017년)</li>
                    <li>양도가: 2억 원 (2026년, 9년 보유)</li>
                    <li>자경 기간: 8년 이상 ✓ (실제 농업 종사 증빙 필수)</li>
                  </ul>
                  <div className="mt-3 pt-3 border-t border-border-base text-sm">
                    <p className="text-text-secondary">
                      <strong>감면 적용:</strong> 양도세 100% 감면 (조특법 §69, 연 1억·5년 합 2억 한도 내)<br />
                      <strong>최종 부담:</strong> <strong className="text-primary-700 dark:text-primary-300">0원</strong> (단, 농지원부 등 자경 증빙 필요)<br />
                      <strong>주의:</strong> 자경 기준 — 직접 농업 종사 + 거주 요건 (8년 + 농지 소재지 거주)
                    </p>
                  </div>
                </div>

                <div className="rounded-lg border-l-4 border-l-danger-500 bg-danger-500/5 p-4">
                  <p className="text-sm text-danger-700 dark:text-danger-300">
                    <strong>비사업용 토지 주의</strong>: 도시 외곽 나대지·임야 등이 비사업용으로 분류되면
                    누진세율에 +10%p 가산됩니다. 사업 사용 입증(임대·경작·자영업 등)으로 사업용 인정받아야
                    가산세 회피 가능. 정확한 분류는 국세청 양도소득세 전문가 상담 권장.
                  </p>
                </div>
              </section>

              {/* 1세대1주택 비과세 */}
              <section aria-label="1세대1주택 비과세" className="card">
                <h2 className="mb-4 text-2xl font-semibold">1세대1주택 비과세 (소득세법 §94)</h2>
                <p className="mb-4 text-sm text-text-secondary">
                  다음 조건을 모두 만족하면 양도소득세가 전액 비과세됩니다:
                </p>
                <ol className="mb-4 space-y-2 text-sm text-text-secondary">
                  <li>
                    <strong>1. 보유 기간 2년 이상</strong>
                  </li>
                  <li>
                    <strong>2. 거주 요건:</strong> 조정지역 외 2년 이상 거주 또는 조정지역 1년
                    이상 거주
                  </li>
                  <li>
                    <strong>3. 양도가액 12억 원 이하</strong>
                  </li>
                </ol>
                <p className="mb-4 text-sm text-text-secondary">
                  <strong>12억 원 초과 시:</strong> 초과분만 과세됩니다. 예: 양도가 15억 원이면
                  (15억 − 12억) / 15억 = 20%만 과세 대상이 됩니다.
                </p>
                <p className="text-sm text-text-secondary">
                  <strong>조정지역이란:</strong> 투기 억제를 위해 정부가 지정한 지역(서울 강남·강동·
                  송파구 일부, 경기 일부 신도시 등). 조정지역 주택은 비과세 적용이 어려우므로 구청에
                  확인하세요.
                </p>
              </section>

              {/* 일시적 2주택 특례 */}
              <section aria-label="일시적 2주택 특례" className="card">
                <h2 className="mb-4 text-2xl font-semibold">일시적 2주택 특례 (시행령 §154)</h2>
                <p className="mb-4 text-sm text-text-secondary">
                  신규 주택을 먼저 취득하고 기존 주택을 양도하는 경우, 다음 조건 만족 시 1세대1주택
                  비과세와 동일한 대우를 받습니다:
                </p>
                <ol className="mb-4 space-y-2 text-sm text-text-secondary">
                  <li>
                    <strong>1. 신규 취득 후 3년 내 구 주택 양도</strong>
                  </li>
                  <li>
                    <strong>2. 양도가액 12억 원 이하</strong>
                  </li>
                </ol>
                <p className="text-sm text-text-secondary">
                  <strong>주의:</strong> 신규 취득일부터 3년이 기한입니다. 초과하면 일반 세율이
                  적용되므로 신규 매매 계약 후 구주택 판매 일정을 신중하게 계획해야 합니다.
                </p>
              </section>

              {/* 주의사항 */}
              <section aria-label="주의사항" className="card">
                <h2 className="mb-3 text-2xl font-semibold">주의사항</h2>
                <ul className="space-y-3 text-sm text-text-secondary">
                  <li>
                    <strong>본 계산기의 범위:</strong> 본 계산은 일반·1세대1주택·일시적 2주택 3가지
                    케이스와 주택·분양권 2가지 자산만 지원합니다. 상속주택, 농어촌주택, 임대등록주택,
                    기타 특수 특례는 세무사 상담을 권장합니다.
                  </li>
                  <li>
                    <strong>조정지역 여부 확인:</strong> 1세대1주택 비과세와 조정지역 중과는 주소지에
                    따라 크게 달라집니다. 양도 전 반드시 구청 또는 시청 세무과에 조정지역 여부를
                    확인하세요.
                  </li>
                  <li>
                    <strong>1세대 판정:</strong> 부부와 미성년 자녀를 기준으로 합니다. 성인 자녀나
                    부모가 함께 소유하면 1세대1주택이 아닐 수 있으므로 세무사 상담을 받으세요.
                  </li>
                  <li>
                    <strong>거주 기간 증명:</strong> 1세대1주택 비과세 신청 시 주민등록등본, 건강보험
                    자격확인서 등으로 거주 기간을 증명해야 합니다.
                  </li>
                  <li>
                    <strong>2026년 세율 기준:</strong> 본 계산은 2026년 세율로 계산됩니다. 세법 개정
                    시 변경될 수 있으므로 거래 전 최신 정보를 확인하세요.
                  </li>
                </ul>
              </section>

              {/* 절세 팁 */}
              <section aria-label="절세 팁" className="card">
                <h2 className="mb-3 text-2xl font-semibold">절세·활용 팁</h2>
                <ul className="space-y-3 text-sm text-text-secondary">
                  <li>
                    <strong>1세대1주택 비과세 기한:</strong> 보유 2년, 거주 요건(조정지역외 2년 또는
                    조정지역 1년)을 정확히 계산하세요. 1일 부족해도 비과세가 안 되면 세금이 수천만
                    원 차이 납니다.
                  </li>
                  <li>
                    <strong>신규 거주 계획:</strong> 새 집을 사면서 기존 집을 팔 계획이라면, 신규
                    취득일부터 3년 이내에 구주택을 양도해야 일시적 2주택 특례를 받을 수 있습니다.
                  </li>
                  <li>
                    <strong>필요경비 정확히 계산:</strong> 매매 중개비, 리모델링 비용, 양도 시 취득세
                    등 필요경비를 완전히 증명해야 합니다. 영수증을 보관하세요.
                  </li>
                  <li>
                    <strong>장기보유 = 30% 절세:</strong> 일반 주택 15년 이상 보유면 양도차익의 30%를
                    공제받습니다. 기본 누진세율만 해도 수억 대 차익이면 세금이 많으므로, 보유 기간의
                    가치를 항상 계산하세요.
                  </li>
                  <li>
                    <strong>분양권은 고세율:</strong> 분양권은 1년 미만 70%, 1년 이상 60%로 고정
                    세율입니다. 누진 혜택이 없으므로 장기보유 또는 완공 후 판매를 고려하세요.
                  </li>
                </ul>
              </section>

              {/* 신고 기한 */}
              <section aria-label="신고 기한" className="card">
                <h2 className="mb-3 text-2xl font-semibold">신고 기한</h2>
                <p className="mb-3 text-sm text-text-secondary">
                  양도소득세는 양도한 달의 말일부터 2개월 이내에 신고·납부해야 합니다(소득세법 §118,
                  소득세 시행령 §247).
                </p>
                <p className="text-sm text-text-secondary">
                  <strong>예시:</strong> 2026년 3월 15일 양도 → 3월 31일부터 기산 → 5월 31일까지 신고
                  (정상). 6월 1일 이후 신고 → 가산세 20% + 기간 이자 부과.
                </p>
              </section>

              {/* 관련 계산기 */}
              {/* 관련 가이드 CTA */}
              <section aria-label="관련 가이드" className="card border-l-4 border-l-primary-500 bg-primary-500/5">
                <h2 className="mb-2 text-xl font-semibold">함께 보면 좋은 가이드</h2>
                <ul className="space-y-2 text-sm">
                  <li>
                    →{' '}
                    <a href="/guide/capital-gains-tax-tips/" className="text-primary-700 dark:text-primary-300 underline font-medium">
                      양도소득세 절세 7가지 방법 (2026)
                    </a>{' '}
                    — 1세대1주택 비과세, 장기보유공제 80%, 자경 농지 100% 감면 등
                  </li>
                  <li>
                    →{' '}
                    <a href="/guide/one-household-12-billion-exemption/" className="text-primary-700 dark:text-primary-300 underline font-medium">
                      1세대1주택 12억 비과세 한도 완전 정리
                    </a>{' '}
                    — 12억 초과분 비례 과세 공식과 장기보유공제 80% 결합 계산
                  </li>
                  <li>
                    →{' '}
                    <a href="/guide/temporary-two-houses-capital-gains-exemption/" className="text-primary-700 dark:text-primary-300 underline font-medium">
                      일시적 2주택 양도세 비과세 3년
                    </a>{' '}
                    — 신규 취득 후 3년 내 종전 주택 양도 요건과 지역별 기한
                  </li>
                  <li>
                    →{' '}
                    <a href="/guide/long-term-holding-special-deduction-80-percent/" className="text-primary-700 dark:text-primary-300 underline font-medium">
                      장기보유특별공제 80% 완전 정리
                    </a>{' '}
                    — 보유 4%×10년 + 거주 4%×10년 = 최대 80% 공제율 표
                  </li>
                  <li>
                    →{' '}
                    <a href="/guide/presale-right-capital-gains-tax/" className="text-primary-700 dark:text-primary-300 underline font-medium">
                      분양권 양도소득세 완전 정리
                    </a>{' '}
                    — 보유 기간 무관 60%/70% 단일 세율, 비과세·장특공제 미적용
                  </li>
                  <li>
                    →{' '}
                    <a href="/guide/capital-gains-tax-5-steps/" className="text-primary-700 dark:text-primary-300 underline font-medium">
                      양도소득세 5단계 시뮬
                    </a>{' '}
                    — 양도가 산정부터 세율 적용까지 실전 계산 흐름 단계별 해설
                  </li>
                </ul>
              </section>

              <ShareButtons title="양도소득세 계산기 (2026)" url="https://calculatorhost.com/calculator/capital-gains-tax/" />

              <EmbedCodeBox
                embedPath="/embed/capital-gains-tax/"
                canonicalPath="/calculator/capital-gains-tax/"
                title="양도소득세 계산기"
              />

              <RelatedCalculators items={RELATED} />

              {/* 업데이트 로그 */}
              <section aria-label="업데이트" className="card">
                <h2 className="mb-2 text-lg font-semibold">업데이트</h2>
                <ul className="text-sm text-text-secondary">
                  <li>2026-07-03: 세율표 FAQ 추가, 토지 사례 기본공제 250만 원 반영 교정, 메타 표현 정비</li>
                  <li>2026-04-24: 2026년 세율 반영 초판 공개 (일반·1세대1주택·일시적2주택)</li>
                </ul>
              </section>

              {/* 참고 자료 */}
              <section aria-label="참고 자료" className="card">
                <h2 className="mb-3 text-lg font-semibold">법적 근거 및 공식 출처</h2>
                <ul className="space-y-2 text-sm text-text-secondary">
                  <li>
                    <a
                      href="https://www.law.go.kr/법령/소득세법/제94조"
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="text-primary-600 underline dark:text-primary-500"
                    >
                      국가법령정보센터 — 소득세법 §94 (양도소득의 범위)
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.law.go.kr/법령/소득세법/제104조"
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="text-primary-600 underline dark:text-primary-500"
                    >
                      국가법령정보센터 — 소득세법 §104 (양도소득세율)
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.law.go.kr/법령/소득세법/제89조"
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="text-primary-600 underline dark:text-primary-500"
                    >
                      국가법령정보센터 — 소득세법 §89 (1세대1주택 비과세)
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.hometax.go.kr"
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="text-primary-600 underline dark:text-primary-500"
                    >
                      국세청 홈택스 — 양도소득세 신고 및 간이계산기
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.nts.go.kr"
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="text-primary-600 underline dark:text-primary-500"
                    >
                      국세청 (nts.go.kr) — 최신 양도세 정책·공지·질의응답
                    </a>
                  </li>
                </ul>
              </section>

              {/* 출처·면책 */}
              <section
                aria-label="출처 및 면책"
                className="rounded-lg border border-border-base p-4 text-caption text-text-tertiary"
              >
                <p className="mb-2">
                  <strong>법적 근거</strong>: 소득세법 §92-§118, §100, §100의2, §104의3, 소득세법
                  시행령 §154, §159의3, §247.
                </p>
                <p>
                  <strong>면책:</strong> 본 계산기의 결과는 참고용이며 법적 효력이 없습니다. 본
                  계산은 일반·1세대1주택·일시적 2주택 3가지 케이스만 지원하며, 상속·임대등록·
                  농어촌·장기임대주택 등 특수 특례는 미반영입니다. 실제 신고·납부는 국세청 홈택스
                  간이계산기 또는 세무사의 안내를 받으시기 바랍니다.
                </p>
              </section>
              </div>

              {/* 우측 AD-3 Skyscraper (lg+) */}
              <SkyscraperAd slot="capital-gains-tax-skyscraper" />
            </div>
          </main>
        </div>
        <Footer />
      </div>
    </>
  );
}
