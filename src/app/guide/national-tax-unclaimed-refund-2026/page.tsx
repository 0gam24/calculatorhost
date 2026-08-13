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

const URL = 'https://calculatorhost.com/guide/national-tax-unclaimed-refund-2026/';
const DATE_PUBLISHED = '2026-08-14';
const DATE_MODIFIED = '2026-08-14';

export const metadata: Metadata = {
  title: '국세 미환급금 찾기 2026, 안 찾아간 세금 돌려받는 법',
  description:
    '연말정산·종합소득세를 더 냈는데 돌려받지 못한 국세 미환급금은 홈택스·손택스·정부24·ARS 1544-9944로 로그인 없이 조회할 수 있습니다. 5년이 지나면 국고로 사라지는 이유와 수령 방법을 국세기본법 §51·§54 기준으로 정리했습니다.',
  keywords: [
    '국세 미환급금 찾기',
    '미수령 환급금 조회',
    '안 찾아간 환급금',
    '홈택스 환급금 조회',
    '국세 환급금 받는 법',
    '지방세 미환급금',
    '국세기본법 51조',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '국세 미환급금 찾기 2026, 안 찾아간 세금 돌려받는 법' }],
    title: '국세 미환급금 찾기 2026, 안 찾아간 세금 돌려받는 법',
    description: '홈택스·손택스·정부24·ARS 1544-9944로 로그인 없이 조회. 5년 지나면 국고 귀속되는 미수령 환급금 수령 절차 완전 정리.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '국세 미환급금 찾기 2026, 안 찾아간 세금 돌려받는 법',
    description: '로그인 없이 성명·주민번호만으로 조회. 5년 소멸시효 전에 받아야 하는 미수령 국세 환급금.',
  },
};

const FAQ_ITEMS = [
  {
    question: '국세 미환급금이 정확히 무엇인가요?',
    answer:
      '납세자가 실제 낼 세금보다 더 냈거나 잘못 낸 금액 중, 아직 돌려받지 못한 국세를 말합니다. 국세기본법 §51에 따라 국가는 초과·오납된 세금을 납세자에게 환급해야 하는데, 계좌 정보가 없거나 주소 변경으로 통지서가 반송되면 지급되지 못한 채 미환급금으로 남습니다. 대표적으로 연말정산 과다납부, 종합소득세 환급, 이중납부가 원인입니다.',
  },
  {
    question: '미환급금은 어디서 조회하나요?',
    answer:
      '홈택스(PC), 손택스(모바일 앱), 정부24, ARS 전화 1544-9944에서 조회할 수 있습니다. 홈택스는 공동인증서 로그인 없이도 성명과 주민등록번호만 입력하면 조회되며, 손택스는 앱 전체 메뉴의 납부·고지·환급에서 국세환급금 찾기를 선택하면 됩니다. 네 곳 모두 무료입니다.',
  },
  {
    question: '조회하려면 무엇이 필요한가요?',
    answer:
      '개인은 성명과 주민등록번호(하이픈 없이 13자리), 사업자는 상호와 사업자등록번호만 있으면 됩니다. 홈택스 국세환급금 찾기 화면은 로그인 없이 이 정보만으로 조회되므로 공동인증서나 공인인증서가 없어도 확인할 수 있습니다.',
  },
  {
    question: '환급금은 어떻게 받나요?',
    answer:
      '조회 후 미환급금이 있으면 본인 명의 계좌를 신고해 지급받습니다. 홈택스에서 계좌를 등록하거나, 국세환급금 통지서에 안내된 방법(우체국 지급, 계좌 이체)으로 신청합니다. 소액이면 주소지 관할 우체국에서 신분증으로 현금 수령도 가능합니다.',
  },
  {
    question: '언제까지 안 받으면 사라지나요?',
    answer:
      '국세환급금을 받을 권리는 국세기본법 §54에 따라 환급받을 수 있는 날부터 5년간 행사하지 않으면 소멸시효가 완성되어 국고로 귀속됩니다. 즉 5년이 지나면 돌려받지 못하므로, 오래된 환급금일수록 빨리 조회해 수령해야 합니다.',
  },
  {
    question: '미환급금에 이자도 붙나요?',
    answer:
      '네, 국세를 초과·오납했을 때는 국세환급가산금이 함께 지급됩니다(국세기본법 §52). 환급가산금은 국세환급금에 더해져 지급되며, 이자율은 국세기본법 시행규칙으로 매년 고시되므로 정확한 적용 이율은 국세청 고시를 확인하세요.',
  },
  {
    question: '지방세 미환급금도 국세청에서 조회되나요?',
    answer:
      '아니요. 재산세·자동차세·주민세 같은 지방세의 미환급금은 국세청 홈택스가 아니라 위택스(wetax.go.kr)에서 별도로 조회합니다. 국세와 지방세는 관할이 달라 각각 조회해야 빠짐없이 확인할 수 있습니다.',
  },
  {
    question: '가족이나 돌아가신 분의 미환급금도 찾을 수 있나요?',
    answer:
      '본인 명의 조회가 원칙이며, 대리 조회는 위임 절차가 필요합니다. 사망자의 미환급금은 상속인이 상속 관계를 증명하는 서류를 갖춰 관할 세무서에서 청구할 수 있습니다. 정확한 서류와 절차는 관할 세무서에 문의하는 것이 안전합니다.',
  },
];

