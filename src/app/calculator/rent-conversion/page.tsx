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
} from '@/lib/seo/jsonld';
import { RentConversionCalculator } from './RentConversionCalculator';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { AuthorByline } from '@/components/calculator/AuthorByline';

const URL = 'https://calculatorhost.com/calculator/rent-conversion/';

export const metadata: Metadata = {
  title: '전월세 전환율 계산기 2026 | 기준금리+2% 법정 상한·보증금 월세',
  description:
    '전세 3억→보증금 1억+월세 얼마? 주택임대차보호법 §7의2 기준금리+2% 법정 상한 자동 + 보증금·월세 양방향 환산. 임대차 분쟁 예방. 2026 최신.',
  keywords: [
    '전월세 전환율 계산기',
    '전월세 전환율',
    '보증금 월세 계산기',
    '월차임 전환율',
    '주택임대차보호법',
    '환산보증금',
  ],
  alternates: { canonical: URL },
  openGraph: {
    title: '전월세 전환율 계산기 2026',
    description:
      '2026년 법정 상한 기준 전월세 전환율 계산기. 전세·월세·반전세 무료 변환 계산. 한국은행 기준금리 반영, 법정 상한 자동 계산. 회원가입 불필요.',
    url: URL,
    type: 'website',

  },
  twitter: {
    card: 'summary_large_image',
    title: '전월세 전환율 계산기 2026',
    description: '2026년 법정 상한 기준 전월세 전환율 계산기. 전세·월세·반전세 무료 변환 계산. 한국은행 기준금리 반영, 법정 상한 자동 계산. 회원가입 불필요.',
  },
};

const FAQ_ITEMS = [
  {
    question: '전월세 전환율이 뭔가요?',
    answer:
      '전월세 전환율은 전세보증금을 월세로 전환할 때, 또는 월세를 전세로 환산할 때 적용되는 비율입니다(주택임대차보호법 §7의2). 이 비율은 한국은행 기준금리에 기초하여 정해지며, 임대인이 임차인에게 일방적으로 강요할 수 없고 법정 상한 이내에서만 적용됩니다.',
  },
  {
    question: '법정 상한은 얼마인가요?',
    answer:
      '전월세 전환율의 법정 상한은 두 가지 중 낮은 값입니다: (1) 한국은행 기준금리 + 대통령령 가산비율(2%p), (2) 연 10%. 예를 들어 기준금리가 3.5%면 A = 5.5%, B = 10%이므로, 실제 상한은 5.5%입니다. 이는 시간에 따라 변할 수 있으므로 계산기에서 직접 설정 가능합니다.',
  },
  {
    question: '임대인이 법정 상한을 초과한 월세를 요구하면?',
    answer:
      '주택임대차보호법 §7의2는 일방적인 증감 요구를 제한합니다. 상한을 초과한 요구에 대해 임차인은 거부할 권리가 있으며, 분쟁이 생기면 주택임대차분쟁조정위원회에 조정을 신청할 수 있습니다. 조정위원회는 법정 상한 이내로 조정합니다.',
  },
  {
    question: '한국은행 기준금리는 어디서 확인하나요?',
    answer:
      '한국은행 기준금리는 한국은행 공식 홈페이지(bok.or.kr)의 "금리" 섹션에서 실시간 확인할 수 있습니다. 분기마다 금융통화위원회 회의에서 결정되며, 이 계산기는 2026년 기준 3.5%를 기본값으로 설정했습니다.',
  },
  {
    question: '환산보증금은 왜 나오나요?',
    answer:
      '환산보증금 = 보증금 + (월세 × 100)은 공인중개사법 시행규칙 §20 ③에 따른 거래금액 계산 방식입니다. 중개수수료 계산, 서민금융진흥원 전세자금보증 신청, 금융기관 신용평가 등에 활용됩니다.',
  },
  {
    question: '반전세로 바꿀 때 세금에 영향이 있나요?',
    answer:
      '전세를 반전세(보증금 + 월세)로 변경하면 부동산세법상 양도소득세·종부세 등에 영향을 받을 수 있습니다. 특히 월세를 받으면 임대료 수입으로 종합소득세 대상이 될 수 있으니, 거래 전 세무전문가와 상담하시기 바랍니다.',
  },
] as const;

