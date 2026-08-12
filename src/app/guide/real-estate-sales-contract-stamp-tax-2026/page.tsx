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

const URL = 'https://calculatorhost.com/guide/real-estate-sales-contract-stamp-tax-2026/';
const DATE_PUBLISHED = '2026-08-07';
const DATE_MODIFIED = '2026-08-07';

export const metadata: Metadata = {
  title: '부동산 매매계약서 인지세 2026, 얼마·누가·언제 납부하나',
  description:
    '부동산 매매계약서 인지세는 기재금액에 따라 2만~35만 원 정액이며, 계약서 작성월 다음 달 10일까지 전자수입인지로 납부합니다. 매수인·매도인 연대납세, 가산세 최대 300%, 취득세와의 차이까지 인지세법 §3·§8 기준으로 정리.',
  keywords: [
    '부동산 인지세',
    '매매계약서 인지세',
    '인지세 얼마',
    '인지세 누가 내나요',
    '전자수입인지 부동산',
    '인지세 가산세',
    '부동산 매매 세금',
    '인지세법 3조',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '부동산 매매계약서 인지세 2026, 얼마·누가·언제 완전 정리' }],
    title: '부동산 매매계약서 인지세 2026, 얼마·누가·언제 완전 정리',
    description:
      '기재금액 2만~35만 원 정액, 다음 달 10일 납부, 전자수입인지 방식. 매수인·매도인 연대납세와 가산세까지 인지세법 §3·§8 기준.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '부동산 매매계약서 인지세 2026, 얼마·누가·언제 납부',
    description: '매매가 1억~10억 15만 원, 10억 초과 35만 원. 계약 작성월 다음 달 10일까지 전자수입인지로 납부.',
  },
};

