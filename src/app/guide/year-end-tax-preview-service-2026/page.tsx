// [revenue-lever: indexing+traffic] 연말정산 미리보기 서비스 사용법·환급금 사전 계산(직장인 10~12월 절세 롱테일 흡수)
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

const URL = 'https://calculatorhost.com/guide/year-end-tax-preview-service-2026/';
const DATE_PUBLISHED = '2026-08-26';
const DATE_MODIFIED = '2026-08-26';

export const metadata: Metadata = {
  title: '연말정산 미리보기 2026, 환급금 미리 계산하고 준비하는 법',
  description:
    '연말정산 미리보기는 10~12월에 지출을 조정해 환급을 늘릴 마지막 기회입니다. 홈택스 접속 경로, 신용카드 25% 확인, 연금저축 900만원 세액공제 계산까지 소득세법 §137 기준으로 정리했습니다.',
  keywords: [
    '연말정산 미리보기',
    '연말정산 미리보기 언제',
    '홈택스 연말정산 미리보기',
    '연말정산 환급금 조회',
    '신용카드 소득공제 25%',
    '연금저축 세액공제',
    '소득세법 137조',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '연말정산 미리보기 2026, 환급금 미리 계산하고 준비하는 법' }],
    title: '연말정산 미리보기 2026, 10~12월에 환급 늘리는 마지막 기회',
    description: '홈택스 미리보기로 신용카드 25%·연금저축 900만원을 점검하고 남은 3개월 지출을 조정하는 법.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '연말정산 미리보기 2026, 환급금 미리 계산하는 법',
    description: '홈택스 미리보기로 남은 3개월 지출을 조정해 환급을 늘리는 실전 가이드. 소득세법 §137.',
  },
};

const FAQ_ITEMS = [
  {
    question: '연말정산 미리보기는 언제부터 이용할 수 있나요?',
    answer:
      '보통 11월 중순에 열립니다. 국세청은 매년 그해 1~9월 신용카드 사용액을 국세청이 수집한 뒤 미리보기 서비스를 개통하며, 최근에는 11월 15일 전후에 열렸습니다. 정확한 개통일은 홈택스 공지로 안내되므로, 10월 말부터 홈택스 공지를 확인하는 것이 좋습니다.',
  },
  {
    question: '미리보기는 모바일 손택스에서도 되나요?',
    answer:
      '아니요, 연말정산 미리보기는 PC 홈택스에서만 제공됩니다. 모바일 손택스에서는 간소화 자료 조회 등 일부 기능만 되고, 예상 환급금을 계산하는 미리보기는 PC 웹 홈택스로 접속해야 합니다.',
  },
  {
    question: '홈택스에서 미리보기는 어디로 들어가나요?',
    answer:
      '홈택스 로그인 후 [장려금·연말정산·기부금] 메뉴에서 [편리한 연말정산], 그 안의 [연말정산 미리보기]를 선택합니다. 로그인은 공동인증서, 금융인증서, 간편인증(카카오·통신사 PASS 등) 중 편한 방법을 쓰면 됩니다.',
  },
  {
    question: '신용카드 소득공제 25% 문턱을 채웠는지 어떻게 확인하나요?',
    answer:
      '미리보기 화면에 1~9월 신용카드·체크카드·현금영수증 사용액이 자동으로 표시됩니다. 신용카드 공제는 총급여의 25%를 초과한 금액부터 적용되므로, 사용액 합계가 총급여 25%를 넘겼는지 화면에서 바로 확인할 수 있습니다. 아직 못 넘겼다면 남은 지출을 체크카드·현금으로 하면 공제율(30%)이 더 높습니다.',
  },
  {
    question: '미리보기 예상 환급금이 실제와 다른 이유는 무엇인가요?',
    answer:
      '미리보기는 1~9월 실적에 10~12월 예상 지출을 더해 추정한 값이라 실제와 차이가 납니다. 연말에 부양가족이 바뀌거나, 의료비·기부금이 추가되거나, 회사가 반영하는 비과세 항목이 달라지면 최종 결정세액이 달라집니다. 어디까지나 방향을 잡는 참고용 수치로 보는 것이 정확합니다.',
  },
  {
    question: '연금저축·IRP는 언제까지 넣어야 올해 공제를 받나요?',
    answer:
      '해당 과세연도 12월 31일까지 납입한 금액만 그해 세액공제 대상입니다. 연금저축과 IRP를 합쳐 연 900만원까지 공제 대상이 되므로, 미리보기로 현재 납입액을 확인하고 부족분을 12월 말 전에 추가 납입하면 됩니다. 다만 중도 인출 시 불이익이 있으니 여윳돈 범위에서 넣으세요.',
  },
  {
    question: '맞벌이 부부는 미리보기를 어떻게 활용하나요?',
    answer:
      '부양가족 공제를 누구에게 몰아줄지 시뮬레이션하는 데 유용합니다. 각자 로그인해 미리보기를 돌려보고, 소득이 높은 배우자에게 부양가족·의료비를 몰았을 때와 나눴을 때의 환급 차이를 비교하면 됩니다. 다만 의료비는 총급여 3%를 넘는 부분만 공제되어 한 명에게 모으는 편이 유리한 경우가 많습니다.',
  },
  {
    question: '미리보기 결과는 회사에 제출하나요?',
    answer:
      '아니요, 미리보기는 본인 참고용이라 회사에 낼 필요가 없습니다. 실제 제출은 이듬해 1월 간소화 서비스에서 자료를 확정한 뒤, 회사가 정한 방식(PDF 제출 또는 간편제출)으로 진행합니다. 미리보기는 그 전에 지출을 조정하기 위한 사전 점검 도구입니다.',
  },
];

