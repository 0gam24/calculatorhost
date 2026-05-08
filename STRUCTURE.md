# calculatorhost.com 자매 사이트 — STRUCTURE.md

> smartdata HQ 가 본 사이트를 관리하기 위한 구조 문서.
> 본 문서는 본 repo 분석 결과 자동 생성.
>
> 마지막 갱신: 2026-05-08 (network-mirror 반영)
> 분석 기준 commit: `663f1d3` main + `7180aa5` (feat/network-mirror-build) — feat(network): public/network-mirror.json 빌드 시 자동 생성

## 1. 정체성
- 도메인: calculatorhost.com
- 역할: 자매 (인터랙티브 계산기·시뮬레이터)
- 메인: smartdatashop.kr 의 자매
- repo: github.com/0gam24/calculatorhost (확인)
- 운영 주체: 스마트데이터샵 (대표 김준혁, 사업자등록번호 406-06-34485) — `src/lib/seo/jsonld.ts`·`src/app/about/page.tsx` 명시

## 2. 기술 스택
- **프레임워크**: Next.js 15.0.3 (App Router, `output: 'export'` 정적 추출)
- **언어**: TypeScript 5.6.3 (strict)
- **UI 런타임**: React 19.0.0
- **스타일링**: Tailwind CSS 3.4.14 + CSS variables (다크/라이트 토글)
- **차트**: Recharts 2.13.3 (dynamic import / `optimizePackageImports`)
- **유효성 검증**: zod 4.4.2
- **유틸**: clsx, tailwind-merge
- **테스트**: Vitest 3.2.4 (단위), Playwright 1.48.2 (E2E·시각 회귀)
- **이미지 처리(빌드)**: sharp 0.34.5
- **번들 분석**: `@next/bundle-analyzer` (`ANALYZE=true` 시)
- **Cloudflare 타입**: `@cloudflare/workers-types`
- **Node**: `>=20.0.0` (engines 명시)

## 3. 라우트 (정적)
모든 URL trailing slash (`/`) 종결 — `next.config.ts`의 `trailingSlash: true`.

- `/` (홈)
- `/about/`
- `/affiliate-disclosure/`
- `/contact/`
- `/glossary/` (용어사전 — 단일 페이지, 18개 용어)
- `/guide/` (가이드 인덱스)
- `/privacy/`
- `/terms/`
- `/updates/` (변경 이력 / Freshness 신호 hub)
- `/category/finance/`
- `/category/lifestyle/`
- `/category/real-estate/`
- `/category/tax/`
- `/category/work/`
- `/calculator/{slug}/` × 30 — §8 참조
- `/guide/{slug}/` × 18 — §9 참조

## 4. 라우트 (동적)
- **없음**. 모든 라우트는 `output: 'export'` 정적 추출 (계산 로직은 100% 클라이언트 사이드).

## 5. API endpoints
정적 사이트이므로 서버 API 엔드포인트는 없고, **빌드 타임 정적 생성 route handler** 만 존재.

- `/sitemap.xml` — `src/app/sitemap.ts` (`MetadataRoute.Sitemap`, 페이지별 `mtime` 기반 lastModified)
- `/robots.txt` — `src/app/robots.txt/route.ts` (`force-static`). `User-Agent: *` 그룹에 `Allow: /network-mirror.json` 명시 (메인 sync 정적 파일).
- `/feed.xml` — `src/app/feed.xml/route.ts` (RSS, `<head>` 자동 발견)
- `/network-mirror.json` — **(2026-05-08 신설)** `scripts/generate-network-mirror.mjs` 가 prebuild 시 `public/network-mirror.json` 생성. smartdata network HQ(메인 smartdatashop.kr)가 일일 cron 으로 fetch → `sister-mirrors/calculatorhost/posts.json` 으로 sync. 양식: `{ site, siteName, domain, lastUpdated, totalPosts, categories, personas, posts[] }`. 본 manifest 는 정적 JSON이며 `/public` 에서 자동 서빙 (`/out/network-mirror.json` 으로 빌드 결과 포함).

## 6. 레이아웃
- **Next.js Root Layout** — `src/app/layout.tsx`
  - 메타데이터 (Title/OG/Twitter/canonical/verification), FOUC 방지 테마 선주입, PWA Service Worker 등록, 폰트(self-host) preload, AdSense preconnect, Skip Link, AdSense·GA4 lazyOnload 스크립트, MobileAnchorAdGuard, WebVitalsReporter
- **계산기 공통 레이아웃 컴포넌트** — `src/components/calculator/CalculatorLayout.tsx` (각 계산기 페이지에서 사용)
- 카테고리/가이드/정책 페이지는 별도 layout.tsx 없이 페이지 단위에서 Header·Sidebar·Footer 직접 조합

