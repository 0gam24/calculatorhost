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

const URL = 'https://calculatorhost.com/guide/bookkeeping-obligation-double-entry-vs-simple-2026/';
const DATE_PUBLISHED = '2026-07-14';
const DATE_MODIFIED = '2026-07-14';

export const metadata: Metadata = {
  title: '복식부기 vs 간편장부 2026, 기장의무 기준과 무기장가산세',
  description:
    '개인사업자·프리랜서 기장의무 구분법. 업종별 수입금액 기준(3억/1.5억/7,500만원)과 복식부기·간편장부 차이, 무기장가산세 20% 계산법까지 사례로 정리(소득세법 160조).',
  keywords: [
    '복식부기의무자',
    '간편장부대상자',
    '기장의무',
    '무기장가산세',
    '프리랜서 장부',
    '개인사업자 장부',
    '추계신고',
    '소득세법 160조',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '복식부기 vs 간편장부 2026, 기장의무 기준과 무기장가산세' }],
    title: '복식부기 vs 간편장부 2026, 기장의무 기준과 무기장가산세',
    description: '업종별 직전연도 수입금액에 따라 결정되는 기장의무. 복식부기와 간편장부의 차이, 무기장 시 산출세액 20% 가산세까지.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '복식부기 vs 간편장부 2026, 기장의무 기준과 무기장가산세',
    description: '개인사업자·프리랜서 기장의무 완전정리. 업종별 수입금액 기준과 무기장가산세 20%.',
  },
};

const FAQ_ITEMS = [
  {
    question: '복식부기의무자와 간편장부대상자는 어떻게 구분하나요?',
    answer:
      '직전 과세기간의 수입금액을 기준으로 구분합니다(소득세법 §160, 시행령 §208). 업종별 기준선은 도소매·부동산매매업 3억원, 제조·건설·음식점업 1억 5천만원, 부동산임대·전문서비스·개인서비스업 7,500만원입니다. 이 금액 이상이면 복식부기의무자, 미만이면 간편장부대상자가 됩니다. 다만 의사·변호사 등 전문직 사업자는 수입금액과 무관하게 복식부기의무자로 분류됩니다.',
  },
  {
    question: '프리랜서는 어느 쪽에 해당하나요?',
    answer:
      '프리랜서는 대부분 인적용역 개인서비스업으로 분류되어 직전연도 수입 7,500만원이 기준선입니다. 예를 들어 디자이너·강사·작가·번역가·프로그래머 프리랜서라면 직전 수입 7,500만원 이상 시 복식부기의무자, 미만이면 간편장부대상자가 됩니다. 다만 활동 형태에 따라 인적용역 사업소득과 기타소득이 갈릴 수 있으니, 국세청 홈택스에서 본인 업종코드를 반드시 확인하세요.',
  },
  {
    question: '무기장가산세는 얼마인가요?',
    answer:
      '복식부기의무자가 장부 없이 추계신고하면 무신고가산세와 무기장 관련 불이익이 동시에 부과됩니다. 간편장부대상자가 장부를 작성하지 않으면 산출세액에 무기장 소득금액 비율을 곱한 값의 20%가 무기장가산세로 부과됩니다(소득세법 §160 및 관련 가산세 규정). 산출세액 300만원 전액이 무기장 소득에서 나온 경우 가산세는 60만원 수준입니다.',
  },
  {
    question: '소규모사업자(4,800만원 미만)는 정말 가산세를 면제받나요?',
    answer:
      '네, 직전연도 수입금액이 4,800만원 미만인 소규모사업자는 무기장가산세 대상에서 제외됩니다. 예를 들어 부업 프리랜서가 연 4,000만원을 벌었다면 장부를 쓰지 않고 추계신고해도 가산세가 부과되지 않습니다. 다만 이는 가산세 면제일 뿐, 장부를 작성하면 실제 경비를 인정받아 세금이 더 줄어들 수 있으므로 소규모라도 간편장부 작성이 유리한 경우가 많습니다.',
  },
  {
    question: '신규 개업 첫 해에는 어떻게 되나요?',
    answer:
      '신규 개업 사업자는 해당 과세기간 수입금액이 복식부기 기준 이상이 아니라면 첫 해에는 간편장부대상자로 시작합니다. 즉 개업 첫 해 매출이 크지 않다면 간편장부만 작성해도 무방합니다. 다만 첫 해 수입이 이미 업종별 복식부기 기준(예: 서비스업 7,500만원)을 넘겼다면 첫 해부터 복식부기의무자로 취급될 수 있으니 개업 초부터 회계 프로그램 도입을 권장합니다.',
  },
  {
    question: '기장을 하면 어떤 이점이 있나요?',
    answer:
      '가장 큰 이점은 결손금 이월공제입니다. 사업 첫 해에 적자가 나면 그 손실을 향후 15년간 사업소득에서 공제할 수 있어 장기적 세금이 크게 줄어듭니다. 또한 실제 지출한 경비를 100% 인정받아 추계신고보다 과세표준이 낮아지는 경우가 많습니다. 반면 무기장으로 추계신고하면 기준경비율·단순경비율로 경비를 추정하는데, 실제 지출이 이보다 많은 사업자는 오히려 세금을 더 내게 됩니다.',
  },
  {
    question: '간편장부만 써도 문제가 없나요?',
    answer:
      '간편장부대상자라면 간편장부 작성만으로도 세법상 의무를 이행한 것으로 인정됩니다. 국세청이 무료로 제공하는 간편장부 양식은 수입·비용·자산 증감을 날짜별로 기록하는 단순한 형태로, 엑셀이나 회계 앱으로 어렵지 않게 관리할 수 있습니다. 다만 매출 규모가 복식부기 기준선에 근접하고 있다면 미리 복식부기 체제로 전환해 두는 것이 다음 해 대비에 안전합니다.',
  },
  {
    question: '전문직 사업자는 왜 수입금액과 무관하게 복식부기인가요?',
    answer:
      '의사·변호사·회계사·세무사·법무사·감정평가사·건축사 등 전문직 사업자는 소득세법 시행령 §208에 따라 수입금액과 관계없이 복식부기의무자로 분류됩니다. 이는 자격 기반 고소득 업종에 대해 회계 투명성을 강화하려는 정책 판단입니다. 따라서 신규 개업한 전문직도 첫 해부터 복식부기 장부를 갖추고 세무대리인을 선임하는 것이 일반적입니다.',
  },
];

