import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { Footer } from '@/components/layout/Footer';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { AdSlot } from '@/components/ads/AdSlot';
import { FaqSection } from '@/components/calculator/FaqSection';
import { ShareButtons } from '@/components/calculator/ShareButtons';
import {
  buildBreadcrumbJsonLd,
  buildArticleJsonLd,
  buildWebPageJsonLd,
  buildFaqPageJsonLd,
  buildSpeakableJsonLd,
} from '@/lib/seo/jsonld';

const URL = 'https://calculatorhost.com/guide/vehicle-individual-consumption-tax-deadline-2026-june/';
const DATE_PUBLISHED = '2026-06-01';
const DATE_MODIFIED = '2026-06-01';

export const metadata: Metadata = {
  title: '자동차 개별소비세 인하 6월 30일 마감 — 출고 기준 143만원 절감 가이드 | calculatorhost',
  description:
    '자동차 개별소비세 인하(5% → 3.5%)는 2026년 6월 30일 종료. 최대 143만원 절감하려면 6월 30일 이전 출고 필수. 계약일이 아닌 출고일이 기준. 마감 1개월 남은 지금 꼭 확인해야 할 사항.',
  keywords: [
    '자동차 개별소비세 인하',
    '개별소비세 6월 30일',
    '자동차 세금 절감',
    '개소세 출고 기준',
    '6월 신차 구매',
    '143만원 절감',
    '개별소비세 인하 종료',
    '자동차 구매 마감',
  ],
  alternates: { canonical: URL },
  openGraph: {
    title: '자동차 개별소비세 인하 6월 30일 마감 — 143만원 절감하는 방법',
    description: '개별소비세 5% → 3.5% 인하, 최대 143만원 절감. 기준은 계약일 아닌 출고일. 마감 D-30 필수 가이드.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '자동차 개별소비세 인하 6월 30일 마감',
    description: '최대 143만원 절감, 6월 30일 이전 출고 필수. 계약일 아닌 출고일 기준.',
  },
};

const FAQ_ITEMS = [
  {
    question: '지금 계약하면 6월 30일까지 개별소비세 인하 받을 수 있나요?',
    answer:
      '기준은 계약일이 아니라 출고일입니다. 지금 계약하고 6월 30일 이전에 출고받으면 개별소비세 인하(5% → 3.5%)를 적용받습니다. 다만 제조·공급 지연이 발생할 수 있으므로, 딜러와 6월 내 출고 가능성을 반드시 확인해야 합니다.',
  },
  {
    question: '개별소비세 감면 143만원은 어떻게 계산되나요?',
    answer:
      '개별소비세를 5%에서 3.5%로 인하하면 기본 세율 차이(1.5%)로 최대 100만원을 절감합니다. 개별소비세와 연동되는 교육세(개소세의 30%)에서 약 30만원, 부가가치세(개소세+교육세의 10%)에서 약 13만원이 추가 절감되어 합계 143만원이 됩니다. 다만 이는 최대값이며, 실제 절감액은 차량 구매가에 따라 달라집니다.',
  },
  {
    question: '7월 1일부터 개별소비세가 정상세율 5%로 돌아가나요?',
    answer:
      '2026년 6월 30일 자정(00:00)을 기준으로 정책이 종료됩니다. 따라서 7월 1일 이후 출고된 차량은 개별소비세 5% 정상세율이 적용됩니다. 6월 30일과 7월 1일 출고의 차이로 최대 143만원이 달라지므로 매우 중요합니다.',
  },
  {
    question: '계약은 6월 1일, 출고는 7월 15일이면 인하 혜택이 안 되나요?',
    answer:
      '정확히 말하면, 출고일이 7월 15일이면 개별소비세 인하 혜택을 받을 수 없습니다. 개별소비세 적용은 계약일이나 인도일이 아닌 차량이 공장에서 출고되는 "출고일"을 기준으로 결정됩니다. 따라서 6월 30일 이전 출고 가능 여부를 꼭 확인하세요.',
  },
  {
    question: '중고차 구매도 개별소비세 인하 대상인가요?',
    answer:
      '개별소비세 인하는 신차 등록에만 적용됩니다. 중고차 거래 시에는 이 정책의 대상이 아니므로 일반 취득세 기준을 따릅니다. 신차 구매를 검토 중이라면 6월 30일 출고 마감을 염두에 두세요.',
  },
  {
    question: '딜러에게 출고 가능 여부를 어떻게 확인하나요?',
    answer:
      '방문 또는 전화로 다음을 직접 문의하세요: ① 현재 주문한 차량의 제조 상황(생산 완료 여부), ② 6월 30일까지 출고 가능 여부, ③ 만약 불가능하면 즉시 취소·환불 절차. 딜러 담당자가 명확한 답변을 줄 때까지 계약을 진행하지 않는 것이 안전합니다.',
  },
  {
    question: '개별소비세는 언제 내나요?',
    answer:
      '개별소비세는 신차를 등록할 때 같은 시점에 납부합니다. 자동차 구매자가 딜러를 통해 또는 직접 관할 지방청에 신차등록을 신청할 때, 취득세·등록세·개별소비세가 일괄 고지됩니다. 딜러가 대행해주는 경우도 많으므로 계약 시 어떤 방식인지 미리 확인하세요.',
  },
  {
    question: '2026년 7월 이후 정책이 재연장될 가능성은?',
    answer:
      '현재 정부 방침상 6월 30일을 최종 기한으로 정했으며, 추가 연장 계획은 공식 발표되지 않았습니다. 다만 경제 상황에 따라 변수가 있을 수 있으므로, 정부 공식 발표를 지속적으로 확인하는 것이 좋습니다. 확실한 혜택을 받으려면 6월 30일 이전 출고를 목표로 하세요.',
  },
] as const;

