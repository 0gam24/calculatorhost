# Phase 2: Cloudflare Pages Functions API 프록시

> **Status**: Implementation in progress
> **Date**: 2026-04-27
> **목표**: 실시간 검색 기능 (단지명·주소 자동완성)

## 개요

Phase 2는 Cloudflare Pages Functions을 이용해 외부 API를 프록시하며, **API 키를 서버에만 저장**하고 브라우저 노출을 차단한다. 무료 한도 (일 10만 KV 읽기/1,000 쓰기) 내에서 캐시·레이트리밋을 통해 비용을 0원으로 관리한다.

## 아키텍처

```
┌─────────────────────────┐
│   사용자 (브라우저)        │
├─────────────────────────┤
│  RealtorAutocomplete    │
│  AddressAutocomplete    │ 입력 → debounce 300ms
├─────────────────────────┤
│  src/lib/api/client.ts  │ fetchRealtor / fetchAddress
└────────────┬────────────┘
             │ GET /api/realtor?q=...&type=apt
             │ GET /api/address?q=...
             ▼
     ┌──────────────────┐
     │ Cloudflare Pages │
     │   Functions      │
     ├──────────────────┤
     │ _middleware.ts   │ CORS + 보안 헤더
     │ api/realtor.ts   │ 캐시 + 레이트리밋
     │ api/address.ts   │ 캐시 + 레이트리밋
     └────────┬─────────┘
              │ (Cache API: 1h / 6h)
              │ (KV: 일일 카운터)
              │ context.env.MOLIT_REALTOR_API_KEY
              │ context.env.JUSO_API_KEY
              ▼
     ┌──────────────────┐
     │  외부 API        │
     │  (MOLIT, JUSO)   │
     └──────────────────┘
```

## 1. Functions 파일 구조

```
functions/
├── _middleware.ts          # CORS + 공통 헤더
├── api/
│   ├── realtor.ts          # GET /api/realtor
│   └── address.ts          # GET /api/address
└── _utils/
    ├── cache.ts            # Cache API 래퍼
    ├── rate-limit.ts       # KV 기반 일일 카운터
    └── response.ts         # 표준 응답 헬퍼
```

## 2. 환경변수 설정 (Cloudflare Pages)

### 국토부 실거래가 API

1. https://www.molit.go.kr 방문
2. 개발자 센터 → API 포털 → 서비스 신청
3. 인증키(serviceKey) 획득
4. **Cloudflare Pages 프로젝트 설정** → 환경변수
   - 키: `MOLIT_REALTOR_API_KEY`
   - 값: (획득한 인증키)
   - 환경: Production

### 행안부 도로명주소 API

1. https://business.juso.go.kr/addrlink 방문
2. 회원가입 → 서비스 신청
3. 인증키(confmKey) 획득
4. **Cloudflare Pages 프로젝트 설정** → 환경변수
   - 키: `JUSO_API_KEY`
   - 값: (획득한 인증키)
   - 환경: Production

## 3. KV Namespace 설정

### 생성 방법

1. Cloudflare 대시보드 → Workers → KV
2. "Create namespace" 클릭
3. 이름: `RATE_LIMIT_KV` (또는 선택지)
4. 네임스페이스 ID 복사

### wrangler.toml 수정

```toml
[[kv_namespaces]]
binding = "RATE_LIMIT_KV"
id = "YOUR_COPIED_ID"
preview_id = "YOUR_PREVIEW_ID"  # 선택사항
```

## 4. 엔드포인트 명세

### GET /api/realtor

실거래가 검색 (국토부 API 프록시)

**요청**:
```
GET /api/realtor?q=강남역&type=apt
```

**파라미터**:
- `q` (required): 검색어 (단지명 또는 주소, 최소 2글자)
- `type` (required): `apt` | `land` | `officetel`

**응답 성공** (200):
```json
{
  "query": "강남역",
  "type": "apt",
  "results": [
    {
      "name": "강남역빌라트",
      "address": "서울시 강남구 역삼동",
      "avgPrice": 75000,
      "avgArea": 84.5,
      "txCount": 12,
      "period": "최근 3개월"
    }
  ],
  "fetchedAt": "2026-04-27T12:00:00Z",
  "cached": false
}
```

**응답 한도 초과** (429):
```json
{
  "error": "daily_limit_reached",
  "message": "일일 한도를 초과했습니다. 내일 다시 시도해주세요.",
  "retryAfter": 86400
}
```

**캐시 정보**:
- TTL: 1시간 (Cloudflare Cache API)
- 동일 쿼리·타입 재요청 시 캐시에서 즉시 반환
- `cached: true` 필드로 표시

### GET /api/address

도로명주소 자동완성 (행안부 API 프록시)

**요청**:
```
GET /api/address?q=강남역
```

**파라미터**:
- `q` (required): 검색어 (최소 2글자)

**응답 성공** (200):
```json
{
  "query": "강남역",
  "results": [
    {
      "roadAddr": "서울특별시 강남구 강남대로 지하 123",
      "jibunAddr": "서울특별시 강남구 역삼동 123-456",
      "zipNo": "06226",
      "bdNm": "강남역 빌딩",
      "sigungu": "강남구"
    }
  ],
  "cached": false
}
```

**캐시 정보**:
- TTL: 6시간 (주소는 자주 안 바뀜)

## 5. 레이트 리밋

