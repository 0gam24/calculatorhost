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

const URL = 'https://calculatorhost.com/guide/capital-gains-converted-acquisition-value-2026/';
const DATE_PUBLISHED = '2026-08-02';
const DATE_MODIFIED = '2026-08-02';

export const metadata: Metadata = {
  title: '양도세 환산취득가액 2026, 취득가액 모를 때 계산과 가산세',
  description:
    '오래전 취득해 실제 취득가액을 모를 때는 환산취득가액으로 양도세를 계산할 수 있습니다. 환산가액 공식, 개산공제 3%, 신축 후 5년 내 양도 시 5% 가산세까지 소득세법 기준으로 정리했습니다.',
  keywords: [
    '환산취득가액',
    '취득가액 모를때 양도세',
    '환산취득가액 계산',
    '환산가액 가산세',
    '개산공제',
    '소득세법 97조',
    '추계 취득가액',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '양도세 환산취득가액 2026, 취득가액 모를 때 계산과 가산세' }],
    title: '양도세 환산취득가액 2026, 취득가액 모를 때 공식과 5% 가산세 총정리',
    description: '실거래가 증빙이 없는 오래된 부동산은 환산취득가액으로 양도세를 계산합니다. 공식, 개산공제 3%, 신축 5년 이내 5% 가산세까지 한 번에.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '양도세 환산취득가액 2026, 공식·개산공제·5% 가산세',
    description: '취득가액을 모를 때 쓰는 환산취득가액의 정확한 공식과 함정을 소득세법 §97·§114의2 기준으로 정리했습니다.',
  },
};

const FAQ_ITEMS = [
  {
    question: '환산취득가액이란 정확히 무엇인가요?',
    answer:
      '환산취득가액은 실지 취득가액을 확인할 수 없을 때 사용하는 추계 취득가액입니다(소득세법 §97①제1호 나목·시행령 §176의2). 양도당시 실지거래가액에 취득당시 기준시가 대 양도당시 기준시가 비율을 곱해 산정하며, 매매사례가액이나 감정가액이 없을 때 최종 대안으로 쓰입니다. 이 방식으로 취득가액을 잡으면 실제 필요경비는 인정되지 않고 개산공제만 적용됩니다.',
  },
  {
    question: '언제 환산취득가액을 쓸 수 있나요?',
    answer:
      '취득 당시 매매계약서·영수증 같은 실지거래가액 증빙이 사라졌거나 애초에 없을 때 씁니다. 소득세법 §97①제1호 나목은 매매사례가액, 감정가액, 환산취득가액, 기준시가 순서로 추계하도록 정하고 있어, 앞선 자료가 하나라도 있으면 그것을 먼저 적용해야 합니다. 오래된 상속·증여 부동산이나 1990년대 이전 취득 주택에서 가장 흔히 사용됩니다.',
  },
  {
    question: '환산취득가액 공식은 어떻게 되나요?',
    answer:
      '환산취득가액은 양도당시 실지거래가액에 취득당시 기준시가와 양도당시 기준시가의 비율을 곱해 계산합니다(소득세법 시행령 §176의2②③). 식으로 쓰면 환산취득가액 = 양도가액 × (취득당시 기준시가 / 양도당시 기준시가) 입니다. 예를 들어 양도가 6억, 취득 기준시가 1억, 양도 기준시가 3억이면 6억 × (1억 / 3억) = 2억이 됩니다.',
  },
  {
    question: '개산공제 3%는 어떤 의미인가요?',
    answer:
      '개산공제는 실제 취득세·중개수수료·자본적지출 같은 필요경비 증빙이 없을 때 정액으로 인정해주는 필요경비입니다. 토지·건물은 취득당시 기준시가의 3%가 적용됩니다. 환산취득가액을 선택하면 실제 필요경비를 따로 인정받지 못하고, 이 개산공제 3%만 필요경비로 차감할 수 있다는 점이 큰 함정입니다.',
  },
  {
    question: '환산가액 5% 가산세는 언제 붙나요?',
    answer:
      '건물을 신축하거나 증축한 뒤 5년 이내에 양도하면서 취득가액을 환산취득가액으로 적용하면, 해당 건물 환산취득가액의 5%가 가산세로 부과됩니다(소득세법 §114의2). 산출세액이 0원이어도 부과되며, 신축 원가 자료를 은폐하거나 세부담을 임의로 줄이려는 시도를 막기 위한 제도입니다. 토지에는 적용되지 않고 신축·증축 건물 부분에만 적용됩니다.',
  },
  {
    question: '실거래가와 환산가액 중 유리한 쪽으로 자유롭게 선택할 수 있나요?',
    answer:
      '아니요, 임의 선택은 인정되지 않습니다. 실지거래가액을 확인할 수 있다면 그 값을 반드시 우선 적용해야 하며, 확인 불가일 때만 매매사례가액·감정가액·환산취득가액·기준시가 순서로 추계할 수 있습니다. 실질과세 원칙(국세기본법 §14)에 따라 실지거래가액이 뒤늦게 확인되면 과세관청은 환산가액 신고를 실거래가로 경정할 수 있습니다.',
  },
  {
    question: '취득당시 기준시가는 어디서 확인하나요?',
    answer:
      '주택은 국토교통부 부동산공시가격알리미(realtyprice.kr)에서 공시가격 이력을 조회할 수 있고, 토지는 개별공시지가를, 오피스텔·상업용 건물은 국세청 기준시가를 확인해야 합니다. 1985년 이전 취득 부동산처럼 기준시가 자료 자체가 없을 때는 홈택스 양도소득세 상담센터나 세무사와 별도 협의가 필요합니다.',
  },
  {
    question: '환산취득가액을 쓰면 장기보유특별공제도 받을 수 있나요?',
    answer:
      '네, 장기보유특별공제와 기본공제 250만원(소득세법 §103)은 환산취득가액 여부와 무관하게 적용됩니다. 다만 보유기간 요건과 1세대1주택 여부에 따라 공제율이 크게 달라지므로, 오래 보유한 부동산이라면 장기보유특별공제 조건을 반드시 함께 확인하세요.',
  },
];

