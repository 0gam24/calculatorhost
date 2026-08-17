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

const URL = 'https://calculatorhost.com/guide/securities-transaction-tax-increase-2026/';
const DATE_PUBLISHED = '2026-08-18';
const DATE_MODIFIED = '2026-08-18';
// [revenue-lever: indexing+traffic]

export const metadata: Metadata = {
  title: '증권거래세 인상 2026, 코스피 코스닥 세율 얼마 오르나',
  description:
    '2026년 1월 양도분부터 증권거래세가 오릅니다. 코스피는 거래세 0.05%에 농특세 0.15%를 더해 0.20%, 코스닥은 0.20%로 모두 0.15%에서 0.05%p 인상됩니다. 손익과 무관하게 매도 때마다 붙는 세금, 계산법과 단타 부담까지 정리했습니다.',
  keywords: [
    '증권거래세 2026',
    '증권거래세 인상',
    '코스피 거래세',
    '코스닥 거래세',
    '주식 매도 세금',
    '농어촌특별세',
    '증권거래세법 8조',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '증권거래세 인상 2026, 코스피 코스닥 세율 얼마 오르나' }],
    title: '증권거래세 인상 2026, 코스피 코스닥 모두 0.20%로',
    description: '2026년부터 코스피·코스닥 주식 매도 시 실부담 0.20%. 0.05%p 인상된 세율과 계산법, 단타 부담을 정리했습니다.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '증권거래세 인상 2026, 코스피·코스닥 0.20%',
    description: '2026년 양도분부터 주식 매도 세금이 0.15%에서 0.20%로. 증권거래세법 §8 기준 계산법.',
  },
};

const FAQ_ITEMS = [
  {
    question: '증권거래세가 2026년에 얼마나 오르나요?',
    answer:
      '코스피와 코스닥 모두 실부담 세율이 0.15%에서 0.20%로 0.05%p 오릅니다. 코스피는 증권거래세 0.05%에 농어촌특별세 0.15%가 더해져 0.20%, 코스닥은 증권거래세 0.20%(농특세 없음)로 0.20%입니다. 2026년 1월 1일 이후 양도(매도)하는 분부터 적용됩니다.',
  },
  {
    question: '코스피와 코스닥은 왜 세율 표기가 다른가요?',
    answer:
      '거래세율 자체는 다르지만 투자자가 내는 총부담은 같습니다. 코스피는 증권거래세 0.05%가 낮은 대신 농어촌특별세 0.15%가 별도로 붙어 합계 0.20%가 되고, 코스닥은 농특세 없이 증권거래세 0.20%만 부과됩니다. 결과적으로 두 시장 모두 매도금액의 0.20%를 냅니다.',
  },
  {
    question: '증권거래세는 손해를 봐도 내야 하나요?',
    answer:
      '네, 냅니다. 증권거래세는 이익이 아니라 매도한 거래 자체에 부과되는 세금이라 손절매(손실 확정)를 해도 매도금액을 기준으로 부과됩니다. 양도차익에 매기는 양도소득세와 근본적으로 다른 점입니다.',
  },
  {
    question: '증권거래세는 제가 따로 신고하나요?',
    answer:
      '상장주식은 증권사가 매도 대금에서 자동으로 원천징수해 대신 납부하므로 개인이 따로 신고할 필요가 없습니다. 다만 비상장주식을 장외에서 직접 거래하면 양도일이 속하는 반기 말의 다음다음 달까지 직접 신고·납부해야 합니다.',
  },
  {
    question: '증권거래세와 양도소득세는 무엇이 다른가요?',
    answer:
      '증권거래세는 매도금액에 붙는 거래세로 손익과 무관하게 부과되고, 양도소득세는 이익(양도차익)에만 부과됩니다. 국내 상장주식은 소액주주라면 양도세가 없고 증권거래세만 내지만, 대주주 요건에 해당하거나 해외주식·비상장주식이면 양도소득세가 별도로 발생합니다.',
  },
  {
    question: '해외주식에도 증권거래세가 붙나요?',
    answer:
      '한국 증권거래세는 국내 증권시장에서 거래되는 주식에 부과되므로, 미국·중국 등 해외 상장주식 매도에는 한국 증권거래세가 붙지 않습니다. 대신 해외주식은 양도차익에 대해 양도소득세(22%, 기본공제 250만원)가 별도로 부과됩니다.',
  },
  {
    question: '단타(단기 반복매매)를 하면 세금이 얼마나 늘어나나요?',
    answer:
      '증권거래세는 매도할 때마다 매도금액 기준으로 붙으므로 회전이 잦을수록 누적됩니다. 예를 들어 1억원을 열 번 사고팔면 매도금액 누계가 약 10억원이 되고, 0.20%를 적용하면 약 200만원의 거래세가 발생합니다. 손익과 무관하게 나가는 고정비용이므로 잦은 매매일수록 부담이 커집니다.',
  },
  {
    question: '증권거래세 인상은 언제 결정됐고 근거 법은 무엇인가요?',
    answer:
      '증권거래세 세율은 증권거래세법 §8과 시행령에서 정하며, 농어촌특별세는 농어촌특별세법에 근거합니다. 2026년 인상은 2025년 세법개정으로 확정되어 2026년 1월 1일 이후 양도분부터 시행됩니다. 정확한 시행 시점과 세율은 소관 부처 고시와 법령을 확인하세요.',
  },
];

