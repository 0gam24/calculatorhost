import type { Metadata } from 'next';
import { GuideCalculatorCta } from '@/components/guide/GuideCalculatorCta';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { Footer } from '@/components/layout/Footer';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { FaqSection } from '@/components/calculator/FaqSection';
import { ShareButtons } from '@/components/calculator/ShareButtons';
import { RateBarChart } from '@/components/charts/RateBarChart';
import {
  buildBreadcrumbJsonLd,
  buildArticleJsonLd,
  buildWebPageJsonLd,
  buildFaqPageJsonLd,
  buildSpeakableJsonLd,
} from '@/lib/seo/jsonld';

const URL = 'https://calculatorhost.com/guide/national-pension-premium-2026/';
const DATE_PUBLISHED = '2026-06-13';
const DATE_MODIFIED = '2026-10-14';

export const metadata: Metadata = {
  title: '국민연금 보험료 2026, 계산법·상한액·직장/지역 차이',
  description:
    '2026년 국민연금 보험료율 9%→9.5%로 인상, 기준소득월액 상한 2026년 7월부터 637만원→659만원 조정. 직장가입자·지역가입자 납부액 계산, 상한액 적용 기준, 소득공제 혜택까지 정리했습니다.',
  keywords: [
    '국민연금 보험료',
    '국민연금 보험료 2026',
    '국민연금 계산',
    '국민연금 보험료율',
    '국민연금 기준소득월액',
    '국민연금 상한액',
    '직장가입자 국민연금',
    '지역가입자 국민연금',
    '국민연금 소득공제',
    '국민연금법 88조',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '국민연금 보험료 2026, 계산법·상한액·직장/지역 차이' }],
    title: '국민연금 보험료 2026, 계산법·상한액·직장/지역 차이',
    description:
      '2026년 국민연금 보험료율 9.5%, 기준소득월액 상한 659만원(7월부터). 직장·지역 가입자 납부액 계산 및 절세 방법 정리.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '국민연금 보험료 2026, 계산법·상한·직장/지역',
    description: '보험료율 9.5%, 기준소득월액 상한 659만원. 납부액 시뮬레이션 및 소득공제.',
    images: ['/og-default.png'],
  },
};

