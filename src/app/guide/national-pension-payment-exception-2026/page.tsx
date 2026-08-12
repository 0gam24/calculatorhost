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

const URL = 'https://calculatorhost.com/guide/national-pension-payment-exception-2026/';
const DATE_PUBLISHED = '2026-08-03';
const DATE_MODIFIED = '2026-08-03';

export const metadata: Metadata = {
  title: '국민연금 납부예외 2026, 소득 없을 때 신청·연금 영향',
  description:
    '실직·폐업으로 소득이 없을 때 국민연금 보험료 납부를 잠시 멈추는 납부예외 제도. 신청 기한(다음 달 15일), 가입기간 산입, 추후납부(국민연금법 92조)로 회복하는 방법까지 정리.',
  keywords: [
    '국민연금 납부예외',
    '국민연금 납부예외 신청',
    '소득없을때 국민연금',
    '실직 국민연금',
    '폐업 국민연금 납부예외',
    '국민연금법 91조',
    '국민연금 추후납부',
    '지역가입자 납부예외',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '국민연금 납부예외 2026, 소득 없을 때 신청 방법과 연금 영향' }],
    title: '국민연금 납부예외 2026, 소득 없을 때 신청·연금 영향',
    description: '실직·폐업으로 보험료가 부담될 때, 국민연금법 91조에 따른 납부예외 신청 방법과 가입기간 영향, 추후납부로 회복하는 절차를 정리했습니다.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '국민연금 납부예외 2026, 소득 없을 때 신청·연금 영향',
    description: '실직·폐업 시 국민연금 납부예외 신청(국민연금법 91조), 가입기간 산입 여부, 추후납부 회복 방법.',
  },
};

const FAQ_ITEMS = [
  {
    question: '납부예외 신청을 안 하고 그냥 안 내면 어떻게 되나요?',
    answer:
      '체납으로 처리됩니다. 지역가입자가 소득이 없어도 신고 없이 미납하면 연체금이 붙고, 국민연금공단이 재산 조회 후 강제 징수 절차에 들어갈 수 있습니다. 소득이 없다면 반드시 납부예외를 정식으로 신청해 체납 상태를 피해야 합니다(국민연금법 91조).',
  },
  {
    question: '소득이 조금이라도 있는데 납부예외 신청이 가능한가요?',
    answer:
      '원칙적으로 불가합니다. 납부예외는 실직·사업중단·휴직·재해·질병 등으로 소득이 없거나 보험료 납부가 곤란한 사유가 있어야 인정됩니다. 소득이 있는데 부담이 클 뿐이라면 납부예외 대상이 아니며, 이 경우 연금보험료 지원 사업 등 다른 제도를 검토하는 편이 맞습니다.',
  },
  {
    question: '납부예외 기간은 최대 얼마까지 인정되나요?',
    answer:
      '사유가 지속되는 동안 계속 인정됩니다. 다만 통상 1년 단위로 재확인 절차가 있고, 사유가 해소되면 즉시 종료됩니다. 실직·폐업 상태가 이어지면 연장 신청으로 계속 유지할 수 있으나, 구체적 기간과 절차는 국민연금공단(국번 없이 1355)에서 개인 상황에 맞춰 확인하는 것이 안전합니다.',
  },
  {
    question: '추후납부(추납)는 얼마까지 가능한가요?',
    answer:
      '납부예외·적용제외 기간의 보험료를 나중에 몰아서 낼 수 있습니다(국민연금법 92조). 추납으로 회복한 기간은 가입기간에 산입되어 노령연금 수령액이 늘어납니다. 다만 인정되는 최대 기간과 이자 가산, 분납 조건은 신청 시점 기준으로 달라지므로 신청 전 국민연금공단에서 개인별 한도를 반드시 확인하세요.',
  },
  {
    question: '실업크레딧과 납부예외는 어떻게 다른가요?',
    answer:
      '실업크레딧은 실업급여 수급자가 국민연금 보험료의 75%를 국가에서 지원받고 25%만 본인 부담해 최대 12개월까지 가입기간을 유지하는 제도입니다. 반면 납부예외는 아예 보험료를 내지 않는 대신 그 기간이 가입기간에 산입되지 않습니다. 실업급여 수급 중이라면 실업크레딧이 노후 연금 관점에서 유리한 경우가 많습니다.',
  },
  {
    question: '재취업해서 소득이 다시 생기면 자동으로 재개되나요?',
    answer:
      '사업장가입자로 취업하면 회사가 자격 취득 신고를 하면서 자동으로 전환됩니다. 그러나 지역가입자로 남는 경우(프리랜서·자영업 재개 등)에는 본인이 납부재개 신고를 해야 합니다. 소득 발생 후에도 미신고 상태가 이어지면 사후 소급 부과와 연체금이 발생할 수 있으니 즉시 신고하세요.',
  },
  {
    question: '납부예외 중에는 건강보험도 안 내나요?',
    answer:
      '아닙니다. 국민연금 납부예외와 건강보험은 완전히 별개 제도입니다. 국민연금 납부예외로 인정받아도 건강보험료는 별도로 부과되며, 지역가입자로 자동 전환된 경우 소득·재산에 따라 지역건강보험료가 계산됩니다. 소득이 없다면 피부양자 등록이나 지역건보 조정 신청을 별도로 검토해야 합니다.',
  },
  {
    question: '납부예외 기간이 길어지면 연금이 얼마나 줄어드나요?',
    answer:
      '가입기간이 짧아진 만큼 노령연금 월 수령액이 낮아집니다. 국민연금은 가입기간과 가입 중 평균소득에 비례해 산정되므로, 예외 기간이 길수록 감액 폭이 커집니다. 정확한 예상액은 국민연금공단 홈페이지나 "내곁에국민연금" 앱의 예상연금 조회 기능에서 개인별로 확인할 수 있습니다.',
  },
];

