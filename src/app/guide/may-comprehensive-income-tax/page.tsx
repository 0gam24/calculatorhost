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

const URL = 'https://calculatorhost.com/guide/may-comprehensive-income-tax/';
const DATE_PUBLISHED = '2026-05-03';
const DATE_MODIFIED = '2026-05-03';

export const metadata: Metadata = {
  title: '5월 종합소득세 신고 완벽 가이드 2026 | 프리랜서·사업자·N잡러 필독 | calculatorhost',
  description:
    '2026년 5월 종합소득세 신고 시즌 완벽 가이드. 신고 대상·기한·홈택스 단계별 신고법·단순경비율·절세 5가지·환급 받는 법까지 한 페이지에 정리. 프리랜서·1인사업자·N잡러 필독.',
  keywords: [
    '종합소득세 신고',
    '종합소득세',
    '5월 종소세',
    '종소세 신고 방법',
    '프리랜서 종소세',
    '단순경비율',
    '기준경비율',
    '홈택스 종합소득세 신고',
    '종합소득세 환급',
    'N잡러 종소세',
    '2026 종합소득세',
  ],
  alternates: { canonical: URL },
  openGraph: {
    title: '5월 종합소득세 신고 완벽 가이드 2026',
    description: '신고 대상·기한·홈택스 단계별 신고법·절세 5가지·환급 받는 법.',
    url: URL,
    type: 'article',
    images: ['/og-default.png'],
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '5월 종합소득세 신고 완벽 가이드 2026',
    description: '프리랜서·사업자·N잡러 필독. 절세 5가지 + 환급 받는 법.',
    images: ['/og-default.png'],
  },
};

const FAQ_ITEMS = [
  {
    question: '종합소득세는 누가 신고해야 하나요?',
    answer:
      '근로소득 외에 사업·이자·배당·연금·기타 소득이 있는 사람. 구체적으로 ①프리랜서·1인사업자(사업소득) ②임대인(부동산임대소득) ③강의·원고료·세미나 강사료 등 기타소득 연 300만 원 초과 ④이자·배당소득 연 2,000만 원 초과 ⑤사적연금 1,500만 원 초과 ⑥N잡러(직장+부업). 직장에서 근로소득만 있고 연말정산 끝났으면 신고 의무 없음.',
  },
  {
    question: '2026년 종합소득세 신고 기한은 언제인가요?',
    answer:
      '2026년 5월 1일~5월 31일 (국세청 홈택스 기준). 5월 31일이 토요일이라 6월 2일(월)까지 자동 연장. 성실신고확인대상자는 6월 30일까지. 무신고 시 무신고가산세 20% + 납부지연가산세 일 0.022% 부과. 환급도 신고해야 받으므로 환급 대상이라도 반드시 신고.',
  },
  {
    question: '단순경비율과 기준경비율 어느 쪽을 선택해야 하나요?',
    answer:
      '매출 7,500만 원 미만은 단순경비율 자동 적용 (영수증 없이 업종별 비율 인정). 7,500만~3억은 둘 다 선택 가능 — 실제 경비가 단순경비율보다 크면 기준경비율(영수증 입증) 유리. 3억 초과는 기준경비율 의무. IT 64.1%, 컨설팅 70.1%, 디자인 70%대로 단순경비율이 높은 업종은 영수증 관리 부담 없이 단순경비율 권장.',
  },
  {
    question: '직장인이 부업·프리랜서 소득이 있으면 어떻게 신고하나요?',
    answer:
      '근로소득(직장 연말정산 끝)과 사업소득(부업)을 모두 합산해 5월에 종합소득세 신고. 직장 연말정산은 근로소득만 정산한 것이며, 합산 시 누진세율 상위 적용으로 추가 납부 가능. 단, 자녀세액공제·의료비 등 누락 공제를 반영하면 환급 받을 수도 있음. 부업 사업자등록 안 했어도 사업소득 발생 시 신고 의무.',
  },
  {
    question: '홈택스에서 종합소득세 신고는 어떻게 하나요?',
    answer:
      '①홈택스(hometax.go.kr) 로그인 ②"신고/납부 → 종합소득세 신고" ③모두채움/일반신고 선택 ④소득 종류별 자료 자동 채움 확인 ⑤경비·공제 입력 ⑥결과 확인 → 전자신고 → 납부(또는 환급 통장 입력). 신용카드·계좌이체·가상계좌로 납부. 모바일 손택스 앱도 지원.',
  },
  {
    question: '종합소득세 절세 핵심 5가지는?',
    answer:
      '①노란우산공제 — 연 500만 원까지 소득공제 (소상공인·자영업자) ②연금저축·IRP — 연 700만 원 한도 세액공제 13.2~16.5% ③의료비·교육비 — 신용카드 사용 시 추가 공제 ④기부금 — 정치자금·법정기부금 100% 세액공제 ⑤주택자금 공제 — 무주택자 월세 세액공제 17%. 5가지 합산 시 50만~200만 원 절세 가능.',
  },
  {
    question: '종합소득세 환급은 언제 받을 수 있나요?',
    answer:
      '신고 후 보통 6월 말~7월 초 환급 입금. 환급 신청 시 본인 계좌 정확히 입력. 환급 사유: ①프리랜서 3.3% 원천징수액이 실제 세액보다 많음 ②경비·공제 누락분 반영 ③근로소득 연말정산에서 누락된 공제 ④적자 발생 사업자. 환급 추적은 홈택스 "환급 조회"에서 확인.',
  },
  {
    question: '신고 안 하면 어떻게 되나요?',
    answer:
      '① 무신고가산세 20% (소득 자체가 큰 경우 40%) ② 납부지연가산세 일 0.022% (연 약 8%) ③ 환급 대상이라도 환급 못 받음 ④ 5년간 추징 가능 (국세기본법 §26의2). 부업으로 소액(연 100만 원)이라도 신고는 필수. 무지가 면책 사유 아님 — 모르고 안 한 경우도 가산세 부과.',
  },
] as const;

