// [revenue-lever: indexing+traffic]
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

const URL = 'https://calculatorhost.com/guide/newborn-childbirth-acquisition-tax-reduction-2026/';
const DATE_PUBLISHED = '2026-08-02';
const DATE_MODIFIED = '2026-08-02';

export const metadata: Metadata = {
  title: '신생아 취득세 감면 2026, 500만원 면제 요건과 5년 규정',
  description:
    '자녀를 출산한 가구가 12억원 이하 1주택을 취득하면 취득세를 500만원 한도로 100% 면제받습니다. 출산일부터 5년 규정, 3개월 전입·3년 거주 요건, 추징 사유를 지방세특례제한법 기준으로 정리했습니다.',
  keywords: [
    '신생아 취득세 감면',
    '출산 취득세 감면',
    '취득세 500만원 면제',
    '출산 양육 주택',
    '지방세특례제한법 36조의5',
    '자녀 출산 취득세',
    '12억 이하 1주택',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '신생아 취득세 감면 2026, 500만원 면제 요건과 5년 규정' }],
    title: '신생아 취득세 감면 2026 : 출산 가구 500만원 취득세 면제 가이드',
    description: '출산일부터 5년 이내 12억원 이하 1주택 취득 시 취득세 500만원 한도 전액 면제. 요건, 사후관리, 추징 사유까지 지방세특례제한법 §36의5 기준.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '신생아 취득세 감면 2026 : 500만원 면제 요건과 5년 규정',
    description: '출산 가구가 12억원 이하 1주택 취득 시 취득세 500만원까지 면제. 지방세특례제한법 §36의5 기준 정리.',
  },
};

const FAQ_ITEMS = [
  {
    question: '신생아 취득세 감면은 정확히 어떤 제도인가요?',
    answer:
      '자녀를 출산한 부모가 출산일부터 5년 이내에 상시 거주 목적으로 12억원 이하의 1주택을 취득하면, 산출된 취득세를 500만원 한도로 면제해 주는 제도입니다(지방세특례제한법 §36의5). 산출세액이 500만원 이하이면 전액 면제되고, 500만원을 초과하면 산출세액에서 500만원을 공제한 잔액만 납부합니다. 미혼모·미혼부도 대상에 포함됩니다.',
  },
  {
    question: '500만원 한도가 무슨 의미인가요?',
    answer:
      '취득세 감면 금액의 상한이 500만원이라는 뜻입니다. 예를 들어 산출세액이 400만원이면 전액 면제되어 취득세는 0원이 되고, 산출세액이 700만원이면 500만원만 공제되어 200만원을 납부해야 합니다. 즉 이 감면은 산출세액 500만원까지의 구간에서 가장 큰 절세 효과를 발휘합니다.',
  },
  {
    question: '취득가 12억원을 초과하면 감면을 받을 수 있나요?',
    answer:
      '받을 수 없습니다. 지방세특례제한법 §36의5는 "취득 당시 가액 12억원 이하"의 1주택만을 감면 대상으로 규정하고 있습니다. 취득가 12억원을 초과하면 1원이라도 초과되는 순간 감면 자체가 배제되므로, 매매가 협상 단계에서 12억원 경계를 반드시 확인해야 합니다. 정확한 취득 당시 가액 판단은 관할 시·군·구청 세정과에서 확인하세요.',
  },
  {
    question: '출산일부터 5년은 어떻게 계산하나요?',
    answer:
      '자녀의 출생신고서 기준 출산일을 기산일로 하여, 그날부터 5년 이내에 주택을 취득하면 대상이 됩니다. 조문상 출산일 전 1년 이내에 취득한 주택도 감면 대상에 포함되므로, 자녀 출산 직전에 매매한 신혼집도 대상이 될 수 있습니다. 다만 정확한 기간 계산과 신청 시점은 관할청 확인이 필요합니다.',
  },
  {
    question: '이 감면과 생애최초 취득세 감면을 중복으로 받을 수 있나요?',
    answer:
      '동일 주택에 대해 두 감면을 동시에 적용받을 수는 없는 것이 일반적입니다. 두 제도 중 자신에게 더 유리한 하나를 선택해야 하는 경우가 많으며, 실제 중복 여부는 취득 시점, 세대주 지위, 종전 주택 보유 이력에 따라 달라집니다. 신청 전에 반드시 관할 시·군·구청 세정과에 두 감면 병용 가능성을 문의하세요.',
  },
  {
    question: '감면을 받은 뒤 추징되는 경우는 무엇인가요?',
    answer:
      '취득 후 정해진 기간 내에 자녀와 함께 상시 거주(전입신고)하지 않거나, 실거주 유지 기간을 채우지 못하고 매각·임대할 때 감면세액이 추징됩니다. 즉 감면은 실제 양육 목적 거주를 전제로 하므로, 취득 후 곧바로 임대를 놓거나 다른 주소지에 거주하면 감면 취소와 함께 가산세가 부과될 수 있습니다. 정확한 전입 기한과 거주 유지 기간은 지방세특례제한법 시행령과 위택스에서 확인하세요.',
  },
  {
    question: '미혼모·미혼부도 신청할 수 있나요?',
    answer:
      '가능합니다. 지방세특례제한법 §36의5는 자녀를 출산한 부모의 범위에 미혼모와 미혼부를 명시적으로 포함하고 있습니다. 다만 가족관계등록부상 자녀 출생 사실이 확인되어야 하며, 자녀와 함께 해당 주택에 상시 거주해야 한다는 요건은 동일하게 적용됩니다.',
  },
  {
    question: '감면 신청은 어떻게 하나요?',
    answer:
      '취득세 신고 시 감면신청서를 함께 제출합니다. 소유권이전등기 신청 전 60일 이내에 관할 시·군·구청 세정과에 방문하거나 위택스(wetax.go.kr)로 신고할 수 있으며, 가족관계증명서, 주민등록등본, 매매계약서, 감면신청서 등이 필요합니다. 감면을 신청하지 않고 취득세를 전액 납부한 경우에도 5년 이내라면 경정청구를 통해 환급을 신청할 수 있으니, 뒤늦게 알았더라도 즉시 관할청에 문의하세요.',
  },
];

