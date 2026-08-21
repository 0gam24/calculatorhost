// [revenue-lever: traffic+indexing] 2026 세제개편안 월세 세액공제 확대 급상승 검색 흡수, 롱테일 트래픽 + 색인 표면 확대.
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

const URL = 'https://calculatorhost.com/guide/monthly-rent-tax-credit-expansion-2026-reform/';
const DATE_PUBLISHED = '2026-08-22';
const DATE_MODIFIED = '2026-08-22';

export const metadata: Metadata = {
  title: '월세 세액공제 확대 2026 개편안, 한도 1200만 급여무관 17%',
  description:
    '2026 세제개편안이 월세 세액공제 한도를 연 1,000만원에서 1,200만원으로 올리고 공제율을 총급여와 무관하게 17%로 단일화하는 방향을 담았습니다. 현행 조건과 얼마 돌려받는지, 확대 시 최대 환급액까지 정리합니다(조세특례제한법 §95의2).',
  keywords: [
    '월세 세액공제 확대',
    '월세 세액공제 얼마',
    '월세 세액공제 총급여',
    '월세 공제 17%',
    '월세 세액공제 한도 1200만',
    '2026 세제개편안 월세',
    '조세특례제한법 95조의2',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '월세 세액공제 확대 2026 개편안, 한도 1200만 급여무관 17%' }],
    title: '월세 세액공제 확대 2026 개편안, 한도 1200만 급여무관 17%',
    description: '한도 1,000만에서 1,200만으로, 공제율은 급여 무관 17%로. 무주택 임차인의 최대 환급액 변화를 정리합니다.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '월세 세액공제 확대 2026 개편안',
    description: '한도 1,200만, 급여 무관 17% 단일화 방향. 무주택 임차인 최대 환급 204만원까지.',
  },
};

const FAQ_ITEMS = [
  {
    question: '월세 세액공제로 얼마나 돌려받나요?',
    answer:
      '현행 기준 최대 연 170만원입니다. 공제 대상 월세액 한도가 연 1,000만원이고, 총급여 5,500만원 이하면 공제율 17%가 적용되어 1,000만 × 17% = 170만원이 최대입니다(조세특례제한법 §95의2). 총급여 5,500만 초과 8,000만 이하이면 공제율 15%로 최대 150만원입니다. 실제 환급액은 낸 월세와 소득에 따라 달라집니다.',
  },
  {
    question: '개편안이 통과되면 얼마까지 늘어나나요?',
    answer:
      '최대 연 204만원까지 늘어나는 방향입니다. 개편안은 공제 대상 월세액 한도를 연 1,200만원으로 올리고 공제율을 총급여와 무관하게 17%로 단일화합니다. 한도를 다 채우면 1,200만 × 17% = 204만원이 됩니다. 다만 2026년 8월 현재 발표된 안이며, 국회 통과 후 시행됩니다.',
  },
  {
    question: '총급여 조건은 어떻게 되나요?',
    answer:
      '현행은 총급여 8,000만원(종합소득금액 7,000만원) 이하 무주택 세대주 등이 대상입니다. 공제율은 총급여 5,500만원 이하 17%, 5,500만 초과 8,000만 이하 15%로 나뉩니다. 개편안은 이 소득 구간 구분을 없애 대상 소득 안에서는 모두 17%를 적용하는 방향입니다. 소득 상한 자체의 조정 여부는 확정 법률로 확인하세요.',
  },
  {
    question: '어떤 집에 살아야 공제가 되나요?',
    answer:
      '국민주택규모(전용면적 85㎡ 이하) 또는 기준시가 4억원 이하 주택을 임차해야 합니다. 또한 무주택 세대주(또는 일정 요건의 세대원)여야 하고, 임대차계약서의 주소와 주민등록등본상 주소가 같아야 합니다. 오피스텔과 고시원도 요건을 갖추면 대상이 됩니다.',
  },
  {
    question: '지금 월세 사는데 개편 전에도 받을 수 있나요?',
    answer:
      '네, 현행 제도로 연말정산이나 종합소득세 신고 때 공제받을 수 있습니다. 개편안 시행과 관계없이 현행 요건을 갖추면 총급여 구간에 따라 17% 또는 15% 공제가 적용됩니다. 과거에 놓쳤다면 5년 이내 경정청구로 소급해 돌려받을 수도 있습니다.',
  },
  {
    question: '월세 세액공제와 현금영수증(소득공제)은 같이 되나요?',
    answer:
      '동시에 중복 적용되지는 않습니다. 월세는 세액공제(조세특례제한법 §95의2)와 현금영수증 소득공제 중 하나만 선택합니다. 일반적으로 세율보다 높은 17% 세액공제가 유리한 경우가 많지만, 소득과 다른 공제 상황에 따라 유불리가 갈리므로 두 방식을 비교해 선택하세요.',
  },
  {
    question: '집주인 동의가 없어도 공제받을 수 있나요?',
    answer:
      '네, 집주인 동의 없이도 공제받을 수 있습니다. 임대차계약서와 계좌이체 등 월세 지급 증빙만 있으면 됩니다. 집주인 동의나 확정일자와는 무관하므로, 계약서와 송금 내역을 잘 보관하는 것이 중요합니다.',
  },
];

