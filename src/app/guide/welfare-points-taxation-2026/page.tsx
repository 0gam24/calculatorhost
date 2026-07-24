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

const URL = 'https://calculatorhost.com/guide/welfare-points-taxation-2026/';
const DATE_PUBLISHED = '2026-07-25';
const DATE_MODIFIED = '2026-07-25';
// 북극성 수익 레버: [revenue-lever: indexing+traffic] (신규 색인 표면 + 직장인 복지포인트 과세 검색 의도 흡수)

export const metadata: Metadata = {
  title: '복지포인트 세금 2026, 근로소득 과세와 이유 | calculatorhost',
  description:
    '회사 복지포인트는 임금은 아니지만 근로소득으로 과세됩니다. 대법원 판결로 확인된 과세 근거, 공무원과의 차이, 세금이 얼마나 떼이는지, 경정청구 가능 여부를 소득세법 §20 기준으로 정리했습니다.',
  keywords: [
    '복지포인트 세금',
    '복지포인트 근로소득',
    '선택적 복지제도 과세',
    '복지포인트 소득세',
    '복지포인트 원천징수',
    '공무원 복지포인트 비과세',
    '소득세법 20조',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '복지포인트 세금 2026, 근로소득 과세와 이유' }],
    title: '복지포인트 세금 2026, 임금은 아닌데 왜 세금은 낼까',
    description: '대법원이 확인한 복지포인트 근로소득 과세. 공무원과의 차이, 세액 계산, 경정청구 여부.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '복지포인트 세금 2026, 근로소득 과세 정리',
    description: '임금은 아니지만 근로소득 과세. 공무원 차이, 세액 계산, 경정청구. 소득세법 §20.',
  },
};

const FAQ_ITEMS = [
  {
    question: '회사 복지포인트도 세금을 내나요?',
    answer:
      '네, 민간기업 복지포인트는 근로소득으로 과세됩니다(소득세법 §20). 대법원도 복지포인트가 근로의 대가로 지급되는 경제적 이익이므로 근로소득세 과세대상이라고 판단했습니다. 회사가 급여를 계산할 때 복지포인트 배정액을 근로소득에 포함해 세금을 원천징수하는 것이 원칙입니다.',
  },
  {
    question: '임금이 아니라면서 왜 세금은 내나요?',
    answer:
      '근로기준법상 임금과 소득세법상 근로소득은 판단 기준이 다르기 때문입니다. 2019년 대법원 전원합의체는 복지포인트가 근로기준법상 임금이 아니라고 봤습니다(통상임금·퇴직금 산정에서 제외). 그러나 세법에서는 근로의 대가로 받는 경제적 이익을 폭넓게 근로소득으로 보므로, 임금이 아니어도 과세대상이 될 수 있습니다.',
  },
  {
    question: '공무원 복지포인트는 왜 세금을 안 내나요?',
    answer:
      '공무원의 맞춤형 복지점수는 실무상 비과세로 다뤄져 왔습니다. 국가·지자체가 후생복지 차원에서 지급하는 성격으로 보아 과세하지 않는 관행이 이어진 것입니다. 반면 민간기업 복지포인트는 근로소득으로 과세된다는 점에서 형평성 논란이 계속되고 있습니다. 제도 변화 가능성이 있으니 최신 지침을 확인하세요.',
  },
  {
    question: '복지포인트에서 세금이 얼마나 떼이나요?',
    answer:
      '별도의 세율이 아니라 본인의 근로소득 한계세율만큼 붙습니다. 예를 들어 과세표준이 24% 구간인 사람이 복지포인트 100만원을 받으면, 지방소득세를 포함해 약 26.4%인 26.4만원이 추가 세부담이 됩니다. 즉 소득이 높을수록 복지포인트에 붙는 세금도 커집니다.',
  },
  {
    question: '복지포인트는 4대보험료에도 반영되나요?',
    answer:
      '복지포인트는 근로기준법상 임금이 아니라는 대법원 판단에 따라, 통상임금·평균임금 기반 산정에서는 제외되는 것이 원칙입니다. 다만 사회보험 보수 산정 실무는 항목 성격에 따라 달라질 수 있으므로, 4대보험 반영 여부는 회사 담당부서나 공단에 확인하는 것이 정확합니다.',
  },
  {
    question: '이미 낸 복지포인트 세금을 돌려받을 수 있나요?',
    answer:
      '어렵습니다. 복지포인트에 원천징수한 근로소득세를 돌려달라는 경정청구가 있었지만, 대법원은 복지포인트가 근로소득 과세대상이라며 환급 청구를 받아들이지 않았습니다. 따라서 과세가 위법하다는 이유의 환급은 현재 인정되지 않습니다. 단순 계산 오류 등 다른 사유라면 별개로 검토할 수 있습니다.',
  },
  {
    question: '연말정산 때 복지포인트는 어떻게 처리되나요?',
    answer:
      '회사가 이미 근로소득에 포함해 원천징수했다면, 연말정산 때 총급여에 반영되어 정산됩니다. 근로소득원천징수영수증의 총급여액에 복지포인트가 포함됐는지 확인해보면 됩니다. 별도로 본인이 추가 신고할 항목은 대개 없습니다.',
  },
  {
    question: '비과세되는 복리후생은 없나요?',
    answer:
      '있습니다. 식대(월 20만원 한도), 자가운전보조금(월 20만원 한도), 일정 요건의 출산·보육수당 등은 소득세법·시행령에서 비과세로 정하고 있습니다. 복지포인트가 이런 비과세 항목의 요건을 그대로 충족하지 않는 한 과세되는 것이므로, 항목별 비과세 요건을 구분해 이해하는 것이 중요합니다.',
  },
];

