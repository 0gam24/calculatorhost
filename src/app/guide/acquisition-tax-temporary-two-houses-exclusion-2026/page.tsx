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

const URL = 'https://calculatorhost.com/guide/acquisition-tax-temporary-two-houses-exclusion-2026/';
const DATE_PUBLISHED = '2026-08-03';
const DATE_MODIFIED = '2026-08-03';

export const metadata: Metadata = {
  title: '취득세 일시적 2주택 중과 배제 2026, 종전주택 3년 처분',
  description:
    '이사로 새 집을 먼저 샀는데 종전주택을 언제까지 팔아야 취득세 8% 중과를 피할까요. 지방세법 §13의2와 시행령 §28의5 기준, 신규주택 취득일부터 3년 이내 종전주택을 처분하면 1~3% 기본세율이 적용됩니다.',
  keywords: [
    '취득세 일시적 2주택',
    '일시적 2주택 취득세 3년',
    '종전주택 처분기한',
    '취득세 중과 배제',
    '취득세 8퍼센트',
    '조정대상지역 취득세',
    '지방세법 13조의2',
    '지방세법 시행령 28의5',
    '이사 취득세',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '취득세 일시적 2주택 중과 배제 2026, 종전주택 3년 처분' }],
    title: '취득세 일시적 2주택 중과 배제 2026: 종전주택 3년 처분 조건',
    description: '신규주택 취득일부터 3년 이내 종전주택을 처분하면 취득세 8% 중과 대신 1~3% 기본세율이 적용됩니다. 조건·계산·미처분 추징까지 정리.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '취득세 일시적 2주택 중과 배제 2026: 종전주택 3년 처분',
    description: '지방세법 §13의2·시행령 §28의5 기준, 신규주택 취득일부터 3년 이내 종전주택 처분 시 기본세율(1~3%) 적용.',
  },
};

const FAQ_ITEMS = [
  {
    question: '종전주택 처분기한 3년은 언제부터 세나요?',
    answer:
      '신규주택 취득일이 기산일입니다. 취득일은 잔금청산일과 소유권이전등기일 중 빠른 날로 봅니다(지방세법 §7 및 시행령 §20). 예를 들어 2026년 8월 3일에 신규주택 잔금을 치렀다면, 2029년 8월 2일까지 종전주택 소유권을 넘겨야 일시적 2주택 특례가 유지됩니다. 계약일이 아니라 잔금·등기일 기준이라는 점을 반드시 기억하세요.',
  },
  {
    question: '조정대상지역이면 처분기한이 더 짧지 않나요?',
    answer:
      '2023년 1월 12일 이후 취득분부터는 지역 구분 없이 3년으로 통일됐습니다. 그 이전에는 조정에서 조정으로 이사할 때 2년, 조정에서 비조정으로 이사할 때 3년으로 나뉘었지만, 지방세법 시행령 §28의5 개정으로 현재는 신규주택이 어디에 있든 종전주택 처분기한이 3년입니다. 다만 양도소득세 쪽 일시적 2주택 비과세 요건은 별도이므로 두 세목을 함께 점검해야 합니다.',
  },
  {
    question: '종전주택을 먼저 사고 신규주택을 나중에 사야 하나요?',
    answer:
      '네, 종전주택 취득이 신규주택 취득보다 시간적으로 앞서야 합니다(지방세법 시행령 §28의5). 반대 순서로 취득한 경우에는 일시적 2주택으로 인정되지 않고 처음부터 다주택 중과세율이 적용됩니다. 두 주택의 취득일 순서와 등기부등본상 소유권 이전일을 반드시 확인하세요.',
  },
  {
    question: '분양권·입주권도 일시적 2주택으로 인정되나요?',
    answer:
      '주택이 완공돼 소유권 이전등기를 받은 시점부터 주택 수에 산입됩니다. 다만 2020년 8월 12일 이후 취득한 분양권·입주권은 취득세 주택 수 산정에서 별도 규정이 적용되므로(지방세법 §13의3), 자신의 취득 시점과 유형에 따라 판정 방식이 달라집니다. 위택스 또는 관할 시·군·구청에 사전 상담을 받는 것이 안전합니다.',
  },
  {
    question: '주택 수 판단 기준은 개인인가요, 세대인가요?',
    answer:
      '취득세 다주택 중과는 세대 단위로 판단합니다(지방세법 §13의2 및 시행령 §28의4). 세대는 주민등록표상 같이 등재된 배우자·미혼자녀 등을 포함하며, 배우자는 주소가 달라도 원칙적으로 같은 세대로 봅니다. 부모와 30세 미만 미혼 자녀도 같은 세대이므로, 세대원 각자의 주택 보유 현황을 합산해서 판정합니다.',
  },
  {
    question: '3년 안에 종전주택을 못 팔면 어떻게 되나요?',
    answer:
      '중과세율로 재계산해 차액과 가산세를 추징합니다. 지방세법 시행령 §28의5에 따라 처분기한 만료일 다음 날부터 60일 이내에 스스로 수정신고와 추가 납부를 해야 합니다. 자진신고를 놓치면 무신고가산세 20%와 납부지연가산세(연 8%대)가 추가되므로, 처분이 어려워질 조짐이 보이면 조기에 관할 지자체 세무서와 상담을 잡는 편이 안전합니다.',
  },
  {
    question: '취득세 신고·납부기한은 언제까지인가요?',
    answer:
      '주택 취득일부터 60일 이내에 관할 시·군·구청에 신고하고 납부해야 합니다(지방세법 §20). 지방교육세와 농특세는 취득세와 함께 신고·납부하며, 위택스(wetax.go.kr)에서 온라인 신고가 가능합니다. 60일이 지나면 무신고가산세와 납부지연가산세가 별도로 부과되므로 잔금일 기준으로 일정을 미리 잡아 두세요.',
  },
  {
    question: '종전주택을 배우자에게 증여해도 처분으로 인정되나요?',
    answer:
      '유상 매도가 원칙이며, 동일 세대 안에서의 증여는 처분으로 인정받기 어렵습니다. 배우자·직계존비속에게 증여한 경우 같은 세대에 해당하면 종전주택이 여전히 세대 내에 남아 있는 것으로 보기 때문입니다. 세대 완전 분리가 실제로 성립하는지, 증여가 유효한 처분인지는 사실관계에 따라 다르므로 반드시 관할 지자체 또는 세무 전문가와 사전에 확인하세요.',
  },
];

