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

const URL = 'https://calculatorhost.com/guide/reits-dividend-tax-2026/';
const DATE_PUBLISHED = '2026-07-25';
const DATE_MODIFIED = '2026-07-25';
// 북극성 수익 레버: [revenue-lever: indexing+traffic] (신규 색인 표면 + 리츠 배당 절세 검색 의도 흡수)

export const metadata: Metadata = {
  title: '리츠 배당금 세금 2026, 15.4% 원천징수와 절세법 | calculatorhost',
  description:
    '리츠(REITs) 배당금은 15.4%가 원천징수되고 연 2천만원을 넘으면 종합과세됩니다. 공모리츠 분리과세 특례, ISA·연금계좌 절세, 예금·일반주식과의 세금 비교를 소득세법 §17 기준으로 정리했습니다.',
  keywords: [
    '리츠 배당 세금',
    '리츠 배당소득세',
    'REITs 세금',
    '배당소득 분리과세',
    '금융소득 종합과세',
    '공모리츠 절세',
    '소득세법 17조',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '리츠 배당금 세금 2026, 15.4% 원천징수와 절세법' }],
    title: '리츠 배당금 세금 2026, 얼마 떼고 어떻게 아끼나',
    description: '리츠 배당 15.4% 원천징수, 2천만원 종합과세, 공모리츠 분리과세와 ISA 절세까지.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '리츠 배당금 세금 2026, 원천징수·종합과세·절세 정리',
    description: '15.4% 원천징수, 금융소득 2천만원 종합과세, 공모리츠·ISA 절세. 소득세법 §17.',
  },
};

const FAQ_ITEMS = [
  {
    question: '리츠 배당금에도 세금을 내나요?',
    answer:
      '네, 배당소득으로 15.4%가 원천징수됩니다(소득세 14% + 지방소득세 1.4%). 리츠는 부동산 임대·매각 수익을 배당으로 나눠주는데, 이 배당은 소득세법 §17의 배당소득에 해당합니다. 증권사가 배당 지급 시 세금을 미리 떼고 나머지를 계좌에 입금하므로, 소액 투자자는 대부분 별도 신고가 필요 없습니다.',
  },
  {
    question: '원천징수로 세금이 끝나나요?',
    answer:
      '연간 금융소득(이자+배당)이 2천만원 이하이면 원천징수로 납세가 종결됩니다(분리과세). 하지만 2천만원을 넘으면 초과분이 다른 소득과 합산돼 종합과세되므로 이듬해 5월 종합소득세 신고를 해야 합니다. 리츠 배당이 크거나 다른 배당·이자가 많은 투자자는 이 기준선을 넘는지 확인해야 합니다.',
  },
  {
    question: '금융소득 종합과세가 되면 세금이 얼마나 늘어나나요?',
    answer:
      '2천만원 초과분에 6~45% 누진세율이 적용됩니다(소득세법 §55). 다른 소득이 많은 고소득자는 지방세 포함 최고 49.5%까지 오를 수 있습니다. 다만 종합과세로 계산한 세액이 원천징수보다 적으면 낮은 쪽으로 과세하는 비교과세가 적용되므로, 무조건 세금이 폭증하는 것은 아닙니다.',
  },
  {
    question: '공모리츠는 세금 혜택이 있다던데요?',
    answer:
      '조세특례제한법상 공모리츠 배당소득 저율 분리과세 특례가 운영되어 왔습니다. 일정 기간(예: 3년) 보유하고 투자액 한도(예: 5천만원) 안에서 받은 배당은 9%(지방세 포함 9.9%)로 분리과세되는 방식입니다. 다만 요건·한도·일몰(적용 종료 시점)은 개정될 수 있으므로 투자 전 국세청·증권사 안내로 현재 적용 여부를 확인해야 합니다.',
  },
  {
    question: '상장 리츠와 공모 리츠는 세금이 다른가요?',
    answer:
      '기본 원천징수(15.4%)는 같습니다. 차이는 저율 분리과세 특례 적용 여부입니다. 특례 요건을 갖춘 공모·상장 리츠 배당은 낮은 세율로 분리과세될 수 있는 반면, 요건을 못 갖추면 일반 배당처럼 과세됩니다. 최근 상장 리츠에도 저율 분리과세를 확대하자는 논의가 있으나 확정 여부는 정부 발표를 확인하세요.',
  },
  {
    question: 'ISA 계좌로 리츠에 투자하면 뭐가 좋나요?',
    answer:
      'ISA(개인종합자산관리계좌) 안에서 발생한 배당은 계좌 순소득 기준으로 일정 한도까지 비과세되고, 한도 초과분도 9.9% 저율 분리과세됩니다. 리츠 배당을 ISA에서 받으면 15.4% 원천징수 대신 이 혜택을 받을 수 있어, 배당 재투자 투자자에게 유리합니다. 연금저축·IRP 계좌 활용도 과세이연 측면에서 검토할 만합니다.',
  },
  {
    question: '리츠 주가가 올라 팔면 양도세를 내나요?',
    answer:
      '국내 상장 리츠는 일반 상장주식과 같이 소액주주의 장내 매매차익은 현재 비과세입니다. 즉 배당에는 배당소득세가 붙지만, 상장 리츠를 사고팔아 생긴 차익에는 소액주주라면 양도세가 없습니다. 다만 대주주 요건에 해당하거나 비상장·해외 리츠라면 양도세 과세 대상이 될 수 있습니다.',
  },
  {
    question: '건강보험료에도 영향이 있나요?',
    answer:
      '금융소득이 연 1천만원을 넘으면 건강보험료 산정 소득에 반영될 수 있습니다. 특히 지역가입자나 피부양자는 배당·이자 소득이 커지면 보험료가 오르거나 피부양자 자격을 잃을 수 있으니, 배당 규모가 큰 투자자는 건보료 영향도 함께 점검하세요.',
  },
  {
    question: '배당을 받으면 따로 신고해야 하나요?',
    answer:
      '금융소득이 연 2천만원 이하이면 원천징수로 끝나 별도 신고가 없습니다. 2천만원을 초과하면 이듬해 5월 종합소득세 확정신고에 금융소득을 포함해야 합니다. 여러 증권사에 흩어진 배당·이자를 합산해 기준선을 넘는지 확인하는 것이 핵심입니다.',
  },
];

