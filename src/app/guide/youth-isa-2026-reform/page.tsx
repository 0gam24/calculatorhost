// [revenue-lever: indexing+traffic] 청년형 ISA 신설 개편안 (청년 투자자 절세 롱테일)
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

const URL = 'https://calculatorhost.com/guide/youth-isa-2026-reform/';
const DATE_PUBLISHED = '2026-08-24';
const DATE_MODIFIED = '2026-08-24';

export const metadata: Metadata = {
  title: '청년형 ISA 2026 신설안, 납입 10% 소득공제 조건 정리',
  description:
    '2026 세제개편안이 34세 이하 청년 전용 ISA를 신설합니다. 납입액 10% 소득공제(최대 200만원), 이자·배당 전액 비과세, 연 2천만원 한도. 가입 조건과 일반 ISA 비교를 정리합니다(조세특례제한법 §91의18).',
  keywords: [
    '청년형 ISA',
    '청년 ISA 소득공제',
    '청년 ISA 가입조건',
    'ISA 이자 배당 비과세',
    '생산적금융 ISA',
    '조세특례제한법 91조의18',
    '2026 세제개편안 청년',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '청년형 ISA 2026 신설안, 납입 10% 소득공제 조건 정리' }],
    title: '청년형 ISA 2026 신설안, 납입 10% 소득공제 조건 총정리',
    description: '34세 이하 청년 전용 ISA 신설(정부안). 납입 10% 소득공제(최대 200만원), 이자·배당 전액 비과세, 연 2천만원 한도. 가입 조건과 일반 ISA 비교.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '청년형 ISA 2026 신설안, 납입 10% 소득공제 조건 정리',
    description: '34세 이하 청년 ISA 신설(정부안). 납입 10% 소득공제 최대 200만원 + 이자·배당 전액 비과세. 조특법 §91의18.',
  },
};

const FAQ_ITEMS = [
  {
    question: '청년형 ISA가 무엇인가요?',
    answer:
      '청년형 ISA는 34세 이하 청년의 자산형성을 돕기 위해 2026년 세제개편안(정부안)에 담긴 개인종합자산관리계좌입니다(조세특례제한법 §91의18 개정안). 계좌에서 발생한 이자·배당소득을 전액 비과세하고, 납입액의 10%를 소득공제하는 것이 핵심입니다. 아직 신설 정부안 단계로, 국회 통과 후 시행됩니다.',
  },
  {
    question: '누가 가입할 수 있나요?',
    answer:
      '만 34세 이하이면서 총급여 7,500만원 이하(또는 종합소득금액 6,300만원 이하)인 거주자가 대상으로 논의되고 있습니다. 다만 직전 3개 과세기간 중 한 번이라도 금융소득종합과세 대상이었던 사람은 가입이 제한됩니다. 가입 요건은 정부안 기준이며, 확정 시 세부 조건이 달라질 수 있습니다.',
  },
  {
    question: '세금 혜택은 얼마나 되나요?',
    answer:
      '두 가지입니다. 첫째, 계좌에서 나오는 이자·배당소득이 전액 비과세됩니다. 둘째, 납입액의 10%를 소득공제해, 연 납입한도 2천만원을 다 채우면 최대 200만원을 소득에서 공제받습니다. 일반 ISA가 이자·배당을 한도까지만 비과세하는 것과 비교해 혜택이 큽니다.',
  },
  {
    question: '납입 한도와 의무 가입 기간은요?',
    answer:
      '납입 한도는 연 2천만원, 총 2억원으로 논의되고 있습니다. 의무 가입 기간은 3년이며, 3년 단위로 연장해 최장 10년까지 운용할 수 있습니다. 의무 기간 내 중도 해지하면 그동안 받은 세제 혜택이 추징될 수 있으므로 장기 자금으로 넣는 것이 유리합니다.',
  },
  {
    question: '무엇에 투자할 수 있나요?',
    answer:
      '국내 주식, 국내 주식형 펀드, 국민성장펀드, 기업성장집합투자기구(BDC) 등 국내 투자 상품이 대상으로 논의되고 있습니다. 국내 투자를 유도하려는 취지의 제도라 투자 대상이 국내 상품 중심입니다. 확정 투자 범위는 시행령으로 정해질 예정입니다.',
  },
  {
    question: '기존 일반 ISA를 갖고 있어도 가입되나요?',
    answer:
      '일반 ISA와 청년형 ISA는 유형이 달라, 요건을 갖추면 전환하거나 새로 가입하는 방식이 논의되고 있습니다. 다만 한 사람이 여러 ISA를 중복 보유할 수 없는 것이 원칙이므로, 청년형으로 갈아탈지 유지할지는 본인 소득·투자 계획에 따라 판단해야 합니다. 세부 전환 규정은 확정안을 확인하세요.',
  },
  {
    question: '지금 바로 가입할 수 있나요?',
    answer:
      '아직 가입할 수 없습니다. 청년형 ISA는 2026년 8월 3일 발표된 세제개편안(정부안)에 담긴 신설 제도로, 국회 통과와 시행령 마련을 거쳐야 실제 계좌 개설이 가능합니다. 시행 시기와 최종 조건은 기획재정부 발표를 확인하세요.',
  },
];

