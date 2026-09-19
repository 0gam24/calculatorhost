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

const URL = 'https://calculatorhost.com/guide/title-trust-deemed-gift-2026/';
const DATE_PUBLISHED = '2026-09-20';
const DATE_MODIFIED = '2026-09-20';

export const metadata: Metadata = {
  title: '명의신탁 증여의제 2026, 차명 주식·부동산 세금 차이',
  description:
    '차명 주식은 조세회피 목적이 있으면 명의자 앞으로 증여세가 부과됩니다. 반면 차명 부동산은 증여의제가 아니라 부동산실명법상 과징금·형사처벌 대상입니다. 상증법 §45의2와 부동산실명법 §3·§5·§7 기준으로 정리했습니다.',
  keywords: [
    '명의신탁 증여의제',
    '차명주식 증여세',
    '차명 부동산 세금',
    '상증법 45조의2',
    '부동산실명법 과징금',
    '조세회피 목적',
    '명의신탁 처벌',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '명의신탁 증여의제 2026, 차명 주식·부동산 세금 차이' }],
    title: '명의신탁 증여의제 2026, 차명 주식은 증여세, 차명 부동산은 과징금',
    description: '조세회피 목적이 있는 차명주식은 증여세, 차명 부동산은 부동산실명법 과징금·형사처벌. 상증법 §45의2 기준 정리.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '명의신탁 증여의제 2026, 차명 주식·부동산 세금 차이',
    description: '차명주식은 증여세, 차명 부동산은 부동산실명법 과징금·형사처벌. 상증법 §45의2 정리.',
  },
};

const FAQ_ITEMS = [
  {
    question: '부모님이 제 이름으로 주식을 사주셨는데 증여세를 내야 하나요?',
    answer:
      '실제로 부모님이 매수 자금을 대고 관리도 계속 부모님이 하면서 명의만 자녀로 해둔 것이라면, 조세회피 목적이 인정될 경우 명의자인 자녀에게 증여세가 부과될 수 있습니다(상증법 §45의2①). 실제로 증여받아 온전히 소유권을 넘겨받은 것이라면 일반 증여이지 명의신탁이 아니므로 증여재산공제 등이 정상 적용됩니다. 자금 출처와 실제 지배관계가 핵심 판단 기준입니다.',
  },
  {
    question: '부동산도 명의신탁하면 증여세가 부과되나요?',
    answer:
      '아닙니다. 상증법 §45의2①은 등기·등록·명의개서가 필요한 재산 중 토지와 건물은 명시적으로 제외합니다. 부동산 명의신탁은 증여의제가 아니라 부동산실명법(부동산 실권리자명의 등기에 관한 법률)에서 원칙적으로 금지하고 과징금과 형사처벌로 다룹니다. 다만 명의신탁으로 넘어간 부동산의 취득 과정에서 실질적인 무상 증여가 있었다면 그 부분은 별도로 증여세 대상이 될 수 있습니다.',
  },
  {
    question: '배우자 이름으로 명의신탁해도 증여세가 부과되나요?',
    answer:
      '가족이라도 예외는 아닙니다. 상증법 §45의2는 명의자가 누구인지를 따지지 않고 실제소유자와 명의자가 다르면서 조세회피 목적이 있는지를 봅니다. 배우자 명의로 주식을 옮겨두면서 세금을 줄이려는 의도가 있었다면 배우자에게 증여세가 부과될 수 있고, 이때는 증여재산공제(배우자 6억 원)도 적용되지 않습니다.',
  },
  {
    question: '조세회피 목적이 없었다는 걸 어떻게 증명하나요?',
    answer:
      '판례상 조세회피 목적이 없었다는 사실은 명의자 쪽에서 적극적으로 입증해야 합니다. 명의신탁에 조세 경감과 무관한 뚜렷한 다른 목적, 예를 들어 회사 설립 요건상 발기인 수를 맞추기 위한 것이었다는 사정이 있고 그로 인한 조세 경감이 부수적이고 사소했다면 인정될 여지가 있습니다. 다만 애초에 조세회피 목적이 조금이라도 있었다면 다른 목적이 함께 있어도 증여의제가 적용됩니다.',
  },
  {
    question: '차명주식을 실제 소유자 이름으로 되돌리면 세금을 또 내나요?',
    answer:
      '아닙니다. 국세청 실무는 명의신탁재산을 실제소유자 명의로 환원하는 것을 새로운 증여로 보지 않습니다. 애초에 실질 소유권이 이동한 적이 없었다는 논리입니다. 다만 명의신탁을 설정할 당시 이미 조세회피 목적이 인정되면 그 시점에 부과된 증여세 자체는 환원과 무관하게 유효합니다.',
  },
  {
    question: '명의신탁 증여세에는 배우자공제나 기본공제가 적용되나요?',
    answer:
      '적용되지 않는 것이 원칙입니다. 명의신탁 증여의제는 일반 증여와 달리 조세회피에 대한 제재 성격이 강해, 배우자 6억 원·직계비속 5천만 원 같은 증여재산공제가 배제됩니다. 명의신탁재산가액 전체가 그대로 과세표준에 가깝게 반영되므로 일반 증여보다 세 부담이 훨씬 커질 수 있습니다.',
  },
  {
    question: '부동산 명의신탁을 하면 처벌은 얼마나 되나요?',
    answer:
      '부동산실명법 §3①을 위반한 명의신탁자(실소유자)는 5년 이하의 징역 또는 2억 원 이하의 벌금, 명의를 빌려준 명의수탁자는 3년 이하의 징역 또는 1억 원 이하의 벌금에 처해질 수 있습니다(부동산실명법 §7). 여기에 더해 명의신탁자에게는 부동산평가액을 기준으로 한 과징금(부동산실명법 §5)까지 별도로 부과됩니다.',
  },
];

