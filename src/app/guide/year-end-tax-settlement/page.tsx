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

const URL = 'https://calculatorhost.com/guide/year-end-tax-settlement/';
const DATE_PUBLISHED = '2026-05-03';
const DATE_MODIFIED = '2026-05-03';

export const metadata: Metadata = {
  title: '연말정산 완벽 가이드 2026 | 환급 받는 법·13월의 월급 | calculatorhost',
  description:
    '2026년 1월 연말정산 시즌 완벽 가이드. 신용카드·의료비·교육비·기부금·연금저축 공제 + 인적공제 + 환급 추적 + 추가 납부 회피 전략까지 한 페이지.',
  keywords: [
    '연말정산',
    '연말정산 환급',
    '13월의 월급',
    '연말정산 공제',
    '신용카드 공제',
    '의료비 공제',
    '교육비 공제',
    '기부금 공제',
    '연금저축 세액공제',
    '연말정산 추가납부',
    '간소화 자료',
  ],
  alternates: { canonical: URL },
  openGraph: {
    title: '연말정산 완벽 가이드 2026 — 13월의 월급 받는 법',
    description: '신용카드·의료비·교육비·연금저축 공제 + 환급 추적 전략.',
    url: URL,
    type: 'article',

    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '연말정산 완벽 가이드 2026',
    description: '13월의 월급 받는 법 + 추가 납부 회피 전략.',

  },
};

const FAQ_ITEMS = [
  {
    question: '연말정산은 언제 어떻게 진행되나요?',
    answer:
      '회사가 1월 중순~2월 초에 직원 연말정산 진행. 직원은 1월 15일경 홈택스 "연말정산 간소화 서비스" 오픈 시 자료 다운로드 → 회사 제출. 환급액은 2월 급여에 반영. 직장 변경자는 전 직장 원천징수영수증 별도 제출.',
  },
  {
    question: '신용카드 공제 계산법은?',
    answer:
      '총급여의 25% 초과 사용분에 대해 공제. 일반 신용카드 15%, 체크·현금영수증 30%, 전통시장·대중교통 40%. 한도: 총급여 7천 이하 300만, 7천 초과 250만, 1.2억 초과 200만. 예: 총급여 5천 + 카드 2천만 사용 → (2,000 − 1,250) × 15% = 113만 공제.',
  },
  {
    question: '의료비 공제는 누구 분까지 받을 수 있나요?',
    answer:
      '본인 + 부양가족 + 직계존비속 의료비 모두 합산. 총급여 3% 초과분 15% 세액공제 (난임 30%, 미숙아 30%). 본인·65세 이상·장애인은 한도 없음, 일반 가족은 700만 한도. 영수증·세금계산서 보관 또는 홈택스 간소화 자료 활용.',
  },
  {
    question: '연금저축·IRP는 얼마까지 세액공제 받나요?',
    answer:
      '연 700만 원 한도 (연금저축 600만 + IRP 추가 100만). 종합소득금액 5,500만 이하 16.5%, 초과 13.2% 세액공제. 예: 700만 납입 → 92.4~115.5만 환급. 12월 31일까지 입금분만 당해 연도 공제.',
  },
  {
    question: '월세 세액공제 받으려면?',
    answer:
      '총급여 7,000만 이하 무주택 세대주 + 국민주택규모(85㎡) 이하 임차 시 월세 17% 세액공제 (한도 750만, 약 127만 환급). 임대차계약서 + 월세 송금영수증 + 주민등록등본 필수. 단, 주택임대차 사업자등록 안 한 임대인이면 임대인 동의 별도 (없어도 신청 가능, 임대인 신고 의무).',
  },
  {
    question: '연말정산 결과 추가 납부가 발생하는 이유는?',
    answer:
      '① 매월 간이세액표가 실제 세액보다 낮게 원천징수 ② 부양가족 누락 ③ 작년 신용카드 사용액 큰데 올해 줄어듦 ④ 인센티브·상여금 지급 ⑤ 다른 소득 미신고. 추가 납부 회피: 12월 전 연금저축·IRP 추가 입금, 의료비·교육비·기부금 영수증 누락 없이 챙기기.',
  },
  {
    question: '연말정산 결과를 직접 확인하려면?',
    answer:
      '홈택스(hometax.go.kr) → "연말정산" → "예상세액 계산" 메뉴에서 본인 자료 입력 후 환급/추가 납부 미리 확인. 회사 제출 전 ① 누락 공제 점검 ② 부양가족 합산 시 절세 효과 비교 가능. 본 사이트의 연봉 실수령액 계산기도 보조 도구로 활용.',
  },
  {
    question: '직장 옮겼는데 연말정산은 어떻게 하나요?',
    answer:
      '현 직장에 전 직장 "원천징수영수증" 제출 → 합산 정산. 전 직장 1월 중순까지 발급 요청. 발급 안 받으면 5월 종합소득세 신고로 별도 정산 (다소 번거로움). 중도 퇴사자도 동일 — 다음 직장 입사 전이면 5월 종소세 신고.',
  },
] as const;

