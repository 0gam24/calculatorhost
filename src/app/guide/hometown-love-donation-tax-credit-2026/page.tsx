// [revenue-lever: indexing+traffic]
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

const URL = 'https://calculatorhost.com/guide/hometown-love-donation-tax-credit-2026/';
const DATE_PUBLISHED = '2026-07-30';
const DATE_MODIFIED = '2026-07-30';

export const metadata: Metadata = {
  title: '고향사랑기부제 2026, 10만원 전액 세액공제와 답례품 30%',
  description:
    '고향사랑기부제는 10만원까지 사실상 전액 세액공제되고 기부액의 30% 답례품까지 받습니다. 공제 구조와 10만원·100만원 실제 계산, 신청 방법을 조세특례제한법 §58 기준으로 정리했습니다.',
  keywords: [
    '고향사랑기부제',
    '고향사랑기부금 세액공제',
    '10만원 기부 세액공제',
    '고향사랑기부제 답례품',
    '고향사랑e음',
    '조세특례제한법 58조',
    '연말정산 기부금',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '고향사랑기부제 2026, 10만원 전액 세액공제와 답례품 30%' }],
    title: '고향사랑기부제 2026, 10만원 전액 세액공제와 답례품 30%',
    description: '10만원까지 사실상 전액 세액공제 + 기부액 30% 답례품. 공제 구조와 실제 계산을 조세특례제한법 §58 기준으로 정리.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '고향사랑기부제 2026, 10만원 전액 세액공제와 답례품 30%',
    description: '10만원 기부하면 세액공제로 사실상 전액 돌려받고 답례품 3만원까지. 조세특례제한법 §58.',
  },
};

const FAQ_ITEMS = [
  {
    question: '고향사랑기부제로 10만원 기부하면 정확히 얼마를 돌려받나요?',
    answer:
      '10만원을 기부하면 사실상 전액을 세액공제로 돌려받습니다. 조세특례제한법 §58에 따라 10만원 이하 기부금은 100분의 110의 비율로 소득세에서 90,909원이 공제되고, 여기에 지방소득세 약 9,091원이 자동 반영되어 합계 약 10만원이 경감됩니다. 여기에 기부액의 30%인 3만원 상당 답례품까지 더하면, 실제로는 낸 돈을 전부 돌려받고 답례품만큼 이득입니다.',
  },
  {
    question: '10만원을 넘겨서 기부하면 초과분은 어떻게 공제되나요?',
    answer:
      '10만원 초과분은 15%가 세액공제됩니다(조세특례제한법 §58). 지방소득세 10%를 포함하면 초과분에 대해 약 16.5%가 경감됩니다. 예를 들어 100만원을 기부하면 10만원까지는 사실상 전액, 초과분 90만원은 약 16.5%인 14만8,500원이 공제되어 합계 약 24만8,500원의 세금이 줄어듭니다. 다만 2026년 공제율 개정 논의가 있으므로 최신 공제율은 고향사랑e음과 국세청에서 확인하세요.',
  },
  {
    question: '내가 사는 지역에 기부해도 세액공제를 받나요?',
    answer:
      '받을 수 없습니다. 고향사랑기부금은 본인의 주민등록상 주소지가 아닌 다른 지방자치단체에만 기부할 수 있습니다. 주소지 지자체에 낸 기부금은 세액공제와 답례품 대상에서 제외됩니다. 반드시 현재 거주지가 아닌 지역을 선택해 기부해야 혜택을 받을 수 있습니다.',
  },
  {
    question: '답례품은 얼마짜리를 받을 수 있나요?',
    answer:
      '기부액의 30% 이내에서 답례품을 받을 수 있습니다(고향사랑 기부금에 관한 법률 §9). 10만원을 기부하면 3만원 상당, 50만원을 기부하면 15만원 상당의 답례품을 고를 수 있습니다. 지역 농특산물, 지역화폐, 관광·체험 상품권 등 지자체가 등록한 품목 중에서 고향사랑e음에서 선택합니다.',
  },
  {
    question: '연간 기부 한도는 얼마인가요?',
    answer:
      '개인이 1년에 기부할 수 있는 한도가 정해져 있으며 최근 상향되었습니다. 상향된 한도(2,000만원 수준)와 적용 시점은 고향사랑e음 공지에서 확인하는 것이 정확합니다. 다만 세액공제는 10만원까지 사실상 전액, 초과분 15% 구조가 적용되므로, 절세 효율만 보면 10만원 기부가 가장 효율적입니다.',
  },
  {
    question: '어떻게 기부하고 공제는 어떻게 받나요?',
    answer:
      '고향사랑e음(ilovegohyang.go.kr) 또는 전국 농협 창구에서 기부할 수 있습니다. 온라인 기부 시 답례품을 바로 선택하고, 기부금 영수증은 연말정산·종합소득세 신고 때 자동으로 반영되거나 홈택스에서 조회됩니다. 별도로 영수증을 제출하지 않아도 국세청 연말정산 간소화 자료에 잡히는 경우가 많으니 신고 시 확인하세요.',
  },
  {
    question: '개인사업자나 프리랜서도 혜택을 받을 수 있나요?',
    answer:
      '받을 수 있습니다. 사업소득자는 종합소득세 신고 때 고향사랑기부금 세액공제를 적용받으며, 근로소득자와 같은 공제 구조가 적용됩니다. 다만 사업자의 경우 필요경비 처리 방식과 세액공제 방식 중 유리한 쪽을 따져야 할 수 있으므로, 규모가 크면 세무 대리인과 상담하는 것이 안전합니다.',
  },
  {
    question: '기부금 세액공제인데 소득이 적어 낼 세금이 없으면 어떻게 되나요?',
    answer:
      '세액공제는 납부할 세금에서 빼주는 방식이라, 결정세액이 0원이면 공제받을 세금 자체가 없어 환급 효과가 줄어듭니다. 즉 원래 낼 세금이 공제액보다 적으면 그 세금 한도까지만 돌려받습니다. 소득과 세액 규모를 먼저 확인한 뒤 기부 금액을 정하면 절세 효율을 극대화할 수 있습니다.',
  },
];

