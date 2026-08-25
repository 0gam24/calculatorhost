// [revenue-lever: indexing+traffic] 청년도약계좌 만기·중도해지·청년미래적금 전환(청년 저축 롱테일 흡수)
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

const URL = 'https://calculatorhost.com/guide/youth-leap-account-maturity-2026/';
const DATE_PUBLISHED = '2026-08-26';
const DATE_MODIFIED = '2026-08-26';

export const metadata: Metadata = {
  title: '청년도약계좌 2026, 만기·중도해지·정부기여금 완전 정리',
  description:
    '청년도약계좌 신규 가입은 2025년 말 종료됐지만 기존 가입자의 비과세와 정부기여금은 만기까지 유지됩니다. 중도해지 3년 기준, 특별중도해지 사유, 청년미래적금 전환까지 조세특례제한법 §91의22 기준으로 정리했습니다.',
  keywords: [
    '청년도약계좌 2026',
    '청년도약계좌 중도해지',
    '청년도약계좌 만기',
    '정부기여금',
    '청년미래적금',
    '청년도약계좌 비과세',
    '조세특례제한법 91조의22',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '청년도약계좌 2026, 만기·중도해지·정부기여금 완전 정리' }],
    title: '청년도약계좌 2026, 만기까지 유지 vs 중도해지 무엇이 유리한가',
    description: '신규 가입 종료 후 기존 가입자가 알아야 할 만기 수령, 중도해지 3년 기준, 특별해지 사유, 청년미래적금 전환.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '청년도약계좌 2026, 만기·중도해지·정부기여금 정리',
    description: '기존 가입자의 비과세·정부기여금은 만기까지 유지. 중도해지 3년 기준과 특별해지 사유. 조특법 §91의22.',
  },
};

const FAQ_ITEMS = [
  {
    question: '청년도약계좌 2026년에도 새로 가입할 수 있나요?',
    answer:
      '아니요, 신규 가입은 2025년 12월 31일로 종료됐습니다. 청년도약계좌의 이자소득 비과세 근거인 조세특례제한법 §91의22가 2025년 말 일몰됐기 때문입니다. 2026년부터는 후속 상품인 청년미래적금이 가입 창구 역할을 하며, 기존 청년도약계좌 가입자는 그대로 만기까지 유지할 수 있습니다.',
  },
  {
    question: '이미 가입했는데 만기까지 유지하면 어떤 혜택이 있나요?',
    answer:
      '가입 시점의 조건대로 5년 만기까지 정부기여금과 이자소득 비과세가 모두 유지됩니다(조세특례제한법 §91의22). 일몰은 신규 가입을 막을 뿐이고, 이미 열어 둔 계좌의 세제 혜택을 소급해서 없애지 않습니다. 즉 기존 가입자는 만기까지 원래 약속된 혜택을 다 받습니다.',
  },
  {
    question: '중도해지하면 정부기여금은 어떻게 되나요?',
    answer:
      '유지 기간에 따라 다릅니다. 3년 이상 유지한 뒤 해지하면 비과세 혜택이 유지되고 정부기여금도 일부(약 60% 수준) 지급됩니다. 반면 3년 미만에 일반 사유로 해지하면 원칙적으로 정부기여금을 받지 못하고 비과세 혜택도 사라집니다. 급전이 필요해도 3년은 넘기는 편이 유리합니다.',
  },
  {
    question: '특별중도해지 사유는 무엇인가요?',
    answer:
      '가입자 사망, 해외 이주, 퇴직, 사업장 폐업, 3개월 이상 치료가 필요한 질병·상해, 생애최초 주택 구입 등이 특별중도해지 사유입니다. 이 사유로 해지하면 3년을 못 채웠더라도 정부기여금과 비과세 혜택을 그대로 인정받습니다. 서류로 사유를 증빙해야 하므로 취급 은행에 먼저 문의하세요.',
  },
  {
    question: '비과세를 받으려면 소득요건이 있나요?',
    answer:
      '네, 가입 당시 소득요건을 충족해야 비과세가 적용됩니다. 직전 과세기간 총급여 7,500만원 이하이거나 종합소득금액 6,300만원 이하가 기준이었습니다(조세특례제한법 §91의22). 이미 가입 심사를 통과했다면 요건은 충족한 것이며, 만기까지 비과세가 이어집니다.',
  },
  {
    question: '청년미래적금으로 갈아탈 수 있나요?',
    answer:
      '전환·갈아타기 가능 여부와 조건은 정부 정책에 따라 정해집니다. 청년미래적금은 청년도약계좌의 후속 상품으로 도입됐으나, 가입 대상·정부기여금·전환 인정 여부 등 세부 조건은 금융위원회와 서민금융진흥원 공고를 기준으로 확인해야 합니다. 본 가이드의 수치가 아니라 공식 공고를 따르세요.',
  },
  {
    question: '만기 수령액은 대략 어떻게 계산되나요?',
    answer:
      '납입 원금에 정부기여금과 은행 이자를 더한 뒤, 이자소득에 세금을 떼지 않는 구조입니다. 월 납입 한도(최대 70만원)와 소득구간별 정부기여금 매칭에 따라 총액이 달라지므로, 정확한 예상 만기 수령액은 취급 은행 앱이나 서민금융진흥원 계산기로 확인하는 것이 정확합니다.',
  },
  {
    question: '중도해지 후 다시 가입할 수 있나요?',
    answer:
      '청년도약계좌 자체는 신규 가입이 종료돼 재가입이 불가능합니다. 해지하면 그 계좌의 혜택은 끝나므로, 유지가 가능한 상황이라면 함부로 해지하지 않는 것이 좋습니다. 목돈이 급하면 해지 대신 예금담보대출 같은 대안을 은행에 문의해 보세요.',
  },
];

