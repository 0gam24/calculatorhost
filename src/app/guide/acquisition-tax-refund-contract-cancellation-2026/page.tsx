// [revenue-lever: indexing+traffic]
// indexing: 신규 슬러그 색인 표면 확장, 내부 링크 mesh 7개(취득세 계산법·생애최초 감면·다주택 중과·분양권 취득세·세금 허브·취득세 계산기·양도세 계산기).
// traffic: "계약 해제 취득세 환급"·"부동산 계약 파기 세금"·"등기 후 계약해제 취득세" 롱테일 흡수(지방세법 §20·시행령 §20②·지방세기본법 §50).
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

const URL = 'https://calculatorhost.com/guide/acquisition-tax-refund-contract-cancellation-2026/';
const DATE_PUBLISHED = '2026-09-23';
const DATE_MODIFIED = '2026-09-23';

export const metadata: Metadata = {
  title: '취득세 환급 조건 2026, 계약 해제 시 돌려받는 법 | calculatorhost',
  description:
    '부동산 매매계약을 해제해도 취득세가 무조건 환급되지는 않습니다. 등기 전 취득일로부터 60일 이내 해제를 입증해야 하고, 등기를 마친 뒤에는 원칙적으로 돌려받지 못합니다. 지방세법 시행령 §20, 경정청구 절차까지 정리했습니다.',
  keywords: [
    '취득세 환급',
    '계약 해제 취득세',
    '취득세 경정청구',
    '부동산 계약 파기 세금',
    '등기 후 계약해제 취득세',
    '지방세법 20조',
    '위택스 취득세 환급',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '취득세 환급 조건 2026, 계약 해제 시 돌려받는 법' }],
    title: '취득세 환급 조건 2026, 계약 해제 시 돌려받는 법',
    description: '등기 전 60일 이내 해제 입증이 핵심. 등기 후에는 원칙적으로 환급 불가. 경정청구 절차까지 정리.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '취득세 환급 조건 2026, 계약 해제 시 돌려받는 법',
    description: '등기 전 60일 이내 해제 입증이 핵심, 등기 후에는 원칙적으로 환급 불가. 지방세법 시행령 §20.',
  },
};

