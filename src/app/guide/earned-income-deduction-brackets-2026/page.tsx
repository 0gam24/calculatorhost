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

const URL = 'https://calculatorhost.com/guide/earned-income-deduction-brackets-2026/';
const DATE_PUBLISHED = '2026-08-19';
const DATE_MODIFIED = '2026-08-19';

export const metadata: Metadata = {
  title: '근로소득공제 2026, 총급여 구간별 계산과 2000만원 한도',
  description:
    '근로소득공제는 총급여에서 자동으로 빼주는 개산공제로, 총급여 구간별로 70%에서 2%까지 차등 적용되고 최대 2,000만원 한도가 있습니다(소득세법 §47). 연봉 3천·5천·1억 사례로 근로소득금액 계산법을 정리했습니다.',
  keywords: [
    '근로소득공제',
    '근로소득공제 계산',
    '근로소득금액',
    '총급여 근로소득금액 차이',
    '근로소득공제 한도',
    '연봉 근로소득공제',
    '소득세법 47조',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '근로소득공제 2026, 총급여 구간별 계산과 2000만원 한도' }],
    title: '근로소득공제 2026, 총급여 구간별 계산과 근로소득금액',
    description: '총급여에서 근로소득공제를 빼면 근로소득금액. 구간별 공제율(70~2%)과 2,000만원 한도, 연봉별 계산 사례.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '근로소득공제 2026, 총급여 구간별 계산과 2000만원 한도',
    description: '연봉에서 자동으로 빠지는 근로소득공제. 소득세법 §47 구간별 공제율과 계산법.',
  },
};

const FAQ_ITEMS = [
  {
    question: '근로소득공제는 신청해야 받나요?',
    answer:
      '신청 없이 자동 적용됩니다. 근로소득공제는 총급여액에 따라 법으로 정해진 개산공제로, 회사가 연말정산할 때 자동으로 반영합니다(소득세법 §47). 별도 서류나 신청이 필요 없으며, 총급여만 확정되면 공제액이 기계적으로 계산됩니다. 따로 챙길 것은 없지만 근로소득금액의 출발점이 되므로 구조는 알아둘 필요가 있습니다.',
  },
  {
    question: '총급여와 근로소득금액은 어떻게 다른가요?',
    answer:
      '근로소득금액은 총급여에서 근로소득공제를 뺀 금액입니다. 총급여는 연간 급여에서 비과세소득(식대 등)을 제외한 금액이고, 여기서 근로소득공제를 빼면 근로소득금액이 됩니다. 근로소득금액에서 다시 인적공제·연금보험료공제 등을 빼야 과세표준이 나오므로, 근로소득금액은 세금 계산의 중간 단계입니다.',
  },
  {
    question: '근로소득공제에 한도가 있나요?',
    answer:
      '있습니다. 공제액이 2,000만원을 초과하면 2,000만원만 공제합니다(소득세법 §47①). 계산상 총급여가 약 3억 6,250만원을 넘으면 공제액이 2,000만원 상한에 도달해, 그 이상 아무리 총급여가 높아도 근로소득공제는 2,000만원으로 고정됩니다. 고소득 근로자에게 적용되는 상한입니다.',
  },
  {
    question: '연봉이 오르면 근로소득공제도 계속 늘어나나요?',
    answer:
      '늘긴 하지만 증가폭은 줄어듭니다. 구간이 올라갈수록 공제율이 70%, 40%, 15%, 5%, 2%로 낮아지기 때문입니다. 총급여 500만원까지는 70%를 공제하지만 4,500만원을 넘는 구간은 5%, 1억원을 넘는 구간은 2%만 추가 공제됩니다. 즉 저소득 구간일수록 공제율이 높아 세부담을 크게 덜어주는 구조입니다.',
  },
  {
    question: '근로소득공제와 근로소득세액공제는 같은 건가요?',
    answer:
      '다릅니다. 근로소득공제는 총급여에서 빼는 소득공제이고(소득세법 §47), 근로소득세액공제는 산출세액에서 직접 빼주는 세액공제입니다(소득세법 §59). 근로소득공제는 과세표준을 낮추고, 근로소득세액공제는 이미 계산된 세금 자체를 줄입니다. 둘 다 근로자에게 적용되지만 작동 단계가 완전히 다릅니다.',
  },
  {
    question: '투잡이라 회사가 두 곳이면 근로소득공제도 두 번 받나요?',
    answer:
      '두 번 받지 않습니다. 두 곳 이상에서 급여를 받으면 총급여를 합산해 하나의 근로소득공제를 계산합니다. 따라서 각 회사에서 따로 연말정산한 뒤 다음 해 5월 종합소득세 신고로 합산 정산해야 하며, 이때 합산 총급여 기준으로 근로소득공제가 한 번만 적용됩니다. 합산 신고를 빠뜨리면 공제가 과다 적용돼 세금을 추징당할 수 있습니다.',
  },
  {
    question: '중도 퇴사해서 급여가 적으면 공제도 줄어드나요?',
    answer:
      '줄어듭니다. 근로소득공제는 그 해 받은 총급여를 기준으로 계산하므로, 중도 퇴사로 총급여가 낮으면 공제액도 함께 낮아집니다. 다만 총급여 500만원 이하 구간은 70%를 공제해 근로소득금액이 크게 줄어들고, 이 경우 대부분 결정세액이 0에 가까워 원천징수된 세금을 환급받는 경우가 많습니다.',
  },
];

