# 물가 안내글: 가정 계산과 CPI 환산 구분

## 범위와 보존

운영 기준 `9c851470d4f2ebcfd7a53fc73ecdd286a27d6664`에서 별도 로컬 브랜치 `codex/inflation-guide-clarity-2026`로 작업했다. 변경 대상은 `/guide/inflation-money-value-2026/` 한 페이지, 해당 URL의 수정일 manifest, 이 보고서다. 계산 산식·상수·API·금융 snapshot·홈·다른 안내글·분석 설정은 변경하지 않았다. 이번 교정본은 push·PR·배포하지 않는다.

원본 `D:\Bibe-Code\00 Website\03 calculatorhost`와 원격 main은 마지막 읽기 확인에서 모두 `9c851470`이었다. 원본의 미추적 `.agents`, `.codex`, `.playwright-mcp`, `AGENTS.md`, 기존 보고서 7개를 보존했다. GitHub의 기존 10개 workflow는 실제 조회에서 모두 `disabled_manually`였다.

## 변경 이유와 내용

- 제목·설명·H1·FAQ·본문을 미래 동일 물건의 필요 금액(곱셈), 보유 잔액의 오늘 기준 구매력(나눗셈), 별도 조회한 CPI의 역사적 비용 환산으로 구분했다. 이 계산기는 실제 CPI나 날짜별 통계를 자동 제공하지 않는다고 명시했다.
- 확인되지 않은 2016~2026 누적 통계, 품목별 상승률 범위, 보수적 추천값, 공식 최신 비율 자동 제공 주장을 제거했다. CPI 100→120은 날짜 없는 가상 지수라고 명시했다.
- 기존 모든 href를 보존하며 물가 계산기 카드 1개를 첫 핵심 설명 직후로 이동했다. URL에 금액·기간·비율을 전달하지 않는다. 일반 Link를 사용하고 분석 이벤트 대상을 확장하지 않았다.
- 연 3%·20년·현재 월 생활비 300만원의 예시를 약 542만원으로 교정했다. 투자 예시는 수익·물가 일정, 세금·수수료 제외, 추가 입출금 없음 및 표시값 반올림 조건을 명시했다. 모든 예금·적금이 복리라는 주장과 관련 도구가 실질 수익을 자동 산출한다는 표현을 교정했다.
- 작성일 2026-06-16은 유지하고 실질 교정일 2026-10-01을 Article/WebPage·OG·본문에 적용했다. manifest는 이 URL 1개만 갱신했다. 모바일의 표 가로 스크롤과 본문 폭을 처리했다.

