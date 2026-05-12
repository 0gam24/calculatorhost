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

const URL = 'https://calculatorhost.com/guide/child-house-gift-vs-sale-comparison/';
const DATE_PUBLISHED = '2026-05-12';
const DATE_MODIFIED = '2026-05-12';

export const metadata: Metadata = {
  title: '자녀 주택 증여 vs 매매 비교 2026 | 저가양수도 30% 룰 + 세금 시뮬',
  description:
    '자녀 주택 이전 4가지 시나리오 비교. 저가양수도 30%·3억 룰, 자금출처 조사, 양도세 시가 기준, 증여취득세 vs 취득세, 신고 함정 5가지.',
  keywords: [
    '자녀 주택 증여',
    '자녀 주택 매매',
    '저가양수도',
    '증여 vs 매매',
    '자녀 집 이전',
    '가족 간 주택 거래',
    '저가 양수도 30%',
    '자녀 증여세',
    '부모 양도세',
    '자금출처 조사',
    '2026 자녀 주택',
  ],
  alternates: { canonical: URL },
  openGraph: {
    title: '자녀 주택 증여 vs 매매 비교 2026',
    description: '저가양수도 30%·3억 룰, 자금출처 조사, 양도세 시가 기준 계산, 4가지 시나리오 세금 비교.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '자녀 주택 증여 vs 매매 비교 2026',
    description: '시가 10억 주택 자녀 이전 4가지 비교: 시가 매매 ≈9,400만 vs 7억 매매 ≈7,602만(최소) vs 5억 ≈8,612만 vs 전액 증여 ≈2.63억.',
  },
};

const FAQ_ITEMS = [
  {
    question: '저가양수도 30%·3억 룰이란 정확히 무엇인가요?',
    answer:
      '상증법 시행령 §26에 따른 저가양수도 판정 기준입니다. 특수관계인(부모-자녀 등) 간 거래에서 시가와 거래가 차액이 "시가의 30% 이상 AND 3억 원 이상"이면 그 차액 전체가 증여세 대상입니다. 반대로 차액이 30% 미만이면서 동시에 3억 미만이면 거래를 정상 매매로 인정해 증여세를 부과하지 않습니다. 예: 시가 10억 주택을 7억에 판매(차액 3억 = 30% AND = 3억) → 판정 경계선으로 정상 매매 인정.',
  },
  {
    question: '저가로 자녀에게 팔아도 부모가 양도세를 내나요?',
    answer:
      '네, 반드시 냅니다. 소득세법 §101의 부당행위계산 부인 규정에 따라 양도자는 거래 실제가(예: 7억)가 아닌 시가(10억)를 기준으로 양도세를 계산합니다. 따라서 자녀가 저가 혜택을 본다면 부모는 역으로 양도세 추가 부담이 발생합니다. 시가 기준 양도세는 양도자의 의무이므로 이를 피할 수 없습니다.',
  },
  {
    question: '시가 10억 주택을 자녀에게 50% 할인(5억)으로 팔면 차액 5억에 증여세가 붙나요?',
    answer:
      '아닙니다. 상증법 §35 ① 1호에 따라 "차액에서 시가의 30%와 3억 중 적은 금액을 뺀 가액"이 증여재산가액입니다. 시가 10억의 30%는 3억이고 3억과 비교해도 3억이라 차감액은 3억. 따라서 차액 5억 − 3억 = 2억이 증여세 과세 대상입니다. 직계비속 공제 5천만 적용 후 1.5억 × 20% − 누진공제 1,000만 = 약 2,000만 원의 증여세. 다만 부모는 시가 기준 양도세를 별도 납부하므로(소득세법 §101) 총 세금은 작지 않습니다.',
  },
  {
    question: '"자녀가 자금을 냈다"고 주장하면 국세청이 믿나요?',
    answer:
      '믿지 않을 확률이 높습니다. 국세기본법 §14 실질과세 원칙에 따라 국세청은 자녀의 자금출처를 철저히 조사합니다. 자녀 명의 통장에서 거래일 근처에 충분한 자금이 있는지, 그 자금이 어디서 왔는지(근로소득, 사업소득, 이전 저축 등)를 확인합니다. 부모 통장에서 자녀 통장으로 송금 기록이 있으면 증여로 재과세 가능성이 높으므로, 최소 6개월~1년 이상 자녀 명의 자금을 축적한 후 거래하는 것이 안전합니다.',
  },
  {
    question: '매매(정상거래)로 하기로 결정했는데 입증할 자료가 뭔가요?',
    answer:
      '①거래 6개월 이전의 자녀 명의 계좌 존재·거래 내역(근로소득, 이전 저축, 대출 등), ②부모 → 자녀 송금이 없거나 최소화한 통장 기록, ③부동산 거래계약서·중개사무소 거래 기록, ④자녀 신분증을 통한 실제 의사확인, ⑤등기부등본의 새로운 소유자(자녀 단독 또는 공동), ⑥거래세(취득세) 납부 증명입니다. 특히 통장 기록은 국세청 조사 시 가장 강력한 증거가 되므로 최소 1년 치는 보관해야 합니다.',
  },
];