const RELATED = [
  { href: '/calculator/broker-fee', title: '중개수수료', description: '부동산 거래 비용' },
  { href: '/calculator/property-tax', title: '재산세', description: '연간 부과세' },
  { href: '/calculator/loan', title: '대출이자', description: '주담대·전세자금' },
];

export default function RentConversionPage() {
  const softwareLd = buildSoftwareApplicationJsonLd({
    name: '전월세 전환율 계산기',
    description:
      '주택임대차보호법 기준 전월세 전환율 계산. 전세↔월세 양방향 변환 및 법정 상한 자동 적용.',
    url: URL,
  });
  const webPageLd = buildWebPageJsonLd({
    name: '전월세 전환율 계산기 2026',
    description: '2026년 법정 상한 기준 전월세 전환율 계산기. 전세·월세·반전세 무료 변환 계산',
    url: URL,
    datePublished: '2026-04-24',
    dateModified: '2026-04-27',
    isPartOf: getCategoryUrlForCalculator('rent-conversion'),
  });
  const howToLd = buildHowToJsonLd({
    name: '전월세 전환율 계산기 사용 방법',
    description: '전세금과 기준금리를 입력하여 월세로 환산하는 단계별 가이드',
    steps: [
      { name: '전환 방향 선택', text: '전세→월세 또는 월세→전세 중 원하는 방향을 선택합니다.' },
      { name: '보증금·월세 입력', text: '현재 전세보증금 또는 월세 금액을 입력합니다.' },
      { name: '기준금리 설정', text: '한국은행 현재 기준금리를 확인하여 입력합니다(기본값 3.5%).' },
      { name: '법정 상한 자동 적용', text: '입력한 기준금리에 2%를 더한 값(상한 10%)이 자동 적용됩니다.' },
      { name: '환산액 및 환산보증금 확인', text: '월세 환산액, 환산보증금, 법정 상한액을 확인합니다.' },
    ],
  });
  const faqLd = buildFaqPageJsonLd(FAQ_ITEMS.map((f) => ({ question: f.question, answer: f.answer })));
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '부동산', url: 'https://calculatorhost.com/category/real-estate/' },
    { name: '전월세전환' },
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
                    { name: '전월세 전환' },
                  ]}
                />
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  전월세 전환율 계산기 2026
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  주택임대차보호법을 반영한 무료 전월세 전환율 계산기입니다. 전세를 월세로
                  전환하거나, 월세를 전세로 환산할 때 법정 상한(기준금리 + 2%p 또는 10% 중 낮은
                  값)을 자동으로 적용합니다.
                </p>
                <AuthorByline datePublished="2026-04-24" dateModified="2026-04-27" />
              </header>

              {/* GEO/AEO Structured Summary */}
              <StructuredSummary
                definition="전월세 전환율은 전세보증금을 월세로, 또는 월세를 전세로 환산할 때 적용되는 비율입니다(주택임대차보호법 §7의2). 이 비율은 한국은행 기준금리를 기초로 정해지며, 임대인이 일방적으로 강요할 수 없고 법정 상한 이내에서만 적용됩니다."
                table={{
                  caption: '법정 전월세 전환율 상한 예시 (2026)',
                  headers: ['기준금리 기준', '적용 상한'],
                  rows: [
                    ['기준금리 3.0%', '5.0% (3.0% + 2.0%p)'],
                    ['기준금리 3.5%', '5.5% (3.5% + 2.0%p)'],
                    ['기준금리 4.0%', '6.0% (4.0% + 2.0%p)'],
                    ['기준금리 5.0% 이상', '10.0% (연 상한)'],
                  ],
                }}
                tldr={[
                  '법정 상한 = min(기준금리 + 2%p, 10%)',
                  '임대인이 상한 초과 요구 시 분쟁조정위원회 조정 신청 가능',
                  '환산보증금 = 보증금 + (월세 × 100)',
                  '3 모드: 전세→월세, 월세→전세, 전환율 역산',
                ]}
              />

              <AdSlot slot="rent-conversion-top" format="horizontal" />

              {/* 계산기 */}
              <RentConversionCalculator />

              {/* FAQ (중간 배치 - GEO 권장) */}
              <FaqSection items={[...FAQ_ITEMS]} />

              {/* 보증금·월세 빠른 환산표 — 검색 의도 매칭 */}
              <section aria-label="보증금 월세 환산 빠른 조회" className="card">
                <h2 className="mb-3 text-2xl font-semibold">보증금 ↔ 월세 환산 빠른 조회 (전환율 5.5% 기준)</h2>
                <p className="mb-4 text-sm text-text-secondary">
                  2026년 기준금리 3.5% + 2%p = 법정 상한 5.5% 적용 시 흔한 보증금·월세 환산표.
                  실제 협상 시 정확한 계산은 위 계산기 사용.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <thead>
                      <tr className="bg-primary-500/10 border border-border-base">
                        <th className="px-3 py-2 text-right">전세보증금</th>
                        <th className="px-3 py-2 text-right">월세 환산 (5.5%)</th>
                        <th className="px-3 py-2 text-right">반전세 (보증금 50%)</th>
                        <th className="px-3 py-2 text-right">→ 잔여 월세</th>
                      </tr>
                    </thead>
                    <tbody className="text-text-secondary">
                      <tr className="border border-border-base">
                        <td className="px-3 py-2 text-right tabular-nums">1억</td>
                        <td className="px-3 py-2 text-right tabular-nums">약 458,000원</td>
                        <td className="px-3 py-2 text-right tabular-nums">5,000만</td>
                        <td className="px-3 py-2 text-right tabular-nums font-semibold text-primary-700 dark:text-primary-300">약 229,000원</td>
                      </tr>
                      <tr className="border border-border-base">
                        <td className="px-3 py-2 text-right tabular-nums">2억</td>
                        <td className="px-3 py-2 text-right tabular-nums">약 917,000원</td>
                        <td className="px-3 py-2 text-right tabular-nums">1억</td>
                        <td className="px-3 py-2 text-right tabular-nums font-semibold text-primary-700 dark:text-primary-300">약 458,000원</td>
                      </tr>
                      <tr className="border border-border-base">
                        <td className="px-3 py-2 text-right tabular-nums">3억</td>
                        <td className="px-3 py-2 text-right tabular-nums">약 1,375,000원</td>
                        <td className="px-3 py-2 text-right tabular-nums">1.5억</td>
                        <td className="px-3 py-2 text-right tabular-nums font-semibold text-primary-700 dark:text-primary-300">약 688,000원</td>
                      </tr>
                      <tr className="border border-border-base">
                        <td className="px-3 py-2 text-right tabular-nums">5억</td>
                        <td className="px-3 py-2 text-right tabular-nums">약 2,292,000원</td>
                        <td className="px-3 py-2 text-right tabular-nums">2.5억</td>
                        <td className="px-3 py-2 text-right tabular-nums font-semibold text-primary-700 dark:text-primary-300">약 1,146,000원</td>
                      </tr>
                      <tr className="border border-border-base">
                        <td className="px-3 py-2 text-right tabular-nums">7억</td>
                        <td className="px-3 py-2 text-right tabular-nums">약 3,208,000원</td>
                        <td className="px-3 py-2 text-right tabular-nums">3.5억</td>
                        <td className="px-3 py-2 text-right tabular-nums font-semibold text-primary-700 dark:text-primary-300">약 1,604,000원</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-3 text-xs text-text-tertiary">
                  공식: 월세 = 보증금 × 전환율 ÷ 12. 예: 1억 × 5.5% ÷ 12 = 458,333원/월.
                </p>
              </section>

              {/* 기준금리 변동 시나리오 */}
              <section aria-label="기준금리 변동 시나리오" className="card">
                <h2 className="mb-3 text-2xl font-semibold">기준금리 변동에 따른 전환율·월세 영향</h2>
                <p className="mb-4 text-sm text-text-secondary">
                  한국은행 기준금리 변동 시 법정 상한 전환율도 함께 변합니다 (기준금리 + 2%p).
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <thead>
                      <tr className="bg-primary-500/10 border border-border-base">
                        <th className="px-3 py-2 text-left">시기·기준금리</th>
                        <th className="px-3 py-2 text-right">법정 상한 전환율</th>
                        <th className="px-3 py-2 text-right">1억 → 월세</th>
                        <th className="px-3 py-2 text-right">3억 → 월세</th>
                      </tr>
                    </thead>
                    <tbody className="text-text-secondary">
                      <tr className="border border-border-base">
                        <td className="px-3 py-2">2020년 (0.5%)</td>
                        <td className="px-3 py-2 text-right">2.5%</td>
                        <td className="px-3 py-2 text-right tabular-nums">208,000원</td>
                        <td className="px-3 py-2 text-right tabular-nums">625,000원</td>
                      </tr>
                      <tr className="border border-border-base">
                        <td className="px-3 py-2">2022년 (3.0%)</td>
                        <td className="px-3 py-2 text-right">5.0%</td>
                        <td className="px-3 py-2 text-right tabular-nums">417,000원</td>
                        <td className="px-3 py-2 text-right tabular-nums">1,250,000원</td>
                      </tr>
                      <tr className="border border-border-base bg-primary-500/5">
                        <td className="px-3 py-2 font-semibold">2026년 (3.5%) ← 현재</td>
                        <td className="px-3 py-2 text-right font-semibold">5.5%</td>
                        <td className="px-3 py-2 text-right tabular-nums font-semibold">458,000원</td>
                        <td className="px-3 py-2 text-right tabular-nums font-semibold">1,375,000원</td>
                      </tr>
                      <tr className="border border-border-base">
                        <td className="px-3 py-2">금리 인하 시 (2.5% 가정)</td>
                        <td className="px-3 py-2 text-right">4.5%</td>
                        <td className="px-3 py-2 text-right tabular-nums">375,000원</td>
                        <td className="px-3 py-2 text-right tabular-nums">1,125,000원</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              {/* 전월세 전환율이란 */}
              <section aria-label="전월세 전환율 개념" className="card">
                <h2 className="mb-4 text-2xl font-semibold">전월세 전환율이란?</h2>
                <p className="mb-4 text-text-secondary">
                  전월세 전환율은 전세보증금을 월세로 전환하거나, 월세를 전세로 환산할 때
                  적용되는 비율입니다(주택임대차보호법 §7의2). 예를 들어 5억 원의 전세를
                  2억 원 보증금 + 월세의 반전세로 바꿀 때, 차액 3억 원에 전환율을 곱해
                  월세를 계산합니다.
                </p>
                <p className="mb-4 text-text-secondary">
                  전환율은 금리 수준을 반영하기 때문에 한국은행 기준금리를 기초로 정해집니다.
                  임대인이 임차인에게 일방적으로 높은 전환율을 강요할 수 없으며, 법정
                  상한(일반적으로 5%~10% 범위) 이내에서만 적용됩니다. 분쟁이 발생하면
                  주택임대차분쟁조정위원회에서 법정 상한에 따라 조정해줍니다.
                </p>
              </section>

              {/* 법정 상한 계산 공식 */}
              <section aria-label="법정 상한 계산" className="card">
                <h2 className="mb-4 text-2xl font-semibold">법정 상한 계산 공식</h2>
                <p className="mb-4 text-text-secondary">
                  주택임대차보호법 시행령 §9는 전월세 전환율의 상한을 다음과 같이 정하고
                  있습니다:
                </p>

                <div className="mb-6 overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-sm text-text-tertiary">
                      전월세 전환율 상한 계산
                    </caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="py-2 px-3 text-left font-semibold">
                          요소
                        </th>
                        <th scope="col" className="py-2 px-3 text-left font-semibold">
                          설명
                        </th>
                        <th scope="col" className="py-2 px-3 text-right font-semibold">
                          값
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-subtle">
                        <td className="py-2 px-3 font-medium">A. 기준금리</td>
                        <td className="py-2 px-3">한국은행 기준금리</td>
                        <td className="py-2 px-3 text-right">변동 (기본 3.5%)</td>
                      </tr>
                      <tr className="border-b border-border-subtle">
                        <td className="py-2 px-3 font-medium">B. 가산비율</td>
                        <td className="py-2 px-3">대통령령에 정한 비율</td>
                        <td className="py-2 px-3 text-right">+2.0%p</td>
                      </tr>
                      <tr className="border-b border-border-subtle">
                        <td className="py-2 px-3 font-medium">C. 한도 A</td>
                        <td className="py-2 px-3">A + B</td>
                        <td className="py-2 px-3 text-right">A + 2.0%</td>
                      </tr>
                      <tr className="border-b border-border-subtle">
                        <td className="py-2 px-3 font-medium">D. 한도 B</td>
                        <td className="py-2 px-3">연간 상한선</td>
                        <td className="py-2 px-3 text-right">10.0%</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-3 font-semibold text-primary-500">
                          적용 상한
                        </td>
                        <td className="py-2 px-3 font-semibold text-primary-500">
                          min(C, D)
                        </td>
                        <td className="py-2 px-3 text-right font-semibold text-primary-500">
                          낮은 값
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="rounded-lg border border-border-subtle bg-bg-raised p-4 text-sm">
                  <p className="mb-2">
                    <strong>법적 근거:</strong> 주택임대차보호법 §7의2, 주택임대차보호법
                    시행령 §9
                  </p>
                  <p>
                    <strong>계산 예시:</strong> 기준금리 3.5% → 상한 = min(3.5% + 2% = 5.5%, 10%)
                    = 5.5%. 따라서 전환율은 5.5% 이내에서만 적용됩니다.
                  </p>
                </div>
              </section>

              {/* 3가지 변환 모드 설명 */}
              <section aria-label="변환 모드 설명" className="card">
                <h2 className="mb-4 text-2xl font-semibold">3가지 변환 모드</h2>

                <h3 className="mb-3 text-lg font-semibold text-text-secondary">
                  A. 전세 → 월세 (가장 일반적)
                </h3>
                <p className="mb-4 text-text-secondary">
                  기존 전세보증금을 받던 임대인이, 임차인과 합의하여 보증금을 줄이고 월세를
                  받기로 전환할 때 사용합니다.
                </p>
                <div className="mb-6 rounded-lg border border-border-base bg-bg-raised p-4 font-mono text-sm">
                  월세 = (기존 전세 - 새 보증금) × 전환율 ÷ 12
                </div>
                <p className="mb-6 text-text-secondary">
                  <strong>예시:</strong> 전세 5억 원 → 보증금 2억 원 + 월세로 전환, 전환율
                  5.5% 적용 시, 월세 = (5억 - 2억) × 0.055 ÷ 12 = 약 137.5만 원
                </p>

                <h3 className="mb-3 text-lg font-semibold text-text-secondary">
                  B. 월세 → 전세 (환산)
                </h3>
                <p className="mb-4 text-text-secondary">
                  현재 내가 받거나 내고 있는 보증금과 월세를, 이를 모두 전세로 환산했을 때
                  그 가치가 얼마인지 계산할 때 사용합니다. 금융기관 신용평가나 세무상
                  평가에 활용될 수 있습니다.
                </p>
                <div className="mb-6 rounded-lg border border-border-base bg-bg-raised p-4 font-mono text-sm">
                  환산 전세 = 보증금 + (월세 × 12 ÷ 전환율)
                </div>
                <p className="mb-6 text-text-secondary">
                  <strong>예시:</strong> 보증금 1억 + 월세 50만 원, 전환율 5.5% 시, 환산 전세
                  = 1억 + (50만 × 12 ÷ 0.055) = 약 2억 909만 원
                </p>

                <h3 className="mb-3 text-lg font-semibold text-text-secondary">
                  C. 전환율 역산 (검증)
                </h3>
                <p className="mb-4 text-text-secondary">
                  계약서에 명시된 기존 전세보증금, 새 보증금, 월세로부터 실제로 적용된
                  전환율이 몇 %인지 역산하여 법정 상한을 초과하지 않는지 확인할 때
                  사용합니다.
                </p>
                <div className="mb-6 rounded-lg border border-border-base bg-bg-raised p-4 font-mono text-sm">
                  실제 전환율 (%) = (월세 × 12) ÷ (기존 전세 - 새 보증금) × 100
                </div>
                <p className="mb-6 text-text-secondary">
                  <strong>예시:</strong> 전세 5억, 보증금 2억, 월세 150만 원이면, 실제 전환율
                  = (150만 × 12) ÷ (5억 - 2억) × 100 = 6.0%. 법정 상한이 5.5%라면 초과입니다.
                </p>
              </section>

              {/* 환산보증금 설명 */}
              <section aria-label="환산보증금" className="card">
                <h2 className="mb-4 text-2xl font-semibold">환산보증금이란?</h2>
                <p className="mb-4 text-text-secondary">
                  환산보증금은 공인중개사법 시행규칙 §20 ③에 정의된 개념으로, 월세 거래의
                  거래금액을 계산할 때 사용됩니다:
                </p>

                <div className="mb-6 rounded-lg border border-border-base bg-bg-raised p-4 font-mono text-sm">
                  환산보증금 = 보증금 + (월세 × 100)
                </div>

                <p className="mb-4 text-text-secondary">
                  이 금액은 다음과 같은 용도로 활용됩니다:
                </p>
                <ul className="mb-6 list-disc space-y-2 pl-5 text-sm text-text-secondary">
                  <li>중개수수료 계산 기준</li>
                  <li>서민금융진흥원의 전세보증금·월세보증금 보증 신청</li>
                  <li>금융기관 신용대출 신청 시 담보가치 평가</li>
                  <li>국세청 부동산 거래신고 시 거래금액</li>
                  <li>부동산세 평가</li>
                </ul>

                <p className="text-text-secondary">
                  <strong>예시:</strong> 보증금 1,000만 원 + 월세 50만 원의 전월세 계약이면,
                  환산보증금 = 1,000만 + (50만 × 100) = 6,000만 원입니다. 이 금액으로
                  중개수수료를 계산하고 금융기관에 신고합니다.
                </p>
              </section>

              {/* 주의사항 */}
              <section aria-label="주의사항" className="card">
                <h2 className="mb-4 text-2xl font-semibold">주의사항</h2>
                <ul className="space-y-3 text-sm text-text-secondary">
                  <li>
                    <strong>법적 상한 위반 불가:</strong> 임대인이 법정 상한을 초과한 전환율을
                    강요할 수 없습니다(주택임대차보호법 §7의2). 계약서에 상한 초과율이 명시된
                    경우 분쟁조정위원회에 조정을 신청할 수 있습니다.
                  </li>
                  <li>
                    <strong>기준금리 변동:</strong> 한국은행 기준금리는 분기마다 변동됩니다.
                    계산기의 기본값(3.5%)은 2026년 기준이며, 최신 정보를 확인하고 고급
                    설정에서 수정하세요.
                  </li>
                  <li>
                    <strong>개별 계약 우선:</strong> 본 계산기는 법정 상한을 기준으로 한
                    결과이며, 실제 계약은 임대인과 임차인이 자유롭게 협의할 수 있습니다.
                    합의된 내용이 최우선입니다.
                  </li>
                  <li>
                    <strong>세금 영향:</strong> 전세를 월세로 전환하면 임대료 수입이 발생하여
                    종합소득세 대상이 될 수 있습니다. 세무 전문가와 상담하세요.
                  </li>
                  <li>
                    <strong>분쟁 시 조정:</strong> 전환율 분쟁이 발생하면 법원이 아닌 주택임대차분쟁조정위원회에서 조정받을 수 있습니다(주택임대차보호법
                    §32).
                  </li>
                </ul>
              </section>

              {/* 관련 계산기 */}
              <RelatedCalculators items={RELATED} />

              {/* 업데이트 로그 */}
              <section aria-label="업데이트" className="card">
                <h2 className="mb-2 text-lg font-semibold">업데이트</h2>
                <ul className="text-sm text-text-secondary">
                  <li>2026-04-24: 주택임대차보호법 기준 초판 공개</li>
                </ul>
              </section>

              {/* 출처·면책 */}
              <section
                aria-label="출처 및 면책"
                className="rounded-lg border border-border-base p-4 text-caption text-text-tertiary"
              >
                <p className="mb-2">
                  <strong>출처</strong>: 주택임대차보호법 §7의2, §32, 주택임대차보호법
                  시행령 §9, 한국은행 기준금리, 공인중개사법 시행규칙 §20.
                </p>
                <p>
                  본 계산기의 결과는 참고용이며 법적 효력이 없습니다. 법정 상한은 참고용이고,
                  실제 전환율은 임대인과 임차인의 협의로 결정됩니다. 전환율 분쟁 시
                  주택임대차분쟁조정위원회 조정을 신청하거나 법무사 상담을 권장합니다.
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
