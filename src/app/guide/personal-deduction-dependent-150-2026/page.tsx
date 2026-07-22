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

const URL = 'https://calculatorhost.com/guide/personal-deduction-dependent-150-2026/';
const DATE_PUBLISHED = '2026-05-26';
const DATE_MODIFIED = '2026-05-26';

export const metadata: Metadata = {
  title: '종소세 인적공제 부양가족 150만원 2026 | 직계존비속 형제자매 요건',
  description:
    '5월 31일 종합소득세 신고! 인적공제 기본공제 1인당 150만원 이해하기. 배우자·부모·자녀·형제자매·위탁아동 공제 요건·경로우대 100만·장애인 200만 추가공제·연소득 100만원 기준·중복 등록 위험·가산세까지 완벽 정리.',
  keywords: [
    '인적공제',
    '기본공제 150만',
    '부양가족',
    '소득세법 50',
    '배우자 공제',
    '부모 공제',
    '자녀 공제',
    '형제자매 공제',
    '경로우대 100만',
    '장애인 200만',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '종소세 인적공제 부양가족 150만원 2026 | 직계존비속 형제자매 요건' }],
    title: '종소세 인적공제 부양가족 150만원 2026 완벽 가이드',
    description: '본인·배우자·직계존비속·형제자매 공제 요건·추가공제·5월 신고 신청 방법.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '종소세 인적공제 부양가족 150만원 | 2026 5월 신고',
    description: '배우자·부모·자녀·형제자매 공제 요건과 추가공제 정리.',
  },
};

const FAQ_ITEMS = [
  {
    question: '인적공제 기본공제는 정확히 뭔가요?',
    answer:
      '소득세법 §50에 따른 기본공제로, 공제 대상자 1인당 150만 원을 소득에서 차감하는 것입니다. 본인은 무조건, 배우자·부모·자녀·형제자매 등은 일정 요건(나이·소득)을 만족할 때만 적용됩니다. 예: 부양가족 3명(배우자+자녀 2명) → 150만 × 3 = 450만 원 소득공제.',
  },
  {
    question: '배우자는 어떤 조건에서 공제받나요?',
    answer:
      '소득세법 §50 ① 2호에 따라 배우자는 연간 소득금액이 100만 원 이하여야 합니다. 근로소득만 있으면 총급여 500만 원 이하(근로소득공제 410만 후 100만 이하). 배우자가 조건을 만족하면 별도 서류 없이 신고 시 입력하면 됩니다.',
  },
  {
    question: '부모는 언제부터 공제받을 수 있나요?',
    answer:
      '직계존속(부모·조부모·외조부모)은 소득세법 §50 ① 3호에 따라 만 60세 이상이어야 합니다. 2026년 신고 기준 1966년 이전 출생. 나이는 만 나이 기준(생년월일 기준 아님). 만 60세 이상이고 연소득 100만 원 이하면 인적공제 150만 원 + 경로우대 100만 원 추가공제 가능(만 70세 이상).',
  },
  {
    question: '자녀는 몇 살까지 공제받나요?',
    answer:
      '직계비속(자녀·손자녀)은 만 20세 이하여야 합니다(소득세법 §50 ① 4호). 2026년 신고 기준 2006년 이후 출생. 만나이 기준이므로 생일이 지난 경우는 해당 연도부터 공제 불가. 연소득 100만 원 이하면 기본공제 150만 원 받고, 추가로 자녀세액공제(첫째 15만, 둘째 15만, 셋째 30만)도 적용 가능.',
  },
  {
    question: '형제자매도 부양가족으로 공제받을 수 있나요?',
    answer:
      '네, 소득세법 §50 ① 5호에 따라 가능합니다. 조건: ①만 20세 이하 또는 만 60세 이상 ②연소득 100만 원 이하. 장애인이면 나이 제약 없음(§50 ① 5호 단서). 다만 여러 형제자매 중 1명만 공제 가능 — 복수 공제 불가. 부모와 다르게 경로우대 추가공제도 없습니다.',
  },
  {
    question: '연소득 100만 원은 어떻게 계산하나요?',
    answer:
      '소득세법 시행령 §107에 따라 "근로소득·사업소득·이자·배당·연금·기타 모든 소득"을 합산한 금액입니다. 근로소득만 있으면 "근로소득공제 후 금액"(총급여 500만 이하가 대략 기준). 실제로는 국세청 홈택스 부양가족 등록 시 자동 검증되므로, 확실하지 않으면 세무사 상담 권장.',
  },
  {
    question: '장애인 추가공제는 얼마인가요?',
    answer:
      '소득세법 §51 ① 2호에 따라 장애인 1인당 200만 원을 추가공제합니다(기본공제 150만 + 추가 200만 = 350만 원). 장애인 등록(보건복지부·시군구)이 필수. 경로우대(만 70세, 100만 원 추가)와 중복 적용 가능하므로, 만 70세 이상 장애인은 300만 원(150 기본 + 200 장애 + 100 경로우대) = 450만 원 총 공제.',
  },
  {
    question: '부녀자 공제와 한부모 공제는 뭐가 다른가요?',
    answer:
      '부녀자: 배우자가 없고(사별·이혼·미혼) 부양가족이 있으면 50만 원 추가(소득세법 §51 ①). 한부모: 배우자가 없고 만 20세 이하 자녀를 부양하면 100만 원 추가(§51 ③). 한부모가 조건이 더 많지만 추가공제도 2배 많습니다. 둘 다 기본공제 150만과 중복 적용 가능.',
  },
  {
    question: '가짜 부양가족 등록하면 어떻게 되나요?',
    answer:
      '국세기본법 §14 "실질과세 원칙"에 위배되어 적발 시 추징·가산세 부과·형사 처벌까지 가능합니다. 국세청은 부양가족 등록자의 소득 조회(홈택스 연동)와 세무조사를 실시합니다. 기준 미충족(연소득 100만 초과·나이 미달) 가족을 등록하거나 실제 부양하지 않는 경우 무조건 적발. 추납부 세액 + 무단징수가산세 20% + 납부지연가산세.',
  },
];

