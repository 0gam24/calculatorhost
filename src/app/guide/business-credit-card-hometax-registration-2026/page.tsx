// [revenue-lever: indexing+traffic]
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

const URL = 'https://calculatorhost.com/guide/business-credit-card-hometax-registration-2026/';
const DATE_PUBLISHED = '2026-07-29';
const DATE_MODIFIED = '2026-07-29';

export const metadata: Metadata = {
  title: '사업용 신용카드 홈택스 등록 2026, 매입세액공제 간편하게',
  description:
    '개인사업자가 사업용 신용카드를 홈택스에 등록하면 사용내역이 자동 집계되어 부가세 매입세액공제가 간편해집니다. 등록 방법, 공제·불공제 구분, 접대비·비영업용 승용차 제외 기준을 부가가치세법 §46·§39 기준으로 정리했습니다.',
  keywords: [
    '사업용 신용카드 등록',
    '홈택스 사업용카드',
    '사업용카드 매입세액공제',
    '신용카드매출전표 공제',
    '개인사업자 부가세',
    '사업용카드 불공제',
    '부가가치세법 46조',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '사업용 신용카드 홈택스 등록 2026, 매입세액공제 간편하게' }],
    title: '사업용 신용카드 홈택스 등록 2026, 매입세액공제 자동 집계',
    description: '등록 방법과 공제·불공제 구분, 접대비·비영업용 승용차 제외 기준을 부가가치세법 §46·§39로 정리.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '사업용 신용카드 홈택스 등록 2026',
    description: '매입세액공제 자동 집계와 불공제 항목(접대비·비영업용 승용차)을 부가가치세법 기준으로 정리.',
  },
};

const FAQ_ITEMS = [
  {
    question: '사업용 신용카드는 꼭 홈택스에 등록해야 하나요?',
    answer:
      '의무는 아니지만 등록하면 매입세액공제가 훨씬 간편해집니다. 등록하면 사용내역이 국세청에 자동 집계되어 부가세 신고 때 신용카드매출전표등 수령명세서를 일일이 손으로 채우지 않아도 됩니다. 등록하지 않으면 전표를 직접 보관하고 명세서를 수기로 작성해야 합니다.',
  },
  {
    question: '어떤 카드를 등록할 수 있나요?',
    answer:
      '대표자 본인 명의 또는 사업자(법인) 명의의 신용카드와 체크카드를 등록할 수 있습니다. 가족카드, 기프트카드, 무기명 선불카드, 백화점 전용카드 등은 등록할 수 없습니다. 개인사업자는 대표자 개인카드도 사업용으로 등록해 사용내역을 관리할 수 있습니다.',
  },
  {
    question: '등록하면 부가세가 자동으로 공제되나요?',
    answer:
      '자동으로 전액 공제되는 것은 아닙니다. 등록은 사용내역을 모아주는 기능이며, 실제 공제 여부는 사업 관련성과 공제 요건에 따라 결정됩니다. 일반과세자로부터 공급받고 부가가치세액이 별도로 구분된 전표여야 공제되며(부가가치세법 §46③), 접대비나 비영업용 승용차 관련 사용은 등록해도 공제되지 않습니다.',
  },
  {
    question: '공제되지 않는 사용은 어떤 것이 있나요?',
    answer:
      '접대비 관련 지출, 비영업용 소형승용차의 구입·임차·유지 비용, 면세 재화·용역 관련 매입, 사업과 무관한 개인적 지출 등은 매입세액이 공제되지 않습니다(부가가치세법 §39). 또한 간이과세자나 면세사업자로부터 받은 전표도 원칙적으로 공제 대상이 아닙니다.',
  },
  {
    question: '홈택스가 공제·불공제를 자동으로 분류해주나요?',
    answer:
      '홈택스는 업종 코드 등을 근거로 공제·불공제를 자동 분류해 보여줍니다. 다만 이 분류는 참고용이며 최종 책임은 사업자에게 있습니다. 공제로 표시됐어도 실제로는 사업과 무관한 지출이면 공제받으면 안 되고, 불공제로 표시됐어도 사업 관련성이 입증되면 공제받을 수 있습니다.',
  },
  {
    question: '등록 전에 쓴 내역도 공제받을 수 있나요?',
    answer:
      '등록 자체는 등록한 달의 사용분부터 자동 집계됩니다. 다만 등록 전 사용분이라도 신용카드매출전표를 직접 보관하고 있다면 수기로 명세서를 작성해 매입세액공제를 받을 수 있습니다. 등록 여부와 공제 권리는 별개이므로 전표는 5년간 보관하는 것이 안전합니다.',
  },
  {
    question: '종합소득세 신고에도 도움이 되나요?',
    answer:
      '네. 사업용 신용카드 사용내역은 부가세 매입세액공제뿐 아니라 종합소득세 경비 처리의 근거 자료로도 활용됩니다. 사업용 지출을 카드 한 장으로 모으면 장부 작성과 경비 증빙이 훨씬 수월해집니다.',
  },
  {
    question: '카드를 여러 장 등록할 수 있나요?',
    answer:
      '네. 대표자 명의 카드를 여러 장 등록할 수 있습니다. 다만 사업용과 개인용을 섞어 쓰면 나중에 공제 대상을 가리기 번거로우므로, 가능하면 사업용 카드를 따로 지정해 사용하는 것이 관리에 좋습니다.',
  },
];

