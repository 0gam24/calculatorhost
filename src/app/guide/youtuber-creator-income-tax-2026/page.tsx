// [revenue-lever: traffic+indexing] 유튜버·크리에이터 세금 롱테일 검색 흡수, 1인미디어 트래픽 + 색인 표면 확대.
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

const URL = 'https://calculatorhost.com/guide/youtuber-creator-income-tax-2026/';
const DATE_PUBLISHED = '2026-08-23';
const DATE_MODIFIED = '2026-08-23';

export const metadata: Metadata = {
  title: '유튜버 세금 2026, 애드센스 종합소득세·부가세 영세율 신고',
  description:
    '유튜브·애드센스 수익이 생기면 5월 종합소득세 신고 대상입니다. 사업자등록 업종코드(940306·921505), 애드센스 부가세 영세율, 필요경비 공제, 신고 사례까지 2026 기준으로 정리합니다.',
  keywords: [
    '유튜버 세금',
    '크리에이터 종합소득세',
    '애드센스 부가세',
    '유튜브 영세율 신고',
    '미디어콘텐츠창작업 업종코드',
    '1인미디어 사업자등록',
    '소득세법 19조',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '유튜버 세금 2026 종합소득세 부가세 영세율' }],
    title: '유튜버 세금 2026, 애드센스 종합소득세와 부가세 영세율 신고법',
    description: '유튜브 수익이 생기면 종합소득세와 부가세 신고 대상. 업종코드, 영세율, 필요경비, 신고 사례를 한 번에 정리.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '유튜버 세금 2026, 애드센스 종합소득세·부가세 영세율',
    description: '유튜브·애드센스 수익의 사업자등록, 영세율, 필요경비, 5월 종소세 신고를 정리했습니다.',
  },
};

const FAQ_ITEMS = [
  {
    question: '구독자가 적고 수익이 몇만 원인데도 세금 신고를 해야 하나요?',
    answer:
      '소득이 발생했다면 금액과 무관하게 신고가 원칙입니다. 다만 연간 종합소득금액이 일정 수준 이하이면 실제 납부세액은 0원에 가깝고, 오히려 원천징수된 세금을 돌려받는 경우도 있습니다. 금액이 작아도 5월 종합소득세 신고 대상인지 홈택스에서 확인하세요.',
  },
  {
    question: '애드센스 수익은 기타소득인가요, 사업소득인가요?',
    answer:
      '채널을 계속·반복적으로 운영해 수익을 얻으면 사업소득입니다(소득세법 §19). 일회성으로 우연히 발생한 정도면 기타소득으로 볼 여지가 있으나, 정기 업로드로 광고 수익이 이어지면 사업소득으로 신고하는 것이 원칙입니다. 애매하면 관할 세무서에 확인하세요.',
  },
  {
    question: '사업자등록을 꼭 해야 하나요?',
    answer:
      '지속적으로 수익이 발생하면 사업자등록이 원칙입니다. 특히 애드센스 외화 수입에 부가세 영세율을 적용받으려면 과세사업자로 등록되어 있어야 합니다. 등록하지 않으면 영세율 혜택(매입세액 환급)을 받을 수 없고 미등록 가산세 위험도 있습니다.',
  },
  {
    question: '유튜브 수익에 부가가치세를 내야 하나요?',
    answer:
      '구글(해외 사업자)로부터 받는 애드센스 수입은 용역의 국외공급으로 보아 부가가치세 영세율이 적용됩니다(부가가치세법 §22). 영세율은 세율이 0%라 낼 세금은 없지만, 과세사업자라면 촬영 장비 등 매입세액을 환급받을 수 있습니다. 영세율 첨부서류(외화입금증명서 등)가 필요합니다.',
  },
  {
    question: '업종코드 940306과 921505는 무엇이 다른가요?',
    answer:
      '혼자, 별도 사업장이나 고용 없이 창작하면 1인미디어콘텐츠창작자(940306)로 분류되어 면세사업자가 되며 부가세 신고 대신 사업장현황신고(다음 해 2월)를 합니다. 편집자를 고용하거나 스튜디오 등 물적시설을 갖추면 미디어콘텐츠창작업(921505) 과세사업자로 분류됩니다. 정확한 분류는 관할 세무서에서 확인하세요.',
  },
  {
    question: '필요경비는 어디까지 인정되나요?',
    answer:
      '수익 활동에 직접 쓴 비용은 필요경비로 공제됩니다. 카메라·마이크·조명 등 장비, 편집 프로그램 구독료, 통신비, 외주 편집비, 소품 구입비 등이 대표적입니다. 증빙(세금계산서·현금영수증·계좌이체 내역)을 보관해야 하며, 사적 지출과 섞이지 않도록 사업용 계좌·카드를 쓰는 것이 안전합니다.',
  },
  {
    question: '단순경비율로 신고하면 장부를 안 써도 되나요?',
    answer:
      '수입금액이 일정 기준 미만인 신규·소규모 사업자는 단순경비율로 추계신고가 가능해 장부 없이도 신고할 수 있습니다. 다만 실제 지출이 단순경비율보다 크면 장부(복식·간편)를 써서 실제 경비를 공제하는 편이 세금이 적습니다. 경비율은 업종·수입금액별로 다르므로 홈택스에서 본인 기준을 확인하세요.',
  },
  {
    question: '해외 수입이라 국세청이 모르지 않나요?',
    answer:
      '외화 수입은 외국환은행을 거쳐 들어오며 금융정보로 파악될 수 있어 미신고 시 추후 가산세와 함께 추징될 수 있습니다. 신고를 누락하면 무신고가산세와 납부지연가산세가 붙으므로, 수익이 생긴 해의 다음 해 5월에 정확히 신고하는 것이 결과적으로 유리합니다.',
  },
];

