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

const URL = 'https://calculatorhost.com/guide/donation-deduction-carryover-10-year-2026/';
const DATE_PUBLISHED = '2026-09-04';
const DATE_MODIFIED = '2026-09-04';

export const metadata: Metadata = {
  title: '기부금 이월공제 10년, 못 받은 공제 살리는 법',
  description:
    '기부금이 한도를 넘으면 초과분은 사라지지 않고 다음 해부터 10년간 이월해 세액공제를 받을 수 있습니다. 이월 순서와 이월이 안 되는 기부금, 실제 계산 사례를 소득세법 §59의4·§61 기준으로 정리했습니다.',
  keywords: [
    '기부금 이월공제',
    '기부금 세액공제 한도초과',
    '기부금 이월공제 10년',
    '지정기부금 이월',
    '특례기부금 이월',
    '소득세법 61조',
    '연말정산 기부금 이월',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '기부금 이월공제 10년, 못 받은 공제 살리는 법' }],
    title: '기부금 이월공제 10년, 못 받은 공제 되살리는 법',
    description: '한도 초과로 못 받은 기부금 세액공제, 10년간 이월공제 순서와 계산 사례 정리.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '기부금 이월공제 10년, 못 받은 공제 살리는 법',
    description: '한도 초과 기부금, 10년 이월공제 순서와 실제 계산 사례를 소득세법 §61 기준으로 정리.',
  },
};

const FAQ_ITEMS = [
  {
    question: '기부금 이월공제는 따로 신청해야 하나요?',
    answer:
      '별도의 신청서를 새로 내는 것이 아니라, 기부금 세액공제 명세서에 이월된 금액을 함께 기재하는 방식입니다. 연말정산이라면 회사에 제출하는 기부금 명세서에, 종합소득세 신고라면 신고서 부속서류에 이월잔액을 적어 그 해 한도 안에서 공제받습니다. 서류를 빠뜨리면 공제 자체가 누락될 수 있으므로 전년도 명세서를 보관해두는 것이 안전합니다.',
  },
  {
    question: '작년에 못 받은 이월분이 올해 자동으로 반영되나요?',
    answer:
      '자동으로 채워지지 않는 경우가 많습니다. 국세청 홈택스 연말정산 간소화 자료는 그 해 새로 지출한 기부금 위주로 제공되며, 과거 이월잔액까지 자동 합산해주지 않는 경우가 있습니다. 전년도 원천징수영수증이나 기부금 세액공제 명세서에서 이월잔액을 직접 확인해 올해 신고서에 입력해야 합니다.',
  },
  {
    question: '이월기한 10년이 지나면 어떻게 되나요?',
    answer:
      '공제받지 못한 채 10년이 지난 이월잔액은 더 이상 공제받을 수 없이 소멸합니다. 소득세법 §61②은 초과분을 다음 과세기간 개시일부터 10년 이내에 끝나는 각 과세기간까지만 이월하도록 정하고 있어, 그 안에 소득이 없거나 한도가 계속 부족하면 잔액을 살리지 못할 수 있습니다. 이월분이 쌓여 있다면 매년 명세서에서 소진 현황을 점검하는 것이 좋습니다.',
  },
  {
    question: '정치자금기부금이나 고향사랑기부금도 이월되나요?',
    answer:
      '이월되지 않습니다. 정치자금기부금, 고향사랑기부금, 우리사주조합기부금은 그 해에 세액공제 한도를 넘긴 부분이 있어도 다음 해로 넘어가지 않고 소멸합니다. 이월공제는 특례기부금과 일반기부금(지정기부금)에만 적용되는 제도이므로, 세 가지 기부금은 애초에 한도를 넘기지 않도록 그 해 안에서 금액을 조절하는 것이 중요합니다.',
  },
  {
    question: '프리랜서나 개인사업자도 기부금 이월공제를 받을 수 있나요?',
    answer:
      '받을 수 있지만 방식이 다릅니다. 근로소득자 등은 세액공제로 이월받지만, 사업소득만 있는 사업자는 기부금을 필요경비로 산입하는 방식이라 한도 초과분은 소득세법 §34⑤에 따라 마찬가지로 10년간 이월해 필요경비에 넣습니다. 결과적으로 둘 다 10년 이월이라는 점은 같지만, 세액공제냐 필요경비 산입이냐의 계산 구조가 다릅니다.',
  },
  {
    question: '이월된 기부금과 올해 새로 낸 기부금 중 어느 것이 먼저 공제되나요?',
    answer:
      '이월된 기부금이 먼저 공제됩니다. 같은 종류 안에서는 이월된 특례기부금, 그 해 지출한 특례기부금, 이월된 일반기부금, 그 해 지출한 일반기부금 순서로 한도를 채워가며 공제합니다. 오래된 이월분부터 먼저 소진해야 10년 이월기한이 임박한 금액이 소멸하지 않고 우선 살아납니다.',
  },
  {
    question: '기부금 세액공제 명세서는 어디서 확인하나요?',
    answer:
      '국세청 홈택스에서 전자기부금영수증 발급 내역과 함께 기부금 세액공제 명세서 서식을 내려받아 확인할 수 있습니다. 연말정산은 회사가 관리하는 원천징수영수증에도 그 해 반영된 공제액이 남아 있으므로, 매년 원천징수영수증을 보관해두면 이월잔액을 스스로 추적하는 데 도움이 됩니다.',
  },
];

