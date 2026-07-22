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

const URL = 'https://calculatorhost.com/guide/resident-tax-2026/';
const DATE_PUBLISHED = '2026-07-12';
const DATE_MODIFIED = '2026-07-12';

export const metadata: Metadata = {
  title: '주민세 2026, 개인분·사업소분·종업원분 세율과 8월 납부',
  description:
    '주민세는 개인분, 사업소분, 종업원분 세 가지로 나뉩니다. 개인분은 지자체 조례로 1만원 이하, 사업소분은 연면적 1㎡당 250원, 종업원분은 급여총액 0.5%입니다. 납부 시기와 계산법을 정리합니다.',
  keywords: [
    '주민세',
    '주민세 개인분',
    '주민세 사업소분',
    '주민세 종업원분',
    '주민세 납부 8월',
    '지방세법 78조',
    '종업원분 0.5%',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '주민세 2026, 개인분·사업소분·종업원분 세율과 8월 납부' }],
    title: '주민세 2026, 세 가지 유형과 납부 시기 한눈에',
    description: '개인분(1만원 이하 조례)·사업소분(연면적 250원/㎡)·종업원분(급여 0.5%). 8월 납부 기준과 계산법 정리.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '주민세 2026, 개인분·사업소분·종업원분',
    description: '개인분 1만원 이하, 사업소분 연면적 250원/㎡, 종업원분 급여 0.5%. 8월 납부.',
  },
};

const FAQ_ITEMS = [
  {
    question: '주민세는 무엇이고 누가 내나요?',
    answer:
      '주민세는 지자체 구성원이 내는 지방세로, 개인분·사업소분·종업원분 세 가지로 나뉩니다(지방세법 §74 이하). 개인분은 세대주 등 개인이, 사업소분은 사업소를 둔 사업주가, 종업원분은 종업원에게 급여를 주는 사업주가 냅니다. 유형마다 납세의무자와 과세 기준이 다릅니다.',
  },
  {
    question: '개인분 주민세는 얼마인가요?',
    answer:
      '개인분은 지방세법 §78에 따라 1만원을 넘지 않는 범위에서 지자체 조례로 정합니다. 지역마다 다르며, 예를 들어 서울시는 4,800원 수준입니다. 여기에 지방교육세가 함께 부과되므로 실제 고지 금액은 조례 세액보다 다소 높습니다. 과세기준일은 7월 1일, 납부는 8월입니다.',
  },
  {
    question: '사업소분은 어떻게 계산하나요?',
    answer:
      '사업소분은 기본세율에 사업소 건축물 연면적에 대한 세액을 더해 계산합니다(지방세법 §81). 연면적분은 1제곱미터당 250원(폐수·산업폐기물 배출 사업소는 500원)이며, 연면적이 330제곱미터 이하이면 연면적분은 부과되지 않습니다. 기본세율은 사업주 유형·규모에 따라 다릅니다.',
  },
  {
    question: '종업원분은 누가, 얼마를 내나요?',
    answer:
      '종업원분은 종업원에게 급여를 지급하는 사업주가 냅니다(지방세법 §84의3). 표준세율은 그 달 급여총액의 0.5%(1천분의 5)입니다. 다만 최근 1년간 월평균 급여총액이 시행령이 정한 기준(약 1억 5천만원 안팎) 이하인 소규모 사업소는 면제됩니다.',
  },
  {
    question: '주민세는 언제 납부하나요?',
    answer:
      '개인분과 사업소분은 과세기준일이 7월 1일이며 8월에 납부합니다. 개인분은 지자체가 고지서를 보내면 8월 말까지 내고, 사업소분은 8월에 사업주가 직접 신고·납부합니다. 종업원분은 급여를 지급한 달의 다음 달 10일까지 매월 신고·납부합니다.',
  },
  {
    question: '개인분은 세대별인가요, 개인별인가요?',
    answer:
      '개인분은 원칙적으로 세대주에게 세대 단위로 한 번 부과됩니다. 한 세대에 여러 명이 살아도 세대주 한 사람에게 부과되며, 세대원 각각에게 따로 매기지 않습니다. 다만 사업소를 별도로 둔 경우에는 사업소분이 별개로 부과될 수 있습니다.',
  },
  {
    question: '종업원분을 안 내면 어떻게 되나요?',
    answer:
      '종업원분은 매월 신고·납부하는 세목이므로 기한을 넘기면 무신고·납부지연 가산세가 붙습니다. 면세점 이하 사업소라면 낼 의무가 없지만, 급여총액이 늘어 면세 기준을 넘으면 그 달부터 신고 의무가 생기므로 급여총액 추이를 관리해야 합니다.',
  },
  {
    question: '주민세와 종합소득세는 다른 세금인가요?',
    answer:
      '네, 완전히 다른 세금입니다. 주민세는 지자체가 매기는 지방세이고, 종합소득세는 국세청이 매기는 국세입니다. 다만 종합소득세를 낼 때 그 10%가 지방소득세로 별도 부과되는데, 이 지방소득세와 주민세도 서로 다른 항목이므로 혼동하지 마세요.',
  },
];

