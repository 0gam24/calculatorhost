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

const URL = 'https://calculatorhost.com/guide/religious-worker-income-tax-2026/';
const DATE_PUBLISHED = '2026-09-12';
const DATE_MODIFIED = '2026-09-12';

export const metadata: Metadata = {
  title: '종교인소득 신고 방법·필요경비 2026, 기타 근로소득 비교',
  description:
    '종교인소득은 기타소득과 근로소득 중 매년 선택해 신고할 수 있습니다. 기타소득으로 신고하면 소득 구간별로 최대 80%까지 필요경비가 인정되는데, 소득세법 시행령 §87 기준 4단계 계산법과 원천징수·확정신고 절차, 비과세 항목을 정리했습니다.',
  keywords: [
    '종교인소득',
    '종교인소득 신고',
    '종교인소득 필요경비',
    '종교인소득 기타소득',
    '목회자 소득세',
    '소득세법 21조',
    '종교인 원천징수',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '종교인소득 신고 방법·필요경비 2026, 기타 근로소득 비교' }],
    title: '종교인소득 신고 방법 2026, 기타소득 필요경비는 얼마나 인정되나',
    description: '기타소득 vs 근로소득 선택 신고, 필요경비 4단계 계산법, 원천징수 반기납부, 비과세 항목까지 정리.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '종교인소득 신고 방법·필요경비 2026',
    description: '기타소득 vs 근로소득 선택, 필요경비 4단계, 원천징수·확정신고 절차. 소득세법 §21·시행령 §87.',
  },
};

const FAQ_ITEMS = [
  {
    question: '종교인소득은 반드시 기타소득으로 신고해야 하나요?',
    answer:
      '아닙니다. 종교인소득은 소득세법 §21③에 따라 근로소득으로 원천징수하거나 종합소득세 확정신고를 하면 그 소득을 근로소득으로 봅니다. 즉 원칙은 기타소득이지만 종교관련종사자 본인의 선택에 따라 근로소득으로 신고할 수 있고, 어느 쪽을 택하느냐에 따라 필요경비 계산 방식과 세액이 달라집니다.',
  },
  {
    question: '한 해 안에 기타소득과 근로소득을 섞어서 신고할 수 있나요?',
    answer:
      '같은 해 안에서 소득 종류를 바꿔가며 신고하는 것은 인정되지 않는 것이 원칙입니다. 다만 해가 바뀔 때마다 그해의 소득 종류를 다시 선택하는 것은 가능하며, 같은 종교단체에 소속된 종교인이라도 각자 다른 소득 종류를 선택할 수 있습니다. 매년 어느 쪽이 유리한지 다시 비교해보는 것이 좋습니다.',
  },
  {
    question: '연 소득 3천만원이면 필요경비는 얼마나 인정되나요?',
    answer:
      '기타소득으로 신고할 경우 2천만원 초과 4천만원 이하 구간에 해당해 1,600만원에 2천만원 초과분(1천만원)의 50%인 500만원을 더해 총 2,100만원이 필요경비로 인정됩니다. 소득 3천만원에서 필요경비 2,100만원을 뺀 900만원이 과세대상 소득이 되며, 실제 지출한 경비가 이 금액보다 크면 초과분도 필요경비로 반영할 수 있습니다.',
  },
  {
    question: '학자금이나 사택 제공은 종교인소득에 포함되나요?',
    answer:
      '소득세법 §12⑤아목에 따른 비과세 항목에 해당하면 애초에 종교인소득 계산에서 제외됩니다. 본인 학자금, 식사 또는 식사대, 일직료·숙직료·여비·종교활동비 같은 실비변상적 성질의 지급액, 출산 및 6세 이하 자녀 보육수당, 사택 제공이익 등이 대표적입니다. 이런 항목은 필요경비를 따지기 이전에 과세소득 자체에서 빠지므로 지급명세서 작성 시 구분해서 기재해야 합니다.',
  },
  {
    question: '종교단체가 원천징수를 하지 않으면 어떻게 되나요?',
    answer:
      '종교단체가 원천징수를 하지 않았다면 종교인 본인이 다음 해 5월 종합소득세 확정신고 기간에 직접 신고·납부해야 합니다. 종교인소득은 원천징수 의무가 종교단체의 선택 사항이므로, 원천징수 여부와 관계없이 최종적으로는 종교인 본인이 자신의 소득을 정확히 파악하고 있어야 신고 누락을 피할 수 있습니다.',
  },
  {
    question: '원천징수 신고는 매달 해야 하나요?',
    answer:
      '원칙은 매월 소득을 지급한 달의 다음 달 10일까지 원천징수 세액을 신고·납부하는 것입니다(소득세법 §128). 다만 상시고용인원이 적은 사업장이나 종교단체는 반기별 납부를 신청할 수 있어, 이 경우 상반기분은 7월 10일, 하반기분은 다음 해 1월 10일까지 두 번만 신고하면 됩니다. 반기납부는 적용받으려는 반기의 직전월 1일부터 말일까지 신청해야 합니다.',
  },
  {
    question: '기타소득과 근로소득 중 어느 쪽이 세금이 적게 나오나요?',
    answer:
      '소득 규모와 부양가족, 다른 소득 유무에 따라 달라 일률적으로 말하기 어렵습니다. 기타소득은 필요경비 구간에 따라 최대 80%까지 소득에서 빠지는 장점이 있지만, 근로소득은 근로소득공제 외에 신용카드 소득공제나 각종 세액공제를 받을 수 있어 부양가족이 많을수록 유리해지는 경우가 있습니다. 홈택스에서 두 방식의 예상세액을 직접 비교해보고 선택하는 것이 정확합니다.',
  },
];

