# calculatorhost

**한국 성인 대상 금융/세금/생활 계산기 사이트. YMYL 카테고리. AdSense 수익화.**

## 💰 북극성 — 모든 작업은 AdSense 수익 함수로 환산되어야 한다

> **영구 우선순위 (운영자 명시, 2026-05-15)**

### (a) 수익 함수 — 모든 결정의 평가 기준

```
수익 ≈ 색인 페이지 수  ×  페이지당 트래픽  ×  페이지 RPM
        (indexing)        (traffic)            (rpm)
```

모든 코드 변경·콘텐츠 발행·자동화 결정은 위 함수의 어느 항을 어떻게 움직이는지 명시해야 한다.
어느 항에도 기여하지 않거나, 한 항을 떨어뜨리는 변경은 **거부 또는 보류**.

### (b) PR/커밋 메시지 컨벤션 — `[revenue-lever:]` 태그 1개 의무

모든 PR 본문 또는 커밋 메시지 첫 줄에 다음 5개 中 정확히 1개 태그:

| 태그 | 의미 | 예시 작업 |
|---|---|---|
| `indexing` | 색인 페이지 수 ↑ | sitemap·내부링크·robots·404 수정·canonical |
| `traffic` | 페이지당 트래픽 ↑ | SEO 메타·콘텐츠·키워드·§N·구조화 데이터·답 블록 |
| `rpm` | 페이지 RPM ↑ | 광고 배치·CTR 후크·체류·페이지뷰 mesh |
| `cwv` | Core Web Vitals 개선 | LCP·INP·CLS (간접 RPM·순위 영향) |
| `guard` | 정책·보안·회귀 방지 | YMYL·AdSense 정책·typecheck·테스트. **사용 시 어떤 수익 표면을 보호하는지 명시 필수** |

예: `feat(content): 양도세 가이드 [revenue-lever: indexing+traffic]`

### (c) PR 본문에 "수익화 영향 평가" 3줄 의무

```
- 영향 페이지: <URL>
- 수익 항: indexing/traffic/rpm 中 어느 항을 어떻게 움직이는가
- 부작용: 다른 수익 항을 떨어뜨릴 위험 (CLS·정책·회귀)
```

### (d) 자동 발행(auto-guide) quality-gate 강화

`scripts/check-guide-quality.mjs` 가 다음을 추가 검증:
- 생성 가이드 `frontmatter` 또는 메타에 `[revenue-lever:]` 태그 있는지 (없으면 fail)
- 토픽 클러스터 연결 명시 (관련 계산기·기존 가이드와의 cross-link 1개 이상)
- 단순 워드카운트만 통과한 고립 페이지(내부링크 0)는 fail

### 가드레일 위계 (수익 < 가드레일)

| 우선순위 | 항목 |
|---|---|
| 1 (절대) | YMYL 정확성·AdSense 정책·법적 의무 |
| 2 (절대) | 회귀 차단 — Vitest 953 PASS·typecheck·lint·Lighthouse CI |
| 3 (북극성) | AdSense 수익 함수 (indexing × traffic × rpm) |
| 4 | 운영자 의사결정 보조 |

가드레일은 **수익 추구의 제약**이지 우선순위 위가 아니나, 수익 위해 가드레일 위반 X.

### 금지 — 북극성 무관 자율 작업

- 추상화·리팩토링 자체가 목적인 코드 정리 (수익 인과 사슬 부재)
- "더 깔끔한 구조" 미학적 변경 (사용자 미인지)
- 운영자 명시 외 자율 미션 확장 (auto-merge 머지 PR 외 추가 작업 X)

### 예외 — 북극성 무관해도 OK

- 회귀 차단 (테스트·린트·typecheck) → `[revenue-lever: guard]`
- 정책 준수 (AdSense·개인정보·법적 의무) → `[revenue-lever: guard]`
- 운영자 명시 비-수익 작업 (도큐먼트·인프라·정리) → `[revenue-lever: guard]`

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

