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

const URL = 'https://calculatorhost.com/guide/burden-gift-debt-assumption-tax/';
const DATE_PUBLISHED = '2026-05-12';
const DATE_MODIFIED = '2026-05-12';

export const metadata: Metadata = {
  title: '부담부증여 양도+증여세 완벽 정리 2026 | 채무인수 가족 간 부동산',
  description:
    '부담부증여 분리 계산식·채무인수액은 양도세·무상분은 증여세·합리적 절세 효과·전세보증금·은행대출 입증·함정 5가지·신고 방법.',
  keywords: [
    '부담부증여',
    '채무인수 증여세',
    '전세보증금 부담부증여',
    '부담부증여 양도세',
    '부담부증여 세금',
    '채무인수액 계산',
    '증여세 절세',
    '부동산 부담부증여',
    '가족 간 채무 입증',
    '2026 부담부증여',
  ],
  alternates: { canonical: URL },
  openGraph: {
    title: '부담부증여 양도+증여세 완벽 정리 2026',
    description: '부담부증여 분리 계산식·채무인수 양도세·무상분 증여세·절세 시뮬·함정 5가지.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '부담부증여 양도+증여세 완벽 정리 2026',
    description: '자산 10억+채무 4억 부담부증여 → 증여 1.05억+양도 0.5억 = 1.55억 세금. 전세보증금·대출 입증.',
  },
};

const FAQ_ITEMS = [
  {
    question: '부담부증여란 정확히 무엇인가요?',
    answer:
      '채무를 안고 자산을 무상 이전하는 것입니다. 예를 들어 전세보증금 4억이 걸린 주택 10억을 아들에게 넘길 때, 아들이 4억 채무를 인수하고 나머지 6억은 무상으로 받는 경우입니다(상증법 §47 ②). 채무인수액(4억)은 양도세, 무상분(6억)은 증여세로 분리 과세되므로 전체 증여보다 절세 효과가 있습니다.',
  },
  {
    question: '부담부증여에서 양도세와 증여세가 동시에 발생하나요?',
    answer:
      '네. 상증법 §47 ②에 의해 채무인수액은 양도 거래로 보아 양도세가 발생하고, 나머지 무상분은 증여세 대상입니다. 예: 자산 10억 + 채무 4억 부담부증여 시 증여세는 무상분 6억 기준으로, 양도세는 채무인수액 4억 기준으로 각각 계산됩니다. 따라서 계산이 복잡하며 세무사 상담이 권장됩니다.',
  },
  {
    question: '전세보증금 부담부증여와 일반 증여는 세금이 얼마나 다른가요?',
    answer:
      '큰 차이가 있습니다. 자산 10억 + 전세보증금 4억을 성년 자녀에게 넘기는 경우(취득가 8억, 보유 3년 가정), 부담부증여는 증여세(무상분 6억 → 5천 공제 후) 약 1.05억 + 양도세(채무인수 4억, 양도차익 1,920만) 약 125만 = 약 1.06억. 반면 전체 10억을 증여하면 (5천 공제 후 9.5억) 약 2.25억 증여세가 발생합니다. 부담부증여로 약 1.19억 절세 효과(취득가·보유 기간·중과 적용 여부에 따라 변동).',
  },
  {
    question: '가족 간 채무 인수를 입증하지 못하면 어떻게 되나요?',
    answer:
      '국세청이 전체 자산을 증여로 재과세할 수 있습니다. 채무 변제 기원을 입증하지 못하면 "실제로는 채무 없이 10억을 증여한 것"으로 보아 가산세까지 부과됩니다(국세기본법 §47). 반드시 채무 증명(임대차계약서·송금 내역·대출 약정서·통장 기록)을 보관해야 합니다.',
  },
  {
    question: '부담부증여 후 채무를 수증자가 변제하지 않으면 문제가 되나요?',
    answer:
      '부담부증여 계약 후 수증자가 채무를 변제하지 않으면 증여자가 책임질 수 있습니다. 법률상 채무인수 효력이 인정되려면 채권자 동의·통지 또는 채무자-수증자 간 직접 합의가 필요합니다(민법 §469). 전세보증금의 경우 임차인 동의, 은행 대출의 경우 차용증 변경이 필수입니다. 이를 위반하면 세무상 부담부증여 인정이 무효화될 수 있습니다.',
  },
];

