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

const URL = 'https://calculatorhost.com/guide/private-housing-subscription-deposit-amount-2026/';
const DATE_PUBLISHED = '2026-08-02';
const DATE_MODIFIED = '2026-08-02';

export const metadata: Metadata = {
  title: '청약 예치금액 2026, 지역별·면적별 300만~1500만 기준',
  description:
    '민영주택 청약 1순위는 지역과 전용면적에 따라 정해진 예치기준금액을 채워야 합니다. 서울·부산 300만~1500만원 등 지역별 기준과 거주지 기준 원칙, 면적 상향 방법을 주택공급규칙 기준으로 정리했습니다.',
  keywords: [
    '청약 예치금액',
    '청약통장 예치금',
    '민영주택 예치기준금액',
    '지역별 청약 예치금',
    '청약 1순위 예치금',
    '주택공급규칙 10조',
    '청약 면적별 예치금',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '청약 예치금액 2026 지역별 면적별 기준' }],
    title: '청약 예치금액 2026: 지역·전용면적별 300만~1500만원 정리',
    description: '민영주택 청약 1순위 예치기준금액. 서울 84제곱미터 300만원부터 모든 면적 1500만원까지 지역별 기준과 거주지 판정 원칙.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '청약 예치금액 2026: 지역·면적별 300만~1500만원',
    description: '민영주택 1순위 예치기준금액. 주택공급규칙 §10 별표2 기준 지역·전용면적별 정리.',
  },
};

const FAQ_ITEMS = [
  {
    question: '예치금을 언제까지 얼마를 넣어야 하나요?',
    answer:
      '입주자모집공고일 전날까지 해당 지역·면적 기준금액이 통장에 예치되어 있으면 됩니다. 매달 정기 납입한 금액이 아니어도 되고, 청약 직전에 일시금으로 부족분을 채워 넣어도 인정됩니다. 다만 청약통장 가입 자체가 공고일 기준 1순위 요건(수도권 12개월, 그 외 6개월 등)을 별도로 충족해야 하므로, 통장 개설 시점과 예치금 시점을 혼동하지 않도록 주의합니다.',
  },
  {
    question: '서울에 살면서 부산 아파트에 청약할 수 있나요?',
    answer:
      '민영주택은 원칙적으로 청약자의 거주지 기준으로 예치금과 지역 자격을 판정합니다. 즉 서울 거주자가 부산 소재 민영주택에 청약할 때는 서울(특별시) 예치기준금액을 그대로 적용받고, 해당 단지의 지역 우선공급·기타지역 순차 요건은 청약홈에서 따로 확인해야 합니다. 서울에 산다는 이유로 부산 지역 예치기준(300만원 동일)이 자동 적용되는 것이 아니라, 본인 거주지 기준표를 먼저 본다는 점이 핵심입니다.',
  },
  {
    question: '나중에 더 큰 평형에 청약하려면 예치금을 늘려야 하나요?',
    answer:
      '네, 더 큰 전용면적에 청약하려면 해당 구간의 예치기준금액을 채워야 합니다. 예를 들어 서울 거주자가 전용 84제곱미터로 청약하려면 300만원, 전용 100제곱미터는 600만원, 전용 120제곱미터는 1000만원이 필요합니다. 부족분은 청약통장에 추가 예치하면 되고, 예치금액 변경 신청은 입주자모집공고일 전날까지 완료되어야 인정됩니다.',
  },
  {
    question: '예치금이 기준에 1만원이라도 부족하면 어떻게 되나요?',
    answer:
      '예치금 부족은 부적격 사유이며, 당첨되어도 취소될 수 있습니다. 청약 시스템은 모집공고일 시점의 통장 잔액을 자동으로 조회하므로, 아슬아슬한 금액이라면 여유 있게 10만~50만원 정도 더 넣어두는 것이 안전합니다. 부적격 당첨자로 판명되면 일정 기간 재당첨 제한이 붙을 수 있으므로 사전 확인이 중요합니다.',
  },
  {
    question: '세종특별자치시나 제주도는 어느 기준을 따르나요?',
    answer:
      '세종·제주 등은 통상 "특별시·광역시를 제외한 지역(시·군)" 기준(85제곱미터 이하 200만원 등)을 적용하는 사례가 많지만, 별표의 지역구분은 개정될 수 있습니다. 청약을 앞두고 있다면 청약홈(applyhome.co.kr) 지역구분표 또는 해당 단지 입주자모집공고문의 예치기준을 반드시 재확인하는 것이 가장 안전합니다.',
  },
  {
    question: '청약통장 잔액이 기준보다 훨씬 많으면 유리한가요?',
    answer:
      '민영주택 1순위 자격 판정에는 기준금액을 넘기만 하면 되고, 초과분이 청약 순위나 당첨 확률에 직접 영향을 주지는 않습니다. 대신 가점제 배점(무주택 기간·부양가족·통장 가입 기간)이 훨씬 중요합니다. 다만 나중에 더 큰 면적으로 옮기거나 다른 단지에 재청약할 때 여유 예치금이 편의성을 높여줄 수 있습니다.',
  },
  {
    question: '국민주택 청약은 예치금이 아니라 뭘 보나요?',
    answer:
      '국민주택은 예치금액이 아니라 매월 정기 납입한 회차와 납입인정금액을 봅니다. 반면 민영주택은 정해진 예치기준금액만 채우면 1순위 자격이 인정됩니다. 따라서 같은 청약통장이라도 어느 유형(민영·국민)에 청약하느냐에 따라 자격 판정 방식이 완전히 달라진다는 점을 기억해야 합니다.',
  },
  {
    question: '청약통장에 예치금을 일시금으로 한 번에 넣어도 되나요?',
    answer:
      '민영주택 예치기준금액은 일시 예치가 인정됩니다. 매달 나누어 납입하지 않고 청약 직전에 부족분을 한꺼번에 입금해도 모집공고일 전날까지 잔액이 기준을 충족하면 1순위 예치금 요건을 만족합니다. 단, 통장 가입 기간 요건은 별도로 충족해야 하므로 통장 개설 자체가 늦었다면 예치금만으로 해결되지 않습니다.',
  },
];

