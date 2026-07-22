# Design System (요약)

> **Status**: SSoT — 토큰 확정판
> **상세 템플릿**: `.claude/skills/design-system-fintech/REFERENCE.md` (구 다크 Fintech 기준 — 토큰은 본 문서가 우선)
> **Last updated**: 2026-07-08 (딥 틸 그린 리브랜딩)

## 1. 컨셉
**라이트 퍼스트 · 딥 틸 그린 신뢰 테마** (2026-07-08 운영자 제공 `docs/bundle.html` 시안 기반, shadcn/ui 계열).
- 라이트 = 시안 충실 재현 / 다크 = 틸 파생(운영자 승인 — 토글·E2E 골든패스 theme.e2e.ts 유지)
- 이전: 다크 Fintech 퍼플(#595FF7) — ADR-004. 리브랜딩 이력은 §11 로그 참조.

## 2. 컬러 토큰 (확정)

```ts
// tailwind.config.ts 에 반영 (2026-07-08 리브랜딩)
{
  primary: {  // 딥 틸 그린 램프 (bundle.html)
    50:'#f0f7f5', 100:'#e2efeb', 200:'#c5e2da', 300:'#8fc7ba', 400:'#2f9b85',
    500:'#1f7d6b', 600:'#1a6b5c', 700:'#14584c', 800:'#103f37', 900:'#0b2c26',
  },
  secondary:  { 500: '#5f6b76', 600: '#4a545e', 700: '#2a3742' },  // 뉴트럴 그레이블루
  highlight:  { 500: '#c68b2c', 600: '#9c6413' },                   // 골드
  danger:     { 500: '#dc2626', 600: '#b23a2f' },                   // 레드

  // CSS 변수로 토글
  bg: { base: 'var(--bg-base)', card: 'var(--bg-card)' },
  text: { primary: 'var(--text-primary)', secondary: 'var(--text-secondary)' },
  border: { base: 'var(--border-base)' }
}
```

```css
:root[data-theme='light'] {  /* 기본 — bundle 시안 충실 */
  --bg-base: #f4f7f8;
  --bg-card: #ffffff;
  --bg-raised: #e9edf0;
  --text-primary: #0e1720;
  --text-secondary: #2a3742;
  --text-tertiary: #5f6b76;   /* WCAG AA ≈5.7:1 on white */
  --border-base: #e2e7ea;
}
:root[data-theme='dark'] {   /* 틸 파생 다크 */
  --bg-base: #0f1614;
  --bg-card: #16211e;
  --bg-raised: #1e2b27;
  --text-primary: #eef2f1;
  --text-secondary: #a9b6b2;
  --text-tertiary: #7f8c88;
  --border-base: #27342f;
}
```

**차트/그래픽 파생색**: 데이터 시각화는 틸 계열(#1f7d6b·#2f9b85·#8fc7ba) + 골드(#c68b2c·#dbab4b) + 레드(#dc2626)만 사용. OG 이미지·아이콘 동일(scripts/generate-og-images.mjs·public/icon.svg).

## 3. 타이포그래피
- 한글/UI: **Pretendard Variable**
- 숫자/영문: **Inter Variable**
- 결과 hero 숫자는 48px

## 4. 간격
8px 기준. space-4 (16px) 기본.

## 5. 라운드 (2026-07-08 bundle 시안 기조 — --radius 0.5rem)
- 카드: 12px (`rounded-card`)
- 칩(단위 버튼): 8px (`rounded-chip`)
- 인풋: 8px

## 6. AdSense 슬롯 특수 규칙
- **라이트 배경 강제** (`bg-white` / dark 토글 시에도 유지)
- `min-height: 250px` (CLS 방지)
- "광고" 라벨 필수 (12px, text-secondary)
- 페이지당 ≤ 4개

## 7. 접근성
- WCAG 2.2 AA
- 색 대비 4.5:1
- 포커스 링 `focus-visible:ring-2 ring-primary`
- `prefers-reduced-motion` 존중

## 8. 반응형
```
sm: 640px
md: 768px  ← 사이드바 아이콘만
lg: 1024px ← 우측 AdSense 사이드바 노출
xl: 1280px ← 본문 max-width
```

## 9. 레이아웃 프레임 (2026 광고 배치 아키텍처 반영)
```
┌──────┬──────────────────────────────────┬────┐
│      │ [헤더 (로고·검색·테마토글)]         │    │
│      ├──────────────────────────────────┤    │
│      │ [📢 AD-1 리더보드 728x90/970x250]  │    │
│      ├──────────────────────────────────┤ 🎯 │
│ 사   │                                  │ AD │
│ 이    │ H1 + 리드                         │ -3 │
│ 드   │                                  │ 300│
│ 바   │ [📊 Structured Summary (GEO)]     │ x  │
│ 아   │                                  │ 600│
│ 이   │ [🔢 계산기 폼]                    │    │
│ 콘   │                                  │ 스  │
│      │ [📈 결과 카드]                    │ 티  │
│      │                                  │ 키  │
│      │ [📢 AD-2 Medium Rect 300x250]    │    │
│      │                                  │    │
│      │ [본문 - 정의/공식/팁]              │    │
│      │                                  │    │
│      │ [📢 AD-4 인피드]                  │    │
│      │                                  │    │
│      │ [FAQ (중간 배치 - GEO)]           │    │
│      │                                  │    │
│      │ [관련 계산기 링크]                  │    │
├──────┴──────────────────────────────────┴────┤
│ [푸터]                                        │
├───────────────────────────────────────────────┤
│ [📱 AD-5 모바일 앵커 (모바일 전용 고정)]        │
└───────────────────────────────────────────────┘
 72px            ~800px                    300px
```

### 광고 슬롯 규격 (2026 eCPM 최적화 — 보고서 §6)
| 슬롯 | 규격 | 배치 | eCPM 기대 |
|---|---|---|---|
| AD-1 리더보드 | 728×90 (데스크톱) / 970×250 (빌보드) | 헤더 아래 | 권위 + 프리미엄 입찰 |
| AD-2 Medium Rectangle | 300×250 | 계산기-본문 사이 | **최고 CTR** 구역 |
| AD-3 Large Skyscraper | 300×600 스티키 | 우측 사이드바 | 최장 Viewability |
| AD-4 인피드 | 반응형 | 본문 단락 사이 | F자 시선 흐름 |
| AD-5 모바일 앵커 | 320×50 / 320×100 | 화면 하단 고정 | 모바일 주력 |

### AdSense + GEO/AEO 동시 달성 원칙
- Structured Summary와 FAQ가 **상단**에 있어 LLM 인용 유리
- 광고 AD-2, AD-4는 **콘텐츠 중간** → 본문 체류 시간 확보
- 우측 AD-3 스티키 = knowingasset.com 실제 배치 방식

## 10. 가이드 아티클 본문 타이포그래피 (2026-06-16, **2026-07-22 가독성 리디자인**)

**스코프**: `.guide-scope main article.max-w-3xl` — 포스팅 본문만 (인덱스 max-w-5xl·카테고리 허브 제외)
**레퍼런스**: 머니룩(asiatop.co.kr) 아티클 — 운영자 지정 (2026-07-22). 장식 대신 크기·굵기·여백으로 위계.

### 10-0. 본문 기본 타이포 (2026-07-22)
- 데스크톱(md+) 본문 17px (`1.0625rem`), 모바일 16px 유지
- 문단 line-height 1.85 / 리스트 1.8
- H1(헤더): 2.25rem, line-height 1.28, letter-spacing -0.02em, weight 800
- 리드 문단(`header > p.text-lg`): 1.125rem, 행간 1.8, `--text-secondary`

### 10-1. H2 섹션 헤더 (2026-07-22 개정 — 장식 제거, 크기·여백 위계)
- **액센트 바·하단 구분선 제거** (구 2026-06-16 스펙 폐기 — 시인성 약해 가독성 저하, 운영자 지시)
- 크기 1.625rem / weight 800 / letter-spacing -0.01em / line-height 1.35
- **margin-top 2.75rem** (+ 섹션 space-y-8) → 섹션이 시각적으로 확실히 끊어짐
- H3: 1.1875rem / weight 700 / margin-top 1.5rem

### 10-1-1. 콜아웃·요약 박스 (2026-07-22)
- 대상: `div[class~='bg-bg-card']` 중 hover 유틸 없는 콘텐츠 박스 (링크 카드 제외)
- 배경 `--guide-callout-bg` (라이트 `#f2f9f7` / 다크 `rgba(31,125,107,.12)`) + **좌측 3px `#2f9b85`(primary-400) 액센트**
- 기능: TL;DR·주의·판별 기준 박스가 본문과 확실히 구분 (레퍼런스 "30초 요약" 박스 역할)

### 10-1-2. 표 캡션 (2026-07-22)
- `caption-side: top`, 좌측 정렬, 0.8125rem, `--text-tertiary`, 하단 패딩 0.5rem

### 10-2. 표 스타일 (세로 그리드 → 가로형 디자인)
- **테이블 전체**: border-collapse, 외곽 border 제거
- **셀**: 좌우 패딩 0.75rem, 상하 0.625rem, border-bottom만 (var(--border-subtle), 가로줄)
- **헤더 (thead th)**: 배경 var(--bg-raised), 하단 보더 var(--border-base), font-weight 600
- **지브라 줄무늬**: tbody tr:nth-child(even) → var(--bg-card) (미묘한 행 구분, 가독성 향상)
- **마지막 행**: border-bottom 제거 (불필요한 하단선 제거)
- **기술**: @layer utilities 사용으로 Tailwind 유틸리티 클래스 안전하게 오버라이드
- **대비**: 다크 모드에서도 테이블 가독성 100% 유지 (토큰 기반)

### 10-3. 본문 문단 행간
- line-height: 1.8 (기본 1.72 → 개선, 가독성 강화)

### 10-4. 기술 구현 (src/app/guide/layout.tsx + src/app/globals.css)
- **레이아웃 래퍼**: .guide-scope 클래스 (라우트 스코프 격리, 계산기 페이지 완전 제외)
- **CSS 계층화**: @layer utilities로 선언하여 Tailwind 유틸리티와 우선순위 충돌 없음
- **토큰 사용**: 신규 색상 추가 없음, 기존 CSS 변수만 활용

### 10-5. 비영향 범위
- 계산기 페이지 (`/calculator/*`): 완전 독립 (다른 레이아웃 wrapper 없음)
- 카테고리 인덱스 (`/category/*`): 독립
- 정책 페이지 (`/privacy`, `/terms`): 독립

## 11. 업데이트 로그
- 2026-04-24: 초판 확정 (Figma 레퍼런스 반영)
- 2026-04-24: §9 광고 배치 5슬롯 아키텍처 추가 (2026 AdSense 수익 전략 보고서 반영)
- 2026-06-16: §10 가이드 아티클 본문 타이포그래피 추가 (H2 구분선 + 가로형 표 + 토큰 기반 스타일)
- 2026-06-16: §10-1 H2 좌측 브랜드 액센트 바 추가 (하단 구분선 유지 — 풀 그라데이션 박스안은 테마 토큰 무시·YMYL 신뢰감 이유로 기각)
- 2026-07-08: 딥 틸 그린 리브랜딩 — 운영자 제공 docs/bundle.html 시안 적용. §1 컨셉·§2 토큰(틸 램프/골드/뉴트럴)·§5 라운드(12px/8px) 전면 교체, 다크는 틸 파생으로 토글 유지. 차트·OG·파비콘 동일 팔레트.
