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

const URL = 'https://calculatorhost.com/guide/mid-year-resignation-year-end-tax-2026/';
const DATE_PUBLISHED = '2026-07-14';
const DATE_MODIFIED = '2026-07-14';

export const metadata: Metadata = {
  title: '중도퇴사 연말정산 2026, 재취업·5월 종소세 환급 방법',
  description:
    '중도퇴사자는 회사가 기본공제만 반영한 채 연말정산을 마쳐 세금을 더 낸 상태가 됩니다. 재취업 시 합산 정산, 미재취업 시 5월 종합소득세 신고로 누락 공제를 반영해 환급받는 실무를 소득세법 137조 기준으로 정리했습니다.',
  keywords: [
    '중도퇴사 연말정산',
    '중도퇴사자 환급',
    '재취업 연말정산',
    '5월 종합소득세 신고',
    '전 직장 원천징수영수증',
    '연말정산 누락 공제',
    '중도퇴사 5월 종소세',
    '소득세법 137조',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '중도퇴사 연말정산 2026, 재취업·5월 종소세 환급 방법' }],
    title: '중도퇴사 연말정산 2026, 재취업·5월 종소세 환급 실무',
    description: '회사가 퇴사 시 기본공제만 반영해 세금을 더 낸 상태. 재취업 시 합산, 미재취업 시 5월 종소세 신고로 환급.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '중도퇴사 연말정산 2026, 재취업·5월 종소세 환급 실무',
    description: '중도퇴사자는 기본공제만 반영된 상태로 세금을 더 낸 경우가 많습니다. 소득세법 137조·70조 기준 환급 절차.',
  },
};

const FAQ_ITEMS = [
  {
    question: '중도퇴사하면 연말정산은 언제 하나요?',
    answer:
      '퇴사한 달의 급여를 지급할 때 회사가 실시합니다. 소득세법 §137(근로소득세액의 연말정산)에 따라 원천징수의무자인 회사는 근로자가 퇴직하면 마지막 급여를 줄 때 그 해 1월 1일부터 퇴직일까지의 근로소득에 대해 정산을 마무리합니다. 다만 이때는 대개 본인 기본공제와 표준세액공제 정도만 반영됩니다.',
  },
  {
    question: '왜 세금을 더 낸 상태가 되나요?',
    answer:
      '특별공제 서류를 아직 못 냈기 때문입니다. 퇴사 시점에는 의료비, 교육비, 기부금, 월세, 신용카드 소득공제 같은 자료가 준비되지 않은 경우가 많아, 회사는 안전하게 기본공제와 표준세액공제만 적용해 세액을 확정합니다. 그래서 원래 낼 세금보다 더 많이 낸 상태가 되고, 나중에 신고하면 그 차액을 환급받을 수 있습니다.',
  },
  {
    question: '같은 해에 재취업하면 어떻게 하나요?',
    answer:
      '새 회사에 전 직장 원천징수영수증을 제출하세요. 소득세법 §137에 따라 다음해 2월 연말정산 때 새 회사가 종전근무지 근로소득을 합산해 다시 정산합니다. 합산하지 않으면 두 회사가 각자 본인 기본공제를 중복 적용하게 되어, 국세청 대사 이후 추가 세액이 추징될 수 있으니 반드시 합산 신청해야 합니다.',
  },
  {
    question: '재취업을 못 하면 어떻게 환급받나요?',
    answer:
      '다음해 5월 종합소득세 확정신고로 받습니다. 소득세법 §70에 따라 홈택스에서 근로소득 신고서를 작성해 누락된 의료비, 교육비, 기부금, 신용카드 공제를 반영하면 이미 원천징수된 세액과 차이만큼 환급됩니다. 홈택스 모의계산으로 예상 환급액을 미리 확인할 수 있습니다.',
  },
  {
    question: '원천징수영수증은 어디서 받나요?',
    answer:
      '홈택스 지급명세서 등 제출내역에서 조회 가능합니다. 회사가 다음해 3월 10일까지 국세청에 지급명세서를 제출하면 근로자는 홈택스 로그인 후 열람할 수 있습니다. 그 이전에 필요하면 회사 인사팀에 요청해 종이 또는 이메일로 받을 수 있습니다.',
  },
  {
    question: '재취업 시 합산을 안 하면 왜 추징되나요?',
    answer:
      '기본공제가 중복 적용되기 때문입니다. 두 회사가 각각 본인 기본공제 150만원을 반영하면 실제 받을 수 있는 공제보다 더 많이 공제된 상태가 됩니다. 국세청이 지급명세서 대사 과정에서 이를 발견하면 다음해 5월 이후 추가 세액을 추징하므로, 사소한 소득이라도 합산을 빠뜨리지 마세요.',
  },
  {
    question: '5월 종소세 신고로 얼마나 환급받을 수 있나요?',
    answer:
      '누락 공제 규모에 비례합니다. 예를 들어 종교단체 외 일반기부금 200만원이면 소득세법 §59의4에 따라 1천만원 이하 15% 세액공제로 30만원, 여기에 의료비, 교육비까지 반영하면 수십만원 이상 환급될 수 있습니다. 정확한 금액은 홈택스 모의계산에서 미리 확인하세요.',
  },
  {
    question: '5월 신고를 놓치면 다시는 못 받나요?',
    answer:
      '경정청구로 5년 이내에 청구할 수 있습니다. 법정신고기한이 지나도 국세기본법상 5년 이내에는 경정청구가 가능하므로, 늦게라도 원천징수영수증과 공제 증빙을 갖춰 홈택스에서 신청하면 환급받을 수 있습니다. 다만 관련 증빙은 반드시 보관해두어야 합니다.',
  },
];

