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

const URL = 'https://calculatorhost.com/guide/minimum-wage-2026/';
const DATE_PUBLISHED = '2026-07-09';
const DATE_MODIFIED = '2026-07-09';

export const metadata: Metadata = {
  title: '2026년 최저임금 시급 10,320원 | 월급·주휴 환산·계산법',
  description:
    '2026년 최저임금 시급 10,320원 확정. 월 기준 약 216만원, 주휴·주 40시간 포함 환산 방법, 수습감액(90%), 산입범위 전체 정리.',
  keywords: [
    '2026년 최저임금',
    '최저임금 시급',
    '최저임금 월급 환산',
    '주휴수당',
    '수습감액',
    '최저임금법',
    '근로자 급여',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '2026년 최저임금 시급 10,320원 | 월급·주휴 환산·계산법' }],
    title: '2026년 최저임금 시급 10,320원 — 월급 환산·수습감액·계산법 완벽 정리',
    description: '2026년 최저임금 확정 10,320원/시. 월 기준 약 216만원, 주휴포함 계산, 수습 3개월 90% 감액, 정기상여금 산입 기준까지.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '2026년 최저임금 시급 10,320원 확정 — 월급 환산 계산법',
    description: '시급 10,320원 × 209시간 = 월 2,156,880원. 주휴·초과근무·수습감액 완전 정리.',
  },
};

const FAQ_ITEMS = [
  {
    question: '2026년 최저임금이 얼마나 올랐나요?',
    answer:
      '2026년 최저임금은 시급 10,320원으로 확정되었으며, 2025년 10,030원에서 290원(2.9%) 인상되었습니다. 이는 17년 만에 노사 합의로 결정된 것으로 주목할 만합니다(최저임금법 §5).',
  },
  {
    question: '최저임금 시급 10,320원을 월급으로 환산하면 얼마인가요?',
    answer:
      '월 환산액 = 시급 10,320원 × 209시간 = 약 2,156,880원입니다. 209시간은 주 40시간 근무와 주휴 8시간을 포함한 기준입니다((40+8)×365÷7÷12 ≈ 209). 다만 주휴수당과 연장근무는 별도 계산 대상이 될 수 있습니다.',
  },
  {
    question: '주휴수당이 최저임금에 포함되나요?',
    answer:
      '네, 2024년부터 주휴수당은 최저임금 산입범위에 포함됩니다(최저임금법 개정). 위의 209시간 계산이 주 40시간(근무) + 주 8시간(주휴)를 반영한 것입니다. 다만 초과근무, 야근수당, 식대 등은 추가로 산입될 수 있습니다.',
  },
  {
    question: '수습 기간 근로자도 최저임금을 받아야 하나요?',
    answer:
      '네, 수습 기간 근로자도 최저임금을 받아야 합니다. 다만 최저임금법 §5에 따라 수습 3개월 이내인 경우 최저임금의 90%(시급 9,288원)만 지급할 수 있습니다. 3개월 이후는 반드시 전액 최저임금을 지급해야 합니다.',
  },
  {
    question: '정기상여금이나 복리후생비는 최저임금에 포함되나요?',
    answer:
      '2024년 개정에 따라 정기상여금과 복리후생비는 최저임금 산입범위에 포함됩니다(최저임금법 개정). 다만 월 기준 환산액만 포함되므로, 산입 범위와 금액은 개별 계약과 규정에 따라 달라질 수 있습니다.',
  },
  {
    question: '초과근무, 야근수당, 식대는 최저임금에 포함되나요?',
    answer:
      '초과근무수당과 야근수당은 기본적으로 최저임금에 포함되지 않습니다. 이들은 추가 수당으로 별도 지급해야 합니다. 식대도 통상적으로 최저임금과 별개이지만, 계약 조항에 따라 달라질 수 있습니다(최저임금법 §5 산입범위 참조).',
  },
  {
    question: '최저임금을 미달해서 지급하면 어떻게 되나요?',
    answer:
      '최저임금을 미달해서 지급한 사용자는 최저임금법 §28에 따라 3년 이하의 징역 또는 2천만원 이하의 벌금에 처할 수 있습니다. 또한 근로자는 부족한 금액을 청구할 권리가 있으며, 고용노동부에 신고할 수 있습니다.',
  },
  {
    question: '자영업자나 프리랜서도 최저임금을 받아야 하나요?',
    answer:
      '최저임금법은 "근로자"에게 적용됩니다. 사업자 등록을 한 자영업자, 프리랜서, 1인 사업자는 원칙적으로 근로자가 아니므로 최저임금 보장 대상이 아닙니다. 하지만 실제 종속성이 있으면 법원에서 근로자로 인정할 수 있습니다.',
  },
];

