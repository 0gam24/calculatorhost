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

// 북극성 수익 레버: [revenue-lever: indexing+traffic] (신규 색인 표면 + 검색 의도 흡수)

const URL = 'https://calculatorhost.com/guide/childcare-reduced-hours-benefit-2026/';
const DATE_PUBLISHED = '2026-07-24';
const DATE_MODIFIED = '2026-07-24';

export const metadata: Metadata = {
  title: '육아기 근로시간 단축 급여 2026, 계산·상한·기간 | calculatorhost',
  description:
    '육아기 근로시간 단축은 자녀를 키우며 주 15~35시간으로 일하는 제도입니다. 매주 최초 10시간은 통상임금 100%, 나머지는 80%로 급여가 나옵니다. 계산법·상한·최대 3년 사용 기간을 남녀고용평등법 §19의2 기준으로 정리했습니다.',
  keywords: [
    '육아기 근로시간 단축',
    '육아기 단축 급여',
    '육아기 단축근무 급여 계산',
    '근로시간 단축 통상임금',
    '육아기 단축 상한',
    '육아기 단축 기간',
    '남녀고용평등법 19조의2',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '육아기 근로시간 단축 급여 2026, 계산·상한·기간' }],
    title: '육아기 근로시간 단축 급여 2026, 최초 10시간 통상임금 100%',
    description: '주 15~35시간 단축 근무, 매주 최초 10시간 100%·나머지 80% 급여. 계산법과 최대 3년 사용 기간을 정리했습니다.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '육아기 근로시간 단축 급여 2026, 계산·상한·기간',
    description: '매주 최초 10시간 통상임금 100%, 나머지 80%. 최대 3년. 남녀고용평등법 §19의2.',
  },
};

const FAQ_ITEMS = [
  {
    question: '육아기 근로시간 단축은 누가 쓸 수 있나요?',
    answer:
      '만 12세 이하 또는 초등학교 6학년 이하 자녀를 양육하는 근로자가 신청할 수 있습니다(남녀고용평등법 §19의2). 단축 후 주 근로시간은 15시간 이상 35시간 이하로 정해야 합니다. 사업주는 대체인력 채용이 어려운 등 예외 사유가 없으면 원칙적으로 허용해야 합니다.',
  },
  {
    question: '급여는 어떻게 계산하나요?',
    answer:
      '단축한 시간에 대해 고용보험에서 급여가 나옵니다. 매주 최초 10시간 단축분은 통상임금의 100%, 그 이상 단축한 시간은 통상임금의 80%를 기준으로 지급합니다. 즉 단축 시간이 많을수록 뒷부분(80% 구간)이 늘어나는 구조입니다. 실제 지급액에는 상한과 하한이 적용됩니다.',
  },
  {
    question: '상한액과 하한액은 얼마인가요?',
    answer:
      '매주 최초 10시간 단축분(통상임금 100%)에는 월 상한액이, 나머지 단축분(80%)에도 별도 상한액이 적용됩니다. 하한액도 있습니다. 상한·하한액은 매년 고용노동부 고시로 조정되므로, 신청 시점 기준의 정확한 금액은 고용보험 홈페이지나 관할 고용센터에서 확인하세요.',
  },
  {
    question: '얼마 동안 쓸 수 있나요?',
    answer:
      '기본 1년에 육아휴직을 쓰지 않고 남겨둔 기간을 두 배로 가산해 사용할 수 있으며, 최대 총 3년까지 가능합니다. 예를 들어 육아휴직 1년을 전혀 쓰지 않았다면 그 1년을 두 배(2년) 가산해 육아기 근로시간 단축을 최대 3년까지 쓸 수 있습니다.',
  },
  {
    question: '육아휴직과 동시에 쓸 수 있나요?',
    answer:
      '동시에 쓰는 것은 아니고, 두 제도를 나눠서 사용합니다. 육아휴직은 아예 쉬는 것이고, 육아기 근로시간 단축은 근무시간을 줄여 일하면서 급여 일부를 받는 것입니다. 육아휴직을 덜 쓰면 그만큼 근로시간 단축 기간이 늘어나므로, 자녀 상황과 소득을 고려해 배분하는 것이 좋습니다.',
  },
  {
    question: '단축하면 퇴직금이나 연차가 줄어드나요?',
    answer:
      '퇴직금 산정 시 육아기 근로시간 단축 기간의 평균임금이 낮아져 불리할 수 있으나, 법령상 단축 전 통상임금 기준으로 산정하도록 하는 보호 규정이 있습니다. 연차휴가는 단축 근무도 소정근로일 출근으로 보아 산정하는 것이 원칙입니다. 구체적 계산은 회사 규정과 관할 고용센터에 확인하세요.',
  },
  {
    question: '신청은 언제 어떻게 하나요?',
    answer:
      '먼저 회사에 근로시간 단축을 신청해 승인받은 뒤, 단축을 시작한 날부터 1개월이 지난 시점부터 고용보험에 급여를 신청합니다. 매월 신청하거나 단축 종료 후 일괄 신청할 수 있으며, 종료일부터 12개월 이내에 신청해야 합니다. 온라인(고용24) 또는 관할 고용센터를 이용합니다.',
  },
  {
    question: '두 번째 자녀에 대해서도 다시 쓸 수 있나요?',
    answer:
      '자녀별로 각각 사용할 수 있습니다. 첫째에 대해 사용한 기간과 별개로, 둘째 자녀에 대해서도 요건을 충족하면 새로 신청할 수 있습니다. 다만 같은 기간에 두 자녀에 대해 중복해서 받는 방식은 아니므로, 사용 계획은 관할 고용센터와 상담하세요.',
  },
];

