# ADR-001: Next.js 채택 (Astro 대신)

**상태**: 수락됨  
**일자**: 2026-04-24  
**결정자**: 사용자 지정

## 맥락
정적 SEO 중심 계산기 사이트에 Astro가 기술적으로 더 적합 (순수 SSG, 번들 경량, 아일랜드 패턴)이라는 에이전트 권고가 있었으나, 사용자가 Next.js + TypeScript + Tailwind + src/ + App Router 조합을 명시 지정.

## 결정
**Next.js 15 App Router + TypeScript + Tailwind + src/ 구조 확정.**
- 배포 방식: `output: 'export'` 로 정적 사이트 생성
- Cloudflare Pages 배포 (어댑터 추후 필요 시 `@cloudflare/next-on-pages`)

## 근거
1. 사용자 명시 선택 (이미지로 지정)
2. Next.js 생태계 규모 — 문제 해결 자료 압도적
3. 추후 SSR/ISR 필요 (예: 실거래가 페이지 동적 생성) 시 마이그레이션 불필요
4. App Router = 최신 React Server Components 지원
5. `next/image`, `next/font`, `next/script` 최적화 번들

## 대안 고려
- **Astro**: 번들 경량, 아일랜드. 하지만 사용자 요구와 불일치
- **SvelteKit**: 학습 곡선, 한국어 생태계 작음
- **순수 HTML+JS**: 20+ 계산기 유지보수 부담

## 결과
- `output: 'export'` 로 MVP 빌드 → Cloudflare Pages 정적 업로드
- Core Web Vitals 타깃 유지 가능 (Cloudflare 엣지 + Next 정적화)
- 추후 동적 기능 필요 시 `@cloudflare/next-on-pages` 검토

## 리스크
- Next.js는 Astro 대비 번들이 약간 큼 → `next/dynamic`, 적극적 code splitting 으로 대응
- Cloudflare Pages 호환성 주의 — Edge Runtime 제약 (fs/path 불가)

## 관련
- docs/architecture.md §2 기술 스택
- docs/architecture.md §4 렌더링 전략
