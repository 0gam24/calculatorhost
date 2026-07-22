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

const URL = 'https://calculatorhost.com/guide/honest-tax-return-confirmation-2026/';
const DATE_PUBLISHED = '2026-07-19';
const DATE_MODIFIED = '2026-07-19';

export const metadata: Metadata = {
  title: '성실신고확인제도 2026 | 대상 기준·신고기한·세액공제',
  description:
    '성실신고확인제도는 업종별 수입금액 기준 이상인 개인사업자가 세무사 확인을 받아야 하는 제도입니다. 대상 기준(소득세법 시행령 133조), 6월 30일 신고기한, 확인비용 60% 세액공제까지 정리했습니다.',
  keywords: [
    '성실신고확인제도',
    '성실신고확인 대상',
    '성실신고확인서',
    '종합소득세 신고기한 6월',
    '성실신고확인비용 세액공제',
    '소득세법 70조의2',
    '프리랜서 성실신고',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '성실신고확인제도 2026, 대상 기준과 신고기한' }],
    title: '성실신고확인제도 2026: 업종별 대상 기준과 신고기한 완전정리',
    description: '수입금액이 일정 기준을 넘는 개인사업자는 종합소득세 신고 전 세무사 확인을 받아야 합니다. 업종별 기준, 6월 30일 연장 신고기한, 확인비용 세액공제를 정리했습니다.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '성실신고확인제도 2026, 대상 기준과 신고기한 완전정리',
    description: '업종별 수입금액 기준(소득세법 시행령 133조)과 6월 30일 신고기한, 확인비용 세액공제(조특법 126조의6)까지 한번에.',
  },
};

const FAQ_ITEMS = [
  {
    question: '성실신고확인제도란 정확히 무엇인가요?',
    answer:
      '성실신고확인제도는 업종별 수입금액이 일정 기준 이상인 개인사업자가 종합소득세 신고 전에 세무사 등으로부터 장부 기장 내용의 적정성을 확인받아야 하는 제도입니다(소득세법 §70의2). 확인 결과는 성실신고확인서 형태로 신고서에 첨부되며, 국세청은 이를 통해 고소득 자영업자의 성실 신고를 유도합니다.',
  },
  {
    question: '성실신고확인 대상자는 어떻게 정해지나요?',
    answer:
      '직전연도 업종별 수입금액이 소득세법 시행령 §133에서 정한 기준을 넘으면 대상자로 정해집니다. 도매·소매업 등은 15억원 이상, 제조업·건설업 등은 7.5억원 이상, 부동산임대업·전문서비스업 등은 5억원 이상이 기준입니다. 둘 이상의 업종을 겸업하면 별도 환산 계산식이 적용되므로 세무사 상담이 권장됩니다.',
  },
  {
    question: '신고 기한이 왜 6월 30일까지인가요?',
    answer:
      '성실신고확인 대상자는 일반 종합소득세 신고기한(5월 31일)보다 1개월 늦은 6월 30일까지 신고·납부할 수 있습니다(소득세법 §70의2). 세무사의 확인 절차에 시간이 걸리는 점을 고려한 배려이며, 자동으로 연장되므로 별도 신청은 필요 없습니다.',
  },
  {
    question: '성실신고확인비용은 세액공제를 받을 수 있나요?',
    answer:
      '네, 성실신고확인에 지출한 비용의 60%를 종합소득세에서 세액공제받을 수 있습니다(조세특례제한법 §126의6). 다만 연간 공제 한도가 있으므로, 정확한 한도 금액은 신고 연도의 조특법 조문과 국세청 안내를 통해 반드시 재확인해야 합니다.',
  },
  {
    question: '성실신고확인서를 안 내면 어떻게 되나요?',
    answer:
      '성실신고확인서를 제출하지 않으면 미제출 가산세가 부과되고 세무조사 대상으로 선정될 위험이 커집니다. 정확한 가산세 산식과 요율은 매년 국세청 고시로 확정되므로, 대상자로 판단되면 임의로 넘기지 말고 반드시 세무사와 상담해 제출 여부를 확정해야 합니다.',
  },
  {
    question: '도소매업 수입금액이 14억원이면 대상인가요?',
    answer:
      '아닙니다. 도매·소매업 등 1군 업종의 기준은 15억원 이상이므로, 수입금액 14억원은 기준에 미달해 성실신고확인 대상이 아닙니다. 반대로 16억원이면 기준을 넘어 대상자가 됩니다.',
  },
  {
    question: '서비스업 수입금액이 5.2억원이면 대상인가요?',
    answer:
      '네, 대상입니다. 부동산임대업·전문서비스업 등 서비스업 기준은 5억원 이상이므로 5.2억원은 기준을 초과해 성실신고확인 대상자가 됩니다. 반면 4.8억원은 기준에 못 미쳐 대상이 아닙니다.',
  },
  {
    question: '성실사업자 의료비·교육비 세액공제는 무엇인가요?',
    answer:
      '성실신고확인을 받은 사업자는 근로소득자처럼 의료비·교육비 지출액 일부를 세액공제받을 수 있는 제도입니다(조세특례제한법 §122의3). 성실신고확인비용 세액공제와는 별개의 혜택이므로, 두 공제를 모두 챙기는지 신고 전에 세무사와 함께 점검하는 것이 좋습니다.',
  },
];

