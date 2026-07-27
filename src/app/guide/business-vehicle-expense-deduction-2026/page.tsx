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

const URL = 'https://calculatorhost.com/guide/business-vehicle-expense-deduction-2026/';
const DATE_PUBLISHED = '2026-07-28';
const DATE_MODIFIED = '2026-07-28';

export const metadata: Metadata = {
  title: '업무용 승용차 비용처리 2026, 감가상각 800만원 한도와 운행기록부',
  description:
    '개인사업자의 업무용 승용차 비용은 감가상각비 연 800만원 한도로 필요경비에 넣고, 운행기록부를 안 쓰면 관련비용 전체가 연 1,500만원으로 제한됩니다. 소득세법 제33조의2 기준으로 한도·운행기록부·업무사용비율을 정리했습니다.',
  keywords: [
    '업무용 승용차 비용처리',
    '차량 감가상각 800만원',
    '운행기록부',
    '업무용승용차 1500만원 한도',
    '업무사용비율',
    '소득세법 33조의2',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '업무용 승용차 비용처리 2026, 감가상각 800만원 한도와 운행기록부' }],
    title: '업무용 승용차 비용처리 2026, 감가상각 800만원 한도와 운행기록부',
    description: '복식부기의무자의 승용차 감가상각비는 연 800만원 한도, 운행기록부 미작성 시 관련비용은 연 1,500만원까지만 인정. 소득세법 §33의2 기준 정리.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '업무용 승용차 비용처리 2026, 800만원 한도와 운행기록부',
    description: '복식부기의무자 대상 승용차 감가상각 연 800만원, 운행기록부 미작성 시 연 1,500만원 한도. 소득세법 §33의2.',
  },
};

