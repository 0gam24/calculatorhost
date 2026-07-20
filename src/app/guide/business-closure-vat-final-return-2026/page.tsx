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

const URL = 'https://calculatorhost.com/guide/business-closure-vat-final-return-2026/';
const DATE_PUBLISHED = '2026-07-21';
const DATE_MODIFIED = '2026-07-21';

export const metadata: Metadata = {
  title: '폐업 부가가치세 확정신고 2026, 폐업일 다음달 25일 신고방법',
  description:
    '개인사업자가 폐업하면 폐업일이 속한 달의 다음 달 25일까지 부가가치세 확정신고를 해야 합니다. 신고 기한, 남은 재고·비품(잔존재화) 간주공급, 폐업 절차, 미신고 가산세를 부가가치세법 §5·§49 기준으로 정리했습니다.',
  keywords: [
    '폐업 부가세 신고',
    '폐업 부가가치세 확정신고',
    '폐업일 다음달 25일',
    '폐업 신고 방법',
    '잔존재화 부가세',
    '간이과세자 폐업',
    '부가가치세법 49조',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '폐업 부가가치세 확정신고 2026' }],
    title: '폐업 부가가치세 확정신고 2026, 폐업일 다음달 25일까지',
    description:
      '폐업하면 폐업일이 속한 달의 다음 달 25일까지 부가세 확정신고. 남은 재고·비품은 잔존재화로 간주과세됩니다.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '폐업 부가가치세 확정신고 2026',
    description: '폐업일 다음 달 25일까지 부가세 확정신고. 잔존재화 간주공급·가산세 주의. 부가가치세법 §49.',
  },
};

const FAQ_ITEMS = [
  {
    question: '폐업하면 부가세 신고는 언제까지 해야 하나요?',
    answer:
      '폐업일이 속하는 달의 다음 달 25일까지 확정신고·납부를 해야 합니다(부가가치세법 §49①, §5③). 예를 들어 8월 20일에 폐업했다면 9월 25일까지 신고 대상입니다. 과세기간 개시일부터 폐업일까지의 사업 실적을 신고하며, 정규 신고기한(1월·7월)까지 기다리는 것이 아니라는 점이 핵심입니다.',
  },
  {
    question: '남은 재고와 비품도 부가세를 내야 하나요?',
    answer:
      '네, 폐업 시점에 남아 있는 재고·비품 중 매입세액을 공제받았던 재화는 "잔존재화"로 보아 자기에게 공급한 것으로 간주과세됩니다(부가가치세법 §10⑥). 재고는 시가, 감가상각 자산(비품·기계)은 취득가액에서 경과 기간만큼 차감한 금액을 과세표준으로 계산합니다. 매입세액 공제를 받지 않았던 재화는 대상이 아닙니다.',
  },
  {
    question: '사업자등록 폐업신고와 부가세 확정신고는 같은 건가요?',
    answer:
      '다른 절차입니다. 사업자등록 폐업신고는 "사업을 그만둔다"는 등록 말소 신고이고, 부가세 확정신고는 그 기간의 세금을 계산해 내는 신고입니다. 홈택스에서 폐업신고를 하면서 부가세 확정신고를 함께 처리할 수 있지만, 둘은 별개의 의무이므로 폐업신고만 하고 부가세 신고를 빠뜨리면 가산세가 발생합니다.',
  },
  {
    question: '간이과세자도 폐업하면 부가세를 신고하나요?',
    answer:
      '네, 간이과세자도 폐업일 다음 달 25일까지 확정신고 대상입니다. 다만 세액 계산 방식이 일반과세자와 달라 업종별 부가가치율을 적용하며, 연 매출 4,800만원 미만이면 납부의무가 면제될 수 있습니다. 납부의무가 면제되더라도 신고 자체는 하는 것이 안전합니다.',
  },
  {
    question: '폐업 부가세 신고를 하지 않으면 어떻게 되나요?',
    answer:
      '무신고가산세(납부세액의 20%, 부정 무신고는 40%)와 납부지연가산세(1일 0.022%)가 붙습니다. 또한 매출을 누락하면 세무서가 세금계산서·카드매출 자료로 사후 적발해 추징할 수 있습니다. 폐업했다고 신고를 미루면 오히려 세 부담이 커지므로 기한 내 신고가 유리합니다.',
  },
  {
    question: '폐업 후 종합소득세도 따로 신고하나요?',
    answer:
      '네, 부가세와 별개로 폐업한 해의 사업소득은 다음 해 5월 종합소득세 확정신고에 포함해야 합니다(소득세법 §70). 부가세 확정신고로 끝나는 것이 아니라, 1월 1일부터 폐업일까지 발생한 소득을 이듬해 5월에 다시 신고한다는 점을 기억하세요.',
  },
  {
    question: '폐업 신고는 어디서 하나요?',
    answer:
      '홈택스(hometax.go.kr)에서 온라인으로 폐업신고와 부가세 확정신고를 모두 처리할 수 있습니다. 공동인증서로 로그인 후 "신청/제출 → 폐업신고" 메뉴를 이용하거나, 관할 세무서를 방문해 폐업신고서를 제출해도 됩니다. 면허·허가 업종은 관할 지자체에도 별도 폐업신고가 필요할 수 있습니다.',
  },
];

