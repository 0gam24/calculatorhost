# calculatorhost

**한국 성인 대상 금융/세금/생활 계산기 사이트. YMYL 카테고리. AdSense 수익화.**

## 스택
- Next.js 15 App Router (`output: 'export'`), TypeScript, Tailwind
- 배포: GitHub → Cloudflare Pages
- 테스트: Vitest(단위), Playwright(E2E/시각)

## 비타협 규칙

### 🚫 영구 운영 규칙 (사용자 명시 영구 적용)

#### 1) 원격 자원 변경 — 운영자 단독 운영 모드 (2026-05-08 갱신)

**컨텍스트**: 본 repo의 운영자(0gam24)는 단독 운영자(=커미터=리뷰어=배포자). 다중 협업자 보호 / PR 리뷰 우회 우려가 적용되지 않음. 자기 결정·자기 책임 원칙.

**룰**:
- **운영자가 명시적으로 "푸쉬" / "push" / "푸시" / "푸시해" 키워드로 요청한 직후에만 자율 실행.**
- 단일 키워드로 일괄 트리거 가능 (`git push` + `gh pr create` + `gh pr merge` + `gh pr close` + `gh pr comment`).
- 그 외 상황(빌드 완료·테스트 통과·기능 완료 등)에서 자율 실행 금지 — 로컬 작업은 자율, 원격 반영은 운영자 승인.
- `.claude/settings.json` `permissions.allow` 에 `Bash(git push:*)` / `Bash(gh pr create:*)` / `Bash(gh pr merge:*)` / `Bash(gh pr close:*)` / `Bash(gh pr comment:*)` 등재 (2026-05-08 운영자 명시 승인).

**파괴적 명령 — 영구 차단 유지** (`.claude/settings.json` `deny`):
- `git push --force` / `git push -f` / `git push --force-with-lease` (force push 일체)
- `git reset --hard origin/main` (작업 손실 위험)
- `git clean -fdx`, `git branch -D main/master`
- `gh repo create` / `gh repo delete` (repo 자체 변경)
- `chmod 777`, `sudo:*`, `rm -rf /` 류 시스템 위험 명령

**근거**: 원격 작업의 정상 흐름(push/PR/merge)은 운영자 단독이므로 마찰 제거. 비정상·복구 불가 명령(force push, repo 삭제 등)은 단독 운영자라도 보호망 유지.

#### 2) API 키·시크릿 노출 금지
- **API 키·토큰·비밀번호·인증서를 코드·문서·로그·커밋 메시지에 절대 적지 않음.**
- 노출 가능 파일은 정해진 곳만:
  - 실제 값(로컬 dev): `.env.local` 또는 `.my` (gitignore 처리됨, **읽기 영구 차단** + 쓰기·편집은 운영자 명시 승인 시에만)
  - 실제 값(프로덕션): Cloudflare Pages 환경변수 (`.env.production*` 은 영구 차단)
  - 예시·placeholder: `.env.example` (실제 값 X, `YOUR_API_KEY_HERE` 형식만)
  - 공개 ID(AdSense `ca-pub-*`, GA `G-*`): `ads.txt`, `.env.example` 외 위치 금지
- **권한 정책 (2026-05-03 운영자 명시 승인으로 갱신)**:
  | 파일 | Read | Write/Edit |
  |---|---|---|
  | `.env.local`, `.env`, `.env.development.local`, `.my`, `*.my`, `.my.*` | **영구 차단 (deny)** | **ask** (매번 운영자 승인) |
  | `.env.production`, `.env.production.local` | **영구 차단** | **영구 차단** (Cloudflare 대시보드에서만) |
  | `**/secrets.json`, `**/credentials.json`, `**/*.pem`, `**/*.key`, `**/*service-account*.json`, `secrets/**` | **영구 차단** | **영구 차단** |
  | `~/.aws/`, `~/.ssh/`, `**/.npmrc`, `**/.netrc` | **영구 차단** | (해당 없음) |
- 출력 명령 영구 차단: `cat .env*`, `cat .my*`, `cat *.my`, `env`, `printenv`, `echo $*KEY/SECRET/TOKEN/PASSWORD`
  - 이유: Read 가 ask 로 풀려도 Bash 출력으로 키 값이 응답에 들어가는 사고 방지
- 시크릿 패턴 자동 검출 (이중 안전망): `.claude/hooks/check-secrets.sh` 가 Write/Edit ask 승인 후에도 OpenAI(sk-) / Anthropic(sk-ant-) / GitHub(ghp_ / github_pat_) / Google(AIza) / AWS(AKIA) / Slack(xoxb-) / Bearer 토큰 / Basic Auth / private key 헤더 등 검출 시 **자동 차단**.
- 새 외부 API 통합 시:
  1. 키는 Cloudflare Pages 환경변수 또는 Workers Secret 으로 이전.
  2. 코드에선 `process.env.NAME` 으로만 참조.
  3. 클라이언트 노출 필요 시에만 `NEXT_PUBLIC_` 접두 사용 (공개되어도 무방한 ID 한정).
  4. CORS 우회·키 보호용 프록시는 Cloudflare Pages Functions 로 구현 (브라우저 직접 호출 금지).

