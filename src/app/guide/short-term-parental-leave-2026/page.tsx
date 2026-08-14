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

// [revenue-lever: indexing+traffic]
// indexing: 신규 슬러그 색인 표면 확장, 내부 링크 mesh 6개(육아휴직·6+6·근로시간단축·배우자출산휴가·가족돌봄휴가·가이드허브).
// traffic: 2026-08-20 시행 신규 제도 검색 수요 흡수(단기 육아휴직/1주 육아휴직/육아휴직 1주일).

const URL = 'https://calculatorhost.com/guide/short-term-parental-leave-2026/';
const DATE_PUBLISHED = '2026-08-15';
const DATE_MODIFIED = '2026-08-15';

export const metadata: Metadata = {
  title: '단기 육아휴직 2026, 1주·2주 신청과 급여 정리 | calculatorhost',
  description:
    '단기 육아휴직은 2026년 8월 20일부터 1주 또는 2주 단위로 쓸 수 있습니다. 만 8세 이하 자녀의 질병·방학 등 긴급 돌봄이 대상이며, 남녀고용평등법 19조에 근거합니다. 급여는 일할계산이며 신청 기한은 7일 전, 방학 사유는 30일 전입니다.',
  keywords: [
    '단기 육아휴직',
    '1주 육아휴직',
    '육아휴직 1주일',
    '단기 육아휴직 신청',
    '단기 육아휴직 급여',
    '남녀고용평등법 19조',
    '8월 20일 육아휴직',
    '2026 육아휴직',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '단기 육아휴직 2026, 1주·2주 신청과 급여 정리' }],
    title: '단기 육아휴직 2026, 1주·2주로 짧게 쓰는 육아휴직 총정리',
    description: '2026년 8월 20일 시행. 만 8세 이하 자녀의 질병·방학 등 긴급 돌봄에 1주 또는 2주 단위로 사용. 급여, 신청 기한, 사업주 협의까지 정리.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '단기 육아휴직 2026, 1주·2주 신청과 급여 정리',
    description: '2026-08-20 시행. 남녀고용평등법 19조에 근거한 단기 육아휴직. 대상, 급여, 신청 기한, 사업주 협의까지.',
  },
};

