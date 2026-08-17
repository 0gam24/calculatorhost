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

const URL = 'https://calculatorhost.com/guide/commercial-premium-goodwill-tax-2026/';
const DATE_PUBLISHED = '2026-08-18';
const DATE_MODIFIED = '2026-08-18';
// [revenue-lever: indexing+traffic]

export const metadata: Metadata = {
  title: '상가 권리금 세금 2026, 기타소득 원천징수 8.8% 계산',
  description:
    '상가 권리금은 기타소득으로 과세됩니다(소득세법 §21). 필요경비 60%를 뺀 금액의 22%, 즉 권리금의 8.8%를 지급자가 원천징수합니다. 기타소득금액 300만원 기준 분리과세와 종합소득세 신고까지 사례로 정리했습니다.',
  keywords: [
    '상가 권리금 세금',
    '권리금 기타소득',
    '권리금 원천징수 8.8%',
    '권리금 필요경비 60%',
    '권리금 종합소득세',
    '권리금 세금신고',
    '소득세법 21조',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '상가 권리금 세금 2026, 기타소득 원천징수 8.8% 계산' }],
    title: '상가 권리금 세금 2026, 기타소득 8.8% 원천징수 구조',
    description: '권리금을 받으면 필요경비 60% 차감 후 22% 과세. 권리금 대비 8.8% 원천징수와 종합소득세 신고 기준 정리.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '상가 권리금 세금 2026, 원천징수 8.8%',
    description: '권리금 기타소득 필요경비 60%, 원천징수 8.8%, 300만원 분리과세 기준. 소득세법 §21.',
  },
};

const FAQ_ITEMS = [
  {
    question: '상가 권리금은 무슨 소득으로 세금을 내나요?',
    answer:
      '권리금은 기타소득으로 과세됩니다(소득세법 §21). 사업에 관한 영업권을 넘기고 받는 대가로 보기 때문입니다. 필요경비 60%를 인정해주므로 실제 과세되는 기타소득금액은 권리금의 40%가 됩니다.',
  },
  {
    question: '권리금 세금에서 8.8%는 무엇을 뜻하나요?',
    answer:
      '권리금을 지급하는 사람이 미리 떼는 원천징수 세율입니다. 필요경비 60%를 뺀 기타소득금액(권리금의 40%)에 소득세 20%와 지방소득세 2%를 더한 22%를 적용하면, 권리금 총액 대비로는 8.8%가 됩니다. 예로 권리금 1억원이면 880만원을 원천징수합니다.',
  },
  {
    question: '권리금 필요경비 60%는 어떻게 적용되나요?',
    answer:
      '권리금은 실제 지출한 경비를 증빙하지 않아도 총액의 60%를 필요경비로 자동 인정합니다. 따라서 과세 대상 기타소득금액은 권리금의 40%입니다. 만약 실제 경비가 60%를 넘는다면 증빙을 갖춰 더 많이 공제받을 수도 있습니다.',
  },
  {
    question: '권리금 원천징수는 누가 하나요?',
    answer:
      '권리금을 지급하는 사람(양수인)이 원천징수 의무자입니다. 지급액의 8.8%를 떼어 지급일이 속하는 달의 다음 달 10일까지 세무서에 신고·납부하고, 받는 사람에게 기타소득 원천징수영수증을 줍니다.',
  },
  {
    question: '권리금을 받으면 종합소득세 신고를 꼭 해야 하나요?',
    answer:
      '기타소득금액(권리금의 40%)이 연 300만원을 넘으면 다음 해 5월 종합소득세로 반드시 신고해야 합니다. 300만원 이하이면 원천징수로 끝내는 분리과세와 종합과세 중 유리한 쪽을 선택할 수 있습니다. 권리금으로 환산하면 750만원이 분리과세 선택 가능 경계입니다.',
  },
  {
    question: '권리금에도 부가가치세가 붙나요?',
    answer:
      '양도인이 일반과세 사업자라면 권리금(영업권 공급)에 부가가치세 10%가 별도로 발생할 수 있습니다. 다만 사업에 관한 권리와 의무를 포괄적으로 넘기는 포괄양수도에 해당하면 부가세 없이 처리할 수 있습니다(부가가치세법 §10). 상황이 갈리므로 계약 전 확인이 필요합니다.',
  },
  {
    question: '권리금을 안 받은 것으로 하면 세금을 피할 수 있나요?',
    answer:
      '실제로 권리금이 오갔다면 계약서에 안 썼더라도 과세될 수 있습니다. 국세청은 실질과세 원칙(국세기본법 §14)에 따라 계좌이체 내역, 임대차 정황 등으로 실제 거래를 봅니다. 축소·누락 신고는 가산세와 세무조사 위험으로 이어질 수 있습니다.',
  },
  {
    question: '권리금을 여러 해에 나눠 받으면 세금은 어떻게 되나요?',
    answer:
      '기타소득은 실제로 받은 연도를 기준으로 과세됩니다. 여러 해에 나눠 받으면 각 연도별로 원천징수와 신고가 이루어지고, 연도별 기타소득금액이 300만원을 넘는지에 따라 분리과세와 종합과세가 각각 판정됩니다. 정확한 귀속 시기는 계약 조건에 따라 달라지므로 세무서에 확인하세요.',
  },
];

