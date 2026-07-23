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

// 북극성 수익 레버: [revenue-lever: indexing+traffic] (신규 색인 표면 + 검색 의도 흡수)

const URL = 'https://calculatorhost.com/guide/housing-subscription-first-priority-2026/';
const DATE_PUBLISHED = '2026-07-24';
const DATE_MODIFIED = '2026-07-24';

export const metadata: Metadata = {
  title: '주택청약 1순위 조건 2026, 국민·민영·규제지역 정리 | calculatorhost',
  description:
    '주택청약 1순위는 청약통장 가입기간, 납입횟수, 무주택 요건, 지역별 예치금으로 정해집니다. 국민주택과 민영주택, 규제지역의 1순위 조건 차이를 주택공급에 관한 규칙 기준으로 2026년판으로 정리했습니다.',
  keywords: [
    '주택청약 1순위 조건',
    '청약 1순위',
    '국민주택 1순위',
    '민영주택 1순위',
    '청약통장 납입횟수',
    '청약 예치금',
    '규제지역 청약',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '주택청약 1순위 조건 2026, 국민·민영·규제지역 정리' }],
    title: '주택청약 1순위 조건 2026, 국민·민영·규제지역 한눈 정리',
    description: '가입기간·납입횟수·예치금·무주택 요건까지. 국민주택과 민영주택, 규제지역의 1순위 조건 차이를 한 번에 정리했습니다.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '주택청약 1순위 조건 2026',
    description: '국민주택은 가입기간·납입횟수, 민영주택은 가입기간·예치금. 규제지역은 2년·24회. 한눈 정리.',
  },
};

const FAQ_ITEMS = [
  {
    question: '청약 1순위가 되려면 무엇이 필요한가요?',
    answer:
      '청약통장 가입기간과 납입 요건, 무주택 등 세대 요건을 충족해야 합니다. 국민주택은 가입기간과 납입 횟수가, 민영주택은 가입기간과 지역별 예치금이 핵심입니다. 규제지역(투기과열지구·청약과열지역)은 가입 2년·납입 24회 등 요건이 더 엄격합니다.',
  },
  {
    question: '수도권 국민주택 1순위 조건은 무엇인가요?',
    answer:
      '수도권 비규제지역 국민주택은 청약통장 가입 후 1년이 지나고 매월 납입을 12회 이상 하면 1순위가 됩니다. 여기에 무주택 세대구성원 요건을 갖춰야 합니다. 비수도권은 가입 6개월·납입 6회로 완화됩니다. 규제지역은 가입 2년·납입 24회로 강화됩니다.',
  },
  {
    question: '민영주택 1순위는 예치금이 얼마나 필요한가요?',
    answer:
      '민영주택은 청약하려는 지역과 전용면적에 따라 정해진 예치금을 통장에 넣어두어야 1순위가 됩니다. 예를 들어 서울·부산에서 전용 85제곱미터 이하는 300만원, 102제곱미터 이하는 600만원의 예치금 기준이 적용됩니다. 기타 광역시와 시·군은 기준 금액이 더 낮습니다.',
  },
  {
    question: '청약통장에 매월 얼마를 넣는 게 좋나요?',
    answer:
      '국민주택 청약은 월 납입 인정한도가 25만원으로 상향되었습니다(2024년 11월부터). 국민주택은 납입 인정금액이 당첨에 직접 영향을 주므로 한도까지 꾸준히 넣는 것이 유리합니다. 반면 민영주택은 예치금 총액 기준이므로, 지역·면적 예치금을 채우는 것이 우선입니다.',
  },
  {
    question: '1주택자도 청약할 수 있나요?',
    answer:
      '민영주택 일반공급 1순위는 무주택자뿐 아니라 1주택자도 신청할 수 있는 경우가 있습니다. 다만 규제지역이나 특별공급(무주택 요건)은 조건이 다릅니다. 국민주택 일반공급은 원칙적으로 무주택 세대구성원이 대상입니다. 본인 상황에 맞는 요건은 청약홈 공고문에서 확인하세요.',
  },
  {
    question: '1순위인데 왜 떨어지나요?',
    answer:
      '1순위는 지원 자격일 뿐 당첨을 보장하지 않습니다. 1순위 안에서 경쟁이 있으면 가점제(무주택기간·부양가족·통장가입기간, 84점 만점)나 추첨으로 당첨자를 가립니다. 인기 단지는 1순위 안에서도 높은 가점자끼리 경쟁하므로, 가점이 낮으면 추첨 물량이나 특별공급을 함께 노리는 것이 현실적입니다.',
  },
  {
    question: '규제지역은 1순위 조건이 어떻게 다른가요?',
    answer:
      '투기과열지구·청약과열지역에서는 청약통장 가입 2년·납입 24회 요건이 적용되고, 세대주만 청약할 수 있으며 과거 5년 내 당첨 이력이 없어야 하는 등 제한이 붙습니다. 재당첨 제한도 강화됩니다. 규제지역 지정은 수시로 바뀌므로 공고 시점 기준으로 확인해야 합니다.',
  },
  {
    question: '통장을 오래 들고만 있으면 1순위가 유지되나요?',
    answer:
      '가입기간·납입 요건을 충족하면 1순위 자격은 유지됩니다. 다만 그사이 주택을 취득해 무주택 요건이 깨지거나, 세대 구성이 바뀌면 특정 공고에서 자격이 달라질 수 있습니다. 또 당첨되면 통장은 사용된 것으로 처리되므로 이후 청약에는 새 요건이 적용됩니다.',
  },
];

