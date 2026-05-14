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

const URL = 'https://calculatorhost.com/guide/november-year-end-tax-prep/';
const DATE_PUBLISHED = '2026-05-12';
const DATE_MODIFIED = '2026-05-12';

export const metadata: Metadata = {
  title: '11월 연말정산 준비 가이드 2026 | 12월 31일 마감 전 절세 8가지',
  description:
    '12월 31일 마감 전 마지막 절세 기회. 11월 중 연금저축·IRP 추가 납입(900만 한도), 신용카드 사용액 점검, 의료비·기부금·교육비 누락 확인, 청약통장·월세 공제까지 단계별 정리. 직장인 필독.',
  keywords: [
    '11월 연말정산 준비',
    '연말정산 절세',
    '연금저축 IRP',
    '900만 한도',
    '신용카드 공제',
    '의료비 공제',
    '기부금 공제',
    '청약통장 공제',
    '월세 세액공제',
    '12월 31일 마감',
    '2026 연말정산',
  ],
  alternates: { canonical: URL },
  openGraph: {
    title: '11월 연말정산 준비 가이드 2026',
    description: '연금저축·IRP·신용카드·의료비·기부금·청약통장·월세 8가지 절세 항목.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '11월 연말정산 준비 가이드 2026',
    description: '12월 31일 마감 전 마지막 절세 기회 8가지.',
  },
};

const FAQ_ITEMS = [
  {
    question: '연금저축과 IRP 합산 세액공제 한도는 얼마인가요?',
    answer:
      '연금저축은 단독 600만 원 한도, 연금저축 + IRP 합산 한도는 900만 원입니다(소득세법 §59의3 + 조세특례제한법 §86의2). 종합소득금액 4,500만 원(총급여 5,500만) 이하는 16.5%, 초과는 13.2% 세액공제율 적용 → 900만 납입 시 약 119~149만 원 환급. 50세 이상 가입자는 한시 200만 원 추가 한도 종료(2025년 말).',
  },
  {
    question: '신용카드·체크카드·현금영수증 공제율은 어떻게 다른가요?',
    answer:
      '총급여의 25% 초과분만 공제 대상(소득세법 §67의3). 신용카드 15%, 체크카드·현금영수증 30%, 전통시장·대중교통 40%, 도서·공연·박물관 30%. 11~12월 현금·체크카드 비중을 늘리면 공제액이 약 2배가 됩니다. 단 한도(총급여의 20%, 최대 300만)는 동일.',
  },
  {
    question: '12월 31일을 놓친 항목은 영영 못 받나요?',
    answer:
      '아닙니다. 회사 연말정산 마감 후에도 회복 가능: ① 회사 경정 신청 (보통 4월까지), ② 5월 종합소득세 신고로 정정, ③ 5년 이내 경정청구(국세기본법 §45의2). 단 절차가 복잡해질수록 환급 시기가 늦어지므로 11~12월 사전 점검이 가장 효율적입니다.',
  },
  {
    question: '의료비 공제는 무엇이 인정되나요?',
    answer:
      '본인·부양가족 의료비 중 총급여의 3% 초과분이 15% 세액공제(소득세법 §59의4). 인정: 진료·약 처방·치과 임플란트·라식·라섹·안경(50만 한도)·건강검진·휠체어. 불인정: 미용·성형·건강식품·간병비. 산후조리원은 200만 원 한도 인정. 모든 영수증은 12월 31일 결제 완료분까지.',
  },
  {
    question: '청약통장 납입 공제는 어떻게 받나요?',
    answer:
      '무주택 세대주 + 총급여 7,000만 원 이하면 청약통장 납입액의 40%를 소득공제(주택자금공제). 한도는 연 240만 원 납입 → 96만 원 공제. 12월 31일까지 납입 완료 + 무주택확인서를 은행에 제출해야 적용됩니다. 무주택확인서 미제출 시 공제 X.',
  },
];