export default function NationalPensionPaymentException2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '국민연금 납부예외 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '국민연금 납부예외 2026, 소득 없을 때 신청·연금 영향',
    description:
      '실직·폐업·휴직으로 소득이 없을 때 국민연금 보험료 납부를 잠시 멈추는 납부예외 제도. 신청 기한, 가입기간 산입 여부, 추후납부로 회복하는 절차를 국민연금법 91조·92조 기준으로 정리했습니다.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['국민연금 납부예외', '국민연금법 91조', '국민연금 추후납부', '실직 국민연금', '지역가입자'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '국민연금 납부예외 2026',
    description:
      '실직·폐업 시 국민연금 보험료를 잠시 멈추는 납부예외 신청 방법과 연금 수령액에 미치는 영향.',
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
                    { name: '국민연금 납부예외 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">지역가입자 · 실직·폐업 · 9분 읽기 · 2026-08-03</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  국민연금 납부예외 2026
                  <br />
                  <span className="text-2xl text-text-secondary">소득 없을 때 신청 방법과 연금 영향</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  실직이나 폐업으로 당장 소득이 끊겼는데 매달 국민연금 고지서가 날아옵니다. 그냥 안 내도 될까, 아니면 반드시 신고를 해야 할까. 안 내면 나중에 연금이 얼마나 줄어들까. 이 가이드는 국민연금법 91조의 납부예외 제도를 기준으로, 신청 자격과 기한, 가입기간에 미치는 영향, 그리고 92조 추후납부로 회복하는 방법까지 한 번에 정리합니다.
                </p>
              </header>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">Q. 국민연금 납부예외란 무엇인가요?</h2>
                <p>
                  납부예외는 소득이 없어 국민연금 보험료를 낼 형편이 안 되는 사람이, 국민연금공단에 신고해 일정 기간 보험료 납부를 면제받는 제도입니다. 국민연금법 91조(연금보험료 납부의 예외)에 근거하며, 사업장가입자·지역가입자 모두 신청할 수 있습니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">한 줄 정리</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    · 가입자 자격은 그대로 유지되고 보험료만 일시 중단됩니다.
                    <br />
                    · 대신 예외 기간은 노령연금 가입기간에 산입되지 않아, 장래 연금액이 줄어들 수 있습니다.
                    <br />
                    · 소득이 다시 생기면 재개 신고 의무가 있고, 추후납부(국민연금법 92조)로 예외 기간을 회복할 수 있습니다.
                  </p>
                </div>
                <p>
                  다만, 납부예외는 "안 내도 된다"가 아니라 "정식 신고를 거쳐 잠시 멈춘다"라는 점이 중요합니다. 신고 없이 미납하면 체납 처리되어 연체금이 붙고, 재산 조회를 통한 강제 징수 대상이 될 수 있습니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">Q. 누가 납부예외를 신청할 수 있나요?</h2>
                <p>
                  결론부터 말하면, 실직·사업중단·휴직·재해·질병 등으로 소득 활동이 중단되거나 보험료 납부가 곤란한 지역가입자·사업장가입자가 대상입니다. 국민연금법 시행령에서 정한 대표적인 사유는 다음과 같습니다.
                </p>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li>
                    <strong>실직·이직 준비:</strong> 회사를 그만두고 다음 일자리를 찾는 중이라 소득이 없는 경우.
                  </li>
                  <li>
                    <strong>사업중단·폐업:</strong> 자영업·프리랜서가 사업을 접었거나 매출이 사실상 소멸된 경우.
                  </li>
                  <li>
                    <strong>휴직·병가:</strong> 육아·학업·군 복무·질병·부상 등으로 일시적으로 소득이 끊긴 경우.
                  </li>
                  <li>
                    <strong>재해·재난 피해:</strong> 자연재해나 사고로 소득 활동이 어려워진 경우.
                  </li>
                  <li>
                    <strong>기타 공단 인정 사유:</strong> 수감, 실종 등 소득이 발생할 수 없는 명백한 사유.
                  </li>
                </ul>
                <p>
                  예외: 소득이 조금이라도 있고 단지 보험료 부담이 클 뿐이라면 납부예외 대상이 아닙니다. 이 경우 저소득 지역가입자 연금보험료 지원 사업(두루누리 유사 지원) 등을 별도로 알아보는 편이 맞습니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">Q. 언제, 어떻게 신청하나요?</h2>
                <p>
                  결론: 사유가 발생한 달의 다음 달 15일까지 국민연금공단에 신고합니다. 예를 들어 8월 중에 퇴사했다면 9월 15일까지 납부예외를 신청해야 그 다음 달 보험료가 부과되지 않습니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3">
                  <p className="font-semibold text-text-primary">신청 채널 (본인 편의대로 선택)</p>
                  <p className="text-sm text-text-secondary">
                    · <strong>인터넷:</strong> 국민연금공단 홈페이지(nps.or.kr) 개인서비스, "내곁에국민연금" 모바일 앱.
                    <br />
                    · <strong>방문:</strong> 가까운 국민연금공단 지사 어디서든 가능.
                    <br />
                    · <strong>우편·팩스:</strong> 신청서에 사유 증빙(이직확인서·폐업사실증명원 등)을 첨부해 관할 지사로 송부.
                    <br />
                    · <strong>전화:</strong> 국번 없이 1355로 문의 후 안내에 따라 진행.
                  </p>
                </div>
                <p>
                  다만, 사유별로 요구되는 증빙이 조금씩 다릅니다. 실직은 고용보험 이직확인서 또는 퇴직증명서, 폐업은 폐업사실증명원 또는 사업자등록 말소 확인, 질병은 진단서 등이 대표적입니다. 증빙이 없어도 우선 접수 후 사후 보완이 가능한 경우가 많으니, 마감이 임박했다면 일단 신고부터 하세요.
                </p>
                <p>
                  주의: 다음 달 15일 기한을 놓치면, 그 사이 기간에 대해서는 사후 소급 신청이 인정되지 않을 수 있습니다. 이때는 이미 부과된 보험료를 내거나 체납 상태가 발생할 수 있으니 기한 관리가 중요합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">Q. 납부예외 vs 계속납부 vs 그냥 미납, 뭐가 다른가요?</h2>
                <p>
                  세 가지 선택지의 장단점을 표로 비교합니다. 자신의 상황에 맞춰 판단해보세요.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 소득 없을 때 국민연금 처리 방식 비교 (국민연금법 91조·92조)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">구분</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">납부예외 신청</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">계속 납부</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">신고 없이 미납</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">가입자 자격</td>
                        <td className="p-3">유지</td>
                        <td className="p-3">유지</td>
                        <td className="p-3">유지되나 체납자 표기</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">보험료 부담</td>
                        <td className="p-3">없음</td>
                        <td className="p-3">매달 부과</td>
                        <td className="p-3">부과 + 연체금 가산</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">가입기간 산입</td>
                        <td className="p-3">불산입</td>
                        <td className="p-3">산입</td>
                        <td className="p-3">불산입(체납 미해소 시)</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">추후 회복 가능성</td>
                        <td className="p-3">추납(92조)으로 회복</td>
                        <td className="p-3">해당 없음</td>
                        <td className="p-3">체납액 완납 후 인정</td>
                      </tr>
                      <tr>
                        <td className="p-3">강제 징수 위험</td>
                        <td className="p-3">없음</td>
                        <td className="p-3">없음</td>
                        <td className="p-3">있음(재산 조회·압류 가능)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p>
                  다만, 계속 납부하면 그만큼 노령연금 수령액이 유지되므로, 소득이 없어도 여유가 있다면 계속 납부하는 편이 장기적으로 유리합니다. 반면 소득이 없는데도 억지로 내다가 다른 생활비까지 무너지면 오히려 손해이니, 자신의 재무 상황을 냉정하게 봐야 합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">Q. 납부예외 기간이 연금액에 얼마나 영향을 주나요?</h2>
                <p>
                  결론: 예외 기간은 가입기간에 산입되지 않아 노령연금 월 수령액이 줄어듭니다. 국민연금은 가입기간과 가입 중 평균소득(A값·B값)에 비례해 결정되므로, 짧아진 만큼 감액됩니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 1. 40세 실직, 2년 납부예외</p>
                  <p className="text-sm text-text-secondary">
                    · 기존 가입기간: 15년(180개월)
                    <br />
                    · 40세부터 42세까지 2년간 실직·구직 상태로 납부예외 신청
                    <br />
                    · 이후 재취업해 60세까지 계속 납부 → 총 가입기간 33년(396개월)
                    <br />
                    · 만약 납부예외 없이 계속 납부했다면 35년(420개월)이 되었을 것
                    <br />
                    · 결과: 가입기간이 24개월 짧아진 만큼 월 수령액이 낮아집니다. 실제 감액 폭은 그 시점의 소득 수준에 따라 달라지므로 예상연금 조회로 개인별 확인이 필요합니다.
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 2. 50세 폐업, 5년 예외 후 추납으로 회복</p>
                  <p className="text-sm text-text-secondary">
                    · 자영업자 A씨, 50세에 폐업 후 5년간 납부예외
                    <br />
                    · 55세에 재취업, 국민연금법 92조 추납 신청으로 5년치 보험료 완납
                    <br />
                    · 결과: 5년 기간이 가입기간에 산입되어 원래 예상 연금액에 근접하게 회복. 다만 추납 시점의 연금보험료 기준으로 계산되므로 일시 납부액 부담은 큽니다.
                  </p>
                </div>
                <p>
                  다만, 최소 가입기간 10년(120개월)을 채우지 못하면 노령연금 자체를 받지 못합니다. 납부예외 기간이 길어져 가입기간이 짧아질 위험이 있다면, 반환일시금·임의계속가입 등 다른 선택지도 함께 검토해야 합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">Q. 나중에 추후납부로 메울 수 있나요?</h2>
                <p>
                  결론: 가능합니다. 국민연금법 92조 추후납부(추납)는 납부예외·적용제외 기간의 보험료를 나중에 몰아서 낼 수 있게 해주는 제도로, 추납한 기간만큼 가입기간이 회복됩니다.
                </p>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li>
                    <strong>대상 기간:</strong> 과거 납부예외·적용제외로 인정된 기간이 있어야 하며, 신청 시점 기준으로 인정 최대 기간이 정해져 있습니다.
                  </li>
                  <li>
                    <strong>납부 금액 산정:</strong> 신청 당시의 기준소득월액을 기준으로 산정되므로, 오래 미룰수록 회당 금액이 커질 수 있습니다.
                  </li>
                  <li>
                    <strong>분할 납부:</strong> 일시납이 부담될 경우 60개월(5년) 이내 분납이 가능하며, 분납 시에는 이자가 가산됩니다.
                  </li>
                  <li>
                    <strong>노후 효과:</strong> 추납한 기간이 가입기간에 산입되어, 노령연금 월 수령액이 회복됩니다. 특히 최소 가입기간 10년을 채우지 못한 경우 추납이 결정적일 수 있습니다.
                  </li>
                </ul>
                <p>
                  주의: 추납 한도, 이자율, 분납 조건은 제도 개편에 따라 변동됩니다. 신청 전 반드시 국민연금공단(1355)에서 개인별 조건을 확인한 뒤 결정하세요. 특히 예상 연금 증가액과 추납 부담액을 비교해 손익을 따져보는 것이 좋습니다.
                </p>
              </section>

              <section className="space-y-6 border-t border-border-base pt-8">
                <h2 className="text-2xl font-bold">납부예외와 헷갈리기 쉬운 제도들</h2>
                <p>
                  국민연금에는 납부예외와 이름이 비슷하거나 상황이 겹치는 제도가 여럿 있습니다. 각자 목적과 효과가 다르니 구분해두면 좋습니다.
                </p>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li>
                    <strong>임의가입:</strong> 소득이 없어 의무 가입 대상이 아닌 전업주부·학생 등이 본인 의사로 가입하는 제도. 납부예외와 반대로 자발적 납부입니다.
                  </li>
                  <li>
                    <strong>임의계속가입:</strong> 60세가 넘어 의무 가입이 끝났지만 가입기간을 채우려고 계속 납부하는 제도. 최소 가입기간 10년을 채우지 못한 사람에게 특히 유용합니다.
                  </li>
                  <li>
                    <strong>실업크레딧:</strong> 실업급여 수급자가 국가 지원(75%)을 받으며 본인 25%만 부담해 최대 12개월 가입기간을 유지하는 제도. 실업급여 신청 시 함께 신청 가능합니다.
                  </li>
                  <li>
                    <strong>출산·군복무 크레딧:</strong> 둘째 이상 출산이나 군 복무 기간에 대해 일정 개월수를 가입기간으로 인정해주는 제도. 별도 신청 없이 사후 반영됩니다.
                  </li>
                </ul>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">체크리스트, 소득이 끊긴 지금 무엇부터 할까</h2>
                <p>
                  실직·폐업으로 국민연금 처리가 고민이라면, 다음 순서로 확인해보세요.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3">
                  <p className="text-sm text-text-secondary">
                    1. 사유 발생일(퇴사일·폐업일) 확인 → 다음 달 15일을 달력에 표시.
                    <br />
                    2. 증빙 서류 준비: 이직확인서·퇴직증명서·폐업사실증명원·진단서 등.
                    <br />
                    3. "내곁에국민연금" 앱 또는 nps.or.kr에서 납부예외 신청.
                    <br />
                    4. 실업급여 수급 예정이라면 실업크레딧도 함께 신청 검토.
                    <br />
                    5. 건강보험은 별개이므로, 지역건보료 조정·피부양자 등록도 별도로 확인.
                    <br />
                    6. 소득이 재발생하면 즉시 납부재개 신고(사업장 취업 시 회사 신고로 자동 전환).
                    <br />
                    7. 여유가 생기면 국민연금법 92조 추후납부로 가입기간 회복을 검토.
                  </p>
                </div>
              </section>

              <h2 className="text-2xl font-bold mb-6">자주 묻는 질문</h2>
              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h3 className="text-lg font-semibold text-text-primary">관련 계산기 및 가이드</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link
                    href="/guide/national-pension-voluntary-continued-enrollment-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">국민연금 임의계속가입 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">60세 이후에도 가입기간을 채우기 위한 임의계속가입 조건과 절차.</p>
                  </Link>
                  <Link
                    href="/guide/national-pension-voluntary-subscription-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">국민연금 임의가입 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">전업주부·학생 등 의무 대상이 아닌 사람의 자발적 가입 안내.</p>
                  </Link>
                  <Link
                    href="/guide/national-pension-additional-payment-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">국민연금 추후납부 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">과거 납부예외 기간을 회복하는 92조 추납 절차와 손익 계산.</p>
                  </Link>
                  <Link
                    href="/guide/national-pension-premium-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">국민연금 보험료 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">기준소득월액과 요율로 매달 얼마를 내는지 확인하세요.</p>
                  </Link>
                  <Link
                    href="/guide/national-pension-expected-benefit-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">국민연금 예상 수령액 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">가입기간과 소득 이력으로 노령연금 월 수령액을 미리 확인.</p>
                  </Link>
                  <Link
                    href="/guide/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">전체 가이드 보기</div>
                    <p className="mt-1 text-sm text-text-secondary">세금·금융·부동산·근로 전 분야 가이드 목록.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 교육 목적으로 작성되었으며, 개인 맞춤형 세무·연금 조언이 아닙니다. 실제 납부예외 인정 여부, 인정 기간, 추후납부 한도와 이자, 실업크레딧 병행 가능 여부는 국민연금공단(국번 없이 1355) 또는 nps.or.kr에서 반드시 확인하세요. 개별 상황(사유 종류, 증빙 유무, 기존 가입 이력)에 따라 처리 결과가 다를 수 있습니다. 본 콘텐츠는 2026-08-03을 기준으로 작성되었으며, 국민연금법 개정 시 즉시 업데이트됩니다. 인용 법조항은 <strong>국민연금법 §91(연금보험료 납부의 예외), §92(추후납부)</strong>입니다. AI 보조 작성 후 운영자 검수 완료.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.nps.or.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">국민연금공단</a>,{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터(국민연금법)</a>,{' '}
                  <a href="https://easylaw.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">찾기 쉬운 생활법령정보</a>,{' '}
                  <a href="https://www.gov.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">정부24</a>.
                </p>
              </section>

              <ShareButtons
                title="국민연금 납부예외 2026 가이드"
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