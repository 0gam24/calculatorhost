// [revenue-lever: indexing+traffic] 난임치료휴가 일수·유급·급여신청·불이익금지(근로자 노동법 롱테일 흡수)
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

const URL = 'https://calculatorhost.com/guide/infertility-treatment-leave-2026/';
const DATE_PUBLISHED = '2026-08-26';
const DATE_MODIFIED = '2026-08-26';

export const metadata: Metadata = {
  title: '난임치료휴가 2026, 연 6일·유급 일수·급여 신청 총정리',
  description:
    '난임치료휴가는 연간 6일 이내로 쓸 수 있고 그중 일부는 유급입니다. 2026년 11월 27일부터 유급 일수가 확대되며, 중소기업 근로자는 정부 급여 지원을 받습니다. 남녀고용평등법 §18의3 기준으로 일수·급여·신청 절차를 정리했습니다.',
  keywords: [
    '난임치료휴가',
    '난임휴가 며칠',
    '난임치료휴가 유급',
    '난임치료휴가 급여',
    '난임휴가 신청 방법',
    '남녀고용평등법 18조의3',
    '난임치료휴가 2026',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '난임치료휴가 2026, 연 6일·유급 일수·급여 신청 총정리' }],
    title: '난임치료휴가 2026, 연 6일과 유급 확대, 급여 신청까지',
    description: '연 6일 난임치료휴가의 유급 일수, 2026년 11월 27일 유급 확대, 중소기업 급여 지원과 신청 절차.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '난임치료휴가 2026, 일수·유급·급여 신청 정리',
    description: '연 6일, 유급 확대(11/27), 중소기업 급여 지원, 신청 절차. 남녀고용평등법 §18의3.',
  },
};

const FAQ_ITEMS = [
  {
    question: '난임치료휴가는 며칠까지 쓸 수 있나요?',
    answer:
      '연간 6일 이내로 쓸 수 있습니다(남녀고용평등법 §18의3). 하루 단위로 나눠서 사용할 수 있어, 시술 일정이나 병원 방문 날짜에 맞춰 필요한 날만 청구하면 됩니다. 6일은 1년 단위로 새로 부여되므로 해가 바뀌면 다시 6일을 쓸 수 있습니다.',
  },
  {
    question: '6일 중 유급은 며칠인가요?',
    answer:
      '현행 기준으로 최초 2일이 유급, 나머지 4일은 무급입니다(남녀고용평등법 §18의3). 다만 2026년 11월 27일부터는 유급 일수가 4일로 확대됩니다. 시행일을 기준으로 유급 범위가 달라지므로, 휴가를 쓰는 시점이 시행일 전인지 후인지 확인하세요.',
  },
  {
    question: '난임치료휴가 급여는 얼마나 받나요?',
    answer:
      '유급 일수에 대해 통상임금을 기준으로 지급됩니다. 특히 우선지원대상기업(중소기업) 근로자는 유급분에 대해 정부가 급여를 지원합니다. 다만 1일 지원 상한액이 정해져 있고 이 금액은 고용노동부 고시로 조정되므로, 정확한 상한은 고용보험 안내로 확인해야 합니다.',
  },
  {
    question: '난임치료휴가는 어떻게 신청하나요?',
    answer:
      '먼저 회사에 휴가를 신청해 사용하고, 이후 급여를 별도로 신청하는 2단계입니다. 사업주가 고용보험 시스템에 확인서를 등록하면, 근로자가 고용보험 홈페이지나 앱에서 급여를 신청합니다. 휴가 종료 후 12개월 이내에 신청해야 하며, 심사를 거쳐 지정 계좌로 지급됩니다.',
  },
  {
    question: '회사가 난임치료휴가를 거부할 수 있나요?',
    answer:
      '원칙적으로 거부할 수 없습니다. 다만 근로자가 청구한 시기에 휴가를 주는 것이 정상적인 사업 운영에 중대한 지장을 초래하는 경우, 사업주는 근로자와 협의해 시기를 변경할 수 있습니다(남녀고용평등법 §18의3). 휴가 자체를 못 쓰게 하는 것이 아니라 날짜만 조정하는 것입니다.',
  },
  {
    question: '난임치료휴가를 이유로 불이익을 받으면 어떻게 되나요?',
    answer:
      '사업주는 난임치료휴가를 이유로 해고, 징계 등 불리한 처우를 할 수 없습니다(남녀고용평등법 §18의3). 또한 휴가 신청 과정에서 알게 된 사실을 근로자 의사에 반해 다른 사람에게 누설해서도 안 됩니다. 불이익을 받았다면 고용노동부에 진정을 제기할 수 있습니다.',
  },
  {
    question: '난임치료휴가와 연차, 병가는 무엇이 다른가요?',
    answer:
      '난임치료휴가는 난임 시술 목적으로 법에 별도로 보장된 휴가입니다. 연차를 소진하지 않고 별개로 쓸 수 있다는 점이 핵심입니다. 병가는 회사 취업규칙에 따라 유무급이 갈리지만, 난임치료휴가는 법정 유급 일수가 보장됩니다. 목적이 난임 치료라면 연차 대신 난임치료휴가를 쓰는 편이 유리합니다.',
  },
  {
    question: '남성도 난임치료휴가를 쓸 수 있나요?',
    answer:
      '네, 성별과 무관하게 난임 치료를 받는 근로자라면 사용할 수 있습니다. 인공수정, 체외수정 등 난임 시술은 부부가 함께 준비하는 경우가 많아, 배우자의 시술을 위한 검사·시술 동행 등에도 활용됩니다. 구체적 인정 범위는 회사 인사팀이나 고용노동부에 확인하세요.',
  },
];

