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

const URL = 'https://calculatorhost.com/guide/jeonse-deposit-safety/';
const DATE_PUBLISHED = '2026-05-06';
const DATE_MODIFIED = '2026-05-06';

export const metadata: Metadata = {
  title: '전세 보증금 안전 가이드 2026 | 사기 방지 체크리스트 | calculatorhost',
  description:
    '전세 사기·깡통전세 예방법 8가지. 계약 전 필수 확인사항·등기부등본 읽는 법·HUG보증 신청까지. 2026년 최신 법규 기준. 임차인 보호 + 보증금 회수 절차 포함.',
  keywords: [
    '전세 보증금',
    '전세 사기',
    '깡통전세',
    '전세 대출',
    '보증금 안전',
    '등기부등본',
    'HUG보증',
    '전세계약',
  ],
  alternates: { canonical: URL },
  openGraph: {
    title: '전세 보증금 안전 가이드 2026',
    description: '보증금 보호 8가지 필수 체크리스트. 깡통전세 예방부터 HUG보증 신청까지.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
};

const FAQ_ITEMS = [
  {
    question: '전세 계약 전 반드시 확인해야 할 것은?',
    answer:
      '① 임차인 등기부등본(부동산 소유자 확인) ② 선순위 저당권 규모(추출액 계산) ③ 보증금이 대출금 범위 내 ④ 중개인 신원 및 중개업소 확인 ⑤ 건물 신축일·매매가 추이(시장 급락 신호) ⑥ 관할 구청의 HUG보증 신청 서류. 계약금 이전에 이 모든 것을 완료해야 합니다.',
  },
  {
    question: '등기부등본 \'선순위 저당권\'이 높으면 위험한가요?',
    answer:
      '네. 예를 들어 공시가 10억 건물의 선순위 저당권이 8억이라면, 건물주가 남긴 자산은 2억뿐. 전세금 2억을 받으면 총 10억이 되지만, 시장 급락 시 건물 값이 8억으로 떨어지면 전세금 회수 불가. \'추출액 = 공시가 - 선순위 저당권\' 계산하여 전세금이 추출액 이내인지 반드시 확인하세요.',
  },
  {
    question: '전세 대출을 받으면 보증금 반환 리스크가 줄어드나요?',
    answer:
      '아니오. 임차인(세입자)이 받은 대출은 당신의 채무이지 건물주의 보증입니다. 오히려 높은 이자로 인한 경제적 부담만 커집니다. 보증금 안전성은 \'건물주의 자산 규모\' \'선순위 저당권\' \'시장 공급 과잉\' 등에 따라 결정되므로, 대출로는 해결할 수 없습니다.',
  },
  {
    question: 'HUG 전세보증보험은 반드시 들어야 하나요?',
    answer:
      '강제는 아니지만, 보증금이 3천만원 이상이라면 거의 필수입니다. HUG 가입 시 월 보험료 0.15~0.3% 부담하지만, 건물주 파산 시 보증금 8천만원까지 보호받습니다. 보험료는 작지만 보호 규모가 크므로, 대도시·대형 건물에서는 강력 권장.',
  },
  {
    question: '전세가 깡통이 되면 어디에 신고할까요?',
    answer:
      '시·군 부동산과 전세사기 신고, 경찰 사기 고소, 법원 임차보증금 회수 소송. 단 소송 승리도 건물주 자산이 없으면 집행 불가능. 따라서 사후 대처보다 계약 前 안전 검증이 가장 중요합니다. HUG 가입했다면 바로 HUG에 청구하세요.',
  },
  {
    question: '월세와 전세, 어느 것이 더 안전한가요?',
    answer:
      '월세는 매달 적은 액수를 지불하므로 총 손실이 한정적. 전세는 한 번에 큰 보증금을 주므로 손실 규모가 큽니다. 따라서 안정성만 비교하면 월세가 낫지만, 중장기 누적 비용은 전세가 저렴한 경우가 많습니다. 자신의 자산 여유와 거주 기간을 고려해 선택하세요.',
  },
  {
    question: '갱신 계약 시 보증금 인상은 몇 %까지 가능하나요?',
    answer:
      '임대차보호법상 갱신 시 인상률은 전전년도 소비자물가상승률의 5%를 초과하지 못합니다(2026년 기준 약 3~5%). 무리한 인상을 요구하면 \'임차권 등기\' 및 HUG 보험으로 대항력·우선순위 확보 후 협상할 수 있습니다.',
  },
];

export default function JeonseDepositSafetyPage() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '전세 보증금 안전 가이드' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '전세 보증금 안전 가이드 (2026)',
    description:
      '전세 사기·깡통전세 예방 8가지 필수 체크리스트. 계약 전 확인사항·HUG보증·등기부등본 읽는 법까지.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['전세', '보증금', '사기', 'HUG', '전세대출'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '전세 보증금 안전 가이드 2026',
    description:
      '전세 사기 예방법·등기부등본 확인·HUG 보증 신청. 계약 전 반드시 알아야 할 8가지 안전 수칙.',
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
                    { name: '전세 보증금 안전 가이드' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">부동산 거래자 · 9분 읽기 · 2026-05-06</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  전세 보증금 안전 가이드
                  <br />
                  <span className="text-2xl text-text-secondary">— 계약 전 반드시 확인할 8가지</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  깡통전세 피해가 갈수록 증가하면서 전세 계약 전 보증금 안전성 검증이 필수가 되었습니다. 임차인등기부등본 읽기부터 HUG 전세보증보험 신청까지, 당신의 보증금을 지키기 위한 8가지 필수 체크리스트를 정리했습니다.
                </p>
              </header>

              <AdSlot slot="guide-jeonse-top" format="horizontal" />

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">1. 부동산 등기부등본 확인 — 건물주 자산 파악</h2>
                <p>
                  전세 계약 전 가장 중요한 것은 '건물주가 보증금을 돌려줄 능력이 있는가'입니다. 이를 판단하는 첫 번째 근거는
                  <strong> 등기부등본</strong>입니다. 건물주 등기부등본이 아닌 <strong>임차인 등기부등본</strong>(세입자 입장에서 보는
                  건물의 소유 현황)에서 ① 소유자 이름 ② 선순위 저당권 규모 ③ 근저당권을 확인하세요.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">추출액 계산법</p>
                  <p className="mt-2 text-text-secondary">
                    추출액 = 공시가격 − 선순위 저당권 − 근저당권
                  </p>
                  <p className="mt-1 text-sm text-text-tertiary">
                    예) 공시가 10억, 선순위 저당 8억 → 추출액 2억. 전세금 2억을 받으면 한계 상태.
                  </p>
                </div>
              </section>

              <section className="space-y-6">
                <h2 className="text-2xl font-bold">2. 시장 수급 및 시세 추이 조사</h2>
                <p>
                  같은 건물·같은 동의 매매가와 전세가를 비교하세요. 최근 6개월간 매매가가 급락하거나 비슷한 면적의 전세가가 유독 높으면
                  위험신호입니다. 부동산114·다음 부동산·국토부 실거래가 공개 시스템으로 과거 1년 거래 추이를 확인하고, 건물주의 재정 상황을
                  간접적으로 파악할 수 있습니다.
                </p>
              </section>

              <section className="space-y-6">
                <h2 className="text-2xl font-bold">3. 대출금 확인 — 선순위 저당권이 높으면 위험</h2>
                <p>
                  건물주가 은행에서 대출받은 금액(선순위 저당권)이 공시가의 80% 이상이면 주의하세요. 예컨대 공시가 10억에 저당권 9억이라면,
                  건물주의 남은 자산은 1억뿐입니다. 전세금 2억을 받으면 총 빚이 11억이 되는데, 시장이 9억으로 떨어지면 전세금을 못 돌려줄
                  가능성이 높습니다. 따라서 <strong>추출액이 전세금 이상</strong>인지 반드시 확인하세요.
                </p>
              </section>

              <section className="space-y-6">
                <h2 className="text-2xl font-bold">4. HUG 전세보증보험 필수 가입</h2>
                <p>
                  보증금 3천만원 이상이라면 <strong>HUG(주택도시보증공사) 전세보증보험</strong>
                  에 반드시 가입하세요. 월 보험료는 보증금의 0.15~0.3% 수준으로 매우 저렴하지만, 건물주 파산 시 보증금 8천만원(대출 포함
                  최대)까지 보호받습니다. 신청 서류는 ① 계약서 사본 ② 등기부등본 ③ 건물주 신분증 사본 ④ 통장(입금 증명)으로 관할 구청에서
                  간단히 처리됩니다.
                </p>
                <p className="text-sm text-text-tertiary">
                  HUG 전세보증 신청: <a href="https://www.hug.or.kr" className="underline">www.hug.or.kr</a>
                </p>
              </section>

              <section className="space-y-6">
                <h2 className="text-2xl font-bold">5. 중개인 신원 확인</h2>
                <p>
                  전세 사기의 상당 부분이 거짓 중개인을 통해 발생합니다. 계약 전에 ① 중개사무소 사업자 등록 확인 ② 공인중개사 자격 번호 조회
                  ③ 명시된 중개수수료 계약서 작성을 반드시 해야 합니다. 불안하면 대형 공인중개사무소(매물 많은 곳)를 이용하고, 혼자 직거래하기보다
                  공식 중개인을 거치세요.
                </p>
              </section>

              <AdSlot slot="guide-jeonse-mid" format="rectangle" />

              <section className="space-y-6">
                <h2 className="text-2xl font-bold">6. 임차권 등기 즉시 신청</h2>
                <p>
                  전세 계약서 작성 직후 <strong>임차권 등기</strong>를 신청하세요. 이는 당신의 보증금이 건물의 다른 채권자보다 먼저 회수될 권리를
                  보장합니다. 등기 없이는 건물주가 몰래 또 다른 전세인을 받거나, 은행이 저당권으로 건물을 압류할 때 당신의 보증금 회수 순서가
                  밀려납니다. 비용도 거의 없고(5만원 이내), 절차도 간단하므로 반드시 하세요.
                </p>
              </section>

              <section className="space-y-6">
                <h2 className="text-2xl font-bold">7. 계약금 지급 시 필요한 서류</h2>
                <p>
                  ① 건물주 신분증 사본 및 통장(통장 사진으로 확인) ② 등기부등본(발급일 1개월 이내) ③ 임대차계약서(위조 방지) ④ 중개사무소
                  사업자 등록증 ⑤ 공인중개사 자격증 사본. 이 중 하나라도 없거나 의심스럽다면 계약금을 지급하지 말고, 시간을 두고 재확인하세요.
                </p>
              </section>

              <section className="space-y-6">
                <h2 className="text-2xl font-bold">8. 사기 신고 및 보호 절차</h2>
                <p>
                  만약 전세금 반환을 받지 못했다면 ① 시·군청 부동산과에 전세 사기 신고 → ② 경찰(사기 고소) → ③ 법원(임차보증금 회수 소송) →
                  ④ HUG 가입했다면 HUG 청구. 단, 사후 대처는 건물주 자산이 이미 사라진 경우가 많아 회수가 어렵습니다. 따라서 계약 前 안전
                  검증이 가장 중요합니다.
                </p>
              </section>

              <h2 className="text-2xl font-bold mb-6">자주 묻는 질문</h2>
              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h3 className="text-lg font-semibold text-text-primary">관련 계산기</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link
                    href="/calculator/rent-conversion"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">전월세전환 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">월세와 전세의 환산 비율을 쉽게 비교하세요.</p>
                  </Link>
                  <Link
                    href="/calculator/acquisition-tax"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">취득세 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">전세 전환 시 취득세 예상액을 미리 계산해보세요.</p>
                  </Link>
                  <Link
                    href="/calculator/loan"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">전세대출 이자 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">부족한 보증금을 대출로 채울 시 이자를 계산하세요.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="mb-2 text-sm text-text-tertiary">
                  <strong>법적 근거:</strong> 주택임대차보호법 §3 (대항력) · §3의2 (우선변제권) · §3의3 (임차권등기명령) · §8 (소액보증금 최우선변제) · 주택임대차보호법 시행령 §10 · 민법 §621 (임대차 등기).
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 교육 목적으로 작성되었으며, 법적 조언이 아닙니다. 전세 계약 관련 법적 문제는 법무사 또는
                  변호사와 상담하세요. 본 콘텐츠는 {DATE_MODIFIED}을 기준으로 작성되었으며, 법규 변경 시 즉시 업데이트됩니다.
                </p>
              </section>

              <ShareButtons
                title="전세 보증금 안전 가이드"
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
