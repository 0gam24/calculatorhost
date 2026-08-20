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

// [revenue-lever: indexing+traffic]
// 2026 세제개편안 대중교통 40% 폐지 이슈 롱테일 신규 색인 + PAA/AI Overview 흡수용 가이드.
const URL = 'https://calculatorhost.com/guide/credit-card-transit-40-percent-abolished-2026-reform/';
const DATE_PUBLISHED = '2026-08-21';
const DATE_MODIFIED = '2026-08-21';

export const metadata: Metadata = {
  title: '신용카드 대중교통 공제 40% 폐지 2026 개편, 15·30% 원위치',
  description:
    '2026-08-03 세제개편안에서 신용카드 대중교통 사용분 우대공제율 40%가 폐지되고 일반 15·30%로 원위치됩니다. 전통시장 40% 유지, 도서공연 확대, 추가공제 한도 축소까지 정리했습니다.',
  keywords: [
    '신용카드 대중교통 소득공제 폐지',
    '2027 대중교통 공제율',
    '2026 세제개편 신용카드',
    '전통시장 40% 공제',
    '도서공연 소득공제',
    '조세특례제한법 126조의2',
    '연말정산 카드공제 개편',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '신용카드 대중교통 공제 40% 폐지 2026 개편' }],
    title: '신용카드 대중교통 공제 40% 폐지, 이제 신용 15%·체크 30%',
    description:
      '2026 세제개편안 정리. 대중교통 우대공제율 40% 폐지, 전통시장 40% 유지, 도서공연 확대, 추가공제 한도 200·100만원으로 축소.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '대중교통 40% 우대공제 폐지, 2027년부터 신용 15%·체크 30% 적용 예정',
    description:
      '조세특례제한법 §126의2 개정 방향과 실수령 시뮬레이션 3가지 사례. 전통시장·도서공연 처리 방식도 함께 정리.',
  },
};

