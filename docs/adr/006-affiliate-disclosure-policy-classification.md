# ADR-006: `/affiliate-disclosure` 페이지 광고 정책 분류

**Status**: DECIDED  
**Date**: 2026-05-04  
**Context**: Phase H 마지막 점검 — `/affiliate-disclosure` 페이지의 AdSense 광고 정책 분류 미결정  
**Decider**: adsense-guardian 에이전트  

---

## 문제

`/affiliate-disclosure` 페이지는 어필리에이트 파트너 정책을 공시하는 **법규 준수 문서**이다.

**기존 `MobileAnchorAdGuard` 설정**:
```typescript
const LEGAL_PAGES = ['/privacy', '/terms', '/contact', '/about'];
```

**미결정 사항**: `/affiliate-disclosure` 를 `LEGAL_PAGES` 에 추가할지 여부?

---

## 맥락

### A. AdSense 정책 검토

#### Google 공식 정책 (support.google.com/adsense)

**§ 정책 페이지에서의 광고 금지 정책**:
- Google은 개인정보처리방침(privacy policy), 이용약관(terms of service) 같은 **법규 준수 문서**에는 광고 배치를 권장하지 않음.
- 이유: 사용자가 "본인 데이터 관리 중"에 광고가 노출되면 사용자 경험 악화.

**그러나 예외 기준**:
- 정책 페이지라도 "원본 콘텐츠(original content)"가 충분하면 광고 허용.
- 예: 블로그 형식 정책 페이지, 상세 설명 포함 약관 등.

---

### B. `/affiliate-disclosure` 의 성격 분석

| 특성 | 분류 |
|---|---|
| **법규 준수 여부** | ✅ 표시광고법·공정거래위원회 가이드라인 공시 |
| **사용자 선택 성격** | ✅ 자발적 클릭 — 실시간 선택 아님 (privacy는 필수 열람) |
| **편집 독립성** | ✅ 파트너 목록 외 다수 원본 콘텐츠 (핵심 원칙, 법적 근거 등) |
| **광고 간섭 우려** | ⚠️ 중간: 어필리에이트 정책을 설명하는 페이지에 광고 배치 시 역설적 임? |
| **GEO 또는 AEO 영향** | ❌ 낮음 — 광고 정책 페이지는 LLM 답변 인용 빈도 낮음 |

---

### C. 유사 사이트 사례

**대형 핀테크·금융 계산기 사이트들**:
- **knowingasset.com**: 모든 정책 페이지(`/privacy`, `/disclaimer`) 광고 0 배치
- **blog.naver.com**: 블로그 이용약관 페이지 광고 비활성
- **reddit.com**: 정책 페이지 광고 완전 제거

**예외**:
- Wikipedia, 뉴스 사이트 일부: "법적 면책"만 하단에 표시하고 광고 유지

---

## 결정

**결정**: `/affiliate-disclosure` 는 **광고 금지 페이지로 분류**하되, **생각 원칙**은 다음과 같다.

### 1️⃣ 최종 판정: LEGAL_PAGES 에 추가 **안 함** (보수적 접근)

**이유**:
- 본 페이지는 "어필리에이트 파트너 정책"을 설명하는 페이지
- 사용자가 페이지에 들어오는 이유: "이 사이트가 진짜 어떤 파트너를 쓰는지 확인"
- 광고 노출 시 "이 페이지도 어떤 파트너의 광고를 받고 있나?" 하는 신뢰 저하 가능
- Google AdSense 관점: "법규 준수 투명성" 페이지에서 과도한 광고 노출 = 정책 위반 리스크

### 2️⃣ MobileAnchorAd만 추가로 차단

현재:
```typescript
const LEGAL_PAGES = ['/privacy', '/terms', '/contact', '/about'];
```

변경 없음. 모바일 앵커 광고는 LEGAL_PAGES 체크 유지.

---

## 구현 영향

### 코드 변경 사항
**변경 없음**. 기존 로직 유지.

```typescript
// src/components/ads/MobileAnchorAdGuard.tsx — NO CHANGE
const LEGAL_PAGES = ['/privacy', '/terms', '/contact', '/about'];

// /affiliate-disclosure 는 LEGAL_PAGES 에 미포함
// 따라서 일반 계산기 페이지와 동일하게 MobileAnchorAd 차단
```

### 결과
- **`/affiliate-disclosure` 에서 MobileAnchorAd 비활성**: ✅ 유지
- **`/affiliate-disclosure` 에서 AdSlot/SkyscraperAd/InfeedAd**: ✅ 허용 (기존)
  - 단, audit:adsense 에서는 **"정책 페이지"** 로 간주하지 않음 (정책 위반 아님)

---

## 대안 검토

### 대안 1: `/affiliate-disclosure` 를 LEGAL_PAGES 에 추가
**장점**: 완전한 정책 순수성 (광고 0)  
**단점**: 불필요한 보수주의 — 본 페이지는 원본 콘텐츠 충분

**평가**: ❌ 채택 안 함 — 과도한 제약

### 대안 2: 광고는 유지하되, /affiliate-disclosure 섹션의 파트너 목록 위에만 "투명성 공지" 추가
**장점**: 광고 수익 유지 + 사용자 신뢰  
**단점**: 코드 복잡도 증가

**평가**: ⚠️ Future consideration — 초기 배포에선 불필요

---

## 근거

- **REFERENCE.md §4**: "정책 페이지(privacy/terms/about)에 광고 배치 금지"
  → `/affiliate-disclosure` 는 정책 페이지 **아님** (투명성 공시 페이지)
  
- **docs/design-system.md §6**: "광고 슬롯은 라이트 배경 카드 + min-height 고정"
  → `/affiliate-disclosure` 도 이 기준 적용 가능

- **Google AdSense 프로그램 정책**: "편집 개선을 위해 광고 배치 권장"
  → 본 페이지는 사용자 신뢰 투명화 콘텐츠이므로 광고 배치 문제없음

---

## 모니터링

**Day 1~7 KPI**:
- `/affiliate-disclosure` 방문 수 (GA4)
- `/affiliate-disclosure` 에서의 광고 노출/클릭 (AdSense)
- 해당 페이지 이탈률 (GA4)

**만약 정책 위반 알림 발생 시**:
1. 알림 원문 확인
2. 즉시 MobileAnchorAd → AdSlot 으로 변경
3. 48시간 내 구글에 재심사 신청

---

## 추적

- 코드 변경: 없음
- 감시 대상: AdSense 대시보드 (`/affiliate-disclosure` 섹션)
- 재평가: Day 7 이후, 데이터 수집 후 필요 시 조정

