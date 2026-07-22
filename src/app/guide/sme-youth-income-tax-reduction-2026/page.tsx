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

const URL = 'https://calculatorhost.com/guide/sme-youth-income-tax-reduction-2026/';
const DATE_PUBLISHED = '2026-07-13';
const DATE_MODIFIED = '2026-07-13';

export const metadata: Metadata = {
  title: '중소기업 취업 청년 소득세 감면 2026, 90% 5년·연 200만원 한도',
  description:
    '만 15~34세 청년이 중소기업에 취업하면 소득세의 90%를 5년간 감면받습니다(연 200만원 한도). 대상, 신청 방법, 병역 연령 차감, 2026년 말 일몰까지 조세특례제한법 §30으로 정리합니다.',
  keywords: [
    '중소기업 취업자 소득세 감면',
    '청년 소득세 감면 90%',
    '중소기업 청년 감면 신청',
    '감면 한도 200만원',
    '경력단절 소득세 감면',
    '조세특례제한법 30조',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '중소기업 취업 청년 소득세 감면 2026 90% 5년' }],
    title: '중소기업 취업 청년 소득세 감면 2026, 90% 5년 완전정리',
    description: '만 15~34세 청년 중소기업 취업 시 소득세 90%를 5년간 감면(연 200만원 한도). 신청 방법과 병역 차감까지.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '중소기업 취업 청년 소득세 감면 2026, 90% 5년',
    description: '청년(15~34세) 중소기업 취업 소득세 90% 5년 감면, 연 200만원 한도. 일몰 2026년 말. 조특법 §30.',
  },
};

const FAQ_ITEMS = [
  {
    question: '중소기업 취업 청년 소득세 감면은 얼마나 받나요?',
    answer:
      '청년은 취업일부터 5년간 소득세의 90%를 감면받습니다(조세특례제한법 §30). 과세기간별 한도는 200만원입니다. 즉 연간 근로소득세가 200만원을 넘어도 최대 200만원까지 90%만큼 깎아줍니다. 60세 이상·장애인·경력단절 여성은 3년간 70% 감면입니다.',
  },
  {
    question: '청년 나이 기준이 어떻게 되나요?',
    answer:
      '근로계약 체결일 현재 만 15세 이상 34세 이하면 청년입니다(조세특례제한법 §30). 병역을 이행했다면 그 복무기간(최대 6년)을 나이에서 빼고 계산합니다. 예를 들어 만 36세라도 군 복무 2년을 빼면 만 34세로 인정돼 청년 감면을 받을 수 있습니다.',
  },
  {
    question: '어떤 회사에 취업해야 감면되나요?',
    answer:
      '조세특례제한법상 중소기업이면서 감면 대상 업종이어야 합니다. 제조·건설·도소매·음식점·정보통신 등 대부분 업종이 포함되지만, 전문서비스업 일부, 금융·보험업, 유흥주점 등은 제외됩니다. 회사가 중소기업인지, 감면 업종인지는 취업 전 국세청이나 회사 담당자에게 확인하세요.',
  },
  {
    question: '감면은 어떻게 신청하나요?',
    answer:
      '취업일이 속하는 달의 다음 달 말일까지 회사에 감면신청서를 제출합니다. 회사가 이를 관할 세무서에 신고하면 매월 급여에서 소득세가 90% 감면된 상태로 원천징수됩니다. 신청이 늦어도 소급 적용이 가능하니, 몰랐다면 경정청구로 이전 납부분을 돌려받을 수 있습니다.',
  },
  {
    question: '이직하면 감면이 계속되나요?',
    answer:
      '네, 감면 기간(청년 5년) 안에 다른 중소기업으로 이직해도 남은 기간 동안 감면이 이어집니다. 감면 기간은 최초 취업일부터 계산하므로, 이직 후 새 회사에 다시 감면신청서를 제출하면 됩니다. 다만 대기업으로 옮기면 그 기간에는 감면이 적용되지 않습니다.',
  },
  {
    question: '연말정산 때 자동으로 감면되나요?',
    answer:
      '신청을 해둬야 반영됩니다. 감면신청서를 낸 근로자는 매월 원천징수 단계에서 이미 90% 감면된 세금을 냅니다. 연말정산에서는 감면 적용 여부를 최종 정산합니다. 신청을 안 했다면 감면이 빠진 채 세금을 낸 것이므로, 5년 이내라면 경정청구로 환급받으세요.',
  },
  {
    question: '2026년에 취업해도 감면을 받을 수 있나요?',
    answer:
      '네, 현행 조세특례제한법 §30은 2026년 12월 31일까지 취업한 경우에 적용됩니다. 2026년에 중소기업에 취업한 청년이라면 대상입니다. 다만 일몰 기한이므로 이후 연장 여부는 세법 개정에 따라 달라질 수 있어, 최신 개정 내용을 국세청에서 확인하는 것이 좋습니다.',
  },
  {
    question: '경력단절 여성도 감면 대상인가요?',
    answer:
      '네, 결혼·임신·출산·육아 등으로 퇴직 후 재취업한 경력단절 여성도 대상입니다(조세특례제한법 §30). 이 경우 3년간 70% 감면, 연 200만원 한도가 적용됩니다. 청년(90%·5년)보다 감면율과 기간이 낮지만, 재취업 초기 세부담을 줄이는 데 도움이 됩니다.',
  },
];

