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

const URL = 'https://calculatorhost.com/guide/credit-card-income-deduction-2026/';
const DATE_PUBLISHED = '2026-07-03';
const DATE_MODIFIED = '2026-07-03';

export const metadata: Metadata = {
  title: '신용카드 소득공제 2026 | 공제율 15~40%, 한도 300만+추가300만',
  description:
    '2026년 신용카드 등 사용금액 소득공제 완벽 정리. 신용카드 15%, 체크·현금영수증 30%, 전통시장·대중교통 40% 공제율, 총급여별 한도(기본 300만/250만 + 추가 300만/200만), 전통시장·대중교통·문화비 추가한도까지. 조세특례제한법 §126의2 기준.',
  keywords: [
    '신용카드 소득공제',
    '신용카드 공제율',
    '신용카드 한도',
    '조세특례제한법 126조의2',
    '전통시장 한도',
    '대중교통 한도',
    '추가한도',
    '연말정산',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '신용카드 소득공제 2026 | 공제율·한도 완벽 정리' }],
    title: '신용카드 소득공제 2026 — 공제율 15~40%, 기본+추가한도 활용법',
    description: '카드 사용액이 총급여의 25% 초과분부터 소득공제. 신용카드 15%, 체크카드 30%, 전통시장·대중교통 40% 공제율. 추가한도(전통시장·대중교통·문화비 300만원)로 절세 극대화.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '신용카드 소득공제 2026 — 기본+추가한도 총 600만원까지 공제',
    description: '신용카드 15%, 체크카드 30%, 전통시장 40% 공제율. 총급여 7천만 이하 기본 300만 + 추가 300만. 계산법과 전략까지.',
  },
};

const FAQ_ITEMS = [
  {
    question: '신용카드 소득공제의 기본 원리가 무엇인가요?',
    answer:
      '신용카드 등 사용금액 소득공제는 조세특례제한법 §126의2에 따른 제도로, 신용카드·체크카드·현금영수증 사용액의 일부를 종합소득금액에서 공제하는 것입니다. 다만 총급여의 25%를 초과하는 사용분만 대상이 됩니다. 예를 들어 총급여 4천만원이면 기준액은 1천만원이고, 카드 사용액이 1,500만원이면 초과분 500만원만 공제 대상입니다(공제율 추가 적용).',
  },
  {
    question: '신용카드와 체크카드의 공제율이 다르다고 했는데, 정확히 얼마인가요?',
    answer:
      '네, 조세특례제한법 §126의2에 따라 신용카드는 15%, 체크카드·현금영수증·선불카드는 30%의 공제율이 적용됩니다. 같은 100만원 사용이어도 신용카드는 15만원, 체크카드는 30만원이 공제되는 차이가 있습니다. 따라서 절세 관점에서는 체크카드 사용이 유리합니다.',
  },
  {
    question: '전통시장과 대중교통 사용분이 특별한가요?',
    answer:
      '네, 전통시장·대중교통·도서·신문·영화관람료·공연·박물관·미술관·수영장·체력단련장 사용분은 40%의 특별 공제율이 적용됩니다. 단, 총급여 7천만원을 초과하는 경우 이 40% 항목들(문화체육 항목)이 제외될 수 있으므로 주의가 필요합니다.',
  },
  {
    question: '연간 공제 한도가 정확히 얼마인가요?',
    answer:
      '총급여 7천만원 이하면 기본 한도 300만원, 7천만원 초과면 250만원입니다(조세특례제한법 §126의2). 여기에 전통시장·대중교통·문화체육 사용분에 대한 추가 한도가 더해집니다. 총급여 7천만원 이하는 이들 항목 합산 최대 300만원까지 추가되어 기본과 합쳐 최대 600만원, 7천만원 초과는 전통시장·대중교통 합산 최대 200만원이 추가되어 최대 450만원까지 공제받을 수 있습니다(문화체육 항목은 7천만원 초과 시 제외).',
  },
  {
    question: '기본한도와 추가한도는 어떻게 다르게 계산되나요?',
    answer:
      '기본한도는 신용카드·체크카드·현금영수증 전체 사용액의 공제율(15~40%)을 적용하되 한도 내에서 공제하는 것입니다. 추가한도는 전통시장·대중교통·문화·체육 사용분에만 별도로 적용되는 것으로, 이들 항목의 공제액이 추가한도를 초과할 때만 작동합니다. 예를 들어 기본한도만으로 200만원 공제받고, 전통시장 사용분으로 추가 150만원을 받으면 기본200+추가150=350만원이 됩니다.',
  },
  {
    question: '신용카드 소득공제가 2028년까지만 유지된다고 했는데, 이후는 어떻게 되나요?',
    answer:
      '조세특례제한법 §126의2는 일몰 기한이 2028년 12월 31일입니다. 현재로서는 2029년 이후 제도 존속 여부가 정해지지 않았습니다. 국회가 기한 연장 또는 폐지를 결정할 때까지는 2028년 이후 신용카드 소득공제가 적용되지 않을 가능성이 있습니다. 정책 동향을 주시해야 합니다.',
  },
  {
    question: '의료비·보험료·세금·교육비 같은 항목도 공제받을 수 있나요?',
    answer:
      '신용카드 소득공제의 제외 항목이 정해져 있습니다. 의료비·보험료·세금·공과금·교육비(학비)·아파트 관리비·전기·가스·수도·통신비·유료도로 통행료 등은 공제 대상이 아닙니다. 또한 환불·취소분은 공제율을 다시 계산해야 하므로 연말에 정확히 정산하는 것이 중요합니다.',
  },
];

