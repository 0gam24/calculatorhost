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

const URL = 'https://calculatorhost.com/guide/tax-audit-selection-criteria-2026/';
const DATE_PUBLISHED = '2026-09-08';
const DATE_MODIFIED = '2026-09-08';

export const metadata: Metadata = {
  title: '세무조사 선정 기준 2026, 정기·비정기 조사 대상 되는 이유',
  description:
    '세무조사 대상은 무작위로 정해지지 않습니다. 국세기본법 §81-6에 따른 신고성실도 분석·장기 미조사·무작위추출 정기선정 기준과 탈세 제보 등 비정기 조사 사유, 매출 규모별 순환조사 주기를 정리했습니다.',
  keywords: [
    '세무조사 선정 기준',
    '세무조사 대상',
    '정기조사',
    '비정기조사',
    '신고성실도',
    '세무조사 사전통지',
    '국세기본법 81조의6',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '세무조사 선정 기준 2026, 정기·비정기 조사 대상 되는 이유' }],
    title: '세무조사 선정 기준 2026, 정기·비정기 조사 대상 되는 이유',
    description: '신고성실도 분석·장기 미조사·무작위추출 정기선정 기준과 비정기 조사 사유를 국세기본법 §81-6 기준으로 정리.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '세무조사 선정 기준 2026, 정기·비정기 조사 대상 되는 이유',
    description: '신고성실도 분석·장기 미조사·무작위추출 정기선정과 비정기 조사 사유를 국세기본법 §81-6 기준으로 정리.',
  },
};

const FAQ_ITEMS = [
  {
    question: '세무조사는 왜 우리 사업장에 나왔나요?',
    answer:
      '세무조사는 국세기본법 §81-6에 따라 정기선정 또는 비정기선정 두 방식 중 하나로 나옵니다. 정기선정은 신고성실도 분석 결과나 장기간 조사받지 않은 이력, 무작위추출 표본조사 중 하나에 해당해 선정된 것이고, 비정기선정은 탈세 제보나 명백한 탈루 혐의 자료가 확인된 경우입니다. 통지서에 조사 사유가 표시되므로 먼저 그 근거를 확인하는 것이 순서입니다.',
  },
  {
    question: '세무조사 대상 선정 기준을 사업자가 미리 알 수 있나요?',
    answer:
      '선정 기준 자체는 국세기본법 §81-6과 그 시행령에 공개돼 있지만, 개별 사업자가 자신이 왜 선정됐는지 사전에 통보받지는 않습니다. 다만 세무조사 사전통지서(§81-7)에는 조사 대상 세목과 기간, 조사 사유가 함께 기재되므로 통지를 받은 후에 정확한 선정 근거를 확인할 수 있습니다.',
  },
  {
    question: '무작위추출로 선정되면 정말 무작위인가요, 억울하지 않나요?',
    answer:
      '무작위추출 표본조사는 신고 불성실 혐의와 무관하게 성실신고 문화를 검증하려는 목적의 정기선정 방식 중 하나입니다. 특정 혐의가 있어서가 아니라 순수 표본 목적으로 선정될 수 있으므로, 조사 통지를 받았다고 해서 곧바로 탈루 혐의를 의심받는 것은 아닙니다. 다만 조사 과정에서 신고 오류가 발견되면 그에 따른 추징은 별개로 이뤄집니다.',
  },
  {
    question: '세무조사 사전통지 없이 갑자기 조사가 나올 수도 있나요?',
    answer:
      '원칙은 조사 시작 15일 전 사전통지지만, 증거 인멸 우려가 있거나 사전통지로 조사 목적을 달성하기 어렵다고 인정되는 경우에는 통지 없이 조사가 개시될 수 있습니다(국세기본법 §81-7). 현금 매출 누락이나 이중장부 같은 명백한 탈루 정황이 있는 사안에서 주로 적용됩니다.',
  },
  {
    question: '폐업하면 세무조사를 피할 수 있나요?',
    answer:
      '아니오. 폐업은 사업자등록의 종료일 뿐 과거 신고 내용에 대한 조사 대상 지위를 소멸시키지 않습니다. 폐업 후에도 국세부과 제척기간(통상 5년, 부정행위는 10년) 내라면 과거 사업연도의 신고 내용에 대해 세무조사를 받을 수 있습니다. 오히려 폐업 직전 매출·재고 처리가 조사에서 자주 확인되는 항목입니다.',
  },
  {
    question: '카드매출만 있어도 세무조사 대상이 될 수 있나요?',
    answer:
      '가능합니다. 신고성실도 분석은 카드매출·현금영수증·세금계산서 자료를 종합해 소득 대비 지출, 동일 업종 평균과의 괴리 등을 함께 평가합니다. 현금거래 비중이 낮다고 해서 정기선정 대상에서 자동으로 제외되는 것은 아니며, 경비 처리나 매입 자료의 이상 여부도 함께 분석 대상이 됩니다.',
  },
  {
    question: '세무조사에서 오류가 발견되면 바로 세금을 더 내야 하나요?',
    answer:
      '조사가 끝나면 국세청이 조사 결과를 통지하고, 이의가 없으면 경정·결정 처분을 거쳐 본세와 가산세가 고지됩니다. 결과에 이견이 있으면 과세전적부심사·이의신청·심사청구 등 불복 절차를 이용할 수 있습니다. 자진해서 먼저 오류를 바로잡고 싶다면 조사 통지 전에 수정신고나 경정청구로 가산세를 줄이는 방법도 있습니다.',
  },
];

