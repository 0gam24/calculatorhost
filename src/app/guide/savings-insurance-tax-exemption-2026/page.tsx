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

const URL = 'https://calculatorhost.com/guide/savings-insurance-tax-exemption-2026/';
const DATE_PUBLISHED = '2026-08-18';
const DATE_MODIFIED = '2026-08-18';
// [revenue-lever: indexing+traffic]

export const metadata: Metadata = {
  title: '저축성보험 비과세 2026, 10년 유지 월 150만 일시납 1억',
  description:
    '저축성보험 보험차익은 요건을 갖추면 비과세됩니다(소득세법 §16, 시행령 §25). 일시납은 1억원 이하 10년 유지, 월적립식은 월 150만원 이하 5년 이상 납입에 10년 유지가 조건입니다. 요건 미달 시 15.4% 과세까지 사례로 정리했습니다.',
  keywords: [
    '저축성보험 비과세',
    '보험 비과세 요건',
    '일시납 1억 비과세',
    '월납 150만원 비과세',
    '보험차익 과세',
    '10년 유지 비과세',
    '소득세법 시행령 25조',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '저축성보험 비과세 2026, 10년 유지 월 150만 일시납 1억' }],
    title: '저축성보험 비과세 2026, 10년만 채우면 될까',
    description: '10년 유지에 더해 일시납 1억·월납 150만원 한도까지 채워야 보험차익이 비과세. 요건과 과세 사례 정리.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '저축성보험 비과세 2026',
    description: '일시납 1억·월납 150만원 한도, 10년 유지 요건. 미달 시 보험차익 15.4% 과세. 소득세법 §16.',
  },
};

const FAQ_ITEMS = [
  {
    question: '저축성보험은 10년만 지나면 무조건 비과세인가요?',
    answer:
      '아닙니다. 10년 유지는 필요조건일 뿐이고 납입 한도 요건도 함께 충족해야 합니다. 일시납은 1억원 이하, 월적립식은 월 150만원 이하라는 한도를 넘으면 10년을 채워도 비과세가 되지 않습니다. 흔히 오해하는 부분입니다.',
  },
  {
    question: '일시납 저축성보험 비과세 요건은 무엇인가요?',
    answer:
      '계약을 10년 이상 유지하고, 납입한 보험료 합계가 1억원 이하여야 보험차익이 비과세됩니다(소득세법 시행령 §25). 과거 2억원이던 한도가 1억원으로 축소되었으므로 총 납입액 관리가 중요합니다.',
  },
  {
    question: '월적립식(적립식) 저축성보험 비과세 요건은요?',
    answer:
      '10년 이상 유지하고, 최초 납입일부터 5년 이상 매월 균등하게 납입하며, 월 보험료가 150만원 이하여야 비과세됩니다. 일시납보다 요건이 하나 더 많은 셈으로, 5년 이상 납입 조건이 핵심 차이입니다.',
  },
  {
    question: '10년을 채우기 전에 해지하면 세금을 얼마나 내나요?',
    answer:
      '비과세 요건인 10년을 채우지 못하고 해지하면 보험차익(해지환급금에서 납입보험료를 뺀 금액)이 이자소득으로 과세됩니다. 원천징수 세율은 15.4%(이자소득세 14% + 지방소득세 1.4%)이며, 금융소득이 연 2천만원을 넘으면 종합과세될 수 있습니다.',
  },
  {
    question: '납입 한도를 넘으면 어떻게 되나요?',
    answer:
      '일시납 1억원 또는 월납 150만원 한도를 초과하면 해당 계약은 비과세 요건을 충족하지 못해 보험차익이 과세 대상이 될 수 있습니다. 한도는 사람 단위로 합산 관리되므로 여러 계약의 총액을 함께 살펴야 합니다. 정확한 적용은 시행령 §25를 확인하세요.',
  },
  {
    question: '보험차익은 어떻게 계산하나요?',
    answer:
      '보험차익은 만기보험금 또는 해지환급금에서 납입한 보험료 총액을 뺀 금액입니다. 예로 8천만원을 납입해 1억원을 받으면 차익은 2천만원입니다. 비과세 요건을 갖추면 이 차익 전체에 세금이 붙지 않고, 미충족이면 이 차익이 과세 기준이 됩니다.',
  },
  {
    question: '종신형 연금보험도 한도가 있나요?',
    answer:
      '종신형 연금보험은 별도의 비과세 요건이 적용됩니다. 55세 이후 연금으로 수령을 개시하고 사망 시까지 연금으로 지급받는 등 요건을 갖추면 납입 한도와 별개로 비과세될 수 있습니다. 상품 구조에 따라 요건이 다르므로 가입 전 확인이 필요합니다.',
  },
  {
    question: '저축성보험과 예금 중 무엇이 유리한가요?',
    answer:
      '단기 자금이면 중도해지 시 손해가 적고 세후 이자를 바로 받는 예금이 편할 수 있습니다. 10년 이상 장기로 묻어둘 자금이고 요건을 지킬 수 있다면, 예금은 이자에 15.4%가 붙는 반면 저축성보험은 비과세라 세금 면에서 유리해집니다. 다만 사업비·해지 위험을 함께 고려해야 합니다.',
  },
];

