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

const URL = 'https://calculatorhost.com/guide/national-pension-work-income-deduction-2026/';
const DATE_PUBLISHED = '2026-08-12';
const DATE_MODIFIED = '2026-08-12';

export const metadata: Metadata = {
  title: '노령연금 감액 2026, 일하면 월 519만원까지 안 깎인다',
  description:
    '은퇴 후 재취업하면 국민연금이 깎일까 걱정되시죠. 2026년 6월 17일부터 감액 기준이 상향돼 월평균소득 약 519만원 미만이면 노령연금이 감액되지 않습니다. 감액 소득 기준, 감액 폭, 피하는 방법을 국민연금법 §63의2 기준으로 정리했습니다.',
  keywords: [
    '노령연금 감액',
    '국민연금 감액',
    '소득활동 노령연금',
    '재직자 노령연금',
    '노령연금 519만원',
    '국민연금 일하면 감액',
    '국민연금법 63조의2',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '노령연금 감액 2026, 일하면 월 519만원까지 안 깎인다' }],
    title: '노령연금 감액 2026, 월 519만원까지는 일해도 안 깎인다',
    description: '2026년 6월 17일부터 감액 소득기준 상향. 월평균소득 약 519만원 미만이면 감액 없음. 국민연금법 §63의2.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '노령연금 감액 2026 기준',
    description: '은퇴 후 재취업 시 국민연금 감액 기준이 월 519만원으로 상향. 감액 폭과 피하는 법.',
  },
};

const FAQ_ITEMS = [
  {
    question: '일하면서 국민연금을 받으면 무조건 깎이나요?',
    answer:
      '아닙니다. 월평균소득금액이 일정 기준을 넘을 때만 깎입니다. 2026년에는 A값(약 319만원)에 200만원을 더한 약 519만원 미만이면 소득이 있어도 노령연금이 감액되지 않습니다. 2026년 6월 17일 개정 국민연금법 시행으로 감액 기준이 상향됐기 때문입니다(국민연금법 §63의2).',
  },
  {
    question: '2026년 감액 기준 금액은 정확히 얼마인가요?',
    answer:
      '2026년 A값(전체 가입자 최근 3년 평균소득월액)은 3,193,511원입니다. 여기에 200만원을 더한 약 5,193,511원(월평균소득금액 기준) 미만이면 감액되지 않습니다. 즉 근로소득과 사업소득을 합산해 월평균으로 환산한 금액이 약 519만원 미만이면 연금을 전액 받습니다.',
  },
  {
    question: '감액 대상 소득에는 무엇이 포함되나요?',
    answer:
      '근로소득금액과 사업소득금액이 포함됩니다. 여기서 소득금액은 총수입이 아니라 근로소득공제 또는 필요경비를 뺀 뒤의 금액입니다. 이 소득금액을 해당 연도 종사 개월 수로 나눈 월평균소득금액이 감액 판단 기준이 됩니다. 이자·배당 같은 금융소득이나 연금소득은 원칙적으로 포함되지 않습니다.',
  },
  {
    question: '감액되면 얼마나 깎이나요?',
    answer:
      '초과한 소득 정도에 따라 구간별로 감액되며, 감액 한도는 노령연금액(부양가족연금액 제외)의 최대 50%입니다. 소득이 높을수록 감액 폭이 커지지만 절반을 넘지는 않습니다. 정확한 감액 금액은 개인별 소득과 연금액에 따라 다르므로 국민연금공단에서 확인하는 것이 정확합니다.',
  },
  {
    question: '감액은 평생 계속되나요?',
    answer:
      '아닙니다. 소득활동에 따른 감액은 노령연금 수급 개시 후 최대 5년 동안만 적용됩니다. 수급 개시일로부터 5년이 지나면 소득이 아무리 많아도 감액되지 않고 연금을 전액 받습니다. 다만 이 5년 기준은 노령연금 지급 개시 연령을 기준으로 판단합니다.',
  },
  {
    question: '연금이 깎이는 것을 피하려면 어떻게 해야 하나요?',
    answer:
      '연기연금 제도를 활용할 수 있습니다. 노령연금 수급을 최대 5년까지 미루면 미룬 기간만큼 연금액이 월 0.6%, 연 7.2%씩 늘어납니다(국민연금법 §62). 은퇴 후에도 소득이 높아 감액이 예상된다면, 소득활동을 하는 기간 동안 수급을 연기하고 소득이 줄어든 뒤 받는 전략을 검토할 수 있습니다.',
  },
  {
    question: '월평균소득금액은 어떻게 계산하나요?',
    answer:
      '근로소득금액과 사업소득금액을 합한 뒤, 그 소득이 발생한 해당 연도의 종사 개월 수로 나눕니다. 예를 들어 1년 내내 일해 연간 소득금액이 7,200만원이면 월평균소득금액은 600만원입니다. 이 금액을 2026년 기준 약 519만원과 비교해 감액 여부를 판단합니다.',
  },
  {
    question: '감액 기준은 왜 매년 바뀌나요?',
    answer:
      'A값이 매년 갱신되기 때문입니다. A값은 전체 국민연금 가입자의 최근 3년간 평균소득월액을 반영해 매년 조정되며, 이에 200만원을 더한 값이 그 해의 감액 시작 기준이 됩니다. 임금 상승이 반영되므로 감액 기준도 해마다 조금씩 올라갑니다.',
  },
];

