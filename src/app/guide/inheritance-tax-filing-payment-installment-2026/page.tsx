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

const URL = 'https://calculatorhost.com/guide/inheritance-tax-filing-payment-installment-2026/';
const DATE_PUBLISHED = '2026-07-29';
const DATE_MODIFIED = '2026-07-29';

export const metadata: Metadata = {
  title: '상속세 신고기한 6개월, 분납·연부연납·물납 2026',
  description:
    '상속세는 사망일이 속한 달 말일부터 6개월 안에 신고·납부해야 합니다. 세액이 1천만원을 넘으면 분납, 2천만원을 넘으면 연부연납이나 물납으로 나눠 낼 수 있는 요건과 절차를 상속세 및 증여세법 기준으로 정리했습니다.',
  keywords: [
    '상속세 신고기한',
    '상속세 6개월',
    '상속세 분납',
    '상속세 연부연납',
    '상속세 물납',
    '상속세 나눠내기',
    '상속세및증여세법 71조',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '상속세 신고기한 6개월, 분납·연부연납·물납 2026' }],
    title: '상속세 신고기한과 나눠 내는 방법 2026',
    description: '신고기한 6개월, 1천만원 초과 분납, 2천만원 초과 연부연납·물납 요건을 상속세및증여세법으로 정리.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '상속세 신고기한 6개월과 분납·연부연납·물납',
    description: '세액 규모별로 나눠 내는 방법과 요건을 상속세및증여세법 §67·§70·§71·§73으로 정리.',
  },
};

const FAQ_ITEMS = [
  {
    question: '상속세는 언제까지 신고해야 하나요?',
    answer:
      '상속개시일(사망일)이 속하는 달의 말일부터 6개월 이내에 신고·납부해야 합니다(상속세및증여세법 §67). 예를 들어 3월 10일에 사망했다면 그달 말일인 3월 31일부터 6개월 뒤인 9월 30일이 기한입니다. 피상속인이나 상속인 전원이 국외에 주소를 둔 경우에는 9개월로 연장됩니다.',
  },
  {
    question: '기한 안에 신고하면 혜택이 있나요?',
    answer:
      '네. 신고기한 안에 자진 신고하면 산출세액에서 신고세액공제 3%를 빼줍니다(상속세및증여세법 §69). 반대로 기한을 넘겨 신고하지 않으면 무신고 가산세와 납부지연 가산세가 더해져 부담이 크게 늘어납니다.',
  },
  {
    question: '세금이 커서 한 번에 못 내면 어떻게 하나요?',
    answer:
      '세액 규모에 따라 분납, 연부연납, 물납을 이용할 수 있습니다. 납부세액이 1천만원을 초과하면 분납, 2천만원을 초과하면 연부연납이나 물납을 신청할 수 있습니다. 분납은 무이자로 짧게 나눠 내는 것이고, 연부연납은 담보를 제공하고 최대 10년까지 길게 나눠 내는 제도입니다.',
  },
  {
    question: '분납은 얼마부터 가능한가요?',
    answer:
      '납부세액이 1천만원을 초과하면 분납할 수 있습니다(상속세및증여세법 §70). 세액이 2천만원 이하이면 1천만원을 초과하는 금액을, 2천만원을 초과하면 세액의 50% 이하 금액을 나눠 낼 수 있습니다. 분납 기한은 신고납부기한이 지난 뒤 2개월 이내이며 이자는 붙지 않습니다.',
  },
  {
    question: '연부연납은 몇 년까지 나눠 내나요?',
    answer:
      '일반 상속재산은 최대 10년, 가업상속재산은 요건 충족 시 최대 20년까지 나눠 낼 수 있습니다(상속세및증여세법 §71). 다만 납부세액이 2천만원을 초과해야 하고, 세무서에 담보를 제공하고 허가를 받아야 합니다. 나눠 내는 기간 동안에는 연부연납 가산금(이자 성격)이 함께 부과됩니다.',
  },
  {
    question: '물납은 어떤 경우에 할 수 있나요?',
    answer:
      '현금이 부족할 때 부동산이나 유가증권으로 세금을 내는 제도입니다(상속세및증여세법 §73). 납부세액이 2천만원을 초과하고, 상속재산 중 부동산과 유가증권의 비중이 절반을 넘으며, 납부세액이 상속재산 중 금융재산을 초과하는 등의 요건을 모두 갖춰 관할 세무서의 허가를 받아야 합니다.',
  },
  {
    question: '분납과 연부연납을 동시에 쓸 수 있나요?',
    answer:
      '두 제도는 함께 신청하지 않습니다. 연부연납을 허가받으면 그 세액은 연부연납 일정에 따라 나눠 내므로 분납 대상에서 제외됩니다. 세액이 크고 여러 해에 걸쳐 부담을 나누고 싶다면 연부연납, 짧게 2개월만 미루면 되는 정도라면 분납이 적합합니다.',
  },
  {
    question: '신고를 하지 않으면 어떤 불이익이 있나요?',
    answer:
      '기한 내 신고하지 않으면 무신고 가산세와 납부지연 가산세가 부과되고, 신고세액공제 3%도 받지 못합니다. 세무조사로 상속재산이 드러나면 본세에 가산세까지 더해져 부담이 크게 늘어나므로, 세액이 없더라도 신고 요건에 해당하면 기한 내 신고하는 것이 안전합니다.',
  },
];

