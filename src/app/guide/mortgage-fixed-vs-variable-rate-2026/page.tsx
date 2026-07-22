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

const URL = 'https://calculatorhost.com/guide/mortgage-fixed-vs-variable-rate-2026/';
const DATE_PUBLISHED = '2026-06-27';
const DATE_MODIFIED = '2026-06-27';

export const metadata: Metadata = {
  title: '주담대 고정 vs 변동금리 2026 | 뭐가 유리할까 가이드',
  description:
    '주택담보대출 고정금리, 변동금리, 혼합형의 특징을 비교합니다. 금리 결정 방식, 월부담, 이자 비용, 위험 요소, 상황별 선택 기준을 정리합니다.',
  keywords: [
    '주택담보대출 금리',
    '고정금리 변동금리',
    '금리 비교',
    'COFIX',
    '혼합형 금리',
    '주담대 선택',
    '금리 상승',
    '대출 금리',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [
      {
        url: '/og-default.png',
        width: 1200,
        height: 630,
        alt: '주담대 고정 vs 변동금리 2026 | 뭐가 유리할까 가이드',
      },
    ],
    title: '주담대 고정 vs 변동금리 2026',
    description: '고정금리, 변동금리, 혼합형의 특징과 선택 기준을 정리합니다.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '주담대 고정 vs 변동금리',
    description: '금리 유형별 특징과 선택 기준 비교',
  },
};

const FAQ_ITEMS = [
  {
    question: '고정금리와 변동금리, 어느 것이 더 유리한가요?',
    answer:
      '상황에 따라 다릅니다. 금리가 오를 것으로 예상되면 고정금리가 유리하고, 금리가 내릴 것으로 예상되면 변동금리가 유리합니다. 다만 미래 금리를 정확히 예측할 수 없으므로, 본인의 현금 흐름 안정성과 금리 변동에 대한 심리적 용인도를 종합적으로 고려해야 합니다.',
  },
  {
    question: '고정금리는 정말 5년, 10년 동안 변하지 않나요?',
    answer:
      '맞습니다. 약정한 고정기간(예: 5년) 동안은 금리가 변하지 않습니다. 다만 약정기간이 끝나면 재약정이 필요한데, 그때의 금리는 당시 시장 금리에 따라 재결정됩니다. 따라서 고정기간이 끝난 후에는 금리가 인상될 가능성이 있습니다.',
  },
  {
    question: 'COFIX는 뭐고, 기준금리와 뭐가 다른가요?',
    answer:
      'COFIX는 은행연합회가 공시하는 자금조달비용지수로, 은행들의 실제 대출 금리를 평균 계산한 지수입니다. 기준금리(중앙은행 기준금리)는 통화 정책의 중심 금리이고, COFIX는 은행들이 실제로 대출할 때 적용하는 금리에 더 가깝습니다. 변동금리는 대개 COFIX + 은행별 가산금리로 정해집니다.',
  },
  {
    question: '고정금리 대출이 변동금리보다 초기 금리가 높은 이유는?',
    answer:
      '은행의 입장에서 고정금리는 미래의 금리 변동 리스크를 떠안아야 하므로, 그 리스크에 대한 보상으로 초기 금리를 높입니다. 반면 변동금리는 금리 변동 리스크를 대출자가 떠안으므로, 초기 금리를 낮춥니다. 이것이 금리 선택의 핵심 트레이드오프입니다.',
  },
  {
    question: '혼합형(처음 고정 후 변동)은 어떨 때 추천하나요?',
    answer:
      '혼합형은 초기에 금리 인상 걱정을 덜면서도, 이후 금리가 내릴 가능성에 베팅하는 방식입니다. 예를 들어 금리 사이클이 정점에 가깝다고 판단될 때, 초기 3~5년은 고정금리로 안정성을 확보하고, 이후는 변동금리로 금리 인하 혜택을 누리는 전략입니다. 다만 전환 후 금리가 오르면 다시 고부담이 될 수 있습니다.',
  },
  {
    question: '대출 중도에 고정에서 변동으로 바꿀 수 있나요?',
    answer:
      '은행 정책에 따라 다릅니다. 일부 은행은 고정기간 만료 후 자동으로 변동금리로 전환하는 상품을 제공하고, 일부는 고정기간 중에 변경을 허용하지 않거나 중도상환수수료를 부과합니다. 정확한 조건은 대출 약관에서 확인하거나, 은행에 직접 문의하세요.',
  },
  {
    question: '최근 금리 추세를 보면 고정금리를 선택해야 하나요?',
    answer:
      '최근 금리 추세는 변할 수 있으므로, 뉴스나 전문가 전망만 참고하기보다는 본인의 재무 상황을 우선으로 생각하세요. 초기 월부담을 감당할 여유가 충분하고 금리 변동에 심리적으로 불안하다면 고정금리를, 초기 금리 절감이 중요하고 금리 인상을 받아들일 수 있다면 변동금리를 선택하는 것이 합리적입니다.',
  },
  {
    question: '대환(갈아타기) 시에 금리 유형을 바꿀 수 있나요?',
    answer:
      '네, 기존 대출을 상환하고 새로운 대출로 갈아탈 때 금리 유형을 변경할 수 있습니다. 예를 들어 변동금리로 시작했다가 금리 인상 우려로 고정금리로 갈아탈 수 있습니다. 다만 중도상환수수료와 새 대출의 취급수수료·인지대 등이 발생하므로, 절감 효과를 미리 계산해야 합니다.',
  },
];

