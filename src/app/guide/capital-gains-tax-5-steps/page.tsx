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

const URL = 'https://calculatorhost.com/guide/capital-gains-tax-5-steps/';
const DATE_PUBLISHED = '2026-05-06';
const DATE_MODIFIED = '2026-05-06';

export const metadata: Metadata = {
  title: '양도소득세 계산 5단계 가이드 2026 | 1세대1주택 vs 일시적2주택 | calculatorhost',
  description:
    '양도소득세를 정확히 계산하는 5단계. 취득가부터 과세표준까지, 1세대1주택 비과세 조건·일시적2주택 중과세까지 완벽 정리. 소득세법 §55 기준.',
  keywords: [
    '양도소득세',
    '양도세 계산',
    '주택 양도세',
    '1세대1주택 비과세',
    '일시적2주택',
    '장기보유특별공제',
    '과세표준',
  ],
  alternates: { canonical: URL },
  openGraph: {
    title: '양도소득세 계산 5단계 가이드 2026',
    description: '1세대1주택부터 일시적2주택 중과세까지. 정확한 계산 5단계 및 절세 팁.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
};

const FAQ_ITEMS = [
  {
    question: '1세대1주택이면 양도세가 완전히 면제되나요?',
    answer:
      '조건부입니다. ① 보유 기간 2년 이상 ② 양도가 12억원 이하 ③ 1세대명의 1채만 해당. 만약 부부합산 2채 소유 후 1채 양도하면 1세대1주택 비과세 불가능. 또한 기숙사·임대용 주택은 1세대1주택이 아닙니다. 정확히는 국세청 "양도소득세 계산기" 또는 세무사와 상담하세요.',
  },
  {
    question: '일시적2주택이 되는 조건은?',
    answer:
      '신주택 구입 후 구주택 양도 시 신주택 취득일부터 2년 이내 구주택을 팔면 일시적2주택이 아닌 1세대1주택으로 인정받을 수 있습니다(소득세법 §94②). 다만 조정지역·투기지역이면 6개월로 단축. 기간을 초과하면 2주택 이상 보유 기간이 발생하여 중과세 대상이 될 수 있습니다.',
  },
  {
    question: '장기보유특별공제를 받으려면?',
    answer:
      '3년 이상 보유 시 공제율 매년 0.2%(최대 10년 이상 6%). 취득가 1억원, 10년 보유 후 양도 시 취득가의 6% = 600만원 공제. 그런데 4년 이상 보유하고 양도시 세율이 낮아지므로, 꼭 장기공제보다는 누진세율 구간 차이가 더 중요합니다.',
  },
  {
    question: '취득가와 양도가 모두 명확하지 않으면?',
    answer:
      '국세청이 정한 공시가격(주택공시법) 또는 감정가를 기준으로 합니다. 예를 들어 30년 전 구입해서 매입가 증명서가 없으면, 당시 공시가격을 국세청에 조회하여 취득가로 인정받을 수 있습니다. 다만 공시가가 실제 매매가보다 훨씬 낮은 경우가 많으므로 부동산 중개인 확인 필수.',
  },
  {
    question: '양도세와 취득세를 둘 다 내야 하나요?',
    answer:
      '네. 취득세는 새 주택 구입 시 발생(매수자 부담), 양도세는 기존 주택 판매 시 발생(매도자 부담). 1세대1주택 비과세는 양도세만 면제이고, 취득세는 감면 혜택(예: 1주택 1.0~3.0%)만 있습니다. 양도세 계산과 취득세 계산은 별개이므로 둘 다 확인하세요.',
  },
  {
    question: '선물거래(선물채 공시가) vs 실제 매매가, 어느 것이 양도가?',
    answer:
      '실제 지불한 금액이 양도가입니다. 부동산 거래계약서의 실제 매매금액을 기준으로 하고, 이를 증명하는 서류(계약서, 통장 입금 증명)가 필요합니다. 선물 공시가는 세무조사 시 실제 거래액과 차이가 크면 과소신고 혐의가 될 수 있으니, 가급적 명확한 가격으로 계약하세요.',
  },
  {
    question: '동시중도금 전환은 취득가에 포함되나요?',
    answer:
      '네. 취득가는 ① 매매가(계약금+중도금+잔금) + ② 세금(등록세) + ③ 부대비용(중개수수료, 양도세, 이전등기료 등은 제외). 중도금 대출을 후에 동시중도금으로 전환해도 그 금액은 취득가에 포함됩니다.',
  },
];

export default function CapitalGainsTax5StepsPage() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '양도소득세 계산 5단계 가이드' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '양도소득세 계산 5단계 가이드 (2026)',
    description:
      '양도소득세를 정확히 계산하는 5단계. 취득가 → 양도가 → 기간 → 세율 → 최종세액까지 완벽 정리.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['양도소득세', '양도세', '주택', '세율', '계산'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '양도소득세 계산 5단계 가이드 2026',
    description:
      '양도소득세를 명확히 이해하고 정확하게 계산하는 방법. 1세대1주택 비과세부터 일시적2주택 중과세까지.',
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
                    { name: '양도소득세 계산 5단계 가이드' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">부동산 거래자 · 10분 읽기 · 2026-05-06</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  양도소득세 계산 5단계
                  <br />
                  <span className="text-2xl text-text-secondary">— 1세대1주택부터 중과세까지</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  주택 판매 시 내야 할 양도소득세를 정확히 계산하는 것은 생각보다 복잡합니다. 취득가와 양도가, 보유 기간, 조정지역 여부에 따라
                  세율이 완전히 달라집니다. 이 가이드는 당신이 내야 할 정확한 양도세를 계산하는 5단계를 체계적으로 설명합니다.
                </p>
              </header>

              <AdSlot slot="guide-cg-tax-top" format="horizontal" />

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">1단계: 취득가와 양도가 확인</h2>
                <p>
                  양도소득은 <strong>양도가 − 취득가</strong>로 계산합니다. 취득가는 ① 주택 매매계약금·중도금·잔금 ② 등록세(구주택의 경우) ③
                  중개수수료, 선물료, 이전등기료 등 부대비용입니다. 양도가는 실제 판매 계약서의 총 금액입니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">예시 계산</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    2015년 취득가 3억 (계약금 1억 + 중도금 1억 + 잔금 1억, 세금 제외)
                    <br />
                    2026년 양도가 5.5억원
                    <br />
                    <strong>양도소득 = 5.5억 − 3억 = 2.5억</strong>
                  </p>
                </div>
              </section>

              <section className="space-y-6">
                <h2 className="text-2xl font-bold">2단계: 보유 기간 확인 — 2년 vs 3년 기준</h2>
                <p>
                  <strong>2년 이상</strong> 보유하면 1세대1주택 비과세 가능성이 있습니다. <strong>3년 이상</strong> 보유하면
                  장기보유특별공제(최대 6%)를 받을 수 있고, 세율도 낮아집니다. 취득일부터 양도일까지 정확히 계산하되, 월 단위로 끝나면
                  그 달까지 계산합니다(예: 2015년 3월 취득 → 2026년 5월 양도 = 약 11년 2개월).
                </p>
              </section>

              <section className="space-y-6">
                <h2 className="text-2xl font-bold">3단계: 1세대1주택 비과세 여부 판정</h2>
                <p>
                  다음 조건을 <strong>모두 만족</strong>해야 비과세입니다:
                </p>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li>보유 기간 2년 이상</li>
                  <li>양도 당시 1세대 1채만 소유 (배우자 포함)</li>
                  <li>양도가 12억원 이하</li>
                  <li>거주 기간 중 임대료 수취 없음 (자가거주 주택)</li>
                </ul>
                <p className="mt-4">
                  만약 조건을 만족하면 <strong>양도세 0원</strong>입니다. 만족하지 않으면 다음 단계로 진행합니다.
                </p>
              </section>

              <section className="space-y-6">
                <h2 className="text-2xl font-bold">4단계: 조정지역 및 중과세 여부 확인</h2>
                <p>
                  1세대1주택 비과세가 안 되면 <strong>보유 주택 수와 조정지역 여부</strong>에 따라 세율이 달라집니다:
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <thead>
                      <tr className="border-b border-border-base">
                        <th className="text-left p-2 font-semibold">상황</th>
                        <th className="text-left p-2 font-semibold">기본 세율</th>
                        <th className="text-left p-2 font-semibold">중과 여부</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-2">1세대 2주택, 보유 1년 이상</td>
                        <td className="p-2">누진세율 적용</td>
                        <td className="p-2">—</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-2">조정지역 2주택</td>
                        <td className="p-2">기본세율 + 20%p</td>
                        <td className="p-2">중과</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-2">조정지역 3주택 이상</td>
                        <td className="p-2">기본세율 + 30%p</td>
                        <td className="p-2">중과</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  <strong>일시적2주택</strong>: 신주택 구입 후 2년 내 구주택 양도 시 1세대1주택으로 인정 가능(조정지역 6개월, 투기지역 1개월).
                </p>
              </section>

              <AdSlot slot="guide-cg-tax-mid" format="rectangle" />

              <section className="space-y-6">
                <h2 className="text-2xl font-bold">5단계: 과세표준 및 세액 계산</h2>
                <p>
                  <strong>과세표준 = 양도소득 − 장기보유특별공제</strong>
                </p>
                <p>
                  장기보유특별공제는 취득가의 일정 비율로, 보유 기간에 따라 달라집니다:
                </p>
                <ul className="space-y-2 ml-6 list-disc text-text-secondary text-sm">
                  <li>3년 이상: 0.2% × 년수 (3년 = 0.6%, 최대 6%@10년)</li>
                </ul>
                <p className="mt-4">
                  최종 세액은 <strong>과세표준 × 세율</strong>입니다. 세율은 소득세법 §55의 누진세율이 적용되며, 2주택 이상이거나 조정지역이면
                  20~30%p가 가산됩니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 mt-4">
                  <p className="font-semibold text-text-primary">구체적 예시</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    <strong>1세대1주택 비과세 조건 미충족 사례:</strong>
                    <br />
                    양도소득: 2.5억 / 장기보유공제(11년 6% × 취득가 3억): 1,800만원
                    <br />
                    과세표준: 2.5억 − 0.18억 = 2.32억
                    <br />
                    세율: 과세표준 2.32억 → 소득세법 §55 구간 = 38%
                    <br />
                    <strong>최종 양도소득세 = 2.32억 × 38% − 누진공제액 ≈ 8,000만원</strong>
                  </p>
                </div>
              </section>

              <section className="space-y-6 border-t border-border-base pt-8">
                <h2 className="text-2xl font-bold">절세 팁 3가지</h2>
                <ul className="space-y-4">
                  <li>
                    <strong>1. 1세대1주택 조건 충족 검토:</strong> 배우자와 명의 정리, 보유 기간 2년 이상 확인으로 수천만원 절세 가능.
                  </li>
                  <li>
                    <strong>2. 3년 보유 타이밍:</strong> 2년 11개월과 3년 1개월은 세율 구간이 크게 달라질 수 있음.
                  </li>
                  <li>
                    <strong>3. 취득가 증빙 철저:</strong> 30년 전 구입 시 공시가로 취득가 인정받기. 증빙 없으면 소급 불가능.
                  </li>
                </ul>
              </section>

              <h2 className="text-2xl font-bold mb-6">자주 묻는 질문</h2>
              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h3 className="text-lg font-semibold text-text-primary">관련 계산기</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link
                    href="/calculator/capital-gains-tax"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">양도소득세 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">이 가이드에서 배운 내용을 직접 계산해보세요.</p>
                  </Link>
                  <Link
                    href="/calculator/acquisition-tax"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">취득세 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">신규 구매 주택의 취득세를 동시에 계산하세요.</p>
                  </Link>
                  <Link
                    href="/calculator/property-tax"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">재산세 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">매해 납부할 재산세도 미리 계산해보세요.</p>
                  </Link>
                  <Link
                    href="/guide/capital-gains-tax-tips"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">양도세 절세 팁</div>
                    <p className="mt-1 text-sm text-text-secondary">실전 사례로 배우는 양도세 절감 전략.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 교육 목적으로 작성되었으며, 개인 맞춤형 세무 조언이 아닙니다. 실제 양도소득세 신고는
                  세무사·회계사와 상담 후 진행하세요. 본 콘텐츠는 {DATE_MODIFIED}을 기준으로 작성되었으며, 세율 변경 시 즉시 업데이트됩니다.
                  자세한 법조항은 소득세법 §54~§60, 국세청 공시가격 열람, 실거래가 검증을 참고하세요.
                </p>
              </section>

              <ShareButtons
                title="양도소득세 계산 5단계 가이드"
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
