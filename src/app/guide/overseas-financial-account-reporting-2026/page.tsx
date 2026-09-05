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

const URL = 'https://calculatorhost.com/guide/overseas-financial-account-reporting-2026/';
const DATE_PUBLISHED = '2026-09-06';
const DATE_MODIFIED = '2026-09-06';

export const metadata: Metadata = {
  title: '해외금융계좌 신고 대상 2026, 미신고 과태료 총정리',
  description:
    '해외금융계좌 잔액 합계가 매월 말일 중 하루라도 5억원을 넘으면 다음 해 6월에 신고해야 하며, 미신고 시 최대 20%의 벌금과 형사처벌까지 받을 수 있습니다. 신고 대상·기한·면제 요건을 국제조세조정에 관한 법률 §53·§90 기준으로 정리했습니다.',
  keywords: [
    '해외금융계좌 신고',
    '해외금융계좌 신고 기준',
    '해외금융계좌 미신고 과태료',
    '해외금융계좌 5억원',
    'CRS 금융정보 자동교환',
    '국제조세조정에 관한 법률 53조',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '해외금융계좌 신고 대상 2026, 미신고 과태료 총정리' }],
    title: '해외금융계좌 신고 대상 2026, 미신고 과태료 총정리',
    description: '잔액 합계 5억원 초과 시 다음 해 6월 신고 의무. 미신고 과태료 10%, 50억원 초과 시 형사처벌까지.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '해외금융계좌 신고 대상 2026, 미신고 과태료 총정리',
    description: '5억원 초과 시 다음 해 6월 신고. 미신고 과태료 10%, 50억원 초과 시 형사처벌. 국제조세조정법 §53·§90.',
  },
};

const FAQ_ITEMS = [
  {
    question: '해외 증권사에 개설한 주식 계좌도 신고 대상인가요?',
    answer:
      '예, 신고 대상입니다. 해외 증권사에 직접 개설한 계좌의 주식·ETF·채권도 해외금융계좌에 포함되며, 다른 해외계좌와 합산한 잔액이 5억원을 초과하면 신고해야 합니다(국제조세조정에 관한 법률 §53). 국내 증권사를 통해 매수해 예탁결제원에 보관되는 해외주식은 통상 국내계좌로 보아 대상에서 빠지는 경우가 많지만, 해외 현지 증권사 계좌는 반드시 합산 대상에 넣어야 합니다.',
  },
  {
    question: '계좌를 여러 개로 나눠 각각 5억원 밑으로 맞추면 신고를 안 해도 되나요?',
    answer:
      '아닙니다. 신고 여부는 개별 계좌가 아니라 본인 명의 모든 해외금융계좌 잔액의 합계로 판단합니다(§53). 계좌를 여러 은행·증권사로 쪼개도 매월 말일 중 하루라도 합계 잔액이 5억원을 넘으면 전부 신고 대상입니다. 가족 명의로 분산해도 실질적으로 본인 자금이면 실질과세 원칙에 따라 합산될 수 있습니다.',
  },
  {
    question: '신고 기한을 넘긴 걸 뒤늦게 알았다면 어떻게 하나요?',
    answer:
      '과세당국이 과태료를 부과하기 전이라면 기한 후 신고 또는 수정신고를 할 수 있습니다. 스스로 신고하는 시점이 빠를수록 과태료가 최대 90%까지 감경될 수 있으므로(§90), 방치하는 것보다 뒤늦게라도 자진신고하는 편이 유리합니다. 정확한 감경률은 사안마다 달라 관할 세무서에 확인하는 것이 안전합니다.',
  },
  {
    question: '해외에 오래 거주하다 귀국한 교포도 신고해야 하나요?',
    answer:
      '원칙적으로 신고대상연도 종료일 현재 국내 거주자이면 신고 의무가 있습니다. 다만 최근 10년 중 국내 거주 기간이 5년 이하인 외국인 거주자, 해당 연도 국내 거소 기간이 182일 이하인 재외국민 등 일정 요건을 충족하면 신고 의무가 면제됩니다. 본인이 면제 요건에 해당하는지는 국세청 또는 세무 전문가에게 확인해야 합니다.',
  },
  {
    question: '신고를 하지 않으면 국세청이 어떻게 알 수 있나요?',
    answer:
      '국세청은 다자간 금융정보 자동교환 협정(CRS)을 통해 100개국 이상의 과세당국과 해외금융계좌 정보를 정기적으로 교환합니다. 신고를 하지 않아도 상대국에서 통보된 계좌 정보와 국내 신고 내역을 대조해 미신고·과소신고 사실이 드러나면 과태료·형사처벌 대상이 될 수 있습니다.',
  },
  {
    question: '해외 거래소의 가상자산 계좌도 신고 대상에 포함되나요?',
    answer:
      '예, 해외가상자산계좌도 신고 대상입니다. 해외 가상자산거래소에 보유한 가상자산 잔액도 다른 해외금융계좌와 합산해 5억원 초과 여부를 판단합니다. 국내 가상자산거래소만 이용하는 경우는 이 제도의 적용 대상이 아닙니다.',
  },
  {
    question: '과태료 말고 다른 불이익도 있나요?',
    answer:
      '있습니다. 미(과소)신고 금액이 50억원을 초과하면 2년 이하의 징역 또는 신고의무 위반금액의 13~20%에 해당하는 벌금이 부과될 수 있고(조세범처벌법 §16①), 같은 기준을 넘으면 위반자의 인적사항이 공개될 수 있습니다. 다만 미신고에 정당한 사유가 있다고 인정되면 형사처벌은 면할 수 있습니다.',
  },
];

