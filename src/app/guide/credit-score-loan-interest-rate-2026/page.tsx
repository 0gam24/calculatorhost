import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { Footer } from '@/components/layout/Footer';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { AdSlot } from '@/components/ads/AdSlot';
import { FaqSection } from '@/components/calculator/FaqSection';
import {
  buildBreadcrumbJsonLd,
  buildArticleJsonLd,
  buildWebPageJsonLd,
  buildFaqPageJsonLd,
  buildSpeakableJsonLd,
} from '@/lib/seo/jsonld';

const URL = 'https://calculatorhost.com/guide/credit-score-loan-interest-rate-2026/';
const DATE_PUBLISHED = '2026-06-27';
const DATE_MODIFIED = '2026-06-27';

export const metadata: Metadata = {
  title:
    '신용점수와 대출금리 2026 — 점수 올리는 법·금리 영향 총정리',
  description:
    '신용점수(NICE·KCB)가 대출 승인과 금리에 미치는 영향을 정리합니다. 점수를 올리는 구체적 방법, 무료 조회 방법, 점수 회복 기간을 상세 설명합니다.',
  keywords: [
    '신용점수',
    '신용점수 올리는 법',
    '대출금리 신용점수',
    'NICE KCB',
    '신용점수 조회',
    '신용도',
    '대출 승인',
    '신용 관리',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [
      {
        url: '/og-default.png',
        width: 1200,
        height: 630,
        alt: '신용점수와 대출금리 2026',
      },
    ],
    title: '신용점수와 대출금리 2026 — 점수 올리는 법',
    description:
      '신용점수가 대출 이자에 미치는 영향과 점수를 개선하는 구체적 방법.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '신용점수와 대출금리 2026',
    description: '신용점수를 올리고 대출 금리를 낮추는 방법.',
  },
};

const FAQ_ITEMS = [
  {
    question: '신용점수란 무엇인가요?',
    answer:
      '신용점수는 개인이 과거에 빚진 돈을 잘 갚았는지를 평가하는 숫자입니다. 1~1000점 범위에서, 점수가 높을수록 부도확률이 낮다고 평가됩니다. 한국에서는 NICE평가정보와 KCB(코리아크레딧뷰로)라는 두 신용평가사가 각각 점수를 부여합니다.',
  },
  {
    question: '신용등급(1~10등급)은 아직 사용되나요?',
    answer:
      '아니요. 2021년부터 한국의 신용평가 체계가 등급(1~10등급)에서 점수(1~1000점)로 전환되었습니다. 현재는 신용"점수"가 표준입니다. 점수가 높을수록 신용도가 우수합니다.',
  },
  {
    question: '신용점수는 어디서 무료로 확인하나요?',
    answer:
      '토스, 카카오페이, 뱅크샐러드 등 핀테크 앱에서 무료로 확인할 수 있습니다. 또한 NICE지키미(www.niceskr.co.kr), 올크레딧(allcredit.co.kr) 등 신용평가사 공식 사이트에서도 본인 무료조회가 가능합니다. 이런 조회는 신용점수에 영향을 주지 않습니다.',
  },
  {
    question: '신용점수가 낮으면 대출 신청이 거절되나요?',
    answer:
      '점수가 낮을수록 대출 신청이 거절되거나 금리가 높아질 가능성이 있습니다. 1금융권(은행)은 일반적으로 높은 점수를 요구하며, 낮은 점수는 2금융권이나 대출중개 플랫폼에서만 가능할 수 있습니다. 정확한 기준은 각 금융기관마다 다릅니다.',
  },
  {
    question: '연체했던 기록은 점수 회복에 얼마나 걸리나요?',
    answer:
      '완납 후 일반적으로 6개월~1년 정도 경과하면 점수가 서서히 회복됩니다. 다만 심각한 연체나 부도 이력은 더 오래 영향을 줄 수 있으며, 그 이후로도 신용정보는 5~10년 보관되어 거대 대출(예: 주택담보)에는 계속 영향을 미칠 수 있습니다.',
  },
  {
    question: '신용카드 사용률이 높으면 점수가 떨어지나요?',
    answer:
      '네. 신용카드 한도 대비 사용 비율(사용률)이 높을수록 신용점수가 낮아집니다. 일반적으로 사용률 30% 이하를 유지하는 것이 유리합니다. 같은 액수를 사용하더라도 여러 카드에 분산하는 것보다 한 카드에 집중하면 사용률이 높아져 점수에 불리합니다.',
  },
  {
    question: '휴대폰·공과금을 제때 내면 점수가 올라가나요?',
    answer:
      '네. 휴대폰비, 인터넷비, 전기·가스·수도료 등을 성실하게 납부하면 이런 비금융정보가 신용점수 산정에 긍정 신호로 작용합니다. 올크레딧(allcredit.co.kr) 같은 서비스에서 본인이 보유한 비금융정보를 등록할 수 있으며, 이는 점수 올리기에 도움이 됩니다.',
  },
];

