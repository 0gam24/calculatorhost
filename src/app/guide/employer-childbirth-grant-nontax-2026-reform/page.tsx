// [revenue-lever: indexing+traffic] 기업 출산지원금 근로소득 비과세 확대 개편안 (직장인 부모 롱테일)
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

const URL = 'https://calculatorhost.com/guide/employer-childbirth-grant-nontax-2026-reform/';
const DATE_PUBLISHED = '2026-08-24';
const DATE_MODIFIED = '2026-08-24';

export const metadata: Metadata = {
  title: '회사 출산지원금 비과세 2026, 임신 중 지급도 확대 개편안',
  description:
    '기업이 주는 출산지원금은 출생 후 2년 이내 2회까지 전액 근로소득 비과세입니다. 2026 세제개편안은 임신 기간 지급분과 위탁아동 보육수당까지 확대합니다. 요건·세금 차이 정리(소득세법 §12).',
  keywords: [
    '출산지원금 비과세',
    '회사 출산장려금 세금',
    '출산지원금 근로소득 비과세',
    '보육수당 20만원 비과세',
    '위탁아동 보육수당',
    '소득세법 12조',
    '2026 세제개편안 출산',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '회사 출산지원금 비과세 2026, 임신 중 지급도 확대 개편안' }],
    title: '회사 출산지원금 비과세 2026, 임신 중 지급도 확대하는 개편안',
    description: '기업 출산지원금은 출생 후 2년 이내 2회 전액 비과세. 2026 세제개편안은 임신 기간 지급분과 위탁아동 보육수당까지 확대(소득세법 §12).',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '회사 출산지원금 비과세 2026, 임신 중 지급도 확대 개편안',
    description: '회사가 준 출산지원금 출생 후 2년 이내 2회 전액 비과세. 2026 개편안은 임신기간·위탁아동까지 확대(정부안). 소득세법 §12.',
  },
};

const FAQ_ITEMS = [
  {
    question: '회사에서 받은 출산지원금도 세금을 내나요?',
    answer:
      '내지 않습니다. 근로자 본인이나 배우자의 출산과 관련해 회사가 지급하는 출산지원금은 출생일 이후 2년 이내에 지급된 것으로서 최대 2회까지 전액 근로소득 비과세입니다(소득세법 §12). 금액 상한이 없어 1천만원이든 그 이상이든 요건을 갖추면 전액 비과세됩니다.',
  },
  {
    question: '몇 번까지, 언제까지 지급된 것이 비과세인가요?',
    answer:
      '자녀 출생일 이후 2년 이내에 지급된 것으로서 최대 2회까지 비과세됩니다. 예를 들어 출산 직후 1회, 이듬해 1회로 나눠 받아도 둘 다 2년 이내이고 2회 이내이면 전액 비과세입니다. 3회차부터 또는 출생 후 2년을 넘겨 지급된 금액은 일반 근로소득으로 과세될 수 있습니다.',
  },
  {
    question: '2026년 개편으로 임신 중 받은 지원금도 비과세되나요?',
    answer:
      '2026년 세제개편안(정부안)은 임신 이후 출산 전까지 지급된 출산지원금도 비과세 대상에 포함하는 내용을 담았습니다. 지금은 출생 이후 지급분만 비과세되지만, 개편안이 통과되면 임신 기간에 미리 받은 지원금도 요건 내에서 비과세됩니다. 국회 통과 전 정부안이므로 확정 시기는 기획재정부 발표로 확인하세요.',
  },
  {
    question: '보육수당은 얼마까지 비과세인가요?',
    answer:
      '만 6세 이하 자녀의 보육과 관련해 회사에서 받는 보육수당은 자녀 1명당 월 20만원까지 비과세됩니다(소득세법 §12 3호 머목). 2024년부터 한도가 월 10만원에서 20만원으로 올랐습니다. 출산지원금 비과세와는 별개 항목이므로 둘 다 요건을 갖추면 각각 적용됩니다.',
  },
  {
    question: '위탁아동 보육수당도 비과세되나요?',
    answer:
      '2026년 세제개편안(정부안)은 보육수당 비과세 대상에 위탁아동을 추가하는 내용을 담았습니다. 개편안이 통과되면 위탁아동의 보육을 위해 회사가 지급하는 수당도 월 20만원까지 비과세됩니다. 현재는 정부안 단계이므로 시행 여부와 시기는 확정되지 않았습니다.',
  },
  {
    question: '출산지원금과 부모급여, 첫만남이용권은 같은 건가요?',
    answer:
      '다릅니다. 출산지원금은 회사(사용자)가 근로자에게 주는 급여로 소득세법상 비과세 근로소득입니다. 부모급여와 첫만남이용권은 국가·지자체가 주는 복지 지원으로 애초에 근로소득이 아닙니다. 이 글의 비과세는 회사가 주는 출산지원금에 관한 것입니다.',
  },
  {
    question: '사장님 친척이어도 비과세되나요?',
    answer:
      '제한이 있습니다. 출산지원금 비과세는 지배주주 등 특수관계인에게 지급하는 경우를 제외하는 규정이 있습니다. 조세 회피에 악용되는 것을 막기 위한 장치입니다. 특수관계 여부가 애매하면 회사 세무 담당자나 국세청에 확인하는 것이 안전합니다.',
  },
];

