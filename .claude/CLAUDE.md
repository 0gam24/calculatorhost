# calculatorhost 프로젝트 상세 지시사항

## 아키텍처 요약
**5기둥 구조** (Claude Code 하네스 기반):
- **컨텍스트**: WISC 적용 (Write/Isolate/Select/Compress)
- **프롬프트**: CLAUDE.md 4계층 + 경로 규칙
- **스킬**: `.claude/skills/` 7개 (점진적 공개)
- **에이전트**: `.claude/agents/` 8개 전문화
- **하네스**: MCP 3개 (github/playwright/filesystem)

## 폴더 구조
```
calculatorhost/
├── .claude/          ← 하네스 (이 폴더)
├── docs/             ← SSoT 문서 (진실 공급원)
├── content/          ← MDX 콘텐츠 (가이드/사전)
├── src/
│   ├── app/          ← Next.js 라우트 (한글 슬러그)
│   ├── components/   ← UI (calculator/charts/ads/layout/ui)
│   ├── lib/
│   │   ├── tax/      ← 세금 계산 순수 함수
│   │   ├── finance/  ← 금융 계산 순수 함수
│   │   ├── publicapi/← 공공 API 클라이언트
│   │   ├── seo/      ← JSON-LD 헬퍼
│   │   └── constants/← 세율/공제 상수
│   └── styles/
├── tests/            ← unit/e2e/visual
├── scripts/          ← 세율 동기화 등
└── public/           ← ads.txt, robots.txt, favicon
```

## SSoT 거버넌스
다음 문서가 코드보다 상위 진실:
- `docs/architecture.md` — 시스템 설계
- `docs/data-model.md` — 세율/공식 (코드 상수의 출처)
- `docs/api-catalog.md` — 공공 API 스펙
- `docs/seo-keyword-map.md` — 키워드 × 페이지 매핑
- `docs/design-system.md` — 디자인 토큰
- `docs/audience-personas.md` — 7 페르소나
- `docs/calculator-spec/*.md` — 각 계산기 PRD

**규칙**: 문서와 코드 모순 → 문서가 진실. 코드 수정.
**낡은 문서**: `docs/STALE/`로 이동 (참조 금지).

## WISC 컨텍스트 관리
### Write (장기 기억)
- 세션 체크포인트: `.claude/checkpoints/YYYY-MM-DD-topic.md`
- 의사결정 로그(ADR): `docs/adr/NNN-title.md`
- 진행상황: `.claude/progress.md`

### Isolate (서브에이전트 위임)
고비용 탐색은 반드시 서브에이전트에 위임. 대량 로그·API 원문을 메인 컨텍스트에 주입 금지.

### Select (계층적 로드)
- 경로 규칙 `.claude/rules/*.md`가 자동 로드
- 스킬 REFERENCE는 필요 시에만 Bash로 cat

### Compress (80/20 규칙)
- 컨텍스트 80% 도달 시 `/compact`
- 환각 반복 시 `/clear` + 체크포인트 복구

## 에이전트 호출 우선순위
메인 스레드는 **조정자** 역할. 실제 작업은 에이전트에 위임:

| 요청 패턴 | 우선 호출 |
|---|---|
| "UI 만들어" / "컴포넌트" / "레이아웃" | frontend-builder |
| "계산기 만들어" | frontend-builder (UI) + calc-logic-verifier (공식) 순차 |
| "세율 맞아?" / "공식 검증" | calc-logic-verifier |
| "SEO 체크" / "메타 작성" / "JSON-LD" | seo-auditor |
| "FAQ" / "용어 정의" / "본문 작성" | content-writer |
| "공공 API" / "실거래가" / "ECOS" | api-researcher |
| "광고 추가" / "ads.txt" | adsense-guardian |
| "성능" / "Lighthouse" / "CWV" | lighthouse-profiler |
| "테스트 돌려" | test-runner |

복합 작업(예: 새 계산기 추가)은 여러 에이전트 순차 호출:
1. api-researcher (필요 데이터 소스 확인)
2. calc-logic-verifier (공식 설계)
3. frontend-builder (UI)
4. content-writer (본문)
5. seo-auditor (메타/JSON-LD)
6. adsense-guardian (광고 슬롯)
7. test-runner (검증)
8. lighthouse-profiler (CWV 확인)

## 슬래시 커맨드
- `/new-calculator {name}` — 새 계산기 스캐폴드
- `/seo-check {path}` — SEO 감사
- `/audit-adsense {path}` — AdSense 감사
- `/update-tax-rates` — 세율 갱신
- `/deploy` — 배포 체크리스트

## YORO + TDD 운영 모드 (영구 적용, 2026-05-04~)
**룰 본문**: `.claude/rules/yoro-tdd.md` (자동 로드)

핵심:
- **YORO** — Phase A→F 로드맵을 자율 실행. 결과 단위로만 보고. 의사결정 분기·원격 자원 변경·외부 신청은 사용자 승인.
- **TDD** — RED → GREEN → REFACTOR 비타협. src/ 변경 전 tests/ 먼저.
- **커버리지 게이트** — tax 90% / finance 92% / utils 80% (vitest.config.ts 강제, 위반 PR 차단).
- **E2E 골든패스 5종** — salary, loan-limit, theme, routing, adsense. 배포 전 모두 PASS.
- **체크포인트** — Phase 완료마다 `.claude/checkpoints/YYYY-MM-DD-yoro-<phase>.md` + `.claude/progress.md` 한 줄 누적.

## BMAD 진행 상태 (2026-05-11 갱신)
1. ✅ Analyst → 페르소나·키워드
2. ✅ PM → `docs/calculator-spec/*.md`
3. ✅ Architect → `docs/architecture.md`
4. ✅ UX → `docs/design-system.md` (Figma 다크 Fintech)
5. ✅ 하네스 세팅 (rules·agents·skills·commands)
6. ✅ Dev → MVP 26개 계산기 + 911 단위 + E2E 골든패스 18 PASS
7. ✅ 발사 (calculatorhost.com 라이브, AdSense pub-7830821732287404 운영, Cloudflare Pages 배포, DNS 스위치 완료)
8. **현재 (2026-05~)**: 운영 중 (live ops). 신규 기능·콘텐츠·SEO·수익 모니터링·회귀 방지.

> ⚠️ **에이전트 호출 시 outdated "발사 전 / 미신청" 가정 금지**. 현재 상세는 `.claude/STATE.md` 참조.

## 금기사항 (전역)
- ❌ 계산 공식 컴포넌트에 작성
- ❌ 세율 하드코딩
- ❌ 광고 다크 배경
- ❌ 저작권 위반 콘텐츠
- ❌ 자기 클릭 유도
- ❌ "투자 권유" "수익 보장" 표현
- ❌ AI 생성 콘텐츠 미공개
- ❌ 공식 출처 없는 세율 값
- ❌ 서브에이전트 거치지 않고 메인에서 대량 웹 페치
- ❌ tests/ 없이 src/ 변경 (TDD 룰 위반)
- ❌ 커버리지 임계 미달 PR 머지

## 배포 체크리스트 (Cloudflare Pages)
1. `npm run build` 통과
2. 모든 에이전트 감사 통과 (seo-auditor, adsense-guardian, lighthouse-profiler)
3. Search Console 등록, sitemap 제출
4. `ads.txt` 배포
5. 개인정보처리방침 AdSense 공개
6. DNS 스위치 (기존 WordPress → Cloudflare Pages)
7. 기존 Trend Money Lab 삭제
