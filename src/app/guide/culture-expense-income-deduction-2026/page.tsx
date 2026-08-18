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

const URL = 'https://calculatorhost.com/guide/culture-expense-income-deduction-2026/';
const DATE_PUBLISHED = '2026-08-19';
const DATE_MODIFIED = '2026-08-19';

export const metadata: Metadata = {
  title: '문화비 소득공제 2026, 도서 공연 영화 30% 공제 요건',
  description:
    '총급여 7,000만원 이하 근로자가 도서·공연·영화·박물관·미술관·신문·헬스장 이용료를 신용카드로 결제하면 30%를 문화비 소득공제로 받습니다(조특법 §126의2). 대상·한도·계산과 2026 세제개편안 방향까지 정리했습니다.',
  keywords: [
    '문화비 소득공제',
    '문화비 소득공제 대상',
    '문화비 소득공제 한도',
    '영화 소득공제',
    '헬스장 소득공제',
    '도서 공연 소득공제',
    '조세특례제한법 126조의2',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '문화비 소득공제 2026, 도서 공연 영화 30% 공제 요건' }],
    title: '문화비 소득공제 2026, 도서 공연 영화 30% 공제 요건과 한도',
    description: '총급여 7천만원 이하 근로자의 문화비 결제액 30% 소득공제. 대상 품목, 통합 추가한도, 계산 사례.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '문화비 소득공제 2026, 도서 공연 영화 30% 공제',
    description: '책·공연·영화·헬스장까지 문화비 30% 소득공제. 조특법 §126의2 대상과 한도.',
  },
};

const FAQ_ITEMS = [
  {
    question: '문화비 소득공제는 누가 받을 수 있나요?',
    answer:
      '총급여 7,000만원 이하 근로소득자가 대상입니다(조세특례제한법 §126의2). 신용카드·체크카드·현금영수증 사용액이 총급여의 25%를 넘어야 하고, 그 초과분 중 문화비에 해당하는 금액에 대해 추가로 30%를 공제합니다. 총급여가 7,000만원을 넘으면 문화비 소득공제 대상에서 제외되며, 전통시장·대중교통 사용분만 추가공제 대상이 됩니다.',
  },
  {
    question: '어떤 결제가 문화비로 인정되나요?',
    answer:
      '도서, 공연 티켓, 박물관·미술관 입장료, 종이신문 구독료, 영화 관람료, 수영장·체력단련장(헬스장) 시설이용료입니다. 영화 관람료는 2023년 7월 결제분부터, 헬스장·수영장 등 체육시설 이용료는 2025년 7월 결제분부터 포함됐습니다. 다만 문화비 소득공제 사업자로 등록된 가맹점에서 결제해야 인정되므로, 결제 전 등록 여부를 확인하는 것이 안전합니다.',
  },
  {
    question: '문화비 소득공제율은 얼마인가요?',
    answer:
      '30%입니다. 문화비로 지출한 금액에 30%를 곱한 금액을 소득에서 공제합니다. 신용카드 일반 사용분(15%)이나 체크카드·현금영수증(30%)과 별도로, 문화비는 30% 공제율이 적용됩니다. 다만 문화비 지출도 신용카드 등 전체 사용액이 총급여의 25%를 넘어야 공제가 시작된다는 전제는 동일합니다.',
  },
  {
    question: '문화비 소득공제 한도는 따로 있나요?',
    answer:
      '전통시장·대중교통 사용분과 합산한 추가공제 한도가 적용됩니다. 총급여 7,000만원 이하는 전통시장·대중교통·문화비를 합쳐 최대 300만원까지 추가로 공제받을 수 있습니다. 신용카드 기본공제 한도(총급여 7천만원 이하 300만원)와는 별개의 추가한도입니다. 정확한 한도 적용은 항목별 사용액에 따라 달라지므로 홈택스 연말정산 결과로 확인하세요.',
  },
  {
    question: '문화비 소득공제와 세액공제는 같은 건가요?',
    answer:
      '소득공제입니다. 문화비 소득공제는 과세표준을 낮추는 소득공제이지, 세금을 직접 빼주는 세액공제가 아닙니다. 따라서 절세액은 본인의 세율 구간에 따라 달라집니다. 예를 들어 30만원을 소득공제받으면, 세율 15% 구간인 사람은 약 4만 5천원, 24% 구간인 사람은 약 7만 2천원의 세금이 줄어듭니다.',
  },
  {
    question: '전자책이나 웹툰 결제도 공제되나요?',
    answer:
      '문화비 소득공제 사업자로 등록된 전자책 플랫폼의 도서 결제는 공제 대상입니다. 다만 게임 아이템, 일반 앱 결제, 등록되지 않은 플랫폼의 콘텐츠는 제외됩니다. 같은 도서라도 결제처가 문화비 소득공제 가맹점인지에 따라 공제 여부가 갈리므로, 문화비 소득공제 누리집에서 가맹점 등록 여부를 미리 확인하는 것이 좋습니다.',
  },
  {
    question: '2026 세제개편안으로 문화비 공제가 바뀌나요?',
    answer:
      '개정안이 발표됐지만 아직 확정은 아닙니다. 2026년 8월 3일 발표된 세제개편안에는 도서·공연 등 문화비 추가공제를 확대(총급여 요건 폐지)하고 추가공제 한도를 조정하며, 대중교통 지원을 재정사업으로 전환하는 방향이 담겼습니다. 다만 국회 심의를 거쳐야 확정되고 시행 시기도 별도로 정해지므로, 현재 연말정산에는 현행 규정이 적용됩니다. 최종 내용은 국세청 공지를 확인하세요.',
  },
];

