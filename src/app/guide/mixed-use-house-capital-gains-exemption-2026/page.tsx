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

const URL = 'https://calculatorhost.com/guide/mixed-use-house-capital-gains-exemption-2026/';
const DATE_PUBLISHED = '2026-07-29';
const DATE_MODIFIED = '2026-07-29';

export const metadata: Metadata = {
  title: '상가주택 양도세 2026, 겸용주택 1세대1주택 비과세 판정',
  description:
    '주택과 상가가 한 건물에 있는 겸용주택은 실거래가 12억 이하이고 주택 면적이 상가보다 크면 전부 주택으로 봐 비과세됩니다. 12억 초과 고가겸용주택은 2022년부터 주택 부분만 주택으로 봅니다. 소득세법 시행령 §154·§160 기준으로 정리했습니다.',
  keywords: [
    '겸용주택 양도세',
    '상가주택 양도소득세',
    '겸용주택 1세대1주택',
    '주택 면적 판정',
    '고가겸용주택 12억',
    '상가주택 비과세',
    '소득세법 시행령 154조',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '상가주택 양도세 2026, 겸용주택 1세대1주택 비과세 판정' }],
    title: '상가주택 겸용주택 양도세 비과세 판정 2026',
    description: '12억 이하는 면적 비교, 12억 초과는 주택 부분만. 소득세법 시행령 §154·§160으로 정리.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '상가주택 양도세 2026, 겸용주택 비과세 판정',
    description: '주택 면적이 상가보다 크면 전부 주택, 12억 초과는 주택 부분만. 소득세법 시행령 기준.',
  },
};

const FAQ_ITEMS = [
  {
    question: '상가주택(겸용주택)은 양도세를 어떻게 판정하나요?',
    answer:
      '실거래가가 12억원 이하이면 주택 면적과 상가 면적을 비교합니다. 주택 연면적이 상가 연면적보다 크면 건물 전부를 주택으로 봐 1세대1주택 비과세를 적용합니다(소득세법 시행령 §154③). 주택 면적이 상가 면적보다 작거나 같으면 주택 부분만 주택으로 보고 상가 부분은 과세합니다.',
  },
  {
    question: '주택 면적이 상가보다 작으면 어떻게 되나요?',
    answer:
      '주택 부분만 주택으로 보고 나머지 상가 부분은 일반 양도로 과세됩니다. 즉 건물을 주택분과 상가분으로 나누어 주택분에만 1세대1주택 비과세를 적용하고, 상가분에는 보유·거주 요건과 관계없이 양도소득세가 부과됩니다. 부수토지도 주택분과 상가분으로 안분합니다.',
  },
  {
    question: '실거래가 12억을 넘으면 왜 불리해지나요?',
    answer:
      '2022년 1월 1일 이후 양도분부터는 실거래가 12억원을 초과하는 고가겸용주택의 경우 면적 비교와 무관하게 주택 부분만 주택으로 보기 때문입니다. 과거에는 주택 면적이 더 크면 상가까지 전부 주택으로 봤지만, 지금은 12억을 넘으면 상가 부분이 무조건 과세되어 세부담이 커집니다.',
  },
  {
    question: '고가주택 12억 기준은 무엇으로 판단하나요?',
    answer:
      '건물 전체가 아니라 주택 부분의 양도가액만으로 판단합니다(소득세법 시행령 §160). 겸용주택에서 상가를 뺀 주택분 실거래가가 12억원을 넘는지를 보므로, 건물 전체 가격이 12억을 넘더라도 주택분이 12억 이하이면 고가주택으로 보지 않습니다.',
  },
  {
    question: '1세대1주택 비과세 자체 요건은 무엇인가요?',
    answer:
      '겸용주택이라도 1세대1주택 비과세를 받으려면 기본 요건을 갖춰야 합니다(소득세법 §89, 시행령 §154). 원칙적으로 2년 이상 보유해야 하고, 취득 당시 조정대상지역이었다면 2년 이상 거주 요건이 추가됩니다. 이 요건을 못 갖추면 주택 부분도 과세됩니다.',
  },
  {
    question: '주택 면적에는 무엇이 포함되나요?',
    answer:
      '주거로 사용하는 부분의 연면적을 기준으로 합니다. 지하실, 계단 등 공용 부분은 실제 사용 용도에 따라 주택분과 상가분으로 안분하는 것이 원칙입니다. 무허가·불법 용도변경 부분은 사실상 사용 현황으로 판단하므로, 등기상 면적과 실제 사용 면적이 다르면 다툼이 생길 수 있습니다.',
  },
  {
    question: '고가겸용주택도 장기보유특별공제를 받나요?',
    answer:
      '주택으로 인정되는 부분에 대해서는 12억 초과분 과세 시 장기보유특별공제를 적용받을 수 있습니다. 다만 상가로 과세되는 부분은 1세대1주택용 표(최대 80%)가 아니라 일반 장기보유특별공제가 적용됩니다. 부분별로 공제율이 달라지므로 정확한 계산은 세무대리인과 확인하세요.',
  },
  {
    question: '건물을 주택으로만 용도변경하면 유리한가요?',
    answer:
      '주택 면적을 늘리면 12억 이하 구간에서는 전부 주택으로 인정받아 유리해질 수 있습니다. 다만 용도변경 후 보유·거주 기간 요건을 다시 따져야 하고, 12억을 초과하면 면적과 무관하게 주택 부분만 인정되므로 효과가 제한됩니다. 양도 시점과 가액을 함께 고려해 판단해야 합니다.',
  },
];

