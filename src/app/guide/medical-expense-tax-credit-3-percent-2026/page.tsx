import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { Footer } from '@/components/layout/Footer';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { AdSlot } from '@/components/ads/AdSlot';
import { FaqSection } from '@/components/calculator/FaqSection';
import {
  buildBreadcrumbJsonLd,
  buildArticleJsonLd,
  buildWebPageJsonLd,
  buildFaqPageJsonLd,
  buildSpeakableJsonLd,
} from '@/lib/seo/jsonld';

const URL = 'https://calculatorhost.com/guide/medical-expense-tax-credit-3-percent-2026/';
const DATE_PUBLISHED = '2026-05-26';
const DATE_MODIFIED = '2026-05-26';

export const metadata: Metadata = {
  title: '의료비 세액공제 2026 3% 초과분 15% 공제 700만 한도 | calculatorhost',
  description:
    '5월 종소세 신고! 의료비 세액공제 완벽 정리. 총급여 3% 초과분만 세액공제 대상, 공제율 15% (난임 30%), 한도 700만원 (본인·65세↑·6세↓·장애인 무한도). 공제 대상 의료비·보험금 차감 의무·한도 구분 + 시뮬 3가지',
  keywords: [
    '의료비 세액공제',
    '의료비 공제 한도',
    '의료비 3% 초과',
    '의료비 15% 공제',
    '의료비 세금',
    '난임 시술 30%',
    '안경 콘택트',
    '보청기 공제',
    '산후조리원',
    '의료비 보험금',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '의료비 세액공제 2026 3% 초과분 15% 공제 700만 한도 | calculatorhost' }],
    title: '의료비 세액공제 2026 — 3% 초과분 15% 공제, 700만 한도',
    description: '의료비 세액공제 정확한 계산법. 3% 초과분만 과세대상, 15% 공제율, 700만 한도 (단 본인·고령·6세 이하·장애인 무한도)',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '의료비 세액공제 — 3% 초과분 15% 공제',
    description: '총급여 3% 초과분만 세액공제 대상. 공제율 15% (난임 30%), 한도 700만원.',
  },
};

const FAQ_ITEMS = [
  {
    question: '의료비 세액공제가 정확히 뭐예요?',
    answer:
      '의료비 세액공제는 본인과 부양가족을 위해 지출한 의료비 중 총급여의 3% 초과분에 대해 15%를 세금에서 깎아주는 제도입니다(소득세법 §59의4, 조세특례제한법 §53). 세액공제는 계산된 세금에서 직접 차감되므로 소득공제보다 유리합니다.',
  },
  {
    question: '3% 초과분의 의미가 뭐예요?',
    answer:
      '예를 들어 총급여가 5,000만 원이면 3%는 150만 원입니다. 의료비가 300만 원이라면, 150만 원을 초과한 150만 원(=300만−150만)만 세액공제 대상입니다(조세특례제한법 §53 ①). 의료비가 150만 원 이하면 공제 대상이 아닙니다.',
  },
  {
    question: '보험금을 받았는데도 의료비 공제를 신청할 수 있나요?',
    answer:
      '네, 가능하지만 보험금을 차감하고 신청해야 합니다(소득세법 §59의4 ②). 의료비 500만 원을 지출했는데 실비보험에서 200만 원을 받았다면, 300만 원(=500만−200만)만 공제 신청 가능합니다.',
  },
  {
    question: '본인 의료비는 700만 한도가 없다고요?',
    answer:
      '네, 본인·배우자의 의료비는 한도가 없습니다(조세특례제한법 §53 ③). 6세 이하 자녀, 65세 이상 부양가족, 장애인도 한도가 없습니다. 나머지 부양가족의 의료비는 합산해서 700만 원 한도가 적용됩니다.',
  },
  {
    question: '난임 시술비는 30% 공제라고요?',
    answer:
      '네, 난임 진단 후 난임 시술비(시험관아기, 인공수정 등)는 일반 의료비보다 높은 30% 공제율이 적용됩니다(조세특례제한법 §53 ④). 3% 초과분만 대상이며, 한도는 없습니다.',
  },
  {
    question: '안경·콘택트렌즈도 공제되나요?',
    answer:
      '시력 교정용 안경·콘택트렌즈는 공제되지만 50만 원 한도입니다(소득세법 시행령 §118 ①). 미용 목적의 선글라스나 의료용이 아닌 안경은 공제 제외입니다.',
  },
  {
    question: '미용·성형은 정말 공제 안 되나요?',
    answer:
      '미용 목적의 성형수술은 공제 제외입니다(소득세법 시행령 §118). 다만 질병 치료 목적(예: 턱관절 교정)이라면 의료비로 인정될 수 있으므로 세무서에 사전 상담하세요.',
  },
  {
    question: '산후조리원은 얼마나 공제되나요?',
    answer:
      '산후조리원 비용은 200만 원 한도로 공제됩니다(조세특례제한법 §53 ②). 단, 총급여가 7,000만 원 초과면 공제 대상이 아닙니다. 출산 후 6주 이내 비용만 인정됩니다.',
  },
];

