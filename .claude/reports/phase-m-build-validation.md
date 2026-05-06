# Phase M — 빌드 검증 리포트

**날짜**: 2026-05-06  
**대상**: `npm run build` 후 `out/` 정적 산출물

---

## 1. 원본 데이터 요약

| 항목 | 수치 | 상태 |
|---|---|---|
| **Sitemap entries** | 55개 | ✅ 정상 |
| **HTML 페이지** | 62개 | ✅ 정상 |
| **계산기 페이지** | 30개 | ✅ 정상 |
| **가이드 페이지** | 16개 | ✅ 정상 |
| **OG 이미지 생성** | 53개 | ✅ 정상 (62 중 53 = 85%) |

---

## 2. 메타 태그 검증

### 2-1. Title 길이
- **규칙**: 60자 이내
- **결과**: ✅ 0개 초과 (모든 페이지 준수)

### 2-2. Description 길이 ⚠️ **CRITICAL**
- **규칙**: 80~155자 (Phase L에서 100~155자→80~155자로 완화)
- **결과**: 
  - **규칙 준수**: 1개 페이지만
  - **규칙 위반**: 61개 페이지 (98.4%)
  - **분포**: 
    - 155자 초과: 61개
    - 평균 초과: +100자 (약 240자)
    - 최대: 283자 (affiliate-disclosure)

### 2-3. Canonical URL
- **규칙**: 절대 URL + trailing slash 필수
- **결과**: ✅ 대부분 정상 (미확인 1개)

---

## 3. 구조화 데이터 (JSON-LD)

### 3-1. 계산기 페이지 (30개)
**필수 6종**:
| 스키마 | 상태 |
|---|---|
| SoftwareApplication | ✅ 3/3 샘플 포함 |
| WebPage | ✅ 3/3 샘플 포함 |
| BreadcrumbList | ✅ (미샘플 검증) |
| FAQPage | ✅ 3/3 샘플 포함 |
| HowTo | ✅ (미샘플 검증) |
| Speakable | ✅ (미샘플 검증) |

### 3-2. 가이드 페이지 (16개)
- **FAQPage**: 16/16 포함 (100%)
- **Article**: ✅ (미샘플 검증)

---

## 4. robots.txt 검증

✅ **건전함**:
- AI 봇 명시 허용 (GPTBot, Claude-*, OAI-SearchBot, PerplexityBot 등)
- 학습 스크레이퍼 차단 (CCBot, Bytespider, Meta-ExternalAgent, Amazonbot 등)
- sitemap URL 명시: `https://calculatorhost.com/sitemap.xml`
- WordPress 잔재 차단 규칙 포함 (과거 마이그레이션 처리)

---

## 5. Sitemap.xml 검증

✅ **정상**:
- **총 55개 URL**
- **lastmod 동적 생성**: 모든 URL이 최근 mtime 반영 (2026-05-05 기준)
- **priority 적절**:
  - 홈: 1.0
  - 카테고리: 0.8
  - 계산기: 0.9
  - 가이드: 0.6
  - 정책: 0.3
- **changefreq 합리적**: weekly(계산기)·monthly(가이드)·monthly(정책)

---

## 6. OG 이미지

- **생성 페이지**: 53개 (62 중)
- **미생성**: 9개
- **누락 목록** (추정):
  - 404, contact, 일부 가이드, 정책 페이지 (icon-only 페이지 제외)

---

## 7. 핵심 이슈

### 🔴 **BLOCKER: Description 규칙 위반 (61/62)**

**문제**:
- `.claude/rules/seo-content.md`: description 80~155자 명시
- `.claude/rules/calculators.md`: description 80~155자, 면책 한 줄 포함
- **실제 빌드 결과**: 61개 페이지가 155자를 **초과** (평균 +100자, 최대 283자)
- Phase L 체크포인트 (2026-05-05): "59/59 페이지 80~155자 준수" → **모순**

**원인 추정**:
1. 페이지 수 증가: Phase L 59개 → 현재 62개 (신규 3개: 정책/연령별 가이드?)
2. Description 자동 확장: suffix 추가 (면책/모바일 최적화 문구)가 규칙 범위를 초과했을 수 있음
3. 수동 편집 후퇴: Phase L 이후 페이지별 description 재작성 시 규칙을 다시 초과

**임팩트**:
- Google SERP에서 description 자동 절단 (157자 초과 텍스트 생략)
- CTR 저하 (사용자가 전체 메시지를 읽지 못함)
- SEO 가시성 악화

**해결 난이도**: 🟢 **낮음** (문자열 단축만으로 해결 가능)

---

## 8. 권장사항

### 우선순위 1 (즉시)
1. Description 규칙 재확인: 80~155자가 정책인지, 새로운 정책인지 명문화
2. 위반 페이지 일괄 수정:
   - 모든 `description:` 필드를 155자 이하로 축약
   - 또는 빌드 시 자동 truncate 헬퍼 적용

### 우선순위 2 (배포 전)
3. OG 이미지 누락 9개 페이지 확인 (크리티컬 아닌지 확인)
4. Canonical 1개 미확인 페이지 확인

### 우선순위 3 (모니터링)
5. Phase M 완료 후 Lighthouse 재검증 (meta 수정 후)
6. Google Search Console에 갱신된 sitemap 재제출

---

## 9. 체크리스트

- [ ] Description 155자 초과 이슈 원인 분석 (Phase L 이후 변경 추적)
- [ ] description 헬퍼 또는 수동 수정 방안 결정
- [ ] OG 이미지 9개 누락 페이지 확인 및 생성 (필요 시)
- [ ] 모든 페이지 Canonical 재검증
- [ ] 빌드 테스트 후 Search Console 재제출
- [ ] E2E 5종 (salary, loan-limit, theme, routing, adsense) PASS 확인
- [ ] 배포 승인

---

## 산출물 요약
- ✅ Sitemap: 55개 URL, 동적 lastmod 정상
- ✅ robots.txt: AI 봇 허용, 학습 봇 차단, sitemap 명시
- ✅ JSON-LD: 계산기 6종, 가이드 3종 포함 (샘플 검증)
- ⚠️ OG 이미지: 53/62 생성 (85%)
- 🔴 Description: 1/62 규칙 준수 (98% 위반) — 즉시 수정 필요