## 7. 컴포넌트
총 34개 (ads 5 / affiliate 2 / analytics 1 / calculator 13 / charts 2 / layout 8 / network 1 / ui 2 + sidebar-items 데이터 1).

### 광고 (`src/components/ads/`)
- `AdSlot` — AdSense 슬롯 (포맷별 환경변수 매핑·viewport 진입 시 push)
- `InfeedAd` — 인피드(반응형) 광고
- `MobileAnchorAd` — 모바일 하단 고정 광고 (`lg` 미만)
- `MobileAnchorAdGuard` — 정책 페이지(/privacy/terms/contact/about)에서 앵커 광고 비활성 가드
- `SkyscraperAd` — 우측 사이드바 300×600 스티키

### 제휴 (`src/components/affiliate/`)
- `AffiliateLink` — `rel="sponsored"` 자동 부여 외부 링크
- `AffiliateRecommendation` — 제휴 추천 카드 (CTA 환경변수 기반)

### 분석 (`src/components/analytics/`)
- `WebVitalsReporter` — Web Vitals(LCP/INP/CLS) → GA4 송신

### 계산기 UI (`src/components/calculator/`)
- `AddressAutocomplete` — 도로명주소 자동완성
- `AuthorByline` — 작성자/검수 정보 표기 (E-E-A-T)
- `CalculatorLayout` — 계산기 페이지 골격
- `FaqSection` — FAQ 렌더 + FAQPage JSON-LD
- `Form` — 폼 래퍼
- `NumberInput` — 숫자 입력
- `RadioGroup` — 라디오 그룹
- `RealtorAutocomplete` — 공인중개사 자동완성
- `RelatedCalculators` — 관련 계산기 크로스링크
- `Result` — 결과 카드
- `ResultBanner` — 결과 상단 배너
- `ShareButtons` — 카카오·링크·이미지 공유 (Kakao SDK 환경변수)
- `StructuredSummary` — GEO/AEO 상단 요약 박스 (정의·핵심 수치·TL;DR)

### 차트 (`src/components/charts/`)
- `ActivityChart` — 시계열 (상환 스케줄 등)
- `CategoryChart` — 카테고리 분포

### 레이아웃 (`src/components/layout/`)
- `Breadcrumb` — 빵부스러기 네비
- `Footer`
- `Header`
- `MobileDrawer` — 모바일 사이드 드로어
- `SearchBox` — 사이트 내 검색
- `Sidebar` — 좌측 카테고리 사이드바
- `sidebar-items.tsx` — 사이드바 항목 데이터 (모듈)
- `ThemeToggle` — 다크/라이트 토글

### 공통 UI (`src/components/ui/`)
- `Card` — 라운드 카드
- `DataFreshness` — 데이터 갱신일 배지
- `TrendBadge` — 추세 배지

