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

const URL = 'https://calculatorhost.com/guide/capital-gains-acquisition-timing-2026/';
const DATE_PUBLISHED = '2026-08-03';
const DATE_MODIFIED = '2026-08-03';

export const metadata: Metadata = {
  title: '양도세 취득·양도 시기 2026 | 잔금일·등기일·계약일 기준',
  description:
    '2026년 양도소득세 취득·양도 시기 판정 기준. 원칙은 대금청산일(잔금일)이며 잔금 전 등기하면 등기접수일, 상속은 사망일, 증여는 등기접수일. 소득세법 §98과 시행령 §162 기준으로 정리했습니다.',
  keywords: [
    '양도세 취득시기',
    '양도세 취득시기 잔금일',
    '보유기간 언제부터',
    '양도일 등기일 잔금일',
    '1세대1주택 2년 기산일',
    '장기보유특별공제 기산',
    '양도세 계약일',
    '소득세법 98조',
    '소득세법 시행령 162조',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '양도세 취득·양도 시기 2026, 잔금일·등기일·계약일 기준' }],
    title: '양도세 취득·양도 시기 2026, 잔금일·등기일·계약일 기준',
    description: '원칙은 잔금일, 잔금 전 등기했다면 등기접수일. 상속·증여·자가신축·분양의 시기 판정을 소득세법 §98·시행령 §162로 정리했습니다.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '양도세 취득·양도 시기 2026, 잔금일·등기일·계약일 기준',
    description: '보유기간·1세대1주택 2년·장특공 판정의 기산일이 되는 취득시기. 소득세법 §98·시행령 §162.',
  },
};

const FAQ_ITEMS = [
  {
    question: '잔금일과 등기일이 다르면 어느 날이 양도시기인가요?',
    answer:
      '원칙은 잔금일(대금청산일)입니다. 소득세법 §98과 시행령 §162는 매매의 경우 대금을 청산한 날을 양도·취득 시기로 봅니다. 다만 잔금 청산 전에 소유권이전등기를 먼저 접수했다면 등기접수일이 시기가 됩니다. 두 날짜가 다를 때는 계약서상 잔금 지급일과 등기부 접수일을 모두 확인해야 정확한 판정이 가능합니다.',
  },
  {
    question: '계약일부터 보유기간을 세면 안 되나요?',
    answer:
      '계약일은 원칙적으로 시기 판정 기준이 아닙니다. 잔금이 청산되어야 취득이 성립하므로, 계약금·중도금을 냈더라도 잔금 청산 전에는 양도세 계산상 취득이 인정되지 않습니다. 다만 1세대1주택 비과세 판정에서 매매특약으로 양도일 이전 주택을 멸실한 특수사안 등 예외적 취급이 있으므로, 판단이 헷갈리면 국세청 상담을 받으세요.',
  },
  {
    question: '상속받은 주택의 취득시기는 언제인가요?',
    answer:
      '상속개시일, 즉 피상속인이 사망한 날입니다. 등기 신청이 뒤늦게 이뤄져도 취득시기는 사망일 기준으로 봅니다. 따라서 상속받은 주택을 언제 매도하더라도 보유기간은 사망일부터 계산하며, 1세대1주택 2년 보유·거주 요건 판정도 같은 날짜부터 셉니다.',
  },
  {
    question: '증여받은 주택의 취득시기는 어떻게 되나요?',
    answer:
      '증여받은 날, 곧 증여 등기접수일이 취득시기입니다. 상속(사망일)과 달리 증여는 등기접수 시점이 기산일이므로 등기부의 접수일자를 반드시 확인해야 합니다. 부담부증여로 채무를 함께 인수했다면 채무액 상당은 유상 취득, 나머지는 무상 취득으로 나누어 각각 시기를 판정합니다.',
  },
  {
    question: '분양권으로 받은 신축주택은 언제가 취득시기인가요?',
    answer:
      '원칙은 잔금청산일입니다. 분양대금을 완납한 날이 취득시기가 되며, 사용승인일이나 입주일과 반드시 일치하지 않습니다. 다만 사용승인 전에 잔금을 청산한 경우 사용승인일(또는 임시사용승인일·사실상 사용일 중 빠른 날)이 시기가 될 수 있어 개별 판정이 필요합니다. 계약금·중도금 납부시점은 시기가 아닙니다.',
  },
  {
    question: '보유기간 하루 차이로 세율이 달라진다는 게 사실인가요?',
    answer:
      '사실입니다. 소득세법상 1년 미만 단기양도는 세율 70%, 1년 이상 2년 미만은 60%가 적용되고, 2년 이상 보유 시 일반 누진세율로 전환됩니다. 취득시기부터 양도시기까지 하루라도 부족하면 상위 구간 세율이 적용되므로, 잔금일·등기일 판단이 수백만원에서 수천만원의 세액 차이로 이어질 수 있습니다.',
  },
  {
    question: '취득세와 양도세의 취득시기가 다른가요?',
    answer:
      '세목마다 규정이 다릅니다. 양도세는 소득세법 §98·시행령 §162에 따라 잔금일이 원칙이지만, 취득세는 지방세법에 별도 취득시기 규정이 있어 판정 기준이 다를 수 있습니다. 취득세 신고 시 기산일과 양도세 계산 시 기산일이 일치하지 않을 수 있으니 세목별로 각각 확인이 필요합니다.',
  },
  {
    question: '자기가 지은 주택은 언제부터 보유기간을 계산하나요?',
    answer:
      '사용승인서 교부일이 원칙입니다. 소득세법 시행령 §162에 따라 자기가 건설한 건축물의 취득시기는 사용승인서 교부일이며, 사용승인 전에 사실상 사용하거나 임시사용승인을 받은 경우 그 날이 시기가 됩니다. 무허가 건축물은 사실상 사용일을 취득시기로 봅니다.',
  },
];

