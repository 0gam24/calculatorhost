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

const URL = 'https://calculatorhost.com/guide/family-care-leave-2026/';
const DATE_PUBLISHED = '2026-08-02';
const DATE_MODIFIED = '2026-08-02';

export const metadata: Metadata = {
  title: '가족돌봄휴직·휴가 2026, 연 90일·10일 무급 사용법',
  description:
    '가족이 아프거나 돌봄이 필요하면 근로자는 연 90일 가족돌봄휴직과 연 10일 가족돌봄휴가를 쓸 수 있습니다. 무급 여부, 대상 가족, 분할 사용, 사업주 거부 예외까지 남녀고용평등법 기준으로 정리했습니다.',
  keywords: [
    '가족돌봄휴직',
    '가족돌봄휴가',
    '가족돌봄휴가 일수',
    '가족돌봄휴직 급여',
    '남녀고용평등법 22조의2',
    '가족돌봄 무급',
    '돌봄휴가 대상 가족',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '가족돌봄휴직·휴가 2026, 연 90일·10일 무급 사용법' }],
    title: '가족돌봄휴직·휴가 2026, 연 90일·10일 무급 사용법',
    description:
      '연 90일 가족돌봄휴직과 연 10일 가족돌봄휴가의 무급 원칙, 대상 가족, 분할 사용 규칙, 사업주 거부 예외를 남녀고용평등법 §22의2 기준으로 정리했습니다.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '가족돌봄휴직·휴가 2026, 연 90일·10일 무급 사용법',
    description: '가족돌봄휴직 연 90일, 가족돌봄휴가 연 10일. 모두 무급 원칙이며 남녀고용평등법 §22의2에 근거합니다.',
  },
};

