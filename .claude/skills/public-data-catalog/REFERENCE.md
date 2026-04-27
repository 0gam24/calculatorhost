# 한국 공공데이터 API 카탈로그

> **대상**: calculatorhost.com 계산기 연동용
> **최종 검증**: 2026-04 (스키마는 예고 없이 바뀔 수 있음 → 연동 전 반드시 공식 문서 재확인)

---

## §1. 공공데이터포털 (data.go.kr) 공통

### 인증 절차
1. https://www.data.go.kr 회원가입
2. 각 API마다 **개별 활용신청** 필요
3. 승인까지 수분~24시간
4. 일반 인증키 + 운영 인증키 별도 (운영 신청 후 부여)
5. 키 1개당 연 14-18개월 데이터 수집 가능 (일부 API)

### 인증 방식
- GET 파라미터 `serviceKey={인증키}` 또는 `ServiceKey={인증키}`
- 일부 API는 URL 인코딩된 키 요구

### 호출 제한
- 개발용: 대략 **1,000 건/일**
- 운영용: 신청 시 지정 가능 (보통 10,000 건/일)
- 초과 시 HTTP 429 또는 에러 XML 반환

### 응답 형식
- 대부분 XML (일부 JSON 지원)
- Next.js에서는 `fast-xml-parser`로 파싱 권장
- 응답 노드 구조 일관성 낮음 → 스키마 검증 필수 (`zod`)

### Cloudflare Pages 호환
- Edge Runtime 에서 fetch 가능
- 긴 응답은 timeout 주의 (15s 제한)

---

## §2. 국토교통부 실거래가 API

### 2-1. 아파트 매매 실거래가
- **데이터셋 ID**: 15126469
- **URL**: https://www.data.go.kr/data/15126469/openapi.do
- **엔드포인트**: `http://openapi.molit.go.kr:8081/OpenAPI_ToolInstallPackage/service/rest/RTMSOBJSvc/getRTMSDataSvcAptTradeDev`
- **파라미터**:
  - `LAWD_CD` (법정동코드 5자리, 예: 11110)
  - `DEAL_YMD` (거래년월 YYYYMM)
  - `numOfRows`, `pageNo`
- **응답 주요 필드**: 거래금액, 건축년도, 전용면적, 계약년월일, 아파트명, 지번, 층
- **우리 활용**:
  - 양도세 계산기: 단지명 → 최근 거래가 자동
  - 취득세 계산기: 시세 참고
  - "내 아파트 시세" 페이지
- **주의**: 법정동코드 매핑 테이블 필요 (행정안전부 API 또는 정적 JSON)

### 2-2. 아파트 전월세 실거래가
- **데이터셋 ID**: 15126474
- **엔드포인트**: `.../RTMSOBJSvc/getRTMSDataSvcAptRent`
- **응답 주요 필드**: 보증금액, 월세금액, 계약년월일, 계약기간, 갱신요구권 사용
- **우리 활용**: 전월세 전환 계산기, 임대료 상승 판정

### 2-3. 오피스텔·단독·다가구 각각 개별 API
- `getRTMSDataSvcOffiTrade` (오피스텔)
- `getRTMSDataSvcSHTrade` (단독/다가구)
- 파라미터 동일

### 2-4. 상업업무용 부동산
- **데이터셋 ID**: 15126463
- 상가/오피스 실거래가

---

## §3. 한국은행 ECOS OpenAPI

### 기본
- **URL**: https://ecos.bok.or.kr/api/
- **인증**: 회원가입 즉시 인증키 발급 (1일 이내 활성화)
- **응답**: XML/JSON 선택
- **호출 제한**: 일일 10,000건

### 엔드포인트 구조
```
https://ecos.bok.or.kr/api/{서비스}/{인증키}/{형식}/{언어}/{시작}/{끝}/{통계코드}/{주기}/{시작일}/{종료일}/{분류}
```

### 주요 통계코드 (본 프로젝트 활용)
| 통계표 | 코드 | 용도 |
|---|---|---|
| 한국은행 기준금리 | 722Y001 / 0101000 | 대출이자 계산기 자동 기본값 |
| COFIX (신규/잔액) | 721Y001 | 주담대 변동금리 |
| KORIBOR 3M | 817Y002 | 단기금리 |
| CD수익률 91일 | 817Y002 | 대출 기준 |
| 원/달러 환율 | 731Y001 / 0000001 | 환율/환전 계산기 |
| 원/엔(100엔) | 731Y001 / 0000002 | 환율 |
| 원/유로 | 731Y001 / 0000003 | 환율 |
| 원/위안 | 731Y001 / 0000053 | 환율 |
| 소비자물가지수 CPI | 901Y009 | 인플레이션 계산기 |

### 예시 호출
```
https://ecos.bok.or.kr/api/StatisticSearch/{키}/json/kr/1/10/722Y001/D/20260101/20260401/0101000
```

### 우리 활용 패턴
- 일 1회 cron (`scripts/sync-ecos.ts`)으로 최신값 KV/JSON에 저장
- 계산기 로드 시 이 캐시 값 사용 → API 호출 쿼터 절약 + 저지연

---

## §4. 관세청 환율 API

### 기본
- **URL**: https://www.customs.go.kr/ 
- 주간 고시환율 (수출/수입 환율)
- 매주 월요일 고시

### 우리 활용
- 환전 계산기의 "관세 기준 환율" 옵션
- ECOS의 기준환율과 구분 (수출입 실무 환율)

---

## §5. 국세청 홈택스 (간이세액표)

