# 공공 API 카탈로그 (프로젝트 사용 현황)

> **Status**: SSoT — 우리가 실제 연동하는 API 현황
> **Last updated**: 2026-04-24
> **상세 스펙**: `.claude/skills/public-data-catalog/REFERENCE.md`

## 1. 사용 API 현황

| # | API | 상태 | MVP 필요 | 인증키 | 우리 활용 |
|---|---|---|---|---|---|
| 1 | 국토부 아파트 매매 실거래가 | ⏳ 미연동 | ✅ | `PUBLIC_DATA_KEY` | 양도세/취득세 자동 입력 |
| 2 | 국토부 아파트 전월세 실거래가 | ⏳ 미연동 | ✅ | `PUBLIC_DATA_KEY` | 전월세 전환, 임대료 상승 |
| 3 | 한국은행 ECOS | ⏳ 미연동 | ✅ | `ECOS_API_KEY` | 기준금리, 환율 자동 |
| 4 | 관세청 환율 | ⏳ 미연동 | - | - | 환전 계산기 |
| 5 | 금감원 금융상품 비교공시 | ⏳ 미연동 | - | `FINLIFE_API_KEY` | 예적금/대출 상품 표시 |
| 6 | 통계청 KOSIS | ⏳ 미연동 | - | `KOSIS_API_KEY` | 중위소득, CPI |
| 7 | 국세청 세율 | ❌ 공식 API 없음 | - | - | 정적 상수 관리 |
| 8 | 행안부 지방세 | ❌ 공식 API 없음 | - | - | 정적 매핑 관리 |
| 9 | 건강보험공단 | ❌ 공식 API 없음 | - | - | 연간 요율 상수 |
| 10 | 주식 시세 | 📅 Phase 2 | - | 검토 | 물타기 계산기 |

## 2. MVP에 반드시 필요한 API (3개)

### 2-1. 국토부 아파트 매매 실거래가
- 엔드포인트: `http://openapi.molit.go.kr:8081/.../getRTMSDataSvcAptTradeDev`
- 파라미터: `LAWD_CD` (법정동5자리), `DEAL_YMD` (YYYYMM)
- 활용: "내 아파트 시세" + 계산기 자동 입력
- Cloudflare Edge 호환: ✅ (fetch 기반, XML 파서)

### 2-2. 한국은행 ECOS
- 엔드포인트: `https://ecos.bok.or.kr/api/StatisticSearch/{키}/json/kr/...`
- 주요 통계: 기준금리(722Y001), 환율(731Y001)
- 활용: 대출/환율 계산기 기본값 자동
- 호출 제한: 10,000/일 (충분)

### 2-3. 국토부 아파트 전월세
- 엔드포인트: `.../RTMSOBJSvc/getRTMSDataSvcAptRent`
- 활용: 전월세 전환·임대료 상승 판정

## 3. 연동 구현 체크리스트

각 API 연동 시:
- [ ] `src/lib/publicapi/{name}.ts` 클라이언트 작성
- [ ] `src/lib/publicapi/types.ts`에 zod 스키마
- [ ] 인증키는 `.env.local` (커밋 금지)
- [ ] Cloudflare Pages 환경변수 설정
- [ ] 타임아웃 10초
- [ ] 캐싱 (`revalidate`)
- [ ] 에러 폴백 UI
- [ ] Edge Runtime 호환 확인

## 4. 호출 쿼터 관리

| API | 일 한도 | 예상 사용 | 여유 |
|---|---|---|---|
| 공공데이터포털 (총) | 10,000/key | ~2,000 | ✅ |
| ECOS | 10,000 | ~100 | ✅ |
| KOSIS | 1,000 | ~50 | ✅ |

대부분은 **정적 캐시로 재호출 최소화**:
- 실거래가: 일 1회 갱신
- ECOS 금리·환율: 일 1회
- KOSIS 중위소득: 연 1회

## 5. 신규 API 추가 절차

1. api-researcher 에이전트 호출
2. REFERENCE.md §N에 추가
3. 이 카탈로그 업데이트
4. 환경변수 템플릿 `.env.example`에 추가
5. ADR 기록

## 6. 장애 대응 정책

- API 실패 시 "일시적으로 수동 입력해주세요" 폴백 UI
- 5xx 오류 연속 3회 → Cloudflare Logs 알림
- 스키마 검증 실패 (zod) → 상세 로깅 + 폴백

## 7. 업데이트 로그
- 2026-04-24: 초판
