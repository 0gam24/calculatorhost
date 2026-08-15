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

// [revenue-lever: indexing+traffic]
// indexing: 신규 슬러그 색인 표면 확장, 내부 링크 mesh 6개(연차수당·주휴수당·실업급여·근로시간·연봉실수령·근로허브).
// traffic: 폭염 시즌 "야외작업 쓰러지면 산재"·"작업중지권 불이익"·"온열질환 산재 인정" 롱테일 흡수(산안법 §51·§52, 산재보험법 §40·§52).

const URL = 'https://calculatorhost.com/guide/heatwave-heat-illness-work-injury-2026/';
const DATE_PUBLISHED = '2026-08-16';
const DATE_MODIFIED = '2026-08-16';

export const metadata: Metadata = {
  title: '폭염 야외작업 쓰러지면 산재·작업중지권 2026 정리',
  description:
    '폭염에 야외에서 일하다 쓰러지면 온열질환도 업무상 재해로 산재 보상을 받을 수 있습니다(산재보험법 §37). 근로자는 급박한 위험 시 작업을 멈출 권리가 있고, 그 이유로 해고 등 불이익을 받지 않습니다(산안법 §52). 보상 종류와 신청 절차를 정리했습니다.',
  keywords: [
    '폭염 산재',
    '온열질환 산재',
    '작업중지권',
    '야외작업 쓰러짐 산재',
    '폭염 작업중지',
    '산업안전보건법 52조',
    '열사병 산재',
    '휴업급여',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '폭염 야외작업 산재와 작업중지권 2026' }],
    title: '폭염 야외작업 쓰러지면 산재·작업중지권 2026',
    description: '온열질환도 업무상 재해로 산재 인정 가능(산재보험법 §37). 급박한 위험 시 작업중지권과 불이익 금지(산안법 §52).',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '폭염 야외작업 쓰러지면 산재·작업중지권 2026',
    description: '온열질환 산재 보상과 작업중지권. 근로자가 알아야 할 폭염 안전 권리. 산안법 §52, 산재보험법 §37.',
  },
};

const FAQ_ITEMS = [
  {
    question: '폭염에 일하다 쓰러지면 산재로 인정되나요?',
    answer:
      '조건을 갖추면 인정됩니다. 열사병, 열탈진 같은 온열질환이 업무 중 더위 노출로 발생했다고 인정되면 업무상 재해로 봅니다(산업재해보상보험법 §37). 실외 작업이거나 고온 환경 작업이라면 인과관계가 인정될 여지가 큽니다. 진단서와 작업 환경(기온, 작업 시간)을 근로복지공단에 제출해 판단받습니다.',
  },
  {
    question: '작업중지권이 무엇인가요? 정말 일을 멈춰도 되나요?',
    answer:
      '멈출 수 있습니다. 산업안전보건법 §52는 산업재해가 발생할 급박한 위험이 있다고 근로자가 믿을 합리적 이유가 있으면 작업을 중지하고 대피할 권리를 보장합니다. 대피 후에는 관리감독자에게 지체 없이 알리면 됩니다. 폭염으로 어지럽고 쓰러질 것 같은 상황도 여기에 해당할 수 있습니다.',
  },
  {
    question: '작업을 멈추면 해고되거나 불이익을 받지 않나요?',
    answer:
      '법으로 금지되어 있습니다. 산업안전보건법 §52 제4항은 급박한 위험을 믿을 합리적 이유가 있어 작업을 멈춘 근로자에게 사업주가 해고나 그 밖의 불리한 처우를 하지 못하도록 규정합니다. 불이익을 받았다면 관할 지방고용노동청에 진정을 넣을 수 있습니다.',
  },
  {
    question: '사업주는 폭염에 어떤 조치를 해야 하나요?',
    answer:
      '휴식과 그늘, 물을 제공해야 합니다. 산업안전보건기준에 관한 규칙과 고용노동부 지침에 따라 체감온도가 높은 폭염 작업에서는 그늘진 휴식 공간, 시원한 물, 작업시간 조정, 규칙적인 휴식을 제공하도록 정하고 있습니다. 사업주는 급박한 위험이 있으면 즉시 작업을 중지시켜야 합니다(산안법 §51).',
  },
  {
    question: '온열질환으로 산재 인정되면 무엇을 보상받나요?',
    answer:
      '치료비와 휴업급여 등을 받습니다. 요양급여로 치료비 전액을 지원받고, 치료로 일하지 못한 기간에는 평균임금의 70%를 휴업급여로 받습니다(산재보험법 §52). 후유장해가 남으면 장해급여, 사망 시 유족급여와 장의비가 지급됩니다. 4일 이상 요양이 필요하면 산재로 처리합니다.',
  },
  {
    question: '배달·택배·건설처럼 특수형태 노동자도 산재가 되나요?',
    answer:
      '상당수 직종이 적용됩니다. 배달라이더, 택배기사, 건설 일용직 등 노무제공자도 산재보험 적용 대상이 확대되어 왔습니다. 자신의 직종이 적용 대상인지, 보험료 납부 여부와 무관하게 재해 시 신청이 가능한지는 근로복지공단(1588-0075)에 문의해 확인하는 것이 정확합니다.',
  },
  {
    question: '산재 신청은 어떻게 하나요?',
    answer:
      '근로복지공단에 요양급여 신청서를 제출합니다. 병원 진단서, 재해 경위서, 목격자 진술 등을 함께 내면 됩니다. 회사가 협조하지 않아도 근로자가 직접 신청할 수 있고, 회사 날인이 반드시 필요한 것은 아닙니다. 온라인(고용·산재보험 토탈서비스)이나 관할 지사 방문으로 접수합니다.',
  },
  {
    question: '작업 중지 기준이 되는 체감온도는 몇 도인가요?',
    answer:
      '단계별로 다릅니다. 고용노동부 폭염 대응 지침은 체감온도가 일정 수준을 넘으면 보건조치와 규칙적 휴식 부여를, 더 높은 단계에서는 작업 축소나 중지를 권고합니다. 구체적 체감온도 구간과 휴식 시간은 해마다 지침과 안전보건규칙으로 정해지므로, 현재 기준은 고용노동부 공지에서 확인하세요.',
  },
];

