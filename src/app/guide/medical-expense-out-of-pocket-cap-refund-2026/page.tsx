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

const URL = 'https://calculatorhost.com/guide/medical-expense-out-of-pocket-cap-refund-2026/';
const DATE_PUBLISHED = '2026-07-20';
const DATE_MODIFIED = '2026-07-20';

export const metadata: Metadata = {
  title: '본인부담상한제 2026, 의료비 초과금 환급 조건과 신청방법',
  description:
    '1년간 낸 건강보험 본인부담금이 소득분위별 상한액을 넘으면 초과분을 돌려받습니다. 본인부담상한제의 사전급여·사후환급 구조, 2026년 최고상한액 843만원, 제외 항목, 신청 방법을 국민건강보험법 §44 기준으로 정리했습니다.',
  keywords: [
    '본인부담상한제',
    '의료비 환급',
    '본인부담금 상한액',
    '본인부담상한제 사후환급',
    '건강보험 환급금 신청',
    '국민건강보험법 44조',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '본인부담상한제 2026, 의료비 초과금 환급 조건과 신청방법' }],
    title: '본인부담상한제 2026, 의료비 초과금 환급 조건과 신청방법',
    description:
      '연간 본인부담금이 소득분위별 상한액을 초과하면 초과분을 건강보험공단이 돌려줍니다. 2026년 최고 843만원, 사전급여·사후환급, 제외 항목, 신청 절차 정리.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '본인부담상한제 2026, 의료비 초과금 환급 조건과 신청방법',
    description: '연간 본인부담금이 소득분위별 상한액 초과 시 초과분 환급. 2026년 최고 843만원, 국민건강보험법 §44·시행령 §19.',
  },
};

