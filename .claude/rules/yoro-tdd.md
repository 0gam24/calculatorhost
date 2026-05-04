# YORO + TDD 운영 룰

> **Status**: 영구 적용 룰. 모든 세션에서 자동 로드.
> **Last updated**: 2026-05-04

## 1. 정의

- **YORO (You Only Run Once)**: 사용자가 명시적으로 룰을 차단하지 않는 한, Phase A→F 로드맵을 자율적으로 끝까지 실행. 중간 보고는 *결과 단위*로만(에이전트 호출 후, 테스트 통과 후, 빌드 성공 후), 의사결정 분기점에서만 사용자에게 묻는다.
- **TDD (Test-Driven Development)**: RED → GREEN → REFACTOR 사이클을 비타협 적용. 테스트가 변화의 진실 공급원.

## 2. RED-GREEN-REFACTOR 룰

### 2-1. 모든 신규 코드 작업 시작점 = 실패하는 테스트
- 새 계산 함수 → `tests/unit/{tax|finance|utils}/*.test.ts` 먼저
- 새 컴포넌트 동작 → `tests/unit/components/*.test.tsx` 먼저
- 새 페이지 골든패스 → `tests/e2e/*.e2e.ts` 먼저
- **예외**: 순수 스타일·복사문구·메타 텍스트 변경은 단위 테스트 면제 (E2E·시각 회귀로 커버)

### 2-2. RED 단계
1. 테스트 작성 후 `npm test -- <patten>` 또는 `npm run test:e2e` 실행
2. 반드시 한 번은 **실패**를 확인 (테스트가 실제로 검증하고 있음을 증명)
3. 실패 메시지가 의도와 일치하는지 확인 (오타·잘못된 셀렉터로 fail 하면 가짜 RED)

### 2-3. GREEN 단계
1. **최소 구현**으로 통과 (over-engineering 금지)
2. `npm test` + `npm run typecheck` + `npm run lint` 통과 시점에만 다음 단계
3. 통과를 위해 테스트를 약화시키는 행위 금지 (테스트 삭제·skip·기대값 완화)

### 2-4. REFACTOR 단계
- 통과 상태 유지하며 중복 제거·네이밍 개선
- 변경 후 테스트 재실행 (그린 유지 확인)
- 리팩토링이 실패를 초래하면 즉시 되돌림

## 3. 커버리지 게이트 (영구)

| 영역 | 라인 임계 | 분기 임계 | 사유 |
|---|---|---|---|
| `src/lib/tax/**` | **90%** | 85% | YMYL 핵심, 누진세 분기 다수 |
| `src/lib/finance/**` | **92%** | 88% | 금리·DSR 등 단일 공식, 임계 높임 |
| `src/lib/utils/**` | 80% | 75% | 단순 변환 |
| `src/lib/seo/**` | 70% | 60% | JSON-LD 헬퍼 |
| `src/components/calculator/**` | 70% | 60% | 통합 동작은 E2E로 보강 |

**위반 시 PR 차단**. `vitest.config.ts` 의 `test.coverage.thresholds` 로 강제.

## 4. E2E 골든패스 (필수 5종, 영구 유지)

1. `salary.e2e.ts` — 연봉 5,000만 → 월 약 292만 (±1% 허용)
2. `loan-limit.e2e.ts` — DSR 슬라이더 조작 → 한도 실시간 갱신
3. `theme.e2e.ts` — 다크↔라이트 토글 + localStorage 새로고침 유지
4. `routing.e2e.ts` — 홈 → /category/tax → /calculator/capital-gains-tax 네비
5. `adsense.e2e.ts` — 다크모드에서도 광고 슬롯 배경 `#FFFFFF` 강제

추가 골든패스는 새 페이지·기능 추가 시 동시에 작성. **배포 전 5종 모두 PASS** 필수.

## 5. YORO 자율 실행 한계

자율 실행하되 다음은 **반드시 사용자 승인 후**:
- ❌ `git push`, `git push --force`, 원격 자원 변경
- ❌ Cloudflare Pages 배포 트리거
- ❌ AdSense 신청 제출 (수동 단계 — 패키징만 자율)
- ❌ DNS 변경, 도메인 설정, 결제 관련
- ❌ `.env.production*` 작성, 외부 API 키 발급 신청
- ❌ npm 패키지 메이저 버전 업그레이드
- ❌ `package.json` 의존성 *제거*

자율 실행 허용:
- ✅ `tests/**`, `src/**`, `docs/**`, `.claude/**` 편집
- ✅ `vitest.config.ts`·`playwright.config.ts`·`.lighthouserc.json` 임계 강화
- ✅ npm devDependency 추가 (테스트·린트 도구), 마이너·패치 업그레이드
- ✅ `git add` + `git commit` (커밋 메시지에 YORO 단계 명시)

## 6. YORO 진행 보고 형식

매 Phase 완료 시 `.claude/checkpoints/YYYY-MM-DD-yoro-<phase>.md` 작성:
```
# YORO {phase} — {date}
- RED: 작성한 실패 테스트 N개
- GREEN: 통과시킨 테스트 N개, 변경 파일 목록
- REFACTOR: 정리한 항목
- Coverage Δ: tax {prev→new}%, finance {prev→new}%
- 다음 단계: {next phase}
- 차단 이슈: {blocking issue or "none"}
```

`.claude/progress.md` 에는 한 줄 요약 누적.

## 7. 위반 시 행동

- 테스트 없이 src/ 변경 → 즉시 되돌리고 RED 단계부터 재시작
- 커버리지 임계 미달 → PR 차단 (CI 게이트)
- E2E 5종 중 하나라도 실패 → 배포 단계 진입 금지
- "이번만 예외" 금지. 룰 변경은 ADR(`docs/adr/`)을 통해서만.

## 8. 룰 진입점

- `.claude/CLAUDE.md` 의 "에이전트 호출 우선순위" 다음에 본 룰 링크
- 모든 에이전트 시스템 프롬프트는 본 룰을 인지한 상태로 작업
- `/loop` 자율 모드, 백그라운드 작업도 본 룰을 따른다
