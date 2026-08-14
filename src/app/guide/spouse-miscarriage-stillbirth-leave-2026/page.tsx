/* [revenue-lever: traffic] 2026-09-18 시행 개정으로 신설된 배우자 유산·사산 휴가와 확대된 배우자 출산휴가 사용 시기(50일 전)를 노리는 시즌·롱테일 트래픽. */
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

const URL = 'https://calculatorhost.com/guide/spouse-miscarriage-stillbirth-leave-2026/';
const DATE_PUBLISHED = '2026-08-15';
const DATE_MODIFIED = '2026-08-15';

export const metadata: Metadata = {
  title: '배우자 유산·사산 휴가 2026, 5일·유급·신청 총정리 | calculatorhost',
  description:
    '배우자 유산·사산 휴가는 2026년 9월 18일부터 5일 범위(최초 3일 유급)로 신설됩니다. 유산·사산일부터 20일 이내 청구, 우선지원대상기업 1일 상한 84,210원. 배우자 출산휴가는 출산 예정일 50일 전부터 사용 확대.',
  keywords: [
    '배우자 유산 사산 휴가',
    '배우자 유산휴가',
    '남편 유산 휴가',
    '배우자 출산휴가 확대',
    '배우자 출산휴가 50일 전',
    '남녀고용평등법 18조의2',
    '9월 18일 시행',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '배우자 유산·사산 휴가 2026 신설, 5일·유급·신청 총정리' }],
    title: '배우자 유산·사산 휴가 2026, 5일·유급·신청 총정리',
    description:
      '2026년 9월 18일 시행 개정으로 배우자 유산·사산 휴가 5일(최초 3일 유급)이 신설되고, 배우자 출산휴가는 출산 예정일 50일 전부터 쓸 수 있게 확대됩니다.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '배우자 유산·사산 휴가 2026 신설, 5일·유급·신청 총정리',
    description:
      '2026년 9월 18일 시행. 5일 범위(최초 3일 유급), 유산·사산일부터 20일 이내 청구, 우선지원대상기업 정부 지원 1일 상한 84,210원.',
  },
};

