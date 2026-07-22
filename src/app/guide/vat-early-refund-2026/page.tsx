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

const URL = 'https://calculatorhost.com/guide/vat-early-refund-2026/';
const DATE_PUBLISHED = '2026-07-01';
const DATE_MODIFIED = '2026-07-01';

export const metadata: Metadata = {
  title: '부가가치세 조기환급 2026 | 수출·시설투자 15일 내 환급',
  description:
    '부가세 조기환급 제도 완벽 정리. 영세율 수출, 사업설비투자, 재무구조개선 시 일반환급(30일)보다 빠른 15일 내 환급. 부가가치세법 §59·시행령 §107 기준.',
  keywords: [
    '부가가치세 조기환급',
    '조기환급 대상',
    '수출 영세율',
    '사업설비투자',
    '재무구조개선',
    '부가가치세법 59조',
    '7월 부가세 환급',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '부가가치세 조기환급 2026 | 수출·시설투자 15일 내 환급' }],
    title: '부가가치세 조기환급 2026 — 수출·시설투자 시 일반환급보다 15일 빠르게',
    description: '영세율·사업설비투자·재무구조개선 시 일반환급(30일) 대신 15일 내 환급받는 방법. 7월 1기 확정신고 시즌.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '부가가치세 조기환급 2026 — 수출·시설투자 15일 내 환급',
    description: '영세율 적용 수출업체, 설비 신설·투자 기업은 일반 30일이 아닌 15일 내 환급. 부가세법 §59.',
  },
};

const FAQ_ITEMS = [
  {
    question: '조기환급과 일반환급의 가장 큰 차이는 무엇인가요?',
    answer:
      '환급 기한입니다. 일반환급은 확정신고기한 경과 후 30일 내에, 조기환급은 신고 후 15일 내에 환급받습니다(부가가치세법 §59, 시행령 §107). 동일한 금액을 받더라도 현금 흐름이 2주 빨라진다는 점이 중요합니다.',
  },
  {
    question: '조기환급 대상은 몇 가지인가요?',
    answer:
      '크게 3가지입니다(시행령 §107). ①영세율 적용(수출 등), ②사업 설비(감가상각자산) 신설·취득·확장·증축, ③재무구조개선계획 이행 중인 경우. 매출세액이 0이 되는 수출 사업, 또는 큰 투자를 하는 사업에서 현금 회수 속도가 중요할 때 유용합니다.',
  },
  {
    question: '수출기업이라면 누구나 조기환급을 받을 수 있나요?',
    answer:
      '네, 영세율이 적용되는 수출 매출을 올리는 기업이면 조기환급 대상입니다. 다만 수출 매출액이 너무 적으면 환급할 금액이 작아질 수 있습니다. 예를 들어 월 수출매출 1,000만원이고 매입세액이 100만원이면, 100만원을 15일 내에 환급받을 수 있습니다.',
  },
  {
    question: '기계·건물을 사면 바로 조기환급이 되나요?',
    answer:
      '기계 구입 시 부가세(매입세액)가 발생하고, 그 금액이 환급 대상이 됩니다. 하지만 "사업용 설비"여야 하고, "신설·취득·확장·증축"에 해당해야 합니다(시행령 §107②). 기존 설비 유지·수리는 대상이 아닙니다. 또한 사후에 사업을 폐업하거나 설비를 개인용으로 전용하면 추징될 수 있습니다.',
  },
  {
    question: '조기환급을 받으려면 어떤 서류를 첨부해야 하나요?',
    answer:
      '영세율은 수출 증명(물품 수출 명세서, 외환 거래 증명), 사업설비투자는 매매계약서·건설 계약서, 세금계산서·기계사양서 등이 필요합니다. 재무구조개선은 사업계획서 및 시행 증명. 정확한 첨부 서류는 관할 세무서에 미리 문의하는 것이 안전합니다.',
  },
  {
    question: '조기환급 신청 기한이 있나요?',
    answer:
      '네, 조기환급기간 종료일부터 25일 이내에 신청해야 합니다(시행령 §107③). 조기환급기간은 보통 월 단위 또는 2개월 단위입니다. 신청 기한을 놓치면 일반환급으로 전환되므로 주의해야 합니다.',
  },
  {
    question: '7월 1기 확정신고 시 조기환급을 신청할 수 있나요?',
    answer:
      '네, 1월~6월 상반기 실적을 7월 1~15일에 확정신고할 때 조기환급 요건을 충족하면, 신고 후 15일 이내에 환급받을 수 있습니다. 상반기 동안 수출을 했거나, 사업설비에 큰 투자를 했다면, 확정신고 시 조기환급을 적극 검토해야 합니다.',
  },
  {
    question: '조기환급받은 후 추징당할 수도 있다고 했는데, 어떤 경우인가요?',
    answer:
      '조기환급은 향후 설비 투자가 지속될 것을 전제한 제도입니다. 만약 환급받은 후 곧바로 사업을 폐업했거나, 설비를 개인용으로 전용했거나, 영세율 요건을 잃으면(수출 중단 등) 국세청이 추징할 수 있습니다. 조기환급은 "일시적 현금 부족의 해결"일 뿐 "영구적 세금 감면"이 아니라는 점을 명심하세요.',
  },
];

