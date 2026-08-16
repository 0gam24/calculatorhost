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

const URL = 'https://calculatorhost.com/guide/unemployment-benefit-part-time-work-2026/';
const DATE_PUBLISHED = '2026-08-17';
const DATE_MODIFIED = '2026-08-17';
// [revenue-lever: indexing+traffic]

export const metadata: Metadata = {
  title: '실업급여 받으면서 알바 2026, 신고 안 하면 부정수급',
  description:
    '실업급여 수급 중 알바는 가능하지만 일한 날은 실업인정일에 반드시 자진신고해야 합니다. 주 15시간 기준, 감액·미지급 방식, 미신고 시 최대 5배 추가징수까지 고용보험법 47조 기준으로 정리했습니다.',
  keywords: [
    '실업급여 알바',
    '실업급여 받으면서 아르바이트',
    '실업급여 근로 신고',
    '실업급여 부정수급',
    '주 15시간 실업급여',
    '고용24 근로사실 신고',
    '고용보험법 47조',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '실업급여 받으면서 알바 2026' }],
    title: '실업급여 받으면서 알바 2026, 신고 규칙 총정리',
    description:
      '알바는 가능, 단 일한 날은 반드시 신고. 주 15시간 기준, 감액·미지급, 미신고 시 부정수급 처벌까지.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '실업급여 받으면서 알바, 신고 규칙',
    description: '알바 가능하지만 일한 날은 자진신고 필수. 미신고 시 최대 5배 추가징수. 고용보험법 §47·§61·§62.',
  },
};

const FAQ_ITEMS = [
  {
    question: '실업급여 받으면서 알바해도 되나요?',
    answer:
      '가능합니다. 단기·소액 아르바이트는 수급 자격을 유지하면서 병행할 수 있습니다. 다만 일한 사실은 실업인정일에 반드시 자진신고해야 합니다(고용보험법 §47). 주 15시간 이상 또는 월 60시간 이상 계속 근로하면 취업으로 보아 남은 구직급여가 종료될 수 있습니다.',
  },
  {
    question: '하루라도 일하면 무조건 신고해야 하나요?',
    answer:
      '네, 소득 유무나 금액과 관계없이 일한 사실 자체를 신고해야 합니다(고용보험법 §47). 무급 근로, 가족 사업 도움, 프리랜서 건별 작업도 근로에 포함됩니다. 신고는 고용24 실업인정 신청 화면에서 근로일과 소득을 입력하는 방식입니다.',
  },
  {
    question: '알바하면 실업급여가 얼마나 깎이나요?',
    answer:
      '근로한 날은 원칙적으로 그 날의 구직급여가 지급되지 않습니다. 근로시간·소득에 따라 해당 일수를 실업인정에서 제외하거나 소득을 반영해 감액합니다. 다만 지급되지 않은 일수는 사라지지 않고 수급기간 안에서 뒤로 이월되므로, 정직하게 신고하면 총 받을 금액이 줄지 않는 경우가 많습니다.',
  },
  {
    question: '주 15시간 미만이면 신고 안 해도 되나요?',
    answer:
      '아닙니다. 주 15시간 미만이라도 일한 날은 신고해야 합니다. 주 15시간·월 60시간 기준은 취업으로 볼지 여부를 가르는 선일 뿐, 신고 의무 자체를 면제하는 기준이 아닙니다. 시간이 짧아도 근로 사실은 반드시 자진신고하세요.',
  },
  {
    question: '신고를 깜빡했는데 어떻게 되나요?',
    answer:
      '실수라도 미신고는 부정수급으로 처리될 수 있습니다(고용보험법 §61). 적발 시 그동안 받은 급여 반환은 물론 부정수급액의 최대 5배까지 추가징수될 수 있고, 형사처벌 대상이 되기도 합니다(§62). 뒤늦게라도 관할 고용센터에 자진신고하면 제재가 완화될 수 있으니 즉시 연락하세요.',
  },
  {
    question: '단기 알바를 계속하면 취업으로 처리되나요?',
    answer:
      '주 15시간 이상 또는 월 60시간 이상 계속 일하면 취업으로 보아 구직급여가 종료됩니다. 이 경우 조기재취업수당 요건을 갖추면 남은 급여의 일부를 일시금으로 받을 수 있으므로, 안정적 일자리를 얻었다면 조기재취업수당을 검토하는 편이 유리합니다.',
  },
  {
    question: '프리랜서 3.3% 소득도 신고 대상인가요?',
    answer:
      '네, 사업소득으로 3.3%를 떼는 프리랜서 작업도 근로 또는 소득 발생으로 보아 신고 대상입니다. 국세청 지급명세서와 고용센터 신고 내역이 다르면 사후에 적발되기 쉽습니다. 건별 작업이라도 실업인정일에 반드시 소득을 신고하세요.',
  },
];

