// [revenue-lever: guard] Correct work-pay guidance and protect existing search traffic.
import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { Footer } from '@/components/layout/Footer';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { FaqSection } from '@/components/calculator/FaqSection';
import { OvertimeAllowanceCalculator } from './OvertimeAllowanceCalculator';
import {
  buildBreadcrumbJsonLd,
  buildArticleJsonLd,
  buildWebPageJsonLd,
  buildFaqPageJsonLd,
  buildSpeakableJsonLd,
  buildSoftwareApplicationJsonLd,
} from '@/lib/seo/jsonld';

const URL = 'https://calculatorhost.com/guide/overtime-night-holiday-allowance-2026/';
const TITLE = '연장·야간·휴일수당 계산기 2026 | 시간별 가산수당';
const DESCRIPTION = '확인된 통상시급과 휴게를 뺀 실제 근로시간으로 연장·야간·휴일수당의 세전 참고금액을 계산합니다. 연장 50%, 야간 추가 50%, 휴일 하루 8시간 초과 100% 가산을 구분하고 근로분·가산분을 확인하세요. 성인 일반근로 및 근로기준법 제56조 적용 사업장 기준입니다.';
const DATE_PUBLISHED = '2026-06-26';
const DATE_MODIFIED = '2026-10-02';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: ['연장근로수당', '야간근로수당', '휴일근로수당', '수당 계산기', '통상시급', '근로기준법'],
  alternates: { canonical: URL },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: TITLE }],
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESCRIPTION },
};

const FAQ_ITEMS = [
  {
    question: '연장근로는 주 40시간만 넘으면 되나요?',
    answer: '일반적인 성인 근로에서는 휴게를 뺀 실제 근로가 일 8시간 또는 주 40시간을 넘는지를 확인합니다. 같은 시간을 일·주 기준으로 두 번 합산하면 안 됩니다. 이 계산기는 연장시간을 자동 판정하지 않으며 이미 확인한 연장근로시간을 입력합니다. 단시간·유연근로 등 별도 기준은 지원하지 않습니다.',
  },
  {
    question: '야간근로는 언제이며 연장수당과 곱하나요?',
    answer: '야간은 22시부터 다음 날 6시 사이의 실제 근로입니다. 연장 가산 50%와 중첩 야간 가산 50%를 더하므로 전부 야간인 연장은 근로분을 포함해 2배입니다. 통상시급 12,000원으로 2시간이면 48,000원이며 휴게시간은 제외합니다.',
  },
  {
    question: '소정근로 중 야간수당은 왜 0.5배만 나오나요?',
    answer: '소정 야간 유형은 기본임금이 이미 지급된다는 가정으로 추가 야간 가산분만 계산합니다. 통상시급 12,000원으로 야간 2시간이면 추가분은 12,000원입니다. 기본임금을 포함한 전체 근로대가나 최종 급여가 아니므로 연장·휴일 유형 결과와 그대로 비교하지 마세요.',
  },
  {
    question: '휴일 10시간은 모두 2배인가요?',
    answer: '아닙니다. 같은 휴일 하루의 실제 근로 중 처음 8시간은 1.5배, 초과분은 2배입니다. 통상시급 12,000원으로 야간 중첩 없이 10시간이면 144,000원과 48,000원을 합한 192,000원입니다. 별도 유급휴일분은 제외하며 여러 날의 시간을 합산하지 않습니다.',
  },
  {
    question: '일요일이나 회사 휴무일에 일하면 항상 휴일수당인가요?',
    answer: '요일이나 쉬는 날이라는 이유만으로 확정할 수 없습니다. 법정휴일이나 약정휴일인지 근로계약·취업규칙·근무 편성을 먼저 확인해야 합니다. 단순 휴무일은 휴일과 다를 수 있으며 일 8시간·주 40시간 초과 여부 등에 따라 연장근로를 따로 검토합니다.',
  },
  {
    question: '통상시급은 기본급만으로 계산하나요?',
    answer: '임금 명칭만으로 포함 여부를 결정하지 않습니다. 2024년 12월 19일 대법원 판결을 반영한 고용노동부 지침은 고정성을 독립 요건에서 제외하고 소정근로의 대가·정기성·일률성을 기준으로 판단합니다. 상여·식대·교통비도 지급 조건을 확인해야 하며 이 도구는 통상시급 자체를 산출하거나 판정하지 않습니다.',
  },
  {
    question: '이 금액이 실수령액이나 체불임금인가요?',
    answer: '아닙니다. 선택한 근로시간의 세전 참고 계산이며 공제·비과세·기지급수당·별도 유급휴일분·포괄임금 또는 보상휴가 정산은 계산하지 않습니다. 실수령액을 일정 비율로 추정하지 않고 지급 의무나 체불액도 확정하지 않습니다.',
  },
  {
    question: '어떤 사업장과 근로 유형에서 사용할 수 있나요?',
    answer: '근로기준법 제56조가 적용되는 사업장의 성인 일반근로를 가정합니다. 상시근로자 수 등 적용 여부는 별도로 확인해야 합니다. 5인 미만의 약정수당, 단시간근로, 18세 미만, 유연근로·특례·관리감독 등 별도 기준은 이 계산기의 지원 범위 밖입니다.',
  },
];

