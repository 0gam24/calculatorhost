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

const URL = 'https://calculatorhost.com/guide/insurance-payout-inheritance-tax-2026/';
const DATE_PUBLISHED = '2026-09-17';
const DATE_MODIFIED = '2026-09-17';

export const metadata: Metadata = {
  title: '보험금 상속세 증여세 2026, 계약자·수익자별 과세 판단',
  description:
    '사망보험금은 받는 사람의 고유재산이지만 상증법 §8에 따라 상속재산에 합산돼 상속세가 과세됩니다. 계약자와 수익자가 다르면 증여세(§34)가 나오는 경우도 있어 판단 기준을 정리했습니다.',
  keywords: [
    '보험금 상속세',
    '보험금 증여세',
    '사망보험금 상속세',
    '보험계약자 수익자',
    '상증법 8조',
    '상속세및증여세법 34조',
    '간주상속재산',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '보험금 상속세 증여세 2026, 계약자·수익자별 과세 판단' }],
    title: '보험금도 상속재산인가, 계약자·수익자별 과세 판단',
    description: '사망보험금은 상증법 §8에 따라 상속재산으로 간주됩니다. 계약자와 수익자가 다르면 증여세(§34)가 나올 수 있습니다.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '보험금 상속세 증여세 2026, 계약자·수익자별 과세 판단',
    description: '사망보험금 상속세(§8) vs 증여세(§34) 구분 기준과 신고 기한(§67) 정리.',
  },
};

const FAQ_ITEMS = [
  {
    question: '사망보험금은 상속재산에 들어가나요?',
    answer:
      '피상속인이 계약자였던 생명보험·손해보험의 사망보험금은 상증법 §8①에 따라 상속재산으로 간주됩니다. 보험금을 받는 사람의 고유재산이지만, 세법상으로는 다른 상속재산과 합산해 상속세 과세표준을 구성합니다.',
  },
  {
    question: '계약자가 자녀인데 보험료는 부모가 냈다면 어떻게 되나요?',
    answer:
      '계약서상 계약자가 누구인지보다 실제로 누가 보험료를 냈는지가 기준입니다. 상증법 §8②에 따라 부모가 실질적으로 보험료를 납부했다면 계약자 명의와 관계없이 부모를 계약자로 보아 사망보험금을 상속재산으로 봅니다.',
  },
  {
    question: '보험금 계약자와 수익자가 다르면 왜 증여세가 나오나요?',
    answer:
      '보험료를 낸 사람과 보험금을 받는 사람이 다르면, 보험사고가 발생한 날 그 보험금 중 남이 낸 보험료에 해당하는 부분을 증여받은 것으로 봅니다(상증법 §34①). 다만 §8에 따라 상속재산으로 이미 과세되는 경우에는 §34①이 중복 적용되지 않습니다.',
  },
  {
    question: '내가 낸 보험료로 내가 보험금을 받으면 세금이 없나요?',
    answer:
      '계약자와 수익자, 보험료를 실제로 낸 사람이 모두 같다면 자기 재산으로 자기가 보험금을 받는 것이므로 상속세·증여세 과세 대상이 아닙니다. 문제는 계약자·피보험자·수익자·실제 납부자 중 누군가가 다를 때 생깁니다.',
  },
  {
    question: '상속포기를 해도 사망보험금은 받을 수 있나요?',
    answer:
      '수익자가 상속인 본인으로 지정된 사망보험금은 상속재산이 아니라 수익자의 고유재산이므로, 상속을 포기해도 원칙적으로 받을 수 있습니다. 다만 이 보험금도 상증법 §8에 따라 상속세 과세 대상에는 포함되므로, 포기 여부와 과세 여부는 별개로 판단해야 합니다.',
  },
  {
    question: '보험금까지 포함한 상속세는 언제까지 신고해야 하나요?',
    answer:
      '상속인 전원과 피상속인이 국내에 거주했다면 상속개시일이 속하는 달의 말일부터 6개월 이내에 신고해야 합니다(상증법 §67). 상속인 전원 또는 피상속인이 외국에 주소를 둔 경우에는 9개월 이내로 늘어납니다.',
  },
  {
    question: '보험금 상속세는 어디서 계산해볼 수 있나요?',
    answer:
      '보험금을 포함한 전체 상속재산과 기본공제·배우자공제 등을 반영한 예상 세액은 계산기로 가늠해볼 수 있습니다. 다만 실제 신고 세액은 재산 평가와 공제 적용에 따라 달라지므로 세무사 등 전문가 확인을 권장합니다.',
  },
];