export default function InheritanceTaxFilingPaymentInstallment2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '상속세 신고기한·납부 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '상속세 신고기한 6개월과 분납·연부연납·물납 2026',
    description:
      '상속세 신고기한(6개월)과 신고세액공제 3%, 세액 규모별 분납·연부연납·물납의 요건과 절차를 상속세및증여세법 기준으로 정리.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['상속세', '신고기한', '분납', '연부연납', '물납'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '상속세 신고기한·납부 2026',
    description:
      '상속세 신고기한과 분납·연부연납·물납의 요건을 정리한 상속인 실무 가이드.',
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
                    { name: '상속세 신고기한·납부 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">상속인 · 8분 읽기 · 2026-07-29</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  상속세 신고기한 6개월, 나눠 내는 법
                  <br />
                  <span className="text-2xl text-text-secondary">분납·연부연납·물납 2026</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  이 가이드는 가족의 갑작스러운 사망으로 상속세를 처음 마주한 상속인을 위한 것입니다. 상속세는 신고기한이 정해져 있고, 세액이 크면 담보를 잡고 여러 해에 걸쳐 나눠 낼 수도 있습니다. 언제까지 신고해야 하는지, 현금이 부족할 때 어떤 방법으로 나눠 낼 수 있는지, 각 방법의 요건과 절차를 상속세및증여세법 조항과 함께 차례로 정리합니다.
                </p>
              </header>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">상속세는 언제까지 신고·납부하나요?</h2>
                <p>
                  상속개시일(사망일)이 속하는 달의 말일부터 6개월 이내입니다(상속세및증여세법 §67). 이 기한 안에 신고서를 제출하고 세액을 납부해야 합니다. 피상속인이나 상속인 전원이 국외에 주소를 둔 경우에는 9개월로 연장됩니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">신고기한 계산 예시</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    · 사망일: 3월 10일 → 속하는 달의 말일 3월 31일
                    <br />
                    · 신고·납부기한: 3월 31일부터 6개월 뒤인 <strong>9월 30일</strong>
                    <br />
                    · 기한 내 자진신고 시 신고세액공제 3% 적용(상속세및증여세법 §69)
                  </p>
                </div>
                <p className="mt-4">
                  다만 기한을 넘기면 신고세액공제 3%를 받지 못할 뿐 아니라 무신고 가산세와 납부지연 가산세가 더해집니다. 세액이 크지 않더라도 신고 요건에 해당하면 기한 내 신고하는 것이 안전합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">세금이 커서 한 번에 못 내면 어떻게 하나요?</h2>
                <p>
                  세액 규모에 따라 분납, 연부연납, 물납 세 가지 방법으로 부담을 나눌 수 있습니다. 어떤 방법이 가능한지는 납부세액이 얼마인지, 상속재산이 부동산 위주인지에 따라 달라집니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 상속세를 나눠 내는 세 가지 방법 비교</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">방법</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">가능 요건</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">기간·특징</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">분납</td>
                        <td className="p-3">납부세액 1천만원 초과</td>
                        <td className="p-3">2개월 이내, 무이자</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">연부연납</td>
                        <td className="p-3">2천만원 초과 + 담보 제공</td>
                        <td className="p-3">최대 10년(가업 20년), 가산금</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">물납</td>
                        <td className="p-3">2천만원 초과 + 부동산·유가증권 요건</td>
                        <td className="p-3">부동산·유가증권으로 납부</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  다만 연부연납과 물납은 관할 세무서의 허가가 필요합니다. 담보 제공이나 재산 구성 요건을 갖추지 못하면 허가받지 못할 수 있으므로, 신고 단계에서 미리 계획을 세워야 합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">분납은 얼마부터 되나요?</h2>
                <p>
                  납부세액이 1천만원을 초과하면 분납할 수 있습니다(상속세및증여세법 §70). 분납은 신청서만 내면 되고 이자가 붙지 않아 가장 간단한 방법입니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 1. 납부세액 1,800만원 (2천만원 이하)</p>
                  <p className="text-sm text-text-secondary">
                    · 기준: 2천만원 이하이면 1천만원을 초과하는 금액을 분납
                    <br />
                    · 1차 납부(기한 내): 1,000만원
                    <br />
                    · 분납(2개월 이내): 나머지 <strong>800만원</strong>
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 1천만원 초과분 800만원을 2개월 뒤에 냅니다.</span>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 2. 납부세액 4,000만원 (2천만원 초과)</p>
                  <p className="text-sm text-text-secondary">
                    · 기준: 2천만원 초과이면 세액의 50% 이하를 분납
                    <br />
                    · 1차 납부(기한 내): 2,000만원
                    <br />
                    · 분납(2개월 이내): <strong>2,000만원</strong>(세액의 50% 이하)
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 절반까지 2개월 뒤로 미룰 수 있습니다.</span>
                  </p>
                </div>
              </section>

              <section className="space-y-6 border-t border-border-base pt-8" data-speakable>
                <h2 className="text-2xl font-bold">연부연납은 몇 년까지 나눠 내나요?</h2>
                <p>
                  일반 상속재산은 최대 10년, 가업상속재산은 요건 충족 시 최대 20년까지 나눠 낼 수 있습니다(상속세및증여세법 §71). 부동산 비중이 커서 당장 목돈을 마련하기 어려운 상속인이 주로 이용합니다.
                </p>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li>
                    <strong>세액 요건:</strong> 납부세액이 2천만원을 초과해야 신청할 수 있습니다.
                  </li>
                  <li>
                    <strong>담보 제공:</strong> 부동산, 보증보험, 납세보증 등 담보를 제공하고 관할 세무서의 허가를 받아야 합니다.
                  </li>
                  <li>
                    <strong>가산금:</strong> 나눠 내는 기간 동안 연부연납 가산금(이자 성격)이 함께 부과됩니다. 즉 분할의 편익에 대한 이자 비용이 발생합니다.
                  </li>
                </ul>
                <p className="mt-4">
                  다만 가산금 이율과 담보 요건은 개정될 수 있고 사안별로 다릅니다. 정확한 가산금과 분할 일정은 신청 시점에 관할 세무서에서 확인하세요.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">물납은 어떤 경우에 가능한가요?</h2>
                <p>
                  현금이 부족하고 상속재산이 부동산 위주일 때, 부동산이나 유가증권으로 세금을 내는 제도입니다(상속세및증여세법 §73). 요건이 까다로워 허가받기 쉽지 않으므로 마지막 수단으로 봅니다.
                </p>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li>납부세액이 2천만원을 초과할 것</li>
                  <li>상속재산 중 부동산과 유가증권의 비중이 절반을 넘을 것</li>
                  <li>납부세액이 상속재산 중 금융재산의 가액을 초과할 것</li>
                  <li>관할 세무서에 신청해 허가를 받을 것</li>
                </ul>
                <p className="mt-4">
                  예외: 물납으로 낼 수 있는 재산의 종류와 순서에는 제한이 있습니다. 금융재산으로 세금을 낼 수 있는데도 물납을 신청하면 허가되지 않을 수 있으므로, 재산 구성을 먼저 점검해야 합니다.
                </p>
              </section>

              <h2 className="text-2xl font-bold mb-6">자주 묻는 질문</h2>
              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h3 className="text-lg font-semibold text-text-primary">관련 계산기 및 가이드</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link
                    href="/calculator/inheritance-tax/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">상속세 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">상속재산과 공제를 입력해 세액을 계산해보세요.</p>
                  </Link>
                  <Link
                    href="/guide/inheritance-tax-calculation-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">상속세 계산법 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">과세표준·세율·누진공제의 기본을 배우세요.</p>
                  </Link>
                  <Link
                    href="/guide/inheritance-tax-deduction-limit-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">상속세 공제 한도</div>
                    <p className="mt-1 text-sm text-text-secondary">일괄공제·배우자공제로 얼마까지 면제되나.</p>
                  </Link>
                  <Link
                    href="/guide/inheritance-limited-acceptance-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">상속 한정승인·포기</div>
                    <p className="mt-1 text-sm text-text-secondary">빚이 많은 상속에서 상속인을 지키는 방법.</p>
                  </Link>
                  <Link
                    href="/guide/inheritance-tax-10-year-prior-gift-aggregation/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">10년 내 증여 합산</div>
                    <p className="mt-1 text-sm text-text-secondary">사전증여가 상속세에 합산되는 규칙.</p>
                  </Link>
                  <Link
                    href="/category/tax/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">모든 세금 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">상속·증여·양도·취득세 모음.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 교육 목적으로 작성되었으며, 개인 맞춤형 세무 조언이 아닙니다. 분납·연부연납·물납의 구체적 허가 여부, 담보 요건, 가산금 이율은 사안과 시점에 따라 달라지므로, 실제 신청은 관할 세무서 또는 세무대리인과 상담하세요. 본 콘텐츠는 2026-07-29 기준이며, 관련 법령은 상속세및증여세법 <strong>§67(신고), §69(신고세액공제), §70(분납), §71(연부연납), §73(물납)</strong>을 따릅니다. AI 보조 작성 후 운영자 검수 완료.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.nts.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">국세청</a>,{' '}
                  <a href="https://www.hometax.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">홈택스(상속세 신고)</a>,{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터</a>.
                </p>
              </section>

              <ShareButtons
                title="상속세 신고기한과 분납·연부연납·물납 2026 가이드"
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