const FAQ_ITEMS = [
  {
    question: '계약금만 걸고 등기 전에 계약을 해제하면 취득세를 신고하지 않아도 되나요?',
    answer:
      '네, 그럴 수 있습니다. 등기ㆍ등록을 하지 않은 상태에서 취득일로부터 60일 이내에 계약해제 사실이 정해진 서류로 입증되면 애초에 부동산을 취득한 것으로 보지 않습니다(지방세법 시행령 §20②). 이미 신고기한이 지나지 않았다면 취득세 신고 자체를 하지 않아도 됩니다. 다만 입증서류를 갖추지 못하면 원칙대로 과세될 수 있으니 서류를 미리 준비해야 합니다.',
  },
  {
    question: '계약해제를 인정받으려면 어떤 서류를 준비해야 하나요?',
    answer:
      '화해조서ㆍ인낙조서, 공정증서, 행정안전부령으로 정하는 계약해제신고서, 부동산 거래신고 등에 관한 법률 §3조의2에 따라 등록관청에 제출한 부동산거래계약 해제 등 신고서 중 하나로 입증해야 합니다(지방세법 시행령 §20②). 계약해제신고서는 취득일이 속하는 달의 말일부터 3개월 이내에 제출해야 하므로 기한을 놓치지 않도록 주의하세요.',
  },
  {
    question: '등기까지 마친 뒤 계약을 해제하면 정말 방법이 없나요?',
    answer:
      '원칙적으로 방법이 없습니다. 소유권이전등기로 취득이 적법하게 성립한 이후에는 당사자 합의로 계약을 해제하고 부동산을 돌려주더라도 이미 성립한 취득세 납세의무에는 영향을 주지 않는다는 것이 대법원의 확립된 입장입니다. 오히려 부동산을 원매도인에게 돌려주는 행위 자체가 별도의 재취득으로 취급되어 재취득세가 새로 발생할 수 있습니다.',
  },
  {
    question: '이미 낸 취득세를 돌려받으려면 어떻게 신청하나요?',
    answer:
      '지방세기본법 §50①에 따른 경정청구로 신청합니다. 법정신고기한이 지난 후 5년 이내에 관할 지방자치단체에 과세표준과 세액의 경정을 청구할 수 있습니다. 등기 전 60일 이내 해제 요건을 충족한 경우에 한해 인정되므로, 계약해제를 입증하는 서류를 함께 제출해야 합니다.',
  },
  {
    question: '위택스에서 취득세 환급을 신청할 수 있나요?',
    answer:
      '네, 위택스(wetax.go.kr) 온라인으로 경정청구서를 접수할 수 있습니다. 환급 계좌를 미리 등록해두면 처리 속도가 빨라집니다. 다만 서류 심사와 지자체 결정까지 시간이 걸리므로, 급한 경우 관할 세무과에 직접 문의하는 편이 확인이 빠릅니다.',
  },
  {
    question: '계약금을 포기하고 해제하면 그 계약금에도 세금이 붙나요?',
    answer:
      '네, 붙을 수 있습니다. 위약으로 상대방에게 귀속되어 몰수된 계약금은 받는 쪽 입장에서 기타소득으로 분류되어 종합소득세 과세 대상이 될 수 있습니다. 취득세 환급 여부와 계약금의 소득세 처리는 별개의 판단이므로 두 가지를 함께 검토해야 합니다.',
  },
  {
    question: '취득세와 양도소득세는 계약 해제 시 처리 기준이 같나요?',
    answer:
      '다릅니다. 매도인 입장에서 매매계약이 적법하게 합의해제되면 양도 자체가 없었던 것으로 보아 양도소득세를 경정청구로 돌려받을 수 있는 경우가 있습니다. 반면 매수인이 낸 취득세는 등기가 이미 끝났다면 계약해제와 무관하게 환급되지 않는 것이 원칙입니다. 같은 거래라도 세목별로 결론이 달라질 수 있습니다.',
  },
  {
    question: '잔금을 못 치러 계약이 자동 해제된 경우도 같은 기준이 적용되나요?',
    answer:
      '네, 적용됩니다. 매수인이 잔금을 지급하지 못해 계약이 해제된 경우에도 등기ㆍ등록 여부와 취득일로부터 60일이라는 시간 기준은 동일하게 적용됩니다. 등기 전이라면 해제 사실을 정해진 서류로 입증해 환급받을 수 있고, 등기까지 마쳤다면 원칙적으로 돌려받기 어렵습니다.',
  },
];