export default function ReligiousWorkerIncomeTax2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '종교인소득 신고 방법·필요경비 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '종교인소득 신고 방법 2026, 기타소득 필요경비는 얼마나 인정되나',
    description:
      '종교인소득의 기타소득·근로소득 선택 신고, 필요경비 4단계 계산법(소득세법 시행령 §87), 원천징수 반기납부, 비과세 항목, 종합소득세 확정신고 절차를 정리.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['종교인소득', '종교인소득 필요경비', '기타소득', '소득세법 21조', '원천징수'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '종교인소득 신고 방법·필요경비 2026',
    description:
      '기타소득 vs 근로소득 선택, 필요경비 4단계 계산법, 원천징수 반기납부, 비과세 항목, 확정신고 절차.',
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
                    { name: '종교인소득 신고 방법·필요경비 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">종교인 · 8분 읽기 · 2026-09-12</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  종교인소득 신고 방법 2026
                  <br />
                  <span className="text-2xl text-text-secondary">· 기타소득 필요경비는 얼마나 인정되나</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  목사·신부·스님 등 종교관련종사자가 받는 종교인소득은 기타소득과 근로소득 중 매년 선택해 신고할 수 있습니다. 이 가이드는 두 신고 방식의 차이, 기타소득으로 신고할 때 구간별로 인정되는 필요경비 계산법, 원천징수 신고 기한, 비과세로 빠지는 항목까지 실제 사례로 정리합니다. 대상 독자는 종교단체 회계 담당자와 종교인 본인입니다.
                </p>
              </header>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">종교인소득이란 무엇인가요?</h2>
                <p>
                  종교인소득은 종교관련종사자가 종교의식을 집행하는 등 활동과 관련해 소속 종교단체로부터 받는 소득을 말합니다(소득세법 §21①제26호). 목사·신부·수녀·스님뿐 아니라 전도사·부제 등 종교의식 관련 업무를 맡는 사람도 포함됩니다. 2018년 세법 개정으로 처음 과세 대상에 들어왔고, 원칙적으로는 이자·배당·사업·근로·연금·퇴직·양도소득 어디에도 속하지 않는 기타소득으로 분류됩니다.
                </p>
                <p>
                  다만 종교인소득 전액이 과세되는 것은 아닙니다. 학자금이나 식사대처럼 성격상 비과세로 인정되는 항목은 애초에 과세소득 계산에서 빠지고, 남은 금액에서 다시 필요경비를 공제한 뒤 실제 세금이 계산됩니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">30초 요약</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    정의: 종교관련종사자가 종교단체로부터 받는 소득(소득세법 §21①26호).
                    <br />
                    신고 방식: 기타소득이 원칙, 근로소득 선택도 가능(§21③).
                    <br />
                    필요경비: 기타소득 선택 시 소득 구간별 최대 80%까지 인정(시행령 §87③).
                    <br />
                    비과세: 학자금·식사대·실비변상비·보육수당·사택제공이익 등(§12⑤아목).
                  </p>
                </div>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">종교인소득은 어떻게 신고하나요?</h2>
                <p>
                  종교인소득은 기타소득으로 신고하는 것이 원칙이지만, 근로소득으로 원천징수하거나 종합소득세 과세표준 확정신고를 하면 해당 소득을 근로소득으로 봅니다(소득세법 §21③). 즉 종교단체나 종교인 본인이 매년 두 방식 중 하나를 선택할 수 있는 구조입니다.
                </p>
                <p>
                  다만 같은 과세기간 안에서 신고 방식을 섞어 쓰는 것은 인정되지 않습니다. 한 해의 소득은 기타소득이면 기타소득, 근로소득이면 근로소득으로 일관되게 처리해야 하며, 다음 해에 다시 선택을 바꾸는 것은 가능합니다. 같은 종교단체에 소속된 종교인이라도 각자 다른 방식을 택할 수 있습니다.
                </p>
                <p className="mt-4">
                  다만, 근로소득으로 선택하면 4대보험 가입 의무와는 별개로 근로소득공제·각종 세액공제 체계를 적용받게 되므로, 부양가족이 많거나 신용카드 사용액이 큰 경우 근로소득이 유리해지는 경우도 있습니다. 홈택스에서 두 방식의 예상세액을 비교해보고 결정하는 것이 안전합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">필요경비는 얼마나 인정되나요?</h2>
                <p>
                  기타소득으로 신고할 경우, 종교관련종사자가 해당 과세기간에 받은 금액(비과세소득 제외)에서 소득 구간별로 정해진 필요경비를 공제합니다(소득세법 시행령 §87③). 구간이 올라갈수록 공제 비율은 낮아지는 누진 구조입니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 종교인소득 필요경비 구간표 (소득세법 시행령 §87③)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">과세기간 종교인소득</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">필요경비</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">2,000만원 이하</td>
                        <td className="p-3">받은 금액의 80%</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">2,000만원 초과 ~ 4,000만원 이하</td>
                        <td className="p-3">1,600만원 + 2,000만원 초과분의 50%</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">4,000만원 초과 ~ 6,000만원 이하</td>
                        <td className="p-3">2,600만원 + 4,000만원 초과분의 30%</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">6,000만원 초과</td>
                        <td className="p-3">3,200만원 + 6,000만원 초과분의 20%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례. 연 소득 5,000만원인 경우</p>
                  <p className="text-sm text-text-secondary">
                    · 구간: 4,000만원 초과 6,000만원 이하
                    <br />
                    · 필요경비: 2,600만원 + (5,000만원 − 4,000만원) × 30% = 2,900만원
                    <br />
                    · 과세대상 소득: 5,000만원 − 2,900만원 = 2,100만원
                    <br />
                    <span className="text-xs text-text-tertiary">실제 지출한 경비가 2,900만원보다 크면 그 초과분도 필요경비로 인정됩니다.</span>
                  </p>
                </div>
                <p className="mt-4">
                  다만, 이 표는 기타소득으로 신고할 때만 적용됩니다. 근로소득으로 선택하면 이 필요경비표 대신 근로소득공제와 각종 소득·세액공제 체계가 적용되므로 계산 방식 자체가 달라집니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">원천징수는 언제까지 신고해야 하나요?</h2>
                <p>
                  원천징수의무자인 종교단체는 매월 소득을 지급한 달의 다음 달 10일까지 원천징수한 세액을 신고·납부해야 합니다(소득세법 §128). 예를 들어 3월분 소득을 3월에 지급했다면 4월 10일까지 신고를 마쳐야 합니다.
                </p>
                <p>
                  다만 직전 연도 상시고용인원 20명 이하인 사업장과 종교단체는 반기별 납부를 신청할 수 있습니다. 이 경우 상반기(1~6월)분은 7월 10일까지, 하반기(7~12월)분은 다음 해 1월 10일까지 두 번만 신고·납부하면 됩니다. 반기납부는 적용받으려는 반기의 직전월 1일부터 말일까지 관할 세무서에 신청해야 합니다.
                </p>
                <p className="mt-4">
                  다만, 종교단체가 원천징수를 하지 않기로 했다면 종교인 본인이 다음 해 5월 종합소득세 확정신고 기간에 직접 신고·납부해야 합니다. 원천징수 여부와 관계없이 신고 누락 시 가산세가 부과될 수 있으므로 소득 내역을 스스로도 파악해 두는 것이 안전합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">종교인소득 중 세금이 붙지 않는 항목은 무엇인가요?</h2>
                <p>
                  종교인소득 중 일부는 소득세법 §12⑤아목에 따라 처음부터 비과세소득으로 분류되어 과세소득 계산에서 제외됩니다. 대표적으로 본인 학자금, 식사 또는 식사대, 일직료·숙직료·여비·종교활동비 같은 실비변상적 성질의 지급액, 재해 관련 지급액, 출산 및 6세 이하 자녀 보육수당, 사택 제공이익 등이 해당합니다.
                </p>
                <p>
                  비과세 항목은 필요경비를 따지기 이전 단계에서 제외되므로, 종교단체가 지급명세서를 작성할 때 과세소득과 비과세소득을 명확히 구분해 기재해야 합니다. 구분 없이 전액을 과세소득으로 신고하면 종교인이 불필요하게 더 많은 세금을 내게 될 수 있습니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">기타소득과 근로소득, 무엇이 다른가요?</h2>
                <p>
                  두 방식은 세액 계산 구조 자체가 다릅니다. 기타소득은 필요경비표로 공제 폭이 정해지는 대신 근로소득공제나 각종 세액공제를 받을 수 없고, 근로소득은 근로소득공제와 부양가족·카드 사용액 등에 따른 공제를 받는 대신 4대보험 관련 처리가 뒤따를 수 있습니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 2. 종교인소득 기타소득 vs 근로소득 선택 비교</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">항목</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">기타소득</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">근로소득</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">공제 방식</td>
                        <td className="p-3">필요경비표(최대 80%)</td>
                        <td className="p-3">근로소득공제 + 각종 공제</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">부양가족 많을 때</td>
                        <td className="p-3">추가 공제 어려움</td>
                        <td className="p-3">인적공제로 유리해질 수 있음</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">신고 주기</td>
                        <td className="p-3">매년 재선택 가능</td>
                        <td className="p-3">매년 재선택 가능</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  다만, 어느 쪽이 더 유리한지는 소득 규모, 부양가족 수, 다른 소득 유무에 따라 달라집니다. 홈택스에서 기타소득과 근로소득 각각의 예상세액을 계산해 비교해본 뒤 선택하는 것이 정확합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">종합소득세 확정신고는 언제 하나요?</h2>
                <p>
                  원천징수로 납세의무가 끝나지 않는 경우, 즉 원천징수를 하지 않았거나 다른 종합소득이 있어 합산 신고가 필요한 경우에는 다음 해 5월 한 달간 종합소득세 확정신고를 해야 합니다(소득세법 §70). 종교인소득만 있고 원천징수로 정산이 끝난 경우라도, 다른 소득이 있다면 합산 여부를 반드시 확인해야 합니다.
                </p>
                <p>
                  기타소득으로 신고한 종교인소득과 근로소득으로 신고한 종교인소득은 종합소득세 신고서상 기재 위치와 계산 구조가 다르므로, 홈택스 신고 화면에서 본인이 선택한 소득 종류에 맞는 항목에 정확히 입력해야 합니다.
                </p>
              </section>

              <h2 className="text-2xl font-bold mb-6">자주 묻는 질문</h2>
              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h3 className="text-lg font-semibold text-text-primary">관련 계산기 및 가이드</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link
                    href="/guide/n-jobber-comprehensive-income-tax-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">N잡러 종합소득세 합산 신고</div>
                    <p className="mt-1 text-sm text-text-secondary">근로소득 외 다른 소득이 있을 때 합산·분리 기준.</p>
                  </Link>
                  <Link
                    href="/guide/may-31-deadline-day-income-tax-filing-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">종합소득세 신고 마감일 가이드</div>
                    <p className="mt-1 text-sm text-text-secondary">5월 종합소득세 신고 절차와 마감 대응법.</p>
                  </Link>
                  <Link
                    href="/calculator/freelancer-tax/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">프리랜서 종합소득세 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">기타소득·사업소득 구조로 예상세액을 계산해보세요.</p>
                  </Link>
                  <Link
                    href="/calculator/salary/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">연봉 실수령액 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">근로소득으로 신고할 때 예상 실수령액을 비교해보세요.</p>
                  </Link>
                  <Link
                    href="/category/tax/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">모든 세금 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">종합소득세·양도세·상속세·증여세 모음.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 이 글은 AI 보조로 자동 생성되어 자동 품질 게이트를 통과한 뒤 발행되었습니다. 발행 시점에 사람의 사전 검수는 없었으며, 운영자가 사후 점검합니다. 본 가이드는 교육 목적으로 작성되었으며 개인 맞춤형 세무 상담이 아닙니다. 실제 신고는 종교단체와 종교인 개인의 구체적 상황에 따라 달라지므로 국세청 홈택스, 관할 세무서 또는 세무 전문가와 반드시 확인하세요. 본 콘텐츠는 2026-09-12를 기준으로 작성되었으며 관련 법령 개정 시 업데이트됩니다. 인용 법조항: 소득세법 §12⑤아목(비과세소득), §21①제26호(종교인소득 정의), §21③(근로소득 간주), §70(종합소득세 확정신고), §128(원천징수세액 납부), 소득세법 시행령 §87③(종교인소득 필요경비 계산).
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?mi=2266&cntntsId=7691" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">국세청 종교인소득 신고 안내</a>,{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터</a>,{' '}
                  <a href="https://www.hometax.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">국세청 홈택스</a>.
                </p>
              </section>

              <ShareButtons
                title="종교인소득 신고 방법·필요경비 2026 가이드"
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