export default function YouthLeapAccountMaturity2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '청년도약계좌 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '청년도약계좌 2026, 만기·중도해지·정부기여금 완전 정리',
    description:
      '신규 가입 종료 후 기존 청년도약계좌 가입자가 알아야 할 만기 수령, 중도해지 3년 기준, 특별해지 사유, 청년미래적금 전환을 정리한 가이드.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['청년도약계좌', '정부기여금', '중도해지', '비과세', '청년미래적금'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '청년도약계좌 2026',
    description: '청년도약계좌 만기·중도해지·정부기여금·청년미래적금 전환 정리.',
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
                    { name: '청년도약계좌 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">청년·사회초년생 · 8분 읽기 · 2026-08-26</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  청년도약계좌 2026
                  <br />
                  <span className="text-2xl text-text-secondary">· 만기·중도해지·정부기여금 완전 정리</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  청년도약계좌 신규 가입은 2025년 말로 끝났습니다. 그래서 2026년의 관심사는 새로 드는 방법이 아니라, 이미 가진 계좌를 만기까지 끌고 갈지 아니면 중도에 해지할지입니다. 이 가이드는 기존 가입자가 만기까지 유지하면 무엇을 받는지, 중도해지하면 정부기여금이 어떻게 되는지, 특별중도해지 사유와 후속 상품인 청년미래적금 전환까지 청년 눈높이로 정리합니다.
                </p>
              </header>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">2026년에도 새로 가입할 수 있나요?</h2>
                <p>
                  결론은 아니요, 신규 가입은 2025년 12월 31일로 종료됐습니다. 청년도약계좌의 이자소득 비과세 근거인 조세특례제한법 §91의22가 2025년 말 일몰됐기 때문입니다. 2026년부터는 후속 상품인 청년미래적금이 청년 자산형성 지원 창구 역할을 이어받았습니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">30초 요약</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    · 신규 가입: 2025년 12월 31일 종료(조특법 §91의22 일몰)
                    <br />
                    · 기존 가입자: 만기(5년)까지 비과세·정부기여금 그대로 유지
                    <br />
                    · 중도해지: 3년 이상이면 비과세 유지 + 기여금 일부, 3년 미만 일반해지는 혜택 상실
                    <br />
                    · 후속 상품: 청년미래적금(세부 조건은 금융위·서민금융진흥원 공고 확인)
                  </p>
                </div>
                <p>
                  다만, 일몰은 신규 가입만 막습니다. 이미 열어 둔 계좌의 혜택을 소급해서 없애지 않으므로 기존 가입자는 걱정하지 않아도 됩니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">만기까지 유지하면 무엇을 받나요?</h2>
                <p>
                  가입 시점의 조건대로 정부기여금과 이자소득 비과세를 모두 받습니다. 청년도약계좌는 5년 만기 상품으로, 매달 낸 원금에 소득구간별 정부기여금이 얹히고, 은행 이자가 붙으며, 그 이자소득에는 세금을 떼지 않습니다.
                </p>
                <p>
                  세 가지 혜택이 겹칩니다. 첫째 정부기여금(매칭 지원금), 둘째 은행 우대금리, 셋째 이자소득 비과세입니다. 특히 비과세는 일반 예적금 이자에서 15.4%를 떼는 것과 비교하면 실효 수익률을 눈에 띄게 끌어올립니다.
                </p>
                <p>
                  예외: 정부기여금 매칭 비율은 소득구간에 따라 다르고 중간에 조정된 이력도 있으므로, 내 계좌의 정확한 예상 만기 수령액은 취급 은행 앱이나 서민금융진흥원 안내로 확인하세요.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">중도해지하면 정부기여금은 어떻게 되나요?</h2>
                <p>
                  유지 기간이 3년을 넘겼는지가 갈림길입니다. 3년이라는 기준선을 두고 혜택이 크게 달라집니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 중도해지 시점별 혜택(일반 사유 기준)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">해지 시점</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">이자소득 비과세</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">정부기여금</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">3년 미만(일반 사유)</td>
                        <td className="p-3">상실</td>
                        <td className="p-3">원칙적으로 미지급</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">3년 이상</td>
                        <td className="p-3"><strong>유지</strong></td>
                        <td className="p-3"><strong>일부 지급(약 60% 수준)</strong></td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">특별중도해지 사유</td>
                        <td className="p-3"><strong>유지</strong></td>
                        <td className="p-3"><strong>인정</strong></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3">
                  <p className="font-semibold text-text-primary">사례. 2년 11개월 vs 3년 1개월 해지</p>
                  <p className="text-sm text-text-secondary">
                    · 2년 11개월에 일반 해지: 비과세 상실, 정부기여금 미지급 → 사실상 원금과 낮은 중도해지 이자만
                    <br />
                    · 3년 1개월에 해지: 비과세 유지 + 정부기여금 일부(약 60%) 지급
                    <br />
                    <span className="text-xs text-text-tertiary">한 달 차이로 혜택이 크게 갈리므로, 급하지 않다면 3년 선은 넘기는 편이 유리합니다.</span>
                  </p>
                </div>
                <p>
                  다만, 정부기여금 지급 비율의 구체적 수치는 정책에 따라 달라질 수 있으므로 해지 전 취급 은행에 최종 확인하세요.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">특별중도해지 사유는 무엇인가요?</h2>
                <p>
                  불가피한 사정으로 해지하는 경우는 3년을 못 채워도 혜택을 인정합니다. 아래 사유에 해당하면 정부기여금과 비과세가 유지됩니다.
                </p>
                <ul className="space-y-2 ml-6 list-disc text-text-secondary">
                  <li>가입자 사망 또는 해외 이주</li>
                  <li>퇴직(비자발적 포함) 또는 사업장 폐업</li>
                  <li>3개월 이상 치료가 필요한 질병·상해</li>
                  <li>생애최초 주택 구입</li>
                </ul>
                <p>
                  예외: 특별중도해지는 서류 증빙이 필요합니다. 사유별로 요구 서류가 다르므로, 해지 신청 전에 취급 은행에 필요 서류와 인정 여부를 반드시 문의하세요.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">청년미래적금으로 갈아탈 수 있나요?</h2>
                <p>
                  전환 가능 여부와 조건은 정부 공고를 따라야 합니다. 청년미래적금은 청년도약계좌 일몰 이후 청년 자산형성을 잇는 후속 상품으로 도입됐지만, 가입 대상 소득요건, 정부기여금 규모, 기존 계좌 전환 인정 여부 등은 금융위원회와 서민금융진흥원이 공고로 정합니다.
                </p>
                <p>
                  따라서 본 가이드는 후속 상품의 구체적인 금액·요건을 단정하지 않습니다. 청년미래적금 가입이나 전환을 검토한다면, 반드시 서민금융진흥원 공식 안내와 취급 은행 상품설명서를 기준으로 판단하세요.
                </p>
              </section>

              <h2 className="text-2xl font-bold mb-6">자주 묻는 질문</h2>
              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h3 className="text-lg font-semibold text-text-primary">관련 계산기 및 가이드</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link href="/calculator/savings/" className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition">
                    <div className="font-semibold text-primary-500">적금 이자 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">단리·복리 만기 수령액을 계산해 보세요.</p>
                  </Link>
                  <Link href="/guide/youth-isa-2026-reform/" className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition">
                    <div className="font-semibold text-primary-500">청년형 ISA 2026 개편</div>
                    <p className="mt-1 text-sm text-text-secondary">청년 대상 ISA의 비과세 혜택을 비교하세요.</p>
                  </Link>
                  <Link href="/guide/youth-future-savings-account-2026/" className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition">
                    <div className="font-semibold text-primary-500">청년 자산형성 저축</div>
                    <p className="mt-1 text-sm text-text-secondary">청년 대상 저축 상품의 큰 그림을 잡으세요.</p>
                  </Link>
                  <Link href="/guide/isa-account-tax-benefit-2026/" className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition">
                    <div className="font-semibold text-primary-500">ISA 계좌 세제 혜택</div>
                    <p className="mt-1 text-sm text-text-secondary">비과세·분리과세 한도를 정확히 이해하세요.</p>
                  </Link>
                  <Link href="/guide/tax-free-comprehensive-savings-2026/" className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition">
                    <div className="font-semibold text-primary-500">비과세 종합저축</div>
                    <p className="mt-1 text-sm text-text-secondary">이자소득 비과세 상품의 자격 요건을 확인하세요.</p>
                  </Link>
                  <Link href="/category/finance/" className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition">
                    <div className="font-semibold text-primary-500">모든 금융 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">예금·적금·대출 계산기 모음.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 교육 목적으로 작성되었으며 개인 맞춤형 금융·세무 조언이 아닙니다. 정부기여금 매칭 비율, 중도해지 지급률, 청년미래적금 세부 조건은 정책에 따라 달라질 수 있으므로 취급 은행과 서민금융진흥원 공식 안내로 반드시 확인하세요. 본 콘텐츠는 2026-08-26 기준이며, 인용한 법조항은 <strong>조세특례제한법 §91의22(청년도약계좌에 대한 비과세)</strong>입니다. AI 보조 작성 후 운영자 검수 완료.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터</a>,{' '}
                  <a href="https://www.moef.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">기획재정부</a>,{' '}
                  <a href="https://www.kinfa.or.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">서민금융진흥원</a>.
                </p>
              </section>

              <ShareButtons title="청년도약계좌 2026 가이드" url={URL} />
            </article>
          </main>
        </div>
        <Footer />
      </div>
    </>
  );
}
