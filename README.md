# calculatorhost

> 한국 성인 대상 무료 금융·세금·부동산·생활 계산기 27종. 2026년 최신 세율·요율 반영.

[![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=nextdotjs)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38bdf8?logo=tailwindcss)](https://tailwindcss.com/)
[![Cloudflare Pages](https://img.shields.io/badge/Cloudflare-Pages-F38020?logo=cloudflare)](https://pages.cloudflare.com/)

## 무엇을 하는 사이트인가

홈택스·은행·관공서의 복잡한 공식과 세율을 누구나 1분 안에 결과를 확인할 수 있는 인터페이스로 제공합니다. 회원가입·로그인·비용 모두 없습니다.

- 무료, 회원가입 불필요
- 입력값 서버 전송 X (브라우저 내에서만 계산)
- 2026년 최신 세율·요율 반영, 법조항 인용
- 모바일 최적화, 다크/라이트 모드
- Core Web Vitals Good 목표

## 제공 계산기 (27종, 5 카테고리)

### 근로
- 연봉 실수령액 (`/calculator/salary`)
- 퇴직금 (`/calculator/severance`)
- 은퇴자금 (`/calculator/retirement`)
- 프리랜서 종합소득세 (`/calculator/freelancer-tax`)
- N잡러 건강보험 (`/calculator/n-jobber-insurance`)
- 자녀장려금 (`/calculator/child-tax-credit`)

### 세금
- 양도소득세 (`/calculator/capital-gains-tax`)
- 취득세 (`/calculator/acquisition-tax`)
- 재산세 (`/calculator/property-tax`)
- 종합부동산세 (`/calculator/comprehensive-property-tax`)
- 증여세 (`/calculator/gift-tax`)
- 상속세 (`/calculator/inheritance-tax`)
- 자동차세 (`/calculator/vehicle-tax`)

### 금융
- 대출이자 (`/calculator/loan`)
- DSR 대출한도 (`/calculator/loan-limit`)
- 적금 이자 (`/calculator/savings`)
- 정기예금 이자 (`/calculator/deposit`)
- 환율·환전 (`/calculator/exchange`)
- 인플레이션 (`/calculator/inflation`)
- 주식 물타기 (`/calculator/averaging-down`)

### 부동산
- 중개수수료 (`/calculator/broker-fee`)
- 전월세 전환 (`/calculator/rent-conversion`)
- 임대수익률 (`/calculator/rental-yield`)
- 청약가점 (`/calculator/housing-subscription`)

### 생활
- 평수 환산 (`/calculator/area`)
- BMI (`/calculator/bmi`)
- D-day (`/calculator/d-day`)

## 기술 스택

| 레이어 | 기술 |
|---|---|
| 프레임워크 | Next.js 15 (App Router, `output: 'export'`) |
| 언어 | TypeScript (strict) |
| 스타일 | Tailwind CSS, CSS variables (다크/라이트) |
| 차트 | Recharts (dynamic import) |
| 폰트 | Pretendard Variable (서브셋팅) + Inter Variable (self-host) |
| 테스트 | Vitest (단위 628개), Playwright (E2E/시각) |
| 호스팅 | Cloudflare Pages (전역 엣지 CDN) |
| 분석 | Google Analytics 4 + Search Console |

## 빠른 시작

```bash
# 1. 의존성 설치
npm install

# 2. 환경변수 설정 (선택, 공공 API 키)
cp .env.example .env.local
# .env.local 또는 .my 파일에 실제 값 입력

# 3. 개발 서버
npm run dev
# http://localhost:3000

# 4. 빌드 (정적 출력)
npm run build
# out/ 디렉토리에 정적 사이트 생성 (Cloudflare Pages 배포 자료)

# 5. 검증
npm run typecheck       # TypeScript
npm run lint            # ESLint
npm test                # Vitest 단위 테스트 (628개)
npm run seo:validate    # SEO 자동 검증 (39 페이지 점검)
npm run test:e2e        # Playwright E2E
```

## Lighthouse CI (성능 모니터링)

**자동 트리거**: main 브랜치 push 및 모든 PR

### 측정 대상 (8개 페이지)
- 홈페이지: `http://localhost:4173`
- 연봉 실수령액: `/calculator/salary/`
- DSR 대출한도: `/calculator/loan-limit/`
- 양도소득세: `/calculator/capital-gains-tax/`
- 취득세: `/calculator/acquisition-tax/`
- 세금 카테고리: `/category/tax/`
- 금융 카테고리: `/category/finance/`
- 근로 카테고리: `/category/work/`

### 임계값 (Phase F 기준)
| 카테고리 | 임계값 | 수준 |
|---|---|---|
| Performance | ≥ 85 | warn |
| Accessibility | ≥ 90 | warn |
| Best Practices | ≥ 85 | warn |
| SEO | ≥ 90 | **warn** (0.95 → 0.90) |
| LCP | ≤ 2.5s | error |
| CLS | ≤ 0.1 | error |
| INP | ≤ 200ms | warn |

### 결과 확인
- **PR**: 자동 댓글에 Performance/SEO 점수 표시
- **Artifacts**: 각 실행마다 `.lighthouseci/` 저장 (30일 보관)
- **Baseline 비교**: 구현 진행 중 (main 대비 Performance -5점 이상 악화 시 경고)

## 프로젝트 구조

```
calculatorhost/
├── src/
│   ├── app/              # Next.js App Router (영문 슬러그)
│   ├── components/       # UI (calculator/ads/layout/charts)
│   ├── lib/
│   │   ├── tax/          # 세금 계산 순수 함수
│   │   ├── finance/      # 금융 계산 순수 함수
│   │   ├── publicapi/    # 공공 API 클라이언트
│   │   ├── seo/          # JSON-LD 헬퍼
│   │   └── constants/    # 세율·공제 상수 (연도별)
│   └── styles/
├── tests/                # unit/e2e/visual
├── docs/                 # SSoT 문서 (architecture/ADR/계산기 명세)
├── .claude/              # Claude Code 하네스 (agents/skills/commands/rules)
├── public/               # ads.txt, robots.txt, OG 이미지, 폰트
└── scripts/              # 세율 동기화, OG 생성, SEO 검증
```

## 아키텍처 원칙

- **계산 공식**은 `src/lib/tax/` · `src/lib/finance/` 의 **순수 함수**로만 작성
- **세율·공제**는 `src/lib/constants/tax-rates-{year}.ts` 상수로 분리 (매직넘버 금지)
- **세율 값 옆 법조항 주석 필수** (`// 소득세법 §55`)
- **연도별 상수 파일 분리** — 과거 거래 계산 대비, 이전 연도 상수 삭제 금지
- **외부 권위 출처 인용 의무** — 홈택스·국세청·한국은행·금감원·국토부·한국부동산원 등 (E-E-A-T)
- **JSON-LD 6종 표준화** — SoftwareApplication / WebPage / BreadcrumbList / FAQPage / HowTo / Speakable

## 중요 문서

- [docs/architecture.md](./docs/architecture.md) — 시스템 설계
- [docs/data-model.md](./docs/data-model.md) — 세율·공식 SSoT
- [docs/audience-personas.md](./docs/audience-personas.md) — 7개 페르소나
- [docs/seo-keyword-map.md](./docs/seo-keyword-map.md) — 키워드 × 페이지 매핑
- [docs/design-system.md](./docs/design-system.md) — 디자인 토큰
- [docs/adr/](./docs/adr/) — 아키텍처 의사결정 기록
- [.claude/CLAUDE.md](./.claude/CLAUDE.md) — Claude Code 하네스 지시사항

## 기여 규칙

- 세율 값은 `src/lib/constants/tax-rates-{year}.ts` 에만 (매직넘버 금지)
- 계산 공식은 `src/lib/tax/` 또는 `src/lib/finance/` 순수 함수로
- UI 컴포넌트는 Tailwind 디자인 토큰만 사용 (`text-text-primary`, `bg-bg-card` 등)
- 광고 슬롯은 `<AdSlot>` 재사용 (라이트 배경 + min-height + lazyOnload)
- 새 계산기 추가 시 `/new-calculator <slug>` 스캐폴드 사용 (.claude/commands/)
- 커밋 전 필수: `npm run typecheck && npm run lint && npm test && npm run seo:validate`

## 보안·개인정보

- HTTPS 강제 (Cloudflare 자동)
- 사용자 입력 데이터 서버 저장 X (클라이언트 전용)
- 로컬스토리지만 사용 (히스토리 기능)
- AdSense 쿠키는 [개인정보처리방침](https://calculatorhost.com/privacy) 명시
- EU/UK/CA 사용자에 동의 배너 (Google Funding Choices)
- API 키·시크릿은 `.env.local` 또는 `.my` (gitignore + Claude hooks 차단)

## 면책

본 사이트의 계산 결과는 **참고용**이며 법적 효력이 없습니다. 실제 세무·금융 처리 시 반드시 세무사·금융기관 등 전문가의 안내를 받으시기 바랍니다. 세율·요율·법령 변경, 개별 특례 조건 등으로 실제 납부액과 차이가 발생할 수 있습니다.

## 라이선스

© 2026 calculatorhost. 디자인·구성·계산 공식의 구현체는 calculatorhost 에 저작권이 있으며 무단 복제를 금합니다. 다만 세율 등 공공정보는 저작권 대상이 아닙니다.

## 문의

계산 오류 제보, 기능 제안, 광고/제휴 문의: contact@calculatorhost.com