export default function YearEndTaxPreviewService2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '연말정산 미리보기 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '연말정산 미리보기 2026, 환급금 미리 계산하고 준비하는 법',
    description:
      '홈택스 연말정산 미리보기로 신용카드 25% 문턱, 연금저축 900만원 세액공제를 점검하고 10~12월 지출을 조정해 환급을 늘리는 실전 가이드.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['연말정산 미리보기', '홈택스', '신용카드 소득공제', '연금저축 세액공제', '환급금'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '연말정산 미리보기 2026',
    description:
      '홈택스 연말정산 미리보기 접속 경로와 활용법, 10~12월 절세 조정 포인트 정리.',
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
                    { name: '연말정산 미리보기 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">직장인 · 8분 읽기 · 2026-08-26</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  연말정산 미리보기 2026
                  <br />
                  <span className="text-2xl text-text-secondary">· 환급금 미리 계산하고 준비하는 법</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  연말정산은 이듬해 1~2월에 하지만, 세금을 실제로 줄일 수 있는 시점은 그해 12월 31일까지입니다. 연말정산 미리보기는 아직 시간이 있을 때 내 신용카드 공제, 연금저축, 예상 환급금을 확인하고 남은 지출을 조정하도록 국세청이 제공하는 사전 점검 도구입니다. 이 가이드는 미리보기가 언제 열리는지, 어디로 접속하는지, 무엇을 조정하면 환급이 늘어나는지를 직장인 눈높이로 정리합니다.
                </p>
              </header>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">연말정산 미리보기란 무엇인가요?</h2>
                <p>
                  결론부터 말하면, 아직 지출을 바꿀 수 있을 때 예상 환급금을 계산해 보는 사전 시뮬레이션입니다. 국세청 홈택스가 그해 1~9월까지 수집한 신용카드·현금영수증 사용액에, 내가 입력한 10~12월 예상 지출과 연금저축 납입 계획을 더해 최종 결정세액과 환급 여부를 미리 보여줍니다.
                </p>
                <p>
                  연말정산 자체의 법적 근거는 소득세법 §137(근로소득세액의 연말정산)입니다. 회사(원천징수의무자)가 근로자의 1년치 세금을 정산해 더 낸 세금은 돌려주고 덜 낸 세금은 추가로 걷는 절차인데, 미리보기는 이 정산 결과를 미리 추정해 보는 서비스입니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">30초 요약</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    · 개통 시기: 매년 11월 중순(최근 11월 15일 전후)
                    <br />
                    · 접속: PC 홈택스 [장려금·연말정산·기부금] &gt; [편리한 연말정산] &gt; [연말정산 미리보기]
                    <br />
                    · 핵심 점검 2가지: 신용카드 총급여 25% 문턱, 연금저축·IRP 합산 900만원 한도
                    <br />
                    · 목적: 12월 31일 전에 지출을 조정해 환급을 늘리는 것
                  </p>
                </div>
                <p>
                  다만, 미리보기는 예측값이라는 점을 기억해야 합니다. 확정된 세금이 아니라 방향을 잡기 위한 참고 수치입니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">언제부터 이용할 수 있나요?</h2>
                <p>
                  보통 11월 중순에 열립니다. 국세청이 1~9월 카드사·가맹점 자료를 취합해 반영하는 시간이 필요하기 때문에, 미리보기는 10월이 아니라 11월에 개통됩니다. 최근 몇 년간은 11월 15일 전후에 열렸습니다.
                </p>
                <p>
                  따라서 실전 타임라인은 다음과 같습니다. 10월 말까지 홈택스 공지를 확인하고, 11월 중순 개통되면 바로 한 번 돌려보고, 11~12월에 지출을 조정한 뒤, 이듬해 1월 간소화 서비스로 실제 신고를 마무리합니다.
                </p>
                <p>
                  예외: 정확한 개통일은 해마다 며칠씩 달라지므로, 날짜는 홈택스(hometax.go.kr) 공지사항을 기준으로 확인하세요.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">홈택스 접속 경로는 어떻게 되나요?</h2>
                <p>
                  PC 홈택스 로그인 후 세 단계면 됩니다. 순서대로 클릭하면 예상 환급금 화면까지 도달합니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 연말정산 미리보기 접속 단계</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">단계</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">화면·메뉴</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">할 일</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">1</td>
                        <td className="p-3">홈택스 로그인</td>
                        <td className="p-3">공동·금융인증서 또는 간편인증(PASS·카카오)</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">2</td>
                        <td className="p-3">장려금·연말정산·기부금</td>
                        <td className="p-3">상단 메뉴에서 선택</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">3</td>
                        <td className="p-3">편리한 연말정산 &gt; 연말정산 미리보기</td>
                        <td className="p-3">신용카드 자료 불러오기, 예상 지출 입력</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p>
                  다만, 미리보기는 PC 홈택스 전용입니다. 모바일 손택스에서는 이 메뉴가 보이지 않으니 PC로 접속하세요.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">신용카드 소득공제 25% 문턱은 어떻게 확인하나요?</h2>
                <p>
                  화면에 표시된 1~9월 사용액이 총급여의 25%를 넘겼는지 보면 됩니다. 신용카드 등 소득공제(조세특례제한법 §126의2)는 사용액이 총급여의 25%를 초과한 부분부터 적용되기 때문입니다. 문턱을 넘기기 전까지는 카드를 아무리 써도 공제가 0원이라는 뜻입니다.
                </p>
                <p>
                  공제율은 결제 수단에 따라 다릅니다. 신용카드 15%, 체크카드·현금영수증 30%, 전통시장·대중교통 40%입니다. 그래서 25% 문턱을 넘긴 뒤 남은 지출은 공제율이 높은 체크카드·현금영수증으로 하는 편이 유리합니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3">
                  <p className="font-semibold text-text-primary">사례 1. 총급여 4,000만원 직장인</p>
                  <p className="text-sm text-text-secondary">
                    · 공제 문턱: 4,000만원 × 25% = 1,000만원
                    <br />
                    · 1~9월 신용카드 사용액: 900만원 (아직 문턱 미달)
                    <br />
                    · 판단: 남은 100만원을 채우기 전까지는 공제 0원. 100만원을 넘긴 뒤부터 공제 시작
                    <br />
                    <span className="text-xs text-text-tertiary">전략: 남은 지출을 체크카드로 쓰면 문턱 초과분에 30% 공제율 적용</span>
                  </p>
                </div>
                <p>
                  다만, 소득공제 한도가 있습니다. 총급여 7,000만원 이하는 기본 300만원 한도이며, 전통시장·대중교통·문화비 등 추가 한도가 별도로 붙습니다. 한도를 이미 채웠다면 카드를 더 써도 공제는 늘지 않습니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">연금저축·IRP 900만원 채우면 얼마 돌려받나요?</h2>
                <p>
                  세액공제율이 총급여에 따라 다릅니다. 소득세법 §59의3에 따라 연금저축과 IRP를 합쳐 연 900만원까지가 세액공제 대상이며, 지방소득세를 포함한 공제율은 총급여 5,500만원(종합소득 4,500만원) 이하면 16.5%, 초과하면 13.2%입니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 2. 연금저축·IRP 900만원 납입 시 세액공제액(지방세 포함)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">총급여</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">공제율</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">900만원 납입 시 환급</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">5,500만원 이하</td>
                        <td className="p-3"><strong>16.5%</strong></td>
                        <td className="p-3">900만원 × 16.5% = 148.5만원</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">5,500만원 초과</td>
                        <td className="p-3"><strong>13.2%</strong></td>
                        <td className="p-3">900만원 × 13.2% = 118.8만원</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3">
                  <p className="font-semibold text-text-primary">사례 2. 총급여 5,000만원, 현재 500만원만 납입한 경우</p>
                  <p className="text-sm text-text-secondary">
                    · 공제율: 16.5% (5,500만원 이하 구간)
                    <br />
                    · 현재 500만원 납입 → 500만원 × 16.5% = 82.5만원
                    <br />
                    · 12월 말까지 400만원 추가 납입해 900만원 채우면 → 148.5만원
                    <br />
                    · 추가 400만원 납입으로 늘어나는 환급: 약 66만원
                  </p>
                </div>
                <p>
                  다만, 연금계좌는 노후 대비 상품이라 55세 이전에 중도 인출하면 세제상 불이익이 큽니다. 여윳돈 범위에서 채우는 것이 전제입니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">10~12월에 뭘 조정하면 환급이 늘어나나요?</h2>
                <p>
                  미리보기로 부족한 항목을 확인한 뒤, 아직 시간이 있는 세 가지를 손보면 됩니다.
                </p>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li>
                    <strong>결제 수단 바꾸기:</strong> 신용카드 25% 문턱을 넘겼다면 남은 지출을 체크카드·현금영수증으로. 공제율이 15%에서 30%로 두 배입니다.
                  </li>
                  <li>
                    <strong>연금계좌 채우기:</strong> 900만원 한도까지 부족분을 12월 31일 전에 추가 납입. 가장 확실한 환급 레버입니다.
                  </li>
                  <li>
                    <strong>지출 시점 조정:</strong> 의료비·안경·기부금 등 연말에 몰아서 지출하면 그해 공제로 잡힙니다. 다만 의료비는 총급여 3% 초과분만 공제됩니다.
                  </li>
                </ul>
                <p>
                  예외: 이미 각 항목의 한도를 채웠다면 추가 지출은 환급을 늘리지 않습니다. 미리보기로 한도 도달 여부를 먼저 확인하는 것이 핵심입니다.
                </p>
              </section>

              <h2 className="text-2xl font-bold mb-6">자주 묻는 질문</h2>
              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h3 className="text-lg font-semibold text-text-primary">관련 계산기 및 가이드</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link href="/calculator/salary/" className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition">
                    <div className="font-semibold text-primary-500">연봉 실수령액 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">4대보험·세금 공제 후 월 실수령액을 확인하세요.</p>
                  </Link>
                  <Link href="/guide/year-end-tax-settlement/" className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition">
                    <div className="font-semibold text-primary-500">연말정산 완벽 가이드</div>
                    <p className="mt-1 text-sm text-text-secondary">소득공제와 세액공제의 큰 그림을 잡으세요.</p>
                  </Link>
                  <Link href="/guide/credit-card-income-deduction-2026/" className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition">
                    <div className="font-semibold text-primary-500">신용카드 소득공제 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">25% 문턱과 결제 수단별 공제율을 자세히.</p>
                  </Link>
                  <Link href="/guide/pension-savings-irp-tax-credit-2026/" className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition">
                    <div className="font-semibold text-primary-500">연금저축·IRP 세액공제</div>
                    <p className="mt-1 text-sm text-text-secondary">900만원 한도와 공제율을 정확히 계산하세요.</p>
                  </Link>
                  <Link href="/guide/dual-income-couple-year-end-tax-2026/" className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition">
                    <div className="font-semibold text-primary-500">맞벌이 부부 연말정산</div>
                    <p className="mt-1 text-sm text-text-secondary">부양가족 공제를 누구에게 몰지 전략을 세우세요.</p>
                  </Link>
                  <Link href="/category/tax/" className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition">
                    <div className="font-semibold text-primary-500">모든 세금 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">소득세·양도세·취득세 계산기 모음.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 교육 목적으로 작성되었으며 개인 맞춤형 세무 조언이 아닙니다. 미리보기 개통일과 공제 한도·공제율은 해마다 세법 개정으로 달라질 수 있으므로, 실제 수치는 홈택스와 국세청 안내로 반드시 확인하세요. 본 콘텐츠는 2026-08-26 기준이며, 인용한 법조항은 <strong>소득세법 §137(근로소득세액의 연말정산), §59의3(연금계좌세액공제), 조세특례제한법 §126의2(신용카드 등 사용금액 소득공제)</strong>입니다. AI 보조 작성 후 운영자 검수 완료.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.hometax.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">국세청 홈택스</a>,{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터</a>,{' '}
                  <a href="https://www.nts.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">국세청</a>.
                </p>
              </section>

              <ShareButtons title="연말정산 미리보기 2026 가이드" url={URL} />
            </article>
          </main>
        </div>
        <Footer />
      </div>
    </>
  );
}
