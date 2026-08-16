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

const URL = 'https://calculatorhost.com/guide/parent-child-account-transfer-gift-tax-2026/';
const DATE_PUBLISHED = '2026-08-17';
const DATE_MODIFIED = '2026-08-17';
// [revenue-lever: indexing+traffic]

export const metadata: Metadata = {
  title: '부모 자식 계좌이체 증여세 2026, 얼마까지 괜찮고 소명은 어떻게',
  description:
    '부모가 계좌로 보내준 돈은 원칙적으로 증여로 봅니다. 10년 5천만원 공제, 생활비 비과세, 무이자 대여 2.17억 기준, 자금출처 소명법까지 상증세법 45조 기준으로 정리했습니다.',
  keywords: [
    '부모 자식 계좌이체 증여세',
    '가족 간 계좌이체 증여',
    '자금출처 소명',
    '증여재산공제 5천만원',
    '무이자 차용증',
    '증여추정',
    '상속세및증여세법 45조',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '부모 자식 계좌이체 증여세 2026' }],
    title: '부모 자식 계좌이체 증여세 2026, 얼마까지 괜찮을까',
    description:
      '부모가 보내준 돈은 증여인가? 10년 5천만원 공제, 생활비 비과세, 무이자 대여 한도, 자금출처 소명까지.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '부모 자식 계좌이체 증여세, 얼마까지 괜찮을까',
    description: '10년 5천만원 공제, 생활비 비과세, 무이자 대여 2.17억 기준. 상증세법 §45·§46·§53.',
  },
};

const FAQ_ITEMS = [
  {
    question: '부모가 생활비로 보내준 돈도 증여세를 내나요?',
    answer:
      '사회통념상 인정되는 생활비는 증여세를 내지 않습니다(상증세법 §46). 다만 소득이 있는 자녀에게 준 돈이거나, 받은 돈을 생활비로 쓰지 않고 예금·주식·부동산 취득에 쓰면 증여로 볼 수 있습니다. 국세청은 명목이 아니라 실제 사용처를 기준으로 판단합니다(국세기본법 §14 실질과세).',
  },
  {
    question: '성년 자녀는 부모에게서 얼마까지 증여세 없이 받나요?',
    answer:
      '성년 자녀는 10년간 합산 5천만원까지 증여재산공제를 받습니다(상증세법 §53). 미성년 자녀는 2천만원입니다. 이 한도는 증여자별이 아니라 부모(직계존속) 그룹 합산이며, 10년 단위로 리셋됩니다. 초과분에만 세율이 적용됩니다.',
  },
  {
    question: '부모에게 무이자로 돈을 빌리면 증여인가요?',
    answer:
      '연 이자 차액이 1천만원 미만이면 증여로 보지 않습니다(상증세법 §41의4). 적정이자율 연 4.6%를 적용하므로 약 2억1,700만원까지는 무이자로 빌려도 이자상당액이 1천만원 미만이라 과세되지 않습니다. 다만 실제 대여인지 증명하려면 차용증과 원리금 상환 내역이 필요합니다.',
  },
  {
    question: '차용증은 어떻게 써야 세무서가 인정하나요?',
    answer:
      '차용증에 원금·이자율·상환기일·양 당사자 서명을 적고 작성일을 객관적으로 증명해야 합니다. 우체국 내용증명이나 공증, 이메일 송수신 기록으로 날짜를 고정하는 방법이 안전합니다. 또한 약정한 이자·원금을 실제로 계좌이체로 갚은 내역이 남아야 대여로 인정받기 쉽습니다.',
  },
  {
    question: '자금출처 조사는 언제 나오나요?',
    answer:
      '주로 부동산·전세보증금·고가 자산을 취득했는데 본인 소득으로 설명되지 않을 때 나옵니다(상증세법 §45 증여추정). 취득자금 중 소명하지 못한 금액을 증여받은 것으로 추정해 과세합니다. 급여·사업소득·기존 재산·대출 등 자금 출처를 서류로 준비해 두는 것이 핵심입니다.',
  },
  {
    question: '5천만원을 딱 맞춰 이체하면 신고를 안 해도 되나요?',
    answer:
      '공제 한도 이내라 낼 세금은 없지만 증여 사실 자체는 남습니다. 나중에 추가 증여가 겹치면 10년 합산으로 세금이 생길 수 있으므로, 향후 증여 계획이 있다면 한도 이내라도 증여세 신고로 시점과 금액을 기록해 두는 편이 분쟁 예방에 유리합니다.',
  },
  {
    question: '증여세를 자진신고하면 세액을 깎아주나요?',
    answer:
      '증여받은 달의 말일부터 3개월 안에 신고하면 산출세액의 3%를 신고세액공제로 빼줍니다(상증세법 §69). 반대로 신고를 놓치면 무신고 가산세 20%와 납부지연 가산세가 붙으므로, 한도를 넘는 증여는 기한 내 신고가 훨씬 유리합니다.',
  },
];