export default function BusinessCreditCardHometaxRegistration2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '사업용 신용카드 홈택스 등록 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '사업용 신용카드 홈택스 등록 2026, 매입세액공제 자동 집계',
    description:
      '개인사업자의 사업용 신용카드 홈택스 등록 방법과 부가세 매입세액공제 원리, 접대비·비영업용 승용차 등 불공제 항목을 부가가치세법 §46·§39 기준으로 정리.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['사업용 신용카드', '홈택스 등록', '매입세액공제', '개인사업자', '부가가치세법'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '사업용 신용카드 홈택스 등록 2026',
    description:
      '사업용 신용카드 홈택스 등록 방법과 매입세액공제·불공제 구분을 정리한 개인사업자 실무 가이드.',
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
                    { name: '사업용 신용카드 홈택스 등록 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">개인사업자 · 8분 읽기 · 2026-07-29</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  사업용 신용카드 홈택스 등록 2026
                  <br />
                  <span className="text-2xl text-text-secondary">매입세액공제를 간편하게 만드는 법</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  이 가이드는 부가가치세 신고 때마다 카드 전표를 하나하나 정리하느라 지치는 개인사업자를 위한 것입니다. 사업용 신용카드를 홈택스에 등록해 두면 사용내역이 자동으로 모여 매입세액공제가 훨씬 수월해집니다. 등록 방법부터 어떤 사용이 공제되고 어떤 사용이 빠지는지까지, 실무에서 자주 헷갈리는 부분을 부가가치세법 조항과 함께 정리합니다.
                </p>
              </header>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">사업용 신용카드를 왜 홈택스에 등록하나요?</h2>
                <p>
                  매입세액공제와 경비 처리를 자동화하기 위해서입니다. 사업용 신용카드를 국세청 홈택스에 등록하면 그 카드로 결제한 사업 관련 내역이 국세청에 자동 집계되어, 부가세 신고 때 신용카드매출전표등 수령명세서를 손으로 채우는 수고를 크게 줄일 수 있습니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">등록의 핵심 효과</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    · 카드 사용내역 자동 집계 → 부가세 매입세액공제 명세서 작성 간소화
                    <br />
                    · 공제·불공제 자동 분류 표시(참고용)로 신고 오류 감소
                    <br />
                    · 종합소득세 경비 증빙 자료로 연계 활용
                  </p>
                </div>
                <p className="mt-4">
                  다만 등록은 어디까지나 사용내역을 모아주는 기능일 뿐, 등록했다고 해서 모든 사용액의 부가세가 자동으로 돌아오는 것은 아닙니다. 실제 공제는 아래에서 설명하는 요건을 충족해야 합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">사업용 신용카드는 어떻게 등록하나요?</h2>
                <p>
                  홈택스(PC) 또는 손택스(모바일)에서 몇 단계만 거치면 됩니다. 사업자등록을 마친 뒤 다음 순서로 진행합니다.
                </p>
                <ol className="space-y-3 ml-6 list-decimal text-text-secondary">
                  <li>홈택스에 사업자 본인 명의로 로그인합니다.</li>
                  <li>조회·발급 메뉴에서 신용카드, 사업용 신용카드 등록 화면으로 이동합니다.</li>
                  <li>사업자등록번호를 확인하고 등록할 카드번호를 입력합니다.</li>
                  <li>등록을 접수하면 보통 다음 달 중순경 등록 결과와 집계 내역을 확인할 수 있습니다.</li>
                </ol>
                <p className="mt-4">
                  다만 등록 결과가 반영되기까지 며칠이 걸리므로, 부가세 신고 마감에 임박해 등록하면 이번 신고에는 자동 집계가 늦을 수 있습니다. 개업 초기에 미리 등록해 두는 편이 안전합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">어떤 카드를 등록할 수 있나요?</h2>
                <p>
                  대표자 본인 또는 사업자 명의의 신용·체크카드만 등록됩니다. 명의가 다르거나 무기명인 카드는 등록되지 않습니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 사업용 신용카드 등록 가능 여부</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">카드 종류</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">등록</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">비고</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">대표자 본인 명의 신용·체크카드</td>
                        <td className="p-3"><strong>가능</strong></td>
                        <td className="p-3">개인사업자 대표 개인카드 포함</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">법인(기업) 명의 카드</td>
                        <td className="p-3"><strong>가능</strong></td>
                        <td className="p-3">법인사업자</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">가족카드</td>
                        <td className="p-3">불가</td>
                        <td className="p-3">명의가 대표자가 아님</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">기프트·무기명 선불카드</td>
                        <td className="p-3">불가</td>
                        <td className="p-3">사용자 특정 불가</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  예외: 개인사업자는 사업 전용 카드를 따로 만들지 않고 기존 개인 신용카드를 사업용으로 등록해도 됩니다. 다만 개인 소비와 섞이면 공제 대상을 가리기 번거로우므로 전용 카드를 두는 편이 관리에 유리합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">등록하면 부가세를 얼마나 아끼나요?</h2>
                <p>
                  결제한 금액에 포함된 부가가치세액만큼 매입세액으로 공제됩니다. 일반과세자로부터 공급받고 부가세액이 별도로 구분 표시된 신용카드매출전표라면, 수령명세서 제출로 그 부가세를 납부세액에서 빼줍니다(부가가치세법 §46③, §38).
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례. 사업용 소모품 110만원 결제</p>
                  <p className="text-sm text-text-secondary">
                    · 결제 총액: 110만원 (공급가액 100만원 + 부가세 10만원)
                    <br />
                    · 상대방: 일반과세자, 부가세 별도 구분된 전표 수취
                    <br />
                    · 매입세액공제: <strong>10만원</strong> → 부가세 납부세액에서 차감
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 등록·집계된 사업용 카드 사용분의 부가세 10만원이 공제됩니다.</span>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례. 간이과세자로부터 22만원 결제</p>
                  <p className="text-sm text-text-secondary">
                    · 결제 총액: 22만원, 상대방이 영수증 발급 대상 간이과세자
                    <br />
                    · 부가세 별도 구분 없음
                    <br />
                    · 매입세액공제: <strong>0원</strong> → 공제 요건 미충족
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 같은 카드로 써도 상대방과 전표 형식에 따라 공제가 안 될 수 있습니다.</span>
                  </p>
                </div>
              </section>

              <section className="space-y-6 border-t border-border-base pt-8" data-speakable>
                <h2 className="text-2xl font-bold">공제되지 않는 사용은 무엇인가요?</h2>
                <p>
                  사업용 카드로 결제해도 부가가치세법 §39에 따라 매입세액이 공제되지 않는 항목이 있습니다. 이 부분은 홈택스가 불공제로 표시해 주기도 하지만 최종 판단은 사업자 몫입니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 2. 매입세액 불공제 주요 항목 (부가가치세법 §39)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">항목</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">공제 여부</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">접대비 관련 지출</td>
                        <td className="p-3">불공제</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">비영업용 소형승용차 구입·임차·유지</td>
                        <td className="p-3">불공제</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">면세 재화·용역 관련 매입</td>
                        <td className="p-3">불공제</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">사업과 무관한 개인적 지출</td>
                        <td className="p-3">불공제</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  다만 홈택스의 자동 분류는 참고 자료일 뿐입니다. 공제로 표시됐어도 사업과 무관한 지출이면 공제받으면 안 되고, 불공제로 표시됐어도 사업 관련성을 입증하면 공제받을 수 있습니다. 애매한 지출은 세무대리인 또는 관할 세무서에 확인하세요.
                </p>
              </section>

              <h2 className="text-2xl font-bold mb-6">자주 묻는 질문</h2>
              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h3 className="text-lg font-semibold text-text-primary">관련 계산기 및 가이드</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link
                    href="/guide/business-use-account-registration-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">사업용 계좌 등록</div>
                    <p className="mt-1 text-sm text-text-secondary">복식부기 의무자의 사업용 계좌 신고 방법.</p>
                  </Link>
                  <Link
                    href="/guide/vat-non-deductible-input-tax-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">부가세 불공제 매입세액</div>
                    <p className="mt-1 text-sm text-text-secondary">공제받을 수 없는 매입세액 항목 총정리.</p>
                  </Link>
                  <Link
                    href="/guide/credit-card-sales-vat-deduction-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">신용카드 발행세액공제</div>
                    <p className="mt-1 text-sm text-text-secondary">개인사업자 매출 신용카드 발행세액공제 1.3%.</p>
                  </Link>
                  <Link
                    href="/guide/simplified-taxation-vat-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">간이과세자 부가세</div>
                    <p className="mt-1 text-sm text-text-secondary">간이과세 기준과 부가세 계산 방식.</p>
                  </Link>
                  <Link
                    href="/guide/freelancer-simplified-vs-standard-expense-rate-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">단순경비율 vs 기준경비율</div>
                    <p className="mt-1 text-sm text-text-secondary">경비율 방식과 장부 작성의 손익 비교.</p>
                  </Link>
                  <Link
                    href="/category/tax/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">모든 세금 가이드</div>
                    <p className="mt-1 text-sm text-text-secondary">부가세·종합소득세·사업자 세무 모음.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 교육 목적으로 작성되었으며, 개인 맞춤형 세무 조언이 아닙니다. 매입세액 공제 여부는 사업 관련성, 상대방 사업자 유형, 전표 형식에 따라 달라지므로, 구체적 사안은 세무대리인 또는 관할 세무서에 확인하세요. 본 콘텐츠는 2026-07-29 기준이며, 관련 법령은 부가가치세법 <strong>§38(공제하는 매입세액)</strong>, <strong>§39(공제하지 아니하는 매입세액)</strong>, <strong>§46(신용카드 등의 사용에 따른 세액공제 등)</strong>을 따릅니다. 사업용 신용카드 등록제도의 운영 주체는 국세청입니다. AI 보조 작성 후 운영자 검수 완료.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.hometax.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">홈택스(사업용 신용카드 등록)</a>,{' '}
                  <a href="https://www.nts.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">국세청</a>,{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터</a>.
                </p>
              </section>

              <ShareButtons
                title="사업용 신용카드 홈택스 등록 2026 가이드"
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