export default function PersonalDeductionDependent2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '종소세 인적공제 가이드' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '종소세 인적공제 부양가족 150만원 2026 완벽 가이드',
    description:
      '기본공제 1인당 150만원·배우자·부모·자녀·형제자매 공제 요건·경로우대 100만·장애인 200만 추가공제·연소득 100만원 기준 정확 계산·중복 등록 위험·실질과세 원칙·5월 신고 신청 방법.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['인적공제', '부양가족', '소득세법', '150만원', '기본공제'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '종소세 인적공제 부양가족 150만원 2026 완벽 가이드',
    description:
      '5월 31일 종합소득세 신고! 기본공제 1인당 150만원·배우자·직계존속·직계비속·형제자매·위탁아동 공제 요건 정확 정리·경로우대 100만·장애인 200만 추가공제·연소득 100만원 기준·중복 가능 항목·중복 불가 항목·연명 오류 위험·가산세 위험.',
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
                    { name: '종소세 인적공제' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">세금 · 12분 읽기 · 2026-05-26</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">종소세 인적공제 부양가족 150만원 2026</h1>
              </header>

              <div className="prose prose-invert max-w-none space-y-6 text-text-primary">
                <p data-speakable className="text-lg leading-relaxed">
                  5월 31일 종합소득세 신고를 앞두고, 자신과 가족이 받을 수 있는 기본공제를 정확히 파악하는 것이
                  절세의 출발점입니다. 소득세법 §50에 따른 인적공제는 공제 대상자 1인당 150만 원의 소득을 차감하는
                  것인데, 누가 대상이 되는지, 어떤 조건을 만족해야 하는지 자주 헷갈립니다. 이 가이드는 배우자·부모·자녀·형제자매·위탁아동별
                  정확한 요건과 경로우대·장애인·부녀자·한부모 등 추가공제까지 완벽 정리합니다.
                </p>

                {/* Structured Summary */}
                <div className="rounded-lg border border-border-base bg-bg-card p-6">
                  <h2 className="mb-4 text-xl font-semibold">인적공제 한눈에</h2>
                  <table className="w-full border-collapse text-sm">
                    <thead>
                      <tr className="border-b border-border-base">
                        <th className="px-3 py-2 text-left font-semibold">공제 대상</th>
                        <th className="px-3 py-2 text-left font-semibold">주요 요건</th>
                        <th className="px-3 py-2 text-right font-semibold">기본공제</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="px-3 py-2">본인</td>
                        <td className="px-3 py-2">조건 없음</td>
                        <td className="px-3 py-2 text-right">150만 원</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="px-3 py-2">배우자</td>
                        <td className="px-3 py-2">연소득 100만 원 이하</td>
                        <td className="px-3 py-2 text-right">150만 원</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="px-3 py-2">
                          직계존속
                          <br className="md:hidden" />
                          (부모·조부모)
                        </td>
                        <td className="px-3 py-2">
                          만 60세 이상
                          <br className="md:hidden" />+ 연소득 100만 원 이하
                        </td>
                        <td className="px-3 py-2 text-right">150만 원</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="px-3 py-2">
                          직계비속
                          <br className="md:hidden" />
                          (자녀·손자녀)
                        </td>
                        <td className="px-3 py-2">
                          만 20세 이하
                          <br className="md:hidden" />+ 연소득 100만 원 이하
                        </td>
                        <td className="px-3 py-2 text-right">150만 원</td>
                      </tr>
                      <tr>
                        <td className="px-3 py-2">형제자매</td>
                        <td className="px-3 py-2">
                          만 20세 이하 또는 만 60세↑
                          <br className="md:hidden" />+ 연소득 100만 원 이하
                        </td>
                        <td className="px-3 py-2 text-right">150만 원</td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="mt-4 space-y-2 rounded bg-primary/10 p-4 text-sm">
                    <p className="font-semibold">추가공제 (기본공제에 더해 적용)</p>
                    <ul className="space-y-1">
                      <li>
                        <strong>경로우대:</strong> 만 70세 이상 → 100만 원 추가 (소득세법 §51 ① 1호)
                      </li>
                      <li>
                        <strong>장애인:</strong> 등록 장애인 → 200만 원 추가 (§51 ① 2호)
                      </li>
                      <li>
                        <strong>부녀자:</strong> 배우자 없고 부양가족 있음 → 50만 원 추가 (§51 ①)
                      </li>
                      <li>
                        <strong>한부모:</strong> 배우자 없고 만 20세 이하 자녀 부양 → 100만 원 추가 (§51 ③)
                      </li>
                    </ul>
                  </div>
                </div>

                {/* H2: 기본공제 대상 정확히 이해하기 */}
                <section className="space-y-4">
                  <h2 className="text-2xl font-bold">기본공제 대상별 정확한 요건</h2>
                  <p data-speakable>
                    소득세법 §50은 다섯 가지 기본공제 대상을 규정합니다. 각 대상마다 요건이 다르므로, 반드시 확인해야 합니다.
                  </p>

                  {/* 본인 */}
                  <div className="rounded-lg border border-border-base p-5">
                    <h3 className="mb-3 font-semibold">본인 (§50 ① 1호)</h3>
                    <p>
                      신고자 본인은 항상 150만 원 기본공제를 받습니다. 나이·소득 제한 없음. 다만 종합소득세 신고 의무가 있어야만 신청 가능합니다.
                      직장인으로 근로소득만 있으면 연말정산으로 이미 본인 공제를 받았으므로, 종합소득세 신고 시 추가로 신청할 수 없습니다.
                    </p>
                  </div>

                  {/* 배우자 */}
                  <div className="rounded-lg border border-border-base p-5">
                    <h3 className="mb-3 font-semibold">배우자 (§50 ① 2호)</h3>
                    <p>
                      배우자는 <strong>연간 소득금액 100만 원 이하</strong>일 때만 공제 대상입니다(소득세법 시행령 §107).
                      근로소득만 있으면 <strong>총급여 500만 원 이하</strong>(근로소득공제 약 410만 후 100만 이하가 기준)가 대략 맞습니다.
                    </p>
                    <p className="mt-3">
                      <strong>중요:</strong> 연소득은 모든 종류의 소득을 합산합니다. 근로소득 + 사업소득 + 이자 + 배당금 + 연금 + 기타소득.
                      배우자의 소득이 100만을 넘으면 공제 대상에서 제외됩니다. 반례로, 배우자가 프리랜서 소득 150만이면 기본공제 불가.
                    </p>
                  </div>

                  {/* 직계존속 */}
                  <div className="rounded-lg border border-border-base p-5">
                    <h3 className="mb-3 font-semibold">직계존속 — 부모·조부모·외조부모 (§50 ① 3호)</h3>
                    <p>
                      직계존속은 <strong>만 60세 이상</strong>이어야 합니다. 2026년 신고 기준 <strong>1966년 이전 출생</strong>.
                      만나이 기준이므로, 생일이 아직 지나지 않았으면 아직 대상이 아닙니다.
                    </p>
                    <p className="mt-3">
                      추가로 <strong>연소득 100만 원 이하</strong>를 만족해야 합니다. 모든 소득 종류 합산 기준입니다.
                    </p>
                    <p className="mt-3">
                      <strong>경로우대 추가공제:</strong> 만 70세 이상 직계존속은 기본공제 150만 + 경로우대 100만
                      = 총 250만 원 공제 가능 (소득세법 §51 ① 1호).
                    </p>
                  </div>

                  {/* 직계비속 */}
                  <div className="rounded-lg border border-border-base p-5">
                    <h3 className="mb-3 font-semibold">직계비속 — 자녀·손자녀 (§50 ① 4호)</h3>
                    <p>
                      직계비속은 <strong>만 20세 이하</strong>여야 합니다. 2026년 신고 기준 <strong>2006년 이후 출생</strong>.
                      만나이 기준이므로, 정확히 생일이 지난 날을 기준으로 합니다.
                    </p>
                    <p className="mt-3">
                      연소득 100만 원 이하도 만족해야 합니다. 아르바이트나 부업 소득이 있으면 포함됩니다.
                    </p>
                    <p className="mt-3">
                      <strong>자녀세액공제 동시 적용:</strong> 기본공제 150만 원과 별개로, 자녀세액공제(15만~30만)도 받을 수 있습니다.
                      기본공제는 소득 차감, 자녀세액공제는 세액에서 직접 차감하는 별개 항목입니다.
                    </p>
                  </div>

                  {/* 형제자매 */}
                  <div className="rounded-lg border border-border-base p-5">
                    <h3 className="mb-3 font-semibold">형제자매 (§50 ① 5호)</h3>
                    <p>
                      형제자매는 다음 중 하나를 만족해야 합니다:
                    </p>
                    <ul className="mt-2 space-y-1">
                      <li>
                        ① <strong>만 20세 이하</strong> (2006년 이후 출생)
                      </li>
                      <li>
                        ② <strong>만 60세 이상</strong> (1966년 이전 출생)
                      </li>
                      <li>
                        ③ <strong>장애인</strong> (나이 무관, 등록 장애 필수)
                      </li>
                    </ul>
                    <p className="mt-3">추가로 <strong>연소득 100만 원 이하</strong>를 만족해야 합니다.</p>
                    <p className="mt-3">
                      <strong>중요: 형제자매는 여러 명이 있어도 1명만 공제 가능합니다.</strong> 예를 들어 형, 누나, 동생 3명이
                      요건을 만족해도 "한 명의 형제자매만" 부양자로 등록할 수 있습니다(국세청 지침).
                    </p>
                  </div>

                  {/* 위탁아동 */}
                  <div className="rounded-lg border border-border-base p-5">
                    <h3 className="mb-3 font-semibold">위탁아동 (§50 ① 6호)</h3>
                    <p>
                      만 20세 이하 위탁아동을 6개월 이상 양육하면 150만 원 기본공제. 위탁 증명서(아동보호전문기관 발급)가 필요합니다.
                    </p>
                  </div>
                </section>

                {/* H2: 연소득 100만 원 기준의 함정 */}
                <section className="space-y-4">
                  <h2 className="text-2xl font-bold">연소득 100만 원 기준 정확히 이해하기</h2>
                  <p data-speakable>
                    배우자·부모·자녀·형제자매 공제 요건 중 가장 자주 틀리는 부분이 "연소득 100만 원" 기준입니다. 어떤 소득을 포함하는지,
                    어떻게 계산하는지 명확히 해야 합니다.
                  </p>

                  <div className="rounded-lg border border-primary bg-primary/5 p-5">
                    <h3 className="mb-3 font-semibold">포함되는 모든 소득 (소득세법 시행령 §107)</h3>
                    <ul className="space-y-2">
                      <li>
                        <strong>근로소득:</strong> 급여·보너스·수당 등 (근로소득공제 후)
                      </li>
                      <li>
                        <strong>사업소득:</strong> 프리랜서·임대료·가맹점주 소득 (경비 차감 후)
                      </li>
                      <li>
                        <strong>이자소득:</strong> 은행·금융회사 이자
                      </li>
                      <li>
                        <strong>배당소득:</strong> 주식·펀드 배당금
                      </li>
                      <li>
                        <strong>연금소득:</strong> 국민연금·퇴직연금·개인연금
                      </li>
                      <li>
                        <strong>기타소득:</strong> 강의료·원고료·상금 등
                      </li>
                      <li>
                        <strong>양도소득:</strong> 부동산·주식 양도차익
                      </li>
                    </ul>
                  </div>

                  <div className="mt-4">
                    <h3 className="mb-3 font-semibold">근로소득자 "총급여 500만 원" 기준의 의미</h3>
                    <p>
                      배우자가 근로소득만 있을 때, 흔히 "총급여 500만 원 이하"라고 말합니다. 이는 근로소득공제(4~13%)를 제외한 순소득이
                      100만 원 이하가 되려면, 대략 총급여 500만 원 정도가 기준이라는 뜻입니다.
                    </p>
                    <p className="mt-3">
                      <strong>정확한 계산 예:</strong> 배우자 총급여 500만 원 → 근로소득공제 410만 원 → 순 근로소득 90만 원.
                      다만 근로소득공제 정확한 율은 연도·구간에 따라 달라지므로, 확실하지 않으면 국세청 홈택스의 "부양가족
                      등록" 시뮬레이션을 사용하면 자동 검증됩니다.
                    </p>
                  </div>

                  <div className="mt-4">
                    <h3 className="mb-3 font-semibold">혼합 소득의 예 (함정!)</h3>
                    <p>
                      배우자가 근로소득 450만 원 + 이자소득 60만 원 = 총 510만 원이라면?
                    </p>
                    <ul className="mt-2 space-y-1">
                      <li>근로소득 공제 후: 450만 - 약 400만 = 약 50만 원</li>
                      <li>이자소득: 60만 원</li>
                      <li>합계: 50만 + 60만 = 110만 원 (100만 초과!)</li>
                    </ul>
                    <p className="mt-2">
                      이 경우 배우자는 연소득 100만 원을 초과하므로 기본공제 대상에서 제외됩니다. 주의가 필요합니다.
                    </p>
                  </div>
                </section>

                {/* H2: 추가공제 정확히 알기 */}
                <section className="space-y-4">
                  <h2 className="text-2xl font-bold">추가공제 4가지 — 기본공제에 더해 받기</h2>
                  <p data-speakable>
                    기본공제 150만 원과 별개로, 특정 조건을 만족하면 추가공제를 받을 수 있습니다. 중복 적용도 가능합니다.
                  </p>

                  <div className="rounded-lg border border-border-base p-5">
                    <h3 className="mb-3 font-semibold">1. 경로우대 공제 — 100만 원 (§51 ① 1호)</h3>
                    <p>
                      본인 또는 배우자·부모·형제자매 중 <strong>만 70세 이상</strong>인 사람에게 추가로 100만 원 공제합니다.
                      2026년 신고 기준 <strong>1956년 이전 출생</strong>.
                    </p>
                    <p className="mt-3">
                      <strong>예:</strong> 부모 2명이 만 70세 이상이면 → 기본공제 150만 × 2 = 300만 + 경로우대 100만 × 2 =
                      200만 → 총 500만 원 공제.
                    </p>
                  </div>

                  <div className="rounded-lg border border-border-base p-5">
                    <h3 className="mb-3 font-semibold">2. 장애인 공제 — 200만 원 (§51 ① 2호)</h3>
                    <p>
                      본인 또는 부양가족 중 <strong>장애인 등록</strong>이 되어 있으면 추가로 200만 원 공제합니다(기본공제 150만 별도).
                      장애인 등록증(보건복지부 또는 시군구청 발급)이 필수입니다.
                    </p>
                    <p className="mt-3">
                      <strong>중요:</strong> 장애인은 나이 제한이 없습니다. 만 25세인 자녀도, 형제자매도 장애인이면 공제 가능.
                    </p>
                    <p className="mt-3">
                      <strong>경로우대와 중복:</strong> 만 70세 이상 장애인 부모는 150(기본) + 200(장애) + 100(경로우대) = 450만 원
                      공제!
                    </p>
                  </div>

                  <div className="rounded-lg border border-border-base p-5">
                    <h3 className="mb-3 font-semibold">3. 부녀자 공제 — 50만 원 (§51 ①)</h3>
                    <p>
                      <strong>배우자가 없고 부양가족이 있는 여성</strong>에게 추가로 50만 원 공제합니다.
                      조건:
                    </p>
                    <ul className="mt-2 space-y-1">
                      <li>① 배우자가 없음 (사별·이혼·미혼·별거 등)</li>
                      <li>② 부양가족(자녀·부모 등) 1명 이상 있음</li>
                      <li>③ 신고자가 여성</li>
                    </ul>
                    <p className="mt-3">
                      <strong>주의:</strong> 남성 한부모는 부녀자 공제 불가. 대신 한부모 공제(100만)는 받을 수 있습니다.
                    </p>
                  </div>

                  <div className="rounded-lg border border-border-base p-5">
                    <h3 className="mb-3 font-semibold">4. 한부모 공제 — 100만 원 (§51 ③)</h3>
                    <p>
                      <strong>배우자가 없고 만 20세 이하 자녀를 부양</strong>하는 경우 추가로 100만 원 공제합니다.
                      조건:
                    </p>
                    <ul className="mt-2 space-y-1">
                      <li>① 배우자가 없음</li>
                      <li>② 만 20세 이하 직계비속(자녀·손자녀) 1명 이상</li>
                    </ul>
                    <p className="mt-3">
                      <strong>남녀 모두 적용 가능.</strong> 부녀자 공제(여성만, 50만) vs 한부모 공제(남녀, 100만)이므로,
                      한부모 자격이 있으면 한부모 공제(100만)가 더 유리합니다.
                    </p>
                  </div>
                </section>

                {/* H2: 절세 시뮬레이션 */}
                <section className="space-y-4">
                  <h2 className="text-2xl font-bold">인적공제로 얼마나 절세할까? 3가지 사례</h2>
                  <p data-speakable>
                    인적공제가 세액에 실제로 어떻게 영향을 미치는지 구체적인 시뮬레이션으로 확인해 봅시다.
                  </p>

                  <div className="rounded-lg border border-border-base p-5">
                    <h3 className="mb-3 font-semibold">사례 A: 직장인 + 배우자 + 자녀 2명</h3>
                    <p>
                      <strong>상황:</strong> 연봉 5,000만 원 직장인, 배우자 소득 없음, 자녀 2명(18세, 16세)
                    </p>
                    <ul className="mt-2 space-y-1">
                      <li>기본공제: 본인 150 + 배우자 150 + 자녀 150 × 2 = 600만 원</li>
                      <li>소득공제 후 과세표준: 약 4,400만 원 (근로소득공제 600만)</li>
                      <li>누진세율 구간: 15% (4,400만 이상 5,000만 이하)</li>
                      <li>인적공제의 세금 절감 효과: 600만 × 15% = 90만 원</li>
                    </ul>
                  </div>

                  <div className="rounded-lg border border-border-base p-5">
                    <h3 className="mb-3 font-semibold">사례 B: 사업자 + 부모 2명(경로우대 적용)</h3>
                    <p>
                      <strong>상황:</strong> 사업소득 8,000만 원, 부모 2명 모두 만 70세 이상, 소득 없음
                    </p>
                    <ul className="mt-2 space-y-1">
                      <li>기본공제: 본인 150 + 부모 2명 150 × 2 = 450만 원</li>
                      <li>경로우대: 100만 × 2 = 200만 원</li>
                      <li>총 인적공제: 650만 원</li>
                      <li>누진세율 구간: 24% (8,000만 이상 8,800만 이하)</li>
                      <li>절세 효과: 650만 × 24% = 156만 원</li>
                    </ul>
                  </div>

                  <div className="rounded-lg border border-border-base p-5">
                    <h3 className="mb-3 font-semibold">사례 C: 한부모(여성) + 자녀 1명 + 자녀세액공제</h3>
                    <p>
                      <strong>상황:</strong> 프리랜서 사업소득 3,000만 원, 만 18세 자녀 1명, 배우자 없음
                    </p>
                    <ul className="mt-2 space-y-1">
                      <li>기본공제: 본인 150 + 자녀 150 = 300만 원</li>
                      <li>한부모 공제: 100만 원</li>
                      <li>소득공제 총액: 400만 원 → 세금 절감 60만 원(15% 구간)</li>
                      <li>자녀세액공제(별도): 자녀 1명 15만 원 (세액에서 직접 차감)</li>
                      <li>총 절세: 60만 + 15만 = 75만 원</li>
                    </ul>
                  </div>
                </section>

                {/* H2: 함정 5가지 */}
                <section className="space-y-4">
                  <h2 className="text-2xl font-bold">주의: 인적공제 함정 5가지</h2>
                  <p data-speakable>
                    실제 신고 시 자주 실수하는 항목들입니다.
                  </p>

                  <div className="rounded-lg border border-danger/20 bg-danger/5 p-5">
                    <h3 className="mb-3 font-semibold">함정 1: 형제자매는 한 명만 등록 가능</h3>
                    <p>
                      형, 누나, 동생이 3명 모두 만 20세 이하이고 소득 100만 이하여도, 신고자가 공제받을 수 있는 형제자매는 1명뿐입니다.
                      여러 명을 등록하면 국세청에서 적출되어 추징 및 가산세 부과.
                    </p>
                  </div>

                  <div className="rounded-lg border border-danger/20 bg-danger/5 p-5">
                    <h3 className="mb-3 font-semibold">함정 2: 연나이와 만나이 혼동</h3>
                    <p>
                      부모 만 60세 = 1966년 이전 출생. 자녀 만 20세 = 2006년 이후 출생. 생일이 아직 지나지 않았으면 연나이는 한 살 더
                      많을 수 있으므로, "생년월일"로 정확히 확인해야 합니다.
                    </p>
                  </div>

                  <div className="rounded-lg border border-danger/20 bg-danger/5 p-5">
                    <h3 className="mb-3 font-semibold">함정 3: 연소득 100만 원 한계점의 오차</h3>
                    <p>
                      배우자 소득이 99만 원 vs 101만 원의 차이는 절세액 15만 원대입니다. 근로소득과 사업소득이 섞여 있으면 더욱 복잡해집니다.
                      불확실하면 국세청 상담실(1544-9944)에 확인하는 것이 안전.
                    </p>
                  </div>

                  <div className="rounded-lg border border-danger/20 bg-danger/5 p-5">
                    <h3 className="mb-3 font-semibold">함정 4: 추가공제 조건 혼동</h3>
                    <p>
                      경로우대는 본인이 아닌 부양가족만 적용. 부녀자 vs 한부모 조건(배우자 유무·자녀 조건)을 정확히 알아야 합니다.
                      잘못 신청하면 추후 정정신고 또는 가산세.
                    </p>
                  </div>

                  <div className="rounded-lg border border-danger/20 bg-danger/5 p-5">
                    <h3 className="mb-3 font-semibold">함정 5: 가짜 부양가족 등록의 위험</h3>
                    <p>
                      실제 부양하지 않거나 요건 미충족 가족을 등록하면 국세기본법 §14 "실질과세 원칙" 위반. 국세청은 부양가족 소득을
                      홈택스 자료로 자동 확인합니다. 적발 시 추납부 세액 + 무단징수가산세 20% + 납부지연가산세 + 형사 처벌까지 가능.
                    </p>
                  </div>
                </section>

                {/* H2: 5월 신고 신청 방법 */}
                <section className="space-y-4">
                  <h2 className="text-2xl font-bold">5월 종합소득세 신고 시 인적공제 신청 방법</h2>
                  <p data-speakable>
                    실제 홈택스에서 어떻게 신청하는지 단계별로 정리했습니다.
                  </p>

                  <ol className="space-y-3">
                    <li className="rounded-lg border border-border-base p-4">
                      <strong>1단계: 홈택스 로그인</strong>
                      <p className="mt-2">hometax.go.kr → 공인인증서/간편인증으로 로그인</p>
                    </li>
                    <li className="rounded-lg border border-border-base p-4">
                      <strong>2단계: 종합소득세 신고</strong>
                      <p className="mt-2">신고/납부 → 종합소득세 신고 → 모두채움/일반신고 선택</p>
                    </li>
                    <li className="rounded-lg border border-border-base p-4">
                      <strong>3단계: 소득 입력</strong>
                      <p className="mt-2">
                        소득 종류별 자료 채우기 (자동채움 확인 후 보정). 근로소득·사업소득·이자·배당 등 해당하는 항목만 입력.
                      </p>
                    </li>
                    <li className="rounded-lg border border-border-base p-4">
                      <strong>4단계: 공제 입력</strong>
                      <p className="mt-2">
                        소득공제 섹션 → 인적공제 → 본인/배우자/부양가족 입력. 부양가족 이름·주민번호·관계·소득 입력 필수.
                        조건(나이·소득)을 만족하지 않으면 시스템에서 자동 검증하여 거부할 수 있음.
                      </p>
                    </li>
                    <li className="rounded-lg border border-border-base p-4">
                      <strong>5단계: 세액공제 입력</strong>
                      <p className="mt-2">
                        별도로 자녀세액공제·의료비·교육비 공제 등을 입력. 인적공제(기본공제)와 세액공제는 서로 다른 항목.
                      </p>
                    </li>
                    <li className="rounded-lg border border-border-base p-4">
                      <strong>6단계: 결과 확인 및 제출</strong>
                      <p className="mt-2">
                        최종 세금 계산 결과 확인 → 전자신고 → 결재. 납부금액이 있으면 신용카드/계좌이체/가상계좌로 납부.
                        환급 대상이면 환급 계좌 입력 후 조회.
                      </p>
                    </li>
                  </ol>

                  <div className="mt-4 rounded-lg bg-primary/10 p-4">
                    <p className="text-sm">
                      <strong>Tip:</strong> 모바일도 가능합니다. 손택스 앱에서도 종합소득세 신고를 할 수 있으며, 더 간단하고 빠릅니다.
                    </p>
                  </div>
                </section>

                {/* FAQ */}
                <section className="space-y-4 border-t border-border-base pt-8">
                  <h2 className="text-2xl font-bold">자주 묻는 질문</h2>
                  <FaqSection items={FAQ_ITEMS} />
                </section>

                {/* Related Calculators */}
                <section className="space-y-4 border-t border-border-base pt-8">
                  <h2 className="text-2xl font-bold">관련 계산기·가이드</h2>
                  <div className="grid gap-3">
                    <Link
                      href="/calculator/salary"
                      className="rounded-lg border border-border-base p-4 hover:bg-bg-card"
                    >
                      <div className="font-semibold">연봉 실수령액 계산기</div>
                      <p className="text-sm text-text-secondary">
                        4대보험·인적공제·세액공제를 모두 반영한 정확한 월급 계산
                      </p>
                    </Link>
                    <Link
                      href="/guide/medical-expense-tax-credit-3-percent-2026/"
                      className="rounded-lg border border-border-base p-4 hover:bg-bg-card"
                    >
                      <div className="font-semibold">의료비 세액공제 가이드</div>
                      <p className="text-sm text-text-secondary">
                        부양가족 의료비 포함, 총급여 3% 초과분 15% 공제·700만 한도
                      </p>
                    </Link>
                    <Link
                      href="/calculator/child-tax-credit"
                      className="rounded-lg border border-border-base p-4 hover:bg-bg-card"
                    >
                      <div className="font-semibold">자녀세액공제 계산기</div>
                      <p className="text-sm text-text-secondary">
                        자녀 수에 따른 세액공제액 즉시 계산 (15만~30만)
                      </p>
                    </Link>
                    <Link
                      href="/guide/income-deduction-vs-tax-credit-2026"
                      className="rounded-lg border border-border-base p-4 hover:bg-bg-card"
                    >
                      <div className="font-semibold">소득공제 vs 세액공제 가이드</div>
                      <p className="text-sm text-text-secondary">
                        기본공제 150만의 세금 절감 메커니즘 이해하기
                      </p>
                    </Link>
                    <Link
                      href="/guide/may-comprehensive-income-tax"
                      className="rounded-lg border border-border-base p-4 hover:bg-bg-card"
                    >
                      <div className="font-semibold">5월 종합소득세 신고 완벽 가이드</div>
                      <p className="text-sm text-text-secondary">
                        신고 대상·기한·홈택스 단계별 신고법·절세까지 한 페이지
                      </p>
                    </Link>
                    <Link
                      href="/guide/income-tax-correction-claim-5-year-2026"
                      className="rounded-lg border border-border-base p-4 hover:bg-bg-card"
                    >
                      <div className="font-semibold">5년 경정청구로 놓친 세금 돌려받기</div>
                      <p className="text-sm text-text-secondary">
                        지난해 신고에서 공제 누락분을 되돌려받는 방법
                      </p>
                    </Link>
                  </div>
                </section>

                {/* Disclaimer */}
                <div className="rounded-lg border border-border-base bg-bg-card p-6 text-sm">
                  <p className="font-semibold">면책조항 및 정보</p>
                  <ul className="mt-3 space-y-2">
                    <li>
                      본 가이드는 2026년 세법을 기준으로 작성되었습니다. 법령 개정 시 내용이 변경될 수 있습니다.
                    </li>
                    <li>
                      <strong>AI 보조 작성:</strong> 본문은 Claude AI의 보조를 받아 작성된 후 운영자에 의해 검수되었습니다.
                    </li>
                    <li>
                      구체적인 세무 상담은 세무사·공인회계사·국세청(1544-9944)에 문의하시기 바랍니다.
                    </li>
                    <li>
                      소득세법 §50, §51 외 참고 법조항: 소득세법 §103(양도소득 기본공제),
                      국세기본법 §14(실질과세 원칙), 소득세법 시행령 §107(소득금액 산정)
                    </li>
                    <li>
                      <strong>마지막 갱신:</strong> 2026년 5월 26일
                    </li>
                  </ul>
                </div>
              </div>

              <ShareButtons
                title="종소세 인적공제 부양가족 150만원 2026"
                url={URL}
                description="기본공제·배우자·부모·자녀·형제자매 공제 요건과 추가공제 완벽 정리."
              />

              <AdSlot slot="guide-personal-deduction-dependent-mid" format="rectangle" />

              <Footer />
            </article>
          </main>
        </div>
      </div>
    </>
  );
}
