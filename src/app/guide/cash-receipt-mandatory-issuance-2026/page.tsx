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

const URL = 'https://calculatorhost.com/guide/cash-receipt-mandatory-issuance-2026/';
const DATE_PUBLISHED = '2026-08-06';
const DATE_MODIFIED = '2026-08-06';

export const metadata: Metadata = {
  title: '현금영수증 의무발행, 10만원·미발급 가산세 20% 정리',
  description:
    '의무발행업종은 건당 10만원 이상 현금거래 시 소비자가 요구하지 않아도 현금영수증을 발급해야 합니다. 미발급 가산세 20%, 자진발급 방법, 소비자 신고 절차를 소득세법 §162의3 기준으로 정리했습니다.',
  keywords: [
    '현금영수증 의무발행',
    '현금영수증 미발급 가산세',
    '의무발행업종',
    '현금영수증 자진발급',
    '현금영수증 발급거부 신고',
    '10만원 현금영수증',
    '소득세법 162조의3',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '현금영수증 의무발행과 미발급 가산세' }],
    title: '현금영수증 의무발행, 10만원·미발급 가산세 20% 정리',
    description: '의무발행업종 건당 10만원 이상 현금거래는 요구 없어도 발급 의무. 미발급 가산세 20%와 신고 절차.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '현금영수증 의무발행 가산세 20%',
    description: '의무발행업종 10만원 이상 현금거래 미발급 시 가산세 20%. 자진발급 방법과 소비자 신고까지.',
  },
};

const FAQ_ITEMS = [
  {
    question: '현금영수증 의무발행이 무엇인가요?',
    answer:
      '의무발행업종 사업자가 건당 10만원 이상(부가세 포함) 현금거래를 하면, 소비자가 요구하지 않아도 반드시 현금영수증을 발급해야 하는 제도입니다(소득세법 §162의3). 일반 업종은 소비자가 요청할 때만 발급하면 되지만, 의무발행업종은 요청과 무관하게 발급 의무가 있습니다.',
  },
  {
    question: '어떤 업종이 의무발행 대상인가요?',
    answer:
      '변호사·세무사 등 전문직, 병·의원, 학원, 골프장, 예식장, 산후조리원, 가구·전자제품 소매 등 국세청이 지정한 업종입니다. 대상 업종은 해마다 확대되고 있으므로, 본인 업종이 포함되는지 소득세법 시행령 별표와 홈택스에서 반드시 확인해야 합니다.',
  },
  {
    question: '미발급하면 가산세가 얼마인가요?',
    answer:
      '미발급 금액의 20%가 가산세로 부과됩니다(소득세법 §81의9). 2018년까지는 50% 과태료였으나 2019년부터 20% 가산세로 바뀌었습니다. 예를 들어 30만원 현금거래를 발급하지 않으면 6만원이 가산세로 붙습니다.',
  },
  {
    question: '소비자가 현금영수증을 원하지 않으면 어떻게 하나요?',
    answer:
      '소비자가 원하지 않거나 인적사항(휴대폰번호 등)을 알려주지 않아도 발급 의무는 그대로 있습니다. 이 경우 현금을 받은 날부터 5일 이내에 국세청 지정번호 010-000-1234로 자진발급하면 의무를 이행한 것으로 인정됩니다.',
  },
  {
    question: '10만원 미만 거래도 발급해야 하나요?',
    answer:
      '의무발행 대상은 건당 10만원 이상입니다. 10만원 미만은 의무발행 대상은 아니지만, 소비자가 요청하면 발급해야 합니다. 요청받고도 발급을 거부하면 발급거부에 해당해 별도 불이익이 있을 수 있습니다.',
  },
  {
    question: '소비자는 미발급을 어떻게 신고하나요?',
    answer:
      '거래일부터 5년 이내에 홈택스 또는 손택스에서 신고할 수 있습니다. 경로는 홈택스 > 상담·불복·제보 > 현금영수증·신용카드 미발급/발급거부입니다. 거래 증빙(계좌이체 내역, 영수증 등)을 함께 제출하면 처리가 빠릅니다.',
  },
  {
    question: '현금영수증을 발급하면 소비자에게 어떤 이득이 있나요?',
    answer:
      '근로자는 현금영수증 사용액이 연말정산 소득공제 대상이 됩니다. 신용카드보다 공제율이 높아(현금영수증·체크카드 30%) 현금 결제 시 발급받으면 세금 환급에 유리합니다.',
  },
  {
    question: '발급했다가 취소하거나 정정할 수 있나요?',
    answer:
      '네, 거래 취소나 금액 오류가 있으면 현금영수증도 취소·정정할 수 있습니다. 홈택스에서 발급 내역을 조회해 정정 처리하며, 실제 거래와 다르게 허위로 발급하면 별도 제재를 받을 수 있으니 실제 거래대로 처리해야 합니다.',
  },
];

