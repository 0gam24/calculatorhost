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

const URL = 'https://calculatorhost.com/guide/company-housing-nontaxable-2026/';
const DATE_PUBLISHED = '2026-08-14';
const DATE_MODIFIED = '2026-08-14';

export const metadata: Metadata = {
  title: '사택 제공 세금 2026, 회사 집 공짜로 받으면 근로소득?',
  description:
    '회사가 무상·저가로 제공한 사택은 종업원과 주주 아닌 임원이라면 근로소득으로 과세하지 않습니다. 다만 지배주주 임원이거나 회사 명의 계약이 아니면 과세될 수 있습니다. 사택 비과세 조건을 소득세법 §12·시행령 §38 기준으로 정리했습니다.',
  keywords: [
    '사택 근로소득',
    '사택 비과세',
    '회사 사택 세금',
    '사택 제공 이익',
    '임원 사택 과세',
    '사택 조건',
    '소득세법 시행령 38조',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '사택 제공 세금 2026, 회사 집 공짜로 받으면 근로소득?' }],
    title: '사택 제공 세금 2026, 회사 집 공짜로 받으면 근로소득?',
    description: '종업원·주주 아닌 임원 사택은 비과세, 지배주주 임원은 과세. 사택 인정 조건과 과세 기준 완전 정리.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '사택 제공 세금 2026, 회사 집 공짜로 받으면 근로소득?',
    description: '회사가 준 사택, 언제 비과세고 언제 과세되는지 조건을 정리.',
  },
};

const FAQ_ITEMS = [
  {
    question: '회사가 제공한 사택, 세금을 내나요?',
    answer:
      '원칙적으로 비과세입니다. 종업원이나 주주가 아닌 임원이 일정 요건의 사택을 무상·저가로 제공받는 경우, 그 이익은 근로소득으로 보지 않습니다(소득세법 시행령 §38). 즉 대부분의 일반 직원은 사택을 받아도 별도 세금을 내지 않습니다.',
  },
  {
    question: '누가 비과세 대상인가요?',
    answer:
      '주주 또는 출자자가 아닌 임원, 소액주주인 임원(발행주식 총수의 1% 미만을 소유하고 지배주주의 특수관계인이 아닌 자), 임원이 아닌 종업원, 국가·지방자치단체로부터 근로소득을 받는 자가 비과세 대상입니다. 반대로 지분이 큰 지배주주 임원은 제외됩니다.',
  },
  {
    question: '사택으로 인정되는 조건은 무엇인가요?',
    answer:
      '사택은 회사가 소유한 주택을 종업원 등에게 무상·저가로 제공하거나, 회사가 직접 임차해 무상으로 제공하는 주택을 말합니다. 핵심은 임차 사택의 경우 반드시 회사(사용자) 명의로 임대차 계약을 체결해야 사택으로 인정된다는 점입니다.',
  },
  {
    question: '내가 직접 계약하고 회사가 월세를 지원하면 어떻게 되나요?',
    answer:
      '그 경우는 사택이 아닙니다. 근로자 본인 명의로 계약하고 회사가 임차료를 대신 내주거나 보조하면, 이는 사택 제공이 아니라 임차료 보조로 보아 근로소득으로 과세되는 것이 원칙입니다. 비과세를 받으려면 계약 명의가 회사여야 합니다.',
  },
  {
    question: '임원이나 대주주는 왜 과세되나요?',
    answer:
      '회사를 지배하는 주주 임원이 사택을 받으면 사실상 회사 재산을 사적으로 이용하는 성격이 강해, 이를 근로소득으로 과세합니다. 다만 발행주식의 1% 미만을 가진 소액주주 임원으로서 지배주주의 특수관계인이 아니면 종업원과 같이 비과세 대상이 될 수 있습니다.',
  },
  {
    question: '사택 제공 이익은 어떻게 계산하나요?',
    answer:
      '과세되는 경우, 회사가 부담한 임차료나 시가 임대료 상당액을 근로소득에 더합니다. 예를 들어 회사가 월 100만원짜리 주택을 무상 제공하고 과세 대상이라면 연 1,200만원 상당이 근로소득에 가산됩니다. 비과세 대상이면 이 금액을 더하지 않습니다.',
  },
  {
    question: '사택을 제공하는 회사(사업주)는 어떻게 처리하나요?',
    answer:
      '회사가 부담한 사택 임차료나 관리비는 업무 관련 복리후생 성격의 비용으로 처리하는 것이 일반적입니다. 다만 대상자가 지배주주 임원이면 손금 인정이 제한되거나 근로소득 과세가 따르므로, 법인세·원천세 처리는 세무대리인의 확인이 필요합니다.',
  },
  {
    question: '주택자금을 저리로 빌려주면 사택과 같나요?',
    answer:
      '아니요, 다릅니다. 사택은 주택 자체를 제공하는 것이고, 주택구입·임차자금을 무상·저리로 대여하는 것은 별개의 항목입니다. 종업원에 대한 주택자금 대여 이익의 과세 여부는 대상과 요건이 사택과 다르게 규정되므로 구분해서 판단해야 합니다.',
  },
];

