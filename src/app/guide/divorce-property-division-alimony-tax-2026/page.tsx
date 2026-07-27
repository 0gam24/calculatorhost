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

const URL = 'https://calculatorhost.com/guide/divorce-property-division-alimony-tax-2026/';
const DATE_PUBLISHED = '2026-07-28';
const DATE_MODIFIED = '2026-07-28';

export const metadata: Metadata = {
  title: '이혼 재산분할 위자료 세금 2026, 양도세·증여세·취득세 정리',
  description:
    '이혼 재산분할로 받는 재산에는 증여세·양도세가 없지만, 위자료를 부동산으로 주면 대물변제로 보아 주는 사람에게 양도소득세가 부과됩니다. 재산분할과 위자료의 세금 차이를 소득세법·상증법 기준으로 사례와 함께 정리했습니다.',
  keywords: [
    '이혼 재산분할 세금',
    '위자료 양도소득세',
    '이혼 재산분할 증여세',
    '위자료 부동산 세금',
    '재산분할 취득세',
    '소득세법 88조',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [
      {
        url: '/og-default.png',
        width: 1200,
        height: 630,
        alt: '이혼 재산분할 위자료 세금 2026, 양도세·증여세·취득세 정리',
      },
    ],
    title: '이혼 재산분할 위자료 세금 2026, 양도세·증여세·취득세 차이',
    description:
      '재산분할은 원칙적으로 증여세·양도세 없음, 위자료를 부동산으로 지급하면 대물변제로 보아 양도소득세 과세. 소득세법 §88과 민법 §839의2 기준 정리.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '이혼 재산분할 위자료 세금 2026, 양도세·증여세·취득세 차이',
    description:
      '재산분할은 세금 없음이 원칙, 위자료를 부동산으로 넘기면 주는 사람에게 양도세. 소득세법 §88 기준.',
  },
};

