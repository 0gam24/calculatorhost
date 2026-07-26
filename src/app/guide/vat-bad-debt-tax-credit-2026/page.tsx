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

const URL = 'https://calculatorhost.com/guide/vat-bad-debt-tax-credit-2026/';
const DATE_PUBLISHED = '2026-07-27';
const DATE_MODIFIED = '2026-07-27';

export const metadata: Metadata = {
  title: '부가세 대손세액공제 2026, 못 받은 외상값 세금 돌려받기',
  description:
    '거래처 파산·부도로 매출채권을 못 받았다면 이미 낸 부가세를 대손세액공제로 돌려받을 수 있습니다. 대손사유, 10/110 계산, 공급일 10년 기한을 부가가치세법 제45조 기준으로 정리했습니다.',
  keywords: [
    '부가세 대손세액공제',
    '대손세액공제',
    '외상매출금 부가세',
    '거래처 부도 부가세',
    '대손세액 계산',
    '소멸시효 대손',
    '부가가치세법 45조',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '부가세 대손세액공제 2026, 못 받은 외상값 세금 돌려받기' }],
    title: '부가세 대손세액공제 2026, 못 받은 외상값 세금 돌려받기',
    description: '거래처 파산·부도 시 이미 낸 부가세를 돌려받는 대손세액공제. 사유·계산·기한을 부가가치세법 제45조 기준으로 정리.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '부가세 대손세액공제 2026, 못 받은 외상값 돌려받기',
    description: '거래처 부도·파산 시 낸 부가세를 돌려받는 대손세액공제를 부가가치세법 제45조 기준으로 정리.',
  },
};

const FAQ_ITEMS = [
  {
    question: '대손세액공제가 무엇인가요?',
    answer:
      '물건이나 용역을 팔고 세금계산서를 발행했는데 거래처가 파산·부도 등으로 대금을 못 갚아 매출채권이 회수 불가능해졌을 때, 그 채권에 포함돼 있던 부가가치세를 매출세액에서 빼주는 제도입니다(부가가치세법 §45). 이미 신고·납부한 부가세를 돌려받는 셈이라, 떼인 돈의 일부라도 세금으로 회복할 수 있습니다.',
  },
  {
    question: '대손세액은 얼마를 공제받나요?',
    answer:
      '대손이 확정된 금액에 110분의 10을 곱한 금액을 공제합니다. 예를 들어 부가세 포함 공급대가 1,100만원을 못 받았다면 1,100만원 곱하기 10/110 = 100만원을 매출세액에서 뺄 수 있습니다. 공급가액이 아니라 부가세가 포함된 공급대가 전체에 10/110을 적용하는 점이 핵심입니다.',
  },
  {
    question: '어떤 경우에 대손으로 인정되나요?',
    answer:
      '소득세법·법인세법 시행령상 대손금으로 인정되는 사유가 기준입니다. 대표적으로 채권의 소멸시효 완성, 채무자의 파산·강제집행·사업폐지·사망·실종, 법원의 회생계획인가 결정에 따른 채무 출자전환, 그리고 어음·수표의 부도발생일부터 6개월이 지난 경우 등이 있습니다. 단순히 거래처가 대금을 미룬다는 사정만으로는 대손으로 인정되지 않습니다.',
  },
  {
    question: '대손세액공제는 언제까지 받을 수 있나요?',
    answer:
      '재화·용역의 공급일부터 10년이 지난 날이 속하는 과세기간에 대한 확정신고 기한까지의 대손세액에 대해 공제받을 수 있습니다. 즉 아주 오래된 채권은 대손이 확정돼도 공제 기한을 넘길 수 있으니, 대손 사유가 생기면 해당 과세기간 확정신고 때 잊지 말고 반영해야 합니다.',
  },
  {
    question: '예정신고 때도 대손세액공제를 받을 수 있나요?',
    answer:
      '대손세액공제는 원칙적으로 확정신고 때 적용합니다. 예정신고 단계에서 대손세액공제를 반영하면 이후 가산세 등의 문제가 생길 수 있으므로, 대손이 확정된 과세기간의 확정신고 때 신청하는 것이 안전합니다. 대손세액공제신고서와 대손 사실을 증명하는 서류를 함께 제출해야 합니다.',
  },
  {
    question: '못 받은 돈을 나중에 회수하면 어떻게 되나요?',
    answer:
      '대손세액공제를 받은 뒤 그 채권의 전부 또는 일부를 회수하면, 회수한 금액에 해당하는 대손세액을 회수한 날이 속하는 과세기간의 매출세액에 다시 더해야 합니다. 즉 공제로 돌려받았던 세액을 회수분만큼 반환하는 구조입니다. 회수 사실을 누락하면 나중에 가산세가 부과될 수 있습니다.',
  },
  {
    question: '물건을 산 쪽(공급받은 자)은 어떻게 되나요?',
    answer:
      '공급받은 사업자가 매입세액을 이미 공제받았는데 대금을 갚지 않아 공급자가 대손세액공제를 받으면, 공급받은 자는 그 대손세액을 매입세액에서 빼야 합니다(대손처분받은 세액). 이후 그 대금을 변제하면 변제한 금액에 해당하는 세액을 다시 매입세액에 더할 수 있습니다.',
  },
  {
    question: '간이과세자도 대손세액공제를 받을 수 있나요?',
    answer:
      '대손세액공제는 세금계산서를 발행하고 매출세액을 신고하는 일반과세자 구조를 전제로 합니다. 간이과세자는 부가세 계산 방식이 달라 일반과세자와 동일한 대손세액공제를 적용받기 어렵습니다. 본인 과세유형에서의 적용 가능 여부는 관할 세무서나 세무대리인에게 확인하는 것이 정확합니다.',
  },
];