export default function HousingSubscriptionFirstPriority2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '주택청약 1순위 조건 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '주택청약 1순위 조건 2026, 국민·민영·규제지역 한눈 정리',
    description:
      '주택청약 1순위 자격을 국민주택(가입기간·납입횟수)과 민영주택(가입기간·예치금), 규제지역 강화 요건으로 나눠 2026년 기준으로 정리한 청약 대기자 가이드.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['주택청약 1순위', '국민주택', '민영주택', '예치금', '규제지역 청약'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '주택청약 1순위 조건 2026',
    description:
      '국민주택·민영주택·규제지역별 주택청약 1순위 자격 요건과 예치금·납입횟수 정리.',
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
                    { name: '주택청약 1순위 조건 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">청약 대기자 · 8분 읽기 · 2026-07-24</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  주택청약 1순위 조건 2026
                  <br />
                  <span className="text-2xl text-text-secondary">국민·민영·규제지역 한눈 정리</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  청약을 준비할 때 가장 먼저 확인할 것이 1순위 자격입니다. 그런데 국민주택이냐 민영주택이냐, 규제지역이냐에 따라 요건이 제각각이라 헷갈립니다. 통장을 언제까지 들고 있어야 하는지, 매월 얼마를 넣어야 하는지, 예치금은 얼마인지를 한 번에 정리했습니다. 이 가이드는 청약 대기자가 자신의 1순위 여부를 스스로 점검하도록 돕는 것을 목적으로 합니다.
                </p>
              </header>

              <AdSlot slot="guide-housing-subscription-first-priority-top" format="horizontal" />

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">주택청약 1순위란?</h2>
                <p>
                  1순위는 입주자 모집 공고에서 먼저 청약할 수 있는 우선 자격입니다. 청약통장 종류와 주택 유형에 따라 요건이 나뉩니다(주택공급에 관한 규칙).
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">한눈 요약</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    국민주택: 가입기간 + 납입 횟수 + 무주택 세대구성원.
                    <br />
                    민영주택: 가입기간 + 지역·면적별 예치금.
                    <br />
                    규제지역: 가입 2년·납입 24회 + 세대주 등 강화 요건.
                  </p>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 청약통장 종류와 청약 가능 주택</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">통장 종류</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">청약 가능 주택</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">주택청약종합저축</td>
                        <td className="p-3">국민주택 + 민영주택 모두</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">청약저축</td>
                        <td className="p-3">국민주택만</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">청약예금·부금</td>
                        <td className="p-3">민영주택만</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p>
                  다만 신규 가입은 대부분 주택청약종합저축으로 이뤄집니다. 국민주택과 민영주택 모두에 청약할 수 있어 선택지가 넓기 때문입니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">국민주택 1순위 조건은?</h2>
                <p>
                  국민주택(공공이 짓거나 국민주택기금 지원을 받는 전용 85제곱미터 이하 주택) 1순위는 청약통장 가입기간과 납입 횟수로 정해집니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 2. 국민주택 1순위 가입·납입 요건 (지역별)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">지역</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">가입기간</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">납입 횟수</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">수도권(비규제)</td>
                        <td className="p-3">1년 경과</td>
                        <td className="p-3">12회 이상</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">비수도권(비규제)</td>
                        <td className="p-3">6개월 경과</td>
                        <td className="p-3">6회 이상</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">규제지역</td>
                        <td className="p-3">2년 경과</td>
                        <td className="p-3">24회 이상</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p>
                  여기에 무주택 세대구성원 요건을 갖춰야 합니다. 월 납입 인정한도는 25만원으로, 국민주택은 납입 인정금액이 많을수록 유리하므로 한도까지 넣는 것이 좋습니다.
                </p>
                <p>
                  다만 지역·단지마다 세부 조건이 다를 수 있으니, 실제 청약 전에는 청약홈 공고문의 자격 요건을 반드시 확인해야 합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">민영주택 1순위 조건은?</h2>
                <p>
                  민영주택은 가입기간을 채우고, 청약하려는 지역과 전용면적에 맞는 예치금을 통장에 넣어두면 1순위가 됩니다. 납입 횟수보다 예치금 총액이 핵심입니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 3. 민영주택 지역별 예치금 기준 (서울·부산 예시)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">전용면적</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">서울·부산 예치금</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">85제곱미터 이하</td>
                        <td className="p-3">300만원</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">102제곱미터 이하</td>
                        <td className="p-3">600만원</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">135제곱미터 이하</td>
                        <td className="p-3">1,000만원</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">모든 면적</td>
                        <td className="p-3">1,500만원</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p>
                  다만 예치금 기준은 지역별로 다릅니다. 기타 광역시, 기타 시·군은 서울·부산보다 낮은 금액이 적용되므로, 청약홈에서 청약 지역 기준을 확인하세요. 가입기간은 수도권 비규제 1년, 규제지역 2년입니다.
                </p>
              </section>

              <AdSlot slot="guide-housing-subscription-first-priority-mid" format="rectangle" />

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">1순위 자격 점검 사례</h2>
                <p>
                  실제 상황에 대입해 1순위 여부를 판단해 보겠습니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 1. 수도권 국민주택 청약 (비규제)</p>
                  <p className="text-sm text-text-secondary">
                    · 청약통장 가입 14개월, 매월 납입 14회, 무주택 세대구성원
                    <br />
                    · 요건: 가입 1년·납입 12회 충족
                    <br />
                    · 판정: <strong>1순위 해당</strong>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 2. 서울 민영주택 전용 84제곱미터 청약</p>
                  <p className="text-sm text-text-secondary">
                    · 가입 18개월, 통장 잔액 320만원
                    <br />
                    · 요건: 가입 1년 + 85제곱미터 이하 예치금 300만원 충족
                    <br />
                    · 판정: <strong>1순위 해당</strong>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 3. 규제지역 국민주택 청약</p>
                  <p className="text-sm text-text-secondary">
                    · 가입 20개월, 납입 20회, 무주택
                    <br />
                    · 요건: 규제지역은 가입 2년·납입 24회 필요
                    <br />
                    · 판정: <strong>아직 1순위 아님(요건 미달)</strong>
                    <br />
                    <span className="text-xs text-text-tertiary">경계: 규제지역은 24회를 채워야 하므로 4회가 더 필요합니다.</span>
                  </p>
                </div>
              </section>

              <section className="space-y-6 border-t border-border-base pt-8">
                <h2 className="text-2xl font-bold">1순위인데 왜 떨어지나요?</h2>
                <p>
                  1순위는 지원 자격일 뿐 당첨이 아닙니다. 1순위 안에서 경쟁이 생기면 가점제와 추첨으로 당첨자를 가립니다.
                </p>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li><strong>가점제(84점 만점):</strong> 무주택기간 32점 + 부양가족 수 35점 + 통장 가입기간 17점.</li>
                  <li><strong>추첨제:</strong> 일부 물량은 추첨으로 배정되어 가점이 낮아도 기회가 있음.</li>
                  <li><strong>특별공급:</strong> 신혼부부·생애최초·다자녀·신생아 등 별도 물량을 함께 노릴 수 있음.</li>
                </ul>
                <p>
                  다만 인기 단지는 1순위 안에서도 고가점자끼리 경쟁하므로, 가점이 낮다면 추첨 물량이 많은 단지나 특별공급을 병행하는 전략이 현실적입니다.
                </p>
              </section>

              <h2 className="text-2xl font-bold mb-6">자주 묻는 질문</h2>
              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h3 className="text-lg font-semibold text-text-primary">관련 계산기 및 가이드</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link
                    href="/guide/housing-subscription-score-84-points-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">청약가점 84점 계산 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">무주택기간·부양가족·통장기간 가점을 계산하세요.</p>
                  </Link>
                  <Link
                    href="/guide/housing-subscription-savings-deduction-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">청약저축 소득공제 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">청약통장 납입액의 연말정산 소득공제를 확인하세요.</p>
                  </Link>
                  <Link
                    href="/calculator/housing-subscription/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">청약가점 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">항목별 점수를 입력해 총점을 계산해 보세요.</p>
                  </Link>
                  <Link
                    href="/guide/newborn-special-mortgage-loan-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">신생아 특례 디딤돌대출</div>
                    <p className="mt-1 text-sm text-text-secondary">당첨 후 자금 마련에 쓸 수 있는 대출을 확인하세요.</p>
                  </Link>
                  <Link
                    href="/guide/first-home-acquisition-tax-reduction-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">생애최초 취득세 감면</div>
                    <p className="mt-1 text-sm text-text-secondary">첫 집 마련 시 취득세 감면 요건을 알아보세요.</p>
                  </Link>
                  <Link
                    href="/category/real-estate/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">모든 부동산 가이드</div>
                    <p className="mt-1 text-sm text-text-secondary">청약·전월세·중개수수료 가이드 모음.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 교육 목적으로 작성되었으며 개인 맞춤형 청약 조언이 아닙니다. 1순위 요건과 예치금·규제지역 기준은 주택공급에 관한 규칙 개정과 규제지역 지정 변경에 따라 달라집니다. 규제지역 지정은 수시로 변동되므로, 실제 청약 전 청약홈(applyhome.co.kr) 공고문의 자격 요건을 반드시 확인하세요. 본 콘텐츠는 2026-07-24 기준이며 규칙·고시 개정 시 업데이트됩니다. AI 보조 작성 후 운영자 검수 완료.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.applyhome.co.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">청약홈(한국부동산원)</a>,{' '}
                  <a href="https://www.lh.or.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">한국토지주택공사(LH)</a>,{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터</a>.
                </p>
              </section>

              <ShareButtons
                title="주택청약 1순위 조건 2026 가이드"
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
