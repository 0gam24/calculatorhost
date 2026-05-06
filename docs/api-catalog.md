# 공공 API 카탈로그 (프로젝트 사용 현황)

> **Status**: YORO Phase M — 6 API 통합 상태 추적
> **Last updated**: 2026-05-06
> **상세 스펙**: `.claude/skills/public-data-catalog/REFERENCE.md`

## 1. 6대 API 통합 상태 (2026-05-06)

| # | API | 엔드포인트 | 활성화 | 키 상태 | MVP 필수 | 마지막 동기화 |
|---|---|---|---|---|---|---|
| 1 | 한국은행 ECOS | `ecos.bok.or.kr/api/StatisticSearch` | ✅ 함수형 | `ECOS_API_KEY` | ✅ | 2026-05-06 00:00 |
| 2 | 한국수출입은행 환율 | `koreaexim.go.kr/financial/exchangeJSON` | ✅ 함수형 | `EXIM_FX_API_KEY` | ✅ | 2026-05-06 00:00 |
| 3 | 금감원 금융상품 | `finlife.fss.or.kr/finlifeapi/depositProductsSearch.json` | ✅ 함수형 | `FSS_FINLIFE_API_KEY` | - | 2026-05-06 00:00 |
| 4 | 통계청 KOSIS | `kosis.or.kr/openapi/statData.json` | ✅ 함수형 (2026-05 갱신) | `KOSIS_API_KEY` | - | 2026-05-06 00:00 |
| 5 | 국토부 RTMS 매매가 | `openapi.molit.go.kr:8081/getRTMSDataSvcAptTradeDev` | ⏳ 스텁 | `MOLIT_REALTOR_API_KEY` | ✅ | 미구현 |
| 6 | 도로명주소 JUSO | `www.juso.go.kr/addrlink/addrLinkApiJson.do` | ⏳ 스텁 | `JUSO_API_KEY` | ✅ | 미구현 |

## 2. 키 발급 우선순위

### 1순위 (MVP 필수, 즉시 발급)
- **ECOS_API_KEY** (한국은행) — 기준금리 + CPI 동기화 → 대출 계산기 기본값
- **MOLIT_REALTOR_API_KEY** (국토부) — 실거래가 → 양도세/취득세 자동 입력

### 2순위 (대출/환율 계산 정확도)
- **EXIM_FX_API_KEY** (한국수출입은행) — 실시간 환율
- **JUSO_API_KEY** (행정안전부) — 도로명주소 검색

### 3순위 (참고 정보)
- **FSS_FINLIFE_API_KEY** (금융감독원) — 예적금 평균 금리 참고
- **KOSIS_API_KEY** (통계청) — 가구 소득 통계 (향후 은퇴 시뮬용)

## 3. 구현 상태 상세

### API 1: ECOS (활성)
- **상태**: ✅ 함수형 (sync-public-data.mjs §136-196)
- **기능**: 기준금리 722Y001 + CPI 901Y009
- **데이터**: `src/data/bok-rates.json`
- **폴백**: 키 미설정 시 기존 파일 유지 (try/catch)

### API 2: EXIM (활성)
- **상태**: ✅ 함수형 (sync-public-data.mjs §198-251)
- **기능**: USD, JPY, EUR, CNY, GBP 5종 매매기준율
- **데이터**: `src/data/exchange-rates.json`
- **폴백**: 환율 요청 실패 시 이전 파일 유지

### API 3: FSS (활성)
- **상태**: ✅ 함수형 (sync-public-data.mjs §253-317)
- **기능**: 정기예금 12/24개월, 적금 평균금리
- **데이터**: `src/data/finance-products.json`
- **폴백**: finlife API 응답 없음 시 기본값 (deposit12m 3.25%, savings12m 2.85%)

### API 4: KOSIS (활성 — 2026-05 갱신)
- **상태**: ✅ 함수형 (sync-public-data.mjs §319-375)
- **주의**: 2026-05-04 엔드포인트 변경
  - 구: `/openapi/Param/statisticsParameterData.do`
  - 신: `/openapi/statData.json`
- **응답 필드 호환성**: DATA_VALUE / DT, PERIOD / PRD_DE 양쪽 모두 처리
- **데이터**: `src/data/kosis-income.json`
- **폴백**: 가구소득 4,850,000원 기본값

### API 5: RTMS (미구현)
- **상태**: ⏳ 스텁 (sync-metadata.json 등재, 함수 미구현)
- **계획**: Phase N에서 함수형 작성
- **개요**: 법정동 5자리 + YYYYMM → 아파트 매매 시세 조회
- **키**: `MOLIT_REALTOR_API_KEY` 필요 (공공데이터포털 신청)

