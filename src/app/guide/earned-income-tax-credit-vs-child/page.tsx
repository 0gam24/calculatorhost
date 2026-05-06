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
  buildDefinedTermSetJsonLd,
} from '@/lib/seo/jsonld';

const URL = 'https://calculatorhost.com/guide/earned-income-tax-credit-vs-child/';
const DATE_PUBLISHED = '2026-05-06';
const DATE_MODIFIED = '2026-05-06';

export const metadata: Metadata = {
  title: '근로장려금 vs 자녀장려금 차이 | 5월 신고 전 반드시 확인 | calculatorhost',
  description:
    '5월 소득 신고 시 근로장려금과 자녀장려금을 헷갈리는 직장인을 위한 비교 가이드. 자격 요건, 소득 기준, 신청 방법, 중복 수령 가능 여부를 명확히 정리했습니다.',
  keywords: [
    '근로장려금',
    '자녀장려금',
    '근로장려금 차이',
    '근로장려금 소득기준',
    '자녀장려금 소득기준',
    '근로장려금 자녀장려금 동시',
    '5월 신고',
    '근로장려금 신청',
  ],
  alternates: { canonical: URL },
  openGraph: {
    title: '근로장려금 vs 자녀장려금 | 5월 신고 전 필독',
    description: '저소득 가구를 위한 두 제도의 명확한 차이, 자격 기준, 신청 방법을 정리했습니다.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
};

const FAQ_ITEMS = [
  {
    question: '근로장려금과 자녀장려금을 동시에 받을 수 있나요?',
    answer:
      '네, 자격 요건을 만족하면 두 제도를 동시에 받을 수 있습니다. 다만 소득 기준이 다르므로 주의가 필요합니다. 근로장려금 대상 소득(~2,500만원)과 자녀장려금 대상 소득(~4,300만원)이 겹치는 구간에서 두 제도를 모두 신청할 수 있습니다. 두 제도를 동시에 신청하려면 5월 종합소득세 신고 시 국세청 홈택스에서 두 항목 모두 선택 신청하세요.',
  },
  {
    question: '근로장려금의 자격 요건은 무엇인가요?',
    answer:
      '근로장려금(조세특례제한법 §100의2)의 자격은 (1) 연 소득 2,500만원 이하 (2) 재산 1.7억원 미만 (3) 근로소득 또는 사업소득 있는 성인입니다. 단독가구(부양가족 없음)·홑벌이·맞벌이 각각 지급액이 다르며, 맞벌이 부부 모두 근로소득이 있을 때 각각 신청 가능합니다. 자녀가 없어도 받을 수 있다는 점이 자녀장려금과의 핵심 차이입니다.',
  },
  {
    question: '자녀장려금의 자격 요건은 무엇인가요?',
    answer:
      '자녀장려금(조세특례제한법 §100의3)은 (1) 홑벌이 또는 맞벌이 가구 (2) 연 소득 4,300만원 이하 (3) 재산 2.4억원 미만 (4) 18세 미만 자녀가 있어야 합니다. 자녀가 필수 요건이므로 자녀가 없으면 받을 수 없습니다. 부양가족이 많을수록 기본공제와 중복 적용되어 세금 혜택이 더 큽니다.',
  },
  {
    question: '소득 기준에서 "재산"은 어떻게 판단하나요?',
    answer:
      '근로장려금과 자녀장려금 모두 재산 기준이 있습니다. 근로장려금은 1.7억원 미만, 자녀장려금은 2.4억원 미만입니다. 재산은 주택·토지·금융자산 등 모든 재산을 포함하며, 과세표준이 아닌 실제 신고 재산액으로 판단합니다. 국세청 홈택스에서 "재산세과세명세서" 또는 "재산세 조회" 메뉴로 확인할 수 있습니다.',
  },
  {
    question: '단독가구는 근로장려금과 자녀장려금 중 뭘 받아야 하나요?',
    answer:
      '단독가구(부양가족 없음, 자녀 없음)는 근로장려금만 대상입니다. 자녀장려금은 18세 미만 자녀가 필수이므로 단독가구는 받을 수 없습니다. 단독가구라도 연소득 2,500만원 이하면 근로장려금 신청 대상이므로 5월 신고 시 반드시 신청하세요.',
  },
  {
    question: '근로장려금과 자녀장려금 신청 기한이 같나요?',
    answer:
      '네, 둘 다 5월 종합소득세 신고 기간(보통 5월 1~31일)에 함께 신청합니다. 국세청 홈택스 신고 메뉴에서 근로장려금, 자녀장려금 두 항목을 모두 체크하고 신청하면 됩니다. 신고 후 약 2~3개월 뒤(7월~8월경) 국세청에서 신청인 계좌로 일괄 지급합니다.',
  },
  {
    question: '맞벌이 부부라면 어떻게 신청하나요?',
    answer:
      '맞벌이 부부는 각자 근로소득이 있다면 부부 각각 근로장려금을 신청할 수 있습니다. 자녀장려금은 자녀가 있다면 부부 중 한 명이 신청하거나, 합산 소득을 기준으로 합산 신청도 가능합니다. 어느 쪽이 유리한지는 소득액과 자녀 수에 따라 달라지므로, 신고 전에 계산기로 시뮬레이션한 후 국세청에 문의하는 것을 권장합니다.',
  },
  {
    question: '사업소득이 있으면 근로장려금을 받을 수 있나요?',
    answer:
      '네, 근로장려금의 소득은 근로소득뿐 아니라 사업소득도 포함됩니다. 프리랜서, 자영업자도 연 소득 2,500만원 이하면 대상입니다. 다만 사업 적자가 있으면 손금 처리되어 소득이 줄어들 수 있으므로, 정확한 종합소득세 신고 후 근로장려금 신청 여부를 판단하세요.',
  },
];

export default function EarnedIncomeTaxCreditVsChildPage() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '근로장려금 vs 자녀장려금' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '근로장려금 vs 자녀장려금 차이 — 5월 신고 전 반드시 확인 (2026)',
    description:
      '5월 종합소득세 신고 시 저소득 가구가 받을 수 있는 근로장려금과 자녀장려금. 두 제도의 자격 요건, 소득 기준, 재산 기준, 신청 방법의 차이를 명확히 정리했습니다.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['근로장려금', '자녀장려금', '소득기준', '신청방법', '5월신고'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '근로장려금 vs 자녀장려금 | 5월 신고 전 필독 가이드',
    description:
      '저소득 가구를 위한 근로장려금과 자녀장려금의 명확한 차이. 자격 요건, 소득·재산 기준, 동시 수령 여부, 신청 방법을 정리했습니다.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
  });
  const faqLd = buildFaqPageJsonLd([...FAQ_ITEMS]);
  const speakableLd = buildSpeakableJsonLd(['[data-speakable]']);
  const definedTermSetLd = buildDefinedTermSetJsonLd({
    name: '근로장려금 vs 자녀장려금 가이드 용어집',
    description: '저소득 가구를 위한 근로장려금과 자녀장려금 제도의 핵심 용어 정의',
    url: URL,
    terms: [
      {
        name: '근로장려금(EITC, Earned Income Tax Credit)',
        description:
          '저소득 근로자·자영업자의 근로를 장려하기 위해 정부에서 지급하는 세금 환급금(조세특례제한법 §100의2). 연소득 2,500만원 이하, 재산 1.7억원 미만, 자녀 여부 무관.',
        inDefinedTermSet: '세금·장려금',
        url: 'https://www.nts.go.kr',
      },
      {
        name: '자녀장려금(CTC, Child Tax Benefit)',
        description:
          '저소득 가구의 18세 미만 자녀 양육을 지원하기 위해 정부에서 지급하는 지원금(조세특례제한법 §100의3). 자녀 1인당 최대 100만원, 연소득 4,300만원 이하, 재산 2.4억원 미만 기준.',
        inDefinedTermSet: '세금·장려금',
        url: 'https://www.law.go.kr',
      },
      {
        name: '가구원 합산소득',
        description:
          '근로장려금·자녀장려금 신청 시 기준이 되는 소득. 본인뿐 아니라 배우자, 미혼 자녀의 근로소득·사업소득을 모두 합산한 금액. 맞벌이 부부는 두 사람의 소득을 더한 값을 적용.',
        inDefinedTermSet: '소득·기준',
      },
      {
        name: '재산 기준',
        description:
          '근로장려금 1.7억원 미만, 자녀장려금 2.4억원 미만. 주택·토지·금융자산 등 모든 재산을 포함하며, 국세청 홈택스 재산세과세명세서로 확인 가능. 기준 초과 시 수급 불가.',
        inDefinedTermSet: '소득·기준',
        url: 'https://www.hometax.go.kr',
      },
    ],
  });

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermSetLd) }} />

      <Header />
      <div className="flex min-h-screen flex-col lg:flex-row">
        <Sidebar />
        <main className="flex-1 px-4 py-8 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            {/* 광고 슬롯 — 헤더 아래 */}
            <AdSlot slot="ca-pub-xxxxxxxxxxxxxxxx" format="horizontal" />

            <article>
              <Breadcrumb
                items={[
                  { name: '홈', href: '/' },
                  { name: '가이드', href: '/guide/' },
                  { name: '근로장려금 vs 자녀장려금' },
                ]}
              />

              <h1 className="mt-6 text-3xl font-bold text-text-primary">
                근로장려금 vs 자녀장려금 차이 — 5월 신고 전 반드시 확인 (2026)
              </h1>

              <p className="mt-4 text-lg text-text-secondary">
                5월 종합소득세 신고 시 저소득 가구가 헷갈리기 쉬운 두 제도를 명확히 구분하고, 자신에게 해당하는 제도를 정확히 신청하는 방법을 정리했습니다.
              </p>

              {/* 구조화 요약 — GEO 최적화 */}
              <div className="my-8 rounded-lg border border-border-base bg-bg-card p-6">
                <h2 className="mb-4 text-xl font-semibold text-text-primary">한눈에 보기</h2>
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border-base">
                      <th className="px-4 py-2 text-left font-semibold text-text-primary">항목</th>
                      <th className="px-4 py-2 text-left font-semibold text-text-primary">근로장려금</th>
                      <th className="px-4 py-2 text-left font-semibold text-text-primary">자녀장려금</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-border-base">
                      <td className="px-4 py-2 font-medium text-text-secondary">법적 근거</td>
                      <td className="px-4 py-2 text-text-secondary">조세특례제한법 §100의2</td>
                      <td className="px-4 py-2 text-text-secondary">조세특례제한법 §100의3</td>
                    </tr>
                    <tr className="border-b border-border-base">
                      <td className="px-4 py-2 font-medium text-text-secondary">소득 기준</td>
                      <td className="px-4 py-2 text-text-secondary">2,500만원 이하</td>
                      <td className="px-4 py-2 text-text-secondary">4,300만원 이하</td>
                    </tr>
                    <tr className="border-b border-border-base">
                      <td className="px-4 py-2 font-medium text-text-secondary">재산 기준</td>
                      <td className="px-4 py-2 text-text-secondary">1.7억원 미만</td>
                      <td className="px-4 py-2 text-text-secondary">2.4억원 미만</td>
                    </tr>
                    <tr className="border-b border-border-base">
                      <td className="px-4 py-2 font-medium text-text-secondary">필수 요건</td>
                      <td className="px-4 py-2 text-text-secondary">근로/사업소득 있음</td>
                      <td className="px-4 py-2 text-text-secondary">18세 미만 자녀 필수</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 font-medium text-text-secondary">최대 지급액</td>
                      <td className="px-4 py-2 text-text-secondary">최대 330만원</td>
                      <td className="px-4 py-2 text-text-secondary">자녀당 100만원</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* 광고 슬롯 — 계산기-본문 사이 */}
              <AdSlot slot="ca-pub-xxxxxxxxxxxxxxxx" format="rectangle" />

              <section className="mt-8">
                <h2 data-speakable className="text-2xl font-bold text-text-primary">
                  근로장려금이란 무엇인가?
                </h2>
                <p className="mt-4 text-text-secondary">
                  근로장려금(Earned Income Tax Credit, EITC)은 저소득 근로자와 사업자의 근로를 장려하기 위해 정부에서 지급하는 세금 환급금입니다. 조세특례제한법 §100의2에 따라 운영되며, 연 소득 2,500만원 이하인 근로자·사업자를 직접 지원합니다.
                </p>
                <p className="mt-3 text-text-secondary">
                  근로장려금의 핵심은 자녀 여부와 무관하다는 점입니다. 단독가구(부양가족 없음)도 받을 수 있으며, 근로소득 또는 사업소득이 있으면 대상입니다. 부부가 모두 근로소득이 있다면 각각 신청할 수 있습니다.
                </p>
              </section>

              <section className="mt-8">
                <h2 data-speakable className="text-2xl font-bold text-text-primary">
                  자녀장려금이란 무엇인가?
                </h2>
                <p className="mt-4 text-text-secondary">
                  자녀장려금(Child Tax Benefit)은 저소득 가구의 18세 미만 자녀 양육을 지원하기 위해 정부에서 지급하는 지원금입니다. 조세특례제한법 §100의3에 따라 운영되며, 자녀 1인당 최대 100만원(연)을 지급합니다.
                </p>
                <p className="mt-3 text-text-secondary">
                  자녀장려금의 핵심은 자녀가 필수 요건이라는 점입니다. 18세 미만 자녀가 있어야 신청할 수 있으며, 소득·재산 기준을 만족해야 합니다. 자녀가 없으면 아무리 소득이 낮아도 받을 수 없습니다.
                </p>
              </section>

              <section className="mt-8">
                <h2 data-speakable className="text-2xl font-bold text-text-primary">
                  가구원 합산소득의 의미
                </h2>
                <p className="mt-4 text-text-secondary">
                  근로장려금과 자녀장려금 모두 "가구원 합산소득" 기준을 사용합니다. 이는 배우자와 미혼 자녀의 소득을 모두 합산한 금액을 의미합니다. 맞벌이 부부라면 두 사람의 소득을 더해 기준을 판단해야 합니다.
                </p>
                <p className="mt-3 text-text-secondary">
                  예를 들어, 아내 근로소득 1,800만원 + 남편 사업소득 1,200만원 = 합산소득 3,000만원. 이 경우 근로장려금 기준 2,500만원을 초과하므로 근로장려금은 받을 수 없지만, 자녀가 있으면 자녀장려금 기준 4,300만원 이하이므로 신청 가능합니다.
                </p>
              </section>

              <section className="mt-8">
                <h2 data-speakable className="text-2xl font-bold text-text-primary">
                  재산 기준 명확히 이해하기
                </h2>
                <p className="mt-4 text-text-secondary">
                  근로장려금은 재산 1.7억원 미만, 자녀장려금은 2.4억원 미만 기준이 있습니다. 재산은 주택, 토지, 은행 예금, 주식, 채권 등 모든 자산을 포함하며, 과세표준이 아닌 실제 신고 재산액으로 판단합니다.
                </p>
                <p className="mt-3 text-text-secondary">
                  국세청 홈택스(hometax.go.kr)에 로그인하면 "재산세과세명세서" 메뉴에서 현재 신고된 재산 총액을 즉시 확인할 수 있습니다. 불명확하면 관할 세무서에 문의하세요.
                </p>
              </section>

              {/* FAQ — 중간 배치 (GEO) */}
              <section className="mt-8">
                <FaqSection items={FAQ_ITEMS} />
              </section>

              {/* 광고 슬롯 — 본문 중간 */}
              <AdSlot slot="ca-pub-xxxxxxxxxxxxxxxx" format="fluid" />

              <section className="mt-8">
                <h2 className="text-2xl font-bold text-text-primary">법적 근거 및 공식 출처</h2>
                <ul className="mt-4 space-y-2 text-text-secondary">
                  <li>
                    • 국세청 홈택스:
                    {' '}
                    <Link
                      href="https://www.hometax.go.kr/websquare/websquare.html?w2xPath=/ui/pp/index/main.xml"
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="text-primary-500 hover:underline"
                    >
                      hometax.go.kr
                    </Link>
                    {' '}
                    — 근로장려금·자녀장려금 신청 및 확인
                  </li>
                  <li>
                    • 조세특례제한법:
                    {' '}
                    <Link
                      href="https://www.law.go.kr/LSW/lsInfoP.do?lsiSeq=226846"
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="text-primary-500 hover:underline"
                    >
                      법령정보센터 §100의2, §100의3
                    </Link>
                  </li>
                  <li>
                    • 국세청 전자세금신고:
                    {' '}
                    <Link
                      href="https://www.nts.go.kr/nts/na/na_01_01_01.html"
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="text-primary-500 hover:underline"
                    >
                      nts.go.kr/세금신고
                    </Link>
                  </li>
                </ul>
              </section>

              <section className="mt-8">
                <h2 className="text-2xl font-bold text-text-primary">관련 계산기</h2>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <Link
                    href="/calculator/salary/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 text-primary-500 hover:bg-bg-base"
                  >
                    <div className="font-semibold">연봉 실수령액 계산기</div>
                    <div className="text-sm text-text-secondary">세금·보험료 공제 후 월급 확인</div>
                  </Link>
                  <Link
                    href="/calculator/child-tax-credit/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 text-primary-500 hover:bg-bg-base"
                  >
                    <div className="font-semibold">자녀장려금 계산기</div>
                    <div className="text-sm text-text-secondary">자녀당 지급액 즉시 계산</div>
                  </Link>
                  <Link
                    href="/calculator/freelancer-tax/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 text-primary-500 hover:bg-bg-base"
                  >
                    <div className="font-semibold">프리랜서 종합소득세</div>
                    <div className="text-sm text-text-secondary">사업소득 신고 시 세금 계산</div>
                  </Link>
                  <Link
                    href="/category/work/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 text-primary-500 hover:bg-bg-base"
                  >
                    <div className="font-semibold">일과 소득 카테고리</div>
                    <div className="text-sm text-text-secondary">더 많은 계산기 보기</div>
                  </Link>
                </div>
              </section>

              <section className="mt-8 rounded-lg border border-border-base bg-bg-card p-6">
                <h3 className="font-semibold text-text-primary">면책조항</h3>
                <p className="mt-3 text-sm text-text-secondary">
                  본 가이드는 일반적인 정보 제공을 목적으로 하며, 세법 개정으로 내용이 변경될 수 있습니다. 정확한 신청 및 계산은 국세청 홈택스 또는 관할 세무서에 문의하시기 바랍니다.
                </p>
              </section>

              <div className="mt-6 text-xs text-text-secondary">
                <p>
                  마지막 업데이트: {DATE_MODIFIED} | 작성자:
                  {' '}
                  <Link href="/about/" className="text-primary-500 hover:underline">
                    calculatorhost
                  </Link>
                </p>
              </div>
            </article>
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
}
