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

const URL = 'https://calculatorhost.com/guide/insurance-premium-tax-credit-2026/';
const DATE_PUBLISHED = '2026-07-07';
const DATE_MODIFIED = '2026-07-07';

export const metadata: Metadata = {
  title: '보장성보험료 세액공제 2026 | 100만원 한도·12% 공제',
  description:
    '보장성보험료 세액공제(소득세법 §59의4)의 한도·공제율·대상보험을 정리했습니다. 일반 100만원/12%, 장애인 100만원/15% 한도. 연말정산 필수 서류 안내.',
  keywords: [
    '보장성보험료 세액공제',
    '보험료 세액공제',
    '소득세법 59조의4',
    '연말정산 공제',
    '보장성보험 한도',
    '보험료 공제율',
    '장애인보험료',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '보장성보험료 세액공제 2026 | 100만원 한도·12% 공제' }],
    title: '보장성보험료 세액공제 2026 — 연말정산 100만원 한도 완벽 정리',
    description: '기본공제대상자를 피보험자로 하는 보장성보험(손해보험·상해·질병·종신·화재)의 보험료 12% 공제. 한도·구간·필요 서류까지 한눈에.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '보장성보험료 세액공제 2026 — 100만원/12% 한도 정확히',
    description: '보장성보험료 세액공제의 대상, 한도, 공제율, 제외 대상을 소득세법 §59의4에 따라 정리했습니다.',
  },
};

const FAQ_ITEMS = [
  {
    question: '보장성보험료 세액공제란 무엇인가요?',
    answer:
      '보장성보험료 세액공제는 소득세법 §59의4에 따른 제도로, 기본공제대상자를 피보험자로 하는 보장성보험의 보험료를 일정 비율로 공제받는 것입니다. 예를 들어 보험료 100만원을 내면 12만원(12%)의 세액공제를 받아 세금이 12만원 줄어드는 방식입니다.',
  },
  {
    question: '보장성보험료 한도는 연 얼마인가요?',
    answer:
      '일반 보장성보험료는 연 100만원 한도, 장애인전용 보장성보험료는 별도로 연 100만원 한도입니다(소득세법 §59의4①). 즉, 일반 보험 100만원 + 장애인 보험 100만원 = 최대 200만원까지 공제 가능합니다. 한도를 초과하는 보험료는 공제 대상이 아닙니다.',
  },
  {
    question: '공제율이 얼마인가요?',
    answer:
      '일반 보장성보험료는 12%, 장애인전용 보장성보험료는 15% 공제율입니다. 예: 일반 80만원 × 12% = 9.6만원 공제, 장애인 100만원 × 15% = 15만원 공제.',
  },
  {
    question: '어떤 보험이 공제 대상인가요?',
    answer:
      '보장성보험은 손해보험(자동차보험 제외), 실손의료보험, 상해보험, 질병보험, 종신보험, 화재보험 등 만기환급금이 납입보험료 이하인 보험입니다(소득세법 §59의4②). 만기환급금이 납입액을 초과하는 저축성보험(연금보험, 학자금보험 등)은 제외됩니다.',
  },
  {
    question: '피보험자 요건은 무엇인가요?',
    answer:
      '피보험자는 소득세법상 기본공제대상자여야 합니다. 즉, 당신 자신, 배우자, 부양가족(연소득 100만원 이하, 나이/관계 요건 충족)이어야 합니다. 소득 초과 부양가족의 보험료는 공제되지 않습니다.',
  },
  {
    question: '태아보험도 공제되나요?',
    answer:
      '태아는 출생 전에는 기본공제대상이 아니므로, 출생 전 태아보험 보험료는 공제되지 않습니다. 출생 후 신생아를 피보험자로 하는 보험료는 공제 가능합니다.',
  },
  {
    question: '공제 신청은 어떻게 하나요?',
    answer:
      '연말정산 시 보험료 납입증명서를 제출합니다. 직장인은 직장의 연말정산 신청서, 자영업자는 종합소득세 신고 시 함께 제출합니다. 증명서는 보험사에서 발급받아야 합니다.',
  },
  {
    question: '배우자 보험료도 공제 가능한가요?',
    answer:
      '네, 배우자가 기본공제대상자(연소득 100만원 이하)라면 배우자의 보장성보험료도 공제받을 수 있습니다. 단, 배우자가 소득 초과 후 기본공제 탈락 시에는 그 이후 배우자의 보험료는 공제 불가입니다.',
  },
];

