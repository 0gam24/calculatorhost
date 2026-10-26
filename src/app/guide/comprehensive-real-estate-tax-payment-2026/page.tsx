// [revenue-lever: indexing+traffic]
import type { Metadata } from 'next';
import Link from 'next/link';
import { GuideCalculatorCta } from '@/components/guide/GuideCalculatorCta';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { Footer } from '@/components/layout/Footer';
import { GuideHeader } from '@/components/guide/GuideHeader';
import { FaqSection } from '@/components/calculator/FaqSection';
import { ShareButtons } from '@/components/calculator/ShareButtons';
import {
  buildBreadcrumbJsonLd,
  buildArticleJsonLd,
  buildWebPageJsonLd,
  buildFaqPageJsonLd,
  buildSpeakableJsonLd,
} from '@/lib/seo/jsonld';

const URL = 'https://calculatorhost.com/guide/comprehensive-real-estate-tax-payment-2026/';
const DATE_PUBLISHED = '2026-10-27';
const DATE_MODIFIED = '2026-10-27';

export const metadata: Metadata = {
  title: '종부세 납부기간 2026, 12월 1~15일 고지서·분납·카드납부',
  description:
    '종부세 납부기간은 12월 1~15일. 고지서, 분납, 카드납부, 납부유예, 미납 가산세를 종부세법 §16·§20·§20의2로 정리합니다.',
  keywords: [
    '종부세 납부기간',
    '종부세 납부기한',
    '종부세 고지서',
    '종부세 분납',
    '종부세 카드납부',
    '종부세 납부유예',
    '종부세 미납 가산세',
    '종합부동산세법 16조',
    '종합부동산세법 20조',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '종부세 납부기간 2026' }],
    title: '종부세 납부기간 2026, 12월 1~15일 고지서·분납·카드납부',
    description:
      '종부세 납부기간은 12월 1~15일. 분납·카드납부·납부유예·미납 가산세를 §16·§20·§20의2로 정리.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '종부세 납부기간 2026',
    description:
      '12월 1~15일 납부, 250만 원 초과 분납, 카드납부, 60세·5년 보유자 납부유예, 미납 가산세까지 §16·§20·§20의2 기준.',
  },
};

const FAQ_ITEMS = [
  {
    question: '2026년 종부세는 언제까지 내야 하나요?',
    answer:
      '2026년 12월 1일부터 12월 15일(화)까지입니다. 종합부동산세법 §16①에 따라 세무서장이 그 기간에 부과·징수합니다. 고지서는 보통 11월 하순에 우편 또는 홈택스·손택스 전자고지로 도착하며, 15일을 하루라도 넘기면 §47의4에 따른 가산세가 붙습니다.',
  },
  {
    question: '종부세 고지서는 어디서 보나요?',
    answer:
      '우편으로 11월 하순에 받는 종이 고지서와, 홈택스·손택스의 전자고지 두 가지입니다. 홈택스 로그인 후 "납부·고지·환급" 메뉴에서 조회·납부가 가능합니다. 전자고지 신청자는 우편물이 오지 않고 홈택스 안내만 받습니다.',
  },
  {
    question: '세금을 한 번에 못 내면 나눠 낼 수 있나요?',
    answer:
      '네, 종부세법 §20에 따라 세액이 250만 원을 넘으면 일부를 납부기한 다음 날부터 6개월 안에 나눠 낼 수 있습니다. 500만 원 이하는 250만 원 초과분을, 500만 원 초과는 세액의 50% 이하를 분납 가능합니다. 농어촌특별세도 농어촌특별세법 §9①에 따라 같은 비율로 함께 나뉩니다.',
  },
  {
    question: '종부세를 신용카드로 낼 수 있나요?',
    answer:
      '네, 홈택스·손택스에서 신용카드와 체크카드로 모두 납부할 수 있습니다. 다만 납부대행수수료는 납세자가 부담하며, 국세청 안내 기준으로 신용카드 0.4~0.8%, 체크카드 0.15~0.5%입니다. 수수료가 최대 0.8%인 신용카드로 400만 원을 내면 32,000원이 더 듭니다.',
  },
  {
    question: '집을 팔 때까지 납부를 미룰 수 있나요?',
    answer:
      '요건을 모두 채우면 종부세법 §20의2에 따라 납부유예를 받을 수 있습니다. 1세대1주택자이고 과세기준일 현재 60세 이상이거나 해당 주택을 5년 이상 보유해야 하며, 직전연도 총급여 7천만 원 이하(종합소득 6천만 원 이하), 주택분 세액 100만 원 초과가 조건입니다. 납부기한 만료 3일 전까지 담보를 함께 제공해 신청합니다.',
  },
  {
    question: '12월 15일을 넘기면 가산세가 얼마나 붙나요?',
    answer:
      '먼저 국세기본법 §47의4①제3호에 따라 미납 세액의 3%가 한 번 붙고, 그다음 2026년 7월 1일 시행된 시행령 §27의4②에 따라 매 1개월 지날 때마다 미납 세액의 0.67%(월 1만분의 67)가 추가됩니다. 400만 원을 1개월 넘기면 가산세는 3% 12만 원 + 월 0.67% 26,800원으로 총 146,800원이 됩니다.',
  },
  {
    question: '고지된 금액이 맞는지 어떻게 확인하나요?',
    answer:
      '공시가격 합계와 공제금액, 공정시장가액비율 60%, 세율 구간, 재산세 공제액을 순서대로 다시 계산해 비교합니다. 가장 빠른 방법은 종부세 계산기에 공시가와 보유 주택 수를 넣어 산출세액을 뽑고, 고지서 숫자와 1만 원 단위로 비교하는 것입니다. 차이가 크면 §16③의 신고납부를 선택해 바로잡을 수 있습니다.',
  },
] as const;

