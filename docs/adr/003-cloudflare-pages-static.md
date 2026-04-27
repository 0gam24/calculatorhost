# ADR-003: Cloudflare Pages + 정적 출력

**상태**: 수락됨  
**일자**: 2026-04-24

## 맥락
배포 플랫폼 선택 — Vercel vs Cloudflare Pages vs 기존 WordPress 호스팅. 사용자가 GitHub + Cloudflare Pages 지정.

## 결정
**Cloudflare Pages + Next.js `output: 'export'` 정적 출력** 채택.

### 빌드 설정
```ts
// next.config.ts
export default {
  output: 'export',
  images: { unoptimized: true }, // Cloudflare Pages 에서 Image Optimization 서비스 필요시 추가 설정
  trailingSlash: false,
};
```

### 배포 플로우
```
GitHub push → GitHub Actions (lint/test/typecheck)
            → Cloudflare Pages 자동 빌드
            → {branch}.calculatorhost.pages.dev 프리뷰
            → main 머지 시 calculatorhost.com 본 배포
```

## 근거
1. **사용자 지정**
2. **무료 티어 후함**: 빌드 500회/월, 대역폭 무제한
3. **전 세계 엣지 CDN**: Core Web Vitals LCP 강화
4. **GitHub 통합**: PR마다 프리뷰 URL 자동
5. **도메인 연결 간편**: Cloudflare DNS와 원클릭
6. **DDoS 방어**: 기본 포함
7. **AdSense 호환**: 도메인 레벨 광고는 호스팅과 무관

## 대안 고려
- **Vercel**: Next.js 네이티브, 하지만 대역폭 상한·유료 전환 빠름
- **기존 WordPress 호스팅**: 정적 사이트에 부적합
- **AWS/GCP**: 설정 복잡, 오버엔지니어링

## 결과
- 초기 정적 출력 → 단순·빠름
- 추후 동적 기능 필요 시 `@cloudflare/next-on-pages` 어댑터 도입 가능
- 환경변수는 Cloudflare Pages 대시보드에서 관리

## 리스크
- Next.js Image Optimization 기본 서버 기능 사용 불가 → `unoptimized` 또는 Cloudflare Images 유료
- Edge Runtime 제약: Node.js 전용 모듈 불가
- Build 시간 상한(20분) 존재 → 정적 페이지 수 많아지면 분할 고려

## 전환 전략
기존 WordPress "Trend Money Lab" 삭제는 새 사이트 안정화 후 한번에 DNS 스위치:
1. 새 사이트 QA 완료
2. `calculatorhost.pages.dev` 프리뷰에서 검증
3. DNS 전환 (Cloudflare로 네임서버 이전 또는 A/CNAME 변경)
4. 기존 WP DB/파일 백업 후 삭제

## 관련
- docs/architecture.md §11 배포 환경
- .claude/commands/deploy.md
