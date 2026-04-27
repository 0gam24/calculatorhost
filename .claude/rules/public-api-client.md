---
paths:
  - src/lib/publicapi/**
  - src/app/api/**
---

# 공공 API 클라이언트 규칙

## 디렉토리
```
src/lib/publicapi/
├── client.ts       ← 공통 fetch 래퍼 (retry/timeout/에러)
├── types.ts        ← 공통 zod 스키마
├── realestate.ts   ← 국토교통부 실거래가
├── ecos.ts         ← 한국은행 ECOS
├── customs.ts      ← 관세청 환율
├── finlife.ts      ← 금감원 금융상품
└── kosis.ts        ← 통계청
```

## 구현 원칙

### 1. 모든 응답 zod 검증
스키마 변경 감지 위해. 검증 실패 시 상세 에러 로깅.

### 2. Edge Runtime 호환
- Node.js 전용 모듈 (fs/path) 금지
- fetch + Response API만
- Cloudflare Pages 엣지에서 실행 가능해야 함

### 3. 타임아웃 필수
```ts
AbortSignal.timeout(10_000) // 10초
```

### 4. 캐싱
- 실거래가: `next: { revalidate: 86400 }` (하루)
- ECOS 금리/환율: `next: { revalidate: 86400 }`
- 금융상품 공시: `next: { revalidate: 604800 }` (주간)

### 5. 에러 처리
- `PublicApiError` 커스텀 클래스
- 실패 시 "일시적으로 수동 입력" 폴백 UI
- Sentry/Cloudflare Logs 기록

### 6. 인증키
- `.env.local` 에서 읽기 (코드에 노출 금지)
- Cloudflare Pages 환경변수로 배포
- 이름: `PUBLIC_DATA_KEY`, `ECOS_API_KEY`, `KOSIS_API_KEY`, `FINLIFE_API_KEY`

## 금지
- 인증키 하드코딩
- XML 응답을 문자열로 파싱 (xml parser 사용)
- 캐싱 없이 실시간 호출
- 호출 제한 초과

## 에이전트 위임
API 조사·연동 설계는 **api-researcher** 우선 호출.
참조: `.claude/skills/public-data-catalog/REFERENCE.md`
