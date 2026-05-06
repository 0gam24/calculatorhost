# 발사 후 모니터링 채널 및 일일 절차

> **Status**: 운영자용 실행 가이드  
> **Phase**: YORO+TDD Phase O  
> **Last updated**: 2026-05-06  
> **소요 시간**: 일 5분 (아침·점심·저녁 3회)  
> **관계 문서**:
> - `docs/launch-runbook.md` "배포 후: 첫 주 모니터링" (Day 1-7)
> - `scripts/monitor-week1.mjs` (자동 점검 스크립트)

---

## 개요

calculatorhost.com 발사 후 7일간 **5개 알림 채널**을 통해 정책 위반·기술 장애·트래픽 이상을 조기 감지. 각 채널 설정 (5분) + 일일 절차 (매일 5분).

---

## 1. AdSense 정책 알림

### 목적
AdSense 대시보드에서 정책 경고, 광고 클릭 이상, 계정 상태 변화 감지.

### 설정 (3분)

**경로**: [AdSense 대시보드](https://adsense.google.com) → 설정 → 알림

```
☐ 정책 이슈: 활성화
☐ 광고 평가 진행: 활성화  
☐ 계정 상태 변화: 활성화
☐ 높은 CPM 미지원 주제: 비활성 (선택)
☐ 이메일: kjh791213@gmail.com
```

**또한**:
- AdSense 이메일 필터: Gmail에서 "AdSense" 라벨 생성 → 실시간 알림 활성

### 일일 절차 (오전 9시, 2분)

1. **AdSense 대시보드 로그인**
   - [adsense.google.com](https://adsense.google.com) 방문
   - "홈" 탭 → 주요 메트릭 훑어보기 (PV, 클릭, eCPM)
   
2. **알림 벨 확인** (우상단 🔔)
   - 빨강 점 = 새 알림 (즉시 확인)
   - 금칙어 경고면 → launch-runbook.md "비상 절차" 실행

3. **광고 단위 상태** (좌측 "광고 단위")
   - 5개 슬롯 모두 "활성" 또는 "정책 평가 중" 확인
   - "비활성화됨" 항목 있으면 → 사유 클릭 후 전시 확인

---

## 2. Google Search Console 인덱싱 알림

### 목적
색인 오류, 수동 조치, 크롤 순위 급락 조기 감지.

### 설정 (2분)

**경로**: [Search Console](https://search.google.com/search-console) → 설정 → 소유자 확인

```
☐ 검색 분석: 활성화
☐ 색인 커버리지 알림: 활성화
☐ 모바일 가용성 알림: 활성화
☐ 보안 문제 알림: 활성화
☐ 이메일: kjh791213@gmail.com
```

**또한**:
- Gmail 필터: "Search Central" → "SearchConsole" 라벨 생성

### 일일 절차 (점심 12시, 3분)

1. **색인 커버리지** (좌측 메뉴)
   - "오류" 항목 > 0 → 클릭 후 원인 확인 (sitemap 형식, robots.txt 등)
   - 24-48시간 후에도 색인 0 → googlebot 접근 문제

2. **새 알림** (상단 📬)
   - "수동 조치" 항목 = 정책 위반 (즉시 응조)
   - "보안 문제" = 악성코드 혐의 (확인 필수)

3. **검색 분석** (좌측 메뉴)
   - 주간 트렌드 보기: CTR 급락 → 제목/설명 수정 신호

---

## 3. Cloudflare Pages 빌드 실패 알림

### 목적
GitHub push 후 빌드 실패, 배포 지연, 환경변수 오류 즉시 감지.

### 설정 (1분)

**경로**: [Cloudflare Dashboard](https://dash.cloudflare.com) → Pages → calculatorhost → 설정

```
☐ Notifications (우상단 벨 아이콘)
  ☐ Build failures: On (이메일 또는 Slack)
  ☐ Build successes: Off (선택)
```

**Slack 연동** (선택):
```
Cloudflare → Integrations → Slack → Authorize
→ #alerts 채널 선택 → 저장
```

### 일일 절차 (배포 후 5분 내, 1분)

1. **Cloudflare 대시보드 로그인**
   - Pages → calculatorhost → "배포" 탭
   - 최신 배포 상태 확인 (Success/Failed)
   
2. **실패 시**:
   ```bash
   # 로컬에서 원인 재현
   npm run build
   npm run typecheck
   npm run lint
   ```
   - 로컬에서 통과하면 → Cloudflare 캐시 삭제 (Settings → Purge Cache)
   - 로컬에서 실패하면 → 수정 후 다시 push

---

## 4. Google Analytics 4 이상 트래픽 감지

### 목적
트래픽 급증/급락, 비정상 사용자 행동, 고의적 공격(봇) 감시.

### 설정 (2분)

**경로**: [Google Analytics 4](https://analytics.google.com) → calculatorhost 속성 → 설정 → 인텔리전스 경고

```
☐ 비정상 트래픽 증가: 활성화
☐ 비정상 트래픽 감소: 활성화
☐ 비정상 전환율 변화: 활성화
☐ 임계값 (선택): 트래픽 50% 증감
```

**또한**:
- GA4 → 보고서 → 실시간 → 대시보드 즐겨찾기

### 일일 절차 (저녁 6시, 2분)

1. **실시간 대시보드**
   - 활성 사용자 수: 초기 Day 1-3은 0-5명 정상 (SEO 크롤 진행 중)
   - 이상 클릭 패턴 (초당 10+ 클릭): 봇 공격 가능 → Cloudflare WAF 점검

2. **주요 이벤트** (좌측 "이벤트")
   - "page_view" 개수 추세
   - "calculate" 이벤트 (계산기 사용)
   - 급락 → 페이지 로드 오류 의심 (모니터링 채널 5 확인)

3. **소스/매체** (좌측 "획득")
   - "organic / google" = 검색 유입 (Day 3부터 증가 기대)
   - "direct" = 직접 입력 또는 북마크 (초기 낮음)

---

## 5. 사이트 가동 모니터링 (선택)

### 목적
DNS 오류, Cloudflare 다운, 페이지 타임아웃 5분 내 감지.

### 설정 (3분)

**옵션 A: UptimeRobot (무료)**

1. [UptimeRobot](https://uptimerobot.com) 가입 (Gmail)
2. 모니터 추가:
   ```
   URL: https://calculatorhost.com/
   방식: HTTP(S)
   확인 간격: 5분
   알림 채널: Email
   ```
3. 테스트: "Test Notification" 클릭

**옵션 B: Better Stack (무료 tier)**

1. [Better Stack](https://betterstack.com) 가입
2. 모니터 추가:
   ```
   Website URL: https://calculatorhost.com/
   Check Frequency: Every 5 min
   Status Page: 생성 (선택)
   ```

### 일일 절차 (선택, 0분)

- 자동 이메일 알림만 수신 (오류 발생 시에만)
- 일간 요약은 필요 없음 (트래픽 기반 모니터링이 충분)

---

## 6. 자동 모니터링 스크립트

### npm run monitor:week1

**매일 같은 시간 실행** (추천: 오전 9시 KST):

```bash
npm run monitor:week1
```

**출력**: `.claude/reports/monitor-{YYYY-MM-DD}.md`

**확인 항목**:
```
✅ adsense-audit: 정책 위반 0건?
✅ sitemap: 파일 존재, 페이지 카운트 안정?
✅ sync-health: 공공 API 30일 이상 미동기 없음?
✅ og-images: 이미지 수 증가 추세 (5→10→…→53)?
```

**Cron 자동화** (선택):

**macOS/Linux**:
```bash
crontab -e
# 매일 09:00 KST (또는 로컬 시간 설정)
0 9 * * * cd ~/Projects/calculatorhost && npm run monitor:week1 >> /tmp/monitor.log 2>&1
```

**Windows (Task Scheduler)**:
1. "작업 스케줄러" 열기
2. "기본 작업 만들기" → "monitor-week1"
3. 트리거: 매일 09:00
4. 작업: 프로그램 시작
   ```
   프로그램: npm
   인수: run monitor:week1
   시작 위치: C:\Projects\calculatorhost
   ```

---

## 일일 운영 절차 (5분 = 오전 9시, 점심 12시, 저녁 6시)

### 오전 9시 (AdSense + 자동 스크립트)
```
1. npm run monitor:week1 실행 (1분)
2. AdSense 대시보드 로그인 (0.5분)
3. 정책 알림 · 광고 단위 상태 확인 (1.5분)
4. 결과: monitor-{date}.md 리포트 확인 (1분)
   - 실패 항목 있으면 launch-runbook.md "비상 절차" 실행
```

### 점심 12시 (Search Console)
```
1. Search Console 로그인 (0.5분)
2. 색인 커버리지 · 수동 조치 알림 확인 (2분)
3. 검색 분석 CTR 추세 보기 (1.5분)
```

### 저녁 6시 (GA4 + Cloudflare)
```
1. GA4 실시간 대시보드 (1분)
2. Cloudflare Pages 최신 배포 상태 (0.5분)
3. 임의 계산기 페이지 방문 · 계산 테스트 (2분)
```

---

## 비상 신호 & 조치

| 신호 | 채널 | 조치 |
|---|---|---|
| "정책 이슈 경고" 이메일 | AdSense | launch-runbook.md §비상절차 |
| 색인 0 (48시간 후) | Search Console | robots.txt 테스트 · sitemap 재제출 |
| 빌드 실패 | Cloudflare | 로컬 `npm run build` 재현 |
| 트래픽 급락 (50%↓) | GA4 | 페이지 로드 테스트 · 모니터링 채널 5 확인 |
| "다운" 알림 | UptimeRobot | DNS 확인: `dig calculatorhost.com` |

---

## 일주일 회고 (Day 7, 10분)

**파일 작성**: `.claude/checkpoints/2026-05-{date}-yoro-o-monitoring.md`

```markdown
# YORO Phase O — 발사 후 모니터링 (Day 1-7)

## 알림 채널별 현황
- AdSense: 정책 경고 {0/n}건 (문제 없음/처리됨)
- Search Console: 색인 오류 {0/n}건, 수동 조치 {0/n}건
- Cloudflare: 빌드 실패 {0/n}회
- GA4: 이상 트래픽 알림 {0/n}회
- UptimeRobot: 다운타임 {0}분

## 주요 지표
- PV: {초기}~{최종} (추세: ↑/→/↓)
- eCPM: ${초기}~${최종}
- CLS: {초기}
- LCP: {초기}
- 광고 노출: {초기}~{최종}

## 비상 대응 이력
- {시간}: {위반 사항}, {조치}
- (없음)

## Phase O 완료 기준
✅ 모든 항목 PASS
✅ 이상 신호 0건 (또는 모두 해결됨)

## 다음 단계
→ Phase P: 초기 수익 최적화 (ad 배치 미세 조정, CPC 분석)
```

---

## 참고

- **launch-runbook.md**: 배포 전후 전체 절차
- **monitor-week1.mjs**: 자동 점검 스크립트 구현
- **GitHub Actions**: Cloudflare Pages 자동 배포 연동
- **Lighthouse CI**: CWV 성능 기준선 (Phase 4, 선택)
