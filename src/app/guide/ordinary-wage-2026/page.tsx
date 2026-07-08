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

const URL = 'https://calculatorhost.com/guide/ordinary-wage-2026/';
const DATE_PUBLISHED = '2026-07-09';
const DATE_MODIFIED = '2026-07-09';

export const metadata: Metadata = {
  title: '통상임금 2026 | 정기상여 포함·연장수당 기초·판례 변경',
  description:
    '통상임금 정의·계산·2024 대법 판례 변경 완전 정리. 정기상여금 포함, 시간급 산정법, 연장·야간·휴일수당 기초. 근로기준법 §2·§56.',
  keywords: [
    '통상임금',
    '정기상여금',
    '연장수당',
    '야간수당',
    '휴일수당',
    '근로기준법',
    '2024 판례',
    '시간급 계산',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '통상임금 2026 | 정기상여 포함·연장수당 기초' }],
    title: '통상임금 2026 — 2024 대법 판례 이후 정의·계산·영향',
    description: '정기상여금도 통상임금? 2024.12.19 판례 변경 내용과 실제 급여·수당 계산에 미치는 영향을 완전히 정리했습니다.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '통상임금 2026 — 2024 판례 변경 후 정기상여 포함 여부',
    description: '통상임금 정의·시간급 계산·재직요건부 상여금 포함 규칙을 다룹니다.',
  },
};

const FAQ_ITEMS = [
  {
    question: '통상임금이 정확히 무엇인가요?',
    answer:
      '통상임금은 근로자에게 정기적·일률적으로 지급하기로 정한 임금을 의미합니다(근로기준법 §2, §56). 연장근로수당·야간근로수당·휴일근로수당·연차유급휴가수당·해고예고수당 등 법정수당의 산정 기초가 됩니다. 통상임금이 높을수록 법정수당도 많이 지급됩니다.',
  },
  {
    question: '2024년 대법 판례가 뭐가 달라졌나요?',
    answer:
      '2024년 12월 19일 대법원 전원합의체 판결에서 통상임금 판정의 "고정성" 요건이 폐기되었습니다. 종전에는 재직조건부 정기상여는 통상임금 제외였으나, 이제는 정기적·일률적이면 재직조건부 상여도 통상임금에 포함됩니다. 이로써 많은 기업의 통상임금이 새로 산정됩니다.',
  },
  {
    question: '시간급 통상임금은 어떻게 계산하나요?',
    answer:
      '시간급 통상임금 = 월 통상임금 ÷ 209시간입니다. 209시간은 주40시간 + 주휴일 8시간 기준입니다. 예를 들어 월 통상임금이 350만원이면 시간급은 350만원 ÷ 209 = 약 16,746원입니다. 연장·야간·휴일수당은 이 시간급을 기준으로 1.5배 또는 2배로 계산됩니다.',
  },
  {
    question: '기본급만 통상임금이 되나요?',
    answer:
      '아닙니다. 기본급은 물론이고, 정기상여금(월급처럼 정기적으로 지급하는 경우), 영업수당, 직급수당, 근속수당 등 정기적·일률적으로 지급하는 모든 임금이 포함될 수 있습니다. 다만 식대·교통비 같은 복리후생비는 고정성 여부에 따라 판단됩니다.',
  },
  {
    question: '판례 변경이 과거 급여에도 소급되나요?',
    answer:
      '일반적으로 신규 판례는 과거 거래에 소급 적용되지 않습니다. 다만 이미 통상임금 분쟁 중이거나, 기업이 자발적으로 재계산하는 경우 소급될 수 있습니다. 개별 상황에 따라 다르므로 회사 인사부나 법무팀에 직접 확인하는 것이 안전합니다.',
  },
  {
    question: '식대나 교통비는 통상임금에 포함되나요?',
    answer:
      '식대와 교통비가 통상임금에 포함되려면 "정기적·일률적"이어야 합니다. 매달 고정액으로 지급하는 식대(예: 월 20만원)는 포함될 가능성이 높습니다. 하지만 임금이 아닌 "복리후생" 성격이라면 포함되지 않을 수 있습니다. 명확하지 않으면 노사 간 합의 또는 판례 기준으로 판단됩니다.',
  },
  {
    question: '연장수당이 늘어나면 월급이 줄어드나요?',
    answer:
      '아닙니다. 통상임금이 늘어나는 것은 단순히 법정수당 계산의 기초가 커진다는 뜻입니다. 기본급은 그대로 유지되고, 연장·야간·휴일 근로 시 수당액만 커집니다. 예를 들어 1시간 연장근로 수당이 12,600원에서 16,746원으로 올라갑니다.',
  },
  {
    question: '회사가 통상임금을 조정해야 하나요?',
    answer:
      '회사는 이미 지급한 금액이 통상임금 기준에 맞는지 자체 점검해야 하며, 부족 지급분이 있으면 근로자에게 보정해야 합니다. 그러나 현장에서는 판례 해석이 다를 수 있고, 재직조건부 상여의 경우 기업마다 처리 방식이 다릅니다. 의심스럽거나 분쟁이 있으면 고용노동부나 노동청에 상담 신청하세요.',
  },
];