export default function CashReceiptMandatoryIssuance2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '현금영수증 의무발행 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '현금영수증 의무발행, 10만원·미발급 가산세 20% 정리',
    description:
      '의무발행업종의 현금영수증 발급 의무(건당 10만원 이상), 미발급 가산세 20%, 자진발급 방법, 소비자 신고 절차를 소득세법 §162의3·§81의9 기준으로 정리한 가이드.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['현금영수증', '의무발행', '가산세', '자영업자', '소득세법'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '현금영수증 의무발행 2026',
    description: '의무발행업종의 현금영수증 발급 의무와 미발급 가산세, 신고 절차 정리.',
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
                    { name: '현금영수증 의무발행 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">자영업자·개인사업자 · 7분 읽기 · 2026-08-06</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  현금영수증 의무발행
                  <br />
                  <span className="text-2xl text-text-secondary">10만원 이상, 미발급 가산세 20%</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  이 가이드는 의무발행업종에 해당하는 자영업자·개인사업자, 그리고 현금 결제 후 영수증을 챙기려는 소비자를 위한 글입니다. 어떤 거래에 발급 의무가 있는지, 미발급 시 가산세가 얼마인지, 소비자가 요구하지 않을 때는 어떻게 처리하는지를 소득세법 조문에 근거해 정리합니다.
                </p>
              </header>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">현금영수증 의무발행이란</h2>
                <p>
                  의무발행업종 사업자가 건당 10만원 이상(부가가치세 포함) 현금거래를 하면, 소비자가 요구하지 않아도 현금영수증을 발급해야 하는 제도입니다(소득세법 §162의3). 현금 거래의 세원을 투명하게 관리하기 위해 도입됐습니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">일반 업종과의 차이</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    일반 업종: 소비자가 요청할 때만 발급
                    <br />
                    의무발행업종: 요청 여부와 무관하게 10만원 이상 현금거래는 무조건 발급
                  </p>
                </div>
                <p className="mt-4">
                  즉 의무발행업종은 손님이 "현금영수증 안 해도 된다"고 말해도 발급 의무가 사라지지 않습니다. 이 점이 일반 업종과의 결정적 차이입니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">어떤 업종·금액이 대상인가</h2>
                <p>
                  발급 의무는 두 조건이 동시에 충족될 때 생깁니다. 업종이 의무발행업종이어야 하고, 거래금액이 건당 10만원 이상이어야 합니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 현금영수증 의무발행 조건 (소득세법 §162의3)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">항목</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">내용</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">대상 업종</td>
                        <td className="p-3">전문직·병의원·학원·골프장·예식장 등 지정 업종</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">대상 금액</td>
                        <td className="p-3">건당 <strong>10만원 이상</strong> (부가세 포함)</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">소비자 요구</td>
                        <td className="p-3">필요 없음 (요구 없어도 발급 의무)</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">인적사항 모를 때</td>
                        <td className="p-3">5일 내 010-000-1234로 자진발급</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  의무발행업종은 해마다 확대되고 있습니다. 최근에는 소비자 대상 거래가 많은 소매·서비스 업종이 계속 추가돼 왔으므로, 본인 업종이 새로 포함됐는지 매년 확인하는 것이 안전합니다.
                </p>
                <p className="mt-4">
                  다만 정확한 업종 목록은 소득세법 시행령 별표로 정해지며 수시로 바뀝니다. 본인 사업자등록의 업종코드가 대상인지는 홈택스 또는 관할 세무서에서 확인하세요.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">발급 안 하면 가산세가 얼마인가 (계산 사례)</h2>
                <p>
                  의무발행 대상 거래를 발급하지 않으면 미발급 금액의 20%가 가산세로 부과됩니다(소득세법 §81의9). 아래 사례로 부담 규모를 확인합니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 1. 30만원 현금거래 1건 미발급</p>
                  <p className="text-sm text-text-secondary">
                    · 미발급 금액: 300,000원
                    <br />
                    · 가산세: 300,000 × 20% = <strong>60,000원</strong>
                    <br />
                    <span className="text-xs text-text-tertiary">거래 한 건만으로도 6만원의 가산세가 붙습니다.</span>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 2. 15만원 거래 10건 누적 미발급</p>
                  <p className="text-sm text-text-secondary">
                    · 미발급 금액 합계: 1,500,000원
                    <br />
                    · 가산세: 1,500,000 × 20% = <strong>300,000원</strong>
                    <br />
                    <span className="text-xs text-text-tertiary">경계값: 건당 10만원을 넘는 15만원 거래는 모두 의무발행 대상입니다. 소액이라도 누적되면 가산세가 커집니다.</span>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 3. 9만원 거래 (의무발행 대상 아님)</p>
                  <p className="text-sm text-text-secondary">
                    · 거래금액 90,000원은 10만원 미만 → 의무발행 대상 아님
                    <br />
                    · 다만 소비자가 요청하면 발급해야 하며, 거부 시 발급거부 제재 가능
                    <br />
                    <span className="text-xs text-text-tertiary">경계값: 10만원을 기준으로 무조건 발급 의무 여부가 갈립니다.</span>
                  </p>
                </div>
                <p className="mt-4">
                  다만 가산세는 자진발급으로 예방할 수 있습니다. 손님이 인적사항을 주지 않아도 5일 내 자진발급하면 의무를 이행한 것이 되어 가산세가 부과되지 않습니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">소비자는 어떻게 신고하나</h2>
                <p>
                  의무발행업종에서 10만원 이상 현금거래를 하고도 현금영수증을 받지 못했다면, 소비자가 직접 신고할 수 있습니다. 절차는 다음과 같습니다.
                </p>
                <ol className="space-y-3 ml-6 list-decimal text-text-secondary">
                  <li>
                    <strong>증빙 확보:</strong> 계좌이체 내역, 간이영수증, 거래 메시지 등 현금거래를 입증할 자료를 모읍니다.
                  </li>
                  <li>
                    <strong>홈택스 신고:</strong> 홈택스 또는 손택스에서 상담·불복·제보 &gt; 현금영수증·신용카드 미발급/발급거부 메뉴로 신고합니다.
                  </li>
                  <li>
                    <strong>신고 기한:</strong> 거래일부터 5년 이내에 신고할 수 있습니다. 오래된 거래도 기한 내라면 신고가 가능합니다.
                  </li>
                </ol>
                <p className="mt-4">
                  예외: 소비자가 스스로 인적사항 제공을 거부해 사업자가 5일 내 자진발급을 마친 경우에는 미발급으로 보지 않습니다. 신고 전 사업자가 자진발급했는지 홈택스에서 조회해볼 수 있습니다.
                </p>
              </section>

              <section className="space-y-6 border-t border-border-base pt-8">
                <h2 className="text-2xl font-bold">사업자가 실무에서 챙길 점</h2>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li>
                    <strong>POS·발급 자동화:</strong> 10만원 이상 현금거래를 놓치지 않도록 POS나 홈택스 발급 절차를 자동화해 두면 누락 위험이 줄어듭니다.
                  </li>
                  <li>
                    <strong>자진발급 습관화:</strong> 손님이 원치 않아도 010-000-1234로 자진발급하는 것을 기본값으로 두면 가산세를 원천 차단할 수 있습니다.
                  </li>
                  <li>
                    <strong>업종 편입 확인:</strong> 매년 의무발행업종이 확대되므로, 새로 편입됐는지 사업연도 초에 확인하세요. 편입 사실을 몰라 미발급하는 사례가 많습니다.
                  </li>
                </ul>
              </section>

              <h2 className="text-2xl font-bold mb-6">자주 묻는 질문</h2>
              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h3 className="text-lg font-semibold text-text-primary">관련 계산기 및 가이드</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link
                    href="/calculator/freelancer-tax/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">프리랜서 종합소득세 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">사업소득 종합소득세를 계산해보세요.</p>
                  </Link>
                  <Link
                    href="/guide/qualified-receipt-evidence-penalty-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">적격증빙과 증빙불비 가산세</div>
                    <p className="mt-1 text-sm text-text-secondary">세금계산서·현금영수증 등 적격증빙 정리.</p>
                  </Link>
                  <Link
                    href="/guide/simplified-taxpayer-tax-invoice-obligation-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">간이과세자 세금계산서 의무</div>
                    <p className="mt-1 text-sm text-text-secondary">간이과세 사업자의 증빙 발급 의무.</p>
                  </Link>
                  <Link
                    href="/guide/credit-card-sales-vat-deduction-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">신용카드 매출 부가세 공제</div>
                    <p className="mt-1 text-sm text-text-secondary">카드·현금영수증 발행 세액공제 정리.</p>
                  </Link>
                  <Link
                    href="/guide/credit-card-income-deduction-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">신용카드 소득공제 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">현금영수증·체크카드 30% 공제 활용법.</p>
                  </Link>
                  <Link
                    href="/category/tax/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">모든 세금 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">종합소득세·부가세·양도세 모음.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 교육 목적으로 작성되었으며 개인 맞춤형 세무 조언이 아닙니다. 의무발행업종 목록은 소득세법 시행령 별표로 정해지며 수시로 확대되므로, 본인 업종 해당 여부는 홈택스·관할 세무서에서 확인하세요. 가산세율·발급 기준은 세법 개정 시 달라질 수 있습니다. 본 콘텐츠는 2026-08-06 기준으로 작성됐으며, 인용 법조항은 <strong>소득세법 §162의3(발급의무)·§81의9(가산세), 법인세법 §117의2·§75의6</strong>입니다. AI 보조 작성 후 운영자 검수 완료.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터</a>,{' '}
                  <a href="https://www.nts.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">국세청</a>,{' '}
                  <a href="https://hometax.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">홈택스</a>.
                </p>
              </section>

              <ShareButtons
                title="현금영수증 의무발행 2026 가이드"
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
