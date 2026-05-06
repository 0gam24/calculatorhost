# YORO Phase M — Playwright 풀스위트 + 종합 검증

**실행일**: 2026-05-06  
**상태**: 발사 대기 (TypeCheck 블로킹 1건)

## 단계별 결과

| 단계 | 항목 | 상태 | 상세 |
|---|---|---|---|
| 1 | 단위 테스트 (Vitest) | ✅ PASS | 852 tests, 282 suites 완전 통과 |
| 2 | E2E (Chromium) | ✅ PASS | 52/52 테스트 통과 (47.8초) |
| 3 | E2E (Mobile/Pixel7) | ⚠️ 52/52 PASS + 1 FAIL | 52 passed, 1 failed (가이드 라우팅) |
| 4 | 시각 회귀 (Visual) | ✅ PASS | 20/20 테스트 통과 (53.4초) |
| 5 | TypeCheck | ❌ FAIL | 4 에러 (FaqSection props, severance enum) |
| 6 | Lint (ESLint) | ✅ PASS | No warnings or errors |
| 7 | Build (Next.js) | ❌ FAIL | TypeCheck 에러로 빌드 차단 |
| 8 | AdSense 정책 | ✅ PASS | 광고 슬롯 5개 정책 E2E 검증 |
| 9 | 발사 체크리스트 | ❌ BLOCKED | TypeCheck 블로킹 |

---

## 실패 케이스 상세

### 1. Mobile E2E: 라우팅 테스트 (1건)
**경로**: `tests/e2e/routing.e2e.ts:34`  
**테스트**: 신규 가이드 2개 라우팅 확인  
**증상**: `GET /guide/jeonse-deposit-safety/` → 404 Not Found  
**원인**: 가이드 페이지 미배포 또는 라우트 정의 누락 의심  
**영향**: Mobile 프로젝트만 (Chromium 동일 테스트는 PASS로 보고됨)

### 2. TypeCheck: FaqSection Props 타입 에러 (2건)
**파일**:  
- `src/app/guide/capital-gains-tax-5-steps/page.tsx:279`
- `src/app/guide/jeonse-deposit-safety/page.tsx:236`

**증상**:
```
Type '{ title: string; items: ... }' is not assignable to 'FaqSectionProps'
Property 'title' does not exist on type 'IntrinsicAttributes & FaqSectionProps'.
```

**분석**: FaqSection 컴포넌트 인터페이스와 호출부 props 불일치. 신규 가이드 페이지가 컴포넌트 정의와 다른 props를 전달하는 중.

### 3. TypeCheck: Severance Enum 타입 에러 (2건)
**파일**: `tests/unit/tax/cross-verification.test.ts:2246, 2289`  
**증상**:
```
Type '"excluded"' is not assignable to type 'SeveranceInclusion'
```

**분석**: 테스트 케이스가 'excluded' 리터럴을 사용하나 SeveranceInclusion enum이 다른 값 정의.

---

## 핵심 지표

### 테스트 커버리지
- 단위 테스트: 852건 (tax 90%+, finance 92%+ 달성)
- E2E (Chromium): 52/52 ✅
- E2E (Mobile): 52/52 ✅ (라우팅 제외)
- 시각 회귀: 20/20 ✅
- **E2E 골든패스 5종**: 모두 PASS

### 성능 (Playwright 실행 시간)
- Chromium: 47.8초
- Mobile: 30.2초
- Visual: 53.4초
- 총합: 131초 (순차 실행)

---

## 발사 판정

**상태**: ❌ **NOT READY**

**블로킹 원인**:
1. TypeCheck 4건 미해결 → Build 실패
2. Mobile 라우팅 1건 미해결 (가이드 페이지 누락)

**다음 단계**:
- frontend-builder: FaqSection props 인터페이스 + 신규 가이드 페이지 배포 (라우팅)
- calc-logic-verifier: SeveranceInclusion enum 검증 및 테스트 수정
- TypeCheck 통과 후 Build 재실행
- Chromium 라우팅 테스트도 모두 PASS 확인 후 발사 go

**차단 에이전트 호출**: frontend-builder + calc-logic-verifier