export default function AcquisitionTaxTemporaryTwoHousesExclusion2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '취득세 일시적 2주택 중과 배제 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '취득세 일시적 2주택 중과 배제 2026: 종전주택 3년 처분 조건',
    description:
      '1주택자가 이사로 새 집을 먼저 취득해도, 종전주택을 신규주택 취득일부터 3년 이내에 처분하면 취득세 8% 중과 대신 1~3% 기본세율이 적용됩니다. 조건·계산·미처분 추징 절차까지 정리.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['취득세', '일시적 2주택', '종전주택 처분기한', '취득세 중과 배제', '지방세법 13조의2'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '취득세 일시적 2주택 중과 배제 2026',
    description:
      '신규주택 취득일부터 3년 이내 종전주택을 처분하면 취득세 8% 중과 대신 1~3% 기본세율이 적용되는 일시적 2주택 특례의 요건과 계산.',
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
                    { name: '취득세 일시적 2주택 중과 배제 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">이사 앞둔 1주택자 · 9분 읽기 · 2026-08-03</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  취득세 일시적 2주택 중과 배제 2026
                  <br />
                  <span className="text-2xl text-text-secondary">종전주택 3년 안에 팔면 기본세율 1~3%</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  이사하려고 새 집을 먼저 계약했는데 기존 집이 안 팔린다면 취득세 8% 중과가 나올까 걱정되기 마련입니다. 결론부터 말하면, 1주택자가 신규주택을 사고 종전주택을 신규주택 취득일부터 3년 이내에 처분하면 취득세는 다주택 중과가 아니라 기본세율 1~3%로 부과됩니다. 이 가이드는 지방세법 §13의2와 시행령 §28의5·§28의6을 기준으로 처분기한, 세대 판정, 미처분 시 추징까지 한 번에 정리합니다.
                </p>
              </header>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">일시적 2주택 취득세 중과 배제란 무엇인가</h2>
                <p>
                  일시적 2주택 중과 배제는 1주택자가 이사를 위해 새 집을 먼저 사면서 일시적으로 2주택이 되는 상황에서, 종전주택을 정해진 기한 안에 처분하면 신규주택 취득세를 다주택 중과세율(8·12%)이 아니라 기본세율(1~3%)로 적용해 주는 제도입니다. 근거는 지방세법 §13의2(주택 유상거래 취득 중과세율)와 시행령 §28의5(일시적 2주택), §28의6에 있습니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">특례의 기본 구조</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    · 대상: 1주택 세대가 이사 목적으로 신규주택을 취득한 경우
                    <br />
                    · 요건: 종전주택 취득 후 신규주택 취득 (순서가 바뀌면 특례 대상 아님)
                    <br />
                    · 조건: 신규주택 취득일부터 3년 이내 종전주택 처분
                    <br />
                    · 효과: 신규주택 취득세를 8·12% 중과 대신 1~3% 기본세율로 부과
                  </p>
                </div>
                <p className="mt-4">
                  다만 특례는 자동 적용이 아니라 신청·확인 절차를 거칩니다. 통상 신규주택 취득세 신고 시 위택스 또는 관할 시·군·구청에 일시적 2주택 특례로 신고하며, 이후 처분기한 내에 종전주택 소유권 이전을 완료해야 특례가 최종 유지됩니다. 처분기한을 넘기면 처음 낸 기본세율 취득세와 중과세율 취득세의 차액이 가산세와 함께 추징됩니다.
                </p>
                <p className="mt-4">
                  예외: 종전주택을 신규주택보다 뒤에 취득한 경우, 시행령 §28의5에서 정한 순서 요건을 충족하지 못하므로 처음부터 일반 다주택으로 분류돼 중과세율이 부과됩니다. 계약 순서보다 취득일(잔금·등기일 중 빠른 날) 순서를 확인해야 합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">종전주택은 언제까지 팔아야 하나</h2>
                <p>
                  종전주택 처분기한은 신규주택 취득일부터 3년 이내입니다. 지방세법 시행령 §28의5는 이 3년을 처분기한으로 명시하며, 이 기한 안에 매매·경매·공매 등 유상 방식으로 소유권이 이전돼야 특례가 유지됩니다.
                </p>
                <p className="mt-4">
                  기산일이 되는 신규주택 취득일은 잔금청산일과 소유권이전등기일 중 빠른 날입니다(지방세법 §7 및 시행령 §20). 실제 계약일이 아니라 실제 소유권을 확보한 시점이 기준이라는 점을 놓치기 쉽습니다. 예를 들어 2026년 3월에 계약하고 8월 3일에 잔금을 치른 뒤 8월 10일에 등기했다면, 취득일은 잔금일인 8월 3일이 됩니다. 이 경우 처분기한은 2029년 8월 2일까지입니다.
                </p>
                <p className="mt-4">
                  종전주택의 처분일 판정도 같은 원리를 씁니다. 종전주택의 소유권이 매수인에게 이전된 날, 즉 잔금청산일과 소유권이전등기일 중 빠른 날이 처분일입니다. 매도 계약을 3년 안에 체결하더라도 잔금·등기가 3년을 넘기면 특례가 깨질 수 있으므로, 매도 계약 시점을 잔금 일정까지 감안해서 잡아야 합니다.
                </p>
                <p className="mt-4">
                  다만, 처분기한이 3년이라고 해서 마지막 날까지 여유가 있는 것은 아닙니다. 부동산 시장 상황에 따라 매수인을 찾는 데 수개월이 걸릴 수 있고, 잔금 조율에도 시간이 필요하기 때문입니다. 실무적으로는 신규주택 취득 후 2년 이내에 매도 절차를 마무리하는 것을 목표로 잡는 편이 안전합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">조정대상지역이면 처분기한이 다른가</h2>
                <p>
                  2023년 1월 12일 이후 취득분부터는 조정대상지역과 비조정대상지역을 구분하지 않고 처분기한이 3년으로 통일됐습니다. 지방세법 시행령 §28의5가 개정되면서 지역별 차등 규정이 사라졌기 때문입니다.
                </p>
                <p className="mt-4">
                  그 이전 규정은 조금 복잡했습니다. 종전주택과 신규주택이 모두 조정대상지역에 있으면 2년, 그렇지 않은 조합이면 3년으로 나뉘었습니다. 매매 순서와 지역 조합에 따라 처분기한이 달라져 실무 혼선이 컸는데, 현재는 지역과 무관하게 3년이라는 단일 기준만 기억하면 됩니다.
                </p>
                <p className="mt-4">
                  다만 과거 취득분에는 옛 규정이 그대로 적용됩니다. 2023년 1월 12일 이전에 신규주택을 취득했다면 당시 규정의 처분기한(2년 또는 3년)을 따라야 하며, 이미 그 기한이 지났다면 소급 완화 혜택은 없습니다. 취득 시점의 시행령 부칙을 반드시 확인해야 합니다.
                </p>
                <p className="mt-4">
                  예외: 취득세와 별개로 양도소득세의 일시적 2주택 비과세 요건은 소득세법 시행령 §155에 따로 규정돼 있으며, 조정지역 여부·보유·거주 요건이 다릅니다. 취득세가 통과됐다고 해서 양도세 비과세가 자동 인정되는 것이 아니므로, 이사 계획 단계에서 두 세목을 동시에 점검해야 합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">취득세 기본세율 vs 다주택 중과세율 비교</h2>
                <p>
                  기본세율과 중과세율의 격차는 상당히 큽니다. 아래 표는 지방세법 §11(주택 유상거래 취득세율)과 §13의2(다주택 중과세율)를 정리한 것입니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 주택 유상거래 취득세율 (지방세법 §11 및 §13의2, 2026 기준)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">구분</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">1주택 (기본세율)</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">조정지역 2주택</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">조정 3주택 또는 비조정 4주택 이상</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">6억원 이하</td>
                        <td className="p-3"><strong>1%</strong></td>
                        <td className="p-3">8%</td>
                        <td className="p-3">12%</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">6억원 초과 9억원 이하</td>
                        <td className="p-3"><strong>1~3% (구간비례)</strong></td>
                        <td className="p-3">8%</td>
                        <td className="p-3">12%</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">9억원 초과</td>
                        <td className="p-3"><strong>3%</strong></td>
                        <td className="p-3">8%</td>
                        <td className="p-3">12%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  일시적 2주택 특례가 인정되면 표의 첫 번째 열(기본세율)이 적용되고, 특례가 깨지면 세 번째 또는 네 번째 열이 적용됩니다. 예를 들어 6억원 주택 하나만 놓고 봐도 기본 1%(600만원)와 조정 2주택 중과 8%(4,800만원) 사이에 4,200만원이라는 격차가 발생합니다.
                </p>
                <p className="mt-4">
                  다만, 이 표의 세율은 취득세 본세만 나타낸 값입니다. 지방교육세는 취득세의 10%가 추가되고, 국민주택규모(전용 85㎡)를 초과하는 주택에는 농어촌특별세 0.2%가 별도로 붙습니다. 실제 총 부담액은 본세 계산 후 지방교육세·농특세를 더해서 확정해야 합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">처분기한 내 못 팔면 어떻게 되나</h2>
                <p>
                  기한 안에 종전주택을 처분하지 못하면 특례가 소급해 무효가 됩니다. 지방세법 시행령 §28의5에 따라, 처음 신고한 기본세율과 다주택 중과세율의 차액에 가산세를 더해 추가로 납부해야 합니다.
                </p>
                <p className="mt-4">
                  절차는 다음과 같습니다. 처분기한 만료일 다음 날부터 60일 이내에 관할 시·군·구청에 수정신고서를 제출하고 추가 세액을 자진 납부합니다. 이 기한을 놓치면 세무서가 직권으로 부과·고지하며, 이 경우 무신고가산세 20%와 납부지연가산세(연 8%대, 일할 계산)가 함께 부과됩니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">추징 시 부담 구조</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    · 세액 차액: (중과세율 · 취득가액) 빼기 (기본세율 · 취득가액)
                    <br />
                    · 지방교육세 차액: 세액 차액의 10%
                    <br />
                    · 무신고가산세: 세액 차액의 20% (자진 수정신고 시 감면 가능)
                    <br />
                    · 납부지연가산세: 미납일수 · 연 8%대 (일할)
                  </p>
                </div>
                <p className="mt-4">
                  예외: 매매계약을 맺었지만 매수인의 잔금 지연 등 불가피한 사유로 소유권 이전이 지연되는 경우가 있습니다. 이때는 계약서·중도금 입금 내역 등 처분 노력을 입증할 수 있는 자료를 준비해 관할 지자체와 사전 상담을 하는 편이 안전합니다. 다만 실무상 처분기한 자체의 연장은 인정되지 않는 것이 원칙이므로, 기한 만료 전에 매수인 확보와 잔금 일정을 마무리하는 것이 최선입니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">일시적 2주택 특례 vs 다주택 중과, 실제 세액 비교</h2>
                <p>
                  다음 세 가지 사례로 특례 적용 여부에 따라 세액이 얼마나 달라지는지 살펴보겠습니다. 모두 조정대상지역 2주택자로 가정합니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 1. 신규주택 취득가액 6억원</p>
                  <p className="text-sm text-text-secondary">
                    · 기본세율 적용: 6억원 · 1% = <strong>600만원</strong>
                    <br />
                    · 다주택 중과 적용: 6억원 · 8% = <strong>4,800만원</strong>
                    <br />
                    · 취득세 본세 차액: <strong>4,200만원</strong>
                  </p>
                  <p className="text-xs text-text-tertiary">결론: 6억원 주택 하나만으로도 취득세 본세에서 4,200만원 차이. 종전주택 3년 내 처분이 곧 4천만원 이상의 절세. 지방교육세·농어촌특별세는 별도로 각 세목 기준에 따라 추가됩니다.</p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 2. 신규주택 취득가액 9억원</p>
                  <p className="text-sm text-text-secondary">
                    · 기본세율 적용: 9억원 · 3% = <strong>2,700만원</strong>
                    <br />
                    · 다주택 중과 적용: 9억원 · 8% = <strong>7,200만원</strong>
                    <br />
                    · 취득세 본세 차액: <strong>4,500만원</strong>
                  </p>
                  <p className="text-xs text-text-tertiary">결론: 9억원 주택 기준 취득세 본세만 4,500만원 격차. 6억원 초과 9억원 이하 구간은 실질 세율이 최대 3%까지 오르지만 중과와의 차이는 여전히 큼.</p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 3. 신규주택 취득가액 12억원 (조정 3주택 가정)</p>
                  <p className="text-sm text-text-secondary">
                    · 기본세율 적용(특례): 12억원 · 3% = <strong>3,600만원</strong>
                    <br />
                    · 다주택 중과 적용(3주택): 12억원 · 12% = <strong>1억 4,400만원</strong>
                    <br />
                    · 취득세 본세 차액: <strong>1억 800만원</strong>
                  </p>
                  <p className="text-xs text-text-tertiary">결론: 고가 주택일수록 특례 유지의 가치가 급격히 커짐. 취득세 본세만 1억원 이상의 절세로 직결.</p>
                </div>
                <p className="mt-4">
                  다만 위 계산은 취득세 본세만 반영한 값이며, 지방교육세와 국민주택규모(전용 85㎡) 초과 시 농어촌특별세는 각 세목의 과세 기준에 따라 별도로 부과됩니다. 처분기한 초과로 추징받는 경우에는 여기에 무신고가산세 20%와 납부지연가산세가 더해지므로 총 부담은 표시된 격차보다 더 커집니다.
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
                    <p className="mt-1 text-sm text-text-secondary">주택 가격·주택 수·지역을 입력해 취득세를 즉시 산출.</p>
                  </Link>
                  <Link
                    href="/guide/multi-house-acquisition-tax-heavy-8-12-percent-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">다주택 취득세 중과 8·12%</div>
                    <p className="mt-1 text-sm text-text-secondary">조정 2주택 8%, 3주택·비조정 4주택 이상 12% 구조 정리.</p>
                  </Link>
                  <Link
                    href="/guide/temporary-two-houses-capital-gains-exemption/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">일시적 2주택 양도세 비과세</div>
                    <p className="mt-1 text-sm text-text-secondary">양도소득세 쪽 일시적 2주택 요건과 처분기한 비교.</p>
                  </Link>
                  <Link
                    href="/guide/first-home-acquisition-tax-reduction-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">생애최초 취득세 감면 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">생애최초 주택 취득 시 감면 요건과 한도.</p>
                  </Link>
                  <Link
                    href="/guide/acquisition-tax-calculation-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">취득세 계산법 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">기본세율·구간별 세율·부가세목 계산의 기초.</p>
                  </Link>
                  <Link
                    href="/category/tax/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">모든 세금 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">양도세·취득세·재산세·종부세 모음.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 교육 목적으로 작성됐으며, 개인 맞춤형 세무 조언이 아닙니다. 실제 일시적 2주택 특례 적용 여부, 처분기한 판정, 세액 계산, 미처분 시 추징 절차는 개별 사실관계와 관할 지자체 판단에 따라 달라질 수 있습니다. 반드시 위택스(wetax.go.kr) 또는 관할 시·군·구청 세무서에서 확인하시고, 고액 거래 시에는 세무 전문가 상담을 권장합니다. 본 콘텐츠는 2026-08-03을 기준으로 작성됐으며, 지방세법 및 시행령 개정 시 즉시 업데이트됩니다. 인용 조항은 <strong>지방세법 §7(취득의 시기), §11(주택 유상거래 취득세율), §13의2(주택 유상거래 취득 중과세율), §13의3(주택 수 산정), §20(신고 및 납부), 시행령 §20(취득의 시기), §28의4(주택 수 판정), §28의5(일시적 2주택), §28의6</strong>을 따릅니다. AI 보조 작성 후 운영자 검수 완료.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터</a>,{' '}
                  <a href="https://www.wetax.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">위택스(지방세 종합정보)</a>,{' '}
                  <a href="https://etax.seoul.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">서울시 이택스</a>.
                </p>
              </section>

              <ShareButtons
                title="취득세 일시적 2주택 중과 배제 2026 가이드"
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