export default function CommercialPremiumGoodwillTax2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '상가 권리금 세금 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '상가 권리금 세금 2026, 기타소득 원천징수 8.8% 계산',
    description:
      '상가 권리금은 기타소득(소득세법 §21). 필요경비 60% 차감 후 22% 과세, 권리금 대비 8.8% 원천징수, 기타소득금액 300만원 분리과세 기준과 종합소득세 신고를 사례로 정리.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['권리금 세금', '기타소득', '원천징수 8.8%', '필요경비 60%', '종합소득세'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '상가 권리금 세금 2026',
    description: '상가 권리금 기타소득 과세 구조, 원천징수 8.8%, 분리과세·종합과세 판정 정리.',
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
                    { name: '상가 권리금 세금 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">자영업·임차인 · 8분 읽기 · 2026-08-18</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  상가 권리금 세금 2026
                  <br />
                  <span className="text-2xl text-text-secondary">· 기타소득 원천징수 8.8% 계산</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  이 글은 가게를 넘기며 권리금을 받거나 지급하는 자영업자·임차인을 위해 권리금에 붙는 세금을 정리한 가이드입니다. 권리금이 어떤 소득으로 과세되는지, 8.8% 원천징수는 어떻게 계산하는지, 다음 해 종합소득세 신고가 필요한지까지 실제 금액으로 확인하실 수 있습니다.
                </p>
              </header>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">권리금은 무슨 소득으로 세금을 내나요?</h2>
                <p>
                  권리금은 기타소득으로 과세됩니다(소득세법 §21). 가게의 영업권, 즉 위치·단골·시설 등 무형의 사업 가치를 넘기고 받는 대가로 보기 때문입니다. 핵심은 필요경비 60%를 자동으로 인정해준다는 점입니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">권리금 과세의 기본 구조</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    · 기타소득금액 = 권리금 − 필요경비(60%) = 권리금 × 40%
                    <br />
                    · 원천징수 세율 = 기타소득금액 × 22%(소득세 20% + 지방세 2%)
                    <br />
                    · 권리금 총액 대비 원천징수 = 40% × 22% = <strong>8.8%</strong>
                    <br />
                    · 근거: 소득세법 §21(기타소득), 시행령 §87(필요경비), §129(원천징수)
                  </p>
                </div>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">권리금 세금은 얼마나 떼나요?</h2>
                <p>
                  권리금 총액에 8.8%를 곱하면 원천징수 금액이 나옵니다. 아래 사례로 확인해보세요.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 1. 권리금 1억원</p>
                  <p className="text-sm text-text-secondary">
                    · 필요경비: 1억원 × 60% = 6,000만원
                    <br />
                    · 기타소득금액: 1억원 × 40% = 4,000만원
                    <br />
                    · 원천징수: 4,000만원 × 22% = <strong>880만원</strong> (소득세 800만원 + 지방세 80만원)
                    <br />
                    <span className="text-xs text-text-tertiary">기타소득금액 4,000만원 &gt; 300만원 이므로 다음 해 5월 종합소득세 신고 의무.</span>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 2. 권리금 500만원</p>
                  <p className="text-sm text-text-secondary">
                    · 기타소득금액: 500만원 × 40% = 200만원
                    <br />
                    · 원천징수: 200만원 × 22% = <strong>44만원</strong>
                    <br />
                    <span className="text-xs text-text-tertiary">기타소득금액 200만원 은 300만원 이하 이므로 분리과세(원천징수로 종결)와 종합과세 중 선택 가능.</span>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 3. 경계값 권리금 750만원</p>
                  <p className="text-sm text-text-secondary">
                    · 기타소득금액: 750만원 × 40% = 300만원 (분리과세 선택 가능 경계)
                    <br />
                    · 원천징수: 300만원 × 22% = <strong>66만원</strong>
                    <br />
                    <span className="text-xs text-text-tertiary">권리금 750만원 이하면 분리과세 선택 가능, 초과하면 종합과세 의무가 생깁니다.</span>
                  </p>
                </div>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">권리금을 받으면 종합소득세 신고를 해야 하나요?</h2>
                <p>
                  기타소득금액이 연 300만원을 넘으면 다음 해 5월에 종합소득세로 신고해야 합니다. 300만원 이하이면 분리과세로 끝낼지, 다른 소득과 합쳐 종합과세할지 선택할 수 있습니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 기타소득금액별 분리과세와 종합과세 선택 (소득세법 §14)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">기타소득금액</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">환산 권리금</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">과세 방식</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">300만원 이하</td>
                        <td className="p-3">750만원 이하</td>
                        <td className="p-3">분리과세와 종합과세 중 선택</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">300만원 초과</td>
                        <td className="p-3">750만원 초과</td>
                        <td className="p-3">종합과세 의무(5월 신고)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  어느 쪽이 유리한지는 본인의 다른 소득 규모에 달렸습니다. 다른 소득이 적어 종합과세 시 낮은 세율(6~15%)을 적용받는다면, 원천징수로 22%를 뗀 것보다 종합과세가 유리해 환급이 생길 수 있습니다. 반대로 고소득자라면 분리과세가 나을 수 있습니다.
                </p>
                <p className="mt-4">
                  다만 300만원을 넘으면 선택권이 없어 종합과세 대상입니다. 이때 이미 낸 원천징수세는 종합소득세 계산에서 기납부세액으로 차감됩니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">권리금 원천징수는 누가, 언제 하나요?</h2>
                <p>
                  권리금을 지급하는 사람(양수인)이 원천징수 의무자입니다. 받는 사람이 아니라 주는 사람이 세금을 떼어 신고하는 구조입니다.
                </p>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li>
                    <strong>원천징수 시점:</strong> 권리금을 지급할 때 8.8%를 떼고 나머지를 지급합니다.
                  </li>
                  <li>
                    <strong>신고·납부 기한:</strong> 지급일이 속하는 달의 다음 달 10일까지 관할 세무서에 신고·납부합니다.
                  </li>
                  <li>
                    <strong>증빙 발급:</strong> 지급자는 받는 사람에게 기타소득 원천징수영수증을 발급합니다. 받는 사람은 이 영수증으로 다음 해 종합소득세 신고 시 기납부세액을 증명합니다.
                  </li>
                </ul>
                <p className="mt-4">
                  예외: 지급자가 사업자가 아닌 개인 대 개인 거래 등 원천징수 의무가 애매한 경우가 있습니다. 이때는 받는 사람이 다음 해 종합소득세로 직접 신고해야 할 수 있으므로 관할 세무서에 확인하세요.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">권리금에도 부가가치세가 붙나요?</h2>
                <p>
                  붙을 수도, 안 붙을 수도 있습니다. 양도인이 일반과세 사업자라면 권리금(영업권 공급)에 부가가치세 10%가 별도로 발생할 수 있습니다. 반면 사업 전부를 포괄적으로 넘기는 포괄양수도에 해당하면 부가세 없이 처리할 수 있습니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 2. 권리금 부가가치세 발생 여부</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">상황</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">부가세</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">근거</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">일반과세자의 단순 영업권 양도</td>
                        <td className="p-3">10% 발생 가능</td>
                        <td className="p-3">세금계산서 발행</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">사업 포괄양수도</td>
                        <td className="p-3">면제</td>
                        <td className="p-3">부가가치세법 §10</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  다만 포괄양수도로 인정받으려면 사업의 권리와 의무를 그대로 승계하는 등 요건을 갖춰야 합니다. 금액이 크다면 계약 전 세무 전문가에게 부가세 발생 여부를 확인하는 것이 안전합니다.
                </p>
              </section>

              <section className="space-y-6 border-t border-border-base pt-8">
                <h2 className="text-2xl font-bold">권리금 세금에서 자주 하는 실수</h2>
                <p>
                  권리금은 오가는 금액이 크지만 계약서와 세무 처리를 소홀히 하기 쉬운 항목입니다. 아래는 흔한 함정입니다.
                </p>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li>
                    <strong>구두 거래로 신고 누락:</strong> 계약서 없이 현금으로 주고받아도 실질과세 원칙(국세기본법 §14)에 따라 과세될 수 있습니다. 계좌이체 흔적, 임대차 정황이 근거가 됩니다.
                  </li>
                  <li>
                    <strong>필요경비 60%를 모르고 전액 과세로 오해:</strong> 권리금 전액이 아니라 40%만 과세 대상입니다. 60%를 빼지 않으면 세금을 과다하게 잡습니다.
                  </li>
                  <li>
                    <strong>지급자가 원천징수를 빠뜨림:</strong> 원천징수는 지급자의 의무입니다. 누락하면 지급자에게 가산세가 부과될 수 있습니다.
                  </li>
                </ul>
              </section>

              <h2 className="text-2xl font-bold mb-6">자주 묻는 질문</h2>
              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h3 className="text-lg font-semibold text-text-primary">관련 계산기 및 가이드</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link href="/guide/commercial-lease-premium-recovery-protection-2026/" className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition">
                    <div className="font-semibold text-primary-500">상가 권리금 회수 보호</div>
                    <p className="mt-1 text-sm text-text-secondary">임대인의 방해로 권리금을 못 받았을 때 손해배상 청구.</p>
                  </Link>
                  <Link href="/guide/other-income-300-separate-taxation-2026/" className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition">
                    <div className="font-semibold text-primary-500">기타소득 300만원 분리과세</div>
                    <p className="mt-1 text-sm text-text-secondary">300만원 기준 분리·종합과세 선택 판단법.</p>
                  </Link>
                  <Link href="/guide/business-income-vs-other-income-classification-2026/" className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition">
                    <div className="font-semibold text-primary-500">사업소득 vs 기타소득 구분</div>
                    <p className="mt-1 text-sm text-text-secondary">같은 수입도 소득 구분에 따라 세금이 달라집니다.</p>
                  </Link>
                  <Link href="/guide/business-closure-vat-final-return-2026/" className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition">
                    <div className="font-semibold text-primary-500">폐업 부가세 확정신고</div>
                    <p className="mt-1 text-sm text-text-secondary">가게를 접을 때 놓치기 쉬운 폐업 신고와 세금.</p>
                  </Link>
                  <Link href="/guide/commercial-building-lease-2026/" className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition">
                    <div className="font-semibold text-primary-500">상가임대차 기본 정리</div>
                    <p className="mt-1 text-sm text-text-secondary">환산보증금·계약갱신·대항력 핵심을 한 번에.</p>
                  </Link>
                  <Link href="/category/tax/" className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition">
                    <div className="font-semibold text-primary-500">모든 세금 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">종합소득세·부가세·양도세 계산기 모음.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 교육 목적으로 작성되었으며 개인 맞춤형 세무 조언이 아닙니다. 권리금의 소득 구분, 부가세 발생 여부, 원천징수 방법은 개별 거래 조건에 따라 달라질 수 있으므로 실제 계약 전 관할 세무서나 세무 전문가에게 확인하세요. 본 콘텐츠는 2026-08-18 기준으로 작성되었으며, 인용 법조항은 <strong>소득세법 §21(기타소득), 시행령 §87(필요경비), §129(원천징수), §14(분리과세), 부가가치세법 §10(포괄양수도), 국세기본법 §14(실질과세)</strong>입니다. AI 보조 작성 후 운영자 검수 완료.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터</a>,{' '}
                  <a href="https://www.nts.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">국세청</a>.
                </p>
              </section>

              <ShareButtons
                title="상가 권리금 세금 2026 가이드"
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
