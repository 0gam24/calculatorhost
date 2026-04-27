---
description: 새로운 계산기 페이지를 스캐폴드. 명세 → 공식 → UI → 콘텐츠 → SEO → 광고 → 테스트 순서.
argument-hint: <계산기-한글이름> 예) /new-calculator 연봉실수령액
---

# /new-calculator {{args}}

다음 순서로 새 계산기를 생성한다. 각 단계마다 해당 에이전트에 위임.

## Step 1: 명세 확인
- `docs/calculator-spec/{{args}}.md` 존재 확인
- 없으면: PM 역할로 명세 템플릿 먼저 작성
  - 타깃 페르소나 (docs/audience-personas.md 참조)
  - 입력 파라미터 목록
  - 출력 결과 항목
  - 법조항 근거
  - 타깃 키워드

## Step 2: 공식 설계 & 검증
- **calc-logic-verifier** 에이전트 호출
- 공식 근거: `.claude/skills/korean-tax-rates/REFERENCE.md`
- 순수 함수 설계 → `src/lib/tax/{{args}}.ts` 또는 `src/lib/finance/{{args}}.ts`
- 단위 테스트 케이스 10개 이상 (경계값 + 특례 + 일반)

## Step 3: 공공 API 연동 (필요 시)
- **api-researcher** 에이전트 호출
- `.claude/skills/public-data-catalog/REFERENCE.md` 참조
- 클라이언트 작성: `src/lib/publicapi/`

## Step 4: UI 페이지
- **frontend-builder** 에이전트 호출
- `.claude/skills/design-system-fintech/REFERENCE.md` 토큰 준수
- 경로: `src/app/calculator/{{args}}/page.tsx` (영문 슬러그)
- 공통 템플릿: `src/components/calculator/` 재사용
- **Breadcrumb 컴포넌트**(`@/components/layout/Breadcrumb`) 본문 상단에 필수 삽입

## Step 5: 본문·FAQ·관련 설명
- **content-writer** 에이전트 호출
- `.claude/skills/ko-seo-copywriting/REFERENCE.md` §2 구조 따라 **2000자 이상**
- FAQ 5-8개 (본문 중간 배치)
- **외부 권위 링크 2~3개** 본문에 필수 (E-E-A-T) — `.claude/rules/calculators.md` §외부 권위 링크 카테고리 매핑 참조
  - 링크 속성: `target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 hover:underline"`
- 용어사전 항목 (필요 시 `content/사전/*.mdx` 추가)

## Step 6: SEO 메타 + JSON-LD
- **seo-auditor** 에이전트 호출
- `.claude/skills/google-seo-reference/REFERENCE.md` §13 체크리스트
- title 60자, description 100~155자 (단문 금지)
- canonical/og:image trailing slash 일관 (`https://calculatorhost.com/calculator/{{args}}/`)
- **JSON-LD 6종 모두 의무** (`src/lib/seo/jsonld.ts` 헬퍼):
  1. SoftwareApplication
  2. WebPage (datePublished/dateModified)
  3. BreadcrumbList
  4. FAQPage
  5. HowTo (4~6 step: 입력→설정→계산→결과 확인→면책)
  6. Speakable (핵심 답변 셀렉터)

## Step 7: AdSense 슬롯 배치
- **adsense-guardian** 에이전트 호출
- `.claude/skills/adsense-policy-reference/REFERENCE.md` 준수
- 페이지당 슬롯 ≤ 4개
- 라이트 카드 컨테이너 + min-height

## Step 8: 테스트
- **test-runner** 에이전트 호출
- 단위 테스트 통과 확인
- E2E 스크립트 추가

## Step 9: 성능 확인
- **lighthouse-profiler** 에이전트 호출
- LCP < 2.5s / INP < 200ms / CLS < 0.1 검증

## Step 10: 사이트맵·ADR 업데이트
- `src/app/sitemap.ts` 자동 반영 확인
- `docs/adr/NNN-{{args}}-계산기-추가.md` 작성
- `docs/seo-keyword-map.md` 키워드 매핑 추가

## 통과 기준
모든 단계 통과 시에만 PR 병합. 하나라도 실패 시 해당 에이전트 재호출.