### 📐 코드·구조 규칙
- 계산 공식은 `src/lib/tax/` · `src/lib/finance/`의 **순수 함수**에만 작성
- 세율·공제는 `src/lib/constants/tax-rates-{year}.ts`에 상수로 (매직넘버 금지)
- 세율 값 옆 법조항 주석 필수 (`// 소득세법 §55`)
- UI는 `src/components/calculator/` 공통 템플릿 재사용
- 영문 슬러그 URL (`/calculator/salary`, `/category/tax`)  ※ 초기엔 한글 슬러그였으나 영문 전환 완료
- 광고 슬롯은 라이트 배경 카드 + `min-height` 고정 + `strategy="lazyOnload"`

### 📝 자동 가이드 발행 정책 (Phase 1 인프라 완료, 2026-05-10)

**목적**: 시즌별 가이드 본문 일부를 Anthropic Claude API 로 자동 초안 생성·자동 PR·운영자 검토 후 발행. NETWORK 7 에이전트 합의 기반.

**자동 가능 / 자동 금지 범위**:
- ✅ 자동 가능: 가이드 본문 (정의·방법론·시장 트렌드·FAQ 확충)
- ❌ 자동 금지: 세율표 / 공제 금액 / 법조항 §번호 인용 / 양도세·취득세 등 직접 계산 사례 — 운영자 수동 또는 SSoT 상수(`src/lib/constants/tax-rates-{year}.ts`) 직접 import 만 가능

**필수 사전 조건 (5/5 충족 시만 자동 발행 활성화)**:
1. ✅ About 페이지 disclosure 강화 (`src/app/about/page.tsx` §"자동 가이드 발행 프로세스")
2. ✅ CI 자동 검증 게이트 (`scripts/check-guide-quality.mjs` + `.github/workflows/auto-guide-quality.yml`) — 본문 2,000자 하한·외부 권위 링크 ≥ 2·금지 표현 0·AI 보조 표기 의무
3. ✅ 시각 회귀 가이드 미적용 (`playwright.config.ts` visual matcher 8 페이지 한정)
4. ⏳ Phase 2: Anthropic API 호출 인프라 (`scripts/ralph-auto-guide.mjs` 미구현)
5. ⏳ Phase 2: 점진 도입 6개월 파일럿 (월 5–10편 → 30편)

**검수 SLA (운영자 책임)**:
- 자동 PR 머지 전 최소 30분 실질 검토 — 법조항 정확성·세율값 SSoT 대조·중복 콘텐츠 검사
- RED 항목 1개라도 발견 시 즉시 폐기 또는 재작성
- 1-2분 머지 검토 금지 — YMYL 카테고리 신뢰성 보호

**자동 PR 머지 게이트 (CI 필수 PASS)**:
- `Auto Guide Quality Gate` (이 워크플로) — RED 시 PR 차단
- Vitest 단위 900+ PASS 유지
- `audit:adsense` 통과
- Lighthouse CI 어설션 PASS (가이드 PR 시 skip 검토)

**중단 조건 (즉시 시스템 OFF)**:
- Search Console 순위 -10% 이상 하락
- Google Manual Action 알림
- AdSense 정책 위반 알림
- 자동 발행분 RED 검출 누적 3건 이상

**금지 표현 자동 검출** (`scripts/check-guide-quality.mjs` `FORBIDDEN_PATTERNS`):
- 투자 권유 / 수익 보장 / 원금 보장 / 확정 절세 / 100% 절세 / 국내 1위 / 국내 유일 / 최고의 절세 / 절대 안전

## 에이전트 우선 호출
작업 유형별 자동 위임 — 메인 스레드에서 직접 처리 지양:
- UI/컴포넌트 → `frontend-builder`
- 계산 공식 → `calc-logic-verifier`
- SEO 메타/구조화 데이터 → `seo-auditor`
- AdSense 슬롯 → `adsense-guardian`
- 공공 API 조사 → `api-researcher`
- 콘텐츠 한국어 작성 → `content-writer`
- 성능 측정 → `lighthouse-profiler`
- 테스트 실행 → `test-runner`

## 임포트 (필요 시점에만 읽음)
- @docs/architecture.md
- @docs/data-model.md
- @docs/audience-personas.md
- @docs/design-system.md
- @docs/seo-keyword-map.md

## 경로 규칙
`.claude/rules/*.md`가 경로별 자동 로드됨.

## 커밋 전 필수
`npm run typecheck && npm test && npm run lint` 통과.

## 참고
상세 지시는 `.claude/CLAUDE.md` 참조.
