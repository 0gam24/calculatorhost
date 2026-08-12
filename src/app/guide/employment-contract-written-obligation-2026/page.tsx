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

const URL = 'https://calculatorhost.com/guide/employment-contract-written-obligation-2026/';
const DATE_PUBLISHED = '2026-08-06';
const DATE_MODIFIED = '2026-08-06';

export const metadata: Metadata = {
  title: '근로계약서 안 쓰면 벌금, 알바·정규직 처벌 차이 정리',
  description:
    '근로계약서 미작성·미교부는 정규직은 500만원 이하 벌금, 알바·기간제는 500만원 이하 과태료 대상입니다. 반드시 들어가야 할 명시사항과 미작성 시 신고 방법을 근로기준법 §17 기준으로 정리했습니다.',
  keywords: [
    '근로계약서 미작성',
    '근로계약서 안쓰면 벌금',
    '알바 근로계약서',
    '근로계약서 명시사항',
    '근로계약서 미교부 과태료',
    '근로계약서 신고',
    '근로기준법 17조',
  ],
  alternates: { canonical: URL },
  openGraph: {
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '근로계약서 미작성 벌금·과태료와 명시사항' }],
    title: '근로계약서 안 쓰면 벌금, 알바·정규직 처벌 차이 정리',
    description: '정규직 벌금 500만원, 알바 과태료 500만원. 근로계약서 필수 명시사항과 미작성 신고 방법.',
    url: URL,
    type: 'article',
    locale: 'ko_KR',
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: '근로계약서 안 쓰면 벌금·과태료',
    description: '정규직은 벌금, 알바·기간제는 과태료 최대 500만원. 명시사항과 신고 절차 정리.',
  },
};

const FAQ_ITEMS = [
  {
    question: '근로계약서는 반드시 써야 하나요?',
    answer:
      '네, 의무입니다. 사용자는 근로계약을 체결할 때 임금·소정근로시간·휴일·연차유급휴가 등 주요 근로조건을 서면으로 명시해 근로자에게 교부해야 합니다(근로기준법 §17). 하루짜리 아르바이트라도 예외 없이 작성·교부 대상입니다.',
  },
  {
    question: '근로계약서를 안 쓰면 벌금이 얼마인가요?',
    answer:
      '정규직 근로자에게 근로조건을 서면 명시하지 않으면 500만원 이하의 벌금 대상입니다(근로기준법 §114). 이는 형사처벌로 전과 기록이 남을 수 있습니다. 아르바이트·기간제·단시간 근로자의 경우 500만원 이하의 과태료가 부과되며(기간제법 §24), 이는 행정처분으로 전과가 남지 않습니다.',
  },
  {
    question: '알바도 근로계약서를 써야 하나요?',
    answer:
      '반드시 써야 합니다. 기간제·단시간 근로자는 기간제 및 단시간근로자 보호 등에 관한 법률 §17에 따라 근로계약기간, 근로시간·휴게, 임금, 휴일·휴가, 취업장소·업무 등을 서면으로 명시해야 합니다. 구두로만 약속하면 위반입니다.',
  },
  {
    question: '근로계약서에 반드시 들어가야 할 내용은 무엇인가요?',
    answer:
      '임금의 구성항목·계산방법·지급방법, 소정근로시간, 주휴일, 연차유급휴가가 핵심 명시사항입니다(근로기준법 §17). 기간제·단시간은 여기에 근로계약기간과 취업장소·업무, 근로일별 근로시간까지 추가로 명시해야 합니다. 특히 임금과 근로시간은 반드시 서면으로 남겨야 합니다.',
  },
  {
    question: '근로계약서를 작성만 하고 안 줘도 되나요?',
    answer:
      '안 됩니다. 근로기준법 §17은 명시한 서면을 근로자에게 "교부"할 의무까지 규정합니다. 작성만 하고 사업주가 보관한 채 근로자에게 주지 않으면 미교부로 위반이 됩니다. 사본을 반드시 근로자에게 전달해야 합니다.',
  },
  {
    question: '근로계약서를 안 썼는데 어떻게 신고하나요?',
    answer:
      '관할 지방고용노동청에 진정을 제기하면 됩니다. 고용노동부 홈페이지 민원신청 또는 방문·우편으로 접수할 수 있습니다. 급여 이체내역, 근무 사진, 메신저 대화 등 근로 사실을 입증할 자료를 함께 제출하면 조사가 수월합니다.',
  },
  {
    question: '근로계약서가 없으면 임금을 못 받나요?',
    answer:
      '그렇지 않습니다. 근로계약서가 없어도 실제로 일했다면 임금 청구권은 그대로 있습니다. 계좌이체·근무기록 등으로 근로 사실이 입증되면 최저임금 이상의 임금과 주휴수당을 청구할 수 있습니다. 계약서 미작성은 사용자의 별도 위반 사항입니다.',
  },
  {
    question: '수습·시용 기간에도 근로계약서를 써야 하나요?',
    answer:
      '네, 수습·시용 기간도 근로관계이므로 근로계약서를 작성·교부해야 합니다. 수습 여부, 수습 기간, 수습 중 임금(감액이 있다면 그 내용)까지 명확히 서면에 담는 것이 분쟁 예방에 도움이 됩니다.',
  },
];

