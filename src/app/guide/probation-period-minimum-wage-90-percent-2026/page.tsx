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

const URL = 'https://calculatorhost.com/guide/probation-period-minimum-wage-90-percent-2026/';
const DATE_PUBLISHED = '2026-08-07';
const DATE_MODIFIED = '2026-08-07';

export const metadata: Metadata = {
  title: '수습기간 최저임금 90% 2026, 9,288원 조건과 예외',
  description:
    '수습근로자 최저임금 90%(2026년 시급 9,288원) 감액은 최저임금법 제5조 제2항에 따라 1년 이상 계약, 3개월 이내, 비단순노무직 3요건을 모두 갖춰야 합니다. 사례와 대응까지 정리.',
  keywords: [
    '수습 최저임금 90%',
    '수습기간 최저임금',
    '수습 감액',
    '2026 최저임금 9288원',
    '수습 3개월 최저임금',
    '단순노무직 최저임금',
    '수습 90퍼 합법',
    '최저임금법 5조',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [
      {
        url: '/og-default.png',
        width: 1200,
        height: 630,
        alt: '수습기간 최저임금 90% 2026, 9,288원 조건과 예외',
      },
    ],
    title: '수습기간 최저임금 90% 2026, 9,288원 조건과 예외',
    description:
      '2026년 최저임금 10,320원 기준 수습 90%는 시급 9,288원. 1년 이상 계약, 3개월 이내, 비단순노무직 3요건 모두 충족해야 합법입니다.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '수습기간 최저임금 90% 2026, 9,288원 합법 조건',
    description:
      '수습 감액 3요건(1년 이상 계약·3개월 이내·비단순노무). 편의점·주방보조 등 단순노무직은 수습이라도 100% 지급해야 합니다.',
  },
};

const FAQ_ITEMS = [
  {
    question: '수습이면 무조건 최저임금 90%만 줘도 되나요?',
    answer:
      '아닙니다. 최저임금법 제5조 제2항과 시행령 제3조에 따라 3가지 요건을 모두 충족한 경우에만 90% 감액이 허용됩니다. 근로계약 기간이 1년 이상이고, 수습 시작 후 3개월 이내이며, 단순노무 종사자가 아닌 경우입니다. 한 가지라도 어긋나면 수습이라도 최저임금 100%인 시급 10,320원(2026년)을 지급해야 합니다.',
  },
  {
    question: '2026년 수습 최저시급은 정확히 얼마인가요?',
    answer:
      '9,288원입니다. 2026년 최저임금 10,320원의 90% 금액으로, 시급 계산 시 반올림 없이 정확히 적용됩니다. 주 40시간 기준 월 환산(209시간) 시 약 1,941,192원이며, 이보다 낮게 지급하면 최저임금법 위반입니다.',
  },
  {
    question: '수습 시작 후 3개월이 지나도 계속 90%로 받아도 되나요?',
    answer:
      '안 됩니다. 수습 시작일로부터 3개월이 지나면 사용자는 최저임금 전액인 10,320원 이상을 지급해야 합니다. 회사 내부 규정으로 수습기간을 6개월로 정했더라도 최저임금 감액 특례는 3개월까지만 유효합니다. 3개월 초과분에 대해서는 미달액 청구가 가능합니다.',
  },
  {
    question: '6개월 계약직인데 수습이라며 90%만 받고 있어요, 합법인가요?',
    answer:
      '위법입니다. 근로계약 기간이 1년 미만이면 수습 여부와 무관하게 최저임금 100%를 지급해야 합니다. 3개월, 6개월, 11개월짜리 기간제 계약 모두 마찬가지입니다. 밀린 차액은 최저임금법 제6조에 근거해 청구할 수 있으며, 사용자에게는 최저임금법 제28조에 따른 처벌 조항이 적용될 수 있습니다.',
  },
  {
    question: '편의점 알바나 주방보조도 수습 90% 대상인가요?',
    answer:
      '해당되지 않습니다. 한국표준직업분류상 대분류 9(단순노무 종사자)에 속하는 직무는 수습이라도 최저임금 100%를 지급해야 합니다. 편의점 판매원, 마트 계산원, 주방보조, 청소원, 주유원, 택배·배달 단순업무, 건설 단순노무 등이 대표적입니다. 이 감액 제외는 2018년 3월 최저임금법 개정으로 명문화됐습니다.',
  },
  {
    question: '수습 감액이 되는 직군인지 어떻게 판단하나요?',
    answer:
      '한국표준직업분류를 기준으로 판단합니다. 사무직, 영업직, 관리직, 전문직, 기술직, 서비스 관리 등은 감액 대상이 될 수 있습니다. 판단이 애매하면 고용노동부 고객상담센터(국번 없이 1350) 또는 관할 지방고용노동청에 직무 내용을 설명하고 확인받는 것이 안전합니다. 사업주 자의 판단이 아닌 실제 담당 업무 성격이 기준입니다.',
  },
  {
    question: '수습 90% 미만을 받았다면 어떻게 대응하나요?',
    answer:
      '먼저 근로계약서와 급여명세서로 실지급액을 확인하고, 회사에 미달분 지급을 서면으로 요청합니다. 응하지 않으면 관할 지방고용노동청에 진정 또는 고소를 접수할 수 있습니다. 최저임금법 제28조에 따라 최저임금 미달 지급 시 3년 이하 징역 또는 2천만원 이하 벌금이 부과될 수 있으며, 임금채권 소멸시효는 3년이므로 3년 이내 청구해야 합니다.',
  },
  {
    question: '근로계약서에 90% 감액을 서명했다면 이의제기가 어려운가요?',
    answer:
      '가능합니다. 최저임금은 강행규정이므로 근로자가 서명했더라도 3요건(1년 이상 계약, 3개월 이내, 비단순노무직)을 갖추지 못한 감액은 무효입니다. 최저임금법 제6조 제3항은 최저임금에 미달하는 근로계약 부분은 무효로 하며 최저임금액과 동일한 임금을 정한 것으로 본다고 명시합니다. 서명 여부와 관계없이 차액 청구가 가능합니다.',
  },
];