const FAQ_ITEMS = [
  {
    question: '배우자 유산·사산 휴가는 언제부터 시행되나요?',
    answer:
      '2026년 9월 18일부터 시행됩니다. 남녀고용평등법 개정으로 배우자(남편)가 사용할 수 있는 유산·사산 휴가가 새로 만들어졌습니다. 그동안은 여성 근로자 본인이 유산·사산했을 때 쓰는 휴가(근로기준법 §74)만 있었고, 배우자를 위한 별도 유급 휴가는 없었습니다. 시행일 이전에 발생한 유산·사산에 대한 소급 적용 여부는 관할 고용노동청에 확인이 필요합니다.',
  },
  {
    question: '유산·사산일부터 며칠 이내에 신청해야 하나요?',
    answer:
      '유산·사산이 발생한 날부터 20일 이내에 청구해야 합니다. 이 청구 기한을 넘기면 사업주에게 사용을 요구할 권리를 잃을 수 있습니다. 유산·사산 사실이 확인되면 진단서 등 증빙을 준비하고, 되도록 빨리 인사팀 또는 사업주에게 서면(이메일 포함)으로 신청하는 것이 안전합니다.',
  },
  {
    question: '3일 유급이면 나머지 2일은 무급인가요?',
    answer:
      '네, 신설된 배우자 유산·사산 휴가 5일 중 최초 3일이 유급이고, 나머지 2일은 무급이 원칙입니다. 다만 회사 취업규칙이나 단체협약에서 유급 범위를 더 넓게 정할 수 있으므로, 소속 회사의 규정을 먼저 확인해 보세요. 사업주가 취업규칙보다 불리하게 처리하는 것은 허용되지 않습니다.',
  },
  {
    question: '우선지원대상기업이 아니면 정부 지원을 못 받나요?',
    answer:
      '우선지원대상기업(주로 중소기업)이 아니면 정부의 유급 3일분 임금 지원 대상에서 제외됩니다. 이 경우 유급 3일분 임금은 사업주가 전액 부담해야 합니다. 우리 회사가 우선지원대상기업에 해당하는지는 고용노동부 고시와 사업장 규모(업종별 상시 근로자 수)로 판단되며, 고용24 또는 관할 고용센터에서 확인할 수 있습니다.',
  },
  {
    question: '배우자 출산휴가와 겹쳐서 쓸 수 있나요?',
    answer:
      '두 제도는 서로 다른 사유(출산 vs 유산·사산)에 대한 별개의 휴가이므로, 각각의 요건을 충족하면 각각 청구할 수 있습니다. 다만 실제로 같은 시점에 두 사유가 동시에 발생하는 경우는 드물고, 배우자 출산휴가(20일)와 배우자 유산·사산 휴가(5일)는 대상 사건 자체가 다르기 때문에 개별 신청이 원칙입니다. 구체적 사례는 고용노동부 상담이 필요합니다.',
  },
  {
    question: '배우자 출산휴가 20일은 근무일 기준인가요, 달력일 기준인가요?',
    answer:
      '근무일(소정근로일) 기준입니다. 즉 주말이나 공휴일은 20일 계산에서 제외되며, 실제로 회사에 출근했어야 할 날 중에서 20일을 사용하는 방식입니다. 최대 3회 분할이 가능하므로, 산모의 회복 시기와 신생아 돌봄 필요에 맞춰 나눠 쓸 수 있습니다.',
  },
  {
    question: '배우자 출산휴가는 왜 출산 예정일 50일 전부터 쓸 수 있게 됐나요?',
    answer:
      '2026년 9월 18일 시행 개정으로, 조산이나 긴급 입원 등 출산 이전에도 배우자의 돌봄이 필요한 상황을 반영해 사용 시기가 확대됐습니다. 이제 배우자 출산휴가는 출산 예정일 50일 전부터 출산 후 120일 이내에 사용할 수 있습니다. 종전에는 출산일 이후에만 사용할 수 있어, 출산 직전 병원 동행이나 조산 대응이 어렵다는 지적이 반영된 것입니다.',
  },
  {
    question: '신청은 어디에 어떻게 하나요?',
    answer:
      '휴가 자체는 사업주(회사 인사팀)에게 청구합니다. 유산·사산일부터 20일 이내에 진단서 등 증빙과 함께 서면(이메일 포함)으로 신청하는 것이 원칙입니다. 우선지원대상기업 근로자가 유급 3일분 정부 지원(고용보험)을 받으려면, 사업주가 임금을 지급한 뒤 고용24(work24.go.kr) 또는 관할 고용센터를 통해 지원금을 청구하는 절차를 밟습니다. 최신 신청 서류·양식은 고용노동부(moel.go.kr) 안내를 확인하세요.',
  },
];

