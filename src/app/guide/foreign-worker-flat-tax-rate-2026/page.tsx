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

const URL = 'https://calculatorhost.com/guide/foreign-worker-flat-tax-rate-2026/';
const DATE_PUBLISHED = '2026-09-05';
const DATE_MODIFIED = '2026-09-05';

export const metadata: Metadata = {
  title: '외국인근로자 단일세율 19% 과세특례 신청 방법 2026',
  description:
    '외국인 근로자는 최초 근로제공일부터 20년간 근로소득의 19%만 내는 단일세율을 선택할 수 있습니다. 대상 요건, 신청서 제출 방법과 기한을 조세특례제한법 §18조의2 기준으로 정리하고, 2026년 세제개편안의 21% 인상안까지 확인합니다.',
  keywords: [
    '외국인근로자 단일세율',
    '외국인 과세특례',
    '외국인근로자단일세율적용신청서',
    '조세특례제한법 18조의2',
    '외국인 근로소득세 19%',
    '연말정산 외국인근로자',
    '2026 세제개편안 외국인',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '외국인근로자 단일세율 19% 과세특례 신청 방법 2026' }],
    title: '외국인근로자 단일세율 19% 과세특례, 신청 방법과 기한 2026',
    description: '최초 근로제공일부터 20년간 근로소득의 19%만 부담. 대상·신청서·제출기한과 2026년 세제개편안까지 정리.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '외국인근로자 단일세율 19% 과세특례 신청 방법 2026',
    description: '20년간 근로소득 19% 단일세율. 대상·신청서·기한을 조세특례제한법 §18조의2 기준으로 정리.',
  },
};

const FAQ_ITEMS = [
  {
    question: '외국인근로자 단일세율은 누구나 신청할 수 있나요?',
    answer:
      '아닙니다. 일용근로자는 제외되고, 특수관계인에게 근로를 제공하는 경우도 제외됩니다. 과세기간 종료일 현재 대한민국 국적이 없어야 하며, 2026년 12월 31일 이전에 국내에서 최초로 근로를 제공하기 시작한 외국인 임원 또는 사용인이어야 신청할 수 있습니다(조세특례제한법 §18조의2).',
  },
  {
    question: '단일세율을 선택하면 어떤 공제도 못 받나요?',
    answer:
      '그렇습니다. 단일세율을 선택하면 소득세법·조세특례제한법상 비과세·소득공제·세액공제 규정이 전혀 적용되지 않고, 해당 근로소득은 종합소득과세표준에도 합산하지 않습니다. 부양가족이 많거나 다른 공제 항목이 큰 경우에는 오히려 종합과세를 선택하는 편이 유리할 수 있습니다.',
  },
  {
    question: '신청서는 어디에, 어떻게 제출하나요?',
    answer:
      '연말정산이나 종합소득과세표준 확정신고를 할 때 근로소득자 소득·세액공제신고서에 외국인근로자단일세율적용신청서(조세특례제한법 시행규칙 별지 제8호서식)를 첨부해 원천징수의무자, 납세조합 또는 납세지 관할 세무서장에게 제출합니다.',
  },
  {
    question: '매월 급여를 받을 때도 단일세율을 적용할 수 있나요?',
    answer:
      '가능합니다. 매월분 근로소득을 지급받을 때 단일세율 적용을 원하면 근로를 제공한 날이 속하는 달의 다음 달 10일까지 관할 세무서장에게 신청서를 제출하면 됩니다. 연말정산 시점에 다시 신청해 종합과세와 단일세율 중 유리한 방식으로 최종 선택을 바꿀 수도 있습니다.',
  },
  {
    question: '20년이 지나면 어떻게 되나요?',
    answer:
      '국내에서 최초로 근로를 제공한 날부터 20년 이내에 끝나는 과세기간까지만 단일세율 특례가 적용됩니다. 그 이후 과세기간부터는 일반 근로자와 같이 종합소득세율(6~45%)로 과세됩니다. 20년의 기산일은 최초 근로 제공일이므로 회사를 옮겨도 다시 계산되지 않는 것이 원칙입니다.',
  },
  {
    question: '2026년 세제개편안이 통과되면 세율이 바로 21%로 오르나요?',
    answer:
      '아직 아닙니다. 2026년 8월 발표된 정부 세제개편안은 세율을 19%에서 21%로, 적용기한을 2029년 12월 31일까지 3년 연장하는 내용을 담고 있지만, 이 글 작성 시점(2026년 9월)까지 정기국회 심의를 거치지 않은 개정안 단계입니다. 통과되더라도 2027년 1월 1일 이후 발생하는 소득분부터 적용될 예정이므로, 최신 시행 여부는 국세청·기획재정부 공지로 별도 확인해야 합니다.',
  },
];

