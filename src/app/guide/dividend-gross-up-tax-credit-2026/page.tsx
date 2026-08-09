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

const URL = 'https://calculatorhost.com/guide/dividend-gross-up-tax-credit-2026/';
const DATE_PUBLISHED = '2026-08-10';
const DATE_MODIFIED = '2026-08-10';

export const metadata: Metadata = {
  title: '배당세액공제 그로스업 2026, 11% 가산과 이중과세 조정',
  description:
    '배당소득에 11%를 더했다가(그로스업) 그만큼 세액에서 빼주는 배당세액공제는 법인세와 소득세의 이중과세를 조정하는 장치입니다. 그로스업 대상과 제외 배당, 금융소득 2천만원 기준, 계산 순서를 소득세법 §17·§56으로 정리했습니다.',
  keywords: [
    '배당세액공제',
    '그로스업',
    '배당가산',
    '금융소득 종합과세',
    '이중과세 조정',
    '배당소득세',
    '소득세법 17조',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '배당세액공제 그로스업 2026, 11% 가산과 이중과세 조정' }],
    title: '배당세액공제 그로스업 2026, 11% 가산의 원리',
    description: '배당에 11% 더했다 빼주는 이유. 그로스업 대상·제외와 2천만원 기준까지.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '배당세액공제 그로스업 2026',
    description: '소득세법 §17③ 배당가산 11%, §56 배당세액공제. 이중과세 조정 원리.',
  },
};

const FAQ_ITEMS = [
  {
    question: '그로스업이 무엇이고 왜 11%를 더하나요?',
    answer:
      '그로스업(배당가산)은 종합과세되는 국내 법인 배당에 그 금액의 11%를 더해 배당소득금액을 계산하는 것입니다(소득세법 §17③). 배당은 법인이 이미 법인세를 낸 이익에서 나오므로, 개인이 다시 소득세를 내면 같은 소득에 세금이 두 번 붙습니다. 이를 조정하려고 배당에 법인세 상당액(11%)을 더해 세전 소득으로 되돌린 뒤 세금을 계산하고, 그 더한 금액을 세액에서 빼주는(배당세액공제) 구조입니다.',
  },
  {
    question: '배당세액공제는 누구나 받나요?',
    answer:
      '아닙니다. 그로스업과 배당세액공제는 배당이 종합과세될 때만 적용됩니다. 이자·배당을 합한 연간 금융소득이 2천만원 이하이면 14%(지방소득세 포함 15.4%)로 원천징수하고 분리과세로 끝나 그로스업이 없습니다. 금융소득이 2천만원을 초과해 종합과세되는 경우, 그중 그로스업 대상 배당에 대해 배당가산과 배당세액공제가 적용됩니다.',
  },
  {
    question: '그로스업 대상이 되는 배당과 안 되는 배당은 무엇인가요?',
    answer:
      '국내에서 법인세가 과세된 소득을 재원으로 한 내국법인의 현금배당이 대표적인 그로스업 대상입니다. 반대로 외국법인에서 받은 배당, 법인세가 과세되지 않은 재원의 배당, 집합투자기구(펀드)에서 지급되는 이익 등은 이중과세 문제가 없어 그로스업 대상에서 제외됩니다. 제외 대상은 11%를 더하지 않고 그대로 종합과세합니다.',
  },
  {
    question: '금융소득 2천만원은 어떻게 세나요?',
    answer:
      '한 해 동안 받은 이자소득과 배당소득을 합산해 2천만원 초과 여부를 판단합니다. 2천만원까지는 원천징수세율(14%)로 분리과세하고, 초과분만 다른 종합소득과 합산해 누진세율로 종합과세합니다. 이 종합과세 구간에 들어가는 배당 중 그로스업 대상에 대해서만 배당가산과 배당세액공제가 작동합니다.',
  },
  {
    question: '배당세액공제를 하면 세금이 줄어드나요?',
    answer:
      '배당세액공제는 이미 낸 법인세를 감안해 이중과세를 덜어주는 장치이지, 배당을 받으면 무조건 세금이 줄어드는 혜택은 아닙니다. 다만 종합과세되더라도 배당세액공제 덕분에 실제 부담 세액이 낮아지는 효과가 있습니다. 참고로 종합과세 시 세금이 원천징수(14%)보다 적어지지 않도록 비교과세(비교산출세액) 규정이 함께 적용됩니다.',
  },
  {
    question: '해외주식 배당도 그로스업이 되나요?',
    answer:
      '되지 않습니다. 외국법인이 지급하는 배당은 국내 법인세로 인한 이중과세가 아니므로 그로스업 대상이 아닙니다. 해외주식 배당은 현지에서 원천징수된 세금을 외국납부세액공제로 조정할 수 있으며, 국내에서 종합과세될 때 배당가산 없이 합산됩니다.',
  },
  {
    question: 'ISA 계좌나 연금계좌 배당도 그로스업 대상인가요?',
    answer:
      'ISA(개인종합자산관리계좌)나 연금저축·IRP 안에서 발생한 배당은 계좌 자체의 과세특례(비과세·분리과세·과세이연)를 따르므로, 일반 종합과세의 그로스업 구조와 다르게 처리됩니다. 계좌별 세제는 요건과 한도가 정해져 있으니 해당 상품 약관과 국세청 안내로 확인하세요.',
  },
  {
    question: '배당세액공제는 신고 때 자동으로 반영되나요?',
    answer:
      '5월 종합소득세 신고 시 금융소득이 종합과세 대상이면 홈택스에서 배당가산과 배당세액공제가 계산에 반영됩니다. 다만 그로스업 대상 배당과 제외 배당을 구분해 신고해야 정확하며, 금액이 크거나 배당 종류가 복잡하면 세무 전문가의 확인을 받는 것이 안전합니다.',
  },
];

