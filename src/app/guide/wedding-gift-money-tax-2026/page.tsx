// [revenue-lever: indexing+traffic]
// indexing: 신규 슬러그 색인 표면 확장, 내부 링크 mesh 6개(증여재산공제 한도·증여세 계산·혼인출산공제·가족 차용증·상속세 계산기·세금 허브).
// traffic: 결혼 시즌 "축의금 증여세"·"혼수용품 증여세"·"예단 예물 세금" 롱테일 흡수(상증법 §46 비과세·시행령 §35④3·4호 직접지출 요건).
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

const URL = 'https://calculatorhost.com/guide/wedding-gift-money-tax-2026/';
const DATE_PUBLISHED = '2026-09-22';
const DATE_MODIFIED = '2026-09-22';

export const metadata: Metadata = {
  title: '축의금 혼수용품 증여세 2026, 과세 기준 완전 정리',
  description:
    '결혼식 축의금은 원칙적으로 증여세가 없습니다. 하객이 낸 돈은 낸 사람과 받는 사람의 관계별로 귀속이 갈리고, 혼수용품도 통상 필요한 수준이면 비과세입니다(상증법 §46, 시행령 §35④). 예단·예물·혼수 사치품의 과세 경계와 계산 사례까지 정리했습니다.',
  keywords: [
    '축의금 증여세',
    '혼수용품 증여세',
    '예단 증여세',
    '예물 세금',
    '결혼 축의금 세금',
    '상증법 46조',
    '혼인 증여공제',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '축의금 혼수용품 증여세 2026, 과세 기준 완전 정리' }],
    title: '축의금 혼수용품 증여세 2026, 과세 기준 완전 정리',
    description: '축의금은 원칙적으로 비과세. 혼수용품도 통상 필요한 범위면 과세되지 않습니다. 상증법 §46·시행령 §35④ 기준.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '축의금 혼수용품 증여세 2026, 과세 기준 완전 정리',
    description: '축의금·혼수용품 비과세 요건과 사치품·신혼집·자동차의 과세 경계. 상증법 §46·시행령 §35④.',
  },
};