export default function MayComprehensiveIncomeTaxPage() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '5월 종합소득세 신고 완벽 가이드' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '5월 종합소득세 신고 완벽 가이드 (2026) — 프리랜서·사업자·N잡러 필독',
    description:
      '2026년 5월 종합소득세 신고 시즌 가이드. 신고 대상·기한·홈택스 단계별 신고법·절세 5가지·환급 받는 법.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['종합소득세 신고', '5월 종소세', '프리랜서 종소세', '단순경비율', '환급'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '5월 종합소득세 신고 완벽 가이드 2026',
    description: '2026년 5월 종합소득세 신고 시즌 완벽 가이드. 신고 대상·기한·홈택스 단계별 신고법·단순경비율·절세 5가지·환급 받는 법까지 한 페이지에 정리. 프리랜서·1인사업자·N잡러 필독.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
  });
  const faqLd = buildFaqPageJsonLd([...FAQ_ITEMS]);
  const speakableLd = buildSpeakableJsonLd(['[data-speakable]']);
  const howtoLd = buildHowToJsonLd({
    name: '홈택스 종합소득세 신고하기',
    description: '국세청 홈택스에서 종합소득세를 신고·납부하는 단계별 방법',
    steps: [
      {
        name: '홈택스 로그인',
        text: '홈택스(hometax.go.kr) 접속 후 공동인증서·간편인증으로 로그인. 모바일은 손택스 앱 사용.',
      },
      {
        name: '종합소득세 신고 메뉴 진입',
        text: '"신고/납부" → "종합소득세 신고" → "모두채움 신고" 또는 "일반 신고" 선택. 단순경비율 대상자는 모두채움 권장.',
      },
      {
        name: '소득 자동 채움 확인',
        text: '근로소득·사업소득(3.3% 원천징수)·이자·배당 등이 자동 채워짐. 누락된 소득(현금 영수증 매출, 부업 등)은 직접 입력.',
      },
      {
        name: '경비·공제 입력',
        text: '단순경비율 또는 기준경비율 선택, 노란우산공제·연금저축·의료비·교육비 등 소득공제·세액공제 입력.',
      },
      {
        name: '결과 확인 → 전자신고',
        text: '결정세액 확인. 추가 납부 또는 환급 금액 표시. 전자신고 클릭 → 신고서 접수증 보관.',
      },
      {
        name: '납부 또는 환급 통장 입력',
        text: '추가 납부 시 신용카드·계좌이체·가상계좌로 납부 (5월 31일까지). 환급 시 본인 명의 통장 정확히 입력 → 6월 말~7월 초 입금.',
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
                    { name: '5월 종합소득세 신고 완벽 가이드' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">세금 · 12분 읽기 · 2026-05-03</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  5월 종합소득세 신고 완벽 가이드 (2026)
                  <br />
                  <span className="text-2xl text-text-secondary">— 프리랜서·사업자·N잡러 필독</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  2026년 5월 1일~31일은 종합소득세 신고 시즌입니다. 프리랜서·1인사업자·N잡러·임대인·강사 등
                  근로소득 외 소득이 있는 모든 사람이 신고 대상입니다. 신고 안 하면 가산세 20%+,
                  환급 대상도 신고 안 하면 환급 못 받습니다. 이 가이드 한 페이지로 신고 대상·기한·홈택스
                  단계별 신고법·절세 5가지·환급 받는 법까지 모두 해결됩니다.
                </p>
              </header>

              <AdSlot slot="guide-may-tax-top" format="horizontal" />

              {/* 핵심 요약 */}
              <section aria-label="핵심 요약" className="card border-l-4 border-l-primary-500">
                <h2 className="mb-2 text-caption uppercase tracking-wider text-primary-500">핵심 요약</h2>
                <ul className="space-y-1.5 text-sm" data-speakable>
                  <li>📅 <strong>신고 기한</strong>: 2026년 5월 1일~5월 31일 (성실신고확인대상 6월 30일)</li>
                  <li>👥 <strong>대상</strong>: 프리랜서·1인사업자·임대인·강사·N잡러·이자배당 2천만 원 초과 등</li>
                  <li>⚠️ <strong>무신고 시</strong>: 가산세 20% + 일 0.022% (연 약 8%) + 환급 못 받음</li>
                  <li>💡 <strong>절세 5가지</strong>: 노란우산·연금저축·의료비·기부금·월세 세액공제</li>
                  <li>💰 <strong>환급 시기</strong>: 신고 후 6월 말~7월 초 입금</li>
                  <li>🛠 <strong>도구</strong>: 홈택스(hometax.go.kr) 또는 손택스 앱</li>
                </ul>
              </section>

              {/* D-day 카운트다운 */}
              <section aria-label="신고 일정" className="card bg-danger-500/5 border-l-4 border-l-danger-500">
                <h2 className="mb-3 text-xl font-bold text-danger-700 dark:text-danger-300">
                  🚨 신고 시즌 일정표
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
                        <td className="px-3 py-2 font-semibold">5월 1일 (금)</td>
                        <td className="px-3 py-2">홈택스 종합소득세 신고 시스템 오픈</td>
                      </tr>
                      <tr className="border-b border-border-subtle">
                        <td className="px-3 py-2">5월 1~15일</td>
                        <td className="px-3 py-2">전화 상담 가능 시기 (혼잡도 낮음)</td>
                      </tr>
                      <tr className="border-b border-border-subtle">
                        <td className="px-3 py-2">5월 15~25일</td>
                        <td className="px-3 py-2">신고 집중 시기 (홈택스 트래픽 폭주, 새벽 신고 권장)</td>
                      </tr>
                      <tr className="border-b border-border-subtle bg-danger-500/10">
                        <td className="px-3 py-2 font-bold">5월 31일 (토)</td>
                        <td className="px-3 py-2 font-bold">⚠️ 신고·납부 마감 (자동 연장: 6월 2일 월요일)</td>
                      </tr>
                      <tr className="border-b border-border-subtle">
                        <td className="px-3 py-2">6월 30일</td>
                        <td className="px-3 py-2">성실신고확인대상자 마감</td>
                      </tr>
                      <tr>
                        <td className="px-3 py-2 font-semibold">6월 말~7월 초</td>
                        <td className="px-3 py-2 text-primary-700 dark:text-primary-300">환급 입금 (일반적으로 신고 후 30~45일)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              {/* 1. 종합소득세란? */}
              <section className="space-y-4">
                <h2 className="text-2xl font-bold">1. 종합소득세란? — 누가 신고해야 하나</h2>
                <p className="text-text-secondary leading-relaxed">
                  종합소득세는 한 해 동안 발생한 6가지 종합과세 대상 소득을 합산해 누진세율(6~45%)로
                  과세하는 국세입니다. 매년 5월 한 달간 본인이 직접 신고·납부합니다 (소득세법 §70).
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <h3 className="mb-2 font-semibold text-text-primary">종합과세 대상 소득 6종</h3>
                  <ol className="text-sm text-text-secondary space-y-1.5">
                    <li><strong>① 근로소득</strong> — 직장에서 받는 월급·연봉. 직장에서 연말정산 끝났어도 N잡러는 합산 신고.</li>
                    <li><strong>② 사업소득</strong> — 프리랜서·1인사업자·임대업·강사료(연 300만 원 초과). 가장 많은 신고 대상.</li>
                    <li><strong>③ 이자소득</strong> — 예적금·채권 이자. 연 2,000만 원 초과 시 종합과세 (이하 분리과세 15.4%).</li>
                    <li><strong>④ 배당소득</strong> — 주식 배당금. 연 2,000만 원 초과 시 종합과세.</li>
                    <li><strong>⑤ 연금소득</strong> — 사적연금(연금저축·IRP 수령액). 연 1,500만 원 초과 종합과세 vs 분리과세 16.5% 선택.</li>
                    <li><strong>⑥ 기타소득</strong> — 강의료·원고료·경품·복권 당첨금. 연 300만 원 초과 시 종합과세 의무.</li>
                  </ol>
                </div>
                <p className="text-text-secondary leading-relaxed">
                  <strong>신고 의무가 없는 경우</strong>: 직장 근로소득만 있고 연말정산 끝난 사람.
                  단, <strong>의료비·교육비·기부금 누락 공제가 있다면 종소세 신고로 환급 받을 수 있음</strong>.
                </p>
              </section>

              {/* 2. 신고 대상 사례 */}
              <section className="space-y-4">
                <h2 className="text-2xl font-bold">2. 신고 대상 사례 — 본인이 해당하는지 확인</h2>
                <div className="space-y-3">
                  <div className="rounded-lg border border-border-base bg-bg-raised p-4">
                    <h3 className="mb-2 font-semibold text-text-primary">✅ 신고 의무 (반드시 5월 신고)</h3>
                    <ul className="text-sm text-text-secondary space-y-1">
                      <li>• 프리랜서 (3.3% 원천징수 받은 모든 분야 — IT·디자인·강사·작가·통번역 등)</li>
                      <li>• 1인사업자·소상공인 (음식점·소매·온라인쇼핑몰 등)</li>
                      <li>• 임대인 (주택·상가 임대료 — 연 2,000만 원 초과는 의무, 이하는 분리과세 선택 가능)</li>
                      <li>• N잡러 (직장 + 부업 모두 — 부업 소득 1원이라도 발생 시)</li>
                      <li>• 강사·강연자 (학원·기업 강사료, 세미나 등 — 연 300만 원 초과)</li>
                      <li>• 작가·창작자 (원고료·인세 — 연 300만 원 초과)</li>
                      <li>• 이자·배당소득 연 2,000만 원 초과자</li>
                      <li>• 사적연금 수령액 연 1,500만 원 초과자</li>
                    </ul>
                  </div>
                  <div className="rounded-lg border border-border-base bg-bg-raised p-4">
                    <h3 className="mb-2 font-semibold text-text-primary">⚠️ 신고 의무는 없지만 신고 시 환급 가능</h3>
                    <ul className="text-sm text-text-secondary space-y-1">
                      <li>• 직장 근로자 중 연말정산에서 의료비·교육비·기부금·월세 세액공제 누락한 경우</li>
                      <li>• 중도퇴사자로 연말정산 안 한 경우 (퇴직 시 정산 안 한 경우)</li>
                      <li>• 부업 사업소득이 적자(손실)인 경우 → 손실분으로 근로소득세 환급</li>
                    </ul>
                  </div>
                  <div className="rounded-lg border-l-4 border-l-danger-500 bg-danger-500/5 p-4">
                    <p className="text-sm text-danger-700 dark:text-danger-300">
                      <strong>⚠️ 흔한 오해</strong>: "부업으로 100만 원밖에 안 벌었어요" → <strong>1원이라도 사업소득
                      발생 시 신고 의무</strong>. 무신고 시 가산세 부과. 사업자등록 안 했어도 마찬가지.
                    </p>
                  </div>
                </div>
              </section>

              {/* 3. 단순경비율 vs 기준경비율 */}
              <section className="space-y-4">
                <h2 className="text-2xl font-bold">3. 단순경비율 vs 기준경비율 — 어느 쪽이 유리?</h2>
                <p className="text-text-secondary leading-relaxed">
                  사업소득의 경우 매출에서 경비를 빼고 소득금액을 산정합니다. 경비 인정 방식 2가지:
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <thead>
                      <tr className="bg-primary-500/10 border border-border-base">
                        <th className="px-3 py-2 text-left">방식</th>
                        <th className="px-3 py-2 text-left">대상</th>
                        <th className="px-3 py-2 text-left">장점</th>
                        <th className="px-3 py-2 text-left">단점</th>
                      </tr>
                    </thead>
                    <tbody className="text-text-secondary">
                      <tr className="border border-border-base">
                        <td className="px-3 py-2 font-semibold">단순경비율</td>
                        <td className="px-3 py-2">매출 7,500만 미만 자동, 7,500만~3억 선택</td>
                        <td className="px-3 py-2">영수증 없이 업종별 비율 자동 인정</td>
                        <td className="px-3 py-2">실제 경비가 더 커도 인정 안 됨</td>
                      </tr>
                      <tr className="border border-border-base">
                        <td className="px-3 py-2 font-semibold">기준경비율</td>
                        <td className="px-3 py-2">매출 3억 초과 의무, 7,500만~3억 선택</td>
                        <td className="px-3 py-2">실제 경비 입증으로 큰 경비 인정</td>
                        <td className="px-3 py-2">영수증·세금계산서 보관 필수</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="rounded-lg bg-bg-raised p-4 text-sm">
                  <strong className="text-text-primary">업종별 단순경비율 (2026년 기준 일부)</strong>
                  <table className="mt-2 w-full">
                    <tbody className="text-text-secondary">
                      <tr><td className="py-1">IT·소프트웨어 개발</td><td className="text-right tabular-nums">64.1%</td></tr>
                      <tr><td className="py-1">컨설팅·전문 서비스</td><td className="text-right tabular-nums">70.1%</td></tr>
                      <tr><td className="py-1">디자인·예술</td><td className="text-right tabular-nums">71.4%</td></tr>
                      <tr><td className="py-1">강사·교육</td><td className="text-right tabular-nums">61.7%</td></tr>
                      <tr><td className="py-1">작가·창작</td><td className="text-right tabular-nums">75.4%</td></tr>
                      <tr><td className="py-1">통번역·기타 인적용역</td><td className="text-right tabular-nums">68.4%</td></tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-text-secondary leading-relaxed">
                  <strong>의사결정</strong>: IT·디자인·작가처럼 단순경비율이 60% 이상인 업종은 영수증 관리
                  부담 없이 단순경비율이 거의 항상 유리. 실제 경비(임대료·재료비·외주 등)가 매출의 80% 이상이면
                  기준경비율 검토. 본 사이트의{' '}
                  <Link href="/calculator/freelancer-tax/" className="text-primary-600 underline dark:text-primary-500">
                    프리랜서 종합소득세 계산기
                  </Link>
                  로 두 방식 시뮬레이션 가능.
                </p>
              </section>

              {/* 4. 홈택스 신고 단계 */}
              <section className="space-y-4">
                <h2 className="text-2xl font-bold">4. 홈택스 종합소득세 신고 단계별 가이드</h2>
                <ol className="space-y-4 text-sm">
                  <li className="rounded-lg border border-border-base bg-bg-card p-4">
                    <strong className="text-text-primary block mb-1">Step 1. 홈택스 로그인</strong>
                    <p className="text-text-secondary">
                      <a href="https://www.hometax.go.kr" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-600 underline dark:text-primary-500">홈택스(hometax.go.kr)</a>{' '}
                      접속 → 공동인증서, 카카오·네이버 간편인증, 또는 PASS 앱 인증 로그인. 모바일은 손택스 앱 권장.
                    </p>
                  </li>
                  <li className="rounded-lg border border-border-base bg-bg-card p-4">
                    <strong className="text-text-primary block mb-1">Step 2. 종합소득세 신고 메뉴 진입</strong>
                    <p className="text-text-secondary">
                      상단 "신고/납부" → "종합소득세" → "신고/납부" 클릭.
                      <br />
                      <strong>모두채움 신고</strong> (단순경비율 대상자 권장 — 자동 채움)
                      <br />
                      <strong>일반 신고</strong> (기준경비율·복잡한 케이스 — 직접 입력)
                    </p>
                  </li>
                  <li className="rounded-lg border border-border-base bg-bg-card p-4">
                    <strong className="text-text-primary block mb-1">Step 3. 소득 자료 자동 채움 확인</strong>
                    <p className="text-text-secondary">
                      근로소득(직장 발급 원천징수영수증), 사업소득(3.3% 원천징수 자료), 이자·배당, 연금이
                      자동 채워짐. <strong>누락된 소득은 직접 입력</strong> (예: 사업자등록 없이 받은 부업 수입,
                      현금 영수증 발급 매출).
                    </p>
                  </li>
                  <li className="rounded-lg border border-border-base bg-bg-card p-4">
                    <strong className="text-text-primary block mb-1">Step 4. 경비·소득공제·세액공제 입력</strong>
                    <p className="text-text-secondary">
                      ① 경비 (단순/기준경비율 선택)<br />
                      ② 소득공제 (인적공제, 노란우산공제, 연금보험료, 신용카드 등)<br />
                      ③ 세액공제 (자녀세액공제, 연금저축·IRP, 의료비·교육비·기부금)
                    </p>
                  </li>
                  <li className="rounded-lg border border-border-base bg-bg-card p-4">
                    <strong className="text-text-primary block mb-1">Step 5. 결과 확인 → 전자신고</strong>
                    <p className="text-text-secondary">
                      결정세액(추가 납부 또는 환급) 확인. 이상 없으면 "전자신고" 클릭 → <strong>접수증 출력 또는 PDF 보관 필수</strong>.
                    </p>
                  </li>
                  <li className="rounded-lg border border-border-base bg-bg-card p-4">
                    <strong className="text-text-primary block mb-1">Step 6. 납부 또는 환급 통장 입력</strong>
                    <p className="text-text-secondary">
                      <strong>추가 납부</strong>: 신용카드(0.8% 수수료) / 계좌이체 / 가상계좌 — 5월 31일까지<br />
                      <strong>환급</strong>: 본인 명의 통장 정확히 입력 → 6월 말~7월 초 입금
                    </p>
                  </li>
                </ol>
              </section>

              {/* 5. 절세 5가지 */}
              <section className="space-y-4">
                <h2 className="text-2xl font-bold">5. 절세 핵심 5가지 — 합산 50만~200만 원 절감</h2>
                <div className="space-y-3">
                  <div className="rounded-lg border border-border-base bg-bg-raised p-4">
                    <h3 className="font-semibold text-text-primary mb-1">① 노란우산공제 — 소상공인·자영업자 필수</h3>
                    <p className="text-sm text-text-secondary">
                      연 500만 원까지 소득공제. 소득금액 4,000만 이하 500만, 4,000만~1억 300만, 1억 초과 200만 한도.
                      절세 + 노후 대비. <strong>중소기업중앙회 신청</strong>. 이미 가입자도 5월 신고 시 자동 반영.
                    </p>
                  </div>
                  <div className="rounded-lg border border-border-base bg-bg-raised p-4">
                    <h3 className="font-semibold text-text-primary mb-1">② 연금저축·IRP — 세액공제 13.2~16.5%</h3>
                    <p className="text-sm text-text-secondary">
                      연 700만 원 한도(연금저축 600만 + IRP 추가 100만). 종합소득금액 5,500만 이하 16.5%, 초과 13.2%.
                      예: 700만 납입 → 약 92~115만 원 세액 환급. 5월 신고 전 가입·납입해도 적용.
                    </p>
                  </div>
                  <div className="rounded-lg border border-border-base bg-bg-raised p-4">
                    <h3 className="font-semibold text-text-primary mb-1">③ 의료비·교육비 세액공제</h3>
                    <p className="text-sm text-text-secondary">
                      <strong>의료비</strong>: 총급여 3% 초과분 15% 세액공제 (난임·미숙아 30%).
                      <strong> 교육비</strong>: 본인·자녀 등록금 15% (초중고 300만 한도, 대학 900만 한도).
                      홈택스 "연말정산 간소화 자료"로 자동 수집.
                    </p>
                  </div>
                  <div className="rounded-lg border border-border-base bg-bg-raised p-4">
                    <h3 className="font-semibold text-text-primary mb-1">④ 기부금 세액공제</h3>
                    <p className="text-sm text-text-secondary">
                      정치자금 10만 이하 100% 세액공제 (110% 환급 효과). 법정기부금·지정기부금 15%
                      (1,000만 초과분 30%). 기부금 영수증 보관 필수.
                    </p>
                  </div>
                  <div className="rounded-lg border border-border-base bg-bg-raised p-4">
                    <h3 className="font-semibold text-text-primary mb-1">⑤ 월세 세액공제 — 무주택 직장인·프리랜서</h3>
                    <p className="text-sm text-text-secondary">
                      총급여 7,000만 이하 무주택 + 국민주택규모 이하 임차 시 월세 17% 세액공제 (한도 750만).
                      예: 월세 50만 × 12개월 = 600만 → 102만 원 환급. 임대차계약서 + 월세 송금 영수증 필수.
                    </p>
                  </div>
                </div>
              </section>

              {/* 6. 환급 vs 추가 납부 */}
              <section className="space-y-4">
                <h2 className="text-2xl font-bold">6. 환급 받는 경우 vs 추가 납부 사례</h2>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="rounded-lg border border-primary-500/30 bg-primary-500/5 p-4">
                    <h3 className="mb-2 font-semibold text-primary-700 dark:text-primary-300">💰 환급 받는 케이스</h3>
                    <ul className="text-sm text-text-secondary space-y-1">
                      <li>• 프리랜서 — 3.3% 원천징수액 &gt; 실제 세액 (단순경비율 적용 시 흔함)</li>
                      <li>• 사업자 — 적자 발생 (손실 → 다음 해 결손금 이월)</li>
                      <li>• 직장인 — 의료비·교육비·기부금 연말정산 누락 반영</li>
                      <li>• 중도퇴사 후 미정산</li>
                      <li>• 노란우산·연금저축 추가 가입</li>
                    </ul>
                  </div>
                  <div className="rounded-lg border border-danger-500/30 bg-danger-500/5 p-4">
                    <h3 className="mb-2 font-semibold text-danger-700 dark:text-danger-300">💸 추가 납부 케이스</h3>
                    <ul className="text-sm text-text-secondary space-y-1">
                      <li>• N잡러 — 직장 + 부업 합산 시 누진세율 상위 적용</li>
                      <li>• 사업소득 큰 폭 증가 (3.3% 원천징수보다 실세액 큼)</li>
                      <li>• 임대료 증가</li>
                      <li>• 이자·배당 2,000만 초과</li>
                      <li>• 기타소득(강사료) 300만 초과</li>
                    </ul>
                  </div>
                </div>
              </section>

              <FaqSection items={[...FAQ_ITEMS]} />

              {/* 주의사항 */}
              <section className="card border-l-4 border-l-danger-500 bg-danger-500/5">
                <h2 className="mb-2 text-lg font-semibold text-danger-700 dark:text-danger-300">⚠️ 주의사항</h2>
                <ul className="space-y-2 text-sm text-danger-700 dark:text-danger-300">
                  <li>• 본 가이드는 일반론이며 개별 사정(다양한 소득·복잡한 공제)은 세무사 상담 권장.</li>
                  <li>• 단순경비율·기준경비율은 매년 시행령 변경 — 2026년 5월 신고 시 홈택스 자동 적용 확인.</li>
                  <li>• 5월 25일 이후는 홈택스 트래픽 집중 — 가급적 5월 20일까지 신고 권장.</li>
                  <li>• 무신고가산세 20% (소득 누락 큰 경우 40%)는 면제 사유 거의 없음 — 반드시 신고.</li>
                  <li>• 환급 통장 본인 명의 정확히 — 타인 명의 입력 시 환급 지연·반환.</li>
                </ul>
              </section>

              {/* 관련 도구 */}
              <section className="card">
                <h2 className="mb-3 text-lg font-semibold">📊 관련 계산기·가이드</h2>
                <ul className="space-y-2 text-sm">
                  <li>
                    →{' '}
                    <Link href="/calculator/freelancer-tax/" className="text-primary-600 underline dark:text-primary-500">
                      프리랜서 종합소득세 계산기
                    </Link>
                    {' '}— 본 가이드의 모든 시나리오 직접 시뮬레이션
                  </li>
                  <li>
                    →{' '}
                    <Link href="/calculator/salary/" className="text-primary-600 underline dark:text-primary-500">
                      연봉 실수령액 계산기 (직장인)
                    </Link>
                  </li>
                  <li>
                    →{' '}
                    <Link href="/calculator/n-jobber-insurance/" className="text-primary-600 underline dark:text-primary-500">
                      N잡러 건강보험 계산기
                    </Link>
                  </li>
                  <li>
                    →{' '}
                    <Link href="/calculator/vat/" className="text-primary-600 underline dark:text-primary-500">
                      부가가치세(VAT) 계산기
                    </Link>
                    {' '}— 사업자 부가세 신고
                  </li>
                  <li>
                    →{' '}
                    <Link href="/guide/freelancer-salary-comparison/" className="text-primary-600 underline dark:text-primary-500">
                      가이드: 프리랜서 vs 일반직 실수령액 비교
                    </Link>
                  </li>
                  <li>
                    →{' '}
                    <Link href="/glossary/" className="text-primary-600 underline dark:text-primary-500">
                      용어사전 — 단순경비율·기준경비율·퇴직소득세 등
                    </Link>
                  </li>
                </ul>
              </section>

              <ShareButtons
                title="5월 종합소득세 신고 완벽 가이드 (2026)"
                url={URL}
                description="프리랜서·사업자·N잡러 필독. 신고 대상·기한·홈택스 단계별 신고법·절세 5가지·환급 받는 법."
              />

              <section
                aria-label="출처 및 면책"
                className="rounded-lg border border-border-base p-4 text-caption text-text-tertiary"
              >
                <p className="mb-2">
                  <strong>법적 근거</strong>: 소득세법 §70 (종합소득세 신고) · §73 (납부) · §76 (가산세) ·
                  국세기본법 §47의2 (가산세) · 시행령 §143 (단순경비율). 참고:{' '}
                  <a href="https://www.hometax.go.kr" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-600 underline dark:text-primary-500">국세청 홈택스</a>,{' '}
                  <a href="https://www.nts.go.kr" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-600 underline dark:text-primary-500">국세청</a>,{' '}
                  <a href="https://www.kbiz.or.kr" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-600 underline dark:text-primary-500">중소기업중앙회 노란우산공제</a>.
                </p>
                <p className="mb-2">
                  <strong>면책 조항</strong>: 본 가이드는 정보 제공 목적이며 세무·법적 조언이 아닙니다.
                  개별 사정(복잡한 다중 소득, 특수 공제, 부동산 임대 세무 등)은 반드시 세무사 또는 세무서
                  상담을 통해 확정하시기 바랍니다.
                </p>
                <p>
                  <strong>업데이트</strong>: {DATE_MODIFIED} · 작성·검수: 김준혁 (스마트데이터샵)
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
