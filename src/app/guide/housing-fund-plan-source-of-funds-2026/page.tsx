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

const URL = 'https://calculatorhost.com/guide/housing-fund-plan-source-of-funds-2026/';
const DATE_PUBLISHED = '2026-07-30';
const DATE_MODIFIED = '2026-07-30';

export const metadata: Metadata = {
  title: '주택 자금조달계획서 2026, 제출 대상·작성법·증여 증빙',
  description:
    '주택 자금조달계획서는 6억 이상 주택이나 규제지역 매수 시 계약 후 30일 안에 제출해야 합니다. 제출 대상과 자기자금·차입금 기재법, 증여·차용 증빙, 자금출처조사 연계를 부동산 거래신고법 기준으로 정리했습니다.',
  keywords: [
    '자금조달계획서',
    '주택 자금조달계획서',
    '자금출처조사',
    '부동산 거래신고',
    '증여 차용증',
    '부동산 거래신고법',
    '주택 매수 서류',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '주택 자금조달계획서 2026, 제출 대상·작성법·증여 증빙' }],
    title: '주택 자금조달계획서 2026, 제출 대상·작성법·증여 증빙',
    description: '6억 이상 또는 규제지역 매수 시 계약 후 30일 내 제출. 자기자금·차입금 기재와 증여 증빙, 자금출처조사 연계 정리.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '주택 자금조달계획서 2026, 제출 대상·작성법·증여 증빙',
    description: '6억 이상·규제지역 주택 매수 시 30일 내 제출. 잘못 쓰면 자금출처조사로 이어질 수 있는 항목까지 정리.',
  },
};

const FAQ_ITEMS = [
  {
    question: '자금조달계획서는 누가 제출해야 하나요?',
    answer:
      '거래가격이 6억원 이상인 주택을 사거나, 투기과열지구·조정대상지역 등 규제지역에 있는 주택을 살 때는 금액과 관계없이 제출해야 합니다(부동산 거래신고 등에 관한 법률). 분양권·입주권 매수도 대상에 포함됩니다. 특히 투기과열지구에서는 계획서만이 아니라 예금잔액증명 등 증빙서류까지 함께 내야 합니다.',
  },
  {
    question: '언제까지 제출해야 하나요?',
    answer:
      '주택 매매계약 체결일로부터 30일 이내에 제출해야 합니다. 자금조달계획서는 부동산 거래신고와 함께 접수하는 것이 일반적이며, 보통 매수인을 대리하는 공인중개사가 부동산거래관리시스템을 통해 신고합니다. 기한을 넘기면 과태료 대상이 될 수 있으므로 계약 직후 일정을 챙기세요.',
  },
  {
    question: '계획서에는 무엇을 적나요?',
    answer:
      '집값을 어떻게 마련하는지를 자기자금과 차입금으로 나눠 적습니다. 자기자금에는 예금, 주식·채권 매각대금, 기존 부동산 처분대금, 증여·상속받은 돈 등이 들어가고, 차입금에는 금융기관 주택담보대출, 전세보증금(임대보증금), 회사·가족 등에게 빌린 돈이 들어갑니다. 합계가 매매가격과 맞아떨어져야 합니다.',
  },
  {
    question: '부모님께 돈을 받아 집을 사면 어떻게 적나요?',
    answer:
      '부모에게 받은 돈은 성격에 따라 증여 또는 차용으로 구분해 적습니다. 그냥 받은 돈이면 증여로 기재하고 증여세 신고를, 갚기로 한 돈이면 차용으로 적고 차용증과 실제 이자·원금 상환 내역을 갖춰야 합니다. 차용으로 적고도 실제로 갚지 않으면 나중에 증여로 보아 증여세가 추징될 수 있으니 형식과 실질을 일치시키세요.',
  },
  {
    question: '증여나 차용은 어떤 증빙을 준비해야 하나요?',
    answer:
      '증여라면 증여계약서와 증여세 신고서 사본, 예금잔액증명서 등이 필요합니다. 차용이라면 차용증(작성일·금액·이자율·상환일 명시), 이체 내역, 이자 지급 기록을 갖추는 것이 안전합니다. 특히 투기과열지구 주택은 이런 증빙을 계획서와 함께 제출해야 하므로 계약 전에 미리 준비해 두는 것이 좋습니다.',
  },
  {
    question: '자금조달계획서를 내면 세무조사를 받게 되나요?',
    answer:
      '제출 자체가 곧 조사는 아닙니다. 다만 제출된 계획서는 한국부동산원을 거쳐 국세청과 공유되고, 국세청이 신고 내용과 소득·재산 자료를 대조해 자금 출처가 불분명하거나 소득에 비해 무리한 매수로 판단하면 자금출처조사 대상으로 선정할 수 있습니다. 사실대로 정확히 기재하고 증빙을 갖추는 것이 최선의 대비입니다.',
  },
  {
    question: '내용을 잘못 적으면 어떻게 되나요?',
    answer:
      '허위로 기재하거나 자료를 제출하지 않으면 과태료가 부과될 수 있고, 편법 증여 정황이 드러나면 증여세 본세와 가산세까지 추징될 수 있습니다. 반대로 몰라서 항목을 빠뜨린 경우에는 보완 요구를 받을 수 있으니, 애매하면 관할 시·군·구청 부동산 거래신고 담당 부서나 중개사에게 확인 후 제출하세요.',
  },
  {
    question: '증빙이 아직 준비되지 않았으면 어떻게 하나요?',
    answer:
      '계약 시점에 자금 조달이 확정되지 않은 항목은 계획 단계의 예정 내용으로 기재하되, 실제와 크게 달라지면 문제가 될 수 있습니다. 대출 실행 예정액, 기존 주택 매각 예정 등은 그 취지를 적고, 이후 실제 자금 흐름을 은행 이체 기록으로 남겨 두면 소명에 유리합니다. 계획과 실제가 일치하도록 관리하는 것이 핵심입니다.',
  },
];

