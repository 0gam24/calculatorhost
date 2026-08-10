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

const URL = 'https://calculatorhost.com/guide/annual-leave-usage-promotion-2026/';
const DATE_PUBLISHED = '2026-08-11';
const DATE_MODIFIED = '2026-08-11';

export const metadata: Metadata = {
  title: '연차 사용촉진제도 2026 | 절차·미사용수당 소멸 조건',
  description:
    '연차 사용촉진제도는 회사가 근로기준법 §61 절차를 지키면 미사용 연차수당 지급의무가 사라지는 제도입니다. 6개월 전 1차 서면 통보, 2개월 전 2차 지정 절차와 수당 소멸·유지 조건을 정리했습니다.',
  keywords: [
    '연차 사용촉진제도',
    '연차 사용촉진',
    '연차수당 소멸',
    '근로기준법 61조',
    '미사용 연차수당',
    '연차촉진 서면 통보',
    '연차 사용촉진 절차',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '연차 사용촉진제도 2026 절차와 미사용수당 소멸 조건' }],
    title: '연차 사용촉진제도 2026 | 절차·미사용수당 소멸 조건',
    description: '근로기준법 §61 절차를 지키면 미사용 연차수당 지급의무 소멸. 1차·2차 통보 절차 정리.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '연차 사용촉진제도 2026 절차·수당 소멸',
    description: '회사가 근로기준법 §61 서면 절차를 지키면 미사용 연차수당 지급의무가 사라집니다.',
  },
};

const FAQ_ITEMS = [
  {
    question: '연차 사용촉진제도가 무엇인가요?',
    answer:
      '연차 사용촉진제도는 회사가 근로기준법 §61에 정한 절차를 모두 이행했음에도 근로자가 연차를 쓰지 않아 소멸한 경우, 그 미사용 연차에 대한 수당 지급의무를 면제해 주는 제도입니다. 반대로 회사가 절차를 제대로 지키지 않으면 미사용 연차는 그대로 수당으로 지급해야 합니다.',
  },
  {
    question: '사용촉진 절차는 어떻게 진행되나요?',
    answer:
      '1년 이상 근속자의 연차(15일 기준)는 소멸 6개월 전을 기준으로 10일 이내에 회사가 근로자별 미사용 일수를 알려주고 사용 시기를 정해 통보하도록 서면으로 촉구합니다. 근로자가 시기를 정하지 않으면, 소멸 2개월 전까지 회사가 사용 시기를 지정해 서면으로 통보합니다. 이 두 단계를 모두 지켜야 적법한 촉진입니다.',
  },
  {
    question: '사내 게시판 공지로 촉진해도 되나요?',
    answer:
      '안 됩니다. 게시판이나 단체 메일 공지 같은 방식은 근로기준법 §61의 적법한 촉진으로 인정되지 않습니다. 반드시 근로자 개인별로 미사용 일수를 특정해 서면으로 통보하고 사용을 촉구해야 효력이 있습니다. 개별 서면 통보가 아니면 수당 지급의무가 소멸하지 않습니다.',
  },
  {
    question: '촉진했는데도 수당을 줘야 하는 경우가 있나요?',
    answer:
      '있습니다. 회사가 절차를 지켰더라도, 근로자가 지정된 날 출근해 일했는데 회사가 노무 수령을 명확히 거부하지 않았다면 그 연차는 사용된 것이 아니어서 수당을 지급해야 합니다. 대법원도 사용자가 노무 수령 거부 의사를 분명히 밝히지 않으면 촉진의 효력이 없다고 봅니다.',
  },
  {
    question: '입사 1년 미만 신입도 사용촉진 대상인가요?',
    answer:
      '네, 다만 절차의 시점이 다릅니다. 1년 미만 근로자에게 매월 발생하는 연차(최대 11일)에는 별도의 촉진 절차가 적용되며, 소멸 3개월 전 10일 이내 1차 통보, 1개월 전 2차 지정 통보 방식으로 진행됩니다. 이 역시 개별 서면 통보여야 합니다.',
  },
  {
    question: '미사용 연차수당은 어떻게 계산하나요?',
    answer:
      '미사용 연차수당은 통상적으로 남은 연차 일수에 1일 통상임금을 곱해 산정합니다. 예를 들어 미사용 연차가 5일이고 1일 통상임금이 12만원이면 60만원입니다. 사용촉진 절차가 적법하게 이루어져 연차가 소멸하면 이 수당 지급의무가 사라집니다.',
  },
  {
    question: '회사가 촉진을 안 하면 미사용 연차는 어떻게 되나요?',
    answer:
      '회사가 사용촉진 절차를 하지 않으면 미사용 연차는 소멸하지 않고 수당으로 남습니다. 즉 근로자는 쓰지 못한 연차만큼 수당을 청구할 수 있습니다. 사용촉진은 회사의 의무가 아니라 선택이며, 하지 않으면 수당 부담을 그대로 지게 됩니다.',
  },
  {
    question: '연차를 회사가 강제로 특정일에 쓰게 할 수 있나요?',
    answer:
      '사용촉진 2차 단계에서 회사가 사용 시기를 지정할 수는 있지만, 이는 근로자가 스스로 시기를 정하지 않았을 때의 보충적 조치입니다. 또한 근로자대표와의 서면 합의로 특정 근로일을 연차휴가로 갈음하는 대체휴가 제도(근로기준법 §62)는 별개이므로, 두 제도를 혼동하지 않아야 합니다.',
  },
];

