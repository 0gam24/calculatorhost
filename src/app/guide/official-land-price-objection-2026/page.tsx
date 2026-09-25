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

const URL = 'https://calculatorhost.com/guide/official-land-price-objection-2026/';
const DATE_PUBLISHED = '2026-09-26';
const DATE_MODIFIED = '2026-09-26';

export const metadata: Metadata = {
  title: '개별공시지가 이의신청 기한·절차 2026, 30일 안에 하는 법',
  description:
    '개별공시지가에 이의가 있다면 결정·공시일부터 30일 이내에 시장·군수·구청장에게 서면으로 이의신청을 해야 합니다. 신청 서류, 처리 기한, 표준지공시지가와의 차이, 재산세·종합부동산세에 미치는 영향까지 부동산 가격공시에 관한 법률 §7·§11 기준으로 정리했습니다.',
  keywords: [
    '개별공시지가 이의신청',
    '공시지가 이의신청 기한',
    '표준지공시지가 이의신청',
    '공시지가 조회',
    '부동산 가격공시에 관한 법률',
    '공시지가 재산세',
    '부동산공시법 11조',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '개별공시지가 이의신청 기한·절차 2026, 30일 안에 하는 법' }],
    title: '개별공시지가 이의신청 기한·절차 2026',
    description: '결정·공시일부터 30일 이내 시장·군수·구청장에게 서면 신청. 표준지공시지가 차이와 재산세 영향까지 정리.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '개별공시지가 이의신청 기한·절차 2026',
    description: '공시일부터 30일 이내 서면 신청, 처리기한 30일. 부동산 가격공시에 관한 법률 §7·§11 기준.',
  },
};

const FAQ_ITEMS = [
  {
    question: '개별공시지가 이의신청은 언제까지 해야 하나요?',
    answer:
      '결정·공시일부터 30일 이내입니다. 부동산 가격공시에 관한 법률 §11①에 따라 이 기간 안에 서면으로 시장·군수·구청장에게 제출해야 하며, 기한을 넘기면 정식 이의신청으로 처리되지 않는 것이 원칙입니다. 매년 공시 직후 일정을 챙겨 두는 것이 안전합니다.',
  },
  {
    question: '이의신청서는 어떻게 작성하나요?',
    answer:
      '이의신청서에 이의 사유를 증명하는 서류를 첨부해 제출합니다(같은 법 시행령 §22). 인근 유사 토지의 거래 사례, 감정평가 자료, 용도지역·지목 오류 근거 등 구체적 자료가 있어야 심사에서 받아들여질 가능성이 높아집니다. 단순히 가격이 높다는 주장만으로는 조정되기 어렵습니다.',
  },
  {
    question: '이의신청 결과는 언제 통지받나요?',
    answer:
      '이의신청 기간이 끝난 날부터 30일 이내에 서면으로 통지받습니다(§11②). 신청 내용이 타당하다고 인정되면 해당 개별공시지가를 조정해 다시 결정·공시하고, 타당하지 않다고 판단되면 기존 공시지가가 그대로 유지됩니다.',
  },
  {
    question: '표준지공시지가와 개별공시지가 이의신청은 무엇이 다른가요?',
    answer:
      '신청 대상 기관이 다릅니다. 표준지공시지가는 공시일부터 30일 이내 국토교통부장관에게(§7①), 개별공시지가는 같은 기간 시장·군수·구청장에게(§11①) 각각 신청합니다. 대부분의 개인 토지 소유자는 매년 공시되는 개별공시지가 쪽을 이용하게 됩니다.',
  },
  {
    question: '이의신청하면 재산세도 자동으로 줄어드나요?',
    answer:
      '자동으로 줄어들지는 않습니다. 이의신청으로 개별공시지가 자체가 조정되면 그 조정된 가격이 이후 재산세·종합부동산세 등 과세표준 산정에 반영되는 구조입니다. 이미 고지된 재산세 금액 자체에 불복하려면 별도의 재산세 이의신청 절차를 거쳐야 합니다.',
  },
  {
    question: '이의신청이 기각되면 더 다툴 방법이 없나요?',
    answer:
      '없지 않습니다. 이의신청 결과에도 승복하기 어렵다면 행정심판이나 행정소송 등 별도의 불복 절차를 검토할 수 있습니다. 다만 이의신청과 행정심판·행정소송은 요건과 기간 계산 방식이 다르므로, 구체적인 진행 방법은 관할 기관이나 전문가에게 확인하는 것이 안전합니다.',
  },
  {
    question: '개별공시지가는 어디서 확인하나요?',
    answer:
      '국토교통부가 운영하는 부동산공시가격알리미와 관할 시·군·구청 홈페이지에서 확인할 수 있습니다. 매년 1월 1일 기준으로 조사되어 4월 말경 결정·공시되며, 공시 직후 열람 기간 동안 확인하고 이상이 있으면 곧바로 이의신청을 준비하는 것이 안전합니다.',
  },
];

