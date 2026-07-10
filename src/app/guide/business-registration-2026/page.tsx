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

const URL = 'https://calculatorhost.com/guide/business-registration-2026/';
const DATE_PUBLISHED = '2026-07-10';
const DATE_MODIFIED = '2026-07-10';

export const metadata: Metadata = {
  title: '개인사업자 등록 2026 | 프리랜서·간이·일반과세 비교',
  description:
    '프리랜서에서 개인사업자로 전환할 때 필요한 등록 절차와 간이과세(1억 400만원 미만) vs 일반과세 선택 기준. 부가가치세법 §8·§61 기준.',
  keywords: [
    '개인사업자 등록',
    '프리랜서 사업자 등록',
    '간이과세 기준',
    '일반과세 선택',
    '1억 400만원',
    '부가가치세법',
    '사업 개시',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '개인사업자 등록 2026 | 프리랜서·간이·일반과세 비교' }],
    title: '개인사업자 등록 2026 — 간이과세 vs 일반과세 선택 가이드',
    description: '프리랜서 3.3% 원천징수에서 벗어나 사업자 등록하는 방법. 간이과세(매출 1억 400만원 미만) 기준과 세금 비교.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '개인사업자 등록 2026 — 간이 vs 일반과세 완벽 비교',
    description: '프리랜서 3.3% 원천징수 탈출. 사업자 등록 절차·간이과세 1억 400만원 기준·부가세 납부 의무.',
  },
};

const FAQ_ITEMS = [
  {
    question: '프리랜서도 개인사업자로 등록해야 하나요?',
    answer:
      '프리랜서도 계속·반복적인 소득 활동을 하면 개인사업자 등록 대상입니다. 현재 프리랜서는 3.3% 원천징수를 당하고 있는데, 사업자 등록을 하면 이 원천징수를 피할 수 있고 소비세 관점에서도 유리한 선택지를 가질 수 있습니다. 다만 의무는 아니며, 신청하지 않으면 계속 원천징수 상태로 유지됩니다.',
  },
  {
    question: '사업 개시일부터 언제까지 등록해야 하나요?',
    answer:
      '부가가치세법 §8에 따라 사업을 개시한 날부터 20일 이내에 등록신청을 해야 합니다(홈택스 또는 관할 세무서 방문). 20일을 넘으면 가산세가 붙을 수 있으므로 서둘러야 합니다. 특히 프리랜서에서 전환하는 경우 "개시일"을 명확히 하고 그로부터 20일 이내 신청하세요.',
  },
  {
    question: '간이과세와 일반과세 중 뭘 선택해야 하나요?',
    answer:
      '매출 규모와 사업 특성에 따라 다릅니다. 매출이 1억 400만원 미만이고 투자가 적으면 간이과세(낮은 부가세)가 유리합니다. 반면 장비·인테리어 등 초기 투자가 크면 일반과세로 매입세액 환급을 받는 것이 훨씬 유리합니다. 초기 1~2년은 일반과세, 이후 매출 안정 후 간이로 전환하는 전략도 있습니다.',
  },
  {
    question: '간이과세 기준이 얼마인가요?',
    answer:
      '부가가치세법 §61에 따라 직전연도 공급대가(매출) 1억 400만원 미만이면 간이과세 대상입니다(2024년부터 8천만원에서 상향됨). 다만 제조업, 도매업, 부동산매매업 등 일부 업종과 특정 지역은 간이 적용 제외 업종이므로 확인이 필수입니다.',
  },
  {
    question: '간이과세자는 부가세를 안 내나요?',
    answer:
      '간이과세자의 부가세액은 매출×업종별 부가가치율×10%로 간단하게 계산됩니다. 일반과세처럼 영수증 하나하나를 관리할 필요가 없습니다. 다만 연 매출 4,800만원 미만이면 부가세 납부의무가 면제됩니다. 따라서 매출 4,800만원 미만 간이과세자는 부가세를 거의 내지 않을 수 있습니다.',
  },
  {
    question: '간이과세에서 일반과세로 전환할 수 있나요?',
    answer:
      '네, 자유롭게 선택할 수 있습니다. 간이과세자 중 매출이 1억 400만원을 초과하면 자동으로 일반과세자로 전환됩니다. 또한 투자 계획이 늘어나면 신청 후 일반과세로 전환할 수도 있습니다. 반대로 일반에서 간이로 변경하려면 조건을 다시 충족해야 합니다.',
  },
  {
    question: '세금계산서를 발급해야 하나요?',
    answer:
      '간이과세자는 원칙적으로 세금계산서 발급이 제한됩니다. 다만 연 매출 4,800만원 이상 간이과세자는 발급 의무가 생깁니다. 일반과세자는 매출과 관계없이 세금계산서를 발급해야 합니다. 거래처가 세금계산서를 요청하면 간이에서 일반과세로 전환하는 것을 고려해야 합니다.',
  },
  {
    question: '등록 후 어떤 의무가 생기나요?',
    answer:
      '사업자 등록 후 주요 의무는: (1) 부가가치세 신고(상반기 1~25일, 하반기 7~25일), (2) 종합소득세 신고(5월 1~31일), (3) 거래 기록 유지입니다. 특히 소비세 부분은 홈택스에서 자동 계산되므로, 결정 기한 전에 신고 기한을 확인하고 제출하세요.',
  },
];

