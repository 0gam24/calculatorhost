# Design System: Dark Fintech Dashboard

> **소스**: 사용자 제공 Figma 레퍼런스(2026-04-24)
> **테마**: 다크 Fintech 기본 + 라이트 광고 컨테이너 + 사용자 토글

---

## §1. 디자인 원칙

1. **계층감(Depth)**: 다크 위에 덜 어두운 카드 레이어, subtle glow
2. **정보 밀도**: 대시보드 감성으로 숫자·차트·리스트 조밀 배치
3. **가독성**: 큰 숫자 강조 + 보조 정보는 회색
4. **접근성**: 대비 4.5:1 이상, 키보드 네비게이션, aria-label
5. **한국어 최적화**: Pretendard 폰트, 숫자는 Inter

---

## §2. 컬러 팔레트

### 정확한 HEX (Figma 레퍼런스)
| 역할 | Dark 값 | Light 값 (토글 시) | Tailwind 이름 |
|---|---|---|---|
| primary | `#595FF7` | `#4B51E8` | `primary-500` |
| secondary | `#8EC9DC` | `#5AA3BA` | `secondary-500` |
| bg | `#272A2F` | `#F7F8FA` | `bg-base` |
| bg-card | `#2F3238` | `#FFFFFF` | `bg-card` |
| highlight | `#F7C159` | `#E5A93F` | `highlight-500` |
| danger | `#FC354D` | `#E0243B` | `danger-500` |
| text-primary | `#F5F6F8` | `#1A1D21` | `text-primary` |
| text-secondary | `#A8ADB5` | `#6B7280` | `text-secondary` |
| border | `#3A3E45` | `#E5E7EB` | `border-base` |

### 파생 (투명도)
- 카드 호버: primary 10% alpha
- 포커스 링: primary 40% alpha + 2px

### tailwind.config.ts
```ts
export default {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: { 500: '#595FF7', 600: '#4B51E8' },
        secondary: { 500: '#8EC9DC', 600: '#5AA3BA' },
        highlight: { 500: '#F7C159' },
        danger: { 500: '#FC354D' },
        bg: { base: 'var(--bg-base)', card: 'var(--bg-card)' },
        text: { primary: 'var(--text-primary)', secondary: 'var(--text-secondary)' },
        border: { base: 'var(--border-base)' },
      },
      borderRadius: { card: '16px', chip: '24px' },
    },
  },
};
```

CSS 변수로 토글:
```css
:root[data-theme='dark'] {
  --bg-base: #272A2F;
  --bg-card: #2F3238;
  --text-primary: #F5F6F8;
  /* ... */
}
:root[data-theme='light'] {
  --bg-base: #F7F8FA;
  --bg-card: #FFFFFF;
  --text-primary: #1A1D21;
}
```

---

## §3. 타이포그래피

### 폰트
- **한글 / UI**: Pretendard Variable (`next/font/local` 또는 `@fontsource/pretendard`)
- **숫자 / 영문**: Inter Variable
- **폰트 스케일**:

| 이름 | 크기 | 행간 | 용도 |
|---|---|---|---|
| `text-hero` | 48px | 1.1 | 결과 숫자 (큰 강조) |
| `text-h1` | 32px | 1.2 | 페이지 제목 |
| `text-h2` | 24px | 1.3 | 섹션 제목 |
| `text-h3` | 20px | 1.4 | 카드 제목 |
| `text-body` | 16px | 1.6 | 본문 |
| `text-small` | 14px | 1.5 | 보조 텍스트 |
| `text-caption` | 12px | 1.4 | 캡션/라벨 |

### 굵기
- semibold (600) 기본 제목
- medium (500) 본문 강조
- regular (400) 본문

---

## §4. 간격 (Spacing)

8px 기준:
- `space-1` = 4px
- `space-2` = 8px
- `space-3` = 12px
- `space-4` = 16px (기본)
- `space-6` = 24px
- `space-8` = 32px
- `space-12` = 48px

섹션 간격 `space-12`, 카드 내부 `space-6`, 폼 필드 간 `space-4`.

---

## §5. 핵심 컴포넌트 템플릿

### 5-1. AppShell (전체 레이아웃)
```
┌──────┬──────────────────────────────┬────┐
│ ∎ 홈 │ [헤더: 로고·검색·테마토글]     │ A  │
│ ∎ 계 │ ┌──────────────────────────┐│ D  │
│ ∎ 사 │ │ [본문: 계산기/차트/결과]  ││ 슬 │
│ ∎ 정 │ └──────────────────────────┘│ 롯 │
│      │                              │    │
│ 토글 │ [푸터: 약관·연락처]           │    │
└──────┴──────────────────────────────┴────┘
  72px               ~800px             300px
```
- 좌측 사이드바: 아이콘 전용 기본, hover 시 expand (CSS transition)
- 우측 AdSense 영역: 데스크톱만 (lg: breakpoint ↑), 라이트 카드 컨테이너로 감쌈 (다크 테마 충돌 방지)
- 모바일: 사이드바 hamburger 토글, 광고는 본문 하단/인피드