const FAQ_ITEMS = [
  {
    question: '2026년 국민연금 보험료율은 얼마인가요?',
    answer:
      '2026년 1월 1일부터 국민연금 보험료율은 9%에서 9.5%로 인상됐습니다(국민연금법 §88). 2026년 한 해 동안 9.5%가 적용되며, 7월에 바뀌는 것은 기준소득월액 상한일 뿐 보험료율은 그대로입니다. 직장가입자는 근로자 4.75%, 사업주 4.75%씩 부담하고, 지역가입자·임의가입자·임의계속가입자는 9.5% 전액을 본인이 냅니다. 이후 2027년 10%, 2028년 10.5% 등 매년 0.5%p씩 2033년 13%까지 인상될 예정입니다.',
  },
  {
    question: '월급 300만원인 경우 국민연금 보험료는 얼마인가요?',
    answer:
      '기준소득월액 300만원이면 보험료 총액은 300만원 × 9.5% = 28만5,000원입니다. 간단한 곱셈 계산입니다. 직장가입자는 본인이 4.75%만 부담하므로 매월 300만원 × 4.75% = 14만2,500원이 급여에서 공제되고, 회사가 같은 금액을 추가로 냅니다. 2026년에는 1월부터 12월까지 같은 9.5% 요율이 적용되며, 7월에 보험료율이 다시 바뀌지 않습니다.',
  },
  {
    question: '기준소득월액 상한액이 뭔가요?',
    answer:
      '월 소득이 일정액을 넘으면 초과분은 보험료 계산에 반영하지 않는다는 뜻입니다. 상한액은 2026년 1월~6월 637만원, 2026년 7월~2027년 6월 659만원으로 7월에 상향됩니다(보건복지부 고시, 국민연금법 시행령 §5). 보험료율은 2026년 내내 9.5%로 같고, 7월에 바뀌는 것은 상한뿐입니다. 월 소득 700만원인 사람은 6월까지 637만원까지만, 7월부터 659만원까지만 보험료 계산에 반영됩니다.',
  },
  {
    question: '국민연금 상한액을 초과하면 세금을 덜 낼 수 있나요?',
    answer:
      '국민연금 보험료는 소득공제 대상(소득세법 §51의3)이므로, 보험료를 많이 낼수록 종합소득세가 줄어듭니다. 다만 상한액 이상의 소득 부분은 보험료를 내지 않으므로, "상한액 초과 → 절세" 같은 특별 효과는 없습니다. 상한액 구간(637만~659만원)에 있으면 그냥 계산하면 됩니다.',
  },
  {
    question: '지역가입자는 국민연금 보험료를 어떻게 계산하나요?',
    answer:
      '지역가입자는 사업소득 신고 기준으로 계산합니다. 직장가입자처럼 "월 소득 × 9.5%"로 단순하지 않고, 보건복지부가 고시하는 "기준소득"을 기반으로 개인 소득을 반영해서 산정하는 방식입니다(국민연금법 §73). 구체적인 금액은 국민연금공단 홈페이지의 개인 정보 조회로 확인할 수 있습니다.',
  },
  {
    question: '국민연금 조기수령하면 보험료가 줄어드나요?',
    answer:
      '아닙니다. 보험료는 가입 중에 내는 것이고, 수령액은 "몇 세에 받기 시작하느냐"로 달라집니다. 조기수령은 1년 앞당길 때마다 월 수령액이 6%씩 줄어 최대 5년(30%) 감액되고, 연기수령은 1년 미룰 때마다 7.2%씩 늘어 최대 5년(36%) 증액됩니다. 보험료 납부와 수령액은 별개의 결정입니다.',
  },
  {
    question: '프리랜서/자영업자는 국민연금을 어떻게 가입하나요?',
    answer:
      '직장이 없으면 지역가입자로 가입합니다. 국민연금공단에 사업소득(또는 종합소득) 신고 후, 공단에서 산정한 기준소득에 따라 보험료가 책정됩니다. 지역가입자는 9.5% 전액을 본인이 부담합니다. 소득이 없거나 낮으면 임의가입으로 가입할 수 있는데, 2026년 기준소득월액 하한 40만원 × 9.5% = 월 3만8,000원이 최저 보험료입니다. 월 소득 1,000만원 이상의 프리랜서라면 사업장 가입 요건을 충족하는지 함께 확인하세요.',
  },
] as const;