export default function CapitalGainsConvertedAcquisitionValue2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '양도세 환산취득가액 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '양도세 환산취득가액 2026, 취득가액 모를 때 공식과 5% 가산세',
    description:
      '오래된 부동산을 양도할 때 실지 취득가액 증빙이 없다면 환산취득가액으로 추계할 수 있습니다. 공식, 개산공제 3%, 신축·증축 5년 이내 양도 시 5% 가산세까지 소득세법 §97·§114의2 기준으로 정리합니다.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['환산취득가액', '취득가액 모를때 양도세', '개산공제', '환산가액 가산세', '소득세법 97조'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '양도세 환산취득가액 2026',
    description:
      '취득 실거래가 증빙이 없을 때 쓰는 환산취득가액의 공식, 개산공제, 5% 가산세, 실거래가 비교까지 정리한 실전 가이드.',
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
                    { name: '양도세 환산취득가액 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">오래된 부동산 양도자 · 8분 읽기 · 2026-08-02</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  양도세 환산취득가액 2026
                  <br />
                  <span className="text-2xl text-text-secondary">취득가액 모를 때 계산과 가산세</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  1990년대 이전에 취득했거나 상속·증여로 물려받아 취득 당시 매매계약서가 남아 있지 않은 부동산을 팔면, 양도세 계산의 첫 단추인 취득가액을 어떻게 잡을지가 문제입니다. 이럴 때 소득세법이 마지막 순서로 인정하는 방식이 환산취득가액입니다. 이 가이드는 공식, 개산공제 3%, 신축 후 5년 이내 양도 시 붙는 5% 가산세, 실거래가와의 비교까지 소득세법 §97·§114의2를 기준으로 정리합니다.
                </p>
              </header>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">환산취득가액이란 무엇인가</h2>
                <p>
                  환산취득가액은 실지 취득가액을 확인할 수 없을 때 사용하는 추계 취득가액입니다. 소득세법 §97①제1호 나목은 취득가액을 확정할 자료가 없을 때 매매사례가액, 감정가액, 환산취득가액, 기준시가의 순서로 적용하도록 정하고 있습니다. 매매사례가액과 감정가액이 없는 경우, 그 다음 순위로 등장하는 것이 바로 환산취득가액입니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">한 줄 정의</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    환산취득가액은 양도당시 실지거래가액에 취득당시 기준시가와 양도당시 기준시가의 비율을 곱해 산출하는 취득가액입니다.
                    <br />
                    관련 법령: 소득세법 §97①제1호 나목, 시행령 §176의2②③
                  </p>
                </div>
                <p className="mt-4">
                  다만 환산가액을 쓰는 순간 실제 지출한 취득세·중개수수료·자본적지출 등 필요경비는 별도로 인정되지 않고, 개산공제 3%만 적용됩니다. 신축 후 단기 양도인 경우에는 5% 가산세까지 얹혀서, 언뜻 유리해 보이는 이 방식이 실제로는 세부담을 늘리는 경우도 흔합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">언제 환산취득가액을 쓰나요?</h2>
                <p>
                  결론부터 말하면 실지거래가액을 어떤 자료로도 입증할 수 없을 때만 쓸 수 있습니다. 소득세법이 정한 추계 순서는 다음과 같습니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 취득가액 추계 순서 (소득세법 §97①제1호 나목)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">순위</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">추계 방법</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">인정 자료</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">0</td>
                        <td className="p-3"><strong>실지거래가액</strong></td>
                        <td className="p-3">매매계약서, 대금 지급 증빙, 세금계산서</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">1</td>
                        <td className="p-3">매매사례가액</td>
                        <td className="p-3">취득일 전후 3개월 이내 유사 부동산 거래가</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">2</td>
                        <td className="p-3">감정가액</td>
                        <td className="p-3">취득일 전후 3개월 이내 감정평가 2건 평균</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">3</td>
                        <td className="p-3"><strong>환산취득가액</strong></td>
                        <td className="p-3">양도가 × 취득기준시가 / 양도기준시가</td>
                      </tr>
                      <tr>
                        <td className="p-3">4</td>
                        <td className="p-3">기준시가</td>
                        <td className="p-3">취득당시 국세청·국토부 기준시가</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  현실적으로 실지거래가액 다음으로 가장 자주 쓰이는 것이 환산취득가액입니다. 매매사례가액이나 감정가액은 자료 자체가 흔치 않기 때문입니다.
                </p>
                <p className="mt-4">
                  다만, 세무서가 관련 시스템에서 실지거래가액이나 상속·증여 신고가액을 확인할 수 있는 경우에는 이를 먼저 적용해야 합니다. 자료가 있는데도 환산가액을 임의로 쓰면 나중에 경정 대상이 됩니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">환산취득가액은 어떻게 계산하나요?</h2>
                <p>
                  환산취득가액은 취득 시점과 양도 시점의 기준시가 비율을 이용해 양도가액을 과거 시점으로 되돌려 계산합니다. 공식은 다음과 같습니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">공식 (소득세법 시행령 §176의2②③)</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    환산취득가액 = 양도당시 실지거래가액 × (취득당시 기준시가 / 양도당시 기준시가)
                  </p>
                </div>

                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 1. 오래된 아파트 양도 (일반 시나리오)</p>
                  <p className="text-sm text-text-secondary">
                    · 양도가액: 6억원
                    <br />
                    · 취득당시 기준시가: 1억원
                    <br />
                    · 양도당시 기준시가: 3억원
                    <br />
                    · 환산취득가액: 6억 × (1억 / 3억) = <strong>2억원</strong>
                    <br />
                    · 개산공제: 1억 × 3% = <strong>300만원</strong>
                    <br />
                    · 양도차익: 6억 - 2억 - 300만 = <strong>3억 9,700만원</strong>
                    <br />
                    <span className="text-xs text-text-tertiary">장기보유특별공제와 기본공제 250만원은 별도로 차감된 뒤 세율이 적용됩니다.</span>
                  </p>
                </div>

                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 2. 위 사례에서 세액까지 산정</p>
                  <p className="text-sm text-text-secondary">
                    사례 1의 양도차익 3억 9,700만원에서 기본공제 250만원(소득세법 §103)만 반영해 최소 시나리오를 계산합니다. 장기보유특별공제는 보유기간·주택 여부에 따라 달라지므로 0으로 가정합니다.
                    <br />
                    · 과세표준: 3억 9,700만 - 250만 = <strong>3억 9,450만원</strong>
                    <br />
                    · 세율 구간: 3억 초과 5억 이하 → 40%, 누진공제 2,594만원
                    <br />
                    · 산출세액: 3억 9,450만 × 40% - 2,594만 = <strong>1억 3,186만원</strong>
                    <br />
                    · 지방소득세: 1억 3,186만 × 10% = <strong>1,318.6만원</strong>
                    <br />
                    <span className="text-xs text-text-tertiary">실제로는 장기보유특별공제와 주택 여부에 따라 세액이 크게 낮아질 수 있습니다.</span>
                  </p>
                </div>

                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 3. 신축 상가 3년 뒤 양도, 5% 가산세 발생</p>
                  <p className="text-sm text-text-secondary">
                    · 양도가액: 5억원 (건물 부분만 가정)
                    <br />
                    · 취득당시 기준시가: 2억원 (신축 당시)
                    <br />
                    · 양도당시 기준시가: 3억원
                    <br />
                    · 환산취득가액: 5억 × (2억 / 3억) ≈ <strong>3억 3,333만원</strong>
                    <br />
                    · 5% 가산세: 3억 3,333만 × 5% ≈ <strong>1,666만원</strong>
                    <br />
                    <span className="text-xs text-text-tertiary">이 가산세는 산출세액이 0원이라도 별도로 부과됩니다(소득세법 §114의2). 사례 2의 세액과 사례 3의 가산세는 서로 다른 시나리오입니다.</span>
                  </p>
                </div>

                <p className="mt-4">
                  예외: 기준시가 이력이 남아 있지 않은 1985년 이전 취득 부동산이나 특수한 재개발 지역은 시행령 §176의2 단서에 따른 별도 산정 방식이 적용될 수 있으므로 홈택스 양도소득세 상담센터 또는 세무사와 반드시 함께 검토하세요.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">개산공제 3%란 무엇인가요?</h2>
                <p>
                  개산공제는 실제 필요경비 증빙이 없을 때 정액으로 인정되는 필요경비입니다. 토지·건물의 경우 취득당시 기준시가의 3%가 적용됩니다. 환산취득가액을 선택하면 실제로 지출한 취득세, 중개수수료, 자본적지출(리모델링·확장) 등을 별도로 인정받지 못하고 이 개산공제만 차감할 수 있다는 점이 핵심 함정입니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">개산공제와 실제 필요경비의 차이</p>
                  <p className="text-sm text-text-secondary">
                    · 취득 기준시가 1억 → 개산공제 <strong>300만원</strong>
                    <br />
                    · 실제 지출 필요경비 예시: 취득세 400만 + 중개수수료 300만 + 리모델링 3,000만 = <strong>3,700만원</strong>
                    <br />
                    · 환산취득가액을 쓰면 실제 3,700만원 대신 <strong>300만원만 인정</strong>
                    <br />
                    <span className="text-xs text-text-tertiary">필요경비 3,400만원이 사라지는 셈이므로, 실지거래가액 증빙이 있다면 그쪽이 유리할 수 있습니다.</span>
                  </p>
                </div>
                <p className="mt-4">
                  예외: 미등기양도자산이나 소득세법 시행령 §163⑥ 단서에 해당하는 특수 자산은 개산공제율이 달라집니다. 일반 토지·건물이 아닌 경우 반드시 국세청 안내를 확인하세요.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">환산가액 5% 가산세는 언제 붙나요?</h2>
                <p>
                  건물을 신축하거나 증축한 뒤 5년 이내에 양도하면서 취득가액을 환산취득가액으로 적용하면, 해당 건물 환산취득가액의 5%가 가산세로 부과됩니다. 근거 조항은 소득세법 §114의2입니다. 이 가산세는 산출세액이 0원인 경우에도 부과되며, 신축 원가 자료를 은폐하거나 세부담을 인위적으로 축소하는 것을 막기 위한 장치입니다.
                </p>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li><strong>대상</strong>: 신축·증축한 건물을 5년 이내 양도하면서 환산취득가액 적용</li>
                  <li><strong>금액</strong>: 해당 건물 환산취득가액의 5%</li>
                  <li><strong>적용 범위</strong>: 토지에는 적용되지 않고 건물 부분에만 적용</li>
                  <li><strong>부과 방식</strong>: 산출세액과 별개로 부과되어, 산출세액이 0원이어도 5% 가산세는 남음</li>
                </ul>
                <p className="mt-4">
                  다만, 신축 후 6년이 지나 양도하거나 실지 취득가액을 정상적으로 신고한다면 이 가산세는 발생하지 않습니다. 신축 부동산을 처분할 계획이라면 보유 기간 5년 경과 여부를 반드시 확인하세요.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">실거래가 vs 환산취득가액, 어느 쪽이 유리한가요?</h2>
                <p>
                  결론부터 말하면 상황에 따라 다르지만, 실지 취득가액 증빙이 있다면 원칙적으로 실거래가로 신고해야 하고, 환산가액과의 비교는 참고용에 그칠 뿐 임의로 유리한 쪽을 고를 수 없습니다. 소득세법이 정한 순서를 따를 뿐입니다. 다만 어떤 경우에 환산가액이 실질적으로 불리하게 작용하는지 이해하면 신고 준비를 훨씬 정교하게 할 수 있습니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 2. 실지거래가액 vs 환산취득가액 비교</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">항목</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">실지거래가액</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">환산취득가액</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">취득가액 산정</td>
                        <td className="p-3">계약서상 실제 지불액</td>
                        <td className="p-3">양도가 × 기준시가 비율</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">필요경비 인정</td>
                        <td className="p-3">취득세·중개수수료·자본적지출 실액</td>
                        <td className="p-3">개산공제(기준시가의 3%)만 인정</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">5% 가산세</td>
                        <td className="p-3">없음</td>
                        <td className="p-3">신축·증축 5년 이내 양도 시 부과</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">경정 리스크</td>
                        <td className="p-3">낮음</td>
                        <td className="p-3">실지가 확인되면 경정 가능</td>
                      </tr>
                      <tr>
                        <td className="p-3">선택 자유</td>
                        <td className="p-3">확인되면 우선 적용 의무</td>
                        <td className="p-3">앞선 자료 없을 때만 사용</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  실지 취득가액이 매우 낮았고 자본적지출 증빙도 미미한 오래된 부동산은 환산가액이 오히려 취득가액을 크게 잡아 세부담이 줄어드는 경우가 있습니다. 반대로 최근에 취득해 취득세·중개수수료·리모델링비 실 증빙이 많다면 실거래가로 필요경비를 인정받는 편이 압도적으로 유리합니다.
                </p>
                <p className="mt-4">
                  예외: 양도가액을 실지거래가액으로 신고하면 취득가액도 실지거래가액으로 대응하는 것이 원칙입니다. 한 쪽만 임의로 환산가액을 쓰면 실질과세 원칙(국세기본법 §14)에 어긋나 경정될 수 있습니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">자주 하는 실수와 주의점</h2>
                <p>
                  환산취득가액은 계산 자체는 간단하지만, 실제 신고 단계에서 자주 발생하는 실수와 리스크가 뚜렷합니다. 아래 항목은 세무서 경정이나 가산세 부과로 이어지는 대표 사례입니다.
                </p>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li>
                    <strong>실지거래가 증빙이 있는데도 환산가액 신고</strong>: 계약서·통장 이체 내역이 남아 있는데 환산가액이 유리하다는 이유로 환산 신고하는 경우, 실질과세 원칙에 따라 실거래가로 경정될 수 있습니다.
                  </li>
                  <li>
                    <strong>양도가만 실거래·취득가만 환산 혼용</strong>: 양도가액을 실지거래가액으로 신고했다면 취득가액도 실지거래가액을 우선 확인해야 합니다. 한쪽만 임의로 환산가액을 쓰는 혼용은 인정되지 않습니다.
                  </li>
                  <li>
                    <strong>기준시가 이력 오기입</strong>: 아파트 공시가격 이력, 개별공시지가 이력을 잘못 조회해 취득당시 값을 부풀리면 취득가액이 과대 산정되어 나중에 감액 경정과 함께 가산세가 붙습니다.
                  </li>
                  <li>
                    <strong>신축 5년 이내 여부 확인 누락</strong>: 5% 가산세 대상인 신축·증축 5년 이내 양도라는 사실을 몰라서 산출세액만 계산하는 경우가 흔합니다. 사용승인일 기준으로 반드시 확인하세요.
                  </li>
                  <li>
                    <strong>개산공제로 실제 지출 대체 착각</strong>: 취득세와 중개수수료를 별도로 필요경비 처리하려는 시도가 있는데, 환산가액을 쓰는 순간 개산공제 3%가 필요경비의 전부입니다.
                  </li>
                </ul>
                <p className="mt-4">
                  다만 세법 해석이 애매한 부분이 남아 있는 사안(재개발 관리처분, 상속·증여 자산 등)은 국세청 사전답변 제도나 세무사 검토를 병행하는 편이 안전합니다. 신고 후 3개월 이내 경정청구 제도도 있으므로 확정신고 전 다시 한번 검토하세요.
                </p>
              </section>

              <h2 className="text-2xl font-bold mb-6">자주 묻는 질문</h2>
              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h3 className="text-lg font-semibold text-text-primary">관련 계산기 및 가이드</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link
                    href="/calculator/capital-gains-tax/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">양도소득세 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">환산취득가액과 실거래가를 입력해 예상 세액을 비교해보세요.</p>
                  </Link>
                  <Link
                    href="/guide/capital-gains-necessary-expenses-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">양도세 필요경비 정리</div>
                    <p className="mt-1 text-sm text-text-secondary">실지거래가액 신고 시 인정되는 취득세·중개수수료·자본적지출.</p>
                  </Link>
                  <Link
                    href="/guide/capital-gains-tax-5-steps/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">양도세 5단계 계산법</div>
                    <p className="mt-1 text-sm text-text-secondary">양도차익부터 과세표준·세율 적용까지 단계별로 이해하기.</p>
                  </Link>
                  <Link
                    href="/guide/long-term-holding-special-deduction-80-percent/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">장기보유특별공제 완전정리</div>
                    <p className="mt-1 text-sm text-text-secondary">오래 보유한 부동산의 공제율과 1세대1주택 특례.</p>
                  </Link>
                  <Link
                    href="/guide/capital-gains-tax-preliminary-return-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">양도세 예정신고 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">양도일 다음달 말일 기준 예정신고 기한과 방법.</p>
                  </Link>
                  <Link
                    href="/category/tax/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">모든 세금 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">양도세·취득세·재산세·종부세·상속세 모음.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 교육 목적으로 작성되었으며, 개인 맞춤형 세무 조언이 아닙니다. 환산취득가액 적용 여부, 기준시가 이력, 5% 가산세 부과 여부는 국세청 홈택스와 관할 세무서에서 반드시 확인하세요. 특히 신축·증축 5년 이내 양도, 재개발 관리처분, 상속·증여 자산 등은 상황이 복잡하므로 세무사 상담이 안전합니다. 본 콘텐츠는 2026-08-02를 기준으로 작성되었으며, 세법 개정 시 업데이트됩니다. 주요 근거 법조항은 <strong>소득세법 §97①제1호 나목(추계 순서), 소득세법 시행령 §176의2②③(환산취득가액 산정식), 소득세법 §103(양도소득 기본공제 250만원), 소득세법 §114의2(환산가액 적용 5% 가산세), 국세기본법 §14(실질과세 원칙)</strong>입니다. AI 보조 작성 후 운영자 검수 완료.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터</a>,{' '}
                  <a href="https://www.nts.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">국세청</a>,{' '}
                  <a href="https://www.hometax.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">국세청 홈택스</a>.
                </p>
              </section>

              <ShareButtons
                title="양도세 환산취득가액 2026 가이드"
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