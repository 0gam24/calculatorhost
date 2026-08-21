// [revenue-lever: traffic+indexing] 2026 세제개편안 근로장려금 확대 급상승 검색 흡수, 롱테일 트래픽 + 색인 표면 확대.
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

const URL = 'https://calculatorhost.com/guide/earned-income-tax-credit-expansion-2027-reform/';
const DATE_PUBLISHED = '2026-08-22';
const DATE_MODIFIED = '2026-08-22';

export const metadata: Metadata = {
  title: '근로장려금 확대 2026 개편안, 맞벌이 최대 360만 소득 5200만',
  description:
    '2026 세제개편안이 근로장려금 최대 지급액을 단독 180만, 홑벌이 310만, 맞벌이 360만으로 올리고 소득요건을 단독 2,600만, 홑벌이 3,700만, 맞벌이 5,200만으로 완화하는 방향을 담았습니다. 현행 기준과 얼마 오르는지 정리합니다(조세특례제한법 §100의3·§100의5).',
  keywords: [
    '근로장려금 확대',
    '근로장려금 얼마 오르나',
    '근로장려금 소득요건 완화',
    '맞벌이 근로장려금 360만',
    '근로장려금 2027',
    '2026 세제개편안 근로장려금',
    '조세특례제한법 100조의3',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '근로장려금 확대 2026 개편안, 맞벌이 최대 360만 소득 5200만' }],
    title: '근로장려금 확대 2026 개편안, 맞벌이 최대 360만 소득 5200만',
    description: '최대 지급액 단독 180만·홑벌이 310만·맞벌이 360만, 소득요건 완화 방향. 현행 대비 얼마 오르는지 정리합니다.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '근로장려금 확대 2026 개편안',
    description: '단독 180만·홑벌이 310만·맞벌이 360만으로 인상, 소득요건 완화 방향 정리.',
  },
};

const FAQ_ITEMS = [
  {
    question: '근로장려금이 얼마로 오르나요?',
    answer:
      '개편안 기준 최대 지급액이 단독 180만원, 홑벌이 310만원, 맞벌이 360만원으로 오르는 방향입니다. 현행은 단독 165만, 홑벌이 285만, 맞벌이 330만원인데, 내년 최저임금 인상을 고려해 약 9% 인상하는 안이 2026 세제개편안에 담겼습니다. 다만 국회 통과 후 확정됩니다.',
  },
  {
    question: '소득요건은 어떻게 완화되나요?',
    answer:
      '부부 합산 총소득 기준이 단독 2,600만, 홑벌이 3,700만, 맞벌이 5,200만원 미만으로 완화되는 방향입니다. 현행은 단독 2,200만, 홑벌이 3,200만, 맞벌이 4,400만원 미만입니다. 소득 문턱이 높아지면 그동안 아깝게 탈락했던 가구가 새로 대상에 들어올 수 있습니다.',
  },
  {
    question: '지금 신청하면 인상된 금액을 받나요?',
    answer:
      '아직은 아닙니다. 2026년 8월 현재 지급되는 근로장려금(2025년 귀속분)은 현행 기준(단독 165만 등)으로 계산됩니다. 인상안은 2026 세제개편안 내용으로, 국회 통과 시 2026년 귀속 소득분(2027년 신청·지급)부터 적용될 것으로 예상되나 정확한 시점은 확정 법률로 확인해야 합니다.',
  },
  {
    question: '맞벌이 부부는 결혼 때문에 손해라던데 개선되나요?',
    answer:
      '맞벌이 평탄구간 상한이 1,700만원에서 1,800만원으로 확대되는 방향입니다. 평탄구간은 소득이 늘어도 최대 지급액이 유지되는 구간으로, 이를 넓히면 혼인으로 소득이 합산돼 불이익을 보던 맞벌이 가구의 지급액 감소가 완화됩니다.',
  },
  {
    question: '재산요건도 바뀌나요?',
    answer:
      '재산요건은 현행이 유지되는 방향입니다. 가구원 재산 합계 2억 4,000만원 미만 요건은 그대로이며, 1억 7,000만원 이상이면 산정액의 50%가 감액되는 규정도 유지됩니다. 개편의 핵심은 지급액 인상과 소득요건 완화입니다.',
  },
  {
    question: '근로장려금은 언제 어떻게 신청하나요?',
    answer:
      '정기신청은 매년 5월, 반기신청은 상반기분 9월과 하반기분 3월에 합니다. 국세청 홈택스, 손택스(모바일), ARS, 서면으로 신청할 수 있습니다. 안내문을 받은 경우 안내에 따라 간편 신청이 가능하며, 신청 자격과 산정은 조세특례제한법 §100의3과 §100의5를 따릅니다.',
  },
  {
    question: '자녀장려금도 같이 오르나요?',
    answer:
      '자녀장려금은 별도 제도로, 근로장려금 인상과 함께 지원을 확대하는 흐름 속에 있습니다. 다만 자녀장려금의 구체적 금액과 요건 변경은 근로장려금과 별개로 확정되므로, 자녀장려금 관련 내용은 해당 안내와 확정 법률로 확인하세요.',
  },
];

