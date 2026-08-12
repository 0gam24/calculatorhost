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

const URL = 'https://calculatorhost.com/guide/legal-inheritance-order-share-2026/';
const DATE_PUBLISHED = '2026-08-01';
const DATE_MODIFIED = '2026-08-01';

export const metadata: Metadata = {
  title: '법정상속순위와 상속분 2026, 배우자 1.5·자녀 1 계산법',
  description:
    '재산 상속은 배우자와 직계비속이 1순위이며 배우자는 자녀보다 1.5배를 받습니다. 상속 순위, 법정상속분 계산, 유류분과 상속포기까지 민법 §1000·§1003·§1009 기준으로 정리했습니다.',
  keywords: [
    '법정상속순위',
    '법정상속분',
    '배우자 상속분 1.5',
    '상속 순위',
    '유류분',
    '민법 1009조',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '법정상속순위와 상속분 2026, 배우자 1.5·자녀 1 계산법' }],
    title: '법정상속순위와 상속분 2026, 배우자 1.5배 계산법',
    description: '배우자·직계비속 1순위, 배우자는 1.5배. 상속 순위와 법정상속분, 유류분, 상속포기까지 민법 기준 정리.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '법정상속순위와 상속분 2026',
    description: '배우자 1.5배, 자녀 각 1. 상속 순위와 법정상속분 계산을 민법 §1000·§1009로 정리.',
  },
};

const FAQ_ITEMS = [
  {
    question: '법정상속순위는 어떻게 되나요?',
    answer:
      '1순위 직계비속(자녀·손자녀), 2순위 직계존속(부모·조부모), 3순위 형제자매, 4순위 4촌 이내 방계혈족 순입니다(민법 §1000). 앞 순위 상속인이 한 명이라도 있으면 뒤 순위는 상속받지 못합니다. 배우자는 별도로 1순위 또는 2순위와 공동 상속합니다.',
  },
  {
    question: '배우자는 얼마를 상속받나요?',
    answer:
      '배우자는 다른 상속인보다 1.5배를 받습니다(민법 §1009). 자녀와 함께 상속하면 자녀는 각 1, 배우자는 1.5의 비율입니다. 배우자는 직계비속 또는 직계존속과 공동으로 상속하며, 이들이 모두 없으면 배우자가 단독으로 전부 상속합니다(민법 §1003).',
  },
  {
    question: '자녀 2명과 배우자면 각각 얼마인가요?',
    answer:
      '배우자 1.5, 자녀 각 1의 비율이므로 합이 3.5입니다. 따라서 배우자는 3/7, 자녀는 각각 2/7씩 받습니다. 상속재산이 7억원이면 배우자 3억원, 자녀가 각 2억원입니다. 자녀 수가 늘면 배우자 몫의 분모가 커져 비율이 조정됩니다.',
  },
  {
    question: '자녀가 없으면 부모가 상속받나요?',
    answer:
      '직계비속이 없으면 배우자와 직계존속(부모)이 공동 상속합니다. 이때도 배우자는 1.5배입니다. 부모가 모두 없으면 배우자가 단독 상속하며, 배우자마저 없으면 형제자매가 상속합니다. 즉 배우자가 있으면 형제자매는 상속받지 못합니다.',
  },
  {
    question: '유류분이 무엇인가요?',
    answer:
      '유류분은 유언과 무관하게 법이 보장하는 최소한의 상속 몫입니다. 배우자와 직계비속은 법정상속분의 1/2, 직계존속은 1/3이 유류분입니다(민법 §1112). 특정인에게 전 재산을 준다는 유언이 있어도, 유류분권자는 부족분을 청구할 수 있습니다.',
  },
  {
    question: '형제자매도 유류분이 있나요?',
    answer:
      '아닙니다. 형제자매의 유류분은 2024년 헌법재판소 결정으로 효력을 잃어 더 이상 인정되지 않습니다. 따라서 유류분을 주장할 수 있는 사람은 배우자, 직계비속, 직계존속으로 한정됩니다.',
  },
  {
    question: '빚이 더 많으면 상속을 포기할 수 있나요?',
    answer:
      '가능합니다. 상속인은 상속개시를 안 날부터 3개월 이내에 가정법원에 상속포기 또는 한정승인을 신청할 수 있습니다(민법 §1019). 상속포기는 재산과 빚을 모두 받지 않는 것이고, 한정승인은 상속받은 재산 한도에서만 빚을 갚는 방식입니다.',
  },
  {
    question: '법정상속분과 다르게 나눌 수 있나요?',
    answer:
      '네, 상속인 전원이 합의하면 협의분할로 법정상속분과 다르게 나눌 수 있습니다. 유언이 있으면 유언이 우선하되, 유류분을 침해하면 유류분 청구 대상이 됩니다. 법정상속분은 합의가 없거나 분쟁이 있을 때 적용되는 기준선입니다.',
  },
];

