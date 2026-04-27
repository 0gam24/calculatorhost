# calculatorhost 아키텍처

> **Status**: Living document. 시스템 구조 변경 시 즉시 업데이트.
> **Last updated**: 2026-04-24

## 1. 시스템 개요

**calculatorhost** 는 한국 성인 대상 금융·세금·생활 계산기 포털. YMYL(Your Money or Your Life) 카테고리로 분류되며 Google AdSense 기반 수익화를 목표로 한다.

### 핵심 요구사항
- 정확한 계산 (YMYL 신뢰성)
- 구글 SEO 자연 노출 최적화 ("계산기" 롱테일 1등 목표)
- Core Web Vitals Good 유지
- AdSense 정책 100% 준수
- 공공데이터 API 활용 최신성
- 한국어 UX + 다크 Fintech 디자인

## 2. 기술 스택

| 레이어 | 기술 |
|---|---|
| 프레임워크 | Next.js 15 (App Router, `output: 'export'`) |
| 언어 | TypeScript (strict) |
| 스타일 | Tailwind CSS v4, CSS variables (다크/라이트 토글) |
| 차트 | Recharts (dynamic import) |
| 애니메이션 | Framer Motion (reduced-motion 존중) |
| 유효성 | zod |
| 테스트 | Vitest (단위), Playwright (E2E/시각) |
| CI/CD | GitHub Actions |
| 호스팅 | Cloudflare Pages (엣지 CDN 전역) |
| 도메인 | calculatorhost.com (소유, AdSense 연결) |
| 분석 | Google Analytics 4 + Search Console |
| 수익화 | Google AdSense |

## 3. 아키텍처 다이어그램

```
┌────────────────────────────────────────────────────┐
│                사용자 (한국 성인)                      │
└────────────────────────────┬───────────────────────┘
                             │
                             ▼
┌────────────────────────────────────────────────────┐
│         Cloudflare 엣지 CDN (전 세계)                │
│   정적 HTML + 이미지 + _next/static                  │
└────────────────────────────┬───────────────────────┘
                             │
                             ▼
┌────────────────────────────────────────────────────┐
│         Cloudflare Pages (정적 빌드)                 │
│   Next.js `output: 'export'` 결과물                  │
└─────────┬─────────────┬───────────────┬────────────┘
          │             │               │
          ▼             ▼               ▼
   [브라우저 JS]   [공공 API]      [Google]
   • 계산 로직    • 국토부         • AdSense
   • 다크토글     • 한국은행       • Analytics
   • 폼 상태      • 금감원         • Search Console
                 • 국세청         • Tag Manager
                 • KOSIS
```

## 4. 렌더링 전략

### SSG (Static Site Generation) 기본
- 모든 계산기 페이지가 빌드 시점에 정적 HTML 생성
- Cloudflare 엣지에서 서빙 → TTFB 극소 → LCP 우수
- **이유**: 계산 로직이 전부 클라이언트 사이드라 SSR 불필요

### 클라이언트 컴포넌트
- 계산기 폼/결과 = `"use client"` 컴포넌트
- 사용자 입력 → 순수 함수 호출 → 즉시 결과

### 동적 라우트 (선택적 사용)
- 아파트 단지별 페이지 `/시세/[aptId]` → 초기엔 정적 generateStaticParams 일부만, 추후 ISR 또는 Edge Function 검토

### Edge Function (선택)
- 공공 API 프록시가 필요할 때만
- `@cloudflare/next-on-pages` 어댑터 검토

## 5. 폴더 구조