export default function TaxAuditSelectionCriteria2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '세무조사 선정 기준 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '세무조사 선정 기준 2026, 정기·비정기 조사 대상 되는 이유',
    description:
      '신고성실도 분석·장기 미조사·무작위추출 정기선정 기준, 탈세 제보 등 비정기 조사 사유, 매출 규모별 순환조사 주기, 사전통지 절차를 국세기본법 §81-6·§81-7 기준으로 정리.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['세무조사 선정 기준', '정기조사', '비정기조사', '신고성실도', '국세기본법 81조의6'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '세무조사 선정 기준 2026',
    description:
      '세무조사 정기선정·비정기선정 기준, 매출 규모별 순환조사 주기, 사전통지 절차를 정리한 가이드.',
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
                    { name: '세무조사 선정 기준 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">사업자·개인사업자 · 8분 읽기 · 2026-09-08</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  세무조사 선정 기준 2026
                  <br />
                  <span className="text-2xl text-text-secondary">· 정기조사와 비정기조사, 누가 대상이 되나</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  세무조사 대상은 매출 규모만으로 무작위로 정해지지 않습니다. 이 가이드는 국세기본법 §81-6·§81-7을 기준으로 정기선정 3가지 기준(신고성실도 분석·장기 미조사·무작위추출), 탈세 제보 같은 비정기 조사 사유, 매출 규모가 큰 사업자에게 적용되는 순환조사 주기, 사전통지 절차를 정리합니다. 대상 독자는 개인사업자·법인 대표 등 세무조사 통지를 받았거나 미리 대비하려는 사업자입니다.
                </p>
              </header>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">세무조사 대상은 어떻게 정해지나요?</h2>
                <p>
                  세무조사 대상은 정기선정과 비정기선정, 두 갈래 중 하나로 정해집니다. 국세기본법 §81-6은 세무조사의 관할과 대상자 선정 절차를 규정하며, 지방국세청장이나 세무서장이 매년 일정 기준에 따라 정기적으로 선정하는 방식과 특정 사유가 확인될 때 수시로 선정하는 방식을 함께 두고 있습니다.
                </p>
                <p>
                  정기선정은 특정 혐의를 전제하지 않는 검증 목적의 조사인 반면, 비정기선정은 신고 내용에 탈루나 오류 혐의를 인정할 만한 자료가 있을 때 이뤄지는 조사입니다. 따라서 조사 통지를 받았다고 해서 곧바로 탈세 혐의자로 취급되는 것은 아니며, 어느 방식으로 선정됐는지가 통지 내용을 이해하는 첫 단계입니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 정기선정 vs 비정기선정 (국세기본법 §81-6)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">구분</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">선정 근거</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">혐의 전제 여부</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">정기선정</td>
                        <td className="p-3">신고성실도 분석·장기 미조사·무작위추출</td>
                        <td className="p-3">전제하지 않음</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">비정기선정</td>
                        <td className="p-3">탈세 제보·명백한 탈루 혐의 자료 등</td>
                        <td className="p-3">구체적 혐의 전제</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">30초 요약</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    정의: 세무조사 대상 선정은 정기선정과 비정기선정 두 방식.
                    <br />
                    정기선정 근거: 신고성실도 분석, 장기 미조사, 무작위추출(국세기본법 §81-6).
                    <br />
                    비정기선정 근거: 탈세 제보, 명백한 탈루 혐의 자료 등.
                    <br />
                    사전통지: 원칙적으로 조사 개시 15일 전(국세기본법 §81-7).
                  </p>
                </div>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">정기조사 대상 선정 기준은 무엇인가요?</h2>
                <p>
                  정기조사는 신고성실도 분석, 장기 미조사, 무작위추출 표본조사라는 세 가지 기준 중 하나에 해당할 때 선정됩니다(국세기본법 §81-6②). 신고성실도 분석은 종합소득세·부가가치세 신고 자료와 각종 과세정보를 국세청 전산시스템으로 비교해 같은 업종·규모 대비 신고 내용이 이례적인 사업자를 가려내는 절차입니다.
                </p>
                <p>
                  장기 미조사는 상당 기간 같은 세목의 조사를 받지 않은 사업자를 대상으로 성실신고 여부를 검증하는 기준으로, 국세기본법 시행령 §63-4(장기 미조사자에 대한 세무조사기준)에 근거를 둡니다. 무작위추출 표본조사는 특정 혐의와 무관하게 순수 표본을 뽑아 신고 전반의 성실도를 점검하는 방식입니다.
                </p>
                <p className="mt-4">
                  다만, 세 기준 중 신고성실도 분석과 장기 미조사는 사업자의 과거 신고 이력이 누적된 결과로 나타나므로, 특정 연도의 매출 급증이나 급감만으로 즉시 선정되는 것은 아닙니다. 여러 과세기간의 추이를 함께 본다는 점에 유의해야 합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">어떤 경우에 비정기 세무조사를 받나요?</h2>
                <p>
                  비정기(수시) 세무조사는 신고 내용에 탈루나 오류의 혐의를 인정할 만한 명백한 자료가 있을 때 이뤄집니다(국세기본법 §81-6③ 제4호). 구체적인 탈세 제보가 접수되거나, 거래상대방에 대한 세무조사 과정에서 관련 거래가 함께 확인되는 경우, 무자료 거래나 이중장부처럼 신고 누락을 뒷받침하는 자료가 발견된 경우가 대표적입니다.
                </p>
                <p>
                  비정기선정은 정기선정과 달리 구체적인 혐의를 전제하기 때문에, 조사 범위가 해당 혐의와 관련된 세목·과세기간에 집중되는 경우가 많습니다. 다만 조사 과정에서 다른 항목의 오류가 함께 발견되면 그 부분도 과세 대상에 포함될 수 있습니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3">
                  <p className="font-semibold text-text-primary">사례. 매입세금계산서 없이 현금매입만 반복 신고한 개인사업자</p>
                  <p className="text-sm text-text-secondary">
                    · 상황: 3개 과세기간 연속으로 매입 증빙 없는 현금 지출 비중이 동일 업종 평균보다 크게 높음
                    <br />
                    · 선정 경로: 국세청 전산 분석으로 이상 징후 포착 후 비정기 세무조사 통지
                    <br />
                    · 결론: 통지서에 명시된 조사 대상 세목·기간을 확인하고 증빙 서류부터 정리하는 것이 우선입니다.
                  </p>
                </div>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">매출이 큰 사업자는 왜 주기적으로 조사를 받나요?</h2>
                <p>
                  국세청은 수입금액 규모가 큰 법인과 개인사업자에 대해 일정 주기로 순환조사를 실시한다고 밝히고 있습니다. 국세청이 공개한 정기조사 선정기준에 따르면 연간 수입금액이 큰 법인·개인사업자는 장기 미조사 상태로 방치되지 않도록 순환 주기를 두어 관리합니다.
                </p>
                <p>
                  이는 매출 규모가 클수록 세원 관리의 사회적 영향이 크다는 판단에 따른 것으로, 신고 오류나 탈루 혐의가 없더라도 일정 기간 내 조사 이력이 없으면 정기선정 대상에 오를 가능성이 높아집니다. 정확한 수입금액 기준 구간과 주기는 매년 국세청 누리집 공지로 갱신되므로, 최신 수치는 국세청 국세정책/제도 페이지에서 직접 확인하는 것이 정확합니다.
                </p>
                <p className="mt-4">
                  다만, 이 순환조사 기준은 매출 규모만을 근거로 하며 탈루 혐의를 전제하지 않습니다. 따라서 순환조사 대상 통지를 받아도 곧바로 추징이 이뤄지는 것은 아니고, 신고 내용에 오류가 없다면 조사 종결로 마무리되는 경우도 많습니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">세무조사 사전통지는 언제, 어떻게 오나요?</h2>
                <p>
                  세무조사는 원칙적으로 조사를 시작하기 15일 전에 조사 대상 세목, 조사 기간, 조사 사유를 적은 사전통지서를 받습니다(국세기본법 §81-7). 통지를 받은 사업자는 천재지변 등 대통령령으로 정하는 사유가 있으면 관할 세무관서에 조사 연기를 신청할 수 있습니다.
                </p>
                <p>
                  다만 사전통지가 증거 인멸 등으로 조사 목적 달성을 어렵게 할 우려가 있다고 인정되는 경우에는 통지 없이 조사가 개시될 수 있습니다. 이런 예외는 이중장부·차명계좌처럼 명백한 증거 인멸 우려가 있는 사안에 한정해 적용됩니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 2. 세무조사 사전통지 절차 (국세기본법 §81-7)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">항목</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">내용</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">통지 시점</td>
                        <td className="p-3">조사 개시 15일 전 (원칙)</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">통지 내용</td>
                        <td className="p-3">조사 대상 세목, 조사 기간, 조사 사유</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">연기 신청</td>
                        <td className="p-3">천재지변 등 사유 시 관할 세무관서에 신청 가능</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">통지 생략</td>
                        <td className="p-3">증거 인멸 우려 등 조사 목적 달성이 어려운 경우</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">세무조사 대상이 되지 않으려면 어떻게 해야 하나요?</h2>
                <p>
                  가장 확실한 방법은 매입·매출 증빙을 빠짐없이 갖추고 신고 내용을 실제 거래와 일치시키는 것입니다. 신고성실도 분석은 동일 업종 평균과의 괴리, 매출 대비 경비 비율의 이례성 등을 함께 살피므로, 근거 없는 경비 과다 계상이나 매출 누락은 정기선정 확률을 높이는 대표적인 요인입니다.
                </p>
                <p>
                  또한 장기간 조사를 받지 않은 사업자일수록 정기선정 대상에 오를 가능성이 있으므로, 조사를 받은 적이 없다는 사실 자체를 안전하다고 여기기보다는 매년 신고 내용을 스스로 점검하는 것이 바람직합니다. 신고 후 오류를 발견했다면 조사 통지 전에 수정신고나 경정청구로 먼저 바로잡는 것이 가산세 부담을 줄이는 방법입니다.
                </p>
                <p className="mt-4">
                  다만, 아무리 성실하게 신고해도 무작위추출 표본조사 대상에 포함될 가능성은 남아 있습니다. 이 경우 조사에 성실히 협조하고 요청 자료를 정리해 제출하는 것이 조사 기간을 단축하는 현실적인 방법입니다.
                </p>
              </section>

              <h2 className="text-2xl font-bold mb-6">자주 묻는 질문</h2>
              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h3 className="text-lg font-semibold text-text-primary">관련 계산기 및 가이드</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link
                    href="/guide/income-tax-late-filing-penalty-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">종합소득세 무신고·과소신고 가산세</div>
                    <p className="mt-1 text-sm text-text-secondary">조사에서 오류가 발견됐을 때 붙는 가산세 구조.</p>
                  </Link>
                  <Link
                    href="/guide/vat-penalty-underreporting-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">부가세 과소신고 가산세</div>
                    <p className="mt-1 text-sm text-text-secondary">매출 누락이 확인됐을 때의 부가세 추징 구조.</p>
                  </Link>
                  <Link
                    href="/guide/income-tax-correction-claim-5-year-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">종합소득세 경정청구 5년</div>
                    <p className="mt-1 text-sm text-text-secondary">조사 전에 스스로 신고 오류를 바로잡는 방법.</p>
                  </Link>
                  <Link
                    href="/calculator/freelancer-tax/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">프리랜서 종합소득세 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">경비율 적용 후 예상 세액을 계산해보세요.</p>
                  </Link>
                  <Link
                    href="/calculator/vat/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">부가가치세 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">매출·매입 세액을 입력해 납부세액을 확인하세요.</p>
                  </Link>
                  <Link
                    href="/category/tax/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">모든 세금 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">종합소득세·부가세·양도세·상속세 모음.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 이 글은 AI 보조로 자동 생성되어 자동 품질 게이트를 통과한 뒤 발행되었습니다. 발행 시점에 사람의 사전 검수는 없었으며, 운영자가 사후 점검합니다. 본 가이드는 교육 목적으로 작성되었으며 개별 사안에 대한 세무 자문이 아닙니다. 실제 조사 대상 선정 기준·수입금액 구간·순환주기는 매년 국세청 공지로 갱신될 수 있으므로 정확한 수치는 관할 세무서 또는 국세청 누리집에서 확인하세요. 본 콘텐츠는 2026-09-08을 기준으로 작성됐으며, 인용 법조항: 국세기본법 §81-6(세무조사 관할 및 대상자 선정), §81-7(세무조사의 통지와 연기신청 등), 국세기본법 시행령 §63-4(장기 미조사자에 대한 세무조사기준).
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터</a>,{' '}
                  <a href="https://www.nts.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">국세청 누리집(국세정책/제도, 세무조사 제도)</a>.
                </p>
              </section>

              <ShareButtons
                title="세무조사 선정 기준 2026 가이드"
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
