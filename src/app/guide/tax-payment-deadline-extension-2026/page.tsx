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

const URL = 'https://calculatorhost.com/guide/tax-payment-deadline-extension-2026/';
const DATE_PUBLISHED = '2026-09-11';
const DATE_MODIFIED = '2026-09-11';

export const metadata: Metadata = {
  title: '납부기한 연장 신청 요건 2026, 사유·기간·신청 기한',
  description:
    '재해·도난·사업 위기 등으로 국세를 기한까지 낼 수 없을 때는 납부기한 연장을 신청할 수 있습니다. 원칙 9개월, 특정 사유는 2년까지 연장되고, 만료일 3일 전까지 관할 세무서에 신청합니다. 국세징수법 §13·§15, 시행령 §11·§12·§14 기준으로 사유와 절차를 정리했습니다.',
  keywords: [
    '납부기한 연장',
    '납부기한 연장 신청',
    '징수유예',
    '납부고지 유예',
    '국세징수법 13조',
    '납부지연가산세 면제',
    '세금 납부기한 연장 사유',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '납부기한 연장 신청 요건 2026, 사유·기간·신청 기한' }],
    title: '납부기한 연장 신청 요건 2026',
    description: '재해·사업 위기 등 연장 사유, 원칙 9개월(특정 사유 2년) 연장 기간, 만료일 3일 전 신청 기한을 국세징수법 기준으로 정리.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '납부기한 연장 신청 요건 2026',
    description: '연장 사유·기간·신청 기한을 국세징수법 §13·§15, 시행령 §11·§12·§14 기준으로 정리.',
  },
};

const FAQ_ITEMS = [
  {
    question: '납부기한 연장은 어디에 신청하나요?',
    answer:
      '관할 세무서장에게 신청서를 제출합니다(국세징수법 §13). 국세는 홈택스에서 온라인으로도 신청할 수 있고, 방문·우편으로도 제출할 수 있습니다. 지방세라면 관할 지방자치단체 또는 위택스를 통해 별도로 신청해야 하며, 국세와 지방세는 신청 창구가 다릅니다.',
  },
  {
    question: '신청하면 무조건 승인되나요?',
    answer:
      '아니요, 승인은 관할 세무서장의 재량 판단입니다. 시행령 §11이 정한 사유에 해당하는지, 납부할 금액과 연장 기간, 납세자의 과거 납부 이력 등을 종합해 그 기간 안에 납부할 수 있다고 인정될 때 승인됩니다. 단순히 신청서만 내면 자동으로 되는 절차가 아닙니다.',
  },
  {
    question: '사업이 어려워졌다는 사정만으로 연장되나요?',
    answer:
      '막연히 어렵다는 사정만으로는 부족하고, 사업에 심각한 손해를 입었거나 사업이 중대한 위기에 처한 경우여야 합니다(시행령 §11). 매출 감소 같은 일반적인 경영난보다는 화재·거래처 도산·대규모 자금 압박처럼 구체적이고 심각한 사정을 증빙 자료와 함께 제시해야 승인 가능성이 높아집니다.',
  },
  {
    question: '연장받은 기간에도 이자나 가산세가 붙나요?',
    answer:
      '관할 세무서장이 납부기한을 연장하거나 납부고지를 유예한 경우, 그 연장·유예 기간에는 납부지연가산세를 부과하지 않습니다(국세징수법 §15). 다만 이는 연장을 승인받은 경우에 한정되며, 신청 없이 그냥 늦게 내면 일반적인 납부지연가산세가 그대로 붙습니다.',
  },
  {
    question: '이미 고지서를 받은 세금도 연장할 수 있나요?',
    answer:
      '네, 다만 절차가 조금 다릅니다. 신고로 스스로 확정한 세금은 납부기한 연장을, 세무서가 고지서로 통지한 세금은 납부고지의 유예를 신청하는 구조입니다(국세징수법 §13). 두 절차 모두 같은 조문에서 함께 규정하며, 사유와 신청 기한 요건은 동일하게 적용됩니다.',
  },
  {
    question: '징수유예와 납부기한 연장은 같은 말인가요?',
    answer:
      '지금은 같은 제도를 가리키는 옛 용어입니다. 2021년 국세징수법 전면 개정 전에는 이 제도를 징수유예라고 불렀지만, 개정 이후에는 납부기한 연장과 납부고지의 유예로 용어가 나뉘어 정리되었습니다(국세징수법 §13). 실무에서는 여전히 징수유예라는 말이 검색되지만, 신청서 서식과 법령상 명칭은 납부기한등연장신청서를 씁니다.',
  },
  {
    question: '신청 기한을 놓치면 방법이 없나요?',
    answer:
      '원칙은 기한 만료일 3일 전까지 신청서를 내야 합니다(시행령 §14). 다만 관할 세무서장이 납세자가 3일 전까지 낼 수 없었다고 인정하는 경우에는 만료일까지 제출할 수 있습니다. 기한이 이미 지났다면 연장 신청 대신 체납 이후의 분할납부나 압류 관련 절차를 확인해야 합니다.',
  },
  {
    question: '연장 기간이 끝나도 다 못 내면 어떻게 되나요?',
    answer:
      '연장 기간 안에 완납하지 못하면 그 시점부터는 일반적인 체납 절차가 적용될 수 있습니다. 사정이 계속된다면 만료 전에 재연장이나 분할납부를 다시 상담하는 것이 안전하며, 아무 조치 없이 기간을 넘기면 독촉과 압류로 이어질 수 있으므로 미리 관할 세무서와 협의하는 것이 좋습니다.',
  },
];

