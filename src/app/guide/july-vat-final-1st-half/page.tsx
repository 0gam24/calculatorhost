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
  buildHowToJsonLd,
} from '@/lib/seo/jsonld';

const URL = 'https://calculatorhost.com/guide/july-vat-final-1st-half/';
const DATE_PUBLISHED = '2026-05-12';
const DATE_MODIFIED = '2026-05-12';

export const metadata: Metadata = {
  title: '7월 부가세 확정신고 가이드 2026 | 일반·간이과세 완전정리',
  description:
    '2026년 7월 1~25일 부가가치세 1기 확정신고 완벽 가이드. 신고 대상·기한·일반과세 vs 간이과세·세액계산·홈택스 5단계·환급·절세 5가지. 프리랜서·사업자 필독.',
  keywords: [
    '부가가치세 신고',
    '7월 부가세',
    '부가가치세 확정신고',
    '1기 부가세',
    '일반과세 부가세',
    '간이과세 부가가치율',
    '부가가치세 계산',
    '부가세 환급',
    '홈택스 부가세 신고',
    '2026 부가가치세',
    '부가세 절세',
    '세액공제',
  ],
  alternates: { canonical: URL },
  openGraph: {
    title: '7월 부가세 확정신고 가이드 2026',
    description: '신고 대상·기한·홈택스 5단계·일반/간이과세 차이·환급·절세 5가지.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '7월 부가세 확정신고 가이드 2026',
    description: '프리랜서·1인사업자 필독. 신고 단계·세액 계산·환급·절세.',
  },
};

const FAQ_ITEMS = [
  {
    question: '부가세 신고 안 하면 어떻게 되나요?',
    answer:
      '무신고 가산세 10%(최소 100만 원) + 납부지연가산세 일 0.022%가 부과됩니다(부가가치세법 §66, 국세기본법 §47의2). 예: 납부세액 500만 원 미신고 시 50만 원 가산세 + 지연이자. 기한을 놓쳤다면 즉시 자진 신고 → 가산세 50% 경감 가능.',
  },
  {
    question: '일반과세자에서 간이과세자로 바꿀 수 있나요?',
    answer:
      '연 매출 1억 400만 원 이하면 선택 가능합니다(부가가치세법 §61). 단, 한번 선택하면 2년간 유지 의무. 실제 경비가 적은 사업(소매·서비스)은 간이과세 유리, 경비가 많은 사업(제조)은 일반과세 유리. 업종별 부가가치율과 실제 경비를 비교해 선택하세요.',
  },
  {
    question: '세금계산서를 못 받은 거래는 매입세액 공제 가능한가요?',
    answer:
      '세금계산서 미수령 시 매입세액 공제가 원칙적으로 불가합니다. 신용카드·현금영수증으로 결제했다면 영수증 매입세액 공제(부가가치세법 §46) 가능. 향후 거래처에 세금계산서 정정 요청 → 기한 후 정정신고로 추가 공제 신청할 수 있습니다.',
  },
  {
    question: '환급은 언제쯤 받을 수 있나요?',
    answer:
      '신고 후 보통 2~4주 내 입금됩니다. 7월 초 신고는 7월 말~8월 초, 7월 중순 신고는 8월 중순, 7월 말 신고는 8월 말 입금이 일반적입니다. 환급 진행 상황은 홈택스 "환급 조회"에서 실시간 확인 가능합니다.',
  },
  {
    question: '간이과세자도 세금계산서를 발급해야 하나요?',
    answer:
      '연 매출 4,800만 원 이상 간이과세자는 세금계산서 발급 의무가 있습니다(부가가치세법 §63). 4,800만 원 미만은 영수증으로 갈음. 매입자가 일반과세자라면 세금계산서를 요구할 수 있으므로 발급 가능 여부 미리 확인이 필요합니다.',
  },
];