export default function CreditScoreLoanInterestRate2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '신용점수와 대출금리 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '신용점수와 대출금리 2026',
    description:
      '신용점수(NICE·KCB)가 대출 승인과 금리에 미치는 영향을 정리합니다. 점수를 올리는 구체적 방법, 무료 조회 방법, 점수 회복 기간을 설명합니다.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: [
      '신용점수',
      '신용점수 올리는 법',
      '대출금리',
      'NICE',
      'KCB',
      '신용도',
    ],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '신용점수와 대출금리 2026 | calculatorhost',
    description:
      '신용점수가 대출 승인과 금리에 미치는 영향, 점수를 올리는 방법을 총정리합니다.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
  });
  const faqLd = buildFaqPageJsonLd(FAQ_ITEMS);
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
                    { name: '신용점수와 대출금리 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">
                  대출 준비자 · 9분 읽기 · 2026-06-27
                </p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  신용점수와 대출금리 2026
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  대출 신청 시 금리와 한도를 결정하는 가장 중요한 요소는 신용점수입니다. 신용점수가
                  높으면 저금리 대출이 가능하지만, 낮으면 고금리이거나 신청 자체가 거절될 수 있습니다.
                  이 가이드에서는 신용점수의 정의, 대출 금리에 미치는 영향, 그리고 점수를 올리는
                  구체적인 방법을 설명합니다. 또한 무료 조회 방법과 점수 회복 기간도 정리합니다.
                </p>
              </header>

              <AdSlot slot="guide-credit-score-loan-interest-rate-2026-top" format="horizontal" />

              <section aria-label="요약" className="card border-l-4 border-l-primary-500">
                <h2 className="mb-2 text-caption uppercase tracking-wider text-primary-500">
                  핵심 요약
                </h2>
                <table className="w-full border-collapse text-sm">
                  <caption className="mb-2 text-left font-semibold text-text-primary">
                    신용점수와 대출 금리의 관계
                  </caption>
                  <thead>
                    <tr className="border-b border-border-base">
                      <th scope="col" className="pb-2 pr-3 text-left font-semibold">
                        항목
                      </th>
                      <th scope="col" className="pb-2 text-left font-semibold">
                        설명
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-text-secondary">
                    <tr className="border-b border-border-base">
                      <td className="py-2 pr-3 font-semibold">신용평가사</td>
                      <td className="py-2">
                        NICE평가정보, KCB(코리아크레딧뷰로) 2개 기관
                      </td>
                    </tr>
                    <tr className="border-b border-border-base">
                      <td className="py-2 pr-3 font-semibold">점수 범위</td>
                      <td className="py-2">
                        1~1000점 (2021년부터 등급제 폐지)
                      </td>
                    </tr>
                    <tr className="border-b border-border-base">
                      <td className="py-2 pr-3 font-semibold">점수와 금리 관계</td>
                      <td className="py-2">
                        점수 높음 → 저금리 가능, 점수 낮음 → 고금리 또는 거절
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-3 font-semibold">영향 요인</td>
                      <td className="py-2">
                        연체 이력, 부채 수준, 신용거래 기간, 신용형태
                      </td>
                    </tr>
                  </tbody>
                </table>
              </section>

              <section className="space-y-4">
                <h2 className="border-b border-border-base pb-2 text-2xl font-bold">
                  신용점수란 무엇인가요?
                </h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  신용점수는 개인이 과거에 빌린 돈을 얼마나 성실하게 갚았는지를 평가하여 숫자로 나타낸
                  것입니다. 1~1000점의 범위에서 부여되며, 점수가 높을수록 채무 불이행 확률이 낮다고
                  평가됩니다.
                </p>
                <div className="rounded-lg bg-bg-raised p-4">
                  <p className="font-mono text-sm font-semibold text-text-primary">
                    신용점수 높음 (800~1000) ← 중간 (500~800) → 신용점수 낮음 (1~500)
                  </p>
                </div>
                <p className="text-text-secondary leading-relaxed">
                  한국에서 개인신용점수를 부여하는 기관은 NICE평가정보와 KCB(코리아크레딧뷰로) 두 곳입니다.
                  각 기관이 독립적으로 점수를 산정하므로, 두 점수가 약간 다를 수 있습니다.
                </p>
                <p className="text-text-secondary leading-relaxed">
                  다만 2021년부터 기존의 신용"등급"(1~10등급) 체계가 신용"점수"(1~1000점) 체계로
                  전환되었습니다. 현재는 점수가 표준입니다.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="border-b border-border-base pb-2 text-2xl font-bold">
                  신용점수에 영향을 주는 요인은?
                </h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  신용점수는 하나의 요소가 아니라 여러 금융 행동을 종합적으로 평가한 결과입니다. 가장
                  중요한 요인부터 순서대로 정리합니다.
                </p>
                <div className="rounded-lg bg-bg-raised p-4">
                  <h3 className="mb-3 font-semibold text-text-primary">
                    주요 영향 요인 (순서대로)
                  </h3>
                  <ul className="space-y-2 text-sm text-text-secondary">
                    <li>
                      <strong>1. 연체 이력:</strong> 가장 큰 악영향. 금액의 크기가 아니라 연체 여부와 기간이
                      중요합니다. 최근 연체일수록 더 큰 부정 영향을 줍니다.
                    </li>
                    <li>
                      <strong>2. 부채 수준:</strong> 현재 보유한 대출 잔액, 신용카드 사용 현황. 특히 신용카드
                      사용률(한도 대비 사용액)이 높을수록 점수가 낮아집니다.
                    </li>
                    <li>
                      <strong>3. 상환 이력:</strong> 대출이나 카드 사용 후 성실하게 갚은 기간의 길이와 일관성.
                      오래되고 꾸준한 상환 기록이 유리합니다.
                    </li>
                    <li>
                      <strong>4. 신용거래 기간:</strong> 처음 신용거래를 시작한 후 얼마나 오래됐는지. 장기간
                      거래 이력이 있을수록 유리합니다.
                    </li>
                    <li>
                      <strong>5. 신용형태 다양성:</strong> 은행 대출, 신용카드, 제2금융 대출 등 여러 유형의
                      신용거래 경험. 다양한 형태로 성실하게 거래할수록 유리합니다.
                    </li>
                    <li>
                      <strong>6. 비금융정보:</strong> 휴대폰비, 공과금, 보험료 등 정시 납부 기록. 최근(2020년대)
                      평가에 점점 중요해지고 있습니다.
                    </li>
                  </ul>
                </div>
                <p className="text-text-secondary leading-relaxed">
                  각 기관마다 정확한 가중치는 공개하지 않지만, 일반적으로 연체 이력과 부채 수준이 가장 큰
                  영향을 미칩니다.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="border-b border-border-base pb-2 text-2xl font-bold">
                  신용점수가 대출금리에 어떻게 영향을 주나요?
                </h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  신용점수가 높을수록 금융기관이 "이 사람은 돈을 잘 갚을 것"이라고 평가하여 낮은 금리를
                  제시합니다. 반대로 점수가 낮으면 위험도가 높다고 보아 금리를 높이거나 대출을 거절합니다.
                </p>
                <div className="rounded-lg bg-bg-raised p-4">
                  <h3 className="mb-3 font-semibold text-text-primary">
                    신용점수별 대출 가능성과 금리 수준
                  </h3>
                  <ul className="space-y-2 text-sm text-text-secondary">
                    <li>
                      <strong>높음 (800~1000점):</strong> 1금융권 저금리 대출 가능. 우대금리 혜택 가능.
                    </li>
                    <li>
                      <strong>중상 (650~800점):</strong> 1금융권 표준 금리. 조건부 우대 가능.
                    </li>
                    <li>
                      <strong>중간 (500~650점):</strong> 1금융권 승인은 어렵거나 기본 금리 적용. 2금융권
                      이용 권유.
                    </li>
                    <li>
                      <strong>낮음 (300~500점):</strong> 주로 2금융권(저축은행, 캐피탈 등). 금리 높음.
                    </li>
                    <li>
                      <strong>매우 낮음 ({'<'}300점):</strong> 대출 거절 가능성 높음. 소액 대출만 가능.
                    </li>
                  </ul>
                </div>
                <p className="text-text-secondary leading-relaxed">
                  정확한 기준은 금융기관, 대출 상품, 담보 여부, 신청 시점 등에 따라 달라집니다. 같은 점수
                  대역이라도 은행마다 심사 기준이 다르므로, 여러 기관에 문의하는 것이 좋습니다.
                </p>
                <p className="text-text-secondary leading-relaxed">
                  다만 구체적인 점수 구간별 금리표는 시시각각 변동하고 금융기관·상품마다 상이하므로, 본
                  가이드에서는 정성적 설명으로만 기재합니다. 정확한 금리는 직접 은행에 문의하세요.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="border-b border-border-base pb-2 text-2xl font-bold">
                  신용점수는 어디서 무료로 확인하나요?
                </h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  신용점수를 조회하는 방법은 여러 가지입니다. 중요한 점은 '본인 무료조회'는 신용점수에
                  영향을 주지 않는다는 것입니다. 조회 기록 때문에 점수가 떨어질 걱정은 안 해도 됩니다.
                </p>
                <div className="rounded-lg bg-bg-raised p-4">
                  <h3 className="mb-3 font-semibold text-text-primary">
                    무료 조회 방법 3가지
                  </h3>
                  <ul className="space-y-2 text-sm text-text-secondary">
                    <li>
                      <strong>1. 핀테크 앱:</strong> 토스(Toss), 카카오페이(Kakao Pay), 뱅크샐러드
                      (Banksalad) 등 모바일 앱에서 즉시 무료 조회 가능. 로그인 후 신용점수 탭에서 확인.
                    </li>
                    <li>
                      <strong>2. 신용평가사 공식 사이트:</strong> NICE지키미(www.niceskr.co.kr), 올크레딧
                      (www.allcredit.co.kr) 등에서 본인 확인 후 무료 조회 가능.
                    </li>
                    <li>
                      <strong>3. 시중 은행 앱:</strong> 국민은행, 우리은행, 신한은행 등 일부 은행 앱에서도
                      보유 고객 대상으로 무료 점수 제공.
                    </li>
                  </ul>
                </div>
                <p className="text-text-secondary leading-relaxed">
                  모두 조회 시간이 1~2분 정도로 매우 간단합니다. 월 1회 정도는 자신의 신용점수를 확인하여
                  관리하는 습관을 들이는 것이 좋습니다.
                </p>
                <p className="text-text-secondary leading-relaxed">
                  다만 금융기관이 심사 목적으로 조회하는 '조회'(하드조회)는 신용점수를 떨어뜨립니다.
                  따라서 대출 신청 전에 점수가 떨어질 수 있음을 인식하고 신청하세요.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="border-b border-border-base pb-2 text-2xl font-bold">
                  신용점수를 올리는 방법은?
                </h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  신용점수는 한 번에 크게 오르지 않습니다. 꾸준한 금융 행동으로 점차 개선됩니다. 다음은
                  점수를 올리기 위해 가장 효과적인 방법들입니다.
                </p>

                <div className="rounded-lg bg-bg-raised p-4">
                  <h3 className="mb-3 font-semibold text-text-primary">
                    신용점수 올리는 법 5가지
                  </h3>
                  <ul className="space-y-3 text-sm text-text-secondary">
                    <li>
                      <strong>1. 연체 절대 금지</strong>
                      <br />
                      대출 이자, 신용카드, 휴대폰비, 공과금 등 모든 금융 거래를 기한 내에 성실하게 납부하세요.
                      소액이라도 연체는 심각한 악영향을 미칩니다. 이미 연체가 있다면 즉시 완납하여 회복을
                      시작하세요.
                    </li>
                    <li>
                      <strong>2. 신용카드 사용률 낮추기</strong>
                      <br />
                      신용카드 한도 대비 사용액의 비율(사용률)을 30% 이하로 유지하세요. 예를 들어 한도가
                      1000만원이면 월 사용액을 300만원 이하로 조절합니다. 사용률이 높을수록 점수가 낮아집니다.
                    </li>
                    <li>
                      <strong>3. 여러 카드에 분산하기</strong>
                      <br />
                      사용할 금액이 정해져 있다면, 한 카드에 집중하기보다는 2~3개 카드에 분산하여 사용하세요.
                      각 카드의 사용률이 낮아져서 점수에 유리합니다.
                    </li>
                    <li>
                      <strong>4. 비금융정보 등록하기</strong>
                      <br />
                      휴대폰비, 인터넷비, 전기·가스·수도료, 보험료 등을 성실하게 납부하면, 이런 '비금융정보'를
                      올크레딧 같은 플랫폼에 등록할 수 있습니다. 최근 이런 정보가 신용평가에 긍정 신호로
                      작용합니다.
                    </li>
                    <li>
                      <strong>5. 안정적인 신용거래 유지</strong>
                      <br />
                      불필요한 새로운 신용 신청(카드, 대출 등)은 조회 기록으로 인해 일시적으로 점수를
                      낮춥니다. 현재 보유한 신용 상품을 안정적으로 유지하고 성실하게 거래하는 것이 장기적으로
                      점수를 올립니다.
                    </li>
                  </ul>
                </div>

                <p className="text-text-secondary leading-relaxed">
                  다만 점수 올리기는 최소 3~6개월 이상의 시간이 필요합니다. 특히 최근 연체가 있었다면
                  회복에 더 오래 걸릴 수 있습니다.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="border-b border-border-base pb-2 text-2xl font-bold">
                  연체 이력이 있으면 점수는 언제 회복되나요?
                </h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  연체 이력은 신용점수에 가장 심각한 악영향을 미칩니다. 회복 기간은 연체의 심각도와 경과
                  시간에 따라 달라집니다.
                </p>

                <div className="rounded-lg bg-bg-raised p-4">
                  <h3 className="mb-3 font-semibold text-text-primary">
                    연체별 회복 기간 (일반적 기준)
                  </h3>
                  <ul className="space-y-2 text-sm text-text-secondary">
                    <li>
                      <strong>경미한 연체 (1~30일):</strong> 완납 후 1~3개월이면 상당 부분 회복. 6개월 후
                      대부분 정상화.
                    </li>
                    <li>
                      <strong>중간 연체 (30일~3개월):</strong> 완납 후 6개월~1년 정도 경과해야 회복 시작.
                      점수 회복에 1년 이상 걸릴 수 있음.
                    </li>
                    <li>
                      <strong>심각한 연체 (3개월 초과, 부도, 채무 불이행):</strong> 완납 후에도 1~3년 이상
                      악영향 지속. 신용정보는 5~10년 보관되어 대형 대출에는 계속 영향 미칠 수 있음.
                    </li>
                  </ul>
                </div>

                <p className="text-text-secondary leading-relaxed">
                  중요한 것은 완납 후에도 시간이 필요하다는 점입니다. 점수가 올라가려면 완납 이후로도
                  3~6개월 이상 추가 신용거래를 성실하게 이행해야 합니다.
                </p>

                <p className="text-text-secondary leading-relaxed">
                  다만 심각한 연체나 부도 기록은 신용정보가 5~10년 보관되므로, 그 이후에도 큰 대출
                  신청 시 심사 과정에서 불리할 수 있습니다. 따라서 처음부터 연체하지 않는 것이 가장 중요합니다.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="border-b border-border-base pb-2 text-2xl font-bold">
                  대출 신청 시 신용점수 외에 확인할 것은?
                </h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  신용점수가 높다고 해서 모든 대출이 승인되는 것은 아닙니다. 금융기관은 신용점수 외에도
                  여러 조건을 함께 심사합니다.
                </p>

                <div className="rounded-lg bg-bg-raised p-4">
                  <h3 className="mb-3 font-semibold text-text-primary">
                    대출 심사 시 중요한 요소
                  </h3>
                  <ul className="space-y-2 text-sm text-text-secondary">
                    <li>
                      <strong>1. DSR (Debt Service Ratio):</strong> 연 소득에서 모든 대출의 연간 상환액이
                      차지하는 비율. 보통 40% 이하여야 승인. 신용점수보다 중요할 수 있음.
                    </li>
                    <li>
                      <strong>2. LTV (Loan to Value):</strong> 담보 가치 대비 대출액 비율. 주택담보대출 시
                      중요. 보통 70~80% 이하.
                    </li>
                    <li>
                      <strong>3. 소득 증빙:</strong> 급여 통장, 재직증명서, 소득세 신고 내역 등. 실직이나
                      소득 감소는 불승인 요인.
                    </li>
                    <li>
                      <strong>4. 고용 형태:</strong> 정규직은 유리하고, 계약직·프리랜서는 불리할 수 있음.
                    </li>
                    <li>
                      <strong>5. 기타 대출 현황:</strong> 기존 대출 건수와 잔액. 많을수록 신규 대출 승인이
                      어려움.
                    </li>
                  </ul>
                </div>

                <p className="text-text-secondary leading-relaxed">
                  따라서 신용점수를 올리는 것도 중요하지만, 소득을 증명하고 기존 대출을 줄이는 것도 같은
                  정도로 중요합니다.
                </p>

                <p className="text-text-secondary leading-relaxed">
                  다만 금융기관마다 가중치가 다르므로, 대출 신청 전에 직접 은행에 '사전 심사'나
                  '예상 한도' 문의를 통해 정보를 얻는 것이 좋습니다.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="border-b border-border-base pb-2 text-2xl font-bold">
                  신용점수가 대출 후 어떻게 변하나요?
                </h2>
                <p className="text-text-secondary leading-relaxed" data-speakable>
                  대출 신청과 승인 과정에서 신용점수는 여러 변화를 겪습니다. 이를 이해하면 대출 타이밍을
                  전략적으로 판단할 수 있습니다.
                </p>

                <div className="rounded-lg bg-bg-raised p-4">
                  <h3 className="mb-3 font-semibold text-text-primary">
                    대출 과정 중 신용점수 변화
                  </h3>
                  <ul className="space-y-2 text-sm text-text-secondary">
                    <li>
                      <strong>신청 직후 (조회 기록):</strong> 금융기관의 심사 조회로 인해 1~3주 동안 5~10점
                      정도 일시적 하락. 여러 기관에 동시 신청하면 영향이 더 클 수 있음.
                    </li>
                    <li>
                      <strong>승인 후 (신규 대출 등재):</strong> 새로운 대출 계좌가 신용정보에 등재되면서
                      부채 증가로 인식되어 점수가 떨어질 수 있음. 보통 10~20점 정도.
                    </li>
                    <li>
                      <strong>상환 중 (안정적 거래):</strong> 대출금을 성실하게 상환하면서 시간이 경과하면
                      점수가 서서히 회복. 6개월~1년 후부터 상승 추세.
                    </li>
                    <li>
                      <strong>완납 후 (거래 종료):</strong> 대출을 모두 갚으면 부채가 사라져 점수가 올라갈
                      수 있음. 다만 거래 기간이 끝나므로 장기적으로는 신용거래 다양성이 감소할 수 있음.
                    </li>
                  </ul>
                </div>

                <p className="text-text-secondary leading-relaxed">
                  결론적으로, 단기적으로는 대출 신청 후 점수가 떨어지지만, 성실한 상환으로 장기적으로 회복되는
                  패턴을 따릅니다.
                </p>

                <p className="text-text-secondary leading-relaxed">
                  다만 대출 가능 여부가 급할 때는 이런 점수 변동을 피할 수 없습니다. 중요한 금융 계획
                  (예: 주택담보대출)이 3~6개월 후 있다면, 그 전에 불필요한 신용 신청을 피하는 것이 좋습니다.
                </p>
              </section>

              <AdSlot
                slot="guide-credit-score-loan-interest-rate-2026-mid"
                format="rectangle"
              />

              <FaqSection items={FAQ_ITEMS} />

              <section className="card border-l-2 border-l-danger-500 bg-danger-500/5">
                <h2 className="mb-2 text-lg font-semibold text-danger-700 dark:text-danger-300">
                  주의사항 및 면책조항
                </h2>
                <ul className="space-y-2 text-sm text-danger-700 dark:text-danger-300">
                  <li>
                    • 본 가이드는 신용점수와 대출의 일반적 관계를 설명하는 정보성 자료입니다. 특정
                    금융기관의 실제 심사 기준을 보장하지 않습니다.
                  </li>
                  <li>
                    • 신용점수, 금리, 대출 한도는 <strong>금융기관과 상품마다 상이</strong>
                    하므로, 실제 신청 시에는 직접 은행에 문의하거나 대출중개 플랫폼을 통해 확인하세요.
                  </li>
                  <li>
                    • NICE와 KCB의 신용점수는 산정 방식이 다르므로 두 점수가 달라질 수 있습니다. 일반적으로
                    NICE 점수가 더 높은 경향이 있습니다.
                  </li>
                  <li>
                    • 신용점수 회복 기간은 개인의 재무 상황, 연체 정도, 이후 신용거래 성실성에 따라 크게
                    달라집니다. 본 가이드의 기간은 일반적 기준이며 보장하지 않습니다.
                  </li>
                  <li>
                    • 신용점수 올리기는 단기간에 효과를 기대하기 어렵습니다. 최소 3~6개월 이상의 성실한
                    거래가 필요합니다.
                  </li>
                  <li>
                    • 본 사이트는 금융상품 권유를 하지 않으며, 모든 금융 결정은 본인의 책임입니다.
                  </li>
                </ul>
              </section>

              <section aria-label="관련 도구" className="card">
                <h2 className="mb-3 text-lg font-semibold">관련 계산기 및 가이드</h2>
                <ul className="space-y-2 text-sm">
                  <li>
                    →{' '}
                    <Link
                      href="/calculator/loan/"
                      className="text-primary-600 underline dark:text-primary-500"
                    >
                      대출이자 계산기
                    </Link>{' '}
                    — 월 상환액과 총 이자를 직접 계산해보기
                  </li>
                  <li>
                    →{' '}
                    <Link
                      href="/calculator/loan-limit/"
                      className="text-primary-600 underline dark:text-primary-500"
                    >
                      대출한도 계산기 (DSR/LTV/DTI)
                    </Link>{' '}
                    — 신용점수 외 다른 심사 요소 확인하기
                  </li>
                  <li>
                    →{' '}
                    <Link
                      href="/guide/dsr-dti-ltv-difference-2026/"
                      className="text-primary-600 underline dark:text-primary-500"
                    >
                      DSR·DTI·LTV 차이와 계산법 2026
                    </Link>{' '}
                    — 신용점수 외 대출 심사 기준 학습
                  </li>
                  <li>
                    →{' '}
                    <Link
                      href="/guide/mortgage-refinance-savings-2026/"
                      className="text-primary-600 underline dark:text-primary-500"
                    >
                      대출 갈아타기 손익 계산 2026
                    </Link>{' '}
                    — 신용점수 회복 후 금리 개선 기회
                  </li>
                  <li>
                    →{' '}
                    <Link
                      href="/guide/prepayment-penalty-fee-2026/"
                      className="text-primary-600 underline dark:text-primary-500"
                    >
                      중도상환수수료와 계산법 2026
                    </Link>{' '}
                    — 갈아타기와 연계된 수수료 정보
                  </li>
                  <li>
                    →{' '}
                    <Link
                      href="/category/finance/"
                      className="text-primary-600 underline dark:text-primary-500"
                    >
                      금융 카테고리
                    </Link>{' '}
                    — 대출, 예금, 적금 관련 모든 계산기 및 가이드
                  </li>
                </ul>
              </section>

              <section
                aria-label="출처 및 면책"
                className="rounded-lg border border-border-base p-4 text-caption text-text-tertiary"
              >
                <p className="mb-2">
                  <strong>참고 자료</strong>:{' '}
                  <a
                    href="https://www.fss.or.kr/"
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="text-primary-600 underline dark:text-primary-500"
                  >
                    금융감독원
                  </a>
                  ,{' '}
                  <a
                    href="https://www.niceskr.co.kr/"
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="text-primary-600 underline dark:text-primary-500"
                  >
                    NICE지키미
                  </a>
                  ,{' '}
                  <a
                    href="https://www.allcredit.co.kr/"
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="text-primary-600 underline dark:text-primary-500"
                  >
                    올크레딧
                  </a>
                  .
                </p>
                <p>
                  <strong>업데이트</strong>: {DATE_MODIFIED}. AI 보조 작성 후 운영자 검수 완료.
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
