# Day 0 배포 런북 (launch-runbook)

> **Status**: 활성 문서  
> **Last updated**: 2026-05-06  
> **Phase**: YORO+TDD Phase M (발사 후 모니터링 자동화)  
> **관계 문서**: 
> - `docs/adsense-application-guide.md` — AdSense 신청 절차 (신청 전 필수)
> - CLAUDE.md "배포 체크리스트"
> - scripts/audit-adsense.mjs, scripts/launch-checklist.mjs, scripts/monitor-week1.mjs

## 개요

calculatorhost.com 정식 발사(Day 0) 운영 절차서. 3단계 자동화:

1. **`npm run audit:adsense`** — AdSense 정책 100% 검증 (계정 정지 위험 사전 차단)
2. **`npm run launch:checklist`** — 8개 자동 점검 (배포 기술 기반 확보)
3. **`npm run monitor:week1`** — Day 1-7 일일 점검 (정책 위반 사전 감지)

---

## Day -1: 최종 빌드 (배포 2-3시간 전)

### Step 1: 로컬 빌드
```bash
npm run build
npm run typecheck
npm run lint
```
예상: ✅ 모두 통과

---

## Day 0: 배포 당일

### Step 2: AdSense 정책 감사 (필수)
```bash
npm run audit:adsense
```

**출력**: `.claude/reports/adsense-audit-YYYY-MM-DD.md`

**판정 기준**:
- 🚨 계정 정지 리스크 **0건** (필수) → 즉시 수정
- ❌ 정책 위반 **0건** (필수) → 면책조항 추가 또는 표현 순화
- ⚠️ 경고 (무관) → 모니터링만

**실패 원인별 조치**:
| 증상 | 원인 | 해결 |
|---|---|---|
| 페이지당 5개+ 광고 | MAX_ADS_PER_PAGE=4 초과 | 슬롯 1개 제거 (우선순위: INFEED/ANCHOR) |
| 정책 페이지에 광고 | /privacy 등에 AdSlot 배치 | 해당 페이지에서 광고 컴포넌트 제거 |
| "투자 권유" 금칙어 | 면책조항 없음 | "본 계산기는 일반 정보용이며..." 추가 |
| 슬롯 중복 사용 | slot="ad-1" 다중 페이지 | 각 슬롯 이름 고유화 (slot="ad-{pageId}-1") |

**재확인 루프**:
```bash
# 수정 후
npm run audit:adsense  # 통과까지 반복
```

---

### Step 3: 배포 점검 목록 (npm run launch:checklist)

**실행**: 로컬 개발 환경
**소요 시간**: 4~8분

```bash
npm run launch:checklist
```

**출력**: 콘솔 + `.claude/reports/launch-checklist-YYYY-MM-DD.md`

### 자동 점검 8개 항목