export default function ReitsDividendTax2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '리츠 배당금 세금 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '리츠 배당금 세금 2026, 15.4% 원천징수와 절세법 완벽 정리',
    description:
      '리츠(REITs) 배당의 15.4% 원천징수와 금융소득 종합과세, 공모리츠 분리과세 특례, ISA·연금 절세를 소득세법 §17 기준으로 정리.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['리츠', '배당소득세', '금융소득 종합과세', '소득세법 17조', '공모리츠'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '리츠 배당금 세금 2026',
    description: '리츠 배당의 원천징수·종합과세·분리과세 특례와 절세 계좌 활용법.',
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
                    { name: '리츠 배당금 세금 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">배당·부동산 투자자 · 8분 읽기 · 2026-07-25</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  리츠 배당금 세금 2026
                  <br />
                  <span className="text-2xl text-text-secondary">얼마 떼고 어떻게 아끼나</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  리츠(REITs)는 배당 수익을 노리고 들어가는 투자입니다. 그런데 배당을 받을 때마다 세금이 먼저 빠져나가고, 배당이 커지면 종합과세라는 복병도 있습니다. 이 글은 리츠 투자자를 위해 배당에서 세금이 얼마나 떼이는지, 언제 종합과세가 되는지, 공모리츠 분리과세와 ISA 같은 절세 방법은 무엇인지, 예금·일반 주식 배당과 비교해 정리합니다.
                </p>
              </header>

              <AdSlot slot="guide-reits-dividend-tax-2026-top" format="horizontal" />

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">리츠 배당금에도 세금을 내나요?</h2>
                <p>
                  네, 배당을 받을 때 15.4%가 원천징수됩니다. 리츠 배당은 소득세법 §17의 배당소득이며, 원천징수세율은 소득세 14%(§129)에 지방소득세 1.4%를 더한 15.4%입니다. 증권사가 세금을 먼저 떼고 나머지를 입금하므로, 소액 투자자는 대부분 신고 없이 납세가 끝납니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">30초 요약</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    · 기본: 배당 지급 시 15.4% 원천징수 (소득세 14% + 지방세 1.4%)
                    <br />
                    · 연 금융소득 2천만원 이하: 원천징수로 종결(분리과세)
                    <br />
                    · 연 금융소득 2천만원 초과: 초과분 종합과세(5월 신고)
                    <br />
                    · 절세: 공모리츠 저율 분리과세 특례, ISA·연금계좌 활용
                  </p>
                </div>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">금융소득 2천만원 넘으면 어떻게 되나요?</h2>
                <p>
                  연간 이자와 배당을 합한 금융소득이 2천만원을 넘으면 종합과세 대상이 됩니다(소득세법 §14). 2천만원까지는 15.4% 원천징수로 끝나지만, 초과분은 근로·사업 등 다른 소득과 합쳐 6~45% 누진세율로 다시 계산합니다.
                </p>
                <p>
                  다만 종합과세로 계산한 세액이 원천징수(15.4%)보다 적으면 낮은 쪽으로 과세하는 비교과세가 적용됩니다. 따라서 다른 소득이 적은 사람은 2천만원을 조금 넘어도 세부담이 크게 늘지 않을 수 있습니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="text-sm text-text-secondary">
                    예외: 2천만원 기준은 이자와 배당을 모두 합산한 금액입니다. 여러 증권사·은행에 흩어진 이자·배당을 반드시 합쳐서 판단해야 하며, 한 곳만 보고 안심하면 안 됩니다.
                  </p>
                </div>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">배당 세금, 직접 계산해보기</h2>
                <p>
                  아래 사례로 실제 손에 쥐는 금액과 종합과세 경계를 확인해보세요.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 1. 배당 100만원 (원천징수 종결)</p>
                  <p className="text-sm text-text-secondary">
                    · 세전 배당: 100만원
                    <br />
                    · 원천징수: 100만원 × 15.4% = 15.4만원
                    <br />
                    · 실수령: <strong>84.6만원</strong>
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 연 금융소득이 2천만원 이하면 이걸로 세금이 끝납니다. 추가 신고 없음.</span>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 2. 금융소득 2,500만원 (종합과세 경계 초과)</p>
                  <p className="text-sm text-text-secondary">
                    · 연 금융소득 합계: 2,500만원
                    <br />
                    · 2천만원까지: 15.4% 분리과세로 종결
                    <br />
                    · 초과 500만원: 다른 소득과 합산해 종합과세
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 초과분 500만원만 누진세율 대상. 다른 소득이 적으면 비교과세로 세부담 증가가 제한됩니다.</span>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 3. 금융소득 1,900만원 (경계 이하)</p>
                  <p className="text-sm text-text-secondary">
                    · 연 금융소득 합계: 1,900만원
                    <br />
                    · 2천만원 이하이므로 전액 15.4% 분리과세
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 종합과세 대상이 아닙니다. 2천만원 경계를 넘느냐가 신고 여부를 가릅니다.</span>
                  </p>
                </div>
              </section>

              <AdSlot slot="guide-reits-dividend-tax-2026-mid" format="rectangle" />

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">리츠 vs 예금·일반주식 배당 세금 비교</h2>
                <p>
                  같은 금융소득이라도 상품별로 절세 여지가 다릅니다. 아래 표로 비교해보세요.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 금융상품별 과세 비교 (2026 기준, 소액주주 가정)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">구분</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">기본 과세</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">매매차익</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">리츠 배당</td>
                        <td className="p-3">15.4% 원천징수, 2천만원 초과 종합과세</td>
                        <td className="p-3">국내 상장 소액주주 비과세</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">예금 이자</td>
                        <td className="p-3">15.4% 원천징수, 2천만원 초과 종합과세</td>
                        <td className="p-3">해당 없음</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">일반주식 배당</td>
                        <td className="p-3">15.4% 원천징수, 2천만원 초과 종합과세</td>
                        <td className="p-3">국내 상장 소액주주 비과세</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">공모리츠(특례 충족)</td>
                        <td className="p-3">한도 내 9.9% 분리과세 가능</td>
                        <td className="p-3">국내 상장 소액주주 비과세</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  다만 특례 적용 여부는 보유 기간·투자 한도 등 요건을 갖춰야 하며, 요건을 못 채우면 일반 배당과 동일하게 15.4%로 과세됩니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">세금 줄이는 계좌 활용법</h2>
                <p>
                  같은 리츠라도 어떤 계좌에서 담느냐에 따라 세부담이 달라집니다.
                </p>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li>
                    <strong>ISA 계좌:</strong> 계좌 내 순소득 일정액까지 비과세, 초과분도 9.9% 분리과세. 배당 재투자에 유리합니다.
                  </li>
                  <li>
                    <strong>연금저축·IRP:</strong> 계좌 내 배당은 인출 전까지 과세이연되고, 연금 수령 시 낮은 연금소득세율로 과세됩니다.
                  </li>
                  <li>
                    <strong>공모리츠 저율 분리과세 특례:</strong> 요건을 갖추면 한도 내 배당을 9.9%로 분리과세. 일반 계좌에서도 적용 가능하나 요건 확인이 필요합니다.
                  </li>
                </ul>
                <p className="mt-4">
                  예외: 절세 계좌마다 납입 한도, 의무 보유 기간, 중도해지 불이익이 있습니다. 무턱대고 몰아넣기보다 본인의 투자 기간과 자금 사정에 맞춰 배분하세요.
                </p>
              </section>

              <h2 className="text-2xl font-bold mb-6">자주 묻는 질문</h2>
              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h3 className="text-lg font-semibold text-text-primary">관련 계산기 및 가이드</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link
                    href="/guide/dividend-income-tax-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">배당소득세 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">배당소득 과세의 기본 원리를 이해하세요.</p>
                  </Link>
                  <Link
                    href="/guide/financial-income-comprehensive-vs-separate-taxation/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">금융소득 종합과세 vs 분리과세</div>
                    <p className="mt-1 text-sm text-text-secondary">2천만원 기준선의 의미를 자세히 살펴보세요.</p>
                  </Link>
                  <Link
                    href="/guide/isa-account-tax-benefit-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">ISA 계좌 세제 혜택</div>
                    <p className="mt-1 text-sm text-text-secondary">배당·이자 절세의 핵심 계좌를 활용하세요.</p>
                  </Link>
                  <Link
                    href="/guide/financial-income-health-insurance-premium-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">금융소득과 건강보험료</div>
                    <p className="mt-1 text-sm text-text-secondary">배당이 커질 때 건보료 영향을 점검하세요.</p>
                  </Link>
                  <Link
                    href="/guide/etf-tax-domestic-overseas-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">국내·해외 ETF 세금</div>
                    <p className="mt-1 text-sm text-text-secondary">리츠 ETF·부동산 펀드 세금과 비교해보세요.</p>
                  </Link>
                  <Link
                    href="/guide/interest-income-tax-15-4-percent-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">이자소득세 15.4%</div>
                    <p className="mt-1 text-sm text-text-secondary">예금 이자 과세와 원천징수 구조.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 교육 목적으로 작성되었으며 특정 상품의 매수·매도를 권하거나 개인 맞춤 세무 조언을 제공하지 않습니다. 리츠 배당의 실제 세부담과 분리과세 특례 적용 여부는 상품·보유 기간·투자 한도·개정 법령에 따라 달라지므로, 투자 전 증권사와 국세청(hometax.go.kr) 안내를 확인하고 필요하면 세무 전문가와 상담하세요. 공모리츠 저율 분리과세 특례의 요건·한도·일몰은 조세특례제한법 개정에 따라 변동될 수 있어 이 글에서는 구체적 조문 번호를 단정하지 않았습니다. 본 콘텐츠는 2026-07-25 기준이며, 인용한 법조항은 <strong>소득세법 §17(배당소득), §14(종합소득 과세 기준), §129(원천징수세율), §55(세율)</strong>입니다. AI 보조 작성 후 운영자 검수 완료.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터(소득세법)</a>,{' '}
                  <a href="https://www.nts.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">국세청</a>,{' '}
                  <a href="https://www.hometax.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">홈택스</a>.
                </p>
              </section>

              <ShareButtons
                title="리츠 배당금 세금 2026 가이드"
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
