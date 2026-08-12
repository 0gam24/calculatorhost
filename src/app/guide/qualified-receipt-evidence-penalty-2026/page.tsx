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

const URL = 'https://calculatorhost.com/guide/qualified-receipt-evidence-penalty-2026/';
const DATE_PUBLISHED = '2026-08-04';
const DATE_MODIFIED = '2026-08-04';

export const metadata: Metadata = {
  title: '적격증빙 증빙불비가산세 2026, 3만원 초과·미수취 2%',
  description:
    '사업 경비를 쓰고 세금계산서·카드전표·현금영수증 같은 적격증빙을 못 받으면, 3만원 초과 거래는 미수취 금액의 2% 가산세가 붙습니다. 적격증빙 4종, 3만원 기준, 제외 대상을 소득세법 §160의2·§81의6 기준으로 정리했습니다.',
  keywords: [
    '적격증빙 가산세',
    '증빙불비가산세 2%',
    '적격증빙 종류',
    '3만원 초과 증빙',
    '정규증명서류 미수취',
    '개인사업자 경비 증빙',
    '소득세법 160조의2',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '적격증빙 증빙불비가산세 2026' }],
    title: '적격증빙 증빙불비가산세 2026, 3만원 초과 미수취 2%',
    description: '세금계산서·계산서·카드전표·현금영수증 4종을 3만원 초과 거래에서 못 받으면 2% 가산세. 소득세법 §160의2·§81의6 기준 정리.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '적격증빙 증빙불비가산세 2026, 3만원 초과 2%',
    description: '적격증빙 4종을 3만원 초과 거래에서 미수취하면 그 금액의 2% 가산세. 소규모사업자는 제외. 소득세법 §160의2·§81의6.',
  },
};

const FAQ_ITEMS = [
  {
    question: '적격증빙이 정확히 무엇인가요?',
    answer:
      '국세청이 사업 경비의 지출을 공식적으로 인정하는 증빙서류입니다. 세금계산서, 계산서, 신용카드매출전표(체크카드 포함), 현금영수증 이 4가지가 적격증빙(정규증명서류)입니다(소득세법 §160의2). 이 증빙을 받아야 비용으로 인정받기 쉽고, 부가가치세 매입세액 공제도 받을 수 있습니다.',
  },
  {
    question: '증빙불비가산세는 얼마인가요?',
    answer:
      '적격증빙을 받지 않은 금액의 2%입니다(소득세법 §81의6). 건당 거래금액이 3만원을 초과하는데도 세금계산서 등 적격증빙 대신 간이영수증만 받거나 증빙이 없으면, 그 금액의 2%가 종합소득 결정세액에 더해집니다. 예를 들어 적격증빙 없이 쓴 경비가 500만원이면 10만원의 가산세가 붙습니다.',
  },
  {
    question: '3만원 이하 거래도 가산세가 있나요?',
    answer:
      '없습니다. 건당 거래금액(부가가치세 포함)이 3만원 이하이면 적격증빙 수취 의무가 면제되어 증빙불비가산세가 적용되지 않습니다. 다만 3만원을 넘으면 초과가 아니라 거래금액 전체가 대상이 되므로, 금액이 애매할 때는 적격증빙을 받아두는 것이 안전합니다.',
  },
  {
    question: '누구에게 가산세가 적용되나요?',
    answer:
      '장부를 갖춰야 하는 사업자에게 적용됩니다. 반대로 대통령령으로 정하는 소규모사업자(직전 과세기간 사업소득 수입금액이 4,800만원 미만인 경우, 해당 과세기간에 신규 개업한 경우, 연말정산 대상 사업소득만 있는 경우 등)와 소득금액을 추계로 계산하는 사업자는 증빙불비가산세 대상에서 제외됩니다.',
  },
  {
    question: '적격증빙이 없으면 비용 처리도 못 하나요?',
    answer:
      '가산세와 비용 인정은 별개입니다. 실제 지출 사실이 계약서, 이체내역 등으로 확인되면 비용으로 인정받을 수 있지만, 적격증빙을 못 받은 3만원 초과분에는 2% 가산세가 별도로 붙습니다. 즉 비용 인정과 가산세는 따로 판단되므로, 증빙이 없다고 무조건 경비가 전부 부인되는 것은 아닙니다.',
  },
  {
    question: '적격증빙 수취 의무가 면제되는 거래도 있나요?',
    answer:
      '있습니다. 건당 3만원 이하 거래, 농어민에게서 직접 재화나 용역을 공급받은 경우, 원천징수 대상 사업소득 지급 등 시행령이 정한 일정한 거래는 정규증명서류 수취 의무가 면제됩니다. 이런 거래는 간이영수증이나 거래명세로도 문제되지 않지만, 실제 지출 증빙은 보관해야 합니다.',
  },
  {
    question: '접대비도 적격증빙이 필요한가요?',
    answer:
      '접대비(기업업무추진비)는 더 엄격합니다. 건당 3만원(경조사비는 별도 기준)을 초과하는 접대비를 적격증빙 없이 지출하면 아예 비용으로 인정받지 못합니다. 일반 경비의 2% 가산세보다 강한 손금불산입 규정이 적용되므로, 접대성 지출은 반드시 법인카드나 세금계산서로 처리하세요.',
  },
  {
    question: '증빙은 얼마나 보관해야 하나요?',
    answer:
      '지출 증빙은 종합소득세 확정신고 기한이 지난 날부터 5년간 보관해야 합니다(소득세법 §160의2). 종이 영수증이 바래거나 분실되기 쉬우므로, 카드전표와 현금영수증은 홈택스에서 자동 집계되도록 사업용 신용카드와 사업자 현금영수증을 등록해 관리하는 것이 편리합니다.',
  },
  {
    question: '가산세를 피하려면 무엇을 해야 하나요?',
    answer:
      '3만원 초과 지출은 처음부터 적격증빙으로 받는 것이 원칙입니다. 거래처에 세금계산서를 요청하고, 사업용 신용카드로 결제하거나 사업자 지출 현금영수증을 받으세요. 사업용 신용카드를 홈택스에 등록하면 사용내역이 자동 수집되어 누락과 가산세 위험을 크게 줄일 수 있습니다.',
  },
];