export default function ChildcareReducedHoursBenefit2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '육아기 근로시간 단축 급여 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '육아기 근로시간 단축 급여 2026, 최초 10시간 통상임금 100%',
    description:
      '육아기 근로시간 단축의 대상·급여 계산(최초 10시간 100%, 나머지 80%)·상한·최대 3년 사용 기간·신청 방법을 남녀고용평등법 §19의2와 고용보험법 §73의2 기준으로 정리한 가이드.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['육아기 근로시간 단축', '단축 급여 계산', '통상임금', '상한', '남녀고용평등법 19조의2'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '육아기 근로시간 단축 급여 2026',
    description:
      '자녀를 키우며 근로시간을 줄일 때 받는 육아기 근로시간 단축 급여의 계산·상한·기간·신청 정리.',
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
                    { name: '육아기 근로시간 단축 급여 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">육아 중 직장인 · 8분 읽기 · 2026-07-24</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  육아기 근로시간 단축 급여 2026
                  <br />
                  <span className="text-2xl text-text-secondary">최초 10시간 통상임금 100%</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  아이를 키우면서 온종일 일하기 어려울 때 쓸 수 있는 제도가 육아기 근로시간 단축입니다. 아예 쉬는 육아휴직과 달리 일을 하면서 시간을 줄이고, 줄인 시간만큼 고용보험에서 급여를 받습니다. 다만 급여 계산이 통상임금 100%와 80%로 나뉘어 헷갈립니다. 이 가이드는 대상·계산법·상한·사용 기간을 조문 기준으로 정리합니다.
                </p>
              </header>

              <AdSlot slot="guide-childcare-reduced-hours-benefit-top" format="horizontal" />

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">육아기 근로시간 단축이란?</h2>
                <p>
                  육아기 근로시간 단축은 만 12세 이하(또는 초등학교 6학년 이하) 자녀를 키우는 근로자가 근무시간을 줄여 일할 수 있게 하는 제도입니다(남녀고용평등법 §19의2). 줄인 시간에 대해 고용보험이 급여를 지급합니다(고용보험법 §73의2).
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">한눈 요약</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    대상: 만 12세 이하 또는 초등 6학년 이하 자녀 양육 근로자.
                    <br />
                    단축 후 근로시간: 주 15시간 이상 35시간 이하.
                    <br />
                    급여: 매주 최초 10시간 100%, 나머지 80% (고용보험 지급).
                  </p>
                </div>
                <p>
                  다만 사업주는 대체인력을 구하기 어렵거나 정상 운영에 중대한 지장이 있는 등 정당한 사유가 있을 때만 거부할 수 있고, 그 경우 근로자와 협의해 다른 조치를 논의해야 합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">급여는 어떻게 계산하나요?</h2>
                <p>
                  급여는 줄인 근로시간을 기준으로 두 구간으로 나눠 계산합니다. 매주 최초 10시간 단축분은 통상임금의 100%, 그 이상 단축한 시간은 통상임금의 80%를 적용합니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 육아기 근로시간 단축 급여 계산 구조</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">단축 구간</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">지급률</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">계산 기준</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">매주 최초 10시간</td>
                        <td className="p-3"><strong>통상임금 100%</strong></td>
                        <td className="p-3">월 통상임금 × (10 / 단축 전 소정근로시간)</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">10시간 초과 단축분</td>
                        <td className="p-3"><strong>통상임금 80%</strong></td>
                        <td className="p-3">월 통상임금 × (초과 단축시간 / 소정근로시간) × 80%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p>
                  다만 각 구간에는 월 상한액과 하한액이 적용되므로, 통상임금이 아주 높아도 상한을 넘는 부분은 지급되지 않습니다. 반대로 계산액이 하한보다 낮으면 하한액이 적용됩니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">상한·하한액은 얼마인가요?</h2>
                <p>
                  매주 최초 10시간분(통상임금 100%)과 나머지 단축분(80%)에 각각 별도의 월 상한액이 있습니다. 하한액도 정해져 있습니다.
                </p>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li><strong>최초 10시간분(100%):</strong> 월 상한액 이내로 지급.</li>
                  <li><strong>나머지 단축분(80%):</strong> 별도의 월 상한액 이내로 지급.</li>
                  <li><strong>하한액:</strong> 계산액이 하한보다 낮으면 하한액 적용.</li>
                </ul>
                <p>
                  다만 상한·하한 금액은 매년 고용노동부 고시로 바뀝니다. 예산·정책에 따라 인상되는 경우가 많으므로, 신청 시점의 정확한 금액은 고용보험 홈페이지에서 반드시 확인하세요.
                </p>
              </section>

              <AdSlot slot="guide-childcare-reduced-hours-benefit-mid" format="rectangle" />

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">육아기 근로시간 단축 급여 계산 사례</h2>
                <p>
                  실제 시간과 통상임금으로 급여가 얼마나 나오는지 단계별로 계산해 보겠습니다. 아래는 단축 전 주 40시간을 기준으로 한 예시이며, 상한·하한 적용 전 계산식만 보여줍니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 1. 통상임금 월 300만원, 주 40 → 30시간(10시간 단축)</p>
                  <p className="text-sm text-text-secondary">
                    · 최초 10시간분(100%): 300만원 × (10 / 40) = 75만원
                    <br />
                    · 초과 단축분(80%): 없음(딱 10시간 단축)
                    <br />
                    · 월 지급액(상한 적용 전): <strong>약 75만원</strong>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 2. 통상임금 월 320만원, 주 40 → 25시간(15시간 단축)</p>
                  <p className="text-sm text-text-secondary">
                    · 최초 10시간분(100%): 320만원 × (10 / 40) = 80만원
                    <br />
                    · 초과 5시간분(80%): 320만원 × (5 / 40) × 80% = 32만원
                    <br />
                    · 월 지급액(상한 적용 전): <strong>약 112만원</strong>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 3. 통상임금 월 250만원, 주 40 → 35시간(5시간 단축)</p>
                  <p className="text-sm text-text-secondary">
                    · 최초 5시간분(100%, 10시간 이내): 250만원 × (5 / 40) = 약 31만 2,500원
                    <br />
                    · 초과 단축분(80%): 없음
                    <br />
                    · 월 지급액(상한 적용 전): <strong>약 31만원</strong>
                    <br />
                    <span className="text-xs text-text-tertiary">경계: 단축이 10시간 이하이면 전부 100% 구간으로 계산됩니다.</span>
                  </p>
                </div>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">얼마 동안, 어떻게 쓰나요?</h2>
                <p>
                  사용 기간은 기본 1년에 육아휴직 미사용 기간을 두 배 가산해 정해지며, 최대 총 3년까지 사용할 수 있습니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 2. 육아휴직 vs 육아기 근로시간 단축</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">구분</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">육아휴직</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">근로시간 단축</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">근무 여부</td>
                        <td className="p-3">쉼(무근로)</td>
                        <td className="p-3">단축 근무(주 15~35시간)</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">소득</td>
                        <td className="p-3">육아휴직 급여</td>
                        <td className="p-3">단축 근무 급여 + 단축분 지원금</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">사용 기간</td>
                        <td className="p-3">자녀당 1년</td>
                        <td className="p-3">최대 3년(육아휴직 미사용분 가산)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p>
                  다만 육아휴직을 많이 쓰면 근로시간 단축으로 쓸 수 있는 기간이 줄어듭니다. 소득이 필요하면 단축을, 아이 곁에 온전히 있어야 하면 휴직을 우선하는 식으로 배분을 계획하세요.
                </p>
              </section>

              <h2 className="text-2xl font-bold mb-6">자주 묻는 질문</h2>
              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h3 className="text-lg font-semibold text-text-primary">관련 계산기 및 가이드</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link
                    href="/guide/parental-leave-benefit-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">육아휴직 급여 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">쉬면서 받는 육아휴직 급여 기준을 비교하세요.</p>
                  </Link>
                  <Link
                    href="/guide/maternity-leave-benefit-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">출산전후휴가 급여 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">복직 전 출산전후휴가 급여를 확인하세요.</p>
                  </Link>
                  <Link
                    href="/guide/spouse-childbirth-leave-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">배우자 출산휴가 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">배우자가 쓰는 20일 유급휴가를 알아보세요.</p>
                  </Link>
                  <Link
                    href="/calculator/salary/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">연봉 실수령액 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">단축 근무 시 실수령 변화를 가늠해 보세요.</p>
                  </Link>
                  <Link
                    href="/guide/ordinary-wage-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">통상임금이란 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">급여 계산의 기준이 되는 통상임금을 이해하세요.</p>
                  </Link>
                  <Link
                    href="/category/work/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">모든 근로 가이드</div>
                    <p className="mt-1 text-sm text-text-secondary">휴가·수당·4대보험 등 직장인 가이드 모음.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 교육 목적으로 작성되었으며 개인 맞춤형 노무 조언이 아닙니다. 급여 상한·하한액은 매년 고용노동부 고시로 조정되며, 통상임금 산정·소정근로시간·회사 규정에 따라 실제 지급액이 달라집니다. 신청 전 고용보험 홈페이지(고용24) 또는 관할 고용센터에서 반드시 확인하세요. 본 콘텐츠는 2026-07-24 기준이며 법령·고시 개정 시 업데이트됩니다. 근거 법조항은 <strong>남녀고용평등법 §19의2(육아기 근로시간 단축), 고용보험법 §73의2(육아기 근로시간 단축 급여)</strong>입니다. AI 보조 작성 후 운영자 검수 완료.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터</a>,{' '}
                  <a href="https://www.moel.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">고용노동부</a>.
                </p>
              </section>

              <ShareButtons
                title="육아기 근로시간 단축 급여 2026 가이드"
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
