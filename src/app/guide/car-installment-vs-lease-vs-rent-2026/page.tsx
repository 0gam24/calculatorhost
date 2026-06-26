import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { Footer } from '@/components/layout/Footer';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { AdSlot } from '@/components/ads/AdSlot';
import { FaqSection } from '@/components/calculator/FaqSection';
import {
  buildBreadcrumbJsonLd,
  buildArticleJsonLd,
  buildWebPageJsonLd,
  buildFaqPageJsonLd,
  buildSpeakableJsonLd,
} from '@/lib/seo/jsonld';

const URL = 'https://calculatorhost.com/guide/car-installment-vs-lease-vs-rent-2026/';
const DATE_PUBLISHED = '2026-06-26';
const DATE_MODIFIED = '2026-06-26';

export const metadata: Metadata = {
  title: '자동차 할부 vs 리스 vs 장기렌트 2026 — 어떤 게 유리할까',
  description:
    '자동차를 살 때 할부·리스·장기렌트 중 무엇이 유리한지 소유권·월 납입·세금·보험 부담 주체·중도해지·사업자 경비처리 기준으로 비교하고, 할부 월 납입액 계산 공식과 예시를 정리합니다.',
  keywords: [
    '자동차 할부 vs 리스',
    '장기렌트 비교',
    '자동차 할부금리',
    '자동차 구입 방법',
    '자동차 소유권',
    '리스 단점',
    '장기렌트 장점',
    '자동차 구입비용',
    '할부 월 납입액 계산',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [
      {
        url: '/og-default.png',
        width: 1200,
        height: 630,
        alt: '자동차 할부 vs 리스 vs 장기렌트 2026',
      },
    ],
    title: '자동차 할부 vs 리스 vs 장기렌트 2026',
    description: '할부·리스·장기렌트 세 방식을 소유권·비용·세금·경비처리로 비교분석',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '자동차 할부 vs 리스 vs 장기렌트 2026',
    description: '자동차 구입 시 가장 유리한 방식은? 비용, 세금, 소유권으로 비교',
  },
};

const FAQ_ITEMS = [
  {
    question: '자동차 할부, 리스, 장기렌트 중 가장 저렴한 방식은?',
    answer:
      '차종과 보유 기간에 따라 다릅니다. 일반적으로 장기렌트가 월 납입료는 낮지만, 주행거리 제한이 있습니다. 할부는 소유권이 있고 초기 비용이 크지만 장기 보유 시 유리합니다. 리스는 중간 수준이며 소유권이 없습니다. 정확한 비교는 실제 선택 차종과 예상 보유 기간으로 계산해야 합니다.',
  },
  {
    question: '할부 월 납입액은 어떻게 계산되나요?',
    answer:
      '할부는 원리금균등 공식으로 계산됩니다. 월상환액 = 차량가 × 월이율 × (1+월이율)^개월수 ÷ ((1+월이율)^개월수 − 1). 예: 3,000만원 차량, 60개월, 연 5.0% 금리면 월 약 56.6만원입니다. 할부 금리는 신용도와 캐피탈사마다 다릅니다.',
  },
  {
    question: '리스는 왜 월 납입료에 세금·보험이 포함되나요?',
    answer:
      '리스사가 차량 소유권을 유지하므로, 자동차세·보험료·등록비 등을 리스사 명의로 처리합니다. 차용인은 이 비용들이 월 리스료에 포함되어 있다고 보면 됩니다. 다만 개별 보험료 상세는 리스 계약서에서 확인해야 합니다.',
  },
  {
    question: '사업자는 할부, 리스, 장기렌트 중 어느 것이 유리한가요?',
    answer:
      '사업자는 리스료·렌트료를 비용으로 처리할 수 있어 세제상 유리합니다. 할부의 경우 이자 부분만 경비처리 가능하고, 감가상각비는 자산으로 계상하므로 회계가 복잡합니다. 다만 실제 경비처리 범위는 업종·소득 규모·회계 기준에 따라 달라지므로, 세무사와 상담 후 결정하세요.',
  },
  {
    question: '할부 중도에 그만두면 어떻게 되나요?',
    answer:
      '할부는 중도 상환이 가능하지만 수수료가 발생할 수 있습니다. 대부분 사전 협의 없이 상환할 수 있으나, 사업용 차량은 캐피탈사 약관에 따라 제한이 있을 수 있습니다. 리스와 장기렌트는 중도 해지 시 위약금이 크므로 주의해야 합니다.',
  },
  {
    question: '주행거리 제한이 있는 이유는 뭔가요?',
    answer:
      '리스와 장기렌트는 만기 후 차량을 다시 판매하거나 인수받습니다. 주행거리가 많으면 차의 가치가 떨어지므로, 이를 사전에 제한합니다. 보통 월 1,000km 이상 초과 시 km당 수백 원 정산비용이 발생합니다.',
  },
  {
    question: '장기렌트는 보험료를 별도로 내나요?',
    answer:
      '장기렌트료에 기본 보험료(종합보험)가 포함되어 있습니다. 다만 자기 부담금 한도나 특약은 약관에 따라 다릅니다. 추가 특약(운전자 보험 등)은 별도 가입할 수 있습니다.',
  },
];

