// [revenue-lever: indexing+traffic] 자동차 구입 시 세금 4종 총정리(개소세·교육세·부가세·취득세) (자동차 구매자 롱테일 흡수)
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

const URL = 'https://calculatorhost.com/guide/car-purchase-taxes-breakdown-2026/';
const DATE_PUBLISHED = '2026-08-25';
const DATE_MODIFIED = '2026-08-25';

export const metadata: Metadata = {
  title: '자동차 살 때 세금 2026, 개소세·교육세·부가세·취득세',
  description:
    '새 차를 사면 개별소비세 5%, 교육세, 부가가치세 10%, 취득세 7%가 순서대로 붙습니다. 공급가액 3천만원 차량 기준 세금 총액과 계산 순서, 전기차·경차 감면까지 정리합니다(개별소비세법 §1, 지방세법 §12).',
  keywords: [
    '자동차 구입 세금',
    '자동차 개별소비세',
    '자동차 취득세',
    '신차 세금',
    '자동차 교육세',
    '자동차 부가가치세',
    '지방세법 12조',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '자동차 살 때 세금 2026, 개소세·교육세·부가세·취득세' }],
    title: '자동차 살 때 붙는 세금 4종 총정리 2026',
    description: '개별소비세 5%, 교육세 30%, 부가세 10%, 취득세 7%가 어떤 순서로 매겨지는지 계산 사례로 정리.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '자동차 살 때 세금 2026, 개소세·교육세·부가세·취득세',
    description: '공급가액 3천만원 차량 기준 세금 총액과 계산 순서, 전기차·경차 감면까지.',
  },
};

const FAQ_ITEMS = [
  {
    question: '차를 살 때 붙는 세금은 모두 몇 가지인가요?',
    answer:
      '크게 4가지입니다. 차량을 만들 때 붙는 개별소비세, 그 개별소비세에 붙는 교육세, 이 셋을 합한 금액에 붙는 부가가치세, 그리고 차를 등록할 때 내는 취득세입니다. 앞의 세 가지(개소세·교육세·부가세)는 차값에 이미 포함되어 있고, 취득세만 등록 단계에서 별도로 납부합니다.',
  },
  {
    question: '자동차 개별소비세율은 얼마인가요?',
    answer:
      '비영업용 승용자동차의 개별소비세 기본세율은 공급가액의 5%입니다(개별소비세법 §1). 배기량과 무관하게 5%가 적용되며, 정부가 경기 대응으로 한시적 인하(탄력세율)를 적용하는 시기도 있으므로 구입 시점의 적용 세율은 기획재정부·국세청 고시를 확인하세요. 1,000cc 미만 경차는 개별소비세가 면제됩니다.',
  },
  {
    question: '교육세와 부가가치세는 어떻게 계산하나요?',
    answer:
      '교육세는 개별소비세액의 30%입니다(교육세법 §5). 부가가치세는 공급가액에 개별소비세와 교육세를 더한 금액의 10%입니다(부가가치세법 §29). 즉 세금 위에 세금이 붙는 구조이므로, 개별소비세가 오르면 교육세와 부가세도 함께 늘어납니다.',
  },
  {
    question: '취득세 7%는 무엇을 기준으로 매기나요?',
    answer:
      '비영업용 승용차 취득세율은 7%이며(지방세법 §12), 과세표준은 공급가액에 개별소비세와 교육세를 더한 금액입니다. 부가가치세는 취득세 과세표준에서 제외됩니다. 경차(1,000cc 미만)는 4%, 영업용 승용차는 4%가 적용됩니다.',
  },
  {
    question: '공급가액 3천만원짜리 차를 사면 세금이 총 얼마인가요?',
    answer:
      '공급가액 3,000만원 기준으로 개별소비세 150만원, 교육세 45만원, 부가가치세 약 319.5만원이 차값에 포함되고, 등록 시 취득세 약 223.65만원을 별도로 냅니다. 이렇게 붙는 세금 총액은 약 738만원이며, 소비자가 실제로 지불하는 차값은 약 3,514.5만원이 됩니다.',
  },
  {
    question: '전기차나 경차는 세금을 얼마나 아낄 수 있나요?',
    answer:
      '전기차·수소차는 개별소비세와 취득세를 한도 내에서 감면받고, 경차는 개별소비세 면제와 취득세 감면을 받습니다. 다만 감면 한도와 적용 시한(일몰)은 매년 개정되므로 구입 전 지방세특례제한법과 관할 지자체, 국세청 안내로 최신 한도를 확인해야 합니다.',
  },
  {
    question: '취득세는 언제까지 내야 하나요?',
    answer:
      '자동차 취득세는 취득일(등록일)로부터 정해진 기한 내에 신고·납부해야 하며, 보통 신차는 출고·등록 절차에서 함께 처리됩니다. 기한을 넘기면 신고불성실·납부지연 가산세가 붙으므로 등록 시점에 바로 납부하는 것이 안전합니다. 정확한 기한은 위택스 또는 관할 시·군·구청에서 확인하세요.',
  },
  {
    question: '자동차세는 이 세금들과 다른 건가요?',
    answer:
      '네, 다릅니다. 개별소비세·교육세·부가세·취득세는 차를 살 때 한 번 내는 세금이고, 자동차세는 차를 보유하는 동안 매년 내는 세금(지방세)입니다. 자동차세는 배기량 기준(cc당 과세)이나 전기차 등은 정액으로 매년 부과되며, 구입 세금과는 별개로 관리됩니다.',
  },
];

