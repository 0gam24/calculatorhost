// [revenue-lever: indexing+traffic]
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

const URL = 'https://calculatorhost.com/guide/national-pension-income-upper-limit-2026/';
const DATE_PUBLISHED = '2026-07-28';
const DATE_MODIFIED = '2026-07-28';

export const metadata: Metadata = {
  title: '국민연금 상한액 인상 2026, 7월부터 고소득 직장인 보험료',
  description:
    '2026년 7월부터 국민연금 기준소득월액 상한액이 637만원에서 659만원으로 올랐습니다. 상한 소득 가입자의 월 보험료는 최고 626,050원, 직장가입자 본인 부담은 313,025원입니다. 상·하한액 조정 원리를 국민연금법 기준으로 정리했습니다.',
  keywords: [
    '국민연금 상한액',
    '기준소득월액 상한 659만원',
    '국민연금 보험료 인상 7월',
    '고소득 국민연금',
    '국민연금 상한액 하한액',
    '국민연금법 88조',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '국민연금 상한액 인상 2026, 7월부터 고소득 직장인 보험료 변화 정리' }],
    title: '국민연금 상한액 인상 2026, 7월부터 고소득 직장인 보험료',
    description: '기준소득월액 상한 637만원에서 659만원으로 인상. 상한 소득 가입자 월 보험료 626,050원, 직장가입자 본인 313,025원. 국민연금법 §88 기준.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '국민연금 상한액 인상 2026, 상한 소득 보험료 626,050원',
    description: '기준소득월액 상한 659만원, 하한 41만원. 요율 9.5%, 직장가입자 본인 부담 313,025원. 국민연금법 §88·시행령 §5.',
  },
};

const FAQ_ITEMS = [
  {
    question: '국민연금 기준소득월액 상한액이 정확히 무엇인가요?',
    answer:
      '기준소득월액 상한액은 국민연금 보험료를 매길 때 인정되는 소득의 최고 한도입니다. 소득이 아무리 높아도 상한액까지만 보험료 산정 기준으로 반영하며, 근거는 국민연금법 §3①제5호(기준소득월액 정의)와 시행령 §5(상·하한액), §88(연금보험료 부과)입니다. 보건복지부 고시로 매년 조정되고, 새 기준은 그해 7월분 보험료부터 적용됩니다.',
  },
  {
    question: '2026년 7월부터 상한액이 얼마로 올랐나요?',
    answer:
      '2026년 7월부터 상한액은 637만원에서 659만원으로, 하한액은 40만원에서 41만원으로 각각 인상됐습니다. 이 기준은 2027년 6월분 보험료까지 1년간 적용됩니다. 상한액이 오른 만큼 상한 소득 가입자의 보험료 산정 기준액이 커져 월 납부액이 늘어납니다.',
  },
  {
    question: '상한액이 올랐다는 건 무조건 보험료가 오른다는 뜻인가요?',
    answer:
      '아닙니다. 이번 상한 인상은 월 소득이 종전 상한 637만원을 넘던 상위 가입자에게만 영향을 줍니다. 상한 미만 소득자는 자신의 실제 소득에 요율을 곱하므로 상한 조정과 무관합니다. 국민연금공단 통계상 대다수 가입자가 상한 미만이라 이번 조정의 직접 영향은 상위 소득 구간에 집중됩니다.',
  },
  {
    question: '지역가입자도 상한액 조정 영향을 받나요?',
    answer:
      '네, 지역가입자·임의가입자·임의계속가입자도 동일한 기준소득월액 상·하한액을 적용받습니다. 다만 직장가입자와 달리 회사 부담분이 없어 상한 소득 기준 월 626,050원을 전액 본인이 납부합니다. 직장가입자의 본인 부담 313,025원과 비교하면 부담이 두 배이므로 소득 신고 시점에 산정 방식을 확인하는 것이 좋습니다.',
  },
  {
    question: '상한액이 오르면 나중에 받을 연금액도 늘어나나요?',
    answer:
      '기준소득월액이 올라 산정 대상 B값(본인 평균소득)이 커지면 미래 연금 수령액도 소폭 늘어날 수 있습니다. 다만 국민연금 수령액은 A값(전체 가입자 평균소득)과 B값, 가입기간 등이 결합된 별도 산식으로 결정되므로 상한 인상만으로 수령액 증가폭을 단정할 수는 없습니다. 정확한 예상 수령액은 국민연금공단 예상 연금 조회를 이용하세요.',
  },
  {
    question: '내 기준소득월액은 어디서 확인하나요?',
    answer:
      '국민연금공단 홈페이지(nps.or.kr) 또는 The 국민연금 앱에서 로그인 후 가입내역 조회 메뉴에서 확인할 수 있습니다. 직장가입자는 매년 7월 정기결정 시점에 전년도 소득 기준으로 새 기준소득월액이 통지되며, 급여명세서의 국민연금 공제액을 본인 부담률 4.75%로 역산해도 개략 확인이 가능합니다.',
  },
  {
    question: '상한액·하한액은 왜 매년 7월에 조정되나요?',
    answer:
      '보건복지부 고시로 매년 전체 가입자 평균소득 변동률을 반영해 상·하한액을 조정하며, 그 시점이 7월분 보험료부터입니다. 소득 상승세를 반영해 상한과 하한이 함께 오르며, 하한을 두는 이유는 저소득 가입자의 최소 가입기간 인정과 노후 소득보장을 위한 것입니다. 근거는 국민연금법 시행령 §5(기준소득월액 및 적용기간)입니다.',
  },
  {
    question: '상한 소득 가입자가 부담을 줄이는 방법이 있나요?',
    answer:
      '국민연금은 소득 기반 강제가입 사회보험이라 상한 소득 구간에서 부담을 임의로 낮추기는 어렵습니다. 다만 연금저축·IRP 같은 세제혜택 제도를 활용해 연말정산 세액공제를 받거나, 노후 소득 포트폴리오를 다층화해 국민연금 상한 부담의 실질 부담률을 낮추는 접근이 일반적입니다. 개인 상황별 판단은 세무사 상담을 권장합니다.',
  },
];

