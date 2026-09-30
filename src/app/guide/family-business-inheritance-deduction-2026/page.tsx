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

const URL = 'https://calculatorhost.com/guide/family-business-inheritance-deduction-2026/';
const DATE_PUBLISHED = '2026-07-11';
const DATE_MODIFIED = '2026-09-30';

export const metadata: Metadata = {
  title: '가업상속공제 2026, 최대 600억 공제 요건·사후관리 5년',
  description:
    '중소·중견기업 가업 승계 시 상속세 공제. 영위기간별 공제한도(300/400/600억), 10년 경영 요건, 사후관리 5년 고용·자산 유지 기준. 상증법 §18의2 기준.',
  keywords: [
    '가업상속공제',
    '상속세 공제',
    '가업승계',
    '중소기업 상속',
    '상증법 18조의2',
    '600억 공제',
    '상속세 절세',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [
      {
        url: '/og-default.png',
        width: 1200,
        height: 630,
        alt: '가업상속공제 2026, 최대 600억 공제',
      },
    ],
    title: '가업상속공제 2026 | 상속세 최대 600억 공제 완전 가이드',
    description:
      '중소·중견기업 가업 상속 시 영위기간별 300/400/600억 공제. 요건 및 사후관리 5년 고용·자산 유지 기준.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '가업상속공제 2026 | 최대 600억 상속세 공제',
    description: '영위기간 30년 이상 시 600억원 공제. 요건·사후관리 5년 완전 정리.',
  },
};

const FAQ_ITEMS = [
  {
    question: '가업상속공제가 정확히 무엇인가요?',
    answer:
      '상증법 §18의2에 따라 적격 가업상속재산가액을 경영기간별 한도 안에서 공제하는 제도입니다. 예를 들어 공제 대상 가업상속재산이 100억원이면 최대 한도가 600억원이어도 600억원을 차감할 수는 없습니다.',
  },
  {
    question: '공제 한도가 정확히 얼마인가요?',
    answer:
      '피상속인의 계속 경영기간에 따라 10년 이상 20년 미만 300억원, 20년 이상 30년 미만 400억원, 30년 이상 600억원입니다. 한도는 실제 적격 가업상속재산가액과 다른 적용 요건을 충족한 범위에서 사용합니다.',
  },
  {
    question: '어떤 기업이 가업상속공제 대상인가요?',
    answer:
      '피상속인이 10년 이상 계속 경영한 법령상 중소기업 또는 적격 중견기업이 기본 대상입니다. 중견기업은 직전 3개 과세기간·사업연도의 평균 매출액 5천억원 이상 기업이 제외됩니다. 업종·지분·대표이사 재직과 상속인의 요건은 시행령에 따라 별도로 확인해야 합니다.',
  },
  {
    question: '가업상속공제 받은 후 5년 내 사업을 팔면 어떻게 되나요?',
    answer:
      '정당한 사유 없이 가업용 자산 40% 이상 처분, 가업 미종사, 상속 지분 감소 등 추징 사유가 생길 수 있습니다. 모든 경우 공제액 전액을 같은 방식으로 회수하는 것은 아니며, 경과기간·처분비율·예외와 이자상당액을 반영합니다.',
  },
  {
    question: '사후관리 5년 동안 유지해야 할 조건이 뭔가요?',
    answer:
      '가업용 자산 처분, 가업 종사, 상속 지분 감소와 고용·총급여를 확인합니다. 고용 관련 요건은 5년 전체 평균 정규직 수와 총급여가 각각 직전 2개 과세기간·사업연도 평균의 90%에 모두 미달하는 경우입니다. 둘 중 하나만 미달해도 곧바로 같은 추징 사유가 된다고 해석하지 마세요.',
  },
  {
    question: '사후관리 5년 만료 후 자유롭게 처분할 수 있나요?',
    answer:
      '5년 사후관리 규정과 기간 중 발생한 추징 사유를 확인해야 합니다. 기간이 지났더라도 처분에 따른 다른 세금·신고 의무까지 없어지는 것은 아닙니다.',
  },
  {
    question: '가업상속공제와 상속세 탈세는 다르죠?',
    answer:
      '네, 완전히 다릅니다. 가업상속공제는 법으로 정한 정당한 절세 수단입니다. 그러나 과세 대상 재산을 숨기거나 거짓 서류로 조작하면 탈세로 적발되어 과태료·형사처벌을 받을 수 있습니다. 공제 요건·사후관리도 엄격히 검증되므로, 정확한 신고와 투명한 경영 기록 유지가 필수입니다.',
  },
  {
    question: '가업상속공제 말고 다른 상속세 절세 방법도 있나요?',
    answer:
      '가업승계 증여세 과세특례는 조세특례제한법 §30의6에 규정되어 있습니다. 상속세에는 배우자 상속공제와 그 밖의 인적공제 등이 있지만, 각각의 요건과 전체 공제한도를 따로 확인해야 합니다. 임의로 주식 평가액을 낮추는 것은 공제 제도가 아닙니다.',
  },
];

