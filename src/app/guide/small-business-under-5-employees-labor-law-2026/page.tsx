// [revenue-lever: indexing+traffic]
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

const URL = 'https://calculatorhost.com/guide/small-business-under-5-employees-labor-law-2026/';
const DATE_PUBLISHED = '2026-08-07';
const DATE_MODIFIED = '2026-08-07';

export const metadata: Metadata = {
  title: '5인 미만 사업장 근로기준법 2026, 연차·연장수당 되나',
  description:
    '5인 미만 사업장은 근로기준법 일부만 적용됩니다. 연차·연장가산수당·부당해고 구제는 제외되지만 주휴수당·퇴직금·최저임금·근로계약서·해고예고는 반드시 지켜야 합니다. 근로기준법 §11 시행령 별표1.',
  keywords: [
    '5인 미만 사업장',
    '5인 미만 근로기준법',
    '5인 미만 연차',
    '5인 미만 연장수당',
    '5인 미만 야근수당',
    '5인 미만 부당해고',
    '상시근로자 수 산정',
    '근로기준법 11조',
    '5인 미만 주휴수당',
    '5인 미만 퇴직금',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [
      {
        url: '/og-default.png',
        width: 1200,
        height: 630,
        alt: '5인 미만 사업장 근로기준법 2026, 연차·연장수당 되나',
      },
    ],
    title: '5인 미만 사업장 근로기준법 2026, 무엇이 되고 무엇이 안 되는가',
    description:
      '5인 미만은 연차·연장가산수당·부당해고 구제 제외, 주휴수당·퇴직금·최저임금은 그대로 보장. 상시근로자 수 산정법과 실제 사례.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '5인 미만 사업장 근로기준법 2026, 어디까지 적용되나',
    description:
      '연차·연장수당·부당해고 구제는 제외, 주휴수당·퇴직금·최저임금·근로계약서는 유지. 근로기준법 §11 시행령 별표1.',
  },
};