const FAQ_ITEMS = [
  {
    question: '단기 육아휴직은 언제부터 시행되나요?',
    answer:
      '2026년 8월 20일부터 시행됩니다. 남녀고용평등법 §19 개정으로 도입된 제도이며, 별개의 새 휴직이 아니라 기존 육아휴직을 1주(7일) 또는 2주(14일) 단위로 짧게 쓸 수 있게 유연화한 것입니다. 만 8세 이하 자녀를 둔 근로자가 자녀의 질병·사고, 어린이집·학교 휴원·휴교, 방학 등 단기 돌봄이 필요한 상황에서 활용할 수 있습니다.',
  },
  {
    question: '단기 육아휴직은 며칠까지 쓸 수 있나요?',
    answer:
      '1주(7일) 또는 2주(14일) 단위로 연 1회 사용할 수 있습니다. 사용한 기간은 자녀 1명당 부모 각 1년인 전체 육아휴직 한도에서 차감되지만, 육아휴직 분할 사용 횟수 한도에는 포함되지 않습니다. 즉 짧게 쓴다고 해서 나중에 정식 육아휴직을 나눠 쓸 기회가 줄어들지 않습니다.',
  },
  {
    question: '대상은 누구인가요?',
    answer:
      '만 8세 이하 또는 초등학교 2학년 이하 자녀를 둔 근로자가 대상입니다. 자녀의 질병·사고 입원, 어린이집·유치원·학교 휴원·휴교, 방학 등 긴급하게 돌봄이 필요한 상황이면 신청할 수 있습니다. 부모 모두 각자 신청할 수 있어 맞벌이 부부가 필요에 따라 번갈아 사용하는 것도 가능합니다.',
  },
  {
    question: '급여는 얼마나 받나요?',
    answer:
      '통상적인 육아휴직 급여를 일할 계산해 지급합니다(고용보험법 §70). 예를 들어 1주 사용 시 월 육아휴직 급여 산정액의 30분의 7, 2주 사용 시 30분의 14가 지급 기준입니다. 다만 고용보험에서 정한 월 상한액이 별도 적용되므로, 정확한 금액은 고용노동부·고용보험 고시 기준과 개인 통상임금에 따라 달라집니다. 실제 지급액은 고용24 또는 관할 고용센터에서 확인하세요.',
  },
  {
    question: '언제까지 신청해야 하나요?',
    answer:
      '사용개시 예정일 7일 전까지 사업주에게 신청합니다. 일반 육아휴직이 30일 전 신청 원칙인 것과 달리, 단기 육아휴직은 자녀의 긴급 돌봄이라는 특성상 7일 전 신청이 허용됩니다. 다만 방학을 사유로 쓰는 경우 신청이 집중되어 사업 운영에 지장이 클 수 있어 일반 규정과 같이 30일 전 신청이 적용됩니다.',
  },
  {
    question: '기존 육아휴직과 무엇이 다른가요?',
    answer:
      '가장 큰 차이는 사용 단위입니다. 일반 육아휴직은 최소 30일 이상 연속으로 사용해야 하지만, 단기 육아휴직은 1주 또는 2주로 훨씬 짧습니다. 또한 신청 기한이 30일 전에서 7일 전으로 단축되고, 사용 기간은 분할 횟수에 포함되지 않는 이점이 있습니다. 급여율 자체는 일반 육아휴직 급여를 일할 계산해 적용합니다.',
  },
  {
    question: '사업주가 거부하거나 시기를 바꿀 수 있나요?',
    answer:
      '법정 요건을 갖춘 신청은 원칙적으로 거부할 수 없습니다. 다만 방학 등으로 신청이 특정 기간에 집중되어 사업 운영에 막대한 지장이 있는 경우, 사업주가 근로자와 협의해 사용 시기를 변경할 수 있습니다. 이때 변경 사유와 조정 기간을 서면으로 통지해야 합니다. 협의 없이 일방적으로 거부하면 위법 소지가 있으니 관할 고용노동청에 상담하세요.',
  },
  {
    question: '방학 때도 쓸 수 있나요?',
    answer:
      '네, 방학은 대표적인 사용 사유 중 하나입니다. 다만 방학은 사용 시점을 미리 예측할 수 있고 신청이 몰리는 특성이 있어, 일반 육아휴직과 같이 30일 전까지 사업주에게 신청해야 합니다. 갑작스러운 질병·사고 돌봄과 달리 방학은 미리 계획해 신청하는 것이 원칙입니다.',
  },
];

