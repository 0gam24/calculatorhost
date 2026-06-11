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

const URL = 'https://calculatorhost.com/guide/high-oil-price-relief-fund-2026-application/';
const DATE_PUBLISHED = '2026-06-03';
const DATE_MODIFIED = '2026-06-03';

export const metadata: Metadata = {
  title: '고유가 피해지원금 2026 — 소득 하위 70% 1인 10~25만원, 7월 3일 마감',
  description:
    '고유가 피해지원금(2차) 신청 대상, 지급액, 신청 방법을 정리했습니다. 소득 하위 70% 약 3,256만 명 대상, 1인당 10~25만원, 신용·체크카드·상품권으로 8월 31일까지 사용 가능. 신청 마감 7월 3일.',
  keywords: [
    '고유가 피해지원금',
    '고유가 지원금 신청',
    '소득 하위 70% 지원금',
    '고유가 피해지원금 대상',
    '고유가 지원금 금액',
    '고유가 피해지원금 신청 기간',
    '2026 에너지 지원금',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '고유가 피해지원금 2026 — 소득 하위 70% 1인 10~25만원, 7월 3일 마감' }],
    title: '고유가 피해지원금 2026 — 1인 10~25만원, 신청 마감 7월 3일',
    description: '소득 하위 70% 대상. 거주지 따라 10~25만원. 신용카드·체크카드·상품권으로 사용. 신청 5월 18일~7월 3일.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '고유가 피해지원금 2026 — 1인 10~25만원, 7월 3일 마감',
    description: '신청 대상·지급액·신청 방법 완정리. 소득 하위 70% 지원.',
  },
};

const FAQ_ITEMS = [
  {
    question: '고유가 피해지원금을 받으려면 소득 기준이 얼마인가요?',
    answer:
      '소득 하위 70%를 기준합니다. 정확한 판정은 2026년 3월 30일 건강보험료 납부액으로 결정됩니다. 예를 들어 외벌이 직장가입자 1인 가구는 월 건강보험료 13만원 이하, 2인은 14만원 이하면 대상입니다. 지역가입자는 기준이 다르므로(1인 8만원, 2인 12만원 이하) 정부24나 행정안전부 웹사이트에서 가구원수별 정확한 기준을 확인하세요.',
  },
  {
    question: '1인당 얼마를 받나요?',
    answer:
      '거주지에 따라 다릅니다. 수도권(서울·인천·경기)은 10만원, 비수도권은 15만원, 인구감소지역 중 우대지원지역은 20만원, 특별지원지역은 25만원입니다. 가구원이 2명이면 1인당 지급액의 2배를 받으며, 가구원 수만큼 합산됩니다. 정확한 금액은 정부24나 행정안전부에서 주소 입력으로 조회하세요.',
  },
  {
    question: '4인 가족이면 총 얼마를 받나요?',
    answer:
      '거주지에 따라 다릅니다. 수도권 기준 1인 10만원 × 4명 = 40만원입니다. 비수도권이면 15만원 × 4명 = 60만원, 특별지원지역이면 25만원 × 4명 = 100만원을 받을 수 있습니다.',
  },
  {
    question: '신청 기간은 언제인가요?',
    answer:
      '신청 기간은 2026년 5월 18일부터 7월 3일까지입니다. 다만 취약계층(생활보장 수급자, 차상위 등)은 4월 27일부터 먼저 신청할 수 있었습니다. 신청 마감은 7월 3일이므로 늦지 않도록 신청하세요. 사용 기한은 2026년 8월 31일까지입니다.',
  },
  {
    question: '신청은 어디서 어떻게 하나요?',
    answer:
      '신용·체크카드사(홈페이지·앱·콜센터·ARS), 지역사랑상품권, 선불카드 중 원하는 방식으로 신청합니다. 또는 거주지 주민센터를 방문해도 됩니다. 온라인 신청이 편하면 이용 중인 카드사 앱이나 홈페이지에서 고유가 피해지원금 신청 메뉴를 찾으면 됩니다.',
  },
  {
    question: '신용카드, 체크카드, 상품권 중 뭘 선택해야 하나요?',
    answer:
      '편한 것을 선택하면 됩니다. 신용카드 또는 체크카드로 선택하면 일상 결제에 사용할 수 있습니다. 지역사랑상품권이나 선불카드로 선택하면 가맹점에서만 사용 가능합니다. 어느 것을 선택하든 2026년 8월 31일까지 사용해야 합니다.',
  },
  {
    question: '어디서 사용할 수 있나요?',
    answer:
      '매출액 30억원 이하 소상공인 매장에서 사용 가능합니다. 유흥업·사행산업(파칭코·도박장 등)·위험 업종은 제외됩니다. 대형마트나 백화점, 편의점, 카페, 음식점, 병원, 약국 등 대부분의 일반 매장에서 사용할 수 있습니다. 지역사랑상품권을 선택하면 해당 지역의 가맹점에서만 사용 가능합니다.',
  },
  {
    question: '이미 받고 있으면 다시 신청해야 하나요?',
    answer:
      '2026년 3월 30일 기준 소득 하위 70%에 포함되는 모든 성인에게 자동으로 신청 자격이 부여됩니다. 따라서 새로운 신청 없이 기존 신청 기록으로 받을 수 있습니다. 다만 거주지가 바뀌었거나 소득 상황이 크게 달라졌다면 변경 신청을 해야 할 수 있으니 행정안전부나 주민센터에 확인하세요.',
  },
] as const;