export default function CultureExpenseIncomeDeduction2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '문화비 소득공제 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '문화비 소득공제 2026, 도서 공연 영화 30% 공제 요건',
    description:
      '총급여 7,000만원 이하 근로자의 도서·공연·영화·박물관·미술관·신문·헬스장 이용료 30% 문화비 소득공제. 대상 품목, 통합 추가한도, 계산 사례, 2026 세제개편안 방향까지 조특법 §126의2 기준으로 정리.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['문화비 소득공제', '영화 소득공제', '헬스장 소득공제', '조특법 126조의2', '연말정산'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '문화비 소득공제 2026',
    description:
      '총급여 7,000만원 이하 근로자의 문화비 30% 소득공제 대상·한도·계산법을 정리한 가이드.',
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
                    { name: '문화비 소득공제 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">직장인·문화소비자 · 7분 읽기 · 2026-08-19</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  문화비 소득공제 2026
                  <br />
                  <span className="text-2xl text-text-secondary">· 도서 공연 영화 30% 공제 요건</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  책을 사고 영화를 보고 헬스장에 등록한 돈도 연말정산에서 소득공제를 받을 수 있습니다. 이것이 문화비 소득공제입니다. 이 가이드는 총급여 7,000만원 이하 근로자를 위해, 어떤 결제가 문화비로 인정되는지, 공제율과 한도는 얼마인지, 그리고 2026년 8월 발표된 세제개편안이 무엇을 바꾸려 하는지를 정리했습니다. 취미 지출을 절세로 연결하고 싶은 직장인을 위한 글입니다.
                </p>
              </header>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">문화비 소득공제란 무엇인가요</h2>
                <p>
                  문화비 소득공제는 근로자가 문화생활에 쓴 신용카드 등 결제액의 30%를 소득에서 빼주는 제도입니다(조세특례제한법 §126의2). 신용카드 등 사용금액 소득공제의 한 갈래로, 총급여의 25%를 넘게 쓴 부분 중 문화비에 해당하는 지출에 대해 일반 신용카드보다 높은 30% 공제율을 적용합니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">핵심 요약</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    · 대상: 총급여 7,000만원 이하 근로자
                    <br />
                    · 요건: 신용카드 등 사용액이 총급여의 25% 초과
                    <br />
                    · 공제율: 문화비 지출액의 30%
                    <br />
                    · 한도: 전통시장·대중교통과 합산해 최대 300만원 추가공제 (총급여 7천만원 이하)
                  </p>
                </div>
                <p className="mt-4">
                  다만 이 제도는 소득공제이므로 세금을 직접 깎아주는 것이 아니라 과세표준을 낮춥니다. 절세 효과는 본인의 세율 구간에 비례합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">무엇을 결제해야 공제되나요</h2>
                <p>
                  문화비로 인정되는 품목은 정해져 있습니다. 아래 항목을 문화비 소득공제 가맹점에서 결제해야 인정됩니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 문화비 소득공제 대상 품목과 시행 시점 (조특법 §126의2)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">품목</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">포함 시점</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">도서(전자책 포함), 공연 티켓, 박물관·미술관 입장료</td>
                        <td className="p-3">기존</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">종이신문 구독료</td>
                        <td className="p-3">기존</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">영화 관람료</td>
                        <td className="p-3">2023년 7월 결제분부터</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">수영장·체력단련장(헬스장) 시설이용료</td>
                        <td className="p-3">2025년 7월 결제분부터</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  다만 게임 아이템, 일반 앱 결제, 등록되지 않은 플랫폼의 콘텐츠는 제외됩니다. 헬스장도 시설이용료(회원권)만 대상이고 개인 강습(PT)료 등은 인정되지 않을 수 있으므로, 결제 전 문화비 소득공제 가맹점 여부를 확인하는 것이 안전합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">공제 요건과 한도는 어떻게 되나요</h2>
                <p>
                  두 가지 관문을 통과해야 합니다. 첫째, 총급여 7,000만원 이하여야 하고, 둘째, 신용카드 등 전체 사용액이 총급여의 25%를 넘어야 그 초과분부터 공제가 시작됩니다. 문화비는 이 초과분 중 문화비 지출에 30%를 적용합니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-3 text-sm">
                  정의: 문화비 소득공제는 총급여 7천만원 이하 근로자의 문화비 지출을 30% 공제하는 제도입니다. 핵심: 전통시장·대중교통과 합산 추가한도 최대 300만원 (조특법 §126의2).
                </div>
                <p className="mt-4">
                  추가공제 한도는 문화비만 따로 있는 것이 아니라 전통시장·대중교통 사용분과 합산됩니다. 총급여 7,000만원 이하는 이 세 항목을 합쳐 최대 300만원까지 추가로 공제받습니다. 신용카드 기본공제 한도(총급여 7천만원 이하 300만원)와는 별개입니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">실제로 얼마를 아끼나요</h2>
                <p>
                  문화비 소득공제는 소득공제이므로 절세액은 세율에 따라 달라집니다. 아래 사례로 확인하세요. 신용카드 등 전체 사용액은 이미 총급여의 25%를 넘겼다고 가정합니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 1. 총급여 4,000만원, 문화비 연 100만원</p>
                  <p className="text-sm text-text-secondary">
                    · 문화비 소득공제: 100만 × 30% = <strong>30만원</strong>
                    <br />
                    · 적용 세율(과세표준 15% 구간 가정): 30만 × 15% = <strong>약 4만 5천원</strong> 절세
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 책·영화·헬스장 100만원 지출로 약 4만 5천원의 세금이 줄어듭니다.</span>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 2. 총급여 6,000만원, 문화비 연 200만원</p>
                  <p className="text-sm text-text-secondary">
                    · 문화비 소득공제: 200만 × 30% = <strong>60만원</strong> (추가한도 300만원 내)
                    <br />
                    · 적용 세율(24% 구간 가정): 60만 × 24% = <strong>약 14만 4천원</strong> 절세
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 세율 구간이 높을수록 같은 공제액이라도 절세 효과가 커집니다.</span>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 3. 경계값, 총급여 6,999만원 vs 7,001만원</p>
                  <p className="text-sm text-text-secondary">
                    · 총급여 6,999만원: 문화비 소득공제 <strong>대상</strong>
                    <br />
                    · 총급여 7,001만원: 문화비 소득공제 <strong>제외</strong> (전통시장·대중교통만 추가공제)
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 총급여 7,000만원 선을 경계로 문화비 공제 여부가 완전히 갈립니다.</span>
                  </p>
                </div>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">2026 세제개편안은 무엇을 바꾸려 하나요</h2>
                <p>
                  확정된 것은 아니지만 방향은 나왔습니다. 2026년 8월 3일 발표된 세제개편안에는 도서·공연 등 문화비 추가공제를 확대(총급여 요건 폐지)하는 한편, 대중교통 사용분 추가공제는 재정지원으로 전환하고 추가공제 한도를 하향 조정하는 내용이 포함됐습니다.
                </p>
                <p className="mt-4">
                  다만 이 개편안은 국회 심의를 거쳐야 확정되며, 시행 시기도 별도로 정해집니다. 따라서 지금 진행하는 연말정산(현재 귀속 연도)에는 이 글에서 설명한 현행 규정이 그대로 적용됩니다. 개편안이 국회를 통과하면 총급여 요건이 사라져 고소득자도 문화비 공제를 받을 수 있게 될 가능성이 있으나, 최종 내용과 적용 시점은 국세청 공지로 확인해야 합니다.
                </p>
              </section>

              <section className="space-y-6 border-t border-border-base pt-8">
                <h2 className="text-2xl font-bold">놓치기 쉬운 함정</h2>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li>
                    <strong>가맹점 미등록:</strong> 같은 도서·영화라도 문화비 소득공제 사업자로 등록되지 않은 곳에서 결제하면 공제되지 않습니다. 결제 전 확인이 필요합니다.
                  </li>
                  <li>
                    <strong>25% 문턱 미달:</strong> 신용카드 등 전체 사용액이 총급여의 25%를 넘지 못하면 문화비를 아무리 써도 공제가 시작되지 않습니다.
                  </li>
                  <li>
                    <strong>총급여 초과:</strong> 총급여 7,000만원을 넘으면 문화비 소득공제 대상에서 빠집니다.
                  </li>
                  <li>
                    <strong>한도 합산:</strong> 문화비 단독 한도가 아니라 전통시장·대중교통과 합산한 추가한도이므로, 다른 항목을 많이 썼다면 문화비 공제가 한도에 걸릴 수 있습니다.
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
                    <p className="mt-1 text-sm text-text-secondary">총급여와 세후 월급을 먼저 확인해보세요.</p>
                  </Link>
                  <Link
                    href="/guide/credit-card-income-deduction-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">신용카드 소득공제 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">25% 문턱과 공제율 구조의 기본을 이해하세요.</p>
                  </Link>
                  <Link
                    href="/guide/monthly-rent-tax-credit-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">월세 세액공제 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">문화비와 함께 챙길 대표 연말정산 항목.</p>
                  </Link>
                  <Link
                    href="/guide/income-deduction-vs-tax-credit-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">소득공제 vs 세액공제</div>
                    <p className="mt-1 text-sm text-text-secondary">절세액이 왜 세율에 따라 달라지는지 이해하세요.</p>
                  </Link>
                  <Link
                    href="/guide/year-end-tax-settlement/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">연말정산 기본 가이드</div>
                    <p className="mt-1 text-sm text-text-secondary">공제 항목 전체 흐름을 한 번에 정리.</p>
                  </Link>
                  <Link
                    href="/category/tax/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">모든 세금 가이드</div>
                    <p className="mt-1 text-sm text-text-secondary">소득세·연말정산·양도세 모음.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 교육 목적으로 작성되었으며 개인 맞춤형 세무 조언이 아닙니다. 실제 문화비 소득공제 인정 여부·한도·절세액은 사용 내역과 가맹점 등록 여부에 따라 달라지므로 문화비 소득공제 누리집과 홈택스 연말정산 결과로 확인하세요. 2026 세제개편안 관련 내용은 발표된 개정안이며 국회 통과 전으로 확정 사항이 아닙니다. 본 콘텐츠는 2026-08-19 기준이며 세법 개정 시 업데이트됩니다. 인용 법조항: <strong>조세특례제한법 §126의2(신용카드 등 사용금액에 대한 소득공제)</strong>. AI 보조 작성 후 운영자 검수 완료.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터(조특법 §126의2)</a>,{' '}
                  <a href="https://www.culture.go.kr/deduction/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">문화비 소득공제 누리집</a>,{' '}
                  <a href="https://hometax.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">홈택스 연말정산 간소화</a>.
                </p>
              </section>

              <ShareButtons
                title="문화비 소득공제 2026 가이드"
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