const FAQ_ITEMS = [
  {
    question: '본인부담상한제가 정확히 무엇인가요?',
    answer:
      '본인부담상한제는 1년(1월 1일부터 12월 31일) 동안 낸 건강보험 본인일부부담금 총액이 소득분위별 상한액을 넘으면, 초과분을 건강보험공단이 부담해 돌려주는 제도입니다(국민건강보험법 §44, 시행령 §19). 예를 들어 연간 본인부담금이 900만원이고 개인별 상한액이 500만원이라면, 초과분 400만원을 공단이 지급합니다. 다만 비급여, 선별급여, 임플란트, 상급병실 입원료 등은 상한제 적용에서 제외됩니다.',
  },
  {
    question: '2026년 본인부담상한액은 얼마인가요?',
    answer:
      '2026년 최고상한액은 843만원이고, 이는 소득 최상위 분위(10분위)에 적용되는 금액입니다(2025년 826만원에서 인상). 저소득 분위인 1분위는 이보다 훨씬 낮은 금액이 상한선으로 정해지며, 소득이 낮을수록 상한액이 낮게 설정되어 환급 가능성이 커집니다. 소득 1분위부터 10분위까지 각 분위별 개인별 상한액의 구체 금액은 매년 국민건강보험공단 공고로 발표되므로, 공단 홈페이지에서 해당 연도 확정 금액을 반드시 확인하세요.',
  },
  {
    question: '사전급여와 사후환급의 차이는 무엇인가요?',
    answer:
      '사전급여는 한 요양기관에서 연간 본인부담금이 최고상한액(2026년 843만원)을 넘으면, 환자는 최고상한액까지만 내고 초과분은 요양기관이 공단에 직접 청구하는 방식입니다. 반면 사후환급은 여러 기관에서 낸 본인부담금을 합산해 개인별 상한액을 넘긴 경우, 공단이 다음 해 8월경 대상자에게 직접 지급합니다. 대부분의 사람이 여러 병원을 이용하기 때문에 사후환급이 훨씬 흔한 형태입니다.',
  },
  {
    question: '어떤 의료비는 환급 대상에서 빠지나요?',
    answer:
      '비급여 진료비(도수치료, 미용 시술 등), 선별급여, 전액본인부담 항목, 임플란트, 상급병실(2인실·3인실) 입원료 차액, 추나요법 본인부담금, 상급종합병원 경증질환 외래 본인부담금 등은 본인부담상한제 적용에서 제외됩니다. 즉 비급여 항목이 많은 진료를 받았다고 해도 그 부분은 환급 대상 금액 산정에 포함되지 않으므로, 실제 지출액 대비 환급액이 낮게 느껴질 수 있습니다.',
  },
  {
    question: '언제, 어떤 방법으로 돌려받게 되나요?',
    answer:
      '사후환급은 통상 다음 해 8월경 지급이 시작됩니다. 국민건강보험공단이 대상자에게 지급신청서를 우편 또는 전자우편으로 보내며, 여기에 본인 명의 계좌를 기재해 회신하면 공단이 계좌로 입금합니다. 신청은 방문, 전화(1577-1000), 인터넷, 팩스, 우편 모두 가능하고, The건강보험 앱이나 공단 홈페이지에서 조회·신청도 할 수 있습니다. 별도 안내가 오지 않아도 공단 홈페이지에서 대상 여부를 직접 확인할 수 있습니다.',
  },
  {
    question: '실손의료보험을 받고 있어도 환급이 되나요?',
    answer:
      '공단의 본인부담상한제 환급 자체는 실손 가입 여부와 무관하게 진행됩니다. 다만 이미 실손보험사로부터 본인부담금을 보상받은 상태에서 상한제 환급까지 받으면, 실손보험 약관에 따라 이후 보험사가 이중보상분을 조정·환수할 수 있습니다. 실손 청구 전후로 본인부담상한제 환급 사실을 보험사에 알리고 정산 절차를 확인하는 것이 안전하며, 세부 처리는 가입한 실손보험 약관과 보험사 안내를 따르세요.',
  },
  {
    question: '요양병원에 장기입원 중인데 상한제 방식이 다른가요?',
    answer:
      '요양병원 장기입원자의 경우 사전급여 적용 방식과 시점이 일반 요양기관과 다르게 운영되는 예외 규정이 있습니다. 장기입원의 특성상 본인부담이 급격히 늘어나는 것을 감안한 조정이므로, 요양병원 원무팀 또는 공단 지사에 문의해 해당 연도 기준을 확인하세요. 일반적인 사후환급 대상 여부는 여전히 동일하게 판정되며, 다음 해 지급 시기도 크게 다르지 않습니다.',
  },
  {
    question: '환급금은 소멸시효가 있나요?',
    answer:
      '건강보험 환급금의 청구권은 일정 기간이 지나면 소멸됩니다. 공단이 지급신청 안내를 보낸 뒤에도 신청하지 않고 오래 방치하면 수령이 어려워질 수 있으므로, 통지서를 받는 즉시 계좌 정보를 회신하거나 The건강보험 앱에서 조회·신청하는 것이 좋습니다. 구체적인 소멸시효 기간과 미신청 시 처리 방법은 국민건강보험공단(1577-1000)에서 개인 상황에 맞게 안내받을 수 있습니다.',
  },
];