공식 근거: [한국은행 물가안정목표](https://www.bok.or.kr/portal/main/contents.do?menuNo=200291)의 2019년 이후 CPI 상승률 2%는 정책 목표이며 미래 예측이 아니다. 역사적 비용의 CPI 비율 환산 설명은 [영란은행 공식 계산 설명](https://www.bankofengland.co.uk/monetary-policy/inflation/inflation-calculator)과 대조했다. 한국의 실제 비교 값은 [KOSIS](https://kosis.kr)에서 같은 계열·기준연도·기간 기준으로 별도로 확인해야 한다. 새 실제 CPI 수치를 만들어 등록하지 않았다.

## 실행한 검증

- 단위 테스트: 68개 파일, 1,284개 통과. typecheck와 lint 통과.
- 실제 `npm run build`: prebuild/build/postbuild 성공, 정적 경로 503개. 외부 네트워크·비공개 파일 읽기를 차단한 build guard 9개 기록에서 외부 요청/비공개 읽기 시도 모두 0. 데이터 동기화·발행을 수행하지 않았다.
- 현재 운영 기준에서 캡처한 435개 URL의 최종 export를 대조했다. URL/canonical/index 유지, metadata·JSON-LD 및 manifest 변경은 대상 안내글 1개뿐이며 다른 페이지와 허브 ItemList는 동일하다. FAQ 6개는 보이는 본문과 JSON-LD가 일치한다.
- Chrome 격리 프로필, 외부 분석·광고 차단 및 모든 사이트 요청을 로컬 out으로 대응한 검사 10개 통과: 320/360/390/1440px 레이아웃·48px 이상 단일 상단 링크, 계산기 이동, 세 모드 값, 뒤로가기 후 입력 보존, JavaScript 미사용 링크, runtime 오류 0. 320/1440px 이미지를 실제 눈으로 확인했다.
- 독립 BigInt 유리수 검산: 2/3/4% × 5/10/20년의 표 9개 일치. 100만원·3%·10년의 실제 함수 결과는 미래 필요 1,343,916원, 나머지 두 구매력 모드 744,093원. 생활비 예시 541.833만원→542만원, 투자 예시 명목 1,629만원·오늘 구매력 1,212만원·10년 누적 실질 21.2% 일치. 계산 함수는 변경하지 않았다.
- 공개 HTML 444개 본문·metadata·접근성 속성·JSON-LD에서 사용자가 제거를 요청한 작성도구 관련 표현 0회. `git diff --check` 통과. 별도 읽기 SEO 검토의 실제 실패 0건.

증거는 저장소 밖 `../preview-evidence/inflation-guide-*`에 보존한다. `inflation-guide-before.json`, `inflation-guide-export-qa.json`, `inflation-guide-browser-qa.json`, `inflation-guide-public-copy.json`, build/unit/typecheck/lint 로그 및 모바일/데스크톱 로컬 이미지가 있다. 이전 배포 검증 증거를 덮어쓰지 않았다.

## 잔여 검사와 측정 한계

기존 `check-guide-quality`는 교정 전 red(작성도구 표기·목적 태그), 교정 후 red(작성도구 표기 요구만)다. 사용자의 공개 문구 제거 지시와 충돌하는 규칙을 만족시키기 위해 표기를 되살리거나 검사 자체를 변경하지 않았다. 이 red를 전체 테스트 통과로 감추지 않는다. 목적 태그는 내부 주석 1개로 기록했다.

가설 근거는 이미 저장된 Aug31~Sep28의 29일 GSC 자료에서 이 안내글 52노출·0클릭·평균 순위 약8.54였다는 점이다. 최신 성과, 쿼리의 페이지 귀속, 이 교정의 클릭·수익 효과는 입증되지 않았다. 최신 계정 확인은 운영 담당 대화에서 별도로 진행한다. 이번 일반 Link의 클릭은 `guide_calculator_open` 대상이 아니므로 해당 이벤트로 이 페이지의 전환율을 측정했다고 주장하지 않는다.

## 분석 이벤트 읽기 진단과 최소 수신 확인

코드의 공개 GA 측정ID는 `G-JTG3NSZY8T`이며 production export에서만 PublicServices를 포함한다. 런타임 호스트도 정확히 `calculatorhost.com`이어야 한다. 외부 gtag 스크립트가 로드되어 함수가 준비된 뒤 이벤트가 가능하며, 준비 전 사용자 클릭은 재시도 큐가 없어 누락될 수 있다. 소스에 별도 Consent Mode 기본 동의/거절 조건은 발견하지 않았다. 브라우저 정책·확장·실제 계정 필터는 이 코드 읽기로 확인되지 않는다.

`calculator_complete`는 자동 결과 갱신이 아닌, 유효한 입력 상태에서 ‘결과 확인’을 누를 때 송출한다. `guide_calculator_open`은 프리랜서 비교→연봉/프리랜서와 세금 허브→취득세/재산세/양도세의 명시적 클릭 5개에 한정된다. 두 이벤트는 고정 slug·금액 없는 page_location·빈 referrer만 담고 입력값·query/hash를 보내지 않는다. 기존 로컬 harness의 stub 캡처는 GA 실제 수신 증거가 아니다.

설정 변경 없이 확인하는 최소 절차:
1. 기존 GA4 속성의 웹 데이터스트림에서 측정ID가 `G-JTG3NSZY8T`인지 읽기 확인한다. [Google의 스트림 ID 확인 절차](https://support.google.com/analytics/answer/9304153?hl=en)를 따른다.
2. 일반 Chrome에서 query/hash 없는 프리랜서 비교 안내글을 1회 열고 스크립트 로딩을 기다린 다음 프리랜서 계산기 연결 1회, 유효한 기본 입력에서 ‘결과 확인’ 1회를 누른다. 광고를 클릭하지 않는다.
3. Network에서 g/collect의 tid와 en 두 이름만 확인하고 cookie/client_id/전체 요청을 저장하지 않는다. 기존 GA4 Realtime에서 두 이름 수신을 대조한다. Google은 수집 시작에 최대 30분이 걸릴 수 있다고 안내하며 Realtime 확인을 권한다. HTTP204만으로 계정 수신을 확정하지 않는다. 수동 gtag 호출·debug 주입·반복 트래픽은 수행하지 않는다.

기존 API 404·법령 출처 레지스트리 잔여·실제 광고 노출/계정 수신·Google Rich Results Test는 이번 한 페이지의 로컬 교정 밖이다. 사이트 전수 법률 인증이나 유입/수익 보장을 의미하지 않는다.


## 운영 GA 교정과 로컬 릴리스 통합 검증 (2026-10-01 15:10 UTC)

운영 기준점은 e191802fc36dec744a07e3013ea77679ab2a48bc이며, 별도 로컬 브랜치 codex/release-inflation-guide-2026에서 안내글 승인본 9f6e78c49124c6a98cb86a14fbb314fc082b16f5를 충돌 없이 cherry-pick한 코드 커밋은 49d9733b9aec5de65fa419f311753384dc37679c이다. 안내글 파일은 승인본과 동일한 Git blob(a2f66d70cab4790817892d33d29a99b52eef87c0)이고 PublicServices.tsx는 운영 e191802와 동일한 blob(e5ea444320f2c7530da02fee3cb24ba7d9cee915)이다. 운영 대비 변경은 기존 안내글 한 페이지, 해당 manifest 수정일, 이 보고서뿐이다. 계산식·신규 글·API·계정 설정은 변경하지 않았다.

- 기존 운영 GA 교정본의 전체 단위 테스트 69개 파일·1,292개 통과 결과를 재사용했다. 통합 후 영향 범위 단위 테스트 4개 파일·59개를 새로 실행해 모두 통과했으며 typecheck와 lint도 통과했다.
- 통합 후 실제 npm run build의 prebuild/build/postbuild가 종료 코드 0으로 완료됐다. 정적 경로 503개 생성, 이번 build guard 9개 모두 외부 요청과 비밀 .my 파일 읽기 시도 0건이다. 기존 자동화나 데이터 동기화를 실행하지 않았다.
- 새 export를 운영 e191802 기준 산출물과 비교했다. sitemap 435개 URL·canonical·index를 보존하고 metadata/JSON-LD 및 lastmod 변경은 안내글 한 URL에만 있다. FAQ 6개는 공개 본문과 구조화 데이터가 일치하며 다른 페이지 메타는 동일하다.
- 별도 Chrome 격리 프로필의 로컬 산출물 검사 10건 통과: 320/360/390/1440px 레이아웃, 단일 48px 이상 계산기 링크, 세 모드 결과, 뒤로 가기 후 입력 보존, JavaScript 비활성 링크, runtime 오류 0건. 320/1440px 스크린샷을 직접 확인했다.
- 실제 공개 Google 태그 fixture를 사용하되 모든 요청을 로컬로 응답한 GA 검사 5건 통과: page_view, 기존 프리랜서 안내글 클릭, 유효 결과 버튼 이벤트, 금융 입력·query/hash·referrer 미전송, localhost 외부 태그 억제. 실제 GA 수집 서버에 보낸 요청은 0건이다. 물가 안내글 링크는 기존 이벤트 allowlist를 확장하지 않았다.
- 공개 HTML 444개에서 본문·검색/공유 메타·aria/alt/title·JSON-LD의 삭제 대상 작성도구 언급은 모두 0건이다. 내부 기술 식별자나 URL을 임의 삭제하지 않았다.

부모가 13:15 UTC 실제 GA 계정에서 guide_calculator_open 1회, calculator_complete 1회, page_view 2회를 확인했다. 앞 절의 실제 수신 미확인 상태는 이 확인으로 해소되었다. 이는 검증용 정상 사용 트래픽이며 유입·검색 순위·수익 개선 성과를 뜻하지 않는다. 앞 절의 안내글 품질 검사 작성도구 표기 요구와 사용자 삭제 지시 충돌, 기존 API/법령 검증 한계는 그대로 구분한다.

새 근거는 저장소 밖 preview-evidence의 inflation-guide-release-before.json, inflation-guide-release-export-qa.json, inflation-guide-release-browser-qa.json, inflation-guide-release-ga-qa.json, inflation-guide-release-public-copy.json 및 동일 접두사의 build/unit/typecheck/lint 로그와 화면 이미지에 보존했다. 기존 검증 파일은 덮어쓰지 않았다.

이 단계에서는 원격 push·운영 배포·원본 D: 폴더 통합을 수행하지 않았다. 원본 폴더와 원격 main은 e191802 기준으로 보존하며 기존 미추적 사용자 파일, 안내글 원본 브랜치, 다른 미배포 API/홈 데이터 브랜치를 유지한다. GitHub 자동화 10개 OFF를 변경하지 않았다. 별도 로컬 릴리스는 검토용이며 운영 반영은 다음 지시 전까지 보류한다.
