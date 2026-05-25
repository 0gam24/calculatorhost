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
  buildHowToJsonLd,
} from '@/lib/seo/jsonld';

const URL = 'https://calculatorhost.com/guide/monthly-rent-tax-credit-2026/';
const DATE_PUBLISHED = '2026-05-23';
const DATE_MODIFIED = '2026-05-23';

export const metadata: Metadata = {
  title: '🔑 월세 세액공제 2026 무주택 직장인 환급 계산 | calculatorhost',
  description:
    '2026년 월세 세액공제 완벽 가이드. 17% vs 15% 공제율, 750만 원 한도, 자격 조건(무주택·7000만 원 이하), 신청 방법, 5월 추가 신고로 환급 받는 법까지 한눈에 정리.',
  keywords: [
    '월세 세액공제',
    '월세 세액공제 2026',
    '월세 환급',
    '무주택 세액공제',
    '월세 17% 공제',
    '월세 공제 대상',
    '월세 공제 한도',
    '월세 세액공제 신청',
    '연말정산 월세',
    '5월 종소세 월세',
  ],
  alternates: { canonical: URL },
  openGraph: {
    title: '월세 세액공제 2026 무주택 직장인 환급 계산',
    description: '17% vs 15% 공제율 + 750만 한도 + 자격 조건 + 신청 방법 + 실전 사례',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '월세 세액공제 2026 무주택 직장인 환급 계산',
    description: '17% 공제 + 750만 한도 + 실전 사례 3개 시뮬레이션',
  },
};

const FAQ_ITEMS = [
  {
    question: '월세 세액공제 누가 받을 수 있나요?',
    answer:
      '무주택 세대주 + 총급여 7,000만 원 이하(종합소득금액 6,000만 원 이하) + 국민주택규모(85㎡) 이하 임차가 필수 요건입니다(조세특례제한법 §95의2). 직장인·프리랜서·사업자 모두 가능. 외국인 거주자도 세대주 요건 충족 시 가능. 다만 배우자와 합산 시 한 명만 공제 받음.',
  },
  {
    question: '월세 50만원을 1년 내면 얼마를 환급받나요?',
    answer:
      '월세 50만 × 12개월 = 600만 원. 총급여 5,500만 원 이하면 17% 공제 = 102만 원 환급. 5,500~7,000만 원이면 15% 공제 = 90만 원 환급. 600만이 한도(750만) 이내이므로 전액 적용. 이는 환급액 기준이며, 실제 결정세액은 다른 소득공제·세액공제와 함께 계산됩니다.',
  },
  {
    question: '월세 70만 1년을 냈는데 공제 한도가 750만이라고 했는데?',
    answer:
      '월세 70만 × 12개월 = 840만 원이 발생하지만, 공제 한도는 연 750만 원이므로 750만 원까지만 공제 적용. 총급여 5,500만 이하면 750만 × 17% = 127.5만 원 환급 (한도 도달). 초과분 90만 원은 버려집니다. 한도를 고려해 공제율 × 750만 = 최대 환급액을 미리 계산하면 좋습니다.',
  },
  {
    question: '연말정산에서 누락했으면 5월 종소세에서 추가 환급 받을 수 있나요?',
    answer:
      '네. 직장인이 연말정산(1월)에서 월세 세액공제를 빠뜨렸다면, 5월 종합소득세 확정신고(소득세법 §70)로 환급을 추가 받을 수 있습니다. 이를 "추가 신고"라 합니다. 기한 내(5월 31일) 신고 시 추가 납부 시 가산세 없음. 다만 3년 이상 놓쳤으면 경정청구(기한 5년)로 소급 청구 가능.',
  },
  {
    question: '신용카드 소득공제와 월세 세액공제를 동시에 받을 수 있나요?',
    answer:
      '불가능. 같은 월세액에 대해 신용카드 소득공제(15%)와 월세 세액공제(17%)를 택일해야 합니다(조세특례제한법 §95의2 ②). 월세는 현금이므로 신용카드 영수증으로 인정 안 되고, 현금영수증 발급 시 둘 중 하나만 선택. 일반적으로 월세 세액공제 17%가 더 유리합니다.',
  },
  {
    question: '고시원이나 오피스텔도 공제 받을 수 있나요?',
    answer:
      '가능합니다. 국민주택규모(85㎡) 이하 또는 기준시가 4억 원 이하인 주택·오피스텔·고시원 등 모두 해당. 다만 반드시 "임차주택"이어야 하므로 기숙사·월세방·자취방도 포함되지만, 호텔·숙박시설은 제외. 임대차계약서와 주민등록상 주소지 일치가 필수 요건입니다.',
  },
  {
    question: '2024년에 공제율이 올랐다고 했는데?',
    answer:
      '맞습니다. 2024년 세법 개정으로 월세 세액공제율이 상향되었습니다(조세특례제한법 §95의2 개정). 기존 15%/12%에서 17%/15%로 인상. 2024년 1월 이후 월세 공제는 새로운 세율 적용. 과거(2023년 이전) 월세는 연말정산 정정·경정청구 시 구 세율로 환급됩니다.',
  },
  {
    question: '월세 세액공제 신청 안 했으면 언제까지 환급받을 수 있나요?',
    answer:
      '원칙적으로 신고 기한(연말정산 2월 말 또는 5월 종소세 31일) 내 신청. 기한 내 못했다면 경정청구(소득세법 §48)로 5년간 소급 청구 가능합니다. 예: 2021년 월세를 2026년 현재 경정청구 가능(5년 이내). 5년 초과 시 환급 불가. 기한 내 신고가 가장 안전하므로 빨리 신청하세요.',
  },
] as const;