export default function JulyVatGuide() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '7월 부가세 확정신고 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '7월 부가가치세 1기 확정신고 완벽 가이드 2026',
    description:
      '2026년 7월 1~25일 부가가치세 1기 확정신고 완벽 가이드. 일반·간이과세 차이, 홈택스 5단계, 환급·절세 5가지를 한 페이지에 정리.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    type: 'Article',
    keywords: ['부가가치세 신고', '7월 부가세', '간이과세', '홈택스', '2026'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '7월 부가세 확정신고 가이드 2026',
    description:
      '2026년 7월 부가가치세 1기 확정신고. 신고 대상·기한·세액계산·홈택스 단계·절세 5가지·환급 시나리오.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
  });
  const faqLd = buildFaqPageJsonLd([...FAQ_ITEMS]);
  const speakableLd = buildSpeakableJsonLd(['[data-speakable]']);
  const howtoLd = buildHowToJsonLd({
    name: '홈택스 부가가치세 확정신고 단계별 가이드',
    description: '국세청 홈택스에서 부가가치세 1기 확정신고를 신고·납부하는 6단계',
    steps: [
      {
        name: '홈택스 로그인',
        text: '홈택스(hometax.go.kr) 또는 손택스 앱 접속 → 공동인증서·간편인증으로 로그인.',
      },
      {
        name: '부가가치세 신고 메뉴 진입',
        text: '"신고/납부" → "부가가치세" → "신고/납부" 선택. 일반과세·간이과세 본인 유형 확인 필수.',
      },
      {
        name: '과세기간 선택 + 자료 확인',
        text: '"2026년 1기 (1~6월)" 선택. 국세청 연계 자료(세금계산서, 신용카드 매출)가 자동 입력됨. 누락 항목 직접 입력.',
      },
      {
        name: '매출·매입 세액 입력',
        text: '일반과세자: 세금계산서·신용카드·현금영수증 매출/매입 합계 입력. 간이과세자: 월별 매출액만 입력 → 시스템이 자동 계산.',
      },
      {
        name: '결과 확인 + 전자신고',
        text: '납부할 세액 또는 환급받을 세액 확인. "전자신고" 클릭 → 신고증명서 PDF 보관.',
      },
      {
        name: '납부 또는 환급 통장 입력',
        text: '추가 납부: 신용카드(0.8% 수수료)·계좌이체·가상계좌로 7월 25일까지. 환급: 본인 명의 통장 정확히 입력 → 8월 중 입금.',
      },
    ],
  });

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howtoLd) }} />

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
                    { name: '7월 부가세 확정신고' },
                  ]}
                />
                <h1 className="mt-4 text-3xl font-bold text-text-primary md:text-4xl">
                  7월 부가가치세 1기 확정신고 완벽 가이드 2026
                </h1>
                <p className="mt-3 text-lg text-text-secondary" data-speakable>
                  2026년 7월 1~25일은 부가가치세 1기 확정신고 시즌입니다. 1~6월 상반기 매출·매입에 대한
                  부가세를 신고·납부합니다. 일반과세자·간이과세자·법인·개인사업자 모두 대상이며,
                  기한을 놓치면 가산세 10%(최소 100만 원)가 부과됩니다(부가가치세법 §49·§66).
                </p>
              </header>

              <AdSlot slot="guide-july-vat-top" format="horizontal" />

              {/* 1. 신고 대상과 기한 */}
              <section aria-label="신고 대상과 기한" className="card">
                <h2 className="mb-4 text-2xl font-semibold">신고 대상과 기한</h2>
                <div className="space-y-3 text-text-secondary">
                  <div data-speakable>
                    <strong className="text-text-primary">1기 과세기간</strong>: 2026년 1월 1일 ~ 6월 30일.
                    <br />
                    <strong className="text-text-primary">신고·납부 기한</strong>: 2026년 7월 1일 ~ 7월 25일 (신고=납부).
                  </div>
                  <ul className="list-inside list-disc space-y-1.5">
                    <li>✅ 부가세 과세 사업자 (사업등록한 개인·법인)</li>
                    <li>✅ 일반과세자 + 간이과세자 (양식 다름)</li>
                    <li>❌ 면세 사업자 (의료·교육·금융 이자 — 선택 신고 가능)</li>
                  </ul>
                  <p className="text-sm">
                    7월 25일이 토요일이라도 국세기본법 §5에 따라 익영업일(7월 27일 월) 까지 자동 연장됩니다.
                    다만 신용카드·가상계좌는 시스템 부하로 25일 직전 지연 가능 → 20일까지 신고 권장.
                  </p>
                </div>
              </section>

              {/* 2. 일반과세 vs 간이과세 */}
              <section aria-label="일반과세 vs 간이과세" className="card">
                <h2 className="mb-4 text-2xl font-semibold">일반과세자 vs 간이과세자 차이</h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm" data-speakable>
                    <caption className="sr-only">일반과세자와 간이과세자 비교</caption>
                    <thead>
                      <tr className="border-b border-border-base text-left">
                        <th className="py-2 pr-4 font-semibold">구분</th>
                        <th className="py-2 pr-4 font-semibold">일반과세자</th>
                        <th className="py-2 font-semibold">간이과세자</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-subtle">
                        <td className="py-2 pr-4">매출 기준</td>
                        <td className="py-2 pr-4">연 1억 400만 초과</td>
                        <td className="py-2">연 1억 400만 이하</td>
                      </tr>
                      <tr className="border-b border-border-subtle">
                        <td className="py-2 pr-4">세액 계산</td>
                        <td className="py-2 pr-4">매출세액 − 매입세액</td>
                        <td className="py-2">매출 × 부가가치율 × 5%</td>
                      </tr>
                      <tr className="border-b border-border-subtle">
                        <td className="py-2 pr-4">세금계산서</td>
                        <td className="py-2 pr-4">발급·수령 의무</td>
                        <td className="py-2">매출 4,800만↑만 발급</td>
                      </tr>
                      <tr>
                        <td className="py-2 pr-4">신고 난도</td>
                        <td className="py-2 pr-4">높음 (영수증 분류)</td>
                        <td className="py-2">낮음 (매출만)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-3 text-sm text-text-tertiary">
                  업종별 부가가치율(부가가치세법 §63): 음식·숙박 15% / 소매·도소매 20% / 제조 25~30% /
                  운수·창고 10% / 부동산임대 면세.
                </p>
              </section>

              <AdSlot slot="guide-july-vat-mid" format="rectangle" />

              {/* 3. 세액 계산 단계 */}
              <section aria-label="세액 계산 단계" className="card">
                <h2 className="mb-4 text-2xl font-semibold">부가세 세액 계산 단계</h2>
                <div className="space-y-3 text-text-secondary">
                  <p>
                    <strong className="text-text-primary">일반과세자</strong>는 매출세액에서 매입세액을 차감합니다.
                  </p>
                  <ol className="list-inside list-decimal space-y-1.5">
                    <li>매출세액 = 매출액(부가세 포함) × 10/110</li>
                    <li>매입세액 = 세금계산서·신용카드·현금영수증 매입의 부가세 합계 (공제 가능분)</li>
                    <li>납부세액 = 매출세액 − 매입세액</li>
                    <li>감면·공제 적용: 신용카드 가산공제 0.5~1%, 수출 영세율 등</li>
                  </ol>
                  <p>
                    <strong className="text-text-primary">간이과세자</strong>는 단순 공식: 매출액 × 업종별 부가가치율
                    × 5%. 예: 음식점 6개월 매출 4,500만 × 15% × 5% = 약 33,750원 × 6 = 약 20만 원.
                  </p>
                </div>
                <div className="mt-3 rounded-lg bg-primary-500/10 p-3 text-sm">
                  <Link href="/calculator/vat/" className="font-semibold text-primary-600 underline dark:text-primary-500">
                    → 부가가치세 계산기로 본인 사례 즉시 계산하기
                  </Link>
                </div>
              </section>

              {/* 4. 홈택스 단계별 (HowTo) */}
              <section aria-label="홈택스 단계별 신고법" className="card">
                <h2 className="mb-4 text-2xl font-semibold">홈택스 부가세 신고 6단계</h2>
                <ol className="list-inside list-decimal space-y-2 text-text-secondary">
                  <li><strong>로그인</strong>: 홈택스(hometax.go.kr) 또는 손택스 → 공동인증서·간편인증.</li>
                  <li><strong>메뉴 진입</strong>: "신고/납부" → "부가가치세" → "신고/납부".</li>
                  <li><strong>과세기간 + 자료 확인</strong>: "2026년 1기 (1~6월)" 선택. 자동 입력 자료 확인 + 누락 항목 직접 입력.</li>
                  <li><strong>매출·매입 입력</strong>: 일반은 세금계산서/신용카드/현금영수증 매출/매입. 간이는 월별 매출만.</li>
                  <li><strong>결과 확인 + 전자신고</strong>: 납부 또는 환급액 확인 → "전자신고" → 신고증명서 PDF 보관.</li>
                  <li><strong>납부/환급</strong>: 신용카드(0.8% 수수료)·계좌이체·가상계좌로 7월 25일까지. 환급은 본인 통장.</li>
                </ol>
              </section>

              {/* 5. FAQ (중간 배치 — GEO) */}
              <FaqSection items={[...FAQ_ITEMS]} />

              {/* 6. 절세 5가지 */}
              <section aria-label="절세 5가지" className="card">
                <h2 className="mb-4 text-2xl font-semibold">부가세 절세 5가지</h2>
                <div className="space-y-3 text-text-secondary">
                  <div>
                    <h3 className="font-semibold text-text-primary">① 세금계산서 정확 관리</h3>
                    <p className="text-sm">선급금에도 세금계산서 받기. 후급금은 확정 후 수정 계산서 필수. 누락 시 매입세액 공제 불가.</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-text-primary">② 신용카드 가산공제 활용</h3>
                    <p className="text-sm">신용카드 매출 0.5~1% 추가 공제 (3억 이하 1%, 3~10억 0.8%, 10억 초과 0.5%).</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-text-primary">③ 수출 영세율 100% 공제</h3>
                    <p className="text-sm">수출 매출 영세율(0%) → 매출세액 0 + 전체 매입세액 공제 가능 (환급).</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-text-primary">④ 공제 제한 항목 최소화</h3>
                    <p className="text-sm">자동차·식사비·접대비는 공제 불가. 운전·통신·광고는 일부(80%) 공제. 임차·운영비 전환 검토.</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-text-primary">⑤ 성실신고확인 신청</h3>
                    <p className="text-sm">연 3,000만 원 이상 사업자 중 회계장부 성실 → 0.5~1% 감면.</p>
                  </div>
                </div>
              </section>

              {/* 7. 주의사항 */}
              <section aria-label="주의사항" className="card border-l-4 border-l-danger-500">
                <h2 className="mb-3 text-xl font-semibold">⚠️ 주의사항</h2>
                <ul className="list-inside list-disc space-y-1.5 text-sm text-text-secondary">
                  <li>홈택스 서버 부하는 25일 직전 가장 심함 → 20일까지 신고 권장.</li>
                  <li>일반과세·간이과세 양식이 다름 — 잘못된 양식 신고 시 수정신고 필요.</li>
                  <li>매출 세금계산서는 매입측이 수령 확인해야 공제 가능 → 발급 후 수령 확인 필수.</li>
                  <li>신고 후 5년간 매출·매입 증빙(세금계산서·영수증·통장) 보관 의무.</li>
                </ul>
              </section>

              {/* 8. 관련 계산기·가이드 */}
              <section aria-label="관련 계산기·가이드" className="card">
                <h2 className="mb-4 text-2xl font-semibold">관련 계산기·가이드</h2>
                <ul className="space-y-2 text-text-secondary">
                  <li>→ <Link href="/calculator/vat/" className="text-primary-600 underline dark:text-primary-500">부가가치세 계산기</Link> — 본 가이드 시나리오 실시간 시뮬레이션</li>
                  <li>→ <Link href="/calculator/freelancer-tax/" className="text-primary-600 underline dark:text-primary-500">프리랜서 종합소득세 계산기</Link> — 사업소득세와 부가세 동시 계산</li>
                  <li>→ <Link href="/guide/may-comprehensive-income-tax/" className="text-primary-600 underline dark:text-primary-500">5월 종합소득세 신고 가이드</Link> — 부가세 신고 직전 단계</li>
                  <li>→ <Link href="/guide/year-end-tax-settlement/" className="text-primary-600 underline dark:text-primary-500">연말정산 가이드</Link> — 부가세 신고 후 다음 단계</li>
                </ul>
              </section>

              <ShareButtons title="7월 부가세 확정신고 가이드 2026" url={URL} description="신고 대상·기한·홈택스 단계·환급·절세 5가지." />

              {/* 출처·면책 */}
              <section
                aria-label="출처 및 면책"
                className="rounded-lg border border-border-base p-4 text-caption text-text-tertiary"
              >
                <p className="mb-2">
                  <strong>법적 근거</strong>: 부가가치세법 §49 (신고·납부) · §59 (예정고지) · §61 (간이과세) · §63 (간이과세자 부가가치율) · §66 (가산세) · 국세기본법 §5 (기한 연장) · §47의2 (무신고가산세). 참고: <a href="https://www.hometax.go.kr" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-600 underline dark:text-primary-500">국세청 홈택스</a>, <a href="https://www.nts.go.kr" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-600 underline dark:text-primary-500">국세청</a>, <a href="https://www.law.go.kr" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-600 underline dark:text-primary-500">법령정보센터</a>.
                </p>
                <p className="mb-2">
                  <strong>면책조항</strong>: 본 가이드는 정보 제공 목적이며 세무·법적 조언이 아닙니다. 개별 사정(복잡한 거래, 특수 산업, 재정·금융 사업자 등)은 반드시 세무사 또는 국세청 상담을 통해 확정하시기 바랍니다. 신고 후 이의제기·경정청구는 신고일로부터 3개월 이내 가능합니다.
                </p>
                <p>
                  <strong>업데이트</strong>: {DATE_MODIFIED} · 작성·검수: 김준혁 (스마트데이터샵). 본 가이드는 AI 보조 작성 후 운영자 검수 발행되었습니다.
                </p>
              </section>
            </article>
          </main>
        </div>
        <Footer />
      </div>
    </>
  );
}
