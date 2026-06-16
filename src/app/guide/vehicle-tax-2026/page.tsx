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

const URL = 'https://calculatorhost.com/guide/vehicle-tax-2026/';
const DATE_PUBLISHED = '2026-06-14';
const DATE_MODIFIED = '2026-06-14';

export const metadata: Metadata = {
  title: '자동차세 계산 2026 | 배기량별 세율·연납 할인·차령경감',
  description:
    '2026년 자동차세는 비영업용 승용차 기준 배기량 cc당 80~200원에 지방교육세 30%를 더해 산정합니다. 배기량별 시뮬레이션, 차령경감(3년차부터 연 5%, 최대 50%), 연납 할인(5% 공제율)까지 지방세법 기준 완전 정리.',
  keywords: [
    '자동차세 계산',
    '자동차세 연납 할인',
    '자동차세 납부 시기',
    '배기량 자동차세',
    '자동차세 차령경감',
    '지방세법 127조',
    '비영업용 승용차 세금',
    '6월 자동차세',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '자동차세 계산 2026 | 배기량별 세율·연납 할인·차령경감' }],
    title: '자동차세 계산 2026 — 배기량별 세율·연납 할인·차령경감',
    description: '1,000cc 이하 80원, 1,601cc 이상 200원/cc. 차령경감·연납 할인 포함 완전 계산.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '자동차세 계산 2026 — 배기량별 세율·연납 할인',
    description: '1,000cc 이하 80원/cc부터 1,601cc 이상 200원/cc까지. 지방세법 §127 기준.',
  },
};

const FAQ_ITEMS = [
  {
    question: '자동차세 계산 방법은?',
    answer:
      '배기량(cc) × cc당 세율(지방세법 §127) = 기본 자동차세. 여기에 지방교육세(자동차세의 30%)를 더합니다. 예: 1600cc 승용차는 1600 × 140원 + 지방교육세 = 약 291,200원. 본 계산기에서 배기량을 입력하면 자동 계산됩니다.',
  },
  {
    question: '자동차세 연납하면 얼마나 할인되나요?',
    answer:
      '명목 공제율 5% (지방세법 시행령 §125)에서 선납 일수에 비례해 할인됩니다. 1월 신청 시 실효율 약 4.81%, 3월 약 3.74%, 6월 약 2.93%, 9월 약 1.67%. 정확한 할인액은 본 계산기의 "연납 할인" 옵션에서 확인하세요.',
  },
  {
    question: '자동차세 6월에 왜 내나요?',
    answer:
      '자동차세는 지방세로서 연 2회 분할 납부가 원칙입니다. 제1기는 6월 16~30일, 제2기는 12월 16~31일. 다만 1월에 전액을 미리 내면(연납) 할인을 받을 수 있습니다(지방세법 시행령 §125). 신차 구매자는 등록월부터 시작.',
  },
  {
    question: '오래된 차는 자동차세가 싼가요?',
    answer:
      '네, 차령경감이 있습니다(지방세법 §127①제2호). 3년차부터 시작되며, 매년 5%씩 감소합니다(최대 50%). 공식: (차령 - 2) × 5% (단, ≤ 50%). 예: 5년차는 15%, 12년차 이상은 50% 경감됩니다. 단, 차령경감은 배기량 과세차에만 적용되며 전기차·수소차 정액세에는 적용되지 않습니다.',
  },
  {
    question: '지방교육세는 뭔가요?',
    answer:
      '지방교육세는 교육 재정 확충을 위한 세금으로, 자동차세의 30%입니다(지방세법 §151). 자동차세와 함께 납부합니다. 예: 자동차세 20만 원이면 지방교육세 6만 원, 총 26만 원 납부.',
  },
  {
    question: '자동차세 누가 내나요?',
    answer:
      '매년 1월 1일 기준 차량 소유자(운전면허증 주소 기준, 대여 차량은 대여인)입니다. 차량 양도 시 양도일 이후 보유자가 세금을 냅니다. 월세나 리스 차량은 리스사가 소유자로 과세됩니다.',
  },
  {
    question: '자동차세 미납 시 어떤 불이익이 있나요?',
    answer:
      '납기일 3개월 이내 미납 시 1.2배, 3~6개월 1.5배, 6개월 초과 1.8배 이상의 가산세가 붙습니다. 또한 납기일 60일 경과 후 신규 등록·이전 등록이 금지되고, 강제 징수 대상이 됩니다.',
  },
  {
    question: '차량 양도 시 자동차세는 어떻게 되나요?',
    answer:
      '양도일 기준으로 정산합니다. 양도인이 미리 낸 세액(연납 포함)은 양수인이 남은 기간분을 다시 납부합니다. 예: 6월 15일 양도 시 양수인은 6월 16일~12월 31일분을 새로 납부하며, 양도인은 미경과 부분을 환급받습니다.',
  },
] as const;