```
calculatorhost/
├── CLAUDE.md                    # 루트 지시
├── .claude/                     # Claude Code 하네스 (8 agents, 7 skills, 5 commands, 6 rules)
├── .mcp.json                    # MCP 서버 (github/playwright/filesystem)
├── .github/workflows/           # CI (lighthouse, seo-audit, tax-rate-monthly)
├── docs/                        # SSoT 문서 ← THIS FOLDER
│   ├── architecture.md          # 이 파일
│   ├── audience-personas.md
│   ├── seo-keyword-map.md
│   ├── data-model.md            # 세율 요약 (상세는 skill REFERENCE)
│   ├── api-catalog.md           # API 요약
│   ├── design-system.md         # 디자인 토큰 요약
│   ├── calculator-spec/         # 각 계산기 PRD
│   ├── adr/                     # 아키텍처 결정 기록
│   └── STALE/                   # 폐기 문서 격리
├── content/                     # MDX (가이드/사전)
├── src/
│   ├── app/                     # Next.js 라우트
│   ├── components/              # UI
│   ├── lib/                     # 순수 함수 + 클라이언트
│   └── styles/
├── tests/                       # unit/e2e/visual
├── scripts/                     # 동기화 스크립트
└── public/                      # ads.txt/robots.txt/favicon
```

## 6. 데이터 흐름

### 계산기 사용 플로우
```
[사용자 입력]
    ↓
[FormComponent "use client"]
    ↓ onChange (debounce 300ms)
[src/lib/tax/income.ts 순수 함수]
    ↓
[ResultComponent]
    ↓ 선택적
[공공 API fetch (lib/publicapi/)]
    ↓
[카드/차트 업데이트]
```

### 세율 갱신 플로우 (연 1회)
```
[기재부 개정안 발표]
    ↓
[/update-tax-rates 커맨드]
    ↓
[calc-logic-verifier 검증]
    ↓
[src/lib/constants/tax-rates-{year}.ts 추가]
    ↓
[테스트 스위트 재실행]
    ↓
[ADR 기록 + 배포]
```

## 7. 보안·개인정보

- HTTPS 강제 (Cloudflare 자동)
- 사용자 입력 데이터 서버 저장 안 함 (클라이언트 전용)
- 로컬스토리지만 사용 (히스토리 기능)
- AdSense 쿠키는 개인정보처리방침 명시
- EU/UK/CA 사용자에 동의 배너 (Funding Choices)
- `.env*` 파일 절대 커밋 금지 (훅으로 차단)

## 8. 성능 예산 (Core Web Vitals)

| 지표 | 목표 | 기준 |
|---|---|---|
| LCP | ≤ 2.0s | Good |
| INP | ≤ 150ms | Good (여유) |
| CLS | ≤ 0.05 | Good (여유) |
| FCP | ≤ 1.5s | - |
| TBT | ≤ 150ms | Lab |
| Lighthouse Performance | ≥ 90 | 모바일 기준 |
| TTFB | ≤ 300ms | Cloudflare 엣지 |

## 9. 접근성 목표
- WCAG 2.2 AA 준수
- 색 대비 4.5:1+
- 키보드 전체 네비게이션
- 스크린 리더 호환

## 10. 국제화 (i18n)
- 현재: 한국어 전용 (`ko-KR`)
- 추후: 다국어 검토 (주력은 한국)

## 11. 배포 환경
- **production**: `calculatorhost.com` (Cloudflare Pages, 커스텀 도메인)
- **preview**: `{branch}.calculatorhost.pages.dev` (PR마다 자동)
- **development**: 로컬 (`npm run dev`)

## 12. 관측성 (Observability)
- **Cloudflare Analytics** (기본)
- **Google Analytics 4** (행동 분석)
- **Search Console** (SEO 성과)
- **AdSense 대시보드** (수익)
- **Web Vitals JS** → GA4 커스텀 이벤트 (Field data 수집)

## 13. 주요 의존성 정책
- 번들 크기 영향 큰 라이브러리는 dynamic import
- 신뢰성 낮은 패키지 지양
- 월 1회 `npm audit` (GitHub Dependabot)

## 14. 확장 계획 (미래)
- Phase 2: 사용자 히스토리 저장 (Supabase)
- Phase 3: AI 해설 기능 (Claude API)
- Phase 4: 시세 알림 (이메일 구독)
- Phase 5: 모바일 앱 (React Native)

## 15. 관련 문서
- [audience-personas.md](./audience-personas.md)
- [seo-keyword-map.md](./seo-keyword-map.md)
- [data-model.md](./data-model.md)
- [api-catalog.md](./api-catalog.md)
- [design-system.md](./design-system.md)
- [adr/](./adr/)
- [calculator-spec/](./calculator-spec/)
