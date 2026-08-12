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

const URL = 'https://calculatorhost.com/guide/average-wage-vs-ordinary-wage-2026/';
const DATE_PUBLISHED = '2026-08-04';
const DATE_MODIFIED = '2026-08-04';

export const metadata: Metadata = {
  title: '평균임금 통상임금 차이 2026, 퇴직금·수당 계산 기준',
  description:
    '퇴직금은 평균임금, 연장수당은 통상임금으로 계산합니다. 두 임금은 산정 방식도, 쓰이는 곳도 다릅니다. 평균임금은 3개월 임금총액을 총일수로 나눈 값, 통상임금은 정기·일률·고정으로 주는 임금입니다. 근로기준법 §2 기준으로 차이와 계산법을 정리했습니다.',
  keywords: [
    '평균임금 통상임금 차이',
    '평균임금 계산법',
    '통상임금 계산법',
    '퇴직금 평균임금',
    '연장수당 통상임금',
    '평균임금 3개월',
    '근로기준법 2조',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '평균임금 통상임금 차이 2026' }],
    title: '평균임금 통상임금 차이 2026, 퇴직금·수당 계산 기준',
    description: '퇴직금은 평균임금, 연장·야간·연차수당은 통상임금. 산정법과 쓰임새 차이를 근로기준법 §2 기준 정리.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '평균임금 통상임금 차이 2026, 퇴직금·수당 기준',
    description: '평균임금은 3개월 총액÷총일수(퇴직금·휴업수당), 통상임금은 정기·일률·고정(연장수당). 근로기준법 §2.',
  },
};

const FAQ_ITEMS = [
  {
    question: '평균임금과 통상임금은 무엇이 다른가요?',
    answer:
      '쓰임새와 계산 방식이 다릅니다. 평균임금은 최근 3개월 동안 실제 받은 임금 총액을 그 기간 총일수로 나눈 1일치 금액으로, 퇴직금과 휴업수당 등을 계산할 때 씁니다(근로기준법 §2①6호). 통상임금은 소정근로의 대가로 정기적, 일률적, 고정적으로 주기로 정한 임금으로, 연장·야간·휴일수당과 연차수당을 계산할 때 씁니다.',
  },
  {
    question: '평균임금은 어떻게 계산하나요?',
    answer:
      '산정 사유가 발생한 날 이전 3개월 동안 받은 임금 총액을 그 기간의 총일수로 나눕니다. 예를 들어 최근 3개월 임금 총액이 900만원이고 그 기간 총일수가 91일이면, 평균임금은 900만원 ÷ 91일 = 약 98,901원(1일)입니다. 상여금과 연차수당은 일정 비율을 나누어 포함하는 등 별도 규칙이 있습니다.',
  },
  {
    question: '통상임금은 어떻게 계산하나요?',
    answer:
      '월 통상임금을 월 소정근로시간으로 나눠 시간급 통상임금을 구합니다. 주 40시간 사업장의 월 소정근로시간은 통상 209시간으로 봅니다. 정기상여금처럼 정기적, 일률적, 고정적 요건을 갖춘 수당은 통상임금에 포함됩니다. 이 시간급에 연장 1.5배 등 가산율을 곱해 수당을 계산합니다.',
  },
  {
    question: '평균임금이 통상임금보다 적으면 어떻게 되나요?',
    answer:
      '통상임금을 평균임금으로 봅니다(근로기준법 §2②). 결근이 많았거나 무급휴직으로 3개월 임금이 크게 줄어 평균임금이 통상임금보다 낮게 나오면, 근로자 보호를 위해 통상임금액을 평균임금으로 삼습니다. 덕분에 특수한 기간에 퇴직해도 퇴직금이 지나치게 깎이지 않습니다.',
  },
  {
    question: '어떤 수당이 통상임금에 들어가나요?',
    answer:
      '정기적, 일률적, 고정적으로 지급되는 임금이 들어갑니다. 기본급, 직책수당, 정기상여금 등이 대표적입니다. 반대로 실적에 따라 달라지는 성과급, 특정 조건에서만 주는 수당처럼 고정성이 없는 항목은 제외됩니다. 2024년 대법원 판례로 조건부 정기상여금의 통상임금성 판단 기준이 조정되었으므로 최신 판례를 참고해야 합니다.',
  },
  {
    question: '퇴직금은 왜 평균임금으로 계산하나요?',
    answer:
      '퇴직 직전의 실제 소득 수준을 반영하기 위해서입니다. 퇴직금은 재직 중 실제로 받은 임금을 기준으로 보상하는 성격이라, 최근 3개월 실지급액에 바탕한 평균임금을 씁니다. 퇴직금 = 1일 평균임금 × 30일 × (재직일수 ÷ 365)로 계산하는 것이 기본 공식입니다.',
  },
  {
    question: '연장근로수당은 왜 통상임금 기준인가요?',
    answer:
      '초과근로의 대가를 소정근로의 시간당 가치에 비례해 보상하기 위해서입니다. 통상임금은 소정근로 1시간의 고정 가치를 나타내므로, 여기에 연장 1.5배, 야간 0.5배 가산, 휴일 등 법정 가산율을 곱해 수당을 산정합니다(근로기준법 §56). 성과에 따라 흔들리는 평균임금 대신 안정적인 통상임금을 쓰는 이유입니다.',
  },
  {
    question: '상여금이 있으면 평균임금이 올라가나요?',
    answer:
      '정기상여금은 평균임금에 반영됩니다. 산정 사유 발생일 이전 12개월 동안 받은 상여금의 3개월분(연 상여금 × 3/12)을 평균임금 산정에 포함합니다. 따라서 상여금 비중이 큰 근로자는 평균임금이 올라가 퇴직금도 늘어나는 경향이 있습니다. 다만 상여금의 성격에 따라 포함 여부가 달라질 수 있습니다.',
  },
  {
    question: '두 임금을 직접 확인하려면 어디를 보나요?',
    answer:
      '급여명세서와 근로계약서, 취업규칙을 함께 봐야 합니다. 명세서에서 정기적으로 고정 지급되는 항목을 추려 통상임금을 잡고, 최근 3개월 실지급 총액으로 평균임금을 계산합니다. 계산이 복잡하거나 상여금 처리가 애매하면 고용노동부 상담(1350)이나 노무사에게 확인하세요.',
  },
];

