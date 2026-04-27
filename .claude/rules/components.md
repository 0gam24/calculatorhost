---
paths:
  - src/components/**
---

# 컴포넌트 규칙

## 파일 위치
- `src/components/layout/` — Header, Sidebar, Footer, ThemeToggle
- `src/components/calculator/` — Form, Result, UnitButtons, Comparison
- `src/components/charts/` — LineChart, DonutChart, BarChart (Recharts 래퍼)
- `src/components/ads/` — AdSlot, ConsentBanner
- `src/components/ui/` — Button, Input, Select, Chip, Card (원자)

## 스타일링
- Tailwind 유틸만 (CSS 모듈 최소화)
- **토큰만 사용** — 하드코딩 색/크기 금지
- 색: `text-primary-500`, `bg-card`, `border-base` 등
- 간격: `space-4` (16px) 등 8px 기준

## 반응형
- mobile-first
- breakpoint: sm(640) / md(768) / lg(1024) / xl(1280)

## 다크/라이트
- CSS 변수 (`var(--bg-card)`) 활용
- `data-theme` attribute 토글
- 광고 영역만 라이트 강제

## 접근성
- 모든 인풋에 label 연결
- aria-label / role 필요 시
- `focus-visible:ring-2 ring-primary` 포커스 인디케이터
- `prefers-reduced-motion` 존중

## TypeScript
- `any` 금지
- Props 인터페이스 명시
- children은 `React.ReactNode`

## 금지
- `<img>` 직접 사용 → `next/image`
- inline `<style>` → Tailwind 또는 CSS 모듈
- 하드코딩 색상

## 에이전트 위임
UI 작업은 **frontend-builder** 전담. 디자인 토큰 확장 필요 시 `docs/design-system.md` 먼저 업데이트.
