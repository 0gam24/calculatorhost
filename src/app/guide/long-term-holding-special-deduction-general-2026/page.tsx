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

const URL = 'https://calculatorhost.com/guide/long-term-holding-special-deduction-general-2026/';
const DATE_PUBLISHED = '2026-08-19';
const DATE_MODIFIED = '2026-08-19';

export const metadata: Metadata = {
  title: '장기보유특별공제 일반 표1 2026, 3년 6%부터 15년 30%',
  description:
    '상가·토지·다주택을 3년 이상 보유하고 팔면 양도차익의 6~30%를 장기보유특별공제로 빼줍니다(소득세법 §95②). 표1 연 2% 공제율, 1주택 표2와의 차이, 보유기간 경계값 계산까지 사례로 정리했습니다.',
  keywords: [
    '장기보유특별공제',
    '장기보유특별공제 표1',
    '장기보유특별공제 계산',
    '상가 양도세 장기보유',
    '토지 장기보유특별공제',
    '다주택 장기보유특별공제',
    '소득세법 95조',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '장기보유특별공제 일반 표1 2026, 3년 6%부터 15년 30%' }],
    title: '장기보유특별공제 일반 표1 2026, 보유기간별 6~30% 공제 계산',
    description: '3년 이상 보유한 부동산을 팔 때 양도차익의 6~30%를 공제. 표1(일반)과 표2(1세대1주택 최대 80%)의 차이와 계산법.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '장기보유특별공제 일반 표1 2026, 3년 6%부터 15년 30%',
    description: '상가·토지·다주택을 오래 보유할수록 양도차익 공제율이 커집니다. 소득세법 §95② 표1 계산법.',
  },
};

const FAQ_ITEMS = [
  {
    question: '장기보유특별공제는 몇 년 보유해야 받나요?',
    answer:
      '3년 이상 보유해야 받습니다(소득세법 §95②). 보유기간이 2년 11개월이면 공제율은 0%이고, 정확히 3년을 채우면 표1 기준 6%가 적용됩니다. 보유기간은 취득일부터 양도일까지로 계산하며, 하루라도 3년에 미달하면 공제가 전혀 없으므로 매도 시점을 잡을 때 주의해야 합니다.',
  },
  {
    question: '표1과 표2는 무엇이 다른가요?',
    answer:
      '표1은 일반 부동산용, 표2는 1세대1주택 고가주택용입니다. 표1(일반)은 상가·토지·다주택 등에 적용되어 연 2%씩 3년 6%부터 15년 이상 30%까지 공제합니다. 표2(1세대1주택)는 2년 이상 거주 요건을 갖추면 보유기간 연 4%와 거주기간 연 4%를 합쳐 최대 80%까지 공제합니다. 같은 보유기간이라도 공제율이 크게 차이 납니다.',
  },
  {
    question: '다주택자도 장기보유특별공제를 받을 수 있나요?',
    answer:
      '원칙적으로 표1이 적용됩니다. 다주택자가 일반 주택을 팔면 표1(연 2%, 최대 30%)로 공제받습니다. 다만 조정대상지역 주택에 중과세율이 적용되는 경우에는 장기보유특별공제가 배제될 수 있습니다(소득세법 §95②, §104⑦). 중과 적용 여부는 한시적 유예 등 정책 변동이 잦으므로 국세청 또는 세무사 확인이 필수입니다.',
  },
  {
    question: '보유 15년이 넘으면 공제율이 계속 올라가나요?',
    answer:
      '아닙니다. 표1은 15년에서 30%로 상한이 걸립니다. 3년 6%에서 매년 2%p씩 올라가지만 15년 이상 보유해도 30%가 최대입니다. 16년, 20년을 보유해도 공제율은 30%로 동일하므로, 표1 자산은 15년을 넘긴 뒤에는 보유기간 자체로 추가 절세되지 않습니다.',
  },
  {
    question: '장기보유특별공제와 양도소득기본공제는 같은 건가요?',
    answer:
      '다른 공제입니다. 장기보유특별공제는 양도차익에서 보유기간에 따라 빼주는 공제이고(소득세법 §95②), 양도소득기본공제는 연 250만원을 정액으로 빼주는 별개 공제입니다(소득세법 §103). 계산 순서는 양도차익에서 장기보유특별공제를 먼저 빼 양도소득금액을 구하고, 그다음 기본공제 250만원을 빼 과세표준을 구합니다.',
  },
  {
    question: '어떤 자산은 장기보유특별공제가 아예 안 되나요?',
    answer:
      '미등기 양도자산과 보유 3년 미만 자산은 공제되지 않습니다(소득세법 §95②, §104③). 국외 부동산도 장기보유특별공제 대상이 아닙니다(소득세법 §118의8). 또한 조합원입주권은 원조합원의 주택분 양도차익에 한해 표1이 적용되는 등 자산별로 세부 규정이 다르므로, 개별 사례는 국세청 상담을 권합니다.',
  },
  {
    question: '비사업용 토지도 장기보유특별공제를 받나요?',
    answer:
      '받을 수 있습니다. 비사업용 토지도 3년 이상 보유하면 표1(연 2%, 최대 30%)로 장기보유특별공제가 적용됩니다. 다만 비사업용 토지는 기본세율에 10%p가 가산되는 중과 대상이므로, 공제를 받더라도 세율 자체가 높아 세부담이 큽니다. 사업용 전환 요건을 갖췄는지 함께 검토하는 것이 절세에 유리합니다.',
  },
];