export default function YearEndTaxSettlementPage() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '연말정산 완벽 가이드' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '연말정산 완벽 가이드 (2026) — 13월의 월급 받는 법',
    description:
      '신용카드·의료비·교육비·기부금·연금저축 공제 + 인적공제 + 환급 추적 + 추가 납부 회피.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['연말정산', '13월의 월급', '신용카드 공제', '의료비 공제', '연금저축'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '연말정산 완벽 가이드 2026',
    description: '2026년 1월 연말정산 시즌 완벽 가이드. 신용카드·의료비·교육비·기부금·연금저축 공제 + 인적공제 + 환급 추적 + 추가 납부 회피 전략까지 한 페이지.',
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
                    { name: '연말정산 완벽 가이드' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">세금 · 12분 읽기 · 2026-05-03</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  연말정산 완벽 가이드 (2026)
                  <br />
                  <span className="text-2xl text-text-secondary">— "13월의 월급" 받는 법</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  연말정산은 1년간 매월 떼인 세금을 실제 세액과 정산하는 절차입니다. 잘 챙기면
                  100~300만 원 환급 ("13월의 월급"), 누락하면 추가 납부. 신용카드·의료비·교육비·기부금·
                  연금저축 공제부터 인적공제·월세 세액공제까지 한 페이지로 정리합니다.
                </p>
              </header>

              <AdSlot slot="guide-yes-top" format="horizontal" />

              <section aria-label="핵심 요약" className="card border-l-4 border-l-primary-500">
                <h2 className="mb-2 text-caption uppercase tracking-wider text-primary-500">핵심 요약</h2>
                <ul className="space-y-1.5 text-sm" data-speakable>
                  <li>📅 <strong>일정</strong>: 1월 15일 간소화 자료 오픈 → 1월 말~2월 초 회사 제출 → 2월 급여 반영</li>
                  <li>💳 <strong>신용카드 공제</strong>: 총급여 25% 초과분, 일반 15%/체크 30%/전통시장 40%</li>
                  <li>🏥 <strong>의료비</strong>: 총급여 3% 초과분 15% (난임·미숙아 30%), 본인·65세·장애인 한도 X</li>
                  <li>💰 <strong>연금저축·IRP</strong>: 연 700만 한도, 13.2~16.5% 세액공제 (92~115만 환급)</li>
                  <li>🏠 <strong>월세 세액공제</strong>: 무주택·총급여 7천 이하, 17% (한도 750만 → 127만 환급)</li>
                  <li>⚠️ <strong>추가 납부</strong>: 12월 전 연금저축·기부금 추가 → 회피 가능</li>
                </ul>
              </section>

              <section aria-label="일정표" className="card bg-danger-500/5 border-l-4 border-l-danger-500">
                <h2 className="mb-3 text-xl font-bold text-danger-700 dark:text-danger-300">
                  📅 연말정산 일정표 (2026년 기준)
                </h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border-base">
                        <th className="px-3 py-2 text-left">날짜</th>
                        <th className="px-3 py-2 text-left">일정</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-subtle">
                        <td className="px-3 py-2">12월 31일</td>
                        <td className="px-3 py-2">⚠️ 마감 — 연금저축·IRP 입금, 기부금, 신용카드 사용 마감일</td>
                      </tr>
                      <tr className="border-b border-border-subtle bg-danger-500/10">
                        <td className="px-3 py-2 font-bold">1월 15일</td>
                        <td className="px-3 py-2 font-bold">홈택스 "연말정산 간소화 서비스" 오픈</td>
                      </tr>
                      <tr className="border-b border-border-subtle">
                        <td className="px-3 py-2">1월 15~20일</td>
                        <td className="px-3 py-2">간소화 자료 PDF 다운로드 + 누락분 영수증 별도 수집</td>
                      </tr>
                      <tr className="border-b border-border-subtle">
                        <td className="px-3 py-2">1월 말~2월 초</td>
                        <td className="px-3 py-2">회사에 자료 제출 (사내 시스템 또는 종이)</td>
                      </tr>
                      <tr className="border-b border-border-subtle bg-primary-500/10">
                        <td className="px-3 py-2 font-bold">2월 급여일</td>
                        <td className="px-3 py-2 font-bold">환급 또는 추가 납부 반영 (회사 일정에 따라)</td>
                      </tr>
                      <tr>
                        <td className="px-3 py-2">5월</td>
                        <td className="px-3 py-2 text-text-tertiary">누락 공제 시 5월 종합소득세 신고로 별도 정산 가능</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">1. 연말정산이란? — 왜 환급/추가 납부가 발생?</h2>
                <p className="text-text-secondary leading-relaxed">
                  매월 회사는 간이세액표 기준으로 소득세를 원천징수합니다. 이는 평균값 기반이라
                  실제 세액과 차이가 생기는데, 1년치를 정산해 차액을 돌려주거나 추가로 받는 것이
                  연말정산입니다 (소득세법 §134, §137).
                </p>
                <div className="grid gap-3 md:grid-cols-2">
                  <div className="rounded-lg border border-primary-500/30 bg-primary-500/5 p-4">
                    <h3 className="mb-2 font-semibold text-primary-700 dark:text-primary-300">💰 환급 받는 케이스</h3>
                    <ul className="text-sm text-text-secondary space-y-1">
                      <li>• 부양가족·자녀 수 많음</li>
                      <li>• 의료비·교육비 큰 지출</li>
                      <li>• 연금저축·IRP 적극 가입</li>
                      <li>• 신용카드 25% 초과 사용</li>
                      <li>• 기부금·월세 영수증</li>
                      <li>• 인센티브 적은 해</li>
                    </ul>
                  </div>
                  <div className="rounded-lg border border-danger-500/30 bg-danger-500/5 p-4">
                    <h3 className="mb-2 font-semibold text-danger-700 dark:text-danger-300">💸 추가 납부 케이스</h3>
                    <ul className="text-sm text-text-secondary space-y-1">
                      <li>• 인센티브·상여 큰 폭 증가</li>
                      <li>• 부양가족 변동 (이혼·자녀 독립)</li>
                      <li>• 신용카드 사용 급감</li>
                      <li>• 의료비·교육비 미발생</li>
                      <li>• 부업 소득 미신고</li>
                      <li>• 1주택 → 2주택</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">2. 핵심 공제 7가지 — 환급 극대화</h2>

                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <h3 className="mb-2 font-semibold text-text-primary">① 인적공제 — 가장 기본</h3>
                  <ul className="text-sm text-text-secondary space-y-1">
                    <li>• 본인 150만 + 배우자 150만 (소득 100만 이하) + 부양가족 1인당 150만</li>
                    <li>• 추가공제: 70세 이상 100만, 장애인 200만, 한부모 100만, 6세 이하 자녀 추가</li>
                    <li>• 주의: 부양가족 1명을 형제·자매와 중복 신청 불가 — 1명만 받음</li>
                  </ul>
                </div>

                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <h3 className="mb-2 font-semibold text-text-primary">② 신용카드·체크카드·현금영수증</h3>
                  <p className="text-sm text-text-secondary mb-2">
                    총급여 25% 초과 사용분에 대해 차등 공제율 적용. 한도: 총급여 7천 이하 300만,
                    7천~1.2억 250만, 1.2억 초과 200만.
                  </p>
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="bg-bg-raised">
                        <th className="px-2 py-1 text-left">결제 수단</th>
                        <th className="px-2 py-1 text-right">공제율</th>
                      </tr>
                    </thead>
                    <tbody className="text-text-secondary">
                      <tr className="border-b border-border-subtle"><td className="px-2 py-1">일반 신용카드</td><td className="px-2 py-1 text-right">15%</td></tr>
                      <tr className="border-b border-border-subtle"><td className="px-2 py-1">체크카드·현금영수증·직불</td><td className="px-2 py-1 text-right">30%</td></tr>
                      <tr><td className="px-2 py-1">전통시장·대중교통·도서공연</td><td className="px-2 py-1 text-right">40%</td></tr>
                    </tbody>
                  </table>
                </div>

                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <h3 className="mb-2 font-semibold text-text-primary">③ 의료비 — 본인·가족 모두 합산</h3>
                  <p className="text-sm text-text-secondary">
                    총급여 3% 초과분 15% 세액공제 (난임 30%, 미숙아 30%). 본인·65세 이상·장애인은
                    한도 없음, 일반 가족은 700만 한도. 영수증·세금계산서 또는 홈택스 간소화 자료.
                  </p>
                </div>

                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <h3 className="mb-2 font-semibold text-text-primary">④ 교육비 세액공제</h3>
                  <ul className="text-sm text-text-secondary space-y-1">
                    <li>• 본인: 대학원·직무 관련 한도 없음 15%</li>
                    <li>• 자녀 (초중고): 1인 300만 한도 15%</li>
                    <li>• 자녀 (대학): 1인 900만 한도 15%</li>
                    <li>• 영유아 (어린이집·유치원): 1인 300만 한도 15%</li>
                  </ul>
                </div>

                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <h3 className="mb-2 font-semibold text-text-primary">⑤ 연금저축·IRP — 최대 환급 효과</h3>
                  <p className="text-sm text-text-secondary">
                    연 700만 한도 (연금저축 600만 + IRP 100만). 종합소득금액 5,500만 이하 16.5%,
                    초과 13.2% 세액공제. <strong>700만 납입 → 92~115만 환급</strong>. 12월 31일까지
                    입금분만 당해 공제. 중도 해지 시 기타소득세 16.5% 분리과세 부담.
                  </p>
                </div>

                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <h3 className="mb-2 font-semibold text-text-primary">⑥ 기부금 세액공제</h3>
                  <ul className="text-sm text-text-secondary space-y-1">
                    <li>• 정치자금 10만 이하: 100% 세액공제 (110% 환급 효과)</li>
                    <li>• 법정·지정 기부금: 15% (1,000만 초과분 30%)</li>
                    <li>• 종교 기부금: 10% (한도 종교단체 별도)</li>
                  </ul>
                </div>

                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <h3 className="mb-2 font-semibold text-text-primary">⑦ 월세 세액공제 — 무주택 직장인 필수</h3>
                  <p className="text-sm text-text-secondary">
                    총급여 7,000만 이하 무주택 세대주 + 국민주택규모 이하 임차 시 월세 17% 세액공제
                    (한도 750만, 약 127만 환급). 임대차계약서 + 월세 송금영수증 필수.
                  </p>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">3. 추가 납부 회피 — 12월 전 마지막 액션</h2>
                <div className="rounded-lg border-l-4 border-l-primary-500 bg-primary-500/5 p-4">
                  <p className="text-sm text-text-secondary">
                    12월 31일 전 추가 납부 예상 시 다음 액션으로 환급으로 전환 가능:
                  </p>
                  <ul className="mt-2 space-y-1.5 text-sm text-text-secondary">
                    <li>1️⃣ <strong>연금저축·IRP 추가 입금</strong> — 100만 추가 시 약 13~16만 환급 추가</li>
                    <li>2️⃣ <strong>기부금 영수증 챙기기</strong> — 연말 기부 + 정치자금 10만 (110% 환급)</li>
                    <li>3️⃣ <strong>의료비 한 번에 결제</strong> — 가족 의료비 12월 몰아서 결제 (총급여 3% 초과분 공제)</li>
                    <li>4️⃣ <strong>전통시장·대중교통 사용</strong> — 40% 공제율로 한도 적용 효과 ↑</li>
                    <li>5️⃣ <strong>홈택스 예상세액 미리 확인</strong> — "연말정산 → 예상세액 계산"</li>
                  </ul>
                </div>
              </section>

              <FaqSection items={[...FAQ_ITEMS]} />

              <section className="card border-l-4 border-l-danger-500 bg-danger-500/5">
                <h2 className="mb-2 text-lg font-semibold text-danger-700 dark:text-danger-300">⚠️ 주의사항</h2>
                <ul className="space-y-2 text-sm text-danger-700 dark:text-danger-300">
                  <li>• 부양가족 중복 신청 금지 — 형제·자매 중 1명만 1명의 부양가족 받음</li>
                  <li>• 신용카드 가족카드 사용분도 본인 공제 (단, 본인 명의 카드만)</li>
                  <li>• 누락 공제는 5월 종소세 신고로 추가 가능 (5년 이내 경정청구)</li>
                  <li>• 회사가 누락한 경우 본인이 5월 종소세 신고로 정정 가능</li>
                </ul>
              </section>

              <section className="card">
                <h2 className="mb-3 text-lg font-semibold">📊 관련 계산기·가이드</h2>
                <ul className="space-y-2 text-sm">
                  <li>→ <Link href="/calculator/salary/" className="text-primary-600 underline dark:text-primary-500">연봉 실수령액 계산기</Link></li>
                  <li>→ <Link href="/calculator/child-tax-credit/" className="text-primary-600 underline dark:text-primary-500">자녀장려금 계산기</Link></li>
                  <li>→ <Link href="/guide/may-comprehensive-income-tax/" className="text-primary-600 underline dark:text-primary-500">5월 종합소득세 신고 (누락 공제 정정)</Link></li>
                  <li>→ <Link href="/guide/freelancer-salary-comparison/" className="text-primary-600 underline dark:text-primary-500">프리랜서 vs 일반직 비교</Link></li>
                </ul>
              </section>

              <ShareButtons title="연말정산 완벽 가이드 (2026)" url={URL} description="13월의 월급 받는 법 + 추가 납부 회피 전략." />

              <section aria-label="출처 및 면책" className="rounded-lg border border-border-base p-4 text-caption text-text-tertiary">
                <p className="mb-2">
                  <strong>법적 근거</strong>: 소득세법 §51 (인적공제) · §52 (특별소득공제) · §59의2 (세액공제) · §134 (연말정산) · §137. 참고:{' '}
                  <a href="https://www.hometax.go.kr" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-600 underline dark:text-primary-500">국세청 홈택스</a>,{' '}
                  <a href="https://www.nts.go.kr" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-600 underline dark:text-primary-500">국세청</a>.
                </p>
                <p><strong>업데이트</strong>: {DATE_MODIFIED} · 작성·검수: 김준혁 (스마트데이터샵)</p>
              </section>
            </article>
          </main>
        </div>
        <Footer />
      </div>
    </>
  );
}