export default function TitleTrustDeemedGift2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '명의신탁 증여의제 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '명의신탁 증여의제 2026, 차명 주식은 증여세, 차명 부동산은 과징금',
    description:
      '차명주식은 조세회피 목적이 있으면 상증법 §45의2에 따라 명의자에게 증여세가 부과됩니다. 반면 차명 부동산은 증여의제 대상에서 제외되어 부동산실명법상 과징금·형사처벌로 다룹니다. 조세회피 목적 입증책임, 증여재산공제 배제, 명의환원 시 재증여 여부까지 정리.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['명의신탁 증여의제', '차명주식', '차명 부동산', '상증법 45조의2', '부동산실명법'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '명의신탁 증여의제 2026',
    description:
      '차명 부동산·주식의 세금 차이, 조세회피 목적 요건, 증여재산공제 배제, 부동산실명법 과징금·형사처벌을 정리한 가이드.',
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
                    { name: '명의신탁 증여의제 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">세금 · 8분 읽기 · 2026-09-20</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  명의신탁 증여의제 2026
                  <br />
                  <span className="text-2xl text-text-secondary">· 차명 부동산·주식의 세금</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  가족·지인 명의를 빌려 재산을 보유하면 세금 문제가 부동산이냐 주식이냐에 따라 완전히 다르게 갈립니다. 차명주식은 조세회피 목적이 있으면 명의자에게 증여세가 부과되지만, 차명 부동산은 증여세가 아니라 부동산실명법상 과징금과 형사처벌 대상입니다. 이 가이드는 명의신탁 증여의제의 적용 대상, 조세회피 목적 판단 기준, 증여재산공제 배제, 부동산 명의신탁의 별도 규율을 상증법 §45의2와 부동산실명법 기준으로 정리합니다. 대상 독자는 가족 명의로 주식·부동산을 보유하고 있거나 보유를 검토 중인 사람입니다.
                </p>
              </header>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">명의신탁 증여의제란 무엇인가요?</h2>
                <p>
                  명의신탁 증여의제란 실제 소유자와 등기·등록·명의개서상 명의자가 다를 때, 조세회피 목적이 있다면 그 재산을 명의자에게 증여한 것으로 간주해 증여세를 매기는 제도입니다(상증법 §45의2①). 실제로 재산을 넘겨받지 않았더라도 세법상으로는 증여가 일어난 것처럼 취급한다는 뜻입니다.
                </p>
                <p>
                  2019년 1월 1일 이후부터는 이 증여세의 납세의무자가 명의자가 아니라 실제소유자로 바뀌었습니다. 즉 명의를 빌려준 사람이 세금을 떠안는 것이 아니라, 명의를 빌린 실소유자가 직접 증여세를 냅니다. 명의를 빌려주는 쪽 입장에서는 세금 부담이 줄었지만, 명의신탁 자체가 적발되면 여전히 여러 법적 위험이 남습니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">30초 요약</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    정의: 실소유자와 명의자가 다르고 조세회피 목적이 있으면 증여로 간주.
                    <br />
                    근거: 상증법 §45의2①.
                    <br />
                    대상: 등기·등록·명의개서 재산 중 토지·건물은 제외, 주로 주식.
                    <br />
                    납세자: 2019년부터 명의자가 아닌 실제소유자.
                  </p>
                </div>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">차명 부동산도 증여세 대상인가요?</h2>
                <p>
                  아닙니다. 상증법 §45의2①은 적용 대상 재산에서 토지와 건물을 명시적으로 제외하고 있습니다. 그래서 차명 부동산은 명의신탁 증여의제가 적용되지 않습니다. 대신 부동산 명의신탁은 부동산 실권리자명의 등기에 관한 법률(부동산실명법) §3①에서 원칙적으로 금지하는 별도 영역으로 다뤄집니다.
                </p>
                <p>
                  결과적으로 같은 명의신탁이라도 대상 재산이 무엇이냐에 따라 적용되는 법률과 제재 방식이 완전히 다릅니다. 아래 표로 비교하면 차이가 분명해집니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 재산 종류별 명의신탁 규율 방식 비교 (상증법 §45의2, 부동산실명법 §3·§5·§7)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">구분</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">주식 등</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">토지·건물(부동산)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">적용 법률</td>
                        <td className="p-3">상속세및증여세법 §45의2</td>
                        <td className="p-3">부동산실명법</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">기본 성격</td>
                        <td className="p-3">조세회피 목적 있을 때 과세</td>
                        <td className="p-3">명의신탁 자체를 원칙 금지</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">제재 수단</td>
                        <td className="p-3">증여세 부과</td>
                        <td className="p-3">과징금 + 형사처벌</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">조세회피 목적 요건</td>
                        <td className="p-3">필요(없으면 과세 배제)</td>
                        <td className="p-3">불문, 명의신탁 사실만으로 위반</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  다만, 부동산이라 하더라도 실제로 부모가 자녀에게 매매대금을 대신 내주며 명의를 자녀로 해준 경우처럼 실질적인 무상 이전이 있었다면, 그 무상 이전분은 일반 증여로 보아 별도로 증여세가 과세될 수 있습니다. 이는 명의신탁 증여의제가 아니라 통상적인 증여 규정이 적용되는 것입니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">차명주식은 왜 증여세가 부과되나요?</h2>
                <p>
                  주식은 주주명부에 명의개서를 해야 권리를 행사할 수 있는 재산이라 상증법 §45의2①의 적용 대상입니다. 부모가 자금을 대어 매수한 주식을 자녀나 배우자 명의로 등재하면서, 배당소득 분산이나 과점주주 지위 회피 등 세금을 줄이려는 목적이 있었다면 그 명의자에게 증여세가 부과됩니다.
                </p>
                <p>
                  비상장법인 설립 과정에서 발기인 수를 채우기 위해 지인 명의를 빌려 주식을 배정하는 경우도 실무에서 흔한 명의신탁 사례입니다. 이 경우 조세회피 목적이 없었다는 사정이 인정되면 증여의제가 배제될 수 있지만, 그렇지 않으면 명의자 앞으로 그대로 증여세가 부과됩니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례. 부모가 자금을 대고 자녀 명의로 비상장주식을 산 경우</p>
                  <p className="text-sm text-text-secondary">
                    · 매수 자금: 부모가 전액 부담, 배당금도 부모가 관리
                    <br />
                    · 명의: 자녀 명의로 주주명부 등재
                    <br />
                    · 판단: 조세회피 목적이 인정되면 명의신탁 증여의제 적용
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 명의자인 자녀에게 명의신탁 재산가액 전체를 기준으로 증여세가 부과될 수 있습니다.</span>
                  </p>
                </div>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">조세회피 목적이 없으면 과세되지 않나요?</h2>
                <p>
                  그렇습니다. 명의만 다르다는 사실 하나만으로는 증여의제가 성립하지 않습니다. 실제소유자와 명의자가 다르다는 점 외에 조세회피 목적이 함께 인정되어야 상증법 §45의2가 적용됩니다. 판례상 조세회피 목적이 없었다는 사실은 이를 주장하는 명의자 쪽에서 입증해야 합니다.
                </p>
                <p>
                  다만, 명의신탁에 조세 경감과 무관한 뚜렷한 다른 목적이 있고 그로 인한 조세 경감이 부수적이고 사소한 정도에 그쳐야 인정 가능성이 있습니다. 애초에 조세를 줄이려는 목적이 조금이라도 있었다면, 다른 목적이 함께 있었다는 사정만으로는 증여의제 적용을 피하기 어렵습니다.
                </p>
                <p className="mt-4">
                  예외: 명의신탁 여부와 조세회피 목적 유무는 명의신탁 당시를 기준으로 판단합니다. 나중에 실제로 세금을 덜 냈는지 여부는 판단 기준이 아니며, 신탁을 설정하던 시점의 의도와 사정이 핵심입니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">명의신탁 증여세는 얼마나 부과되나요?</h2>
                <p>
                  명의신탁재산가액 전체가 과세 대상이 되며, 일반 증여에서 적용되는 증여재산공제(배우자 6억 원, 직계비속 5천만 원 등)는 적용되지 않습니다. 명의신탁 증여의제는 조세회피에 대한 사실상의 제재 성격을 가지기 때문에, 실제 증여가 아니었더라도 일반 증여보다 세 부담이 커질 수 있습니다.
                </p>
                <p>
                  신고 기한도 일반 증여와 같이 증여로 의제되는 날이 속하는 달의 말일부터 3개월 이내입니다(상증법 §68). 다만 명의신탁은 스스로 신고하는 경우가 드물고, 대부분 세무조사나 금융정보분석원(FIU) 자료 등을 통해 국세청이 사후에 적발해 과세하는 경우가 많습니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">차명 부동산을 실명으로 바꾸지 않으면 어떻게 되나요?</h2>
                <p>
                  부동산실명법 §3①을 위반해 명의신탁을 계속 유지하면 명의신탁자(실소유자)에게 부동산평가액을 기준으로 한 과징금이 부과됩니다(부동산실명법 §5). 여기에 더해 명의신탁자는 5년 이하의 징역 또는 2억 원 이하의 벌금, 명의를 빌려준 명의수탁자도 3년 이하의 징역 또는 1억 원 이하의 벌금에 처해질 수 있습니다(부동산실명법 §7).
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 2. 부동산 명의신탁 제재 대상 비교 (부동산실명법 §5·§7)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">구분</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">과징금</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">형사처벌</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">명의신탁자(실소유자)</td>
                        <td className="p-3">부동산평가액 기준 부과 대상</td>
                        <td className="p-3">5년 이하 징역 또는 2억 원 이하 벌금</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">명의수탁자(명의 대여자)</td>
                        <td className="p-3">부과 대상 아님</td>
                        <td className="p-3">3년 이하 징역 또는 1억 원 이하 벌금</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  다만, 배우자나 종중이 조세를 회피하거나 강제집행 면탈 목적 없이 부동산을 명의신탁한 경우 등 부동산실명법이 정한 일부 예외에 해당하면 과징금·형사처벌 대상에서 제외될 수 있습니다. 예외 인정 여부는 개별 사안마다 구체적으로 판단해야 하므로 섣불리 예단하지 않는 것이 안전합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">명의신탁재산을 실제 소유자 이름으로 되돌리면 또 증여세를 내나요?</h2>
                <p>
                  아닙니다. 국세청 실무는 명의신탁재산을 명의자에서 실제소유자 명의로 되돌리는 것을 새로운 증여로 보지 않습니다. 애초에 실질적인 소유권 이전이 없었다는 논리에 따른 것으로, 명의만 원래대로 정리하는 절차이기 때문입니다.
                </p>
                <p>
                  다만 이 환원은 이미 부과된 명의신탁 증여세와는 별개입니다. 명의신탁을 설정하던 시점에 조세회피 목적이 인정되어 증여세가 확정됐다면, 이후 명의를 되돌린다고 해서 그 세금이 소급해서 취소되지는 않습니다. 명의신탁은 애초에 설정하지 않는 것이 가장 확실한 예방책입니다.
                </p>
              </section>

              <h2 className="text-2xl font-bold mb-6">자주 묻는 질문</h2>
              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h3 className="text-lg font-semibold text-text-primary">관련 계산기 및 가이드</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link
                    href="/guide/low-price-transfer-deemed-gift-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">저가양수도 증여의제</div>
                    <p className="mt-1 text-sm text-text-secondary">시가보다 싸게 거래하면 차액에 증여세가 붙는 기준.</p>
                  </Link>
                  <Link
                    href="/guide/parent-child-account-transfer-gift-tax-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">부모자식 계좌이체 증여세</div>
                    <p className="mt-1 text-sm text-text-secondary">가족 간 계좌이체가 증여로 보이는 기준을 확인하세요.</p>
                  </Link>
                  <Link
                    href="/guide/family-loan-agreement-gift-tax-avoidance/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">가족 간 차용증 작성법</div>
                    <p className="mt-1 text-sm text-text-secondary">명의신탁 대신 정식 대여로 인정받는 요건을 정리했습니다.</p>
                  </Link>
                  <Link
                    href="/guide/gift-tax-calculation-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">증여세 계산법 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">일반 증여의 공제와 세율 구조부터 확인해보세요.</p>
                  </Link>
                  <Link
                    href="/calculator/gift-tax/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">증여세 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">증여재산과 관계를 입력해 세액을 바로 계산해보세요.</p>
                  </Link>
                  <Link
                    href="/calculator/inheritance-tax/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">상속세 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">차명재산이 상속재산에 포함되는지도 함께 점검하세요.</p>
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
                  <strong>면책조항:</strong> 이 글은 AI 보조로 자동 생성되어 자동 품질 게이트를 통과한 뒤 발행되었습니다. 발행 시점에 사람의 사전 검수는 없었으며, 운영자가 사후 점검합니다. 명의신탁 증여의제와 조세회피 목적 해당 여부는 자금 출처, 실제 지배관계, 명의신탁 설정 경위 등 개별 사실관계에 따라 판단이 크게 달라지므로, 실제 사안은 반드시 국세청 또는 세무·법률 전문가와 확인하세요. 본 콘텐츠는 2026-09-20을 기준으로 작성되었으며, 관련 법령·판례 변경 시 업데이트됩니다. 인용 법조항: 상속세및증여세법 §45의2(명의신탁재산의 증여 의제), §68(증여세 과세표준신고), 부동산 실권리자명의 등기에 관한 법률 §3(명의신탁약정의 효력), §5(과징금), §7(벌칙).
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터</a>,{' '}
                  <a href="https://www.nts.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">국세청</a>.
                </p>
              </section>

              <ShareButtons
                title="명의신탁 증여의제 2026, 차명 부동산·주식의 세금"
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