export default function SecuritiesTransactionTaxIncrease2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '증권거래세 인상 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '증권거래세 인상 2026, 코스피 코스닥 세율 얼마 오르나',
    description:
      '2026년 양도분부터 코스피·코스닥 증권거래세가 실부담 0.20%로 인상. 코스피 거래세 0.05%와 농특세 0.15% 구조, 손익 무관 과세, 단타 부담까지 계산 사례로 정리.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['증권거래세', '코스피', '코스닥', '농어촌특별세', '주식 매도 세금'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '증권거래세 인상 2026',
    description: '2026년 증권거래세 인상 폭과 코스피·코스닥 세율 구조, 계산법 정리.',
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
                    { name: '증권거래세 인상 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">주식 투자자 · 8분 읽기 · 2026-08-18</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  증권거래세 인상 2026
                  <br />
                  <span className="text-2xl text-text-secondary">· 코스피 코스닥 세율 얼마 오르나</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  이 글은 국내 주식을 사고파는 개인 투자자를 위해 2026년부터 오른 증권거래세를 정리한 가이드입니다. 매도할 때마다 손익과 상관없이 빠져나가는 세금이 얼마인지, 코스피와 코스닥이 왜 표기가 다른지, 단타를 할 때 부담이 얼마나 커지는지를 계산 사례로 확인하실 수 있습니다.
                </p>
              </header>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">증권거래세가 2026년에 얼마나 오르나요?</h2>
                <p>
                  코스피와 코스닥 모두 매도금액 대비 실부담이 0.15%에서 0.20%로 0.05%p 올랐습니다. 2026년 1월 1일 이후 양도(매도)하는 분부터 적용됩니다. 증권거래세는 매도 대금 자체에 붙는 세금이라 이익을 봤든 손해를 봤든 매도만 하면 부과됩니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">핵심 요약</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    · 코스피: 증권거래세 0.05% + 농어촌특별세 0.15% = 실부담 0.20%
                    <br />
                    · 코스닥: 증권거래세 0.20% (농특세 없음) = 실부담 0.20%
                    <br />
                    · 적용 시점: 2026년 1월 1일 이후 매도분
                    <br />
                    · 상장주식은 증권사가 매도 시 자동 원천징수 (별도 신고 불필요)
                  </p>
                </div>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">코스피와 코스닥 세율이 왜 다른가요?</h2>
                <p>
                  거래세율 표기는 다르지만 투자자가 실제로 내는 총부담은 두 시장 모두 0.20%로 같습니다. 코스피는 증권거래세를 낮게 매기는 대신 농어촌특별세가 별도로 붙고, 코스닥은 농특세 없이 증권거래세만 부과되기 때문입니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 시장별 증권거래세 실부담 비교 (2025년 대 2026년, 증권거래세법 §8·농어촌특별세법 기준)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">시장</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">2025년 실부담</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">2026년 실부담</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">구성</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">코스피(유가증권)</td>
                        <td className="p-3">0.15%</td>
                        <td className="p-3"><strong>0.20%</strong></td>
                        <td className="p-3">거래세 0.05% + 농특세 0.15%</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">코스닥</td>
                        <td className="p-3">0.15%</td>
                        <td className="p-3"><strong>0.20%</strong></td>
                        <td className="p-3">거래세 0.20% (농특세 없음)</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">코넥스</td>
                        <td className="p-3">0.10%</td>
                        <td className="p-3">0.10%</td>
                        <td className="p-3">거래세 0.10%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  다만 코넥스, 비상장주식 장외거래(약 0.35%), K-OTC 등은 시장별로 세율이 다르므로 정확한 값은 증권거래세법 §8 세율표를 확인하세요. 본 가이드의 계산 사례는 거래가 가장 많은 코스피·코스닥을 기준으로 합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">증권거래세는 어떻게 계산하나요?</h2>
                <p>
                  계산은 단순합니다. 매도금액에 실부담 세율(0.20%)을 곱하면 됩니다. 매수할 때는 붙지 않고 매도할 때만 부과됩니다. 아래 사례로 확인해보세요.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 1. 코스피 주식 1,000만원 매도</p>
                  <p className="text-sm text-text-secondary">
                    · 증권거래세: 1,000만원 × 0.05% = 5,000원
                    <br />
                    · 농어촌특별세: 1,000만원 × 0.15% = 15,000원
                    <br />
                    · 합계: <strong>20,000원</strong> (실부담 0.20%)
                    <br />
                    <span className="text-xs text-text-tertiary">참고: 2025년이었다면 15,000원(0.15%). 2026년에는 5,000원 더 부담.</span>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 2. 코스닥 주식 500만원 매도</p>
                  <p className="text-sm text-text-secondary">
                    · 증권거래세: 500만원 × 0.20% = 10,000원 (농특세 없음)
                    <br />
                    · 합계: <strong>10,000원</strong> (실부담 0.20%)
                    <br />
                    <span className="text-xs text-text-tertiary">참고: 2025년 0.15% = 7,500원. 2026년에는 2,500원 더 부담.</span>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 3. 1억원을 열 번 회전매매(단타)</p>
                  <p className="text-sm text-text-secondary">
                    · 매도금액 누계: 1억원 × 10회 = 10억원
                    <br />
                    · 증권거래세: 10억원 × 0.20% = <strong>200만원</strong>
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 손익과 무관하게 거래세만 200만원. 회전이 잦을수록 고정비용이 누적.</span>
                  </p>
                </div>
                <p className="mt-4">
                  예외: 위 계산은 증권거래세만 따진 것입니다. 실제로는 증권사 매매수수료가 별도로 붙고, 대주주·비상장·해외주식이라면 양도소득세가 추가로 발생할 수 있습니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">증권거래세는 손해를 봐도 내야 하나요?</h2>
                <p>
                  네, 내야 합니다. 증권거래세는 양도차익(이익)이 아니라 매도라는 거래 행위 자체에 부과되는 세금입니다. 따라서 손절매로 손실을 확정해도 매도금액을 기준으로 세금이 부과됩니다.
                </p>
                <p className="mt-4">
                  이 점이 양도소득세와 결정적으로 다릅니다. 양도소득세는 이익이 없으면 세금도 없지만, 증권거래세는 팔기만 하면 붙습니다. 그래서 손실 구간에서 잦은 매매를 반복하면 세금 부담이 손실을 키우는 요인이 될 수 있습니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">증권거래세와 양도소득세는 무엇이 다른가요?</h2>
                <p>
                  둘 다 주식과 관련된 세금이지만 과세 기준이 다릅니다. 아래 표로 성격을 비교했습니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 2. 증권거래세와 주식 양도소득세 비교</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">구분</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">증권거래세</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">양도소득세</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">과세 기준</td>
                        <td className="p-3">매도금액(거래액)</td>
                        <td className="p-3">양도차익(이익)</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">손실 시</td>
                        <td className="p-3">부과됨</td>
                        <td className="p-3">부과 안 됨</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">국내 상장 소액주주</td>
                        <td className="p-3">0.20%</td>
                        <td className="p-3">비과세</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">해외주식</td>
                        <td className="p-3">한국 거래세 없음</td>
                        <td className="p-3">22% (기본공제 250만원)</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">신고 방식</td>
                        <td className="p-3">증권사 자동 원천징수</td>
                        <td className="p-3">본인 신고(반기·연 1회)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  즉 국내 상장주식을 소액으로 매매하는 대부분의 개인은 양도소득세는 없고 증권거래세만 냅니다. 반면 해외주식은 거래세는 없지만 양도소득세가 붙는다는 점을 기억하세요.
                </p>
              </section>

              <section className="space-y-6 border-t border-border-base pt-8">
                <h2 className="text-2xl font-bold">증권거래세는 언제 어떻게 납부하나요?</h2>
                <p>
                  상장주식은 증권사가 매도 대금을 정산할 때 거래세를 원천징수해 대신 납부하므로, 개인이 별도로 신고하거나 챙길 일이 없습니다.
                </p>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li>
                    <strong>상장주식(코스피·코스닥):</strong> 매도 시 증권사가 자동 원천징수. HTS·MTS 거래내역에 거래세가 차감된 정산금액이 표시됩니다.
                  </li>
                  <li>
                    <strong>비상장주식 장외거래:</strong> 양수도 당사자가 직접 신고 대상입니다. 양도일이 속하는 반기의 말일부터 2개월 이내에 신고·납부해야 합니다.
                  </li>
                  <li>
                    <strong>세율 확인:</strong> 시장·종목 성격에 따라 세율이 다르므로 증권거래세법 §8과 시행령의 세율표를 확인하는 것이 안전합니다.
                  </li>
                </ul>
                <p className="mt-4">
                  다만 비상장주식 직접 거래는 세율·신고 절차가 상장주식과 다르고 실수 시 가산세가 붙을 수 있으므로, 금액이 크다면 세무 전문가나 관할 세무서에 확인하는 것이 좋습니다.
                </p>
              </section>

              <h2 className="text-2xl font-bold mb-6">자주 묻는 질문</h2>
              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h3 className="text-lg font-semibold text-text-primary">관련 계산기 및 가이드</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link href="/guide/domestic-stock-major-shareholder-tax-2026/" className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition">
                    <div className="font-semibold text-primary-500">국내주식 대주주 양도세 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">대주주 요건에 걸리면 양도소득세가 붙습니다. 기준을 확인하세요.</p>
                  </Link>
                  <Link href="/guide/overseas-stock-capital-gains-tax-2026/" className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition">
                    <div className="font-semibold text-primary-500">해외주식 양도소득세 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">해외주식은 거래세 대신 양도세 22%. 계산과 신고법.</p>
                  </Link>
                  <Link href="/guide/dividend-income-tax-2026/" className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition">
                    <div className="font-semibold text-primary-500">배당소득세 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">배당금에 붙는 15.4%와 금융소득 종합과세 기준.</p>
                  </Link>
                  <Link href="/guide/etf-tax-domestic-overseas-2026/" className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition">
                    <div className="font-semibold text-primary-500">국내·해외 ETF 세금 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">ETF 종류별 과세 방식 차이를 한눈에.</p>
                  </Link>
                  <Link href="/guide/financial-income-comprehensive-vs-separate-taxation/" className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition">
                    <div className="font-semibold text-primary-500">금융소득 종합과세 vs 분리과세</div>
                    <p className="mt-1 text-sm text-text-secondary">이자·배당 2,000만원 초과 시 종합과세 구조.</p>
                  </Link>
                  <Link href="/category/tax/" className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition">
                    <div className="font-semibold text-primary-500">모든 세금 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">양도세·배당세·종합소득세 계산기 모음.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 교육 목적으로 작성되었으며 개인 맞춤형 세무·투자 조언이 아닙니다. 특정 종목의 매매를 권유하지 않습니다. 증권거래세율과 시행 시점은 개정될 수 있으므로 실제 거래 전 소관 부처 고시와 법령을 확인하세요. 본 콘텐츠는 2026-08-18 기준으로 작성되었으며, 인용 법조항은 <strong>증권거래세법 §8(세율), 농어촌특별세법(농특세 세율)</strong>입니다. 비상장주식·해외주식 과세는 개별 상황에 따라 달라집니다. AI 보조 작성 후 운영자 검수 완료.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터</a>,{' '}
                  <a href="https://www.nts.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">국세청</a>.
                </p>
              </section>

              <ShareButtons
                title="증권거래세 인상 2026 가이드"
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
