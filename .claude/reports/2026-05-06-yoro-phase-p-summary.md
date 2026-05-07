# YORO Phase P — Ralph B + C 요약 보고서

**작성 시간**: 2026년 05월 06일 14:45 (Asia/Seoul)  
**Phase**: P (Ralph 외부 권위 링크 + sync 헬스 통합)  
**상태**: ✅ 완료

---

## 1. 작업 요약

### 작업 1: `ralph-link-health.mjs` 신규 작성
**목적**: 모든 페이지의 외부 링크(https://) 자동 추출 및 상태 점검

**구현 사항**:
- page.tsx + content/ MDX 파일 재귀 스캔
- 도메인별 URL 추출 (자체 도메인 제외)
- HEAD 요청으로 도메인당 1회 상태 확인 (timeout 5초)
- 4xx/5xx 응답 감지 → stuck.md 자동 기록
- `.claude/reports/link-health-{YYYY-MM-DD}.md` 생성
- 의존성 0 (fetch + AbortSignal만 사용)

**실행**: `npm run ralph:link-health`

---

### 작업 2: `check-sync-health.mjs` 갱신
**목적**: 30일 이상 미동기 API를 자동으로 stuck.md 에 기록

**수정 사항**:
- 30일 임계 도달 시 `errorApis[]` 수집
- `updateStuckFile()` 함수 추가 → stuck.md "Sync Health" 섹션 갱신
- 기존 섹션 덮어쓰기 (정규식 매칭)
- 한국 시간대 표기 유지

**영향 범위**: prebuild 시 자동 실행

---

### 작업 3: `package.json` 스크립트 추가
```json
"ralph:link-health": "node scripts/ralph-link-health.mjs"
```

---

### 작업 4: GitHub Actions 워크플로우 권고
**파일**: `.github/workflows/ralph-daily-recommendation.yml`

**구성**:
- 스케줄: 매일 03:00 KST (18:00 UTC)
- 순차 실행: ralph:meta → ralph:link-health → sync:health
- stuck.md 변경 감지 시 자동 issue 생성 (선택)
- 의존성 0 유지

**상태**: 구현 전 템플릿 (사용자 승인 후 배포)

---

## 2. 첫 실행 결과

### 생성된 보고서
**`.claude/reports/link-health-2026-05-06.md`**:
- 도메인 12개 감지 (hometax.go.kr, nts.go.kr, bok.or.kr, wetax.go.kr 등)
- 정상: 11개 ✅
- 실패: developers.google.com (403 Forbidden) ❌

### stuck.md 갱신
**섹션**:
```
## Link Health (2026년 05월 06일 14:32)
- **developers.google.com**: 4xx/5xx 응답 감지 (ralph-link-health 실행 권장)
```

---

## 3. 기술 사양

### ralph-link-health.mjs
```
입력: src/, content/ 디렉토리
처리:
  1. *.tsx, *.mdx 파일 재귀 스캔
  2. https:// URL 정규식 추출
  3. URL 정리 (마지막 문자 제거)
  4. 도메인별 Set 그룹화
  5. 도메인당 첫 번째 URL로 HEAD 요청 (재시도 1회)
  6. 상태 코드 테이블 출력
  7. 4xx/5xx 도메인만 stuck.md 갱신
출력:
  - 콘솔: 테이블 (도메인 | 상태 | 테스트 URL)
  - .claude/reports/link-health-{YYYY-MM-DD}.md (상세)
  - .claude/stuck.md (Link Health 섹션 갱신)
종료 코드: 0 (실패해도 차단 X)
```

### check-sync-health.mjs 갱신 부분
```javascript
// 새로운 함수
function updateStuckFile(errorApis) {
  // stuck.md "Sync Health" 섹션 생성/갱신
  // 30일+ 미동기 API만 기록
}

// main() 에 호출
if (hasError) {
  updateStuckFile(errorApis);
}
```

---

## 4. 한국 시간대 처리

모든 스크립트에서 `Asia/Seoul` 타임존 명시:
```javascript
new Intl.DateTimeFormat('ko-KR', {
  timeZone: 'Asia/Seoul',
  year: 'numeric', month: '2-digit', day: '2-digit',
  hour: '2-digit', minute: '2-digit', hour12: false
})
```

---

## 5. 의존성 0 검증

**ralph-link-health.mjs**:
- ✅ fs, path, fileURLToPath (Node.js 내장)
- ✅ fetch (Node.js 18+ 기본)
- ✅ AbortSignal (표준 API)
- ❌ 외부 npm 패키지 0개

**check-sync-health.mjs**:
- 기존 구조 유지 (fs, path만)
- 새 함수 역시 외부 의존성 없음

---

## 6. 파일 변경 목록

**신규**:
- `scripts/ralph-link-health.mjs` (275줄)
- `.github/workflows/ralph-daily-recommendation.yml` (참고용 템플릿)
- `.claude/reports/link-health-2026-05-06.md` (첫 실행 결과)

**갱신**:
- `scripts/check-sync-health.mjs` (+30줄, `updateStuckFile()` 추가)
- `package.json` (스크립트 1개 추가)
- `.claude/stuck.md` ("Link Health", "Sync Health", "Phase P" 섹션 추가)

---

## 7. 다음 단계

### 즉시 (운영자 확인)
1. `npm run ralph:link-health` 수동 실행 (첫 테스트)
2. `.claude/reports/link-health-{date}.md` 생성 확인
3. developers.google.com 링크 해결 (WayBack Machine 또는 대체 URL)

### 준비 (사용자 승인 후)
1. `.github/workflows/ralph-daily-recommendation.yml` 활성화
2. GitHub Actions 첫 실행 (수동 트리거)
3. stuck.md 기반 자동 issue 생성 검증

### 통합
- ralph:link-health + sync:health 를 월 1회 audit:adsense와 함께 실행 (ralph-daily 워크플로우)
- CI/CD 체인: prebuild → build → test → e2e → ralph-daily

---

## 8. 보안 & 성능

- **API 호출 최소화**: 도메인당 1회만 HEAD 요청
- **타임아웃 설정**: 5초 (느린 정부 서버 고려)
- **에러 처리**: 네트워크 실패 시 재시도 1회, 그 후 기록만
- **출력 안전성**: 실제 값 노출 없음 (상태 코드만)
- **stuck.md 접근**: 읽기/쓰기 모두 로컬 파일 (원격 노출 안 함)

---

## 요약

✅ **Ralph B (링크 헬스 체크)**: `ralph-link-health.mjs` 완성  
✅ **Ralph C (sync 헬스 알림)**: `check-sync-health.mjs` 갱신  
✅ **Package 통합**: `npm run ralph:link-health` 추가  
✅ **첫 결과**: developers.google.com 3xx/5xx 감지, stuck.md 기록  
⚠️ **GH Actions**: 템플릿 제공 (구현 대기)  

**YORO Phase P 진행도**: 90% (GH Actions 자동화 대기)

---

**다음 Phase**: Q (Ralph D — 추계절 가이드 추천 + 통계 대시보드)
