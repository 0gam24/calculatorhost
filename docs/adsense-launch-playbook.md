# AdSense 발사 후 운영 플레이북

> **Status**: 신청부터 월간 운영까지 완전 가이드
> **대상**: calculatorhost.com AdSense 관리자
> **근거**: `.claude/skills/adsense-policy-reference/REFERENCE.md` § 8, 10, 13–17
> **Last updated**: 2026-05-04

---

## 개요

본 문서는 AdSense 신청 접수부터 정상 운영까지의 체계적 플레이북입니다. 정책 위반 = 계정 정지 → 수익 0 이므로 **보수적 판단 기준** 적용.

---

## Day 0 — AdSense 신청 접수 체크리스트

### 신청 전 필수 조건 확인
- [ ] **도메인 소유권**: Google Search Console에 소유자 확인됨
- [ ] **사이트 콘텐츠**: 최소 20개 페이지 + 계산 결과 공개
- [ ] **정책 페이지**:
  - `/privacy` — AdSense 쿠키/추적 공개 필수 (§10)
  - `/terms` — 이용약관 존재
  - `/contact` — 연락처 공개
- [ ] **모바일 최적화**: 반응형 디자인 + 클릭 가능 영역 ≥ 48×48px
- [ ] **traffic 소스**: 제3자(검색·소셜) 트래픽만 (자기 클릭/봇 없음)
- [ ] **ads.txt**: 신청 전에는 placeholder (예: `google.com, pub-0000000000000000, DIRECT, f08c47fec0942fa0`)

### 신청 카테고리 선택
```
카테고리: "Finance & Tax Calculators"
이름: "calculatorhost — 한국 성인 금융·세금 계산기 플랫폼"

신청 사유 템플릿 (한글):
"calculatorhost는 한국 성인을 대상으로 한 정확한 금융·세금 계산기를 제공합니다.
종합소득세, 양도소득세, 대출이자, 연봉 실수령액 등 복잡한 계산을 무료로 지원하며,
모든 데이터는 사용자 브라우저에서 처리되어 개인정보가 수집되지 않습니다.
계산 결과는 공식 세율 기준(소득세법 §55 등)을 따르며, 불법·해로운 콘텐츠는 없습니다."
```

---

## Day 1–7 — 승인 대기 & 이의제기

### 일일 모니터링
- AdSense 대시보드 접속 → "결정 보류 중" / "거부됨" / "승인됨" 상태 확인
- 거부 메일 도착 시 **즉시** 이유 코드 확인 (보통 2-3일 내)

### 거부 사유별 대응 (§13 §14 적용)

#### 1) "콘텐츠 부족" (Content Not Sufficient)
**해석**: 고유 콘텐츠 < 30%, 표절/MFA 모양
**대응**:
1. 페이지당 1500자 이상 본문 추가 (세율 설명, 팁, FAQ)
2. GEO/AEO 기준 충족 확인: Structured Summary + FAQ 상단 배치
3. 이미지/차트 추가 (시각화)
4. 재신청 (일반적으로 7-14일 후 가능)

#### 2) "정책 위반 우려" (Policy Violation Detected)
**의심 항목**: 투자 권유, 자동 재생, 팝업, 클릭 유도
**대응**:
1. `src/components/` 내 광고 배치 모두 검수 (adsense-guardian)
2. 정책 페이지에서 금지 표현 제거:
   - ❌ "이 주식 사세요" / "이 대출 추천합니다" / "수익이 보장됩니다"
   - ✅ "계산 결과: 월 이자는 X원입니다"
3. 모바일 전면 광고(Interstitial) 확인 → 모두 제거
4. 자동 재생 미디어 확인 → `autoplay={false}`
5. 스크린샷 첨부 후 재신청

#### 3) "도메인 신뢰도 부족" (Domain Not Trusted)
**의심 항목**: 신규 도메인, HTTPS 미적용, 낮은 도메인 에이지
**대응**:
1. HTTPS + SSL 인증서 확인 (Cloudflare 자동 처리됨)
2. Privacy Shield / GDPR 공개 (EEA 사용자 대비 필수)
3. 회사/운영자 정보 공개 (Option: "회사 소개" 페이지 추가)
4. 기존 신뢰 신호 강화: Search Console 7일+ 데이터 축적

### 재신청 팁
- 한 번에 모두 수정 후 **단 1회** 재신청 권장 (반복 신청 = spam 의심)
- 재신청 메일에 구체 개선사항 명시 (예: "§14 정책 따라 계산기/광고 구분 명확화")