export default function YouthIsa2026ReformPage() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '청년형 ISA 2026 신설안' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '청년형 ISA 2026 신설안, 납입 10% 소득공제 조건 총정리',
    description:
      '2026 세제개편안이 신설하는 청년형 ISA의 가입 조건, 납입 10% 소득공제와 이자·배당 전액 비과세, 일반 ISA와의 비교를 계산 사례로 정리.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['청년형 ISA', '청년 ISA', '소득공제', '이자 배당 비과세', '2026 세제개편안'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '청년형 ISA 2026 신설안',
    description:
      '청년형 ISA의 가입 조건·세제 혜택·일반 ISA 비교 정리(조세특례제한법 §91의18 개정안).',
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
                    { name: '청년형 ISA 2026 신설안' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">청년 투자자 · 8분 읽기 · 2026-08-24</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  청년형 ISA 2026 신설안
                  <br />
                  <span className="text-2xl text-text-secondary">· 납입 10% 소득공제 조건 총정리</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  주식·펀드로 자산을 불리려는 34세 이하 청년을 위한 글입니다. 2026년 세제개편안은 청년 전용 ISA를 신설해, 이자·배당을 전액 비과세하면서 납입액의 10%까지 소득공제하는 파격적인 혜택을 담았습니다. 이 글은 가입 조건, 세금 혜택의 크기, 기존 일반 ISA와의 차이, 그리고 아직 정부안이라는 점까지 계산 사례로 정리합니다.
                </p>
              </header>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">청년형 ISA가 뭔가요?</h2>
                <p>
                  청년형 ISA는 34세 이하 청년의 자산형성을 돕는 개인종합자산관리계좌입니다. 2026년 세제개편안(정부안)에 신설로 담겼으며, 근거는 개인종합자산관리계좌 과세특례 조항인 조세특례제한법 §91의18 개정안입니다. 이자·배당 전액 비과세에 더해 납입액을 소득공제까지 해주는 것이 특징입니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">30초 요약 (정부안 기준)</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    · 대상: 만 34세 이하, 총급여 7,500만원 이하
                    <br />
                    · 소득공제: 납입액의 10%, 연 최대 200만원
                    <br />
                    · 비과세: 이자·배당소득 전액
                    <br />
                    · 한도: 연 2천만원, 총 2억원
                    <br />
                    · 의무 기간: 3년(3년 단위 연장, 최장 10년)
                  </p>
                </div>
                <p>
                  다만 이 제도는 아직 국회 통과 전 정부안입니다. 지금 당장 가입할 수 있는 상품이 아니라는 점을 먼저 이해해야 합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">누가 가입할 수 있나요?</h2>
                <p>
                  만 34세 이하이면서 소득 요건을 충족하는 거주자가 대상으로 논의되고 있습니다(조특법 §91의18 개정안).
                </p>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li><strong>나이:</strong> 만 34세 이하</li>
                  <li><strong>소득:</strong> 총급여 7,500만원 이하 또는 종합소득금액 6,300만원 이하</li>
                  <li><strong>제외:</strong> 직전 3개 과세기간 중 1회라도 금융소득종합과세 대상이었던 사람</li>
                </ul>
                <p>
                  다만 금융소득종합과세 대상 이력이 있으면 가입이 막힙니다. 이는 이미 금융소득이 큰 고소득 투자자를 배제하려는 취지입니다. 요건은 정부안 기준이며 시행 시 세부 기준이 조정될 수 있습니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">일반 ISA와 무엇이 다른가요?</h2>
                <p>
                  가장 큰 차이는 소득공제와 비과세 범위입니다. 일반 ISA는 이자·배당을 일정 한도까지만 비과세하고 소득공제는 없지만, 청년형 ISA는 전액 비과세에 납입액 소득공제까지 더합니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 일반 ISA vs 청년형 ISA (정부안 기준, 조특법 §91의18)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">구분</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">일반 ISA</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">청년형 ISA(정부안)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">가입 대상</td>
                        <td className="p-3">19세 이상 거주자 등</td>
                        <td className="p-3">34세 이하, 소득요건 충족</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">이자·배당</td>
                        <td className="p-3">한도까지 비과세, 초과분 9% 분리과세</td>
                        <td className="p-3"><strong>전액 비과세</strong></td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">납입 소득공제</td>
                        <td className="p-3">없음</td>
                        <td className="p-3"><strong>납입액의 10%(최대 200만원)</strong></td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">납입 한도</td>
                        <td className="p-3">연 2천만원, 총 1억원</td>
                        <td className="p-3">연 2천만원, 총 2억원</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p>
                  다만 청년형 ISA는 나이·소득 요건이 있어 아무나 가입할 수 없습니다. 요건을 넘겼거나 금융소득종합과세 이력이 있으면 일반 ISA를 활용하는 것이 현실적입니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">실제 절세액은 얼마나 되나요? (계산 사례)</h2>
                <p>
                  청년형 ISA의 혜택은 소득공제와 비과세 두 축으로 나뉩니다. 납입액 기준으로 소득공제 효과를 계산해보면 다음과 같습니다(정부안 기준).
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 1. 연 2천만원 납입 (한도 최대)</p>
                  <p className="text-sm text-text-secondary">
                    · 소득공제액: 2,000만 × 10% = <strong>200만원</strong>
                    <br />
                    · 한계세율 15% 구간 → 절감세액: 200만 × 15% = 30만원(지방세 포함 약 33만원)
                    <br />
                    · 여기에 이자·배당소득 전액 비과세 효과가 추가됩니다.
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 2. 연 1천만원 납입</p>
                  <p className="text-sm text-text-secondary">
                    · 소득공제액: 1,000만 × 10% = <strong>100만원</strong>
                    <br />
                    · 한계세율 24% 구간 → 절감세액: 100만 × 24% = 24만원(지방세 포함 약 26만원)
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 3. 이자·배당 비과세 효과</p>
                  <p className="text-sm text-text-secondary">
                    · 계좌에서 배당 300만원 발생 가정
                    <br />
                    · 일반 계좌: 300만 × 15.4% = 약 46만원 세금
                    <br />
                    · 청년형 ISA: <strong>전액 비과세</strong> → 세금 0원
                  </p>
                </div>
              </section>

              <section className="space-y-6 border-t border-border-base pt-8">
                <h2 className="text-2xl font-bold">가입 전 확인할 점</h2>
                <p>
                  혜택이 큰 만큼 조건과 유의점도 함께 따져야 합니다.
                </p>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li>
                    <strong>정부안 단계:</strong> 아직 국회 통과 전이라 지금은 가입할 수 없습니다. 시행 시기·최종 조건이 확정되지 않았습니다.
                  </li>
                  <li>
                    <strong>의무 가입 3년:</strong> 중도 해지하면 받은 세제 혜택이 추징될 수 있으니 장기 자금으로 넣어야 합니다.
                  </li>
                  <li>
                    <strong>국내 투자 중심:</strong> 국내 주식·펀드 위주라 해외 직접투자 비중이 큰 사람에게는 맞지 않을 수 있습니다.
                  </li>
                  <li>
                    <strong>금융소득종합과세 이력:</strong> 직전 3년 중 1회라도 해당되면 가입이 제한됩니다.
                  </li>
                </ul>
                <p>
                  다만 투자 성과 자체는 시장 상황에 따라 달라지며, 이 글은 세제 혜택 구조를 설명할 뿐 특정 상품 가입을 권하는 것이 아닙니다.
                </p>
              </section>

              <h2 className="text-2xl font-bold mb-6">자주 묻는 질문</h2>
              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h3 className="text-lg font-semibold text-text-primary">관련 계산기 및 가이드</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link
                    href="/guide/isa-account-tax-benefit-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">ISA 계좌 세제혜택 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">일반 ISA의 비과세·분리과세 구조를 먼저 보세요.</p>
                  </Link>
                  <Link
                    href="/guide/productive-finance-isa-2026-tax-reform/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">생산적금융 ISA 2026 개편</div>
                    <p className="mt-1 text-sm text-text-secondary">국내투자 전액 비과세 ISA와 비교하세요.</p>
                  </Link>
                  <Link
                    href="/guide/dividend-income-tax-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">배당소득세 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">비과세가 없을 때 배당에 붙는 세금을 확인하세요.</p>
                  </Link>
                  <Link
                    href="/guide/youth-future-savings-account-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">청년도약계좌 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">청년 자산형성 상품을 함께 비교해보세요.</p>
                  </Link>
                  <Link
                    href="/guide/interest-income-tax-15-4-percent-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">이자소득세 15.4% 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">일반 계좌 이자·배당 원천징수율을 확인하세요.</p>
                  </Link>
                  <Link
                    href="/category/investment/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">모든 투자 가이드</div>
                    <p className="mt-1 text-sm text-text-secondary">주식·펀드·절세계좌 모음.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 교육 목적으로 작성되었으며 특정 상품 가입을 권유하거나 개인 맞춤형 세무·투자 조언을 제공하지 않습니다. 청년형 ISA는 2026년 8월 3일 발표된 세제개편안(정부안)에 담긴 신설 제도로, 국회 통과와 시행령 마련 전에는 가입할 수 없습니다. 가입 대상·소득요건·납입한도·투자범위 등 모든 수치는 정부안 기준이며 확정 시 달라질 수 있습니다. 근거 법조항은 <strong>조세특례제한법 §91의18(개인종합자산관리계좌에 대한 과세특례)</strong> 개정안입니다. 본 콘텐츠는 2026-08-24를 기준으로 작성됐으며, 확정안 발표 시 업데이트됩니다. AI 보조 작성 후 운영자 검수 완료.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터</a>,{' '}
                  <a href="https://www.moef.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">기획재정부</a>,{' '}
                  <a href="https://www.nts.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">국세청</a>.
                </p>
              </section>

              <ShareButtons
                title="청년형 ISA 2026 신설안 가이드"
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