export default function MixedUseHouseCapitalGainsExemption2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '상가주택 양도세 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '상가주택 양도세 2026, 겸용주택 1세대1주택 비과세 판정',
    description:
      '겸용주택(상가주택)의 1세대1주택 비과세 판정 기준. 12억 이하 면적 비교, 12억 초과 고가겸용주택 주택분만 인정 규칙을 소득세법 시행령 §154·§160 기준으로 정리.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['겸용주택', '상가주택', '양도소득세', '1세대1주택', '고가주택'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '상가주택 양도세 2026',
    description:
      '겸용주택의 양도세 비과세 판정 기준과 12억 초과 규칙을 정리한 상가주택 소유자 가이드.',
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
                    { name: '상가주택 양도세 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">상가주택 소유자 · 8분 읽기 · 2026-07-29</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  상가주택 양도세 2026
                  <br />
                  <span className="text-2xl text-text-secondary">겸용주택 1세대1주택 비과세 판정</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  이 가이드는 1층에 가게, 위층에 집이 있는 이른바 상가주택을 팔려는 소유자를 위한 것입니다. 같은 건물이라도 주택과 상가가 섞여 있으면 양도세 비과세 판정이 까다롭고, 2022년 개정으로 규칙이 크게 바뀌었습니다. 주택 면적과 상가 면적을 어떻게 비교하는지, 실거래가 12억원을 넘으면 무엇이 달라지는지, 소득세법 시행령 조항과 함께 정리합니다.
                </p>
              </header>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">상가주택은 양도세를 어떻게 판정하나요?</h2>
                <p>
                  실거래가 12억원 이하이면 주택 면적과 상가 면적을 비교해 판정합니다. 주택 연면적이 상가 연면적보다 크면 건물 전부를 주택으로 봐 1세대1주택 비과세를 적용하고, 주택 면적이 상가보다 작거나 같으면 주택 부분만 주택으로 봅니다(소득세법 시행령 §154③).
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 겸용주택 양도세 판정 기준 (2022년 이후 양도분)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">실거래가</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">면적 조건</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">주택으로 보는 범위</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">12억원 이하</td>
                        <td className="p-3">주택 면적 &gt; 상가 면적</td>
                        <td className="p-3"><strong>건물 전부</strong></td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">12억원 이하</td>
                        <td className="p-3">주택 면적 ≤ 상가 면적</td>
                        <td className="p-3">주택 부분만</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">12억원 초과</td>
                        <td className="p-3">면적 비교 무관</td>
                        <td className="p-3">주택 부분만</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  다만 이 표는 1세대1주택 비과세 요건(2년 보유 등)을 이미 갖췄다는 전제입니다. 요건을 못 갖추면 주택 부분도 과세되므로, 면적 판정 이전에 보유·거주 요건부터 확인해야 합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">실거래가 12억을 넘으면 왜 불리해지나요?</h2>
                <p>
                  2022년 1월 1일 이후 양도분부터 실거래가 12억원을 초과하는 고가겸용주택은 면적 비교와 무관하게 주택 부분만 주택으로 보기 때문입니다. 예전에는 주택 면적이 크면 상가까지 통째로 주택으로 인정받았지만, 지금은 상가 부분이 무조건 과세됩니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">개정 전후 비교</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    · 개정 전: 주택 면적 &gt; 상가 면적이면 고가여도 전부 주택 인정
                    <br />
                    · 개정 후(2022~): 12억 초과 시 면적 무관, 주택 부분만 인정
                    <br />
                    · 효과: 12억 초과 상가주택은 상가분이 항상 과세되어 세부담 증가
                  </p>
                </div>
                <p className="mt-4">
                  다만 12억 이하 구간에서는 여전히 면적 비교 규칙이 유지됩니다. 즉 규칙이 강화된 대상은 어디까지나 고가겸용주택입니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">고가주택 12억 기준은 무엇으로 판단하나요?</h2>
                <p>
                  건물 전체가 아니라 주택 부분의 양도가액만으로 판단합니다(소득세법 시행령 §160). 겸용주택에서 상가를 뺀 주택분 실거래가가 12억원을 넘는지를 보므로, 건물 전체가 12억을 넘어도 주택분이 12억 이하이면 고가주택으로 보지 않습니다.
                </p>
                <p className="mt-4">
                  예외: 반대로 상가분을 빼도 주택분만으로 12억을 넘으면 고가겸용주택에 해당해, 12억 초과분에 대해 양도세가 과세됩니다. 이때는 12억 이하 양도차익은 비과세, 초과분만 과세하는 고가주택 계산 방식이 적용됩니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">사례로 보는 겸용주택 판정</h2>
                <p>
                  다음 사례로 면적과 가액에 따라 판정이 어떻게 달라지는지 살펴보겠습니다. 실제 세액은 취득가·보유기간·공제에 따라 달라집니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 1. 실거래가 9억, 주택 70㎡ / 상가 50㎡</p>
                  <p className="text-sm text-text-secondary">
                    · 실거래가 12억 이하, 주택 면적(70) &gt; 상가 면적(50)
                    <br />
                    · 판정: 건물 <strong>전부 주택</strong>으로 인정
                    <br />
                    · 결과: 2년 보유 등 요건 충족 시 전액 비과세
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 12억 이하이고 주택이 더 크면 상가까지 비과세됩니다.</span>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 2. 실거래가 9억, 주택 50㎡ / 상가 70㎡</p>
                  <p className="text-sm text-text-secondary">
                    · 실거래가 12억 이하, 주택 면적(50) ≤ 상가 면적(70)
                    <br />
                    · 판정: <strong>주택 부분만</strong> 주택, 상가 부분 과세
                    <br />
                    · 결과: 주택분 비과세, 상가분 양도소득세 부과
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 상가가 더 크면 상가분은 과세됩니다.</span>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 3. 실거래가 15억, 주택 80㎡ / 상가 40㎡</p>
                  <p className="text-sm text-text-secondary">
                    · 실거래가 12억 초과(고가겸용주택), 주택이 더 크지만 면적 무관
                    <br />
                    · 판정: <strong>주택 부분만</strong> 주택으로 인정
                    <br />
                    · 결과: 상가분 과세, 주택분도 12억 초과분은 과세
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 12억을 넘으면 주택이 더 커도 상가분이 과세됩니다.</span>
                  </p>
                </div>
              </section>

              <section className="space-y-6 border-t border-border-base pt-8" data-speakable>
                <h2 className="text-2xl font-bold">부수토지는 어떻게 나누나요?</h2>
                <p>
                  건물에 딸린 토지도 주택분과 상가분으로 안분합니다. 주택으로 인정되는 부분의 부수토지에만 비과세가 적용됩니다.
                </p>
                <p className="mt-4">
                  주택 부수토지로 인정되는 면적에는 한도가 있습니다. 통상 도시지역은 주택 정착면적의 일정 배수, 도시지역 밖은 그보다 넓은 배수까지 인정됩니다. 다만 지역·용도지역에 따라 배율이 다르고 개정될 수 있으므로, 정확한 부수토지 한도는 국세청 또는 세무대리인을 통해 확인하세요.
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
                    <p className="mt-1 text-sm text-text-secondary">취득가·양도가를 입력해 세액을 계산해보세요.</p>
                  </Link>
                  <Link
                    href="/guide/one-household-12-billion-exemption/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">1세대1주택 12억 비과세</div>
                    <p className="mt-1 text-sm text-text-secondary">12억 초과분만 과세되는 고가주택 계산법.</p>
                  </Link>
                  <Link
                    href="/guide/long-term-holding-special-deduction-80-percent/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">장기보유특별공제 80%</div>
                    <p className="mt-1 text-sm text-text-secondary">보유·거주 기간별 최대 80% 공제 구조.</p>
                  </Link>
                  <Link
                    href="/guide/capital-gains-necessary-expenses-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">양도세 필요경비</div>
                    <p className="mt-1 text-sm text-text-secondary">취득가·자본적지출·양도비 공제 범위.</p>
                  </Link>
                  <Link
                    href="/guide/officetel-tax-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">오피스텔 세금</div>
                    <p className="mt-1 text-sm text-text-secondary">주거용·업무용에 따라 달라지는 세금.</p>
                  </Link>
                  <Link
                    href="/category/real-estate/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">부동산 가이드 모음</div>
                    <p className="mt-1 text-sm text-text-secondary">양도·취득·임대차 관련 가이드.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 교육 목적으로 작성되었으며, 개인 맞춤형 세무 조언이 아닙니다. 겸용주택의 면적 안분, 부수토지 한도, 용도변경 효과는 사안별로 다르고 다툼의 소지가 있으므로, 실제 양도 전 관할 세무서 또는 세무대리인과 상담하세요. 본 콘텐츠는 2026-07-29 기준이며, 관련 법령은 소득세법 <strong>§89(비과세 양도소득), §95(장기보유특별공제)</strong>, 시행령 <strong>§154(1세대1주택의 범위), §160(고가주택)</strong>을 따릅니다. AI 보조 작성 후 운영자 검수 완료.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.nts.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">국세청</a>,{' '}
                  <a href="https://www.hometax.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">홈택스(양도소득세)</a>,{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터</a>.
                </p>
              </section>

              <ShareButtons
                title="상가주택 겸용주택 양도세 비과세 판정 2026 가이드"
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