export default function InsurancePremiumTaxCredit2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '보장성보험료 세액공제 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '보장성보험료 세액공제 2026 — 연말정산 100만원 한도 완벽 정리',
    description:
      '기본공제대상자를 피보험자로 하는 보장성보험의 보험료 세액공제. 일반 100만원 한도 12% 공제, 장애인 별도 100만원 한도 15% 공제. 대상 보험·제외 사항·연말정산 신청 방법까지 소득세법 §59의4 기준으로 정확히 정리.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['보장성보험료', '세액공제', '연말정산', '기본공제', '한도'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '보장성보험료 세액공제 2026',
    description:
      '보장성보험료 세액공제의 한도·공제율·대상보험·피보험자 요건을 소득세법 §59의4에 따라 정리.',
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
                    { name: '보장성보험료 세액공제 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">직장인·자영업자 · 7분 읽기 · 2026-07-07</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  보장성보험료 세액공제 2026
                  <br />
                  <span className="text-2xl text-text-secondary">— 100만원 한도·12% 공제</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  연말정산 때 보험료를 낸 직장인이라면 한 번쯤 '보장성보험료 세액공제'를 들었을 겁니다. 하지만 정확히 어떤 보험이 대상인지, 한도가 얼마인지, 어떻게 신청하는지 헷갈리기 쉽습니다. 이 가이드에서는 소득세법 §59의4에 따른 보장성보험료 세액공제의 모든 것을 정리해드립니다. 한도·공제율·대상보험·제외 사항까지 한눈에 파악하고, 연말정산 때 최대한 공제받으세요.
                </p>
              </header>

              <AdSlot slot="guide-insurance-premium-tax-credit-top" format="horizontal" />

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">보장성보험료 세액공제란 무엇인가</h2>
                <p>
                  소득세법 §59의4에 따른 보장성보험료 세액공제는 근로자나 자영업자가 기본공제대상자를 피보험자로 하는 보장성보험에 낸 보험료에 대해 일정 비율의 세액을 공제받는 제도입니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">세액공제의 기본 원리</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    세액공제 = 보험료 × 공제율(12% 또는 15%)
                    <br />
                    예: 보험료 100만원 × 12% = 12만원 공제 → 납부할 세금 12만원 감소
                    <br />
                    <strong>핵심:</strong> 소득공제와 다릅니다. 소득공제는 과세소득을 줄이지만, 세액공제는 계산된 세금을 직접 깎습니다.
                  </p>
                </div>
                <p className="mt-4">
                  보장성보험료 세액공제의 가장 큰 특징은 보험사 종류나 보험 상품에 따라 달라지지 않고, 기본공제대상자 판단이 핵심이라는 점입니다. 즉, 피보험자가 소득세법상 기본공제대상자(당신 자신, 배우자, 부양가족 중 소득 100만원 이하)라면 대부분의 보장성보험이 대상이 됩니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">한도와 공제율 (소득세법 §59의4)</h2>
                <p>
                  보장성보험료 세액공제의 한도와 공제율은 일반 보험과 장애인전용 보험으로 구분됩니다. 각각 다른 한도와 공제율이 적용되므로 정확히 이해하셔야 합니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 보장성보험료 세액공제 한도·공제율 (소득세법 §59의4①②, 2026 기준)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">보험 종류</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">연 한도</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">공제율</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">최대 공제액</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">일반 보장성보험료</td>
                        <td className="p-3"><strong>100만원</strong></td>
                        <td className="p-3"><strong>12%</strong></td>
                        <td className="p-3">12만원</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">장애인전용 보장성보험료</td>
                        <td className="p-3"><strong>100만원</strong></td>
                        <td className="p-3"><strong>15%</strong></td>
                        <td className="p-3">15만원</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  중요한 점은 <strong>일반 100만원과 장애인 100만원이 별도 한도</strong>라는 것입니다. 즉, 일반 보장성보험료 100만원 + 장애인전용 보장성보험료 100만원 = 최대 200만원까지 공제받을 수 있습니다.
                </p>
                <p className="mt-4">
                  다만 한도를 초과하는 보험료는 공제 대상이 아닙니다. 예를 들어 일반 보장성보험료를 150만원 냈다면, 100만원만 공제되고 나머지 50만원은 공제 불가입니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">보장성보험 대상 범위</h2>
                <p>
                  보장성보험료 세액공제 대상이 되는 보험은 "만기환급금이 납입보험료 이하인 보험"입니다(소득세법 §59의4②). 이는 순수 보장 목적의 보험만 대상이라는 뜻입니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">공제 대상 보험</p>
                  <ul className="space-y-2 ml-4 list-disc text-sm text-text-secondary">
                    <li>손해보험: 화재보험, 재산보험, 특수보험 등 (자동차보험은 제외)</li>
                    <li>실손의료보험: 의료비를 실손으로 보장하는 보험</li>
                    <li>상해보험: 질병·상해로 인한 사망·장해·입원을 보장</li>
                    <li>질병보험: 암보험, 뇌졸중보험, 심근경색보험 등 특정 질병 보장</li>
                    <li>종신보험: 사망만기환급금이 없는 순수 보장형</li>
                    <li>정기보험: 보장 기간이 정해진 보험</li>
                  </ul>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">공제 대상 제외 (저축성보험)</p>
                  <ul className="space-y-2 ml-4 list-disc text-sm text-text-secondary">
                    <li>연금보험: 만기환급금이 납입액을 초과</li>
                    <li>학자금보험: 자녀 교육 목적 저축성 보험</li>
                    <li>저축보험: 만기환급금이 납입액보다 많음</li>
                    <li>변액보험: 투자 수익이 포함되어 있는 보험</li>
                    <li>보장성이지만 환급금이 많은 보험: 개별 확인 필수</li>
                  </ul>
                </div>
                <p className="mt-4">
                  구분이 애매한 보험은 <strong>보험사 발급 서류에 "보장성" 표기 여부</strong>를 확인하거나, 국세청에 직접 문의하는 것이 가장 정확합니다.
                </p>
                <p className="mt-4">
                  다만 자동차보험은 손해보험이라도 공제 대상이 아닙니다. 이는 자동차보험이 의무 가입이고 손해배상 목적이라는 정책 판단 때문입니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">피보험자 요건: 기본공제대상자 판단</h2>
                <p>
                  보장성보험료 세액공제를 받으려면 피보험자(보험의 대상이 되는 사람)가 소득세법상 기본공제대상자여야 합니다. 기본공제대상자는 다음을 만족해야 합니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">기본공제대상자 요건</p>
                  <ul className="space-y-2 ml-4 list-disc text-sm text-text-secondary">
                    <li><strong>본인:</strong> 근로자 또는 자영업자 본인 (연소득 무관)</li>
                    <li><strong>배우자:</strong> 배우자의 연소득 100만원 이하</li>
                    <li><strong>직계존속:</strong> 부모(친, 배우자 측 포함), 할머니할아버지 등 — 연소득 100만원 이하, 나이 만 60세 이상</li>
                    <li><strong>직계비속:</strong> 자녀, 양자, 아동복지시설 입소아 등 — 연소득 100만원 이하, 나이 만 20세 이하 (2006년 이후 출생)</li>
                    <li><strong>형제자매:</strong> 친형제자매, 배우자의 형제자매 — 연소득 100만원 이하, 나이 만 20세 이하 또는 만 60세 이상</li>
                  </ul>
                </div>
                <p className="mt-4">
                  연소득 100만원은 <strong>근로소득·사업소득·이자·배당 합계</strong>를 기준으로 합니다. 기본공제 탈락 후 보장성보험료를 내도 공제 불가합니다.
                </p>
                <p className="mt-4">
                  다만 태아는 출생하지 않았으므로 기본공제대상이 아닙니다. 따라서 출생 전 태아보험 보험료는 공제되지 않습니다. 출생 후 신생아를 피보험자로 하는 보험료부터 공제 대상입니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">실제 계산 사례</h2>
                <p>
                  다음 3가지 사례를 통해 보장성보험료 세액공제가 실제로 어떻게 작동하는지 살펴보겠습니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 1. 일반 보장성보험료 120만원 (한도 초과)</p>
                  <p className="text-sm text-text-secondary">
                    · 피보험자: 본인 (기본공제대상자 ✓)
                    <br />
                    · 보험료: 실손의료보험 + 암보험 합계 120만원
                    <br />
                    · 한도: 일반 100만원 (120만원 중 100만원만 적용)
                    <br />
                    · 공제율: 12%
                    <br />
                    · 세액공제액: 100만원 × 12% = <strong>12만원</strong>
                    <br />
                    · 초과분: 20만원 (공제 불가)
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 120만원을 냈지만 100만원만 공제, 12만원의 세액공제 효과.</span>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 2. 일반 80만원 + 장애인 100만원</p>
                  <p className="text-sm text-text-secondary">
                    · 피보험자 1: 본인 (실손의료보험 80만원)
                    <br />
                    · 피보험자 2: 장애인 아버지 (질병보험 100만원)
                    <br />
                    · 일반 공제액: 80만원 × 12% = 9.6만원
                    <br />
                    · 장애인 공제액: 100만원 × 15% = 15만원
                    <br />
                    · <strong>총 세액공제액: 9.6만원 + 15만원 = 24.6만원</strong>
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 일반·장애인 한도 별도 적용으로 24.6만원 공제 효과.</span>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 3. 배우자 보험료 60만원 (기본공제 탈락)</p>
                  <p className="text-sm text-text-secondary">
                    · 피보험자: 배우자 (배우자 보장성보험료 60만원)
                    <br />
                    · 배우자 연소득: 120만원 (기본공제 탈락 ✗)
                    <br />
                    · 기본공제대상자? 아니오
                    <br />
                    · 세액공제액: <strong>0원</strong> (공제 불가)
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 배우자가 소득 100만원 초과로 기본공제 탈락하면 배우자 보험료는 공제 대상이 아님.</span>
                  </p>
                </div>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">공제 신청 방법 및 필요 서류</h2>
                <p>
                  보장성보험료 세액공제를 받으려면 연말정산 또는 종합소득세 신고 시 필요한 서류를 제출해야 합니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">직장인 (연말정산)</p>
                  <ul className="space-y-2 ml-4 list-disc text-sm text-text-secondary">
                    <li>2월 중 직장에 제출: 연말정산 간소화 서비스에서 다운로드한 보험료 납입증명서</li>
                    <li>또는 보험사 웹사이트에서 직접 발급받은 "보장성보험료 세액공제 증명서"</li>
                    <li>증명서에는 보험료, 보험 종류, 피보험자 정보가 기재되어 있음</li>
                  </ul>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">자영업자 (종합소득세 신고)</p>
                  <ul className="space-y-2 ml-4 list-disc text-sm text-text-secondary">
                    <li>5월 중 세무서 제출: 보험사 발급 "보장성보험료 납입증명서"</li>
                    <li>종합소득세 신고서 작성 시 세액공제 항목에 기재</li>
                    <li>미확정 소득은 예상 공제 대상, 확정 후 환급 신청 가능</li>
                  </ul>
                </div>
                <p className="mt-4">
                  <strong>보험료 납입증명서 발급 방법:</strong>
                </p>
                <ul className="space-y-2 ml-4 list-disc text-sm text-text-secondary">
                  <li>보험사 고객센터 또는 웹사이트 로그인 후 발급</li>
                  <li>보험료를 낸 모든 보험에 대해 개별 발급 필요</li>
                  <li>1월~12월 전체 납입액이 기재됨</li>
                </ul>
              </section>

              <AdSlot slot="guide-insurance-premium-tax-credit-mid" format="rectangle" />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h2 className="text-2xl font-bold">피해야 할 실수들</h2>
                <p>
                  보장성보험료 세액공제 신청 시 자주 하는 실수를 미리 알면 낭패를 피할 수 있습니다.
                </p>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li>
                    <strong>저축성보험을 보장성으로 신청:</strong> 연금보험, 학자금보험, 저축보험 같은 저축성 상품은 공제 대상이 아닙니다. 보험사 증명서에 명시된 보험 종류를 반드시 확인하세요.
                  </li>
                  <li>
                    <strong>기본공제 탈락 후 보험료 신청:</strong> 부양가족의 연소득이 100만원을 초과하여 기본공제 대상이 아니면, 그 이후의 보험료는 공제 불가입니다.
                  </li>
                  <li>
                    <strong>한도 초과 금액 전부 신청:</strong> 100만원 또는 200만원(일반+장애인) 한도를 초과하는 보험료는 공제되지 않습니다. 미리 한도 내에서 계산하세요.
                  </li>
                  <li>
                    <strong>증명서 미제출:</strong> 연말정산 간소화 서비스에서 자동 수집되지 않는 보험은 직접 보험사에서 발급받아 제출해야 합니다. 제출 누락 시 공제 불가입니다.
                  </li>
                  <li>
                    <strong>배우자 보험료 중복 신청:</strong> 배우자의 보험료는 배우자가 직장인일 때 배우자의 연말정산에서 신청하고, 당신은 신청하면 안 됩니다.
                  </li>
                </ul>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">세액공제와 소득공제의 차이</h2>
                <p>
                  보장성보험료는 세액공제입니다. 이를 소득공제와 헷갈리면 효과를 정확히 계산할 수 없습니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 2. 소득공제 vs 세액공제 비교</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">항목</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">소득공제</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">세액공제</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3"><strong>효과</strong></td>
                        <td className="p-3">과세소득 감소</td>
                        <td className="p-3">납부 세금 직접 감소</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3"><strong>계산</strong></td>
                        <td className="p-3">공제액 × 세율</td>
                        <td className="p-3">공제액 × 공제율</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3"><strong>예시</strong></td>
                        <td className="p-3">100만원 소득공제 × 15% 세율 = 15만원 세금 감소</td>
                        <td className="p-3">100만원 × 12% 세액공제 = 12만원 세금 감소</td>
                      </tr>
                      <tr>
                        <td className="p-3"><strong>예시 (고소득)</strong></td>
                        <td className="p-3">100만원 소득공제 × 40% 세율 = 40만원 세금 감소</td>
                        <td className="p-3">100만원 × 12% 세액공제 = 12만원 세금 감소 (변동 없음)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  보장성보험료는 세액공제이므로, <strong>세율에 관계없이 공제율 12%(일반) 또는 15%(장애인)가 일정하게 적용</strong>됩니다. 이는 고소득층에게는 소득공제보다 불리할 수 있다는 뜻입니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">2026년 변경사항 및 유의사항</h2>
                <p>
                  2026년 현재 보장성보험료 세액공제의 한도(100만원)와 공제율(12%, 15%)은 변함이 없습니다. 다만 최근 개정 논의 사항을 알아두면 도움이 됩니다.
                </p>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li>
                    <strong>한도 현행 유지:</strong> 2022년 이후 일반 100만원 한도가 유지되고 있습니다. 한도 상향 논의가 있지만, 현재는 100만원입니다.
                  </li>
                  <li>
                    <strong>장애인 보험료 15% 공제:</strong> 장애인전용 보장성보험료의 공제율 15%는 일반보다 높으므로, 장애인 피보험자가 있다면 반드시 구분 신청하세요.
                  </li>
                  <li>
                    <strong>보험사별 차이 없음:</strong> 국내 보험사, 외국계 보험사 모두 동일한 한도·공제율이 적용됩니다.
                  </li>
                  <li>
                    <strong>중도환급금은 공제 불가:</strong> 보험을 중도에 해약하고 환급금을 받았다면, 그 환급금은 공제 대상 보험료에서 차감할 수 있습니다. 세무서에 상담하세요.
                  </li>
                </ul>
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
                    <p className="mt-1 text-sm text-text-secondary">보험료 공제를 포함한 월급 계산.</p>
                  </Link>
                  <Link
                    href="/guide/year-end-tax-settlement/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">연말정산 완벽 준비 가이드</div>
                    <p className="mt-1 text-sm text-text-secondary">공제·세액공제·제출 서류 총정리.</p>
                  </Link>
                  <Link
                    href="/guide/medical-expense-tax-credit-3-percent-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">의료비 세액공제 3% 정확히</div>
                    <p className="mt-1 text-sm text-text-secondary">의료비 총액 기준 3% 공제 방법.</p>
                  </Link>
                  <Link
                    href="/guide/income-deduction-vs-tax-credit-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">소득공제 vs 세액공제 비교</div>
                    <p className="mt-1 text-sm text-text-secondary">공제액·효과·전략을 정확히 이해.</p>
                  </Link>
                  <Link
                    href="/guide/credit-card-income-deduction-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">신용카드 소득공제 15%</div>
                    <p className="mt-1 text-sm text-text-secondary">총급여 25% 이상 사용 시 공제 기준.</p>
                  </Link>
                  <Link
                    href="/category/tax/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">모든 세금 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">소득세·양도세·취득세·종부세 모음.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 교육 목적으로 작성되었으며, 개인 맞춤형 세무 조언이 아닙니다. 보장성보험 판단, 기본공제대상자 판정, 실제 공제 대상 여부는 보험사 발급 서류와 국세청 기준을 따릅니다. 특히 저축성과 보장성의 경계가 애매한 보험은 보험사에 직접 확인하거나 국세청에 문의하세요. 본 콘텐츠는 2026-07-07을 기준으로 작성되었으며, 소득세법 개정 시 즉시 업데이트됩니다. 보장성보험료 세액공제의 정확한 기준은 법조항 <strong>소득세법 §59의4(보장성보험료에 대한 세액공제)</strong>를 따릅니다. AI 보조 작성 후 운영자 검수 완료.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터(소득세법 §59의4)</a>,{' '}
                  <a href="https://www.nts.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">국세청 공식 사이트</a>,{' '}
                  <a href="https://www.simpletax.or.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">국세청 연말정산 간소화 서비스</a>.
                </p>
              </section>

              <ShareButtons
                title="보장성보험료 세액공제 2026 가이드"
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
