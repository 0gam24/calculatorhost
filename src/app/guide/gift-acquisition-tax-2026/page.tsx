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

const URL = 'https://calculatorhost.com/guide/gift-acquisition-tax-2026/';
const DATE_PUBLISHED = '2026-07-26';
const DATE_MODIFIED = '2026-07-26';
// 북극성 수익 레버: [revenue-lever: indexing+traffic] (신규 색인 표면 + 증여 취득세 검색 의도 흡수)

export const metadata: Metadata = {
  title: '증여 취득세 2026, 아파트 증여 3.5%와 다주택 12% 중과',
  description:
    '부모가 자녀에게 아파트를 증여하면 증여세와 별개로 취득세를 냅니다. 무상취득 기본세율 3.5%, 지방교육세·농특세 포함 총세율, 조정대상지역 다주택 12% 중과와 예외를 지방세법 §11 기준으로 정리했습니다.',
  keywords: [
    '증여 취득세',
    '아파트 증여 세금',
    '무상취득 취득세',
    '증여 취득세율 3.5',
    '조정대상지역 증여 12%',
    '증여 취득세 계산',
    '지방세법 11조',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '증여 취득세 2026, 아파트 증여 3.5%와 다주택 12% 중과' }],
    title: '증여 취득세 2026, 무상취득 3.5%부터 다주택 12% 중과까지',
    description: '증여받은 사람이 내는 취득세. 시가인정액 기준 3.5%, 조정대상지역 공시가 3억 이상 다주택 증여 시 12% 중과.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '증여 취득세 2026, 3.5%와 다주택 12% 중과',
    description: '증여세와 별개로 내는 취득세. 지방세법 §11 무상취득 세율과 §13의2 중과 정리.',
  },
};

const FAQ_ITEMS = [
  {
    question: '증여받으면 증여세만 내면 되나요?',
    answer:
      '아닙니다. 증여세와 취득세는 별개의 세금으로 둘 다 내야 합니다. 증여세는 재산을 무상으로 받은 데 대한 국세이고, 취득세는 부동산 소유권을 취득한 데 대한 지방세입니다. 예를 들어 5억원 아파트를 배우자에게 증여하면 6억원 배우자 공제로 증여세는 0원이어도, 취득세(본세 3.5%)는 그대로 부과됩니다.',
  },
  {
    question: '증여 취득세율은 몇 퍼센트인가요?',
    answer:
      '주택 무상취득(증여)의 기본 취득세율은 3.5%입니다(지방세법 §11①2호). 여기에 지방교육세 0.3%가 더해져 통상 3.8%이고, 전용면적 85㎡를 초과하면 농어촌특별세 0.2%가 추가되어 4.0%가 됩니다. 다만 조정대상지역 다주택 증여는 12%로 중과될 수 있습니다.',
  },
  {
    question: '과세표준은 무엇으로 정하나요?',
    answer:
      '2023년부터 증여 취득세 과세표준은 시가인정액입니다(지방세법 §10의2). 시가인정액이란 취득일 전후 일정 기간의 매매사례가액, 감정가액, 공매가액 등 시가로 인정되는 금액을 말합니다. 시가인정액을 확인하기 어려운 일부 경우에만 시가표준액(공시가격)을 씁니다.',
  },
  {
    question: '조정대상지역 아파트를 증여하면 무조건 12%인가요?',
    answer:
      '아닙니다. 12% 중과는 세 조건을 모두 만족할 때만 적용됩니다(지방세법 §13의2). 첫째 증여 대상 주택이 조정대상지역에 있을 것, 둘째 시가표준액(공시가격)이 3억원 이상일 것, 셋째 증여자가 다주택자일 것입니다. 하나라도 벗어나면 기본세율 3.5%가 적용됩니다.',
  },
  {
    question: '1세대 1주택자가 자녀에게 증여해도 12% 중과인가요?',
    answer:
      '아닙니다. 1세대 1주택자가 보유한 주택을 배우자 또는 직계존비속에게 증여하는 경우에는 조정대상지역·공시가 3억 이상에 해당해도 12% 중과에서 제외되어 기본세율 3.5%가 적용됩니다(지방세법 §13의2 단서). 다주택자의 증여에만 중과가 적용되는 구조입니다.',
  },
  {
    question: '취득세는 증여받은 사람이 내나요, 증여한 사람이 내나요?',
    answer:
      '취득세는 부동산을 취득한 사람, 즉 증여받은 수증자가 냅니다. 만약 증여한 사람이 취득세까지 대신 내주면 그 세금 상당액도 추가로 증여한 것으로 보아 증여세가 더 늘어날 수 있으므로 주의해야 합니다.',
  },
  {
    question: '증여 취득세는 언제까지 신고·납부하나요?',
    answer:
      '증여로 인한 취득은 취득일이 속하는 달의 말일부터 3개월 이내에 신고·납부해야 합니다(지방세법 §20). 기한을 넘기면 무신고가산세(20%)와 납부지연가산세가 부과되므로, 증여계약과 등기 절차를 진행하면서 취득세 신고 일정을 함께 챙겨야 합니다.',
  },
  {
    question: '지분 일부만 증여하면 취득세도 줄어드나요?',
    answer:
      '네, 증여한 지분에 해당하는 과세표준에만 취득세가 부과됩니다. 예를 들어 5억원 아파트의 50% 지분만 증여하면 과세표준은 2.5억원이 되어 취득세도 그만큼 줄어듭니다. 다만 등기 절차와 비용은 별도로 들고, 나중에 나머지 지분을 증여할 때 다시 취득세가 발생합니다.',
  },
];