export default function EarnedIncomeDeductionBrackets2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '근로소득공제 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '근로소득공제 2026, 총급여 구간별 계산과 2000만원 한도',
    description:
      '총급여에서 자동으로 빼주는 근로소득공제의 구간별 공제율(70~2%), 2,000만원 한도, 총급여와 근로소득금액의 차이, 연봉별 계산 사례를 소득세법 §47 기준으로 정리.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['근로소득공제', '근로소득금액', '총급여', '소득세법 47조', '연말정산'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '근로소득공제 2026',
    description:
      '총급여 구간별 근로소득공제율과 근로소득금액 계산법, 2,000만원 한도까지 정리한 가이드.',
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
                    { name: '근로소득공제 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">직장인 · 7분 읽기 · 2026-08-19</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  근로소득공제 2026
                  <br />
                  <span className="text-2xl text-text-secondary">· 총급여 구간별 계산과 2000만원 한도</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  연봉이 그대로 세금 기준이 되는 것은 아닙니다. 총급여에서 근로소득공제를 먼저 빼야 세금을 매기는 근로소득금액이 나오기 때문입니다. 이 가이드는 연말정산과 종합소득세 계산의 출발점인 근로소득공제가 총급여 구간별로 얼마씩 적용되는지, 총급여와 근로소득금액이 어떻게 다른지, 그리고 연봉 3천·5천·1억일 때 실제로 얼마가 빠지는지를 정리했습니다. 내 세금 구조를 이해하려는 직장인을 위한 글입니다.
                </p>
              </header>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">근로소득공제란 무엇인가요</h2>
                <p>
                  근로소득공제는 총급여에서 법으로 정한 비율만큼 자동으로 빼주는 개산공제입니다(소득세법 §47). 근로를 위해 쓰는 비용을 일일이 증빙하기 어렵기 때문에, 총급여 규모에 따라 일정 금액을 경비처럼 인정해 빼주는 것입니다. 개인이 신청하거나 영수증을 낼 필요가 없고, 총급여만 확정되면 공제액이 기계적으로 계산됩니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">세금 계산에서의 위치</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    연간 급여 − 비과세소득 = 총급여
                    <br />
                    총급여 − <strong>근로소득공제</strong> = 근로소득금액
                    <br />
                    근로소득금액 − 인적공제·연금보험료공제 등 = 과세표준
                    <br />
                    과세표준 × 기본세율 = 산출세액
                  </p>
                </div>
                <p className="mt-4">
                  다만 근로소득공제는 어디까지나 중간 단계입니다. 이 공제만으로 세금이 결정되는 것은 아니고, 이후 인적공제와 각종 세액공제를 거쳐야 최종 세액이 나옵니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">근로소득공제는 어떻게 계산하나요</h2>
                <p>
                  총급여 구간별로 공제율이 다릅니다. 낮은 구간일수록 공제율이 높고, 높은 구간으로 갈수록 낮아지는 누적 방식입니다. 아래 표의 산식대로 자신의 총급여를 대입하면 됩니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 총급여 구간별 근로소득공제액 산식 (소득세법 §47①, 2026 기준)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">총급여액</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">근로소득공제액</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">500만원 이하</td>
                        <td className="p-3">총급여액 × 70%</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">500만원 초과 ~ 1,500만원 이하</td>
                        <td className="p-3">350만 + (500만 초과분 × 40%)</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">1,500만원 초과 ~ 4,500만원 이하</td>
                        <td className="p-3">750만 + (1,500만 초과분 × 15%)</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">4,500만원 초과 ~ 1억원 이하</td>
                        <td className="p-3">1,200만 + (4,500만 초과분 × 5%)</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">1억원 초과</td>
                        <td className="p-3">1,475만 + (1억 초과분 × 2%)</td>
                      </tr>
                      <tr>
                        <td className="p-3">공제 한도</td>
                        <td className="p-3"><strong>2,000만원</strong></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  다만 계산 결과가 2,000만원을 넘으면 2,000만원만 공제됩니다. 총급여가 약 3억 6,250만원을 넘는 시점부터 상한에 걸립니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">연봉별 실제 계산 사례</h2>
                <p>
                  대표적인 연봉 구간별로 근로소득공제와 근로소득금액을 계산해봤습니다. 여기서 총급여는 비과세소득을 제외한 금액이라고 가정합니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 1. 총급여 3,000만원</p>
                  <p className="text-sm text-text-secondary">
                    · 해당 구간: 1,500만 초과 ~ 4,500만 이하
                    <br />
                    · 근로소득공제: 750만 + (3,000만 − 1,500만) × 15% = 750만 + 225만 = <strong>975만원</strong>
                    <br />
                    · 근로소득금액: 3,000만 − 975만 = <strong>2,025만원</strong>
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 총급여의 약 33%가 근로소득공제로 빠집니다.</span>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 2. 총급여 5,000만원</p>
                  <p className="text-sm text-text-secondary">
                    · 해당 구간: 4,500만 초과 ~ 1억 이하
                    <br />
                    · 근로소득공제: 1,200만 + (5,000만 − 4,500만) × 5% = 1,200만 + 25만 = <strong>1,225만원</strong>
                    <br />
                    · 근로소득금액: 5,000만 − 1,225만 = <strong>3,775만원</strong>
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 공제율이 5% 구간으로 낮아져 비중이 약 25%로 줄어듭니다.</span>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 3. 총급여 1억원</p>
                  <p className="text-sm text-text-secondary">
                    · 해당 구간: 4,500만 초과 ~ 1억 이하(1억 정확히 충족)
                    <br />
                    · 근로소득공제: 1,200만 + (1억 − 4,500만) × 5% = 1,200만 + 275만 = <strong>1,475만원</strong>
                    <br />
                    · 근로소득금액: 1억 − 1,475만 = <strong>8,525만원</strong>
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 총급여 대비 공제 비중이 약 15%로 더 낮아집니다.</span>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 4. 경계값, 총급여 4,500만원</p>
                  <p className="text-sm text-text-secondary">
                    · 두 산식이 만나는 지점입니다.
                    <br />
                    · 아래 산식: 750만 + (4,500만 − 1,500만) × 15% = 1,200만
                    <br />
                    · 위 산식: 1,200만 + (4,500만 − 4,500만) × 5% = <strong>1,200만원</strong>
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 구간 경계에서 값이 이어지도록 설계돼 있어 어느 산식을 써도 동일합니다.</span>
                  </p>
                </div>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">총급여와 근로소득금액, 무엇을 봐야 하나요</h2>
                <p>
                  각종 공제 요건에서 기준이 되는 금액이 다릅니다. 예를 들어 부양가족의 소득 요건은 연간 소득금액 100만원(근로소득만 있으면 총급여 500만원) 이하로, 총급여가 아니라 소득금액을 기준으로 판단합니다. 반면 월세 세액공제나 문화비 소득공제 등은 총급여 기준(예: 총급여 7,000만원 이하)으로 대상을 가릅니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 2. 총급여 기준 vs 근로소득금액(소득금액) 기준 비교</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">구분</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">기준 금액</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">예시 항목</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">총급여 기준</td>
                        <td className="p-3">근로소득공제 전 금액</td>
                        <td className="p-3">월세·문화비 등 총급여 요건</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">소득금액 기준</td>
                        <td className="p-3">근로소득공제 후 금액</td>
                        <td className="p-3">부양가족 100만원 소득 요건</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  다만 항목마다 기준이 다르므로, 특정 공제를 챙길 때는 그 공제가 총급여를 보는지 소득금액을 보는지 먼저 확인해야 실수를 줄일 수 있습니다.
                </p>
              </section>

              <section className="space-y-6 border-t border-border-base pt-8">
                <h2 className="text-2xl font-bold">근로소득공제 vs 근로소득세액공제</h2>
                <p>
                  이름이 비슷해 자주 헷갈리지만 작동 단계가 다릅니다. 근로소득공제는 세금을 매기기 전 단계에서 과세표준을 낮추고, 근로소득세액공제는 이미 산출된 세금에서 직접 일정 금액을 빼줍니다(소득세법 §59).
                </p>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li>
                    <strong>근로소득공제(§47):</strong> 총급여에서 차감해 근로소득금액을 줄이고, 그 결과 세금이 간접적으로 줄어듭니다.
                  </li>
                  <li>
                    <strong>근로소득세액공제(§59):</strong> 산출세액에서 직접 차감해 세금 자체를 줄입니다. 총급여가 높을수록 공제 한도가 줄어드는 구조입니다.
                  </li>
                </ul>
                <p className="mt-4">
                  예외: 근로소득세액공제의 구체적 공제율과 한도는 총급여 구간에 따라 세분화돼 있으므로, 정확한 금액은 홈택스 연말정산 결과나 국세청 안내를 확인하는 것이 안전합니다.
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
                    <p className="mt-1 text-sm text-text-secondary">연봉을 넣어 세후 월급과 공제 내역을 확인하세요.</p>
                  </Link>
                  <Link
                    href="/guide/comprehensive-income-tax-rate-brackets-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">종합소득세 세율 구간</div>
                    <p className="mt-1 text-sm text-text-secondary">과세표준에 적용되는 6~45% 누진세율과 누진공제.</p>
                  </Link>
                  <Link
                    href="/guide/personal-deduction-dependent-150-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">부양가족 인적공제 소득 요건</div>
                    <p className="mt-1 text-sm text-text-secondary">소득금액 100만원 기준으로 부양가족을 판정.</p>
                  </Link>
                  <Link
                    href="/guide/income-deduction-vs-tax-credit-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">소득공제 vs 세액공제</div>
                    <p className="mt-1 text-sm text-text-secondary">두 공제의 차이를 알면 절세 순서가 보입니다.</p>
                  </Link>
                  <Link
                    href="/guide/year-end-tax-settlement/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">연말정산 기본 가이드</div>
                    <p className="mt-1 text-sm text-text-secondary">근로소득금액부터 결정세액까지 전체 흐름.</p>
                  </Link>
                  <Link
                    href="/category/work/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">모든 근로·급여 가이드</div>
                    <p className="mt-1 text-sm text-text-secondary">연봉·퇴직금·4대보험 계산 모음.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 교육 목적으로 작성되었으며 개인 맞춤형 세무 조언이 아닙니다. 실제 근로소득공제액과 세액은 비과세소득 범위·기타 공제에 따라 달라지므로 홈택스 연말정산 결과 또는 세무 전문가에게 확인하세요. 본 콘텐츠는 2026-08-19 기준이며 세법 개정 시 업데이트됩니다. 인용 법조항: <strong>소득세법 §47(근로소득공제), §59(근로소득세액공제)</strong>. AI 보조 작성 후 운영자 검수 완료.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터(소득세법 §47)</a>,{' '}
                  <a href="https://www.nts.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">국세청(근로소득금액)</a>,{' '}
                  <a href="https://hometax.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">홈택스 연말정산 미리보기</a>.
                </p>
              </section>

              <ShareButtons
                title="근로소득공제 2026 가이드"
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