export default function NovemberYearEndPrepGuide() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '11월 연말정산 준비 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '11월 연말정산 준비 완벽 가이드 2026',
    description:
      '12월 31일 마감 전 11월에 챙겨야 할 절세 8가지: 연금저축·IRP 900만 한도, 신용카드, 의료비, 기부금, 청약통장, 월세 공제.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    type: 'Article',
    keywords: ['11월 연말정산', '연금저축', 'IRP', '900만', '신용카드 공제', '2026'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '11월 연말정산 준비 가이드 2026',
    description:
      '12월 31일 마감 전 마지막 절세 기회 8가지를 한 페이지에 정리. 직장인 필독.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
  });
  const faqLd = buildFaqPageJsonLd([...FAQ_ITEMS]);
  const speakableLd = buildSpeakableJsonLd(['[data-speakable]']);
  const howtoLd = buildHowToJsonLd({
    name: '11월 연말정산 준비 8단계 체크리스트',
    description: '12월 31일 마감 전 직장인이 챙겨야 할 절세 항목 8단계',
    steps: [
      {
        name: '연금저축·IRP 추가 납입',
        text: '합산 900만 원 한도 (연금저축 단독 600만). 16.5% 공제. 12월 25일까지 금융사별 마감 확인.',
      },
      {
        name: '신용카드/체크카드/현금 사용액 점검',
        text: '총급여 25% 초과분 공제. 11~12월 현금·체크 비중 늘리기 (공제율 30%, 신용 15%).',
      },
      {
        name: '의료비·교육비·기부금 누락 확인',
        text: '홈택스 간소화 자료 다운로드 → 미포함 영수증 수기 보강. 12월 31일 결제분까지.',
      },
      {
        name: '현금영수증 미신청 즉시 신청',
        text: '국세청 현금영수증 통합관리 → 거래 사업자번호+금액+휴대폰 입력. 12월 31일 마감.',
      },
      {
        name: '청약통장·월세 공제 확인',
        text: '청약통장 240만 한도 40% 공제 (무주택확인서 제출 필수). 월세 750만 한도 17% 공제.',
      },
      {
        name: '자녀·인적공제 변동 정리',
        text: '출산·결혼·자녀 입학 등 변동 서류 (출생증명서·혼인관계증명서) 12월 중 준비.',
      },
      {
        name: '12월 25일까지 모든 납입 마감',
        text: '금융사 이체·납입 마감일 (보통 25~28일) 감안 12월 20일 전 모두 완료 권장.',
      },
      {
        name: '회사 인사팀에 미리 통보',
        text: '12월 후반 추가 공제 신청 시 회사에 미리 알림 (1월 처리 지연 방지).',
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
                    { name: '11월 연말정산 준비' },
                  ]}
                />
                <h1 className="mt-4 text-3xl font-bold text-text-primary md:text-4xl">
                  11월 연말정산 준비 완벽 가이드 2026
                </h1>
                <p className="mt-3 text-lg text-text-secondary" data-speakable>
                  12월 31일이 직장인 연말정산 절세 마감일입니다. 11월~12월 중순이 마지막 골든타임.
                  연금저축·IRP 합산 900만 원 추가 납입(소득세법 §59의3 + 조세특례제한법 §86의2),
                  신용카드 사용액 점검(§67의3), 의료비·기부금·교육비 누락 확인(§59의4),
                  청약통장·월세 공제까지 8가지 절세 항목을 한 페이지에 정리했습니다.
                </p>
              </header>

              <AdSlot slot="guide-nov-prep-top" format="horizontal" />

              {/* 1. 11월 골든타임 이유 */}
              <section aria-label="11월 골든타임" className="card">
                <h2 className="mb-4 text-2xl font-semibold">왜 11월이 마지막 절세 기회인가</h2>
                <p className="mb-3 text-text-secondary" data-speakable>
                  연말정산 공제 항목 대부분의 마감일은 <strong>12월 31일</strong>입니다.
                  특히 연금저축·IRP는 12월 31일 이전 납입 완료가 필수이며, 1월 이후 납입은 다음 해 공제로 이월.
                  현금영수증·기부금·청약통장도 모두 12월 31일까지 신청·납부 완료해야 합니다.
                </p>
                <p className="text-text-secondary">
                  11월 중 점검을 시작해야 12월 25일경 금융사 마감 일정에 맞춰 납입을 마무리할 수 있습니다.
                  12월 후반은 카드사 이체·은행 송금 지연으로 마감 직전 처리 위험이 큽니다.
                </p>
              </section>

              {/* 2. 연금저축·IRP 900만 한도 */}
              <section aria-label="연금저축 IRP 900만 한도" className="card border-l-4 border-l-primary-500">
                <h2 className="mb-4 text-2xl font-semibold">① 연금저축·IRP 900만 한도 추가 납입 (가장 큰 절세)</h2>
                <p className="mb-3 text-text-secondary" data-speakable>
                  연금저축 단독 한도 600만 원, 연금저축 + IRP 합산 한도 900만 원(조세특례제한법 §86의2).
                  종합소득금액 4,500만 원(총급여 5,500만) 이하는 16.5%, 초과는 13.2% 세액공제 → 900만 납입 시
                  최대 약 119만~149만 원 환급.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm" data-speakable>
                    <caption className="sr-only">연금저축·IRP 세액공제율</caption>
                    <thead>
                      <tr className="border-b border-border-base text-left">
                        <th className="py-2 pr-4 font-semibold">총급여</th>
                        <th className="py-2 pr-4 font-semibold">공제율</th>
                        <th className="py-2 font-semibold">900만 납입 시 환급</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-subtle"><td className="py-2 pr-4">5,500만 이하</td><td className="py-2 pr-4">16.5%</td><td className="py-2">약 148만 원</td></tr>
                      <tr><td className="py-2 pr-4">5,500만 초과</td><td className="py-2 pr-4">13.2%</td><td className="py-2">약 119만 원</td></tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-3 text-sm text-text-tertiary">
                  단독 한도: 연금저축 600만 / IRP 900만. 합산 시 900만 한도. 미가입자는 11월 중 은행·증권사 또는
                  홈택스에서 계좌 개설 → 즉시 납입.
                </p>
              </section>

              <AdSlot slot="guide-nov-prep-mid" format="rectangle" />

              {/* 3. 신용카드 공제 */}
              <section aria-label="신용카드 공제" className="card">
                <h2 className="mb-4 text-2xl font-semibold">② 신용카드·체크카드·현금영수증 사용액 점검</h2>
                <p className="mb-3 text-text-secondary" data-speakable>
                  총급여의 25% 초과분만 공제 대상(소득세법 §67의3). 결제 수단별 공제율이 다르므로 11~12월
                  결제 비중을 조정하면 공제액이 크게 늘어납니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm" data-speakable>
                    <thead>
                      <tr className="border-b border-border-base text-left">
                        <th className="py-2 pr-4 font-semibold">결제 수단</th>
                        <th className="py-2 font-semibold">공제율</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-subtle"><td className="py-2 pr-4">신용카드</td><td className="py-2">15%</td></tr>
                      <tr className="border-b border-border-subtle"><td className="py-2 pr-4">체크카드·현금영수증</td><td className="py-2">30%</td></tr>
                      <tr className="border-b border-border-subtle"><td className="py-2 pr-4">전통시장·대중교통</td><td className="py-2">40%</td></tr>
                      <tr><td className="py-2 pr-4">도서·공연·박물관·미술관</td><td className="py-2">30%</td></tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-3 text-sm text-text-tertiary">
                  공제 한도: 총급여의 20%, 최대 300만 원. 마지막 두 달 현금·체크카드 사용 비중을 늘리면
                  공제액 20~30만 원 추가 확보 가능.
                </p>
              </section>

              {/* 4. 의료비·교육비·기부금 */}
              <section aria-label="의료비 교육비 기부금" className="card">
                <h2 className="mb-4 text-2xl font-semibold">③ 의료비·교육비·기부금 누락 확인</h2>
                <div className="space-y-3 text-text-secondary">
                  <div>
                    <h3 className="font-semibold text-text-primary">의료비 (총급여 3% 초과분 15% 공제, §59의4)</h3>
                    <p className="text-sm">인정: 진료·약 처방·치아 임플란트·라식·라섹·안경(50만 한도)·건강검진·산후조리원(200만 한도). 불인정: 미용·성형·건강식품·간병비.</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-text-primary">교육비 (15% 공제)</h3>
                    <p className="text-sm">본인·자녀 등록금: 초중고 300만, 대학 900만 한도. 학원비는 본인만 가능 (자녀 학원비 X). 대학원은 본인만.</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-text-primary">기부금 (15% 공제, 정치자금 100% 환급, 소득세법 §34)</h3>
                    <p className="text-sm">정치자금 10만 원 이하 100% 공제 (효과 최고). 법정·지정기부금 15% (1,000만 초과분 30%). 12월 31일까지 납입 완료 + 영수증.</p>
                  </div>
                </div>
                <p className="mt-3 text-sm text-text-tertiary">
                  홈택스 "연말정산 간소화 자료" 다운로드 → 미포함 영수증 수기 보강 (보험사·기부처에 직접 요청).
                </p>
              </section>

              {/* 5. FAQ */}
              <FaqSection items={[...FAQ_ITEMS]} />

              {/* 6. 청약통장·월세 */}
              <section aria-label="청약통장 월세" className="card">
                <h2 className="mb-4 text-2xl font-semibold">④ 청약통장·월세 공제 마지막 확인</h2>
                <div className="space-y-3 text-text-secondary">
                  <div>
                    <h3 className="font-semibold text-text-primary">청약통장 (주택자금공제, 40% 공제)</h3>
                    <p className="text-sm">무주택 세대주 + 총급여 7,000만 이하. 한도 연 240만 → 96만 원 공제. 12월 31일까지 납입 + 무주택확인서 은행 제출 필수.</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-text-primary">월세 세액공제 (17% 공제)</h3>
                    <p className="text-sm">총급여 7,000만 이하 무주택 세대주. 한도 750만 원, 약 127만 원 환급. 임대차계약서 + 월세 송금 영수증 필수.</p>
                  </div>
                </div>
              </section>

              {/* 7. 현금영수증 + 자녀공제 */}
              <section aria-label="현금영수증 자녀공제" className="card">
                <h2 className="mb-4 text-2xl font-semibold">⑤ 현금영수증 미신청 + 자녀·인적공제 변동</h2>
                <div className="space-y-3 text-text-secondary">
                  <div>
                    <h3 className="font-semibold text-text-primary">현금영수증 12월 31일 마감</h3>
                    <p className="text-sm">국세청 현금영수증 통합관리시스템 → 사업자번호 + 금액 + 휴대폰 입력. 미신청 시 해당 금액 공제 불가.</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-text-primary">자녀·인적공제 변동 (소득세법 §51·§59의4)</h3>
                    <p className="text-sm">올해 출산·결혼·자녀 입학 시 인적공제 150만 + 자녀세액공제 변동 (1인 15만, 2인 35만, 3인째부터 각 30만 원). 출생증명서·혼인관계증명서 미리 준비.</p>
                  </div>
                </div>
              </section>

              {/* 8. 12월 마감 일정 */}
              <section aria-label="12월 마감 일정" className="card border-l-4 border-l-danger-500">
                <h2 className="mb-3 text-xl font-semibold">⚠️ 12월 마감 일정</h2>
                <ul className="list-inside list-disc space-y-1.5 text-sm text-text-secondary">
                  <li>12월 25일경: 금융사별 연금저축·IRP 납입 마감 (이체 지연 감안)</li>
                  <li>12월 31일: 현금영수증·기부금·청약통장·월세 모든 납입 완료</li>
                  <li>12월 후반: 회사 인사팀에 추가 공제 통보 (1월 처리 지연 방지)</li>
                  <li>익년 4월: 회사 경정 신청 가능 (놓친 항목)</li>
                  <li>익년 5월: 종합소득세 신고로 정정</li>
                  <li>5년 이내: 경정청구(국세기본법 §45의2)로 환급</li>
                </ul>
              </section>

              {/* 9. 관련 계산기·가이드 */}
              <section aria-label="관련 계산기·가이드" className="card">
                <h2 className="mb-4 text-2xl font-semibold">관련 계산기·가이드</h2>
                <ul className="space-y-2 text-text-secondary">
                  <li>→ <Link href="/calculator/salary/" className="text-primary-600 underline dark:text-primary-500">연봉 실수령액 계산기</Link> — 연말정산 후 실수령 시뮬</li>
                  <li>→ <Link href="/calculator/child-tax-credit/" className="text-primary-600 underline dark:text-primary-500">자녀세액공제 계산기</Link></li>
                  <li>→ <Link href="/guide/year-end-tax-settlement/" className="text-primary-600 underline dark:text-primary-500">연말정산 완벽 가이드</Link> — 1월 전체 프로세스</li>
                  <li>→ <Link href="/guide/february-tax-refund-tracking/" className="text-primary-600 underline dark:text-primary-500">2월 환급 추적 가이드</Link> — 환급 시점·금액 확인</li>
                  <li>→ <Link href="/guide/financial-income-comprehensive-vs-separate-taxation/" className="text-primary-600 underline dark:text-primary-500">금융소득 종합과세 vs 분리과세</Link> — 12월 결산 전 비교과세 점검</li>
                  <li>→ <Link href="/guide/december-capital-gains-tax-deadline/" className="text-primary-600 underline dark:text-primary-500">12월 양도세 vs 1월 양도세</Link> — 연말 매도 결정 프레임</li>
                  <li>→ <Link href="/guide/carry-over-basis-spouse-gift-5-10-year/" className="text-primary-600 underline dark:text-primary-500">이월과세 5년→10년 확대</Link> — 연말 증여 결정 영향</li>
                  <li>→ <Link href="/calculator/freelancer-tax/" className="text-primary-600 underline dark:text-primary-500">프리랜서 종합소득세 계산기</Link> — 부업 있는 직장인</li>
                </ul>
              </section>

              <ShareButtons title="11월 연말정산 준비 가이드 2026" url={URL} description="12월 31일 마감 전 절세 8가지 체크리스트." />

              {/* 출처·면책 */}
              <section
                aria-label="출처 및 면책"
                className="rounded-lg border border-border-base p-4 text-caption text-text-tertiary"
              >
                <p className="mb-2">
                  <strong>법적 근거</strong>: 소득세법 §34 (기부금 손금산입) · §51 (인적공제) · §52 (특별공제) · §59의2 (특별세액공제) · §59의3 (연금계좌세액공제) · §59의4 (자녀세액공제·교육비·의료비) · §67의3 (신용카드 등 사용금액 공제) · 조세특례제한법 §86의2 (연금저축·IRP) · §95의2 (월세 세액공제) · 국세기본법 §45의2 (경정청구). 참고: <a href="https://www.hometax.go.kr" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-600 underline dark:text-primary-500">홈택스 연말정산 간소화</a>, <a href="https://www.nts.go.kr" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-600 underline dark:text-primary-500">국세청</a>, <a href="https://www.law.go.kr" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-600 underline dark:text-primary-500">법령정보센터</a>.
                </p>
                <p className="mb-2">
                  <strong>면책조항</strong>: 본 가이드는 일반 정보 제공 목적이며 세무·법적 조언이 아닙니다. 중도퇴사·다중 소득·특수 공제 등은 반드시 세무사 또는 회사 인사팀 상담을 통해 확정하시기 바랍니다.
                </p>
                <p>
                  <strong>업데이트</strong>: {DATE_MODIFIED} · 작성·검수: 김준혁 (스마트데이터샵). 본 가이드는 AI 보조 작성 후 운영자 검수 발행되었습니다.
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
