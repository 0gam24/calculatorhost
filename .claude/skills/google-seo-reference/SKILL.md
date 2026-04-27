---
name: google-seo-reference
description: |
  Google Search Central 공식 SEO 가이드라인 참조. seo-auditor·content-writer·frontend-builder 에이전트가
  SEO 검토, 구조화 데이터 추가, 메타태그 작성, 페이지 경험 최적화, E-E-A-T 점검 시 트리거.
  "SEO 체크해줘", "구조화 데이터 추가", "메타 설명 작성", "FAQ 스키마", "Core Web Vitals 점검",
  "검색 순위", "Google 색인", "robots.txt", "sitemap", "canonical" 등 요청 시 자동 호출.
---

# Google SEO Reference Skill

Google Search Central 공식 문서(2026년 기준) 기반으로 calculatorhost.com의 검색 엔진 최적화를 지원한다.

## 워크플로우

### 상황 1: "SEO 체크" / "SEO 감사" 요청
1. 대상 페이지 경로 확인 (없으면 물어봄)
2. `REFERENCE.md`의 §2(페이지 최적화), §6(구조화 데이터), §7(페이지 경험) 체크리스트를 해당 페이지에 적용
3. 각 항목별 ✅/⚠️/❌ 판정 + 구체적 수정 지시
4. 실패 항목만 요약 반환

### 상황 2: "구조화 데이터 추가" 요청
1. 페이지 유형 판별 (계산기 / FAQ / 가이드 / 사전)
2. `REFERENCE.md` §6.1-§6.5에서 해당 스키마 템플릿 조회
3. `src/lib/seo/jsonld.ts` 헬퍼 호출 또는 신규 추가
4. Google Rich Results Test 통과 여부까지 확인

### 상황 3: "메타태그 / title / description 작성" 요청
1. `REFERENCE.md` §2.2, §2.3의 원칙 적용
2. 한국어 검색 의도 키워드 매칭 (`docs/seo-keyword-map.md` 참조)
3. 제목 60자 이하, 설명 155자 이하 원칙 준수
4. 제시한 값 3-5개 옵션 + 추천 이유

### 상황 4: "Core Web Vitals 개선" 요청
1. `lighthouse-profiler` 에이전트 결과를 입력으로 받음
2. `REFERENCE.md` §7의 LCP/INP/CLS 기준으로 진단
3. 구체적 수정 지시 (예: "AdSense 스크립트 strategy='lazyOnload' 전환")

### 상황 5: "콘텐츠 품질 자가평가" 요청
1. `REFERENCE.md` §8(E-E-A-T, YMYL)의 자가평가 질문 전체 적용
2. 계산기 사이트는 **YMYL**(금융·세금) 주제에 해당 → 엄격한 E-E-A-T 기준 적용
3. 위반 항목 발견 시 즉시 중단하고 사용자에게 에스컬레이션

## 통과 기준 (Gate)
- 모든 계산기 페이지: `<title>`, `<meta description>`, canonical, JSON-LD(`SoftwareApplication` + `FAQPage` + `BreadcrumbList`) 4종 필수
- LCP < 2.5s, INP < 200ms, CLS < 0.1
- 모바일 친화성 테스트 통과
- AI 생성 콘텐츠는 명시적 공개 문구 포함

## 호출 규칙
- 세부 규정은 절대 추측하지 말고 `REFERENCE.md`를 읽어 확인
- Google 정책은 수시 변경 → 의심 시 "REFERENCE.md는 2026-04 기준"임을 사용자에게 고지
- YMYL 주제(건강/금융/세금)는 특별 기준 적용
