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

const URL = 'https://calculatorhost.com/guide/simplified-taxpayer-tax-invoice-obligation-2026/';
const DATE_PUBLISHED = '2026-08-01';
const DATE_MODIFIED = '2026-08-01';

export const metadata: Metadata = {
  title: '간이과세자 세금계산서 발급 의무 2026, 매출 4,800만원 기준',
  description:
    '간이과세자도 직전연도 공급대가 4,800만원 이상이면 세금계산서를 의무 발급해야 합니다. 영수증 발급 대상, 매입세액공제, 간이과세 기준까지 부가가치세법 §36 기준으로 정리했습니다.',
  keywords: [
    '간이과세자 세금계산서',
    '세금계산서 발급 의무',
    '간이과세 4800만원',
    '간이과세자 영수증',
    '부가가치세법 36조',
    '매입세액공제',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '간이과세자 세금계산서 발급 의무 2026, 매출 4,800만원 기준' }],
    title: '간이과세자 세금계산서 발급 의무 2026',
    description: '직전연도 공급대가 4,800만원 이상 간이과세자는 세금계산서 의무 발급. 영수증 대상과 매입세액공제까지 정리.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '간이과세자 세금계산서 발급 의무 2026',
    description: '공급대가 4,800만원 기준으로 갈리는 세금계산서 의무 발급과 영수증 발급을 정리.',
  },
};

const FAQ_ITEMS = [
  {
    question: '간이과세자도 세금계산서를 발급해야 하나요?',
    answer:
      '직전연도 공급대가가 4,800만원 이상인 간이과세자는 세금계산서를 의무 발급해야 합니다(부가가치세법 §36). 4,800만원 미만이거나 신규 사업자는 세금계산서를 발급할 수 없고 영수증을 발급합니다. 과거에는 간이과세자 전체가 세금계산서를 발급할 수 없었지만, 2021년 7월부터 기준이 바뀌었습니다.',
  },
  {
    question: '4,800만원 기준은 무엇을 뜻하나요?',
    answer:
      '직전 연도 1년간 공급대가(부가세 포함 매출) 합계가 4,800만원인지가 기준입니다. 이 금액 이상이면 세금계산서 발급 의무 사업자로 전환되고, 미만이면 영수증 발급 대상으로 남습니다. 신규 개업자는 직전연도 실적이 없으므로 첫해에는 영수증 발급 대상입니다.',
  },
  {
    question: '어떤 업종은 무조건 영수증만 발급하나요?',
    answer:
      '주로 최종 소비자를 상대하는 소매업, 음식점업, 숙박업, 미용·목욕 등 서비스업, 여객운송업은 영수증 발급 대상 업종입니다. 이런 업종은 공급대가가 4,800만원을 넘어도 상대가 사업자가 아니면 영수증을 발급하는 것이 원칙입니다. 다만 공급받는 사업자가 요구하면 세금계산서를 발급해야 하는 경우가 있습니다.',
  },
  {
    question: '간이과세자에게 받은 세금계산서로 매입세액공제가 되나요?',
    answer:
      '됩니다. 공급대가 4,800만원 이상 간이과세자가 발급한 세금계산서는 일반과세자와 거래할 때처럼 매입세액공제를 받을 수 있습니다. 그래서 거래처가 사업자라면 세금계산서 발급 가능 여부가 거래 유지에 중요합니다.',
  },
  {
    question: '간이과세 적용 기준은 얼마인가요?',
    answer:
      '연 매출(공급대가) 1억 400만원 미만이면 간이과세를 적용받을 수 있습니다(2024년 7월 상향). 다만 부동산임대업·과세유흥장소 등 일부 업종은 기준이 4,800만원으로 더 낮게 유지됩니다. 매출이 기준을 넘으면 다음 과세기간부터 일반과세자로 전환됩니다.',
  },
  {
    question: '세금계산서를 발급하지 않으면 어떻게 되나요?',
    answer:
      '발급 의무가 있는데 발급하지 않으면 미발급·지연발급 가산세가 부과됩니다. 또한 거래 상대방이 매입세액공제를 받지 못해 거래 관계에 불이익이 생길 수 있습니다. 발급 의무 여부가 헷갈리면 홈택스나 세무서에서 본인의 사업자 유형을 먼저 확인하세요.',
  },
  {
    question: '간이과세자도 부가세 신고를 하나요?',
    answer:
      '네, 간이과세자는 1년에 한 번, 다음 해 1월에 부가가치세를 신고·납부합니다. 세금계산서를 발급한 간이과세자는 발급분에 대해 예정부과 또는 예정신고 의무가 추가될 수 있으므로, 발급 실적이 있으면 신고 일정을 더 꼼꼼히 챙겨야 합니다.',
  },
];

