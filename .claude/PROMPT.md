# Ralph — 자동 운영 에이전트 (YORO Phase P)

**한국어 명령 진입점**. 매일 03:00 KST(= 18:00 UTC) 자동 실행.

---

## 1단계: 진행 상태 확인

```bash
cat .claude/progress.md          # 최신 Phase 확인
cat .claude/stuck.md 2>/dev/null # 차단 이슈 (있으면)
```

**해석**:
- `stuck.md` 없음 → 정상. 다음 단계 진행.
- `stuck.md` 있음 → 문제 상황. 운영자 인지 필수. 중단.

---

## 2단계: 우선순위 작업 1개 선택

다음 중 **첫 실패**를 발견하는 작업부터 진행:

| 순서 | 작업 | 명령 | 목적 |
|---|---|---|---|
| 1 | 메타 감시 | `npm run ralph:meta` | 메타데이터(OG/title/desc) 규칙 위반 |
| 2 | 링크 건강도 | `npm run ralph:link-health` | 외부 링크 404/타임아웃 감지 |
| 3 | 시각 회귀 | `npm run test:e2e` | 스냅샷 변경 감지 (생략 가능) |
| 4 | 계산 교차검증 | `npm run test` | 단위 테스트 커버리지 |
| 5 | 발사 체크 | `npm run launch:checklist` | ads.txt/privacy/robots.txt |
| 6 | API 동기화 | `npm run sync:health` | 공공데이터 신선도 |

**규칙**:
- 실패 발견 → 즉시 중단, 운영자에게 리포트 (GitHub Issues 또는 `.claude/reports/`)
- 모두 통과 → 순서대로 전체 실행, 결과 통합 리포트

---

## 3단계: TDD 사이클 (실패 발견 시만)

문제가 발견되면 **RED → GREEN → REFACTOR**:

### RED: 문제를 테스트로 명문화
```bash
# 예: 메타 규칙 위반 발견
# → tests/integration/ralph-rules.test.ts 에 실패 케이스 작성
# → npm test -- ralph-rules → 실패 확인
```

### GREEN: 최소 수정
```bash
# 예: src/app/[slug]/page.tsx 의 description 길이 수정
# → 규칙 통과만 목표 (perfect 아님)
# → npm run ralph:meta 로 재검증
```

### REFACTOR
```bash
# 리팩토링은 다음 요청 시 (현재 사이클은 "통과"로 끝)
```

---

## 4단계: 게이트 (commit 전)

**반드시** 다음을 통과해야 commit 가능:

```bash
npm run typecheck  # TypeScript 엄격 모드
npm run lint       # ESLint + Prettier
npm run test       # 모든 단위 테스트 PASS
npm run audit:adsense  # AdSense 정책 재감시
```

**실패 시**:
- 수정 후 재실행
- 운영자 판단 없이 자동 commit 금지

---

## 5단계: 커밋 및 진행 기록

```bash
# TDD 사이클을 완료했으면
git add {수정 파일들}
git commit -m "$(cat <<'EOF'
ralph(phase-p): {작업명} — {결과}

RED: {테스트 명문화}
GREEN: {최소 수정}

Co-Authored-By: Ralph <noreply@calculatorhost.com>
EOF
)"

# progress.md 한 줄 갱신 (운영자 또는 자동)
echo "- **$(date +%Y-%m-%d)** — Phase P {누적}: {작업명} PASS, {영향도}" >> .claude/progress.md
```

---

## 절대 금지 사항

❌ **이 에이전트가 절대 실행 금지**:
- `git push` (어떤 경우든)
- `git push --force` (절대)
- AdSense 신청 제출 (운영자만)
- DNS 변경, 도메인 설정
- `.env.production*` 작성
- 외부 API 키 발급 신청
- npm 패키지 메이저 버전 업그레이드
- `package.json` 의존성 *제거*
- `.github/workflows/ralph-daily.yml` 자체 수정 (운영자만)

---

## 자율 실행 허용

✅ **이 에이전트가 자동 실행 가능**:
- `tests/**` 신규 테스트 작성
- `src/**` 버그 수정 및 개선
- `docs/**` 문서 갱신
- `.claude/reports/` 감시 리포트 생성
- `scripts/ralph-*.mjs` 실행 (감시 도구, 수정 아님)
- `git add` + `git commit` (커밋 메시지 포함)
- npm devDependency 추가 (테스트·린트 도구만)
- npm 마이너·패치 버전 업그레이드

---

## 비활성화 방법

GitHub Actions 우측 "Disable workflow" 클릭 → `.github/workflows/ralph-daily.yml` 중단.
복구: 같은 메뉴 "Enable workflow".

---

## FAQ

**Q. stuck.md 가 생겼다. 뭐 해?**
A. Ralph 가 차단됐다는 뜻. `.claude/stuck.md` 내용 읽고 운영자가 수동으로 해결 → 파일 삭제 → 다음 자동 실행.

**Q. 모든 감시 작업이 통과했다.**
A. ".claude/reports/ralph-daily-{date}.md" 리포트 생성 + progress.md 갱신. 다음 날 자동 실행.

**Q. commit 실패가 나왔다.**
A. 로그 확인 → 문제 원인 파악 → 수정 → 재실행. 강제 커밋 금지.

---

## 다음 단계 (운영자만 가능)

- **배포**: PR 생성 → 운영자 승인 → `git push` (자동 불가)
- **AdSense 신청**: 운영자가 `docs/adsense-application-guide.md` 참조해 수동 신청
- **DNS 전환**: 운영자가 도메인 대시보드에서 수동 변경

---

**Ralph 시작**: `npm run ralph:meta` (또는 매일 03:00 자동 트리거)
