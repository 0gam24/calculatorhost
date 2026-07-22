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

const URL = 'https://calculatorhost.com/guide/deposit-protection-limit-2026/';
const DATE_PUBLISHED = '2026-07-12';
const DATE_MODIFIED = '2026-07-12';

export const metadata: Metadata = {
  title: '예금자보호 한도 1억원 2026, 시행일·대상·분산예치',
  description:
    '예금자보호 한도가 2025년 9월 1일부터 5천만원에서 1억원으로 올랐습니다. 금융회사별·1인당 원금과 이자를 합쳐 1억원까지 보호되며 펀드 등 실적배당 상품은 제외됩니다. 대상과 분산예치 전략을 정리합니다.',
  keywords: [
    '예금자보호 한도',
    '예금보호 1억원',
    '예금자보호법',
    '분산예치',
    '저축은행 예금보호',
    '예금자보호법 32조',
    '새마을금고 신협 보호',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '예금자보호 한도 1억원 2026, 시행일·대상·분산예치' }],
    title: '예금자보호 한도 1억원 2026, 24년 만의 상향 핵심 정리',
    description: '2025년 9월 1일부터 예금보호 한도 1억원. 보호 대상과 제외 상품, 금융회사별 한도 적용, 분산예치 전략.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '예금자보호 한도 1억원 2026',
    description: '2025.9.1 시행. 금융회사별 원금+이자 1억까지 보호. 펀드·실적배당은 제외.',
  },
};

const FAQ_ITEMS = [
  {
    question: '예금자보호 한도는 언제 1억원으로 올랐나요?',
    answer:
      '2025년 9월 1일부터 예금자보호 한도가 기존 5천만원에서 1억원으로 상향됐습니다. 2001년 5천만원으로 정해진 뒤 24년 만의 인상입니다. 시행일 이후 금융회사가 파산 등으로 예금을 지급하지 못하면 1인당 1억원까지 보호받습니다(예금자보호법 §32).',
  },
  {
    question: '1억원 한도는 원금 기준인가요, 이자 포함인가요?',
    answer:
      '원금과 소정의 이자를 합쳐 1억원까지 보호됩니다. 예를 들어 원금 9,800만원에 이자 300만원이 붙어 총 1억 100만원이라면, 보호 금액은 1억원까지이고 초과분 100만원은 보호 대상에서 제외됩니다. 따라서 한도에 딱 맞추기보다 이자까지 감안해 예치하는 것이 안전합니다.',
  },
  {
    question: '어떤 상품이 예금자보호 대상인가요?',
    answer:
      '은행·저축은행의 예금, 적금, 부금, 원금보전형 신탁, 외화예금 등 원금이 보장되는 상품이 보호 대상입니다. 반면 펀드, 실적배당형 신탁, 후순위채권, 주식·채권 같은 투자상품은 원금 손실 가능성이 있어 예금자보호 대상이 아닙니다.',
  },
  {
    question: '1억원은 사람당인가요, 계좌당인가요?',
    answer:
      '금융회사별로 예금자 1인당 합산하여 1억원입니다. 같은 은행에 여러 계좌가 있어도 모두 합쳐 1억원까지만 보호됩니다. 반대로 A은행 1억원, B은행 1억원처럼 서로 다른 금융회사에 나눠 예치하면 각각 1억원씩 보호받을 수 있습니다.',
  },
  {
    question: '새마을금고·신협·농협 단위조합도 1억원 보호되나요?',
    answer:
      '네, 상호금융의 예금도 함께 1억원으로 상향됐습니다. 다만 이들은 예금보험공사가 아니라 각 중앙회가 개별법에 따라 운영하는 자체 기금으로 보호합니다. 보호 주체와 세부 기준이 은행과 다르므로 가입 전 해당 조합의 보호 방식을 확인하세요.',
  },
  {
    question: '저축은행에 맡겨도 1억원까지 안전한가요?',
    answer:
      '네, 저축은행 예금도 예금보험공사가 1억원까지 보호합니다. 다만 저축은행은 상대적으로 부실 위험이 은행보다 크므로, 여러 저축은행에 1억원씩 나눠 예치하고 각 회사의 건전성 지표(BIS비율 등)를 함께 확인하는 것이 바람직합니다.',
  },
  {
    question: '한도가 올랐으니 한 곳에 몰아도 되나요?',
    answer:
      '한도가 1억원으로 커졌지만, 예치액이 1억원을 넘는다면 여전히 금융회사별 분산이 필요합니다. 부부라면 각자 명의로 나누고, 금융회사를 달리하면 명의·회사별로 각각 1억원씩 보호받을 수 있어 총 보호 한도를 크게 늘릴 수 있습니다.',
  },
  {
    question: '퇴직연금이나 연금저축 계좌도 1억원 한도인가요?',
    answer:
      '확정기여형(DC) 퇴직연금과 개인형 IRP 등에서 운용하는 예금은 일반 예금과 별도로 1억원까지 보호되는 등 상품별로 한도가 따로 적용될 수 있습니다. 세부 적용은 예금보험공사(KDIC) 안내를 통해 본인 계좌 기준으로 확인하세요.',
  },
];