export default function FamilyBusinessInheritanceDeduction2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '가업상속공제 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '가업상속공제 2026, 최대 600억 공제 요건과 사후관리 5년 완전 가이드',
    description:
      '중소·중견기업 가업 상속 시 영위기간별 300/400/600억 공제. 상속세 계산, 요건 체크, 5년 사후관리(고용·자산·업종 유지). 상증법 §18의2 기준.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['가업상속공제', '상속세', '가업승계', '중소기업 상속', '상증법 18조의2'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '가업상속공제 2026',
    description:
      '중소·중견기업 가업 상속 시 최대 600억원 상속세 공제. 요건과 5년 사후관리 완전 정리.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
  });
  const faqLd = buildFaqPageJsonLd([...FAQ_ITEMS]);
  const speakableLd = buildSpeakableJsonLd(['[data-speakable]']);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableLd) }}
      />

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
                    { name: '가업상속공제 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">
                  중소기업 경영진 · 10분 읽기 · 2026-07-11
                </p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  가업상속공제 2026
                  <br />
                  <span className="text-2xl text-text-secondary">
                    최대 600억원 상속세 공제, 요건과 사후관리 완벽 정리
                  </span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  중소·중견기업 경영진이라면, 사업을 자녀에게 물려줄 때 상속세가 얼마나 무거운
                  부담인지 알고 있을 것입니다. 기업 자산이 크면 상속세로 수십억원을 내야 하는 상황도
                  발생합니다. 하지만 정부는 가업상속공제라는 제도를 통해 이런 부담을 크게 줄여주고
                  있습니다. 이 가이드는 공제 한도, 적격 기업 기준, 상속인 자격, 그리고 핵심인 5년
                  사후관리 조건까지 완전히 정리해드립니다.
                </p>
              </header>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">가업상속공제란 무엇인가</h2>
                <p>
                  상속세 및 증여세법 §18의2에 따른 가업상속공제는 중소·중견기업의 경영진이 10년 이상
                  직접 경영한 사업을 자녀 등 후계자에게 물려줄 때, 일정 금액을 상속세 과세 대상에서
                  제외해주는 제도입니다. 간단히 말해, 상속세를 계산하기 전에 공제 대상 금액을 먼저
                  빼주는 것입니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">가업상속공제의 기본 원리</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    상속세 계산식: (총 유산 가액 - 공제액 - 상속인별 기초공제) × 세율
                    <br />
                    예: 총 유산 100억원, 가업상속공제 300억원 대상
                    <br />
                    → 과세대상 = min(100억, 100억 - 300억) = 0원
                    <br />
                    → 상속세 = 0원(또는 크게 감소)
                    <br />
                    <span className="text-xs text-text-tertiary">
                      결론: 공제 대상이 실제 자산을 초과할 수 있어, 중소기업의 세부담을 획기적으로
                      줄임.
                    </span>
                  </p>
                </div>
                <p className="mt-4">
                  다만 이 혜택은 무조건 주어지는 것이 아닙니다. 기업 규모, 경영 기간, 상속인 자격,
                  그리고 무엇보다 상속 후 5년간의 사후관리 요건을 모두 충족해야만 받을 수 있습니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">영위기간별 공제 한도 (상증법 §18의2)</h2>
                <p>
                  가업상속공제 한도는 피상속인이 가업을 경영한 기간에 따라 달라집니다. 오래
                  경영할수록 더 큰 공제를 받을 수 있도록 설계됐습니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse text-sm">
                    <caption className="mb-2 text-left text-xs text-text-secondary">
                      표 1. 가업상속공제 한도액 (상증법 §18의2, 2026 기준)
                    </caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="bg-bg-card p-3 text-left font-semibold">
                          피상속인 경영 기간
                        </th>
                        <th scope="col" className="bg-bg-card p-3 text-left font-semibold">
                          공제 한도
                        </th>
                        <th scope="col" className="bg-bg-card p-3 text-left font-semibold">
                          의미
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">10년 이상 20년 미만</td>
                        <td className="p-3">
                          <strong>300억원</strong>
                        </td>
                        <td className="p-3">기본 공제</td>
                      </tr>
                      <tr className="bg-bg-card/50 border-b border-border-base">
                        <td className="p-3">20년 이상 30년 미만</td>
                        <td className="p-3">
                          <strong>400억원</strong>
                        </td>
                        <td className="p-3">20년 이상 경영</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">30년 이상</td>
                        <td className="p-3">
                          <strong>600억원</strong>
                        </td>
                        <td className="p-3">최대 공제</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  공제 한도는 피상속인의 최대주주 지분 취득 연도부터 상속개시 전일까지의 기간으로
                  계산합니다. 따라서 30년 이상 경영 사업자는 최대 600억원까지 공제받을 수 있습니다.
                </p>
                <p className="mt-4">
                  다만 공제 대상 자산이 공제 한도를 초과할 수 없습니다. 예를 들어 기업 자산이
                  500억원인데 공제 한도가 600억원이면, 500억원만 공제됩니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">가업상속공제 적용 요건 확인</h2>
                <p>
                  상증법 §18의2의 기본 요건은 피상속인의 10년 이상 계속 경영과 법령상 적격
                  중소·중견기업입니다. 중견기업은 직전 3개 과세기간·사업연도의 평균 매출액 5천억원
                  이상 기업이 제외됩니다.
                </p>
                <p>
                  업종·지분·대표이사 재직 기간과 상속인의 나이·가업 종사·취임 등 세부 요건은
                  시행령에 따라 함께 확인합니다. 한 가지 지분율이나 취임 여부만으로 공제 적용을
                  확정하지 마세요.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">상속 후 5년 사후관리 조건</h2>
                <p>
                  상증법 §18의2 제5항은 정당한 사유 없는 가업용 자산 40% 이상 처분, 가업 미종사,
                  상속 지분 감소 등을 추징 사유로 규정합니다. 지분을 90%만 남기면 항상 안전하다는
                  기준은 아닙니다.
                </p>
                <p>
                  고용 관련 판단은 5년 전체 평균 정규직 수와 총급여가 각각 직전 2개
                  과세기간·사업연도 평균의 90%에 모두 미달하는지 확인합니다. 자산 처분비율 계산과
                  업종 변경·지분 감소의 예외는 시행령에 따라 별도 판단합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">추징액을 한도 전체로 단정하지 마세요</h2>
                <p>
                  추징 시 과세가액에 다시 산입하는 금액은 실제 공제액에 경과기간별 율을 적용하며,
                  자산 처분의 경우 처분비율도 반영합니다. 정당한 사유·예외와 이자상당액을 함께
                  검토해야 하므로 최대 한도 600억원에 임의 세율을 곱한 금액을 실제 추징세액으로
                  안내할 수 없습니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">가업상속공제 받기 위한 실무 절차</h2>
                <p>공제를 받으려면 상속세 신고할 때 여러 서류를 함께 제출해야 합니다.</p>
                <ul className="ml-6 list-disc space-y-3 text-text-secondary">
                  <li>
                    <strong>상속세 신고:</strong> 상속개시일부터 6개월 내에 관할 세무서에 신고
                    (가업상속공제 신청 의사 명시)
                  </li>
                  <li>
                    <strong>기업 관련 서류:</strong> 사업자 등록증, 결산 재무제표(최근 5년), 매출
                    기록, 최대주주 증명, 재산세 과세 현황
                  </li>
                  <li>
                    <strong>상속인 증명:</strong> 가족관계증명서, 상속인의 이력서, 임원 취임 증명서
                  </li>
                  <li>
                    <strong>공제 대상 자산:</strong> 가업에 직결된 부동산, 기계 장비, 주식 등 목록
                  </li>
                  <li>
                    <strong>기타:</strong> 상속인의 5년 사후관리 약정서(국세청 양식)
                  </li>
                </ul>
                <p className="mt-4">
                  다만 서류가 복잡하고 요건도 까다로우므로, 반드시 세무사나 변호사와 함께 진행하는
                  것이 안전합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">가업상속공제와 다른 상속세 절세 제도의 조합</h2>
                <p>
                  가업상속공제 외에도 여러 절세 제도가 있습니다. 이들을 조합하면 상속세 부담을 더
                  줄일 수 있습니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse text-sm">
                    <caption className="mb-2 text-left text-xs text-text-secondary">
                      표 2. 주요 상속세 절세 제도 비교
                    </caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="bg-bg-card p-3 text-left font-semibold">
                          제도명
                        </th>
                        <th scope="col" className="bg-bg-card p-3 text-left font-semibold">
                          대상
                        </th>
                        <th scope="col" className="bg-bg-card p-3 text-left font-semibold">
                          효과
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">가업상속공제</td>
                        <td className="p-3">10년 이상 경영 중소기업</td>
                        <td className="p-3">300~600억 공제</td>
                      </tr>
                      <tr className="bg-bg-card/50 border-b border-border-base">
                        <td className="p-3">가업승계 증여특례(조세특례제한법 §30의6)</td>
                        <td className="p-3">가업 상속 전 미리 증여</td>
                        <td className="p-3">10억원 공제 후 10%, 과세표준 120억원 초과분 20%</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">배우자 상속세 공제</td>
                        <td className="p-3">배우자 상속분</td>
                        <td className="p-3">
                          기본 5억원, 실제 상속액·법정상속분 한도 적용, 최대 30억원
                        </td>
                      </tr>
                      <tr className="bg-bg-card/50 border-b border-border-base">
                        <td className="p-3">자녀 공제한도</td>
                        <td className="p-3">각 상속인</td>
                        <td className="p-3">자녀 1인당 5천만원(다른 공제와 중복·한도 확인)</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">비상장주식 평가</td>
                        <td className="p-3">비상장주식 상속</td>
                        <td className="p-3">법정 평가방법 적용, 임의 감액 불가</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  여러 제도를 조합하면 상속세를 획기적으로 줄일 수 있습니다. 예를 들어 가업상속공제
                  + 배우자 공제 + 자녀 공제를 함께 사용하면 효과가 극대화됩니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">2026년 가업상속공제의 변화와 전망</h2>
                <p>
                  정부는 2026년 가업상속공제 제도를 대폭 개편할 예정입니다. 최신 상황을 정리하면
                  다음과 같습니다.
                </p>
                <ul className="ml-6 list-disc space-y-3 text-text-secondary">
                  <li>
                    <strong>공제 한도 인상 논의:</strong> 현재 600억원 최대 한도를 더 인상할
                    가능성이 검토 중입니다. 특히 중견기업과 영농법인에 대한 확대 적용이 논의
                    중입니다.
                  </li>
                  <li>
                    <strong>사후관리 완화:</strong> 5년의 사후관리 조건 중 일부를 완화하거나, 경영난
                    상황에서 신청 절차를 간소화하는 방안이 진행 중입니다.
                  </li>
                  <li>
                    <strong>조세 정책 변화:</strong> 상속세 최고세율이 50%에서 인상될 가능성도
                    있으므로, 공제 제도의 중요성이 더욱 높아질 것으로 예상됩니다.
                  </li>
                </ul>
                <p className="mt-4">
                  다만 세법은 수시로 개정되므로, 정확한 최신 정보는 국세청(nts.go.kr) 또는 세무
                  전문가 상담이 필수입니다.
                </p>
              </section>

              <h2 className="mb-6 text-2xl font-bold">자주 묻는 질문</h2>
              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h3 className="text-lg font-semibold text-text-primary">관련 계산기 및 가이드</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link
                    href="/calculator/inheritance-tax/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 transition hover:border-primary-500 hover:bg-primary-500/5"
                  >
                    <div className="font-semibold text-primary-500">상속세 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">
                      상속 자산을 입력하여 예상 상속세액을 계산해보세요.
                    </p>
                  </Link>
                  <Link
                    href="/guide/inheritance-tax-calculation-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 transition hover:border-primary-500 hover:bg-primary-500/5"
                  >
                    <div className="font-semibold text-primary-500">상속세 계산법 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">
                      세율, 공제한도, 누진세 완전 정리.
                    </p>
                  </Link>
                  <Link
                    href="/guide/inheritance-tax-deduction-limit-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 transition hover:border-primary-500 hover:bg-primary-500/5"
                  >
                    <div className="font-semibold text-primary-500">상속세 공제한도 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">
                      배우자·자녀 공제, 기초공제, 특례 적용 기준.
                    </p>
                  </Link>
                  <Link
                    href="/guide/inheritance-vs-gift-tax-comparison-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 transition hover:border-primary-500 hover:bg-primary-500/5"
                  >
                    <div className="font-semibold text-primary-500">상속세 vs 증여세 비교</div>
                    <p className="mt-1 text-sm text-text-secondary">
                      어느 것이 더 유리한가, 전략적 선택 가이드.
                    </p>
                  </Link>
                  <Link
                    href="/category/tax/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 transition hover:border-primary-500 hover:bg-primary-500/5"
                  >
                    <div className="font-semibold text-primary-500">모든 세금 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">
                      양도세, 취득세, 종부세, 증여세 모음.
                    </p>
                  </Link>
                  <Link
                    href="/guide/family-business-registration-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 transition hover:border-primary-500 hover:bg-primary-500/5"
                  >
                    <div className="font-semibold text-primary-500">중소기업 상속 등기 절차</div>
                    <p className="mt-1 text-sm text-text-secondary">
                      가업 승계 시 법인 대표 변경, 주식 이전 등록.
                    </p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 교육 목적으로 작성되었으며, 개인 맞춤형
                  세무 또는 법적 조언이 아닙니다. 가업상속공제 대상 여부, 공제 한도, 5년 사후관리
                  기준, 최종 상속세액은 관할 세무서 또는 국세청(nts.go.kr)에서 반드시 확인하세요.
                  특히 기업 규모, 경영 기간, 상속인 자격, 사후관리 조건이 복잡할 수 있으므로, 반드시
                  세무사나 변호사 상담이 필수입니다. 본 콘텐츠는 2026-07-11을 기준으로 작성되었으며,
                  상속세 및 증여세법 개정 시 즉시 업데이트됩니다. 가업상속공제의 정확한 기준은
                  법조항 <strong>상속세 및 증여세법 §18의2</strong>를 따릅니다. AI 보조 작성 후
                  운영자 검수 완료.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료:</strong>{' '}
                  <a
                    href="https://www.nts.go.kr/"
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="text-primary-500 underline"
                  >
                    국세청 공식 사이트
                  </a>
                  ,{' '}
                  <a
                    href="https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?mi=40344&cntntsId=238919"
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="text-primary-500 underline"
                  >
                    국세청 가업승계 지원제도 안내
                  </a>
                  ,{' '}
                  <a
                    href="https://www.law.go.kr/법령/상속세및증여세법/제18조의2"
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="text-primary-500 underline"
                  >
                    법제처 국가법령정보센터
                  </a>
                  .
                </p>
              </section>

              <ShareButtons title="가업상속공제 2026 완전 가이드" url={URL} />
            </article>
          </main>
        </div>
        <Footer />
      </div>
    </>
  );
}