const FAQ_ITEMS = [
  {
    question: '대중교통 우대공제율 40%가 정말 폐지되는 건가요?',
    answer:
      '기획재정부가 2026-08-03 발표한 2026년 세제개편안에 포함된 사항입니다(조세특례제한법 §126의2 개정안). 대중교통 사용분을 우대공제율 40% 대상에서 제외하고, 일반 결제수단 기준으로 되돌리는 안입니다. 즉 신용카드로 결제한 대중교통비는 15%, 체크카드·현금영수증으로 결제한 대중교통비는 30% 공제율이 적용됩니다. 국회 통과 후 확정되며, 개편안 원안대로 시행되면 2027-01-01 이후 사용분부터 적용됩니다.',
  },
  {
    question: '전통시장은 왜 40%가 유지되나요?',
    answer:
      '전통시장 활성화라는 별도의 정책 목적 때문입니다. 대중교통 우대는 유가 급등기에 통근 부담을 낮추려던 목적이었지만, 최근 대중교통 요금 안정과 기후동행카드·K패스 등 별도 지원 체계가 확립되면서 세제 혜택 필요성이 낮아졌다고 보는 시각이 반영됐습니다. 반면 전통시장은 여전히 소상공인 매출 지원이라는 목표가 살아 있어 우대공제율 40%와 추가공제 한도가 유지됩니다.',
  },
  {
    question: '도서공연비는 어떻게 바뀌나요?',
    answer:
      '기존에는 총급여 7천만원 이하 근로자만 도서·공연·박물관·미술관·수영장·체력단련장 사용분에 대해 30% 공제를 받았지만, 개편안은 이 대상을 총급여 7천만원 초과자까지 확대합니다. 다만 확대 대상자의 공제율·한도는 국회 심의 과정에서 조정될 수 있으니 최종 확정 시점에 반드시 재확인해야 합니다. 도서공연 항목 자체는 신용카드·체크카드·현금영수증 결제 모두에 30% 공제율이 적용되며 결제수단에 차등이 없습니다.',
  },
  {
    question: '추가공제 한도가 축소된다는 게 무슨 뜻인가요?',
    answer:
      '전통시장·대중교통·도서공연 사용분은 기본 공제한도(총급여의 20% 또는 300만원 중 적은 금액)를 초과하더라도 추가공제 한도까지 별도로 인정됩니다. 개편안은 이 추가공제 한도를 총급여 7천만원 이하 300만원에서 200만원으로, 7천만원 초과 200만원에서 100만원으로 각각 축소합니다. 즉 전통시장을 많이 이용하더라도 인정받는 총액이 100만원가량 줄어드는 셈입니다.',
  },
  {
    question: '언제부터 적용되나요?',
    answer:
      '개편안 원안대로 통과된다면 2027-01-01 이후 사용분부터 적용됩니다. 즉 2026년 사용분(2027년 초 연말정산)까지는 현행 대중교통 40% 우대율이 그대로 유지되며, 2027년 사용분(2028년 초 연말정산)부터 신용 15%·체크 30%로 낮아집니다. 국회 통과 시점과 부칙에 따라 시행일이 미뤄지거나 세부 조건이 달라질 수 있으니 국세청 연말정산 안내문을 확인하세요.',
  },
  {
    question: '기본 공제 요건인 총급여 25% 초과 조건도 바뀌나요?',
    answer:
      '이번 개편안에는 기본 최저사용액 요건(총급여의 25% 초과분부터 공제 대상 인정)에 대한 변경은 포함돼 있지 않습니다. 즉 총급여 5,000만원 근로자라면 여전히 연간 카드 사용액 1,250만원을 초과한 부분부터만 공제 대상입니다. 이 요건은 조세특례제한법 §126의2에 규정된 오랜 골격으로, 대중교통 우대율 폐지와는 독립적으로 유지됩니다.',
  },
  {
    question: '기후동행카드·K패스 환급과 세제 혜택이 겹치면 손해인가요?',
    answer:
      '두 제도는 성격이 다릅니다. 기후동행카드·K패스는 지자체·국토교통부가 요금 자체를 환급·마일리지로 돌려주는 지출 지원이고, 신용카드 소득공제는 국세청이 과세표준을 낮춰주는 세제 혜택입니다. 다만 카드로 대중교통비를 결제한 뒤 K패스 환급을 받은 경우 국세청은 순사용액을 기준으로 공제한다고 안내한 사례가 있으므로, 실제 공제 신고 시에는 홈택스 연말정산 간소화 자료의 대중교통비 항목을 그대로 인용하는 것이 안전합니다.',
  },
  {
    question: '지금 카드 소비를 바꿔야 하나요?',
    answer:
      '2026년 사용분까지는 현행 40% 우대가 유효하므로 즉시 소비 패턴을 바꿀 필요는 없습니다. 다만 2027년 이후를 대비한다면, 대중교통비 결제 수단을 신용카드에서 체크카드·현금영수증으로 옮기면 15% 대신 30% 공제율을 확보할 수 있습니다. 또 도서공연 소비가 있는 고소득자라면 개편 확정 시 신규로 혜택을 받게 되니 관련 지출을 카드로 결제하고 영수증을 남기는 습관이 유용합니다.',
  },
];

