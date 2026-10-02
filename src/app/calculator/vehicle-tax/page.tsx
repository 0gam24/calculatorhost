import { CalculatorPageContent } from '@/components/calculator/CalculatorPageContent';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { StructuredSummary } from '@/components/calculator/StructuredSummary';
import { FaqSection } from '@/components/calculator/FaqSection';
import { RelatedCalculators } from '@/components/calculator/RelatedCalculators';
import { RateBarChart } from '@/components/charts/RateBarChart';
import {
  buildSoftwareApplicationJsonLd,
  buildFaqPageJsonLd,
  buildBreadcrumbJsonLd,
  buildSpeakableJsonLd,
  buildWebPageJsonLd,
  getCategoryUrlForCalculator,
  buildHowToJsonLd,
} from '@/lib/seo/jsonld';
import { VehicleTaxCalculator } from './VehicleTaxCalculator';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { AuthorByline } from '@/components/calculator/AuthorByline';

const URL = 'https://calculatorhost.com/calculator/vehicle-tax/';

export const metadata: Metadata = {
  // 검색 의도 "자동차세 얼마" 직접 흡수 + 즉답 후크 + 연납 5% 구체 숫자.
  // 한글 33자 — Google SERP 모바일 안전 폭. "calculatorhost" 브랜드는 SERP 도메인으로 노출됨.
  title: '자동차세 얼마? 배기량별 즉시 계산 2026, 연납 5% 할인',
  // 의도 키워드("얼마") + 페르소나("내 차") + 구체 cc + 페이지 실제 산출 항목 + 신뢰 신호("무료/로그인 없음").
  description:
    '내 차 배기량(1600cc·2000cc·3000cc 등)만 입력하면 자동차세 + 지방교육세 즉시 산출. 2026년 연납 5% 할인·노후차 경감 자동 반영. 회원가입·로그인 없이 무료.',
  keywords: [
    '자동차세 계산기',
    '자동차세 얼마',
    '자동차세 금액',
    '자동차세금계산기',
    '1600cc 자동차세',
    '2000cc 자동차세',
    '3000cc 자동차세',
    '자동차세 연납',
    '2026 자동차세',
  ],
  alternates: { canonical: URL },
  openGraph: {
    title: '자동차세 얼마? 배기량별 즉시 계산 2026',
    description:
      '내 차 배기량만 입력 → 자동차세 + 지방교육세 즉시 산출. 연납 5% 할인·노후차 경감 자동.',
    url: URL,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '자동차세 얼마? 배기량별 즉시 계산 2026',
    description: '배기량 입력 → 자동차세·지방교육세 즉시 산출. 연납 5% 할인 자동 반영.',
  },
};

