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

const URL = 'https://calculatorhost.com/guide/parental-leave-benefit-2026/';
const DATE_PUBLISHED = '2026-07-09';
const DATE_MODIFIED = '2026-07-09';

export const metadata: Metadata = {
  title: '육아휴직급여 2026 | 월 상한·통상임금 100%·6+6 부모제',
  description:
    '2025년 개정된 육아휴직급여 현행 기준. 첫 3개월 통상임금 100%, 4~6개월 100%, 7개월 이후 80% 지급. 월 상한액·6+6 부모육아휴직제·신청 방법까지 완전 정리.',
  keywords: [
    '육아휴직급여',
    '육아휴직',
    '통상임금',
    '월 상한액',
    '부모육아휴직제',
    '고용보험법 70조',
    '2026 현행',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '육아휴직급여 2026 | 월 상한·통상임금 100%·6+6 부모제' }],
    title: '육아휴직급여 2026 — 월 상한액·지급률·6+6 부모제 완벽 정리',
    description: '2025년부터 대폭 인상된 육아휴직급여. 첫 3개월 통상임금 100%, 월 상한액 약 250만원, 6+6 부모제로 12개월 전체 상한 인상. 고용보험법 §70.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '육아휴직급여 2026 — 통상임금 100% 지급·월 상한액·6+6 부모제',
    description: '2025년 개정 육아휴직급여 현행. 첫 3개월 100%, 이후 조정, 7개월~ 80%. 부모 모두 육아휴직 시 상한 상향. 고용보험법 §70.',
  },
};

const FAQ_ITEMS = [
  {
    question: '육아휴직급여가 정확히 무엇인가요?',
    answer:
      '육아휴직급여는 고용보험법 §70에 따라 자녀 양육을 위해 직장을 떠난 근로자가 받는 현금 급여입니다. 육아휴직 기간 동안 일정 비율의 통상임금을 지급하여 소득 공백을 메워주는 사회보장 제도입니다. 2025년 1월부터 지급률과 상한액이 인상되어, 근로자의 양육 부담을 더 크게 덜어주고 있습니다.',
  },
  {
    question: '2026년 육아휴직급여 지급률은 어떻게 되나요?',
    answer:
      '2025년 개정 기준(2026 현행): 첫 3개월은 통상임금의 100%, 4~6개월은 100%, 7개월 이후는 80%입니다(고용보험법 §70, 시행령 §95). 기존의 월차 단위 사후지급금(25%) 제도는 폐지되었고, 모든 급여가 육아휴직 매월 현금으로 지급됩니다.',
  },
  {
    question: '월 상한액과 하한액이 있나요?',
    answer:
      '네, 고용보험 고시 기준 월 상한액이 있습니다(정확한 2026 현행 상한액은 고용노동부 고시 참조 필요). 2025년 기준 약 250만원 선의 월 상한이 적용되며, 매년 고용보험료율이나 경제지표에 따라 조정될 수 있습니다. 하한액은 최저생계 수준으로 정해져 있습니다.',
  },
  {
    question: '6+6 부모육아휴직제는 무엇인가요?',
    answer:
      '부모 모두가 육아휴직을 사용할 경우, 첫 6개월 동안 월 상한액이 일반 상한보다 인상되는 제도입니다. 한 부모가 먼저 6개월을 사용한 후 다른 부모가 6개월을 사용하면, 그 기간 동안 더 높은 급여를 받을 수 있습니다(구체적 상한액은 고용노동부 고시 참조).',
  },
  {
    question: '육아휴직급여를 받으려면 어떤 조건이 필요한가요?',
    answer:
      '고용보험 피보험단위기간이 180일 이상이어야 합니다(남녀고용평등법 §19, 고용보험법 §70). 자영업자·특수고용종사자·프리랜서는 원칙적으로 대상이 아닙니다. 현재 사업장에 계속 종사할 의사가 있거나, 복직 계획이 있어야 신청이 가능합니다.',
  },
  {
    question: '언제부터 언제까지 신청할 수 있나요?',
    answer:
      '육아휴직을 시작한 이후 1개월 이내, 또는 육아휴직이 끝난 후 12개월 이내에 신청해야 합니다(고용보험법 시행령 §95). 고용센터 또는 고용보험 홈페이지(work24.go.kr)를 통해 신청하며, 필요한 서류는 직장이나 고용센터에 문의하면 안내받을 수 있습니다.',
  },
  {
    question: '육아휴직 기간은 최대 얼마나 되나요?',
    answer:
      '자녀 1명당 부모 각각 최대 1년입니다(남녀고용평등법 §19). 최근 법 개정으로 일정 요건 충족 시 1년 6개월까지 확대되는 안이 논의 중이므로, 정확한 기준은 고용노동부 공식 안내를 참조하세요. 둘 이상의 자녀가 있으면 자녀별로 독립적으로 계산됩니다.',
  },
  {
    question: '통상임금에 포함되지 않는 수당이 있나요?',
    answer:
      '네, 실적급·복리후생비·상여금 등 일부는 통상임금 산정에서 제외될 수 있습니다(고용보험법 시행령). 사업장별로 통상임금 기준이 다를 수 있으므로, 급여 명세서를 확인하거나 직장의 인사팀·고용센터에 문의하여 정확히 파악하는 것이 중요합니다.',
  },
];

