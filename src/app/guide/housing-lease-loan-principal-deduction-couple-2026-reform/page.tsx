// [revenue-lever: indexing+traffic] 주택임차차입금 원리금상환 소득공제 부부 각각 개편안 (전세대출 임차인 롱테일)
import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { Footer } from '@/components/layout/Footer';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { FaqSection } from '@/components/calculator/FaqSection';
import { ShareButtons } from '@/components/calculator/ShareButtons';
import {
  buildBreadcrumbJsonLd,
  buildArticleJsonLd,
  buildWebPageJsonLd,
  buildFaqPageJsonLd,
  buildSpeakableJsonLd,
} from '@/lib/seo/jsonld';

const URL = 'https://calculatorhost.com/guide/housing-lease-loan-principal-deduction-couple-2026-reform/';
const DATE_PUBLISHED = '2026-08-24';
const DATE_MODIFIED = '2026-08-24';

export const metadata: Metadata = {
  title: '전세대출 원리금 소득공제 2026, 무주택 부부 각각 개편안',
  description:
    '전세·월세 보증금 대출 원리금상환액의 40%를 소득공제하는 주택임차차입금 공제. 2026 세제개편안은 주거를 달리하는 무주택 부부가 각각 받도록 확대합니다. 요건·한도·계산까지 정리(소득세법 §52).',
  keywords: [
    '주택임차차입금 원리금상환액 소득공제',
    '전세대출 소득공제',
    '전세자금대출 연말정산',
    '무주택 부부 소득공제',
    '주말부부 전세대출 공제',
    '소득세법 52조',
    '2026 세제개편안 주택공제',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '전세대출 원리금 소득공제 2026, 무주택 부부 각각 개편안' }],
    title: '전세대출 원리금 소득공제 2026, 무주택 부부 각각 받는 개편안',
    description: '주택임차차입금 원리금상환액 40% 소득공제. 2026 세제개편안으로 주거를 달리하는 무주택 부부가 각각 공제. 요건·한도·절세액 정리.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '전세대출 원리금 소득공제 2026, 무주택 부부 각각 개편안',
    description: '전세대출 원리금 40% 소득공제, 합산 한도 연 400만원. 2026 개편안은 주말부부 각각 공제 허용(정부안). 소득세법 §52.',
  },
};

const FAQ_ITEMS = [
  {
    question: '전세대출 원리금도 소득공제가 되나요?',
    answer:
      '됩니다. 무주택 세대의 근로자가 전세·월세 보증금을 마련하려고 빌린 주택임차차입금의 원리금상환액은 40%를 소득공제받습니다(소득세법 §52). 원금과 이자를 합한 상환액이 대상이며, 근로소득자만 적용됩니다. 사업소득만 있는 사람은 대상이 아닙니다.',
  },
  {
    question: '누가 이 공제를 받을 수 있나요?',
    answer:
      '무주택 세대의 세대주(요건 충족 시 세대원)인 근로자가 대상입니다. 임차한 주택이 국민주택규모(전용 85제곱미터 이하)여야 하고, 대출은 금융기관 또는 요건을 갖춘 개인에게서 받은 것이어야 합니다. 원칙적으로 임대차계약서상 입주일과 주민등록 전입일 중 빠른 날 전후 일정 기간 내에 받은 대출이어야 합니다.',
  },
  {
    question: '공제 한도는 얼마인가요?',
    answer:
      '원리금상환액의 40%를 공제하되, 주택청약종합저축 소득공제와 합산해 연 400만원이 한도입니다(소득세법 §52, 조세특례제한법 §87). 즉 원리금상환액이 연 1천만원이면 400만원 전액을 공제받지만, 그 이상이어도 청약저축 공제와 합해 400만원까지만 인정됩니다. 정확한 합산 한도는 국세청에서 확인하세요.',
  },
  {
    question: '2026년 개편으로 부부가 각각 받을 수 있나요?',
    answer:
      '2026년 세제개편안(정부안)은 주거를 달리하는 무주택 부부가 각각 공제받도록 확대하는 내용을 담았습니다. 지금은 세대 기준으로 한 명만 적용되지만, 개편안이 통과되면 주말부부처럼 각자 임차하고 각자 대출을 상환하는 부부가 각각 공제할 수 있습니다. 다만 부부합산 공제한도는 연 400만원으로 유지됩니다. 국회 통과 전 정부안입니다.',
  },
  {
    question: '월세로 살아도 이 공제를 받나요?',
    answer:
      '월세 보증금을 마련하려고 대출받았다면 그 원리금상환액도 대상입니다. 다만 매달 내는 월세 자체는 이 공제가 아니라 별도의 월세 세액공제 대상입니다. 보증금 대출 원리금은 소득공제, 월세액은 세액공제로 성격이 다르니 구분해서 챙겨야 합니다.',
  },
  {
    question: '장기주택저당차입금 이자상환 공제와 무엇이 다른가요?',
    answer:
      '주택임차차입금 공제는 무주택자가 임차보증금 대출 원리금을 갚을 때 받는 공제이고, 장기주택저당차입금 이자상환 공제는 주택을 사서 담보대출 이자를 갚는 유주택자가 받는 공제입니다(소득세법 §52). 전자는 원금+이자의 40%, 후자는 이자만 대상이며 한도도 다릅니다. 임차인은 전자, 매수인은 후자를 봅니다.',
  },
  {
    question: '연말정산에서 어떻게 신청하나요?',
    answer:
      '임대차계약서 사본, 주민등록등본, 금융기관 대출 원리금상환증명서를 회사에 제출하면 됩니다. 홈택스 연말정산 간소화에서 원리금상환액이 자동 조회되기도 하지만, 개인 간 차입이나 일부 상품은 누락될 수 있으니 증빙을 직접 챙기는 것이 안전합니다.',
  },
];

