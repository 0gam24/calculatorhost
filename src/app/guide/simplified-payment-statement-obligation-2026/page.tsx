// [revenue-lever: indexing+traffic]
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

const URL = 'https://calculatorhost.com/guide/simplified-payment-statement-obligation-2026/';
const DATE_PUBLISHED = '2026-08-08';
const DATE_MODIFIED = '2026-08-08';

export const metadata: Metadata = {
  title: '간이지급명세서 2026, 제출기한과 미제출 가산세 0.25%',
  description:
    '간이지급명세서는 근로소득·사업소득을 지급한 사업주가 제출하는 서류로, 2026년까지는 반기, 2027년부터 매월 제출로 바뀝니다. 미제출 가산세는 지급액의 0.25%(지연제출 0.125%). 프리랜서 3.3% 인건비 신고 대상과 홈택스 제출 방법을 정리했습니다.',
  keywords: [
    '간이지급명세서',
    '간이지급명세서 제출기한',
    '프리랜서 인건비 신고',
    '사업소득 간이지급명세서',
    '지급명세서 미제출 가산세',
    '3.3% 원천징수 신고',
    '소득세법 164조의3',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '간이지급명세서 2026, 제출기한과 미제출 가산세' }],
    title: '간이지급명세서 2026, 제출기한·대상·미제출 가산세',
    description: '근로소득·사업소득 간이지급명세서 반기 제출과 2027년 매월 전환, 미제출 가산세 0.25%까지 정리.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '간이지급명세서 2026, 제출기한과 미제출 가산세',
    description: '프리랜서에게 3.3% 떼고 인건비를 줬다면 간이지급명세서 제출 대상. 기한·가산세·홈택스 방법 정리.',
  },
};

const FAQ_ITEMS = [
  {
    question: '프리랜서에게 인건비를 줬는데 간이지급명세서를 꼭 내야 하나요?',
    answer:
      '네, 3.3%를 원천징수하고 인적용역 대가를 지급했다면 사업소득 간이지급명세서 제출 대상입니다(소득세법 §164의3). 사업자등록 여부와 무관하게 인적용역을 지급한 자가 제출 의무를 집니다. 연간 지급액이 소액이라도 원천징수를 했다면 제출하는 것이 원칙입니다.',
  },
  {
    question: '간이지급명세서 제출 기한은 언제인가요?',
    answer:
      '2026년 현재는 반기 제출입니다. 상반기(1~6월) 지급분은 7월 31일, 하반기(7~12월) 지급분은 다음 해 1월 31일까지 제출합니다. 다만 2027년 1월 1일 지급분부터는 매월 제출(지급월 다음 달 말일)로 바뀔 예정이므로 시행 시점을 확인해야 합니다.',
  },
  {
    question: '간이지급명세서를 안 내면 가산세가 얼마인가요?',
    answer:
      '미제출 가산세는 지급금액의 0.25%입니다(소득세법 §81의11). 다만 제출 기한이 지난 뒤 1개월 이내에 제출하면 0.125%로 절반이 감면됩니다. 예를 들어 사업소득 1,000만원을 지급하고 미제출하면 2만 5천원, 1개월 내 지연제출하면 1만 2천 5백원이 부과됩니다.',
  },
  {
    question: '지급명세서와 간이지급명세서는 무엇이 다른가요?',
    answer:
      '지급명세서는 연 1회(또는 다음 해 초) 제출하는 연간 총괄 서류이고, 간이지급명세서는 더 자주(반기 또는 매월) 제출하는 서류입니다. 근로장려금·자녀장려금의 정확한 심사를 위해 소득 자료를 자주 수집하려고 도입됐습니다. 둘은 별개 의무이므로 지급명세서를 냈다고 간이지급명세서 의무가 없어지지 않습니다.',
  },
  {
    question: '근로소득과 사업소득 간이지급명세서는 어떻게 다른가요?',
    answer:
      '제출 대상 소득 종류가 다릅니다. 근로소득 간이지급명세서는 직원에게 준 급여를, 사업소득 간이지급명세서는 프리랜서 등 인적용역에게 준 대가를 신고합니다. 2026년 기준 둘 다 반기 주기로 제출하지만, 일용근로소득은 별도의 지급명세서 규정을 따르므로 구분해서 관리해야 합니다.',
  },
  {
    question: '홈택스에서 간이지급명세서를 어떻게 제출하나요?',
    answer:
      '홈택스(hometax.go.kr)에 로그인한 뒤 "지급명세서·자료제출·공익법인" 메뉴에서 간이지급명세서를 선택해 전자 제출합니다. 소득자 인적사항, 지급 기간, 지급액을 입력하거나 엑셀 서식을 내려받아 일괄 업로드할 수 있습니다. 인원이 많으면 세무 대리인을 통한 제출도 가능합니다.',
  },
  {
    question: '제출한 뒤 금액을 잘못 적은 것을 발견하면 어떻게 하나요?',
    answer:
      '수정 제출로 정정할 수 있습니다. 다만 제출 내용에 오류·불분명한 부분이 있으면 별도의 불분명 가산세가 부과될 수 있으므로(소득세법 §81의11), 발견 즉시 정정하는 것이 유리합니다. 기한 내 자발적으로 정정하면 불이익을 줄일 수 있습니다.',
  },
];

