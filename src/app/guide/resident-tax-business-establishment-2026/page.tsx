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

// 북극성 수익 레버: [revenue-lever: indexing+traffic] (신규 색인 표면 + 8월 시즌 검색 의도 흡수)

const URL = 'https://calculatorhost.com/guide/resident-tax-business-establishment-2026/';
const DATE_PUBLISHED = '2026-07-24';
const DATE_MODIFIED = '2026-07-24';

export const metadata: Metadata = {
  title: '주민세 사업소분 2026, 8월 신고·세액·면세 기준 | calculatorhost',
  description:
    '주민세 사업소분은 사업주가 8월 1일부터 31일까지 스스로 신고·납부하는 지방세입니다. 개인 5만원·법인 자본금별 기본세액, 연면적 330제곱미터 초과 가산, 종업원분과의 차이를 지방세법 §81 기준으로 정리했습니다.',
  keywords: [
    '주민세 사업소분',
    '주민세 사업소분 신고',
    '주민세 8월',
    '사업소분 세율',
    '주민세 종업원분',
    '사업소분 면제',
    '지방세법 81조',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '주민세 사업소분 2026, 8월 신고·세액·면세 기준' }],
    title: '주민세 사업소분 2026, 8월에 사업주가 직접 신고하는 지방세',
    description: '개인 5만원·법인 자본금별 기본세액에 연면적 초과 가산과 지방교육세 25%. 종업원분과 헷갈리지 않게 8월 신고 기준을 정리했습니다.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '주민세 사업소분 2026, 8월 신고·세액·면세 기준',
    description: '8월 1~31일 사업주 직접 신고. 개인 5만원, 법인 자본금별, 연면적 초과 가산. 지방세법 §81.',
  },
};

const FAQ_ITEMS = [
  {
    question: '주민세 사업소분은 고지서가 오나요, 아니면 직접 신고하나요?',
    answer:
      '직접 신고·납부하는 세금입니다. 개인분 주민세는 지자체가 고지서를 보내주지만, 사업소분은 사업주가 8월 1일부터 31일 사이에 스스로 세액을 계산해 위택스나 관할 지자체에 신고하고 납부해야 합니다. 고지서를 기다리다 기한을 넘기면 가산세가 붙으니 주의하세요.',
  },
  {
    question: '사업소분 과세기준일은 언제인가요?',
    answer:
      '과세기준일은 매년 7월 1일입니다. 7월 1일 현재 사업소를 두고 사업을 하는 사업주가 납세의무자가 됩니다. 7월 2일 이후 개업했다면 그해 사업소분 납세의무는 없고, 다음 해 7월 1일 기준으로 판단합니다.',
  },
  {
    question: '개인사업자도 무조건 사업소분을 내야 하나요?',
    answer:
      '아닙니다. 개인사업자는 직전 연도 부가가치세 과세표준(면세사업자는 총수입금액)이 4,800만원 이상인 경우에만 사업소분 납세의무가 있습니다. 그 미만이면 비과세이므로 신고 대상이 아닙니다. 신규 개업 등으로 직전 연도 실적이 없으면 관할 지자체에 판정 기준을 확인하세요.',
  },
  {
    question: '기본세액 외에 연면적 세액은 언제 붙나요?',
    answer:
      '사업소 건축물 연면적이 330제곱미터를 초과할 때 초과 면적에 대해 1제곱미터당 250원이 가산됩니다. 예를 들어 연면적 500제곱미터라면 초과분 170제곱미터에 250원을 곱한 42,500원이 기본세액에 더해집니다. 오염물질 배출 사업소는 제곱미터당 500원이 적용될 수 있습니다.',
  },
  {
    question: '사업소분에도 지방교육세가 붙나요?',
    answer:
      '네, 사업소분 기본세액의 25%가 지방교육세로 함께 부과됩니다. 다만 연면적에 따른 세액에는 지방교육세가 붙지 않습니다. 기본세액 5만원이면 지방교육세는 1만 2,500원이 되어 합계 6만 2,500원을 납부하게 됩니다.',
  },
  {
    question: '종업원분 주민세와 사업소분은 다른 세금인가요?',
    answer:
      '네, 별개입니다. 사업소분은 사업소의 규모(연면적·자본금)를 기준으로 매년 8월에 한 번 신고합니다. 반면 종업원분은 종업원에게 지급한 급여 총액의 0.5%를 매달 계산해 급여 지급월의 다음 달 10일까지 신고·납부합니다. 최근 1년간 월평균 급여총액이 1억 3,500만원 이하이면 종업원분은 면제됩니다.',
  },
  {
    question: '신고를 놓치면 어떤 불이익이 있나요?',
    answer:
      '무신고 시 무신고가산세(납부할 세액의 20%)와 납부지연가산세가 함께 부과됩니다. 8월 31일이 지나기 전에 위택스에서 신고를 마치는 것이 가장 안전합니다. 마감일이 토요일·일요일·공휴일이면 다음 영업일까지 연장됩니다.',
  },
  {
    question: '사업장이 여러 곳이면 어떻게 신고하나요?',
    answer:
      '사업소가 여러 지자체에 있으면 각 사업소 소재지 지자체에 각각 신고·납부합니다. 기본세액은 지자체별 사업소마다 각각 적용되므로, 사업소 수가 많으면 세 부담이 커질 수 있습니다. 정확한 안분과 신고 방법은 관할 지자체 세무부서에 확인하세요.',
  },
];

