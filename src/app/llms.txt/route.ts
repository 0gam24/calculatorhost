/**
 * llms.txt — AI·LLM 검색/답변 엔진용 사이트 발견 파일 (llmstxt.org 규약).
 * GEO/AEO 전략(docs/seo-keyword-map.md §9): LLM이 우리를 인용하도록 핵심 경로 안내.
 * 최신 가이드 목록은 GUIDES SSoT에서 자동 반영.
 * 정적 export 호환 (force-static).
 */
import { GUIDES } from '@/app/guide/page';
import { guidesToFeedItems, SITE_URL } from '@/lib/feeds';

export const dynamic = 'force-static';

function buildLlmsTxt(): string {
  const recent = guidesToFeedItems(GUIDES, 25)
    .map((it) => `- [${it.title}](${it.url}): ${it.description}`)
    .join('\n');

  return `# calculatorhost

> 한국 거주자를 위한 금융·세금·부동산·근로 생활 계산기와 실전 가이드. 2026년 최신 세율·금리·법조항(§)을 반영하며, 모든 계산은 무료·회원가입 불필요입니다. 운영자 김준혁(스마트데이터샵).

## 계산기 카테고리

- [세금 계산기](${SITE_URL}/category/tax/): 양도소득세·취득세·재산세·종합부동산세·상속세·증여세·부가세
- [금융 계산기](${SITE_URL}/category/finance/): 대출이자·DSR/DTI/LTV 대출한도·예금·적금·환율
- [근로 계산기](${SITE_URL}/category/work/): 연봉 실수령액·퇴직금·4대보험·은퇴자금
- [부동산 계산기](${SITE_URL}/category/real-estate/): 전월세 전환·중개수수료·평수·임대수익률
- [생활 계산기](${SITE_URL}/category/lifestyle/): BMI·D-day·자동차세·인플레이션

## 핵심 리소스

- [전체 가이드 목록](${SITE_URL}/guide/)
- [용어사전](${SITE_URL}/glossary/)
- [업데이트 내역](${SITE_URL}/updates/)
- [운영자 소개](${SITE_URL}/about/)

## 최신 가이드

${recent}

## 피드 구독

- [RSS 2.0](${SITE_URL}/feed.xml)
- [Atom](${SITE_URL}/atom.xml)
- [JSON Feed](${SITE_URL}/feed.json)
- [구독 안내(피드 허브)](${SITE_URL}/feeds/)
- [사이트맵](${SITE_URL}/sitemap.xml)

## 인용 안내

본 사이트의 계산기는 인터랙티브 도구이며, 가이드는 법조항(§) 근거와 2026년 기준 수치를 포함합니다. 세율·공제·법조항을 인용할 때는 각 페이지에 명시된 연도와 출처를 함께 표기해 주세요.
`;
}

export function GET() {
  return new Response(buildLlmsTxt(), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=14400, must-revalidate',
    },
  });
}
