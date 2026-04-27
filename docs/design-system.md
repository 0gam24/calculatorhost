# Design System (요약)

> **Status**: SSoT — 토큰 확정판
> **상세 템플릿**: `.claude/skills/design-system-fintech/REFERENCE.md`
> **Last updated**: 2026-04-24

## 1. 컨셉
**다크 Fintech 대시보드**. 사용자 제공 Figma 레퍼런스 기반.

## 2. 컬러 토큰 (확정)

```ts
// tailwind.config.ts 에 반영
{
  primary:    { 500: '#595FF7', 600: '#4B51E8' },   // 파란퍼플
  secondary:  { 500: '#8EC9DC', 600: '#5AA3BA' },   // 시안
  highlight:  { 500: '#F7C159' },                    // 옐로
  danger:     { 500: '#FC354D' },                    // 레드

  // CSS 변수로 토글
  bg: { base: 'var(--bg-base)', card: 'var(--bg-card)' },
  text: { primary: 'var(--text-primary)', secondary: 'var(--text-secondary)' },
  border: { base: 'var(--border-base)' }
}
```

```css
:root[data-theme='dark'] {
  --bg-base: #272A2F;
  --bg-card: #2F3238;
  --text-primary: #F5F6F8;
  --text-secondary: #A8ADB5;
  --border-base: #3A3E45;
}
:root[data-theme='light'] {
  --bg-base: #F7F8FA;
  --bg-card: #FFFFFF;
  --text-primary: #1A1D21;
  --text-secondary: #6B7280;
  --border-base: #E5E7EB;
}
```

## 3. 타이포그래피
- 한글/UI: **Pretendard Variable**
- 숫자/영문: **Inter Variable**
- 결과 hero 숫자는 48px

## 4. 간격
8px 기준. space-4 (16px) 기본.

## 5. 라운드
- 카드: 16px
- 칩(단위 버튼): 24px
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

## 10. 업데이트 로그
- 2026-04-24: 초판 확정 (Figma 레퍼런스 반영)
- 2026-04-24: §9 광고 배치 5슬롯 아키텍처 추가 (2026 AdSense 수익 전략 보고서 반영)
