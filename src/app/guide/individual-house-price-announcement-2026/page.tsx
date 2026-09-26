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

const URL = 'https://calculatorhost.com/guide/individual-house-price-announcement-2026/';
const DATE_PUBLISHED = '2026-09-27';
const DATE_MODIFIED = '2026-09-27';

export const metadata: Metadata = {
  title: '개별주택가격 공시 2026, 재산세·종부세에 미치는 영향',
  description:
    '개별주택가격은 매년 1월 1일 기준으로 산정되어 4월 30일 결정·공시되며, 재산세·종합부동산세는 물론 상속·증여재산 평가와 건강보험료 산정에도 그대로 쓰이는 시가표준액입니다. 공시 절차와 30일 이의신청 기한을 부동산 가격공시에 관한 법률 §17·지방세법 §110 기준으로 정리했습니다.',
  keywords: [
    '개별주택가격',
    '개별주택가격 공시',
    '개별주택가격 조회',
    '표준주택가격 차이',
    '개별주택가격 재산세',
    '공시가격 종합부동산세',
    '부동산 가격공시에 관한 법률 17조',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '개별주택가격 공시 2026, 재산세·종부세에 미치는 영향' }],
    title: '개별주택가격 공시 2026, 재산세·종부세에 미치는 영향',
    description: '매년 1월 1일 기준 산정, 4월 30일 결정·공시. 재산세·종부세·상속증여 평가·건보료까지 반영되는 시가표준액 구조 정리.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '개별주택가격 공시 2026, 재산세·종부세 영향',
    description: '4월 30일 결정·공시, 30일 이의신청. 부동산 가격공시에 관한 법률 §17, 지방세법 §110 기준.',
  },
};

const FAQ_ITEMS = [
  {
    question: '개별주택가격은 어디서 확인하나요?',
    answer:
      '부동산공시가격알리미(realtyprice.kr) 또는 관할 시·군·구청 홈페이지에서 무료로 확인할 수 있습니다. 주소만 입력하면 연도별 개별주택가격이 조회되며, 매년 4월 30일 전후로 그 해 공시가격이 새로 게시됩니다. 정확한 최신 값은 반드시 공시일 이후에 조회하세요.',
  },
  {
    question: '개별주택가격과 실거래가는 다른가요?',
    answer:
      '다릅니다. 실거래가는 실제 매매된 계약금액이고, 개별주택가격은 표준주택가격을 기준으로 비준표를 적용해 산정한 시가표준액입니다(부동산 가격공시에 관한 법률 §17). 실제 시세보다 낮게 형성되는 경우가 많아 재산세·종부세 부담을 실거래가 기준보다 완화하는 역할도 합니다.',
  },
  {
    question: '개별주택가격이 오르면 세금도 그만큼 오르나요?',
    answer:
      '대체로 오르지만 비례하지는 않습니다. 재산세·종부세는 공시가격에 공정시장가액비율을 곱한 과세표준에 누진세율을 적용하므로, 공시가격 상승분보다 세액 증가율이 더 크거나 작을 수 있습니다. 1세대1주택 특례나 공제금액 구간을 새로 넘는지도 함께 확인해야 합니다.',
  },
  {
    question: '아파트도 개별주택가격의 적용 대상인가요?',
    answer:
      '아닙니다. 아파트·연립주택 등 공동주택은 국토교통부가 공동주택가격으로 별도 공시하며, 개별주택가격은 단독주택·다가구주택·다중주택만을 대상으로 시장·군수·구청장이 결정·공시합니다. 두 가격 모두 지방세법 §4에 따라 시가표준액으로 쓰인다는 점은 동일합니다.',
  },
  {
    question: '개별주택가격에 이의신청하면 반드시 낮아지나요?',
    answer:
      '아닙니다. 재조사·검증 결과 이의신청 내용이 타당하다고 인정될 때만 가격이 조정되며, 조사 결과에 따라 그대로 유지되거나 오히려 오를 수도 있습니다. 이의신청 자체가 세금 감면을 보장하지 않는다는 점을 유의해야 합니다.',
  },
  {
    question: '개별주택가격은 건강보험료에도 영향을 미치나요?',
    answer:
      '네, 영향을 미칩니다. 지역가입자의 재산 보험료 산정과 피부양자 자격의 재산 과표 요건에 주택 공시가격이 그대로 반영되므로, 공시가격이 오르면 건강보험료가 함께 오르거나 피부양자 자격을 잃을 수 있습니다. 구체적 기준은 국민건강보험공단에서 확인하는 것이 정확합니다.',
  },
];

