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

const URL = 'https://calculatorhost.com/guide/farmland-pension-2026/';
const DATE_PUBLISHED = '2026-08-17';
const DATE_MODIFIED = '2026-08-17';
// [revenue-lever: indexing+traffic]

export const metadata: Metadata = {
  title: '농지연금 2026, 가입조건·수령액·수령방식 총정리',
  description:
    '농지연금은 60세 이상 농업인이 소유 농지를 담보로 매달 연금을 받는 제도입니다. 가입 나이·영농경력 요건, 담보농지 평가, 종신형·기간형 수령방식, 재산세 감면까지 2026년 기준으로 정리했습니다.',
  keywords: [
    '농지연금',
    '농지연금 가입조건',
    '농지연금 수령액',
    '농지연금 나이',
    '농지 담보 연금',
    '한국농어촌공사 농지은행',
    '농지법',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '농지연금 2026' }],
    title: '농지연금 2026, 가입조건과 수령액 총정리',
    description:
      '60세 이상 농업인이 농지를 담보로 받는 월 연금. 가입 요건, 담보 평가, 수령방식, 세제혜택까지.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '농지연금 2026, 가입조건과 수령액',
    description: '60세 이상 농업인이 농지를 담보로 받는 월 연금. 요건·담보평가·수령방식·세제혜택 정리.',
  },
};

const FAQ_ITEMS = [
  {
    question: '농지연금은 누가 가입할 수 있나요?',
    answer:
      '기본형은 60세 이상이면서 영농경력 5년 이상인 농업인이 대상입니다. 소유한 농지를 담보로 맡기고 매달 연금을 받는 구조입니다. 은퇴직불형 등 일부 유형은 연령·영농경력 요건이 다르므로, 자세한 기준은 한국농어촌공사 농지은행에서 확인하세요.',
  },
  {
    question: '수령액은 어떻게 정해지나요?',
    answer:
      '담보 농지의 평가액과 가입 나이, 수령 방식에 따라 결정됩니다. 농지 가격이 높을수록, 가입 나이가 많을수록 월 지급금이 올라갑니다. 예를 들어 평가액 1억원 농지를 종신형으로 가입하면 월 40만원 안팎을 받을 수 있으나, 정확한 금액은 농지은행 예상연금 조회로 확인해야 합니다.',
  },
  {
    question: '담보 농지는 어떻게 평가하나요?',
    answer:
      '개별공시지가 또는 감정평가액을 기준으로 담보 가치를 산정합니다. 통상 공시지가를 100%로, 감정평가를 택하면 감정가의 일정 비율로 반영합니다. 평가 방식에 따라 연금액이 달라지므로 두 방식을 비교해 유리한 쪽을 선택하는 것이 좋습니다.',
  },
  {
    question: '수령 방식에는 어떤 종류가 있나요?',
    answer:
      '종신형, 기간형, 전후후박형 등이 있습니다. 종신형은 살아 있는 동안 매달 정액을 받고, 기간형은 5년·10년 등 정한 기간 동안 받습니다. 전후후박형은 초기에 더 많이 받다가 나중에 줄어드는 방식입니다. 생활 계획에 맞춰 선택하세요.',
  },
  {
    question: '농지연금을 받으면서 농사를 계속 지을 수 있나요?',
    answer:
      '가능합니다. 담보로 맡긴 농지를 직접 경작하거나 임대해 추가 소득을 올릴 수 있습니다. 즉 연금과 영농·임대 소득을 함께 얻을 수 있어, 농지를 팔지 않고도 노후 현금흐름을 만드는 것이 농지연금의 장점입니다.',
  },
  {
    question: '세금 혜택이나 보호 장치가 있나요?',
    answer:
      '일정 금액 이하의 담보 농지는 재산세가 감면되고, 연금은 압류방지 통장으로 받아 최소 생활자금을 보호받을 수 있습니다. 다만 감면 한도와 조건은 매년 달라지므로, 가입 전 한국농어촌공사와 관할 지자체에서 최신 기준을 확인하세요.',
  },
  {
    question: '가입자가 사망하면 농지는 어떻게 되나요?',
    answer:
      '상속인이 그동안 받은 연금과 이자 등을 상환하면 농지를 돌려받을 수 있습니다. 상환하지 않으면 담보 농지를 처분해 정산하고 남은 금액은 상속인에게 돌아갑니다. 반대로 부족분이 생겨도 상속인에게 추가로 청구하지 않는 것이 원칙입니다.',
  },
];