export default function MidYearResignationYearEndTax2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '중도퇴사 연말정산 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '중도퇴사 연말정산 2026, 재취업·5월 종소세 환급 실무',
    description:
      '연도 중간에 퇴사하면 회사는 기본공제만 반영한 채 연말정산을 마무리해 세금을 더 낸 상태가 됩니다. 재취업 시 새 회사 합산 정산, 미재취업 시 5월 종합소득세 신고로 누락 공제를 반영해 환급받는 절차를 정리했습니다.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['중도퇴사', '연말정산', '재취업', '5월 종합소득세 신고', '원천징수영수증', '환급'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '중도퇴사 연말정산 2026',
    description:
      '중도퇴사자의 연말정산 처리, 재취업 시 합산 정산, 미재취업 시 5월 종합소득세 신고를 통한 환급 실무 가이드.',
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
                    { name: '중도퇴사 연말정산 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">직장인 · 8분 읽기 · 2026-07-14</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  중도퇴사 연말정산 2026
                  <br />
                  <span className="text-2xl text-text-secondary">재취업·5월 종소세 환급 실무</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  연도 중간에 회사를 그만두면 회사는 마지막 급여를 지급할 때 그 해 근로소득을 한 번 정산합니다. 그런데 이 정산에는 대부분 특별공제가 빠져 있어 세금을 더 낸 상태로 마무리되기 쉽습니다. 이 가이드는 소득세법 §137, §70을 기준으로 재취업 시 합산 정산, 미재취업 시 5월 종합소득세 신고로 환급받는 절차를 정리합니다.
                </p>
              </header>

              <AdSlot slot="guide-mid-year-resignation-year-end-tax-2026-top" format="horizontal" />

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">중도퇴사자는 왜 세금을 더 냈을까?</h2>
                <p>
                  결론부터 말하면, 회사가 서둘러 정산하느라 특별공제를 반영하지 못했기 때문입니다. 퇴사 시점에는 아직 그 해가 끝나지 않았기 때문에 의료비 영수증, 기부금 확인서, 신용카드 사용액 자료가 준비되지 않은 경우가 많습니다. 이런 상황에서 회사는 안전하게 본인 기본공제 150만원과 표준세액공제 정도만 반영해 세액을 확정합니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">퇴사 정산의 구조적 한계</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    · 퇴사 시점: 특별공제 자료 미확보
                    <br />
                    · 회사 처리: 기본공제·표준세액공제만 반영
                    <br />
                    · 결과: 원래 낼 세금보다 더 많이 납부한 상태
                    <br />
                    · 해결: 재취업 시 합산 정산, 미재취업 시 5월 종소세 신고
                  </p>
                </div>
                <p className="mt-4">
                  즉, 회사의 처리가 잘못된 것은 아닙니다. 소득세법 §137에 따른 원천징수의무자의 정상적인 방식이며, 나머지 특별공제는 근로자가 재취업 시점 또는 다음해 5월 신고 시 스스로 챙겨야 하는 몫입니다.
                </p>
                <p className="mt-4">
                  다만 회사에 부양가족 정보와 국민연금 등 자동 반영 항목을 미리 제출했다면 일부 공제는 반영될 수 있습니다. 퇴사 전 인사팀과 짧게 확인하는 것만으로도 환급 규모를 줄일 수 있습니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">회사는 언제, 어떻게 정산하나요?</h2>
                <p>
                  회사는 퇴사한 달의 급여를 지급할 때 연말정산을 실시합니다. 소득세법 §137(근로소득세액의 연말정산)은 원천징수의무자가 근로자 퇴직 시 그 해 1월 1일부터 퇴직일까지의 근로소득을 정산하고, 원천징수한 세액을 차감·환급하도록 규정합니다. 12월에 하는 정기 연말정산과 원리는 같지만 시기가 앞당겨질 뿐입니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 퇴사 시점 정산에서 반영되는 항목 vs 누락되는 항목 (소득세법 §137)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">반영되는 항목 (O)</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">누락되기 쉬운 항목 (△)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">본인 기본공제 (150만원)</td>
                        <td className="p-3">의료비 세액공제 (총급여 3% 초과분)</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">표준세액공제 (13만원)</td>
                        <td className="p-3">교육비 세액공제</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">국민연금 등 4대보험 소득공제</td>
                        <td className="p-3">신용카드 소득공제</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">사전 제출된 부양가족 인적공제</td>
                        <td className="p-3">월세 세액공제</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3"></td>
                        <td className="p-3">기부금 세액공제 (소득세법 §59의4)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  이 표에서 보듯이 실무상 특별공제 대부분이 정산에서 빠져 있는 상태입니다. 회사가 발급하는 근로소득 원천징수영수증에는 여기까지의 정산 결과가 그대로 기록됩니다.
                </p>
                <p className="mt-4">
                  다만 회사마다 실무 처리가 조금씩 다릅니다. 어떤 회사는 퇴사 직전 부양가족 정보와 국민연금 납부액을 확인해 최대한 반영하고, 어떤 회사는 최소 항목만 반영합니다. 원천징수영수증을 받으면 어떤 공제가 반영되었는지 먼저 확인하세요.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">재취업한 경우, 두 회사 급여를 합산하세요</h2>
                <p>
                  같은 해 안에 다른 회사에 재취업했다면 반드시 합산 정산을 신청해야 합니다. 방법은 간단합니다. 새 회사에 입사할 때 또는 다음해 1~2월 연말정산 기간에, 전 직장에서 발급받은 근로소득 원천징수영수증을 새 회사 인사팀에 제출하면 됩니다. 그러면 새 회사가 소득세법 §137에 따라 두 직장의 근로소득을 합산해 다시 정산합니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 2. 재취업 vs 미재취업 시나리오 비교</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">상황</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">정산 시기</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">정산 주체</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">필요 서류</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">같은 해 재취업</td>
                        <td className="p-3">다음해 2월 연말정산</td>
                        <td className="p-3">새 직장</td>
                        <td className="p-3">전 직장 원천징수영수증</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">재취업 없음</td>
                        <td className="p-3">다음해 5월 종소세 신고</td>
                        <td className="p-3">본인 (홈택스)</td>
                        <td className="p-3">원천징수영수증, 공제 증빙</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  여기서 반드시 짚어야 할 점은 미합산의 위험입니다. 합산하지 않으면 전 직장과 새 직장이 각자 본인 기본공제 150만원을 중복으로 적용해 세액을 계산합니다. 실제로는 한 번만 받을 수 있는 공제를 두 번 받은 상태이므로, 국세청이 지급명세서 대사 과정에서 발견하면 다음해 5월 이후 추가 세액과 가산세를 함께 추징합니다.
                </p>
                <p className="mt-4">
                  다만 전 직장 근무기간이 짧고 소득이 미미해도 소득세법 §137상 합산 의무는 동일합니다. 소액이라고 스스로 판단해 누락하지 말고, 원천징수영수증을 발급받아 반드시 새 회사에 제출하세요.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">재취업 못 한 경우, 5월 종소세 신고로 환급받기</h2>
                <p>
                  연말까지 재취업하지 못했다면 다음해 5월 종합소득세 확정신고로 정산합니다. 소득세법 §70(종합소득과세표준 확정신고)은 종합소득이 있는 거주자가 다음해 5월 1일부터 31일까지 확정신고를 하도록 규정합니다. 근로소득만 있고 이미 회사가 원천징수한 상태여도, 누락된 공제를 반영하기 위해 스스로 신고할 수 있습니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">홈택스 5월 신고 절차</p>
                  <p className="text-sm text-text-secondary">
                    1. 홈택스(hometax.go.kr) 로그인
                    <br />
                    2. 종합소득세 신고 &gt; 근로소득 신고서 작성
                    <br />
                    3. 전 직장 근로소득 자동 조회 (지급명세서 기반)
                    <br />
                    4. 의료비, 교육비, 기부금, 신용카드 등 누락 공제 입력
                    <br />
                    5. 산출세액과 이미 원천징수된 세액 비교
                    <br />
                    6. 차액만큼 환급 계좌로 입금 (통상 30일 이내)
                  </p>
                </div>
                <p className="mt-4">
                  홈택스 모의계산 기능을 이용하면 실제 신고 전에 예상 환급액을 확인할 수 있습니다. 서류를 갖춘 뒤 신고하면 이미 원천징수된 세액과의 차액만큼 지정 계좌로 환급됩니다.
                </p>
                <p className="mt-4">
                  다만 5월 신고를 놓친 경우에도 절망할 필요는 없습니다. 국세기본법상 법정신고기한 이후 5년 이내에는 경정청구가 가능하므로, 늦게 서류를 갖췄더라도 홈택스에서 신청해 환급받을 수 있습니다. 예외적으로 원천징수영수증이 손상되거나 회사가 폐업한 경우에는 국세청 방문 발급을 활용하세요.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">환급 사례로 보는 실제 계산</h2>
                <p>
                  다음 3가지 사례를 통해 중도퇴사자의 환급이 어떻게 발생하는지 살펴보겠습니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 1. 6월 말 퇴사, 재취업 없음 (6개월 총급여 2,400만원)</p>
                  <p className="text-sm text-text-secondary">
                    · 총급여: 2,400만원 (1월부터 6월까지)
                    <br />
                    · 근로소득공제 (소득세법 §47): 750만 + (2,400만 - 1,500만) × 15% = 750만 + 135만 = <strong>885만원</strong>
                    <br />
                    · 근로소득금액: 2,400만 - 885만 = <strong>1,515만원</strong>
                    <br />
                    · 퇴사 시 정산: 본인 기본공제 150만원 + 표준세액공제 정도만 반영
                    <br />
                    · 5월 종소세 신고에서 추가 반영: 일반기부금 100만원 (15% 세액공제 = 15만원 환급, 소득세법 §59의4), 의료비 등
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 누락 공제 반영으로 15만원 이상 환급 가능. 홈택스 모의계산에서 정확한 금액 확인.</span>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 2. 3월 퇴사 후 5월 재입사 (합산 정산 필수)</p>
                  <p className="text-sm text-text-secondary">
                    · 전 직장 근로소득: 1~3월분
                    <br />
                    · 새 직장 근로소득: 5~12월분
                    <br />
                    · 처리: 새 직장에 전 직장 원천징수영수증 제출 (소득세법 §137)
                    <br />
                    · 다음해 2월 연말정산에서 두 회사 급여 합산 후 특별공제 일괄 반영
                    <br />
                    <span className="text-xs text-text-tertiary">주의: 합산하지 않으면 각 회사가 본인 기본공제 150만원을 중복 적용해 추후 추징 리스크.</span>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 3. 일반기부금 200만원, 세액공제로 환급</p>
                  <p className="text-sm text-text-secondary">
                    · 종교단체 외 지정기부금: 200만원 (연간)
                    <br />
                    · 세액공제 (소득세법 §59의4, 1천만원 이하 15%): 200만 × 15% = <strong>30만원</strong>
                    <br />
                    · 처리: 퇴사 시 정산에는 반영되지 않음. 5월 종소세 신고 또는 재취업 시 새 회사 연말정산에서 반영
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 기부금 세액공제 30만원이 환급 형태로 돌아옴. 기부금 영수증 필수 보관.</span>
                  </p>
                </div>
                <p className="mt-4">
                  다만 사례의 숫자는 예시일 뿐이며, 실제 환급액은 부양가족 수, 의료비·교육비 지출액, 신용카드 사용액에 따라 크게 달라집니다. 반드시 홈택스 모의계산을 활용해 개인별 예상 환급액을 확인하세요.
                </p>
              </section>

              <AdSlot slot="guide-mid-year-resignation-year-end-tax-2026-mid" format="rectangle" />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h2 className="text-2xl font-bold">원천징수영수증은 어디서 확인?</h2>
                <p>
                  중도퇴사자의 모든 절차는 원천징수영수증에서 시작합니다. 여기에는 총급여, 기납부세액, 4대보험 공제액, 회사가 반영한 공제 내역이 모두 담겨 있으므로, 재취업 회사 제출용 또는 5월 종소세 신고용으로 필수 서류입니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">방법 1. 홈택스 조회</p>
                  <p className="text-sm text-text-secondary">
                    홈택스(hometax.go.kr) 로그인 &gt; MY홈택스 &gt; 연말정산·지급명세서 &gt; 지급명세서 등 제출내역. 회사가 다음해 3월 10일까지 국세청에 제출하면 이 메뉴에서 열람 가능합니다.
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">방법 2. 회사에 직접 요청</p>
                  <p className="text-sm text-text-secondary">
                    퇴사 시점 또는 이후에 인사팀에 요청하면 종이 또는 이메일로 발급받을 수 있습니다. 재취업 회사에 곧바로 제출해야 하는 경우 이 방법이 가장 빠릅니다.
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">방법 3. 국세청 방문 발급</p>
                  <p className="text-sm text-text-secondary">
                    회사가 폐업했거나 연락이 끊긴 경우, 관할 세무서를 방문해 지급명세서 사본을 발급받을 수 있습니다. 신분증과 함께 방문하세요.
                  </p>
                </div>
                <p className="mt-4">
                  다만 원천징수영수증은 개인정보이므로 새 직장에 제출한 뒤에도 사본을 보관해두세요. 5월 종소세 신고 또는 이후 경정청구 시 다시 참조해야 하는 경우가 많습니다.
                </p>
              </section>

              <h2 className="text-2xl font-bold mb-6">자주 묻는 질문</h2>
              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h3 className="text-lg font-semibold text-text-primary">관련 계산기 및 가이드</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link
                    href="/guide/year-end-tax-settlement/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">연말정산 기본 가이드</div>
                    <p className="mt-1 text-sm text-text-secondary">근로소득자 연말정산의 전체 흐름과 공제 항목 정리.</p>
                  </Link>
                  <Link
                    href="/guide/comprehensive-income-tax-refund-timing-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">종합소득세 환급 시기 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">5월 신고 후 환급금이 언제 입금되는지 실제 일정.</p>
                  </Link>
                  <Link
                    href="/guide/may-31-deadline-day-income-tax-filing-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">5월 31일 종소세 마감</div>
                    <p className="mt-1 text-sm text-text-secondary">마감 당일 신고 가능 여부와 서류 준비 체크리스트.</p>
                  </Link>
                  <Link
                    href="/guide/medical-expense-tax-credit-3-percent-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">의료비 세액공제 3% 기준</div>
                    <p className="mt-1 text-sm text-text-secondary">총급여 3% 초과분만 공제되는 의료비 계산 방식.</p>
                  </Link>
                  <Link
                    href="/guide/donation-tax-credit-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">기부금 세액공제 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">일반기부금·특별기부금 세액공제율과 한도.</p>
                  </Link>
                  <Link
                    href="/calculator/salary/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">연봉 실수령액 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">2026년 세율 반영 세후 월급을 즉시 계산.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 교육 목적으로 작성되었으며, 개인 맞춤형 세무 조언이 아닙니다. 실제 정산 결과, 환급액, 추징 위험은 개인의 소득 구조와 공제 자료에 따라 달라지므로 반드시 홈택스 또는 관할 세무서에서 확인하세요. 특히 재취업 시 합산 누락, 원천징수영수증 분실, 폐업 회사 관련 상황에서는 세무 전문가 상담이 안전합니다. 본 콘텐츠는 2026-07-14를 기준으로 작성되었으며, 세법 개정 시 즉시 업데이트됩니다. 인용한 법조항은 <strong>소득세법 §137(근로소득세액의 연말정산), §70(종합소득과세표준 확정신고), §47(근로소득공제), §59의4(기부금 세액공제)</strong>입니다. AI 보조 작성 후 운영자 검수 완료.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터</a>,{' '}
                  <a href="https://www.hometax.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">국세청 홈택스</a>,{' '}
                  <a href="https://www.nts.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">국세청</a>.
                </p>
              </section>

              <ShareButtons
                title="중도퇴사 연말정산 2026 가이드"
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