export default function YoutuberCreatorIncomeTax2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '유튜버 세금 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '유튜버 세금 2026, 애드센스 종합소득세와 부가세 영세율 신고법',
    description:
      '유튜브·애드센스 수익의 사업자등록 업종코드, 부가세 영세율, 필요경비 공제, 5월 종합소득세 신고 절차와 계산 사례를 정리한 크리에이터 세금 가이드.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['유튜버 세금', '크리에이터 종합소득세', '애드센스 부가세', '영세율', '미디어콘텐츠창작업'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '유튜버 세금 2026',
    description: '유튜브·애드센스 수익의 종합소득세·부가세 신고를 정리한 크리에이터 세금 가이드.',
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
                    { name: '유튜버 세금 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">1인미디어·크리에이터 · 8분 읽기 · 2026-08-23</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  유튜버 세금 2026
                  <br />
                  <span className="text-2xl text-text-secondary">· 애드센스 종합소득세와 부가세 영세율</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  유튜브 광고 수익, 슈퍼챗, 브랜드 협찬으로 돈이 들어오기 시작하면 가장 먼저 막히는 지점이 세금입니다. 사업자등록을 해야 하는지, 애드센스 외화 수입에 부가세를 내는지, 5월 종합소득세는 어떻게 신고하는지 헷갈리는 1인 크리에이터를 위해, 업종코드부터 영세율·필요경비·신고 사례까지 2026년 기준으로 정리했습니다.
                </p>
              </header>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">유튜버도 세금을 내야 하나요?</h2>
                <p>
                  네, 수익이 발생하면 세금 신고 대상입니다. 채널을 계속·반복적으로 운영해 광고·후원·협찬 수익을 얻는다면 이는 소득세법 §19에 따른 사업소득이며, 매년 5월 종합소득세 신고를 해야 합니다. 금액이 작다고 신고 의무가 사라지지는 않습니다.
                </p>
                <p>
                  다만 소득이 적으면 각종 공제 후 실제 납부세액은 0원에 가깝거나, 원천징수·중간예납된 세금을 오히려 돌려받기도 합니다. 즉 신고는 세금을 더 내기 위해서가 아니라, 정확한 정산과 불이익 방지를 위해 하는 절차입니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">한눈에 보는 유튜버 세금 3층</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    1층 사업자등록: 지속 수익 발생 시 등록(업종코드 선택)
                    <br />
                    2층 부가가치세: 애드센스 외화 수입은 영세율(부가세법 §22), 과세사업자만 해당
                    <br />
                    3층 종합소득세: 매년 5월, 수입에서 필요경비를 뺀 소득에 누진세율(소득세법 §55)
                  </p>
                </div>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">사업자등록은 언제, 어떤 업종코드로 하나요?</h2>
                <p>
                  수익이 지속적으로 발생하기 시작하면 사업자등록이 원칙입니다. 크리에이터는 운영 형태에 따라 두 가지 업종코드로 나뉩니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 1인미디어 창작자 업종코드 비교 (국세청 신종업종 안내 기준)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">구분</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">940306 (1인미디어콘텐츠창작자)</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">921505 (미디어콘텐츠창작업)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">운영 형태</td>
                        <td className="p-3">고용·물적시설 없이 혼자 창작</td>
                        <td className="p-3">직원 고용 또는 스튜디오 등 시설 보유</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">부가세 구분</td>
                        <td className="p-3">면세사업자</td>
                        <td className="p-3">과세사업자(영세율 적용 가능)</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">부가세 신고</td>
                        <td className="p-3">없음(대신 2월 사업장현황신고)</td>
                        <td className="p-3">연 2회 신고(영세율이라 납부액 0에 가까움)</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">장비 매입세액</td>
                        <td className="p-3">환급 불가</td>
                        <td className="p-3">환급 가능</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  다만 두 코드의 분류 기준은 실제 운영 형태로 판단되므로, 처음 등록할 때 관할 세무서나 홈택스 상담을 통해 본인에게 맞는 코드를 확인하는 것이 안전합니다. 초기 장비 투자가 크다면 과세사업자로 등록해 매입세액을 환급받는 편이 유리할 수 있습니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">애드센스 수입은 부가세를 내나요?</h2>
                <p>
                  애드센스 광고 수입은 부가가치세 영세율(세율 0%) 대상입니다. 구글이라는 국외 사업자에게 제공하는 용역으로 보아 용역의 국외공급(부가가치세법 §22)에 해당하기 때문입니다. 즉 매출에 붙는 부가세는 0원입니다.
                </p>
                <p>
                  다만 영세율은 면세와 다릅니다. 과세사업자로 등록해 영세율을 적용받으면 카메라, 조명, 편집용 컴퓨터 등을 살 때 부담한 매입세액을 환급받을 수 있습니다. 영세율을 인정받으려면 외국환은행이 발급하는 외화입금증명서 등 첨부서류를 신고 때 제출해야 합니다.
                </p>
                <p>
                  주의: 국내 기업에서 받는 협찬·PPL·강연료 등 국내 매출은 영세율이 아니라 일반 10% 과세 대상일 수 있습니다. 수입의 성격(국외 애드센스 vs 국내 협찬)에 따라 부가세 처리가 달라지므로 구분해서 관리해야 합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">종합소득세 계산은 어떻게 하나요?</h2>
                <p>
                  종합소득세는 1년간 수입에서 필요경비를 뺀 소득금액에 누진세율(소득세법 §55)을 적용해 계산합니다. 아래는 이해를 돕기 위한 가상 사례로, 실제 세액은 공제 항목에 따라 달라집니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3">
                  <p className="font-semibold text-text-primary">사례 1. 연 애드센스 수입 6,000만원, 실제 경비 2,000만원</p>
                  <p className="text-sm text-text-secondary">
                    · 수입금액: 6,000만원
                    <br />
                    · 필요경비(장비·외주·통신 등, 장부): 2,000만원
                    <br />
                    · 소득금액: 6,000만 − 2,000만 = 4,000만원
                    <br />
                    · 종합소득공제(본인 기본공제 등 가정): 150만원
                    <br />
                    · 과세표준: 4,000만 − 150만 = 3,850만원
                    <br />
                    · 산출세액: 3,850만 × 15% − 누진공제 126만 = <strong>4,515,000원</strong>
                    <br />
                    <span className="text-xs text-text-tertiary">지방소득세(산출세액의 10%)는 별도. 세액공제·4대보험은 미반영한 단순 예시.</span>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3">
                  <p className="font-semibold text-text-primary">사례 2. 연 수입 2,400만원, 실제 경비 900만원</p>
                  <p className="text-sm text-text-secondary">
                    · 소득금액: 2,400만 − 900만 = 1,500만원
                    <br />
                    · 과세표준(기본공제 150만 가정): 1,350만원
                    <br />
                    · 산출세액: 1,350만 × 6% = <strong>810,000원</strong>
                    <br />
                    <span className="text-xs text-text-tertiary">과세표준 1,400만원 이하 구간은 세율 6%, 누진공제 0원. 지방소득세 별도.</span>
                  </p>
                </div>
                <p className="mt-4">
                  다만 수입금액이 작은 신규 사업자는 장부 대신 단순경비율로 추계신고가 가능합니다. 경비율은 업종·수입금액에 따라 달라지므로, 실제 지출이 경비율보다 크면 장부 신고가 세금을 줄이는 데 유리합니다. 본인 적용 경비율은 홈택스에서 조회하세요.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">유튜버가 놓치기 쉬운 함정</h2>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li>
                    <strong>사업용 계좌·카드 미분리:</strong> 사적 지출과 섞이면 필요경비 인정이 어려워집니다. 수익 활동 지출은 별도 계좌·카드로 관리하세요.
                  </li>
                  <li>
                    <strong>미신고 방치:</strong> 해외 수입이라 안 걸린다는 생각은 위험합니다. 무신고가산세와 납부지연가산세가 붙어 나중에 더 큰 부담이 됩니다.
                  </li>
                  <li>
                    <strong>영세율 첨부서류 누락:</strong> 과세사업자인데 외화입금증명서 등 서류를 제출하지 않으면 영세율을 인정받지 못할 수 있습니다.
                  </li>
                  <li>
                    <strong>건강보험료 영향 간과:</strong> 사업소득이 잡히면 지역가입자 건강보험료나 피부양자 자격에 영향을 줄 수 있습니다. 예: 직장인 겸업 크리에이터는 별도 확인이 필요합니다.
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
                    <p className="mt-1 text-sm text-text-secondary">수입과 경비를 넣어 예상 종합소득세를 확인하세요.</p>
                  </Link>
                  <Link
                    href="/guide/online-seller-smartstore-tax-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">온라인 셀러 세금 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">스마트스토어 사업자등록과 간이·일반과세 부가세 정리.</p>
                  </Link>
                  <Link
                    href="/guide/secondhand-trading-income-tax-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">중고거래 세금 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">당근마켓 판매, 어디부터 사업소득인지 판단 기준.</p>
                  </Link>
                  <Link
                    href="/guide/freelancer-simplified-vs-standard-expense-rate-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">단순경비율 vs 기준경비율</div>
                    <p className="mt-1 text-sm text-text-secondary">장부 없이 추계신고할 때 경비율 선택 기준.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 교육 목적으로 작성되었으며 개인 맞춤형 세무 조언이 아닙니다. 실제 사업자등록 업종코드, 영세율 적용 여부, 필요경비 인정 범위, 최종 세액은 관할 세무서 또는 홈택스에서 반드시 확인하세요. 인용 조항은 소득세법 §19(사업소득), 소득세법 §55(종합소득세율), 부가가치세법 §22(용역의 국외공급 영세율)입니다. 본 콘텐츠는 2026-08-23 기준이며 세법 개정 시 업데이트됩니다. AI 보조 작성 후 운영자 검수 완료.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터</a>,{' '}
                  <a href="https://www.nts.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">국세청(신종업종 세무안내)</a>,{' '}
                  <a href="https://www.hometax.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">국세청 홈택스</a>.
                </p>
              </section>

              <ShareButtons title="유튜버 세금 2026 가이드" url={URL} />
            </article>
          </main>
        </div>
        <Footer />
      </div>
    </>
  );
}
