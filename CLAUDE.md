# calculatorhost

**한국 성인 대상 금융/세금/생활 계산기 사이트. YMYL 카테고리. AdSense 수익화.**

## 스택
- Next.js 15 App Router (`output: 'export'`), TypeScript, Tailwind
- 배포: GitHub → Cloudflare Pages
- 테스트: Vitest(단위), Playwright(E2E/시각)

## 비타협 규칙

### 🚫 영구 운영 규칙 (사용자 명시 영구 적용)

#### 1) git push 금지
- **`git push` 는 절대 자동 실행 금지.**
- **사용자가 명시적으로 "푸쉬" / "push" / "푸시" / "푸시해" 같은 키워드로 직접 요청한 직후의 단일 작업에서만 실행.**
- 그 외 모든 상황(빌드 완료·테스트 통과·기능 완료 등)에서 push를 자율 실행하면 안 됨.
- `.claude/settings.json` 의 `deny` 에 `Bash(git push:*)` 등재됨 + `.claude/hooks/check-destructive.sh` 에서 차단.
- 원격 자원 변경 명령(`gh pr create/merge/close`, `gh repo create/delete` 등)도 동일 원칙.

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
