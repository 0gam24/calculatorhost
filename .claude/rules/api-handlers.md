---
paths:
  - src/app/api/**
---

# API Route Handlers 규칙

## 기본
Next.js App Router `route.ts` 파일 (Edge Runtime 권장).

## Edge Runtime
```ts
export const runtime = 'edge';
```
Cloudflare Pages 호환 위해 필수.

## 응답 표준
- `NextResponse.json(data, { status })` 사용
- 에러: `{ error: string, code: string }` 형식
- 성공: 데이터 그대로

## 입력 검증
- zod 스키마로 body/query 검증
- 검증 실패 → 400

## 인증 (필요 시)
- 사용자 기능 구현 시 도입
- 현재는 불필요 (정적 사이트)

## 캐시
- 가능하면 클라이언트 사이드만 처리
- 서버 fetch 필요 시 `revalidate` 명시
- 공공 API 프록시는 엣지 캐시 활용

## 금지
- `any` 타입
- 인증키 응답에 포함
- 긴 타임아웃 (15s 초과)
- Node.js 전용 모듈

## 에이전트 위임
외부 API 연동은 **api-researcher** 우선 호출로 설계.