export default function PrivateHousingSubscriptionDepositAmount2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '청약 예치금액 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '청약 예치금액 2026: 지역별·면적별 300만~1500만원 기준 완전 정리',
    description:
      '민영주택 청약 1순위 예치기준금액을 주택공급규칙 §10 별표2 기준으로 정리. 서울·광역시·시군 지역구분, 전용면적 4단계(85·102·135·모든 면적) 예치금액, 거주지 기준 원칙, 면적 상향 방법까지.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['청약 예치금액', '민영주택 예치기준금액', '지역별 청약 예치금', '주택공급규칙 10조', '청약 1순위'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '청약 예치금액 2026 지역별·면적별 기준',
    description:
      '민영주택 청약 1순위 예치기준금액을 지역·전용면적별로 정리한 실무 가이드.',
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
                    { name: '청약 예치금액 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">금융 · 8분 읽기 · 2026-08-02</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  청약 예치금액 2026
                  <br />
                  <span className="text-2xl text-text-secondary">지역별·면적별 300만~1500만원 기준</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  민영주택 청약 1순위 자격의 마지막 관문은 청약통장에 얼마가 들어 있느냐입니다. 매달 얼마씩 얼마 동안 넣었는지가 중요한 국민주택과 달리, 민영주택은 청약자의 거주지와 청약할 주택의 전용면적에 따라 정해진 예치기준금액만 채우면 됩니다. 이 가이드는 주택공급에 관한 규칙 §10 별표2를 기준으로 서울·부산·광역시·시군별 예치금액을 정리하고, 거주지 판정 원칙과 면적 상향 방법, 자주 놓치는 실수를 함께 다룹니다.
                </p>
              </header>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">청약 예치금액이란 무엇인가</h2>
                <p>
                  청약 예치금액은 민영주택 1순위 청약 자격을 인정받기 위해 청약통장에 미리 넣어두어야 하는 최소 금액입니다. 주택공급에 관한 규칙 §10①은 민영주택에 청약하려는 사람이 입주자모집공고일 현재 별표2에서 정한 금액 이상을 예치하고 있어야 한다고 규정합니다. 회차 기반의 국민주택 청약과 달리 민영주택은 잔액 기준이라는 점이 핵심입니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">한 문장 정의</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    청약 예치금액은 청약자의 거주지역과 청약할 주택의 전용면적에 따라 200만원부터 1,500만원까지 차등 적용되는 민영주택 1순위 잔액 요건입니다.
                    <br />
                    근거: 주택공급에 관한 규칙 §10① 및 별표2, 순위·순차는 §27·§28.
                  </p>
                </div>
                <p className="mt-4">
                  예치금액은 청약을 원하는 순간의 잔액이 기준이므로, 매달 나누어 납입하지 않고 청약 직전에 일시금으로 넣어도 인정됩니다. 다만 통장 가입 기간(수도권 12개월, 비수도권 6개월 등) 요건은 별도이므로, 예치금만으로 1순위가 완성되는 것은 아니라는 점을 기억해야 합니다.
                </p>
                <p className="mt-4">
                  <strong>다만,</strong> 규제지역·비규제지역, 특별공급, 신혼희망타운 등 세부 유형마다 예외적 요건이 추가될 수 있으므로 개별 단지의 입주자모집공고문을 반드시 함께 읽어야 합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">내 지역·면적 예치금은 얼마인가</h2>
                <p>
                  결론부터 말하면 서울·부산 거주자가 전용 85제곱미터 이하 민영주택에 청약할 때 300만원, 모든 면적을 열어두려면 1,500만원입니다. 지역구분 3단계와 전용면적 4단계가 교차하여 총 12칸의 표로 정리됩니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 민영주택 청약 예치기준금액(단위: 만원, 주택공급에 관한 규칙 §10① 별표2)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">구분</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">전용 85제곱미터 이하</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">전용 102제곱미터 이하</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">전용 135제곱미터 이하</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">모든 면적</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">특별시·부산광역시</td>
                        <td className="p-3"><strong>300</strong></td>
                        <td className="p-3">600</td>
                        <td className="p-3">1,000</td>
                        <td className="p-3"><strong>1,500</strong></td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">그 밖의 광역시</td>
                        <td className="p-3">250</td>
                        <td className="p-3">400</td>
                        <td className="p-3">700</td>
                        <td className="p-3">1,000</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">특별시·광역시 제외 지역(시·군)</td>
                        <td className="p-3">200</td>
                        <td className="p-3">300</td>
                        <td className="p-3">400</td>
                        <td className="p-3">500</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  전용면적은 청약하려는 주택의 면적 기준이며, 표에서 예치금이 큰 구간은 더 작은 구간을 모두 포함합니다. 즉 서울 거주자가 1,500만원을 예치해두면 84제곱미터부터 대형 평형까지 모든 면적에 청약할 수 있습니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">계산 사례로 확인하기</p>
                  <p className="text-sm text-text-secondary">
                    · 서울 거주자, 전용 84제곱미터 청약 → 최소 300만원 예치
                    <br />
                    · 서울 거주자, 전용 100제곱미터 청약 → 최소 600만원 예치
                    <br />
                    · 서울 거주자, 전용 120제곱미터 청약 → 최소 1,000만원 예치
                    <br />
                    · 대구 거주자, 전용 84제곱미터 청약 → 최소 250만원 예치
                    <br />
                    · 김해시 거주자, 전용 84제곱미터 청약 → 최소 200만원 예치
                    <br />
                    <span className="text-xs text-text-tertiary">경계값 주의: 예치금 299만원(서울 84제곱미터)은 부적격, 300만원 정확히 채워야 인정.</span>
                  </p>
                </div>
                <p className="mt-4">
                  <strong>예외:</strong> 세종특별자치시·제주도 등 특별자치 단위는 별표 개정에 따라 지역구분이 달라질 수 있으므로, 청약을 앞두고는 청약홈의 최신 지역구분표를 재확인하는 습관이 안전합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">어느 지역 기준으로 보나</h2>
                <p>
                  민영주택 예치기준금액은 청약자의 거주지역을 기준으로 판정하며, 공급하는 주택의 소재지 기준이 아닙니다. 이 원칙을 잘못 이해하면 예치금을 부족하게 준비하거나 반대로 과도하게 넣어두는 일이 생깁니다.
                </p>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li>
                    <strong>서울 거주자가 인천 소재 민영주택에 청약:</strong> 특별시(서울) 기준 예치금액이 그대로 적용됩니다. 전용 84제곱미터라면 300만원.
                  </li>
                  <li>
                    <strong>부산 거주자가 대구 소재 민영주택에 청약:</strong> 특별시·부산광역시 기준(300만원 등)이 적용됩니다. 대구 광역시 기준(250만원)이 아닙니다.
                  </li>
                  <li>
                    <strong>경기 남양주 거주자가 서울 소재 민영주택에 청약:</strong> 남양주는 특별시·광역시가 아닌 시·군에 해당하므로 시·군 기준(200만원 등)이 적용됩니다.
                  </li>
                </ul>
                <p className="mt-4">
                  거주지역 판정 기준일은 통상 입주자모집공고일이므로, 이사 예정이라면 전입신고 시점과 공고 일정을 함께 확인해야 합니다. 주민등록상 주소지가 그대로라면 실제 거주지와 관계없이 등록 주소를 기준으로 판정합니다.
                </p>
                <p className="mt-4">
                  <strong>다만,</strong> 개별 단지의 지역 우선공급(예: 해당 지역 거주 우선, 인근 지역 순차)은 예치금 기준과 별개의 규칙이므로, 예치금 요건을 만족했다고 해서 자동으로 지역 우선순위까지 확보되는 것은 아닙니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">언제까지 얼마를 넣어야 하나</h2>
                <p>
                  예치금액은 입주자모집공고일 전날까지 통장 잔액으로 충족되어 있으면 됩니다. 매달 정기 납입이 아니어도 되고, 청약 직전에 일시금으로 부족분을 넣어도 인정됩니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">시간 순서 정리</p>
                  <p className="text-sm text-text-secondary">
                    · 예: 서울 거주자, 전용 84제곱미터 청약 계획
                    <br />
                    · 청약통장 잔액 100만원 상태에서 관심 단지 모집공고 예정 확인
                    <br />
                    · 모집공고일 전날까지 200만원을 추가 입금하여 잔액 300만원 확보
                    <br />
                    · 모집공고일 당일 청약 접수 → 예치금 요건 충족(부족분 없음)
                    <br />
                    <span className="text-xs text-text-tertiary">주의: 은행 전산 반영 지연 가능성이 있으므로 공고일 2~3일 전 미리 입금하는 것이 안전.</span>
                  </p>
                </div>
                <p className="mt-4">
                  청약통장 가입 기간(수도권 12개월, 그 외 6개월 등)은 예치금과는 별개의 1순위 요건입니다. 통장 개설 자체가 늦었다면 예치금만으로 자격이 완성되지 않으므로, 통장 가입일과 예치금액을 함께 관리해야 합니다.
                </p>
                <p className="mt-4">
                  <strong>예외:</strong> 규제지역·투기과열지구·조정대상지역에 소재한 단지는 통장 가입 24개월 이상, 무주택 세대주 등 추가 조건이 붙는 경우가 있으므로, 개별 공고문의 1순위 요건 표를 반드시 함께 확인해야 합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">국민주택 청약과 무엇이 다른가</h2>
                <p>
                  민영주택은 예치기준금액이라는 잔액 요건을, 국민주택은 매월 정기 납입한 회차와 납입인정금액을 봅니다. 같은 청약통장을 쓰더라도 청약하는 주택 유형에 따라 자격 판정 방식이 다릅니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 2. 민영주택 vs 국민주택 청약 자격 기준 비교</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">항목</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">민영주택</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">국민주택</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">공급 주체</td>
                        <td className="p-3">민간 건설사(아파트 브랜드 다수)</td>
                        <td className="p-3">국가·지자체·LH·SH 등</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">1순위 핵심 요건</td>
                        <td className="p-3">지역·면적별 예치기준금액</td>
                        <td className="p-3">납입 회차(예: 24회 이상) + 납입인정금액</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">평가 방식</td>
                        <td className="p-3">잔액 충족 여부 + 가점제·추첨제</td>
                        <td className="p-3">회차·인정금액 순차 + 무주택 우선</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">전용면적 제한</td>
                        <td className="p-3">모든 면적 가능(예치금이 정하는 상한)</td>
                        <td className="p-3">보통 전용 85제곱미터 이하 중심</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  민영주택은 잔액만 채우면 되므로 늦게 준비한 청년·신혼부부에게도 문이 열려 있는 반면, 국민주택은 오랜 기간 꾸준히 납입한 무주택 세대주에게 유리하도록 설계돼 있습니다. 본인이 어느 트랙에 더 가까운지 파악한 뒤 준비 전략을 정하는 것이 시간과 자금 활용에 유리합니다.
                </p>
                <p className="mt-4">
                  <strong>다만,</strong> 하나의 청약통장으로 두 유형 모두에 청약할 수 있으므로, 통장 관리 자체는 이원화할 필요가 없습니다. 어느 시점에 어떤 단지에 청약할지가 결정되면 그때 부족한 요건(예치금 또는 회차)만 마저 채우면 됩니다.
                </p>
              </section>

              <section className="space-y-6 border-t border-border-base pt-8" data-speakable>
                <h2 className="text-2xl font-bold">예치금을 잘못 알면 생기는 일</h2>
                <p>
                  예치기준금액을 잘못 이해하면 부적격 당첨, 재당첨 제한, 청약 기회 상실 같은 실질적 불이익이 따라옵니다. 자주 발생하는 4가지 실수를 정리했습니다.
                </p>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li>
                    <strong>부족 예치금으로 청약:</strong> 서울 거주자가 전용 100제곱미터에 청약하면서 300만원만 예치한 경우, 600만원 기준을 채우지 못해 부적격 처리됩니다. 당첨되어도 취소되고 일정 기간 재당첨 제한이 붙을 수 있습니다.
                  </li>
                  <li>
                    <strong>주택 소재지 기준 착오:</strong> 부산 거주자가 시·군 지역 소재 단지에 청약하면서 시·군 기준(200만원)만 예치한 경우, 실제로는 본인 거주지인 부산 기준(300만원)이 적용되어 부족액 처리됩니다.
                  </li>
                  <li>
                    <strong>공고일 이후 입금:</strong> 모집공고일 당일이나 이후에 부족분을 입금해도 인정되지 않습니다. 반드시 공고일 전날까지 잔액이 기준을 충족해야 합니다.
                  </li>
                  <li>
                    <strong>이체 지연·전산 오류:</strong> 은행 영업시간이나 이체 시스템 지연으로 실제 잔액 반영이 늦어지는 사례가 있습니다. 공고일 임박 입금은 피하고 최소 2~3일 여유를 두는 것이 안전합니다.
                  </li>
                </ul>
                <p className="mt-4">
                  청약 부적격 판정은 단순히 이번 청약을 놓치는 것으로 끝나지 않고, 규정에 따라 일정 기간(수도권 1년 등) 재당첨이 제한될 수 있습니다. 예치금 준비는 청약 계획 초기에 반드시 확인해야 할 항목입니다.
                </p>
                <p className="mt-4">
                  <strong>예외:</strong> 단순 입력 오류나 시스템 문제로 인한 부적격은 소명·이의신청 절차가 있을 수 있으므로, 통보를 받았다면 즉시 관할 지자체 또는 청약홈 고객센터를 통해 확인해야 합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">청약 예치금 관련 자주 묻는 질문 흐름</h2>
                <p>
                  예치금 준비 순서를 실제 청약 절차 흐름으로 정리하면 다음과 같습니다. 아래 흐름은 청약통장을 이미 개설한 상태에서 시작하는 것으로 가정합니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">준비 흐름(6단계)</p>
                  <p className="text-sm text-text-secondary">
                    1단계: 청약 대상 지역·평형 확정(예: 서울, 전용 100제곱미터)
                    <br />
                    2단계: 표 1에서 해당 칸의 예치기준금액 확인(600만원)
                    <br />
                    3단계: 청약통장 현재 잔액 조회(예: 400만원)
                    <br />
                    4단계: 부족분(200만원) 계산 및 여유분(10만~30만원) 추가
                    <br />
                    5단계: 모집공고일 최소 2~3일 전에 입금 완료
                    <br />
                    6단계: 청약 접수 전 은행 잔액 재확인
                  </p>
                </div>
                <p className="mt-4">
                  실제 청약 당일에는 예치금 외에도 무주택 여부, 세대원 구성, 부양가족 수, 통장 가입 기간, 청약 자격 상실 사유 등 여러 요건을 함께 자동 조회합니다. 예치금 준비가 끝났다면 이어서 가점 계산·부양가족 등록 등 나머지 요건을 점검하는 것이 다음 단계입니다.
                </p>
              </section>

              <h2 className="text-2xl font-bold mb-6">자주 묻는 질문</h2>
              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h3 className="text-lg font-semibold text-text-primary">관련 계산기 및 가이드</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link
                    href="/calculator/housing-subscription/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">청약가점 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">무주택 기간·부양가족·통장 가입 기간으로 84점 만점 가점을 산출.</p>
                  </Link>
                  <Link
                    href="/guide/housing-subscription-first-priority-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">청약 1순위 조건 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">가입 기간·예치금·무주택 세대주 요건을 유형별로 정리.</p>
                  </Link>
                  <Link
                    href="/guide/housing-subscription-score-84-points-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">청약가점 84점 만점 전략</div>
                    <p className="mt-1 text-sm text-text-secondary">가점제 배점 구조와 만점 달성 조건을 자세히 확인.</p>
                  </Link>
                  <Link
                    href="/guide/housing-subscription-savings-deduction-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">청약저축 소득공제 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">주택청약종합저축 납입액의 연말정산 소득공제 조건.</p>
                  </Link>
                  <Link
                    href="/guide/housing-subscription-monthly-25-recognition-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">월 납입인정 25만원</div>
                    <p className="mt-1 text-sm text-text-secondary">국민주택 청약 회차·납입인정금액 상향 규정을 정리.</p>
                  </Link>
                  <Link
                    href="/category/finance/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">금융 계산기 모음</div>
                    <p className="mt-1 text-sm text-text-secondary">대출·예금·적금·청약 계산기를 한 곳에서.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 교육 목적으로 작성되었으며, 개인 맞춤형 청약 조언이 아닙니다. 실제 예치기준금액, 지역구분, 순위 순차, 규제지역 추가 요건 등은 개별 단지 입주자모집공고문과 청약홈(applyhome.co.kr)에서 반드시 확인하세요. 특히 세종·제주 등 특별자치 지역구분, 규제지역 추가 요건, 특별공급 자격은 개정될 수 있습니다. 본 콘텐츠는 2026-08-02을 기준으로 작성되었으며, 주택공급에 관한 규칙 개정 시 업데이트됩니다. 예치금액 및 순위 기준은 <strong>주택공급에 관한 규칙 §10①(예치기준금액), 별표2, §27·§28(민영주택 일반공급 순위·순차)</strong>을 따릅니다. AI 보조 작성 후 운영자 검수 완료.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터(주택공급에 관한 규칙)</a>,{' '}
                  <a href="https://www.applyhome.co.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">청약홈</a>,{' '}
                  <a href="https://www.molit.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">국토교통부</a>.
                </p>
              </section>

              <ShareButtons
                title="청약 예치금액 2026 지역별·면적별 기준 가이드"
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