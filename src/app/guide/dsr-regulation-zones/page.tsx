import type { Metadata } from 'next';
import { GuideCalculatorCta } from '@/components/guide/GuideCalculatorCta';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { Footer } from '@/components/layout/Footer';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { FaqSection } from '@/components/calculator/FaqSection';
import { PublicDataCitation } from '@/components/seo/PublicDataCitation';
import { getEcosBaseRateCitation } from '@/lib/publicapi/public-citations';
import bokRates from '@/data/bok-rates.json';
import {
  buildBreadcrumbJsonLd,
  buildArticleJsonLd,
  buildWebPageJsonLd,
  buildFaqPageJsonLd,
  buildSpeakableJsonLd,
} from '@/lib/seo/jsonld';

const URL = 'https://calculatorhost.com/guide/dsr-regulation-zones/';
const DATE_PUBLISHED = '2026-05-03';
const DATE_MODIFIED = '2026-10-14';

const ECOS_BASE_RATE = getEcosBaseRateCitation(bokRates);

export const metadata: Metadata = {
  title: '지역별 DSR·LTV 규제 완전 정리 2026 | calculatorhost',
  description:
    '2025-10-16·2026-07-01 규제지역 재지정 이후 지역별 DSR·LTV 차이. 규제지역 LTV 40%, 수도권·규제지역 주담대 최대 6억(15억 이하), 변동 스트레스 3.0%p 등 바뀐 기준을 사례와 함께 정리.',
  keywords: ['DSR 규제지역', '조정대상지역 DSR', '투기과열지구 LTV', '비규제지역 DSR', '스트레스 DSR', '생애최초 LTV', '다주택자 LTV'],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '지역별 DSR·LTV 규제 완전 정리 2026 | calculatorhost' }],
    title: 'DSR·LTV 규제지역별 완전 정리 (2026)',
    description: '규제지역 LTV 40%, 수도권·규제지역 주담대 최대 6억 한도, 변동 스트레스 3.0%p. 2025-10-16·2026-07-01 재지정 반영.',
    url: URL,
    type: 'article',

    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
};

const FAQ_ITEMS = [
  {
    question: '2026년 현재 조정대상지역·투기과열지구는 어디인가요?',
    answer:
      '2025년 10월 16일부터 서울 25개 구 전역과 경기 12곳(과천, 광명, 성남 분당·수정·중원, 수원 영통·장안·팔달, 안양 동안, 용인 수지, 의왕, 하남)이 조정대상지역이자 투기과열지구로 함께 지정됐고, 2026년 7월 1일부터 화성 동탄구, 용인 기흥구, 구리시가 추가로 지정됐습니다. 조정대상지역과 투기과열지구가 같은 지역에 함께 지정되어 사실상 "규제지역"으로 운영됩니다. 정책 변경이 잦으니 거래 직전 국토교통부·금융위원회 공식 발표를 확인하세요.',
  },
  {
    question: '비규제지역과 조정대상지역의 LTV 차이는?',
    answer:
      '2025년 10월 16일 이후 규제지역(서울 전역 등)은 무주택 또는 처분조건부 1주택 LTV 40%, 생애최초 70%입니다. 규제지역이 아닌 곳은 무주택·처분조건부 1주택 70%이고, 생애최초는 그 밖의 수도권 70%, 지방 80%입니다. 같은 6억 주택이라면 규제지역 무주택 2.4억 원 vs 지방 비규제 무주택 4.2억 원 vs 지방 비규제 생애최초 4.8억 원으로 최대 약 2.4억 원 차이가 납니다. 수도권·규제지역에서는 추가로 주담대 최대 한도 6억 원(시가 15억 원 이하), 15억~25억 4억 원, 25억 초과 2억 원 제한을 받습니다.',
  },
  {
    question: '스트레스 금리는 모든 대출에 같은 수준으로 적용되나요?',
    answer:
      '아닙니다. 2025년 10월 16일부터 수도권·규제지역 주담대 스트레스 금리는 변동형 3.0%p, 혼합형(5년 고정) 2.4%p, 주기형(5년) 1.2%p, 전 기간 고정형 0으로 상향됐습니다. 지방 주담대는 2단계 수준인 변동형 약 0.75%p, 혼합형 약 0.45%p, 주기형 약 0.225%p가 2026년 12월 31일까지 유예 적용됩니다. 신용대출(잔액 1억 원 초과)과 기타 가계대출은 지역과 무관하게 1.5%p가 그대로 적용되며, 정책서민금융상품 일부는 여전히 면제·완화됩니다.',
  },
  {
    question: '생애최초 구매자는 DSR 우대도 받나요?',
    answer:
      '아니요. 생애최초는 LTV 우대만 있고 DSR 우대는 없습니다. 2025년 10월 16일 이후 생애최초 LTV는 수도권·규제지역 70%, 지방 비규제 80%입니다(이전 수도권 비규제·규제 80%에서 수도권만 70%로 하향됐어요). DSR 40%(은행) 한도는 동일하게 적용되므로 LTV로 더 받아도 DSR이 결정적 제약이 되는 경우가 많습니다.',
  },
  {
    question: '투기과열지구는 별도 규제가 있나요?',
    answer:
      '2025년 10월 16일 이후 조정대상지역과 투기과열지구는 같은 지역에 함께 지정되어 사실상 동일한 규제가 적용됩니다. 구분된 LTV·DSR 차등은 거의 없고, 수도권·규제지역 공통으로 LTV 40%(무주택 또는 처분조건부 1주택), 생애최초 70%, 주담대 최대 한도 6억 원(시가 15억 원 이하)·4억 원(15억~25억)·2억 원(25억 초과)이 적용됩니다. 과거의 9억 초과 LTV 차등은 2025-10-16 조치로 통합 한도 체계에 흡수됐습니다.',
  },
  {
    question: '다주택자는 어떻게 규제가 강화되나요?',
    answer:
      '2025년 6월 28일부터 수도권·규제지역에서는 2주택 이상 보유자가 추가 주택을 살 때 주택구입 목적 주담대를 받을 수 없습니다. 지방 비규제지역은 은행마다 기준이 다르고, 기존 대출이 쌓여 DSR이 먼저 한도를 막는 경우가 많습니다. 다주택자는 양도세·취득세 중과 대상이 될 수 있으니 세금도 함께 확인하세요.',
  },
];

