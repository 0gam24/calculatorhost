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

const URL = 'https://calculatorhost.com/guide/deemed-input-tax-credit-2026/';
const DATE_PUBLISHED = '2026-07-25';
const DATE_MODIFIED = '2026-07-25';
// 북극성 수익 레버: [revenue-lever: indexing+traffic] (신규 색인 표면 + 자영업자 부가세 절세 검색 의도 흡수)

export const metadata: Metadata = {
  title: '의제매입세액공제 2026, 음식점 공제율·한도·계산법 | calculatorhost',
  description:
    '음식점·카페가 면세 농수산물을 사면 매입세액이 없어도 일정액을 공제받습니다. 업종별 공제율(8/108·9/109·6/106), 한도 계산, 준비 서류를 부가가치세법 §42 기준으로 정리했습니다.',
  keywords: [
    '의제매입세액공제',
    '음식점 부가세 환급',
    '의제매입세액 공제율',
    '면세 농산물 매입',
    '의제매입 한도',
    '카페 부가세 절세',
    '부가가치세법 42조',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '의제매입세액공제 2026, 음식점 공제율·한도·계산법' }],
    title: '의제매입세액공제 2026, 면세 농산물 사고 부가세 돌려받기',
    description: '음식점·카페의 면세 농수산물 매입 절세. 업종별 공제율과 한도, 준비 서류까지.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '의제매입세액공제 2026, 음식점 부가세 절세 정리',
    description: '공제율 8/108·9/109·6/106, 한도 계산법, 준비 서류. 부가가치세법 §42.',
  },
};

const FAQ_ITEMS = [
  {
    question: '의제매입세액공제가 정확히 무엇인가요?',
    answer:
      '면세로 사들인 농수산물 등의 가액 일부를 매입세액으로 본다는 제도입니다(부가가치세법 §42). 쌀·채소·육류·생선 같은 면세 농수산물은 살 때 부가세가 없어 매입세액도 없지만, 이를 재료로 과세 음식·가공품을 팔면 부가세를 냅니다. 그 불균형을 완화하려고 매입액에 일정 공제율을 곱한 금액을 매출세액에서 빼주는 것입니다.',
  },
  {
    question: '어떤 사업자가 공제받을 수 있나요?',
    answer:
      '면세 농수산물 등을 원재료로 사서 과세 재화·용역을 만드는 일반과세자입니다. 대표적으로 음식점, 카페, 제과점, 정육점, 반찬가게, 식품 제조업이 해당합니다. 간이과세자와 면세사업자는 원칙적으로 대상이 아닙니다. 세금계산서·계산서·신용카드매출전표 등 매입 증빙이 있어야 합니다.',
  },
  {
    question: '음식점의 공제율은 얼마인가요?',
    answer:
      '개인 음식점은 매입가액의 8/108(약 7.4%)이 기본입니다. 다만 과세표준 2억원 이하 개인 음식점은 한시 특례로 9/109(약 8.3%)가 적용되어 왔습니다. 법인 음식점은 6/106(약 5.7%)입니다. 특례 적용 여부와 연장은 매년 달라질 수 있으므로 국세청·홈택스에서 확인하세요.',
  },
  {
    question: '공제에 한도가 있나요?',
    answer:
      '있습니다. 면세 매입액에 공제율을 곱한 금액과, 과세표준에 한도율과 공제율을 곱한 금액 중 작은 값만 공제됩니다. 즉 매출 대비 면세 매입 비중이 지나치게 크면 한도에 걸려 전액을 공제받지 못합니다. 한도율은 과세표준 구간·업종·개인/법인에 따라 다르고 개정이 잦으므로, 정확한 적용률은 신고 시점의 국세청 고시를 확인해야 합니다.',
  },
  {
    question: '어떤 서류를 준비해야 하나요?',
    answer:
      '면세 매입을 증명하는 계산서, 신용카드매출전표, 현금영수증 등을 보관해야 합니다. 부가세 신고 때 의제매입세액공제신고서와 매입처별 계산서합계표(또는 신용카드 등 수령명세서)를 함께 제출합니다. 농어민에게 직접 산 경우에도 정해진 요건을 갖추면 인정되지만 증빙 요건이 까다로우니 주의하세요.',
  },
  {
    question: '농어민에게 직접 사도 공제가 되나요?',
    answer:
      '제조업 등 일부 업종은 농어민에게 직접 구입한 면세 농수산물도 공제 대상이 될 수 있습니다. 다만 음식점업은 원칙적으로 계산서 등 정규 증빙이 있는 매입만 인정되는 등 업종별 요건이 다릅니다. 직접 구입분 인정 여부는 업종과 증빙에 따라 갈리므로 관할 세무서에서 확인하는 것이 안전합니다.',
  },
  {
    question: '2026년에 무엇이 달라지나요?',
    answer:
      '자영업자 세부담과 관련해 의제매입세액공제 한도율을 축소하는 방향의 개정 논의가 이어져 왔습니다. 공제율 자체보다 한도율이 조정 대상으로 거론됩니다. 확정된 적용 한도율은 신고 시점의 국세청 고시·홈택스 안내를 반드시 확인하고, 불확실하면 세무대리인과 상담하세요.',
  },
  {
    question: '공제받은 재료를 안 팔고 남기면 어떻게 되나요?',
    answer:
      '의제매입세액공제는 실제로 과세사업에 사용·판매한 면세 재료를 전제로 합니다. 공제받은 뒤 해당 재료를 면세사업에 전용하거나 폐기 등으로 과세 매출에 쓰지 않으면, 공제분을 다시 납부(추징)해야 할 수 있습니다. 재고와 사용 내역을 관리해 두는 것이 좋습니다.',
  },
];