export default function BookkeepingObligation2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '복식부기 vs 간편장부 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '복식부기 vs 간편장부 2026, 기장의무 기준과 무기장가산세',
    description:
      '개인사업자·프리랜서의 기장의무 구분법. 업종별 직전연도 수입금액 기준, 복식부기와 간편장부의 차이, 무기장가산세 20% 계산 사례, 결손금 이월공제까지 사례 중심으로 정리.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['복식부기의무자', '간편장부대상자', '기장의무', '무기장가산세', '프리랜서 장부', '소득세법 160조'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '복식부기 vs 간편장부 2026',
    description:
      '개인사업자·프리랜서 기장의무 완전정리. 업종별 수입금액 기준(3억/1.5억/7,500만원)과 무기장가산세 20%.',
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
                    { name: '복식부기 vs 간편장부 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">개인사업자·프리랜서 · 9분 읽기 · 2026-07-14</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  복식부기 vs 간편장부 2026
                  <br />
                  <span className="text-2xl text-text-secondary">개인사업자·프리랜서 기장의무 완전정리</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  종합소득세 신고 시즌이 되면 프리랜서와 개인사업자가 가장 먼저 부딪히는 질문이 있습니다. 나는 복식부기의무자인가, 간편장부대상자인가. 이 구분이 왜 중요한지, 업종별 기준선은 정확히 얼마인지, 그리고 장부를 쓰지 않았을 때 부과되는 무기장가산세 20%가 어떻게 계산되는지까지 사례 중심으로 정리해 드립니다.
                </p>
              </header>

              <AdSlot slot="guide-bookkeeping-obligation-double-entry-vs-simple-2026-top" format="horizontal" />

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">기장의무란 무엇인가</h2>
                <p>
                  기장의무는 사업자가 소득금액을 정확히 계산하고 신고하기 위해 장부를 비치·기장할 법적 의무를 말합니다. 소득세법 §160은 사업자가 그 사업에 관한 모든 거래사실을 객관적으로 파악할 수 있도록 장부를 갖추도록 규정하고 있습니다. 이 의무는 개인사업자와 프리랜서(인적용역 사업자) 모두에게 적용됩니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">기장의무의 두 갈래</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    · 복식부기의무자: 자산·부채·자본 변동을 대변·차변으로 기록하는 회계 방식
                    <br />
                    · 간편장부대상자: 수입·비용·자산 증감을 날짜별로 단순 기록
                    <br />
                    · 구분 기준: 직전 과세기간의 수입금액(소득세법 시행령 §208)
                  </p>
                </div>
                <p className="mt-4">
                  다만 두 방식 중 어느 쪽에 해당하는지는 사업자가 선택하는 것이 아니라, 직전연도 매출 규모와 업종에 따라 법령이 자동으로 정해 줍니다. 자신이 어느 쪽인지 모르고 신고했다가는 무기장가산세 폭탄을 맞을 수 있으니 반드시 확인해야 합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">업종별 수입금액 기준선 (소득세법 시행령 §208)</h2>
                <p>
                  복식부기의무자와 간편장부대상자를 나누는 기준은 업종별로 다릅니다. 직전 과세기간의 수입금액이 아래 기준 이상이면 복식부기의무자, 미만이면 간편장부대상자입니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 업종별 복식부기의무자 판정 기준 (소득세법 시행령 §208, 2026 기준)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">업종군</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">대표 업종</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">기준 수입금액</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">1군</td>
                        <td className="p-3">농·임·어업, 도매·소매업, 부동산매매업</td>
                        <td className="p-3"><strong>3억원 이상</strong></td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">2군</td>
                        <td className="p-3">제조업, 숙박·음식점업, 건설업, 운수업, 정보통신업, 금융·보험업</td>
                        <td className="p-3"><strong>1억 5천만원 이상</strong></td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">3군</td>
                        <td className="p-3">부동산임대업, 전문·과학·기술서비스업, 교육서비스업, 보건업, 개인서비스업</td>
                        <td className="p-3"><strong>7,500만원 이상</strong></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  주의할 점은 판정 기준이 &lsquo;당해 연도&rsquo;가 아니라 &lsquo;직전 과세기간&rsquo;이라는 것입니다. 즉 2025년 수입이 8,000만원인 서비스업 프리랜서는 2026년에 복식부기의무자로 신고해야 합니다.
                </p>
                <p className="mt-4">
                  다만 의사·변호사·회계사·세무사·법무사·감정평가사·건축사 등 전문직 사업자는 이 기준선과 무관하게 복식부기의무자로 분류됩니다. 첫 해 매출이 아무리 적어도 복식부기 장부를 갖춰야 합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">복식부기 vs 간편장부, 무엇이 다른가</h2>
                <p>
                  두 장부 방식은 기록 방식, 필요 서류, 신고 시 첨부 항목이 모두 다릅니다. 아래 표로 핵심 차이를 확인해 보세요.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 2. 복식부기와 간편장부 비교</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">구분</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">복식부기</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">간편장부</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">기록 방식</td>
                        <td className="p-3">대변·차변 이중 기입</td>
                        <td className="p-3">날짜별 단순 기록</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">필요 서류</td>
                        <td className="p-3">재무상태표, 손익계산서, 조정계산서</td>
                        <td className="p-3">간편장부, 총수입금액명세서</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">난이도</td>
                        <td className="p-3">회계 지식 필요, 세무사 위탁 일반적</td>
                        <td className="p-3">엑셀·앱으로 자가 작성 가능</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">결손금 이월공제</td>
                        <td className="p-3">향후 15년 공제 가능</td>
                        <td className="p-3">가능(장부 작성 시)</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">무기장 시 가산세</td>
                        <td className="p-3">무신고 취급 + 무기장 불이익</td>
                        <td className="p-3">산출세액 관련분의 20%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  ⚠️ 다만 간편장부대상자라도 복식부기로 신고하는 것은 언제든 가능하며, 오히려 기장세액공제(연 100만원 한도) 혜택을 받을 수 있습니다. 매출이 복식부기 기준선에 가까워지고 있다면 미리 전환해 두는 것이 유리합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">무기장가산세는 어떻게 계산되나</h2>
                <p>
                  장부를 갖추지 않고 추계신고(기준경비율·단순경비율로 경비를 추정하는 신고)를 하면 무기장가산세가 부과됩니다. 계산식은 다음과 같습니다(소득세법 §160 및 관련 가산세 규정).
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">간편장부대상자의 무기장가산세 공식</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    무기장가산세 = 산출세액 × (무기장 소득금액 / 종합소득금액) × 20%
                  </p>
                  <p className="mt-2 text-xs text-text-tertiary">
                    복식부기의무자가 장부 없이 추계신고하면 이 가산세와 별도로 무신고가산세(산출세액의 20% 또는 수입금액 기준액 중 큰 금액)가 함께 부과됩니다.
                  </p>
                </div>
                <p className="mt-4">
                  단 한 가지 예외가 있습니다. 직전연도 수입금액이 4,800만원 미만인 소규모사업자는 무기장가산세 대상에서 제외됩니다. 즉 부업 프리랜서나 초기 스타트업 사장님이 연 4,000만원 정도를 벌었다면 장부를 쓰지 않아도 가산세가 부과되지 않습니다.
                </p>
                <p className="mt-4">
                  ⚠️ 다만 소규모사업자 예외는 &lsquo;가산세 면제&rsquo;일 뿐 &lsquo;장부를 안 써도 유리&rsquo;라는 뜻은 아닙니다. 실제 경비 지출이 단순경비율보다 많다면 간편장부를 작성해 실제 경비를 인정받는 것이 세금 측면에서 더 이득입니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">계산 사례 3가지로 이해하기</h2>
                <p>
                  아래 세 가지 시나리오로 기장의무 판정과 가산세 계산을 확인해 보세요.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 1. 서비스업 프리랜서, 직전연도 수입 8,000만원</p>
                  <p className="text-sm text-text-secondary">
                    · 업종: 인적용역 개인서비스업(3군, 기준 7,500만원)
                    <br />
                    · 판정: 수입 8,000만원이 기준 7,500만원 이상, 복식부기의무자
                    <br />
                    · 상황: 장부 없이 추계신고, 산출세액 300만원
                    <br />
                    · 불이익: 무기장가산세 등 20% 부과 = 최소 <strong>60만원</strong>
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 7,500만원 기준선을 넘긴 순간 복식부기 체제 전환이 필요합니다. 세무사 위탁료가 60만원보다 저렴한 경우가 많습니다.</span>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 2. 도소매업 사업자, 직전연도 수입 2억원</p>
                  <p className="text-sm text-text-secondary">
                    · 업종: 도매·소매업(1군, 기준 3억원)
                    <br />
                    · 판정: 수입 2억원이 기준 3억원 미만, 간편장부대상자
                    <br />
                    · 상황: 간편장부만 작성해 신고
                    <br />
                    · 결과: 무기장가산세 <strong>없음</strong>, 실제 경비 100% 인정
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 도소매업은 기준선이 넉넉해 간편장부만으로도 충분합니다. 국세청 무료 간편장부 양식 활용 가능.</span>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 3. 소규모 프리랜서, 직전연도 수입 4,000만원</p>
                  <p className="text-sm text-text-secondary">
                    · 업종: 인적용역 개인서비스업(3군)
                    <br />
                    · 판정: 수입 4,800만원 미만 소규모사업자
                    <br />
                    · 상황: 장부 없이 단순경비율로 추계신고
                    <br />
                    · 결과: 무기장가산세 <strong>면제</strong>
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 소규모사업자 예외 적용. 다만 실제 경비가 단순경비율 추정치보다 많다면 간편장부 작성이 더 유리합니다.</span>
                  </p>
                </div>
              </section>

              <AdSlot slot="guide-bookkeeping-obligation-double-entry-vs-simple-2026-mid" format="rectangle" />

              <section className="space-y-6 border-t border-border-base pt-8" data-speakable>
                <h2 className="text-2xl font-bold">기장 시 진짜 이점은 결손금 이월공제</h2>
                <p>
                  많은 초보 사업자가 놓치는 기장의 가장 큰 혜택은 결손금 이월공제입니다. 사업 첫 해 적자가 났을 때 그 손실 금액을 향후 15년간 사업소득에서 차감할 수 있는 제도입니다(소득세법 §45).
                </p>
                <p className="mt-4">
                  예를 들어 창업 첫 해 3,000만원 적자가 났지만 장부를 갖췄다면, 다음 해 사업이 흑자 전환해 종합소득금액 5,000만원이 나왔을 때 3,000만원을 공제해 과세표준을 2,000만원으로 낮출 수 있습니다. 이 경우 절세 효과만 수백만원에 이릅니다.
                </p>
                <p className="mt-4">
                  반면 무기장으로 추계신고하면 아무리 큰 적자가 났어도 이월공제를 받을 수 없습니다. 기준경비율·단순경비율은 &lsquo;평균적 경비 추정&rsquo;이라 실제 결손금이 인정되지 않기 때문입니다.
                </p>
                <p className="mt-4">
                  ⚠️ 다만 결손금 이월공제는 &lsquo;기장&rsquo;을 전제로 하므로, 간편장부대상자라도 반드시 장부를 작성해야 이 혜택을 누릴 수 있습니다. 창업 초기라면 세무대리인 위탁이 어렵더라도 국세청 무료 간편장부 양식을 활용해 최소한의 기록을 남기세요.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">신규 개업 사업자, 첫 해는 어떻게 신고할까</h2>
                <p>
                  신규 개업 사업자는 직전연도 수입금액이 없으므로 원칙적으로 첫 해는 간편장부대상자로 시작합니다. 회계 지식이 없어도 국세청이 제공하는 간편장부 양식이나 홈택스 전자장부로 관리할 수 있습니다.
                </p>
                <p className="mt-4">
                  다만 첫 해 수입이 이미 업종별 복식부기 기준(예: 서비스업 7,500만원, 제조업 1억 5천만원)을 넘겼다면 첫 해부터 복식부기의무자로 취급될 수 있습니다. 신규 창업 예정이라면 개업 초기에 세무대리인과 상담해 장부 체계를 미리 정하는 것이 안전합니다.
                </p>
                <p className="mt-4">
                  ⚠️ 예외적으로 앞서 설명한 전문직 사업자(의사·변호사·세무사 등)는 신규 개업 첫 해부터 수입금액과 무관하게 복식부기의무자입니다. 개업 초부터 회계 프로그램과 세무대리인 선임을 고려해야 합니다.
                </p>
              </section>

              <h2 className="text-2xl font-bold mb-6">자주 묻는 질문</h2>
              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h3 className="text-lg font-semibold text-text-primary">관련 계산기 및 가이드</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link
                    href="/calculator/freelancer-tax/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">프리랜서 종합소득세 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">수입금액과 경비율로 세액을 즉시 시뮬레이션해 보세요.</p>
                  </Link>
                  <Link
                    href="/guide/freelancer-simplified-vs-standard-expense-rate-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">단순경비율 vs 기준경비율</div>
                    <p className="mt-1 text-sm text-text-secondary">무기장 추계신고 시 어느 경비율이 적용되는지 확인.</p>
                  </Link>
                  <Link
                    href="/guide/freelancer-take-home-3-3-percent-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">프리랜서 3.3% 원천징수</div>
                    <p className="mt-1 text-sm text-text-secondary">원천징수와 종합소득세 정산 관계 완전정리.</p>
                  </Link>
                  <Link
                    href="/guide/simplified-taxation-vat-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">간이과세자 부가세</div>
                    <p className="mt-1 text-sm text-text-secondary">간이과세와 일반과세 부가세 신고 차이.</p>
                  </Link>
                  <Link
                    href="/guide/n-jobber-comprehensive-income-tax-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">N잡러 종합소득세</div>
                    <p className="mt-1 text-sm text-text-secondary">직장인 부수입 신고와 기장 실무.</p>
                  </Link>
                  <Link
                    href="/category/tax/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">모든 세금 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">종합소득세·양도세·재산세 등 세금 계산기 모음.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 교육 목적으로 작성되었으며, 개인 맞춤형 세무 조언이 아닙니다. 실제 기장의무 판정, 무기장가산세 부과 여부, 세액 계산은 개별 사업자의 업종코드·수입 구조·신고 이력에 따라 달라질 수 있으므로 관할 세무서 또는 세무대리인과 반드시 상담하세요. 본 콘텐츠는 2026-07-14 기준으로 작성되었으며 세법 개정 시 즉시 업데이트됩니다. 인용 법조항: <strong>소득세법 §160(장부의 비치·기장), §70(종합소득 과세표준 확정신고), 소득세법 시행령 §208(복식부기의무자의 범위)</strong>. AI 보조 작성 후 운영자 검수 완료.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.nts.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">국세청</a>,{' '}
                  <a href="https://www.hometax.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">홈택스</a>,{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터</a>.
                </p>
              </section>

              <ShareButtons
                title="복식부기 vs 간편장부 2026 기장의무 가이드"
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