export default function GiftAcquisitionTax2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '증여 취득세 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '증여 취득세 2026, 아파트 증여 3.5%와 다주택 12% 중과',
    description:
      '증여받은 부동산에 붙는 취득세. 무상취득 기본세율 3.5%, 지방교육세·농특세 포함 총세율, 조정대상지역 다주택 12% 중과와 1세대1주택 예외까지 계산 사례로 정리.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['증여 취득세', '무상취득', '3.5%', '조정대상지역', '다주택 중과'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '증여 취득세 2026',
    description: '증여받은 부동산에 붙는 취득세의 세율, 과세표준, 중과 요건을 정리한 가이드.',
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
                    { name: '증여 취득세 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">부동산 증여 당사자 · 8분 읽기 · 2026-07-26</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  증여 취득세 2026
                  <br />
                  <span className="text-2xl text-text-secondary">아파트 증여 3.5%와 다주택 12% 중과</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  부모가 자녀에게, 또는 배우자끼리 아파트를 증여할 때 많은 분이 증여세만 생각하지만, 부동산을 무상으로 취득하면 취득세도 함께 부과됩니다. 이 가이드는 증여 취득세의 기본세율 3.5%가 어떻게 계산되는지, 지방교육세와 농어촌특별세를 더한 총세율은 얼마인지, 그리고 조정대상지역 다주택 증여 시 12% 중과가 언제 적용되는지를 계산 사례와 함께 정리합니다.
                </p>
              </header>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">증여받으면 증여세와 취득세를 모두 내나요?</h2>
                <p>
                  네, 둘 다 냅니다. 증여세는 재산을 무상으로 받은 데 대한 국세이고, 취득세는 부동산 소유권을 넘겨받은 데 대한 지방세입니다. 두 세금은 계산 방식도 납부처도 다릅니다. 증여세는 홈택스와 관할 세무서에, 취득세는 위택스와 관할 시·군·구청에 신고합니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">한눈에 보는 증여 취득세</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    · 누가 내나: 증여받은 사람(수증자)
                    <br />
                    · 과세표준: 시가인정액 (지방세법 §10의2)
                    <br />
                    · 기본세율: 3.5% (지방세법 §11①2호)
                    <br />
                    · 부가세목: 지방교육세 0.3%, 85㎡ 초과 시 농특세 0.2%
                    <br />
                    · 신고기한: 취득일이 속한 달의 말일부터 3개월
                  </p>
                </div>
                <p className="mt-4">
                  다만 배우자 공제(6억원)나 성년 자녀 공제(5천만원)로 증여세가 0원이 나오더라도 취득세는 별도로 부과된다는 점을 놓치기 쉽습니다. 증여를 계획할 때는 취득세까지 총비용에 넣어 계산해야 합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">증여 취득세율은 몇 퍼센트인가요?</h2>
                <p>
                  주택 무상취득의 기본 취득세율은 3.5%입니다. 여기에 부가세목이 더해져 실제 부담률이 결정됩니다. 유상취득(매매)의 1.0~3.0% 세율과는 다르게, 증여는 정률 3.5%가 원칙입니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 주택 증여(무상취득) 취득세 구성 (지방세법 §11·§151, 2026 기준)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">세목</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">세율</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">근거·비고</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">취득세 본세</td>
                        <td className="p-3"><strong>3.5%</strong></td>
                        <td className="p-3">지방세법 §11①2호 (무상취득)</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">지방교육세</td>
                        <td className="p-3">0.3%</td>
                        <td className="p-3">지방세법 §151</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">농어촌특별세</td>
                        <td className="p-3">0.2%</td>
                        <td className="p-3">전용면적 85㎡ 초과 시만</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">합계(85㎡ 이하)</td>
                        <td className="p-3"><strong>3.8%</strong></td>
                        <td className="p-3">국민주택 규모 이하</td>
                      </tr>
                      <tr>
                        <td className="p-3">합계(85㎡ 초과)</td>
                        <td className="p-3"><strong>4.0%</strong></td>
                        <td className="p-3">농특세 포함</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  예외: 위 세율은 일반 증여의 경우입니다. 조정대상지역에 있는 공시가격 3억원 이상 주택을 다주택자가 증여하면 본세가 12%로 중과됩니다. 이 경우 부가세목도 함께 올라가 총부담률이 크게 높아집니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">과세표준은 공시가격인가요, 시세인가요?</h2>
                <p>
                  2023년부터 증여 취득세 과세표준은 시가인정액입니다. 과거에는 공시가격(시가표준액)으로 계산했지만, 현재는 취득일 전후 일정 기간의 매매사례가액·감정가액·공매가액 등 시가로 인정되는 금액을 기준으로 합니다(지방세법 §10의2).
                </p>
                <p className="mt-4">
                  같은 단지 유사 매물이 최근 거래됐다면 그 실거래가가 시가인정액이 됩니다. 실무에서는 감정평가를 받아 시가인정액을 명확히 하기도 합니다. 시가를 확인하기 어려운 일부 경우에만 시가표준액을 예외적으로 사용합니다.
                </p>
                <p className="mt-4">
                  다만 시가인정액 산정은 케이스마다 달라질 수 있으므로, 정확한 과세표준은 관할 시·군·구청 세무과 또는 위택스에서 확인하는 것이 안전합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">조정대상지역 다주택 증여는 왜 12%인가요?</h2>
                <p>
                  투기 목적의 증여를 통한 우회 취득을 막기 위해서입니다. 지방세법 §13의2는 조정대상지역의 일정 요건을 갖춘 주택을 증여로 취득하면 12%의 중과세율을 적용하도록 규정합니다. 다만 이 중과는 세 조건을 모두 만족할 때만 작동합니다.
                </p>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li>
                    <strong>조정대상지역 소재:</strong> 증여 대상 주택이 조정대상지역 안에 있어야 합니다. 비조정지역이면 중과되지 않습니다.
                  </li>
                  <li>
                    <strong>공시가격 3억원 이상:</strong> 해당 주택의 시가표준액(공시가격)이 3억원 이상이어야 합니다. 3억원 미만이면 기본세율 3.5%입니다.
                  </li>
                  <li>
                    <strong>증여자가 다주택자:</strong> 1세대 1주택자가 배우자·직계존비속에게 증여하는 경우는 중과에서 제외됩니다.
                  </li>
                </ul>
                <p className="mt-4">
                  예외: 조정대상지역은 정부 정책에 따라 지정·해제가 바뀝니다. 증여 시점에 해당 주택이 조정대상지역인지 반드시 확인해야 하며, 지역 지정 여부는 국토교통부 공고를 기준으로 판단합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">증여 취득세 계산 사례</h2>
                <p>
                  다음 세 가지 사례로 실제 세액이 어떻게 달라지는지 살펴보겠습니다. 모든 사례는 시가인정액을 기준으로 계산합니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 1. 성년 자녀에게 5억원 아파트 증여 (85㎡ 이하, 비조정)</p>
                  <p className="text-sm text-text-secondary">
                    · 시가인정액(과세표준): 5억원
                    <br />
                    · 취득세 본세: 5억 × 3.5% = 1,750만원
                    <br />
                    · 지방교육세: 5억 × 0.3% = 150만원
                    <br />
                    · 농특세: 85㎡ 이하이므로 없음
                    <br />
                    · 취득세 총액: <strong>1,900만원</strong> (실효 3.8%)
                    <br />
                    <span className="text-xs text-text-tertiary">참고: 성년 자녀 공제 5천만원 적용 시 증여세는 별도 계산되며 이와 무관합니다.</span>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 2. 배우자에게 6억원 아파트 증여 (85㎡ 초과, 비조정)</p>
                  <p className="text-sm text-text-secondary">
                    · 시가인정액(과세표준): 6억원
                    <br />
                    · 취득세 본세: 6억 × 3.5% = 2,100만원
                    <br />
                    · 지방교육세: 6억 × 0.3% = 180만원
                    <br />
                    · 농특세: 6억 × 0.2% = 120만원 (85㎡ 초과)
                    <br />
                    · 취득세 총액: <strong>2,400만원</strong> (실효 4.0%)
                    <br />
                    <span className="text-xs text-text-tertiary">배우자 공제 6억원으로 증여세는 0원이어도 취득세 2,400만원은 부과됩니다.</span>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 3. 다주택자가 조정대상지역 5억원 아파트 증여 (12% 중과)</p>
                  <p className="text-sm text-text-secondary">
                    · 조건: 조정대상지역 + 공시가 3억 이상 + 증여자 다주택
                    <br />
                    · 취득세 본세: 5억 × 12% = 6,000만원
                    <br />
                    · 부가세목(지방교육세·농특세)은 별도로 추가
                    <br />
                    · 취득세 총액: <strong>6,000만원 초과</strong> (본세만으로도 사례 1의 3배 이상)
                    <br />
                    <span className="text-xs text-text-tertiary">중과 시 부가세목 포함 총부담률은 더 높아지므로 정확한 금액은 위택스에서 확인하세요.</span>
                  </p>
                </div>
                <p className="mt-4">
                  경계 비교: 같은 5억원 증여라도 사례 1은 1,900만원, 사례 3은 6,000만원을 넘습니다. 조정대상지역 여부와 다주택 여부가 세액을 3배 이상 갈라놓습니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">증여 취득세를 줄이는 방법은?</h2>
                <p>
                  세율 자체는 법으로 정해져 있어 바꿀 수 없지만, 과세표준과 시점을 조절해 부담을 나눌 수는 있습니다. 대표적으로 지분 분할 증여와 증여 시점 선택이 있습니다.
                </p>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li>
                    <strong>지분 분할 증여:</strong> 아파트 전체가 아니라 50% 지분을 먼저 증여하고 이후 나머지를 증여하면, 각 시점의 과세표준이 절반이 되어 세 부담을 분산할 수 있습니다. 증여세의 10년 합산 공제와도 연계됩니다.
                  </li>
                  <li>
                    <strong>조정대상지역 해제 시점 활용:</strong> 해당 지역이 조정대상지역에서 해제되면 다주택 증여라도 12% 중과가 사라져 3.5% 기본세율이 적용됩니다.
                  </li>
                  <li>
                    <strong>1세대 1주택 상태 정리:</strong> 증여자가 다른 주택을 먼저 처분해 1세대 1주택이 되면 조정대상지역 증여라도 중과에서 제외될 수 있습니다.
                  </li>
                </ul>
                <p className="mt-4">
                  다만 이런 절세는 증여세, 양도소득세, 이월과세(배우자 증여 후 10년 내 양도) 등과 얽혀 전체 세 부담이 오히려 커질 수 있으므로, 실행 전 세무 전문가 상담을 권합니다.
                </p>
              </section>

              <h2 className="text-2xl font-bold mb-6">자주 묻는 질문</h2>
              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h3 className="text-lg font-semibold text-text-primary">관련 계산기 및 가이드</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link
                    href="/calculator/acquisition-tax/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">취득세 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">취득가액을 입력해 취득세와 부가세목을 계산해보세요.</p>
                  </Link>
                  <Link
                    href="/guide/gift-tax-calculation-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">증여세 계산법 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">증여세율 10~50%와 누진공제, 과세표준 계산을 배우세요.</p>
                  </Link>
                  <Link
                    href="/guide/gift-tax-exemption-limit-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">증여재산공제 한도 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">배우자 6억·성년 자녀 5천만원 등 10년 공제 한도.</p>
                  </Link>
                  <Link
                    href="/guide/carry-over-basis-spouse-gift-5-10-year/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">배우자 증여 이월과세 10년</div>
                    <p className="mt-1 text-sm text-text-secondary">증여 후 양도 시 취득가 이월과세 함정을 확인하세요.</p>
                  </Link>
                  <Link
                    href="/guide/first-home-acquisition-tax-reduction-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">생애최초 취득세 감면</div>
                    <p className="mt-1 text-sm text-text-secondary">유상취득 시 취득세 감면 요건과 한도.</p>
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
                  <strong>면책조항:</strong> 본 가이드는 교육 목적으로 작성되었으며, 개인 맞춤형 세무 조언이 아닙니다. 실제 증여 취득세 세율, 시가인정액(과세표준), 조정대상지역 지정 여부, 중과 적용은 개별 상황과 증여 시점에 따라 달라지므로 관할 시·군·구청 세무과 또는 위택스에서 반드시 확인하세요. 본 콘텐츠는 2026-07-26을 기준으로 작성되었으며, 지방세법 개정 시 즉시 업데이트됩니다. 인용 법조항: <strong>지방세법 §10의2(무상취득 과세표준), §11(취득세율), §13의2(중과), §20(신고납부), §151(지방교육세)</strong>. AI 보조 작성 후 운영자 검수 완료.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터</a>,{' '}
                  <a href="https://www.wetax.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">위택스(지방세 종합정보)</a>,{' '}
                  <a href="https://www.nts.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">국세청(증여세)</a>.
                </p>
              </section>

              <ShareButtons
                title="증여 취득세 2026 가이드"
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