export default function ProbationPeriodMinimumWage90Percent2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '수습기간 최저임금 90% 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '수습기간 최저임금 90% 2026, 9,288원 조건과 예외',
    description:
      '2026년 수습근로자 최저임금 90%(시급 9,288원) 감액은 1년 이상 계약, 3개월 이내, 비단순노무직 3요건을 모두 갖춰야 합법입니다. 계산 사례와 위반 시 대응 절차까지 정리.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['수습 최저임금 90%', '수습기간 최저임금', '9288원', '단순노무직', '최저임금법 5조'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '수습기간 최저임금 90% 2026',
    description:
      '수습근로자 최저임금 90% 감액의 3가지 요건, 2026년 9,288원 기준 계산 사례, 위반 시 대응 방법 완전 정리.',
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
                    { name: '수습기간 최저임금 90% 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">신입·수습 근로자 · 8분 읽기 · 2026-08-07</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  수습기간 최저임금 90% 2026
                  <br />
                  <span className="text-2xl text-text-secondary">시급 9,288원 합법 조건과 예외</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  회사에서 수습이라며 최저시급의 90%만 지급하는 경우가 여전히 흔합니다. 결론부터 말하면, 수습 감액은 최저임금법 제5조 제2항과 시행령 제3조에 따라 세 가지 요건을 모두 갖췄을 때에만 합법입니다. 이 글에서는 2026년 최저임금 10,320원 기준 수습 90%인 9,288원이 어떤 경우에만 적용되는지, 계약직·편의점·주방보조는 왜 100%를 받아야 하는지, 미달 지급 시 어떻게 대응할 수 있는지 절차와 계산 사례로 정리했습니다.
                </p>
              </header>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">수습이면 최저임금 90%만 줘도 되나요</h2>
                <p>
                  전제 조건이 모두 맞을 때만 허용됩니다. 최저임금법 제5조 제2항은 수습 사용 중인 자에 대해 최저임금액과 다른 금액으로 최저임금을 정할 수 있다고 규정하고, 시행령 제3조가 감액 폭을 10퍼센트로 명시합니다. 즉 2026년 최저시급 10,320원의 90퍼센트인 9,288원이 하한선이며, 이 금액 아래로는 어떤 명목으로도 지급할 수 없습니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">2026년 수습 감액 3요건 요약</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    · 근로계약 기간이 1년 이상일 것
                    <br />
                    · 수습 시작 후 3개월 이내일 것
                    <br />
                    · 단순노무 종사자(한국표준직업분류 대분류 9)가 아닐 것
                    <br />
                    → 세 요건 중 하나라도 어긋나면 수습이라도 시급 10,320원 이상 지급 필수
                  </p>
                </div>
                <p className="mt-4">
                  다만, 회사 내규로 수습기간을 6개월 또는 1년으로 늘려도 최저임금 감액이 허용되는 구간은 최초 3개월뿐입니다. 나머지 기간은 신입이라 하더라도 최저임금 전액이 강행됩니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">수습 90% 감액이 되는 3가지 조건은 무엇인가요</h2>
                <p>
                  하나라도 빠지면 감액이 무효입니다. 아래 표는 세 조건을 최저임금법·시행령 조항과 함께 정리한 것으로, 사업주가 반드시 모두 입증해야 합니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">
                      표 1. 수습 최저임금 90% 감액의 3요건 (최저임금법 제5조 제2항, 시행령 제3조)
                    </caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">요건</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">충족 기준</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">어긋날 경우</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">계약 기간</td>
                        <td className="p-3">근로계약 기간 <strong>1년 이상</strong></td>
                        <td className="p-3">6개월·11개월 계약직은 100% 지급</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">수습 기간</td>
                        <td className="p-3">수습 시작 후 <strong>3개월 이내</strong></td>
                        <td className="p-3">4개월차부터는 100% 지급</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">직무 성격</td>
                        <td className="p-3">단순노무 종사자가 아닐 것</td>
                        <td className="p-3">편의점·주방보조 등은 첫날부터 100%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  주의할 점: 세 요건은 사업주가 입증할 책임이 있습니다. 근로계약서에 계약 기간이 명시되지 않았거나, 수습 시작일이 불분명하거나, 담당 업무가 사실상 단순노무라면 감액 자체가 성립하지 않습니다.
                </p>
                <p className="mt-4">
                  다만, 감액이 인정되더라도 최저임금의 90퍼센트 미만으로는 절대 낮출 수 없습니다. 근로계약서에 60~80퍼센트로 표기되어 있다면 그 자체로 최저임금법 위반입니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">2026년 수습 90% 실제 계산 사례</h2>
                <p>
                  아래 세 가지 사례로 요건 충족 여부에 따른 실제 지급액이 어떻게 달라지는지 살펴봅니다. 모두 2026년 최저시급 10,320원 기준입니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 1. 정규직 사무직 신입 (감액 가능)</p>
                  <p className="text-sm text-text-secondary">
                    · 계약 형태: 정규직(기간 정함 없음), 사무 관리 직무
                    <br />
                    · 수습 기간: 2026년 3월 2일 입사, 3개월 수습 명시
                    <br />
                    · 3요건 확인: 1년 이상 근로계약 충족, 수습 3개월 이내 충족, 비단순노무직 충족
                    <br />
                    · 적용 시급: 10,320원 × 90퍼센트 = <strong>9,288원</strong>
                    <br />
                    · 월 환산(209시간): 9,288원 × 209 = <strong>1,941,192원</strong>
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 5월 31일까지 9,288원 지급 합법. 6월 1일부터는 10,320원 이상 지급 의무.</span>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 2. 6개월 기간제 계약직 (감액 불가)</p>
                  <p className="text-sm text-text-secondary">
                    · 계약 형태: 6개월 기간제 계약직, 사무 보조 직무
                    <br />
                    · 회사 주장: 첫 2개월은 수습이므로 90퍼센트 지급
                    <br />
                    · 3요건 확인: 계약 기간 1년 미만이므로 요건 불충족
                    <br />
                    · 적용 시급: <strong>10,320원 100퍼센트 지급 의무</strong>
                    <br />
                    · 만약 9,288원을 지급받았다면 차액: (10,320 − 9,288) × 근로시간 = 시간당 1,032원 미달
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 계약 기간이 1년 미만이면 수습 명목의 감액은 위법. 밀린 차액은 최저임금법 제6조 제3항에 근거해 청구 가능.</span>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 3. 편의점 아르바이트 (감액 불가)</p>
                  <p className="text-sm text-text-secondary">
                    · 계약 형태: 1년 근로계약, 편의점 판매·계산 업무
                    <br />
                    · 회사 주장: 입사 첫달은 수습이므로 90퍼센트 적용
                    <br />
                    · 3요건 확인: 한국표준직업분류 대분류 9(단순노무 종사자)에 해당하므로 감액 대상 제외
                    <br />
                    · 적용 시급: <strong>첫날부터 10,320원 100퍼센트 지급 의무</strong>
                    <br />
                    · 미달 시 차액: 시간당 1,032원 × 근로시간 = 청구 가능
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 편의점·마트 계산원·주방보조·청소원·주유원 등은 2018년 3월 이후 감액 제외 확정.</span>
                  </p>
                </div>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">3개월이 지나도 90%인 경우가 있나요</h2>
                <p>
                  없습니다. 최저임금법 시행령 제3조가 정한 감액 적용 기간은 수습 사용 후 3개월 이내로 명확히 한정됩니다. 회사 내부 규정으로 수습기간을 6개월 또는 1년으로 늘려 정했다 하더라도 최저임금 감액 특례는 3개월까지만 유효합니다.
                </p>
                <p className="mt-4">
                  예를 들어 6개월 수습을 두는 회사에 정규직으로 입사한 신입이 있다면, 첫 3개월은 9,288원이 합법이지만 4개월차부터 6개월차까지는 반드시 최저임금 10,320원 이상을 받아야 합니다. 이 기간에 지급된 차액은 나중에 소급 청구가 가능합니다.
                </p>
                <p className="mt-4">
                  다만, 회사가 별도의 인센티브·상여금·능력급 등을 지급하는 경우 최저임금 산입 여부는 별도로 판단됩니다. 급여명세서에서 기본급만 최저임금 이상인지 확인하는 것이 중요합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">계약직·아르바이트도 수습 감액 대상인가요</h2>
                <p>
                  계약 기간이 1년 이상이면 대상이 되고, 1년 미만이면 불가능합니다. 이 조건은 정규직·계약직·아르바이트 구분과 무관하게 오직 근로계약서에 적힌 계약 기간을 기준으로 판단합니다.
                </p>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li>
                    <strong>1년 계약 아르바이트:</strong> 카페 홀서빙(단순노무 아닌 경우)으로 12개월 계약을 맺었다면 첫 3개월 감액 가능. 다만 담당 업무가 사실상 주방보조·설거지 위주라면 단순노무로 재분류될 수 있습니다.
                  </li>
                  <li>
                    <strong>6개월·11개월 계약직:</strong> 감액 불가. 최저임금 100퍼센트 지급 필수. 회사가 편법으로 3개월씩 갱신 계약을 반복하는 경우 실질적 근로관계는 계속되는 것으로 판단될 수 있습니다.
                  </li>
                  <li>
                    <strong>수습 기간만 별도 계약:</strong> 본계약 1년 이상이라도 수습을 3개월짜리 별도 계약으로 체결한 경우, 별도 계약서만 놓고 보면 1년 미만이라 감액이 무효라는 해석 논란이 있습니다. 이 경우 관할 지방고용노동청 문의가 안전합니다.
                  </li>
                </ul>
                <p className="mt-4">
                  예외: 이른바 임시직·일용직 형태로 계약 기간이 없거나 짧게 반복되는 경우는 수습 감액 자체를 적용할 수 없습니다. 근로계약서에 계약 기간이 명시되지 않으면 사용자가 감액을 주장할 근거가 사라집니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">편의점·단순노무직은 왜 100% 지급해야 하나요</h2>
                <p>
                  단순노무 종사자를 감액 대상에서 제외한 규정은 2018년 3월 20일 최저임금법 개정으로 신설됐습니다. 취지는 명확합니다. 수습이란 원래 업무를 배우는 기간인데, 단시간 학습으로 익힐 수 있는 단순 반복 업무에까지 감액을 허용하는 것은 제도의 본래 목적에 부합하지 않는다는 판단입니다.
                </p>
                <p className="mt-4">
                  대상 직군은 한국표준직업분류 대분류 9번(단순노무 종사자)에 속하는 직무입니다. 대표적으로 다음 업무가 해당합니다.
                </p>
                <ul className="space-y-2 ml-6 list-disc text-text-secondary">
                  <li>편의점·마트 판매원, 계산원</li>
                  <li>주방보조, 음식점 홀 정리, 설거지 담당</li>
                  <li>건물 청소원, 환경 미화원</li>
                  <li>주유원, 세차 담당</li>
                  <li>택배·배달의 단순 상하차·분류 업무</li>
                  <li>건설 현장 단순 노무(자재 운반 등)</li>
                </ul>
                <p className="mt-4">
                  다만, 같은 사업장이라도 매니저·부점장 등 관리 업무를 겸하면 단순노무직에서 벗어날 수 있습니다. 실제 담당 업무가 무엇인지가 형식적 직책보다 우선합니다. 판단이 애매하면 고용노동부 고객상담센터 1350에 직무 내용을 설명하고 확인받는 것이 안전합니다.
                </p>
              </section>

              <section className="space-y-6 border-t border-border-base pt-8" data-speakable>
                <h2 className="text-2xl font-bold">수습인데 90% 미만을 받았다면 어떻게 대응하나요</h2>
                <p>
                  단계적으로 대응하면 됩니다. 최저임금은 강행규정이므로 근로자가 근로계약서에 서명했더라도 미달분은 무효이며, 차액을 청구할 수 있습니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">1단계. 증거 확보</p>
                  <p className="text-sm text-text-secondary">
                    근로계약서, 급여명세서, 출퇴근 기록(카드·앱·수기)을 사본으로 보관합니다. 특히 수습 시작일·종료일과 실제 근로시간을 명확히 정리해두면 청구 절차가 수월합니다.
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">2단계. 회사에 서면 요청</p>
                  <p className="text-sm text-text-secondary">
                    회사에 미달분 지급을 서면(내용증명 우편이 안전)으로 요청합니다. 이때 최저임금법 제5조·제6조를 인용하고, 미달액과 산정 근거를 표로 제시합니다. 회사가 지급하면 여기서 종결됩니다.
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">3단계. 지방고용노동청 진정</p>
                  <p className="text-sm text-text-secondary">
                    회사가 응하지 않으면 사업장 관할 지방고용노동청 노동관서에 진정을 접수합니다. 온라인 민원(고용노동부 e노동민원)으로도 가능합니다. 근로감독관이 조사한 뒤 시정지시가 내려지며, 불응 시 형사 입건됩니다.
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">4단계. 처벌·소멸시효</p>
                  <p className="text-sm text-text-secondary">
                    최저임금법 제28조에 따라 최저임금 미달 지급 시 3년 이하 징역 또는 2천만원 이하 벌금이 부과될 수 있습니다. 임금채권 소멸시효는 근로기준법 제49조에 따라 3년이므로, 미달 발생일로부터 3년 이내에 청구·소송을 개시해야 합니다.
                  </p>
                </div>
                <p className="mt-4">
                  다만, 진정·고소 이후 회사로부터 불이익을 우려하는 경우가 많습니다. 부당해고·괴롭힘 등 별도 사안이 발생하면 이는 근로기준법 제23조·제76조의2 위반으로 별도 조치가 가능하므로, 초기에 노무사 또는 대한법률구조공단 무료상담(국번 없이 132)을 활용하는 것을 권장합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">감액 가능 vs 감액 불가 한눈에 비교</h2>
                <p>
                  자신의 상황이 어느 쪽인지 아래 표로 확인해보세요. 회색 셀 하나라도 걸리면 감액 불가입니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">
                      표 2. 상황별 수습 90% 감액 가능 여부 (2026년 기준)
                    </caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">상황</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">감액 가능</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">최소 시급(2026)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">정규직 사무 신입, 수습 3개월 이내</td>
                        <td className="p-3">가능</td>
                        <td className="p-3">9,288원</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">정규직 사무 신입, 수습 4개월차부터</td>
                        <td className="p-3">불가</td>
                        <td className="p-3">10,320원</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">6개월 기간제 계약직</td>
                        <td className="p-3">불가</td>
                        <td className="p-3">10,320원</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">편의점·마트 계산원 아르바이트</td>
                        <td className="p-3">불가</td>
                        <td className="p-3">10,320원</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">주방보조·설거지 담당</td>
                        <td className="p-3">불가</td>
                        <td className="p-3">10,320원</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">1년 계약 매장 부점장(관리 겸직)</td>
                        <td className="p-3">가능(수습 3개월 이내)</td>
                        <td className="p-3">9,288원</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  참고로 2027년 최저시급은 10,700원으로 고시되었으며, 이 경우 수습 90% 하한은 9,630원이 됩니다. 매년 최저임금 고시가 바뀌므로 근로계약서를 갱신할 때마다 현재 연도의 정확한 금액을 확인해야 합니다.
                </p>
              </section>

              <h2 className="text-2xl font-bold mb-6">자주 묻는 질문</h2>
              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h3 className="text-lg font-semibold text-text-primary">관련 계산기 및 가이드</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link
                    href="/calculator/salary/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">연봉 실수령액 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">수습 시급으로 월급·연봉 세후 실수령액을 확인해보세요.</p>
                  </Link>
                  <Link
                    href="/guide/minimum-wage-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">2026년 최저임금 완벽 정리</div>
                    <p className="mt-1 text-sm text-text-secondary">시급 10,320원 근거와 월 환산·주휴수당 포함 지급액.</p>
                  </Link>
                  <Link
                    href="/guide/minimum-wage-2027/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">2027년 최저임금 미리보기</div>
                    <p className="mt-1 text-sm text-text-secondary">10,700원 고시 배경과 수습 90% 하한 9,630원 계산.</p>
                  </Link>
                  <Link
                    href="/guide/employment-contract-written-obligation-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">근로계약서 서면 교부 의무</div>
                    <p className="mt-1 text-sm text-text-secondary">수습 감액을 다투기 전 반드시 확인할 계약서 필수 기재사항.</p>
                  </Link>
                  <Link
                    href="/guide/weekly-holiday-allowance-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">주휴수당 2026 완전 정리</div>
                    <p className="mt-1 text-sm text-text-secondary">수습 기간에도 발생하는 주휴수당 요건과 계산 방법.</p>
                  </Link>
                  <Link
                    href="/guide/annual-leave-allowance-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">연차수당 2026 계산법</div>
                    <p className="mt-1 text-sm text-text-secondary">수습 종료 후 정규 근무 시 발생하는 연차 산정 규칙.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 교육 목적으로 작성되었으며, 개인 맞춤형 노무 조언이 아닙니다. 실제 수습 감액 적용 여부, 최소 지급액, 미달분 청구 절차는 개별 근로계약과 담당 업무 내용에 따라 달라지므로 관할 지방고용노동청 또는 공인노무사와 반드시 확인하시기 바랍니다. 본 콘텐츠는 2026-08-07을 기준으로 작성되었으며, 최저임금 고시 또는 관련 법령 개정 시 즉시 업데이트됩니다. 수습 감액의 정확한 기준은 법조항 <strong>최저임금법 제5조 제2항(수습 사용 중인 자에 대한 감액), 최저임금법 시행령 제3조(10% 감액), 최저임금법 제6조(효력), 최저임금법 제28조(벌칙)</strong>을 따릅니다. AI 보조 작성 후 운영자 검수 완료.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터(최저임금법)</a>,{' '}
                  <a href="https://www.minimumwage.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">최저임금위원회</a>,{' '}
                  <a href="https://www.moel.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">고용노동부</a>.
                </p>
              </section>

              <ShareButtons
                title="수습기간 최저임금 90% 2026 가이드"
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
