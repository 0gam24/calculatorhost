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
  buildHowToJsonLd,
} from '@/lib/seo/jsonld';

const URL = 'https://calculatorhost.com/guide/december-capital-gains-tax-deadline/';
const DATE_PUBLISHED = '2026-05-12';
const DATE_MODIFIED = '2026-05-12';

export const metadata: Metadata = {
  title: '12월 양도세 vs 1월 양도세 가이드 2026 | 연말 매도 결정 프레임',
  description:
    '2026년 12월 부동산 매도를 고민 중이신가요? 12월 잔금 vs 1월 잔금의 귀속연도·신고 일정·2027 세법 개정 영향·양도손실 통산 4단계 의사결정 프레임을 정리했습니다. 일시적2주택 만료 위험도 점검.',
  keywords: [
    '12월 양도세',
    '연말 매도',
    '연초 매도',
    '양도소득세 연말',
    '12월 부동산',
    '귀속연도',
    '양도 시점 결정',
    '양도손실 통산',
    '2027 세법 개정',
    '양도세 신고 일정',
    '2026 양도세',
  ],
  alternates: { canonical: URL },
  openGraph: {
    title: '12월 양도세 vs 1월 양도세 가이드 2026',
    description: '귀속연도·신고 일정·세법 개정·양도손실 통산 의사결정 프레임.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '12월 양도세 vs 1월 양도세 가이드 2026',
    description: '연말 매도 vs 연초 매도 의사결정 4단계 프레임.',
  },
};

const FAQ_ITEMS = [
  {
    question: '12월 25일 잔금과 1월 5일 잔금, 세금이 어떻게 다른가요?',
    answer:
      '귀속연도가 달라져 신고 기한이 1개월 차이 나고(12월 양도→2월 말, 1월 양도→3월 말), 같은 자산 그룹 내 양도손익 통산 가능 시점이 달라집니다(소득세법 §98·§102·§118). 다만 보유 기간 경계(1년/2년)에 걸린다면 잔금일 며칠 차이로 세율이 70%→60% 또는 60%→누진으로 급변할 수 있어 잔금일 전후 보유 기간 정확 확인 필수.',
  },
  {
    question: '주식으로 손실이 났는데 부동산 양도차익과 상계되나요?',
    answer:
      '아니요. 양도소득은 자산 그룹별로 통산이 분리됩니다(소득세법 §102 + 시행령 §178). 그룹 1(부동산·부동산권리·기타자산), 그룹 2(주식), 그룹 3(파생상품) 각각 별도 통산. 부동산 양도차익은 같은 해 다른 부동산 양도손실과만 통산 가능. 주식 손실은 주식 내에서만.',
  },
  {
    question: '일시적 2주택 비과세가 12월 말까지인데 1월에 양도해도 되나요?',
    answer:
      '안 됩니다. 일시적 2주택 비과세 특례는 신규 취득일로부터 3년 이내 종전 주택 양도 조건(시행령 §155). 신규 취득이 2023-12-20이면 2026-12-20이 D-day. 이후 1월 양도는 비과세 상실 → 조정대상지역이면 +20~30%p 중과(§104의3). 양도가 5억 기준 수천만 원 차이 가능.',
  },
  {
    question: '2027년 세법 개정이 1월 양도에 어떻게 영향을 주나요?',
    answer:
      '정부는 매년 11월~12월 하반기 세제 개정안을 발표합니다. 2027년 1월부터 시행되는 새 세법(세율 인상·공제 축소 등)이 발표되면 1월 이후 양도자만 적용. 12월 양도자는 2026년 세법으로 정산. 강화 예고 시 12월 양도 유리, 완화 예고 시 1월 양도 유리.',
  },
  {
    question: '양도소득 기본공제 250만 원은 매년 받을 수 있나요?',
    answer:
      '네, 양도소득 그룹별로 연 1회 250만 원 기본공제(소득세법 §103). 부동산 그룹과 주식 그룹은 각각 별도로 250만 원씩 공제. 따라서 12월 양도와 1월 양도가 다른 연도에 속하면 양쪽 모두 250만 원씩 공제 받을 수 있어 분할 양도가 유리한 경우도 있음.',
  },
];

