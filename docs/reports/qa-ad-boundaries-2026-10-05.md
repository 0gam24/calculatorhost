# QA 요청 격리와 광고 제외 경계

## 문제와 교정

일반 E2E의 외부 요청 관찰만으로는 광고·분석 전송을 예방할 수 없었다. 공통 자동 fixture를 모든 E2E/visual suite에 연결했다. loopback HTTP만 허용하고 외부/POST/서비스워커/소켓을 차단한다. 데이터 API는 503 mock으로 대체한다. 브라우저 로컬 응답은 redirect를 따라가지 않고 3xx를 차단하며, 별도 API 요청도 허용 origin/static GET만 사용하고 redirect를 따르지 않는다. 차단 기록은 query/body를 포함하지 않고 고정 시험 경로 외 pathname도 숨긴다.

기존 lazy 예약은 제외 경로 진입 후에도 실행될 수 있었다. 앱이 취소 가능한 load/idle/timer 대기를 관리하고 실제 hostname/path/robots를 다시 확인한 뒤 고정 ID/src의 Next Script를 한 번 로드한다. 알려진 광고 허용/제외 경계는 새 문서로 이동한다. SPA/history로 우회하거나 목적지 noindex가 늦게 확인된 경우, 이미 시작된 라이브러리가 있으면 현재 문서를 한 번 교체한다. Google 광고 DOM을 숨기거나 삭제하지 않는다. fresh 제외 문서에는 광고 loader가 없어 교체 루프도 없다.

계산기 사이 SPA와 비공개 값 전달, SSR `google-anno-skip`, GA/Naver 기존 개인정보 조건을 보존했다. 수익 표면은 계산기 사용성과 정책 안전, QA로 인한 광고/분석 오염 예방이다. 슬롯/대시보드/계정/산식/API 데이터 변경은 없다.

## 검증

- 단위 79파일/1,618건, typecheck/lint 통과.
- 실제 production `npm run build` prebuild/build/postbuild 통과. 503 정적 페이지; 외부 네트워크와 비공개 파일 읽기 차단 아래 검증.
- QA 네트워크·검색 경계 19건 통과. 수신 서버의 first-navigation/fetch/image/iframe/beacon/socket/redirect 수신 0건. 일반 QA에 production 주소를 넣으면 브라우저 생성 전에 거절.
- premium 74건 중 72건 최초 통과. 실패 2건은 현재월의 기존 9월 고정 기대값이었다. 브라우저 현재월로 기대를 교정하고 두 환경 재검증 통과; 앱은 변경하지 않았다.
- 증여세/물가 6건, offline 광고 라이브러리 수명주기 9건, 계산기 문서/입력 경계 13건 통과. 운영 주소를 가상 hostname으로 쓰는 offline 검사도 모든 요청을 로컬 fulfill/abort했다.
- 과거 관련 QA helper 4개는 저장소 밖 작업본에서 local-only/SW 차단으로 보완. 홈/급여/대출/취득세 helper 재검증 통과.

## 배포·한계

배포 직전 기준은 `735cc52a7ed880cc15af95894ec9fbf563c0433a`, 정상 deployment `1dda46c2-abcc-48b8-a27a-4fce4adf45b5`다. 이 교정은 하나의 commit으로 main에 fast-forward하고 기존 Cloudflare Git 배포만 사용한다. 10개 GitHub workflow는 OFF를 유지한다. 문제가 생기면 교정 commit을 revert하거나 직전 정상 deployment로 복구한다.

검사 중 실광고/실분석 코드는 실행하지 않았다. 실제 광고 fill/auction/내부 refresh/현장 CLS/수익 영향은 이 mock 검사로 판단하지 않는다. 배포 SHA와 production HTTP/격리 브라우저 결과는 저장소 밖 `../preview-evidence/qa-boundaries-*` 최종 보고에 기록한다. 실제 광고 확인은 기존 독립 사용자 브라우저에서 수행해야 한다.