export default function HometownLoveDonationTaxCredit2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '고향사랑기부제 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '고향사랑기부제 2026, 10만원 전액 세액공제와 답례품 30%',
    description:
      '고향사랑기부금의 세액공제 구조(10만원 이하 사실상 전액, 초과분 15%)와 10만원·100만원 실제 계산, 답례품·연간 한도·신청 방법을 조세특례제한법 §58 기준으로 정리한 가이드.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['고향사랑기부제', '고향사랑기부금', '세액공제', '답례품', '연말정산'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '고향사랑기부제 2026',
    description: '고향사랑기부금 세액공제 구조와 실제 계산, 답례품·신청 방법 정리.',
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
                    { name: '고향사랑기부제 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">직장인·일반 납세자 · 8분 읽기 · 2026-07-30</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  고향사랑기부제 2026
                  <br />
                  <span className="text-2xl text-text-secondary">10만원 전액 세액공제와 답례품 30%</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  이 가이드는 세금을 아끼면서 지역에도 보탬이 되고 싶은 직장인과 일반 납세자를 위한 것입니다. 고향사랑기부제는 10만원까지 사실상 낸 돈을 전부 돌려받고 기부액의 30%짜리 답례품까지 받을 수 있어, 사실상 손해 없이 이득만 남는 몇 안 되는 제도입니다. 공제가 정확히 어떻게 계산되는지, 얼마를 기부하는 것이 가장 효율적인지 조세특례제한법 조항과 함께 정리합니다.
                </p>
              </header>

              <AdSlot slot="guide-hometown-love-donation-tax-credit-top" format="horizontal" />

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">고향사랑기부제란 무엇인가요?</h2>
                <p>
                  고향사랑기부제는 개인이 주소지가 아닌 다른 지방자치단체에 기부하면 세액공제와 답례품을 받는 제도입니다(고향사랑 기부금에 관한 법률). 지방소멸에 대응해 지역 재정을 돕고, 그 대가로 기부자에게 세금 혜택과 지역 특산물을 돌려주는 구조입니다.
                </p>
                <p>
                  핵심은 세 가지입니다. 첫째, 본인이 사는 지역에는 기부할 수 없고 다른 지역에만 가능합니다. 둘째, 10만원까지는 사실상 전액을 세액공제로 돌려받습니다. 셋째, 기부액의 30% 이내에서 답례품을 고를 수 있습니다. 이 조합 덕분에 10만원을 기부하면 세금으로 10만원을 돌려받고 3만원짜리 답례품까지 챙기게 됩니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">30초 요약</p>
                  <ul className="mt-2 space-y-1 text-sm text-text-secondary list-disc ml-5">
                    <li>기부 대상: 본인 주소지 외 지자체 (거주지 기부 불가)</li>
                    <li>10만원 이하: 사실상 전액 세액공제 (소득세 90,909원 + 지방소득세 자동 반영)</li>
                    <li>10만원 초과분: 15% 세액공제 (지방소득세 포함 약 16.5%)</li>
                    <li>답례품: 기부액의 30% 이내</li>
                    <li>근거: 조세특례제한법 §58, 고향사랑 기부금에 관한 법률</li>
                  </ul>
                </div>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">세액공제는 정확히 어떻게 계산되나요?</h2>
                <p>
                  10만원까지는 100분의 110의 비율로 공제된다는 점이 핵심입니다. 조세특례제한법 §58에 따르면 10만원 이하 기부금은 기부액에 100분의 100을 곱하고 다시 110으로 나눈 금액을 소득세에서 공제합니다. 즉 10만원이면 소득세에서 90,909원이 빠지고, 그 소득세 공제액의 10%인 약 9,091원이 지방소득세에서 자동으로 추가 반영됩니다. 두 가지를 합치면 약 10만원, 사실상 전액이 경감됩니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 고향사랑기부금 구간별 세액공제율 (조세특례제한법 §58, 2026 기준)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">기부 구간</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">소득세 공제</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">지방소득세 포함</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">10만원 이하</td>
                        <td className="p-3">기부액 × 100/110</td>
                        <td className="p-3"><strong>사실상 전액</strong></td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">10만원 초과분</td>
                        <td className="p-3">15%</td>
                        <td className="p-3"><strong>약 16.5%</strong></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  다만, 2026년 들어 10만원 초과 구간의 공제율을 올리려는 개정 논의가 진행되었습니다. 실제 적용되는 공제율과 시행 시점은 변동될 수 있으므로, 신고 직전에는 고향사랑e음 공지와 국세청 안내를 다시 확인하는 것이 안전합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">실제 기부액별 혜택 계산 사례</h2>
                <p>
                  숫자로 보면 10만원 기부의 효율이 왜 압도적인지 분명해집니다. 다음 두 가지 사례로 확인해 보세요.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3">
                  <p className="font-semibold text-text-primary">사례 1. 10만원 기부 (가장 효율적인 금액)</p>
                  <p className="text-sm text-text-secondary">
                    · 기부금: 100,000원
                    <br />
                    · 소득세 공제: 100,000 × 100/110 = 90,909원
                    <br />
                    · 지방소득세 반영: 약 9,091원
                    <br />
                    · 세금 경감 합계: 약 <strong>100,000원</strong> (사실상 전액)
                    <br />
                    · 답례품: 100,000 × 30% = 30,000원 상당
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 낸 돈 10만원을 세금으로 전부 돌려받고, 3만원 답례품만큼 순이득.</span>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3">
                  <p className="font-semibold text-text-primary">사례 2. 100만원 기부 (일반 거주자)</p>
                  <p className="text-sm text-text-secondary">
                    · 기부금: 1,000,000원
                    <br />
                    · 10만원까지: 약 100,000원 세액공제 (사실상 전액)
                    <br />
                    · 초과분 90만원 × 16.5%(지방세 포함): 148,500원
                    <br />
                    · 세금 경감 합계: 약 <strong>248,500원</strong>
                    <br />
                    · 답례품: 1,000,000 × 30% = 300,000원 상당
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 100만원 중 약 24.8만원 세금 경감 + 30만원 답례품. 순부담은 약 45만원.</span>
                  </p>
                </div>
                <p className="mt-4">
                  예외: 두 사례 모두 낼 세금(결정세액)이 공제액보다 충분히 많다는 전제입니다. 소득이 적어 원래 낼 세금이 적으면, 그 세금 한도까지만 돌려받게 되어 위 계산보다 혜택이 줄어들 수 있습니다.
                </p>
              </section>

              <AdSlot slot="guide-hometown-love-donation-tax-credit-mid" format="rectangle" />

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">다른 기부금 세액공제와 무엇이 다른가요?</h2>
                <p>
                  일반 지정기부금이나 정치자금기부금과 비교하면 고향사랑기부제의 강점이 뚜렷합니다. 10만원 이하 구간의 사실상 전액 공제와 답례품이라는 물질적 보상이 결합된 점이 결정적 차이입니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 2. 기부금 유형별 혜택 비교 (2026 기준, 개인 기준)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">구분</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">10만원 이하</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">답례품</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">고향사랑기부금</td>
                        <td className="p-3">사실상 전액</td>
                        <td className="p-3"><strong>기부액 30%</strong></td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">일반 지정기부금</td>
                        <td className="p-3">15%</td>
                        <td className="p-3">없음</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">정치자금기부금</td>
                        <td className="p-3">사실상 전액</td>
                        <td className="p-3">없음</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  정리하자면, 10만원 이하 소액 기부라면 고향사랑기부금이 답례품까지 얹어주므로 가장 유리합니다. 큰 금액을 오래 기부해 사회에 환원하려는 목적이라면 공익법인 지정기부금이 별도 한도를 활용할 수 있어 상황에 맞게 나눠 활용하면 됩니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">어떻게 기부하고 공제받나요?</h2>
                <p>
                  절차는 간단합니다. 온라인이라면 5분이면 끝납니다.
                </p>
                <ol className="space-y-3 ml-6 list-decimal text-text-secondary">
                  <li>고향사랑e음(ilovegohyang.go.kr)에 접속하거나 가까운 농협 창구를 방문합니다.</li>
                  <li>본인 주소지가 아닌 원하는 지자체를 선택해 기부 금액을 정합니다.</li>
                  <li>결제 후 기부액의 30% 한도 안에서 답례품을 고릅니다.</li>
                  <li>기부금 영수증은 연말정산 간소화 자료나 홈택스에서 조회됩니다.</li>
                  <li>연말정산 또는 종합소득세 신고 때 세액공제 항목에서 반영 여부를 확인합니다.</li>
                </ol>
                <p className="mt-4">
                  다만, 간소화 자료에 자동으로 잡히지 않는 경우가 있으므로, 신고 화면에서 고향사랑기부금 항목이 정확히 들어갔는지 반드시 확인하세요. 누락되면 경정청구로 나중에 돌려받을 수 있지만, 처음부터 챙기는 편이 번거로움이 적습니다.
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
                    <p className="mt-1 text-sm text-text-secondary">일반·법정·지정기부금의 공제율과 한도를 비교하세요.</p>
                  </Link>
                  <Link
                    href="/guide/year-end-tax-settlement/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">연말정산 완벽 가이드</div>
                    <p className="mt-1 text-sm text-text-secondary">공제 항목을 빠짐없이 챙겨 환급액을 늘리는 법.</p>
                  </Link>
                  <Link
                    href="/guide/income-deduction-vs-tax-credit-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">소득공제 vs 세액공제</div>
                    <p className="mt-1 text-sm text-text-secondary">두 공제의 차이를 이해하면 절세 전략이 보입니다.</p>
                  </Link>
                  <Link
                    href="/calculator/salary/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">연봉 실수령액 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">내 결정세액 규모를 먼저 가늠해 보세요.</p>
                  </Link>
                  <Link
                    href="/guide/credit-card-income-deduction-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">신용카드 소득공제</div>
                    <p className="mt-1 text-sm text-text-secondary">연말정산 대표 절세 항목의 한도와 계산법.</p>
                  </Link>
                  <Link
                    href="/category/tax/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">모든 세금 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">소득세·양도세·상속세 계산기 모음.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 교육 목적으로 작성되었으며, 개인 맞춤형 세무 조언이 아닙니다. 고향사랑기부금의 세액공제율, 연간 기부 한도, 답례품 규정은 개정될 수 있으므로 기부·신고 전 고향사랑e음과 국세청에서 최신 내용을 반드시 확인하세요. 실제 환급액은 개인의 결정세액 규모에 따라 달라집니다. 본 콘텐츠는 2026-07-30을 기준으로 작성되었으며, 관련 법령 개정 시 즉시 업데이트됩니다. 근거 법령: <strong>조세특례제한법 §58(고향사랑 기부금에 대한 세액공제), 고향사랑 기부금에 관한 법률</strong>. AI 보조 작성 후 운영자 검수 완료.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터</a>,{' '}
                  <a href="https://www.nts.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">국세청</a>,{' '}
                  <a href="https://www.ilovegohyang.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">고향사랑e음(행정안전부)</a>.
                </p>
              </section>

              <ShareButtons
                title="고향사랑기부제 2026 가이드"
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