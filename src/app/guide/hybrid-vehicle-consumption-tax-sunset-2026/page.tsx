// [revenue-lever: indexing+traffic]
import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { Footer } from '@/components/layout/Footer';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { FaqSection } from '@/components/calculator/FaqSection';
import { ShareButtons } from '@/components/calculator/ShareButtons';
import {
  buildBreadcrumbJsonLd,
  buildArticleJsonLd,
  buildWebPageJsonLd,
  buildFaqPageJsonLd,
  buildSpeakableJsonLd,
} from '@/lib/seo/jsonld';

const URL = 'https://calculatorhost.com/guide/hybrid-vehicle-consumption-tax-sunset-2026/';
const DATE_PUBLISHED = '2026-08-06';
const DATE_MODIFIED = '2026-08-06';

export const metadata: Metadata = {
  title: '하이브리드 개별소비세 감면 2026년 말 종료, 얼마 오르나',
  description:
    '하이브리드차 개별소비세 감면(최대 70만원)이 2026년 12월 31일 종료됩니다. 2026 세제개편안 정부안 기준, 연내 구매와 내년 구매의 세금 차이, 전기·수소차 감면 축소 일정까지 정리했습니다.',
  keywords: [
    '하이브리드 개별소비세 감면',
    '하이브리드 개소세 종료',
    '하이브리드 세금 감면',
    '친환경차 개소세',
    '전기차 개소세 감면',
    '하이브리드 취득세',
    '조세특례제한법 109조',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '하이브리드 개별소비세 감면 2026년 말 종료' }],
    title: '하이브리드 개별소비세 감면 2026년 말 종료, 얼마 오르나',
    description: '최대 70만원 하이브리드 개소세 감면이 2026년 말 종료. 연내·내년 구매 세금 차이와 전기·수소차 축소 일정.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '하이브리드 개소세 감면 2026년 말 종료',
    description: '최대 70만원 감면 종료로 하이브리드 신차값 상승. 연내 구매가 유리한지 계산으로 확인.',
  },
};

const FAQ_ITEMS = [
  {
    question: '하이브리드 개별소비세 감면은 언제 종료되나요?',
    answer:
      '2026년 12월 31일까지만 적용됩니다. 2026년 8월 발표된 세제개편안에서 정부가 하이브리드차 시장이 충분히 커져 세제지원 목적을 달성했다고 보고 적용기한을 연장하지 않기로 했습니다. 다만 세제개편안은 정부안으로 국회 입법 절차를 거쳐야 확정되므로, 최종 종료 시점은 소관부처 고시로 확인해야 합니다.',
  },
  {
    question: '하이브리드 개소세 감면은 얼마나 받을 수 있나요?',
    answer:
      '차량 한 대당 개별소비세 최대 70만원까지 감면됩니다(조세특례제한법 §109). 개별소비세액이 70만원 이하면 전액 면제되고, 70만원을 초과하면 70만원을 공제합니다. 개소세에 붙는 교육세(개소세의 30%)도 함께 줄어들어 실제 절감액은 90만원 안팎이 됩니다.',
  },
  {
    question: '감면이 끝나면 하이브리드차가 얼마나 비싸지나요?',
    answer:
      '차량 가격에 따라 다르지만 대략 90만~100만원 정도 오릅니다. 개별소비세 70만원과 그에 붙는 교육세 21만원, 그리고 부가가치세 상승분까지 더해지기 때문입니다. 고가 하이브리드일수록 감면 한도(70만원)를 이미 다 채우고 있어 종료 영향이 커집니다.',
  },
  {
    question: '2026년 안에 계약하면 감면을 받나요?',
    answer:
      '개별소비세는 원칙적으로 제조장 반출(출고) 또는 수입 신고 시점을 기준으로 과세됩니다. 따라서 계약일이 아니라 실제 출고·등록 시점이 2026년 12월 31일 이내인지가 중요합니다. 인기 차종은 출고 대기가 길 수 있으므로, 연내 감면을 원하면 출고 가능 시점을 미리 확인하세요.',
  },
  {
    question: '전기차와 수소차 감면도 같이 없어지나요?',
    answer:
      '아닙니다. 전기차·수소전기차 개별소비세 감면은 유지되지만 한도가 단계적으로 줄어듭니다. 정부안 기준 전기차는 2027년 300만원에서 200만원으로, 2028년 100만원으로 축소되고, 친환경차 개소세 감면은 2028년 말 종료가 예정돼 있습니다. 구체적 금액과 일정은 국회 통과 후 확정됩니다.',
  },
  {
    question: '하이브리드 취득세 감면은 어떻게 되나요?',
    answer:
      '취득세 감면은 개별소비세와 별개 제도로 지방세특례제한법 §66에 따릅니다. 하이브리드차 취득세 감면(최대 40만원)은 적용기한이 이미 지나 종료됐을 수 있으므로, 현재 적용 여부는 위택스 또는 관할 지자체에서 반드시 확인하세요.',
  },
  {
    question: '개별소비세는 어떤 세금이고 세율은 얼마인가요?',
    answer:
      '개별소비세는 특정 물품·차량 등에 부과되는 소비세입니다. 승용자동차의 개별소비세율은 공장도가격(또는 수입가격)의 5%이며, 여기에 교육세가 개소세의 30% 추가됩니다. 이후 이 세금들을 포함한 금액에 부가가치세 10%가 붙어 최종 차량 가격이 정해집니다.',
  },
  {
    question: '감면 종료 전에 하이브리드를 사는 게 유리한가요?',
    answer:
      '세금만 보면 연내 출고가 유리합니다. 다만 차량 선택은 세금뿐 아니라 차종·연비·유지비·전기차 전환 계획까지 종합해 판단해야 합니다. 본 가이드는 세금 정보 제공이 목적이며 특정 차량 구매를 권유하지 않습니다.',
  },
];

