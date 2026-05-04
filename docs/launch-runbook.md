# Day 0 발사 실행 교본

> **Status**: 운영 가이드
> **대상**: calculatorhost.com 첫 배포 담당자
> **소요 시간**: 30분 (자동화 + 수동 확인)
> **Last updated**: 2026-05-04

## 배경

Phase H(마지막 감사)를 통과한 후, Day 0(발사일)에 운영자가 따라야 할 단계별 절차입니다. 자동화 가능한 항목은 `npm run launch:checklist` 로 처리하고, 수동 항목은 체크리스트에서 확인합니다.

---

## Day 0 (발사일) 운영자 절차 — 30분

### Step 1: 자동화 점검 실행 (3~5분)

```bash
npm run launch:checklist
```

**확인 사항**:
- ✅ ads.txt: AdSense Client ID (pub-XXXXXXXXX) 실제 값 확인
- ✅ .env.production: Cloudflare Pages 환경변수 설정 완료
- ✅ public/sitemap.xml: 모든 계산기 페이지 포함 (53+ URLs)
- ✅ OG 이미지: 주요 페이지 5개 이상 샘플 확인
- ✅ 정책 페이지: /privacy, /terms, /contact 존재
- ✅ AdSense 정책 감사: 위반 사항 0개

**실패 시**:
- 리포트 파일 읽기 (`.claude/reports/launch-checklist-YYYY-MM-DD.md`)
- ❌ 항목 해결
- 재실행

---

### Step 2: 운영자 수동 확인 (10~15분)

아래 5개 항목을 Web UI에서 확인:

#### 1. Cloudflare Pages 환경변수
**대상 URL**: https://dash.cloudflare.com → calculatorhost.com → Pages → Settings → Environment variables

**확인 사항**:
- [ ] `NEXT_PUBLIC_ADSENSE_CLIENT`: `ca-pub-7830821732287404` (또는 실제 값)
- [ ] `NEXT_PUBLIC_GA_ID`: Google Analytics 측정 ID (G-로 시작)
- [ ] 프로덕션 환경(Production) 기준으로 설정

**누락 시 조치**:
```
변수 추가 → Save & Deploy 클릭 → 배포 대기
```

#### 2. Google Search Console 등록 + sitemap 제출
**대상 URL**: https://search.google.com/search-console

**확인 사항**:
- [ ] calculatorhost.com 속성 등록 (소유권 확인)
- [ ] Sitemaps: public/sitemap.xml 제출
- [ ] robots.txt 인식 확인

**초기 설정 시**:
1. Add Property → Domain (calculatorhost.com)
2. Cloudflare DNS 인증
3. Sitemap 추가 → `https://calculatorhost.com/sitemap.xml`
4. "Fetch as Google" → 상태 "Successful"

#### 3. Google Analytics 4 연결
**대상 URL**: https://analytics.google.com

**확인 사항**:
- [ ] GA4 속성 (웹): GA4 측정 ID (G-로 시작)
- [ ] data-gtag 스크립트가 public/layout에 있는지 (NextScript)
- [ ] Web Vitals 커스텀 이벤트 설정

**데이터 확인**:
- Realtime → Active Users (1 이상이면 연결됨)
- 자신의 테스트 트래픽이 보여야 함

#### 4. DNS 스위치 (calculatorhost.com → Cloudflare Pages)
**대상**: 도메인 관리자 (GoDaddy, Namecheap 등)

**현재 상태**: WordPress(기존) → Cloudflare Pages(신규)

**절차**:
1. 기존 A 레코드 삭제 (WordPress IP)
2. Cloudflare nameservers로 변경:
   - `ross.ns.cloudflare.com`
   - `anna.ns.cloudflare.com`
3. Cloudflare Pages에 커스텀 도메인 추가: `calculatorhost.com`
4. CNAME 또는 A 레코드 자동 설정 확인
5. **DNS 전파 대기: 10분~24시간**

**확인**:
```bash
nslookup calculatorhost.com
# 응답이 Cloudflare IP(1.1.1.1 계열)인지 확인
```

#### 5. 기존 WordPress 사이트 폐기
**대상**: 기존 호스팅 계정 (또는 WordPress 관리자)

**절차**:
- Trend Money Lab 페이지 **아카이빙** (나중에 필요할 수 있음)
- 가능하면 301 리다이렉트 설정하지 말 것 (새 사이트로 트래픽 흐름 방해)
- 또는 유예기간(1주) 후 폐기

---

### Step 3: 로컬 빌드 확인 (2~3분)

```bash
npm run build
```

**확인 사항**:
- 빌드 성공 (no errors)
- `out/` 디렉터리 생성
- `out/sitemap.xml` 포함

---

### Step 4: 배포 푸시 (1분)

```bash
git push origin main
```

**Cloudflare Pages 자동 배포**:
- GitHub 푸시 감지 → 자동 빌드 시작
- 상태 확인: https://dash.cloudflare.com → Pages → Deployments
- **예상 소요**: 2~5분

---

### Step 5: 배포 상태 확인 (2~3분)

**체크리스트**:
- [ ] Cloudflare Pages "Latest deployment" 상태: `SUCCESS`
- [ ] https://calculatorhost.com 접속 가능
- [ ] 메인 페이지 로드 확인 (3초 이내)
- [ ] 한 개 계산기 테스트 (예: /calculator/salary)
- [ ] 광고 슬롯 노출 확인 (JavaScript 콘솔에서 에러 없음)

**문제 시**:
- Cloudflare Pages 빌드 로그 확인
- 환경변수 재확인 → 재배포 (`Retry deployment` 버튼)

---

## Day 1~7 (모니터링) — 일일 체크

### 매일 09:00 (1주일간)

