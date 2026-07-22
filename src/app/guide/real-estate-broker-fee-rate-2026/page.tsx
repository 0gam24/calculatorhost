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

const URL = 'https://calculatorhost.com/guide/real-estate-broker-fee-rate-2026/';
const DATE_PUBLISHED = '2026-06-16';
const DATE_MODIFIED = '2026-06-16';

export const metadata: Metadata = {
  title: '주택 중개수수료(중개보수) 요율표 2026 | 매매·전세·월세 상한 | calculatorhost',
  description:
    '부동산 중개수수료 상한요율을 공인중개사법 기준으로 정리했습니다. 주택 매매 6억원 기준 0.4% = 240만원, 전세 3억 기준 0.3%, 월세 환산 계산까지 2026년 최신 정보.',
  keywords: [
    '주택 중개수수료',
    '중개보수 요율',
    '중개비 계산',
    '6억원 중개비',
    '부동산 중개비',
    '매매 중개수수료',
    '전세 중개비',
    '월세 환산',
    '공인중개사법 32조',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '주택 중개수수료 요율표 2026' }],
    title: '주택 중개수수료(중개보수) 요율표 2026',
    description: '공인중개사법 기준 매매·전세·월세 상한요율 완전 정리',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '주택 중개수수료 요율표 2026',
    description: '공인중개사법 §32 매매·전세·월세 상한 정리',
  },
};

const FAQ_ITEMS = [
  {
    question: '6억원 주택 매매 중개수수료는 얼마예요?',
    answer:
      '6억원은 "2억 초과~9억" 구간에 해당하므로 상한요율 0.4%를 적용합니다. 중개수수료 상한액 = 6억 × 0.4% = 240만원입니다. 부가가치세 10%를 별도로 내야 할 수 있으므로 최대 264만원(일반과세)이 될 수 있습니다. 다만 상한요율이며, 협의로 이보다 낮게 결정할 수 있습니다. 공인중개사법 §32 참조.',
  },
  {
    question: '전세 3억원 중개보수는?',
    answer:
      '전세는 임대차로 분류되므로 "1억~6억" 구간의 0.3% 요율이 적용됩니다. 상한액 = 3억 × 0.3% = 90만원입니다. 전세는 매매와 달리 일반적으로 부가세를 추가로 내지 않습니다만, 중개사가 부가세 과세사업자인지 확인 후 협상하세요.',
  },
  {
    question: '월세 보증금 1천만원, 월세 60만원일 때 중개비는?',
    answer:
      '월세 환산액 = 보증금 + (월세 × 100) = 1,000만 + (60만 × 100) = 7,000만원입니다. 이는 "5,000만~1억" 구간(상한요율 0.4%)에 해당하므로 상한액 = 7,000만 × 0.4% = 28만원입니다. 다만 환산액이 5,000만원 미만이면 보증금 + (월세 × 70)으로 재계산합니다.',
  },
  {
    question: '중개수수료 상한요율을 깎을 수 있나요?',
    answer:
      '네, 상한요율은 법적 한도일 뿐 강제사항이 아닙니다. 중개사와 협의해 상한액 이하로 인하받을 수 있습니다. 예를 들어 거래액이 크거나 경기가 침체하면 협상 여지가 있습니다. 다만 공식 인하 기준은 없으므로, 거래 전에 여러 중개사에 문의해 비교하는 것이 좋습니다.',
  },
  {
    question: '부가세가 별도로 붙나요?',
    answer:
      '중개사가 부가가치세 과세사업자인 경우, 중개수수료에 10% 부가세가 추가될 수 있습니다. 예: 240만원 중개비 + 24만원 부가세 = 264만원. 다만 지자체 조례나 중개사의 사업 형태(간이과세 등)에 따라 달라질 수 있으므로, 계약 전에 중개사에 명시적으로 확인하세요.',
  },
  {
    question: '오피스텔·상가는 요율이 다르나요?',
    answer:
      '네, 공인중개사법 시행규칙 §20의 별표에서 오피스텔·상가용 건물은 별도 요율이 정해져 있습니다. 주택(아파트·빌라·단독주택 등)과 달리 0.9% 이상의 높은 요율이 적용될 수 있습니다. 거래 전에 중개사에 건물 용도를 명확히 하고 해당 요율을 확인하세요.',
  },
  {
    question: '중개수수료 규제는 어느 지자체마다 다른가요?',
    answer:
      '공인중개사법 §32는 전국 기준 상한요율을 정합니다만, 지자체(시·도)가 조례로 추가 규제를 할 수 있습니다. 예를 들어 서울시나 경기도는 자체 가이드나 권고안을 내놓을 수 있습니다. 거래하는 지역의 부동산정보센터나 시청 건축과에 최신 규제를 문의하는 것이 정확합니다.',
  },
];