export default function DepositProtectionLimit2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '예금자보호 한도 1억원 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '예금자보호 한도 1억원 2026, 시행일·보호대상·분산예치 전략',
    description:
      '2025년 9월 1일부터 예금자보호 한도가 5천만원에서 1억원으로 상향. 보호 대상·제외 상품, 금융회사별 1인당 한도 적용, 상호금융 보호, 분산예치 전략까지 정리.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['예금자보호', '예금보호 한도', '1억원', '분산예치', '저축은행'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '예금자보호 한도 1억원 2026',
    description:
      '예금자보호 한도 1억원 상향(2025.9.1 시행)의 보호 대상·한도 적용·분산예치 전략.',
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
                    { name: '예금자보호 한도 1억원 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">예금자·투자자 · 7분 읽기 · 2026-07-12</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  예금자보호 한도 1억원 2026
                  <br />
                  <span className="text-2xl text-text-secondary">시행일·보호대상·분산예치</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  24년간 5천만원에 묶여 있던 예금자보호 한도가 2025년 9월 1일부터 1억원으로 올랐습니다. 금융회사가 파산해도 원금과 이자를 합쳐 1억원까지 돌려받을 수 있다는 뜻입니다. 다만 모든 상품이 보호되는 것은 아니고, 한도를 넘는 자금은 여전히 분산이 필요합니다. 이 가이드는 예금자보호법 §32를 기준으로 보호 대상, 한도 적용 방식, 실전 분산예치 전략을 정리합니다.
                </p>
              </header>

              <AdSlot slot="guide-deposit-protection-limit-top" format="horizontal" />

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">예금자보호 한도가 얼마로 올랐나요?</h2>
                <p>
                  2025년 9월 1일부터 예금자보호 한도가 5천만원에서 1억원으로 상향됐습니다. 2001년 5천만원으로 정해진 이후 24년 만의 인상입니다. 시행일 이후 금융회사가 파산 등으로 예금을 지급할 수 없게 되면 예금보험공사가 1인당 1억원까지 대신 지급합니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">핵심 요약</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    · 보호 한도: 5천만원 → <strong>1억원</strong> (원금 + 소정 이자 합산)
                    <br />
                    · 시행일: 2025년 9월 1일
                    <br />
                    · 적용: 금융회사별 · 예금자 1인당
                    <br />
                    · 근거: 예금자보호법 §32
                  </p>
                </div>
                <p className="mt-4">
                  다만 상향은 시행일 이후 발생하는 지급불능 사태부터 적용됩니다. 기존에 가입한 예금도 별도 재가입 없이 시행일 이후에는 1억원 한도로 보호되므로, 만기 전이라도 조치할 필요는 없습니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">무엇이 보호되고 무엇이 제외되나요?</h2>
                <p>
                  원금이 보장되는 예금성 상품은 보호되고, 운용 실적에 따라 원금이 변동하는 투자상품은 제외됩니다. 아래 표로 구분했습니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 예금자보호 대상 vs 비대상 (예금자보호법)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">보호 대상</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">보호 제외</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">예금·적금·부금</td>
                        <td className="p-3">펀드(수익증권)</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">원금보전형 신탁</td>
                        <td className="p-3">실적배당형 신탁</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">외화예금</td>
                        <td className="p-3">후순위채권</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">저축은행 예·적금</td>
                        <td className="p-3">주식·회사채·국채</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  다만 같은 은행에서 판매하더라도 펀드나 방카슈랑스 투자형 상품은 은행이 파산해도 예금자보호 대상이 아닙니다. 가입 시 상품설명서의 예금자보호 여부 표기를 반드시 확인하세요.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">1억원 한도는 어떻게 적용되나요?</h2>
                <p>
                  한도는 금융회사별로 예금자 1인당 합산 1억원입니다. 같은 회사에 여러 계좌가 있어도 모두 더해 1억원까지만 보호되고, 회사를 나누면 각각 1억원씩 보호받습니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례. 3억원을 예치할 때</p>
                  <p className="text-sm text-text-secondary">
                    · A은행에 3억원 몰아서 예치 → 보호 <strong>1억원</strong>, 나머지 2억원은 비보호
                    <br />
                    · A·B·C은행에 각 1억원씩 분산 → 회사별로 <strong>각 1억원 보호</strong>, 총 3억원 보호
                    <br />
                    · 부부가 A은행에 각자 명의로 1억원씩 → 명의별 각 1억원 보호
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 예치액이 1억원을 넘으면 회사·명의를 나누는 것이 핵심입니다.</span>
                  </p>
                </div>
                <p className="mt-4">
                  다만 원금과 이자를 합쳐 1억원이므로, 만기 이자까지 감안하면 원금은 1억원보다 조금 낮게 예치하는 것이 안전합니다. 예금 금리가 높을수록 이자 몫을 더 넉넉히 빼두세요.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">상호금융도 1억원으로 보호되나요?</h2>
                <p>
                  네, 새마을금고, 신협, 농·수협 단위조합의 예금도 함께 1억원으로 상향됐습니다. 다만 이들은 예금보험공사가 아니라 각 중앙회가 개별법에 따라 운영하는 자체 기금으로 보호합니다.
                </p>
                <p className="mt-4">
                  즉 보호받는 금액(1억원)은 같지만, 보호 주체와 세부 절차가 은행·저축은행과 다릅니다. 상호금융에 거액을 예치할 때는 해당 조합의 재무 건전성과 중앙회 보호 방식을 함께 살펴보는 것이 좋습니다.
                </p>
              </section>

              <AdSlot slot="guide-deposit-protection-limit-mid" format="rectangle" />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h2 className="text-2xl font-bold">실전 분산예치 전략</h2>
                <p>
                  한도가 커졌어도 예치 규모가 크면 분산이 여전히 유효합니다. 안전과 금리를 함께 챙기는 순서를 정리했습니다.
                </p>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li>
                    <strong>회사별 1억원 이내:</strong> 원금+이자 기준 한 회사에 1억원을 넘기지 않도록 배분합니다.
                  </li>
                  <li>
                    <strong>명의 분산:</strong> 부부·가족 명의를 활용하면 보호 한도를 명의 수만큼 늘릴 수 있습니다.
                  </li>
                  <li>
                    <strong>건전성 확인:</strong> 고금리 저축은행일수록 BIS비율·연체율 등 건전성 지표를 함께 봅니다.
                  </li>
                  <li>
                    <strong>이자 여유:</strong> 만기 이자까지 1억원을 넘지 않도록 원금을 9천만원대로 설정하는 방식도 좋습니다.
                  </li>
                </ul>
                <p className="mt-4">
                  분산은 금리를 조금 포기하더라도 원금 전액을 지키는 안전장치입니다. 특히 예치 규모가 수억원대라면 회사·명의 분산으로 전액 보호를 우선하는 편이 합리적입니다.
                </p>
              </section>

              <h2 className="text-2xl font-bold mb-6">자주 묻는 질문</h2>
              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h3 className="text-lg font-semibold text-text-primary">관련 계산기 및 가이드</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link
                    href="/calculator/deposit/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">정기예금 이자 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">예치금·금리로 세후 이자를 계산해보세요.</p>
                  </Link>
                  <Link
                    href="/calculator/savings/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">적금 이자 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">단리·복리 적금 만기 수령액을 비교하세요.</p>
                  </Link>
                  <Link
                    href="/guide/deposit-vs-savings-vs-parking-account-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">예금·적금·파킹통장 비교</div>
                    <p className="mt-1 text-sm text-text-secondary">목적별로 맞는 예치 방식을 골라보세요.</p>
                  </Link>
                  <Link
                    href="/guide/interest-income-tax-15-4-percent-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">이자소득세 15.4%</div>
                    <p className="mt-1 text-sm text-text-secondary">예금 이자에 붙는 세금 구조를 이해하세요.</p>
                  </Link>
                  <Link
                    href="/guide/financial-income-comprehensive-vs-separate-taxation/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">금융소득 종합과세 2천만원</div>
                    <p className="mt-1 text-sm text-text-secondary">이자·배당 합산 종합과세 기준을 확인하세요.</p>
                  </Link>
                  <Link
                    href="/category/finance/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">모든 금융 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">대출·예금·적금·환율 모음.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 교육 목적으로 작성되었으며 특정 상품 가입을 권하는 글이 아니고 개별 금융 자문도 아닙니다. 예금자보호 세부 적용 범위와 상품별 한도는 상황에 따라 다르므로, 실제 예치 전 예금보험공사(KDIC) 및 해당 금융회사 안내를 확인하시기 바랍니다. 본 콘텐츠는 2026-07-12 기준으로 작성되었고 제도 변경 시 업데이트됩니다. 인용 법조항: <strong>예금자보호법 §32(보험금의 지급한도 등)</strong> 및 관련 시행령, 상호금융 각 개별법. AI 보조 작성 후 운영자 검수 완료.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터</a>,{' '}
                  <a href="https://www.kdic.or.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">예금보험공사</a>,{' '}
                  <a href="https://www.fsc.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">금융위원회</a>.
                </p>
              </section>

              <ShareButtons
                title="예금자보호 한도 1억원 2026 가이드"
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
