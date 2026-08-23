// [revenue-lever: indexing+traffic] 인적용역 원천징수 3.3→2.2 인하 개편안 (프리랜서·배달라이더 롱테일)
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

const URL = 'https://calculatorhost.com/guide/freelancer-withholding-3-3-to-2-2-2026-reform/';
const DATE_PUBLISHED = '2026-08-24';
const DATE_MODIFIED = '2026-08-24';

export const metadata: Metadata = {
  title: '프리랜서 원천징수 3.3% 2.2% 인하 2026 개편안 정리',
  description:
    '2026 세제개편안이 인적용역 사업소득 원천징수 세율을 3%에서 2%로 낮춥니다. 지방세 포함 3.3%에서 2.2%로. 배달라이더·프리랜서 현금흐름은 늘지만 최종 세금은 5월 정산으로 같습니다(소득세법 §129).',
  keywords: [
    '프리랜서 원천징수 3.3%',
    '인적용역 원천징수 2.2%',
    '3.3% 2.2% 인하',
    '배달라이더 세금',
    '프리랜서 세금 개편',
    '소득세법 129조',
    '2026 세제개편안 프리랜서',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '프리랜서 원천징수 3.3% 2.2% 인하 2026 개편안 정리' }],
    title: '프리랜서 원천징수 3.3% 2.2% 인하 2026 개편안, 진짜 세금 줄까',
    description: '인적용역 사업소득 원천징수 3%에서 2%로 인하(정부안). 매달 떼는 돈은 줄지만 최종 세금은 5월 종합소득세 정산으로 같습니다. 소득세법 §129.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '프리랜서 원천징수 3.3% 2.2% 인하 2026 개편안 정리',
    description: '인적용역 원천징수 3%→2% 인하(정부안). 현금흐름은 늘지만 최종 세금은 5월 정산으로 동일. 소득세법 §129.',
  },
};

const FAQ_ITEMS = [
  {
    question: '프리랜서 3.3%가 2.2%로 줄어드나요?',
    answer:
      '2026년 세제개편안(정부안)에 담긴 내용입니다. 인적용역 사업소득의 원천징수 세율을 3%에서 2%로 낮추는 방향으로, 지방소득세를 포함하면 3.3%에서 2.2%로 줄어듭니다(소득세법 §129). 배달라이더 등 영세 인적용역 종사자의 세부담을 덜기 위한 조치입니다. 아직 국회 통과 전 정부안입니다.',
  },
  {
    question: '누구에게 적용되나요?',
    answer:
      '고용관계 없이 독립적으로 용역을 제공하는 인적용역 사업소득자에게 적용됩니다. 배달라이더, 학원강사, 보험설계사, 방문판매원, 프리랜서 디자이너·작가 등 사업장에서 3.3%를 떼고 대금을 받는 사람들입니다. 근로계약을 맺은 직장인(근로소득)에게는 해당하지 않습니다.',
  },
  {
    question: '원천징수가 줄면 세금이 진짜 줄어드나요?',
    answer:
      '최종 세금이 줄어드는 것은 아닙니다. 원천징수는 미리 떼어두는 예납일 뿐이고, 최종 세금은 이듬해 5월 종합소득세 신고로 정산합니다(소득세법 §129). 원천징수율이 낮아지면 매달 손에 쥐는 돈은 늘지만, 5월에 환급받을 금액이 줄거나 오히려 더 낼 수 있습니다. 현금흐름이 개선되는 것이 핵심입니다.',
  },
  {
    question: '3.3%는 어떻게 구성되나요?',
    answer:
      '소득세 3%와 지방소득세 0.3%를 더한 값입니다. 지방소득세는 소득세의 10%라서 3%의 10%인 0.3%가 붙어 합계 3.3%가 됩니다. 개편안대로 소득세가 2%로 내려가면 지방소득세는 0.2%가 되어 합계 2.2%가 됩니다.',
  },
  {
    question: '매달 얼마나 더 받게 되나요?',
    answer:
      '월 300만원을 받는 프리랜서라면 현행 3.3%로 9만9천원이 떼이는데, 2.2%가 되면 6만6천원만 떼여 매달 3만3천원을 더 받습니다. 다만 이는 미리 떼는 금액이 줄어드는 것이라, 연말 정산 시 최종 세액은 소득·경비에 따라 별도로 계산됩니다.',
  },
  {
    question: '그러면 5월 종합소득세 신고는 안 해도 되나요?',
    answer:
      '해야 합니다. 원천징수율이 낮아져도 인적용역 사업소득자는 이듬해 5월 종합소득세를 신고해 최종 세액을 정산합니다. 오히려 미리 떼인 금액이 줄어든 만큼 5월에 추가로 낼 가능성이 커질 수 있으니, 세금을 따로 준비해두는 습관이 필요합니다.',
  },
  {
    question: '언제부터 적용되나요?',
    answer:
      '아직 확정되지 않았습니다. 2026년 8월 3일 발표된 세제개편안(정부안)에 담긴 내용으로, 국회 통과 후 시행령에서 적용 시기가 정해집니다. 시행 전까지는 현행 3.3%가 유지됩니다. 확정 시기는 기획재정부·국세청 발표로 확인하세요.',
  },
];

