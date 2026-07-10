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

const URL = 'https://calculatorhost.com/guide/family-business-inheritance-deduction-2026/';
const DATE_PUBLISHED = '2026-07-11';
const DATE_MODIFIED = '2026-07-11';

export const metadata: Metadata = {
  title: '가업상속공제 2026, 최대 600억 공제 요건·사후관리 5년',
  description:
    '중소·중견기업 가업 승계 시 상속세 공제. 영위기간별 공제한도(300/400/600억), 10년 경영 요건, 사후관리 5년 고용·자산 유지 기준. 상증법 §18의2 기준.',
  keywords: [
    '가업상속공제',
    '상속세 공제',
    '가업승계',
    '중소기업 상속',
    '상증법 18조의2',
    '600억 공제',
    '상속세 절세',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '가업상속공제 2026, 최대 600억 공제' }],
    title: '가업상속공제 2026 | 상속세 최대 600억 공제 완전 가이드',
    description: '중소·중견기업 가업 상속 시 영위기간별 300/400/600억 공제. 요건 및 사후관리 5년 고용·자산 유지 기준.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '가업상속공제 2026 | 최대 600억 상속세 공제',
    description: '영위기간 30년 이상 시 600억원 공제. 요건·사후관리 5년 완전 정리.',
  },
};

const FAQ_ITEMS = [
  {
    question: '가업상속공제가 정확히 무엇인가요?',
    answer:
      '가업상속공제는 상속세 및 증여세법 §18의2에 따른 제도로, 중소·중견기업의 경영진이 10년 이상 경영한 사업을 자녀 등 후계자에게 물려줄 때 일정 금액을 상속 과세 대상에서 제외하는 제도입니다. 예를 들어 기업 자산이 100억원이고 공제 대상이 600억원이면, 상속세 계산에서 600억원을 먼저 차감합니다.',
  },
  {
    question: '공제 한도가 정확히 얼마인가요?',
    answer:
      '피상속인이 가업을 경영한 기간에 따라 다릅니다(상증법 §18의2). 10년 이상 20년 미만이면 300억원, 20년 이상 30년 미만이면 400억원, 30년 이상이면 600억원입니다. 예를 들어 30년 이상 가업을 하고 기업 자산이 80억원이면, 600억원의 공제 혜택을 받을 수 있습니다.',
  },
  {
    question: '어떤 기업이 가업상속공제 대상인가요?',
    answer:
      '중소기업 기준(상속 1년 전 총자산 500억 미만)과 중견기업 기준(선행 조건 충족, 일반적으로 매출액 5,000억 미만)에 해당하는 기업만 적용됩니다. 또한 피상속인이 상속개시 5년 전부터 최대주주(비상장 40% 이상, 상장 20% 이상)여야 하고, 상속인도 18세 이상이면서 2년 이상 가업에 종사하거나 신고기한 내 임원 취임해야 합니다.',
  },
  {
    question: '가업상속공제 받은 후 5년 내 사업을 팔면 어떻게 되나요?',
    answer:
      '공제받은 상태로 5년 내에 공제 대상 자산의 40% 이상을 처분하면, 공제받은 금액 전체를 다시 상속세 과세대상에 포함시킵니다. 이를 "공제 회수"라고 하며, 가산세(이자상당액)까지 부과됩니다. 예를 들어 600억원을 공제받았는데 3년 후 기업을 매각하면 600억원을 다시 상속세에 포함하고 이자까지 내야 합니다.',
  },
  {
    question: '사후관리 5년 동안 유지해야 할 조건이 뭔가요?',
    answer:
      '상속 후 5년 이내에 다음을 모두 유지해야 합니다. (1) 가업용 자산을 40% 이상 처분하지 않을 것, (2) 1년 이상 휴업·폐업하지 않고 주된 업종 유지, (3) 정규직 근로자 평균 인원이 상속 직전 기준의 90% 이상 유지, (4) 총급여액도 동일 비율 이상 유지, (5) 상속인의 지분 유지(상속세 신고 시 보유 지분 90% 이상 유지). 하나라도 위반하면 공제 회수 대상이 됩니다.',
  },
  {
    question: '사후관리 5년 만료 후 자유롭게 처분할 수 있나요?',
    answer:
      '네, 5년이 완료된 후에는 자유롭게 처분 가능합니다. 다만 그 사이 공제 회수 사유가 발생했다면 이미 추징됐을 것입니다. 또한 상속세 신고 후 5년 이내 다시 상속이 발생하거나 중대한 변화(합병, 분할 등)가 생기면 별도 판단이 필요할 수 있으므로 세무 전문가 상담이 필요합니다.',
  },
  {
    question: '가업상속공제와 상속세 탈세는 다르죠?',
    answer:
      '네, 완전히 다릅니다. 가업상속공제는 법으로 정한 정당한 절세 수단입니다. 그러나 과세 대상 재산을 숨기거나 거짓 서류로 조작하면 탈세로 적발되어 과태료·형사처벌을 받을 수 있습니다. 공제 요건·사후관리도 엄격히 검증되므로, 정확한 신고와 투명한 경영 기록 유지가 필수입니다.',
  },
  {
    question: '가업상속공제 말고 다른 상속세 절세 방법도 있나요?',
    answer:
      '네, 가업승계 증여특례(상증법 §30의6), 비상장주식 과소평가 특례, 대출금 공제, 장례비 공제, 상속인별 공제한도(상증법 §15) 등이 있습니다. 상황에 따라 여러 제도를 조합할 수 있으므로, 반드시 세무 전문가와 상담하여 최적의 전략을 수립하시기 바랍니다.',
  },
];