export default function HighOilPriceReliefFund2026Application() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '고유가 피해지원금 2026 — 신청 대상·금액·방법' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '고유가 피해지원금 2026 — 소득 하위 70% 1인 10~25만원, 신청 마감 7월 3일',
    description:
      '고유가 피해지원금(2차) 신청 대상, 지급액, 신청 방법을 정리했습니다. 소득 하위 70% 약 3,256만 명 대상, 1인당 10~25만원, 신용·체크카드·상품권으로 8월 31일까지 사용 가능. 신청 마감 7월 3일.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['고유가 피해지원금', '소득 하위 70%', '신청 기한', '지원금 신청'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '고유가 피해지원금 2026 — 신청 대상·지급액·신청 방법',
    description:
      '소득 하위 70% 대상, 1인당 10~25만원, 신청 5월 18일~7월 3일, 사용 기한 8월 31일까지.',
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
                    { name: '고유가 피해지원금 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">생활·복지 · 6분 읽기 · 2026-06-03</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  고유가 피해지원금 2026
                  <br />
                  <span className="text-2xl text-text-secondary">— 소득 하위 70% 1인 10~25만원, 7월 3일 신청 마감</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  에너지 가격 상승으로 생활비 부담이 크다면, 정부의 고유가 피해지원금을 받아볼 수 있습니다.
                  소득 하위 70% 약 3,256만 명을 대상으로 1인당 <strong>10만~25만원</strong>을 지급합니다.
                  신청 기간은 <strong>5월 18일부터 7월 3일까지</strong>이며, 신용카드·체크카드·상품권으로 <strong>8월 31일까지 사용</strong>할 수 있습니다.
                  신청 대상, 지급액, 신청 방법을 정확히 정리했습니다.
                </p>
              </header>

              <AdSlot slot="guide-high-oil-price-relief-top" format="horizontal" />

              <section aria-label="핵심 요약" className="card border-l-4 border-l-primary-500">
                <h2 className="mb-2 text-caption uppercase tracking-wider text-primary-500">핵심 요약</h2>
                <div className="space-y-3 text-sm" data-speakable>
                  <table className="w-full border-collapse text-sm">
                    <caption className="mb-2 font-semibold text-text-primary">2026년 고유가 피해지원금 주요 정보</caption>
                    <thead>
                      <tr className="bg-primary-500/10">
                        <th scope="col" className="border border-border-base px-2 py-2 text-left">항목</th>
                        <th scope="col" className="border border-border-base px-2 py-2 text-left">내용</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-border-base px-2 py-1 font-semibold">운영 기관</td>
                        <td className="border border-border-base px-2 py-1">행정안전부</td>
                      </tr>
                      <tr>
                        <td className="border border-border-base px-2 py-1 font-semibold">신청 기간</td>
                        <td className="border border-border-base px-2 py-1">2026년 5월 18일 ~ 7월 3일</td>
                      </tr>
                      <tr>
                        <td className="border border-border-base px-2 py-1 font-semibold">사용 기한</td>
                        <td className="border border-border-base px-2 py-1">2026년 8월 31일까지</td>
                      </tr>
                      <tr>
                        <td className="border border-border-base px-2 py-1 font-semibold">대상</td>
                        <td className="border border-border-base px-2 py-1">소득 하위 70% (약 3,256만 명)</td>
                      </tr>
                      <tr className="bg-primary-500/5">
                        <td className="border border-border-base px-2 py-1 font-semibold">1인당 지급액</td>
                        <td className="border border-border-base px-2 py-1 font-bold text-primary-600 dark:text-primary-400">
                          10~25만원 (거주지별 차등)
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-border-base px-2 py-1 font-semibold">신청 방법</td>
                        <td className="border border-border-base px-2 py-1">카드사(앱·홈페이지) / 주민센터</td>
                      </tr>
                      <tr>
                        <td className="border border-border-base px-2 py-1 font-semibold">사용 방식</td>
                        <td className="border border-border-base px-2 py-1">신용·체크카드·상품권·선불카드</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">1. 고유가 피해지원금이란? — 누가 얼마를 받나</h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  고유가 피해지원금은 행정안전부가 운영하는 정부 지원 사업입니다.
                  「보조금 관리에 관한 법률」 §2에서 정의하는 보조금(국가가 재정상의 원조를 위해 지급하는 금원)의 성격을 가지며,
                  에너지(전기, 가스, 휘발유)·식료품 가격 상승으로 인한 가계 부담을 덜어주기 위해 소득 하위 70%의 성인에게 현금 대신 신용카드·체크카드·상품권 형태로 지급합니다.
                  2차 지원은 <strong>1인당 10만~25만원</strong>을 거주지에 따라 차등 지급합니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-3 font-semibold text-text-primary">2026년 고유가 피해지원금 지급액 (거주지별, 1인당)</caption>
                    <thead>
                      <tr className="bg-primary-500/10 border border-border-base">
                        <th scope="col" className="px-3 py-2 text-left">거주지</th>
                        <th scope="col" className="px-3 py-2 text-left">1인당 지급액</th>
                        <th scope="col" className="px-3 py-2 text-left">4인 가족</th>
                      </tr>
                    </thead>
                    <tbody className="text-text-secondary">
                      <tr className="border border-border-base">
                        <td className="px-3 py-2 font-semibold">수도권 (서울·인천·경기)</td>
                        <td className="px-3 py-2 font-bold text-primary-600 dark:text-primary-400">10만원</td>
                        <td className="px-3 py-2">40만원</td>
                      </tr>
                      <tr className="border border-border-base">
                        <td className="px-3 py-2 font-semibold">비수도권</td>
                        <td className="px-3 py-2 font-bold text-primary-600 dark:text-primary-400">15만원</td>
                        <td className="px-3 py-2">60만원</td>
                      </tr>
                      <tr className="border border-border-base">
                        <td className="px-3 py-2 font-semibold">인구감소지역 (우대지원)</td>
                        <td className="px-3 py-2 font-bold text-primary-600 dark:text-primary-400">20만원</td>
                        <td className="px-3 py-2">80만원</td>
                      </tr>
                      <tr className="border border-border-base bg-primary-500/5">
                        <td className="px-3 py-2 font-semibold">특별지원지역</td>
                        <td className="px-3 py-2 font-bold text-primary-600 dark:text-primary-400">25만원</td>
                        <td className="px-3 py-2">100만원</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-raised p-4 mt-4">
                  <p className="text-sm text-text-secondary">
                    <strong>💡 참고:</strong> 지급액은 거주지(주소)에 따라 결정됩니다.
                    정확한 지급액과 거주지 분류는 정부24(gov.kr) 또는 행정안전부 홈페이지에서 주소를 입력해 조회할 수 있습니다.
                  </p>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">2. 신청 대상 — 소득 하위 70%</h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  고유가 피해지원금의 신청 대상은 <strong>소득 하위 70%</strong>입니다.
                  약 3,256만 명이 해당하며, 정확한 판정은 <strong>2026년 3월 30일 기준 건강보험료 납부액</strong>으로 결정됩니다.
                  즉, 「국민건강보험법」 §69에 따라 산정·고지된 보험료(직장가입자는 보수월액 기준, 지역가입자는 소득·재산 합산 점수 기준)를
                  소득 대용 지표로 사용해 "당신이 상위 30%에 드는가"를 판정하는 방식입니다.
                </p>
                <div className="space-y-4">
                  <div className="rounded-lg border border-border-base bg-bg-card p-4">
                    <h3 className="font-semibold text-text-primary mb-3">건강보험료 기준 (2026년 3월 30일)</h3>
                    <div className="space-y-3 text-sm text-text-secondary">
                      <div>
                        <strong>직장가입자 (외벌이 기준):</strong>
                        <ul className="ml-4 mt-1 space-y-1">
                          <li>1인 가구: 월 13만원 이하</li>
                          <li>2인 가구: 월 14만원 이하</li>
                          <li>3인 가구: 월 16만원 이하</li>
                          <li>4인 이상: 월 18만원 이하</li>
                        </ul>
                      </div>
                      <div className="mt-4">
                        <strong>지역가입자 (자영업·프리랜서):</strong>
                        <ul className="ml-4 mt-1 space-y-1">
                          <li>1인 가구: 월 8만원 이하</li>
                          <li>2인 가구: 월 12만원 이하</li>
                          <li>3인 가구: 월 14만원 이하</li>
                          <li>4인 이상: 월 16만원 이하</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="rounded-lg border border-danger-500 border-l-4 bg-danger-500/5 p-4 mt-4">
                  <p className="text-sm text-danger-700 dark:text-danger-300">
                    <strong>⚠️ 주의:</strong> 위 수치는 2026년 3월 30일 기준입니다.
                    가구원 수별로 기준이 다르고, 직장가입자와 지역가입자의 기준도 상이합니다.
                    정확한 대상 판정은 정부24(gov.kr) 또는 행정안전부(mois.go.kr)에서 건강보험료 조회로 확인하세요.
                  </p>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">3. 신청 기간과 사용 기한</h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  고유가 피해지원금 신청 기간은 <strong>2026년 5월 18일부터 7월 3일까지</strong>입니다.
                  승인된 지원금은 <strong>2026년 8월 31일까지</strong> 사용해야 합니다.
                  다만 취약계층(생활보장 수급자, 차상위 등)은 4월 27일부터 먼저 신청할 수 있었습니다.
                </p>
                <div className="rounded-lg border border-border-base bg-primary-500/5 p-4">
                  <h3 className="font-semibold text-primary-700 dark:text-primary-400 mb-3">신청 시기별 주의사항</h3>
                  <div className="space-y-2 text-sm text-text-secondary">
                    <p>
                      <strong>5월 중 신청:</strong> 빨리 승인되면 6월부터 사용 가능
                    </p>
                    <p>
                      <strong>6월 중 신청:</strong> 6월~7월 사이 승인되며, 7월에 충분히 사용 가능
                    </p>
                    <p>
                      <strong>7월 초 신청 (마감 7월 3일):</strong> 8월 중 승인되므로 사용 기한(8월 31일)이 촉박할 수 있음
                    </p>
                  </div>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">4. 신청 방법 — 온라인 또는 방문</h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  고유가 피해지원금 신청은 신용카드·체크카드·지역사랑상품권 가맹점 또는 주민센터에서 할 수 있습니다.
                  온라인 신청이 편하면 카드사 앱이나 홈페이지, 콜센터, ARS를 이용하면 됩니다.
                </p>
                <div className="space-y-4">
                  <div className="rounded-lg border border-border-base bg-bg-card p-4">
                    <h3 className="font-semibold text-text-primary mb-3">1) 카드사 온라인·전화 신청</h3>
                    <ol className="space-y-2 text-sm text-text-secondary">
                      <li>
                        <strong>카드사 홈페이지 또는 앱 접속</strong> (신용카드사, 체크카드사, 은행)
                      </li>
                      <li>
                        <strong>"고유가 피해지원금" 또는 "에너지바우처" 검색</strong>
                      </li>
                      <li>
                        <strong>본인 명의 카드 선택</strong> 및 신청서 작성
                      </li>
                      <li>
                        <strong>신청 완료</strong> → 신청 번호 또는 확인 문자 수령
                      </li>
                      <li>
                        <strong>심사 및 승인</strong> → 3~7일 후 카드사 연락 또는 앱에서 확인
                      </li>
                    </ol>
                  </div>
                  <div className="rounded-lg border border-border-base bg-bg-card p-4">
                    <h3 className="font-semibold text-text-primary mb-3">2) 주민센터 방문 신청</h3>
                    <ol className="space-y-2 text-sm text-text-secondary">
                      <li>
                        <strong>거주지 읍·면·동 주민센터 방문</strong>
                      </li>
                      <li>
                        <strong>담당자에게 "고유가 피해지원금 신청"이라고 말하기</strong>
                      </li>
                      <li>
                        <strong>신청서 작성 및 신분증 제출</strong>
                      </li>
                      <li>
                        <strong>심사 및 승인</strong> → 7~10일 후 결과 통지
                      </li>
                    </ol>
                  </div>
                </div>
                <div className="rounded-lg border border-border-base bg-primary-500/5 p-4 mt-4">
                  <p className="text-sm text-text-secondary">
                    <strong>💡 팁:</strong> 카드사 앱 또는 홈페이지 신청이 가장 빠르고 간편합니다.
                    다만 정확한 신청 위치가 헷갈리면 카드사 콜센터(카드 뒷면 전화번호)로 전화하여 "고유가 지원금 신청"이라고 말하면 담당자가 안내해줍니다.
                  </p>
                </div>
              </section>

              <AdSlot slot="guide-high-oil-price-relief-mid" format="rectangle" />

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">5. 신용카드 vs 체크카드 vs 상품권 — 뭘 선택할까</h2>
                <p className="text-text-secondary leading-relaxed">
                  고유가 피해지원금은 현금이 아니라 신용카드, 체크카드, 지역사랑상품권, 선불카드 중 하나를 선택해서 받습니다.
                  각각의 특징을 비교하면 다음과 같습니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-3 font-semibold text-text-primary">지급 방식 비교</caption>
                    <thead>
                      <tr className="bg-primary-500/10 border border-border-base">
                        <th scope="col" className="px-3 py-2 text-left">방식</th>
                        <th scope="col" className="px-3 py-2 text-left">사용처</th>
                        <th scope="col" className="px-3 py-2 text-left">추천 대상</th>
                      </tr>
                    </thead>
                    <tbody className="text-text-secondary">
                      <tr className="border border-border-base">
                        <td className="px-3 py-2 font-semibold">신용카드</td>
                        <td className="px-3 py-2">전국 대부분 가맹점 (식당, 카페, 마트, 병원 등)</td>
                        <td className="px-3 py-2">일상 소비가 많은 사람</td>
                      </tr>
                      <tr className="border border-border-base">
                        <td className="px-3 py-2 font-semibold">체크카드</td>
                        <td className="px-3 py-2">신용카드와 동일</td>
                        <td className="px-3 py-2">신용카드 사용 시 부담 있는 사람</td>
                      </tr>
                      <tr className="border border-border-base">
                        <td className="px-3 py-2 font-semibold">지역사랑상품권</td>
                        <td className="px-3 py-2">해당 지역 가맹점만 가능</td>
                        <td className="px-3 py-2">지역 소상공인 지원 원하는 사람</td>
                      </tr>
                      <tr className="border border-border-base">
                        <td className="px-3 py-2 font-semibold">선불카드</td>
                        <td className="px-3 py-2">신용카드 가능한 곳 대부분</td>
                        <td className="px-3 py-2">미리 충전하고 사용하는 방식 선호</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">6. 어디서 사용할 수 있나 — 매출액 30억원 이하 소상공인</h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  고유가 피해지원금은 매출액 30억원 이하인 소상공인 매장에서만 사용 가능합니다.
                  지역사랑상품권으로 받은 경우에는 「지역사랑상품권 이용 활성화에 관한 법률」 §2에서 정의한 가맹점(상품권 결제로 물품을 판매하거나 용역을 제공하기 위해 지자체에 등록한 사업자)에서만 사용할 수 있습니다.
                  대형마트, 백화점, 프랜차이즈, 편의점, 음식점, 카페, 병원, 약국, 학원 등 대부분의 일반 매장에서 사용할 수 있습니다.
                  단, 유흥업(주점, 노래방 등), 사행산업(파칭코, 도박장 등), 무기·화약 판매점, 위험 업종은 제외됩니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-raised p-4">
                  <h3 className="font-semibold text-text-primary mb-3">사용 가능한 매장 예시</h3>
                  <ul className="grid grid-cols-2 gap-2 text-sm text-text-secondary">
                    <li>마트·슈퍼마켓</li>
                    <li>편의점</li>
                    <li>음식점</li>
                    <li>카페</li>
                    <li>병원·치과</li>
                    <li>약국</li>
                    <li>헤어샵·미용실</li>
                    <li>학원</li>
                    <li>세탁소</li>
                    <li>주유소</li>
                    <li>숙박시설</li>
                    <li>자동차수리점</li>
                  </ul>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">7. 에너지바우처와의 차이 — 별개 사업</h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  에너지바우처는 저소득층의 여름 냉방비·겨울 난방비를 지원하는 별도의 제도입니다.
                  고유가 피해지원금과는 다른 사업이므로, 신청 조건과 지급액, 사용 방법이 모두 다릅니다.
                  중복 신청은 불가하므로 자신이 받을 수 있는 지원을 정확히 확인하세요.
                </p>
              </section>

              <FaqSection items={[...FAQ_ITEMS]} />

              <section className="card">
                <h2 className="mb-3 text-lg font-semibold">관련 가이드</h2>
                <ul className="space-y-2 text-sm">
                  <li>
                    →{' '}
                    <Link href="/guide/energy-voucher-2026-summer-cooling-subsidy/" className="text-primary-600 underline dark:text-primary-500">
                      2026 에너지바우처 — 여름 냉방비 최대 70만원
                    </Link>
                    {' — 저소득층·취약계층 냉방·난방비 지원'}
                  </li>
                  <li>
                    →{' '}
                    <Link href="/guide/tax-calendar-2026/" className="text-primary-600 underline dark:text-primary-500">
                      2026년 세금·복지 달력
                    </Link>
                    {' — 신청 기한 전체 일정 정리'}
                  </li>
                  <li>
                    →{' '}
                    <Link href="/category/lifestyle/" className="text-primary-600 underline dark:text-primary-500">
                      생활 복지
                    </Link>
                    {' — 주택, 기초생활, 저소득층 지원 가이드'}
                  </li>
                </ul>
              </section>

              <ShareButtons
                title="고유가 피해지원금 2026 — 소득 하위 70% 1인 10~25만원, 신청 마감 7월 3일"
                url={URL}
                description="신청 기간 5월 18일~7월 3일. 1인당 10~25만원 지급. 신용·체크카드·상품권으로 8월 31일까지 사용. 대상·금액·신청방법 정리."
              />

              <section
                aria-label="출처 및 면책"
                className="rounded-lg border border-border-base p-4 text-caption text-text-tertiary"
              >
                <p className="mb-2">
                  <strong>법적 근거</strong>: 보조금 관리에 관한 법률 §2(보조금·보조사업 정의) · 국민건강보험법 §69(보험료 산정 — 대상자 선정 기준) · 지역사랑상품권 이용 활성화에 관한 법률 §2(가맹점 정의 — 사용처) · 행정안전부 고유가 피해지원금 사업 지침 ·{' '}
                  <a
                    href="https://www.mois.go.kr"
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="text-primary-600 underline dark:text-primary-500"
                  >
                    행정안전부 (mois.go.kr)
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
                  <strong>면책조항</strong>: 본 가이드는 2026년 6월 3일 기준 공개된 정부 공식 정보를 바탕으로 작성되었습니다.
                  고유가 피해지원금은 정부 정책에 따라 신청 기간, 지급액, 대상 기준이 변경될 수 있습니다.
                  정확한 신청 대상 판정과 지급액은 정부24(gov.kr)에서 건강보험료 조회 또는 행정안전부(mois.go.kr)에서 확인하세요.
                  신청 카드사 또는 거주지 주민센터에 문의하여 최신 정보를 확인하시기 바랍니다.
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
