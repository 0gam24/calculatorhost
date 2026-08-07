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

const URL = 'https://calculatorhost.com/guide/inclusive-wage-system-2026/';
const DATE_PUBLISHED = '2026-08-08';
const DATE_MODIFIED = '2026-08-08';

export const metadata: Metadata = {
  title: '포괄임금제 2026, 야근수당 못 받나 무효 요건 정리',
  description:
    '포괄임금제라도 실제 근로가 약정 시간을 넘으면 초과분 수당을 추가로 청구할 수 있습니다. 유효하려면 근로자 동의와 불이익 없음, 시간외수당 명시가 필요합니다(근로기준법 §56·§17). 무효 판단 기준과 대응 방법을 사례로 정리했습니다.',
  keywords: [
    '포괄임금제',
    '포괄임금제 야근수당',
    '포괄임금제 무효 요건',
    '연장근로수당',
    '고정 시간외수당',
    '포괄임금제 최저임금',
    '근로기준법 56조',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '포괄임금제 2026, 야근수당과 무효 요건' }],
    title: '포괄임금제 2026, 야근수당 못 받나 무효 요건',
    description: '포괄임금제 유효 요건과 무효 시 초과근로 수당 청구, 최저임금 위반 판단까지 정리.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '포괄임금제 2026, 야근수당 못 받나 무효 요건',
    description: '포괄임금제 계약이어도 실근로가 약정을 넘으면 추가 수당 청구 가능. 요건과 대응법 정리.',
  },
};

const FAQ_ITEMS = [
  {
    question: '포괄임금제면 야근수당을 아예 못 받나요?',
    answer:
      '아닙니다. 실제 근로시간이 임금에 포함된 약정 시간을 넘으면 그 초과분에 대한 수당을 추가로 청구할 수 있습니다. 포괄임금제는 정해진 시간외수당을 미리 포함해 지급하는 방식일 뿐, 실근로가 약정을 초과했는데도 수당을 주지 않는 근거가 되지는 않습니다(근로기준법 §56).',
  },
  {
    question: '포괄임금제가 유효하려면 어떤 요건을 갖춰야 하나요?',
    answer:
      '근로자의 명시적 동의, 근로자에게 불리하지 않을 것, 포함되는 시간외근로와 그 수당액의 명확한 기재가 필요합니다. 판례는 근로시간 산정이 어려운 사정 등 유효성을 좁게 봅니다. 계약서에 시간외수당이 얼마나 포함됐는지 특정되지 않으면 포괄임금 약정으로 인정받기 어렵습니다.',
  },
  {
    question: '회사가 실제로 연장수당을 따로 주고 있으면 포괄임금제인가요?',
    answer:
      '그런 경우 포괄임금 약정으로 보기 어렵습니다. 실제로 연장·야간근로수당을 별도 정산해 지급하고 있다면, 임금에 수당이 미리 포함됐다는 포괄임금제의 전제가 성립하지 않기 때문입니다. 이때는 실근로에 따른 법정수당을 그대로 청구할 수 있습니다.',
  },
  {
    question: '포괄임금인데 기본급이 최저임금보다 낮으면 문제인가요?',
    answer:
      '문제가 될 수 있습니다. 고정 시간외수당을 제외한 기준 임금이 최저임금에 미달하면 최저임금법 위반 소지가 있습니다. 2026년 최저시급은 10,320원, 월 소정근로 209시간 기준 약 2,156,880원입니다. 총액이 아니라 최저임금 산입임금 기준으로 판단하므로 항목 구성을 확인해야 합니다.',
  },
  {
    question: '포괄임금 약정이 무효이면 어떻게 되나요?',
    answer:
      '무효인 부분은 근로기준법 기준으로 대체됩니다(근로기준법 §15). 즉 미리 포함했다던 수당과 무관하게 실제 연장·야간·휴일근로에 대한 법정 가산수당을 다시 계산해 청구할 수 있습니다. 이미 받은 고정수당은 정산 과정에서 공제될 수 있습니다.',
  },
  {
    question: '수당을 못 받았다면 어떻게 대응하나요?',
    answer:
      '먼저 근로계약서와 급여명세서로 약정 시간과 실근로 시간을 비교해 근거를 모으세요. 출퇴근 기록, 업무 지시 메시지 등이 증거가 됩니다. 그다음 사업장 관할 고용노동청에 임금체불 진정을 제기하거나 노무사·노동청 상담을 이용할 수 있습니다.',
  },
  {
    question: '연봉계약서에 "제수당 포함"이라고만 적혀 있으면 포괄임금인가요?',
    answer:
      '그 문구만으로는 유효한 포괄임금 약정으로 보기 어렵습니다. 어떤 수당이 몇 시간분 포함됐는지 특정되지 않은 포괄 문구는 근로자에게 불리하게 해석되지 않습니다. 시간외근로 시간과 금액이 명확히 기재돼 있어야 약정으로 인정될 여지가 커집니다.',
  },
];