export default function MedicalExpenseTaxCredit3Percent2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '의료비 세액공제 2026 가이드' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '의료비 세액공제 2026 3% 초과분 15% 공제 완벽 가이드',
    description:
      '의료비 세액공제 정확한 계산법. 총급여 3% 초과분만 세액공제 대상, 공제율 15% (난임 30%), 한도 700만원 (본인·65세↑·6세↓·장애인 무한도). 공제 대상 의료비·보험금 차감·한도 구분·시뮬 3가지·신청 방법.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['의료비 세액공제', '3% 초과', '15% 공제', '700만 한도', '난임 시술'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '의료비 세액공제 2026 3% 초과분 15% 공제 완벽 가이드',
    description:
      '5월 종소세 신고! 의료비 세액공제 완벽 정리. 총급여 3% 초과분만 세액공제 대상(소득세법 §59의4), 공제율 15% (난임 시술 30%), 한도 700만원 (본인·65세↑·6세↓·장애인 무한도). 공제 대상 의료비 10가지·보험금 차감 의무·한도 구분·실제 시뮬 3가지·신청 방법 4단계·실질과세 주의사항.',
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
                    { name: '의료비 세액공제 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">세금 · 8분 읽기 · 2026-05-26</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  의료비 세액공제로 환급받기
                  <br />
                  <span className="text-2xl text-text-secondary">— 3% 초과분 15% 공제, 700만 한도 완벽 정리</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  5월 31일 종합소득세 신고 마감이 다가오면서 많은 사람이 놓치는 세액공제가 있습니다. 바로{' '}
                  <strong>의료비 세액공제</strong>입니다. 병원비, 약값, 안경, 보청기, 산후조리원 등 실제로 지출한 의료비를
                  신고하면 총급여의 3% 초과분에 대해 15%를 세금에서 깎아줍니다(소득세법 §59의4, 조세특례제한법 §53).
                  단순 공제가 아닌 <strong>"세액공제"</strong>이므로 환급 금액이 꽤 쏠쏠합니다. 이 페이지에서는
                  의료비 세액공제의 정의, 3% 초과분의 정확한 의미, 공제 대상 의료비, 한도 구분, 실제 시뮬레이션,
                  신청 방법, 주의사항을 완벽하게 정리합니다.
                </p>
              </header>

              <AdSlot slot="guide-medical-expense-credit-top" format="horizontal" />

              {/* 핵심 요약 */}
              <section aria-label="핵심 요약" className="card border-l-4 border-l-primary-500">
                <h2 className="mb-4 text-2xl font-bold text-primary-700 dark:text-primary-300">핵심 정리</h2>
                <div className="mb-4 overflow-x-auto">
                  <table className="w-full text-sm" data-speakable>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th className="px-3 py-2 text-left">항목</th>
                        <th className="px-3 py-2 text-left">내용</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="px-3 py-2 font-semibold">공제 기본</td>
                        <td className="px-3 py-2">
                          총급여 3% 초과분 × 15% (난임은 30%, 소득세법 §59의4)
                        </td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="px-3 py-2 font-semibold">공제 한도</td>
                        <td className="px-3 py-2">
                          일반: 700만원. 본인·65세↑·6세↓·장애인은 무한도 (조세특례제한법 §53 ③)
                        </td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="px-3 py-2 font-semibold">특수 한도</td>
                        <td className="px-3 py-2">
                          안경: 50만원, 산후조리원: 200만원 (소득 7천만 이하)
                        </td>
                      </tr>
                      <tr>
                        <td className="px-3 py-2 font-semibold">보험금 차감</td>
                        <td className="px-3 py-2">
                          실비보험 등 지급받은 보험금은 반드시 차감 후 신청 (소득세법 §59의4 ②)
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="rounded-lg bg-primary-500/10 p-4 text-sm text-primary-700 dark:text-primary-300">
                  <p className="font-semibold">TL;DR</p>
                  <ul className="mt-2 list-inside list-disc space-y-1">
                    <li>
                      <strong>공제 대상</strong>: 총급여 3% 초과한 의료비만 (예: 총급여 5천만 → 의료비 200만 이상)
                    </li>
                    <li>
                      <strong>공제율</strong>: 15% 기본 (난임 시술 30%, 미숙아·선천성 이상아 20%)
                    </li>
                    <li>
                      <strong>한도</strong>: 700만원 (본인·배우자·6세 이하·65세 이상·장애인 제외)
                    </li>
                    <li>
                      <strong>신청 경로</strong>: 홈택스 {'→'} 신고/납부 {'→'} 세액공제 {'→'} 의료비 입력
                    </li>
                  </ul>
                </div>
              </section>

              {/* 1. 의료비 세액공제 정의 및 법적 근거 */}
              <section className="space-y-4">
                <h2 className="text-2xl font-bold">1. 의료비 세액공제란? — 총급여 3% 초과분 15% 공제</h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  의료비 세액공제는 <strong>본인과 부양가족을 위해 지출한 의료비 중 일정 기준을 초과한 부분에 대해
                  세금에서 직접 깎아주는 제도</strong>입니다(소득세법 §59의4, 조세특례제한법 §53). 핵심은 <strong>"3%
                  초과분"</strong>이라는 조건입니다. 만약 총급여가 5,000만 원이고 의료비가 300만 원이라면, 150만 원(=총급여
                  3%)을 기준으로 초과한 150만 원(=300만−150만)만 15%로 공제되어 22만 5,000원을 환급받습니다.
                </p>

                <div className="rounded-lg bg-bg-card p-4">
                  <p className="mb-3 font-semibold text-text-primary">의료비 세액공제 vs 의료비 공제 (소득공제)</p>
                  <div className="space-y-2 text-sm text-text-secondary">
                    <div>
                      <strong>세액공제</strong> (이 페이지): 계산된 세금에서 직접 차감. 더 유리. 의료비·교육비·월세·기부금
                      등.
                    </div>
                    <div>
                      <strong>소득공제</strong>: 소득에서 차감한 후 세금 계산. 세액공제보다 효율 낮음. 예: 국민연금·건강보험
                      보험료.
                    </div>
                    <div className="mt-2 rounded bg-primary-500/10 p-2">
                      예: 세율 15%인 경우, 의료비 100만 공제면 세액공제는 15만 환급, 소득공제는 15만 환급. 하지만 소득
                      기준이 올라가면서 누진세율도 상승할 수 있으므로 세액공제가 더 유리합니다.
                    </div>
                  </div>
                </div>

                <p className="text-text-secondary leading-relaxed" data-speakable>
                  의료비 세액공제는 <strong>소득세법 §59의4</strong>와 <strong>조세특례제한법 §53</strong>에 따라
                  적용됩니다. 조세특례제한법은 일반적인 법(소득세법)에 특별한 혜택을 더하는 법이므로, 난임 시술·미숙아·선천성
                  이상아 등 특수 경우가 조세특례제한법에 명시되어 있습니다.
                </p>
              </section>

              {/* 2. 3% 초과분의 정확한 의미 */}
              <section className="space-y-4">
                <h2 className="text-2xl font-bold">2. "3% 초과분"의 정확한 의미 — 예시로 명확히</h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  의료비 세액공제에서 가장 헷갈리는 부분이 <strong>"총급여의 3% 초과분"</strong>입니다. 이는 다음을
                  의미합니다:
                </p>

                <div className="rounded-lg bg-bg-raised p-4 space-y-3 text-sm text-text-secondary">
                  <div>
                    <p className="font-semibold text-text-primary">공식</p>
                    <p className="mt-1 rounded bg-primary-500/10 p-2 font-mono">
                      공제 대상 의료비 = 실제 의료비 − (총급여 × 3%)
                    </p>
                  </div>
                  <div className="mt-4">
                    <p className="font-semibold text-text-primary mb-2">예시 1: 3% 초과한 경우</p>
                    <ul className="list-inside list-disc space-y-1">
                      <li>총급여: 4,000만원 → 3% = 120만원</li>
                      <li>실제 의료비: 300만원</li>
                      <li>공제 대상: 300만 − 120만 = <strong>180만원</strong></li>
                      <li>세액공제: 180만 × 15% = <strong>27만원 환급</strong></li>
                    </ul>
                  </div>
                  <div className="mt-4">
                    <p className="font-semibold text-text-primary mb-2">예시 2: 3% 이하인 경우</p>
                    <ul className="list-inside list-disc space-y-1">
                      <li>총급여: 4,000만원 → 3% = 120만원</li>
                      <li>실제 의료비: 100만원</li>
                      <li>공제 대상: 100만 − 120만 = <strong>음수 (공제 안 됨)</strong></li>
                      <li>세액공제: <strong>0원</strong></li>
                    </ul>
                  </div>
                </div>

                <div className="rounded-lg bg-highlight-500/10 p-4">
                  <p className="text-sm font-semibold text-highlight-700 dark:text-highlight-300">
                    중요: 의료비가 총급여 3% 이하면 환급 0원
                  </p>
                  <p className="mt-2 text-sm text-text-secondary">
                    총급여 5,000만 원이면 의료비 150만 원이 기준입니다. 의료비가 150만 원 이하면 세액공제 대상이 아닙니다.
                    많은 사람이 이를 간과하고 무조건 의료비 전체를 신청하려다가 서류 반려를 받습니다.
                  </p>
                </div>
              </section>

              {/* 3. 공제 대상 의료비 vs 제외 항목 */}
              <section className="space-y-4">
                <h2 className="text-2xl font-bold">3. 공제 대상 의료비 — 무엇을 신청할 수 있나</h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  의료비 세액공제 대상은 <strong>진정한 의료 필요성</strong>이 있는 지출만 인정됩니다(소득세법 시행령
                  §118). 다음은 공제 가능 항목과 제외 항목입니다.
                </p>

                <div className="overflow-x-auto rounded-lg bg-bg-raised p-4">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border-base">
                        <th className="px-3 py-2 text-left">항목</th>
                        <th className="px-3 py-2 text-left">공제 가능 여부</th>
                        <th className="px-3 py-2 text-left">특수 조건</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="px-3 py-2 font-semibold">병원·의원 진료비</td>
                        <td className="px-3 py-2">가능</td>
                        <td className="px-3 py-2">내과·외과·이비인후과 등 일반 진료</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="px-3 py-2 font-semibold">약국 약제비</td>
                        <td className="px-3 py-2">가능</td>
                        <td className="px-3 py-2">의사 처방 약품. 감기약·소화제 등</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="px-3 py-2 font-semibold">수술비·입원비</td>
                        <td className="px-3 py-2">가능</td>
                        <td className="px-3 py-2">질병 치료 목적의 수술</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="px-3 py-2 font-semibold">안경·콘택트</td>
                        <td className="px-3 py-2">가능 (50만원 한도)</td>
                        <td className="px-3 py-2">시력 교정용만. 선글라스 제외 (소득세법 시행령 §118 ①)</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="px-3 py-2 font-semibold">보청기</td>
                        <td className="px-3 py-2">가능</td>
                        <td className="px-3 py-2">청각 장애 진단 후 처방</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="px-3 py-2 font-semibold">의수족·휠체어</td>
                        <td className="px-3 py-2">가능</td>
                        <td className="px-3 py-2">장애인 등급 확인서 필요</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="px-3 py-2 font-semibold">산후조리원</td>
                        <td className="px-3 py-2">가능 (200만원 한도)</td>
                        <td className="px-3 py-2">총급여 7천만 이하, 출산 후 6주 이내 (조세특례제한법 §53 ②)</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="px-3 py-2 font-semibold">난임 시술</td>
                        <td className="px-3 py-2">가능 (30% 공제)</td>
                        <td className="px-3 py-2">한도 없음, 공제율 30% (조세특례제한법 §53 ④)</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="px-3 py-2 font-semibold">미용·성형수술</td>
                        <td className="px-3 py-2">제외</td>
                        <td className="px-3 py-2">
                          미용 목적. 단, 질병 치료(턱관절 교정) 시 세무서 판단 필요 (국세기본법 §14 실질과세)
                        </td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="px-3 py-2 font-semibold">건강검진·예방접종</td>
                        <td className="px-3 py-2">제외</td>
                        <td className="px-3 py-2">질병 예방 목적. 치료가 아님</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="px-3 py-2 font-semibold">한약·한의원</td>
                        <td className="px-3 py-2">가능</td>
                        <td className="px-3 py-2">의사 또는 한의사 진료 기반. 건강식품 제외</td>
                      </tr>
                      <tr>
                        <td className="px-3 py-2 font-semibold">건강식품·비타민</td>
                        <td className="px-3 py-2">제외</td>
                        <td className="px-3 py-2">의약품으로 분류되지 않음</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="rounded-lg bg-danger-500/10 p-4">
                  <p className="text-sm font-semibold text-danger-700 dark:text-danger-300">
                    금지: 의약분리 미신청
                  </p>
                  <p className="mt-2 text-sm text-text-secondary">
                    2017년 의약분리 이후 약국에서 구입한 약품은 <strong>의료비로 공제되지 않습니다</strong>. 의사 처방 후
                    약국에서 받은 약만 의료비입니다. 일반의약품(감기약·소화제)은 약사 진료 하에 구입한 것만 인정됩니다.
                  </p>
                </div>
              </section>

              {/* 4. 한도 구분 — 700만 vs 무한도 */}
              <section className="space-y-4">
                <h2 className="text-2xl font-bold">4. 한도 구분 — 700만원 vs 무한도</h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  의료비 세액공제 한도는 <strong>누가 의료비를 지출했느냐</strong>에 따라 다릅니다(조세특례제한법 §53 ③).
                  본인과 일부 가족은 한도가 없지만, 대부분 부양가족은 700만 원 합산 한도가 적용됩니다.
                </p>

                <div className="overflow-x-auto rounded-lg bg-bg-raised p-4">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border-base">
                        <th className="px-3 py-2 text-left">지출자</th>
                        <th className="px-3 py-2 text-left">공제 한도</th>
                        <th className="px-3 py-2 text-left">설명</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="px-3 py-2 font-semibold">본인</td>
                        <td className="px-3 py-2 font-bold text-primary-600">무한도</td>
                        <td className="px-3 py-2">소득자 본인 의료비는 한도 없음</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="px-3 py-2 font-semibold">배우자</td>
                        <td className="px-3 py-2 font-bold text-primary-600">무한도</td>
                        <td className="px-3 py-2">배우자 의료비도 한도 없음</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="px-3 py-2 font-semibold">6세 이하 자녀</td>
                        <td className="px-3 py-2 font-bold text-primary-600">무한도</td>
                        <td className="px-3 py-2">취학 전 아동은 한도 없음</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="px-3 py-2 font-semibold">65세 이상 부양가족</td>
                        <td className="px-3 py-2 font-bold text-primary-600">무한도</td>
                        <td className="px-3 py-2">고령 부양가족 한도 없음</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="px-3 py-2 font-semibold">장애인</td>
                        <td className="px-3 py-2 font-bold text-primary-600">무한도</td>
                        <td className="px-3 py-2">장애인 등급 1~6급 모두 한도 없음</td>
                      </tr>
                      <tr>
                        <td className="px-3 py-2 font-semibold">기타 부양가족 (7세~64세)</td>
                        <td className="px-3 py-2 font-bold text-danger-600">700만원</td>
                        <td className="px-3 py-2">
                          자녀·부모·형제 중 부양가족. 합산 700만원 한도 (소득세법 시행령 §118 ②)
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="rounded-lg bg-bg-card p-4">
                  <p className="mb-3 font-semibold text-text-primary">한도 적용 예시</p>
                  <div className="space-y-3 text-sm text-text-secondary">
                    <div>
                      <strong>예시: 본인 + 부양가족</strong>
                      <ul className="mt-1 list-inside list-disc ml-2">
                        <li>본인 의료비: 1,500만 (무한도) → 전액 공제</li>
                        <li>배우자 의료비: 500만 (무한도) → 전액 공제</li>
                        <li>
                          7살 자녀: 200만 (6세 초과, 700만 한도 적용) + 부모: 300만 = 500만 (700만 한도 내) → 전액
                          공제
                        </li>
                        <li>형: 300만 (부양가족, 700만 한도 적용) = 총 800만 → 700만만 공제, 100만 초과 제외</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              {/* 5. 보험금 차감 의무 */}
              <section className="space-y-4">
                <h2 className="text-2xl font-bold">5. 보험금 차감 의무 — 실비보험 받았다면</h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  실비 의료보험, 암보험, 입원 보험 등에서 보험금을 받았다면 <strong>반드시 의료비에서 차감</strong>해야
                  합니다(소득세법 §59의4 ②). 이는 실제 본인이 부담한 의료비만 공제하겠다는 원칙입니다(국세기본법 §14
                  실질과세).
                </p>

                <div className="rounded-lg bg-bg-card p-4">
                  <p className="mb-3 font-semibold text-text-primary">보험금 차감 공식</p>
                  <div className="rounded bg-primary-500/10 p-3 font-mono text-sm text-text-secondary">
                    세액공제 대상 의료비 = 실제 지출한 의료비 − 받은 보험금
                  </div>

                  <p className="mt-4 mb-3 font-semibold text-text-primary">예시</p>
                  <ul className="list-inside list-disc space-y-1 text-sm text-text-secondary">
                    <li>실제 의료비 지출: 1,000만원</li>
                    <li>실비보험 보험금 지급: 400만원</li>
                    <li>
                      세액공제 대상: 600만원(=1,000만−400만). 총급여 3% 초과분에 15% 적용.
                    </li>
                    <li>실수: 1,000만 × 15% = 150만 (불가)</li>
                    <li>정정: 600만 × 15% = 90만 (정답)</li>
                  </ul>
                </div>

                <div className="rounded-lg bg-highlight-500/10 p-4">
                  <p className="text-sm font-semibold text-highlight-700 dark:text-highlight-300">
                    팁: 보험금 증명서 첨부 필수
                  </p>
                  <p className="mt-2 text-sm text-text-secondary">
                    의료비 영수증과 함께 보험금 지급 증명서(보험회사 발급)를 첨부해야 합니다. 없으면 세무서가 보험금 차감을
                    확인할 수 없어서 서류 반려될 수 있습니다.
                  </p>
                </div>
              </section>

              {/* 6. 실제 시뮬레이션 3가지 */}
              <section className="space-y-4">
                <h2 className="text-2xl font-bold">6. 실제 시뮬레이션 3가지 — 환급액 정확히 계산</h2>

                <div className="rounded-lg bg-bg-raised p-4">
                  <p className="mb-3 font-semibold text-text-primary">사례 A: 총급여 4,000만 + 의료비 300만</p>
                  <div className="space-y-2 text-sm text-text-secondary">
                    <div>
                      <strong>상황</strong>: 2025년 의료비 300만원 지출 (보험금 없음)
                    </div>
                    <div>
                      <strong>계산 단계</strong>:
                      <ol className="list-inside list-decimal ml-2 mt-1">
                        <li>총급여 3%: 4,000만 × 3% = 120만원</li>
                        <li>초과분: 300만 − 120만 = 180만원</li>
                        <li>세액공제: 180만 × 15% = 27만원</li>
                      </ol>
                    </div>
                    <div className="mt-2 rounded bg-primary-500/10 p-2">
                      <strong>최종 환급</strong>: <strong>27만원</strong>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg bg-bg-raised p-4">
                  <p className="mb-3 font-semibold text-text-primary">사례 B: 총급여 6,000만 + 의료비 500만 + 보험금 100만</p>
                  <div className="space-y-2 text-sm text-text-secondary">
                    <div>
                      <strong>상황</strong>: 2025년 의료비 500만원 지출, 실비보험에서 100만원 지급
                    </div>
                    <div>
                      <strong>계산 단계</strong>:
                      <ol className="list-inside list-decimal ml-2 mt-1">
                        <li>보험금 차감: 500만 − 100만 = 400만원</li>
                        <li>총급여 3%: 6,000만 × 3% = 180만원</li>
                        <li>초과분: 400만 − 180만 = 220만원</li>
                        <li>세액공제: 220만 × 15% = 33만원</li>
                      </ol>
                    </div>
                    <div className="mt-2 rounded bg-primary-500/10 p-2">
                      <strong>최종 환급</strong>: <strong>33만원</strong>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg bg-bg-raised p-4">
                  <p className="mb-3 font-semibold text-text-primary">사례 C: 총급여 5,000만 + 난임 시술비 800만</p>
                  <div className="space-y-2 text-sm text-text-secondary">
                    <div>
                      <strong>상황</strong>: 난임 진단 후 시험관아기 시술비 800만원 (공제율 30%, 한도 없음)
                    </div>
                    <div>
                      <strong>계산 단계</strong>:
                      <ol className="list-inside list-decimal ml-2 mt-1">
                        <li>총급여 3%: 5,000만 × 3% = 150만원</li>
                        <li>초과분: 800만 − 150만 = 650만원</li>
                        <li>세액공제(30% 우대): 650만 × 30% = 195만원</li>
                        <li>한도: 난임 시술은 700만원 한도 없음 (조세특례제한법 §53 ④)</li>
                      </ol>
                    </div>
                    <div className="mt-2 rounded bg-primary-500/10 p-2">
                      <strong>최종 환급</strong>: <strong>195만원</strong> (일반 의료비 15% 대비 30% 우대)
                    </div>
                  </div>
                </div>
              </section>

              {/* 7. 신청 방법 */}
              <section className="space-y-4">
                <h2 className="text-2xl font-bold">7. 의료비 세액공제 신청 방법 — 홈택스 4단계</h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  의료비 세액공제는 홈택스(hometax.go.kr)에서 온라인으로 신청합니다. 신고서 작성 화면의 "세액공제"
                  항목에서 진행합니다.
                </p>

                <div className="rounded-lg bg-bg-card p-4">
                  <p className="mb-4 font-semibold text-text-primary">홈택스 신청 순서</p>
                  <div className="space-y-4">
                    <div className="flex gap-4">
                      <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary-500 text-white font-bold text-sm">
                        1
                      </div>
                      <div>
                        <p className="font-semibold text-text-primary">홈택스 로그인 {'→'} 신고/납부 메뉴</p>
                        <p className="mt-1 text-sm text-text-secondary">
                          공인인증서 또는 금융인증서로 로그인. 상단 메뉴 "신고/납부" 클릭.
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary-500 text-white font-bold text-sm">
                        2
                      </div>
                      <div>
                        <p className="font-semibold text-text-primary">소득세 {'→'} 종합소득세 신고 {'→'} 세액공제</p>
                        <p className="mt-1 text-sm text-text-secondary">
                          신고 양식 선택 후 "기타 세액공제" 또는 "의료비 세액공제" 항목 클릭.
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary-500 text-white font-bold text-sm">
                        3
                      </div>
                      <div>
                        <p className="font-semibold text-text-primary">의료비 내역 입력</p>
                        <p className="mt-1 text-sm text-text-secondary">
                          지출자 이름, 의료기관명, 지출 월, 금액, 의료비 종류(진료·약·수술 등) 입력. 여러 건은 추가 클릭.
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary-500 text-white font-bold text-sm">
                        4
                      </div>
                      <div>
                        <p className="font-semibold text-text-primary">증빙 서류 첨부 후 제출</p>
                        <p className="mt-1 text-sm text-text-secondary">
                          병원 영수증, 약국 영수증, 보험금 지급 증명서(필요시) PDF/JPG 첨부. 전자서명 후 제출.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg bg-highlight-500/10 p-4">
                  <p className="text-sm font-semibold text-highlight-700 dark:text-highlight-300">
                    증빙 서류 체크리스트
                  </p>
                  <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-text-secondary">
                    <li>의료기관 영수증 (병원·의원·약국)</li>
                    <li>보험금 지급 증명서 (실비보험, 암보험 등)</li>
                    <li>안경/보청기 구입 시: 검안 처방전</li>
                    <li>산후조리원: 출생증명서 + 조리원 영수증</li>
                    <li>난임 시술: 난임 진단서 + 시술 비용 영수증</li>
                  </ul>
                </div>
              </section>

              {/* 8. 주의사항 */}
              <section className="space-y-4">
                <h2 className="text-2xl font-bold">8. 주의사항 — 실질과세 원칙과 가짜 영수증</h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  의료비 세액공제는 합법적인 제도이지만, 잘못된 방식으로 신청하면 문제가 됩니다.
                </p>

                <div className="space-y-3">
                  <div className="rounded-lg bg-danger-500/10 p-4">
                    <p className="font-semibold text-danger-700 dark:text-danger-300">금지: 허위 의료비 신청</p>
                    <p className="mt-2 text-sm text-text-secondary">
                      없는 의료비, 가짜 영수증, 타인 명의 의료비를 신청하면 "실질과세 원칙"(국세기본법 §14)에 위배되어
                      가산세 20~40%가 부과됩니다. <strong>반드시 실제 지출 증명이 있는 의료비만 신청하세요.</strong>
                    </p>
                  </div>

                  <div className="rounded-lg bg-danger-500/10 p-4">
                    <p className="font-semibold text-danger-700 dark:text-danger-300">
                      주의: 보험금 미차감
                    </p>
                    <p className="mt-2 text-sm text-text-secondary">
                      보험금을 받았는데 신청서에 기재하지 않으면 나중에 세무서 조사 시 적발될 수 있습니다. 초기부터 정직하게
                      차감해서 신청하세요.
                    </p>
                  </div>

                  <div className="rounded-lg bg-danger-500/10 p-4">
                    <p className="font-semibold text-danger-700 dark:text-danger-300">
                      주의: 중복 신청 금지
                    </p>
                    <p className="mt-2 text-sm text-text-secondary">
                      같은 의료비를 경정청구와 기존 신고 시 중복으로 신청하면 안 됩니다. 경정청구는 누락한 항목만 추가하는
                      것입니다.
                    </p>
                  </div>

                  <div className="rounded-lg bg-highlight-500/10 p-4">
                    <p className="text-sm font-semibold text-highlight-700 dark:text-highlight-300">
                      팁: 미용 vs 치료 모호한 경우
                    </p>
                    <p className="mt-2 text-sm text-text-secondary">
                      성형수술이 미용인지 치료인지 애매하다면 세무서에 사전 상담(유선 또는 방문)을 받으세요. 국세청
                      홈택스 상담: 1577-0369. 사전 상담 후 신청하면 나중에 시비 위험이 줄어듭니다.
                    </p>
                  </div>
                </div>
              </section>

              {/* FAQ 섹션 */}
              <section className="space-y-4">
                <h2 className="text-2xl font-bold">자주 묻는 질문 (FAQ)</h2>
                <FaqSection items={FAQ_ITEMS} />
              </section>

              <AdSlot slot="guide-medical-expense-credit-mid" format="rectangle" />

              {/* 관련 계산기 및 가이드 */}
              <section className="space-y-4">
                <h2 className="text-2xl font-bold">관련 계산기 & 가이드</h2>
                <div className="space-y-2">
                  <Link
                    href="/calculator/salary/"
                    className="block rounded-lg border border-border-base bg-bg-card p-3 hover:bg-primary-500/5"
                  >
                    <p className="font-semibold text-primary-700 dark:text-primary-300">연봉 실수령액 계산기</p>
                    <p className="mt-1 text-sm text-text-secondary">
                      4대보험·소득세·지방소득세 자동 계산 및 월급 시뮬
                    </p>
                  </Link>
                  <Link
                    href="/calculator/freelancer-tax/"
                    className="block rounded-lg border border-border-base bg-bg-card p-3 hover:bg-primary-500/5"
                  >
                    <p className="font-semibold text-primary-700 dark:text-primary-300">프리랜서 종합소득세 계산기</p>
                    <p className="mt-1 text-sm text-text-secondary">
                      경비율 선택 및 세액공제 반영으로 실제 납부액 확인
                    </p>
                  </Link>
                  <Link
                    href="/guide/income-tax-correction-claim-5-year-2026/"
                    className="block rounded-lg border border-border-base bg-bg-card p-3 hover:bg-primary-500/5"
                  >
                    <p className="font-semibold text-primary-700 dark:text-primary-300">
                      경정청구로 5년 내 환급받기
                    </p>
                    <p className="mt-1 text-sm text-text-secondary">
                      지난 5년 누락한 공제로 환급받는 법. 의료비·교육비·월세 등 자주 누락되는 항목
                    </p>
                  </Link>
                  <Link
                    href="/guide/income-deduction-vs-tax-credit-2026/"
                    className="block rounded-lg border border-border-base bg-bg-card p-3 hover:bg-primary-500/5"
                  >
                    <p className="font-semibold text-primary-700 dark:text-primary-300">
                      소득공제 vs 세액공제 2026 완벽 가이드
                    </p>
                    <p className="mt-1 text-sm text-text-secondary">
                      어느 공제가 유리한지, 누진세 적용 순서 정리
                    </p>
                  </Link>
                  <Link
                    href="/guide/may-comprehensive-income-tax/"
                    className="block rounded-lg border border-border-base bg-bg-card p-3 hover:bg-primary-500/5"
                  >
                    <p className="font-semibold text-primary-700 dark:text-primary-300">
                      5월 종합소득세 신고 완벽 가이드
                    </p>
                    <p className="mt-1 text-sm text-text-secondary">
                      5월 31일 신고 마감 체크리스트, 누락 공제 점검, 환급 추적
                    </p>
                  </Link>
                </div>
              </section>

              {/* 면책조항 */}
              <section className="space-y-4 rounded-lg bg-bg-card p-4">
                <h3 className="text-sm font-semibold text-text-secondary">면책조항</h3>
                <p className="text-xs text-text-tertiary leading-relaxed">
                  본 페이지는 일반적인 정보 제공 목적이며, 세무 상담은 아닙니다. 개인의 상황에 따라 세율·공제 대상·환급액이
                  달라질 수 있습니다. 정확한 신고는 세무사·국세청 상담(1577-0369) 또는 홈택스를 통해 진행하세요.
                  조세특례제한법 및 소득세법의 개정으로 내용이 변경될 수 있으며, 최신 정보는 국세청(nts.go.kr)을 참조하세요.
                  <br />
                  <br />
                  이 페이지는 AI 보조 작성 후 운영자 검수를 거친 콘텐츠입니다.
                  <br />
                  마지막 업데이트: 2026-05-26
                </p>
              </section>
            </article>
          </main>
        </div>
        <Footer />
      </div>
    </>
  );
}
