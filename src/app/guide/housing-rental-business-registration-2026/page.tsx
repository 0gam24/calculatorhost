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

const URL = 'https://calculatorhost.com/guide/housing-rental-business-registration-2026/';
const DATE_PUBLISHED = '2026-08-02';
const DATE_MODIFIED = '2026-08-02';

export const metadata: Metadata = {
  title: '주택임대사업자 등록 2026, 혜택·의무·자동말소 총정리',
  description:
    '주택임대사업자로 등록하면 종부세 합산배제·양도세 특례를 받지만 10년 임대의무와 5% 증액제한을 어기면 감면이 추징됩니다. 등록 요건, 세제혜택, 자동말소까지 민간임대주택법 기준으로 정리했습니다.',
  keywords: [
    '주택임대사업자 등록',
    '임대사업자 혜택',
    '종부세 합산배제',
    '임대사업자 자동말소',
    '임대의무기간',
    '임대료 5% 증액제한',
    '민간임대주택법 43조',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '주택임대사업자 등록 2026, 혜택·의무·자동말소 총정리' }],
    title: '주택임대사업자 등록 2026: 혜택·의무·자동말소 완전 정리',
    description: '아파트 신규 등록 불가, 비아파트 장기 10년만 가능. 종부세 합산배제·양도세 특례 요건, 5% 증액제한, 자동말소까지 한 번에 정리.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '주택임대사업자 등록 2026: 혜택·의무·자동말소',
    description: '10년 임대의무·5% 증액제한을 어기면 감면 추징. 아파트는 신규 등록 불가. 민간임대주택법 §5·§43·§44 기준.',
  },
};

const FAQ_ITEMS = [
  {
    question: '지금 아파트로 임대사업자 등록할 수 있나요?',
    answer:
      '아파트 신규 등록은 불가능합니다. 2020년 7·10 대책 이후 아파트 유형은 폐지되어 다세대·다가구·연립·오피스텔 등 비아파트만 장기일반민간임대(10년)로 등록할 수 있습니다(민간임대주택법 §5). 기존에 등록된 아파트는 남은 의무기간까지 유지되지만, 의무기간 종료 시 자동말소됩니다.',
  },
  {
    question: '4년 단기 임대사업자 유형이 폐지되었나요?',
    answer:
      '2020년 7·10 대책으로 폐지되었습니다. 4년 단기와 8년 장기 유형 모두 신규 등록이 중단됐고, 기존 등록분은 의무기간 종료 시 자동말소됩니다. 현재 신규로 등록할 수 있는 유형은 비아파트 장기일반민간임대주택(10년)뿐입니다.',
  },
  {
    question: '임대료 5% 증액 제한은 어떤 기준인가요?',
    answer:
      '직전 임대차 계약 임대료의 5% 이내여야 합니다(민간임대주택법 §44). 또한 직전 임대차 계약이나 약정한 임대료 증액이 있은 후 1년 이내에는 다시 증액할 수 없습니다. 위반 시 3천만원 이하 과태료가 부과되고, 그동안 받은 세제혜택이 추징될 수 있습니다.',
  },
  {
    question: '자동말소되면 그동안 감면받은 세금을 다시 내야 하나요?',
    answer:
      '자동말소는 원칙적으로 추징 대상이 아닙니다. 4년 단기·8년 장기 유형이 의무기간을 정상 종료해 자동말소되면 그동안 받은 감면은 추징되지 않습니다. 다만 말소 이후 종부세 합산배제·양도세 특례는 더 이상 적용되지 않으므로, 이듬해부터 보유세가 크게 늘 수 있습니다.',
  },
  {
    question: '등록하면 어떤 세제혜택이 있나요?',
    answer:
      '종부세 합산배제, 재산세 감면, 양도세 특례가 대표적입니다. 등록임대주택은 종합부동산세 과세표준 계산 시 합산에서 제외될 수 있으며(종부세법 §8③, 시행령 §3), 조세특례제한법 §97의3·§97의5에 따른 장기보유특별공제 특례를 요건 충족 시 적용받을 수 있습니다. 요건은 매년 개정될 수 있으므로 등록 전 확인이 필요합니다.',
  },
  {
    question: '임대사업자 등록은 어디서 하나요?',
    answer:
      '렌트홈(www.renthome.go.kr) 온라인 신청이 기본입니다. 또는 주택 소재지 관할 시·군·구청 임대차 담당 부서에 방문 신청할 수 있습니다. 지자체 등록증이 나온 뒤 관할 세무서에서 사업자등록을 별도로 해야 세제혜택 신청 요건이 갖춰집니다.',
  },
  {
    question: '10년 임대 의무 기간 중 매도할 수 있나요?',
    answer:
      '원칙적으로 매도할 수 없습니다. 10년 임대의무 중 자진 매도하면 감면 추징과 최대 3천만원 과태료 대상이 될 수 있습니다(민간임대주택법 §43·§67). 다만 다른 등록 임대사업자에게 임대의무를 승계해 양도하거나, 파산·강제경매 등 부득이한 사유는 예외로 인정될 수 있습니다.',
  },
  {
    question: '임대소득이 있으면 무조건 등록해야 하나요?',
    answer:
      '등록은 의무가 아닌 선택입니다. 다만 등록하면 종부세 합산배제·재산세 감면·양도세 특례 등 혜택이 크지만, 10년 임대의무와 5% 증액제한이라는 강한 의무를 감수해야 합니다. 다주택자로서 장기 임대 계획이 확실할 때 검토하는 것이 안전합니다.',
  },
];