export default function VatBadDebtTaxCredit2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '부가세 대손세액공제 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '부가세 대손세액공제 2026, 못 받은 외상값 세금 돌려받기',
    description:
      '거래처 파산·부도로 회수 불가능해진 매출채권의 부가세를 돌려받는 대손세액공제. 대손사유, 10/110 계산, 공급일 10년 기한을 부가가치세법 제45조 기준으로 정리한 가이드.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['부가세', '대손세액공제', '매출채권', '소멸시효', '부가가치세법'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '부가세 대손세액공제 2026',
    description: '거래처 부도·파산 시 낸 부가세를 돌려받는 대손세액공제를 정리한 가이드.',
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
                    { name: '부가세 대손세액공제 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">개인사업자·법인 · 8분 읽기 · 2026-07-27</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  부가세 대손세액공제 2026
                  <br />
                  <span className="text-2xl text-text-secondary">못 받은 외상값 세금 돌려받기</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  물건을 팔고 세금계산서까지 끊었는데 거래처가 부도나 파산으로 대금을 안 갚으면, 물건값도 잃고 이미 낸 부가세까지 이중으로 손해를 봅니다. 부가세 대손세액공제는 이렇게 회수 불가능해진 매출채권의 부가세를 돌려받게 해주는 제도입니다. 이 가이드는 대손으로 인정되는 사유, 공제액 계산, 공급일 10년 기한을 부가가치세법 제45조 기준으로 정리합니다.
                </p>
              </header>

              <AdSlot slot="guide-vat-bad-debt-tax-credit-top" format="horizontal" />

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">대손세액공제란 무엇인가요?</h2>
                <p>
                  대손세액공제는 부가가치세가 과세되는 재화·용역을 공급하고 그 매출채권이 거래처의 파산·부도 등으로 회수 불가능해졌을 때, 그 채권에 포함돼 있던 부가세를 매출세액에서 빼주는 제도입니다(부가가치세법 §45). 이미 신고·납부한 부가세를 돌려받는 것이라, 떼인 돈의 손실을 일부라도 세금으로 회복할 수 있습니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">핵심 요약</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    · 대상: 회수 불가능한 매출채권에 포함된 부가세
                    <br />
                    · 공제액: 대손금액 곱하기 10/110
                    <br />
                    · 반영 시점: 대손 확정된 과세기간의 확정신고
                    <br />
                    · 기한: 공급일부터 10년이 지난 날이 속하는 과세기간 확정신고기한까지
                  </p>
                </div>
                <p className="mt-4">
                  다만 단순히 거래처가 대금을 늦게 준다는 사정만으로는 대손이 아닙니다. 법에서 정한 대손 사유가 확정돼야 공제를 받을 수 있습니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">어떤 경우에 대손으로 인정되나요?</h2>
                <p>
                  대손 사유는 소득세법·법인세법 시행령에서 정한 대손금 인정 기준을 따릅니다. 대표적인 사유는 다음과 같습니다.
                </p>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li>
                    <strong>소멸시효 완성:</strong> 외상매출금·받을어음 등 채권의 소멸시효가 완성된 경우.
                  </li>
                  <li>
                    <strong>파산·강제집행:</strong> 채무자의 파산, 강제집행, 사업 폐지, 사망·실종 등으로 회수할 수 없는 경우.
                  </li>
                  <li>
                    <strong>회생계획인가:</strong> 채무자 회생 및 파산에 관한 법률에 따른 법원의 회생계획인가 결정으로 채무가 출자전환되는 경우.
                  </li>
                  <li>
                    <strong>부도 6개월 경과:</strong> 부도가 발생한 어음·수표·중소기업의 외상매출금 등이 부도발생일부터 6개월이 지난 경우.
                  </li>
                </ul>
                <p className="mt-4">
                  예외: 부도 6개월 경과에 따른 대손은 저당권 설정분 등 일부 회수 가능한 채권을 제외하는 등 세부 요건이 있습니다. 사유별로 요건이 다르므로 대손 처리 전 증빙을 갖추고 세무대리인과 확인하는 것이 안전합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">대손세액은 어떻게 계산하나요?</h2>
                <p>
                  대손세액은 대손이 확정된 금액(부가세 포함 공급대가)에 110분의 10을 곱해 계산합니다. 공급가액이 아니라 부가세가 포함된 금액 전체에 10/110을 적용하는 점을 기억하세요.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3">
                  <p className="font-semibold text-text-primary">사례 1. 공급대가 1,100만원을 못 받은 경우</p>
                  <p className="text-sm text-text-secondary">
                    · 대손 확정 금액(부가세 포함): 1,100만원
                    <br />
                    · 대손세액 = 1,100만원 곱하기 10/110 = <strong>100만원</strong>
                    <br />
                    · 확정신고 시 매출세액에서 100만원 차감
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3">
                  <p className="font-semibold text-text-primary">사례 2. 공급대가 3,300만원 중 절반만 대손 확정</p>
                  <p className="text-sm text-text-secondary">
                    · 대손 확정 금액: 3,300만원의 절반 = 1,650만원
                    <br />
                    · 대손세액 = 1,650만원 곱하기 10/110 = <strong>150만원</strong>
                    <br />
                    <span className="text-xs text-text-tertiary">부분 회수·부분 대손이면 대손 확정된 금액만 기준으로 계산합니다.</span>
                  </p>
                </div>
                <p className="mt-4">
                  다만 대손세액공제를 받은 뒤 그 채권을 나중에 회수하면, 회수한 금액에 해당하는 대손세액을 회수한 과세기간의 매출세액에 다시 더해야 합니다.
                </p>
              </section>

              <AdSlot slot="guide-vat-bad-debt-tax-credit-mid" format="rectangle" />

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">언제, 어떻게 신청하나요?</h2>
                <p>
                  대손세액공제는 대손이 확정된 날이 속하는 과세기간의 확정신고 때 신청합니다. 예정신고 단계에서 미리 반영하면 이후 가산세 등의 문제가 생길 수 있으므로 확정신고 때 반영하는 것이 원칙입니다.
                </p>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li>
                    <strong>제출 서류:</strong> 대손세액공제신고서와 대손 사실을 증명하는 서류(부도어음, 소멸시효 완성 증빙, 법원 결정문 등).
                  </li>
                  <li>
                    <strong>공제 기한:</strong> 공급일부터 10년이 지난 날이 속하는 과세기간 확정신고기한까지. 오래된 채권은 기한 경과에 주의.
                  </li>
                  <li>
                    <strong>회수 시 반환:</strong> 공제 후 회수하면 회수분 세액을 매출세액에 다시 가산.
                  </li>
                </ul>
                <p className="mt-4">
                  예외: 매출채권을 정당한 대손 사유 없이 임의로 대손 처리하면 공제가 부인되고 가산세 대상이 될 수 있습니다. 사유 확정 시점과 증빙을 정확히 맞추는 것이 중요합니다.
                </p>
              </section>

              <section className="space-y-6 border-t border-border-base pt-8">
                <h2 className="text-2xl font-bold">물건을 산 쪽(공급받은 자)의 처리</h2>
                <p>
                  대손세액공제는 파는 쪽만의 문제가 아닙니다. 공급받은 사업자가 매입세액을 이미 공제받고도 대금을 갚지 않아 공급자가 대손세액공제를 받으면, 공급받은 자는 그 대손세액을 매입세액에서 빼야 합니다(대손처분받은 세액).
                </p>
                <p className="mt-4">
                  이후 공급받은 자가 그 대금을 변제하면, 변제한 금액에 해당하는 세액을 변제한 과세기간의 매입세액에 다시 더할 수 있습니다. 즉 대손세액은 파는 쪽과 사는 쪽 모두에서 대칭적으로 조정되어 부가세 체계의 균형이 유지됩니다.
                </p>
              </section>

              <h2 className="text-2xl font-bold mb-6">자주 묻는 질문</h2>
              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h3 className="text-lg font-semibold text-text-primary">관련 계산기 및 가이드</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link
                    href="/guide/vat-early-refund-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">부가세 조기환급</div>
                    <p className="mt-1 text-sm text-text-secondary">환급을 앞당겨 받는 조기환급 요건과 신청법.</p>
                  </Link>
                  <Link
                    href="/guide/vat-non-deductible-input-tax-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">매입세액 불공제</div>
                    <p className="mt-1 text-sm text-text-secondary">공제받지 못하는 매입세액 항목을 미리 확인하세요.</p>
                  </Link>
                  <Link
                    href="/guide/simplified-taxation-vat-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">간이과세 부가세</div>
                    <p className="mt-1 text-sm text-text-secondary">간이과세자의 부가세 계산과 일반과세 전환 기준.</p>
                  </Link>
                  <Link
                    href="/guide/business-closure-vat-final-return-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">폐업 부가세 확정신고</div>
                    <p className="mt-1 text-sm text-text-secondary">사업을 접을 때 마지막 부가세 신고 방법.</p>
                  </Link>
                  <Link
                    href="/guide/credit-card-sales-vat-deduction-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">신용카드 발행세액공제</div>
                    <p className="mt-1 text-sm text-text-secondary">카드·현금영수증 매출에 대한 부가세 세액공제.</p>
                  </Link>
                  <Link
                    href="/category/tax/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">모든 세금 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">종합소득세·양도세·취득세 계산기 모음.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 교육 목적으로 작성되었으며 개인 맞춤형 세무 조언이 아닙니다. 대손 사유의 인정 여부와 공제 시점은 개별 거래와 증빙에 따라 달라지므로, 실제 신고 전 관할 세무서 또는 세무대리인에게 반드시 확인하세요. 본 콘텐츠는 2026-07-27 기준으로 작성되었으며 법령 개정 시 업데이트됩니다. 근거 법령은 부가가치세법 §45(대손세액의 공제특례)입니다. AI 보조 작성 후 운영자 검수 완료.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터</a>,{' '}
                  <a href="https://www.nts.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">국세청</a>,{' '}
                  <a href="https://www.hometax.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">홈택스</a>.
                </p>
              </section>

              <ShareButtons
                title="부가세 대손세액공제 2026, 못 받은 외상값 세금 돌려받기"
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
