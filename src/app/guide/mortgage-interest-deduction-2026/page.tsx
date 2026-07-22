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

const URL = 'https://calculatorhost.com/guide/mortgage-interest-deduction-2026/';
const DATE_PUBLISHED = '2026-07-07';
const DATE_MODIFIED = '2026-07-07';

export const metadata: Metadata = {
  title: '주택담보대출 이자 소득공제 2026 | 최대 2,000만원 절세',
  description:
    '장기주택저당차입금 이자상환액 소득공제. 무주택/1주택 기준시가 6억 이하, 보유 기간·금리·상환방식별 한도(800~2,000만원). 소득세법 §52 기준.',
  keywords: [
    '주택담보대출 이자 소득공제',
    '장기주택저당차입금',
    '이자상환액 공제',
    '소득공제 한도',
    '소득세법 52조',
    '연말정산 주택대출',
    '절세 전략',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '주택담보대출 이자 소득공제 2026' }],
    title: '주택담보대출 이자 소득공제 2026 — 연 2,000만원까지 소득에서 차감',
    description: '무주택 또는 1주택 세대주의 주택담보대출 이자를 최대 연 2,000만원까지 소득공제. 조건·한도·계산법 완벽 정리.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '주택담보대출 이자 소득공제 2026 — 최대 2,000만원 절세 가능',
    description: '기준시가 6억 이하 주택, 무주택/1주택 세대주라면 연 800~2,000만원 공제. 소득세법 §52.',
  },
};

const FAQ_ITEMS = [
  {
    question: '주택담보대출 이자 소득공제가 무엇인가요?',
    answer:
      '주택담보대출 이자 소득공제는 무주택 또는 1주택을 보유한 세대주가 주택 구입을 위해 차입한 장기저당차입금의 이자를 소득금액에서 직접 차감하는 제도입니다(소득세법 §52). 공제된 금액만큼 과세소득이 줄어들어 세금을 절감할 수 있습니다. 예를 들어 연 이자가 1,500만원이고 해당 구간 한도가 2,000만원이면, 1,500만원 전액이 소득에서 공제됩니다.',
  },
  {
    question: '이자 소득공제 대상이 되려면 어떤 조건이 필요한가요?',
    answer:
      '세대주 지위, 주택 기준시가, 차입금 조건 3가지를 모두 만족해야 합니다. 첫째, 과세기간 종료일(12월 31일) 현재 무주택이거나 1주택만 보유한 세대주여야 합니다. 둘째, 주택 취득 당시 기준시가가 6억원 이하여야 합니다(2024년 이후 취득). 셋째, 금융회사나 주택도시기금에서 차입하되, 소유권 등기일부터 3개월 내에 차입해야 합니다.',
  },
  {
    question: '공제한도는 정확히 얼마인가요?',
    answer:
      '차입금의 상환 기간, 금리 유형, 상환 방식에 따라 한도가 다릅니다(소득세법 §52). 15년 이상이면서 고정금리와 비거치식 분할상환을 모두 충족하면 연 2,000만원, 15년 이상 고정금리 또는 비거치식 중 하나만 충족하면 1,800만원, 15년 이상 기타는 800만원, 10년 이상 15년 미만이면서 고정 또는 비거치식은 600만원입니다. 자신의 대출 조건을 확인한 후 해당 한도를 적용하세요.',
  },
  {
    question: '소득공제와 세액공제는 다른가요?',
    answer:
      '매우 다릅니다. 소득공제는 소득금액에서 일정액을 빼주는 것이므로, 실제 절세액은 공제액에 한계세율(현재 6~45%)을 곱한 값입니다. 예를 들어 2,000만원을 공제받고 한계세율이 15%라면 실제 절세액은 약 300만원입니다. 세액공제는 직접 세금에서 금액을 빼므로 훨씬 유리합니다. 주택담보대출 이자는 소득공제 제도이므로 이 점을 명시해야 합니다.',
  },
  {
    question: '부부가 각각 주택담보대출을 받으면 둘 다 공제받을 수 있나요?',
    answer:
      '아닙니다. 공제 대상은 세대주 1인입니다. 소득세법 §52는 "세대주가 주택을 취득하기 위해 차입한" 차입금으로 명시하고 있으므로, 배우자가 주택을 차입했다면 원칙적으로 세대주가 이자를 지급해야만 공제를 받을 수 있습니다. 부부가 공동명의로 주택을 소유하더라도 실제 차입자가 세대주여야 합니다.',
  },
  {
    question: '2주택이 되면 공제를 못 받나요?',
    answer:
      '네, 공제를 받을 수 없습니다. 소득세법 §52의 요건은 "무주택 또는 1주택 보유"입니다. 과세기간 종료일인 12월 31일 현재 기준이므로, 그 시점에 2주택 이상을 보유하면 해당 연도 이자는 공제받지 못합니다. 만약 6월에 집을 추가로 매입해 2주택이 되었다면, 그 연도 1월~12월 모든 이자가 공제 대상에서 제외됩니다.',
  },
  {
    question: '세대주를 변경하면 이자 공제를 계속 받을 수 있나요?',
    answer:
      '세대주 변경의 법적 효력에 따라 달라집니다. 원칙적으로는 변경 후 새로운 세대주가 해당 주택의 소유자여야 합니다만, 실제 국세청 판단은 차입금의 명의, 이자 납부 기록, 당사자의 거주 상황을 종합 검토합니다. 변경 전후에 이자를 누가 납부했는지가 중요하므로, 세대주 변경 예정이면 미리 세무서에 상담받으세요.',
  },
  {
    question: '이자 공제는 연말정산에서 어떻게 신청하나요?',
    answer:
      '직장인이면 연말정산 간소화 서비스 또는 종합소득세 신고 시 국세청 제출 대출금 이자 명세를 기반으로 자동 반영됩니다. 프리랜서는 확정신고 시 "근로소득세 신고" 대신 "사업소득 신고"에서 직접 입력하거나, 연말정산 신고 서식을 통해 신청합니다. 필요 서류는 금융회사의 이자납부 증명서, 주민등록등본, 건물등기부등본입니다.',
  },
];