export default function ComprehensiveRealEstateTaxPayment2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '종부세 납부기간 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '종부세 납부기간 2026, 12월 1~15일 고지서·분납·카드납부',
    description:
      '종부세 납부기간 12월 1~15일, 홈택스 고지서 확인, 250만 원 초과 분납, 카드납부 수수료, 60세·5년 보유자 납부유예, 미납 가산세까지 종합부동산세법 §16·§20·§20의2와 국세기본법 §47의4 현행 조문 기준으로 정리.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: [
      '종부세 납부기간',
      '종부세 분납',
      '종부세 카드납부',
      '종부세 납부유예',
      '종부세 미납 가산세',
      '종합부동산세법 16조',
      '종합부동산세법 20조',
    ],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '종부세 납부기간 2026, 12월 1~15일 고지서·분납·카드납부',
    description:
      '종부세 납부기간과 고지서 확인 방법, 분납·카드납부·납부유예·미납 가산세 처리를 2026년 조문 기준으로 정리한 가이드.',
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
                  { name: '종부세 납부기간 2026' },
                ]}
                category="세금"
                readingMinutes={11}
                publishedDate="2026-10-27"
                title="종부세 납부기간 2026"
                subtitle="12월 1~15일, 고지서·분납·카드납부"
                lead={
                  <p data-speakable>
                    <strong>종부세 고지서를 받고 "언제까지, 어떻게 내야 하나" 궁금하신가요?</strong>
                    납부기간은 매년 12월 1일부터 12월 15일까지로 정해져 있습니다. 그 안에 한 번에 내거나,
                    세액이 250만 원을 넘으면 일부를 6개월까지 미뤄 낼 수 있고, 조건이 맞으면 집을 팔 때까지
                    세금을 미루는 납부유예도 있습니다. 카드로도 낼 수 있지만 수수료가 붙고,
                    15일을 하루라도 넘기면 바로 3% 가산세가 붙습니다. 이 글은 2026년 10월 27일 기준으로
                    종합부동산세법 §16·§20·§20의2와 국세기본법 §47의4 현행 조문을 그대로 정리했습니다.
                    고지서 보는 법, 분납 금액 계산, 신용카드 수수료, 납부유예 요건, 체납 가산세까지 순서대로 다룹니다.
                  </p>
                }
              />

              <GuideCalculatorCta slug="comprehensive-real-estate-tax-payment-2026" />

              {/* Structured Summary */}
              <section aria-label="핵심 요약" className="card border-l-4 border-l-primary-500">
                <h2 className="mb-4 text-2xl font-bold text-primary-700 dark:text-primary-300">
                  30초 요약, 종부세 납부 한눈에
                </h2>
                <div className="rounded-lg bg-bg-card p-3 text-sm">
                  <p className="font-semibold text-text-primary">정의</p>
                  <p className="mt-1 text-text-secondary" data-speakable>
                    종부세 납부기간은 매년 12월 1일부터 12월 15일까지 15일로, 종합부동산세법 §16①에서 정한 지정납부기한입니다.
                  </p>
                </div>

                <div className="mt-4 overflow-x-auto">
                  <table className="w-full text-sm">
                    <caption className="mb-2 text-left font-semibold text-text-primary">
                      2026년 종합부동산세 납부 일정과 선택지 (종부세법 §16·§20·§20의2)
                    </caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th className="px-3 py-2 text-left" scope="col">항목</th>
                        <th className="px-3 py-2 text-left" scope="col">내용</th>
                        <th className="px-3 py-2 text-left" scope="col">근거</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="px-3 py-2 font-semibold">과세기준일</td>
                        <td className="px-3 py-2">2026년 6월 1일 보유자 기준</td>
                        <td className="px-3 py-2">§3</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="px-3 py-2 font-semibold">고지서 발송</td>
                        <td className="px-3 py-2">11월 하순, 우편과 홈택스 전자고지</td>
                        <td className="px-3 py-2">§16①</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="px-3 py-2 font-semibold">납부기한</td>
                        <td className="px-3 py-2">12월 1일 ~ 12월 15일(화)</td>
                        <td className="px-3 py-2">§16①</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="px-3 py-2 font-semibold">신고납부 선택</td>
                        <td className="px-3 py-2">같은 기간에 직접 신고·납부 가능</td>
                        <td className="px-3 py-2">§16③</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="px-3 py-2 font-semibold">분납</td>
                        <td className="px-3 py-2">세액 250만 원 초과분을 6개월 안에</td>
                        <td className="px-3 py-2">§20</td>
                      </tr>
                      <tr>
                        <td className="px-3 py-2 font-semibold">납부유예</td>
                        <td className="px-3 py-2">60세 이상 또는 5년 보유 1주택자, 담보 제공</td>
                        <td className="px-3 py-2">§20의2</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="mt-4 rounded-lg bg-primary-500/10 p-4 text-sm text-primary-700 dark:text-primary-300">
                  <p className="font-semibold">기억할 네 가지</p>
                  <ul className="mt-2 list-inside list-disc space-y-1">
                    <li>납부기간은 <strong>12월 1일 ~ 12월 15일</strong>, 15일을 넘기면 즉시 3% 가산세</li>
                    <li>세액 <strong>250만 원 초과</strong>면 일부를 6개월까지 분납 가능, 농특세도 비율대로 함께</li>
                    <li>신용카드 수수료 <strong>0.4 ~ 0.8%</strong>, 체크카드 0.15 ~ 0.5% (납세자 부담)</li>
                    <li>1세대1주택 + 60세↑ 또는 5년 보유 + 소득 요건이면 <strong>납부유예</strong> 가능</li>
                  </ul>
                </div>
              </section>

              {/* 1. 납부기간 */}
              <section className="space-y-4">
                <h2 className="text-2xl font-bold">1. 2026년 종부세 납부기간은 언제까지인가요?</h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  2026년 12월 1일 월요일부터 12월 15일 화요일까지 15일간입니다. 종합부동산세법 §16①은 세무서장이 매년 12월 1일부터 12월 15일까지 종합부동산세를 부과·징수한다고 정하고 있으며, 이 기간이 지정납부기한입니다. 과세기준일은 §3에 따라 2026년 6월 1일이며, 그날 주택을 가진 사람이 납세의무자가 됩니다. 6월 2일 이후에 집을 샀거나 팔았어도 2026년분 종부세의 납세의무는 6월 1일 소유자가 집니다.
                </p>
                <p className="text-text-secondary leading-relaxed">
                  고지서(납부고지서)는 보통 11월 하순에 발송됩니다. 우편으로 받거나, 전자고지를 신청한 분은 홈택스·손택스로 받습니다. 종부세는 원칙적으로 세무서장이 세액을 결정해 고지하는 부과과세 세목이지만, §16③은 고지 대신 같은 기간(12월 1일 ~ 12월 15일)에 납세자가 직접 신고·납부하는 방식도 선택할 수 있도록 열어 두고 있습니다. 신고납부를 선택하면 신고서 양식에 과세표준과 세액을 적어 홈택스로 제출하고 납부하면 됩니다.
                </p>
                <div className="rounded-lg bg-bg-raised p-4 text-sm text-text-secondary">
                  <p className="font-semibold text-text-primary">기억해 둘 날짜</p>
                  <ul className="mt-2 list-inside list-disc space-y-1">
                    <li>과세기준일: 2026년 6월 1일 (주택 보유 여부)</li>
                    <li>고지서 발송: 2026년 11월 하순 (우편 또는 홈택스)</li>
                    <li>납부기한: 2026년 12월 1일 월요일 ~ 12월 15일 화요일</li>
                    <li>분납 2회분 기한: 2027년 6월 15일(월)까지</li>
                  </ul>
                </div>
                <p className="text-text-secondary leading-relaxed">
                  다만, 12월 15일이 토·일·공휴일이면 다음 평일까지로 밀립니다(국세기본법 §5). 2026년은 12월 15일이 화요일이라 그대로 적용됩니다. 또 세무서장이 고지서 발송을 늦추거나 납부기한을 연장한 경우에는 그 안내가 우선합니다.
                </p>
              </section>

              {/* 2. 고지서 확인 */}
              <section className="space-y-4">
                <h2 className="text-2xl font-bold">2. 종부세 고지서는 어디서 보나요?</h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  두 가지 경로가 있습니다. 하나는 11월 하순에 집으로 오는 우편 고지서이고, 다른 하나는 홈택스(PC)·손택스(모바일)의 전자고지입니다. 전자고지를 미리 신청해 둔 분은 종이 우편이 오지 않고 홈택스 알림만 옵니다.
                </p>
                <p className="text-text-secondary leading-relaxed">
                  홈택스에서 보는 순서는 다음과 같습니다. 로그인 후 상단 "납부·고지·환급" 메뉴에서 종합부동산세 고지 내역을 조회하면 공시가격 합계, 공제금액, 과세표준, 산출세액, 재산세 공제액, 세액공제액, 농어촌특별세, 최종 납부세액이 순서대로 표시됩니다. 그 자리에서 가상계좌·계좌이체·신용카드로 바로 납부할 수 있고, 분납 신청과 납부유예 신청도 같은 메뉴에서 가능합니다. 손택스 앱도 메뉴 구성이 같습니다.
                </p>
                <div className="rounded-lg bg-bg-card p-4 text-sm text-text-secondary">
                  <p className="font-semibold text-text-primary">고지서에서 꼭 확인할 숫자</p>
                  <ul className="mt-2 list-inside list-disc space-y-1">
                    <li>보유 주택 공시가격 합계</li>
                    <li>공제금액(1세대1주택 12억 / 그 외 9억)</li>
                    <li>과세표준(공시 합계 - 공제) × 공정시장가액비율 60%</li>
                    <li>산출세액과 공제할 재산세액(§9③)</li>
                    <li>세액공제(고령자·장기보유, 1세대1주택자)</li>
                    <li>농어촌특별세(종부세액의 20%)</li>
                    <li>최종 납부세액과 가상계좌 번호</li>
                  </ul>
                </div>
                <p className="text-text-secondary leading-relaxed">
                  다만, 전자고지만 신청한 상태에서 홈택스 알림을 놓치면 납부기한을 모르고 지나칠 수 있습니다. 11월 말이 되면 홈택스 로그인 또는 손택스 앱을 열어 고지 내역이 있는지 직접 확인하는 것이 안전합니다. 공동명의 주택은 보통 각자 지분만큼 따로 고지됩니다. 부부 공동명의 1주택 특례를 신청했다면 신청한 한 사람에게 고지됩니다.
                </p>
              </section>

              {/* 3. 분납 */}
              <section className="space-y-4">
                <h2 className="text-2xl font-bold">3. 세금을 한 번에 못 내면 나눠 낼 수 있나요?</h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  네, 종합부동산세법 §20에 따라 세액이 250만 원을 넘으면 일부를 납부기한 다음 날부터 6개월 안에 나눠 낼 수 있습니다. 세액 기준에 따라 미룰 수 있는 금액이 다릅니다. 500만 원 이하는 250만 원 초과분을, 500만 원 초과는 세액의 50% 이하를 분납할 수 있습니다. 농어촌특별세는 농어촌특별세법 §9①에 따라 종부세 분납 비율에 맞춰 함께 나뉩니다.
                </p>

                <div className="rounded-lg bg-bg-card p-4 text-sm text-text-secondary">
                  <p className="font-semibold text-text-primary">사례 A. 고지세액 400만 원 (500만 원 이하)</p>
                  <ul className="mt-2 list-inside list-disc space-y-1">
                    <li>1차: 2026년 12월 15일까지 <strong>250만 원</strong></li>
                    <li>2차: 2027년 6월 15일까지 <strong>150만 원</strong> (250만 원 초과분)</li>
                    <li>농어촌특별세 80만 원도 같은 비율(5:3)로 분납, 1차 50만 원 + 2차 30만 원</li>
                  </ul>
                </div>

                <div className="rounded-lg bg-bg-card p-4 text-sm text-text-secondary">
                  <p className="font-semibold text-text-primary">사례 B. 고지세액 1,000만 원 (500만 원 초과)</p>
                  <ul className="mt-2 list-inside list-disc space-y-1">
                    <li>세액의 50% = 500만 원까지 미룰 수 있음</li>
                    <li>1차: 2026년 12월 15일까지 <strong>500만 원</strong></li>
                    <li>2차: 2027년 6월 15일까지 <strong>500만 원</strong></li>
                    <li>농어촌특별세 200만 원도 같은 비율(5:5)로 분납, 100만 원씩</li>
                  </ul>
                  <p className="mt-3 text-xs text-text-tertiary">
                    고지세액은{' '}
                    <Link href="/calculator/comprehensive-property-tax/" className="text-primary-600 underline dark:text-primary-500">
                      종합부동산세 계산기
                    </Link>
                    로 미리 추정해 보고, 분납 신청은 홈택스에서 1차 납부 전까지 함께 처리합니다.
                  </p>
                </div>

                <p className="text-text-secondary leading-relaxed">
                  신청은 고지서 받은 뒤 홈택스 "납부·고지·환급" 메뉴에서 분납 신청 버튼으로 처리하거나, 종이 신청서를 관할 세무서에 내면 됩니다. 분납 2차 세액에는 별도의 이자나 가산금이 붙지 않으므로 자금 여유가 빠듯하면 분납을 적극 활용하는 편이 좋습니다.
                </p>
                <p className="text-text-secondary leading-relaxed">
                  다만, 분납은 세액이 250만 원을 넘어야만 쓸 수 있고, 250만 원 이하는 12월 15일까지 한 번에 내야 합니다. 분납 2차분(2027년 6월 15일)을 또 못 내면 그 시점부터 가산세가 붙으니, 2차 날짜도 반드시 달력에 적어 두는 것이 좋습니다.
                </p>
              </section>

              {/* 4. 카드납부 */}
              <section className="space-y-4">
                <h2 className="text-2xl font-bold">4. 종부세를 카드로 낼 수 있나요?</h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  네, 홈택스·손택스·카드로택스에서 신용카드와 체크카드로 모두 낼 수 있습니다. 다만 납부대행수수료가 납세자 부담입니다. 국세청 안내 기준으로 신용카드는 세액의 0.4 ~ 0.8%, 체크카드는 0.15 ~ 0.5%입니다. 수수료는 세금이 아니라 결제대행사에 가는 비용이라 세액공제도 되지 않습니다.
                </p>

                <div className="mt-3 overflow-x-auto">
                  <table className="w-full text-sm">
                    <caption className="mb-2 text-left font-semibold text-text-primary">
                      세액별 카드납부 수수료 비교 (국세청 안내 최대 요율 기준)
                    </caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th className="px-3 py-2 text-left" scope="col">세액</th>
                        <th className="px-3 py-2 text-left" scope="col">신용카드 최대 0.8%</th>
                        <th className="px-3 py-2 text-left" scope="col">체크카드 최대 0.5%</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="px-3 py-2">250만 원</td>
                        <td className="px-3 py-2">20,000원</td>
                        <td className="px-3 py-2">12,500원</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="px-3 py-2">400만 원</td>
                        <td className="px-3 py-2">32,000원</td>
                        <td className="px-3 py-2">20,000원</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="px-3 py-2">1,000만 원</td>
                        <td className="px-3 py-2">80,000원</td>
                        <td className="px-3 py-2">50,000원</td>
                      </tr>
                      <tr>
                        <td className="px-3 py-2">3,000만 원</td>
                        <td className="px-3 py-2">240,000원</td>
                        <td className="px-3 py-2">150,000원</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <p className="text-text-secondary leading-relaxed">
                  위 표는 국세청 안내의 최대 요율로 계산한 값입니다. 실제 요율과 할부·포인트 혜택은 카드사마다 달라 결제 전에 카드사 안내를 확인하세요.
                </p>
                <p className="text-text-secondary leading-relaxed">
                  다만, 분납을 할 경우 1차 결제와 2차 결제 각각에 수수료가 붙습니다. 예를 들어 400만 원을 신용카드 0.8%로 분납하면 1차 250만 원 × 0.8% = 20,000원 + 2차 150만 원 × 0.8% = 12,000원, 합계 32,000원으로 한 번에 낼 때와 총액은 같지만 결제 횟수가 두 번으로 늘어납니다.
                </p>
              </section>

              {/* 5. 납부유예 */}
              <section className="space-y-4">
                <h2 className="text-2xl font-bold">5. 집을 팔 때까지 세금을 미룰 수 있나요?</h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  요건을 모두 채우면 종부세법 §20의2에 따라 납부유예를 받아 양도·상속·증여 때까지 미룰 수 있습니다. 소득이 많지 않은 고령·장기보유 1주택자의 유동성 부담을 덜어주는 제도입니다. 미룬 세액에는 §20의2⑤에 따른 이자상당가산액이 뒤에 함께 붙으므로, 완전한 면제가 아니라 지연 납부에 가깝다는 점을 기억해야 합니다.
                </p>
                <div className="rounded-lg bg-bg-raised p-4 text-sm text-text-secondary">
                  <p className="font-semibold text-text-primary">납부유예 신청 요건 (모두 충족, §20의2①)</p>
                  <ul className="mt-2 list-inside list-disc space-y-1">
                    <li>과세기준일 현재 <strong>1세대1주택자</strong>(공동명의 1주택 포함)</li>
                    <li>만 <strong>60세 이상</strong> 또는 해당 주택을 <strong>5년 이상 보유</strong></li>
                    <li>직전 과세기간 총급여 7천만 원 이하(종합소득 합산 소득금액 6천만 원 이하)</li>
                    <li>그해 주택분 종합부동산세액이 <strong>100만 원 초과</strong></li>
                    <li>납부기한 만료 3일 전까지(12월 12일까지) 신청, 세액에 상당하는 담보 제공</li>
                  </ul>
                </div>
                <p className="text-text-secondary leading-relaxed">
                  신청 후에는 세무서장이 납부기한 만료일(12월 15일)까지 허가 여부를 통지합니다. 허가가 나면 그해 세액은 내지 않고, 해당 주택을 양도·증여하거나 상속이 개시될 때까지 미룹니다. 다만 §20의2⑤에 따라 그 사유가 발생하면 유예받은 세액과 이자상당가산액을 함께 내야 하며, 양도·증여 때 1세대1주택 요건을 잃으면 그 시점에 허가가 취소됩니다. 유예 중에는 §20의2⑥에 따라 납부지연가산세는 붙지 않습니다.
                </p>
                <p className="text-text-secondary leading-relaxed">
                  다만, 담보 제공과 서류가 번거롭고 사후에 이자상당가산액이 함께 붙기 때문에, 당장 자금이 아예 없는 경우가 아니라면 §20의 분납(6개월, 가산세 없음)을 먼저 활용하는 편이 유리합니다. 1세대1주택 세액공제 자체를 더 받고 싶다면{' '}
                  <Link href="/guide/comprehensive-real-estate-tax-single-house-credit-2026/" className="text-primary-600 underline dark:text-primary-500">
                    1세대1주택 세액공제 가이드
                  </Link>
                  를 함께 보세요.
                </p>
              </section>

              {/* 6. 미납 가산세 */}
              <section className="space-y-4">
                <h2 className="text-2xl font-bold">6. 12월 15일을 넘기면 얼마나 더 내나요?</h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  하루라도 넘기면 두 종류의 가산세가 함께 붙습니다. 먼저 국세기본법 §47의4①제3호에 따라 미납 세액의 3%가 한 번 붙고, 그다음 2026년 7월 1일 시행된 시행령 §27의4②에 따라 미납 세액 × 월 1만분의 67(= 0.67%)이 매 1개월 지날 때마다 추가됩니다. 종전에는 1일당 10만분의 22(= 0.022%)로 하루 단위로 쌓였지만, 지정납부기한 체납분에 대해서는 2026년 7월부터 월 단위 산정으로 바뀌었습니다.
                </p>

                <div className="rounded-lg bg-bg-card p-4 text-sm text-text-secondary">
                  <p className="font-semibold text-text-primary">사례 C. 400만 원 미납 시 가산세</p>
                  <ul className="mt-2 list-inside list-disc space-y-1">
                    <li>12월 16일 넘기면 즉시: 400만 × 3% = <strong>120,000원</strong> (§47의4①3호)</li>
                    <li>+ 1개월 지체: 400만 × 0.67% = 26,800원 → 누적 <strong>146,800원</strong></li>
                    <li>+ 3개월 지체: 400만 × 0.67% × 3 = 80,400원 → 누적 <strong>200,400원</strong></li>
                    <li>+ 6개월 지체: 400만 × 0.67% × 6 = 160,800원 → 누적 <strong>280,800원</strong></li>
                    <li>+ 12개월 지체: 400만 × 0.67% × 12 = 321,600원 → 누적 <strong>441,600원</strong></li>
                  </ul>
                  <p className="mt-3 text-xs text-text-tertiary">
                    위 수치는 국세기본법 §47의4①제3호(3%)와 시행령 §27의4②(월 1만분의 67)만 반영한 단순 추정이며,
                    고지금액 150만 원 미만 소액 체납이나 체납 처분비 등 다른 항목은 포함하지 않았습니다.
                  </p>
                </div>

                <p className="text-text-secondary leading-relaxed">
                  §47의4⑦에 따라 월 단위 가산세는 최대 5년까지 쌓이며, 그 뒤에는 더 늘지 않지만 본세 자체는 체납 처분(압류·공매) 대상이 됩니다. 세금을 아예 못 낼 상황이라면 그보다 먼저 §20 분납이나 §20의2 납부유예, 혹은 국세징수법 §13 납부기한 연장을 검토하는 편이 훨씬 유리합니다.
                </p>
                <p className="text-text-secondary leading-relaxed">
                  다만, §47의4⑧은 고지서 1장과 세목당 체납액이 150만 원 미만이면 월 단위 추가분(제1호의2)은 붙지 않는다고 정하고 있습니다. 반면 3% 가산세(제3호)는 금액과 무관하게 그대로 붙으니, 소액이라고 안심하면 안 됩니다.
                </p>
              </section>

              {/* 7. 고지 검증 */}
              <section className="space-y-4">
                <h2 className="text-2xl font-bold">7. 고지서 금액이 맞는지 어떻게 확인하나요?</h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  공시가격, 공제, 공정시장가액비율, 세율 구간, 재산세 공제, 세액공제까지 한 단계씩 다시 계산해 비교하는 것이 가장 확실합니다. 가장 빠른 방법은{' '}
                  <Link href="/calculator/comprehensive-property-tax/" className="text-primary-600 underline dark:text-primary-500">
                    종합부동산세 계산기
                  </Link>
                  에 보유 주택 공시가와 1세대1주택 여부, 나이·보유기간을 넣어 산출세액을 뽑고, 고지서에 적힌 숫자와 1만 원 단위까지 비교하는 것입니다.
                </p>
                <div className="rounded-lg bg-bg-raised p-4 text-sm text-text-secondary">
                  <p className="font-semibold text-text-primary">숫자가 다르다면 확인할 포인트</p>
                  <ul className="mt-2 list-inside list-disc space-y-1">
                    <li>1세대1주택 공제 12억이 아니라 9억으로 적용된 경우(세대 판정 문제)</li>
                    <li>공시가격이 올해 갱신분과 다른 경우(열람 기간에 이의신청 가능)</li>
                    <li>합산배제 신청한 임대주택이 과세대상으로 들어간 경우</li>
                    <li>세부담 상한(§10, 전년 150%)이 반영되지 않은 것처럼 보이는 경우</li>
                    <li>고령자·장기보유 세액공제 비율이 다르게 적용된 경우</li>
                  </ul>
                </div>
                <p className="text-text-secondary leading-relaxed">
                  차이가 크고 고지 쪽이 과하다고 판단되면 §16③의 신고납부를 선택할 수 있습니다. 홈택스에서 신고서를 직접 작성·제출하면 그 신고 내용이 그해 세액으로 결정됩니다. 다만 신고한 세액이 실제보다 적으면 가산세가 붙으므로, 정확한 산정이 어렵다면 세무서 상담(국세상담센터 126)이나 세무사 상담을 먼저 받는 것이 안전합니다.
                </p>
                <p className="text-text-secondary leading-relaxed">
                  다만, 계산기와 고지서 숫자가 작게(1 ~ 5만 원 수준) 다른 것은 공제할 재산세액이나 세부담 상한 적용 등으로 정상입니다. 계산 흐름 전반을 다시 확인하고 싶다면{' '}
                  <Link href="/guide/comprehensive-real-estate-tax-calculation-2026/" className="text-primary-600 underline dark:text-primary-500">
                    종부세 계산 방법 가이드
                  </Link>
                  와{' '}
                  <Link href="/guide/property-tax-vs-comprehensive-real-estate-tax-2026/" className="text-primary-600 underline dark:text-primary-500">
                    재산세와 종부세 비교 가이드
                  </Link>
                  를 참조하세요.
                </p>
              </section>

              {/* FAQ */}
              <FaqSection items={[...FAQ_ITEMS]} />

              {/* 관련 계산기·가이드 */}
              <section className="card">
                <h2 className="mb-4 text-lg font-semibold">관련 계산기·가이드</h2>
                <ul className="space-y-2 text-sm">
                  <li>
                    →{' '}
                    <Link href="/calculator/comprehensive-property-tax/" className="text-primary-600 underline dark:text-primary-500">
                      종합부동산세 계산기
                    </Link>
                    , 공시가·보유 수·나이·보유기간을 넣고 고지세액을 즉시 추정
                  </li>
                  <li>
                    →{' '}
                    <Link href="/guide/comprehensive-real-estate-tax-calculation-2026/" className="text-primary-600 underline dark:text-primary-500">
                      종부세 계산 방법 가이드
                    </Link>
                    , 공제·공정시장가액비율·세율 구간까지 단계별로
                  </li>
                  <li>
                    →{' '}
                    <Link href="/guide/comprehensive-real-estate-tax-who-pays-2026/" className="text-primary-600 underline dark:text-primary-500">
                      종부세 납세의무자 가이드
                    </Link>
                    , 과세기준일 6월 1일 기준 누가 내는지 세대·공동명의까지
                  </li>
                  <li>
                    →{' '}
                    <Link href="/guide/comprehensive-real-estate-tax-single-house-credit-2026/" className="text-primary-600 underline dark:text-primary-500">
                      1세대1주택 세액공제 가이드
                    </Link>
                    , 고령자·장기보유 공제율 조합과 80% 한도
                  </li>
                  <li>
                    →{' '}
                    <Link href="/guide/property-tax-vs-comprehensive-real-estate-tax-2026/" className="text-primary-600 underline dark:text-primary-500">
                      재산세와 종부세 비교
                    </Link>
                    , 7월·9월 재산세와 12월 종부세의 과세 흐름
                  </li>
                  <li>
                    →{' '}
                    <Link href="/calculator/property-tax/" className="text-primary-600 underline dark:text-primary-500">
                      재산세 계산기
                    </Link>
                    , 7월·9월에 낸 재산세부터 다시 셈해 보기
                  </li>
                </ul>
              </section>

              <ShareButtons
                title="종부세 납부기간 2026, 12월 1~15일 고지서·분납·카드납부"
                url={URL}
                description="종부세 납부기간은 12월 1~15일. 고지서 확인, 분납, 카드납부 수수료, 납부유예, 미납 가산세까지 §16·§20·§20의2 기준 정리."
              />

              {/* 출처 및 면책 */}
              <section
                aria-label="출처 및 면책"
                className="rounded-lg border border-border-base p-4 text-caption text-text-tertiary"
              >
                <p className="mb-2">
                  <strong>참고 법령 및 공식 출처</strong>:{' '}
                  <a
                    href="https://www.law.go.kr/법령/종합부동산세법"
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="text-primary-600 underline dark:text-primary-500"
                  >
                    국가법령정보센터 종합부동산세법
                  </a>
                  ,{' '}
                  <a
                    href="https://www.nts.go.kr/"
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="text-primary-600 underline dark:text-primary-500"
                  >
                    국세청 (nts.go.kr)
                  </a>
                  ,{' '}
                  <a
                    href="https://www.hometax.go.kr/"
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="text-primary-600 underline dark:text-primary-500"
                  >
                    홈택스 (hometax.go.kr)
                  </a>
                  .
                </p>
                <p className="mb-2">
                  <strong>면책조항</strong>: 본 가이드는 교육 목적의 정보 제공이며 개별 세무·법률 자문이 아닙니다. 종부세 세액과 납부 선택지는 공시가격, 세대 구성, 보유기간, 재산세 세부담 상한 등 구체적 사실관계에 따라 달라지므로 국세상담센터(국번 없이 126), 홈택스 상담, 또는 세무사·공인회계사 상담을 함께 받는 것을 권합니다. 본 콘텐츠는 2026-10-27 기준이며, 법령 개정 시 날짜를 함께 갱신합니다. 인용 조문은{' '}
                  <strong>종합부동산세법 §3(과세기준일)·§9(공제·세액공제)·§10(세부담 상한)·§16①③(부과·징수와 신고납부 선택)·§20(분납)·§20의2(납부유예)</strong>,{' '}
                  <strong>농어촌특별세법 §5·§9①(분납)</strong>,{' '}
                  <strong>국세기본법 §47의4(납부지연가산세)·시행령 §27의4(이자율)</strong>입니다.
                </p>
                <p>업데이트: {DATE_MODIFIED}</p>
              </section>
            </article>
          </main>
        </div>
        <Footer />
      </div>
    </>
  );
}
