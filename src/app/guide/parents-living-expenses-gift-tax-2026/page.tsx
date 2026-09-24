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

const URL = 'https://calculatorhost.com/guide/parents-living-expenses-gift-tax-2026/';
const DATE_PUBLISHED = '2026-09-25';
const DATE_MODIFIED = '2026-09-25';

export const metadata: Metadata = {
  title: '부모님이 준 생활비 증여세, 비과세 범위와 조건 2026',
  description:
    '부모가 자녀에게 주는 생활비·교육비는 상속세및증여세법 §46, 시행령 §35에 따라 부양의무자 사이에서 필요할 때마다 실제로 쓴 금액만 증여세가 비과세됩니다. 예적금이나 집 사는 데 쓰면 과세되는 이유와 성년 자녀 5천만원 공제와의 차이를 정리했습니다.',
  keywords: [
    '부모 생활비 증여세',
    '생활비 증여세 비과세',
    '용돈 증여세',
    '교육비 증여세 비과세',
    '상속세및증여세법 46조',
    '증여재산공제 5천만원',
    '부양의무자 생활비',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '부모님이 준 생활비 증여세, 비과세 범위와 조건 2026' }],
    title: '부모님이 준 생활비 증여세, 비과세 범위는 어디까지 2026',
    description: '부양의무자 사이 생활비·교육비 비과세 조건과 예적금·부동산 매입 시 과세되는 이유.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '부모님이 준 생활비, 증여세 비과세 범위 2026',
    description: '부양의무자 사이 생활비·교육비는 실제 사용분만 비과세. 상증세법 §46·시행령 §35 기준 정리.',
  },
};

const FAQ_ITEMS = [
  {
    question: '부모님이 매달 주는 용돈도 증여세를 내야 하나요?',
    answer:
      '통상적인 생활비·용돈으로 필요할 때마다 실제로 쓰는 금액이면 증여세가 비과세됩니다(상속세및증여세법 §46 제5호, 시행령 §35④). 다만 직계혈족 등 민법상 부양의무자 사이여야 하고, 받은 돈을 그대로 예적금하거나 주식·부동산을 사는 데 쓰면 비과세 대상에서 벗어나 증여세가 부과될 수 있습니다.',
  },
  {
    question: '성인 자녀에게 준 생활비도 무조건 비과세인가요?',
    answer:
      '아니요, 자동으로 비과세되는 것은 아닙니다. 국세청은 수증자의 나이·소득·재산 상태를 보고 그 생활비가 실제로 필요했는지, 부양의무자 관계가 맞는지를 개별 판단합니다. 독립적인 소득과 재산이 충분한 성인 자녀에게 거액을 정기적으로 이체하면 생활비가 아니라 증여로 과세될 위험이 커집니다.',
  },
  {
    question: '생활비로 받은 돈을 적금에 넣으면 어떻게 되나요?',
    answer:
      '그 시점부터 비과세 요건을 벗어나 증여세 과세 대상이 됩니다. 시행령 §35④의 취지는 생활에 필요한 비용을 그때그때 충당하라는 것이지, 재산을 불리는 용도가 아닙니다. 생활비 명목으로 받은 돈이라도 정기예금·적금, 주식·토지·주택 매입 자금으로 쓰면 국세청은 실질을 증여로 봅니다.',
  },
  {
    question: '조부모가 손자녀에게 준 생활비도 비과세인가요?',
    answer:
      '부모가 모두 생존해 부양의무를 이행하고 있다면 조부모는 손자녀에 대한 법적 부양의무자가 아니어서 비과세 대상이 아닐 수 있습니다. 실무상 부양의무 없는 조부모가 손자녀 생활비·교육비를 계속 부담한 사안에서 비과세를 인정받지 못한 사례가 있으므로, 손자녀 명의 학원비·용돈은 증여재산공제(미성년자 2천만원) 범위로 관리하는 것이 안전합니다.',
  },
  {
    question: '생활비 비과세와 증여재산공제 5천만원은 같은 건가요?',
    answer:
      '다릅니다. 생활비·교육비 비과세(§46)는 부양의무자 사이의 실사용 생활자금에 적용되고 금액 한도가 정해져 있지 않은 대신 용도가 엄격히 제한됩니다. 반면 증여재산공제(§53)는 성년 자녀 5천만원, 미성년 자녀 2천만원까지 용도에 상관없이 10년간 공제되는 별도 제도입니다. 목돈을 자녀 명의 재산으로 만들어주려면 생활비가 아니라 증여재산공제를 활용해야 합니다.',
  },
  {
    question: '국세청은 생활비 증여를 어떻게 확인하나요?',
    answer:
      '계좌 이체 내역, 이체 주기와 금액의 일관성, 수증자의 자금 사용처를 종합해 판단합니다. 같은 금액이 매달 정기적으로 들어오다가 특정 시점에 목돈으로 모여 부동산·주식 매입에 쓰였다면 생활비가 아니라 증여로 재구성될 수 있습니다. 실질과세 원칙(국세기본법 §14)에 따라 명목이 아니라 실제 쓰임을 기준으로 과세 여부를 가립니다.',
  },
  {
    question: '유학 중인 자녀 학비를 보내주는 것도 비과세인가요?',
    answer:
      '학자금·장학금 등 통상 필요한 교육비는 시행령 §35④에서 비과세 증여재산으로 명시하고 있어 해당됩니다. 다만 학비 명목으로 보낸 돈을 현지에서 주택 구입이나 투자에 쓰면 마찬가지로 비과세 취지를 벗어나므로, 등록금·기숙사비 등 실제 교육 관련 지출로 사용해야 안전합니다.',
  },
];