export default function CompanyHousingNontaxable2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '사택 제공 세금 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '사택 제공 세금 2026, 회사 집 공짜로 받으면 근로소득?',
    description:
      '회사 사택의 근로소득 비과세 요건, 비과세 대상(종업원·주주 아닌 임원·소액주주 임원)과 과세 대상(지배주주 임원), 사택 인정 조건, 계산 방법을 소득세법 §12·시행령 §38로 정리.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['사택', '비과세 근로소득', '임원 사택', '소액주주', '복리후생'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '사택 제공 세금 2026',
    description:
      '회사 사택이 근로소득으로 과세되는지 아닌지를 가르는 조건과 대상 정리.',
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
                    { name: '사택 제공 세금 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">직장인·사업주 · 8분 읽기 · 2026-08-14</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  사택 제공 세금 2026
                  <br />
                  <span className="text-2xl text-text-secondary">· 회사 집 공짜로 받으면 근로소득?</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  회사가 기숙사나 사택을 무상으로 내주면 그만큼 이익이니 세금을 내야 하는지 궁금해하는 직장인이 많습니다. 반대로 직원에게 집을 지원하려는 사업주는 어떻게 해야 세금 문제가 없는지 고민합니다. 결론부터 말하면 일반 종업원이 받는 사택은 원칙적으로 비과세지만, 계약 명의와 지위에 따라 과세로 갈릴 수 있습니다. 이 글은 사택 비과세의 조건과 예외를 소득세법 기준으로 정리해, 받는 직원과 제공하는 회사가 모두 판단할 수 있게 돕습니다.
                </p>
              </header>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">회사 사택, 세금을 내나요?</h2>
                <p>
                  원칙은 비과세입니다. 소득세법은 근로소득 범위를 정하면서, 일정 요건의 사택을 제공받는 이익은 근로소득으로 보지 않도록 하고 있습니다(소득세법 §12 비과세소득, 시행령 §38). 따라서 대부분의 일반 직원은 사택을 받아도 그 자체로 세금을 내지 않습니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">30초 요약</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    · 비과세 대상: 종업원, 주주 아닌 임원, <strong>소액주주(1% 미만) 임원</strong>
                    <br />
                    · 과세 대상: 지분이 큰 <strong>지배주주 임원</strong>
                    <br />
                    · 사택 인정: 회사 소유 주택, 또는 <strong>회사 명의</strong> 임차 주택
                    <br />
                    · 본인 명의 계약 + 회사 임차료 지원 = 사택 아님(과세)
                  </p>
                </div>
                <p>
                  다만 비과세의 핵심은 두 가지입니다. 받는 사람이 지배주주 임원이 아닐 것, 그리고 임차 사택이라면 계약 명의가 회사일 것. 이 두 조건이 갈림길입니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">누가 비과세 대상인가요?</h2>
                <p>
                  비과세 대상은 지위와 지분으로 나뉩니다. 아래 표로 정리합니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 사택 제공 이익의 과세 여부 (소득세법 시행령 §38)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">대상</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">과세 여부</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">임원이 아닌 종업원</td>
                        <td className="p-3">비과세</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">주주·출자자가 아닌 임원</td>
                        <td className="p-3">비과세</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">소액주주(1% 미만) 임원</td>
                        <td className="p-3">비과세</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">지배주주 임원(1% 이상 등)</td>
                        <td className="p-3">과세</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p>
                  다만 소액주주 판정은 지배주주의 특수관계인이 아닐 것을 함께 요구합니다. 가족이 대주주인 회사의 임원이라면 소액주주로 인정되지 않을 수 있으니 주의하세요.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">사택으로 인정되는 조건은?</h2>
                <p>
                  같은 지원이라도 형태에 따라 사택이 되기도, 안 되기도 합니다. 결정적 기준은 계약 명의입니다.
                </p>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li><strong>회사 소유 주택 제공:</strong> 회사가 보유한 주택을 무상·저가로 내주면 사택으로 인정</li>
                  <li><strong>회사 명의 임차 후 제공:</strong> 회사가 직접 임대차 계약을 맺고 무상 제공하면 사택으로 인정</li>
                  <li><strong>본인 명의 계약 + 임차료 보조:</strong> 근로자 본인이 계약하고 회사가 월세를 지원하면 사택이 아니라 임차료 보조로 과세</li>
                </ul>
                <p>
                  예외: 근무지와 주거의 거리, 사택 규모 등 세부 요건은 사안마다 다를 수 있으므로, 회사가 사택 제도를 운영할 때는 계약 명의와 규정을 미리 세무 검토하는 것이 안전합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">과세되면 얼마가 더해질까 (사례)</h2>
                <p>
                  같은 사택이라도 대상에 따라 세금이 갈립니다. 월 100만원짜리 주택을 회사가 무상 제공한다고 가정하고 세 사례를 봅니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 1. 일반 종업원 (비과세)</p>
                  <p className="text-sm text-text-secondary">
                    · 회사 명의로 임차한 주택을 무상 제공
                    <br />
                    · 근로소득 가산액: <strong>0원</strong> (비과세)
                    <br />
                    <span className="text-xs text-text-tertiary">연 1,200만원 상당 이익이 있어도 과세되지 않습니다.</span>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 2. 소액주주 임원 (비과세)</p>
                  <p className="text-sm text-text-secondary">
                    · 발행주식 1% 미만 보유, 지배주주 특수관계인 아님
                    <br />
                    · 근로소득 가산액: <strong>0원</strong> (종업원과 동일 취급)
                    <br />
                    <span className="text-xs text-text-tertiary">소액주주 요건을 충족하면 임원도 비과세.</span>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 3. 지배주주 임원 (과세)</p>
                  <p className="text-sm text-text-secondary">
                    · 지분이 큰 대표이사 등 지배주주 임원
                    <br />
                    · 근로소득 가산액: 월 100만원 × 12 = <strong>연 1,200만원 상당</strong>
                    <br />
                    <span className="text-xs text-text-tertiary">가산된 근로소득에 본인의 세율이 적용되어 세부담이 늘어납니다.</span>
                  </p>
                </div>
              </section>

              <section className="space-y-6 border-t border-border-base pt-8">
                <h2 className="text-2xl font-bold">사택을 제공하는 회사(사업주)의 처리</h2>
                <p>
                  사업주 입장에서 사택은 복리후생 제도이자 세무 이슈입니다. 대상이 누구냐에 따라 처리가 달라집니다.
                </p>
                <p>
                  일반 종업원에게 제공하는 사택 임차료·관리비는 업무 관련 복리후생 성격의 비용으로 처리하는 것이 일반적입니다. 반면 지배주주 임원에게 제공하면 손금 인정이 제한되거나 그 임원에게 근로소득 과세가 따를 수 있습니다.
                </p>
                <p>
                  다만 법인세 손금 처리, 원천세 신고, 부당행위계산 부인 등은 개별 사안에 따라 결론이 달라지므로, 사택 규정을 만들 때 세무대리인의 검토를 받는 것이 안전합니다.
                </p>
              </section>

              <h2 className="text-2xl font-bold mb-6">자주 묻는 질문</h2>
              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h3 className="text-lg font-semibold text-text-primary">관련 계산기 및 가이드</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link
                    href="/guide/non-taxable-salary-allowances-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">비과세 급여 항목 정리</div>
                    <p className="mt-1 text-sm text-text-secondary">식대·보육수당 등 세금 안 떼는 항목 총정리.</p>
                  </Link>
                  <Link
                    href="/calculator/salary/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">연봉 실수령액 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">비과세·과세 항목을 반영한 실수령액 계산.</p>
                  </Link>
                  <Link
                    href="/guide/welfare-points-taxation-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">복지포인트 과세</div>
                    <p className="mt-1 text-sm text-text-secondary">복지포인트가 근로소득인지 확인하세요.</p>
                  </Link>
                  <Link
                    href="/guide/chuseok-bonus-tax-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">추석 상여금 세금</div>
                    <p className="mt-1 text-sm text-text-secondary">상여·명절 선물의 근로소득 과세.</p>
                  </Link>
                  <Link
                    href="/guide/year-end-tax-settlement/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">연말정산 완벽 가이드</div>
                    <p className="mt-1 text-sm text-text-secondary">근로소득 공제와 정산의 기본.</p>
                  </Link>
                  <Link
                    href="/category/work/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">근로·급여 가이드 모음</div>
                    <p className="mt-1 text-sm text-text-secondary">연봉·실수령·수당 관련 가이드 전체.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 교육 목적으로 작성되었으며, 개인 맞춤형 세무 조언이 아닙니다. 사택 비과세 대상 판정, 소액주주·지배주주 여부, 회사 명의 계약 요건, 법인세 손금·원천세 처리는 개별 사안에 따라 달라지므로 국세청 상담(126) 또는 세무대리인에게 반드시 확인하세요. 본 콘텐츠는 2026-08-14 기준으로 작성되었으며, 관련 법령 개정 시 즉시 업데이트됩니다. 인용한 법조항은 <strong>소득세법 §12(비과세소득), §20(근로소득), 소득세법 시행령 §38(비과세되는 근로소득의 범위)</strong>입니다. AI 보조 작성 후 운영자 검수 완료.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.nts.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">국세청</a>,{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터</a>,{' '}
                  <a href="https://www.hometax.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">국세청 홈택스</a>.
                </p>
              </section>

              <ShareButtons
                title="사택 제공 세금 2026 가이드"
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
