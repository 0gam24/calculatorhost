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

// 수익 레버 [revenue-lever: indexing+traffic]: 신규 색인 페이지 추가, 롱테일 트래픽 유입
const URL = 'https://calculatorhost.com/guide/credit-card-sales-vat-deduction-2026/';
const DATE_PUBLISHED = '2026-07-16';
const DATE_MODIFIED = '2026-07-16';

export const metadata: Metadata = {
  title: '신용카드 매출세액공제 2026, 부가세 최대 1000만원 깎는 법',
  description:
    '개인사업자가 신용카드·현금영수증 매출의 1.3%를 부가세에서 빼주는 신용카드 매출세액공제. 부가가치세법 §46 대상 요건, 연 1,000만원 한도, 2027년 축소 예정을 사례로 정리합니다.',
  keywords: [
    '신용카드 매출세액공제',
    '부가세 세액공제',
    '현금영수증 매출 공제',
    '개인사업자 부가세 절세',
    '신용카드 발행세액공제',
    '부가가치세법 46조',
    '간이과세자 세액공제',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '신용카드 매출세액공제 2026, 부가세 최대 1000만원 깎는 법' }],
    title: '신용카드 매출세액공제 2026, 부가세 1.3% 돌려받기',
    description: '개인사업자가 카드·현금영수증 매출의 1.3%를 부가세에서 공제받는 제도. 연 1,000만원 한도. 부가가치세법 §46.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '신용카드 매출세액공제 2026, 부가세 최대 1000만원 깎는 법',
    description: '카드·현금영수증 매출의 1.3%를 부가세 납부세액에서 공제. 연 1,000만원 한도. 부가가치세법 §46.',
  },
};

const FAQ_ITEMS = [
  {
    question: '신용카드 매출세액공제가 무엇인가요?',
    answer:
      '개인사업자가 신용카드·현금영수증 등으로 발생시킨 매출의 일정률을 부가세 납부세액에서 빼주는 제도입니다(부가가치세법 §46). 소비자에게 결제 내역이 투명하게 잡히는 만큼, 사업자의 세부담을 덜어주려는 취지입니다. 2026년 공제율은 발행금액의 1.3%입니다.',
  },
  {
    question: '공제율과 한도는 얼마인가요?',
    answer:
      '2026년 12월 31일까지는 발행금액의 1.3%, 연간 한도 1,000만원입니다. 예를 들어 카드·현금영수증 매출이 연 5,000만원이면 65만원을 공제받습니다. 다만 2027년 1월 1일부터는 공제율이 1.0%, 연간 한도가 500만원으로 축소될 예정이므로 적용 시점을 확인해야 합니다.',
  },
  {
    question: '누가 이 공제를 받을 수 있나요?',
    answer:
      '직전연도 재화·용역 공급가액이 10억원 이하인 개인사업자입니다(부가가치세법 §46). 일반과세자와 간이과세자 모두 대상이며, 부가세 신고 시 자동으로 반영되는 경우가 많습니다. 다만 법인사업자와 직전연도 공급가액이 10억원을 초과하는 개인사업자는 제외됩니다.',
  },
  {
    question: '어떤 매출이 공제 대상인가요?',
    answer:
      '신용카드·직불카드 매출전표, 현금영수증, 전자적 결제수단으로 발행한 매출이 대상입니다. 소비자를 상대로 한 소매·음식·서비스업처럼 카드·현금영수증 결제 비중이 높은 업종일수록 공제액이 커집니다. 세금계산서를 발급한 기업 간 거래(B2B)는 이 공제 대상이 아닙니다.',
  },
  {
    question: '부가세보다 공제액이 크면 환급되나요?',
    answer:
      '신용카드 매출세액공제는 납부할 세액을 한도로 공제되며, 이 공제로 인해 환급이 발생하지는 않습니다. 즉 낼 부가세가 0원이면 더 이상 돌려받을 것이 없습니다. 매입세액이 많아 이미 환급 상태인 경우 이 공제의 실익은 제한적입니다.',
  },
  {
    question: '간이과세자도 받을 수 있나요?',
    answer:
      '간이과세자도 대상에 포함됩니다. 다만 간이과세자는 부가세 계산 방식 자체가 달라, 세금계산서 발급 의무가 있는 간이과세자인지 등에 따라 실제 적용이 달라질 수 있습니다. 정확한 적용 여부는 홈택스 신고 화면이나 세무대리인에게 확인하는 것이 안전합니다.',
  },
  {
    question: '2027년에 정말 줄어드나요?',
    answer:
      '현행 규정상 2027년부터 공제율 1.0%, 한도 500만원으로 축소될 예정입니다. 이 제도는 그동안 여러 차례 한시 연장되며 1.3%·1,000만원 수준을 유지해왔으나, 향후 다시 연장될지 축소될지는 세법 개정에 달려 있습니다. 사업 계획을 세울 때는 축소 가능성을 함께 고려하세요.',
  },
  {
    question: '따로 신청해야 하나요?',
    answer:
      '부가세 신고서에 반영하면 됩니다. 홈택스로 부가세를 신고할 때 신용카드·현금영수증 발행금액이 집계되어 공제란에 자동 계산되는 경우가 많습니다. 다만 발행금액이 누락되지 않았는지, 대상 요건을 충족하는지는 신고 전에 직접 확인해야 합니다.',
  },
];

