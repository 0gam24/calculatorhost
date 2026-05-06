# 공공 API 활성화 가이드 (RTMS·JUSO)

> **대상**: 운영자
> **상황**: Phase D/G/H/L에서 RTMS(국토부 실거래가)·JUSO(행정안전부 도로명주소) Functions 구현 완료. 환경변수 설정 후 활성화 필요.
> **최종 검증**: 2026-05

## 1. RTMS 활성화 (국토부 실거래가)

### 1-1단계: data.go.kr 회원가입
1. https://www.data.go.kr 접속
2. 이메일 회원가입 완료

### 1-2단계: RTMS API 신청
1. 포털 내 "아파트 매매 실거래가 조회 서비스" 검색
   - 데이터셋 ID: `15126469`
2. **활용신청** 클릭
3. 기본정보 입력:
   - 활용 목적: "금융 계산기 사이트 양도세·취득세 계산"
   - 예상 활용량: "일 1,000건 이상" → 운영 신청으로 자동 권장
4. 약관 동의 후 제출

### 1-3단계: 승인 대기 (24시간)
- 이메일 확인 (승인 또는 반려 공지)
- 승인되면 **인증키** 발급 → 복사해두기

### 1-4단계: Cloudflare Pages 환경변수 등록
1. Cloudflare 대시보드 → calculatorhost.com 프로젝트 선택
2. **Settings → Environment variables** 클릭
3. **Production** 탭에 신규 추가:
   ```
   변수명: PUBLIC_DATA_KEY
   값: {위에서 복사한 인증키}
   ```
4. 저장

### 1-5단계: 검증
터미널에서 실행 (또는 브라우저 주소창):
```bash
curl "https://calculatorhost.com/api/public/realestate?lawdCd=11110&dealYmd=202605"
```
**기대 응답**: JSON 배열 (아파트 거래 내역 또는 "데이터 없음")
**에러**: 401/403 → 키 재확인, 504 → 아직 활성화 전

---

## 2. JUSO 활성화 (행정안전부 도로명주소)

### 2-1단계: JUSO 회원가입
1. https://business.juso.go.kr 접속
2. 회원가입 → 이메일 인증 완료

### 2-2단계: JUSO API 신청
1. 로그인 후 **오픈API** 메뉴
2. **도로명주소 검색 API** 선택
3. **신청** 클릭
4. 활용 목적: "부동산 거래 계산기 주소 자동완성"
5. **즉시 승인** (심사 생략, 인증키 바로 발급)

### 2-3단계: 인증키 복사
- 마이페이지 → API 관리 → "발급된 키" 복사

### 2-4단계: Cloudflare Pages 환경변수 등록
1. Cloudflare 대시보드 → calculatorhost.com 선택
2. **Settings → Environment variables → Production** 탭
3. 신규 추가:
   ```
   변수명: JUSO_API_KEY
   값: {복사한 JUSO 인증키}
   ```
4. 저장

### 2-5단계: 검증
브라우저에서 실행:
```bash
curl "https://calculatorhost.com/api/public/juso?keyword=종로&pageNum=1"
```
**기대 응답**: JSON 배열 (도로명주소 검색 결과)
**에러**: 401/403 → 키 재확인

---

## 3. 통합 검증 (선택)

### 양도세 계산기 end-to-end
1. 사이트 방문: https://calculatorhost.com/calculator/capital-gains-tax
2. "주소 검색" 입력칸에 "서울 종로" 입력
   - JUSO가 정상이면 자동완성 리스트 표시
3. 단지 선택 시 "최근 거래가" 자동 조회
   - RTMS가 정상이면 시세 데이터 표시

---

## 4. 호출 한도·캐싱

| API | 호출 한도 | 캐시 전략 | 초과 시 |
|---|---|---|---|
| **RTMS** | 1,000/일 (개발) / 10,000/일 (운영) | 24h Cloudflare KV | 403 에러 |
| **JUSO** | 300,000/월 | 1h 엣지 캐시| 429 에러 |

- 개발 환경에서는 `dev` 키 사용 → 운영 배포 시 `운영` 키로 교체
- 월별 JUSO 한도 추적 → `.claude/scripts/sync-metadata.json` 참조

---

## 5. 문제 해결

### RTMS 503 오류
- **원인 1**: 키 발급 후 서버 활성화 대기 (수 시간 가능)
- **원인 2**: LAWD_CD(법정동코드) 형식 오류 → 5자리 확인
- **해결**: Cloudflare 로그 확인 (`https://dash.cloudflare.com` → logs)

### JUSO 빈 응답
- **원인**: 검색 키워드가 도로명주소 DB에 없음 (옛 주소, 오타)
- **해결**: "서울 강남" 같은 광역 검색으로 우선 테스트

### 환경변수 적용 안 됨
- **원인**: Cloudflare Pages 배포 후 즉시 효과 (5-10분 대기)
- **해결**: 브라우저 캐시 삭제 → `Ctrl+Shift+Delete` → 재접속

---

## 6. 모니터링

### 일일 호출량 체크
```bash
npm run sync:health
```
결과 파일: `.claude/scripts/sync-metadata.json`
```json
{
  "rtms": {
    "lastSync": "2026-05-06T10:00:00Z",
    "callCount": 342,
    "dailyLimit": 10000,
    "status": "OK"
  },
  "juso": {
    "monthlyCallCount": 45000,
    "monthlyLimit": 300000,
    "status": "OK"
  }
}
```

### Cloudflare 알림 설정 (선택)
- 대시보드 → **Notifications** → "API Error Rate" 설정
- 임계값: 5% 초과 시 알림

---

## 7. 업그레이드: 운영 키 전환

### 현재 (개발 키 1,000/일)
- 작은 규모 테스트 충분
- 제한 도달 시 24h 재설정

### 향후 (운영 키 10,000/일)
1. data.go.kr 마이페이지 → 신청 관리
2. 기존 키 → **운영키로 신청** 클릭
3. 심사 후 운영 인증키 발급 (1-2일)
4. `PUBLIC_DATA_KEY` 환경변수 교체
5. Cloudflare 재배포 (자동)

---

**작성일**: 2026-05-06
**대상 버전**: Phase D/G/H/L 이후
**다음 단계**: `/api/public/` Functions 호출 로깅 + Sentry 연동
