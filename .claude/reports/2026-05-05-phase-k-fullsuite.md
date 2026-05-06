# Phase K 풀 회귀 검증 리포트
**날짜**: 2026-05-05  
**동적 import / 가이드 +500자 / OG metadata / 6신규 케이스 → 풀 검증**

---

## 7단계 검증 결과

| 단계 | 테스트 | 결과 | 통과 | 시간 | 비고 |
|---|---|---|---|---|---|
| 1️⃣ | `npm test` (Vitest) | ✅ PASS | 840/840 | 13.72s | 37 파일, 전수 통과 |
| 2️⃣ | `npm run typecheck` | ✅ PASS | 0 에러 | <2s | TypeScript strict |
| 3️⃣ | `npm run build` | ⚠️ FAIL→FIX→PASS | ✅ 58 페이지 | 21.4s (2회) | 3건 이슈 수정 |
| 4️⃣ | `npm run lint` | ✅ PASS | 0 경고 | <2s | ESLint OK |
| 5️⃣ | `npm run audit:adsense` | ✅ PASS | 0 위반 | <5s | 정책 안전 |
| 6️⃣ | `npx playwright test` | ❌ FAIL | 6/52 (11.5%) | 180s | 46개 selector 오류 |
| 7️⃣ | 비주얼 회귀 | ⏭️ SKIP | - | - | E2E 우선 수정 필요 |

---

## 빌드 오류 & 해결

### 오류 1: Server Component `ssr: false` 미지원
**파일**: `salary`, `capital-gains-tax`, `loan-limit` 페이지  
**원인**: Next.js 15에서 Server Component 내 `dynamic()` 함수의 `ssr: false` 옵션 제거  
**해결**: 3개 페이지에서 `ssr: false` 라인 제거 (AdSlot dynamic import 유지)

### 오류 2: 미사용 import
**파일**: `loan-limit/page.tsx`  
**원인**: `import { Suspense }` 미사용  
**해결**: 1줄 제거

### 오류 3: .next 디렉토리 오염
**원인**: 빌드 재시도 시 export 디렉토리 충돌  
**해결**: `rm -rf .next` 후 재빌드

---

## E2E 테스트 실패 분석

### 패턴 1: 광고 슬롯 로케이터 (9개 실패)
```
Error: /calculator/loan-limit/ should have ≥3 ad slots
Expected: >= 3
Received: 0
```
**원인**: `aria-label="광고"` 또는 `role="complementary"` 구조 변경  
**영향**: AdSense 감시 테스트 전수 실패

### 패턴 2: 결과 영역 선택자 (30+ 실패)
```
Error: getByRole('region', { name: '계산 결과' }) — locator not found
```
**원인**: 계산기 결과 카드 ARIA 속성 변경 또는 UI 리팩토링  
**영향**: 모든 계산기 "기본값 테스트", "필드 노출 테스트" 실패

### 패턴 3: 폼 필드 selector (7개 실패)
```
Locator: input[id="monthly-deposit"], input[id="purchasePrice"] — not found
```
**원인**: 계산기 입력 필드 id 속성 변경 또는 동적 생성 변경  
**영향**: 금융/세금 계산기 값 입력 테스트 실패

---

## 통과한 E2E 테스트 (6개)
- ✅ routing 기본 URL 검증 (홈→계산기)
- ✅ 카테고리 허브 5개 모두 200 응답
- ✅ 테마 토글 (dark/light mode)
- ✅ 3개 기타 경로 검증

---

## 단계별 상태 총괄

```
빌드 파이프라인:
✅ 소스 → TypeScript ✅ → ESLint ✅ → Next.js 빌드 ✅
                                         ↓
                                  정적 HTML 58개 생성
                                         ↓
                                  AdSense 정책 감시 ✅
                                         ↓
                                  E2E 테스트 ❌ (selector 오류)
                                         
시각 회귀:
⏭️ E2E 선행 완료 시 수행 예정
```

---

## 발사 판정

**현재 상태**: ❌ **발사 불가**

**이유**:
- 빌드 성공 및 정적 자산 생성 완료
- TS/Lint/AdSense 정책 통과
- **그러나 E2E 테스트 46개 실패 → 페이지 렌더링 정상성 미검증**

---

## 권고사항

### 즉시 조치 (test-runner에 위임)
1. **로케이터 갱신**
   - AdSlot 컴포넌트 aria-label 검증
   - 계산 결과 영역 role="region" name="계산 결과" 확인
   - 폼 필드 input[id] 현행 구조 추출

2. **E2E 재작성**
   - 50+ selector 현행화
   - 1회 전수 실행 (선택 아님, 필수)

3. **비주얼 회귀**
   - E2E 선행 완료 후 수행
   - 초기 baseline 갱신 권고

### 원인 분석 (향후)
- Phase K 동안 어느 커밋에서 UI 구조 변경 발생했는지 추적
- 계산기 컴포넌트 리팩토링 이력 검토
- AdSlot/StructuredSummary/계산 결과 카드 변경 내역 확인

---

## 체크리스트

- [x] npm test 통과 (840/840)
- [x] typecheck 통과 (0 에러)
- [x] build 통과 (재시도 포함)
- [x] lint 통과 (0 경고)
- [x] AdSense 감시 통과 (0 위반)
- [ ] E2E test 통과 (6/52 ← **선행 필수**)
- [ ] 비주얼 회귀 통과 (E2E 선행 시)

---

**다음 에이전트**: test-runner (E2E selector 갱신)