export default function HousingLeaseLoanPrincipalDeductionCouple2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '전세대출 원리금 소득공제 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '전세대출 원리금 소득공제 2026, 무주택 부부 각각 받는 개편안',
    description:
      '주택임차차입금 원리금상환액 40% 소득공제의 요건·한도, 그리고 2026 세제개편안의 무주택 부부 각각 공제 확대안을 계산 사례로 정리.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['주택임차차입금', '전세대출 소득공제', '무주택 부부', '원리금상환액', '2026 세제개편안'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '전세대출 원리금 소득공제 2026',
    description:
      '주택임차차입금 원리금상환액 소득공제의 요건·한도와 2026 세제개편안 부부 각각 공제 확대안 정리(소득세법 §52).',
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
                    { name: '전세대출 원리금 소득공제 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">무주택 임차인 · 9분 읽기 · 2026-08-24</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  전세대출 원리금 소득공제 2026
                  <br />
                  <span className="text-2xl text-text-secondary">· 무주택 부부 각각 받는 개편안</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  전세·월세 보증금을 대출로 마련한 무주택 근로자라면, 매년 갚는 원리금의 상당 부분을 소득공제로 돌려받을 수 있습니다. 이 글은 주택임차차입금 원리금상환액 소득공제의 요건과 한도를 정리하고, 2026년 세제개편안이 담은 &lsquo;주거를 달리하는 무주택 부부 각각 공제&rsquo; 확대안이 주말부부에게 어떤 의미인지 계산 사례로 설명합니다.
                </p>
              </header>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">전세대출 원리금도 소득공제 되나요?</h2>
                <p>
                  됩니다. 무주택 세대의 근로자가 전세나 월세 보증금을 마련하려고 빌린 주택임차차입금은 원리금상환액의 40%를 소득공제받습니다(소득세법 §52). 이자만이 아니라 원금과 이자를 합한 상환액이 공제 대상이라는 점이 특징입니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">30초 요약</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    · 대상: 무주택 세대의 세대주(요건 충족 세대원 포함)인 근로자
                    <br />
                    · 주택: 국민주택규모(전용 85제곱미터 이하) 임차
                    <br />
                    · 공제: 원리금상환액의 40%
                    <br />
                    · 한도: 주택청약종합저축 공제와 합산 연 400만원
                    <br />
                    · 개편안: 주거 달리하는 무주택 부부 각각 공제(정부안)
                  </p>
                </div>
                <p>
                  다만 근로소득자만의 혜택입니다. 사업소득만 있는 프리랜서·개인사업자는 이 소득공제를 적용받지 못합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">누가 받을 수 있나요? (요건)</h2>
                <p>
                  핵심 요건은 무주택, 국민주택규모 임차, 그리고 계약 시점 전후에 받은 대출이라는 세 가지입니다(소득세법 §52).
                </p>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li>
                    <strong>무주택 세대:</strong> 과세기간 종료일 기준 세대원 전원이 주택을 소유하지 않아야 합니다. 세대주가 공제를 받지 않으면 요건을 갖춘 세대원 근로자가 받을 수 있습니다.
                  </li>
                  <li>
                    <strong>국민주택규모 임차:</strong> 임차한 주택(주거용 오피스텔 포함)이 전용면적 85제곱미터 이하여야 합니다.
                  </li>
                  <li>
                    <strong>차입 시기:</strong> 임대차계약서상 입주일과 주민등록 전입일 중 빠른 날을 기준으로 전후 일정 기간(대출기관 차입은 전후 3개월 등) 내에 받은 대출이어야 합니다.
                  </li>
                  <li>
                    <strong>대출 경로:</strong> 금융기관 대출이거나, 요건을 갖춘 개인 간 차입(총급여 등 요건 충족)이어야 합니다.
                  </li>
                </ul>
                <p>
                  다만 개인 간 차입은 요건이 까다롭고 이자율 기준 등이 있어, 실제 인정 여부는 국세청 판단을 받는 것이 안전합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">얼마나 공제되나요? (공제율·한도)</h2>
                <p>
                  원리금상환액의 40%를 공제합니다. 다만 주택청약종합저축 소득공제와 합산해 연 400만원이 한도입니다(소득세법 §52, 조세특례제한법 §87).
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 주택임차차입금 원리금상환액 소득공제 요약 (소득세법 §52, 2026 기준)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">구분</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">내용</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">공제율</td>
                        <td className="p-3"><strong>원리금상환액의 40%</strong></td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">공제 한도</td>
                        <td className="p-3">연 <strong>400만원</strong> (주택청약종합저축 공제와 합산)</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">한도 도달 상환액</td>
                        <td className="p-3">연 1,000만원 (1,000만 × 40% = 400만)</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">개편안(정부안)</td>
                        <td className="p-3">주거 달리하는 무주택 부부 각각 공제, 부부합산 400만원</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p>
                  다만 청약저축 소득공제를 이미 많이 받고 있다면 합산 한도 400만원이 먼저 차서 전세대출 공제 여지가 줄어들 수 있습니다. 두 공제의 합계를 함께 보는 것이 중요합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">실제 얼마나 절세되나요? (계산 사례)</h2>
                <p>
                  소득공제는 과세표준을 줄이는 방식이라, 절세액은 본인 세율 구간에 따라 달라집니다. 아래 3가지 사례로 살펴봅니다(청약저축 공제는 없다고 가정).
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 1. 전세대출 원리금 연 800만원 상환</p>
                  <p className="text-sm text-text-secondary">
                    · 원리금상환액: 연 800만원
                    <br />
                    · 소득공제액: 800만원 × 40% = <strong>320만원</strong> (한도 400만 이내)
                    <br />
                    · 한계세율 15% 구간 → 절감세액: 320만 × 15% = 48만원
                    <br />
                    · 지방소득세 포함 시: 약 <strong>52만8천원</strong> 절세
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 2. 원리금 연 1,200만원 상환 (한도 초과)</p>
                  <p className="text-sm text-text-secondary">
                    · 원리금상환액: 연 1,200만원
                    <br />
                    · 40% 적용: 1,200만 × 40% = 480만원
                    <br />
                    · 한도 400만원 적용 → 소득공제액: <strong>400만원</strong>
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 상환액이 1천만원을 넘으면 한도 400만원에 걸립니다.</span>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 3. 주말부부 각자 상환 (개편안 적용 가정)</p>
                  <p className="text-sm text-text-secondary">
                    · 남편 원리금 연 600만원, 아내 원리금 연 500만원 (주거 달리함)
                    <br />
                    · 현행: 세대 기준 1명만 공제 → 한 사람분만 인정
                    <br />
                    · 개편안(정부안): 남편 600만 × 40% = 240만, 아내 500만 × 40% = 200만 각각 공제
                    <br />
                    · 두 사람 공제액 합계 440만이지만 부부합산 한도 적용 → <strong>최대 400만원</strong>
                    <br />
                    <span className="text-xs text-text-tertiary">주의: 개편안은 국회 통과 전 정부안입니다.</span>
                  </p>
                </div>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">임차인 공제 vs 매수인 공제, 헷갈리지 마세요</h2>
                <p>
                  주택자금 관련 소득공제는 임차인용과 매수인용이 나뉩니다. 성격이 달라 대상과 한도가 전혀 다릅니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 2. 주택임차차입금 공제 vs 장기주택저당차입금 공제 (소득세법 §52)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">구분</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">주택임차차입금(임차인)</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">장기주택저당차입금(매수인)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">대상자</td>
                        <td className="p-3">무주택 임차 근로자</td>
                        <td className="p-3">주택 취득 유주택 근로자</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">공제 대상</td>
                        <td className="p-3">원금+이자 상환액의 40%</td>
                        <td className="p-3">이자상환액(원금 제외)</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">한도</td>
                        <td className="p-3">청약저축 합산 연 400만원</td>
                        <td className="p-3">상환방식·만기별 차등(최대 수천만원)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p>
                  다만 무주택으로 임차하다가 주택을 사면 임차인 공제는 종료되고 매수인 공제로 넘어갑니다. 이사·매수 시점에 어떤 공제를 받는지 다시 확인하세요.
                </p>
              </section>

              <section className="space-y-6 border-t border-border-base pt-8">
                <h2 className="text-2xl font-bold">신청 절차와 주의사항</h2>
                <p>
                  연말정산에서 다음 서류로 신청합니다. 자동 조회가 되더라도 증빙을 챙겨두면 누락을 막을 수 있습니다.
                </p>
                <ol className="space-y-3 ml-6 list-decimal text-text-secondary">
                  <li><strong>임대차계약서 사본</strong> (임차 주택 규모·주소 확인용)</li>
                  <li><strong>주민등록등본</strong> (전입일·세대 구성 확인용)</li>
                  <li><strong>대출 원리금상환증명서</strong> (금융기관 발급)</li>
                </ol>
                <p>
                  다만 주택을 한 채라도 보유하게 되거나 세대원 중 누군가 주택을 취득하면 무주택 요건이 깨져 공제가 배제될 수 있습니다. 배우자·부모 등 세대원의 주택 보유 여부까지 함께 확인하는 것이 안전합니다.
                </p>
              </section>

              <h2 className="text-2xl font-bold mb-6">자주 묻는 질문</h2>
              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h3 className="text-lg font-semibold text-text-primary">관련 계산기 및 가이드</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link
                    href="/calculator/loan/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">대출이자 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">전세대출 원리금 상환액을 먼저 계산해보세요.</p>
                  </Link>
                  <Link
                    href="/guide/jeonse-loan-limit-interest-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">전세자금대출 한도·이자 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">한도 산정과 금리 구조를 함께 확인하세요.</p>
                  </Link>
                  <Link
                    href="/guide/monthly-rent-tax-credit-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">월세 세액공제 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">보증금 대출과 별개인 월세액 세액공제.</p>
                  </Link>
                  <Link
                    href="/guide/housing-subscription-savings-deduction-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">주택청약저축 소득공제 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">전세대출 공제와 합산 한도를 함께 계산하세요.</p>
                  </Link>
                  <Link
                    href="/guide/year-end-tax-settlement/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">연말정산 완벽 가이드</div>
                    <p className="mt-1 text-sm text-text-secondary">소득공제 준비물과 순서를 정리했습니다.</p>
                  </Link>
                  <Link
                    href="/category/tax/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">모든 세금 가이드</div>
                    <p className="mt-1 text-sm text-text-secondary">주택자금·연말정산 공제 모음.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 교육 목적으로 작성되었으며 개인 맞춤형 세무 조언이 아닙니다. 실제 공제 대상 여부, 요건(무주택·주택 규모·차입 시기), 합산 한도는 홈택스 연말정산 간소화 자료와 국세청에서 반드시 확인하세요. 근거 법조항은 <strong>소득세법 §52(특별소득공제)</strong>와 주택청약종합저축 소득공제(조세특례제한법 §87)입니다. 무주택 부부 각각 공제 확대안은 2026년 8월 3일 발표된 세제개편안(정부안) 기준으로, 국회 논의 과정에서 달라질 수 있습니다. 본 콘텐츠는 2026-08-24를 기준으로 작성됐으며, 세법 개정 시 업데이트됩니다. AI 보조 작성 후 운영자 검수 완료.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터</a>,{' '}
                  <a href="https://www.nts.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">국세청</a>,{' '}
                  <a href="https://www.moef.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">기획재정부</a>.
                </p>
              </section>

              <ShareButtons
                title="전세대출 원리금 소득공제 2026 가이드"
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