export default function MortgageFixedVsVariableRate2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '주담대 고정 vs 변동금리 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '주담대 고정 vs 변동금리 2026 — 어떤 상황에 뭐가 유리할까',
    description:
      '주택담보대출의 고정금리, 변동금리, 혼합형 특징을 비교하고 선택 기준을 정리합니다. 금리 결정 방식, 월부담, 이자 비용, 리스크를 분석합니다.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['주택담보대출', '고정금리', '변동금리', 'COFIX', '금리 비교', '혼합형'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '주담대 고정 vs 변동금리 2026 | calculatorhost',
    description:
      '주택담보대출 금리 유형(고정, 변동, 혼합)의 특징, 월부담, 이자 비용, 리스크, 상황별 선택 기준을 정리합니다.',
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
                    { name: '주담대 고정 vs 변동금리 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">
                  금융 · 8분 읽기 · 2026-06-27
                </p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  주담대 고정 vs 변동금리 2026
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  주택담보대출을 신청할 때 가장 중요한 선택 중 하나는 금리 유형입니다. 고정금리는
                  약정기간 동안 금리가 변하지 않고, 변동금리는 시장 금리에 따라 함께 움직입니다.
                  두 유형은 초기 금리, 월부담, 이자 비용, 리스크가 크게 다릅니다. 본 가이드에서는
                  고정금리, 변동금리, 혼합형의 특징과 선택 기준을 정리하여, 본인의 재무 상황에
                  맞는 금리를 선택하는 데 도움을 드립니다.
                </p>
              </header>

              <AdSlot
                slot="guide-mortgage-fixed-vs-variable-rate-2026-top"
                format="horizontal"
              />

              <section aria-label="요약" className="card border-l-4 border-l-primary-500">
                <h2 className="mb-2 text-caption uppercase tracking-wider text-primary-500">
                  핵심 요약
                </h2>
                <table className="w-full border-collapse text-sm">
                  <caption className="mb-2 text-left font-semibold text-text-primary">
                    주택담보대출 금리 유형별 특징 비교 (상대적 기준)
                  </caption>
                  <thead>
                    <tr className="border-b border-border-base">
                      <th scope="col" className="pb-2 pr-3 text-left font-semibold">
                        구분
                      </th>
                      <th scope="col" className="pb-2 text-left font-semibold">
                        고정금리
                      </th>
                      <th scope="col" className="pb-2 text-left font-semibold">
                        변동금리
                      </th>
                      <th scope="col" className="pb-2 text-left font-semibold">
                        혼합형
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-text-secondary">
                    <tr className="border-b border-border-base">
                      <td className="py-2 pr-3">초기 금리 수준</td>
                      <td>높음</td>
                      <td>낮음</td>
                      <td>중간</td>
                    </tr>
                    <tr className="border-b border-border-base">
                      <td className="py-2 pr-3">금리 변동</td>
                      <td>없음 (약정기간 내)</td>
                      <td>매 기간마다 재산정</td>
                      <td>전환 후 변동</td>
                    </tr>
                    <tr className="border-b border-border-base">
                      <td className="py-2 pr-3">월부담 예측</td>
                      <td>완전 예측 가능</td>
                      <td>예측 불가</td>
                      <td>전환까지만 고정</td>
                    </tr>
                    <tr className="border-b border-border-base">
                      <td className="py-2 pr-3">금리 상승기 유리도</td>
                      <td>유리</td>
                      <td>불리</td>
                      <td>초기만 유리</td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-3">금리 하락기 유리도</td>
                      <td>불리</td>
                      <td>유리</td>
                      <td>후기만 유리</td>
                    </tr>
                  </tbody>
                </table>
              </section>

              <section className="space-y-4">
                <h2 className="border-l-3 border-l-primary-500 pl-3 text-2xl font-bold">
                  고정금리와 변동금리, 어떻게 다른가요?
                </h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  주택담보대출의 금리 유형은 대출 기간 동안 금리가 변하는 방식에 따라 구분됩니다.
                  고정금리와 변동금리는 금리 결정 방식, 월부담, 총이자 비용이 크게 다릅니다.
                </p>

                <div className="rounded-lg bg-bg-raised p-4">
                  <h3 className="mb-3 font-semibold text-text-primary">
                    ① 고정금리 (Fixed Rate)
                  </h3>
                  <p className="mb-2 text-sm text-text-secondary">
                    약정한 기간(보통 3년, 5년, 10년) 동안 금리가 변하지 않습니다.
                  </p>
                  <ul className="space-y-2 text-sm text-text-secondary">
                    <li>
                      • <strong>금리 결정</strong>: 대출 실행 시점의 시장 금리로 고정
                    </li>
                    <li>
                      • <strong>월부담</strong>: 약정기간 내 완전히 동일 (원리금균등 기준)
                    </li>
                    <li>
                      • <strong>재약정</strong>: 고정기간 만료 후 재약정 필요 (당시 시장 금리 적용)
                    </li>
                    <li>
                      • <strong>특징</strong>: 초기 금리가 변동금리보다 높음 (리스크 보상)
                    </li>
                  </ul>
                </div>

                <div className="rounded-lg bg-bg-raised p-4">
                  <h3 className="mb-3 font-semibold text-text-primary">
                    ② 변동금리 (Variable Rate)
                  </h3>
                  <p className="mb-2 text-sm text-text-secondary">
                    시장 기준지수(COFIX 등) + 은행별 가산금리로 결정되며, 6개월 또는 12개월 주기로
                    재산정됩니다.
                  </p>
                  <ul className="space-y-2 text-sm text-text-secondary">
                    <li>
                      • <strong>금리 결정</strong>: COFIX(은행연합회 자금조달비용지수) + 가산금리
                    </li>
                    <li>
                      • <strong>재산정 주기</strong>: 보통 6개월 또는 12개월마다 변경
                    </li>
                    <li>
                      • <strong>월부담</strong>: 재산정 시점마다 변할 수 있음
                    </li>
                    <li>
                      • <strong>특징</strong>: 초기 금리가 낮음 (리스크를 대출자가 지면)
                    </li>
                  </ul>
                </div>

                <div className="rounded-lg bg-bg-raised p-4">
                  <h3 className="mb-3 font-semibold text-text-primary">③ 혼합형 (Hybrid)</h3>
                  <p className="mb-2 text-sm text-text-secondary">
                    초기 일정 기간(보통 3~5년)은 고정금리로 적용되고, 그 이후로는 변동금리로
                    전환됩니다.
                  </p>
                  <ul className="space-y-2 text-sm text-text-secondary">
                    <li>
                      • <strong>초기 기간</strong>: 고정금리 적용 (예: 처음 5년)
                    </li>
                    <li>
                      • <strong>전환 후</strong>: 당시 시장 기준지수 + 가산금리로 변동금리 적용
                    </li>
                    <li>
                      • <strong>초기 금리</strong>: 순수 고정금리보다 낮고, 변동금리보다 높음
                    </li>
                    <li>
                      • <strong>특징</strong>: 초기 안정성과 이후 금리 인하 혜택을 모두 추구
                    </li>
                  </ul>
                </div>

                <p className="text-text-secondary leading-relaxed">
                  다만 모든 은행이 세 가지 유형을 다 제공하지는 않습니다. 은행과 상품에 따라
                  선택지가 제한될 수 있으므로, 가입 전 반드시 상품 약관과 금리 유형을 확인하세요.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="border-l-3 border-l-primary-500 pl-3 text-2xl font-bold">
                  초기 금리는 왜 고정이 변동보다 높을까요?
                </h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  고정금리의 초기 금리가 변동금리보다 높은 이유는, 은행과 대출자 사이의 리스크
                  분담 방식이 다르기 때문입니다.
                </p>

                <div className="rounded-lg bg-bg-raised p-4">
                  <h3 className="mb-3 font-semibold text-text-primary">은행의 입장</h3>
                  <p className="mb-2 text-sm text-text-secondary">
                    고정금리 대출을 하면, 은행은 향후 금리 변동에 따른 손실 리스크를 떠안아야
                    합니다.
                  </p>
                  <ul className="space-y-2 text-sm text-text-secondary">
                    <li>
                      예: 은행이 3%로 고정금리 대출을 해주었는데, 시장 금리가 5%로 올라가면, 은행은
                      그 손실(2%p)을 감수해야 함
                    </li>
                    <li>
                      따라서 은행은 이 리스크 보상으로 고정금리를 높게 책정
                    </li>
                  </ul>
                </div>

                <div className="rounded-lg bg-bg-raised p-4">
                  <h3 className="mb-3 font-semibold text-text-primary">대출자의 입장</h3>
                  <p className="mb-2 text-sm text-text-secondary">
                    변동금리를 선택하면, 대출자는 금리 변동 리스크를 직접 떠안습니다.
                  </p>
                  <ul className="space-y-2 text-sm text-text-secondary">
                    <li>
                      예: 시장 금리가 올라가면 내 월부담도 올라감. 은행은 리스크가 없으므로 초기
                      금리를 낮춤
                    </li>
                    <li>
                      따라서 변동금리는 초기에 저금리 대출이 가능
                    </li>
                  </ul>
                </div>

                <p className="text-text-secondary leading-relaxed">
                  이것이 금리 유형 선택의 핵심 트레이드오프입니다. 초기 금리 절감을 원하면 변동금리를
                  선택하되 리스크를 감수해야 하고, 안정성을 원하면 고정금리를 선택하되 높은 초기
                  금리를 감수해야 합니다.
                </p>

                <p className="text-text-secondary leading-relaxed">
                  다만 고정금리가 항상 변동금리보다 높은 것은 아닙니다. 금리 상황과 시장 전망에
                  따라 역전될 수도 있으니, 현재 은행의 공시 금리를 직접 비교하는 것이 가장 정확합니다.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="border-l-3 border-l-primary-500 pl-3 text-2xl font-bold">
                  금리가 오를 때와 내릴 때 유리한 쪽은?
                </h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  금리 방향성이 명확할수록 최적의 선택이 분명해집니다. 다만 미래 금리를 정확히
                  예측할 수 없다는 점이 문제입니다.
                </p>

                <div className="rounded-lg bg-bg-raised p-4">
                  <h3 className="mb-3 font-semibold text-text-primary">
                    금리가 올라갈 때 (시나리오)
                  </h3>
                  <ul className="space-y-2 text-sm text-text-secondary">
                    <li>
                      • <strong>고정금리의 이점</strong>: 약정기간 내 금리가 올라도 영향 없음. 초기
                      금리로 계속 상환
                    </li>
                    <li>
                      • <strong>변동금리의 불리함</strong>: 시장 금리 인상과 함께 내 월부담도
                      증가. 통상 6~12개월마다 재산정되므로, 금리 인상이 곧 월부담 증가로 이어짐
                    </li>
                    <li>
                      예: 초기 3%의 변동금리가 6개월 후 4%로 인상되면, 남은 대출금에 대해 이자가
                      1%p 더 올라가는 것
                    </li>
                  </ul>
                </div>

                <div className="rounded-lg bg-bg-raised p-4">
                  <h3 className="mb-3 font-semibold text-text-primary">금리가 내려갈 때 (시나리오)</h3>
                  <ul className="space-y-2 text-sm text-text-secondary">
                    <li>
                      • <strong>고정금리의 불리함</strong>: 약정기간 내 외부 금리가 내려도 내 금리는
                      그대로. 상대적으로 손해본 느낌
                    </li>
                    <li>
                      • <strong>변동금리의 이점</strong>: 시장 금리 인하와 함께 내 월부담이 감소.
                      곧바로 혜택
                    </li>
                    <li>
                      예: 초기 3% 변동금리가 6개월 후 2.5%로 인하되면, 더 낮은 금리로 상환
                    </li>
                    <li>
                      다만 일부 은행은 변동금리에 '최저금리' 약정을 설정할 수 있으므로, 계약 조건 확인
                      필수
                    </li>
                  </ul>
                </div>

                <p className="text-text-secondary leading-relaxed">
                  <strong>현실의 딜레마</strong>: 금리가 앞으로 어떻게 변할지 완벽히 아는 사람은
                  없습니다. 전문가도 예측이 틀릴 수 있습니다. 따라서 뉴스나 전망만 믿기보다는,
                  본인이 월부담 변동에 얼마나 견딜 수 있는지(금융 여유)와 심리적으로 얼마나 불안한지
                  (심리 안정성)를 먼저 고려해야 합니다.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="border-l-3 border-l-primary-500 pl-3 text-2xl font-bold">
                  혼합형 금리는 어떤 전략인가요?
                </h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  혼합형(처음 3~5년 고정 후 변동)은 초기 안정성과 이후 금리 인하 혜택을 동시에 노리는
                  전략입니다. 상황에 따라 현명한 선택이 될 수 있습니다.
                </p>

                <h3 className="mb-2 font-semibold text-text-primary">혼합형 선택이 유리한 경우</h3>
                <ul className="space-y-2 text-sm text-text-secondary">
                  <li>
                    • 현재 금리 사이클이 고점에 가깝다고 판단될 때 (앞으로 금리가 내릴 가능성 높음)
                  </li>
                  <li>
                    • 초기 3~5년은 월부담을 안정적으로 예측하고 싶지만, 이후는 금리 인하 혜택을
                    원할 때
                  </li>
                  <li>
                    • 대출 초반 월부담이 가장 부담스러운 시기를 고정금리로 커버하고 싶을 때
                  </li>
                  <li>
                    • 소득이 시간이 지날수록 증가할 것으로 예상되어, 초기는 부담을 낮추고 싶을 때
                  </li>
                </ul>

                <h3 className="mb-2 font-semibold text-text-primary">혼합형 선택이 불리한 경우</h3>
                <ul className="space-y-2 text-sm text-text-secondary">
                  <li>
                    • 금리가 계속 오를 것으로 예상될 때 (전환 후 변동금리가 더 비싸짐)
                  </li>
                  <li>
                    • 고정기간과 변동기간 모두의 단점을 어느 정도 받아들여야 함
                  </li>
                </ul>

                <p className="text-text-secondary leading-relaxed">
                  예: 혼합형(5년 고정) 대출을 받았다면, 처음 5년은 고정금리로 안정적으로 상환하지만,
                  6년째부터는 전환 시점의 시장 금리에 따라 새로운 변동금리로 재산정됩니다. 만약 그때
                  금리가 초기보다 높다면, 다시 월부담이 올라갑니다.
                </p>

                <p className="text-text-secondary leading-relaxed">
                  주의: 혼합형도 은행마다 제공 여부와 조건이 다릅니다. 전환 후 다시 고정금리로 바꿀 수
                  있는지, 전환 수수료는 있는지 등을 미리 확인하세요.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="border-l-3 border-l-primary-500 pl-3 text-2xl font-bold">
                  COFIX가 뭐고, 기준금리와 뭐가 다른가요?
                </h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  변동금리 대출을 고려할 때 COFIX를 이해하는 것이 중요합니다. COFIX는 실제 은행 대출의
                  기준이 되는 지수이기 때문입니다.
                </p>

                <div className="rounded-lg bg-bg-raised p-4">
                  <h3 className="mb-3 font-semibold text-text-primary">기준금리 (정책금리)</h3>
                  <p className="mb-2 text-sm text-text-secondary">
                    한국은행(중앙은행)이 통화 정책 목표에 따라 정하는 금리입니다.
                  </p>
                  <ul className="space-y-2 text-sm text-text-secondary">
                    <li>• 역할: 경제 전체의 통화량 조절과 인플레이션 관리</li>
                    <li>• 결정 주체: 한국은행 금융통화위원회 (보통 월 1회 결정)</li>
                    <li>• 영향: 시장 금리 전반에 영향을 미치는 최상위 기준</li>
                  </ul>
                </div>

                <div className="rounded-lg bg-bg-raised p-4">
                  <h3 className="mb-3 font-semibold text-text-primary">
                    COFIX (자금조달비용지수)
                  </h3>
                  <p className="mb-2 text-sm text-text-secondary">
                    은행연합회가 공시하는 지수로, 실제 은행들이 돈을 조달할 때 드는 평균 비용입니다.
                  </p>
                  <ul className="space-y-2 text-sm text-text-secondary">
                    <li>
                      • 구성: 전국 은행들의 실제 대출 금리를 평균 계산한 지수
                    </li>
                    <li>
                      • 용도: 변동금리 대출의 기준 금리로 활용 (COFIX + 가산금리)
                    </li>
                    <li>
                      • 갱신 주기: 보통 월 1회 또는 월 2회 공시
                    </li>
                    <li>
                      • 특징: 기준금리보다 더 현실적인 시장 금리를 반영
                    </li>
                  </ul>
                </div>

                <p className="text-text-secondary leading-relaxed">
                  <strong>비유하자면</strong>, 기준금리는 "정부의 통화 정책 방향"이고, COFIX는 "실제
                  은행들이 고객에게 대출해주는 평균 금리"입니다. 변동금리 대출을 받으면, 보통 COFIX의
                  변동에 따라 내 금리도 함께 움직이게 됩니다.
                </p>

                <p className="text-text-secondary leading-relaxed">
                  주의: 기준금리와 COFIX는 항상 함께 움직이지만, 정확히 같은 폭으로 변하지는 않을 수
                  있습니다. 기준금리가 0.5%p 올라도 COFIX는 그보다 덜 올라갈 수 있으므로, 정기적으로
                  COFIX 추이를 확인하는 것이 좋습니다.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="border-l-3 border-l-primary-500 pl-3 text-2xl font-bold">
                  상황별 금리 유형 선택 가이드
                </h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  최적의 금리 유형은 개인의 재무 상황, 현금 흐름, 심리 안정성에 따라 다릅니다.
                </p>

                <h3 className="mb-2 font-semibold text-text-primary">고정금리를 추천하는 경우</h3>
                <ul className="space-y-2 text-sm text-text-secondary">
                  <li>
                    • <strong>월급이 일정</strong>하고 예측 가능한 월부담을 원할 때
                  </li>
                  <li>
                    • 금리 변동에 대한 <strong>심리적 불안</strong>이 큰 편일 때
                  </li>
                  <li>
                    • 금리가 <strong>이미 많이 내려온 상황</strong>에서 더 내려갈 여지가 적을 때
                  </li>
                  <li>
                    • 향후 소득 증가가 <strong>불확실</strong>해서 지금의 월부담을 유지하는 것이
                    중요할 때
                  </li>
                  <li>
                    • 대출 <strong>초반의 월부담이 가장 부담스러운 시기</strong>를 안정적으로 넘기고
                    싶을 때
                  </li>
                </ul>

                <h3 className="mb-2 font-semibold text-text-primary">변동금리를 추천하는 경우</h3>
                <ul className="space-y-2 text-sm text-text-secondary">
                  <li>
                    • 초기 <strong>낮은 금리로 월부담을 절감</strong>하는 것이 중요할 때
                  </li>
                  <li>
                    • 금리 변동에 <strong>심리적으로 비교적 안정적</strong>일 때
                  </li>
                  <li>
                    • 향후 <strong>소득이 증가할 것으로 예상</strong>되어, 초기 부담을 낮추고 싶을
                    때
                  </li>
                  <li>
                    • 금리 사이클이 <strong>고점에 가까워</strong> 앞으로 내려갈 가능성이 높을 때
                  </li>
                  <li>
                    • <strong>중도상환 계획</strong>이 있어, 초기 금리 절감 효과를 최대한 누리고
                    싶을 때
                  </li>
                </ul>

                <h3 className="mb-2 font-semibold text-text-primary">혼합형을 추천하는 경우</h3>
                <ul className="space-y-2 text-sm text-text-secondary">
                  <li>
                    • 초기 안정성과 이후 금리 인하 혜택을 <strong>모두 원할 때</strong>
                  </li>
                  <li>
                    • 현재 금리 사이클이 <strong>고점에 가깝다고 판단</strong>될 때
                  </li>
                  <li>
                    • 초기 3~5년은 월부담 예측이 중요하지만, 이후는 유연하게 대응하고 싶을 때
                  </li>
                </ul>

                <p className="text-text-secondary leading-relaxed">
                  주의: 금리 선택은 은행 상담사와 함께 검토하는 것이 가장 좋습니다. 본인의 재무 상황,
                  대출 상품의 특징(조기상환 수수료, 재약정 조건 등), 시장 전망을 종합적으로 고려하여
                  결정하세요.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="border-l-3 border-l-primary-500 pl-3 text-2xl font-bold">
                  대출 중도에 금리 유형을 바꿀 수 있나요?
                </h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  금리 유형을 바꾸는 방법은 두 가지입니다. 상황과 은행 정책에 따라 선택할 수 있습니다.
                </p>

                <h3 className="mb-2 font-semibold text-text-primary">① 고정기간 만료 시 자동 또는 신청 재약정</h3>
                <p className="mb-2 text-sm text-text-secondary">
                  혼합형이나 기간 제한 고정금리의 경우, 고정기간이 끝나면 은행에서 새로운 금리를 제시합니다.
                </p>
                <ul className="space-y-2 text-sm text-text-secondary">
                  <li>• 보통 고정 만료 30~60일 전에 은행에서 연락</li>
                  <li>• 당시 시장 금리가 재약정 금리로 적용됨</li>
                  <li>
                    • 다시 고정금리로 선택하거나, 변동금리로 전환 선택 가능 (은행 상품별로 다름)
                  </li>
                  <li>• 수수료는 보통 없음</li>
                </ul>

                <h3 className="mb-2 font-semibold text-text-primary">② 대환 (새 대출로 갈아타기)</h3>
                <p className="mb-2 text-sm text-text-secondary">
                  기존 대출을 완전히 상환하고 새로운 대출(다른 금리 유형)로 갈아타는 방식입니다.
                </p>
                <ul className="space-y-2 text-sm text-text-secondary">
                  <li>• 예: 변동금리에서 고정금리로 변경 가능</li>
                  <li>
                    • 발생 비용: 기존 대출 중도상환수수료 + 새 대출 취급수수료 + 인지대 등
                  </li>
                  <li>• 절감 효과를 정확히 계산해야 함</li>
                  <li>
                    • 다른 은행의 더 좋은 상품으로도 갈아탈 수 있는 장점
                  </li>
                </ul>

                <p className="text-text-secondary leading-relaxed">
                  예를 들어, 변동금리로 시작했는데 금리가 계속 오르자 중도에 고정금리로 바꾸고 싶다면,
                  대환을 검토할 수 있습니다. 다만 중도상환수수료와 새 대출 수수료를 합쳐도 절감 효과가
                  있는지 먼저 계산해야 합니다.
                </p>

                <p className="text-text-secondary leading-relaxed">
                  주의: 대환은 신용도, 현재 대출금 잔액, 부동산 가치 변동 등 여러 요소에 따라 승인 여부가
                  결정됩니다. 은행에 미리 상담을 받아보는 것이 좋습니다.
                </p>
              </section>

              <AdSlot
                slot="guide-mortgage-fixed-vs-variable-rate-2026-mid"
                format="rectangle"
              />

              <FaqSection items={FAQ_ITEMS} />

              <section className="card border-l-2 border-l-danger-500 bg-danger-500/5">
                <h2 className="mb-2 text-lg font-semibold text-danger-700 dark:text-danger-300">
                  주의사항 및 면책조항
                </h2>
                <ul className="space-y-2 text-sm text-danger-700 dark:text-danger-300">
                  <li>
                    • 본 가이드는 일반 금융 정보 제공 목적이며, 특정 은행·상품의 정확한 금리나
                    조건을 보장하지 않습니다.
                  </li>
                  <li>
                    • COFIX, 기준금리, 금리 전망은 시시각각 변하므로, 정확한 정보는 은행 공시 자료나
                    한국은행 공식 발표를 확인하세요.
                  </li>
                  <li>
                    • 금리 유형별 장단점은 상대적이며, 실제 대출 결과는 개인의 신용도, 대출 상품,
                    약정 조건에 따라 다를 수 있습니다.
                  </li>
                  <li>
                    • 대환 검토 시 중도상환수수료, 취급수수료, 인지대 등 모든 비용을 정확히 계산한
                    후 결정하세요.
                  </li>
                  <li>
                    • 본 사이트는 금융상품 권유를 하지 않으며, 모든 대출 결정은 본인의 책임입니다.
                    은행 상담사와 충분한 상담 후 결정하세요.
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
                    — 금리, 기간, 상환방식을 입력하여 월 상환액과 총이자 계산
                  </li>
                  <li>
                    →{' '}
                    <Link
                      href="/calculator/loan-limit/"
                      className="text-primary-600 underline dark:text-primary-500"
                    >
                      대출한도 계산기 (DSR/LTV)
                    </Link>{' '}
                    — 주택담보대출 최대 한도를 DSR, LTV 기준으로 확인
                  </li>
                  <li>
                    →{' '}
                    <Link
                      href="/guide/equal-payment-vs-equal-principal-2026/"
                      className="text-primary-600 underline dark:text-primary-500"
                    >
                      원리금균등 vs 원금균등 2026
                    </Link>{' '}
                    — 상환 방식에 따른 월부담과 총이자 비교
                  </li>
                  <li>
                    →{' '}
                    <Link
                      href="/guide/prepayment-penalty-fee-2026/"
                      className="text-primary-600 underline dark:text-primary-500"
                    >
                      중도상환수수료 계산 및 면제 조건 2026
                    </Link>{' '}
                    — 대환 또는 조기상환 시 발생하는 수수료 정보
                  </li>
                  <li>
                    →{' '}
                    <Link
                      href="/guide/ltv-calculation-2026/"
                      className="text-primary-600 underline dark:text-primary-500"
                    >
                      LTV 계산기 및 대출 한도
                    </Link>{' '}
                    — 주택 가격과 대출액 비율로 한도 확인
                  </li>
                  <li>
                    →{' '}
                    <Link
                      href="/category/finance/"
                      className="text-primary-600 underline dark:text-primary-500"
                    >
                      금융 카테고리
                    </Link>{' '}
                    — 대출, 예금, 적금, 환율 관련 모든 계산기와 가이드
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
                    href="https://www.bok.or.kr/"
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="text-primary-600 underline dark:text-primary-500"
                  >
                    한국은행 공식 사이트
                  </a>
                  ,{' '}
                  <a
                    href="https://www.kfb.or.kr/"
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="text-primary-600 underline dark:text-primary-500"
                  >
                    은행연합회 COFIX 공시
                  </a>
                  ,{' '}
                  <a
                    href="https://finlife.fss.or.kr/"
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="text-primary-600 underline dark:text-primary-500"
                  >
                    금융감독원 핀라이프
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