export default function ResidentTax2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '주민세 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '주민세 2026, 개인분·사업소분·종업원분 세율과 납부 시기 총정리',
    description:
      '주민세 세 가지 유형(개인분·사업소분·종업원분)의 세율, 과세 기준, 8월 납부 일정, 면세 기준을 지방세법 §74 이하 조문 기준으로 정리.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['주민세', '개인분', '사업소분', '종업원분', '지방세'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '주민세 2026',
    description:
      '주민세 개인분·사업소분·종업원분의 세율과 납부 시기, 면세 기준 정리.',
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
                    { name: '주민세 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">개인·사업자 · 7분 읽기 · 2026-07-12</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  주민세 2026
                  <br />
                  <span className="text-2xl text-text-secondary">개인분·사업소분·종업원분 세율과 8월 납부</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  매년 8월이면 주민세 고지서가 날아옵니다. 그런데 주민세는 하나가 아니라 개인분, 사업소분, 종업원분 세 가지로 나뉘고, 각각 내는 사람과 계산법이 다릅니다. 사업자라면 세 가지를 모두 챙겨야 할 수도 있습니다. 이 가이드는 지방세법 §74 이하 조문을 기준으로 주민세 세 유형의 세율, 납부 시기, 면세 기준을 정리합니다.
                </p>
              </header>

              <AdSlot slot="guide-resident-tax-top" format="horizontal" />

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">주민세란 무엇인가요?</h2>
                <p>
                  주민세는 지자체 구성원에게 매기는 지방세로, 개인분·사업소분·종업원분 세 가지로 구성됩니다(지방세법 §74 이하). 유형별로 납세의무자와 과세 기준이 다르므로, 본인이 어디에 해당하는지부터 확인해야 합니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 주민세 세 유형 개요 (지방세법)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">유형</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">납세의무자</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">기준</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">개인분</td>
                        <td className="p-3">세대주 등 개인</td>
                        <td className="p-3">1만원 이하 조례 (§78)</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">사업소분</td>
                        <td className="p-3">사업소를 둔 사업주</td>
                        <td className="p-3">기본세율 + 연면적 (§81)</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">종업원분</td>
                        <td className="p-3">급여를 주는 사업주</td>
                        <td className="p-3">급여총액 0.5% (§84의3)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  다만 개인이면서 사업소도 운영한다면 개인분과 사업소분(경우에 따라 종업원분)을 모두 내야 할 수 있습니다. 유형은 서로 배타적이지 않습니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">개인분은 얼마인가요?</h2>
                <p>
                  개인분은 1만원을 넘지 않는 범위에서 지자체 조례로 정합니다(지방세법 §78). 지역마다 금액이 다르며, 여기에 지방교육세가 더해져 고지됩니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">개인분 핵심</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    · 세율: 1만원 이하, 지자체 조례로 결정 (예: 서울 4,800원 수준)
                    <br />
                    · 부가: 지방교육세가 함께 부과
                    <br />
                    · 과세기준일: 7월 1일 / 납부: 8월
                    <br />
                    · 세대 단위로 세대주에게 1회 부과
                  </p>
                </div>
                <p className="mt-4">
                  다만 정확한 조례 세액과 지방교육세 합산액은 지자체마다 다릅니다. 본인 고지 금액은 위택스(wetax.go.kr) 또는 관할 시·군·구청에서 확인하세요.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">사업소분은 어떻게 계산하나요?</h2>
                <p>
                  사업소분은 기본세율에 사업소 건축물 연면적에 대한 세액을 더해 계산합니다(지방세법 §81). 연면적분은 규모가 클수록 커집니다.
                </p>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li><strong>기본세율:</strong> 사업주 유형·규모(개인/법인 자본금 등)에 따라 정해집니다.</li>
                  <li><strong>연면적분:</strong> 1제곱미터당 250원 (폐수·산업폐기물 배출 사업소는 500원).</li>
                  <li><strong>소규모 면제:</strong> 사업소 연면적이 330제곱미터 이하이면 연면적분은 부과되지 않습니다.</li>
                  <li><strong>과세기준일·납부:</strong> 7월 1일 기준, 8월에 사업주가 직접 신고·납부.</li>
                </ul>
                <p className="mt-4">
                  다만 기본세율 구간과 금액은 지자체 조례로 가감될 수 있습니다. 실제 사업소분 세액은 위택스 신고 화면이나 관할 지자체에서 확인하는 것이 정확합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">종업원분은 누가 내나요?</h2>
                <p>
                  종업원분은 종업원에게 급여를 주는 사업주가 냅니다. 표준세율은 그 달 급여총액의 0.5%입니다(지방세법 §84의3).
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">계산 사례</p>
                  <p className="text-sm text-text-secondary">
                    · 한 달 급여총액 2억원인 사업소
                    <br />
                    · 종업원분 = 2억원 × 0.5% = <strong>100만원</strong>
                    <br />
                    · 다음 달 10일까지 신고·납부
                    <br />
                    <span className="text-xs text-text-tertiary">단, 최근 1년 월평균 급여총액이 시행령 기준(약 1억 5천만원 안팎) 이하이면 면제됩니다.</span>
                  </p>
                </div>
                <p className="mt-4">
                  다만 지자체는 조례로 표준세율의 50% 범위에서 세율을 가감할 수 있고, 면세점 기준은 시행령에 따르므로 정확한 금액은 관할 지자체에서 확인하세요.
                </p>
              </section>

              <AdSlot slot="guide-resident-tax-mid" format="rectangle" />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h2 className="text-2xl font-bold">주민세 납부 일정 한눈에 보기</h2>
                <p>
                  유형별로 납부 시기가 다릅니다. 개인분·사업소분은 8월, 종업원분은 매월입니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 2. 주민세 납부 일정</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">유형</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">과세기준일</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">납부</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">개인분</td>
                        <td className="p-3">7월 1일</td>
                        <td className="p-3">8월 (고지 납부)</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">사업소분</td>
                        <td className="p-3">7월 1일</td>
                        <td className="p-3">8월 (신고 납부)</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">종업원분</td>
                        <td className="p-3">급여 지급월</td>
                        <td className="p-3">다음 달 10일 (매월 신고)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  기한을 넘기면 가산세가 붙으므로, 특히 매월 챙겨야 하는 종업원분은 급여 지급 일정과 함께 관리하는 것이 좋습니다.
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
                    <p className="mt-1 text-sm text-text-secondary">사업소득 종합소득세를 계산해보세요.</p>
                  </Link>
                  <Link
                    href="/guide/business-registration-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">개인사업자 등록 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">사업자등록 절차와 과세유형 선택.</p>
                  </Link>
                  <Link
                    href="/guide/vat-early-refund-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">부가세 조기환급 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">사업자 부가가치세 신고와 조기환급.</p>
                  </Link>
                  <Link
                    href="/guide/comprehensive-income-tax-rate-brackets-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">종합소득세율 구간 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">누진세율과 지방소득세 10% 구조.</p>
                  </Link>
                  <Link
                    href="/guide/tax-calendar-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">2026 세무 캘린더</div>
                    <p className="mt-1 text-sm text-text-secondary">월별 신고·납부 일정을 한눈에.</p>
                  </Link>
                  <Link
                    href="/category/tax/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">모든 세금 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">소득세·부가세·지방세 모음.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 교육 목적으로 작성되었으며 개별 세무 자문이 아닙니다. 개인분 조례 세액, 사업소분 기본세율, 종업원분 면세점은 지자체 조례와 시행령에 따라 달라지므로, 실제 세액은 위택스 또는 관할 시·군·구청에서 확인하시기 바랍니다. 본 콘텐츠는 2026-07-12 기준으로 작성되었고 지방세법 개정 시 업데이트됩니다. 인용 법조항: <strong>지방세법 §74(정의), §78(개인분 세율), §81(사업소분 과세표준·세율), §84의3(종업원분 세율)</strong>. AI 보조 작성 후 운영자 검수 완료.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터</a>,{' '}
                  <a href="https://www.wetax.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">위택스(지방세 종합정보)</a>,{' '}
                  <a href="https://www.mois.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">행정안전부</a>.
                </p>
              </section>

              <ShareButtons
                title="주민세 2026 가이드"
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