export default function EmploymentContractWrittenObligation2026Page() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: '홈', url: 'https://calculatorhost.com/' },
    { name: '가이드', url: 'https://calculatorhost.com/guide/' },
    { name: '근로계약서 작성 의무 2026' },
  ]);
  const articleLd = buildArticleJsonLd({
    headline: '근로계약서 안 쓰면 벌금, 알바·정규직 처벌 차이 정리',
    description:
      '근로계약서 미작성·미교부 시 정규직 벌금(근로기준법 §114)과 기간제·단시간 과태료(기간제법 §24)의 차이, 필수 명시사항, 신고 방법을 근로기준법 §17 기준으로 정리한 가이드.',
    url: URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    authorName: '김준혁',
    authorUrl: 'https://calculatorhost.com/about/',
    image: 'https://calculatorhost.com/og-default.png',
    keywords: ['근로계약서', '미작성', '벌금', '과태료', '근로기준법'],
  });
  const webPageLd = buildWebPageJsonLd({
    name: '근로계약서 작성 의무 2026',
    description: '근로계약서 미작성 시 벌금·과태료, 필수 명시사항, 신고 방법 정리.',
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
                    { name: '근로계약서 작성 의무 2026' },
                  ]}
                />
                <p className="mb-2 text-caption text-text-tertiary">근로자·사업주 · 7분 읽기 · 2026-08-06</p>
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                  근로계약서 안 쓰면 벌금
                  <br />
                  <span className="text-2xl text-text-secondary">알바·정규직 처벌 차이 정리</span>
                </h1>
                <p className="text-lg text-text-secondary" data-speakable>
                  이 가이드는 근로계약서 없이 일을 시작했거나 직원을 채용하는 사업주를 위한 글입니다. 근로계약서가 왜 의무인지, 안 쓰면 벌금과 과태료 중 어느 쪽인지, 반드시 들어가야 할 내용은 무엇인지, 그리고 미작성 시 어떻게 신고하는지를 근로기준법 조문에 근거해 정리합니다.
                </p>
              </header>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">근로계약서는 꼭 써야 하나</h2>
                <p>
                  네, 법적 의무입니다. 사용자는 근로계약을 체결할 때 임금·소정근로시간·휴일·연차유급휴가 등 주요 근로조건을 서면으로 명시하고, 그 서면을 근로자에게 교부해야 합니다(근로기준법 §17). 하루짜리 단기 아르바이트라도 예외가 없습니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4">
                  <p className="font-semibold text-text-primary">작성·교부 두 가지가 모두 의무</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    ① 근로조건을 서면으로 작성(명시)
                    <br />
                    ② 그 서면을 근로자에게 교부(전달)
                  </p>
                </div>
                <p className="mt-4">
                  작성과 교부는 별개의 의무입니다. 작성만 하고 근로자에게 주지 않으면 그 자체로 위반이 됩니다.
                </p>
                <p className="mt-4">
                  다만 근로계약서를 쓰지 않았다고 해서 근로관계가 부정되는 것은 아닙니다. 실제로 일했다면 임금·주휴수당 청구권은 그대로 살아 있고, 미작성은 사용자의 별도 위반으로 다뤄집니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">안 쓰면 벌금인가 과태료인가</h2>
                <p>
                  처벌은 근로자 유형에 따라 갈립니다. 정규직은 형사처벌인 벌금, 기간제·단시간(알바)은 행정처분인 과태료 대상입니다. 금액은 둘 다 500만원 이하이지만 성격이 크게 다릅니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <caption className="mb-2 text-left text-xs text-text-secondary">표 1. 근로계약서 미작성·미교부 시 제재 비교</caption>
                    <thead>
                      <tr className="border-b border-border-base">
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">근로자 유형</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">근거</th>
                        <th scope="col" className="text-left p-3 font-semibold bg-bg-card">제재</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-base">
                        <td className="p-3">정규직(무기계약)</td>
                        <td className="p-3">근로기준법 §17·§114</td>
                        <td className="p-3"><strong>500만원 이하 벌금</strong> (형사·전과 가능)</td>
                      </tr>
                      <tr className="border-b border-border-base bg-bg-card/50">
                        <td className="p-3">기간제·단시간(알바)</td>
                        <td className="p-3">기간제법 §17·§24</td>
                        <td className="p-3"><strong>500만원 이하 과태료</strong> (행정·전과 없음)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  벌금은 전과 기록이 남는 형사처벌이라 사업주에게 부담이 더 큽니다. 과태료는 전과가 남지 않지만 반복되면 금액이 커질 수 있습니다.
                </p>
                <p className="mt-4">
                  다만 어느 경우든 500만원 이하는 상한이며, 위반 건수·기간·시정 여부에 따라 실제 부과액은 달라집니다. 정확한 판단은 관할 지방고용노동청이 합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">반드시 들어가야 할 명시사항</h2>
                <p>
                  근로계약서에 빠지면 안 되는 핵심 항목이 있습니다. 특히 임금과 근로시간은 반드시 서면으로 남겨야 합니다.
                </p>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li>
                    <strong>임금:</strong> 구성항목(기본급·수당), 계산방법, 지급방법·지급일까지 구체적으로 적습니다.
                  </li>
                  <li>
                    <strong>소정근로시간:</strong> 하루·주 근로시간과 시업·종업 시각, 휴게시간을 명시합니다.
                  </li>
                  <li>
                    <strong>휴일·휴가:</strong> 주휴일과 연차유급휴가에 관한 사항을 적습니다.
                  </li>
                  <li>
                    <strong>기간제·단시간 추가사항:</strong> 근로계약기간, 근로일 및 근로일별 근로시간, 취업장소와 업무 내용을 더 명시해야 합니다(기간제법 §17).
                  </li>
                </ul>
                <p className="mt-4">
                  예외: 계약서를 썼더라도 임금·근로시간 같은 필수 항목이 빠져 있으면 명시의무 위반이 될 수 있습니다. 양식만 갖추는 것이 아니라 내용이 실제로 담겨야 합니다.
                </p>
              </section>

              <section className="space-y-6" data-speakable>
                <h2 className="text-2xl font-bold">상황별 판단 사례</h2>
                <p>
                  실제 현장에서 자주 나오는 세 가지 상황으로 위반 여부를 확인해보겠습니다.
                </p>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 1. 정규직 채용, 계약서 없이 구두로만 근무 시작</p>
                  <p className="text-sm text-text-secondary">
                    · 서면 명시·교부 없음 → 근로기준법 §17 위반
                    <br />
                    · 제재: 500만원 이하 벌금(형사)
                    <br />
                    <span className="text-xs text-text-tertiary">구두 합의만으로는 명시의무를 이행한 것이 아닙니다.</span>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 2. 주말 알바, 카톡으로만 조건 안내</p>
                  <p className="text-sm text-text-secondary">
                    · 기간제·단시간 근로자에게 서면 명시 없음 → 기간제법 §17 위반
                    <br />
                    · 제재: 500만원 이하 과태료(행정)
                    <br />
                    <span className="text-xs text-text-tertiary">메신저 안내는 정식 서면 명시·교부로 인정되기 어렵습니다.</span>
                  </p>
                </div>
                <div className="rounded-lg border border-border-base bg-bg-card p-4 space-y-3 mt-4">
                  <p className="font-semibold text-text-primary">사례 3. 계약서 작성했으나 임금 지급일 누락</p>
                  <p className="text-sm text-text-secondary">
                    · 서면은 있으나 필수 명시사항(임금 지급방법·지급일) 일부 누락
                    <br />
                    · 명시의무 위반에 해당할 수 있음
                    <br />
                    <span className="text-xs text-text-tertiary">경계: 양식 존재 여부가 아니라 필수 항목 충족 여부로 판단합니다.</span>
                  </p>
                </div>
              </section>

              <section className="space-y-6 border-t border-border-base pt-8">
                <h2 className="text-2xl font-bold">미작성 시 신고와 사업주 대응</h2>
                <p>
                  근로자는 계약서를 받지 못했을 때 신고할 수 있고, 사업주는 사전에 위반을 예방할 수 있습니다.
                </p>
                <ul className="space-y-3 ml-6 list-disc text-text-secondary">
                  <li>
                    <strong>근로자 신고:</strong> 관할 지방고용노동청에 진정을 제기합니다. 급여 이체내역·근무기록·메신저 대화 등 근로 사실 입증 자료를 함께 제출하세요.
                  </li>
                  <li>
                    <strong>사업주 예방:</strong> 채용 시점에 표준근로계약서를 작성해 근로자에게 사본을 교부하고, 교부 사실을 서명·문자 등으로 남겨두면 분쟁을 줄일 수 있습니다.
                  </li>
                  <li>
                    <strong>표준양식 활용:</strong> 고용노동부가 배포하는 표준근로계약서 양식을 쓰면 필수 명시사항 누락을 방지할 수 있습니다.
                  </li>
                </ul>
                <p className="mt-4">
                  예외: 개별 사안의 위반 여부·과태료 금액은 근로감독관 판단에 따라 달라지므로, 애매하면 고용노동부 상담(국번 없이 1350)을 이용하세요.
                </p>
              </section>

              <h2 className="text-2xl font-bold mb-6">자주 묻는 질문</h2>
              <FaqSection items={FAQ_ITEMS} />

              <section className="space-y-6 border-t border-border-base pt-8">
                <h3 className="text-lg font-semibold text-text-primary">관련 계산기 및 가이드</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link
                    href="/calculator/salary/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">연봉 실수령액 계산기</div>
                    <p className="mt-1 text-sm text-text-secondary">계약서상 임금의 세후 실수령액을 확인하세요.</p>
                  </Link>
                  <Link
                    href="/guide/minimum-wage-2027/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">2027 최저임금 10,700원</div>
                    <p className="mt-1 text-sm text-text-secondary">계약서에 담아야 할 최저 시급 기준.</p>
                  </Link>
                  <Link
                    href="/guide/weekly-holiday-allowance-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">주휴수당 완전 정리</div>
                    <p className="mt-1 text-sm text-text-secondary">계약서 근로시간과 연결된 주휴수당.</p>
                  </Link>
                  <Link
                    href="/guide/annual-leave-allowance-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">연차수당 2026</div>
                    <p className="mt-1 text-sm text-text-secondary">연차유급휴가 발생과 수당 계산법.</p>
                  </Link>
                  <Link
                    href="/guide/overtime-night-holiday-allowance-2026/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">연장·야간·휴일수당</div>
                    <p className="mt-1 text-sm text-text-secondary">가산수당 1.5배 적용 기준.</p>
                  </Link>
                  <Link
                    href="/category/work/"
                    className="rounded-lg border border-border-base bg-bg-card p-4 hover:border-primary-500 hover:bg-primary-500/5 transition"
                  >
                    <div className="font-semibold text-primary-500">근로 가이드 모음</div>
                    <p className="mt-1 text-sm text-text-secondary">임금·수당·휴가 관련 전체 가이드.</p>
                  </Link>
                </div>
              </section>

              <section className="space-y-4 rounded-lg border border-border-base bg-bg-card p-6">
                <p className="text-sm text-text-tertiary">
                  <strong>면책조항:</strong> 본 가이드는 교육 목적으로 작성되었으며 개인 맞춤형 노무 조언이 아닙니다. 위반 여부와 실제 벌금·과태료 금액은 위반 건수·기간·시정 여부 등에 따라 관할 지방고용노동청이 판단합니다. 개별 사안은 고용노동부 상담(1350) 또는 노무 전문가와 상의하세요. 본 콘텐츠는 2026-08-06 기준으로 작성됐으며, 인용 법조항은 <strong>근로기준법 §17·§114, 기간제 및 단시간근로자 보호 등에 관한 법률 §17·§24</strong>입니다. AI 보조 작성 후 운영자 검수 완료.
                </p>
                <p className="text-sm text-text-tertiary">
                  <strong>참고 자료</strong>:{' '}
                  <a href="https://www.law.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">법제처 국가법령정보센터</a>,{' '}
                  <a href="https://www.moel.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">고용노동부</a>,{' '}
                  <a href="https://www.easylaw.go.kr/" target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 underline">찾기쉬운 생활법령정보</a>.
                </p>
              </section>

              <ShareButtons
                title="근로계약서 작성 의무 2026 가이드"
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
