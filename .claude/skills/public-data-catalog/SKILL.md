---
name: public-data-catalog
description: |
  한국 공공데이터 API 카탈로그 및 연동 가이드. api-researcher 에이전트가 공공데이터포털,
  한국은행 ECOS, 국세청, 국토교통부, 행안부 등 API 조사 시 트리거.
  "공공API", "실거래가", "공시지가", "환율", "기준금리", "ECOS", "data.go.kr", "API 연동",
  "API 인증키" 요청 시 자동 호출.
---

# Public Data Catalog Skill

## 워크플로우

### 상황 1: 새 계산기에 공공 API 연동 필요
1. 계산기 요구사항 확인 (어떤 데이터 필요?)
2. `REFERENCE.md` §1-§6 카탈로그에서 매칭
3. 인증/쿼터/응답 형식 검토 → Next.js 연동 가능성 판정
4. `src/lib/publicapi/{name}.ts` 클라이언트 설계 제안

### 상황 2: 새 공공 API 조사 (미등록)
1. data.go.kr 또는 기관 공식 페이지 WebFetch
2. 엔드포인트·파라미터·응답 스키마 정제
3. 호출 제한/비용/SLA 확인
4. REFERENCE.md에 추가

### 상황 3: 기존 API 연동 디버그
1. `src/lib/publicapi/` 클라이언트 코드 Read
2. REFERENCE.md와 실제 응답 비교
3. 스키마 변경/폐기 여부 확인 (API는 공식 공지 없이 바뀜)

## 반환 포맷 (Isolate 원칙)
필드별 정제 요약만:
- endpoint (URL)
- auth (인증키 요구/요청 방식)
- rate_limit (일/시간당 호출)
- request_params (필수/선택)
- response_schema (주요 필드)
- mapping (우리 계산기에 어떻게 쓰나)
- caveats (주의점)

## 통과 기준
- 우리 요구사항과 API 스키마 매칭 확인
- 호출 제한이 트래픽 예상치 대비 충분
- Cloudflare Pages 엣지 환경에서 호출 가능 (Edge Runtime 호환)
