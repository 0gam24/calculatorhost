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

const URL = 'https://calculatorhost.com/guide/inheritance-tax-annuity-payment-collateral-2026/';
const DATE_PUBLISHED = '2026-09-15';
const DATE_MODIFIED = '2026-09-15';

export const metadata: Metadata = {
  title: '상속세 연부연납 기간과 담보 요건 2026, 몇 년까지 나눌까',
  description:
    '상속세 납부세액이 2천만원을 넘으면 담보를 제공하고 최대 10년, 가업상속재산은 최대 20년까지 나눠 낼 수 있습니다. 담보로 인정되는 것과 안 되는 것, 가산율까지 상속세및증여세법 §71 기준으로 정리했습니다.',
  keywords: [
    '상속세 연부연납',
    '연부연납 기간',
    '연부연납 담보',
    '가업상속재산 연부연납',
    '상속세 담보 종류',
    '연부연납 가산율',
    '상속세및증여세법 71조',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '상속세 연부연납 기간과 담보 요건 2026, 몇 년까지 나눌까' }],
    title: '상속세 연부연납 기간과 담보 요건 2026',
    description: '납부세액 2천만원 초과 시 담보 제공하고 최대 10년, 가업상속재산은 최대 20년. 담보 종류와 가산율까지 정리.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '상속세 연부연납 기간과 담보 요건 2026',
    description: '최대 10년(가업상속재산 20년), 담보 4종, 가산율까지 상속세및증여세법 §71 기준 정리.',
  },
};

const FAQ_ITEMS = [
  {
    question: '상속세 연부연납은 얼마부터 신청할 수 있나요?',
    answer:
      '납부할 상속세액이 2천만원을 초과해야 신청할 수 있습니다(상속세및증여세법 §71①). 다만 세액을 원하는 만큼 잘게 나눌 수 있는 것은 아니고, 매 회분 분납세액이 1천만원을 넘도록 기간을 정해야 합니다. 세액이 2천만원을 살짝 넘는 수준이라면 회분 조건 때문에 실제로 허용되는 기간이 짧아질 수 있습니다.',
  },
  {
    question: '연부연납은 최대 몇 년까지 되나요?',
    answer:
      '일반 상속재산은 허가일부터 최대 10년까지 나눠 낼 수 있습니다(상속세및증여세법 §71②1호나목). 가업상속공제를 받았거나 중소·중견기업을 상속받은 경우에는 최대 20년, 또는 허가 후 10년이 될 때까지 거치했다가 다시 10년에 걸쳐 나눠 내는 방식도 선택할 수 있습니다(§71②1호가목).',
  },
  {
    question: '담보로 아파트나 토지를 제공할 수 있나요?',
    answer:
      '연부연납 담보로는 부동산을 제공할 수 없는 것이 원칙입니다. 국세징수법 §18①이 정한 납세담보 6종 가운데 연부연납에는 금전, 유가증권, 납세보증보험증권, 은행 등의 납세보증서 4종만 인정되며, 토지·건물 같은 부동산 담보는 제외되기 때문입니다.',
  },
  {
    question: '납세보증보험증권이 뭔가요?',
    answer:
      '보험회사가 상속인을 대신해 세금 납부를 보증하는 보험 상품입니다. 담보로 제공하는 보증보험증권은 연부연납 기간을 충분히 커버하는 보험기간을 갖춰야 하며, 실무에서는 부동산이나 예금을 담보로 잡기 어려울 때 가장 널리 쓰이는 방법입니다.',
  },
  {
    question: '연부연납을 하면 이자를 내야 하나요?',
    answer:
      '네, 나눠 내는 기간 동안 연부연납가산금이라는 이자 성격의 금액이 원금과 함께 부과됩니다. 가산율은 시중은행 정기예금 금리 등을 반영해 정기적으로 조정되며 고정되어 있지 않으므로, 신청 전 국세청에서 현재 가산율을 다시 확인해야 합니다.',
  },
  {
    question: '가업상속재산 20년과 10년 거치 후 10년, 뭐가 유리한가요?',
    answer:
      '상속받은 사업의 초기 자금 사정에 따라 다릅니다. 20년 균등분할은 매년 부담이 고르게 나뉘지만, 10년 거치 후 10년은 사업 안정기까지 원금 납부를 미루고 거치기간에는 가산금만 낼 수 있어 초기 현금흐름이 빠듯한 경우에 유리할 수 있습니다. 다만 거치기간이 길수록 총 가산금 부담은 늘어날 수 있습니다.',
  },
  {
    question: '연부연납 신청서는 언제 제출해야 하나요?',
    answer:
      '상속세 신고기한 안에, 또는 세무서로부터 납부고지서를 받은 경우에는 그 납부기한 안에 연부연납 허가신청서를 관할 세무서에 제출해야 합니다. 신청서에는 담보 제공 서류가 함께 첨부되어야 하며, 세무서장의 심사와 허가를 받아야 최종 확정됩니다.',
  },
];