export default function ShortTermParentalLeave2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '단기 육아휴직 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '단기 육아휴직 2026, 1주·2주로 짧게 쓰는 육아휴직 총정리',
    description:
      '2026년 8월 20일 시행되는 단기 육아휴직 제도. 만 8세 이하 자녀 대상, 1주·2주 사용 단위, 급여 일할계산, 7일 전 신청, 사업주 협의까지 남녀고용평등법 §19 기준으로 정리.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['단기 육아휴직', '1주 육아휴직', '2주 육아휴직', '육아휴직 신청', '남녀고용평등법 19조'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '단기 육아휴직 2026',
    description:
      '2026년 8월 20일부터 1주 또는 2주 단위로 사용 가능한 단기 육아휴직 제도의 대상·급여·신청 방법 완전 정리.',
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
                    { name: '단기 육아휴직 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">직장인 부모 · 7분 읽기 · 2026-08-15</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  단기 육아휴직 2026
                  <br />
                  <span className="text-2xl text-text-secondary">· 1주·2주 신청과 급여 정리</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  아이가 갑자기 아파서 며칠만 쉬고 싶은데, 정식 육아휴직을 쓰기엔 부담이 큽니다. 이런 맞벌이 부모의 고민을 덜기 위해 2026년 8월 20일부터 단기 육아휴직이 시행됩니다. 남녀고용평등법 §19에 근거한 이 제도는 육아휴직을 1주 또는 2주 단위로 짧게 나눠 쓸 수 있게 한 것으로, 자녀의 질병·방학·긴급 돌봄 상황에서 활용할 수 있습니다. 대상, 급여 산정, 신청 기한, 사업주 협의까지 이 가이드에서 정리합니다.
                </p>
              </header>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">단기 육아휴직이란 무엇인가요?</h2>
                <p>
                  단기 육아휴직은 육아휴직을 1주(7일) 또는 2주(14일) 단위로 짧게 쓸 수 있게 한 제도입니다. 남녀고용평등법 §19 개정으로 2026년 8월 20일부터 시행되며, 별개의 새로운 휴직이 아니라 기존 육아휴직 제도의 사용 단위를 유연화한 것입니다.
                </p>
                <p>
                  기존 육아휴직은 최소 30일 이상 연속으로 사용해야 했기 때문에, 아이가 며칠 아프거나 어린이집이 잠깐 문을 닫는 상황에서는 활용하기 어려웠습니다. 단기 육아휴직은 이런 짧은 돌봄 공백을 메우기 위해 도입되었고, 부모가 필요한 만큼만 쓸 수 있게 설계되어 있습니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">단기 육아휴직의 핵심 특징</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    · 사용 단위: 1주(7일) 또는 2주(14일)
                    <br />
                    · 시행일: 2026년 8월 20일
                    <br />
                    · 근거 법령: 남녀고용평등법 §19, 고용보험법 §70(급여)
                    <br />
                    · 급여: 육아휴직 급여를 일할계산해 지급
                    <br />
                    · 사용 횟수: 연 1회
                  </p>
                </div>
                <p>
                  다만 이 제도는 어디까지나 기존 육아휴직의 한 형태이므로, 사용한 일수는 자녀 1명당 부모 각 1년으로 정해진 전체 육아휴직 한도에서 차감됩니다. 짧게 썼다고 해서 별도로 추가 휴직 기간을 부여받는 것은 아니라는 점을 기억해야 합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">며칠까지 쓸 수 있나요?</h2>
                <p>
                  1주 또는 2주 단위로 연 1회 사용할 수 있습니다. 하루씩 잘라 쓰거나 3주·4주 같이 임의의 기간을 선택할 수는 없고, 정해진 두 가지 단위 중 하나로만 신청해야 합니다.
                </p>
                <p>
                  사용한 기간은 앞서 설명한 대로 전체 육아휴직 한도(자녀 1명당 부모 각 1년, 총 12개월)에서 차감됩니다. 예를 들어 올해 2주 단기 육아휴직을 썼다면, 남은 육아휴직 가능 기간은 약 11개월 15일이 됩니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">분할 횟수 한도와의 관계</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    일반 육아휴직은 최대 3회까지 분할해 사용할 수 있습니다(자녀 1명 기준). 단기 육아휴직으로 사용한 기간은 이 분할 횟수 한도에는 포함되지 않기 때문에, 나중에 정식 육아휴직을 나눠 쓸 기회가 줄어들지 않습니다. 짧게 쓰는 것에 대한 실질적 페널티가 없도록 설계된 것입니다.
                  </p>
                </div>
                <p>
                  다만 연 1회라는 사용 횟수 제한은 있으므로, 올해 이미 단기 육아휴직 2주를 썼다면 같은 해에 또 1주를 이어 쓰는 것은 불가능합니다. 추가 돌봄이 필요하면 가족돌봄휴가나 정식 육아휴직 분할 사용을 고려해야 합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">누가 신청할 수 있나요?</h2>
                <p>
                  만 8세 이하 또는 초등학교 2학년 이하 자녀를 둔 근로자가 신청할 수 있습니다. 육아휴직 자격 요건 자체는 일반 육아휴직과 동일하며, 근속 기간 6개월 이상이면 사용할 수 있는 것도 같습니다.
                </p>
                <p>
                  단기 육아휴직은 다음과 같은 긴급하고 짧은 돌봄 상황에서 사용하도록 설계되었습니다.
                </p>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li>자녀의 질병·사고로 인한 입원 또는 통원 치료</li>
                  <li>어린이집·유치원·초등학교의 휴원·휴교(감염병, 시설 문제 등)</li>
                  <li>방학, 개학 준비 기간 등 정기적인 돌봄 공백</li>
                  <li>가족 행사, 예방접종, 학교 상담 등 부모의 동행이 필요한 일</li>
                </ul>
                <p>
                  부모 모두 각자 신청할 수 있어 맞벌이 부부가 상황에 맞게 번갈아 쓰는 것도 가능합니다. 예를 들어 아이가 일주일간 입원하면 아빠가 1주 단기 육아휴직을 쓴 뒤 이어서 엄마가 다시 1주를 쓸 수 있습니다.
                </p>
                <p>
                  다만 계약직·단시간 근로자의 경우 근속 6개월 요건과 고용보험 가입 이력이 관건입니다. 자격에 애매한 부분이 있다면 관할 고용센터에 사전에 상담하세요.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">급여는 얼마나 받나요?</h2>
                <p>
                  통상적인 육아휴직 급여를 일할 계산해 지급합니다. 근거 법령은 고용보험법 §70이며, 재원은 고용보험기금에서 지급됩니다.
                </p>
                <p>
                  기본 산정 방식은 월 육아휴직 급여 산정액을 30일로 나눈 뒤 사용 일수만큼 곱하는 방식입니다. 즉 1주 사용 시 30분의 7, 2주 사용 시 30분의 14가 지급 기준이 됩니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 단기 육아휴직 급여 산정 방식(개념 예시, 고용보험법 §70)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">사용 기간</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">산정 방식</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">상한액 반영</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">1주(7일)</td>
                        <td className="p-3">월 육아휴직 급여 × (7/30) 일할계산</td>
                        <td className="p-3">고용보험 월 상한액 이내에서 지급</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">2주(14일)</td>
                        <td className="p-3">월 육아휴직 급여 × (14/30) 일할계산</td>
                        <td className="p-3">고용보험 월 상한액 이내에서 지급</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">개념 예시 1. 통상임금 월 300만원, 1주 사용</p>
                  <p className="text-sm text-text-secondary">
                    · 월 육아휴직 급여 산정액(가정): 210만원
                    <br />
                    · 산정: 210만원 × (7/30) = 약 49만원
                    <br />
                    · 실제 지급: 고용보험 월 상한액과 비교해 낮은 금액을 지급
                    <br />
                    <span className="text-xs text-text-tertiary">위 금액은 산정 방식을 이해하기 위한 가정 사례이며, 실제 지급액은 개인 통상임금과 해당 시점의 고용노동부 고시에 따라 달라집니다.</span>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">개념 예시 2. 통상임금 월 400만원, 2주 사용</p>
                  <p className="text-sm text-text-secondary">
                    · 월 육아휴직 급여 산정액(가정): 250만원
                    <br />
                    · 산정: 250만원 × (14/30) = 약 116만원
                    <br />
                    · 실제 지급: 상한액 반영 후 최종 금액 결정
                    <br />
                    <span className="text-xs text-text-tertiary">가정 사례입니다. 정확한 지급액은 고용24(work24.go.kr)에서 개인 조회하거나 관할 고용센터에 문의하세요.</span>
                  </p>
                </div>
                <p>
                  다만 여기서 언급한 산정 방식과 예시 금액은 이해를 돕기 위한 개념 설명입니다. 실제 급여는 개인의 통상임금, 육아휴직 몇 번째 사용인지, 그리고 해당 연도의 고용노동부 고시 상한액에 따라 달라지므로, 신청 전에 반드시 공식 창구에서 확인하는 것이 안전합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">언제까지 신청하나요?</h2>
                <p>
                  사용개시 예정일 7일 전까지 사업주에게 신청하면 됩니다. 일반 육아휴직이 30일 전 신청을 원칙으로 하는 것과 비교하면 훨씬 여유가 없는 편이지만, 이는 단기 육아휴직이 자녀의 긴급 돌봄이라는 특성을 반영해 짧게 설정된 것입니다.
                </p>
                <p>
                  신청 방법은 일반 육아휴직과 유사합니다. 사내 인사팀에 육아휴직 신청서를 제출하고, 자녀의 주민등록등본이나 진단서 등 필요 서류를 함께 냅니다. 급여 신청은 휴직 종료 후 고용24(work24.go.kr) 또는 관할 고용센터를 통해 진행합니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">주의: 방학 사유는 30일 전 신청</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    방학을 사유로 단기 육아휴직을 신청하는 경우, 사용개시 예정일 7일 전이 아니라 30일 전까지 신청해야 합니다. 방학은 사용 시점을 미리 예측할 수 있고, 신청이 특정 기간에 몰려 사업 운영에 큰 지장을 줄 수 있기 때문에 일반 육아휴직과 같은 신청 기한이 적용됩니다.
                  </p>
                </div>
                <p>
                  다만 자녀의 갑작스러운 질병이나 사고, 어린이집 긴급 휴원 등 예측 불가능한 사유는 7일 전 신청 원칙이 그대로 적용됩니다. 이런 경우라면 병원 진단서, 어린이집 공지문 등 사유를 증명할 수 있는 자료를 함께 제출하는 것이 유리합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">기존 육아휴직과 무엇이 다른가요?</h2>
                <p>
                  가장 큰 차이는 사용 단위와 신청 기한입니다. 일반 육아휴직은 최소 30일 이상 연속으로 사용해야 하는 반면, 단기 육아휴직은 1주 또는 2주로 훨씬 짧게 쓸 수 있습니다. 아래 비교표로 정리하면 다음과 같습니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 2. 일반 육아휴직 vs 단기 육아휴직 비교(남녀고용평등법 §19)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">항목</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">일반 육아휴직</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">단기 육아휴직</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">최소 사용 단위</td>
                        <td className="p-3">30일 이상</td>
                        <td className="p-3">1주 또는 2주</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">신청 기한</td>
                        <td className="p-3">30일 전</td>
                        <td className="p-3">7일 전(방학은 30일 전)</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">전체 한도 차감</td>
                        <td className="p-3">사용 일수 차감</td>
                        <td className="p-3">사용 일수 차감(동일)</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">분할 횟수 한도</td>
                        <td className="p-3">최대 3회</td>
                        <td className="p-3">횟수에 포함되지 않음</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">사용 빈도</td>
                        <td className="p-3">한도 내 자유</td>
                        <td className="p-3">연 1회</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">급여 산정</td>
                        <td className="p-3">월 단위 지급</td>
                        <td className="p-3">일할계산 지급</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p>
                  다만 급여율 자체는 동일합니다. 통상임금을 기준으로 산정한 육아휴직 급여를 그대로 일할계산해 적용하므로, 단기라고 해서 불리한 비율이 적용되지는 않습니다.
                </p>
                <p>
                  또 하나 유의할 점은, 단기 육아휴직도 육아휴직의 일종이라 근속 6개월 등 자격 요건과 승진·평가 등에서 불리한 처우 금지 원칙이 동일하게 적용된다는 점입니다. 짧게 쓴다고 해서 별도로 조건이 완화되거나 강화되지 않습니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">사업주가 거부하거나 시기를 바꿀 수 있나요?</h2>
                <p>
                  법정 요건을 갖춘 신청은 사업주가 원칙적으로 거부할 수 없습니다. 남녀고용평등법 §19에 따라 육아휴직은 근로자의 권리이며, 단기 육아휴직도 마찬가지로 정당한 사유 없는 거부는 위법입니다.
                </p>
                <p>
                  다만 방학 등 신청이 특정 기간에 집중되어 사업 운영에 막대한 지장이 예상되는 경우, 사업주가 근로자와 협의해 사용 시기를 변경할 수 있는 여지를 남겨두었습니다. 이때는 다음과 같은 절차가 필요합니다.
                </p>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li>사업주가 시기 변경이 필요한 사유를 근로자에게 서면으로 통지</li>
                  <li>변경하려는 조정 기간(대체 사용 시기)을 명시</li>
                  <li>근로자와 협의 절차를 실질적으로 진행</li>
                </ul>
                <p>
                  주의: 협의 없이 사업주가 일방적으로 신청을 거부하거나, 실제로 사업 운영에 지장이 없는데도 "방학이라 안 된다"는 이유만으로 미룬다면 위법 소지가 있습니다. 이런 경우 관할 고용노동청에 상담을 요청하거나 온라인 진정을 접수할 수 있습니다.
                </p>
                <p>
                  또 육아휴직을 이유로 해고·전보·감봉 등 불리한 처우를 하는 것도 법으로 금지되어 있습니다. 신청 자체를 이유로 인사상 불이익을 받았다면 이 역시 노동청에 신고할 수 있는 사안입니다.
                </p>
              </section>

              <h2 className="text-2xl font-bold mb-6">자주 묻는 질문</h2>
              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h3 className="text-lg font-semibold text-text-primary">관련 계산기 및 가이드</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link
                    href="/guide/parental-leave-benefit-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">육아휴직 급여 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">월 상한액과 통상임금 기준 급여 산정을 정리했습니다.</p>
                  </Link>
                  <Link
                    href="/guide/parental-leave-6-plus-6-special-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">6+6 부모육아휴직제</div>
                    <p className="mt-1 text-sm text-text-secondary">부모가 함께 쓰면 급여가 오르는 특례 규정을 확인하세요.</p>
                  </Link>
                  <Link
                    href="/guide/childcare-reduced-hours-benefit-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">육아기 근로시간 단축 급여</div>
                    <p className="mt-1 text-sm text-text-secondary">휴직 대신 근로시간을 줄일 때 받는 급여를 알아보세요.</p>
                  </Link>
                  <Link
                    href="/guide/spouse-childbirth-leave-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">배우자 출산휴가</div>
                    <p className="mt-1 text-sm text-text-secondary">아빠가 쓸 수 있는 유급 출산휴가의 일수와 신청 방법.</p>
                  </Link>
                  <Link
                    href="/guide/family-care-leave-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">가족돌봄휴가</div>
                    <p className="mt-1 text-sm text-text-secondary">단기 육아휴직 외에 급한 돌봄에 쓸 수 있는 또 다른 선택지.</p>
                  </Link>
                  <Link
                    href="/guide/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">전체 가이드</div>
                    <p className="mt-1 text-sm text-text-secondary">세금·금융·부동산·근로 관련 실무 가이드 모음.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 교육 목적으로 작성되었으며, 개인 맞춤형 법률·노무 조언이 아닙니다. 실제 단기 육아휴직 신청 요건, 급여 지급액, 상한 반영, 사업주 협의 절차 등은 개별 사정과 해당 시점의 고용노동부 고시에 따라 달라질 수 있습니다. 정확한 정보는 고용노동부(moel.go.kr), 고용24(work24.go.kr), 관할 고용센터, 또는 사내 인사부서에서 반드시 확인하세요. 본 콘텐츠는 2026-08-15을 기준으로 작성되었으며, 관련 법령이나 고시가 개정되면 즉시 업데이트됩니다. 인용한 법조항은 <strong>남녀고용평등법 §19(육아휴직)</strong>, <strong>고용보험법 §70(육아휴직 급여)</strong>입니다. AI 보조 작성 후 운영자 검수 완료.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.moel.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">고용노동부</a>,{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">국가법령정보센터</a>,{' '}
                  <a href="https://www.work24.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">고용24</a>.
                </p>
              </section>

              <ShareButtons
                title="단기 육아휴직 2026 가이드"
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