export default function AverageWageVsOrdinaryWage2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '평균임금 통상임금 차이 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '평균임금 통상임금 차이 2026, 퇴직금과 수당의 계산 기준',
    description:
      '평균임금과 통상임금의 정의, 계산 방식, 쓰임새 차이. 평균임금이 통상임금보다 적을 때의 보정, 상여금 반영, 퇴직금과 연장수당 계산까지 근로기준법 §2 기준 정리.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['평균임금', '통상임금', '퇴직금', '연장수당', '근로기준법'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '평균임금 통상임금 차이 2026',
    description: '평균임금과 통상임금의 정의·계산·쓰임새 차이를 근로기준법 §2 기준으로 정리한 가이드.',
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
                    { name: '평균임금 통상임금 차이 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">직장인·근로자 · 8분 읽기 · 2026-08-04</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  평균임금 통상임금 차이 2026
                  <br />
                  <span className="text-2xl text-text-secondary">퇴직금과 수당의 계산 기준</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  이 가이드는 퇴직금이나 각종 수당을 직접 확인하려는 직장인과 근로자를 위해 씁니다. 급여 문제에서 자주 헷갈리는 두 개념이 평균임금과 통상임금입니다. 이름은 비슷하지만 계산 방식도, 쓰이는 곳도 다릅니다. 퇴직금은 평균임금으로, 연장수당은 통상임금으로 계산한다는 원칙만 잡아도 내 돈이 맞게 계산됐는지 스스로 검증할 수 있습니다.
                </p>
              </header>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">평균임금과 통상임금, 무엇이 다른가</h2>
                <p>
                  쓰임새가 다른 두 임금입니다. 근로기준법 §2는 평균임금과 통상임금을 각각 정의합니다. 평균임금은 실제로 받은 임금의 1일 평균치이고, 통상임금은 소정근로의 대가로 정기적, 일률적, 고정적으로 주기로 정한 임금입니다. 무엇을 계산하느냐에 따라 어느 임금을 쓸지가 정해집니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">30초 요약</p>
                  <ul className="mt-2 space-y-1 text-sm text-text-secondary list-disc ml-5">
                    <li>평균임금: 3개월 임금총액 ÷ 총일수 (1일치)</li>
                    <li>통상임금: 정기·일률·고정으로 주는 임금</li>
                    <li>평균임금 용도: 퇴직금·휴업수당·산재·실업급여</li>
                    <li>통상임금 용도: 연장·야간·휴일·연차수당</li>
                    <li>근거: 근로기준법 §2, §56</li>
                  </ul>
                </div>
                <p>
                  다만 두 임금이 언제나 다른 것은 아닙니다. 평균임금이 통상임금보다 낮게 나오면 통상임금을 평균임금으로 보는 보정 장치가 있어, 근로자에게 불리하지 않도록 설계돼 있습니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">평균임금은 어떻게 계산하나요?</h2>
                <p>
                  3개월 임금 총액을 총일수로 나눕니다. 산정 사유가 발생한 날(예: 퇴직일) 이전 3개월간 받은 임금 총액을 그 기간의 달력상 총일수로 나눈 값이 1일 평균임금입니다. 총일수는 89일에서 92일 사이로 달마다 조금씩 다릅니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-2 mt-4">
                  <p className="font-semibold text-text-primary">사례. 3개월 임금 총액 900만원</p>
                  <p className="text-sm text-text-secondary">
                    · 3개월 임금 총액: 900만원 (기본급 + 고정수당 + 상여 반영분)
                    <br />
                    · 기간 총일수: 91일
                    <br />
                    · 1일 평균임금: 9,000,000 ÷ 91 = 약 98,901원
                    <br />
                    · 퇴직금(재직 3년 가정): 98,901 × 30 × (1,095 ÷ 365) = 약 890만원
                  </p>
                </div>
                <p>
                  다만 상여금과 연차수당은 3개월치가 아니라 연간분의 3/12를 반영하는 등 별도 규칙이 있어 실제 총액 산정이 까다롭습니다. 정확한 값은 급여명세서로 항목을 따져 계산하세요.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">통상임금은 어떻게 계산하나요?</h2>
                <p>
                  월 통상임금을 월 소정근로시간으로 나눕니다. 주 40시간 사업장의 월 소정근로시간은 주휴시간을 포함해 통상 209시간으로 봅니다. 시간급 통상임금을 구한 뒤 법정 가산율을 곱해 수당을 계산합니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-2 mt-4">
                  <p className="font-semibold text-text-primary">사례. 월 통상임금 2,090,000원</p>
                  <p className="text-sm text-text-secondary">
                    · 시간급 통상임금: 2,090,000 ÷ 209 = 10,000원
                    <br />
                    · 연장근로 1시간: 10,000 × 1.5 = 15,000원
                    <br />
                    · 야간 가산(밤 10시~새벽 6시) 1시간: 추가 10,000 × 0.5 = 5,000원
                    <br />
                    · 연장 + 야간 동시: 10,000 × (1 + 0.5 + 0.5) = 20,000원
                  </p>
                </div>
                <p>
                  예외: 어떤 수당이 통상임금에 포함되는지는 정기성, 일률성, 고정성 판단에 달려 있고, 2024년 대법원 판례로 정기상여금 등의 기준이 조정되었습니다. 최신 판례와 취업규칙을 함께 확인해야 정확합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">어디에 무엇을 쓰나요?</h2>
                <p>
                  보상의 성격에 따라 기준 임금이 나뉩니다. 실제 소득 보전이 목적이면 평균임금, 소정근로의 시간 가치가 기준이면 통상임금을 씁니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 평균임금 vs 통상임금 쓰임새 비교</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">구분</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">평균임금</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">통상임금</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">계산</td>
                        <td className="p-3">3개월 총액 ÷ 총일수</td>
                        <td className="p-3">월 임금 ÷ 209시간</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">포함 범위</td>
                        <td className="p-3">실제 받은 임금 대부분</td>
                        <td className="p-3">정기·일률·고정 항목만</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">주요 용도</td>
                        <td className="p-3">퇴직금·휴업수당·산재·실업급여</td>
                        <td className="p-3">연장·야간·휴일·연차수당</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">보정</td>
                        <td className="p-3">통상임금보다 낮으면 통상임금 적용</td>
                        <td className="p-3">해당 없음</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p>
                  다만 산재보험급여나 휴업수당 등 개별 제도는 세부 산정 특례가 있으므로, 큰 금액이 걸린 경우 고용노동부와 근로복지공단 안내를 함께 확인하세요.
                </p>
              </section>

              <section className="space-y-6 border-t border-border-base pt-8" data-speakable>
                <h2 className="text-2xl font-bold">평균임금이 낮게 나오면 손해인가요?</h2>
                <p>
                  손해를 막는 장치가 있습니다. 결근이나 무급휴직으로 최근 3개월 임금이 크게 줄면 평균임금이 통상임금보다 낮아질 수 있는데, 이때는 근로기준법 §2②에 따라 통상임금을 평균임금으로 봅니다. 특수한 기간에 퇴직해도 퇴직금이 부당하게 깎이지 않도록 하는 안전장치입니다.
                </p>
                <p>
                  다만 육아휴직, 업무상 부상 요양 기간 등 법이 정한 특정 기간은 평균임금 산정 기간에서 제외해 계산하므로, 이런 사정이 있으면 산정 기간을 어떻게 잡는지부터 확인해야 합니다.
                </p>
              </section>

              <h2 className="text-2xl font-bold mb-6">자주 묻는 질문</h2>
              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h3 className="text-lg font-semibold text-text-primary">관련 계산기 및 가이드</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link href="/calculator/severance/" className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition">
                    <div className="font-semibold text-primary-500">퇴직금 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">평균임금 기준 퇴직금을 시뮬레이션하세요.</p>
                  </Link>
                  <Link href="/guide/ordinary-wage-2026/" className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition">
                    <div className="font-semibold text-primary-500">통상임금 완전 정리</div>
                    <p className="mt-1 text-sm text-text-secondary">정기상여 포함 여부와 2024 판례 변경.</p>
                  </Link>
                  <Link href="/guide/overtime-night-holiday-allowance-2026/" className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition">
                    <div className="font-semibold text-primary-500">연장·야간·휴일수당</div>
                    <p className="mt-1 text-sm text-text-secondary">가산율과 통상임금 기준 수당 계산법.</p>
                  </Link>
                  <Link href="/guide/annual-leave-allowance-2026/" className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition">
                    <div className="font-semibold text-primary-500">연차수당 계산</div>
                    <p className="mt-1 text-sm text-text-secondary">미사용 연차수당 산정과 지급 기준.</p>
                  </Link>
                  <Link href="/guide/severance-pay-deadline-14-days-2026/" className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition">
                    <div className="font-semibold text-primary-500">퇴직금 지급기한 14일</div>
                    <p className="mt-1 text-sm text-text-secondary">퇴직 후 지급 기한과 지연이자.</p>
                  </Link>
                  <Link href="/category/work/" className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition">
                    <div className="font-semibold text-primary-500">모든 근로 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">연봉·퇴직금·수당·실업급여 모음.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 교육 목적으로 작성되었으며 개인 맞춤형 노무 조언이 아닙니다. 통상임금 포함 항목 판단, 평균임금 산정 기간 제외 사유, 상여금 처리는 취업규칙과 최신 판례에 따라 달라집니다. 실제 계산과 다툼은 고용노동부 상담(1350), 근로복지공단, 노무사에게 확인하세요. 본 콘텐츠는 2026-08-04 기준이며 관련 법령은 <strong>근로기준법 §2, §56</strong>을 따릅니다. AI 보조 작성 후 운영자 검수 완료.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터</a>,{' '}
                  <a href="https://www.moel.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">고용노동부</a>,{' '}
                  <a href="https://www.comwel.or.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">근로복지공단</a>.
                </p>
              </section>

              <ShareButtons title="평균임금 통상임금 차이 2026 가이드" url={URL} />
            </article>
          </main>
        </div>
        <Footer />
      </div>
    </>
  );
}