### 📝 자동 가이드 발행 정책 (Phase 2 완료, 2026-05-15 auto-merge 활성)

**목적**: 시즌별 가이드 본문 일부를 Anthropic Claude API 로 자동 초안 생성 → 자동 PR → 전 CI 게이트 통과 시 자동 squash 머지·브랜치 삭제. 운영자 사후 점검(선택).

**자동 가능 / 자동 금지 범위**:
- ✅ 자동 가능: 가이드 본문 (정의·방법론·시장 트렌드·FAQ 확충)
- ❌ 자동 금지: 세율표 / 공제 금액 / 법조항 §번호 인용 / 양도세·취득세 등 직접 계산 사례 — 운영자 수동 또는 SSoT 상수(`src/lib/constants/tax-rates-{year}.ts`) 직접 import 만 가능

**완료된 인프라 (5/5)**:
1. ✅ About 페이지 disclosure 강화
2. ✅ CI 자동 검증 게이트 (`scripts/check-guide-quality.mjs` + `.github/workflows/auto-guide-quality.yml`)
3. ✅ 시각 회귀 가이드 미적용 (`playwright.config.ts` visual matcher 8 페이지 한정)
4. ✅ Phase 2 Anthropic API 호출 (`scripts/ralph-auto-guide.mjs`) — 2026-05-15
5. ✅ auto-merge 활성화 (`gh pr merge --auto --squash --delete-branch`) — 2026-05-15

**자동 머지 게이트 (전부 PASS 필수, 1개라도 fail 시 PR open 유지)**:
- `Auto Guide Quality Gate` — 본문 2,000자 / §N 인용 / 금지표현 0 / AI 표기 의무
- Vitest 단위 953+ PASS 유지
- TypeScript strict + ESLint 0
- Lighthouse CI 어설션 (LCP/INP/CLS)
- Cloudflare Pages preview build 성공
- E2E 골든패스 5 + indexing-guard 10 + SEO regression 15

**탈출구 (운영자 차단)**:
- PR 페이지에서 "Disable auto-merge" 클릭
- 또는 PR close
- 또는 main 브랜치 protection rule 일시 해제

**사후 점검 (운영자 책임 — 머지 후라도)**:
- 머지된 가이드의 §N 법조항·세율값 사실 정확성
- 중복 콘텐츠 검사
- RED 발견 시 즉시 후속 PR 로 수정 또는 페이지 unpublish

**중단 조건 (즉시 시스템 OFF — `AUTO_GUIDE_ENABLED=false` 변수 토글)**:
- Search Console 순위 -10% 이상 하락
- Google Manual Action 알림
- AdSense 정책 위반 알림
- 자동 발행분 RED 검출 누적 3건 이상

**금지 표현 자동 검출** (`scripts/check-guide-quality.mjs` `FORBIDDEN_PATTERNS`):
- 투자 권유 / 수익 보장 / 원금 보장 / 확정 절세 / 100% 절세 / 국내 1위 / 국내 유일 / 최고의 절세 / 절대 안전

**잔존 리스크 (운영자 인지)**:
- AI 가이드가 운영자 검수 없이 main 머지 가능
- 자동 게이트가 못 잡는 사실 정확성(§N 가짜번호·세율 hallucination)은 사후 점검에 의존
- 운영자 결정으로 검수 SLA 30분 해제 (2026-05-15) — 게이트 강화로 대체

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

## 운영 상태 (모든 세션·에이전트 작업 시작 전 필수 확인)
- @.claude/STATE.md  ← **현재 운영 모드·인프라·환경변수·캠페인 SSoT**

> **에이전트 호출 룰**: 도메인 에이전트(adsense-guardian / api-researcher / calc-logic-verifier / content-writer / frontend-builder / lighthouse-profiler / seo-auditor / test-runner)에게 검토 의뢰할 때 STATE.md 의 "현재 모드" 섹션을 프롬프트에 포함하여 outdated 가정(미발사 / 미신청 / 미설정) 제거.

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
