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

const URL = 'https://calculatorhost.com/guide/income-tax-late-filing-penalty-2026/';
const DATE_PUBLISHED = '2026-05-20';
const DATE_MODIFIED = '2026-09-30';

export const metadata: Metadata = {
  title: '종합소득세 가산세 2026 무신고·지연 계산 | calculatorhost',
  description:
    '신고기한을 놓쳤을 때 종합소득세 무신고가산세 20% + 납부지연가산세 일 0.022% 계산 방법·자진신고 감면 50·30·20% 타이밍·부정행위 40% 중과·공식 계산기 제공.',
  keywords: [
    '종합소득세 가산세',
    '무신고가산세 20%',
    '납부지연가산세 0.022%',
    '자진신고 감면',
    '부정행위 40%',
    '5월 31일 종소세 마감',
    '종소세 기한후신고 환급',
    '국세기본법 47조의2',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [
      {
        url: '/og-default.png',
        width: 1200,
        height: 630,
        alt: '종합소득세 가산세 2026 무신고·지연 계산 | calculatorhost',
      },
    ],
    title: '종합소득세 가산세 2026 무신고·지연 정확 계산',
    description:
      '무신고납부세액 500만 → 무신고가산세 100만? 기한후신고와 환급 절차는? 자진신고 감면 기한 정리.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '종합소득세 무신고·지연 가산세 실시간 계산',
    description: '기한후신고와 가산세 얼마? 자진신고 감면은?',
  },
};

const FAQ_ITEMS = [
  {
    question: '종합소득세 신고를 놓치면 가산세가 얼마나 되나요?',
    answer:
      '일반 무신고가산세는 무신고납부세액의 20%입니다(국세기본법 §47의2). 예를 들어 해당 세액이 500만 원이면 100만 원입니다. 부정행위·복식부기의무자 등은 적용 기준이 다를 수 있고 납부지연가산세는 별도로 계산합니다.',
  },
  {
    question: '기한후신고하면 무신고가산세가 얼마나 줄어드나요?',
    answer:
      '국세기본법 §48에 따라 법정신고기한 후 1개월 이내 50%, 1개월 초과 3개월 이내 30%, 3개월 초과 6개월 이내 20% 감면합니다. 세무서의 결정을 미리 알고 신고한 경우 등은 제외됩니다. 감면 전 100만 원이라면 각각 50만·70만·80만 원이며, 수정신고의 감면율과는 다릅니다.',
  },
  {
    question: '2026년 일반 종합소득세 신고기한은 언제인가요?',
    answer:
      '5월 31일이 일요일이므로 국세기본법 §5의 휴일 특례에 따라 일반 신고기한은 2026년 6월 1일입니다. 성실신고확인 대상자나 개별 기한 연장 대상자는 별도 기한을 확인하세요.',
  },
  {
    question: '소득이 작으면 가산세가 없나요?',
    answer:
      '수입금액에 세율을 바로 곱해 가산세를 판단할 수 없습니다. 필요경비·공제·기납부세액 등을 반영한 세액과 신고의무를 먼저 확인해야 합니다. 적용 예외와 최소 기준은 신고 유형에 따라 다를 수 있습니다.',
  },
  {
    question: '환급 대상인데 신고기한을 놓치면 영구히 환급받을 수 없나요?',
    answer:
      '신고기한을 하루 넘겼다는 이유만으로 환급 권리가 모두 사라지는 것은 아닙니다. 국세기본법 §45의3의 기한후신고나 국세기본법 §45의2의 경정청구를 검토할 수 있습니다. 세무서 결정 여부, 신고 이력, 청구 기한 등에 따라 절차가 다르므로 홈택스·관할 세무서에 확인하세요.',
  },
  {
    question: '부정행위 가산세는 단순 신고 누락과 같은가요?',
    answer:
      '부정행위 해당 여부는 거짓 증빙, 장부 조작 등 구체적인 사실관계와 법적 요건에 따라 판단합니다. 단순 누락이나 지연만으로 형사처벌을 단정할 수 없습니다.',
  },
  {
    question: '신고를 하면 납부도 자동으로 연장되나요?',
    answer:
      '신고와 납부는 별개입니다. 기한후신고 감면이 가능하더라도 납부지연가산세가 면제되거나 납부기한이 자동 연장되는 것은 아닙니다. 납부할 세액과 적용 기한을 함께 확인하세요.',
  },
];

