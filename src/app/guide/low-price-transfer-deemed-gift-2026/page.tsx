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

const URL = 'https://calculatorhost.com/guide/low-price-transfer-deemed-gift-2026/';
const DATE_PUBLISHED = '2026-09-19';
const DATE_MODIFIED = '2026-09-19';

export const metadata: Metadata = {
  title: '저가양수도 증여의제 2026, 시가 대비 몇 %부터 과세되나',
  description:
    '특수관계인 간 저가 거래는 시가와 대가의 차액이 시가의 30% 이상이거나 3억 원 이상이면 증여세 대상입니다. 매도인의 양도소득세는 별도로 5% 기준이 적용되어, 매도인만 시가로 재과세되고 매수인은 증여세가 없는 구간도 있습니다. 상증법 §35·소득세법 §101 기준으로 정리했습니다.',
  keywords: [
    '저가양수도',
    '저가양수도 증여의제',
    '특수관계인 저가양도',
    '증여세 30% 룰',
    '부당행위계산부인',
    '상증법 35조',
    '시가 대비 저가양도',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '저가양수도 증여의제 2026, 시가 대비 몇 %부터 과세되나' }],
    title: '저가양수도 증여의제 2026, 시가 대비 몇 %부터 과세되나',
    description: '증여세는 시가 30%(또는 3억 원), 양도세는 시가 5%(또는 3억 원) 기준. 상증법 §35·소득세법 §101 정리.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '저가양수도 증여의제 2026, 시가 대비 몇 %부터 과세되나',
    description: '증여세 30%·양도세 5% 기준선이 다르다는 점을 상증법 §35·소득세법 §101 근거로 정리.',
  },
};

const FAQ_ITEMS = [
  {
    question: '부모 자식 간 아파트를 정확히 시가대로 팔면 문제가 없나요?',
    answer:
      '네, 거래가가 시가와 같으면 차액이 0이라 저가양수도 자체가 성립하지 않아 증여세가 부과되지 않습니다. 다만 실제 시가보다 낮게 신고했다가 국세청이 감정평가나 유사매매사례로 시가를 다시 산정하면 뒤늦게 차액이 발생해 증여의제가 적용될 수 있습니다. 자녀의 매수 자금 출처는 시가 매매에서도 별도로 소명해야 합니다.',
  },
  {
    question: '형제자매 간 거래도 저가양수도 증여의제가 적용되나요?',
    answer:
      '적용됩니다. 국세기본법 시행령 §1의2에 따라 4촌 이내 혈족은 특수관계인에 해당하므로 형제자매 간 거래도 부모, 자녀 거래와 동일한 30%·3억 원 기준이 적용됩니다. 사촌까지도 혈족 4촌 이내에 들어가 대상이 될 수 있으니 친족 간 거래는 촌수를 먼저 확인해야 합니다.',
  },
  {
    question: '저가양수도로 증여세가 발생하면 누가, 언제 신고해야 하나요?',
    answer:
      '차액을 얻은 매수인(수증자)이 증여받은 날이 속하는 달의 말일부터 3개월 이내에 신고해야 합니다(상증법 §68). 매도인은 증여세와 별도로 시가 기준 양도소득세를 본인의 양도소득 신고 기한에 맞춰 신고합니다. 두 세금의 신고 주체와 기한이 다르므로 혼동하지 않아야 합니다.',
  },
  {
    question: '거래가가 시가인지 아닌지는 어떻게 판단하나요?',
    answer:
      '상증법 §60의 원칙에 따라 감정가액이나 유사 매물의 매매사례가액이 있으면 그것이 우선 시가로 인정됩니다. 그런 시가를 산정하기 어려우면 §61부터 §65까지의 보충적 평가방법인 기준시가(공동주택가격·개별공시지가 등)를 시가로 봅니다. 국세청은 거래 전후의 유사 매매사례나 감정가액도 폭넓게 참고해 시가를 판단합니다.',
  },
  {
    question: '저가양수도를 신고하지 않으면 어떤 불이익이 있나요?',
    answer:
      '증여세를 신고하지 않으면 무신고가산세와 납부지연가산세가 추가로 부과됩니다. 매도인이 시가 기준 양도소득세를 실제 거래가로 축소 신고한 경우에도 국세청이 사후에 이를 적출하면 부족분에 가산세가 붙습니다. 특수관계인 간 거래는 자금출처 조사 대상이 되기 쉬워 사전에 정확히 신고하는 것이 안전합니다.',
  },
  {
    question: '비싸게 팔았을 때(고가양도)도 같은 기준이 적용되나요?',
    answer:
      '네, 상증법 §35는 저가양수와 고가양도를 함께 규정합니다. 특수관계인에게 시가보다 비싸게 팔면 매도인이 그 차액에서 min(시가 30%, 3억 원)을 차감한 금액만큼 증여받은 것으로 보아 증여세를 냅니다. 방향만 반대일 뿐 판정 기준과 계산 공식은 저가양수도와 같습니다.',
  },
];

