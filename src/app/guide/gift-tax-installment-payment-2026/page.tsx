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

const URL = 'https://calculatorhost.com/guide/gift-tax-installment-payment-2026/';
const DATE_PUBLISHED = '2026-08-14';
const DATE_MODIFIED = '2026-08-14';

export const metadata: Metadata = {
  title: '증여세 분납·연부연납 2026, 목돈 없이 나눠 내는 법',
  description:
    '증여세가 1천만원을 넘으면 2개월 내 분납, 2천만원을 넘으면 담보를 걸고 5년간 연부연납으로 나눠 낼 수 있습니다. 분납과 연부연납의 조건, 금액 한도, 연 3.5% 가산금을 상속세및증여세법 §70·§71 기준으로 정리했습니다.',
  keywords: [
    '증여세 분납',
    '증여세 연부연납',
    '증여세 나눠 내기',
    '증여세 분할납부',
    '연부연납 가산금',
    '증여세 담보',
    '상속세및증여세법 71조',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '증여세 분납·연부연납 2026, 목돈 없이 나눠 내는 법' }],
    title: '증여세 분납·연부연납 2026, 목돈 없이 나눠 내는 법',
    description: '1천만원 초과 분납, 2천만원 초과 연부연납. 조건·금액 한도·연 3.5% 가산금·담보까지 완전 정리.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '증여세 분납·연부연납 2026, 목돈 없이 나눠 내는 법',
    description: '증여세를 한 번에 못 낼 때 분납·연부연납으로 나눠 내는 조건과 가산금을 정리.',
  },
};

const FAQ_ITEMS = [
  {
    question: '증여세도 나눠 낼 수 있나요?',
    answer:
      '네. 증여세는 일시납부가 원칙이지만, 세액이 크면 분납과 연부연납으로 나눠 낼 수 있습니다(상속세및증여세법 §70·§71). 분납은 2회에 걸쳐 짧게, 연부연납은 담보를 제공하고 여러 해에 걸쳐 나눠 내는 제도입니다. 둘 중 하나만 선택할 수 있습니다.',
  },
  {
    question: '분납의 조건은 무엇인가요?',
    answer:
      '납부할 증여세가 1천만원을 초과하면 분납할 수 있습니다(상속세및증여세법 §70). 신고납부기한이 지난 후 2개월 이내에 나머지를 납부하는 방식이며, 증여세 신고서의 분납란에 금액을 적어 제출하면 신청이 완료돼 별도 신청서가 필요 없습니다.',
  },
  {
    question: '분납으로 얼마까지 미룰 수 있나요?',
    answer:
      '분납 가능 금액에는 한도가 있습니다. 납부세액이 2천만원 이하이면 1천만원을 초과하는 금액을 분납하고, 2천만원을 초과하면 세액의 50% 이하를 분납할 수 있습니다. 즉 최소 절반 이상은 신고기한 내에 먼저 납부해야 합니다.',
  },
  {
    question: '연부연납이란 무엇인가요?',
    answer:
      '연부연납은 납부세액이 2천만원을 초과할 때 세무서장의 허가를 받아 여러 해에 걸쳐 나눠 내는 제도입니다(상속세및증여세법 §71). 증여세는 원칙적으로 5년 이내로 허가되며, 각 회분의 분할납부 세액이 1천만원을 초과해야 하고 담보 제공이 필수입니다.',
  },
  {
    question: '연부연납 가산금(이자)은 얼마인가요?',
    answer:
      '연부연납은 세금을 미루는 만큼 가산금(이자 성격)이 붙습니다. 2024년 3월 22일 이후 신청분의 가산금 이자율은 연 3.5% 수준으로 적용되어 왔으나, 이 이율은 국세기본법 시행규칙으로 변동될 수 있으므로 신청 시점의 국세청 고시를 확인해야 합니다.',
  },
  {
    question: '담보로는 무엇을 제공하나요?',
    answer:
      '금전, 국채·공채 등 유가증권, 납세보증보험증권, 부동산 등을 담보로 제공할 수 있습니다. 담보 금액은 연부연납 세액과 가산금의 120%(납세보증보험증권은 110%)에 해당하는 금액을 제공해야 합니다.',
  },
  {
    question: '분납과 연부연납을 동시에 할 수 있나요?',
    answer:
      '아니요. 분납과 연부연납은 동시에 신청할 수 없고 둘 중 하나만 선택합니다. 세액 규모가 크고 여러 해에 걸쳐 나누고 싶다면 연부연납을, 세액이 크지 않고 몇 달만 미루면 되면 분납을 택하는 것이 일반적입니다.',
  },
  {
    question: '연부연납이 유리한가요, 그냥 대출이 나은가요?',
    answer:
      '연부연납 가산금 이율과 대출 금리를 비교해 판단합니다. 가산금 이율이 시중 대출 금리보다 낮으면 연부연납이 유리하고, 반대면 대출로 일시 납부하는 것이 나을 수 있습니다. 다만 담보 부담과 자금 계획을 함께 고려해야 하므로 세무대리인과 상담하는 것이 안전합니다.',
  },
];

