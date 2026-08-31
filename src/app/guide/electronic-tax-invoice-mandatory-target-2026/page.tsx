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

const URL = 'https://calculatorhost.com/guide/electronic-tax-invoice-mandatory-target-2026/';
const DATE_PUBLISHED = '2026-08-31';
const DATE_MODIFIED = '2026-08-31';

export const metadata: Metadata = {
  title: '전자세금계산서 의무발급 대상 기준 2026',
  description:
    '법인사업자는 전원, 개인사업자는 직전연도 공급가액 8천만원 이상이면 전자세금계산서를 의무 발급해야 합니다. 기준금액 계산법, 의무 시작 시점, 종이 발급 시 불이익까지 부가가치세법 §32·시행령 §68 기준으로 정리했습니다.',
  keywords: [
    '전자세금계산서 의무발급',
    '전자세금계산서 대상',
    '전자세금계산서 8천만원',
    '개인사업자 전자세금계산서',
    '법인사업자 세금계산서',
    '부가가치세법 32조',
    '시행령 68조',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '전자세금계산서 의무발급 대상 기준 2026' }],
    title: '전자세금계산서 의무발급 대상 기준 2026',
    description: '법인사업자는 전원, 개인사업자는 직전연도 공급가액 8천만원 이상이면 의무 발급. 기준금액과 시작 시점을 정리했습니다.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '전자세금계산서 의무발급 대상 기준 2026',
    description: '법인사업자 전원, 개인사업자는 공급가액 8천만원 이상. 부가가치세법 §32·시행령 §68 기준.',
  },
};

const FAQ_ITEMS = [
  {
    question: '전자세금계산서 의무발급 대상은 누구인가요?',
    answer:
      '모든 법인사업자와, 직전연도 사업장별 공급가액(면세 포함) 합계액이 8천만원 이상인 개인사업자입니다(부가가치세법 §32②, 시행령 §68①). 법인사업자는 매출 규모와 무관하게 2011년 1월부터 전원 대상이고, 개인사업자만 기준금액이 적용됩니다.',
  },
  {
    question: '8천만원은 부가세 포함 금액인가요?',
    answer:
      '아닙니다. 공급가액, 즉 부가세를 제외한 금액 기준입니다. 과세공급가액뿐 아니라 면세공급가액까지 합산하며, 사업장이 여러 곳이면 사업장별로 각각 판정하는 것이 아니라 사업장별 공급가액의 합계액으로 판단합니다.',
  },
  {
    question: '작년에 8천만원을 넘었는데 올해는 매출이 줄었습니다. 의무가 없어지나요?',
    answer:
      '없어지지 않습니다. 시행령 §68①은 한 번 8천만원 이상 기준을 충족한 개인사업자는 그 이후 공급가액이 8천만원 미만으로 줄어도 계속 전자세금계산서 의무발급 대상으로 유지된다고 규정합니다. 매출이 줄었다는 이유만으로 종이 발급으로 되돌릴 수 없습니다.',
  },
  {
    question: '기준을 넘으면 바로 다음 달부터 의무가 시작되나요?',
    answer:
      '아닙니다. 직전연도 공급가액이 8천만원 이상이 된 해의 다음 해 제2기 과세기간이 시작하는 날, 즉 7월 1일부터 의무가 시작됩니다(시행령 §68②). 예를 들어 2025년 공급가액이 8천만원을 넘었다면 2026년 7월 1일부터 발급 의무가 생깁니다.',
  },
  {
    question: '수정신고나 세무서 경정으로 뒤늦게 8천만원을 넘긴 걸 알았다면 언제부터인가요?',
    answer:
      '수정신고나 결정·경정으로 그 사실이 확인된 경우에는 확인된 과세기간의 다음 과세기간부터 전자세금계산서 발급 의무가 생깁니다(시행령 §68② 단서). 통상적인 다음 해 7월 1일 기준보다 앞당겨질 수 있으므로, 국세청에서 발급의무 통지를 받으면 시작 시점을 꼭 확인해야 합니다.',
  },
  {
    question: '전자세금계산서 대신 종이로 발급하면 어떻게 되나요?',
    answer:
      '전자세금계산서 의무발급 대상자가 종이세금계산서를 발급하면 세금계산서 불성실가산세가 적용될 수 있습니다. 구체적인 지연발급·미발급 가산세율과 계산 방법은 별도 가이드에서 다룹니다.',
  },
  {
    question: '간이과세자도 전자세금계산서 의무발급 대상인가요?',
    answer:
      '간이과세자는 원칙적으로 이 기준과 별개입니다. 간이과세자는 직전연도 공급대가 4,800만원을 기준으로 세금계산서 발급 여부 자체가 갈리며(부가가치세법 §36), 세금계산서를 발급하는 간이과세자라도 전자세금계산서 의무발급 기준(8천만원)에 도달하지 않으면 종이로 발급할 수 있습니다.',
  },
];

