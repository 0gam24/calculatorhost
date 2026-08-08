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

const URL = 'https://calculatorhost.com/guide/parental-benefit-child-allowance-2026/';
const DATE_PUBLISHED = '2026-08-09';
const DATE_MODIFIED = '2026-08-09';

export const metadata: Metadata = {
  title: '부모급여 아동수당 2026, 금액·중복·신청 총정리',
  description:
    '2026년 부모급여는 0세 월 100만 원, 1세 월 50만 원이고 아동수당은 만 8세 미만 월 10만 원입니다. 소득과 무관하며 0~1세는 둘 다 받습니다. 신청 시기(출생 60일 이내)와 지급일(매월 25일)까지 정리했습니다.',
  keywords: [
    '부모급여 2026',
    '아동수당 2026',
    '부모급여 아동수당 차이',
    '부모급여 신청',
    '부모급여 금액',
    '아동수당 만 8세',
    '아동수당법 4조',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '부모급여 아동수당 2026 금액과 신청' }],
    title: '부모급여 아동수당 2026, 금액·중복·신청 총정리',
    description: '0세 월 100만 원, 1세 월 50만 원 부모급여와 만 8세 미만 월 10만 원 아동수당. 중복 수급, 신청 시기, 지급일을 정리했습니다.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '부모급여 아동수당 2026 금액·중복·신청',
    description: '0세 100만·1세 50만 부모급여와 만 8세 미만 10만 아동수당. 중복 수급과 신청 60일 규칙 정리.',
  },
};

const FAQ_ITEMS = [
  {
    question: '부모급여와 아동수당은 무엇이 다른가요?',
    answer:
      '부모급여는 0~1세 영아에게, 아동수당은 만 8세 미만 아동에게 주는 별개의 지원입니다. 부모급여는 생후 초기 양육 부담을 덜기 위한 제도로 0세와 1세만 대상이고, 아동수당은 더 오랜 기간 지급됩니다. 두 제도는 목적과 대상 연령이 달라 함께 받을 수 있습니다.',
  },
  {
    question: '2026년 부모급여는 얼마를 받나요?',
    answer:
      '0세는 월 100만 원, 1세는 월 50만 원입니다. 소득이나 재산과 관계없이 지급되는 보편 지원이며, 아이가 생후 24개월이 되기 전까지 받습니다. 즉 0세 구간에서 매월 100만 원, 1세 구간에서 매월 50만 원이 지급됩니다.',
  },
  {
    question: '아동수당은 몇 살까지 얼마를 받나요?',
    answer:
      '만 8세 미만까지 월 10만 원입니다. 아동수당법 §4에 따라 만 8세가 되기 전(95개월까지)의 아동에게 소득과 무관하게 월 10만 원을 지급합니다. 부모급여를 받는 0~1세 아동도 아동수당을 함께 받습니다.',
  },
  {
    question: '부모급여와 아동수당을 동시에 받을 수 있나요?',
    answer:
      '네, 0~1세라면 둘 다 받습니다. 두 제도는 중복 수급이 허용되므로 0세 아동은 부모급여 100만 원과 아동수당 10만 원을 합쳐 월 110만 원을, 1세 아동은 부모급여 50만 원과 아동수당 10만 원을 합쳐 월 60만 원을 받을 수 있습니다.',
  },
  {
    question: '언제까지 신청해야 소급해서 받나요?',
    answer:
      '출생일 포함 60일 이내에 신청해야 출생월부터 소급됩니다. 이 기한을 넘기면 이미 지난 달분은 받지 못하고 신청한 달부터 지급됩니다. 출생신고와 함께 처리하는 것이 가장 확실합니다.',
  },
  {
    question: '지급일은 언제인가요?',
    answer:
      '매월 25일에 신청 계좌로 입금됩니다. 부모급여와 아동수당 모두 매월 25일 지급이 원칙입니다. 25일이 주말이나 공휴일이면 앞당겨 지급될 수 있습니다.',
  },
  {
    question: '어린이집에 보내면 부모급여가 줄어드나요?',
    answer:
      '보육료 바우처로 지원되고 남는 금액은 현금으로 받습니다. 0세가 어린이집을 이용하면 부모급여가 보육료 바우처 형태로 지원되며, 부모급여액이 보육료보다 크면 그 차액을 현금으로 받습니다. 가정 양육이든 시설 이용이든 총 지원 수준은 같은 취지로 설계되어 있습니다.',
  },
];