export default function InfertilityTreatmentLeave2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '난임치료휴가 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '난임치료휴가 2026, 연 6일·유급 일수·급여 신청 총정리',
    description:
      '연 6일 난임치료휴가의 유급 일수, 2026년 11월 27일 유급 확대, 중소기업 급여 지원, 신청 절차, 불이익 금지까지 남녀고용평등법 §18의3 기준으로 정리한 가이드.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['난임치료휴가', '유급휴가', '난임휴가 급여', '남녀고용평등법', '고용보험'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '난임치료휴가 2026',
    description: '난임치료휴가 일수·유급·급여 신청·불이익 금지 정리.',
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
                    { name: '난임치료휴가 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">근로자 · 8분 읽기 · 2026-08-26</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  난임치료휴가 2026
                  <br />
                  <span className="text-2xl text-text-secondary">· 연 6일, 유급 일수, 급여 신청 총정리</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  난임 시술은 병원 방문과 시술 일정이 잦아 직장을 다니며 병행하기 쉽지 않습니다. 그래서 법은 난임치료휴가를 별도로 보장하고, 그중 일부는 유급으로 정해 두었습니다. 이 가이드는 난임 치료를 준비하는 직장인을 위해, 며칠을 쓸 수 있고 유급은 며칠인지, 급여는 어떻게 신청하는지, 회사가 거부하거나 불이익을 줄 수 있는지를 남녀고용평등법 §18의3 기준으로 정리합니다.
                </p>
              </header>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">난임치료휴가란 무엇인가요?</h2>
                <p>
                  난임 시술을 받기 위해 쓸 수 있도록 법으로 보장된 휴가입니다. 남녀고용평등법 §18의3은 근로자가 인공수정이나 체외수정 등 난임 치료를 받기 위해 휴가를 청구하면 사업주가 연간 6일 이내의 휴가를 주도록 정하고 있습니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">30초 요약</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    · 일수: 연간 6일 이내(하루 단위 분할 사용 가능)
                    <br />
                    · 유급: 현행 최초 2일, 2026년 11월 27일부터 4일로 확대
                    <br />
                    · 급여: 유급분은 통상임금 기준, 중소기업 근로자는 정부 지원
                    <br />
                    · 보호: 휴가를 이유로 한 해고·징계 등 불리한 처우 금지
                  </p>
                </div>
                <p>
                  다만, 난임치료휴가는 연차와 별개입니다. 연차를 아껴 두고 난임 치료에는 이 휴가를 쓰는 것이 핵심 이점입니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">며칠 쓸 수 있고 유급은 며칠인가요?</h2>
                <p>
                  연 6일이고, 유급 일수는 시행일에 따라 달라집니다. 현행은 최초 2일이 유급, 나머지 4일은 무급입니다. 그런데 2026년 11월 27일부터 유급 일수가 4일로 확대됩니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 난임치료휴가 유급 일수 변화(남녀고용평등법 §18의3)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">구분</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">총 일수</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">유급</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">무급</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">현행(2026.11.26까지)</td>
                        <td className="p-3">6일</td>
                        <td className="p-3"><strong>2일</strong></td>
                        <td className="p-3">4일</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">2026.11.27부터</td>
                        <td className="p-3">6일</td>
                        <td className="p-3"><strong>4일</strong></td>
                        <td className="p-3">2일</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p>
                  예외: 유급 일수 확대의 정확한 적용 기준(휴가 청구일 기준인지 사용일 기준인지)은 개별 사안에 따라 다를 수 있으므로, 시행일 전후로 휴가가 걸치는 경우 고용노동부에 확인하세요.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">급여는 얼마나 받나요?</h2>
                <p>
                  유급 일수에 대해 통상임금을 기준으로 받습니다. 원칙적으로 유급휴가이므로 그 날의 임금이 그대로 지급되며, 특히 우선지원대상기업(중소기업) 근로자는 유급분에 대해 정부가 급여를 지원합니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3">
                  <p className="font-semibold text-text-primary">사례. 유급 2일을 사용한 경우</p>
                  <p className="text-sm text-text-secondary">
                    · 유급 2일에 대해 통상임금 지급
                    <br />
                    · 중소기업 근로자라면 유급분을 정부가 지원(고용보험)
                    <br />
                    · 1일 지원 상한액이 정해져 있어 통상임금이 상한을 넘으면 상한까지만 지원
                    <br />
                    <span className="text-xs text-text-tertiary">지원 상한액은 고용노동부 고시로 조정되므로 정확한 금액은 고용보험 안내로 확인하세요.</span>
                  </p>
                </div>
                <p>
                  다만, 1일 지원 상한액은 자료마다 다르게 소개되기도 합니다. 본 가이드는 구체적 금액을 단정하지 않으며, 상한은 반드시 고용보험 공식 안내를 기준으로 확인하시기 바랍니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">어떻게 신청하나요?</h2>
                <p>
                  회사에 휴가를 먼저 쓰고, 급여는 나중에 신청하는 2단계입니다. 순서를 지키지 않으면 급여 지급이 지연될 수 있습니다.
                </p>
                <ol className="space-y-3 ml-6 list-decimal text-text-secondary">
                  <li><strong>회사에 휴가 신청:</strong> 시술·병원 일정에 맞춰 필요한 날을 회사에 청구하고 사용합니다.</li>
                  <li><strong>사업주 확인서 등록:</strong> 사업주가 고용보험 시스템에 유급휴가 확인서를 등록합니다.</li>
                  <li><strong>근로자 급여 신청:</strong> 고용보험 홈페이지나 모바일 앱에서 근로자가 직접 급여를 신청합니다.</li>
                  <li><strong>심사·지급:</strong> 휴가 종료 후 12개월 이내에 신청해야 하며, 심사를 거쳐 지정 계좌로 지급됩니다.</li>
                </ol>
                <p>
                  예외: 신청 기한(휴가 종료 후 12개월)을 넘기면 급여를 받지 못할 수 있으니, 휴가 사용 후 미루지 말고 신청하세요.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">난임치료휴가와 연차·병가, 무엇이 다른가요?</h2>
                <p>
                  목적과 보장 방식이 다릅니다. 세 가지를 비교하면 난임 치료에는 어떤 휴가가 유리한지 분명해집니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 2. 난임치료휴가 vs 연차 vs 병가</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">구분</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">난임치료휴가</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">연차</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">병가</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">법적 근거</td>
                        <td className="p-3">남녀고용평등법 §18의3</td>
                        <td className="p-3">근로기준법 §60</td>
                        <td className="p-3">취업규칙(법정 아님)</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">유급 여부</td>
                        <td className="p-3">일부 유급(법정)</td>
                        <td className="p-3">유급</td>
                        <td className="p-3">회사마다 다름</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">난임 목적 적합성</td>
                        <td className="p-3">가장 적합</td>
                        <td className="p-3">가능하나 연차 소진</td>
                        <td className="p-3">회사 규정에 좌우</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p>
                  결론적으로 난임 치료 목적이라면 연차를 아끼고 난임치료휴가를 먼저 쓰는 것이 유리합니다.
                </p>
              </section>

              <section className="space-y-6 border-t border-border-base pt-8" data-speakable>
                <h2 className="text-2xl font-bold">회사가 불이익을 주면 어떻게 하나요?</h2>
                <p>
                  사업주는 난임치료휴가를 이유로 해고나 징계 등 불리한 처우를 할 수 없습니다(남녀고용평등법 §18의3). 또한 휴가 신청 과정에서 알게 된 사실을 근로자 의사에 반해 누설하는 것도 금지됩니다. 난임 치료는 민감한 사생활 영역이므로 비밀 보호가 함께 규정된 것입니다.
                </p>
                <p>
                  만약 휴가를 이유로 불이익을 받았다면 고용노동부에 진정을 제기할 수 있습니다. 다만 시기 변경 협의(사업 운영에 중대한 지장이 있는 경우 날짜만 조정)는 정당한 권한이므로, 거부와 시기 변경을 구분해서 판단하세요.
                </p>
              </section>

              <h2 className="text-2xl font-bold mb-6">자주 묻는 질문</h2>
              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h3 className="text-lg font-semibold text-text-primary">관련 계산기 및 가이드</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link href="/calculator/salary/" className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition">
                    <div className="font-semibold text-primary-500">연봉 실수령액 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">통상임금·세금 공제 후 실수령액을 확인하세요.</p>
                  </Link>
                  <Link href="/guide/maternity-leave-benefit-2026/" className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition">
                    <div className="font-semibold text-primary-500">출산전후휴가 급여</div>
                    <p className="mt-1 text-sm text-text-secondary">출산휴가 일수와 급여 상한을 정리했습니다.</p>
                  </Link>
                  <Link href="/guide/spouse-childbirth-leave-2026/" className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition">
                    <div className="font-semibold text-primary-500">배우자 출산휴가</div>
                    <p className="mt-1 text-sm text-text-secondary">배우자 출산휴가 일수와 급여를 확인하세요.</p>
                  </Link>
                  <Link href="/guide/parental-leave-benefit-2026/" className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition">
                    <div className="font-semibold text-primary-500">육아휴직 급여 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">육아휴직 급여 상한과 신청 방법을 정리했습니다.</p>
                  </Link>
                  <Link href="/guide/family-care-leave-2026/" className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition">
                    <div className="font-semibold text-primary-500">가족돌봄휴가</div>
                    <p className="mt-1 text-sm text-text-secondary">가족 돌봄을 위한 휴가 제도를 비교하세요.</p>
                  </Link>
                  <Link href="/category/work/" className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition">
                    <div className="font-semibold text-primary-500">모든 근로 가이드</div>
                    <p className="mt-1 text-sm text-text-secondary">연차·수당·휴가 제도 모음.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 교육 목적으로 작성되었으며 개인 맞춤형 노무 조언이 아닙니다. 유급 일수 확대 시행일과 급여 지원 상한액은 개정·고시로 달라질 수 있으므로, 실제 적용은 고용노동부와 고용보험 안내로 반드시 확인하세요. 본 콘텐츠는 2026-08-26 기준이며, 인용한 법조항은 <strong>남녀고용평등과 일·가정 양립 지원에 관한 법률 §18의3(난임치료휴가), 근로기준법 §60(연차 유급휴가)</strong>입니다. AI 보조 작성 후 운영자 검수 완료.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터</a>,{' '}
                  <a href="https://www.moel.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">고용노동부</a>,{' '}
                  <a href="https://www.ei.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">고용보험</a>.
                </p>
              </section>

              <ShareButtons title="난임치료휴가 2026 가이드" url={URL} />
            </article>
          </main>
        </div>
        <Footer />
      </div>
    </>
  );
}