export default function CarInstallmentVsLeaseVsRent2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '자동차 할부 vs 리스 vs 장기렌트 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '자동차 할부 vs 리스 vs 장기렌트 2026 — 어떤 게 유리할까',
    description:
      '할부·리스·장기렌트 세 방식을 소유권·월 납입 구성·세금·보험·경비처리·중도해지 기준으로 비교하고, 할부 월 납입액 계산 공식과 실제 예시로 정리합니다.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['자동차 할부', '리스', '장기렌트', '비교', '비용'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '자동차 할부 vs 리스 vs 장기렌트 2026 | calculatorhost',
    description:
      '자동차 구매 방식 세 가지(할부·리스·장기렌트)를 소유권·월 납입·세금·경비처리로 비교분석합니다.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
  });
  const faqLd = buildFaqPageJsonLd(FAQ_ITEMS);
  const speakableLd = buildSpeakableJsonLd(['[data-speakable]']);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableLd) }}
      />

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
                    { name: '자동차 할부 vs 리스 vs 장기렌트 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">
                  자동차 구매자 · 8분 읽기 · 2026-06-26
                </p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  자동차 할부 vs 리스 vs 장기렌트 2026
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  자동차를 구입하려 할 때 마주하는 선택지는 세 가지입니다: 할부로 사서 소유하거나,
                  리스로 이용하거나, 장기렌트로 빌리거나. 각 방식은 소유권, 월 납입 구성, 세금·보험
                  부담, 경비처리, 중도해지 등에서 차이가 있습니다. 이 가이드에서는 세 방식의 정의와
                  핵심 차이, 그리고 할부 월 납입액 계산법을 명확히 정리해 당신의 상황에 맞는 선택을
                  돕겠습니다.
                </p>
              </header>

              <AdSlot slot="guide-car-installment-vs-lease-vs-rent-2026-top" format="horizontal" />

              <section aria-label="요약" className="card border-l-4 border-l-primary-500">
                <h2 className="mb-2 text-caption uppercase tracking-wider text-primary-500">
                  핵심 요약
                </h2>
                <table className="w-full border-collapse text-sm">
                  <caption className="mb-2 text-left font-semibold text-text-primary">
                    할부 vs 리스 vs 장기렌트 비교 (2026 기준)
                  </caption>
                  <thead>
                    <tr className="border-b border-border-base">
                      <th scope="col" className="pb-2 pr-3 text-left font-semibold">
                        항목
                      </th>
                      <th scope="col" className="pb-2 pr-3 text-left font-semibold">
                        할부
                      </th>
                      <th scope="col" className="pb-2 pr-3 text-left font-semibold">
                        리스
                      </th>
                      <th scope="col" className="pb-2 text-left font-semibold">
                        장기렌트
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-text-secondary">
                    <tr className="border-b border-border-base">
                      <td className="py-2 pr-3 font-semibold">소유권</td>
                      <td className="py-2 pr-3">본인 (완납 후)</td>
                      <td className="py-2 pr-3">리스사</td>
                      <td className="py-2">렌트사</td>
                    </tr>
                    <tr className="border-b border-border-base">
                      <td className="py-2 pr-3 font-semibold">초기 비용</td>
                      <td className="py-2 pr-3">크다 (선납금 필요)</td>
                      <td className="py-2 pr-3">적다</td>
                      <td className="py-2">적다</td>
                    </tr>
                    <tr className="border-b border-border-base">
                      <td className="py-2 pr-3 font-semibold">월 납입 구성</td>
                      <td className="py-2 pr-3">원리금</td>
                      <td className="py-2 pr-3">
                        차량가 + 이자 + 세금·보험
                      </td>
                      <td className="py-2">
                        차량가 + 이자 + 세금·보험·정비
                      </td>
                    </tr>
                    <tr className="border-b border-border-base">
                      <td className="py-2 pr-3 font-semibold">세금·보험</td>
                      <td className="py-2 pr-3">본인 부담</td>
                      <td className="py-2 pr-3">리스료에 포함</td>
                      <td className="py-2">렌트료에 포함</td>
                    </tr>
                    <tr className="border-b border-border-base">
                      <td className="py-2 pr-3 font-semibold">주행거리 제한</td>
                      <td className="py-2 pr-3">없음</td>
                      <td className="py-2 pr-3">있음 (초과 정산)</td>
                      <td className="py-2">있음 (초과 정산)</td>
                    </tr>
                    <tr className="border-b border-border-base">
                      <td className="py-2 pr-3 font-semibold">중도해지</td>
                      <td className="py-2 pr-3">상환 가능</td>
                      <td className="py-2 pr-3">위약금 높음</td>
                      <td className="py-2">위약금 높음</td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-3 font-semibold">사업자 경비처리</td>
                      <td className="py-2 pr-3">이자만</td>
                      <td className="py-2 pr-3">리스료 전부</td>
                      <td className="py-2">렌트료 전부</td>
                    </tr>
                  </tbody>
                </table>
              </section>

              <section className="space-y-4">
                <h2 className="border-b border-border-base pb-2 text-2xl font-bold">
                  할부(할부금융)란 무엇인가요?
                </h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  할부는 캐피탈사나 은행으로부터 돈을 빌려 자동차를 구입하고, 정해진 기간(보통
                  24~84개월) 동안 매월 일정 금액(원리금균등)을 상환하는 방식입니다. 할부 완납 후 자동차
                  소유권은 100% 본인의 것이 됩니다.
                </p>
                <div className="rounded-lg bg-bg-raised p-4">
                  <h3 className="mb-3 font-semibold text-text-primary">할부의 특징</h3>
                  <ul className="space-y-2 text-sm text-text-secondary">
                    <li>• 소유권이 점진적으로 본인에게 이전 (완납 시 100% 본인)</li>
                    <li>• 초기 선납금(계약금 + 등록비) 필요</li>
                    <li>• 자동차세, 보험료, 정비비는 전부 본인 부담</li>
                    <li>• 할부 금리는 신용도와 캐피탈사마다 다름 (연 3~8%)</li>
                    <li>• 장기 보유하면 소유 자산이 되어 재산가치 있음</li>
                  </ul>
                </div>
                <p className="text-text-secondary leading-relaxed">
                  ⚠️ 다만 할부금융을 받을 때는 신용도와 소득 증빙이 필요하며, 신용등급이 낮으면 금리가
                  올라갈 수 있습니다.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="border-b border-border-base pb-2 text-2xl font-bold">
                  리스(운용리스)란 무엇인가요?
                </h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  리스는 리스사가 자동차를 구입한 후 차용인에게 일정 기간(보통 24~48개월) 동안 빌려주고
                  매월 리스료를 받는 방식입니다. 차의 소유권은 리스사가 유지하며, 만기 시 반납하거나
                  잔존가치를 기준으로 인수할 수 있습니다.
                </p>
                <div className="rounded-lg bg-bg-raised p-4">
                  <h3 className="mb-3 font-semibold text-text-primary">리스의 특징</h3>
                  <ul className="space-y-2 text-sm text-text-secondary">
                    <li>• 소유권은 리스사에 있음 (차용인은 이용권만 보유)</li>
                    <li>• 초기 비용이 적음 (선납금 최소)</li>
                    <li>
                      • 월 리스료에 자동차세, 보험료(기본), 정기점검비 일부가 포함
                    </li>
                    <li>• 주행거리 제한 있음 (월 1,000km, 초과 시 정산)</li>
                    <li>• 중도해지 시 위약금이 크므로 주의 필요</li>
                  </ul>
                </div>
                <p className="text-text-secondary leading-relaxed">
                  ⚠️ 다만 리스는 최종적으로 차를 소유하지 않으므로, 장기간 같은 자동차를 타야 한다면
                  누적 리스료가 할부보다 비쌀 수 있습니다.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="border-b border-border-base pb-2 text-2xl font-bold">
                  장기렌트란 무엇인가요?
                </h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  장기렌트는 렌터카 회사로부터 자동차를 일정 기간(보통 12~60개월) 동안 빌리는 방식입니다.
                  소유권은 렌트사가 유지하며, 월 렌트료에 자동차세, 보험, 정비가 포함되는 경우가 많습니다.
                  만기 시 차량을 반납하거나, 인수 옵션이 있으면 구입할 수 있습니다.
                </p>
                <div className="rounded-lg bg-bg-raised p-4">
                  <h3 className="mb-3 font-semibold text-text-primary">장기렌트의 특징</h3>
                  <ul className="space-y-2 text-sm text-text-secondary">
                    <li>• 소유권은 렌트사에 있음</li>
                    <li>
                      • 월 렌트료에 보험, 세금, 정기점검, 정비(경미) 포함 (세제상 가장 편함)
                    </li>
                    <li>• 초기 비용 적음</li>
                    <li>• 주행거리 제한 있음 (월 1,000~1,500km, 회사별 상이)</li>
                    <li>• 차량 손상 시 추가 비용 발생 가능</li>
                    <li>• 일반 번호판 선택 가능 (개인 차량처럼 보임)</li>
                  </ul>
                </div>
                <p className="text-text-secondary leading-relaxed">
                  ⚠️ 다만 장기렌트는 렌트사별로 약관과 포함 항목이 다르므로, 계약 전에 세부 서비스
                  내용을 확인해야 합니다.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="border-b border-border-base pb-2 text-2xl font-bold">
                  할부 월 납입액은 어떻게 계산되나요?
                </h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  할부의 월 상환액은 <strong>원리금균등</strong> 공식으로 계산됩니다. 이는 매월 동일한
                  금액을 내되, 초반에는 이자가 많고 나중에는 원금이 많이 포함되는 방식입니다.
                </p>
                <div className="rounded-lg bg-bg-raised p-4">
                  <p className="font-mono text-sm font-semibold text-text-primary">
                    월상환액 = P × r(1+r)^n / ((1+r)^n − 1)
                  </p>
                  <p className="mt-2 text-xs text-text-tertiary">
                    P = 할부금(차량가 − 선납금), r = 월이율(연이율 ÷ 12), n = 총 개월 수
                  </p>
                </div>
                <p className="text-text-secondary leading-relaxed">
                  <strong>실제 예시:</strong> 자동차 가격 3,000만 원 전액을 선납금 없이 할부금
                  3,000만 원, 60개월, 연 5.0% 금리로 납입하는 경우:
                </p>
                <table className="mt-3 w-full border-collapse text-sm">
                  <caption className="mb-2 text-left font-semibold text-text-primary">
                    할부 월 납입액 계산 예시
                  </caption>
                  <thead>
                    <tr className="border-b border-border-base">
                      <th scope="col" className="pb-2 pr-3 text-left font-semibold">
                        항목
                      </th>
                      <th scope="col" className="pb-2 text-left font-semibold">
                        금액
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-text-secondary">
                    <tr className="border-b border-border-base">
                      <td className="py-2 pr-3">할부금(원금)</td>
                      <td className="py-2">3,000만 원</td>
                    </tr>
                    <tr className="border-b border-border-base">
                      <td className="py-2 pr-3">월이율</td>
                      <td className="py-2">5.0% ÷ 12 ≈ 0.417%</td>
                    </tr>
                    <tr className="border-b border-border-base">
                      <td className="py-2 pr-3">상환 개월 수</td>
                      <td className="py-2">60개월</td>
                    </tr>
                    <tr className="border-b border-border-base">
                      <td className="py-2 pr-3 font-semibold">월 상환액</td>
                      <td className="py-2 font-semibold">약 56.6만 원</td>
                    </tr>
                    <tr className="border-b border-border-base">
                      <td className="py-2 pr-3">총 납입액</td>
                      <td className="py-2">약 3,397만 원</td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-3 font-semibold">총 이자</td>
                      <td className="py-2 font-semibold">약 397만 원</td>
                    </tr>
                  </tbody>
                </table>
                <p className="mt-4 text-text-secondary leading-relaxed">
                  위 예시에서 월 56.6만 원씩 60개월(5년) 동안 납입하면, 총 약 3,397만 원을 납입하게 되고
                  이 중 약 397만 원이 이자입니다. 할부 금리가 낮을수록, 상환 기간이 짧을수록 총 이자가
                  줄어듭니다.
                </p>
                <p className="text-text-secondary leading-relaxed">
                  ⚠️ 다만 실제 할부금리는 신용도, 캐피탈사, 시장 금리에 따라 3~8% 범위에서 결정되므로,
                  여러 금융기관의 상품을 비교해 가장 낮은 금리를 찾는 것이 중요합니다.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="border-b border-border-base pb-2 text-2xl font-bold">
                  월 납입료 구성 차이는 무엇인가요?
                </h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  할부, 리스, 장기렌트는 월 납입에 포함되는 항목이 각각 다릅니다. 이것이 실제 비용 비교에
                  큰 영향을 미칩니다.
                </p>
                <table className="mt-3 w-full border-collapse text-sm">
                  <caption className="mb-2 text-left font-semibold text-text-primary">
                    세 방식의 월 납입 구성 비교
                  </caption>
                  <thead>
                    <tr className="border-b border-border-base">
                      <th scope="col" className="pb-2 pr-3 text-left font-semibold">
                        비용 항목
                      </th>
                      <th scope="col" className="pb-2 pr-3 text-left font-semibold">
                        할부
                      </th>
                      <th scope="col" className="pb-2 pr-3 text-left font-semibold">
                        리스
                      </th>
                      <th scope="col" className="pb-2 text-left font-semibold">
                        장기렌트
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-text-secondary">
                    <tr className="border-b border-border-base">
                      <td className="py-2 pr-3">
                        <strong>원리금(차량가)</strong>
                      </td>
                      <td className="py-2 pr-3">○ (월 상환)</td>
                      <td className="py-2 pr-3">◑ (리스료에 포함)</td>
                      <td className="py-2">◑ (렌트료에 포함)</td>
                    </tr>
                    <tr className="border-b border-border-base">
                      <td className="py-2 pr-3">
                        <strong>금리·이자</strong>
                      </td>
                      <td className="py-2 pr-3">○ (월 상환)</td>
                      <td className="py-2 pr-3">◑ (포함)</td>
                      <td className="py-2">◑ (포함)</td>
                    </tr>
                    <tr className="border-b border-border-base">
                      <td className="py-2 pr-3">
                        <strong>자동차세</strong>
                      </td>
                      <td className="py-2 pr-3">× (본인 별도)</td>
                      <td className="py-2 pr-3">◑ (포함)</td>
                      <td className="py-2">◑ (포함)</td>
                    </tr>
                    <tr className="border-b border-border-base">
                      <td className="py-2 pr-3">
                        <strong>보험료</strong>
                      </td>
                      <td className="py-2 pr-3">× (본인 별도)</td>
                      <td className="py-2 pr-3">◑ (기본 포함)</td>
                      <td className="py-2">◑ (포함)</td>
                    </tr>
                    <tr className="border-b border-border-base">
                      <td className="py-2 pr-3">
                        <strong>정기점검·정비</strong>
                      </td>
                      <td className="py-2 pr-3">× (본인 별도)</td>
                      <td className="py-2 pr-3">◑ (일부 포함)</td>
                      <td className="py-2">◑ (기본 포함)</td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-3">
                        <strong>결론</strong>
                      </td>
                      <td className="py-2 pr-3">
                        월료 낮음 + 추가비용 多
                      </td>
                      <td className="py-2 pr-3">
                        중간 비용 체계
                      </td>
                      <td className="py-2">포괄적 비용</td>
                    </tr>
                  </tbody>
                </table>
                <p className="mt-4 text-text-secondary leading-relaxed">
                  할부는 월 납입이 가장 낮지만, 자동차세·보험·정비비를 모두 별도로 내야 합니다. 리스와
                  장기렌트는 월 납입에 다양한 항목이 포함되어 있어 비용 예측이 쉽지만, 누적하면 할부보다
                  비싸질 수 있습니다.
                </p>
                <p className="text-text-secondary leading-relaxed">
                  ⚠️ 다만 할부 시 자동차세(배기량별 상이, 지방교육세 30% 포함)와 보험료(연 수십만~백만 원대)는 별도이므로, 월
                  상환액에 더해 추가로 계산해야 정확한 월 부담액을 알 수 있습니다.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="border-b border-border-base pb-2 text-2xl font-bold">
                  사업자라면 어떤 방식이 유리한가요?
                </h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  사업자는 리스와 장기렌트가 세제상 가장 유리합니다. 리스료·렌트료를 비용으로 전액 처리할
                  수 있기 때문입니다. 반면 할부는 이자만 경비처리 가능하고, 차량 자체는 자산으로 계상되어
                  감가상각비를 별도로 계산해야 합니다.
                </p>
                <div className="rounded-lg bg-bg-raised p-4">
                  <h3 className="mb-3 font-semibold text-text-primary">사업자의 세제상 처리</h3>
                  <ul className="space-y-2 text-sm text-text-secondary">
                    <li>
                      <strong>할부:</strong> 이자만 경비처리 가능. 원금은 자산으로 계상하고 감가상각비
                      계산 필요. 회계가 복잡함.
                    </li>
                    <li>
                      <strong>리스:</strong> 월 리스료 전액을 비용으로 처리 가능. 가장 간편.
                    </li>
                    <li>
                      <strong>장기렌트:</strong> 월 렌트료 전액을 비용으로 처리 가능. 리스와 유사하게
                      간편함.
                    </li>
                  </ul>
                </div>
                <p className="text-text-secondary leading-relaxed">
                  다만 업무용 승용차는 비용처리에 제한이 있을 수 있으므로, 정확한 기준은 세무사와
                  상담하세요.
                </p>
                <p className="text-text-secondary leading-relaxed">
                  ⚠️ 실제 경비처리 범위는 업종, 매출 규모, 회계 기준, 국세청 판단에 따라 달라질 수
                  있으므로, 세무전문가의 조언을 받은 후 결정하는 것이 필수입니다.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="border-b border-border-base pb-2 text-2xl font-bold">
                  중도해지(해지, 반납)할 때는 어떻게 되나요?
                </h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  세 방식은 중도에 그만둘 때의 비용 부담이 크게 다릅니다. 할부는 비교적 자유롭지만,
                  리스와 장기렌트는 위약금이 크므로 주의해야 합니다.
                </p>
                <table className="mt-3 w-full border-collapse text-sm">
                  <caption className="mb-2 text-left font-semibold text-text-primary">
                    중도해지 시 비용 비교
                  </caption>
                  <thead>
                    <tr className="border-b border-border-base">
                      <th scope="col" className="pb-2 pr-3 text-left font-semibold">
                        항목
                      </th>
                      <th scope="col" className="pb-2 pr-3 text-left font-semibold">
                        할부
                      </th>
                      <th scope="col" className="pb-2 pr-3 text-left font-semibold">
                        리스
                      </th>
                      <th scope="col" className="pb-2 text-left font-semibold">
                        장기렌트
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-text-secondary">
                    <tr className="border-b border-border-base">
                      <td className="py-2 pr-3">
                        <strong>중도상환 가능성</strong>
                      </td>
                      <td className="py-2 pr-3">가능</td>
                      <td className="py-2 pr-3">제한적</td>
                      <td className="py-2">제한적</td>
                    </tr>
                    <tr className="border-b border-border-base">
                      <td className="py-2 pr-3">
                        <strong>위약금 여부</strong>
                      </td>
                      <td className="py-2 pr-3">미미 (사전 협의)</td>
                      <td className="py-2 pr-3">높음</td>
                      <td className="py-2">높음</td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-3">
                        <strong>권고</strong>
                      </td>
                      <td className="py-2 pr-3">
                        언제든 상환 가능
                      </td>
                      <td className="py-2 pr-3">
                        계약 기간 유지 권장
                      </td>
                      <td className="py-2">
                        계약 기간 유지 권장
                      </td>
                    </tr>
                  </tbody>
                </table>
                <p className="mt-4 text-text-secondary leading-relaxed">
                  <strong>할부:</strong> 중도 상환이 가능하고 수수료도 적습니다. 다만 캐피탈사마다 상환
                  방식이 다르므로 미리 약관을 확인해야 합니다.
                </p>
                <p className="text-text-secondary leading-relaxed">
                  <strong>리스/장기렌트:</strong> 약정 기간 전에 해지하면 위약금이 매우 높습니다. 예를
                  들어 48개월 약정 중 24개월 후 해지하면 남은 24개월의 50~100% 위약금을 내야 할 수
                  있습니다. 따라서 계약 시 예상 보유 기간을 신중하게 판단해야 합니다.
                </p>
                <p className="text-text-secondary leading-relaxed">
                  ⚠️ 다만 중도해지 위약금 계산은 계약서와 회사 정책에 따라 크게 다르므로, 계약 전에
                  구체적으로 문의해야 합니다.
                </p>
              </section>

              <AdSlot slot="guide-car-installment-vs-lease-vs-rent-2026-mid" format="rectangle" />

              <FaqSection items={FAQ_ITEMS} />

              <section className="card border-l-2 border-l-danger-500 bg-danger-500/5">
                <h2 className="mb-2 text-lg font-semibold text-danger-700 dark:text-danger-300">
                  ⚠️ 주의사항 및 면책조항
                </h2>
                <ul className="space-y-2 text-sm text-danger-700 dark:text-danger-300">
                  <li>
                    • 본 가이드는 일반 금융 정보 제공 목적이며, 특정 금융기관의 실제 상품 약관을
                    보장하지 않습니다.
                  </li>
                  <li>
                    • 할부금리, 리스료, 렌트료는 <strong>개인 신용도, 차종, 시장 조건</strong>에 따라
                    크게 변동되므로, 실제 계약 시점에 여러 금융기관의 견적을 비교해야 합니다.
                  </li>
                  <li>
                    • 월 납입액 예시는 이해를 돕기 위한 것이며, 실제 금리·기간·선납금·수수료에 따라
                    달라집니다.
                  </li>
                  <li>
                    • 사업자의 경비처리 기준은 업종, 소득 규모, 국세청 판단에 따라 다르므로, 세무사
                    상담 후 결정하세요.
                  </li>
                  <li>
                    • 중도해지, 위약금, 주행거리 초과료 등은 각 계약사의 약관을 반드시 확인하세요.
                  </li>
                  <li>
                    • 본 사이트는 금융상품 권유를 하지 않으며, 모든 자동차 구매 결정은 본인
                    책임입니다.
                  </li>
                </ul>
              </section>

              <section aria-label="관련 도구" className="card">
                <h2 className="mb-3 text-lg font-semibold">관련 계산기 및 가이드</h2>
                <ul className="space-y-2 text-sm">
                  <li>
                    →{' '}
                    <Link
                      href="/calculator/loan/"
                      className="text-primary-600 underline dark:text-primary-500"
                    >
                      대출이자 계산기
                    </Link>{' '}
                    — 원리금균등·만기일시별 월 상환액, 총이자, 상환일정표
                  </li>
                  <li>
                    →{' '}
                    <Link
                      href="/guide/prepayment-penalty-fee-2026/"
                      className="text-primary-600 underline dark:text-primary-500"
                    >
                      중도상환수수료 계산 2026
                    </Link>{' '}
                    — 할부 중도 상환 시 수수료 계산법
                  </li>
                  <li>
                    →{' '}
                    <Link
                      href="/guide/vehicle-acquisition-tax-2026/"
                      className="text-primary-600 underline dark:text-primary-500"
                    >
                      자동차 취득세 2026
                    </Link>{' '}
                    — 할부 차량 구입 시 취득세 계산
                  </li>
                  <li>
                    →{' '}
                    <Link
                      href="/guide/vehicle-tax-2026/"
                      className="text-primary-600 underline dark:text-primary-500"
                    >
                      자동차세 계산 2026
                    </Link>{' '}
                    — 할부 소유 차량의 연간 자동차세
                  </li>
                  <li>
                    →{' '}
                    <Link
                      href="/category/finance/"
                      className="text-primary-600 underline dark:text-primary-500"
                    >
                      금융 카테고리
                    </Link>{' '}
                    — 대출, 예금, 적금, 환율 관련 모든 계산기 및 가이드
                  </li>
                </ul>
              </section>

              <section
                aria-label="출처 및 면책"
                className="rounded-lg border border-border-base p-4 text-caption text-text-tertiary"
              >
                <p className="mb-2">
                  <strong>참고 자료</strong>:{' '}
                  <a
                    href="https://www.fss.or.kr/"
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="text-primary-600 underline dark:text-primary-500"
                  >
                    금융감독원
                  </a>
                  ,{' '}
                  <a
                    href="https://www.kca.go.kr/"
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="text-primary-600 underline dark:text-primary-500"
                  >
                    한국소비자원
                  </a>
                  ,{' '}
                  <a
                    href="https://www.crefia.or.kr/"
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="text-primary-600 underline dark:text-primary-500"
                  >
                    여신금융협회
                  </a>
                  .
                </p>
                <p>
                  <strong>업데이트</strong>: {DATE_MODIFIED}. AI 보조 작성 후 운영자 검수 완료.
                </p>
              </section>
            </article>
          </main>
        </div>
        <Footer />
      </div>
    </>
  );
}