const FAQ_ITEMS = [
  {
    question: '가족돌봄휴직과 가족돌봄휴가는 어떻게 다른가요?',
    answer:
      '가족돌봄휴직은 연간 최장 90일, 가족돌봄휴가는 연간 최대 10일입니다. 휴직은 1회당 30일 이상 단위로 나누어 사용해야 하고, 휴가는 1일 단위로 자유롭게 쓸 수 있습니다. 두 제도 모두 남녀고용평등법 §22의2에 근거한 무급 제도이며, 가족돌봄휴가 사용일수는 가족돌봄휴직 90일 한도 안에 포함되어 계산됩니다.',
  },
  {
    question: '급여는 정말 하나도 안 나오나요?',
    answer:
      '원칙적으로 무급입니다. 남녀고용평등법 §22의2는 가족돌봄휴직·휴가를 법정 유급휴가로 규정하지 않으므로, 별도 사규나 단체협약이 없다면 사업주에게 임금 지급 의무가 없습니다. 코로나19 시기에 한시적으로 지원됐던 가족돌봄비용 지원금은 종료되었고, 현재는 개별 회사의 사내 복지제도가 유일한 유급화 통로입니다.',
  },
  {
    question: '배우자의 부모(시부모·장인장모)도 대상 가족에 포함되나요?',
    answer:
      '네, 포함됩니다. 남녀고용평등법 §22의2의 대상 가족은 조부모, 부모, 배우자, 배우자의 부모, 자녀, 손자녀입니다. 시부모와 장인·장모는 "배우자의 부모"에 해당하므로 질병, 사고, 노령을 돌보기 위해 가족돌봄휴직이나 휴가를 신청할 수 있습니다. 다만 형제자매, 이모·삼촌 등은 포함되지 않습니다.',
  },
  {
    question: '회사가 거부할 수 있나요? 어떤 경우 안 되나요?',
    answer:
      '원칙적으로 사업주는 허용해야 하지만, 시행령상 예외 사유가 있으면 거부할 수 있습니다. 대표적으로 근로자의 계속근로기간이 6개월 미만이거나, 대체인력 채용이 불가능하고 정상적인 사업 운영에 중대한 지장이 생기는 경우입니다. 다만 거부하려면 사업주는 사유를 통지하고 시기 조정 등에 관해 근로자와 협의할 의무가 있습니다.',
  },
  {
    question: '가족돌봄휴직은 며칠 단위로 나눠 쓸 수 있나요?',
    answer:
      '나누어 사용할 수 있지만 1회당 최소 30일 이상이어야 합니다. 예를 들어 30일과 30일, 30일로 3회 분할해 90일을 채우거나, 45일과 45일 두 차례로 나누는 방식이 가능합니다. 반면 10일이나 20일 같은 짧은 기간은 가족돌봄휴직 요건을 충족하지 못하므로, 짧은 돌봄이 필요할 때는 1일 단위로 쓸 수 있는 가족돌봄휴가를 활용해야 합니다.',
  },
  {
    question: '가족돌봄휴가는 하루 단위로 자유롭게 쓸 수 있나요?',
    answer:
      '네, 1일 단위로 사용 가능합니다. 부모님 병원 동행, 아이의 갑작스러운 병원 방문 등 짧고 예측하기 어려운 돌봄에 특히 유용합니다. 연간 10일까지 쓸 수 있으며 연차와 별개로 부여됩니다. 다만 신청 시 돌봄 사유를 소명해야 하고, 사업주 승낙 절차가 필요하므로 가급적 사전에 인사팀과 조율하는 것이 좋습니다.',
  },
  {
    question: '가족돌봄휴가를 쓰면 가족돌봄휴직 90일이 그만큼 줄어드나요?',
    answer:
      '네, 줄어듭니다. 가족돌봄휴가 사용일수는 가족돌봄휴직 90일 한도에 포함되기 때문입니다. 예를 들어 가족돌봄휴가 10일을 모두 사용하면, 그해 남는 가족돌봄휴직 사용 가능 일수는 80일이 됩니다. 두 제도를 함께 계획한다면 연간 총 90일 상한을 기준으로 배분해야 소진 시점을 정확히 예측할 수 있습니다.',
  },
  {
    question: '재난·감염병 상황에서는 가족돌봄휴가가 더 늘어난다던데요?',
    answer:
      '감염병 확산 등 특수 상황에서 정부가 가족돌봄휴가 기간을 한시적으로 연장할 수 있는 특례가 있습니다. 실제 코로나19 시기에는 연 10일에 더해 추가 사용이 허용됐습니다. 다만 특례 발동 여부와 추가 일수는 그때그때 고용노동부 고시와 상황에 따라 달라지므로, 신청 전에 반드시 고용노동부나 사업장 인사팀에 확인해야 합니다.',
  },
];

