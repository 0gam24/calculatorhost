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

const URL = 'https://calculatorhost.com/guide/sincere-filing-confirmation-2026/';
const DATE_PUBLISHED = '2026-07-31';
const DATE_MODIFIED = '2026-07-31';

export const metadata: Metadata = {
  title: '성실신고확인제 2026, 대상 기준수입금액과 세무사 확인',
  description:
    '매출이 업종별 기준(도소매 15억, 제조 7.5억, 서비스 5억)을 넘는 개인사업자는 종합소득세를 세무사 확인 후 6월 말까지 신고해야 합니다. 대상 판정과 세액공제, 미제출 가산세를 소득세법 §70의2 기준으로 정리했습니다.',
  keywords: [
    '성실신고확인제',
    '성실신고확인 대상',
    '기준수입금액',
    '개인사업자 종합소득세',
    '성실신고확인비용 세액공제',
    '성실신고 가산세',
    '소득세법 70조의2',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '성실신고확인제 2026, 대상 기준수입금액과 세무사 확인' }],
    title: '성실신고확인제 2026, 내 매출이면 대상일까',
    description: '업종별 기준수입금액을 넘으면 세무사 확인 후 6월 말까지 신고. 대상 판정과 세액공제, 가산세 정리.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '성실신고확인제 2026, 대상 기준수입금액과 세무사 확인',
    description: '도소매 15억, 제조 7.5억, 서비스 5억 이상이면 대상. 소득세법 §70의2.',
  },
};

const FAQ_ITEMS = [
  {
    question: '성실신고확인제가 무엇인가요?',
    answer:
      '일정 규모 이상의 개인사업자가 종합소득세를 신고하기 전에 세무사, 공인회계사, 세무법인 등 전문가에게 장부와 증빙의 정확성을 확인받도록 한 제도입니다(소득세법 §70의2). 확인받은 사업자는 성실신고확인서를 종합소득세 신고와 함께 제출해야 합니다. 고소득 개인사업자의 신고 정확성을 높이려는 목적입니다.',
  },
  {
    question: '나는 성실신고확인 대상인가요?',
    answer:
      '직전 과세기간(2025년)의 수입금액 합계가 업종별 기준을 넘으면 대상입니다(소득세법 시행령 §133). 도소매·부동산매매업 등은 15억원, 제조·숙박·음식·건설·운수 등은 7억 5천만원, 부동산임대·전문서비스·보건·교육 등은 5억원이 기준입니다. 사업장이 여러 곳이거나 업종이 둘 이상이어도 동일인의 수입금액을 합산해 판단합니다.',
  },
  {
    question: '신고기한이 5월 31일이 아닌가요?',
    answer:
      '성실신고확인 대상자는 종합소득세 신고기한이 6월 30일까지로 한 달 연장됩니다(소득세법 §70의2). 일반 개인사업자는 5월 31일까지지만, 세무사 확인 절차가 필요한 성실신고 대상자에게는 준비 시간을 더 주는 것입니다. 다만 납부도 6월 30일까지이므로 기한을 넘기지 않도록 유의하세요.',
  },
  {
    question: '확인비용은 세액공제되나요?',
    answer:
      '네, 성실신고확인에 든 비용의 일부를 세액공제받을 수 있습니다(조세특례제한법 §126의6). 개인사업자는 확인비용의 60%를 공제하며 한도가 있습니다. 다만 사업소득에 대한 세액공제이므로, 결손 등으로 산출세액이 없으면 공제 실익이 줄어듭니다. 정확한 공제율과 한도는 국세청 안내를 확인하세요.',
  },
  {
    question: '확인을 받으면 다른 혜택도 있나요?',
    answer:
      '성실신고확인 대상자는 근로자처럼 의료비·교육비 세액공제를 적용받을 수 있습니다(소득세법 §122의3). 일반 사업자에게는 없는 공제로, 성실신고확인의 부담을 일부 보전해 주는 장치입니다. 구체적 요건은 세무 전문가와 상담해 적용 여부를 확인하는 것이 안전합니다.',
  },
  {
    question: '확인서를 안 내면 어떻게 되나요?',
    answer:
      '성실신고확인서를 제출하지 않으면 산출세액의 일정 비율이 가산세로 부과됩니다. 또한 세무조사 대상 선정에서 불리해질 수 있고, 사업자에 대한 사후 검증이 강화될 수 있습니다. 미제출 가산세율과 산정 방식은 국세청 안내를 확인하고, 기한 내 확인서를 반드시 첨부하세요.',
  },
  {
    question: '세무대리인이 아무나 확인해줄 수 있나요?',
    answer:
      '아니요. 성실신고확인은 세무사, 공인회계사, 세무법인 또는 회계법인만 수행할 수 있습니다. 신고를 대리한 세무대리인이 확인까지 함께 하는 경우가 많지만, 확인 주체의 자격을 반드시 확인해야 합니다. 자격이 없는 자가 작성한 확인서는 효력이 인정되지 않습니다.',
  },
];