export default function ParentalBenefitChildAllowance2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '부모급여 아동수당 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '부모급여 아동수당 2026, 금액·중복·신청 총정리',
    description:
      '2026년 부모급여(0세 100만·1세 50만)와 아동수당(만 8세 미만 10만)의 차이, 중복 수급, 신청 시기(출생 60일 이내 소급), 지급일(매월 25일), 어린이집 이용 시 지급 방식을 정리.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['부모급여', '아동수당', '중복 수급', '아동수당법 4조', '양육 지원'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '부모급여 아동수당 2026',
    description:
      '부모급여와 아동수당의 금액·대상·중복 수급·신청 방법을 정리한 영유아 양육 지원 가이드.',
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
                    { name: '부모급여 아동수당 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">영유아 부모 · 7분 읽기 · 2026-08-09</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  부모급여 아동수당 2026
                  <br />
                  <span className="text-2xl text-text-secondary">금액·중복 수급·신청 총정리</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  아이를 낳고 부모급여와 아동수당을 각각 얼마씩, 언제까지, 둘 다 받을 수 있는지 헷갈리는 부모를 위한 가이드입니다. 두 제도가 어떻게 다른지, 2026년 금액은 얼마인지, 0~1세는 왜 두 가지를 동시에 받는지, 신청은 언제까지 해야 소급되는지, 어린이집에 보내면 어떻게 지급되는지를 표와 함께 정리했습니다.
                </p>
              </header>

              <AdSlot slot="guide-parental-benefit-child-allowance-top" format="horizontal" />

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">부모급여와 아동수당은 무엇이 다른가요?</h2>
                <p>
                  부모급여는 0~1세 영아에게, 아동수당은 만 8세 미만 아동에게 주는 별개의 지원입니다. 부모급여는 출생 초기의 집중 양육 부담을 덜기 위한 제도로 지급 기간이 짧은 대신 금액이 크고, 아동수당은 더 오랜 기간에 걸쳐 매월 일정액을 지원합니다. 두 제도는 대상 연령과 목적이 달라 서로 배제하지 않습니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 부모급여와 아동수당 비교 (2026 기준)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">구분</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">부모급여</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">아동수당</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">대상 연령</td>
                        <td className="p-3">0세, 1세 (24개월 전까지)</td>
                        <td className="p-3">만 8세 미만</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">월 금액</td>
                        <td className="p-3"><strong>0세 100만 · 1세 50만</strong></td>
                        <td className="p-3"><strong>10만</strong></td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">소득·재산 기준</td>
                        <td className="p-3">없음 (보편)</td>
                        <td className="p-3">없음 (보편)</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">중복 수급</td>
                        <td className="p-3" colSpan={2}>0~1세는 두 제도 동시 수급 가능</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  다만 아동수당의 지급 대상 연령 확대나 금액 조정은 정책적으로 논의될 수 있으므로, 최신 기준은 복지로나 관할 주민센터에서 확인하는 것이 정확합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">부모급여는 얼마를 언제까지 받나요?</h2>
                <p>
                  0세는 월 100만 원, 1세는 월 50만 원을 24개월이 되기 전까지 받습니다. 소득이나 재산과 무관한 보편 지원이며, 저출산 대응을 위한 정부의 양육 지원 사업으로 운영됩니다. 아이가 생후 24개월이 되면 부모급여는 종료되고, 이후에도 아동수당은 계속 지급됩니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례. 2026년에 태어난 아이의 첫 2년 지원액</p>
                  <p className="text-sm text-text-secondary">
                    · 0세(첫 12개월): 부모급여 100만 × 12 = 1,200만 원 + 아동수당 10만 × 12 = 120만 원
                    <br />
                    · 1세(다음 12개월): 부모급여 50만 × 12 = 600만 원 + 아동수당 10만 × 12 = 120만 원
                    <br />
                    · 2년 합계: <strong>약 2,040만 원</strong>
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 첫 2년 동안 부모급여와 아동수당만으로도 2천만 원 안팎을 지원받습니다(월 지급 기준 단순 합산).</span>
                  </p>
                </div>
                <p className="mt-4">
                  다만 위 금액은 월 지급액을 단순 합산한 예시이며, 어린이집 이용 여부에 따라 현금과 바우처의 구성이 달라질 수 있습니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">아동수당은 몇 살까지 받나요?</h2>
                <p>
                  만 8세가 되기 전까지 매월 10만 원을 받습니다. 아동수당법 §4는 만 8세 미만의 아동에게 아동수당을 지급하도록 정하며, 소득이나 재산과 무관한 보편 지원입니다. 지급 신청과 절차는 아동수당법 §5에 따라 보호자가 주소지 관할 기관에 신청합니다.
                </p>
                <p>
                  주의: 아동이 만 8세가 되는 달의 기준을 넘어가면 지급이 종료됩니다. 또한 부정한 방법으로 받은 아동수당은 아동수당법 §11에 따라 환수될 수 있으므로, 계좌 변경이나 국외 체류 등 자격 변동 사항은 제때 신고해야 합니다.
                </p>
              </section>

              <AdSlot slot="guide-parental-benefit-child-allowance-mid" format="rectangle" />

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">언제 어떻게 신청하나요?</h2>
                <p>
                  출생일을 포함해 60일 이내에 신청하면 출생월부터 소급 지급됩니다. 이 기한을 놓치면 이미 지난 달분은 받을 수 없고 신청한 달부터 지급되므로, 출생신고와 함께 처리하는 것이 가장 확실합니다.
                </p>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li><strong>신청 시기:</strong> 출생일 포함 60일 이내 신청 시 출생월부터 소급</li>
                  <li><strong>신청 방법:</strong> 주소지 주민센터 방문, 또는 복지로·정부24 온라인 신청</li>
                  <li><strong>지급일:</strong> 매월 25일 신청 계좌로 입금(주말·공휴일이면 앞당겨 지급)</li>
                  <li><strong>동시 신청:</strong> 출생신고 시 부모급여·아동수당을 함께 신청하는 절차 이용 가능</li>
                </ul>
                <p className="mt-4">
                  예외: 부모의 국외 체류, 아동의 해외 이주 등 자격에 영향을 주는 사유가 생기면 지급이 중단되거나 조정될 수 있으므로 변동 시 신고가 필요합니다.
                </p>
              </section>

              <section className="space-y-6 border-t border-border-base pt-8">
                <h2 className="text-2xl font-bold">어린이집에 보내면 지원이 달라지나요?</h2>
                <p>
                  가정 양육이면 현금, 어린이집을 이용하면 보육료 바우처로 지원됩니다. 0세가 어린이집을 이용하면 부모급여가 보육료 바우처 형태로 지급되고, 부모급여액이 보육료보다 크면 그 차액을 현금으로 받습니다. 결과적으로 가정에서 키우든 시설을 이용하든 총 지원 취지가 유지되도록 설계되어 있습니다.
                </p>
                <p>
                  다만 어린이집 이용 여부에 따라 신청·변경 절차가 달라질 수 있으므로, 등원을 시작하거나 중단할 때는 관할 주민센터에 반드시 알려야 합니다. 지원 형태가 바뀌면서 일시적으로 지급 방식이 조정될 수 있기 때문입니다.
                </p>
              </section>

              <h2 className="text-2xl font-bold mb-6">자주 묻는 질문</h2>
              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h3 className="text-lg font-semibold text-text-primary">관련 계산기 및 가이드</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link
                    href="/guide/parental-leave-benefit-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">육아휴직 급여 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">부모급여와 함께 챙길 수 있는 육아휴직 급여를 확인하세요.</p>
                  </Link>
                  <Link
                    href="/guide/child-tax-credit-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">자녀세액공제 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">연말정산에서 자녀 관련 세액공제를 정리했습니다.</p>
                  </Link>
                  <Link
                    href="/guide/marriage-childbirth-gift-deduction-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">혼인·출산 증여공제 1억</div>
                    <p className="mt-1 text-sm text-text-secondary">출산 전후 자금 이전 시 증여세 공제를 확인하세요.</p>
                  </Link>
                  <Link
                    href="/guide/maternity-leave-benefit-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">출산전후휴가 급여</div>
                    <p className="mt-1 text-sm text-text-secondary">출산 전후 휴가와 급여 지원을 함께 살펴보세요.</p>
                  </Link>
                  <Link
                    href="/guide/child-tax-benefit-payment-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">자녀장려금 지급</div>
                    <p className="mt-1 text-sm text-text-secondary">저소득 가구가 받는 자녀장려금 기준을 확인하세요.</p>
                  </Link>
                  <Link
                    href="/category/work/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">모든 근로·가계 가이드</div>
                    <p className="mt-1 text-sm text-text-secondary">급여·양육·가계 지원 가이드 모음.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 교육 목적으로 작성되었으며 개인 맞춤형 조언이 아닙니다. 부모급여·아동수당의 금액, 대상 연령, 지급·신청 방식은 정부 정책과 예산에 따라 달라질 수 있으므로, 최신 기준과 개인별 자격은 복지로(bokjiro.go.kr) 또는 관할 주민센터에서 확인하시기 바랍니다. 부모급여는 보건복지부의 양육 지원 사업으로 운영되며, 아동수당은 <strong>아동수당법 §4(지급대상), §5(지급 신청), §11(아동수당의 환수)</strong>을 따릅니다. 본 콘텐츠는 2026-08-09를 기준으로 작성되었으며 정책 변경 시 업데이트됩니다. AI 보조 작성 후 운영자 검수 완료.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터</a>,{' '}
                  <a href="https://www.mohw.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">보건복지부</a>.
                </p>
              </section>

              <ShareButtons
                title="부모급여 아동수당 2026 가이드"
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