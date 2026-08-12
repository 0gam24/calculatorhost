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

const URL = 'https://calculatorhost.com/guide/reconstruction-excess-profit-levy-2026/';
const DATE_PUBLISHED = '2026-08-11';
const DATE_MODIFIED = '2026-08-11';

export const metadata: Metadata = {
  title: '재건축부담금 2026 | 면제 8천만원·부과율 구간·계산법',
  description:
    '재건축초과이익환수제(재건축부담금)는 조합원 1인당 평균이익 8천만원 초과분에 10~50% 누진 부과율을 적용합니다. 면제 기준, 구간별 부과율, 1인당 부담금 계산 사례를 재건축초과이익 환수법 §12로 정리했습니다.',
  keywords: [
    '재건축부담금',
    '재건축초과이익환수제',
    '재건축부담금 면제 기준',
    '재건축부담금 계산',
    '재건축부담금 부과율',
    '재건축초과이익',
    '재건축초과이익 환수에 관한 법률 12조',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '재건축부담금 2026 면제 기준과 부과율 구간 계산법' }],
    title: '재건축부담금 2026 | 면제 8천만원·부과율 구간·계산법',
    description: '조합원 1인당 평균이익 8천만원 초과분에 10~50% 누진 부과. 구간별 부과율과 계산 사례 정리.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '재건축부담금 2026 면제 기준·부과율',
    description: '1인당 평균이익 8천만원 이하 면제, 초과분에 10~50% 누진. 재건축초과이익 환수법 §12.',
  },
};

const FAQ_ITEMS = [
  {
    question: '재건축부담금은 얼마부터 내나요?',
    answer:
      '조합원 1인당 평균이익이 8천만원을 초과할 때부터 부과됩니다(재건축초과이익 환수에 관한 법률 §12). 즉 1인당 평균이익이 8천만원 이하면 면제입니다. 8천만원을 넘는 부분(초과분)에만 부과율이 적용되며, 초과 정도에 따라 10%부터 50%까지 누진적으로 올라갑니다.',
  },
  {
    question: '부과율 구간은 어떻게 되나요?',
    answer:
      '1인당 평균이익 기준으로 8천만원 이하 면제, 8천만원 초과 1억3천만원 이하는 초과분의 10%, 1억3천만원 초과 1억8천만원 이하는 500만원+초과분 20%, 1억8천만원 초과 2억3천만원 이하는 1,500만원+초과분 30%, 2억3천만원 초과 2억8천만원 이하는 3,000만원+초과분 40%, 2억8천만원 초과는 5,000만원+초과분 50%입니다.',
  },
  {
    question: '재건축초과이익은 어떻게 산정하나요?',
    answer:
      '재건축초과이익은 준공 시점 주택가액에서 개시 시점 주택가액, 그 기간의 정상주택가격 상승분, 개발비용을 뺀 금액입니다. 이 초과이익을 조합원 수로 나눈 1인당 평균이익에 부과율을 적용해 1인당 부담금을 정하고, 이를 조합원 수만큼 합해 재건축부담금 총액이 됩니다.',
  },
  {
    question: '1주택 장기보유자는 감면을 받나요?',
    answer:
      '네, 1세대 1주택자로 해당 주택을 장기간 보유한 경우 보유 기간에 따라 부담금을 감면받을 수 있으며, 장기 보유자는 최대 70%까지 감면이 적용될 수 있습니다. 다만 구체적 감면율과 요건은 개정 법령에 따라 달라지므로, 정확한 적용은 국토교통부와 관할 지자체에서 확인해야 합니다.',
  },
  {
    question: '부담금은 언제, 누가 부과하나요?',
    answer:
      '부과권자는 관할 시장·군수·구청장입니다. 조합설립인가 이후 부담금 예정액이 통지되고, 준공(준공인가 등) 이후 초과이익이 확정되면 부과 절차가 진행됩니다. 예정액은 사업 진행 중 참고용 추정치이며, 실제 부담금은 준공 시점 가격으로 확정됩니다.',
  },
  {
    question: '재건축부담금과 양도소득세는 중복 부담인가요?',
    answer:
      '성격이 다른 별개의 부담입니다. 재건축부담금은 재건축으로 생긴 초과이익을 환수하는 부담금이고, 양도소득세는 나중에 주택을 팔 때 양도차익에 매기는 세금입니다. 다만 이미 부담금으로 환수된 부분은 이후 양도차익 계산에서 취득가액·필요경비 등으로 고려될 수 있으므로, 매도 시 세무 상담이 필요합니다.',
  },
  {
    question: '재개발에도 재건축부담금이 있나요?',
    answer:
      '아니요, 재건축초과이익환수제는 재건축사업에 적용되는 제도입니다. 재개발사업에는 이 부담금이 부과되지 않습니다. 다만 재개발에는 정비사업 특유의 분담금·청산금 구조가 있으므로, 본인 사업이 재건축인지 재개발인지 먼저 확인해야 합니다.',
  },
  {
    question: '고령자는 부담금 납부를 미룰 수 있나요?',
    answer:
      '1세대 1주택 고령자 등 일정 요건을 갖춘 경우, 해당 주택을 팔거나 상속·증여할 때까지 부담금 납부를 유예받을 수 있는 제도가 있습니다. 유예는 납부 시점을 미루는 것이지 면제가 아니므로, 유예 요건과 이자 여부는 관할 지자체에 확인하세요.',
  },
];