export default function ForeignWorkerFlatTaxRate2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '외국인근로자 단일세율 19% 과세특례 신청 방법 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '외국인근로자 단일세율 19% 과세특례, 신청 방법과 기한 2026',
    description:
      '외국인 근로자가 최초 근로제공일부터 20년간 근로소득의 19% 단일세율을 선택하는 요건, 신청서 제출 방법, 종합과세와의 비교, 2026년 세제개편안까지 조세특례제한법 §18조의2 기준으로 정리.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['외국인근로자 단일세율', '외국인 과세특례', '조세특례제한법 18조의2', '외국인 근로소득세'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '외국인근로자 단일세율 19% 과세특례 신청 방법 2026',
    description:
      '외국인근로자 단일세율 과세특례의 대상 요건, 세율·적용기간, 종합과세와의 비교, 신청 방법과 2026년 세제개편안 동향.',
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
                    { name: '외국인근로자 단일세율 19% 과세특례 신청 방법 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">외국인근로자 · 9분 읽기 · 2026-09-05</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  외국인근로자 단일세율 19% 과세특례
                  <br />
                  <span className="text-2xl text-text-secondary">· 신청 방법 2026</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  외국인 근로자는 매달 근로소득에서 세금을 떼는 대신, 국내 최초 근로제공일부터 20년간 근로소득의 19%만 내는 단일세율을 선택할 수 있습니다. 이 가이드는 신청 대상, 세율과 적용기간, 신청서 제출 방법과 기한, 종합과세와의 유불리 비교, 그리고 2026년 세제개편안의 인상 논의까지 조세특례제한법 §18조의2를 기준으로 정리합니다. 대상 독자는 국내에서 취업 중이거나 취업을 앞둔 외국인 근로자와 이들을 채용한 인사·급여 담당자입니다.
                </p>
              </header>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">외국인근로자 단일세율 과세특례란 무엇인가요?</h2>
                <p>
                  외국인근로자 단일세율 과세특례는 외국인 임원 또는 사용인이 근로소득세를 계산할 때, 소득공제를 뺀 종합과세 대신 근로소득 총액에 19%를 곱한 금액을 그대로 세액으로 선택할 수 있게 해주는 제도입니다(조세특례제한법 §18조의2). 지방소득세 10%를 더하면 실질 부담률은 약 20.9%가 됩니다.
                </p>
                <p>
                  이 제도의 목적은 해외 우수 인력의 국내 취업을 유인하는 것입니다. 근로소득이 높아 종합소득세 최고세율 구간(35~45%)에 가까운 외국인일수록 단일세율을 선택했을 때 세부담이 줄어드는 구조입니다. 다만 신청은 의무가 아니라 선택이므로, 매년 연말정산이나 확정신고 시점에 종합과세와 비교해 유리한 쪽을 고를 수 있습니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">30초 요약</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    정의: 외국인근로자가 근로소득의 19%만 세금으로 내는 선택형 특례.
                    <br />
                    적용기간: 국내 최초 근로제공일부터 20년 이내 과세기간까지.
                    <br />
                    조건: 2026년 12월 31일 이전 국내 최초 근로 제공 개시(조세특례제한법 §18조의2).
                    <br />
                    주의: 선택 시 다른 비과세·공제·감면은 전부 배제.
                  </p>
                </div>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">누가 19% 단일세율을 신청할 수 있나요?</h2>
                <p>
                  대상은 외국인인 임원 또는 사용인이며, 일용근로자는 제외됩니다. 국적 요건도 있습니다. 해당 과세기간 종료일 현재 대한민국 국적을 가지지 않은 사람이어야 하고, 특수관계인에게 근로를 제공하는 경우는 특례 대상에서 빠집니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 외국인근로자 단일세율 과세특례 요건 (조세특례제한법 §18조의2)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">항목</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">내용</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">적용 대상</td>
                        <td className="p-3">외국인 임원·사용인(일용근로자·특수관계인 근로 제공 제외)</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">국적 요건</td>
                        <td className="p-3">과세기간 종료일 현재 대한민국 국적 미보유</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">근로 개시 기한</td>
                        <td className="p-3">2026년 12월 31일 이전 국내 최초 근로 제공 개시</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">적용 기간</td>
                        <td className="p-3">최초 근로제공일부터 20년 이내 종료하는 과세기간까지</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">세율</td>
                        <td className="p-3">근로소득 × 19%(지방소득세 포함 실효 약 20.9%)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  다만, 근로 제공 개시일이 국내 최초 취업일 기준이라는 점을 놓치기 쉽습니다. 국내에서 이미 한 번 근무한 적이 있다면 이직해도 20년 기산일은 처음 근무를 시작한 시점으로 고정되는 것이 원칙입니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">단일세율을 선택하면 종합과세보다 항상 유리한가요?</h2>
                <p>
                  아닙니다. 단일세율은 근로소득 전체에 19%를 곱해 계산하는 반면, 종합과세는 근로소득공제와 각종 공제를 뺀 뒤 6~45% 누진세율(소득세법 §55)을 적용합니다. 공제가 많거나 근로소득 자체가 크지 않은 경우에는 오히려 종합과세가 더 낮게 나올 수 있습니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 2. 총급여별 종합과세 vs 단일세율 세액 비교 (본인 기본공제만 반영한 단순 예시)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">총급여(연)</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">종합과세 예상 세액</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">단일세율(19%) 세액</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">유리한 방식</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">8,000만원</td>
                        <td className="p-3">약 1,076만원</td>
                        <td className="p-3">약 1,672만원</td>
                        <td className="p-3">종합과세</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">1억 5,000만원</td>
                        <td className="p-3">약 3,412만원</td>
                        <td className="p-3">약 3,135만원</td>
                        <td className="p-3">단일세율</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">3억원</td>
                        <td className="p-3">약 9,500만원</td>
                        <td className="p-3">약 6,270만원</td>
                        <td className="p-3">단일세율</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  예외: 위 종합과세 세액은 근로소득공제(소득세법 §47)와 본인 기본공제 150만원만 반영한 단순 계산입니다. 배우자·자녀 공제, 4대보험료 공제, 비과세 급여 항목까지 반영하면 종합과세 쪽 세액은 더 낮아질 수 있으므로, 실제 선택 전에는 홈택스 연말정산 간편계산이나 세무 전문가 확인을 권장합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">신청은 언제, 어떻게 하나요?</h2>
                <p>
                  연말정산이나 종합소득과세표준 확정신고를 할 때 근로소득자 소득·세액공제신고서에 외국인근로자단일세율적용신청서(조세특례제한법 시행규칙 별지 제8호서식)를 첨부해 원천징수의무자, 납세조합 또는 납세지 관할 세무서장에게 제출하면 됩니다.
                </p>
                <ul className="space-y-3 ml-6 list-decimal text-text-secondary">
                  <li>
                    <strong>매월 원천징수 시:</strong> 급여를 받을 때부터 바로 단일세율을 적용받고 싶다면, 근로를 제공한 날이 속하는 달의 다음 달 10일까지 관할 세무서장에게 신청서를 제출합니다.
                  </li>
                  <li>
                    <strong>연말정산 시:</strong> 매월 원천징수는 종합과세로 하고, 연말정산 시점에 신청서를 원천징수의무자에게 제출해 단일세율로 정산할 수도 있습니다.
                  </li>
                  <li>
                    <strong>확정신고 시:</strong> 연말정산을 놓쳤거나 별도로 신고하는 경우 5월 종합소득과세표준 확정신고 때 신청서를 첨부해 관할 세무서에 직접 제출합니다.
                  </li>
                </ul>
                <p className="mt-4">
                  다만, 매년 신청서를 새로 제출해야 하는 것은 아니지만 종합과세와 단일세율 중 방식을 바꾸려면 그 과세기간의 신고 시점에 다시 선택해 제출해야 합니다. 한 해 단일세율을 택했다고 다음 해에도 자동으로 유지되지 않으므로 매년 유불리를 다시 따져보는 것이 안전합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">2026년 세제개편안으로 세율이 바뀌나요?</h2>
                <p>
                  아직 확정되지 않았습니다. 기획재정부가 2026년 8월 발표한 2026년 세제개편안에는 외국인근로자 단일세율을 19%에서 21%로 올리고, 적용기한을 2026년 12월 31일에서 2029년 12월 31일까지 3년 연장하는 방안이 포함되어 있습니다. 내국인 근로자와의 과세형평을 감안한 조정이라는 것이 정부 설명입니다.
                </p>
                <p>
                  다만, 이 개정안은 관계부처 입법예고를 거쳐 2026년 9월 정기국회에 제출될 예정으로, 이 글을 작성한 2026년 9월 시점까지 국회를 통과하지 않은 개정안 단계입니다. 통과되어 시행되더라도 2027년 1월 1일 이후 발생하는 소득분부터 새 세율이 적용될 예정이므로, 2026년 귀속 근로소득에는 현행 19% 세율과 2026년 12월 31일 기한이 그대로 적용됩니다.
                </p>
                <p className="mt-4">
                  예외: 국내 최초 근로 제공을 2026년 안에 시작해야 하는 현행 기한이 임박했으므로, 올해 안에 취업이 확정된 외국인 근로자는 개정 논의와 별개로 현재 기준으로 신청 자격을 갖췄는지부터 확인해두는 것이 안전합니다. 최종 통과 여부와 시행일은 국세청·기획재정부 공식 발표로 다시 확인해야 합니다.
                </p>
              </section>

              <h2 className="text-2xl font-bold mb-6">자주 묻는 질문</h2>
              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h3 className="text-lg font-semibold text-text-primary">관련 계산기 및 가이드</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link
                    href="/calculator/salary/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">연봉 실수령액 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">단일세율 대신 4대보험·종합과세로 계산한 세후 월급을 확인하세요.</p>
                  </Link>
                  <Link
                    href="/calculator/freelancer-tax/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">프리랜서 종합소득세 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">사업소득자로 신고하는 경우의 종합소득세를 별도로 계산해보세요.</p>
                  </Link>
                  <Link
                    href="/guide/comprehensive-income-tax-rate-brackets-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">종합소득세 세율 구간 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">단일세율과 비교할 6~45% 누진세율 전체 구간을 확인하세요.</p>
                  </Link>
                  <Link
                    href="/guide/earned-income-deduction-brackets-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">근로소득공제 구간 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">종합과세를 선택할 때 먼저 차감되는 근로소득공제 계산법입니다.</p>
                  </Link>
                  <Link
                    href="/guide/year-end-tax-simplified-service-schedule-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">연말정산 간소화 서비스 일정</div>
                    <p className="mt-1 text-sm text-text-secondary">단일세율 신청서와 함께 제출하는 연말정산 전체 일정을 정리했습니다.</p>
                  </Link>
                  <Link
                    href="/category/tax/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">모든 세금 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">소득세·양도세·취득세·상속세 등 세금 계산기 모음.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 이 글은 AI 보조로 자동 생성되어 자동 품질 게이트를 통과한 뒤 발행되었습니다. 발행 시점에 사람의 사전 검수는 없었으며, 운영자가 사후 점검합니다. 본문의 세액 비교는 본인 기본공제만 반영한 단순 예시로, 실제 세액은 부양가족·4대보험료·비과세 급여 등 개인별 조건에 따라 달라집니다. 정확한 신청 자격과 세액은 국세청 홈택스 또는 관할 세무서, 세무 전문가와 확인하세요. 본 콘텐츠는 2026-09-05를 기준으로 작성되었으며, 2026년 세제개편안 등 법령 변경 시 업데이트됩니다. 인용 법조항: 조세특례제한법 §18조의2(외국인근로자에 대한 과세특례), 소득세법 §47(근로소득공제), 소득세법 §55(세율).
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터</a>,{' '}
                  <a href="https://www.hometax.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">국세청 홈택스</a>,{' '}
                  <a href="https://www.moef.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">기획재정부</a>.
                </p>
              </section>

              <ShareButtons
                title="외국인근로자 단일세율 19% 과세특례 신청 방법 2026 가이드"
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
