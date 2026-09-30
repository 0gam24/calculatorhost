# Calculatorhost 개편 검증 인계

2026-09-30 검증 완료 개발본이다. 운영 배포·main 병합·푸시·자동화 재활성화는 하지 않았다.

## 작업 위치와 기준

- 원본: `D:\Bibe-Code\00 Website\03 calculatorhost`. 기존 untracked 지침·감사 파일을 보존했으며 tracked 파일을 수정하지 않았다.
- 격리 clone: `C:\Users\Necon\Documents\Codex\2026-09-30\task\calculatorhost-preview`.
- 로컬 브랜치: `codex/premium-calculators-2026`.
- HEAD와 직접 확인한 원격 main: `e90d279200f5aefb9cd5df672e14662dfed5a261`.
- 로컬 `origin/main` 캐시만 `d81973f`에 남아 있다. 현재 원격 main이 뒤처졌다는 뜻이 아니다.
- 구현 변경은 미커밋 상태다. 운영 상태 파일·GitHub workflow 정의·기존 PR은 변경하지 않았다. Draft PR과 외부 미리보기 URL은 미생성이다.

## 구현 범위

31개 경로에 공통 목적·입력·결과·근거 배치를 적용했다. DTI 설명 페이지에는 독립 비율 계산 기능을 추가했다. 홈은 검색, 인기 6개, 목적별 흐름 3개, 전체 31개 목록으로 정리했다. 입력은 16px, 보이는 계산 컨트롤은 최소 48px이며 모바일은 입력 다음 결과, 데스크톱은 병렬 배치다. 고급 조건·결과 상세·상환표·산식·FAQ·공유를 접고 핵심 결과 하나와 보조 수치 최대 세 개를 보인다.

공통 숫자 입력은 소수점·빈값·0·범위 오류를 구분한다. 원/만원 및 대출 년/개월 전환은 금액과 실제 기간을 보존한다. 같은 탭의 입력 복원, 결과 복사, 키보드 사용을 구현했다. 연봉 결과에서 사용자가 저축액을 직접 정한 뒤 버튼을 눌러 그 값 하나만 적금으로 전달한다. 다른 목적 링크는 독립 계산기로 이동하며 임의의 재무 가정을 자동 전달하지 않는다.

2026년 급여 보험료·국민연금 적용월 및 상하한, 공유 자녀세액공제, 자녀장려금 소득/재산 구간을 교정했다. 첫 방문 급여 적용월은 현재 월이며 선택월은 같은 탭에서 보존한다. 2026-09-30에는 9월이 기본이다. 급여 화면·예시·복사·다음 단계 참고 금액은 계산 함수의 원 단위 값을 그대로 표시한다. 실제 간이세액표 직접 조회라는 표현을 제거했다. 공식 근거와 제한은 [ADR015](../adr/015-2026-social-insurance-and-benefit-corrections.md), [산식 조사](formula-audit-2026-09-30.md)에 있다.

필수 Next static asset 차단을 제거했다. sitemap URL 435개를 보존하면서 파일 mtime/빌드 시각 대신 Git 기록과 명시적 수정일을 사용한다. 임베드 출처는 브랜드 표기로 바꾸고 nofollow를 기본으로 하며 선택 가능하다. 검색 선택·계산 확인·다음 도구 이벤트에는 허용된 계산기 slug만 전달한다. 금액·검색어는 URL이나 이 이벤트 payload에 넣지 않는다. 로컬 미리보기에는 GA·Naver·AdSense를 로드하지 않는다.

## 실제 최종 검사

| 검사 | 결과 |
| --- | --- |
| `node node_modules/vitest/vitest.mjs run --reporter=json --outputFile=../preview-evidence/unit-results.json` | 62개 파일, 1,093개 통과, 실패 0 |
| `node node_modules/next/dist/bin/next lint` | 경고·오류 없음. Next lint 폐기 예정 안내만 있음 |
| `node node_modules/typescript/bin/tsc --noEmit` 및 최종 빌드 타입 검사 | 통과 |
| `node node_modules/next/dist/bin/next build` | 통과, 정적 페이지 503개 |
| `node node_modules/@playwright/test/cli.js test --config tests/e2e/premium-preview.config.ts` | 74개 통과, 실패·skip·flaky 0, 64.8초 |
| 31개 × 모바일/데스크톱 | 62건. 48px 컨트롤, 16px 입력, 읽기 순서, 가로 넘침, canonical, JSON-LD, 실행 오류 검증 |
| 핵심 흐름 및 적용월 | 12건. 선택 저축액 350,000원 → 무이자 12개월 4,200,000원, 뒤로가기, 단위 전환, 오류, 복사, 검색, 월 보존 |
| 연금 상한 표시 | 6월 302,575원 / 7월 313,025원, 별도 산술 기대값과 일치 |
| `git diff --check` | 통과 |

금융 모듈 검사는 위 전체 단위 검사에 포함되며 별도로 29개 파일 732개도 실행했다. UI 입력 회귀 6개도 실행했다. 수치를 더해 중복 테스트 수로 부풀리지 않는다. 기존 Vitest 설정이 제외하는 CLI 테스트 세 파일은 이번 전체 검사에도 제외되어 있다.