export default function ElectronicTaxInvoiceMandatoryTarget2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '전자세금계산서 의무발급 대상 기준 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '전자세금계산서 의무발급 대상 기준 2026',
    description:
      '법인사업자 전원, 개인사업자 직전연도 공급가액 8천만원 이상 기준의 전자세금계산서 의무발급 대상과 시작 시점, 종이 발급 시 불이익을 부가가치세법 §32·시행령 §68 기준으로 정리.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['전자세금계산서', '의무발급', '개인사업자', '법인사업자', '부가가치세법 32조'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '전자세금계산서 의무발급 대상 기준 2026',
    description: '법인사업자 전원, 개인사업자 공급가액 8천만원 이상의 전자세금계산서 의무발급 기준과 시작 시점.',
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
                    { name: '전자세금계산서 의무발급 대상 기준 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">사업자 · 7분 읽기 · 2026-08-31</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  전자세금계산서 의무발급 대상 기준 2026
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  홈택스에서 세금계산서를 끊을 때 전자로 해야 하는지, 종이로 해도 되는지 헷갈리는 사업자가 많습니다. 이 가이드는 전자세금계산서를 의무적으로 발급해야 하는 법인사업자와 개인사업자의 기준, 기준금액 계산 방법, 의무가 실제로 시작되는 시점을 부가가치세법 §32와 시행령 §68을 근거로 정리합니다. 대상 독자는 개인·법인사업자와 예비 창업자입니다.
                </p>
              </header>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">전자세금계산서 의무발급 대상은 누구인가요?</h2>
                <p>
                  법인사업자는 전원, 개인사업자는 직전연도 공급가액 8천만원 이상이면 대상입니다. 부가가치세법 §32②는 법인사업자와 대통령령으로 정하는 개인사업자에게 전자적 방법으로 세금계산서를 발급할 의무를 지웁니다. 여기서 "대통령령으로 정하는 개인사업자"의 기준금액을 정한 것이 시행령 §68①입니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">30초 요약</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    정의: 전자적 방식으로만 세금계산서를 발급해야 하는 사업자 범위.
                    <br />
                    법인: 매출 규모 무관, 전원 대상(2011.1~).
                    <br />
                    개인: 직전연도 공급가액(면세 포함) 8천만원 이상.
                    <br />
                    시작: 기준 충족 다음 해 7월 1일부터, 이후 매출이 줄어도 계속 유지.
                  </p>
                </div>
                <p>
                  다만, 개인사업자는 8천만원이라는 고정된 숫자 하나만 보면 안 됩니다. 어떤 공급가액을 어떻게 합산하는지, 언제부터 실제 발급 의무가 발생하는지가 함께 정해져야 판정이 끝나기 때문입니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">개인사업자 기준금액 8천만원은 어떻게 계산하나요?</h2>
                <p>
                  직전연도 사업장별 재화·용역 공급가액의 합계액으로 계산합니다. 시행령 §68①에 따라 과세공급가액뿐 아니라 면세공급가액까지 포함해 합산하며, 부가세를 더한 공급대가가 아니라 부가세를 뺀 공급가액이 기준입니다. 사업장이 여러 곳이면 사업장별로 각각 판정하는 것이 아니라 전체 사업장의 공급가액을 합쳐 판단합니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 개인사업자 전자세금계산서 기준금액 변천 (국세청 안내, 시행령 §68①)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">기준연도</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">기준금액</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">의무 적용 기간</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">2021년</td>
                        <td className="p-3">2억원</td>
                        <td className="p-3">2022.7.1.~2023.6.30.</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">2022년</td>
                        <td className="p-3">1억원</td>
                        <td className="p-3">2023.7.1.~2024.6.30.</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">2023년 이후</td>
                        <td className="p-3">8천만원</td>
                        <td className="p-3">2024.7.1.~계속(2026 현행)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  예외: 기준금액은 여러 차례 낮아져 온 역사가 있습니다. 2020년 기준 3억원에서 시작해 매년 낮아졌고 2023년 기준연도부터 8천만원으로 정착했습니다. 과거 자료나 오래된 블로그 글에는 1억원·3억원 등 구버전 기준이 남아 있을 수 있으므로, 지금 판정할 때는 반드시 8천만원 기준을 적용해야 합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">기준을 넘으면 언제부터 의무가 시작되나요?</h2>
                <p>
                  기준을 충족한 해의 다음 해 7월 1일부터 시작됩니다. 시행령 §68②는 사업장별 공급가액의 합계액이 8천만원 이상인 해의 다음 해 제2기 과세기간이 시작하는 날, 즉 7월 1일부터 전자세금계산서를 발급해야 한다고 정합니다. 예를 들어 2025년 공급가액이 8천만원을 넘었다면 2026년 7월 1일부터 의무가 발생합니다.
                </p>
                <p>
                  다만, 수정신고나 국세청의 결정·경정으로 뒤늦게 8천만원 이상이었다는 사실이 확인된 경우에는 그 사실이 확인된 과세기간의 다음 과세기간부터 의무가 생깁니다(시행령 §68② 단서). 이 경우 통상적인 7월 1일 기준보다 시작 시점이 앞당겨질 수 있으므로, 국세청에서 발급의무 통지서를 받으면 안내된 시작일을 그대로 따라야 합니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례. 신규 개인사업자의 공급가액이 처음 8천만원을 넘긴 경우</p>
                  <p className="text-sm text-text-secondary">
                    · 2025년 공급가액(과세+면세) 합계: 9,200만원
                    <br />
                    · 판정: 8천만원 이상이므로 전자세금계산서 의무발급 대상 확정
                    <br />
                    · 의무 시작일: 2026년 7월 1일
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 2026년 상반기(1기)까지는 종이 발급도 가능하지만, 7월 1일 거래분부터는 전자로만 발급해야 합니다.</span>
                  </p>
                </div>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">법인사업자는 예외 없이 모두 대상인가요?</h2>
                <p>
                  네, 법인사업자는 매출 규모나 업종과 무관하게 전원 대상입니다. 부가가치세법 §32②는 개인사업자와 달리 법인사업자에게 별도의 기준금액을 두지 않으며, 국세청도 법인사업자는 2011년 1월부터 전자세금계산서 발급의무가 전면 시행되었다고 안내합니다. 신설 법인이라도 설립 직후 첫 거래부터 전자로 발급해야 합니다.
                </p>
                <p>
                  다만, 법인이 아닌 국가·지방자치단체·비영리법인처럼 법인격이 있어도 실질적으로 세금계산서 발급 자체를 하지 않는 경우는 이 논의와 별개입니다. 발급 대상 거래인지, 즉 과세대상 재화·용역의 공급인지부터 먼저 확인해야 합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">종이로 발급하면 어떤 불이익이 있나요?</h2>
                <p>
                  전자세금계산서 의무발급 대상자가 종이세금계산서를 발급하면 세금계산서 불성실가산세 대상이 됩니다. 전자로 발급해야 할 의무가 있는데도 종이로 발급한 경우, 발급 자체를 늦게 한 지연발급·미발급과는 별도로 전자 방식 위반이 함께 문제될 수 있습니다.
                </p>
                <p>
                  다만, 구체적인 가산세율과 지연발급·미발급·전송 지연 유형별 계산 방법은 별도로 다룰 만큼 내용이 많습니다. 아래 세금계산서 지연발급 가산세 가이드에서 유형별 가산세 기준을 확인하세요.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">간이과세자도 이 기준의 적용을 받나요?</h2>
                <p>
                  간이과세자는 전자세금계산서 의무발급 기준(8천만원)과는 별개의 잣대로 판단합니다. 간이과세자는 직전연도 공급대가 4,800만원을 기준으로 세금계산서를 발급할 수 있는지 자체가 갈리며(부가가치세법 §36), 세금계산서를 발급하는 간이과세자라도 8천만원에 미달하면 종이로 발급할 수 있습니다.
                </p>
                <p>
                  다만, 실무에서는 두 기준(간이과세자 4,800만원, 전자세금계산서 8천만원)을 혼동하는 경우가 많습니다. 간이과세자 중에서도 공급대가가 8천만원을 넘긴다면 전자세금계산서 의무발급 대상에도 함께 해당할 수 있으므로, 자신의 매출 규모에 두 기준을 각각 대입해봐야 합니다.
                </p>
              </section>

              <h2 className="text-2xl font-bold mb-6">자주 묻는 질문</h2>
              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h3 className="text-lg font-semibold text-text-primary">관련 계산기 및 가이드</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link
                    href="/guide/tax-invoice-late-issuance-penalty-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">세금계산서 지연발급 가산세</div>
                    <p className="mt-1 text-sm text-text-secondary">기한을 넘겨 발급하면 붙는 가산세 유형과 산정 방법.</p>
                  </Link>
                  <Link
                    href="/guide/simplified-taxpayer-tax-invoice-obligation-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">간이과세자 세금계산서 발급 의무</div>
                    <p className="mt-1 text-sm text-text-secondary">공급대가 4,800만원 기준 간이과세자 발급 의무 정리.</p>
                  </Link>
                  <Link
                    href="/guide/revised-tax-invoice-issuance-reasons-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">수정세금계산서 발급 사유</div>
                    <p className="mt-1 text-sm text-text-secondary">이미 발급한 세금계산서를 고쳐야 할 때의 절차.</p>
                  </Link>
                  <Link
                    href="/calculator/vat/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">부가가치세 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">매출·매입 세액을 입력해 납부세액을 계산해보세요.</p>
                  </Link>
                  <Link
                    href="/calculator/freelancer-tax/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">프리랜서 종합소득세 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">개인사업자·프리랜서의 예상 세액을 확인해보세요.</p>
                  </Link>
                  <Link
                    href="/category/tax/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">모든 세금 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">양도세·취득세·상속세·부가세 모음.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 교육 목적으로 작성되었으며, 개인 맞춤형 세무 조언이 아닙니다. 전자세금계산서 발급 의무 여부는 사업장 수, 과세·면세 공급가액 구성, 신규 개업 여부 등 개별 사정에 따라 달라지므로, 반드시 홈택스 또는 관할 세무서에서 본인의 발급의무 통지 여부를 확인하세요. 인용 법조항: 부가가치세법 §32(세금계산서 등), 시행령 §68(전자세금계산서의 발급 등), 부가가치세법 §36(영수증). 본 콘텐츠는 2026-08-31을 기준으로 작성되었으며, 이 글은 AI 보조로 자동 생성되어 자동 품질 게이트를 통과한 뒤 발행되었습니다. 발행 시점에 사람의 사전 검수는 없었으며, 운영자가 사후 점검합니다. 관련 법령·고시 변경 시 업데이트됩니다.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터</a>,{' '}
                  <a href="https://www.nts.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">국세청</a>,{' '}
                  <a href="https://www.hometax.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">홈택스</a>.
                </p>
              </section>

              <ShareButtons
                title="전자세금계산서 의무발급 대상 기준 2026 가이드"
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
