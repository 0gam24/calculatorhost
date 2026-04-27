# 공공데이터 API 연동 가이드

> **Status**: Phase 1 완성
> **Last updated**: 2026-04-27
> **목표**: 빌드 시점에 공공 API 호출 → JSON 생성 → 정적 HTML에 박힘

## 1. 개요

calculatorhost는 사용자 요청 시점의 외부 API 호출을 최소화하여 **비용 0원** 운영 목표를 달성합니다.

**전략**:
- 빌드 시점 (`npm run build`) 에서만 공공 API 호출
- 결과를 `src/data/*.json` 에 저장
- 각 페이지에서 정적 JSON import → 클라이언트에 전달
- 사용자는 캐시된 JSON 사용 (최대 24시간 쿠오터)

**업데이트 주기**:
- GitHub Actions: 매일 03:00 KST 자동 실행
- 변경된 JSON만 PR 생성 → 사용자 검토 후 머지

## 2. 데이터 소스 4종

### A) 한국은행 ECOS — 기준금리 + CPI
- **파일**: `src/data/bok-rates.json`
- **갱신 주기**: 월 1회
- **내용**:
  ```json
  {
    "baseRate": 0.035,
    "baseRateDate": "2026-04-01",
    "cpi": 115.2,
    "cpiDate": "2026-03-01",
    "source": "live",
    "fetchedAt": "2026-04-27T18:00:00Z"
  }
  ```

**신청 방법**:
1. https://ecos.bok.or.kr 접속
2. 회원가입
3. "정보마당" → "인증키 신청"
4. 신청한 키를 GitHub Secrets `ECOS_API_KEY` 에 등록

**사용 페이지**:
- `/calculator/loan-limit` — 스트레스 DSR 계산 기본 금리
- `/calculator/rent-conversion` — 전환율 기본 금리

---

### B) 한국수출입은행 환율 — 매매기준율
- **파일**: `src/data/exchange-rates.json`
- **갱신 주기**: 일 1회 (평일만)
- **내용**:
  ```json
  {
    "rates": {
      "USD": 1200.0,
      "JPY": 8.5,
      "EUR": 1300.0,
      "CNY": 165.0,
      "GBP": 1520.0
    },
    "baseDate": "2026-04-27",
    "source": "live",
    "fetchedAt": "2026-04-27T18:00:00Z"
  }
  ```

**신청 방법**:
1. https://www.koreaexim.go.kr/site/program/financial/exchangeJSON
2. 페이지 하단 "인증키 신청" 버튼
3. 신청한 키를 GitHub Secrets `EXIM_FX_API_KEY` 에 등록

**사용 페이지**:
- `/calculator/exchange` — 환율 계산기 기본값

---

### C) 금융감독원 금융상품통합비교공시 — 예금/적금 평균금리
- **파일**: `src/data/finance-products.json`
- **갱신 주기**: 일 1회
- **내용**:
  ```json
  {
    "deposit": {
      "maturity12m": 3.25,
      "maturity24m": 3.30
    },
    "savings": {
      "maturity12m": 2.85,
      "maturity24m": 2.95
    },
    "source": "live",
    "fetchedAt": "2026-04-27T18:00:00Z"
  }
  ```

**신청 방법**:
1. https://finlife.fss.or.kr/finlifeapi/
2. 회원가입
3. "인증키 신청"
4. 신청한 키를 GitHub Secrets `FSS_FINLIFE_API_KEY` 에 등록

**사용 페이지**:
- `/calculator/savings` — 적금 이자 계산기 참고 금리
- `/calculator/deposit` — 정기예금 이자 계산기 참고 금리

---

### D) 통계청 KOSIS — 가구 월평균 소득
- **파일**: `src/data/kosis-income.json`
- **갱신 주기**: 월 1회
- **내용**:
  ```json
  {
    "householdMonthlyIncome": 4850000,
    "householdMonthlyIncomeDate": "2025-12-01",
    "perCapitaMonthlyIncome": 1850000,
    "perCapitaMonthlyIncomeDate": "2025-12-01",
    "source": "live",
    "fetchedAt": "2026-04-27T18:00:00Z"
  }
  ```

**신청 방법**:
1. https://kosis.kr
2. 회원가입
3. "마이페이지" → "인증키"
4. 신청한 키를 GitHub Secrets `KOSIS_API_KEY` 에 등록

**사용 페이지**:
- 향후 은퇴 시뮬레이터 등에서 평균소득 기준점으로 사용

---

## 3. 로컬 개발 환경 설정

### 3-1. .env.local 작성 (절대 커밋 금지)
```bash
# 프로젝트 루트에서
cat > .env.local << 'EOF'
ECOS_API_KEY=YOUR_ACTUAL_KEY
EXIM_FX_API_KEY=YOUR_ACTUAL_KEY
FSS_FINLIFE_API_KEY=YOUR_ACTUAL_KEY
KOSIS_API_KEY=YOUR_ACTUAL_KEY
EOF
```

`.gitignore` 에 이미 `.env.local` 추가되어 있으므로 실수로 커밋될 리스크 없음.

### 3-2. 로컬 빌드 테스트
```bash
npm run sync-data    # 공공 API 호출 (환경변수 필요)
npm run build        # Next.js 빌드 (sync-data 자동 실행)
npm run typecheck && npm run lint && npm test  # 검증
```

키가 없으면 정적 fallback 값 사용 → 빌드 실패 안 함.

---

## 4. GitHub Actions 설정

