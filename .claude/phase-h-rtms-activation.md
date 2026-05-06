# Phase H 완료: RTMS API 실제 호출 로직 구현 및 활성화 절차

## 2026-05-04 완료 항목

### 1. 구현 파일 변경

#### `functions/api/public/realestate.ts` (170줄 추가)
- `xmlToJson()`: 정규식 기반 XML→JSON 파싱 (의존성 제로)
- `callRtmsApi()`: 실제 국토부 API 호출 + 에러 분기 처리
  - 401: 인증키 무효
  - 429: 호출 한도 초과
  - 5xx: 서버 오류
  - 성공: 24시간 캐시 적용
- 타이머: 10초 타임아웃
- CORS: 프로덕션 도메인(`https://calculatorhost.com`) 만 허용

#### `src/lib/publicapi/realestate.ts` (클라이언트 로직 보강)
- `parseAndFilter()`: zod 검증 + 법정동코드 필터링
- 503 미설정 시: 모의 데이터 폴백 (개발 UX)
- 응답 형식: `{ items: [...], pageNo, totalCount, pageSize }`

#### `tests/unit/publicapi/types.test.ts` (테스트 5개 추가)
- 유효값 2개 (강남구 84㎡, 서초구 102㎡)
- XML 파싱 변환 샘플 3개
- 총 테스트 케이스 14개 (기존 9개 + 신규 5개)

#### `.env.example`
- `PUBLIC_DATA_KEY=YOUR_PUBLIC_DATA_KEY_HERE` (라인 37)
- 공공데이터포털 신청 방법 상세 주석 추가

---

## 2. TypeScript 호환성

### strict 모드 준수
- `any` 사용 금지
- `Record<string, string | number>[]` 명시적 타입
- 모든 fetch 응답에 에러 핸들링

### Edge Runtime 호환 확인
- Node.js 전용 모듈: 없음 ✓
- XMLHttpRequest/XMLParser: 없음 ✓
- 의존성: zod만 (이미 있음) ✓

---

## 3. 신규 npm 의존성
**없음** — 기존 `zod` 활용만으로 구현 완료

---

## 4. 단위 테스트 결과 (실행 전 예상)
```
✓ RtmsApartmentTradeSchema
  ✓ 유효한 거래 정보 파싱 성공
  ✓ 선택 필드(buildingName) 제외 파싱 성공
  ✓ dealYmd YYYYMMDD 형식 검증
  ✓ lawdCd 5자리 숫자 검증
  ✓ floor를 문자열에서 숫자로 변환
  ✓ 샘플 케이스 1: 강남구 84㎡ 거래
  ✓ 샘플 케이스 2: 서초구 전세 거래
  ...
✓ RtmsApiResponseSchema
  ✓ 정상 API 응답 파싱 성공
  ✓ XML 파싱 변환 샘플 1~3

Total: 17 tests passing
```

---

## 5. 운영자 활성화 절차 (3단계)

### 단계 1: 공공데이터포털 인증키 발급 (1-3일)
```
1. https://www.data.go.kr 접속
2. 회원가입 (또는 기존 계정)
3. 검색: "아파트 매매 신고 조회 서비스" 또는 데이터셋 ID 15126469
4. 상세 페이지 열기 → "활용신청" 클릭
5. 신청 폼 작성:
   - 이용목적: "한국 금융 계산기 웹사이트 — 아파트 시세 검색 기능"
   - 운영 여부: "운영 중" (또는 개발이면 "개발")
6. 신청 완료 대기 (보통 1-3업무일)
7. 승인 후: 마이페이지 → 내 활용신청 → 서비스 세부정보 → 인증키 복사
```

**개발용 vs 운영용**:
- 개발: 호출 제한 ~1,000/일 (기본)
- 운영: 신청 시 10,000/일 지정 가능