export default function HousingFundPlanSourceOfFunds2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '주택 자금조달계획서 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '주택 자금조달계획서 2026, 제출 대상·작성법·증여 증빙',
    description:
      '주택 자금조달계획서의 제출 대상(6억 이상·규제지역), 30일 기한, 자기자금·차입금 기재법, 증여·차용 증빙, 자금출처조사 연계를 부동산 거래신고법 기준으로 정리한 가이드.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['자금조달계획서', '자금출처조사', '부동산 거래신고', '증여', '차용증'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '주택 자금조달계획서 2026',
    description: '주택 자금조달계획서 제출 대상·기한·작성법과 증여 증빙, 자금출처조사 연계 정리.',
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
                    { name: '주택 자금조달계획서 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">주택 매수 예정자 · 8분 읽기 · 2026-07-30</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  주택 자금조달계획서 2026
                  <br />
                  <span className="text-2xl text-text-secondary">제출 대상·작성법·증여 증빙</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  이 가이드는 6억원 이상 주택이나 규제지역 주택을 사기로 계약한 매수인을 위한 것입니다. 자금조달계획서는 집값을 어떻게 마련했는지 정부에 밝히는 서류로, 잘못 적으면 자금출처조사나 증여세 추징으로 이어질 수 있습니다. 누가 언제 내야 하는지, 자기자금과 차입금을 어떻게 나눠 적는지, 부모 지원금은 어떻게 처리하는지를 부동산 거래신고법 조항과 함께 단계별로 정리합니다.
                </p>
              </header>

              <AdSlot slot="guide-housing-fund-plan-source-of-funds-top" format="horizontal" />

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">자금조달계획서란 무엇인가요?</h2>
                <p>
                  자금조달계획서는 주택을 살 때 그 돈을 어디서 마련했는지 항목별로 적어 제출하는 서류입니다(부동산 거래신고 등에 관한 법률 §3). 정식 명칭은 주택취득자금 조달 및 입주계획서로, 부동산 거래의 투명성을 높이고 편법 증여를 걸러내기 위해 일정 요건의 주택 매수자에게 제출을 의무화하고 있습니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">30초 요약</p>
                  <ul className="mt-2 space-y-1 text-sm text-text-secondary list-disc ml-5">
                    <li>대상: 6억원 이상 주택 또는 규제지역 주택(금액 무관), 분양권·입주권 포함</li>
                    <li>기한: 매매계약 후 30일 이내 (부동산 거래신고와 함께)</li>
                    <li>내용: 자기자금 + 차입금 = 매매가격</li>
                    <li>투기과열지구: 증빙서류까지 첨부 의무</li>
                    <li>근거: 부동산 거래신고 등에 관한 법률 §3, 같은 법 시행령</li>
                  </ul>
                </div>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">누가, 언제까지 내야 하나요?</h2>
                <p>
                  제출 대상은 크게 두 갈래입니다. 첫째, 거래가격 6억원 이상 주택을 사는 경우. 둘째, 투기과열지구나 조정대상지역 같은 규제지역 주택을 사는 경우로, 이때는 금액과 무관하게 대상이 됩니다. 제출 기한은 매매계약 체결일로부터 30일 이내입니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 자금조달계획서 제출 요건 (부동산 거래신고법 기준)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">구분</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">제출 여부</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">증빙 첨부</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">비규제지역, 6억원 미만</td>
                        <td className="p-3">제출 대상 아님</td>
                        <td className="p-3">해당 없음</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">비규제지역, 6억원 이상</td>
                        <td className="p-3"><strong>제출</strong></td>
                        <td className="p-3">계획서만</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">규제지역(조정대상지역)</td>
                        <td className="p-3"><strong>제출</strong> (금액 무관)</td>
                        <td className="p-3">계획서</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">투기과열지구</td>
                        <td className="p-3"><strong>제출</strong> (금액 무관)</td>
                        <td className="p-3"><strong>증빙서류 첨부</strong></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  다만, 규제지역 지정 현황(투기과열지구·조정대상지역)은 정부 정책에 따라 수시로 바뀝니다. 매수 시점의 규제지역 여부와 정확한 기준 금액은 국토교통부 공고와 관할 지자체를 통해 반드시 확인하세요.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">자기자금과 차입금은 어떻게 나눠 적나요?</h2>
                <p>
                  계획서의 뼈대는 자기자금과 차입금의 구분입니다. 두 항목의 합계가 매매가격과 일치해야 하며, 각 항목이 실제 자금 흐름과 맞아야 소명에 문제가 없습니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-2">
                  <p className="font-semibold text-text-primary">자기자금에 들어가는 항목</p>
                  <p className="text-sm text-text-secondary">예금·적금, 주식·채권·펀드 매각대금, 기존 부동산 처분대금, 보증금 회수액, 증여·상속받은 자금 등</p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-2">
                  <p className="font-semibold text-text-primary">차입금에 들어가는 항목</p>
                  <p className="text-sm text-text-secondary">금융기관 주택담보대출, 신용대출, 임대보증금(전세 끼고 매수 시), 회사·가족·지인에게 빌린 돈 등</p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3">
                  <p className="font-semibold text-text-primary">작성 사례. 8억원 아파트 매수 (규제지역)</p>
                  <p className="text-sm text-text-secondary">
                    · 자기자금: 예금 3억 + 기존 주택 처분 2억 + 부모 증여 1억 = 6억
                    <br />
                    · 차입금: 주택담보대출 2억 = 2억
                    <br />
                    · 합계: 6억 + 2억 = <strong>8억원</strong> (매매가와 일치)
                    <br />
                    <span className="text-xs text-text-tertiary">부모 증여 1억은 증여세 신고 후 증여로 기재, 대출 2억은 대출 승인서로 증빙.</span>
                  </p>
                </div>
              </section>

              <AdSlot slot="guide-housing-fund-plan-source-of-funds-mid" format="rectangle" />

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">증여와 차용, 무엇이 다른가요?</h2>
                <p>
                  부모 등에게 받은 돈은 증여로 적을지 차용으로 적을지에 따라 세금이 완전히 달라집니다. 핵심은 갚을 의무가 있느냐입니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 2. 증여 vs 차용 비교</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">구분</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">증여</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">차용</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">성격</td>
                        <td className="p-3">받고 안 갚음</td>
                        <td className="p-3">빌리고 갚음</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">세금</td>
                        <td className="p-3">증여세 신고·납부</td>
                        <td className="p-3">원칙적 없음(적정 이자 시)</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">증빙</td>
                        <td className="p-3">증여계약서, 증여세 신고서</td>
                        <td className="p-3">차용증, 이자·원금 상환 기록</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  예외: 차용으로 적고도 실제로는 갚지 않으면 국세청이 이를 증여로 보아 증여세를 추징할 수 있습니다. 차용으로 기재했다면 차용증대로 이자를 실제 지급하고 원금을 상환하는 기록을 반드시 남겨야 합니다. 형식만 차용이고 실질이 증여이면 소명에 실패합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">자금출처조사와 어떻게 연결되나요?</h2>
                <p>
                  제출한 자금조달계획서는 한국부동산원을 거쳐 국세청과 공유됩니다. 국세청은 계획서 내용을 매수인의 소득·재산 자료와 대조해, 소득에 비해 무리한 매수이거나 자금 출처가 불분명하면 자금출처조사 대상자로 선정합니다.
                </p>
                <p>
                  특히 사회초년생이나 소득이 적은 사람이 고가 주택을 매수하면서 자기자금 비중이 크면 조사 가능성이 높아집니다. 이럴 때 증여받은 돈을 신고 없이 자기자금으로 적었다면 편법 증여로 걸러질 수 있습니다. 다만 사실대로 적고 증빙만 잘 갖추면 조사를 받아도 문제될 것이 없으니, 계획서 작성 단계부터 자금 흐름을 은행 기록으로 남겨 두는 것이 가장 확실한 대비입니다.
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
                    <p className="mt-1 text-sm text-text-secondary">주택 매수 시 내야 할 취득세를 계산해 보세요.</p>
                  </Link>
                  <Link
                    href="/guide/family-loan-agreement-gift-tax-avoidance/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">가족 간 차용증과 증여세</div>
                    <p className="mt-1 text-sm text-text-secondary">부모 자금을 차용으로 처리할 때의 요건을 확인하세요.</p>
                  </Link>
                  <Link
                    href="/guide/gift-tax-exemption-limit-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">증여재산공제 한도 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">직계존비속 5천만원 등 비과세 한도를 정리했습니다.</p>
                  </Link>
                  <Link
                    href="/calculator/gift-tax/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">증여세 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">부모 지원금에 붙는 증여세를 미리 계산해 보세요.</p>
                  </Link>
                  <Link
                    href="/guide/first-home-acquisition-tax-reduction-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">생애최초 취득세 감면</div>
                    <p className="mt-1 text-sm text-text-secondary">첫 주택 구입 시 받을 수 있는 취득세 감면.</p>
                  </Link>
                  <Link
                    href="/category/tax/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">모든 세금 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">취득세·양도세·증여세 계산기 모음.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 교육 목적으로 작성되었으며, 개인 맞춤형 세무·법률 조언이 아닙니다. 자금조달계획서 제출 대상, 기준 금액, 규제지역 지정 현황은 정부 정책에 따라 수시로 바뀌므로, 계약 전 국토교통부 공고와 관할 시·군·구청에서 반드시 확인하세요. 증여·차용 처리와 자금출처 소명은 개별 사정에 따라 판단이 달라질 수 있으므로 필요 시 세무 전문가와 상담하시기 바랍니다. 본 콘텐츠는 2026-07-30을 기준으로 작성되었으며, 관련 법령 개정 시 즉시 업데이트됩니다. 근거 법령: <strong>부동산 거래신고 등에 관한 법률 §3 및 같은 법 시행령</strong>. AI 보조 작성 후 운영자 검수 완료.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터</a>,{' '}
                  <a href="https://rtms.molit.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">국토교통부 실거래가 공개시스템</a>,{' '}
                  <a href="https://www.nts.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">국세청</a>.
                </p>
              </section>

              <ShareButtons
                title="주택 자금조달계획서 2026 가이드"
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