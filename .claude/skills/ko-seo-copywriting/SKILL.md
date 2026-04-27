---
name: ko-seo-copywriting
description: |
  한국어 SEO 카피라이팅 가이드. content-writer 에이전트가 계산기 설명, FAQ, 용어사전,
  가이드 블로그, 메타태그 한국어 텍스트 작성 시 트리거.
  "콘텐츠 작성", "FAQ 써줘", "가이드 글", "설명 문구", "용어 정의", "메타 한국어" 요청 시 자동 호출.
---

# Korean SEO Copywriting Skill

## 워크플로우

### 상황 1: 계산기 페이지 본문 작성
1. `docs/calculator-spec/{name}.md` 명세 확인
2. `REFERENCE.md` §2(구조), §3(FAQ), §4(용어) 템플릿 적용
3. `docs/seo-keyword-map.md`에서 타깃 키워드 확인
4. 2000~2500자 본문 작성 (계산기 UI 제외)
5. 자연스러운 키워드 밀도 (2-3%)

### 상황 2: FAQ 작성
1. Google People Also Ask 조사 (seo-auditor 협업)
2. `REFERENCE.md` §3 원칙 적용
3. 5-8개 Q&A, 각 답변 100-200자

### 상황 3: 용어사전 작성
1. 용어 정의 + 영문 병기 + 관련 법조항
2. 150-300자, 예시 포함

### 상황 4: 메타태그 한국어
1. title 55-60자, description 150-155자
2. 검색 의도 키워드 선두

## 통과 기준
- 키워드 스터핑 없음
- 각 섹션 고유한 정보 가치
- 한국어 맞춤법/띄어쓰기
- E-E-A-T 신호 포함 (법조항/공식 출처)
- seo-auditor 감사 통과
