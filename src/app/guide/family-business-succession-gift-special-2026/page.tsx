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

const URL = 'https://calculatorhost.com/guide/family-business-succession-gift-special-2026/';
const DATE_PUBLISHED = '2026-09-16';
const DATE_MODIFIED = '2026-09-16';

export const metadata: Metadata = {
  title: '가업승계 증여세 과세특례 2026, 공제·세율·사후관리 5년',
  description:
    '조세특례제한법 §30의6에 따라 60세 이상 부모의 가업을 18세 이상 자녀가 증여받으면 과세가액에서 10억원을 공제하고 10%(120억 초과분 20%) 세율만 적용합니다. 2023년 개정으로 짧아진 대표이사 취임 기한, 사후관리 5년 요건, 위반 시 추징 기준을 정리했습니다.',
  keywords: [
    '가업승계 증여세',
    '가업승계 증여세 과세특례',
    '조세특례제한법 30조의6',
    '가업승계 사후관리',
    '가업승계 대표이사 취임',
    '증여세 10억 공제',
    '가업상속공제 비교',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '가업승계 증여세 과세특례 2026, 공제·세율·사후관리 5년' }],
    title: '가업승계 증여세 과세특례 2026, 요건과 사후관리 5년',
    description: '60세 이상 부모의 가업을 자녀가 증여받으면 10억원 공제·10% 세율. 대표이사 취임 기한과 사후관리 5년 요건 정리.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '가업승계 증여세 과세특례 2026, 요건·사후관리 5년',
    description: '10억원 공제, 10%(120억 초과분 20%) 세율. 대표이사 취임 기한·사후관리 5년 핵심 정리. 조세특례제한법 §30의6.',
  },
};

const FAQ_ITEMS = [
  {
    question: '가업승계 증여세 과세특례는 누가 받을 수 있나요?',
    answer:
      '18세 이상인 거주자가 60세 이상인 부모로부터, 그 부모가 10년 이상 계속 경영한 중소기업 또는 매출액 평균 5천억원 미만인 중견기업의 주식·출자지분을 증여받는 경우에 적용됩니다(조세특례제한법 §30의6). 업력·매출 기준을 충족하는 회사의 지분을 직계비속이 물려받는 상황을 전제로 합니다.',
  },
  {
    question: '증여세를 얼마나 아낄 수 있나요?',
    answer:
      '가업자산상당액에 해당하는 주식 가액에서 증여세 과세가액 10억원을 먼저 공제하고, 남은 과세표준에 10%(120억원 초과분은 20%) 세율만 적용합니다. 일반 증여세율은 과세표준 구간에 따라 최고 50%까지 올라가므로, 요건을 충족하면 세부담이 크게 줄어듭니다.',
  },
  {
    question: '특례 적용 한도는 얼마까지인가요?',
    answer:
      '부모가 가업을 경영한 기간에 따라 한도가 다릅니다. 10년 이상 20년 미만이면 300억원, 20년 이상 30년 미만이면 400억원, 30년 이상이면 600억원까지 특례가 적용됩니다(조세특례제한법 §30의6). 한도를 넘는 금액은 일반 증여세율로 과세됩니다.',
  },
  {
    question: '증여받은 뒤 언제까지 대표이사가 되어야 하나요?',
    answer:
      '2023년 세법개정으로 대표이사 취임 기한이 증여일로부터 5년 이내에서 3년 이내로 단축되었습니다. 또한 증여세 과세표준 신고기한까지는 가업에 종사하고 있어야 합니다. 이 요건을 지키지 않으면 처음부터 가업을 승계한 것으로 인정받지 못해 특례가 배제될 수 있습니다.',
  },
  {
    question: '사후관리 기간은 몇 년이고, 무엇을 지켜야 하나요?',
    answer:
      '사후관리 기간은 2023년 개정으로 7년에서 5년으로 단축되었습니다. 이 기간 동안 대표이사직을 유지하고, 증여받은 지분을 그대로 보유하며 최대주주 등의 지위를 지켜야 합니다. 최대주주 지분 요건도 발행주식총수의 40%(상장법인 20%) 이상으로 완화되었습니다.',
  },
  {
    question: '사후관리를 어기면 어떻게 되나요?',
    answer:
      '대표이사 미취임, 지분 감소, 가업 미종사 등 사후관리 위반 사유가 발생하면 특례로 줄었던 세제 혜택이 배제되고 원래 냈어야 할 증여세와 이자상당액이 함께 추징됩니다. 정확한 이자상당액 계산 방식은 국세기본법 시행령에 따르므로 관할 세무서에서 확인해야 합니다.',
  },
  {
    question: '가업상속공제나 창업자금 증여특례와는 무엇이 다른가요?',
    answer:
      '가업상속공제는 부모가 사망한 뒤 상속 시점에 적용되는 제도이고, 가업승계 증여세 과세특례는 부모가 생존해 있을 때 미리 지분을 증여하는 제도입니다. 창업자금 증여세 과세특례는 신설 창업자금에 한정되어 한도(5억원)와 세율 요건이 다릅니다. 셋 다 조세특례제한법·상증세법상 별도 조문이므로 상황에 맞는 제도를 세무 전문가와 함께 골라야 합니다.',
  },
];