export default function SpouseMiscarriageStillbirthLeave2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '배우자 유산·사산 휴가 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '배우자 유산·사산 휴가 2026, 5일·유급·신청 총정리',
    description:
      '2026년 9월 18일 시행 남녀고용평등법 개정으로 신설된 배우자 유산·사산 휴가(5일 범위, 최초 3일 유급, 20일 이내 청구)와 확대된 배우자 출산휴가(출산 예정일 50일 전 사용) 완전 정리.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['배우자 유산휴가', '배우자 사산휴가', '남편 유산휴가', '배우자 출산휴가 확대', '남녀고용평등법 18조의2'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '배우자 유산·사산 휴가 2026',
    description:
      '2026년 9월 18일 신설된 배우자 유산·사산 휴가 5일(최초 3일 유급)과 확대된 배우자 출산휴가 사용 시기(출산 예정일 50일 전부터 출산 후 120일).',
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
                    { name: '배우자 유산·사산 휴가 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">직장인·예비 아빠 · 7분 읽기 · 2026-08-15</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  배우자 유산·사산 휴가 2026
                  <br />
                  <span className="text-2xl text-text-secondary">· 2026년 9월 18일 신설, 배우자 출산휴가 확대 병행</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  아내가 유산·사산했을 때 남편(배우자)이 쓸 수 있는 유급 휴가는 지금까지 법에 명시돼 있지 않았습니다. 2026년 9월 18일 시행 남녀고용평등법 개정으로 이 공백이 채워집니다. 배우자 유산·사산 휴가 5일(최초 3일 유급)이 신설되고, 같은 개정에서 배우자 출산휴가의 사용 시기가 출산 예정일 50일 전부터 출산 후 120일까지로 크게 확대됩니다. 이 가이드는 두 제도의 요건, 신청 방법, 정부 지원 상한액을 한 페이지에서 정리합니다.
                </p>
              </header>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">배우자 유산·사산 휴가란 무엇인가요? (2026년 9월 18일 신설)</h2>
                <p>
                  배우자 유산·사산 휴가는 남녀고용평등법 개정으로 2026년 9월 18일부터 새로 만들어진 유급 휴가입니다. 그동안은 여성 근로자 본인이 유산·사산했을 때 근로기준법 §74로 보호를 받았지만, 그 배우자(남편)를 위한 별도 유급 휴가는 존재하지 않았습니다. 이번 개정으로 배우자에게도 5일 범위의 휴가와 최초 3일에 대한 유급 보장이 도입되면서, 가족 단위의 심리적·신체적 회복이 제도적으로 뒷받침됩니다.
                </p>
                <p>
                  이 휴가가 신설된 배경은 두 가지입니다. 첫째, 유산·사산은 산모뿐 아니라 배우자와 가족 전체에게 큰 상실감을 남기므로 그 회복 시간을 보장할 필요가 있다는 점이 사회적으로 공감을 얻었습니다. 둘째, 산모가 병원 진료나 후속 처치를 받는 동안 배우자가 동행하고 돌봄을 이어갈 수 있도록 근무 부담을 덜어줘야 한다는 실무적 요구가 반영됐습니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">조문 표기 방침</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    본 가이드에서는 이 휴가를 "남녀고용평등법 개정(2026년 9월 18일 시행)"으로 표기합니다. 개정 시행 시점 관보와 국가법령정보센터(law.go.kr)에서 최종 조문 번호가 확정되면 그 인용으로 갱신할 예정입니다. 가짜 조문 번호를 만들어 인용하지 않는 편이 정확합니다.
                  </p>
                </div>
                <p>
                  다만, 시행일 이전에 발생한 유산·사산에 대한 소급 적용 여부는 개별 회사의 취업규칙이나 관할 고용노동청의 해석에 따라 달라질 수 있으므로 개별 확인이 필요합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">며칠이고, 유급인가요? (5일 범위, 최초 3일 유급)</h2>
                <p>
                  결론부터 말하면 5일 범위, 최초 3일 유급입니다. 배우자가 유산·사산한 사실이 확인되면 근로자는 5일 안에서 필요한 만큼 휴가를 사용할 수 있고, 그중 처음 3일에 대해서는 통상임금 수준의 급여가 그대로 지급됩니다. 나머지 2일을 사용하는 경우 그 부분은 무급이 원칙입니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">회사 규정이 더 유리하면 회사 규정 우선</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    회사 취업규칙이나 단체협약에서 유급 범위를 더 넓게 정할 수 있습니다. 예를 들어 "5일 전부 유급"으로 정한 회사에 다닌다면, 법정 기준보다 유리한 그 규정이 우선 적용됩니다. 반대로 법정 3일 유급보다 불리하게 정하는 것은 허용되지 않습니다.
                  </p>
                </div>
                <p>
                  여기서 "일"은 원칙적으로 근무일(소정근로일) 기준으로 산정합니다. 즉 주말이나 공휴일이 끼면 그날은 계산에서 빠지며, 실제로 회사에 출근했어야 할 날 중에서 5일을 사용하는 구조입니다. 실무 처리 방식은 회사마다 차이가 있을 수 있으므로 인사팀에 사전 확인이 안전합니다.
                </p>
                <p>
                  예외: 이 5일은 배우자 출산휴가(20일)와 겹쳐지지 않는 별도의 휴가입니다. 두 제도는 사유(출산 vs 유산·사산) 자체가 다르므로, 하나를 썼다고 해서 다른 하나가 자동으로 차감되지는 않습니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">언제까지 신청하나요? (유산·사산일부터 20일 이내 청구)</h2>
                <p>
                  유산·사산이 발생한 날부터 20일 이내에 사업주에게 청구해야 합니다. 이 기한을 넘기면 사용을 요구할 권리가 사라질 수 있으므로, 사건 발생 직후 진단서 등 증빙을 준비하고 되도록 빠르게 신청하는 편이 안전합니다.
                </p>
                <p>실무 절차는 대체로 다음과 같이 진행됩니다.</p>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li>병원에서 유산 또는 사산 사실을 확인하는 진단서를 발급받습니다.</li>
                  <li>회사 인사팀에 서면(이메일 포함)으로 청구서와 증빙을 제출합니다.</li>
                  <li>사업주는 청구 요건이 충족되면 휴가를 부여하고, 유급 3일분에 대한 임금을 지급합니다.</li>
                  <li>우선지원대상기업의 경우 사업주가 임금을 먼저 지급한 뒤 고용24를 통해 정부 지원금을 청구합니다.</li>
                </ul>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">사업주가 부여를 거부하는 경우</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    요건이 갖춰졌음에도 사업주가 휴가를 부여하지 않거나 유급 3일분 임금을 지급하지 않으면, 관할 고용노동청 진정을 통해 시정을 요구할 수 있습니다. 진정 접수와 조사 절차는 고용노동부(moel.go.kr) 안내를 참고하세요.
                  </p>
                </div>
                <p>
                  다만, 청구 서식이나 필요한 증빙의 범위는 회사 취업규칙·단체협약에서 세부적으로 정할 수 있습니다. 진단서 외에 별도 서식을 요구하는 회사도 있으므로 청구 전 인사팀에 필요한 문서 목록을 확인하는 편이 마찰을 줄입니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">급여(정부 지원)는 얼마인가요? (우선지원대상기업 상한)</h2>
                <p>
                  우선지원대상기업(주로 중소기업) 근로자에게는 유급 3일분 임금이 고용보험으로 정부 지원됩니다. 지원 방식은 통상임금 100% 수준이며, 1일당 상한액이 정해져 있습니다. 시행 초기 기준으로 1일 상한액은 다음 표와 같습니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 배우자 유산·사산 휴가 유급 3일분 정부 지원 상한 (우선지원대상기업, 2026년 9월 18일 시행 기준)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">사용 일수</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">1일 상한</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">누적 상한</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">1일 사용</td>
                        <td className="p-3">84,210원</td>
                        <td className="p-3"><strong>84,210원</strong></td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">2일 사용</td>
                        <td className="p-3">84,210원</td>
                        <td className="p-3"><strong>168,420원</strong></td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">3일 사용</td>
                        <td className="p-3">84,210원</td>
                        <td className="p-3"><strong>252,630원</strong></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 1. 우선지원대상기업 근로자가 유급 3일을 모두 사용하는 경우</p>
                  <p className="text-sm text-text-secondary">
                    · 통상임금이 1일 84,210원 이하라면 정부가 3일치를 전액 지원합니다.
                    <br />
                    · 통상임금이 1일 100,000원처럼 상한을 초과하는 경우, 정부 지원은 3일 누적 252,630원까지이고, 그 차액은 사업주 부담이 될 수 있습니다.
                    <br />
                    · 즉 근로자 손에 들어오는 유급 3일분 통상임금은 회사와 정부 지원이 결합돼 지급됩니다.
                  </p>
                </div>
                <p>
                  우선지원대상기업이 아닌 사업장의 경우 이 정부 지원 대상에서 제외되므로, 유급 3일분 임금 전액을 사업주가 직접 부담합니다. 우리 회사가 우선지원대상기업에 해당하는지는 업종별 상시 근로자 수 기준으로 판단되며, 고용노동부(moel.go.kr) 고시 또는 관할 고용센터에서 확인할 수 있습니다.
                </p>
                <p>
                  다만, 상한액과 적용 세부는 임금 인상률·고용보험 예산 등을 반영해 조정될 수 있으므로 실제 신청 시점의 상한은 고용24(work24.go.kr) 또는 고용노동부 안내를 다시 확인하세요. 본 표의 84,210원 상한은 시행 초기(2026년 9월 기준) 수치이며, 이후 고시 개정 시 갱신됩니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">배우자 출산휴가와 무엇이 다른가요? (비교 표)</h2>
                <p>
                  많은 예비 아빠들이 배우자 출산휴가와 배우자 유산·사산 휴가를 혼동합니다. 사유·기간·급여 구조가 모두 다르므로 아래 표로 정리합니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 2. 배우자 출산휴가와 배우자 유산·사산 휴가 비교 (2026년 9월 18일 시행 기준)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">구분</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">배우자 출산휴가</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">배우자 유산·사산 휴가</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">근거 조문</td>
                        <td className="p-3">남녀고용평등법 §18의2</td>
                        <td className="p-3">남녀고용평등법 개정(2026.9.18 시행)</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">대상 사유</td>
                        <td className="p-3">배우자의 출산</td>
                        <td className="p-3">배우자의 유산 또는 사산</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">기간</td>
                        <td className="p-3">20일(근무일)</td>
                        <td className="p-3">5일 범위</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">유급 범위</td>
                        <td className="p-3">전 기간 유급</td>
                        <td className="p-3">최초 3일 유급</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">분할 사용</td>
                        <td className="p-3">최대 3회 분할</td>
                        <td className="p-3">연속 사용 원칙(회사 규정 확인)</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">사용 시기</td>
                        <td className="p-3">출산 예정일 50일 전부터 출산 후 120일 이내</td>
                        <td className="p-3">유산·사산일부터 20일 이내 청구</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p>
                  두 제도의 요점만 짚어 보면, 배우자 출산휴가는 아기가 태어난 상황을 위한 유급 20일 휴가이고, 배우자 유산·사산 휴가는 그 반대의 상실 상황을 위한 5일 휴가입니다. 사건 자체가 서로 달라 각각 요건을 충족하면 개별 청구가 원칙입니다.
                </p>
                <p>
                  다만, 실제 발생한 사건이 두 제도의 요건 사이에서 애매하게 걸리는 경우(예: 임신 후기 사산 vs 조기 출산)에는 어느 제도로 신청해야 하는지 판단이 어려울 수 있으므로, 고용노동부 상담이나 노무사 자문을 거치는 편이 안전합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">배우자 출산휴가는 언제부터 쓸 수 있나요? (출산 예정일 50일 전부터, 9월 18일 확대)</h2>
                <p>
                  2026년 9월 18일 시행 개정으로 배우자 출산휴가의 사용 시기가 크게 확대됐습니다. 종전에는 배우자의 출산일 이후에만 20일을 사용할 수 있었지만, 개정 후에는 출산 예정일 50일 전부터 출산 후 120일 이내까지 사용 가능합니다.
                </p>
                <p>
                  확대의 배경은 실제 임신·출산 현장에서 배우자의 동행이 필요한 순간이 출산 이후에만 있는 것이 아니라는 점입니다. 조산이나 긴급 입원, 산부인과 정기 진료, 출산 준비 과정 등 출산 이전에도 돌봄이 필요한 상황이 많고, 종전 규정으로는 이런 경우에 배우자가 유급 휴가를 쓰기 어렵다는 지적이 오래 이어져 왔습니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 2. 출산 예정일 40일 전 조산 위험으로 아내가 입원한 경우</p>
                  <p className="text-sm text-text-secondary">
                    · 개정 전: 출산일 이후에만 사용 가능했으므로, 예정일 40일 전 조산 위험 입원 시점에는 배우자 출산휴가 사용 불가.
                    <br />
                    · 개정 후: 예정일 50일 전 범위 안이므로, 배우자 출산휴가 20일 중 일부를 병원 동행·돌봄용으로 즉시 사용 가능.
                    <br />
                    · 남은 일수는 실제 출산 이후 산모 회복 시기와 신생아 돌봄 시기에 나눠 쓰는 방식으로 운용.
                  </p>
                </div>
                <p>
                  사용 방식은 종전 규정과 동일하게 최대 3회 분할이 가능하고, 근무일 기준 20일을 계산합니다. 즉 출산 전 며칠, 출산 직후 며칠, 산후 조리 시기에 며칠로 나누어 쓰는 유연한 운용이 가능합니다.
                </p>
                <p>
                  다만, 사용 시기가 확대됐다고 하여 20일 총량이 늘어난 것은 아닙니다. 유급 20일이라는 상한은 그대로이고, 그 20일을 언제부터 언제까지 배분할지의 창이 넓어졌다고 이해하면 정확합니다. 근거는 남녀고용평등법 §18의2 및 2026년 9월 18일 시행 개정입니다.
                </p>
              </section>

              <section className="space-y-6 border-t border-border-base pt-8" data-speakable>
                <h2 className="text-2xl font-bold">본인(아내)의 유산·사산 휴가와 어떻게 다른가요? (근로기준법 §74)</h2>
                <p>
                  여성 근로자 본인이 유산·사산했을 때 사용하는 휴가는 근로기준법 §74에 따라 별도로 규정돼 있습니다. 이 휴가는 임신 기간에 따라 며칠에서 최대 90일까지 부여되며, 배우자를 위한 5일 휴가와는 근거·기간·유급 구조가 모두 다릅니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 3. 본인 유산·사산 휴가와 배우자 유산·사산 휴가 구분</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">구분</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">본인 유산·사산 휴가</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">배우자 유산·사산 휴가</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">근거 조문</td>
                        <td className="p-3">근로기준법 §74</td>
                        <td className="p-3">남녀고용평등법 개정(2026.9.18 시행)</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">대상</td>
                        <td className="p-3">유산·사산한 여성 근로자 본인</td>
                        <td className="p-3">배우자가 유산·사산한 근로자</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">기간</td>
                        <td className="p-3">임신 주수에 따라 5일부터 최대 90일</td>
                        <td className="p-3">5일 범위</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">유급 여부</td>
                        <td className="p-3">휴가 급여 별도 제도로 지원</td>
                        <td className="p-3">최초 3일 유급(우선지원대상기업 정부 지원)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p>
                  다시 말해 이번 2026년 9월 18일 개정으로 새로 생긴 5일 휴가는 배우자를 위한 별도 제도이며, 산모 본인이 사용하는 근로기준법 §74의 휴가와는 서로 대체되지 않습니다. 산모가 §74로 회복 휴가를 받는 사이 배우자가 새 5일 휴가로 돌봄에 참여하는 구조가 가능해진 셈입니다.
                </p>
                <p>
                  예외: 본인 유산·사산 휴가의 정확한 일수와 유급 급여 산정 방식은 임신 주수, 사업장 규모, 고용보험 가입 여부에 따라 세부 차이가 있으므로, 개별 사안은 국가법령정보센터(law.go.kr)에서 근로기준법 §74 원문을 확인하거나 고용노동부(moel.go.kr) 상담을 이용하세요.
                </p>
              </section>

              <h2 className="text-2xl font-bold mb-6">자주 묻는 질문</h2>
              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h3 className="text-lg font-semibold text-text-primary">관련 계산기 및 가이드</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link
                    href="/guide/spouse-childbirth-leave-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">배우자 출산휴가 20일 완전 정리</div>
                    <p className="mt-1 text-sm text-text-secondary">유급 20일 · 근무일 기준 · 최대 3회 분할 사용 방법.</p>
                  </Link>
                  <Link
                    href="/guide/short-term-parental-leave-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">단기 육아휴직 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">짧게 쪼개 쓰는 육아휴직 활용법을 확인하세요.</p>
                  </Link>
                  <Link
                    href="/guide/maternity-leave-benefit-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">출산전후휴가 급여 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">산모 본인의 출산전후휴가 급여 산정과 신청 절차.</p>
                  </Link>
                  <Link
                    href="/guide/parental-leave-benefit-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">육아휴직 급여 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">육아휴직 기간·상한액·사후지급금까지 한 번에.</p>
                  </Link>
                  <Link
                    href="/guide/family-care-leave-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">가족돌봄휴가 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">가족 질병·사고 시 사용 가능한 무급 돌봄휴가.</p>
                  </Link>
                  <Link
                    href="/guide/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">전체 가이드 보기</div>
                    <p className="mt-1 text-sm text-text-secondary">세금·노동·부동산 전 분야 가이드 인덱스.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 교육 목적으로 작성되었으며, 개인 맞춤형 노무 조언이 아닙니다. 실제 휴가 부여 요건, 유급 급여 지급 방식, 정부 지원 상한액과 세부 신청 절차는 관할 고용노동청, 회사 인사팀, 또는 노무사 자문으로 반드시 확인하세요. 본 콘텐츠는 2026-08-15을 기준으로 작성됐으며, 시행일 이후 지침이나 상한액 고시가 변경되면 즉시 업데이트됩니다. 관련 법조항: <strong>남녀고용평등법 §18의2</strong>(배우자 출산휴가), <strong>근로기준법 §74</strong>(본인 유산·사산 휴가), 그리고 신설된 배우자 유산·사산 휴가는 <strong>남녀고용평등법 개정(2026년 9월 18일 시행)</strong>에 근거합니다. AI 보조 작성 후 운영자 검수 완료.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">국가법령정보센터(남녀고용평등법·근로기준법 원문)</a>,{' '}
                  <a href="https://www.moel.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">고용노동부(휴가·지원금 안내)</a>,{' '}
                  <a href="https://www.comwel.or.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">근로복지공단(고용보험 지원 절차)</a>.
                </p>
              </section>

              <ShareButtons
                title="배우자 유산·사산 휴가 2026 가이드"
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
