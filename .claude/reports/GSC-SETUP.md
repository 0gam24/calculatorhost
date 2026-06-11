# GSC 자동 연결 셋업 (운영자 1회, 약 10분)

> 목적: Google Search Console 실적을 Claude가 **스크린샷 없이 직접 읽고** 기회 리포트를 자동 생성.
> 한 번만 설정하면, 이후 `npm run gsc` 한 줄로 데이터가 들어옵니다.
> ⚠️ 다운로드하는 키 파일(JSON)은 **비밀번호급 비밀**입니다. 코드·커밋·채팅에 절대 붙여넣지 마세요.

---

## 1단계 — 구글 클라우드에서 "서비스 계정" 만들기

1. https://console.cloud.google.com 접속 (calculatorhost GSC와 **같은 구글 계정**으로)
2. 상단 프로젝트 선택 → **새 프로젝트** → 이름 `calculatorhost-gsc` → 만들기
3. 좌측 메뉴(또는 상단 검색)에서 **"API 및 서비스" → "라이브러리"**
4. `Search Console API` 검색 → 클릭 → **사용 설정(Enable)**
5. **"API 및 서비스" → "사용자 인증 정보"** → 상단 **"+ 사용자 인증 정보 만들기" → "서비스 계정"**
   - 서비스 계정 이름: `gsc-reader` → 만들고 계속 → (역할 없이) 완료
6. 만들어진 서비스 계정 클릭 → **"키" 탭 → "키 추가" → "새 키 만들기" → JSON** → 만들기
   - **JSON 파일이 다운로드됩니다.** 이게 열쇠예요. 잘 보관하세요.

## 2단계 — 그 서비스 계정을 GSC에 "사용자 추가"

1. 다운로드한 JSON 파일을 메모장으로 열어 **`client_email`** 값을 복사
   (예: `gsc-reader@calculatorhost-gsc.iam.gserviceaccount.com`)
2. https://search.google.com/search-console → **설정 → 사용자 및 권한 → 사용자 추가**
3. 위 이메일 붙여넣기 → 권한 **"제한됨(읽기)"** → 추가

## 3단계 — 키를 환경변수로 등록

JSON 파일 **내용 전체를 한 줄로** 만들어 등록합니다(줄바꿈 포함 그대로).

### 로컬에서 바로 써볼 경우 (`.env.local`)
프로젝트 루트의 `.env.local` 파일에 두 줄 추가:
```
GSC_SA_KEY=<JSON 파일 내용 전체를 한 줄로 붙여넣기>
GSC_SITE=sc-domain:calculatorhost.com
```
> `GSC_SITE`: GSC 속성이 **도메인 속성**(calculatorhost.com)이면 위처럼 `sc-domain:` 접두.
> URL 접두 속성이면 `https://calculatorhost.com/` 전체 주소.

### 매주 자동 실행(Phase 2 cron)까지 원하면 (GitHub Secrets)
GitHub repo → **Settings → Secrets and variables → Actions → New repository secret**
- Name: `GSC_SA_KEY` / Secret: JSON 한 줄
- Name: `GSC_SITE` / Secret: `sc-domain:calculatorhost.com`

## 4단계 — 테스트

```bash
npm run gsc        # 데이터 수집 + 기회 리포트 생성
```
- 성공하면 `.claude/reports/gsc-opportunities.md` 에 "밀어야 할 페이지 Top N"이 생깁니다.
- 자격증명 없이 로직만 보려면: `npm run gsc:pull -- --mock && npm run gsc:report`

---

## 자주 나는 오류
| 증상 | 원인 / 해결 |
|---|---|
| `토큰 교환 실패 401/400` | JSON 키 깨짐 — 한 줄로 정확히 붙여넣었는지 확인 |
| `GSC 조회 실패 403` | 2단계(사용자 추가) 누락 — 서비스 계정 이메일을 GSC에 추가했는지 |
| `GSC 조회 실패 404` | `GSC_SITE` 형식 오류 — 도메인 속성은 `sc-domain:` 접두 필수 |
| 데이터 0행 | 정상일 수 있음(신생·소량). 기간 늘리기: `npm run gsc:pull -- --days 90` |

## 보안 메모
- JSON 키 = 비밀. `.env.local`·GitHub Secrets 에만. 코드·커밋·채팅 금지.
- 이 키는 **읽기 전용**(제한됨 권한)이라 사이트를 바꾸지 못합니다(조회만).
- 노출 의심 시: 구글 클라우드 → 서비스 계정 → 키 삭제 후 재발급.
