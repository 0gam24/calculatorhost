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

const URL = 'https://calculatorhost.com/guide/income-tax-installment-payment-2026/';
const DATE_PUBLISHED = '2026-05-26';
const DATE_MODIFIED = '2026-05-26';

export const metadata: Metadata = {
  title: '종합소득세 분납 신청 2026 | 1천만 초과 2개월 분할 납부',
  description:
    '5월 31일 종소세 마감 5일 전! 종합소득세 분납 신청 완벽 가이드. 분납 가능 조건(1,000만 초과) · 분납 비율(1~2천만 vs 2천만↑ 다름) · 신청 방법 · 분납 기한(2개월) · 이자·가산세 0원 · 분납 vs 지연 납부 차이.',
  keywords: [
    '종합소득세 분납',
    '분납 신청',
    '세금 분할 납부',
    '1천만 분납 조건',
    '50% 분납',
    '2개월 분납 기한',
    '분납 이자',
    '분납 vs 지연 납부',
    '납부지연가산세',
    '소득세법 77',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '종합소득세 분납 신청 2026 | 1천만 초과 2개월 분할 납부' }],
    title: '종합소득세 분납 신청 2026 — 1천만 초과 2개월 분할',
    description: '분납 가능한가? 분납 비율은? 2차 납부일은? 사례 3개 시뮬 + 가산세 0원 확인.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '종합소득세 분납 신청 2026 완벽 가이드',
    description: '5/31 마감 5일 전 · 납부할 세액 1천만↑ · 2개월 분할 납부.',
  },
};

const FAQ_ITEMS = [
  {
    question: '종합소득세 분납은 누가 받을 수 있나요?',
    answer:
      '납부할 세액이 1,000만 원 초과하면 신청 가능합니다(소득세법 §77). 사업자·프리랜서·직장인 부업 여부 상관없이 종합소득세 납부 대상자 모두 신청 가능. 환급 대상자는 분납 대상 아님(환급금만 지급).',
  },
  {
    question: '분납 비율이 1천만과 2천만에서 다르다던데요?',
    answer:
      '맞습니다. 소득세법 §77에 따라 ① 납부세액 1,000~2,000만: 1,000만 원 1차 납부, 초과분 2차 ② 2,000만 초과: 50% 첫 납부, 50% 2차. 예: 3,000만이면 1,500만+1,500만 / 1,500만이면 1,000만+500만.',
  },
  {
    question: '분납 신청은 어떻게 하나요?',
    answer:
      '종합소득세 신고서에 분납 신청 표시만 하면 됩니다. 별도 신청서 불필요. 홈택스 "신고/납부 → 종합소득세" → "신고 입력" 단계에서 분납 여부 선택. 신고 제출 시 자동 접수.',
  },
  {
    question: '1차 5월 31일, 2차는 언제인가요?',
    answer:
      '1차: 신고기한 다음날(6월 1일 또는 2일, 주말 제외). 2차: 신고기한 다음날부터 정확히 2개월 이내(6월 말~7월 말). 정확한 2차 납부일은 홈택스 납부안내에서 확인 가능. 일반적으로 7월 31일 전까지.',
  },
  {
    question: '분납하면 이자가 붙나요?',
    answer:
      '분납은 합법적 납부 방법이므로 이자(가산세) 0원입니다(소득세법 §77). 다만 2차 납부를 놓치면 지연 시점부터 일 0.022% 가산세 부과(국세기본법 §47의4). 2차 납부일을 꼭 챙기세요.',
  },
  {
    question: '분납과 지연 납부의 차이가 뭔가요?',
    answer:
      '분납: 소득세법 §77로 신고 시 신청 → 합법적 분할 납부 → 이자 0. 지연 납부: 납부기한 미충족 → 가산세 일 0.022% (연 약 8%) 부과 → 위험. 분납은 "계획된 분할", 지연은 "미납"으로 근본 다릅니다.',
  },
  {
    question: '분납 신청 후 전액 일시 납부 가능한가요?',
    answer:
      '가능합니다. 분납은 신청이지 의무가 아님. 1차 납부 전이면 전액 일시 납부로 변경 가능. 신고서 수정으로 분납 취소도 가능(신고 제출 후 수정신고 4년 이내).',
  },
  {
    question: '세무조사가 나면 분납 상태에서 어떻게 되나요?',
    answer:
      '분납 중 추가 세액 결정 시 2차 납부일 전이면 신규 세액을 2차 납부에 포함. 2차 후면 별도 고지. 분납 신청 자체는 조사 대상 아님 — 소득·경비 누락이 있으면 실질과세 원칙(국세기본법 §14) 적용되지만, 분납은 순전히 납부 일정일 뿐.',
  },
];

