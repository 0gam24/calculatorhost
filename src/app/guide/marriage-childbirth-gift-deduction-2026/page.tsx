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

const URL = 'https://calculatorhost.com/guide/marriage-childbirth-gift-deduction-2026/';
const DATE_PUBLISHED = '2026-07-15';
const DATE_MODIFIED = '2026-07-15';
// 수익 레버 [revenue-lever: indexing+traffic]: 신규 색인 페이지 추가, 롱테일 트래픽 유입

export const metadata: Metadata = {
  title: '혼인·출산 증여재산공제 2026, 최대 1억원 절세 요건 총정리',
  description:
    '결혼·출산 때 부모가 재산을 물려줘도 최대 1억원까지 증여세가 없습니다. 상증법 §53의2 혼인·출산 증여재산공제의 요건, 통합 1억 한도, 일반공제 5천만원과의 합산 절세법을 사례로 정리합니다.',
  keywords: [
    '혼인 증여재산공제',
    '출산 증여재산공제',
    '결혼 증여세 면제',
    '증여세 1억 공제',
    '자녀 증여 절세',
    '상증법 53조의2',
    '증여재산공제 한도',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '혼인·출산 증여재산공제 2026, 최대 1억원 절세 요건 총정리' }],
    title: '혼인·출산 증여재산공제 2026, 결혼·출산 때 1억원 무증여세',
    description: '혼인신고 전후 2년, 출산 2년 이내 직계존속 증여 시 최대 1억원 추가 공제. 일반공제 5천만원과 합치면 1.5억까지 증여세 0.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '혼인·출산 증여재산공제 2026, 최대 1억원 절세',
    description: '결혼·출산 때 직계존속 증여 최대 1억 추가 공제. 상증법 §53의2. 일반공제와 합쳐 1.5억까지 무세.',
  },
};

const FAQ_ITEMS = [
  {
    question: '혼인 증여재산공제로 얼마까지 증여세가 없나요?',
    answer:
      '직계존속으로부터 받는 혼인 증여는 최대 1억원까지 추가 공제됩니다(상증법 §53의2). 여기에 기존 일반 증여재산공제 5천만원(성년 직계비속, 10년 통산)을 합치면 총 1억 5천만원까지 증여세 없이 물려받을 수 있습니다. 다만 이 한도는 부모·조부모 등 모든 직계존속에게서 받은 금액을 합산해 적용합니다.',
  },
  {
    question: '혼인공제와 출산공제를 각각 1억씩 받을 수 있나요?',
    answer:
      '아니요. 혼인 증여재산공제와 출산 증여재산공제는 합쳐서 1억원이 한도입니다. 결혼할 때 1억원을 모두 공제받았다면, 이후 출산하더라도 추가 공제는 없습니다. 반대로 결혼 때 4천만원만 공제받았다면 출산 때 남은 6천만원을 활용할 수 있습니다. 두 제도의 통합 한도가 1억원이라는 점을 반드시 기억하세요.',
  },
  {
    question: '언제 증여한 재산까지 공제 대상인가요?',
    answer:
      '혼인공제는 혼인신고일 이전 2년부터 이후 2년까지, 총 4년의 기간 안에 직계존속에게서 받은 증여가 대상입니다. 출산공제는 자녀의 출생일 또는 입양신고일부터 2년 이내 증여가 대상입니다. 증여일이 2024년 1월 1일 이후여야 하며, 그 이전 증여분은 소급 적용되지 않습니다.',
  },
  {
    question: '어떤 재산을 증여해야 공제받을 수 있나요?',
    answer:
      '재산의 종류에는 특별한 제한이 없습니다. 현금, 예금, 주식, 부동산 등 무엇이든 직계존속에게서 받으면 공제 대상이 됩니다. 결혼자금으로 쓰지 않아도 되고 용도를 증빙할 필요도 없습니다. 다만 증여의제·증여추정으로 과세되는 일부 재산 등 제외 대상이 있을 수 있으므로, 고액 증여 전에는 국세청 또는 세무 전문가에게 확인하는 것이 안전합니다.',
  },
  {
    question: '결혼이 취소되면 이미 공제받은 세금은 어떻게 되나요?',
    answer:
      '약혼 파기 등으로 혼인이 성립하지 않으면, 증여받은 재산을 증여일이 속하는 달의 말일부터 3개월 이내에 반환하면 처음부터 증여가 없었던 것으로 봅니다. 이 경우 증여세도 부과되지 않습니다. 다만 기한을 넘겨 반환하면 반환 자체가 새로운 증여로 간주될 수 있으므로, 반환 시점을 놓치지 않는 것이 중요합니다.',
  },
  {
    question: '양가 부모가 각각 증여하면 공제가 두 배가 되나요?',
    answer:
      '아니요. 혼인·출산 증여재산공제 1억원 한도는 증여를 받는 사람(수증자) 기준입니다. 신랑이 자기 부모에게 1억, 신부가 자기 부모에게 1억을 각각 받으면 부부 두 사람 기준으로 총 2억이 공제됩니다. 하지만 한 사람이 양가에서 각각 1억씩 받는 구조는 성립하지 않고, 그 사람의 공제 한도는 1억원으로 제한됩니다.',
  },
  {
    question: '일반 증여재산공제 5천만원과 혼인공제 중 무엇을 먼저 적용하나요?',
    answer:
      '실무상 일반 증여재산공제(5천만원)를 먼저 적용하고, 부족한 부분에 혼인·출산 공제를 적용하는 방식이 유리한 경우가 많습니다. 적용 순서는 향후 다른 증여나 반환이 있을 때 남는 공제 여력에 영향을 주므로, 큰 금액을 여러 번 나누어 증여할 계획이라면 세무 전문가와 순서를 설계하는 것이 좋습니다.',
  },
  {
    question: '증여세 신고는 언제 어떻게 하나요?',
    answer:
      '증여를 받은 달의 말일부터 3개월 이내에 홈택스 또는 관할 세무서에 증여세를 신고해야 합니다. 공제 후 낼 세금이 0원이라도 공제를 적용받으려면 반드시 신고해야 합니다. 신고 기한 내에 자진 신고하면 산출세액의 3% 신고세액공제도 받을 수 있습니다.',
  },
];

