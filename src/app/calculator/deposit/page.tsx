import type { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { Footer } from '@/components/layout/Footer';
import { AdSlot } from '@/components/ads/AdSlot';
import { StructuredSummary } from '@/components/calculator/StructuredSummary';
import { FaqSection } from '@/components/calculator/FaqSection';
import { RelatedCalculators } from '@/components/calculator/RelatedCalculators';
import {
  buildSoftwareApplicationJsonLd,
  buildFaqPageJsonLd,
  buildBreadcrumbJsonLd,
  buildSpeakableJsonLd,
  buildHowToJsonLd,
} from '@/lib/seo/jsonld';
import { DepositCalculator } from './DepositCalculator';
import { Breadcrumb } from '@/components/layout/Breadcrumb';

const URL = 'https://calculatorhost.com/calculator/deposit';

export const metadata: Metadata = {
  title: '정기예금 이자 계산기 2026 | 단리·복리·세후 | calculatorhost',
  description:
    '2026년 이자소득세 15.4% 반영 정기예금 계산기. 단리·월복리·일복리 방식별 세전·세후 이자와 만기 수령액을 즉시 비교. 비과세·세금우대 상품까지 반영.',
  alternates: { canonical: URL },
  openGraph: {
    title: '정기예금 이자 계산기 2026 — 단리·복리·세후 비교',
    description: '단리·월복리·일복리 방식별 세전·세후 이자와 만기 수령액을 즉시 비교.',
    url: URL,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '정기예금 이자 계산기 2026',
    description: '단리·월복리·일복리 방식별 세후 수령액을 즉시 비교 계산.',
  },
};

const FAQ_ITEMS = [
  {
    question: '정기예금과 적금의 차이는?',
    answer:
      '정기예금은 목돈을 한 번에 예치하고 만기일에 받는 상품이며, 적금은 정해진 금액을 매달 저축하다가 만기에 받는 상품입니다. 예금은 원금이 처음부터 전액 이자를 받지만, 적금은 각 월 납입분이 서로 다른 기간 동안 이자를 받습니다(소득세법 §129 이자소득). 예를 들어 동일한 연 3% 조건에서 천만원 12개월 계산 시, 예금은 단리 약 30만원, 적금(월 83만원 납입)은 단리 약 20.5만원의 이자를 받습니다.',
  },
  {
    question: '단리와 복리 중 뭐가 유리한가요?',
    answer:
      '복리는 "이자에 붙는 이자"를 계산하므로 항상 단리보다 이자가 더 많습니다. 기간과 이자율이 높을수록 그 차이가 커집니다. 예를 들어 천만원 12개월 3% 예금의 경우 단리는 약 30만원, 월복리는 약 30만 1천원, 일복리는 약 30만 2천원의 이자를 받으므로 복리가 약간 더 유리합니다. 다만 현재 예금시장에서는 대부분 단리를 기본으로 제공하므로, 상품 선택 시 은행에 계산 방식을 확인하세요.',
  },
  {
    question: '예금 이자소득세는 얼마나?',
    answer:
      '일반 정기예금의 이자소득세는 이자소득세 14% + 지방소득세(이자세의 10%) 1.4% = 합계 15.4%입니다(소득세법 §129). 예를 들어 세전 이자가 100만원이면 세금은 약 15만 4천원이므로 세후 이자는 약 84만 6천원입니다. 세금우대 상품은 9.5%(이자세 9% + 지방세 0.9%)가 적용되며, ISA나 청년도약계좌 등 특정 상품은 비과세입니다.',
  },
  {
    question: '비과세·세금우대는 어떻게 신청하나요?',
    answer:
      '세금우대 상품(조세특례제한법 §89의2)은 은행의 세금우대저축·세금우대종합저축 등으로 신청하며, 일정 소득 이하·가입 한도·최소 저축 기간 등 조건이 있습니다. ISA(개인종합자산관리계좌)와 청년도약계좌(조세특례제한법 §91)는 나이·소득·가입 기간 등 조건을 충족하면 비과세로 가입 가능합니다. 세금우대·비과세 자격이 있다면 은행에 해당 상품을 문의하고, 가입 조건을 반드시 확인하세요.',
  },
  {
    question: '연환산 세후 이자율은 무엇인가요?',
    answer:
      '연환산 세후 이자율은 실제 예치 기간과 무관하게 1년 기준으로 환산한 세후 수익률입니다. 예를 들어 6개월 예금의 세후 이자가 15만원이면, 12개월(1년) 동안 받을 수 있는 세후 이자는 약 30만원이므로 연환산 세후 이자율은 3% 정도가 됩니다. 이 지표를 사용하면 서로 다른 기간의 예금 상품들을 연 기준으로 비교할 수 있습니다.',
  },
  {
    question: '예금보다 더 유리한 운용법은?',
    answer:
      '현재 금리 상황에서 예금보다 더 높은 수익을 노리려면 (1) 여러 은행의 우대금리를 비교해 가장 높은 이자율 선택, (2) 세금우대·비과세 상품 활용으로 세후 수익 극대화, (3) 구조화 상품(ELS/DLS)으로 높은 수익률 추구(다만 손실 위험 증가), (4) 주식 적립식 펀드로 장기 성장 노리기, (5) 혼합 전략으로 예금+주식+채권 균형 배분 등을 고려할 수 있습니다. 그러나 높은 수익률은 높은 위험을 의미하므로, 개인의 재무 상황과 목표에 맞는 운용 계획을 세우거나 금융 전문가와 상담하세요.',
  },
] as const;

const RELATED = [
  { href: '/calculator/savings', title: '적금 이자', description: '월 납입금별 세후 수령액' },
  { href: '/calculator/loan', title: '대출이자', description: '상환방식별 월상환액' },
  { href: '/calculator/salary', title: '연봉 실수령액', description: '세후 월급' },
];

export default function DepositPage() {
  const softwareLd = buildSoftwareApplicationJsonLd({
    name: '정기예금 이자 계산기',
    description:
      '2026년 이자소득세 15.4% 반영 정기예금 계산기. 단리·월복리·일복리 방식별 세전·세후 이자와 만기 수령액을 즉시 비교.',
    url: URL,
  });
  const faqLd = buildFaqPageJsonLd(
    FAQ_ITEMS.map((f) => ({ question: f.question, answer: f.answer }))
  );
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '금융', url: 'https://calculatorhost.com/category/finance' },
    { name: '예금' },
  ]);
  const speakableLd = buildSpeakableJsonLd(['[data-speakable]']);
  const howtoLd = buildHowToJsonLd({
    name: '정기예금 이자 계산하기',
    description: '예치 원금, 연 이자율, 기간을 입력해 세후 만기 수령액을 계산하는 방법',
    steps: [
      { name: '예치 원금 입력', text: '정기예금에 예치할 목돈을 입력합니다.' },
      { name: '연 이자율 입력', text: '은행 또는 상품의 연 이자율(%)을 입력합니다.' },
      { name: '예치 기간 선택', text: '예금 예치 기간(개월)을 입력합니다.' },
      { name: '이자 방식 선택', text: '단리, 월복리, 또는 일복리 중 선택합니다.' },
      { name: '과세 방식 선택', text: '일반과세·세금우대·비과세 중 선택하면 즉시 계산됩니다.' },
    ],
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howtoLd) }}
      />

      <div className="min-h-screen bg-bg-base">
        <Header />
        <div className="flex">
          <Sidebar />
          <main className="flex-1 px-4 py-8 md:px-8">
            <div className="mx-auto flex max-w-4xl flex-col gap-8">
              {/* H1 + 리드 */}
              <header>
                <Breadcrumb
                  items={[
                    { name: '홈', href: '/' },
                    { name: '금융', href: '/category/finance/' },
                    { name: '정기예금 이자' },
                  ]}
                />
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  정기예금 이자 계산기 2026
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  목돈 예치금, 연 이자율, 예치 기간을 입력하면 단리·월복리·일복리 방식별 세전·세후
                  이자와 만기 수령액을 즉시 계산합니다. 이자소득세(일반과세 15.4%·세금우대
                  9.5%·비과세)를 실시간으로 반영합니다.
                </p>
              </header>

              {/* GEO/AEO Structured Summary */}
              <StructuredSummary
                definition="정기예금은 목돈을 은행에 예치하고 정해진 기간 후 원금과 이자를 받는 금융상품입니다. 이자는 단리(원금에만 붙는 이자), 월복리(매월 이자에 붙는 이자), 일복리(매일 이자에 붙는 이자)로 계산되며, 세후 수익률은 이자소득세(일반 15.4%, 세금우대 9.5%, 비과세)에 따라 달라집니다(소득세법 §129, 조세특례제한법 §89의2·§91)."
                table={{
                  caption: '세율 유형별 이자소득세',
                  headers: ['세율 유형', '세율'],
                  rows: [
                    ['일반과세', '15.4%'],
                    ['세금우대', '9.5%'],
                    ['비과세', '0%'],
                    ['단리 기초 (천만×12개월×3%)', '약 25.4만원'],
                  ],
                }}
                tldr={[
                  '단리: 이자 = 원금 × 연이율 × 기간(월)/12',
                  '월복리: 이자 = 원금 × (1+월이율)^개월 - 원금',
                  '일복리: 이자 = 원금 × (1+일이율)^일수 - 원금',
                  '이자소득세 = 세전이자 × 세율 (일반 15.4% / 세금우대 9.5% / 비과세 0%)',
                  '세후 수령액 = 원금 + (세전이자 - 세금)',
                ]}
              />

              <AdSlot slot="deposit-top" format="horizontal" />

              {/* 계산기 */}
              <DepositCalculator />

              {/* FAQ (중간 배치 - GEO 권장) */}
              <FaqSection items={[...FAQ_ITEMS]} />

              {/* 정기예금이란 무엇인가 */}
              <section aria-label="정기예금 개념" className="card">
                <h2 className="mb-4 text-2xl font-semibold">정기예금이란 무엇인가요?</h2>
                <p className="mb-4 text-text-secondary">
                  정기예금은 목돈을 은행이나 저축은행에 일정 기간 동안 예치하고, 만기일에 원금과
                  이자를 받는 금융상품입니다. 예금자보호법에 따라 1인당 5천만원까지 보호되므로, 안전한
                  자산 운용 방법입니다. 예치 기간 중에는 이자율이 고정되어 있어 예측 가능한 수익을
                  얻을 수 있습니다(금융감독원 금융상식 기준).
                </p>
                <p className="mb-4 text-text-secondary">
                  정기예금은 적금과 다릅니다. 적금은 정해진 금액을 매달 저축하다가 만기에 받는 상품인
                  반면, 예금은 목돈을 한 번에 예치하는 상품입니다. 따라서 같은 이자율이라도 예금이
                  더 많은 이자를 받을 수 있습니다. 예를 들어, 천만원을 12개월 동안 연 3%로 운용할 때,
                  예금은 약 30만원의 이자를 받지만, 월 83만원씩 납입하는 적금은 약 20만원의 이자를
                  받습니다(단리 기준).
                </p>
                <p className="text-text-secondary">
                  정기예금 이자에는 세금이 부과됩니다. 일반 정기예금은 이자소득세 14% + 지방소득세
                  1.4% = 15.4%가 적용되며, 세금우대 상품은 9.5%, ISA나 청년도약계좌 등 특정 상품은
                  비과세입니다. 실제 수익률은 세금을 고려하여 계산해야 합니다. 세금우대 상품의 경우
                  가입 조건(연소득, 나이, 거주지 등)이 있으므로 은행에 확인 후 신청하세요.
                </p>
              </section>

              {/* 단리 vs 월복리 vs 일복리 */}
              <section aria-label="이자 방식 비교" className="card">
                <h2 className="mb-4 text-2xl font-semibold">단리 vs 월복리 vs 일복리</h2>
                <p className="mb-4 text-text-secondary">
                  예금 이자 계산 방식에는 단리, 월복리, 일복리 3가지가 있습니다. 각각의 특징과 차이를
                  이해하면 더 유리한 상품을 선택할 수 있습니다.
                </p>
                <div className="overflow-x-auto mb-4">
                  <table className="w-full text-sm">
                    <caption className="sr-only">단리, 월복리, 일복리 비교</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="px-4 py-3 text-left font-semibold text-text-secondary">
                          구분
                        </th>
                        <th scope="col" className="px-4 py-3 text-left font-semibold text-text-secondary">
                          단리
                        </th>
                        <th scope="col" className="px-4 py-3 text-left font-semibold text-text-secondary">
                          월복리
                        </th>
                        <th scope="col" className="px-4 py-3 text-left font-semibold text-text-secondary">
                          일복리
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-subtle">
                        <td className="px-4 py-3 font-medium">정의</td>
                        <td className="px-4 py-3 text-text-secondary">원금에만 이자 적용</td>
                        <td className="px-4 py-3 text-text-secondary">매월 이자에 이자 적용</td>
                        <td className="px-4 py-3 text-text-secondary">매일 이자에 이자 적용</td>
                      </tr>
                      <tr className="border-b border-border-subtle">
                        <td className="px-4 py-3 font-medium">계산식</td>
                        <td className="px-4 py-3 text-text-secondary text-xs font-mono">
                          P × r × t
                        </td>
                        <td className="px-4 py-3 text-text-secondary text-xs font-mono">
                          P × (1+r)^n
                        </td>
                        <td className="px-4 py-3 text-text-secondary text-xs font-mono">
                          P × (1+r)^d
                        </td>
                      </tr>
                      <tr className="border-b border-border-subtle">
                        <td className="px-4 py-3 font-medium">이자 규모</td>
                        <td className="px-4 py-3 text-text-secondary">상대적 낮음</td>
                        <td className="px-4 py-3 text-text-secondary">중간</td>
                        <td className="px-4 py-3 text-text-secondary">상대적 높음</td>
                      </tr>
                      <tr className="border-b border-border-subtle">
                        <td className="px-4 py-3 font-medium">차이 크기</td>
                        <td colSpan={3} className="px-4 py-3 text-text-secondary">
                          기간과 이율이 클수록 차이 증가 (예: 12개월 3% 천만원 = 30만 → 30.1 → 30.2만)
                        </td>
                      </tr>
                      <tr className="border-b border-border-subtle">
                        <td className="px-4 py-3 font-medium">시장 현황</td>
                        <td className="px-4 py-3 text-text-secondary">가장 일반적</td>
                        <td className="px-4 py-3 text-text-secondary">일부 상품</td>
                        <td className="px-4 py-3 text-text-secondary">드문 편</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-text-secondary">
                  <strong>결론:</strong> 복리(월복리, 일복리)가 단리보다 더 유리하지만, 그 차이는
                  상품과 조건에 따라 다릅니다. 현재 대부분의 정기예금은 단리를 기본으로 하며, 일부 고급
                  상품에서만 월복리나 일복리 옵션을 제공합니다. 예금 신청 시 은행에 계산 방식을 꼭
                  확인하세요.
                </p>
              </section>

              {/* 이자소득세 방식 */}
              <section aria-label="이자소득세" className="card">
                <h2 className="mb-4 text-2xl font-semibold">이자소득세 3가지 방식</h2>
                <div className="space-y-4">
                  <div className="rounded-lg border border-border-subtle p-4">
                    <h3 className="font-semibold text-text-primary mb-2">1) 일반과세 (15.4%)</h3>
                    <p className="text-sm text-text-secondary mb-2">
                      대부분의 일반 정기예금이 해당합니다. 이자소득세 14% + 지방소득세(이자세의 10%)
                      1.4% = 15.4%가 적용됩니다(소득세법 §129, 지방세법).
                    </p>
                    <p className="text-caption text-text-tertiary">
                      예: 이자 100만원 → 세금 15.4만원 → 세후 84.6만원
                    </p>
                  </div>
                  <div className="rounded-lg border border-border-subtle p-4">
                    <h3 className="font-semibold text-text-primary mb-2">2) 세금우대 (9.5%)</h3>
                    <p className="text-sm text-text-secondary mb-2">
                      세금우대 종합저축, 세금우대저축(조세특례제한법 §89의2) 등 특정 상품입니다.
                      이자소득세 9% + 지방소득세 0.9% = 9.5%가 적용됩니다. 단, 일정 소득 이하·가입
                      한도·최소 기간 등 조건이 있습니다.
                    </p>
                    <p className="text-caption text-text-tertiary">
                      예: 이자 100만원 → 세금 9.5만원 → 세후 90.5만원
                    </p>
                  </div>
                  <div className="rounded-lg border border-border-subtle p-4">
                    <h3 className="font-semibold text-text-primary mb-2">3) 비과세 (0%)</h3>
                    <p className="text-sm text-text-secondary mb-2">
                      ISA(개인종합자산관리계좌), 청년도약계좌 등 정부 지원 상품입니다(조세특례제한법
                      §91 등). 이자소득세가 전혀 부과되지 않습니다. 가입 조건과 한도가 제한적입니다.
                    </p>
                    <p className="text-caption text-text-tertiary">
                      예: 이자 100만원 → 세금 0원 → 세후 100만원
                    </p>
                  </div>
                </div>
              </section>

              {/* 정기예금 vs 적금 */}
              <section aria-label="정기예금 vs 적금" className="card">
                <h2 className="mb-4 text-2xl font-semibold">정기예금 vs 적금 비교</h2>
                <p className="mb-4 text-text-secondary">
                  정기예금과 적금은 모두 은행 저축 상품이지만, 입금 방식과 이자 계산에 차이가
                  있습니다. 각 상품의 특징을 이해하면 자신의 상황에 맞는 상품을 선택할 수 있습니다.
                </p>
                <div className="overflow-x-auto mb-4">
                  <table className="w-full text-sm">
                    <caption className="sr-only">정기예금과 적금 비교</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="px-4 py-3 text-left font-semibold text-text-secondary">
                          항목
                        </th>
                        <th scope="col" className="px-4 py-3 text-left font-semibold text-text-secondary">
                          정기예금
                        </th>
                        <th scope="col" className="px-4 py-3 text-left font-semibold text-text-secondary">
                          적금
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-subtle">
                        <td className="px-4 py-3 font-medium">입금 방식</td>
                        <td className="px-4 py-3 text-text-secondary">목돈 한 번에 입금</td>
                        <td className="px-4 py-3 text-text-secondary">정해진 금액을 매달 입금</td>
                      </tr>
                      <tr className="border-b border-border-subtle">
                        <td className="px-4 py-3 font-medium">이자 계산</td>
                        <td className="px-4 py-3 text-text-secondary">전액이 처음부터 이자 발생</td>
                        <td className="px-4 py-3 text-text-secondary">각 월 납입분이 다른 기간에 이자 발생</td>
                      </tr>
                      <tr className="border-b border-border-subtle">
                        <td className="px-4 py-3 font-medium">이자 규모</td>
                        <td className="px-4 py-3 text-text-secondary">
                          같은 금액이면 더 많음
                        </td>
                        <td className="px-4 py-3 text-text-secondary">예금보다 적은 편</td>
                      </tr>
                      <tr className="border-b border-border-subtle">
                        <td className="px-4 py-3 font-medium">가입 용도</td>
                        <td className="px-4 py-3 text-text-secondary">목돈 안전 운용</td>
                        <td className="px-4 py-3 text-text-secondary">규칙적 저축 습관 형성</td>
                      </tr>
                      <tr className="border-b border-border-subtle">
                        <td className="px-4 py-3 font-medium">예시</td>
                        <td className="px-4 py-3 text-text-secondary">천만원 12개월 3% = 약 30만원</td>
                        <td className="px-4 py-3 text-text-secondary">월 83만 12개월 3% = 약 20.5만원</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-text-secondary">
                  <strong>선택 기준:</strong> 정기예금은 목돈이 있거나 한 번에 큰 금액을 저축하고 싶을
                  때, 적금은 월급의 일부를 꾸준히 저축하고 싶을 때 적합합니다. 상황에 따라 둘을
                  혼합해서 활용할 수도 있습니다.
                </p>
              </section>

              {/* 주의사항 */}
              <section aria-label="주의사항" className="card">
                <h2 className="mb-3 text-2xl font-semibold">주의사항</h2>
                <ul className="list-disc space-y-2 pl-5 text-sm text-text-secondary">
                  <li>
                    본 계산기는 표준 단리·월복리·일복리 공식을 기반으로 하며, 실제 정기예금 상품은
                    은행별로 우대금리·선택형 상품·특판 상품 등이 다를 수 있습니다. 정확한 이자는
                    예금 신청 전 은행에 확인하세요.
                  </li>
                  <li>
                    중도해지 시 약정 이자율이 아닌 대폭 낮은 중도해지 이율이 적용되며, 위약금이
                    발생할 수 있습니다. 예정 기간까지 유지할 수 있을 때 예금에 가입하세요.
                  </li>
                  <li>
                    세금우대 상품은 가입 조건(연소득 한도, 나이, 거주지, 총 가입액 한도 등)이
                    있습니다. 조건을 충족하지 않으면 일반과세(15.4%)가 소급적용됩니다.
                  </li>
                  <li>
                    ISA나 청년도약계좌의 비과세는 일정 기간 보유 등 조건에 따라 달라질 수 있습니다.
                    가입 전 금융기관에 전체 조건과 제한사항을 확인하세요.
                  </li>
                  <li>
                    본 계산기는 교육·참고용 도구이며, 개인의 최종 투자 결정을 대체하지 않습니다.
                    실제 예금은 금융기관의 정보공시서와 상품설명서를 확인한 후 가입하세요.
                  </li>
                  <li>
                    실제 일복리 상품은 드물며, 대부분의 정기예금은 단리 또는 월복리만 제공합니다.
                    이 계산기의 일복리는 일일 복리 공식의 근사치(월 × 30.4167일)입니다.
                  </li>
                </ul>
              </section>

              {/* 계산 공식 */}
              <section aria-label="계산 공식" className="card">
                <h2 className="mb-4 text-2xl font-semibold">계산 공식</h2>
                <ol className="space-y-4 text-sm leading-relaxed">
                  <li>
                    <strong>단리 정기예금</strong>
                    <p className="mt-1 text-text-secondary font-mono text-xs bg-bg-raised p-3 rounded">
                      세전 이자 = 원금 × (연이자율 ÷ 100) × 개월 ÷ 12
                    </p>
                    <p className="mt-2 text-text-secondary">
                      원금 전체가 처음부터 끝까지 이자를 받습니다. 예를 들어 천만원을 12개월 동안 연
                      3%로 예치하면 이자는 천만원 × 0.03 × 12÷12 = 30만원입니다(소득세법 §14, §129).
                    </p>
                  </li>
                  <li>
                    <strong>월복리 정기예금</strong>
                    <p className="mt-1 text-text-secondary font-mono text-xs bg-bg-raised p-3 rounded">
                      월이자율 r = 연이자율 ÷ 100 ÷ 12<br />
                      만기원리금 = 원금 × (1+r)^n<br />
                      세전 이자 = 만기원리금 − 원금
                    </p>
                    <p className="mt-2 text-text-secondary">
                      매월 붙은 이자에 다시 이자가 붙습니다. r = 0인 경우 이자는 0입니다. 예: 천만원 12개월
                      3% → (1+0.03/12)^12 - 1 = 약 3.04% → 약 30만원 이자.
                    </p>
                  </li>
                  <li>
                    <strong>일복리 정기예금 (근사)</strong>
                    <p className="mt-1 text-text-secondary font-mono text-xs bg-bg-raised p-3 rounded">
                      일이자율 r = 연이자율 ÷ 100 ÷ 365<br />
                      총일수 d = 개월 × 30.4167<br />
                      만기원리금 = 원금 × (1+r)^d<br />
                      세전 이자 = 만기원리금 − 원금
                    </p>
                    <p className="mt-2 text-text-secondary">
                      매일 붙은 이자에 이자가 붙습니다. 월 × 30.4167은 월 평균 일수(연 365일 ÷ 12)를 사용한
                      근사치입니다. 실제 일복리 상품은 거의 없으므로 참고만 하세요.
                    </p>
                  </li>
                  <li>
                    <strong>이자소득세 계산</strong>
                    <p className="mt-1 text-text-secondary font-mono text-xs bg-bg-raised p-3 rounded">
                      세금 = 세전 이자 × 세율 (일반 15.4% / 세금우대 9.5% / 비과세 0%)<br />
                      세후 이자 = 세전 이자 - 세금<br />
                      세후 수령액 = 원금 + 세후 이자
                    </p>
                    <p className="mt-2 text-text-secondary">
                      모든 계산 결과는 10원 단위로 절사합니다(세금 표준 처리). 예: 15.49만원 → 15.4만원.
                    </p>
                  </li>
                  <li>
                    <strong>연환산 세후 이자율</strong>
                    <p className="mt-1 text-text-secondary font-mono text-xs bg-bg-raised p-3 rounded">
                      연환산 세후 이자율 (%) = (세후이자 ÷ 원금) × (12 ÷ 개월) × 100
                    </p>
                    <p className="mt-2 text-text-secondary">
                      실제 예치 기간과 무관하게 1년 기준으로 환산한 세후 수익률입니다. 예: 6개월 예금의 세후
                      이자가 15만원이면 연환산 이자율은 약 3% 입니다.
                    </p>
                  </li>
                </ol>
              </section>

              {/* 활용 팁 */}
              <section aria-label="활용 팁" className="card">
                <h2 className="mb-3 text-2xl font-semibold">활용 팁</h2>
                <ul className="space-y-3 text-sm text-text-secondary">
                  <li>
                    <strong>단리 vs 월복리 vs 일복리 비교</strong>: 본 계산기로 동일 조건에서 3가지
                    방식을 비교하여, 상품별로 어떤 방식이 적용되는지 파악하고 선택하세요.
                  </li>
                  <li>
                    <strong>이자율 비교</strong>: 여러 은행의 이자율을 입력해 비교하세요. 0.1~0.5%의
                    차이도 고액 예금에서는 수십만원 차이가 납니다.
                  </li>
                  <li>
                    <strong>기간별 계산</strong>: 3개월, 6개월, 12개월, 24개월, 36개월 등 다양한 기간으로
                    계산해 유동성과 수익률을 균형있게 계획하세요.
                  </li>
                  <li>
                    <strong>금액별 계산</strong>: 1백만원, 1천만원, 1억원 등으로 변경해가며 목표 금액에
                    따른 이자를 확인하세요.
                  </li>
                  <li>
                    <strong>세금 검토</strong>: 세금우대·비과세 상품 자격이 있다면 세전·세후 이자 차이를
                    비교해 최적의 상품을 선택하세요. 예: 일반(15.4%)과 세금우대(9.5%) = 약 6% 수익률
                    향상.
                  </li>
                  <li>
                    <strong>목표 금액 역산</strong>: 목표 수령액이 있다면, 원금과 이자율을 변경해가며
                    필요한 예치 금액과 기간을 역산할 수 있습니다.
                  </li>
                  <li>
                    <strong>분할 예치</strong>: 큰 금액은 여러 은행으로 분할 예치해 예금자보호(1인당
                    5천만원)를 최대화할 수 있습니다.
                  </li>
                </ul>
              </section>

              {/* 관련 계산기 */}
              <RelatedCalculators items={RELATED} />

              {/* 업데이트 로그 */}
              <section aria-label="업데이트" className="card">
                <h2 className="mb-2 text-lg font-semibold">업데이트</h2>
                <ul className="text-sm text-text-secondary">
                  <li>2026-04-24: 초판 공개 (단리·월복리·일복리·일반과세·세금우대·비과세 지원)</li>
                </ul>
              </section>

              {/* 출처·면책 */}
              <section
                aria-label="출처 및 면책"
                className="rounded-lg border border-border-base p-4 text-caption text-text-tertiary"
              >
                <p className="mb-2">
                  <strong>법적 근거</strong>: 소득세법 §14(이자소득), §129(이자소득세), 조세특례제한법
                  §89의2(세금우대종합저축), §91(비과세 저축성 보험료·ISA 등), <a href="https://www.bok.or.kr" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-600 hover:underline dark:text-primary-500">한국은행</a>, <a href="https://finlife.fss.or.kr" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-600 hover:underline dark:text-primary-500">금감원 금융상품 한눈에</a>.
                </p>
                <p>
                  본 계산기의 결과는 교육·참고용이며 법적 효력이 없습니다. 실제 정기예금은 은행별로
                  우대금리·수수료·계산 방식이 상이하므로 예금 신청 전 금융기관에 정확한 이자를 확인하시기
                  바랍니다. 중도해지 시 이율과 위약금은 계산에 포함되지 않습니다.
                </p>
              </section>

            </div>
          </main>
        </div>
        <Footer />
      </div>
    </>
  );
}