export default function LongTermHoldingSpecialDeductionGeneral2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '장기보유특별공제 일반 표1 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '장기보유특별공제 일반 표1 2026, 보유기간별 6~30% 공제 계산',
    description:
      '상가·토지·다주택을 3년 이상 보유하고 양도할 때 적용되는 장기보유특별공제 표1. 연 2% 공제율, 표2(1세대1주택)와의 차이, 보유기간 경계값 계산, 공제 배제 자산까지 정리.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['장기보유특별공제', '표1', '양도소득세', '보유기간', '소득세법 95조'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '장기보유특별공제 일반 표1 2026',
    description:
      '3년 이상 보유한 상가·토지·다주택 양도 시 적용되는 장기보유특별공제 표1의 공제율과 계산법.',
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
                    { name: '장기보유특별공제 일반 표1 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">부동산 양도자 · 8분 읽기 · 2026-08-19</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  장기보유특별공제 일반 표1 2026
                  <br />
                  <span className="text-2xl text-text-secondary">· 3년 6%부터 15년 30%까지</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  상가나 토지, 또는 1세대1주택이 아닌 주택을 오래 보유했다가 팔면, 양도차익 전부에 세금을 매기지 않고 보유기간에 비례한 금액을 빼줍니다. 이것이 장기보유특별공제입니다. 이 가이드는 일반 부동산에 적용되는 표1을 중심으로, 몇 년부터 얼마나 공제되는지, 1세대1주택 표2와 무엇이 다른지, 그리고 실제 세액이 어떻게 줄어드는지를 사례로 정리했습니다. 부동산을 언제 팔지 저울질하는 분을 위한 글입니다.
                </p>
              </header>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">장기보유특별공제란 무엇인가요</h2>
                <p>
                  장기보유특별공제는 오래 보유한 부동산의 양도차익 일부를 과세에서 빼주는 제도입니다(소득세법 §95②). 물가 상승분과 장기 보유에 대한 배려를 반영해, 보유기간이 길수록 공제율을 높여 실제 세부담을 낮춥니다. 양도차익에서 이 공제를 먼저 뺀 금액이 양도소득금액이 되고, 여기서 양도소득기본공제 250만원을 다시 빼면 과세표준이 됩니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">계산 순서 한눈에 보기</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    양도차익 (양도가 − 취득가 − 필요경비)
                    <br />
                    → 장기보유특별공제 차감 (양도차익 × 보유기간별 공제율)
                    <br />
                    → 양도소득금액
                    <br />
                    → 양도소득기본공제 250만원 차감 (소득세법 §103)
                    <br />
                    → 과세표준 → 세율 적용 → 산출세액
                  </p>
                </div>
                <p className="mt-4">
                  다만 이 공제는 토지와 건물, 조합원입주권 등 실물 부동산 성격의 자산에만 적용됩니다. 주식이나 분양권처럼 성격이 다른 자산은 대상이 아니거나 별도 규정을 따릅니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">몇 년 보유해야 공제를 받나요</h2>
                <p>
                  3년입니다. 보유기간이 3년 미만이면 장기보유특별공제는 0원입니다(소득세법 §95②). 취득일부터 양도일까지가 3년에 하루라도 미달하면 공제가 전혀 없다가, 정확히 3년을 채우는 순간 표1 기준 6%가 붙습니다. 이후 1년이 지날 때마다 2%p씩 올라 15년 이상이면 30%로 상한에 도달합니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-3 text-sm">
                  정의: 장기보유특별공제는 3년 이상 보유가 최소 요건입니다. 핵심: 표1은 3년 6%에서 시작해 매년 2%p씩, 15년 이상 30% 상한 (소득세법 §95②).
                </div>
                <p className="mt-4">
                  다만 보유기간 기산일은 자산 취득 경위에 따라 달라질 수 있습니다. 상속받은 부동산은 피상속인의 취득일이 아니라 상속개시일부터, 증여받은 부동산은 증여등기일부터 보유기간을 세는 것이 원칙이므로, 취득 경위가 특수하면 기산일을 먼저 확인해야 합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">표1과 표2는 무엇이 다른가요</h2>
                <p>
                  표1은 일반 부동산, 표2는 1세대1주택 고가주택에 적용됩니다. 같은 10년 보유라도 표1은 20%인 반면, 거주 요건을 갖춘 1세대1주택 표2는 최대 80%까지 공제받을 수 있어 격차가 매우 큽니다. 자신의 자산이 어느 표에 속하는지 먼저 확인해야 절세 규모를 가늠할 수 있습니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 장기보유특별공제 표1과 표2 비교 (소득세법 §95②, 2026 기준)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">구분</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">표1 (일반)</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">표2 (1세대1주택)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">적용 대상</td>
                        <td className="p-3">상가·토지·다주택 등</td>
                        <td className="p-3">2년 이상 거주한 1세대1주택</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">연 공제율</td>
                        <td className="p-3">연 2%</td>
                        <td className="p-3">보유 연 4% + 거주 연 4%</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">시작 공제율</td>
                        <td className="p-3">3년 6%</td>
                        <td className="p-3">보유 3년 12%, 거주 2년 8%</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">최대 공제율</td>
                        <td className="p-3"><strong>30% (15년 이상)</strong></td>
                        <td className="p-3"><strong>80% (보유10년+거주10년)</strong></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  다만 표2는 거주 요건이 핵심입니다. 1세대1주택이라도 2년 이상 실제 거주하지 않았다면 표2를 쓸 수 없고 표1이 적용됩니다. 표2의 상세 계산은 별도 가이드에서 다루며, 이 글은 표1에 집중합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">표1 공제율은 보유기간별로 얼마인가요</h2>
                <p>
                  표1은 3년 6%에서 시작해 매년 2%p씩 올라 15년 이상 30%가 상한입니다. 아래 표에서 자신의 보유기간에 해당하는 공제율을 확인하세요.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 2. 장기보유특별공제 표1 보유기간별 공제율 (소득세법 §95②)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">보유기간</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">공제율</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">보유기간</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">공제율</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">3년 이상</td>
                        <td className="p-3">6%</td>
                        <td className="p-3">10년 이상</td>
                        <td className="p-3">20%</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">4년 이상</td>
                        <td className="p-3">8%</td>
                        <td className="p-3">11년 이상</td>
                        <td className="p-3">22%</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">5년 이상</td>
                        <td className="p-3">10%</td>
                        <td className="p-3">12년 이상</td>
                        <td className="p-3">24%</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">6년 이상</td>
                        <td className="p-3">12%</td>
                        <td className="p-3">13년 이상</td>
                        <td className="p-3">26%</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">7년 이상</td>
                        <td className="p-3">14%</td>
                        <td className="p-3">14년 이상</td>
                        <td className="p-3">28%</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">8년 이상</td>
                        <td className="p-3">16%</td>
                        <td className="p-3">15년 이상</td>
                        <td className="p-3"><strong>30% (상한)</strong></td>
                      </tr>
                      <tr>
                        <td className="p-3">9년 이상</td>
                        <td className="p-3">18%</td>
                        <td className="p-3">-</td>
                        <td className="p-3">-</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  다만 15년을 넘겨도 공제율은 30%로 고정됩니다. 표1 자산은 15년 이후에는 보유기간만으로 추가 절세가 되지 않으므로, 매도 시점 판단 시 이 상한을 감안해야 합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">실제 계산은 어떻게 하나요</h2>
                <p>
                  공제액은 양도차익에 보유기간별 공제율을 곱해 구합니다. 아래 세 사례로 흐름을 확인하세요. 경계값(보유 3년 미달 vs 3년 정확)을 함께 넣었습니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 1. 상가, 양도차익 3억원, 보유 7년</p>
                  <p className="text-sm text-text-secondary">
                    · 양도차익: 3억원
                    <br />
                    · 보유기간: 7년 → 표1 공제율 14%
                    <br />
                    · 장기보유특별공제: 3억 × 14% = <strong>4,200만원</strong>
                    <br />
                    · 양도소득금액: 3억 − 4,200만 = 2억 5,800만원
                    <br />
                    · 기본공제 250만원 차감 후 과세표준: 2억 5,550만원
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 보유 7년만으로 양도차익의 14%인 4,200만원이 과세 대상에서 빠집니다.</span>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 2. 사업용 토지, 양도차익 2억원, 보유 15년</p>
                  <p className="text-sm text-text-secondary">
                    · 양도차익: 2억원
                    <br />
                    · 보유기간: 15년 → 표1 공제율 30% (상한)
                    <br />
                    · 장기보유특별공제: 2억 × 30% = <strong>6,000만원</strong>
                    <br />
                    · 양도소득금액: 2억 − 6,000만 = 1억 4,000만원
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 15년 이상 보유로 공제율이 상한 30%에 도달, 6,000만원이 공제됩니다.</span>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 3. 경계값, 양도차익 1억원, 보유 2년 11개월 vs 3년</p>
                  <p className="text-sm text-text-secondary">
                    · 보유 2년 11개월: 공제율 0% → 장기보유특별공제 <strong>0원</strong>
                    <br />
                    · 보유 3년(정확히 충족): 공제율 6% → 1억 × 6% = <strong>600만원</strong>
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 단 한 달 차이로 600만원 공제가 갈립니다. 3년이 임박했다면 매도 시점을 늦추는 것을 검토하세요.</span>
                  </p>
                </div>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">다주택자와 조정대상지역 주택은 어떻게 되나요</h2>
                <p>
                  일반적으로는 표1이 적용됩니다. 다주택자가 조정대상지역이 아닌 주택을 팔면 표1(연 2%, 최대 30%)로 장기보유특별공제를 받습니다. 문제는 조정대상지역 주택에 중과세율이 적용되는 경우로, 이때는 장기보유특별공제가 배제됩니다(소득세법 §95②, §104⑦).
                </p>
                <p className="mt-4">
                  다만 다주택 중과는 정부 정책에 따라 한시적으로 유예되거나 재적용되는 일이 반복돼 왔습니다. 양도 시점에 중과가 적용되는지, 그래서 장기보유특별공제가 배제되는지는 그 시점의 법령과 고시로 확정되므로, 매도 전에 국세청 상담 또는 세무사 검토를 반드시 거쳐야 합니다. 실질과세 원칙상 주택 수와 지역 판정은 실제 상황을 기준으로 하므로(국세기본법 §14), 서류상 명의만으로 안심해서는 안 됩니다.
                </p>
              </section>

              <section className="space-y-6 border-t border-border-base pt-8">
                <h2 className="text-2xl font-bold">공제가 아예 배제되는 자산</h2>
                <p>
                  모든 부동산이 장기보유특별공제 대상은 아닙니다. 다음 자산은 보유기간이 아무리 길어도 공제가 배제됩니다.
                </p>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li>
                    <strong>미등기 양도자산:</strong> 등기하지 않고 양도한 자산은 장기보유특별공제뿐 아니라 각종 감면에서도 배제되며 70% 세율이 적용됩니다(소득세법 §104③).
                  </li>
                  <li>
                    <strong>보유 3년 미만:</strong> 최소 보유 요건인 3년에 미달하면 공제율은 0%입니다.
                  </li>
                  <li>
                    <strong>국외 부동산:</strong> 해외 소재 부동산 양도는 장기보유특별공제 대상이 아닙니다(소득세법 §118의8).
                  </li>
                  <li>
                    <strong>조정대상지역 중과 대상 주택:</strong> 중과세율이 적용되면 공제가 배제될 수 있습니다(정책 변동 확인 필요).
                  </li>
                </ul>
                <p className="mt-4">
                  예외: 분양권은 실물 부동산이 아니어서 장기보유특별공제 대상이 아닙니다. 반면 재개발·재건축 조합원입주권은 원조합원의 종전 주택분 양도차익에 한해 표1이 적용되는 등 자산별 규정이 세분화돼 있으므로, 개별 사례는 국세청에 확인하세요.
                </p>
              </section>

              <h2 className="text-2xl font-bold mb-6">자주 묻는 질문</h2>
              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h3 className="text-lg font-semibold text-text-primary">관련 계산기 및 가이드</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link
                    href="/calculator/capital-gains-tax/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">양도소득세 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">양도차익과 보유기간을 넣어 세액을 계산해보세요.</p>
                  </Link>
                  <Link
                    href="/guide/long-term-holding-special-deduction-80-percent/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">1세대1주택 장기보유 80%</div>
                    <p className="mt-1 text-sm text-text-secondary">거주 요건을 갖춘 표2의 최대 80% 공제 계산.</p>
                  </Link>
                  <Link
                    href="/guide/capital-gains-necessary-expenses-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">양도세 필요경비 인정 항목</div>
                    <p className="mt-1 text-sm text-text-secondary">양도차익을 줄이는 필요경비를 먼저 챙기세요.</p>
                  </Link>
                  <Link
                    href="/guide/capital-gains-tax-5-steps/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">양도소득세 5단계 계산</div>
                    <p className="mt-1 text-sm text-text-secondary">양도차익부터 산출세액까지 전체 흐름.</p>
                  </Link>
                  <Link
                    href="/guide/self-farming-land-100-percent-exemption/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">8년 자경농지 감면</div>
                    <p className="mt-1 text-sm text-text-secondary">토지 양도 시 감면 한도까지 함께 검토.</p>
                  </Link>
                  <Link
                    href="/category/tax/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">모든 세금 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">양도세·취득세·상속세·종부세 모음.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 교육 목적으로 작성되었으며 개인 맞춤형 세무 조언이 아닙니다. 실제 장기보유특별공제 적용 여부, 공제율, 세액은 자산 종류·보유 경위·중과 여부에 따라 달라지므로 국세청 홈택스 또는 세무 전문가에게 확인하세요. 본 콘텐츠는 2026-08-19 기준이며 세법 개정 시 업데이트됩니다. 인용 법조항: <strong>소득세법 §95②(장기보유 특별공제), §103(양도소득기본공제), §104③⑦, §118의8, 국세기본법 §14(실질과세)</strong>. AI 보조 작성 후 운영자 검수 완료.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터(소득세법 §95)</a>,{' '}
                  <a href="https://www.nts.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">국세청(양도소득세)</a>,{' '}
                  <a href="https://hometax.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">홈택스 양도소득세 모의계산</a>.
                </p>
              </section>

              <ShareButtons
                title="장기보유특별공제 일반 표1 2026 가이드"
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