export default function NationalTaxUnclaimedRefund2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '국세 미환급금 찾기 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '국세 미환급금 찾기 2026, 안 찾아간 세금 돌려받는 법',
    description:
      '홈택스·손택스·정부24·ARS 1544-9944로 로그인 없이 조회하는 국세 미환급금. 발생 원인, 수령 방법, 5년 소멸시효, 지방세 미환급금 조회까지 국세기본법 §51·§54 기준으로 정리.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['국세 미환급금', '미수령 환급금', '홈택스 조회', '소멸시효', '지방세 미환급금'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '국세 미환급금 찾기 2026',
    description:
      '안 찾아간 국세 미환급금을 로그인 없이 조회하고 수령하는 방법과 5년 소멸시효 정리.',
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
                    { name: '국세 미환급금 찾기 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">전 국민 · 7분 읽기 · 2026-08-14</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  국세 미환급금 찾기 2026
                  <br />
                  <span className="text-2xl text-text-secondary">· 안 찾아간 세금 돌려받는 법</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  세금을 실제보다 더 냈는데 돌려받지 못한 돈이 국세환급금 계좌에 잠들어 있을 수 있습니다. 이사로 통지서가 반송되거나 계좌를 신고하지 않아 지급되지 못한 미환급금은 홈택스·손택스·정부24·ARS로 로그인 없이 몇 분 만에 확인할 수 있습니다. 이 글은 미환급금이 왜 생기는지, 어디서 어떻게 조회하고 받는지, 그리고 5년이 지나면 왜 사라지는지를 국세기본법 기준으로 정리합니다.
                </p>
              </header>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">국세 미환급금이란 무엇인가요?</h2>
                <p>
                  국세 미환급금은 낼 세금보다 더 냈거나 잘못 낸 국세 중 아직 돌려받지 못한 돈입니다. 국세기본법 §51은 국가가 초과·오납된 세액을 납세자에게 환급하도록 정하고 있는데, 지급할 계좌가 없거나 주소가 바뀌어 통지서가 반송되면 지급되지 못한 채 남습니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">30초 요약</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    · 조회처: 홈택스, 손택스, 정부24, ARS 1544-9944 (모두 무료)
                    <br />
                    · 준비물: 성명 + 주민등록번호(개인), 상호 + 사업자등록번호(사업자)
                    <br />
                    · 로그인: 홈택스 국세환급금 찾기는 공동인증서 없이 조회 가능
                    <br />
                    · 시한: 환급받을 수 있는 날부터 <strong>5년</strong> 지나면 국고 귀속(국세기본법 §54)
                  </p>
                </div>
                <p>
                  다만 미환급금이 있다고 자동으로 통장에 들어오지는 않습니다. 조회 후 본인 계좌를 신고해야 지급되므로, 한 번도 확인한 적이 없다면 이번 기회에 조회해 보는 것이 좋습니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">미환급금은 어디서 조회하나요?</h2>
                <p>
                  국세 미환급금은 네 가지 경로로 조회합니다. 결론부터 말하면 홈택스가 가장 편하고, 인터넷이 어렵다면 ARS 전화가 가장 간단합니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 국세 미환급금 조회 경로 비교</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">경로</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">접속</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">특징</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">홈택스</td>
                        <td className="p-3">PC 웹</td>
                        <td className="p-3">로그인 없이 성명·주민번호로 조회, 계좌 신고까지 한 번에</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">손택스</td>
                        <td className="p-3">모바일 앱</td>
                        <td className="p-3">전체 메뉴 &gt; 납부·고지·환급 &gt; 국세환급금 찾기</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">정부24</td>
                        <td className="p-3">PC·모바일</td>
                        <td className="p-3">행정정보공동이용 &gt; 미환급금 찾기, 국세·일부 공과금 통합</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">ARS 전화</td>
                        <td className="p-3">1544-9944</td>
                        <td className="p-3">지역번호 없이 전화, 인터넷이 어려울 때 간편 조회</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p>
                  다만 정부24는 국세뿐 아니라 여러 미환급·미수령금을 함께 보여주므로, 국세만 정확히 보려면 홈택스나 손택스가 낫습니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">홈택스 조회 절차 (단계별)</h2>
                <p>
                  홈택스에서 미환급금을 조회하는 절차는 다음과 같습니다. 로그인 단계가 없어 3분이면 끝납니다.
                </p>
                <ol className="space-y-3 ml-6 list-decimal text-text-secondary">
                  <li>홈택스(hometax.go.kr) 접속</li>
                  <li>상단 메뉴에서 납부·고지·환급 선택</li>
                  <li>국세환급 &gt; 국세환급금 찾기 클릭</li>
                  <li>개인은 성명과 주민등록번호(하이픈 없이 13자리), 사업자는 상호와 사업자등록번호 입력</li>
                  <li>조회 결과에 미환급금이 있으면 본인 명의 계좌를 신고해 지급 신청</li>
                </ol>
                <p>
                  예외: 조회 결과가 없어도 지방세는 별도입니다. 재산세·자동차세를 낸 적이 있다면 위택스에서 지방세 미환급금을 한 번 더 확인하세요.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">미환급금은 왜 생기나요? (실제 사례)</h2>
                <p>
                  미환급금은 특별한 잘못이 아니라 일상적인 신고·납부 과정에서 자연스럽게 생깁니다. 대표 사례 세 가지를 계산으로 살펴봅니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 1. 연말정산 과다납부 (직장인)</p>
                  <p className="text-sm text-text-secondary">
                    · 1년간 매월 원천징수된 소득세 합계: 240만원
                    <br />
                    · 연말정산으로 확정된 결정세액: 200만원
                    <br />
                    · 환급액: 240만원 − 200만원 = <strong>40만원</strong>
                    <br />
                    <span className="text-xs text-text-tertiary">이 40만원이 계좌 미신고 등으로 지급되지 못하면 미환급금으로 남습니다.</span>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 2. 종합소득세 중간예납 초과 (프리랜서)</p>
                  <p className="text-sm text-text-secondary">
                    · 11월 중간예납으로 미리 낸 세액: 150만원
                    <br />
                    · 5월 확정신고로 계산된 연간 세액: 120만원
                    <br />
                    · 환급액: 150만원 − 120만원 = <strong>30만원</strong>
                    <br />
                    <span className="text-xs text-text-tertiary">환급 계좌를 신고하지 않으면 통지서가 발송되고, 반송되면 미환급금이 됩니다.</span>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 3. 이중납부·착오납부</p>
                  <p className="text-sm text-text-secondary">
                    · 자동이체와 수동납부가 겹쳐 같은 세금을 두 번 납부
                    <br />
                    · 두 번째로 낸 금액 전액이 오납으로 환급 대상
                    <br />
                    <span className="text-xs text-text-tertiary">국세기본법 §51에 따라 오납액은 환급되며, 국세환급가산금(§52)이 더해질 수 있습니다.</span>
                  </p>
                </div>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">5년이 지나면 어떻게 되나요?</h2>
                <p>
                  국세환급금을 받을 권리에는 시효가 있습니다. 국세기본법 §54는 환급받을 수 있는 날부터 5년간 권리를 행사하지 않으면 소멸시효가 완성된다고 정합니다. 시효가 완성되면 그 돈은 국고로 귀속되어 더 이상 돌려받을 수 없습니다.
                </p>
                <p>
                  홈택스에서는 통상 환급 결정일부터 5년까지의 자료가 조회됩니다. 따라서 몇 년 전 이사하면서 통지서를 못 받았다면, 시효가 지나기 전에 서둘러 조회하는 것이 중요합니다.
                </p>
                <p>
                  다만 소멸시효는 청구·압류 등 특정 사유로 중단될 수 있으므로, 오래된 환급금이라도 우선 조회하고 관할 세무서에 문의하는 것이 안전합니다.
                </p>
              </section>

              <section className="space-y-6 border-t border-border-base pt-8">
                <h2 className="text-2xl font-bold">지방세 미환급금은 따로 있나요?</h2>
                <p>
                  네. 국세와 지방세는 관할과 조회 시스템이 다릅니다. 국세는 홈택스, 지방세는 위택스(wetax.go.kr)에서 조회합니다. 두 곳을 모두 확인해야 빠짐없이 찾을 수 있습니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 2. 국세 vs 지방세 미환급금 조회 구분</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">구분</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">대표 세목</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">조회처</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">국세</td>
                        <td className="p-3">소득세·부가가치세·종합소득세</td>
                        <td className="p-3">홈택스·손택스</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">지방세</td>
                        <td className="p-3">재산세·자동차세·주민세</td>
                        <td className="p-3">위택스(서울은 이택스)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p>
                  다만 위택스는 서울 지역 지방세를 서울시 이택스(etax.seoul.go.kr)로 분리 운영하므로, 서울 거주자는 이택스도 함께 확인하세요.
                </p>
              </section>

              <h2 className="text-2xl font-bold mb-6">자주 묻는 질문</h2>
              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h3 className="text-lg font-semibold text-text-primary">관련 계산기 및 가이드</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link
                    href="/guide/year-end-tax-settlement/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">연말정산 완벽 가이드</div>
                    <p className="mt-1 text-sm text-text-secondary">환급의 출발점, 공제 항목부터 제대로 챙기세요.</p>
                  </Link>
                  <Link
                    href="/guide/comprehensive-income-tax-refund-timing-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">종합소득세 환급 시기</div>
                    <p className="mt-1 text-sm text-text-secondary">5월 신고 후 언제 돈이 들어오는지 확인하세요.</p>
                  </Link>
                  <Link
                    href="/guide/income-tax-correction-claim-5-year-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">경정청구 5년</div>
                    <p className="mt-1 text-sm text-text-secondary">놓친 공제, 5년 안이면 돌려받을 수 있습니다.</p>
                  </Link>
                  <Link
                    href="/calculator/salary/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">연봉 실수령액 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">매월 떼는 세금과 4대보험을 미리 확인하세요.</p>
                  </Link>
                  <Link
                    href="/guide/property-tax-installment-payment-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">재산세 분납 방법</div>
                    <p className="mt-1 text-sm text-text-secondary">지방세 납부·환급이 궁금하다면 함께 보세요.</p>
                  </Link>
                  <Link
                    href="/category/tax/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">모든 세금 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">양도세·취득세·상속세·종부세 모음.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 교육 목적으로 작성되었으며, 개인 맞춤형 세무 조언이 아닙니다. 미환급금 조회 결과, 소멸시효 중단 여부, 상속인 청구 절차 등 구체적인 사안은 홈택스, 위택스 또는 관할 세무서에서 반드시 확인하세요. 본 콘텐츠는 2026-08-14 기준으로 작성되었으며, 관련 법령 개정 시 즉시 업데이트됩니다. 인용한 법조항은 <strong>국세기본법 §51(국세환급금의 충당과 환급), §52(국세환급가산금), §54(소멸시효)</strong>입니다. AI 보조 작성 후 운영자 검수 완료.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.hometax.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">국세청 홈택스</a>,{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터</a>,{' '}
                  <a href="https://www.wetax.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">위택스(지방세)</a>.
                </p>
              </section>

              <ShareButtons
                title="국세 미환급금 찾기 2026 가이드"
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
