# Ralph G — 세금 계산 교차 검증 리포트

**생성 일시**: 2026-05-07T00:52:39.824Z
**검증 함수**: 5개 핵심 케이스 (정적 벤치마크)

## 결과 요약

### ✅ salary-50m
**근로소득세: 연봉 5,000만 + 부양 1명**

직장인 표준 케이스. 4대보험 + 소득세 산출.

- **MonthlyNetIncome**: 통과 (실제: 3,445,625.759)

### ✅ transfer-500m-temp2
**양도소득세: 5억 + 일시적2주택**

주택 매매 일시적2주택 케이스. 누진세 최고 35% 구간.

- **GrossTax**: 통과 (실제: 37,632,000)

### ✅ acquisition-600m-1house
**취득세: 6억 1주택자 매매**

주택 취득. 6억 구간 1% 세율 적용.

- **TotalTax**: 통과 (실제: 6,600,000)

### ✅ comprehensive-1200m-1house
**종합부동산세: 1세대1주택 12억**

1세대1주택 특례 최대 공제선 케이스.

- **NetTax**: 통과 (실제: 0)

### ✅ insurance-3500k-monthly
**4대보험: 월 350만 기본**

표준 월급. 국민연금 기준소득월액 상한선 이하.

- **MonthlyInsurance**: 통과 (실제: 310,334)

---

## 통계

- 통과: 5/5
- 실패: 0/5

## 다음 행동 (실패 시)

1. 실패한 테스트 케이스의 함수를 확인
2. `src/lib/tax/` 또는 `src/lib/constants/tax-rates-2026.ts` 검토
3. 세율/공제 상수 값이 법조항과 일치하는지 확인
4. `.claude/skills/korean-tax-rates/REFERENCE.md` 와 국세청 간이계산기 교차확인
5. calc-logic-verifier 에이전트에 검증 요청

---

### 문서 참고
- 세율 SSoT: `docs/data-model.md`
- 상세 법조항: `.claude/skills/korean-tax-rates/REFERENCE.md`
- 계산기 명세: `docs/calculator-spec/`