증거 파일: 개발본 `artifacts/premium-e2e.json`, `tests/e2e/premium-calculators.e2e.ts`, 상위 작업 폴더 `preview-evidence/unit-results.json`, `preview-evidence/31-calculator-smoke.json`, `preview-evidence/statute-comparison.json`.

브라우저는 개인 로그인 세션을 사용하지 않은 Google Chrome headless다. 정적 미리보기는 사용자 컴퓨터에서만 열리는 `http://127.0.0.1:3100`이다. 원격 사용자에게 공개한 사이트가 아니다.

## 기존 실패와 남은 확인

- 법조항 등록 validator는 원본과 수정본 모두 실패한다. 직접 비교한 미등록 위반 181개가 동일하며 추가·제거 0개다. 이전 SEO Gate 실패와 함께 별도 콘텐츠 부채로 기록한다. 법조항 오류 확정이나 트래픽 원인으로 단정하지 않는다.
- 이전 Ralph 보고서의 템플릿 문자열 문법 오류를 수정했고 `node --check`를 통과했다.
- 전체 단위 검사에서 발견한 Windows CRLF 헤더 매칭, citation CLI import, shallow Git 테스트 timeout은 각각 줄바꿈 정규화, 순수 core 분리, 해당 integration test의 30초 제한으로 수정했다.
- 더 엄격한 E2E에서 발견한 9개 경로의 작은 기존 버튼과 급여 표시의 숨은 10원 절삭을 수정하고 최종 74건을 다시 통과했다.
- 기존 E2E/visual 전체는 실행·이행하지 않았다. 일부 기존 selector와 항상 펼친 상세 기대값은 새 접기 UI와 다르다. 새 74개 검증을 기존 전체 테스트 통과라고 표현하지 않는다.
- `eslint .` 광역 검사는 작업 중 기존 scripts/functions/tests 및 임시 도구 오류를 보고했다. 프로젝트 표준 Next lint·타입 검사·빌드는 최종 통과했다. 릴리스 범위를 해당 광역 검사 정비로 확대하지 않았다.
- 실제 국세청 간이세액표·자녀장려금 산정표와 모든 법률 특례를 구현하지 않는다. 급여·장려금은 해당 가정을 표시한 추정이다. 이번에 다른 모든 계산기의 법 개정까지 새로 감사한 것은 아니다.
- 로컬 광고 iframe/분석 요청 0건과 이벤트 payload 허용목록은 검증했다. 운영 AdSense Auto ads의 실제 배치·CLS·오클릭, GA4 enhanced measurement 및 실제 수익 데이터, Naver/Search Console 현 세션은 미검증이다.

GitHub 읽기 전용 재확인에서 workflow 10개가 모두 `disabled_manually`였다. 기존 Claude 예약 작업의 클라우드 실행 상태를 별도로 인증해 조회하지 않았으며 사용자 종료 확인과 STATE 기록을 보존했다. 어떤 자동화도 재활성화하지 않았다.

## Library 화면

| 화면 | Library ID |
| --- | --- |
| 홈 | `libfile_0d701cd9b1848191abf27b6574c4d06c` |
| 모바일 연봉 | `libfile_c3de43fd3f6c81918b3edc502f6b3c5a` |
| 대출 | `libfile_2a2e1fa416b48191a78f17124df11ac0` |

Library 저장은 성공했다. Windows의 공식 업로드 helper 준비 경로가 지원되지 않아 제공된 direct create fallback을 사용했다. 공식 metadata helper는 Windows `os.setxattr` 미지원으로 실패했고, 반환 identity는 별도 JSON으로 보존했다. Library 저장 자체의 실패는 아니다.

## 운영 반영 순서 — 아직 실행하지 않음

1. 이 개발본과 남은 검증 범위를 운영자가 검토한다. 실제 광고의 입력·오류·결과 영역 제외, 운영 분석 개인정보 설정, 기존 법조항 Gate 및 기존 E2E 처리 방침을 먼저 확정한다.
2. 검토된 변경을 격리 브랜치에 커밋하고 원격 기준 재확인 후 Git 수정일 manifest를 갱신한다. 기존 자동 발행 PR·워크플로는 그대로 둔다. 표준 prebuild의 네트워크/STATE 갱신을 무심코 실행하지 않는다.
3. Cloudflare의 실제 production branch/preview 배포 설정과 현재 운영 deployment ID를 확인·보존한다. 승인된 브랜치 미리보기에서 URL 435개, 31개 계산기, 광고 배치와 최종 수동 검사를 확인한다.
4. 부모/운영자의 후속 지시 후에만 운영 반영한다. 한 변경 묶음으로 반영하여 이전 deployment 재선택 또는 해당 commit revert로 되돌릴 수 있게 한다. 자동화는 OFF를 유지한다.
5. 반영 후 실제 검색 유입, 계산 완료, 다음 도구 사용, AdSense 노출·RPM·수익을 이전 기간과 비교한다. 순위·수익 상승은 보장하지 않는다.