### 5-2. 계산기 폼 카드
- 배경 `bg-card`, border `border-base 1px`, rounded `card`
- 라벨: text-small text-secondary
- 입력: dark input에 primary 포커스 링
- 단위 버튼(`[억][천만]`): chip 스타일, 선택 시 primary 배경

### 5-3. 결과 카드
- Hero 숫자: text-hero primary
- 항목 리스트: grid 2열 (항목명 + 금액)
- "왜 이 숫자인가?" 토글 → AI 해설 펼침
- [인쇄] [공유] [시나리오 비교] 버튼

### 5-4. 차트 카드
- Recharts 라이브러리
- 라인: primary, secondary
- 영역: primary 20% alpha gradient
- 그리드: border-base
- 툴팁: bg-card + primary border

### 5-5. AdSense 슬롯 (중요)
```tsx
<div className="ad-slot bg-white rounded-card p-2" style={{ minHeight: 250 }}>
  <span className="text-xs text-gray-500">광고</span>
  <ins className="adsbygoogle" ... />
</div>
```
- **라이트 배경 강제** (다크 테마와 충돌 방지, AdSense 가독성)
- `min-height` 고정 (CLS 방지)
- "광고" 라벨 명시 (AdSense 정책)

### 5-6. 버튼
- Primary: bg-primary text-white, hover scale-105
- Secondary: border-primary text-primary, hover bg-primary/10
- Danger: bg-danger
- Ghost: text-primary, hover bg-primary/10

### 5-7. 인풋
- Number input: 우측 정렬, 큰 폰트
- 단위 버튼 그룹: chip 스타일
- 포커스: primary 2px ring + primary-500 border

### 5-8. 테이블
- 헤더: bg-card/50, text-secondary, uppercase text-caption
- 행: hover bg-primary/5
- 모바일: 카드형 변환

---

## §6. 모션 & 마이크로 인터랙션

- 입력 변경 시 결과 업데이트: 300ms ease-out 슬라이드
- 카드 호버: 2px lift (translate-y-[-2px]) + shadow
- 탭 전환: 150ms fade
- 로딩: skeleton (bg-card/50)
- 차트: 500ms ease-out stroke-dashoffset 애니메이션
- Framer Motion으로 구현 시 `reduced-motion` 쿼리 존중

---

## §7. AdSense 디자인 규칙 (adsense-guardian와 연동)

- 광고 배경은 **항상 라이트** (다크 전환 금지)
- 광고와 실제 콘텐츠 시각적 명확 구분 (spacing 24px 이상)
- "광고" 라벨 12px text-secondary로 상단 표시
- CLS 0 유지: 모든 슬롯에 `min-height` 고정
- 4개 초과 금지

---

## §8. 접근성 (WCAG 2.2 AA 목표)

- 색 대비 4.5:1 (텍스트), 3:1 (큰 텍스트·아이콘)
- 포커스 가시 인디케이터 필수 (`focus-visible:ring-2 ring-primary`)
- 키보드 네비게이션 전체 지원
- aria-label / role 적절히
- form input마다 label 연결
- 폼 에러 텍스트 `role="alert"`
- 모션 `prefers-reduced-motion` 존중

---

## §9. 반응형 브레이크포인트

```
sm: 640px   (모바일 큰 화면)
md: 768px   (태블릿)
lg: 1024px  (데스크톱)
xl: 1280px  (와이드)
2xl: 1536px
```

Mobile-first:
- 기본: 사이드바 닫힘, 광고 본문 하단
- `md+`: 사이드바 아이콘만 표시
- `lg+`: 우측 AdSense 사이드바 노출
- `xl+`: 본문 max-width 확장

---

## §10. 다크/라이트 토글

- localStorage `theme` 키에 사용자 선택 저장
- 초기 로드 시 `data-theme` 속성 body에 적용 (FOUC 방지 위해 inline script)
- 시스템 설정 존중 (`prefers-color-scheme`)
- 헤더 우측에 토글 버튼

---

## §11. 참고 이미지·레퍼런스

- Figma 원본 (사용자 보관)
- 팔레트/타이포는 사용자 제공 이미지(2026-04-24) 기준
- AdSense 배치는 knowingasset.com 실제 스크린샷(2026-04-24) 참고

---

## §12. 업데이트 로그
- 2026-04-24: 초판 (다크 Fintech 기반)