export default function SavingsInsuranceTaxExemption2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '저축성보험 비과세 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '저축성보험 비과세 2026, 10년 유지 월 150만 일시납 1억',
    description:
      '저축성보험 보험차익 비과세 요건(소득세법 §16, 시행령 §25). 일시납 1억 10년, 월적립식 150만원 5년납 10년 유지. 요건 미달 시 15.4% 과세를 사례로 정리.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['저축성보험 비과세', '보험차익', '일시납 1억', '월납 150만원', '10년 유지'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '저축성보험 비과세 2026',
    description: '저축성보험 비과세 요건과 한도, 요건 미달 시 과세 구조 정리.',
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
                    { name: '저축성보험 비과세 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">장기저축·은퇴 준비층 · 8분 읽기 · 2026-08-18</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  저축성보험 비과세 2026
                  <br />
                  <span className="text-2xl text-text-secondary">· 10년 유지 월 150만 일시납 1억</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  이 글은 저축성보험으로 장기 목돈을 준비하려는 저축·은퇴 준비층을 위해 비과세 요건을 정리한 가이드입니다. 흔히 아는 &lsquo;10년만 지나면 비과세&rsquo;가 왜 반쪽 정보인지, 일시납과 월적립식 요건이 어떻게 다른지, 요건을 못 채우면 세금이 얼마나 붙는지까지 확인하실 수 있습니다.
                </p>
              </header>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">저축성보험은 10년만 지나면 비과세인가요?</h2>
                <p>
                  아닙니다. 10년 유지는 필요조건일 뿐, 납입 한도 요건을 함께 충족해야 보험차익이 비과세됩니다(소득세법 §16, 시행령 §25). 한도를 넘으면 10년을 채워도 비과세가 되지 않습니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">비과세의 두 축</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    · 기간 요건: 계약을 10년 이상 유지
                    <br />
                    · 한도 요건: 일시납은 1억원 이하, 월적립식은 월 150만원 이하
                    <br />
                    · 둘 다 충족해야 보험차익 비과세. 하나라도 어기면 과세.
                    <br />
                    · 근거: 소득세법 §16(이자소득), 시행령 §25(저축성보험차익 비과세)
                  </p>
                </div>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">일시납과 월적립식 비과세 요건은 어떻게 다른가요?</h2>
                <p>
                  두 방식은 한도 기준과 추가 조건이 다릅니다. 월적립식에는 &lsquo;5년 이상 납입&rsquo;이라는 조건이 하나 더 붙는 것이 핵심 차이입니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 저축성보험 비과세 요건 비교 (소득세법 시행령 §25)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">구분</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">일시납</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">월적립식</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">유지 기간</td>
                        <td className="p-3">10년 이상</td>
                        <td className="p-3">10년 이상</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">납입 한도</td>
                        <td className="p-3">보험료 합계 1억원 이하</td>
                        <td className="p-3">월 보험료 150만원 이하</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">추가 조건</td>
                        <td className="p-3">없음</td>
                        <td className="p-3">5년 이상 매월 균등 납입</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  다만 종신형 연금보험은 위 한도와 별개로, 55세 이후 연금 개시 등 별도 요건을 갖추면 비과세될 수 있습니다. 상품 구조에 따라 요건이 다르므로 가입 전 약관과 세제 안내를 확인하세요.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">보험차익과 세금은 어떻게 계산하나요?</h2>
                <p>
                  보험차익은 받은 돈(만기·해지환급금)에서 낸 돈(납입보험료)을 뺀 금액입니다. 비과세 요건을 갖추면 이 차익에 세금이 붙지 않고, 미충족이면 15.4%가 과세됩니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 1. 일시납 8천만원, 10년 유지 (비과세)</p>
                  <p className="text-sm text-text-secondary">
                    · 납입 8,000만원, 10년 후 수령 1억원 → 차익 2,000만원
                    <br />
                    · 1억원 이하 + 10년 유지 요건 충족 → <strong>보험차익 2,000만원 비과세</strong>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 2. 월 100만원 10년 납입, 15년 유지 (비과세)</p>
                  <p className="text-sm text-text-secondary">
                    · 월 100만원(150만원 이하) + 5년 이상 납입 + 10년 이상 유지 → 요건 충족
                    <br />
                    · <strong>보험차익 비과세</strong>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 3. 8년 만에 해지 (과세)</p>
                  <p className="text-sm text-text-secondary">
                    · 10년 유지 요건 미충족 → 보험차익이 이자소득으로 과세
                    <br />
                    · 차익 1,000만원이라면: 1,000만원 × 15.4% = <strong>154만원 원천징수</strong>
                    <br />
                    <span className="text-xs text-text-tertiary">금융소득이 연 2천만원을 넘으면 종합과세로 세부담이 더 커질 수 있습니다.</span>
                  </p>
                </div>
                <p className="mt-4">
                  예외: 월 150만원을 넘겨 납입하거나 일시납 1억원을 초과하면, 유지 기간을 채워도 비과세 요건 미충족으로 과세될 수 있습니다. 한도 관리가 비과세의 관건입니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">저축성보험과 예금 중 무엇이 유리한가요?</h2>
                <p>
                  자금 성격에 따라 갈립니다. 아래 표로 세금과 유동성 측면을 비교했습니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 2. 저축성보험(비과세 요건 충족)과 예금 비교</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">구분</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">저축성보험</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">예금</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">이자·차익 과세</td>
                        <td className="p-3">요건 충족 시 비과세</td>
                        <td className="p-3">15.4% 과세</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">권장 기간</td>
                        <td className="p-3">10년 이상 장기</td>
                        <td className="p-3">단기~중기</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">중도해지</td>
                        <td className="p-3">원금 손실·비과세 상실 위험</td>
                        <td className="p-3">이자만 감소</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">비용 구조</td>
                        <td className="p-3">사업비 차감</td>
                        <td className="p-3">사업비 없음</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  다만 저축성보험은 초기 사업비가 차감되고 중도해지 시 손실과 비과세 상실 위험이 있습니다. 10년 이상 유지할 확신이 있는 자금에 한해 세제 혜택을 고려하는 것이 합리적입니다. 본 가이드는 특정 상품 가입을 권유하지 않습니다.
                </p>
              </section>

              <section className="space-y-6 border-t border-border-base pt-8">
                <h2 className="text-2xl font-bold">가입 전 확인할 체크포인트</h2>
                <p>
                  비과세만 보고 가입했다가 요건을 놓치면 세금과 손실을 함께 볼 수 있습니다. 아래를 미리 점검하세요.
                </p>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li>
                    <strong>한도 합산:</strong> 여러 저축성보험을 들었다면 일시납 1억원, 월납 150만원 한도가 사람 단위로 합산됩니다. 총액을 확인하세요.
                  </li>
                  <li>
                    <strong>유지 가능성:</strong> 10년 유지가 현실적인지, 중간에 목돈이 필요할 가능성은 없는지 따져보세요.
                  </li>
                  <li>
                    <strong>월적립식 5년 조건:</strong> 월적립식은 5년 이상 납입 조건이 있으므로 납입 중단 계획이 있으면 요건이 깨질 수 있습니다.
                  </li>
                  <li>
                    <strong>세법 개정:</strong> 비과세 한도는 과거에도 축소된 이력이 있으므로 가입 시점의 시행령을 확인하세요.
                  </li>
                </ul>
              </section>

              <h2 className="text-2xl font-bold mb-6">자주 묻는 질문</h2>
              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h3 className="text-lg font-semibold text-text-primary">관련 계산기 및 가이드</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link href="/guide/interest-income-tax-15-4-percent-2026/" className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition">
                    <div className="font-semibold text-primary-500">이자소득세 15.4% 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">예금·적금 이자에 붙는 15.4%의 구성과 원천징수.</p>
                  </Link>
                  <Link href="/guide/financial-income-comprehensive-vs-separate-taxation/" className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition">
                    <div className="font-semibold text-primary-500">금융소득 종합과세 기준</div>
                    <p className="mt-1 text-sm text-text-secondary">이자·배당 2,000만원 초과 시 종합과세 구조.</p>
                  </Link>
                  <Link href="/guide/deposit-vs-savings-vs-parking-account-2026/" className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition">
                    <div className="font-semibold text-primary-500">예금 vs 적금 vs 파킹통장</div>
                    <p className="mt-1 text-sm text-text-secondary">목적별로 어떤 저축이 맞는지 비교.</p>
                  </Link>
                  <Link href="/guide/private-pension-1500-million-separate-taxation-2026/" className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition">
                    <div className="font-semibold text-primary-500">사적연금 1,500만원 분리과세</div>
                    <p className="mt-1 text-sm text-text-secondary">연금 수령 시 분리과세와 종합과세 갈림길.</p>
                  </Link>
                  <Link href="/guide/isa-account-tax-benefit-2026/" className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition">
                    <div className="font-semibold text-primary-500">ISA 계좌 세제 혜택</div>
                    <p className="mt-1 text-sm text-text-secondary">비과세·분리과세로 굴리는 만능통장 활용법.</p>
                  </Link>
                  <Link href="/category/finance/" className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition">
                    <div className="font-semibold text-primary-500">모든 금융 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">예금·적금·대출 이자 계산기 모음.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 교육 목적으로 작성되었으며 개인 맞춤형 세무·재무 조언이 아닙니다. 저축성보험 비과세 한도와 요건은 세법 개정으로 바뀔 수 있고 상품별 약관에 따라 적용이 달라지므로, 가입 전 소관 부처 고시와 시행령, 보험사 세제 안내를 확인하세요. 본 콘텐츠는 2026-08-18 기준으로 작성되었으며, 인용 법조항은 <strong>소득세법 §16(이자소득), 시행령 §25(저축성보험차익 비과세)</strong>입니다. AI 보조 작성 후 운영자 검수 완료.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터</a>,{' '}
                  <a href="https://www.nts.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">국세청</a>.
                </p>
              </section>

              <ShareButtons
                title="저축성보험 비과세 2026 가이드"
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