export default function HonestTaxReturnConfirmation2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '성실신고확인제도 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '성실신고확인제도 2026: 업종별 대상 기준과 신고기한 완전정리',
    description:
      '업종별 수입금액 기준(소득세법 시행령 §133), 6월 30일 연장 신고기한, 확인비용 60% 세액공제(조특법 §126의6)까지 성실신고확인제도를 완전 정리했습니다.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['성실신고확인제도', '성실신고확인 대상', '종합소득세 신고기한', '성실신고확인비용 세액공제'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '성실신고확인제도 2026',
    description:
      '개인사업자·프리랜서를 위한 성실신고확인제도 대상 기준, 신고기한, 세액공제 완전 가이드.',
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
                    { name: '성실신고확인제도 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">개인사업자·프리랜서 · 8분 읽기 · 2026-07-19</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  성실신고확인제도 2026
                  <br />
                  <span className="text-2xl text-text-secondary">: 개인사업자 대상 기준과 신고기한 완전정리</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  업종별 수입금액이 일정 기준을 넘는 개인사업자는 종합소득세를 신고하기 전에 세무사 등 전문가의 확인을 받아야 합니다. 이 제도가 바로 성실신고확인제도입니다. 이 가이드는 업종별 대상 기준, 연장된 신고기한, 확인비용 세액공제, 미제출 시 불이익까지 성실신고확인제도의 핵심을 정리해드립니다.
                </p>
              </header>

              <AdSlot slot="guide-honest-tax-return-confirmation-top" format="horizontal" />

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">성실신고확인제도란 무엇인가요?</h2>
                <p>
                  성실신고확인제도란 업종별 수입금액이 일정 기준 이상인 개인사업자가 종합소득세를 신고할 때, 세무사 등으로부터 장부 기장 내용과 수입·비용의 적정성을 미리 확인받도록 하는 제도입니다(소득세법 §70의2). 확인을 마치면 세무사가 작성한 성실신고확인서를 종합소득세 신고서에 첨부해 제출합니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">제도의 핵심 요약</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    대상: 업종별 기준 수입금액 이상인 개인사업자(소득세법 시행령 §133)
                    <br />
                    절차: 세무사 확인 후 성실신고확인서 첨부 제출
                    <br />
                    혜택: 신고기한 1개월 연장(6월 30일), 확인비용 60% 세액공제(조특법 §126의6)
                  </p>
                </div>
                <p className="mt-4">
                  이 제도는 수입금액이 큰 개인사업자일수록 세무 처리가 복잡해지고 탈루 위험도 커진다는 점에서, 전문가 검증을 거쳐 신고의 정확성을 높이기 위해 도입됐습니다.
                </p>
                <p className="mt-4">
                  다만 성실신고확인 대상이라고 해서 세무조사를 면제받는 것은 아닙니다. 오히려 국세청이 고수입 개인사업자를 관리하는 수단 중 하나이므로, 대상자로 통보받으면 절차를 소홀히 하지 말아야 합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">누가 대상인가요? 업종별 수입금액 기준</h2>
                <p>
                  성실신고확인 대상 여부는 직전연도 수입금액을 업종별 기준과 비교해 판정합니다(소득세법 시행령 §133). 같은 개인사업자라도 업종에 따라 기준 금액이 크게 다릅니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 업종별 성실신고확인 대상 수입금액 기준 (소득세법 시행령 §133, 2026 기준)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">업종 구분</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">해당 업종 예시</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">기준 수입금액</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">1군</td>
                        <td className="p-3">농업·임업·어업, 광업, 도매·소매업, 부동산매매업 등</td>
                        <td className="p-3"><strong>15억원 이상</strong></td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">2군</td>
                        <td className="p-3">제조업, 숙박·음식점업, 건설업, 운수업, 금융·보험업 등</td>
                        <td className="p-3"><strong>7.5억원 이상</strong></td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">3군</td>
                        <td className="p-3">부동산임대업, 전문·과학·기술서비스업, 교육서비스업, 보건업 등 서비스업</td>
                        <td className="p-3"><strong>5억원 이상</strong></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  세 기준 중 어느 업종에 해당하는지는 국세청 업종코드를 기준으로 판정하며, 동일 사업자가 두 업종 이상을 겸업하면 수입금액을 업종별로 안분해 환산한 뒤 판정합니다.
                </p>
                <p className="mt-4">
                  다만 기준은 직전연도 수입금액을 기준으로 하므로, 올해 수입이 급증했어도 당해연도에는 대상이 아닐 수 있습니다. 반대로 올해 수입이 줄었더라도 작년 수입이 기준을 넘었다면 대상자입니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">계산 사례로 대상 여부를 확인해볼까요?</h2>
                <p>
                  기준 금액을 아주 근소하게 넘거나 못 미치는 경계 사례를 살펴보면 판정 기준을 더 명확히 이해할 수 있습니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 1. 도매업 수입금액 16억원 vs 14억원</p>
                  <p className="text-sm text-text-secondary">
                    · 업종: 도매업(1군, 기준 15억원 이상)
                    <br />
                    · 직전연도 수입금액 16억원 → 기준 15억원 이상 충족 → <strong>대상</strong>
                    <br />
                    · 직전연도 수입금액 14억원 → 기준 미달 → <strong>비대상</strong>
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 15억원을 기준으로 1억원 차이만으로 대상 여부가 갈립니다.</span>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 2. 서비스업 수입금액 5.2억원 vs 4.8억원</p>
                  <p className="text-sm text-text-secondary">
                    · 업종: 전문서비스업(3군, 기준 5억원 이상)
                    <br />
                    · 직전연도 수입금액 5.2억원 → 기준 5억원 이상 충족 → <strong>대상</strong>
                    <br />
                    · 직전연도 수입금액 4.8억원 → 기준 미달 → <strong>비대상</strong>
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 서비스업은 기준선이 낮아 중소 규모 사업자도 대상이 될 수 있습니다.</span>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 3. 제조업 수입금액 8억원</p>
                  <p className="text-sm text-text-secondary">
                    · 업종: 제조업(2군, 기준 7.5억원 이상)
                    <br />
                    · 직전연도 수입금액 8억원 → 기준 7.5억원 이상 충족 → <strong>대상</strong>
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 업종군별 기준이 다르므로 같은 8억원이라도 업종에 따라 판정이 달라집니다.</span>
                  </p>
                </div>
                <p className="mt-4">
                  다만 실제 판정에는 겸업 여부, 사업장 통합·분리 여부 등 세부 사정이 반영되므로, 기준 금액 근처에 있다면 반드시 세무사와 함께 정확한 수입금액을 재계산해야 합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">신고 기한은 언제까지인가요?</h2>
                <p>
                  성실신고확인 대상자의 종합소득세 신고·납부 기한은 6월 30일까지로, 일반 신고자의 5월 31일보다 1개월 연장됩니다(소득세법 §70의2). 세무사의 확인 절차에 걸리는 시간을 고려한 조치입니다.
                </p>
                <p className="mt-4">
                  이 연장은 자동으로 적용되므로 대상자가 별도로 연장 신청서를 낼 필요는 없습니다. 다만 성실신고확인서를 세무사에게 의뢰하는 시점이 늦어지면 6월 30일 기한도 촉박해질 수 있으므로, 통상 5월 안에는 확인 절차를 시작하는 것이 안전합니다.
                </p>
                <p className="mt-4">
                  다만 부가가치세 신고나 다른 세목의 신고기한까지 연장되는 것은 아닙니다. 성실신고확인 대상자라도 부가가치세는 일반 일정대로 신고해야 합니다.
                </p>
              </section>

              <AdSlot slot="guide-honest-tax-return-confirmation-mid" format="rectangle" />

              <section className="space-y-6 border-t border-border-base pt-8" data-speakable>
                <h2 className="text-2xl font-bold">확인비용은 세액공제 받을 수 있나요?</h2>
                <p>
                  네, 성실신고확인에 지출한 비용의 60%를 종합소득세 산출세액에서 세액공제받을 수 있습니다(조세특례제한법 §126의6). 세무사에게 지급한 확인 수수료 자체가 공제 대상이 되는 구조입니다.
                </p>
                <p className="mt-4">
                  다만 이 공제에는 연간 한도가 정해져 있습니다. 한도 금액은 조세특례제한법 개정에 따라 조정될 수 있으므로, 신고 연도 기준 최신 한도는 국세청 홈택스 안내 또는 세무사를 통해 반드시 재확인해야 합니다.
                </p>
                <p className="mt-4">
                  이와 별개로, 성실신고확인을 받은 사업자는 근로소득자처럼 의료비·교육비 지출액 일부를 세액공제받을 수 있는 성실사업자 특례도 함께 적용받을 수 있습니다(조세특례제한법 §122의3).
                </p>
                <p className="mt-4">
                  다만 확인비용 세액공제는 성실신고확인서를 실제로 제출한 경우에만 적용됩니다. 확인만 받고 서류를 첨부하지 않으면 공제 자체가 부인될 수 있습니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">성실신고확인서를 안 내면 어떻게 되나요?</h2>
                <p>
                  성실신고확인서를 제출하지 않으면 미제출 가산세가 부과되고, 세무조사 대상자로 선정될 위험이 높아집니다. 가산세는 산출세액 중 사업소득금액이 차지하는 비율을 기준으로 산정되는 구조입니다.
                </p>
                <p className="mt-4">
                  정확한 가산세율과 산식은 매년 국세청 고시와 소득세법 시행령을 통해 확정되므로, 이 글에서 구체적 비율을 단정하기보다는 대상자로 확인되는 즉시 국세청 홈택스 안내 또는 세무사 상담을 통해 정확한 금액을 확인하는 방법을 권장합니다.
                </p>
                <p className="mt-4">
                  다만 가산세보다 더 큰 리스크는 세무조사 선정 가능성입니다. 성실신고확인서 미제출은 국세청이 고수입 사업자의 신고 성실도를 판단하는 주요 지표 중 하나이므로, 대상자라면 기한 내 제출을 최우선으로 챙겨야 합니다.
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
                    <p className="mt-1 text-sm text-text-secondary">수입금액과 경비율을 입력해 예상 세액을 계산해보세요.</p>
                  </Link>
                  <Link
                    href="/guide/comprehensive-income-tax-rate-brackets-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">종합소득세 세율 구간 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">누진세율과 누진공제 구조를 먼저 이해하세요.</p>
                  </Link>
                  <Link
                    href="/guide/freelancer-simplified-vs-standard-expense-rate-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">단순경비율 vs 기준경비율</div>
                    <p className="mt-1 text-sm text-text-secondary">경비율 방식에 따라 세부담이 어떻게 달라지는지 비교하세요.</p>
                  </Link>
                  <Link
                    href="/guide/bookkeeping-obligation-double-entry-vs-simple-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">복식부기 vs 간편장부 기장의무</div>
                    <p className="mt-1 text-sm text-text-secondary">수입금액에 따른 기장의무 기준과 성실신고 대상 여부를 함께 확인하세요.</p>
                  </Link>
                  <Link
                    href="/guide/business-registration-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">사업자등록 절차 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">개업 초기 사업자등록 방법과 유의사항을 확인하세요.</p>
                  </Link>
                  <Link
                    href="/category/tax/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">모든 세금 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">종합소득세·양도세·취득세·재산세 모음.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 교육 목적으로 작성되었으며, 개인 맞춤형 세무 조언이 아닙니다. 실제 성실신고확인 대상 여부, 확인비용 세액공제 한도, 미제출 가산세율은 매년 세법 개정에 따라 달라질 수 있으므로 국세청 홈택스 또는 세무사를 통해 반드시 재확인하세요. 본 콘텐츠는 2026-07-19을 기준으로 작성되었으며, 소득세법 개정 시 즉시 업데이트됩니다. 인용한 법조항은 <strong>소득세법 §70의2(성실신고확인서 제출), 소득세법 시행령 §133(성실신고확인대상사업자), 조세특례제한법 §126의6(성실신고확인비용에 대한 세액공제), 조세특례제한법 §122의3(성실사업자에 대한 세액공제)</strong>입니다. AI 보조 작성 후 운영자 검수 완료.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터</a>,{' '}
                  <a href="https://www.nts.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">국세청</a>,{' '}
                  <a href="https://www.hometax.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">국세청 홈택스</a>.
                </p>
              </section>

              <ShareButtons
                title="성실신고확인제도 2026 가이드"
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
