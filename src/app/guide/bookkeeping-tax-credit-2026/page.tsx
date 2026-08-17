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

const URL = 'https://calculatorhost.com/guide/bookkeeping-tax-credit-2026/';
const DATE_PUBLISHED = '2026-08-18';
const DATE_MODIFIED = '2026-08-18';
// [revenue-lever: indexing+traffic]

export const metadata: Metadata = {
  title: '기장세액공제 2026, 간편장부 대상자 복식부기 최대 100만원',
  description:
    '간편장부 대상자가 복식부기로 종합소득세를 신고하면 산출세액의 20%, 최대 100만원을 공제받습니다(소득세법 §56의2). 공제 계산식, 요건, 무기장가산세 회피, 간편장부와 복식부기 비교까지 사례로 정리했습니다.',
  keywords: [
    '기장세액공제',
    '간편장부 대상자',
    '복식부기 세액공제',
    '기장세액공제 100만원',
    '종합소득세 절세',
    '무기장가산세',
    '소득세법 56조의2',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '기장세액공제 2026, 간편장부 대상자 복식부기 최대 100만원' }],
    title: '기장세액공제 2026, 복식부기로 최대 100만원 공제',
    description: '간편장부 대상자가 복식부기로 신고하면 산출세액 20%, 최대 100만원 공제. 계산식과 요건 정리.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '기장세액공제 2026, 최대 100만원',
    description: '간편장부 대상자가 복식부기 신고 시 산출세액 20%, 한도 100만원 공제. 소득세법 §56의2.',
  },
};

const FAQ_ITEMS = [
  {
    question: '기장세액공제가 무엇인가요?',
    answer:
      '간편장부 대상자가 의무보다 상세한 복식부기로 종합소득세를 신고할 때 주는 세액공제입니다(소득세법 §56의2). 산출세액 중 기장한 사업소득에 해당하는 부분의 20%를 최대 100만원까지 깎아줍니다. 성실한 장부 작성을 장려하려는 취지입니다.',
  },
  {
    question: '누가 기장세액공제를 받을 수 있나요?',
    answer:
      '간편장부 대상자만 받을 수 있습니다. 신규 사업자이거나 직전연도 수입금액이 업종별 기준(도소매 3억원, 제조·음식·건설 1.5억원, 서비스·임대 7,500만원) 미만인 사업자가 여기에 해당합니다. 이들이 간편장부 대신 복식부기로 신고하면 공제를 받습니다.',
  },
  {
    question: '기장세액공제는 얼마나 받나요?',
    answer:
      '공제액은 종합소득 산출세액에 (기장한 사업소득금액 ÷ 종합소득금액)을 곱하고 다시 20%를 곱한 금액이며, 한도는 100만원입니다. 예로 사업소득만 있고 산출세액이 500만원이면 500만원 × 20% = 100만원을 그대로 공제받습니다.',
  },
  {
    question: '복식부기 의무자도 기장세액공제를 받나요?',
    answer:
      '받지 못합니다. 복식부기는 원래 의무이므로 의무자가 복식부기로 신고하는 것은 당연한 이행일 뿐 추가 혜택이 없습니다. 기장세액공제는 의무가 아닌데도 복식부기를 선택한 간편장부 대상자에게만 주는 유인입니다.',
  },
  {
    question: '간편장부와 복식부기 중 무엇이 유리한가요?',
    answer:
      '수입이 적고 비용 처리가 단순하면 간편장부가 간편합니다. 다만 복식부기로 하면 최대 100만원의 기장세액공제와 결손금(적자) 인정, 감가상각 등 정교한 비용 처리가 가능합니다. 세액공제와 절세 폭이 기장 비용보다 크면 복식부기가 유리합니다.',
  },
  {
    question: '기장을 아예 안 하면 어떤 불이익이 있나요?',
    answer:
      '장부 없이 추계로 신고하면 무기장가산세가 붙습니다. 간편장부 대상자가 장부를 기장하지 않으면 산출세액의 20%(소규모 사업자 등 일부 예외)가 가산세로 부과됩니다. 기장세액공제(플러스 20%)와 무기장가산세(마이너스 20%)를 함께 고려하면 기장의 이득이 큽니다.',
  },
  {
    question: '기장세액공제를 받으려면 무엇을 제출하나요?',
    answer:
      '종합소득세 확정신고 때 복식부기로 소득금액을 계산하고 재무상태표, 손익계산서, 합계잔액시산표, 조정계산서를 함께 제출해야 합니다. 서류를 갖추지 않으면 공제가 인정되지 않으므로 신고 전 준비가 필요합니다.',
  },
  {
    question: '기장세액공제와 표준세액공제를 함께 받을 수 있나요?',
    answer:
      '기장세액공제는 사업소득 기장에 대한 공제로, 다른 세액공제와의 중복·배제 관계는 소득 구성과 신고 방식에 따라 달라집니다. 정확한 적용은 홈택스 신고 화면이나 세무 전문가를 통해 개별 확인하는 것이 안전합니다.',
  },
];