| # | 항목 | 결과 | 실패 시 조치 |
|---|---|---|---|
| 1 | **ads.txt (pub-ID 실값)** | ✅/❌ | public/ads.txt: placeholder (7830821732287404) 제거 → ca-pub-{16자리} 입력 |
| 2 | **.env.production 존재** | ✅/⚠️ | Cloudflare Pages 환경변수 설정 (로컬 파일 커밋 금지) |
| 3 | **sitemap.xml 존재** | ✅/❌ | npm run build 재실행 (public/sitemap.xml 자동 생성) |
| 4 | **OG 이미지 (5개+)** | ✅/⚠️ | 초기 5개 이상 검출 (전체 53개는 단계적 생성 가능) |
| 5 | **정책 페이지** | ✅/❌ | src/app/{privacy,terms,contact}/page.tsx 존재 확인 |
| 6 | **JSON-LD 샘플 커버리지** | ✅/⚠️ | SoftwareApplication, FAQPage, BreadcrumbList 샘플 10개 검사 |
| 7 | **Canonical URLs** | ✅/⚠️ | sitemap 형식 검증 (https:// + calculatorhost.com) |
| 8 | **AdSense 정책 감사** | ✅/❌ | Step 2 (npm run audit:adsense) 재실행 |

### 자동 점검 통과 기준

```
✅ GO: 모든 항목 PASS (또는 WARN만 가능)
❌ NO-GO: ❌ 실패 항목 존재 → 위 조치 후 재실행
```

**재확인**:
```bash
npm run launch:checklist  # 모두 PASS/WARN까지 반복
```

---

### Step 4: 운영자 수동 확인 (15~20분)

자동 점검 통과 후 실행. 리포트의 "## 👤 운영자 확인 사항" 섹션을 따라 진행:

#### 1. Cloudflare Pages 환경변수 설정 (3분)
```
경로: Cloudflare Dashboard → calculatorhost 프로젝트 → Settings → Environment variables
확인 항목:
  ☐ NEXT_PUBLIC_ADSENSE_CLIENT=ca-pub-{16자리} (실제 ID)
  ☐ NEXT_PUBLIC_ADSENSE_SLOT_LEADERBOARD={10자리}
  ☐ NEXT_PUBLIC_ADSENSE_SLOT_RECTANGLE={10자리}
  ☐ NEXT_PUBLIC_ADSENSE_SLOT_SKYSCRAPER={10자리}
  ☐ NEXT_PUBLIC_ADSENSE_SLOT_INFEED={10자리}
  ☐ NEXT_PUBLIC_ADSENSE_SLOT_ANCHOR={10자리}
```

#### 2. Google Search Console 등록 (5분)
```
경로: search.google.com → 검색결과 → 속성 추가
확인 항목:
  ☐ 도메인 "calculatorhost.com" 속성 등록
  ☐ DNS/HTML 태그 인증 완료
  ☐ sitemap.xml 제출 (Sitemaps 섹션)
  ☐ robots.txt 제출 (robots.txt 테스터)
```

#### 3. Google Analytics 4 (5분)
```
경로: analytics.google.com → calculatorhost 계정
확인 항목:
  ☐ GA ID (G-XXXXXXXXXX) 존재 및 활성화
  ☐ Web Vitals 커스텀 이벤트 활성화
  ☐ 실시간 사용자 추적 작동 여부 (페이지 방문 시 확인)
```

#### 4. DNS 스위치 (5분)
```
경로: Cloudflare Dashboard → DNS Records
확인 항목:
  ☐ CNAME 레코드 추가: calculatorhost.com → {project-name}.pages.dev
  ☐ 기존 A/AAAA 레코드 제거 (WordPress 등)
  ☐ TTL 60초 (빠른 전환)
  ☐ 2-10분 후 dig calculatorhost.com 로 CNAME 확인
```

#### 5. 기존 사이트 정리 (2분)
```
확인 항목:
  ☐ WordPress/Trend Money Lab 백업 완료
  ☐ 기존 호스팅 안전 보관 또는 삭제
```

---

### Step 5: 최종 배포 판정 + 푸시

**체크리스트**:
```
✅ Step 2 (audit:adsense): PASS (계정 정지 리스크 0건, 정책 위반 0건)
✅ Step 3 (launch:checklist): PASS (8개 항목 모두 PASS/WARN)
✅ Step 4 (운영자 수동): 5개 항목 모두 체크됨
  =
🚀 GO: 배포 진행
```

**배포 명령**:
```bash
git push origin main
# → GitHub Actions 자동 트리거
# → Cloudflare Pages 빌드 (2-5분)
# → https://calculatorhost.com 라이브
```

**배포 후 최종 검증 (3~5분)**:
- ☐ calculatorhost.com 페이지 로딩 (모바일/데스크톱)
- ☐ 광고 슬롯 표시 (최소 2개 슬롯)
- ☐ Google Analytics 실시간 사용자 추적
- ☐ Search Console 색인 상태 (Index Coverage)
- ☐ 계산기 기본 기능 작동 (연봉/대출/양도소득세 등)
- ☐ Lighthouse 성능 >85 (초기값)

---

## 소요 시간 예측

| 단계 | 항목 | 소요 |
|---|---|---|
| Day -1 | 로컬 빌드 | 2~3분 |
| Day 0 | **Step 2**: npm run audit:adsense | 1~5분 (or 재수정) |
| | **Step 3**: npm run launch:checklist | 4~8분 |
| | **Step 4**: 운영자 수동 확인 | 15~20분 |
| | **Step 5**: 최종 검증 | 3~5분 |
| | **배포 (push)** | 2~5분 (Cloudflare Pages 자동) |
| | **배포 후 검증** | 3~5분 |
| **합계** | | **30~51분** |

**TIP**: 미리 Cloudflare/Google 계정에 로그인하고 탭을 열어두면 Step 4 시간 단축 가능 (15→10분)

---

## 배포 후: 첫 주 모니터링 (Day 1-7)

### 자동 모니터링 (매일 5분)
```bash
npm run monitor:week1
```
매 실행마다 다음 확인:
- ✅ AdSense 정책 위반 0건
- ✅ sitemap.xml 변경 추적 (의도 외 추가 감지)
- ✅ API 동기화 상태 (7일 이상 미동기 경고)
- ✅ OG 이미지 수집 진행 (5개 → 53개)

**출력**: `.claude/reports/monitor-{YYYY-MM-DD}.md`

**Cron 추천** (GitHub Actions):
```
0 9 * * * npm run monitor:week1  (매일 KST 9시)
```

### Day 1: 라이브 상태 확인 (오전)

**수동 점검** (10분):
1. calculatorhost.com 접속 (모바일 + 데스크톱)
   - ☐ 페이지 로딩 완료 (>2초 이상 시간초과 X)
   - ☐ 브라우저 Console (F12): "Uncaught" 에러 없음
   - ☐ 광고 슬롯 최소 2개 표시 (리더보드 + 사이드바 또는 인피드)
   - ☐ 계산기 입력 → 결과 0.5초 이내 반영

2. Google Analytics 실시간 추적
   - GA4 대시보드 → 실시간 → 활성 사용자 수 확인
   - ☐ 페이지 방문 시 즉시 반영 (연지연 없음)

3. AdSense 대시보드 첫 인상
   - ☐ 광고 단위 활성화 상태 확인 (5개 모두 "활성")
   - ☐ 광고 평가 진행 중 (며칠 소요, 정상)

**자동 점검**:
```bash
npm run monitor:week1
```

### Day 2-3: 기초 메트릭 수집 (점심/오후)

**자동 보고** (매일 9시):
```bash
npm run monitor:week1
```

**수동 확인 항목**:
| 지표 | 측정처 | 기대값 | 판정 |
|---|---|---|---|
| 페이지뷰(PV) | GA4 | >20 | 초기 낮음 (크롤링중) |
| Lighthouse | PageSpeed Insights | ≥85 | 초기 벤치마크 설정 |
| 광고 노출(impressions) | AdSense | >5 | 학습 단계 |
| Cloudflare 요청 수 | Cloudflare Analytics | >100 | 정상 범위 |
| 정책 위반 알림 | AdSense 이메일 | 없음 | 위반 시 즉시 대응 |

**추가 모니터링** (Day 2):
- Search Console → 색인 범위: 최소 1페이지 색인 (24-48시간 대기 정상)
- robots.txt 테스터: 200 OK + 데이터 다운로드 가능

### Day 5-7: 성능 기준선 및 조정 (주중)

**조정 필요 신호**:
- **CLS > 0.1**: 광고 `min-height` 미설정 확인 (design-system.md §6)
  → 해결: src/components/ads/AdSlot.tsx `style={{ minHeight: '250px' }}`
- **LCP > 2.5s**: Cloudflare Cache Rules 또는 이미지 최적화
  → 진단: lighthouse-profiler 에이전트 호출
- **광고 미표시**: AdSense 대시보드 → "게시자" → "사이트" 활성화 재확인
- **eCPM < $0.50**: 정상 (초기 학습 1-2주 후 안정화)

**성능 기준선 수립** (Day 5-7):
- 첫 성공한 main 푸시 후 GitHub Actions 자동 실행
- .lighthouserc.json 기준: LCP/CLS 심각 악화 시 PR 차단
- 상세: docs/lighthouse-ci-guide.md

**일일 모니터링 지속**:
```bash
npm run monitor:week1  # 매일 9시 KST
```

**Week 1 종료 보고** (Day 7):
1. `.claude/reports/monitor-*.md` 7개 파일 검토
2. 주요 지표 추세 정리 (PV, eCPM, CLS 등)
3. 비상 대응이 필요했는지 기록
4. Phase M 체크포인트 작성: `.claude/checkpoints/2026-05-{date}-yoro-m.md`

---

## 비상 절차: 정책 경고 수신 시

### Day 1-7 모니터링에서 감지
```bash
npm run monitor:week1
# 출력에 "❌ 실패" 또는 "⚠️ 정책 위반" 표시 시 → 아래 절차
```

### 즉시 (30분 이내)
1. **경고 이메일 읽기** → 위반 사항 파악 (금칙어/광고 수/페이지)
2. **자동 감사** 실행:
   ```bash
   npm run audit:adsense
   npm run monitor:week1
   ```
3. 자동 리포트에서 위반 정보 찾기:
   - 위반 내용이 audit에 없으면 → AdSense 정책 최근 변경 확인
   - 위반 내용이 audit에 있으면 → 수정 대상 파일 특정

4. **광고 임시 비활성화** (필요시):
   ```
   Cloudflare Pages → Settings → Environment variables
   NEXT_PUBLIC_ADSENSE_DISABLED=true
   → Deployments (2-5분 이내 라이브)
   ```

### 근본 원인 파악 (30-60분)
| 증상 | 원인 | 확인 방법 |
|---|---|---|
| 페이지당 광고 5개+ | MAX_ADS=4 초과 | audit:adsense 리포트 |
| "투자 권유" 키워드 | 면책조항 없음 | src/app/calculator/*/page.tsx 검색 |
| /privacy 등에 광고 | 정책 페이지 광고 배치 | AdSlot/SkyscraperAd 컴포넌트 포함 확인 |
| 슬롯 중복 사용 | slot="ad-1" 다중 페이지 | grep -r 'slot="' src/app |

### 수정 + 재배포 (1-2시간)
```bash
# 1. 원인 제거
#    예: src/app/calculator/salary/page.tsx 에서 금칙어 제거
#    또는: 광고 슬롯 1개 삭제

# 2. 통과 확인
npm run audit:adsense
# 출력: "✅ 안전" 또는 "⚠️ 경고만"

# 3. 커밋 및 배포
git add src/
git commit -m "fix(adsense): {위반 내용} 수정 — {페이지명}"
git push origin main
# GitHub Actions 자동 배포 (2-5분)

# 4. AdSense 대시보드 재검수 신청 (있으면 "재검수" 버튼)
```

### 회복 단계 (24-72시간)
- AdSense 대시보드에서 재검수 진행 상황 모니터링
- 성공 시: 광고 다시 활성화
  ```
  Cloudflare Pages → Environment variables
  NEXT_PUBLIC_ADSENSE_DISABLED 삭제 → 배포
  ```
- 재검수 거부 시: adsense-guardian 에이전트 호출

---

## Phase 4: Lighthouse CI 성능 기준선 수립 (선택)

초기 배포 후, 운영자는 첫 번째 **성공한 main 푸시** 측정값을 기준선으로 등록할 수 있습니다.

### 절차
1. 로컬 또는 GitHub Actions에서 모든 자동 점검 통과 후 main에 병합
2. `.github/workflows/lighthouse.yml` 자동 실행 (Ubuntu 환경)
3. Actions 탭 → "Lighthouse CI" 실행 로그 확인
4. Artifact: `lighthouse-baseline` 다운로드 (자동 저장됨)
5. 이후 PR은 이 baseline과 자동 비교

### 워크플로우 트리거 옵션

| 트리거 | 자동 실행 | baseline 저장 |
|---|---|---|
| PR 생성 (← main으로) | ✅ | ❌ (baseline과 비교만) |
| main에 머지 완료 | ✅ | ✅ (새 baseline 저장) |
| 수동 dispatch | ✅ (GitHub UI) | ❌ |

**참고**: Windows EPERM 한계로 로컬 Lighthouse는 WSL/Docker 권장. GitHub Actions는 Ubuntu 자동 사용.

### 성능 판정 기준 (.lighthouserc.json)

| 지표 | 최소값 | 기준 |
|---|---|---|
| Performance | 85 | warn (배포 차단 X) |
| Accessibility | 90 | warn |
| Best Practices | 85 | warn |
| SEO | 90 | warn |
| **LCP (Core Web Vitals)** | ≤ 2.5s | **error** (차단) |
| **CLS** | ≤ 0.1 | **error** (차단) |
| **INP** | ≤ 200ms | warn |

**CWV 심각 악화** (LCP +500ms, CLS +0.05 등) 시:
→ `lighthouse-profiler` 에이전트 호출: `문제 페이지를 profiler가 분석해서 원인과 해결책 제시`

---

## 참고 문서

- docs/architecture.md §11 배포 환경
- CLAUDE.md "배포 체크리스트"
- .claude/reports/launch-checklist-YYYY-MM-DD.md
- .claude/reports/monitor-YYYY-MM-DD.md
- .github/workflows/lighthouse.yml (트리거 정의)
- .lighthouserc.json (성능 기준)
- docs/lighthouse-ci-guide.md (상세 가이드)
