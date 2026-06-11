# GSC 자동 연결 셋업 (운영자 1회)

> 목적: Google Search Console 실적을 Claude가 **스크린샷 없이 직접 읽고** 기회 리포트를 자동 생성.
> ⚠️ 다운로드 파일(JSON)·토큰은 **비밀번호급 비밀**. 코드·커밋·채팅에 절대 붙여넣지 마세요. (모두 gitignore 처리됨)

---

## ✅ 권장: OAuth (본인 구글 계정) 방식

서비스 계정은 GSC가 새 계정을 잘 안 받아주는 벽이 있어, **본인 계정(GSC 소유자)으로 직접 인증**하는 이 방식이 확실합니다.

### 1단계 — OAuth 동의 화면 만들기 (구글 클라우드, 같은 프로젝트 `calculatorhost-gsc`)
1. https://console.cloud.google.com → 상단 프로젝트가 `calculatorhost-gsc` 인지 확인
2. 좌측/검색에서 **"OAuth 동의 화면"** (또는 "Google 인증 플랫폼") 열기
3. User Type **외부(External)** 선택 → 만들기
4. 앱 이름 `calculatorhost-gsc`, 사용자 지원 이메일·개발자 이메일에 본인 이메일 입력 → 저장하고 계속
5. 범위(Scopes)는 **그냥 저장하고 계속** (안 건드려도 됨)
6. **테스트 사용자**에 **본인 이메일(kjh791213@gmail.com) 추가** → 저장
   > 게시 상태는 "테스트" 그대로 둬도 됩니다.

### 2단계 — OAuth 클라이언트 ID 만들기
1. **"사용자 인증 정보" → "+ 사용자 인증 정보 만들기" → "OAuth 클라이언트 ID"**
2. 애플리케이션 유형: **데스크톱 앱** 선택 → 만들기
3. 만들어진 클라이언트의 **"JSON 다운로드"** 클릭 → 파일 받기
4. 받은 JSON 파일 **이름을 `gsc-oauth-client.json` 으로 바꿔** 프로젝트 루트 폴더(package.json 있는 곳)에 넣기
   > 이 파일명은 gitignore 처리됨(실수로 커밋 안 됨).

### 3단계 — `.env.local` 정리
프로젝트 루트의 `.env.local` 에 두 줄(이전 GSC_SA_KEY 줄은 지워도 됨):
```
GSC_OAUTH_CLIENT_FILE=gsc-oauth-client.json
GSC_SITE=sc-domain:calculatorhost.com
```
> `GSC_SITE`: 도메인 속성이면 `sc-domain:` 접두, URL 속성이면 `https://calculatorhost.com/` 전체.

### 4단계 — 인증 (브라우저 "허용" 1회)
- 여기까지 되면 **"됐어"** 라고만 하세요. Claude가 `npm run gsc:auth` 를 실행하면
  **브라우저가 열립니다** → 본인 구글 계정 로그인 → **"확인되지 않은 앱" 경고**가 나오면
  **고급 → calculatorhost-gsc(으)로 이동(안전하지 않음)** → **허용** 클릭.
- 직접 하시려면 터미널에서 `npm run gsc:auth` 실행.
- 완료되면 `gsc-oauth-token.json` 이 생기고, 이후 `npm run gsc` 로 실적이 들어옵니다.

---

## (대안) 서비스 계정 방식
GSC "사용자 추가"가 되는 경우만. 서비스 계정 JSON 다운로드 → `gsc-sa-key.json` 으로 루트에 두고
`.env.local` 에 `GSC_SA_KEY_FILE=gsc-sa-key.json` + `GSC_SITE=...`. 그 뒤 GSC 설정 → 사용자 및 권한 →
서비스 계정 이메일을 "제한됨(읽기)"으로 추가(새 계정은 등록까지 시간이 걸려 실패할 수 있음).

---

## 테스트 / 오류
```bash
npm run gsc        # 수집 + 기회 리포트 → .claude/reports/gsc-opportunities.md
```
| 증상 | 해결 |
|---|---|
| `refresh_token 미발급` | 이미 승인한 적 있음 — 구글 계정 보안 → 타사 앱 액세스에서 해제 후 `npm run gsc:auth` 재시도 |
| `OAuth 토큰 갱신 실패` | 약 1주일 뒤(테스트 모드 토큰 만료) — `npm run gsc:auth` 한 번 더 |
| `403 권한 없음` | `GSC_SITE` 가 본인 소유 속성인지 확인 (도메인이면 `sc-domain:`) |
| 데이터 0행 | 정상일 수 있음 — 기간 확대: `npm run gsc:pull -- --days 90` |

## 보안
- `gsc-oauth-client.json`, `gsc-oauth-token.json`, `gsc-sa-key.json` 모두 gitignore. 채팅에 붙여넣지 말 것.
- 이 권한은 **읽기 전용**(webmasters.readonly) — 사이트를 바꾸지 못하고 조회만 합니다.