### API 6: JUSO (미구현)
- **상태**: ⏳ 스텁 (클라이언트 호출용, 빌드 시점 불필요)
- **계획**: Phase N+에서 컴포넌트 추가
- **개요**: 도로명주소 입력 → 법정동코드 자동 변환
- **키**: `JUSO_API_KEY` 필요 (행정안전부 신청)

## 4. 동기화 헬스 체크 (npm run sync:health)

**실행 명령**:
```bash
npm run sync:health
```

**출력 예**:
```
📊 API 동기화 헬스 체크

2026-05-04 기준

┌─────────────────────┬──────────────────────────┬──────────┬─────────────────┐
│ API 이름            │ 마지막 동기화            │ 경과일   │ 상태            │
├─────────────────────┼──────────────────────────┼──────────┼─────────────────┤
│ ecos                │ 2026-05-06 00:00         │ 0일      │ ✅ 정상         │
│ exim                │ 2026-05-06 00:00         │ 0일      │ ✅ 정상         │
│ fss                 │ 2026-05-06 00:00         │ 0일      │ ✅ 정상         │
│ kosis               │ 2026-05-06 00:00         │ 0일      │ ✅ 정상         │
│ rtms                │ 2026-05-06 00:00         │ 0일      │ ⏳ 미구현       │
│ juso                │ 2026-05-06 00:00         │ 0일      │ ⏳ 미구현       │
└─────────────────────┴──────────────────────────┴──────────┴─────────────────┘

✅ 모든 API가 정상 동기화 상태입니다.
```

**상태 정의**:
- ✅ 정상: 최근 7일 내 동기화
- 🟡 경고: 7-30일 미동기화
- 🔴 에러: 30일 이상 미동기화 (exit code 1)
- ⏳ 미구현: RTMS/JUSO (함수 미작성)

## 5. 스크립트 무결성

### sync-public-data.mjs
- **라인 16-57**: 환경변수 형식 검증
  - AdSense: `ca-pub-{16자리}`
  - GA: `G-{6자리 이상}`
  - API 키: `{8자리 이상}`
- **라인 60-65**: 4개 API 키 로드
- **라인 88-120**: sync-metadata.json 갱신 (lastSync, status, lastError)
- **라인 122-134**: 타임아웃 10초 fetch 래퍼
- **라인 378-395**: 메인 실행 (4개 API 순차)

### check-sync-health.mjs
- **라인 10-13**: 임계값 (warn: 7일, error: 30일)
- **라인 33-44**: 상태 배지 결정 로직
- **라인 115-116**: exit code (에러시 1, 경고만 0)

## 6. typecheck/build 영향도

| 파일 | 조치 | 이유 |
|---|---|---|
| scripts/sync-public-data.mjs | ESM (Node.js 18+) | 빌드 타임에만 실행, 제품 코드 X |
| scripts/check-sync-health.mjs | ESM + fs 모듈 | 헬스 체크 스크립트, 빌드 독립 |
| src/data/*.json | 정적 JSON | 빌드 성공 후 import 가능 |
| sync-metadata.json | 추적 파일 | CI/CD 대시보드용, 선택 추적 |

**빌드 영향**: 0. 두 스크립트는 prebuild/postbuild 훅과 무관하게 GitHub Actions 수동/자동 트리거.

## 7. 운영 프로세스

### 일일 자동 동기화 (03:00 KST)
```
[GitHub Actions 트리거]
  → scripts/sync-public-data.mjs
  → 4개 API 호출 (ECOS, EXIM, FSS, KOSIS)
  → src/data/*.json + sync-metadata.json 갱신
  → PR 생성 (변경 시) 또는 스킵 (무변경)
```

### 수동 트리거
```bash
npm run sync-data       # src/data/*.json 생성
npm run sync:health     # 헬스 체크 (CI/CD 전 확인)
```

## 8. 향후 확장 (Phase N+)

- [ ] RTMS 함수형 구현 (`src/lib/publicapi/rtms.ts`)
- [ ] JUSO 클라이언트 스텁 완성 (`src/components/AddressSelector.tsx`)
- [ ] 국세청 세율 동기화 (API 공개 시)
- [ ] sync-metadata.json CI/CD 대시보드 시각화

## 9. 업데이트 로그
- 2026-04-24: 초판 (4 API)
- 2026-05-06: Phase M — 6 API 통합 상태 표, KOSIS 2026-05 갱신, RTMS/JUSO 스텁 추가