export default function CapitalGainsAcquisitionTiming2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '양도세 취득·양도 시기 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '양도세 취득·양도 시기 2026, 잔금일·등기일·계약일 기준',
    description:
      '양도소득세 계산의 출발점인 취득·양도 시기. 원칙은 잔금일이며 잔금 전 등기 시 등기접수일, 상속은 사망일, 증여는 등기접수일이 됩니다. 소득세법 §98·시행령 §162 기준.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['양도세', '취득시기', '잔금일', '등기접수일', '보유기간', '1세대1주택 2년', '장기보유특별공제'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '양도세 취득·양도 시기 2026',
    description:
      '양도소득세 취득·양도 시기 판정 기준. 잔금일이 원칙, 잔금 전 등기 시 등기접수일. 상속·증여·자가신축·분양 상황별 정리.',
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
                    { name: '양도세 취득·양도 시기 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">주택 보유자·투자자 · 9분 읽기 · 2026-08-03</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  양도세 취득·양도 시기 2026
                  <br />
                  <span className="text-2xl text-text-secondary">잔금일이 원칙, 예외는 등기접수일</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  양도소득세 계산의 첫 단추는 언제를 취득일과 양도일로 볼지 정하는 일입니다. 이 하루가 밀리거나 당겨지는지에 따라 1세대1주택 2년 보유 요건, 장기보유특별공제 구간, 단기양도 세율 적용이 완전히 뒤바뀝니다. 이 가이드는 소득세법 §98과 시행령 §162에 근거해 잔금일·등기일·계약일 중 어느 날을 기준으로 보는지, 상속·증여·자가신축·분양은 어떻게 다른지 정확히 정리합니다.
                </p>
              </header>

              <AdSlot slot="guide-capital-gains-acquisition-timing-2026-top" format="horizontal" />

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">양도·취득 시기의 원칙은 잔금일입니다</h2>
                <p>
                  소득세법 §98은 자산의 양도 또는 취득 시기를 원칙적으로 <strong>대금을 청산한 날</strong>로 정합니다. 시행령 §162가 이를 구체화하여 매매의 경우 매수인이 매도인에게 잔금을 지급해 대금이 완결된 날, 곧 흔히 말하는 잔금일을 시기로 봅니다. 이 날부터 보유기간이 시작되고, 매도 시에는 이 날에 양도가 성립한 것으로 처리됩니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">기본 원칙 요약</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    · 취득시기 = 매수인이 잔금을 청산한 날 (대금청산일)
                    <br />
                    · 양도시기 = 매도인이 잔금을 수령한 날 (같은 날)
                    <br />
                    · 근거: 소득세법 §98, 소득세법 시행령 §162
                    <br />
                    · 계약금·중도금 지급일은 취득시기가 아님
                  </p>
                </div>
                <p>
                  계약금이나 중도금을 먼저 냈다고 해서 그 시점이 취득시기가 되는 것은 아닙니다. 세법은 대금이 완전히 청산되어 매도인이 매수인에게 소유권을 넘길 상태가 되는 순간을 취득·양도의 완결 시점으로 봅니다. 따라서 매매계약서에 기재된 잔금 지급 예정일과 실제 이체 완료일이 다르다면, 실제 이체가 완결된 날이 시기가 됩니다.
                </p>
                <p>
                  다만 잔금을 청산하기 전에 소유권이전등기를 먼저 접수하거나, 대금청산일 자체가 명확히 확인되지 않는 경우에는 예외 규정이 적용됩니다. 이 두 경우 모두 등기접수일이 시기가 되며, 자세한 내용은 이어지는 섹션에서 다룹니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">잔금 청산 전에 등기했다면 등기접수일이 시기입니다</h2>
                <p>
                  대금청산 전에 소유권이전등기를 먼저 접수한 경우 취득·양도 시기는 <strong>등기부 등본상 등기접수일</strong>이 됩니다. 이 예외는 시행령 §162에 명시되어 있으며, 매수인이 실질적으로 소유권을 확보한 시점을 우선한다는 취지입니다.
                </p>
                <p>
                  실무에서는 다음과 같은 상황에서 잔금 전 등기가 발생합니다. 매도인이 신뢰관계 등을 이유로 잔금 수령 전 등기를 넘기는 경우, 대출 실행 조건으로 등기가 먼저 필요한 경우, 매매대금의 일부를 매수인이 승계한 채무로 대체하기로 한 경우 등입니다. 이때는 잔금 수령이 늦어지더라도 세법상 취득·양도는 등기접수일에 성립한 것으로 봅니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">판정 순서</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    1. 잔금청산일이 등기접수일보다 이르거나 같다 → <strong>잔금일이 시기</strong>
                    <br />
                    2. 잔금청산일이 등기접수일보다 늦다 → <strong>등기접수일이 시기</strong>
                    <br />
                    3. 잔금청산일이 확인되지 않는다 → <strong>등기접수일이 시기</strong>
                  </p>
                </div>
                <p>
                  다만 등기가 접수되었더라도 그 등기의 원인이 매매가 아니라 다른 원인(가등기의 본등기 전환 등)인 경우에는 별도 판정이 필요합니다. 등기부의 접수번호·접수일자·등기원인을 함께 확인해야 정확한 시기를 산정할 수 있습니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">대금청산일이 불분명하면 등기접수일이 됩니다</h2>
                <p>
                  잔금이 언제 청산되었는지 객관적으로 확인되지 않는 경우 시기는 <strong>등기접수일</strong>로 판정합니다. 소득세법 시행령 §162는 대금청산일이 분명하지 않은 때 등기·등록부에 기재된 등기접수일을 시기로 본다고 규정합니다.
                </p>
                <p>
                  대금청산일이 불분명한 사례로는 다음이 있습니다. 현금으로 여러 회에 걸쳐 지급하고 영수증이 없는 경우, 가족 사이의 매매로 이체 내역이 남지 않은 경우, 오래된 거래로 계좌 기록이 소실된 경우 등입니다. 이런 경우 국세청은 대금청산일을 특정하기 어렵다고 판단하여 등기접수일을 시기로 처리합니다.
                </p>
                <p>
                  예외: 대금청산일을 입증할 계좌이체 내역·영수증·매매계약서상 지급일이 명확히 있다면 그 날이 시기가 됩니다. 따라서 실무에서는 잔금 지급 시 반드시 이체 기록이나 서면 영수증을 남기는 것이 안전합니다. 이는 취득시기뿐 아니라 이후 양도세 신고 시 취득가액 입증에도 결정적 자료가 됩니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">상황별 취득·양도 시기 정리</h2>
                <p>
                  매매 이외의 취득 사유(상속·증여·자가신축·분양)는 각각 별도 규정이 적용됩니다. 다음 표는 소득세법 §98과 시행령 §162의 상황별 시기 판정을 요약한 것입니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 취득 유형별 취득·양도 시기 (소득세법 §98·시행령 §162, 2026 기준)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">취득 유형</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">시기</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">비고</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">일반 매매</td>
                        <td className="p-3"><strong>잔금청산일</strong></td>
                        <td className="p-3">대금이 완전 청산된 날</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">잔금 전 등기 사례</td>
                        <td className="p-3"><strong>등기접수일</strong></td>
                        <td className="p-3">시행령 §162 예외 규정</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">대금청산일 불분명</td>
                        <td className="p-3"><strong>등기접수일</strong></td>
                        <td className="p-3">입증 자료 부재 시 등기로 대체</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">상속</td>
                        <td className="p-3"><strong>상속개시일</strong></td>
                        <td className="p-3">피상속인의 사망일</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">증여</td>
                        <td className="p-3"><strong>증여 등기접수일</strong></td>
                        <td className="p-3">증여받은 날(등기접수)</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">자가건축(허가)</td>
                        <td className="p-3"><strong>사용승인서 교부일</strong></td>
                        <td className="p-3">사용승인 전 사용·임시사용승인은 그날</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">자가건축(무허가)</td>
                        <td className="p-3"><strong>사실상 사용일</strong></td>
                        <td className="p-3">실제 거주·사용 개시일</td>
                      </tr>
                      <tr>
                        <td className="p-3">분양권으로 취득한 신축</td>
                        <td className="p-3"><strong>잔금청산일 원칙</strong></td>
                        <td className="p-3">사용승인일과 비교하는 별도 규정 존재, 개별 판정 필요</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p>
                  다만 분양권으로 취득한 신축주택의 경우 잔금청산일과 사용승인일·사실상 사용일 중 어느 날이 되는지는 개별 상황에 따라 달라질 수 있습니다. 특히 잔금청산 시점보다 사용승인이 늦거나 이른 경우 판단이 갈릴 수 있으므로, 신축주택 매도를 앞두고 있다면 국세청 상담 또는 세무 전문가 검토가 안전합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">보유기간 계산 사례로 확인해봅니다</h2>
                <p>
                  취득시기가 달라지면 보유기간과 세율 구간이 어떻게 바뀌는지 세 가지 사례로 살펴보겠습니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 1. 2년 보유 요건 경계 (1세대1주택 비과세)</p>
                  <p className="text-sm text-text-secondary">
                    · 잔금청산일: 2024년 4월 15일
                    <br />
                    · 매도 잔금청산일: 2026년 4월 14일 (2년에서 하루 부족)
                    <br />
                    · 판정: 보유기간 1년 11개월 30일 → 2년 보유 요건 미충족
                    <br />
                    · 결과: 1세대1주택 비과세 적용 불가, 과세 대상 전환
                    <br />
                    <span className="text-xs text-text-tertiary">주의: 하루 차이로 비과세 여부가 갈리므로, 매매 일정을 조율할 때 최소 2년 하고도 며칠의 여유를 두는 것이 안전합니다.</span>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 2. 잔금 전 등기 사례 (등기접수일이 시기)</p>
                  <p className="text-sm text-text-secondary">
                    · 매매계약 잔금 예정일: 2024년 3월 30일
                    <br />
                    · 실제 잔금청산일: 2024년 4월 10일 (연기)
                    <br />
                    · 등기접수일: 2024년 3월 25일 (잔금보다 먼저 접수)
                    <br />
                    · 판정: 등기접수일이 잔금청산일보다 이르므로 취득시기 = <strong>2024년 3월 25일</strong>
                    <br />
                    <span className="text-xs text-text-tertiary">시행령 §162 예외 규정 적용. 잔금 실제 이체가 늦더라도 등기가 먼저 접수됐다면 등기접수일이 시기입니다.</span>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 3. 상속 → 매도 (사망일부터 보유기간)</p>
                  <p className="text-sm text-text-secondary">
                    · 피상속인 사망일: 2020년 6월 1일
                    <br />
                    · 상속등기 접수일: 2021년 2월 10일 (사망 후 8개월)
                    <br />
                    · 매도 잔금청산일: 2026년 7월 1일
                    <br />
                    · 취득시기: 2020년 6월 1일 (사망일 기준)
                    <br />
                    · 보유기간: 약 6년 1개월 → 장기보유특별공제 대상
                    <br />
                    <span className="text-xs text-text-tertiary">상속등기가 늦어져도 취득시기는 사망일로 소급됩니다. 1세대1주택 2년 보유 요건도 사망일부터 판정합니다.</span>
                  </p>
                </div>
                <p className="mt-4">
                  다만 이는 원칙적 판정입니다. 조합원입주권·분양권으로 취득한 신축주택은 잔금청산일과 사용승인일 중 어느 날을 볼지가 개별 상황에 따라 다를 수 있고, 매매 형태가 특수한 경우(교환·현물출자 등)도 별도 규정이 적용됩니다. 세액 차이가 큰 경우에는 반드시 국세청 상담 또는 세무 전문가의 검토를 받으세요.
                </p>
              </section>

              <AdSlot slot="guide-capital-gains-acquisition-timing-2026-mid" format="rectangle" />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h2 className="text-2xl font-bold">계약일은 시기 판정에 쓰지 않습니다</h2>
                <p>
                  많은 사람이 계약서에 도장을 찍은 날을 취득일로 오해합니다. 그러나 세법은 계약일이 아닌 <strong>대금청산일(또는 예외 시 등기접수일)</strong>을 시기로 봅니다. 계약금·중도금을 미리 냈더라도 잔금이 청산되기 전에는 취득이 성립하지 않으므로, 그 사이 기간은 보유기간에 산입되지 않습니다.
                </p>
                <p>
                  다만 1세대1주택 비과세 판정과 관련해 계약일이 의미를 갖는 특수사안이 있습니다. 예컨대 매매특약으로 양도일 이전에 주택을 멸실한 경우, 계약일 현재 기준으로 주택 여부를 판정하는 예규가 있어 실무상 계약일이 부수적으로 고려될 수 있습니다. 그러나 이는 보유기간 기산일과는 별개의 논점이며, 원칙적 시기 판정 기준은 여전히 잔금일입니다.
                </p>
                <p>
                  예외적 취급이 있는 사안(매매특약·조건부 매매·해제조건부 매매 등)에서는 국세청 예규나 판례에 따라 판단이 달라질 수 있으므로, 일반화하지 말고 개별 사안별로 확인해야 합니다. 실무에서는 잔금일 기준으로 보유기간을 산정하되, 계약 조건이 특이하다면 사전 문의가 안전합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">시기 판정 실수가 만드는 세액 차이</h2>
                <p>
                  취득시기 하루 차이가 만들어내는 세액 차이는 상상 이상입니다. 소득세법상 주택 양도세율은 보유기간에 따라 다음과 같이 구간이 나뉩니다.
                </p>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li>
                    <strong>1년 미만 단기양도:</strong> 세율 70%. 취득일부터 양도일까지 365일이 되지 않으면 이 세율이 적용됩니다.
                  </li>
                  <li>
                    <strong>1년 이상 2년 미만:</strong> 세율 60%. 여전히 단기양도로 분류되며 누진세율보다 훨씬 무겁습니다.
                  </li>
                  <li>
                    <strong>2년 이상 보유:</strong> 소득세법 §55 일반 누진세율 적용(6~45%). 장기보유특별공제도 3년 이상부터 시작해 최대 30%(일반) 또는 80%(1세대1주택 10년 이상 보유·거주) 적용됩니다.
                  </li>
                  <li>
                    <strong>1세대1주택 비과세:</strong> 2년 이상 보유(조정대상지역은 2년 이상 거주 요건 추가) 시 양도가 12억까지 비과세. 취득시기 판정이 여기서도 관건이 됩니다.
                  </li>
                </ul>
                <p>
                  따라서 잔금일과 등기일이 다를 때, 계약서상 잔금일과 실제 이체일이 다를 때, 상속·증여 등기 접수가 지연됐을 때는 정확한 시기 판정이 세액 수백만원에서 수천만원의 차이를 만들 수 있습니다. 매도를 계획한다면 매도 6개월 전부터 취득시기 판정 근거 자료(잔금 이체내역·등기부·계약서·매매특약)를 정리해두는 것이 좋습니다.
                </p>
              </section>

              <h2 className="text-2xl font-bold mb-6">자주 묻는 질문</h2>
              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h3 className="text-lg font-semibold text-text-primary">관련 계산기 및 가이드</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link
                    href="/calculator/capital-gains-tax/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">양도소득세 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">취득·양도 시기를 넣고 실제 세액을 시뮬레이션해보세요.</p>
                  </Link>
                  <Link
                    href="/guide/capital-gains-tax-5-steps/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">양도세 5단계 계산법</div>
                    <p className="mt-1 text-sm text-text-secondary">양도차익부터 세액까지 단계별 흐름을 익히세요.</p>
                  </Link>
                  <Link
                    href="/guide/one-household-12-billion-exemption/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">1세대1주택 12억 비과세</div>
                    <p className="mt-1 text-sm text-text-secondary">2년 보유·거주 요건과 12억 한도 초과 시 계산법.</p>
                  </Link>
                  <Link
                    href="/guide/long-term-holding-special-deduction-80-percent/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">장기보유특별공제 최대 80%</div>
                    <p className="mt-1 text-sm text-text-secondary">보유기간·거주기간별 공제율과 기산일 판정.</p>
                  </Link>
                  <Link
                    href="/guide/temporary-two-houses-capital-gains-exemption/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">일시적 2주택 비과세</div>
                    <p className="mt-1 text-sm text-text-secondary">신규 취득일부터 3년 처분 요건과 잔금일 관계.</p>
                  </Link>
                  <Link
                    href="/category/tax/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">모든 세금 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">양도세·취득세·재산세·상속세·증여세 모음.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 교육 목적으로 작성되었으며, 개인 맞춤형 세무 조언이 아닙니다. 실제 취득·양도 시기 판정, 보유기간 산정, 비과세·감면 적용 여부는 개별 사안의 계약 조건과 등기 상황에 따라 달라질 수 있으므로 관할 세무서 또는 세무사의 확인을 받으세요. 특히 잔금 전 등기, 대금청산일 불분명, 분양권 신축주택, 매매특약이 있는 매매 등 특수한 경우 반드시 전문가 상담이 필요합니다. 본 콘텐츠는 2026-08-03을 기준으로 작성되었으며, 세법 개정 시 즉시 업데이트됩니다. 취득·양도 시기의 법적 근거는 <strong>소득세법 §98(양도 또는 취득의 시기)</strong>과 <strong>소득세법 시행령 §162(양도 또는 취득시기)</strong>를 따릅니다. AI 보조 작성 후 운영자 검수 완료.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터(소득세법 §98·시행령 §162)</a>,{' '}
                  <a href="https://www.nts.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">국세청(양도소득세 안내)</a>,{' '}
                  <a href="https://hometax.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">홈택스(양도소득세 신고)</a>.
                </p>
              </section>

              <ShareButtons
                title="양도세 취득·양도 시기 2026 가이드"
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