const FAQ_ITEMS = [
  {
    question: '이혼할 때 재산을 나누면 무슨 세금이 나오나요?',
    answer:
      '나누는 명목이 무엇이냐에 따라 세금이 완전히 달라집니다. 재산분할(민법 §839의2)로 재산을 넘기면 원칙적으로 주는 사람·받는 사람 모두 증여세·양도소득세가 없고 부동산 이전에 따른 취득세만 발생합니다. 반면 위자료로 부동산을 넘기면 주는 사람에게 소득세법 §88의 대물변제로 보아 양도소득세가 부과됩니다. 즉 같은 아파트라도 명목 하나로 세금이 크게 달라질 수 있습니다.',
  },
  {
    question: '재산분할과 위자료는 뭐가 다른가요?',
    answer:
      '법적 성격이 다릅니다. 재산분할은 혼인 중 부부가 공동으로 형성한 재산을 청산해 자기 몫을 돌려받는 것으로(민법 §839의2), 새로 재산이 이전된다기보다 원래 자기 몫을 되찾는 성격입니다. 위자료는 이혼으로 인한 정신적 손해에 대한 배상금입니다. 이 성격 차이 때문에 세법상 재산분할은 무상이전이 아니고 위자료는 손해배상금으로 다뤄집니다.',
  },
  {
    question: '위자료를 부동산으로 주면 세금이 있다고 들었는데 정확한가요?',
    answer:
      '맞습니다. 현금 위자료는 주는 사람·받는 사람 모두 세금이 없습니다. 그러나 부동산으로 위자료를 지급하면(대물변제) 주는 사람이 위자료 지급의무라는 채무를 부동산으로 갚는 것이 되어, 채무 소멸이라는 경제적 이익을 얻은 것으로 봅니다. 소득세법 §88은 이런 대물변제를 유상 양도로 규정하고 있어 주는 사람에게 양도소득세가 부과됩니다. 받는 사람은 손해배상금 성격이라 증여세·소득세가 없습니다.',
  },
  {
    question: '재산분할로 받은 아파트를 나중에 팔 때 취득시점은 언제로 보나요?',
    answer:
      '재산분할은 새로운 취득이 아니라 공동재산의 청산이기 때문에, 양도소득세 계산 시 취득시기는 원칙적으로 당초 부부가 그 부동산을 취득한 시점을 기준으로 볼 수 있습니다. 즉 이혼 시점이 아니라 부부 명의로 처음 매입한 날이 취득시기가 되며, 이는 장기보유특별공제·보유기간 판정에 영향을 줍니다. 다만 구체적 판정은 사안별로 달라질 수 있으니 신고 전 세무사 상담을 권장합니다.',
  },
  {
    question: '이혼 시 취득세는 누가 얼마나 부담하나요?',
    answer:
      '부동산 소유권이 이전되는 이상 소유권을 넘겨받는 사람에게 취득세가 발생합니다. 재산분할이든 위자료 대물변제든 원인은 달라도 소유권 이전이라는 형식적 취득은 동일하기 때문입니다. 다만 세율은 지방세법상 원인별로 별도로 규정되며, 재산분할·이혼 관련 특례 세율이 적용될 여지가 있습니다. 정확한 세율과 세액은 위택스 또는 관할 시·군·구청 세무과에서 실제 서류 기준으로 확인하시기 바랍니다.',
  },
  {
    question: '위자료로 준 부동산이 1세대1주택 요건이면 양도세를 안 낼 수도 있나요?',
    answer:
      '가능합니다. 위자료 대물변제도 소득세법 §88의 유상 양도이므로 양도소득세 계산 규정이 그대로 적용됩니다. 따라서 넘기는 주택이 1세대1주택 비과세 요건(2년 이상 보유, 양도가 12억원 이하 등)을 갖추면 비과세 혜택을 받을 수 있고, 12억 초과분만 과세될 수도 있습니다. 다만 요건 판정과 조정지역 여부, 다른 주택 보유 상황을 함께 봐야 하므로 실제 이전 전 반드시 세무사와 시뮬레이션하는 것이 안전합니다.',
  },
  {
    question: '이혼 협의서에 재산분할로 쓰면 무조건 세금이 없나요?',
    answer:
      '이름만 재산분할로 쓴다고 무조건 세금이 없는 것은 아닙니다. 국세기본법 §14의 실질과세 원칙에 따라 국세청은 형식이 아닌 거래의 실질을 봅니다. 부부 공동재산의 청산이라는 실질이 없이 위자료·증여를 재산분할로 위장했다고 판단되면 위자료 또는 증여로 재구성해 과세할 수 있습니다. 실제로 혼인 기간, 재산 형성 기여도, 분할 비율의 합리성 등이 심사 대상이 됩니다.',
  },
  {
    question: '재산분할받은 부동산에서 나오는 임대소득은 누구 소득인가요?',
    answer:
      '소유권이 이전된 이후에 발생한 임대소득은 새 소유자, 즉 재산분할을 받은 사람의 소득으로 잡힙니다. 이는 종합소득세 신고 대상이 되며, 다른 소득과 합산해 소득세법 §55의 누진세율로 과세됩니다. 이혼 확정일과 등기 이전 시점이 다를 수 있으므로, 소득 귀속 시점을 정확히 하려면 등기 이전일 기준으로 임대차 계약과 임대료 수령 계좌를 정리해두는 것이 좋습니다.',
  },
];