const FAQ_ITEMS = [
  {
    question: '매매가 1억 원 이하이면 인지세는 얼마인가요?',
    answer:
      '5천만 원 초과 1억 원 이하 구간은 7만 원입니다. 1천만 원 이하 소액 거래는 비과세이며, 1천만 원 초과 3천만 원 이하 2만 원, 3천만 원 초과 5천만 원 이하 4만 원입니다. 1억 원을 1원이라도 넘어서면 다음 구간인 15만 원으로 세액이 두 배 이상 뜁니다. 아파트 매매는 대부분 1억 원을 넘기 때문에 실무에서는 15만 원 또는 10억 초과의 35만 원이 가장 흔합니다.',
  },
  {
    question: '매매계약서를 2장 만들면 인지세도 2건 다 내야 하나요?',
    answer:
      '원칙적으로 문서 각각에 인지세 납부 의무가 발생합니다. 다만 실무 관행상 등기용 정본 1부에만 전자수입인지를 첩부·소인해 인지세 의무를 이행하고, 매도인 보관용 사본은 별도 첩부 없이 처리하는 경우가 많습니다. 다수 원본을 등기·행정 용도로 각각 사용한다면 별도 확인이 필요하므로, 법무사나 관할 세무서에 문서 수를 알려주고 상의하세요.',
  },
  {
    question: '잔금일 기준인가요, 계약서 작성일 기준인가요?',
    answer:
      '계약서 작성일이 기준입니다. 인지세는 증서를 작성한 달의 다음 달 10일까지 납부해야 하며, 잔금일이나 등기접수일과는 무관합니다. 예를 들어 8월 3일에 계약서에 서명·날인했다면 9월 10일까지가 납부기한이며, 잔금이 12월이라도 앞당겨 납부해야 합니다. 잔금일에 맞춰 미루면 미납 가산세 대상이 될 수 있으니 주의하세요.',
  },
  {
    question: '아파트 분양(청약) 계약서도 인지세 대상인가요?',
    answer:
      '네, 분양계약서도 부동산 인지세 대상입니다. 2023년 이후 실무는 수분양자와 공급사업자(시행사·시공사)가 절반씩 나누어 부담하는 방식으로 정착돼, 예전처럼 청약 당첨자 혼자 전액을 떠안는 사례가 줄었습니다. 실제 배분은 분양계약서 특약과 안내문에 명시되므로, 계약 전 반드시 조항을 확인하세요.',
  },
  {
    question: '매매계약이 파기되면 이미 낸 인지세는 돌려받을 수 있나요?',
    answer:
      '원칙적으로 환급이 어렵습니다. 인지세는 계약서라는 "문서 작성 행위" 자체에 부과되므로, 사후에 매매가 취소·해제되더라도 이미 유효하게 작성된 문서에 대한 세금은 소멸하지 않는 것이 원칙입니다. 다만 소인(消印) 전에 문서를 사용하지 않았다면 예외적 환급 신청이 가능한 경우가 있으니, 관할 세무서에 개별 문의하세요.',
  },
  {
    question: '매수인·매도인 중 한쪽이 인지세를 안 내겠다고 하면 어떻게 하나요?',
    answer:
      '공동작성자는 연대납세 의무가 있어 세무당국은 누구에게든 전액을 징수할 수 있습니다. 즉 한쪽이 안 냈어도 상대방에게 전액이 청구될 수 있으며, 이후 상대에게 절반을 구상하는 구조입니다. 실무 관행상 매수인이 등기와 함께 일괄 처리하는 경우가 많지만 이는 관행일 뿐이므로, 분쟁을 막으려면 계약서 특약에 부담자를 미리 명시해두는 것이 안전합니다.',
  },
  {
    question: '상속·증여로 부동산 명의 이전 시에도 인지세를 내나요?',
    answer:
      '상속은 별도의 계약서 작성이 없으므로 인지세 대상이 아닙니다. 반면 증여의 경우 증여계약서를 작성하면 인지세법 §3에 따라 매매와 동일한 기재금액별 세액표(2만~35만 원)가 적용됩니다. 다만 상속·증여는 별도의 상속세·증여세 부담이 훨씬 크므로, 인지세보다 그쪽을 우선 검토·설계해야 합니다.',
  },
  {
    question: '인지세를 안 내면 얼마나 물게 되나요?',
    answer:
      '납부지연 정도에 따라 미납세액의 최대 300%까지 가산세가 부과됩니다. 예를 들어 인지세 15만 원을 오랫동안 미납하면 본세보다 훨씬 큰 가산액이 붙어 총 부담이 수십만 원대로 커질 수 있습니다. 정확한 가산율 구간은 인지세법 시행령과 국세청 안내를 따르므로, 미납 사실을 확인했다면 최대한 빨리 납부하고 관할 세무서에 문의하세요.',
  },
];