export default function DecemberCgtDeadlineGuide() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '12월 양도세 마감 결정 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '12월 양도세 vs 1월 양도세 의사결정 가이드 2026',
    description:
      '12월 vs 1월 양도 결정 4단계 프레임. 귀속연도·신고 일정·세법 개정 영향·양도손실 통산.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    type: 'Article',
    keywords: ['12월 양도세', '연말 매도', '연초 매도', '귀속연도', '2026'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '12월 양도세 vs 1월 양도세 가이드 2026',
    description:
      '연말 매도 vs 연초 매도. 귀속연도·신고·세법 개정·통산 결정 프레임.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
  });
  const faqLd = buildFaqPageJsonLd([...FAQ_ITEMS]);
  const speakableLd = buildSpeakableJsonLd(['[data-speakable]']);
  const howtoLd = buildHowToJsonLd({
    name: '12월 vs 1월 양도 결정 4단계 프레임',
    description: '연말 부동산 매도 의사결정 단계',
    steps: [
      {
        name: '같은 해 부동산 양도손실 확인',
        text: '2026년에 다른 부동산을 양도해 손실이 났다면 12월 양도가 유리(같은 해 통산 가능, 시행령 §178).',
      },
      {
        name: '2027 세제 개정안 모니터링',
        text: '11~12월 정부 세제 개정안 발표 확인. 강화 예고 시 12월 유리, 완화 예고 시 1월 유리.',
      },
      {
        name: '보유 기간 경계 점검',
        text: '잔금일 기준 1년/2년 경계 도달 여부 확인. 며칠 차이로 70%→60% 또는 60%→누진 변동.',
      },
      {
        name: '일시적 2주택 D-day 점검',
        text: '신규 취득일 +3년 만료 시 비과세 특례 상실(시행령 §155). 만료 전 양도 우선.',
      },
      {
        name: '현금 흐름 + 세무사 상담',
        text: '12월 양도 → 2월 말 신고·납부. 1월 양도 → 3월 말 신고. 자금·일정 종합 검토 후 결정.',
      },
    ],
  });

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howtoLd) }} />

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
                    { name: '12월 양도세 마감 결정' },
                  ]}
                />
                <h1 className="mt-4 text-3xl font-bold text-text-primary md:text-4xl">
                  12월 양도세 vs 1월 양도세 의사결정 가이드 2026
                </h1>
                <p className="mt-3 text-lg text-text-secondary" data-speakable>
                  2026년 12월 vs 2027년 1월 사이에서 부동산 매도 시점을 고민 중이신가요? 잔금 청산일 단 며칠 차이로
                  귀속연도·신고 시기·세법 적용·양도손익 통산 가능성이 달라집니다(소득세법 §98·§102·§118).
                  본 가이드는 8월 가이드(보유 기간 경계 점검)와 달리, <strong>연말 매도 vs 연초 매도 의사결정 4단계 프레임</strong>을 제시합니다.
                </p>
              </header>

              <AdSlot slot="guide-dec-cgt-top" format="horizontal" />

              {/* 1. 귀속연도 원칙 */}
              <section aria-label="귀속연도 원칙" className="card">
                <h2 className="mb-4 text-2xl font-semibold">귀속연도 = 양도일 = 잔금 청산일</h2>
                <p className="mb-3 text-text-secondary" data-speakable>
                  소득세법 §98에 따라 양도일은 잔금을 청산한 날입니다. 잔금 청산이 등기 접수일보다 늦으면
                  등기 접수일이 양도일. 양도일이 속한 연도가 과세 귀속 연도가 되고, 신고·납부 기한도 결정됩니다(§118).
                </p>
                <ul className="list-inside list-disc space-y-1.5 text-sm text-text-secondary">
                  <li>2026-12-28 잔금 → 2026 귀속 → 신고 기한 2027-02-28</li>
                  <li>2026-12-31 잔금 → 2026 귀속 → 신고 기한 2027-02-28</li>
                  <li>2027-01-02 잔금 → 2027 귀속 → 신고 기한 2027-03-31</li>
                </ul>
              </section>

              {/* 2. 12월 vs 1월 비교표 */}
              <section aria-label="12월 vs 1월 비교" className="card">
                <h2 className="mb-4 text-2xl font-semibold">12월 양도 vs 1월 양도 비교</h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm" data-speakable>
                    <caption className="sr-only">12월 vs 1월 양도 비교</caption>
                    <thead>
                      <tr className="border-b border-border-base text-left">
                        <th className="py-2 pr-4 font-semibold">항목</th>
                        <th className="py-2 pr-4 font-semibold">12월 양도</th>
                        <th className="py-2 font-semibold">1월 양도</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-subtle"><td className="py-2 pr-4">귀속연도</td><td className="py-2 pr-4">2026</td><td className="py-2">2027</td></tr>
                      <tr className="border-b border-border-subtle"><td className="py-2 pr-4">신고 기한</td><td className="py-2 pr-4">2027-02-28</td><td className="py-2">2027-03-31</td></tr>
                      <tr className="border-b border-border-subtle"><td className="py-2 pr-4">2026년 부동산 손실 상계</td><td className="py-2 pr-4">✅ 가능</td><td className="py-2">❌ 불가</td></tr>
                      <tr className="border-b border-border-subtle"><td className="py-2 pr-4">2027 세법 개정 영향</td><td className="py-2 pr-4">❌ 적용 X</td><td className="py-2">✅ 적용</td></tr>
                      <tr className="border-b border-border-subtle"><td className="py-2 pr-4">기본공제 (§103, 250만)</td><td className="py-2 pr-4">2026 적용</td><td className="py-2">2027 적용</td></tr>
                      <tr><td className="py-2 pr-4">현금 흐름</td><td className="py-2 pr-4">2월 납부 (빠름)</td><td className="py-2">3월 납부 (여유)</td></tr>
                    </tbody>
                  </table>
                </div>
              </section>

              <AdSlot slot="guide-dec-cgt-mid" format="rectangle" />

              {/* 3. 4단계 결정 프레임 */}
              <section aria-label="4단계 결정 프레임" className="card border-l-4 border-l-primary-500">
                <h2 className="mb-4 text-2xl font-semibold">4단계 의사결정 프레임</h2>
                <ol className="list-inside list-decimal space-y-3 text-text-secondary" data-speakable>
                  <li>
                    <strong className="text-text-primary">Step 1 — 같은 해 부동산 양도손실 확인</strong>
                    <p className="text-sm mt-1">2026년 다른 부동산을 양도해 손실이 났다면 12월 양도 유리(같은 해 통산 가능, 시행령 §178). 손실 없으면 다음 단계.</p>
                  </li>
                  <li>
                    <strong className="text-text-primary">Step 2 — 2027 세제 개정안 모니터링</strong>
                    <p className="text-sm mt-1">11~12월 정부 세제 개정안 발표 확인. 양도세율 인상·공제 축소 발표 시 12월 양도 우선. 완화 예고 시 1월 양도 검토.</p>
                  </li>
                  <li>
                    <strong className="text-text-primary">Step 3 — 보유 기간 경계 + 일시적 2주택 D-day</strong>
                    <p className="text-sm mt-1">잔금일 기준 1년/2년 보유 경계 도달 여부 확인(70%→60%→누진). 일시적 2주택 비과세 만료(신규 취득 +3년) 임박 시 만료 전 양도 우선.</p>
                  </li>
                  <li>
                    <strong className="text-text-primary">Step 4 — 현금 흐름 + 세무사 상담</strong>
                    <p className="text-sm mt-1">12월 양도 → 2월 말 신고·납부 (대출 상환·재투자 자금 압박). 1월 양도 → 3월 말 신고 (시간 여유). 다주택·복합 거래는 세무사 필수.</p>
                  </li>
                </ol>
              </section>

              {/* 4. FAQ */}
              <FaqSection items={[...FAQ_ITEMS]} />

              {/* 5. 양도손실 통산 정확 이해 */}
              <section aria-label="양도손실 통산" className="card">
                <h2 className="mb-4 text-2xl font-semibold">양도손실 통산 — 같은 자산 그룹 내에서만</h2>
                <p className="mb-3 text-text-secondary" data-speakable>
                  양도소득은 자산 그룹별로 통산이 분리됩니다(소득세법 §102 + 시행령 §178). 부동산 양도차익은 같은 해
                  다른 <strong>부동산 양도손실</strong>과만 통산. 주식 손실로 부동산 차익을 상쇄할 수 없습니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm" data-speakable>
                    <thead>
                      <tr className="border-b border-border-base text-left">
                        <th className="py-2 pr-4 font-semibold">자산 그룹</th>
                        <th className="py-2 font-semibold">통산 가능 자산</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-subtle"><td className="py-2 pr-4">그룹 1</td><td className="py-2">부동산 · 부동산 권리 · 기타자산 (서로 통산 가능)</td></tr>
                      <tr className="border-b border-border-subtle"><td className="py-2 pr-4">그룹 2</td><td className="py-2">주식 (그룹 1과 통산 X)</td></tr>
                      <tr><td className="py-2 pr-4">그룹 3</td><td className="py-2">파생상품 (별도 통산)</td></tr>
                    </tbody>
                  </table>
                </div>
                <div className="mt-3 rounded-lg bg-bg-card p-3 text-sm text-text-secondary">
                  <p className="mb-1"><strong className="text-text-primary">올바른 통산 사례 (그룹 1 내):</strong></p>
                  <ul className="list-inside list-disc space-y-0.5">
                    <li>주택 양도차익 +5,000만 + 토지 양도손실 −2,000만 = 과세 3,000만 ✅</li>
                  </ul>
                  <p className="mb-1 mt-2"><strong className="text-text-primary">잘못된 통산 (그룹 간 X):</strong></p>
                  <ul className="list-inside list-disc space-y-0.5">
                    <li>주택 양도차익 +5,000만 + 주식 양도손실 −2,000만 = ❌ 통산 불가 (별도 그룹)</li>
                  </ul>
                </div>
              </section>

              {/* 6. 신고 일정 + 가산세 */}
              <section aria-label="신고 일정과 가산세" className="card">
                <h2 className="mb-4 text-2xl font-semibold">신고 일정과 가산세</h2>
                <div className="space-y-3 text-text-secondary">
                  <div data-speakable>
                    <p>양도세 예정신고 기한 = <strong>양도일이 속한 달의 말일부터 2개월 이내</strong>(소득세법 §118).</p>
                    <ul className="list-inside list-disc space-y-1 text-sm mt-2">
                      <li>2026-12 양도 → 2027-02-28까지</li>
                      <li>2027-01 양도 → 2027-03-31까지</li>
                    </ul>
                  </div>
                  <p className="text-sm">
                    무신고 시 가산세 20%(부정행위 40%) + 납부지연 가산세 일 0.022%(국세기본법 §47의2·§47의4).
                    1개월 이내 자진 신고 시 가산세 50% 경감 가능.
                  </p>
                </div>
              </section>

              {/* 7. 2027 세제 개정 모니터링 */}
              <section aria-label="2027 세제 개정 모니터링" className="card">
                <h2 className="mb-4 text-2xl font-semibold">2027 세제 개정안 모니터링 포인트</h2>
                <ul className="list-inside list-disc space-y-1.5 text-sm text-text-secondary">
                  <li><strong>일시적 2주택 비과세 기한</strong> — 현행 3년 유지 vs 단축 논의</li>
                  <li><strong>양도세율 누진 구간</strong> — 부동산 시장 상황에 따라 강화·완화</li>
                  <li><strong>장기보유공제 비율</strong> — 보유·거주 각 4%/년 유지 여부</li>
                  <li><strong>1세대1주택 비과세 12억 한도</strong> — 시장 가격 변화에 따른 조정</li>
                  <li><strong>다주택 중과 +20/+30%p</strong> — 일시적 완화 또는 영구 폐지 논의</li>
                </ul>
                <p className="mt-3 text-sm text-text-tertiary">
                  공식 발표는 기획재정부 보도자료 + 국세청 고시 확인. 12월 중순까지 확정.
                </p>
              </section>

              {/* 8. 주의사항 */}
              <section aria-label="주의사항" className="card border-l-4 border-l-danger-500">
                <h2 className="mb-3 text-xl font-semibold">⚠️ 주의사항</h2>
                <ul className="list-inside list-disc space-y-1.5 text-sm text-text-secondary">
                  <li>잔금 청산일이 양도일 — 계약일·등기일과 혼동 X. 잔금 통장 입금일 확인.</li>
                  <li>일시적 2주택 D-day 1일 초과 시 비과세 상실. 만료 임박 시 무조건 만료 전 양도.</li>
                  <li>양도손실 통산은 같은 자산 그룹 내에서만(부동산↔주식 X).</li>
                  <li>12월 후반 매도 시 세무사 마감 일정 → 11월 중 사전 상담 권장.</li>
                  <li>2027 세제 개정안은 12월 발표 — 발표 전 확정 매도는 신중.</li>
                </ul>
              </section>

              {/* 9. 관련 계산기·가이드 */}
              <section aria-label="관련 계산기·가이드" className="card">
                <h2 className="mb-4 text-2xl font-semibold">관련 계산기·가이드</h2>
                <ul className="space-y-2 text-text-secondary">
                  <li>→ <Link href="/calculator/capital-gains-tax/" className="text-primary-600 underline dark:text-primary-500">양도소득세 계산기</Link> — 잔금일 시나리오별 시뮬</li>
                  <li>→ <Link href="/guide/august-capital-gains-tax-review/" className="text-primary-600 underline dark:text-primary-500">8월 양도세 검토 가이드</Link> — 보유 기간·일시적2주택 D-day</li>
                  <li>→ <Link href="/guide/capital-gains-tax-tips/" className="text-primary-600 underline dark:text-primary-500">양도세 절세 팁</Link></li>
                  <li>→ <Link href="/guide/capital-gains-tax-5-steps/" className="text-primary-600 underline dark:text-primary-500">양도세 5단계 계산법</Link></li>
                  <li>→ <Link href="/calculator/acquisition-tax/" className="text-primary-600 underline dark:text-primary-500">취득세 계산기</Link> — 매수 측 비용</li>
                </ul>
              </section>

              <ShareButtons title="12월 양도세 vs 1월 양도세 가이드 2026" url={URL} description="연말 매도 vs 연초 매도 4단계 의사결정 프레임." />

              {/* 출처·면책 */}
              <section
                aria-label="출처 및 면책"
                className="rounded-lg border border-border-base p-4 text-caption text-text-tertiary"
              >
                <p className="mb-2">
                  <strong>법적 근거</strong>: 소득세법 §89 (1세대1주택 비과세) · §94 (양도소득) · §95 (장기보유공제) · §98 (양도일) · §102 (양도손실 통산) · §103 (양도소득 기본공제 250만) · §104 (양도세율) · §104의3 (다주택 중과) · §118 (예정신고) · 시행령 §155 (일시적 2주택) · §178 (양도손실 통산 방법) · 국세기본법 §47의2·§47의4 (가산세). 참고: <a href="https://www.hometax.go.kr" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-600 underline dark:text-primary-500">홈택스</a>, <a href="https://www.nts.go.kr" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-600 underline dark:text-primary-500">국세청</a>, <a href="https://www.moef.go.kr" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-600 underline dark:text-primary-500">기획재정부</a>, <a href="https://www.law.go.kr" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-600 underline dark:text-primary-500">법령정보센터</a>.
                </p>
                <p className="mb-2">
                  <strong>면책조항</strong>: 본 가이드는 일반 정보 제공 목적이며 세무·법적 조언이 아닙니다. 다주택, 상속·증여, 일시적 2주택, 1세대1주택 비과세 등 복합 상황은 반드시 세무사 또는 국세청 상담을 통해 확정하시기 바랍니다.
                </p>
                <p>
                  <strong>업데이트</strong>: {DATE_MODIFIED} · 작성·검수: 김준혁 (스마트데이터샵). 본 가이드는 AI 보조 작성 후 운영자 검수 발행되었습니다.
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
