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

const URL = 'https://calculatorhost.com/guide/education-expense-tax-credit-2026/';
const DATE_PUBLISHED = '2026-07-07';
const DATE_MODIFIED = '2026-07-07';

export const metadata: Metadata = {
  title: '교육비 세액공제 2026 | 15% 공제·초중고 300만·대학 900만',
  description:
    '2026년 교육비 세액공제 완벽 정리. 공제율 15%, 취학전 아동·초중고 1명당 연 300만원, 대학생 900만원 한도. 수업료, 급식비, 교복구입비, 현장체험학습비 포함 대상 정리. 소득세법 §59의4 기준.',
  keywords: [
    '교육비 세액공제',
    '교육비 공제 2026',
    '자녀 교육비 세액공제',
    '초중고 300만원',
    '대학생 900만원',
    '소득세법 59조의4',
    '연말정산 교육비',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '교육비 세액공제 2026 | 15% 공제·초중고 300만·대학 900만' }],
    title: '교육비 세액공제 2026 — 자녀 교육비 15% 공제받기',
    description: '근로소득자 대상 교육비 세액공제. 초중고 1명당 300만원, 대학생 900만원, 본인 교육비 전액 공제. 대상 범위·계산법·유의사항 완전 정리.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '교육비 세액공제 2026 — 자녀 교육비로 세금 깎기',
    description: '초중고 300만원, 대학 900만원 한도. 급식비·교복·현장학습비도 포함. 자세히 알아보기.',
  },
};

const FAQ_ITEMS = [
  {
    question: '교육비 세액공제는 정확히 무엇인가요?',
    answer:
      '교육비 세액공제는 소득세법 §59의4에 따라 자녀와 본인의 교육비를 납부한 근로소득자에게 세금을 깎아주는 제도입니다(공제율 15%). 연말정산 시 교육비 영수증을 제출하면 그 금액의 15%를 소득세에서 직접 차감해줍니다. 예를 들어 자녀 교육비 300만원을 낸 부모는 45만원의 세액공제를 받습니다.',
  },
  {
    question: '공제 대상이 되는 자녀는 누구인가요?',
    answer:
      '공제 대상은 취학전 아동, 초등학생, 중학생, 고등학생, 대학생입니다(소득세법 §59의4③). 본인의 교육비도 공제되는데, 특히 대학원은 본인만 공제 대상입니다. 대학생 자녀도 1명당 한도(900만원)가 있으며, 부모의 소득 요건에 따라 공제가 제한될 수 있습니다.',
  },
  {
    question: '교육비 공제 한도는 정확히 얼마인가요?',
    answer:
      '공제 한도는 자녀의 학급 수준에 따라 다릅니다(소득세법 §59의4③): 취학전 아동·초중고 학생은 1명당 연 300만원 한도, 대학생은 1명당 연 900만원 한도, 본인 교육비는 전액(한도 없음), 장애인 특수교육비는 전액입니다. 자녀가 여럿이면 각각의 한도가 적용되어 합산됩니다.',
  },
  {
    question: '어떤 교육 관련 비용이 공제 대상인가요?',
    answer:
      '공제 대상 항목은 수업료, 입학금, 급식비, 교과서대, 방과후학교 수강료 및 교재비, 교복구입비(중·고 1명당 50만원 한도), 현장체험학습비(1명당 30만원 한도) 등입니다(소득세법 시행령). 취학전 아동의 학원비, 체육시설 수강료도 포함되지만, 대학원생 자녀의 교육비는 일반적으로 대상이 아닙니다.',
  },
  {
    question: '소득 제한이 있나요?',
    answer:
      '교육비 세액공제는 교육비를 지출한 자녀 등이 기본공제대상자일 때 받을 수 있습니다 — 해당 부양가족의 연 소득금액이 100만원(근로소득만 있으면 총급여 500만원) 이하여야 합니다. 본인·배우자 교육비는 소득과 무관하게 공제됩니다. 정확한 부양가족 판정은 국세청 홈택스에서 확인하세요.',
  },
  {
    question: '직계존속(부모)의 교육비는 공제받을 수 있나요?',
    answer:
      '아니요. 교육비 세액공제는 본인, 배우자, 자녀만 대상입니다(소득세법 §59의4③). 부모, 친척 등 직계존속의 교육비는 원칙적으로 공제 대상이 아닙니다. 다만 부모가 장애인이고 특수교육을 받는 경우는 예외적으로 공제될 수 있으므로, 의심스러울 때는 세무서에 문의하세요.',
  },
  {
    question: '학자금 지원금이나 사내 교육비 지원은 어떻게 처리하나요?',
    answer:
      '학자금 지원분(장학금, 국가지원금 등)이나 사내근로복지기금에서 지원받은 교육비는 공제 대상 금액에서 제외됩니다. 예를 들어 등록금이 1,000만원인데 장학금 200만원을 받으면, 실제 공제 대상은 800만원이 됩니다. 이러한 지원 사실을 정확히 파악하고 세무서에 신고해야 합니다.',
  },
  {
    question: '교육비 세액공제는 어떻게 받나요?',
    answer:
      '연말정산 시 교육비 관련 영수증과 신분증 사본을 제출하면 소속 회사에서 계산해줍니다. 또는 국세청 홈택스에서 직접 모든 교육비를 입력한 후 "교육비 세액공제" 항목을 신청하면, 근로소득 맞춤형 전산 계산 결과에 자동 반영됩니다. 자녀가 여럿이면 각 자녀별로 개별 계산됩니다.',
  },
];

