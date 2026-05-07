# Ralph 운영 가이드 (YORO Phase P)

**계산기호스트 자동 모니터링 에이전트**. 매일 03:00 KST에 코드 건강도·정책·성능을 감시합니다.

---

## 1. Ralph가 매일 하는 일 (03:00 KST)

### 단계 1: 메타데이터 감시 (`ralph:meta`)
- 모든 페이지의 OG 태그(title/description/image) 확인
- 규칙: description 80-155자 준수 여부
- 발견 시: `.claude/reports/ralph-meta-audit-{date}.md` 생성 → Issue 생성

### 단계 2: 링크 건강도 (`ralph:link-health`)
- content/ 및 docs/ 내 외부 링크 모두 스캔
- 404/타임아웃(>5초)/리다이렉트 감지
- 발견 시: `.claude/reports/ralph-link-health-{date}.md` 생성

### 단계 3: 동기화 상태 (`sync:health`)
- 공공데이터 API 신선도 체크
- 마지막 동기화 이후 경과일 확인
- 임계값 7일 초과 → WARN, 30일 초과 → ERROR

### 단계 4: 발사 체크리스트 (`launch:checklist`)
- ads.txt 존재 및 형식 검증
- /privacy, /terms, /contact 페이지 확인
- robots.txt 정상 작동 여부

### 단계 5-7: 코드 검증
- 타입체크 (`npm run typecheck`)
- 단위 테스트 (`npm test`)
- AdSense 정책 감시 (`audit:adsense`)

---

## 2. 결과를 어디서 보는가

### 2-1. 정상 (모두 통과)
```
✅ Progress updated: .claude/progress.md
📊 Daily report: ./.claude/reports/ralph-daily-{YYYY-MM-DD}.md
   → 8개 점검 결과 요약 테이블
```
**확인**: GitHub Actions artifact 탭 또는 로컬 `.claude/reports/`

### 2-2. 문제 발견 (1개 이상 실패)
```
🚨 Automatic GitHub Issue 생성
   Title: "[Ralph] Daily Audit Alert — {날짜}"
   Body: 실패한 점검 목록 + 로그 링크

📄 상세 리포트: ./.claude/reports/ralph-meta-audit-{date}.md 등
```
**확인**: GitHub Issues 탭 또는 메일 알림

### 2-3. 차단된 상황 (.claude/stuck.md 생성)
```
⛔ Ralph가 문제를 자동 해결할 수 없음
   → 운영자 수동 개입 필요
   → 예: 외부 서비스 장애, 의존성 충돌 등

📋 차단 사항: ./.claude/stuck.md
```
**확인 및 해결**:
1. `.claude/stuck.md` 내용 읽기
2. 원인 파악 및 수동 해결 (운영자)
3. `rm .claude/stuck.md` (파일 삭제)
4. 다음 자동 실행 대기

---

## 3. 운영자 액션 매트릭스

| 상황 | 신호 | 운영자 액션 | 소요시간 |
|---|---|---|---|
| **정상** | GitHub Actions PASS ✅ | 없음 (자동 진행) | 0분 |
| **Meta 규칙 위반** | Issue: "description 초과" | `.claude/reports/` 읽고 src/app 수정 + commit | 10분 |
| **외부 링크 404** | Issue: "link-health fail" | content/ 의 링크 URL 갱신 또는 삭제 | 5-15분 |
| **API 신선도 경고** | Issue: "sync health WARN" | `npm run sync-data` 수동 실행 + commit | 5분 |
| **테스트 실패** | Issue: "Tests failed" | 상세 로그 보고 src/lib 또는 tests/ 수정 | 15-30분 |
| **차단됨** | `.claude/stuck.md` 생성 | stuck.md 읽기 → 원인 해결 → 파일 삭제 | 30분+ |

---

## 4. 비활성화 / 수동 트리거

### 일시 중지 (휴가·유지보수)
```bash
# GitHub 웹 UI:
Actions 탭 → "Ralph — Daily Monitoring" → ⋯ → Disable workflow

# 복구:
같은 메뉴 → Enable workflow
```

### 수동 실행 (지금 바로)
```bash
# GitHub 웹 UI:
Actions 탭 → "Ralph — Daily Monitoring" → Run workflow

# CLI:
gh workflow run ralph-daily.yml
```

### 로컬 테스트 (개발 중)
```bash
npm run ralph:meta          # 메타 감시만
npm run ralph:link-health   # 링크만
npm run sync:health         # API 동기화만
npm run launch:checklist    # 발사 체크만

# 통합 (orchestrator 실행)
node scripts/ralph-orchestrator.mjs
```

---

## 5. 예제: 메타 규칙 위반 대응

### 시나리오
```
GitHub Issue 생성:
Title: [Ralph] Daily Audit Alert — 2026-05-08
Body:
🔴 Meta Audit Failed
  src/app/calculator/salary/page.tsx
  - description: 189자 (규칙: 80-155자) → 34자 초과
```

### 운영자 액션
```bash
# 1. 상세 리포트 확인
cat .claude/reports/ralph-meta-audit-2026-05-08.md

# 2. 파일 열고 description 수정
src/app/calculator/salary/page.tsx
# 라인 위치: metadata.description = "..."
# 수정: 155자 이내로 줄임

# 3. 검증
npm run ralph:meta
# "✅ All descriptions within limits"

# 4. 커밋
git add src/app/calculator/salary/page.tsx
git commit -m "ralph(meta): salary description 길이 준수 (189→148자)"

# 5. 다음 자동 실행 (내일 03:00)
# 또는 수동: gh workflow run ralph-daily.yml
```

---

## 6. Ralph가 할 수 없는 것 (운영자만)

❌ **Ralph 자동 불가**:
- `git push` (원격 저장소 변경)
- AdSense 신청 (수동 게이트)
- DNS 설정 변경
- `.env.production` 작성
- 외부 API 키 발급

✅ **Ralph 자동 가능**:
- 메타 규칙 위반 감지
- 테스트 실패 감지
- 정책 위반 감지
- 자동 commit (문제 수정 후)
- GitHub Issues 생성

---

## 7. FAQ

**Q. 매일 Issue가 생성된다. 너무 많지 않나?**
A. 점검이 심하다는 뜻. `.claude/stuck.md` 를 보고 뿌리 원인을 해결하면 Issue 감소.

**Q. Ralph를 원격 서버에서 실행할 수 있나?**
A. GitHub Actions가 자동 실행하므로 필요 없음. 로컬에서는 `npm run ralph:meta` 등으로 수동 테스트 가능.

**Q. stuck.md 파일을 실수로 삭제했다.**
A. Ralph가 다음 자동 실행(내일 03:00)에 다시 생성. 또는 수동으로 `gh workflow run ralph-daily.yml`.

**Q. 모든 점검을 통과했다. 뭐 다음?**
A. `.claude/progress.md` 갱신. 특별 조치 불필요. 다음 날 자동 실행.

---

## 8. 모니터링 대시보드 (선택)

`.claude/reports/` 디렉토리 구조:
```
.claude/reports/
├── ralph-daily-2026-05-08.md       # 종합 요약
├── ralph-meta-audit-2026-05-08.md  # 메타 상세
├── ralph-link-health-2026-05-08.md # 링크 상세
└── phase-m-build-validation.md     # 과거 체크포인트
```

웹 대시보드 (미구현, 추후):
- GitHub Actions Artifacts 탭에서 한 번에 조회 가능

---

**Ralph 시작**: GitHub Actions는 자동. 수동 실행: `gh workflow run ralph-daily.yml`