export default function ResidentTaxBusinessEstablishment2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '주민세 사업소분 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '주민세 사업소분 2026, 8월에 사업주가 직접 신고하는 지방세',
    description:
      '주민세 사업소분의 신고·납부 기간, 개인·법인 기본세액, 연면적 가산, 종업원분과의 차이, 비과세 기준까지 지방세법 §81 기준으로 정리한 사업자용 가이드.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['주민세 사업소분', '사업소분 신고', '주민세 8월', '종업원분', '지방세법 81조'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '주민세 사업소분 2026',
    description:
      '8월 1일부터 31일까지 사업주가 직접 신고·납부하는 주민세 사업소분의 세액 계산과 신고 방법.',
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
                    { name: '주민세 사업소분 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">개인·법인 사업자 · 7분 읽기 · 2026-07-24</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  주민세 사업소분 2026
                  <br />
                  <span className="text-2xl text-text-secondary">8월에 사업주가 직접 신고하는 지방세</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  8월이 되면 사업주에게 주민세 사업소분 신고 안내가 옵니다. 개인분처럼 고지서만 보고 내면 되는 줄 알았다가 신고를 놓쳐 가산세를 무는 경우가 적지 않습니다. 이 가이드는 사업소분이 무엇인지, 언제 얼마를 어떻게 신고하는지, 흔히 헷갈리는 종업원분과는 무엇이 다른지를 지방세법 조문 기준으로 정리합니다.
                </p>
              </header>

              <AdSlot slot="guide-resident-tax-business-establishment-top" format="horizontal" />

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">주민세 사업소분이란 무엇인가요?</h2>
                <p>
                  주민세 사업소분은 사업소를 둔 사업주에게 사업소의 규모를 기준으로 부과하는 지방세입니다(지방세법 §75, §81). 과거 재산분으로 불리던 세목이 개편된 것으로, 개인분·종업원분과 함께 주민세를 구성합니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">한눈 요약</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    정의: 사업소를 둔 사업주가 사업소 규모(자본금·연면적)를 기준으로 내는 주민세.
                    <br />
                    신고·납부: 매년 8월 1일 ~ 8월 31일 (사업주 직접 신고).
                    <br />
                    과세기준일: 7월 1일 (지방세법 §81).
                  </p>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 주민세 3종 비교 (2026 기준)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">구분</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">납세의무자</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">시기·방식</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">개인분</td>
                        <td className="p-3">세대주 등 개인</td>
                        <td className="p-3">8월 16~31일 고지서 납부</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">사업소분</td>
                        <td className="p-3">사업소를 둔 사업주</td>
                        <td className="p-3">8월 1~31일 직접 신고·납부</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">종업원분</td>
                        <td className="p-3">종업원에게 급여를 주는 사업주</td>
                        <td className="p-3">매월(급여지급 다음달 10일)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p>
                  다만 개인분과 달리 사업소분은 고지서가 자동으로 오지 않는 신고 세목이라는 점이 핵심입니다. 신고 자체를 안 하면 무신고가산세 대상이 됩니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">사업소분 신고·납부는 언제 하나요?</h2>
                <p>
                  신고·납부 기간은 매년 8월 1일부터 8월 31일까지입니다. 과세기준일인 7월 1일 현재 사업소를 두고 사업을 하고 있으면 그해 납세의무자가 됩니다.
                </p>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li><strong>과세기준일:</strong> 7월 1일. 이날 사업소를 두고 있으면 대상.</li>
                  <li><strong>신고·납부:</strong> 8월 1일 ~ 8월 31일. 위택스(wetax.go.kr) 또는 관할 지자체.</li>
                  <li><strong>마감 연장:</strong> 8월 31일이 토·일·공휴일이면 다음 영업일까지.</li>
                </ul>
                <p>
                  예외: 7월 2일 이후에 개업했다면 그해에는 사업소분 납세의무가 없습니다. 반대로 8월 신고 전에 폐업했더라도 7월 1일 현재 사업 중이었다면 신고 대상이 됩니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">사업소분 세액은 어떻게 계산하나요?</h2>
                <p>
                  사업소분 세액은 기본세액과 연면적 세액을 더하고, 기본세액에 지방교육세 25%를 얹어 계산합니다(지방세법 §81). 기본세액은 개인·법인 여부와 자본금 규모에 따라 다릅니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 2. 사업소분 기본세액 (지방세법 §81, 2026 기준)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">구분</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">기본세액</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">개인사업자</td>
                        <td className="p-3"><strong>5만원</strong></td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">법인 (자본금·출자금 30억원 이하)</td>
                        <td className="p-3"><strong>5만원</strong></td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">법인 (30억원 초과 ~ 50억원 이하)</td>
                        <td className="p-3"><strong>10만원</strong></td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">법인 (50억원 초과)</td>
                        <td className="p-3"><strong>20만원</strong></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p>
                  여기에 사업소 건축물 연면적이 330제곱미터를 초과하면 초과 면적 1제곱미터당 250원(오염물질 배출 사업소는 500원)이 더해집니다. 그리고 기본세액의 25%가 지방교육세로 함께 부과됩니다.
                </p>
                <p>
                  다만 자치단체 조례에 따라 표준세율을 50% 범위에서 가감할 수 있으므로, 최종 세액은 위택스나 관할 지자체 고지 화면에서 확인하는 것이 정확합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">어떤 사업자가 내야 하나요?</h2>
                <p>
                  모든 사업자가 사업소분을 내는 것은 아닙니다. 개인사업자는 직전 연도 부가가치세 과세표준(면세사업자는 총수입금액)이 4,800만원 이상일 때 대상이 됩니다.
                </p>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li><strong>과세 대상 개인사업자:</strong> 직전 연도 부가세 과세표준 4,800만원 이상.</li>
                  <li><strong>비과세 개인사업자:</strong> 직전 연도 과세표준 4,800만원 미만이면 신고 대상 아님.</li>
                  <li><strong>법인:</strong> 규모와 무관하게 사업소를 두면 원칙적으로 대상(자본금 구간별 기본세액 적용).</li>
                </ul>
                <p>
                  예외: 신규 개업으로 직전 연도 실적이 없거나, 국가·지자체·비영리 등 지방세법상 비과세 대상이면 판정이 달라집니다. 애매하면 관할 지자체 세무부서에 사업자등록증을 들고 확인하세요.
                </p>
              </section>

              <AdSlot slot="guide-resident-tax-business-establishment-mid" format="rectangle" />

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">종업원분은 무엇이 다른가요?</h2>
                <p>
                  종업원분은 종업원에게 지급한 급여 총액의 0.5%를 부과하는 별개의 주민세입니다(지방세법 §84의3). 사업소분이 사업소 규모 기준이라면, 종업원분은 인건비 규모 기준입니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-2">
                  <p className="font-semibold text-text-primary">종업원분 핵심 규칙</p>
                  <p className="text-sm text-text-secondary">
                    세율: 급여 총액 × 0.5% (지방세법 §84의3).
                    <br />
                    신고·납부: 급여 지급월의 다음 달 10일까지 매월.
                    <br />
                    면세점: 최근 1년간 월평균 급여총액 1억 3,500만원 이하면 면제 (지방세법 §84의4).
                  </p>
                </div>
                <p>
                  다만 면세점 기준(월평균 급여총액 1억 3,500만원)은 종업원 약 50명 규모에 해당하므로, 소규모 사업장 대부분은 종업원분 부담이 없습니다. 사업소분과 종업원분은 요건·시기가 완전히 다르니 별도로 챙겨야 합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">사업소분 계산 사례</h2>
                <p>
                  실제 숫자로 세액을 어떻게 구하는지 단계별로 살펴보겠습니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 1. 개인사업자, 사무실 연면적 200제곱미터</p>
                  <p className="text-sm text-text-secondary">
                    · 기본세액: 5만원 (개인사업자)
                    <br />
                    · 연면적 세액: 200제곱미터는 330제곱미터 이하 → 0원
                    <br />
                    · 지방교육세: 5만원 × 25% = 1만 2,500원
                    <br />
                    · 합계: <strong>6만 2,500원</strong>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 2. 법인(자본금 40억원), 연면적 500제곱미터</p>
                  <p className="text-sm text-text-secondary">
                    · 기본세액: 10만원 (자본금 30억 초과 50억 이하)
                    <br />
                    · 연면적 세액: 초과분 170제곱미터 × 250원 = 42,500원
                    <br />
                    · 지방교육세: 10만원 × 25% = 2만 5,000원 (연면적 세액에는 미부과)
                    <br />
                    · 합계: <strong>16만 7,500원</strong>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 3. 개인사업자, 직전 연도 과세표준 4,000만원</p>
                  <p className="text-sm text-text-secondary">
                    · 직전 연도 부가세 과세표준 4,800만원 미만 → 비과세
                    <br />
                    · 사업소분 세액: <strong>0원 (신고 대상 아님)</strong>
                    <br />
                    <span className="text-xs text-text-tertiary">경계값: 과세표준 4,800만원이면 과세, 4,799만원이면 비과세로 갈립니다.</span>
                  </p>
                </div>
              </section>

              <section className="space-y-6 border-t border-border-base pt-8">
                <h2 className="text-2xl font-bold">신고를 놓치면 어떻게 되나요?</h2>
                <p>
                  사업소분은 신고 세목이므로 신고를 안 하면 무신고가산세가 붙습니다. 납부할 세액의 20%가 무신고가산세로 부과되고, 여기에 납부지연가산세가 더해집니다.
                </p>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li><strong>무신고가산세:</strong> 신고 자체를 안 하면 납부세액의 20%.</li>
                  <li><strong>납부지연가산세:</strong> 납부기한 다음 날부터 미납 일수만큼 가산.</li>
                  <li><strong>대응:</strong> 8월 31일 전 위택스에서 신고를 마치고, 놓쳤다면 최대한 빨리 기한 후 신고.</li>
                </ul>
                <p>
                  다만 세액이 크지 않더라도 여러 사업소를 운영하면 각 지자체마다 신고 누락이 쌓일 수 있으니, 사업소별로 챙기는 것이 안전합니다.
                </p>
              </section>

              <h2 className="text-2xl font-bold mb-6">자주 묻는 질문</h2>
              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h3 className="text-lg font-semibold text-text-primary">관련 계산기 및 가이드</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link
                    href="/guide/resident-tax-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">주민세 개인분 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">8월 세대주가 내는 개인분 주민세 기준을 확인하세요.</p>
                  </Link>
                  <Link
                    href="/guide/simplified-taxpayer-july-vat-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">간이과세자 7월 부가세</div>
                    <p className="mt-1 text-sm text-text-secondary">사업자가 챙겨야 할 또 다른 세무 일정을 정리했습니다.</p>
                  </Link>
                  <Link
                    href="/guide/business-registration-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">사업자등록 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">개인·법인 사업자등록 절차와 유형을 비교하세요.</p>
                  </Link>
                  <Link
                    href="/guide/tax-calendar-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">2026 세금 달력</div>
                    <p className="mt-1 text-sm text-text-secondary">월별 신고·납부 일정을 한 번에 확인하세요.</p>
                  </Link>
                  <Link
                    href="/guide/freelancer-take-home-3-3-percent-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">프리랜서 3.3% 실수령</div>
                    <p className="mt-1 text-sm text-text-secondary">1인 사업자의 세금 구조를 이해하세요.</p>
                  </Link>
                  <Link
                    href="/category/tax/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">모든 세금 가이드</div>
                    <p className="mt-1 text-sm text-text-secondary">부가세·소득세·지방세 가이드 모음.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 교육 목적으로 작성되었으며 개인 맞춤형 세무 조언이 아닙니다. 사업소분 세액은 자치단체 조례에 따라 표준세율의 50% 범위에서 가감될 수 있고, 개별 사업소의 자본금·연면적·비과세 요건에 따라 달라집니다. 실제 신고 전 위택스(wetax.go.kr) 또는 관할 시·군·구청 세무부서에서 반드시 확인하세요. 본 콘텐츠는 2026-07-24 기준이며 지방세법 개정 시 업데이트됩니다. 근거 법조항은 <strong>지방세법 §75(납세의무자), §81(사업소분 세율), §84의3(종업원분 세율), §84의4(종업원분 면세점)</strong>입니다. AI 보조 작성 후 운영자 검수 완료.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터</a>,{' '}
                  <a href="https://www.wetax.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">위택스(지방세 종합정보)</a>.
                </p>
              </section>

              <ShareButtons
                title="주민세 사업소분 2026 신고 가이드"
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