---

## Day 0 (승인 직후) — 광고 활성화 단계

### 1) `ads.txt` 실값 교체
**위치**: `/public/ads.txt`

```
# 현재 (placeholder)
google.com, pub-0000000000000000, DIRECT, f08c47fec0942fa0

# 승인 후 교체 (실제 pub-XXX 값)
google.com, pub-0000000000000000, DIRECT, f08c47fec0942fa0
```

**검증**:
1. Cloudflare Pages 배포 확인 (5분)
2. `curl https://calculatorhost.com/ads.txt` → 내용 출력 확인
3. AdSense 대시보드 → "ads.txt 검증" → 초록 체크

### 2) 환경변수 갱신
**위치**: Cloudflare Pages 대시보드

```
변수명: NEXT_PUBLIC_ADSENSE_CLIENT
값: ca-pub-0000000000000000 (실제 pub-ID)

(이미 설정된 경우: 값 갱신만)
```

**dev 환경 유지** (로컬 자동 광고 비활성):
```bash
# .env.example
NEXT_PUBLIC_ADSENSE_CLIENT=ca-pub-0000000000000000

# .env.local (gitignore, 읽기 차단)
NEXT_PUBLIC_ADSENSE_CLIENT=ca-pub-test (또는 임의 값 → 로드 실패 = 광고 미노출)
```

### 3) 정책 페이지 최종 검수
**§14 YMYL 원칙 적용**:

#### `/privacy` 페이지 반드시 포함 (복사 가능)
```
## AdSense 및 기술 정보

### 광고 및 쿠키
calculatorhost.com에서는 Google AdSense를 통해 광고를 게시합니다.
Google 및 제3자 광고 제공자는 사용자의 방문 기록을 바탕으로 
관심사에 맞는 광고(DART 쿠키)를 표시할 수 있습니다.

### 사용자 정보 처리
- 사용자의 계산 입력값은 브라우저 로컬스토리지에만 저장되며, 서버로 전송되지 않습니다.
- Google Analytics를 통해 집계된 방문 통계만 수집됩니다.

### 광고 설정 및 거부
- Google 광고 설정 페이지: https://myaccount.google.com/data-and-privacy
- 관심사 기반 광고 거부: https://policies.google.com/technologies/ads
```

#### `/terms` 필수 항목
```
## 계산 결과 면책조항

본 계산기는 교육 목적으로만 제공됩니다. 
세금, 대출, 투자 결정은 전문가(세무사, 변호사, 재무 자문가)와 상담 후 결정하세요.
본 사이트는 계산 오류로 인한 손실에 대해 책임을 지지 않습니다.
```

#### `/contact` 필수 항목
```
이메일: kjh791213@gmail.com
연락 방법: [연락처 폼 또는 문의 이메일]
```

### 4) 광고 비렌더 가드 재확인
**정책 페이지에서 광고 로드 금지** (§4):

```tsx
// src/app/privacy/page.tsx 등
export default function PrivacyPage() {
  return (
    <Layout showAds={false}> {/* ← 반드시 false */}
      ...
    </Layout>
  );
}
```

**적용 대상** (광고 금지):
- `/privacy`
- `/terms`
- `/contact`
- `/404` (not-found.tsx)
- `/about` (있으면)

---

## Week 1 — 실시간 모니터링 (Daily Checks)

### 일일 점검 (오전)
1. **정책 위반 알림**: AdSense 대시보드 → "정책 중심" 확인 (빨강 경고 없음?)
2. **자동 광고 성능**: 노출 수 ≥ 100 (최소 검증 기준)
3. **CLS 악화**: Lighthouse CI 통과 여부 (CLS < 0.1?)

### 이탈률 확인 (GA4)
```
Realtime > User > Session avg. duration
목표: > 1분 (계산기 사용 시간)
경고: < 30초 (광고 때문에 떠나는가?)
```

### 자동 광고 비활성 체크
- 요청하지 않았는데 자동 광고 노출? → 즉시 비활성
- `data-ad-frequency-hint` 설정 재확인 (권장: "30s" = 30초마다 최대 1개)

### 위험 신호 (즉시 대응)
- ⛔ AdSense 대시보드에 "정책 위반" 주황색 경고
  → 해당 페이지 즉시 비활성 (`showAds={false}`)
  → adsense-guardian 호출 → 근본 원인 파악
  → 수정 후 72시간 대기 → AdSense "재검토 요청"
