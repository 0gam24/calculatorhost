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

const URL = 'https://calculatorhost.com/guide/youth-future-savings-account-2026/';
const DATE_PUBLISHED = '2026-06-04';
const DATE_MODIFIED = '2026-06-04';

export const metadata: Metadata = {
  title: '청년미래적금 2026 — 만 19~34세, 월 50만원·기본 5% + 정부기여금 6~12%',
  description:
    '청년미래적금 2026 조건, 금리, 정부기여금을 정리했습니다. 만 19~34세 소득요건 충족 시 월 최대 50만원 납입, 기본금리 연 5% 고정, 이자소득 비과세. 정부기여금 6~12%. 6월 22일 출시. 청년도약계좌 중복불가.',
  keywords: [
    '청년미래적금',
    '청년미래적금 조건',
    '청년미래적금 금리',
    '청년미래적금 신청',
    '청년미래적금 정부기여금',
    '청년도약계좌 비교',
    '정부 기여금 적금',
    '2026 청년 저축',
  ],
  alternates: { canonical: URL },
  openGraph: {
    title: '청년미래적금 2026 — 월 50만원·5% + 정부 6~12% 기여, 6월 22일 출시',
    description: '만 19~34세 소득요건 대상. 월 최대 50만원, 기본 5% + 정부기여금 6~12%. 3년 만기 약 2,200만원. 6월 22일 출시, 청년도약계좌와 중복불가.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '청년미래적금 2026 — 월 50만원·5% + 정부기여금, 6월 22일 출시',
    description: '조건·금리·정부기여금·청년도약계좌 비교. 만 19~34세·소득요건 대상.',
  },
};

const FAQ_ITEMS = [
  {
    question: '청년미래적금은 누가 가입할 수 있나요?',
    answer:
      '만 19~34세 청년기본법상 청년이 대상입니다. 다만 소득 요건이 있습니다. 일반형은 개인소득 6,000만원 이하(소상공인 연매출 3억 이하) + 가구 중위소득 200% 이하이고, 우대형은 개인소득 3,600만원 이하(매출 1억 이하) + 중위소득 150% 이하입니다. 자신이 소득요건을 충족하는지는 출시 후 취급 은행 앱이나 영업점에서 확인할 수 있습니다.',
  },
  {
    question: '월 얼마까지 입금할 수 있나요?',
    answer:
      '월 최대 50만원까지 자유롭게 입금할 수 있습니다. 월마다 50만원을 꼭 입금해야 하는 것은 아니고, 여유가 있을 때 입금하면 됩니다. 단, 월 50만원을 초과해서는 입금할 수 없습니다. 3년 동안 입금하는 자유로운 자동적립식이므로 본인의 재정 상황에 맞춰 입금할 수 있습니다.',
  },
  {
    question: '금리가 정말 5%로 고정인가요? 내가 받을 이자는 얼마인가요?',
    answer:
      '기본금리는 연 5%로 고정입니다. 다만 적금은 매달 나눠 적립하므로 예금처럼 원금 전체에 5%가 붙지는 않습니다. 3년 동안 매달 50만원씩 입금하면 원금 1,800만원에 5% 비과세 이자가 약 140만원 발생합니다. 은행 우대금리(최고 약 7~8%)가 적용되면 이자는 더 늘어납니다. 정확한 이자액은 은행 모의계산으로 확인하세요.',
  },
  {
    question: '정부기여금은 뭔가요? 누가 더 많이 받나요?',
    answer:
      '정부기여금은 정부에서 청년의 저축을 장려하기 위해 추가로 주는 돈입니다. 일반형은 내가 입금한 금액의 6%를 정부가 추가해주고, 우대형은 12%를 추가해줍니다. 예를 들어 3년 동안 1,800만원을 입금하면 일반형은 정부가 약 108만원, 우대형은 약 216만원을 더 넣어줍니다. 우대형이 더 많이 받지만 소득요건이 더 엄격합니다.',
  },
  {
    question: '3년 만기 후 받을 총 금액이 얼마나 되나요?',
    answer:
      '월 50만원을 3년 동안 입금하면 기본금리 5% 기준 일반형은 약 2,050만원, 우대형은 약 2,150만원입니다(원금 1,800만 + 정부기여금 + 비과세 이자 약 140만). 은행 우대금리(최고 약 7~8%)가 적용되면 우대형은 최대 약 2,200만원 이상이 됩니다. 모두 가정(매달 50만원·중도 인출 없음)에 따른 예상액이므로 정확한 금액은 은행 모의계산으로 확인하세요.',
  },
  {
    question: '청년도약계좌와 청년미래적금을 동시에 가입할 수 있나요?',
    answer:
      '동시 가입은 불가능합니다. 청년도약계좌와 청년미래적금은 중복 가입할 수 없습니다. 다만 2026년 6월 최초 가입 기간에 한해 한쪽에서 다른 쪽으로 갈아탈 수 있습니다. 예를 들어 청년도약계좌에 먼저 가입했다면 청년미래적금으로 전환할 수 있습니다.',
  },
  {
    question: '이자소득 비과세가 맞나요?',
    answer:
      '맞습니다. 청년미래적금의 이자소득은 전액 비과세입니다. 일반 적금은 이자에 대해 15.4% 세금이 나가지만, 청년미래적금은 세금이 없습니다. 따라서 받은 이자를 모두 가져갈 수 있습니다.',
  },
  {
    question: '출시 후 어디서 가입하나요?',
    answer:
      '청년미래적금은 2026년 6월 22일 출시됩니다. 취급 은행의 앱, 영업점, 콜센터 등에서 신청할 수 있습니다. 정확한 취급 은행 목록과 신청 방법은 출시 후 금융감독원이나 각 은행 공지사항에서 확인하시기 바랍니다.',
  },
] as const;