export default function ParentsLivingExpensesGiftTax2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '부모님이 준 생활비 증여세 비과세 범위 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '부모님이 준 생활비 증여세, 비과세 범위와 조건 2026',
    description:
      '부양의무자 사이 생활비·교육비 비과세 요건(상증세법 §46·시행령 §35), 예적금·부동산 매입 시 과세 전환, 조부모 생활비 예외, 증여재산공제 5천만원과의 차이를 정리.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['생활비 증여세', '교육비 비과세', '증여재산공제', '상속세및증여세법 46조', '부양의무자'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '부모님이 준 생활비 증여세 비과세 범위 2026',
    description:
      '부양의무자 사이의 생활비·교육비가 증여세 비과세되는 조건과, 예적금·투자로 전환됐을 때 과세되는 기준.',
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
                    { name: '부모님이 준 생활비 증여세 비과세 범위 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">세금 · 8분 읽기 · 2026-09-25</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  부모님이 준 생활비 증여세
                  <br />
                  <span className="text-2xl text-text-secondary">· 비과세 범위와 조건 2026</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  부모가 자녀에게 매달 보내는 생활비나 용돈에도 증여세가 붙는지 궁금해하는 사람이 많습니다. 이 가이드는 부양의무자 사이 생활비·교육비가 언제 비과세되고 언제 과세로 전환되는지, 조부모가 준 용돈은 어떻게 다른지, 목돈을 물려줄 때 쓰는 증여재산공제와는 무엇이 다른지를 상속세및증여세법 §46·시행령 §35를 기준으로 정리합니다. 대상 독자는 부모·자녀 간 정기 송금이 있는 가구입니다.
                </p>
              </header>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">부모가 준 생활비는 왜 증여세가 비과세인가요?</h2>
                <p>
                  민법상 부양의무자 사이에서 통상 필요하다고 인정되는 생활비·교육비는 증여세 과세 대상에서 제외되기 때문입니다. 상속세및증여세법 §46 제5호는 사회통념상 인정되는 이재구호금품·치료비와 함께 피부양자의 생활비·교육비를 비과세 증여재산으로 명시하고 있습니다.
                </p>
                <p>
                  구체적인 범위는 같은 법 시행령 §35④에서 정합니다. 민법상 부양의무자 상호간의 생활비·교육비로서 통상 필요한 금품, 학자금·장학금, 통상 필요한 축하금·부의금, 통상 필요한 혼수용품이 여기에 해당합니다. 부모와 미성년 자녀뿐 아니라 직계혈족 및 그 배우자 사이(민법 §974)에도 적용됩니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">30초 요약</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    정의: 부양의무자 사이 생활비·교육비는 실제 사용분만 증여세 비과세.
                    <br />
                    근거: 상속세및증여세법 §46 제5호, 시행령 §35④.
                    <br />
                    조건: 필요할 때마다 직접 비용에 충당해야 함, 저축·투자 전환 시 과세.
                    <br />
                    주의: 부양의무 없는 조부모의 손자녀 생활비는 비과세 부정될 수 있음.
                  </p>
                </div>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">생활비·교육비 비과세는 어디까지 인정되나요?</h2>
                <p>
                  통상 필요한 범위까지만 인정됩니다. 판단 기준은 증여자와 수증자의 관계, 수증자가 민법상 피부양자에 해당하는지 여부, 수증자의 나이·직업·소득·재산 상태입니다. 이미 안정적인 소득과 재산이 있는 성인 자녀에게 거액을 정기적으로 보내면 생활비가 아니라 증여로 재구성될 수 있습니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 시행령 §35④ 비과세 증여재산 4가지</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">구분</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">내용</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">생활비·교육비</td>
                        <td className="p-3">부양의무자 사이 통상 필요한 생활비·교육비</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">학자금·장학금</td>
                        <td className="p-3">학자금·장학금 기타 이와 유사한 금품</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">축하금·부의금</td>
                        <td className="p-3">통상 필요하다고 인정되는 기념품·축하금·부의금</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">혼수용품</td>
                        <td className="p-3">통상 필요하다고 인정되는 혼수용품</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  다만, 축의금은 혼주가 아니라 신랑·신부 본인에게 직접 건네진 것인지에 따라 과세 여부가 달라질 수 있습니다. 혼수용품도 가전·가구 등 생활에 통상 필요한 수준을 넘는 고가품은 비과세 취지를 벗어난다고 볼 여지가 있습니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">받은 생활비를 예적금하거나 집 사는 데 쓰면 어떻게 되나요?</h2>
                <p>
                  그 순간부터 비과세 요건을 벗어나 증여세 과세 대상이 됩니다. 생활비·교육비는 필요할 때마다 그 비용에 직접 충당하기 위해 받는 돈을 뜻하므로, 명목이 생활비라도 실제로는 정기예금·적금에 넣거나 주식·토지·주택 매입 자금으로 쓰면 재산을 불리는 용도로 국세청이 판단합니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3">
                  <p className="font-semibold text-text-primary">사례. 월 300만원씩 2년간 받은 생활비의 갈림길</p>
                  <p className="text-sm text-text-secondary">
                    · 매월 생활비로 받아 그달 식비·주거비·교육비로 소진: 비과세 유지
                    <br />
                    · 매월 받은 300만원 중 150만원씩 적금에 자동이체: 적금분은 과세 대상 전환 위험
                    <br />
                    · 2년치를 모아 두었다가 전세보증금·주택 매입에 사용: 전액 증여로 재구성될 수 있음
                  </p>
                </div>
                <p className="mt-4">
                  다만, 이 원칙은 사후에 실제 지출 내역을 소명하라는 의미이지 매번 영수증을 제출하라는 뜻은 아닙니다. 소명이 필요한 시점은 대개 국세청이 계좌 흐름에서 이상 패턴을 포착했을 때입니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">부양의무 없는 조부모가 준 용돈도 비과세인가요?</h2>
                <p>
                  부모가 생존해 있고 부양의무를 이행하고 있다면, 조부모는 손자녀에 대한 1차 부양의무자가 아니어서 조부모가 준 생활비·교육비는 비과세로 인정받지 못할 수 있습니다. 부양의무 없는 사람이 부담한 생활비·교육비는 §46 제5호의 취지를 벗어난다고 본 실무 사례가 있습니다.
                </p>
                <p>
                  다만, 부모가 사망했거나 부양 능력이 없어 조부모가 실질적으로 부양하는 상황이라면 판단이 달라질 수 있습니다. 손자녀 명의로 학원비·용돈을 꾸준히 지원하려는 경우에는 비과세 요건을 다투기보다 미성년자 증여재산공제(10년간 2천만원, §53)를 활용하는 편이 안전합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">생활비 비과세와 증여재산공제 5천만원, 무엇이 다른가요?</h2>
                <p>
                  생활비·교육비 비과세(§46)와 증여재산공제(§53)는 적용 조건과 목적이 다른 별개 제도입니다. 전자는 금액 한도가 정해져 있지 않은 대신 용도가 생활·교육비로 엄격히 제한되고, 후자는 용도 제한 없이 정해진 한도까지 자유롭게 쓸 수 있는 대신 10년간 합산해 한도를 넘으면 과세됩니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 2. 생활비 비과세(§46) vs 증여재산공제(§53)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">항목</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">생활비·교육비 비과세</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">증여재산공제</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">근거 조항</td>
                        <td className="p-3">§46 제5호, 시행령 §35④</td>
                        <td className="p-3">§53</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">금액 한도</td>
                        <td className="p-3">없음(통상 필요한 범위)</td>
                        <td className="p-3">성년 자녀 5천만원, 미성년 2천만원(10년 합산)</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">용도 제한</td>
                        <td className="p-3">생활비·교육비로 즉시 사용해야 함</td>
                        <td className="p-3">제한 없음(저축·투자·매입 자유)</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">적용 관계</td>
                        <td className="p-3">민법상 부양의무자(직계혈족 및 배우자 등)</td>
                        <td className="p-3">직계존비속·배우자·기타친족</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  다만, 두 제도를 함께 쓸 수도 있습니다. 평소 생활비는 §46 비과세로 처리하고, 자녀 명의로 목돈을 만들어주고 싶다면 별도로 증여재산공제 한도 내에서 증여를 실행해 신고하는 방식이 일반적입니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">국세청은 생활비 증여를 어떻게 확인하나요?</h2>
                <p>
                  계좌 이체의 주기·금액 일관성과 수증자의 실제 자금 사용처를 종합해 판단합니다. 국세기본법 §14가 정한 실질과세 원칙에 따라, 이체할 때 붙인 이름이 아니라 그 돈이 실제로 어디에 쓰였는지를 기준으로 과세 여부를 가립니다.
                </p>
                <p>
                  같은 금액이 매달 정기적으로 들어오다가 특정 시점에 목돈으로 모여 부동산·주식 매입에 쓰인 흐름은 대표적으로 소명을 요구받는 패턴입니다. 소득이 없는 자녀 명의 계좌에 거액이 쌓여 있거나, 자녀 명의로 산 자산의 자금 출처가 부모의 정기 이체와 시기적으로 일치하면 증여로 판단될 가능성이 높아집니다.
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
                    <div className="font-semibold text-primary-500">증여세 계산법 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">과세표준·공제·세율까지 증여세 계산 전 과정.</p>
                  </Link>
                  <Link
                    href="/guide/family-loan-agreement-gift-tax-avoidance/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">가족 간 차용증·금전대여</div>
                    <p className="mt-1 text-sm text-text-secondary">목돈을 빌려줄 때 증여로 오인받지 않는 법.</p>
                  </Link>
                  <Link
                    href="/guide/wedding-gift-money-tax-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">축의금·혼수용품 증여세</div>
                    <p className="mt-1 text-sm text-text-secondary">결혼 시 주고받는 돈의 과세 기준 정리.</p>
                  </Link>
                  <Link
                    href="/guide/low-price-transfer-deemed-gift-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">저가양수도 증여의제</div>
                    <p className="mt-1 text-sm text-text-secondary">시가보다 싸게 사고팔 때 증여세가 붙는 기준.</p>
                  </Link>
                  <Link
                    href="/calculator/gift-tax/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">증여세 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">공제·세율을 반영해 예상 세액을 바로 계산해보세요.</p>
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
                  <strong>면책조항:</strong> 이 글은 AI 보조로 자동 생성되어 자동 품질 게이트를 통과한 뒤 발행되었습니다. 발행 시점에 사람의 사전 검수는 없었으며, 운영자가 사후 점검합니다. 본 가이드는 교육 목적으로 작성되었으며 개인 맞춤형 세무 조언이 아닙니다. 실제 비과세 인정 여부는 증여자·수증자의 관계, 수증자의 소득·재산 상태, 자금 실제 사용처에 따라 달라지므로 구체적인 사안은 세무서 또는 세무사와 상담하세요. 본 콘텐츠는 2026-09-25을 기준으로 작성되었으며 관련 법령 변경 시 업데이트됩니다. 인용 법조항: 상속세및증여세법 §46(비과세되는 증여재산), §53(증여재산공제), 같은 법 시행령 §35(비과세되는 증여재산의 범위), 민법 §974(부양의무), 국세기본법 §14(실질과세).
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터</a>,{' '}
                  <a href="https://www.nts.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">국세청</a>,{' '}
                  <a href="https://call.nts.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">국세상담센터</a>.
                </p>
              </section>

              <ShareButtons
                title="부모님이 준 생활비 증여세, 비과세 범위와 조건 2026"
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