- ⛔ CLS 갑작스러운 상승 (0.05 → 0.15)
  → 광고 로드 확인 → `min-height` 누락?
  → Lighthouse 디버깅 → 수정 후 재배포

---

## Week 2–4 — 점진적 광고 노출 (Phased Launch)

### Week 2: 우선 슬롯 (AD-1, AD-2 only)

**활성화 순서**:
```
1. AD-1 (헤더 아래 리더보드 728×90 / 970×250)
   - 배치: 계산기 페이지 상단
   - eCPM 기대: 높음 (권위 + 프리미엄 입찰)
   - 영향: LCP 최소 (스크롤 아래)

2. AD-2 (계산기 결과 아래 300×250 Medium Rectangle)
   - 배치: 결과 카드 바로 아래
   - eCPM 기대: 최고 (F자 시선 흐름)
   - 영향: CLS 주의 (min-height 반드시)
```

### Week 3: 보조 슬롯 (AD-3, AD-4)

```
3. AD-3 (우측 사이드바 300×600 Large Skyscraper, 스티키)
   - 배치: 데스크톱 전용 (lg 이상)
   - 영향: Viewability 최장 (화면 내 체류 시간)
   
4. AD-4 (본문 중간 인피드)
   - 배치: 설명 글 1500자 이상 구간
   - 개수: 페이지당 최대 2개
   - 구분: "광고" 라벨 필수
```

### Week 4: 모바일 특화 (AD-5, 선택)

```
5. AD-5 (모바일 앵커 320×50 / 320×100)
   - 배치: 화면 하단 고정 (모바일만, lg 미만)
   - 주의: 콘텐츠 가림 금지 (padding-bottom 확보)
```

### 각 주차 성과 판정
| 주차 | 노출 수 목표 | CTR 기대 | 조치 |
|---|---|---|---|
| Week 2 | ≥ 500 | 0.5–1.5% | 목표 미달 시 원인 분석 (위치/타이밍/타깃) |
| Week 3 | ≥ 1500 | 0.3–0.8% | 사이드바 스티키 성능 측정 |
| Week 4 | ≥ 2500 | 0.2–0.5% | 모바일 하단 앵커 UX 영향 평가 |

---

## 월간 운영 (Month 1+) 체크리스트

### 월초 (1–5일)

**수익 분석**:
```
1. AdSense 대시보드 → 지난달 결과 확인
   - 총 노출 수 vs CTR vs eCPM
   - 슬롯별 성과 (AD-1 vs AD-2 vs AD-3 vs AD-4 vs AD-5)
   - 상위 10개 페이지별 수익 기여도

2. GA4 연동 데이터 확인
   - 광고 클릭 이벤트 추적 (Google Analytics → AdSense 실시간 동기화)
   - 광고 노출로 인한 이탈률 변화

3. 문제 슬롯 즉시 비활성
   - CTR 0.05% 이하 (극저조)
   - CLS 영향 (0.1 초과)
   - 수익 음수 기여 (과도한 이탈)
```

### 월중 (10–20일)

**콘텐츠 추가 시 정책 검증**:
1. 신규 페이지/계산기 추가 예정?
   - content-writer 작성 완료 후
   - adsense-guardian 호출 (정책 점검)
   - 광고 배치 사전 승인
2. 월간 알고리즘 변화 대응
   - Search Console 상위 쿼리 확인
   - "관련 계산기" 링크 추가 (크로스 매출)

**월간 정책 업데이트**:
```
구독 채널:
- https://support.google.com/adsense/community
- Google AdSense Help (공식 블로그)
```

### 월말 (25–30일)

**분기 검토 준비**:
1. 월간 수익 vs 목표 (예: $100/월 목표 vs 실제)
2. 슬롯 성과 순위 → 우선순위 재조정
3. CWV 지표 누적 (Lighthouse CI 기록)
4. 다음달 신규 계산기 로드맵 확인

---

## 분기/연간 운영 (Quarterly + Annual Review)

### 분기말 (Q1/Q2/Q3/Q4)

**정책 변경 반영**:
- AdSense 정책 개정사항 적용 (보통 분기 1–2회)
- 신규 슬롯 형식 검토 (예: Native 광고, 스트림 광고)
- GDPR/CCPA/PIPEDA 대응 여부 재확인