export default function DividendGrossUpTaxCredit2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '배당세액공제 그로스업 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '배당세액공제 그로스업 2026, 11% 가산과 이중과세 조정',
    description:
      '배당에 11%를 더했다가 세액에서 빼주는 그로스업과 배당세액공제의 원리. 그로스업 대상·제외 배당, 금융소득 2천만원 종합과세 기준, 계산 순서를 소득세법 §17·§56으로 정리했습니다.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['배당세액공제', '그로스업', '배당가산', '금융소득 종합과세', '소득세법 17조'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '배당세액공제 그로스업 2026',
    description:
      '배당가산 11%와 배당세액공제로 이중과세를 조정하는 원리, 그로스업 대상과 종합과세 기준을 정리한 투자자 가이드.',
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
                    { name: '배당세액공제 그로스업 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">배당 투자자 · 8분 읽기 · 2026-08-10</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  배당세액공제 그로스업 2026
                  <br />
                  <span className="text-2xl text-text-secondary">11% 가산과 이중과세 조정의 원리</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  배당을 받고 세금 계산을 들여다본 투자자라면, 왜 배당에 11%를 더했다가 다시 빼는지 의아했을 것입니다. 이 절차가 그로스업(배당가산)과 배당세액공제입니다. 법인이 이미 낸 법인세와 개인이 내는 소득세가 같은 이익에 겹치는 이중과세를 조정하기 위한 장치입니다. 이 가이드는 배당 투자자를 위해 그로스업의 원리, 대상과 제외 배당, 금융소득 2천만원 종합과세 기준, 계산 순서를 소득세법 조문으로 풀어 설명합니다.
                </p>
              </header>

              <AdSlot slot="guide-dividend-gross-up-tax-credit-2026-top" format="horizontal" />

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">그로스업이 무엇이고 왜 11%를 더하나요?</h2>
                <p>
                  그로스업은 종합과세되는 국내 법인 배당에 그 금액의 11%를 더해 배당소득금액을 산정하는 것입니다(소득세법 §17③). 이름 그대로 배당을 "부풀려(gross-up)" 세전 상태로 되돌린다는 뜻입니다.
                </p>
                <p>
                  이유는 이중과세 때문입니다. 회사는 이익에 법인세를 낸 뒤 남은 돈을 주주에게 배당합니다. 주주가 그 배당에 다시 소득세를 내면 같은 이익에 세금이 두 번 붙습니다. 그래서 개인 단계에서 법인세 상당액(배당의 11%)을 배당에 더해 세전 이익으로 복원한 다음 소득세를 계산하고, 더한 그 금액을 산출세액에서 배당세액공제로 빼줍니다(소득세법 §56).
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">그로스업의 두 단계</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    1단계(가산): 배당소득금액 = 배당금 + 배당금 × 11% (소득세법 §17③)
                    <br />
                    2단계(공제): 산출세액에서 위에서 더한 11% 금액을 배당세액공제로 차감 (소득세법 §56)
                    <br />
                    효과: 법인세와 소득세의 이중과세를 조정
                  </p>
                </div>
                <p>
                  다만 이 조정은 종합과세되는 배당에만 의미가 있습니다. 분리과세로 끝나는 배당은 애초에 이중과세 조정 구조에 들어가지 않습니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">배당세액공제는 누가 받나요? 2천만원 기준</h2>
                <p>
                  종합과세 대상자만 받습니다. 한 해 이자소득과 배당소득을 합한 금융소득이 2천만원 이하이면 14%(지방소득세 포함 15.4%)로 원천징수하고 분리과세로 종결되어 그로스업이 없습니다. 2천만원을 초과하면 초과분이 다른 종합소득과 합산되어 누진세율로 종합과세되고, 이 구간의 그로스업 대상 배당에 배당가산과 배당세액공제가 적용됩니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 금융소득 규모별 과세 방식과 그로스업 적용 (소득세법 §14, §17)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">연 금융소득</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">과세 방식</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">그로스업 적용</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">2천만원 이하</td>
                        <td className="p-3">분리과세(원천징수 14%)로 종결</td>
                        <td className="p-3">적용 안 됨</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">2천만원 초과</td>
                        <td className="p-3">초과분 종합과세(누진세율)</td>
                        <td className="p-3">대상 배당에 적용</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p>
                  다만 종합과세로 넘어가더라도 배당세액공제와 비교과세(비교산출세액) 규정이 함께 작동해, 세 부담이 원천징수(14%)로 끝났을 때보다 무작정 커지지 않도록 설계되어 있습니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">그로스업 대상과 제외 배당의 구분</h2>
                <p>
                  모든 배당이 11% 가산 대상은 아닙니다. 이중과세가 실제로 생기는 배당만 그로스업합니다. 국내에서 법인세가 과세된 이익을 재원으로 한 내국법인의 배당이 대표적인 대상입니다.
                </p>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li>
                    <strong>대상(가산 O):</strong> 법인세가 과세된 소득을 재원으로 한 내국법인의 현금·현물 배당 등.
                  </li>
                  <li>
                    <strong>제외(가산 X) 예시:</strong> 외국법인 배당, 법인세가 과세되지 않은 재원의 배당, 집합투자기구(펀드) 이익, 분리과세로 끝난 배당 등.
                  </li>
                </ul>
                <p>
                  예외: 같은 계좌에서 받은 배당이라도 종류에 따라 가산 여부가 갈립니다. 제외 배당은 11%를 더하지 않고 그대로 합산하므로, 신고 시 대상과 제외를 구분하는 것이 정확한 세액 계산의 핵심입니다.
                </p>
              </section>

              <AdSlot slot="guide-dividend-gross-up-tax-credit-2026-mid" format="rectangle" />

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">계산 순서로 보는 그로스업</h2>
                <p>
                  숫자로 흐름을 따라가면 그로스업이 세액을 어떻게 조정하는지 분명해집니다. 아래는 이해를 돕기 위한 단순화된 가상 사례이며, 실제 세액은 다른 소득·공제·비교과세에 따라 달라집니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3">
                  <p className="font-semibold text-text-primary">사례. 종합과세 대상 배당 1,000만원 (그로스업 대상)</p>
                  <p className="text-sm text-text-secondary">
                    · 1단계 가산: 1,000만원 + (1,000만원 × 11%) = 1,110만원을 배당소득금액으로 봄
                    <br />
                    · 2단계 합산: 1,110만원을 다른 종합소득과 합쳐 누진세율로 산출세액 계산
                    <br />
                    · 3단계 공제: 산출세액에서 가산분 110만원을 배당세액공제로 차감
                    <br />
                    · 4단계 비교: 종합과세 산출세액과 원천징수 방식 세액을 비교해 큰 금액으로 납부
                  </p>
                </div>
                <p>
                  다만 위 사례는 원리를 보여주기 위한 예시입니다. 실제로는 2천만원까지의 분리과세분과 초과분 처리, 비교산출세액 계산이 함께 이뤄지므로, 정확한 금액은 홈택스 종합소득세 모의계산이나 세무 전문가를 통해 확인하세요.
                </p>
              </section>

              <section className="space-y-6 border-t border-border-base pt-8">
                <h2 className="text-2xl font-bold">배당 투자자가 기억할 실무 포인트</h2>
                <p>
                  그로스업 구조를 이해하면 배당 투자 세금 관리가 한결 수월해집니다. 다음 세 가지를 특히 기억하세요.
                </p>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li>
                    <strong>2천만원 라인 관리:</strong> 이자와 배당을 합쳐 연 2천만원을 넘으면 종합과세로 넘어갑니다. 매도 시점·배당락 등을 고려해 연간 금융소득 규모를 미리 가늠하면 좋습니다.
                  </li>
                  <li>
                    <strong>국내·해외 구분:</strong> 국내 법인 배당은 그로스업, 해외 배당은 외국납부세액공제로 조정 방식이 다릅니다.
                  </li>
                  <li>
                    <strong>계좌 특례 활용:</strong> ISA·연금계좌의 비과세·분리과세·과세이연 특례는 종합과세 부담을 줄이는 데 도움이 될 수 있으므로 요건과 한도를 확인하세요.
                  </li>
                </ul>
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
                    <div className="font-semibold text-primary-500">배당소득세 15.4%</div>
                    <p className="mt-1 text-sm text-text-secondary">원천징수 기본 구조와 세율의 출발점.</p>
                  </Link>
                  <Link
                    href="/guide/financial-income-comprehensive-vs-separate-taxation/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">금융소득 종합 vs 분리과세</div>
                    <p className="mt-1 text-sm text-text-secondary">2천만원 기준과 종합과세 전환의 의미.</p>
                  </Link>
                  <Link
                    href="/guide/financial-income-health-insurance-premium-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">금융소득과 건강보험료</div>
                    <p className="mt-1 text-sm text-text-secondary">종합과세가 건보료에 미치는 영향.</p>
                  </Link>
                  <Link
                    href="/guide/isa-account-tax-benefit-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">ISA 계좌 절세</div>
                    <p className="mt-1 text-sm text-text-secondary">배당·이자 비과세·분리과세 활용법.</p>
                  </Link>
                  <Link
                    href="/guide/reits-dividend-tax-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">리츠 배당 과세</div>
                    <p className="mt-1 text-sm text-text-secondary">부동산 간접투자 배당의 세금 처리.</p>
                  </Link>
                  <Link
                    href="/category/tax/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">모든 세금 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">종합소득세·양도세 계산기 모음.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 교육 목적으로 작성되었으며 개별 투자·세무 자문이 아닙니다. 그로스업 대상 배당의 범위, 종합과세 여부, 비교산출세액 계산은 개인의 소득 구성에 따라 달라질 수 있으므로, 실제 신고 전 홈택스 또는 세무 전문가에게 확인하세요. 본 가이드는 특정 종목·상품의 매수·매도를 권유하지 않습니다. 본 콘텐츠는 2026-08-10 기준이며 세법 개정 시 업데이트됩니다. 인용 조문: 소득세법 §14(과세방법), §17(배당소득·배당가산), §56(배당세액공제). AI 보조 작성 후 운영자 검수 완료.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터</a>,{' '}
                  <a href="https://www.nts.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">국세청</a>,{' '}
                  <a href="https://www.hometax.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">국세청 홈택스</a>.
                </p>
              </section>

              <ShareButtons
                title="배당세액공제 그로스업 2026 가이드"
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