const FAQ_ITEMS = [
  {
    question: '축의금 총액이 1억원이 넘으면 증여세를 내야 하나요?',
    answer:
      '총액이 아니라 낸 사람별로 판단하므로 대부분 문제가 되지 않습니다. 하객 1,000명이 각자 10만원씩 냈다면 총액은 1억원이지만 1인당 증여액은 10만원 수준이라 사회통념상 통상 필요한 금액을 넘지 않습니다(상증법 §46, 시행령 §35④3호). 다만 특정 소수가 수천만원 단위의 큰 금액을 이체했다면 그 부분만 따로 증여로 재분류될 수 있습니다.',
  },
  {
    question: '축의금은 신랑신부 것인가요, 부모님 것인가요?',
    answer:
      '실무상 원칙은 누구의 하객이 냈는지에 따라 갈립니다. 신랑신부의 지인·직장 동료가 낸 축의금은 신랑신부에게, 부모님의 지인·거래처가 낸 축의금은 부모님에게 귀속되는 것으로 보는 것이 국세청의 일반적인 해석입니다. 결혼식 방명록이나 봉투에 하객과의 관계를 기록해두면 분쟁이나 자금출처조사 시 근거 자료가 됩니다.',
  },
  {
    question: '예단비를 계좌이체로 받으면 증여세 신고를 해야 하나요?',
    answer:
      '통상적인 수준의 예단비라면 신고할 필요가 없습니다. 시행령 §35④4호는 혼수용품으로서 통상 필요하다고 인정되는 금품을 비과세로 규정하며, 예단·예물·예식 비용 등 결혼 과정에서 관례적으로 오가는 비용이 여기 해당합니다. 다만 이 비과세는 해당 용도에 직접 지출한 경우에만 인정되므로(§35④ 본문), 계좌이체 받은 돈을 소비하지 않고 예금으로 쌓아두면 비과세에서 제외될 수 있습니다.',
  },
  {
    question: '신혼집이나 혼수 자동차도 비과세인가요?',
    answer:
      '아닙니다. 시행령 §35④가 정하는 비과세는 예단·예물·예식비용처럼 통상적인 혼수 범위에 한정됩니다. 신혼집 전세보증금이나 매매대금, 혼수용 자동차처럼 고액의 재산 형성에 해당하는 지원은 증여세 과세 대상입니다. 이런 경우는 §53 증여재산공제(성년 자녀 5,000만원, 10년 합산)와 §53의2 혼인·출산 증여공제(1억원)를 함께 검토해야 합니다.',
  },
  {
    question: '명품 가방이나 고가 보석도 혼수용품 비과세에 들어가나요?',
    answer:
      '들어가지 않을 가능성이 높습니다. 시행령 §35④4호의 혼수용품 비과세는 통상 필요하다고 인정되는 수준에 한정되며, 고가 가구·보석·명품 등 사치품은 이 범위를 벗어난다고 보는 것이 국세청의 일반적인 시각입니다. 결혼 예물로 받은 물품이 사회통념상 과도하다고 판단되면 시가 상당액이 증여세 과세표준에 포함될 수 있습니다.',
  },
  {
    question: '부모님이 결혼식 비용을 전부 부담하면 자녀에게 증여세가 붙나요?',
    answer:
      '예식장 대관료, 스드메, 피로연 비용처럼 결혼식 자체를 치르는 데 드는 통상적인 비용은 시행령 §35④가 정하는 혼수용품·예식비용 범주로 비과세인 것이 일반적입니다. 부모가 예식 업체에 직접 결제하는 구조라면 더 안전합니다. 다만 결혼식 비용을 훨씬 초과하는 현금을 자녀 계좌로 먼저 이체한 뒤 자녀가 임의로 쓰게 하는 방식은 증여로 재분류될 위험이 있습니다.',
  },
  {
    question: '혼인 증여공제 1억원과 예단·축의금 비과세는 같이 쓸 수 있나요?',
    answer:
      '네, 서로 별개 제도라 함께 적용됩니다. 혼인신고일 전후 각 2년 이내에 직계존속에게서 받은 재산은 기본공제 5,000만원과 별도로 최대 1억원까지 추가 공제됩니다(§53의2, 2024.1.1 시행). 예단·예물처럼 시행령 §35④가 정한 통상적인 혼수용품은 애초에 증여재산가액 계산에서 빠지므로 이 공제 한도를 소진하지 않습니다.',
  },
  {
    question: '축의금이나 혼수 지원을 신고하지 않으면 나중에 문제가 되나요?',
    answer:
      '통상적인 범위의 축의금·혼수용품은 애초에 비과세 대상이라 신고 의무가 없습니다. 문제는 과세 대상인데 신고하지 않은 경우입니다. 증여받은 날이 속한 달의 말일부터 3개월 이내 신고해야 하며(§68), 무신고 시 일반 20%, 부정 무신고 시 40%의 가산세가 붙습니다. 신혼집 마련처럼 큰 금액이 오갔다면 과세 대상인지 미리 확인하는 것이 안전합니다.',
  },
];