export default function AcquisitionTaxRefundContractCancellation2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '취득세 환급 조건 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '취득세 환급 조건 2026, 계약 해제 시 돌려받는 법',
    description:
      '부동산 매매계약 해제 시 취득세 환급 가능 여부를 등기 전ㆍ등기 후로 나눠 정리. 지방세법 시행령 §20②의 60일 요건, 입증서류, 지방세기본법 §50 경정청구 절차, 계약금ㆍ양도소득세와의 차이까지 완전 정리.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['취득세 환급', '계약 해제 취득세', '경정청구', '지방세법 20조', '위택스 환급'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '취득세 환급 조건 2026, 계약 해제 시 돌려받는 법',
    description:
      '등기 전 60일 이내 계약해제 입증이 핵심 요건. 등기 후에는 원칙적으로 환급 불가. 경정청구 절차와 필요 서류 정리.',
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
                    { name: '취득세 환급 조건 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">부동산 매수인 · 8분 읽기 · 2026-09-23</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  취득세 환급 조건 2026
                  <br />
                  <span className="text-2xl text-text-secondary">· 계약 해제 시 돌려받는 법</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  부동산 매매계약을 해제했다고 해서 이미 낸 취득세를 무조건 돌려받는 것은 아닙니다. 등기를 마쳤는지, 취득일로부터 며칠이 지났는지에 따라 결과가 완전히 달라집니다. 이 가이드는 취득세가 환급되는 조건과 필요 서류, 경정청구 절차, 등기 후 해제 시 실제로 벌어지는 일을 실제 사례와 함께 정리합니다. 대상 독자는 매매ㆍ분양 계약을 해제했거나 해제를 검토 중인 매수인입니다.
                </p>
              </header>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">계약을 해제하면 취득세를 무조건 돌려받나요?</h2>
                <p>
                  아니요, 등기 여부가 가장 중요한 기준입니다. 취득세는 부동산을 사실상 취득하는 행위 자체에 매겨지는 유통세이기 때문에, 등기ㆍ등록을 마쳐 취득이 적법하게 성립한 뒤에는 나중에 계약을 해제해도 이미 발생한 납세의무 자체는 사라지지 않는 것이 원칙입니다. 반대로 등기 전 짧은 기간 안에 해제한 경우에는 애초에 취득 자체가 없었던 것으로 보아 환급받을 수 있습니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">30초 요약</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    정의: 취득세 환급은 등기 여부와 해제 시점에 따라 갈림.
                    <br />
                    핵심 기준: 미등기 + 취득일로부터 60일 이내 해제 입증(지방세법 시행령 §20②).
                    <br />
                    신청: 지방세기본법 §50① 경정청구, 법정신고기한 후 5년 이내.
                    <br />
                    주의: 등기를 마친 뒤 해제하면 원칙적으로 환급 불가.
                  </p>
                </div>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">등기 전에 계약을 해제하면 취득세를 안 내도 되나요?</h2>
                <p>
                  그럴 수 있습니다. 취득세는 취득일로부터 60일 이내에 신고ㆍ납부해야 하는데(지방세법 §20①), 같은 60일 안에 등기ㆍ등록을 하지 않은 상태에서 계약해제 사실이 정해진 서류로 입증되면 당초부터 부동산을 취득한 것으로 보지 않습니다(지방세법 시행령 §20②). 이 경우 신고기한이 남아 있다면 신고 자체를 하지 않아도 되고, 이미 신고ㆍ납부했다면 경정청구로 돌려받을 수 있습니다.
                </p>
                <p>
                  다만, 60일이 지난 뒤에 해제했거나 이미 잔금을 전부 치러 사실상 취득이 끝난 상태라면 미등기라도 환급이 단순하지 않습니다. 이런 경계 사례는 관할 지방자치단체 세무과나 위택스 상담을 통해 개별로 확인하는 것이 안전합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">계약해제를 인정받으려면 어떤 서류가 필요한가요?</h2>
                <p>
                  법에서 정한 4가지 서류 중 하나로 입증해야 합니다. 화해조서ㆍ인낙조서, 공정증서, 행정안전부령으로 정하는 계약해제신고서, 부동산 거래신고 등에 관한 법률 §3조의2에 따라 등록관청에 제출한 부동산거래계약 해제 등 신고서가 여기 해당합니다(지방세법 시행령 §20②).
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 계약해제 입증서류와 제출 기한 (지방세법 시행령 §20②)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">서류</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">제출ㆍ작성 기한</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">비고</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">화해조서ㆍ인낙조서</td>
                        <td className="p-3">취득일로부터 60일 이내 해제 확인</td>
                        <td className="p-3">법원 조정ㆍ소송 종결 시</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">공정증서</td>
                        <td className="p-3">취득일로부터 60일 이내 공증</td>
                        <td className="p-3">당사자 합의해제 공증</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">계약해제신고서</td>
                        <td className="p-3">취득월 말일부터 3개월 이내</td>
                        <td className="p-3">행정안전부령 서식</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">부동산거래계약 해제 등 신고서</td>
                        <td className="p-3">등록관청 제출분</td>
                        <td className="p-3">부동산거래신고법 §3조의2</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  주의: 구두 합의나 문자ㆍ카카오톡 대화만으로는 입증서류로 인정받기 어렵습니다. 계약을 해제하기로 했다면 위 서류 중 하나를 기한 안에 반드시 갖춰야 나중에 다툼이 생기지 않습니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">등기까지 마쳤다면 방법이 없나요?</h2>
                <p>
                  원칙적으로 방법이 없습니다. 소유권이전등기로 취득이 적법하게 성립한 이후에는 당사자 합의로 계약을 해제하고 부동산을 원매도인에게 돌려주더라도, 이미 성립한 취득세 납세의무 자체에는 영향을 주지 않는다는 것이 대법원의 확립된 입장입니다. 계약이 사후에 없었던 일이 되더라도, 등기 시점에 한 번 성립한 세금은 그대로 유지됩니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3">
                  <p className="font-semibold text-text-primary">사례. 잔금을 못 치러 소송 끝에 소유권을 돌려준 경우</p>
                  <p className="text-sm text-text-secondary">
                    · 매수인이 등기까지 마친 뒤 경영난으로 잔금을 지급하지 못함
                    <br />
                    · 매도인이 계약 해제를 통보하고 소송으로 소유권을 다시 이전받음
                    <br />
                    · 매수인이 이미 낸 취득세는 환급되지 않음
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 등기 이후의 해제ㆍ반환은 별개의 사후 사정일 뿐, 이미 완성된 취득세 납세의무를 되돌리지 못합니다.</span>
                  </p>
                </div>
                <p className="mt-4">
                  다만, 등기 자체가 처음부터 원인무효였거나 사기ㆍ강박 등으로 취소되어 말소된 경우는 합의해제와 다르게 취급될 수 있습니다. 이런 사안은 등기 경위에 따라 결론이 크게 달라지므로 관할 세무서나 세무 전문가에게 개별 확인이 필요합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">이미 낸 취득세를 돌려받으려면 어떻게 신청하나요?</h2>
                <p>
                  지방세기본법 §50①에 따른 경정청구로 신청합니다. 과세표준신고서를 법정신고기한까지 낸 사람은 그 기한이 지난 후 5년 이내에 관할 지방자치단체장에게 세액의 결정 또는 경정을 청구할 수 있습니다. 등기 전 60일 이내 해제 요건을 충족했다는 것을 앞서 정리한 입증서류와 함께 제출해야 합니다.
                </p>
                <ul className="space-y-3 ml-6 list-decimal text-text-secondary">
                  <li>
                    <strong>입증서류 확보:</strong> 화해조서ㆍ공정증서ㆍ계약해제신고서ㆍ부동산거래계약 해제 등 신고서 중 하나를 준비합니다.
                  </li>
                  <li>
                    <strong>경정청구서 작성:</strong> 지방세기본법 시행규칙 서식에 따라 과세표준 및 세액의 결정ㆍ경정청구서를 작성합니다.
                  </li>
                  <li>
                    <strong>접수:</strong> 위택스 온라인 또는 관할 지방자치단체 세무과 방문으로 제출합니다.
                  </li>
                  <li>
                    <strong>결과 통지:</strong> 지자체 심사 후 환급 여부가 결정되며, 환급 계좌를 미리 등록해두면 지급이 빨라집니다.
                  </li>
                </ul>
                <p className="mt-4">
                  다만, 경정청구는 심사 대상일 뿐 자동 승인이 아닙니다. 해제 요건을 갖추지 못했다고 판단되면 거부될 수 있고, 이 경우 지방세 이의신청ㆍ심판청구 등 불복 절차로 다툴 수 있습니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">계약금ㆍ양도소득세는 취득세와 다르게 처리되나요?</h2>
                <p>
                  네, 세목마다 결론이 다릅니다. 위약으로 상대방에게 귀속되어 몰수된 계약금은 받는 쪽 입장에서 기타소득으로 분류되어 종합소득세 과세 대상이 될 수 있습니다. 반면 매도인 입장에서는 매매계약이 적법하게 합의해제되면 양도 자체가 없었던 것으로 보아 이미 낸 양도소득세를 경정청구로 돌려받을 수 있는 경우가 있습니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 2. 계약 해제 시 세목별 처리 비교</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">세목</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">납세자</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">등기 후 해제 시 처리</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">취득세</td>
                        <td className="p-3">매수인</td>
                        <td className="p-3">원칙적으로 환급 불가</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">양도소득세</td>
                        <td className="p-3">매도인</td>
                        <td className="p-3">적법한 합의해제 시 환급 가능한 경우 있음</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">몰수 계약금(기타소득)</td>
                        <td className="p-3">계약금을 취득한 상대방</td>
                        <td className="p-3">종합소득세 과세 대상 검토</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  다만, 양도소득세 환급도 해제가 진정한 합의에 의한 것인지, 세금을 줄이려는 형식적 해제는 아닌지 국세청이 실질을 따져 판단하므로 무조건 인정되는 것은 아닙니다.
                </p>
              </section>

              <h2 className="text-2xl font-bold mb-6">자주 묻는 질문</h2>
              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h3 className="text-lg font-semibold text-text-primary">관련 계산기 및 가이드</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link
                    href="/guide/acquisition-tax-calculation-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">취득세 계산법 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">세율ㆍ중과ㆍ농특세까지 취득세 전체 계산 구조.</p>
                  </Link>
                  <Link
                    href="/guide/first-home-acquisition-tax-reduction-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">생애최초 취득세 감면</div>
                    <p className="mt-1 text-sm text-text-secondary">첫 주택 구입 시 취득세 감면 요건 정리.</p>
                  </Link>
                  <Link
                    href="/guide/multi-house-acquisition-tax-heavy-8-12-percent-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">다주택 취득세 중과 8~12%</div>
                    <p className="mt-1 text-sm text-text-secondary">2주택ㆍ3주택 이상 중과세율 적용 기준.</p>
                  </Link>
                  <Link
                    href="/guide/presale-right-acquisition-tax-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">분양권 취득세</div>
                    <p className="mt-1 text-sm text-text-secondary">분양권 상태에서 취득세가 매겨지는 시점.</p>
                  </Link>
                  <Link
                    href="/calculator/acquisition-tax/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">취득세 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">구입가를 입력해 예상 취득세를 바로 계산해보세요.</p>
                  </Link>
                  <Link
                    href="/calculator/capital-gains-tax/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">양도소득세 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">매도인 입장의 양도세를 함께 확인해보세요.</p>
                  </Link>
                  <Link
                    href="/category/tax/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">모든 세금 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">양도세ㆍ취득세ㆍ재산세ㆍ상속세ㆍ증여세 모음.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 이 글은 AI 보조로 자동 생성되어 자동 품질 게이트를 통과한 뒤 발행되었습니다. 발행 시점에 사람의 사전 검수는 없었으며, 운영자가 사후 점검합니다. 개별 계약해제의 취득세 환급 가능 여부는 등기 경위ㆍ해제 시점ㆍ입증서류에 따라 달라지므로, 실제 신청 전 관할 지방자치단체 세무과 또는 세무 전문가와 반드시 확인하세요. 본 콘텐츠는 2026-09-23을 기준으로 작성되었으며, 관련 법령 개정 시 업데이트됩니다. 인용 법조항: 지방세법 §20(신고 및 납부), 지방세법 시행령 §20②(취득의 시기 및 계약해제 시 취득으로 보지 않는 요건), 지방세기본법 §50①(경정청구), 부동산 거래신고 등에 관한 법률 §3조의2(부동산거래계약 해제 등 신고).
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터</a>,{' '}
                  <a href="https://www.wetax.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">위택스</a>.
                </p>
              </section>

              <ShareButtons
                title="취득세 환급 조건 2026, 계약 해제 시 돌려받는 법 가이드"
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
