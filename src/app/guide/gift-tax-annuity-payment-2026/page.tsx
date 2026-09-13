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

const URL = 'https://calculatorhost.com/guide/gift-tax-annuity-payment-2026/';
const DATE_PUBLISHED = '2026-09-14';
const DATE_MODIFIED = '2026-09-14';

export const metadata: Metadata = {
  title: '증여세 연부연납 조건·담보 제공 방법 2026',
  description:
    '증여세 연부연납은 세액이 2천만원을 넘을 때 담보를 걸고 5년(가업승계 특례 15년)에 나눠 내는 제도입니다. 신청 자격 3요건, 담보 종류별 즉시허가 특례, 가산금 이자율을 상속세및증여세법 §71 기준으로 정리했습니다.',
  keywords: [
    '증여세 연부연납',
    '연부연납 조건',
    '연부연납 담보',
    '납세담보 종류',
    '증여세 연부연납 기간',
    '연부연납 가산금',
    '상속세및증여세법 71조',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '증여세 연부연납 조건·담보 제공 방법 2026' }],
    title: '증여세 연부연납 조건·담보 제공 방법 2026',
    description: '세액 2천만원 초과 시 담보를 걸고 5년(가업승계 15년) 분할납부. 자격요건·담보 종류·가산금까지 정리.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '증여세 연부연납 조건·담보 제공 방법 2026',
    description: '2천만원 초과 세액, 납세담보 제공, 신청기한 준수. 3요건과 담보 종류별 허가 절차 정리.',
  },
};

const FAQ_ITEMS = [
  {
    question: '증여세 연부연납은 세액이 얼마부터 신청할 수 있나요?',
    answer:
      '납부할 증여세액이 2천만원을 초과해야 신청할 수 있습니다(상속세및증여세법 §71①). 2천만원 이하라면 연부연납 대상이 아니고, 대신 세액이 1천만원을 초과하면 2개월 이내로 나눠 내는 분납 제도를 이용할 수 있습니다. 두 제도는 함께 신청할 수 없고 하나만 선택합니다.',
  },
  {
    question: '담보 없이 연부연납을 신청할 수 있나요?',
    answer:
      '원칙적으로 불가능합니다. 연부연납을 신청한 세액에 상당하는 납세담보를 반드시 제공해야 허가받을 수 있습니다(상속세및증여세법 §71①). 다만 금전·유가증권·납세보증보험증권·납세보증서 등 국세징수법이 정한 특정 담보를 제공하면 세무서 심사 없이 신청일에 즉시 허가받은 것으로 간주되는 특례가 있습니다.',
  },
  {
    question: '증여세 연부연납 기간은 몇 년인가요?',
    answer:
      '일반 증여재산은 5년 이내에서 납세의무자가 신청한 기간으로 정합니다. 다만 조세특례제한법상 가업승계 증여세 과세특례를 적용받은 증여재산은 2024년 1월 1일 이후 신청분부터 15년까지 연부연납이 가능합니다. 상속세의 연부연납 기간(일반 10년, 가업상속재산 특례 최대 20년)과는 기간이 다르므로 혼동하지 마세요.',
  },
  {
    question: '연부연납을 하면 매회 얼마씩 내야 하나요?',
    answer:
      '각 회분의 분할납부 세액이 1천만원을 초과하도록 연부연납 기간을 정해야 합니다. 예를 들어 세액이 6천만원이면 5년(6회분 신고분 포함)으로 나누면 회당 1천만원을 넘어 문제가 없지만, 세액이 낮은데 기간을 너무 길게 잡으면 회당 금액이 1천만원 아래로 내려가 그 기간만큼은 인정되지 않을 수 있습니다.',
  },
  {
    question: '연부연납 중에는 이자 같은 가산금이 붙나요?',
    answer:
      '네. 연부연납을 이용하는 기간만큼 국세를 늦게 내는 것이므로 가산금이 붙습니다. 가산금 비율은 상속세및증여세법 시행령 §69에 따라 국세기본법 시행령이 정한 이자율을 준용하며, 2025년 3월 21일 개정 이후 연 3.1%(국세기본법 시행규칙 §19의3)가 적용되고 있습니다. 이 비율은 시중 예금금리 변동에 따라 수시로 개정되므로 신청 시점의 홈택스 고시를 다시 확인해야 합니다.',
  },
  {
    question: '연부연납 신청은 언제까지, 어디에 해야 하나요?',
    answer:
      '증여세를 신고하며 신청하는 경우 법정신고기한까지, 세무서 고지를 받은 뒤 신청하는 경우 고지서의 납부기한까지 관할 세무서에 연부연납허가신청서를 제출해야 합니다. 신고와 동시에 신청하는 것이 서류 준비와 담보 심사 시간을 줄이는 방법입니다.',
  },
  {
    question: '연부연납 허가를 받은 뒤 담보나 회차를 바꿀 수 있나요?',
    answer:
      '담보 변경이나 연부연납 철회는 관할 세무서에 별도 신청서(연부연납허가 변경·철회 신청서)를 제출해 다시 심사받아야 합니다. 정해진 회차에 세액을 내지 못하면 세무서가 연부연납 허가를 취소하고 남은 세액 전부를 한꺼번에 징수할 수 있으므로, 자금 계획을 신중히 세운 뒤 기간을 정해야 합니다.',
  },
];