export default function DeemedInputTaxCredit2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '의제매입세액공제 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '의제매입세액공제 2026, 음식점 공제율·한도·계산법 완벽 정리',
    description:
      '면세 농수산물을 사는 음식점·카페·제조업의 부가세 절세. 업종별 공제율, 한도 계산, 준비 서류를 부가가치세법 §42 기준으로 정리.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['의제매입세액공제', '음식점', '공제율', '부가가치세법 42조', '면세 농산물'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '의제매입세액공제 2026',
    description: '음식점·카페·제조업의 면세 농수산물 매입 부가세 절세 제도 정리.',
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
                    { name: '의제매입세액공제 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">음식점·카페 자영업자 · 8분 읽기 · 2026-07-25</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  의제매입세액공제 2026
                  <br />
                  <span className="text-2xl text-text-secondary">면세 농산물 사고 부가세 돌려받기</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  음식점이나 카페를 하면 쌀·채소·고기·생선 같은 면세 농수산물을 매일 사들입니다. 이 재료들은 살 때 부가세가 없어 매입세액도 잡히지 않지만, 음식을 팔 때는 부가세를 냅니다. 이 글은 그 불균형을 메워주는 의제매입세액공제가 무엇인지, 내 업종의 공제율은 얼마인지, 한도는 어떻게 걸리는지, 그리고 실제로 얼마를 돌려받는지 사장님 눈높이에서 정리합니다.
                </p>
              </header>

              <AdSlot slot="guide-deemed-input-tax-credit-2026-top" format="horizontal" />

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">의제매입세액공제란 무엇인가요?</h2>
                <p>
                  면세로 산 농수산물 가액의 일부를 매입세액으로 간주해 부가세에서 빼주는 제도입니다(부가가치세법 §42). 면세 농산물에는 원래 부가세가 붙지 않아 공제할 매입세액이 없지만, 그 재료로 과세 음식을 팔면 매출세액을 내야 합니다. 이 구조적 불이익을 완화하려고 매입액에 일정 공제율을 곱한 금액을 매출세액에서 공제해 줍니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">30초 요약</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    · 대상: 면세 농수산물을 원재료로 쓰는 일반과세 음식점·카페·제조업
                    <br />
                    · 공제액 = min(면세 매입액 × 공제율, 과세표준 × 한도율 × 공제율)
                    <br />
                    · 개인 음식점 공제율 8/108(과세표준 2억 이하 특례 9/109), 법인 6/106
                    <br />
                    · 신고: 부가세 신고 때 의제매입세액공제신고서 제출
                  </p>
                </div>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">공제율은 업종별로 얼마인가요?</h2>
                <p>
                  업종과 개인·법인 여부에 따라 공제율이 다릅니다. 아래 표는 부가가치세법 시행령 §84에 따른 주요 공제율입니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 업종별 의제매입세액 공제율 (부가가치세법 시행령 §84)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">구분</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">공제율</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">환산 비율</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">음식점업 개인 (일반)</td>
                        <td className="p-3"><strong>8/108</strong></td>
                        <td className="p-3">약 7.4%</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">음식점업 개인 (과세표준 2억 이하 특례)</td>
                        <td className="p-3"><strong>9/109</strong></td>
                        <td className="p-3">약 8.3%</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">음식점업 법인</td>
                        <td className="p-3"><strong>6/106</strong></td>
                        <td className="p-3">약 5.7%</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">제조업 중 과자점·도정·제분·떡류 개인</td>
                        <td className="p-3">6/106</td>
                        <td className="p-3">약 5.7%</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">그 밖 제조업 중소·개인</td>
                        <td className="p-3">4/104</td>
                        <td className="p-3">약 3.8%</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">그 밖의 사업자</td>
                        <td className="p-3">2/102</td>
                        <td className="p-3">약 2.0%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  다만 과세표준 2억원 이하 개인 음식점의 9/109 특례는 한시 규정으로, 적용 연장 여부가 해마다 달라질 수 있습니다. 신고 전 홈택스나 세무대리인을 통해 올해 적용 공제율을 확인하세요.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">공제 한도는 어떻게 정해지나요?</h2>
                <p>
                  공제받을 수 있는 금액에는 상한이 있습니다. 면세 매입액 기준으로 계산한 값과, 과세표준 기준으로 계산한 값 중 작은 쪽만 공제됩니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">공제 한도 공식</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    공제액 = min ( 면세 매입액 × 공제율 , 과세표준 × 한도율 × 공제율 )
                    <br />
                    한도율: 과세표준 구간·업종·개인/법인에 따라 다름
                  </p>
                </div>
                <p className="mt-4">
                  한도율은 과세표준이 작을수록 높게 설정되어 소규모 사업자에게 유리한 구조였습니다. 다만 자영업자 세제 개편 흐름 속에서 한도율을 축소하는 방향의 개정 논의가 이어져 왔습니다.
                </p>
                <p className="mt-4">
                  예외: 정확한 적용 한도율은 신고 시점의 국세청 고시에 따르며 개정될 수 있으므로, 이 글에서는 특정 한도율 수치를 단정하지 않습니다. 홈택스 신고 화면이나 세무대리인을 통해 올해 적용 한도율을 확인하세요.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">실제로 얼마나 돌려받나요?</h2>
                <p>
                  두 가지 사례로 공제액이 어떻게 나오는지 확인해보세요. 과세표준 2억원 경계에서 공제율이 바뀌는 점도 함께 봅니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 1. 과세표준 2억 이하 개인 음식점 (특례 9/109)</p>
                  <p className="text-sm text-text-secondary">
                    · 반기 과세표준(매출): 1.5억원
                    <br />
                    · 면세 농수산물 매입액: 3,000만원
                    <br />
                    · 매입 기준 공제액: 3,000만원 × 9/109 = 약 247.7만원
                    <br />
                    · 이 값이 과세표준 기준 한도 이내라면 그대로 공제
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 면세 매입 3,000만원으로 약 247만원의 부가세를 줄일 수 있습니다.</span>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 2. 과세표준 2억 초과 개인 음식점 (일반 8/108)</p>
                  <p className="text-sm text-text-secondary">
                    · 반기 과세표준(매출): 2.1억원 (경계 초과)
                    <br />
                    · 면세 농수산물 매입액: 3,000만원
                    <br />
                    · 매입 기준 공제액: 3,000만원 × 8/108 = 약 222.2만원
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 같은 매입액이라도 과세표준이 2억원을 넘으면 특례(9/109)가 아닌 일반(8/108)이 적용되어 공제액이 약 25만원 줄어듭니다.</span>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 3. 한도에 걸리는 경우</p>
                  <p className="text-sm text-text-secondary">
                    · 면세 매입액이 매출 대비 지나치게 큰 경우
                    <br />
                    · 매입 기준 공제액이 과세표준 기준 한도(과세표준 × 한도율 × 공제율)를 초과
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 이때는 한도만큼만 공제됩니다. 매출 대비 면세 매입 비중이 큰 업장은 한도 계산을 반드시 함께 확인해야 합니다.</span>
                  </p>
                </div>
              </section>

              <AdSlot slot="guide-deemed-input-tax-credit-2026-mid" format="rectangle" />

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">공제받으려면 무엇을 준비하나요?</h2>
                <p>
                  증빙 관리가 핵심입니다. 아래 순서로 준비하면 신고 때 누락 없이 공제받을 수 있습니다.
                </p>
                <ul className="space-y-3 ml-6 list-decimal text-text-secondary">
                  <li>면세 매입 증빙(계산서·신용카드매출전표·현금영수증)을 거래처별로 모읍니다.</li>
                  <li>부가세 신고 때 의제매입세액공제신고서를 작성합니다.</li>
                  <li>매입처별 계산서합계표 또는 신용카드 등 수령명세서를 함께 제출합니다.</li>
                  <li>홈택스 전자신고 시 관련 서식이 연동되므로 매입 내역을 정확히 입력합니다.</li>
                </ul>
                <p className="mt-4">
                  다만 증빙 없는 매입은 공제되지 않습니다. 특히 현금으로 산 재래시장 농수산물은 증빙을 챙기기 어려우니, 가능하면 계산서나 카드 결제로 남겨 두는 습관이 절세로 이어집니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">자주 하는 실수와 주의점</h2>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li>
                    <strong>간이과세자 착오:</strong> 간이과세자는 원칙적으로 의제매입세액공제 대상이 아닙니다. 일반과세자만 해당합니다.
                  </li>
                  <li>
                    <strong>한도 무시:</strong> 매입 기준 공제액만 계산하고 과세표준 기준 한도를 확인하지 않으면 과다 공제로 이어질 수 있습니다.
                  </li>
                  <li>
                    <strong>사후 전용:</strong> 공제받은 면세 재료를 과세 매출에 쓰지 않고 면세사업 전용·폐기하면 공제분을 추징당할 수 있습니다.
                  </li>
                  <li>
                    <strong>증빙 미보관:</strong> 계산서 등 증빙을 보관하지 않으면 사후 확인 시 공제가 부인될 수 있으니 5년간 보관하세요.
                  </li>
                </ul>
              </section>

              <h2 className="text-2xl font-bold mb-6">자주 묻는 질문</h2>
              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h3 className="text-lg font-semibold text-text-primary">관련 계산기 및 가이드</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link
                    href="/guide/simplified-taxation-vat-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">간이과세 부가세 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">간이과세와 일반과세의 부가세 차이를 이해하세요.</p>
                  </Link>
                  <Link
                    href="/guide/vat-non-deductible-input-tax-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">부가세 매입세액 불공제</div>
                    <p className="mt-1 text-sm text-text-secondary">공제되지 않는 매입세액의 유형을 확인하세요.</p>
                  </Link>
                  <Link
                    href="/guide/credit-card-sales-vat-deduction-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">신용카드 매출세액공제</div>
                    <p className="mt-1 text-sm text-text-secondary">카드 매출 사업자의 또 다른 부가세 절세.</p>
                  </Link>
                  <Link
                    href="/guide/business-registration-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">사업자등록 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">일반·간이 과세 유형 선택부터 시작하세요.</p>
                  </Link>
                  <Link
                    href="/guide/simplified-taxpayer-july-vat-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">간이과세자 7월 부가세</div>
                    <p className="mt-1 text-sm text-text-secondary">7월 부가세 신고 시즌 체크리스트.</p>
                  </Link>
                  <Link
                    href="/category/tax/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">모든 세금 가이드</div>
                    <p className="mt-1 text-sm text-text-secondary">부가세·종합소득세·양도세 모음.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 교육 목적으로 작성되었으며 개인 맞춤 세무 조언이 아닙니다. 실제 공제율·한도율·공제 가능액은 업종, 과세표준, 신고 시점의 법령에 따라 달라지므로 관할 세무서, 세무대리인, 홈택스(hometax.go.kr)에서 반드시 확인하세요. 특히 2026년 한도율은 개정 논의가 있어 이 글에서는 특정 수치를 단정하지 않았습니다. 본 콘텐츠는 2026-07-25 기준이며, 인용한 법조항은 <strong>부가가치세법 §42(면세농산물등 의제매입세액 공제특례), 같은 법 시행령 §84</strong>입니다. AI 보조 작성 후 운영자 검수 완료.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터(부가가치세법)</a>,{' '}
                  <a href="https://www.nts.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">국세청</a>,{' '}
                  <a href="https://www.hometax.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">홈택스</a>.
                </p>
              </section>

              <ShareButtons
                title="의제매입세액공제 2026 가이드"
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