export default function RealEstateSalesContractStampTax2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '부동산 매매계약서 인지세 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '부동산 매매계약서 인지세 2026, 얼마·누가·언제 납부하나',
    description:
      '부동산 매매계약서 인지세는 기재금액에 따라 2만~35만 원 정액이며, 계약서 작성월 다음 달 10일까지 전자수입인지로 납부합니다. 매수인·매도인 연대납세, 가산세 최대 300%, 취득세와의 차이까지 인지세법 §3·§8 기준으로 정리.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['부동산 인지세', '매매계약서 인지세', '전자수입인지', '연대납세', '인지세법 3조', '인지세 가산세'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '부동산 매매계약서 인지세 2026',
    description:
      '부동산 매매계약서 작성 시 기재금액별 인지세액, 납부기한, 전자수입인지 절차, 매수인·매도인 부담 원칙과 가산세까지 정리.',
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
                    { name: '부동산 매매계약서 인지세 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">부동산 매매 당사자 · 8분 읽기 · 2026-08-07</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  부동산 매매계약서 인지세 2026
                  <br />
                  <span className="text-2xl text-text-secondary">얼마·누가·언제, 전자수입인지 완전 정리</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  집을 사고팔면 취득세와 중개수수료만 챙기다 인지세를 잊는 경우가 많습니다. 매매계약서에 서명한 순간부터 인지세 납부 의무가 시작되며, 작성월 다음 달 10일까지 전자수입인지로 납부하지 않으면 미납세액의 최대 300%까지 가산세가 붙습니다. 이 가이드는 아파트·오피스텔·단독주택 매매 당사자를 위해 얼마·누가·언제·어떻게 내야 하는지, 취득세·중개수수료와 무엇이 다른지 인지세법 §3·§8 기준으로 정리합니다.
                </p>
              </header>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">30초 요약, 기재금액별 인지세액</h2>
                <p>
                  부동산 매매계약서 인지세는 계약서에 적힌 기재금액(매매가)에 따라 2만 원부터 35만 원까지 정액으로 부과되는 국세입니다(인지세법 §3①제1호). 세율표(%)가 아니라 금액 구간별 정액이라는 점이 취득세와 크게 다릅니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 부동산 소유권 이전 증서 기재금액별 인지세액 (인지세법 §3①제1호, 2026 기준)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">기재금액 (매매가)</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">인지세액</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">비고</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">1천만 원 이하</td>
                        <td className="p-3"><strong>비과세</strong></td>
                        <td className="p-3">소액 거래 면제</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">1천만 원 초과 ~ 3천만 원 이하</td>
                        <td className="p-3"><strong>2만 원</strong></td>
                        <td className="p-3">토지·소형 지분 매매</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">3천만 원 초과 ~ 5천만 원 이하</td>
                        <td className="p-3"><strong>4만 원</strong></td>
                        <td className="p-3">시골 단독주택·소형</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">5천만 원 초과 ~ 1억 원 이하</td>
                        <td className="p-3"><strong>7만 원</strong></td>
                        <td className="p-3">지방 소형 아파트</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">1억 원 초과 ~ 10억 원 이하</td>
                        <td className="p-3"><strong>15만 원</strong></td>
                        <td className="p-3">실무상 가장 흔한 구간</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">10억 원 초과</td>
                        <td className="p-3"><strong>35만 원</strong></td>
                        <td className="p-3">고가 주택·상가</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">TL;DR</p>
                  <ul className="mt-2 space-y-1 text-sm text-text-secondary list-disc ml-5">
                    <li>정액 과세: 매매가 1억~10억 <strong>15만 원</strong>, 10억 초과 <strong>35만 원</strong>이 실무상 대부분.</li>
                    <li>납부기한: 계약서 <strong>작성월의 다음 달 10일</strong>까지 (인지세법 §8 관련).</li>
                    <li>방법: 전자수입인지(e-revenuestamp.or.kr)에서 구매·소인 후 계약서에 첩부.</li>
                    <li>부담: 매수인·매도인 <strong>연대납세</strong>가 원칙, 실무는 매수인이 처리하는 관행이 많음.</li>
                    <li>미납 시: 미납세액의 <strong>최대 300%</strong> 가산세, 국세청·인지세법 시행령 기준.</li>
                  </ul>
                </div>
                <p className="mt-4">
                  다만 아파트 분양권·오피스텔·상가·토지 등 계약 유형에 따라 특약이나 실무 관행이 다를 수 있으므로, 아래 각 항목에서 상세를 확인하세요.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">Q. 인지세란 무엇이며 왜 부과되나요?</h2>
                <p>
                  인지세는 재산에 관한 권리의 창설·이전·변경·소멸을 증명하는 문서를 작성한 사람에게 부과되는 국세입니다. 인지세법 §3①제1호는 <strong>"부동산·선박·항공기의 소유권 이전에 관한 증서"</strong>를 대표적 과세문서로 명시하고 있어, 아파트·주택·토지 매매계약서가 여기에 해당합니다.
                </p>
                <p>
                  과세 근거는 "국가가 문서를 통해 사인간의 권리관계 변동을 공적으로 인정해 준다"는 데서 출발합니다. 즉 계약서라는 종이(또는 전자문서)가 존재하기에 등기·이전이 가능한 것이며, 그 문서 자체에 대해 국가가 미세한 수수료 성격의 세금을 부과하는 구조입니다.
                </p>
                <p>
                  이 때문에 인지세는 <strong>부동산 가격의 몇 %가 아니라 기재금액 구간별 정액</strong>으로 부과됩니다. 10억 원짜리 아파트든 15억 원짜리 아파트든 인지세는 35만 원으로 동일합니다. 취득세(수백만~수천만 원)와 비교하면 규모는 작지만, 챙기지 않으면 가산세가 본세보다 커지는 특성이 있어 꼭 확인해야 합니다.
                </p>
                <p>
                  다만, 임대차 계약서·전세권 설정 계약서·저당권 설정 계약서 등은 인지세법의 다른 항목(§3의 다른 호) 또는 별도 규정을 따르므로, 본 가이드의 세액표를 그대로 적용해서는 안 됩니다. 이 가이드는 소유권 이전(매매)에 한정합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">Q. 누가 내나요? 매수인인가요 매도인인가요?</h2>
                <p>
                  <strong>매수인과 매도인이 연대하여 납부</strong>합니다. 인지세법상 공동으로 문서를 작성한 자는 연대납세 의무를 지므로, 세무당국은 매수인·매도인 어느 쪽에게든 전액을 청구할 수 있습니다.
                </p>
                <p>
                  실무 관행은 다릅니다. 아파트·주택 매매에서는 <strong>매수인이 소유권 이전등기와 함께 인지세도 일괄 처리</strong>하는 경우가 대부분입니다. 등기 신청 시 계약서 원본에 전자수입인지가 첩부되어 있어야 하므로, 자연스럽게 매수인 측(또는 매수인이 위임한 법무사)이 구매·소인을 담당합니다.
                </p>
                <p>
                  분양 계약(청약 당첨)은 별개입니다. 2023년 이후 실무는 수분양자(계약자)와 공급사업자(시행사·시공사)가 <strong>절반씩 부담</strong>하는 방식으로 정착돼, 예전처럼 계약자 혼자 전액을 떠안는 사례가 크게 줄었습니다. 분양계약서 특약과 안내문을 반드시 확인하세요.
                </p>
                <p>
                  다만 관행은 관행일 뿐 법적 원칙이 아닙니다. 분쟁을 예방하려면 계약서에 <strong>"인지세는 매수인이 전액 부담한다" 또는 "매수인·매도인이 각 1/2씩 부담한다"</strong> 등 특약을 명시해 두는 것이 안전합니다. 특약이 없는 상태에서 한쪽이 안 낸다고 하면, 세무당국이 상대방에게 전액을 청구한 뒤 상대방이 다시 구상금 소송을 걸어야 하는 번거로운 상황이 벌어질 수 있습니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">Q. 언제까지 납부해야 하나요?</h2>
                <p>
                  <strong>계약서 작성일이 속하는 달의 다음 달 10일까지</strong>가 납부기한입니다(인지세법 §8 관련).
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">납부기한 계산 예시</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    · 7월 25일 계약서 작성 → 납부기한 <strong>8월 10일</strong>
                    <br />
                    · 8월 3일 계약서 작성 → 납부기한 <strong>9월 10일</strong>
                    <br />
                    · 8월 31일 계약서 작성 → 납부기한 <strong>9월 10일</strong> (같은 달로 취급)
                    <br />
                    · 12월 15일 계약서 작성 → 납부기한 <strong>다음 해 1월 10일</strong>
                  </p>
                </div>
                <p className="mt-4">
                  기준은 <strong>잔금일이나 등기접수일이 아니라 "계약서 서명·날인일"</strong>이라는 점이 핵심입니다. 계약금만 지급한 상태여도 서명한 계약서가 있다면 인지세 의무가 이미 발생한 것이며, 잔금일이 3개월 뒤라고 해서 그때까지 미룰 수 있는 것이 아닙니다.
                </p>
                <p>
                  많은 매수인이 "등기 접수 때 법무사가 처리해 준다"고 알고 있다가 잔금일이 익월 10일을 넘어가는 케이스에서 가산세가 붙는 사고가 발생합니다. 계약서 작성일과 잔금일이 다른 달에 걸쳐 있다면 반드시 미리 납부해두어야 합니다.
                </p>
                <p>
                  예외: 납부기한이 토·일·공휴일이면 그 다음 영업일까지가 실질 납부기한입니다(국세기본법 기한 특례). 다만 상세 적용은 관할 세무서에 확인하세요.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">Q. 전자수입인지로 어떻게 납부하나요?</h2>
                <p>
                  <strong>종이 수입인지 첩부 방식은 원칙 폐지</strong>되었고, 현재는 전자수입인지 시스템(www.e-revenuestamp.or.kr)에서 온라인으로 구매·소인하는 방식이 표준입니다. 절차는 다음과 같습니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">전자수입인지 납부 5단계</p>
                  <ol className="ml-5 list-decimal space-y-2 text-sm text-text-secondary">
                    <li>전자수입인지 사이트(e-revenuestamp.or.kr) 접속 후 회원가입 또는 공동인증서 로그인.</li>
                    <li>"종이문서용" 또는 "전자문서용" 선택. 종이 매매계약서에 첩부한다면 종이문서용을 선택합니다.</li>
                    <li>기재금액(매매가)에 해당하는 세액 구간을 선택해 결제. 은행 계좌이체·신용카드·간편결제 가능.</li>
                    <li>발급된 전자수입인지 PDF를 출력해 매매계약서에 첩부하고 서명·간인(소인) 처리.</li>
                    <li>등기 신청 시 원본 계약서와 함께 등기소에 제출. 법무사에 위임하면 대개 이 단계까지 대행합니다.</li>
                  </ol>
                </div>
                <p className="mt-4">
                  발급된 전자수입인지는 <strong>일련번호로 관리</strong>되어 위·변조가 불가능합니다. 은행에서 종이 수입인지를 구매하는 방식은 일부 지점에서만 유지되며, 대부분의 실무에서는 전자수입인지가 표준입니다.
                </p>
                <p>
                  다만 계약 당사자끼리 현금으로 인지세를 주고받고 실제로 전자수입인지를 사지 않으면 <strong>납부 효력이 없어</strong> 미납 상태로 남습니다. 반드시 e-revenuestamp.or.kr에서 정식 결제·발급 절차를 거쳐야 합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">Q. 안 내면 얼마 물게 되나요? 가산세</h2>
                <p>
                  <strong>납부지연 정도에 따라 미납세액의 최대 300%까지 가산세가 부과</strong>됩니다. 인지세는 본세 자체가 소액이지만, 가산세율이 매우 높게 설정되어 있어 실질 부담이 본세보다 훨씬 커질 수 있는 것이 특징입니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">가산세 계산 예시 (개념 시나리오)</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    · 아파트 매매(기재금액 5억 원), 인지세 15만 원 미납
                    <br />
                    · 최대 가산율(300%)이 적용될 경우: 15만 원 × 300% = <strong>45만 원 가산</strong>
                    <br />
                    · 총 납부액: 본세 15만 원 + 가산세 45만 원 = <strong>60만 원</strong>
                    <br />
                    <span className="text-xs text-text-tertiary">※ 정확한 가산율 구간(예: 3개월 이내·6개월 이내·6개월 초과)은 인지세법 시행령·국세청 안내에 따라 달라지므로, 개별 사안은 관할 세무서에서 확인하세요.</span>
                  </p>
                </div>
                <p className="mt-4">
                  가산세가 이렇게 무겁게 설정된 이유는, 인지세가 소액이라 방치하기 쉬운 세목이기 때문입니다. 반대로 <strong>기한 내에 자진 납부하면 아무 문제가 없는 세금</strong>이므로, 계약서 작성 즉시 전자수입인지를 발급받아 첩부해두는 것이 가장 안전합니다.
                </p>
                <p>
                  예외: 미납 사실을 뒤늦게 발견했다면 즉시 관할 세무서에 자진 신고·납부하는 것이 좋습니다. 국세기본법상 자진 신고의 경우 일부 가산세 감면 규정이 있을 수 있으므로, 개별 사안은 세무서 상담을 통해 확인하세요.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">기재금액 경계값, 실제 계산 사례</h2>
                <p>
                  인지세는 정액 구간이라 <strong>구간 경계에서 세액이 두 배 이상 뛰는 지점</strong>이 있습니다. 아래 4가지 사례로 확인해 보세요.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 1. 기재금액 9,900만 원 (1억 이하 상단)</p>
                  <p className="text-sm text-text-secondary">
                    · 해당 구간: 5천만 원 초과 ~ 1억 원 이하
                    <br />
                    · 인지세: <strong>7만 원</strong>
                    <br />
                    · 참고: 매매가를 1억 원 밑으로 조정할 수 있는 여지가 있다면 세액이 절반 이하로 낮아지는 지점.
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 2. 기재금액 정확히 1억 원 (경계선)</p>
                  <p className="text-sm text-text-secondary">
                    · 해당 구간: 5천만 원 초과 ~ 1억 원 <strong>이하</strong> (경계값은 이 구간에 포함)
                    <br />
                    · 인지세: <strong>7만 원</strong>
                    <br />
                    · 참고: "이하"는 경계값 포함, "초과"는 경계값 미포함. 딱 1억 원이면 7만 원.
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 3. 기재금액 1억 100만 원 (1억 초과)</p>
                  <p className="text-sm text-text-secondary">
                    · 해당 구간: 1억 원 초과 ~ 10억 원 이하
                    <br />
                    · 인지세: <strong>15만 원</strong>
                    <br />
                    · 참고: 1억 원 대비 100만 원만 늘어도 세액은 7만 원에서 15만 원으로 <strong>2배 이상 증가</strong>.
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 4. 기재금액 10억 100만 원 (10억 초과)</p>
                  <p className="text-sm text-text-secondary">
                    · 해당 구간: 10억 원 <strong>초과</strong>
                    <br />
                    · 인지세: <strong>35만 원</strong>
                    <br />
                    · 참고: 10억 원 정확히면 15만 원, 1원이라도 초과하면 35만 원. 실무상 가장 큰 경계선.
                  </p>
                </div>
                <p className="mt-4">
                  다만 매매가를 인위적으로 낮게 기재하는 이른바 "다운계약"은 부동산 거래신고 등에 관한 법률 위반이며, 인지세 몇 만 원을 아끼려다 훨씬 큰 과태료·양도세 추징을 부를 수 있습니다. 실거래가 그대로 신고·기재하는 것이 원칙입니다.
                </p>
              </section>

              <section className="space-y-6 border-t border-border-base pt-8" data-speakable>
                <h2 className="text-2xl font-bold">인지세 vs 취득세 vs 중개수수료, 뭐가 다른가요?</h2>
                <p>
                  부동산 매매 시 매수인이 부담하는 대표 비용은 크게 세 가지입니다. 각각의 근거·부과 대상·부담자·시기가 모두 달라 헷갈리기 쉬우니 아래 비교표로 정리합니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 2. 부동산 매매 시 발생하는 세 가지 비용 비교</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">항목</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">인지세</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">취득세</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">중개수수료</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">성격</td>
                        <td className="p-3">국세</td>
                        <td className="p-3">지방세</td>
                        <td className="p-3">민간 수수료</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">근거</td>
                        <td className="p-3">인지세법 §3</td>
                        <td className="p-3">지방세법 §11</td>
                        <td className="p-3">공인중개사법 §32</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">부과 대상</td>
                        <td className="p-3">매매계약서 문서</td>
                        <td className="p-3">부동산 취득 행위</td>
                        <td className="p-3">중개 서비스</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">금액 성격</td>
                        <td className="p-3">정액 (2만~35만 원)</td>
                        <td className="p-3">정률 (1~12%)</td>
                        <td className="p-3">정률 상한 (구간별)</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">부담자</td>
                        <td className="p-3">매수인·매도인 연대</td>
                        <td className="p-3">매수인(취득자)</td>
                        <td className="p-3">매수인·매도인 각각</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">납부·지급 시기</td>
                        <td className="p-3">작성월 다음 달 10일</td>
                        <td className="p-3">잔금일 후 60일</td>
                        <td className="p-3">잔금일(관례)</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">10억 아파트 예시</td>
                        <td className="p-3"><strong>15만 원</strong></td>
                        <td className="p-3">약 1,100만~3,600만 원</td>
                        <td className="p-3">약 400만~900만 원</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  이 표에서 알 수 있듯 인지세는 세 비용 중 <strong>가장 작지만 가장 잊혀지기 쉬운</strong> 항목입니다. 취득세는 잔금 이후 지자체 안내가 오고 중개수수료는 중개사가 청구하지만, 인지세는 당사자 스스로 챙기지 않으면 아무도 알려주지 않는 구조입니다.
                </p>
                <p>
                  다만 15만 원이라도 미납해서 가산세 45만 원이 붙으면 총 60만 원이 됩니다. 취득세·중개수수료를 계산하는 김에 인지세도 같은 체크리스트에 넣어두는 것이 안전합니다.
                </p>
              </section>

              <h2 className="text-2xl font-bold mb-6">자주 묻는 질문</h2>
              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h3 className="text-lg font-semibold text-text-primary">관련 계산기 및 가이드</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link
                    href="/calculator/acquisition-tax/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">취득세 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">인지세와 함께 챙겨야 할 취득세를 매매가로 즉시 계산.</p>
                  </Link>
                  <Link
                    href="/guide/acquisition-tax-calculation-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">취득세 계산법 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">주택 가격·주택 수별 취득세율과 감면 요건 정리.</p>
                  </Link>
                  <Link
                    href="/guide/first-home-acquisition-tax-reduction-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">생애최초 취득세 감면</div>
                    <p className="mt-1 text-sm text-text-secondary">첫 집 마련 시 취득세 최대 200만 원 감면 받는 조건.</p>
                  </Link>
                  <Link
                    href="/guide/national-housing-bond-purchase-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">국민주택채권 매입</div>
                    <p className="mt-1 text-sm text-text-secondary">등기 신청 시 인지세와 함께 챙겨야 할 채권 매입 규모.</p>
                  </Link>
                  <Link
                    href="/guide/real-estate-broker-fee-rate-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">중개수수료 요율표</div>
                    <p className="mt-1 text-sm text-text-secondary">매매가 구간별 공인중개사 수수료 법정 상한과 관행.</p>
                  </Link>
                  <Link
                    href="/category/tax/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">모든 세금 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">양도세·취득세·재산세·상속세·종부세 모음.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 교육 목적으로 작성되었으며, 개인 맞춤형 세무 조언이 아닙니다. 실제 인지세 부담자·납부 시기·가산세 계산은 계약 유형(매매·분양·상속·증여)과 계약서 특약, 문서 원본 수에 따라 달라지므로 관할 세무서·법무사와 반드시 확인하세요. 분양권·오피스텔·상가·토지 등 유형별로 실무 관행이 다를 수 있으며, 계약 파기 시 환급 여부는 개별 사안입니다. 본 콘텐츠는 2026-08-07을 기준으로 작성되었으며, 인지세법·시행령 개정 시 즉시 업데이트됩니다. 인용한 법조항: <strong>인지세법 §3(과세문서와 세율)·§8(납부의 방법·시기 관련)</strong>. AI 보조 작성 후 운영자 검수 완료.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터 (인지세법)</a>,{' '}
                  <a href="https://www.e-revenuestamp.or.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">전자수입인지 (e-revenuestamp.or.kr)</a>,{' '}
                  <a href="https://www.hometax.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">국세청 홈택스</a>,{' '}
                  <a href="https://easylaw.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">찾기쉬운 생활법령정보</a>.
                </p>
              </section>

              <ShareButtons
                title="부동산 매매계약서 인지세 2026 가이드"
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
