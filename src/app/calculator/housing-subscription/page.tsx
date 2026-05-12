import type { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { Footer } from '@/components/layout/Footer';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { AdSlot } from '@/components/ads/AdSlot';
import { StructuredSummary } from '@/components/calculator/StructuredSummary';
import { FaqSection } from '@/components/calculator/FaqSection';
import { RelatedCalculators } from '@/components/calculator/RelatedCalculators';
import {
  buildSoftwareApplicationJsonLd,
  buildFaqPageJsonLd,
  buildBreadcrumbJsonLd,
  buildWebPageJsonLd,
  getCategoryUrlForCalculator,
  buildHowToJsonLd,
  buildSpeakableJsonLd,
} from '@/lib/seo/jsonld';
import { HousingSubscriptionCalculator } from './HousingSubscriptionCalculator';
import { AuthorByline } from '@/components/calculator/AuthorByline';

const URL = 'https://calculatorhost.com/calculator/housing-subscription/';

export const metadata: Metadata = {
  title: '청약가점 계산기 2026 | 84점 만점·가점 항목 | calculatorhost',
  description:
    '2026년 청약가점 계산기. 청약 항목별(무주택 기간·주택 소유·미성년 자녀·혼인 여부) 가점을 계산해 총 84점 만점 기준 순위 제시. 무료.',
  alternates: { canonical: URL },
  openGraph: {
    title: '청약가점 계산기 2026 — 84점 만점',
    description:
      '무주택 기간·부양가족·청약통장으로 청약가점과 당첨 확률을 계산합니다.',
    url: URL,
    type: 'website',

  },
  twitter: {
    card: 'summary_large_image',
    title: '청약가점 계산기 2026',
    description:
      '청약가점 즉시 계산: 무주택 기간, 부양가족, 청약통장 기간으로 당첨 가능성 판단.',
  },
};

const FAQ_ITEMS = [
  {
    question: '청약가점제와 추첨제는 뭐가 다른가요?',
    answer:
      '청약 모집 시 일부는 "가점제(85%)"로 진행되고, 일부는 "추첨제(15%)"로 진행됩니다. 가점제는 점수가 높을수록 당첨 확률이 올라가는 방식이고, 추첨제는 모두 동일한 확률로 당첨을 기원하는 복권 방식입니다. 같은 단지라도 가점제 일반분과 추첨제 일반분이 따로 나뉘어 모집되므로, 당신의 가점이 높으면 두 방식 모두에서 유리합니다.',
  },
  {
    question: '무주택 기간은 언제부터 계산하나요?',
    answer:
      '무주택 기간은 "청약신청일 기준"으로 계산됩니다. 예를 들어, 2024년 1월에 아파트를 팔고 2026년 4월에 청약하면, 무주택 기간은 약 2년 3개월입니다. 주의: 본인 및 배우자·직계비속의 소유 주택은 모두 제외되지 않습니다(일시적 2주택 등 특례 제외). 정확한 계산은 국토교통부 청약홈에서 "무주택자격 확인"을 통해 확인하세요.',
  },
  {
    question: '부양가족에는 누가 포함되나요?',
    answer:
      '부양가족은 본인 포함 직계비속(자녀, 손주, 부모)과 배우자의 직계비속입니다. 단, 만 30세 이상의 미혼 자녀는 제외될 수 있으니 주의하세요. 또한 실제 거주 여부와 무관하게, 호적상 또는 건강보험 피부양자 여부로 판정됩니다. 세부 기준은 당첨 이후 자격 심사 때 확인되므로, 미리 국토교통부 청약홈에 본인 정보를 등록해두면 도움이 됩니다.',
  },
  {
    question: '청약통장 가입 기간은 어떻게 계산되나요?',
    answer:
      '청약통장 가입 기간은 "실제 가입일"부터 "청약신청일"까지의 기간입니다. 6개월 미만이면 1점, 6개월 이상 1년 미만이면 2점, 이후 매년 1점씩 올라갑니다(15년 최대 17점). 통장을 해약했다가 다시 가입하면 이전 기간은 인정되지 않습니다. 또한 통장 잔액은 가점에 영향을 주지 않으며, 청약 당첨 후 월납할 수 있으므로 미리 목돈을 모아두지 않아도 됩니다.',
  },
  {
    question: '청약 당첨 가능성은 이 가점으로 확정되나요?',
    answer:
      '본 계산기는 "가점"만 계산하며, 실제 당첨 확률은 여러 요소에 영향을 받습니다: (1) 단지별 모집 인원, (2) 청약 신청자 수, (3) 신청자 평균 가점, (4) 당신 가점의 상대적 순위. 같은 100점이라도, 신청자 중 상위 10%면 거의 당첨이고, 상위 30%면 확률이 낮을 수 있습니다. 정확한 가능성은 청약홈에서 "청약 통계"를 참고하세요.',
  },
  {
    question: '청약통장은 어디서 개설하나요?',
    answer:
      '청약통장은 주택도시기금 관리사(주로 국민은행, 우리은행, 신한은행 등)에서 개설할 수 있습니다. 방문, 스마트폰 앱(청약홈), 은행 홈페이지 등으로 개설 가능합니다. 청약통장은 무이자이며, 미성년자도 개설할 수 있습니다(부모 동의 필요). 개설 후 매월 2만원 이상 납입해야 12개월 이후 청약 자격이 생깁니다.',
  },
  {
    question: '가점이 낮으면 어떻게 해야 하나요?',
    answer:
      '가점 상승 전략: (1) 시간 경과(무주택 기간·통장 기간 증가), (2) 자녀 출산·입양(부양가족 증가), (3) 부모와의 동거(부양가족 인정). 이 외에 나이·혼인·생애최초 등 "추가 가점"이 있으니, 청약홈의 "나의 가점 조회"에서 전체 항목을 확인하세요. 가점 조회 후에도 당첨 확률이 낮으면, 같은 지역 내 신규 단지를 기다리거나, 다른 지역을 고려하는 방법도 있습니다.',
  },
  {
    question: '가점 심사는 청약 전에 확인할 수 있나요?',
    answer:
      '청약홈(www.applyhome.co.kr)에서 로그인 후 "자격확인" → "무주택자격 확인" → "가점조회"로 미리 확인할 수 있습니다. 이 때 모든 항목(무주택, 부양가족, 통장 기간 등)이 맞는지 확인하세요. 오류가 있으면 청약 전에 정정을 요청할 수 있습니다. 청약 후 당첨이 되면 자격 심사 기간(보통 10일)에 서류 제출을 통해 최종 확인됩니다.',
  },
];

const RELATED = [
  {
    href: '/calculator/loan-limit',
    title: '대출한도(DSR)',
    description: 'DSR·LTV 기반 최대 대출액',
  },
  {
    href: '/calculator/broker-fee',
    title: '중개수수료',
    description: '구매/판매 중개수수료 계산',
  },
  {
    href: '/calculator/acquisition-tax',
    title: '취득세',
    description: '주택 취득세 계산',
  },
];

export default function HousingSubscriptionPage() {
  const softwareLd = buildSoftwareApplicationJsonLd({
    name: '청약가점 계산기',
    description:
      '무주택 기간, 부양가족 수, 청약통장 가입 기간을 입력해 청약가점(총 84점 만점)을 즉시 계산합니다.',
    url: URL,
  });
  const webPageLd = buildWebPageJsonLd({
    name: '청약가점 계산기 2026',
    description: '청약가점 즉시 계산: 무주택 기간, 부양가족, 청약통장 기간으로 당첨 가능성 판단',
    url: URL,
    datePublished: '2026-04-24',
    dateModified: '2026-04-27',
    isPartOf: getCategoryUrlForCalculator('housing-subscription'),
  });
  const howToLd = buildHowToJsonLd({
    name: '청약가점 계산기 사용 방법',
    description: '무주택 기간, 부양가족, 청약통장 기간을 입력하여 청약가점을 계산하는 단계별 가이드',
    steps: [
      { name: '무주택 기간 입력', text: '오늘 기준 무주택으로 경과한 년·월을 입력합니다.' },
      { name: '부양가족 입력', text: '본인 포함 직계 부양가족 수를 입력합니다.' },
      { name: '청약통장 가입 기간 입력', text: '청약통장 가입 이후 경과한 년·월을 입력합니다.' },
      { name: '혼인 상태 확인', text: '혼인 여부를 확인하여 추가 가점(1점)을 반영합니다.' },
      { name: '청약가점 결과 확인', text: '총 청약가점(84점 만점), 당첨 경쟁력을 확인합니다.' },
    ],
  });
  const faqLd = buildFaqPageJsonLd(
    FAQ_ITEMS.map((f) => ({ question: f.question, answer: f.answer }))
  );
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '부동산', url: 'https://calculatorhost.com/category/real-estate/' },
    { name: '청약가점' },
  ]);
  const speakableLd = buildSpeakableJsonLd(['[data-speakable]']);

  return (
    <div className="flex min-h-screen flex-col bg-bg-base text-text-primary">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableLd) }}
      />
      <Header />
      <div className="flex flex-1 flex-col lg:flex-row">
        <Sidebar />
        <main id="main-content" className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
          <article className="mx-auto max-w-4xl">
            {/* 헤더 */}
            <Breadcrumb
              items={[
                { name: '홈', href: '/' },
                { name: '부동산', href: '/category/real-estate/' },
                { name: '청약가점' },
              ]}
            />
            <h1 className="text-4xl font-bold tracking-tight">
              청약가점 계산기 2026
            </h1>
            <p className="mt-4 text-lg text-text-secondary">
              무주택 기간, 부양가족 수, 청약통장 가입 기간으로 청약가점을
              즉시 계산하세요. 총 84점 만점 기준으로 당신의 청약 가능성을
              판단할 수 있습니다.
            </p>
            <AuthorByline datePublished="2026-04-24" dateModified="2026-04-27" />

            {/* Structured Summary */}
            <StructuredSummary
              definition="청약가점은 주택청약 모집 시 가점제 방식에서 당첨자를 선정하기 위한 점수입니다. 무주택 기간(32점), 부양가족 수(35점), 청약통장 가입 기간(17점)으로 총 84점 만점이며, 점수가 높을수록 당첨 확률이 올라갑니다."
              table={{
                caption: '청약 가점 구성',
                headers: ['항목', '최대 점수'],
                rows: [
                  ['무주택 기간', '32점 (15년 이상)'],
                  ['부양가족 수', '35점 (6명 이상)'],
                  ['청약통장 기간', '17점 (15년 이상)'],
                ],
              }}
              tldr={[
                '청약가점은 총 84점 만점입니다.',
                '가점이 높을수록 가점제 당첨 확률이 올라갑니다.',
                '무주택 기간, 부양가족 수, 통장 가입 기간 3가지로 구성됩니다.',
              ]}
            />

            {/* AD-1 헤더 광고 */}
            <div className="my-8">
              <AdSlot slot="housing-subscription-top" format="horizontal" />
            </div>

            {/* 계산기 폼 */}
            <HousingSubscriptionCalculator />

            {/* AD-2 중간 광고 */}
            <div className="my-8">
            </div>

            {/* FAQ */}
            <FaqSection items={FAQ_ITEMS} />

            {/* 청약가점 설명 */}
            <section className="mt-12 space-y-6">
              <h2 className="text-2xl font-bold">청약가점이란 무엇인가요?</h2>
              <p>
                청약가점은 주택 청약 모집 때 "가점제"로 진행될 때 당첨자를 선정하기
                위해 사용하는 점수입니다. 국토교통부가 정한 규칙에 따라, 무주택
                기간, 부양가족 수, 청약통장 가입 기간 등을 점수화하며, 총 84점
                만점입니다. 같은 단지의 청약에서 가점이 높을수록 당첨 확률이
                올라갑니다.
              </p>
              <p>
                청약은 크게 두 가지 방식이 있습니다: (1) 가점제(85%) — 점수 높은
                사람부터 당첨, (2) 추첨제(15%) — 모두 동등한 확률로 복권. 같은
                단지라도 이 두 방식이 분리되어 모집되므로, 당신의 가점 순위를
                미리 파악하는 것이 중요합니다.
              </p>
            </section>

            {/* 가점 구성 */}
            <section className="mt-12 space-y-6">
              <h2 className="text-2xl font-bold">청약가점 구성 (총 84점)</h2>
              <div className="space-y-4">
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <h3 className="font-semibold text-primary-500 mb-3">
                    1. 무주택 기간 (최대 32점)
                  </h3>
                  <ul className="space-y-2 text-sm text-text-secondary">
                    <li>1년 미만: 2점</li>
                    <li>1년 이상 2년 미만: 4점</li>
                    <li>2년 이상: 매년 2점씩 증가</li>
                    <li className="font-semibold text-text-primary">
                      15년 이상: 32점 (최대값)
                    </li>
                  </ul>
                  <p className="mt-3 text-xs text-text-secondary">
                    ⚠️ 계산 기준일: 청약신청일
                  </p>
                </div>

                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <h3 className="font-semibold text-secondary-500 mb-3">
                    2. 부양가족 수 (최대 35점)
                  </h3>
                  <ul className="space-y-2 text-sm text-text-secondary">
                    <li>0명: 5점</li>
                    <li>1명: 10점</li>
                    <li>2명: 15점</li>
                    <li>3명: 20점</li>
                    <li>4명: 25점</li>
                    <li>5명: 30점</li>
                    <li className="font-semibold text-text-primary">
                      6명 이상: 35점 (최대값)
                    </li>
                  </ul>
                  <p className="mt-3 text-xs text-text-secondary">
                    ⚠️ 포함 범위: 본인 + 배우자 + 직계비속
                  </p>
                </div>

                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <h3 className="font-semibold text-highlight-500 mb-3">
                    3. 청약통장 가입 기간 (최대 17점)
                  </h3>
                  <ul className="space-y-2 text-sm text-text-secondary">
                    <li>6개월 미만: 1점</li>
                    <li>6개월 이상 1년 미만: 2점</li>
                    <li>1년 이상: 2 + (년수)점</li>
                    <li className="font-semibold text-text-primary">
                      15년 이상: 17점 (최대값)
                    </li>
                  </ul>
                  <p className="mt-3 text-xs text-text-secondary">
                    ⚠️ 월 2만원 이상 납입 필수 (12개월 이후 청약 가능)
                  </p>
                </div>
              </div>
            </section>

            {/* 가점 전략 */}
            <section className="mt-12 space-y-6">
              <h2 className="text-2xl font-bold">청약 당첨 전략</h2>
              <div className="space-y-4">
                <div className="rounded-lg border-l-4 border-primary-500 bg-bg-card p-4">
                  <h3 className="font-semibold">전략 1: 시간 벌기</h3>
                  <p className="mt-2 text-sm text-text-secondary">
                    가장 확실한 방법입니다. 무주택 기간과 청약통장 기간은 시간이
                    지나면 자동으로 올라갑니다. 1년마다 무주택 2점 + 청약통장 1점 =
                    3점씩 올라갑니다. 3년 버티면 9점 상승입니다.
                  </p>
                </div>

                <div className="rounded-lg border-l-4 border-secondary-500 bg-bg-card p-4">
                  <h3 className="font-semibold">전략 2: 가족 구성 변경</h3>
                  <p className="mt-2 text-sm text-text-secondary">
                    부양가족을 증가시키는 것입니다. 자녀 출산/입양 시 부양가족 1명
                    추가마다 5점씩 상승합니다. 부모와 함께 거주 시 부양 인정을 위한
                    서류(건강보험, 가족관계증명서 등) 준비해두세요.
                  </p>
                </div>

                <div className="rounded-lg border-l-4 border-highlight-500 bg-bg-card p-4">
                  <h3 className="font-semibold">전략 3: 단지 선택</h3>
                  <p className="mt-2 text-sm text-text-secondary">
                    같은 지역이라도 신규 단지는 경쟁이 치열하고, 기존 단지는 상대적으로
                    쉬울 수 있습니다. 청약 통계를 보고 당신의 가점 순위를 파악한 후,
                    당첨 확률이 높은 단지를 선택하세요.
                  </p>
                </div>

                <div className="rounded-lg border-l-4 border-danger-500 bg-bg-card p-4">
                  <h3 className="font-semibold">주의: 일시적 2주택 함정</h3>
                  <p className="mt-2 text-sm text-text-secondary">
                    새로 주택을 사더라도 기존 주택을 팔 때까지 일시적으로 2주택 상태가
                    됩니다. 이 기간 동안 다른 청약은 불가하니 주의하세요. 또한 배우자나
                    자녀 명의의 주택도 "부양 관계" 때문에 청약 자격 판단에 영향을 줄 수
                    있으므로 미리 확인하세요.
                  </p>
                </div>
              </div>
            </section>

            {/* AD-4 인피드 광고 */}
            <div className="my-8">
            </div>

            {/* 청약 정보 자료 */}
            <section className="mt-12 space-y-6">
              <h2 className="text-2xl font-bold">관련 정보 자료</h2>
              <ul className="list-inside list-disc space-y-2 text-text-secondary">
                <li>
                  <a
                    href="https://www.applyhome.co.kr"
                    className="text-primary-600 underline dark:text-primary-500"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    청약홈(www.applyhome.co.kr)
                  </a>
                  : 공식 청약 플랫폼 — 자격 확인, 청약 신청, 당첨 조회
                </li>
                <li>
                  <a
                    href="https://www.moi.go.kr"
                    className="text-primary-600 underline dark:text-primary-500"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    국토교통부(www.moi.go.kr)
                  </a>
                  : 청약 정책, 가점제 규칙 최신 정보
                </li>
                <li>
                  <a
                    href="https://www.hnews.co.kr"
                    className="text-primary-600 underline dark:text-primary-500"
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                  >
                    아파트특별공사
                  </a>
                  : 신규 아파트 청약 정보
                </li>
              </ul>
            </section>

            {/* 관련 계산기 */}
            <RelatedCalculators items={RELATED} />

            {/* 업데이트 로그 */}
            <section className="mt-12 border-t border-border-base pt-6">
              <h2 className="text-lg font-semibold">업데이트 로그</h2>
              <ul className="mt-3 space-y-2 text-sm text-text-secondary">
                <li>2026-04-24: 초판 발행 (2026 가점제 기준)</li>
              </ul>
            </section>

            {/* 출처·면책 */}
            <section className="mt-6 border-t border-border-base pt-6 mb-6">
              <p className="text-xs text-text-secondary mb-2">
                <strong>법적 근거</strong>: 주택공급에 관한 규칙 §27(가점제 항목·배점), §28(무주택 기간 산정), §29(부양가족 인정 범위). 공식 출처: <a href="https://www.applyhome.co.kr" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-600 underline dark:text-primary-500">청약홈(applyhome.co.kr)</a>, <a href="https://www.lh.or.kr" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-600 underline dark:text-primary-500">LH(한국토지주택공사)</a>, <a href="https://www.molit.go.kr" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-600 underline dark:text-primary-500">국토교통부</a> 주택공급규칙.
              </p>
            </section>

            {/* 면책조항 */}
            <section className="mt-6 border-t border-border-base pt-6">
              <p className="text-xs text-text-secondary">
                본 계산기는 참고용입니다. 실제 청약가점은 당첨 당시 국토교통부 기준에
                따라 재확인됩니다. 청약 자격, 부양가족 인정 범위, 무주택 여부 등은
                복잡한 규칙이 있으니, 청약홈에서 "자격확인"을 통해 정확히 확인하세요.
                본 서비스는 법률·재정 조언이 아닙니다.
              </p>
            </section>
          </article>
        </main>

        {/* AD-3 우측 스티키 광고 (lg+ 이상) */}
        <aside className="hidden w-80 bg-bg-base p-4 lg:block">
          <div className="sticky top-[5rem]">
          </div>
        </aside>
      </div>
      <Footer />

      {/* JSON-LD 스크립트 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
    </div>
  );
}