export default function MortgageInterestDeduction2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '주택담보대출 이자 소득공제 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '주택담보대출 이자 소득공제 2026 — 연 2,000만원까지 소득에서 차감',
    description:
      '무주택 또는 1주택 세대주를 위한 장기주택저당차입금 이자상환액 소득공제. 조건·기준시가·차입 조건별 한도(800~2,000만원)와 계산법 완벽 정리.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['주택담보대출', '이자공제', '소득공제', '연말정산', '절세'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '주택담보대출 이자 소득공제 2026',
    description:
      '장기주택저당차입금 이자상환액 소득공제의 정확한 조건, 한도, 계산법.',
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
                    { name: '주택담보대출 이자 소득공제 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">세대주 · 9분 읽기 · 2026-07-07</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  주택담보대출 이자 소득공제 2026
                  <br />
                  <span className="text-2xl text-text-secondary">— 최대 연 2,000만원 소득에서 차감</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  주택을 구입하기 위해 차입한 대출금의 이자를 소득금액에서 직접 차감하는 제도, 바로 주택담보대출 이자 소득공제입니다. 무주택이거나 1주택을 보유한 세대주라면 연 800만원에서 2,000만원까지 공제받을 수 있습니다. 하지만 조건이 까다로우므로, 이 가이드에서 기준시가·차입 조건·한도를 정확히 정리했습니다.
                </p>
              </header>

              <AdSlot slot="guide-mortgage-interest-deduction-top" format="horizontal" />

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">주택담보대출 이자 소득공제란</h2>
                <p>
                  소득세법 §52에 따른 주택담보대출 이자 소득공제는 무주택 또는 1주택 세대주가 주택 구입을 위해 금융회사 또는 주택도시기금에서 차입한 장기저당차입금의 이자를 근로소득(또는 사업소득) 금액에서 직접 차감하는 제도입니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">소득공제의 의미</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    공제액만큼 과세소득이 줄어들어, 실제 절세액은 공제액에 한계세율을 곱한 값입니다.
                    <br />
                    예: 연 이자 1,000만원 공제받음 → 한계세율 15% 구간 → 약 150만원 절세 (소득세 + 지방소득세)
                    <br />
                    ※ 세액공제(직접 세금에서 뺌)와는 다릅니다.
                  </p>
                </div>
                <p className="mt-4">
                  이 제도는 주택 구입의 금리 부담을 완화하기 위해 도입됐으며, 연 800만원에서 2,000만원까지 공제받을 수 있습니다. 조건을 정확히 파악하면 연말정산에서 실질적인 절세 효과를 기대할 수 있습니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">공제 대상 조건 (3가지 필수)</h2>
                <p>
                  주택담보대출 이자 소득공제를 받으려면 세대주 지위, 주택 기준시가, 차입금 조건 3가지를 모두 만족해야 합니다(소득세법 §52).
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 주택담보대출 이자 소득공제 대상 조건 (소득세법 §52, 2026 기준)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">조건</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">세부 요건</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3"><strong>세대주 지위</strong></td>
                        <td className="p-3">과세기간 종료일(12월 31일) 현재 무주택이거나 1주택만 보유한 세대주</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3"><strong>주택 기준시가</strong></td>
                        <td className="p-3">취득 당시 기준시가 6억원 이하 (2024년 이후 취득 시, 2023년까지는 5억원 이하)</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3"><strong>차입금 조건</strong></td>
                        <td className="p-3">금융회사 또는 주택도시기금 차입 + 소유권 등기일로부터 3개월 이내 차입</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3"><strong>상환방식</strong></td>
                        <td className="p-3">분할상환(10년 이상) 또는 만기일시상환, 공제한도 차이 있음</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  다만 "1주택"의 범위는 주의가 필요합니다. 기준시가 9억원 이하의 1주택과 피상속인 소유 주택은 중복 포함될 수 있으므로, 정확한 판정은 국세청 홈택스나 세무서에 확인하세요.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">차입금 조건별 공제 한도 (소득세법 §52)</h2>
                <p>
                  공제 한도는 차입금의 상환기간, 금리 유형, 상환방식에 따라 달라집니다. 다음 표를 통해 자신의 대출 조건이 어느 카테고리에 해당하는지 확인하세요.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 2. 차입금 조건별 공제 한도 (2026년, 소득세법 §52 제5항)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">상환기간</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">금리 유형</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">상환방식</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">공제한도</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">15년 이상</td>
                        <td className="p-3">고정금리</td>
                        <td className="p-3">분할상환</td>
                        <td className="p-3"><strong>2,000만원</strong></td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">15년 이상</td>
                        <td className="p-3">고정금리 또는 비거치식</td>
                        <td className="p-3">기타</td>
                        <td className="p-3"><strong>1,800만원</strong></td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">15년 이상</td>
                        <td className="p-3">기타</td>
                        <td className="p-3">기타</td>
                        <td className="p-3"><strong>800만원</strong></td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">10년 이상 15년 미만</td>
                        <td className="p-3">고정금리 또는 비거치식</td>
                        <td className="p-3">분할상환</td>
                        <td className="p-3"><strong>600만원</strong></td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">10년 미만</td>
                        <td className="p-3">-</td>
                        <td className="p-3">-</td>
                        <td className="p-3"><strong>공제 불가</strong></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  한도 판정 시 가장 유리한 조건을 우선 적용합니다. 예를 들어 15년 고정금리 분할상환이면 2,000만원, 이 조건이 하나 빠지면 1,800만원으로 내려갑니다.
                </p>
                <p className="mt-4">
                  다만 위 한도(600~2,000만원)는 장기주택저당차입금 이자상환액 공제에만 적용되는 별도 한도입니다. 청약저축 소득공제(§87)·주택임차차입금 원리금상환액 공제 등 다른 주택자금공제는 각각 별도 규정이 적용되므로, 여러 공제를 함께 받는다면 국세청 홈택스에서 정확한 적용 한도를 확인하세요.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">실제 계산 사례</h2>
                <p>
                  다음 3가지 사례로 공제 적용 여부와 실제 절세액을 계산해보겠습니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 1. 이상적인 대출 조건 (15년 고정, 분할상환)</p>
                  <p className="text-sm text-text-secondary">
                    · 세대주: 무주택자
                    <br />
                    · 주택 기준시가: 5억원
                    <br />
                    · 연 이자: 1,200만원 (상환기간 15년, 고정금리, 분할상환)
                    <br />
                    · 공제한도: 2,000만원 (최고 혜택)
                    <br />
                    · 실제 공제액: min(1,200만원, 2,000만원) = <strong>1,200만원</strong>
                    <br />
                    · 한계세율 15% 구간 시 절세액: 약 <strong>180만원</strong> (소득세 144만 + 지방소득세 36만)
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 연 이자 1,200만원을 전액 공제받아 약 180만원 절세.</span>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 2. 변동금리 + 만기일시상환 (한도 1,800만원)</p>
                  <p className="text-sm text-text-secondary">
                    · 세대주: 1주택 소유
                    <br />
                    · 주택 기준시가: 4억원
                    <br />
                    · 연 이자: 1,600만원 (상환기간 15년, 고정금리 아님, 만기일시)
                    <br />
                    · 공제한도: 1,800만원
                    <br />
                    · 실제 공제액: min(1,600만원, 1,800만원) = <strong>1,600만원</strong>
                    <br />
                    · 한계세율 24% 구간 시 절세액: 약 <strong>384만원</strong> (소득세 307만 + 지방소득세 77만)
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 변동금리라도 1,600만원 공제받아 약 384만원 절세.</span>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 3. 10년 대출 (한도 600만원)</p>
                  <p className="text-sm text-text-secondary">
                    · 세대주: 무주택자
                    <br />
                    · 주택 기준시가: 3억원
                    <br />
                    · 연 이자: 900만원 (상환기간 10년, 고정금리, 분할상환)
                    <br />
                    · 공제한도: 600만원
                    <br />
                    · 실제 공제액: min(900만원, 600만원) = <strong>600만원</strong>
                    <br />
                    · 한계세율 15% 구간 시 절세액: 약 <strong>90만원</strong>
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 10년 대출이라 900만원 중 600만원만 공제, 약 90만원 절세.</span>
                  </p>
                </div>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">공제 불가 상황</h2>
                <p>
                  다음 경우에는 주택담보대출 이자 소득공제를 받을 수 없습니다.
                </p>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li>
                    <strong>2주택 이상 보유:</strong> 과세기간 종료일(12월 31일) 현재 2주택 이상을 보유하면 해당 연도 이자 공제가 불가능합니다. 장기간 한 건물을 소유했더라도 12월 31일 기준이 1일 차이나면 불가합니다.
                  </li>
                  <li>
                    <strong>기준시가 초과:</strong> 주택 취득 당시 기준시가가 6억원을 초과하면 공제받을 수 없습니다. 공시가격이 아닌 기준시가(감정평가가)를 기준으로 하므로 주의하세요.
                  </li>
                  <li>
                    <strong>10년 미만 차입:</strong> 상환기간이 10년 미만인 차입금은 애초에 공제 대상이 아닙니다. 최소 10년 이상이어야 합니다.
                  </li>
                  <li>
                    <strong>차입 시기 초과:</strong> 소유권 등기일로부터 3개월을 초과하여 차입했으면 공제받을 수 없습니다.
                  </li>
                  <li>
                    <strong>이자 납부자가 세대주가 아님:</strong> 실제 이자를 배우자나 자녀가 납부했다면 세대주는 공제받을 수 없습니다. 차입자와 이자 납부자가 일치해야 합니다.
                  </li>
                </ul>
                <p className="mt-4">
                  다만 신축 주택 취득 시나 세대주 변경, 증축 등의 상황에서는 판단이 복잡할 수 있으므로, 확실하지 않으면 세무서에 사전 상담받으세요.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">연말정산에서 이자 공제받는 방법</h2>
                <p>
                  주택담보대출 이자 공제는 연말정산 또는 종합소득세 신고 시 신청합니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">직장인 (근로소득자)</p>
                  <p className="text-sm text-text-secondary">
                    국세청에 등록된 금융회사의 이자납부 정보가 간소화 서비스 화면에 자동 반영됩니다. 다만 공제 대상 여부(세대주 지위, 기준시가 등)는 본인이 확인하고 이의신청해야 합니다. 필요 시 근로소득세 신고에서 직접 입력할 수 있습니다.
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">프리랜서 (사업소득자)</p>
                  <p className="text-sm text-text-secondary">
                    5월 종합소득세 신고 시 "소득금액 계산 명세서"에 "장기주택저당차입금 이자상환액"을 직접 입력합니다. 금융회사 이자납부 증명서, 주민등록등본, 건물등기부등본(또는 기준시가 증명 서류)을 함께 제출하세요.
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">필요 서류</p>
                  <p className="text-sm text-text-secondary">
                    · 금융회사 이자납부 증명서 (연 1회 발급)
                    <br />
                    · 주민등록등본 (세대주 증명용, 본인 포함)
                    <br />
                    · 건물등기부등본 또는 건물임차차용증 (주택 기준시가 증명용)
                    <br />
                    · 차입금 관련 계약서 사본 (차입 시기, 상환기간 확인용, 필요 시)
                  </p>
                </div>
              </section>

              <AdSlot slot="guide-mortgage-interest-deduction-mid" format="rectangle" />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h2 className="text-2xl font-bold">다른 주택 공제와의 관계</h2>
                <p>
                  주택담보대출 이자 소득공제와 유사하거나 충돌할 수 있는 다른 제도들이 있습니다.
                </p>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li>
                    <strong>주택청약종합저축 소득공제 (§87):</strong> 청약저축 불입액을 소득공제받습니다. 장기주택저당차입금 이자상환액 공제와는 각각 별도 한도로 적용되므로 두 공제를 함께 받을 수 있으며, 세부 적용 한도는 국세청 홈택스에서 확인하세요.
                  </li>
                  <li>
                    <strong>월세 세액공제 (§87의2):</strong> 전월세 월세에 대한 직접 세액공제입니다(소득공제 아님). 대출 이자 공제와는 별개이지만, 같은 연도에 받으면 한도가 공동 적용될 수 있습니다.
                  </li>
                  <li>
                    <strong>1세대1주택 양도세 비과세 (§89):</strong> 주택 양도 시 비과세를 받으려면 "무주택 또는 1주택" 조건이 필요합니다. 이자 공제와는 독립적이지만, 2주택이 되면 두 혜택을 동시에 잃을 수 있습니다.
                  </li>
                  <li>
                    <strong>종합부동산세:</strong> 2주택 이상일 때 부과됩니다. 이자 공제를 받으려면 12월 31일 현재 1주택 이하여야 하므로, 종부세 기준과 일치합니다.
                  </li>
                </ul>
              </section>

              <h2 className="text-2xl font-bold mb-6">자주 묻는 질문</h2>
              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h3 className="text-lg font-semibold text-text-primary">관련 계산기 및 가이드</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link
                    href="/calculator/loan/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">대출이자 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">원리금균등, 만기일시 등 상환방식별 계산</p>
                  </Link>
                  <Link
                    href="/calculator/salary/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">연봉 실수령액 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">공제 후 세후 월급 확인</p>
                  </Link>
                  <Link
                    href="/guide/year-end-tax-settlement/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">연말정산 완벽 가이드</div>
                    <p className="mt-1 text-sm text-text-secondary">직장인 필수 공제·감면 체크리스트</p>
                  </Link>
                  <Link
                    href="/guide/housing-subscription-savings-deduction-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">청약저축 소득공제</div>
                    <p className="mt-1 text-sm text-text-secondary">이자 공제와는 별도 한도</p>
                  </Link>
                  <Link
                    href="/guide/mortgage-fixed-vs-variable-rate-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">고정금리 vs 변동금리</div>
                    <p className="mt-1 text-sm text-text-secondary">공제 한도와 금리 선택의 관계</p>
                  </Link>
                  <Link
                    href="/category/tax/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">모든 세금 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">종합소득세, 양도세, 취득세 등</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 교육 목적으로 작성되었으며, 개인 맞춤형 세무 조언이 아닙니다. 실제 공제 여부, 한도, 최종 절세액은 관할 세무서 또는 국세청 홈택스에서 반드시 확인하세요. 특히 기준시가 판정, 세대주 변경, 2주택 판정, 차입금 조건 해석에서 분쟁이 발생할 수 있으므로 사전 상담이 안전합니다. 본 콘텐츠는 2026-07-07을 기준으로 작성되었으며, 소득세법 개정 시 즉시 업데이트됩니다. 주택담보대출 이자 소득공제의 정확한 기준은 법조항 <strong>소득세법 §52(장기주택저당차입금 이자상환액 특별소득공제)</strong>를 따릅니다. AI 보조 작성 후 운영자 검수 완료.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.nts.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">국세청 홈페이지</a>,{' '}
                  <a href="https://www.hometax.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">홈택스 연말정산</a>,{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터</a>.
                </p>
              </section>

              <ShareButtons
                title="주택담보대출 이자 소득공제 2026 가이드"
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