export default function VehicleTax2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '자동차세 계산 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '자동차세 완전 정리 (2026) — 배기량별 세율·연납 할인·차령경감',
    description: '비영업용 승용차 배기량별 cc당 세율(80~200원)에 지방교육세 30%를 더한 자동차세 계산 방법. 차령경감, 연납 할인, 납부 시기 완전 가이드.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['자동차세', '배기량 세율', '차령경감', '연납 할인', '지방세법'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '자동차세 완전 정리 2026',
    description: '비영업용 승용차 자동차세 계산 방법. cc당 세율 80~200원 + 지방교육세 30% + 차령경감(3년차부터 연 5%) + 연납 할인(5% 공제율).',
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
                    { name: '자동차세 계산 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">세금·자동차 · 8분 읽기 · 2026-06-14</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  2026 자동차세 완전 정리
                  <br />
                  <span className="text-2xl text-text-secondary">— 배기량 세율·연납 할인·차령경감</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  자동차세는 비영업용 승용차 기준 배기량(cc)에 cc당 세율을 곱하고, 지방교육세 30%를 더해 산정합니다
                  (지방세법 §127, §151). 1,000cc 이하는 cc당 80원, 1,601cc 이상은 200원입니다. 여기에 3년차부터
                  시작되는 <strong>차령경감</strong>(연 5%, 최대 50%)과 1월 <strong>연납 할인</strong>(5% 공제율)을 반영하면 실제 납부액을 정확히 계산할 수 있습니다.
                </p>
              </header>

              <AdSlot slot="guide-vehicle-tax-2026-top" format="horizontal" />

              <section aria-label="핵심 요약" className="card border-l-4 border-l-primary-500">
                <h2 className="mb-2 text-caption uppercase tracking-wider text-primary-500">핵심 요약</h2>
                <ul className="space-y-1.5 text-sm" data-speakable>
                  <li>💰 <strong>배기량 cc당 세율</strong>: 1,000cc 이하 80원 / 1,001~1,600cc 140원 / 1,601cc 이상 200원</li>
                  <li>📊 <strong>지방교육세</strong>: 자동차세의 30% 추가 납부 (지방세법 §151)</li>
                  <li>🚗 <strong>차령경감</strong>: 3년차부터 연 5% (최대 50%, 12년차 이상 고정) (지방세법 §127①제2호, 배기량 과세차만)</li>
                  <li>📅 <strong>납부 시기</strong>: 제1기 6월 16~30일 / 제2기 12월 16~31일 (또는 1월 연납)</li>
                  <li>💳 <strong>연납 할인</strong>: 1월 신청 시 5% 공제율, 신청월별로 실효율 변동 (지방세법 시행령 §125)</li>
                  <li>⚠️ <strong>주의</strong>: 미납 시 1.2배 이상 가산세 + 행정 제제</li>
                </ul>
              </section>

              <section className="card">
                <h2 className="mb-4 text-2xl font-bold">🔢 배기량별 cc당 세율</h2>
                <p className="mb-3 text-sm text-text-secondary">지방세법 §127 기준 비영업용 승용차</p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="caption-top mb-2 text-text-secondary">비영업용 승용차 배기량별 자동차세 세율 (지방세법 §127)</caption>
                    <thead>
                      <tr className="bg-primary-500/10 border border-border-base">
                        <th className="px-3 py-2 text-left">배기량</th>
                        <th className="px-3 py-2 text-right">cc당 세율</th>
                        <th className="px-3 py-2 text-left">대표 차종</th>
                      </tr>
                    </thead>
                    <tbody className="text-text-secondary">
                      <tr className="border border-border-base">
                        <td className="px-3 py-2 font-bold">1,000cc 이하</td>
                        <td className="px-3 py-2 text-right font-bold text-primary-700 dark:text-primary-300">80원/cc</td>
                        <td className="px-3 py-2">경차 (모닝, i10, 스파크)</td>
                      </tr>
                      <tr className="border border-border-base bg-primary-500/5">
                        <td className="px-3 py-2 font-bold">1,001~1,600cc</td>
                        <td className="px-3 py-2 text-right font-bold text-primary-700 dark:text-primary-300">140원/cc</td>
                        <td className="px-3 py-2">준중형 (아반떼, K3, 셀토스)</td>
                      </tr>
                      <tr className="border border-border-base">
                        <td className="px-3 py-2 font-bold">1,601cc 이상</td>
                        <td className="px-3 py-2 text-right font-bold text-primary-700 dark:text-primary-300">200원/cc</td>
                        <td className="px-3 py-2">중형·대형 (쏘나타, 그랜저, BMW 3시리즈)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              <section className="card">
                <h2 className="mb-4 text-2xl font-bold">📋 배기량별 자동차세 계산 사례</h2>
                <p className="mb-3 text-sm text-text-secondary">기본 자동차세(cc × 세율) + 지방교육세(세율의 30%) 합산. 차령경감·연납 할인 미적용.</p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="caption-top mb-2 text-text-secondary">비영업용 신차 기준 1년 납부액 (차령 1년, 연납·지역할증 미적용)</caption>
                    <thead>
                      <tr className="bg-primary-500/10 border border-border-base">
                        <th className="px-3 py-2 text-left">대표 차종</th>
                        <th className="px-3 py-2 text-right">배기량</th>
                        <th className="px-3 py-2 text-right">자동차세</th>
                        <th className="px-3 py-2 text-right">지방교육세 (30%)</th>
                        <th className="px-3 py-2 text-right">연 납부액</th>
                      </tr>
                    </thead>
                    <tbody className="text-text-secondary">
                      <tr className="border border-border-base">
                        <td className="px-3 py-2">모닝 (경차)</td>
                        <td className="px-3 py-2 text-right">1,000cc</td>
                        <td className="px-3 py-2 text-right tabular-nums">80,000원</td>
                        <td className="px-3 py-2 text-right tabular-nums">24,000원</td>
                        <td className="px-3 py-2 text-right font-bold tabular-nums text-primary-700 dark:text-primary-300">104,000원</td>
                      </tr>
                      <tr className="border border-border-base bg-primary-500/5">
                        <td className="px-3 py-2">아반떼 (준중형)</td>
                        <td className="px-3 py-2 text-right">1,600cc</td>
                        <td className="px-3 py-2 text-right tabular-nums">224,000원</td>
                        <td className="px-3 py-2 text-right tabular-nums">67,200원</td>
                        <td className="px-3 py-2 text-right font-bold tabular-nums text-primary-700 dark:text-primary-300">291,200원</td>
                      </tr>
                      <tr className="border border-border-base">
                        <td className="px-3 py-2">쏘나타 (중형)</td>
                        <td className="px-3 py-2 text-right">2,000cc</td>
                        <td className="px-3 py-2 text-right tabular-nums">400,000원</td>
                        <td className="px-3 py-2 text-right tabular-nums">120,000원</td>
                        <td className="px-3 py-2 text-right font-bold tabular-nums text-primary-700 dark:text-primary-300">520,000원</td>
                      </tr>
                      <tr className="border border-border-base">
                        <td className="px-3 py-2">그랜저 (대형)</td>
                        <td className="px-3 py-2 text-right">3,000cc</td>
                        <td className="px-3 py-2 text-right tabular-nums">600,000원</td>
                        <td className="px-3 py-2 text-right tabular-nums">180,000원</td>
                        <td className="px-3 py-2 text-right font-bold tabular-nums text-primary-700 dark:text-primary-300">780,000원</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-3 text-xs text-text-tertiary">
                  →{' '}
                  <Link href="/calculator/vehicle-tax/" className="text-primary-600 underline dark:text-primary-500">
                    자동차세 계산기
                  </Link>
                  에서 본인 차량 정확히 계산하기
                </p>
              </section>

              <section className="card">
                <h2 className="mb-4 text-2xl font-bold">⏱️ 차령경감 — 나이 많은 차일수록 세금 감소</h2>
                <p className="mb-3 text-sm text-text-secondary">지방세법 §127①제2호 — 3년차부터 시작, 매년 5%씩 경감 (최대 50%). 배기량 과세차만 적용(전기차 정액 제외).</p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 mb-4 text-sm">
                  <p className="text-text-primary font-semibold mb-2">차령경감 공식</p>
                  <p className="text-text-secondary font-mono bg-bg-base p-2 rounded mb-2">(차령 - 2) × 5% = 경감률 (단, ≤ 50%)</p>
                  <p className="text-text-secondary">예: 5년차 = (5-2) × 5% = 15% 경감</p>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="caption-top mb-2 text-text-secondary">차령별 경감률 (지방세법 §127①제2호)</caption>
                    <thead>
                      <tr className="bg-primary-500/10 border border-border-base">
                        <th className="px-3 py-2 text-left">차령</th>
                        <th className="px-3 py-2 text-right">경감률</th>
                        <th className="px-3 py-2 text-left">설명</th>
                      </tr>
                    </thead>
                    <tbody className="text-text-secondary">
                      <tr className="border border-border-base">
                        <td className="px-3 py-2 font-semibold">1~2년</td>
                        <td className="px-3 py-2 text-right">0% (경감 없음)</td>
                        <td className="px-3 py-2">신차·신규 등록 차량</td>
                      </tr>
                      <tr className="border border-border-base bg-primary-500/5">
                        <td className="px-3 py-2 font-semibold">3년</td>
                        <td className="px-3 py-2 text-right">5%</td>
                        <td className="px-3 py-2">경감 시작 연도</td>
                      </tr>
                      <tr className="border border-border-base">
                        <td className="px-3 py-2 font-semibold">5년</td>
                        <td className="px-3 py-2 text-right">15%</td>
                        <td className="px-3 py-2">(5-2) × 5% = 15%</td>
                      </tr>
                      <tr className="border border-border-base">
                        <td className="px-3 py-2 font-semibold">10년</td>
                        <td className="px-3 py-2 text-right">40%</td>
                        <td className="px-3 py-2">(10-2) × 5% = 40%</td>
                      </tr>
                      <tr className="border border-border-base bg-primary-500/5">
                        <td className="px-3 py-2 font-semibold">12년 이상</td>
                        <td className="px-3 py-2 text-right font-bold">50% (최대)</td>
                        <td className="px-3 py-2">(12-2) × 5% = 50% (고정)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="mt-4 rounded-lg border border-highlight-500/30 bg-highlight-500/5 p-4 text-sm">
                  <strong className="text-highlight-700 dark:text-highlight-300">예시 계산</strong>
                  <p className="text-text-secondary mt-2">
                    1,600cc 5년차 아반떼 자동차세 계산:
                  </p>
                  <ol className="text-text-secondary mt-2 space-y-1 list-decimal list-inside">
                    <li>기본 자동차세: 1,600cc × 140원 = 224,000원</li>
                    <li>차령경감: 224,000원 × 15% = 33,600원 (감소액)</li>
                    <li>경감 후 자동차세: 224,000원 - 33,600원 = 190,400원</li>
                    <li>지방교육세: 190,400원 × 30% = 57,120원</li>
                    <li><strong>연 납부액: 190,400원 + 57,120원 = 247,520원</strong></li>
                  </ol>
                </div>
              </section>

              <section className="card">
                <h2 className="mb-4 text-2xl font-bold">💳 연납 할인 — 1월 미리 내면 5% 공제</h2>
                <p className="mb-3 text-sm text-text-secondary">지방세법 시행령 §125 — 1월 1~31일 신청, 5% 공제율 (선납 일수에 비례)</p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 mb-4 text-sm">
                  <p className="text-text-primary font-semibold mb-2">연납 공제 방식</p>
                  <p className="text-text-secondary">공제액 = 연간 총액 × (선납일수 / 365일) × 5% 공제율</p>
                  <p className="text-text-secondary mt-2">신청이 늦을수록 선납 일수가 줄어들어 공제액도 감소합니다.</p>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="caption-top mb-2 text-text-secondary">신청월별 실효 할인율 (지방세법 시행령 §125, ADR-014 검증)</caption>
                    <thead>
                      <tr className="bg-primary-500/10 border border-border-base">
                        <th className="px-3 py-2 text-left">신청 시기</th>
                        <th className="px-3 py-2 text-right">선납 일수</th>
                        <th className="px-3 py-2 text-right">실효 할인율</th>
                        <th className="px-3 py-2 text-left">설명</th>
                      </tr>
                    </thead>
                    <tbody className="text-text-secondary">
                      <tr className="border border-border-base bg-primary-500/5">
                        <td className="px-3 py-2 font-bold">1월 신청 ⭐</td>
                        <td className="px-3 py-2 text-right">351일</td>
                        <td className="px-3 py-2 text-right font-bold text-primary-700 dark:text-primary-300">약 4.81%</td>
                        <td className="px-3 py-2">최대 절약</td>
                      </tr>
                      <tr className="border border-border-base">
                        <td className="px-3 py-2">3월 신청</td>
                        <td className="px-3 py-2 text-right">273일</td>
                        <td className="px-3 py-2 text-right">약 3.74%</td>
                        <td className="px-3 py-2">1월 대비 절감액 감소</td>
                      </tr>
                      <tr className="border border-border-base">
                        <td className="px-3 py-2">6월 신청</td>
                        <td className="px-3 py-2 text-right">214일</td>
                        <td className="px-3 py-2 text-right">약 2.93%</td>
                        <td className="px-3 py-2">선납 일수 절반 근처</td>
                      </tr>
                      <tr className="border border-border-base">
                        <td className="px-3 py-2">9월 신청</td>
                        <td className="px-3 py-2 text-right">122일</td>
                        <td className="px-3 py-2 text-right">약 1.67%</td>
                        <td className="px-3 py-2">최소 절감</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="mt-4 rounded-lg border border-highlight-500/30 bg-highlight-500/5 p-4 text-sm">
                  <strong className="text-highlight-700 dark:text-highlight-300">⚠️ 주의사항</strong>
                  <ul className="text-text-secondary mt-2 space-y-1 list-disc list-inside">
                    <li><strong>1월만 신청 가능:</strong> 연납은 매년 1월 1~31일에만 신청 가능 (이후 6월·12월 정기 납부는 연납 공제 불가)</li>
                    <li><strong>신청처:</strong> 위택스(wetax.go.kr) 또는 관할 시·군청 세무서</li>
                    <li><strong>신용카드 무이자:</strong> 2~6개월 무이자 할부 가능 (수수료 0.8% 본인 부담)</li>
                    <li><strong>차량 양도:</strong> 연납 후 양도 시 미경과 일수에 해당하는 세액을 환급받음</li>
                  </ul>
                </div>
              </section>

              <section className="card">
                <h2 className="mb-4 text-2xl font-bold">📅 자동차세 납부 시기</h2>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 mb-4 text-sm">
                  <p className="text-text-primary font-semibold mb-2">기본 납부: 연 2회 분할</p>
                  <ul className="text-text-secondary space-y-1">
                    <li>① <strong>제1기:</strong> 6월 16일(월)~6월 30일(월) — 연간 1/2</li>
                    <li>② <strong>제2기:</strong> 12월 16일(월)~12월 31일(수) — 연간 1/2</li>
                  </ul>
                  <p className="text-text-secondary mt-3">신차 구매자는 등록월부터 시작합니다. 예: 8월 신규 등록 → 12월 제2기부터 납부.</p>
                </div>
                <div className="rounded-lg border border-primary-500/30 bg-primary-500/5 p-4 mb-4 text-sm">
                  <p className="text-text-primary font-semibold mb-2">🎁 대체 방법: 1월 연납</p>
                  <p className="text-text-secondary">
                    1월에 연간 자동차세 전액을 미리 내면 5% 공제율(선납 일수 비례)을 받습니다. 가장 큰 절약은 1월 신청 시 약 4.81% 할인입니다.
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 text-sm">
                  <p className="text-text-primary font-semibold mb-2">📌 신청처</p>
                  <ul className="text-text-secondary space-y-1 list-disc list-inside">
                    <li>위택스(wetax.go.kr) — 24시간 온라인 신청 (추천)</li>
                    <li>스마트 위택스 앱 — 모바일 신청</li>
                    <li>관할 시·군청 세무서 — 직접 방문</li>
                    <li>지역별 앱 — 서울(STAX), 경기·인천 등 지자체별 앱</li>
                  </ul>
                </div>
              </section>

              <AdSlot slot="guide-vehicle-tax-2026-mid" format="rectangle" />

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">❓ 자주 묻는 질문</h2>
                <FaqSection items={FAQ_ITEMS} />
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">🔗 관련 계산기·가이드</h2>
                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                  <Link
                    href="/calculator/vehicle-tax/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <h3 className="font-bold text-text-primary">🚗 자동차세 계산기</h3>
                    <p className="text-sm text-text-secondary mt-1">배기량 입력 → 연 납부액 즉시 계산. 차령경감·연납 할인 반영.</p>
                  </Link>
                  <Link
                    href="/guide/january-vehicle-tax-prepayment/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <h3 className="font-bold text-text-primary">📌 자동차세 1월 연납 가이드</h3>
                    <p className="text-sm text-text-secondary mt-1">1월 신청 방법·할인 계산·카드 무이자 할부.</p>
                  </Link>
                  <Link
                    href="/guide/vehicle-tax-june-payment-annual-discount-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <h3 className="font-bold text-text-primary">📋 6월 자동차세 납부 완전 가이드</h3>
                    <p className="text-sm text-text-secondary mt-1">제1기 6월 납부·차령경감·연납 할인 해설.</p>
                  </Link>
                  <Link
                    href="/guide/electric-vehicle-tax-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <h3 className="font-bold text-text-primary">🔋 전기차 자동차세 (정액 13만원)</h3>
                    <p className="text-sm text-text-secondary mt-1">배기량 없는 전기차·수소차는 차령경감 없이 매년 정액. 하이브리드와의 차이.</p>
                  </Link>
                  <Link
                    href="/calculator/acquisition-tax/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <h3 className="font-bold text-text-primary">🏷️ 취득세 계산기</h3>
                    <p className="text-sm text-text-secondary mt-1">신차·중고차 구매 시 취득세·개별소비세 계산.</p>
                  </Link>
                </div>
              </section>

              <section className="rounded-lg border border-border-base bg-bg-raised p-6 text-sm">
                <p className="text-text-secondary mb-3">
                  <strong>면책조항</strong>: 본 페이지의 자동차세 계산 및 정보는 2026년 현행 지방세법(§127, §128, §151, 시행령 §125) 기준으로 작성되었습니다. 실제 납부액은 지역할증세, 차량 등록 지역, 개별 상황에 따라 달라질 수 있으므로, 최종 확인은 관할 시·군청 세무서 또는 위택스(wetax.go.kr)에서 하시기 바랍니다. 법조항 인용: 지방세법 §127(자동차세 세율·차령경감 §127①제2호), §128(납기), §151(지방교육세) / 지방세법 시행령 §125(연납 할인).
                </p>
                <p className="text-text-tertiary text-xs">
                  업데이트: 2026-06-14 · AI 보조 작성 후 검수 · 출처: 지방세법·법제처·국세청 공식 문서
                </p>
              </section>

              <ShareButtons
                title="2026 자동차세 완전 정리 — 배기량 세율·연납 할인·차령경감"
                url={URL}
                description="비영업용 승용차 자동차세 계산 방법. 배기량별 cc당 세율(80~200원) + 지방교육세 30% + 차령경감·연납 할인. 지방세법 §127 기준."
              />
            </article>
          </main>
        </div>
        <Footer />
      </div>
    </>
  );
}