export default function WeddingGiftMoneyTax2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '축의금 혼수용품 증여세 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '축의금 혼수용품 증여세 2026, 과세 기준 완전 정리',
    description:
      '결혼식 축의금과 예단·예물 등 혼수용품의 증여세 비과세 요건, 사치품·신혼집·자동차의 과세 경계, 혼인 증여공제와의 관계를 상증법 §46·시행령 §35④ 기준으로 정리.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['축의금 증여세', '혼수용품 증여세', '예단 예물 세금', '상증법 46조', '혼인 증여공제'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '축의금 혼수용품 증여세 2026',
    description:
      '축의금·예단·예물 등 혼수용품의 증여세 비과세 요건과 과세로 전환되는 경계를 정리한 가이드.',
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
                    { name: '축의금 혼수용품 증여세 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">예비부부·혼주 · 8분 읽기 · 2026-09-22</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  축의금 혼수용품 증여세 2026
                  <br />
                  <span className="text-2xl text-text-secondary">· 과세 기준 완전 정리</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  결혼을 앞두고 가장 자주 묻는 질문 중 하나가 축의금과 예단·예물 같은 혼수용품에 증여세가 붙는지입니다. 결론부터 말하면 통상적인 수준의 축의금과 혼수용품은 원칙적으로 비과세입니다(상속세 및 증여세법 §46, 시행령 §35④). 다만 이 비과세는 조건이 있고, 신혼집이나 혼수 자동차처럼 큰 재산은 별도로 과세 대상이 됩니다. 이 가이드는 어디까지 비과세이고 어디부터 과세인지, 계산 사례까지 함께 정리합니다.
                </p>
              </header>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">Q. 축의금에도 증여세가 붙나요?</h2>
                <p>
                  원칙적으로 붙지 않습니다. 상속세 및 증여세법 §46은 사회통념상 인정되는 이재구호금품·치료비·피부양자의 생활비·교육비, 그 밖에 이와 유사한 것으로서 대통령령으로 정하는 것을 비과세 증여재산으로 규정합니다. 시행령 §35④3호는 이 가운데 기념품·축하금·부의금으로서 통상 필요하다고 인정되는 금품을 명시하고 있어, 결혼식 축의금이 여기 해당합니다.
                </p>
                <p>
                  판단 기준은 총액이 아니라 낸 사람별 금액입니다. 하객 수백 명이 나눠서 낸 축의금 총액이 크더라도, 1인당 금액이 사회통념상 통상적인 수준(보통 5만~20만원대)이라면 증여로 보지 않습니다. 국세청은 이런 경우 개별 하객과 신랑신부·혼주의 친분 관계에서 통상적으로 오가는 금품으로 판단합니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">30초 요약</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    원칙: 통상 수준의 축의금·혼수용품은 비과세(상증법 §46, 시행령 §35④3·4호).
                    <br />
                    판단: 총액이 아니라 하객 1인당 금액 기준.
                    <br />
                    조건: 해당 용도에 직접 지출한 경우만 인정(§35④ 본문).
                    <br />
                    예외: 신혼집·자동차·사치품·거액 목돈은 과세 대상.
                  </p>
                </div>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">Q. 축의금은 신랑신부 것인가요, 부모님 것인가요?</h2>
                <p>
                  하객과 누구의 친분인지에 따라 귀속이 갈립니다. 신랑신부의 친구·직장 동료가 낸 축의금은 신랑신부의 재산으로, 부모님의 지인·거래처 관계자가 낸 축의금은 부모님의 재산으로 보는 것이 실무상 원칙입니다. 결혼식은 보통 혼주(부모)와 신랑신부가 함께 하객을 초대하므로 축의금도 두 갈래로 나뉘어 귀속됩니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 축의금 귀속 판단 기준</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">하객 관계</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">귀속</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">비고</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">신랑신부의 친구·동료</td>
                        <td className="p-3">신랑신부</td>
                        <td className="p-3">방명록에 관계 기록 권장</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">부모님의 지인·거래처</td>
                        <td className="p-3">부모님</td>
                        <td className="p-3">신랑신부에게 넘기면 별도 증여</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">양가 공동 하객(친척 등)</td>
                        <td className="p-3">사안별 판단</td>
                        <td className="p-3">봉투 표기·정황으로 구분</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  다만, 부모님 몫으로 받은 축의금을 부모님이 그대로 신혼집 마련 비용 등으로 신랑신부에게 넘기면, 그 이전 행위 자체가 별도의 증여로 취급될 수 있습니다. 이때는 §53 증여재산공제(성년 자녀 5,000만원, 10년 합산)와 §53의2 혼인 증여공제(1억원) 한도 내인지 확인해야 합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">Q. 예단 예물 혼수용품은 어디까지 비과세인가요?</h2>
                <p>
                  통상 필요하다고 인정되는 수준의 예단·예물·예식비용은 비과세입니다. 시행령 §35④4호는 혼수용품으로서 통상 필요하다고 인정되는 금품을 비과세 대상으로 명시하며, 예단비·예물(반지·시계 등)·결혼식 비용이 여기 해당하는 것이 일반적인 해석입니다. 다만 §35④ 본문이 정한 대로 그 용도에 직접 지출된 경우에만 비과세가 인정됩니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">비과세로 보는 혼수용품 예시 (시행령 §35④4호)</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    · 통상적인 수준의 예단비, 예물(반지·시계 등)
                    <br />
                    · 예식장 대관료, 스드메(스튜디오·드레스·메이크업) 비용
                    <br />
                    · 신혼여행 경비 중 사회통념상 인정되는 범위
                    <br />
                    · 일상적인 가전·가구 등 생활 혼수용품
                  </p>
                </div>
                <p>
                  다만, 예단·예물을 명목으로 받은 현금을 소비하지 않고 예금이나 투자에 넣어 재산을 쌓으면 그 부분은 비과세에서 제외됩니다. 실제 혼수 목적으로 지출됐다는 증빙(영수증, 결제 내역)을 남겨두면 국세청 확인 요청 시 근거가 됩니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">Q. 신혼집이나 혼수 자동차도 비과세인가요?</h2>
                <p>
                  아닙니다. 시행령 §35④의 혼수용품 비과세는 예단·예물·예식비용처럼 통상적인 범위에 한정되며, 신혼집 전세보증금이나 매매대금, 혼수용 자동차처럼 고액의 재산 형성에 해당하는 지원은 증여세 과세 대상입니다. 국세청은 이런 항목을 사회통념상 필요한 혼수 범위를 벗어난 것으로 봅니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">과세 대상으로 보는 대표 항목</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    · 신혼집 전세보증금·매매대금 지원
                    <br />
                    · 혼수용 자동차 구입 지원
                    <br />
                    · 고가 명품 가방·보석 등 사치품
                    <br />
                    · 통상 범위를 크게 초과한 거액 현금 이체
                  </p>
                </div>
                <p className="mt-4">
                  다만, 이런 지원도 §53 증여재산공제(성년 자녀 5,000만원, 10년 합산)와 §53의2 혼인·출산 증여공제(1억원, 2024.1.1 시행)를 함께 활용하면 상당 부분 세 부담을 낮출 수 있습니다. 두 공제는 별개 제도라 중복 적용됩니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">Q. 신혼집 자금을 지원받으면 세금은 얼마인가요?</h2>
                <p>
                  증여재산가액에서 §53·§53의2 공제를 뺀 과세표준에 §56의 5단계 누진세율(10~50%)을 적용해 계산합니다. 혼인 증여공제는 혼인신고일 전후 각 2년 이내 직계존속에게서 받은 재산에 기본공제와 별도로 최대 1억원까지 적용됩니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3">
                  <p className="font-semibold text-text-primary">사례 1. 성년 자녀가 신혼집 자금으로 1억 5,000만원을 받은 경우</p>
                  <p className="text-sm text-text-secondary">
                    · 증여재산가액: 1억 5,000만원
                    <br />
                    · 기본공제(§53, 성년): 5,000만원
                    <br />
                    · 혼인 증여공제(§53의2): 1억원
                    <br />
                    · 과세표준: 1억 5,000만 - 5,000만 - 1억 = 0원
                    <br />
                    · 산출세액: <strong>0원</strong>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 2. 신혼집 자금으로 2억원을 받은 경우 (공제 한도 초과)</p>
                  <p className="text-sm text-text-secondary">
                    · 증여재산가액: 2억원
                    <br />
                    · 기본공제(§53) + 혼인 증여공제(§53의2): 5,000만 + 1억 = 1억 5,000만원
                    <br />
                    · 과세표준: 2억 - 1억 5,000만 = 5,000만원
                    <br />
                    · 세율(§56): 1억 이하 10%, 누진공제 0
                    <br />
                    · 산출세액: 5,000만 × 10% = <strong>500만원</strong>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 3. 공제 없이 혼수 자동차 5,000만원을 지원받은 경우 (경계값)</p>
                  <p className="text-sm text-text-secondary">
                    · 증여재산가액: 5,000만원 (이미 §53 기본공제를 다른 증여로 소진한 상태 가정)
                    <br />
                    · 추가 공제: 0원
                    <br />
                    · 과세표준: 5,000만원
                    <br />
                    · 세율(§56): 1억 이하 10%
                    <br />
                    · 산출세액: 5,000만 × 10% = <strong>500만원</strong>
                    <br />
                    <span className="text-xs text-text-tertiary">참고: 기본공제를 아직 쓰지 않았다면 5,000만원 전액이 공제되어 세액은 0원입니다.</span>
                  </p>
                </div>
                <p className="mt-4">
                  다만, 이 계산은 축의금·혼수용품 비과세와는 별개입니다. 예단·예물·예식비용처럼 시행령 §35④가 정한 통상적인 혼수용품은 애초에 증여재산가액 계산에 포함되지 않으므로 위 사례처럼 공제 한도를 따질 필요가 없습니다. 신혼집·자동차처럼 명백히 재산 형성에 해당하는 지원만 이 계산 대상입니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">Q. 명품이나 고가 보석 예물도 비과세인가요?</h2>
                <p>
                  통상적인 수준을 벗어난다고 보는 것이 일반적입니다. 시행령 §35④4호의 혼수용품 비과세는 사회통념상 필요하다고 인정되는 범위에 한정되며, 고가 명품 가방이나 다이아몬드 등 고가 보석류는 이 범위를 벗어난다고 판단될 여지가 있습니다. 예물의 가액이 지나치게 크면 시가 상당액이 증여세 과세표준에 포함될 수 있습니다.
                </p>
                <p>
                  다만, 지역이나 집안 관례에 따라 예물 수준이 다르고 국세청도 개별 사실관계를 종합해 판단하므로 일률적인 금액 기준은 없습니다. 예물 가액이 크다면 미리 세무 전문가와 상담해 과세 위험을 점검하는 것이 안전합니다.
                </p>
              </section>

              <h2 className="text-2xl font-bold mb-6">자주 묻는 질문</h2>
              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h3 className="text-lg font-semibold text-text-primary">관련 계산기 및 가이드</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link
                    href="/guide/gift-tax-exemption-limit-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">증여재산공제 한도 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">가족 관계별 10년 합산 공제 한도를 표로 확인하세요.</p>
                  </Link>
                  <Link
                    href="/guide/marriage-childbirth-gift-deduction-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">혼인·출산 증여공제 1억원</div>
                    <p className="mt-1 text-sm text-text-secondary">신혼집 자금 지원 시 함께 활용할 수 있는 추가 공제.</p>
                  </Link>
                  <Link
                    href="/guide/living-expenses-allowance-gift-tax-exemption-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">생활비·용돈 증여세</div>
                    <p className="mt-1 text-sm text-text-secondary">부모 자녀 간 생활비·용돈의 비과세 요건 정리.</p>
                  </Link>
                  <Link
                    href="/guide/gift-tax-calculation-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">증여세 계산법 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">과세표준, 누진세율, 산출세액까지 단계별로 알려드립니다.</p>
                  </Link>
                  <Link
                    href="/calculator/inheritance-tax/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">상속세 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">상속재산을 입력해 세액을 미리 계산해보세요.</p>
                  </Link>
                  <Link
                    href="/category/tax/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">모든 세금 가이드</div>
                    <p className="mt-1 text-sm text-text-secondary">양도세·취득세·상속세·증여세 모음.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 이 글은 AI 보조로 자동 생성되어 자동 품질 게이트를 통과한 뒤 발행되었습니다. 발행 시점에 사람의 사전 검수는 없었으며, 운영자가 사후 점검합니다. 본 가이드는 교육 목적으로 작성되었으며 개인 맞춤형 세무 조언이 아닙니다. 실제 비과세 인정 여부와 귀속 판단은 개별 사실관계(하객과의 관계, 지출 증빙, 금액 규모 등)에 따라 달라지므로 관할 세무서 또는 홈택스에서 반드시 확인하세요. 본 콘텐츠는 2026-09-22를 기준으로 작성되었으며, 세법 개정 시 업데이트됩니다. 인용 법조항: 상속세 및 증여세법 §46(비과세되는 증여재산), 같은 법 시행령 §35④(비과세되는 증여재산의 범위, 제3호 축하금·부의금·제4호 혼수용품), §53(증여재산공제), §53의2(혼인·출산 증여재산공제), §56(증여세 세율), §68(증여세 신고기한).
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.nts.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">국세청</a>,{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">국가법령정보센터</a>,{' '}
                  <a href="https://hometax.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">홈택스</a>.
                </p>
              </section>

              <ShareButtons
                title="축의금 혼수용품 증여세 2026 가이드"
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