export default function DivorcePropertyDivisionAlimonyTax2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '이혼 재산분할 위자료 세금' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '이혼 재산분할과 위자료 세금 2026, 양도세·증여세·취득세 차이',
    description:
      '이혼 시 재산분할은 원칙적으로 증여세·양도세가 없지만, 위자료를 부동산으로 지급하면 대물변제로 보아 주는 사람에게 양도소득세가 부과됩니다. 소득세법 §88, 상증법 §2·§4, 민법 §839의2 기준 실무 정리.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: [
      '이혼 재산분할 세금',
      '위자료 양도소득세',
      '이혼 재산분할 증여세',
      '위자료 부동산 세금',
      '재산분할 취득세',
      '소득세법 88조',
    ],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '이혼 재산분할과 위자료 세금 2026',
    description:
      '이혼 재산분할과 위자료의 세금 차이를 소득세법·상증법·민법 기준으로 정리한 실무 가이드.',
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
                    { name: '이혼 재산분할 위자료 세금' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">이혼 당사자 · 8분 읽기 · 2026-07-28</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  이혼 재산분할과 위자료 세금 2026
                  <br />
                  <span className="text-2xl text-text-secondary">, 양도세·증여세·취득세 차이</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  이혼할 때 아파트를 나누는 방법은 크게 두 가지입니다. 부부가 함께 모은 재산을 나누는 재산분할이거나, 정신적 손해를 배상하는 위자료입니다. 같은 아파트를 넘기더라도 어느 명목으로 처리하느냐에 따라 세금이 크게 달라집니다. 이 가이드는 재산분할과 위자료의 세법상 차이를 소득세법·상증법·민법 기준으로 사례와 함께 정리했습니다.
                </p>
              </header>

              <AdSlot slot="guide-divorce-property-division-alimony-tax-top" format="horizontal" />

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">이혼할 때 재산 넘기면 세금이 붙나요?</h2>
                <p>
                  결론부터 말하면, 재산분할로 넘기면 원칙적으로 세금이 없고 위자료로 넘기면 세금이 생길 수 있습니다. 이혼 시 재산이 이전되는 경로는 크게 세 가지입니다. 첫째, 부부가 공동으로 형성한 재산을 이혼 시 청산하는 재산분할(민법 §839의2). 둘째, 이혼으로 인한 정신적 손해에 대한 손해배상금인 위자료. 셋째, 그 밖의 증여성 지급입니다. 세법은 이 세 가지를 완전히 다른 것으로 취급합니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">30초 요약</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    · 재산분할(민법 §839의2): 주는 사람·받는 사람 모두 증여세·양도세 없음, 취득세만 발생
                    <br />
                    · 위자료 현금 지급: 세금 없음
                    <br />
                    · 위자료 부동산 지급(대물변제, 소득세법 §88): 주는 사람에게 양도소득세 부과
                    <br />
                    · 형식이 아닌 실질(국세기본법 §14) 판단, 명목만 재산분할로 쓴다고 무조건 비과세되지 않음
                  </p>
                </div>
                <p className="mt-4">
                  다만 이 원칙은 어디까지나 일반 사안 기준입니다. 부동산이 여러 채인 경우, 조정지역인 경우, 다주택자인 경우, 위자료와 재산분할이 혼합된 경우에는 실제 세액이 크게 달라질 수 있으므로 이전 등기 전에 반드시 세무사와 사전 검토하는 것이 안전합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">재산분할은 왜 세금이 없나요?</h2>
                <p>
                  재산분할은 새로 재산을 주는 것이 아니라 원래 자기 몫을 되찾는 것이기 때문입니다. 민법 §839의2는 이혼한 자의 일방이 상대방에게 혼인 중 공동으로 형성한 재산의 분할을 청구할 수 있도록 규정합니다. 즉 재산분할은 부부 공동의 노력으로 축적한 재산을 각자의 기여도에 따라 청산·분배하는 절차입니다.
                </p>
                <p>
                  세법상 이 재산분할은 무상이전이 아닙니다. 상증법 §2·§4가 정의하는 증여는 대가 없이 재산이 이전되는 것을 뜻하는데, 재산분할은 원래 자기 지분을 돌려받는 것이라 증여로 보지 않습니다. 소득세법상 양도도 유상 이전이 요건인데, 자기 몫의 청산은 양도가 아니라고 봅니다. 따라서 정리하면 다음과 같습니다.
                </p>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li>
                    <strong>받는 사람</strong>: 증여세 없음(상증법상 증여 아님), 소득세 없음
                  </li>
                  <li>
                    <strong>주는 사람</strong>: 양도로 보지 않아 양도소득세 없음
                  </li>
                  <li>
                    <strong>공통</strong>: 부동산의 경우 소유권 이전이라는 형식적 취득이 있으므로 취득세는 발생
                  </li>
                </ul>
                <p className="mt-4">
                  다만 재산분할의 비율이 부부의 실제 기여도에 비해 지나치게 한쪽에 몰려 있으면, 국세기본법 §14의 실질과세 원칙에 따라 초과분이 위자료 또는 증여로 재구성될 수 있습니다. 혼인 기간, 재산 형성 과정, 분할 비율의 합리성이 심사 대상이 됩니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">위자료를 부동산으로 주면 세금이 있나요?</h2>
                <p>
                  네, 주는 사람에게 양도소득세가 부과됩니다. 위자료 자체는 정신적 손해배상금이라 받는 사람에게 증여세·소득세가 없고, 현금으로 지급하면 주는 사람에게도 세금이 없습니다. 문제는 부동산으로 위자료를 지급할 때입니다.
                </p>
                <p>
                  소득세법 §88은 양도의 정의에 대물변제를 포함시키고 있습니다. 대물변제란 원래 갚아야 할 채무(위자료 지급의무)를 다른 재산(부동산)으로 갚는 것을 말합니다. 세법은 이 과정을 두 단계로 봅니다. 첫째, 부동산을 위자료 상당액으로 유상 양도한다. 둘째, 그 대금으로 위자료 채무를 갚는다. 즉 부동산을 판 것과 같은 경제적 실질이 있다고 보아 주는 사람에게 양도소득세를 과세합니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">위자료 대물변제 과세 구조</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    · 양도가액: 위자료로 갈음된 금액(합의서상 위자료 금액)
                    <br />
                    · 취득가액: 주는 사람이 그 부동산을 처음 취득할 때 지불한 금액
                    <br />
                    · 양도차익: 양도가액 빼기 취득가액 빼기 필요경비
                    <br />
                    · 산출세액: 양도차익에서 기본공제 250만원을 차감한 뒤 소득세법 §55 세율 적용
                  </p>
                </div>
                <p className="mt-4">
                  다만 넘기는 주택이 1세대1주택 비과세 요건(2년 이상 보유·양도가 12억원 이하 등)을 갖추면 위자료 대물변제라도 양도세가 비과세될 수 있고, 12억 초과분만 과세될 수도 있습니다. 요건 판정은 다른 주택 보유 여부, 조정지역 여부에 따라 달라지므로 실제 등기 이전 전에 시뮬레이션이 필요합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">재산분할과 위자료, 세금이 어떻게 다른가요?</h2>
                <p>
                  두 명목의 세금 차이를 표로 정리하면 다음과 같습니다. 같은 아파트를 넘기더라도 명목에 따라 결과가 완전히 달라지는 것을 한눈에 볼 수 있습니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 재산분할 vs 위자료 세금 비교(2026 기준)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">구분</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">재산분할</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">위자료(부동산 지급)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">법적 성격</td>
                        <td className="p-3">공동재산 청산(민법 §839의2)</td>
                        <td className="p-3">정신적 손해배상금(대물변제)</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">받는 사람 증여세</td>
                        <td className="p-3">없음(상증법상 증여 아님)</td>
                        <td className="p-3">없음(손해배상금)</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">받는 사람 소득세</td>
                        <td className="p-3">없음</td>
                        <td className="p-3">없음</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">주는 사람 양도세</td>
                        <td className="p-3">없음(양도로 보지 않음)</td>
                        <td className="p-3">있음(소득세법 §88 유상 양도)</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">취득세</td>
                        <td className="p-3">발생(원인: 재산분할)</td>
                        <td className="p-3">발생(원인: 대물변제)</td>
                      </tr>
                      <tr>
                        <td className="p-3">1세대1주택 비과세</td>
                        <td className="p-3">양도세 자체 없음</td>
                        <td className="p-3">요건 갖추면 비과세 가능</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  지급 수단(현금 vs 부동산)별로도 결과가 달라집니다. 다음 표는 위자료 성격 지급의 수단별 과세를 정리한 것입니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 2. 위자료 지급수단별 과세(주는 사람 기준)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">지급수단</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">주는 사람 세금</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">근거</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">현금 지급</td>
                        <td className="p-3">세금 없음</td>
                        <td className="p-3">유상 양도 요건 없음</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">부동산 지급(대물변제)</td>
                        <td className="p-3">양도소득세 부과</td>
                        <td className="p-3">소득세법 §88 유상 양도</td>
                      </tr>
                      <tr>
                        <td className="p-3">주식·회원권 등 자산 지급</td>
                        <td className="p-3">양도소득세 부과 가능</td>
                        <td className="p-3">소득세법 §88 유상 양도</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  다만 위 표는 일반 원칙이며, 사안별로 다주택·조정지역·특례 요건에 따라 세액이 달라집니다. 위자료 금액을 정하기 전 반드시 세무사 시뮬레이션을 거치는 것이 안전합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">재산분할로 받은 부동산을 나중에 팔면?</h2>
                <p>
                  재산분할받은 부동산을 나중에 처분할 때는 취득시기 판정이 핵심입니다. 재산분할은 새로운 취득이라기보다 원래 자기 지분의 청산이기 때문에, 양도소득세 계산 시 취득시기가 원칙적으로 이혼 시점이 아니라 부부가 그 부동산을 처음 취득한 시점을 기준으로 판정될 수 있습니다.
                </p>
                <p>
                  이 취득시기 판정은 다음 두 가지에 큰 영향을 줍니다.
                </p>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li>
                    <strong>보유기간</strong>: 1세대1주택 비과세 요건인 2년 이상 보유 여부를 판정할 때 부부 취득시점부터 계산되면 이혼 직후 매도해도 요건 충족 가능
                  </li>
                  <li>
                    <strong>장기보유특별공제</strong>: 15년 이상 보유 시 최대 30%(일반), 1세대1주택 요건 충족 시 최대 80%까지 공제되는데, 부부 취득시점이 기산점이 되면 공제율이 대폭 커짐
                  </li>
                  <li>
                    <strong>세율 구분</strong>: 2년 미만 단기 양도(40% 등) vs 2년 이상 누진세율 적용 여부도 취득시기에 좌우
                  </li>
                </ul>
                <p className="mt-4">
                  다만 구체적 취득시기 판정은 사안별로 국세청 예규·판례에 따라 달라질 수 있고, 부부가 어느 시점에 어떤 명의로 취득했는지, 재산분할 등기 원인이 어떻게 기재됐는지에 따라 결과가 갈릴 수 있습니다. 처분 전 반드시 세무사에게 취득시기 판정과 예상 세액 시뮬레이션을 요청하시기 바랍니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">이혼 시 세금 줄이는 실무 포인트</h2>
                <p>
                  이혼 협의 단계에서 다음 세 가지만 명확히 해도 예상치 못한 세금을 크게 줄일 수 있습니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3">
                  <p className="font-semibold text-text-primary">사례 1. 재산분할로 아파트 이전(양도세 없음)</p>
                  <p className="text-sm text-text-secondary">
                    · 상황: 혼인 12년, 부부 공동명의 아파트(취득 6억원 → 현재 시가 10억원)를 이혼 시 배우자 A가 단독소유로 이전
                    <br />
                    · 명목: 재산분할(민법 §839의2)
                    <br />
                    · 주는 사람: 양도세 없음(양도로 보지 않음)
                    <br />
                    · 받는 사람: 증여세 없음
                    <br />
                    · 발생 세금: 취득세만 발생(원인 재산분할 세율 적용, 위택스 확인)
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3">
                  <p className="font-semibold text-text-primary">사례 2. 위자료로 아파트 이전(주는 사람 양도세 발생)</p>
                  <p className="text-sm text-text-secondary">
                    · 상황: 같은 아파트를 위자료 명목으로 배우자 A에게 이전
                    <br />
                    · 명목: 위자료 대물변제(소득세법 §88)
                    <br />
                    · 주는 사람: 양도가액을 위자료 금액으로 보고 양도차익 계산, 기본공제 250만원 차감 후 소득세법 §55 세율로 양도소득세 산출
                    <br />
                    · 받는 사람: 세금 없음(손해배상금)
                    <br />
                    · 참고: 구체 세액은 취득가액·필요경비·보유기간·주택 수에 따라 크게 달라지므로 양도세 계산기 또는 세무사 시뮬레이션 필요
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3">
                  <p className="font-semibold text-text-primary">사례 3. 위자료 현금 지급(양측 모두 세금 없음)</p>
                  <p className="text-sm text-text-secondary">
                    · 상황: 위자료 3억원을 현금(예금·계좌이체)으로 지급
                    <br />
                    · 주는 사람: 세금 없음(유상 양도 요건 없음)
                    <br />
                    · 받는 사람: 세금 없음(손해배상금)
                    <br />
                    · 참고: 부동산이 아니라 현금·예금으로 지급하면 위자료라도 세금이 발생하지 않음
                  </p>
                </div>
                <p className="mt-4">
                  다만 실무에서는 재산분할과 위자료가 혼재되는 경우가 많고, 부동산이 여러 채이거나 다주택 상태에서 이전하는 경우 계산이 복잡해집니다. 예외: 이혼 협의서에 명목을 재산분할로 기재했어도 국세기본법 §14의 실질과세 원칙에 따라 국세청이 실질을 위자료·증여로 재구성할 수 있으므로, 명목 기재만으로 안심하지 말고 실질을 뒷받침할 자료(혼인 기간, 재산 형성 기여도, 분할 비율의 합리적 근거)를 준비해 두는 것이 안전합니다.
                </p>
              </section>

              <AdSlot slot="guide-divorce-property-division-alimony-tax-mid" format="rectangle" />

              <section className="space-y-6 border-t border-border-base pt-8" data-speakable>
                <h2 className="text-2xl font-bold">취득세는 누가 얼마나 내나요?</h2>
                <p>
                  재산분할이든 위자료 대물변제든, 부동산 소유권이 이전되는 이상 소유권을 받는 사람에게 취득세가 발생합니다. 재산분할은 실질적으로는 자기 몫의 청산이지만, 지방세법상 등기 이전이라는 형식적 취득이 있기 때문에 취득세 과세 대상에서 벗어나지 않습니다.
                </p>
                <p>
                  다만 세율은 원인별로 다르게 규정되어 있습니다. 재산분할이 원인인 경우와 위자료 대물변제가 원인인 경우, 일반 매매가 원인인 경우의 취득세율이 모두 다를 수 있고, 재산분할·이혼과 관련해서는 별도의 특례 세율이 적용될 여지가 있습니다. 정확한 세율과 세액은 실제 이전 등기 서류 기준으로 위택스(wetax.go.kr) 또는 관할 시·군·구청 세무과에서 확인하는 것이 가장 안전합니다.
                </p>
                <p>
                  또한 취득세 외에 지방교육세, 농어촌특별세 등 부가세목이 함께 부과될 수 있고, 85제곱미터 초과 여부에 따라 세율이 달라지기도 합니다. 자세한 계산은 관할 지자체에서 실제 서류로 확인하시기 바랍니다.
                </p>
                <p>
                  다만 이 가이드에서 다룬 세율과 원칙은 2026년 기준 일반 사안입니다. 실제 이혼 사안은 재산 종류, 부부 지분 구조, 다주택 여부, 조정지역 여부, 위자료 금액 규모에 따라 세액이 크게 달라지므로, 등기 이전 전에 세무사 또는 변호사와 반드시 사전 검토하시기 바랍니다.
                </p>
              </section>

              <h2 className="text-2xl font-bold mb-6">자주 묻는 질문</h2>
              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h3 className="text-lg font-semibold text-text-primary">관련 계산기 및 가이드</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link
                    href="/guide/gift-tax-calculation-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">증여세 계산 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">과세표준·누진공제·세율까지 증여세 계산의 기본을 정리합니다.</p>
                  </Link>
                  <Link
                    href="/guide/gift-tax-exemption-limit-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">증여재산공제 한도 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">배우자·자녀·부모별 10년 합산 증여공제 한도를 확인하세요.</p>
                  </Link>
                  <Link
                    href="/guide/one-household-12-billion-exemption/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">1세대1주택 12억 비과세</div>
                    <p className="mt-1 text-sm text-text-secondary">위자료 부동산도 요건 갖추면 비과세 가능, 요건과 계산법.</p>
                  </Link>
                  <Link
                    href="/guide/capital-gains-tax-5-steps/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">양도소득세 5단계 계산</div>
                    <p className="mt-1 text-sm text-text-secondary">양도차익부터 산출세액까지, 위자료 대물변제 계산 참고.</p>
                  </Link>
                  <Link
                    href="/calculator/capital-gains-tax/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">양도소득세 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">위자료 부동산 이전 시 예상 세액을 바로 시뮬레이션하세요.</p>
                  </Link>
                  <Link
                    href="/category/tax/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">모든 세금 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">양도세·취득세·상속세·증여세·종부세 모음.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 교육 목적으로 작성되었으며 개인 맞춤형 세무·법률 조언이 아닙니다. 이혼 사안은 부부의 재산 구조, 혼인 기간, 기여도, 다주택 여부, 조정지역 여부, 위자료 금액에 따라 세액이 크게 달라지므로, 실제 재산 이전 등기 전에 반드시 세무사 또는 변호사와 사전 검토하시기 바랍니다. 특히 위자료를 부동산으로 지급하는 경우 소득세법 §88의 대물변제로 양도소득세가 발생할 수 있으므로 사전 시뮬레이션이 필수입니다. 본 콘텐츠는 2026-07-28을 기준으로 작성되었으며 관련 법령 개정 시 즉시 업데이트됩니다. 법조항 근거는 <strong>소득세법 §88(양도의 정의), 상증법 §2·§4(증여의 정의·과세대상), 민법 §839의2(재산분할청구권), 국세기본법 §14(실질과세 원칙)</strong>입니다. AI 보조 작성 후 운영자 검수 완료.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터</a>,{' '}
                  <a href="https://www.nts.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">국세청</a>,{' '}
                  <a href="https://www.hometax.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">홈택스</a>.
                </p>
              </section>

              <ShareButtons
                title="이혼 재산분할과 위자료 세금 2026 가이드"
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