export default function NationalPensionPremium2026() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '국민연금 보험료 2026, 계산법·상한액·직장/지역 차이' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '국민연금 보험료 2026, 계산법·상한액·직장/지역 차이',
    description:
      '2026년 국민연금 보험료율 9.5%, 기준소득월액 상한 2026년 7월부터 659만원. 직장가입자·지역가입자 계산, 소득공제 혜택을 정리했습니다.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['국민연금 보험료', '국민연금 보험료율', '기준소득월액', '직장가입자', '지역가입자'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '국민연금 보험료 2026, 계산법·상한액·직장/지역 차이',
    description:
      '2026년 국민연금 보험료율 9.5%, 기준소득월액 상한 659만원. 직장·지역가입자 계산과 소득공제.',
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
                    { name: '국민연금 보험료 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">보험·연금 · 8분 읽기 · 2026-06-13</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  2026 국민연금 보험료 완전 정리
                  <br />
                  <span className="text-2xl text-text-secondary">· 계산법·상한액·직장/지역 차이</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  국민연금 보험료는 2026년부터 <strong>9.5%</strong>로 인상되며, 기준소득월액 상한은 2026년 7월부터 <strong>637만원에서 659만원</strong>으로 조정됩니다. 직장가입자와 지역가입자에게 미치는 영향은 크게 다릅니다.
                </p>
              </header>
              <GuideCalculatorCta slug="national-pension-premium-2026" />

              <div className="space-y-2 rounded-lg border border-border-base bg-bg-card p-4">
                <p className="text-sm font-semibold text-text-primary">국민연금 보험료 2025 vs 2026 변경</p>
                <table className="w-full text-sm">
                  <caption className="sr-only">2025년 vs 2026년 국민연금 보험료율 비교</caption>
                  <thead>
                    <tr className="border-b border-border-base">
                      <th scope="col" className="py-2 text-left font-semibold text-text-primary">항목</th>
                      <th scope="col" className="py-2 text-right font-semibold text-text-primary">2025년</th>
                      <th scope="col" className="py-2 text-right font-semibold text-text-primary">2026년</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-border-base hover:bg-bg-base">
                      <td className="py-2 text-text-primary">보험료율</td>
                      <td className="py-2 text-right text-text-primary">9.0%</td>
                      <td className="py-2 text-right text-text-primary">9.5%</td>
                    </tr>
                    <tr className="hover:bg-bg-base">
                      <td className="py-2 text-text-primary">근로자 부담률 (직장)</td>
                      <td className="py-2 text-right text-text-primary">4.5%</td>
                      <td className="py-2 text-right text-text-primary">4.75%</td>
                    </tr>
                  </tbody>
                </table>
                <p className="mt-2 text-xs text-text-tertiary">
                  기준소득월액 상한은 2026년 1월~6월 637만원, 2026년 7월~2027년 6월 659만원으로 7월에만 상향됩니다(국민연금법 시행령 §5, 보건복지부 고시). 보험료율 9.5%는 2026년 1월 1일부터 12월 31일까지 그대로이며, 7월에 바뀌는 것은 상한뿐입니다.
                </p>
              </div>

              <div>
                <h2 className="mb-3 text-2xl font-bold">2026년 국민연금 보험료율, 정확히 얼마인가?</h2>
                <p className="mb-4 text-base text-text-primary" data-speakable>
                  국민연금 보험료율은 2026년 1월 1일부터 <strong>9.5%</strong>로 인상됐습니다(국민연금법 §88). 2025년까지는 9.0%였는데, 2025년 3월 국회를 통과한 연금개혁에 따라 2026년부터 매년 0.5%포인트씩 올라 2033년 13%에 도달합니다. 직장가입자는 근로자가 4.75%, 사업주가 4.75%씩 반반 부담하고, 지역가입자·임의가입자·임의계속가입자는 9.5% 전액을 본인이 냅니다.
                </p>
                <RateBarChart
                  title="2026년 4대보험 보험료율 비교"
                  caption="근로자 부담 기준 (국민연금법 §88·건강보험법 §75·고용보험법 §44·노인장기요양보험법 §37)"
                  bars={[
                    { label: '국민연금', value: 4.75, color: '#1f7d6b' },
                    { label: '건강보험', value: 3.595, color: '#2f9b85' },
                    { label: '고용보험', value: 0.9, color: '#c68b2c' },
                    { label: '장기요양', value: 0.466, color: '#dc2626' },
                  ]}
                  unit="%"
                />
                <p className="mt-4 text-sm text-text-secondary">
                  이후 2027년 10.0%, 2028년 10.5%, 매년 0.5%p씩 올라 2033년 13%에 도달할 예정입니다. 자세한 인상 일정은 보건복지부 공식 연금개혁 자료를 참고하세요.
                </p>
              </div>

              <div>
                <h2 className="mb-3 text-2xl font-bold">월급별 실제 납부액, 이렇게 계산합니다</h2>
                <p className="mb-4 text-base text-text-primary" data-speakable>
                  국민연금 보험료는 기준소득월액(급여에서 천원 미만 절사)에 보험료율을 곱해 구합니다. 2026년 1월부터 12월까지 보험료율은 9.5%로 같고, 상한에 걸리지 않는 사람은 1월과 7월 보험료가 똑같습니다. 아래 예시는 간단한 곱셈 계산입니다.
                </p>
                <div className="space-y-4">
                  <div className="rounded-lg border border-border-base bg-bg-card p-4">
                    <p className="mb-2 text-sm font-semibold text-text-primary">예시 1: 월급 300만원 (상한 아래)</p>
                    <div className="space-y-1 text-sm text-text-primary">
                      <p>기준소득월액: 300만원</p>
                      <p>보험료 총액: 300만원 × 9.5% = 28만5,000원</p>
                      <p className="text-text-secondary">→ 직장가입자 본인 부담: 300만원 × 4.75% = 14만2,500원</p>
                      <p className="text-text-secondary">→ 2026년 1월부터 12월까지 매월 같은 금액</p>
                    </div>
                  </div>
                  <div className="rounded-lg border border-border-base bg-bg-card p-4">
                    <p className="mb-2 text-sm font-semibold text-text-primary">예시 2: 월급 700만원 (상한 초과)</p>
                    <div className="space-y-1 text-sm text-text-primary">
                      <p>2026년 1~6월: 기준소득월액이 상한 637만원으로 제한 → 637만원 × 9.5% = 60만5,150원 (본인 30만2,575원)</p>
                      <p>2026년 7월~: 상한이 659만원으로 상향 → 659만원 × 9.5% = 62만6,050원 (본인 31만3,025원)</p>
                      <p className="text-text-secondary">→ 7월에 바뀌는 것은 상한일 뿐 요율은 9.5%로 그대로</p>
                    </div>
                  </div>
                </div>
                <p className="mt-4 text-sm text-text-secondary">
                  주의: 2026년 7월에 기준소득월액 상한만 637만원에서 659만원으로 오릅니다. 보험료율 9.5%는 1월 1일부터 12월 31일까지 같아서, 상한에 걸리지 않는 대부분의 가입자는 1월과 7월 보험료가 똑같습니다.
                </p>
              </div>

              <div>
                <h2 className="mb-3 text-2xl font-bold">직장가입자 vs 지역가입자, 뭐가 다른가?</h2>
                <p className="mb-4 text-base text-text-primary" data-speakable>
                  직장가입자는 회사가 절반을 내주지만, 지역가입자는 전액 본인이 냅니다. 계산 방식도 다릅니다.
                </p>
                <table className="w-full border-collapse text-sm">
                  <caption className="mb-2 text-left text-sm font-semibold text-text-primary">직장가입자 vs 지역가입자 비교</caption>
                  <thead>
                    <tr className="border-b border-border-base">
                      <th scope="col" className="py-2 text-left font-semibold text-text-primary">항목</th>
                      <th scope="col" className="py-2 text-left font-semibold text-text-primary">직장가입자</th>
                      <th scope="col" className="py-2 text-left font-semibold text-text-primary">지역가입자</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-border-base hover:bg-bg-card">
                      <td className="py-2 text-text-primary">부담 비율</td>
                      <td className="py-2 text-text-primary">근로자 4.75% + 사업주 4.75%</td>
                      <td className="py-2 text-text-primary">본인 9.5% 전액</td>
                    </tr>
                    <tr className="border-b border-border-base hover:bg-bg-card">
                      <td className="py-2 text-text-primary">소득 기준</td>
                      <td className="py-2 text-text-primary">사업주가 신고한 보수월액</td>
                      <td className="py-2 text-text-primary">개인 신고 사업소득</td>
                    </tr>
                    <tr className="border-b border-border-base hover:bg-bg-card">
                      <td className="py-2 text-text-primary">계산 방식</td>
                      <td className="py-2 text-text-primary">월 소득 × 9.5%</td>
                      <td className="py-2 text-text-primary">공단 산정 기준소득 반영</td>
                    </tr>
                    <tr className="hover:bg-bg-card">
                      <td className="py-2 text-text-primary">납부 기간</td>
                      <td className="py-2 text-text-primary">재직 중 계속 납부</td>
                      <td className="py-2 text-text-primary">소득 유무 관계없이 납부</td>
                    </tr>
                  </tbody>
                </table>
                <p className="mt-4 text-sm text-text-secondary">
                  주의: 지역가입자는 소득뿐 아니라 재산도 반영될 수 있으며, 전년도 소득을 기준으로 당해연도 보험료가 산정됩니다. 정확한 금액은 국민연금공단 홈페이지의 "내 보험료" 메뉴에서 확인할 수 있습니다.
                </p>
              </div>

              <div>
                <h2 className="mb-3 text-2xl font-bold">기준소득월액 상한액, 초과하면 어떻게 되나?</h2>
                <p className="mb-4 text-base text-text-primary" data-speakable>
                  월 소득이 기준소득월액 상한액을 넘으면 초과 부분은 보험료 계산에 반영하지 않습니다. 즉, "최대 보험료"가 정해져 있다는 뜻입니다. 2026년에는 보험료율이 1년 내내 9.5%로 같지만, 상한만 7월에 상향됩니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="mb-3 text-sm font-semibold text-text-primary">기준소득월액 상한액 변경</p>
                  <ul className="space-y-2 text-sm text-text-primary">
                    <li><strong>2026년 1월~6월</strong>: 637만원 (최대 보험료: 637만원 × 9.5% = 60만5,150원, 직장 본인 30만2,575원)</li>
                    <li><strong>2026년 7월~2027년 6월</strong>: 659만원 (최대 보험료: 659만원 × 9.5% = 62만6,050원, 직장 본인 31만3,025원)</li>
                  </ul>
                </div>
                <div className="mt-4 space-y-2 rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="text-sm font-semibold text-text-primary">예시: 월급 1,000만원인 경우</p>
                  <div className="text-sm text-text-primary">
                    <p className="mb-1">실제 월급: 1,000만원 → 상한에 걸림</p>
                    <p>2026년 1~6월: 637만원 × 9.5% = 60만5,150원 (본인 30만2,575원)</p>
                    <p>2026년 7월~: 659만원 × 9.5% = 62만6,050원 (본인 31만3,025원)</p>
                    <p className="text-text-secondary">상한을 넘은 소득분은 보험료 계산에 영향을 주지 않습니다.</p>
                  </div>
                </div>
                <p className="mt-4 text-sm text-text-secondary">
                  주의: 국민연금은 재분배 제도이므로, 고소득자는 상한으로 보험료가 제한되는 대신 연금 수령 시에도 상한 범위 안에서 산정됩니다.
                </p>
              </div>

              <div>
                <h2 className="mb-3 text-2xl font-bold">국민연금 보험료로 세금을 줄일 수 있나?</h2>
                <p className="mb-4 text-base text-text-primary" data-speakable>
                  네, 국민연금 보험료는 <strong>소득공제</strong> 대상입니다(소득세법 제51조의3). 종합소득세를 계산할 때 총소득에서 보험료를 차감할 수 있습니다.
                </p>
                <div className="space-y-3">
                  <div className="rounded-lg border border-border-base bg-bg-card p-4">
                    <p className="mb-2 text-sm font-semibold text-text-primary">직장인 연봉 5,000만원 예시 (간단 계산)</p>
                    <div className="space-y-1 text-sm text-text-primary">
                      <p>월 보수 약 416만6,000원 (연봉 ÷ 12)</p>
                      <p>본인 부담 월 보험료: 약 416만6,000원 × 4.75% = 약 19만8,000원</p>
                      <p>연간 본인 부담 보험료: 약 19만8,000원 × 12 = 약 237만6,000원</p>
                      <p>종합소득 과세표준에서 237만6,000원 소득공제</p>
                      <p className="text-text-secondary">→ 소득세율 15% 가정 시 약 35만6,000원 절세 효과</p>
                    </div>
                  </div>
                </div>
                <p className="mt-4 text-sm text-text-secondary">
                  주의: 소득공제 대상은 근로자 본인 부담분(4.75%)에 한하며, 사업주 부담분은 공제 대상이 아닙니다. 실제 절세 효과는 종합소득세 구간(누진세율 6~45%)과 다른 공제(근로소득공제, 부양가족공제 등)에 따라 달라집니다. 연말정산 시 국민연금 보험료 납부 내역이 자동으로 반영됩니다.
                </p>
              </div>

              <div>
                <h2 className="mb-3 text-2xl font-bold">프리랜서·자영업자는 국민연금을 어떻게 가입하나?</h2>
                <p className="mb-4 text-base text-text-primary" data-speakable>
                  직장이 없으면 지역가입자로 분류됩니다. 국민연금공단에 사업소득을 신고하면, 공단이 산정한 기준에 따라 보험료가 결정됩니다.
                </p>
                <ul className="space-y-2 rounded-lg border border-border-base bg-bg-card p-4 text-sm text-text-primary">
                  <li>
                    <strong>사업소득 신고</strong>: 국민연금공단 또는 세무서에 개인사업자 등록 후 사업소득 신고
                  </li>
                  <li>
                    <strong>기준소득 산정</strong>: 공단이 전년도 신고 사업소득을 기반으로 기준소득 결정
                  </li>
                  <li>
                    <strong>보험료 납부</strong>: 결정된 기준소득 × 9.5% 월 납부 (전액 본인 부담)
                  </li>
                  <li>
                    <strong>임의가입 옵션</strong>: 소득이 없거나 낮으면 임의가입 가능. 2026년 기준소득월액 하한 40만원 × 9.5% = 월 3만8,000원이 최저 보험료
                  </li>
                </ul>
                <p className="mt-4 text-sm text-text-secondary">
                  주의: 프리랜서가 회사와 "근로계약"을 맺으면 직장가입자로 전환되어야 합니다. 구분 기준은 업무의 자율성, 도구 소유, 장기 계약 여부 등을 종합 판단합니다.
                </p>
              </div>

              <div>
                <h2 className="mb-3 text-2xl font-bold">국민연금 수령액은 어떻게 정해지나?</h2>
                <p className="mb-4 text-base text-text-primary" data-speakable>
                  국민연금 수령액은 가입 기간, 가입 중 평균 소득, 수령 시작 나이에 따라 결정됩니다(국민연금법 제54조 이하). 보험료율 인상이 미래 수령액에 미치는 영향은 "보험료 인상 → 더 높은 연금" 관계입니다.
                </p>
                <div className="space-y-3">
                  <div className="rounded-lg border border-border-base bg-bg-card p-4">
                    <p className="mb-2 text-sm font-semibold text-text-primary">국민연금 수령 시작 나이</p>
                    <ul className="space-y-1 text-sm text-text-primary">
                      <li>• <strong>1969년 이후 출생</strong>: 65세부터 수령 가능</li>
                      <li>• <strong>조기수령</strong>: 60세부터 가능, 월 수령액 6% 감액 (1년에 6%)</li>
                      <li>• <strong>연기수령</strong>: 70세까지 연기 가능, 월 수령액 7.2% 증액 (1년에 7.2%)</li>
                    </ul>
                  </div>
                </div>
                <p className="mt-4 text-sm text-text-secondary">
                  정확한 예상 수령액은 국민연금공단 홈페이지의 "연금 수령액 조회" 메뉴에서 개인별로 확인할 수 있습니다.
                </p>
              </div>

              <FaqSection items={FAQ_ITEMS} />

              <div className="space-y-3 rounded-lg border border-border-base bg-bg-card p-4">
                <p className="text-sm font-semibold text-text-primary">관련 계산기</p>
                <ul className="space-y-2 text-sm">
                  <li>
                    <Link href="/calculator/salary/" className="text-primary-500 hover:underline">
                      → 연봉 실수령액 계산기: 4대보험 공제 포함한 세후 월급 확인
                    </Link>
                  </li>
                  <li>
                    <Link href="/calculator/freelancer-tax/" className="text-primary-500 hover:underline">
                      → 프리랜서 종합소득세 계산기: 사업소득 기반 세금 시뮬레이션
                    </Link>
                  </li>
                  <li>
                    <Link href="/guide/health-insurance-premium-2026/" className="text-primary-500 hover:underline">
                      → 건강보험료 2026 가이드: 국민연금과 함께 4대보험 이해하기
                    </Link>
                  </li>
                  <li>
                    <Link href="/calculator/severance/" className="text-primary-500 hover:underline">
                      → 퇴직금 계산기: 연금(DB/DC) 비교 및 최종 수령액 시뮬레이션
                    </Link>
                  </li>
                  <li>
                    <Link href="/guide/national-pension-2026/" className="text-primary-500 hover:underline">
                      → 국민연금 2026 개혁 가이드: 소득대체율·기금 전망
                    </Link>
                  </li>
                </ul>
              </div>

              <div className="space-y-2 border-t border-border-base pt-6 text-xs text-text-tertiary">
                <p>
                  <strong>작성 기준:</strong> 2026년 10월 14일 기준 국민연금공단 공식 자료 및 국민연금법 §88, 소득세법 §51의3
                </p>
                <p>
                  <strong>법조항 참고:</strong> 국민연금법 §88(보험료율), §73(지역가입자), §54(급여), 소득세법 §51의3(국민연금료 공제), 국민건강보험법 §75
                </p>
                <p>
                  <strong>주의:</strong> 이 콘텐츠는 일반 정보 제공 목적이며, 개인의 세무·연금 상담은 국민연금공단 또는 세무사와 상의하시기 바랍니다.
                </p>
                <p>
                  <strong>최종 수정:</strong> {DATE_MODIFIED}
                </p>
              </div>
            </article>

            <ShareButtons
              title="2026 국민연금 보험료 완전 정리, 계산법·상한액·직장/지역 차이"
              url={URL}
              description="국민연금 보험료 2026년 9.5%, 기준소득월액 상한 659만원. 직장·지역가입자 계산과 절세 방법."
            />
          </main>
        </div>
        <Footer />
      </div>
    </>
  );
}