export default function DsrRegulationZonesPage() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: 'DSR·LTV 규제지역 정리' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: 'DSR·LTV 규제지역별 완전 정리 (2026)',
    description: '규제지역 재지정 이후 규제지역 LTV 40%, 수도권·규제지역 주담대 최대 한도 6억(15억 이하)·4억·2억, 변동 스트레스 3.0%p, 지방 유예 등 바뀐 기준 종합.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['DSR', 'LTV', '조정대상지역', '투기과열지구', '스트레스 DSR'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '비규제·조정·투기과열지역 DSR·LTV 규제 완전 정리 2026',
    description: '2025-10-16·2026-07-01 재지정 이후 비규제·조정·투기과열지역 DSR·LTV·DTI 규제를 한눈에. 규제지역 LTV 40%, 수도권·규제지역 주담대 최대 6억 한도, 변동 스트레스 3.0%p, 지방 유예, 생애최초 우대, 다주택 제한까지 비교표로 정리.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
  });
  const faqLd = buildFaqPageJsonLd(FAQ_ITEMS);
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
                    { name: 'DSR·LTV 규제지역 정리' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">금융 · 8분 읽기 · 2026-05-03</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  비규제·조정·투기과열 DSR·LTV 규제 완전 정리 (2026)
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  같은 주택이라도 위치(비규제·조정·투기과열)에 따라 대출 한도가 수억 원 차이 납니다.
                  2025년 10월 16일 규제지역이 재지정되고 규제지역 LTV 40%, 수도권·규제지역 주담대 최대 한도 6억 원(시가 15억 원 이하),
                  변동 스트레스 금리 3.0%p가 적용되기 시작했습니다. 2026년 7월 1일에는 화성 동탄구·용인 기흥구·구리시도
                  규제지역에 추가됐습니다. 바뀐 규제·생애최초 우대·다주택 제한을 한 페이지에 정리합니다.
                  대출 금리는 한국은행 기준금리(<PublicDataCitation citation={ECOS_BASE_RATE} />)에
                  은행별 가산금리를 더해 결정됩니다.
                </p>
              </header>
              <GuideCalculatorCta slug="dsr-regulation-zones" />

              <section aria-label="규제 비교표" className="card border-l-4 border-l-primary-500">
                <h2 className="mb-3 text-xl font-bold">2026년 지역별 LTV·DSR·DTI 비교표</h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse" data-speakable>
                    <caption className="sr-only">2025-10-16 이후 지역별 부동산 대출 규제 비교</caption>
                    <thead>
                      <tr className="bg-primary-500/10 border border-border-base">
                        <th className="px-3 py-2 text-left">규제</th>
                        <th className="px-3 py-2 text-right">비규제지역</th>
                        <th className="px-3 py-2 text-right">조정대상지역</th>
                        <th className="px-3 py-2 text-right">투기과열지구</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border border-border-base">
                        <td className="px-3 py-2 font-semibold">LTV (무주택·처분조건부 1주택)</td>
                        <td className="px-3 py-2 text-right">70%</td>
                        <td className="px-3 py-2 text-right">40%</td>
                        <td className="px-3 py-2 text-right">40%</td>
                      </tr>
                      <tr className="border border-border-base">
                        <td className="px-3 py-2 font-semibold">LTV (생애최초)</td>
                        <td className="px-3 py-2 text-right text-xs">수도권 70% / 지방 80%</td>
                        <td className="px-3 py-2 text-right">70%</td>
                        <td className="px-3 py-2 text-right">70%</td>
                      </tr>
                      <tr className="border border-border-base">
                        <td className="px-3 py-2 font-semibold">LTV (수도권 2주택 이상 신규)</td>
                        <td className="px-3 py-2 text-right text-xs">수도권 불가 / 지방은 은행 확인</td>
                        <td className="px-3 py-2 text-right text-danger-500">0% (불가)</td>
                        <td className="px-3 py-2 text-right text-danger-500">0% (불가)</td>
                      </tr>
                      <tr className="border border-border-base">
                        <td className="px-3 py-2 font-semibold">주담대 최대 한도 (수도권·규제지역)</td>
                        <td className="px-3 py-2 text-right text-xs">수도권 비규제: 15억↓ 6억 / 15~25억 4억 / 25억↑ 2억. 지방 비규제: 제한 없음</td>
                        <td className="px-3 py-2 text-right text-xs">15억↓ 6억 / 15~25억 4억 / 25억↑ 2억</td>
                        <td className="px-3 py-2 text-right text-xs">동일</td>
                      </tr>
                      <tr className="border border-border-base bg-bg-raised/30">
                        <td className="px-3 py-2 font-semibold">DSR (은행)</td>
                        <td className="px-3 py-2 text-right">40%</td>
                        <td className="px-3 py-2 text-right">40%</td>
                        <td className="px-3 py-2 text-right">40%</td>
                      </tr>
                      <tr className="border border-border-base bg-bg-raised/30">
                        <td className="px-3 py-2 font-semibold">DSR (2금융권)</td>
                        <td className="px-3 py-2 text-right">50%</td>
                        <td className="px-3 py-2 text-right">50%</td>
                        <td className="px-3 py-2 text-right">50%</td>
                      </tr>
                      <tr className="border border-border-base bg-bg-raised/30">
                        <td className="px-3 py-2 font-semibold">스트레스 DSR (변동 주담대)</td>
                        <td className="px-3 py-2 text-right text-xs">지방 약 0.75%p (2026-12-31 유예) / 수도권 비규제 3.0%p</td>
                        <td className="px-3 py-2 text-right">3.0%p</td>
                        <td className="px-3 py-2 text-right">3.0%p</td>
                      </tr>
                      <tr className="border border-border-base">
                        <td className="px-3 py-2 font-semibold">DTI</td>
                        <td className="px-3 py-2 text-right">60%</td>
                        <td className="px-3 py-2 text-right">40%</td>
                        <td className="px-3 py-2 text-right">40%</td>
                      </tr>
                      <tr className="border border-border-base">
                        <td className="px-3 py-2 font-semibold">만기 (주담대)</td>
                        <td className="px-3 py-2 text-right text-xs">수도권 최장 30년 / 지방은 상품별</td>
                        <td className="px-3 py-2 text-right">30년</td>
                        <td className="px-3 py-2 text-right">30년</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-3 text-xs text-text-tertiary">
                  ※ 2026년 10월 14일 기준. 2025-10-16, 2026-07-01 두 차례 재지정 반영. 조정대상지역과 투기과열지구가 같은 지역에 함께 지정되어 사실상 동일 규제가 적용됩니다. 정책 변경이 잦으니 거래 직전 국토교통부·금융위원회·금융감독원 공식 발표 확인 필수.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">시나리오별 대출 한도 비교 (2026 실전 사례)</h2>

                <div className="rounded-lg border border-border-base bg-bg-card p-5">
                  <h3 className="mb-2 font-semibold text-text-primary">시나리오 1. 6억 주택 매매 (생애최초·무주택·연소득 6,000만 원)</h3>
                  <ul className="text-sm text-text-secondary space-y-1">
                    <li>· <strong>지방 비규제</strong>: LTV 80% × 6억 = 4.8억</li>
                    <li>· <strong>수도권 비규제</strong>: LTV 70% × 6억 = 4.2억 (수도권 주담대 최대 한도 6억)</li>
                    <li>· <strong>수도권·규제지역(조정·투기과열)</strong>: LTV 70% × 6억 = 4.2억 (수도권 주담대 최대 한도 6억)</li>
                  </ul>
                  <p className="mt-3 text-sm text-text-secondary">
                    <strong>스트레스 DSR 적용</strong>(약정 4.5% 30년 변동, DSR 40%):
                    수도권·규제지역 변동형은 산정 7.5% → DSR 한도 약 <strong>2억 8,603만 원</strong> (DSR 결정적 제약).
                    수도권 비규제도 변동 스트레스가 적용되어 산정 7.5% → 약 2억 8,603만 원.
                    지방 비규제는 변동 스트레스가 0.75%p 유예 적용(2026-12-31까지)되어 산정 5.25% → 약 3억 6,218만 원.
                    전 기간 고정형이면 스트레스 가산 없이 산정 4.5% → 약 3억 9,470만 원까지 가능합니다(LTV 한도 내).{' '}
                    <Link href="/calculator/loan-limit/" className="text-primary-600 underline dark:text-primary-500">
                      대출한도 계산기에서 직접 확인
                    </Link>.
                  </p>
                </div>

                <div className="rounded-lg border border-border-base bg-bg-card p-5">
                  <h3 className="mb-2 font-semibold text-text-primary">시나리오 2. 12억 주택 매매 (처분조건부 1주택·연소득 1.2억 원, 약정 4.5% 30년 변동)</h3>
                  <ul className="text-sm text-text-secondary space-y-1">
                    <li>· <strong>지방 비규제</strong>: LTV 70% × 12억 = 8.4억. DSR 산정 5.25% 한도 약 7억 2,400만 원 → 최종 약 7억 2,400만 원</li>
                    <li>· <strong>수도권 비규제</strong>: LTV 70% × 12억 = 8.4억, 수도권 주담대 최대 한도 6억, DSR 산정 7.5% 한도 약 5억 7,200만 원 → 최종 약 5억 7,200만 원</li>
                    <li>· <strong>수도권·규제지역(조정·투기과열)</strong>: LTV 40% × 12억 = 4.8억, 주담대 최대 한도 6억, DSR 산정 7.5% 한도 약 5억 7,200만 원 → 최종 4.8억 (LTV가 결정적 제약)</li>
                  </ul>
                </div>

                <div className="rounded-lg border-l-2 border-l-danger-500 bg-danger-500/5 p-4">
                  <p className="text-sm text-danger-700 dark:text-danger-300">
                    <strong>다주택자 주의</strong>: 2025년 6월 28일부터 수도권·규제지역에서는 2주택 이상 보유자의 신규 주택구입 주담대가 불가합니다.
                    처분조건부 1주택(기존 주택을 6개월 안에 파는 조건)은 무주택자와 같은 LTV(규제지역 40%, 그 밖의 수도권 70%)를 받고,
                    집을 산 뒤 6개월 안에 전입해야 합니다.
                    지방 비규제에서는 일반 LTV가 적용되지만 기존 대출 누적으로 DSR이 결정적 제약이 되기 쉽습니다.
                  </p>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">스트레스 DSR, 변동금리 한도 큰 영향</h2>
                <p className="text-text-secondary leading-relaxed">
                  2025년 10월 16일부터 수도권·규제지역 주담대 스트레스 금리가 변동형 3.0%p, 혼합형(5년 고정) 2.4%p,
                  주기형(5년) 1.2%p로 상향됐습니다. 같은 약정 4.5% 30년 수도권·규제지역 조건에서도 고정 vs 변동
                  한도 차이가 약 27%까지 벌어집니다. 지방 변동 주담대는 2단계 수준의 유예(약 0.75%p)가 2026년 12월 31일까지 적용됩니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="sr-only">수도권·규제지역 주담대 금리 유형별 DSR 한도 (연소득 6,000만 원, 약정 4.5%, 30년, 은행 DSR 40%)</caption>
                    <thead>
                      <tr className="bg-primary-500/10 border border-border-base">
                        <th className="px-3 py-2 text-left">금리 유형</th>
                        <th className="px-3 py-2 text-right">DSR 산정 금리</th>
                        <th className="px-3 py-2 text-right">연소득 6,000만 원 기준 한도</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border border-border-base">
                        <td className="px-3 py-2">전 기간 고정</td>
                        <td className="px-3 py-2 text-right">4.5% (스트레스 없음)</td>
                        <td className="px-3 py-2 text-right tabular-nums">약 3억 9,470만 원</td>
                      </tr>
                      <tr className="border border-border-base">
                        <td className="px-3 py-2">주기형 (5년)</td>
                        <td className="px-3 py-2 text-right">5.7% (+1.2%p)</td>
                        <td className="px-3 py-2 text-right tabular-nums">약 3억 4,458만 원</td>
                      </tr>
                      <tr className="border border-border-base">
                        <td className="px-3 py-2">혼합형 (5년 고정)</td>
                        <td className="px-3 py-2 text-right">6.9% (+2.4%p)</td>
                        <td className="px-3 py-2 text-right tabular-nums">약 3억 367만 원</td>
                      </tr>
                      <tr className="border border-border-base">
                        <td className="px-3 py-2">변동형</td>
                        <td className="px-3 py-2 text-right">7.5% (+3.0%p)</td>
                        <td className="px-3 py-2 text-right tabular-nums">약 2억 8,603만 원</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-2 text-xs text-text-tertiary">
                  지방 비규제 변동 주담대는 2단계 유예(약 0.75%p, 2026-12-31까지)가 적용되어 같은 조건에서 산정 5.25%, 한도는 약 3억 6,218만 원 수준입니다.
                </p>
              </section>

              <FaqSection items={FAQ_ITEMS} />

              <section className="card border-l-2 border-l-danger-500 bg-danger-500/5">
                <h2 className="mb-2 text-lg font-semibold text-danger-700 dark:text-danger-300">주의사항</h2>
                <ul className="space-y-2 text-sm text-danger-700 dark:text-danger-300">
                  <li>· 본 표는 2026년 10월 14일 기준, 조정대상지역·투기과열지구 지정·해제가 잦으니 거래 직전 확인 필수.</li>
                  <li>· 실제 한도는 금융기관 내부 기준·신용평점·소득 증빙 방식에 따라 달라집니다.</li>
                  <li>· 본 가이드는 일반론이며 개별 상담은 금융기관 또는 모기지 전문가에게 받으세요.</li>
                </ul>
              </section>

              <section className="card">
                <h2 className="mb-3 text-lg font-semibold">관련 도구</h2>
                <ul className="space-y-2 text-sm">
                  <li>→ <Link href="/calculator/loan-limit/" className="text-primary-600 underline dark:text-primary-500">대출한도 계산기 (DSR/LTV/DTI)</Link></li>
                  <li>→ <Link href="/calculator/loan/" className="text-primary-600 underline dark:text-primary-500">대출이자 계산기</Link></li>
                  <li>→ <Link href="/guide/dsr-loan-limit-tips/" className="text-primary-600 underline dark:text-primary-500">DSR 한도 늘리는 5가지 방법</Link></li>
                  <li>→ <Link href="/guide/interest-rate-hike-dsr-loan-limit-july-2026/" className="text-primary-600 underline dark:text-primary-500">7월 금리 인상과 DSR 대출한도 2026</Link>, 금리 인상 시 지역별 한도 변화 시뮬레이션</li>
                  <li>→ <Link href="/glossary/" className="text-primary-600 underline dark:text-primary-500">용어사전, DSR·LTV·DTI·스트레스 DSR</Link></li>
                </ul>
              </section>

              <section
                aria-label="출처 및 면책"
                className="rounded-lg border border-border-base p-4 text-caption text-text-tertiary"
              >
                <p className="mb-2">
                  <strong>법적 근거</strong>: 금융위원회 가계부채 관리방안 (DSR·LTV 기준) · 주택법 §63 (투기과열지구) · 주택법 §63의2 (조정대상지역) ·{' '}
                  <a href="https://www.fss.or.kr/fss/pr/selectPressReleaseView.do?bbsid=99" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-600 underline dark:text-primary-500">금융감독원 주택담보대출 규제 고시</a> ·{' '}
                  <a href="https://www.molit.go.kr/CMS/Board/InformationNoticeList.do?category=Land" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-600 underline dark:text-primary-500">국토교통부 조정대상지역 지정 공시</a> ·{' '}
                  <a href="https://finlife.fss.or.kr/mypl/en/contents/cts/cts0102000000.jsp" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-600 underline dark:text-primary-500">금융감독원 핀라이프 DSR 계산기</a>.
                </p>
                <p><strong>업데이트</strong>: {DATE_MODIFIED}</p>
              </section>
            </article>
          </main>
        </div>
        <Footer />
      </div>
    </>
  );
}