export default function LegalInheritanceOrderShare2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '법정상속순위와 상속분 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '법정상속순위와 상속분 2026, 배우자 1.5·자녀 1 계산법',
    description:
      '법정상속순위(직계비속·직계존속·형제자매), 배우자 1.5배 법정상속분, 3/7·2/7 계산 사례, 유류분과 상속포기까지 민법 §1000·§1003·§1009 기준으로 정리.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['법정상속순위', '법정상속분', '배우자 1.5배', '유류분', '민법'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '법정상속순위와 상속분 2026',
    description:
      '상속 순위와 배우자 1.5배 법정상속분, 유류분·상속포기를 민법 조문으로 정리한 실전 가이드.',
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
                    { name: '법정상속순위와 상속분 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">상속 준비 가족 · 8분 읽기 · 2026-08-01</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  법정상속순위와 상속분 2026
                  <br />
                  <span className="text-2xl text-text-secondary">배우자 1.5, 자녀 1 계산법</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  가족이 세상을 떠나면 남은 재산을 누가 얼마씩 받는지가 곧바로 문제가 됩니다. 유언이 없거나 상속인들이 다투면 민법이 정한 법정상속순위와 법정상속분이 기준이 됩니다. 이 가이드는 상속인이 되는 순서, 배우자가 왜 1.5배를 받는지, 실제 재산을 나누는 계산법, 그리고 유류분과 상속포기까지 민법 조문을 기준으로 상속을 처음 겪는 분도 이해할 수 있게 정리합니다.
                </p>
              </header>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">법정상속순위는 어떻게 정해지나요?</h2>
                <p>
                  가까운 혈족 순서로 정해집니다. 민법 §1000은 1순위 직계비속(자녀·손자녀), 2순위 직계존속(부모·조부모), 3순위 형제자매, 4순위 4촌 이내 방계혈족으로 상속 순위를 규정합니다. 앞 순위 상속인이 한 명이라도 있으면 뒤 순위는 상속받지 못합니다.
                </p>
                <p>
                  배우자는 순위가 따로 있습니다. 민법 §1003에 따라 배우자는 1순위(직계비속) 또는 2순위(직계존속)와 공동으로 상속하고, 이들이 모두 없으면 배우자가 단독으로 전부 상속합니다. 즉 배우자가 있으면 형제자매에게는 상속이 돌아가지 않습니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">순위 요약</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    1순위: 직계비속 + 배우자
                    <br />
                    2순위: 직계존속 + 배우자 (직계비속이 없을 때)
                    <br />
                    배우자만 있고 직계비속·직계존속이 모두 없으면: 배우자 단독 상속
                    <br />
                    3순위 형제자매: 배우자·직계비속·직계존속이 모두 없을 때만 상속
                  </p>
                </div>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">배우자는 왜 1.5배를 받나요?</h2>
                <p>
                  법이 배우자의 기여를 더 크게 인정하기 때문입니다. 민법 §1009는 같은 순위 상속인은 균등하게 나누되, 배우자는 직계비속·직계존속과 공동 상속할 때 그 상속분에 5할을 더하도록 규정합니다. 결과적으로 배우자는 자녀 1에 대해 1.5의 비율을 받습니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 가족 구성별 법정상속분 비율 (민법 §1009 기준)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">상속인 구성</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">비율</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">배우자 몫</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">배우자 + 자녀 1명</td>
                        <td className="p-3">1.5 : 1</td>
                        <td className="p-3">3/5</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">배우자 + 자녀 2명</td>
                        <td className="p-3">1.5 : 1 : 1</td>
                        <td className="p-3">3/7</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">배우자 + 자녀 3명</td>
                        <td className="p-3">1.5 : 1 : 1 : 1</td>
                        <td className="p-3">3/9</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">배우자 + 부모 (자녀 없음)</td>
                        <td className="p-3">1.5 : 1 : 1</td>
                        <td className="p-3">3/7</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  다만 이 비율은 유언이나 상속인 전원의 협의가 없을 때 적용되는 기준선입니다. 상속인들이 합의하면 다르게 나눌 수 있습니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">실제 상속재산 분할 계산 사례</h2>
                <p>
                  비율을 실제 금액으로 바꾸는 과정을 세 가지 사례로 살펴보겠습니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 1. 배우자 + 자녀 2명, 상속재산 7억원</p>
                  <p className="text-sm text-text-secondary">
                    · 비율: 배우자 1.5, 자녀 각 1 → 합 3.5
                    <br />
                    · 배우자: 7억 × (1.5/3.5) = 7억 × 3/7 = <strong>3억원</strong>
                    <br />
                    · 자녀 각각: 7억 × (1/3.5) = 7억 × 2/7 = <strong>2억원</strong>
                    <br />
                    <span className="text-xs text-text-tertiary">검산: 3억 + 2억 + 2억 = 7억원.</span>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 2. 배우자 + 자녀 1명, 상속재산 10억원</p>
                  <p className="text-sm text-text-secondary">
                    · 비율: 배우자 1.5, 자녀 1 → 합 2.5
                    <br />
                    · 배우자: 10억 × (1.5/2.5) = 10억 × 3/5 = <strong>6억원</strong>
                    <br />
                    · 자녀: 10억 × (1/2.5) = 10억 × 2/5 = <strong>4억원</strong>
                    <br />
                    <span className="text-xs text-text-tertiary">검산: 6억 + 4억 = 10억원.</span>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 3. 배우자만 있고 자녀·부모 없음, 상속재산 5억원</p>
                  <p className="text-sm text-text-secondary">
                    · 직계비속·직계존속이 모두 없으므로 배우자 단독 상속
                    <br />
                    · 배우자: <strong>5억원 전액</strong>
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 형제자매가 있어도 배우자가 있으면 형제자매는 상속받지 못합니다.</span>
                  </p>
                </div>
              </section>

              <section className="space-y-6 border-t border-border-base pt-8">
                <h2 className="text-2xl font-bold">유류분과 상속포기, 무엇을 챙겨야 하나</h2>
                <p>
                  법정상속분 외에 반드시 알아둘 두 가지가 유류분과 상속포기입니다.
                </p>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li>
                    <strong>유류분(민법 §1112):</strong> 유언과 무관하게 법이 보장하는 최소 상속 몫입니다. 배우자와 직계비속은 법정상속분의 1/2, 직계존속은 1/3입니다. 특정인에게 재산을 몰아준 유언이 있어도 부족분을 청구할 수 있습니다.
                  </li>
                  <li>
                    <strong>형제자매 유류분 폐지:</strong> 형제자매의 유류분은 2024년 헌법재판소 결정으로 효력을 잃었습니다. 이제 유류분권자는 배우자·직계비속·직계존속뿐입니다.
                  </li>
                  <li>
                    <strong>상속포기·한정승인(민법 §1019):</strong> 빚이 더 많으면 상속개시를 안 날부터 3개월 이내에 가정법원에 신청할 수 있습니다. 포기는 재산·빚 모두 받지 않는 것, 한정승인은 상속받은 재산 한도에서만 빚을 갚는 방식입니다.
                  </li>
                </ul>
                <p className="mt-4">
                  다만 상속세는 상속분과 별개로 상속개시일이 속한 달의 말일부터 6개월 이내에 신고·납부해야 합니다. 상속재산 분할 방식과 세금 신고는 함께 계획하는 것이 좋습니다.
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
                    <p className="mt-1 text-sm text-text-secondary">상속재산과 공제를 넣어 상속세를 계산해보세요.</p>
                  </Link>
                  <Link
                    href="/guide/inheritance-tax-calculation-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">상속세 계산법 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">세율·공제·과세표준의 기본 구조를 배우세요.</p>
                  </Link>
                  <Link
                    href="/guide/inheritance-tax-deduction-limit-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">상속세 공제 한도</div>
                    <p className="mt-1 text-sm text-text-secondary">배우자공제·일괄공제 등 공제 항목 정리.</p>
                  </Link>
                  <Link
                    href="/guide/inheritance-limited-acceptance-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">한정승인 절차</div>
                    <p className="mt-1 text-sm text-text-secondary">빚이 많을 때 한정승인·상속포기 실무.</p>
                  </Link>
                  <Link
                    href="/guide/inheritance-vs-gift-tax-comparison-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">상속 vs 증여 비교</div>
                    <p className="mt-1 text-sm text-text-secondary">사전 증여와 상속의 세부담 차이를 비교하세요.</p>
                  </Link>
                  <Link
                    href="/category/tax/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">모든 세금 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">상속세·증여세·양도세 모음.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 교육 목적으로 작성되었으며, 개인 맞춤형 법률 조언이 아닙니다. 실제 상속인 확정, 상속분 계산, 유류분·상속포기 절차는 가족관계와 개별 사정에 따라 달라지므로, 분쟁이 예상되거나 재산·채무 규모가 크면 변호사·법무사 등 전문가 상담을 받으세요. 본 콘텐츠의 법적 기준은 <strong>민법 §1000(상속순위)</strong>, <strong>민법 §1003(배우자 상속)</strong>, <strong>민법 §1009(법정상속분)</strong>, <strong>민법 §1112(유류분)</strong>, <strong>민법 §1019(승인·포기 기간)</strong>을 따르며, 2026-08-01 기준으로 작성되었습니다. AI 보조 작성 후 운영자 검수 완료.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터(민법)</a>,{' '}
                  <a href="https://www.nts.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">국세청(상속세 안내)</a>.
                </p>
              </section>

              <ShareButtons
                title="법정상속순위와 상속분 2026 가이드"
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