export default function VatEarlyRefund2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '부가가치세 조기환급 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '부가가치세 조기환급 2026 — 수출·시설투자 시 일반환급보다 15일 빠르게',
    description:
      '영세율·사업설비투자·재무구조개선 시 조기환급 받는 방법. 일반환급(30일) 대신 15일 내 환급. 7월 1기 부가세 확정신고 시즌 필독.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['부가가치세', '조기환급', '수출', '시설투자', '환급기한'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '부가가치세 조기환급 2026',
    description:
      '영세율·사업설비투자·재무구조개선 시 15일 내 조기환급받는 방법. 부가가치세법 §59·시행령 §107 기준.',
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
                    { name: '부가가치세 조기환급 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">수출·투자 기업 · 10분 읽기 · 2026-07-01</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  부가가치세 조기환급 2026
                  <br />
                  <span className="text-2xl text-text-secondary">— 수출·시설투자 시 15일 내 환급</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  부가가치세는 일반적으로 확정신고기한 경과 후 30일 내에 환급됩니다. 그런데 특정한 상황에서는 이보다 훨씬 빠르게 환급받을 수 있습니다. 영세율이 적용되는 수출 사업, 사업설비에 큰 투자를 하는 기업, 또는 재무구조를 개선 중인 회사라면 조기환급 제도를 활용할 수 있습니다. 이 가이드는 조기환급의 대상·요건·절차·주의사항을 완전히 정리합니다.
                </p>
              </header>

              <AdSlot slot="guide-vat-early-refund-top" format="horizontal" />

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">조기환급이란 무엇인가</h2>
                <p>
                  부가가치세법 §59(환급)와 시행령 §107(조기환급)에 따른 조기환급은, 특정한 요건을 충족한 사업자가 일반환급(30일) 대신 더 빠르게(15일 내) 매입세액을 돌려받는 제도입니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">조기환급 vs 일반환급 타임라인</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    <strong>일반환급</strong>: 과세기간 종료 → 확정신고기한(~7/15) → 신고 완료 후 <strong>30일 내</strong> 환급
                    <br />
                    <strong>조기환급</strong>: 조기환급기간 종료 → <strong>25일 이내 신청</strong> → 신청 후 <strong>15일 내</strong> 환급
                    <br />
                    <strong>현금 흐름 개선</strong>: 조기환급은 약 2주 더 빠르게 자금을 회수할 수 있습니다.
                  </p>
                </div>
                <p className="mt-4">
                  조기환급은 특히 수출업체나 대규모 설비 투자를 하는 기업의 현금 흐름 관리에 중요합니다. 매입세액(영세율이거나 매입액이 크면)이 많을수록 조기환급의 효과는 더 큽니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">조기환급 대상 3가지 (시행령 §107)</h2>
                <p>
                  부가가치세법 시행령 §107에 따르면, 조기환급 대상은 다음 3가지입니다. 하나라도 충족하면 조기환급을 신청할 수 있습니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 조기환급 대상 3가지 (부가가치세법 시행령 §107)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">대상</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">의미 및 요건</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3"><strong>①영세율</strong></td>
                        <td className="p-3">수출 등으로 0% 영세율 적용. 매출세액이 0이므로 매입세액 전액 환급 대상.</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3"><strong>②사업설비투자</strong></td>
                        <td className="p-3">사업용 감가상각자산(기계·건물·차량 등) 신설·취득·확장·증축. 해당 자산의 매입세액 환급.</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3"><strong>③재무구조개선</strong></td>
                        <td className="p-3">정부가 승인한 재무구조개선계획을 이행 중인 기업. 계획에 포함된 매입세액 환급.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  가장 일반적인 것은 ①영세율(수출 기업)과 ②사업설비투자입니다. 수출업체는 자동으로 대상이 되고, 내수 기업도 공장 자동화, 매장 확장 등의 투자가 있으면 대상이 될 수 있습니다.
                </p>
                <p className="mt-4">
                  다만 조기환급은 "선제적 현금 지원"일 뿐, 향후 사업이 계획대로 진행될 것을 전제합니다. 설비 투자 후 사업을 폐업했거나, 설비를 개인용으로 전용하거나, 영세율 요건을 잃으면 국세청이 환급액을 추징할 수 있습니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">조기환급의 실제 계산 사례</h2>
                <p>
                  조기환급이 실제로 어떻게 작동하는지 구체적인 예시로 살펴보겠습니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 1. 수출업체의 영세율 조기환급</p>
                  <p className="text-sm text-text-secondary">
                    · 1월~6월 수출매출: 1,000만원 (영세율 0% 적용)
                    <br />
                    · 같은 기간 국내 구입처 매입세액: 500만원
                    <br />
                    · 1기 확정신고: 매출세액 0 − 매입세액 500만 = 환급액 <strong>500만원</strong>
                    <br />
                    · 일반환급: 신고 후 30일 내 환급
                    <br />
                    · 조기환급: 신고 후 15일 내 환급 (약 2주 빠름)
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 동일한 500만원을 받되, 2주 더 빠르게 현금을 회수.</span>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 2. 제조업체의 설비투자 조기환급</p>
                  <p className="text-sm text-text-secondary">
                    · 7월 신규 기계 구입가: 1억원
                    <br />
                    · 기계에 포함된 부가세(매입세액): 약 900만원
                    <br />
                    · 7월이 조기환급기간에 해당
                    <br />
                    · 조기환급신청: 7월 말까지 (기간 종료일로부터 25일 이내)
                    <br />
                    · 조기환급액: <strong>900만원</strong> (8월 중순 내 환급)
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 큰 설비 투자 직후 일부 현금을 빠르게 회수해 현금 흐름 개선.</span>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 3. 일반환급 vs 조기환급 타임라인</p>
                  <p className="text-sm text-text-secondary">
                    · 1월~6월 실적으로 7월 1~15일 확정신고 수행
                    <br />
                    · 환급액: 2,000만원
                    <br />
                    · <strong>일반환급 선택</strong>: 신고(7/15) + 30일 = 약 8월 15일 입금
                    <br />
                    · <strong>조기환급 선택</strong>: 신청(7월 말) → 신청일로부터 15일 = 약 8월 1~10일 입금
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 동일 금액이지만 조기환급은 약 1주일 빠름. 상반기 말 현금 부족 시 유용.</span>
                  </p>
                </div>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">조기환급 신청 절차 및 기한</h2>
                <p>
                  조기환급은 자동으로 이루어지지 않습니다. 반드시 신청해야 하며, 신청 기한을 지키지 않으면 일반환급으로 전환됩니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">단계별 절차</p>
                  <p className="text-sm text-text-secondary">
                    <strong>1단계) 신고 기간 판단</strong>
                    <br />
                    조기환급기간은 보통 월 단위 또는 2개월 단위입니다. 본인의 신고 주기를 확인하세요.
                    <br />
                    <br />
                    <strong>2단계) 신청 서류 준비</strong>
                    <br />
                    · 영세율: 수출 증명(물품 수출 명세서, 외환 거래 증명, 세금계산서)
                    <br />
                    · 설비투자: 매매계약서, 건설·설치 계약서, 기계사양서, 관련 세금계산서, 부동산 등기부
                    <br />
                    · 재무구조개선: 사업계획서, 시행 증명 서류
                    <br />
                    <br />
                    <strong>3단계) 국세청 신청</strong>
                    <br />
                    관할 세무서 또는 홈택스(hometax.go.kr)에서 조기환급 신청서를 제출합니다.
                    <br />
                    <br />
                    <strong>4단계) 환급 대기</strong>
                    <br />
                    신청 후 최대 15일 내에 지정 계좌로 환급됩니다.
                  </p>
                </div>
                <p className="mt-4">
                  <strong>신청 기한 엄수</strong>: 조기환급기간 종료일로부터 25일 이내에 신청해야 합니다(시행령 §107③). 이 기한을 넘기면 자동으로 일반환급으로 전환되며, 환급 시간이 30일로 늘어납니다.
                </p>
                <p className="mt-4">
                  다만 정확한 서류와 신청 절차는 관할 세무서마다 약간씩 다를 수 있습니다. 신청 전에 관할 세무서에 미리 문의하여 필요한 서류 목록을 확인하는 것이 안전합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">조기환급 신청 시 주의사항</h2>
                <p>
                  조기환급은 편리하지만, 신청 후 사업 상황이 변경되면 추징당할 수 있습니다. 반드시 이해하고 신청해야 합니다.
                </p>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li>
                    <strong>설비 투자 후 폐업:</strong> 조기환급받은 설비 관련 세액을 회수했는데, 이후 사업을 폐업했다면 국세청이 환급액을 추징할 수 있습니다.
                  </li>
                  <li>
                    <strong>설비의 개인용 전용:</strong> 사업용으로 설비 투자를 해 조기환급을 받았는데, 나중에 그 설비를 개인용으로 바꾸거나 판매했다면 역시 추징 대상입니다.
                  </li>
                  <li>
                    <strong>수출업체의 영세율 요건 상실:</strong> 영세율 조기환급을 받았는데 수출을 중단하고 내수만 하게 되면, 환급액 일부가 추징될 수 있습니다.
                  </li>
                  <li>
                    <strong>서류 허위 제출:</strong> 조기환급 신청 시 거짓 서류(가짜 계약서, 조작된 발주서 등)를 제출했다면 탈세로 적발될 수 있습니다.
                  </li>
                </ul>
                <p className="mt-4">
                  즉, 조기환급은 "세금을 덜 내는 것"이 아니라 "일시적 현금 부족을 해결하는 것"입니다. 향후 사업이 정상적으로 진행될 것을 전제한 제도이므로, 신청 후에도 조기환급 요건을 계속 충족하고 있는지 관리해야 합니다.
                </p>
              </section>

              <AdSlot slot="guide-vat-early-refund-mid" format="rectangle" />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h2 className="text-2xl font-bold">7월 1기 확정신고와 조기환급</h2>
                <p>
                  7월은 1월~6월 상반기 부가세 확정신고 시즌입니다. 이 시기에 조기환급을 고려해야 할 사업자들이 있습니다.
                </p>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li>
                    <strong>상반기 수출이 많은 기업:</strong> 이미 1월~6월 동안 수출을 통해 매입세액을 쌓았다면, 7월 확정신고 시 조기환급을 신청해 현금 흐름을 개선할 수 있습니다.
                  </li>
                  <li>
                    <strong>상반기에 큰 설비 투자를 한 기업:</strong> 기계, 건물 증축, 차량 구매 등으로 매입세액이 크다면, 신고 시 조기환급을 함께 신청하세요.
                  </li>
                  <li>
                    <strong>재무구조개선계획 이행 중인 기업:</strong> 정부 승인을 받은 개선 계획이 있다면, 확정신고 시 관련 세액을 조기환급으로 회수할 수 있습니다.
                  </li>
                </ul>
                <p className="mt-4">
                  다만 상반기가 이미 지났다면, 하반기(7월~12월) 실적으로 가을 확정신고 때 조기환급을 신청할 수 있습니다. 조기환급은 매년 여러 번 신청 가능하므로, 사업 여건이 맞을 때마다 활용하세요.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">조기환급과 일반환급 비교 정리</h2>
                <p>
                  조기환급과 일반환급의 차이를 한눈에 정리했습니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 2. 조기환급 vs 일반환급 비교</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">항목</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">조기환급</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">일반환급</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3 font-semibold">대상</td>
                        <td className="p-3">영세율, 설비투자, 재무구조개선</td>
                        <td className="p-3">모든 사업자</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3 font-semibold">환급 기한</td>
                        <td className="p-3">신청 후 15일 내</td>
                        <td className="p-3">신고 후 30일 내</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3 font-semibold">신청 필요</td>
                        <td className="p-3">필수 (기한 내 신청)</td>
                        <td className="p-3">선택 (기한 연장 가능)</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3 font-semibold">추징 위험</td>
                        <td className="p-3">상황 변화 시 가능</td>
                        <td className="p-3">일반적으로 없음</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-semibold">현금 흐름</td>
                        <td className="p-3">약 2주 빠름</td>
                        <td className="p-3">표준 기한</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              <h2 className="text-2xl font-bold mb-6">자주 묻는 질문</h2>
              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h3 className="text-lg font-semibold text-text-primary">관련 계산기 및 가이드</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link
                    href="/guide/july-vat-final-1st-half/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">7월 부가세 1기 확정신고</div>
                    <p className="mt-1 text-sm text-text-secondary">상반기 확정신고 일정, 신고 방법, 납부·환급 절차.</p>
                  </Link>
                  <Link
                    href="/guide/april-vat-preliminary-q1/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">4월 부가세 1분기 예정신고</div>
                    <p className="mt-1 text-sm text-text-secondary">1월~3월 부가세 예정신고 일정 및 계산법.</p>
                  </Link>
                  <Link
                    href="/calculator/vat/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">부가가치세 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">매출세액·매입세액을 입력하여 납부·환급액 계산.</p>
                  </Link>
                  <Link
                    href="/guide/freelancer-take-home-3-3-percent-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">프리랜서 실수령액 (3.3% 부가세)</div>
                    <p className="mt-1 text-sm text-text-secondary">소득세·부가세·통신비 차감 후 실제 입금액.</p>
                  </Link>
                  <Link
                    href="/category/tax/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">모든 세금 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">소득세·양도세·재산세·상속세 모음.</p>
                  </Link>
                  <Link
                    href="/category/tax/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">세금 가이드 전체</div>
                    <p className="mt-1 text-sm text-text-secondary">부가세, 소득세, 양도세 등 완벽 정리.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 교육 목적으로 작성되었으며, 개인 맞춤형 세무 조언이 아닙니다. 조기환급 신청 요건, 신청 기한, 필요 서류, 추징 여부는 개별 사업 상황에 따라 달라질 수 있습니다. 반드시 관할 세무서 또는 홈택스에서 직접 확인하거나, 세무 전문가(세무사·회계사)와 상담하세요. 본 콘텐츠는 2026-07-01을 기준으로 작성되었으며, 부가가치세법 개정 시 즉시 업데이트됩니다. 조기환금의 정확한 기준은 법조항 <strong>부가가치세법 §59(환급)</strong>, <strong>부가가치세법 시행령 §107(조기환급)</strong>을 따릅니다. AI 보조 작성 후 운영자 검수 완료.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터</a>,{' '}
                  <a href="https://www.hometax.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">국세청 홈택스</a>,{' '}
                  <a href="https://www.nts.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">국세청 공식 사이트</a>.
                </p>
              </section>

              <ShareButtons
                title="부가가치세 조기환급 2026 가이드"
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