export default function OfficialLandPriceObjection2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '개별공시지가 이의신청 기한·절차 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '개별공시지가 이의신청 기한·절차 2026, 30일 안에 하는 법',
    description:
      '결정·공시일부터 30일 이내 시장·군수·구청장에게 서면 이의신청, 처리기한 30일, 표준지공시지가와의 차이, 재산세·종합부동산세에 미치는 영향을 부동산 가격공시에 관한 법률 §7·§11 기준으로 정리.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['개별공시지가 이의신청', '표준지공시지가', '공시지가 조회', '부동산 가격공시에 관한 법률', '재산세'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '개별공시지가 이의신청 기한·절차 2026',
    description:
      '개별공시지가 이의신청 기한(30일), 신청 방법(시장·군수·구청장), 표준지공시지가와의 차이, 재산세·종부세에 미치는 영향 정리.',
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
                    { name: '개별공시지가 이의신청 기한·절차 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">토지 소유자 · 7분 읽기 · 2026-09-26</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  개별공시지가 이의신청 기한·절차 2026
                  <br />
                  <span className="text-2xl text-text-secondary">· 30일 안에 하는 법</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  매년 4월 말 개별공시지가가 공시되면 재산세·종합부동산세 부담이 그대로 달라집니다. 내 땅의 공시지가가 인근 필지보다 유독 높게 나왔거나 지목·용도가 잘못 반영됐다면, 정해진 30일 안에 이의신청을 해야 다음 해 세금까지 이어지는 불이익을 막을 수 있습니다. 이 가이드는 이의신청 기한과 방법, 표준지공시지가와의 차이, 재산세와의 관계를 정리합니다. 대상 독자는 토지·주택 부속 대지를 보유한 소유자입니다.
                </p>
              </header>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">공시지가란 무엇이고 왜 확인해야 하나요?</h2>
                <p>
                  공시지가는 국가가 매년 조사해 공시하는 단위면적당 토지 가격으로, 재산세·종합부동산세 같은 보유세와 각종 부담금 산정의 기초자료로 쓰입니다. 표준지공시지가와 개별공시지가 두 종류가 있으며, 실제로 세금과 직결되는 것은 전국 개별 필지마다 매겨지는 개별공시지가입니다.
                </p>
                <p>
                  공시지가가 실제 가치보다 지나치게 높게 산정되면 재산세·종합부동산세가 그만큼 늘어나고, 반대로 낮으면 매도 시 협상에서 불리해질 수 있습니다. 그래서 매년 공시 직후 짧은 열람·이의신청 기간을 놓치지 않는 것이 중요합니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">30초 요약</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    정의: 국가가 매년 공시하는 필지별 토지 가격.
                    <br />
                    기한: 결정·공시일부터 30일 이내(부동산 가격공시에 관한 법률 §11①).
                    <br />
                    신청 대상: 개별공시지가는 시장·군수·구청장, 표준지공시지가는 국토교통부장관.
                    <br />
                    주의: 이의신청과 재산세 이의신청은 별개 절차.
                  </p>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">
                      표 1. 표준지공시지가 vs 개별공시지가 (부동산 가격공시에 관한 법률 §7·§11)
                    </caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">구분</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">표준지공시지가</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">개별공시지가</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">공시 주체</td>
                        <td className="p-3">국토교통부장관</td>
                        <td className="p-3">시장·군수·구청장</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">대상 필지</td>
                        <td className="p-3">전국 대표 표준지</td>
                        <td className="p-3">개별 필지 전체</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">이의신청 기한</td>
                        <td className="p-3">공시일부터 30일(§7①)</td>
                        <td className="p-3">공시일부터 30일(§11①)</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">주요 활용처</td>
                        <td className="p-3">개별공시지가 산정 기준</td>
                        <td className="p-3">재산세·종부세 등 과세표준</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">개별공시지가 이의신청, 기한은 언제까지인가요?</h2>
                <p>
                  결정·공시일부터 30일 이내입니다. 개별공시지가에 이의가 있는 자는 그 결정·공시일부터 30일 이내에 서면으로 시장·군수 또는 구청장에게 이의를 신청할 수 있습니다(부동산 가격공시에 관한 법률 §11①). 사망일이 아니라 공시일 자체가 기준이므로, 공시 직후 내 땅의 공시지가를 반드시 확인해야 합니다.
                </p>
                <p>
                  개별공시지가는 매년 1월 1일을 기준으로 조사해 4월 말경 결정·공시됩니다. 30일이라는 기간이 길어 보이지 않으므로, 공시가 나오는 시기를 미리 알아 두고 매년 같은 시기에 확인하는 습관을 들이는 것이 안전합니다.
                </p>
                <p className="mt-4">
                  다만, 이 30일은 정정공시나 토지 분할·합병 등으로 별도로 이루어지는 개별공시지가 결정·공시에도 각각 새로 적용됩니다. 즉 연중 수시로 공시되는 경우라면 그 공시일을 기준으로 다시 30일을 계산해야 합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">이의신청은 어디에, 어떻게 하나요?</h2>
                <p>
                  개별공시지가에 이의가 있다면 토지 소재지를 관할하는 시장·군수 또는 구청장에게 이의신청서를 제출합니다. 이의신청서에는 이의 사유를 증명하는 서류를 첨부해야 합니다(같은 법 시행령 §22). 절차는 다음 순서로 진행됩니다.
                </p>
                <ul className="space-y-3 ml-6 list-decimal text-text-secondary">
                  <li>
                    <strong>공시지가 확인:</strong> 부동산공시가격알리미 또는 관할 구청 홈페이지에서 내 필지의 개별공시지가를 확인합니다.
                  </li>
                  <li>
                    <strong>근거 자료 준비:</strong> 인근 유사 필지의 실거래가·감정평가 자료, 지목·용도지역 오류 근거, 토지 이용 현황 사진 등을 준비합니다.
                  </li>
                  <li>
                    <strong>이의신청서 제출:</strong> 관할 구청 민원실 방문, 우편, 또는 정부24 등 온라인 경로로 이의신청서와 증빙서류를 제출합니다.
                  </li>
                  <li>
                    <strong>심사 및 통지:</strong> 시장·군수·구청장이 이의신청 기간이 끝난 날부터 30일 이내에 심사해 서면으로 통지합니다(§11②).
                  </li>
                </ul>
                <p className="mt-4">
                  다만, 이의신청 내용이 타당하다고 인정되는 경우에만 개별공시지가가 조정되어 다시 결정·공시됩니다(§11②, §10 관련). 단순한 불만 제기가 아니라 구체적이고 객관적인 근거를 제시하는 것이 조정 가능성을 높이는 핵심입니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">표준지공시지가 이의신청은 무엇이 다른가요?</h2>
                <p>
                  신청 대상 기관이 다릅니다. 표준지공시지가에 이의가 있는 자는 공시일부터 30일 이내에 서면(전자문서 포함)으로 국토교통부장관에게 이의를 신청할 수 있습니다(§7①). 국토교통부장관은 이의신청 기간이 끝난 날부터 30일 이내에 심사해 통지하고, 타당하면 해당 표준지공시지가를 조정해 다시 공시합니다(§7②).
                </p>
                <p>
                  표준지는 전국에서 선정된 대표 필지만 해당하므로, 대부분의 개인 토지 소유자가 실제로 이용하는 절차는 개별공시지가 이의신청입니다. 다만 표준지공시지가가 개별공시지가 산정의 기준이 되므로, 인근에 표준지가 있고 그 가격 자체가 잘못됐다고 판단되면 표준지공시지가 이의신청도 함께 검토할 수 있습니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">이의신청하면 재산세·종합부동산세가 바로 줄어드나요?</h2>
                <p>
                  바로 줄어들지는 않습니다. 개별공시지가는 재산세·종합부동산세 등 토지분 보유세의 과세표준을 계산하는 기초자료입니다. 이의신청으로 개별공시지가 자체가 조정되면, 그 조정된 가격이 이후 세금 계산에 반영되는 구조입니다.
                </p>
                <p>
                  이미 고지서가 나온 재산세 금액 자체에 이의가 있다면 별도의 재산세 이의신청 절차를 거쳐야 합니다. 두 절차는 근거 법률과 신청 기한이 서로 다르므로 혼동하지 않아야 합니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례. 공시지가와 재산세 고지서 불복의 차이</p>
                  <p className="text-sm text-text-secondary">
                    · 개별공시지가 자체가 잘못됐다고 보는 경우: 부동산 가격공시에 관한 법률 §11 이의신청, 시장·군수·구청장
                    <br />
                    · 이미 나온 재산세 고지 금액 자체가 잘못됐다고 보는 경우: 지방세기본법상 재산세 이의신청, 별도 기한 적용
                    <br />
                    <span className="text-xs text-text-tertiary">
                      결론: 근본 원인이 공시지가라면 공시지가 이의신청부터, 고지 세액 계산이나 감면 누락이 문제라면 재산세 이의신청을 이용합니다.
                    </span>
                  </p>
                </div>
                <p className="mt-4">
                  자세한 재산세 자체 불복 절차는{' '}
                  <Link href="/guide/property-tax-objection-appeal-2026/" className="text-primary-500 underline">
                    재산세 이의신청 가이드
                  </Link>
                  에서 확인할 수 있습니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">이의신청이 기각되면 더 다툴 방법이 없나요?</h2>
                <p>
                  없지 않습니다. 이의신청 결과를 통지받고도 승복하기 어렵다면 행정심판이나 행정소송 등 별도의 불복 절차를 검토할 수 있습니다. 이의신청은 행정심판이나 행정소송을 제기하기 전에 반드시 거쳐야 하는 절차는 아니지만, 먼저 이의신청으로 간단히 다퉈 보고 결과에 따라 다음 단계를 판단하는 경우가 많습니다.
                </p>
                <p>
                  다만, 이의신청과 행정심판·행정소송은 청구 요건과 기간 계산 방식이 다릅니다. 시기를 놓치면 다툴 기회 자체가 사라질 수 있으므로, 이의신청 기각 통지를 받으면 곧바로 관할 기관이나 변호사·감정평가사 등 전문가에게 다음 절차와 기한을 확인하는 것이 안전합니다.
                </p>
              </section>

              <h2 className="text-2xl font-bold mb-6">자주 묻는 질문</h2>
              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h3 className="text-lg font-semibold text-text-primary">관련 계산기 및 가이드</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link
                    href="/guide/property-tax-objection-appeal-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">재산세 이의신청 기간·절차</div>
                    <p className="mt-1 text-sm text-text-secondary">이미 나온 재산세 고지 금액에 불복하는 별도 절차.</p>
                  </Link>
                  <Link
                    href="/guide/property-tax-base-date-june-1-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">재산세 과세기준일 6월 1일</div>
                    <p className="mt-1 text-sm text-text-secondary">공시지가가 반영되는 재산세 과세 시점을 확인하세요.</p>
                  </Link>
                  <Link
                    href="/guide/comprehensive-real-estate-tax-calculation-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">종합부동산세 계산법 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">공시가격 합산 기준으로 종부세가 어떻게 계산되는지 정리.</p>
                  </Link>
                  <Link
                    href="/calculator/property-tax/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">재산세 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">공시가격을 입력해 예상 재산세를 계산해보세요.</p>
                  </Link>
                  <Link
                    href="/calculator/comprehensive-property-tax/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">종합부동산세 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">보유 부동산의 공시가격으로 종부세를 미리 확인하세요.</p>
                  </Link>
                  <Link
                    href="/category/tax/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">모든 세금 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">양도세·취득세·재산세·종부세 모음.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 이 글은 AI 보조로 자동 생성되어 자동 품질 게이트를 통과한 뒤 발행되었습니다. 발행 시점에 사람의 사전 검수는 없었으며, 운영자가 사후 점검합니다. 개별공시지가·표준지공시지가 이의신청의 실제 결과는 필지별 조사 내용과 관할 기관의 판단에 따라 달라지므로, 반드시 관할 시·군·구청 또는 국토교통부, 감정평가사·변호사 등 전문가와 확인하세요. 본 콘텐츠는 2026-09-26을 기준으로 작성되었으며, 관련 법령 개정 시 업데이트됩니다. 인용 법조항: 부동산 가격공시에 관한 법률 §7(표준지공시지가에 대한 이의신청), §11(개별공시지가에 대한 이의신청), 같은 법 시행령 §22(개별공시지가에 대한 이의신청).
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터</a>,{' '}
                  <a href="https://www.reb.or.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">한국부동산원</a>.
                </p>
              </section>

              <ShareButtons
                title="개별공시지가 이의신청 기한·절차 2026 가이드"
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