const FAQ_ITEMS = [
  {
    question: '업무용 승용차 비용처리는 누구에게 적용되나요?',
    answer:
      '소득세법 §33의2에 따라 복식부기의무자인 개인사업자에게 적용됩니다. 성실신고확인대상자도 포함되며, 반대로 간편장부대상 소규모 사업자는 이 규정의 일부 제한을 받지 않는 경우가 있습니다. 대상 차량은 개별소비세가 부과되는 승용차로, 경차·화물차·9인승 이상 승합차는 규정 밖입니다. 법인은 법인세법 §27의2에 같은 취지 규정이 있습니다.',
  },
  {
    question: '감가상각비 800만원 한도는 왜 있나요?',
    answer:
      '고가 승용차를 사업용으로 가장해 세금을 줄이는 것을 막기 위한 장치입니다(소득세법 §33의2 ②). 복식부기의무자는 승용차 감가상각을 정액법·내용연수 5년으로 강제 계산하고, 업무사용분 감가상각비가 연 800만원을 넘으면 초과분은 그 해 필요경비에 넣지 못합니다. 초과분은 다음 해 이후로 이월해 순차적으로 처리합니다.',
  },
  {
    question: '운행기록부에는 어떤 내용을 적어야 하나요?',
    answer:
      '국세청 서식 기준으로 사용일자, 사용자, 주행 전·후 계기판 거리, 업무용 주행거리, 방문지·업무 목적 등을 기록해야 합니다(소득세법 시행령 §78의3). 매일 운행 즉시 기록하는 것이 원칙이며, 세무조사 시 증빙자료로 요구되므로 최소 5년간 보관해야 합니다. 엑셀·업무용 앱·전자 운행기록장치 어느 형식이든 항목만 충족하면 인정됩니다.',
  },
  {
    question: '운행기록부를 안 쓰면 세금이 얼마나 늘어나나요?',
    answer:
      '차량 관련비용이 연 1,500만원을 넘으면 초과분은 필요경비에서 부인됩니다. 예를 들어 연간 관련비용이 2,000만원인데 운행기록부가 없으면 1,500만원만 인정되고 500만원이 부인되어, 소득세율 24% 구간이라면 약 120만원의 세부담이 추가로 생깁니다. 부인된 금액은 사용자(불분명 시 대표자) 상여로 처분되어 근로소득세도 함께 붙습니다.',
  },
  {
    question: '리스나 렌트로 이용하는 차량도 800만원 한도가 적용되나요?',
    answer:
      '네, 리스료·렌트료 중 감가상각비 상당액에 대해서도 연 800만원 한도가 그대로 적용됩니다(소득세법 시행령 §78의3). 국세청 고시에 따라 리스료의 일정 비율(운용리스는 원칙적으로 리스료의 약 70%, 금융리스는 원가상각 계산액)이 감가상각비 상당액으로 계산되며, 초과분은 이월됩니다. 리스라도 우회로 고가 차량 비용을 몰아 넣을 수 없다는 뜻입니다.',
  },
  {
    question: '업무전용자동차보험은 꼭 들어야 하나요?',
    answer:
      '법인과 성실신고확인대상자 등 일부 개인사업자는 임직원 전용 자동차보험 가입이 사실상 요구되며, 미가입 시 업무사용 인정 비율이 축소될 수 있습니다. 일반 복식부기의무자는 원칙적으로 강제 대상이 아니지만, 가입해두면 업무 사용을 입증하는 자료가 되어 세무조사에서 유리합니다. 정확한 적용 범위는 최신 개정 내용을 관할 세무서 또는 세무대리인에게 확인하는 것이 안전합니다.',
  },
  {
    question: '처분손실 800만원 한도는 무슨 뜻인가요?',
    answer:
      '업무용 승용차를 팔아 손실이 나도 그 손실은 연 800만원까지만 필요경비로 인정됩니다(소득세법 §33의2 ⑤). 예를 들어 처분손실이 2,500만원이면 첫 해에 800만원만 반영하고, 나머지 1,700만원은 다음 해 이후로 이월해 매년 800만원씩 나눠 처리해야 합니다. 폐업하면 이월된 잔액을 폐업일이 속한 과세기간에 한꺼번에 반영합니다.',
  },
  {
    question: '개인사업자와 법인의 차이는 무엇인가요?',
    answer:
      '근거 법 조항이 다릅니다. 개인은 소득세법 §33의2, 법인은 법인세법 §27의2가 적용되며 800만원·1,500만원 한도 자체는 동일합니다. 다만 법인은 원칙적으로 임직원 전용 자동차보험 가입이 필요하고, 업무 미사용 부인액이 대표이사 등 사용자 상여로 처리되어 근로소득세가 부과된다는 점에서 개인보다 관리 요건이 엄격합니다.',
  },
];

