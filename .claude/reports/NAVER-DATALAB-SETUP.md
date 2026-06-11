# Naver DataLab 트렌드 모니터 셋업 (운영자 1회, 약 5분)

> 목적: 네이버 검색어 트렌드(상대 검색량 추이)를 자동 수집 → **급상승 키워드를 먼저 발견**해 시즌·이슈 선점.
> (네이버 Search Advisor 실적은 API가 없어 불가. DataLab은 "추이"만 — 절대 검색량 아님.)
> ⚠️ 발급받는 Secret은 비밀. 코드·커밋·채팅에 붙여넣지 마세요. (.env.local 만, gitignore됨)

---

## 1단계 — 네이버 개발자센터에서 앱 등록
1. https://developers.naver.com 접속 → 본인 네이버 계정으로 로그인
2. 상단 **Application → 애플리케이션 등록**
3. **애플리케이션 이름**: `calculatorhost-datalab` (아무거나)
4. **사용 API**: **"데이터랩 (검색어트렌드)"** 체크
5. **환경 추가** → **WEB 설정** 선택 → 서비스 URL에 `https://calculatorhost.com` 입력 → 등록
   > (DataLab은 서버-서버 호출이라 콜백/로그인 불필요. WEB 환경만 채우면 됨.)

## 2단계 — Client ID / Secret 복사
- 등록된 앱 → **"개요"** 탭에 **Client ID** 와 **Client Secret** 이 있습니다. 복사.

## 3단계 — `.env.local` 에 두 줄 추가
```
NAVER_CLIENT_ID=복사한_Client_ID
NAVER_CLIENT_SECRET=복사한_Client_Secret
```

## 4단계 — 테스트
- **"됐어"** 라고 하시면 Claude가 `npm run naver:trend` 실행 →
  `.claude/reports/naver-trends.md` 에 **🔥 급상승 키워드** 리포트 생성.
- 직접: `npm run naver:trend` (자격증명 없이 로직만: `npm run naver:trend -- --mock`)

---

## 무엇을 주나 / 한계
- ✅ 우리 계산기·가이드 토픽 20개의 **주간 검색 추이** → "최근 4주 +30%↑" 급상승 자동 감지
- ⚠️ **상대값(추이)만** — 절대 검색량은 안 줌(네이버 미공개). 방향(오르는가)만 신뢰.
- 활용: 급상승 키워드 → 해당 계산기/가이드 **먼저 증폭**, 없으면 1차출처 검증 후 신규 발행.

## 자주 나는 오류
| 증상 | 해결 |
|---|---|
| `401/403` | Client ID/Secret 오타 또는 앱에 '데이터랩' API 미등록 |
| `429` | 호출 한도 초과 — 잠시 후 재시도(일 호출 제한 있음) |
| 데이터 빈약 | 키워드 검색량이 적어 추이 미미 — 정상 |

## 보안
- Secret 은 .env.local 에만. 노출 의심 시 개발자센터에서 재발급.
- DataLab은 **읽기 전용 조회**라 사이트를 바꾸지 못합니다.
