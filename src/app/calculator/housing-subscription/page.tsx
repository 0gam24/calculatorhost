import { CalculatorPageContent } from '@/components/calculator/CalculatorPageContent';
import { QuickTable } from '@/components/calculator/QuickTable';
import { housingSubscriptionQuickTable } from '@/lib/quick-tables/housing-subscription';
import type { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
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
  title: '청약가점 계산기 2026 | 84점 만점 항목별 점수',
  description:
    '무주택 기간·부양가족 수·청약통장 가입기간으로 청약가점을 계산합니다. 84점 만점 기준 항목별 점수를 보여 줍니다.',
  keywords: [
    '청약가점 계산기',
    '청약 가점 계산',
    '무주택 기간 계산',
    '청약 부양가족 가점',
    '청약통장 가입기간 점수',
    '2026 청약가점',
  ],
  alternates: { canonical: URL },
  openGraph: {
    title: '청약가점 계산기 2026, 84점 만점',
    description: '무주택 기간·부양가족·청약통장으로 청약가점과 당첨 확률을 계산합니다.',
    url: URL,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '청약가점 계산기 2026',
    description: '청약가점 즉시 계산: 무주택 기간, 부양가족, 청약통장 기간으로 당첨 가능성 판단.',
  },
};

const FAQ_ITEMS = [
  {
    question: '청약가점제와 추첨제는 뭐가 다른가요?',
    answer:
      '가점제는 점수가 높은 순서로, 추첨제는 무작위 추첨으로 당첨자를 정합니다. 두 방식의 비율은 투기과열지구·조정대상지역 같은 지역 구분과 전용면적에 따라 다르고(주택공급에 관한 규칙 별표1), 단지마다 입주자모집공고에 적힙니다. 가점이 낮다면 모집공고에서 추첨 물량이 많은 주택형을 함께 살펴보세요.',
  },
  {
    question: '무주택 기간은 언제부터 계산하나요?',
    answer:
      '무주택 기간은 만 30세가 된 날부터 입주자모집공고일까지로 셉니다. 만 30세 전에 혼인했다면 혼인신고일부터 세고, 본인과 배우자 모두 주택이 없어야 합니다. 주택을 가졌다가 팔았다면 마지막으로 무주택이 된 날부터 다시 셉니다. 예: 만 35세 미혼이고 주택을 가진 적이 없다면 무주택 기간 5년으로 12점입니다(주택공급에 관한 규칙 별표1). 정확한 판정은 청약홈 청약자격 확인에서 하세요.',
  },
  {
    question: '부양가족에는 누가 포함되나요?',
    answer:
      '부양가족은 배우자, 직계존속, 미혼 자녀이며 신청자 본인은 세지 않습니다. 배우자는 주민등록이 따로 있어도 포함되고, 부모 같은 직계존속은 주택이 없고 세대주인 신청자와 3년 이상 계속 같은 주민등록표등본에 올라 있어야 합니다. 만 30세 이상 미혼 자녀는 1년 이상 같은 등본에 있어야 인정됩니다. 0명이면 5점, 1명마다 5점씩 늘어 6명 이상이면 35점입니다(주택공급에 관한 규칙 별표1).',
  },
  {
    question: '청약통장 가입 기간은 어떻게 계산되나요?',
    answer:
      '청약통장 가입 기간은 가입한 날부터 입주자모집공고일까지로 셉니다. 6개월 미만 1점, 6개월 이상 1년 미만 2점, 그 뒤 1년마다 1점씩 올라 15년 이상이면 17점입니다(주택공급에 관한 규칙 별표1). 배우자의 통장 가입 기간도 절반까지(최대 3점) 더할 수 있고, 통장을 해지했다가 새로 만들면 이전 기간은 인정되지 않습니다. 잔액은 점수에 들어가지 않지만 민영주택은 공고일까지 지역·면적별 예치금(예: 서울 전용 85㎡ 이하 300만 원)을 채워야 합니다(별표2).',
  },
  {
    question: '청약 당첨 가능성은 이 가점으로 확정되나요?',
    answer:
      '본 계산기는 "가점"만 계산하며, 실제 당첨 확률은 여러 요소에 영향을 받습니다: (1) 단지별 모집 인원, (2) 청약 신청자 수, (3) 신청자 평균 가점, (4) 당신 가점의 상대적 순위. 같은 60점이라도 신청자 중 상위 10%면 당첨 가능성이 높고, 상위 30%면 낮을 수 있습니다. 비슷한 단지의 경쟁률과 당첨 가점은 청약홈에서 확인하세요.',
  },
  {
    question: '청약통장은 어디서 개설하나요?',
    answer:
      '청약통장(주택청약종합저축)은 우리·국민·신한·하나·기업·농협 등 취급 은행의 영업점이나 은행 앱에서 만들 수 있습니다. 이자가 붙는 저축 상품이며, 미성년자도 법정대리인을 통해 가입할 수 있습니다. 매월 2만~50만 원을 넣을 수 있고, 1순위에 필요한 가입 기간·납입 횟수·예치금은 지역과 주택 종류에 따라 다르니 모집공고에서 확인하세요.',
  },
  {
    question: '가점이 낮으면 어떻게 해야 하나요?',
    answer:
      '청약 가점은 무주택 기간(최고 32점), 부양가족 수(최고 35점), 청약통장 가입 기간(최고 17점) 세 항목뿐이고 만점은 84점입니다. 시간이 지나면 무주택 기간은 1년마다 2점, 통장 기간은 1년마다 1점씩 오르고, 자녀가 생기거나 부모를 3년 이상 같은 등본에서 부양하면 부양가족 점수가 오릅니다. 나이·혼인으로 받는 추가 가점은 없습니다. 신혼부부·생애최초·다자녀 특별공급은 가점과 별개 자격이니 해당되면 함께 노려볼 만합니다.',
  },
  {
    question: '가점 심사는 청약 전에 확인할 수 있나요?',
    answer:
      '청약홈(www.applyhome.co.kr)의 청약자격 확인 메뉴에서 세대구성원, 주택 소유, 청약통장 정보를 미리 확인할 수 있습니다. 가점은 신청할 때 본인이 직접 입력하므로, 잘못 입력해 당첨되면 부적격으로 당첨이 취소되고 일정 기간 다른 청약 당첨이 제한될 수 있습니다. 당첨 뒤에는 서류를 내서 입력한 가점이 맞는지 최종 확인합니다.',
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
    dateModified: '2026-10-14',
    isPartOf: getCategoryUrlForCalculator('housing-subscription'),
  });
  const howToLd = buildHowToJsonLd({
    name: '청약가점 계산기 사용 방법',
    description:
      '무주택 기간, 부양가족, 청약통장 기간을 입력하여 청약가점을 계산하는 단계별 가이드',
    steps: [
      {
        name: '무주택 기간 입력',
        text: '만 30세(그 전에 혼인했다면 혼인신고일)부터 입주자모집공고일까지 본인과 배우자가 무주택이었던 기간을 입력합니다.',
      },
      {
        name: '부양가족 입력',
        text: '본인을 뺀 부양가족 수(배우자, 요건을 갖춘 직계존속·미혼 자녀)를 입력합니다.',
      },
      {
        name: '청약통장 가입 기간 입력',
        text: '청약통장에 가입한 날부터 입주자모집공고일까지의 기간을 입력합니다.',
      },
      { name: '청약가점 결과 확인', text: '총 청약가점(84점 만점), 당첨 경쟁력을 확인합니다.' },
    ],
  });
  const faqLd = buildFaqPageJsonLd(
    FAQ_ITEMS.map((f) => ({ question: f.question, answer: f.answer })),
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
        <main
          id="main-content"
          className="calculator-page min-w-0 flex-1 px-4 py-5 md:px-8 md:py-8"
        >
          <CalculatorPageContent guidesFor="housing-subscription"
            quickTable={<QuickTable data={housingSubscriptionQuickTable()} />}
            intro={
              <header>
                <Breadcrumb
                  items={[
                    { name: '홈', href: '/' },
                    { name: '부동산', href: '/category/real-estate/' },
                    { name: '청약가점' },
                  ]}
                />
                <h1 className="text-4xl font-bold tracking-tight">청약가점 계산기 2026</h1>
                <p className="mt-4 text-lg text-text-secondary">
                  무주택 기간과 가족 조건으로 청약 가점을 확인하세요.
                </p>
                <AuthorByline datePublished="2026-04-24" dateModified="2026-04-27" />
              </header>
            }
            calculator={<HousingSubscriptionCalculator />}
            related={
              <>
                <RelatedCalculators items={RELATED} />
              </>
            }
            faq={
              <>
                <FaqSection items={FAQ_ITEMS} />
              </>
            }
          >
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
            <div className="my-8"></div>
            <div className="my-8"></div>
            <section className="mt-12 space-y-6">
              <h2 className="text-2xl font-bold">청약가점이란 무엇인가요?</h2>
              <p>
                청약가점은 주택 청약 모집 때 "가점제"로 진행될 때 당첨자를 선정하기 위해 사용하는
                점수입니다. 국토교통부가 정한 규칙에 따라, 무주택 기간, 부양가족 수, 청약통장 가입
                기간 등을 점수화하며, 총 84점 만점입니다. 같은 단지의 청약에서 가점이 높을수록 당첨
                확률이 올라갑니다.
              </p>
              <p>
                청약 일반공급은 두 가지 방식으로 당첨자를 고릅니다. 가점제는 점수가 높은 사람부터,
                추첨제는 무작위로 뽑습니다. 두 방식의 비율은 투기과열지구·조정대상지역 같은 지역
                구분과 전용면적에 따라 다르고 모집공고에 적히므로(주택공급에 관한 규칙 별표1), 내
                가점과 함께 확인하는 것이 중요합니다.
              </p>
            </section>
            <section className="mt-12 space-y-6">
              <h2 className="text-2xl font-bold">청약가점 구성 (총 84점)</h2>
              <div className="space-y-4">
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <h3 className="mb-3 font-semibold text-primary-500">
                    1. 무주택 기간 (최대 32점)
                  </h3>
                  <ul className="space-y-2 text-sm text-text-secondary">
                    <li>1년 미만: 2점</li>
                    <li>1년 이상 2년 미만: 4점</li>
                    <li>2년 이상: 매년 2점씩 증가</li>
                    <li className="font-semibold text-text-primary">15년 이상: 32점 (최대값)</li>
                  </ul>
                  <p className="mt-3 text-xs text-text-secondary">
                    주의: 입주자모집공고일 기준. 만 30세(그 전 혼인 시 혼인신고일)부터 셉니다
                  </p>
                </div>

                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <h3 className="mb-3 font-semibold text-secondary-500">
                    2. 부양가족 수 (최대 35점)
                  </h3>
                  <ul className="space-y-2 text-sm text-text-secondary">
                    <li>0명: 5점</li>
                    <li>1명: 10점</li>
                    <li>2명: 15점</li>
                    <li>3명: 20점</li>
                    <li>4명: 25점</li>
                    <li>5명: 30점</li>
                    <li className="font-semibold text-text-primary">6명 이상: 35점 (최대값)</li>
                  </ul>
                  <p className="mt-3 text-xs text-text-secondary">
                    주의: 본인은 세지 않음. 배우자, 3년 이상 같은 등본의 직계존속, 미혼 자녀
                  </p>
                </div>

                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <h3 className="mb-3 font-semibold text-highlight-500">
                    3. 청약통장 가입 기간 (최대 17점)
                  </h3>
                  <ul className="space-y-2 text-sm text-text-secondary">
                    <li>6개월 미만: 1점</li>
                    <li>6개월 이상 1년 미만: 2점</li>
                    <li>1년 이상: 2 + (년수)점</li>
                    <li className="font-semibold text-text-primary">15년 이상: 17점 (최대값)</li>
                  </ul>
                  <p className="mt-3 text-xs text-text-secondary">
                    주의: 1순위 요건(가입 기간·납입 횟수·예치금)은 지역과 주택 종류마다 다릅니다
                  </p>
                </div>
              </div>
            </section>
            <section className="mt-12 space-y-6">
              <h2 className="text-2xl font-bold">청약 당첨 전략</h2>
              <div className="space-y-4">
                <div className="rounded-lg border-l-4 border-primary-500 bg-bg-card p-4">
                  <h3 className="font-semibold">전략 1: 시간 벌기</h3>
                  <p className="mt-2 text-sm text-text-secondary">
                    가장 확실한 방법입니다. 무주택 기간과 청약통장 기간은 시간이 지나면 자동으로
                    올라갑니다. 1년마다 무주택 2점 + 청약통장 1점 = 3점씩 올라갑니다. 3년 버티면 9점
                    상승입니다.
                  </p>
                </div>

                <div className="rounded-lg border-l-4 border-secondary-500 bg-bg-card p-4">
                  <h3 className="font-semibold">전략 2: 가족 구성 변경</h3>
                  <p className="mt-2 text-sm text-text-secondary">
                    부양가족을 증가시키는 것입니다. 자녀 출산/입양 시 부양가족 1명 추가마다 5점씩
                    상승합니다. 부모(직계존속)는 주택이 없고 3년 이상 계속 같은 주민등록표등본에 올라
                    있어야 부양가족으로 인정되니 등재 기간을 미리 챙겨 두세요.
                  </p>
                </div>

                <div className="rounded-lg border-l-4 border-highlight-500 bg-bg-card p-4">
                  <h3 className="font-semibold">전략 3: 단지 선택</h3>
                  <p className="mt-2 text-sm text-text-secondary">
                    같은 지역이라도 단지 규모·분양가·입지에 따라 당첨 가점이 크게 다릅니다. 청약홈에서
                    비슷한 단지의 경쟁률과 당첨 가점을 보고, 내 가점으로 해볼 만한 단지를 고르세요.
                  </p>
                </div>

                <div className="rounded-lg border-l-4 border-danger-500 bg-bg-card p-4">
                  <h3 className="font-semibold">주의: 세대원 주택도 따집니다</h3>
                  <p className="mt-2 text-sm text-text-secondary">
                    가점제는 원칙적으로 세대구성원 모두 주택이 없어야 신청할 수 있습니다. 배우자는
                    주민등록이 따로 있어도 같은 세대로 보고, 같은 등본에 오른 부모·자녀의 주택도
                    따지므로 신청 전에 확인하세요. 예외 기준은 입주자모집공고에서 확인할 수 있습니다.
                  </p>
                </div>
              </div>
            </section>
            <div className="my-8"></div>
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
                  : 공식 청약 플랫폼, 자격 확인, 청약 신청, 당첨 조회
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
            <section className="mt-12 border-t border-border-base pt-6">
              <h2 className="text-lg font-semibold">업데이트 로그</h2>
              <ul className="mt-3 space-y-2 text-sm text-text-secondary">
                <li>2026-04-24: 초판 발행 (2026 가점제 기준)</li>
              </ul>
            </section>
            <section className="mb-6 mt-6 border-t border-border-base pt-6">
              <p className="mb-2 text-xs text-text-secondary">
                <strong>법적 근거</strong>: 주택공급에 관한 규칙 §27(가점제 항목·배점), §28(무주택
                기간 산정), §29(부양가족 인정 범위). 공식 출처:{' '}
                <a
                  href="https://www.applyhome.co.kr"
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="text-primary-600 underline dark:text-primary-500"
                >
                  청약홈(applyhome.co.kr)
                </a>
                ,{' '}
                <a
                  href="https://www.lh.or.kr"
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="text-primary-600 underline dark:text-primary-500"
                >
                  LH(한국토지주택공사)
                </a>
                ,{' '}
                <a
                  href="https://www.molit.go.kr"
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="text-primary-600 underline dark:text-primary-500"
                >
                  국토교통부
                </a>{' '}
                주택공급규칙.
              </p>
            </section>
            <section className="mt-6 border-t border-border-base pt-6">
              <p className="text-xs text-text-secondary">
                본 계산기는 참고용입니다. 실제 청약가점은 당첨 당시 국토교통부 기준에 따라
                재확인됩니다. 청약 자격, 부양가족 인정 범위, 무주택 여부 등은 복잡한 규칙이 있으니,
                청약홈에서 "자격확인"을 통해 정확히 확인하세요. 본 서비스는 법률·재정 조언이
                아닙니다.
              </p>
            </section>
          </CalculatorPageContent>
        </main>

        {/* AD-3 우측 스티키 광고 (lg+ 이상) */}
        <aside className="hidden w-80 bg-bg-base p-4 lg:block">
          <div className="sticky top-[5rem]"></div>
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