export default function SincereFilingConfirmation2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '성실신고확인제 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '성실신고확인제 2026, 대상 기준수입금액과 세무사 확인',
    description:
      '매출이 업종별 기준을 넘는 개인사업자가 세무사 확인 후 6월 말까지 종합소득세를 신고하는 성실신고확인제. 대상 판정, 신고기한, 세액공제, 미제출 가산세까지 정리.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['성실신고확인제', '기준수입금액', '개인사업자', '종합소득세', '세액공제'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '성실신고확인제 2026',
    description:
      '업종별 기준수입금액을 넘는 개인사업자가 세무사 확인을 받아 신고하는 성실신고확인제의 대상과 절차.',
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
                    { name: '성실신고확인제 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">개인사업자 · 8분 읽기 · 2026-07-31</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  성실신고확인제 2026
                  <br />
                  <span className="text-2xl text-text-secondary">대상 기준수입금액과 세무사 확인</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  이 가이드는 매출 규모가 커진 개인사업자와 프리랜서를 위한 것입니다. 직전 연도 수입금액이 업종별 기준을 넘으면 종합소득세를 낼 때 세무사 확인을 먼저 받아야 하고, 신고기한도 6월 말로 바뀝니다. 내가 대상인지 판정하는 법, 신고기한, 세액공제와 가산세를 순서대로 정리했습니다.
                </p>
              </header>

              <AdSlot slot="guide-sincere-filing-confirmation-top" format="horizontal" />

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">성실신고확인제란 무엇인가요?</h2>
                <p>
                  일정 규모 이상의 개인사업자가 종합소득세를 신고하기 전에 세무 전문가로부터 장부와 증빙의 정확성을 확인받도록 한 제도입니다(소득세법 §70의2). 확인받은 사업자는 성실신고확인서를 신고서와 함께 제출해야 합니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">한눈에 보는 성실신고확인제</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    · 대상: 직전 연도 수입금액이 업종별 기준 이상인 개인사업자
                    <br />
                    · 확인 주체: 세무사·공인회계사·세무법인·회계법인
                    <br />
                    · 신고기한: 6월 30일(일반 5월 31일에서 연장)
                    <br />
                    · 근거: 소득세법 §70의2, 시행령 §133
                  </p>
                </div>
                <p className="mt-4">
                  다만 성실신고확인은 세무조사가 아니라 신고 전 자율 검증 절차입니다. 확인을 받았다고 해서 세무조사가 면제되는 것은 아니며, 부실하게 확인하면 세무대리인도 징계를 받을 수 있습니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">나는 대상인가요? 업종별 기준수입금액</h2>
                <p>
                  직전 과세기간(2025년)의 수입금액 합계가 업종별 기준 이상이면 2026년 5월(연장 시 6월) 신고에서 대상이 됩니다. 기준은 소득세법 시행령 §133에 따라 세 그룹으로 나뉩니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 업종별 성실신고확인 기준수입금액 (소득세법 시행령 §133)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">업종 그룹</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">주요 업종</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">기준수입금액</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">1그룹</td>
                        <td className="p-3">농업·어업·광업, 도매·소매업, 부동산매매업 등</td>
                        <td className="p-3"><strong>15억원 이상</strong></td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">2그룹</td>
                        <td className="p-3">제조·숙박·음식점·건설·운수·정보통신 등</td>
                        <td className="p-3"><strong>7억 5천만원 이상</strong></td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">3그룹</td>
                        <td className="p-3">부동산임대·전문서비스·교육·보건·예술 등</td>
                        <td className="p-3"><strong>5억원 이상</strong></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  예외: 업종이 둘 이상이면 주업종 기준으로 다른 업종 수입금액을 환산해 합산하는 별도 규정이 있습니다. 겸업 사업자는 단순히 각 매출을 더하는 것이 아니므로, 경계선에 있다면 세무 전문가에게 정확한 환산을 요청하세요.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">대상 판정 실제 사례</h2>
                <p>
                  기준 금액 근처에서는 1원 차이로 대상 여부가 갈립니다. 도매·소매업(1그룹, 15억원)을 예로 경계값을 살펴보겠습니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 1. 도소매업 2025년 수입금액 14억 9천만원</p>
                  <p className="text-sm text-text-secondary">
                    · 기준(15억원) 미달 → 성실신고확인 대상 아님
                    <br />
                    · 2026년 5월 31일까지 일반 종합소득세 신고
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 기준 미만이면 세무사 확인서 없이 통상 신고합니다.</span>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 2. 도소매업 2025년 수입금액 15억 1천만원</p>
                  <p className="text-sm text-text-secondary">
                    · 기준(15억원) 이상 → 성실신고확인 대상
                    <br />
                    · 세무사 등의 확인을 받아 성실신고확인서 첨부
                    <br />
                    · 신고기한 2026년 6월 30일까지로 연장
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 2천만원 차이지만 확인 의무와 기한이 모두 달라집니다.</span>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 3. 학원업(3그룹) 2025년 수입금액 5억 2천만원</p>
                  <p className="text-sm text-text-secondary">
                    · 3그룹 기준(5억원) 이상 → 성실신고확인 대상
                    <br />
                    · 같은 매출이라도 3그룹은 5억, 1그룹은 15억으로 기준이 크게 다름
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 업종 그룹을 먼저 확인해야 대상 여부를 정확히 알 수 있습니다.</span>
                  </p>
                </div>
              </section>

              <AdSlot slot="guide-sincere-filing-confirmation-mid" format="rectangle" />

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">혜택과 불이익은 무엇인가요?</h2>
                <p>
                  성실신고확인 대상자에게는 부담을 보전하는 혜택과, 의무를 어길 때의 불이익이 함께 있습니다.
                </p>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li>
                    <strong>신고기한 연장:</strong> 신고·납부 기한이 6월 30일까지로 한 달 늘어납니다(소득세법 §70의2).
                  </li>
                  <li>
                    <strong>확인비용 세액공제:</strong> 성실신고확인에 든 비용의 일부를 세액공제받습니다(조세특례제한법 §126의6). 개인은 확인비용의 60%를 공제하며 한도가 있습니다.
                  </li>
                  <li>
                    <strong>의료비·교육비 세액공제:</strong> 근로자처럼 의료비·교육비 세액공제를 적용받을 수 있습니다(소득세법 §122의3).
                  </li>
                  <li>
                    <strong>미제출 가산세:</strong> 확인서를 내지 않으면 산출세액의 일정 비율이 가산세로 부과되고, 세무조사 선정에서 불리해질 수 있습니다.
                  </li>
                </ul>
                <p className="mt-4">
                  다만 세액공제율·한도와 가산세율은 조세특례제한법과 국세청 고시로 조정될 수 있으므로, 실제 금액은 신고 시점의 국세청 안내로 확인하세요.
                </p>
              </section>

              <h2 className="text-2xl font-bold mb-6">자주 묻는 질문</h2>
              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h3 className="text-lg font-semibold text-text-primary">관련 계산기 및 가이드</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link
                    href="/calculator/freelancer-tax/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">프리랜서 종합소득세 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">경비율과 세율로 예상 세액을 계산해보세요.</p>
                  </Link>
                  <Link
                    href="/guide/freelancer-simplified-vs-standard-expense-rate-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">단순경비율 vs 기준경비율</div>
                    <p className="mt-1 text-sm text-text-secondary">경비율 적용 기준과 장부 작성의 갈림길.</p>
                  </Link>
                  <Link
                    href="/guide/bookkeeping-obligation-double-entry-vs-simple-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">복식부기 vs 간편장부</div>
                    <p className="mt-1 text-sm text-text-secondary">장부 작성 의무 기준과 무기장 가산세.</p>
                  </Link>
                  <Link
                    href="/guide/comprehensive-income-tax-rate-brackets-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">종합소득세 세율표 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">과세표준별 세율과 누진공제 정리.</p>
                  </Link>
                  <Link
                    href="/guide/business-credit-card-hometax-registration-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">사업용 신용카드 등록</div>
                    <p className="mt-1 text-sm text-text-secondary">홈택스 등록으로 경비 증빙을 자동화하세요.</p>
                  </Link>
                  <Link
                    href="/category/tax/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">모든 세금 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">종합소득세·부가세·양도세 계산기 모음.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 교육 목적으로 작성되었으며 개인 맞춤형 세무 조언이 아닙니다. 성실신고확인 대상 여부, 겸업 시 수입금액 환산, 세액공제율과 한도, 가산세율은 개별 상황과 개정에 따라 달라지므로, 실제 신고 전 국세청 또는 세무 전문가에게 반드시 확인하세요. 본 콘텐츠는 2026-07-31 기준이며 관련 법령은 <strong>소득세법 §70의2·§122의3, 소득세법 시행령 §133, 조세특례제한법 §126의6</strong>을 따릅니다. AI 보조 작성 후 운영자 검수 완료.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터</a>,{' '}
                  <a href="https://www.nts.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">국세청</a>,{' '}
                  <a href="https://www.hometax.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">홈택스</a>.
                </p>
              </section>

              <ShareButtons
                title="성실신고확인제 2026 가이드"
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