export default function HousingRentalBusinessRegistration2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '주택임대사업자 등록 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '주택임대사업자 등록 2026: 혜택·의무·자동말소 완전 정리',
    description:
      '주택임대사업자 등록의 혜택과 의무, 자동말소·자진말소 시 세금 처리까지 민간임대주택법 §5·§43·§44 기준으로 정리한 가이드.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['주택임대사업자', '종부세 합산배제', '임대의무기간', '5% 증액제한', '자동말소', '민간임대주택법'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '주택임대사업자 등록 2026',
    description:
      '2026년 기준 주택임대사업자 등록 요건, 세제혜택, 임대의무, 자동말소·자진말소 처리 가이드.',
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
                    { name: '주택임대사업자 등록 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">세금·부동산 · 8분 읽기 · 2026-08-02</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  주택임대사업자 등록 2026
                  <br />
                  <span className="text-2xl text-text-secondary">혜택·의무·자동말소 총정리</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  주택임대사업자로 등록하면 종부세 합산배제와 양도세 특례 같은 실질 감면 혜택을 받을 수 있지만, 10년이라는 긴 임대의무와 5% 증액제한을 어기면 그동안의 감면이 추징될 수 있습니다. 이 가이드는 2020년 7·10 대책 이후 바뀐 등록 가능 유형, 대표 세제혜택, 사업자로서의 의무, 자동말소·자진말소 시 세금 처리, 등록 절차까지 민간임대주택법과 세법 기준으로 순서대로 정리합니다.
                </p>
              </header>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">주택임대사업자란 무엇이고 누가 등록하나</h2>
                <p>
                  주택임대사업자는 1호 이상의 주택을 임대할 목적으로 지방자치단체에 등록한 자를 말합니다(민간임대주택법 §5). 여기서 말하는 등록은 세무서에 하는 사업자등록과는 별개로, 주택 소재지 지자체에 임대사업자 등록을 하고 임대주택으로 임대주택 유형·임대기간·임대료를 신고하는 절차입니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">정의 한 문장</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    주택임대사업자란, 민간임대주택법 §5에 따라 지자체에 임대주택으로 등록하고 임대기간·임대료 규제를 지키는 대신 세제혜택을 받는 사업자를 말합니다.
                  </p>
                </div>
                <p className="mt-4">
                  주로 다주택자, 임대 목적의 오피스텔·다세대·다가구 소유자, 은퇴 후 장기 임대소득 계획이 있는 자산가가 등록을 검토합니다. 특히 종부세 합산배제와 양도세 특례는 자산 규모가 큰 다주택자에게 실질적인 절세 효과가 크지만, 그만큼 10년이라는 임대의무가 뒤따릅니다.
                </p>
                <p className="mt-4">
                  다만 등록 이후에는 임대료 증액 상한, 임대기간 유지, 표준임대차계약서 사용 등 여러 의무가 발생하고, 위반 시 감면이 추징될 수 있으므로 단순히 세제혜택만 보고 결정하기에는 신중해야 합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">지금 등록 가능한 유형은?</h2>
                <p>
                  결론부터 말하면, 신규 등록은 비아파트 장기일반민간임대주택(10년)만 가능합니다. 2020년 7·10 대책으로 아파트 유형과 단기(4년)·장기(8년) 유형이 폐지되었기 때문입니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 주택임대사업자 등록 가능 유형 (2026 기준, 민간임대주택법 §5)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">유형</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">주택 종류</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">신규 등록</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">임대의무</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">장기일반민간임대</td>
                        <td className="p-3">비아파트(다세대·다가구·연립·오피스텔 등)</td>
                        <td className="p-3"><strong>가능</strong></td>
                        <td className="p-3">10년</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">장기일반민간임대</td>
                        <td className="p-3">아파트</td>
                        <td className="p-3">불가</td>
                        <td className="p-3">기존만 잔여 의무기간</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">단기민간임대(4년)</td>
                        <td className="p-3">전 유형</td>
                        <td className="p-3">불가</td>
                        <td className="p-3">기존 종료 시 자동말소</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">장기민간임대(구 8년)</td>
                        <td className="p-3">전 유형</td>
                        <td className="p-3">불가</td>
                        <td className="p-3">기존 종료 시 자동말소</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  즉 지금 새로 등록한다면 비아파트에 한해 최소 10년 이상 임대 계획이 확실할 때만 검토할 수 있습니다. 오피스텔은 주거용으로 임대차 신고가 이뤄져야 주택임대주택으로 인정되며, 업무용 오피스텔은 대상이 아닙니다.
                </p>
                <p className="mt-4">
                  다만 기존에 등록된 아파트나 4년 단기·8년 장기 유형은 남은 의무기간 동안 유지되며, 의무기간이 끝나면 자동으로 등록이 말소됩니다(민간임대주택법 §6). 이 자동말소 조항이 이후 세제혜택 종료의 트리거가 되므로 뒤에서 자세히 설명합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">등록하면 받는 세제혜택은?</h2>
                <p>
                  대표 혜택은 종합부동산세 합산배제, 재산세 감면, 양도소득세 특례, 임대소득 분리과세 우대입니다. 다만 각 혜택마다 요건이 다르고, 특히 양도세 특례는 조세특례제한법의 일몰·개정에 민감하므로 반드시 국세청 또는 세무사 확인이 필요합니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 2. 주택임대사업자 대표 세제혜택 요약</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">세목</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">혜택 개요</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">근거</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">종합부동산세</td>
                        <td className="p-3">등록임대주택은 과세표준 합산에서 제외 가능</td>
                        <td className="p-3">종부세법 §8③, 시행령 §3</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">재산세</td>
                        <td className="p-3">면적·유형별 감면(25~100%)</td>
                        <td className="p-3">지방세특례제한법</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">양도소득세</td>
                        <td className="p-3">장기보유특별공제·감면 특례(요건 충족 시)</td>
                        <td className="p-3">조특법 §97의3·§97의5</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">임대소득</td>
                        <td className="p-3">2,000만원 이하 분리과세 시 필요경비율·기본공제 우대</td>
                        <td className="p-3">소득세법</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례. 3주택자의 종부세 합산배제 절감 (가정 시나리오)</p>
                  <p className="text-sm text-text-secondary">
                    · 보유: 거주용 아파트 1채(공시가 8억) + 임대용 다세대 2채(공시가 각 4억)
                    <br />
                    · 등록 전: 3주택 합산 공시가 16억 기준으로 종부세 계산 대상 진입
                    <br />
                    · 등록 후(임대 2채 합산배제 요건 충족 가정): 종부세 계산에서 임대주택 8억 제외 → 남은 8억은 1세대1주택 공제(12억) 이하로 종부세 미과세 구간
                    <br />
                    <span className="text-xs text-text-tertiary">주의: 실제 종부세는 공정시장가액비율·과세표준·중과세율 등이 얽혀 있으며, 합산배제 요건(임대료 상한 준수·의무기간 유지 등)을 충족해야 합니다. 위 수치는 이해를 돕기 위한 가정입니다.</span>
                  </p>
                </div>
                <p className="mt-4">
                  다만 양도세 특례는 조특법 개정과 일몰 조항에 따라 매년 요건이 달라지므로, "등록만 하면 감면"으로 단정하기 어렵습니다. 특히 2018~2020년 사이 등록 유형·시점에 따라 혜택 폭이 크게 달라졌기 때문에, 현재 신규 등록 시에는 반드시 최신 조특법과 국세청 지침을 확인하고 조건부로 접근해야 합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">임대사업자의 의무는?</h2>
                <p>
                  등록의 대가로 사업자에게는 크게 4가지 의무가 부과됩니다: 임대의무기간 유지, 임대료 증액 제한, 표준임대차계약서 사용, 임대차 계약 신고입니다.
                </p>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li>
                    <strong>10년 임대의무(민간임대주택법 §43):</strong> 장기일반민간임대주택은 등록일로부터 10년 이상 임대해야 합니다. 이 기간 중 자진 말소하거나 매도하면 감면 추징 대상이 될 수 있습니다.
                  </li>
                  <li>
                    <strong>임대료 5% 증액제한(§44):</strong> 직전 임대차 계약 임대료 대비 5% 이내에서만 증액할 수 있으며, 직전 임대차 계약 또는 임대료 증액이 있은 후 1년 이내에는 다시 증액할 수 없습니다.
                  </li>
                  <li>
                    <strong>표준임대차계약서 사용:</strong> 지자체가 정한 표준 서식을 사용해야 하며, 임대료·임대기간·부속 조항을 임의로 변경할 수 없습니다.
                  </li>
                  <li>
                    <strong>임대차 계약 신고:</strong> 임대차 계약을 체결하거나 변경한 경우 렌트홈 또는 지자체에 신고해야 합니다. 미신고 시 과태료 대상입니다.
                  </li>
                </ul>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례. 임대료 8% 인상(5% 초과) 시</p>
                  <p className="text-sm text-text-secondary">
                    · 기존 임대료 월 100만원 → 갱신 시 108만원으로 인상 시도
                    <br />
                    · 5% 초과분(3만원) 반환 청구 대상
                    <br />
                    · 위반 사업자에게 3천만원 이하 과태료(민간임대주택법 §67)
                    <br />
                    · 등록 취소 및 그동안 받은 감면 추징 가능성
                  </p>
                </div>
                <p className="mt-4">
                  다만 임차인의 자발적 합의가 있더라도 5% 상한은 강행규정에 가깝게 운영되며, 초과분은 임차인이 사후에 반환을 청구할 수 있습니다. "합의했으니 괜찮다"는 관행적 판단은 위험합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">자동말소·자진말소는 무엇이고 세금은 어떻게 되나</h2>
                <p>
                  자동말소는 4년 단기와 8년 장기 유형이 의무기간을 정상 종료해 지자체가 직권으로 등록을 말소하는 것입니다. 자진말소는 사업자가 의무기간 도중 임차인 동의 등 요건을 갖춰 스스로 말소를 신청하는 것입니다.
                </p>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li>
                    <strong>자동말소:</strong> 감면 추징 없음. 다만 말소 이후로는 종부세 합산배제·양도세 특례가 종료되어 이듬해부터 보유세가 늘어날 수 있습니다.
                  </li>
                  <li>
                    <strong>자진말소:</strong> 임차인 동의 및 최소 임대기간 요건을 충족한 경우 가능. 요건을 위반한 자진말소는 감면 추징과 과태료 대상이 될 수 있습니다.
                  </li>
                  <li>
                    <strong>임대의무 위반에 의한 등록말소:</strong> 5% 증액제한 위반, 임대의무기간 도중 매도 등이 확인되면 지자체가 직권 말소하고 감면을 추징할 수 있습니다.
                  </li>
                </ul>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례. 8년 장기 임대사업자의 자동말소</p>
                  <p className="text-sm text-text-secondary">
                    · 2015년에 8년 장기(폐지 전)로 등록한 다세대 1채
                    <br />
                    · 2023년 임대의무기간 종료 시점에 자동말소
                    <br />
                    · 그동안 받은 재산세·종부세 감면은 추징되지 않음
                    <br />
                    · 다만 2024년부터는 종부세 합산배제 종료 → 다른 보유 주택과 합산 과세되어 실효세율 상승 가능
                    <br />
                    <span className="text-xs text-text-tertiary">주의: 자동말소 이후 매도 시 양도세 특례 적용 여부는 매도 시점·요건에 따라 달라지므로 국세청 확인이 필수입니다.</span>
                  </p>
                </div>
                <p className="mt-4">
                  다만 자동말소 후 매도 시 조특법 §97의3·§97의5의 양도세 특례를 계속 받을 수 있는지는 등록 시점·유형·매도 시점·5년 이내 매도 여부 등에 따라 달라집니다. 자동말소만으로 모든 혜택이 유지된다고 단정할 수 없으므로 개별 사안별 검토가 필요합니다.
                </p>
              </section>

              <section className="space-y-6 border-t border-border-base pt-8" data-speakable>
                <h2 className="text-2xl font-bold">등록 vs 미등록 손익 비교</h2>
                <p>
                  다주택자 관점에서 등록과 미등록의 차이를 항목별로 정리하면 다음과 같습니다. 이는 단순 비교이며, 개인의 자산 구성과 임대 계획에 따라 결론이 달라질 수 있습니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 3. 등록 임대사업자 vs 미등록 임대인 비교(2026 기준)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">항목</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">등록(장기일반 10년)</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">미등록</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">종부세 합산</td>
                        <td className="p-3">요건 충족 시 합산배제</td>
                        <td className="p-3">전면 합산 과세</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">재산세</td>
                        <td className="p-3">감면(25~100%)</td>
                        <td className="p-3">일반세율</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">양도세</td>
                        <td className="p-3">특례 적용 여지(요건 필수)</td>
                        <td className="p-3">일반 다주택 중과 가능</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">임대기간 유연성</td>
                        <td className="p-3">10년 의무</td>
                        <td className="p-3">자유</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">임대료 인상</td>
                        <td className="p-3">연 5% 상한, 1년 이내 재증액 금지</td>
                        <td className="p-3">주택임대차보호법 한도 내 자유</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">매도 가능성</td>
                        <td className="p-3">의무기간 중 사실상 제한</td>
                        <td className="p-3">자유</td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">위반 시</td>
                        <td className="p-3">감면 추징+과태료</td>
                        <td className="p-3">해당 없음</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  즉 등록은 "장기 임대를 확정한 다주택자의 절세 도구"이지, 단기 시세차익을 노리는 임대인에게는 부적합합니다. 매도 계획이 유동적이라면 등록 이후 자진말소 요건 위반으로 오히려 추징 리스크가 커질 수 있습니다.
                </p>
                <p className="mt-4">
                  다만 다주택 매도 계획이 없고 노후 임대소득 위주로 자산을 운용하려는 경우, 종부세 합산배제 하나만으로도 수백만원 이상의 절감 효과가 나올 수 있으므로 등록 검토 가치가 큽니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">등록 절차는 어떻게 되나</h2>
                <p>
                  등록은 렌트홈(www.renthome.go.kr) 온라인 신청과 관할 지자체 방문 신청 두 가지 방법이 있습니다. 최근에는 대부분 렌트홈에서 처리하는 것이 편리합니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">1단계. 임대사업자 등록 신청(지자체)</p>
                  <p className="text-sm text-text-secondary">
                    렌트홈 로그인 후 "임대사업자 등록"에서 주택 유형·주소·임대주택 유형(장기일반 10년)·임대기간 등을 입력합니다. 등기부등본, 매매계약서 등 소유 증빙이 필요합니다.
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">2단계. 지자체 심사·등록증 발급</p>
                  <p className="text-sm text-text-secondary">
                    관할 시·군·구청에서 서류 검토 후 등록증을 발급합니다. 통상 2주 이내지만 지자체 상황에 따라 다를 수 있습니다. 아파트는 반려됩니다.
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">3단계. 세무서 사업자등록</p>
                  <p className="text-sm text-text-secondary">
                    관할 세무서에서 주택임대사업자로 사업자등록을 별도로 해야 합니다. 홈택스에서 온라인 신청이 가능하며, 이 절차 없이는 세제혜택 신청 요건이 갖춰지지 않습니다.
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">4단계. 임대차 계약 신고</p>
                  <p className="text-sm text-text-secondary">
                    임대차 계약을 체결하거나 변경할 때마다 렌트홈에 신고합니다. 표준임대차계약서를 사용하고, 임대료 5% 상한을 준수해야 합니다.
                  </p>
                </div>
                <p className="mt-4">
                  다만 등록 이후에는 임대차 계약을 체결하거나 변경할 때마다 신고 의무가 발생하고, 감가상각·임대소득 신고 등 세무 부담도 늘어납니다. 등록 전 세무사 상담을 거치는 것을 권장합니다.
                </p>
              </section>

              <h2 className="text-2xl font-bold mb-6">자주 묻는 질문</h2>
              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h3 className="text-lg font-semibold text-text-primary">관련 계산기 및 가이드</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link
                    href="/calculator/comprehensive-property-tax/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">종합부동산세 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">합산배제 요건 충족 전후 종부세 부담을 직접 시뮬해보세요.</p>
                  </Link>
                  <Link
                    href="/guide/comprehensive-real-estate-tax-who-pays-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">종부세 납세의무자 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">누가 종부세를 내는지, 다주택자 판정 기준을 확인하세요.</p>
                  </Link>
                  <Link
                    href="/guide/housing-rental-income-separate-taxation/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">주택임대소득 분리과세</div>
                    <p className="mt-1 text-sm text-text-secondary">2,000만원 이하 임대소득 분리과세 우대 조건을 알아보세요.</p>
                  </Link>
                  <Link
                    href="/guide/deemed-rental-income-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">간주임대료 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">보증금에 부과되는 간주임대료 계산 원리를 정리했습니다.</p>
                  </Link>
                  <Link
                    href="/guide/multi-house-acquisition-tax-heavy-8-12-percent-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">다주택 취득세 중과 8·12%</div>
                    <p className="mt-1 text-sm text-text-secondary">임대주택 추가 취득 시 중과세율 적용 여부를 확인하세요.</p>
                  </Link>
                  <Link
                    href="/category/real-estate/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">부동산 계산기 모음</div>
                    <p className="mt-1 text-sm text-text-secondary">양도세·취득세·재산세·종부세 등 부동산 계산기 전체.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 교육 목적으로 작성되었으며, 개인 맞춤형 세무·법률 조언이 아닙니다. 실제 등록 가능 여부, 세제혜택 요건, 자동말소 이후 양도세 특례 적용 여부, 임대료 증액 위반 판단은 관할 지자체·렌트홈·관할 세무서 또는 세무사 상담을 통해 확인하세요. 특히 조세특례제한법의 임대사업자 관련 조항은 개정과 일몰이 빈번하므로, 등록 결정 전 최신 개정 상황을 반드시 재확인해야 합니다. 본 콘텐츠는 2026-08-02를 기준으로 작성되었으며, 관계 법령 개정 시 즉시 업데이트됩니다. 인용 법조항: <strong>민간임대주택에 관한 특별법 §5(등록)·§6(말소)·§43(임대의무기간)·§44(임대료 증액제한), 종합부동산세법 §8③·시행령 §3(합산배제), 조세특례제한법 §97의3·§97의5(양도세 특례)</strong>. AI 보조 작성 후 운영자 검수 완료.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터</a>,{' '}
                  <a href="https://www.renthome.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">렌트홈(임대주택 등록시스템)</a>,{' '}
                  <a href="https://www.nts.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">국세청</a>.
                </p>
              </section>

              <ShareButtons
                title="주택임대사업자 등록 2026 가이드"
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