**광고 성과 최적화**:
```
1. eCPM 분석
   - 지역별: 한국(높음) vs 기타
   - 시간대: 업무시간 vs 저녁
   - 카테고리: 대출(높음) vs 라이프스타일(낮음)

2. A/B 테스트 계획
   - 슬롯 위치 변경 (상단 vs 중단)
   - 슬롯 크기 변형 (728×90 vs 970×250)
   - 라벨 텍스트 ("광고" vs "스폰서")

3. CTR 개선 기회
   - 광고와 콘텐츠 경계선 명확화
   - 관심사 기반 광고 타깃팅 개선 (AdSense 대시보드)
```

### 연간 (Year 1+)

**신규 슬롯 도입 검토**:
- Native 광고 (스트림 형식, 콘텐츠와 유사)
- 반응형 광고 (자동 크기 조정)
- 대체 수익원 검토 (Affiliate × AdSense 병행)

**계정 정상화 확인**:
- 누적 수익 > $100 (운영 의지 증명)
- 정책 위반 건 0건
- 연간 이상 트래픽 없음 (봇 정제)

---

## 위반 발견 시 에스컬레이션 (§17)

### 즉시 대응 (몇 분 내)
```
1. AdSense 대시보드 "정책 중심" 확인
2. 위반 페이지 식별
3. 해당 페이지 광고 비활성 (showAds={false})
4. 팀 슬랙/메일 공지
```

### 1시간 내
```
1. adsense-guardian 에이전트 호출
   - 위반 사유 근본 분석
   - 정책 레퍼런스 매핑
2. 수정 코드 작성 + 검토
3. 로컬/스테이징 검증
```

### 배포 전
```
1. npm run typecheck + npm test + npm lint 통과
2. Lighthouse CI 재실행
3. AdSense 정책 체크 완료
4. git push (사용자 승인 후만)
```

### 재검토 요청
```
AdSense 대시보드 → 정책 중심 → "재검토 요청"
- 메시지 예시:
  "페이지 X의 투자 권유 표현을 '계산 결과'로 명확히 변경했습니다.
   광고 라벨도 '광고' 표시로 통일했습니다.
   배포 버전: 2026-05-15-patch-adsen"
- 대기 기간: 보통 24–72시간
```

---

## 금기사항 (계정 정지 위험)

❌ **절대 금지**:
1. **자기 클릭**: 본인/팀원/친구 광고 클릭 (§2)
2. **클릭 유도**: "클릭하세요", 화살표 가리키기 (§7)
3. **정책 페이지 광고**: /privacy, /terms, /contact (§4)
4. **과도한 광고**: 페이지당 5개 초과 (§5)
5. **팝업/전면 광고**: 모바일 콘텐츠 가림 (§4)
6. **투자 권유**: "이 주식/대출 추천", "수익 보장" (§14)
7. **무효 트래픽**: 유료 방문자 구매, 봇 (§2)

---

## 문제 해결 (Troubleshooting)

### "광고 안 보임"
```
1. NEXT_PUBLIC_ADSENSE_CLIENT 값 확인 (ca-pub-로 시작하는가?)
2. 네트워크 탭: adsbygoogle.js 로드 확인
3. AdSense 대시보드: 광고 게재 설정 ON인가?
4. Cloudflare Pages 캐시 초기화
```

### "CLS 상승"
```
1. 광고 슬롯 부모 요소 min-height 재확인
2. Lighthouse DevTools CLS 항목 상세 확인
3. 광고 로드 속도 (네트워크 탭 느림?)
   → strategy="lazyOnload" 확인
```

### "CTR 매우 낮음 (< 0.1%)"
```
1. 슬롯 위치 변경 (상단 → 중단)
2. 라벨 명확화 ("광고" 표시 크기)
3. 광고와 콘텐츠 색 대비 (다크 배경 AD 금지, §6)
```

---

## 참고 자료

- **AdSense 정책 공식**: https://support.google.com/adsense/answer/48182
- **Invalid Traffic 기준**: https://support.google.com/adsense/answer/10437
- **개인정보 & 쿠키**: https://support.google.com/adsense/answer/7666431
- **CWV & 광고**: https://support.google.com/adsense/answer/12084925
- **내부 참조**: `.claude/skills/adsense-policy-reference/REFERENCE.md`
- **배포 체크**: `docs/architecture.md` § 11

---

## 업데이트 로그
- 2026-05-04: 초판 (Phase C, 발사 후 운영)