const FAQ_ITEMS: Array<{ question: string; answer: string }> = [
  {
    question: '자동차세는 언제 납부하나요?',
    answer:
      '자동차세는 통상 6월(상반기)과 12월(하반기)에 나누어 납부합니다. 이 계산기는 각 반기의 법정 차령을 반영한 예상액을 표시합니다. 2026년 1월 연납은 2~12월분에 법정 이자율 5%를 적용해 공제하며, 연세액 전체의 5% 공제가 아닙니다.',
  },
  {
    question: '연납 할인율은 얼마인가요?',
    answer:
      '지방세법 시행령 제125조제6항의 법정 이자율은 5%입니다. 2026년 1월 연납에서는 2~12월의 334일분에 적용하므로 334/365 × 5%, 연세액 대비 약 4.58%에 해당합니다. 최종 납부액은 자동차세와 지방교육세 각각의 10원 미만 끝수 처리를 반영하므로 실제 감소액은 고지서에서 확인하세요.',
  },
  {
    question: '노후차·경차는 감면되나요?',
    answer:
      '입력한 각 반기의 법정 차령에 따라 경감합니다. 차령 0~2년은 경감이 없고, 3년 이상은 5% × (차령 - 2), 최대 50%입니다. 하반기 차령이 1년 높으면 해당 옵션을 선택하세요. 기산일과 법정 차령은 고지서 등에서 확인해야 하며 등록일로 자동 추정하지 않습니다. 1000cc 이하에는 80원/cc 세율이 적용됩니다.',
  },
  {
    question: '영업용·승합·화물 차량은 어떻게 하나요?',
    answer:
      '본 계산기는 배기량에 따라 과세하는 비영업용 승용차의 일반 조건만 지원합니다. 영업용·승합·화물 차량이나 전기차 정액 과세는 계산하지 않으므로 관할 지방자치단체와 고지서에서 확인하세요.',
  },
  {
    question: '자동차세와 취득세 차이는?',
    answer:
      '자동차세는 매년 납부하는 세금이고, 취득세는 구매 시 한 번만 납부합니다. 과세표준 3,000만 원인 비영업용 승용차의 감면 전 취득세는 기본 세율 7%를 적용한 210만 원입니다. 이후 자동차세는 차종·용도·배기량 등에 따라 매년 냅니다.',
  },
  {
    question: '전기차·하이브리드 자동차세는 얼마인가요?',
    answer:
      '전기차·수소차는 배기량이 없어 "그 밖의 승용자동차"로 분류되어 비영업용 기준 연 13만 원(자동차세 10만 원 + 지방교육세 3만 원) 정액입니다(지방세법 §127①제3호). 정액 과세이므로 차령경감(노후차 할인)은 적용되지 않아 차령과 무관하게 매년 동일합니다. 반면 하이브리드(HEV·PHEV)는 내연기관 배기량이 있어 일반 승용차처럼 cc당 세율(§127①제1호)로 과세되고 차령경감도 적용됩니다.',
  },
  {
    question: '1600cc 자동차세는 얼마인가요?',
    answer:
      '비영업용 승용차 1600cc 의 2026년 연간 자동차세는 본세 약 224,000원 (140원/cc × 1,600cc) 입니다. 여기에 지방교육세 30%(67,200원)가 가산되어 총 약 291,200원입니다. 차령 3년 이상이면 연 5%씩 경감(최대 50%)됩니다.',
  },
  {
    question: '2000cc 자동차세는 얼마인가요?',
    answer:
      '비영업용 승용차 2000cc에 차령경감·일할 계산·별도 감면을 적용하지 않으면 연간 본세 400,000원(200원/cc × 2,000cc), 지방교육세 120,000원으로 합계 520,000원입니다. 2026년 1월 연납은 2~12월의 334/365에 법정 이자율 5%를 적용한 약 4.58% 공제와 최종 끝수 처리를 반영합니다.',
  },
  {
    question: '2400cc 자동차세는 얼마인가요?',
    answer:
      '비영업용 승용차 2400cc에 표준세율을 적용하고 차령경감·연납 할인·일할 계산·별도 감면을 제외하면 연간 본세 480,000원(2,400cc × 200원), 지방교육세 144,000원(본세의 30%), 합계 624,000원입니다. 각 반기의 법정 차령이 3년 이상이면 차령경감에 따라 달라집니다.',
  },
  {
    question: '3000cc 자동차세는 얼마인가요?',
    answer:
      '비영업용 승용차 3000cc에 차령경감·일할 계산·별도 감면을 적용하지 않으면 연간 본세 600,000원(200원/cc × 3,000cc), 지방교육세 포함 총 780,000원입니다. 1월 연납액은 2~12월분의 5% 공제와 최종 끝수 처리를 반영하여 계산합니다. 연세액 전체의 5%를 빼는 계산은 아닙니다.',
  },
  {
    question: '배기량별 자동차세 cc당 세율은?',
    answer:
      '비영업용 승용차 기준 2026년 cc당 세율: 1,000cc 이하 80원/cc (경차), 1,600cc 이하 140원/cc, 1,600cc 초과 200원/cc. 영업용 승용차는 별도(18~24원/cc) 세율이 적용됩니다.',
  },
];

const RELATED: Array<{ href: string; title: string; description: string }> = [
  {
    href: '/guide/vehicle-acquisition-tax-2026/',
    title: '자동차 취득세 안내',
    description: '자동차 구매 시 세율·감면 확인',
  },
  {
    href: '/guide/electric-vehicle-tax-2026/',
    title: '전기차 자동차세 가이드',
    description: '정액 13만 원·§127①제3호',
  },
  {
    href: '/guide/vehicle-tax-2026/',
    title: '자동차세 2026 종합 가이드',
    description: '세율·차령경감·연납 총정리',
  },
];