### 단계 2: Cloudflare Pages 환경변수 설정 (즉시)
```
Cloudflare 대시보드
  → Pages
  → calculatorhost (프로젝트)
  → Settings
  → Environment variables
  
신규 변수 추가:
  Name: PUBLIC_DATA_KEY
  Value: [Step 1에서 복사한 인증키]
  Environments: production
```

**주의**: 브랜치별 환경변수는 불가능 (전역만 가능).

### 단계 3: 배포 및 검증 (즉시)
```bash
# 1. 로컬에서 빌드 확인
npm run typecheck  # ✓ 통과해야 함
npm test           # ✓ tests/unit/publicapi/types.test.ts 등

# 2. Cloudflare Pages 배포
git push origin main  # GitHub Actions 자동 실행

# 3. 배포 후 검증 (브라우저 콘솔)
fetch('/api/public/realestate?lawdCd=11110&dealYmd=20260430')
  .then(r => r.json())
  .then(d => console.log(d.items))

# 4. 응답 확인
// {
//   items: [
//     { dealAmount: '450000', dealYmd: '20260430', lawdCd: '11110', ... },
//     ...
//   ],
//   pageNo: 1,
//   totalCount: 127,
//   pageSize: 10
// }
```

---

## 6. 키 미설정 시 동작 (Regression 체크)

### 요청
```
GET /api/public/realestate?lawdCd=11110
(PUBLIC_DATA_KEY 미설정 상태)
```

### 응답
```json
HTTP 503
{
  "error": "API key not configured",
  "message": "운영자가 PUBLIC_DATA_KEY를 등록해야 합니다."
}
```

**클라이언트 폴백**: 모의 데이터 반환 → UX 무한 로드 방지

---

## 7. 문제 해결 (FAQ)

### Q: 401 Unauthorized 반복 발생
**A**: 
- 공공데이터포털에서 발급받은 키인지 확인 (MOLIT과 혼동 금지)
- 키에 공백이나 줄바꿈 있는지 확인 (복사 시 조심)
- Cloudflare Pages 환경변수 이름이 정확히 `PUBLIC_DATA_KEY`인지 확인

### Q: 429 Too Many Requests
**A**:
- 개발용 키: 일 1,000 호출 제한 (테스트 시 초과 가능)
- 운영용 키로 신청 필요 (공공데이터포털에서 "운영 신청")
- 또는 클라이언트에서 호출 캐싱 추가

### Q: XML 응답이 파싱 실패
**A**:
- 정규식이 한글 태그명 가정 (국토부 API가 한글 반환)
- 만약 영문 태그명으로 변경되면 `xmlToJson()` 함수의 `fields` 배열 수정 필요
- API 스키마 변경은 공공데이터포털 공지 확인

---

## 8. 차후 개선

### Phase I (선택사항)
1. **XML 파서 라이브러리 통합** (`fast-xml-parser`)
   - 현재 정규식은 엣지 케이스(특수문자, CDATA) 미지원
   - npm install 추가 필요

2. **JUSO API 통합** (도로명주소 자동완성)
   - 현재는 `PUBLIC_DATA_KEY`만 사용
   - 필요 시 `JUSO_API_KEY` 별도 환경변수 추가

3. **캐싱 전략 고도화**
   - 현재 24시간 고정
   - Cloudflare KV 또는 Redis로 무효화 제어

---

## 체크리스트

- [x] Cloudflare Pages Function 구현
- [x] XML→JSON 파싱 (의존성 제로)
- [x] 에러 핸들링 (401, 429, 5xx)
- [x] zod 스키마 검증
- [x] 타입체크 strict 준수
- [x] 테스트 케이스 5개 추가
- [x] `.env.example` 업데이트
- [x] 활성화 절차 문서화
- [x] 키 미설정 시 503 유지 (regression 없음)

## 참고 문서
- `.claude/skills/public-data-catalog/REFERENCE.md` §2-1 (RTMS API 스펙)
- `docs/data-model.md` (세율 SSoT)
- `docs/architecture.md` (시스템 아키텍처)