export default function FamilyBusinessSuccessionGiftSpecial2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '가업승계 증여세 과세특례 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '가업승계 증여세 과세특례 2026, 요건과 사후관리 5년',
    description:
      '조세특례제한법 §30의6에 따른 가업승계 증여세 과세특례의 수증자·증여자 요건, 10억원 공제와 한도(300/400/600억), 세율, 대표이사 취임 기한, 사후관리 5년 요건과 위반 시 추징을 정리.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['가업승계 증여세', '조세특례제한법 30조의6', '사후관리', '증여세 특례', '가업상속공제'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '가업승계 증여세 과세특례 2026',
    description:
      '부모의 가업을 자녀가 증여받을 때 10억원 공제, 10%(120억 초과분 20%) 세율, 대표이사 취임 기한, 사후관리 5년 요건.',
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
                    { name: '가업승계 증여세 과세특례 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">가업승계 · 8분 읽기 · 2026-09-16</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  가업승계 증여세 과세특례 2026
                  <br />
                  <span className="text-2xl text-text-secondary">· 요건과 사후관리 5년</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  부모가 오래 운영한 회사를 자녀가 물려받을 때, 지분을 미리 증여받으면 일반 증여세율 대신 낮은 세율로 세금을 낼 수 있는 제도가 가업승계 증여세 과세특례입니다. 이 가이드는 수증자·증여자 요건, 공제금액과 세율, 대표이사 취임 기한, 사후관리 5년 동안 지켜야 할 것과 어겼을 때의 추징까지 조세특례제한법 §30의6 기준으로 정리합니다. 대상 독자는 가업을 물려주거나 물려받을 예정인 중소·중견기업 경영진·후계자입니다.
                </p>
              </header>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">가업승계 증여세 과세특례란 무엇인가요?</h2>
                <p>
                  가업승계 증여세 과세특례는 자녀가 부모의 가업(회사) 지분을 미리 증여받아 경영권을 넘겨받을 때, 증여세 부담을 크게 낮춰 원활한 승계를 돕는 제도입니다(조세특례제한법 §30의6). 일반적인 증여는 과세표준 구간에 따라 세율이 최고 50%까지 올라가지만, 이 특례를 적용받으면 10억원을 먼저 공제하고 남은 금액에 10%(120억원 초과분은 20%)라는 낮은 세율만 적용됩니다.
                </p>
                <p>
                  다만 세금을 깎아주는 만큼 요건과 사후관리가 까다롭습니다. 증여받은 뒤 정해진 기한 안에 대표이사가 되어야 하고, 그 뒤로도 일정 기간 지분과 경영권을 유지해야 특례가 유지됩니다. 이 요건들은 2023년 세법개정으로 상당 부분 완화·단축되었습니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">30초 요약</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    정의: 부모의 가업 지분을 자녀가 증여받을 때 적용하는 증여세 감면 제도.
                    <br />
                    혜택: 과세가액 10억원 공제 + 10%(120억 초과분 20%) 세율.
                    <br />
                    조건: 증여일로부터 3년 이내 대표이사 취임.
                    <br />
                    주의: 대표이사·지분 유지 사후관리 기간 5년.
                  </p>
                </div>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">누가 받을 수 있나요, 수증자·증여자 요건</h2>
                <p>
                  수증자는 18세 이상인 거주자여야 하고, 증여자는 60세 이상인 부모여야 합니다. 여기서 부모는 10년 이상 계속하여 해당 가업을 경영해 온 사람이어야 합니다(조세특례제한법 §30의6). 회사 규모 요건도 있는데, 중소기업이거나 매출액 평균금액이 5천억원 미만인 중견기업이어야 특례 대상이 됩니다. 이 매출 기준은 2023년 개정으로 4천억원 미만에서 5천억원 미만으로 상향되어 적용 대상이 넓어졌습니다.
                </p>
                <p>
                  다만, 가업 승계 당시 이미 최대주주였던 사람(증여자·수증자 본인은 제외)으로부터 다시 증여받는 경우처럼 조세회피 우려가 있는 상황은 특례 적용에서 제외됩니다. 회사가 여러 계열사로 얽혀 있거나 지분 구조가 복잡하다면, 실제 적용 가능 여부를 국세청 또는 세무 전문가와 사전에 확인하는 것이 안전합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">공제금액과 세율은 얼마인가요?</h2>
                <p>
                  가업자산상당액에 해당하는 주식 가액에서 증여세 과세가액 10억원을 먼저 공제합니다. 남은 금액에는 10%(과세표준이 120억원을 초과하면 그 초과분에는 20%) 세율만 적용됩니다. 특례를 적용받을 수 있는 한도는 부모의 가업 경영 기간에 따라 달라집니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 가업 경영기간별 특례 적용 한도 (조세특례제한법 §30의6)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">부모의 가업 경영기간</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">특례 적용 한도</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">10년 이상 20년 미만</td>
                        <td className="p-3">300억원</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">20년 이상 30년 미만</td>
                        <td className="p-3">400억원</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">30년 이상</td>
                        <td className="p-3">600억원</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  다만, 이 한도를 초과하는 지분 가액은 특례를 적용받지 못하고 일반 증여세율로 과세됩니다. 회사 가치가 한도에 가깝다면 증여 시점을 언제로 잡느냐에 따라 세부담 차이가 커질 수 있으므로, 사전에 지분가치를 평가해보는 것이 중요합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">증여받은 뒤 언제까지 대표이사가 되어야 하나요?</h2>
                <p>
                  증여세 과세표준 신고기한까지는 가업에 종사하고 있어야 하고, 증여일로부터 3년 이내에 대표이사로 취임해야 합니다. 이 기한은 2023년 세법개정 전에는 5년 이내였는데, 개정으로 3년 이내로 단축되었습니다. 신고기한까지 가업 종사와 대표이사 취임, 이 두 가지를 모두 지켜야 비로소 가업을 승계한 것으로 인정받습니다.
                </p>
                <p>
                  다만, 취임 기한을 놓치면 처음부터 가업 승계 요건을 충족하지 못한 것으로 보아 특례 자체가 배제될 수 있습니다. 후계자가 아직 경영 수업 중이라 대표이사 선임이 늦어질 것 같다면, 증여 시점을 늦추거나 취임 일정을 미리 조율해두는 편이 안전합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">사후관리 5년 동안 무엇을 지켜야 하나요?</h2>
                <p>
                  사후관리 기간은 2023년 개정으로 7년에서 5년으로 단축되었습니다. 이 5년 동안 대표이사직을 유지해야 하고, 증여받은 주식 등의 지분율이 줄어들지 않아야 합니다. 최대주주 등의 지위도 유지해야 하는데, 지분 요건은 발행주식총수의 40%(상장법인은 20%) 이상으로 2023년 개정을 통해 완화되었습니다(종전 50%·상장 30%).
                </p>
                <p>
                  다만, 시설투자나 사업 확장을 위한 유상증자 과정에서 수증자와 특수관계가 없는 제3자에게 신주를 배정하느라 실권해 지분율이 낮아지는 경우처럼, 정당한 경영상 이유로 지분율이 줄어든 상황은 예외적으로 사후관리 위반으로 보지 않을 수 있습니다. 다만 이런 예외 인정 여부는 사안별로 판단이 갈릴 수 있어 사전에 세무서에 확인하는 것이 안전합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">사후관리를 어기면 어떻게 되나요?</h2>
                <p>
                  대표이사 미취임·중도 사임, 지분율 감소, 가업을 그만두거나 폐업하는 경우처럼 사후관리 요건을 위반하면 특례로 줄었던 증여세를 다시 추징당합니다. 이때 원래 냈어야 할 증여세뿐 아니라 그동안 유예된 기간만큼 이자상당액도 함께 부과됩니다. 이자상당액의 구체적인 이율은 국세기본법 시행령에 따라 정해지고 수시로 조정되므로, 정확한 금액은 관할 세무서나 홈택스에서 확인해야 합니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3">
                  <p className="font-semibold text-text-primary">예시. 사후관리 3년 차에 대표이사에서 물러난 경우</p>
                  <p className="text-sm text-text-secondary">
                    · 상황: 증여받아 특례를 적용받은 뒤 3년 차에 건강 문제로 대표이사직 사임
                    <br />
                    · 결과: 사후관리 위반으로 특례가 배제되어 증여세 재계산
                    <br />
                    · 추가 부담: 재계산된 증여세에 그간의 이자상당액이 더해져 추징
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 사후관리 기간 중 불가피한 사정이 예상된다면 사전에 세무 전문가와 대응 방안을 검토해두는 것이 좋습니다.</span>
                  </p>
                </div>
                <p className="mt-4">
                  다만, 증여자 또는 수증자가 증여일 10년 전부터 사후관리 기간이 끝날 때까지 가업과 관련해 탈세나 회계부정으로 징역형·벌금형을 받으면, 사후관리를 다 지켰더라도 애초에 특례 적용이 배제될 수 있습니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">가업상속공제·창업자금 증여특례와는 무엇이 다른가요?</h2>
                <p>
                  가업승계 증여세 과세특례는 부모가 생존해 있을 때 미리 지분을 증여하는 사전 승계 제도이고, 가업상속공제는 부모가 사망한 뒤 상속 시점에 적용되는 사후 승계 제도입니다. 창업자금 증여세 과세특례는 기존 가업이 아니라 새로 창업하는 자금에 한정된 별도 제도로 한도와 세율 구조가 다릅니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 2. 가업승계 관련 세 가지 제도 비교</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">항목</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">가업승계 증여특례</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">가업상속공제</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">적용 시점</td>
                        <td className="p-3">부모 생존 중 증여</td>
                        <td className="p-3">부모 사망 후 상속</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">혜택 구조</td>
                        <td className="p-3">10억원 공제 + 10%·20% 세율</td>
                        <td className="p-3">최대 600억원 상속세 공제</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">사후관리</td>
                        <td className="p-3">5년, 대표이사·지분 유지</td>
                        <td className="p-3">5년, 고용·자산·업종 유지</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  다만 두 제도는 중복 적용 여부·순서가 회사 상황에 따라 달라질 수 있습니다. 어떤 조합이 유리한지는 회사 지분가치, 경영 승계 시점, 후계자 나이 등에 따라 달라지므로 세무 전문가와 함께 시뮬레이션해보는 것이 좋습니다.
                </p>
              </section>

              <h2 className="text-2xl font-bold mb-6">자주 묻는 질문</h2>
              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h3 className="text-lg font-semibold text-text-primary">관련 계산기 및 가이드</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link
                    href="/guide/family-business-inheritance-deduction-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">가업상속공제 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">부모 사망 후 상속 시 적용되는 최대 600억원 공제 제도.</p>
                  </Link>
                  <Link
                    href="/guide/startup-fund-gift-tax-special-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">창업자금 증여세 과세특례</div>
                    <p className="mt-1 text-sm text-text-secondary">신설 창업자금에 한정된 5억원 공제·10% 세율 제도.</p>
                  </Link>
                  <Link
                    href="/guide/gift-tax-calculation-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">증여세 계산법 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">일반 증여세율·공제 구조부터 기본 개념 정리.</p>
                  </Link>
                  <Link
                    href="/calculator/gift-tax/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">증여세 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">증여재산을 입력해 일반 증여세액을 계산해보세요.</p>
                  </Link>
                  <Link
                    href="/calculator/inheritance-tax/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">상속세 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">가업상속공제와 비교할 상속세를 미리 계산해보세요.</p>
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
                  <strong>면책조항:</strong> 이 글은 AI 보조로 자동 생성되어 자동 품질 게이트를 통과한 뒤 발행되었습니다. 발행 시점에 사람의 사전 검수는 없었으며, 운영자가 사후 점검합니다. 가업승계 증여세 과세특례의 실제 적용 여부, 공제 한도, 사후관리 위반 판정, 추징 세액은 회사·지분 구조와 개별 사실관계에 따라 크게 달라지므로 반드시 관할 세무서 또는 세무사·회계사와 확인하세요. 본 콘텐츠는 2026-09-16을 기준으로 작성되었으며, 관련 법령 개정 시 업데이트됩니다. 인용 법조항: 조세특례제한법 §30의6(가업의 승계에 대한 증여세 과세특례) 및 동법 시행령 §27조의6.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터</a>,{' '}
                  <a href="https://www.nts.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">국세청</a>,{' '}
                  <a href="https://www.hometax.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">홈택스</a>.
                </p>
              </section>

              <ShareButtons
                title="가업승계 증여세 과세특례 2026 가이드"
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