export default function InsurancePayoutInheritanceTax2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '보험금도 상속재산인가, 계약자·수익자별 과세 판단' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '보험금도 상속재산인가, 계약자·수익자별 과세 판단',
    description:
      '사망보험금이 상속세(상증법 §8) 대상인지, 계약자와 수익자가 다를 때 증여세(§34)가 나오는 경우는 무엇인지, 상속세 신고 기한(§67)까지 실제 사례로 정리.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['보험금 상속세', '보험금 증여세', '간주상속재산', '상증법 8조', '상증법 34조'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '보험금도 상속재산인가, 계약자·수익자별 과세 판단',
    description:
      '사망보험금의 상속세·증여세 판단 기준을 계약자·피보험자·수익자·보험료 납부자 관계별로 정리.',
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
                    { name: '보험금도 상속재산인가, 계약자·수익자별 과세 판단' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">상속인 · 8분 읽기 · 2026-09-17</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  보험금도 상속재산인가
                  <br />
                  <span className="text-2xl text-text-secondary">· 계약자·수익자별 과세 판단</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  사망보험금은 보험회사가 수익자에게 직접 지급하는 돈이라 상속재산이 아니라고 오해하기 쉽습니다. 하지만 세법은 보험료를 누가 냈는지를 기준으로 상속세와 증여세를 나눠 매깁니다. 이 가이드는 계약자·피보험자·수익자·실제 보험료 납부자의 관계에 따라 세금이 어떻게 달라지는지 실제 사례로 정리합니다. 대상 독자는 가족이 남긴 보험금을 받게 된 상속인입니다.
                </p>
              </header>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">보험금도 상속재산인가요?</h2>
                <p>
                  네, 사망으로 받는 보험금은 원칙적으로 상속재산으로 봅니다. 보험금은 보험회사가 계약에 따라 수익자에게 직접 지급하므로 법적으로는 수익자의 고유재산입니다. 그런데 상속세 및 증여세법 §8①은 피상속인이 계약자였던 생명보험·손해보험의 사망보험금을 상속재산으로 간주해 과세하도록 규정합니다.
                </p>
                <p>
                  즉 보험금은 상속인이 소유권을 넘겨받는 재산이 아니라 제3자인 보험회사에서 직접 받는 돈이지만, 그 경제적 원천이 피상속인의 보험료 납입에 있으므로 세법상으로는 다른 상속재산과 똑같이 취급합니다. 예금·부동산과 함께 보험금까지 합산해 상속세 과세표준이 정해지는 구조입니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">30초 요약</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    정의: 사망보험금은 받는 사람 재산이지만 세법상 상속재산으로 간주.
                    <br />
                    기준: 계약자(실제 보험료 납부자)가 피상속인이면 상속세(상증법 §8).
                    <br />
                    예외: 계약자와 수익자가 다르고 보험사고만 발생한 경우엔 증여세(상증법 §34).
                    <br />
                    신고: 상속개시일이 속하는 달의 말일부터 6개월 이내(상증법 §67).
                  </p>
                </div>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">계약자가 피상속인이면 왜 상속세가 나오나요?</h2>
                <p>
                  계약서에 적힌 계약자 명의가 아니라 실제로 보험료를 낸 사람이 누구인지가 핵심 기준입니다. 상증법 §8①은 피상속인이 보험계약자였던 보험계약에서 사망으로 지급되는 보험금을 상속재산으로 봅니다. 아버지가 본인을 계약자·피보험자로 하는 종신보험에 가입하고 사망보험금 수익자를 아들로 지정했다면, 아들이 받는 사망보험금은 아들의 고유재산이면서도 상속세 과세표준에 합산됩니다.
                </p>
                <p>
                  다만 상증법 §8②는 실질과세를 한 번 더 강조합니다. 계약서상 계약자가 자녀 등 피상속인이 아닌 사람으로 되어 있더라도, 피상속인이 실제로 보험료를 냈다면 피상속인을 계약자로 보아 §8①을 그대로 적용합니다. 명의만 자녀로 바꿔 두었다고 상속세를 피할 수는 없다는 의미입니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 계약자·수익자·보험료 납부자 관계별 과세 (상증법 §8·§34)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">계약자(실제 납부자)</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">수익자</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">보험사고</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">과세</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">피상속인 본인</td>
                        <td className="p-3">상속인</td>
                        <td className="p-3">피상속인 사망</td>
                        <td className="p-3">상속세(간주상속재산, §8①)</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">명의는 상속인, 실납부는 피상속인</td>
                        <td className="p-3">상속인</td>
                        <td className="p-3">피상속인 사망</td>
                        <td className="p-3">상속세(실질과세, §8②)</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">부모</td>
                        <td className="p-3">자녀</td>
                        <td className="p-3">제3자(피보험자) 사고·만기</td>
                        <td className="p-3">증여세(§34)</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">본인</td>
                        <td className="p-3">본인</td>
                        <td className="p-3">본인 사고·만기</td>
                        <td className="p-3">과세 없음(자기 재산)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  다만, 이 표는 전형적인 사례를 정리한 것이며 실제로는 보험료를 일부만 나눠 낸 경우처럼 더 세밀한 판단이 필요한 사안도 있습니다. 구체적인 계약 구조는 국세청·세무사 상담으로 확인하는 것이 안전합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">계약자와 수익자가 다르면 왜 증여세가 나오나요?</h2>
                <p>
                  보험료를 낸 사람과 보험금을 받는 사람이 다르면 그 차이만큼 증여로 봅니다. 상증법 §34①은 생명보험·손해보험에서 보험사고(만기보험금 포함)가 발생한 경우, 보험사고가 발생한 날을 증여일로 보고 보험금 수령인과 보험료를 낸 사람이 다르면 그 부분을 수령인의 증여재산가액으로 규정합니다.
                </p>
                <p>
                  예를 들어 어머니가 계약자로 보험료를 내고, 피보험자를 아버지로, 수익자를 아들로 지정한 보험이 있다고 가정합니다. 아버지가 사고를 당해 보험금이 지급되면, 어머니가 낸 보험료로 아들이 보험금을 받은 것이 되어 어머니가 아들에게 증여한 것으로 보아 증여세가 과세됩니다. 이는 피상속인의 사망으로 발생하는 §8의 상속세 상황과는 다른 사례입니다.
                </p>
                <p>
                  다만, 상증법 §34①은 §8에 따라 이미 상속재산으로 보는 보험금에는 중복해서 적용하지 않습니다. 즉 같은 보험금에 상속세와 증여세가 이중으로 붙지는 않으며, 어떤 세목이 적용되는지는 계약자·피보험자·수익자·보험료 실납부자의 관계로 판단합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">상속포기를 해도 사망보험금은 받을 수 있나요?</h2>
                <p>
                  네, 원칙적으로 받을 수 있습니다. 수익자가 상속인 본인으로 지정된 사망보험금은 상속재산이 아니라 수익자의 고유재산으로 보기 때문에, 상속을 포기해도 지정 수익자로서 보험금을 수령할 수 있습니다. 다만, 이렇게 받은 보험금도 상증법 §8에 따라 상속세 과세 대상에는 포함되므로, 상속포기 여부와 상속세 과세 여부는 서로 다른 문제로 봐야 합니다.
                </p>
                <p>
                  상속포기의 기한·절차나 후순위 상속인 문제는 별도로 확인이 필요합니다. 자세한 절차는 아래 상속포기 가이드에서 다룹니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">보험금 포함 상속세는 언제까지 신고해야 하나요?</h2>
                <p>
                  상속인 전원과 피상속인이 모두 국내에 거주했다면 상속개시일이 속하는 달의 말일부터 6개월 이내에 신고해야 합니다(상증법 §67). 예를 들어 3월 12일에 상속이 시작됐다면 사망일이 아니라 그달 말일인 3월 31일을 기준으로 6개월을 계산해 9월 30일까지 신고합니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 2. 상속세 신고 기한 (상증법 §67)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">상속인·피상속인 거주지</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">신고 기한</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">모두 국내 거주</td>
                        <td className="p-3">상속개시일이 속하는 달의 말일부터 6개월 이내</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">상속인 전원 또는 피상속인이 외국 거주</td>
                        <td className="p-3">상속개시일이 속하는 달의 말일부터 9개월 이내</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  다만, 보험금은 지급까지 시일이 걸려 신고 기한 안에 실제로 받지 못한 상태로 신고해야 하는 경우도 있습니다. 이런 경우에도 보험금 청구권 자체를 평가해 상속재산에 포함해 신고하는 것이 원칙이므로, 보험금 수령이 늦어진다는 이유로 신고를 미루면 무신고 가산세가 붙을 수 있습니다.
                </p>
              </section>

              <h2 className="text-2xl font-bold mb-6">자주 묻는 질문</h2>
              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h3 className="text-lg font-semibold text-text-primary">관련 계산기 및 가이드</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link
                    href="/calculator/inheritance-tax/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">상속세 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">보험금을 포함한 상속재산으로 예상 세액을 계산해보세요.</p>
                  </Link>
                  <Link
                    href="/guide/inheritance-tax-calculation-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">상속세 계산법 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">공제와 세율 구조를 포함한 전체 계산 순서.</p>
                  </Link>
                  <Link
                    href="/guide/inheritance-renunciation-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">상속포기 신고 방법·기한</div>
                    <p className="mt-1 text-sm text-text-secondary">빚이 많을 때 상속포기의 기한과 절차.</p>
                  </Link>
                  <Link
                    href="/guide/inheritance-vs-gift-tax-comparison-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">상속세 vs 증여세 비교</div>
                    <p className="mt-1 text-sm text-text-secondary">같은 재산이라도 세목이 갈리는 기준.</p>
                  </Link>
                  <Link
                    href="/guide/financial-asset-inheritance-deduction-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">금융재산 상속공제</div>
                    <p className="mt-1 text-sm text-text-secondary">예금·보험금 등 금융재산에 적용되는 공제.</p>
                  </Link>
                  <Link
                    href="/category/tax/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">모든 세금 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">양도세·취득세·상속세·증여세 모음.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 이 글은 AI 보조로 자동 생성되어 자동 품질 게이트를 통과한 뒤 발행되었습니다. 발행 시점에 사람의 사전 검수는 없었으며, 운영자가 사후 점검합니다. 본 콘텐츠는 교육 목적으로 작성되었으며 개인 맞춤형 세무·법률 조언이 아닙니다. 보험 계약의 구체적 구조와 보험료 납부 내역에 따라 실제 과세 여부가 달라질 수 있으므로 국세청 또는 세무사 등 전문가와 확인하세요. 본 콘텐츠는 2026-09-17을 기준으로 작성되었으며, 관련 법령·판례 변경 시 업데이트됩니다. 인용 법조항: 상속세 및 증여세법 §8(상속재산으로 보는 보험금), §34(보험금의 증여), §67(상속세 과세표준신고).
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터</a>,{' '}
                  <a href="https://www.nts.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">국세청</a>,{' '}
                  <a href="https://www.hometax.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">홈택스</a>.
                </p>
              </section>

              <ShareButtons
                title="보험금도 상속재산인가, 계약자·수익자별 과세 판단"
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