export default function MedicalExpenseOutOfPocketCapRefund2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '본인부담상한제 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '본인부담상한제 2026, 의료비 초과금 환급 조건과 신청방법',
    description:
      '연간 건강보험 본인일부부담금이 소득분위별 상한액을 초과하면 초과분을 공단이 환급하는 본인부담상한제. 2026년 최고상한액 843만원, 사전급여·사후환급 구조, 제외 항목, 신청 절차까지 정리.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['본인부담상한제', '의료비 환급', '본인부담금 상한액', '사후환급', '건강보험'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '본인부담상한제 2026',
    description:
      '연간 본인부담금이 소득분위별 상한액 초과 시 초과분을 환급하는 본인부담상한제의 구조와 신청 방법.',
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
                    { name: '본인부담상한제 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">환자·가족 · 8분 읽기 · 2026-07-20</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  본인부담상한제 2026
                  <br />
                  <span className="text-2xl text-text-secondary">: 낸 만큼 넘으면 돌려받는 법</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  큰 병으로 병원비가 몰릴수록 가계는 흔들리기 쉽습니다. 국민건강보험은 이런 상황을 완화하기 위해, 1년 동안 낸 건강보험 본인일부부담금이 소득분위별 상한액을 넘으면 그 초과분을 공단이 돌려주도록 하고 있습니다. 이 가이드는 국민건강보험법 §44와 시행령 §19에 따른 본인부담상한제의 구조, 2026년 최고상한액 843만원의 의미, 제외되는 항목, 그리고 실제 신청 방법까지 순서대로 정리합니다.
                </p>
              </header>

              <AdSlot slot="guide-medical-expense-out-of-pocket-cap-refund-2026-top" format="horizontal" />

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">본인부담상한제란 무엇인가요?</h2>
                <p>
                  본인부담상한제는 1년간 낸 건강보험 본인일부부담금이 소득분위별 상한액을 넘으면 초과분을 건강보험공단이 부담해 돌려주는 제도입니다. 국민건강보험법 §44(비용의 일부부담)와 같은 법 시행령 §19(본인부담상한액)에 근거를 두며, 과도한 의료비로 인한 가계 파탄을 막기 위한 사회안전망 성격을 가집니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">기본 구조 요약</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    · 대상 기간: 매년 1월 1일부터 12월 31일까지의 진료비
                    <br />
                    · 대상 금액: 건강보험이 적용된 진료의 본인일부부담금
                    <br />
                    · 판정 기준: 소득 1~10분위별 개인별 상한액
                    <br />
                    · 지급 방식: 사전급여(요양기관 직접 청구) 또는 사후환급(공단이 개인에게 지급)
                  </p>
                </div>
                <p className="mt-4">
                  중요한 점은 본인이 실제 병원에서 낸 모든 금액이 대상이 되는 것은 아니라는 사실입니다. 비급여·선별급여·전액본인부담 등 건강보험이 적용되지 않은 부분은 상한액 산정에서 빠지며, 그만큼 실제 지출액 대비 환급액은 적게 느껴질 수 있습니다.
                </p>
                <p className="mt-4">
                  ⚠️ 다만 이 가이드는 제도 설명 목적이며, 개별 진료비의 급여·비급여 구분이나 개인별 환급 여부는 국민건강보험공단(1577-1000)에서 반드시 확인해야 합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">상한액은 어떻게 정해지나요?</h2>
                <p>
                  상한액은 개인의 소득 수준에 따라 1분위부터 10분위까지 나누어 정해집니다. 소득이 낮을수록 상한액이 낮게 설정되어 조금만 병원비가 몰려도 환급 대상이 되고, 소득이 높을수록 상한액이 높아져 환급 문턱도 올라가는 구조입니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 소득분위별 개인별 상한액 구조 (국민건강보험법 시행령 §19)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">구분</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">2026년 기준(예시)</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">의미</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">최고상한액</td>
                        <td className="p-3"><strong>843만원(2025년 826만원)</strong></td>
                        <td className="p-3">소득 최상위 분위(10분위) 개인 상한선</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">중간 분위(예: 5~7분위)</td>
                        <td className="p-3">최고상한액보다 낮은 금액</td>
                        <td className="p-3">공단 공고에서 확인</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">저소득 분위(예: 1~3분위)</td>
                        <td className="p-3">가장 낮게 설정</td>
                        <td className="p-3">환급 문턱이 낮아 대상자 비율 높음</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  분위별 개인별 상한액은 매년 국민건강보험공단이 별도 공고로 발표합니다. 매체 요약이나 지난해 자료로 판단하지 말고, 반드시 공단 홈페이지의 해당 연도 확정 공고를 확인하세요.
                </p>
                <p className="mt-4">
                  ⚠️ 다만 요양병원 장기입원자의 경우 별도 기준이 적용될 수 있으며, 세대원 구성 변경이나 소득 재산정으로 분위가 바뀌면 최종 상한액이 달라질 수 있습니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">사전급여와 사후환급은 어떻게 다른가요?</h2>
                <p>
                  본인부담상한제의 지급 방식은 크게 사전급여와 사후환급 두 가지입니다. 어느 방식이 적용되는지는 이용한 요양기관 수와 총 본인부담금 규모에 따라 달라집니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 2. 사전급여 vs 사후환급 비교</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">구분</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">사전급여</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">사후환급</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">발동 조건</td>
                        <td className="p-3">동일 요양기관 연 본인부담금이 2026년 최고상한액 843만원 초과</td>
                        <td className="p-3">여러 기관 합산 본인부담금이 개인별 상한액 초과</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">환자 부담</td>
                        <td className="p-3">최고상한액까지만 납부</td>
                        <td className="p-3">우선 전액 납부 후 초과분 환급</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">청구 주체</td>
                        <td className="p-3">요양기관이 공단에 직접 청구</td>
                        <td className="p-3">공단이 개인 계좌로 지급</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">지급 시기</td>
                        <td className="p-3">진료 발생 시점(요양기관 정산)</td>
                        <td className="p-3">다음 해 8월경 지급 시작</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  대부분의 환자는 여러 병원과 의원을 이용하기 때문에 실제로는 사후환급 형태가 훨씬 흔합니다. 즉 병원비를 낼 당시에는 감면 없이 그대로 납부하고, 다음 해 여름 공단이 정산해 초과분을 계좌로 돌려주는 흐름입니다.
                </p>
                <p className="mt-4">
                  ⚠️ 다만 요양병원 장기입원 등 일부 경우에는 사전급여 적용 방식·시점이 다르게 운영되므로, 해당 사례는 요양병원 원무팀 또는 공단 지사에 문의해 개별 확인이 필요합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">어떤 의료비는 환급 대상에서 빠지나요?</h2>
                <p>
                  본인부담상한제는 건강보험이 적용된 진료의 본인일부부담금만을 대상으로 합니다. 따라서 실제 지출한 금액 중 다음 항목은 상한액 산정에서 제외되며, 그만큼 환급받는 금액도 줄어듭니다.
                </p>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li>
                    <strong>비급여 진료비</strong>: 도수치료, 미용·성형 시술, 특정 초음파·검사 등 건강보험이 적용되지 않는 항목.
                  </li>
                  <li>
                    <strong>선별급여·전액본인부담</strong>: 일부만 건강보험이 적용되거나 환자가 전액 부담하도록 정해진 항목.
                  </li>
                  <li>
                    <strong>임플란트·틀니 일부 비용</strong>: 급여 대상이 아닌 시술 부분.
                  </li>
                  <li>
                    <strong>상급병실(2인실·3인실) 입원료 차액</strong>: 다인실이 아닌 상급병실 이용에 따른 추가 부담분.
                  </li>
                  <li>
                    <strong>추나요법 본인부담금</strong>: 급여화되어 있어도 본인부담 비율이 높은 항목으로 상한제에서 제외.
                  </li>
                  <li>
                    <strong>상급종합병원 경증질환 외래</strong>: 감기 등 경증질환으로 상급종합병원을 이용한 외래 본인부담금.
                  </li>
                </ul>
                <p className="mt-4">
                  즉 병원 영수증에 찍힌 큰 금액 중 상당 부분이 비급여였다면, 상한제 판정 대상 금액은 그보다 훨씬 적을 수 있습니다. 반대로 급여 진료 위주로 비용이 발생했다면 실제 지출과 환급 대상 금액이 비슷하게 산정됩니다.
                </p>
                <p className="mt-4">
                  ⚠️ 다만 항목별 급여·비급여 구분은 진료 내용과 규정 개정 상황에 따라 달라질 수 있으므로, 환급 규모를 정확히 알고 싶다면 국민건강보험공단에서 개인별 판정 결과를 조회해야 합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">얼마를 언제 돌려받나요?</h2>
                <p>
                  사후환급은 통상 다음 해 8월경 지급이 시작됩니다. 공단이 대상자 명단을 확정한 뒤 지급신청서를 우편 또는 전자우편으로 발송하며, 계좌 정보를 회신하면 순차적으로 입금됩니다. 다음 예시로 흐름을 살펴봅니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">예시 1. 사후환급 대상자 (금액은 이해를 돕기 위한 예시)</p>
                  <p className="text-sm text-text-secondary">
                    · 2026년 한 해 동안 여러 병원 이용
                    <br />
                    · 상한제 대상(급여) 본인일부부담금 합계: 720만원
                    <br />
                    · 개인별 상한액(가정): 400만원
                    <br />
                    · 초과분: 720만원 빼기 400만원 이 되어 <strong>약 320만원</strong>
                    <br />
                    · 지급 시기: 2027년 8월경, 지급신청서 회신 후 계좌 입금
                    <br />
                    <span className="text-xs text-text-tertiary">주의: 개인별 상한액은 소득 분위와 연도별 공고에 따라 달라지며, 위 400만원은 예시일 뿐 실제 확정 금액이 아닙니다.</span>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">예시 2. 사전급여 적용 사례</p>
                  <p className="text-sm text-text-secondary">
                    · 같은 요양기관에서 연간 본인부담금 900만원 발생
                    <br />
                    · 2026년 최고상한액: <strong>843만원</strong>
                    <br />
                    · 환자 부담: 843만원까지만 납부
                    <br />
                    · 초과분 57만원: 요양기관이 공단에 직접 청구
                    <br />
                    <span className="text-xs text-text-tertiary">주의: 한 기관 기준 연간 누적 본인부담금이 최고상한액을 넘어야 하며, 여러 기관 합산은 사전급여 대상이 아닙니다.</span>
                  </p>
                </div>
                <p className="mt-4">
                  실제 환급 금액과 지급 시기는 공단의 정산 일정, 개인 소득 재산정 결과, 요양기관의 청구 처리 시점에 따라 달라질 수 있습니다.
                </p>
                <p className="mt-4">
                  ⚠️ 다만 위 예시의 금액은 제도 이해를 돕기 위한 가상 사례이며, 실제 개인별 환급액은 반드시 국민건강보험공단의 개별 조회 결과로 확인해야 합니다.
                </p>
              </section>

              <AdSlot slot="guide-medical-expense-out-of-pocket-cap-refund-2026-mid" format="rectangle" />

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">어떻게 신청하나요?</h2>
                <p>
                  본인부담상한제 환급금은 별도 신청이 없어도 공단이 대상자를 자동 산출해 안내합니다. 다만 실제 계좌 입금을 받으려면 지급신청서에 본인 계좌 정보를 기재해 회신하는 절차가 필요합니다. 창구별로 신청 채널은 아래와 같이 넓게 열려 있습니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">방법 1. 지급신청서 회신</p>
                  <p className="text-sm text-text-secondary">
                    공단이 발송한 지급신청서에 이름, 연락처, 본인 명의 예금계좌를 적어 회신합니다. 우편·팩스·방문 접수 모두 가능하며, 본인이 아닌 대리인이 신청하는 경우에는 위임장과 증빙이 필요합니다.
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">방법 2. 전화 신청(공단 콜센터 1577-1000)</p>
                  <p className="text-sm text-text-secondary">
                    공단 콜센터 1577-1000에 전화해 본인 확인 후 지급 대상 여부, 계좌 등록, 지급 예정일 등을 안내받을 수 있습니다. 우편물을 아직 받지 못했더라도 이 방법으로 조회가 가능합니다.
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">방법 3. The건강보험 앱·공단 홈페이지</p>
                  <p className="text-sm text-text-secondary">
                    The건강보험 앱 또는 국민건강보험공단 홈페이지(nhis.or.kr)에서 로그인 후 환급금 조회·신청 메뉴를 통해 온라인으로 처리할 수 있습니다. 계좌 등록도 가능하며, 지급 상태를 실시간으로 확인할 수 있어 가장 빠릅니다.
                  </p>
                </div>
                <p className="mt-4">
                  ⚠️ 다만 사망자나 미성년자 등 특수 사례는 유족·법정대리인이 서류를 갖춰 신청해야 하고, 개인 상황에 따라 추가 확인 절차가 붙을 수 있습니다.
                </p>
              </section>

              <section className="space-y-6 border-t border-border-base pt-8">
                <h2 className="text-2xl font-bold">실손보험과 중복해서 받을 수 있나요?</h2>
                <p>
                  공단이 지급하는 본인부담상한제 환급 자체는 실손의료보험 가입 여부와 관계없이 진행됩니다. 문제는 실손보험사에서 이미 본인부담금을 보상받은 이후에 공단 환급까지 받게 되는 경우, 실손 약관에 따라 보험사가 사후에 이중보상분을 조정·환수할 수 있다는 점입니다.
                </p>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li>
                    <strong>실손 청구 시점 확인</strong>: 상한제 환급 대상일 가능성이 있다면, 실손 청구서에 그 사실을 함께 알리는 것이 안전합니다.
                  </li>
                  <li>
                    <strong>공단 환급 후 정산</strong>: 상한제 환급을 받은 뒤에는 실손 보험사가 안내하는 정산 방식(반환·차감 등)을 따라야 하며, 임의 사용 후 분쟁이 생기지 않도록 사전에 확인해 두는 편이 좋습니다.
                  </li>
                  <li>
                    <strong>약관별 차이</strong>: 실손보험 세대(1세대~4세대)와 특약 조건에 따라 처리 방식이 다르므로, 반드시 가입한 상품의 약관과 콜센터 안내를 기준으로 판단해야 합니다.
                  </li>
                </ul>
                <p className="mt-4">
                  ⚠️ 다만 이 가이드는 일반적인 흐름 설명이며, 개별 계약의 세부 정산 방법은 가입한 보험회사 약관과 지급 심사 결과에 따릅니다. 특정 상품·상황에 대한 확정 판단은 담당 보험사에서 확인하세요.
                </p>
              </section>

              <h2 className="text-2xl font-bold mb-6">자주 묻는 질문</h2>
              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h3 className="text-lg font-semibold text-text-primary">관련 계산기 및 가이드</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link
                    href="/calculator/salary/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">연봉 실수령액·건보료 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">4대보험 공제 후 세후 월급과 건강보험료를 확인하세요.</p>
                  </Link>
                  <Link
                    href="/guide/health-insurance-premium-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">건강보험료 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">직장·지역가입자 건강보험료 산정 기준을 정리했습니다.</p>
                  </Link>
                  <Link
                    href="/guide/health-insurance-dependent-qualification-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">건강보험 피부양자 자격 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">피부양자 등재 조건과 탈락 사유를 확인하세요.</p>
                  </Link>
                  <Link
                    href="/guide/medical-expense-tax-credit-3-percent-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">의료비 세액공제 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">연말정산 의료비 세액공제 3% 기준과 계산 방법.</p>
                  </Link>
                  <Link
                    href="/guide/health-insurance-voluntary-continuation-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">건강보험 임의계속가입 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">퇴직 후 건강보험료 부담을 줄이는 임의계속가입 제도.</p>
                  </Link>
                  <Link
                    href="/category/lifestyle/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">생활 가이드</div>
                    <p className="mt-1 text-sm text-text-secondary">의료·복지·연말정산 등 실생활 세금·금융 가이드 모음.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 교육·정보 제공 목적이며, 진단·치료에 관한 의료 조언이나 개별 사례에 대한 세무·법률 자문을 대신하지 않습니다. 개인별 본인부담상한액, 환급 대상 여부, 환급 예상 금액은 소득 분위와 연도별 공고에 따라 달라지며, 반드시 국민건강보험공단(1577-1000) 또는 The건강보험 앱·공단 홈페이지에서 개별 조회 결과로 확인해야 합니다. 본 콘텐츠는 2026-07-20 기준이며, 관련 법령·공고 개정 시 업데이트됩니다. 인용 조항은 <strong>국민건강보험법 §44(비용의 일부부담)</strong>과 같은 법 <strong>시행령 §19(본인부담상한액)</strong>이고, 소득 1~10분위별 개인별 상한액의 구체 금액은 국민건강보험공단 최신 공고를 확인하세요. AI 보조 작성 후 운영자 검수 완료.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.nhis.or.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">국민건강보험공단</a>,{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터</a>,{' '}
                  <a href="https://www.easylaw.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">찾기쉬운 생활법령정보</a>.
                </p>
              </section>

              <ShareButtons
                title="본인부담상한제 2026 가이드"
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