export default function IncomeTaxInstallmentPayment2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '종합소득세 분납 신청 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '종합소득세 분납 신청 2026 — 1천만 초과 2개월 분할 납부 완벽 가이드',
    description:
      '5월 31일 종합소득세 마감 5일 전! 납부 세액 1,000만 원 초과 시 분납 신청 가능. 분납 비율·기한·신청 방법·이자 없음·분납 vs 지연 납부 차이·사례별 시뮬레이션.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['종합소득세 분납', '분납 신청', '분납 비율', '2개월 분할', '이자 0'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '종합소득세 분납 신청 2026',
    description:
      '5월 31일까지 5일! 종합소득세 분납 신청 완벽 가이드. 분납 가능 조건·분납 비율(1~2천만 vs 2천만↑)·신청 방법·분납 기한(2개월)·이자·가산세 0원·분납 vs 지연 납부 차이·사례별 시뮬레이션.',
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
                    { name: '종합소득세 분납 신청' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">세금 · 8분 읽기 · 2026-05-26</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  종합소득세 분납 신청 2026
                  <br />
                  <span className="text-2xl text-text-secondary">— 5월 31일까지 5일, 1천만 초과 2개월 분할</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  5월 31일 종합소득세 신고 마감이 정확히 5일 남았습니다. 연간 사업소득이나 부업으로 인한 종합소득세 납부액이 생각보다 크다면, 혼자 감당하기 어려울 수 있습니다. 다행히
                  <strong> 소득세법 §77</strong>에 따라
                  <strong> 분납(분할 납부)</strong> 신청이 가능합니다. 납부할 세액이 1,000만 원 초과면 2개월에 걸쳐 나눠 낼 수 있으며, 분납 신청 자체에는 이자도 가산세도 붙지 않습니다.
                  이 페이지에서는 분납 가능 조건, 분납 비율, 신청 방법, 분납 vs 지연 납부의 차이를 정확히 정리합니다.
                </p>
              </header>

              <AdSlot slot="guide-installment-payment-top" format="horizontal" />

              {/* 핵심 요약 */}
              <section aria-label="핵심 요약" className="card border-l-4 border-l-primary-500">
                <h2 className="mb-4 text-2xl font-bold text-primary-700 dark:text-primary-300">⚡ 핵심 정리</h2>
                <div className="mb-4 overflow-x-auto">
                  <table className="w-full text-sm" data-speakable>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th className="px-3 py-2 text-left">항목</th>
                        <th className="px-3 py-2 text-left">내용</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="px-3 py-2 font-semibold">분납 가능 조건</td>
                        <td className="px-3 py-2">납부할 세액 1,000만 원 초과</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="px-3 py-2 font-semibold">분납 비율</td>
                        <td className="px-3 py-2">1~2천만: 1차 1,000만 + 2차 초과분 | 2천만↑: 1차 50% + 2차 50%</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="px-3 py-2 font-semibold">분납 기한</td>
                        <td className="px-3 py-2">신고기한 다음날부터 2개월 이내 (6월~7월 말)</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="px-3 py-2 font-semibold">신청 방법</td>
                        <td className="px-3 py-2">홈택스 신고서 입력 시 분납 신청 표시 (별도 신청서 X)</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="px-3 py-2 font-semibold">이자·가산세</td>
                        <td className="px-3 py-2">0원 (합법적 분할 납부) | 2차 지연 시만 일 0.022% 가산세</td>
                      </tr>
                      <tr>
                        <td className="px-3 py-2 font-semibold">분납 vs 지연</td>
                        <td className="px-3 py-2">분납: 신고 시 신청 · 이자 0 | 지연: 기한 내 미납 · 가산세 부과</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="space-y-2 text-sm">
                  <p className="font-semibold text-primary-600 dark:text-primary-400">분납이란?</p>
                  <p>
                    소득세법 §77에 따라 종합소득세를 1차(5월 말)와 2차(7월 말)로 나누어 납부하는 합법적 방법입니다. 신고 시 분납
                    신청만 표시하면 되며, 이자나 가산세가 붙지 않습니다.
                  </p>
                </div>
              </section>

              {/* 분납 가능 조건 */}
              <section>
                <h2 className="mb-4 text-2xl font-bold" data-speakable>
                  분납이란? 누가 받을 수 있나?
                </h2>
                <p className="mb-4 leading-relaxed" data-speakable>
                  분납(分納)은 <strong>납부할 세액이 1,000만 원을 초과하는 경우</strong>, 소득세법 §77에 따라 이를 여러 차례에 걸쳐 나누어 낼 수
                  있다는 제도입니다. 신고 시 분납을 신청하면, 국세청이 자동으로 1차와 2차 납부일을 안내하고, 각 차수별 납부액을 계산해줍니다.
                </p>
                <p className="mb-4 leading-relaxed" data-speakable>
                  <strong>분납 신청 가능 대상</strong>은 다음과 같습니다:
                </p>
                <ul className="mb-4 space-y-2 pl-5">
                  <li className="leading-relaxed">
                    ① <strong>사업소득이 있는 자영업자</strong> — 프리랜서, 소상공인, 1인사업자
                  </li>
                  <li className="leading-relaxed">
                    ② <strong>부동산임대소득자</strong> — 건물·주택·상가 월세·전세 임대인
                  </li>
                  <li className="leading-relaxed">
                    ③ <strong>기타소득자</strong> — 강의료, 원고료, 세미나 강사료, 기타 수입
                  </li>
                  <li className="leading-relaxed">
                    ④ <strong>직장인 부업자</strong> — 본직장 + 부업으로 종합소득세 신고 대상
                  </li>
                  <li className="leading-relaxed">
                    ⑤ <strong>프리랜서 3.3% 원천징수</strong> — 건설용역비, 디자인료 등 수령
                  </li>
                </ul>
                <p className="mb-4 leading-relaxed" data-speakable>
                  <strong>단, 환급 대상자는 분납 대상이 아닙니다.</strong> 세액 환급금은 신고 후 6월 말~7월 초에 자동 입금되므로, 분납 신청 필요 없음.
                </p>
              </section>

              {/* 분납 비율 상세 */}
              <section>
                <h2 className="mb-4 text-2xl font-bold" data-speakable>
                  분납 비율: 1천만 vs 2천만에서 다르다
                </h2>
                <p className="mb-4 leading-relaxed" data-speakable>
                  분납 비율은 납부할 세액의 규모에 따라 두 가지로 나뉩니다. 소득세법 §77 ②에 명시된 규칙으로, 1차와 2차의 분담 비율이
                  다릅니다.
                </p>

                <div className="mb-6 overflow-x-auto">
                  <table className="w-full text-sm" data-speakable>
                    <thead>
                      <tr className="border-b-2 border-primary-500 bg-bg-card">
                        <th className="px-4 py-3 text-left font-semibold">납부 세액 규모</th>
                        <th className="px-4 py-3 text-left font-semibold">1차 납부액 (5월 말)</th>
                        <th className="px-4 py-3 text-left font-semibold">2차 납부액 (7월 말)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="px-4 py-3 font-semibold text-primary-600 dark:text-primary-400">1,000만 초과 ~ 2,000만 이하</td>
                        <td className="px-4 py-3">1,000만 원 고정</td>
                        <td className="px-4 py-3">세액 - 1,000만 원</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 font-semibold text-primary-600 dark:text-primary-400">2,000만 원 초과</td>
                        <td className="px-4 py-3">전체 세액의 50%</td>
                        <td className="px-4 py-3">전체 세액의 50%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <p className="mb-4 leading-relaxed" data-speakable>
                  <strong>예시 1:</strong> 납부할 종합소득세가 1,500만 원이면, 1차 1,000만 원 + 2차 500만 원 납부.
                </p>
                <p className="mb-4 leading-relaxed" data-speakable>
                  <strong>예시 2:</strong> 납부할 종합소득세가 3,000만 원이면, 1차 1,500만 원(50%) + 2차 1,500만 원(50%) 납부. 1천만~2천만
                  구간의 "1차 1,000만 고정" 규칙이 더 이상 적용되지 않습니다.
                </p>
                <p className="leading-relaxed" data-speakable>
                  <strong>중요: 이 비율은 소득세법에 명시되어 있으며, 변경 불가</strong>합니다(소득세법 §77 ②).
                </p>
              </section>

              {/* 분납 신청 방법 */}
              <section>
                <h2 className="mb-4 text-2xl font-bold" data-speakable>
                  분납 신청 방법: 홈택스 신고 시 표시만 하면 끝
                </h2>
                <p className="mb-4 leading-relaxed" data-speakable>
                  분납 신청은 <strong>별도의 신청서나 서류가 필요 없습니다.</strong> 국세청 홈택스에서 종합소득세 신고를 입력할 때, 신고서
                  항목에 분납 신청 여부를 선택하면 됩니다.
                </p>

                <div className="card mb-6 border-l-4 border-l-highlight-500 bg-highlight-50 dark:bg-highlight-900/20">
                  <h3 className="mb-3 font-semibold text-highlight-700 dark:text-highlight-300">홈택스 분납 신청 단계</h3>
                  <ol className="space-y-2 pl-5 text-sm">
                    <li>
                      <strong>1단계:</strong> hometax.go.kr 접속 후 공동인증서·간편인증 로그인
                    </li>
                    <li>
                      <strong>2단계:</strong> "신고/납부" → "종합소득세" → "신고입력" 클릭
                    </li>
                    <li>
                      <strong>3단계:</strong> 소득 정보 입력 (자동채움 또는 수동) · 경비·공제 입력
                    </li>
                    <li>
                      <strong>4단계:</strong> 신고서 입력 화면에서 <strong>"분납 신청"</strong> 항목 체크
                    </li>
                    <li>
                      <strong>5단계:</strong> 결과 확인 → "전자신고" 제출
                    </li>
                    <li>
                      <strong>6단계:</strong> 신고 완료 후 홈택스 메인 → "납부" 메뉴에서 분납 안내 조회
                    </li>
                  </ol>
                </div>

                <p className="mb-4 leading-relaxed" data-speakable>
                  <strong>분납 신청 후 조회 방법:</strong> 신고 제출 후 홈택스 "신고/납부" → "납부조회" → "예정고지 및 세액"에서 1차·2차
                  납부액 및 납부일을 확인할 수 있습니다.
                </p>
              </section>

              {/* 분납 기한 */}
              <section>
                <h2 className="mb-4 text-2xl font-bold" data-speakable>
                  분납 기한: 1차는 신고기한, 2차는 2개월 이내
                </h2>
                <p className="mb-4 leading-relaxed" data-speakable>
                  분납 신청 후 각 차수별 납부기한은 소득세법 §77에 따라 정해집니다.
                </p>

                <div className="mb-6 overflow-x-auto">
                  <table className="w-full text-sm" data-speakable>
                    <thead>
                      <tr className="border-b-2 border-primary-500 bg-bg-card">
                        <th className="px-4 py-3 text-left font-semibold">차수</th>
                        <th className="px-4 py-3 text-left font-semibold">납부 기한</th>
                        <th className="px-4 py-3 text-left font-semibold">2026년 일정</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="px-4 py-3 font-semibold text-primary-600 dark:text-primary-400">1차</td>
                        <td className="px-4 py-3">신고기한 당일 또는 그 다음날</td>
                        <td className="px-4 py-3">2026년 5월 31일 (일) → 6월 1일 (월)</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 font-semibold text-primary-600 dark:text-primary-400">2차</td>
                        <td className="px-4 py-3">신고기한 다음날로부터 2개월 이내</td>
                        <td className="px-4 py-3">6월 1일(월) ~ 7월 31일(목) 이내</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <p className="mb-4 leading-relaxed" data-speakable>
                  <strong>2026년 구체적 일정:</strong>
                </p>
                <ul className="mb-4 space-y-2 pl-5">
                  <li>
                    <strong>1차 납부:</strong> 2026년 5월 31일이 일요일이므로, 자동으로 6월 1일(월요일)까지 기한 연장
                  </li>
                  <li>
                    <strong>2차 납부:</strong> 6월 1일부터 정확히 2개월 = 7월 31일(목요일)까지
                  </li>
                  <li>
                    <strong>정확한 2차 납부일:</strong> 홈택스 "납부" 메뉴에서 "분납 조회"를 통해 확인 가능
                  </li>
                </ul>
              </section>

              {/* 분납 이자, 가산세 */}
              <section>
                <h2 className="mb-4 text-2xl font-bold" data-speakable>
                  분납은 이자·가산세 0원 (2차 지연 시만 가산세)
                </h2>
                <p className="mb-4 leading-relaxed" data-speakable>
                  <strong>분납 신청 자체에는 이자나 가산세가 붙지 않습니다.</strong> 이는 소득세법 §77에서 공식적으로 인정하는 합법적
                  납부 방식이기 때문입니다.
                </p>

                <div className="card mb-6 border-l-4 border-l-danger-500 bg-danger-50 dark:bg-danger-900/20">
                  <h3 className="mb-3 font-semibold text-danger-600 dark:text-danger-400">⚠️ 주의: 2차 납부 지연 시</h3>
                  <p className="text-sm leading-relaxed">
                    2차 납부 기한인 7월 31일을 넘기면, 그 다음날부터 <strong>납부지연가산세</strong> 일 0.022%(국세기본법 §47의4)가
                    부과됩니다. 이는 "지연된 기간 × 0.022%" 계산이므로, 8월 15일까지 미납 시 약 15일 × 0.022% ≈ 0.33% 가산세가 추가됩니다.
                  </p>
                </div>

                <p className="mb-4 leading-relaxed" data-speakable>
                  <strong>예: 2차 납부액 1,500만 원 × 0.33% ≈ 약 49,500원 가산세</strong>
                </p>
                <p className="leading-relaxed" data-speakable>
                  따라서 분납 신청은 좋은 제도지만, <strong>2차 납부일을 꼭 챙겨서 납부</strong>해야 합니다. 만약 현금흐름 이슈로 2차 납부가
                  어렵다면, 선제적으로 국세청에 문의(☎ 1330)하여 추가 분납이나 납부유예를 신청할 수 있습니다.
                </p>
              </section>

              <AdSlot slot="guide-installment-payment-mid" format="rectangle" />

              {/* 분납 vs 지연 납부 */}
              <section>
                <h2 className="mb-4 text-2xl font-bold" data-speakable>
                  분납 vs 지연 납부: 근본부터 다르다
                </h2>
                <p className="mb-4 leading-relaxed" data-speakable>
                  "분납"과 "지연 납부"는 이름은 비슷하지만 법적으로 완전히 다릅니다. 이 차이를 정확히 이해하는 것이 중요합니다.
                </p>

                <div className="mb-6 overflow-x-auto">
                  <table className="w-full text-sm" data-speakable>
                    <thead>
                      <tr className="border-b-2 border-primary-500 bg-bg-card">
                        <th className="px-4 py-3 text-left font-semibold">항목</th>
                        <th className="px-4 py-3 text-left font-semibold">분납 (소득세법 §77)</th>
                        <th className="px-4 py-3 text-left font-semibold">지연 납부 (기한 내 미납)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="px-4 py-3 font-semibold">신청 여부</td>
                        <td className="px-4 py-3">신고 시 신청 필수</td>
                        <td className="px-4 py-3">신청 없음 (자동 미납)</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="px-4 py-3 font-semibold">법적 지위</td>
                        <td className="px-4 py-3">합법적 분할 납부</td>
                        <td className="px-4 py-3">불법적 미납</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="px-4 py-3 font-semibold">이자·가산세</td>
                        <td className="px-4 py-3">0원 (소정 기한 내 납부 시)</td>
                        <td className="px-4 py-3">일 0.022% 가산세 부과 (5월 31일 초과부터)</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="px-4 py-3 font-semibold">기한</td>
                        <td className="px-4 py-3">1차·2차 각각 지정</td>
                        <td className="px-4 py-3">5월 31일 (기한 없음 = 즉시 위반)</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 font-semibold">추징 가능성</td>
                        <td className="px-4 py-3">기한 내 납부 시 추징 위험 무</td>
                        <td className="px-4 py-3">5년간 추징 가능 (국세기본법 §26의2)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <p className="leading-relaxed" data-speakable>
                  <strong>결론:</strong> 분납은 "계획된 분할"로 합법이지만, 지연은 "기한 내 미납"으로 불법입니다. 따라서 납부액이 크다고 느껴지면
                  반드시 분납을 신청하세요.
                </p>
              </section>

              {/* 실제 사례 */}
              <section>
                <h2 className="mb-4 text-2xl font-bold" data-speakable>
                  실제 사례: 세액 규모별 분납액 시뮬레이션
                </h2>
                <p className="mb-4 leading-relaxed" data-speakable>
                  종합소득세 납부액이 실제로 얼마나 되는지에 따라 분납액이 어떻게 달라지는지 확인해보세요.
                </p>

                <div className="mb-6 overflow-x-auto">
                  <table className="w-full text-sm" data-speakable>
                    <thead>
                      <tr className="border-b-2 border-primary-500 bg-bg-card">
                        <th className="px-4 py-3 text-left font-semibold">납부 세액</th>
                        <th className="px-4 py-3 text-right font-semibold">1차 (5월)</th>
                        <th className="px-4 py-3 text-right font-semibold">2차 (7월)</th>
                        <th className="px-4 py-3 text-left font-semibold">분납 비율</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base bg-highlight-50 dark:bg-highlight-900/10">
                        <td className="px-4 py-3 font-semibold text-primary-600 dark:text-primary-400">1,500만 원</td>
                        <td className="px-4 py-3 text-right">1,000만</td>
                        <td className="px-4 py-3 text-right">500만</td>
                        <td className="px-4 py-3 text-left">1:0.5</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="px-4 py-3 font-semibold text-primary-600 dark:text-primary-400">2,000만 원</td>
                        <td className="px-4 py-3 text-right">1,000만</td>
                        <td className="px-4 py-3 text-right">1,000만</td>
                        <td className="px-4 py-3 text-left">1:1</td>
                      </tr>
                      <tr className="border-b border-border-base bg-highlight-50 dark:bg-highlight-900/10">
                        <td className="px-4 py-3 font-semibold text-primary-600 dark:text-primary-400">3,000만 원</td>
                        <td className="px-4 py-3 text-right">1,500만</td>
                        <td className="px-4 py-3 text-right">1,500만</td>
                        <td className="px-4 py-3 text-left">1:1 (50:50)</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="px-4 py-3 font-semibold text-primary-600 dark:text-primary-400">5,000만 원</td>
                        <td className="px-4 py-3 text-right">2,500만</td>
                        <td className="px-4 py-3 text-right">2,500만</td>
                        <td className="px-4 py-3 text-left">1:1 (50:50)</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 font-semibold text-primary-600 dark:text-primary-400">1억 원</td>
                        <td className="px-4 py-3 text-right">5,000만</td>
                        <td className="px-4 py-3 text-right">5,000만</td>
                        <td className="px-4 py-3 text-left">1:1 (50:50)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <p className="mb-4 leading-relaxed" data-speakable>
                  <strong>사례 A: 프리랜서 연수입 5,000만 원</strong>
                </p>
                <ul className="mb-4 space-y-2 pl-5 text-sm">
                  <li>매출: 5,000만 원</li>
                  <li>단순경비율(70%) 적용: 경비 3,500만 원</li>
                  <li>사업소득: 1,500만 원</li>
                  <li>종합소득세(누진세 15% - 누진공제 126만): 약 225만 원</li>
                  <li className="font-semibold text-primary-600 dark:text-primary-400">
                    → 분납액: 1차 225만, 2차 미해당 (1,000만 미만이므로 분납 대상 아님)
                  </li>
                </ul>

                <p className="mb-4 leading-relaxed" data-speakable>
                  <strong>사례 B: 임대인 월세 연수입 3,000만 원</strong>
                </p>
                <ul className="mb-4 space-y-2 pl-5 text-sm">
                  <li>연간 월세: 3,000만 원</li>
                  <li>필요경비(10~20%): 약 400만 원</li>
                  <li>부동산임대소득: 2,600만 원</li>
                  <li>종합소득세(누진세 15% - 누진공제 126만): 약 264만 원</li>
                  <li className="font-semibold text-primary-600 dark:text-primary-400">
                    → 분납 불가 (1,000만 미만)
                  </li>
                </ul>

                <p className="mb-4 leading-relaxed" data-speakable>
                  <strong>사례 C: 사업자 연매출 1억 원</strong>
                </p>
                <ul className="space-y-2 pl-5 text-sm">
                  <li>매출: 1억 원</li>
                  <li>실제 경비(장부신고): 4,500만 원</li>
                  <li>사업소득: 5,500만 원</li>
                  <li>종합소득세(누진세 24% - 누진공제 576만): 약 1,744만 원</li>
                  <li className="font-semibold text-primary-600 dark:text-primary-400">
                    → 분납액: 1차 1,000만 + 2차 744만 원
                  </li>
                </ul>
              </section>

              {/* FAQ */}
              <section>
                <h2 className="mb-6 text-2xl font-bold">자주 묻는 질문</h2>
                <FaqSection items={FAQ_ITEMS} />
              </section>

              {/* 실질과세 원칙 */}
              <section>
                <h2 className="mb-4 text-2xl font-bold" data-speakable>
                  함정: 분납과 실질과세 원칙
                </h2>
                <p className="mb-4 leading-relaxed" data-speakable>
                  분납은 "납부 방식" 선택이지만, 신고한 소득 자체가 검증되지 않는 것은 아닙니다. 만약 세무조사에서 소득 누락이나 경비 과다계상이
                  적발되면, 국세기본법 §14의 <strong>"실질과세 원칙"</strong>에 따라 세액을 재계산하게 됩니다.
                </p>

                <div className="card mb-6 border-l-4 border-l-danger-500 bg-danger-50 dark:bg-danger-900/20">
                  <h3 className="mb-3 font-semibold text-danger-600 dark:text-danger-400">⚠️ 실질과세 원칙이란?</h3>
                  <p className="mb-2 text-sm leading-relaxed">
                    국세기본법 §14에 따라, 세무당국은 형식적 신고가 아닌 <strong>실제 사실</strong>에 기반해 과세합니다. 예를 들어:
                  </p>
                  <ul className="space-y-1 pl-5 text-sm">
                    <li>
                      ① 통장·카드 내역상 매출이 신고액보다 많으면 → 추가 소득 인정
                    </li>
                    <li>
                      ② 경비 입증서류(영수증·거래명세서) 없는 경비 → 부인
                    </li>
                    <li>
                      ③ 경우에 따라 가산세 20~40% + 미납세액 추가 부과
                    </li>
                  </ul>
                </div>

                <p className="leading-relaxed" data-speakable>
                  따라서 분납을 신청하더라도, 신고 내용은 항상 정실하게 작성해야 합니다. 분납은 "납부 편의"이지 "과세 비껴가기"가 아닙니다.
                </p>
              </section>

              {/* 체크리스트 */}
              <section>
                <h2 className="mb-4 text-2xl font-bold" data-speakable>
                  분납 신청 전 체크리스트
                </h2>
                <div className="card space-y-3">
                  <label className="flex items-start gap-3">
                    <input type="checkbox" className="mt-1 h-4 w-4" />
                    <span>납부할 종합소득세가 1,000만 원 초과인가?</span>
                  </label>
                  <label className="flex items-start gap-3">
                    <input type="checkbox" className="mt-1 h-4 w-4" />
                    <span>5월 31일까지 홈택스 신고 계획이 있는가?</span>
                  </label>
                  <label className="flex items-start gap-3">
                    <input type="checkbox" className="mt-1 h-4 w-4" />
                    <span>신고서 입력 시 "분납 신청" 항목을 표시하기로 했는가?</span>
                  </label>
                  <label className="flex items-start gap-3">
                    <input type="checkbox" className="mt-1 h-4 w-4" />
                    <span>1차 납부액(6월 1일)을 준비했는가?</span>
                  </label>
                  <label className="flex items-start gap-3">
                    <input type="checkbox" className="mt-1 h-4 w-4" />
                    <span>2차 납부액(7월 31일)을 달력에 표기했는가?</span>
                  </label>
                  <label className="flex items-start gap-3">
                    <input type="checkbox" className="mt-1 h-4 w-4" />
                    <span>신고 후 홈택스에서 분납 조회로 정확한 금액을 재확인할 예정인가?</span>
                  </label>
                </div>
              </section>

              {/* 관련 계산기 */}
              <section className="mt-12 border-t border-border-base pt-8">
                <h2 className="mb-6 text-2xl font-bold">관련 계산기</h2>
                <div className="grid gap-4 md:grid-cols-2">
                  <Link
                    href="/calculator/freelancer-tax/"
                    className="rounded-lg border border-border-base p-4 hover:border-primary-500 hover:bg-bg-card"
                  >
                    <h3 className="font-semibold text-primary-600 dark:text-primary-400">프리랜서 종합소득세 계산기</h3>
                    <p className="mt-1 text-sm text-text-secondary">
                      매출·경비율·부양가족·세액공제로 최종 납부액 즉석 계산
                    </p>
                  </Link>
                  <Link
                    href="/guide/freelancer-simplified-vs-standard-expense-rate-2026/"
                    className="rounded-lg border border-border-base p-4 hover:border-primary-500 hover:bg-bg-card"
                  >
                    <h3 className="font-semibold text-primary-600 dark:text-primary-400">
                      프리랜서 단순경비율 vs 기준경비율
                    </h3>
                    <p className="mt-1 text-sm text-text-secondary">
                      5월 31일까지 경비율 선택 기준 정리
                    </p>
                  </Link>
                  <Link
                    href="/guide/income-tax-late-filing-penalty-2026/"
                    className="rounded-lg border border-border-base p-4 hover:border-primary-500 hover:bg-bg-card"
                  >
                    <h3 className="font-semibold text-primary-600 dark:text-primary-400">무신고·지연 가산세 계산</h3>
                    <p className="mt-1 text-sm text-text-secondary">
                      신고 안 했거나 미납 시 부과되는 가산세 정확히 계산
                    </p>
                  </Link>
                  <Link
                    href="/guide/may-comprehensive-income-tax/"
                    className="rounded-lg border border-border-base p-4 hover:border-primary-500 hover:bg-bg-card"
                  >
                    <h3 className="font-semibold text-primary-600 dark:text-primary-400">5월 종합소득세 신고 완벽 가이드</h3>
                    <p className="mt-1 text-sm text-text-secondary">
                      신고 대상·기한·홈택스·절세·환급까지 한 페이지 정리
                    </p>
                  </Link>
                </div>
              </section>

              {/* 면책조항 */}
              <section className="mt-12 border-t border-border-base pt-8">
                <h2 className="mb-4 text-lg font-bold text-text-secondary">면책조항</h2>
                <p className="text-sm text-text-secondary leading-relaxed">
                  본 페이지의 정보는 소득세법 §77 및 국세기본법 기준 2026년 시점의 일반적 정보입니다. 개인의 구체적 상황(사업 형태, 지역,
                  추가 소득)에 따라 세액이나 분납 자격이 달라질 수 있으므로, 최종 판단은 국세청(☎ 1330) 또는 세무사·회계사 상담을
                  권장합니다. 본 페이지는 AI 보조 작성 후 운영자 검수 완료되었습니다. 2026년 세법 개정 시 내용이 변경될 수 있습니다.
                </p>
              </section>

              <ShareButtons
                title="종합소득세 분납 신청 2026"
                url={URL}
                description="5월 31일까지 5일! 납부세액 1천만 초과 시 2개월 분할 납부 가능. 분납 비율·기한·이자 정리."
              />
            </article>
          </main>
        </div>
        <Footer />
      </div>
    </>
  );
}