export default function FamilyBusinessInheritanceDeduction2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '가업상속공제 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '가업상속공제 2026, 최대 600억 공제 요건과 사후관리 5년 완전 가이드',
    description:
      '중소·중견기업 가업 상속 시 영위기간별 300/400/600억 공제. 상속세 계산, 요건 체크, 5년 사후관리(고용·자산·업종 유지). 상증법 §18의2 기준.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['가업상속공제', '상속세', '가업승계', '중소기업 상속', '상증법 18조의2'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '가업상속공제 2026',
    description:
      '중소·중견기업 가업 상속 시 최대 600억원 상속세 공제. 요건과 5년 사후관리 완전 정리.',
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
                    { name: '가업상속공제 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">중소기업 경영진 · 10분 읽기 · 2026-07-11</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  가업상속공제 2026
                  <br />
                  <span className="text-2xl text-text-secondary">최대 600억원 상속세 공제, 요건과 사후관리 완벽 정리</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  중소·중견기업 경영진이라면, 사업을 자녀에게 물려줄 때 상속세가 얼마나 무거운 부담인지 알고 있을 것입니다. 기업 자산이 크면 상속세로 수십억원을 내야 하는 상황도 발생합니다. 하지만 정부는 가업상속공제라는 제도를 통해 이런 부담을 크게 줄여주고 있습니다. 이 가이드는 공제 한도, 적격 기업 기준, 상속인 자격, 그리고 핵심인 5년 사후관리 조건까지 완전히 정리해드립니다.
                </p>
              </header>

              <AdSlot slot="guide-family-business-inheritance-top" format="horizontal" />

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">가업상속공제란 무엇인가</h2>
                <p>
                  상속세 및 증여세법 §18의2에 따른 가업상속공제는 중소·중견기업의 경영진이 10년 이상 직접 경영한 사업을 자녀 등 후계자에게 물려줄 때, 일정 금액을 상속세 과세 대상에서 제외해주는 제도입니다. 간단히 말해, 상속세를 계산하기 전에 공제 대상 금액을 먼저 빼주는 것입니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">가업상속공제의 기본 원리</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    상속세 계산식: (총 유산 가액 - 공제액 - 상속인별 기초공제) × 세율
                    <br />
                    예: 총 유산 100억원, 가업상속공제 300억원 대상
                    <br />
                    → 과세대상 = min(100억, 100억 - 300억) = 0원
                    <br />
                    → 상속세 = 0원(또는 크게 감소)
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 공제 대상이 실제 자산을 초과할 수 있어, 중소기업의 세부담을 획기적으로 줄임.</span>
                  </p>
                </div>
                <p className="mt-4">
                  다만 이 혜택은 무조건 주어지는 것이 아닙니다. 기업 규모, 경영 기간, 상속인 자격, 그리고 무엇보다 상속 후 5년간의 사후관리 요건을 모두 충족해야만 받을 수 있습니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">영위기간별 공제 한도 (상증법 §18의2)</h2>
                <p>
                  가업상속공제 한도는 피상속인이 가업을 경영한 기간에 따라 달라집니다. 오래 경영할수록 더 큰 공제를 받을 수 있도록 설계됐습니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 가업상속공제 한도액 (상증법 §18의2, 2026 기준)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">피상속인 경영 기간</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">공제 한도</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">의미</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">10년 이상 20년 미만</td>
                        <td className="p-3"><strong>300억원</strong></td>
                        <td className="p-3">기본 공제</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">20년 이상 30년 미만</td>
                        <td className="p-3"><strong>400억원</strong></td>
                        <td className="p-3">20년 이상 경영</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">30년 이상</td>
                        <td className="p-3"><strong>600억원</strong></td>
                        <td className="p-3">최대 공제</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  공제 한도는 피상속인의 최대주주 지분 취득 연도부터 상속개시 전일까지의 기간으로 계산합니다. 따라서 30년 이상 경영 사업자는 최대 600억원까지 공제받을 수 있습니다.
                </p>
                <p className="mt-4">
                  ⚠️ 다만 공제 대상 자산이 공제 한도를 초과할 수 없습니다. 예를 들어 기업 자산이 500억원인데 공제 한도가 600억원이면, 500억원만 공제됩니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">가업상속공제 적용 요건 체크리스트</h2>
                <p>
                  공제를 받으려면 기업과 상속인이 여러 요건을 동시에 충족해야 합니다. 하나라도 빠지면 공제 대상이 아닙니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">기업 요건 (상증법 §18의2의2)</p>
                  <ul className="text-sm text-text-secondary space-y-2 ml-4 list-disc">
                    <li><strong>중소기업 기준:</strong> 상속개시 1년 전 말 기준 총자산 500억원 미만</li>
                    <li><strong>중견기업 기준:</strong> 별도 조건 충족 시 확대 적용 (일반적으로 매출액 5,000억원 미만)</li>
                    <li><strong>경영 기간:</strong> 피상속인이 상속개시 5년 전부터 직전일까지 계속 경영</li>
                    <li><strong>지분:</strong> 피상속인이 상속개시 직전 최대주주 지위 보유(비상장 40% 이상, 상장 20% 이상)</li>
                  </ul>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">상속인 요건 (상증법 시행령)</p>
                  <ul className="text-sm text-text-secondary space-y-2 ml-4 list-disc">
                    <li><strong>나이:</strong> 18세 이상</li>
                    <li><strong>가업 종사:</strong> 상속개시 2년 전부터 종사하거나, 상속개시 후 신고기한 내 임원 취임</li>
                    <li><strong>지분 유지:</strong> 상속세 신고 시 보유하던 지분을 5년 이상 90% 이상 보유</li>
                  </ul>
                </div>
                <p className="mt-4">
                  ⚠️ 다만 요건이 복잡하므로, 정확한 판단은 반드시 세무 전문가(세무사, 변호사) 상담이 필수입니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">상속 후 5년 사후관리 조건</h2>
                <p>
                  가업상속공제의 핵심은 상속 후 5년간의 사후관리입니다. 이 기간 동안 정부가 정한 조건을 위반하면 공제받은 금액 전체가 다시 상속세에 포함되어 추징됩니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사후관리 5년 필수 유지 요건</p>
                  <p className="text-sm text-text-secondary">
                    상속개시일로부터 5년 이내에 다음을 모두 충족해야 합니다.
                    <br />
                    <br />
                    <strong>1. 공제 대상 자산 유지</strong>
                    <br />
                    정당한 사유 없이 공제 대상 자산의 40% 이상을 처분하지 말아야 합니다. 예를 들어 공제 대상이 60억원이면 24억원 이상은 보유해야 합니다. (합법적 용도 변경, 재구조화 제외)
                    <br />
                    <br />
                    <strong>2. 가업 계속 영위</strong>
                    <br />
                    1년 이상 휴업하거나 폐업하면 안 되고, 주된 업종을 변경할 수 없습니다. 제조업에서 도매업으로 변경하면 조건 위반입니다.
                    <br />
                    <br />
                    <strong>3. 정규직 근로자 수 90% 이상 유지</strong>
                    <br />
                    상속개시 직전 평균 정규직 근로자 수를 기준으로, 5년 사후관리 기간의 평균이 90% 이상이어야 합니다. 예를 들어 직전 평균 100명이면 90명 이상 유지.
                    <br />
                    <br />
                    <strong>4. 총급여액 90% 이상 유지</strong>
                    <br />
                    동일하게 직전 평균 총급여액 대비 90% 이상을 유지해야 합니다. 임금 인상은 상관없으나, 급격한 삭감은 불가.
                    <br />
                    <br />
                    <strong>5. 상속인 지분 90% 이상 유지</strong>
                    <br />
                    상속세 신고 시 보유하던 지분을 5년 동안 90% 이상 유지해야 합니다. 지분 10% 이상을 매각하면 공제 회수.
                  </p>
                </div>
                <p className="mt-4">
                  ⚠️ 다만 정당한 사유(기술·기능 부족·경영 악화 등)가 있으면 국세청에 사전 신청하여 조건을 완화받을 수 있습니다. 하지만 사전 신청 없이 위반하면 추징됩니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">공제 회수 시나리오 3가지</h2>
                <p>
                  다음 중 하나라도 발생하면 공제받은 금액이 상속세에 다시 포함되어 추징됩니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">시나리오 1. 30년 경영 후 3년만에 회사 매각</p>
                  <p className="text-sm text-text-secondary">
                    · 공제 한도: 600억원
                    <br />
                    · 상속 후 3년 차에 기업을 매각(40% 이상 자산 처분)
                    <br />
                    · 결과: 600억원 공제 전체 회수 + 이자상당액 추징
                    <br />
                    · 상속세액 증가: 약 210~300억원 (세율 35~50% 적용 시)
                    <br />
                    <span className="text-xs text-text-tertiary">교훈: 사후관리 5년은 진짜 의무 조건입니다.</span>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">시나리오 2. 근로자 대량 감원</p>
                  <p className="text-sm text-text-secondary">
                    · 상속 직전: 정규직 100명, 총급여 50억원/년
                    <br />
                    · 상속 2년 차: 경영난으로 50명 감원, 총급여 25억원/년
                    <br />
                    · 결과: 근로자 수·총급여 모두 50%로 하락 (90% 미만)
                    <br />
                    · 공제 회수 대상이 됨
                    <br />
                    <span className="text-xs text-text-tertiary">교훈: 경영난이라도 사전 신청으로 완화받아야 합니다.</span>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">시나리오 3. 상속인이 지분 20% 매각</p>
                  <p className="text-sm text-text-secondary">
                    · 상속 시 상속인 지분 50%
                    <br />
                    · 상속 2년 차: 외부 투자자에게 지분 20% 매각 (현재 보유 30%)
                    <br />
                    · 결과: 상속 시 50% 대비 60%만 보유 (90% 미만)
                    <br />
                    · 공제 회수 대상
                    <br />
                    <span className="text-xs text-text-tertiary">교훈: 지분도 엄격하게 관리해야 합니다.</span>
                  </p>
                </div>
              </section>

              <AdSlot slot="guide-family-business-inheritance-mid" format="rectangle" />

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">가업상속공제 받기 위한 실무 절차</h2>
                <p>
                  공제를 받으려면 상속세 신고할 때 여러 서류를 함께 제출해야 합니다.
                </p>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li>
                    <strong>상속세 신고:</strong> 상속개시일부터 6개월 내에 관할 세무서에 신고 (가업상속공제 신청 의사 명시)
                  </li>
                  <li>
                    <strong>기업 관련 서류:</strong> 사업자 등록증, 결산 재무제표(최근 5년), 매출 기록, 최대주주 증명, 재산세 과세 현황
                  </li>
                  <li>
                    <strong>상속인 증명:</strong> 가족관계증명서, 상속인의 이력서, 임원 취임 증명서
                  </li>
                  <li>
                    <strong>공제 대상 자산:</strong> 가업에 직결된 부동산, 기계 장비, 주식 등 목록
                  </li>
                  <li>
                    <strong>기타:</strong> 상속인의 5년 사후관리 약정서(국세청 양식)
                  </li>
                </ul>
                <p className="mt-4">
                  ⚠️ 다만 서류가 복잡하고 요건도 까다로우므로, 반드시 세무사나 변호사와 함께 진행하는 것이 안전합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">가업상속공제와 다른 상속세 절세 제도의 조합</h2>
                <p>
                  가업상속공제 외에도 여러 절세 제도가 있습니다. 이들을 조합하면 상속세 부담을 더 줄일 수 있습니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 2. 주요 상속세 절세 제도 비교</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">제도명</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">대상</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">효과</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">가업상속공제</td>
                        <td className="p-3">10년 이상 경영 중소기업</td>
                        <td className="p-3">300~600억 공제</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">가업승계 증여특례(§30의6)</td>
                        <td className="p-3">가업 상속 전 미리 증여</td>
                        <td className="p-3">증여세 감면(10~50%)</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">배우자 상속세 공제</td>
                        <td className="p-3">배우자 상속분</td>
                        <td className="p-3">3억원 또는 상속분의 50%</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">자녀 공제한도</td>
                        <td className="p-3">각 상속인</td>
                        <td className="p-3">1인 2억원 공제(배우자 제외)</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">비상장주식 과소평가</td>
                        <td className="p-3">비상장주식 상속</td>
                        <td className="p-3">평가액 15~35% 감액</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  여러 제도를 조합하면 상속세를 획기적으로 줄일 수 있습니다. 예를 들어 가업상속공제 + 배우자 공제 + 자녀 공제를 함께 사용하면 효과가 극대화됩니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">2026년 가업상속공제의 변화와 전망</h2>
                <p>
                  정부는 2026년 가업상속공제 제도를 대폭 개편할 예정입니다. 최신 상황을 정리하면 다음과 같습니다.
                </p>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li>
                    <strong>공제 한도 인상 논의:</strong> 현재 600억원 최대 한도를 더 인상할 가능성이 검토 중입니다. 특히 중견기업과 영농법인에 대한 확대 적용이 논의 중입니다.
                  </li>
                  <li>
                    <strong>사후관리 완화:</strong> 5년의 사후관리 조건 중 일부를 완화하거나, 경영난 상황에서 신청 절차를 간소화하는 방안이 진행 중입니다.
                  </li>
                  <li>
                    <strong>조세 정책 변화:</strong> 상속세 최고세율이 50%에서 인상될 가능성도 있으므로, 공제 제도의 중요성이 더욱 높아질 것으로 예상됩니다.
                  </li>
                </ul>
                <p className="mt-4">
                  ⚠️ 다만 세법은 수시로 개정되므로, 정확한 최신 정보는 국세청(nts.go.kr) 또는 세무 전문가 상담이 필수입니다.
                </p>
              </section>

              <h2 className="text-2xl font-bold mb-6">자주 묻는 질문</h2>
              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h3 className="text-lg font-semibold text-text-primary">관련 계산기 및 가이드</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link
                    href="/calculator/inheritance-tax/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">상속세 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">상속 자산을 입력하여 예상 상속세액을 계산해보세요.</p>
                  </Link>
                  <Link
                    href="/guide/inheritance-tax-calculation-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">상속세 계산법 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">세율, 공제한도, 누진세 완전 정리.</p>
                  </Link>
                  <Link
                    href="/guide/inheritance-tax-deduction-limit-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">상속세 공제한도 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">배우자·자녀 공제, 기초공제, 특례 적용 기준.</p>
                  </Link>
                  <Link
                    href="/guide/inheritance-vs-gift-tax-comparison-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">상속세 vs 증여세 비교</div>
                    <p className="mt-1 text-sm text-text-secondary">어느 것이 더 유리한가, 전략적 선택 가이드.</p>
                  </Link>
                  <Link
                    href="/category/tax/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">모든 세금 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">양도세, 취득세, 종부세, 증여세 모음.</p>
                  </Link>
                  <Link
                    href="/guide/family-business-registration-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">중소기업 상속 등기 절차</div>
                    <p className="mt-1 text-sm text-text-secondary">가업 승계 시 법인 대표 변경, 주식 이전 등록.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 교육 목적으로 작성되었으며, 개인 맞춤형 세무 또는 법적 조언이 아닙니다. 가업상속공제 대상 여부, 공제 한도, 5년 사후관리 기준, 최종 상속세액은 관할 세무서 또는 국세청(nts.go.kr)에서 반드시 확인하세요. 특히 기업 규모, 경영 기간, 상속인 자격, 사후관리 조건이 복잡할 수 있으므로, 반드시 세무사나 변호사 상담이 필수입니다. 본 콘텐츠는 2026-07-11을 기준으로 작성되었으며, 상속세 및 증여세법 개정 시 즉시 업데이트됩니다. 가업상속공제의 정확한 기준은 법조항 <strong>상속세 및 증여세법 §18의2</strong>를 따릅니다. AI 보조 작성 후 운영자 검수 완료.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료:</strong>{' '}
                  <a href="https://www.nts.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">국세청 공식 사이트</a>,{' '}
                  <a href="https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?mi=40344&cntntsId=238919" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">국세청 가업승계 지원제도 안내</a>,{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터</a>.
                </p>
              </section>

              <ShareButtons
                title="가업상속공제 2026 완전 가이드"
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