export default function RealEstateBrokerFeeRatePage() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '주택 중개수수료 요율표 2026' },
  ]);

  const articleLd = buildArticleJsonLd({
    headline: '주택 중개수수료(중개보수) 요율표 2026 — 매매·전세·월세 상한',
    description:
      '공인중개사법 §32·시행규칙 §20 기준 주택 매매·임대차 중개수수료 상한요율 완전 정리. 거래금액별 구간·계산법·부가세 포함.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: [
      '주택 중개수수료',
      '중개보수 요율',
      '매매 중개비',
      '전세 중개비',
      '월세 환산',
      '공인중개사법',
    ],
  });

  const webPageLd = buildWebPageJsonLd({
    name: '주택 중개수수료(중개보수) 요율표 2026 — 매매·전세·월세 상한',
    description:
      '공인중개사법 제32조·시행규칙 제20조 기준으로 정확히 정리한 주택 거래 중개수수료 상한요율, 거래금액별 한도액, 월세 환산 공식.',
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
                    { name: '주택 중개수수료 요율표 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">부동산 · 5분 읽기 · 2026-06-16</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  주택 중개수수료(중개보수) 요율표 2026
                  <br />
                  <span className="text-2xl text-text-secondary">— 매매·전세·월세 구간별 상한</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  부동산 거래 시 내야 하는 중개수수료는 공인중개사법 제32조로 상한요율이 정해져 있습니다. 6억원 주택 매매는 0.4%, 3억원 전세는 0.3%, 월세 환산 등 거래 유형별로 요율이 다릅니다. 상한요율이므로 협의로 인하 가능하며, 부가세 여부를 미리 확인해야 합니다. 거래금액별 정확한 계산법을 한눈에 정리합니다.
                </p>
              </header>

              <AdSlot slot="guide-broker-fee-rate-top" format="horizontal" />

              {/* Structured Summary */}
              <div className="space-y-4 rounded-lg border border-border-base bg-bg-card p-4">
                <div>
                  <h3 className="font-bold text-text-primary">정의</h3>
                  <p className="mt-1 text-sm text-text-secondary">
                    중개수수료(중개보수)는 부동산 거래 시 중개 업무를 수행한 공인중개사에게 지급하는 수수료로, 공인중개사법 제32조로 상한요율이 법적으로 정해져 있습니다.
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-text-primary">핵심 수치</h3>
                  <table className="w-full text-sm">
                    <tbody>
                      <tr className="border-t border-border-base">
                        <td className="py-2 text-text-secondary">주택 매매 6억원 기준</td>
                        <td className="py-2 font-semibold text-text-primary">상한 240만원 (0.4%)</td>
                      </tr>
                      <tr className="border-t border-border-base">
                        <td className="py-2 text-text-secondary">주택 전세 3억원 기준</td>
                        <td className="py-2 font-semibold text-text-primary">상한 90만원 (0.3%)</td>
                      </tr>
                      <tr className="border-t border-border-base">
                        <td className="py-2 text-text-secondary">법적 근거</td>
                        <td className="py-2 font-semibold text-text-primary">공인중개사법 §32 · 시행규칙 §20</td>
                      </tr>
                      <tr className="border-t border-border-base">
                        <td className="py-2 text-text-secondary">상한요율 특징</td>
                        <td className="py-2 font-semibold text-text-primary">의무 아님, 협의로 인하 가능</td>
                      </tr>
                      <tr className="border-t border-border-base">
                        <td className="py-2 text-text-secondary">부가세</td>
                        <td className="py-2 font-semibold text-text-primary">별도 (사업자 구분 필요)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div>
                  <h3 className="font-bold text-text-primary">TL;DR</h3>
                  <ul className="mt-2 space-y-1 text-sm text-text-secondary">
                    <li>• 매매/전세/월세 요율이 서로 다르고 거래금액별로 구간 나뉨</li>
                    <li>• 상한액은 법 기준일 뿐, 실제로는 협의로 깎을 수 있음</li>
                    <li>• 월세는 보증금+(월세×100) 환산식으로 거래금액 계산</li>
                    <li>• 부가세 10% 추가 여부는 중개사 과세 형태에 따라 결정</li>
                    <li>• 공인중개사법 §32·시행규칙 §20 기준 적용</li>
                  </ul>
                </div>
              </div>

              {/* Section 1: 주택 매매 중개수수료 */}
              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-text-primary">
                  주택 매매 중개수수료, 거래금액별 상한은?
                </h2>
                <p data-speakable className="text-text-secondary">
                  주택(아파트, 단독주택, 빌라 등) 매매·교환 시 중개수수료 상한요율은 거래금액에 따라 <strong>6개 구간으로 나뉩니다</strong> (공인중개사법 시행규칙 §20 별표).
                </p>

                <table className="w-full border-collapse border border-border-base text-sm">
                  <caption className="mb-2 text-left text-xs font-semibold text-text-secondary">
                    주택 매매·교환 상한요율 (2026년 기준, 공인중개사법 시행규칙 §20)
                  </caption>
                  <thead>
                    <tr className="bg-bg-card">
                      <th className="border border-border-base px-3 py-2 text-left font-semibold text-text-primary">거래금액</th>
                      <th className="border border-border-base px-3 py-2 text-left font-semibold text-text-primary">상한요율</th>
                      <th className="border border-border-base px-3 py-2 text-left font-semibold text-text-primary">상한액</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-border-base px-3 py-2 text-text-primary">5,000만 원 이하</td>
                      <td className="border border-border-base px-3 py-2">0.6%</td>
                      <td className="border border-border-base px-3 py-2 font-semibold">25만원</td>
                    </tr>
                    <tr className="bg-bg-card/50">
                      <td className="border border-border-base px-3 py-2 text-text-primary">5,000만 초과~2억</td>
                      <td className="border border-border-base px-3 py-2">0.5%</td>
                      <td className="border border-border-base px-3 py-2 font-semibold">80만원</td>
                    </tr>
                    <tr>
                      <td className="border border-border-base px-3 py-2 text-text-primary">2억 초과~9억</td>
                      <td className="border border-border-base px-3 py-2">0.4%</td>
                      <td className="border border-border-base px-3 py-2 font-semibold">없음</td>
                    </tr>
                    <tr className="bg-bg-card/50">
                      <td className="border border-border-base px-3 py-2 text-text-primary">9억~12억</td>
                      <td className="border border-border-base px-3 py-2">0.5%</td>
                      <td className="border border-border-base px-3 py-2 font-semibold">없음</td>
                    </tr>
                    <tr>
                      <td className="border border-border-base px-3 py-2 text-text-primary">12억~15억</td>
                      <td className="border border-border-base px-3 py-2">0.6%</td>
                      <td className="border border-border-base px-3 py-2 font-semibold">없음</td>
                    </tr>
                    <tr className="bg-bg-card/50">
                      <td className="border border-border-base px-3 py-2 text-text-primary">15억 이상</td>
                      <td className="border border-border-base px-3 py-2">0.7%</td>
                      <td className="border border-border-base px-3 py-2 font-semibold">없음</td>
                    </tr>
                  </tbody>
                </table>

                <p className="text-text-secondary">
                  예를 들어 <strong>6억원에 매매하는 주택</strong>은 "2억 초과~9억" 구간에 해당하므로:
                </p>

                <ul className="space-y-2 text-sm text-text-secondary">
                  <li>
                    • 상한요율: 0.4%
                  </li>
                  <li>
                    • 상한액 = 6억 × 0.4% = <strong>240만원</strong>
                  </li>
                  <li>
                    • 부가세 10% 추가(과세사업자) = 240만 + 24만 = <strong>264만원</strong>
                  </li>
                </ul>

                <div className="rounded-lg border border-yellow-600/20 bg-yellow-50/10 p-3 text-sm text-text-secondary dark:border-yellow-500/30 dark:bg-yellow-900/10">
                  <p className="mb-1 font-semibold text-text-primary">다만</p>
                  <p>
                    위 상한액은 <strong>상한일 뿐 강제사항이 아닙니다</strong>. 매매인과 중개사 간 협의로 상한액 이하로 인하받을 수 있습니다. 특히 거래액이 크거나 경기가 침체한 경우 협상 여지가 충분합니다. 계약 전에 여러 중개사의 견적을 비교하고, 부가세 포함 여부를 명시적으로 확인하세요.
                  </p>
                </div>
              </section>

              {/* Section 2: 주택 임대차(전세·월세) 중개비 */}
              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-text-primary">
                  전세·월세 중개수수료는 얼마인가요?
                </h2>
                <p data-speakable className="text-text-secondary">
                  주택 임대차(전세, 월세 등) 시 중개수수료는 <strong>매매와 별도 요율</strong>이 적용되며, 역시 공인중개사법 시행규칙 §20 별표로 정해져 있습니다.
                </p>

                <table className="w-full border-collapse border border-border-base text-sm">
                  <caption className="mb-2 text-left text-xs font-semibold text-text-secondary">
                    주택 임대차 상한요율 (전세·월세, 2026년 기준)
                  </caption>
                  <thead>
                    <tr className="bg-bg-card">
                      <th className="border border-border-base px-3 py-2 text-left font-semibold text-text-primary">거래금액(보증금 환산)</th>
                      <th className="border border-border-base px-3 py-2 text-left font-semibold text-text-primary">상한요율</th>
                      <th className="border border-border-base px-3 py-2 text-left font-semibold text-text-primary">상한액</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-border-base px-3 py-2 text-text-primary">5,000만 원 이하</td>
                      <td className="border border-border-base px-3 py-2">0.5%</td>
                      <td className="border border-border-base px-3 py-2 font-semibold">20만원</td>
                    </tr>
                    <tr className="bg-bg-card/50">
                      <td className="border border-border-base px-3 py-2 text-text-primary">5,000만 초과~1억</td>
                      <td className="border border-border-base px-3 py-2">0.4%</td>
                      <td className="border border-border-base px-3 py-2 font-semibold">30만원</td>
                    </tr>
                    <tr>
                      <td className="border border-border-base px-3 py-2 text-text-primary">1억~6억</td>
                      <td className="border border-border-base px-3 py-2">0.3%</td>
                      <td className="border border-border-base px-3 py-2 font-semibold">없음</td>
                    </tr>
                    <tr className="bg-bg-card/50">
                      <td className="border border-border-base px-3 py-2 text-text-primary">6억~12억</td>
                      <td className="border border-border-base px-3 py-2">0.4%</td>
                      <td className="border border-border-base px-3 py-2 font-semibold">없음</td>
                    </tr>
                    <tr>
                      <td className="border border-border-base px-3 py-2 text-text-primary">12억~15억</td>
                      <td className="border border-border-base px-3 py-2">0.5%</td>
                      <td className="border border-border-base px-3 py-2 font-semibold">없음</td>
                    </tr>
                    <tr className="bg-bg-card/50">
                      <td className="border border-border-base px-3 py-2 text-text-primary">15억 이상</td>
                      <td className="border border-border-base px-3 py-2">0.6%</td>
                      <td className="border border-border-base px-3 py-2 font-semibold">없음</td>
                    </tr>
                  </tbody>
                </table>

                <p className="text-text-secondary">
                  예시: <strong>3억원 전세 계약</strong>
                </p>

                <ul className="space-y-2 text-sm text-text-secondary">
                  <li>
                    • 거래금액: 3억원 (보증금)
                  </li>
                  <li>
                    • 구간: "1억~6억" → 상한요율 0.3%
                  </li>
                  <li>
                    • 상한액 = 3억 × 0.3% = <strong>90만원</strong>
                  </li>
                  <li>
                    • 부가세는 일반적으로 추가하지 않음 (중개사 형태별로 다름)
                  </li>
                </ul>

                <div className="rounded-lg border border-yellow-600/20 bg-yellow-50/10 p-3 text-sm text-text-secondary dark:border-yellow-500/30 dark:bg-yellow-900/10">
                  <p className="mb-1 font-semibold text-text-primary">다만</p>
                  <p>
                    전세는 매매보다 요율이 낮지만, <strong>월세는 보증금과 월세를 함께 고려</strong>하여 거래금액을 환산합니다. 상세한 월세 환산 방법은 다음 섹션을 참고하세요.
                  </p>
                </div>
              </section>

              <AdSlot slot="guide-broker-fee-rate-mid" format="rectangle" />

              {/* Section 3: 월세 환산 공식 */}
              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-text-primary">
                  월세(전월세) 중개비는 어떻게 계산하나요?
                </h2>
                <p data-speakable className="text-text-secondary">
                  월세는 보증금과 월세를 합산하여 거래금액으로 환산한 후, 그 환산액에 임대차 상한요율을 적용합니다.
                </p>

                <div className="rounded-lg border-l-4 border-primary-500 bg-bg-card p-4">
                  <h3 className="font-semibold text-text-primary">월세 환산 공식 (공인중개사법 시행규칙 §20)</h3>
                  <p className="mt-2 text-sm text-text-secondary">
                    <code className="block bg-bg-base p-2 text-xs leading-relaxed">
                      환산액 = 보증금 + (월세 × 100)
                    </code>
                  </p>
                  <p className="mt-3 text-xs text-text-secondary">
                    단, <strong>환산액이 5,000만원 미만</strong>일 경우:
                  </p>
                  <p className="text-xs text-text-secondary">
                    <code className="block bg-bg-base p-2 mt-1">
                      환산액 = 보증금 + (월세 × 70)
                    </code>
                  </p>
                </div>

                <p className="text-text-secondary">
                  예를 들어:
                </p>

                <ul className="space-y-3 text-sm text-text-secondary">
                  <li>
                    <strong>보증금 1,000만원 + 월세 60만원:</strong>
                    <br />
                    환산액 = 1,000만 + (60만 × 100) = 7,000만원
                    <br />
                    구간: "5,000만~1억" → 상한요율 0.4% → 상한액 = 7,000만 × 0.4% = 28만원
                  </li>
                  <li>
                    <strong>보증금 2,000만원 + 월세 30만원 (환산액 5,000만 미만):</strong>
                    <br />
                    환산액 = 2,000만 + (30만 × 70) = 4,100만원
                    <br />
                    구간: "5,000만 이하" → 상한요율 0.5% → 상한액 = 20만원 (상한액 적용)
                  </li>
                </ul>

                <div className="rounded-lg border border-yellow-600/20 bg-yellow-50/10 p-3 text-sm text-text-secondary dark:border-yellow-500/30 dark:bg-yellow-900/10">
                  <p className="mb-1 font-semibold text-text-primary">다만</p>
                  <p>
                    월세 환산액이 정확하게 계산되어야 요율 구간이 결정됩니다. 보증금이 높고 월세가 낮으면 환산액이 5,000만원 미만이 될 수 있으므로, <strong>계약 전에 중개사에 정확한 환산액을 확인</strong>하세요. 공식 불명확 시 시청 건축과나 공인중개사협회에 문의하는 것이 안전합니다.
                  </p>
                </div>
              </section>

              {/* Section 4: 부가세와 실제 납부액 */}
              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-text-primary">
                  중개수수료에 부가세가 붙나요?
                </h2>
                <p data-speakable className="text-text-secondary">
                  중개수수료에 부가가치세(VAT)가 붙는지는 <strong>중개사의 과세 형태</strong>에 따라 결정됩니다.
                </p>

                <div className="space-y-3">
                  <div className="rounded-lg border border-border-base bg-bg-card p-4">
                    <h4 className="font-semibold text-text-primary">일반과세사업자</h4>
                    <p className="mt-2 text-sm text-text-secondary">
                      부가세 과세 대상입니다. 중개수수료에 <strong>10% 부가세가 추가</strong>됩니다.
                      <br />
                      예: 240만원 중개비 + 24만원 부가세 = 264만원 총액
                    </p>
                  </div>

                  <div className="rounded-lg border border-border-base bg-bg-card p-4">
                    <h4 className="font-semibold text-text-primary">간이과세사업자 / 면세사업자</h4>
                    <p className="mt-2 text-sm text-text-secondary">
                      부가세를 내지 않습니다. 중개수수료만 지급하면 됩니다.
                    </p>
                  </div>
                </div>

                <p className="text-text-secondary">
                  정확한 부가세 포함 여부는 중개사에 <strong>계약 전에 명시적으로 물어봐야</strong> 합니다. 표준 계약서에 부가세 포함 여부가 명시되어 있는지 꼼꼼히 확인하세요.
                </p>

                <div className="rounded-lg border border-yellow-600/20 bg-yellow-50/10 p-3 text-sm text-text-secondary dark:border-yellow-500/30 dark:bg-yellow-900/10">
                  <p className="mb-1 font-semibold text-text-primary">다만</p>
                  <p>
                    지자체(서울시, 경기도 등)에 따라 중개비 규제나 부가세 처리에 차이가 있을 수 있습니다. 거래 지역의 최신 정책을 확인하고, 중개사와의 계약서에 총 납부액을 명확히 기록하는 것이 분쟁을 예방하는 방법입니다.
                  </p>
                </div>
              </section>

              {/* Section 5: 오피스텔·상가는 다른가 */}
              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-text-primary">
                  오피스텔·상가·토지 중개비는 주택과 다른가요?
                </h2>
                <p data-speakable className="text-text-secondary">
                  네, 오피스텔과 상가용 건물, 토지는 <strong>별도의 높은 요율</strong>이 적용됩니다 (공인중개사법 시행규칙 §20 별표 3·4·5).
                </p>

                <ul className="space-y-2 text-sm text-text-secondary">
                  <li>
                    <strong>오피스텔 · 상가용 건물:</strong> 0.9% 이상 (주택의 1.5~2배 수준)
                  </li>
                  <li>
                    <strong>토지:</strong> 1.0% 이상 (거래 형태별로 다름)
                  </li>
                  <li>
                    <strong>전세금 담보대출, 분양권 등:</strong> 별도 규정 적용
                  </li>
                </ul>

                <p className="text-text-secondary">
                  거래하려는 부동산의 <strong>용도를 정확히 파악</strong>한 후 중개사에 요율을 확인하는 것이 중요합니다. 주택으로 표기되어 있어도 실제로는 오피스텔이거나 상용 건물일 수 있으므로, 등기부등본이나 건축 인허가 정보를 먼저 확인하세요.
                </p>

                <div className="rounded-lg border border-yellow-600/20 bg-yellow-50/10 p-3 text-sm text-text-secondary dark:border-yellow-500/30 dark:bg-yellow-900/10">
                  <p className="mb-1 font-semibold text-text-primary">다만</p>
                  <p>
                    공인중개사법 시행규칙 별표는 시대에 따라 개정될 수 있습니다. 현재(2026년) 기준으로 최신 정보는 <Link href="https://www.kar.or.kr" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">
                      한국공인중개사협회
                    </Link> 또는 국토교통부 고시를 확인하세요.
                  </p>
                </div>
              </section>

              {/* FAQ Section (중간 배치) */}
              <FaqSection items={FAQ_ITEMS} />

              {/* Related Guides */}
              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-text-primary">관련 계산기 & 가이드</h2>
                <div className="grid gap-3 sm:grid-cols-2">
                  <Link
                    href="/calculator/broker-fee/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 transition hover:border-primary-500 hover:bg-bg-card/80"
                  >
                    <h4 className="font-semibold text-primary-500">중개수수료 계산기</h4>
                    <p className="mt-1 text-sm text-text-secondary">
                      거래금액 입력하면 요율·부가세 자동 계산
                    </p>
                  </Link>

                  <Link
                    href="/calculator/acquisition-tax/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 transition hover:border-primary-500 hover:bg-bg-card/80"
                  >
                    <h4 className="font-semibold text-primary-500">취득세 계산기</h4>
                    <p className="mt-1 text-sm text-text-secondary">
                      주택 구매 시 취득세 + 지방교육세 계산
                    </p>
                  </Link>

                  <Link
                    href="/calculator/capital-gains-tax/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 transition hover:border-primary-500 hover:bg-bg-card/80"
                  >
                    <h4 className="font-semibold text-primary-500">양도소득세 계산기</h4>
                    <p className="mt-1 text-sm text-text-secondary">
                      주택 판매 시 세금 계산 (1주택 비과세 포함)
                    </p>
                  </Link>

                  <Link
                    href="/calculator/rent-conversion/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 transition hover:border-primary-500 hover:bg-bg-card/80"
                  >
                    <h4 className="font-semibold text-primary-500">전월세 전환율 계산</h4>
                    <p className="mt-1 text-sm text-text-secondary">
                      보증금 ↔ 월세 환산, 중개비 연동
                    </p>
                  </Link>

                  <Link
                    href="/guide/temporary-two-houses-capital-gains-exemption/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 transition hover:border-primary-500 hover:bg-bg-card/80"
                  >
                    <h4 className="font-semibold text-primary-500">일시적 2주택 양도세</h4>
                    <p className="mt-1 text-sm text-text-secondary">
                      3년 한시 특례 및 세금 계산법
                    </p>
                  </Link>

                  <Link
                    href="/category/real-estate/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 transition hover:border-primary-500 hover:bg-bg-card/80"
                  >
                    <h4 className="font-semibold text-primary-500">부동산 카테고리</h4>
                    <p className="mt-1 text-sm text-text-secondary">
                      모든 부동산 거래 계산기 & 가이드
                    </p>
                  </Link>
                </div>
              </section>

              {/* 면책조항 & AI 표기 */}
              <footer className="border-t border-border-base pt-8 text-xs text-text-tertiary">
                <p className="mb-3">
                  이 가이드는 <strong>2026년 6월 16일</strong> 기준으로 작성되었습니다. 공인중개사법 제32조, 동 시행규칙 제20조 및 국토교통부 고시를 참고하여 정확성을 기했으나, 정책 개정 시 달라질 수 있습니다.
                </p>
                <p className="mb-3">
                  상한요율은 법적 한도일 뿐이며, 실제 중개수수료는 중개사와의 협의로 결정됩니다. 부가세, 지자체 규제, 거래 유형 등에 따라 최종 납부액이 달라질 수 있습니다. 거래 전에 중개사와 <strong>총 납부액을 명시적으로 합의</strong>하고 표준 계약서에 기록하세요.
                </p>
                <p className="mb-3">
                  본 가이드는 <strong>Claude(Anthropic)의 지원을 받아 작성된 후 운영자가 공인중개사법, 국토교통부 공시, 한국공인중개사협회 기준으로 검수</strong>했습니다.
                </p>
                <p>
                  최신 법령 및 지자체 규제는 <Link href="https://www.kar.or.kr" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">
                    한국공인중개사협회
                  </Link>, <Link href="https://law.go.kr" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">
                    국가법령정보센터
                  </Link>, <Link href="https://www.molit.go.kr" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">
                    국토교통부
                  </Link>에서 확인하세요.
                </p>
                <p className="mt-3">
                  © 2026 <Link href="/" className="text-primary-500 underline">
                    calculatorhost.com
                  </Link>
                  . 모든 권리 보유.
                </p>
              </footer>

              <ShareButtons
                title="주택 중개수수료 요율표 2026"
                url={URL}
                description="공인중개사법 기준 매매·전세·월세 상한요율 완전 정리"
              />
            </article>
          </main>
        </div>
        <Footer />
      </div>
    </>
  );
}