export default function BusinessVehicleExpenseDeduction2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '업무용 승용차 비용처리 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '업무용 승용차 비용처리 2026, 감가상각 800만원 한도와 운행기록부',
    description:
      '복식부기의무자인 개인사업자가 업무용 승용차 비용을 필요경비로 처리하는 규칙. 감가상각 연 800만원 한도, 운행기록부 미작성 시 연 1,500만원 한도, 리스·렌트 준용, 개인 vs 법인 비교까지 정리.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['업무용 승용차', '차량 감가상각', '운행기록부', '1,500만원 한도', '업무사용비율', '소득세법 33조의2'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '업무용 승용차 비용처리 2026',
    description:
      '복식부기의무자의 업무용 승용차 비용처리 규칙. 800만원 감가상각 한도, 1,500만원 운행기록부 미작성 한도, 업무사용비율까지.',
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
                    { name: '업무용 승용차 비용처리 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">개인사업자 · 8분 읽기 · 2026-07-28</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  업무용 승용차 비용처리 2026
                  <br />
                  <span className="text-2xl text-text-secondary">, 800만원 한도와 운행기록부</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  사업에 쓰는 승용차 비용은 얼마까지 필요경비로 인정될까요. 개인사업자가 복식부기의무자라면 소득세법 §33의2가 적용되어, 감가상각비는 연 800만원까지만 그 해 비용으로 반영되고 운행기록부를 안 쓰면 관련비용 전체가 연 1,500만원 안으로 묶입니다. 이 가이드는 대상 사업자·대상 비용부터 감가상각 한도, 운행기록부 유무별 처리, 리스·렌트 준용, 개인과 법인의 차이까지 실제 계산 사례와 함께 정리합니다.
                </p>
              </header>

              <div className="bg-bg-card p-4 rounded-lg border border-border-base" data-speakable>
                <p className="font-semibold text-text-primary">30초 요약</p>
                <p className="mt-2 text-sm text-text-secondary">
                  정의: 업무용 승용차 관련비용(감가상각비, 리스료, 유류비, 보험료, 수선비, 자동차세 등)을 필요경비에 넣을 때 적용되는 한도 규정입니다(소득세법 §33의2, 시행령 §78의3).
                </p>
                <div className="mt-3 overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 A. 업무용 승용차 3대 한도 요약 (소득세법 §33의2, 2026)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-2 font-semibold bg-bg-raised">항목</th>
                        <th scope="col" className="text-left p-2 font-semibold bg-bg-raised">한도</th>
                        <th scope="col" className="text-left p-2 font-semibold bg-bg-raised">초과 시 처리</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-2">업무사용 감가상각비</td>
                        <td className="p-2"><strong>연 800만원</strong></td>
                        <td className="p-2">다음 해로 이월</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-2">운행기록부 미작성 관련비용</td>
                        <td className="p-2"><strong>연 1,500만원</strong></td>
                        <td className="p-2">부인, 사용자 상여 처분</td>
                      </tr>
                      <tr>
                        <td className="p-2">처분손실</td>
                        <td className="p-2"><strong>연 800만원</strong></td>
                        <td className="p-2">다음 해로 이월</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <ul className="mt-3 text-sm text-text-secondary space-y-1 list-disc ml-5">
                  <li>대상: 복식부기의무자, 성실신고확인대상자, 개별소비세 부과 승용차</li>
                  <li>감가상각은 정액법·내용연수 5년 강제</li>
                  <li>운행기록부 있으면 관련비용 × 업무사용비율만 인정</li>
                </ul>
              </div>

              <AdSlot slot="guide-business-vehicle-expense-deduction-top" format="horizontal" />

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">업무용 승용차 비용처리란 무엇인가요?</h2>
                <p>
                  결론부터 말하면 사업용으로 쓰는 승용차 관련비용을 필요경비에 넣을 때 적용되는 한도 규정입니다. 소득세법 §33의2와 시행령 §78의3은 감가상각비, 임차료(리스·렌트), 유류비, 보험료, 수선비, 자동차세, 통행료, 금융리스 이자 등 차량 취득·유지에 드는 모든 비용을 하나로 묶어 관련비용이라 부르고, 대상 사업자에게 일정한 한도를 씌웁니다.
                </p>
                <p>
                  적용 대상은 복식부기의무자인 개인사업자입니다. 직전 과세기간 수입금액이 업종별 기준을 넘으면 자동으로 복식부기의무자가 되며, 성실신고확인대상자도 포함됩니다. 반대로 간편장부대상 소규모 사업자는 이 규정의 일부 제한을 받지 않는 경우가 있습니다. 차량 기준으로는 개별소비세가 부과되는 승용차만 대상이고, 경차·화물차·9인승 이상 승합차는 규정 밖입니다.
                </p>
                <p className="text-sm text-text-secondary">
                  다만 개인사업자 규정은 소득세법 §33의2, 법인 규정은 법인세법 §27의2로 조문이 다릅니다. 한도 자체는 동일하지만 운영 요건에 차이가 있으므로 법인 차량을 다루는 경우 §27의2를 함께 확인해야 합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">감가상각비는 얼마까지 인정되나요?</h2>
                <p>
                  업무사용분 감가상각비는 연 800만원까지만 필요경비로 인정됩니다(소득세법 §33의2 ②). 복식부기의무자는 승용차를 정률법이 아닌 정액법·내용연수 5년으로 강제 계산해야 하며, 이 기준으로 산출한 감가상각비 중 업무사용비율을 곱한 금액이 연 800만원을 넘으면 초과분은 그 해 필요경비에서 부인됩니다. 부인된 금액은 사라지지 않고 다음 해 이후로 이월되어 매년 800만원 한도 안에서 순차적으로 반영됩니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">사례 1. 감가상각비 1,000만원 계상, 업무사용비율 100%</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    차량 취득가 5,000만원, 정액법 5년 → 연 감가상각비 = 5,000만원 ÷ 5년 = 1,000만원
                    <br />
                    업무사용비율 100% → 업무사용 감가상각비 = 1,000만원 × 100% = 1,000만원
                    <br />
                    한도 800만원 → 그 해 인정 감가상각비 = <strong>800만원</strong>
                    <br />
                    이월 감가상각비 = 1,000만원 - 800만원 = <strong>200만원</strong> (다음 해로 이월)
                  </p>
                </div>
                <p className="text-sm text-text-secondary">
                  예외: 업무사용비율이 낮으면 800만원 한도에 걸리지 않는 경우가 많습니다. 위 사례에서 업무사용비율이 60%라면 업무사용 감가상각비는 600만원으로 이미 한도 이내이므로 별도 이월 없이 전액 반영됩니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">운행기록부를 꼭 써야 하나요?</h2>
                <p>
                  관련비용이 연 1,500만원을 넘을 것 같으면 사실상 필수입니다. 소득세법 시행령 §78의3은 운행기록부를 작성한 경우에만 관련비용 × 업무사용비율 전액을 인정한다고 규정합니다. 업무사용비율은 업무용 주행거리 ÷ 총주행거리로 계산하며, 매일 사용일자·주행 전후 계기판 거리·업무 목적을 기록해 최소 5년간 보관해야 합니다. 엑셀, 업무용 앱, 전자 운행기록장치 등 형식은 자유입니다.
                </p>
                <p>
                  운행기록부가 있으면 업무사용비율만큼은 800만원 감가상각 한도만 제외하고 모두 필요경비로 인정됩니다. 유류비 300만원, 자동차세 50만원, 보험료 120만원 등이 실제 지출액대로 반영된다는 뜻입니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">사례 2. 관련비용 2,000만원, 운행기록부 작성, 업무사용비율 80%</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    관련비용 총액: 2,000만원 (감가상각 1,000만 + 유류·보험·자동차세 등 1,000만)
                    <br />
                    업무사용 관련비용 = 2,000만원 × 80% = <strong>1,600만원</strong>
                    <br />
                    이 중 감가상각비 상당액 = 1,000만원 × 80% = 800만원 (한도 이내, 전액 반영)
                    <br />
                    그 해 필요경비 인정액 = <strong>1,600만원</strong>, 업무 외 400만원은 부인
                  </p>
                </div>
                <p className="text-sm text-text-secondary">
                  다만 운행기록부에 빠진 날이 많거나 계기판 거리·목적란이 비어 있으면 세무조사 시 인정을 못 받을 수 있습니다. 형식만 갖추지 말고 실제 매일 기록하는 것이 원칙입니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">운행기록부를 안 쓰면 어떻게 되나요?</h2>
                <p>
                  관련비용이 연 1,500만원 안이면 운행기록부가 없어도 전액 업무용으로 인정됩니다. 소득세법 시행령 §78의3은 소액 차량 사용까지 매일 운행기록부를 강제하는 것이 과도하다는 판단으로, 1,500만원까지의 관련비용은 별도 입증 없이 필요경비 처리를 허용합니다. 다만 이 경우에도 감가상각비 상당액에 대한 연 800만원 한도는 여전히 적용됩니다.
                </p>
                <p>
                  문제는 관련비용이 1,500만원을 넘을 때입니다. 이 경우 인정한도는 1,500만원까지로 제한되고, 초과분은 필요경비에서 부인되어 사업소득이 그만큼 늘어납니다. 부인된 금액은 사용자(불분명하면 대표자) 상여로 처분되어 근로소득세도 함께 부과되므로 이중 부담이 됩니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">사례 3. 관련비용 2,000만원, 운행기록부 미작성</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    관련비용 총액: 2,000만원
                    <br />
                    운행기록부 없음 → 인정 한도 = 1,500만원 (감가상각비 상당액 800만원 한도는 별도 확인)
                    <br />
                    그 해 필요경비 인정액 = <strong>1,500만원</strong>
                    <br />
                    부인액 = 2,000만원 - 1,500만원 = <strong>500만원</strong> (사용자 상여 처분)
                    <br />
                    소득세율 24% 구간 가정 시 추가 세부담 = 500만원 × 24% = <strong>약 120만원</strong> (근로소득세 별도)
                  </p>
                </div>
                <p className="text-sm text-text-secondary">
                  예외: 1대만 사용하는 소규모 사업자로서 관련비용이 1,500만원 이하로 확실히 유지된다면 운행기록부 부담을 지지 않아도 됩니다. 그러나 유가·보험료 상승으로 초과 우려가 있다면 처음부터 운행기록부를 쓰는 편이 안전합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">감가상각 800만원 초과분은 어떻게 되나요?</h2>
                <p>
                  초과분은 사라지지 않고 다음 해 이후로 이월되어 매년 800만원 한도 안에서 순차적으로 필요경비에 반영됩니다. 소득세법 §33의2 ④는 감가상각비 한도 초과액과 이월액을 명시적으로 규정하고 있습니다. 이월 감가상각비는 그 해 차량 사용 여부와 무관하게 이월 잔액이 있으면 매년 자동으로 800만원 한도까지 처리됩니다.
                </p>
                <p>
                  처분손실도 같은 방식입니다. 업무용 승용차를 팔아 손실이 나면 그 손실 역시 연 800만원까지만 필요경비로 인정되며, 초과분은 다음 해 이후로 이월됩니다(소득세법 §33의2 ⑤). 다만 폐업 시에는 이월된 잔액을 폐업일이 속한 과세기간에 한꺼번에 반영해 정리합니다.
                </p>
                <p className="text-sm text-text-secondary">
                  다만 이월 규정이 있다고 해서 고가 차량 취득이 유리한 것은 아닙니다. 5,000만원 차량이든 1억원 차량이든 그 해 감가상각 인정액은 800만원으로 같기 때문에, 실제 절세 효과가 그만큼 지연·분산될 뿐입니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">리스나 렌트도 똑같이 적용되나요?</h2>
                <p>
                  네, 리스료·렌트료 중 감가상각비 상당액에 대해서도 연 800만원 한도가 적용됩니다(소득세법 시행령 §78의3). 국세청 고시는 운용리스의 경우 리스료 중 일정 비율(원칙적으로 리스료의 약 70% 수준)을 감가상각비 상당액으로 계산하고, 금융리스는 원가상각 기준으로 감가상각비 상당액을 산정하도록 정하고 있습니다.
                </p>
                <p>
                  이 감가상각비 상당액이 연 800만원을 넘으면 초과분은 그 해 필요경비에서 제외되고 다음 해 이후로 이월됩니다. 리스료 총액 자체가 그대로 비용이 되지 않는다는 점이 중요합니다. 리스라도 우회로 고가 차량 비용을 몰아 넣을 수 없도록 설계된 규정입니다.
                </p>
                <p className="text-sm text-text-secondary">
                  예외: 리스료 중 감가상각비 상당액을 제외한 이자·부대비용은 800만원 한도와 별개로 관련비용에 포함되며, 운행기록부 유무에 따른 1,500만원 한도의 적용을 받습니다. 따라서 리스 계약서에서 이자·감가상각비 상당액이 구분되어 있는지 확인해두는 것이 좋습니다.
                </p>
              </section>

              <AdSlot slot="guide-business-vehicle-expense-deduction-mid" format="rectangle" />

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">개인사업자와 법인의 차이는 무엇인가요?</h2>
                <p>
                  적용되는 법 조항이 다르고 운영 요건에 차이가 있습니다. 개인은 소득세법 §33의2, 법인은 법인세법 §27의2를 근거로 하며 800만원·1,500만원 한도 숫자는 동일합니다. 다만 법인은 원칙적으로 임직원 전용 자동차보험 가입이 요구되고, 미가입 시 업무사용 인정 비율이 축소되거나 관련비용 전액이 부인될 수 있어 관리 요건이 더 엄격합니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 B. 개인사업자(§33의2) vs 법인(§27의2) 비교</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">구분</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">개인사업자</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">법인</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">근거 조항</td>
                        <td className="p-3">소득세법 §33의2</td>
                        <td className="p-3">법인세법 §27의2</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">대상</td>
                        <td className="p-3">복식부기의무자, 성실신고확인대상자</td>
                        <td className="p-3">모든 법인</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">감가상각 한도</td>
                        <td className="p-3">연 800만원 (초과분 이월)</td>
                        <td className="p-3">연 800만원 (초과분 이월)</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">운행기록부 미작성 시 한도</td>
                        <td className="p-3">연 1,500만원</td>
                        <td className="p-3">연 1,500만원</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">업무전용자동차보험</td>
                        <td className="p-3">성실신고확인대상자 등 일부 의무</td>
                        <td className="p-3">원칙적 의무 (미가입 시 인정률 축소)</td>
                      </tr>
                      <tr>
                        <td className="p-3">부인액 처리</td>
                        <td className="p-3">사업소득에 가산, 사용자 상여 처분</td>
                        <td className="p-3">손금 부인, 대표자 등 상여 처분</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-sm text-text-secondary">
                  다만 법인의 업무전용자동차보험 가입 여부 판정과 성실신고확인대상 개인의 요건은 최신 개정 내용에 따라 세부 기준이 바뀔 수 있습니다. 자기 차량을 어느 규정으로 처리해야 할지 헷갈리면 관할 세무서 또는 세무대리인에게 반드시 확인하는 것이 안전합니다.
                </p>
              </section>

              <h2 className="text-2xl font-bold mb-6">자주 묻는 질문</h2>
              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h3 className="text-lg font-semibold text-text-primary">관련 계산기 및 가이드</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link
                    href="/guide/bookkeeping-obligation-double-entry-vs-simple-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">복식부기 vs 간편장부 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">본 규정 적용 대상인 복식부기의무자 판정 기준을 확인하세요.</p>
                  </Link>
                  <Link
                    href="/guide/freelancer-simplified-vs-standard-expense-rate-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">단순경비율 vs 기준경비율 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">추계신고 시 경비율 선택 규칙과 유불리 비교.</p>
                  </Link>
                  <Link
                    href="/guide/business-use-account-registration-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">사업용 계좌 등록 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">복식부기의무자의 사업용 계좌 신고 의무와 가산세.</p>
                  </Link>
                  <Link
                    href="/guide/vehicle-tax-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">자동차세 계산 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">배기량 기준 세율과 차령경감, 연납 할인율까지.</p>
                  </Link>
                  <Link
                    href="/calculator/freelancer-tax/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">프리랜서 종합소득세 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">경비율·소득공제 반영해 예상 세액을 즉시 계산.</p>
                  </Link>
                  <Link
                    href="/category/tax/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">모든 세금 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">양도세·취득세·재산세·상속세 모음.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 교육 목적으로 작성되었으며, 개인 맞춤형 세무 조언이 아닙니다. 실제 감가상각 한도, 운행기록부 인정 여부, 업무사용비율 산정, 부인액 처분 방식은 사업자 유형과 차량 사용 형태, 최신 시행령 개정 내용에 따라 달라지므로 관할 세무서, 홈택스 또는 세무대리인의 확인을 받으시기 바랍니다. 본 콘텐츠는 2026-07-28을 기준으로 작성되었으며, 세법 개정 시 업데이트됩니다. 주요 근거 조항은 <strong>소득세법 §33의2</strong>, <strong>소득세법 시행령 §78의3</strong>, <strong>법인세법 §27의2</strong>입니다. AI 보조 작성 후 운영자 검수 완료.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터</a>,{' '}
                  <a href="https://www.nts.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">국세청</a>,{' '}
                  <a href="https://www.hometax.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">홈택스</a>.
                </p>
              </section>

              <ShareButtons
                title="업무용 승용차 비용처리 2026 가이드"
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
