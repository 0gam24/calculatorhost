# ADR-013: 자동차세 연납 할인율 검증 미정 (6.4% 보류)

**Date**: 2026-06-02  
**Status**: PENDING VERIFICATION  
**Category**: YMYL Accuracy · Tax Constants  
**Author**: calc-logic-verifier (Claude)

---

## Context

자동차세 연납(1월 일시납부) 할인율이 **현행 코드에서 6.4%로 설정**되어 있으나, 이 값이 2026년 현행 지방세법 시행령과 일치하는지 **법령 원문을 통한 최종 검증 불완료** 상태.

### 의심의 근거

1. **비표준 비율**: 
   - 세금 할인율은 통상 정수% (3%, 5%, 10%) 또는 천분의 N 형식
   - 6.4%는 매우 특이함

2. **추이와 불일치**:
   - 2024년: 약 5% 수준
   - 2025년: 약 3% 수준으로 인하
   - 2026년에 6.4%는 이 인하 추세와 역행

3. **현재 근거 불충분**:
   - 코드: `// 2026 국고예규 기준` (예규번호 미명시)
   - 법조항: 지방세법 시행령 §125 인용만 있고, 구체적 항·호 미기술
   - 적용방식: "1월 신청 기간 기간분 비례" vs "전액 기준" 구분 없음

---

## Current Implementation

### 상수값
**파일**: `src/lib/constants/tax-rates-2026.ts`

```typescript
export const VEHICLE_TAX_ANNUAL_PAYMENT_DISCOUNT_RATE = 0.064;
```

### 적용 로직
**파일**: `src/lib/tax/vehicle.ts` (라인 158-160)

```typescript
const annualPaymentDiscount = input.includeAnnualDiscount
  ? Math.floor((totalAnnual * VEHICLE_TAX_ANNUAL_PAYMENT_DISCOUNT_RATE) / 10) * 10
  : 0;
```

→ **전액 기준** 적용: `연간 총액(자동차세 + 지방교육세) × 6.4%`

### 테스트
**파일**: `tests/unit/tax/vehicle.test.ts` (라인 115-126)

1998cc 신차 기준:
- 예상 연간 총액: 519,480원
- 할인액: 519,480 × 0.064 = 33,240원 (10원 절사)
- 납부액: 486,240원

---

## Required Verification (1차 출처)

### 법령 원문 확인 필수

**Primary Source**:
- **지방세법 시행령 제125조** (자동차세 연세액 일시납부 및 세액공제)
  - URL: https://www.law.go.kr/법령/지방세법시행령/제125조
  - 검증 항목:
    1. 2026년 1월 신청 기준 공제율 명시값
    2. 공제율 산정 기준 (연간 전액 vs 기간분 비례)
    3. 신청 기간 및 조건

**Secondary Sources**:
- 기획재정부 국고예규 (연 1월 현황)
- 행정안전부 지방세 공지사항
- 국세청 자동차세 간이계산기 (시뮬레이션 검증)

---

## 불확실성 항목

| 항목 | 현재값 | 의문점 | 검증 필요 |
|---|---|---|---|
| **공제율** | 6.4% | 비표준 비율, 추이 불일치 | ✓ 법령 §125 직접 확인 |
| **적용 기준** | 전액 × 율 | 1월 신청 시 기간분 비례인가? | ✓ 시행령 구체 조항 확인 |
| **신청 기간** | 1월 중 | 1월 1~31일? 기간 정확? | ✓ 국고예규 확인 |
| **산정 예시** | 519,480 × 0.064 | 국세청 간이계산기 교차 검증 | ✓ 샘플 거래 비교 |

---

## Decision (Temporary)

### 현재 조치: 값 유지 + 주석 강화 + 추후 검증 예약

**HOLD 사유**:
- 2026-06-02 현재, law.go.kr 접근 불가 (네트워크 제한)
- WebFetch 도구 일시 중단
- 법령 원문 확인 불가능 상황에서 추측으로 값 변경 불가 (YMYL 원칙)

**임시 조치**:
1. 상수값 유지: `VEHICLE_TAX_ANNUAL_PAYMENT_DISCOUNT_RATE = 0.064`
2. 주석 극도로 강화: 검증 필요 상태 명시 (src/lib/constants/tax-rates-2026.ts 수정 완료)
3. 테스트 유지: vehicle.test.ts 기존 값 대로 패스 유지

**추후 액션 (운영자 또는 다음 검증 사이클)**:
1. law.go.kr 지방세법시행령 §125 직접 접근 → 2026 공제율 확정
2. 기획재정부 2026년 1월 국고예규 확인
3. 국세청 자동차세 계산기 샘플로 교차 검증
4. 틀렸으면 ADR-013 → ADR-013-UPDATE 버전으로 값 변경 + 주석 개정 + 테스트 수정
5. 신규 ADR 작성: "자동차세 연납 공제율 정정 (2026-06-XX 검증 완료)"

---

## Impact Assessment

### 배포 영향
- **즉시 배포 중단 여부**: NO
- **이유**: 기존 6.4% 값이 사용 중이고, 법령 원문 없이 추측으로 변경 금지 (YMYL)
- **사용자 리스크**: 현재값이 잘못되었다면 사용자가 과다/과소 계산 가능 (±0.3%~2% 오차 범위)

### 수정 시 영향 범위
변경 필요 파일:
1. `src/lib/constants/tax-rates-2026.ts` — 상수값 + 주석
2. `src/lib/tax/vehicle.ts` — 산정 로직 (필요 시 기간분 비례로 변경)
3. `tests/unit/tax/vehicle.test.ts` — 기대값 업데이트
4. 관련 가이드 페이지 — 할인율 수치 갱신
   - `/guide/vehicle-tax-june-payment-annual-discount-2026/`
   - `/guide/january-vehicle-tax-prepayment/`

---

## Acceptance Criteria

### ✓ 검증 완료 조건
- [ ] law.go.kr 지방세법시행령 제125조 원문 접근 및 2026 공제율 확인
- [ ] 확정된 공제율과 현재 0.064 비교 → PASS/FAIL 판정
- [ ] FAIL 시: 올바른 값으로 수정 + 테스트 업데이트 + 새 ADR-XXX 작성
- [ ] 국세청 계산기 샘플로 재검증 (월 1회)

### 임시 상태
- `PENDING VERIFICATION` — law.go.kr 또는 국고예규 확인 대기

---

## References

- **지방세법 시행령**: https://www.law.go.kr/법령/지방세법시행령
- **자동차세 계산기**: https://www.hometax.go.kr (국세청)
- **지방세 포털**: https://www.easylocal.go.kr
- **기획재정부**: https://moef.go.kr (연 1월 국고예규)

---

## Changelog

- **2026-06-02**: 초판 (검증 미정 상태 기록, 임시 조치 구현)