export default function ChildHouseGiftVsSaleComparisonGuide() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '자녀 주택 증여 vs 매매 비교' },
  ]);

  const articleLd = buildArticleJsonLd({
    headline: '자녀 주택 증여 vs 매매 비교 2026 | 저가양수도 30% 룰',
    description:
      '자녀에게 주택을 이전할 때 증여·매매 4가지 시나리오 비교. 저가양수도 30%·3억 룰, 자금출처 조사, 양도세 시가 기준, 신고 함정 5가지.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    type: 'Article',
    keywords: ['자녀 주택 증여', '저가양수도', '양도세', '증여세', '자금출처 조사'],
  });

  const faqLd = buildFaqPageJsonLd(FAQ_ITEMS);
  const speakableLd = buildSpeakableJsonLd([
    '자녀 주택을 증여할지 매매할지 선택하기 위해서는 저가양수도 30% 룰을 정확히 이해해야 합니다.',
    '시가 10억 주택을 자녀에게 매매하는 4가지 방법: 시가대로 10억 매매, 30% 할인 7억 매매, 50% 할인 5억 매매, 전액 증여.',
    '저가양수도는 상속세 및 증여세법 시행령 26조에 규정된 특수관계인 간 저가 거래 판정 기준입니다.',
  ]);

  return (
    <>
      <Header />
      <div className="flex min-h-screen bg-bg-base">
        <Sidebar />
        <main className="flex-1">
          <Breadcrumb
            items={[
              { name: '홈', href: '/' },
              { name: '가이드', href: '/guide/' },
              { name: '자녀 주택 증여 vs 매매 비교' },
            ]}
          />

          <article className="mx-auto max-w-4xl px-4 py-8 lg:px-8">
            <h1 className="mb-2 text-4xl font-bold text-text-primary">
              자녀 주택 증여 vs 매매 비교 2026
            </h1>
            <p className="mb-6 text-sm text-text-secondary">
              마지막 업데이트: {DATE_MODIFIED} | 작성: 김준혁
            </p>

            {/* 리드 문단 */}
            <div className="mb-8 space-y-4 rounded-lg border border-border-base bg-bg-card p-4">
              <p className="text-text-primary">
                자녀에게 주택을 이전하는 것은 인생의 큰 결정입니다. 증여를 할지, 매매를 할지에 따라
                세금 부담이 수억 원 차이날 수 있습니다. 특히 <strong>저가양수도 30%·3억 룰</strong>을
                모르면 의도하지 않은 증여세가 청구될 수 있습니다. 이 가이드는 4가지 실제 시나리오를
                통해 각 방식의 세금 구조와 함정을 분석합니다.
              </p>
            </div>

            <AdSlot slot="guide-child-house-top" format="horizontal" />

            {/* 섹션 1: 결정 프레임 */}
            <section className="mb-10">
              <h2 className="mb-4 text-2xl font-bold text-text-primary">
                1. 증여 vs 매매 결정 프레임
              </h2>
              <p className="mb-4 text-text-primary">
                자녀에게 주택을 이전하는 방식은 크게 4가지입니다:
              </p>
              <ul className="mb-6 space-y-3">
                <li className="flex gap-3 rounded-lg bg-bg-card p-3">
                  <span className="font-bold text-primary">A.</span>
                  <span>
                    <strong>시가대로 매매</strong> (10억 매매) — 정상 거래. 자금출처 명확 필요.
                  </span>
                </li>
                <li className="flex gap-3 rounded-lg bg-bg-card p-3">
                  <span className="font-bold text-primary">B.</span>
                  <span>
                    <strong>30% 할인 매매</strong> (7억 매매) — 차액 3억 = 경계선. 정상 거래 인정 가능.
                  </span>
                </li>
                <li className="flex gap-3 rounded-lg bg-bg-card p-3">
                  <span className="font-bold text-primary">C.</span>
                  <span>
                    <strong>50% 할인 매매</strong> (5억 매매) — 차액 5억 초과. 4억 증여세 + 부모 양도세.
                  </span>
                </li>
                <li className="flex gap-3 rounded-lg bg-bg-card p-3">
                  <span className="font-bold text-primary">D.</span>
                  <span>
                    <strong>전액 증여</strong> (10억 증여) — 자금출처 증명 불필요. 증여세 부담 최대.
                  </span>
                </li>
              </ul>
              <p className="rounded-lg bg-highlight/10 p-3 text-text-primary">
                <strong>핵심:</strong> 시가와 거래가 차액이 "시가의 30% 이상 <u>AND</u> 3억 이상"이어야만
                증여세 부과. 동시에 두 조건을 만족해야 합니다.
              </p>
            </section>

            {/* 섹션 2: 저가양수도 30%·3억 룰 */}
            <section className="mb-10">
              <h2 className="mb-4 text-2xl font-bold text-text-primary">
                2. 저가양수도 30%·3억 룰 완벽 이해
              </h2>
              <p className="mb-4 text-text-primary">
                상증법 시행령 §26은 특수관계인 간 거래(부모-자녀 등)에서 저가 양수도 판정 기준을
                제시합니다. 이는 당사자가 의도한 거래 형식(매매)보다 실질(증여)을 중시하는
                실질과세 원칙을 반영합니다.
              </p>
              <div className="mb-6 overflow-x-auto rounded-lg border border-border-base">
                <table className="w-full">
                  <thead>
                    <tr className="bg-bg-card">
                      <th className="px-4 py-2 text-left font-bold text-text-primary">조건</th>
                      <th className="px-4 py-2 text-left font-bold text-text-primary">판정</th>
                      <th className="px-4 py-2 text-left font-bold text-text-primary">세금 처리</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t border-border-base">
                      <td className="px-4 py-2 text-text-primary">
                        차액 &lt; 시가의 30% <strong>AND</strong> &lt; 3억
                      </td>
                      <td className="px-4 py-2 font-bold text-green-600">정상 매매</td>
                      <td className="px-4 py-2 text-text-secondary">
                        증여세 X, 양도세만 (거래가 기준 X, 시가 기준)
                      </td>
                    </tr>
                    <tr className="border-t border-border-base bg-bg-card">
                      <td className="px-4 py-2 text-text-primary">
                        차액 ≥ 시가의 30% <strong>OR</strong> ≥ 3억
                      </td>
                      <td className="px-4 py-2 font-bold text-danger">저가양수도</td>
                      <td className="px-4 py-2 text-text-secondary">
                        차액 전체 = 증여세 대상 + 양도세 (시가 기준)
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="space-y-2 rounded-lg bg-danger/5 p-4">
                <p className="font-bold text-danger">⚠️ 중요한 논리</p>
                <p className="text-text-primary">
                  "30% 이상"과 "3억 이상"은 <strong>OR 관계가 아닌 AND 관계</strong>입니다. 두
                  조건을 <u>동시에 만족</u>해야만 저가양수도로 판정되어 차액이 증여세 과세 대상이
                  됩니다. 예를 들어 차액이 시가의 40%이지만 2억밖에 안 된다면, 정상 매매로 인정합니다.
                </p>
              </div>
            </section>

            {/* 섹션 3: 4가지 시나리오 시뮬 */}
            <section className="mb-10">
              <h2 className="mb-4 text-2xl font-bold text-text-primary">
                3. 4가지 시나리오 세금 시뮬레이션
              </h2>
              <p className="mb-4 text-text-primary">
                가정: 30세 성년 자녀, 시가 10억 주택 1채, 취득가 8억, 보유 3년, 조정지역 외, 1세대1주택
              </p>

              <p className="mb-4 text-sm text-text-tertiary">
                ※ 모든 수치는 인적공제·재산세·지방교육세·농특세·1세대1주택 비과세·장기보유공제 등 개별 변수를 단순화한
                근사치입니다. 정확한 금액은 홈택스 모의계산 또는 세무사 검증 필수.
              </p>

              {/* 부모 양도세 공통 */}
              <div className="mb-4 rounded-lg bg-bg-card p-3 text-sm text-text-secondary">
                <p className="mb-1 font-semibold text-text-primary">공통: 부모 양도세 (소득세법 §101 부당행위계산 부인 — 시가 10억 기준)</p>
                <p>양도차익 = 10억 − 8억 = 2억 / 기본공제 250만 → 과세표준 1.975억 / 누진세율 38%(1.5억~3억 구간) − 누진공제 1,994만 → 양도세 ≈ 5,511만 + 지방소득세 약 551만 = <strong>약 6,062만</strong></p>
              </div>

              {/* 시나리오 A */}
              <div className="mb-6 rounded-lg border-l-4 border-primary bg-bg-card p-4">
                <h3 className="mb-3 font-bold text-primary">A. 시가대로 매매 (10억)</h3>
                <div className="space-y-2 text-sm text-text-primary">
                  <p>거래가: 10억 / 자녀 증여세: 0</p>
                  <p>자녀 취득세 (9억 초과 3% + 지방교육세 0.3%, 85㎡ 이하 가정) ≈ 3,300만</p>
                  <p>부모 양도세 + 지방세 ≈ 6,062만</p>
                  <p className="rounded bg-bg-base p-2 font-bold">
                    총 세금 ≈ 약 9,400만 (자녀 3,300만 + 부모 6,062만)
                  </p>
                </div>
              </div>

              {/* 시나리오 B */}
              <div className="mb-6 rounded-lg border-l-4 border-secondary bg-bg-card p-4">
                <h3 className="mb-3 font-bold text-secondary">B. 30% 할인 매매 (7억) — 경계선</h3>
                <div className="space-y-2 text-sm text-text-primary">
                  <p>거래가: 7억 / 차액: 3억 (시가의 30% AND 3억)</p>
                  <p>저가양수도 판정: 차액이 시가 30% 또는 3억과 정확히 같은 경계선. 안전하게는 "초과"가 아닌 "이상" 해석으로 저가양수도로 분류될 위험. 실무상 차액을 시가의 29% 이하 또는 2.99억 이하로 설계하는 것이 안전.</p>
                  <p>자녀 취득세 (7억 × 2% + 지방교육세 0.2%) ≈ 약 1,540만</p>
                  <p>자녀 증여세 (만약 저가양수도 적용 시): 차액 3억 − min(시가 30%=3억, 3억) = 0 → 증여세 0</p>
                  <p>부모 양도세 + 지방세 ≈ 6,062만 (시가 10억 기준 — §101)</p>
                  <p className="rounded bg-bg-base p-2 font-bold">
                    총 세금 ≈ 약 7,602만 (자녀 1,540만 + 부모 6,062만)
                  </p>
                  <p className="text-xs text-text-secondary">
                    * 차감액 3억으로 인해 차액 3억 이내는 사실상 증여세 0. 자녀의 취득세 절감이 핵심 효과.
                  </p>
                </div>
              </div>

              {/* 시나리오 C */}
              <div className="mb-6 rounded-lg border-l-4 border-danger bg-bg-card p-4">
                <h3 className="mb-3 font-bold text-danger">C. 50% 할인 매매 (5억) — 저가양수도 확정</h3>
                <div className="space-y-2 text-sm text-text-primary">
                  <p>거래가: 5억 / 차액: 5억 (시가의 50%)</p>
                  <p>저가양수도 판정: 차액 5억 &gt; 시가 30%(3억) AND &gt; 3억 → 저가양수도 적용</p>
                  <p>증여재산가액 = 차액 5억 − min(시가 30%=3억, 3억) = <strong>2억</strong> (5억이 아님 — 상증법 §35 ① 1호)</p>
                  <p>자녀 증여세: 2억 − 직계비속 공제 5천 = 1.5억 → 1.5억 × 20%(5억 이하) − 누진공제 1,000만 = <strong>약 2,000만</strong></p>
                  <p>자녀 취득세 (5억 × 1% + 지방교육세 0.1%) ≈ 약 550만</p>
                  <p>부모 양도세 + 지방세 ≈ 6,062만 (시가 10억 기준)</p>
                  <p className="rounded bg-bg-base p-2 font-bold">
                    총 세금 ≈ 약 8,612만 (자녀 2,550만 + 부모 6,062만)
                  </p>
                  <p className="text-xs text-text-secondary">
                    * 저가양수도지만 차감액 3억으로 실제 증여세는 작음. 다만 자녀의 향후 양도 시 취득가가 5억으로 낮게
                    인식되어 미래 양도차익이 커지는 점 주의.
                  </p>
                </div>
              </div>

              {/* 시나리오 D */}
              <div className="mb-6 rounded-lg border-l-4 border-danger bg-bg-card p-4">
                <h3 className="mb-3 font-bold text-danger">D. 전액 증여 (10억) — 자금출처 무관</h3>
                <div className="space-y-2 text-sm text-text-primary">
                  <p>증여재산: 10억 − 직계비속 공제 5천 = 9.5억 (10억 이하 구간)</p>
                  <p>증여세 = 9.5억 × 30% − 누진공제 6,000만 = <strong>약 2.25억</strong> (상증법 §56 — 30% 구간)</p>
                  <p>증여취득세 (3.5% + 지방교육세 0.3%) ≈ 약 3,800만 (1세대1주택 1.5% 특례 적용 시 약 1,800만)</p>
                  <p>부모 양도세: 0 (양도 아님). 단, 향후 자녀가 양도 시 이월과세 10년 적용 (소득세법 §97의2)</p>
                  <p className="rounded bg-bg-base p-2 font-bold">
                    총 세금 ≈ 약 2.63억 (자녀만 부담, 1주택 특례 적용 시 약 2.43억)
                  </p>
                  <p className="text-xs text-text-secondary">
                    * 자금출처 조사 없음. 부모 세금 0. 단 자녀 세부담 4가지 중 최대.
                  </p>
                </div>
              </div>

              <div className="rounded-lg bg-highlight/10 p-4">
                <p className="font-bold text-text-primary">
                  📊 총 세금 비교 (단순화 근사치)
                </p>
                <ul className="mt-2 space-y-1 text-sm text-text-primary">
                  <li>A. 시가 10억 매매: 약 9,400만</li>
                  <li>B. 7억 매매 (30% 할인 경계선): 약 7,602만 ← 최소</li>
                  <li>C. 5억 매매 (50% 할인, 저가양수도): 약 8,612만</li>
                  <li>D. 전액 증여 10억: 약 2.63억 ← 최대</li>
                </ul>
                <p className="mt-2 text-xs text-text-tertiary">
                  ※ A·B·C 세 가지 매매 시나리오는 부모 양도세가 시가 10억 동일 적용되어 큰 차이가 없습니다. B·C 차이는
                  취득세와 (소액) 증여세에서 발생. 가장 큰 차이는 D(전액 증여) — 부모는 세금이 없지만 자녀가 2.6억 부담.
                </p>
              </div>
            </section>

            <AdSlot slot="guide-child-house-mid" format="rectangle" />

            {/* 섹션 4: 자금출처 조사 */}
            <section className="mb-10">
              <h2 className="mb-4 text-2xl font-bold text-text-primary">
                4. 자금출처 조사 — 국세청의 무기
              </h2>
              <p className="mb-4 text-text-primary">
                매매로 처리하려면 <strong>자녀가 실제로 자금을 냈다는 증거</strong>가 필수입니다. 국세청은
                국세기본법 §14 실질과세 원칙에 따라 거래 전후 자금 흐름을 철저히 추적합니다.
              </p>

              <div className="mb-6 space-y-3">
                <div className="rounded-lg bg-bg-card p-4">
                  <p className="mb-2 font-bold text-text-primary">① 조사 시점: 거래 6개월~1년 전</p>
                  <p className="text-sm text-text-secondary">
                    자녀 명의 통장에 충분한 자금이 축적되어 있어야 합니다. 거래 1개월 전에 부모 계좌에서
                    갑자기 이체되면 의심받습니다.
                  </p>
                </div>

                <div className="rounded-lg bg-bg-card p-4">
                  <p className="mb-2 font-bold text-text-primary">② 자금 출처 증명</p>
                  <p className="text-sm text-text-secondary">
                    자녀 명의 통장에 들어온 돈이 어디서 왔는지 추적됩니다. 근로소득(급여 입금), 사업소득,
                    이전 저축, 대출 등이 모두 기록되어야 합니다.
                  </p>
                </div>

                <div className="rounded-lg bg-bg-card p-4">
                  <p className="mb-2 font-bold text-text-primary">③ 부모 → 자녀 송금 여부</p>
                  <p className="text-sm text-text-secondary">
                    거래 직전 부모 계좌에서 자녀 계좌로의 송금이 드러나면 "실제는 부모의 자금을 자녀가
                    사용한 것"으로 재과세될 수 있습니다. 가능하면 최소화해야 합니다.
                  </p>
                </div>

                <div className="rounded-lg bg-bg-card p-4">
                  <p className="mb-2 font-bold text-text-primary">④ 대출 구조 점검</p>
                  <p className="text-sm text-text-secondary">
                    자녀가 은행 대출을 받았다면 그 대출 약정서, 심사서, 원금 입금 증명이 모두 기록되어야
                    합니다. 대출 상환 근거(근로소득, 사업소득)도 명확해야 합니다.
                  </p>
                </div>
              </div>

              <div className="rounded-lg bg-danger/5 p-4">
                <p className="font-bold text-danger">⚠️ 국세청 조사의 현실</p>
                <p className="mt-2 text-text-primary">
                  국세청이 "거래가 7억이지만 실제는 부모가 자금을 제공했다"고 판단하면, 전체 10억을
                  증여로 재과세합니다. 그러면 증여세는 약 2.25억까지 올라갑니다. 더하여 가산세(20%)와
                  미납 기간 중 이자까지 청구되므로, 최종 납부액은 3억을 넘을 수 있습니다.
                </p>
              </div>
            </section>

            {/* 섹션 5: 매매 시 입증 자료 */}
            <section className="mb-10">
              <h2 className="mb-4 text-2xl font-bold text-text-primary">
                5. 매매로 인정받기 위한 입증 자료
              </h2>
              <p className="mb-4 text-text-primary">
                국세청 조사에 대비하려면 다음 서류를 철저히 보관해야 합니다:
              </p>

              <div className="space-y-3">
                <div className="flex gap-3 rounded-lg bg-bg-card p-4">
                  <span className="flex-shrink-0 font-bold text-primary">1.</span>
                  <div>
                    <p className="font-bold text-text-primary">자녀 명의 계좌 거래 내역 (6개월~1년)</p>
                    <p className="text-sm text-text-secondary">
                      급여 입금, 이자 수익, 보너스 등 정상 소득이 꾸준히 들어오는 증거
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 rounded-lg bg-bg-card p-4">
                  <span className="flex-shrink-0 font-bold text-primary">2.</span>
                  <div>
                    <p className="font-bold text-text-primary">자녀 명의 대출 약정서 및 원금 입금증</p>
                    <p className="text-sm text-text-secondary">
                      은행 또는 보험사 대출을 받은 경우, 약정서, 심사서, 원금 이체증 일괄
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 rounded-lg bg-bg-card p-4">
                  <span className="flex-shrink-0 font-bold text-primary">3.</span>
                  <div>
                    <p className="font-bold text-text-primary">부동산 거래계약서 + 중개사무소 계약</p>
                    <p className="text-sm text-text-secondary">
                      자녀 실명 서명, 신분증 사본, 중개비 영수증 등 실제 거래의 증거
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 rounded-lg bg-bg-card p-4">
                  <span className="flex-shrink-0 font-bold text-primary">4.</span>
                  <div>
                    <p className="font-bold text-text-primary">취득세 납부 증명서 및 등기부등본</p>
                    <p className="text-sm text-text-secondary">
                      자녀가 취득세를 자신의 자금으로 납부했음을 증명. 등기부등본에 자녀 단독 또는 공동
                      소유자 기재
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 rounded-lg bg-bg-card p-4">
                  <span className="flex-shrink-0 font-bold text-primary">5.</span>
                  <div>
                    <p className="font-bold text-text-primary">거래 직후 자녀 명의 통장 기록</p>
                    <p className="text-sm text-text-secondary">
                      대출 원리금 상환, 거래 후 자산 이동 등 자녀가 실제 소유자임을 보여주는 활동 기록
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 rounded-lg bg-bg-card p-4">
                  <span className="flex-shrink-0 font-bold text-primary">6.</span>
                  <div>
                    <p className="font-bold text-text-primary">시가 입증 자료</p>
                    <p className="text-sm text-text-secondary">
                      개별공시지가, 감정평가서(은행 대출용), 유사 주택 시세 자료. 거래가가 시가에 비해
                      합리적임을 증명
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* 섹션 6: 함정 5가지 */}
            <section className="mb-10">
              <h2 className="mb-4 text-2xl font-bold text-text-primary">
                6. 실제 사례에서 나타나는 함정 5가지
              </h2>

              <div className="space-y-4">
                <div className="rounded-lg border-l-4 border-danger bg-danger/5 p-4">
                  <p className="font-bold text-danger">함정 1: 시가를 너무 낮게 책정</p>
                  <p className="mt-2 text-text-primary">
                    부모가 "주택의 시가는 8억"이라고 주장하고 자녀가 8억을 내도, 국세청이 개별공시지가나
                    감정평가로 시가를 10억으로 재산정하면 거래가(8억)가 시가(10억) 대비 20% 할인이 되어
                    저가양수도 판정을 피할 수 있습니다. 하지만 만약 실제 시가가 10억 이상이라 밝혀지면
                    소급하여 증여세를 부과합니다.
                  </p>
                </div>

                <div className="rounded-lg border-l-4 border-danger bg-danger/5 p-4">
                  <p className="font-bold text-danger">함정 2: 거래 직전 부모 → 자녀 송금</p>
                  <p className="mt-2 text-text-primary">
                    거래 1개월 전에 부모가 3억을 자녀 계좌로 이체했다면, 국세청은 "자녀가 낸 3억은 실제로
                    부모로부터 받은 것"이라고 보아 전체 거래를 증여로 재과세할 가능성이 높습니다. 자녀
                    자금이라는 증거력이 약해지기 때문입니다.
                  </p>
                </div>

                <div className="rounded-lg border-l-4 border-danger bg-danger/5 p-4">
                  <p className="font-bold text-danger">함정 3: 양도세와 증여세 동시 부과</p>
                  <p className="mt-2 text-text-primary">
                    저가양수도로 판정되면 부모는 양도세(시가 기준), 자녀는 증여세(차액 기준)를 각각 납부하게
                    됩니다. 부모가 "자녀가 저가로 사간 것"이라고 생각하면 안 됩니다. 부모도 시가 기준 양도세
                    10억을 기초로 계산해야 하므로 절세 효과가 완전히 무효화됩니다.
                  </p>
                </div>

                <div className="rounded-lg border-l-4 border-danger bg-danger/5 p-4">
                  <p className="font-bold text-danger">함정 4: 대출금 착각</p>
                  <p className="mt-2 text-text-primary">
                    자녀가 은행 대출을 받았다고 해서 자금이 자신의 것이 되는 것은 아닙니다. 국세청은 "대출을
                    받을 수 있는 근거"를 조사합니다. 근로소득이 없거나 신용등급이 낮은 자녀가 갑자기 대액
                    대출을 받으면 의심받습니다. 특히 부모가 대출을 보증한 경우 "실제 자금 출처는 부모"로
                    판단할 수 있습니다.
                  </p>
                </div>

                <div className="rounded-lg border-l-4 border-danger bg-danger/5 p-4">
                  <p className="font-bold text-danger">함정 5: 명의신탁 적발</p>
                  <p className="mt-2 text-text-primary">
                    거래 후 실제로는 부모가 관리하거나 수익을 거두는 경우, 명의신탁으로 적발될 수 있습니다.
                    등기부등본상 자녀 소유이지만 실제로는 부모가 통제한다면, 증여 이후에도 "실질 소유자는
                    부모"로 보아 종합부동산세나 추가 증여세가 부과될 수 있습니다.
                  </p>
                </div>
              </div>
            </section>

            {/* 섹션 7: 의사결정 표 */}
            <section className="mb-10">
              <h2 className="mb-4 text-2xl font-bold text-text-primary">
                7. 증여 vs 매매 의사결정 표
              </h2>
              <div className="overflow-x-auto rounded-lg border border-border-base">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-bg-card">
                      <th className="px-3 py-2 text-left font-bold text-text-primary">비교 항목</th>
                      <th className="px-3 py-2 text-left font-bold text-text-primary">정상 매매</th>
                      <th className="px-3 py-2 text-left font-bold text-text-primary">저가 매매<br/>(30% 할인)</th>
                      <th className="px-3 py-2 text-left font-bold text-text-primary">증여</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t border-border-base">
                      <td className="px-3 py-2 font-bold text-text-primary">자금출처 입증</td>
                      <td className="px-3 py-2 text-text-secondary">필수 (강함)</td>
                      <td className="px-3 py-2 text-text-secondary">필수 (강함)</td>
                      <td className="px-3 py-2 text-danger">불필요</td>
                    </tr>
                    <tr className="border-t border-border-base bg-bg-card">
                      <td className="px-3 py-2 font-bold text-text-primary">세금 계산 난이도</td>
                      <td className="px-3 py-2 text-text-secondary">중 (양도세)</td>
                      <td className="px-3 py-2 text-text-secondary">높음 (양도+증여)</td>
                      <td className="px-3 py-2 text-text-secondary">중 (증여세)</td>
                    </tr>
                    <tr className="border-t border-border-base">
                      <td className="px-3 py-2 font-bold text-text-primary">자녀의 취득가</td>
                      <td className="px-3 py-2 text-text-secondary">거래가 (10억)</td>
                      <td className="px-3 py-2 text-text-secondary">거래가 (7억)</td>
                      <td className="px-3 py-2 text-text-secondary">시가 (10억)</td>
                    </tr>
                    <tr className="border-t border-border-base bg-bg-card">
                      <td className="px-3 py-2 font-bold text-text-primary">자녀의 향후 양도세</td>
                      <td className="px-3 py-2 text-text-secondary">양도차익 적음</td>
                      <td className="px-3 py-2 text-text-secondary">양도차익 최소</td>
                      <td className="px-3 py-2 text-danger">양도차익 최대 (취득가 10억)</td>
                    </tr>
                    <tr className="border-t border-border-base">
                      <td className="px-3 py-2 font-bold text-text-primary">이월과세</td>
                      <td className="px-3 py-2 text-text-secondary">없음</td>
                      <td className="px-3 py-2 text-text-secondary">없음</td>
                      <td className="px-3 py-2 text-text-secondary">10년 (장특공제 제한)</td>
                    </tr>
                    <tr className="border-t border-border-base bg-bg-card">
                      <td className="px-3 py-2 font-bold text-text-primary">이번 세금 총액 (근사)</td>
                      <td className="px-3 py-2 text-text-secondary font-bold">약 9,400만</td>
                      <td className="px-3 py-2 text-green-600 font-bold">약 7,602만 ⭐</td>
                      <td className="px-3 py-2 text-danger font-bold">약 2.63억</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <AdSlot slot="guide-child-house-low" format="fluid" />

            {/* 섹션 8: FAQ */}
            <section className="mb-10">
              <h2 className="mb-4 text-2xl font-bold text-text-primary">
                자주 묻는 질문 (FAQ)
              </h2>
              <FaqSection items={FAQ_ITEMS} />
            </section>

            {/* 섹션 9: 신고 절차 */}
            <section className="mb-10">
              <h2 className="mb-4 text-2xl font-bold text-text-primary">
                8. 신고 절차 및 기한
              </h2>
              <p className="mb-4 text-text-primary">
                결정한 방식에 따라 신고 절차와 기한이 달라집니다:
              </p>

              <div className="space-y-4">
                <div className="rounded-lg bg-bg-card p-4">
                  <p className="mb-2 font-bold text-text-primary">✓ 매매 선택 시</p>
                  <ul className="space-y-1 text-sm text-text-secondary">
                    <li>• 부모: 양도소득세 신고 (거래 다음해 5월 31일 기한)</li>
                    <li>• 자녀: 취득세 신고 (거래 후 60일 이내, 등기 전 필수)</li>
                    <li>• 부동산 중개사무소가 신고 대행 (통상적)</li>
                  </ul>
                </div>

                <div className="rounded-lg bg-bg-card p-4">
                  <p className="mb-2 font-bold text-text-primary">✓ 증여 선택 시</p>
                  <ul className="space-y-1 text-sm text-text-secondary">
                    <li>
                      • 자녀: 증여세 신고 (증여일 속하는 달 말일 + 3개월 이내, 예: 1월 증여 → 4월 30일)
                    </li>
                    <li>• 자녀: 증여취득세 신고 (거래 후 60일 이내)</li>
                    <li>
                      • 신고기한 내 자진신고 시 신고세액공제 3% 가능 (상증법 §68)
                    </li>
                  </ul>
                </div>

                <div className="rounded-lg bg-danger/5 p-4">
                  <p className="font-bold text-danger">⚠️ 신고 기한 초과 시 페널티</p>
                  <ul className="mt-2 space-y-1 text-sm text-text-primary">
                    <li>• 무신고가산세: 40% (신고 없이 적발)</li>
                    <li>• 과소신고가산세: 10% (신고했으나 부족)</li>
                    <li>• 납부 불성실 이자: 연 2.7% (월 0.225%)</li>
                    <li>• 합산하면 최종 납부액이 30~50% 이상 증가할 수 있음</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* 섹션 10: 정리 및 권장 */}
            <section className="mb-10">
              <h2 className="mb-4 text-2xl font-bold text-text-primary">
                결론: 어느 선택이 최적인가?
              </h2>
              <p className="mb-4 text-text-primary">
                4가지 시나리오를 종합하면, <strong>저가양수도 30%·3억 룰의 경계선에서 매매하는 것이
                가장 현실적</strong>입니다.
              </p>

              <div className="space-y-3">
                <div className="rounded-lg bg-bg-card p-4">
                  <p className="font-bold text-text-primary">1. 시가 매매 (10억)</p>
                  <p className="mt-1 text-sm text-text-secondary">
                    → 가장 안전하나 자녀 취득세(약 3,300만)가 큼. 부모 양도세 약 6,062만. 총 약 9,400만.
                  </p>
                </div>

                <div className="rounded-lg bg-primary/10 p-4">
                  <p className="font-bold text-primary">2. 30% 할인 미만 매매 (안전 영역)</p>
                  <p className="mt-1 text-sm text-text-primary">
                    → 차액이 시가의 30% 미만이면서 3억 미만(예: 7.1억 거래)이면 정상 매매로 인정 + 증여세 0. 자녀
                    취득세도 절감되어 가장 효율적. 자녀 자금 6개월~1년 사전 축적 필수.
                  </p>
                </div>

                <div className="rounded-lg bg-bg-card p-4">
                  <p className="font-bold text-text-primary">3. 50% 할인 매매</p>
                  <p className="mt-1 text-sm text-text-secondary">
                    → 저가양수도 확정. 차감액 3억 적용으로 증여세는 약 2,000만으로 작지만, 자녀 취득가가 5억으로
                    낮게 인식되어 향후 양도 시 양도차익 증가 → 미래 양도세 부담. 총 약 8,612만.
                  </p>
                </div>

                <div className="rounded-lg bg-bg-card p-4">
                  <p className="font-bold text-text-primary">4. 전액 증여</p>
                  <p className="mt-1 text-sm text-text-secondary">
                    → 자금출처 증명 불필요. 자녀 세부담 최대 약 2.63억(1세대1주택 특례 시 약 2.43억) + 이월과세 10년
                    적용으로 향후 양도 시 추가 부담.
                  </p>
                </div>
              </div>

              <div className="mt-6 rounded-lg bg-highlight/10 p-4">
                <p className="font-bold text-text-primary">최종 권고:</p>
                <p className="mt-2 text-text-primary">
                  <strong>"자녀의 자금 능력과 국세청의 실질과세 원칙을 고려하여 30% 할인 매매 또는
                  정상 매매를 선택하세요."</strong> 단, 반드시 세무사와 사전 상담하여 자녀 자금 출처
                  입증 방안을 철저히 준비한 후 거래를 진행하십시오. 거래 후에는 모든 서류를 7년 이상
                  보관해야 국세청 조사에 대응할 수 있습니다.
                </p>
              </div>
            </section>

            {/* 관련 계산기 */}
            <section className="mb-10">
              <h2 className="mb-4 text-2xl font-bold text-text-primary">
                관련 계산기
              </h2>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/calculator/capital-gains-tax/"
                    className="text-primary hover:underline"
                  >
                    양도소득세 계산기 — 부모의 양도세 정확하게 계산
                  </Link>
                </li>
                <li>
                  <Link href="/guide/temporary-two-houses-capital-gains-exemption/" className="text-primary hover:underline">
                    일시적 2주택 양도세 비과세 가이드 — 양도 시점 차이와 보유 기간
                  </Link>
                </li>
                <li>
                  <Link href="/calculator/acquisition-tax/" className="text-primary hover:underline">
                    취득세 계산기 — 자녀의 취득세 미리 확인
                  </Link>
                </li>
                <li>
                  <Link href="/guide/burden-gift-debt-assumption-tax/" className="text-primary hover:underline">
                    부담부증여 양도+증여세 완벽 정리 — 채무 인수 시 세금 계산
                  </Link>
                </li>
                <li>
                  <Link href="/guide/inheritance-tax-10-year-prior-gift-aggregation/" className="text-primary hover:underline">
                    상속세 10년 기증여 합산 가이드 — 증여 후 발생할 상속세 고려
                  </Link>
                </li>
              </ul>
            </section>

            {/* 면책조항 */}
            <section className="mb-10 rounded-lg border border-border-base bg-bg-card p-4">
              <p className="mb-3 text-sm font-bold text-text-primary">면책조항</p>
              <p className="text-xs text-text-secondary">
                본 가이드는 참고용 교육 자료이며 법적 효력이 없습니다. 모든 세금 계산은 실제 거래
                조건(시가 평가 방식, 부양가족 여부, 기타 특례 적용)에 따라 달라질 수 있으므로, 반드시
                세무사, 국세청 콜센터(1577-0571), 또는 관할 세무서의 공식 상담을 받으시기 바랍니다.
              </p>
            </section>

            {/* 업데이트 로그 */}
            <div className="text-xs text-text-secondary">
              <p className="font-bold">업데이트 로그</p>
              <ul className="mt-1 space-y-0.5">
                <li>• 2026-05-12: 초판 발행 (저가양수도 30%·3억 룰, 4가지 시나리오)</li>
              </ul>
            </div>
          </article>

          <ShareButtons url={URL} title="자녀 주택 증여 vs 매매 비교 2026" />
        </main>
      </div>

      <Footer />

      {/* JSON-LD 마크업 */}
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildWebPageJsonLd({
          url: URL,
          name: '자녀 주택 증여 vs 매매 비교 2026',
          description: metadata.description as string,
          datePublished: DATE_PUBLISHED,
          dateModified: DATE_MODIFIED,
        })) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableLd) }}
      />
    </>
  );
}