export default function InheritanceTaxAnnuityPaymentCollateral2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '상속세 연부연납 기간과 담보 요건 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '상속세 연부연납 기간과 담보 요건 2026, 몇 년까지 나눌까',
    description:
      '상속세 연부연납 신청 요건(2천만원 초과), 일반 상속재산 10년·가업상속재산 20년 기간, 담보 4종 요건, 가산율까지 상속세및증여세법 §71·국세징수법 §18 기준으로 정리.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['상속세 연부연납', '연부연납 기간', '연부연납 담보', '가업상속재산', '상속세및증여세법 71조'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '상속세 연부연납 기간과 담보 요건 2026',
    description:
      '상속세 연부연납의 신청 요건, 기간(일반 10년·가업상속재산 20년), 담보 종류, 가산율을 정리한 가이드.',
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
                    { name: '상속세 연부연납 기간과 담보 요건 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">상속인 · 8분 읽기 · 2026-09-15</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  상속세 연부연납 기간과 담보 요건 2026
                  <br />
                  <span className="text-2xl text-text-secondary">· 몇 년까지 나눌까</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  상속세 납부세액이 크면 한 번에 내기 벅찰 수 있습니다. 연부연납은 담보를 제공하고 세금을 여러 해에 걸쳐 나눠 내는 제도로, 일반 상속재산은 최대 10년, 가업상속재산은 최대 20년까지 가능합니다. 이 가이드는 연부연납의 신청 요건, 기간별 계산 방식, 담보로 인정되는 것과 안 되는 것, 가산율(이자)까지 실제 사례로 정리합니다. 대상 독자는 상속세 납부세액이 커서 나눠 내는 방법을 찾는 상속인입니다.
                </p>
              </header>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">상속세 연부연납이란 무엇인가요?</h2>
                <p>
                  연부연납은 관할 세무서에 담보를 제공하고 상속세를 여러 해에 걸쳐 나눠 내는 제도입니다(상속세및증여세법 §71). 세액을 한 번에 마련하기 어려운 상속인이 부동산 등 상속재산을 급하게 처분하지 않고도 세금을 납부할 수 있도록 만든 장치입니다.
                </p>
                <p>
                  앞서 소개한 분납이 최대 2개월 안에 짧게 나눠 내는 것이라면, 연부연납은 담보를 전제로 훨씬 긴 기간(최대 10~20년)에 걸쳐 나눠 낸다는 점이 다릅니다. 대신 나눠 내는 기간만큼 이자 성격의 가산금이 함께 붙습니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">30초 요약</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    요건: 납부세액 2천만원 초과 + 담보 제공(상속세및증여세법 §71①).
                    <br />
                    기간: 일반 상속재산 최대 10년, 가업상속재산 최대 20년(또는 10년 거치 후 10년).
                    <br />
                    담보: 금전·유가증권·납세보증보험증권·납세보증서 4종만 인정, 부동산은 불가.
                    <br />
                    비용: 나눠 내는 기간 동안 연부연납가산금(이자 성격) 별도 부과.
                  </p>
                </div>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">연부연납은 얼마부터, 어떤 요건으로 신청할 수 있나요?</h2>
                <p>
                  납부할 상속세액이 2천만원을 초과해야 연부연납을 신청할 수 있습니다(상속세및증여세법 §71①). 2천만원 이하라면 연부연납 대상이 아니고, 대신 1천만원 초과 시 이용할 수 있는 분납(최대 2개월)만 가능합니다.
                </p>
                <p>
                  또 하나의 조건은 각 회분의 분할납부세액이 1천만원을 넘어야 한다는 것입니다. 즉 전체 세액을 신청 기간(연부연납기간+1회) 수만큼 나눴을 때, 매 회분 금액이 1천만원을 넘도록 기간을 정해야 합니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 1. 세액이 2천만원을 살짝 넘는 경우</p>
                  <p className="text-sm text-text-secondary">
                    · 납부세액 2,001만원 (2천만원 초과 요건은 충족)
                    <br />
                    · 회분 조건: 전체 회차 수(신청 기간+1)로 나눈 금액이 1천만원을 넘어야 함
                    <br />
                    · 결과: 2,001만원을 3회로 나누면 회당 약 667만원으로 1천만원에 못 미쳐 불가, 2회(약 1,001만원씩)까지만 가능
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 세액이 2천만원을 겨우 넘는 수준이면 10년 연부연납이 명목상 가능해도 회분 조건 때문에 실제 기간은 1~2년으로 짧아집니다.</span>
                  </p>
                </div>
                <p className="mt-4">
                  다만, 세액이 커질수록 이 회분 조건에 걸릴 가능성은 줄어듭니다. 세액이 1억원이면 10년(11회) 균등분할 시 회당 약 909만원으로 오히려 1천만원에 못 미쳐 10년 전체를 채우지 못할 수 있으므로, 신청 전 회당 금액을 먼저 계산해 보는 것이 안전합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">연부연납 기간은 몇 년까지인가요?</h2>
                <p>
                  상속받은 재산의 종류에 따라 기간이 다릅니다. 일반 상속재산은 연부연납 허가일부터 최대 10년까지이고(상속세및증여세법 §71②1호나목), 가업상속공제를 받았거나 중소·중견기업을 상속받은 경우에는 최대 20년, 또는 허가 후 10년이 되는 날부터 다시 10년에 걸쳐 나눠 내는 방식 중 선택할 수 있습니다(§71②1호가목).
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 상속재산 유형별 연부연납 기간 (상속세및증여세법 §71①·§71②1호)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">구분</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">공통 요건</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">최대 연부연납 기간</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">일반 상속재산</td>
                        <td className="p-3">납부세액 2천만원 초과 + 담보 제공</td>
                        <td className="p-3">허가일부터 10년</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">가업상속재산</td>
                        <td className="p-3">납부세액 2천만원 초과 + 담보 제공 + 가업요건 충족</td>
                        <td className="p-3">허가일부터 20년, 또는 10년 거치 후 10년</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 2. 일반 상속재산 3억 6천만원 세액을 10년 연부연납하는 경우</p>
                  <p className="text-sm text-text-secondary">
                    · 매년 낼 원금 = 세액 ÷ (연부연납기간 + 1) = 3억 6천만원 ÷ 11 ≈ 3,273만원
                    <br />
                    · 첫 회분: 신고기한(또는 고지 납부기한) 안에 약 3,273만원 납부
                    <br />
                    · 이후 매년: 남은 잔액에 가산율을 적용한 연부연납가산금이 원금에 더해져 부과
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 회당 원금은 균등하지만, 가산금은 잔액이 줄어들수록 함께 줄어드는 구조입니다. 정확한 회차별 고지 금액은 관할 세무서 통지서를 기준으로 확인해야 합니다.</span>
                  </p>
                </div>
                <p className="mt-4">
                  다만, 가업상속재산이라고 해서 무조건 20년이 유리한 것은 아닙니다. 기간이 길어질수록 총 가산금 부담도 함께 늘어나므로, 사업의 자금 계획과 가산율 추이를 함께 검토해야 합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">담보는 무엇으로 제공해야 하나요?</h2>
                <p>
                  연부연납에는 국세징수법 §18①이 정한 납세담보 가운데 금전, 유가증권, 납세보증보험증권, 은행 등의 납세보증서 4종만 인정됩니다. 토지나 건물 같은 부동산은 국세징수법상 납세담보의 한 종류이지만, 연부연납에는 인정되는 4종에 포함되지 않습니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 2. 연부연납 담보 인정 여부 (국세징수법 §18①)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">담보 종류</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">연부연납 인정 여부</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">비고</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">금전</td>
                        <td className="p-3">가능</td>
                        <td className="p-3">현금 예치</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">국채 등 유가증권</td>
                        <td className="p-3">가능</td>
                        <td className="p-3">대통령령으로 정하는 범위</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">납세보증보험증권</td>
                        <td className="p-3">가능</td>
                        <td className="p-3">실무상 가장 많이 활용</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">은행 등의 납세보증서</td>
                        <td className="p-3">가능</td>
                        <td className="p-3">은행·신용보증기금 등 발급</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">토지 / 건물·공장재단 등</td>
                        <td className="p-3">불가</td>
                        <td className="p-3">일반 납세담보에는 포함되나 연부연납 제외</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  다만, 금전·유가증권·납세보증보험증권·납세보증서를 담보로 제공하면 별도 재산 감정 절차 없이 비교적 신속하게 처리되는 경우가 많습니다. 부동산 위주로 상속받아 현금성 담보 마련이 어렵다면, 미리 보증보험사와 보험 가능 여부를 상담해 두는 것이 좋습니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">연부연납 가산율(이자)은 얼마인가요?</h2>
                <p>
                  나눠 내는 기간 동안 원금과 별도로 연부연납가산금이 부과됩니다. 이 가산금은 시중은행 정기예금 평균 수신금리 등을 반영해 정기적으로 고시되는 가산율을 적용해 계산합니다.
                </p>
                <p>
                  가산율은 국세환급가산금 이자율과 연동되어 매년 조정될 수 있으므로, 이 글에 적힌 수치를 그대로 적용하지 말고 신청 시점에 국세청에서 현재 고시된 가산율을 다시 확인해야 합니다. 첫 회분 가산금은 연부연납 허가 총세액에 신고기한 다음날부터 첫 분납기한까지의 일수와 가산율을 곱해 계산하고, 이후 회차는 그때까지 남은 잔액을 기준으로 다시 계산됩니다.
                </p>
                <p className="mt-4">
                  다만, 가산율이 낮아지는 시기에 연부연납을 신청했더라도 향후 가산율이 오르면 다음 회차부터는 그 시점의 가산율이 적용됩니다. 즉 신청 당시의 가산율이 전체 기간에 고정되는 것이 아니라, 회차마다 그 시점의 고시 가산율을 적용받는 구조입니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">연부연납 신청은 어떻게 하나요?</h2>
                <p>
                  상속세 신고기한 안에, 또는 세무서의 납부고지서를 받은 경우에는 그 납부기한 안에 연부연납 허가신청서를 관할 세무서에 제출해야 합니다. 신청서에는 담보 제공 서류를 함께 첨부해야 합니다.
                </p>
                <ul className="space-y-3 ml-6 list-decimal text-text-secondary">
                  <li>
                    <strong>세액 확정:</strong> 상속세 신고를 통해 납부할 세액을 확정하고, 2천만원을 초과하는지 확인합니다.
                  </li>
                  <li>
                    <strong>기간·회차 설계:</strong> 회분 세액이 1천만원을 넘도록 연부연납기간을 정합니다.
                  </li>
                  <li>
                    <strong>담보 준비:</strong> 금전·유가증권·납세보증보험증권·납세보증서 중 하나를 준비합니다.
                  </li>
                  <li>
                    <strong>신청서 제출:</strong> 담보 제공 서류와 함께 관할 세무서에 연부연납 허가신청서를 제출합니다.
                  </li>
                  <li>
                    <strong>세무서 심사·허가:</strong> 세무서장이 세액·담보 적정성을 심사한 뒤 허가 여부를 결정합니다.
                  </li>
                </ul>
                <p className="mt-4">
                  다만, 신청서를 냈다고 자동으로 확정되는 것은 아닙니다. 담보가치가 부족하거나 서류가 미비하면 세무서가 보완을 요구하거나 허가하지 않을 수 있으므로, 신고기한에 임박해 신청하기보다 미리 담보를 준비해 두는 것이 안전합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">연부연납 허가가 취소되거나 거부될 수도 있나요?</h2>
                <p>
                  네, 연부연납을 허가받았더라도 이후 사정에 따라 취소될 수 있습니다. 담보로 제공한 재산의 가치가 크게 떨어지거나, 회차별 세액과 가산금을 기한 안에 내지 않는 등 연부연납의 전제가 무너지면 세무서가 나머지 세액 전부를 한꺼번에 고지할 수 있습니다.
                </p>
                <p>
                  이 경우 남은 세액이 일시에 청구되고 가산세까지 더해질 수 있어 부담이 커집니다. 연부연납을 신청했다면 회차별 납부기한을 놓치지 않도록 일정을 미리 관리하는 것이 중요합니다.
                </p>
                <p className="mt-4">
                  다만, 담보를 다른 것으로 바꾸거나 추가로 제공해 담보가치 부족분을 보완하면 연부연납을 계속 유지할 수 있는 경우도 있습니다. 담보가치 하락을 미리 인지했다면 취소 통보를 받기 전에 세무서와 담보 변경을 협의하는 것이 바람직합니다.
                </p>
              </section>

              <h2 className="text-2xl font-bold mb-6">자주 묻는 질문</h2>
              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h3 className="text-lg font-semibold text-text-primary">관련 계산기 및 가이드</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link
                    href="/guide/inheritance-tax-filing-payment-installment-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">상속세 신고기한과 분납·물납</div>
                    <p className="mt-1 text-sm text-text-secondary">6개월 신고기한, 1천만원 초과 분납 요건까지 함께 정리.</p>
                  </Link>
                  <Link
                    href="/guide/inheritance-tax-calculation-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">상속세 계산법 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">연부연납 대상이 되는 세액을 먼저 계산해 보세요.</p>
                  </Link>
                  <Link
                    href="/guide/family-business-inheritance-deduction-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">가업상속공제 요건</div>
                    <p className="mt-1 text-sm text-text-secondary">20년 연부연납의 전제가 되는 가업상속공제 요건 확인.</p>
                  </Link>
                  <Link
                    href="/guide/inheritance-tax-deduction-limit-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">상속세 공제 한도</div>
                    <p className="mt-1 text-sm text-text-secondary">각종 공제를 적용한 뒤 실제 납부세액을 가늠해 보세요.</p>
                  </Link>
                  <Link
                    href="/calculator/inheritance-tax/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">상속세 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">상속재산을 입력해 예상 납부세액을 계산해보세요.</p>
                  </Link>
                  <Link
                    href="/calculator/gift-tax/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">증여세 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">증여세도 2천만원 초과 시 연부연납(최대 5년)이 가능합니다.</p>
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
                  <strong>면책조항:</strong> 이 글은 AI 보조로 자동 생성되어 자동 품질 게이트를 통과한 뒤 발행되었습니다. 발행 시점에 사람의 사전 검수는 없었으며, 운영자가 사후 점검합니다. 연부연납의 실제 허가 여부, 담보 인정 범위, 가산율은 신청 시점과 개별 사안에 따라 달라지므로, 반드시 관할 세무서 또는 세무사와 확인하세요. 본 콘텐츠는 2026-09-15 기준이며, 인용 법조항은 상속세및증여세법 <strong>§71(연부연납)</strong>, 국세징수법 <strong>§18(납세담보의 종류)</strong>입니다.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터</a>,{' '}
                  <a href="https://www.nts.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">국세청</a>,{' '}
                  <a href="https://www.hometax.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">홈택스</a>.
                </p>
              </section>

              <ShareButtons
                title="상속세 연부연납 기간과 담보 요건 2026 가이드"
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