export default function GiftTaxAnnuityPayment2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '증여세 연부연납 조건·담보 제공 방법 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '증여세 연부연납 조건·담보 제공 방법 2026',
    description:
      '세액 2천만원 초과 시 담보를 걸고 5년(가업승계 특례 15년)까지 나눠 내는 증여세 연부연납의 신청 자격요건, 담보 종류별 즉시허가 특례, 회분별 최소 금액, 가산금 이자율을 상속세및증여세법 §71 기준으로 정리.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['증여세 연부연납', '연부연납 조건', '납세담보', '가업승계 증여세 특례', '연부연납 가산금'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '증여세 연부연납 조건·담보 제공 방법 2026',
    description:
      '증여세 연부연납의 자격요건 3가지, 담보 종류별 허가 절차, 연부연납 기간(5년·가업승계 15년), 가산금 이자율 정리.',
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
                    { name: '증여세 연부연납 조건·담보 제공 방법 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">증여인·수증자 · 9분 읽기 · 2026-09-14</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  증여세 연부연납 조건
                  <br />
                  <span className="text-2xl text-text-secondary">· 담보 제공 방법 2026</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  증여세 세액이 커서 한 번에 낼 목돈이 없다면, 담보를 제공하고 여러 해에 걸쳐 나눠 내는 연부연납을 신청할 수 있습니다. 이 가이드는 연부연납을 신청할 수 있는 자격요건 3가지, 담보로 인정되는 항목과 담보 종류별 허가 절차, 신청 기간과 회분별 최소 금액, 가산금 이자율까지 실무 순서대로 정리합니다. 대상 독자는 증여세를 신고하려는 수증자와 증여인입니다.
                </p>
              </header>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">증여세 연부연납이란 무엇인가요?</h2>
                <p>
                  연부연납은 증여세를 한 번에 내지 않고 여러 해에 걸쳐 나눠 내도록 세무서가 허가하는 제도입니다(상속세및증여세법 §71). 증여세는 원칙적으로 신고와 동시에 전액을 내야 하지만, 부동산처럼 현금화가 어려운 재산을 증여받아 세액을 마련하기 어려운 경우를 대비한 것입니다.
                </p>
                <p>
                  연부연납은 세액이 적으면 이용할 필요가 없고, 조건을 갖추지 못하면 신청 자체가 거부됩니다. 아래에서 신청 가능 여부를 가르는 3가지 자격요건부터 확인합니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">30초 요약</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    정의: 증여세를 담보 제공 후 여러 해에 나눠 내는 제도.
                    <br />
                    자격: 세액 2천만원 초과 + 납세담보 제공 + 신청기한 내 신청.
                    <br />
                    기간: 일반 5년, 가업승계 증여세 과세특례 15년(2024.1.1 이후 신청분).
                    <br />
                    주의: 늦게 내는 기간만큼 가산금(이자)이 붙습니다.
                  </p>
                </div>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">연부연납 신청 자격요건은 무엇인가요?</h2>
                <p>
                  연부연납을 신청하려면 다음 3가지를 모두 갖춰야 합니다(상속세및증여세법 §71①). 하나라도 빠지면 세무서가 신청을 받아들이지 않습니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 증여세 연부연납 신청 자격요건 3가지 (상속세및증여세법 §71①)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">요건</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">내용</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">세액 기준</td>
                        <td className="p-3">납부할 증여세액이 2천만원을 초과할 것</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">납세담보</td>
                        <td className="p-3">연부연납 신청 세액에 상당하는 담보를 제공할 것</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">신청기한</td>
                        <td className="p-3">법정신고기한(신고 시) 또는 고지서 납부기한(고지 시) 내 신청할 것</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  다만, 세액이 2천만원 이하라면 연부연납이 아니라 세액이 1천만원을 초과할 때 이용할 수 있는 분납(2개월 이내 분할)을 검토해야 합니다. 분납과 연부연납은 중복 신청할 수 없고, 신고 시 어느 제도를 이용할지 하나만 선택해 신청서를 제출합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">담보로 무엇을 제공할 수 있나요?</h2>
                <p>
                  담보는 금전·유가증권·납세보증보험증권·납세보증서뿐 아니라 토지·건물 등 부동산도 국세징수법이 정하는 절차에 따라 제공할 수 있습니다. 다만 담보의 종류에 따라 허가 절차의 속도가 크게 달라집니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3">
                  <p className="font-semibold text-text-primary">담보 종류별 허가 절차 차이</p>
                  <p className="text-sm text-text-secondary">
                    · 금전·유가증권·납세보증보험증권·납세보증서(국세징수법 §18①1~4호): 세무서 별도 심사 없이 <strong>신청일에 즉시 허가</strong>받은 것으로 간주
                    <br />
                    · 부동산 등 그 외 담보: 세무서가 담보 가액·권리관계를 심사한 뒤 허가 여부 결정, 심사 기간 소요
                  </p>
                </div>
                <p className="mt-4">
                  다만, 즉시허가 특례를 적용받더라도 담보 가치가 신청 세액에 상당한지는 사후에도 확인 대상이 됩니다. 담보로 제공한 재산의 가치가 떨어지면 세무서가 추가 담보를 요구할 수 있습니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">연부연납 기간은 몇 년까지 가능한가요?</h2>
                <p>
                  일반 증여재산은 5년 이내에서 신청인이 정한 기간으로 허가받습니다. 다만 조세특례제한법상 가업승계 증여세 과세특례를 적용받은 증여재산은 2024년 1월 1일 이후 신청분부터 15년까지 늘어났습니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 2. 상속세·증여세 연부연납 기간 비교</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">구분</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">일반</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">특례 적용 시</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">증여세</td>
                        <td className="p-3">5년</td>
                        <td className="p-3">가업승계 증여세 과세특례 15년</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">상속세</td>
                        <td className="p-3">10년(2022.1.1 이후 상속분)</td>
                        <td className="p-3">가업상속재산 특례 최대 20년</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  다만, 상속세의 연부연납 기간(일반 10년)과 증여세의 연부연납 기간(일반 5년)은 서로 다른 별개 규정이므로 혼동하지 말아야 합니다. 상속세 연부연납의 세부 절차는 별도로 다룬 가이드를 참고하세요.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">각 회분은 어떻게 나눠 내나요?</h2>
                <p>
                  각 회분의 분할납부 세액이 1천만원을 초과하도록 연부연납 기간을 정해야 합니다. 세액을 원하는 기간만큼 마음대로 쪼갤 수 있는 것이 아니라, 회당 금액이 이 기준을 넘도록 기간이 제한됩니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3">
                  <p className="font-semibold text-text-primary">예시. 증여세액 6천만원인 경우</p>
                  <p className="text-sm text-text-secondary">
                    · 5년(신고 시 납부분 포함 6회분) 연부연납 신청 시: 회당 약 1천만원 → 기준 충족
                    <br />
                    · 세액이 이보다 적은데 기간을 5년으로 그대로 신청하면 회당 금액이 1천만원에 못 미쳐 그만큼 기간이 줄어들 수 있음
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 세액이 크지 않다면 세무서와 상담해 회당 금액이 기준을 충족하는 기간으로 신청해야 합니다.</span>
                  </p>
                </div>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">연부연납 중에는 가산금(이자)이 얼마나 붙나요?</h2>
                <p>
                  연부연납은 세금을 늦게 내는 것이므로 그 기간만큼 가산금이 붙습니다. 상속세및증여세법 시행령 §69은 이 가산금 비율을 국세기본법 시행령이 정한 이자율에 따르도록 하고 있으며, 이 이자율은 국세기본법 시행규칙 §19의3에서 정합니다.
                </p>
                <p>
                  2025년 3월 21일 개정 이후 이 이자율은 연 3.1%로 적용되고 있습니다. 다만 이 비율은 시중 예금금리 변동을 반영해 기획재정부가 수시로 조정하므로, 실제 신청 시점의 정확한 비율은 홈택스 또는 관할 세무서에서 다시 확인해야 합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">연부연납 신청은 언제, 어디에 하나요?</h2>
                <p>
                  증여세를 신고하며 함께 신청하는 경우 법정신고기한까지, 세무서 고지를 받은 뒤 신청하는 경우 고지서의 납부기한까지 관할 세무서에 연부연납허가신청서와 담보 관련 서류를 제출해야 합니다.
                </p>
                <ul className="space-y-3 ml-6 list-decimal text-text-secondary">
                  <li>
                    <strong>신청서 작성:</strong> 연부연납허가신청서에 신청 기간·회분·담보 내용을 기재합니다.
                  </li>
                  <li>
                    <strong>담보 서류 준비:</strong> 담보 종류에 따라 등기부등본, 보증보험증권, 보증서 등을 첨부합니다.
                  </li>
                  <li>
                    <strong>관할 세무서 제출:</strong> 증여세 신고서와 함께, 또는 고지서 납부기한 내 별도로 제출합니다.
                  </li>
                  <li>
                    <strong>허가 확인:</strong> 즉시허가 특례 대상이면 신청일에 허가로 간주되고, 그 외 담보는 세무서 심사 후 허가 통지를 받습니다.
                  </li>
                </ul>
                <p className="mt-4">
                  다만, 정해진 회차에 세액을 내지 못하면 세무서가 연부연납 허가를 취소하고 남은 세액 전부를 한꺼번에 징수할 수 있습니다. 신청 전에 각 회차 납부 계획을 세워두는 것이 중요합니다.
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
                    <p className="mt-1 text-sm text-text-secondary">연부연납 신청 전 예상 세액을 먼저 계산해보세요.</p>
                  </Link>
                  <Link
                    href="/calculator/inheritance-tax/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">상속세 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">상속세는 연부연납 기간(10년)이 증여세와 다릅니다.</p>
                  </Link>
                  <Link
                    href="/guide/gift-tax-installment-payment-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">증여세 분납·연부연납 개요</div>
                    <p className="mt-1 text-sm text-text-secondary">분납과 연부연납 중 무엇을 선택할지부터 확인하세요.</p>
                  </Link>
                  <Link
                    href="/guide/gift-tax-calculation-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">증여세 계산법 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">연부연납 신청 기준이 되는 세액 산출 방법.</p>
                  </Link>
                  <Link
                    href="/guide/family-business-inheritance-deduction-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">가업상속공제</div>
                    <p className="mt-1 text-sm text-text-secondary">가업승계 관련 상속세 특례와 함께 비교해보세요.</p>
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
                  <strong>면책조항:</strong> 이 글은 AI 보조로 자동 생성되어 자동 품질 게이트를 통과한 뒤 발행되었습니다. 발행 시점에 사람의 사전 검수는 없었으며, 운영자가 사후 점검합니다. 본 가이드는 교육 목적으로 작성되었으며 개인 맞춤형 세무·법률 조언이 아닙니다. 담보 인정 여부, 가산금 비율, 허가 절차는 개별 사안과 신청 시점의 고시에 따라 달라지므로 반드시 관할 세무서 또는 세무 전문가와 확인하세요. 본 콘텐츠는 2026-09-14을 기준으로 작성되었으며, 관련 법령 개정 시 업데이트됩니다. 인용 법조항: 상속세및증여세법 §71(연부연납), 상속세및증여세법 시행령 §69(연부연납 가산금), 국세기본법 시행규칙 §19의3(국세환급가산금의 이율).
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터</a>,{' '}
                  <a href="https://www.nts.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">국세청</a>,{' '}
                  <a href="https://www.hometax.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">홈택스</a>.
                </p>
              </section>

              <ShareButtons
                title="증여세 연부연납 조건·담보 제공 방법 2026 가이드"
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