export default function EarnedIncomeTaxCreditExpansion2027ReformPage() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '근로장려금 확대 2026 개편안' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '근로장려금 확대 2026 개편안, 맞벌이 최대 360만원 소득요건 완화',
    description:
      '근로장려금 최대 지급액 인상(단독 180만·홑벌이 310만·맞벌이 360만)과 소득요건 완화(단독 2,600만·홑벌이 3,700만·맞벌이 5,200만)를 담은 2026 세제개편안. 현행 대비 변화와 신청 방법을 정리합니다.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['근로장려금', '근로장려금 확대', '소득요건 완화', '맞벌이 360만', '2026 세제개편안'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '근로장려금 확대 2026 개편안',
    description:
      '근로장려금 최대 지급액 인상과 소득요건 완화 개편안, 현행 대비 변화와 신청 방법 정리.',
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
                    { name: '근로장려금 확대 2026 개편안' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">저소득 근로·사업 가구 · 7분 읽기 · 2026-08-22</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  근로장려금 확대 2026 개편안
                  <br />
                  <span className="text-2xl text-text-secondary">· 맞벌이 최대 360만, 소득요건 완화</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  2026년 8월 3일 발표된 세제개편안은 근로장려금의 최대 지급액을 올리고 소득요건을 완화하는 방향을 담았습니다. 이 글은 근로장려금을 받거나 대상이 궁금한 저소득 근로·사업 가구를 위해, 얼마로 오르는지, 소득 문턱이 어떻게 낮아지는지, 그리고 언제부터 적용되는지를 현행 기준과 함께 정리합니다.
                </p>
              </header>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-5" data-speakable>
                <p className="font-semibold text-text-primary">30초 요약</p>
                <ul className="ml-5 list-disc space-y-1 text-sm text-text-secondary">
                  <li>최대 지급액이 단독 180만, 홑벌이 310만, 맞벌이 360만으로 오르는 방향입니다.</li>
                  <li>소득요건이 단독 2,600만, 홑벌이 3,700만, 맞벌이 5,200만원 미만으로 완화됩니다.</li>
                  <li>맞벌이 평탄구간 상한이 1,700만에서 1,800만원으로 넓어집니다.</li>
                  <li>2026년 8월 지급분(2025년 귀속)은 현행 기준으로 계산됩니다.</li>
                </ul>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 근로장려금 최대 지급액 현행과 개편안</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="p-3 text-left font-semibold bg-bg-card">가구 유형</th>
                        <th scope="col" className="p-3 text-left font-semibold bg-bg-card">현행</th>
                        <th scope="col" className="p-3 text-left font-semibold bg-bg-card">개편안</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">단독</td>
                        <td className="p-3">165만원</td>
                        <td className="p-3">180만원</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">홑벌이</td>
                        <td className="p-3">285만원</td>
                        <td className="p-3">310만원</td>
                      </tr>
                      <tr>
                        <td className="p-3">맞벌이</td>
                        <td className="p-3">330만원</td>
                        <td className="p-3">360만원</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              <section className="space-y-4" data-speakable>
                <h2 className="text-2xl font-bold">근로장려금이 얼마로 오르나</h2>
                <p>
                  최대 지급액이 가구 유형별로 약 9% 오르는 방향입니다. 내년 최저임금 인상에 맞춰 단독은 165만에서 180만, 홑벌이는 285만에서 310만, 맞벌이는 330만에서 360만원으로 상향하는 안이 담겼습니다. 근로장려금 산정은 조세특례제한법 §100의5를 따르며, 소득 구간에 따라 점증, 평탄, 점감 구조로 지급액이 정해집니다.
                </p>
                <p>
                  다만 최대 지급액은 특정 소득 구간에서만 받습니다. 소득이 너무 적으면 점증구간이라 최대치보다 적고, 소득이 많으면 점감구간이라 줄어듭니다. 즉 모든 대상자가 180만이나 360만을 받는 것은 아닙니다.
                </p>
              </section>

              <section className="space-y-4" data-speakable>
                <h2 className="text-2xl font-bold">소득요건은 얼마로 완화되나</h2>
                <p>
                  소득 문턱이 가구 유형별로 400만에서 800만원가량 높아집니다. 부부 합산 총소득 기준이 단독 2,200만에서 2,600만, 홑벌이 3,200만에서 3,700만, 맞벌이 4,400만에서 5,200만원 미만으로 완화되는 방향입니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 2. 총소득 요건 현행과 개편안</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="p-3 text-left font-semibold bg-bg-card">가구 유형</th>
                        <th scope="col" className="p-3 text-left font-semibold bg-bg-card">현행</th>
                        <th scope="col" className="p-3 text-left font-semibold bg-bg-card">개편안</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">단독</td>
                        <td className="p-3">2,200만원 미만</td>
                        <td className="p-3">2,600만원 미만</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">홑벌이</td>
                        <td className="p-3">3,200만원 미만</td>
                        <td className="p-3">3,700만원 미만</td>
                      </tr>
                      <tr>
                        <td className="p-3">맞벌이</td>
                        <td className="p-3">4,400만원 미만</td>
                        <td className="p-3">5,200만원 미만</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-2">
                  <p className="font-semibold text-text-primary">경계 예시. 맞벌이 부부 합산 총소득 5,000만원</p>
                  <p className="text-sm text-text-secondary">
                    현행 기준: 4,400만원 이상이라 대상에서 제외
                    <br />
                    개편안 기준: 5,200만원 미만이라 대상에 포함(점감구간에서 일부 지급)
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 소득요건 완화로 4,400만~5,200만 구간 맞벌이 가구가 새로 대상이 됩니다.</span>
                  </p>
                </div>
                <p>
                  예외: 소득요건을 넘어도 재산요건(가구원 재산 합계 2억 4,000만원 미만)을 못 갖추면 대상이 아닙니다. 재산이 1억 7,000만원 이상이면 산정액의 50%가 감액됩니다.
                </p>
              </section>

              <section className="space-y-4" data-speakable>
                <h2 className="text-2xl font-bold">언제부터 적용되나</h2>
                <p>
                  2026년 귀속 소득분부터 적용될 것으로 예상됩니다. 이번 인상안은 2026 세제개편안 내용으로, 국회를 통과하면 2026년에 번 소득을 기준으로 2027년에 신청, 지급되는 근로장려금부터 반영될 가능성이 높습니다.
                </p>
                <p>
                  반면 2026년 8월 27일 전후로 지급되는 올해 근로장려금은 2025년 귀속분이므로 현행 기준(단독 165만 등)으로 계산됩니다. 개편안이 소급 적용되지는 않습니다.
                </p>
                <p>
                  다만 정확한 시행 시점은 국회 심의 결과와 부칙에 달려 있습니다. 확정 전까지는 발표된 방향으로 이해하고, 신청 전 국세청 안내로 확인하세요.
                </p>
              </section>

              <section className="space-y-4" data-speakable>
                <h2 className="text-2xl font-bold">어떻게 신청하나</h2>
                <p>
                  홈택스나 손택스에서 신청 기간에 맞춰 신청합니다. 절차는 다음과 같습니다.
                </p>
                <ol className="ml-5 list-decimal space-y-2 text-text-secondary">
                  <li>정기신청은 매년 5월, 반기신청은 9월(상반기분)과 3월(하반기분)입니다.</li>
                  <li>국세청 안내문을 받았다면 안내 코드로 간편 신청합니다.</li>
                  <li>홈택스, 손택스, ARS(1544-9944), 서면 중 편한 방법을 택합니다.</li>
                  <li>소득요건과 재산요건, 가구 유형을 확인합니다.</li>
                  <li>지급 계좌를 정확히 등록해 감액이나 지연을 피합니다.</li>
                </ol>
                <p>
                  예외: 세금 체납이 있으면 장려금의 30% 한도에서 먼저 충당된 뒤 지급됩니다. 신청 자격과 산정 기준은 조세특례제한법 §100의3(신청 자격)과 §100의6(결정·지급)을 따릅니다.
                </p>
              </section>

              <h2 className="text-2xl font-bold mb-6">자주 묻는 질문</h2>
              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h3 className="text-lg font-semibold text-text-primary">관련 계산기 및 가이드</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link href="/calculator/salary/" className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition">
                    <div className="font-semibold text-primary-500">연봉 실수령액 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">총소득과 세후 실수령액을 계산해보세요.</p>
                  </Link>
                  <Link href="/guide/earned-income-tax-credit-payment-amount-2026/" className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition">
                    <div className="font-semibold text-primary-500">근로장려금 지급액 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">현행 산정 구조와 가구별 지급액을 확인하세요.</p>
                  </Link>
                  <Link href="/guide/earned-income-tax-credit-semiannual-application-2026/" className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition">
                    <div className="font-semibold text-primary-500">근로장려금 반기신청</div>
                    <p className="mt-1 text-sm text-text-secondary">상·하반기 신청과 지급 일정을 정리합니다.</p>
                  </Link>
                  <Link href="/guide/earned-income-tax-credit-vs-child/" className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition">
                    <div className="font-semibold text-primary-500">근로장려금 vs 자녀장려금</div>
                    <p className="mt-1 text-sm text-text-secondary">두 장려금의 차이와 중복 여부를 확인하세요.</p>
                  </Link>
                  <Link href="/guide/child-tax-benefit-payment-2026/" className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition">
                    <div className="font-semibold text-primary-500">자녀장려금 지급</div>
                    <p className="mt-1 text-sm text-text-secondary">자녀장려금 요건과 지급액을 알아보세요.</p>
                  </Link>
                  <Link href="/category/work/" className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition">
                    <div className="font-semibold text-primary-500">근로·소득 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">연봉, 퇴직금 등 근로 관련 계산기 모음.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 교육 목적이며 개인 맞춤형 세무 조언이 아닙니다. 근로장려금 지급액 인상(단독 180만·홑벌이 310만·맞벌이 360만)과 소득요건 완화(단독 2,600만·홑벌이 3,700만·맞벌이 5,200만)는 2026년 8월 3일 발표된 세제개편안(案)으로, 국회 통과 전까지 확정된 제도가 아닙니다. 확정 금액과 시행 시점은 최종 통과된 법률로 달라질 수 있습니다. 2026년 8월 지급분(2025년 귀속)은 현행 기준(단독 165만 등)으로 계산됩니다. 인용 조항: 조세특례제한법 §100의3(신청 자격), §100의5(산정), §100의6(결정·지급). 본 콘텐츠는 2026-08-22 기준이며 법 개정 시 업데이트됩니다. AI 보조 작성 후 운영자 검수 완료.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터</a>,{' '}
                  <a href="https://www.nts.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">국세청(근로·자녀장려금)</a>,{' '}
                  <a href="https://www.moef.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">기획재정부(세제개편안)</a>.
                </p>
              </section>

              <ShareButtons title="근로장려금 확대 2026 개편안" url={URL} />
            </article>
          </main>
        </div>
        <Footer />
      </div>
    </>
  );
}
