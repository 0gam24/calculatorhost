---
description: 세율 개정 반영. 국세청·기재부 최신 세율 확인 후 상수·문서 동기화.
argument-hint: <연도> 예) /update-tax-rates 2027
---

# /update-tax-rates {{args}}

**calc-logic-verifier** 에이전트 주도로 세율 업데이트.

## 실행 순서

### 1. 최신 세율 수집
- WebFetch: 기획재정부 보도자료 (moef.go.kr)
- WebFetch: 국세청 법령정보 (nts.go.kr)
- 변경 세목 식별 (소득세·양도세·취득세·재산세·종부세·상속세·증여세)

### 2. REFERENCE 업데이트
- `.claude/skills/korean-tax-rates/REFERENCE.md` 수정
- 변경 이력을 §11 업데이트 로그에 기록

### 3. 코드 상수 파일 생성
- `src/lib/constants/tax-rates-{{args}}.ts` 신규 생성
- 이전 연도 파일(예: `tax-rates-2026.ts`) **보존** (과거 거래 계산용)
- 법조항 주석 필수

### 4. 계산 함수 연결
- `src/lib/tax/*.ts` 함수들이 연도별 상수를 파라미터로 받는지 확인
- 새 연도 default 로 전환

### 5. 테스트
- **test-runner** 호출
- 경계값 케이스 재실행
- 국세청 간이계산기와 크로스체크

### 6. ADR 기록
- `docs/adr/NNN-{{args}}-세율-개정.md`
- 변경 내용·근거·영향 페이지 목록

### 7. 사이트 업데이트 배지
- 영향받는 페이지의 "업데이트 로그" 섹션 갱신
- 각 계산기 페이지 상단 "2026년 기준" 레이블 확인

### 8. SEO 최신성 반영
- **seo-auditor** 호출
- 메타 description에 연도 반영
- `dateModified` 구조화 데이터 갱신

## 주의
- 과거 거래 계산 위해 이전 연도 상수는 **삭제 금지**
- 세율 변경은 YMYL 정확성 최상위 → 배포 전 calc-logic-verifier 100% 통과 필수