### 네트워크 (`src/components/network/`) **(2026-05-07 신설)**
- `MainBackrefBox` — smartdatashop network 메인 사이트(smartdatashop.kr) backref 박스. NETWORK.md v0.6 dual-brand 규약에 따라 자매 다크 Fintech 디자인을 유지하고 본 박스만 메인 토큰(#8b1538 accent + #faf7f0 wheat) 사용. variant 3종(`inline` / `sidebar` / `footer`). 외부 아이콘 라이브러리 없이 인라인 SVG → First Load JS 영향 0. props: `mainPulseUrl?` / `mainCategoryUrl?` / `pulseTitle?` / `title?` / `variant?`

## 8. 계산기 페이지 list
`src/app/sitemap.ts` `CALCULATOR_SLUGS` 기준 — 총 **30개** (홈·about 메타에는 "31개"로 표기됨, 실제 라우트 30개 = 카피와 1개 차이 존재).

- `/calculator/salary/` — 연봉 실수령액
- `/calculator/severance/` — 퇴직금
- `/calculator/loan/` — 대출이자
- `/calculator/loan-limit/` — 대출한도 (DSR/LTV)
- `/calculator/capital-gains-tax/` — 양도소득세
- `/calculator/acquisition-tax/` — 취득세
- `/calculator/property-tax/` — 재산세
- `/calculator/comprehensive-property-tax/` — 종합부동산세
- `/calculator/broker-fee/` — 중개수수료
- `/calculator/rent-conversion/` — 전월세 전환율
- `/calculator/area/` — 평수 환산
- `/calculator/savings/` — 적금 이자
- `/calculator/deposit/` — 정기예금 이자
- `/calculator/retirement/` — 은퇴자금
- `/calculator/bmi/` — BMI
- `/calculator/d-day/` — D-day
- `/calculator/freelancer-tax/` — 프리랜서 종합소득세
- `/calculator/gift-tax/` — 증여세
- `/calculator/inheritance-tax/` — 상속세
- `/calculator/vehicle-tax/` — 자동차세
- `/calculator/exchange/` — 환율·환전
- `/calculator/housing-subscription/` — 청약가점
- `/calculator/child-tax-credit/` — 자녀장려금
- `/calculator/n-jobber-insurance/` — N잡러 건강보험
- `/calculator/rental-yield/` — 임대수익률
- `/calculator/inflation/` — 인플레이션 (화폐가치)
- `/calculator/averaging-down/` — 주식 물타기
- `/calculator/split-buy/` — 분할매수
- `/calculator/split-sell/` — 분할매도
- `/calculator/vat/` — 부가가치세

총 30개

## 9. 가이드 페이지 list
`src/app/sitemap.ts` `GUIDE_SLUGS` 기준 — 총 **18개** + 인덱스 1.

### 시기성 (월별)
- `/guide/tax-calendar-2026/` — 2026 세무 달력
- `/guide/year-end-tax-settlement/` — 연말정산
- `/guide/january-vehicle-tax-prepayment/` — 1월 자동차세 선납
- `/guide/february-tax-refund-tracking/` — 2월 환급금 추적
- `/guide/march-corporate-tax/` — 3월 법인세
- `/guide/april-vat-preliminary-q1/` — 4월 1기 부가세 예정신고
- `/guide/april-comprehensive-property-tax-exclusion/` — 4월 종부세 합산배제
- `/guide/may-comprehensive-income-tax/` — 5월 종합소득세
- `/guide/june-property-tax/` — 6월 재산세

### 분야별
- `/guide/dsr-loan-limit-tips/` — DSR 한도 팁
- `/guide/averaging-down-vs-loss-cut/` — 물타기 vs 손절
- `/guide/capital-gains-tax-tips/` — 양도세 절세 팁
- `/guide/dsr-regulation-zones/` — DSR 규제지역
- `/guide/freelancer-salary-comparison/` — 프리랜서 vs 직장인 비교
- `/guide/jeonse-deposit-safety/` — 전세보증금 안전 (Phase M)
- `/guide/capital-gains-tax-5-steps/` — 양도세 5단계 (Phase M)
- `/guide/salary-negotiation-take-home/` — 연봉협상 세후 (Phase N)
- `/guide/earned-income-tax-credit-vs-child/` — 근로/자녀장려금 (Phase O)

총 18편 (+ `/guide/` 인덱스)

## 10. lib 모듈
계산 공식은 모두 **순수 함수**로 분리, UI/컴포넌트와 완전 격리.

### `src/lib/tax/` (12)
`acquisition`, `child-tax-credit`, `comprehensive-property`, `freelancer`, `gift`, `income`, `inheritance`, `n-jobber-insurance`, `property`, `severance`, `transfer`, `vat`, `vehicle` — 한국 세법 공식 순수 함수 (법조항 주석 의무)

### `src/lib/finance/` (13)
`averaging-down`, `deposit`, `exchange`, `inflation`, `loan-limit`, `loan`, `realty-commission`, `rent-conversion`, `rental-yield`, `retirement`, `savings`, `split-buy`, `split-sell` — 금융 계산 공식

### `src/lib/utils/` (4) + `utils.ts` (1)
`area`, `bmi`, `dday`, `housing-subscription` + 공통 유틸

### `src/lib/constants/` (8)
- `tax-rates-2026.ts` — 2026 세율·공제 (소득세·지방세·종부세 등)
- `loan-rules-2026.ts` — 대출 규제 (DSR/LTV)
- `realty-rates-2026.ts` — 부동산 요율
- `rent-rules-2026.ts` — 임대차 규정
- `savings-rates-2026.ts` — 예적금 기준
- `affiliate-partners.ts` — 제휴 파트너
- `authority-links.ts` — 권위 외부 링크
- `updates-log.ts` — 사이트 변경 이력

### `src/lib/publicapi/` (3)
- `juso.ts` — 도로명주소 API
- `realestate.ts` — 부동산 실거래가
- `types.ts`

### `src/lib/api/` (2)
- `client.ts`, `types.ts` — 내부 API 클라이언트 (정적 fetch 래퍼)

### `src/lib/analytics/` (1)
- `web-vitals.ts` — Web Vitals → GA4 송신 헬퍼

### `src/lib/seo/` (1)
- `jsonld.ts` — Organization·WebSite·SoftwareApplication·FAQPage·BreadcrumbList·HowTo·Speakable·Article·DefinedTerm 빌더. **2026-05-07: `parentOrganization` (스마트데이터샵 ↔ smartdatashop.kr) + `isBasedOn=https://smartdatashop.kr/` 부착 (Organization / SoftwareApplication / Article 3종).**

### `src/lib/network/` (1) **(2026-05-07 신설)**
- `main-backref.ts` — calculatorhost(자매) 카테고리 → smartdatashop.kr(메인) hub URL 매핑. NETWORK.md v0.6 §3.1: tax/finance/real-estate/work → `tax-finance` hub, lifestyle → `stats` hub. 매핑 누락 슬러그는 `stats` fallback (soft 404 회피). exports: `MAIN_SITE_URL`, `MAIN_SITE_NAME`, `MAIN_SITE_LEGAL_NAME`, `getMainCategoryUrl(category)`, `getMainCategoryUrlForCalculatorSlug(slug)`

## 11. GitHub Actions
`.github/workflows/` — 4개 워크플로 운영 중 (Phase P 신규 2개 추가됨).

- **`lighthouse.yml`** — *Lighthouse CI*
  - 트리거: `push: main`, `pull_request: main`, `workflow_dispatch` (URL/디바이스 프리셋 입력)
  - 역할: 정적 빌드 → http-server 4173 → Lighthouse → 점수·CWV 측정 → main 베이스라인 저장 → PR이면 베이스라인 비교 → PR 코멘트 자동 게시 (`scripts/compare-lighthouse.mjs`)
  - **CI 게이트(`.lighthouserc.json`) 임계 (2026-05-07 기준)**:
    - LCP `error ≤ 2500ms` (현재 main) — **PR #2 OPEN: `4000ms`로 완화 진행 중** (사유: GitHub Actions ubuntu-latest 러너 환경 한계, 모바일 throttling 시 일관 ~3.7s 측정. Field data는 GA4 Web Vitals로 별도 모니터링)
    - CLS `error ≤ 0.1` · FCP `warn ≤ 1800ms` · TBT `warn ≤ 200ms` · INP `warn ≤ 200ms`
    - Performance/Accessibility/Best-Practices/SEO score warn 임계 (각 0.85~0.9)

- **`sync-public-data.yml`** — *Sync Public Data*
  - 트리거: `schedule` 매일 03:00 KST (`0 18 * * *` UTC), `workflow_dispatch`
  - 역할: `npm run sync-data` 실행 (한국은행 ECOS / 한국수출입은행 환율 / FSS 금융상품 / KOSIS 가구소득 갱신) → `src/data/` 변경 감지 시 자동 PR 생성 (peter-evans/create-pull-request)
  - 시크릿: `ECOS_API_KEY`, `EXIM_FX_API_KEY`, `FSS_FINLIFE_API_KEY`, `KOSIS_API_KEY`

- **`ralph-daily.yml`** — *Ralph — Daily Monitoring (YORO Phase P)*
  - 트리거: `schedule` 매일 03:00 KST, `workflow_dispatch`
  - 역할: Ralph 7-step 일일 감사 — meta audit / link health / sync health / launch checklist / typecheck / unit tests / AdSense audit → `scripts/ralph-orchestrator.mjs` 보고서 생성 → 실패 시 자동 issue 생성
  - **현 상태(2026-05-07): 사전 결함 — 0 jobs 실행으로 모든 run 실패 (PR #1 이전부터 누적). 운영자 별건 처리 큐.**

- **`ralph-daily-recommendation.yml`** — *(미배포 참고용 YAML)*
  - 헤더 주석: "구현 전 참고용 YAML. 사용자 승인 후 실제 배포 시 다음을 고려..."
  - `ralph-daily.yml`과 `name:` 충돌 가능성 — 별건 정리 대상

## 12. scripts
`scripts/` — 총 23개 (.mjs/.js, Phase P Ralph 도구 9개 + smartdata network mirror 1개 추가됨).

### 운영·동기화·감사
- `sync-public-data.mjs` — 공공데이터 일일 동기화 (4개 API)
- `check-sync-health.mjs` — 동기화 헬스 체크
- `generate-og-images.mjs` — OG 이미지 자동 생성 (`prebuild` 단계)
- **`generate-network-mirror.mjs` — (2026-05-08 신설)** smartdata network HQ sync 용 manifest 생성. `prebuild` 단계에서 자동 실행. SSoT: `src/app/sitemap.ts` 슬러그 + 각 `page.tsx` 의 `metadata` + `DATE_PUBLISHED`/`DATE_MODIFIED` 정규식 추출 + `src/app/glossary/page.tsx` 의 `GLOSSARY` 배열에서 용어 27개 추출. 출력: `public/network-mirror.json` (gitignored, 빌드마다 재생성). 75편(계산기 30 + 가이드 18 + 용어 27), 21ms.
- `validate-seo.mjs` — SEO 검증 (메타·canonical·구조화 데이터)
- `audit-adsense.mjs` — AdSense 정책·배치 감사
- `launch-checklist.mjs` — 출시 체크리스트
- `compare-lighthouse.mjs` — Lighthouse 베이스라인 비교 (CI 사용)
- `monitor-week1.mjs` — 출시 1주차 모니터링
- `add-category-jsonld.mjs` — 카테고리 페이지 JSON-LD 부착
- `remove-extra-adslots.mjs` — 과도한 AdSlot 제거 도구
- `check-meta-lengths.js` — 메타 길이 검사
- `measure-meta.js` — 메타 측정
- `diagnose-my.mjs` — `.my` 환경변수 파일 진단
- `load-my-env.mjs` (+ `.d.ts`) — `.my` 자동 로더 헬퍼

### Ralph (YORO Phase P) **— 일일 자동 감사 도구군**
- `ralph-orchestrator.mjs` — Ralph 7-step 통합 보고서 생성
- `ralph-meta-audit.mjs` — 메타 길이 감사 (`--auto-fix` 옵션)
- `ralph-link-health.mjs` — 외부 권위 링크 헬스 체크
- `ralph-seasonal-guide.mjs` — 시즌별 가이드 자동 추천
- `ralph-tax-cross-check.mjs` — 세금 계산 교차 검증
- `ralph-visual-diff.mjs` — 시각 회귀 diff 도구
- `ralph-bundle-size.mjs` — 번들 크기 모니터
- `ralph-faq-suggest.mjs` — Search Console 4티어 FAQ 자동 보강
- `ralph-lh-regression.mjs` — Lighthouse 회귀 감지

## 13. 빌드·배포 명령
`package.json` `scripts`:

- `npm run dev` — Next.js 개발 서버
- `npm run dev:functions` — `wrangler pages dev out` (Cloudflare 로컬)
- `npm run prebuild` — OG 생성 + 공공데이터 동기화 (build 자동 선행)
- `npm run build` — `next build` (정적 추출 → `out/`)
- `npm start` — `next start`
- `npm run lint` — `next lint`
- `npm run typecheck` — `tsc --noEmit`
- `npm test` / `npm run test:watch` — Vitest
- `npm run test:e2e` — Playwright
- `npm run format` — Prettier
- `npm run sync-data` / `sync:health` / `gen-og` / `seo:validate` / `audit:adsense` / `launch:checklist` — 운영 도구
- `npm run generate:mirror` — **(2026-05-08 신설)** smartdata network HQ sync manifest 생성 (단독 실행). `prebuild` 단계에서도 자동 실행
- `npm run ralph:meta` / `ralph:meta:fix` / `ralph:link-health` / `ralph:seasonal` / `ralph:tax-check` / `ralph:visual` / `ralph:bundle` / `ralph:faq` / `ralph:lh` — Ralph YORO Phase P 일일 감사 도구

## 14. 환경변수 의존
키 이름만 (값·시크릿 노출 없음).

### 클라이언트 노출(`NEXT_PUBLIC_*`)
- `NEXT_PUBLIC_ADSENSE_CLIENT` — AdSense 게시자 ID (`ca-pub-XXXX`, 정규식 검증)
- `NEXT_PUBLIC_ADSENSE_SLOT_LEADERBOARD` — AD-1 728×90 / 970×250
- `NEXT_PUBLIC_ADSENSE_SLOT_RECTANGLE` — AD-2 300×250
- `NEXT_PUBLIC_ADSENSE_SLOT_SKYSCRAPER` — AD-3 300×600 스티키
- `NEXT_PUBLIC_ADSENSE_SLOT_INFEED` — AD-4 인피드(fluid)
- `NEXT_PUBLIC_ADSENSE_SLOT_ANCHOR` — AD-5 모바일 앵커
- `NEXT_PUBLIC_ADSENSE_SLOT_DEFAULT` — 포맷 미지정 시 fallback
- `NEXT_PUBLIC_GA_ID` — Google Analytics 4 (`G-XXXX`)
- `NEXT_PUBLIC_SEARCH_CONSOLE_VERIFICATION` — Google Search Console 메타 인증
- `NEXT_PUBLIC_NAVER_SITE_VERIFICATION` — Naver Search Advisor 메타 인증
- `NEXT_PUBLIC_KAKAO_JS_KEY` — 카카오 공유 SDK 키
- `NEXT_PUBLIC_SAMEAS_URLS` — Organization JSON-LD `sameAs` URL 콤마 구분
- `NEXT_PUBLIC_AFFILIATE_3O3_URL` — 제휴 CTA URL (3.3 프리랜서 대상)

### 빌드/CI 시크릿(서버)
- `ECOS_API_KEY` — 한국은행 ECOS
- `EXIM_FX_API_KEY` — 한국수출입은행 환율
- `FSS_FINLIFE_API_KEY` — 금융감독원 금융상품
- `KOSIS_API_KEY` — 통계청
- `ANALYZE` — `true` 일 때 번들 분석 활성

### 보조 로딩 메커니즘
- 루트 `.my` 파일에서 키=값 자동 주입 (`next.config.ts` 자체 로더, 시스템 환경변수 우선). `.gitignore` 처리 필수.

## 15. 의존성 (핵심)
- `next@^15.0.3`
- `react@^19.0.0` / `react-dom@^19.0.0`
- `recharts@^2.13.3` (dynamic import 권장)
- `zod@^4.4.2`
- `clsx@^2.1.1` / `tailwind-merge@^2.5.4`
- `tailwindcss@^3.4.14` / `autoprefixer@^10.4.20` / `postcss@^8.4.47`
- `typescript@^5.6.3`
- `vitest@^3.2.4` / `@playwright/test@^1.48.2`
- `@testing-library/react@^16.0.1`
- `sharp@^0.34.5`
- `@cloudflare/workers-types@^4.20260503.1`
- `@next/bundle-analyzer@^16.2.4`
- `eslint@^9.14.0` / `eslint-config-next@^15.0.3`
- `prettier@^3.3.3` (+ `prettier-plugin-tailwindcss`)

## 16. 배포
- **호스팅**: Cloudflare Pages (정적 호스팅, `output: 'export'` → `out/` 산출)
  - `public/_headers` 존재 (Cloudflare Pages 전용 헤더 설정)
  - `dev:functions` 스크립트가 `wrangler pages dev` 사용
- **프로젝트 이름**: (미확인 — 코드/설정에 명시 없음, Cloudflare 콘솔에 존재 추정)
- **도메인**: calculatorhost.com
- **production branch**: `main`
- **PR 프리뷰**: `{branch}.calculatorhost.pages.dev` (docs/architecture.md §11 명시, 실 동작 미확인)

## 17. 페르소나·톤 (분석된 내용)
홈(`src/app/page.tsx`)의 `PERSONAS` 배열 + `docs/audience-personas.md` 기준.

- **주 타깃 (홈에 노출된 4)**:
  1. 직장인 — 연봉 협상·이직 전 세후 수치
  2. 부동산 거래 직전자 — 매매·전세 계약 전 세금/취득 비용
  3. 프리랜서·1인사업자 — 종합소득세·경비율·세액공제
  4. 대출 실행 예정자 — 주담대·전세대출 한도/월 상환액
- **확장 페르소나 (docs/audience-personas.md)**: 은퇴 준비층, 생활 투자자, 임대차 관계자, 청약 대기자, 블루오션(N잡러·학부모·전업주부·해외송금·자동차 구매자) — 총 7+6
- **톤·스타일**:
  - YMYL 신뢰성 우선 — 법조항 인용·1차 출처 링크·운영자 실명 공개·면책 명시
  - 함수형/실용형 — "1분 안에 결과 확인", "회원가입 불필요·무료·모바일 최적"
  - 친근하지만 과장 없음 — "최고/1위/유일/투자 권유/수익 보장" 등 표현 금지(`.claude/rules/seo-content.md`)
  - AI 활용 투명 공개 (about 페이지 §콘텐츠 제작 방식)
- **콘텐츠 유형**: 인터랙티브 계산기·시뮬레이터(30) + 시기성/분야별 가이드 아티클(18) + 용어사전 단일 페이지(18 용어)

## 18. JSON-LD / SEO
- **Schema.org 사용**: ✓ — `src/lib/seo/jsonld.ts` 헬퍼로 일관 생성
- **사용 type**:
  - `Organization` (전역 단일, 운영자/사업자번호/sameAs 포함, **`parentOrganization` → 스마트데이터샵 / smartdatashop.kr**)
  - `WebSite` (전역, 검색박스 SearchAction)
  - `SoftwareApplication` (계산기 페이지 필수, **`publisher.parentOrganization` + `isBasedOn=https://smartdatashop.kr/`**)
  - `WebPage`
  - `BreadcrumbList`
  - `FAQPage`
  - `HowTo` (사용 방법 섹션 있을 때)
  - `Speakable` (음성 최적화)
  - `Article` (가이드, **`publisher.parentOrganization` + `isBasedOn=https://smartdatashop.kr/`**)
  - `DefinedTerm` (용어사전)
  - `ItemList` (`/updates`)
- **smartdatashop network 부착 (2026-05-07 신설)**:
  - `isBasedOn`: `https://smartdatashop.kr/` — 메인 데이터 저널 derivation 신호
  - `parentOrganization`: `{ "@type": "Organization", "name": "스마트데이터샵", "url": "https://smartdatashop.kr" }`
  - 적용 대상: `Organization` / `SoftwareApplication`(계산기 30종) / `Article`(가이드 18종)
  - 단위 테스트: `tests/unit/seo/jsonld.test.ts` — "smartdatashop network 부착" describe 블록 3 cases
- **canonical**: ✓ — 모든 페이지 `alternates.canonical` 명시 (trailing slash 일관)
- **sitemap**: ✓ — `/sitemap.xml` (페이지별 mtime 기반 lastModified, 30 계산기 + 5 카테고리 + 18 가이드 + 인덱스/정책 페이지)
- **robots**: ✓ — `/robots.txt` route handler
- **RSS**: ✓ — `/feed.xml` (`<head>` 자동 발견 메타 포함)
- **PWA**: ✓ — `/site.webmanifest`, `/sw.js` 등록(자체 구현), `/offline.html` fallback
- **OG**: ✓ — `/og-default.png` (페이지별 OG는 `prebuild` 단계 `generate-og-images.mjs` 자동 생성)
- **검색엔진 인증**: Google Search Console + Naver Search Advisor (환경변수 기반 조건부 메타)
- **LLM/GEO**: ✓ — `public/llms.txt` 존재, 페이지 상단 `StructuredSummary` 의무 (정의·핵심 수치·TL;DR)

## 19. 광고
- **AdSense**: ✓
- **AdSense client ID** (`public/ads.txt` 기준): `ca-pub-************7404` (실제 값은 마스킹)
- **로딩 전략**: `lazyOnload` + `requestIdleCallback`, AdSlot은 IntersectionObserver로 viewport 진입 시점 push (TBT/CLS 영향 최소화)
- **슬롯 5종**: AD-1 리더보드 / AD-2 사각형 / AD-3 스카이스크래퍼 스티키 / AD-4 인피드 / AD-5 모바일 앵커
- **정책 가드**: `MobileAnchorAdGuard` 가 `/privacy/`, `/terms/`, `/contact/`, `/about/`에서 광고 비활성화
- **감사 도구**: `npm run audit:adsense` (`scripts/audit-adsense.mjs`)
- **기타 광고**: 제휴 마케팅(Affiliate) 컴포넌트 별도 (`AffiliateLink`/`AffiliateRecommendation`, `rel="sponsored"` 자동, `/affiliate-disclosure/` 공개 페이지 존재)

## 20. 현재 콘텐츠 통계 (분석 시점)
- 계산기 페이지: **30개** (홈 카피상 "31개" 표기와 1개 차이 — 실제 라우트 30)
- 카테고리 페이지: 5개
- 가이드 페이지: **18편** + 인덱스 1
- 용어사전: 1 페이지 (18 용어)
- 정책/메타 페이지: 5 (about, privacy, terms, contact, affiliate-disclosure)
- 변경 이력 hub: 1 (`/updates/`)
- 마지막 커밋 일자: **2026-05-07** (`663f1d3` — Merge PR #1 backref)
- 누적 커밋: 71 (`663f1d3` 시점)
- 활성 상태: **운영 중** — Vitest **900 PASS** (PR #1 후), Cloudflare Pages 배포 성공, backref 박스 시각 검증 통과
- 현재 OPEN PR: **PR #2** (`chore/lighthouse-lcp-relax`, 177bb59) — Lighthouse CI LCP 임계 4000ms 완화, 어설션 PASS 확인됨

## 21. NETWORK.md 헌법 적용 가능성
| 항목 | 상태 | 비고 |
|---|---|---|
| 디자인 토큰 (color/font) 메인 일치 | ✗ (의도) | NETWORK.md **v0.6 dual-brand 인정**. 자매는 다크 Fintech 토큰(`#595FF7` primary, Pretendard/Inter, `docs/design-system.md` SSoT) 자율 유지. 메인 토큰(`#8b1538` accent / `#faf7f0` wheat)은 `MainBackrefBox` 컴포넌트 한 곳에서만 의도적 사용 → 독자가 "메인 출처"를 시각 인식 |
| 4 절대 규칙 (신뢰성·실시간·정확성·출처표기) | ✓ | 신뢰성=YMYL 운영자 실명·사업자번호 공개 / 실시간=공공데이터 일일 sync(03 KST) + sitemap mtime / 정확성=`calc-logic-verifier` 에이전트 + Vitest 테스트 + 국세청 간이계산기 대조 / 출처표기=`authority-links.ts` + 페이지 내 권위 외부 링크 2~3개 의무 (`.claude/rules/seo-content.md`) |
| 의무 컴포넌트 (TrustBar / SourceList / 메인 backref) | ✓ **(2026-05-07 갱신)** | TrustBar=직접 컴포넌트 없음 (대용: `AuthorByline` + `DataFreshness` + `TrendBadge` 조합). SourceList=`authority-links.ts` 상수 + 각 계산기 본문 권위 링크 섹션. **메인 backref=`MainBackrefBox` 신설 + Footer 사이트 전역 + `/calculator/salary/` + `/guide/tax-calendar-2026/` 시범 적용 완료** |
| 안전 게이트 (smoke / verifier / fact-checker) | ✓ | smoke=Lighthouse CI workflow + Playwright E2E + 시각 회귀 / verifier=`calc-logic-verifier` 에이전트 + `seo-auditor` + `adsense-guardian` / fact-checker=`scripts/validate-seo.mjs` + `scripts/audit-adsense.mjs` + `scripts/launch-checklist.mjs` + `scripts/check-sync-health.mjs` + Ralph 일일 감사 도구군 |

→ **종합 (2026-05-07)**: 4 절대 규칙·안전 게이트·메인 backref 모두 충족. NETWORK.md v0.6 dual-brand 정합. 잔여: 자매 페이지 전체로의 backref 확산(현재 시범 2 페이지 + 사이트 전역 Footer / 30 계산기·18 가이드 개별 적용은 후속 phase 대상).

## 22. 변경 이력
- 2026-05-08 — **feat(network): public/network-mirror.json 빌드 시 자동 생성** (PR `feat/network-mirror-build`, commit `7180aa5`)
  - `scripts/generate-network-mirror.mjs` 신설 — calculatorhost 페이지 list manifest 출력 (75편: 계산기 30 + 가이드 18 + 용어 27)
  - `package.json` `prebuild` 에 자동 실행 연결 + `npm run generate:mirror` 단독 실행 지원
  - `robots.txt` 에 `Allow: /network-mirror.json` 명시 (기존 `Disallow: /*.json$` 보다 우선 적용)
  - `.gitignore` 에 `/public/network-mirror.json` 추가 (빌드마다 재생성, 커밋 노이즈 방지). Cloudflare Pages 빌드 시 자동 포함
  - 양식: spec 1:1 (`site` / `siteName` / `domain` / `lastUpdated` / `totalPosts` / `categories` / `personas` / `posts[]`)
  - 빌드 시간 영향: ~21ms 추가 (Negligible)
  - 메인(smartdatashop.kr) 일일 cron 으로 fetch → `sister-mirrors/calculatorhost/posts.json` sync 의 SSoT
- 2026-05-07 — 초기 자동 생성 (commit `16064a0` 기준 분석)
- 2026-05-07 — **feat(network): smartdatashop 메인 backref 컴포넌트 + JSON-LD 부착** (commit `663f1d3`, PR #1 머지)
  - `MainBackrefBox.tsx` 신설 (variant inline/sidebar/footer, 메인 토큰 #8b1538 + #faf7f0)
  - `src/lib/network/main-backref.ts` 카테고리 매핑 헬퍼 (tax/finance/real-estate/work → tax-finance, lifestyle → stats)
  - `/calculator/salary/`, `/guide/tax-calendar-2026/`, Footer 사이트 전역 적용
  - JSON-LD `Organization` / `SoftwareApplication`(계산기 30종) / `Article`(가이드 18종) 3종에 `isBasedOn=https://smartdatashop.kr/` + `publisher.parentOrganization` 부착
  - Vitest 단위 테스트 **+13 신규** (`tests/unit/network/main-backref.test.ts` 10 cases + `tests/unit/seo/jsonld.test.ts` smartdatashop network describe 3 cases) — **총 900 PASS**
  - 시각 회귀 32/32 갱신 (Footer 네트워크 섹션 추가에 따른 신규 스냅샷)
  - NETWORK.md v0.6 dual-brand 정합 — 자매 다크 Fintech 토큰(#595FF7) 자체 디자인 유지 + backref 박스 한 곳에서만 메인 토큰 사용
  - Cloudflare Pages 배포 성공, 박스 시각 검증 통과
- 2026-05-07 — **chore(ci): Lighthouse LCP 임계 2500 → 4000ms 완화** (commit `177bb59`, PR #2 OPEN)
  - 사유: GitHub Actions ubuntu-latest + 모바일 throttling 환경에서 SSG 페이지 LCP 일관 ~3.7-3.9s 측정 (사전 결함 정리)
  - PR #2 CI에서 LCP 어설션 PASS 확인됨 — main 머지 대기
  - 별건 큐: `lighthouse.yml` github-script 결과 게시 단계 JS 가드 누락(`result.categories` undefined 보호) + `ralph-daily.yml` 0 jobs 실행 정의 문제