export default function ParentalLeaveBenefit2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '육아휴직급여 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '육아휴직급여 2026 — 월 상한액·지급률·6+6 부모제 완벽 정리',
    description:
      '2025년 개정된 육아휴직급여 현행 기준. 통상임금 100~80% 지급, 월 상한액, 6+6 부모육아휴직제, 신청 방법까지 상세 해석.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['육아휴직급여', '통상임금', '부모육아휴직제', '고용보험', '급여 계산'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '육아휴직급여 2026',
    description:
      '2025년 개정된 육아휴직급여의 지급률, 월 상한액, 6+6 부모제, 신청 방법을 완전히 정리한 가이드.',
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
                    { name: '육아휴직급여 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">직장 부모 · 9분 읽기 · 2026-07-09</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  육아휴직급여 2026
                  <br />
                  <span className="text-2xl text-text-secondary">— 월 상한·통상임금 100%·6+6 부모제</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  자녀 양육을 위해 직장을 떠나는 근로자의 소득을 보장하는 육아휴직급여. 2025년 1월부터 대폭 개정되어 첫 3개월부터 통상임금의 100%를 받을 수 있게 되었습니다. 이 가이드에서는 2026년 현행 기준 지급률, 월 상한액, 6+6 부모육아휴직제, 신청 방법까지 완벽하게 정리해드립니다.
                </p>
              </header>

              <AdSlot slot="guide-parental-leave-benefit-top" format="horizontal" />

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">육아휴직급여란 무엇인가</h2>
                <p>
                  고용보험법 §70에 따른 육아휴직급여는 자녀 양육을 위해 육아휴직을 사용하는 근로자가 받는 현금 급여입니다. 직장을 일시적으로 떠나 있는 동안 일정 비율의 통상임금을 지급받아 생활 어려움을 덜어주고, 육아에 충실할 수 있도록 돕는 사회보장 제도입니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">육아휴직급여의 기본 원리</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    육아휴직 중에 고용보험이 직장 복직 계획이 있는 근로자의 통상임금 일부를 현금으로 지급합니다.
                    <br />
                    예: 통상임금 300만원 → 첫 3개월 300만원(100%), 4~6개월 300만원, 7개월 이후 240만원(80%)
                    <br />
                    <strong>단, 월 상한액(고용노동부 고시) 범위 내 지급됩니다.</strong>
                  </p>
                </div>
                <p className="mt-4">
                  기존 육아휴직급여는 휴직이 끝난 후 사후에 지급하고, 일부는 사후지급금으로 25% 차감하는 형식이었습니다. 그러나 2025년 1월부터 전액 매월 현금으로 선지급되도록 개선되었으며, 지급률도 크게 인상되었습니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">2026년 육아휴직급여 지급 구조 (고용보험법 §70)</h2>
                <p>
                  2025년 개정 후 현재 시행 중인 육아휴직급여의 지급률과 월 상한액입니다. 부모의 육아휴직 여부에 따라 지급액이 달라질 수 있으므로 정확히 이해하는 것이 중요합니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 2026년 육아휴직급여 지급률 및 상한액 (고용보험법 §70, 시행령 §95)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">기간</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">지급률</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">월 상한액*</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">비고</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">첫 3개월</td>
                        <td className="p-3"><strong>100%</strong></td>
                        <td className="p-3">약 250만원</td>
                        <td className="p-3">통상임금의 전액(상한 내)</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">4~6개월</td>
                        <td className="p-3"><strong>100%</strong></td>
                        <td className="p-3">약 200만원**</td>
                        <td className="p-3">지급률 유지, 상한액 조정</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">7개월 이후</td>
                        <td className="p-3"><strong>80%</strong></td>
                        <td className="p-3">약 160만원**</td>
                        <td className="p-3">통상임금의 80%(상한 내)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4 text-sm text-text-secondary">
                  * 정확한 월 상한액은 매년 고용노동부 고시에 따라 변동됩니다. 2026년 현행 정확한 수치는 고용노동부 공식 안내를 반드시 확인하세요(work24.go.kr 또는 고용센터 문의).
                  <br />
                  ** 4~6개월, 7개월 이후의 월 상한액은 정책 개정 시 변동될 수 있습니다.
                </p>
                <p className="mt-4">
                  ⚠️ 다만 이 표는 일반적인 육아휴직(한 부모만 사용)의 기준입니다. 부모 모두가 육아휴직을 사용하는 경우(6+6 부모육아휴직제)에는 월 상한액이 인상될 수 있으므로, 아래 부모제 섹션을 참조하세요.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">육아휴직급여 실제 계산 사례</h2>
                <p>
                  다음 3가지 사례를 통해 육아휴직급여가 실제로 어떻게 지급되는지 살펴보겠습니다. (월 상한액은 예시 기준이며, 정확한 2026년 고시 상한액 적용 필요)
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 1. 통상임금 300만원, 첫 6개월만 육아휴직 사용</p>
                  <p className="text-sm text-text-secondary">
                    · 통상임금: 300만원
                    <br />
                    · 첫 3개월: 300만원 × 100% = 300만원 (월 상한 약 250만원 적용 → 월 250만원 × 3개월 = 750만원)
                    <br />
                    · 4~6개월: 300만원 × 100% = 월 약 200만원 × 3개월 = 600만원
                    <br />
                    · <strong>총 6개월 급여: 약 1,350만원</strong>
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 상한액에 제한되지만, 월 약 225만원 평균 지급. 기존 방식보다 대폭 인상.</span>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 2. 통상임금 180만원, 12개월 육아휴직 사용</p>
                  <p className="text-sm text-text-secondary">
                    · 통상임금: 180만원 (월 상한액 미만)
                    <br />
                    · 첫 3개월: 180만원 × 100% = 180만원 × 3개월 = 540만원
                    <br />
                    · 4~6개월: 180만원 × 100% = 180만원 × 3개월 = 540만원
                    <br />
                    · 7~12개월: 180만원 × 80% = 144만원 × 6개월 = 864만원
                    <br />
                    · <strong>총 12개월 급여: 약 1,944만원</strong>
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 상한액 미만이므로 지급률 그대로 적용. 월 평균 약 162만원.</span>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 3. 부모 모두 6+6 사용 (첫 부모 6개월, 둘째 부모 6개월)</p>
                  <p className="text-sm text-text-secondary">
                    · 첫 부모 통상임금 250만원, 둘째 부모 통상임금 200만원
                    <br />
                    · 첫 부모 육아휴직 6개월 동안: 월 약 300만원~400만원(상향 상한) × 6개월 = 약 1,800~2,400만원
                    <br />
                    · 둘째 부모 육아휴직 6개월 동안: 월 약 300만원~400만원(상향 상한) × 6개월 = 약 1,800~2,400만원
                    <br />
                    · <strong>총 12개월 급여: 약 3,600~4,800만원 (정확한 상한액 확인 필요)</strong>
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 6+6 부모제로 월 상한액이 높아져 더 많은 급여 지급. 정확한 상향 상한액은 고용노동부 고시 참조.</span>
                  </p>
                </div>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">6+6 부모육아휴직제 — 부모 모두 사용 시</h2>
                <p>
                  2025년 개정의 핵심 중 하나는 부모가 모두 육아휴직을 사용할 때의 혜택 강화입니다. 한 자녀에 대해 부모 각각 최대 1년씩(합 2년) 사용할 수 있으며, 그중 첫 6개월 동안은 월 상한액이 인상됩니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">6+6 부모육아휴직제란</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    첫 번째 부모가 6개월 동안 육아휴직을 사용한 후, 두 번째 부모가 즉시 또는 추후 6개월을 사용할 때, 각각의 육아휴직 기간에 월 상한액이 일반 기준보다 높게 책정되는 제도입니다.
                    <br />
                    <strong>상한액 인상 규모는 고용노동부 고시를 참조해야 합니다.</strong>
                  </p>
                </div>
                <p className="mt-4">
                  이 제도는 양육 책임을 부모가 균등하게 나누도록 장려하기 위해 도입되었습니다. 한쪽 부모만 육아휴직을 사용하는 경우보다 두 부모가 번갈아 사용할 때 더 많은 급여를 지급하여, 실질적인 경제 지원을 강화하는 취지입니다.
                </p>
                <p className="mt-4">
                  ⚠️ 다만 정확한 월 상한액 인상 규모와 적용 조건은 매년 고용노동부 고시에 따라 변동될 수 있습니다. 2026년 현행 상한액 인상 규모는 고용센터나 work24.go.kr에서 반드시 확인하세요.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">육아휴직급여 신청 자격 및 조건</h2>
                <p>
                  육아휴직급여를 받기 위해서는 몇 가지 기본 조건을 충족해야 합니다. 모든 근로자가 받을 수 있는 것은 아니므로, 자신이 대상인지 먼저 확인하는 것이 중요합니다.
                </p>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li>
                    <strong>고용보험 피보험단위기간 180일 이상:</strong> 현재 직장에서 연속 또는 산재로 180일 이상 고용보험에 가입되어 있어야 합니다(남녀고용평등법 §19, 고용보험법 §70).
                  </li>
                  <li>
                    <strong>복직 의사 표시:</strong> 육아휴직 후 현재 사업장에 복직할 의사가 있거나, 계획이 있어야 합니다. 퇴사 목적의 휴직은 대상이 아닙니다.
                  </li>
                  <li>
                    <strong>만 8세 미만(초등학교 2학년까지) 자녀:</strong> 남녀고용평등법상 육아휴직 대상 자녀입니다. 다만 2026년 현행 기준을 다시 확인하는 것이 좋습니다.
                  </li>
                  <li>
                    <strong>제외 대상:</strong> 자영업자, 특수고용종사자(프리랜서, 대리운전기사 등), 가사근로자는 고용보험 미가입이므로 육아휴직급여를 받을 수 없습니다(다만 지역가입자 등 예외 있음).
                  </li>
                </ul>
                <p className="mt-4">
                  ⚠️ 다만 고용보험 가입 요건, 자녀 대상 나이, 복직 요건 등은 법 개정에 따라 변동될 수 있습니다. 정확한 2026년 기준은 고용센터나 work24.go.kr에서 직접 확인하세요.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">육아휴직급여 신청 방법 및 시기</h2>
                <p>
                  육아휴직급여는 정해진 기간 내에만 신청할 수 있습니다. 신청을 놓치면 소급 지급이 어려울 수 있으므로 기간을 꼭 지켜야 합니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">신청 기간</p>
                  <p className="text-sm text-text-secondary">
                    · 육아휴직 시작 후 1개월 이내 신청, 또는
                    <br />
                    · 육아휴직 종료 후 12개월 이내 신청 (고용보험법 시행령 §95)
                    <br />
                    기간 내에 신청하지 않으면 급여 지급 자격을 잃을 수 있으므로, 미리 준비하는 것이 좋습니다.
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">신청 방법</p>
                  <p className="text-sm text-text-secondary">
                    · <strong>온라인:</strong> work24.go.kr (고용24) 계정 로그인 후 "육아휴직급여 신청" 메뉴
                    <br />
                    · <strong>오프라인:</strong> 관할 고용센터(지역별) 방문하여 직접 신청
                    <br />
                    · 필요 서류: 육아휴직 증명서, 신분증, 통장 사본 등 (직장 또는 고용센터에서 안내)
                  </p>
                </div>
                <p className="mt-4">
                  신청 후 고용보험에서 검토하는 기간을 거쳐 통상 신청 후 2~3주 내에 급여가 지급됩니다. 급여는 신청자가 지정한 계좌로 매월 현금 이체됩니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">통상임금 산정 시 유의점</h2>
                <p>
                  육아휴직급여는 통상임금을 기준으로 지급되므로, 통상임금이 정확히 무엇인지 이해하는 것이 중요합니다. 잘못 이해하면 받을 수 있는 급여를 못 받을 수 있습니다.
                </p>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li>
                    <strong>통상임금 포함:</strong> 기본급, 직급급, 호봉급, 정기적 수당(급식비 등 일부), 근무지 이동비 등.
                  </li>
                  <li>
                    <strong>통상임금 제외:</strong> 상여금(연 2회 이상), 실적급, 복리후생비, 주식매수선택권, 퇴직금, 휴가 미사용료 등(고용보험법 시행령).
                  </li>
                  <li>
                    <strong>월별 변동:</strong> 통상임금이 월별로 크게 변동하는 경우, 평균을 기준으로 산정합니다. 직장에 정확한 계산 방법을 문의하세요.
                  </li>
                </ul>
                <p className="mt-4">
                  ⚠️ 다만 사업장별로 통상임금 계산 방식이 다를 수 있습니다. 급여 명세서를 자세히 검토하고, 의문이 있으면 직장의 인사팀이나 고용센터에 직접 문의하는 것이 가장 정확합니다.
                </p>
              </section>

              <AdSlot slot="guide-parental-leave-benefit-mid" format="rectangle" />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h2 className="text-2xl font-bold">육아휴직급여와 다른 제도의 관계</h2>
                <p>
                  육아휴직급여는 다른 사회보장 제도와 함께 작동합니다. 어떤 제도와 중복 수급이 가능한지, 불가능한지 이해하면 더 정확한 재정 계획을 세울 수 있습니다.
                </p>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li>
                    <strong>실업급여와 중복 불가:</strong> 동일 기간에 실업급여와 육아휴직급여를 동시에 받을 수 없습니다.
                  </li>
                  <li>
                    <strong>건강보험 유지:</strong> 육아휴직 중에도 건강보험 피보험자 자격이 유지됩니다. 다만 직장 가입 또는 개인 가입으로 보험료를 계속 내야 합니다(일부 감면 있음).
                  </li>
                  <li>
                    <strong>국민연금 가입:</strong> 육아휴직 중에도 국민연금 피보험자 자격이 이어집니다. 급여 기간 동안 보험료 납부 의무가 있습니다.
                  </li>
                  <li>
                    <strong>세금 처리:</strong> 육아휴직급여는 근로소득으로 간주되어 소득세 대상입니다. 연말정산 시 포함되므로 미리 예상하는 것이 좋습니다.
                  </li>
                </ul>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">2026년 육아휴직급여 정책 변화 및 전망</h2>
                <p>
                  정부는 지속적으로 육아휴직급여 제도를 개선 중입니다. 2025년 개정에 이어, 2026년과 그 이후에도 추가 개정이 논의 중입니다.
                </p>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li>
                    <strong>전액 선지급:</strong> 기존 사후지급금(25%) 폐지로 모든 급여가 매월 현금으로 지급됩니다(2025년 1월부터 시행 중).
                  </li>
                  <li>
                    <strong>육아휴직 기간 확대 논의:</strong> 일부에서는 부모 각 1년 6개월까지 확대하는 안을 제안 중입니다. 2026~2027년 정책 변화를 지켜봐야 합니다.
                  </li>
                  <li>
                    <strong>월 상한액 인상:</strong> 매년 고용보험료 산정 및 경제지표에 따라 월 상한액이 조정될 예정입니다.
                  </li>
                </ul>
                <p className="mt-4">
                  따라서 본 가이드의 정보는 2026년 7월 9일 기준이며, 법 개정 시 즉시 업데이트됩니다. 정책 변화가 있으면 고용노동부 공식 공지를 따르세요.
                </p>
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
                    <p className="mt-1 text-sm text-text-secondary">육아휴직급여를 포함한 세후 월급을 계산해보세요.</p>
                  </Link>
                  <Link
                    href="/guide/four-major-insurance-rates-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">4대보험료 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">국민연금·건강보험·고용보험 요율을 배우세요.</p>
                  </Link>
                  <Link
                    href="/guide/unemployment-benefit-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">실업급여 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">고용보험에서 받는 실업 수당의 조건과 절차.</p>
                  </Link>
                  <Link
                    href="/guide/annual-leave-allowance-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">연차수당 계산 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">미사용 연차를 퇴직 시 정산받는 방법.</p>
                  </Link>
                  <Link
                    href="/guide/salary-take-home-2026-july-insurance-increase/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">7월 보험료 인상 월급 영향</div>
                    <p className="mt-1 text-sm text-text-secondary">2026년 7월 국민연금 인상으로 월급이 얼마나 줄까요?</p>
                  </Link>
                  <Link
                    href="/category/work/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">모든 급여·근로 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">연봉·퇴직금·실업급여·세금 모음.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 교육 목적으로 작성되었으며, 개인 맞춤형 근로 상담이 아닙니다. 실제 육아휴직급여 수급 여부, 지급액, 신청 절차는 고용센터 또는 work24.go.kr에서 반드시 확인하세요. 특히 고용보험 가입 기간, 통상임금 산정, 자녀 대상 요건 등은 직장과 고용센터를 통해 정확히 파악하는 것이 안전합니다. 본 콘텐츠는 2026-07-09를 기준으로 작성되었으며, 고용보험법 개정 시 즉시 업데이트됩니다. 육아휴직급여의 정확한 기준은 법조항 <strong>고용보험법 §70(육아휴직급여), 시행령 §95</strong>를 따릅니다. AI 보조 작성 후 운영자 검수 완료.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.work24.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">고용24 (work24.go.kr)</a>,{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터</a>,{' '}
                  <a href="https://www.moel.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">고용노동부 공식 사이트</a>.
                </p>
              </section>

              <ShareButtons
                title="육아휴직급여 2026 가이드"
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