export default function BusinessClosureVatFinalReturn2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '폐업 부가가치세 확정신고 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '폐업 부가가치세 확정신고 2026, 폐업일 다음달 25일 신고방법',
    description:
      '개인사업자가 폐업하면 폐업일이 속한 달의 다음 달 25일까지 부가세 확정신고를 해야 합니다. 잔존재화 간주공급, 간이과세자 처리, 미신고 가산세까지 완전 정리.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['폐업', '부가가치세', '확정신고', '잔존재화', '간이과세자'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '폐업 부가가치세 확정신고 2026',
    description: '폐업 시 부가세 확정신고 기한(폐업일 다음 달 25일), 잔존재화 간주공급, 가산세 정리.',
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
                    { name: '폐업 부가가치세 확정신고 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">개인사업자 · 8분 읽기 · 2026-07-21</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  폐업 부가가치세 확정신고 2026
                  <br />
                  <span className="text-2xl text-text-secondary">폐업일 다음 달 25일까지, 잔존재화 주의</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  이 가이드는 사업을 접기로 한 개인사업자를 위한 것입니다. 폐업하면 정규 신고기한(1월·7월)을 기다리는 것이 아니라 폐업일이 속한 달의 다음 달 25일까지 부가가치세 확정신고를 별도로 해야 합니다. 신고 기한과 절차, 그리고 많은 분들이 놓치는 "남은 재고·비품에 붙는 세금(잔존재화)"까지 실제 계산과 함께 정리했습니다.
                </p>
              </header>

              <AdSlot slot="guide-business-closure-vat-final-return-top" format="horizontal" />

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">폐업하면 부가세 신고는 언제까지 하나요?</h2>
                <p>
                  폐업일이 속하는 달의 다음 달 25일까지입니다. 부가가치세법 §5③은 폐업하는 경우 과세기간을 "과세기간 개시일부터 폐업일까지"로 규정하고, §49①은 그 확정신고·납부 기한을 폐업일이 속한 달의 다음 달 25일로 정하고 있습니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">기한 계산 예시</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    · 8월 20일 폐업 → 신고·납부 기한 <strong>9월 25일</strong>
                    <br />
                    · 3월 5일 폐업 → 신고·납부 기한 <strong>4월 25일</strong>
                    <br />
                    신고 대상 기간: 해당 과세기간 개시일(1월 1일 또는 7월 1일)부터 폐업일까지의 매출·매입.
                  </p>
                </div>
                <p className="mt-4">
                  다만 폐업일 자체는 실제로 사업을 그만둔 날을 기준으로 하며, 사업자등록 폐업신고서에 적은 날짜와 실제 폐업일이 다르면 세무서가 사실관계를 확인할 수 있습니다. 마지막 거래일, 임대차 종료일 등 객관적 자료와 폐업일을 일치시키는 것이 좋습니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">폐업 부가세 신고는 어떻게 하나요?</h2>
                <p>
                  홈택스 또는 관할 세무서에서 처리합니다. 절차는 다음 단계를 따릅니다.
                </p>
                <ol className="space-y-3 ml-6 list-decimal text-text-secondary">
                  <li><strong>매출·매입 자료 정리:</strong> 폐업일까지 발행·수취한 세금계산서, 카드·현금영수증 매출, 매입 증빙을 모읍니다.</li>
                  <li><strong>잔존재화 확인:</strong> 폐업 시점에 남은 재고와 비품 중 매입세액을 공제받은 것을 파악합니다(아래 §에서 계산).</li>
                  <li><strong>홈택스 신고:</strong> 홈택스 "신고/납부 → 부가가치세 → 폐업확정" 메뉴에서 과세표준과 세액을 입력합니다.</li>
                  <li><strong>폐업신고 병행:</strong> "신청/제출 → 폐업신고"로 사업자등록을 말소합니다.</li>
                  <li><strong>납부:</strong> 계산된 납부세액을 기한 내 납부합니다. 카드·계좌이체 모두 가능합니다.</li>
                </ol>
                <p className="mt-4">
                  ⚠️ 다만 면허·허가·신고 업종(음식점, 학원, 부동산중개 등)은 세무서 폐업신고와 별도로 관할 지자체·소관 기관에 폐업신고를 해야 하는 경우가 있습니다. 세무 폐업만 하면 인허가가 살아 있어 추후 과태료가 나올 수 있으므로 소관 기관에 확인하세요.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">남은 재고·비품도 부가세를 내야 하나요?</h2>
                <p>
                  네, 폐업 시 남은 재화 중 매입세액을 공제받았던 것은 "잔존재화"로 보아 자기에게 공급한 것으로 간주과세됩니다(부가가치세법 §10⑥). 사업용으로 공제받은 세액을 사업을 접으면서 개인이 그대로 소비하게 되므로, 그만큼 부가세를 정산하는 취지입니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 잔존재화 유형별 과세표준 산정 (부가가치세법 §10⑥, 시행령 §63)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">재화 유형</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">과세표준</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">비고</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">재고자산(상품·원재료)</td>
                        <td className="p-3"><strong>시가</strong></td>
                        <td className="p-3">폐업일 현재 시가 기준</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">건물·구축물(감가상각)</td>
                        <td className="p-3"><strong>취득가액 × (1 − 5%×경과과세기간)</strong></td>
                        <td className="p-3">과세기간 단위 차감, 최대 20기</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">기계·비품 등 기타 감가자산</td>
                        <td className="p-3"><strong>취득가액 × (1 − 25%×경과과세기간)</strong></td>
                        <td className="p-3">과세기간 단위 차감, 최대 4기</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">매입세액 미공제 재화</td>
                        <td className="p-3"><strong>과세 제외</strong></td>
                        <td className="p-3">공제받지 않았으면 대상 아님</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  ⚠️ 다만 경과 과세기간은 6개월 단위(1과세기간=6개월)로 세며, 감가율은 자산 종류에 따라 다릅니다. 정확한 경과 기간·시가 판단은 사례마다 달라지므로, 자산 규모가 크면 세무대리인의 검토를 받는 것이 안전합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">폐업 부가세 실제 계산 사례</h2>
                <p>
                  잔존재화가 포함된 폐업 신고 세액을 두 가지 사례로 계산해 보겠습니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 1. 소매점 폐업 (재고 잔존)</p>
                  <p className="text-sm text-text-secondary">
                    · 과세기간 개시일부터 폐업일까지 매출 부가세: 300만원
                    <br />
                    · 같은 기간 매입세액: 180만원
                    <br />
                    · 폐업 시 남은 재고 시가: 2,000만원 → 잔존재화 부가세 = 2,000만 × 10% = 200만원
                    <br />
                    · 납부세액 = (매출세액 300만 + 잔존재화 200만) − 매입세액 180만 = <strong>320만원</strong>
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 남은 재고 200만원이 추가되어 예상보다 세액이 커집니다.</span>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 2. 매입세액 공제 안 받은 비품만 남은 경우</p>
                  <p className="text-sm text-text-secondary">
                    · 매출 부가세: 150만원 / 매입세액: 90만원
                    <br />
                    · 남은 비품은 간이영수증으로 매입세액 공제를 받지 않음 → 잔존재화 과세 제외
                    <br />
                    · 납부세액 = 150만 − 90만 = <strong>60만원</strong>
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 공제받지 않은 재화는 잔존재화 대상이 아니므로 추가 세액이 없습니다.</span>
                  </p>
                </div>
              </section>

              <AdSlot slot="guide-business-closure-vat-final-return-mid" format="rectangle" />

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">간이과세자와 일반과세자, 폐업신고가 다른가요?</h2>
                <p>
                  둘 다 폐업일 다음 달 25일까지 신고하지만 세액 계산 방식이 다릅니다. 아래 표로 차이를 비교했습니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 2. 일반과세자 vs 간이과세자 폐업 부가세 신고 비교</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">구분</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">일반과세자</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">간이과세자</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">세액 계산</td>
                        <td className="p-3">매출세액 − 매입세액</td>
                        <td className="p-3">매출액 × 업종별 부가가치율 × 10%</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">잔존재화 과세</td>
                        <td className="p-3">시가·감가 기준 간주공급</td>
                        <td className="p-3">부가가치율 적용해 계산</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">납부의무 면제</td>
                        <td className="p-3">없음</td>
                        <td className="p-3">연 환산 매출 4,800만원 미만 시 면제</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">환급</td>
                        <td className="p-3">가능(매입 &gt; 매출 시)</td>
                        <td className="p-3">원칙적으로 환급 없음</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  ⚠️ 다만 간이과세자도 납부의무가 면제될 뿐, 신고의무까지 없어지는 것은 아닙니다. 무신고 상태로 두면 나중에 자료상 매출이 확인될 때 곤란해질 수 있으므로, 면제 대상이라도 신고서는 제출하는 편이 안전합니다.
                </p>
              </section>

              <section className="space-y-6 border-t border-border-base pt-8">
                <h2 className="text-2xl font-bold">폐업 부가세 신고를 안 하면 어떻게 되나요?</h2>
                <p>
                  가산세가 더해집니다. 무신고가산세는 납부세액의 20%(부정행위는 40%), 납부지연가산세는 미납액에 대해 하루 0.022%(연 약 8%)가 부과됩니다. 매출 누락은 세금계산서 합계표·카드 매출 자료로 사후 확인되므로 숨기기 어렵습니다.
                </p>
                <p className="mt-4">
                  반대로 기한 내에 성실하게 신고하면 가산세 없이 정확한 세액만 부담하고 사업을 정리할 수 있습니다. 폐업은 "신고할 것이 없다"가 아니라 "마지막으로 한 번 더 신고한다"로 접근하는 것이 정확합니다.
                </p>
              </section>

              <h2 className="text-2xl font-bold mb-6">자주 묻는 질문</h2>
              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h3 className="text-lg font-semibold text-text-primary">관련 계산기 및 가이드</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link
                    href="/calculator/vat/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">부가가치세 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">매출·매입세액으로 납부세액을 계산해보세요.</p>
                  </Link>
                  <Link
                    href="/guide/simplified-taxation-vat-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">간이과세 vs 일반과세</div>
                    <p className="mt-1 text-sm text-text-secondary">두 과세유형의 세액 계산과 전환 기준.</p>
                  </Link>
                  <Link
                    href="/guide/vat-early-refund-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">부가세 조기환급</div>
                    <p className="mt-1 text-sm text-text-secondary">매입이 매출보다 클 때 환급받는 방법.</p>
                  </Link>
                  <Link
                    href="/guide/business-use-account-registration-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">사업용 계좌 신고</div>
                    <p className="mt-1 text-sm text-text-secondary">복식부기 대상 사업자의 계좌 신고 의무.</p>
                  </Link>
                  <Link
                    href="/guide/freelancer-take-home-3-3-percent-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">프리랜서 3.3% 원천징수</div>
                    <p className="mt-1 text-sm text-text-secondary">폐업 후 프리랜서 전환 시 세금 처리.</p>
                  </Link>
                  <Link
                    href="/category/tax/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">모든 세금 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">부가세·종소세·양도세 계산기 모음.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 교육 목적으로 작성되었으며, 개인 맞춤형 세무 조언이 아닙니다. 실제 폐업일 판정, 잔존재화 시가·경과기간 산정, 간이과세자 세액 계산은 사업 상황에 따라 달라지므로 홈택스 또는 세무대리인·관할 세무서에서 반드시 확인하세요. 본 콘텐츠는 2026-07-21 기준이며 관련 법령 개정 시 업데이트됩니다. 근거 법조항은 <strong>부가가치세법 §5(과세기간)·§10(재화 공급의 특례)·§49(확정신고와 납부)·§67(폐업 시 신고)</strong> 및 소득세법 §70입니다. AI 보조 작성 후 운영자 검수 완료.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터</a>,{' '}
                  <a href="https://www.nts.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">국세청</a>,{' '}
                  <a href="https://www.hometax.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">홈택스</a>.
                </p>
              </section>

              <ShareButtons
                title="폐업 부가가치세 확정신고 2026 가이드"
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