export default function FarmlandPension2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '농지연금 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '농지연금 2026, 가입조건·수령액·수령방식 총정리',
    description:
      '60세 이상 농업인이 소유 농지를 담보로 매달 연금을 받는 농지연금. 가입 요건, 담보 평가, 종신형·기간형 수령방식, 세제혜택을 2026년 기준으로 정리.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['농지연금', '가입조건', '수령액', '담보 농지', '종신형', '한국농어촌공사'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '농지연금 2026',
    description:
      '농지연금의 가입 요건, 담보 평가, 수령방식, 세제혜택과 주택연금·국민연금과의 차이를 정리한 실전 가이드.',
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
                    { name: '농지연금 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">은퇴 농업인 · 8분 읽기 · 2026-08-17</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  농지연금 2026
                  <br />
                  <span className="text-2xl text-text-secondary">· 가입조건·수령액·수령방식 총정리</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  땅은 있는데 현금이 부족한 은퇴 농업인에게 농지연금은 농지를 팔지 않고도 매달 생활비를 만드는 방법입니다. 이 글은 농지를 소유한 60세 이상 농업인과 은퇴를 앞둔 농민을 위해 준비했습니다. 누가 가입할 수 있는지, 담보 농지는 어떻게 평가하고 수령액은 어떻게 정해지는지, 어떤 수령 방식을 고를 수 있는지, 세제혜택과 사망 시 처리까지 순서대로 정리합니다. 금액 기준은 매년 바뀌므로 정확한 수치는 한국농어촌공사 농지은행에서 확인하는 것을 전제로 읽어주세요.
                </p>
              </header>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">30초 요약</h2>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">핵심만 먼저</p>
                  <ul className="mt-2 space-y-1 text-sm text-text-secondary list-disc ml-5">
                    <li>대상: 60세 이상, 영농경력 5년 이상 농업인(유형별 요건 상이).</li>
                    <li>구조: 소유 농지를 담보로 매달 연금 수령, 농사·임대 병행 가능.</li>
                    <li>수령액: 농지 평가액이 높고 가입 나이가 많을수록 증가.</li>
                    <li>방식: 종신형·기간형·전후후박형 중 선택.</li>
                    <li>혜택: 재산세 감면, 압류방지 통장, 사망 시 상속인에게 잔여 정산.</li>
                  </ul>
                </div>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">농지연금이 뭔가요?</h2>
                <p>
                  농지연금은 소유한 농지를 담보로 매달 연금을 받는 노후 대비 제도입니다. 한국농어촌공사가 운영하며, 농지법상 농지를 담보로 맡기고 그 가치를 매달 나누어 지급받는 구조입니다. 농지를 팔지 않고도 현금흐름을 만들 수 있고, 담보 농지를 계속 경작하거나 임대해 추가 소득까지 얻을 수 있는 것이 특징입니다.
                </p>
                <p>
                  구조는 주택을 담보로 하는 주택연금과 비슷합니다. 다만 담보가 주택이 아니라 농지라는 점, 그리고 농업인만 가입할 수 있다는 점이 다릅니다. 땅은 있지만 소득이 부족한 고령 농가의 노후 안정을 돕는 것이 제도의 목적입니다.
                </p>
                <p>
                  다만 농지연금은 대출의 성격을 함께 가집니다. 받은 연금에는 이자가 붙고, 나중에 상속인이 원리금을 갚으면 농지를 되찾을 수 있습니다. 즉 농지를 넘기는 매매가 아니라, 농지를 담보로 한 역모기지에 가깝습니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">가입조건은 어떻게 되나요?</h2>
                <p>
                  기본형은 60세 이상, 영농경력 5년 이상입니다. 나이는 신청 연도 말일 기준으로 판단하며, 영농경력은 신청 전까지 실제 농업에 종사한 기간을 합산합니다. 담보로 맡길 농지도 일정 요건을 갖춰야 합니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">대상 농지 요건 (방향)</p>
                  <ul className="mt-2 space-y-1 text-sm text-text-secondary list-disc ml-5">
                    <li>농지법상 농지(전·답·과수원 등)로 실제 영농에 쓰이는 땅.</li>
                    <li>신청인이 일정 기간 이상 보유한 농지.</li>
                    <li>거주지와 농지 소재지 사이 거리 요건을 두는 경우가 있음.</li>
                    <li>저당권 등 제한물권이 설정되지 않았거나 해소 가능한 농지.</li>
                  </ul>
                </div>
                <p>
                  다만 세부 요건은 유형과 연도에 따라 달라집니다. 은퇴직불형처럼 연령·영농경력 기준이 다른 유형도 있으므로, 신청 전 한국농어촌공사 농지은행에서 본인 농지가 대상인지 반드시 확인하세요.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">수령액은 어떻게 정해지나요?</h2>
                <p>
                  농지 평가액과 가입 나이, 수령 방식이 연금액을 결정합니다. 농지 가격이 높을수록, 가입 나이가 많을수록 월 지급금이 커집니다. 담보 농지는 개별공시지가를 100%로, 또는 감정평가액의 일정 비율로 평가하며, 두 방식 중 유리한 쪽을 선택할 수 있습니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례. 평가액 1억원 농지, 종신형</p>
                  <p className="text-sm text-text-secondary">
                    · 담보 농지 평가액: 1억원
                    <br />
                    · 가입 나이 65세, 종신정액형 가정
                    <br />
                    · 월 예상 연금: 약 40만원 안팎(예시)
                    <br />
                    · 가입 나이 70세로 높이면 같은 농지라도 월 지급금이 더 커짐
                    <br />
                    <span className="text-xs text-text-tertiary">위 금액은 이해를 돕기 위한 예시입니다. 실제 연금은 농지은행 예상연금 조회로 확인하세요.</span>
                  </p>
                </div>
                <p>
                  다만 연금을 많이 받는다고 항상 유리한 것은 아닙니다. 받은 연금에는 이자가 누적되고 이는 나중에 상환할 금액에 반영되므로, 수령 기간과 상속 계획을 함께 고려해 방식을 정하는 것이 좋습니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">농지연금과 주택연금은 어떻게 다른가요?</h2>
                <p>
                  담보 자산과 대상이 다릅니다. 노후 소득을 만든다는 목적은 같지만 세부 조건이 구분됩니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 농지연금과 주택연금 비교</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">구분</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">농지연금</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">주택연금</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">담보</td>
                        <td className="p-3">농지</td>
                        <td className="p-3">주택</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">대상</td>
                        <td className="p-3">영농경력 있는 농업인</td>
                        <td className="p-3">일반 주택 소유자</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">운영기관</td>
                        <td className="p-3">한국농어촌공사</td>
                        <td className="p-3">주택금융공사</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">추가소득</td>
                        <td className="p-3">경작·임대 병행 가능</td>
                        <td className="p-3">거주하며 일부 임대 가능</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  다만 농지와 주택을 모두 가진 경우라면 두 제도를 비교해 유리한 쪽을, 또는 각각을 함께 활용하는 방법을 검토할 수 있습니다. 국민연금·기초연금과 합쳐 노후 소득을 층층이 쌓는 것이 안정적입니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">세금 혜택과 사망 시 처리는요?</h2>
                <p>
                  담보 농지는 재산세 감면과 연금 압류 보호를 받습니다. 일정 금액 이하의 담보 농지는 재산세가 감면되고, 연금은 압류방지 통장으로 받아 최소 생활자금을 지킬 수 있습니다. 감면 한도와 조건은 지자체·연도에 따라 다르므로 사전 확인이 필요합니다.
                </p>
                <p>
                  가입자가 사망하면 상속인이 선택할 수 있습니다. 그동안 받은 연금과 이자를 상환하면 농지를 되찾고, 상환하지 않으면 담보 농지를 처분해 정산한 뒤 남는 금액을 상속인이 받습니다. 반대로 정산 후 부족분이 생겨도 상속인에게 추가 청구하지 않는 것이 원칙이라 위험이 제한됩니다.
                </p>
                <p>
                  다만 중도 해지하면 그동안 받은 연금과 이자를 한꺼번에 갚아야 합니다. 목돈이 필요해 해지하는 경우 상환 부담이 클 수 있으므로, 가입 전 장기 자금 계획을 세워두는 것이 안전합니다.
                </p>
              </section>

              <h2 className="text-2xl font-bold mb-6">자주 묻는 질문</h2>
              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h3 className="text-lg font-semibold text-text-primary">관련 계산기 및 가이드</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link
                    href="/guide/housing-pension-reverse-mortgage-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">주택연금 역모기지 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">집을 담보로 매달 연금을 받는 제도.</p>
                  </Link>
                  <Link
                    href="/guide/national-pension-expected-benefit-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">국민연금 예상수령액</div>
                    <p className="mt-1 text-sm text-text-secondary">노후 소득의 1층, 국민연금 예상액 확인.</p>
                  </Link>
                  <Link
                    href="/guide/basic-pension-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">기초연금 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">65세 이상 소득하위 70% 대상 기초연금.</p>
                  </Link>
                  <Link
                    href="/guide/self-farming-land-100-percent-exemption/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">자경농지 양도세 감면</div>
                    <p className="mt-1 text-sm text-text-secondary">8년 자경 농지의 양도세 100% 감면 요건.</p>
                  </Link>
                  <Link
                    href="/calculator/retirement/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">노후자금 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">필요 노후자금과 월 수령액을 시뮬레이션.</p>
                  </Link>
                  <Link
                    href="/category/finance/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">모든 금융 가이드</div>
                    <p className="mt-1 text-sm text-text-secondary">연금·대출·예적금·노후 준비 모음.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 교육 목적으로 작성되었으며 개인 맞춤형 재무 조언이 아닙니다. 농지연금의 가입 요건, 담보 평가, 수령액, 재산세 감면 기준은 한국농어촌공사 운용 기준과 지자체 조례에 따라 매년 변동됩니다. 본문의 금액은 이해를 돕기 위한 예시이며, 실제 가입 전 반드시 한국농어촌공사 농지은행과 관할 지자체에서 최신 기준을 확인하세요. 본 콘텐츠는 2026-08-17 기준입니다. 근거: <strong>농지법</strong>(농지의 정의·이용) 및 한국농어촌공사 농지연금 운용 기준. AI 보조 작성 후 운영자 검수 완료.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.fbo.or.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">한국농어촌공사 농지은행</a>,{' '}
                  <a href="https://www.nps.or.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">국민연금공단</a>,{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터</a>.
                </p>
              </section>

              <ShareButtons
                title="농지연금 2026 가이드"
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