export default function MinimumWage2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '2026년 최저임금 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '2026년 최저임금 시급 10,320원 — 월급·주휴·수습감액·계산법 완벽 정리',
    description:
      '2026년 최저임금 시급 10,320원 확정. 월 기준 약 216만원, 주휴수당 포함 환산, 수습 3개월 90% 감액, 정기상여금·초과근무 산입범위, 위반 시 벌칙까지 완전 정리.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['최저임금', '최저임금법', '월급 환산', '수습감액', '주휴수당'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '2026년 최저임금 시급 10,320원',
    description:
      '2026년 최저임금 확정값, 월 환산액, 주휴·수습·산입범위, 위반 벌칙 완벽 정리.',
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
                    { name: '2026년 최저임금' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">직장인·구직자 · 6분 읽기 · 2026-07-09</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  2026년 최저임금
                  <br />
                  <span className="text-2xl text-text-secondary">— 시급 10,320원, 월 216만원 기준</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  2026년 최저임금이 확정되었습니다. 시급 10,320원으로 전년 10,030원에서 290원(2.9%) 인상되었으며, 17년 만에 노사 합의로 이루어진 결정입니다. 이 가이드는 최저임금이 정확히 얼마인지, 월급으로 환산하면 어떻게 되는지, 주휴와 수습 기간은 어떻게 적용되는지, 그리고 위반 시 벌칙까지 완벽하게 정리해드립니다.
                </p>
              </header>

              <AdSlot slot="guide-minimum-wage-top" format="horizontal" />

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">2026년 최저임금 확정값</h2>
                <p>
                  2026년 적용 최저임금은 최저임금법 §5에 따라 시급 기준으로 정해집니다. 고용노동부가 최저임금위원회의 결정을 거쳐 고시하는 이 금액은 모든 사업장과 근로자에게 동일하게 적용됩니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">2026년 최저임금 (최저임금법 §5)</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    · 시급: <strong>10,320원</strong>
                    <br />
                    · 2025년 대비: +290원 (+2.9%)
                    <br />
                    · 결정 방식: 노사 합의 (17년 만의 합의 결정)
                    <br />
                    · 적용 기간: 2026년 1월 1일 ~ 12월 31일
                    <br />
                    · 적용 범위: 지역·업종·사업장 규모 관계없이 전국 동일
                  </p>
                </div>
                <p className="mt-4">
                  최저임금은 시급 기준이므로, 근로자가 시간급으로 지급받든 월급으로 지급받든 시급 환산액이 10,320원 이상이어야 합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">월급 기준 최저임금 환산</h2>
                <p>
                  대부분의 직장인은 월급으로 지급받으므로, 시급을 월급으로 환산하는 방법을 이해하는 것이 중요합니다. 이 환산값이 최저임금을 충족하는지 확인하는 기준이 됩니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">월급 환산 계산</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    · 시급: 10,320원
                    <br />
                    · 월 기준 시간: <strong>209시간</strong>
                    <br />
                    · 계산식: (주 40시간 + 주휴 8시간) × 365일 ÷ 7일 ÷ 12개월 = 209시간
                    <br />
                    · 월급 환산액: 10,320원 × 209시간 = <strong>약 2,156,880원</strong>
                    <br />
                    · 올림: 통상 월 약 <strong>216만원</strong> 기준
                  </p>
                </div>
                <p className="mt-4">
                  이 209시간은 주 40시간의 정규 근무시간에 주휴 8시간을 포함한 값입니다. 2024년 개정 이후 주휴수당이 최저임금에 포함되므로, 월급 환산 시 주휴 시간도 반드시 포함되어야 합니다.
                </p>
                <p className="mt-4">
                  ⚠️ 다만 이 금액은 최저임금 기준일 뿐입니다. 실제 급여에는 초과근무수당, 야근수당, 상여금, 식대 등이 추가될 수 있으며, 회사별로 지급 방식이 다를 수 있으므로 개별 계약을 확인해야 합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">주휴와 주휴수당 (최저임금 포함)</h2>
                <p>
                  주휴(주당 1일의 쉬는 날)는 최저임금법에서 보장하는 근로자의 권리입니다. 2024년 개정부터는 주휴수당이 최저임금 산입범위에 포함되었으므로, 정확히 이해할 필요가 있습니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 주휴 및 주휴수당 기준 (최저임금법 §5, 2024년 이후)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">항목</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">내용</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3"><strong>주휴 시간</strong></td>
                        <td className="p-3">주당 최소 1일 (8시간 기준)</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3"><strong>주휴수당</strong></td>
                        <td className="p-3">주휴 8시간에 대한 임금 (시급 × 8시간)</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3"><strong>최저임금 산입</strong></td>
                        <td className="p-3">2024년부터 포함 (월 환산액 기준 계산)</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3"><strong>월 주휴수당</strong></td>
                        <td className="p-3">시급 × 8시간 × 4.29주 ≈ 시급 × 약 34.32시간 (월 환산)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  주휴수당은 근로자가 일하지 않은 날에 대한 보상이므로, 반드시 지급되어야 합니다. 회사에서 주휴를 이유로 급여를 깎는 것은 위법입니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">수습 기간 근로자 (90% 감액, 최대 3개월)</h2>
                <p>
                  신입사원이나 계약직 근로자 중 일부는 수습 기간을 거칩니다. 최저임금법 §5에서는 수습 기간 근로자에 대해 제한적인 감액을 허용하고 있습니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">수습 기간 최저임금 감액 규정</p>
                  <p className="text-sm text-text-secondary">
                    · 감액 요건: 수습 기간 3개월 이내인 근로자
                    <br />
                    · 감액율: 최저임금의 90%
                    <br />
                    · 2026년 수습 시급: 10,320원 × 90% = <strong>9,288원</strong>
                    <br />
                    · 제한 조건: 단순노무직이나 1년 미만 단기 계약은 감액 불가
                    <br />
                    · 3개월 이후: 반드시 전액 최저임금 지급 (법적 의무)
                  </p>
                </div>
                <p className="mt-4">
                  수습 감액은 최저임금법에서 명시적으로 허용하는 유일한 예외입니다. 다만 감액 기간이 3개월을 초과하거나, 명시되지 않은 다른 감액 사유를 적용하면 위법입니다.
                </p>
                <p className="mt-4">
                  ⚠️ 다만 수습이라고 해서 모든 감액이 가능한 것은 아닙니다. 계약서에 "수습 기간"이 명시되어 있어야 하며, 회사가 임의로 감액할 수 없습니다. 불명확하면 고용노동부에 문의하세요.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">최저임금 산입범위 (어떤 항목이 포함되나?)</h2>
                <p>
                  최저임금 기준을 판정할 때 모든 급여 항목이 포함되는 것은 아닙니다. 2024년 개정에 따라 일부 항목이 새로 추가되었습니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 2. 최저임금 산입범위 (최저임금법 §5, 2024년 개정)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">항목</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">산입 여부</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3"><strong>기본급</strong></td>
                        <td className="p-3">✓ 포함</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3"><strong>주휴수당</strong></td>
                        <td className="p-3">✓ 포함 (2024년부터)</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3"><strong>정기상여금</strong></td>
                        <td className="p-3">✓ 포함 (2024년부터, 월 환산액)</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3"><strong>복리후생비</strong></td>
                        <td className="p-3">✓ 포함 (2024년부터, 월 환산액)</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3"><strong>초과근무수당</strong></td>
                        <td className="p-3">✗ 제외 (별도 지급)</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3"><strong>야근수당·휴일수당</strong></td>
                        <td className="p-3">✗ 제외 (별도 지급)</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3"><strong>식대</strong></td>
                        <td className="p-3">✗ 제외 (통상적 관행)</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3"><strong>교통비</strong></td>
                        <td className="p-3">✗ 제외 (실비 변제)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  정기상여금과 복리후생비는 2024년 개정으로 새로 산입 범위에 포함되었으므로, 월 기준으로 환산할 때 계산에 포함되어야 합니다. 다만 개인별 계약과 규정에 따라 산입 금액이 달라질 수 있습니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">최저임금 위반 시 벌칙</h2>
                <p>
                  사용자(회사)가 최저임금을 미달해서 지급하는 것은 중대한 위법 행위입니다. 최저임금법 §28에 따라 엄격한 벌칙이 적용됩니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">최저임금법 §28 벌칙</p>
                  <p className="text-sm text-text-secondary">
                    · 형사 처벌: 3년 이하의 징역 또는 2천만원 이하의 벌금
                    <br />
                    · 미달액 청구: 근로자는 부족한 임금 전액 청구 가능
                    <br />
                    · 소멸 기한: 임금 청구권 3년 (근로기준법)
                    <br />
                    · 신고 대상: 고용노동부(고용센터) 또는 근로감시관
                  </p>
                </div>
                <p className="mt-4">
                  최저임금 위반은 회사의 규모나 의도와 무관하게 처벌됩니다. 실수로라도 최저임금을 미달해서 지급하면 안 되므로, 급여 계산 시 반드시 확인해야 합니다.
                </p>
                <p className="mt-4">
                  ⚠️ 다만 최저임금 위반이 의심되면 즉시 회사에 문의하거나 고용노동부에 신고하는 것이 좋습니다. 개인적으로 소송하기보다 기관의 보호를 받는 것이 효과적입니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">근로계약서에서 확인해야 할 사항</h2>
                <p>
                  새로 입사하거나 계약을 갱신할 때, 다음 항목들을 꼭 확인해서 최저임금 기준을 충족하는지 검토해야 합니다.
                </p>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li>
                    <strong>기본급:</strong> 시급 환산액이 10,320원 이상인지 확인
                  </li>
                  <li>
                    <strong>수습 기간:</strong> 수습 기간이 명시되어 있고, 90% 감액이 법적 범위 내인지 확인
                  </li>
                  <li>
                    <strong>정기상여금:</strong> 월 평균 지급액이 얼마인지 확인 (월 환산액에 포함되므로)
                  </li>
                  <li>
                    <strong>초과근무 조건:</strong> 초과근무가 있다면 추가 지급 규정 확인
                  </li>
                  <li>
                    <strong>주휴일:</strong> 주휴가 명시되어 있고, 주휴수당이 포함되는지 확인
                  </li>
                  <li>
                    <strong>세금 공제:</strong> 최저임금은 세금 공제 전 기준이므로, 세금 공제 후 실수령액은 더 낮을 수 있음을 이해
                  </li>
                </ul>
                <p className="mt-4">
                  불명확한 부분이 있으면 입사 전에 반드시 회사에 확인하고, 합의한 내용을 계약서에 명시하도록 하세요.
                </p>
              </section>

              <AdSlot slot="guide-minimum-wage-mid" format="rectangle" />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h2 className="text-2xl font-bold">최저임금 관련 기관·문의</h2>
                <p>
                  최저임금에 대한 의문이나 위반 사례가 있다면, 다음 기관들에 문의하거나 신고할 수 있습니다.
                </p>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li>
                    <strong>고용노동부:</strong> 최저임금 정책 및 정보 (minimumwage.go.kr)
                  </li>
                  <li>
                    <strong>고용센터(근로감시관):</strong> 최저임금 위반 신고 및 상담
                  </li>
                  <li>
                    <strong>근로기준감시관:</strong> 기관 검사 신청
                  </li>
                  <li>
                    <strong>직업소개소(고용센터):</strong> 구직자 상담 및 채용 정보
                  </li>
                </ul>
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
                    <div className="font-semibold text-primary-500">연봉 실수령액 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">최저임금 기준 월급으로 계산된 세후 실수령액을 확인하세요.</p>
                  </Link>
                  <Link
                    href="/guide/four-major-insurance-rates-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">4대보험 요율 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">국민연금, 건강보험, 고용보험 등 보험료 계산.</p>
                  </Link>
                  <Link
                    href="/guide/weekly-holiday-allowance-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">주휴수당 계산법 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">주휴 8시간의 급여 계산 및 산입 기준.</p>
                  </Link>
                  <Link
                    href="/guide/overtime-night-holiday-allowance-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">초과근무·야근·휴일수당 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">연장근로의 1.5배, 야근·휴일 가산 계산.</p>
                  </Link>
                  <Link
                    href="/guide/annual-leave-allowance-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">연차수당 계산법 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">미사용 연차의 현금 지급과 세금 처리.</p>
                  </Link>
                  <Link
                    href="/category/work/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">모든 급여·세금 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">연봉, 퇴직금, 소득세, 4대보험 모음.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 교육 목적으로 작성되었으며, 개인별 급여 상황에 따라 적용이 달라질 수 있습니다. 최저임금 기준, 산입범위, 수습감액, 세금 공제 등은 개별 근로계약과 회사 규정에 따라 다를 수 있습니다. 최저임금 미달이 의심되거나 급여에 이의가 있을 때는 관할 고용노동부나 고용센터에 직접 문의하세요. 본 콘텐츠는 2026-07-09을 기준으로 작성되었으며, 최저임금 개정 시 즉시 업데이트됩니다. 최저임금의 정확한 기준은 법조항 <strong>최저임금법 §5(최저임금액), §28(벌칙)</strong>을 따릅니다. AI 보조 작성 후 운영자 검수 완료.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.minimumwage.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">고용노동부 최저임금 정보</a>,{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터(법조항)</a>,{' '}
                  <a href="https://www.moel.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">고용노동부 뉴스(확정 고시)</a>.
                </p>
              </section>

              <ShareButtons
                title="2026년 최저임금 10,320원 가이드"
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