export default function TaxPaymentDeadlineExtension2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '납부기한 연장 신청 요건 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '납부기한 연장 신청 요건 2026, 사유·기간·신청 기한',
    description:
      '재해·도난·사업 위기 등 연장 사유, 원칙 9개월(특정 사유 2년) 연장 기간과 분납 한도, 만료일 3일 전 신청 기한, 가산세 면제 여부를 국세징수법 §13·§15, 시행령 §11·§12·§14 기준으로 정리.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['납부기한 연장', '징수유예', '납부고지 유예', '국세징수법 13조', '납부지연가산세'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '납부기한 연장 신청 요건 2026',
    description:
      '국세 납부기한 연장의 사유, 연장 가능 기간(9개월/2년), 신청 기한(만료일 3일 전), 가산세 면제 여부 정리.',
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
                    { name: '납부기한 연장 신청 요건 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">납세자 · 8분 읽기 · 2026-09-11</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  납부기한 연장 신청 요건 2026
                  <br />
                  <span className="text-2xl text-text-secondary">· 사유·기간·신청 기한</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  재해나 사업 위기 등으로 국세를 정해진 날짜까지 낼 수 없다면, 신고나 고지된 세금의 납부기한을 연장받을 수 있는 제도가 있습니다. 이 가이드는 어떤 사유가 인정되는지, 얼마나 연장받을 수 있는지, 언제까지 어떻게 신청해야 하는지, 그리고 연장받으면 가산세가 어떻게 되는지를 정리합니다. 대상 독자는 세금 납부가 당장 어려운 개인·사업자입니다.
                </p>
              </header>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">납부기한 연장이란 무엇인가요?</h2>
                <p>
                  납부기한 연장은 재해나 사업 위기 같은 정해진 사유가 있을 때 국세의 납부기한을 뒤로 미뤄주는 제도입니다. 스스로 신고해 확정한 세금은 납부기한 연장을, 세무서가 고지서로 통지한 세금은 납부고지의 유예를 신청하는데, 국세징수법 §13이 이 두 절차를 하나의 조문에서 함께 규정합니다.
                </p>
                <p>
                  실무에서는 이 제도를 여전히 징수유예라고 부르는 경우가 많지만, 2021년 국세징수법이 전면 개정되면서 징수유예라는 옛 명칭은 납부기한 연장과 납부고지의 유예로 나뉘어 정리되었습니다. 신청서 서식의 이름도 납부기한등연장신청서로 바뀌었습니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">30초 요약</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    정의: 재해·사업 위기 등 사유로 국세 납부기한을 미뤄주는 제도(국세징수법 §13).
                    <br />
                    사유: 재해·도난, 사업의 심각한 손해·중대한 위기, 압수·영치, 전산 장애 등(시행령 §11).
                    <br />
                    기간: 원칙 9개월 이내, 특정 사유는 2년 이내(시행령 §12).
                    <br />
                    신청: 만료일 3일 전까지 관할 세무서(시행령 §14).
                  </p>
                </div>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">어떤 사유로 연장을 신청할 수 있나요?</h2>
                <p>
                  국세징수법 시행령 §11은 연장이 인정되는 사유를 구체적으로 정해 두고 있습니다. 막연히 사정이 어렵다는 주장만으로는 부족하고, 아래처럼 유형화된 사유 중 하나에 해당해야 합니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 납부기한 연장 사유 유형 (국세징수법 시행령 §11)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">유형</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">구체 사례</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">물리적 재해</td>
                        <td className="p-3">천재지변, 화재, 폭발사고, 교통사고, 건물 붕괴 등으로 납세가 곤란한 경우</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">도난</td>
                        <td className="p-3">도난으로 재산에 심한 손실을 입어 납세가 곤란한 경우</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">사업 위기</td>
                        <td className="p-3">사업에 심각한 손해를 입거나 사업이 중대한 위기에 처한 경우</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">압수·영치</td>
                        <td className="p-3">권한 있는 기관이 장부·서류·물건을 압수 또는 영치한 경우</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">전산·기관 장애</td>
                        <td className="p-3">국세정보통신망 장애, 금융기관·체신관서의 휴무나 시스템 장애로 납부가 어려운 경우</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  다만, 사업 위기를 이유로 신청할 때는 매출이 조금 줄었다는 정도가 아니라 화재·거래처 부실·대규모 자금 압박처럼 심각성을 뒷받침하는 구체적 자료가 필요합니다. 관할 세무서장은 이 사유에 더해 납부할 금액, 연장·유예 기간, 납세자의 과거 납부 이력까지 종합해 승인 여부를 판단합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">납부기한은 최대 얼마나 연장되나요?</h2>
                <p>
                  원칙적으로 연장한 날의 다음 날부터 9개월 이내에서 연장 기간이 정해집니다(시행령 §12). 다만 특정 사유에 해당하면 연장한 날의 다음 날부터 2년 이내까지도 연장할 수 있습니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 2. 연장 기간 원칙과 예외 (국세징수법 시행령 §12)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">구분</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">최대 연장 기간</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">원칙</td>
                        <td className="p-3">연장한 날의 다음 날부터 9개월 이내</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">특정 사유(재해 규모가 크거나 장기화되는 경우 등)</td>
                        <td className="p-3">연장한 날의 다음 날부터 2년 이내</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  다만, 연장 기간이 길어질수록 승인 가능성이 낮아지는 것이 실무 경향입니다. 관할 세무서장은 연장·유예 기간에 걸쳐 여러 번에 나눠 내는 분납을 함께 지정할 수 있으므로, 신청서에 한 번에 갚기 어려운 사정과 분납 계획을 구체적으로 적어 내는 것이 유리합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">신청은 언제까지, 어떻게 하나요?</h2>
                <p>
                  원칙은 기한 만료일 3일 전까지 관할 세무서장에게 신청서를 제출하는 것입니다(시행령 §14). 다만 세무서장이 납세자가 3일 전까지 제출할 수 없었다고 인정하는 경우에는 만료일까지 제출해도 됩니다.
                </p>
                <ul className="space-y-3 ml-6 list-decimal text-text-secondary">
                  <li>
                    <strong>신청서 준비:</strong> 납부기한등연장신청서에 연장 사유와 증빙 자료(재해 확인서, 재무 자료 등)를 첨부합니다.
                  </li>
                  <li>
                    <strong>제출 방법:</strong> 국세는 홈택스 온라인 신청, 관할 세무서 방문, 우편 제출 중 선택할 수 있습니다.
                  </li>
                  <li>
                    <strong>심사:</strong> 관할 세무서장이 사유의 타당성과 납부 가능성을 심사해 승인 여부를 결정합니다.
                  </li>
                  <li>
                    <strong>통지:</strong> 승인되면 연장된 기한과 분납 여부가 함께 통지됩니다.
                  </li>
                </ul>
                <p className="mt-4">
                  다만, 지방세(재산세·자동차세 등)는 국세와 별도로 관할 지방자치단체 또는 위택스를 통해 신청해야 합니다. 국세청에 낸 국세 연장 신청이 지방세에는 적용되지 않으므로 세목별로 각각 확인해야 합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">연장받으면 가산세도 면제되나요?</h2>
                <p>
                  네, 관할 세무서장이 납부기한을 연장하거나 납부고지를 유예한 경우, 그 연장·유예 기간에는 납부지연가산세와 원천징수 등 납부지연가산세를 부과하지 않습니다(국세징수법 §15). 즉 승인받은 기간 안에는 늦게 냈다는 이유로 별도 가산세가 붙지 않습니다.
                </p>
                <p>
                  다만 이 면제는 연장을 승인받았을 때만 적용됩니다. 신청 없이 그냥 기한을 넘기면 일반적인 납부지연가산세가 그대로 부과되고, 연장 기간이 끝난 뒤에도 계속 못 내면 그 시점부터는 다시 가산세와 체납 절차가 적용될 수 있습니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">징수유예와 납부기한 연장은 같은 제도인가요?</h2>
                <p>
                  네, 지금 쓰이는 납부기한 연장·납부고지의 유예는 과거 징수유예라고 불렸던 제도가 이름만 바뀐 것입니다. 2021년 국세징수법이 전면 개정되면서 용어가 재정비되어, 신고로 확정한 세금은 납부기한 연장, 고지서로 통지된 세금은 납부고지의 유예로 구분되었습니다.
                </p>
                <p>
                  다만 검색이나 오래된 안내 자료에는 여전히 징수유예라는 옛 표현이 많이 남아 있습니다. 실제 신청할 때는 최신 서식명인 납부기한등연장신청서를 기준으로 준비하는 것이 정확합니다. 이 가이드의 사유·기간·신청 기한은 개정 이후 현행 용어와 조문을 기준으로 정리한 내용입니다.
                </p>
              </section>

              <h2 className="text-2xl font-bold mb-6">자주 묻는 질문</h2>
              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h3 className="text-lg font-semibold text-text-primary">관련 계산기 및 가이드</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link
                    href="/guide/comprehensive-income-tax-interim-prepayment-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">종합소득세 중간예납</div>
                    <p className="mt-1 text-sm text-text-secondary">중간예납분도 연장 사유가 있으면 같은 제도를 이용할 수 있습니다.</p>
                  </Link>
                  <Link
                    href="/guide/national-tax-delinquency-seizure-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">국세 체납 압류 절차</div>
                    <p className="mt-1 text-sm text-text-secondary">연장을 신청하지 않고 기한을 넘기면 이어지는 절차입니다.</p>
                  </Link>
                  <Link
                    href="/guide/tax-appeal-objection-procedure-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">세금 이의신청 절차</div>
                    <p className="mt-1 text-sm text-text-secondary">부과 자체를 다투려면 연장과는 별도로 이 절차를 확인하세요.</p>
                  </Link>
                  <Link
                    href="/guide/tax-audit-selection-criteria-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">세무조사 대상 선정 기준</div>
                    <p className="mt-1 text-sm text-text-secondary">납부 여력과 별개로 세무조사 대상이 되는 기준도 함께 알아두세요.</p>
                  </Link>
                  <Link
                    href="/calculator/freelancer-tax/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">프리랜서 종합소득세 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">미리 예상 세액을 계산해 자금을 준비해두면 연장 신청 자체를 줄일 수 있습니다.</p>
                  </Link>
                  <Link
                    href="/category/tax/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">모든 세금 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">양도세·취득세·종합소득세·재산세 모음.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 이 글은 AI 보조로 자동 생성되어 자동 품질 게이트를 통과한 뒤 발행되었습니다. 발행 시점에 사람의 사전 검수는 없었으며, 운영자가 사후 점검합니다. 본 가이드는 교육 목적으로 작성되었으며 개인 맞춤형 세무 조언이 아닙니다. 실제 연장 승인 여부·기간·사유 인정 범위는 개별 사안과 관할 세무서의 판단, 시행령 개정 시점에 따라 달라질 수 있으므로 반드시 관할 세무서 또는 국세청, 세무사 등 전문가에게 확인하세요. 본 콘텐츠는 2026-09-11을 기준으로 작성되었으며, 관련 법령 개정 시 업데이트됩니다. 인용 법조항: 국세징수법 §13(납부기한등의 연장과 납부고지의 유예), §15(가산세의 특례), 같은 법 시행령 §11(납부기한등의 연장 사유), §12(연장 등의 기간과 분납 한도), §14(신청서의 제출).
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터</a>,{' '}
                  <a href="https://www.nts.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">국세청</a>,{' '}
                  <a href="https://www.hometax.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">홈택스</a>.
                </p>
              </section>

              <ShareButtons
                title="납부기한 연장 신청 요건 2026 가이드"
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