export default function SimplifiedTaxpayerTaxInvoiceObligation2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '간이과세자 세금계산서 발급 의무 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '간이과세자 세금계산서 발급 의무 2026, 공급대가 4,800만원 기준',
    description:
      '간이과세자 세금계산서 의무 발급 기준(공급대가 4,800만원), 영수증 발급 대상 업종, 매입세액공제, 간이과세 적용 기준까지 부가가치세법 §36 기준으로 정리.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['간이과세자', '세금계산서', '4800만원', '영수증', '매입세액공제'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '간이과세자 세금계산서 발급 의무 2026',
    description:
      '공급대가 4,800만원을 기준으로 갈리는 간이과세자 세금계산서·영수증 발급을 정리한 실전 가이드.',
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
                    { name: '간이과세자 세금계산서 발급 의무 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">프리랜서·1인 사업자 · 7분 읽기 · 2026-08-01</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  간이과세자 세금계산서 발급 의무 2026
                  <br />
                  <span className="text-2xl text-text-secondary">매출 4,800만원 기준으로 갈린다</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  거래처가 세금계산서를 끊어달라고 하는데 나는 간이과세자라 발급이 되는지 헷갈리는 경우가 많습니다. 예전에는 간이과세자면 무조건 세금계산서를 못 끊었지만, 2021년 7월부터 규정이 바뀌어 매출 규모에 따라 발급 의무가 생깁니다. 이 가이드는 공급대가 4,800만원을 기준으로 세금계산서 의무 발급과 영수증 발급이 어떻게 갈리는지, 매입세액공제와 간이과세 기준까지 1인 사업자 관점에서 정리합니다.
                </p>
              </header>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">간이과세자도 세금계산서를 끊어야 하나요?</h2>
                <p>
                  직전연도 공급대가 4,800만원 이상이면 끊어야 합니다. 부가가치세법 §36은 영수증을 발급하는 사업자의 범위를 정하는데, 여기서 벗어나는 간이과세자(공급대가 4,800만원 이상)는 원칙적으로 세금계산서를 발급해야 합니다. 4,800만원 미만이거나 신규 개업자는 세금계산서를 발급할 수 없고 영수증을 발급합니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">핵심 기준</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    직전연도 공급대가 4,800만원 이상 간이과세자: 세금계산서 발급 의무
                    <br />
                    직전연도 공급대가 4,800만원 미만 또는 신규 사업자: 영수증 발급
                    <br />
                    소매·음식·숙박·미용 등 최종소비자 상대 업종: 영수증 발급 원칙
                  </p>
                </div>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">발급 유형이 어떻게 나뉘나요?</h2>
                <p>
                  매출 규모와 업종에 따라 세 갈래로 나뉩니다. 아래 표로 본인이 어디에 해당하는지 확인해 보세요.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 간이과세자 발급 유형 구분 (부가가치세법 §36 기준)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">구분</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">발급 서류</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">매입세액공제</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">공급대가 4,800만원 이상 (일반 거래)</td>
                        <td className="p-3"><strong>세금계산서</strong></td>
                        <td className="p-3">가능</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">공급대가 4,800만원 미만</td>
                        <td className="p-3">영수증</td>
                        <td className="p-3">불가</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">신규 개업자 (직전연도 실적 없음)</td>
                        <td className="p-3">영수증</td>
                        <td className="p-3">불가</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">소매·음식·숙박 등 소비자 상대 업종</td>
                        <td className="p-3">영수증 원칙</td>
                        <td className="p-3">해당 없음</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  다만 소비자 상대 업종이라도 공급받는 상대가 사업자로서 세금계산서를 요구하면 발급해야 하는 경우가 있습니다. 거래 상대가 누구인지에 따라 실무가 달라집니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">매입세액공제는 왜 중요한가요?</h2>
                <p>
                  거래처가 낸 부가세를 돌려받는 열쇠이기 때문입니다. 공급대가 4,800만원 이상 간이과세자가 발급한 세금계산서는 일반과세자 거래처가 매입세액공제를 받을 수 있습니다. 반대로 영수증만 발급하는 간이과세자와 거래하면 상대는 그 부가세를 공제받지 못합니다.
                </p>
                <p>
                  그래서 사업자 거래처가 많은 프리랜서나 1인 사업자라면, 세금계산서 발급이 가능한 유형인지가 거래 유지에 직접 영향을 줍니다. 발급이 안 되면 거래처가 다른 세금계산서 발급 사업자를 찾을 수 있기 때문입니다.
                </p>
                <p>
                  예외: 최종 소비자(비사업자)를 상대하는 거래는 상대가 매입세액공제를 받을 일이 없으므로 세금계산서 발급 실익이 크지 않습니다. 이 경우 현금영수증·신용카드 매출전표로 대체됩니다.
                </p>
              </section>

              <section className="space-y-6 border-t border-border-base pt-8">
                <h2 className="text-2xl font-bold">간이과세 기준과 일반과세 전환</h2>
                <p>
                  간이과세 자체를 적용받을 수 있는 기준도 알아두어야 합니다. 연 매출(공급대가)이 1억 400만원 미만이면 간이과세를 적용받을 수 있습니다(2024년 7월 8,000만원에서 상향).
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 2. 간이과세 관련 매출 기준 (2026 기준)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">기준</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">금액</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">간이과세 적용 상한 (일반 업종)</td>
                        <td className="p-3">연 매출 1억 400만원 미만</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">세금계산서 발급 의무 시작</td>
                        <td className="p-3">직전연도 공급대가 4,800만원 이상</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">부동산임대·과세유흥장소 간이 상한</td>
                        <td className="p-3">4,800만원 미만</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  다만 매출이 간이과세 상한을 넘으면 다음 과세기간부터 일반과세자로 자동 전환되어, 세금계산서 발급과 매입세액공제 규정이 전면적으로 적용됩니다. 정확한 업종별 기준과 전환 시점은 홈택스에서 확인하세요.
                </p>
              </section>

              <h2 className="text-2xl font-bold mb-6">자주 묻는 질문</h2>
              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h3 className="text-lg font-semibold text-text-primary">관련 계산기 및 가이드</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link
                    href="/calculator/freelancer-tax/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">프리랜서 종합소득세 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">사업소득 경비와 세액을 계산해보세요.</p>
                  </Link>
                  <Link
                    href="/guide/simplified-taxation-vat-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">간이과세 부가세 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">간이과세자 부가세 신고·납부의 기본.</p>
                  </Link>
                  <Link
                    href="/guide/simplified-taxation-waiver-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">간이과세 포기</div>
                    <p className="mt-1 text-sm text-text-secondary">일반과세 전환이 유리한 경우와 절차.</p>
                  </Link>
                  <Link
                    href="/guide/business-registration-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">사업자등록 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">간이·일반 과세 유형 선택 기준.</p>
                  </Link>
                  <Link
                    href="/guide/credit-card-sales-vat-deduction-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">신용카드 매출 세액공제</div>
                    <p className="mt-1 text-sm text-text-secondary">카드·현금영수증 발행세액공제 정리.</p>
                  </Link>
                  <Link
                    href="/category/tax/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">모든 세금 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">부가세·종합소득세·원천세 모음.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 교육 목적으로 작성되었으며, 개인 맞춤형 세무 조언이 아닙니다. 세금계산서 발급 의무 여부, 공급대가 기준 판정, 업종별 영수증 발급 규정, 간이과세 적용 여부는 개별 사업자의 업종·매출·거래 상대에 따라 달라지므로, 반드시 홈택스 또는 관할 세무서에서 본인의 사업자 유형을 확인하세요. 본 콘텐츠의 기준은 <strong>부가가치세법 §36(영수증 발급)</strong>, <strong>부가가치세법 §32(세금계산서)</strong>, <strong>부가가치세법 §61(간이과세)</strong>을 따르며, 구체적 금액 기준은 시행령과 국세청 고시를 따릅니다. 2026-08-01 기준으로 작성되었습니다. AI 보조 작성 후 운영자 검수 완료.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터(부가가치세법)</a>,{' '}
                  <a href="https://www.hometax.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">국세청 홈택스</a>,{' '}
                  <a href="https://www.nts.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">국세청</a>.
                </p>
              </section>

              <ShareButtons
                title="간이과세자 세금계산서 발급 의무 2026 가이드"
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