export default function VehicleTaxPage() {
  const softwareLd = buildSoftwareApplicationJsonLd({
    name: '자동차세 계산기',
    description:
      '배기량과 각 반기의 법정 차령으로 비영업용 승용차 일반 조건의 2026년 자동차세·지방교육세와 1월 연납 예상액을 계산합니다.',
    url: URL,
  });
  const webPageLd = buildWebPageJsonLd({
    name: '자동차세 계산기 2026',
    description: '배기량과 각 반기의 법정 차령으로 자동차세 예상액을 확인하세요',
    url: URL,
    datePublished: '2026-04-24',
    dateModified: '2026-06-18',
    isPartOf: getCategoryUrlForCalculator('vehicle-tax'),
  });
  const howToLd = buildHowToJsonLd({
    name: '자동차세 계산기 사용 방법',
    description: '배기량과 각 반기의 법정 차령을 입력하여 2026년 자동차세 예상액을 확인하는 방법',
    steps: [
      { name: '배기량 입력', text: '자동차의 배기량(cc)을 입력합니다(예: 2000cc).' },
      { name: '지원 조건 확인', text: '배기량으로 과세하는 비영업용 승용차의 일반 조건인지 확인합니다.' },
      {
        name: '반기 차령 입력',
        text: '고지서 등에서 확인한 상반기 법정 차령을 입력하고, 하반기 차령이 1년 높으면 해당 옵션을 선택합니다. 등록일로 자동 추정하지 않습니다.',
      },
      {
        name: '납부 방식 선택',
        text: '반기별 납부(6월, 12월) 또는 연납 할인(1월 일괄) 중 선택합니다.',
      },
      { name: '자동차세 결과 확인', text: '연간 자동차세, 지방교육세, 최종 납부액을 확인합니다.' },
    ],
  });
  const faqLd = buildFaqPageJsonLd(
    FAQ_ITEMS.map((f) => ({ question: f.question, answer: f.answer })),
  );
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '생활', url: 'https://calculatorhost.com/category/lifestyle/' },
    { name: '자동차세 계산기' },
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
                      { name: '세금', href: '/category/tax/' },
                      { name: '자동차세' },
                    ]}
                  />
                  <h1 className="mb-3 text-4xl font-bold tracking-tight">
                    자동차세 얼마? 배기량별 즉시 계산 2026
                  </h1>
                  <p className="text-lg text-text-secondary" data-speakable>
                    차량 종류와 배기량으로 예상 자동차세를 확인하세요.
                  </p>
                  <AuthorByline datePublished="2026-04-24" dateModified="2026-06-18" />
                </header>
              }
              calculator={<VehicleTaxCalculator />}
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
                definition="자동차세는 자동차 등록 후 매년 납부하는 지방세입니다. 배기량(cc)에 따라 3가지 세율 구간이 있고, 차령에 따라 3년 차부터 최대 50% 경감됩니다."
                table={{
                  caption: '자동차세 기본 정보',
                  headers: ['항목', '내용'],
                  rows: [
                    ['1000cc 이하', '80원/cc'],
                    ['1000~1600cc', '140원/cc'],
                    ['1600cc 초과', '200원/cc'],
                    ['차령경감', '각 반기 차령 3년 이상: 5% × (차령 - 2), 최대 50%'],
                    ['지방교육세', '자동차세의 30%'],
                    ['1월 연납', '2026년 334/365 × 5% ≒ 4.58% 공제'],
                  ],
                }}
                tldr={[
                  '배기량 과세 비영업용 승용차의 일반 조건만 지원',
                  '상·하반기 법정 차령을 각각 확인해 경감 반영',
                  '차령 0~2년 경감 없음·최대 경감률 50%',
                  '2026년 1월 연납 실효 공제율 약 4.58%',
                  '연간 참고액과 반기 합계는 끝수 처리로 차이 가능',
                ]}
              />
              <RateBarChart
                title="자동차세 배기량별 cc당 세율, 비영업용 승용차 (지방세법 §127)"
                caption="비영업용 승용차 자동차세는 배기량 구간별로 cc당 세율이 정해집니다. 1,000cc 이하 경차는 80원/cc, 1,600cc 이하 140원/cc, 1,600cc 초과는 200원/cc입니다. 여기에 지방교육세 30%가 더해지고, 차령 3년차부터 매년 5%씩(최대 50%) 경감됩니다."
                unit="원/cc"
                max={220}
                bars={[
                  { label: '1,000cc 이하', value: 80, display: '80원/cc' },
                  { label: '1,001~1,600cc', value: 140, display: '140원/cc' },
                  { label: '1,601cc 이상', value: 200, display: '200원/cc', highlight: true },
                ]}
              />
              <section className="space-y-4" aria-label="자동차세 개념">
                <h2 className="text-2xl font-bold text-text-primary">자동차세란 무엇인가요?</h2>
                <p className="leading-relaxed text-text-secondary">
                  자동차세는 자동차를 보유하고 있는 소유자가 매년 납부하는 지방세입니다. 이는 자동차
                  구매 시 일회성으로 내는 취득세·등록세와는 다르며, 자동차 등록 후 6월(상반기)과
                  12월(하반기) 두 차례에 나누어 납부하거나, 1월에 일괄 납부하여 할인을 받을 수
                  있습니다.
                </p>
                <p className="leading-relaxed text-text-secondary">
                  자동차세의 크기는 주로 엔진 배기량(cc)에 의해 결정됩니다. 배기량이 클수록 높은
                  세율이 적용됩니다. 또한 차량을 오래 보유할수록 차령경감에 따라 세금이 할인되므로,
                  같은 차량 배기량이라도 연식이 올수록 납부할 세금이 줄어듭니다.
                </p>
              </section>
              <section className="space-y-4" aria-label="자동차세 세율표">
                <h2 className="text-2xl font-bold text-text-primary">자동차세 세율표 (2026)</h2>
                <p className="text-sm text-text-secondary">비영업용 승용차 기준 (지방세법 §127)</p>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse text-sm">
                    <thead>
                      <tr className="border border-border-base bg-primary-500/10">
                        <th className="px-4 py-3 text-left font-bold text-text-primary">배기량</th>
                        <th className="px-4 py-3 text-right font-bold text-text-primary">
                          cc당 세율
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="hover:bg-bg-card/50 border border-border-base">
                        <td className="px-4 py-2 text-text-secondary">1000cc 이하 (경차)</td>
                        <td className="px-4 py-2 text-right font-semibold text-text-primary">
                          80원
                        </td>
                      </tr>
                      <tr className="hover:bg-bg-card/50 border border-border-base">
                        <td className="px-4 py-2 text-text-secondary">1000cc 초과 ~ 1600cc</td>
                        <td className="px-4 py-2 text-right font-semibold text-text-primary">
                          140원
                        </td>
                      </tr>
                      <tr className="hover:bg-bg-card/50 border border-border-base">
                        <td className="px-4 py-2 text-text-secondary">1600cc 초과</td>
                        <td className="px-4 py-2 text-right font-semibold text-text-primary">
                          200원
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>
              <section className="space-y-4" aria-label="배기량별 자동차세 빠른 조회">
                <h2 className="text-2xl font-bold text-text-primary">
                  cc별 자동차세 빠른 조회 (신차 기준)
                </h2>
                <p className="text-sm text-text-secondary">
                  비영업용 승용차에 표준세율을 적용한 연간 자동차세입니다. 차령경감·연납 할인·일할
                  계산·별도 감면은 제외하고, 지방교육세 30%를 포함합니다. 실제 고지액은 과세 조건에
                  따라 달라질 수 있습니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse text-sm">
                    <thead>
                      <tr className="border border-border-base bg-primary-500/10">
                        <th className="px-4 py-3 text-left font-bold text-text-primary">
                          대표 차종
                        </th>
                        <th className="px-4 py-3 text-right font-bold text-text-primary">배기량</th>
                        <th className="px-4 py-3 text-right font-bold text-text-primary">
                          본세 (cc×세율)
                        </th>
                        <th className="px-4 py-3 text-right font-bold text-text-primary">
                          + 교육세 30%
                        </th>
                        <th className="px-4 py-3 text-right font-bold text-text-primary">
                          연 합계
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="hover:bg-bg-card/50 border border-border-base">
                        <td className="px-4 py-2 text-text-secondary">경차 (모닝·스파크)</td>
                        <td className="px-4 py-2 text-right tabular-nums">1000cc</td>
                        <td className="px-4 py-2 text-right tabular-nums">80,000원</td>
                        <td className="px-4 py-2 text-right tabular-nums">+24,000원</td>
                        <td className="px-4 py-2 text-right font-bold tabular-nums text-primary-700 dark:text-primary-300">
                          104,000원
                        </td>
                      </tr>
                      <tr className="hover:bg-bg-card/50 border border-border-base">
                        <td className="px-4 py-2 text-text-secondary">아반떼·니로</td>
                        <td className="px-4 py-2 text-right tabular-nums">1600cc</td>
                        <td className="px-4 py-2 text-right tabular-nums">224,000원</td>
                        <td className="px-4 py-2 text-right tabular-nums">+67,200원</td>
                        <td className="px-4 py-2 text-right font-bold tabular-nums text-primary-700 dark:text-primary-300">
                          291,200원
                        </td>
                      </tr>
                      <tr className="hover:bg-bg-card/50 border border-border-base">
                        <td className="px-4 py-2 text-text-secondary">쏘나타·K5</td>
                        <td className="px-4 py-2 text-right tabular-nums">2000cc</td>
                        <td className="px-4 py-2 text-right tabular-nums">400,000원</td>
                        <td className="px-4 py-2 text-right tabular-nums">+120,000원</td>
                        <td className="px-4 py-2 text-right font-bold tabular-nums text-primary-700 dark:text-primary-300">
                          520,000원
                        </td>
                      </tr>
                      <tr className="hover:bg-bg-card/50 border border-border-base">
                        <td className="px-4 py-2 text-text-secondary">2.4L 승용차</td>
                        <td className="px-4 py-2 text-right tabular-nums">2400cc</td>
                        <td className="px-4 py-2 text-right tabular-nums">480,000원</td>
                        <td className="px-4 py-2 text-right tabular-nums">+144,000원</td>
                        <td className="px-4 py-2 text-right font-bold tabular-nums text-primary-700 dark:text-primary-300">
                          624,000원
                        </td>
                      </tr>
                      <tr className="hover:bg-bg-card/50 border border-border-base">
                        <td className="px-4 py-2 text-text-secondary">그랜저·K8</td>
                        <td className="px-4 py-2 text-right tabular-nums">2500cc</td>
                        <td className="px-4 py-2 text-right tabular-nums">500,000원</td>
                        <td className="px-4 py-2 text-right tabular-nums">+150,000원</td>
                        <td className="px-4 py-2 text-right font-bold tabular-nums text-primary-700 dark:text-primary-300">
                          650,000원
                        </td>
                      </tr>
                      <tr className="hover:bg-bg-card/50 border border-border-base">
                        <td className="px-4 py-2 text-text-secondary">제네시스 G80·카니발</td>
                        <td className="px-4 py-2 text-right tabular-nums">3000cc</td>
                        <td className="px-4 py-2 text-right tabular-nums">600,000원</td>
                        <td className="px-4 py-2 text-right tabular-nums">+180,000원</td>
                        <td className="px-4 py-2 text-right font-bold tabular-nums text-primary-700 dark:text-primary-300">
                          780,000원
                        </td>
                      </tr>
                      <tr className="hover:bg-bg-card/50 border border-border-base">
                        <td className="px-4 py-2 text-text-secondary">제네시스 GV80·G90</td>
                        <td className="px-4 py-2 text-right tabular-nums">3500cc</td>
                        <td className="px-4 py-2 text-right tabular-nums">700,000원</td>
                        <td className="px-4 py-2 text-right tabular-nums">+210,000원</td>
                        <td className="px-4 py-2 text-right font-bold tabular-nums text-primary-700 dark:text-primary-300">
                          910,000원
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-sm text-text-secondary">
                  2400cc 예시: 2,400 × 200원 = 본세 480,000원, 본세 × 30% = 지방교육세
                  144,000원으로 합계 624,000원입니다. 배기량별 표준세율과 차령경감은{' '}
                  <a href="https://law.go.kr/lsLinkCommonInfo.do?chrClsCd=010202&lsJoLnkSeq=1021848893" target="_blank" rel="noopener noreferrer" className="underline">지방세법 제127·128조</a>, 지방교육세는{' '}
                  <a href="https://law.go.kr/lsLinkCommonInfo.do?chrClsCd=010202&lsJoLnkSeq=1026499929" target="_blank" rel="noopener noreferrer" className="underline">제151조</a>를 따릅니다. 차령은{' '}
                  <a href="https://law.go.kr/LSW/lsLinkCommonInfo.do?chrClsCd=010202&lspttninfSeq=120290" target="_blank" rel="noopener noreferrer" className="underline">시행령 제122조</a>에 따라 기산일과 과세 반기로 확인합니다.
                </p>
                <div className="rounded-lg bg-bg-raised p-4 text-sm">
                  <p className="mb-2 font-semibold text-text-primary">경계값 주의</p>
                  <ul className="space-y-1 text-text-secondary">
                    <li>
                      • <strong>1000cc 정확</strong>: 80원/cc 적용 (1001cc부터 140원/cc)
                    </li>
                    <li>
                      • <strong>1600cc 정확</strong>: 140원/cc 적용 (1601cc부터 200원/cc), 1cc
                      차이로 약 9만 원 차이
                    </li>
                    <li>
                      • 2026년 1월 연납은 2~12월분에 5%를 적용해 연세액 대비 약 4.58%를 공제합니다.
                      최종 납부액은 각 세목의 10원 미만 끝수 처리를 반영합니다.
                    </li>
                  </ul>
                </div>
              </section>
              <section className="space-y-4" aria-label="자동차 취득세">
                <h2 className="text-2xl font-bold text-text-primary">
                  자동차 취득세는 얼마인가요? (매년 내는 자동차세와 별도)
                </h2>
                <p className="text-text-secondary" data-speakable>
                  비영업용 승용차의 취득세 기본 세율은 7%입니다(
                  <a
                    href="https://www.law.go.kr/LSW/lsSideInfoP.do?docCls=jo&joBrNo=00&joNo=0012&lsiSeq=282559&urlMode=lsScJoRltInfoR"
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="text-primary-600 underline dark:text-primary-500"
                  >
                    지방세법 제12조, 2026년 1월 1일 시행
                  </a>
                  ). 예를 들어 과세표준
                  3,000만 원 승용차는 감면 전 취득세가 210만 원입니다. 법령상 경자동차와 영업용
                  자동차의 기본 세율은 4%입니다. 비영업용 승합·화물차 등은 5%, 법령상 해당
                  이륜자동차는 2% 등 차종별 세율이 다릅니다.
                  취득세는 차를 살 때 등록하며 한 번만 내고, 이 페이지의 자동차세는 보유하는 동안
                  매년 냅니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse text-sm">
                    <caption className="mb-2 text-left text-xs text-text-secondary">
                      표. 자동차 취득세 기본 세율 예시 (지방세법 §12, 2026년 1월 1일 시행, 감면 제외)
                    </caption>
                    <thead>
                      <tr className="border border-border-base bg-primary-500/10">
                        <th scope="col" className="px-4 py-3 text-left font-bold text-text-primary">
                          구분
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-3 text-right font-bold text-text-primary"
                        >
                          취득세율
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-3 text-right font-bold text-text-primary"
                        >
                          예: 과세표준 3,000만 원 (감면 전)
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border border-border-base">
                        <td className="px-4 py-2">비영업용 승용차</td>
                        <td className="px-4 py-2 text-right tabular-nums">
                          <strong>7%</strong>
                        </td>
                        <td className="px-4 py-2 text-right tabular-nums">210만 원</td>
                      </tr>
                      <tr className="bg-bg-card/50 border border-border-base">
                        <td className="px-4 py-2">경자동차 (법령상 경차 요건 충족)</td>
                        <td className="px-4 py-2 text-right tabular-nums">
                          <strong>4%</strong>
                        </td>
                        <td className="px-4 py-2 text-right tabular-nums">120만 원</td>
                      </tr>
                      <tr className="border border-border-base">
                        <td className="px-4 py-2">영업용 승용차</td>
                        <td className="px-4 py-2 text-right tabular-nums">
                          <strong>4%</strong>
                        </td>
                        <td className="px-4 py-2 text-right tabular-nums">120만 원</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-sm text-text-secondary">
                  위 표와 예시는 차량 과세표준에 기본 세율을 적용한 감면 전 금액입니다.
                  친환경차·경차·다자녀·장애인 감면 요건이 있을 수 있으며, 차량의 과세표준과
                  감면 적용은 관할 지방자치단체에서 확인하세요. 정확한
                  취득세와 감면은{' '}
                  <Link
                    href="/guide/vehicle-acquisition-tax-2026/"
                    className="font-medium text-primary-500 hover:underline"
                  >
                    자동차 취득세 계산 가이드(승용 7%·경차 4%)
                  </Link>
                  에서 확인하세요.
                </p>
              </section>
              <section className="space-y-4" aria-label="차령 경감률">
                <h2 className="text-2xl font-bold text-text-primary">차령경감률 (노후차 할인)</h2>
                <p className="text-sm text-text-secondary">
                  각 반기의 법정 차령이 3년 이상이면 5% × (차령 - 2), 최대 50%입니다
                  (지방세법 §127①제2호). 0~2년은 경감하지 않습니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse text-sm">
                    <thead>
                      <tr className="border border-border-base bg-secondary-500/10">
                        <th className="px-4 py-3 text-left font-bold text-text-primary">
                          차령(년)
                        </th>
                        <th className="px-4 py-3 text-right font-bold text-text-primary">경감률</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[0, 1, 2, 3, 4, 5, 10, 12].map((year) => {
                        let rate = 0;
                        if (year >= 3) {
                          rate = Math.min((year - 2) * 5, 50);
                        }
                        return (
                          <tr key={year} className="hover:bg-bg-card/50 border border-border-base">
                            <td className="px-4 py-2 text-text-secondary">{year}년</td>
                            <td className="px-4 py-2 text-right font-semibold text-text-primary">
                              {rate}%
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </section>
              <section className="space-y-4" aria-label="지방교육세">
                <h2 className="text-2xl font-bold text-text-primary">지방교육세</h2>
                <p className="leading-relaxed text-text-secondary">
                  지방교육세는 자동차세의 30%에 해당하는 금액입니다. 자동차세와 함께 납부되며, 교육
                  예산 지원을 위해 사용됩니다 (지방세법 §151). 예를 들어 자동차세가 400,000원이면
                  지방교육세는 120,000원이 되어, 총 520,000원을 연간 납부하게 됩니다.
                </p>
              </section>
              <section className="space-y-4" aria-label="연납 할인">
                <h2 className="text-2xl font-bold text-text-primary">연납 할인 (1월 일괄 납부)</h2>
                <p className="leading-relaxed text-text-secondary">
                  법정 이자율 5%는 연세액 전체에 적용하는 할인율이 아닙니다. 2026년 1월 연납은
                  2~12월의 334일분에 적용하므로 334/365 × 5%, 연세액 대비 약 4.58%를 공제합니다.
                  공제액부터 끝수를 버리는 것이 아니라 공제 후 자동차세와 지방교육세 각각의
                  최종 납부액에서 10원 미만 끝수를 처리합니다. 연간 참고액과 반기별 납부액 합계도
                  끝수 처리 때문에 차이가 날 수 있습니다. 근거는{' '}
                  <a
                    href="https://law.go.kr/LSW/lsSideInfoP.do?docCls=jo&joBrNo=00&joNo=0125&lsiSeq=290815&urlMode=lsScJoRltInfoR"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline"
                  >
                    지방세법 시행령 제125조제6항
                  </a>
                  입니다.
                </p>
                <p className="text-sm text-text-secondary">
                  연 본세 10만 원 이하 차량의 정기 일괄납부 특례(추가 공제·고지 일정)는 반영하지
                  않습니다. 표시액은 예상액이며 실제 고지액·납부기한·횟수는 고지서에서 확인하세요.
                </p>
              </section>
              <section
                className="space-y-3 rounded-lg border border-highlight-500/30 bg-highlight-500/5 p-6"
                aria-label="주의사항"
              >
                <h2 className="text-xl font-bold text-text-primary">주의사항</h2>
                <ul className="space-y-2 text-sm text-text-secondary">
                  <li>
                    • <strong>영업용·승합·화물 차량</strong>: 본 계산기는 비영업용 승용차만
                    지원합니다. 다른 용도 차량은 세율이 다르므로 관할 지방자치단체에서 확인하세요.
                  </li>
                  <li>
                    • <strong>전기차·하이브리드</strong>: 친환경 차량에는 별도의 감면 제도가
                    있을 수 있습니다. 전기차 정액 과세와 별도 감면은 이 화면에서 계산하지 않으므로
                    고지서와 관할 지방자치단체에서 확인하세요.
                  </li>
                  <li>
                    • <strong>특수 용도</strong>: 영농용·임업용·비상 운송용 등 특수 용도 차량도 감면
                    대상이 될 수 있습니다.
                  </li>
                  <li>
                    • <strong>지원 범위</strong>: 신규 등록·말소·이전의 일할 계산, 별도 감면과 조례,
                    영업용·전기차 정액 과세 특례는 지원하지 않습니다. 법정 기산일이나 등록일로
                    차령을 자동 추정하지 않습니다.
                  </li>
                  <li>
                    • 연 본세 10만 원 이하 정기 일괄납부 특례의 추가 공제·고지 일정은 반영하지
                    않습니다. 실제 고지액·납부기한·횟수는 고지서에서 확인하세요.
                  </li>
                </ul>
              </section>
              <section
                className="space-y-4 rounded-lg border border-primary-500/30 bg-primary-500/5 p-6"
                aria-label="자동차세 절세 팁"
              >
                <h2 className="text-2xl font-bold text-text-primary">자동차세 절세 팁</h2>
                <ul className="space-y-3 text-text-secondary">
                  <li>
                    <strong>1. 연납 확인</strong>: 2026년 1월 연납은 334/365 × 5%, 약 4.58%
                    공제와 최종 납부액의 끝수 처리를 반영합니다.
                  </li>
                  <li>
                    <strong>2. 차령경감 확인</strong>: 3년 차 이상 자동으로 경감되지만, 정기적으로
                    세액 확인
                  </li>
                  <li>
                    <strong>3. 별도 감면 확인</strong>: 적용 대상과 요건은 관할 지방자치단체에서 확인
                  </li>
                  <li>
                    <strong>4. 배기량 고려</strong>: 신차 구매 시 배기량 선택 시 향후 자동차세 부담
                    차이 검토
                  </li>
                </ul>
              </section>
              <section className="border-t border-border-base pt-6 text-xs text-text-secondary">
                <p>
                  업데이트: 2026-06-18, 전기차·수소차 정액 자동차세(연 13만 원, §127①제3호) FAQ
                  보강, 법적 근거 §137→§127①제2호 정정 (지방세법 §127·§128·§151·시행령 §125 기준)
                </p>
              </section>
              <section
                className="space-y-3 rounded-lg border border-border-base bg-bg-card p-6"
                aria-label="면책조항"
              >
                <h3 className="text-sm font-bold text-text-primary">면책조항</h3>
                <p className="text-xs leading-relaxed text-text-secondary">
                  본 계산기는 참고 목적으로만 제공되며, 실제 자동차세는 고지서와 관할
                  지방자치단체에서 확인해야 합니다. 세율 변경, 개인별 감면 사항, 영업용·특수 용도 차량
                  등에 따라 실제 납부액이 상이할 수 있습니다.
                </p>
                <p className="mt-2 text-xs text-text-secondary">
                  <strong>법적 근거</strong>: 지방세법 제127조(세율·차령경감 제127조제1항제2호),
                  제128조(납기·징수), 제151조(지방교육세), 시행령 제125조(연납)
                </p>
              </section>
            </CalculatorPageContent>
          </main>
        </div>
      </div>

      <Footer />
    </>
  );
}