export default function CreditCardIncomeDeduction2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '신용카드 소득공제 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '신용카드 소득공제 2026 — 공제율 15~40%, 기본+추가한도로 600만원까지 공제',
    description:
      '신용카드·체크카드·현금영수증 사용금액의 소득공제. 공제율(신용카드 15%, 체크카드 30%, 전통시장·대중교통 40%), 기본한도(7천만 이하 300만/초과 250만원) + 추가한도(7천만 이하 300만/초과 200만원), 계산법과 전략까지 완전 정리.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['신용카드 소득공제', '공제율', '한도', '체크카드', '전통시장', '2026'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '신용카드 소득공제 2026',
    description:
      '신용카드 등 사용금액 소득공제의 공제율·기본한도·전통시장·대중교통·문화체육 추가한도·계산법 완벽 가이드.',
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
                    { name: '신용카드 소득공제 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">직장인 · 10분 읽기 · 2026-07-03</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  신용카드 소득공제 2026
                  <br />
                  <span className="text-2xl text-text-secondary">— 공제율 15~40%, 기본+추가한도 600만원</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  신용카드 사용액이 종합소득금액에서 빠져나가는 소득공제 제도를 정확히 이해하고 있나요? 조세특례제한법 §126의2에 따른 이 제도는 기본한도 외에 추가한도라는 '숨은 혜택'이 있습니다. 신용카드 15%, 체크카드 30%, 전통시장·대중교통 40%의 공제율부터 기본한도(총급여 7천만 이하 300만/초과 250만원)와 추가한도(7천만 이하 300만/초과 200만원), 그리고 전통시장·대중교통·문화비를 통한 절세 전략까지 완벽하게 정리해드립니다.
                </p>
              </header>

              <AdSlot slot="guide-credit-card-income-deduction-top" format="horizontal" />

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">신용카드 소득공제란 무엇인가</h2>
                <p>
                  조세특례제한법 §126의2에 따른 신용카드 등 사용금액 소득공제는 근로소득자가 신용카드·체크카드·현금영수증 등으로 지출한 금액의 일부를 종합소득금액에서 공제하는 제도입니다. 직관적으로 말하면, 카드 사용액을 세금 계산 기초에서 빼주는 것이므로, 같은 연봉이라도 카드를 더 많이 쓸수록 세금이 줄어든다는 뜻입니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">신용카드 소득공제의 기본 구조</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    1단계: 총급여 × 25% = 기준액 (이 금액까지는 공제 대상 아님)
                    <br />
                    2단계: 카드 사용액 - 기준액 = 공제 대상액
                    <br />
                    3단계: 공제 대상액 × 공제율(15~40%) = 실제 공제액 (한도 내)
                    <br />
                    예: 총급여 4천만원, 신용카드 사용 1,500만원
                    <br />
                    기준액 = 4,000만 × 25% = 1,000만원
                    <br />
                    공제 대상액 = 1,500만 - 1,000만 = 500만원
                    <br />
                    신용카드 15% 공제 = 500만 × 15% = <strong>75만원</strong> (기본한도 내)
                  </p>
                </div>
                <p className="mt-4">
                  이 제도의 핵심은 '25% 초과분만 공제'라는 점입니다. 즉, 총급여의 사분의 일 정도는 생활비로 자동 인정되고, 그 이상 사용분만 혜택을 받게 됩니다. 또한 카드 종류(신용카드 vs 체크카드)와 사용처(전통시장 vs 일반 소비)에 따라 공제율이 달라지므로, 어디에 쓰느냐도 중요합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">카드 종류별 공제율 (조세특례제한법 §126의2)</h2>
                <p>
                  신용카드 소득공제의 큰 특징은 카드 종류와 사용처에 따라 공제율이 최소 15%에서 최대 40%까지 달라진다는 점입니다. 따라서 어떤 카드를 어디에 사용하느냐가 절세 효과에 직결됩니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 카드 종류 및 사용처별 공제율 (조세특례제한법 §126의2, 2026 기준)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">카드 종류 / 사용처</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">공제율</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">특징</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">신용카드 (일반)</td>
                        <td className="p-3"><strong>15%</strong></td>
                        <td className="p-3">가장 낮은 공제율. 모든 신용카드 사용액 적용</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">체크카드·현금영수증·선불카드</td>
                        <td className="p-3"><strong>30%</strong></td>
                        <td className="p-3">신용카드의 2배. 절세에 유리</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">전통시장 (신용·체크 모두)</td>
                        <td className="p-3"><strong>40%</strong></td>
                        <td className="p-3">정부 지원 전통시장 활성화. 최고 공제율</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">대중교통 (신용·체크 모두)</td>
                        <td className="p-3"><strong>40%</strong></td>
                        <td className="p-3">지하철·버스·기차·선박. 환경 정책 취지</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">도서·신문·영화·공연·박물관·미술관·수영장·체력단련장</td>
                        <td className="p-3"><strong>40%</strong></td>
                        <td className="p-3">문화체육 소비 장려. 다만 총급여 7천만원 초과 시 제외될 수 있음</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  다만 공제율이 높다고 해서 무조건 절세되는 것은 아닙니다. 기본한도와 추가한도 내에서 차등 공제되므로, 한도를 먼저 계산한 후 어떤 카드·사용처를 우선할지 판단해야 합니다. 또한 2026년 귀속분(2027년 연말정산)부터 이 제도는 2028년 12월 31일까지 3년 연장되었으므로, 그 이후 제도 존속 여부는 국회 결정에 달려 있습니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">기본한도와 추가한도 구조</h2>
                <p>
                  신용카드 소득공제는 단순한 '한도' 하나가 아니라, 기본한도와 추가한도라는 두 층 구조로 이루어져 있습니다. 이를 이해하면 최대 600만원까지 공제받을 수 있습니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 2. 신용카드 소득공제 기본+추가한도 (조세특례제한법 §126의2, 2026)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">총급여 수준</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">기본한도</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">추가한도 대상</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">추가한도액</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">7천만원 이하</td>
                        <td className="p-3"><strong>300만원</strong></td>
                        <td className="p-3">전통시장·대중교통·문화·체육</td>
                        <td className="p-3"><strong>300만원</strong></td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">7천만원 초과</td>
                        <td className="p-3"><strong>250만원</strong></td>
                        <td className="p-3">전통시장·대중교통만</td>
                        <td className="p-3"><strong>200만원</strong></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  기본한도는 모든 카드(신용·체크·현금영수증) 사용액의 공제율을 적용하되 한도 내에서 공제하는 것입니다. 추가한도는 전통시장·대중교통·문화·체육 사용분에만 별도로 적용되는 것으로, 이들 항목의 공제액이 기본한도를 초과할 때 작동합니다.
                </p>
                <p className="mt-4">
                  예를 들어 총급여 6,000만원이고 신용카드만 2,000만원 사용했다면 기본한도 300만원으로 공제됩니다. 하지만 전통시장 카드 사용분이 별도로 200만원이 있다면, 그 200만원 × 40% = 80만원이 추가한도(300만원) 범위 내에서 추가로 공제되므로 기본 300만 + 추가 80만 = 380만원을 받을 수 있습니다.
                </p>
                <p className="mt-4">
                  다만 총급여 7천만원을 초과하면 문화·체육 항목이 추가한도 대상에서 제외됩니다. 이 경우 전통시장과 대중교통만 추가한도(200만원) 대상이 되므로 주의해야 합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">신용카드 소득공제 실제 계산 사례</h2>
                <p>
                  다음 3가지 사례를 통해 신용카드 소득공제가 실제로 어떻게 작동하고 세금 절감 효과가 어느 정도인지 살펴보겠습니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 1. 신용카드만 사용하는 직장인 (총급여 4,000만원)</p>
                  <p className="text-sm text-text-secondary">
                    · 총급여: 4,000만원 (기본한도 300만원 적용)
                    <br />
                    · 25% 기준액: 4,000만 × 25% = 1,000만원
                    <br />
                    · 신용카드 사용액: 1,500만원
                    <br />
                    · 공제 대상액: 1,500만 - 1,000만 = 500만원
                    <br />
                    · 신용카드 15% 공제: 500만 × 15% = 75만원
                    <br />
                    · 최종 공제액: 75만원 (기본한도 300만원 범위 내)
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 연간 소득공제 75만원 › 세금 약 12만원 절감(한계세율 16% 적용 시)</span>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 2. 체크카드 + 전통시장 병행 (총급여 5,500만원)</p>
                  <p className="text-sm text-text-secondary">
                    · 총급여: 5,500만원 (기본한도 300만원, 추가한도 300만원)
                    <br />
                    · 25% 기준액: 5,500만 × 25% = 1,375만원
                    <br />
                    · 체크카드 일반 사용: 2,000만원
                    <br />
                    · 전통시장 사용 (추가한도 대상): 500만원
                    <br />
                    · 기본 공제 대상액: (2,000만 + 500만) - 1,375만 = 1,125만원
                    <br />
                    · 기본 공제액 계산:
                    <br />
                    &nbsp;&nbsp;체크카드 1,125만 × 30% = 337.5만원
                    <br />
                    · 기본한도: 300만원 (초과분 제외)
                    <br />
                    · 추가한도 공제:
                    <br />
                    &nbsp;&nbsp;전통시장 500만 × 40% = 200만원
                    <br />
                    · 최종 공제액: 기본 300만원 + 추가 200만원 = <strong>500만원</strong>
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 기본+추가한도 활용으로 500만원 공제 › 세금 약 80만원 절감</span>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 3. 고소득 직장인 (총급여 8,500만원, 체크카드+전통시장+문화비)</p>
                  <p className="text-sm text-text-secondary">
                    · 총급여: 8,500만원 (기본한도 250만원, 추가한도 200만원 - 문화비 제외)
                    <br />
                    · 25% 기준액: 8,500만 × 25% = 2,125만원
                    <br />
                    · 체크카드 일반: 2,500만원
                    <br />
                    · 전통시장: 600만원 (추가한도 대상)
                    <br />
                    · 기본 공제 대상액: (2,500만 + 600만) - 2,125만 = 975만원
                    <br />
                    · 기본 공제액: 975만 × 30% (평균) = 약 292.5만원
                    <br />
                    · 기본한도: 250만원 적용
                    <br />
                    · 추가한도 공제 (전통시장만):
                    <br />
                    &nbsp;&nbsp;600만 × 40% = 240만원
                    <br />
                    · 추가한도: 200만원 적용
                    <br />
                    · 최종 공제액: 기본 250만원 + 추가 200만원 = <strong>450만원</strong>
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 고소득자도 추가한도(전통시장) 활용으로 450만원 공제 › 세금 약 72만원 절감(한계세율 16%)</span>
                  </p>
                </div>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">신용카드 소득공제의 제외 항목과 주의사항</h2>
                <p>
                  신용카드 소득공제는 모든 지출을 대상으로 하지 않습니다. 정책상 제외되는 항목과 계산 시 주의할 점이 있습니다.
                </p>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li>
                    <strong>제외 항목 — 의료비·보험료:</strong> 질병 치료 의료비, 의약품, 건강검진, 의료기기는 제외됩니다. 별도 의료비 공제 제도가 있으므로 중복 공제를 방지하기 위함입니다. 보험료(의료보험, 암보험, 실손보험 등)도 제외입니다.
                  </li>
                  <li>
                    <strong>제외 항목 — 세금 및 공과금:</strong> 소득세, 부가세, 세금 납부, 지방세, 자동차세, 재산세, 환급금 등 정부 재정과 직결된 항목은 공제 대상이 아닙니다.
                  </li>
                  <li>
                    <strong>제외 항목 — 주거비:</strong> 전기, 가스, 수도, 아파트 관리비, 유료도로 통행료, 통신비(휴대폰, 인터넷) 등 기본 생활요금입니다. 이들은 특성상 생활 필수요소이면서 금액이 고정적이므로 공제 대상에서 제외됩니다.
                  </li>
                  <li>
                    <strong>제외 항목 — 교육비:</strong> 학비·학원비·교육용 도서는 공제 대상이 아닙니다. 대신 자녀세액공제, 교육비 특별공제 등 별도 제도가 있습니다.
                  </li>
                  <li>
                    <strong>환불·취소 처리:</strong> 연중 카드 사용 후 환불을 받으면 공제액도 재계산됩니다. 예를 들어 12월에 100만원 환불을 받으면, 총 사용액에서 100만원을 빼고 공제액을 다시 계산해야 합니다. 환불 시기에 따라 연말정산 시 정산 대상이 될 수 있습니다.
                  </li>
                </ul>
                <p className="mt-4">
                  다만 제외 항목 판정이 모호한 경우가 있습니다. 예를 들어 약국 구매 중 일부(감기약 등 의약품)는 제외되지만 일반 의약품 취급점에서의 구매 구분이 명확하지 않을 수 있습니다. 이런 경우 국세청 상담센터에 문의하거나 연말정산 작성 시 세무사의 조언을 받는 것이 안전합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">신용카드 소득공제 효과 극대화 전략</h2>
                <p>
                  같은 금액을 사용해도 어떤 카드와 어느 장소에서 사용하느냐에 따라 절세 효과가 크게 달라집니다. 다음 전략을 고려하면 소득공제를 효율적으로 활용할 수 있습니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">전략 1. 체크카드 집중 사용</p>
                  <p className="text-sm text-text-secondary">
                    신용카드 15% 공제율보다 체크카드 30% 공제율이 2배 유리합니다. 소비 행동을 크게 바꾸지 않으면서도 같은 금액에 더 많은 공제를 받을 수 있습니다. 특히 생활비(마트, 편의점, 외식)는 신용카드가 아닌 체크카드로 결제하는 습관을 들이면 효과적입니다.
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">전략 2. 전통시장·대중교통 의도적 이용 (추가한도 활용)</p>
                  <p className="text-sm text-text-secondary">
                    40% 공제율 항목은 기본한도 외에 추가한도까지 활용할 수 있습니다. 예를 들어 마트가 아닌 전통시장에서 장을 보거나, 자차 대신 대중교통을 이용하면 환경 친화적이면서도 추가한도를 통한 추가 절세 효과를 누릴 수 있습니다. 총급여 7천만원 이하라면 전통시장·대중교통·문화비 합산 최대 300만원까지 추가 공제받을 수 있습니다.
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">전략 3. 기본+추가한도 균형 배분</p>
                  <p className="text-sm text-text-secondary">
                    기본한도와 추가한도 각각이 정해져 있으므로, 무조건 많이 쓴다고 절세되지 않습니다. 자신의 기본한도(기본 300만 또는 250만원)를 먼저 채운 후, 추가한도(추가 300만 또는 200만원)를 전통시장·대중교통·문화비에 집중하는 것이 전략입니다. 예를 들어 기본한도 300만원에서 신용카드로 200만원 공제받았다면, 남은 100만원 중 추가한도에 할당하고 나머지는 전통시장 카드로 채우는 식입니다.
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">전략 4. 가족 카드 활용</p>
                  <p className="text-sm text-text-secondary">
                    본인 이름 카드 외에 배우자 명의 카드를 개설해 사용하면, 배우자의 한도까지 추가로 공제를 받을 수 있습니다. 예를 들어 맞벌이 부부각각 한도 300만원이라면, 가족 전체로는 600만원까지 공제 가능합니다. 다만 카드 사용액이 배우자 본인 자산에서 나와야 인정되므로, 형식적 거래는 주의해야 합니다.
                  </p>
                </div>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">신용카드 소득공제와 다른 공제·세액공제와의 관계</h2>
                <p>
                  신용카드 소득공제는 독립적으로 작동하지만, 다른 세제 혜택과 함께 고려해야 합니다.
                </p>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li>
                    <strong>의료비 공제와의 차이:</strong> 신용카드로 의료비를 결제해도 그 의료비 자체는 신용카드 공제 대상에서 제외됩니다. 대신 의료비 공제 제도(총급여의 3% 초과분)를 받을 수 있습니다. 두 제도를 중복으로 받을 수는 없으므로, 어느 것이 더 유리한지 계산해야 합니다.
                  </li>
                  <li>
                    <strong>교육비 공제와의 차이:</strong> 학비를 신용카드로 결제해도 신용카드 공제 대상이 아닙니다. 대신 교육비 특별공제를 받을 수 있습니다.
                  </li>
                  <li>
                    <strong>다른 세액공제와의 관계:</strong> 신용카드 소득공제는 소득공제이므로, 세액공제(자녀세액공제 등)와는 별개의 제도입니다. 두 가지 혜택을 각각 받을 수 있습니다.
                  </li>
                </ul>
              </section>

              <AdSlot slot="guide-credit-card-income-deduction-mid" format="rectangle" />

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
                    <p className="mt-1 text-sm text-text-secondary">신용카드 공제를 반영한 세후 월급을 계산해보세요.</p>
                  </Link>
                  <Link
                    href="/guide/year-end-tax-settlement/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">2026 연말정산 완벽 가이드</div>
                    <p className="mt-1 text-sm text-text-secondary">신용카드 공제를 포함한 연말정산 전 과정 안내.</p>
                  </Link>
                  <Link
                    href="/guide/income-deduction-vs-tax-credit-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">소득공제 vs 세액공제</div>
                    <p className="mt-1 text-sm text-text-secondary">신용카드 공제의 효과를 극대화하는 선택 기준.</p>
                  </Link>
                  <Link
                    href="/guide/personal-deduction-dependent-150-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">부양가족공제 150만원 한도</div>
                    <p className="mt-1 text-sm text-text-secondary">가족 소비를 연결하는 공제 전략.</p>
                  </Link>
                  <Link
                    href="/guide/medical-expense-tax-credit-3-percent-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">의료비 세액공제 3% 한도</div>
                    <p className="mt-1 text-sm text-text-secondary">의료비와 신용카드 공제 최적 활용법.</p>
                  </Link>
                  <Link
                    href="/category/tax/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">모든 세금 계산기 및 가이드</div>
                    <p className="mt-1 text-sm text-text-secondary">소득세·양도세·취득세·재산세 완전 정리.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 교육 목적으로 작성되었으며, 개인 맞춤형 세무 조언이 아닙니다. 신용카드 소득공제의 정확한 계산, 기본한도·추가한도 판정, 제외 항목 판정, 개인 상황 적용은 국세청 상담센터(전화 1330) 또는 세무사·회계사와 상담하시기 바랍니다. 본 콘텐츠는 2026-07-03을 기준으로 작성되었으며, 조세특례제한법 개정 시 즉시 업데이트됩니다. 신용카드 소득공제의 법적 근거는 <strong>조세특례제한법 §126의2(신용카드 등 사용금액에 대한 소득공제)</strong>이며, 일몰 기한은 2028년 12월 31일입니다. AI 보조 작성 후 운영자 검수 완료.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터 (조세특례제한법)</a>,{' '}
                  <a href="https://www.nts.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">국세청 공식 웹사이트</a>,{' '}
                  <a href="https://easylaw.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">찾기쉬운 생활법령정보 (신용카드 공제)</a>.
                </p>
              </section>

              <ShareButtons
                title="신용카드 소득공제 2026 가이드"
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