export default function MonthlyRentTaxCreditExpansion2026ReformPage() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '월세 세액공제 확대 2026 개편안' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '월세 세액공제 확대 2026 개편안, 한도 1,200만원 급여 무관 17%',
    description:
      '월세 세액공제 한도를 연 1,000만원에서 1,200만원으로 올리고 공제율을 17%로 단일화하는 2026 세제개편안. 현행 조건, 환급액 계산, 확대 시 최대 환급액을 정리합니다.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['월세 세액공제', '월세 공제 확대', '무주택 임차인', '조세특례제한법 95조의2', '2026 세제개편안'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '월세 세액공제 확대 2026 개편안',
    description:
      '월세 세액공제 한도 1,200만원 상향과 급여 무관 17% 단일화 방향, 현행 요건과 환급액 계산 정리.',
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
                    { name: '월세 세액공제 확대 2026 개편안' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">무주택 임차인 · 7분 읽기 · 2026-08-22</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  월세 세액공제 확대 2026 개편안
                  <br />
                  <span className="text-2xl text-text-secondary">· 한도 1,200만, 급여 무관 17%</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  2026년 8월 3일 발표된 세제개편안은 무주택 임차인의 월세 세액공제를 확대하는 방향을 담았습니다. 이 글은 월세를 내는 직장인과 청년을 위해, 지금 얼마를 돌려받는지, 총급여 조건은 무엇인지, 그리고 개편안이 통과되면 최대 환급액이 얼마로 늘어나는지를 계산 예시와 함께 정리합니다.
                </p>
              </header>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-5" data-speakable>
                <p className="font-semibold text-text-primary">30초 요약</p>
                <ul className="ml-5 list-disc space-y-1 text-sm text-text-secondary">
                  <li>현행 최대 환급은 연 170만원(한도 1,000만 × 17%)입니다.</li>
                  <li>개편안은 한도를 1,200만원으로 올리고 공제율을 급여 무관 17%로 단일화합니다.</li>
                  <li>확대 시 최대 환급은 연 204만원(1,200만 × 17%)이 됩니다.</li>
                  <li>2026년 8월 현재 발표된 안이며, 국회 통과 후 시행됩니다.</li>
                </ul>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 월세 세액공제 현행과 개편안 비교</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="p-3 text-left font-semibold bg-bg-card">구분</th>
                        <th scope="col" className="p-3 text-left font-semibold bg-bg-card">현행</th>
                        <th scope="col" className="p-3 text-left font-semibold bg-bg-card">개편안</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">공제 대상 월세액 한도</td>
                        <td className="p-3">연 1,000만원</td>
                        <td className="p-3">연 1,200만원</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">공제율</td>
                        <td className="p-3">17% 또는 15%</td>
                        <td className="p-3">급여 무관 17%</td>
                      </tr>
                      <tr>
                        <td className="p-3">최대 환급</td>
                        <td className="p-3">170만원</td>
                        <td className="p-3">204만원</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              <section className="space-y-4" data-speakable>
                <h2 className="text-2xl font-bold">월세 세액공제로 얼마나 돌려받나</h2>
                <p>
                  현행 기준 최대 연 170만원입니다. 월세 세액공제는 낸 월세 중 한도 안의 금액에 공제율을 곱해 산출세액에서 빼주는 제도입니다(조세특례제한법 §95의2). 소득공제가 아니라 세액공제이므로, 계산된 금액이 그대로 세금에서 차감됩니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 2. 현행 공제율(조세특례제한법 §95의2)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="p-3 text-left font-semibold bg-bg-card">총급여</th>
                        <th scope="col" className="p-3 text-left font-semibold bg-bg-card">공제율</th>
                        <th scope="col" className="p-3 text-left font-semibold bg-bg-card">최대 환급</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">5,500만원 이하</td>
                        <td className="p-3">17%</td>
                        <td className="p-3">170만원</td>
                      </tr>
                      <tr>
                        <td className="p-3">5,500만 초과 ~ 8,000만 이하</td>
                        <td className="p-3">15%</td>
                        <td className="p-3">150만원</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p>
                  다만 공제 대상 월세액은 실제 납부액과 연 1,000만원 한도 중 작은 금액입니다. 월세가 한도를 넘어도 1,000만원까지만 인정됩니다.
                </p>
              </section>

              <section className="space-y-4" data-speakable>
                <h2 className="text-2xl font-bold">개편안으로 무엇이 늘어나나</h2>
                <p>
                  한도와 공제율 두 가지가 좋아집니다. 개편안은 공제 대상 월세액 한도를 연 1,000만원에서 1,200만원으로 올리고, 총급여 5,500만원을 기준으로 나뉘던 17%와 15%를 없애 대상 소득 안에서는 모두 17%를 적용합니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3">
                  <p className="font-semibold text-text-primary">계산 예시 1. 월세 60만원, 총급여 5,000만원</p>
                  <p className="text-sm text-text-secondary">
                    연 월세 = 60만 × 12 = 720만원 (한도 이내)
                    <br />
                    현행: 720만 × 17% = <strong>122.4만원</strong>
                    <br />
                    개편안: 720만 × 17% = <strong>122.4만원</strong> (한도 미달이라 동일)
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 월세가 한도보다 적으면 한도 상향 효과는 없고 공제율만 유지됩니다.</span>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3">
                  <p className="font-semibold text-text-primary">계산 예시 2. 월세 90만원, 총급여 6,000만원</p>
                  <p className="text-sm text-text-secondary">
                    연 월세 = 90만 × 12 = 1,080만원
                    <br />
                    현행(15% 구간, 한도 1,000만): 1,000만 × 15% = <strong>150만원</strong>
                    <br />
                    개편안(17%, 한도 1,200만): 1,080만 × 17% = <strong>183.6만원</strong>
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 총급여 5,500만 초과 임차인이 한도 상향과 17% 단일화로 33.6만원 더 돌려받습니다.</span>
                  </p>
                </div>
                <p>
                  예외: 위 개편안 수치는 발표된 안 기준입니다. 국회 심의에서 한도나 소득 요건이 바뀔 수 있으므로, 시행 시점과 확정 수치는 국세청과 기획재정부 공지로 확인하세요.
                </p>
              </section>

              <section className="space-y-4" data-speakable>
                <h2 className="text-2xl font-bold">누가, 어떤 집이어야 받나</h2>
                <p>
                  무주택 세대주(또는 일정 요건의 세대원)이고 소득 요건을 갖춰야 합니다. 집은 국민주택규모(전용 85㎡ 이하) 또는 기준시가 4억원 이하여야 하며, 계약서 주소와 등본 주소가 일치해야 합니다.
                </p>
                <ul className="ml-5 list-disc space-y-2 text-text-secondary">
                  <li>무주택 세대주(세대원도 일정 요건 충족 시 가능).</li>
                  <li>총급여 8,000만원 이하(종합소득금액 7,000만원 이하).</li>
                  <li>전용면적 85㎡ 이하 또는 기준시가 4억원 이하 주택 임차.</li>
                  <li>임대차계약서 주소와 주민등록등본 주소 일치.</li>
                  <li>오피스텔, 고시원도 요건 충족 시 대상.</li>
                </ul>
                <p>
                  다만 배우자가 주택을 보유하면 무주택 요건에서 벗어날 수 있고, 회사 사택 등은 대상이 아닙니다. 요건 충족 여부가 애매하면 국세청 홈택스 상담이나 관할 세무서로 확인하세요.
                </p>
              </section>

              <section className="space-y-4" data-speakable>
                <h2 className="text-2xl font-bold">신청은 어떻게 하나</h2>
                <p>
                  근로자는 연말정산, 그 외에는 5월 종합소득세 신고 때 신청합니다. 절차는 단순합니다.
                </p>
                <ol className="ml-5 list-decimal space-y-2 text-text-secondary">
                  <li>임대차계약서 사본을 준비합니다.</li>
                  <li>월세 이체 내역(계좌이체 확인서 등) 증빙을 모읍니다.</li>
                  <li>주민등록등본으로 주소 일치를 확인합니다.</li>
                  <li>연말정산 간소화 또는 홈택스에서 월세액 세액공제 항목에 입력합니다.</li>
                  <li>놓친 과거분은 5년 이내 경정청구로 소급 신청합니다.</li>
                </ol>
                <p>
                  예외: 현금영수증 소득공제를 이미 받은 월세는 세액공제와 중복 적용되지 않으니, 둘 중 유리한 쪽을 선택해야 합니다.
                </p>
              </section>

              <h2 className="text-2xl font-bold mb-6">자주 묻는 질문</h2>
              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h3 className="text-lg font-semibold text-text-primary">관련 계산기 및 가이드</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link href="/calculator/salary/" className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition">
                    <div className="font-semibold text-primary-500">연봉 실수령액 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">총급여와 세후 실수령액을 계산해보세요.</p>
                  </Link>
                  <Link href="/guide/monthly-rent-tax-credit-2026/" className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition">
                    <div className="font-semibold text-primary-500">월세 세액공제 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">현행 요건과 공제율, 서류를 자세히 확인하세요.</p>
                  </Link>
                  <Link href="/guide/youth-monthly-rent-support-2026/" className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition">
                    <div className="font-semibold text-primary-500">청년 월세 지원</div>
                    <p className="mt-1 text-sm text-text-secondary">월세 세액공제와 함께 챙길 지원 제도를 알아보세요.</p>
                  </Link>
                  <Link href="/guide/year-end-tax-settlement/" className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition">
                    <div className="font-semibold text-primary-500">연말정산 총정리</div>
                    <p className="mt-1 text-sm text-text-secondary">공제 항목을 빠짐없이 챙기는 방법을 정리합니다.</p>
                  </Link>
                  <Link href="/guide/credit-card-income-deduction-2026/" className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition">
                    <div className="font-semibold text-primary-500">신용카드 소득공제</div>
                    <p className="mt-1 text-sm text-text-secondary">월세 소득공제와 비교해 유리한 쪽을 판단하세요.</p>
                  </Link>
                  <Link href="/category/tax/" className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition">
                    <div className="font-semibold text-primary-500">모든 세금 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">연말정산, 종합소득세 관련 계산기 모음.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 교육 목적이며 개인 맞춤형 세무 조언이 아닙니다. 월세 세액공제 한도 1,200만원 상향과 급여 무관 17% 단일화는 2026년 8월 3일 발표된 세제개편안(案)으로, 국회 통과 전까지 확정된 제도가 아닙니다. 확정 한도, 소득 요건, 시행 시점은 최종 통과된 법률로 달라질 수 있습니다. 현재는 현행 요건(한도 1,000만원, 총급여 5,500만 이하 17%, 8,000만 이하 15%)이 적용됩니다. 인용 조항: 조세특례제한법 §95의2(월세액에 대한 세액공제). 본 콘텐츠는 2026-08-22 기준이며 법 개정 시 업데이트됩니다. AI 보조 작성 후 운영자 검수 완료.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터</a>,{' '}
                  <a href="https://www.nts.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">국세청(연말정산)</a>,{' '}
                  <a href="https://www.moef.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">기획재정부(세제개편안)</a>.
                </p>
              </section>

              <ShareButtons title="월세 세액공제 확대 2026 개편안" url={URL} />
            </article>
          </main>
        </div>
        <Footer />
      </div>
    </>
  );
}