export default function YouthFutureSavingsAccount2026() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '청년미래적금 2026 — 조건·금리·정부기여금' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '청년미래적금 2026 — 만 19~34세, 월 50만원·기본 5% + 정부기여금 6~12%',
    description:
      '청년미래적금 2026 조건, 금리, 정부기여금을 정리했습니다. 만 19~34세 소득요건 충족 시 월 최대 50만원 납입, 기본금리 연 5% 고정, 이자소득 비과세. 정부기여금 6~12%. 6월 22일 출시. 청년도약계좌 중복불가.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['청년미래적금', '청년 저축', '정부기여금', '3년 적금'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '청년미래적금 2026 — 조건·금리·정부기여금·신청',
    description:
      '만 19~34세 소득요건 대상, 월 최대 50만원, 기본 5% + 정부 6~12% 기여, 이자 비과세. 6월 22일 출시, 청년도약계좌와 중복불가.',
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
                    { name: '청년미래적금 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">금융·저축 · 5분 읽기 · 2026-06-04</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  청년미래적금 2026
                  <br />
                  <span className="text-2xl text-text-secondary">— 만 19~34세, 월 50만원·기본 5% + 정부기여금 6~12%</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  정부가 청년을 위해 새로운 저축 상품을 출시합니다. 청년미래적금은 <strong>기본금리 5% + 정부기여금 6~12%</strong>를 제공하는 3년 만기 자유적립식 적금입니다.
                  만 19~34세이면서 소득요건을 충족한다면, <strong>월 최대 50만원</strong>을 납입해 <strong>이자소득 비과세</strong>로 자산을 키울 수 있습니다.
                  <strong>6월 22일</strong> 출시 예정이며, 청년도약계좌와는 중복 가입이 불가능합니다.
                  조건, 금리, 정부기여금을 정확히 정리했습니다.
                </p>
              </header>

              <AdSlot slot="guide-youth-future-savings-top" format="horizontal" />

              <section aria-label="핵심 요약" className="card border-l-4 border-l-primary-500">
                <h2 className="mb-2 text-caption uppercase tracking-wider text-primary-500">핵심 요약</h2>
                <div className="space-y-3 text-sm" data-speakable>
                  <table className="w-full border-collapse text-sm">
                    <caption className="mb-2 font-semibold text-text-primary">청년미래적금 2026 주요 정보</caption>
                    <thead>
                      <tr className="bg-primary-500/10">
                        <th scope="col" className="border border-border-base px-2 py-2 text-left">항목</th>
                        <th scope="col" className="border border-border-base px-2 py-2 text-left">내용</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-border-base px-2 py-1 font-semibold">운영 기관</td>
                        <td className="border border-border-base px-2 py-1">금융감독원 (취급: 참여 은행)</td>
                      </tr>
                      <tr>
                        <td className="border border-border-base px-2 py-1 font-semibold">출시 예정일</td>
                        <td className="border border-border-base px-2 py-1">2026년 6월 22일</td>
                      </tr>
                      <tr>
                        <td className="border border-border-base px-2 py-1 font-semibold">가입 대상</td>
                        <td className="border border-border-base px-2 py-1">만 19~34세 청년 (소득요건 있음)</td>
                      </tr>
                      <tr>
                        <td className="border border-border-base px-2 py-1 font-semibold">만기 기간</td>
                        <td className="border border-border-base px-2 py-1">3년 고정</td>
                      </tr>
                      <tr>
                        <td className="border border-border-base px-2 py-1 font-semibold">월 납입액</td>
                        <td className="border border-border-base px-2 py-1">최대 50만원 (자유 적립)</td>
                      </tr>
                      <tr className="bg-primary-500/5">
                        <td className="border border-border-base px-2 py-1 font-semibold">기본금리</td>
                        <td className="border border-border-base px-2 py-1 font-bold text-primary-600 dark:text-primary-400">
                          연 5% (고정)
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-border-base px-2 py-1 font-semibold">정부기여금</td>
                        <td className="border border-border-base px-2 py-1">일반형 6% / 우대형 12% (납입액 대비)</td>
                      </tr>
                      <tr>
                        <td className="border border-border-base px-2 py-1 font-semibold">이자 과세</td>
                        <td className="border border-border-base px-2 py-1">비과세</td>
                      </tr>
                      <tr>
                        <td className="border border-border-base px-2 py-1 font-semibold">중복 가입</td>
                        <td className="border border-border-base px-2 py-1">청년도약계좌와 불가 (6월 전환 허용)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">1. 청년미래적금이란? — 누가 얼마를 받을 수 있나</h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  청년미래적금은 정부가 청년의 자산 형성을 돕기 위해 새로 출시하는 저축 상품입니다.
                  일반 적금과 달리 기본금리가 <strong>연 5%로 고정</strong>이고, 여기에 <strong>정부기여금 6~12%</strong>가 추가됩니다.
                  또한 적금 이자소득이 완전히 비과세되므로, 세금 없이 이자를 전부 가져갈 수 있습니다.
                  예를 들어 3년 동안 월 50만원씩 입금하면, 원금 1,800만원에 정부기여금(108~216만원)과 5% 비과세 이자(약 140만원)가 더해져 기본 5% 기준 약 2,050만원(일반형)~2,150만원(우대형)이 되고, 은행 우대금리가 적용되면 우대형은 약 2,200만원 이상이 됩니다.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">2. 가입 대상 — 만 19~34세 + 소득요건</h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  청년미래적금의 가입 대상은 <strong>청년기본법상 청년(만 19~34세)</strong>입니다.
                  나이 조건 외에 <strong>소득요건</strong>이 있으며, 일반형과 우대형으로 나뉩니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-3 font-semibold text-text-primary">청년미래적금 가입 요건 (일반형 vs 우대형)</caption>
                    <thead>
                      <tr className="bg-primary-500/10 border border-border-base">
                        <th scope="col" className="px-3 py-2 text-left">구분</th>
                        <th scope="col" className="px-3 py-2 text-left">개인소득</th>
                        <th scope="col" className="px-3 py-2 text-left">가구 중위소득</th>
                        <th scope="col" className="px-3 py-2 text-left">정부기여금</th>
                      </tr>
                    </thead>
                    <tbody className="text-text-secondary">
                      <tr className="border border-border-base">
                        <td className="px-3 py-2 font-semibold">일반형</td>
                        <td className="px-3 py-2">6,000만원 이하 (소상공인 연매출 3억 이하)</td>
                        <td className="px-3 py-2">200% 이하</td>
                        <td className="px-3 py-2 font-bold text-primary-600 dark:text-primary-400">납입액의 6%</td>
                      </tr>
                      <tr className="border border-border-base bg-primary-500/5">
                        <td className="px-3 py-2 font-semibold">우대형</td>
                        <td className="px-3 py-2">3,600만원 이하 (소상공인 연매출 1억 이하)</td>
                        <td className="px-3 py-2">150% 이하</td>
                        <td className="px-3 py-2 font-bold text-primary-600 dark:text-primary-400">납입액의 12%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-raised p-4 mt-4">
                  <p className="text-sm text-text-secondary">
                    <strong>💡 참고:</strong> 소득요건과 가구 중위소득 기준이 모두 충족되어야 가입할 수 있습니다.
                    자신이 요건을 충족하는지는 출시 후 취급 은행에 문의하거나, 은행 앱에서 자격 확인을 통해 조회할 수 있습니다.
                  </p>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">3. 금리와 정부기여금 — 5% 고정 + 6~12%</h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  청년미래적금의 금리 구조는 매우 단순합니다.
                  기본금리는 <strong>연 5%로 3년 고정</strong>이고, 여기에 정부가 <strong>납입액의 6%(일반형) 또는 12%(우대형)</strong>를 추가로 넣어줍니다.
                </p>
                <div className="space-y-4">
                  <div className="rounded-lg border border-border-base bg-bg-card p-4">
                    <h3 className="font-semibold text-text-primary mb-3">월 50만원 3년 입금 시 예상 수령액 (가정)</h3>
                    <div className="space-y-3 text-sm text-text-secondary">
                      <div>
                        <strong>원금:</strong>
                        <p className="mt-1">월 50만원 × 36개월 = 1,800만원</p>
                      </div>
                      <div className="mt-4">
                        <strong>정부기여금 (일반형):</strong>
                        <p className="mt-1">1,800만원 × 6% = 약 108만원</p>
                      </div>
                      <div className="mt-4">
                        <strong>정부기여금 (우대형):</strong>
                        <p className="mt-1">1,800만원 × 12% = 약 216만원</p>
                      </div>
                      <div className="mt-4">
                        <strong>비과세 이자 (기본금리 5% 기준):</strong>
                        <p className="mt-1">약 140만원 (은행 우대금리 적용 시 증가)</p>
                      </div>
                      <div className="mt-4 rounded bg-primary-500/10 p-3">
                        <strong>예상 만기액 (기본 5% 기준):</strong>
                        <p className="mt-2">일반형: 약 2,050만원 (원금 1,800 + 기여금 108 + 이자 약 140)</p>
                        <p>우대형: 약 2,150만원 (기여금 216 포함)</p>
                        <p className="mt-1 text-xs">※ 은행 우대금리·실제 적립 방식에 따라 우대형 최대 약 2,200만원 이상</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="rounded-lg border border-danger-500 border-l-4 bg-danger-500/5 p-4 mt-4">
                  <p className="text-sm text-danger-700 dark:text-danger-300">
                    <strong>⚠️ 주의:</strong> 위 금액은 월 50만원을 3년 동안 균등하게 입금한다는 가정 하에 계산한 예상액입니다.
                    실제 이자액과 정부기여금은 실제 입금 시점, 입금 금액, 은행의 정확한 이자 계산 방식에 따라 달라질 수 있습니다.
                    정확한 만기액은 출시 후 취급 은행의 모의계산 기능을 이용하여 확인하시기 바랍니다.
                  </p>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">4. 자유로운 입금과 비과세 이자</h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  청년미래적금은 <strong>자유적립식</strong>입니다.
                  매달 정확히 입금해야 하는 정기적립식과 달리, 여유가 있을 때 입금할 수 있습니다.
                  월 최대 50만원까지 언제든 입금 가능하며, 입금하지 않는 달이 있어도 상관없습니다.
                </p>
                <div className="rounded-lg border border-border-base bg-primary-500/5 p-4">
                  <h3 className="font-semibold text-primary-700 dark:text-primary-400 mb-3">비과세 이자의 장점</h3>
                  <div className="space-y-2 text-sm text-text-secondary">
                    <p>
                      <strong>일반 적금:</strong> 이자의 15.4% 세금 부담 → 실질 이자율 약 4.2%
                    </p>
                    <p>
                      <strong>청년미래적금:</strong> 세금 0% → 받은 이자를 100% 가져감
                    </p>
                    <p className="mt-3 text-primary-600 dark:text-primary-400">
                      → 3년 만기 시 비과세 덕분에 적금 수익률이 크게 향상됩니다.
                    </p>
                  </div>
                </div>
              </section>

              <AdSlot slot="guide-youth-future-savings-mid" format="rectangle" />

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">5. 청년도약계좌와의 비교 — 중복불가, 갈아타기 허용</h2>
                <p className="text-text-secondary leading-relaxed">
                  청년미래적금과 청년도약계좌는 모두 청년을 위한 정부 지원 상품이지만, 중복 가입할 수 없습니다.
                  두 상품의 주요 차이점을 비교하면 다음과 같습니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-3 font-semibold text-text-primary">청년미래적금 vs 청년도약계좌</caption>
                    <thead>
                      <tr className="bg-primary-500/10 border border-border-base">
                        <th scope="col" className="px-3 py-2 text-left">항목</th>
                        <th scope="col" className="px-3 py-2 text-left">청년미래적금</th>
                        <th scope="col" className="px-3 py-2 text-left">청년도약계좌</th>
                      </tr>
                    </thead>
                    <tbody className="text-text-secondary">
                      <tr className="border border-border-base">
                        <td className="px-3 py-2 font-semibold">기본금리</td>
                        <td className="px-3 py-2">연 5% 고정</td>
                        <td className="px-3 py-2">변동 (은행별 차이)</td>
                      </tr>
                      <tr className="border border-border-base">
                        <td className="px-3 py-2 font-semibold">정부지원</td>
                        <td className="px-3 py-2">기여금 6~12%</td>
                        <td className="px-3 py-2">이자 세제 혜택</td>
                      </tr>
                      <tr className="border border-border-base">
                        <td className="px-3 py-2 font-semibold">만기</td>
                        <td className="px-3 py-2">3년 고정</td>
                        <td className="px-3 py-2">5년 고정</td>
                      </tr>
                      <tr className="border border-border-base">
                        <td className="px-3 py-2 font-semibold">월 납입 한도</td>
                        <td className="px-3 py-2">최대 50만원</td>
                        <td className="px-3 py-2">정해진 금액</td>
                      </tr>
                      <tr className="border border-border-base bg-primary-500/5">
                        <td className="px-3 py-2 font-semibold">중복 가입</td>
                        <td className="px-3 py-2">불가능 (6월 전환 가능)</td>
                        <td className="px-3 py-2">불가능 (6월 전환 가능)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-raised p-4 mt-4">
                  <p className="text-sm text-text-secondary">
                    <strong>💡 팁:</strong> 청년도약계좌에 먼저 가입했다면, 2026년 6월 최초 가입 기간 동안 청년미래적금으로 갈아탈 수 있습니다.
                    어느 것이 본인에게 유리한지 비교한 후 선택하면 됩니다.
                  </p>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">6. 신청 방법과 출시 일정</h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  청년미래적금은 <strong>2026년 6월 22일</strong> 출시 예정입니다.
                  출시 후 참여 은행의 앱, 영업점, 콜센터를 통해 신청할 수 있습니다.
                </p>
                <div className="space-y-4">
                  <div className="rounded-lg border border-border-base bg-bg-card p-4">
                    <h3 className="font-semibold text-text-primary mb-3">신청 방법 (예상)</h3>
                    <ol className="space-y-2 text-sm text-text-secondary">
                      <li>
                        <strong>1) 은행 앱 또는 홈페이지 접속</strong> (참여 은행 목록은 출시 후 공지)
                      </li>
                      <li>
                        <strong>2) "청년미래적금" 검색 및 상품 선택</strong> (일반형 또는 우대형)
                      </li>
                      <li>
                        <strong>3) 본인 정보 입력 및 소득요건 확인</strong>
                      </li>
                      <li>
                        <strong>4) 자격 심사</strong> → 통상 수일 소요
                      </li>
                      <li>
                        <strong>5) 승인 후 입금 시작</strong>
                      </li>
                    </ol>
                  </div>
                  <div className="rounded-lg border border-border-base bg-bg-raised p-4">
                    <p className="text-sm text-text-secondary">
                      <strong>📅 출시 일정:</strong> 2026년 6월 22일 취급 개시
                    </p>
                    <p className="text-sm text-text-secondary mt-2">
                      정확한 취급 은행 목록과 신청 방법은 출시 후 금융감독원 공식 웹사이트나 각 은행에서 확인하시기 바랍니다.
                    </p>
                  </div>
                </div>
              </section>

              <FaqSection items={[...FAQ_ITEMS]} />

              <section className="card">
                <h2 className="mb-3 text-lg font-semibold">관련 계산기 및 가이드</h2>
                <ul className="space-y-2 text-sm">
                  <li>
                    → <Link href="/calculator/savings/" className="text-primary-600 underline dark:text-primary-500">
                      적금 이자 계산기
                    </Link>
                    {' — 월 납입액과 금리로 만기액 미리 계산'}
                  </li>
                  <li>
                    → <Link href="/calculator/deposit/" className="text-primary-600 underline dark:text-primary-500">
                      정기예금 이자 계산기
                    </Link>
                    {' — 예금과 적금의 이자 비교'}
                  </li>
                  <li>
                    → <Link href="/guide/financial-income-comprehensive-vs-separate-taxation/" className="text-primary-600 underline dark:text-primary-500">
                      금융 이자소득 비과세 조건
                    </Link>
                    {' — 이자 과세와 비과세 차이'}
                  </li>
                  <li>
                    → <Link href="/guide/unemployment-benefit-2026/" className="text-primary-600 underline dark:text-primary-500">
                      실업급여 2026 — 조건·금액·신청방법
                    </Link>
                    {' — 퇴사·이직 공백기에 청년이 함께 챙길 고용보험 급여'}
                  </li>
                  <li>
                    → <Link href="/category/finance/" className="text-primary-600 underline dark:text-primary-500">
                      금융 계산기
                    </Link>
                    {' — 대출, 예금, 적금 관련 모든 도구'}
                  </li>
                  <li>
                    → <Link href="/guide/tax-calendar-2026/" className="text-primary-600 underline dark:text-primary-500">
                      2026 금융·세금 달력
                    </Link>
                    {' — 청년 정책과 금융 일정 정리'}
                  </li>
                </ul>
              </section>

              <ShareButtons
                title="청년미래적금 2026 — 만 19~34세, 월 50만원·기본 5% + 정부기여금 6~12%"
                url={URL}
                description="조건, 금리, 정부기여금, 청년도약계좌 비교. 6월 22일 출시. 월 50만원, 기본 5% + 정부 6~12%, 이자 비과세."
              />

              <section
                aria-label="출처 및 면책"
                className="rounded-lg border border-border-base p-4 text-caption text-text-tertiary"
              >
                <p className="mb-2">
                  <strong>법적 근거</strong>: 금융감독원 청년미래적금 정책 공지 ·{' '}
                  <a
                    href="https://www.fsc.go.kr"
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="text-primary-600 underline dark:text-primary-500"
                  >
                    금융감독원 (fsc.go.kr)
                  </a>{' '}
                  · {' '}
                  <a
                    href="https://www.gov.kr"
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="text-primary-600 underline dark:text-primary-500"
                  >
                    정부24 (gov.kr)
                  </a>{' '}
                  · {' '}
                  <a
                    href="https://www.korea.kr"
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="text-primary-600 underline dark:text-primary-500"
                  >
                    정책브리핑 (korea.kr)
                  </a>{' '}
                  .
                </p>
                <p className="mb-2">
                  <strong>면책조항</strong>: 본 가이드는 2026년 6월 4일 기준 금융감독원 및 정부 공식 정보를 바탕으로 작성되었습니다.
                  청년미래적금은 2026년 6월 22일 출시 예정이며, 상품 출시 후 취급 은행, 구체 조건, 금리, 정부기여금 규모가 조정될 수 있습니다.
                  정확한 가입 조건, 이자 계산, 만기액은 출시 후 취급 은행의 공식 안내 및 모의계산으로 확인하시기 바랍니다.
                  본 콘텐츠는 AI 보조 작성 후 운영자 검수를 거쳤습니다.
                </p>
                <p>
                  <strong>업데이트</strong>: {DATE_MODIFIED} · 작성·검수: 김준혁 (calculatorhost)
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
