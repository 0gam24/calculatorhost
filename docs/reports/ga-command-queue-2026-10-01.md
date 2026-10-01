# Google 태그 명령 큐 교정: 로컬 인과 검증과 배포 차단

## 상태와 범위

운영 기준 `9c851470d4f2ebcfd7a53fc73ecdd286a27d6664`에서 `codex/ga-command-queue-2026` 별도 로컬 브랜치로 작업했다. 변경은 PublicServices의 gtag 큐 형식, 회귀 테스트 8개, 이 보고서다. 초기화 시점·동의·측정ID·개별 이벤트 payload·광고·Naver·계정 설정을 변경하지 않았다. push·PR·배포하지 않는다.

물가 안내글의 미배포 `9f6e78c49124c6a98cb86a14fbb314fc082b16f5`는 `codex/inflation-guide-clarity-2026`에 별도로 보존했다. 이번 브랜치에는 포함하지 않았다. 원본 D: 폴더, 기존 미추적 사용자 파일, 자동화 10개 OFF 상태를 변경하지 않았다.

**큐 형식의 오류는 로컬에서 인과관계가 입증됐지만, 교정으로 활성화되는 자동 사이트 검색 이벤트의 입력 문자열 수집 위험이 발견되어 배포 준비 완료 상태가 아니다.**

## 운영 관찰과 원인 재현

운영 안내글을 격리된 headless Chrome에서 한 번 관찰했을 때 문서와 gtag.js는 HTTP200, gtag 함수·js/config/page_view 명령은 존재했으나 GA 수집 요청은 없었다. 초기 HTML의 외부 script 부재는 afterInteractive 클라이언트 삽입으로 설명되며, 실제 DOM에서는 태그가 로딩됐다. CSP는 Report-Only였다. 이 관찰은 광고·Naver·Cloudflare Insights를 차단하고 GA 호스트를 허용했으며, 실제 클라우드 브라우저의 필터/동의 상태까지 검증한 것은 아니다.

이후 Google의 공개 정적 라이브러리를 읽어 로컬 fixture로 제공했다. 모든 브라우저 요청은 route에서 로컬 응답했고 실제 수집 서버에 전달한 요청은 0이다. 동일한 라이브러리·브라우저·측정ID·config·page_view 명령에서 큐 형식과 초기화 시점을 비교했다.

| 큐 형식 | 라이브러리 기준 초기화 | 로컬에서 가로챈 page_view 수집 요청 |
|---|---|---:|
| 일반 Array | 로딩 후 | 0 |
| 일반 Array | 로딩 전 | 0 |
| Arguments 객체 | 로딩 후 | 1 |
| Arguments 객체 | 로딩 전 | 1 |

각 경우 runtime 오류 0. Arguments 두 경우에는 자동 scroll 요청도 생성됐지만 모두 로컬204 응답으로 처리했다. 초기화 시점이 같아도 큐 형식만 바꾸면 결과가 달라졌다. 라이브러리 SHA256: `f281fa18883c2510e96b1bfabe720a3fcdf5baa9755949f6138c0bd1a268549a`.

