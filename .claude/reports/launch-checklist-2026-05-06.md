# Day 0 발사 전 체크리스트

**날짜**: 2026-05-06  
**시간**: AM 7:38:11  

## 📋 자동 점검 결과

❌ **실패** (3 항목 / 3 경고)

| 항목 | 상태 | 메시지 |
|---|---|---|
| ads-txt | ❌ FAIL | ads.txt에 placeholder 또는 템플릿 값 포함 — 실제 AdSense Client ID로 교체 필수 |
| env-prod | ❌ FAIL | .env.production 파일 없음 — 프로덕션 빌드 시 필요 (Cloudflare Pages 대시보드 설정) |
| sitemap | ❌ FAIL | sitemap.xml 없음 — prebuild 스크립트 실행 필요 |
| og-images | ⚠️ WARN | OG 이미지 1개 (목표: 15개+ MVP) — 샘플: og-default.png |
| policy-pages | ✅ PASS | 필수 정책 페이지 확인 완료 |
| jsonld-coverage | ⚠️ WARN | 샘플 10개 중 10개 JSON-LD 누락 — 구조화 데이터 추가 권장 |
| canonical-urls | ⚠️ WARN | sitemap.xml 없음 — canonical URL 검증 불가 (sitemap 생성 후 재검사) |
| adsense-audit | ✅ PASS | AdSense 정책 감사 통과 |

## 👤 운영자 확인 사항

다음 항목들은 GUI/대시보드에서 수동 확인이 필요합니다:

1. [ ] **Cloudflare Pages 환경변수 설정 (NEXT_PUBLIC_ADSENSE_CLIENT)**
2. [ ] **Google Search Console 등록 + sitemap 제출**
3. [ ] **Google Analytics 4 + Web Vitals 연결 확인**
4. [ ] **DNS 스위치 (calculatorhost.com → Cloudflare Pages)**
5. [ ] **기존 Trend Money Lab 사이트 삭제**

## 🚀 배포 판정

**NO-GO**: 자동 점검 실패. 위 ❌ 항목들을 먼저 수정한 후 재실행.

## 📝 배포 예상 소요 시간

- 자동 점검: 4~8분 (추가 2개 점검: JSON-LD, Canonical URLs)
- 운영자 수동 확인: 15~20분 (5개 항목)
- Cloudflare Pages 빌드: 2~5분
- **총: 21~33분**

## 📚 근거 문서

- docs/architecture.md §11
- CLAUDE.md "배포 체크리스트"
- .claude/skills/adsense-policy-reference/REFERENCE.md