const FAQ_ITEMS = [
  {
    question: '상시근로자 4명인데 아르바이트 2명이 더 있어요, 5인 미만인가요?',
    answer:
      '아르바이트를 포함해 세어봐야 합니다. 근로기준법 §11② 및 시행령 §7의2는 상시근로자 수를 "사유 발생일 전 1개월간 사용한 근로자의 연인원을 같은 기간 가동일수로 나눈 값"으로 산정하도록 규정합니다. 정규직·계약직·단시간 근로자·아르바이트를 모두 합산하며, 대표자와 그 동거친족만 제외합니다. 계산 결과가 5명 이상이면 5인 이상 사업장으로 봅니다.',
  },
  {
    question: '5인 미만 사업장에서 야근 20시간 하면 얼마를 받나요?',
    answer:
      '가산 없이 통상임금 1배만 받습니다. 근로기준법 §56의 연장·야간·휴일근로 50% 가산수당은 5인 이상 사업장에만 적용됩니다(시행령 별표1). 시급 1만원인 근로자가 월 20시간 연장근로를 하면 5인 이상에서는 30만원, 5인 미만에서는 20만원만 받게 되므로 월 10만원 차이가 납니다. 다만 근로한 시간분 자체는 반드시 지급해야 하며 미지급 시 임금체불입니다.',
  },
  {
    question: '5인 미만인데 사장이 마음대로 해고했어요, 구제받을 방법이 있나요?',
    answer:
      '노동위원회 부당해고 구제신청은 어렵지만 해고예고 위반은 다툴 수 있습니다. 근로기준법 §23① 부당해고 금지와 §28 노동위 구제신청은 5인 이상만 적용됩니다. 그러나 §26 해고예고(30일 전 통보 또는 30일분 통상임금)는 5인 미만에도 적용되므로, 예고 없이 즉시 해고당했다면 30일분 통상임금을 청구할 수 있습니다. 관할 지방고용노동청 진정 또는 민사소송 경로가 열려 있습니다.',
  },
  {
    question: '5인 미만 사업장도 퇴직금은 무조건 받나요?',
    answer:
      '1년 이상 근무하고 주 15시간 이상 일했다면 받습니다. 근로자퇴직급여 보장법은 2010년 12월 1일부터 5인 미만 사업장에도 전면 적용되며, 계속근로기간 1년 이상, 4주 평균 소정근로시간이 주 15시간 이상인 근로자에게 지급 의무가 발생합니다. 30일분 평균임금 곱하기 근속연수가 기본 산식이며, 퇴직일로부터 14일 이내에 지급해야 합니다.',
  },
  {
    question: '5인 미만도 근로계약서 안 쓰면 사장이 처벌되나요?',
    answer:
      '됩니다. 근로기준법 §17의 근로계약서 서면 작성·교부 의무는 사업장 규모와 상관없이 전 사업장에 적용됩니다. 위반 시 500만원 이하 벌금(기간제·단시간 근로자는 500만원 이하 과태료)이 부과될 수 있으며, 근로자는 관할 지방고용노동청에 진정을 접수해 시정 요구가 가능합니다. 최저임금 명시 여부·근로시간·휴일·임금 지급방법이 반드시 포함돼야 합니다.',
  },
  {
    question: '사장이 상시근로자 수를 4명으로 맞추려 갑자기 사람을 해고해도 되나요?',
    answer:
      '고의적 회피는 인정되지 않을 수 있습니다. 판례와 고용노동부 행정해석은 상시근로자 수를 "실질적으로" 판단하며, 5인 이상 사업장이 근로기준법 회피 목적으로 단기간에 인원을 줄인 경우 여전히 5인 이상으로 볼 수 있습니다. 구체적 상황은 사실관계에 따라 다르므로 관할 고용노동청 1350 상담 또는 노무사 상담을 권합니다.',
  },
  {
    question: '2026년 5인 미만 사업장 근로기준법 확대 적용은 어떻게 되나요?',
    answer:
      '단계적 확대가 논의 중이나 시행령·시행일은 개별 확인이 필요합니다. 고용노동부는 5인 미만 사업장에도 연차·연장가산수당·부당해고 구제 등을 단계적으로 확대하는 방안을 추진 중이며, 세부 시행 시기와 대상 규정은 시행령·부칙 개정에 따라 달라질 수 있습니다. 반드시 고용노동부 공식 발표 및 개정 시행령 별표1을 확인하시기 바랍니다.',
  },
  {
    question: '5인 미만 사업장에서 산재는 인정되나요?',
    answer:
      '됩니다. 산업재해보상보험은 근로자 1명 이상 사업장이면 원칙적으로 당연 적용이며(산업재해보상보험법 §6), 5인 미만도 예외 없이 포함됩니다. 업무 중 다치거나 출퇴근 재해가 발생하면 근로복지공단에 요양급여·휴업급여를 청구할 수 있으며, 사업주가 산재보험 가입을 누락했더라도 근로자의 보상 청구권은 그대로 유지됩니다.',
  },
];