export default function OrdinaryWage2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '통상임금 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '통상임금 2026 — 2024 대법 판례 이후 정의·계산·영향',
    description:
      '정기상여금 포함, 시간급 산정, 연장·야간·휴일수당 기초 계산. 근로기준법 §2·§56과 2024.12.19 대법원 전원합의체 판결 내용.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['통상임금', '정기상여금', '판례', '수당 계산', '2024'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '통상임금 2026 — 2024 판례 변경과 실제 계산',
    description:
      '통상임금의 정확한 정의, 포함 범위, 시간급 계산법, 법정수당 산정 기초.',
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
                    { name: '통상임금 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">직장인·근로자 · 11분 읽기 · 2026-07-09</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  통상임금 2026
                  <br />
                  <span className="text-2xl text-text-secondary">— 2024 판례 이후 정기상여 포함·수당 기초 변화</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  최근 몇 년간 통상임금에 대한 논란이 계속되고 있습니다. 특히 2024년 12월 19일 대법원 전원합의체 판결에서는 기존의 통상임금 판정 기준을 크게 바꿨습니다. 이제 정기상여금도 통상임금에 포함될 수 있다는 것입니다. 이 변화가 실제로 무엇을 의미하고, 어떻게 계산되며, 급여와 수당에 어떤 영향을 미치는지 완전히 정리해드립니다.
                </p>
              </header>

              <AdSlot slot="guide-ordinary-wage-top" format="horizontal" />

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">통상임금이란 무엇인가</h2>
                <p>
                  근로기준법 §2에서는 임금을 "근로자가 근로의 대가로 받는 금품"이라고 정의합니다. 그리고 그 중 특별히 중요한 개념이 바로 통상임금입니다(근로기준법 시행령 §6).
                </p>
                <p className="mt-4">
                  <strong>통상임금</strong>이란 근로자에게 <strong>정기적·일률적</strong>으로 지급하기로 정한 임금을 의미합니다. 이것이 중요한 이유는, 연장근로수당·야간근로수당·휴일근로수당·연차유급휴가수당·해고예고수당 등 법정수당의 산정 기초가 되기 때문입니다. 통상임금이 높으면 법정수당도 많이 지급됩니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">통상임금이 영향을 미치는 법정수당 목록</p>
                  <ul className="mt-3 ml-4 list-disc space-y-1 text-sm text-text-secondary">
                    <li>연장근로수당(1.5배)</li>
                    <li>야간근로수당(1.5배)</li>
                    <li>휴일근로수당(2배)</li>
                    <li>연차유급휴가수당</li>
                    <li>해고예고수당</li>
                    <li>생리휴가 등 특별휴가</li>
                  </ul>
                  <p className="mt-3 text-xs text-text-tertiary">
                    따라서 통상임금 범위가 확대되면, 위 모든 법정수당이 함께 증가합니다.
                  </p>
                </div>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">2024년 대법원 판례, 무엇이 바뀌었는가</h2>
                <p>
                  2024년 12월 19일, 대법원 전원합의체는 통상임금 판정 기준을 대폭 변경하는 판결을 내렸습니다. 이 판결은 그동안 기업과 근로자 간 오랫동안 분쟁이 되어온 "고정성" 요건을 폐기했습니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">종전 기준 (2024.12.18까지)</p>
                  <p className="text-sm text-text-secondary">
                    통상임금은 다음 조건을 모두 만족해야 했습니다:
                    <br />
                    1) 정기성: 정해진 주기로 지급
                    <br />
                    2) <strong>고정성</strong>: 지급액이 명확하고 고정적
                    <br />
                    3) 일률성: 모든 근로자에게 일률적 지급
                    <br />
                    <strong>결론: 재직조건부 상여금은 고정성 부족으로 통상임금 제외</strong>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">신규 기준 (2024.12.19~현재)</p>
                  <p className="text-sm text-text-secondary">
                    "고정성" 요건이 폐기되었습니다:
                    <br />
                    1) 정기성: 정해진 주기로 지급
                    <br />
                    2) 일률성: 모든 근로자에게 일률적 지급
                    <br />
                    <strong>결론: 재직조건부 정기상여금도 통상임금에 포함</strong>
                  </p>
                </div>
                <p className="mt-4">
                  ⚠️ 다만 판례 변경 이후 통상임금 인정 여부는 여전히 사안별로 판단됩니다. 판례가 "고정성을 요하지 않는다"고 했다는 것이 곧 "모든 상여금이 통상임금"이라는 뜻은 아닙니다. 정기적·일률적인지가 핵심입니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">통상임금에 포함되는 임금의 범위</h2>
                <p>
                  실무에서 통상임금에 포함될 가능성이 있는 항목들을 정리하면 다음과 같습니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 통상임금 포함 가능 항목 (근로기준법 §2, 시행령 §6)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">임금 항목</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">포함 가능성</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">판단 기준</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">기본급</td>
                        <td className="p-3"><strong>포함</strong></td>
                        <td className="p-3">항상 포함</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">정기상여금 (연 2회 이상)</td>
                        <td className="p-3"><strong>포함</strong></td>
                        <td className="p-3">2024 판례 이후 재직조건부도 포함</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">직급수당·직책수당</td>
                        <td className="p-3"><strong>포함 경향</strong></td>
                        <td className="p-3">정기적·일률적 지급 여부</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">근속수당·연봉인상분</td>
                        <td className="p-3"><strong>포함 경향</strong></td>
                        <td className="p-3">고정적 정기 지급 여부</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">고정 식대 (월 20만원 등)</td>
                        <td className="p-3">포함 가능</td>
                        <td className="p-3">실제 근로의 대가인지, 복리후생인지</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">고정 교통비</td>
                        <td className="p-3">포함 가능</td>
                        <td className="p-3">정기적·일률적 지급 여부</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">성과급·실적급</td>
                        <td className="p-3"><strong>미포함</strong></td>
                        <td className="p-3">개인 실적에 따라 변동</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">상여금 (재직 조건 제한)</td>
                        <td className="p-3">미포함 가능</td>
                        <td className="p-3">퇴직 직전 월 미지급 등</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  ⚠️ 다만 위 표는 일반적 경향일 뿐, 최종 판단은 개별 근로계약서·취업규칙·임금규정·지급 현황을 종합적으로 봅니다. 기업마다 구조가 다르므로 명확하지 않으면 노사 협의 또는 고용노동부 상담을 추천합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">통상임금에서 시간급 계산하기</h2>
                <p>
                  통상임금이 정해지면, 이를 시간 단위로 환산하는 계산이 필요합니다. 법정수당(연장·야간·휴일)은 모두 시간급을 기준으로 지급되기 때문입니다.
                </p>
                <p className="mt-4">
                  <strong>공식: 시간급 통상임금 = 월 통상임금 ÷ 209시간</strong>
                </p>
                <p className="mt-4">
                  여기서 209시간의 출처는 다음과 같습니다:
                </p>
                <ul className="mt-3 ml-6 list-disc space-y-2 text-text-secondary">
                  <li><strong>주 40시간</strong> (근로기준법 §50): 주 5일 근무 기준, 1일 8시간</li>
                  <li><strong>주휴일 8시간</strong> (근로기준법 §55): 주 15시간 이상 근무 시 1주일에 최소 1일의 유급휴일</li>
                  <li><strong>합계</strong>: 40 + 8 = 48시간/주</li>
                  <li><strong>월 환산</strong>: 48시간 × 52주 ÷ 12개월 ≈ 208시간, 관례상 209시간 적용</li>
                </ul>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">계산 사례 1. 기본급만 있는 경우</p>
                  <p className="text-sm text-text-secondary">
                    · 기본급: 300만원
                    <br />
                    · 월 통상임금: 300만원
                    <br />
                    · 시간급: 300만원 ÷ 209시간 = 약 14,354원
                    <br />
                    · 연장근로 1시간 수당: 14,354원 × 1.5 = 약 21,531원
                    <br />
                    · 야간근로 1시간 수당: 14,354원 × 1.5 = 약 21,531원
                    <br />
                    · 휴일근로 1시간 수당: 14,354원 × 2 = 약 28,708원
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">계산 사례 2. 기본급 + 정기상여금 (2024 판례 적용)</p>
                  <p className="text-sm text-text-secondary">
                    · 기본급: 300만원
                    <br />
                    · 정기상여금(연 2회): 연 600만원 = 월 50만원 환산
                    <br />
                    · 월 통상임금: 300만원 + 50만원 = 350만원
                    <br />
                    · 시간급: 350만원 ÷ 209시간 = 약 16,746원
                    <br />
                    · 연장근로 1시간 수당: 16,746원 × 1.5 = 약 25,119원 (종전 21,531원 대비 +3,588원)
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 정기상여금 포함으로 시간급이 올라 모든 법정수당이 증가.</span>
                  </p>
                </div>
                <p className="mt-4">
                  ⚠️ 다만 위 계산은 단순화한 예시입니다. 실제로는 근로계약서·취업규칙·임금규정의 상여금 규정을 정확히 확인해야 합니다. 재직조건부 상여의 경우 지급 시기·조건에 따라 통상임금 판정이 달라질 수 있습니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">판례 변경이 미치는 실제 영향</h2>
                <p>
                  2024년 판례 변경은 다음과 같은 현실적 영향을 미칩니다.
                </p>
                <ul className="space-y-4 ml-6 list-disc text-text-secondary mt-4">
                  <li>
                    <strong>기업의 법정수당 재계산 의무</strong>: 정기상여금이 통상임금에 포함된다면, 과거 지급한 연장·야간·휴일수당이 부족했을 가능성이 있습니다. 기업은 자체 점검 후 보정해야 합니다.
                  </li>
                  <li>
                    <strong>근로자의 임금 인상 기대</strong>: 통상임금 재산정으로 법정수당이 증가하므로, 초과근무 시 더 많은 수당을 받게 됩니다.
                  </li>
                  <li>
                    <strong>소급 적용의 불확실성</strong>: 판례는 향후 사건에 적용되나, 과거 분쟁이 없었던 거래에 소급하는지는 경우마다 다릅니다. 기업이 자발적으로 보정할지는 개별 판단입니다.
                  </li>
                  <li>
                    <strong>임금 체계 재설계</strong>: 많은 기업이 통상임금 산정을 명확히 하기 위해 취업규칙·임금규정을 개정하고 있습니다.
                  </li>
                </ul>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">통상임금 관련 자주 묻는 상황</h2>
                <p>
                  실무에서 자주 나오는 혼동을 정리합니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">Q. "통상임금이 올라도 월급은 안 올라간다"는데 맞나요?</p>
                  <p className="text-sm text-text-secondary">
                    네, 맞습니다. 통상임금은 법정수당 계산의 기초일 뿐, 기본급은 그대로입니다. 다만 연장·야간·휴일 근로가 있을 때 그 수당액이 커집니다. 정상 근무만 하면 월급에 변화가 없습니다.
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">Q. 판례가 나온 지금, 회사가 과거분까지 모두 보정해줘야 하나요?</p>
                  <p className="text-sm text-text-secondary">
                    명확한 법적 의무는 판례 이후 신규 급여 계산분부터 시작됩니다. 과거분 소급은 개별 상황·기업 정책에 따라 다릅니다. 만약 통상임금 분쟁이 진행 중이었다면 판례가 적용될 가능성이 있습니다. 회사 인사팀에 정책을 확인하세요.
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">Q. 정기상여금도 통상임금이면, 일시금 보너스는?</p>
                  <p className="text-sm text-text-secondary">
                    정기상여금(정해진 주기로 정기적 지급)과 달리, 부정기적 성과급·상여금(경기가 좋을 때만, 실적 따라)은 통상임금이 아닙니다. 그 차이는 "정기성"입니다.
                  </p>
                </div>
              </section>

              <AdSlot slot="guide-ordinary-wage-mid" format="rectangle" />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h2 className="text-2xl font-bold">통상임금과 세금·4대보험의 관계</h2>
                <p>
                  통상임금 자체는 세금이나 4대보험료 계산에 직접 영향을 주지 않습니다. 다만 수당 증가로 전체 급여가 높아지면 간접적으로 영향을 미칠 수 있습니다.
                </p>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary mt-4">
                  <li>
                    <strong>소득세</strong>: 월 급여(기본급 + 통상임금 기반 수당)를 합산해 원천징수합니다. 법정수당이 증가하면 월 급여 총액이 올라 세금도 약간 증가할 수 있습니다.
                  </li>
                  <li>
                    <strong>4대보험</strong>: 국민연금·건강보험·고용보험의 보험료는 월 급여 총액을 기준으로 계산됩니다. 법정수당 증가 → 월 급여 증가 → 보험료 약간 증가.
                  </li>
                  <li>
                    <strong>중요</strong>: 하지만 정상 근무만 하는 달에는 기본급이 그대로이므로 세금·보험료도 변하지 않습니다.
                  </li>
                </ul>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">통상임금 관련 분쟁이 생기면 어디로 가나</h2>
                <p>
                  자신의 통상임금 산정이 맞는지 의문이 들거나 수당 부족을 의심할 때는 다음 기관에 상담할 수 있습니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">1. 고용노동부 고충 상담 (무료·익명)</p>
                  <p className="text-sm text-text-secondary">
                    고용노동부는 근로자·기업 모두 통상임금 관련 상담을 해줍니다. 전화(1350), 온라인(www.moel.go.kr) 모두 가능합니다.
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">2. 지방고용노동청 진정·신고</p>
                  <p className="text-sm text-text-secondary">
                    임금 부정 지급 의혹이 있으면 관할 지방고용노동청에 근로감독을 신청할 수 있습니다. 이는 수사로 이어져 기업에 시정 명령을 내릴 수 있습니다.
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">3. 노동위원회 부당해고 및 권리 구제 신청</p>
                  <p className="text-sm text-text-secondary">
                    통상임금 미지급이 원인이 되어 고용 문제가 생겼다면, 중앙노동위원회 또는 지방노동위원회에 구제 신청할 수 있습니다.
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">4. 법원 소송</p>
                  <p className="text-sm text-text-secondary">
                    미지급 임금이 많거나 해결이 안 되면 지방법원 민사소송을 제기할 수 있습니다. 이는 개별 계약 분쟁으로 판사 판단을 받게 됩니다.
                  </p>
                </div>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">통상임금 정의, 한 번에 정리</h2>
                <p>
                  지금까지 배운 내용을 체크리스트로 정리하면 다음과 같습니다.
                </p>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary mt-4">
                  <li>통상임금은 연장·야간·휴일수당, 연차유급휴가 등 법정수당의 기초다.</li>
                  <li>2024년 12월 19일 대법원 판결로 재직조건부 정기상여금도 통상임금에 포함될 수 있다.</li>
                  <li>통상임금 판정의 핵심은 "정기적·일률적"인지 여부다. "고정성"은 더 이상 요구하지 않는다.</li>
                  <li>시간급 통상임금 = 월 통상임금 ÷ 209시간 (주 40시간 + 주휴일 8시간).</li>
                  <li>통상임금이 올라도 기본급은 안 올라간다. 수당만 증가한다.</li>
                  <li>명확하지 않으면 고용노동부 상담, 지방고용노동청 진정, 법원 소송 가능하다.</li>
                </ul>
              </section>

              <h2 className="text-2xl font-bold mb-6">자주 묻는 질문</h2>
              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h3 className="text-lg font-semibold text-text-primary">관련 가이드 및 계산기</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link
                    href="/guide/overtime-night-holiday-allowance-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">연장·야간·휴일수당 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">통상임금에서 수당 계산하기</p>
                  </Link>
                  <Link
                    href="/guide/annual-leave-allowance-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">연차유급휴가 수당 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">퇴직 시 미사용 연차 정산</p>
                  </Link>
                  <Link
                    href="/guide/weekly-holiday-allowance-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">주휴일 수당 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">주 15시간 이상 근무 시 유급휴일</p>
                  </Link>
                  <Link
                    href="/guide/severance-vs-pension-dc-db/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">퇴직금 vs DC vs DB</div>
                    <p className="mt-1 text-sm text-text-secondary">퇴직 급여 제도 비교</p>
                  </Link>
                  <Link
                    href="/calculator/salary/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">연봉 실수령액 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">세금·4대보험 공제 후 월급</p>
                  </Link>
                  <Link
                    href="/category/work/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">모든 급여 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">퇴직금·연차수당·세금 모음</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 교육 목적으로 작성되었으며, 개인 맞춤형 법률 조언이 아닙니다. 실제 통상임금 산정, 수당 계산, 분쟁 해결은 회사 인사팀, 고용노동부, 또는 노동법 전문가와 상담하세요. 본 콘텐츠는 2026-07-09을 기준으로 작성되었으며, 법원 판례 변경 시 즉시 업데이트됩니다. 통상임금의 정확한 정의와 기준은 법조항 <strong>근로기준법 §2(임금 정의), §56(통상임금) 및 근로기준법 시행령 §6</strong>과 <strong>2024년 12월 19일 대법원 전원합의체 판결</strong>을 따릅니다. AI 보조 작성 후 운영자 검수 완료.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터</a>,{' '}
                  <a href="https://www.moel.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">고용노동부</a>,{' '}
                  <a href="https://www.scourt.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">대법원 판례 검색</a>.
                </p>
              </section>

              <ShareButtons
                title="통상임금 2026 — 2024 판례 변경 완벽 가이드"
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