### 4-1. 저장소 Secrets 등록
GitHub 저장소 Settings → Secrets and variables → Actions 에서:
1. `ECOS_API_KEY` — 한국은행 키
2. `EXIM_FX_API_KEY` — 한국수출입은행 키
3. `FSS_FINLIFE_API_KEY` — 금융감독원 키
4. `KOSIS_API_KEY` — 통계청 키

### 4-2. Workflow 자동 실행
`.github/workflows/sync-public-data.yml` 이 매일 03:00 KST 자동 실행:
- 각 API 호출
- `src/data/*.json` 갱신
- 변경사항이 있으면 PR 생성
- 사용자가 검토 후 머지 → Cloudflare Pages 재배포

### 4-3. 수동 트리거
```bash
gh workflow run sync-public-data.yml
```

---

## 5. 데이터 갱신 프로세스

```
[03:00 KST GitHub Actions 트리거]
    ↓
[scripts/sync-public-data.mjs 실행]
    ├─ ECOS API → bok-rates.json
    ├─ EXIM API → exchange-rates.json
    ├─ FSS API → finance-products.json
    └─ KOSIS API → kosis-income.json
    ↓
[변경사항 감지]
    ├─ 있음 → PR 생성 (title: "chore: 공공데이터 일일 동기화")
    └─ 없음 → 종료
    ↓
[사용자 검토]
    ├─ 이상 없음 → Merge
    └─ 롤백 필요 → Reject
    ↓
[Cloudflare Pages 자동 재배포]
```

---

## 6. Fallback 메커니즘

### 6-1. API 키 미설정 시
```bash
npm run sync-data
# ⊘ ECOS_API_KEY not set — keeping fallback for bok-rates.json
```
기존 `src/data/bok-rates.json` 유지. 정적 기본값으로 사이트 정상 운영.

### 6-2. API 호출 실패 시
```bash
✗ Failed to fetch exchange rates: Network timeout
→ Keeping existing exchange-rates.json intact
```
이전 JSON 파일 유지. 부분 실패는 빌드 중단 X.

### 6-3. 페이지에서 사용 시
```tsx
import bokRates from '@/data/bok-rates.json';

export default function Page() {
  return (
    <LoanLimitCalculator
      initialBaseRate={bokRates.baseRate}
      dataSource={bokRates.source === 'live' ? '실시간' : '정적'}
    />
  );
}
```

`source: 'live'` 면 실시간, `source: 'fallback'` 이면 정적 기본값 표시.

---

## 7. 계산기 페이지에서 데이터 활용

### 예시: 대출한도 (DSR) 계산기
```tsx
// src/app/calculator/loan-limit/page.tsx (서버 컴포넌트)
import bokRates from '@/data/bok-rates.json';
import { DataFreshness } from '@/components/ui/DataFreshness';

export default function LoanLimitPage() {
  return (
    <main>
      <h1>DSR 계산기</h1>
      <LoanLimitCalculator initialBaseRate={bokRates.baseRate} />

      {/* 하단에 데이터 출처 표시 */}
      <DataFreshness
        source="한국은행 ECOS"
        fetchedAt={bokRates.fetchedAt}
        isLive={bokRates.source === 'live'}
      />
    </main>
  );
}
```

### DataFreshness 컴포넌트
```tsx
// ✓ 실시간 (녹색 점)
한국은행 ECOS 2시간 전 갱신됨

// ⊘ 정적 기본값 (회색 점)
한국은행 ECOS 정적 기본값 (실시간 갱신 대기 중)
```

---

## 8. 모니터링

### 8-1. GitHub Actions 로그 확인
저장소 → Actions → "Sync Public Data" → 최근 실행 로그

### 8-2. PR 변경사항 검토
매일 03:00 KST 이후 새 PR이 생기면:
1. "Files changed" 탭에서 JSON diff 확인
2. 이상 없으면 "Squash and merge"
3. Cloudflare Pages 자동 재배포 대기

### 8-3. 페이지 확인
배포 후 https://calculatorhost.com/calculator/loan-limit 접속:
- 페이지 하단에 "한국은행 ECOS {시간} 전 갱신됨" 표시 확인

---

## 9. 트러블슈팅

| 증상 | 원인 | 해결 |
|---|---|---|
| `ECOS_API_KEY not set` | 환경변수 미설정 | GitHub Secrets 등록 |
| API 호출 시간초과 (timeout) | 네트워크 문제 | 로그 확인, 다시 실행 |
| JSON 파일 변경 안 됨 | API 응답 없음 | Fallback 유지, 정상 |
| 페이지에 데이터 미적용 | Import 경로 오류 | `@/data/` 경로 확인 |
| DataFreshness 미표시 | 컴포넌트 추가 안 됨 | 페이지에 컴포넌트 import 추가 |

---

## 10. 향후 확장 (Phase 2)

- [ ] 국토교통부 실거래가 API 추가 (`property-market.json`)
- [ ] 국세청 간이계산기 데이터 프록시 (보안 검토 후)
- [ ] 환율/금리 변동 추이 그래프 데이터
- [ ] 캐시 서버 전략 (Cloudflare Workers KV)

---

## 11. 참고자료

- [한국은행 ECOS](https://ecos.bok.or.kr/)
- [한국수출입은행 환율 API](https://www.koreaexim.go.kr/site/program/financial/exchangeJSON)
- [금융감독원 finlife](https://finlife.fss.or.kr/finlifeapi/)
- [통계청 KOSIS](https://kosis.kr)
- [Architecture.md](./architecture.md) — 시스템 구조
- [CLAUDE.md](../CLAUDE.md) — 프로젝트 지시사항