export default function VehicleIndividualConsumptionTaxDeadlinePage() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '자동차 개별소비세 6월 30일 마감' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '자동차 개별소비세 인하 6월 30일 마감 — 최대 143만원 절감 가이드',
    description:
      '개별소비세 인하(5% → 3.5%)는 2026년 6월 30일 종료. 기준은 계약일이 아닌 출고일. 최대 143만원 절감하는 방법과 주의사항.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['자동차 개별소비세', '6월 30일', '143만원 절감', '출고 기준'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '자동차 개별소비세 인하 6월 30일 마감 — 143만원 절감하는 방법',
    description:
      '2026년 자동차 개별소비세 인하 정책 종료 D-30. 계약일이 아닌 출고일 기준으로 6월 30일까지만 5% → 3.5% 인하 적용. 최대 143만원 절감하려면 지금 바로 확인하세요.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
  });
  const faqLd = buildFaqPageJsonLd([...FAQ_ITEMS]);
  const speakableLd = buildSpeakableJsonLd(['[data-speakable]']);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
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
                    { name: '가이드', href: '/guide/' },
                    { name: '자동차 개별소비세 6월 30일 마감' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">세금·자동차 · 6분 읽기 · 2026-06-01</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  자동차 개별소비세 인하
                  <br />
                  <span className="text-2xl text-text-secondary">— 6월 30일 마감 D-30 필수 가이드</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  자동차 개별소비세 인하 정책(5% → 3.5%)은 2026년 6월 30일 자정을 기준으로 종료됩니다.
                  기준은 계약일이 아니라 출고일이므로, 지금 계약하고 6월 30일 이전에 출고받아야 최대 143만원의 세금 절감 혜택을 받을 수 있습니다.
                  마감까지 정확히 한 달 남았으니 딜러 확인 후 신청이 필수입니다.
                </p>
              </header>

              <AdSlot slot="guide-vehicle-individual-consumption-tax-deadline-top" format="horizontal" />

              <section aria-label="핵심 요약" className="card border-l-4 border-l-danger-500">
                <h2 className="mb-2 text-caption uppercase tracking-wider text-danger-500">주의사항</h2>
                <div className="space-y-2 text-sm" data-speakable>
                  <p className="font-bold text-danger-700 dark:text-danger-300">
                    ⚠️ 6월 30일 23:59(마감) 이전 출고 필수 — 계약일이 아닌 출고일이 기준
                  </p>
                  <ul className="space-y-1.5 text-text-secondary">
                    <li>📅 <strong>6월 30일 이전 출고</strong>: 개별소비세 3.5% 적용 (최대 143만원 절감)</li>
                    <li>📅 <strong>7월 1일 이후 출고</strong>: 개별소비세 정상세율 5% 적용 (절감 없음)</li>
                    <li>💰 <strong>절감액 143만원</strong>: 개소세 100만원 + 교육세 30만원 + 부가세 13만원 (최대값)</li>
                    <li>🔧 <strong>필수 확인사항</strong>: 딜러에게 6월 내 출고 가능 여부를 꼭 문의하고 서면 확인 필요</li>
                  </ul>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">1. 개별소비세 인하 정책이란?</h2>
                <p className="text-text-secondary leading-relaxed">
                  정부는 자동차 내수 부양을 위해 2025년부터 승용차 개별소비세율을 기존 5%에서 3.5%로 인하한 특별 정책을 시행 중입니다.
                  이 정책은 원래 2025년 6월 30일 종료 예정이었으나, 경제 상황을 고려해 6개월 연장되어 <strong>2026년 6월 30일까지</strong> 유지됩니다.
                  그 이후는 정상세율 5%로 복귀할 예정입니다.
                </p>
                <div className="rounded-lg border-l-4 border-l-primary-500 bg-primary-500/5 p-4">
                  <p className="text-sm font-semibold text-primary-700 dark:text-primary-400">
                    📌 정책 마감: 2026년 6월 30일 23:59:59
                  </p>
                  <p className="mt-2 text-sm text-text-secondary">
                    이 날짜 이후 출고된 차량부터는 일반 5% 세율이 적용됩니다.
                    따라서 최신 정책 혜택을 받으려면 6월 30일 이전 출고가 절대 필요합니다.
                  </p>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">2. 143만원 절감액은 어떻게 나오나?</h2>
                <p className="text-text-secondary leading-relaxed">
                  개별소비세 인하의 전체 절감 효과를 이해하려면 세금 구조를 알아야 합니다.
                  개별소비세뿐만 아니라 그에 연동되는 교육세와 부가가치세까지 함께 절감되기 때문입니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="sr-only">개별소비세 인하로 인한 절감액 구성</caption>
                    <thead>
                      <tr className="bg-primary-500/10 border border-border-base">
                        <th className="px-3 py-2 text-left">세목</th>
                        <th className="px-3 py-2 text-left">인하 내용</th>
                        <th className="px-3 py-2 text-left">최대 절감액</th>
                      </tr>
                    </thead>
                    <tbody className="text-text-secondary">
                      <tr className="border border-border-base">
                        <td className="px-3 py-2 font-semibold">개별소비세</td>
                        <td className="px-3 py-2">5% → 3.5% (1.5% 인하)</td>
                        <td className="px-3 py-2">약 100만원</td>
                      </tr>
                      <tr className="border border-border-base">
                        <td className="px-3 py-2 font-semibold">교육세</td>
                        <td className="px-3 py-2">개소세의 30% (연동 절감)</td>
                        <td className="px-3 py-2">약 30만원</td>
                      </tr>
                      <tr className="border border-border-base bg-danger-500/5">
                        <td className="px-3 py-2 font-semibold">부가가치세</td>
                        <td className="px-3 py-2">개소세+교육세의 10% (연동 절감)</td>
                        <td className="px-3 py-2">약 13만원</td>
                      </tr>
                      <tr className="border border-border-base font-bold">
                        <td colSpan={2} className="px-3 py-2">합계 절감액</td>
                        <td className="px-3 py-2 text-danger-700 dark:text-danger-300">약 143만원</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-sm text-danger-700 dark:text-danger-300 bg-danger-500/5 p-3 rounded-lg mt-3">
                  <strong>⚠️ 참고</strong>: 위 금액은 최대값입니다. 실제 절감액은 구매 차량의 가격에 따라 달라질 수 있으므로, 딜러 견적에서 정확한 숫자를 확인하세요.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">3. 기준은 계약일이 아니라 출고일 — 가장 흔한 착각</h2>
                <p className="text-text-secondary leading-relaxed">
                  개별소비세 혜택을 받으려는 고객 중 가장 많이 하는 실수가 바로 이것입니다.
                  <strong>계약일 기준이 아니라 차량이 공장에서 출고되는 날(출고일)이 기준</strong>입니다.
                </p>
                <div className="space-y-3 mt-4">
                  <div className="rounded-lg border border-border-base bg-bg-card p-4">
                    <h3 className="font-semibold text-text-primary mb-2">❌ 착각하기 쉬운 경우</h3>
                    <ul className="space-y-1.5 text-sm text-text-secondary">
                      <li>• 5월에 계약, 7월에 출고 → 출고일이 7월 1일 이후면 <strong>5% 정상세율 적용</strong></li>
                      <li>• 6월에 계약, 6월에 출고 → 6월 30일 이전 출고면 <strong>3.5% 인하 적용</strong></li>
                      <li>• 딜러가 "계약은 6월"이라고 해도, 실제 출고는 7월 중순 가능성 → 반드시 출고일 확인</li>
                    </ul>
                  </div>
                  <div className="rounded-lg border border-border-base bg-bg-raised p-4">
                    <h3 className="font-semibold text-text-primary mb-2">✅ 올바른 판단</h3>
                    <p className="text-sm text-text-secondary">
                      개별소비세 인하 혜택 = 차량이 제조 완료되어 공장에서 출고되는 시점이 6월 30일 이전이어야 함.
                      계약서에 기재되는 "인수인도예정일"과도 다를 수 있으므로, 딜러에게 <strong>"실제 출고 가능 날짜"</strong>를 직접 문의해야 합니다.
                    </p>
                  </div>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">4. 딜러와 확인해야 할 체크리스트</h2>
                <p className="text-text-secondary leading-relaxed">
                  6월 30일 마감까지 정확히 한 달 남았습니다. 계약 전·후로 다음 항목들을 꼭 딜러와 확인하세요.
                </p>
                <div className="space-y-3">
                  <div className="rounded-lg border border-border-base bg-bg-raised p-4">
                    <h3 className="font-semibold text-text-primary mb-2">① 제조 상황 확인</h3>
                    <p className="text-sm text-text-secondary">
                      현재 주문 차량의 제조가 진행 중인지, 언제 완료될 예정인지 문의합니다.
                      수입차의 경우 해외 배송 일정까지 고려해야 하므로 더욱 중요합니다.
                    </p>
                  </div>
                  <div className="rounded-lg border border-border-base bg-bg-raised p-4">
                    <h3 className="font-semibold text-text-primary mb-2">② 6월 내 출고 가능 여부</h3>
                    <p className="text-sm text-text-secondary">
                      "최선을 다하겠습니다"는 답변이 아니라, 현실적인 출고 예정일을 서면으로 받으세요.
                      딜러 담당자의 휴대폰 메시지나 이메일로라도 증거를 남기는 것이 좋습니다.
                    </p>
                  </div>
                  <div className="rounded-lg border border-border-base bg-bg-raised p-4">
                    <h3 className="font-semibold text-text-primary mb-2">③ 만약 6월 내 불가능하면?</h3>
                    <p className="text-sm text-text-secondary">
                      계약 시 "6월 30일 이전 출고 불가능 시 계약 해제 및 계약금 반환" 조항을 추가하세요.
                      개별소비세 인하 혜택이 없다면 구매 결정 자체가 달라질 수 있기 때문입니다.
                    </p>
                  </div>
                  <div className="rounded-lg border border-border-base bg-bg-raised p-4">
                    <h3 className="font-semibold text-text-primary mb-2">④ 개별소비세 계산서 확인</h3>
                    <p className="text-sm text-text-secondary">
                      최종 등록 시 "개별소비세 3.5% 적용"이 계산서에 명시되어 있는지 확인합니다.
                      간혹 행정 오류로 5%가 잘못 적용될 수도 있으니 주의하세요.
                    </p>
                  </div>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">5. 자동차세(보유세)와의 혼동 주의</h2>
                <p className="text-text-secondary leading-relaxed">
                  개별소비세 인하 정책과 별개로, 자동차세(보유세)도 관심 있게 봐야 합니다.
                  자동차세와 개별소비세는 전혀 다른 세금이며, 납부 시기와 기준도 다릅니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 text-sm">
                  <h3 className="font-semibold text-text-primary mb-2">개별소비세 vs 자동차세</h3>
                  <ul className="space-y-2 text-text-secondary">
                    <li><strong>개별소비세</strong>: 신차 등록 시 1회만 납부 (기준: 출고일)</li>
                    <li><strong>자동차세(보유세)</strong>: 매년 납부 (기준: 1월 1일 기준 소유자)</li>
                    <li><strong>자동차세 2026 제1기</strong>: 6월 16~30일 납부 (별도 정책, 개소세와 무관)</li>
                  </ul>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">6. 중고차·수입차·특수 차량의 경우</h2>
                <p className="text-text-secondary leading-relaxed">
                  개별소비세 인하 정책은 신차 구매에만 적용됩니다. 중고차나 특수 용도 차량은 대상이 아닙니다.
                </p>
                <div className="space-y-3">
                  <div className="rounded-lg border border-border-base bg-bg-raised p-4">
                    <h3 className="font-semibold text-text-primary mb-2">신차 정의</h3>
                    <p className="text-sm text-text-secondary">
                      국내 제조 또는 수입한 자동차 중 처음 등록(신차등록)하는 차량입니다.
                      중고차(이전 등록 이력이 있는 차) 구매 시에는 일반 취득세 기준을 따릅니다.
                    </p>
                  </div>
                  <div className="rounded-lg border border-border-base bg-bg-raised p-4">
                    <h3 className="font-semibold text-text-primary mb-2">수입차 (특히 주의)</h3>
                    <p className="text-sm text-text-secondary">
                      수입차는 해외 배송, 통관, 국내 딜러 인수 등의 단계를 거칩니다.
                      "계약일"이 아니라 "국내 출고일(등록 가능 시점)"을 기준으로 판정하므로,
                      딜러에게 더욱 정확한 일정을 확인해야 합니다. 특히 6월 말 주문은 위험할 수 있습니다.
                    </p>
                  </div>
                </div>
              </section>

              <AdSlot slot="guide-vehicle-individual-consumption-tax-deadline-mid" format="rectangle" />

              <FaqSection items={[...FAQ_ITEMS]} />

              <section className="card">
                <h2 className="mb-3 text-lg font-semibold">관련 계산기·가이드</h2>
                <ul className="space-y-2 text-sm">
                  <li>
                    →{' '}
                    <Link href="/calculator/vehicle-tax/" className="text-primary-600 underline dark:text-primary-500">
                      자동차세 계산기
                    </Link>
                    {' — 보유세 연간 납부액 계산 (개소세와 별개)'}
                  </li>
                  <li>
                    →{' '}
                    <Link href="/calculator/acquisition-tax/" className="text-primary-600 underline dark:text-primary-500">
                      취득세 계산기
                    </Link>
                    {' — 부동산 거래 시 취득세 (자동차와 별개)'}
                  </li>
                  <li>
                    →{' '}
                    <Link href="/guide/june-property-tax/" className="text-primary-600 underline dark:text-primary-500">
                      부동산 과세기준일 6월 1일 가이드
                    </Link>
                    {' — 부동산 거래 시 중요한 날짜'}
                  </li>
                  <li>
                    →{' '}
                    <Link href="/guide/tax-calendar-2026/" className="text-primary-600 underline dark:text-primary-500">
                      2026년 세금 달력
                    </Link>
                    {' — 월별 신고·납부 일정 전체'}
                  </li>
                </ul>
              </section>

              <ShareButtons
                title="자동차 개별소비세 인하 6월 30일 마감 — 143만원 절감 가이드"
                url={URL}
                description="개별소비세 5% → 3.5% 인하, 최대 143만원 절감. 기준은 계약일 아닌 출고일. 마감 D-30."
              />

              <section
                aria-label="출처 및 면책"
                className="rounded-lg border border-border-base p-4 text-caption text-text-tertiary"
              >
                <p className="mb-2">
                  <strong>법적 근거</strong>: 개별소비세법 §1의2(탄력세율 — 정부가 기본세율의 ±30% 범위에서 조정) ·{' '}
                  <a
                    href="https://www.law.go.kr/법령/개별소비세법"
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="text-primary-600 underline dark:text-primary-500"
                  >
                    개별소비세법(국가법령정보센터)
                  </a>{' '}
                  ·{' '}
                  <a
                    href="https://www.nts.go.kr"
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="text-primary-600 underline dark:text-primary-500"
                  >
                    국세청
                  </a>{' '}
                  ·{' '}
                  <a
                    href="https://www.moef.go.kr"
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="text-primary-600 underline dark:text-primary-500"
                  >
                    기획재정부(정책 보도자료)
                  </a>
                  .
                </p>
                <p className="mb-2">
                  <strong>면책조항</strong>: 본 가이드는 2026년 6월 1일 기준 정보를 제공합니다.
                  정부 정책은 변경될 수 있으므로, 차량 구매 전 딜러 또는 국세청에 최신 정보를 재확인하시기 바랍니다.
                  개별 거래 상황(사업용 차량, 특수 용도, 법인 구매 등)에 따라 세금 계산이 다를 수 있습니다.
                  본 콘텐츠는 AI 보조 작성 후 운영자 검수를 거쳤습니다.
                </p>
                <p>
                  <strong>업데이트</strong>: {DATE_MODIFIED} · 작성·검수: 김준혁 (calculatorhost)
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