export default function ReconstructionExcessProfitLevy2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '재건축부담금 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '재건축부담금 2026, 면제 기준·부과율 구간·계산법 총정리',
    description:
      '재건축초과이익환수제 재건축부담금 계산법. 1인당 평균이익 8천만원 면제 기준, 10~50% 누진 부과율 구간, 1인당 부담금 계산 사례를 재건축초과이익 환수법 §12로 정리.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['재건축부담금', '재건축초과이익환수제', '부과율', '면제 기준', '재건축'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '재건축부담금 2026',
    description:
      '재건축초과이익환수제 부담금의 면제 기준과 부과율 구간, 1인당 부담금 계산법을 정리한 실전 가이드.',
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
                    { name: '재건축부담금 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">재건축 조합원 · 8분 읽기 · 2026-08-11</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  재건축부담금 2026
                  <br />
                  <span className="text-2xl text-text-secondary">면제 기준·부과율 구간·계산법</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  재건축을 앞둔 조합원이라면 준공 뒤 얼마의 부담금을 낼지 미리 가늠하는 것이 중요합니다. 재건축초과이익환수제(재건축부담금)는 조합원 1인당 평균이익이 8천만원을 넘을 때부터 초과분에 10~50% 누진 부과율을 적용합니다. 이 가이드는 재건축초과이익 환수법 §12를 근거로 면제 기준, 구간별 부과율, 1인당 부담금 계산 사례를 정리합니다.
                </p>
              </header>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">재건축부담금이란 무엇인가요?</h2>
                <p>
                  재건축부담금은 재건축사업으로 조합원에게 돌아간 초과이익 중 일부를 국가가 환수하는 부담금입니다. 근거 법령은 「재건축초과이익 환수에 관한 법률」이며, 부과율과 산정 방식은 §12에 규정돼 있습니다. 초과이익 전액이 아니라 8천만원을 넘는 부분에만 부과율이 붙는 점이 핵심입니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">핵심 공식</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    재건축초과이익 = 준공 시점 주택가액 − (개시 시점 주택가액 + 정상주택가격 상승분 + 개발비용)
                    <br />
                    1인당 평균이익 = 재건축초과이익 / 조합원 수
                    <br />
                    재건축부담금(총액) = 1인당 부담금 × 조합원 수
                  </p>
                </div>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">부과율 구간은 어떻게 되나요?</h2>
                <p>
                  1인당 평균이익을 기준으로 6개 구간에 걸쳐 누진 적용됩니다. 8천만원 이하는 면제이고, 초과할수록 초과분에 대한 부과율이 10%에서 50%까지 올라갑니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 재건축부담금 부과율 구간 (재건축초과이익 환수법 §12)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">1인당 평균이익</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">부담금</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">8천만원 이하</td>
                        <td className="p-3">면제</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">8천만원 초과 1억3천만원 이하</td>
                        <td className="p-3">초과분의 10%</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">1억3천만원 초과 1억8천만원 이하</td>
                        <td className="p-3">500만원 + 초과분의 20%</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">1억8천만원 초과 2억3천만원 이하</td>
                        <td className="p-3">1,500만원 + 초과분의 30%</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">2억3천만원 초과 2억8천만원 이하</td>
                        <td className="p-3">3,000만원 + 초과분의 40%</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">2억8천만원 초과</td>
                        <td className="p-3">5,000만원 + 초과분의 50%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p>
                  다만 여기서 초과분은 각 구간의 하한을 넘는 금액을 뜻합니다. 예컨대 1억5천만원이면 1억3천만원을 넘는 2천만원이 20% 부과 대상이고, 앞 구간 몫인 500만원이 더해집니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">1인당 부담금은 얼마인가요? 계산 사례</h2>
                <p>
                  구간별로 어떻게 달라지는지 1인당 평균이익별 사례로 확인해 보겠습니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3">
                  <p className="font-semibold text-text-primary">사례 1. 1인당 평균이익 7천만원</p>
                  <p className="text-sm text-text-secondary">
                    · 8천만원 이하이므로 <strong>면제(0원)</strong>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3">
                  <p className="font-semibold text-text-primary">사례 2. 1인당 평균이익 1억원</p>
                  <p className="text-sm text-text-secondary">
                    · 초과분: 1억 − 8천만 = 2천만원
                    <br />
                    · 부담금: 2천만 × 10% = <strong>200만원</strong>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3">
                  <p className="font-semibold text-text-primary">사례 3. 1인당 평균이익 1억5천만원</p>
                  <p className="text-sm text-text-secondary">
                    · 구간: 1억3천만원 초과 1억8천만원 이하(500만원 + 초과분 20%)
                    <br />
                    · 초과분: 1억5천만 − 1억3천만 = 2천만원
                    <br />
                    · 부담금: 500만 + (2천만 × 20%) = 500만 + 400만 = <strong>900만원</strong>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3">
                  <p className="font-semibold text-text-primary">사례 4. 1인당 평균이익 3억원</p>
                  <p className="text-sm text-text-secondary">
                    · 구간: 2억8천만원 초과(5,000만원 + 초과분 50%)
                    <br />
                    · 초과분: 3억 − 2억8천만 = 2천만원
                    <br />
                    · 부담금: 5,000만 + (2천만 × 50%) = 5,000만 + 1,000만 = <strong>6,000만원</strong>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3">
                  <p className="font-semibold text-text-primary">사례 5. 경계값 점검</p>
                  <p className="text-sm text-text-secondary">
                    · 1인당 평균이익 8천만원(기준선): <strong>면제</strong>
                    <br />
                    · 1인당 평균이익 8천1만원: 초과분 1만원 × 10% = <strong>1천원</strong>(부과 대상 진입)
                    <br />
                    <span className="text-xs text-text-tertiary">문턱을 넘어도 초과분이 작으면 부담금도 작습니다. 전체 이익이 아니라 초과분에만 부과율이 적용됩니다.</span>
                  </p>
                </div>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">부담금은 언제 확정되고 감면은 어떻게 받나요?</h2>
                <p>
                  부과권자는 관할 시장·군수·구청장이며, 조합설립인가 후 부담금 예정액이 통지되고 준공 이후 초과이익이 확정되어 부과됩니다. 예정액은 사업 중 참고용 추정치일 뿐, 실제 부담금은 준공 시점 주택가격으로 정해집니다.
                </p>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li><strong>1세대 1주택 장기보유 감면:</strong> 보유 기간에 따라 감면되며, 장기 보유자는 최대 70%까지 감면될 수 있습니다(개정 법령 기준, 구체적 요건은 국토교통부 확인).</li>
                  <li><strong>고령자 납부유예:</strong> 1세대 1주택 고령자 등은 매도·상속·증여 시점까지 납부를 미룰 수 있습니다.</li>
                  <li><strong>예정액과 확정액 차이:</strong> 시세 변동에 따라 예정액보다 확정액이 크게 달라질 수 있으므로, 예정액만 믿고 자금계획을 세우면 안 됩니다.</li>
                </ul>
                <p>
                  다만 감면·유예는 요건이 까다롭고 개정이 잦으므로, 조합 사무실과 관할 지자체, 국토교통부 자료로 본인 사업의 최신 기준을 반드시 확인하세요.
                </p>
              </section>

              <h2 className="text-2xl font-bold mb-6">자주 묻는 질문</h2>
              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h3 className="text-lg font-semibold text-text-primary">관련 계산기 및 가이드</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link
                    href="/guide/redevelopment-membership-right-capital-gains-tax-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">조합원 입주권 양도세</div>
                    <p className="mt-1 text-sm text-text-secondary">입주권 매도 시 양도세 계산 구조를 확인하세요.</p>
                  </Link>
                  <Link
                    href="/guide/presale-right-capital-gains-tax/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">분양권 양도세</div>
                    <p className="mt-1 text-sm text-text-secondary">분양권과 입주권의 세금 차이를 비교하세요.</p>
                  </Link>
                  <Link
                    href="/calculator/capital-gains-tax/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">양도소득세 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">준공 후 매도 시 양도세를 미리 계산해 보세요.</p>
                  </Link>
                  <Link
                    href="/guide/comprehensive-real-estate-tax-calculation-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">종합부동산세 계산</div>
                    <p className="mt-1 text-sm text-text-secondary">재건축 후 보유세 부담까지 함께 점검하세요.</p>
                  </Link>
                  <Link
                    href="/guide/long-term-holding-special-deduction-80-percent/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">장기보유특별공제 80%</div>
                    <p className="mt-1 text-sm text-text-secondary">1주택 장기보유 시 양도세 절세 구조.</p>
                  </Link>
                  <Link
                    href="/category/tax/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">부동산 세금 모음</div>
                    <p className="mt-1 text-sm text-text-secondary">양도세·취득세·보유세 가이드 한곳에서.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 교육 목적으로 작성되었으며 개인 맞춤형 세무·법률 자문이 아닙니다. 재건축부담금은 준공 시점 주택가격과 사업별 개발비용, 감면 요건에 따라 크게 달라지므로, 실제 부담금은 조합과 관할 지자체, 국토교통부 자료로 확인해야 합니다. 인용 법령은 <strong>재건축초과이익 환수에 관한 법률 §12</strong>입니다. 본 콘텐츠는 2026-08-11 기준이며 법령 개정 시 업데이트됩니다. AI 보조 작성 후 운영자 검수 완료.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터</a>,{' '}
                  <a href="https://easylaw.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">찾기쉬운 생활법령정보</a>,{' '}
                  <a href="https://www.molit.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">국토교통부</a>.
                </p>
              </section>

              <ShareButtons
                title="재건축부담금 2026 가이드"
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