export default function CreditCardSalesVatDeduction2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '신용카드 매출세액공제 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '신용카드 매출세액공제 2026, 부가세 1.3% 돌려받기',
    description:
      '개인사업자가 신용카드·현금영수증 매출의 1.3%를 부가세 납부세액에서 공제받는 신용카드 매출세액공제의 대상 요건, 연 1,000만원 한도, 2027년 축소 예정을 사례로 정리. 부가가치세법 §46 기준.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['신용카드 매출세액공제', '부가세', '개인사업자', '현금영수증', '간이과세'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '신용카드 매출세액공제 2026',
    description:
      '개인사업자의 신용카드·현금영수증 매출세액공제 대상·공제율 1.3%·연 1,000만원 한도와 2027년 축소 정리.',
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
                    { name: '신용카드 매출세액공제 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">개인사업자·자영업자 · 8분 읽기 · 2026-07-16</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  신용카드 매출세액공제 2026
                  <br />
                  <span className="text-2xl text-text-secondary">부가세 최대 1000만원 깎는 법</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  손님이 카드나 현금영수증으로 결제하면 매출이 그대로 국세청에 잡혀 세부담이 커진다고 느끼는 사장님이 많습니다. 그런데 개인사업자에게는 이 카드·현금영수증 매출의 일부를 부가세에서 돌려주는 신용카드 매출세액공제가 있습니다. 이 가이드는 누가 얼마를 공제받는지, 2026년 공제율과 한도, 2027년 축소 예정까지 실제 계산과 함께 정리합니다.
                </p>
              </header>

              <AdSlot slot="guide-credit-card-sales-vat-deduction-top" format="horizontal" />

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">신용카드 매출세액공제란</h2>
                <p>
                  신용카드 매출세액공제는 개인사업자가 신용카드·현금영수증 등으로 발생시킨 매출의 일정률을 부가세 납부세액에서 빼주는 제도입니다(부가가치세법 §46). 결제 내역이 투명하게 노출되는 사업자의 세부담을 덜어주려는 취지입니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 text-sm">
                  <p className="font-semibold text-text-primary">정의</p>
                  <p className="mt-2 text-text-secondary">
                    신용카드 매출세액공제란, 직전연도 공급가액 10억원 이하 개인사업자가 카드·현금영수증 발행금액의 일정률을 부가세 납부세액에서 공제받는 제도(부가가치세법 §46)입니다.
                    <br />
                    핵심: 2026년 공제율 1.3%, 연 한도 1,000만원.
                  </p>
                </div>
                <p className="mt-4">
                  공제는 부가세 신고 때 납부세액에서 차감하는 방식으로 반영됩니다. 소비자를 상대하는 소매·음식·서비스업처럼 카드·현금영수증 결제 비중이 높은 사업일수록 공제액이 커집니다.
                </p>
                <p className="mt-4">
                  ⚠️ 다만 세금계산서를 발급하는 기업 간 거래(B2B) 매출은 이 공제 대상이 아닙니다. 카드·현금영수증·전자결제로 발행한 소비자 매출만 대상이라는 점을 혼동하지 마세요.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">2026년과 2027년, 무엇이 달라지나</h2>
                <p>
                  공제율과 한도는 적용 시점에 따라 다릅니다. 2026년 말까지는 1.3%·1,000만원이지만, 2027년부터는 축소될 예정입니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 신용카드 매출세액공제 공제율·한도 (부가가치세법 §46)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">적용 시기</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">공제율</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">연간 한도</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">2026년 12월 31일까지</td>
                        <td className="p-3"><strong>1.3%</strong></td>
                        <td className="p-3"><strong>1,000만원</strong></td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">2027년 1월 1일부터(예정)</td>
                        <td className="p-3">1.0%</td>
                        <td className="p-3">500만원</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  ⚠️ 다만 이 제도는 그동안 여러 차례 한시 연장되며 1.3%·1,000만원 수준을 유지해왔습니다. 2027년 축소가 실제로 시행될지, 다시 연장될지는 세법 개정에 달려 있으므로 신고 시점의 규정을 국세청에서 확인하세요.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">공제액은 어떻게 계산하나</h2>
                <p>
                  공제액은 카드·현금영수증 발행금액에 공제율을 곱해 계산하고, 연간 한도를 넘으면 한도까지만 공제합니다. 아래 세 사례로 살펴보겠습니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3">
                  <p className="font-semibold text-text-primary">사례 1. 발행금액 연 5,000만원 (2026년)</p>
                  <p className="text-sm text-text-secondary">
                    · 공제액 = 5,000만원 × 1.3% = <strong>65만원</strong>
                    <br />
                    · 한도(1,000만원) 이내이므로 65만원 전액 공제
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 2. 발행금액 연 1억원 (2026년)</p>
                  <p className="text-sm text-text-secondary">
                    · 공제액 = 1억원 × 1.3% = <strong>130만원</strong>
                    <br />
                    · 한도(1,000만원) 이내이므로 130만원 전액 공제
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 3. 한도를 초과하는 경우</p>
                  <p className="text-sm text-text-secondary">
                    · 발행금액이 커서 1.3%가 1,000만원을 넘는 경우
                    <br />
                    · 예: 계산상 공제액 1,040만원 → 한도 적용으로 <strong>1,000만원까지만 공제</strong>
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 연간 공제는 1,000만원(2026년 기준)을 넘을 수 없습니다.</span>
                  </p>
                </div>
                <p className="mt-4">
                  다만 공제는 납부할 부가세를 한도로 적용됩니다. 낼 세액보다 공제액이 크더라도 그 차액이 환급되지는 않는다는 점을 유의하세요.
                </p>
              </section>

              <AdSlot slot="guide-credit-card-sales-vat-deduction-mid" format="rectangle" />

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">놓치기 쉬운 함정은</h2>
                <p>
                  대상 요건을 잘못 판단하면 공제가 부인되거나 반대로 못 받고 넘어갈 수 있습니다. 실질과세 원칙(국세기본법 §14)상 요건을 실제로 충족해야 인정됩니다.
                </p>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li>
                    <strong>법인은 제외:</strong> 이 공제는 개인사업자 전용입니다. 법인사업자는 신용카드 매출세액공제를 받을 수 없습니다.
                  </li>
                  <li>
                    <strong>직전연도 10억 경계:</strong> 직전연도 공급가액이 10억원을 넘으면 대상에서 빠집니다. 매출이 성장해 경계를 넘는 해에는 공제 가능 여부를 다시 확인하세요.
                  </li>
                  <li>
                    <strong>발행금액 누락:</strong> 카드·현금영수증 발행금액이 신고서에 제대로 집계되지 않으면 공제가 줄어듭니다. 신고 전 홈택스 집계를 확인하세요.
                  </li>
                  <li>
                    <strong>업종·간이과세 특성:</strong> 간이과세자나 특정 업종은 계산 방식이 달라 실제 공제액이 예상과 다를 수 있습니다. 애매하면 세무대리인에게 확인하세요.
                  </li>
                </ul>
                <p className="mt-4">
                  ⚠️ 다만 공제율·한도·대상은 세법 개정으로 자주 조정됩니다. 신고 시점의 정확한 기준은 반드시 국세청 홈택스와 세무 전문가를 통해 확인하세요.
                </p>
              </section>

              <h2 className="text-2xl font-bold mb-6">자주 묻는 질문</h2>
              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h3 className="text-lg font-semibold text-text-primary">관련 계산기 및 가이드</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link
                    href="/guide/simplified-taxation-vat-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">간이과세 부가세 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">간이과세와 일반과세의 부가세 차이를 이해하세요.</p>
                  </Link>
                  <Link
                    href="/guide/vat-early-refund-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">부가세 조기환급</div>
                    <p className="mt-1 text-sm text-text-secondary">매입세액이 많을 때 빨리 돌려받는 방법.</p>
                  </Link>
                  <Link
                    href="/guide/business-registration-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">개인사업자 등록</div>
                    <p className="mt-1 text-sm text-text-secondary">사업 시작 시 과세유형 선택부터 확인하세요.</p>
                  </Link>
                  <Link
                    href="/guide/bookkeeping-obligation-double-entry-vs-simple-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">기장의무 복식·간편</div>
                    <p className="mt-1 text-sm text-text-secondary">사업자의 장부 작성 의무와 절세 관계.</p>
                  </Link>
                  <Link
                    href="/guide/freelancer-simplified-vs-standard-expense-rate-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">단순·기준경비율</div>
                    <p className="mt-1 text-sm text-text-secondary">경비율로 소득세를 계산하는 방법.</p>
                  </Link>
                  <Link
                    href="/category/tax/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">세금 계산기 모음</div>
                    <p className="mt-1 text-sm text-text-secondary">종소세·부가세·양도세 계산기를 한곳에서.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 교육 목적으로 작성되었으며 개인 맞춤형 세무 조언이 아닙니다. 공제율·한도·대상 요건은 세법 개정으로 달라질 수 있으므로 신고 전 국세청 홈택스(126)와 세무대리인에게 반드시 확인하세요. 본 콘텐츠는 2026-07-16 기준이며 관련 법령 개정 시 업데이트됩니다. 근거 조항은 <strong>부가가치세법 §46(신용카드등의 사용에 따른 세액공제), §37(납부세액), §61(간이과세), 국세기본법 §14(실질과세)</strong>입니다. AI 보조 작성 후 운영자 검수 완료.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터</a>,{' '}
                  <a href="https://www.hometax.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">국세청 홈택스</a>.
                </p>
              </section>

              <ShareButtons
                title="신용카드 매출세액공제 2026 가이드"
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