export default function SmallBusinessUnder5EmployeesLaborLaw2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '5인 미만 사업장 근로기준법 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '5인 미만 사업장 근로기준법 2026, 무엇이 되고 무엇이 안 되는가',
    description:
      '상시근로자 4명 이하 사업장에 근로기준법이 어디까지 적용되는지 완전 정리. 연차·연장가산수당·부당해고 구제는 제외되지만 주휴수당·퇴직금·최저임금·근로계약서·해고예고·산재는 그대로 보장. 상시근로자 수 산정법과 임금 계산 사례.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: [
      '5인 미만 사업장',
      '근로기준법 11조',
      '연차',
      '연장수당',
      '부당해고',
      '주휴수당',
      '퇴직금',
      '상시근로자 수',
    ],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '5인 미만 사업장 근로기준법 2026',
    description:
      '5인 미만 사업장에 적용되는 근로기준법 조항과 적용되지 않는 조항의 정확한 경계, 상시근로자 수 산정법, 실제 임금 사례.',
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
                    { name: '5인 미만 사업장 근로기준법 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">소규모 사업장 근로자·사업주 · 9분 읽기 · 2026-08-07</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  5인 미만 사업장 근로기준법 2026
                  <br />
                  <span className="text-2xl text-text-secondary">연차·연장수당, 어디까지 되나</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  "우리 회사는 5인 미만이니 연차도 없고 야근수당도 없다"는 말을 자주 듣습니다. 절반은 맞고 절반은 틀립니다. 근로기준법은 5인 미만 사업장에도 적용되지만 시행령 별표1이 정한 일부 조항만 적용됩니다. 이 가이드는 연차·연장가산수당·부당해고 구제가 왜 안 되는지, 반대로 주휴수당·퇴직금·최저임금·근로계약서·해고예고·산재는 왜 그대로 보장되는지, 상시근로자 수는 어떻게 세는지를 실제 임금 사례와 함께 정확히 정리합니다.
                </p>
              </header>

              <AdSlot slot="guide-small-business-under-5-employees-labor-law-2026-top" format="horizontal" />

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">한눈에 보기: 5인 미만과 5인 이상, 무엇이 다른가</h2>
                <p>
                  근로기준법 §11①은 상시 5명 이상 근로자를 사용하는 사업장에 법 전체를 적용하고, 상시 4명 이하 사업장에는 대통령령으로 정하는 일부 규정만 적용한다고 규정합니다. 그 "일부"의 목록이 시행령 §7 별표1입니다. 아래 표는 실무에서 가장 많이 문의되는 8가지 항목을 한 눈에 정리한 대비표입니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">
                      표 1. 5인 미만과 5인 이상 사업장 주요 근로기준법 적용 비교 (시행령 §7 별표1 기준, 2026)
                    </caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">항목</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">5인 미만</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">5인 이상</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">근거 조항</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">근로계약서 서면 작성·교부</td>
                        <td className="p-3">적용</td>
                        <td className="p-3">적용</td>
                        <td className="p-3">§17</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">최저임금</td>
                        <td className="p-3">적용</td>
                        <td className="p-3">적용</td>
                        <td className="p-3">최저임금법 전 사업장</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">주휴수당 (주 15시간 이상)</td>
                        <td className="p-3">적용</td>
                        <td className="p-3">적용</td>
                        <td className="p-3">§55</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">해고예고 (30일 전 또는 30일분 통상임금)</td>
                        <td className="p-3">적용</td>
                        <td className="p-3">적용</td>
                        <td className="p-3">§26</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">퇴직금 (1년 이상, 주 15시간 이상)</td>
                        <td className="p-3">적용</td>
                        <td className="p-3">적용</td>
                        <td className="p-3">근퇴법 전 사업장</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">연장·야간·휴일근로 50% 가산수당</td>
                        <td className="p-3">미적용</td>
                        <td className="p-3">적용</td>
                        <td className="p-3">§56</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">연차유급휴가</td>
                        <td className="p-3">미적용</td>
                        <td className="p-3">적용</td>
                        <td className="p-3">§60</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">주 52시간 등 근로시간 상한</td>
                        <td className="p-3">미적용</td>
                        <td className="p-3">적용</td>
                        <td className="p-3">§50·§53</td>
                      </tr>
                      <tr>
                        <td className="p-3">부당해고 금지·노동위 구제신청</td>
                        <td className="p-3">미적용</td>
                        <td className="p-3">적용</td>
                        <td className="p-3">§23①·§27·§28</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">30초 요약</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    · 5인 미만이라도 근로계약서·최저임금·주휴수당·해고예고·퇴직금·산재는 반드시 보장됩니다.
                    <br />
                    · 반대로 연차유급휴가, 연장·야간·휴일근로 50% 가산수당, 주 52시간 상한, 부당해고 구제신청은 원칙적으로 적용되지 않습니다.
                    <br />
                    · 판단 기준은 사유 발생 전 1개월 연인원을 가동일수로 나눈 "상시근로자 수"입니다(시행령 §7의2).
                    <br />
                    · 다만 2026년 이후 단계적 확대가 논의 중이므로 최신 시행령 별표1을 확인해야 합니다.
                  </p>
                </div>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">5인 미만이면 연차유급휴가가 정말 없나요?</h2>
                <p>
                  네, 원칙적으로 없습니다. 근로기준법 §60의 연차유급휴가 규정은 시행령 §7 별표1에 5인 미만 적용 조항으로 열거되지 않아, 상시근로자 4명 이하 사업장 근로자에게는 법적으로 부여되지 않습니다. 1년 만근 시 15일, 3년 이상 매 2년마다 1일씩 추가되는 연차도 5인 미만에서는 발생하지 않으며, 연차수당 청구권도 존재하지 않습니다.
                </p>
                <p>
                  다만, 사업주가 취업규칙이나 근로계약을 통해 자율적으로 연차를 부여하기로 정한 경우에는 그 약정에 따라 지급 의무가 생깁니다. 계약서에 "연 10일의 유급휴가를 제공한다"고 명시했다면 5인 미만이라도 지켜야 합니다.
                </p>
                <p>
                  예외: 5인 미만 사업장이라도 관공서 공휴일(빨간 날)에 관한 유급휴일은 별도로 논의됩니다. 관공서 공휴일의 유급휴일화(§55②)는 상시 5명 이상 사업장에 순차적으로 적용됐으며, 5인 미만은 원칙적으로 대상이 아니었으나 개정·확대 논의가 계속되므로 고용노동부 최신 안내를 확인하는 것이 안전합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">연장·야간·휴일 가산수당 50%도 못 받나요?</h2>
                <p>
                  가산수당은 못 받고 근로 시간분만 받습니다. 근로기준법 §56은 연장근로·야간근로·휴일근로에 대해 통상임금의 50%를 가산 지급하도록 규정하지만, 이 조항은 시행령 별표1에 포함되지 않아 5인 미만 사업장에는 적용되지 않습니다. 즉 야근을 해도 초과 시간에 대해 1배(통상임금 100%)만 지급되며 1.5배가 되지 않습니다.
                </p>
                <p>
                  다만 근로한 시간에 대한 임금 자체는 반드시 지급해야 합니다. 예를 들어 시급 1만원 근로자가 밤 10시부터 새벽 2시까지 4시간 야간근로를 했다면 5인 이상에서는 4시간 곱하기 1.5배로 6만원을 받지만, 5인 미만에서는 4만원만 받게 됩니다. 이 4만원을 지급하지 않으면 임금체불이며, 관할 지방고용노동청에 진정할 수 있습니다.
                </p>
                <p>
                  주의: 주 52시간 상한(§53)도 5인 미만에는 적용되지 않으므로 이론상 장시간 근로가 가능하지만, 이는 사업주 재량의 문제이며 근로계약이나 취업규칙으로 상한을 정했다면 그 약정이 우선합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">그럼 5인 미만도 반드시 받는 권리는 무엇인가요?</h2>
                <p>
                  최소 6가지가 사업장 규모와 무관하게 보장됩니다. 시행령 §7 별표1이 5인 미만 적용 대상으로 명시하는 조항들과, 근로기준법 밖의 별도 법령이 보장하는 권리를 함께 정리하면 다음과 같습니다.
                </p>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li>
                    <strong>근로계약서 서면 작성·교부 (§17):</strong> 임금·근로시간·휴일·연차 항목을 서면으로 작성해 근로자에게 교부해야 하며, 위반 시 500만원 이하 벌금이 부과될 수 있습니다.
                  </li>
                  <li>
                    <strong>최저임금 (최저임금법):</strong> 사업장 규모 관계없이 전 사업장 적용. 2026년 최저시급 미만 지급 시 3년 이하 징역 또는 2천만원 이하 벌금.
                  </li>
                  <li>
                    <strong>주휴수당 (§55):</strong> 1주 소정근로시간이 15시간 이상이고 그 주를 개근한 근로자에게 1주에 1일 이상의 유급휴일(주휴일)을 부여하며, 유급이므로 하루치 임금이 추가 지급됩니다.
                  </li>
                  <li>
                    <strong>해고예고 (§26):</strong> 30일 전에 예고하지 않으면 30일분 이상의 통상임금을 지급해야 합니다. 5인 미만도 그대로 적용됩니다.
                  </li>
                  <li>
                    <strong>퇴직금 (근로자퇴직급여 보장법):</strong> 1년 이상 계속근로하고 4주 평균 주 15시간 이상 근무한 근로자는 규모 관계없이 퇴직금 청구권이 있으며, 퇴직일로부터 14일 이내 지급 원칙입니다.
                  </li>
                  <li>
                    <strong>4대보험·산재보험·출산전후휴가·육아휴직:</strong> 국민연금·건강보험·고용보험·산재보험 가입 의무는 근로자 1명 이상 사업장에 원칙 적용되며, 남녀고용평등법상 출산전후휴가와 육아휴직도 사업장 규모에 상관없이 신청 가능합니다.
                  </li>
                </ul>
                <p>
                  다만 조항별 요건(주 15시간, 1년 이상 근로 등)은 개별 확인이 필요하고, 관공서 공휴일 유급휴일화나 직장 내 괴롭힘 금지 등 일부 조항은 해석·개정이 이어지므로 최신 시행령 별표1과 고용노동부 안내를 참고하는 것이 안전합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">부당해고 구제신청은 정말 못 하나요?</h2>
                <p>
                  노동위원회를 통한 부당해고 구제신청은 어렵습니다. 근로기준법 §23①의 정당한 이유 없는 해고 금지와 §27 해고 서면 통지, §28 노동위 구제신청 규정은 시행령 별표1에 포함되지 않아 5인 미만에는 적용되지 않습니다. 즉 사장이 이유를 명확히 밝히지 않고 해고하더라도 노동위 구제신청 경로는 원칙적으로 열리지 않습니다.
                </p>
                <p>
                  다만 완전히 무방비인 것은 아닙니다. §26 해고예고 규정은 5인 미만에도 적용되므로, 30일 전 예고 없이 즉시 해고당했다면 30일분 통상임금(해고예고수당)을 청구할 수 있고, 미지급 시 지방고용노동청 진정과 민사소송이 가능합니다.
                </p>
                <p>
                  예외: 해고가 근로기준법 §6(균등처우) 위반(성별·국적·신앙·사회적 신분 차별)이거나 노동조합법·남녀고용평등법 위반(모성보호·성희롱 신고 등)이면 별도 법령에 근거해 다툴 여지가 있습니다. 구체적 판단은 관할 고용노동청 상담(1350) 또는 노무사·변호사 상담을 권합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">상시근로자 수는 정확히 어떻게 세나요?</h2>
                <p>
                  근로기준법 §11②과 시행령 §7의2가 산정 방식을 정하고 있습니다. 핵심은 "사유 발생일 전 1개월 동안 사용한 근로자의 연인원을 같은 기간 가동일수로 나눈 값"이라는 산식입니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">상시근로자 수 산정 공식</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    상시근로자 수 = 사유 발생 전 1개월 연인원 (모든 근로자의 근무일수 합계) 나누기 같은 기간 가동일수
                    <br />
                    예: 지난 1개월 가동 25일, 매일 정규직 3명 + 아르바이트 2명이 15일 근무했다면,
                    <br />
                    연인원 = (3명 곱하기 25일) 더하기 (2명 곱하기 15일) = 75 더하기 30 = 105명·일
                    <br />
                    상시근로자 수 = 105 나누기 25 = <strong>4.2명</strong> (5인 미만으로 분류)
                  </p>
                </div>
                <p>
                  포함 대상: 정규직·계약직·단시간·일용·아르바이트 근로자 모두. 파견근로자는 사용사업주 소속으로 봅니다.
                </p>
                <p>
                  제외 대상: 사업주 본인, 사업주의 동거친족(부모·배우자·자녀 등)은 근로자에서 제외됩니다. 다만 동거친족이라도 실질적으로 근로계약을 체결하고 임금을 받는 형태라면 근로자로 봅니다.
                </p>
                <p>
                  주의: 사업주가 상시근로자 수를 인위적으로 4명 이하로 맞추기 위해 단기간에 인원을 조정한 경우, 판례·행정해석은 실질을 우선해 5인 이상 사업장으로 보기도 합니다. 명목상 4.2명이라도 상시적으로 5명 이상을 사용한다면 다툴 여지가 있으므로 관할 고용노동청 상담이 필요합니다.
                </p>
              </section>

              <AdSlot slot="guide-small-business-under-5-employees-labor-law-2026-mid" format="rectangle" />

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">실제 임금 계산 사례로 확인하기</h2>
                <p>
                  같은 근로 조건이라도 사업장이 5인 미만이냐 5인 이상이냐에 따라 실수령액이 크게 달라집니다. 아래 두 사례로 확인해봅시다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 1. 시급 1만원 근로자가 월 20시간 연장근로 시</p>
                  <p className="text-sm text-text-secondary">
                    · 통상시급: 10,000원
                    <br />
                    · 월 연장근로: 20시간
                    <br />
                    · 5인 이상 사업장: 20시간 곱하기 10,000원 곱하기 1.5배 = <strong>300,000원</strong> (연장가산수당 §56 적용)
                    <br />
                    · 5인 미만 사업장: 20시간 곱하기 10,000원 곱하기 1배 = <strong>200,000원</strong>
                    <br />
                    · 월 차액: <strong>100,000원</strong> (연 120만원)
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 같은 야근 시간에도 5인 미만이면 가산분 50%가 빠져 월 10만원 손실.</span>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 2. 1년 만근 후 미사용 연차 15일에 대한 연차수당</p>
                  <p className="text-sm text-text-secondary">
                    · 통상시급: 12,000원 (일당 8시간 기준 96,000원)
                    <br />
                    · 5인 이상 사업장: 15일분 미사용 연차수당 = 96,000원 곱하기 15일 = <strong>1,440,000원</strong> (§60 연차유급휴가 적용)
                    <br />
                    · 5인 미만 사업장: <strong>0원</strong> (연차 자체가 발생하지 않음)
                    <br />
                    · 연 차액: <strong>1,440,000원</strong>
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 5인 미만이면 연차수당 청구권 자체가 없어 연 1백만원대 소득 차이가 발생. 취업규칙으로 자율 연차를 부여한 경우에만 예외.</span>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 3. 예고 없이 즉시 해고당한 경우 (5인 미만)</p>
                  <p className="text-sm text-text-secondary">
                    · 통상시급 10,000원, 1일 8시간 근로자
                    <br />
                    · 30일 전 예고 없이 해고 통보
                    <br />
                    · 해고예고수당 청구액 = 10,000원 곱하기 8시간 곱하기 30일 = <strong>2,400,000원</strong> (§26 적용)
                    <br />
                    · 지급 청구 경로: 관할 지방고용노동청 진정 또는 민사소송
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 부당해고 구제신청은 어렵더라도 해고예고수당 240만원은 5인 미만에서도 청구 가능.</span>
                  </p>
                </div>
              </section>

              <section className="space-y-6 border-t border-border-base pt-8">
                <h2 className="text-2xl font-bold">체크리스트: 우리 사업장은 어느 쪽인가</h2>
                <p>
                  아래 3단계로 자기 사업장의 근로기준법 적용 범위를 확인해보세요.
                </p>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li>
                    <strong>1단계 상시근로자 수 계산:</strong> 지난 1개월 동안 사업장에서 근무한 모든 근로자(아르바이트 포함, 사업주와 동거친족 제외)의 근무일수를 합산해 가동일수로 나눕니다. 결과가 5명 이상이면 5인 이상 사업장입니다.
                  </li>
                  <li>
                    <strong>2단계 근로계약서 확인:</strong> 서면 계약서에 임금·근로시간·휴일·연차·해고 조건이 명시돼 있는지 확인합니다. 자율 연차 규정이 있다면 5인 미만이라도 지켜야 합니다.
                  </li>
                  <li>
                    <strong>3단계 미지급 임금 확인:</strong> 최근 3년간 주휴수당·해고예고수당·퇴직금·최저임금 미달분이 있는지 확인합니다. 임금채권 소멸시효는 3년(§49)이므로 3년 이내 미지급분은 청구 가능합니다.
                  </li>
                </ul>
                <p>
                  의심스러운 부분이 있다면 고용노동부 상담 1350에 전화하거나 관할 지방고용노동청에 진정 접수, 또는 노무사·변호사와 상담해 정확한 판단을 받아보세요.
                </p>
              </section>

              <h2 className="text-2xl font-bold mb-6">자주 묻는 질문</h2>
              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h3 className="text-lg font-semibold text-text-primary">관련 계산기 및 가이드</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link
                    href="/guide/weekly-holiday-allowance-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">주휴수당 2026 완전정리</div>
                    <p className="mt-1 text-sm text-text-secondary">주 15시간 이상 개근 시 지급되는 주휴수당의 조건과 계산법.</p>
                  </Link>
                  <Link
                    href="/guide/annual-leave-allowance-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">연차유급휴가·연차수당 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">연차 발생 기준, 미사용 연차수당 계산 방법.</p>
                  </Link>
                  <Link
                    href="/guide/overtime-night-holiday-allowance-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">연장·야간·휴일근로 가산수당 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">§56 50% 가산수당의 정확한 계산법과 사업장별 적용 차이.</p>
                  </Link>
                  <Link
                    href="/guide/employment-contract-written-obligation-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">근로계약서 서면 작성 의무</div>
                    <p className="mt-1 text-sm text-text-secondary">사업장 규모 무관 전 사업장 적용. 위반 시 벌금.</p>
                  </Link>
                  <Link
                    href="/guide/severance-pay-deadline-14-days-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">퇴직금 14일 지급 기한</div>
                    <p className="mt-1 text-sm text-text-secondary">5인 미만도 1년 이상 근무 시 퇴직금 청구권 보장.</p>
                  </Link>
                  <Link
                    href="/guide/minimum-wage-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">최저임금 2026 완전정리</div>
                    <p className="mt-1 text-sm text-text-secondary">시급·월급 환산, 위반 시 사업주 책임과 신고 방법.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 교육 목적으로 작성되었으며 개별 사건에 대한 법률 자문이 아닙니다. 5인 미만 사업장 적용 여부와 각 조항의 최신 적용 범위는 관할 지방고용노동청, 고용노동부 상담 1350, 또는 공인노무사·변호사에게 반드시 확인하세요. 특히 직장 내 괴롭힘 금지, 관공서 공휴일 유급휴일화 등 일부 조항은 개정과 해석 변동이 이어지므로 최신 시행령 별표1을 우선 참고해야 합니다. 상시근로자 수 산정, 부당해고 다툼, 임금체불 진정은 사실관계에 따라 결론이 크게 달라지므로 전문가 상담을 권합니다. 본 콘텐츠는 2026-08-07을 기준으로 작성됐으며 법령·시행령 개정 시 즉시 업데이트됩니다. 인용한 법조항은 <strong>근로기준법 §11(적용범위)·§17(근로계약서)·§23(해고제한)·§26(해고예고)·§27(해고서면통지)·§28(구제신청)·§50(근로시간)·§53(연장근로)·§55(휴일)·§56(가산수당)·§60(연차유급휴가), 시행령 §7(적용대상 조항 열거)·§7의2(상시근로자 수 산정), 근로자퇴직급여 보장법, 최저임금법, 산업재해보상보험법 §6</strong>입니다. AI 보조 작성 후 운영자 검수 완료.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터(근로기준법·시행령 별표1)</a>,{' '}
                  <a href="https://www.moel.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">고용노동부</a>,{' '}
                  고용노동부 상담센터(국번없이 <strong>1350</strong>).
                </p>
              </section>

              <ShareButtons
                title="5인 미만 사업장 근로기준법 2026 가이드"
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