export default function GiftTaxInstallmentPayment2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '증여세 분납·연부연납 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '증여세 분납·연부연납 2026, 목돈 없이 나눠 내는 법',
    description:
      '증여세 분납(1천만원 초과, 2개월)과 연부연납(2천만원 초과, 5년, 담보)의 조건·금액 한도·연 3.5% 가산금·선택 기준을 상속세및증여세법 §70·§71로 정리.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['증여세 분납', '연부연납', '가산금', '담보', '분할납부'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '증여세 분납·연부연납 2026',
    description:
      '증여세를 한 번에 못 낼 때 분납·연부연납으로 나눠 내는 조건과 가산금, 담보 정리.',
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
                    { name: '증여세 분납·연부연납 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">증여받은 사람 · 8분 읽기 · 2026-08-14</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  증여세 분납·연부연납 2026
                  <br />
                  <span className="text-2xl text-text-secondary">· 목돈 없이 나눠 내는 법</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  부모님에게 부동산이나 큰돈을 증여받으면 세금은 현금으로 내야 하는데, 정작 손에 쥔 현금이 부족한 경우가 많습니다. 이럴 때 쓰는 제도가 분납과 연부연납입니다. 이 글은 어느 정도 세액부터 나눠 낼 수 있는지, 몇 년에 걸쳐 나눌 수 있는지, 이자 성격의 가산금과 담보는 어떻게 되는지를 상속세및증여세법 기준으로 정리합니다. 자금 계획을 세우는 증여받은 분을 위한 가이드입니다.
                </p>
              </header>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">증여세도 나눠 낼 수 있나요?</h2>
                <p>
                  네, 나눠 낼 수 있습니다. 증여세는 원칙적으로 신고기한 내 일시납부가 원칙이지만, 세액이 크면 두 가지 방법으로 부담을 분산할 수 있습니다. 짧게 두 번에 나누는 분납(§70)과, 담보를 걸고 여러 해에 나누는 연부연납(§71)입니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">30초 요약</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    · 분납: 세액 <strong>1천만원 초과</strong> → 신고기한 후 2개월 이내 2회 분할, 담보·이자 없음
                    <br />
                    · 연부연납: 세액 <strong>2천만원 초과</strong> → 최대 5년 분할, 담보 필수, 가산금(연 3.5% 수준)
                    <br />
                    · 각 회분 분할세액이 1천만원 초과해야 연부연납 가능
                    <br />
                    · 분납과 연부연납은 <strong>동시 신청 불가</strong>
                  </p>
                </div>
                <p>
                  다만 나눠 낸다고 세액 자체가 줄어드는 것은 아닙니다. 특히 연부연납은 미룬 기간만큼 가산금이 붙으므로, 자금 여유와 이자 비용을 함께 따져야 합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">분납의 조건과 금액 (상속세및증여세법 §70)</h2>
                <p>
                  분납은 납부할 증여세가 1천만원을 초과할 때, 신고납부기한이 지난 후 2개월 이내에 나머지를 납부하는 방식입니다. 담보나 별도 이자가 없어 절차가 가장 간단합니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 증여세 분납 가능 금액 (상속세및증여세법 §70)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">납부세액</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">분납 가능액</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">1천만원 이하</td>
                        <td className="p-3">분납 불가 (일시납부)</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">1천만원 초과 ~ 2천만원 이하</td>
                        <td className="p-3">1천만원을 초과하는 금액</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">2천만원 초과</td>
                        <td className="p-3">납부세액의 50% 이하</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p>
                  신청은 간단합니다. 증여세 신고서의 분납란에 분할 납부할 세액을 적어 제출하면 그 자체로 분납 신청이 완료됩니다. 예외: 무신고 후 고지된 세액도 분납이 가능하나, 이 경우 절차가 다를 수 있으니 관할 세무서에 확인하세요.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">연부연납의 조건 (상속세및증여세법 §71)</h2>
                <p>
                  연부연납은 세액이 2천만원을 초과할 때, 세무서장의 허가를 받아 여러 해에 걸쳐 나눠 내는 제도입니다. 증여세는 원칙적으로 5년 이내로 허가됩니다.
                </p>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li><strong>기준 세액:</strong> 납부세액 2천만원 초과</li>
                  <li><strong>각 회분 요건:</strong> 매회 분할납부 세액이 1천만원을 초과해야 함</li>
                  <li><strong>기간:</strong> 원칙 5년 이내 (가업승계 증여세 과세특례 재산은 별도 장기 특례)</li>
                  <li><strong>담보:</strong> 부동산·유가증권·납세보증보험증권 등 필수 제공</li>
                  <li><strong>신청 기한:</strong> 신고 시 신고기한까지, 고지 시 납부기한까지</li>
                </ul>
                <p>
                  다만 각 회분 세액이 1천만원을 넘어야 하므로, 세액이 크지 않으면 연부연납 대신 분납만 가능한 경우가 생깁니다. 예를 들어 세액이 3천만원인데 5년(6회)으로 나누면 회당 500만원이라 1천만원 초과 요건을 못 채웁니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">실제 계산 사례</h2>
                <p>
                  분납과 연부연납이 실제로 어떻게 적용되는지 세 가지 사례로 살펴봅니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 1. 증여세 1,800만원 (분납)</p>
                  <p className="text-sm text-text-secondary">
                    · 2천만원 이하이므로 1천만원 초과분만 분납 가능
                    <br />
                    · 신고기한 내 납부: 1,000만원
                    <br />
                    · 2개월 이내 분납: 1,800만원 − 1,000만원 = <strong>800만원</strong>
                    <br />
                    <span className="text-xs text-text-tertiary">담보·가산금 없음. 신고서 분납란 기재로 신청 완료.</span>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 2. 증여세 4,000만원 (분납)</p>
                  <p className="text-sm text-text-secondary">
                    · 2천만원 초과이므로 세액의 50% 이하까지 분납 가능
                    <br />
                    · 신고기한 내 납부: 2,000만원 (50%)
                    <br />
                    · 2개월 이내 분납: 4,000만원 × 50% = <strong>2,000만원</strong>
                    <br />
                    <span className="text-xs text-text-tertiary">절반은 반드시 신고기한 내 먼저 납부합니다.</span>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 3. 증여세 1억 2,000만원 (연부연납 5년)</p>
                  <p className="text-sm text-text-secondary">
                    · 신고 시 1회분: 1억 2,000만원 ÷ 6 = 2,000만원 납부
                    <br />
                    · 이후 5년간 매년: 2,000만원씩 (각 회분 1천만원 초과 요건 충족)
                    <br />
                    · 각 회차마다 잔여 세액에 가산금(연 3.5% 수준)이 추가로 부과
                    <br />
                    <span className="text-xs text-text-tertiary">담보는 연부연납 세액과 가산금의 120%(보증보험 110%) 제공.</span>
                  </p>
                </div>
              </section>

              <section className="space-y-6 border-t border-border-base pt-8">
                <h2 className="text-2xl font-bold">분납 vs 연부연납, 어느 쪽이 유리할까</h2>
                <p>
                  결론은 세액 규모와 자금 회복 시점에 달려 있습니다. 짧은 시간 안에 자금을 마련할 수 있으면 분납이, 여러 해에 걸쳐 나눠야 하면 연부연납이 맞습니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 2. 분납과 연부연납 비교</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">구분</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">분납</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">연부연납</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">기준 세액</td>
                        <td className="p-3">1천만원 초과</td>
                        <td className="p-3">2천만원 초과</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">기간</td>
                        <td className="p-3">2개월 이내 2회</td>
                        <td className="p-3">최대 5년</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">담보</td>
                        <td className="p-3">없음</td>
                        <td className="p-3">필수</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">가산금</td>
                        <td className="p-3">없음</td>
                        <td className="p-3">연 3.5% 수준(변동)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p>
                  다만 연부연납 가산금 이율이 시중 대출 금리보다 높다면, 대출로 일시 납부하는 편이 이자 부담 면에서 나을 수 있습니다. 담보 여력과 금리를 비교해 결정하세요.
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
                    <p className="mt-1 text-sm text-text-secondary">증여재산공제와 세율로 납부세액을 먼저 계산하세요.</p>
                  </Link>
                  <Link
                    href="/guide/gift-tax-calculation-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">증여세 계산법 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">과세표준·누진공제·세율의 기본을 익히세요.</p>
                  </Link>
                  <Link
                    href="/guide/gift-tax-exemption-limit-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">증여재산공제 한도</div>
                    <p className="mt-1 text-sm text-text-secondary">배우자 6억·자녀 5천만원 등 10년 공제.</p>
                  </Link>
                  <Link
                    href="/guide/inheritance-tax-filing-payment-installment-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">상속세 분납·연부연납</div>
                    <p className="mt-1 text-sm text-text-secondary">상속세도 나눠 내는 방법이 궁금하다면.</p>
                  </Link>
                  <Link
                    href="/guide/gift-acquisition-tax-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">증여 취득세</div>
                    <p className="mt-1 text-sm text-text-secondary">부동산 증여 시 취득세도 함께 챙기세요.</p>
                  </Link>
                  <Link
                    href="/category/tax/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">모든 세금 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">양도세·취득세·상속세·종부세 모음.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 교육 목적으로 작성되었으며, 개인 맞춤형 세무 조언이 아닙니다. 분납·연부연납 가능 여부, 담보 종류와 금액, 연부연납 가산금 이율은 신청 시점과 개별 사안에 따라 달라지므로 홈택스 또는 관할 세무서, 세무대리인에게 반드시 확인하세요. 연부연납 가산금 이율(2024-03-22 이후 연 3.5% 수준)은 국세기본법 시행규칙 개정으로 변동될 수 있습니다. 본 콘텐츠는 2026-08-14 기준으로 작성되었습니다. 인용한 법조항은 <strong>상속세및증여세법 §70(분납), §71(연부연납)</strong>입니다. AI 보조 작성 후 운영자 검수 완료.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.nts.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">국세청</a>,{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터</a>,{' '}
                  <a href="https://www.hometax.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">국세청 홈택스</a>.
                </p>
              </section>

              <ShareButtons
                title="증여세 분납·연부연납 2026 가이드"
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
