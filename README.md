# calculatorhost

한국 생활 금융·세금·부동산 계산기 종합 사이트.

## 빠른 시작

```bash
# 1. 의존성 설치
npm install

# 2. 환경변수 설정
cp .env.example .env.local
# .env.local 열어서 실제 값 채우기 (AdSense 클라이언트 ID 등)

# 3. 개발 서버
npm run dev
# http://localhost:3000

# 4. 빌드 (정적 출력)
npm run build
# → out/ 폴더에 정적 파일 생성 → Cloudflare Pages 배포

# 5. 테스트
npm test              # 단위 (Vitest)
npm run test:e2e      # E2E (Playwright)
npm run typecheck     # TypeScript
npm run lint          # ESLint
```

## 기술 스택
- Next.js 15 App Router (`output: 'export'`)
- TypeScript (strict)
- Tailwind CSS v3
- Recharts / Framer Motion
- 배포: Cloudflare Pages

## 프로젝트 구조
- `src/app/` — Next.js 라우트 (한글 슬러그)
- `src/components/` — UI 컴포넌트
- `src/lib/` — 계산 순수 함수 · 공공 API 클라이언트 · SEO 헬퍼
- `docs/` — SSoT 문서 (architecture, ADR, 계산기 명세)
- `.claude/` — Claude Code 하네스 (agents · skills · commands · rules)
- `tests/` — 단위·E2E·시각 회귀

## 중요 문서
- [CLAUDE.md](./CLAUDE.md) — Claude Code 루트 지시사항
- [docs/architecture.md](./docs/architecture.md) — 시스템 설계
- [docs/adr/](./docs/adr/) — 아키텍처 의사결정 기록
- [docs/calculator-spec/](./docs/calculator-spec/) — 계산기별 명세

## 기여 규칙
- 세율 값은 `src/lib/constants/tax-rates-{year}.ts`에만 저장 (매직넘버 금지)
- 계산 공식은 `src/lib/tax/` 또는 `src/lib/finance/` 순수 함수로
- UI 컴포넌트는 Tailwind 디자인 토큰만 사용
- 광고 슬롯은 `<AdSlot>` 재사용 (adsense-guardian 정책 준수)

## 라이선스
© calculatorhost. All rights reserved.