export default function SmeYouthIncomeTaxReduction2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '중소기업 취업 청년 소득세 감면 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '중소기업 취업 청년 소득세 감면 2026, 90% 5년 완전정리',
    description:
      '만 15~34세 청년 중소기업 취업 시 소득세 90% 5년 감면(연 200만원 한도), 대상 업종, 병역 연령 차감, 감면 신청과 경정청구, 2026년 말 일몰까지 조세특례제한법 §30 기준으로 정리.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['중소기업 취업자 소득세 감면', '청년 90%', '경력단절', '병역 차감', '조세특례제한법 30조'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '중소기업 취업 청년 소득세 감면 2026',
    description:
      '청년 중소기업 취업 소득세 90% 5년 감면, 연 200만원 한도, 신청 방법과 병역 차감 정리.',
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
                    { name: '중소기업 취업 청년 소득세 감면 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">청년 직장인 · 8분 읽기 · 2026-07-13</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  중소기업 취업 청년 소득세 감면 2026
                  <br />
                  <span className="text-2xl text-text-secondary">90% 5년, 연 200만원 한도</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  중소기업에 다니는 청년이라면 근로소득세의 90%를 5년간 돌려받을 수 있는 강력한 제도가 있습니다. 바로 중소기업 취업자 소득세 감면입니다. 매년 최대 200만원까지 세금이 깎이는데, 신청을 안 해 놓치는 분이 의외로 많습니다. 이 가이드는 감면 대상, 청년 나이 기준과 병역 차감, 신청 방법, 그리고 2026년 말 일몰 기한까지 조세특례제한법 조문으로 정리합니다.
                </p>
              </header>

              <AdSlot slot="guide-sme-youth-income-tax-reduction-top" format="horizontal" />

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">감면 제도란 무엇인가</h2>
                <p>
                  중소기업 취업자 소득세 감면은 청년·고령자·장애인·경력단절 여성이 중소기업에 취업하면 근로소득세를 깎아주는 제도입니다(조세특례제한법 §30). 취업을 장려하고 초기 소득을 보전하려는 취지로, 대상별로 감면율과 기간이 다릅니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 대상별 감면율과 기간 (조세특례제한법 §30)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">대상</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">감면율</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">기간</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">청년(만 15~34세)</td>
                        <td className="p-3"><strong>90%</strong></td>
                        <td className="p-3">5년</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">60세 이상</td>
                        <td className="p-3">70%</td>
                        <td className="p-3">3년</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">장애인</td>
                        <td className="p-3">70%</td>
                        <td className="p-3">3년</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">경력단절 여성</td>
                        <td className="p-3">70%</td>
                        <td className="p-3">3년</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  다만 모든 대상에 과세기간별 200만원 한도가 공통 적용됩니다. 감면율이 90%라도 연 200만원까지만 깎이므로, 소득이 아주 높으면 실제 혜택률은 줄어듭니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">청년 나이는 어떻게 계산하나</h2>
                <p>
                  청년 기준은 근로계약 체결일 현재 만 15세 이상 34세 이하입니다(조세특례제한법 §30). 핵심은 병역 이행 기간을 나이에서 빼준다는 점입니다. 군 복무를 했다면 그 기간(최대 6년)만큼 나이를 낮춰 판정하므로, 만 34세가 넘어도 청년으로 인정될 수 있습니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">병역 차감 예시</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    · 현재 만 36세, 육군 현역 1년 6개월 복무
                    <br />
                    → 36세 - 1년 6개월 = 만 34세 6개월 → 34세 이하로 인정
                    <br />
                    · 결과: 청년 감면(90%, 5년) 대상
                  </p>
                </div>
                <p className="mt-4">
                  다만 병역 차감은 실제 복무기간만 인정되며 최대 6년입니다. 산업기능요원·공중보건의 등 대체복무도 포함되지만, 정확한 인정 범위는 취업 시 회사·세무서에 확인하세요.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">얼마나 아낄 수 있나, 계산 사례</h2>
                <p>
                  감면 효과를 연봉별로 살펴보겠습니다. 감면 전 근로소득세를 기준으로 90%를 깎되 200만원 한도를 적용합니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 1. 연봉 2,800만원 청년 (감면 전 세액 약 60만원)</p>
                  <p className="text-sm text-text-secondary">
                    · 감면 전 결정세액: 약 60만원
                    <br />
                    · 감면액: 60만원 × 90% = 54만원 (200만원 한도 이내)
                    <br />
                    · 실제 납부: 60만원 - 54만원 = <strong>6만원</strong>
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 세금 대부분이 사라진다. 5년이면 누적 절세 상당.</span>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 2. 연봉 4,500만원 청년 (감면 전 세액 약 180만원)</p>
                  <p className="text-sm text-text-secondary">
                    · 감면 전 결정세액: 약 180만원
                    <br />
                    · 감면액: 180만원 × 90% = 162만원 (200만원 한도 이내)
                    <br />
                    · 실제 납부: 180만원 - 162만원 = <strong>18만원</strong>
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 여전히 90% 전액 감면 적용. 한도 200만원에 아직 여유.</span>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 3. 연봉 6,500만원 청년 (감면 전 세액 약 350만원)</p>
                  <p className="text-sm text-text-secondary">
                    · 감면 전 결정세액: 약 350만원
                    <br />
                    · 90% 계산액: 350만원 × 90% = 315만원 → 한도 초과
                    <br />
                    · 실제 감면액: <strong>200만원</strong> (한도 적용)
                    <br />
                    · 실제 납부: 350만원 - 200만원 = 150만원
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 고연봉은 200만원 한도에 걸려 실질 감면율이 낮아진다.</span>
                  </p>
                </div>
                <p className="text-xs text-text-tertiary">
                  ※ 위 세액은 이해를 돕기 위한 개략적 예시입니다. 실제 결정세액은 부양가족·각종 공제에 따라 달라지므로 홈택스 연말정산 미리보기로 확인하세요.
                </p>
              </section>

              <AdSlot slot="guide-sme-youth-income-tax-reduction-mid" format="rectangle" />

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">신청은 어떻게 하나</h2>
                <p>
                  감면은 자동 적용이 아니라 신청해야 받습니다. 취업일이 속하는 달의 다음 달 말일까지 회사에 감면신청서를 제출하는 것이 원칙입니다(조세특례제한법 §30 시행절차).
                </p>
                <ul className="space-y-3 ml-6 list-decimal text-text-secondary">
                  <li>
                    <strong>감면신청서 작성:</strong> 회사 인사·급여 담당자에게 중소기업 취업자 소득세 감면신청서를 받아 작성합니다.
                  </li>
                  <li>
                    <strong>회사가 세무서에 신고:</strong> 회사가 감면 대상 명세서를 관할 세무서에 제출합니다.
                  </li>
                  <li>
                    <strong>매월 감면 원천징수:</strong> 이후 급여에서 소득세가 90% 감면된 상태로 원천징수됩니다.
                  </li>
                  <li>
                    <strong>놓쳤다면 경정청구:</strong> 신청을 못 했어도 5년 이내라면 경정청구로 이미 낸 세금을 돌려받을 수 있습니다.
                  </li>
                </ul>
                <p className="mt-4">
                  다만 감면 신청 기한을 넘겨도 소급 적용이 가능하지만, 회사가 감면 대상 명세서를 제출해야 처리됩니다. 이직·퇴사 등으로 기록 확인이 어려울 수 있으니 신청서 사본을 보관해 두세요.
                </p>
              </section>

              <section className="space-y-6 border-t border-border-base pt-8">
                <h2 className="text-2xl font-bold">감면에서 놓치기 쉬운 함정</h2>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li>
                    <strong>대기업 근무 기간:</strong> 감면 기간은 최초 취업일부터 계산되며, 중간에 대기업에 다닌 기간에는 감면이 적용되지 않습니다.
                  </li>
                  <li>
                    <strong>중복 감면 불가:</strong> 이미 이전 직장에서 감면 기간을 다 채웠다면 새로 시작되지 않습니다. 5년(청년)은 생애 통산 개념에 가깝게 운영됩니다.
                  </li>
                  <li>
                    <strong>업종 제외:</strong> 회사가 중소기업이어도 금융·보험, 일부 전문서비스, 유흥업 등은 감면 대상 업종이 아닙니다. 취업 전 확인이 필수입니다.
                  </li>
                </ul>
              </section>

              <h2 className="text-2xl font-bold mb-6">자주 묻는 질문</h2>
              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h3 className="text-lg font-semibold text-text-primary">관련 계산기 및 가이드</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link
                    href="/calculator/salary/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">연봉 실수령액 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">4대보험·소득세 반영 세후 월급 계산.</p>
                  </Link>
                  <Link
                    href="/guide/year-end-tax-settlement/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">연말정산 완벽 가이드</div>
                    <p className="mt-1 text-sm text-text-secondary">공제 항목 총정리와 환급 극대화 전략.</p>
                  </Link>
                  <Link
                    href="/guide/youth-future-savings-account-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">청년도약계좌 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">정부 기여금으로 목돈 만드는 청년 상품.</p>
                  </Link>
                  <Link
                    href="/guide/credit-card-income-deduction-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">신용카드 소득공제 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">청년 직장인 연말정산 필수 공제.</p>
                  </Link>
                  <Link
                    href="/guide/housing-subscription-savings-deduction-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">주택청약 저축 소득공제</div>
                    <p className="mt-1 text-sm text-text-secondary">청약통장 납입액 40% 소득공제.</p>
                  </Link>
                  <Link
                    href="/category/work/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">모든 근로 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">연봉·퇴직금·주휴수당 모음.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 교육 목적으로 작성되었으며, 개인 맞춤형 세무 조언이 아닙니다. 감면 대상 여부, 중소기업·업종 해당 여부, 병역 차감, 감면 한도 적용은 개인·회사 상황에 따라 달라지므로 회사 급여 담당자와 국세청에서 반드시 확인하세요. 감면 일몰 기한(2026-12-31 취업)과 연장 여부는 세법 개정에 따라 변동될 수 있습니다. 본 콘텐츠는 2026-07-13 기준으로 작성되었습니다. 인용 조문: <strong>조세특례제한법 §30(중소기업 취업자에 대한 소득세 감면)</strong>. AI 보조 작성 후 운영자 검수 완료.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터</a>,{' '}
                  <a href="https://www.nts.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">국세청</a>,{' '}
                  <a href="https://www.hometax.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">홈택스</a>.
                </p>
              </section>

              <ShareButtons
                title="중소기업 취업 청년 소득세 감면 2026 가이드"
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
