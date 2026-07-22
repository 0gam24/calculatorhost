import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { Footer } from '@/components/layout/Footer';
import { GuideHeader } from '@/components/guide/GuideHeader';
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

const URL = 'https://calculatorhost.com/guide/business-income-vs-other-income-classification-2026/';
const DATE_PUBLISHED = '2026-05-28';
const DATE_MODIFIED = '2026-05-28';

export const metadata: Metadata = {
  title: '사업소득 vs 기타소득 분류 기준 2026 강사·프리랜서 5월 신고 가이드',
  description:
    '강사료·원고료가 사업소득일까 기타소득일까? 1회성 vs 정기, 필요경비 인정률 차이(60% vs 80%), 누진세 vs 분리과세 22%, 잘못 분류 시 40% 가산세 위험. 5월 31일 신고 전 필독.',
  keywords: [
    '사업소득 기타소득 분류',
    '강사료 기타소득',
    '필요경비율 60% 80%',
    '인적용역 소득세법',
    '1회성 강의 분류',
    '사업소득 조건 정기성',
    '300만 분리과세 22%',
    '소득세법 §14 §19 §21',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '사업소득 vs 기타소득 분류 기준 2026 강사·프리랜서 5월 신고 가이드' }],
    title: '사업소득 vs 기타소득 완벽 분류 기준 2026 | 강사·프리랜서 필독',
    description: '5월 31일 신고 전 필독. 강사료 사업소득 vs 기타소득, 필요경비 차이, 누진세율 영향, 가산세 회피.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '사업소득 vs 기타소득 분류 2026 강사·프리랜서',
    description: '1회성 강의 vs 정기 강사, 필요경비 차이, 누진세율 영향, 신고 실수로 40% 가산세?',
  },
};

const FAQ_ITEMS = [
  {
    question: '1회성 강의료와 정기 강의료, 어디서 나뉘나요?',
    answer:
      '소득세법 §19(사업소득 정의)와 §21(기타소득 정의)의 핵심은 "계속성·반복성"입니다. 매월 정기적으로 강의하면 사업소득, 1~2회만 외부에서 초청받은 강의는 기타소득으로 분류합니다. 연간 1~2회 특강은 기타소득이지만, 매달 정해진 강사로 활동하면 사업소득 의무입니다.',
  },
  {
    question: '기타소득 300만 원 이하면 꼭 분리과세(22%) 해야 하나요?',
    answer:
      '아닙니다. 선택권입니다(소득세법 §14 ⑦). 기타소득 300만 원 이하면 22% 원천징수 분리과세를 선택하거나, 다른 소득(직장 월급 등)과 합산하여 종합과세할 수 있습니다. 직장 소득이 적으면 합산이 유리할 수 있습니다.',
  },
  {
    question: '강사료 200만 원, 필요경비가 60%냐 80%냐에 따라 세금이 달라지나요?',
    answer:
      '매우 달라집니다(소득세법 시행령 §87). 기타소득이 강사료인 경우 필요경비 60% 인정(200만 × 60% = 120만이 필요경비). 사업소득은 경비율 선택(단순경비율 70%, 기준경비율 최대 80%)이 가능합니다. 분류에 따라 같은 200만 원도 과세 기준이 80만~120만 범위로 변합니다.',
  },
  {
    question: '프리랜서 3.3% 원천징수는 뭔가요? 신고 의무가 있나요?',
    answer:
      '프리랜서·인적용역 소득에서 발주자가 선금으로 3.3% 원천징수하고 근로소득세액공제 대상입니다(소득세법 §127-130). 하지만 실제 신고 의무는 별개입니다. 종합소득세 신고 대상이면 5월에 신고하지 않으면 무신고가산세 20%가 부과됩니다.',
  },
  {
    question: '사업소득을 기타소득으로 잘못 신고하면 어떻게 되나요?',
    answer:
      '과세관청이 적발하면 부정행위로 판정되어 가산세 40% 부과 가능합니다(국세기본법 §47의2). 특히 4대보험 미가입 여부가 적발 단초가 되므로, 정기적 강의 = 사업소득 = 4대보험 가입이라는 연계 확인이 중요합니다.',
  },
  {
    question: '매년 5월에만 강의하면 어떻게 분류하나요?',
    answer:
      '연중 특정 시즌에만 정기적으로 반복되는 일(예: 봄방학 특강)이면 "계속성·반복성" 판정에 따라 사업소득으로 볼 여지가 있습니다. 다만 국세기본법 §14(실질과세원칙)에 따라 세무사 상담 후 신고하는 것이 안전합니다.',
  },
  {
    question: '기타소득 300만 넘으면 무조건 합산 종합과세인가요?',
    answer:
      '그렇습니다. 기타소득이 300만 원을 초과하면 분리과세 선택 불가능하고, 다른 소득(근로소득 등)과 합산하여 종합과세해야 합니다(소득세법 §14 ⑦). 누진세율이 적용되므로 세액이 올라갈 가능성이 높습니다.',
  },
  {
    question: '필요경비 증빙이 없으면 어떤 비율로 적용되나요?',
    answer:
      '기타소득의 경우 소득세법 시행령 §87에서 정한 "필요경비율"이 자동 적용됩니다. 강사료·원고료는 60%, 인적용역은 60%, 일시문예활동(저술·공연)은 80%입니다. 실제 경비 증빙 여부와 무관하게 정률입니다.',
  },
];