| API | 일일 한도 | 무료 한도 | 비율 | 리셋 |
|---|---|---|---|---|
| Realtor | 800 | 1,000 | 80% | 00:00 UTC |
| Address | 8,000 | 10,000 | 80% | 00:00 UTC |

### 동작 원리

1. 요청마다 KV에서 일일 카운터 조회
2. 한도 미달 → 카운터 증가 → 요청 진행
3. 한도 도달 → 429 응답 (retryAfter 헤더)
4. KV에서 자동 만료 (24시간 TTL)

## 6. 클라이언트 통합

### RealtorAutocomplete 컴포넌트

양도세·취득세·재산세·종부세 페이지에서 사용:

```tsx
import { RealtorAutocomplete } from '@/components/calculator/RealtorAutocomplete';

export function SomeCalculator() {
  const handlePick = (pick: RealtorPick) => {
    setPrice(pick.avgPrice);
    setArea(pick.avgArea);
  };

  return (
    <RealtorAutocomplete
      type="apt"
      onPick={handlePick}
      placeholder="단지명·주소 검색"
    />
  );
}
```

**기능**:
- 2글자 이상 입력 시 300ms debounce 후 요청
- 결과 드롭다운 표시
- 항목 선택 → `onPick` 콜백 (평균가·면적 전달)
- 에러 시 메시지 표시 (검색 결과 없음, 일일 한도 등)

### AddressAutocomplete 컴포넌트

주소 검색이 필요한 페이지 (선택적):

```tsx
import { AddressAutocomplete } from '@/components/calculator/AddressAutocomplete';

export function RentalCalculator() {
  const handleSelect = (addr: AddressResult) => {
    // 주소 정보 저장 (선택사항)
    console.log(addr.roadAddr);
  };

  return (
    <AddressAutocomplete
      onSelect={handleSelect}
      showFull={false}
    />
  );
}
```

## 7. 로컬 테스트

### 1. 환경변수 설정

`.env.local` 파일 생성 (git 무시됨):
```
MOLIT_REALTOR_API_KEY=test_key_here
JUSO_API_KEY=test_key_here
```

### 2. wrangler 설치 및 실행

```bash
npm install -D wrangler@latest
npm run dev:functions  # wrangler pages dev out --local --port 3000
```

(또는 분리 실행)
```bash
# Terminal 1: Next.js 빌드
npm run build

# Terminal 2: Pages Functions 개발 서버
npx wrangler pages dev out --local --port 3000
```

### 3. 테스트

```bash
# 실거래가 검색
curl 'http://localhost:3000/api/realtor?q=강남역&type=apt'

# 주소 자동완성
curl 'http://localhost:3000/api/address?q=강남역'
```

### 4. KV 로컬 테스트 (선택사항)

wrangler는 로컬에서 KV를 자동 에뮬레이션한다. 일일 카운터가 제대로 작동하는지 확인:

```bash
# 800회 이상 요청 후 429 응답 확인
for i in {1..801}; do
  curl 'http://localhost:3000/api/realtor?q=강남&type=apt'
done
```

## 8. 배포 체크리스트

### 사전 준비
- [ ] Cloudflare Pages 프로젝트 생성
- [ ] KV Namespace 생성 (`RATE_LIMIT_KV`)
- [ ] 국토부 API 인증키 신청 및 획득
- [ ] 행안부 API 인증키 신청 및 획득

### Cloudflare Pages 설정
- [ ] 환경변수 등록
  - `MOLIT_REALTOR_API_KEY`
  - `JUSO_API_KEY`
- [ ] wrangler.toml에 KV ID 입력
- [ ] 프로젝트 빌드 명령: `npm run build`

### 배포 후 검증
- [ ] GET /api/realtor 응답 테스트
- [ ] GET /api/address 응답 테스트
- [ ] CORS 헤더 확인 (브라우저에서 요청)
- [ ] 한도 초과 시 429 응답 확인
- [ ] 캐시 동작 확인 (X-Cached 헤더)

## 9. 보안 체크리스트

- [ ] API 키는 Cloudflare 환경변수에만 저장
- [ ] 코드에 실제 키 값 없음 (placeholder 또는 `context.env.X`)
- [ ] 클라이언트 번들에 키 포함 안 됨 (Functions 서버에서만 사용)
- [ ] CORS Origin 제한 (프로덕션: calculatorhost.com만)
- [ ] X-Frame-Options 헤더 설정 (DENY)
- [ ] Content-Type 강제 (application/json)

## 10. 향후 개선

### Phase 2.1: 데이터 동기화
- 국토부 주간 API 동기화 (스크립트)
- 공시지가·최신 거래가 자동 갱신
- 일일 스냅샷 KV 저장

### Phase 2.2: 고급 캐시
- 지역별 캐시 파티셔닝
- 시계열 데이터 저장 (거래가 추이)
- R2 스토리지 연동 (롱테일 데이터)

### Phase 2.3: 사용자 피드백
- 검색 로그 수집 (집계 분석용)
- 최인기 검색어 트렌드
- 계산기별 검색 패턴 분석

## 참고

- [Cloudflare Pages Functions 문서](https://developers.cloudflare.com/pages/functions/)
- [Cloudflare KV 문서](https://developers.cloudflare.com/kv/)
- [Cloudflare Cache API](https://developers.cloudflare.com/cache/)
- [국토부 실거래가 API](https://www.molit.go.kr)
- [행안부 도로명주소 API](https://business.juso.go.kr/addrlink)