export default function EducationExpenseTaxCredit2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '교육비 세액공제 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '교육비 세액공제 2026 — 자녀 교육비 15% 세금 깎기',
    description:
      '근로소득자 대상 교육비 세액공제 완벽 정리. 초중고 1명당 300만원 한도, 대학생 900만원, 본인 교육비 전액. 공제율 15%, 대상 항목, 소득 제한, 계산 사례, 주의사항까지.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['교육비 세액공제', '연말정산', '자녀 교육비', '소득세 공제'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '교육비 세액공제 2026',
    description:
      '교육비 세액공제의 정확한 대상 범위, 공제 한도, 계산법, 주의사항.',
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
                    { name: '교육비 세액공제 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">학부모 · 자녀 교육 · 7분 읽기 · 2026-07-07</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  교육비 세액공제 2026
                  <br />
                  <span className="text-2xl text-text-secondary">— 자녀 교육비로 세금 깎기</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  자녀를 키우는 부모들이 가장 큰 부담 중 하나가 교육비입니다. 좋은 소식은 이 교육비의 일부를 세금에서 직접 깎을 수 있다는 것입니다. 소득세법 §59의4에 따른 교육비 세액공제 제도를 활용하면, 자녀의 학년과 교육 항목에 따라 연 300만원~900만원까지 공제받을 수 있습니다. 이 가이드에서는 공제 대상, 한도, 계산법, 그리고 놓치기 쉬운 주의사항까지 완전히 정리해드립니다.
                </p>
              </header>

              <AdSlot slot="guide-education-expense-tax-credit-top" format="horizontal" />

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">교육비 세액공제 제도 개요</h2>
                <p>
                  교육비 세액공제는 근로소득자와 사업자가 본인, 배우자, 자녀의 교육비를 낸 경우, 그 금액의 15%를 소득세에서 차감해주는 제도입니다(소득세법 §59의4③). "공제"라는 표현이 두 가지인데, "세액공제"는 소득에서 빼는 "소득공제"(예: 인적공제)와 달리, 납부할 세금에서 직접 빼주는 것이므로 절세 효과가 훨씬 큽니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">교육비 세액공제의 구조</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    공제율: <strong>15%</strong> (소득세법 §59의4③)
                    <br />
                    공제 대상: 본인, 배우자, 자녀(취학전 아동~대학생)
                    <br />
                    한도: 학년별 상이 (초중고 300만원 / 대학 900만원 / 본인 전액)
                    <br />
                    계산: 교육비 × 15% = 세액공제액 (소득세에서 직접 차감)
                    <br />
                    예: 자녀 교육비 300만원 → 300만 × 15% = <strong>45만원 세액공제</strong>
                  </p>
                </div>
                <p className="mt-4">
                  이 제도는 교육비 부담이 크고 자녀 교육에 투자하는 가정을 세정책으로 지원하기 위해 설계됐습니다. 연말정산 때 영수증만 제출하면 자동으로 계산되므로 절차도 간단합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">공제 대상자와 한도 (학년별)</h2>
                <p>
                  교육비 세액공제를 받으려면 공제 대상이 누구인지, 그리고 각 대상별 한도가 얼마인지 정확히 파악해야 합니다. 한도를 초과하면 그 부분은 공제받을 수 없습니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 교육비 세액공제 대상 및 한도 (소득세법 §59의4③, 2026 기준)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">공제 대상</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">한도 (연)</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">공제율</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">취학전 아동</td>
                        <td className="p-3"><strong>300만원</strong></td>
                        <td className="p-3">15%</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">초등학생</td>
                        <td className="p-3"><strong>300만원</strong></td>
                        <td className="p-3">15%</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">중학생</td>
                        <td className="p-3"><strong>300만원</strong></td>
                        <td className="p-3">15%</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">고등학생</td>
                        <td className="p-3"><strong>300만원</strong></td>
                        <td className="p-3">15%</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">대학생</td>
                        <td className="p-3"><strong>900만원</strong></td>
                        <td className="p-3">15%</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">본인</td>
                        <td className="p-3"><strong>전액</strong> (한도 없음)</td>
                        <td className="p-3">15%</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">장애인 특수교육비</td>
                        <td className="p-3"><strong>전액</strong> (한도 없음)</td>
                        <td className="p-3">15%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  자녀가 2명 이상이면 각 자녀의 한도가 별도로 적용됩니다. 예를 들어 고등학생 자녀 2명이 있으면 각각 300만원씩, 총 600만원까지 공제받을 수 있습니다.
                </p>
                <p className="mt-4">
                  ⚠️ 다만 대학생의 경우 900만원 한도가 있으므로, 학기당 450만원 이상의 교육비를 내야 연 900만원 한도를 모두 활용할 수 있습니다. 또한 본인의 대학원 등록금은 한도 없이 전액 공제되지만, 배우자나 성인 자녀의 대학원 교육비는 일반적으로 공제 대상이 아닙니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">공제 대상 교육비 항목</h2>
                <p>
                  모든 교육 관련 비용이 공제 대상인 것은 아닙니다. 소득세법 시행령과 국세청 지침에 따라 정해진 항목만 공제됩니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">반드시 포함되는 항목</p>
                  <ul className="text-sm text-text-secondary space-y-2 ml-4">
                    <li>• 수업료 (학교·학원·온라인 강좌 등)</li>
                    <li>• 입학금, 재입학금</li>
                    <li>• 급식비 (학교 공식 식당, 급식 용역)</li>
                    <li>• 교과서대 (교재·참고서도 포함)</li>
                    <li>• 방과후학교 수강료 및 교재비</li>
                    <li>• 교복 구입비 (중·고등학교만, 1명당 50만원 한도)</li>
                    <li>• 현장체험학습비 (수학여행·현장학습, 1명당 30만원 한도)</li>
                    <li>• 취학전 아동의 학원비, 체육시설 수강료</li>
                  </ul>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">포함되지 않는 항목</p>
                  <ul className="text-sm text-text-secondary space-y-2 ml-4">
                    <li>• 학자금 지원분 (장학금, 국가장학금 등)</li>
                    <li>• 사내근로복지기금에서 지원받은 교육비</li>
                    <li>• 보육료 (보육 시설 비용 — 별도 공제 가능)</li>
                    <li>• 기숙사비, 통학비</li>
                    <li>• 학원비 — 초등학생 이상은 공제 불가 (취학전 아동 학원비만 예외적으로 공제 대상)</li>
                    <li>• 사설 과외비 (학원은 되지만 개인 과외는 불포함)</li>
                  </ul>
                </div>
                <p className="mt-4">
                  교육비 공제를 받을 때는 반드시 영수증을 보관해야 하며, 학원의 경우 학원 고유 번호(학원 허가증에 표기)가 있어야 공제 대상이 됩니다.
                </p>
                <p className="mt-4">
                  ⚠️ 다만 보육료나 유치원 납입금은 별도의 "보육비 세액공제"(소득세법 §59의3) 대상이므로 중복 공제할 수 없습니다. 교육비인지 보육비인지 불명확한 경우, 세무서에 사전 확인 후 신고하는 것이 안전합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">계산 사례 3가지</h2>
                <p>
                  교육비 세액공제가 실제로 어떻게 작동하는지 다양한 사례로 살펴보겠습니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 1. 고등학생 자녀 1명, 교육비 250만원</p>
                  <p className="text-sm text-text-secondary">
                    · 교육비 총액: 250만원 (수업료 150만 + 급식비 50만 + 교복 50만)
                    <br />
                    · 공제 대상 금액: 250만원 (모두 한도 300만원 이내)
                    <br />
                    · 세액공제액: 250만 × 15% = <strong>37.5만원</strong>
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 연말정산 시 소득세에서 37.5만원 차감. 실제 납부 세금이 37.5만원 줄어듦.</span>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 2. 대학생 자녀, 등록금 1,000만원 (한도 900만원)</p>
                  <p className="text-sm text-text-secondary">
                    · 교육비 총액: 1,000만원 (등록금만)
                    <br />
                    · 한도: 900만원 (대학생 한도)
                    <br />
                    · 공제 대상 금액: 900만원 (초과분 100만원은 공제 불가)
                    <br />
                    · 세액공제액: 900만 × 15% = <strong>135만원</strong>
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 1,000만원 전체가 아닌 900만원만 공제. 세액공제 135만원.</span>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 3. 자녀 2명 (초등학생 250만, 중학생 280만)</p>
                  <p className="text-sm text-text-secondary">
                    · 초등학생 자녀: 교육비 250만원
                    <br />
                    · 중학생 자녀: 교육비 280만원
                    <br />
                    · 각 자녀별 한도 300만원 적용
                    <br />
                    · 공제 대상 금액: 250만 + 280만 = 530만원 (각각 한도 이내)
                    <br />
                    · 세액공제액: 530만 × 15% = <strong>79.5만원</strong>
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 자녀별 한도를 따로 적용하므로 합산 공제액이 커짐.</span>
                  </p>
                </div>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">소득 제한과 부양가족 기준</h2>
                <p>
                  교육비 세액공제는 모든 근로소득자가 받을 수 있는 것이 아닙니다. 일정 소득 이상이거나 부양 대상이 아니면 공제 자체를 받지 못하는 경우도 있습니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">소득 요건</p>
                  <p className="text-sm text-text-secondary">
                    교육비 세액공제는 다음 중 하나 이상을 만족하지 못하면 공제 대상이 아닙니다:
                    <br />
                    · 종합소득: 연 100만원 이하
                    <br />
                    · 근로소득만 있는 경우: 연 500만원 이하
                    <br />
                    · 부양가족 인정 기준: 연 소득 100만원 이하 (자녀 기준)
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">부양가족 인정 여부</p>
                  <p className="text-sm text-text-secondary">
                    자녀가 공제 대상이 되려면 연말 기준으로 부양가족으로 인정되어야 합니다. 부양 인정 기준은 다음과 같습니다:
                    <br />
                    · 피부양자의 연 소득: 100만원 이하 (근로·사업·기타소득 합산)
                    <br />
                    · 나이 제한: 원칙적으로 20세 이하 (2006년 1월 1일 이후 출생)
                    <br />
                    · 대학생: 21~25세(2001~2005년생)도 부양가족 인정 가능
                    <br />
                    예를 들어 대학생 자녀가 방학 중 아르바이트로 연 100만원을 초과 벌었다면 부양가족 인정 기준을 벗어나 공제 대상이 아닙니다.
                  </p>
                </div>
                <p className="mt-4">
                  ⚠️ 다만 본인의 교육비는 소득 제한이 없습니다. 예를 들어 연봉 1억인 직장인이 대학원에 다니면서 등록금을 낸 경우, 등록금 전액이 공제됩니다. 자녀와 본인을 혼동하지 않도록 주의하세요.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">학자금 지원분과 지원금 처리</h2>
                <p>
                  자녀가 장학금을 받거나 학교에서 지원받은 교육비가 있다면, 공제액을 차감해야 합니다. 이 부분에서 실수하면 과다 공제로 세무 지적을 받을 수 있습니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">공제 대상 금액 계산법</p>
                  <p className="text-sm text-text-secondary">
                    공제 대상 금액 = 실제 납부한 교육비 − 학자금 지원분 − 사내복지기금 지원분
                    <br />
                    <br />
                    <strong>구체적 예:</strong>
                    <br />
                    · 등록금: 1,000만원
                    <br />
                    · 국가장학금 받음: 200만원
                    <br />
                    · 학교 장학금 받음: 100만원
                    <br />
                    · 공제 대상 금액: 1,000만 − 200만 − 100만 = <strong>700만원</strong>
                    <br />
                    · 세액공제액: 700만 × 15% = 105만원
                  </p>
                </div>
                <p className="mt-4">
                  장학금과 지원금을 정확히 파악하지 못하면 세액공제액을 많게 신고하게 되어 나중에 세무 조정을 받을 수 있습니다. 자녀가 학자금을 받았다면 반드시 학교에서 발급하는 장학금 영수증이나 지급 명세서를 보관해야 합니다.
                </p>
                <p className="mt-4">
                  ⚠️ 다만 국민내일배움카드, 국방부 교육비 지원 등 특정 정책자금은 공제 대상에서 제외되지 않을 수도 있으므로, 의심스러운 지원금은 세무서에 문의하는 것이 정확합니다.
                </p>
              </section>

              <AdSlot slot="guide-education-expense-tax-credit-mid" format="rectangle" />

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">직계존속 교육비와 예외 상황</h2>
                <p>
                  교육비 세액공제는 본인과 자녀가 원칙이지만, 특수한 상황에서는 범위가 달라질 수 있습니다.
                </p>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li>
                    <strong>부모(직계존속) 교육비:</strong> 일반적으로 부모가 다시 학교에 다니거나 강좌를 듣는 비용은 공제 대상이 아닙니다. 다만 부모가 장애인이고 특수교육을 받는 경우는 예외적으로 공제될 수 있으므로 세무서 확인이 필요합니다.
                  </li>
                  <li>
                    <strong>성인 자녀(부양가족 아님)의 교육비:</strong> 대학을 졸업한 후 다시 학원이나 직업학교에 다니는 성인 자녀의 교육비는 부양 대상이 아니므로 공제받을 수 없습니다.
                  </li>
                  <li>
                    <strong>배우자의 교육비:</strong> 배우자가 다니는 학교나 강좌의 교육비는 공제 대상입니다. 이 경우 본인의 교육비와 합산하여 전액 공제됩니다.
                  </li>
                  <li>
                    <strong>해외 교육비:</strong> 해외 학교의 등록금도 교육비 세액공제 대상이 될 수 있습니다. 다만 영수증 형태와 환전 기록 등으로 증빙해야 하므로, 사전에 세무서에 문의하세요.
                  </li>
                </ul>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">교육비 세액공제 신청 방법</h2>
                <p>
                  교육비 세액공제는 어렵지 않게 신청할 수 있습니다. 일반적으로 두 가지 방법이 있습니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">방법 1. 회사 연말정산</p>
                  <p className="text-sm text-text-secondary">
                    1월에 연말정산 시 회사에 교육비 영수증을 제출하면, 인사팀이나 회계팀에서 계산해줍니다. 이것이 가장 간단한 방법입니다.
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">방법 2. 홈택스(국세청 온라인)</p>
                  <p className="text-sm text-text-secondary">
                    국세청 홈택스(www.homtax.go.kr)에 로그인하여 "근로소득 맞춤형 전산계산"에서 자녀별 교육비를 입력하면 자동 계산됩니다. 5월~6월 종합소득세 신고 시기에도 신청할 수 있습니다.
                  </p>
                </div>
                <p className="mt-4">
                  어느 방법이든 반드시 영수증을 보관해야 하며, 3년 이내 국세청 조사를 받을 수 있으므로 확실한 증빙을 준비해야 합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">교육비 공제와 다른 세제 혜택의 관계</h2>
                <p>
                  교육비 세액공제 외에도 자녀 양육 관련 여러 공제가 있습니다. 이들이 어떻게 조합되는지 이해하면 최대 세금 절감이 가능합니다.
                </p>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li>
                    <strong>자녀세액공제 (소득세법 §59의2):</strong> 1명당 연 15만원. 교육비 세액공제와 별도로 받을 수 있습니다. 자녀 2명이면 자녀세액공제만 30만원 + 교육비 세액공제가 합산됩니다.
                  </li>
                  <li>
                    <strong>보육비 세액공제 (소득세법 §59의3):</strong> 만 6세 이하 보육료 금액의 30% 공제. 취학 전 교육(학원)과 중복되면 더 큰 공제를 선택합니다.
                  </li>
                  <li>
                    <strong>의료비 세액공제:</strong> 본인·배우자·자녀의 의료비도 세액공제 대상. 교육비와는 완전 별개.
                  </li>
                  <li>
                    <strong>기부금 공제:</strong> 학교 기부금은 별도로 기부금 공제가 적용될 수 있습니다.
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
                    <p className="mt-1 text-sm text-text-secondary">세액공제 반영된 월급 수령액을 직접 계산해보세요.</p>
                  </Link>
                  <Link
                    href="/guide/child-tax-credit-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">자녀세액공제 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">1명당 15만원 자녀세액공제 완벽 정리.</p>
                  </Link>
                  <Link
                    href="/guide/medical-expense-tax-credit-3-percent-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">의료비 세액공제 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">3% 초과분 의료비 공제받기.</p>
                  </Link>
                  <Link
                    href="/guide/year-end-tax-settlement/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">연말정산 완벽 가이드</div>
                    <p className="mt-1 text-sm text-text-secondary">교육비·의료비·기부금 모든 공제 정리.</p>
                  </Link>
                  <Link
                    href="/guide/personal-deduction-dependent-150-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">인적공제 기준 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">부양가족 인정 기준 명확히.</p>
                  </Link>
                  <Link
                    href="/category/tax/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">모든 세금 가이드</div>
                    <p className="mt-1 text-sm text-text-secondary">양도세·취득세·상속세·소득세 모음.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 교육 목적으로 작성되었으며, 개인 맞춤형 세무 조언이 아닙니다. 교육비 세액공제의 정확한 범위, 공제 대상, 한도는 개인의 소득 상황과 자녀의 부양 인정 여부에 따라 달라질 수 있습니다. 실제 공제 신청 전에 국세청 홈택스, 세무서, 또는 세무사에 반드시 상담하세요. 본 콘텐츠는 2026-07-07을 기준으로 작성되었으며, 소득세법 개정 시 즉시 업데이트됩니다. 교육비 세액공제의 정확한 기준은 법조항 <strong>소득세법 §59의4(교육비 세액공제)</strong>, <strong>소득세법 시행령 §119의4(공제 대상 교육비)</strong>를 따릅니다. AI 보조 작성 후 운영자 검수 완료.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터</a>,{' '}
                  <a href="https://www.nts.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">국세청 공식 홈페이지</a>,{' '}
                  <a href="https://www.homtax.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">홈택스 연말정산 상담</a>.
                </p>
              </section>

              <ShareButtons
                title="교육비 세액공제 2026 가이드"
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