export default function BurdenGiftDebtAssumptionTaxGuide() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '부담부증여 양도+증여세 완벽 정리' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '부담부증여 양도+증여세 완벽 정리 2026',
    description:
      '부담부증여 분리 계산식·채무인수액은 양도세·무상분은 증여세·절세 효과·전세보증금·은행대출 입증·함정 5가지·신고 절차.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    type: 'Article',
    keywords: ['부담부증여', '양도세', '증여세', '채무인수', '절세'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '부담부증여 양도+증여세 완벽 정리 2026',
    description: '부담부증여 분리 계산·채무인수 양도세·무상분 증여세·입증·함정 5가지.',
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
                    { name: '부담부증여 양도+증여세 완벽 정리' },
                  ]}
                />
                <h1 className="mt-4 text-3xl font-bold text-text-primary md:text-4xl">
                  부담부증여 양도+증여세 완벽 정리 2026
                </h1>
                <p className="mt-3 text-lg text-text-secondary" data-speakable>
                  부동산을 가족에게 넘길 때 그에 딸린 전세보증금이나 대출금까지 함께 넘기는 경우가 있습니다.
                  이를 <strong>부담부증여</strong>라 하는데, 단순 증여보다 세금을 크게 줄일 수 있습니다.
                  채무인수액은 양도세, 무상분은 증여세로 분리 과세되기 때문입니다(상증법 §47 ②). 계산식부터 함정 5가지,
                  입증 방법까지 정확히 정리합니다.
                </p>
              </header>

              <AdSlot slot="guide-burden-top" format="horizontal" />

              {/* 1. 정의 */}
              <section aria-label="부담부증여 정의" className="card">
                <h2 className="mb-4 text-2xl font-semibold">부담부증여란?</h2>
                <p className="mb-3 text-text-secondary" data-speakable>
                  부담부증여는 채무와 함께 자산을 무상 이전하는 거래입니다. 예를 들어 아버지가 소유한 주택에 4억의
                  전세보증금이 걸려있고 주택 자체의 가치가 10억일 때, 이 주택과 채무를 함께 아들에게 넘기는 경우입니다.
                  법률상으로는 <strong>채무인수액(채무)과 증여재산(자산 − 채무)을 분리</strong>하여 과세합니다(상증법 §47 ②).
                  결과적으로 전체 10억을 증여하는 것보다 세 부담이 줄어듭니다.
                </p>
                <div className="rounded-lg bg-bg-card p-4 text-sm text-text-secondary">
                  <p className="mb-2">
                    <strong className="text-text-primary">부담부증여 핵심 원리</strong>
                  </p>
                  <p>
                    자산가액 10억 − 채무 4억 = 증여재산 6억 (증여세 대상) + 양도가액 4억 (양도세 대상). 채무인수액은
                    증여자가 수증자에게 "판매"한 것으로 간주되어 양도세가 붙고, 나머지 무상분만 증여세가 발생합니다.
                  </p>
                </div>
              </section>

              {/* 2. 분리 계산식 */}
              <section aria-label="분리 계산식" className="card border-l-4 border-l-primary-500">
                <h2 className="mb-4 text-2xl font-semibold">부담부증여 세금 분리 계산식</h2>
                <p className="mb-4 text-text-secondary" data-speakable>
                  부담부증여에서는 <strong>증여 부분과 양도 부분</strong>을 각각 따로 계산합니다. 같은 거래이지만 세법상
                  두 가지 세금이 동시에 발생하므로 단계별 계산이 필수입니다.
                </p>

                <div className="mb-6 space-y-3 rounded-lg bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">1단계: 증여재산가액 산출</p>
                  <div className="text-sm text-text-secondary">
                    <p className="mb-1">증여재산가액 = 자산가액 − 채무인수액</p>
                    <p className="text-xs text-text-tertiary">예: 주택 10억 − 전세보증금 4억 = 증여 6억</p>
                  </div>
                </div>

                <div className="mb-6 space-y-3 rounded-lg bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">2단계: 증여세 계산</p>
                  <div className="text-sm text-text-secondary">
                    <p className="mb-2">증여세 = (증여재산가액 − 공제액) × 세율</p>
                    <ul className="list-inside list-disc space-y-1">
                      <li>공제액: 직계비속 5천만원 (10년 단위)</li>
                      <li>예: (6억 − 5천만) × 20% = 1.05억</li>
                    </ul>
                  </div>
                </div>

                <div className="mb-6 space-y-3 rounded-lg bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">3단계: 양도차익 산출</p>
                  <div className="text-sm text-text-secondary">
                    <p className="mb-2">양도차익 = 양도가액 − 취득가 (비례배분) − 경비</p>
                    <ul className="list-inside list-disc space-y-1">
                      <li>양도가액 = 채무인수액 (4억)</li>
                      <li>취득가 비례분 = 전체 취득가 × (채무인수액 / 자산가액)</li>
                      <li>예: 취득가 8억 → 비례분 3.2억 / 양도차익 = 4억 − 3.2억 − 2천만 = 1,600만원</li>
                    </ul>
                  </div>
                </div>

                <div className="space-y-3 rounded-lg bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">4단계: 양도세 계산</p>
                  <div className="text-sm text-text-secondary">
                    <p className="mb-2">양도세 = 양도차익 × 세율 (1세대1주택 공제 적용 가능)</p>
                    <ul className="list-inside list-disc space-y-1">
                      <li>양도차익 1.6억 × 15% (누진세) = 약 2,400만원 (공제 제외)</li>
                      <li>1세대1주택이면 장기보유특별공제 적용 가능</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* 3. 실제 시뮬레이션 */}
              <section aria-label="실제 시뮬레이션" className="card">
                <h2 className="mb-4 text-2xl font-semibold">실제 사례 — 자산 10억+채무 4억 부담부증여</h2>

                <div className="mb-6 rounded-lg bg-bg-card p-4">
                  <p className="mb-3 font-semibold text-text-primary">조건</p>
                  <ul className="list-inside list-disc space-y-1 text-sm text-text-secondary">
                    <li>주택 자산 가액: 10억원</li>
                    <li>전세보증금 채무: 4억원</li>
                    <li>취득가: 8억원 (3년 전)</li>
                    <li>경비: 2,000만원</li>
                    <li>수증자: 성년 직계비속</li>
                  </ul>
                </div>

                <div className="mb-6 space-y-4">
                  <div className="rounded-lg bg-primary-500/10 p-4">
                    <p className="mb-2 font-semibold text-text-primary">증여세 계산</p>
                    <div className="text-sm text-text-secondary">
                      <p className="mb-1">증여재산 = 10억 − 4억 = 6억</p>
                      <p className="mb-1">공제 = 5,000만원 (직계비속)</p>
                      <p className="mb-1">과세 증여재산 = 5.5억</p>
                      <p className="mb-1">세율 20% (5억 초과 구간) → 누진공제 1천만</p>
                      <p className="font-semibold text-primary-600">증여세 = 5.5억 × 20% − 1,000만 = 약 1.05억</p>
                    </div>
                  </div>

                  <div className="rounded-lg bg-danger-500/10 p-4">
                    <p className="mb-2 font-semibold text-text-primary">양도세 계산 (3년 보유 가정)</p>
                    <div className="text-sm text-text-secondary">
                      <p className="mb-1">양도가액(채무인수액) = 4억</p>
                      <p className="mb-1">취득가 비례분 = 8억 × (4억 / 10억) = 3.2억</p>
                      <p className="mb-1">경비 비례분 = 2,000만 × (4억 / 10억) = 800만</p>
                      <p className="mb-1">양도차익 = 4억 − 3.2억 − 800만 = 1,920만</p>
                      <p className="mb-1">기본공제 250만(소득세법 §103) → 과세표준 1,670만</p>
                      <p className="font-semibold text-danger-500">양도세 ≈ 1,670만 × 15% − 누진공제 126만 ≈ 125만 (지방소득세 별도)</p>
                    </div>
                  </div>

                  <div className="rounded-lg border-2 border-primary-500 p-4">
                    <p className="mb-1 font-semibold text-text-primary">총 세금 부담</p>
                    <p className="text-sm text-text-secondary">
                      증여세 약 1.05억 + 양도세 약 125만 = <strong className="text-primary-600">약 1.06억</strong>
                    </p>
                    <p className="mt-2 text-xs text-text-tertiary">
                      참고: 전체 10억을 자녀 증여 시 (5천만 공제 후 9.5억 과세) 증여세 ≈ 9.5억 × 30% − 6,000만 ≈ 약 2.25억.
                      부담부증여로 약 1.19억 절세 효과(취득가·보유 기간·중과 적용 여부에 따라 달라짐).
                    </p>
                  </div>
                </div>
              </section>

              <AdSlot slot="guide-burden-mid" format="rectangle" />

              {/* 4. 채무 입증 — 전세보증금·은행대출 */}
              <section aria-label="채무 입증" className="card">
                <h2 className="mb-4 text-2xl font-semibold">채무 인수 입증 — 전세보증금과 은행대출</h2>
                <p className="mb-4 text-text-secondary" data-speakable>
                  부담부증여의 가장 중요한 요소는 <strong>채무가 실제로 존재하고 수증자가 이를 인수했음을 입증</strong>하는
                  것입니다. 입증이 실패하면 국세청이 전체를 증여로 재과세하고 가산세를 부과합니다(국세기본법 §47).
                </p>

                <div className="mb-6 rounded-lg bg-bg-card p-4">
                  <p className="mb-3 font-semibold text-text-primary">전세보증금 입증 자료</p>
                  <ul className="list-inside list-disc space-y-2 text-sm text-text-secondary">
                    <li>임대차계약서 (전세 기간, 보증금 액수, 임대인·임차인 명시)</li>
                    <li>전세금 송금 기록 (임대인에게 보증금 지급한 통장 또는 계좌이체 영수증)</li>
                    <li>임차인 동의서 (전세금 채무인수에 임차인 동의 증거)</li>
                    <li>주민센터 확정일자·전입신고 확인서 (임대차 존속 증명)</li>
                    <li>공과금 납부 기록 (임차인이 계속 납부한 증거 = 채무 존속 증명)</li>
                  </ul>
                </div>

                <div className="rounded-lg bg-bg-card p-4">
                  <p className="mb-3 font-semibold text-text-primary">은행대출 입증 자료</p>
                  <ul className="list-inside list-disc space-y-2 text-sm text-text-secondary">
                    <li>대출약정서 (원금, 이자율, 변제 기한 명시)</li>
                    <li>차용증 (원 차용자와 새 차용자 서명, 채무인수 내용)</li>
                    <li>은행 차입금 잔액증명서 (현재 잔액, 대출일, 기한)</li>
                    <li>통장 기록 (매월 원리금 납부 증거)</li>
                    <li>신분증 사본 (수증자가 채무인수 시점에 동의한 증거)</li>
                    <li>은행 대출 명의 변경 서류 (채무자 변경 기록이 최선)</li>
                  </ul>
                </div>

                <p className="mt-4 text-sm text-text-tertiary">
                  주의: 입증 자료는 부담부증여 당시는 물론 향후 세무조사 시까지 보관하셔야 합니다. 특히 전세보증금의 경우
                  임차인이 다른 부동산으로 이사할 때 보증금을 반환받아야 하는데, 이 과정에서 수증자가 실제로 채무를
                  변제했음을 증명해야 합니다.
                </p>
              </section>

              {/* 5. 증여세 상세 */}
              <section aria-label="증여세 상세" className="card">
                <h2 className="mb-4 text-2xl font-semibold">증여세 — 공제와 세율</h2>
                <p className="mb-4 text-text-secondary" data-speakable>
                  부담부증여에서 증여 부분(무상분)의 세금은 일반 증여세와 동일합니다. 다만 세율이 높으므로 공제 혜택을
                  정확히 적용하는 것이 중요합니다.
                </p>

                <div className="overflow-x-auto mb-4" data-speakable>
                  <table className="w-full text-sm">
                    <caption className="sr-only">증여세 세율표 (상증법 §56)</caption>
                    <thead>
                      <tr className="border-b border-border-base text-left">
                        <th className="py-2 pr-4 font-semibold">과세표준</th>
                        <th className="py-2 pr-4 font-semibold">세율</th>
                        <th className="py-2 font-semibold">누진공제</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-subtle">
                        <td className="py-2 pr-4">1억 이하</td>
                        <td className="py-2 pr-4">10%</td>
                        <td className="py-2">0</td>
                      </tr>
                      <tr className="border-b border-border-subtle">
                        <td className="py-2 pr-4">5억 이하</td>
                        <td className="py-2 pr-4">20%</td>
                        <td className="py-2">1,000만</td>
                      </tr>
                      <tr className="border-b border-border-subtle">
                        <td className="py-2 pr-4">10억 이하</td>
                        <td className="py-2 pr-4">30%</td>
                        <td className="py-2">6,000만</td>
                      </tr>
                      <tr className="border-b border-border-subtle">
                        <td className="py-2 pr-4">30억 이하</td>
                        <td className="py-2 pr-4">40%</td>
                        <td className="py-2">1억 6,000만</td>
                      </tr>
                      <tr>
                        <td className="py-2 pr-4">30억 초과</td>
                        <td className="py-2 pr-4">50%</td>
                        <td className="py-2">4억 6,000만</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="rounded-lg bg-bg-card p-4">
                  <p className="mb-3 font-semibold text-text-primary">증여재산공제 (상증법 §53)</p>
                  <ul className="list-inside list-disc space-y-2 text-sm text-text-secondary">
                    <li>배우자: 6억원 (혼인 기간 관계없음)</li>
                    <li>성년 직계비속(자녀): 5,000만원 (10년 단위)</li>
                    <li>미성년 직계비속: 2,000만원 (10년 단위)</li>
                    <li>기타 친족: 1,000만원</li>
                  </ul>
                  <p className="mt-3 text-xs text-text-tertiary">
                    주: 공제는 10년 단위로 누적됩니다. 같은 사람에게 10년 이내에 다시 증여하면 이전 증여액과 합산되어
                    세금이 높아집니다.
                  </p>
                </div>
              </section>

              {/* 6. 양도세 상세 */}
              <section aria-label="양도세 상세" className="card">
                <h2 className="mb-4 text-2xl font-semibold">양도세 — 채무인수분 계산</h2>
                <p className="mb-4 text-text-secondary" data-speakable>
                  양도세는 채무인수액을 양도가액으로 하여 계산합니다. 양도차익이 작으면 세금도 작지만, 취득가를 정확히
                  비례 배분하지 않으면 과다 과세될 수 있습니다.
                </p>

                <div className="rounded-lg bg-bg-card p-4 mb-4">
                  <p className="mb-3 font-semibold text-text-primary">양도차익 계산 (부담부증여 특수성)</p>
                  <div className="text-sm text-text-secondary space-y-2">
                    <p>
                      <strong>양도가액(채무인수액)</strong> = 인수한 채무액
                    </p>
                    <p>
                      <strong>취득가 비례분</strong> = 전체 취득가 × (채무인수액 / 자산 전체가액)
                    </p>
                    <p>
                      <strong>경비 비례분</strong> = 전체 경비 × (채무인수액 / 자산 전체가액)
                    </p>
                    <p>
                      <strong>양도차익</strong> = 양도가액 − 취득가 비례분 − 경비 비례분
                    </p>
                    <p className="text-xs text-text-tertiary">
                      예: 자산 10억, 채무 4억, 취득가 8억, 경비 2천만 인 경우
                      <br />
                      취득가 비례분 = 8억 × (4억 / 10억) = 3.2억
                      <br />
                      경비 비례분 = 2천만 × (4억 / 10억) = 800만
                      <br />
                      양도차익 = 4억 − 3.2억 − 800만 = 1,920만
                    </p>
                  </div>
                </div>

                <div className="rounded-lg bg-bg-card p-4">
                  <p className="mb-3 font-semibold text-text-primary">양도세율 (소득세법 §104)</p>
                  <ul className="list-inside list-disc space-y-2 text-sm text-text-secondary">
                    <li>1세대1주택 1년 미만: 40%</li>
                    <li>1세대1주택 1년~2년: 30%</li>
                    <li>1세대1주택 2년 초과: 누진세율(6~45%) + 장기보유특별공제(최대 80%)</li>
                    <li>일반인(다주택): 누진세율(6~45%)</li>
                  </ul>
                  <p className="mt-3 text-xs text-text-tertiary">
                    중요: 부담부증여의 양도 부분도 1세대1주택 요건을 만족하면 장기보유특별공제를 받을 수 있으나, 계산이
                    복잡하므로 세무사 확인이 필수입니다.
                  </p>
                </div>
              </section>

              {/* 7. 함정 5가지 */}
              <section aria-label="함정 5가지" className="card border-l-4 border-l-danger-500">
                <h2 className="mb-3 text-xl font-semibold">⚠️ 부담부증여 함정 5가지</h2>
                <div className="space-y-3 text-text-secondary">
                  <div>
                    <p className="mb-1">
                      <strong className="text-text-primary">함정 1: 채무 입증 실패 → 전체 증여로 재과세</strong>
                    </p>
                    <p className="text-sm">
                      임대차계약서, 송금 기록, 임차인 동의 등을 보관하지 못하면 국세청이 "실제로는 채무 없이 10억을
                      증여한 것"으로 보아 가산세까지 부과합니다. 부담부증여의 가장 큰 위험입니다.
                    </p>
                  </div>
                  <div>
                    <p className="mb-1">
                      <strong className="text-text-primary">함정 2: 수증자가 채무를 실제로 변제하지 않음</strong>
                    </p>
                    <p className="text-sm">
                      채무인수 계약만 하고 실제로 전세보증금이나 대출을 변제하지 않으면 민법상 채무인수 효력이 인정되지
                      않을 수 있습니다(민법 §453, §454 — 채권자 승낙 또는 제3자 변제). 특히 전세금 반환 시점에 문제가 됩니다.
                      반드시 실제 변제를 통장이나 영수증으로 증명해야 합니다.
                    </p>
                  </div>
                  <div>
                    <p className="mb-1">
                      <strong className="text-text-primary">함정 3: 채권자(임차인·은행) 동의 부재</strong>
                    </p>
                    <p className="text-sm">
                      전세보증금의 경우 임차인의 동의 없이는 채무인수가 무효입니다. 은행 대출도 마찬가지로 은행의
                      명의변경 승인이 필요합니다. 가족 간 "구두 약속"만으로는 세무상 부담부증여가 인정되지 않습니다.
                    </p>
                  </div>
                  <div>
                    <p className="mb-1">
                      <strong className="text-text-primary">함정 4: 1세대1주택 판정 오류</strong>
                    </p>
                    <p className="text-sm">
                      부담부증여 당시 증여자가 2주택 이상을 소유하면 증여 부분에 양도세 중과가 적용될 수 있습니다.
                      또한 수증자가 부담부증여 후 다른 주택을 구입하면 수증자 입장에서도 1세대1주택이 아니게 됩니다.
                      신고 전 다주택 판정을 명확히 해야 합니다.
                    </p>
                  </div>
                  <div>
                    <p className="mb-1">
                      <strong className="text-text-primary">함정 5: 채무액 과다 주장</strong>
                    </p>
                    <p className="text-sm">
                      전세금을 실제보다 많게 기재하면 양도세는 줄일 수 있지만, 국세청이 적발 시 위조·허위 기재로 가산세
                      40~50%를 부과합니다. 채무액은 반드시 공식 증명서(임대차계약서, 잔액증명서)로만 입증해야 합니다.
                    </p>
                  </div>
                </div>
              </section>

              {/* 8. 신고 절차 */}
              <section aria-label="신고 절차" className="card">
                <h2 className="mb-4 text-2xl font-semibold">부담부증여 신고 절차</h2>
                <p className="mb-4 text-text-secondary" data-speakable>
                  부담부증여는 증여세 신고(증여세 과세)와 양도소득세 신고(양도세 과세)를 동시에 해야 합니다. 신고 기한을
                  놓치면 무신고 가산세를 받으므로 주의가 필요합니다.
                </p>

                <ol className="list-inside list-decimal space-y-3 text-sm text-text-secondary">
                  <li>
                    <strong>증여세 신고</strong> (증여일로부터 3개월 이내)
                    <ul className="list-inside list-disc ml-4 mt-1 space-y-1">
                      <li>
                        <a
                          href="https://www.hometax.go.kr"
                          target="_blank"
                          rel="noopener noreferrer nofollow"
                          className="text-primary-600 underline dark:text-primary-500"
                        >
                          홈택스
                        </a>
                        에서 증여세 신고서 작성
                      </li>
                      <li>
                        증여재산가액(자산 − 채무) 및 공제액, 세율 적용하여 계산
                      </li>
                      <li>첨부: 임대차계약서, 송금 기록, 공증(선택)</li>
                    </ul>
                  </li>
                  <li>
                    <strong>양도소득세 신고</strong> (양도일로부터 2개월 이내)
                    <ul className="list-inside list-disc ml-4 mt-1 space-y-1">
                      <li>
                        <a
                          href="https://www.hometax.go.kr"
                          target="_blank"
                          rel="noopener noreferrer nofollow"
                          className="text-primary-600 underline dark:text-primary-500"
                        >
                          홈택스
                        </a>
                        에서 양도소득세 신고서 작성
                      </li>
                      <li>
                        양도가액(채무인수액), 취득가(비례분), 경비(비례분) 정확히 입력
                      </li>
                      <li>1세대1주택 요건 확인 후 공제율 적용 (필요 시)</li>
                      <li>첨부: 임대차계약서, 재산세 영수증, 대출약정서</li>
                    </ul>
                  </li>
                  <li>
                    <strong>세무사 상담 (강력 권장)</strong>
                    <ul className="list-inside list-disc ml-4 mt-1 space-y-1">
                      <li>
                        부담부증여는 계산이 복잡하고 실수 시 과세청 재조사 위험이 큼
                      </li>
                      <li>특히 1세대1주택 판정, 공제 적용 여부 확인 필수</li>
                      <li>신고 전 세무사 검토 비용 &lt; 세무조사 리스크</li>
                    </ul>
                  </li>
                </ol>

                <p className="mt-4 text-sm text-text-tertiary">
                  중요: 부담부증여는 세법상 명확한 선례가 적어서 개별 사정에 따라 국세청의 해석이 달라질 수 있습니다.
                  따라서 신고 전 반드시 세무사 또는 국세청 상담을 받으시기 바랍니다.
                </p>
              </section>

              {/* 9. FAQ */}
              <FaqSection items={[...FAQ_ITEMS]} />

              {/* 10. 관련 계산기·가이드 */}
              <section aria-label="관련 계산기·가이드" className="card">
                <h2 className="mb-4 text-2xl font-semibold">관련 계산기·가이드</h2>
                <ul className="space-y-2 text-text-secondary">
                  <li>
                    → <Link href="/calculator/capital-gains-tax/" className="text-primary-600 underline dark:text-primary-500">양도소득세 계산기</Link> — 1세대1주택·다주택·일시적2주택 시뮬
                  </li>
                  <li>
                    → <Link href="/guide/one-household-12-billion-exemption/" className="text-primary-600 underline dark:text-primary-500">1세대1주택 12억 한도 완전 정리</Link> — 비과세 조건·비례 과세
                  </li>
                  <li>
                    → <Link href="/guide/long-term-holding-special-deduction-80-percent/" className="text-primary-600 underline dark:text-primary-500">장기보유특별공제 80% 완전 정리</Link> — 보유·거주 분리 계산
                  </li>
                  <li>
                    → <Link href="/guide/temporary-two-houses-capital-gains-exemption/" className="text-primary-600 underline dark:text-primary-500">일시적 2주택 양도세 비과세 3년 완벽 정리</Link> — 1년 경과·3년 기한
                  </li>
                  <li>
                    → <Link href="/calculator/loan/" className="text-primary-600 underline dark:text-primary-500">대출이자 계산기</Link> — 원리금균등·만기일시 상환
                  </li>
                </ul>
              </section>

              <ShareButtons
                title="부담부증여 양도+증여세 완벽 정리 2026"
                url={URL}
                description="부담부증여 분리 계산식·채무인수 양도세·무상분 증여세·절세 효과·함정 5가지."
              />

              {/* 출처·면책 */}
              <section
                aria-label="출처 및 면책"
                className="rounded-lg border border-border-base p-4 text-caption text-text-tertiary"
              >
                <p className="mb-2">
                  <strong>법적 근거</strong>: 상속세및증여세법 §47 ② (부담부증여) · §53 (증여재산공제) · §56
                  (증여세율) · 소득세법 §94 ① (양도소득 범위) · §95 (장기보유특별공제) · §98 (양도시기) · §103
                  (양도소득 기본공제 250만 원) · §104 (양도세율) · §105 (예정신고) · 민법 §453·§454 (계약에 의한
                  채무인수와 채권자 승낙) · 국세기본법 §47의2 (무신고 가산세) · §47의3 (과소신고 가산세). 참고:{' '}
                  <a
                    href="https://www.law.go.kr"
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="text-primary-600 underline dark:text-primary-500"
                  >
                    법령정보센터
                  </a>
                  , <a
                    href="https://www.nts.go.kr"
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="text-primary-600 underline dark:text-primary-500"
                  >
                    국세청
                  </a>
                  , <a
                    href="https://www.hometax.go.kr"
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="text-primary-600 underline dark:text-primary-500"
                  >
                    홈택스
                  </a>
                  .
                </p>
                <p className="mb-2">
                  <strong>면책조항</strong>: 본 가이드는 일반 정보 제공 목적이며 세무·법적 조언이 아닙니다. 부담부증여는
                  거래 형태에 따라 세무상 해석이 달라질 수 있으며, 채무 입증 실패 시 전체 증여로 재과세될 수 있으므로
                  반드시 세무사 또는 국세청 상담을 통해 확정하시기 바랍니다. 특히 가족 간 거래인 만큼 채무 변제 기원을
                  명확히 입증하는 것이 가장 중요합니다.
                </p>
                <p>
                  <strong>업데이트</strong>: {DATE_MODIFIED} · 작성·검수: 김준혁 (calculatorhost). 본 가이드는 AI 보조
                  작성 후 운영자 검수 발행되었습니다.
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