export default function FreelancerWithholding2026ReformPage() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '프리랜서 원천징수 3.3% 2.2% 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '프리랜서 원천징수 3.3% 2.2% 인하 2026 개편안, 진짜 세금 줄까',
    description:
      '인적용역 사업소득 원천징수 3%에서 2% 인하 정부안의 의미와 오해, 현금흐름 변화, 5월 종합소득세 정산 관계를 계산 사례로 정리.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['프리랜서 원천징수', '3.3% 2.2%', '인적용역 사업소득', '배달라이더 세금', '2026 세제개편안'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '프리랜서 원천징수 3.3% 2.2% 2026',
    description:
      '인적용역 원천징수 3%에서 2% 인하 정부안의 의미·현금흐름·5월 정산 관계 정리(소득세법 §129).',
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
                    { name: '프리랜서 원천징수 3.3% 2.2% 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">프리랜서·인적용역 · 8분 읽기 · 2026-08-24</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  프리랜서 원천징수 3.3% 2.2% 인하 2026
                  <br />
                  <span className="text-2xl text-text-secondary">· 진짜 세금이 줄어드는 걸까</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  프리랜서와 배달라이더처럼 대금에서 3.3%를 떼고 받는 인적용역 사업소득자를 위한 글입니다. 2026년 세제개편안은 이 원천징수 세율을 3%에서 2%로 낮추는 안을 담았습니다. 이 글은 3.3%가 2.2%로 바뀌면 매달 얼마나 더 받는지, 그리고 가장 오해가 많은 &lsquo;그래서 세금이 진짜 줄어드는가&rsquo;라는 질문에 계산 사례로 답합니다.
                </p>
              </header>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">3.3%가 2.2%로 줄어든다고요?</h2>
                <p>
                  2026년 세제개편안(정부안)에 담긴 내용입니다. 인적용역 사업소득의 원천징수 세율을 3%에서 2%로 낮추면, 지방소득세를 포함한 실제 공제율이 3.3%에서 2.2%로 줄어듭니다(소득세법 §129). 배달라이더 등 영세 인적용역 종사자의 세부담을 덜기 위한 취지입니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">30초 요약</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    · 대상: 프리랜서·배달라이더 등 인적용역 사업소득자
                    <br />
                    · 원천징수: 소득세 3%에서 2%로(지방세 포함 3.3%에서 2.2%)
                    <br />
                    · 효과: 매달 손에 쥐는 돈 증가(현금흐름 개선)
                    <br />
                    · 주의: 최종 세금은 5월 종합소득세 정산으로 별도 계산
                    <br />
                    · 상태: 국회 통과 전 정부안(시행 시기 미확정)
                  </p>
                </div>
                <p>
                  다만 이는 아직 정부안입니다. 시행 전까지는 현행 3.3%가 그대로 적용됩니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">누구에게 적용되나요?</h2>
                <p>
                  고용관계 없이 독립적으로 용역을 제공하는 인적용역 사업소득자가 대상입니다. 매달 대금에서 3.3%를 떼고 받는 사람들이라고 보면 됩니다.
                </p>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li>배달라이더, 대리운전기사 등 플랫폼 종사자</li>
                  <li>학원강사, 과외교사(사업소득 형태)</li>
                  <li>보험설계사, 방문판매원</li>
                  <li>프리랜서 디자이너, 작가, 개발자(용역 계약)</li>
                </ul>
                <p>
                  다만 근로계약을 맺은 직장인은 근로소득으로 원천징수되므로 이 개편과 무관합니다. 같은 일을 해도 계약 형태가 근로계약인지 용역계약인지에 따라 적용이 달라집니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">세금이 진짜 줄어드는 건가요?</h2>
                <p>
                  최종 세금이 줄어드는 것은 아닙니다. 이 부분이 가장 오해가 많습니다. 원천징수는 세금을 미리 떼어두는 예납일 뿐이고, 진짜 세금은 이듬해 5월 종합소득세 신고로 확정됩니다(소득세법 §129).
                </p>
                <p>
                  원천징수율이 낮아지면 매달 떼이는 금액이 줄어 그해 현금흐름은 좋아집니다. 그러나 미리 낸 세금이 적어진 만큼, 5월 정산 때 돌려받을 환급액이 줄거나 오히려 더 내야 할 수 있습니다.
                </p>
                <p>
                  다만 소득이 적어 실제 부담할 세금이 원천징수액보다 작았던 사람은 그동안 환급을 많이 받아왔을 텐데, 그 환급액이 줄어드는 형태로 체감됩니다. 즉 &lsquo;세금 감면&rsquo;이 아니라 &lsquo;미리 떼는 돈의 조정&rsquo;으로 이해해야 정확합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">매달 얼마나 더 받나요? (계산 사례)</h2>
                <p>
                  원천징수액은 지급액에 세율을 곱해 계산합니다. 3.3%와 2.2%의 차이를 금액으로 보면 다음과 같습니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 원천징수 3.3% vs 2.2% 월 공제액 비교(정부안 기준, 소득세법 §129)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">월 지급액</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">현행 3.3%</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">개편 2.2%</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">월 차이</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">100만원</td>
                        <td className="p-3">3만3천원</td>
                        <td className="p-3">2만2천원</td>
                        <td className="p-3"><strong>1만1천원</strong></td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">300만원</td>
                        <td className="p-3">9만9천원</td>
                        <td className="p-3">6만6천원</td>
                        <td className="p-3"><strong>3만3천원</strong></td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">500만원</td>
                        <td className="p-3">16만5천원</td>
                        <td className="p-3">11만원</td>
                        <td className="p-3"><strong>5만5천원</strong></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례. 연 3,600만원(월 300만원) 배달라이더</p>
                  <p className="text-sm text-text-secondary">
                    · 현행 원천징수: 3,600만 × 3.3% = 118만8천원(연간 미리 떼임)
                    <br />
                    · 개편 원천징수: 3,600만 × 2.2% = 79만2천원
                    <br />
                    · 연간 현금흐름 차이: <strong>39만6천원</strong>을 그해에 더 손에 쥠
                    <br />
                    <span className="text-xs text-text-tertiary">다만 최종 세액은 경비율·소득공제를 반영한 5월 종합소득세 신고로 정산합니다.</span>
                  </p>
                </div>
              </section>

              <section className="space-y-6 border-t border-border-base pt-8">
                <h2 className="text-2xl font-bold">5월 종합소득세 신고는 어떻게 되나요?</h2>
                <p>
                  원천징수율이 낮아져도 인적용역 사업소득자는 이듬해 5월 종합소득세를 신고해 최종 세액을 정산합니다. 신고 때는 필요경비(단순경비율 또는 실제 경비)를 빼고 각종 공제를 반영해 진짜 세금을 계산합니다.
                </p>
                <p>
                  다만 미리 떼인 원천징수액이 줄어든 만큼, 정산 결과 추가로 낼 세금이 늘어날 수 있습니다. 원천징수가 적어졌다고 그 돈을 다 쓰기보다, 5월 납부에 대비해 일부를 남겨두는 것이 안전합니다.
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
                    <p className="mt-1 text-sm text-text-secondary">경비율을 반영한 5월 신고 세액을 계산해보세요.</p>
                  </Link>
                  <Link
                    href="/guide/freelancer-take-home-3-3-percent-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">프리랜서 3.3% 실수령 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">현행 3.3% 원천징수 구조를 자세히 보세요.</p>
                  </Link>
                  <Link
                    href="/guide/freelancer-simplified-vs-standard-expense-rate-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">단순경비율 vs 기준경비율</div>
                    <p className="mt-1 text-sm text-text-secondary">5월 신고에서 경비를 어떻게 빼는지 확인하세요.</p>
                  </Link>
                  <Link
                    href="/guide/may-comprehensive-income-tax/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">5월 종합소득세 신고</div>
                    <p className="mt-1 text-sm text-text-secondary">원천징수와 최종 정산의 관계를 정리했습니다.</p>
                  </Link>
                  <Link
                    href="/guide/other-income-necessary-expense-60-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">기타소득 필요경비 60%</div>
                    <p className="mt-1 text-sm text-text-secondary">일시적 용역은 사업소득과 어떻게 다른지 보세요.</p>
                  </Link>
                  <Link
                    href="/category/tax/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">모든 세금 가이드</div>
                    <p className="mt-1 text-sm text-text-secondary">종합소득세·원천징수·경비 모음.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 교육 목적으로 작성되었으며 개인 맞춤형 세무 조언이 아닙니다. 원천징수는 예납이며 최종 세액은 종합소득세 신고로 확정되므로, 실제 부담 세액은 소득·경비·공제에 따라 달라집니다. 근거 법조항은 <strong>소득세법 §129(원천징수세율)</strong>이며, 지방소득세는 소득세의 10%가 특별징수됩니다. 원천징수 세율 3%에서 2% 인하는 2026년 8월 3일 발표된 세제개편안(정부안) 기준으로, 국회 통과 전이며 시행 시기가 확정되지 않았습니다. 본 콘텐츠는 2026-08-24를 기준으로 작성됐으며, 세법 개정 시 업데이트됩니다. AI 보조 작성 후 운영자 검수 완료.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터</a>,{' '}
                  <a href="https://www.nts.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">국세청</a>,{' '}
                  <a href="https://www.moef.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">기획재정부</a>.
                </p>
              </section>

              <ShareButtons
                title="프리랜서 원천징수 3.3% 2.2% 인하 2026 가이드"
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