export default function NewbornChildbirthAcquisitionTaxReduction2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '신생아 취득세 감면 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '신생아 취득세 감면 2026 : 500만원 면제 요건과 5년 규정',
    description:
      '자녀를 출산한 가구가 12억원 이하 1주택을 취득하면 취득세를 500만원 한도로 100% 면제. 출산일부터 5년 규정, 상시거주 요건, 추징 사유를 지방세특례제한법 §36의5 기준으로 정리.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['신생아 취득세 감면', '출산 취득세', '500만원 면제', '12억 이하 1주택', '지방세특례제한법 36조의5'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '신생아 취득세 감면 2026',
    description:
      '출산 가구가 12억원 이하 1주택을 취득할 때 취득세 500만원 한도 면제. 요건과 사후관리 규정 완전 정리.',
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
                    { name: '신생아 취득세 감면 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">세금·부동산 · 8분 읽기 · 2026-08-02</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  신생아 취득세 감면 2026
                  <br />
                  <span className="text-2xl text-text-secondary">: 500만원 면제 요건과 5년 규정</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  자녀를 출산한 가구가 상시 거주 목적으로 12억원 이하의 1주택을 취득하면, 지방세특례제한법 §36의5에 따라 취득세를 500만원 한도로 면제받을 수 있습니다. 산출세액이 500만원 이하이면 전액 면제이고, 그 이상이면 500만원을 공제한 잔액만 납부합니다. 이 가이드는 감면 요건, 출산일부터 5년의 기산법, 사후관리 위반 시 추징 사유, 신청 절차를 지방세특례제한법과 위택스 기준으로 정리합니다.
                </p>
              </header>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">Q. 신생아 취득세 감면이란 무엇인가요?</h2>
                <p>
                  신생아 취득세 감면은 출산 가구의 주거 안정을 지원하기 위한 지방세 감면 제도입니다. 자녀를 출산한 부모(미혼모·미혼부 포함)가 해당 자녀와 상시 거주할 목적으로 취득 당시 가액 12억원 이하의 1주택을 취득한 경우, 산출된 취득세를 500만원 한도로 감면합니다. 근거 법령은 지방세특례제한법 §36의5(출산·양육을 위한 주택 취득에 대한 취득세 감면)입니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">30초 요약 TL;DR</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    · 근거: 지방세특례제한법 §36의5
                    <br />
                    · 대상: 자녀를 출산한 부모(미혼모·미혼부 포함)의 1가구 1주택 취득
                    <br />
                    · 취득 시점: 출산일부터 5년 이내(출산일 전 1년 이내 취득도 포함)
                    <br />
                    · 주택 가액: 취득 당시 가액 12억원 이하
                    <br />
                    · 감면액: 산출세액 500만원까지 전액 면제, 초과분은 500만원 공제
                    <br />
                    · 조건: 취득 후 일정 기간 내 자녀와 상시 거주, 3년 이상 실거주 유지
                  </p>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 신생아 취득세 감면 핵심 요건 요약(지방세특례제한법 §36의5)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">항목</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">기준</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">비고</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">감면 대상자</td>
                        <td className="p-3">자녀를 출산한 부모</td>
                        <td className="p-3">미혼모·미혼부 포함</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">주택 가액</td>
                        <td className="p-3">취득 당시 가액 12억원 이하</td>
                        <td className="p-3">1원이라도 초과 시 감면 배제</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">보유 요건</td>
                        <td className="p-3">1가구 1주택</td>
                        <td className="p-3">다주택자 배제</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">취득 시점</td>
                        <td className="p-3">출산일부터 5년 이내</td>
                        <td className="p-3">출산일 전 1년 이내 취득도 포함</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">감면 한도</td>
                        <td className="p-3">500만원</td>
                        <td className="p-3">이하 전액 면제, 초과분 공제</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">사후관리</td>
                        <td className="p-3">전입·상시거주·3년 실거주</td>
                        <td className="p-3">위반 시 감면세액 추징</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  다만 이 제도는 순수한 양육 목적 실거주를 전제로 설계되었기 때문에, 취득 후 곧바로 임대를 놓거나 실제 거주하지 않으면 감면세액이 전액 추징됩니다. 취득 시점의 절세 효과만 보고 접근하기보다 3년 이상 거주 계획이 서 있는 가구에 적합합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">Q. 얼마나 감면받을 수 있나요?</h2>
                <p>
                  감면 한도는 500만원입니다. 즉 산출세액이 500만원 이하이면 전액 면제되어 취득세는 0원이 되고, 500만원을 초과하면 500만원만 공제되어 잔액을 납부합니다. 다만 감면 대상은 취득세 본세이며, 지방교육세와 농어촌특별세는 별도로 계산될 수 있으니 최종 납부액은 위택스에서 확인하는 것이 안전합니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 1. 취득가 4억원, 산출세액 400만원(전액 면제 구간)</p>
                  <p className="text-sm text-text-secondary">
                    · 취득 당시 가액: 4억원
                    <br />
                    · 산출 취득세액: 400만원(취득가 4억원 × 1% 가정)
                    <br />
                    · 감면 한도: 500만원
                    <br />
                    · 감면액: min(400만원, 500만원) = <strong>400만원</strong>
                    <br />
                    · 실제 납부 취득세: 400만원 − 400만원 = <strong>0원</strong>
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 산출세액이 500만원 이하이므로 취득세 본세는 전액 면제. 지방교육세·농특세는 별도.</span>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 2. 취득가 6억원, 산출세액 600만원(초과 구간)</p>
                  <p className="text-sm text-text-secondary">
                    · 취득 당시 가액: 6억원(1주택, 취득세율 1% 적용 구간)
                    <br />
                    · 산출 취득세액: 600만원(취득가 6억원 × 1%)
                    <br />
                    · 감면 한도: 500만원
                    <br />
                    · 감면액: min(600만원, 500만원) = <strong>500만원</strong>
                    <br />
                    · 실제 납부 취득세: 600만원 − 500만원 = <strong>100만원</strong>
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 500만원까지 공제되고 잔액 100만원 납부. 취득가 6억원 초과 9억원 이하는 세율이 1%에서 3%로 비례 상승해 산출세액이 커지므로 500만원 한도를 넘는 부분은 그대로 납부합니다.</span>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 3. 취득가 11.9억원 vs 12.1억원(12억 경계)</p>
                  <p className="text-sm text-text-secondary">
                    · 취득가 11.9억원: 감면 대상. 산출세액이 500만원 이하라면 전액 면제, 초과분만 납부.
                    <br />
                    · 취득가 12.1억원: 감면 <strong>배제</strong>. 12억원을 초과했으므로 §36의5 감면 자체가 적용되지 않음.
                    <br />
                    · 차이: 취득가 2천만원 차이로 최대 500만원의 감면이 사라짐. 계약가 협상 단계에서 12억원 경계는 반드시 확인.
                    <br />
                    <span className="text-xs text-text-tertiary">결론: 12억원은 절대 경계선. 등기 기준가·감정평가액·기준시가 등 어느 값이 "취득 당시 가액"으로 인정되는지 관할청 확인 필수.</span>
                  </p>
                </div>
                <p className="mt-4">
                  다만 취득세 산출세액은 취득가·주택 수·조정대상지역 여부·전용면적에 따라 크게 달라집니다. 정확한 산출액은 <Link href="/calculator/acquisition-tax/" className="text-primary-500 underline">취득세 계산기</Link>로 시뮬레이션한 뒤 감면 한도와 비교하세요.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">Q. 누가 감면을 받을 수 있나요?</h2>
                <p>
                  대상은 자녀를 출산한 부모입니다. 지방세특례제한법 §36의5는 법률혼 부부뿐 아니라 미혼모·미혼부도 명시적으로 포함하고 있으며, 가족관계등록부상 자녀 출생 사실이 확인되면 신청 자격이 발생합니다. 다만 아래 4가지 요건을 모두 충족해야 감면이 최종 확정됩니다.
                </p>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li>
                    <strong>자녀 출산 사실 확인:</strong> 가족관계등록부상 자녀의 출생 사실이 확인되어야 합니다. 태아 상태의 임신은 대상이 아니며, 출생신고가 완료된 이후에만 감면 신청이 가능합니다.
                  </li>
                  <li>
                    <strong>1가구 1주택 요건:</strong> 취득 시점을 기준으로 1가구가 1주택만 소유해야 합니다. 이미 다른 주택을 보유한 다주택자는 대상에서 제외됩니다. 세대주와 세대원의 주택 수를 합산하므로, 배우자 명의 주택이 있는 경우 미리 정리해야 합니다.
                  </li>
                  <li>
                    <strong>취득 당시 가액 12억원 이하:</strong> 매매가·감정평가액·기준시가 중 관할청이 인정하는 취득 당시 가액이 12억원을 초과하면 감면 자체가 배제됩니다. 12억원은 초과 여부만 판단하는 절대 경계선이므로, 계약 단계에서 확실히 확인해야 합니다.
                  </li>
                  <li>
                    <strong>상시 거주 목적:</strong> 취득 후 자녀와 함께 실제 거주할 목적이어야 합니다. 취득 직후 임대·매각 계획이 있거나, 다른 주소지에 실제 거주하는 경우 감면이 부인될 수 있습니다.
                  </li>
                </ul>
                <p className="mt-4">
                  예외: 조부모가 손자녀와 함께 거주하기 위해 취득하는 주택은 감면 대상이 아닙니다. §36의5는 어디까지나 자녀를 출산한 "부모"의 취득에 한정되므로, 조부모·삼촌 등 방계 친족 명의 취득은 다른 지방세 특례를 검토해야 합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">Q. 출산일부터 5년, 어떻게 계산하나요?</h2>
                <p>
                  기산일은 자녀의 출생신고서상 출산일입니다. 그날부터 5년 이내에 주택을 취득하면 감면 대상 기간을 충족합니다. 여기에 더해 지방세특례제한법 §36의5는 출산일 전 1년 이내에 취득한 주택도 대상에 포함하기 때문에, 실제 감면 가능 창(window)은 사실상 "출산일 전 1년 ~ 출산일 후 5년"의 6년 구간입니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 2. 출산일 기준 감면 가능 기간</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">취득 시점</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">감면 여부</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">비고</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">출산일 이전 1년 이내</td>
                        <td className="p-3"><strong>가능</strong></td>
                        <td className="p-3">출산 예정 전 신혼집 매매도 포함</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">출산일 이후 5년 이내</td>
                        <td className="p-3"><strong>가능</strong></td>
                        <td className="p-3">양육기 중 이사·확장 이주 포함</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">출산일 이전 1년 이전</td>
                        <td className="p-3">불가</td>
                        <td className="p-3">기산일 이전 취득은 대상 아님</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">출산일 이후 5년 초과</td>
                        <td className="p-3">불가</td>
                        <td className="p-3">기간 도과, 추후 취득분은 배제</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  예를 들어 2024년 6월에 자녀를 출산한 가구가 2026년 8월에 12억원 이하 1주택을 취득하면 출산일부터 약 2년 2개월 지난 시점이므로 감면 대상이 됩니다. 반대로 2019년에 자녀를 출산한 가구가 2026년에 주택을 취득하는 경우는 5년이 지났기 때문에 대상에서 벗어납니다.
                </p>
                <p className="mt-4">
                  다만 §36의5는 조문상 감면 대상 자녀의 출생기간에 별도 기한(예: 2025년 12월 31일까지 출산한 자녀)이 규정되어 있고 연장 개정이 논의·추진되어 왔습니다. 출산일부터 5년이라는 감면 기간이 있어 2024~2025년 출산 가구는 2029~2030년 취득까지도 대상이 되지만, 최신 적용기한과 연장 여부는 위택스·행정안전부·관할 시·군·구청에서 반드시 확인해야 합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">Q. 감면이 추징되는 경우는 언제인가요?</h2>
                <p>
                  이 감면은 자녀 양육을 위한 실거주가 핵심 전제입니다. 따라서 취득 후 상시 거주 의무를 이행하지 않으면 감면세액과 함께 가산세가 추징됩니다. 시행령상 세부 기한은 개정에 따라 변동될 수 있으나, 실무상 준수해야 할 사후관리 요건은 다음과 같습니다.
                </p>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li>
                    <strong>전입신고 지연:</strong> 취득일 또는 출산일 등 시행령이 정한 기산일부터 일정 기간 내에 해당 주택에 자녀와 함께 전입신고하지 않으면 감면세액이 추징됩니다. 실무상 3개월 이내 전입이 안전한 기준으로 알려져 있으나, 정확한 일수는 시행령 개정으로 달라질 수 있으니 위택스에서 반드시 확인하세요.
                  </li>
                  <li>
                    <strong>거주 유지 미충족:</strong> 취득 후 실제 거주 기간이 일정 기간(실무상 3년 이상 실거주가 기준으로 통용)에 미달한 상태에서 매각·임대·상속·증여로 처분하면 감면세액이 전액 추징됩니다.
                  </li>
                  <li>
                    <strong>실질 거주 부인:</strong> 형식상 전입신고만 하고 실제로는 다른 주소지에서 거주하는 경우, 국세기본법 §14의 실질과세 원칙에 따라 감면이 부인될 수 있습니다. 관할청은 전기·수도 사용량 등 실거주 정황을 종합적으로 판단합니다.
                  </li>
                  <li>
                    <strong>주택 수 변동:</strong> 감면을 받은 후 다른 주택을 추가로 취득하여 다주택 상태가 되면 감면 요건이었던 1가구 1주택 조건이 사후적으로 무너져 추징 사유가 될 수 있습니다.
                  </li>
                </ul>
                <p className="mt-4">
                  다만 부득이한 사유로 인한 처분(예: 근무지 이전에 따른 이사, 배우자 사망 등)은 시행령상 예외적으로 추징이 유예되거나 감면이 유지될 수 있습니다. 개인 사정에 해당 여부는 관할 시·군·구청 세정과에 서면 문의로 확인받는 것이 안전합니다.
                </p>
              </section>

              <section className="space-y-6 border-t border-border-base pt-8" data-speakable>
                <h2 className="text-2xl font-bold">Q. 생애최초·다자녀 감면과 무엇이 다른가요?</h2>
                <p>
                  취득세에는 신생아 감면 외에도 생애최초 취득세 감면, 다자녀 가구 감면 등 여러 특례가 있습니다. 각 제도는 대상, 한도, 요건이 다르므로 자신의 상황에 가장 유리한 제도를 선택해야 합니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 3. 취득세 감면 제도 비교</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">구분</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">신생아 감면 §36의5</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">생애최초 감면</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">다자녀 감면</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">대상자</td>
                        <td className="p-3">자녀 출산 부모</td>
                        <td className="p-3">생애 첫 주택 취득자</td>
                        <td className="p-3">18세 미만 자녀 3명 이상</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">주택 가액</td>
                        <td className="p-3">12억원 이하</td>
                        <td className="p-3">12억원 이하</td>
                        <td className="p-3">지자체 조례에 따라 상이</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">감면 한도</td>
                        <td className="p-3">500만원</td>
                        <td className="p-3">200만원</td>
                        <td className="p-3">지자체 조례에 따라 상이</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">거주 요건</td>
                        <td className="p-3">전입·3년 실거주</td>
                        <td className="p-3">3개월 전입·3년 거주</td>
                        <td className="p-3">실거주 요건 있음</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">중복 적용</td>
                        <td className="p-3">동일 주택 중복 원칙 불가</td>
                        <td className="p-3">동일 주택 중복 원칙 불가</td>
                        <td className="p-3">지자체별 상이</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  일반적으로 감면 한도가 큰 신생아 감면(500만원)이 생애최초 감면(200만원)보다 유리하지만, 자녀를 출산한 생애최초 취득자는 두 제도 중 하나만 선택해야 하는 경우가 많습니다. 실제 병용 가능 여부는 취득 시점의 세대 상황, 종전 주택 보유 이력, 지자체 조례에 따라 다르므로 관할청 확인이 필수입니다.
                </p>
                <p className="mt-4">
                  다만 부부 중 한 명이 생애최초 요건을 충족하지 못하더라도 자녀 출산 사실이 있으면 §36의5가 적용될 수 있습니다. 즉 생애최초에서 배제되었더라도 신생아 감면을 통해 절세 여지가 남아 있는 사례가 많습니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">Q. 신청은 어떻게 하나요?</h2>
                <p>
                  감면 신청은 취득세 신고와 동시에 진행하는 것이 원칙입니다. 소유권이전등기 신청 전 60일 이내에 관할 시·군·구청 세정과에 방문하거나 위택스(wetax.go.kr) 온라인으로 취득세 신고와 감면신청서를 함께 제출합니다.
                </p>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li>
                    <strong>필요 서류:</strong> 취득세 신고서, 감면신청서(§36의5 지정 서식), 매매계약서, 가족관계증명서(자녀 출생 사실 확인), 주민등록등본, 신분증. 관할 지자체에 따라 추가 서류가 요구될 수 있으니 사전에 세정과에 확인하세요.
                  </li>
                  <li>
                    <strong>신청 시점:</strong> 잔금 지급 후 60일 이내가 원칙이며, 이 기간을 넘기면 무신고 가산세가 부과될 수 있습니다. 감면을 놓치지 않으려면 등기 대행 법무사에게 감면 신청 대상임을 미리 알리는 것이 안전합니다.
                  </li>
                  <li>
                    <strong>사후 신청·경정청구:</strong> 감면 신청을 하지 않고 취득세를 전액 납부한 경우에도 5년 이내라면 경정청구를 통해 환급을 신청할 수 있습니다. 뒤늦게 감면 대상임을 알았다면 지체 없이 관할 세정과에 상담을 요청하세요.
                  </li>
                  <li>
                    <strong>위택스 온라인 신고:</strong> 위택스(wetax.go.kr) 회원가입 후 "취득세 신고" 메뉴에서 감면 유형을 선택하고 필요 서류를 스캔·업로드하면 온라인으로 처리할 수 있습니다. 접수 후 관할 세정과 담당자가 서류를 검토합니다.
                  </li>
                </ul>
                <p className="mt-4">
                  다만 감면 요건 충족 여부는 관할청의 서류 심사에서 최종 확정되므로, 신고를 마쳤다고 자동으로 감면이 확정된 것은 아닙니다. 심사 결과 요건 미비로 판단되면 감면세액과 함께 가산세가 부과될 수 있으니, 자녀 출생신고·전입신고·주택 소유 정보 등 기초 정보를 사전에 정확히 정리해두는 것이 좋습니다.
                </p>
              </section>

              <h2 className="text-2xl font-bold mb-6">자주 묻는 질문</h2>
              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h3 className="text-lg font-semibold text-text-primary">관련 계산기 및 가이드</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link
                    href="/calculator/acquisition-tax/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">취득세 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">취득가·주택 수·지역 조건으로 산출세액을 확인해 감면 한도와 비교하세요.</p>
                  </Link>
                  <Link
                    href="/guide/first-home-acquisition-tax-reduction-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">생애최초 취득세 감면 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">200만원 한도 감면 요건과 신생아 감면과의 병용 여부.</p>
                  </Link>
                  <Link
                    href="/guide/acquisition-tax-calculation-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">취득세 계산법 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">주택 취득세 세율표, 과세표준, 부가세목까지 기본기부터 정리.</p>
                  </Link>
                  <Link
                    href="/guide/gift-acquisition-tax-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">증여 취득세 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">증여로 주택을 취득할 때의 세율과 매매 취득세와의 차이.</p>
                  </Link>
                  <Link
                    href="/guide/marriage-childbirth-gift-deduction-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">혼인·출산 증여공제 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">자녀 결혼·출산 시 부모로부터 받는 증여의 1억원 공제 활용법.</p>
                  </Link>
                  <Link
                    href="/category/tax/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">모든 세금 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">양도세·취득세·재산세·상속세·증여세 모음.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 교육 목적으로 작성되었으며, 개인 맞춤형 세무 조언이 아닙니다. 실제 감면 대상 여부, 취득 당시 가액 판정, 사후관리 기한(전입 시점·거주 유지 기간)은 지방세특례제한법 시행령과 관할 시·군·구청 세정과의 최종 판단에 따릅니다. 특히 감면 대상 자녀의 출생기간에 대한 조문상 기한과 연장 여부는 개정 상황에 따라 달라지므로, 위택스(wetax.go.kr), 행정안전부, 관할청에서 반드시 최신 기준을 확인하세요. 본 콘텐츠는 2026-08-02을 기준으로 작성되었으며 관련 법령 개정 시 즉시 업데이트됩니다. 신생아 취득세 감면의 근거 법령은 <strong>지방세특례제한법 §36의5(출산·양육을 위한 주택 취득에 대한 취득세 감면)</strong>이며, 실질과세 원칙(국세기본법 §14) 또한 사후관리 판단에 적용됩니다. AI 보조 작성 후 운영자 검수 완료.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터(지방세특례제한법)</a>,{' '}
                  <a href="https://www.wetax.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">위택스(지방세 종합정보)</a>,{' '}
                  <a href="https://www.mois.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">행정안전부</a>.
                </p>
              </section>

              <ShareButtons
                title="신생아 취득세 감면 2026 가이드"
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