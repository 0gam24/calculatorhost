// [revenue-lever: indexing+traffic]
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

const URL = 'https://calculatorhost.com/guide/minimum-wage-2027/';
const DATE_PUBLISHED = '2026-08-06';
const DATE_MODIFIED = '2026-08-06';

export const metadata: Metadata = {
  title: '2027 최저임금 10,700원, 월급·주휴수당·실수령액 계산',
  description:
    '2027년 최저시급은 10,700원으로 확정됐습니다. 2026년 대비 380원(3.7%) 인상, 주휴 포함 월급 2,236,300원. 주휴수당 계산법과 4대보험 공제 후 실수령액까지 정리했습니다.',
  keywords: [
    '2027 최저임금',
    '최저시급 10700원',
    '최저임금 월급',
    '주휴수당 계산',
    '최저임금 실수령액',
    '2027 최저시급 확정',
    '최저임금법 8조',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '2027 최저임금 10,700원 월급·주휴수당·실수령액' }],
    title: '2027 최저임금 10,700원, 월급·주휴수당·실수령액 계산',
    description: '2027년 최저시급 10,700원(3.7% 인상). 주휴 포함 월 2,236,300원, 실수령액 약 202만원. 주휴수당 계산법까지.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '2027 최저임금 10,700원 확정',
    description: '주휴 포함 월급 2,236,300원, 실수령액 약 202만원. 주휴수당·4대보험 공제 계산법.',
  },
};

const FAQ_ITEMS = [
  {
    question: '2027년 최저시급은 얼마인가요?',
    answer:
      '2027년 최저시급은 10,700원입니다. 2026년 10,320원보다 380원(3.7%) 오른 금액으로, 최저임금위원회가 2026년 7월 14일 의결했고 고용노동부 장관이 고시했습니다. 적용 시작일은 2027년 1월 1일이며, 업종과 관계없이 모든 사업장에 동일하게 적용됩니다(최저임금법 §6).',
  },
  {
    question: '주휴수당을 포함한 최저임금 월급은 얼마인가요?',
    answer:
      '주 40시간 근무 기준 월 2,236,300원입니다. 주휴시간을 포함한 월 소정근로시간 209시간에 시급 10,700원을 곱한 값입니다. 여기에는 세금과 4대보험이 아직 공제되지 않았으므로, 실제 통장에 들어오는 금액은 이보다 적습니다.',
  },
  {
    question: '주휴수당은 어떻게 계산하나요?',
    answer:
      '1주 소정근로시간이 40시간인 경우 8시간분의 유급휴일 수당이 주휴수당입니다. 주 40시간 미만이면 "1주 소정근로시간 ÷ 40 × 8 × 시급"으로 비례 계산합니다. 예를 들어 주 20시간 알바는 20 ÷ 40 × 8 = 4시간분, 즉 4 × 10,700 = 42,800원이 주휴수당입니다(근로기준법 §55).',
  },
  {
    question: '주휴수당을 받으려면 조건이 있나요?',
    answer:
      '있습니다. 1주 소정근로시간이 15시간 이상이고, 그 주의 소정근로일을 모두 개근해야 합니다. 주 15시간 미만 초단시간 근로자는 주휴수당 지급 대상이 아닙니다. 결근이 있으면 그 주의 주휴수당은 발생하지 않습니다.',
  },
  {
    question: '최저임금 월급의 실수령액은 얼마인가요?',
    answer:
      '세전 2,236,300원 기준 실수령액은 약 202만~203만원입니다. 국민연금·건강보험·장기요양·고용보험 등 4대보험 근로자 부담분 약 21만원이 빠지고, 부양가족·공제 상황에 따라 근로소득세는 0에 가깝습니다. 정확한 금액은 개인 상황과 2027년 확정 요율에 따라 달라집니다.',
  },
  {
    question: '수습기간에도 최저임금을 다 받나요?',
    answer:
      '원칙적으로 받습니다. 다만 1년 이상 근로계약을 체결하고 수습을 시작한 날부터 3개월 이내인 경우, 최저임금의 90%까지 감액할 수 있습니다(최저임금법 §5). 단순노무업무 종사자는 수습이라도 감액 없이 100%를 지급해야 합니다.',
  },
  {
    question: '최저임금보다 적게 주면 어떻게 되나요?',
    answer:
      '최저임금 미만으로 지급하는 계약은 그 부분이 무효이며, 무효가 된 부분은 최저임금액으로 지급한 것으로 봅니다(최저임금법 §6). 사용자는 3년 이하 징역 또는 2천만원 이하 벌금 대상이 될 수 있으므로, 미달분은 고용노동부에 진정·신고할 수 있습니다.',
  },
  {
    question: '최저임금에 포함되는 수당과 안 되는 수당은 무엇인가요?',
    answer:
      '매월 정기적으로 지급되는 기본급과 고정수당은 최저임금 산입에 포함됩니다. 반면 연장·야간·휴일근로 가산수당, 그리고 복리후생비·상여금 중 일정 비율은 산입에서 제외되거나 단계적으로만 포함됩니다. 정확한 산입 범위는 고용노동부의 최저임금 산입범위 고시를 확인하세요.',
  },
];