export default function UnemploymentBenefitPartTimeWork2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '실업급여 받으면서 알바 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '실업급여 받으면서 알바 2026, 신고 규칙과 부정수급 주의',
    description:
      '실업급여 수급 중 아르바이트 가능 여부와 신고 의무, 주 15시간 기준, 감액·미지급 방식, 미신고 시 부정수급 처벌을 고용보험법 §47·§61·§62 기준으로 정리.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['실업급여', '알바', '근로 신고', '부정수급', '고용24', '조기재취업수당'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '실업급여 받으면서 알바 2026',
    description:
      '실업급여 수급 중 알바 가능 여부와 신고 규칙, 감액 방식, 부정수급 처벌을 정리한 실전 가이드.',
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
                    { name: '실업급여 받으면서 알바 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">구직자 · 7분 읽기 · 2026-08-17</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  실업급여 받으면서 알바 2026
                  <br />
                  <span className="text-2xl text-text-secondary">· 신고 규칙과 부정수급 주의</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  실업급여를 받는 동안 생활비가 부족해 잠깐 알바를 하려는 구직자가 많습니다. 이 글은 실업급여 수급 중 아르바이트나 단기 근로를 고민하는 분을 위해 준비했습니다. 결론부터 말하면 알바는 가능하지만, 일한 날은 반드시 신고해야 하고 신고를 놓치면 부정수급으로 몰릴 수 있습니다. 무엇을 어떻게 신고하는지, 급여는 얼마나 깎이는지 고용보험법 조문을 근거로 단계별로 정리합니다.
                </p>
              </header>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">30초 요약</h2>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">핵심만 먼저</p>
                  <ul className="mt-2 space-y-1 text-sm text-text-secondary list-disc ml-5">
                    <li>알바 병행은 가능, 단 일한 날은 실업인정일에 자진신고 의무(고용보험법 §47).</li>
                    <li>소득 유무·금액과 무관하게 일한 사실 자체를 신고.</li>
                    <li>주 15시간·월 60시간 이상 계속 근로하면 취업으로 보아 급여 종료.</li>
                    <li>근로일은 그 날 구직급여 미지급 또는 감액, 미지급분은 뒤로 이월.</li>
                    <li>미신고 적발 시 반환 + 최대 5배 추가징수(§61·§62).</li>
                  </ul>
                </div>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">실업급여 받으면서 알바해도 되나요?</h2>
                <p>
                  가능합니다. 실업급여(구직급여)는 재취업을 준비하는 기간의 생계를 돕는 제도이므로, 그 사이 단기 아르바이트로 소득을 보태는 것 자체는 금지되지 않습니다. 다만 두 가지 원칙이 붙습니다. 첫째, 일한 날은 반드시 신고해야 합니다. 둘째, 일정 시간 이상 계속 일하면 취업으로 보아 급여가 종료됩니다.
                </p>
                <p>
                  취업으로 보는 기준은 주 15시간 이상 또는 월 60시간 이상의 계속 근로입니다. 이 기준을 넘겨 안정적으로 일하기 시작하면 더 이상 실업 상태가 아니므로 남은 구직급여는 지급되지 않습니다. 반대로 이 기준 미만의 단발성 알바는 수급 자격을 유지하면서 병행할 수 있습니다.
                </p>
                <p>
                  다만 이 시간 기준은 신고 의무와는 별개입니다. 주 15시간 미만이라 취업이 아니어도, 일한 날은 여전히 신고해야 합니다. 시간이 짧다는 이유로 신고를 건너뛰면 안 됩니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">일하면 반드시 신고해야 하나요?</h2>
                <p>
                  네, 소득이 없어도 일한 사실은 신고 대상입니다. 고용보험법 §47은 실업인정 대상 기간에 근로를 제공했거나 소득이 발생하면 이를 신고하도록 정합니다. 유급 알바뿐 아니라 무급으로 가족 사업을 도운 경우, 프리랜서 건별 작업, 일용 근로도 모두 포함됩니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">신고 방법 (고용24)</p>
                  <ol className="mt-2 space-y-1 text-sm text-text-secondary list-decimal ml-5">
                    <li>실업인정일에 고용24(work24.go.kr)에서 실업인정 신청을 시작합니다.</li>
                    <li>근로·소득 발생 여부 항목에서 일한 날짜와 시간, 소득을 입력합니다.</li>
                    <li>일용근로는 근무일수와 일당을, 프리랜서는 지급받은 금액을 기재합니다.</li>
                    <li>불확실하면 관할 고용센터(국번없이 1350)에 미리 확인합니다.</li>
                  </ol>
                </div>
                <p>
                  다만 신고 내용은 사후 검증됩니다. 국세청 지급명세서, 4대보험 취득 이력, 사업장 신고 자료와 대조되므로 축소·누락 신고는 적발되기 쉽습니다. 정확히 신고하는 것이 가장 안전합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">알바하면 실업급여가 얼마나 깎이나요?</h2>
                <p>
                  근로한 날은 그 날의 구직급여가 원칙적으로 지급되지 않습니다. 실업인정 대상 기간 중 일한 날은 실업 상태가 아니므로 해당 일수를 제외하고, 근로시간·소득 수준에 따라 그 날을 미지급 처리하거나 소득을 반영해 감액합니다. 구체적 계산 방식은 사안별로 다르므로 고용센터 안내를 따르세요.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례. 구직급여 일액 6만원, 한 달 중 5일 알바</p>
                  <p className="text-sm text-text-secondary">
                    · 소정급여일수 기준 월 지급 예정: 6만원 × 28일 = 168만원
                    <br />
                    · 알바한 5일은 실업인정 제외(그 날 구직급여 미지급)
                    <br />
                    · 해당 월 지급: 6만원 × 23일 = 138만원
                    <br />
                    · 미지급된 5일분: 총 수급기간 안에서 뒤로 이월
                    <br />
                    <span className="text-xs text-text-tertiary">정직하게 신고하면 미지급분이 사라지지 않고 이월되어 총액은 대체로 유지됩니다. 실제 처리는 관할 고용센터 기준을 따릅니다.</span>
                  </p>
                </div>
                <p>
                  다만 신고하지 않고 받으면 이야기가 달라집니다. 그 경우 이월이 아니라 부정수급이 되어 받은 돈을 토해내야 합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">주 15시간 미만과 이상, 무엇이 다른가요?</h2>
                <p>
                  15시간을 기준으로 취업 판정이 갈립니다. 아래 비교표로 정리합니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 근로시간별 실업급여 처리 (고용보험법 §47 기준, 실제 판정은 고용센터)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">구분</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">주 15시간·월 60시간 미만</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">주 15시간·월 60시간 이상 계속</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">취업 여부</td>
                        <td className="p-3">취업 아님(수급 유지)</td>
                        <td className="p-3">취업으로 봄(급여 종료)</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">신고 의무</td>
                        <td className="p-3"><strong>있음</strong></td>
                        <td className="p-3"><strong>있음</strong></td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">급여 처리</td>
                        <td className="p-3">근로일 미지급·이월</td>
                        <td className="p-3">지급 종료, 조기재취업수당 검토</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  다만 두 경우 모두 신고 의무는 동일합니다. 시간 기준은 취업 판정용일 뿐이며, 어느 쪽이든 일한 날은 신고해야 합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">신고 안 하면 어떻게 되나요?</h2>
                <p>
                  미신고는 부정수급이 됩니다. 고용보험법 §61은 거짓이나 부정한 방법으로 급여를 받으면 지급을 제한하도록 정하고, §62는 이미 받은 급여의 반환과 추가징수를 규정합니다. 실무상 부정수급액의 최대 5배까지 추가징수될 수 있고, 사안에 따라 형사처벌 대상이 됩니다.
                </p>
                <p>
                  국세기본법이 아니라 고용보험 체계에서도 실질을 봅니다. 근로를 숨기려 소득을 축소하거나 가족 명의로 돌려도, 지급명세서와 4대보험 기록으로 사후 확인됩니다. 적발은 대부분 실업급여 종료 후 정산 단계에서 이루어집니다.
                </p>
                <p>
                  다만 실수로 신고를 놓쳤다면 방법이 있습니다. 부정수급을 자진신고하면 추가징수 등 제재가 완화될 수 있으므로, 뒤늦게라도 관할 고용센터에 바로 알리는 것이 최선입니다.
                </p>
              </section>

              <h2 className="text-2xl font-bold mb-6">자주 묻는 질문</h2>
              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h3 className="text-lg font-semibold text-text-primary">관련 계산기 및 가이드</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link
                    href="/guide/unemployment-benefit-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">실업급여 조건·금액 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">수급 요건, 소정급여일수, 일액 계산을 확인하세요.</p>
                  </Link>
                  <Link
                    href="/guide/early-reemployment-allowance-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">조기재취업수당 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">일찍 취업하면 남은 급여 일부를 일시금으로.</p>
                  </Link>
                  <Link
                    href="/guide/daily-worker-income-tax-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">일용근로자 소득세 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">일당 알바의 세금과 원천징수 구조.</p>
                  </Link>
                  <Link
                    href="/guide/national-employment-support-allowance-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">국민취업지원제도 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">실업급여 대상이 아닐 때 받는 구직촉진수당.</p>
                  </Link>
                  <Link
                    href="/guide/freelancer-take-home-3-3-percent-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">프리랜서 3.3% 실수령</div>
                    <p className="mt-1 text-sm text-text-secondary">건별 작업 소득의 세금과 신고 방법.</p>
                  </Link>
                  <Link
                    href="/category/work/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">모든 근로·급여 가이드</div>
                    <p className="mt-1 text-sm text-text-secondary">연봉·실수령·4대보험·수당 모음.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 교육 목적으로 작성되었으며 개인 맞춤형 조언이 아닙니다. 취업 판정, 감액·미지급 방식, 부정수급 제재는 개별 사실관계와 관할 고용센터 판단에 따라 달라지므로, 신고 전 고용24 또는 관할 고용센터(1350)에 확인하세요. 본 콘텐츠는 2026-08-17 기준이며 관련 법령 개정 시 업데이트됩니다. 인용 조항: 고용보험법 <strong>§40(수급요건)·§44(실업의 인정)·§47(근로 등 신고)·§61(지급 제한)·§62(반환명령·추가징수)</strong>. AI 보조 작성 후 운영자 검수 완료.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터</a>,{' '}
                  <a href="https://www.work24.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">고용24</a>,{' '}
                  <a href="https://www.moel.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">고용노동부</a>.
                </p>
              </section>

              <ShareButtons
                title="실업급여 받으면서 알바 2026 가이드"
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