export default function IndividualHousePriceAnnouncement2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '개별주택가격 공시 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '개별주택가격 공시 2026, 재산세·종부세에 미치는 영향',
    description:
      '매년 1월 1일 기준 산정, 4월 30일 결정·공시되는 개별주택가격이 재산세·종합부동산세·상속증여 평가·건강보험료에 어떻게 반영되는지, 30일 이의신청 절차와 표준주택가격과의 차이를 부동산 가격공시에 관한 법률 §16·§17, 지방세법 §4·§110 기준으로 정리.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['개별주택가격', '표준주택가격', '재산세 과세표준', '종합부동산세', '시가표준액'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '개별주택가격 공시 2026',
    description:
      '개별주택가격의 공시 절차·일정, 재산세·종부세·상속증여 평가에서의 활용, 30일 이의신청 방법을 정리한 가이드.',
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
                    { name: '개별주택가격 공시 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">부동산 보유자 · 8분 읽기 · 2026-09-27</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  개별주택가격 공시 2026
                  <br />
                  <span className="text-2xl text-text-secondary">· 재산세·종부세에 미치는 영향</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  개별주택가격은 단독주택·다가구주택 한 채마다 시장·군수·구청장이 매년 새로 결정·공시하는 가격으로, 재산세와 종합부동산세의 과세표준은 물론 상속·증여재산 평가와 건강보험료 산정까지 그대로 쓰이는 시가표준액입니다. 이 가이드는 개별주택가격의 공시 절차와 일정, 각 세목에 반영되는 방식, 30일 이의신청 방법을 정리합니다. 대상 독자는 단독·다가구주택을 보유한 납세자입니다.
                </p>
              </header>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">개별주택가격이란 무엇인가요?</h2>
                <p>
                  개별주택가격은 단독주택·다가구주택·다중주택 한 채마다 매년 1월 1일을 기준으로 산정해 시장·군수·구청장이 결정·공시하는 가격입니다. 국토교통부가 먼저 지역별 대표 주택을 골라 표준주택가격을 공시하면, 시·군·구가 이 표준주택가격에 가격형성요인 비준표를 적용해 관내 개별주택 하나하나의 가격을 산정합니다(부동산 가격공시에 관한 법률 §16·§17).
                </p>
                <p>
                  아파트·연립주택 같은 공동주택은 개별주택가격이 아니라 국토교통부가 직접 공시하는 공동주택가격을 적용받습니다. 즉 개별주택가격은 공동주택을 제외한 단독계열 주택만의 가격 체계입니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">30초 요약</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    정의: 단독·다가구주택 한 채마다 시·군·구가 매년 결정·공시하는 시가표준액.
                    <br />
                    공시기준일: 매년 1월 1일 / 공시일: 4월 30일(부동산 가격공시에 관한 법률 §17).
                    <br />
                    용도: 재산세·종합부동산세 과세표준, 상속·증여재산 평가, 건강보험료 산정.
                    <br />
                    이의신청: 공시일부터 30일 이내 서면(§17이 준용하는 §11).
                  </p>
                </div>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">개별주택가격은 언제, 어떻게 공시되나요?</h2>
                <p>
                  2026년의 경우 국토교통부가 1월 1일 기준 표준주택 25만 호의 가격을 조사해 1월 23일 관보에 공시했고(전국 평균 2.51% 상승), 이를 기준으로 각 시·군·구가 관내 개별주택가격을 4월 30일 결정·공시했습니다. 공시와 동시에 4월 30일부터 5월 29일까지 한 달간 소유자·이해관계인의 열람 및 이의신청 기간이 함께 운영됩니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 2026년 개별주택가격 공시 일정 (부동산 가격공시에 관한 법률 §16·§17)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">단계</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">시기</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">내용</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">공시기준일</td>
                        <td className="p-3">1월 1일</td>
                        <td className="p-3">해당 시점 주택 상태 기준으로 가격 산정</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">표준주택가격 공시</td>
                        <td className="p-3">1월 하순</td>
                        <td className="p-3">국토교통부가 대표 표준주택 가격 공시</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">개별주택가격 결정·공시</td>
                        <td className="p-3">4월 30일</td>
                        <td className="p-3">시·군·구가 관내 개별주택 가격 확정</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">열람·이의신청</td>
                        <td className="p-3">4월 30일 ~ 5월 29일</td>
                        <td className="p-3">소유자·이해관계인 서면 이의신청</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">조정·재공시</td>
                        <td className="p-3">6월 26일경</td>
                        <td className="p-3">타당성 인정 건에 한해 가격 재조정</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  다만, 신축이라 아직 개별주택가격이 공시되지 않은 주택은 지방자치단체장이 거래가격·신축가격 등을 고려해 별도로 시가표준액을 결정합니다(지방세법 §4①). 공시 시점과 실제 취득·보유 시점이 어긋나는 경우 이 예외 규정을 확인해야 합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">개별주택가격은 어떤 세금에 쓰이나요?</h2>
                <p>
                  개별주택가격은 재산세·종합부동산세의 과세표준을 산정하는 시가표준액으로 쓰이는 것이 가장 큰 용도입니다(지방세법 §4①). 이 외에도 상속·증여재산의 보충적 평가, 취득 당시 실거래가가 확인되지 않는 주택의 취득세 과세표준, 지역가입자 건강보험료의 재산 점수 산정에도 그대로 활용됩니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 2. 개별주택가격이 반영되는 세목·제도</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">세목·제도</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">반영 방식</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">근거</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">재산세</td>
                        <td className="p-3">과세표준 = 공시가격 × 공정시장가액비율</td>
                        <td className="p-3">지방세법 §110①</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">종합부동산세</td>
                        <td className="p-3">인별 합산 공시가격 - 공제금액에 비율 적용</td>
                        <td className="p-3">종합부동산세법 §8①</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">상속·증여세</td>
                        <td className="p-3">매매사례가 없을 때 보충적 평가액으로 사용</td>
                        <td className="p-3">상속세및증여세법 §61①</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">건강보험료</td>
                        <td className="p-3">지역가입자 재산 점수·피부양자 재산 요건</td>
                        <td className="p-3">국민건강보험법 시행령</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  예외: 취득세는 원칙적으로 실제 취득가액(실거래가)을 과세표준으로 하며, 실거래가가 확인되지 않을 때만 시가표준액인 개별주택가격을 보충적으로 사용합니다. 취득세까지 개별주택가격이 항상 기준이 되는 것은 아니라는 점에 유의해야 합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">재산세는 개별주택가격으로 어떻게 계산되나요?</h2>
                <p>
                  재산세 과세표준은 개별주택가격에 공정시장가액비율을 곱해 산정합니다(지방세법 §110①). 2026년 기준 이 비율은 60% 수준으로 적용되며, 해당 과세표준에 누진세율을 곱하고 누진공제를 차감해 재산세액이 결정됩니다. 공정시장가액비율은 행정안전부가 매년 부동산 시장 상황을 고려해 고시하므로 연도별로 달라질 수 있습니다.
                </p>
                <p>
                  예를 들어 개별주택가격 5억원인 단독주택이라면, 과세표준은 5억원 × 60% = 3억원이 되고, 이 3억원에 재산세 누진세율(지방세법 §111)을 적용해 세액을 계산합니다. 1세대1주택으로서 공시가격 9억원 이하라면 별도의 특례세율(지방세법 §111의2)이 적용되어 세부담이 줄어듭니다.
                </p>
                <p className="mt-4">
                  다만, 재산세는 개별주택가격이 오른 해라도 직전 연도 대비 세액이 일정 비율을 넘어 급등하지 않도록 세부담 상한 제도를 함께 적용합니다. 공시가격만 보고 세액을 단순 비례 계산하면 실제와 차이가 날 수 있습니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">종합부동산세에는 어떻게 반영되나요?</h2>
                <p>
                  종합부동산세는 한 사람이 보유한 전국 주택의 개별주택가격·공동주택가격을 모두 합산한 뒤, 공제금액을 차감하고 공정시장가액비율을 곱해 과세표준을 산정합니다(종합부동산세법 §8①). 공제금액은 1세대1주택자 12억원, 법인은 0원, 그 외는 9억원입니다.
                </p>
                <p>
                  즉 개별주택가격 자체가 오르면 합산 공시가격이 올라가 공제금액 초과분이 커지므로 종부세 부담이 늘어날 가능성이 높습니다. 반대로 공시가격이 공제금액 이하로 유지되면 종부세 과세 대상에서 아예 제외됩니다.
                </p>
                <p className="mt-4">
                  다만, 종부세는 재산세로 이미 낸 세액 일부를 이중과세 조정으로 공제해 주므로, 개별주택가격 상승이 재산세와 종부세 모두에서 그대로 두 배로 부담되지는 않습니다. 정확한 세액은 <Link href="/calculator/comprehensive-property-tax/" className="text-primary-500 underline">종합부동산세 계산기</Link>로 확인하는 것이 가장 정확합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">개별주택가격에 이의가 있으면 어떻게 하나요?</h2>
                <p>
                  개별주택가격에 이의가 있는 소유자·이해관계인은 결정·공시일부터 30일 이내에 서면으로 시장·군수·구청장에게 이의신청을 할 수 있습니다. 이는 개별공시지가 이의신청 규정을 준용한 것으로(부동산 가격공시에 관한 법률 §17이 준용하는 §11), 신청 후 기간 만료일부터 30일 이내에 재조사·검증을 거쳐 결과가 서면으로 통지됩니다.
                </p>
                <p>
                  신청이 타당하다고 인정되면 해당 개별주택가격이 조정되어 다시 결정·공시됩니다(§17이 준용하는 §12). 절차와 서류는 개별공시지가 이의신청과 사실상 동일하며, 인근 유사 주택과의 가격 형평성이나 면적·구조 오류를 근거로 제시하는 것이 일반적입니다.
                </p>
                <p className="mt-4">
                  예외: 열람·이의신청 기간을 놓쳤더라도 명백한 오류(면적 오기, 용도 오분류 등)가 있다면 정정 신청 제도를 통해 별도로 바로잡을 수 있는 경우가 있습니다. 다만 이는 정식 이의신청과 요건이 다르므로 관할 시·군·구 세무과에 개별 확인이 필요합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">표준주택가격과 개별주택가격, 무엇이 다른가요?</h2>
                <p>
                  표준주택가격은 국토교통부가 전국에서 대표성 있는 주택 일부(25만 호 수준)를 골라 직접 조사·공시하는 기준 가격이고, 개별주택가격은 이 표준주택가격을 기준으로 시·군·구가 관내 모든 개별 주택에 가격형성요인 비준표를 적용해 산정한 가격입니다(부동산 가격공시에 관한 법률 §16·§17).
                </p>
                <p>
                  일반 납세자가 재산세·종부세 고지서에서 실제로 마주하는 것은 표준주택가격이 아니라 개별주택가격입니다. 표준주택가격은 개별주택가격 산정의 기준점 역할만 할 뿐, 직접 과세표준으로 쓰이지는 않습니다.
                </p>
                <p className="mt-4">
                  다만, 자신의 주택이 우연히 표준주택으로 선정된 경우에는 표준주택가격 자체가 곧 그 주택의 개별주택가격이 됩니다. 이 경우 표준주택가격에 대한 의견제출·이의신청 절차를 따로 확인해야 합니다.
                </p>
              </section>

              <h2 className="text-2xl font-bold mb-6">자주 묻는 질문</h2>
              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h3 className="text-lg font-semibold text-text-primary">관련 계산기 및 가이드</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link
                    href="/calculator/property-tax/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">재산세 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">개별주택가격을 입력해 예상 재산세를 계산해보세요.</p>
                  </Link>
                  <Link
                    href="/calculator/comprehensive-property-tax/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">종합부동산세 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">보유 주택 공시가격을 합산해 종부세를 시뮬레이션합니다.</p>
                  </Link>
                  <Link
                    href="/guide/property-tax-objection-appeal-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">재산세 이의신청 절차</div>
                    <p className="mt-1 text-sm text-text-secondary">고지된 재산세 자체에 이의가 있을 때의 절차 비교.</p>
                  </Link>
                  <Link
                    href="/guide/official-land-price-objection-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">개별공시지가 이의신청</div>
                    <p className="mt-1 text-sm text-text-secondary">토지 가격 이의신청은 어떻게 다른지 확인하세요.</p>
                  </Link>
                  <Link
                    href="/guide/comprehensive-real-estate-tax-calculation-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">종합부동산세 계산법 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">공제금액·공정시장가액비율 등 계산 구조 상세 정리.</p>
                  </Link>
                  <Link
                    href="/category/real-estate/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">모든 부동산 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">중개수수료·평수·임대수익률 등 모음.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 이 글은 AI 보조로 자동 생성되어 자동 품질 게이트를 통과한 뒤 발행되었습니다. 발행 시점에 사람의 사전 검수는 없었으며, 운영자가 사후 점검합니다. 개별주택가격·세액 계산의 구체적 결과는 실제 보유 주택의 조건과 매년 고시되는 공정시장가액비율에 따라 달라지므로, 정확한 금액은 관할 시·군·구 세무과 또는 세무사와 상담해 확인하세요. 본 콘텐츠는 2026-09-27을 기준으로 작성되었으며, 공시 일정·비율 변경 시 업데이트됩니다. 인용 법조항: 부동산 가격공시에 관한 법률 §16(표준주택가격의 공시)·§17(개별주택가격의 공시, §11·§12 준용), 지방세법 §4(시가표준액)·§110(재산세 과세표준)·§111·§111의2, 종합부동산세법 §8(과세표준), 상속세및증여세법 §61(보충적 평가방법).
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터</a>,{' '}
                  <a href="https://www.reb.or.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">한국부동산원(부동산공시가격알리미 운영기관)</a>,{' '}
                  <a href="https://www.nhis.or.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">국민건강보험공단</a>.
                </p>
              </section>

              <ShareButtons
                title="개별주택가격 공시 2026 가이드"
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