export default function IncomeTaxLateFilingPenalty2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '종합소득세 무신고·지연 가산세 가이드' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '종합소득세 무신고·지연 가산세 2026 정확 계산',
    description:
      '무신고납부세액 500만 → 무신고가산세 100만 계산 + 자진신고 감면 50·30·20% 타이밍 + 부정행위 40% 중과 + 신고 이력에 따른 환급 절차 안내.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['종합소득세 가산세', '무신고 가산세', '납부지연가산세', '자진신고 감면', '5월 신고'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '종합소득세 무신고·지연 가산세 정확 계산 2026',
    description:
      '법정신고기한 경과 후 종합소득세 무신고가산세 20%/부정행위 40% + 납부지연가산세 일 0.022% 정확 계산 + 자진신고 감면 50·30·20% 타이밍 + 기한후신고와 환급 절차의 조건 안내.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
  });
  const faqLd = buildFaqPageJsonLd([...FAQ_ITEMS]);
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
                    { name: '종합소득세 무신고·지연 가산세' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">세금 · 9분 읽기 · 2026-05-20</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  종합소득세 무신고·지연 가산세 2026
                  <br />
                  <span className="text-2xl text-text-secondary">
                    · 기한후신고 감면과 환급 절차
                  </span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  종합소득세 법정신고기한을 놓쳤다면 가산세가 얼마나 되는지, 지금이라도 신고하면
                  얼마나 깎일 수 있는지 알아야 합니다.
                  <strong>
                    무신고가산세 20% + 납부지연가산세 일 0.022% + 부정행위 시 40% 중과
                  </strong>
                  . 다만
                  <strong> 지금 신고해도 자진신고 감면(50·30·20%)이 적용</strong>되어 큰 손실을 막을
                  수 있습니다. 정확한 계산과 타이밍을 이 페이지 한 장으로 정리합니다.
                </p>
              </header>

              {/* 핵심 요약 */}
              <section aria-label="핵심 요약" className="card border-l-4 border-l-danger-500">
                <h2 className="text-danger-700 dark:text-danger-300 mb-4 text-2xl font-bold">
                  핵심 정리
                </h2>
                <div className="mb-4 overflow-x-auto">
                  <table className="w-full text-sm" data-speakable>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th className="px-3 py-2 text-left">가산세 유형</th>
                        <th className="px-3 py-2 text-left">발생 기준</th>
                        <th className="px-3 py-2 text-left">세율</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="px-3 py-2 font-semibold">무신고가산세</td>
                        <td className="px-3 py-2">
                          법정신고기한 경과 후 미신고 (국세기본법 §47의2)
                        </td>
                        <td className="px-3 py-2 text-right">20%</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="px-3 py-2 font-semibold">부정행위 중과</td>
                        <td className="px-3 py-2">의도적 소득 은폐 (영수증 조작 등)</td>
                        <td className="px-3 py-2 text-right">40%</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="px-3 py-2 font-semibold">납부지연가산세</td>
                        <td className="px-3 py-2">납부 기한 경과 (일단위)</td>
                        <td className="px-3 py-2 text-right">일 0.022%</td>
                      </tr>
                      <tr>
                        <td className="px-3 py-2 font-semibold">자진신고 감면</td>
                        <td className="px-3 py-2">법정신고기한 후 1개월 이내 신고</td>
                        <td className="px-3 py-2 text-right">−50%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="text-danger-700 dark:text-danger-300 rounded-lg bg-danger-500/10 p-4 text-sm">
                  <p className="font-semibold">TL;DR</p>
                  <ul className="mt-2 list-inside list-disc space-y-1">
                    <li>
                      <strong>적용 신고기한 내 신고하면</strong> 무신고가산세 0 (다만 세금 납부 지연
                      시 지연가산세는 붙음)
                    </li>
                    <li>
                      <strong>법정신고기한 후 1개월 이내 신고하면</strong> 무신고가산세 50% 감면
                      (예: 무신고납부세액 500만 → 가산세 100만 원에서 50만 원으로 감면)
                    </li>
                    <li>
                      <strong>환급은 신고 이력별 절차 확인</strong>: 기한후신고·경정청구 가능 여부와
                      청구 기한 확인
                    </li>
                  </ul>
                </div>
              </section>

              {/* 1. 무신고가산세 정의 및 계산 */}
              <section className="space-y-4">
                <h2 className="text-2xl font-bold">1. 무신고가산세 20%, 정의 및 계산</h2>
                <p className="leading-relaxed text-text-secondary" data-speakable>
                  무신고가산세는 적용되는 종합소득세 법정신고기한까지 신고하지 않은 경우,
                  무신고납부세액에 20%를 붙이는 제재금입니다 (국세기본법 §47의2). 단순히 몇 개월
                  늦은 것이 아니라 신고 자체를 하지 않았을 때 적용됩니다.
                </p>

                <div className="rounded-lg bg-bg-card p-4">
                  <p className="mb-3 font-semibold text-text-primary">무신고가산세 계산 공식</p>
                  <div className="text-sm text-text-secondary">
                    <p className="mb-2">
                      <strong>무신고가산세 = 무신고납부세액 × 20%</strong>
                    </p>
                    <p className="text-xs italic text-text-tertiary">
                      (부정행위 시 40%, 자진신고 시 감면)
                    </p>
                  </div>
                </div>

                <div className="rounded-lg bg-bg-raised p-4 text-sm text-text-secondary">
                  <p className="font-semibold text-text-primary">일반 무신고가산세의 단순 예시</p>
                  <p className="mt-2">
                    무신고납부세액을 500만 원으로 가정하면 일반 무신고가산세는 500만 원 × 20% =
                    100만 원입니다. 감면 요건을 충족해 법정신고기한 후 1개월 이내 기한후신고하면 50%
                    감면 후 50만 원입니다.
                  </p>
                  <p className="mt-2">
                    실제 기준 세액은 소득·공제·기납부세액 등에 따라 확인해야 합니다.
                    복식부기의무자의 수입금액 기준 최저 가산세, 부정행위, 적용 제외 등은 별도 검토가
                    필요하며 납부지연가산세는 포함하지 않은 예시입니다.
                  </p>
                </div>
              </section>

              {/* 2. 납부지연가산세 */}
              <section className="space-y-4">
                <h2 className="text-2xl font-bold">2. 납부지연가산세 일 0.022%, 매일 쌓인다</h2>
                <p className="leading-relaxed text-text-secondary" data-speakable>
                  신고는 했지만 세금을 내지 않으면 납부지연가산세가 붙습니다. 원래 2022년 2월 15일
                  이전까지는 일 0.025%였지만, 개정되어 현재는 <strong>일 0.022%</strong>
                  입니다(국세기본법 §47의4). 이자 같은 개념으로 매일 쌓입니다.
                </p>

                <div className="rounded-lg bg-bg-card p-4">
                  <p className="mb-3 font-semibold text-text-primary">납부지연가산세 계산 공식</p>
                  <div className="text-sm text-text-secondary">
                    <p className="mb-2">
                      <strong>납부지연가산세 = 미납세액 × 일 0.022% × 납부지연일수</strong>
                    </p>
                    <p className="text-xs italic text-text-tertiary">
                      연 환산율: 약 8% (0.022% × 365일 ≈ 8%)
                    </p>
                  </div>
                </div>

                <div className="rounded-lg bg-bg-raised p-4 text-sm text-text-secondary">
                  <p className="mb-3 font-semibold text-text-primary">
                    실제 계산 사례: 무신고납부세액 500만 원, 납부 100일 지연
                  </p>
                  <ul className="list-inside list-disc space-y-1">
                    <li>미납세액 = 500만 원</li>
                    <li>
                      납부지연기간 = 신고일 다음날부터 납부일까지 (예: 6월 1일 신고 → 9월 10일 납부
                      = 101일)
                    </li>
                    <li>납부지연가산세 = 500만 × 0.022% × 101일 = 약 11.1만 원</li>
                    <li className="font-semibold">총 부담: 500만(세액) + 11.1만(지연가산세)</li>
                  </ul>
                </div>

                <div className="rounded-lg border-l-4 border-l-highlight-500 bg-highlight-500/5 p-4 text-sm text-text-secondary">
                  <p className="font-semibold text-text-primary">조금이라도 빨리 내자</p>
                  <p className="mt-2">
                    매일 0.022%씩 증가합니다. 6개월 지연 시 약 4%, 1년 지연 시 약 8% 추가. 신고 후
                    가능한 빨리 납부하는 것이 이득입니다.
                  </p>
                </div>
              </section>

              {/* 3. 부정행위 시 40% 중과 */}
              <section className="space-y-4">
                <h2 className="text-2xl font-bold">3. 부정행위 40% 중과, 위험 신호</h2>
                <p className="leading-relaxed text-text-secondary" data-speakable>
                  단순히 "몰랐어요"라는 무신고와 다른 것이 있습니다. 바로
                  <strong> 의도적 탈세 = 부정행위</strong>입니다. 부정행위로 적발되면 가산세가 20%가
                  아니라
                  <strong> 40%</strong>가 붙으며, 조세 포탈에 해당하면 형사처벌을 받을 수
                  있습니다(조세범처벌법 §3). 원칙은 2년 이하 징역 또는 포탈세액 등의 2배 이하
                  벌금이며, 같은 조의 금액·비율 요건을 충족하면 3년 이하 징역 또는 3배 이하 벌금이
                  적용됩니다.
                </p>

                <div className="rounded-lg border-l-2 border-l-danger-500 bg-danger-500/5 p-4">
                  <p className="text-danger-700 dark:text-danger-300 mb-3 font-semibold">
                    국세청이 "부정행위"로 보는 경우 (국세기본법 §47의2)
                  </p>
                  <ul className="dark:text-danger-400 list-inside list-disc space-y-1 text-sm text-danger-600">
                    <li>계약서 위조 또는 영수증 조작</li>
                    <li>이중 거래처 기록 (실제와 다른 금액 신고)</li>
                    <li>해외 계좌 소득 숨김</li>
                    <li>부동산 거래 숨김 (전세사기 방조 등)</li>
                    <li>불법 노동 소득 (상습적 현금 거래)</li>
                    <li>세무대리인 지시로 인한 계획적 탈세</li>
                  </ul>
                </div>

                <div className="rounded-lg bg-bg-card p-4">
                  <p className="mb-3 font-semibold text-text-primary">부정행위 vs 단순 무신고</p>
                  <div className="space-y-2 text-sm text-text-secondary">
                    <div>
                      <p className="font-semibold text-text-primary">단순 무신고 (20% 가산세)</p>
                      <p>
                        단순 신고 누락·지연의 해당 여부를 먼저 확인하고, 법정신고기한 후 기간과
                        기한후신고 감면 요건을 확인합니다.
                      </p>
                    </div>
                    <div>
                      <p className="font-semibold text-danger-600">
                        부정행위 (40% 가산세 + 형사 처벌)
                      </p>
                      <p>
                        "영수증 조작해서 경비 늘렸어요", "소득 일부 현금으로 받고 안 신고했어요" →
                        세무조사 적발 후 부정행위 판정. 감면 적용 여부는 국세기본법 §48의 제외 요건
                        등으로 판단합니다.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg bg-bg-raised p-4 text-sm text-text-secondary">
                  <p className="mb-3 font-semibold text-text-primary">
                    부정행위 기준: 실질과세 원칙 (국세기본법 §14)
                  </p>
                  <p>
                    국세청은 "형식" 뿐만 아니라 "실질"을 봅니다. 예를 들어 프리랜서가 5억 매출을
                    3억으로 신고했는데 통장 기록, 거래처 확인 조사로 실제는 5억이 밝혀지면
                    부정행위입니다. 단순히 "실수"라고 주장해도 인정 안 됩니다.
                  </p>
                </div>
              </section>

              {/* 4. 기한후신고 감면 */}
              <section className="space-y-4">
                <h2 className="text-2xl font-bold">4. 기한후신고 감면: 50%·30%·20%</h2>
                <p className="leading-relaxed text-text-secondary" data-speakable>
                  국세기본법 §48의 기한후신고 감면은 법정신고기한을 기준으로 계산합니다. 수정신고
                  감면율과 혼동하지 마세요. 세무서의 결정을 미리 알고 신고한 경우 등은 제외됩니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <caption className="mb-2 text-left">
                      일반 무신고가산세 100만 원(무신고납부세액 500만 원 × 20%) 가정.
                      납부지연가산세는 별도.
                    </caption>
                    <thead>
                      <tr>
                        <th className="px-3 py-2 text-left">법정신고기한 후 기간</th>
                        <th className="px-3 py-2 text-right">감면율</th>
                        <th className="px-3 py-2 text-right">감면 후 가산세</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="px-3 py-2">1개월 이내</td>
                        <td className="px-3 py-2 text-right">50%</td>
                        <td className="px-3 py-2 text-right">50만 원</td>
                      </tr>
                      <tr>
                        <td className="px-3 py-2">1개월 초과·3개월 이내</td>
                        <td className="px-3 py-2 text-right">30%</td>
                        <td className="px-3 py-2 text-right">70만 원</td>
                      </tr>
                      <tr>
                        <td className="px-3 py-2">3개월 초과·6개월 이내</td>
                        <td className="px-3 py-2 text-right">20%</td>
                        <td className="px-3 py-2 text-right">80만 원</td>
                      </tr>
                      <tr>
                        <td className="px-3 py-2">6개월 초과</td>
                        <td className="px-3 py-2 text-right">해당 감면 없음</td>
                        <td className="px-3 py-2 text-right">100만 원</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-sm text-text-secondary">
                  2026년 5월 31일은 일요일입니다. 국세기본법 §5에 따라 일반 신고기한은 6월 1일이며,
                  위 기간은 적용되는 법정신고기한 이후부터 계산합니다. 성실신고확인·개별 기한 연장
                  등은 별도로 확인하세요.
                </p>
              </section>

              {/* 5. 환급 절차 */}
              <section className="space-y-4">
                <h2 className="text-2xl font-bold">5. 환급은 신고 이력과 청구 기한을 확인하세요</h2>
                <p className="leading-relaxed text-text-secondary" data-speakable>
                  3.3% 원천징수는 기납부세액입니다. 실제 세액을 신고·정산한 결과에 따라 추가 납부나
                  환급이 발생할 수 있습니다. 정기 신고기한을 넘겼다는 이유만으로 모든 환급 권리가
                  영구 소멸하는 것은 아닙니다.
                </p>
                <p className="leading-relaxed text-text-secondary">
                  국세기본법 §45의3은 세무서장이 세액을 결정·통지하기 전 기한후신고를 규정하고,
                  국세기본법 §45의2는 일정 요건에서 법정신고기한 후 5년 이내 경정청구를 규정합니다.
                  후발적 사유 등 예외도 있으므로 신고 이력·결정 여부·개별 청구 기한을 관할 세무서
                  또는 국세상담센터(126)에 확인하세요. 환급 여부나 금액을 보장하는 안내는 아닙니다.
                </p>
              </section>

              {/* 6. 홈택스 신고 5분 가이드 */}
              <section className="space-y-4">
                <h2 className="text-2xl font-bold">6. 홈택스에서 신고 유형 확인하기</h2>
                <p className="leading-relaxed text-text-secondary" data-speakable>
                  신고 이력에 따라 정기신고·기한후신고·경정청구 중 적용되는 절차를 확인하세요.
                </p>

                <ol className="space-y-3 text-sm">
                  <li className="rounded-lg border border-border-base bg-bg-card p-4">
                    <strong className="mb-1 block text-text-primary">1단계: 홈택스 로그인</strong>
                    <p className="text-text-secondary">
                      <a
                        href="https://www.hometax.go.kr"
                        target="_blank"
                        rel="noopener noreferrer nofollow"
                        className="text-primary-600 underline dark:text-primary-500"
                      >
                        hometax.go.kr
                      </a>{' '}
                      접속 → 공동인증서 또는 간편인증 로그인
                    </p>
                  </li>
                  <li className="rounded-lg border border-border-base bg-bg-card p-4">
                    <strong className="mb-1 block text-text-primary">
                      2단계: 신고/납부 → 종합소득세 신고
                    </strong>
                    <p className="text-text-secondary">
                      상단 메뉴에서 "신고/납부" → "종합소득세" → "신고/납부" 클릭. 모바일은 손택스
                      앱도 가능.
                    </p>
                  </li>
                  <li className="rounded-lg border border-border-base bg-bg-card p-4">
                    <strong className="mb-1 block text-text-primary">
                      3단계: 모두채움 신고 선택
                    </strong>
                    <p className="text-text-secondary">
                      국세청이 자동으로 수집한 소득(근로소득, 3.3% 원천징수 등) 확인. 누락된 소득
                      있으면 직접 입력.
                    </p>
                  </li>
                  <li className="rounded-lg border border-border-base bg-bg-card p-4">
                    <strong className="mb-1 block text-text-primary">4단계: 경비·공제 입력</strong>
                    <p className="text-text-secondary">
                      기준경비율 또는 단순경비율 선택, 의료비·교육비·기부금 등 공제 추가.
                    </p>
                  </li>
                  <li className="rounded-lg border border-border-base bg-bg-card p-4">
                    <strong className="mb-1 block text-text-primary">
                      5단계: 결과 확인 → 전자신고
                    </strong>
                    <p className="text-text-secondary">
                      세액 확인 후 "전자신고" 클릭. 추가 납부 또는 환급 금액이 표시됨. 신고 완료
                      접수증 저장.
                    </p>
                  </li>
                </ol>

                <div className="rounded-lg bg-highlight-500/10 p-4 text-sm text-text-secondary">
                  <p className="font-semibold text-text-primary">⏰ 시간 아끼기 팁</p>
                  <ul className="mt-2 list-inside list-disc space-y-1">
                    <li>
                      5월 25일 이후는 홈택스 서버 폭주 → 새벽(오전 6~8시) 또는 5월 20~24일 신고 권장
                    </li>
                    <li>
                      본 사이트{' '}
                      <Link
                        href="/calculator/freelancer-tax/"
                        className="text-primary-600 underline"
                      >
                        프리랜서 종합소득세 계산기
                      </Link>
                      로 미리 세액 계산해보세요
                    </li>
                    <li>복잡하면 필요한 업무 범위와 비용을 확인한 후 세무 전문가 상담</li>
                  </ul>
                </div>
              </section>

              <FaqSection items={[...FAQ_ITEMS]} />

              {/* 주의사항 */}
              <section className="card border-l-2 border-l-danger-500 bg-danger-500/5">
                <h2 className="text-danger-700 dark:text-danger-300 mb-3 text-lg font-semibold">
                  최종 주의사항
                </h2>
                <ul className="text-danger-700 dark:text-danger-300 space-y-2 text-sm">
                  <li>
                    • <strong>적용되는 법정신고기한 내에</strong> 신고하는 것이 가장 안전 (가산세 0,
                    자진신고 감면도 불필요)
                  </li>
                  <li>신고와 납부는 별개이며 신고 후 30일의 자동 납부 유예는 없습니다.</li>
                  <li>환급은 신고 이력·결정 여부·청구 기한을 확인하세요.</li>
                  <li>• 부정행위(영수증 조작, 소득 은폐) 적발 시 가산세 40% + 형사 처벌 위험</li>
                  <li>복잡한 경우 필요한 업무 범위와 상담 비용을 먼저 확인하세요.</li>
                </ul>
              </section>

              {/* 관련 계산기·가이드 */}
              <section className="card">
                <h2 className="mb-4 text-lg font-semibold">관련 계산기·가이드</h2>
                <ul className="space-y-2 text-sm">
                  <li>
                    →{' '}
                    <Link
                      href="/calculator/freelancer-tax/"
                      className="text-primary-600 underline dark:text-primary-500"
                    >
                      프리랜서 종합소득세 계산기
                    </Link>{' '}
                    · 신고 전 세액 미리 계산
                  </li>
                  <li>
                    →{' '}
                    <Link
                      href="/guide/may-comprehensive-income-tax/"
                      className="text-primary-600 underline dark:text-primary-500"
                    >
                      5월 종합소득세 신고 완벽 가이드
                    </Link>{' '}
                    · 신고 대상·기한·절세 5가지
                  </li>
                  <li>
                    →{' '}
                    <Link
                      href="/calculator/salary/"
                      className="text-primary-600 underline dark:text-primary-500"
                    >
                      연봉 실수령액 계산기
                    </Link>{' '}
                    · N잡러 합산 세액 계산
                  </li>
                  <li>
                    →{' '}
                    <Link
                      href="/guide/financial-income-comprehensive-vs-separate-taxation/"
                      className="text-primary-600 underline dark:text-primary-500"
                    >
                      금융소득 종합과세 vs 분리과세
                    </Link>{' '}
                    · 이자·배당 2천만 기준
                  </li>
                  <li>
                    →{' '}
                    <Link
                      href="/guide/year-end-tax-settlement/"
                      className="text-primary-600 underline dark:text-primary-500"
                    >
                      연말정산 가이드
                    </Link>{' '}
                    · 다음해 1월 대비 (의료비·교육비 누락 확인)
                  </li>
                </ul>
              </section>

              <ShareButtons
                title="종합소득세 무신고·지연 가산세 2026 정확 계산"
                url={URL}
                description="신고기한을 놓쳤을 때 무신고가산세 20% + 자진신고 감면 50% + 신고 이력에 따른 환급 절차 안내."
              />

              {/* 출처 및 면책 */}
              <section
                aria-label="출처 및 면책"
                className="rounded-lg border border-border-base p-4 text-caption text-text-tertiary"
              >
                <p className="mb-2">
                  <strong>법적 근거</strong>: 국세기본법 §47의2 (무신고가산세) · §47의3
                  (과소신고가산세) · §47의4 (납부지연가산세) · §48 (자진신고 감면) · 국세기본법
                  §45의3 (기한후신고) · 국세기본법 §45의2 (경정청구). 참고:{' '}
                  <a
                    href="https://www.hometax.go.kr/guide/0202000000.jsp"
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="text-primary-600 underline dark:text-primary-500"
                  >
                    국세청 가산세 안내
                  </a>
                  ,{' '}
                  <a
                    href="https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?mi=6533&cntntsId=7960"
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="text-primary-600 underline dark:text-primary-500"
                  >
                    국세청 증여세 신고
                  </a>
                  .
                </p>
                <p className="mb-2">
                  <strong>면책 조항</strong>: 본 가이드는 정보 제공 목적이며 세무·법적 조언이
                  아닙니다. 개별 상황에 따라 세무상 결과가 달라질 수 있으며, 실제 신고 전 세무사
                  또는 국세청 상담을 받으시기 바랍니다.
                </p>
                <p>
                  <strong>AI 보조 작성</strong>: 본 가이드는 AI 보조 작성 후 운영자 검수를
                  거쳤습니다(Google AI Content Policy 준수). 업데이트: {DATE_MODIFIED}
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