export default function WelfarePointsTaxation2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '복지포인트 세금 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '복지포인트 세금 2026, 근로소득 과세와 그 이유 완벽 정리',
    description:
      '민간기업 복지포인트의 근로소득 과세 근거, 임금과의 차이, 공무원 비과세와의 형평성, 세액 계산, 경정청구 가능 여부를 소득세법 §20 기준으로 정리.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['복지포인트', '근로소득', '선택적 복지제도', '소득세법 20조', '원천징수'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '복지포인트 세금 2026',
    description: '민간기업 복지포인트의 근로소득 과세 근거와 세액 계산, 경정청구 여부.',
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
                    { name: '복지포인트 세금 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">직장인 · 7분 읽기 · 2026-07-25</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  복지포인트 세금 2026
                  <br />
                  <span className="text-2xl text-text-secondary">임금은 아닌데 왜 세금은 낼까</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  회사에서 주는 복지포인트로 쇼핑을 하다 보면 문득 궁금해집니다. 이게 월급도 아닌데 왜 급여명세서에는 세금이 붙어 있을까요. 이 글은 직장인을 위해 복지포인트가 세법상 어떻게 취급되는지, 대법원은 뭐라고 판단했는지, 공무원과 왜 다른지, 그리고 내 복지포인트에서 세금이 얼마나 떼이는지 정리합니다.
                </p>
              </header>

              <AdSlot slot="guide-welfare-points-taxation-2026-top" format="horizontal" />

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">복지포인트도 세금을 내나요?</h2>
                <p>
                  네, 민간기업이 주는 복지포인트는 근로소득으로 과세됩니다(소득세법 §20). 회사가 선택적 복지제도로 직원에게 정기적으로 배정하는 복지포인트는 근로의 대가로 받는 경제적 이익에 해당한다고 보기 때문입니다. 실제로 회사는 급여 계산 시 복지포인트를 총급여에 포함해 근로소득세를 원천징수합니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">30초 요약</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    · 민간기업 복지포인트: 근로소득으로 과세(소득세법 §20)
                    <br />
                    · 근로기준법상 임금은 아님(2019년 대법원 전원합의체)
                    <br />
                    · 세금은 본인 근로소득 한계세율만큼 추가
                    <br />
                    · 공무원 맞춤형 복지점수는 실무상 비과세(형평성 논란)
                  </p>
                </div>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">임금이 아니라면서 왜 세금은 내나요?</h2>
                <p>
                  근로기준법상 임금과 세법상 근로소득의 기준이 다르기 때문입니다. 2019년 대법원 전원합의체는 복지포인트가 근로기준법상 임금에 해당하지 않는다고 판단했습니다. 그래서 통상임금이나 퇴직금 산정에는 포함되지 않습니다.
                </p>
                <p>
                  그러나 세법은 근로를 제공하고 받는 경제적 이익을 폭넓게 근로소득으로 봅니다(소득세법 §20). 이후 대법원은 복지포인트도 근로의 대가로 지급되는 경제적 이익이므로 근로소득세 과세대상이라고 확인했습니다(2024년 판결). 결국 임금은 아니지만 과세대상이라는, 언뜻 모순처럼 보이는 결론이 나온 것입니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="text-sm text-text-secondary">
                    다만 임금성 부정과 과세대상 인정은 각각 다른 법의 다른 목적에서 나온 판단입니다. 임금이 아니라는 결론이 곧 비과세를 의미하지는 않습니다.
                  </p>
                </div>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">공무원 복지포인트는 왜 비과세인가요?</h2>
                <p>
                  공무원의 맞춤형 복지점수는 실무상 과세하지 않는 관행이 이어져 왔습니다. 국가·지자체가 후생복지 차원에서 지급하는 성격으로 취급되기 때문입니다. 이로 인해 같은 복지포인트인데 민간 직장인은 세금을 내고 공무원은 안 낸다는 형평성 논란이 반복되고 있습니다.
                </p>
                <p>
                  예외: 이 부분은 제도·해석이 바뀔 여지가 있는 쟁점입니다. 향후 과세 형평성을 맞추는 방향으로 정비될 가능성이 있으니, 최신 국세청 지침과 정부 발표를 확인하세요.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">내 복지포인트, 세금이 얼마나 떼일까</h2>
                <p>
                  복지포인트에는 별도 세율이 없고, 본인의 근로소득 한계세율이 그대로 적용됩니다. 소득이 높을수록 붙는 세금도 커집니다. 아래 사례로 확인해보세요(지방소득세 10% 포함).
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 1. 과세표준 15% 구간</p>
                  <p className="text-sm text-text-secondary">
                    · 복지포인트: 연 100만원
                    <br />
                    · 적용 세율: 15% + 지방세 1.5% = 16.5%
                    <br />
                    · 추가 세부담: 100만원 × 16.5% = <strong>16.5만원</strong>
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 복지포인트 100만원 중 약 16.5만원이 세금으로 나갑니다.</span>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 2. 과세표준 24% 구간</p>
                  <p className="text-sm text-text-secondary">
                    · 복지포인트: 연 100만원
                    <br />
                    · 적용 세율: 24% + 지방세 2.4% = 26.4%
                    <br />
                    · 추가 세부담: 100만원 × 26.4% = <strong>26.4만원</strong>
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 같은 100만원이라도 소득 구간이 높으면 세금이 26.4만원으로 커집니다.</span>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 3. 과세표준 6% 구간 (저소득)</p>
                  <p className="text-sm text-text-secondary">
                    · 복지포인트: 연 100만원
                    <br />
                    · 적용 세율: 6% + 지방세 0.6% = 6.6%
                    <br />
                    · 추가 세부담: 100만원 × 6.6% = <strong>6.6만원</strong>
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 낮은 소득 구간은 세부담이 작습니다. 복지포인트 세금은 결국 본인 소득 구간에 좌우됩니다.</span>
                  </p>
                </div>
              </section>

              <AdSlot slot="guide-welfare-points-taxation-2026-mid" format="rectangle" />

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">복지포인트 vs 다른 복리후생, 과세 비교</h2>
                <p>
                  같은 복리후생이라도 세법상 취급이 다릅니다. 비과세 요건을 갖춘 항목과 그렇지 않은 항목을 구분하는 것이 핵심입니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 복리후생 항목별 과세 여부 (2026 기준)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">항목</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">과세 여부</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">비고</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">민간 복지포인트</td>
                        <td className="p-3">과세</td>
                        <td className="p-3">근로소득 포함(소득세법 §20)</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">식대</td>
                        <td className="p-3">월 20만원까지 비과세</td>
                        <td className="p-3">한도 초과분은 과세</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">자가운전보조금</td>
                        <td className="p-3">월 20만원까지 비과세</td>
                        <td className="p-3">요건 충족 시</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">공무원 맞춤형 복지점수</td>
                        <td className="p-3">실무상 비과세</td>
                        <td className="p-3">형평성 논란</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  다만 비과세 항목도 한도와 요건이 정해져 있습니다. 식대 월 20만원처럼 한도를 넘으면 초과분은 과세되므로, 항목별 요건을 정확히 확인해야 합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">이미 낸 세금 돌려받을 수 있나요?</h2>
                <p>
                  과세가 위법하다는 이유로는 어렵습니다. 복지포인트에 원천징수한 근로소득세를 돌려달라는 경정청구가 제기됐지만, 대법원은 복지포인트가 근로소득 과세대상임을 인정하며 환급 청구를 받아들이지 않았습니다.
                </p>
                <p>
                  따라서 복지포인트 과세 자체를 문제 삼아 환급받는 길은 현재로선 막혀 있습니다. 다만 단순 계산 착오, 이중 반영 등 다른 사유라면 5년 내 경정청구로 바로잡을 수 있으니, 원천징수영수증을 점검해보는 것은 의미가 있습니다.
                </p>
              </section>

              <h2 className="text-2xl font-bold mb-6">자주 묻는 질문</h2>
              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h3 className="text-lg font-semibold text-text-primary">관련 계산기 및 가이드</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link
                    href="/guide/non-taxable-salary-allowances-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">비과세 급여 항목 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">식대·차량유지비 등 세금 안 내는 항목 정리.</p>
                  </Link>
                  <Link
                    href="/guide/year-end-tax-settlement/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">연말정산 가이드</div>
                    <p className="mt-1 text-sm text-text-secondary">총급여에 무엇이 포함되는지 확인하세요.</p>
                  </Link>
                  <Link
                    href="/guide/salary-take-home-2026-july-insurance-increase/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">2026 실수령액 (7월 보험료 인상)</div>
                    <p className="mt-1 text-sm text-text-secondary">세금·4대보험 반영 실수령액을 점검하세요.</p>
                  </Link>
                  <Link
                    href="/guide/comprehensive-income-tax-rate-brackets-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">종합소득세 세율·구간 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">내 한계세율 구간을 확인해보세요.</p>
                  </Link>
                  <Link
                    href="/calculator/salary/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">연봉 실수령액 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">세후 월급을 바로 계산해보세요.</p>
                  </Link>
                  <Link
                    href="/category/work/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">모든 근로 가이드</div>
                    <p className="mt-1 text-sm text-text-secondary">연봉·수당·4대보험 모음.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 교육 목적으로 작성되었으며 개인 맞춤 세무 조언이 아닙니다. 복지포인트의 실제 과세·원천징수는 회사 지급 방식과 개별 사정에 따라 달라질 수 있으므로, 정확한 처리는 회사 급여담당부서, 관할 세무서, 홈택스(hometax.go.kr)에서 확인하세요. 공무원 복지점수 비과세 등 일부 쟁점은 제도가 바뀔 수 있습니다. 본 콘텐츠는 2026-07-25 기준이며, 인용한 법조항은 <strong>소득세법 §20(근로소득)</strong>과 관련 대법원 판례(복지포인트 근로소득 과세 인정)입니다. AI 보조 작성 후 운영자 검수 완료.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터(소득세법)</a>,{' '}
                  <a href="https://www.nts.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">국세청</a>,{' '}
                  <a href="https://www.scourt.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">대법원 판례</a>.
                </p>
              </section>

              <ShareButtons
                title="복지포인트 세금 2026 가이드"
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