export default function BusinessRegistration2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '개인사업자 등록 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '개인사업자 등록 2026 — 프리랜서 전환·간이 vs 일반과세 완벽 비교',
    description:
      '프리랜서 3.3% 원천징수 탈출. 사업자 개시일 20일 이내 등록 방법, 간이과세 1억 400만원 기준, 일반과세 선택 시 매입세액 환급까지 완전 정리.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['개인사업자', '간이과세', '일반과세', '등록절차', '프리랜서'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '개인사업자 등록 2026',
    description:
      '프리랜서에서 개인사업자로 전환하는 방법. 간이·일반과세 기준과 선택 전략.',
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
                    { name: '개인사업자 등록 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">프리랜서·부동산임대 · 12분 읽기 · 2026-07-10</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  개인사업자 등록 2026
                  <br />
                  <span className="text-2xl text-text-secondary">— 간이·일반과세 선택 전략</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  프리랜서 일을 하면서 3.3% 원천징수를 당하고 계신가요? 아니면 소규모 창업을 준비 중인가요? 개인사업자로 등록하면 세금 부담을 크게 줄일 수 있습니다. 이 가이드는 사업자 등록 절차부터 간이과세(매출 1억 400만원 미만)와 일반과세 중 어느 것을 선택해야 하는지, 그리고 선택에 따른 부가세 납부 방식까지 완전히 정리해드립니다.
                </p>
              </header>

              <AdSlot slot="guide-business-registration-top" format="horizontal" />

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">개인사업자 등록이란 무엇인가</h2>
                <p>
                  개인사업자 등록은 부가가치세법 §8에 따라 사업을 계속·반복하는 개인이 세무서에 신고하는 절차입니다. 프리랜서도 계속적인 소득 활동을 하면 등록 대상입니다. 등록하지 않으면 발주자 입장에서 3.3%를 원천징수하거나, 세무서가 미등록 상태로 적발하면 가산세를 부과할 수 있습니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">개인사업자 등록의 핵심</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    사업을 개시한 날부터 20일 이내에 홈택스(hometax.go.kr) 또는 관할 세무서에 신청해야 합니다(부가가치세법 §8).
                    <br />
                    등록 후 부가가치세(상반기·하반기 각 1회)와 소득세(연 1회) 신고 의무가 생깁니다.
                    <br />
                    간이과세 vs 일반과세 선택에 따라 부가세 계산 방식과 세금 액수가 크게 달라집니다.
                  </p>
                </div>
                <p className="mt-4">
                  특히 프리랜서 입장에서 보면, 사업자 등록을 통해 (1) 3.3% 원천징수 회피, (2) 사업 소비세 관점의 선택지 확보, (3) 장기적 절세 전략 수립이 가능해집니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">간이과세 vs 일반과세 비교표 (부가가치세법 §61)</h2>
                <p>
                  개인사업자로 등록한 후 첫 보고 시점에 간이과세자인지 일반과세자인지를 선택하거나 결정받게 됩니다. 두 제도는 부가세 계산 방식, 세금계산서 발급, 환급 가능성에서 완전히 다릅니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 간이과세 vs 일반과세 비교 (부가가치세법 §61, 2026 기준)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">항목</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">간이과세</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">일반과세</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3 font-semibold">직전연도 매출 기준</td>
                        <td className="p-3"><strong>1억 400만원 미만</strong></td>
                        <td className="p-3">제한 없음</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3 font-semibold">부가세 계산</td>
                        <td className="p-3">매출 × 업종 부가율 × 10%</td>
                        <td className="p-3">매출세 - 매입세</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3 font-semibold">세금계산서 발급</td>
                        <td className="p-3">제한 (연 4,800만 이상만 의무)</td>
                        <td className="p-3">의무</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3 font-semibold">부가세 납부 의무</td>
                        <td className="p-3">연 매출 4,800만원 미만 면제</td>
                        <td className="p-3">항상 신고 필수</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3 font-semibold">장비·인테리어 매입세</td>
                        <td className="p-3">공제 불가</td>
                        <td className="p-3"><strong>전액 공제 및 환급 가능</strong></td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3 font-semibold">기장 난이도</td>
                        <td className="p-3">간단 (복식 기장 불필요)</td>
                        <td className="p-3">복잡 (영수증 일일이 관리)</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3 font-semibold">적용 제외 업종</td>
                        <td className="p-3">제조업·도매·부동산매매 등</td>
                        <td className="p-3">없음</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  간단히 정리하면, **매출 소규모 + 투자 적음 = 간이과세(편함), 초기 투자 크거나 매출 변동 크거나 거래처가 세금계산서 요청 = 일반과세(유리)**입니다.
                </p>
                <p className="mt-4">
                  ⚠️ 다만 간이과세는 업종 제한이 있습니다. 제조업(음식료품·의류 제조), 도매업, 부동산매매업, 사용 목적이 비영리인 경우는 간이 적용 대상이 아니므로, 홈택스 시스템이나 세무서에 확인해야 합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">개인사업자 등록 절차 (20일 이내)</h2>
                <p>
                  부가가치세법 §8에 따라 사업을 개시한 날부터 20일 이내에 등록해야 합니다. 기한을 넘으면 가산세(500원/일 정도)가 붙으므로 최대한 빨리 진행하세요.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">방법 1. 홈택스 온라인 신청 (가장 빠름)</p>
                  <p className="text-sm text-text-secondary">
                    (1) 홈택스(hometax.go.kr) 접속 → 공인인증서/간편 로그인
                    <br />
                    (2) "신고납부" → "사업자등록" → "사업 개시 등록"
                    <br />
                    (3) 사업 개시일, 사업장 주소, 사업 품목 입력
                    <br />
                    (4) 간이과세 신청 여부 선택 (유지 기준 1억 400만원 미만)
                    <br />
                    (5) 즉시 등록완료, 사업자번호 발급
                    <br />
                    💡 팁: 절차 간단, 24시간 가능. 프리랜서라면 "용역료" 또는 "인적용역" 입력.
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">방법 2. 세무서 방문 신청</p>
                  <p className="text-sm text-text-secondary">
                    (1) 관할 세무서(지역 검색) 방문
                    <br />
                    (2) "사업자등록" 창구에서 신청서 작성
                    <br />
                    (3) 신분증 지참, 서명
                    <br />
                    (4) 그 자리에서 등록번호 발급
                    <br />
                    💡 팁: 복잡한 상황(특수업종, 소재지 애매함)일 때 추천. 상담 가능.
                  </p>
                </div>
                <p className="mt-4">
                  등록 후 약 1주일 뒤 세무서에서 확인 연락이 올 수 있습니다. 사업 위치, 품목, 사업 개시일을 맞춰 설명할 준비를 하세요. 거짓 신고(개시일 조작 등)는 나중에 적발 시 가산세·과태료가 크므로 정직하게 신청하는 것이 중요합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">간이과세 기준 (1억 400만원) & 부가세 계산</h2>
                <p>
                  부가가치세법 §61에 따라 직전연도 공급대가(매출)가 1억 400만원 미만이면 간이과세 대상입니다. 2024년부터 기준이 8천만원에서 1억 400만원으로 상향되었습니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">간이과세 부가세 계산 공식</p>
                  <p className="text-sm text-text-secondary">
                    <strong>부가세액 = 매출 × 업종별 부가가치율 × 10%</strong>
                    <br />
                    예시: 매출 5,000만원, 인적용역(부가율 30%)
                    <br />
                    → 부가세 = 5,000만 × 30% × 10% = <strong>150만원</strong>
                    <br />
                    <br />
                    💡 특징: 개별 영수증 확인 불필요. 매출 합계만 가지고 간단히 계산.
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">부가세 납부 의무 면제 (연 4,800만원 미만)</p>
                  <p className="text-sm text-text-secondary">
                    간이과세자 중 직전연도 매출이 4,800만원 미만이면 부가세 납부 의무가 면제됩니다.
                    <br />
                    예: 매출 4,500만원 × 30% × 10% = 135만원 → <strong>납부 면제</strong>
                    <br />
                    <br />
                    ⚠️ 다만 세금계산서를 발급해야 하는 경우(거래처 요청, 연 4,800만원 이상)는 일반과세로 전환해야 세금계산서를 발급할 수 있습니다.
                  </p>
                </div>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">일반과세 선택 전략 (초기 투자 많을 때 유리)</h2>
                <p>
                  개인사업자로 등록할 때 장비, 인테리어, 소프트웨어 등 초기 투자가 크다면 일반과세를 선택하는 것이 유리합니다. 매입세액을 전액 공제 및 환급받을 수 있기 때문입니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 1. 초기 투자 큰 경우 (일반과세 선택 시 유리)</p>
                  <p className="text-sm text-text-secondary">
                    · 사업 초기 장비 구입: 2,000만원 (부가세 포함 2,200만원 = 매입세 200만원)
                    <br />
                    · 첫해 매출: 3,000만원 (매출세 약 300만원, 업종 부가율 가정)
                    <br />
                    · 일반과세 부가세: 300만 - 200만 = <strong>100만원</strong> 또는 음수면 환급받음
                    <br />
                    · 간이과세 부가세: 3,000만 × 30% × 10% = 90만원 (매입세 공제 불가)
                    <br />
                    결론: 일반과세 선택하면 초기 200만원 매입세를 전액 활용 가능.
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 2. 소규모 프리랜서 (간이과세 유리)</p>
                  <p className="text-sm text-text-secondary">
                    · 매출: 2,500만원 (초기 투자 0)
                    <br />
                    · 간이과세 부가세: 2,500만 × 30% × 10% = 75만원
                    <br />
                    · 일반과세 부가세: 약 250만원 (매입세 없어도 신고 필수)
                    <br />
                    결론: 투자가 없으면 간이과세가 훨씬 편하고 저렴.
                  </p>
                </div>
                <p className="mt-4">
                  ⚠️ 다만 일반과세를 선택하면 모든 거래의 세금계산서를 관리해야 하고, 분기마다(또는 반기마다) 부가세를 신고해야 합니다. 기장 복잡도가 높아지므로 회계사 도움이 필요할 수 있습니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">프리랜서 3.3% 원천징수와의 관계</h2>
                <p>
                  현재 프리랜서들은 발주자가 용역료의 3.3%를 원천징수합니다. 사업자 등록 후 거래처에 사업자번호를 알려주면 원천징수를 피할 수 있습니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사업자 등록 전후 비교</p>
                  <p className="text-sm text-text-secondary">
                    <strong>등록 전 (프리랜서):</strong>
                    <br />
                    발주자로부터 용역료 1,000만원 수령 → 3.3% 원천징수 33만원 제외 → 실제 수령 967만원
                    <br />
                    <br />
                    <strong>등록 후 (사업자):</strong>
                    <br />
                    발주자로부터 용역료 1,000만원 수령 → 원천징수 0 → 실제 수령 <strong>1,000만원</strong>
                    <br />
                    (부가세는 별도로 신고·납부하되, 간이과세면 100만원대 정도)
                    <br />
                    <br />
                    결론: 부가세를 내더라도 3.3% 원천징수 33만원보다 대부분 유리.
                  </p>
                </div>
                <p className="mt-4">
                  다만 일부 거래처는 "사업자번호 없으면 원천징수 필수"라는 내부 규칙이 있을 수 있으므로, 등록 직후 거래처에 새로운 사업자번호를 알리세요.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">사업자 등록 후 필수 신고 일정</h2>
                <p>
                  개인사업자로 등록한 후 해야 할 주요 신고는 다음과 같습니다. 기한을 놓치면 가산세가 붙으므로 미리 달력에 표시해두세요.
                </p>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li>
                    <strong>부가가치세 신고 (반기 2회):</strong> 상반기(1~25일), 하반기(7~25일)
                  </li>
                  <li>
                    <strong>종합소득세 신고 (연 1회):</strong> 5월 1~31일 (홈택스에서 자동 계산 후 확인만)
                  </li>
                  <li>
                    <strong>거래 기록 유지 (간이 간단함, 일반 복잡함):</strong> 일반과세자는 매입·매출 영수증 모두 5년 보관
                  </li>
                  <li>
                    <strong>필요 시 세금계산서 발급:</strong> 간이과세자는 필요시만, 일반과세자는 필수
                  </li>
                </ul>
                <p className="mt-4">
                  홈택스의 "신고납부" 메뉴에서 모든 절차를 진행할 수 있으므로, 미리 숙지해두면 좋습니다.
                </p>
              </section>

              <AdSlot slot="guide-business-registration-mid" format="rectangle" />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h2 className="text-2xl font-bold">실제 세부담 비교 (3가지 시나리오)</h2>
                <p>
                  다음 3가지 시나리오를 통해 등록 전후, 간이 vs 일반의 실제 세 차이를 비교해보겠습니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">시나리오 A. 소규모 프리랜서 (연 3,000만원)</p>
                  <p className="text-sm text-text-secondary">
                    <strong>등록 전 (3.3% 원천징수):</strong> 연 3,000만 × 3.3% = 99만원 손실
                    <br />
                    <strong>등록 후 간이과세:</strong> 3,000만 × 30%(부가율) × 10% = 90만원 부가세 (1회 신고)
                    <br />
                    <strong>등록 후 일반과세:</strong> ~250만원 부가세 + 기장비용 (투자 없을 때는 비효율)
                    <br />
                    → <strong>결론: 간이과세로 사업자 등록 추천</strong>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">시나리오 B. 초기 투자 많은 사업자 (장비 2,000만원 + 매출 4,000만원)</p>
                  <p className="text-sm text-text-secondary">
                    <strong>간이과세:</strong> 4,000만 × 30% × 10% = 120만원 (장비 매입세 공제 불가)
                    <br />
                    <strong>일반과세:</strong> 매출세 ~400만 - 매입세 200만 = ~200만원, 하지만 매입세 환급 가능
                    <br />
                    <strong>초기 매입세 200만원을 환급/공제하면 순 효과:</strong> 약 100만원 절감
                    <br />
                    → <strong>결론: 초기 투자 2년 계획이면 일반과세로 시작 후 간이로 전환 검토</strong>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">시나리오 C. 소규모 간이 + 연매출 4,800만원 이하</p>
                  <p className="text-sm text-text-secondary">
                    <strong>간이과세 부가세액:</strong> 4,800만 × 30% × 10% = 144만원
                    <br />
                    <strong>납부의무 면제:</strong> 연매출 4,800만원 미만이므로 → <strong>0원 납부</strong>
                    <br />
                    <strong>절감액:</strong> 144만원 (종종 세금계산서 미발급으로도 가능)
                    <br />
                    → <strong>결론: 프리랜서로 연 4,000~4,800만원이면 거의 세금 없이 사업 가능</strong>
                  </p>
                </div>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">간이과세 배제 업종 확인</h2>
                <p>
                  간이과세 대상이 아닌 업종들이 있습니다. 이런 업종은 자동으로 일반과세자가 됩니다. 사업자 등록 전에 자신의 업종이 포함되는지 꼭 확인하세요.
                </p>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li>
                    <strong>제조업:</strong> 음식료품, 음료, 의류, 신발, 가구, 기계 등 직접 제조
                  </li>
                  <li>
                    <strong>도매업:</strong> 도매 목적 재판매 (소매는 간이 가능)
                  </li>
                  <li>
                    <strong>부동산 관련:</strong> 부동산매매, 개발, 임대료 수익 (일부 지역 제외)
                  </li>
                  <li>
                    <strong>금융·보험·의료:</strong> 은행, 보험사, 의료기관, 약국
                  </li>
                  <li>
                    <strong>통신·전기·가스:</strong> 통신사, 전기·가스 공급
                  </li>
                  <li>
                    <strong>교육 (영리):</strong> 학원, 과외, 온라인 강의 (학교 제외)
                  </li>
                </ul>
                <p className="mt-4">
                  ⚠️ 다만 업종 분류는 국세청의 "표준산업분류"에 따르므로, 홈택스 시스템에서 정확히 확인하거나 세무서에 직접 문의하는 것이 가장 안전합니다. 예를 들어 "1인 브랜드 패션 판매"는 제조(맞춤)인지 소매(판매)인지에 따라 판정이 달라질 수 있습니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">간이에서 일반과세로 전환하기</h2>
                <p>
                  간이과세자로 시작했어도 나중에 일반과세로 전환할 수 있습니다. 예를 들어 거래처가 세금계산서를 요청하거나, 매출이 1억 400만원을 초과하면 자동 전환되기도 합니다.
                </p>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li>
                    <strong>자동 전환:</strong> 직전연도 매출 1억 400만원 초과 → 다음 연도부터 자동으로 일반과세자
                  </li>
                  <li>
                    <strong>선택적 전환:</strong> 일반과세로의 세무적 이득이 크다면 신청서 제출로 전환 가능 (단, 최소 2년 이상 유지 조건)
                  </li>
                  <li>
                    <strong>역전환 (일반 → 간이):</strong> 매출이 다시 내려가면 신청 후 간이로 돌아갈 수 있음 (단, 대기 기간 있을 수 있음)
                  </li>
                </ul>
                <p className="mt-4">
                  대부분의 경우 "매출이 늘어나면 일반과세, 투자가 크면 처음부터 일반과세"가 현명한 선택입니다.
                </p>
              </section>

              <h2 className="text-2xl font-bold mb-6">자주 묻는 질문</h2>
              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h3 className="text-lg font-semibold text-text-primary">관련 계산기 및 가이드</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link
                    href="/calculator/freelancer-tax/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">프리랜서 종합소득세 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">3.3% 원천징수 후 연 종소세까지 계산.</p>
                  </Link>
                  <Link
                    href="/guide/freelancer-take-home-3-3-percent-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">프리랜서 3.3% 원천징수 완벽 이해</div>
                    <p className="mt-1 text-sm text-text-secondary">3.3% 공제 이유·계산·환급 절차.</p>
                  </Link>
                  <Link
                    href="/guide/n-jobber-comprehensive-income-tax-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">N잡러 건강보험·부가세 완벽 가이드</div>
                    <p className="mt-1 text-sm text-text-secondary">N개 소득원 · 피부양자 탈락 · 보험료 계산.</p>
                  </Link>
                  <Link
                    href="/guide/vat-early-refund-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">부가세 환급 스케줄·신청 방법</div>
                    <p className="mt-1 text-sm text-text-secondary">초기 투자 후 매입세 환급받기.</p>
                  </Link>
                  <Link
                    href="/calculator/simplified-vs-standard-vat/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">간이 vs 일반과세 세금 비교</div>
                    <p className="mt-1 text-sm text-text-secondary">매출 입력 후 부가세 즉시 계산.</p>
                  </Link>
                  <Link
                    href="/category/tax/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">모든 세금 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">소득세·양도세·상속세 등 전체 모음.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 교육 목적으로 작성되었으며, 개인 맞춤형 세무 조언이 아닙니다. 실제 사업자 등록, 간이·일반과세 선택, 부가세 계산은 관할 세무서 또는 홈택스(hometax.go.kr)에서 반드시 확인하세요. 특히 업종 분류, 간이과세 배제 여부, 초기 투자 상황에 따른 세무 전략은 세무사·회계사의 개인 상담을 받는 것이 가장 안전합니다. 본 콘텐츠는 2026-07-10을 기준으로 작성되었으며, 부가가치세법 개정 시 즉시 업데이트됩니다. 법적 근거: <strong>부가가치세법 §8(사업자등록), §61(간이과세), 소득세법 §168(사업자등록)</strong>. AI 보조 작성 후 운영자 검수 완료.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터(부가가치세법 §8·§61)</a>,{' '}
                  <a href="https://www.hometax.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">홈택스(사업자등록 신청)</a>,{' '}
                  <a href="https://www.nts.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">국세청(부가가치세 기본정보)</a>.
                </p>
              </section>

              <ShareButtons
                title="개인사업자 등록 2026 가이드"
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