export default function NationalPensionIncomeUpperLimit2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '국민연금 상한액 인상 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '국민연금 상한액 인상 2026, 7월부터 달라진 고소득자 보험료',
    description:
      '2026년 7월부터 국민연금 기준소득월액 상한액이 637만원에서 659만원으로, 하한액은 40만원에서 41만원으로 인상. 상한 소득 가입자 월 보험료 626,050원, 직장가입자 본인 313,025원. 국민연금법 §88·시행령 §5 기준.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['국민연금 상한액', '기준소득월액 659만원', '국민연금 보험료 인상 7월', '고소득 국민연금', '국민연금법 88조'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '국민연금 상한액 인상 2026',
    description:
      '2026년 7월 국민연금 기준소득월액 상한액 659만원 인상의 계산 원리와 직장·지역가입자 부담 차이 정리.',
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
                    { name: '국민연금 상한액 인상 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">직장인·고소득 가입자 · 7분 읽기 · 2026-07-28</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  국민연금 상한액 인상 2026
                  <br />
                  <span className="text-2xl text-text-secondary">, 7월부터 달라진 고소득자 보험료</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  2026년 7월분 국민연금 보험료부터 기준소득월액 상한액이 637만원에서 659만원으로 올랐습니다. 월 소득이 상한을 넘던 고소득 직장인과 지역가입자는 이번 조정으로 월 납부액이 늘어납니다. 이 가이드는 새 상한 아래에서 월 보험료가 정확히 얼마가 되는지, 직장가입자와 지역가입자의 부담이 어떻게 다른지, 조정된 기준이 미래 연금 수령액에 어떤 영향을 미치는지 국민연금법 조항을 근거로 정리합니다.
                </p>
              </header>

              <AdSlot slot="guide-national-pension-income-upper-limit-top" format="horizontal" />

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">국민연금 기준소득월액 상한액이란?</h2>
                <p>
                  기준소득월액 상한액은 국민연금 보험료를 매길 때 인정되는 소득의 최고 한도입니다. 소득이 아무리 높아도 상한액까지만 보험료 산정 기준으로 인정하며, 반대로 소득이 아무리 낮아도 하한액까지는 보장해 최소 가입 요건을 유지합니다. 근거는 국민연금법 §3①제5호(기준소득월액 정의)와 시행령 §5(상·하한액), §88(연금보험료 부과)이며, 매년 보건복지부 고시로 조정됩니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">상한·하한액의 기본 원리</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    보험료 = 기준소득월액 × 연금보험료율 (2026년 7월분 기준 9.5%, 국민연금법 §88)
                    <br />
                    2026년 7월부터 상한액 659만원, 하한액 41만원
                    <br />
                    · 월 소득 800만원 가입자: 기준소득월액은 상한 659만원으로 확정
                    <br />
                    · 월 소득 500만원 가입자: 기준소득월액은 실제 소득 500만원 그대로 반영
                  </p>
                </div>
                <p className="mt-4">
                  즉 상한액은 고소득자의 보험료가 무한정 커지지 않도록 하는 상한선이고, 하한액은 극저소득 가입자의 연금 산정 기반이 지나치게 축소되지 않도록 하는 안전판입니다. 두 값은 서로 짝을 이뤄 국민연금이 소득 재분배와 노후 소득보장이라는 사회보험 원리를 유지하도록 설계돼 있습니다.
                </p>
                <p className="mt-4">
                  다만, 상한액은 실제 소득 자체를 제한하는 것이 아니라 국민연금 보험료 부과 기준을 제한하는 개념입니다. 상한 초과 소득이 사라지는 것이 아니라 국민연금 산정에서만 제외될 뿐이며, 소득세·건강보험·고용보험은 각각 별도 기준으로 계산됩니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">2026년 7월 상한액은 얼마인가요?</h2>
                <p>
                  2026년 7월분 보험료부터 기준소득월액 상한액은 <strong>659만원</strong>, 하한액은 <strong>41만원</strong>입니다. 이 기준은 2027년 6월분 보험료까지 1년간 유지됩니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 국민연금 기준소득월액 상·하한액 조정 (보건복지부 고시, 2026-07 시행, 국민연금법 시행령 §5)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">구분</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">2026년 6월까지</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">2026년 7월부터</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">인상폭</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">상한액</td>
                        <td className="p-3">637만원</td>
                        <td className="p-3"><strong>659만원</strong></td>
                        <td className="p-3">+22만원 (약 3.5%)</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">하한액</td>
                        <td className="p-3">40만원</td>
                        <td className="p-3"><strong>41만원</strong></td>
                        <td className="p-3">+1만원 (약 2.5%)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  상한액 인상 배경에는 최근 몇 년간의 임금 상승세가 있습니다. 국민연금 재정 안정성 확보와 상위 소득 가입자의 노후 연금액 산정 기반 확대라는 두 가지 정책 목적이 함께 작용해 상한액이 조정됩니다.
                </p>
                <p className="mt-4">
                  예외: 7월분 보험료부터 새 상한이 적용되므로 2026년 6월분까지 이미 부과·납부한 보험료는 종전 상한 637만원 기준을 따릅니다. 통상 7월분 부과 내역은 8월 10일경 납부고지에 반영됩니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">상한 소득이면 보험료가 얼마나 오르나요?</h2>
                <p>
                  상한 소득 가입자의 월 총 연금보험료는 <strong>659만원 × 9.5% = 626,050원</strong>입니다(국민연금법 §88). 직장가입자는 회사와 절반씩 부담하므로 본인 부담은 <strong>313,025원</strong>(4.75%), 지역가입자·임의가입자·임의계속가입자는 626,050원 전액을 본인이 부담합니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 1. 월 소득 800만원 상한 소득 직장가입자</p>
                  <p className="text-sm text-text-secondary">
                    · 실제 소득: 월 800만원
                    <br />
                    · 기준소득월액: 상한 <strong>659만원</strong>으로 확정 (800만원 아님)
                    <br />
                    · 총 연금보험료: 659만 × 9.5% = <strong>626,050원</strong>
                    <br />
                    · 회사 부담: 659만 × 4.75% = 313,025원
                    <br />
                    · 본인 부담: 659만 × 4.75% = <strong>313,025원</strong>
                    <br />
                    · 종전 6월분 대비 본인 부담 증가: 637만 × 4.75% = 302,575원에서 313,025원으로 월 10,450원 증가
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 2. 월 소득 500만원 상한 미만 직장가입자</p>
                  <p className="text-sm text-text-secondary">
                    · 실제 소득: 월 500만원
                    <br />
                    · 기준소득월액: 실제 소득 <strong>500만원</strong> 그대로 반영 (상한과 무관)
                    <br />
                    · 총 연금보험료: 500만 × 9.5% = 475,000원
                    <br />
                    · 본인 부담: 500만 × 4.75% = <strong>237,500원</strong>
                    <br />
                    · 상한 조정 영향: 없음 (상한 미만 소득이므로 상한 인상과 무관)
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 3. 월 소득 660만원 상한 경계 지역가입자</p>
                  <p className="text-sm text-text-secondary">
                    · 실제 소득: 월 660만원
                    <br />
                    · 기준소득월액: 상한 <strong>659만원</strong>으로 확정 (660만원 그대로 아님)
                    <br />
                    · 총 연금보험료: 659만 × 9.5% = <strong>626,050원</strong>
                    <br />
                    · 본인 부담: 지역가입자이므로 전액 <strong>626,050원</strong>
                    <br />
                    · 참고: 종전 6월분까지는 상한 637만 적용으로 605,150원이었기에 월 20,900원 인상 효과
                  </p>
                </div>
                <p className="mt-4">
                  다만, 이 인상은 상한 소득 구간 근로자·지역가입자에게만 해당합니다. 대다수 가입자는 상한 미만이라 이번 상한 조정에 따른 직접적인 월 보험료 증가는 발생하지 않습니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">직장가입자·지역가입자 부담 차이</h2>
                <p>
                  같은 기준소득월액이라도 가입자 종류에 따라 실제 본인 부담액은 크게 다릅니다. 직장가입자는 회사와 절반씩 부담하지만, 지역가입자·임의가입자·임의계속가입자는 전액을 본인이 냅니다(국민연금법 §88).
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 2. 상한 소득 기준 가입자 종류별 월 보험료 부담 (기준소득월액 659만원, 요율 9.5%, 국민연금법 §88)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">가입자 종류</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">총 보험료</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">본인 부담</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">회사 부담</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">직장가입자</td>
                        <td className="p-3">626,050원</td>
                        <td className="p-3"><strong>313,025원</strong> (4.75%)</td>
                        <td className="p-3">313,025원 (4.75%)</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">지역가입자</td>
                        <td className="p-3">626,050원</td>
                        <td className="p-3"><strong>626,050원</strong> (9.5%)</td>
                        <td className="p-3">없음</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">임의가입자</td>
                        <td className="p-3">626,050원</td>
                        <td className="p-3"><strong>626,050원</strong> (9.5%)</td>
                        <td className="p-3">없음</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">임의계속가입자</td>
                        <td className="p-3">626,050원</td>
                        <td className="p-3"><strong>626,050원</strong> (9.5%)</td>
                        <td className="p-3">없음</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  지역가입자·임의가입자·임의계속가입자는 상한 소득 구간에서 월 62만원대를 전액 본인이 부담해야 하므로 상한 조정의 체감 영향이 직장가입자보다 두 배가량 큽니다. 자영업자, 프리랜서, 60세 이후 임의계속가입자는 소득 신고 시점에 기준소득월액이 확정되므로 신고 소득 관리에 주의가 필요합니다.
                </p>
                <p className="mt-4">
                  다만, 임의계속가입자는 60세에 국민연금 의무가입이 끝난 이후에도 최소 가입기간(10년) 충족 또는 연금액 증대를 위해 선택적으로 가입하는 제도입니다. 상한 소득 부담이 크다면 자신의 실소득에 맞춰 하한액 이상 범위에서 신고 소득을 조정하는 방식이 가능하며, 이 경우 미래 연금 수령액도 함께 조정된다는 점을 감안해야 합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">왜 매년 7월에 조정되나요?</h2>
                <p>
                  국민연금 기준소득월액 상·하한액은 매년 7월분 보험료부터 새 기준이 적용됩니다. 근거는 국민연금법 시행령 §5에 따른 보건복지부 고시이며, 조정 기준은 전체 가입자 평균소득 변동률입니다.
                </p>
                <p className="mt-4">
                  즉 국민 전체의 소득이 오르면 그 변동률만큼 상한과 하한도 함께 조정되어, 국민연금이 시대의 소득 수준을 계속 반영하도록 설계돼 있습니다. 이 방식은 국민연금법 도입 이후 유지돼 온 원칙으로, 연금 재정의 지속성과 노후 소득보장 실효성을 동시에 확보하기 위한 것입니다.
                </p>
                <p className="mt-4">
                  또 7월을 조정 시점으로 삼는 이유는 매년 5월 종합소득세 신고와 연말정산이 마무리된 뒤 소득 자료 정합성이 가장 높은 시점이 6~7월이기 때문입니다. 직장가입자는 7월 정기결정을 통해 전년도 소득 기준의 새 기준소득월액이 통지되며, 지역가입자는 소득 신고에 따라 재산정됩니다.
                </p>
                <p className="mt-4">
                  다만, 조정 폭은 매년 다릅니다. 임금 상승세가 완만한 해에는 인상 폭이 1~2% 수준에 그치기도 하고, 큰 폭 인상이 있는 해에는 3~4%대로 조정되기도 합니다. 2026년 7월 조정은 상한액 기준 약 3.5% 인상으로 최근 임금 상승세를 반영한 결과입니다.
                </p>
              </section>

              <AdSlot slot="guide-national-pension-income-upper-limit-mid" format="rectangle" />

              <section className="space-y-6 border-t border-border-base pt-8" data-speakable>
                <h2 className="text-2xl font-bold">상한액 인상이 미래 연금 수령액에 미치는 영향</h2>
                <p>
                  기준소득월액이 오르면 미래에 받을 국민연금 수령액도 함께 커질 가능성이 있습니다. 국민연금 수령액은 A값(전체 가입자 평균소득)과 B값(본인 가입기간 평균소득)을 결합한 산식으로 결정되는데, 상한액 인상으로 상위 소득 가입자의 B값 상한이 올라가기 때문입니다.
                </p>
                <p className="mt-4">
                  구체적으로 종전 상한 637만원 아래에서 계속 가입해 온 상위 소득자는 매년 소득 기록의 상한이 낮게 잡혀 있었지만, 2026년 7월 이후로는 최대 659만원까지 기록될 수 있습니다. 이 차이가 20~30년 누적되면 노후 연금액에도 의미 있는 차이를 만들 수 있습니다.
                </p>
                <p className="mt-4">
                  다만, 국민연금 수령액은 상한액 하나만으로 결정되지 않습니다. 가입기간, 평균소득 재평가율, A값 변동, 연금 지급률 등이 복합적으로 작용하므로 상한 인상이 곧바로 몇 만원의 수령액 증가로 이어진다고 단정할 수는 없습니다. 실제 예상 수령액은 국민연금공단 예상 연금 조회 서비스에서 개별 확인이 필요합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">내 기준소득월액·보험료 확인 방법</h2>
                <p>
                  자신의 기준소득월액과 월 납부 보험료는 다음 세 가지 경로 중 어디에서든 확인할 수 있습니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">방법 1. 국민연금공단 홈페이지 (nps.or.kr)</p>
                  <p className="text-sm text-text-secondary">
                    국민연금공단 홈페이지에서 공동인증서 또는 간편인증으로 로그인 후 가입내역 조회 메뉴에 들어가면 현재 기준소득월액, 월 보험료, 누적 가입기간을 한눈에 확인할 수 있습니다. 예상 연금액 조회 메뉴에서 노후 수령 시뮬레이션도 가능합니다.
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">방법 2. The 국민연금 앱</p>
                  <p className="text-sm text-text-secondary">
                    국민연금공단 공식 모바일 앱에서 로그인 후 가입내역과 납부 이력을 확인할 수 있으며, 최근 6개월 납부 명세와 다음 달 예상 부과액이 표시됩니다. 상한 조정 이후 7월분 부과액이 반영되는 것을 앱에서 바로 확인할 수 있습니다.
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">방법 3. 급여명세서 역산</p>
                  <p className="text-sm text-text-secondary">
                    직장가입자는 급여명세서의 국민연금 공제액을 본인 부담률 4.75%(2026년 7월분 기준, 국민연금법 §88)로 나누면 기준소득월액을 산출할 수 있습니다. 예: 공제액 250,000원이면 기준소득월액은 약 526만원입니다. 정밀 계산이 어렵다면 아래 관련 계산기 링크를 이용하세요.
                  </p>
                </div>
                <p className="mt-4">
                  다만, 국민연금공단 웹서비스와 앱 이용 시 공동인증서 또는 간편인증 등록이 필요하며, 지역가입자의 소득 신고 반영은 신고 시점에 따라 다음 달 부과분부터 적용됩니다.
                </p>
              </section>

              <h2 className="text-2xl font-bold mb-6">자주 묻는 질문</h2>
              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h3 className="text-lg font-semibold text-text-primary">관련 계산기 및 가이드</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link
                    href="/guide/national-pension-premium-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">국민연금 보험료 2026 계산법</div>
                    <p className="mt-1 text-sm text-text-secondary">기준소득월액과 요율의 기본 산정 원리 정리.</p>
                  </Link>
                  <Link
                    href="/guide/national-pension-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">국민연금 2026 종합 가이드</div>
                    <p className="mt-1 text-sm text-text-secondary">가입 대상, 요율, 수령액까지 국민연금 전체 이해.</p>
                  </Link>
                  <Link
                    href="/guide/four-major-insurance-rates-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">4대보험 요율 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">국민연금·건강보험·고용보험·산재보험 요율 총정리.</p>
                  </Link>
                  <Link
                    href="/guide/salary-take-home-2026-july-insurance-increase/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">7월 4대보험 인상과 실수령액</div>
                    <p className="mt-1 text-sm text-text-secondary">7월 요율·상한 조정이 월 급여에 미치는 실제 영향.</p>
                  </Link>
                  <Link
                    href="/calculator/salary/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">연봉 실수령액 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">4대보험·소득세 자동 반영 세후 월급 확인.</p>
                  </Link>
                  <Link
                    href="/category/work/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">근로 계산기 모음</div>
                    <p className="mt-1 text-sm text-text-secondary">연봉·퇴직금·주휴수당·야근수당 등 근로 관련 도구.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 교육 목적으로 작성되었으며, 개인 맞춤형 재무·연금 조언이 아닙니다. 실제 기준소득월액, 월 보험료, 상·하한 적용 여부는 국민연금공단 가입내역 조회 또는 관할 지사에서 반드시 확인하세요. 미래 연금 수령액은 가입기간, A값·B값, 재평가율 등이 복합적으로 작용하므로 상한 인상만으로 단정할 수 없습니다. 본 콘텐츠는 2026-07-28을 기준으로 작성됐으며, 보건복지부 고시 및 국민연금법 개정 시 즉시 업데이트됩니다. 인용 법조항은 <strong>국민연금법 §88(연금보험료 부과), §3①제5호(기준소득월액 정의), 시행령 §5(상·하한액)</strong>입니다. AI 보조 작성 후 운영자 검수 완료.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터 국민연금법</a>,{' '}
                  <a href="https://www.nps.or.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">국민연금공단</a>,{' '}
                  <a href="https://www.mohw.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">보건복지부</a>.
                </p>
              </section>

              <ShareButtons
                title="국민연금 상한액 인상 2026 가이드"
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