export default function MonthlyRentTaxCreditPage() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '월세 세액공제 2026 환급 가이드' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '월세 세액공제 2026 무주택 직장인 환급 계산 가이드',
    description:
      '2026년 월세 세액공제 완벽 가이드. 17% vs 15% 공제율 구분, 750만 원 한도, 자격 조건, 신청 방법, 5월 추가 신고로 환급 받는 법.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['월세 세액공제', '무주택 공제', '월세 환급', '17% 공제', '2026'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '월세 세액공제 2026 무주택 직장인 환급 계산',
    description:
      '2026년 월세 세액공제 가이드. 17%/15% 공제율 + 750만 한도 + 자격 조건 + 신청 방법 + 5월 추가 신고 가능 + 실전 3가지 사례 시뮬레이션.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
  });
  const faqLd = buildFaqPageJsonLd([...FAQ_ITEMS]);
  const speakableLd = buildSpeakableJsonLd(['[data-speakable]']);
  const howtoLd = buildHowToJsonLd({
    name: '월세 세액공제 신청하기',
    description: '연말정산 또는 5월 종소세 신고에서 월세 세액공제를 신청하는 단계별 방법',
    steps: [
      {
        name: '자격 확인',
        text: '무주택 + 총급여 7,000만 원 이하 + 국민주택규모(85㎡) 이하 임차 여부 확인. 임대차계약서와 월세 송금 영수증 준비.',
      },
      {
        name: '공제율 결정',
        text: '총급여 5,500만 원 이하면 17%, 5,500~7,000만 원이면 15% 적용. 월세액 × 공제율 ≤ 750만 원 계산.',
      },
      {
        name: '홈택스 신청',
        text: '직장인 연말정산: 1월 근무처에서 또는 홈택스 "연말정산 간소화" → "월세 주택차입금" 입력. 프리랜서/사업자: 5월 종소세 신고시 "월세 세액공제" 섹션 입력.',
      },
      {
        name: '증빙 서류 보관',
        text: '임대차계약서 사본 + 월세 송금 영수증(계좌이체·무통장입금) + 주민등록등본(주소지 일치 확인용) 5년 보관.',
      },
      {
        name: '환급 확인',
        text: '연말정산 결과(2월) 또는 종소세 신고 후(6월 말~7월 초) 환급액 입금 확인. 미반영 시 경정청구로 소급 신청 가능(5년 이내).',
      },
    ],
  });

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howtoLd) }} />

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
                    { name: '월세 세액공제 2026 환급 가이드' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">세금·부동산 · 8분 읽기 · 2026-05-23</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  월세 세액공제 2026 환급 계산 가이드
                  <br />
                  <span className="text-2xl text-text-secondary">— 무주택 직장인·프리랜서 17% 환급받는 법</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  2026년 월세를 내고 있는 무주택 세대주라면 최대 127.5만 원까지 환급받을 수 있습니다.
                  조세특례제한법 §95의2에 따른 월세 세액공제가 2024년부터 17%로 인상되었기 때문입니다.
                  이 가이드는 자격 조건·공제율 결정·신청 방법·5월 추가 신고로 놓친 환급을 받는 법까지
                  실전 사례로 정리합니다.
                </p>
              </header>

              <AdSlot slot="guide-monthly-rent-tax-credit-top" format="horizontal" />

              {/* 핵심 요약 */}
              <section aria-label="핵심 요약" className="card border-l-4 border-l-primary-500">
                <h2 className="mb-2 text-caption uppercase tracking-wider text-primary-500">핵심 요약</h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border-base bg-primary-500/5">
                        <th className="px-3 py-2 text-left">항목</th>
                        <th className="px-3 py-2 text-left">내용</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-subtle">
                        <td className="px-3 py-2 font-semibold">자격 요건</td>
                        <td className="px-3 py-2">무주택 세대주 + 총급여 7,000만 원 이하 + 국민주택규모(85㎡) 이하 임차</td>
                      </tr>
                      <tr className="border-b border-border-subtle">
                        <td className="px-3 py-2 font-semibold">공제율</td>
                        <td className="px-3 py-2">총급여 5,500만 원 이하: 17% / 5,500~7,000만 원: 15%</td>
                      </tr>
                      <tr className="border-b border-border-subtle">
                        <td className="px-3 py-2 font-semibold">공제 한도</td>
                        <td className="px-3 py-2">연 월세액 750만 원 초과분은 공제 불가 (한도 도달 시 버려짐)</td>
                      </tr>
                      <tr>
                        <td className="px-3 py-2 font-semibold">신청 시기</td>
                        <td className="px-3 py-2">연말정산(1월) 또는 5월 종합소득세 신고, 미반영 시 경정청구(5년 이내)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <ul className="mt-4 space-y-1.5 text-sm" data-speakable>
                  <li>💰 <strong>최대 환급액</strong>: 750만 원 × 17% = 127.5만 원 (한도)</li>
                  <li>📅 <strong>추가 신고 기한</strong>: 5월 31일(토) → 6월 2일(월) 자동 연장 가능</li>
                  <li>⚠️ <strong>택일</strong>: 신용카드 소득공제와 중복 불가 (월세 세액공제 17% 권장)</li>
                  <li>🏠 <strong>임차 대상</strong>: 주택·오피스텔·고시원 모두 가능(기준시가 4억 이하)</li>
                </ul>
              </section>

              {/* 1. 월세 세액공제란? */}
              <section className="space-y-4">
                <h2 className="text-2xl font-bold">1. 월세 세액공제란? — 2024년 17%로 인상</h2>
                <p className="text-text-secondary leading-relaxed">
                  월세 세액공제는 무주택 세대주가 월세를 낼 때 일부를 세금에서 직접 차감해주는 제도입니다(조세특례제한법 §95의2).
                  소득공제(소득에서 빼기)가 아니라 세액공제(세금에서 빼기)이므로, 실제 환급 효과가 더 높습니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <h3 className="mb-3 font-semibold text-text-primary">2024년 공제율 인상 이력</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-primary-500/10 border border-border-base">
                          <th className="px-3 py-2 text-left">연도</th>
                          <th className="px-3 py-2 text-left">5,500만 원 이하</th>
                          <th className="px-3 py-2 text-left">5,500~7,000만 원</th>
                        </tr>
                      </thead>
                      <tbody className="text-text-secondary">
                        <tr className="border border-border-base">
                          <td className="px-3 py-2 font-semibold">2023년 이전</td>
                          <td className="px-3 py-2">15%</td>
                          <td className="px-3 py-2">12%</td>
                        </tr>
                        <tr className="border border-border-base bg-primary-500/5">
                          <td className="px-3 py-2 font-semibold">2024년 이후</td>
                          <td className="px-3 py-2"><strong>17%</strong></td>
                          <td className="px-3 py-2"><strong>15%</strong></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <p className="mt-3 text-sm text-text-secondary">
                    2024년 1월 1일 이후 임차하는 월세부터 새로운 세율 적용. 과거 월세는 경정청구로 소급 청구 가능(5년 이내).
                  </p>
                </div>
                <p className="text-text-secondary leading-relaxed">
                  <strong>핵심 이점</strong>: 소득공제와 달리 세액공제는 "세금을 직접 돌려준다"는 뜻입니다.
                  예를 들어 월세 600만 원, 17% 공제율이면 <strong>102만 원을 환급</strong>받습니다(합산 소득·다른 공제와 무관).
                </p>
              </section>

              {/* 2. 자격 조건 */}
              <section className="space-y-4">
                <h2 className="text-2xl font-bold">2. 월세 세액공제 자격 조건 — 5가지 필수 요건</h2>
                <div className="space-y-3">
                  <div className="rounded-lg border border-border-base bg-bg-raised p-4">
                    <h3 className="mb-3 font-semibold text-text-primary">필수 자격 5가지</h3>
                    <ol className="space-y-2.5 text-sm text-text-secondary">
                      <li>
                        <strong className="text-text-primary">① 무주택 세대주</strong>
                        <br />
                        본인과 배우자가 주택을 소유하지 않아야 함(세대주 기준). 미혼·이혼·사별도 세대주이면 가능.
                        다만 "세대주" 기준이므로 배우자나 성년 자녀가 주택 소유 시 불가.
                      </li>
                      <li>
                        <strong className="text-text-primary">② 총급여 7,000만 원 이하</strong>
                        <br />
                        근로소득자는 "총급여" 기준(비과세 제외). 프리랜서·사업자는 "종합소득금액" 6,000만 원 이하.
                        연말정산 전에는 원천징수 총액으로 임시 판단 가능.
                      </li>
                      <li>
                        <strong className="text-text-primary">③ 국민주택규모(85㎡) 이하 임차</strong>
                        <br />
                        주택은 85㎡ 이하, 오피스텔·고시원은 기준시가 4억 원 이하. 초과하면 공제 불가.
                        임대차계약서에 면적 기재된 경우 확인, 미기재면 등기부등본으로 확인.
                      </li>
                      <li>
                        <strong className="text-text-primary">④ 임대차계약서 + 월세 송금 증명</strong>
                        <br />
                        임대차계약서(사본) + 월세 입금 영수증(계좌이체·무통장입금증) 필수. 현금 지급 시 증명 불가.
                        계약서상 주소 = 주민등록상 주소 일치 필수.
                      </li>
                      <li>
                        <strong className="text-text-primary">⑤ 국내 거주</strong>
                        <br />
                        국내에 주민등록상 거주 중인 세대주(외국인 거주자도 가능, 단 세대주 요건 충족 필요).
                      </li>
                    </ol>
                  </div>
                  <div className="rounded-lg border-l-4 border-l-danger-500 bg-danger-500/5 p-4">
                    <p className="text-sm text-danger-700 dark:text-danger-300">
                      <strong>⚠️ 흔한 오류</strong>: 배우자가 주택 소유하면 본인도 "무주택"이라도 불가능합니다.
                      "무주택 세대주"는 본인+배우자 공동 조건입니다.
                    </p>
                  </div>
                </div>
              </section>

              {/* 3. 공제율 결정 */}
              <section className="space-y-4">
                <h2 className="text-2xl font-bold">3. 공제율 결정 — 17% vs 15% 어디에 해당?</h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <thead>
                      <tr className="bg-primary-500/10 border border-border-base">
                        <th className="px-3 py-2 text-left">구분</th>
                        <th className="px-3 py-2 text-left">총급여</th>
                        <th className="px-3 py-2 text-left">공제율</th>
                        <th className="px-3 py-2 text-left">월세 600만 시 환급액</th>
                      </tr>
                    </thead>
                    <tbody className="text-text-secondary">
                      <tr className="border border-border-base">
                        <td className="px-3 py-2 font-semibold">높은 공제율</td>
                        <td className="px-3 py-2">5,500만 원 이하</td>
                        <td className="px-3 py-2 text-primary-600 dark:text-primary-500"><strong>17%</strong></td>
                        <td className="px-3 py-2 font-semibold">102만 원</td>
                      </tr>
                      <tr className="border border-border-base bg-primary-500/5">
                        <td className="px-3 py-2 font-semibold">기본 공제율</td>
                        <td className="px-3 py-2">5,500만~7,000만 원</td>
                        <td className="px-3 py-2"><strong>15%</strong></td>
                        <td className="px-3 py-2 font-semibold">90만 원</td>
                      </tr>
                      <tr className="border border-border-base">
                        <td className="px-3 py-2">공제 대상 아님</td>
                        <td className="px-3 py-2">7,000만 원 초과</td>
                        <td className="px-3 py-2">0%</td>
                        <td className="px-3 py-2">환급 불가</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="mt-4 rounded-lg bg-bg-raised p-4 text-sm">
                  <h3 className="mb-2 font-semibold text-text-primary">공제율 적용 기준</h3>
                  <p className="text-text-secondary mb-2">
                    <strong>근로소득자</strong>: 연말정산 "총급여" 기준(비과세 월급, 식대 제외).
                  </p>
                  <p className="text-text-secondary mb-2">
                    <strong>프리랜서·사업자</strong>: "종합소득금액" 기준 (매출 - 경비 = 소득금액).
                    단순경비율 적용 시 매출 × (100% - 단순경비율) = 소득금액.
                  </p>
                  <p className="text-text-secondary">
                    <strong>연도 중 퇴직</strong>: 퇴직 시점의 총급여 기준. 예: 3월 퇴직하고 부업 3개월이면 합산.
                  </p>
                </div>
              </section>

              {/* 4. 공제 한도 */}
              <section className="space-y-4">
                <h2 className="text-2xl font-bold">4. 공제 한도 750만 원 — 초과분은 버려집니다</h2>
                <p className="text-text-secondary leading-relaxed">
                  월세 세액공제의 핵심은 <strong>한도입니다</strong>. 아무리 많은 월세를 내도
                  <strong>연 750만 원</strong>을 초과하면 초과분은 전혀 공제 받을 수 없습니다(버려짐).
                </p>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="rounded-lg border border-border-base bg-bg-card p-4">
                    <h3 className="mb-2 font-semibold text-text-primary">750만 원 한도 내 사례</h3>
                    <ul className="text-sm text-text-secondary space-y-1.5">
                      <li><strong>월세 50만</strong> × 12개월 = 600만 원</li>
                      <li className="text-primary-600 dark:text-primary-500">
                        ✅ 600만 {'<'} 750만 (한도 이내)
                      </li>
                      <li>공제액 = 600만 × 17% = <strong>102만 원 환급</strong></li>
                    </ul>
                  </div>
                  <div className="rounded-lg border border-border-base bg-danger-500/5 p-4">
                    <h3 className="mb-2 font-semibold text-danger-700 dark:text-danger-300">750만 원 한도 초과 사례</h3>
                    <ul className="text-sm text-text-secondary space-y-1.5">
                      <li><strong>월세 70만</strong> × 12개월 = 840만 원</li>
                      <li className="text-danger-600 dark:text-danger-500">
                        ❌ 840만 {'>'} 750만 (한도 초과)
                      </li>
                      <li>공제액 = 750만 × 17% = <strong>127.5만 원 (초과분 90만 버려짐)</strong></li>
                    </ul>
                  </div>
                </div>
                <div className="mt-4 rounded-lg border border-border-base bg-bg-raised p-4">
                  <h3 className="mb-2 font-semibold text-text-primary">월별 환급액 시뮬레이션 (17% 기준)</h3>
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border-base">
                        <th className="px-2 py-1 text-left">월세</th>
                        <th className="px-2 py-1 text-left">연간 합계</th>
                        <th className="px-2 py-1 text-left">한도 적용 후</th>
                        <th className="px-2 py-1 text-left">환급액 (17%)</th>
                      </tr>
                    </thead>
                    <tbody className="text-text-secondary">
                      <tr className="border-b border-border-subtle">
                        <td className="px-2 py-1">30만/월</td>
                        <td className="px-2 py-1">360만</td>
                        <td className="px-2 py-1">360만</td>
                        <td className="px-2 py-1 font-semibold">61.2만</td>
                      </tr>
                      <tr className="border-b border-border-subtle">
                        <td className="px-2 py-1">50만/월</td>
                        <td className="px-2 py-1">600만</td>
                        <td className="px-2 py-1">600만</td>
                        <td className="px-2 py-1 font-semibold">102만</td>
                      </tr>
                      <tr className="border-b border-border-subtle">
                        <td className="px-2 py-1">62.5만/월</td>
                        <td className="px-2 py-1">750만</td>
                        <td className="px-2 py-1">750만</td>
                        <td className="px-2 py-1 font-semibold text-primary-600 dark:text-primary-500">127.5만 (최대)</td>
                      </tr>
                      <tr>
                        <td className="px-2 py-1">70만/월</td>
                        <td className="px-2 py-1">840만</td>
                        <td className="px-2 py-1">750만 (한도)</td>
                        <td className="px-2 py-1 font-semibold">127.5만 (초과 버려짐)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              {/* 5. 실전 사례 */}
              <section className="space-y-4">
                <h2 className="text-2xl font-bold">5. 실전 3가지 사례 — 환급액 시뮬레이션</h2>
                <div className="space-y-3">
                  <div className="rounded-lg border border-primary-500/30 bg-primary-500/5 p-4">
                    <h3 className="mb-2 font-semibold text-primary-700 dark:text-primary-300">사례 A: 월세 50만, 연봉 4,500만 원</h3>
                    <div className="space-y-1.5 text-sm text-text-secondary">
                      <p>
                        <strong>조건:</strong> 무주택 세대주, 월세 50만 × 12개월 = 600만 원, 총급여 4,500만 원
                      </p>
                      <p>
                        <strong>자격 확인:</strong> 무주택 ✅, 4,500만 {'<'} 7,000만 ✅, 한도 750만 ✅
                      </p>
                      <p>
                        <strong>공제율:</strong> 4,500만 {'<'} 5,500만 → <strong>17% 적용</strong>
                      </p>
                      <p className="mt-1 rounded bg-primary-500/10 px-2 py-1">
                        <strong>환급액 = 600만 × 17% = 102만 원</strong>
                      </p>
                      <p className="text-xs">
                        연말정산 또는 5월 종소세 신고 시 102만 원 환급 입금. 추가 납부 없음.
                      </p>
                    </div>
                  </div>
                  <div className="rounded-lg border border-primary-500/30 bg-primary-500/5 p-4">
                    <h3 className="mb-2 font-semibold text-primary-700 dark:text-primary-300">사례 B: 월세 70만, 연봉 6,500만 원</h3>
                    <div className="space-y-1.5 text-sm text-text-secondary">
                      <p>
                        <strong>조건:</strong> 무주택 세대주, 월세 70만 × 12개월 = 840만 원, 총급여 6,500만 원
                      </p>
                      <p>
                        <strong>자격 확인:</strong> 무주택 ✅, 6,500만 {'<'} 7,000만 ✅, 한도 750만 (초과 주의)
                      </p>
                      <p>
                        <strong>공제율:</strong> 5,500만 {'<'} 6,500만 {'<'} 7,000만 → <strong>15% 적용</strong>
                      </p>
                      <p className="mt-1 rounded bg-danger-500/10 px-2 py-1">
                        <strong>환급액 = 750만(한도) × 15% = 112.5만 원</strong> (초과분 90만 버려짐)
                      </p>
                      <p className="text-xs">
                        월세 840만 원 중 750만 원까지만 공제. 초과분 90만 원은 공제 받을 수 없음.
                      </p>
                    </div>
                  </div>
                  <div className="rounded-lg border border-primary-500/30 bg-primary-500/5 p-4">
                    <h3 className="mb-2 font-semibold text-primary-700 dark:text-primary-300">사례 C: 월세 35만, 연봉 5,000만 원 (5월 추가 신고)</h3>
                    <div className="space-y-1.5 text-sm text-text-secondary">
                      <p>
                        <strong>조건:</strong> 직장인, 1월 연말정산 누락, 월세 35만 × 12개월 = 420만 원, 총급여 5,000만 원
                      </p>
                      <p>
                        <strong>1월 연말정산:</strong> 월세 세액공제 빠뜨림 (환급 없음)
                      </p>
                      <p>
                        <strong>5월 신고:</strong> 홈택스 "종합소득세 확정신고"로 추가 신고(소득세법 §70)
                      </p>
                      <p>
                        <strong>공제율:</strong> 5,000만 {'<'} 5,500만 → <strong>17% 적용</strong>
                      </p>
                      <p className="mt-1 rounded bg-primary-500/10 px-2 py-1">
                        <strong>추가 환급액 = 420만 × 17% = 71.4만 원</strong> (5월 종소세 신고로 회수)
                      </p>
                      <p className="text-xs">
                        연말정산 기한 경과해도 5월 종소세 신고로 추가 환급 가능. 경정청구로 5년 소급도 가능.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              <AdSlot slot="guide-monthly-rent-tax-credit-mid" format="rectangle" />

              {/* 6. 신청 방법 */}
              <section className="space-y-4">
                <h2 className="text-2xl font-bold">6. 월세 세액공제 신청 방법 — 두 가지 경로</h2>
                <div className="space-y-3">
                  <div className="rounded-lg border border-border-base bg-bg-card p-4">
                    <h3 className="mb-3 font-semibold text-text-primary">경로 1: 직장인 연말정산 (1월 말~2월)</h3>
                    <ol className="space-y-2 text-sm text-text-secondary">
                      <li><strong>① 홈택스 접속</strong> → "연말정산 간소화" → "월세주택차입금" 메뉴</li>
                      <li><strong>② 정보 입력</strong>: 임대차계약서상 임차인명, 주택 소재지, 월 임차료, 임차 기간</li>
                      <li><strong>③ 증빙 첨부</strong>: 임대차계약서(사본) + 월세 송금 영수증 (선택적 제출)</li>
                      <li><strong>④ 결과 확인</strong>: 2월 말경 연말정산 환급 또는 추가 납부 통지</li>
                      <li><strong>⑤ 환급 입금</strong>: 3월 초~중순 본인 계좌로 입금</li>
                    </ol>
                  </div>
                  <div className="rounded-lg border border-border-base bg-bg-raised p-4">
                    <h3 className="mb-3 font-semibold text-text-primary">경로 2: 5월 종합소득세 신고 (프리랜서·사업자·추가신고)</h3>
                    <ol className="space-y-2 text-sm text-text-secondary">
                      <li><strong>① 홈택스 접속</strong> → "신고/납부" → "종합소득세" → "신고/납부"</li>
                      <li><strong>② 모두채움 또는 일반신고 선택</strong></li>
                      <li><strong>③ 월세 세액공제 섹션 입력</strong>: 임차료 정보, 월 임차료, 공제 대상 여부</li>
                      <li><strong>④ 결과 확인</strong>: 5월 31일(자동 연장 6월 2일)까지 신고</li>
                      <li><strong>⑤ 환급 입금</strong>: 신고 후 6월 말~7월 초 입금</li>
                    </ol>
                  </div>
                </div>
                <div className="rounded-lg border-l-4 border-l-highlight-500 bg-highlight-500/5 p-4">
                  <p className="text-sm text-highlight-700 dark:text-highlight-300">
                    <strong>💡 연말정산 누락했다면</strong>: 5월 31일까지 종소세 "추가 신고"로 회수 가능.
                    기한 내 신고 시 가산세 없음. 기한 경과 후에도 경정청구(5년 이내)로 환급 가능.
                  </p>
                </div>
              </section>

              {/* 7. 신용카드 소득공제와의 차이 */}
              <section className="space-y-4">
                <h2 className="text-2xl font-bold">7. 신용카드 소득공제 vs 월세 세액공제 — 택일</h2>
                <p className="text-text-secondary leading-relaxed">
                  월세는 현금 거래가 많습니다. 현금영수증을 발급받으면 신용카드 소득공제 대상이 될 수도 있습니다.
                  하지만 <strong>같은 월세액에 대해 두 공제를 동시에 받을 수 없습니다</strong> (조세특례제한법 §95의2 ②).
                  반드시 하나를 선택해야 합니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <thead>
                      <tr className="bg-primary-500/10 border border-border-base">
                        <th className="px-3 py-2 text-left">구분</th>
                        <th className="px-3 py-2 text-left">신용카드 소득공제</th>
                        <th className="px-3 py-2 text-left">월세 세액공제</th>
                      </tr>
                    </thead>
                    <tbody className="text-text-secondary">
                      <tr className="border border-border-base">
                        <td className="px-3 py-2 font-semibold">공제 유형</td>
                        <td className="px-3 py-2">소득공제 (소득에서 빼기)</td>
                        <td className="px-3 py-2">세액공제 (세금에서 빼기)</td>
                      </tr>
                      <tr className="border border-border-base">
                        <td className="px-3 py-2 font-semibold">공제율</td>
                        <td className="px-3 py-2">15% (공제액의 30%)</td>
                        <td className="px-3 py-2">17% 또는 15%</td>
                      </tr>
                      <tr className="border border-border-base">
                        <td className="px-3 py-2 font-semibold">한도</td>
                        <td className="px-3 py-2">연 300만 원</td>
                        <td className="px-3 py-2">연 750만 원</td>
                      </tr>
                      <tr className="border border-border-base">
                        <td className="px-3 py-2 font-semibold">증빙</td>
                        <td className="px-3 py-2">현금영수증 (신용카드 사용 불가)</td>
                        <td className="px-3 py-2">임대차계약서 + 월세 송금 영수증</td>
                      </tr>
                      <tr className="border border-border-base bg-primary-500/5">
                        <td className="px-3 py-2 font-semibold">월세 600만 시 효과</td>
                        <td className="px-3 py-2">한도 초과 (공제 불가)</td>
                        <td className="px-3 py-2"><strong>102만 원 세액 환급</strong> ✅</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="mt-4 rounded-lg bg-bg-raised p-4 text-sm">
                  <h3 className="mb-2 font-semibold text-text-primary">결론: 월세는 세액공제 선택</h3>
                  <p className="text-text-secondary">
                    월세는 보통 월 30만~80만 원이므로 연간 300만~960만 원. 신용카드 소득공제 한도(300만)를 초과할 가능성이 높습니다.
                    반면 월세 세액공제는 한도 750만 원까지 모두 적용 가능하고, 공제율도 17%로 더 높습니다.
                    <strong>일반적으로 월세 세액공제(17% 환급)가 훨씬 유리합니다</strong>.
                  </p>
                </div>
              </section>

              {/* 8. 주의사항 */}
              <section className="space-y-4">
                <h2 className="text-2xl font-bold">8. 주의사항 — 함정과 해결책</h2>
                <div className="space-y-3">
                  <div className="rounded-lg border-l-4 border-l-danger-500 bg-danger-500/5 p-4">
                    <h3 className="mb-2 font-semibold text-danger-700 dark:text-danger-300">함정 1: 배우자가 주택 소유 시</h3>
                    <p className="text-sm text-text-secondary mb-2">
                      "나는 집이 없는데?" 하지만 <strong>배우자가 집을 소유하면 본인도 "무주택"이 아닙니다</strong>.
                      법적으로 "세대주 기준"이므로, 배우자·성년 자녀가 주택을 가지면 공제 불가.
                      예: 남편 소유 주택 + 아내 전월세 → 아내도 공제 받을 수 없음.
                    </p>
                    <p className="text-sm font-semibold text-danger-700 dark:text-danger-300">
                      → 혼자 사는 경우만 가능.
                    </p>
                  </div>
                  <div className="rounded-lg border-l-4 border-l-danger-500 bg-danger-500/5 p-4">
                    <h3 className="mb-2 font-semibold text-danger-700 dark:text-danger-300">함정 2: 계약서상 주소 ≠ 주민등록상 주소</h3>
                    <p className="text-sm text-text-secondary mb-2">
                      임대차계약서에 기재된 주소가 현재 주민등록상 주소와 다르면 공제 불가.
                      예: 강남 계약 → 강북으로 주민등록 이전 → 공제 불가.
                      <strong>반드시 주소 일치 확인 필수</strong>.
                    </p>
                    <p className="text-sm font-semibold text-danger-700 dark:text-danger-300">
                      → 이사했으면 새로운 임차계약서로 갱신.
                    </p>
                  </div>
                  <div className="rounded-lg border-l-4 border-l-danger-500 bg-danger-500/5 p-4">
                    <h3 className="mb-2 font-semibold text-danger-700 dark:text-danger-300">함정 3: 현금 지급 증명 불가</h3>
                    <p className="text-sm text-text-secondary mb-2">
                      월세를 현금으로 지급했다면, 송금 영수증이 없어 공제 받기 어렵습니다.
                      "주인이 안 되찾으니까" 같은 말은 증빙이 아닙니다.
                      <strong>반드시 계좌이체·무통장입금증 등 증명 서류 필수</strong>.
                    </p>
                    <p className="text-sm font-semibold text-danger-700 dark:text-danger-300">
                      → 앞으로 계좌이체로 송금. 기존 현금은 복구 불가.
                    </p>
                  </div>
                  <div className="rounded-lg border-l-4 border-l-danger-500 bg-danger-500/5 p-4">
                    <h3 className="mb-2 font-semibold text-danger-700 dark:text-danger-300">함정 4: 허위 임대차계약</h3>
                    <p className="text-sm text-text-secondary mb-2">
                      실제 월세는 30만 원인데 계약서에 50만 원으로 기재한 후 공제를 받으면,
                      국세청 적실성 검증(국세기본법 §14, 실질과세 원칙)에서 적발 시 추징세 + 가산세 부과.
                      <strong>계약서상 금액과 실제 송금액 일치 필수</strong>.
                    </p>
                    <p className="text-sm font-semibold text-danger-700 dark:text-danger-300">
                      → 거짓 공제는 큰 손해. 정직하게 신고.
                    </p>
                  </div>
                  <div className="rounded-lg border-l-4 border-l-danger-500 bg-danger-500/5 p-4">
                    <h3 className="mb-2 font-semibold text-danger-700 dark:text-danger-300">함정 5: 한도 초과분 이월 불가</h3>
                    <p className="text-sm text-text-secondary mb-2">
                      월세 750만 원 한도를 초과한 부분은 "<strong>이월</strong>" 또는 "<strong>이월공제</strong>" 받을 수 없습니다.
                      초과분은 완전히 버려집니다. 예: 월세 840만 원 → 750만만 공제, 90만은 0.
                    </p>
                    <p className="text-sm font-semibold text-danger-700 dark:text-danger-300">
                      → 미리 한도 계산해서 놓친 환급 없도록 주의.
                    </p>
                  </div>
                </div>
              </section>

              {/* 9. FAQ */}
              <FaqSection items={[...FAQ_ITEMS]} />

              {/* 10. 관련 계산기·가이드 */}
              <section className="space-y-4">
                <h2 className="text-2xl font-bold">관련 콘텐츠</h2>
                <div className="grid gap-4 md:grid-cols-2">
                  <Link
                    href="/calculator/salary/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 text-sm hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <h3 className="font-semibold text-text-primary mb-1">연봉 실수령액 계산기</h3>
                    <p className="text-text-secondary">총급여 7,000만 원 이하 조건을 정확히 계산하기</p>
                  </Link>
                  <Link
                    href="/guide/year-end-tax-settlement/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 text-sm hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <h3 className="font-semibold text-text-primary mb-1">연말정산 완벽 가이드</h3>
                    <p className="text-text-secondary">월세 공제 외 의료비·교육비·기부금 누락 확인</p>
                  </Link>
                  <Link
                    href="/guide/may-comprehensive-income-tax/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 text-sm hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <h3 className="font-semibold text-text-primary mb-1">5월 종합소득세 완벽 가이드</h3>
                    <p className="text-text-secondary">5월 말 기한 추가 신고로 환급 받는 법</p>
                  </Link>
                  <Link
                    href="/guide/income-tax-late-filing-penalty-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 text-sm hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <h3 className="font-semibold text-text-primary mb-1">신고 누락 시 가산세 가이드</h3>
                    <p className="text-text-secondary">무신고·지연 신고 가산세 회피 전략</p>
                  </Link>
                </div>
              </section>

              {/* 11. 요약 및 면책 */}
              <section className="space-y-4">
                <h2 className="text-2xl font-bold">핵심 정리</h2>
                <div className="rounded-lg border border-border-base bg-bg-raised p-4 text-sm">
                  <ul className="space-y-2 text-text-secondary">
                    <li>✅ <strong>월세 세액공제</strong>는 무주택 직장인·프리랜서가 가장 쉽게 받는 환급</li>
                    <li>✅ <strong>17% (또는 15%)</strong> 공제율로 월세 600만 시 102만 원 환급</li>
                    <li>✅ <strong>한도 750만 원</strong> 초과분은 버려지므로 미리 계산</li>
                    <li>✅ <strong>연말정산 누락</strong> 시 5월 종소세로 추가 신고 가능</li>
                    <li>✅ <strong>계약서 + 송금 영수증</strong> 필수 증빙. 현금은 불가</li>
                    <li>✅ <strong>배우자·자녀 주택 소유</strong> 시 "무주택"이 아님</li>
                    <li>✅ <strong>5년 이내</strong> 경정청구로 소급 환급 가능</li>
                  </ul>
                </div>
              </section>

              {/* 면책 조항 */}
              <section className="mt-8 border-t border-border-base pt-6">
                <p className="text-xs text-text-tertiary">
                  <strong>면책조항</strong>: 본 가이드는 조세특례제한법 §95의2(2024년 개정) 기준으로 작성되었습니다.
                  실제 세무 처리는 개인의 사정에 따라 달라질 수 있으므로, 정확한 공제 여부나 환급액은 국세청 홈택스,
                  또는 세무사·회계사 상담을 권장합니다. 본 콘텐츠는 AI 보조로 작성되었으며 사람이 검수했습니다.
                  <strong>최종 수정: 2026년 5월 23일</strong>
                </p>
              </section>

              <ShareButtons
                title="월세 세액공제 2026 무주택 직장인 환급 계산"
                description="17% 공제율로 최대 127.5만 원 환급받는 법"
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