export default function ParentChildAccountTransferGiftTax2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '부모 자식 계좌이체 증여세 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '부모 자식 계좌이체 증여세 2026, 얼마까지 괜찮고 소명은 어떻게',
    description:
      '부모가 계좌로 보내준 돈의 증여세 판단 기준. 10년 5천만원 공제, 생활비 비과세, 무이자 대여 2.17억 기준, 자금출처 소명법을 상증세법 §45·§46·§53 기준으로 정리.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['부모 자식 계좌이체', '증여세', '증여재산공제', '자금출처', '차용증', '증여추정'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '부모 자식 계좌이체 증여세 2026',
    description:
      '부모가 보내준 돈은 증여인가? 공제 한도·생활비 비과세·무이자 대여 기준·자금출처 소명까지 정리한 실전 가이드.',
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
                    { name: '부모 자식 계좌이체 증여세 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">부모·자녀 · 8분 읽기 · 2026-08-17</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  부모 자식 계좌이체 증여세 2026
                  <br />
                  <span className="text-2xl text-text-secondary">· 얼마까지 괜찮고 소명은 어떻게</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  부모가 계좌로 목돈을 보내줬을 때 가장 먼저 드는 걱정이 증여세입니다. 이 글은 부모에게 돈을 받은 자녀, 또는 자녀에게 돈을 보내려는 부모를 위해 준비했습니다. 어디까지가 세금 없이 가능한 생활비·용돈이고, 어디부터 증여로 과세되는지, 그리고 자금출처 조사가 나왔을 때 어떻게 소명하는지까지 상속세및증여세법 조문을 근거로 단계별로 정리합니다.
                </p>
              </header>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">30초 요약</h2>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">핵심만 먼저</p>
                  <ul className="mt-2 space-y-1 text-sm text-text-secondary list-disc ml-5">
                    <li>부모가 대가 없이 보낸 돈은 원칙적으로 증여입니다(상증세법 §2·§4).</li>
                    <li>성년 자녀는 10년 합산 5천만원, 미성년은 2천만원까지 공제(§53).</li>
                    <li>사회통념상 생활비·교육비는 비과세, 단 다른 데 굴리면 과세(§46).</li>
                    <li>무이자 대여는 이자 차액 연 1천만원 미만이면 비과세(§41의4), 약 2.17억까지.</li>
                    <li>자금출처가 소명 안 되면 증여로 추정 과세(§45).</li>
                  </ul>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 직계·친족 증여재산공제 한도 (상증세법 §53, 10년 합산)</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">증여자</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">수증자</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">공제 한도</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">배우자</td>
                        <td className="p-3">배우자</td>
                        <td className="p-3"><strong>6억원</strong></td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">직계존속(부모·조부모)</td>
                        <td className="p-3">성년 자녀</td>
                        <td className="p-3"><strong>5천만원</strong></td>
                      </tr>
                      <tr className="border-b border-border-base">
                        <td className="p-3">직계존속</td>
                        <td className="p-3">미성년 자녀</td>
                        <td className="p-3"><strong>2천만원</strong></td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">기타 친족(6촌 이내)</td>
                        <td className="p-3">친족</td>
                        <td className="p-3"><strong>1천만원</strong></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">부모가 보내준 돈도 증여세 대상인가요?</h2>
                <p>
                  원칙적으로 증여로 봅니다. 상속세및증여세법 §2와 §4는 대가 없이 재산이 무상으로 이전되면 그 이익을 증여로 정의합니다. 따라서 부모가 자녀 계좌로 돈을 보내면 그 자체가 증여 행위에 해당하고, 자녀가 증여세 납세의무를 집니다.
                </p>
                <p>
                  다만 모든 이체에 곧바로 세금이 붙는 것은 아닙니다. 뒤에서 설명할 증여재산공제(§53), 생활비 비과세(§46), 대여(§41의4)에 해당하면 낼 세금이 없거나 과세되지 않습니다. 국세청도 소액의 일상적 이체를 일일이 과세하지는 않습니다.
                </p>
                <p>
                  다만 문제가 되는 순간은 정해져 있습니다. 자녀가 부동산·전세보증금·주식 등 큰 자산을 취득했는데 본인 소득으로 설명되지 않을 때, 국세청은 과거 계좌이체 내역을 역추적합니다. 이때 소명하지 못한 금액이 증여로 추정되어 세금과 가산세가 한꺼번에 부과됩니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">얼마까지는 증여세가 없나요?</h2>
                <p>
                  성년 자녀는 10년간 5천만원까지 세금이 없습니다. 상증세법 §53에 따른 증여재산공제입니다. 미성년 자녀는 2천만원, 배우자 사이는 6억원까지 공제됩니다. 이 한도는 개별 증여 건별이 아니라 같은 그룹(직계존속)에서 받은 금액을 10년 단위로 합산해 적용합니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">10년 합산의 의미</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    예를 들어 3년 전 아버지에게 3천만원, 올해 어머니에게 3천만원을 받으면 부모(직계존속) 합산 6천만원이 됩니다. 공제 5천만원을 넘은 1천만원이 과세표준이 됩니다. 아버지·어머니를 나눠도 공제 한도는 합쳐서 5천만원이라는 점에 주의하세요.
                  </p>
                </div>
                <p>
                  다만 공제 한도 이내라도 증여 사실은 남습니다. 향후 10년 안에 추가 증여가 겹치면 합산으로 세금이 생길 수 있으니, 목돈 증여는 시점과 금액을 신고로 기록해 두는 편이 안전합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">생활비·용돈·교육비도 증여세를 내나요?</h2>
                <p>
                  사회통념상 인정되는 생활비와 교육비는 비과세입니다. 상증세법 §46은 피부양자의 생활비·교육비 등 통상 필요하다고 인정되는 금품을 비과세 대상으로 규정합니다. 부모가 소득이 없는 대학생 자녀의 등록금·월세를 대주는 것이 대표적입니다.
                </p>
                <p>
                  다만 조건이 있습니다. 비과세되는 생활비는 실제로 생활비로 쓰여야 합니다. 부모가 준 돈을 자녀가 쓰지 않고 예금·펀드·주식·부동산 취득에 넣으면, 그 시점에 생활비가 아니라 증여로 성격이 바뀝니다. 소득이 넉넉한 자녀에게 준 생활비 명목의 돈도 과세될 수 있습니다.
                </p>
                <p>
                  국세청은 명목이 아니라 실질을 봅니다. 국세기본법 §14 실질과세 원칙에 따라, 이름을 생활비로 붙였는지가 아니라 그 돈이 실제로 어떻게 쓰였는지로 판단합니다. 생활비 이체는 매달 소액으로 나누어 실제 소비에 연결되도록 하는 것이 안전합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">무이자로 빌리면 증여인가요?</h2>
                <p>
                  이자 차액이 연 1천만원 미만이면 증여로 보지 않습니다. 상증세법 §41의4는 특수관계인에게 무상 또는 낮은 이자로 돈을 빌리면 적정이자와의 차액을 증여이익으로 봅니다. 적정이자율은 연 4.6%입니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">무이자 대여의 안전선</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    원금 × 4.6%가 1천만원 미만이면 과세되지 않습니다.
                    <br />
                    1천만원 ÷ 4.6% = 약 2억1,700만원
                    <br />
                    따라서 약 <strong>2억1,700만원까지는 무이자로 빌려도</strong> 이자상당액이 1천만원 미만이라 증여세가 없습니다. 이를 넘으면 차액 전체가 증여이익이 됩니다.
                  </p>
                </div>
                <p>
                  다만 이는 진짜 대여일 때 이야기입니다. 갚을 의사와 능력, 실제 상환 내역이 없으면 국세청은 대여가 아니라 증여로 봅니다. 대여로 인정받으려면 차용증과 원리금 상환 기록이 반드시 필요합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">차용증은 어떻게 써야 인정되나요?</h2>
                <p>
                  형식과 실행이 모두 갖춰져야 합니다. 차용증 종이 한 장으로는 부족하고, 실제 대여처럼 돈이 오간 흔적이 있어야 합니다. 다음 순서로 준비하세요.
                </p>
                <ol className="space-y-3 ml-6 list-decimal text-text-secondary">
                  <li><strong>계약서 작성:</strong> 원금·이자율·상환기일·상환방법·양 당사자 인적사항과 서명을 명확히 기재합니다.</li>
                  <li><strong>작성일 고정:</strong> 우체국 내용증명, 공증, 또는 이메일 송수신으로 작성일을 객관적으로 증명합니다. 사후에 소급 작성한 의심을 피하는 핵심 단계입니다.</li>
                  <li><strong>실제 이체:</strong> 약정한 이자와 원금을 정해진 날짜에 계좌이체로 갚고 내역을 보관합니다. 현금 상환은 인정받기 어렵습니다.</li>
                  <li><strong>이자 원천징수:</strong> 개인 간 대여라도 이자를 지급하면 비영업대금 이익으로 25% 원천징수 신고가 필요할 수 있습니다. 소액이면 종합소득세로 정산합니다.</li>
                </ol>
                <p>
                  다만 형식만 갖추고 한 번도 갚지 않으면 대여로 보기 어렵습니다. 정기적 상환 흔적이 대여와 증여를 가르는 실질 증거입니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">자금출처 조사는 언제 나오나요?</h2>
                <p>
                  큰 자산을 취득했는데 소득으로 설명이 안 될 때 나옵니다. 상증세법 §45 증여추정 규정에 따라, 직업·연령·소득·재산 상태로 볼 때 자기 힘으로 취득했다고 보기 어려운 재산은 취득자금을 증여받은 것으로 추정합니다. 부동산 매입, 전세보증금 마련, 사업자금 등이 대표적 계기입니다.
                </p>
                <p>
                  이때 취득자금 중 소명하지 못한 금액에 대해 증여세가 부과됩니다. 다만 취득자금 전체를 다 소명할 필요는 없습니다. 실무상 취득가액의 일정 비율 또는 일정 금액 이내로 소명되지 않은 부분이 크지 않으면 증여추정을 적용하지 않는 기준이 있으나, 구체적 판단은 사안별로 다르므로 국세청·세무 전문가에게 확인하는 것이 안전합니다.
                </p>
                <p>
                  대비책은 자금 출처를 서류로 남겨두는 것입니다. 급여 원천징수영수증, 사업소득 자료, 기존 예금·부동산 처분 내역, 대출 실행 서류, 증여받은 부분은 증여세 신고서를 함께 보관하면 소명이 수월합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">실제 계산 사례로 보는 증여세</h2>
                <p>
                  아래 세 사례로 공제·세율·신고세액공제가 어떻게 맞물리는지 살펴봅니다. 세율은 1억원 이하 구간 10%를 적용합니다(상증세법 §56).
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 1. 성년 자녀에게 7천만원 증여 (첫 증여)</p>
                  <p className="text-sm text-text-secondary">
                    · 증여액: 7,000만원
                    <br />
                    · 증여재산공제(성년): 5,000만원
                    <br />
                    · 과세표준: 7,000만 - 5,000만 = 2,000만원
                    <br />
                    · 산출세액: 2,000만 × 10% = 200만원
                    <br />
                    · 신고세액공제(3%): 200만 × 3% = 6만원
                    <br />
                    · 납부세액: 200만 - 6만 = <strong>194만원</strong>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 2. 경계값 비교 (5,000만원 vs 5,100만원)</p>
                  <p className="text-sm text-text-secondary">
                    · 5,000만원 이체: 과세표준 0원 → 납부세액 <strong>0원</strong>(공제 이내)
                    <br />
                    · 5,100만원 이체: 과세표준 100만원 → 100만 × 10% = 10만원 → 신고세액공제 3% 적용 시 약 <strong>9만7천원</strong>
                    <br />
                    <span className="text-xs text-text-tertiary">공제 한도를 조금만 넘어도 세금이 발생하므로, 넘긴다면 반드시 기한 내 신고하세요.</span>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 3. 무이자 대여 2억원 vs 3억원</p>
                  <p className="text-sm text-text-secondary">
                    · 2억원 무이자: 2억 × 4.6% = 920만원 → 1천만원 미만 → 증여세 <strong>없음</strong>
                    <br />
                    · 3억원 무이자: 3억 × 4.6% = 1,380만원 → 1천만원 이상 → 이자상당액 <strong>1,380만원 전액이 증여이익</strong>
                    <br />
                    <span className="text-xs text-text-tertiary">1천만원 기준을 넘으면 초과분만이 아니라 이자상당액 전체가 증여로 계산됩니다(상증세법 §41의4).</span>
                  </p>
                </div>
              </section>

              <h2 className="text-2xl font-bold mb-6">자주 묻는 질문</h2>
              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h3 className="text-lg font-semibold text-text-primary">관련 계산기 및 가이드</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link
                    href="/calculator/gift-tax/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">증여세 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">증여액을 입력해 공제 후 세액을 바로 계산해보세요.</p>
                  </Link>
                  <Link
                    href="/guide/gift-tax-exemption-limit-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">증여재산공제 한도 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">배우자·자녀·친족별 10년 공제 한도를 정리했습니다.</p>
                  </Link>
                  <Link
                    href="/guide/living-expenses-allowance-gift-tax-exemption-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">생활비·용돈 증여세 비과세</div>
                    <p className="mt-1 text-sm text-text-secondary">어디까지가 비과세 생활비인지 기준을 확인하세요.</p>
                  </Link>
                  <Link
                    href="/guide/family-loan-agreement-gift-tax-avoidance/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">가족 간 차용증 작성법</div>
                    <p className="mt-1 text-sm text-text-secondary">무이자 대여를 대여로 인정받는 차용증 요건.</p>
                  </Link>
                  <Link
                    href="/guide/housing-fund-plan-source-of-funds-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">자금조달계획서 작성</div>
                    <p className="mt-1 text-sm text-text-secondary">주택 취득 시 자금출처 소명의 출발점.</p>
                  </Link>
                  <Link
                    href="/category/tax/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">모든 세금 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">증여세·상속세·양도세·취득세 모음.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 교육 목적으로 작성되었으며 개인 맞춤형 세무 조언이 아닙니다. 증여 여부·공제 적용·자금출처 소명은 개별 사실관계에 따라 달라지므로, 실제 신고 전 국세청 또는 세무 전문가에게 확인하세요. 본 콘텐츠는 2026-08-17 기준이며 관련 법령 개정 시 업데이트됩니다. 인용 조항: 상속세및증여세법 <strong>§2·§4(증여 정의)·§41의4(금전 무상대출 이익)·§45(재산취득자금 증여추정)·§46(비과세)·§53(증여재산공제)·§56(세율)·§69(신고세액공제)</strong>, 국세기본법 <strong>§14(실질과세)</strong>. AI 보조 작성 후 운영자 검수 완료.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터</a>,{' '}
                  <a href="https://www.nts.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">국세청</a>,{' '}
                  <a href="https://hometax.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">홈택스</a>.
                </p>
              </section>

              <ShareButtons
                title="부모 자식 계좌이체 증여세 2026 가이드"
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