export default function OverseasFinancialAccountReporting2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '해외금융계좌 신고 대상과 미신고 과태료 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '해외금융계좌 신고 대상 2026, 미신고 과태료 총정리',
    description:
      '해외금융계좌 잔액 합계 5억원 초과 시 다음 해 6월 신고 의무, 신고 대상 계좌 범위, 미신고·과소신고 과태료 10%, 50억원 초과 시 형사처벌까지 국제조세조정에 관한 법률 §53·§90, 조세범처벌법 §16 기준으로 정리.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['해외금융계좌 신고', '해외금융계좌 과태료', 'CRS', '국제조세조정법 53조', '해외가상자산계좌'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '해외금융계좌 신고 대상과 미신고 과태료 2026',
    description:
      '5억원 초과 해외금융계좌의 신고 기한·대상·면제 요건과 미신고 시 과태료·형사처벌 기준 정리.',
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
                    { name: '해외금융계좌 신고 대상과 미신고 과태료 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">해외자산 보유자 · 8분 읽기 · 2026-09-06</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  해외금융계좌 신고 대상과 미신고 과태료 2026
                  <br />
                  <span className="text-2xl text-text-secondary">· 5억원 기준과 형사처벌까지</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  해외 은행 예금, 해외 증권사 계좌, 해외 가상자산거래소 계좌까지 합쳐 잔액이 일정 금액을 넘으면 매년 국세청에 신고해야 합니다. 이 가이드는 신고 대상 판단 기준, 신고 기한, 신고 대상 계좌 범위, 미신고·과소신고 시 과태료와 형사처벌 기준을 정리합니다. 대상 독자는 해외 계좌를 보유했거나 보유할 예정인 거주자입니다.
                </p>
              </header>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">해외금융계좌 신고란 무엇인가요?</h2>
                <p>
                  해외금융계좌 신고는 거주자·내국법인이 해외 금융회사에 보유한 계좌 잔액이 기준금액을 넘으면 그 계좌 정보를 국세청에 알리는 의무입니다. 해당연도 매월 말일 중 어느 하루라도 보유한 모든 해외금융계좌 잔액의 합계가 5억원을 초과하면 신고 대상이 됩니다(국제조세조정에 관한 법률 §53).
                </p>
                <p>
                  신고 대상은 예금뿐 아니라 해외 증권사의 주식·펀드·채권, 해외 가상자산거래소의 가상자산까지 폭넓게 포함합니다. 국세청은 이 정보를 역외탈세 적발과 CRS(다자간 금융정보 자동교환) 대조에 활용합니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">30초 요약</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    정의: 해외금융계좌 잔액 합계가 기준금액을 넘으면 매년 신고하는 제도.
                    <br />
                    기준금액: 매월 말일 중 하루라도 5억원 초과(§53).
                    <br />
                    신고 기한: 다음 해 6월 1일~30일, 관할 세무서.
                    <br />
                    주의: 미신고 시 과태료 최대 20%, 50억원 초과 시 형사처벌.
                  </p>
                </div>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">신고 대상은 정확히 누구인가요?</h2>
                <p>
                  신고대상연도 종료일 현재 국내 거주자이거나 내국법인으로서, 해당 연도 매월 말일 중 어느 하루라도 보유한 해외금융계좌 잔액의 합계가 5억원을 초과하는 사람이 신고 대상입니다(§53). 계좌가 본인 단독 명의든 공동 명의든, 은행이 여러 곳으로 나뉘어 있든 모두 합산해서 판단합니다.
                </p>
                <p>
                  다만, 최근 10년 중 국내 거주 기간이 5년 이하인 외국인 거주자, 해당 연도 국내 거소 기간이 182일 이하인 재외국민, 국가·지방자치단체·국제기관 근무자 등 시행령이 정한 일정 요건에 해당하면 신고 의무가 면제됩니다. 본인이 면제 요건에 해당하는지 애매하다면 관할 세무서나 국세상담센터(126)에서 확인하는 것이 정확합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">신고 기한은 언제까지인가요?</h2>
                <p>
                  신고대상연도의 다음 해 6월 1일부터 6월 30일까지 납세지 관할 세무서에 신고해야 합니다(§53). 예를 들어 2026년 중 어느 달 말일에 잔액이 5억원을 넘었다면, 2027년 6월에 그 계좌 정보를 신고합니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 해외금융계좌 신고 핵심 요건 (국제조세조정에 관한 법률 §53)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">구분</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">내용</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">신고 기준금액</td>
                        <td className="p-3">매월 말일 중 하루라도 합계 잔액 5억원 초과</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">신고 대상자</td>
                        <td className="p-3">신고대상연도 종료일 현재 거주자·내국법인</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">신고 기한</td>
                        <td className="p-3">다음 해 6월 1일~6월 30일</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">신고처</td>
                        <td className="p-3">납세지 관할 세무서</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  다만, 신고 기한 안에 신고했더라도 금액을 실제보다 적게 적은 과소신고가 확인되면 미신고와 마찬가지로 과태료 대상이 됩니다. 신고서 작성 시 계좌별 최고 잔액과 원화 환산액을 정확히 기재해야 합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">어떤 계좌가 신고 대상에 포함되나요?</h2>
                <p>
                  해외 은행 예금·적금뿐 아니라 해외 증권사 계좌의 주식·ETF·채권·펀드, 해외 보험사의 저축성 보험, 해외 가상자산거래소의 가상자산 계좌까지 모두 신고 대상에 포함됩니다. 해외 현지 법인에 낸 출자금이나 파생상품 계좌도 계좌 유형에 따라 포함될 수 있습니다.
                </p>
                <p className="mt-4">
                  다만, 국내 증권사를 통해 매수하고 한국예탁결제원에 보관되는 해외주식처럼 실질적으로 국내 계좌를 경유하는 경우는 통상 신고 대상 해외금융계좌로 보지 않습니다. 반대로 해외 현지 증권사·거래소에 직접 개설한 계좌는 국내 경유 여부와 무관하게 합산 대상입니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">미신고하면 과태료는 얼마나 나오나요?</h2>
                <p>
                  신고 기한 내에 신고하지 않거나 실제보다 적게 신고하면 미(과소)신고 금액의 10%에 해당하는 과태료가 부과되며, 한도는 10억원입니다(§90). 과세당국이 자금출처를 소명하라고 요구했는데 소명하지 않거나 거짓으로 소명하면 미(거짓)소명 금액의 10%가 추가로 부과되어 최대 20%까지 늘어날 수 있습니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 2. 미신고·과소신고 불이익 (§90, 조세범처벌법 §16①)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">구분</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">내용</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">과태료(미·과소신고)</td>
                        <td className="p-3">미신고 금액의 10%, 한도 10억원</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">자금출처 미소명 추가 과태료</td>
                        <td className="p-3">미(거짓)소명 금액의 10% 추가</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">형사처벌(50억원 초과)</td>
                        <td className="p-3">2년 이하 징역 또는 위반금액의 13~20% 벌금</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">명단공개(50억원 초과)</td>
                        <td className="p-3">위반자 인적사항 공개 대상</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  다만, 과세당국이 과태료를 부과하기 전에 스스로 기한 후 신고나 수정신고를 하면 신고 시점에 따라 과태료가 최대 90%까지 감경될 수 있습니다(§90). 신고를 놓친 사실을 알았다면 방치하지 말고 최대한 빨리 자진신고하는 것이 유리합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">50억원을 넘으면 형사처벌도 받나요?</h2>
                <p>
                  예, 미(과소)신고 금액이 50억원을 초과하면 조세범처벌법 §16①에 따라 2년 이하의 징역 또는 신고의무 위반금액의 13% 이상 20% 이하에 해당하는 벌금에 처해질 수 있습니다. 같은 기준을 넘는 위반자는 인적사항이 공개될 수도 있습니다.
                </p>
                <p className="mt-4">
                  다만, 미신고에 정당한 사유가 있다고 인정되면 형사처벌 대상에서 제외될 수 있습니다. 예를 들어 계좌 존재 자체를 알기 어려웠던 상속·증여 재산이거나, 신고 대상 여부를 판단하기 어려운 복잡한 구조의 해외 신탁 같은 경우가 이에 해당할 수 있으나, 정당한 사유 인정 여부는 개별 사안마다 다르므로 전문가 상담이 필요합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">신고 준비, 어떻게 시작하면 좋을까요?</h2>
                <p>
                  먼저 본인 명의의 모든 해외 은행·증권사·가상자산거래소 계좌 잔액을 연중 매월 말일 기준으로 원화로 환산해 합산해 봅니다. 5억원을 넘긴 달이 하루라도 있으면 다음 해 6월에 관할 세무서에 해외금융계좌 신고서를 제출해야 합니다.
                </p>
                <p className="mt-4">
                  다만, 계좌가 여러 나라·통화에 걸쳐 있거나 공동명의·신탁 구조가 섞여 있으면 합산 범위와 최고 잔액 산정이 까다로울 수 있습니다. 이런 경우 국세청 홈페이지의 안내 자료를 먼저 확인하고, 필요하면 세무 전문가와 함께 신고서를 준비하는 것이 안전합니다.
                </p>
              </section>

              <h2 className="text-2xl font-bold mb-6">자주 묻는 질문</h2>
              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h3 className="text-lg font-semibold text-text-primary">관련 계산기 및 가이드</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link
                    href="/guide/overseas-stock-capital-gains-tax-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">해외주식 양도소득세 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">해외 증권사 계좌로 거래한 주식의 양도세 계산법.</p>
                  </Link>
                  <Link
                    href="/guide/foreign-tax-credit-overseas-stock-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">해외주식 외국납부세액공제</div>
                    <p className="mt-1 text-sm text-text-secondary">해외에서 이미 낸 세금을 국내 세액에서 공제받는 방법.</p>
                  </Link>
                  <Link
                    href="/guide/foreign-currency-deposit-tax-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">외화예금 이자소득세</div>
                    <p className="mt-1 text-sm text-text-secondary">해외·외화 예금 이자에 붙는 세금 구조 정리.</p>
                  </Link>
                  <Link
                    href="/calculator/exchange/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">환율 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">외화 잔액을 원화로 환산해 신고 기준금액을 확인해보세요.</p>
                  </Link>
                  <Link
                    href="/calculator/gift-tax/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">증여세 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">해외자산을 가족에게 이전할 때 증여세를 미리 계산해보세요.</p>
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
                  <strong>면책조항:</strong> 이 글은 AI 보조로 자동 생성되어 자동 품질 게이트를 통과한 뒤 발행되었습니다. 발행 시점에 사람의 사전 검수는 없었으며, 운영자가 사후 점검합니다. 개인 맞춤형 법률·세무 조언이 아니며, 실제 신고 대상 여부와 과태료·형사처벌 기준은 계좌 구조와 개인 사정에 따라 달라지므로 반드시 국세청 또는 세무 전문가와 확인하세요. 본 콘텐츠는 2026-09-06을 기준으로 작성되었으며, 관련 법령 개정 시 업데이트됩니다. 인용 법조항: 국제조세조정에 관한 법률 §53(해외금융계좌의 신고), §90(신고의무 불이행 등에 대한 과태료), 조세범처벌법 §16①(신고의무 위반에 대한 벌칙).
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?cntntsId=7819&mi=2513" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">국세청 해외금융계좌 신고 안내</a>,{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터</a>.
                </p>
              </section>

              <ShareButtons
                title="해외금융계좌 신고 대상과 미신고 과태료 2026 가이드"
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