export default function SimplifiedPaymentStatementPage() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '간이지급명세서 제출 의무 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '간이지급명세서 2026, 제출기한·대상·미제출 가산세 완전 정리',
    description:
      '근로소득·사업소득 간이지급명세서의 반기 제출 기한, 2027년 매월 전환, 프리랜서 3.3% 인건비 신고 대상, 미제출 가산세 0.25%, 홈택스 제출 방법까지 정리한 사업주 실무 가이드.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['간이지급명세서', '제출기한', '프리랜서 인건비', '미제출 가산세', '사업소득'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '간이지급명세서 제출 의무 2026',
    description:
      '간이지급명세서 제출 기한(반기, 2027년 매월 전환)과 제출 대상, 미제출 가산세, 홈택스 제출 방법.',
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
                    { name: '간이지급명세서 제출 의무 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">사업주·프리랜서 지급자 · 8분 읽기 · 2026-08-08</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  간이지급명세서 2026
                  <br />
                  <span className="text-2xl text-text-secondary">제출기한과 미제출 가산세 0.25%</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  직원에게 급여를 주거나 프리랜서에게 3.3%를 떼고 인건비를 지급했다면, 간이지급명세서를 제때 제출해야 합니다. 이 가이드는 작은 사업장 사장님과 인건비를 지급하는 개인을 위해 제출 기한이 언제인지, 2027년부터 무엇이 바뀌는지, 안 내면 가산세가 얼마인지, 그리고 홈택스로 어떻게 내는지까지 실무 순서대로 정리했습니다.
                </p>
              </header>

              <AdSlot slot="guide-simplified-payment-statement-obligation-top" format="horizontal" />

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">간이지급명세서란 무엇인가</h2>
                <p>
                  간이지급명세서는 소득을 지급한 자가 누구에게 얼마를 줬는지 국세청에 자주 신고하도록 만든 간소화된 서류입니다(소득세법 §164의3). 연 1회 제출하는 일반 지급명세서와 달리, 소득 자료를 반기 또는 매월 단위로 수집하기 위해 도입됐습니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">30초 요약</p>
                  <ul className="mt-2 ml-5 list-disc text-sm text-text-secondary space-y-1">
                    <li>제출 의무자: 근로소득·사업소득(인적용역)을 지급한 사업주·지급자</li>
                    <li>2026년 제출 주기: 반기(상반기분 7/31, 하반기분 다음 해 1/31)</li>
                    <li>2027년부터: 매월 제출(지급월 다음 달 말일)로 전환 예정</li>
                    <li>미제출 가산세: 지급액의 0.25%, 1개월 내 지연제출 시 0.125%</li>
                  </ul>
                </div>
                <p>
                  이 제도가 강화된 배경에는 근로장려금·자녀장려금의 정확하고 신속한 심사가 있습니다. 국세청이 소득 자료를 자주 확보할수록 장려금 반기 지급과 실시간 소득 파악이 가능해지기 때문입니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">제출 기한은 언제인가</h2>
                <p>
                  2026년 지급분은 반기 단위로 제출합니다. 상반기(1월~6월) 지급분은 7월 31일까지, 하반기(7월~12월) 지급분은 다음 해 1월 31일까지가 기한입니다. 다만 이 반기 주기는 한시적이며, 2027년 1월 1일 지급분부터는 매월 제출로 바뀔 예정입니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 간이지급명세서 제출 주기 변화 (소득세법 §164의3)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">시기</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">제출 주기</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">기한</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">2026년 상반기 지급분</td>
                        <td className="p-3">반기</td>
                        <td className="p-3">2026년 7월 31일</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">2026년 하반기 지급분</td>
                        <td className="p-3">반기</td>
                        <td className="p-3">2027년 1월 31일</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">2027년 1월 지급분부터</td>
                        <td className="p-3">매월(예정)</td>
                        <td className="p-3">지급월 다음 달 말일</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  다만 매월 제출 전환 시점은 세법 개정·시행 일정에 따라 달라질 수 있습니다. 실제 적용 시점은 국세청 홈택스 공지와 최신 소득세법을 반드시 확인하세요.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">근로소득과 사업소득은 어떻게 다른가</h2>
                <p>
                  간이지급명세서는 신고하는 소득 종류에 따라 구분됩니다. 직원 급여는 근로소득 간이지급명세서, 프리랜서 등 인적용역 대가는 사업소득 간이지급명세서로 제출합니다. 지급 대상이 무엇인지에 따라 서식을 골라야 합니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 2. 소득 종류별 간이지급명세서 구분</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">구분</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">대상 소득</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">대표 사례</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">근로소득</td>
                        <td className="p-3">상용 근로자 급여</td>
                        <td className="p-3">정규·계약직 직원 월급</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">사업소득</td>
                        <td className="p-3">인적용역 대가(3.3% 원천징수)</td>
                        <td className="p-3">프리랜서·강사·배달·디자이너 용역비</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  예외: 일용근로자에게 준 급여는 일용근로소득 지급명세서라는 별도 서식과 기한을 따릅니다. 상용직·프리랜서·일용직을 함께 쓴다면 각각의 서식과 기한을 구분해 관리해야 누락이 없습니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">미제출하면 가산세가 얼마인가</h2>
                <p>
                  미제출 가산세는 지급금액의 0.25%입니다(소득세법 §81의11). 기한이 지난 뒤 1개월 이내에 제출하면 0.125%로 절반이 감면됩니다. 금액 자체는 커 보이지 않지만, 지급 규모가 크거나 대상 인원이 많으면 합산 가산세가 부담이 됩니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 1. 사업소득(프리랜서) 1,000만원 지급, 미제출</p>
                  <p className="text-sm text-text-secondary">
                    · 지급액: 1,000만원
                    <br />
                    · 미제출 가산세: 1,000만원 × 0.25% = <strong>25,000원</strong>
                    <br />
                    · 1개월 내 지연제출 시: 1,000만원 × 0.125% = <strong>12,500원</strong>
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 늦더라도 1개월 안에 내면 가산세가 절반으로 줄어듭니다.</span>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 2. 근로소득 반기 지급 6,000만원, 미제출</p>
                  <p className="text-sm text-text-secondary">
                    · 반기 급여 합계: 6,000만원
                    <br />
                    · 미제출 가산세: 6,000만원 × 0.25% = <strong>150,000원</strong>
                    <br />
                    · 1개월 내 지연제출 시: 6,000만원 × 0.125% = <strong>75,000원</strong>
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 지급 규모가 커질수록 가산세 절대액도 함께 커집니다.</span>
                  </p>
                </div>
                <p className="mt-4">
                  다만 위 금액은 미제출·지연제출 가산세이며, 기재 내용이 불분명한 경우에는 별도의 불분명 가산세가 추가될 수 있습니다. 정확한 금액과 지급 대상을 처음부터 정확히 기재하는 것이 가장 안전합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">누가 제출 대상인가</h2>
                <p>
                  소득을 지급하면서 원천징수 의무가 있는 자가 제출 대상입니다. 프리랜서에게 3.3%를 떼고 대가를 줬다면 사업자등록 여부와 관계없이 사업소득 간이지급명세서 제출 대상이 됩니다.
                </p>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li><strong>소규모 사업장:</strong> 직원 급여를 지급하는 개인·법인 사업주</li>
                  <li><strong>프리랜서 지급자:</strong> 강사, 디자이너, 배달, 컨설턴트 등 인적용역에게 대가를 준 자</li>
                  <li><strong>1인 사업자·개인:</strong> 원천징수를 하고 대가를 지급했다면 대상에 포함</li>
                </ul>
                <p className="mt-4">
                  다만 소득 종류나 지급 형태에 따라 제출 대상·기한이 달라질 수 있으므로, 애매한 경우 국세청 상담센터(126) 또는 관할 세무서에 확인하는 것이 안전합니다.
                </p>
              </section>

              <AdSlot slot="guide-simplified-payment-statement-obligation-mid" format="rectangle" />

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">홈택스 제출은 어떻게 하나</h2>
                <p>
                  간이지급명세서는 홈택스에서 전자 제출하는 것이 기본입니다. 인원이 적으면 직접 입력, 인원이 많으면 엑셀 일괄 업로드를 이용하면 편합니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">제출 절차</p>
                  <ol className="ml-5 list-decimal text-sm text-text-secondary space-y-1">
                    <li>홈택스(hometax.go.kr) 로그인</li>
                    <li>"지급명세서·자료제출·공익법인" 메뉴 선택</li>
                    <li>간이지급명세서(근로소득 또는 사업소득) 선택</li>
                    <li>소득자 인적사항·지급기간·지급액 입력 또는 엑셀 업로드</li>
                    <li>제출 후 접수증(접수번호) 확인·보관</li>
                  </ol>
                </div>
                <p className="mt-4">
                  예외: 세무 대리인을 이용하면 대리 제출이 가능합니다. 제출 후에는 접수번호를 반드시 보관해 두어야 나중에 제출 사실을 증명할 수 있습니다.
                </p>
              </section>

              <h2 className="text-2xl font-bold mb-6">자주 묻는 질문</h2>
              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h3 className="text-lg font-semibold text-text-primary">관련 계산기 및 가이드</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link
                    href="/guide/freelancer-take-home-3-3-percent-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">프리랜서 3.3% 원천징수</div>
                    <p className="mt-1 text-sm text-text-secondary">3.3% 떼는 구조와 5월 종합소득세 정산을 이해하세요.</p>
                  </Link>
                  <Link
                    href="/guide/daily-worker-income-tax-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">일용근로자 소득세 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">일용직 급여의 원천징수와 지급명세서 규정.</p>
                  </Link>
                  <Link
                    href="/guide/qualified-receipt-evidence-penalty-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">적격증빙 가산세</div>
                    <p className="mt-1 text-sm text-text-secondary">경비 처리에 필요한 증빙과 미수취 가산세.</p>
                  </Link>
                  <Link
                    href="/guide/business-income-vs-other-income-classification-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">사업소득 vs 기타소득</div>
                    <p className="mt-1 text-sm text-text-secondary">인적용역 대가의 소득 구분 기준을 확인하세요.</p>
                  </Link>
                  <Link
                    href="/calculator/freelancer-tax/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">프리랜서 종합소득세 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">경비율·세액을 입력해 예상 세금을 계산해보세요.</p>
                  </Link>
                  <Link
                    href="/category/tax/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">모든 세금 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">종합소득세·부가세·원천징수 관련 계산기 모음.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 교육 목적으로 작성되었으며 개인 맞춤형 세무 조언이 아닙니다. 간이지급명세서 제출 대상·기한·가산세는 소득 종류와 지급 형태에 따라 달라질 수 있고, 2027년 매월 제출 전환 시점은 세법 개정·시행 일정에 따라 변동될 수 있습니다. 실제 제출 의무와 기한은 홈택스 공지와 최신 소득세법, 관할 세무서를 통해 반드시 확인하세요. 본 콘텐츠는 2026-08-08 기준이며, 인용 법조항은 <strong>소득세법 §164의3(간이지급명세서의 제출), §81의11(지급명세서 등 제출 불성실 가산세)</strong>입니다. AI 보조 작성 후 운영자 검수 완료.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.nts.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">국세청</a>,{' '}
                  <a href="https://www.hometax.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">국세청 홈택스</a>,{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터</a>.
                </p>
              </section>

              <ShareButtons
                title="간이지급명세서 2026 제출기한·가산세 가이드"
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