export default function QualifiedReceiptEvidencePenalty2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '적격증빙 증빙불비가산세 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '적격증빙 증빙불비가산세 2026, 3만원 초과 미수취 2%',
    description:
      '적격증빙 4종, 3만원 초과 기준, 미수취 2% 가산세, 소규모사업자 제외, 접대비 손금불산입, 5년 보관까지 소득세법 §160의2와 §81의6 기준으로 정리한 개인사업자 경비 증빙 가이드.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['적격증빙', '증빙불비가산세', '정규증명서류', '개인사업자', '경비 증빙'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '적격증빙 증빙불비가산세 2026',
    description: '적격증빙 4종과 3만원 초과 미수취 2% 가산세를 소득세법 §160의2·§81의6 기준으로 정리한 가이드.',
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
                    { name: '적격증빙 증빙불비가산세 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">개인사업자·프리랜서 · 8분 읽기 · 2026-08-04</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  적격증빙 증빙불비가산세 2026
                  <br />
                  <span className="text-2xl text-text-secondary">3만원 초과 미수취 2%</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  이 가이드는 경비 처리를 직접 챙겨야 하는 개인사업자와 프리랜서를 위해 씁니다. 사업하며 돈을 썼는데 제대로 된 증빙을 못 받으면, 비용 인정 문제뿐 아니라 가산세까지 따라올 수 있습니다. 핵심은 적격증빙 4종을 3만원 초과 거래에서 반드시 받는 것입니다. 무엇이 적격증빙인지, 못 받으면 얼마를 더 내는지, 누가 예외인지 순서대로 정리했습니다.
                </p>
              </header>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">적격증빙이란 무엇인가</h2>
                <p>
                  국세청이 인정하는 4가지 지출 증빙입니다. 소득세법 §160의2는 사업자가 사업과 관련해 재화나 용역을 공급받으면 정규증명서류를 받아 보관하도록 정합니다. 이 정규증명서류가 곧 적격증빙이며, 세금계산서, 계산서, 신용카드매출전표, 현금영수증 4종입니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">30초 요약</p>
                  <ul className="mt-2 space-y-1 text-sm text-text-secondary list-disc ml-5">
                    <li>적격증빙 4종: 세금계산서·계산서·카드전표·현금영수증</li>
                    <li>기준: 건당 3만원 초과 거래</li>
                    <li>미수취 가산세: 미수취 금액의 2%</li>
                    <li>제외: 소규모사업자·추계신고자</li>
                    <li>근거: 소득세법 §160의2, §81의6</li>
                  </ul>
                </div>
                <p>
                  다만 간이영수증(수기 영수증)이나 거래명세서는 적격증빙이 아닙니다. 3만원 초과 거래에서 이런 서류만 받으면 증빙불비가산세 대상이 될 수 있습니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">가산세는 얼마이고 어떻게 계산되나요?</h2>
                <p>
                  미수취 금액의 2%입니다. 소득세법 §81의6은 사업자가 3만원 초과 거래에서 적격증빙을 받지 않거나 사실과 다른 증빙을 받으면, 그 금액의 2%를 가산세로 부과하도록 정합니다. 초과분이 아니라 거래금액 전체가 대상인 점이 중요합니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-2 mt-4">
                  <p className="font-semibold text-text-primary">사례. 적격증빙 없이 쓴 경비 계산</p>
                  <p className="text-sm text-text-secondary">
                    · 거래 A: 2만 8천원 간이영수증 → 3만원 이하, 가산세 없음
                    <br />
                    · 거래 B: 4만원 간이영수증 → 3만원 초과, 4만원 × 2% = 800원 가산세
                    <br />
                    · 거래 C: 300만원 세금계산서 미수취 → 300만원 × 2% = 6만원 가산세
                    <br />
                    · 한 해 미수취 합계 500만원 → 500만원 × 2% = 10만원 가산세
                  </p>
                </div>
                <p>
                  예외: 거래 A처럼 3만원 이하이면 가산세가 없지만, 거래 B처럼 3만원을 조금만 넘어도 전액이 대상입니다. 3만원 언저리 지출은 카드 결제로 통일하는 것이 안전합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">나는 가산세 대상인가요?</h2>
                <p>
                  장부 의무가 있는 사업자가 대상입니다. 반대로 규모가 작은 사업자와 추계로 신고하는 사업자는 증빙불비가산세에서 빠집니다. 내가 어느 쪽인지부터 확인해야 합니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 증빙불비가산세 적용 vs 제외 (개요)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">구분</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">대상 여부</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">비고</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">복식부기의무자</td>
                        <td className="p-3"><strong>적용</strong></td>
                        <td className="p-3">3만원 초과 미수취 2%</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">소규모사업자</td>
                        <td className="p-3">제외</td>
                        <td className="p-3">직전 수입 4,800만원 미만 등</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">신규 개업</td>
                        <td className="p-3">제외</td>
                        <td className="p-3">개업 과세기간</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">추계신고자</td>
                        <td className="p-3">제외</td>
                        <td className="p-3">소득금액 추계</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p>
                  다만 소규모사업자 판정 기준(수입금액, 업종)은 세부 요건이 있고 매년 달라질 수 있으므로, 정확한 대상 여부는 홈택스 신고 도움 자료나 세무 전문가로 확인하세요.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">증빙이 없으면 비용도 못 넣나요?</h2>
                <p>
                  가산세와 비용 인정은 별개입니다. 적격증빙이 없어도 실제 지출 사실이 계약서, 이체내역, 거래명세 등으로 확인되면 필요경비로 인정받을 수 있습니다. 다만 그 3만원 초과 지출에는 2% 증빙불비가산세가 별도로 붙습니다.
                </p>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li><strong>일반 경비:</strong> 증빙 없어도 실지출 확인 시 비용 인정 + 2% 가산세.</li>
                  <li><strong>접대비(기업업무추진비):</strong> 3만원 초과 적격증빙 미수취 시 비용 자체를 인정받지 못함(손금불산입).</li>
                  <li><strong>3만원 이하:</strong> 간이영수증으로도 비용 인정, 가산세 없음.</li>
                </ul>
                <p>
                  예외: 접대성 지출은 일반 경비보다 훨씬 엄격해 아예 비용에서 빠질 수 있으므로, 반드시 법인카드나 세금계산서로 처리해야 합니다.
                </p>
              </section>

              <section className="space-y-6 border-t border-border-base pt-8" data-speakable>
                <h2 className="text-2xl font-bold">가산세를 피하는 실무 습관</h2>
                <p>
                  3만원 초과 지출은 처음부터 적격증빙으로 받는 것이 최선입니다. 사후에 챙기려면 번거롭고 누락이 생기므로, 결제 단계에서 증빙이 자동으로 남게 만드는 것이 핵심입니다.
                </p>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li><strong>사업용 신용카드 등록:</strong> 홈택스에 등록하면 사용내역이 자동 수집되어 누락과 가산세 위험을 줄입니다.</li>
                  <li><strong>사업자 지출 현금영수증:</strong> 현금 결제 시 사업자번호로 지출증빙용 현금영수증을 받습니다.</li>
                  <li><strong>세금계산서 요청 습관:</strong> 거래처에 사업자등록번호를 주고 전자세금계산서를 요청합니다.</li>
                  <li><strong>5년 보관:</strong> 증빙은 확정신고 기한 후 5년간 보관합니다(소득세법 §160의2).</li>
                </ul>
                <p>
                  다만 자동 수집도 등록 누락이나 개인용 지출 혼입이 있을 수 있으므로, 신고 전 사용내역을 사업 관련 지출로 한 번 더 정리하는 것이 안전합니다.
                </p>
              </section>

              <h2 className="text-2xl font-bold mb-6">자주 묻는 질문</h2>
              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h3 className="text-lg font-semibold text-text-primary">관련 계산기 및 가이드</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link href="/calculator/freelancer-tax/" className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition">
                    <div className="font-semibold text-primary-500">프리랜서 종합소득세 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">경비율과 세액을 시뮬레이션하세요.</p>
                  </Link>
                  <Link href="/guide/business-credit-card-hometax-registration-2026/" className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition">
                    <div className="font-semibold text-primary-500">사업용 신용카드 등록</div>
                    <p className="mt-1 text-sm text-text-secondary">홈택스 등록으로 경비 자동 수집하기.</p>
                  </Link>
                  <Link href="/guide/bookkeeping-obligation-double-entry-vs-simple-2026/" className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition">
                    <div className="font-semibold text-primary-500">복식부기 vs 간편장부</div>
                    <p className="mt-1 text-sm text-text-secondary">기장 의무 판정과 무기장 가산세.</p>
                  </Link>
                  <Link href="/guide/freelancer-simplified-vs-standard-expense-rate-2026/" className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition">
                    <div className="font-semibold text-primary-500">단순경비율 vs 기준경비율</div>
                    <p className="mt-1 text-sm text-text-secondary">추계신고 경비율 적용 기준.</p>
                  </Link>
                  <Link href="/guide/business-use-account-registration-2026/" className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition">
                    <div className="font-semibold text-primary-500">사업용 계좌 신고</div>
                    <p className="mt-1 text-sm text-text-secondary">복식부기의무자 사업용 계좌 의무.</p>
                  </Link>
                  <Link href="/category/tax/" className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition">
                    <div className="font-semibold text-primary-500">모든 세금 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">종소세·부가세·양도세 모음.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 교육 목적으로 작성되었으며 개인 맞춤형 세무 조언이 아닙니다. 소규모사업자 판정, 접대비 손금불산입, 증빙 면제 거래 범위는 개별 사실관계와 매년 개정에 따라 달라집니다. 실제 가산세와 비용 인정은 반드시 관할 세무서, 국세청 상담(126), 홈택스로 확인하세요. 본 콘텐츠는 2026-08-04 기준이며 관련 법령은 <strong>소득세법 §160의2, §81의6</strong>을 따릅니다. AI 보조 작성 후 운영자 검수 완료.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터</a>,{' '}
                  <a href="https://www.nts.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">국세청</a>,{' '}
                  <a href="https://hometax.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">홈택스 사업용 신용카드</a>.
                </p>
              </section>

              <ShareButtons title="적격증빙 증빙불비가산세 2026 가이드" url={URL} />
            </article>
          </main>
        </div>
        <Footer />
      </div>
    </>
  );
}