export default function MarriageChildbirthGiftDeduction2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '혼인·출산 증여재산공제 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '혼인·출산 증여재산공제 2026, 최대 1억원 절세 요건 총정리',
    description:
      '결혼·출산 시 직계존속 증여 최대 1억원 추가 공제. 상증법 §53의2 혼인·출산 증여재산공제의 요건, 통합 1억 한도, 일반공제 5천만원 합산 절세를 사례로 정리.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['혼인 증여재산공제', '출산 증여재산공제', '증여세', '증여재산공제', '상증법 53조의2'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '혼인·출산 증여재산공제 2026',
    description:
      '결혼·출산 때 직계존속 증여 최대 1억원 추가 공제하는 혼인·출산 증여재산공제의 요건과 절세법.',
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
                    { name: '혼인·출산 증여재산공제 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">신혼부부·부모 · 8분 읽기 · 2026-07-15</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  혼인·출산 증여재산공제 2026
                  <br />
                  <span className="text-2xl text-text-secondary">결혼·출산 때 최대 1억원 무증여세</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  결혼이나 출산을 앞두고 부모님이 목돈을 보태주는 경우, 자칫 증여세 폭탄을 맞을까 걱정하는 분이 많습니다. 그런데 2024년부터 시행된 혼인·출산 증여재산공제를 활용하면 기존 공제와 합쳐 최대 1억 5천만원까지 세금 없이 물려받을 수 있습니다. 이 가이드는 상증법 §53의2에 따른 공제 요건, 통합 1억원 한도, 그리고 실제 절세 사례를 정리합니다.
                </p>
              </header>

              <AdSlot slot="guide-marriage-childbirth-gift-deduction-top" format="horizontal" />

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">혼인·출산 증여재산공제란 무엇인가요?</h2>
                <p>
                  혼인·출산 증여재산공제는 직계존속에게서 결혼·출산을 계기로 재산을 증여받을 때 최대 1억원을 추가로 공제해 주는 제도입니다(상증법 §53의2). 저출산 대응을 위해 2024년 1월 1일 증여분부터 시행됐습니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">핵심 요약</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    · 공제 대상: 직계존속(부모·조부모 등)으로부터 받는 증여
                    <br />
                    · 추가 공제액: 혼인·출산 합산 최대 1억원
                    <br />
                    · 기존 일반공제 5천만원과 별도 적용 가능 (합계 1억 5천만원)
                    <br />
                    · 근거: 상속세 및 증여세법 §53의2
                  </p>
                </div>
                <p className="mt-4">
                  기존에도 성년 자녀는 부모에게서 10년간 5천만원까지 증여세 없이 받을 수 있었습니다(상증법 §53). 혼인·출산 공제는 여기에 얹어지는 특례이므로, 두 공제를 합하면 실질적으로 1억 5천만원까지 무증여세 증여가 가능합니다.
                </p>
                <p className="mt-4">
                  ⚠️ 다만 1억원 한도는 재산을 받는 사람(수증자) 한 명 기준이며, 부모·조부모 등 모든 직계존속에게서 받은 금액을 합산해 계산합니다. 아버지에게 1억, 할아버지에게 1억을 따로 받아 2억을 공제받는 구조는 성립하지 않습니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">공제 요건은 어떻게 되나요?</h2>
                <p>
                  혼인공제와 출산공제는 적용 기간과 요건이 조금씩 다릅니다. 아래 표로 정리했습니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 혼인·출산 증여재산공제 요건 (상증법 §53의2)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">구분</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">혼인 공제</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">출산 공제</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">증여자</td>
                        <td className="p-3">직계존속</td>
                        <td className="p-3">직계존속</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">적용 기간</td>
                        <td className="p-3">혼인신고일 전후 각 2년 (총 4년)</td>
                        <td className="p-3">출생일·입양신고일부터 2년 이내</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">공제 한도</td>
                        <td className="p-3" colSpan={2}><strong>혼인·출산 합산 최대 1억원</strong></td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">적용 시점</td>
                        <td className="p-3" colSpan={2}>2024년 1월 1일 이후 증여분</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  혼인공제는 혼인신고를 기준으로 앞뒤 2년씩, 즉 총 4년의 넉넉한 기간을 인정합니다. 결혼식보다 혼인신고일이 기준이라는 점에 유의하세요.
                </p>
                <p className="mt-4">
                  ⚠️ 다만 증여일이 2024년 1월 1일보다 앞서면 공제 대상이 아닙니다. 2023년에 결혼하며 받은 증여는 이 특례를 적용받을 수 없습니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">실제로 얼마를 아낄 수 있나요?</h2>
                <p>
                  다음 사례로 절세 효과를 확인해 보겠습니다. 증여세율은 과세표준 1억원 이하 10%, 5억원 이하 구간은 20%(누진공제 1천만원)입니다(상증법 §56, 세율표는 §26 준용).
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 1. 성년 자녀가 결혼하며 부모에게 1.5억 증여받음</p>
                  <p className="text-sm text-text-secondary">
                    · 일반 증여재산공제: 5천만원 (성년 직계비속, 10년 통산)
                    <br />
                    · 혼인 증여재산공제: 1억원
                    <br />
                    · 공제 합계: 1억 5천만원
                    <br />
                    · 과세표준: 1.5억 빼기 1.5억 = 0원
                    <br />
                    · 납부 증여세: <strong>0원</strong>
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 1.5억 전액이 공제 범위 안이라 증여세가 없습니다.</span>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 2. 결혼하며 부모에게 2억 증여받음</p>
                  <p className="text-sm text-text-secondary">
                    · 공제 합계: 5천만원 더하기 1억 = 1억 5천만원
                    <br />
                    · 과세표준: 2억 빼기 1.5억 = 5천만원
                    <br />
                    · 산출세액: 5천만 곱하기 10% = 500만원
                    <br />
                    · 신고세액공제 3%: 15만원 차감
                    <br />
                    · 납부 증여세: 약 <strong>485만원</strong>
                    <br />
                    <span className="text-xs text-text-tertiary">공제를 활용하지 않았다면 과세표준 1.5억으로 약 2천만원을 냈어야 하므로, 약 1,500만원을 아낀 셈입니다.</span>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 3. 결혼 때 혼인공제 1억 모두 사용, 이후 출산</p>
                  <p className="text-sm text-text-secondary">
                    · 결혼 시점: 혼인공제 1억원 전액 사용
                    <br />
                    · 출산 시점: 통합 한도 1억원을 이미 소진 → 출산공제 추가 여력 0원
                    <br />
                    · 출산 때 추가 증여분은 일반공제 잔액 범위에서만 비과세
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 혼인과 출산 공제는 합쳐서 1억이 한도이므로, 시점을 나눠 쓰려면 미리 배분 계획이 필요합니다.</span>
                  </p>
                </div>
              </section>

              <AdSlot slot="guide-marriage-childbirth-gift-deduction-mid" format="rectangle" />

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">신고는 꼭 해야 하나요?</h2>
                <p>
                  공제를 적용받아 낼 세금이 0원이더라도 증여세 신고는 반드시 해야 합니다. 신고를 통해 공제 적용 사실을 남겨두어야 나중에 자금 출처 조사 등에서 소명이 수월합니다.
                </p>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li>
                    <strong>신고 기한:</strong> 증여받은 달의 말일부터 3개월 이내
                  </li>
                  <li>
                    <strong>신고 방법:</strong> 홈택스(hometax.go.kr) 전자신고 또는 관할 세무서 방문
                  </li>
                  <li>
                    <strong>신고세액공제:</strong> 기한 내 자진 신고 시 산출세액의 3% 공제
                  </li>
                  <li>
                    <strong>증빙:</strong> 가족관계증명서, 혼인관계증명서 또는 출생·입양 관련 서류
                  </li>
                </ul>
                <p className="mt-4">
                  ⚠️ 다만 공제 후 세액이 0원이라고 신고를 생략하면, 훗날 부동산 취득 등 자금 출처 소명이 필요할 때 증여받은 사실을 입증하기 어려워질 수 있습니다. 반드시 신고를 남겨두세요.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">주의해야 할 함정은 무엇인가요?</h2>
                <p>
                  혼인·출산 증여재산공제를 활용할 때 흔히 놓치는 점들이 있습니다.
                </p>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li>
                    <strong>통합 한도 오해:</strong> 혼인 1억과 출산 1억을 각각 받을 수 있다고 오해하기 쉽지만, 두 공제는 합쳐서 1억원이 한도입니다.
                  </li>
                  <li>
                    <strong>수증자 기준:</strong> 한 사람이 여러 직계존속에게서 받아도 공제는 그 사람 기준 1억원까지입니다.
                  </li>
                  <li>
                    <strong>10년 합산 규칙:</strong> 일반 증여재산공제 5천만원은 동일인(직계존속)에게서 10년간 받은 금액을 합산해 적용합니다. 과거 증여가 있었다면 잔여 한도만 남습니다.
                  </li>
                  <li>
                    <strong>파혼 시 반환 기한:</strong> 혼인이 성립하지 않아 재산을 돌려줄 때는 증여일이 속한 달 말일부터 3개월 이내에 반환해야 증여가 없던 것으로 처리됩니다.
                  </li>
                </ul>
                <p className="mt-4">
                  ⚠️ 다만 개별 사정에 따라 적용 여부가 달라질 수 있으므로, 고액 증여나 부동산 증여를 계획한다면 국세청 상담 또는 세무사 검토를 거치는 것이 안전합니다.
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
                    <p className="mt-1 text-sm text-text-secondary">증여액·공제를 입력해 실제 증여세를 계산해보세요.</p>
                  </Link>
                  <Link
                    href="/guide/gift-tax-exemption-limit-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">증여세 면제한도 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">배우자·자녀·부모별 10년 공제 한도를 정리했습니다.</p>
                  </Link>
                  <Link
                    href="/guide/gift-tax-calculation-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">증여세 계산법 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">세율·누진공제·신고 절차의 기본을 배우세요.</p>
                  </Link>
                  <Link
                    href="/guide/family-loan-agreement-gift-tax-avoidance/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">가족 간 차용증과 증여세</div>
                    <p className="mt-1 text-sm text-text-secondary">빌려준 돈이 증여로 간주되지 않으려면 어떻게 할까요.</p>
                  </Link>
                  <Link
                    href="/guide/child-house-gift-vs-sale-comparison/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">자녀에게 집 증여 vs 매매</div>
                    <p className="mt-1 text-sm text-text-secondary">주택을 물려줄 때 어느 쪽이 유리한지 비교합니다.</p>
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
                  <strong>면책조항:</strong> 본 가이드는 교육 목적으로 작성되었으며, 개인 맞춤형 세무 조언이 아닙니다. 혼인·출산 증여재산공제의 실제 적용 여부, 공제 한도, 납부세액은 개별 증여 시점과 과거 증여 이력에 따라 달라지므로 홈택스 또는 세무 전문가에게 반드시 확인하세요. 본 콘텐츠는 2026-07-15 기준으로 작성되었으며, 세법 개정 시 업데이트됩니다. 인용 법조항은 <strong>상속세 및 증여세법 §53(증여재산 공제), §53의2(혼인·출산 증여재산 공제), §56(증여세 세율, §26 세율표 준용)</strong>입니다. AI 보조 작성 후 운영자 검수 완료.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터</a>,{' '}
                  <a href="https://www.nts.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">국세청</a>,{' '}
                  <a href="https://hometax.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">홈택스</a>.
                </p>
              </section>

              <ShareButtons
                title="혼인·출산 증여재산공제 2026 가이드"
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