export default function HeatwaveHeatIllnessWorkInjury2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '폭염 야외작업 산재·작업중지권 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '폭염 야외작업 쓰러지면 산재·작업중지권 2026',
    description:
      '폭염에 야외에서 일하다 발생한 온열질환의 산재 인정 기준, 근로자의 작업중지권과 불이익 금지, 보상 종류와 신청 절차를 산업안전보건법과 산재보험법 기준으로 정리한 가이드.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['폭염 산재', '온열질환', '작업중지권', '휴업급여', '산업안전보건법'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '폭염 야외작업 산재·작업중지권 2026',
    description:
      '폭염 온열질환의 산재 인정, 근로자 작업중지권, 보상과 신청 절차 완전 정리.',
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
                    { name: '폭염 야외작업 산재·작업중지권 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">야외·현장 근로자 · 8분 읽기 · 2026-08-16</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  폭염 야외작업 쓰러지면 산재·작업중지권 2026
                  <br />
                  <span className="text-2xl text-text-secondary">· 온열질환 보상과 안전 권리</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  한여름 건설현장, 배달, 택배, 농사 현장에서 더위에 쓰러지는 일이 반복됩니다. 이 가이드는 야외에서 일하다 온열질환이 생겼을 때 산재로 인정받는 기준, 근로자가 위험할 때 작업을 멈출 수 있는 작업중지권, 그리고 실제로 받을 수 있는 보상과 신청 절차를 정리합니다. 대상 독자는 폭염 속에서 일하는 근로자와 그 가족입니다.
                </p>
              </header>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">폭염에 쓰러지면 산재가 되나요?</h2>
                <p>
                  됩니다. 열사병, 열탈진 같은 온열질환이 업무 중 더위 노출로 생겼다고 인정되면 업무상 재해로 봅니다(산업재해보상보험법 §37). 특히 실외 작업이나 고온 환경 작업은 업무와 질병 사이의 인과관계가 인정될 여지가 큽니다.
                </p>
                <p>
                  핵심은 "업무 때문에 생겼다"는 연결고리입니다. 작업 당시 기온과 체감온도, 작업 강도, 휴식 여부, 발병 시각 같은 정황이 판단 근거가 됩니다. 그래서 쓰러진 상황을 목격자 진술과 함께 기록해 두는 것이 중요합니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">업무상 재해로 보는 기본 틀 (산재보험법 §37)</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    업무 수행 중 발생 + 업무와 재해 사이 상당인과관계 인정 → 업무상 재해
                    <br />
                    온열질환은 폭염이라는 작업 환경 요인이 원인이므로, 실외·고온 작업에서 인과관계가 인정되기 쉽습니다.
                  </p>
                </div>
                <p>
                  다만 순수하게 개인 지병이 원인이고 업무와 무관하다고 판단되면 인정이 어려울 수 있습니다. 이때는 진단서와 작업 환경 자료로 업무 관련성을 소명하는 것이 관건입니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">작업중지권이란 무엇인가요?</h2>
                <p>
                  근로자가 위험할 때 스스로 일을 멈출 수 있는 법적 권리입니다. 산업안전보건법 §52는 산업재해가 발생할 급박한 위험이 있는 경우 근로자가 작업을 중지하고 대피할 수 있다고 정합니다. 폭염으로 어지럽고 쓰러질 것 같은 상황도 여기에 포함될 수 있습니다.
                </p>
                <p>
                  작업을 멈추고 대피한 뒤에는 관리감독자나 부서장에게 지체 없이 그 사실을 알리면 됩니다(산안법 §52 제2항). 보고를 받은 관리감독자는 필요한 안전 조치를 해야 합니다(제3항).
                </p>
                <p>
                  한편 사업주에게도 의무가 있습니다. 산업재해가 발생할 급박한 위험이 있으면 사업주는 즉시 작업을 중지시키고 근로자를 대피시켜야 합니다(산안법 §51). 즉 작업 중지는 근로자의 권리이자 사업주의 의무이기도 합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">작업 멈추면 불이익 받지 않나요?</h2>
                <p>
                  법으로 금지됩니다. 산업안전보건법 §52 제4항은 급박한 위험이 있다고 믿을 합리적 이유가 있어 작업을 멈춘 근로자에게 사업주가 해고나 그 밖의 불리한 처우를 하지 못하도록 규정합니다. 즉 정당한 작업중지는 징계, 감봉, 해고의 사유가 될 수 없습니다.
                </p>
                <p>
                  예외: 위험이 전혀 없는데도 반복적으로 작업을 거부하는 등 권리를 남용한 경우까지 무조건 보호되는 것은 아닙니다. 판단의 기준은 "급박한 위험을 믿을 합리적 이유"가 있었는지입니다. 그래서 당시 상황(체감온도, 몸 상태, 동료 목격)을 남겨 두면 보호받기 유리합니다.
                </p>
                <p>
                  만약 작업중지를 이유로 불이익을 받았다면 관할 지방고용노동청에 진정이나 신고를 할 수 있습니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">사업주는 폭염에 무엇을 해야 하나요?</h2>
                <p>
                  물, 그늘, 휴식을 제공해야 합니다. 산업안전보건기준에 관한 규칙과 고용노동부의 폭염 대응 지침은 체감온도가 높은 폭염 작업에서 다음과 같은 보건 조치를 요구합니다.
                </p>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li><strong>물:</strong> 시원하고 깨끗한 물을 충분히 제공</li>
                  <li><strong>그늘:</strong> 햇볕을 피할 수 있는 그늘진 휴식 공간 확보</li>
                  <li><strong>휴식:</strong> 가장 더운 시간대 작업 조정과 규칙적인 휴식 부여</li>
                  <li><strong>중지:</strong> 급박한 위험 시 즉시 작업 중지(산안법 §51)</li>
                </ul>
                <p className="mt-4">
                  체감온도 구간별로 요구되는 조치 수준과 휴식 시간은 해마다 지침과 안전보건규칙으로 정해지고, 강화되는 추세입니다. 다만 구체적 기준 수치는 매년 바뀔 수 있으므로 현재 값은 고용노동부 공지에서 확인하세요.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">산재로 인정되면 무엇을 보상받나요?</h2>
                <p>
                  치료비와 소득 보전을 함께 받습니다. 산재보험 급여는 종류별로 나뉩니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 온열질환 산재 주요 보상 (산업재해보상보험법)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">급여 종류</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">내용</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">근거</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">요양급여</td>
                        <td className="p-3">치료비 전액(입원·통원)</td>
                        <td className="p-3">산재보험법 §40</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">휴업급여</td>
                        <td className="p-3">치료로 못 번 기간 평균임금의 70%</td>
                        <td className="p-3">산재보험법 §52</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">장해급여</td>
                        <td className="p-3">치료 후 후유장해가 남은 경우</td>
                        <td className="p-3">산재보험법 §57</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">유족급여·장의비</td>
                        <td className="p-3">사망 시 유족 보상과 장례비</td>
                        <td className="p-3">산재보험법 §62·§71</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례. 휴업급여 계산</p>
                  <p className="text-sm text-text-secondary">
                    · 일 평균임금: 12만원
                    <br />
                    · 열탈진으로 20일 요양(입원·통원)
                    <br />
                    · 휴업급여: 12만원 × 70% = 하루 <strong>8만 4천원</strong>
                    <br />
                    · 20일분: 8만 4천원 × 20일 = <strong>168만원</strong>
                    <br />
                    <span className="text-xs text-text-tertiary">여기에 치료비는 요양급여로 별도 전액 지원됩니다. 요양 4일 이상이면 산재로 처리합니다.</span>
                  </p>
                </div>
                <p className="mt-4">
                  다만 평균임금 산정 방식, 최저·최고 보상 기준액은 매년 고시되므로 실제 금액은 근로복지공단 확인이 정확합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">산재 신청은 어떻게 하나요?</h2>
                <p>
                  근로복지공단에 요양급여 신청서를 내면 됩니다. 절차는 다음과 같습니다.
                </p>
                <ol className="space-y-3 ml-6 list-decimal text-text-secondary">
                  <li>병원에서 온열질환 진단서 발급(열사병, 열탈진 등 병명 확인)</li>
                  <li>재해 경위서 작성(작업 내용, 기온, 시각, 목격자)</li>
                  <li>요양급여 신청서와 함께 근로복지공단에 제출(온라인 또는 관할 지사)</li>
                  <li>공단 심사 후 승인되면 요양급여·휴업급여 지급</li>
                </ol>
                <p className="mt-4">
                  다만 회사가 협조하지 않아도 근로자가 직접 신청할 수 있습니다. 산재 신청에 회사 날인이 반드시 필요한 것은 아니며, 회사가 산재 처리를 꺼려도 근로자 권리는 유지됩니다. 궁금하면 근로복지공단(1588-0075)에 문의하세요.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">배달·택배·특수고용 노동자는 어떻게 되나요?</h2>
                <p>
                  상당수 직종이 산재 적용 대상입니다. 배달라이더, 택배기사, 건설 일용직처럼 다양한 형태로 일하는 노무제공자도 산재보험 적용 범위가 넓어져 왔습니다. 폭염 노출이 큰 이동·야외 직종일수록 온열질환 위험이 높습니다.
                </p>
                <p>
                  다만 직종별로 적용 요건과 신청 방법이 다를 수 있습니다. 자신의 직종이 적용 대상인지, 재해 시 어떤 서류가 필요한지는 근로복지공단에 직접 확인하는 것이 가장 정확합니다. 보험료 납부 여부와 무관하게 재해가 발생하면 신청 자체는 가능한 경우가 많습니다.
                </p>
              </section>

              <h2 className="text-2xl font-bold mb-6">자주 묻는 질문</h2>
              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h3 className="text-lg font-semibold text-text-primary">관련 계산기 및 가이드</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link
                    href="/guide/annual-leave-allowance-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">연차수당 계산 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">쉬지 못한 연차, 수당으로 얼마나 받는지 확인하세요.</p>
                  </Link>
                  <Link
                    href="/guide/overtime-night-holiday-allowance-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">연장·야간·휴일수당 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">가산수당 계산과 지급 기준을 정리했습니다.</p>
                  </Link>
                  <Link
                    href="/guide/unemployment-benefit-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">실업급여 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">퇴사 후 받을 수 있는 급여와 조건을 확인하세요.</p>
                  </Link>
                  <Link
                    href="/guide/sickness-benefit-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">상병수당 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">아파서 일 못 할 때 받는 소득 보전 제도.</p>
                  </Link>
                  <Link
                    href="/calculator/salary/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">연봉 실수령액 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">세후 월급과 4대보험 공제를 계산해보세요.</p>
                  </Link>
                  <Link
                    href="/category/work/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">모든 근로 가이드</div>
                    <p className="mt-1 text-sm text-text-secondary">연봉·수당·휴가·4대보험 모음.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 교육 목적으로 작성되었으며, 개인 맞춤형 법률·노무 조언이 아닙니다. 산재 인정 여부와 보상액, 작업중지의 정당성은 구체적 상황에 따라 달라지므로 근로복지공단 또는 관할 지방고용노동청, 공인노무사와 상담해 확인하세요. 본 콘텐츠는 2026-08-16 기준으로 작성되었으며, 폭염 대응 기준과 법령 개정 시 즉시 업데이트됩니다. 인용 근거: <strong>산업안전보건법 §51(사업주의 작업중지)·§52(근로자의 작업중지), 산업재해보상보험법 §37(업무상 재해 인정 기준)·§40(요양급여)·§52(휴업급여)</strong>. AI 보조 작성 후 운영자 검수 완료.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터</a>,{' '}
                  <a href="https://www.moel.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">고용노동부</a>,{' '}
                  <a href="https://www.comwel.or.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">근로복지공단</a>.
                </p>
              </section>

              <ShareButtons
                title="폭염 야외작업 쓰러지면 산재·작업중지권 2026 가이드"
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