export default function NationalPensionWorkIncomeDeduction2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '노령연금 소득활동 감액 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '노령연금 감액 2026, 일하면 월 519만원까지 안 깎인다',
    description:
      '은퇴 후 재취업 시 국민연금 노령연금 감액 기준과 감액 폭, 2026년 6월 17일 개정으로 상향된 소득 기준(약 519만원), 감액을 피하는 연기연금 전략을 국민연금법 §63의2 기준으로 정리.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['노령연금 감액', '소득활동', 'A값', '연기연금', '국민연금법 63조의2'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '노령연금 소득활동 감액 2026',
    description:
      '소득활동에 따른 노령연금 감액의 소득 기준, 감액 폭, 적용 기간과 연기연금 대안을 정리한 가이드.',
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
                    { name: '노령연금 소득활동 감액 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">은퇴·재취업 · 8분 읽기 · 2026-08-12</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  노령연금 소득활동 감액 2026
                  <br />
                  <span className="text-2xl text-text-secondary">일해도 월 519만원까지는 안 깎인다</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  국민연금을 받기 시작한 뒤에도 일을 계속하면 연금이 깎일까 봐 망설이는 분이 많습니다. 결론부터 말하면, 소득이 일정 기준을 넘을 때만 깎이고 그 기준이 2026년 6월 17일부터 크게 올랐습니다. 이 가이드는 은퇴 후 재취업했을 때 노령연금이 얼마부터, 얼마나 깎이는지와 감액을 피하는 방법을 국민연금법 §63의2를 기준으로 정리합니다.
                </p>
              </header>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">노령연금 감액이란 무엇인가요?</h2>
                <p>
                  소득활동에 따른 노령연금 감액은 연금을 받으면서 일정 수준 이상의 소득이 있으면 연금액의 일부를 줄여 지급하는 제도입니다(국민연금법 §63의2). 흔히 재직자 노령연금 감액이라고도 부릅니다.
                </p>
                <p>
                  취지는 연금과 근로소득을 동시에 넉넉히 얻는 경우 급여 수준을 조정한다는 데 있지만, 일할 의욕을 꺾는다는 지적이 이어져 감액 기준이 점차 완화됐습니다. 그 결과 2026년 6월 17일부터는 감액 시작 소득 기준이 크게 상향됐습니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">한 줄 요약</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    2026년에는 월평균소득금액이 약 519만원(A값 약 319만원 + 200만원) 미만이면 일을 해도 노령연금이 깎이지 않습니다.
                  </p>
                </div>
                <p>
                  다만 감액 대상이 되더라도 연금이 사라지는 것은 아닙니다. 감액 한도는 노령연금액의 최대 절반이며, 감액 기간도 수급 개시 후 5년으로 제한됩니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">2026년에는 얼마부터 깎이나요?</h2>
                <p>
                  감액의 출발점은 A값입니다. A값은 전체 국민연금 가입자의 최근 3년 평균소득월액으로, 2026년 기준 3,193,511원입니다. 종전에는 월평균소득금액이 이 A값만 넘으면 감액됐지만, 2026년 6월 17일 개정으로 A값에 200만원을 더한 금액을 넘어야 감액이 시작됩니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">2026년 감액 시작 기준</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    A값 3,193,511원 + 200만원 = 약 <strong>5,193,511원</strong>
                    <br />
                    → 월평균소득금액이 약 519만원 미만이면 감액 없음, 초과하면 초과분에 따라 감액.
                  </p>
                </div>
                <p>
                  즉 웬만한 재취업 급여나 사업소득으로는 감액 대상이 되지 않을 만큼 기준이 올라간 것입니다.
                </p>
                <p>
                  예외: 여기서 비교하는 것은 세전 월급이 아니라 근로소득공제·필요경비를 뺀 소득금액을 월평균으로 환산한 값입니다. 따라서 실제 월급이 519만원을 조금 넘더라도 소득금액 기준으로는 감액 대상이 아닐 수 있습니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">얼마나 깎이나요?</h2>
                <p>
                  감액은 기준을 초과한 소득 정도에 따라 구간별로 커집니다. 종전 산정 방식은 초과소득월액을 100만원 단위 구간으로 나눠 5%에서 25%씩 감액하는 구조였고, 그 최대 한도는 노령연금액의 50%입니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 초과소득월액 구간별 감액 방식 (참고, 종전 산정 구조)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">초과소득월액</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">월 감액 방식</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">100만원 미만</td>
                        <td className="p-3">초과분의 5%</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">100만 이상 200만 미만</td>
                        <td className="p-3">5만원 + 100만 초과분의 10%</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">200만 이상 300만 미만</td>
                        <td className="p-3">15만원 + 200만 초과분의 15%</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">300만 이상 400만 미만</td>
                        <td className="p-3">30만원 + 300만 초과분의 20%</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">400만 이상</td>
                        <td className="p-3">50만원 + 400만 초과분의 25%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p>
                  다만 2026년 6월 17일 개정으로 감액이 시작되는 소득 기준 자체가 A값에서 A값+200만원으로 올라갔습니다. 따라서 위 구간표는 감액 구조를 이해하기 위한 참고용이며, 개정 기준을 반영한 실제 감액 금액은 국민연금공단에서 확인하는 것이 정확합니다. 어떤 경우에도 감액은 노령연금액의 절반을 넘지 않습니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">감액 계산 예시</h2>
                <p>
                  월평균소득금액이 감액 기준을 넘는 경우를 살펴봅니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">예시. 재취업 후 연간 소득금액 7,200만원</p>
                  <p className="text-sm text-text-secondary">
                    · 월평균소득금액: 7,200만원 ÷ 12개월 = <strong>600만원</strong>
                    <br />
                    · 2026년 감액 기준(약 519만원) 초과 → 감액 대상
                    <br />
                    · 감액 폭: 초과 정도에 따라 산정, 노령연금액의 최대 50% 이내
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 감액 대상이지만 정확한 감액액은 개인 연금액과 개정 기준을 반영해 공단이 산정.</span>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">예시. 재취업 후 연간 소득금액 6,000만원</p>
                  <p className="text-sm text-text-secondary">
                    · 월평균소득금액: 6,000만원 ÷ 12개월 = <strong>500만원</strong>
                    <br />
                    · 2026년 감액 기준(약 519만원) 미만 → <strong>감액 없음</strong>
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 소득이 있어도 기준 미만이면 노령연금을 전액 받음.</span>
                  </p>
                </div>
              </section>

              <section className="space-y-6 border-t border-border-base pt-8" data-speakable>
                <h2 className="text-2xl font-bold">감액을 피하는 방법은 없나요?</h2>
                <p>
                  가장 확실한 방법은 연기연금 제도입니다. 노령연금 수급을 최대 5년까지 미루면 미룬 기간만큼 연금액이 월 0.6%, 연 7.2%씩 늘어납니다(국민연금법 §62).
                </p>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li>
                    <strong>고소득 재취업 기간에 연기:</strong> 소득이 높아 감액이 예상되는 몇 년 동안 수급을 미루면, 감액도 피하고 나중에 더 많은 연금을 받습니다.
                  </li>
                  <li>
                    <strong>5년 경과 후 자연 해소:</strong> 감액은 수급 개시 후 5년만 적용되므로, 그 이후에는 소득이 많아도 감액되지 않습니다.
                  </li>
                  <li>
                    <strong>소득금액 관리:</strong> 감액 기준은 총수입이 아니라 소득금액이므로, 필요경비 처리 등으로 소득금액이 기준 미만이면 감액 대상이 아닐 수 있습니다.
                  </li>
                </ul>
                <p>
                  다만 연기연금은 그 기간 동안 연금을 받지 못하므로, 건강 상태와 예상 수명, 다른 소득원을 함께 고려해 결정해야 합니다. 무조건 연기가 유리한 것은 아닙니다.
                </p>
              </section>

              <h2 className="text-2xl font-bold mb-6">자주 묻는 질문</h2>
              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h3 className="text-lg font-semibold text-text-primary">관련 계산기 및 가이드</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link
                    href="/guide/national-pension-expected-benefit-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">국민연금 예상 수령액</div>
                    <p className="mt-1 text-sm text-text-secondary">가입 기간과 소득으로 예상 연금액을 가늠하세요.</p>
                  </Link>
                  <Link
                    href="/guide/national-pension-early-deferred-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">조기연금 vs 연기연금</div>
                    <p className="mt-1 text-sm text-text-secondary">언제 받기 시작하는 것이 유리한지 비교합니다.</p>
                  </Link>
                  <Link
                    href="/guide/national-pension-income-upper-limit-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">기준소득월액 상한</div>
                    <p className="mt-1 text-sm text-text-secondary">보험료 산정의 상한선 개념을 확인하세요.</p>
                  </Link>
                  <Link
                    href="/guide/basic-pension-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">기초연금 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">국민연금과 별개인 기초연금 자격을 확인하세요.</p>
                  </Link>
                  <Link
                    href="/guide/pension-income-tax-withholding-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">연금소득세 원천징수</div>
                    <p className="mt-1 text-sm text-text-secondary">받는 연금에 붙는 세금 처리 방식을 이해하세요.</p>
                  </Link>
                  <Link
                    href="/category/work/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">모든 근로·연금 가이드</div>
                    <p className="mt-1 text-sm text-text-secondary">연봉·퇴직·연금·4대보험 모음.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 교육 목적으로 작성되었으며, 개인 맞춤형 조언이 아닙니다. A값, 감액 시작 기준, 구간별 감액 방식은 매년 갱신되고 2026년 6월 17일 개정이 반영됩니다. 본문의 구간표는 감액 구조 이해를 위한 참고 자료이며, 개정 기준을 반영한 실제 감액 금액과 대상 여부는 국민연금공단에서 반드시 확인하세요. 본 콘텐츠는 2026-08-12 기준으로 작성되었습니다. 인용 법조항: <strong>국민연금법 §63의2(소득활동에 따른 노령연금액), §62(연기연금)</strong>. AI 보조 작성 후 운영자 검수 완료.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터</a>,{' '}
                  <a href="https://www.nps.or.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">국민연금공단</a>,{' '}
                  <a href="https://www.mohw.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">보건복지부</a>.
                </p>
              </section>

              <ShareButtons
                title="노령연금 소득활동 감액 2026 가이드"
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