#### 아침 체크리스트 (5분)
```
[ ] https://calculatorhost.com 접속 확인
[ ] 계산기 1개 테스트 (폼 입력 → 결과 출력)
[ ] 브라우저 콘솔: 에러 메시지 없음
[ ] 광고 슬롯: 적어도 1개 이상 노출 (Google AdSense 코드)
[ ] Analytics: 오늘 세션 데이터 들어오는지 확인
[ ] AdSense: 노출(Impressions) 0 초과인지 확인
```

#### 일일 리포트 (오후)
- **PV/세션**: GA4 Realtime or Day Report
- **광고 노출**: Google AdSense Dashboard
- **정책 위반**: AdSense 정책 팝업 또는 알림 없음
- **CWV 영향**: PageSpeed Insights 또는 Chrome UX Report

**이상 징후 감지 시**:
1. AdSense 계정 알림 → 즉시 읽기
2. 정책 위반 → `.claude/` 에디터 스레드에 에스컬레이션
3. 광고 비활성화 → Cloudflare Pages 환경변수에서 `NEXT_PUBLIC_ADSENSE_CLIENT` 임시 비우기

---

## 첫 1주 KPI (성공 지표)

### Technical (Day 1)
| 지표 | 목표 | 측정처 |
|---|---|---|
| 배포 성공 | 1/1 | Cloudflare Pages Deployments |
| DNS 전파 | 100% | DNS Checker |
| 404 에러 | 0 | GA4 Console |
| JS 에러 | 0 | Browser Console |

### SEO (Day 3~7)
| 지표 | 목표 | 측정처 |
|---|---|---|
| Search Console 노출 | 1+ | Search Console Insights |
| GA세션 | 10+ | GA4 Overview |
| 모바일 친화 | PASS | Mobile-Friendly Test |

### 수익화 (Day 1~7)
| 지표 | 목표 | 측정처 |
|---|---|---|
| AdSense 노출 | 10+ | AdSense Dashboard |
| AdSense 클릭 | 1+ | AdSense Dashboard |
| CPC 지역별 | KRW 보임 | AdSense Performance |

---

## 비상 절차

### 🚨 AdSense 정책 위반 알림 (즉시)

**상황**: AdSense 계정 이메일 또는 대시보드에서 정책 위반 알림 수신

**응급 조치** (5분):
1. 알림 원문 읽기 + 위반 근거 확인
2. 위반 페이지 식별
3. Cloudflare Pages 환경변수 임시 비활성화:
   ```
   NEXT_PUBLIC_ADSENSE_CLIENT = "" (또는 삭제)
   → Save & Deploy
   ```
4. 자신의 에디터 스레드에 에스컬레이션:
   - 위반 알림 스크린샷
   - 위반 페이지 URL
   - 근거 문서 (REFERENCE.md 링크)

**수정** (30~60분):
- 위반 페이지 코드 수정 (src/app/.../page.tsx)
- git commit + push
- Cloudflare Pages 재배포 대기
- 재테스트 (npm run audit:adsense)
- 환경변수 재활성화

---

### 🟡 광고 노출 0 건 (1시간 경과)

**상황**: AdSense 대시보드에 노출(Impressions) 계속 0

**진단** (10분):
```javascript
// 브라우저 콘솔 입력
console.log(window.adsbygoogle)  // undefined 라면 스크립트 로드 실패
console.log(process.env.NEXT_PUBLIC_ADSENSE_CLIENT)  // 값이 있는지 확인
```

**조치**:
1. Cloudflare Pages 환경변수 재확인:
   - `NEXT_PUBLIC_ADSENSE_CLIENT` 값이 `ca-pub-` 로 시작하는지
2. Hard refresh (Ctrl+Shift+R)
3. 다른 브라우저 테스트
4. AdSense 스크립트 수동 로드 테스트:
   ```html
   <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXX"></script>
   ```

---

### ❌ Cloudflare Pages 빌드 실패

**상황**: git push 후 Cloudflare 빌드 RED (failed)

**로그 확인**:
1. Cloudflare 대시보대 → Pages → Deployments → 최신 항목 클릭
2. "Build logs" 탭 확인
3. 에러 메시지 (보통 `npm run build` 실패)

**일반적 원인**:
- TypeScript 타입 오류 → `npm run typecheck` 로컬 확인
- 환경변수 누락 → Cloudflare Pages 설정 재확인
- 의존성 미스매치 → `package-lock.json` 확인

**재배포**:
```bash
# 로컬에서 수정 후
npm run build
git commit -m "fix: build error"
git push
# 또는 Cloudflare UI에서 "Retry" 버튼
```

---

## 체크리스트 요약 (프린트용)

```
Day 0 - 발사 전날
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[ ] npm run launch:checklist 실행 (GO 신호)
[ ] Cloudflare Pages 환경변수 3개 설정
[ ] Google Search Console sitemap 제출
[ ] Google Analytics 연결 확인
[ ] DNS 스위치 (nameserver 변경)
[ ] 로컬 빌드 성공 (npm run build)
[ ] git push origin main
[ ] Cloudflare Pages 배포 SUCCESS 확인

Day 1~7 - 모니터링
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[ ] 매일 09:00 사이트 접속 + 계산기 테스트
[ ] GA4 세션 데이터 수집 확인
[ ] AdSense 노출 수 모니터링
[ ] 정책 위반 알림 감시
[ ] CWV (LCP/INP/CLS) 추적
```

---

## 참고 문서

- `docs/architecture.md` — 시스템 개요
- `.claude/skills/adsense-policy-reference/REFERENCE.md` — 광고 정책 전체
- `docs/design-system.md §9` — 광고 슬롯 규격
- `CLAUDE.md` — 프로젝트 규칙
- `scripts/launch-checklist.mjs` — 자동화 스크립트