export default function BusinessIncomeVsOtherIncomeClassification2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '사업소득 vs 기타소득 분류' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '사업소득 vs 기타소득 분류 기준 2026 강사·프리랜서 신고 완벽 가이드',
    description:
      '강사료·원고료가 사업소득일까 기타소득일까? 필요경비 인정률 차이(60% vs 80%)·누진세 vs 분리과세 22%·4대보험 의무·가산세 40% 위험. 정기성·반복성 판정 기준·300만 분리과세 한도·실질과세 원칙 완벽 정리.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['사업소득', '기타소득', '강사료', '분류 기준', '필요경비율'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '사업소득 vs 기타소득 분류 기준 2026 강사·프리랜서 신고',
    description:
      '5월 31일 신고 직전! 강사료·원고료·인적용역이 사업소득인지 기타소득인지 판정 기준·필요경비 차이·누진세 영향·4대보험 의무·40% 가산세 회피·300만 분리과세 선택권 완벽 정리.',
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
              <GuideHeader
                breadcrumbItems={[
                  { name: '홈', href: '/' },
                  { name: '가이드', href: '/guide/' },
                  { name: '사업소득 vs 기타소득 분류' },
                ]}
                category="세금"
                readingMinutes={13}
                publishedDate="2026-05-28"
                title="사업소득 vs 기타소득 분류 기준 2026"
                subtitle="— 강사·프리랜서 5월 신고 필독"
                lead={
                  <p data-speakable>
                    프리랜서·강사·작가라면 주의하세요.
                    <strong> 받는 돈이 "사업소득"인지 "기타소득"인지에 따라 세금이 2배 달라질 수 있습니다.</strong>
                    같은 200만 원을 받아도 분류에 따라 필요경비율이 60% 또는 80%로 달라지고, 누진세가 적용될지
                    분리과세(22%)로 끝날지 결정됩니다. 더 위험한 것은 <strong>잘못 분류할 경우 부정행위로 40% 가산세</strong>
                    가 부과될 수 있다는 점입니다. 이 가이드에서는 법조항(소득세법 §19·§21·§14)을 기준으로 정확한 분류 방법을
                    단계별로 설명합니다.
                  </p>
                }
              />

              <AdSlot slot="guide-business-vs-other-income-top" format="horizontal" />

              {/* 핵심 요약 */}
              <section aria-label="핵심 요약" className="card border-l-4 border-l-primary-500">
                <h2 className="mb-4 text-2xl font-bold text-primary-700 dark:text-primary-300">핵심 정리</h2>
                <div className="mb-4 overflow-x-auto">
                  <table className="w-full text-sm" data-speakable>
                    <caption className="mb-2 text-left font-semibold text-text-primary">사업소득 vs 기타소득 분류표</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th className="px-3 py-2 text-left">구분</th>
                        <th className="px-3 py-2 text-left">사업소득</th>
                        <th className="px-3 py-2 text-left">기타소득</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="px-3 py-2 font-semibold">정의</td>
                        <td className="px-3 py-2 text-sm">계속·반복적 영리 활동</td>
                        <td className="px-3 py-2 text-sm">일시·우발적 소득</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="px-3 py-2 font-semibold">예시</td>
                        <td className="px-3 py-2 text-sm">매월 강의, 정기 프리랜서</td>
                        <td className="px-3 py-2 text-sm">1~2회 강의, 상금</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="px-3 py-2 font-semibold">필요경비율</td>
                        <td className="px-3 py-2 text-sm">70~80% (선택)</td>
                        <td className="px-3 py-2 text-sm">60~80% (정률)</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="px-3 py-2 font-semibold">세율</td>
                        <td className="px-3 py-2 text-sm">누진세 6~45%</td>
                        <td className="px-3 py-2 text-sm">분리과세 22% or 합산</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="px-3 py-2 font-semibold">4대보험</td>
                        <td className="px-3 py-2 text-sm">의무 가입</td>
                        <td className="px-3 py-2 text-sm">선택 가능</td>
                      </tr>
                      <tr>
                        <td className="px-3 py-2 font-semibold">신고 의무</td>
                        <td className="px-3 py-2 text-sm">필수</td>
                        <td className="px-3 py-2 text-sm">300만 초과 시 필수</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="rounded-lg bg-primary-500/10 p-4 text-sm text-primary-700 dark:text-primary-300">
                  <p className="font-semibold">TL;DR</p>
                  <ul className="mt-2 list-inside list-disc space-y-1">
                    <li>
                      <strong>정기적 강의·프리랜서:</strong> 사업소득 (누진세 + 4대보험 의무)
                    </li>
                    <li>
                      <strong>1회성 강의·상금:</strong> 기타소득 (분리과세 22% 선택 가능, 300만 이하)
                    </li>
                    <li>
                      <strong>필요경비 차이:</strong> 같은 200만도 필요경비 60% vs 80% 차이로 세금 2배
                    </li>
                    <li>
                      <strong>가산세 위험:</strong> 잘못 분류 시 40% 중과세 (부정행위 판정)
                    </li>
                  </ul>
                </div>
              </section>

              {/* 1. 사업소득 vs 기타소득, 법적 정의 */}
              <section className="space-y-4">
                <h2 className="text-2xl font-bold">1. Q. 내 소득이 사업소득인지 기타소득인지 어떻게 판단하나요?</h2>
                <div className="rounded-lg bg-bg-card p-3 text-sm">
                  <p className="font-semibold text-text-primary">정의</p>
                  <p className="mt-1 text-text-secondary">
                    소득세법 §19(사업소득)와 §21(기타소득)의 핵심은 "<strong>계속성·반복성·영리목적</strong>" 여부입니다.
                    정기적으로 반복되는 일이면 사업소득, 일시적·우발적이면 기타소득입니다.
                  </p>
                </div>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  법적 정의를 풀어 설명하면 다음과 같습니다. 사업소득(소득세법 §19)은 "계속 또는 반복적으로 영리 목적의 활동을 하여
                  얻는 소득"입니다. 반대로 기타소득(소득세법 §21)은 "순간적·일시적·우발적 사건으로 인한 소득으로 다른 소득에 속하지
                  아니하는 소득"입니다. 따라서 판정의 핵심은 <strong>정기성·계속성</strong>입니다.
                </p>

                <div className="space-y-3 rounded-lg bg-bg-raised p-4">
                  <p className="font-semibold text-text-primary">판정 기준 3가지</p>
                  <div className="space-y-2 text-sm text-text-secondary">
                    <div className="rounded-lg bg-bg-card p-3">
                      <p className="font-semibold text-text-primary">① 정기성·반복성</p>
                      <p className="mt-1">
                        매달 정해진 시간에 강의하나? 연중 1~2회 특강인가? 연 1회 특강은 기타소득 가능성, 매월 또는 매주 정기 강의는
                        사업소득.
                      </p>
                    </div>

                    <div className="rounded-lg bg-bg-card p-3">
                      <p className="font-semibold text-text-primary">② 영리 목적 여부</p>
                      <p className="mt-1">
                        소득을 얻기 위해 의도적으로 활동하는가? 대부분의 강의·프리랜서는 영리 목적이므로, 정기성 판정이 더 중요합니다.
                      </p>
                    </div>

                    <div className="rounded-lg bg-bg-card p-3">
                      <p className="font-semibold text-text-primary">③ 조직·시설 여부</p>
                      <p className="mt-1">
                        사무실을 두고 종업원을 고용하나? 사업장 증설이나 고정자산 투자가 있나? 있을수록 사업소득 가능성이 높습니다.
                        다만 프리랜서는 이것이 없어도 정기성이 있으면 사업소득입니다.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border-l-2 border-l-danger-500 bg-danger-500/5 p-4 text-sm text-text-secondary">
                  <p className="font-semibold text-danger-700 dark:text-danger-300">주의: 가산세 위험</p>
                  <p className="mt-2">
                    국세청과 세무조사에서는 "실질과세 원칙"(국세기본법 §14)을 적용합니다. 공식상 사업소득인데 기타소득으로 신고하면
                    부정행위로 판정되어 가산세 40%가 부과됩니다. 4대보험 미가입 여부가 주요 적발 단초입니다.
                  </p>
                </div>
              </section>

              {/* 2. 필요경비율 차이 */}
              <section className="space-y-4">
                <h2 className="text-2xl font-bold">
                  2. Q. 필요경비가 60%냐 80%냐에 따라 세금이 얼마나 달라지나요?
                </h2>
                <div className="rounded-lg bg-bg-card p-3 text-sm">
                  <p className="font-semibold text-text-primary">정의</p>
                  <p className="mt-1 text-text-secondary">
                    소득세법 시행령 §87에서 기타소득 종류별로 필요경비율(정률)을 정했습니다. 강사료·원고료는 60%, 인적용역(원고료 외)은
                    60%, 일시문예활동(저술·공연·강연)은 80%입니다.
                  </p>
                </div>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  같은 200만 원을 받아도 필요경비율이 60%면 소득금액 80만 원, 80%면 소득금액 40만 원입니다. 이것이 세액에 반영되므로
                  매우 중요합니다. 특히 기타소득은 필요경비 증빙이 없어도 <strong>정률이 자동 적용</strong>되므로 분류가 절대적입니다.
                </p>

                <div className="space-y-3 rounded-lg bg-bg-raised p-4">
                  <p className="font-semibold text-text-primary">필요경비율 분류 (소득세법 시행령 §87)</p>
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs text-text-secondary border-collapse">
                      <thead>
                        <tr className="border-b border-border-base">
                          <th className="px-2 py-1 text-left">기타소득 종류</th>
                          <th className="px-2 py-1 text-right">필요경비율</th>
                          <th className="px-2 py-1 text-left">예시</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-border-base">
                          <td className="px-2 py-1">강사료</td>
                          <td className="px-2 py-1 text-right font-semibold">60%</td>
                          <td className="px-2 py-1">학원·대학 강사, 온라인 강의</td>
                        </tr>
                        <tr className="border-b border-border-base">
                          <td className="px-2 py-1">원고료</td>
                          <td className="px-2 py-1 text-right font-semibold">60%</td>
                          <td className="px-2 py-1">신문·잡지 기고, 블로그 협찬</td>
                        </tr>
                        <tr className="border-b border-border-base">
                          <td className="px-2 py-1">인적용역료</td>
                          <td className="px-2 py-1 text-right font-semibold">60%</td>
                          <td className="px-2 py-1">컨설팅, 자문료, 설계비</td>
                        </tr>
                        <tr className="border-b border-border-base bg-primary-500/5">
                          <td className="px-2 py-1 font-semibold">일시문예활동비</td>
                          <td className="px-2 py-1 text-right font-semibold">80%</td>
                          <td className="px-2 py-1">저술료, 공연료, 출연료</td>
                        </tr>
                        <tr>
                          <td className="px-2 py-1">기타 상금·보상</td>
                          <td className="px-2 py-1 text-right font-semibold">80%</td>
                          <td className="px-2 py-1">상금, 상여금(근로 외)</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="space-y-3 rounded-lg bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">실제 세액 차이 사례</p>
                  <div className="space-y-2 text-sm text-text-secondary">
                    <div className="mb-3 rounded-lg bg-bg-raised p-3">
                      <p className="font-semibold text-text-primary">강사료 200만 원 (필요경비 60%)</p>
                      <ul className="mt-2 list-inside list-disc space-y-1">
                        <li>소득금액 = 200만 × 60% = 80만</li>
                        <li>분리과세 선택: 80만 × 22% = 약 17.6만 원</li>
                        <li className="text-xs italic text-text-tertiary">→ 수령액: 약 182.4만 원</li>
                      </ul>
                    </div>

                    <div className="rounded-lg bg-bg-raised p-3">
                      <p className="font-semibold text-text-primary">저술료 200만 원 (필요경비 80%)</p>
                      <ul className="mt-2 list-inside list-disc space-y-1">
                        <li>소득금액 = 200만 × 80% = 40만</li>
                        <li>분리과세 선택: 40만 × 22% = 약 8.8만 원</li>
                        <li className="font-semibold text-primary-600">수령액: 약 191.2만 원 (강사료보다 약 8.8만 유리)</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border-l-4 border-l-highlight-500 bg-highlight-500/5 p-4 text-sm text-text-secondary">
                  <p className="font-semibold text-text-primary">주의</p>
                  <p className="mt-2">
                    필요경비율은 <strong>분류(기타소득 내에서의 종류)가 정해지면 자동 적용</strong>됩니다. 증빙 유무와 관계없이 법정 정률을
                    사용하므로, 분류가 가장 중요합니다. 만약 강사료를 저술료로 신고하면 국세청이 이의 제기할 수 있습니다.
                  </p>
                </div>
              </section>

              {/* 3. 정기 강사 vs 1회성 강의 */}
              <section className="space-y-4">
                <h2 className="text-2xl font-bold">3. Q. 매월 강의 vs 연 1~2회 특강, 어디서 나뉘나요?</h2>
                <div className="rounded-lg bg-bg-card p-3 text-sm">
                  <p className="font-semibold text-text-primary">정의</p>
                  <p className="mt-1 text-text-secondary">
                    "정기성·반복성"의 법적 기준은 명시되지 않습니다. 따라서 실무에서는 과세관청(국세청, 세무조사)의 판단을 따르며, 대체로
                    매월 또는 매주 정기적이면 사업소득, 연 1~2회면 기타소득으로 봅니다.
                  </p>
                </div>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  소득세법에는 "계속·반복적"의 정확한 기준이 없으므로, 실무에서는 여러 신호를 종합합니다. 가장 큰 신호는
                  <strong>4대보험(국민연금·건강보험)의 납부 유무</strong>입니다. 사업소득자는 국민연금과 건강보험 (프리랜서 가입)을 해야
                  하므로, 4대보험이 없으면 기타소득일 가능성이 높습니다. 또한 <strong>영수증·계약서의 정기성 표현</strong>도 중요합니다.
                </p>

                <div className="space-y-3 rounded-lg bg-bg-raised p-4">
                  <p className="font-semibold text-text-primary">사업소득 vs 기타소득 판정 신호</p>
                  <div className="space-y-2 text-sm text-text-secondary">
                    <div className="rounded-lg bg-bg-card p-3">
                      <p className="font-semibold text-text-primary">사업소득으로 봐야 할 신호</p>
                      <ul className="mt-2 list-inside list-disc space-y-1">
                        <li>매월 고정 강사 계약 (월급제 또는 고정 커미션)</li>
                        <li>사업자등록증 발급 (사업소득 신고 가능)</li>
                        <li>4대보험 납부 (국민연금, 건강보험)</li>
                        <li>"강사" 직책으로 표기 (고용 관계 의심)</li>
                      </ul>
                    </div>

                    <div className="rounded-lg bg-bg-card p-3">
                      <p className="font-semibold text-text-primary">기타소득으로 봐야 할 신호</p>
                      <ul className="mt-2 list-inside list-disc space-y-1">
                        <li>연 1~2회 외부 초청 강의</li>
                        <li>정해진 강사가 아닌 "특강" 명시</li>
                        <li>4대보험 미납부 (피용인이 아님)</li>
                        <li>일회성 계약 또는 프로젝트 기반</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 rounded-lg bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">정기성 판정 실제 사례</p>
                  <div className="space-y-2 text-sm text-text-secondary">
                    <div className="mb-3 rounded-lg bg-bg-raised p-3">
                      <p className="font-semibold text-text-primary">사례 A: 매월 수요일 저녁 강사료 100만</p>
                      <ul className="mt-2 list-inside list-disc space-y-1">
                        <li>매월 정기 → 사업소득 (국민연금·건강보험 의무 가입)</li>
                        <li>세율: 누진세 6~15% (근로소득과 합산)</li>
                        <li className="text-xs italic text-text-tertiary">→ 4대보험 없으면 세무조사 위험</li>
                      </ul>
                    </div>

                    <div className="rounded-lg bg-bg-raised p-3">
                      <p className="font-semibold text-text-primary">사례 B: 연 3회 대학 특강료 각 100만</p>
                      <ul className="mt-2 list-inside list-disc space-y-1">
                        <li>연 3회 (경계선) → 기타소득 가능성 높음</li>
                        <li>세율: 분리과세 22% 선택 또는 합산 (300만 이상)</li>
                        <li className="text-xs italic text-text-tertiary">
                          → 300만 초과이므로 합산 신고 의무 (누진세 적용)
                        </li>
                      </ul>
                    </div>

                    <div className="rounded-lg bg-bg-raised p-3">
                      <p className="font-semibold text-text-primary">사례 C: 연 1회 학술대회 발표료 200만</p>
                      <ul className="mt-2 list-inside list-disc space-y-1">
                        <li>연 1회 (일시적) → 기타소득 확실</li>
                        <li>세율: 분리과세 22% (200만 ≤ 300만)</li>
                        <li className="font-semibold text-primary-600">신고 면제 가능 (분리과세 선택 시)</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border-l-2 border-l-primary-500 bg-primary-500/5 p-4 text-sm text-text-secondary">
                  <p className="font-semibold text-text-primary">결론</p>
                  <p className="mt-2">
                    정기성은 명확한 법칙이 없으므로, <strong>보수적으로는 매월 고정 강사는 사업소득, 연 1~3회는 세무사 상담을 권장</strong>
                    합니다. 4대보험 납부 여부가 큰 신호이므로, 신고 전에 국세청 상담 또는 세무사 확인이 안전합니다.
                  </p>
                </div>
              </section>

              <AdSlot slot="guide-business-vs-other-income-mid" format="rectangle" />

              {/* 4. 누진세율 vs 분리과세 */}
              <section className="space-y-4">
                <h2 className="text-2xl font-bold">
                  4. Q. 사업소득 누진세(6~45%)와 기타소득 분리과세(22%)는 어느 게 더 유리한가요?
                </h2>
                <div className="rounded-lg bg-bg-card p-3 text-sm">
                  <p className="font-semibold text-text-primary">정의</p>
                  <p className="mt-1 text-text-secondary">
                    사업소득은 다른 소득과 합산하여 누진세율(소득세법 §55)을 적용합니다. 반면 기타소득 300만 이하는 분리과세 22%(지방세
                    포함)를 선택할 수 있습니다(소득세법 §14 ⑦). 어느 것이 유리한지는 직장 소득과 기타소득의 규모에 따라 달라집니다.
                  </p>
                </div>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  기타소득이 작으면 분리과세(22%)가 유리하지만, 직장 소득이 적으면 합산 후 누진공제를 받는 것이 더 유리할 수 있습니다.
                  예를 들어 직장 월급 1,500만 원 (과세표준 약 1,200만)에 기타소득 100만을 합산하면 과세표준 1,300만이 되어 세율 6%만
                  적용되므로, 분리과세(22%)보다 훨씬 유리합니다.
                </p>

                <div className="space-y-3 rounded-lg bg-bg-raised p-4">
                  <p className="font-semibold text-text-primary">누진세율 8단계 (소득세법 §55)</p>
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs text-text-secondary border-collapse">
                      <thead>
                        <tr className="border-b border-border-base">
                          <th className="px-2 py-1 text-left">과세표준</th>
                          <th className="px-2 py-1 text-right">세율</th>
                          <th className="px-2 py-1 text-right">누진공제</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-border-base">
                          <td className="px-2 py-1">~1,400만</td>
                          <td className="px-2 py-1 text-right">6%</td>
                          <td className="px-2 py-1 text-right">0</td>
                        </tr>
                        <tr className="border-b border-border-base">
                          <td className="px-2 py-1">~5,000만</td>
                          <td className="px-2 py-1 text-right">15%</td>
                          <td className="px-2 py-1 text-right">126만</td>
                        </tr>
                        <tr>
                          <td className="px-2 py-1">~8,800만</td>
                          <td className="px-2 py-1 text-right">24%</td>
                          <td className="px-2 py-1 text-right">576만</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="space-y-3 rounded-lg bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">분리과세 vs 합산 세액 비교</p>
                  <div className="space-y-2 text-sm text-text-secondary">
                    <div className="mb-3 rounded-lg bg-bg-raised p-3">
                      <p className="font-semibold text-text-primary">시나리오 A: 직장 1,500만 + 기타 100만 (강사료)</p>
                      <ul className="mt-2 list-inside list-disc space-y-1">
                        <li>분리과세: 100만 × 60% × 22% = 약 13.2만</li>
                        <li>합산: (1,200만 + 60만) × 6% = 75.6만</li>
                        <li className="font-semibold text-primary-600">합산이 더 유리 (약 62.4만 절감)</li>
                        <li className="text-xs italic text-text-tertiary">→ 직장 소득이 적으면 합산 권장</li>
                      </ul>
                    </div>

                    <div className="rounded-lg bg-bg-raised p-3">
                      <p className="font-semibold text-text-primary">시나리오 B: 직장 5,000만 + 기타 200만 (강사료)</p>
                      <ul className="mt-2 list-inside list-disc space-y-1">
                        <li>분리과세: 200만 × 60% × 22% = 약 26.4만</li>
                        <li>합산: (4,000만 + 120만) × 15% − 126만 = 약 456만</li>
                        <li>기타소득만 계산: 120만 × 15% ≈ 18만</li>
                        <li className="font-semibold text-danger-500">분리과세가 훨씬 유리 (약 8만 절감)</li>
                        <li className="text-xs italic text-text-tertiary">→ 직장 소득이 높으면 분리과세 선택권 활용</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border-l-4 border-l-highlight-500 bg-highlight-500/5 p-4 text-sm text-text-secondary">
                  <p className="font-semibold text-text-primary">선택 전략</p>
                  <p className="mt-2">
                    <strong>직장 소득 1,500~3,000만 범위:</strong> 기타소득을 합산하면 누진세가 6% 구간 유지 가능 → 합산 유리
                    <br />
                    <strong>직장 소득 5,000만 이상:</strong> 기타소득 분리과세(22%)가 20% 이상 절감 → 분리과세 권장
                    <br />
                    <strong>기타소득 300만 초과:</strong> 분리과세 불가능 → 합산 의무이므로 누진세 합산
                  </p>
                </div>
              </section>

              {/* 5. 300만 분리과세 선택권 */}
              <section className="space-y-4">
                <h2 className="text-2xl font-bold">5. Q. 기타소득 300만 이하 분리과세 선택권, 어떻게 쓰나요?</h2>
                <div className="rounded-lg bg-bg-card p-3 text-sm">
                  <p className="font-semibold text-text-primary">정의</p>
                  <p className="mt-1 text-text-secondary">
                    소득세법 §14 ⑦에서 기타소득이 300만 원 이하면 "분리과세 선택권"이 있습니다. 이를 선택하면 국세청이 22% 원천징수하고
                    신고 의무가 면제됩니다. 선택하지 않으면 다른 소득과 합산하여 종합과세합니다.
                  </p>
                </div>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  기타소득이 300만 원 이하면 두 가지 선택이 가능합니다. 첫째, 분리과세(22% 원천징수) 선택 시 5월 신고 의무가 면제되고,
                  국세청이 이미 22%를 공제한 것으로 종결됩니다. 둘째, 이 선택권을 포기하고 다른 소득(직장 월급 등)과 합산하여 신고하는
                  것입니다. 어느 것을 선택할지는 <strong>전체 소득세 계산 후 더 유리한 쪽</strong>을 선택하면 됩니다.
                </p>

                <div className="space-y-3 rounded-lg bg-bg-raised p-4">
                  <p className="font-semibold text-text-primary">300만 분리과세 선택 체크리스트</p>
                  <div className="space-y-2 text-sm text-text-secondary">
                    <div className="rounded-lg bg-bg-card p-3">
                      <p className="font-semibold text-text-primary">분리과세 선택해야 할 경우</p>
                      <ul className="mt-2 list-inside list-disc space-y-1">
                        <li>직장 소득 5,000만 이상 (높은 누진세 구간)</li>
                        <li>기타소득 300만 이하 (분리과세 선택권 있음)</li>
                        <li>신고 절차를 피하고 싶을 때</li>
                        <li>분리과세 22% &lt; 합산 누진세일 때</li>
                      </ul>
                    </div>

                    <div className="rounded-lg bg-bg-card p-3">
                      <p className="font-semibold text-text-primary">합산 신고해야 할 경우</p>
                      <ul className="mt-2 list-inside list-disc space-y-1">
                        <li>직장 소득이 적은 경우 (1,500~3,000만)</li>
                        <li>기타소득 합산 시 세율이 6% 유지되는 경우</li>
                        <li>부양가족·신용카드 공제로 환급받고 싶을 때</li>
                        <li>합산 누진세 &lt; 분리과세 22%일 때</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 rounded-lg bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">300만 분리과세 신고 절차</p>
                  <div className="space-y-2 text-sm text-text-secondary">
                    <div className="mb-3 rounded-lg bg-bg-raised p-3">
                      <p className="font-semibold text-text-primary">분리과세 선택 시</p>
                      <ul className="mt-2 list-inside list-disc space-y-1">
                        <li>국세청에서 이미 22% 원천징수 완료</li>
                        <li>5월 31일 종소세 신고 의무 면제</li>
                        <li>환급받을 것이 있으면 나중에 수정신고 가능</li>
                      </ul>
                    </div>

                    <div className="rounded-lg bg-bg-raised p-3">
                      <p className="font-semibold text-text-primary">합산 신고 선택 시</p>
                      <ul className="mt-2 list-inside list-disc space-y-1">
                        <li>5월 31일까지 종합소득세 신고 의무</li>
                        <li>홈택스에 직장 소득 + 기타소득 합산 신고</li>
                        <li>부양가족·신용카드 공제 다시 적용 가능</li>
                        <li>환급 또는 추가 납부 계산 (합산 누진세 기준)</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border-l-2 border-l-primary-500 bg-primary-500/5 p-4 text-sm text-text-secondary">
                  <p className="font-semibold text-text-primary">주의: "분리과세 포기 선택"은 홈택스에서</p>
                  <p className="mt-2">
                    기타소득 300만 이하 분리과세는 기본 선택입니다. 만약 합산하려면 5월 31일까지 홈택스 "종합소득세 신고" 페이지에서
                    "분리과세 배제 선택"을 명시해야 합니다. 선택하지 않으면 자동으로 분리과세로 처리됩니다.
                  </p>
                </div>
              </section>

              {/* 6. 4대보험 의무 */}
              <section className="space-y-4">
                <h2 className="text-2xl font-bold">6. Q. 사업소득과 기타소득은 4대보험 의무가 다르다고 하던데?</h2>
                <div className="rounded-lg bg-bg-card p-3 text-sm">
                  <p className="font-semibold text-text-primary">정의</p>
                  <p className="mt-1 text-text-secondary">
                    사업소득은 국민연금(4.5%) + 건강보험(3.5%)을 강제 가입해야 합니다. 기타소득은 선택 사항이므로 가입하지 않아도
                    법적으로 문제없습니다. 이것이 국세청의 주요 적발 신호입니다.
                  </p>
                </div>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  사업소득자는 개인사업자로 등록하고 국민연금(4개월 가입료 선납)과 건강보험(직업 기준 납부)을 의무 가입합니다. 반면 기타소득자는
                  근로소득이 있으면 직장 보험 피부양, 근로소득이 없으면 지역가입자로 선택 가입이 가능합니다. 따라서 <strong>4대보험 미납부 = 기타소득 신호</strong>가 되고, <strong>4대보험 납부 = 사업소득 신호</strong>가
                  됩니다.
                </p>

                <div className="space-y-3 rounded-lg bg-bg-raised p-4">
                  <p className="font-semibold text-text-primary">사업소득 vs 기타소득 4대보험 의무</p>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm border-collapse">
                      <thead>
                        <tr className="border-b border-border-base">
                          <th className="px-3 py-2 text-left">소득 종류</th>
                          <th className="px-3 py-2 text-left">국민연금</th>
                          <th className="px-3 py-2 text-left">건강보험</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-border-base">
                          <td className="px-3 py-2 font-semibold">사업소득 (프리랜서)</td>
                          <td className="px-3 py-2">의무 (4.5%)</td>
                          <td className="px-3 py-2">의무 (직업군별)</td>
                        </tr>
                        <tr>
                          <td className="px-3 py-2 font-semibold">기타소득</td>
                          <td className="px-3 py-2">선택 또는 피부양</td>
                          <td className="px-3 py-2">선택 또는 피부양</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="rounded-lg border-l-2 border-l-danger-500 bg-danger-500/5 p-4 text-sm text-text-secondary">
                  <p className="font-semibold text-danger-700 dark:text-danger-300">주의: 세무조사 신호</p>
                  <p className="mt-2">
                    국세청은 사업소득 신고자인데 4대보험 미가입이면 의심합니다. 특히 정기적 강사인데 국민연금·건강보험이 없으면 기타소득으로
                    신고한 이유를 묻게 되고, 이는 수정신고 또는 가산세로 이어질 수 있습니다.
                  </p>
                </div>
              </section>

              {/* 7. 체크리스트 */}
              <section className="space-y-4">
                <h2 className="text-2xl font-bold">7. 신고 전 분류 판정 최종 체크리스트</h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  5월 31일 신고 전에 다음을 확인하고 분류를 최종 결정하세요.
                </p>

                <div className="space-y-2 rounded-lg bg-bg-card p-4 text-sm">
                  <div className="flex items-start gap-2">
                    <input type="checkbox" id="check1" className="mt-1" />
                    <label htmlFor="check1" className="text-text-secondary">
                      <strong>정기성 판정</strong> — 매월? 매주? 연 1~2회? 연중 정기(봄·가을)?
                    </label>
                  </div>
                  <div className="flex items-start gap-2">
                    <input type="checkbox" id="check2" className="mt-1" />
                    <label htmlFor="check2" className="text-text-secondary">
                      <strong>계약서·영수증 확인</strong> — "정기 강사" vs "특강" vs "프로젝트" 표현?
                    </label>
                  </div>
                  <div className="flex items-start gap-2">
                    <input type="checkbox" id="check3" className="mt-1" />
                    <label htmlFor="check3" className="text-text-secondary">
                      <strong>4대보험 현황</strong> — 국민연금, 건강보험 가입 여부? (사업소득 의무)
                    </label>
                  </div>
                  <div className="flex items-start gap-2">
                    <input type="checkbox" id="check4" className="mt-1" />
                    <label htmlFor="check4" className="text-text-secondary">
                      <strong>소득액 규모</strong> — 연 몇 만원? 300만 이상? (분리과세 선택권 결정)
                    </label>
                  </div>
                  <div className="flex items-start gap-2">
                    <input type="checkbox" id="check5" className="mt-1" />
                    <label htmlFor="check5" className="text-text-secondary">
                      <strong>기타소득 종류</strong> — 강사료(60%)? 원고료(60%)? 저술료(80%)?
                    </label>
                  </div>
                  <div className="flex items-start gap-2">
                    <input type="checkbox" id="check6" className="mt-1" />
                    <label htmlFor="check6" className="text-text-secondary">
                      <strong>세액 비교</strong> —{' '}
                      <Link href="/calculator/freelancer-tax/" className="text-primary-600 underline">
                        프리랜서 종합소득세 계산기
                      </Link>
                      로 사업소득 vs 기타소득 세액 비교
                    </label>
                  </div>
                  <div className="flex items-start gap-2">
                    <input type="checkbox" id="check7" className="mt-1" />
                    <label htmlFor="check7" className="text-text-secondary">
                      <strong>전문가 상담</strong> — 불확실하면 세무사 또는 국세청 상담 (상담료 10~30만 vs 가산세 40%)
                    </label>
                  </div>
                </div>
              </section>

              <FaqSection items={[...FAQ_ITEMS]} />

              {/* 최종 주의사항 */}
              <section className="card border-l-2 border-l-danger-500 bg-danger-500/5">
                <h2 className="mb-3 text-lg font-semibold text-danger-700 dark:text-danger-300">최종 주의사항</h2>
                <ul className="space-y-2 text-sm text-danger-700 dark:text-danger-300">
                  <li>
                    • <strong>정기 강사는 사업소득:</strong> 월 1회 이상 정기적이면 사업소득 의무. 4대보험 미납부 시 세무조사 위험.
                  </li>
                  <li>
                    • <strong>기타소득 300만 선택권:</strong> 분리과세(22%) vs 합산 중 더 유리한 쪽 선택. 합산하려면 홈택스에서 명시.
                  </li>
                  <li>
                    • <strong>필요경비율 자동 적용:</strong> 강사료 60%, 저술료 80%. 증빙 없어도 정률 적용되므로 분류가 절대적.
                  </li>
                  <li>
                    • <strong>실질과세 원칙:</strong> 공식상 기타소득이라도 실질은 사업소득으로 판단되면 누진세 + 가산세 40% 부과.
                  </li>
                  <li>
                    • <strong>5월 31일(금) 마감:</strong> 주말이므로 6월 2일(월) 자동 연장. 6월 신고 시 자진신고 감면(50%).
                  </li>
                  <li>
                    • <strong>불확실하면 세무사:</strong> 수수료 10~50만 vs 가산세 위험. 전문가 상담 강력 권장.
                  </li>
                </ul>
              </section>

              {/* 관련 링크 */}
              <section className="card">
                <h2 className="mb-4 text-lg font-semibold">관련 계산기·가이드</h2>
                <ul className="space-y-2 text-sm">
                  <li>
                    →{' '}
                    <Link href="/calculator/freelancer-tax/" className="text-primary-600 underline dark:text-primary-500">
                      프리랜서 종합소득세 계산기
                    </Link>
                    {' '}— 사업소득 경비율별 세액 계산
                  </li>
                  <li>
                    →{' '}
                    <Link href="/guide/n-jobber-comprehensive-income-tax-2026/" className="text-primary-600 underline dark:text-primary-500">
                      N잡러 종합소득세 합산 신고 2026
                    </Link>
                    {' '}— 부업 소득 합산 규칙 + 누진세율
                  </li>
                  <li>
                    →{' '}
                    <Link
                      href="/guide/freelancer-simplified-vs-standard-expense-rate-2026/"
                      className="text-primary-600 underline dark:text-primary-500"
                    >
                      프리랜서 단순경비율 vs 기준경비율 2026
                    </Link>
                    {' '}— 사업소득 경비율 선택 기준
                  </li>
                  <li>
                    →{' '}
                    <Link href="/guide/may-comprehensive-income-tax/" className="text-primary-600 underline dark:text-primary-500">
                      5월 종합소득세 신고 완벽 가이드
                    </Link>
                    {' '}— 신고 대상·기한·절세 5가지
                  </li>
                  <li>
                    →{' '}
                    <Link href="/calculator/salary/" className="text-primary-600 underline dark:text-primary-500">
                      연봉 실수령액 계산기
                    </Link>
                    {' '}— 직장 소득 기준 세액 확인
                  </li>
                </ul>
              </section>

              <ShareButtons
                title="사업소득 vs 기타소득 분류 완벽 가이드 2026"
                url={URL}
                description="강사료·원고료가 사업소득일까 기타소득일까? 필요경비 차이(60% vs 80%), 누진세 vs 분리과세 22%, 40% 가산세 회피."
              />

              {/* 출처 및 면책 */}
              <section
                aria-label="출처 및 면책"
                className="rounded-lg border border-border-base p-4 text-caption text-text-tertiary"
              >
                <p className="mb-2">
                  <strong>법적 근거</strong>: 소득세법 §14 (종합소득과세표준·소득의 합산·분리과세) · §19 (사업소득) · §21
                  (기타소득) · §37 (기타소득의 필요경비) · §55 (세율) · §70 (확정신고) · 소득세법 시행령 §87
                  (필요경비율). 참고:{' '}
                  <a
                    href="https://www.hometax.go.kr/guide/0202000000.jsp"
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="text-primary-600 underline dark:text-primary-500"
                  >
                    국세청 종합소득세 신고 안내
                  </a>
                  ,{' '}
                  <a
                    href="https://www.nts.go.kr"
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="text-primary-600 underline dark:text-primary-500"
                  >
                    국세청 (nts.go.kr)
                  </a>
                  .
                </p>
                <p className="mb-2">
                  <strong>면책 조항</strong>: 본 가이드는 정보 제공 목적이며 세무·법적 조언이 아닙니다. 개별 상황과 과세관청의 판단에 따라
                  분류가 달라질 수 있으므로, 실제 신고 전 세무사 또는 국세청 상담을 받으시기 바랍니다.
                </p>
                <p>
                  <strong>AI 보조 작성</strong>: 본 가이드는 AI 보조 작성 후 운영자 검수를 거쳤습니다(Google AI Content Policy
                  준수). 업데이트: {DATE_MODIFIED}
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