export default function EmployerChildbirthGrantNontax2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '회사 출산지원금 비과세 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '회사 출산지원금 비과세 2026, 임신 중 지급도 확대하는 개편안',
    description:
      '기업 출산지원금의 출생 후 2년 이내 2회 전액 비과세 규정과, 2026 세제개편안의 임신 기간 지급분·위탁아동 보육수당 확대안을 세금 차이 사례로 정리.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['출산지원금 비과세', '보육수당', '위탁아동', '근로소득 비과세', '2026 세제개편안'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '회사 출산지원금 비과세 2026',
    description:
      '기업 출산지원금 근로소득 비과세 요건과 2026 세제개편안의 임신 기간·위탁아동 확대안 정리(소득세법 §12).',
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
                    { name: '회사 출산지원금 비과세 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">직장인 부모 · 8분 읽기 · 2026-08-24</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  회사 출산지원금 비과세 2026
                  <br />
                  <span className="text-2xl text-text-secondary">· 임신 중 지급도 확대하는 개편안</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  회사에서 출산 축하로 목돈을 받았는데 세금을 떼일까 걱정하는 직장인 부모를 위한 글입니다. 결론부터 말하면 요건을 갖춘 출산지원금은 전액 비과세라 세금이 붙지 않습니다. 이 글은 얼마까지, 몇 번까지 비과세인지, 보육수당 월 20만원 비과세와 어떻게 다른지, 그리고 2026년 세제개편안이 임신 기간과 위탁아동까지 어떻게 넓히는지 정리합니다.
                </p>
              </header>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">회사가 준 출산지원금, 세금 내나요?</h2>
                <p>
                  내지 않습니다. 근로자 본인이나 배우자의 출산과 관련해 회사가 지급하는 출산지원금은 요건을 갖추면 전액 근로소득 비과세입니다(소득세법 §12). 일반 상여금처럼 세금이 붙지 않는다는 점이 핵심입니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">30초 요약</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    · 대상: 근로자 본인·배우자 출산 관련 회사 지급 출산지원금
                    <br />
                    · 비과세: 출생 후 2년 이내, 최대 2회, 전액(상한 없음)
                    <br />
                    · 보육수당: 만 6세 이하 자녀당 월 20만원 비과세(별개)
                    <br />
                    · 개편안: 임신 기간 지급분, 위탁아동 보육수당까지 확대(정부안)
                    <br />
                    · 제외: 지배주주 등 특수관계인 지급분
                  </p>
                </div>
                <p>
                  다만 이는 국가가 주는 부모급여나 첫만남이용권과는 다른, 회사가 주는 급여에 대한 비과세라는 점을 먼저 구분해야 합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">얼마까지, 몇 번까지 비과세인가요?</h2>
                <p>
                  자녀 출생일 이후 2년 이내에 지급된 것으로서 최대 2회까지 전액 비과세됩니다(소득세법 §12). 금액 상한이 없다는 점이 다른 비과세 항목과 크게 다릅니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 출산지원금 비과세 요건 (소득세법 §12, 2026 기준)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">구분</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">내용</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">지급 주체</td>
                        <td className="p-3">회사(사용자)</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">지급 시기</td>
                        <td className="p-3">자녀 출생일 이후 2년 이내</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">횟수</td>
                        <td className="p-3">최대 2회</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">금액 한도</td>
                        <td className="p-3"><strong>없음(전액 비과세)</strong></td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">제외</td>
                        <td className="p-3">지배주주 등 특수관계인</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p>
                  다만 출생 후 2년을 넘겨 지급되거나 3회차부터 지급된 금액은 일반 근로소득으로 과세될 수 있습니다. 지급 시기와 횟수를 회사와 미리 조율하는 것이 유리합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">보육수당은 얼마까지 비과세인가요?</h2>
                <p>
                  만 6세 이하 자녀의 보육과 관련해 회사에서 받는 보육수당은 자녀 1명당 월 20만원까지 비과세됩니다(소득세법 §12 3호 머목). 2024년부터 한도가 월 10만원에서 20만원으로 상향됐습니다.
                </p>
                <p>
                  출산지원금과 보육수당은 별개 항목이라 둘 다 요건을 갖추면 각각 적용됩니다. 예를 들어 출산 직후 출산지원금을 전액 비과세로 받고, 이후 매달 보육수당 20만원을 추가로 비과세받을 수 있습니다.
                </p>
                <p>
                  다만 자녀 1명당 월 20만원이 한도이므로, 이를 초과해 받는 보육수당은 과세됩니다. 자녀 수와 월 지급액을 함께 확인하세요.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">비과세면 세금이 얼마나 줄까요? (계산 사례)</h2>
                <p>
                  출산지원금이 비과세라는 것은 그만큼 과세표준에서 빠진다는 뜻입니다. 같은 1천만원이라도 일반 상여로 받을 때와 세금 차이가 큽니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 1. 출산지원금 1천만원 (한계세율 24% 가정)</p>
                  <p className="text-sm text-text-secondary">
                    · 일반 상여로 받으면: 1,000만 × 24% = 240만원 + 지방소득세 24만원 = 약 264만원 세금
                    <br />
                    · 출산지원금 비과세로 받으면: <strong>세금 0원</strong>
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 같은 1천만원도 비과세로 받으면 약 264만원을 더 손에 쥡니다.</span>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 2. 첫째·둘째 각각 1천만원 (2회)</p>
                  <p className="text-sm text-text-secondary">
                    · 첫째 출산 후 1천만원(1회차), 둘째 출산 후 1천만원(2회차)
                    <br />
                    · 각각 출생 후 2년 이내, 2회 이내 → <strong>둘 다 전액 비과세</strong>
                    <br />
                    <span className="text-xs text-text-tertiary">자녀마다 2회 한도를 각각 판단하는 실무 해석이 있으므로 지급 전 확인하세요.</span>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 3. 보육수당 월 20만원 (연 240만원)</p>
                  <p className="text-sm text-text-secondary">
                    · 만 4세 자녀 보육수당 월 20만원 × 12개월 = 240만원
                    <br />
                    · 전액 비과세 → 한계세율 15%면 약 36만원 세금을 아끼는 효과
                    <br />
                    · 월 25만원을 받으면 초과분 월 5만원(연 60만원)은 과세
                  </p>
                </div>
              </section>

              <section className="space-y-6 border-t border-border-base pt-8">
                <h2 className="text-2xl font-bold">2026 개편안, 무엇이 넓어지나</h2>
                <p>
                  2026년 8월 3일 발표된 세제개편안(정부안)은 출산·양육 관련 비과세를 두 방향으로 확대합니다.
                </p>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li>
                    <strong>임신 기간 지급분 포함:</strong> 지금은 출생 이후 지급분만 비과세되지만, 임신 이후 출산 전까지 지급한 출산지원금도 비과세 대상에 포함하는 방향입니다.
                  </li>
                  <li>
                    <strong>위탁아동 보육수당:</strong> 보육수당 비과세 대상에 위탁아동을 추가해, 위탁아동 보육을 위해 지급하는 수당도 월 20만원까지 비과세하는 방향입니다.
                  </li>
                </ul>
                <p>
                  다만 이는 아직 국회 통과 전 정부안입니다. 최종 시행 여부·시기·세부 요건은 확정되지 않았으므로, 기획재정부와 국세청 발표를 확인하는 것이 안전합니다.
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
                    <p className="mt-1 text-sm text-text-secondary">비과세 항목이 실수령액에 미치는 영향을 확인하세요.</p>
                  </Link>
                  <Link
                    href="/guide/non-taxable-salary-allowances-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">비과세 급여 항목 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">식대·자가운전·보육수당 등 비과세 총정리.</p>
                  </Link>
                  <Link
                    href="/guide/parental-benefit-child-allowance-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">부모급여·아동수당 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">국가가 주는 육아 지원금과 어떻게 다른지 보세요.</p>
                  </Link>
                  <Link
                    href="/guide/child-tax-credit-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">자녀세액공제 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">연말정산에서 자녀로 받는 세액공제를 챙기세요.</p>
                  </Link>
                  <Link
                    href="/guide/marriage-tax-credit-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">혼인세액공제 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">결혼·출산 관련 세제 혜택을 함께 확인하세요.</p>
                  </Link>
                  <Link
                    href="/category/work/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">모든 근로 가이드</div>
                    <p className="mt-1 text-sm text-text-secondary">연봉·비과세·육아휴직 관련 모음.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 교육 목적으로 작성되었으며 개인 맞춤형 세무 조언이 아닙니다. 출산지원금·보육수당 비과세의 실제 적용 요건(지급 시기·횟수·특수관계 여부)은 회사 세무 담당자와 국세청에서 반드시 확인하세요. 근거 법조항은 <strong>소득세법 §12(비과세소득) 제3호</strong>이며, 보육수당 비과세는 같은 조 머목입니다. 임신 기간 지급분·위탁아동 확대는 2026년 8월 3일 발표된 세제개편안(정부안) 기준으로, 국회 논의 과정에서 달라질 수 있습니다. 본 콘텐츠는 2026-08-24를 기준으로 작성됐으며, 세법 개정 시 업데이트됩니다. AI 보조 작성 후 운영자 검수 완료.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터</a>,{' '}
                  <a href="https://www.nts.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">국세청</a>,{' '}
                  <a href="https://www.moef.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">기획재정부</a>.
                </p>
              </section>

              <ShareButtons
                title="회사 출산지원금 비과세 2026 가이드"
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