export default function OvertimeNightHolidayAllowancePage() {
  const jsonLd = [
    buildBreadcrumbJsonLd([
      { name: '홈', url: 'https://calculatorhost.com/' },
      { name: '가이드', url: 'https://calculatorhost.com/guide/' },
      { name: '연장·야간·휴일수당' },
    ]),
    buildArticleJsonLd({
      headline: TITLE, description: DESCRIPTION, url: URL,
      datePublished: DATE_PUBLISHED, dateModified: DATE_MODIFIED,
      authorName: '김준혁', authorUrl: 'https://calculatorhost.com/about/',
      image: 'https://calculatorhost.com/og-default.png',
      keywords: ['연장근로수당', '야간근로수당', '휴일근로수당', '통상시급'],
    }),
    buildWebPageJsonLd({ name: TITLE, description: DESCRIPTION, url: URL, datePublished: DATE_PUBLISHED, dateModified: DATE_MODIFIED }),
    buildSoftwareApplicationJsonLd({ name: TITLE, description: DESCRIPTION, url: URL }),
    buildFaqPageJsonLd([...FAQ_ITEMS]),
    buildSpeakableJsonLd(['[data-speakable]']),
  ];
  return (
    <>
      {jsonLd.map((item, index) => <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }} />)}
      <div className="min-h-screen bg-bg-base">
        <Header />
        <div className="flex">
          <Sidebar />
          <main id="main-content" className="min-w-0 flex-1 px-4 py-8 md:px-8">
            <article className="mx-auto max-w-4xl space-y-8">
              <header>
                <Breadcrumb items={[{ name: '홈', href: '/' }, { name: '가이드', href: '/guide/' }, { name: '연장·야간·휴일수당' }]} />
                <p className="mb-2 text-caption text-text-tertiary">근로수당 · 기준 확인 2026-10-02</p>
                <h1 className="mb-3 text-3xl font-bold tracking-tight sm:text-4xl">연장·야간·휴일수당 계산기 2026</h1>
                <p className="text-base leading-relaxed text-text-secondary" data-speakable>
                  통상시급·실제 근로시간으로 세전 근로분과 가산분을 확인하세요. 성인 일반근로·제56조 적용 사업장 기준입니다.
                </p>
              </header>

              <OvertimeAllowanceCalculator />

              <section className="space-y-4" aria-label="결과 해석">
                <h2 className="text-2xl font-semibold">결과에 포함된 금액부터 확인하세요</h2>
                <p data-speakable>
                  비휴일 연장과 휴일 유형은 입력한 실제 근로의 기본분과 가산분을 합합니다. 소정 야간은 이미 지급되는 기본임금을 제외하고 추가 야간 가산 0.5배만 표시합니다. 어느 결과도 월급 총액이나 아직 받을 차액을 의미하지 않습니다.
                </p>
                <p className="text-sm text-text-secondary">
                  별도 유급휴일분, 세금·보험 공제, 비과세 여부, 기지급수당, 포괄임금·보상휴가 정산과 체불임금 확정은 제외합니다. 실제 정산은 근로계약·급여명세서·근태 기록을 함께 확인해야 합니다.
                </p>
              </section>

              <details className="rounded-2xl border border-border-base bg-bg-card p-5">
                <summary className="min-h-12 cursor-pointer text-lg font-semibold">계산 기준과 예시</summary>
                <div className="mt-4 space-y-4 text-sm leading-relaxed" data-speakable>
                  <p>근로기준법 제56조의 최소 가산율을 사용합니다. 단체협약이나 계약에서 더 높은 가산율을 정한 경우는 자동 반영하지 않습니다.</p>
                  <ul className="list-disc space-y-2 pl-5">
                    <li>비휴일 연장: 통상시급 × 확인된 연장시간 × 1.5 + 통상시급 × 중첩 야간시간 × 0.5</li>
                    <li>휴일 하루: 통상시급 × 처음 8시간 × 1.5 + 통상시급 × 8시간 초과분 × 2 + 통상시급 × 중첩 야간시간 × 0.5</li>
                    <li>소정 야간: 통상시급 × 야간시간 × 0.5 — 이미 지급되는 기본임금 제외</li>
                  </ul>
                  <p>휴일근로의 8시간 초과분에 연장 가산 0.5배를 다시 더하지 않습니다. 야간 가산은 해당 시간만 별도로 더합니다.</p>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse text-sm">
                      <caption className="mb-2 text-left text-text-secondary">통상시급 12,000원, 휴게시간 제외 예시</caption>
                      <thead><tr className="border-b border-border-base"><th scope="col" className="p-3 text-left">근로 유형</th><th scope="col" className="p-3 text-right">세전 참고금액</th></tr></thead>
                      <tbody>
                        <tr className="border-b border-border-base"><td className="p-3">비휴일 연장 3시간, 야간 없음</td><td className="p-3 text-right">54,000원</td></tr>
                        <tr className="border-b border-border-base"><td className="p-3">비휴일 연장 2시간, 전부 야간</td><td className="p-3 text-right">48,000원</td></tr>
                        <tr className="border-b border-border-base"><td className="p-3">같은 휴일 10시간, 야간 없음</td><td className="p-3 text-right">192,000원</td></tr>
                        <tr><td className="p-3">소정 야간 2시간의 추가 가산분만</td><td className="p-3 text-right">12,000원</td></tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </details>

              <section className="space-y-4">
                <h2 className="text-2xl font-semibold">연장시간과 휴일 여부는 먼저 확인하세요</h2>
                <p data-speakable>일반적인 성인 근로는 휴게를 제외한 일 8시간 또는 주 40시간 초과를 확인합니다. 같은 시간을 두 번 합산하지 않으며 한 주의 기산점도 항상 월요일이라고 단정하지 않습니다. 이 도구는 근무표에서 연장시간을 찾아주거나 근로시간의 적법성을 판단하지 않습니다.</p>
                <p>일요일이나 회사 휴무일이 항상 법정휴일인 것은 아닙니다. 법정·약정휴일인지 계약·취업규칙·근무 편성에서 확인하세요. 휴일 유형은 같은 휴일 하루만 계산하며 여러 날을 합쳐 8시간 경계를 적용하면 안 됩니다.</p>
                <p className="text-sm text-text-secondary">야간은 22시부터 다음 날 6시 사이의 실제 근로입니다. 이 구간의 휴게는 빼고 입력하며 날짜를 넘긴 휴일 해당 여부가 불명확하면 1350 또는 전문가에게 먼저 확인하세요.</p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-semibold">통상시급은 임금 명칭만으로 정하지 않습니다</h2>
                <p data-speakable>고용노동부의 2025년 개정 통상임금 지침은 2024년 12월 19일 대법원 판결을 반영해 고정성을 독립 요건에서 제외하고, 소정근로의 대가·정기성·일률성을 기준으로 판단하도록 안내합니다. 상여·식대·교통비를 명칭만으로 모두 제외해서는 안 되며 지급 조건을 확인해야 합니다.</p>
                <p className="text-sm text-text-secondary">이 계산기는 통상임금에 포함되는 항목이나 시간급 환산 분모를 정하지 않습니다. 월 임금을 항상 209시간으로 나누지 말고 해당 근로조건에 맞게 확인한 통상시급을 입력하세요. 기지급 임금·수당이나 개별 권리 판정은 별도 정산이 필요합니다.</p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-semibold">지원 범위와 제외 조건</h2>
                <p>근로기준법 제56조가 적용되는 사업장의 성인 일반근로를 가정합니다. 상시근로자 수와 적용 여부는 먼저 확인하세요. 5인 미만의 약정수당, 단시간근로, 18세 미만, 유연근로·특례·관리감독 등 별도 기준은 지원하지 않습니다.</p>
                <p className="text-sm text-text-secondary">통상시급은 0~1,000,000원 정수, 시간은 한 근무일 0~24시간 및 소수 둘째 자리까지 입력할 수 있습니다. 소정 야간 모드는 총시간 최대 8시간만 지원하며 연장시간은 따로 구분해야 합니다. 야간시간은 실제 근로시간 이하이면서 최대 8시간입니다. 이는 도구의 입력 범위이며 적법한 근로시간이나 최저임금 충족을 뜻하지 않습니다. 세전 결과의 화면상 원단위 반올림은 참고 표시로 법정 정산의 절사 규칙을 확정하지 않습니다.</p>
              </section>

              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-3 border-t border-border-base pt-6">
                <h2 className="text-xl font-semibold">공식 출처와 확인일</h2>
                <ul className="space-y-2 text-sm">
                  <li><a href="https://law.go.kr/lsLinkCommonInfo.do?chrClsCd=010202&lsJoLnkSeq=1012828203" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">근로기준법 제56조 현행 조문 (2026-10-02 시행)</a></li>
                  <li><a href="https://1350.moel.go.kr/rtmview.do?id=1000072649" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">고용노동부 1350: 일·주 연장시간과 야간 중첩</a></li>
                  <li><a href="https://1350.moel.go.kr/rtmview.do?id=1000300802" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">고용노동부 1350: 휴일·휴무일 및 휴게 구분</a></li>
                  <li><a href="https://www.moel.go.kr/policy/policydata/view.do?bbs_seq=20250200285" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">개정 통상임금 노사지도 지침 (2025-02-06)</a></li>
                </ul>
                <p className="text-xs text-text-tertiary">2026-10-02 기준으로 위 조문과 자료를 대조했습니다. 개인의 지급 의무·정산·분쟁은 고용노동부 1350이나 노무사 등에게 근로조건과 증빙을 제시해 확인하세요.</p>
              </section>

              <section className="space-y-3 border-t border-border-base pt-6">
                <h2 className="text-xl font-semibold">함께 확인할 계산과 설명</h2>
                <ul className="space-y-2 text-sm">
                  <li><Link href="/calculator/salary/" className="text-primary-500 underline">연봉 실수령액 계산기</Link> — 전체 급여와 공제 조건을 별도로 입력해 확인하세요.</li>
                  <li><Link href="/guide/annual-leave-allowance-2026/" className="text-primary-500 underline">연차수당 계산법</Link></li>
                  <li><Link href="/guide/weekly-holiday-allowance-2026/" className="text-primary-500 underline">주휴수당 계산법</Link></li>
                </ul>
              </section>
            </article>
          </main>
        </div>
        <Footer />
      </div>
    </>
  );
}