export default function LowPriceTransferDeemedGift2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '저가양수도 증여의제 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '저가양수도 증여의제 2026, 시가 대비 몇 %부터 과세되나',
    description:
      '특수관계인 간 저가 거래의 증여세 판정 기준(시가 30%·3억 원)과 매도인 양도소득세 부당행위계산 기준(시가 5%·3억 원)을 상증법 §35·소득세법 §101 근거로 정리.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['저가양수도', '증여의제', '부당행위계산부인', '상증법 35조', '소득세법 101조'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '저가양수도 증여의제 2026',
    description:
      '시가 대비 몇 %부터 저가양수도 증여세 대상이 되는지, 매도인 양도소득세는 왜 별도 기준으로 재계산되는지 정리.',
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
                    { name: '저가양수도 증여의제 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">세금 · 8분 읽기 · 2026-09-19</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  저가양수도 증여의제
                  <br />
                  <span className="text-2xl text-text-secondary">· 시가 대비 몇 %부터 과세되나</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  저가양수도 증여의제란 특수관계인 간 거래에서 시가보다 싸게 사고팔았을 때 그 차액을 증여로 보아 세금을 매기는 상속세및증여세법상 제도입니다. 이 가이드는 시가 대비 정확히 몇 % 차이부터 증여세 대상이 되는지, 매도인의 양도소득세는 왜 별도의 5% 기준으로 재계산되는지를 상증법 §35·소득세법 §101 근거로 정리합니다. 대상 독자는 부모, 자녀, 형제 등 특수관계인 간 부동산이나 주식을 시세보다 낮게 거래하려는 사람입니다.
                </p>
              </header>

              <section className="space-y-6" data-speakable>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 0. 저가양수도 판정 기준 한눈에 보기 (상증법 §35·소득세법 §101)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">세목</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">판정 기준</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">3억 원 조건</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">근거</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">증여세(특수관계인)</td>
                        <td className="p-3">시가 대비 30% 이상</td>
                        <td className="p-3">있음(둘 중 작은 금액 차감)</td>
                        <td className="p-3">상증법 §35①·시행령 §26</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">증여세(비특수관계인)</td>
                        <td className="p-3">시가 대비 30% 이상</td>
                        <td className="p-3">없음</td>
                        <td className="p-3">상증법 §35②</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">양도소득세(매도인)</td>
                        <td className="p-3">시가 대비 5% 이상</td>
                        <td className="p-3">있음</td>
                        <td className="p-3">소득세법 §101·시행령 §167③</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">30초 요약</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    정의: 특수관계인 간 저가 매매 차액을 증여로 보는 제도.
                    <br />
                    기준: 증여세는 시가의 30%(또는 3억 원), 양도세는 시가의 5%(또는 3억 원).
                    <br />
                    차감: 증여재산가액은 차액에서 min(시가 30%, 3억 원)을 뺀 금액.
                    <br />
                    주의: 두 세목 기준이 달라 매도인만 과세되고 매수인은 증여세가 없는 구간도 있음.
                  </p>
                </div>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">저가양수도 증여의제란 무엇인가요?</h2>
                <p>
                  저가양수도 증여의제란 특수관계인 간 거래에서 시가와 실제 거래가의 차액이 일정 기준을 넘으면 그 차액을 증여받은 것으로 간주해 증여세를 부과하는 제도입니다(상증법 §35①). 매매라는 형식을 갖췄더라도 실질적으로 무상 이전한 부분이 있다고 보는 것입니다.
                </p>
                <p>
                  이 제도는 부모가 자녀에게, 또는 형제자매 간에 부동산·주식을 싸게 넘기며 증여세를 회피하는 것을 막기 위해 만들어졌습니다. 다만, 반대로 시가보다 비싸게 사거나 팔아도 같은 논리로 매도인에게 증여세가 부과될 수 있습니다(상증법 §35, 고가양도).
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">시가 대비 몇 %부터 증여세 대상이 되나요?</h2>
                <p>
                  특수관계인 간 거래는 차액이 시가의 30% 이상이거나 3억 원 이상이면 증여세 대상이 됩니다(상증법 §35①, 시행령 §26). 두 조건은 OR 관계이므로 하나만 충족해도 저가양수도로 판정됩니다.
                </p>
                <p>
                  다만 이 두 기준 중 실제로 먼저 걸리는 쪽은 자산 가격에 따라 달라집니다. 시가 10억 원까지는 30%에 해당하는 금액이 3억 원보다 작아 30% 기준이 실질적인 문턱이 되고, 시가가 10억 원을 넘으면 3억 원이 30%보다 작아져 오히려 상대적으로 더 낮은 할인율에서도 과세 대상이 됩니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 시가별 저가양수도 판정 임계 비율 (상증법 §35①, 시행령 §26)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">시가</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">30% 금액</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">실제 적용 임계 금액</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">임계 비율</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">3억 원</td>
                        <td className="p-3">9,000만 원</td>
                        <td className="p-3">9,000만 원</td>
                        <td className="p-3">30%</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">5억 원</td>
                        <td className="p-3">1억 5,000만 원</td>
                        <td className="p-3">1억 5,000만 원</td>
                        <td className="p-3">30%</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">10억 원</td>
                        <td className="p-3">3억 원</td>
                        <td className="p-3">3억 원</td>
                        <td className="p-3">30%(경계)</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">20억 원</td>
                        <td className="p-3">6억 원</td>
                        <td className="p-3">3억 원</td>
                        <td className="p-3">15%</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">30억 원</td>
                        <td className="p-3">9억 원</td>
                        <td className="p-3">3억 원</td>
                        <td className="p-3">10%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  다만 시가 자체를 낮게 신고했다가 국세청이 감정평가나 유사매매사례로 재산정하면 기준이 되는 시가가 달라져 판정 결과가 뒤바뀔 수 있습니다. 고가 자산일수록 이 재산정 리스크가 커집니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">특수관계인이 아니면 저가양도해도 안전한가요?</h2>
                <p>
                  안전하지 않습니다. 특수관계인이 아니더라도 거래 관행상 정당한 사유 없이 차액이 시가의 30% 이상이면 증여세가 부과될 수 있습니다(상증법 §35②). 다만 이 경우 3억 원 기준은 적용되지 않고 30% 요건 하나만 봅니다.
                </p>
                <p>
                  정당한 사유가 있는 급매·경매·공매 등은 예외로 인정될 수 있습니다. 다만, 비특수관계인 간에는 거래 관행상 정당한 사유가 있었는지를 국세청이 개별 사안마다 판단하므로, 특수관계인 거래보다 다툼의 여지가 더 큽니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">증여재산가액은 어떻게 계산하나요?</h2>
                <p>
                  증여재산가액은 시가와 대가의 차액에서 시가의 30%와 3억 원 중 더 적은 금액을 뺀 값입니다(상증법 §35① 1호). 차액 전체가 아니라 이 차감액을 뺀 나머지만 과세 대상이 됩니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-2 mt-2">
                  <p className="font-semibold text-text-primary">계산 사례: 시가 20억 원 상가를 자녀에게 15억 원에 매도</p>
                  <p className="text-sm text-text-secondary">
                    · 차액: 20억 − 15억 = 5억 원
                    <br />
                    · 판정: 차액 5억 원이 3억 원 이상이므로 저가양수도 기준 충족(30% 기준 금액인 6억 원에는 못 미치지만 3억 원 기준으로 과세 대상)
                    <br />
                    · 차감액: min(시가의 30% = 6억 원, 3억 원) = 3억 원
                    <br />
                    · 증여재산가액: 5억 − 3억 = 2억 원
                    <br />
                    · 증여세: 성년 자녀 증여재산공제 5,000만 원 적용 후 과세표준 1억 5,000만 원 × 20% − 누진공제 1,000만 원 = <strong>약 2,000만 원</strong>
                  </p>
                </div>
                <p className="mt-4">
                  다만 이 계산은 앞서 본 판정 기준을 먼저 충족해야 적용됩니다. 차액이 3억 원 미만이면서 시가의 30% 미만이라면 차감 공식 자체가 필요 없이 증여세는 0원입니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">매도인의 양도소득세는 왜 실제 거래가가 아니라 시가로 계산되나요?</h2>
                <p>
                  매도인의 양도소득세는 특수관계인에게 시가보다 싸게 팔면서 차액이 시가의 5% 이상이거나 3억 원 이상이면 실제 거래가가 아니라 시가를 기준으로 재계산됩니다(소득세법 §101, 시행령 §167③). 이를 양도소득의 부당행위계산 부인이라고 합니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-2 mt-2">
                  <p className="font-semibold text-text-primary">경계 사례: 시가 20억 원 아파트를 18억 5,000만 원에 매도(차액 1억 5,000만 원, 7.5%)</p>
                  <p className="text-sm text-text-secondary">
                    · 양도세 판정: 차액이 시가의 5%(1억 원) 이상이므로 부당행위계산 부인 적용, 매도인은 실제 거래가가 아닌 시가 20억 원 기준으로 양도세 계산
                    <br />
                    · 증여세 판정: 차액 1억 5,000만 원은 3억 원 미만, 시가의 30%(6억 원)에도 못 미쳐 저가양수도 불성립, 매수인 증여세는 0원
                  </p>
                </div>
                <p className="mt-4">
                  다만 두 세목의 기준선(증여세 30%·3억 원, 양도세 5%·3억 원)이 서로 달라, 위 사례처럼 매도인만 시가 기준으로 과세되고 매수인은 증여세를 내지 않는 구간이 생길 수 있습니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">특수관계인의 범위는 어디까지인가요?</h2>
                <p>
                  특수관계인에는 배우자(사실상 혼인관계 포함), 4촌 이내 혈족, 3촌 이내 인척이 포함됩니다(국세기본법 §2 20호, 시행령 §1의2). 2023년 개정으로 기존 6촌 이내 혈족·4촌 이내 인척에서 범위가 축소되었습니다.
                </p>
                <p>
                  혈족·인척 외에도 임원·사용인 등 경제적 연관관계, 주주·출자자 등 경영지배관계에 있는 자도 특수관계인으로 봅니다. 다만, 촌수가 애매한 친척 간 거래는 정확한 관계를 먼저 확인해야 어느 판정 기준(30%·3억 원 병용 또는 30%만)이 적용되는지 달라집니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">저가양수도를 피하려면 어떻게 해야 하나요?</h2>
                <p>
                  가장 안전한 방법은 감정평가나 유사 매매사례로 확인한 시가에 최대한 맞춰 거래하는 것입니다. 차액이 시가의 30%(고가 자산은 3억 원)에 못 미치도록 거래가를 설계하면 증여의제를 피할 수 있습니다.
                </p>
                <p>
                  매수인의 자금출처도 함께 준비해야 합니다. 저가양수도 기준을 피했더라도 자금 출처가 불명확하면 별도로 증여세 조사를 받을 수 있습니다.
                </p>
                <p className="mt-4">
                  다만 경계선에 가깝게 거래가를 설계할수록 국세청의 시가 재산정 리스크가 커집니다. 고액 거래라면 감정평가 등 공인된 시가 산정 절차를 미리 밟아 두는 것이 안전합니다.
                </p>
              </section>

              <h2 className="text-2xl font-bold mb-6">자주 묻는 질문</h2>
              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h3 className="text-lg font-semibold text-text-primary">관련 계산기 및 가이드</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link
                    href="/calculator/gift-tax/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">증여세 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">증여재산가액을 입력해 예상 증여세를 계산해보세요.</p>
                  </Link>
                  <Link
                    href="/calculator/capital-gains-tax/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">양도소득세 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">매도인의 시가 기준 양도세를 직접 시뮬레이션.</p>
                  </Link>
                  <Link
                    href="/guide/child-house-gift-vs-sale-comparison/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">자녀 주택 증여 vs 매매 비교</div>
                    <p className="mt-1 text-sm text-text-secondary">4가지 시나리오별 세금 총액을 직접 비교합니다.</p>
                  </Link>
                  <Link
                    href="/calculator/acquisition-tax/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">취득세 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">저가 매수 시 매수인이 낼 취득세도 함께 확인.</p>
                  </Link>
                  <Link
                    href="/glossary/#undervalued-transfer"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">용어사전, 저가양수도</div>
                    <p className="mt-1 text-sm text-text-secondary">30%·3억 원 룰 정의를 한 문단으로 다시 확인.</p>
                  </Link>
                  <Link
                    href="/category/tax/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">모든 세금 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">양도세·취득세·상속세·증여세 모음.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 이 글은 AI 보조로 자동 생성되어 자동 품질 게이트를 통과한 뒤 발행되었습니다. 발행 시점에 사람의 사전 검수는 없었으며, 운영자가 사후 점검합니다. 저가양수도 증여의제와 부당행위계산 부인의 실제 적용은 자산 종류, 특수관계 여부, 시가 산정 방식에 따라 달라지므로, 실제 거래 전에는 반드시 국세청 또는 세무 전문가와 확인하세요. 본 콘텐츠는 2026-09-19를 기준으로 작성되었으며, 관련 법령·판례 변경 시 업데이트됩니다. 인용 법조항: 상속세및증여세법 §35(저가양수·고가양도에 따른 이익의 증여), §60(평가의 원칙), §61~§65(보충적 평가방법), §68(증여세 과세표준신고), 같은 법 시행령 §26(저가양수 또는 고가양도에 따른 이익의 계산방법 등), 소득세법 §101(양도소득의 부당행위계산), 같은 법 시행령 §167(부당행위계산의 유형 등), 국세기본법 §2 20호·시행령 §1의2(특수관계인의 범위).
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터</a>,{' '}
                  <a href="https://www.nts.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">국세청</a>.
                </p>
              </section>

              <ShareButtons
                title="저가양수도 증여의제 2026, 시가 대비 몇 %부터 과세되나"
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