export default function BookkeepingTaxCredit2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '기장세액공제 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '기장세액공제 2026, 간편장부 대상자 복식부기 최대 100만원',
    description:
      '간편장부 대상자가 복식부기로 신고하면 산출세액 20%, 최대 100만원 공제(소득세법 §56의2). 계산식, 대상 요건, 무기장가산세, 간편장부 대 복식부기 비교를 사례로 정리.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['기장세액공제', '간편장부', '복식부기', '무기장가산세', '종합소득세'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '기장세액공제 2026',
    description: '간편장부 대상자의 복식부기 기장세액공제 계산법과 요건, 절세 판단 정리.',
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
                    { name: '기장세액공제 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">프리랜서·개인사업자 · 7분 읽기 · 2026-08-18</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  기장세액공제 2026
                  <br />
                  <span className="text-2xl text-text-secondary">· 간편장부 대상자 복식부기 최대 100만원</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  이 글은 종합소득세를 신고하는 프리랜서·개인사업자 중 간편장부 대상자를 위해 기장세액공제를 정리한 가이드입니다. 복식부기로 신고하면 세금을 얼마나 깎아주는지, 누가 받을 수 있는지, 장부를 안 쓰면 어떤 가산세가 붙는지까지 실제 금액으로 확인하실 수 있습니다.
                </p>
              </header>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">기장세액공제가 무엇인가요?</h2>
                <p>
                  기장세액공제는 간편장부 대상자가 의무보다 정교한 복식부기로 종합소득세를 신고할 때 세금을 깎아주는 제도입니다(소득세법 §56의2). 성실하게 장부를 작성하도록 유인하기 위한 혜택입니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">기장세액공제 계산식</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    공제액 = 종합소득 산출세액 × (기장한 사업소득금액 ÷ 종합소득금액) × 20%
                    <br />
                    한도: 100만원
                    <br />
                    근거: 소득세법 §56의2(기장세액공제)
                  </p>
                </div>
                <p className="mt-4">
                  사업소득만 있는 경우에는 (기장한 사업소득금액 ÷ 종합소득금액)이 1이 되어, 사실상 산출세액의 20%를 최대 100만원까지 공제받는 셈이 됩니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">누가 기장세액공제를 받을 수 있나요?</h2>
                <p>
                  간편장부 대상자만 대상입니다. 신규 사업자이거나 직전연도 수입금액이 업종별 기준 미만인 사업자가 여기에 해당합니다. 아래 표의 기준 미만이면 간편장부 대상자, 이상이면 복식부기 의무자입니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 간편장부 대상자 판정 기준 (직전연도 수입금액, 소득세법 §160 관련)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">업종</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">간편장부 대상 기준</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">도소매·부동산매매·농업 등</td>
                        <td className="p-3">3억원 미만</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">제조·숙박·음식·건설·운수 등</td>
                        <td className="p-3">1억 5천만원 미만</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">부동산임대·전문서비스·교육 등</td>
                        <td className="p-3">7,500만원 미만</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  다만 의사·변호사 등 일부 전문직은 수입금액과 무관하게 복식부기 의무자로 분류되어 기장세액공제 대상에서 제외됩니다. 본인의 정확한 구분은 홈택스의 신고 안내나 관할 세무서에서 확인하세요.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">기장세액공제는 얼마나 받나요?</h2>
                <p>
                  산출세액과 사업소득 비중에 따라 달라집니다. 아래 세 가지 사례로 확인해보세요.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 1. 사업소득만, 산출세액 500만원</p>
                  <p className="text-sm text-text-secondary">
                    · 사업소득 비중: 100%
                    <br />
                    · 공제액: 500만원 × 100% × 20% = 100만원
                    <br />
                    · 한도 100만원 이내 → <strong>100만원 공제</strong>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 2. 사업소득 비중 80%, 산출세액 300만원</p>
                  <p className="text-sm text-text-secondary">
                    · 공제액: 300만원 × 80% × 20% = <strong>48만원 공제</strong>
                    <br />
                    <span className="text-xs text-text-tertiary">근로소득 등 다른 소득이 섞이면 사업소득 비중만큼만 공제됩니다.</span>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 3. 사업소득만, 산출세액 800만원 (한도 초과)</p>
                  <p className="text-sm text-text-secondary">
                    · 계산액: 800만원 × 100% × 20% = 160만원
                    <br />
                    · 한도 100만원 적용 → <strong>100만원 공제</strong>
                    <br />
                    <span className="text-xs text-text-tertiary">계산액이 100만원을 넘어도 실제 공제는 100만원까지입니다.</span>
                  </p>
                </div>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">간편장부와 복식부기 중 무엇이 유리한가요?</h2>
                <p>
                  결론부터 말하면, 세액공제와 절세 폭이 기장 비용을 넘으면 복식부기가 유리합니다. 두 방식의 차이를 표로 비교했습니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 2. 간편장부 대 복식부기 비교 (간편장부 대상자 기준)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">구분</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">간편장부</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">복식부기</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">기장세액공제</td>
                        <td className="p-3">없음</td>
                        <td className="p-3">최대 100만원</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">결손금(적자) 인정</td>
                        <td className="p-3">제한적</td>
                        <td className="p-3">인정(이월공제 유리)</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">작성 난이도</td>
                        <td className="p-3">쉬움</td>
                        <td className="p-3">복잡(비용·시간 소요)</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">감가상각·정교한 비용 처리</td>
                        <td className="p-3">제한적</td>
                        <td className="p-3">가능</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  다만 수입이 아주 적거나 비용 구조가 단순하면 굳이 복식부기 비용을 들일 필요가 없을 수 있습니다. 공제 100만원과 절세 효과가 세무대리 비용보다 큰지 따져보는 것이 판단의 핵심입니다.
                </p>
              </section>

              <section className="space-y-6 border-t border-border-base pt-8">
                <h2 className="text-2xl font-bold">기장을 아예 안 하면 어떤 불이익이 있나요?</h2>
                <p>
                  장부 없이 추계로 신고하면 무기장가산세가 붙습니다. 즉 기장은 안 하면 손해, 복식부기로 하면 이득이라는 양방향 유인이 걸려 있습니다.
                </p>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li>
                    <strong>무기장가산세:</strong> 간편장부 대상자가 장부를 기장하지 않고 신고하면 산출세액의 20%가 가산세로 부과됩니다(소규모 사업자 등 일부 예외).
                  </li>
                  <li>
                    <strong>양방향 격차:</strong> 복식부기 기장세액공제(+20%, 최대 100만원)와 무기장가산세(−20%)를 함께 보면, 기장 여부에 따른 세부담 차이가 큽니다.
                  </li>
                  <li>
                    <strong>경비 인정:</strong> 장부가 있어야 실제 지출한 경비를 온전히 인정받습니다. 추계신고는 업종별 경비율로만 인정되어 실제보다 불리할 수 있습니다.
                  </li>
                </ul>
                <p className="mt-4">
                  예외: 소규모 신규 사업자 등 일부는 무기장가산세가 면제되거나 완화됩니다. 본인 해당 여부는 홈택스 안내와 관할 세무서를 통해 확인하세요.
                </p>
              </section>

              <h2 className="text-2xl font-bold mb-6">자주 묻는 질문</h2>
              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h3 className="text-lg font-semibold text-text-primary">관련 계산기 및 가이드</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link href="/guide/bookkeeping-obligation-double-entry-vs-simple-2026/" className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition">
                    <div className="font-semibold text-primary-500">장부 기장의무: 간편 vs 복식</div>
                    <p className="mt-1 text-sm text-text-secondary">업종별 수입 기준과 내 장부 의무 판정법.</p>
                  </Link>
                  <Link href="/guide/freelancer-simplified-vs-standard-expense-rate-2026/" className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition">
                    <div className="font-semibold text-primary-500">단순경비율 vs 기준경비율</div>
                    <p className="mt-1 text-sm text-text-secondary">추계신고 시 경비율 구분과 절세 판단.</p>
                  </Link>
                  <Link href="/guide/freelancer-take-home-3-3-percent-2026/" className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition">
                    <div className="font-semibold text-primary-500">프리랜서 3.3% 원천징수</div>
                    <p className="mt-1 text-sm text-text-secondary">3.3% 떼인 세금과 5월 종소세 환급 구조.</p>
                  </Link>
                  <Link href="/guide/comprehensive-income-tax-rate-brackets-2026/" className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition">
                    <div className="font-semibold text-primary-500">종합소득세율 구간 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">6~45% 누진세율과 누진공제 계산법.</p>
                  </Link>
                  <Link href="/guide/business-registration-2026/" className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition">
                    <div className="font-semibold text-primary-500">사업자등록 기본 정리</div>
                    <p className="mt-1 text-sm text-text-secondary">개인사업자 등록 절차와 과세유형 선택.</p>
                  </Link>
                  <Link href="/calculator/freelancer-tax/" className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition">
                    <div className="font-semibold text-primary-500">프리랜서 종합소득세 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">수입·경비를 넣어 예상 세액을 계산해보세요.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 교육 목적으로 작성되었으며 개인 맞춤형 세무 조언이 아닙니다. 간편장부 대상자 판정, 기장세액공제·무기장가산세 적용, 다른 공제와의 관계는 개별 소득 구성에 따라 달라지므로 홈택스 신고 화면이나 세무 전문가에게 확인하세요. 본 콘텐츠는 2026-08-18 기준으로 작성되었으며, 인용 법조항은 <strong>소득세법 §56의2(기장세액공제), §160(기장의무)</strong>입니다. AI 보조 작성 후 운영자 검수 완료.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터</a>,{' '}
                  <a href="https://www.nts.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">국세청</a>,{' '}
                  <a href="https://www.hometax.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">홈택스</a>.
                </p>
              </section>

              <ShareButtons
                title="기장세액공제 2026 가이드"
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