export default function DonationDeductionCarryover10Year2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '기부금 이월공제 10년' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '기부금 이월공제 10년, 못 받은 공제 되살리는 법',
    description:
      '기부금 한도 초과분의 10년 이월공제 순서, 이월이 안 되는 기부금 종류, 연말정산·종합소득세 신고 반영 방법을 소득세법 §59의4·§61·§34⑤ 기준으로 정리.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['기부금 이월공제', '기부금 세액공제', '지정기부금', '특례기부금', '소득세법 61조'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '기부금 이월공제 10년, 못 받은 공제 살리는 법',
    description:
      '한도를 넘겨 그 해 공제받지 못한 기부금을 10년간 이월해 공제받는 방법, 순서, 계산 사례 정리.',
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
                    { name: '기부금 이월공제 10년' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">기부자 · 8분 읽기 · 2026-09-04</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  기부금 이월공제 10년
                  <br />
                  <span className="text-2xl text-text-secondary">· 못 받은 공제 살리는 법</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  기부금이 한도를 넘어 그 해에 공제받지 못했더라도 사라지는 것이 아니라 다음 해부터 10년간 이월해 세액공제를 받을 수 있습니다. 이 가이드는 이월공제가 적용되는 기부금 종류, 이월되지 않는 기부금, 실제 공제 순서와 계산 사례, 연말정산·종합소득세 신고에서 이월잔액을 반영하는 방법을 정리합니다. 대상 독자는 지정기부금·특례기부금을 한도 이상 낸 근로소득자와 사업자입니다.
                </p>
              </header>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">기부금 이월공제란 무엇인가요?</h2>
                <p>
                  기부금 이월공제는 그 해 소득에 비해 기부금이 너무 많아 세액공제 한도를 초과한 경우, 못 받은 초과분을 다음 과세기간부터 10년 이내에 끝나는 각 과세기간으로 넘겨 계속 공제받는 제도입니다(소득세법 §61②). 기부금 자체를 취소하거나 돌려받는 것이 아니라, 세금에서 빼주는 순서만 뒤로 미뤄지는 구조입니다.
                </p>
                <p>
                  이 제도가 필요한 이유는 지정기부금(일반기부금)의 공제 한도가 종합소득금액의 30%로 정해져 있기 때문입니다. 소득보다 기부를 크게 한 해에는 한도를 넘기기 쉬운데, 이월공제가 없다면 초과분에 대한 세제 혜택이 그대로 사라집니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">30초 요약</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    정의: 한도 초과로 그 해 못 받은 기부금 공제를 다음 해로 넘기는 제도.
                    <br />
                    근거: 소득세법 §61②(세액공제), 사업자는 §34⑤(필요경비).
                    <br />
                    기간: 다음 과세기간 개시일부터 10년 이내.
                    <br />
                    주의: 정치자금·고향사랑·우리사주조합 기부금은 이월 대상이 아님.
                  </p>
                </div>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">기부금 세액공제 한도는 얼마인가요?</h2>
                <p>
                  기부금 종류마다 한도가 다르며, 이 한도를 넘긴 금액만 이월공제 대상이 됩니다. 특례기부금(국가·지방자치단체 기부, 이재민 구호금품 등)은 종합소득금액 전액까지 공제 가능하고, 일반기부금(지정기부금)은 종합소득금액의 30%가 한도입니다. 종교단체 기부금이 섞여 있으면 계산식이 한 번 더 나뉩니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 기부금 종류별 세액공제 한도·이월 가능 여부 (소득세법 §59의4·§61)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">구분</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">공제 한도</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">이월 가능 여부</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">특례기부금(법정기부금)</td>
                        <td className="p-3">종합소득금액의 100%</td>
                        <td className="p-3">가능 (10년)</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">일반기부금(지정기부금, 비종교)</td>
                        <td className="p-3">종합소득금액의 30%</td>
                        <td className="p-3">가능 (10년)</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">일반기부금(종교단체 포함)</td>
                        <td className="p-3">소득의 10% + min(20%, 비종교분)</td>
                        <td className="p-3">가능 (10년)</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">정치자금기부금</td>
                        <td className="p-3">별도 공제율 구조(소득 한도 아님)</td>
                        <td className="p-3">불가</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">고향사랑·우리사주조합기부금</td>
                        <td className="p-3">종류별 개별 한도</td>
                        <td className="p-3">불가</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  다만, 공제율 자체는 한도와 별개입니다. 특례·일반기부금은 연간 1천만원까지는 15%, 1천만원을 초과하는 부분은 30%의 세액공제율이 적용됩니다(소득세법 §59의4④). 한도를 넘긴 금액은 이 공제율 계산에서 아예 빠지고 이월잔액으로 넘어갑니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">이월공제는 몇 년까지, 어떤 순서로 적용되나요?</h2>
                <p>
                  이월기한은 초과분이 생긴 해의 다음 과세기간 개시일부터 10년 이내에 끝나는 각 과세기간까지입니다(소득세법 §61②). 예를 들어 2026년에 초과분이 생겼다면 2027년분부터 2036년분까지, 그 해 한도에 여유가 생길 때마다 순서대로 공제받을 수 있습니다.
                </p>
                <p>
                  공제 순서는 법으로 정해져 있어 임의로 바꿀 수 없습니다. 이월된 특례기부금, 그 해 새로 지출한 특례기부금, 이월된 일반기부금, 그 해 새로 지출한 일반기부금 순으로 그 해의 한도를 채워가며 공제합니다. 오래 묵은 이월분을 먼저 소진하는 구조이므로, 이월기한이 임박한 금액부터 자동으로 우선 처리됩니다.
                </p>
                <p className="mt-4">
                  다만, 이 순서 때문에 이월잔액이 많은 해에는 그 해 새로 낸 기부금이 오히려 뒤로 밀려 다시 이월될 수 있습니다. 매년 얼마가 이월되고 있는지 명세서로 확인하지 않으면 본인도 모르게 공제 순서가 꼬여 있을 수 있습니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">이월이 안 되는 기부금도 있나요?</h2>
                <p>
                  있습니다. 정치자금기부금, 고향사랑기부금, 우리사주조합기부금은 그 해 한도를 넘긴 부분이 있어도 다음 해로 이월되지 않고 그대로 소멸합니다. 이월공제 제도는 특례기부금과 일반기부금(지정기부금)에만 적용되는 예외적 규정이기 때문입니다.
                </p>
                <p>
                  정치자금기부금은 10만원 이하분에 100분의 100에 가까운 공제율, 초과분에 별도 공제율이 적용되는 독립적인 구조라 소득 대비 한도 개념 자체가 다릅니다. 고향사랑기부금과 우리사주조합기부금 역시 각각 정해진 개별 한도 안에서만 그 해에 공제되며, 자세한 한도와 공제율은 각 기부금별 가이드에서 별도로 확인하는 것이 정확합니다.
                </p>
                <p className="mt-4">
                  예외: 이 세 가지 기부금을 지정기부금과 함께 냈다면, 이월이 안 되는 부분과 이월이 되는 부분을 나눠서 계산해야 합니다. 한 번에 합산해 신고하면 이월 가능한 일반기부금 초과분까지 누락될 수 있으므로 기부금 종류별로 나눠 정리하는 것이 안전합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">이월공제, 실제로 얼마나 받을 수 있나요?</h2>
                <p>
                  숫자로 보면 한도 초과와 이월 순서가 더 분명해집니다. 종합소득금액 5천만원인 근로소득자가 지정기부금(일반기부금) 2천만원을 냈다고 가정합니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3">
                  <p className="font-semibold text-text-primary">사례 1. 1년차, 한도 초과분이 생기는 경우</p>
                  <p className="text-sm text-text-secondary">
                    · 일반기부금 지출액: 2,000만원
                    <br />
                    · 그 해 공제 한도: 5,000만원 × 30% = 1,500만원
                    <br />
                    · 그 해 공제 대상액 1,500만원 중 1,000만원까지 15%(150만원), 나머지 500만원 30%(150만원)
                    <br />
                    · 그 해 세액공제액: 300만원
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 한도를 넘긴 500만원은 그 해 공제받지 못하고 다음 해로 이월됩니다.</span>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 2. 2년차, 이월분과 새 기부금이 함께 있는 경우</p>
                  <p className="text-sm text-text-secondary">
                    · 이월된 일반기부금: 500만원 (1순위로 우선 공제)
                    <br />
                    · 그 해 새로 지출한 일반기부금: 800만원
                    <br />
                    · 그 해 소득금액: 4,000만원, 한도: 4,000만원 × 30% = 1,200만원
                    <br />
                    · 이월분 500만원 전액 공제 + 새 기부금 중 700만원만 공제(한도 1,200만원에서 이월분을 뺀 잔여)
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 새 기부금 중 남은 100만원은 다시 이월되어, 최초 발생일 기준 남은 이월기한 안에서 계속 넘어갑니다.</span>
                  </p>
                </div>
                <p className="mt-4">
                  다만, 매년 소득이나 기부금 규모가 달라지면 그 해 한도도 함께 달라지므로 이월분이 완전히 소진되는 시점을 미리 정확히 예측하기는 어렵습니다. 이월잔액이 크다면 그 해 신규 기부금 규모를 조절해 한도 안에서 이월분부터 우선 소진하는 방법도 고려할 수 있습니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">연말정산·종합소득세 신고 시 이월분은 어떻게 반영하나요?</h2>
                <p>
                  연말정산이라면 회사에 제출하는 기부금 세액공제 명세서에 그 해 새 기부금과 함께 이월잔액을 적어야 합니다. 홈택스 연말정산 간소화 자료는 그 해 새로 발급된 기부금 영수증 위주로 제공되는 경우가 많아, 과거 이월잔액이 자동으로 채워지지 않을 수 있습니다.
                </p>
                <p>
                  종합소득세를 직접 신고하는 사업자나 프리랜서도 마찬가지로 신고서 부속서류에 이월잔액을 기재해야 합니다. 사업소득만 있는 경우에는 세액공제가 아니라 필요경비 산입 방식이 적용되며, 한도를 넘긴 금액은 소득세법 §34⑤에 따라 역시 10년간 이월해 필요경비에 산입할 수 있습니다.
                </p>
                <p className="mt-4">
                  예외: 전년도 원천징수영수증이나 기부금 명세서를 분실했다면 홈택스에서 과거 신고 내역을 조회해 이월잔액을 복원할 수 있습니다. 다만 조회 화면이 매년 개편되므로, 정확한 확인 절차는 국세청 홈택스 공지사항이나 상담센터를 통해 확인하는 것이 확실합니다.
                </p>
              </section>

              <h2 className="text-2xl font-bold mb-6">자주 묻는 질문</h2>
              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h3 className="text-lg font-semibold text-text-primary">관련 계산기 및 가이드</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link
                    href="/guide/donation-tax-credit-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">기부금 세액공제 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">15%·30% 공제율과 기부금 종류별 기본 구조 정리.</p>
                  </Link>
                  <Link
                    href="/guide/hometown-love-donation-tax-credit-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">고향사랑기부금 세액공제</div>
                    <p className="mt-1 text-sm text-text-secondary">이월이 안 되는 고향사랑기부금의 한도와 공제율.</p>
                  </Link>
                  <Link
                    href="/guide/year-end-tax-simplified-service-schedule-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">연말정산 간소화서비스 일정</div>
                    <p className="mt-1 text-sm text-text-secondary">이월분 확인 전에 알아야 할 자료 제공 일정.</p>
                  </Link>
                  <Link
                    href="/guide/mid-year-resignation-year-end-tax-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">중도퇴사자 연말정산</div>
                    <p className="mt-1 text-sm text-text-secondary">이직·퇴사 해에 기부금 공제를 어떻게 반영하는지.</p>
                  </Link>
                  <Link
                    href="/calculator/salary/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">연봉 실수령액 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">기부금 공제 반영 전 예상 세후 급여를 먼저 확인해보세요.</p>
                  </Link>
                  <Link
                    href="/calculator/freelancer-tax/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">프리랜서 종합소득세 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">사업소득자의 기부금 필요경비 산입 전 세액을 계산해보세요.</p>
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
                  <strong>면책조항:</strong> 이 글은 AI 보조로 자동 생성되어 자동 품질 게이트를 통과한 뒤 발행되었습니다. 발행 시점에 사람의 사전 검수는 없었으며, 운영자가 사후 점검합니다. 기부금 이월공제의 실제 적용 여부와 금액은 소득 종류·기부금 종류·과거 신고 이력에 따라 달라지므로, 정확한 계산은 국세청 홈택스 또는 세무 전문가와 확인하세요. 본 콘텐츠는 2026-09-04를 기준으로 작성되었으며, 관련 법령 개정 시 업데이트됩니다. 인용 법조항: 소득세법 §34(사업소득 필요경비, 이월공제), §59의4(기부금 세액공제), §61(세액공제액의 이월공제).
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터</a>,{' '}
                  <a href="https://www.nts.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">국세청</a>.
                </p>
              </section>

              <ShareButtons
                title="기부금 이월공제 10년, 못 받은 공제 살리는 법"
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