export default function FamilyCareLeave2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '가족돌봄휴직·휴가 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '가족돌봄휴직·휴가 2026, 연 90일·10일 무급 사용법',
    description:
      '가족의 질병·사고·노령 시 근로자가 쓸 수 있는 가족돌봄휴직(연 90일)과 가족돌봄휴가(연 10일)의 무급 원칙, 대상 가족, 분할 사용 규칙, 사업주 거부 예외까지 남녀고용평등법 §22의2 기준으로 정리.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['가족돌봄휴직', '가족돌봄휴가', '남녀고용평등법 22조의2', '무급', '대상 가족'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '가족돌봄휴직·휴가 2026, 연 90일·10일 무급 사용법',
    description:
      '연 90일 가족돌봄휴직과 연 10일 가족돌봄휴가의 사용 규칙, 무급 원칙, 사업주 거부 예외를 정리한 근로자용 실무 가이드.',
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
                    { name: '가족돌봄휴직·휴가 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">근로 · 7분 읽기 · 2026-08-02</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  가족돌봄휴직·휴가 2026
                  <br />
                  <span className="text-2xl text-text-secondary">연 90일·10일 무급 사용법</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  부모가 갑자기 입원하거나 아이가 아플 때, 회사에 며칠쯤 자리를 비워야 하는데 연차만으로는 부족한 경우가 많습니다. 이럴 때 근로자가 법으로 보장받는 두 가지 제도가 가족돌봄휴직과 가족돌봄휴가입니다. 이 가이드는 각각 며칠까지 쓸 수 있는지, 급여는 나오는지, 어떤 가족을 돌볼 때 인정되는지, 회사가 거부할 수 있는 경우는 무엇인지까지 남녀고용평등법 §22의2 기준으로 정리했습니다.
                </p>
              </header>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">가족돌봄휴직·휴가란 무엇인가</h2>
                <p>
                  가족돌봄휴직·휴가는 가족의 질병, 사고, 노령 등을 사유로 근로자가 일정 기간 회사를 쉬면서 돌볼 수 있도록 법으로 보장한 제도입니다. 근거는 남녀고용평등과 일·가정 양립 지원에 관한 법률 §22의2(근로자의 가족 돌봄 등을 위한 지원)이며, 요건을 갖춘 근로자가 신청하면 사업주는 원칙적으로 허용해야 합니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">30초 요약(TL;DR)</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    · 가족돌봄휴직: 연간 최장 <strong>90일</strong>, 1회 <strong>30일 이상</strong> 단위로 분할 가능
                    <br />
                    · 가족돌봄휴가: 연간 최대 <strong>10일</strong>, <strong>1일 단위</strong> 사용 가능
                    <br />
                    · 두 제도 모두 <strong>무급</strong>이 원칙(별도 사규·단체협약 있으면 예외)
                    <br />
                    · 대상 가족: 조부모, 부모, 배우자, 배우자의 부모, 자녀, 손자녀
                    <br />
                    · 가족돌봄휴가 사용일수는 가족돌봄휴직 90일 한도에 <strong>포함</strong>
                  </p>
                </div>
                <p className="mt-4">
                  다만 두 제도는 유급 연차와 달리 임금이 지급되지 않는 것이 원칙이므로, 신청 전에 급여 손실 규모와 4대보험 처리 방식을 인사팀과 확인하는 것이 중요합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">며칠까지 쓸 수 있나?</h2>
                <p>
                  결론부터 말하면 가족돌봄휴직은 <strong>연 90일</strong>, 가족돌봄휴가는 <strong>연 10일</strong>까지 사용할 수 있습니다. 두 제도는 별개처럼 보이지만 실제로는 하나의 90일 상한을 공유합니다. 즉 가족돌봄휴가 사용일수는 가족돌봄휴직 90일 안에 포함되어 계산됩니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 가족돌봄휴직과 가족돌봄휴가 요약(남녀고용평등법 §22의2)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">구분</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">가족돌봄휴직</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">가족돌봄휴가</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">연간 상한</td>
                        <td className="p-3"><strong>90일</strong></td>
                        <td className="p-3"><strong>10일</strong>(휴직 90일에 포함)</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">최소 사용 단위</td>
                        <td className="p-3">1회당 30일 이상</td>
                        <td className="p-3">1일 단위</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">임금</td>
                        <td className="p-3">무급 원칙</td>
                        <td className="p-3">무급 원칙</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">전형적 활용</td>
                        <td className="p-3">장기 간병, 요양 동반</td>
                        <td className="p-3">병원 동행, 응급 상황</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  다만 90일이라는 상한은 연 단위로 리셋됩니다. 올해 90일을 모두 사용해도 이듬해 1월 1일부터 다시 90일이 새로 부여됩니다. 회사가 부여한 사규가 더 관대할 수도 있으므로 취업규칙과 단체협약을 함께 확인하세요.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">급여는 나오나?</h2>
                <p>
                  결론은 <strong>원칙적으로 무급</strong>입니다. 남녀고용평등법 §22의2는 가족돌봄휴직·휴가를 법정 유급휴가로 규정하지 않으므로, 사규나 단체협약에 별도 유급 조항이 없다면 사업주에게 임금 지급 의무가 없습니다. 육아휴직 급여처럼 고용보험이 지급하는 별도 급여 제도도 상시 운영되지는 않습니다.
                </p>
                <p className="mt-4">
                  단, 코로나19 확산 시기에는 정부가 한시적으로 가족돌봄비용 지원금을 신설해 하루 5만원 안팎을 지급했습니다. 이 지원은 지금은 종료되었으며, 재난·감염병 등 특수 상황에서 다시 발동될 수 있으므로 이슈가 발생하면 고용노동부 공지를 확인해야 합니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">신청 전 체크할 세 가지</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    1. 사규·단체협약에 유급 특약이 있는지 확인(공공기관·대기업 일부 존재)
                    <br />
                    2. 4대보험료 본인 부담분 처리 방식(급여 발생분에서 정산 vs 별도 납부)
                    <br />
                    3. 연차 소진 계획(무급 손실이 크면 연차·가족돌봄휴가·무급휴직 순으로 조합)
                  </p>
                </div>
                <p className="mt-4">
                  다만 무급이라 해도 근속기간은 그대로 인정됩니다. 퇴직금 산정 시에는 가족돌봄휴직 기간을 계속근로기간에 포함하는 것이 일반적이므로, 장기 간병이 필요할 때 유일한 법적 선택지로 활용도가 높습니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">어떤 가족을 돌볼 때 쓰나?</h2>
                <p>
                  대상 가족의 범위는 남녀고용평등법 §22의2에 열거되어 있습니다. 즉 아무 가족이나 다 되는 것이 아니라 법이 정한 관계에 한합니다.
                </p>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li>
                    <strong>조부모:</strong> 친조부모와 외조부모 모두 포함됩니다.
                  </li>
                  <li>
                    <strong>부모:</strong> 친부모, 양부모가 포함됩니다.
                  </li>
                  <li>
                    <strong>배우자:</strong> 법률혼 배우자를 의미합니다(사실혼은 회사·상황별 해석 차이).
                  </li>
                  <li>
                    <strong>배우자의 부모:</strong> 시부모, 장인·장모가 여기에 해당합니다.
                  </li>
                  <li>
                    <strong>자녀:</strong> 친자녀, 양자녀, 미성년·성년 모두 포함됩니다.
                  </li>
                  <li>
                    <strong>손자녀:</strong> 친손자녀, 외손자녀 모두 포함됩니다.
                  </li>
                </ul>
                <p className="mt-4">
                  사유는 대상 가족의 <strong>질병, 사고, 노령</strong>이 기본이며, 자녀 양육이 필요한 긴급 상황(예: 어린이집 휴원)도 가족돌봄휴가 신청 사유가 될 수 있습니다.
                </p>
                <p className="mt-4">
                  예외: 형제자매, 이모·삼촌, 조카 등은 법정 대상 가족에 포함되지 않습니다. 이들의 돌봄을 위해서는 연차, 무급휴직, 회사 자체 복지제도를 활용해야 합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">어떻게 나눠 쓰나?</h2>
                <p>
                  가족돌봄휴직은 <strong>1회당 30일 이상</strong> 단위로 나눠 쓸 수 있고, 가족돌봄휴가는 <strong>1일 단위</strong>로 자유롭게 쓸 수 있습니다. 두 제도를 어떻게 조합하느냐에 따라 잔여 일수가 달라지므로, 실제 사례로 확인하는 것이 가장 빠릅니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 1. 부모 입원 30일 휴직 + 자녀 병원 동행 3일 휴가</p>
                  <p className="text-sm text-text-secondary">
                    · 가족돌봄휴직 사용: 30일(1회 최소 30일 요건 충족)
                    <br />
                    · 가족돌봄휴가 사용: 3일(1일 단위)
                    <br />
                    · 사용 합계: 30일 + 3일 = <strong>33일</strong>
                    <br />
                    · 잔여 가족돌봄휴직: 90일 이하 33일 = <strong>57일</strong>
                    <br />
                    · 잔여 가족돌봄휴가: 10일 이하 3일 = <strong>7일</strong>
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 90일 한도 안에서 두 제도를 병행 가능. 급여는 33일 무급.</span>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 2. 배우자 수술 후 회복기 45일 휴직</p>
                  <p className="text-sm text-text-secondary">
                    · 가족돌봄휴직 사용: 45일(1회 최소 30일 요건 충족)
                    <br />
                    · 잔여 가족돌봄휴직: 90일 이하 45일 = <strong>45일</strong>(추가 30일 이상 단위로 사용 가능)
                    <br />
                    · 잔여 가족돌봄휴가: <strong>10일 그대로</strong>
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 한 해에 30일 단위로 3번(30+30+30)까지 분할하거나 45+45로 나누는 것도 가능.</span>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 3. 조부모 정기 병원 동행에 가족돌봄휴가 10일 소진</p>
                  <p className="text-sm text-text-secondary">
                    · 가족돌봄휴가 사용: 10일(1일씩 열 차례 분산)
                    <br />
                    · 잔여 가족돌봄휴가: <strong>0일</strong>(연간 한도 소진)
                    <br />
                    · 잔여 가족돌봄휴직: 90일 이하 10일 = <strong>80일</strong>
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 짧은 돌봄을 반복하면 휴가가 먼저 소진되고, 잔여 휴직 사용 여력은 80일로 줄어듦.</span>
                  </p>
                </div>
                <p className="mt-4">
                  다만 15일이나 20일처럼 30일에 못 미치는 기간이 필요할 때는 가족돌봄휴직 요건을 충족하지 못합니다. 이 경우 가족돌봄휴가(최대 10일) + 연차 + 무급휴직을 조합하는 방식으로 대체해야 합니다.
                </p>
              </section>

              <section className="space-y-6 border-t border-border-base pt-8" data-speakable>
                <h2 className="text-2xl font-bold">회사가 거부할 수 있나?</h2>
                <p>
                  원칙은 <strong>허용</strong>입니다. 남녀고용평등법 §22의2는 근로자가 요건을 갖춰 신청한 가족돌봄휴직·휴가를 사업주가 허용하도록 규정합니다. 다만 시행령상 예외 사유가 있으면 거부할 수 있으며, 실무상 대표적인 사유는 다음과 같습니다.
                </p>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li>
                    <strong>계속근로기간 6개월 미만:</strong> 입사 6개월이 안 된 신입 근로자는 신청 자체가 제한될 수 있습니다.
                  </li>
                  <li>
                    <strong>대체인력 채용 불가 + 사업 운영 중대 지장:</strong> 사업주가 대체인력을 채용하려 했으나 14일 이상 노력에도 채용하지 못했고, 근로자의 부재가 정상적인 사업 운영에 중대한 지장을 초래하는 경우 거부가 인정됩니다.
                  </li>
                  <li>
                    <strong>이미 다른 가족돌봄휴직·휴가 등을 사용 중인 경우:</strong> 근로자가 동시에 여러 돌봄 관련 휴직·휴가를 중복 신청할 때 조정이 필요합니다.
                  </li>
                </ul>
                <p className="mt-4">
                  거부하려면 사업주는 그 사유를 근로자에게 서면으로 통지하고, 시기 조정 등에 관해 근로자와 <strong>협의</strong>해야 합니다. 즉 "안 됨"이라고 통보만 하는 것은 법 위반이며, 정당한 사유 없이 신청을 거부하거나 불이익을 주면 관련 조문에 따라 과태료 부과 대상이 됩니다.
                </p>
                <p className="mt-4">
                  다만 거부 사유의 인정 여부는 사업장 규모, 대체인력 시장, 담당 업무 특성에 따라 다르게 판단됩니다. 거부가 부당하다고 판단되면 고용노동부(1350) 또는 관할 노동청에 진정을 넣을 수 있으며, 실제 다툼이 있을 때는 노무사 상담을 병행하는 것이 안전합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">가족돌봄휴직 vs 가족돌봄 근로시간 단축</h2>
                <p>
                  가족돌봄은 "쉬는 것" 외에 "일하는 시간을 줄이는" 방법도 있습니다. 남녀고용평등법 §22의3은 가족돌봄 등을 위한 근로시간 단축을 규정하며, 소득을 완전히 잃지 않으면서 돌봄 시간을 확보할 수 있어 실무상 병용도가 높습니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 2. 가족돌봄휴직과 가족돌봄 근로시간 단축 비교(남녀고용평등법 §22의2·§22의3)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">구분</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">가족돌봄휴직(§22의2)</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">가족돌봄 근로시간 단축(§22의3)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">형태</td>
                        <td className="p-3">완전히 쉬는 휴직</td>
                        <td className="p-3">주당 근로시간 15~30시간으로 단축</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">기간</td>
                        <td className="p-3">연 90일</td>
                        <td className="p-3">1년 이내(사유 있으면 연장 가능)</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">소득</td>
                        <td className="p-3">무급</td>
                        <td className="p-3">단축된 시간만큼 임금 비례 감소</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">적합 상황</td>
                        <td className="p-3">장기 간병, 상주 필요</td>
                        <td className="p-3">등하원 도움, 주기적 병원 동행</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  예외: 근로시간 단축은 사업장 규모나 업무 특성에 따라 거부 사유가 별도로 인정될 수 있으며, 단축 최소·최대 시간과 신청 절차도 시행령에 세부 규정이 있습니다. 실제 신청 전에 고용노동부 안내를 확인하고, 사규상 별도 요건이 있는지도 함께 살펴야 합니다.
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
                    <p className="mt-1 text-sm text-text-secondary">가족돌봄과 달리 유급인 육아휴직 급여 기준과 상한액.</p>
                  </Link>
                  <Link
                    href="/guide/childcare-reduced-hours-benefit-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">육아기 근로시간 단축 급여</div>
                    <p className="mt-1 text-sm text-text-secondary">근로시간을 줄이면서 소득을 지키는 대체 옵션.</p>
                  </Link>
                  <Link
                    href="/guide/annual-leave-allowance-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">연차수당 계산법</div>
                    <p className="mt-1 text-sm text-text-secondary">가족돌봄휴가 대신 연차를 소진할 때 임금 계산 방식.</p>
                  </Link>
                  <Link
                    href="/guide/spouse-childbirth-leave-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">배우자 출산휴가</div>
                    <p className="mt-1 text-sm text-text-secondary">출산 직후 배우자가 쓸 수 있는 유급 휴가 제도.</p>
                  </Link>
                  <Link
                    href="/guide/maternity-leave-benefit-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">출산전후휴가 급여</div>
                    <p className="mt-1 text-sm text-text-secondary">출산 전후 90일 유급 휴가와 급여 산정 기준.</p>
                  </Link>
                  <Link
                    href="/category/work/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">근로 계산기 모음</div>
                    <p className="mt-1 text-sm text-text-secondary">연봉 실수령액·퇴직금·연차수당 계산기 한번에.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 교육 목적으로 작성되었으며, 개인별 사업장 상황에 대한 노무 자문이 아닙니다. 실제 신청 절차, 사업주 거부 인정 여부, 특수 상황에서의 연장 특례 등은 관할 고용노동청 또는 노무사에게 확인해야 합니다. 재난·감염병 상황에서 가족돌봄휴가 기간이 한시적으로 연장될 수 있는 특례는 고용노동부 고시와 상황에 따라 달라집니다. 본 콘텐츠는 2026-08-02를 기준으로 작성되었으며, 법 개정 시 즉시 업데이트됩니다. 정확한 기준은 <strong>남녀고용평등과 일·가정 양립 지원에 관한 법률 §22의2(가족 돌봄 등을 위한 지원)</strong> 및 <strong>§22의3(가족돌봄 등을 위한 근로시간 단축)</strong>과 그 시행령을 따릅니다. AI 보조 작성 후 운영자 검수 완료.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터</a>,{' '}
                  <a href="https://www.moel.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">고용노동부</a>,{' '}
                  <a href="https://easylaw.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">찾기쉬운 생활법령정보</a>.
                </p>
              </section>

              <ShareButtons
                title="가족돌봄휴직·휴가 2026 가이드"
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