### 현황 (2026-04 기준)
- 국세청은 공식 **공개 API 없음** (공공데이터포털에서도 실시간 세율 API 부재)
- **대안**:
  - 연 1회 배포되는 "근로소득 간이세액표" 엑셀/PDF를 파싱해 정적 JSON 생성
  - `scripts/fetch-nts-tax-tables.ts` 로 자동화 (HTML 스크래핑 허용 범위 내)
  - 세율 데이터는 `src/lib/constants/tax-rates-{year}.ts` 에 고정

### 주요 원천
- **홈택스** https://hometax.go.kr (개별 계산기 제공, API X)
- **국세청 통계연보** https://stats.nts.go.kr
- **기획재정부 보도자료** (세법 개정)
- **국회 기획재정위원회** (개정안)

### 본 프로젝트 방침
- 매년 1월 1일 세율 상수 수동 업데이트 (tax-rate-updater 스킬이 보조)
- 변경 근거 ADR에 기록

---

## §6. 행정안전부 지방세 API

### 6-1. 지방세율 조회 (부재)
- 공식 API 없음
- 시도별 조례로 차등 → 정적 매핑 테이블 관리
- `docs/data-model.md` 에 시도별 지방세율 기록

### 6-2. 법정동코드 API
- 공공데이터포털 "행정안전부_법정동코드"
- 10자리 (시도 2 + 시군구 3 + 읍면동 3 + 2)
- 매매 실거래가 API의 LAWD_CD 5자리는 앞 5자리만
- 정적 JSON 관리 가능 (연 1-2회 개정)

---

## §7. 금융감독원 금융상품 비교공시 API

### 기본
- **URL**: https://finlife.fss.or.kr/finlife/api/fin/finProdList.xml
- 정기예금/정기적금/대출/연금/보험 상품 정보
- 은행별 금리/조건 비교

### 응답 주요 필드
- 금융회사명, 상품명, 최고 우대금리, 기본 금리, 가입 경로, 만기 기간

### 우리 활용
- "정기예금 이자" 계산기 하단에 "현재 가장 유리한 상품 5개" 표시 → UX 가치 + 제휴 가능성

---

## §8. 통계청 KOSIS API

### 기본
- **URL**: https://kosis.kr/openapi/
- 인증키 발급 필요

### 주요 통계 (우리 활용)
- 가구 기준 중위소득 (연봉 계산기 → 중위소득 대비 비율)
- 소비자물가지수 (인플레이션 계산기)
- 지역별 평균 주택가격

---

## §9. 주식 시세 API

### 9-1. 한국거래소 KRX (공식)
- 직접 제공 API 없음 / CSV 다운로드만
- 실시간 필요 시 민간 유료 API

### 9-2. 민간 대안
- **한국투자증권 OpenAPI** (무료, 증권계좌 필요)
- **네이버 금융 스크래핑** (비공식, 변동 위험)
- **Alpha Vantage, Finnhub** (영문, 일부 무료)

### 본 프로젝트 방침
- "주식 물타기" 계산기는 **수동 입력** 기본 (자동 조회는 옵션)
- 자동 조회 구현 시 한국투자 OpenAPI 우선 검토

---

## §10. 건강보험공단

### 기본
- 공식 공개 API 제한적
- 보험료율은 연 단위 정적 상수 관리

### 우리 활용
- 4대보험 계산기: 연도별 보험료율 상수 (`src/lib/constants/insurance-rates-{year}.ts`)

---

## §11. 복지로 (보건복지부)

### 기본
- 복지서비스 조회 OpenAPI 존재
- 기준 중위소득·수급 자격 판정에 활용 가능

### 블루오션 계산기 아이디어
- "교육비 세액공제 계산기"
- "자녀장려금 계산기"
- 복지로 API + 국세청 기준 결합

---

## §12. API 연동 구현 표준 (본 프로젝트)

### 디렉토리
```
src/lib/publicapi/
├── client.ts           ← 공통 fetch 래퍼 (retry, timeout, 에러 통일)
├── realestate.ts       ← 국토부 실거래가
├── ecos.ts             ← 한국은행 ECOS
├── customs.ts          ← 관세청 환율
├── finlife.ts          ← 금감원 금융상품
└── types.ts            ← 공통 응답 타입 (zod 스키마)
```

### 공통 패턴
```ts
// client.ts
export async function fetchPublicApi<T>(
  url: string,
  schema: z.ZodSchema<T>,
  opts?: { cache?: 'force-cache' | 'no-store'; revalidate?: number }
): Promise<T> {
  const res = await fetch(url, {
    next: { revalidate: opts?.revalidate ?? 3600 },
    signal: AbortSignal.timeout(10_000),
  });
  if (!res.ok) throw new PublicApiError(res.status, url);
  const data = await res.text();
  const parsed = parseXmlOrJson(data);
  return schema.parse(parsed);
}
```

### 캐싱 전략
- **Cloudflare KV** 또는 **엣지 캐시**
- 실거래가: 하루 1회 갱신
- ECOS 금리/환율: 하루 1회
- 금융상품 공시: 주 1회
- 정적 상수 (세율, 지방세): 빌드타임 번들

### 환경 변수
```
PUBLIC_DATA_KEY=...     # data.go.kr 운영 인증키
ECOS_API_KEY=...        # 한국은행
KOSIS_API_KEY=...       # 통계청
FINLIFE_API_KEY=...     # 금감원
```

모두 Cloudflare Pages 환경변수로 설정 (git 커밋 금지).

---

## §13. 에러 처리 / 스키마 변경 대응

- 공공 API는 **공지 없이 스키마가 바뀜**
- 모든 응답을 zod로 validate → 변경 감지 시 상세 로깅
- Sentry/Cloudflare Logs 로 API 실패율 모니터링
- 실패 시 "일시적으로 수동 입력해주세요" 폴백 UI

---

## §14. 업데이트 로그
- 2026-04-24: 초판 작성 (14종 API 카탈로그)