export default function MinimumWage2027Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '2027 최저임금 10,700원' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '2027 최저임금 10,700원, 월급·주휴수당·실수령액 완전 정리',
    description:
      '2027년 최저시급 10,700원(3.7% 인상) 기준 주휴 포함 월급 2,236,300원, 주휴수당 계산법, 4대보험 공제 후 실수령액, 수습·산입범위까지 정리한 가이드.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['2027 최저임금', '최저시급', '주휴수당', '실수령액', '최저임금법'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '2027 최저임금 10,700원',
    description: '2027년 최저시급 10,700원 기준 월급·주휴수당·실수령액 계산 가이드.',
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
                    { name: '2027 최저임금 10,700원' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">직장인·아르바이트 · 8분 읽기 · 2026-08-06</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  2027 최저임금 10,700원
                  <br />
                  <span className="text-2xl text-text-secondary">월급·주휴수당·실수령액 계산</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  이 가이드는 2027년부터 오르는 최저임금이 내 월급을 얼마나 바꾸는지 궁금한 직장인과 아르바이트 근로자를 위한 글입니다. 확정된 시급 10,700원을 기준으로 주휴수당 포함 월급, 4대보험을 뗀 실수령액, 그리고 주휴수당을 직접 계산하는 방법까지 단계별로 정리했습니다.
                </p>
              </header>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">2027년 최저시급은 얼마인가</h2>
                <p>
                  2027년 최저시급은 10,700원입니다. 2026년 10,320원보다 380원 올라 인상률은 3.7%입니다. 최저임금위원회가 2026년 7월 14일 전원회의에서 의결했고, 고용노동부 장관 고시를 거쳐 2027년 1월 1일부터 효력이 발생합니다(최저임금법 §8, §10).
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 2026년 대비 2027년 최저임금 (고용노동부 고시)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">구분</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">2026년</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">2027년</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">시급</td>
                        <td className="p-3">10,320원</td>
                        <td className="p-3"><strong>10,700원</strong></td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">인상액·인상률</td>
                        <td className="p-3">해당 없음</td>
                        <td className="p-3">+380원 (3.7%)</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">월 환산액(209시간)</td>
                        <td className="p-3">2,156,880원</td>
                        <td className="p-3"><strong>2,236,300원</strong></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  월 환산액은 주 40시간 근무에 유급 주휴시간을 더한 월 209시간을 기준으로 합니다. 10,700원 × 209시간 = 2,236,300원이 됩니다.
                </p>
                <p className="mt-4">
                  다만 이 금액은 세전 금액입니다. 실제 통장에 들어오는 돈은 4대보험과 세금을 뗀 뒤이므로, 아래 실수령액 섹션에서 다시 계산합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">주휴수당은 어떻게 계산하나</h2>
                <p>
                  주휴수당은 1주 동안 소정근로일을 개근한 근로자에게 주어지는 유급휴일 수당입니다(근로기준법 §55). 주 40시간을 채운 근로자는 하루치(8시간)에 해당하는 임금을 별도로 받습니다. 그래서 월급 계산에 쓰는 시간이 실제 근무한 174시간이 아니라 주휴를 더한 209시간이 되는 것입니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">주휴수당 기본 공식</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    주 40시간 이상: 8시간 × 시급
                    <br />
                    주 40시간 미만: (1주 소정근로시간 ÷ 40) × 8 × 시급
                  </p>
                </div>
                <p className="mt-4">
                  주휴수당을 받으려면 두 가지 조건을 모두 채워야 합니다. 첫째, 1주 소정근로시간이 15시간 이상일 것. 둘째, 그 주의 소정근로일을 개근할 것. 주 15시간 미만 초단시간 근로자는 대상이 아닙니다.
                </p>
                <p className="mt-4">
                  다만 결근한 주에는 그 주의 주휴수당이 발생하지 않습니다. 지각이나 조퇴는 개근으로 보지만, 하루라도 무단결근하면 그 주 주휴수당은 지급되지 않습니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">근무시간별 주급·주휴수당 계산 사례</h2>
                <p>
                  아래 세 가지 사례로 근무시간에 따른 주휴수당 차이를 확인해보겠습니다. 모두 2027년 시급 10,700원 기준입니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 1. 주 40시간 풀타임 (주휴 발생)</p>
                  <p className="text-sm text-text-secondary">
                    · 주 소정근로: 40시간 (하루 8시간 × 5일)
                    <br />
                    · 근로 임금: 40 × 10,700 = 428,000원
                    <br />
                    · 주휴수당: 8 × 10,700 = 85,600원
                    <br />
                    · 주급 합계: <strong>513,600원</strong>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 2. 주 20시간 알바 (주휴 발생)</p>
                  <p className="text-sm text-text-secondary">
                    · 주 소정근로: 20시간 (15시간 이상 → 주휴 대상)
                    <br />
                    · 근로 임금: 20 × 10,700 = 214,000원
                    <br />
                    · 주휴수당: (20 ÷ 40) × 8 × 10,700 = 42,800원
                    <br />
                    · 주급 합계: <strong>256,800원</strong>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 3. 주 14시간 초단시간 (주휴 없음)</p>
                  <p className="text-sm text-text-secondary">
                    · 주 소정근로: 14시간 (15시간 미만 → 주휴 대상 아님)
                    <br />
                    · 근로 임금: 14 × 10,700 = 149,800원
                    <br />
                    · 주휴수당: 0원
                    <br />
                    · 주급 합계: <strong>149,800원</strong>
                    <br />
                    <span className="text-xs text-text-tertiary">경계값: 주 15시간을 기준으로 주휴수당 발생 여부가 갈립니다.</span>
                  </p>
                </div>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">4대보험 공제 후 실수령액은</h2>
                <p>
                  세전 월급 2,236,300원에서 4대보험 근로자 부담분과 세금을 빼면 실수령액은 약 202만~203만원입니다. 아래는 2026년 요율을 기준으로 한 추정치입니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 2. 최저임금 월급 실수령액 추정 (세전 2,236,300원, 2026 요율 기준)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">항목</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">요율(근로자)</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">공제액(약)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">국민연금</td>
                        <td className="p-3">4.5%</td>
                        <td className="p-3">100,630원</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">건강보험</td>
                        <td className="p-3">3.545%</td>
                        <td className="p-3">79,280원</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">장기요양</td>
                        <td className="p-3">건보의 12.95%</td>
                        <td className="p-3">10,260원</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">고용보험</td>
                        <td className="p-3">0.9%</td>
                        <td className="p-3">20,130원</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">소득세·지방소득세</td>
                        <td className="p-3">간이세액표</td>
                        <td className="p-3">0원에 가까움</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  4대보험 합계는 약 21만원이며, 실수령액은 2,236,300 - 210,300 ≈ <strong>약 202만원</strong>입니다. 부양가족이 있거나 비과세 식대(월 20만원)가 적용되면 실수령액은 더 올라갑니다.
                </p>
                <p className="mt-4">
                  다만 2027년 국민연금·건강보험 요율은 아직 확정 전이므로 위 공제액은 추정치입니다. 국민연금 보험료율은 단계적 인상이 예정돼 있어 실제 공제액이 달라질 수 있습니다. 정확한 실수령액은 급여명세서와 확정 요율로 확인하세요.
                </p>
              </section>

              <section className="space-y-6 border-t border-border-base pt-8">
                <h2 className="text-2xl font-bold">수습·감액과 미달 지급 시 대응</h2>
                <p>
                  최저임금은 원칙적으로 모든 근로자에게 100% 적용됩니다. 다만 예외적으로 감액이 허용되는 경우와, 미달 지급 시 근로자가 취할 수 있는 조치를 정리합니다.
                </p>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li>
                    <strong>수습 감액:</strong> 1년 이상 근로계약을 맺고 수습 시작 후 3개월 이내라면 최저임금의 90%까지 감액할 수 있습니다(최저임금법 §5). 다만 단순노무 종사자는 수습이라도 감액이 금지됩니다.
                  </li>
                  <li>
                    <strong>미달 지급의 효력:</strong> 최저임금보다 적게 정한 계약은 그 부분이 무효이며, 무효가 된 부분은 최저임금액으로 지급한 것으로 봅니다(최저임금법 §6). 즉 계약서에 시급 1만원으로 적혀 있어도 법적으로는 10,700원을 청구할 수 있습니다.
                  </li>
                  <li>
                    <strong>신고·진정:</strong> 미달분은 관할 지방고용노동청에 진정·신고할 수 있습니다. 사용자는 3년 이하 징역 또는 2천만원 이하 벌금 대상이 될 수 있습니다.
                  </li>
                </ul>
                <p className="mt-4">
                  예외: 동거 친족만 사용하는 사업, 가사사용인 등은 최저임금법 적용에서 제외될 수 있으므로, 본인 상황이 애매하면 고용노동부 상담(국번 없이 1350)을 이용하세요.
                </p>
              </section>

              <h2 className="text-2xl font-bold mb-6">자주 묻는 질문</h2>
              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h3 className="text-lg font-semibold text-text-primary">관련 계산기 및 가이드</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link
                    href="/calculator/salary/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">연봉 실수령액 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">월급에서 4대보험·세금을 뗀 실수령액을 계산하세요.</p>
                  </Link>
                  <Link
                    href="/guide/weekly-holiday-allowance-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">주휴수당 완전 정리</div>
                    <p className="mt-1 text-sm text-text-secondary">주휴수당 발생 조건과 계산법을 자세히 배우세요.</p>
                  </Link>
                  <Link
                    href="/guide/four-major-insurance-rates-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">4대보험 요율 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">국민연금·건강보험·고용보험 근로자 부담률.</p>
                  </Link>
                  <Link
                    href="/guide/non-taxable-salary-allowances-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">비과세 급여 항목 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">식대·자가운전 등 실수령액을 높이는 비과세.</p>
                  </Link>
                  <Link
                    href="/guide/overtime-night-holiday-allowance-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">연장·야간·휴일수당</div>
                    <p className="mt-1 text-sm text-text-secondary">가산수당 1.5배 계산과 적용 기준.</p>
                  </Link>
                  <Link
                    href="/category/work/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">근로 계산기 모음</div>
                    <p className="mt-1 text-sm text-text-secondary">연봉·퇴직금·실수령액 관련 도구 전체.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 교육 목적으로 작성되었으며 개인 맞춤형 노무 조언이 아닙니다. 2027년 최저시급 10,700원은 고용노동부 고시 기준이며, 실수령액 계산에 쓰인 4대보험 요율은 2026년 기준 추정치로 2027년 확정 요율에 따라 달라질 수 있습니다. 주휴수당·수습 감액 등 개별 사안은 관할 지방고용노동청 또는 고용노동부 상담(1350)에서 확인하세요. 본 콘텐츠는 2026-08-06 기준으로 작성됐으며, 인용 법조항은 <strong>최저임금법 §5·§6·§8·§10, 근로기준법 §55</strong>입니다. AI 보조 작성 후 운영자 검수 완료.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.minimumwage.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">최저임금위원회</a>,{' '}
                  <a href="https://www.moel.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">고용노동부</a>,{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터</a>.
                </p>
              </section>

              <ShareButtons
                title="2027 최저임금 10,700원 월급·주휴수당·실수령액 가이드"
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