최소 교정은 `dataLayer.push([command, ...args])`를 [Google 공식 구현](https://developers.google.com/tag-platform/gtagjs)의 `function () { dataLayer.push(arguments); }`로 바꾸는 것이다. 기존 onLoad 시점과 config 옵션은 유지했다. 실제 Google 라이브러리를 실행하지 않고 gtag 호출만 캡처했던 기존 harness는 명령 처리 단계의 오류를 확인할 수 없었다.

## 실행한 검증

- 새 컴포넌트 회귀 검사 8개 통과: 실제 Arguments 객체, js/config/event 순서, 기존 큐·동의 객체 보존, 추가 consent default 없음, 동의 update 전달, query/hash/금액 없는 수동 payload, preview 호스트 차단, 광고/Naver 제외 조건 보존. 외부 fetch 호출 0.
- 전체 단위: 69파일/1,292개 통과. typecheck·lint 통과.
- 실제 npm prebuild/build/postbuild 성공, 정적 경로 503개. build guard 9개에서 외부 요청·비공개 읽기 시도 0. 데이터 동기화·발행 없음.
- 435개 URL 및 모든 페이지의 metadata/JSON-LD·manifest가 운영 기준 캡처와 동일함을 확인했다. 공개 HTML444개에서 사용자가 제거한 작성도구 관련 표현 0.
- 컴파일된 앱과 실제 Google 라이브러리를 전부 로컬로 제공한 5개 브라우저 검사 중 4개 통과, 1개 실패. 정상 page_view 처리, 지정 안내글 클릭의 guide_calculator_open 1개, 유효 기본 입력의 결과 버튼 calculator_complete 1개, localhost 태그 차단은 통과했다. 개인정보 관련 자동 측정 검사는 아래 이유로 실패했다. 이를 전체 통과로 표시하지 않는다.

## 구체적인 배포 차단: 자동 사이트 검색

격리 테스트의 초기 URL에는 가짜 `keyword=fixture-search`와 query/hash sentinel을 넣었다. 수동 page_view·가이드·계산 완료의 page_location은 query 없는 canonical이고 referrer도 빈 값이었다. 프리랜서 기본 수입액이 custom 이벤트에 들어가는 현상은 발견하지 않았다.

하지만 Google 자동 이벤트 `view_search_results`는 `keyword`에서 테스트 문자열을 읽어 `ep.search_term`에 담았다. 수동 이벤트용 URL 정제만으로 자동 측정의 검색 문자열까지 보호되지 않는다는 실제 처리 결과다. 실제 Google 수집 서버에는 전달하지 않았고 cookie/client_id/전체 요청 본문을 증거에 저장하지 않았다. 민감한 검색어·값이 query에 들어올 때 동일 경로로 수집될 수 있으므로 차단사항이다.

[Google 향상된 측정 공식 설명](https://support.google.com/analytics/answer/9216061?hl=en)은 사이트 검색을 URL의 q/s/search/query/keyword로 감지하여 search_term을 수집한다고 명시한다. 기존 웹 스트림의 사이트 검색 ON 여부와 추가 수집 query 매개변수를 계정에서 읽기 확인해야 한다. 이 테스트에서 사용하는 현재 공개 태그 설정에는 해당 자동 측정 동작이 활성화되어 있다.

최소 대응 후보는 기존 스트림의 자동 사이트 검색 옵션을 끄는 것이다. 그러면 사이트의 검색 사용 여부는 기존 고정 slug 이벤트로 계속 측정하고 사용자가 입력한 검색 문자열은 수집하지 않을 수 있다. 그러나 이번 지시는 계정 설정 변경을 허용하지 않아 실행하지 않았다. 문서로 입증되지 않은 gtag config flag 추가, 전체 query 제거, 브라우저 fetch/sendBeacon 변경 같은 우회는 하지 않았다. 다른 자동 측정의 link_url/form_destination과 실제 동의 적용도 다음 검증에서 함께 확인할 필요가 있다.

계정 옵션을 조정하거나 동등한 보호를 검증한 후, 이 실패 fixture를 그대로 다시 실행해야 한다. 검색 매개변수를 테스트에서 빼서 통과시키지 않는다. 이번 코드의 기능적 성공만으로 바로 배포해서는 안 된다.

## 증거와 남은 한계

저장소 밖 `../preview-evidence/`에 `ga-production-once-observation.json`, `ga-queue-offline-ab.json`, `ga-compiled-offline-qa.json`, `ga-queue-export-qa.json`, `ga-queue-public-copy.json`, unit/typecheck/lint/build 로그를 보존했다. 공개 라이브러리 fixture도 저장소 밖에 보존하며 의존성이나 배포 산출물에 추가하지 않는다.

실제 GA 계정 수신·클라우드 환경 필터는 미확인이다. 계정 수신 부재만으로 코드 오류를 확정한 것이 아니라, 동일 조건 A/B와 컴파일된 앱의 처리 단계로 큐 오류를 입증했다. 운영에 반영하기 전 자동 측정의 개인정보 위험을 해결하고, 이후 정상 사용 1회에 한해 실제 수신을 확인해야 한다. 초기 로딩 전 클릭이 측정되지 않는 기존 조건도 유지된다.
