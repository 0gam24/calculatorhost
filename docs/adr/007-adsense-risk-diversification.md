# ADR-007: AdSense 단일 의존 리스크 관리 & 단계별 다변화 전략

**상태**: 수락됨  
**일자**: 2026-04-24

## 맥락
2026-01-14 전 세계 AdSense 수익 붕괴 사건: 정책 위반 없이 수익 50-90% 증발. 월 $500 사이트가 $35로 폭락 케이스 다수. 단일 플랫폼 의존의 생존 위협 실증.

calculatorhost.com 은 현재 AdSense 단일 의존 상태. **동일 리스크 노출**.

## 결정
**단계별 수익 다변화 로드맵을 공식 채택. MVP는 AdSense 100%로 시작하되, 마일스톤 도달 시마다 대체 플랫폼 추가 도입.**

### Phase별 로드맵

#### Phase 1: MVP ~ 월 세션 1만 미만
- **AdSense 단일** (승인된 상태 활용)
- 다변화 준비:
  - 코드 내 광고 컴포넌트 추상화 (`<AdSlot />`) → 플랫폼 스와핑 용이
  - ads.txt에 초기엔 Google만

#### Phase 2: 월 세션 1만 ~ 5만 도달 시
- **Ezoic 도입** (지급 기준 $20, 저진입장벽)
  - Google 공식 인증 파트너
  - AI 레이아웃 최적화로 RPM +30%
  - AdSense와 병행 가능
- ads.txt에 Ezoic 추가
- AdSense는 유지 (Ezoic이 AdSense 물량도 경매)

#### Phase 3: 월 세션 5만 ~ 10만
- **Media.net 추가** (Yahoo/Bing 문맥 광고)
  - 쿠키 미추적 → 2026 개인정보 강화 환경에 강점
  - 금융·세금 계산기 문맥과 궁합 우수

#### Phase 4: 월 세션 10만+
- **Header Bidding 도입** (Prebid.js 또는 관리형)
  - 20+ 광고 수요처 실시간 경매
  - 평균 CPM +20~70% 상승
  - Google AdX도 입찰 참여
- 제휴 마케팅 검토:
  - 금융상품 제휴 (토스/카카오뱅크/저축은행)
  - 부동산 중개 제휴
  - 세무 상담 서비스 제휴

### 비-광고 수익 채널 (선택적)
- **프리미엄 구독**: 광고 제거 + 시나리오 저장 + API 접근
- **뉴스레터 구독**: 세율 변경 알림 (메일링 자체는 무료, 스폰서십 검토)
- **B2B API**: 계산 API를 기업에 유상 제공 (Phase 5)

## 근거
1. 보고서 §7: "단일 수익원 의존 = 생존 위협"
2. 2026-01-14 실제 사례: 무경고 수익 붕괴
3. Ezoic/Media.net은 AdSense 병행 가능 → 리스크 헤지 비용 0
4. Header Bidding 평균 +20-70% CPM (보고서 §7.1)

## 대안 고려
- **AdSense 단일 유지**: 리스크 높음
- **Phase 1부터 Ezoic**: 신규 사이트 승인 조건 미충족 가능
- **유료화 전면**: 초기 트래픽 확보 방해

## 리스크
- 다중 광고 스크립트 = Core Web Vitals 악화 위험
  → lighthouse-profiler 에이전트로 각 단계 측정 + 악화 시 원복
- Ezoic·Media.net 각자 정책 상이 → 승인 시점에 재검토

## adsense-guardian 에이전트 업데이트
Phase 2 도달 시점부터 adsense-guardian에 Ezoic 정책 체크도 위임 (또는 ad-platform-guardian으로 확장).

## 트리거 지표
- Phase 2: Google Analytics 월 세션 10,000 연속 2개월
- Phase 3: 월 세션 50,000 연속 2개월
- Phase 4: 월 세션 100,000 연속 2개월

## 관련
- 보고서 §7 리스크 관리 전체
- .claude/agents/adsense-guardian.md
- 보고서 §7.2 대안 플랫폼