export default function CreditCardTransit40PercentAbolished2026ReformPage() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '신용카드 대중교통 공제 40% 폐지 2026 개편' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '신용카드 대중교통 공제 40% 폐지, 2026 세제개편안 총정리',
    description:
      '2026-08-03 세제개편안 기준. 대중교통 우대공제율 40% 폐지·전통시장 40% 유지·도서공연 확대·추가공제 한도 축소 4가지 축을 사례 계산과 함께 정리.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['신용카드 소득공제', '대중교통 40% 폐지', '2026 세제개편', '도서공연 확대', '추가공제 한도'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '신용카드 대중교통 공제 40% 폐지 2026 개편',
    description:
      '2026년 세제개편안의 신용카드 소득공제 변경 4가지 축을 정리한 실무 가이드.',
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
                    { name: '신용카드 대중교통 공제 40% 폐지 2026 개편' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">직장인·통근 근로자 · 8분 읽기 · 2026-08-21</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  신용카드 대중교통 공제 40% 폐지
                  <br />
                  <span className="text-2xl text-text-secondary">2026 세제개편안, 이제 신용 15%·체크 30%</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  기획재정부가 2026-08-03 발표한 세제개편안에 신용카드 소득공제 우대율 조정이 담겼습니다. 그동안 대중교통·전통시장·도서공연에 공통 적용되던 우대공제율 40%가 대중교통에서만 폐지되고, 신용카드 15%·체크카드 30%라는 일반 공제율로 되돌아갑니다. 개편안이 국회를 통과하면 2027-01-01 이후 사용분부터 적용됩니다. 이 가이드는 개편 4가지 축을 사례 계산과 함께 정리했습니다.
                </p>
              </header>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">무엇이 바뀌나 (핵심 요약)</h2>
                <p>
                  2026 세제개편안이 손대는 지점은 신용카드 소득공제(조세특례제한법 §126의2)의 우대공제율과 추가공제 한도, 두 축입니다. 결제수단별 기본 공제율(신용 15%·체크 30%)은 그대로이고, 어떤 사용처에 몇 %를 얹어줄지, 그리고 얹어주는 총액 한도를 얼마로 할지가 바뀝니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">개편 4가지 축</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    · 대중교통 사용분 우대공제율 40% 폐지, 신용 15%·체크 30% 원위치
                    <br />
                    · 전통시장 사용분 40% 우대공제율은 유지
                    <br />
                    · 도서·공연·박물관·미술관·수영장·체력단련장 공제, 총급여 7천만원 초과자에게도 확대
                    <br />
                    · 추가공제 한도, 7천만 이하 300만원 → 200만원, 7천만 초과 200만원 → 100만원으로 축소
                  </p>
                </div>
                <p>
                  기본 요건(총급여 25% 초과분부터 공제 인정)과 항목별 기본 공제율은 손대지 않습니다. 즉 대중교통비 자체가 공제 대상에서 빠지는 것이 아니라, 우대 가산분만 사라지는 구조입니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">Q. 대중교통 40% 우대율, 이제 몇 %가 되나요</h2>
                <p>
                  결제한 카드 종류에 따라 15% 또는 30%가 적용됩니다. 이는 조세특례제한법 §126의2가 규정하는 결제수단별 기본 공제율과 동일한 값입니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 대중교통 사용분 공제율 변화 (조세특례제한법 §126의2 개정안)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">결제수단</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">현행 (2026년 사용분까지)</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">개편안 (2027년 사용분부터)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">신용카드</td>
                        <td className="p-3"><strong>40%</strong></td>
                        <td className="p-3">15%</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">체크카드·직불카드</td>
                        <td className="p-3"><strong>40%</strong></td>
                        <td className="p-3">30%</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">현금영수증</td>
                        <td className="p-3"><strong>40%</strong></td>
                        <td className="p-3">30%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p>
                  주의: 신용카드로 대중교통비를 결제해 온 근로자는 공제율이 25%포인트 낮아지는 셈입니다. 반면 체크카드·현금영수증 이용자는 10%포인트 낮아지는 데 그쳐 상대적 손해가 적습니다. 2027년을 대비해 통근용 카드를 체크카드로 옮기는 전략이 유효한 이유입니다.
                </p>
                <p>
                  다만 추가공제 한도(뒤에서 설명)에서 대중교통 항목이 통째로 빠지므로, 결국 대중교통 사용액은 기본 공제한도 안에서만 승부해야 합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">Q. 전통시장은 왜 40%가 유지되나요</h2>
                <p>
                  전통시장 사용분은 이번 개편에서도 40% 우대공제율과 추가공제 한도가 모두 유지됩니다. 정책 목적이 대중교통과 다르기 때문입니다. 대중교통은 유가·요금 급등에 따른 통근 부담 완화가 원래 취지였지만, 기후동행카드·K패스 등 별도 지원 체계가 정착되면서 세제 지원 필요성이 약해졌다는 것이 기획재정부 설명입니다.
                </p>
                <p>
                  반면 전통시장은 소상공인 매출 지원이라는 별도의 정책 목표가 살아 있고, 카드 소비를 대형마트가 아닌 전통시장으로 유도하는 유인 자체가 여전히 유효하다는 판단입니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">2027년 이후 우대공제율 40% 대상 항목</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    · 전통시장 사용분 (유지)
                    <br />
                    · 대중교통 사용분 (폐지, 15%·30%로 원위치)
                    <br />
                    · 도서·공연·박물관·미술관·수영장·체력단련장 사용분은 원래 30%로, 40% 우대 대상이 아니었습니다.
                  </p>
                </div>
                <p>
                  다만 전통시장 결제라도 유흥주점·사행업소 등 소득공제 배제 업종은 여전히 인정되지 않으니, 결제 대상이 실제 전통시장 등록 업소인지 국세청 홈택스에서 확인하는 습관이 필요합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">도서공연비 공제 확대, 7천만 초과자도 대상</h2>
                <p>
                  현행 도서·공연·박물관·미술관·수영장·체력단련장 사용분 공제(공제율 30%)는 총급여 7,000만원 이하 근로자로 대상이 제한되어 있습니다. 2026 세제개편안은 이 소득요건을 삭제하고 총급여 7,000만원 초과자에게도 문화비 공제를 열어줍니다. 다만 확대 대상자의 최종 공제율·한도는 국회 심의 단계에서 조정될 수 있어, 현재로선 확대 방향만 확정된 상태로 봐야 합니다.
                </p>
                <p>
                  대상 시설이 넓다는 점도 기억해 둘 만합니다. 서점 도서 결제뿐 아니라 뮤지컬·연극·클래식 공연 티켓, 박물관·미술관 입장료, 국세청 지정 수영장·체력단련장 이용료가 모두 포함됩니다. 결제수단은 신용카드·체크카드·현금영수증 모두 인정되고 공제율은 동일합니다.
                </p>
                <p>
                  주의: 문화비 항목은 국세청이 지정한 사업자에서 결제해야만 소득공제 자료로 잡힙니다. 지정 업체 여부는 홈택스 문화비 소득공제 조회 화면에서 확인할 수 있습니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">추가공제 한도 축소, 얼마나 줄어드나</h2>
                <p>
                  전통시장·대중교통·도서공연 사용분은 기본 공제한도(총급여의 20% 또는 300만원 중 적은 금액)를 이미 다 채웠더라도, 그 위에 별도의 추가공제 한도까지 인정됩니다. 이 추가공제 한도가 이번에 크게 줄어듭니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 2. 추가공제 한도 축소 (조세특례제한법 §126의2 개정안)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">총급여</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">현행 추가공제 한도</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">개편안</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">7,000만원 이하</td>
                        <td className="p-3">300만원</td>
                        <td className="p-3"><strong>200만원</strong></td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">7,000만원 초과</td>
                        <td className="p-3">200만원</td>
                        <td className="p-3"><strong>100만원</strong></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3">
                  <p className="font-semibold text-text-primary">사례 1. 총급여 5,000만원, 신용카드 대중교통 300만원</p>
                  <p className="text-sm text-text-secondary">
                    · 현행: 대중교통 300만원 × 40% = <strong>120만원</strong> 공제
                    <br />
                    · 개편안: 대중교통 300만원 × 15% = <strong>45만원</strong> 공제 + 추가공제 한도에서도 제외
                    <br />
                    <span className="text-xs text-text-tertiary">차액 약 75만원의 공제 축소. 과세표준 15% 구간이면 세액으로 약 11만원 손실.</span>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3">
                  <p className="font-semibold text-text-primary">사례 2. 총급여 6,000만원, 전통시장 250만원 + 도서 100만원</p>
                  <p className="text-sm text-text-secondary">
                    · 현행: 전통시장 250만 × 40% + 도서 100만 × 30% = 100만 + 30만 = <strong>130만원</strong> (한도 300만원 안)
                    <br />
                    · 개편안: 항목별 공제액은 130만원 그대로, 추가공제 한도가 200만원으로 줄어도 130만원 &lt; 200만원이라 영향 없음
                    <br />
                    <span className="text-xs text-text-tertiary">추가공제가 한도 안에 머무는 소액 지출자는 사실상 무영향.</span>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3">
                  <p className="font-semibold text-text-primary">사례 3. 총급여 6,000만원, 전통시장 500만원 사용</p>
                  <p className="text-sm text-text-secondary">
                    · 현행: 전통시장 500만 × 40% = 200만원, 추가공제 한도 300만원 안 → 200만원 인정
                    <br />
                    · 개편안: 전통시장 500만 × 40% = 200만원, 그러나 추가공제 한도 200만원 상한 → 200만원 인정 (동일)
                    <br />
                    <span className="text-xs text-text-tertiary">단일 항목 소비자는 한도 축소의 영향이 크지 않을 수 있으나, 전통시장·대중교통·도서 합산 시 이야기가 달라집니다.</span>
                  </p>
                </div>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">Q. 언제부터 적용되나요</h2>
                <p>
                  개편안 원안대로 국회를 통과하면 2027-01-01 이후 사용분부터 적용됩니다. 즉 2026년 12월까지의 사용분은 여전히 대중교통 40% 우대율이 유지되고, 2027년 1월 결제분부터 신용 15%·체크 30%로 낮아집니다. 실제 연말정산 시점 기준으로는 2027년 사용분을 2028년 초 연말정산 때 반영하게 됩니다.
                </p>
                <p>
                  다만 국회 심의 과정에서 시행일이 뒤로 미뤄지거나 부칙에 예외 조항이 붙을 수 있습니다. 매년 연말정산을 앞두고 국세청이 배포하는 연말정산 종합안내와 홈택스 공제항목 안내문을 확인하는 것이 가장 확실합니다.
                </p>
              </section>

              <section className="space-y-6 border-t border-border-base pt-8" data-speakable>
                <h2 className="text-2xl font-bold">다만, 개편안이 국회에서 수정될 가능성</h2>
                <p>
                  세제개편안은 기획재정부 발표 이후 정부 심의, 국무회의 의결, 국회 기획재정위원회·법제사법위원회 심의, 본회의 통과라는 여러 단계를 거칩니다. 매년 12월 초에 세법개정안이 최종 확정되는 것이 통상적인 절차입니다.
                </p>
                <p>
                  과거 사례를 보면 정부 원안이 그대로 통과된 해도 있지만, 야당·경제단체·시민단체의 반발로 우대공제율 폐지 시점이 늦춰지거나 폐지 폭이 완화된 사례도 있습니다. 대중교통 우대율 폐지 역시 통근 부담 증가를 우려하는 목소리가 나올 수 있는 대목이라, 원안 그대로 확정되리라 단정하기는 이릅니다.
                </p>
                <p>
                  실무적으로는 2026년 사용분까지는 현행 규정을 그대로 따르되, 2026년 12월 세법개정안 통과 시점에 대중교통 항목 처리 방향을 재확인하는 것이 안전합니다. 홈택스 연말정산 미리보기와 국세청 보도자료를 함께 살피면 개편 확정 여부를 놓치지 않을 수 있습니다.
                </p>
              </section>

              <h2 className="text-2xl font-bold mb-6">자주 묻는 질문</h2>
              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h3 className="text-lg font-semibold text-text-primary">관련 계산기 및 가이드</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link
                    href="/guide/credit-card-income-deduction-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">신용카드 소득공제 2026 완벽 가이드</div>
                    <p className="mt-1 text-sm text-text-secondary">기본 공제율·최저사용액·한도 등 골격부터 다시 정리.</p>
                  </Link>
                  <Link
                    href="/guide/culture-expense-income-deduction-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">도서·공연 문화비 소득공제 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">지정 사업자·결제수단·확대 대상 총정리.</p>
                  </Link>
                  <Link
                    href="/guide/year-end-tax-settlement/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">연말정산 완전 가이드</div>
                    <p className="mt-1 text-sm text-text-secondary">간소화 자료·인적공제·세액공제 준비 순서.</p>
                  </Link>
                  <Link
                    href="/guide/business-credit-card-hometax-registration-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">사업용 카드 홈택스 등록</div>
                    <p className="mt-1 text-sm text-text-secondary">개인사업자가 카드 경비를 인정받는 절차.</p>
                  </Link>
                  <Link
                    href="/calculator/salary/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">연봉 실수령액 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">세후 월급과 4대보험 원천징수액 시뮬레이션.</p>
                  </Link>
                  <Link
                    href="/category/tax/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">모든 세금 가이드</div>
                    <p className="mt-1 text-sm text-text-secondary">양도세·취득세·상속세·소득세 카테고리 허브.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 교육 목적으로 작성되었으며, 개인 맞춤형 세무 조언이 아닙니다. 2026년 세제개편안은 국회 심의 결과에 따라 최종 조문·시행일·부칙이 달라질 수 있으며, 실제 적용 시점의 공제율·한도·대상은 반드시 국세청 홈택스와 연말정산 종합안내를 통해 재확인하세요. 본 콘텐츠는 2026-08-21을 기준으로 작성되었고, 조세특례제한법 개정 확정 시 즉시 업데이트됩니다. 인용 법조항: <strong>조세특례제한법 §126의2 (신용카드등 사용금액에 대한 소득공제)</strong>. AI 보조 작성 후 운영자 검수 완료.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터</a>,{' '}
                  <a href="https://www.moef.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">기획재정부 세제개편안 발표</a>,{' '}
                  <a href="https://www.hometax.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">국세청 홈택스</a>,{' '}
                  <a href="https://www.nts.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">국세청 연말정산 안내</a>.
                </p>
              </section>

              <ShareButtons
                title="신용카드 대중교통 공제 40% 폐지 2026 개편 가이드"
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