export default function AnnualLeaveUsagePromotion2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '연차 사용촉진제도 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '연차 사용촉진제도 2026, 절차와 미사용수당 소멸 조건',
    description:
      '연차 사용촉진제도의 근로기준법 §61 절차. 6개월 전 1차 서면 통보, 2개월 전 2차 지정, 미사용 연차수당 소멸·유지 조건과 신입 사원 특례까지 정리.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['연차 사용촉진', '근로기준법 61조', '미사용 연차수당', '연차 소멸', '통상임금'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '연차 사용촉진제도 2026',
    description:
      '연차 사용촉진제도의 절차와 미사용 연차수당 소멸 조건을 근로기준법 §61로 정리한 실전 가이드.',
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
                    { name: '연차 사용촉진제도 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">직장인·인사 담당 · 7분 읽기 · 2026-08-11</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  연차 사용촉진제도 2026
                  <br />
                  <span className="text-2xl text-text-secondary">절차와 미사용수당 소멸 조건</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  연말이 다가오면 남은 연차와 수당을 두고 회사와 직원 모두 고민이 생깁니다. 연차 사용촉진제도는 회사가 근로기준법 §61의 절차를 지키면 미사용 연차에 대한 수당 지급의무가 사라지는 제도입니다. 이 가이드는 1차·2차 통보 절차, 수당이 소멸하는 조건과 여전히 지급해야 하는 예외, 신입 사원 특례까지 직장인과 인사 담당자 눈높이로 정리합니다.
                </p>
              </header>

              <AdSlot slot="guide-annual-leave-usage-promotion-top" format="horizontal" />

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">연차 사용촉진제도란 무엇인가요?</h2>
                <p>
                  연차 사용촉진제도는 회사가 근로자에게 남은 연차를 쓰도록 적극적으로 촉구하는 절차입니다. 근거는 근로기준법 §61(연차 유급휴가의 사용 촉진)입니다. 회사가 이 절차를 모두 이행했는데도 근로자가 연차를 쓰지 않아 소멸하면, 회사는 그 미사용 연차에 대한 수당을 지급하지 않아도 됩니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">핵심 요약</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    적법한 사용촉진 이행 + 근로자 미사용 = 미사용 연차수당 지급의무 소멸(근로기준법 §61). 절차를 어기면 수당은 그대로 남습니다.
                  </p>
                </div>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">사용촉진 절차는 어떻게 진행되나요?</h2>
                <p>
                  1년 이상 근속자의 연차(원칙 15일)는 회계연도 말이나 입사일 기준 소멸 시점을 기준으로 두 단계 절차를 거칩니다. 두 단계를 모두, 개별 서면으로 지켜야 적법합니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 연차 사용촉진 절차 (근로기준법 §61, 1년 이상 근속자)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">단계</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">시기</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">회사가 할 일</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">1차 촉구</td>
                        <td className="p-3">소멸 6개월 전 기준 10일 이내</td>
                        <td className="p-3">미사용 일수를 서면으로 알리고 사용 시기 지정·통보 요청</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">2차 지정</td>
                        <td className="p-3">소멸 2개월 전까지</td>
                        <td className="p-3">근로자가 미지정 시 회사가 사용 시기를 지정해 서면 통보</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p>
                  다만 신입(1년 미만) 근로자에게 매월 발생하는 연차에는 시점이 다른 별도 절차(소멸 3개월 전 1차, 1개월 전 2차)가 적용됩니다. 어느 경우든 게시판 공고가 아니라 개별 서면 통보여야 합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">수당이 소멸하는 경우와 남는 경우는?</h2>
                <p>
                  같은 미사용 연차라도 회사의 절차 이행 여부와 노무 수령 거부 여부에 따라 결과가 갈립니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 2. 상황별 미사용 연차수당 결과</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">상황</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">수당 지급의무</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">1차·2차 절차 이행 + 근로자 미사용</td>
                        <td className="p-3">소멸(지급의무 없음)</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">절차 일부 누락(게시판 공고 등)</td>
                        <td className="p-3">유지(수당 지급)</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">지정일에 출근해 근무, 회사가 노무 수령 거부 안 함</td>
                        <td className="p-3">유지(수당 지급)</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">근로자가 사용 시기를 정해 연차 사용</td>
                        <td className="p-3">해당 없음(정상 사용)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p>
                  예외: 회사가 절차를 지켰어도 지정일 출근을 방치하면 안 됩니다. 이 경우 근로가 이루어진 것으로 보아 수당을 지급해야 하므로, 회사는 지정일에 노무 수령 거부 의사를 명확히 해야 합니다.
                </p>
              </section>

              <AdSlot slot="guide-annual-leave-usage-promotion-mid" format="rectangle" />

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">미사용 연차수당은 얼마인가요? 계산 사례</h2>
                <p>
                  미사용 연차수당은 남은 연차 일수에 1일 통상임금을 곱해 계산합니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3">
                  <p className="font-semibold text-text-primary">사례. 미사용 연차 5일, 1일 통상임금 12만원</p>
                  <p className="text-sm text-text-secondary">
                    · 절차 미이행 시: 5일 × 12만원 = <strong>60만원</strong> 지급
                    <br />
                    · 적법 촉진 후 미사용 시: <strong>0원</strong>(지급의무 소멸)
                    <br />
                    <span className="text-xs text-text-tertiary">같은 5일이라도 회사가 §61 절차를 지켰는지에 따라 결과가 60만원과 0원으로 갈립니다.</span>
                  </p>
                </div>
                <p>
                  1일 통상임금은 월 통상임금을 월 소정근로시간으로 나눈 시급에 1일 소정근로시간을 곱해 산정합니다. 통상임금 범위(정기·일률·고정 수당 포함 여부)는 다툼이 잦으므로, 수당 계산 전 통상임금 구성부터 확인하는 것이 좋습니다.
                </p>
              </section>

              <h2 className="text-2xl font-bold mb-6">자주 묻는 질문</h2>
              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h3 className="text-lg font-semibold text-text-primary">관련 계산기 및 가이드</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link
                    href="/guide/annual-leave-allowance-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">연차수당 계산법</div>
                    <p className="mt-1 text-sm text-text-secondary">연차 개수와 통상임금으로 수당을 계산하세요.</p>
                  </Link>
                  <Link
                    href="/guide/ordinary-wage-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">통상임금이란</div>
                    <p className="mt-1 text-sm text-text-secondary">수당 계산의 기준이 되는 통상임금 범위.</p>
                  </Link>
                  <Link
                    href="/guide/weekly-holiday-allowance-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">주휴수당 계산</div>
                    <p className="mt-1 text-sm text-text-secondary">주 15시간 이상 근로 시 주휴수당 조건.</p>
                  </Link>
                  <Link
                    href="/guide/overtime-night-holiday-allowance-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">연장·야간·휴일수당</div>
                    <p className="mt-1 text-sm text-text-secondary">1.5배 가산 수당 계산 원리를 확인하세요.</p>
                  </Link>
                  <Link
                    href="/calculator/salary/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">연봉 실수령액 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">수당 포함 실수령액을 한눈에 확인하세요.</p>
                  </Link>
                  <Link
                    href="/category/work/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">근로·급여 가이드 모음</div>
                    <p className="mt-1 text-sm text-text-secondary">연차·수당·계약 관련 실전 가이드.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 교육 목적으로 작성되었으며 개인·기업 맞춤형 노무 자문이 아닙니다. 사용촉진 절차의 적법성, 통상임금 범위, 수당 소멸 여부는 사업장 사정과 판례에 따라 달라지므로, 실제 적용은 고용노동부 상담이나 공인노무사 자문으로 확인하세요. 인용 법령은 <strong>근로기준법 §60, §61, §62</strong>입니다. 본 콘텐츠는 2026-08-11 기준이며 법령·판례 변경 시 업데이트됩니다. AI 보조 작성 후 운영자 검수 완료.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터</a>,{' '}
                  <a href="https://www.moel.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">고용노동부</a>.
                </p>
              </section>

              <ShareButtons
                title="연차 사용촉진제도 2026 가이드"
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