export default function InclusiveWageSystemPage() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '포괄임금제 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '포괄임금제 2026, 야근수당 못 받나 무효 요건과 대응법',
    description:
      '포괄임금제의 유효 요건, 실근로 초과 시 추가 수당 청구, 최저임금 위반 판단, 무효 시 법정수당 재계산과 대응 방법까지 정리한 근로자 실무 가이드.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['포괄임금제', '야근수당', '무효 요건', '연장근로수당', '최저임금'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '포괄임금제 2026',
    description:
      '포괄임금제 유효 요건, 야근수당 추가 청구, 최저임금 위반 판단, 무효 시 대응 방법.',
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
                    { name: '포괄임금제 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">직장인·근로자 · 8분 읽기 · 2026-08-08</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  포괄임금제 2026
                  <br />
                  <span className="text-2xl text-text-secondary">야근수당 못 받나, 무효 요건 정리</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  "우리 회사는 포괄임금제라 야근수당이 없다"는 말을 듣고 그냥 넘어간 적이 있나요. 이 가이드는 야근이 잦은 직장인을 위해, 포괄임금제가 실제로 무엇이고 어떤 경우에 무효가 되는지, 그리고 초과근무 수당을 추가로 받을 수 있는지 판단 기준과 대응 순서를 정리했습니다.
                </p>
              </header>

              <AdSlot slot="guide-inclusive-wage-system-top" format="horizontal" />

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">포괄임금제란 무엇인가</h2>
                <p>
                  포괄임금제는 기본급에 연장·야간·휴일근로 수당을 미리 포함해 일정액으로 지급하는 임금 지급 방식입니다. 매달 실제 근로시간을 일일이 계산하지 않고 정해진 시간외수당을 고정으로 지급한다는 개념입니다. 다만 이는 법으로 정한 제도가 아니라 판례로 그 유효성이 판단되는 계약 형태입니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">30초 요약</p>
                  <ul className="mt-2 ml-5 list-disc text-sm text-text-secondary space-y-1">
                    <li>실근로가 약정 시간을 넘으면 초과분 수당 추가 청구 가능</li>
                    <li>유효 요건: 근로자 동의, 불이익 없음, 시간외수당 명확 기재</li>
                    <li>고정수당 제외 기준임금이 최저임금 미달이면 위반 소지</li>
                    <li>무효 시 실근로 기준으로 법정수당 재계산(근로기준법 §56)</li>
                  </ul>
                </div>
                <p>
                  즉 포괄임금제 자체가 불법은 아니지만, "포괄임금이니 무조건 공짜 야근"이라는 주장은 성립하지 않습니다. 핵심은 계약에 무엇이 얼마나 포함됐는지, 그리고 실제 근로가 그 범위를 넘었는지입니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">포괄임금제면 야근수당을 못 받나</h2>
                <p>
                  실근로가 약정 시간을 넘으면 초과분은 받을 수 있습니다. 포괄임금에 포함된 시간외근로 시간이 예를 들어 월 20시간인데 실제로 40시간을 일했다면, 초과한 20시간에 대한 가산수당은 별도로 청구할 수 있습니다(근로기준법 §56).
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 1. 약정 초과 근로</p>
                  <p className="text-sm text-text-secondary">
                    · 계약: 월 고정 연장수당에 연장근로 20시간분 포함
                    <br />
                    · 실제: 이달 연장근로 40시간 수행
                    <br />
                    · 결과: 초과한 20시간분은 통상시급 × 1.5배로 추가 청구 가능
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 포함된 시간을 넘긴 실근로는 별도 수당 대상입니다.</span>
                  </p>
                </div>
                <p className="mt-4">
                  다만 실근로가 약정 범위 안이라면 추가 청구가 어렵습니다. 그래서 계약서에 몇 시간분이 포함됐는지, 그리고 내 실근로 기록이 얼마인지를 비교하는 것이 출발점입니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">유효 요건은 무엇인가</h2>
                <p>
                  포괄임금 약정이 유효하려면 다음 조건이 필요합니다. 하나라도 결여되면 약정의 효력이 부정될 수 있습니다(근로기준법 §17 근로조건 명시).
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 포괄임금 약정 유효 요건</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">요건</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">내용</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">명시적 동의</td>
                        <td className="p-3">근로자가 포괄임금 방식에 명확히 동의</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">불이익 없음</td>
                        <td className="p-3">법정수당보다 근로자에게 불리하지 않을 것</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">수당 명확 기재</td>
                        <td className="p-3">포함된 시간외근로 시간과 금액을 특정</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  예외: 판례는 근로시간 산정이 실제로 어려운 사정이 있는지 등을 따져 유효성을 좁게 인정하는 경향이 있습니다. "제수당 포함"처럼 두루뭉술한 문구만으로는 유효한 약정으로 보기 어렵습니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">최저임금 위반은 어떻게 확인하나</h2>
                <p>
                  고정 시간외수당을 제외한 기준 임금이 최저임금에 미달하면 문제가 됩니다. 총 지급액이 커 보여도 최저임금 산입임금 기준으로 미달하면 최저임금법 위반 소지가 있습니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 2. 최저임금 점검</p>
                  <p className="text-sm text-text-secondary">
                    · 월 포괄임금 총액: 250만원(그중 고정 연장수당 40만원 포함)
                    <br />
                    · 최저임금 판단용 기준 임금: 250만원 − 40만원 = 210만원
                    <br />
                    · 2026년 최저 월급(209시간): 10,320원 × 209시간 = 2,156,880원
                    <br />
                    · 210만원은 2,156,880원 미만이므로 최저임금 위반 소지
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 총액이 아니라 산입임금 기준으로 최저임금을 비교해야 합니다.</span>
                  </p>
                </div>
                <p className="mt-4">
                  다만 최저임금 산입 범위는 상여·복리후생비 등 항목별로 규정이 있어 사안마다 다릅니다. 정확한 판단은 급여명세서 항목을 기준으로 노무 전문가나 고용노동부에 확인하는 것이 안전합니다.
                </p>
              </section>

              <AdSlot slot="guide-inclusive-wage-system-mid" format="rectangle" />

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">수당을 못 받았다면 어떻게 대응하나</h2>
                <p>
                  근거를 모으는 것이 먼저입니다. 근로계약서의 약정 시간과 실제 근로 기록을 비교해 초과분을 확인한 뒤, 정해진 절차로 청구하면 됩니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">대응 절차</p>
                  <ol className="ml-5 list-decimal text-sm text-text-secondary space-y-1">
                    <li>근로계약서·급여명세서에서 포함된 시간외근로 시간·금액 확인</li>
                    <li>출퇴근 기록, 업무 지시 메시지 등으로 실근로 시간 입증자료 정리</li>
                    <li>회사에 초과분 정산을 서면으로 요청</li>
                    <li>미해결 시 관할 고용노동청에 임금체불 진정 제기</li>
                    <li>필요 시 공인노무사·노동청 무료 상담 활용</li>
                  </ol>
                </div>
                <p className="mt-4">
                  주의: 임금채권은 소멸시효가 있으므로 오래 방치하면 청구가 어려워질 수 있습니다. 초과근로가 반복된다면 그때그때 기록을 남겨 두는 습관이 가장 강력한 대비책입니다.
                </p>
              </section>

              <h2 className="text-2xl font-bold mb-6">자주 묻는 질문</h2>
              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h3 className="text-lg font-semibold text-text-primary">관련 계산기 및 가이드</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link
                    href="/guide/overtime-night-holiday-allowance-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">연장·야간·휴일수당 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">1.5배 가산수당 계산의 기본을 익히세요.</p>
                  </Link>
                  <Link
                    href="/guide/ordinary-wage-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">통상임금 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">가산수당의 기준이 되는 통상임금 개념 정리.</p>
                  </Link>
                  <Link
                    href="/guide/minimum-wage-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">2026 최저임금 10,320원</div>
                    <p className="mt-1 text-sm text-text-secondary">월급 환산과 최저임금 위반 판단 기준.</p>
                  </Link>
                  <Link
                    href="/guide/weekly-holiday-allowance-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">주휴수당 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">주 15시간 이상 근무 시 받는 유급휴일수당.</p>
                  </Link>
                  <Link
                    href="/calculator/salary/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">연봉 실수령액 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">세후 월급과 4대보험 공제를 계산해보세요.</p>
                  </Link>
                  <Link
                    href="/guide/category/work/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">근로 가이드 모음</div>
                    <p className="mt-1 text-sm text-text-secondary">수당·연차·퇴직금 등 근로 관련 가이드.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 교육 목적으로 작성되었으며 개인 맞춤형 노무 조언이 아닙니다. 포괄임금 약정의 유효성은 계약 내용과 근로 실태에 따라 개별적으로 판단되며, 최저임금 산입 범위·소멸시효 등은 사안마다 다릅니다. 실제 분쟁은 근로계약서·급여명세서를 근거로 고용노동부 또는 공인노무사와 상담해 확인하세요. 본 콘텐츠는 2026-08-08 기준이며, 인용 법조항은 <strong>근로기준법 §56(연장·야간 및 휴일 근로), §17(근로조건의 명시), §15(위반 근로계약)</strong>입니다. AI 보조 작성 후 운영자 검수 완료.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.moel.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">고용노동부</a>,{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터</a>.
                </p>
              </section>

              <ShareButtons
                title="포괄임금제 2026 야근수당·무효 요건 가이드"
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