export default function HybridVehicleConsumptionTaxSunset2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '하이브리드 개소세 감면 종료 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '하이브리드 개별소비세 감면 2026년 말 종료, 얼마 오르나',
    description:
      '2026 세제개편안에 따른 하이브리드차 개별소비세 감면(최대 70만원) 종료. 연내·내년 구매 세금 차이 계산, 전기·수소차 감면 축소 일정, 개소세 구조까지 정리한 가이드.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['하이브리드', '개별소비세', '친환경차 감면', '세제개편', '조세특례제한법'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '하이브리드 개소세 감면 종료 2026',
    description: '하이브리드차 개별소비세 감면 2026년 말 종료의 영향과 구매 시점별 세금 차이.',
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
                    { name: '하이브리드 개소세 감면 종료 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">자동차 구매 예정자 · 8분 읽기 · 2026-08-06</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  하이브리드 개별소비세 감면 종료
                  <br />
                  <span className="text-2xl text-text-secondary">2026년 말 끝, 얼마나 오를까</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  이 가이드는 하이브리드차 구매를 고민 중인 소비자를 위한 글입니다. 2026년 8월 발표된 세제개편안에서 하이브리드 개별소비세 감면 종료가 확정되면서, 연내에 사는 것과 내년에 사는 것의 세금 차이가 커졌습니다. 감면 규모, 종료 후 인상폭, 그리고 전기·수소차 감면 축소 일정까지 세금 관점에서 정리합니다.
                </p>
              </header>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">하이브리드 개소세 감면은 언제 끝나나</h2>
                <p>
                  2026년 12월 31일에 끝납니다. 정부는 2026년 8월 발표한 세제개편안에서 하이브리드차 개별소비세 감면의 적용기한을 연장하지 않기로 했습니다. 하이브리드 시장이 충분히 성장해 세제지원의 목적을 달성했다는 판단입니다.
                </p>
                <p className="mt-4">
                  이 감면의 근거는 조세특례제한법 §109(환경친화적 자동차에 대한 개별소비세 감면)입니다. 2009년 도입 이후 여러 차례 연장돼 왔지만, 이번에는 일몰(종료)로 방향이 정해졌습니다.
                </p>
                <p className="mt-4">
                  다만 세제개편안은 아직 정부안입니다. 8월 입법예고와 국무회의, 국회 의결을 거쳐야 확정되므로, 종료 시점이 유지될지 여부는 최종 개정 법률과 소관부처 고시로 확인해야 합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">감면은 얼마나 받고 있었나</h2>
                <p>
                  하이브리드차 한 대당 개별소비세 최대 70만원이 감면됩니다. 개별소비세액이 70만원 이하면 전액 면제하고, 70만원을 넘으면 70만원을 공제하는 구조입니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 하이브리드 개별소비세 감면 구조 (조세특례제한법 §109)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">구분</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">내용</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">감면 대상</td>
                        <td className="p-3">하이브리드 승용자동차</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">개소세 감면 한도</td>
                        <td className="p-3"><strong>70만원</strong> (이하 전액, 초과 시 70만원 공제)</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">교육세</td>
                        <td className="p-3">개소세의 30% (감면 시 함께 축소)</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">적용 기한</td>
                        <td className="p-3">~2026년 12월 31일 (정부안, 연장 없음)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  개소세가 줄면 그 위에 붙는 교육세(개소세의 30%, 교육세법 §5)도 함께 줄어듭니다. 그래서 실제 절감액은 개소세 70만원에 교육세 21만원을 더한 90만원 안팎이 됩니다.
                </p>
                <p className="mt-4">
                  다만 개소세액이 70만원에 못 미치는 저가 하이브리드는 감면액도 그만큼 작습니다. 감면 종료의 체감 영향은 차량 가격이 높을수록 큽니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">종료되면 얼마나 비싸지나 (계산 사례)</h2>
                <p>
                  승용차 개별소비세율은 공장도가격의 5%이고, 여기에 교육세 30%와 부가가치세 10%가 순서대로 붙습니다. 두 가지 사례로 감면 종료 전후를 비교합니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 1. 공장도가 2,000만원 하이브리드 (감면 한도 초과)</p>
                  <p className="text-sm text-text-secondary">
                    · 개별소비세: 2,000만 × 5% = 100만원
                    <br />
                    · 2026년(감면): 개소세 100만 - 70만 = 30만원, 교육세 30만×30% = 9만원
                    <br />
                    · 2027년(종료): 개소세 100만원, 교육세 100만×30% = 30만원
                    <br />
                    · 개소세+교육세 차이: (100만+30만) - (30만+9만) = <strong>91만원 증가</strong>
                    <br />
                    <span className="text-xs text-text-tertiary">여기에 부가세 10%가 세금 위에 다시 붙어 최종 인상폭은 약 100만원에 이릅니다.</span>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 2. 공장도가 1,200만원 하이브리드 (감면 한도 이하)</p>
                  <p className="text-sm text-text-secondary">
                    · 개별소비세: 1,200만 × 5% = 60만원 (70만원 이하 → 전액 면제)
                    <br />
                    · 2026년(감면): 개소세 0원, 교육세 0원
                    <br />
                    · 2027년(종료): 개소세 60만원, 교육세 60만×30% = 18만원
                    <br />
                    · 개소세+교육세 차이: <strong>78만원 증가</strong>
                    <br />
                    <span className="text-xs text-text-tertiary">경계값: 개소세액이 70만원(공장도가 1,400만원)을 넘느냐에 따라 감면 방식이 전액 면제에서 정액 공제로 바뀝니다.</span>
                  </p>
                </div>
                <p className="mt-4">
                  다만 위 계산은 공장도가격을 기준으로 한 예시입니다. 실제 개별소비세 과세표준은 제조사·수입사가 신고하는 가격이며, 옵션·트림에 따라 달라지므로 정확한 세액은 견적서로 확인하세요.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">전기차·수소차 감면은 어떻게 바뀌나</h2>
                <p>
                  전기차와 수소전기차의 개별소비세 감면은 폐지되지 않고 유지되지만, 한도가 단계적으로 줄어듭니다. 정부안 기준 일정은 다음과 같습니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 2. 친환경차 개별소비세 감면 축소 일정 (2026 세제개편안 정부안)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">차종</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">현재</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">2027년</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">2028년</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">하이브리드</td>
                        <td className="p-3">70만원</td>
                        <td className="p-3" colSpan={2}>2026년 말 종료</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">전기차</td>
                        <td className="p-3">300만원</td>
                        <td className="p-3">200만원</td>
                        <td className="p-3">100만원</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">수소전기차</td>
                        <td className="p-3">400만원</td>
                        <td className="p-3">300만원</td>
                        <td className="p-3">150만원</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  정부안에 따르면 전기차·수소차 개별소비세 감면은 2028년 말 종료가 예정돼 있습니다. 즉 하이브리드가 먼저 끝나고, 전기·수소차는 2~3년에 걸쳐 서서히 축소되는 방향입니다.
                </p>
                <p className="mt-4">
                  다만 위 금액과 일정은 모두 정부안이며 국회 심의 과정에서 바뀔 수 있습니다. 구매 계획을 세울 때는 확정 법률과 소관부처 고시를 다시 확인하세요.
                </p>
              </section>

              <section className="space-y-6 border-t border-border-base pt-8">
                <h2 className="text-2xl font-bold">연내 구매하려면 무엇을 확인해야 하나</h2>
                <p>
                  감면 종료 전 구매를 고려한다면 세금 기준 시점을 정확히 이해해야 합니다. 개별소비세는 계약일이 아니라 반출·수입 시점을 기준으로 과세되기 때문입니다.
                </p>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li>
                    <strong>출고 시점 확인:</strong> 감면을 받으려면 실제 출고·등록이 2026년 12월 31일 이내여야 합니다. 계약만 연내에 해도 출고가 내년으로 넘어가면 감면 대상이 아닐 수 있습니다.
                  </li>
                  <li>
                    <strong>출고 대기 기간:</strong> 인기 하이브리드는 출고까지 수개월이 걸릴 수 있습니다. 딜러에게 예상 출고월을 서면으로 확인하세요.
                  </li>
                  <li>
                    <strong>세금 외 요소:</strong> 세금 절감액(약 90만~100만원)과 차량 자체의 연비·유지비·중고가치를 함께 비교해야 합니다. 세금만으로 구매를 결정하기보다 총소유비용 관점이 안전합니다.
                  </li>
                </ul>
                <p className="mt-4">
                  예외: 법인·리스·렌트 계약은 세금 부담 주체와 시점이 개인 구매와 다를 수 있으므로, 계약 형태별로 별도 확인이 필요합니다.
                </p>
              </section>

              <h2 className="text-2xl font-bold mb-6">자주 묻는 질문</h2>
              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h3 className="text-lg font-semibold text-text-primary">관련 계산기 및 가이드</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link
                    href="/calculator/vehicle-tax/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">자동차세 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">배기량·차령별 자동차세를 계산해보세요.</p>
                  </Link>
                  <Link
                    href="/guide/hybrid-vehicle-tax-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">하이브리드 자동차세 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">하이브리드 보유 시 매년 내는 자동차세.</p>
                  </Link>
                  <Link
                    href="/guide/electric-vehicle-tax-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">전기차 자동차세 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">전기차 정액 과세와 세제 혜택 정리.</p>
                  </Link>
                  <Link
                    href="/guide/vehicle-acquisition-tax-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">자동차 취득세 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">신차 구매 시 취득세 세율과 계산법.</p>
                  </Link>
                  <Link
                    href="/guide/car-installment-vs-lease-vs-rent-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">할부·리스·렌트 비교</div>
                    <p className="mt-1 text-sm text-text-secondary">구매 방식별 세금·비용 차이를 비교하세요.</p>
                  </Link>
                  <Link
                    href="/category/tax/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">모든 세금 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">양도세·취득세·자동차세 모음.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 교육 목적으로 작성되었으며 개인 맞춤형 세무·구매 조언이 아닙니다. 하이브리드·전기·수소차 개별소비세 감면 내용은 2026년 8월 발표된 세제개편안 정부안 기준이며, 국회 심의 과정에서 금액·시점·경과규정이 바뀔 수 있습니다. 취득세 감면 적용 여부는 위택스·관할 지자체에서, 개별 차량의 정확한 세액은 견적서로 확인하세요. 본 콘텐츠는 2026-08-06 기준으로 작성됐으며, 인용 법조항은 <strong>조세특례제한법 §109, 교육세법 §5, 지방세특례제한법 §66</strong>입니다. AI 보조 작성 후 운영자 검수 완료.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터</a>,{' '}
                  <a href="https://www.moef.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">기획재정부(세제개편안)</a>,{' '}
                  <a href="https://www.nts.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">국세청</a>.
                </p>
              </section>

              <ShareButtons
                title="하이브리드 개별소비세 감면 종료 2026 가이드"
                url={URL}
              />
            </article>
          </main>
        </div>
        <Footer />
      </div>
    </>
  );
}