export default function CarPurchaseTaxesBreakdownPage() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '자동차 살 때 세금 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '자동차 살 때 붙는 세금 4종 총정리 2026',
    description:
      '개별소비세 5%, 교육세 30%, 부가가치세 10%, 취득세 7%가 어떤 순서로 매겨지는지 공급가액 3천만원 차량 기준 계산 사례로 정리하고 전기차·경차 감면까지 설명.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['자동차 세금', '개별소비세', '취득세', '교육세', '부가가치세'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '자동차 살 때 세금 2026',
    description:
      '자동차 구입 시 붙는 개별소비세·교육세·부가가치세·취득세의 계산 순서와 총액을 정리한 가이드.',
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
                    { name: '자동차 살 때 세금 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">자동차 구매자 · 세금 · 8분 읽기 · 2026-08-25</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  자동차 살 때 세금 2026
                  <br />
                  <span className="text-2xl text-text-secondary">· 개소세·교육세·부가세·취득세</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  견적서를 받아 보면 차값 옆에 개별소비세, 교육세, 부가세 같은 항목이 줄줄이 붙어 있어 실제로 얼마를 세금으로 내는지 알기 어렵습니다. 여기에 차를 등록할 때 내는 취득세까지 더하면 새 차 한 대에 세금만 수백만원이 들어갑니다. 이 가이드는 자동차 구매자를 위해 차를 살 때 붙는 세금 4종이 어떤 순서로, 무엇을 기준으로 매겨지는지 공급가액 3천만원 차량 사례로 하나씩 풀어 설명합니다.
                </p>
              </header>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">차 살 때 붙는 세금은 총 몇 가지인가요?</h2>
                <p>
                  자동차 구입에는 4가지 세금이 붙습니다. 앞의 세 가지는 이미 차값에 녹아 있고, 마지막 취득세만 등록 단계에서 따로 냅니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">정의: 자동차 구입 세금 4종과 순서</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    1) 개별소비세(공급가액의 5%) 2) 교육세(개소세의 30%) 3) 부가가치세(앞 셋 합의 10%) 4) 취득세(등록 시 7%). 앞의 세 가지는 차값에 포함, 취득세는 등록 시 별도 납부.
                  </p>
                </div>
                <p>
                  핵심은 세금이 <strong>차값 위에 층층이 쌓이는 구조</strong>라는 점입니다. 공장 출고가(공급가액)에 개별소비세가 붙고, 그 개별소비세에 교육세가 붙고, 이 셋을 합한 금액에 다시 부가가치세가 붙습니다. 그래서 우리가 흔히 말하는 차값에는 이미 세 종류의 세금이 포함되어 있습니다.
                </p>
                <p>
                  다만, 소비자에게 표시되는 차량 가격은 부가세까지 포함한 금액인 경우가 많습니다. 아래 설명은 세금 이전의 순수 출고가인 <strong>공급가액</strong>을 기준으로 계산합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">개별소비세는 얼마인가요?</h2>
                <p>
                  비영업용 승용자동차의 개별소비세 기본세율은 공급가액의 5%입니다(개별소비세법 §1). 과거 세금이 붙던 다른 나라와 달리 우리나라는 배기량과 무관하게 승용차에 일률적으로 5%를 매깁니다.
                </p>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li><strong>기본세율:</strong> 공급가액의 5% (개별소비세법 §1).</li>
                  <li><strong>탄력세율:</strong> 정부가 경기 대응으로 한시 인하하는 시기가 있으므로 구입 시점 고시를 확인.</li>
                  <li><strong>경차:</strong> 배기량 1,000cc 미만 경차는 개별소비세 면제.</li>
                </ul>
                <p>
                  예외: 화물차, 승합차, 이륜차 등은 승용차와 과세 방식이 다릅니다. 본 가이드는 가장 일반적인 비영업용 승용차를 기준으로 합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">교육세와 부가가치세는 어떻게 계산되나요?</h2>
                <p>
                  교육세는 개별소비세액의 30%입니다(교육세법 §5). 부가가치세는 공급가액에 개별소비세와 교육세를 더한 금액의 10%입니다(부가가치세법 §29). 세금 위에 세금이 붙는 구조라 개별소비세가 커질수록 교육세와 부가세도 함께 늘어납니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 세금 계산 기준(비영업용 승용차, 2026 기준)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">세목</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">세율</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">과세 기준</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">근거</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">개별소비세</td>
                        <td className="p-3"><strong>5%</strong></td>
                        <td className="p-3">공급가액</td>
                        <td className="p-3">개별소비세법 §1</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">교육세</td>
                        <td className="p-3"><strong>30%</strong></td>
                        <td className="p-3">개별소비세액</td>
                        <td className="p-3">교육세법 §5</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">부가가치세</td>
                        <td className="p-3"><strong>10%</strong></td>
                        <td className="p-3">공급가액+개소세+교육세</td>
                        <td className="p-3">부가가치세법 §29</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">취득세</td>
                        <td className="p-3"><strong>7%</strong></td>
                        <td className="p-3">공급가액+개소세+교육세</td>
                        <td className="p-3">지방세법 §12</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">취득세 7%는 무엇을 기준으로 매기나요?</h2>
                <p>
                  비영업용 승용차의 취득세율은 7%입니다(지방세법 §12). 과세표준은 공급가액에 개별소비세와 교육세를 더한 금액이며, <strong>부가가치세는 취득세 과세표준에서 제외</strong>됩니다. 이 점을 모르면 부가세까지 포함해 계산해 세금을 과다하게 예상하기 쉽습니다.
                </p>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li><strong>비영업용 승용차:</strong> 7% (지방세법 §12).</li>
                  <li><strong>경차(1,000cc 미만):</strong> 4%, 다만 감면 특례가 별도로 적용될 수 있음.</li>
                  <li><strong>영업용 승용차:</strong> 4%.</li>
                </ul>
                <p>
                  다만, 취득세에 부가되는 지방교육세와 농어촌특별세가 별도로 붙는 경우가 있으므로, 최종 등록 비용은 위택스 자동차 취득세 계산이나 관할 지자체 안내로 확인하는 것이 정확합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">공급가액 3천만원 차를 사면 세금이 총 얼마인가요?</h2>
                <p>
                  공급가액 3,000만원짜리 비영업용 승용차를 예로 단계별로 계산해 보겠습니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">계산 사례. 공급가액 3,000만원 승용차</p>
                  <p className="text-sm text-text-secondary">
                    · 개별소비세 = 3,000만 × 5% = <strong>150만원</strong>
                    <br />
                    · 교육세 = 150만 × 30% = <strong>45만원</strong>
                    <br />
                    · 부가가치세 = (3,000만 + 150만 + 45만) × 10% = 3,195만 × 10% = <strong>319.5만원</strong>
                    <br />
                    · 취득세 = (3,000만 + 150만 + 45만) × 7% = 3,195만 × 7% = <strong>223.65만원</strong>
                    <br />
                    <span className="text-xs text-text-tertiary">세금 합계 = 150 + 45 + 319.5 + 223.65 = 약 738.15만원</span>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">소비자가 실제 부담하는 차값</p>
                  <p className="text-sm text-text-secondary">
                    · 차값(부가세 포함) = 3,000만 + 150만 + 45만 + 319.5만 = <strong>약 3,514.5만원</strong>
                    <br />
                    · 여기에 등록 시 취득세 약 223.65만원을 더 납부
                    <br />
                    · 결과적으로 공급가액 3,000만원 차를 굴리기 시작하려면 세금만 약 738만원
                  </p>
                </div>
                <p className="mt-4">
                  위 금액은 이해를 돕기 위한 예시이며, 취득세 부가 세목(지방교육세 등)과 탁송료·공채 등 부대비용은 제외했습니다. 실제 견적은 딜러 견적서와 위택스로 확인하세요.
                </p>
              </section>

              <section className="space-y-6 border-t border-border-base pt-8">
                <h2 className="text-2xl font-bold">전기차·경차는 세금을 얼마나 감면받나요?</h2>
                <p>
                  친환경차와 경차는 구입 세금을 크게 줄일 수 있습니다. 다만 감면 한도와 적용 시한은 자주 바뀌므로 개략적인 방향만 소개하고, 정확한 수치는 구입 시점에 확인해야 합니다.
                </p>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li><strong>전기차·수소차:</strong> 개별소비세와 취득세를 한도 내에서 감면. 감면 한도와 일몰 시한은 지방세특례제한법 등에서 정하므로 확인 필요.</li>
                  <li><strong>하이브리드차:</strong> 개별소비세 감면이 있었으나 적용기한 종료(일몰)가 예정되어 있으므로 구입 시점 확인이 중요.</li>
                  <li><strong>경차(1,000cc 미만):</strong> 개별소비세 면제 및 취득세 감면 한도 적용.</li>
                  <li><strong>다자녀 가구:</strong> 취득세 감면 특례가 별도로 있음.</li>
                </ul>
                <p>
                  다만, 감면은 대부분 한도가 정해져 있어 고가 차량은 한도를 넘는 부분에 대해 정상 세율이 적용됩니다. 감면만 보고 예산을 짜면 실제 부담이 예상보다 클 수 있으니 주의하세요.
                </p>
              </section>

              <h2 className="text-2xl font-bold mb-6">자주 묻는 질문</h2>
              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h3 className="text-lg font-semibold text-text-primary">관련 계산기 및 가이드</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link href="/calculator/vehicle-tax/" className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition">
                    <div className="font-semibold text-primary-500">자동차세 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">보유 중 매년 내는 자동차세를 계산해 보세요.</p>
                  </Link>
                  <Link href="/guide/vehicle-acquisition-tax-2026/" className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition">
                    <div className="font-semibold text-primary-500">자동차 취득세 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">등록 단계 취득세를 더 자세히 알아보세요.</p>
                  </Link>
                  <Link href="/guide/electric-vehicle-tax-2026/" className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition">
                    <div className="font-semibold text-primary-500">전기차 자동차세 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">전기차 보유세와 정액 과세를 확인하세요.</p>
                  </Link>
                  <Link href="/guide/multi-child-vehicle-acquisition-tax-exemption-2026/" className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition">
                    <div className="font-semibold text-primary-500">다자녀 자동차 취득세 감면</div>
                    <p className="mt-1 text-sm text-text-secondary">18세 미만 자녀 수 요건과 감면 한도.</p>
                  </Link>
                  <Link href="/guide/car-installment-vs-lease-vs-rent-2026/" className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition">
                    <div className="font-semibold text-primary-500">할부·리스·렌트 비교</div>
                    <p className="mt-1 text-sm text-text-secondary">구입 방식에 따른 비용과 세금 차이를 비교하세요.</p>
                  </Link>
                  <Link href="/category/tax/" className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition">
                    <div className="font-semibold text-primary-500">모든 세금 가이드</div>
                    <p className="mt-1 text-sm text-text-secondary">자동차·부동산·소득 관련 세금 모음.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 교육 목적으로 작성되었으며 개인 맞춤형 세무 조언이 아닙니다. 개별소비세 탄력세율, 친환경차·경차 감면 한도와 일몰 시한, 취득세 부가 세목은 수시로 개정되므로 구입 전 반드시 기획재정부·국세청·위택스와 관할 지자체에서 최신 기준을 확인하세요. 본 콘텐츠는 2026-08-25 기준이며 관련 법령 개정 시 업데이트됩니다. 근거 법조항은 <strong>개별소비세법 §1, 교육세법 §5, 부가가치세법 §29, 지방세법 §12</strong>입니다. AI 보조 작성 후 운영자 검수 완료.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터</a>,{' '}
                  <a href="https://www.nts.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">국세청</a>,{' '}
                  <a href="https://www.wetax.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">위택스(자동차 취득세)</a>.
                </p>
              </section>

              <ShareButtons
                title="자동차 살 때 세금 2026 가이드"
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
