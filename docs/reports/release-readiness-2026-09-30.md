# 출시 준비 점검 (2026-09-30)

이 문서는 운영 배포를 승인하거나 수행한 기록이 아니다. 원격 push·main 병합·자동화 재활성화는 수행하지 않는다.

## 보존과 통합

- 원본: `D:\Bibe-Code\00 Website\03 calculatorhost`. HEAD `e90d279200f5aefb9cd5df672e14662dfed5a261`, 추적 파일 변경 없음. 기존 `.agents`, `.codex`, `AGENTS.md`, `.claude/reports`, `.playwright-mcp`의 미추적 파일을 보존한다.
- 별도 작업본: `calculatorhost-preview`, 브랜치 `codex/premium-calculators-2026`.
- 1차 개편 로컬 커밋: `ffdac556653ee136656da545a35ca5dfa29694cc`, 124개 파일. 지침 복사본 `.agents/`, `AGENTS.md`와 생성 테스트 산출물·인증 파일은 포함하지 않았다. 실행되는 Git 훅은 없었다.
- 출시 차단 교정 로컬 커밋: `af13717`, 20개 파일. 금융 예시·허위 조문·기한후신고 표현·옛 농어촌 조건·광고/분석 초기 로드 보호와 검토 증거를 보존했다. 추가 기능·원격 push는 없다.
- 원본 통합은 이후 해당 폴더의 status와 원격 기준점을 다시 확인한 뒤 로컬 작업본을 remote로 fetch하고 별도 브랜치로 checkout하는 방식으로 진행한다. reset/clean/강제 덮어쓰기 없이 기존 미추적 파일을 유지한다. 원격 main이 바뀌면 새 기준에서 변경 충돌과 테스트를 다시 확인한다.

## 배포 경로와 실제 확인 범위

기존 GitHub CLI 인증을 이용한 읽기 전용 API 조회에서 원격 main은 여전히 `e90d279200f5aefb9cd5df672e14662dfed5a261`이었다. 워크플로 10개 모두 `disabled_manually`, `DAILY_AUTO_POST_ENABLED=false`를 확인했다. 설정을 변경하지 않았다.

Cloudflare GitHub App 체크 `109804627466`은 main의 해당 커밋에 대해 2026-09-30 08:29:09 UTC 배포 성공을 보고한다.

- 프로젝트: `calculatorhost`.
- 해당 커밋 배포 ID: `bfad91cc-cd97-4699-81a5-ab2e2f0d4418`.
- 체크가 제공한 배포 URL: <https://bfad91cc.calculatorhost.pages.dev> (**기존 화면의 배포**, 새 개편 미리보기가 아님).
- 대시보드: <https://dash.cloudflare.com/?to=/7e4ec5d0713002f29bbc8a133c15b2cd/pages/view/calculatorhost/bfad91cc-cd97-4699-81a5-ab2e2f0d4418>.
- 저장소 설정: `wrangler.toml`의 프로젝트명 `calculatorhost`, 출력 `out`. STATE에는 main push 시 Cloudflare 배포를 유지한다고 명시한다.
- GitHub deployments 목록과 repo hooks 목록은 빈 배열이었다. Cloudflare App 체크가 존재하므로 빈 목록을 배포 연동 부재로 해석하지 않는다.

현재 production alias가 이 배포를 가리키는지, 실제 production branch, preview include/exclude, build command, 기존 rollback 대상 및 권한은 대시보드/API에서 아직 확인하지 못했다. 현재 도구에는 Browser Use 및 Computer Use 필수 `node_repl`이 없고, 기존 wrangler CLI도 확인되지 않았다. 사용자 브라우저·로그인·프로필·쿠키에는 접근하지 않았다. 새 OAuth/token 생성 없이 중지한다.

후속 계정 확인은 부모가 담당한다. 부모의 클라우드 브라우저 점검에서 Cloudflare는 보안 확인이 반복되어 reload 1회 후 중단했고, AdSense는 로그인 필요 상태였다. 관리 계정 확인과 Cloudflare 배포 설정 화면을 요청한 상태다. 이 결과는 부모가 직접 확인해 전달한 것이며 이 Windows 작업에서 로그인 세션을 확인한 기록은 아니다. 보안 확인을 우회하지 않는다.

Cloudflare는 Git 연동에서 production뿐 아니라 preview branch push도 배포를 유발할 수 있다. 따라서 feature branch push도 이 설정을 확인하기 전 보류한다. 성공한 **production** 배포만 rollback 대상이며 preview 배포는 대상이 아니다.

공식 근거: [branch controls](https://developers.cloudflare.com/pages/configuration/branch-build-controls/), [rollback](https://developers.cloudflare.com/pages/configuration/rollbacks/).

## 사이트별 기존 측정 자료

원본의 비인증 보고서 `.claude/reports/gsc-latest.json`을 읽었다. 데이터의 `fetchedAt`은 `2026-09-30T01:50:39.486Z`, mock 표시 없음. 이번 점검에서 GSC API를 새로 조회하거나 토큰을 생성·갱신하지 않았다.

| 항목                      | 기존 export 결과        |
| ------------------------- | ----------------------- |
| 날짜                      | 2026-08-31 ~ 2026-09-28 |
| 페이지 행                 | 295                     |
| 페이지 합산 노출 / 클릭   | 3,125 / 14              |
| 합산 CTR                  | 0.448%                  |
| 노출 가중 페이지 평균순위 | 10.7264                 |
| 쿼리 행 / 합산 노출       | 157 / 241               |

파일은 `days: 28`이라고 표시하나 위 시작·끝 날짜 양끝을 포함하면 **29일**이다. `gsc-pull.mjs`의 시작일 `DAYS + 2`, 종료일 2일 전 계산 때문에 발생한다. 이를 엄격한 최근 28일 실측이라고 보고하지 않는다. 페이지 차원을 합산한 값은 별도 무차원 property 전체 통계와도 차이가 날 수 있다. 쿼리 합과 페이지 합의 차이만으로 검색 수요가 없거나 광고 설정이 정상이라는 결론을 내리지 않는다.

주요 기존 페이지: inflation 노출626/클릭1, four-major-insurance-rates-2026 노출79/클릭0, freelancer-salary-comparison 노출64/클릭3. 후자의 최신요율과 가정 표현을 실제 계산 코드와 대조해 우선 검토한다.

색인 총수·제외 이유, Naver 사이트 노출·클릭·수집 현황, GA4 사람 방문/페이지별 참여, AdSense 페이지별 노출·수익·RPM·coverage는 확인되지 않았다. 기존 STATE의 Naver 소유확인 미완료 추정도 이번 로그인 확인으로 확정한 사실은 아니다.

최소 필요 자료는 calculatorhost.com 속성의 동일한 완료일 기준 **28일** GSC 성과(전체·페이지·쿼리) 및 색인 보고서, Naver 사이트 보고서, GA4 hostname 필터 방문·페이지·이벤트 보고서, AdSense 사이트/URL별 광고 노출·수익·RPM·coverage와 정책 센터이다. 새 인증키나 권한 없이 기존 로그인 브라우저를 읽기 전용 제어할 도구를 연결하거나 이 보고서 export를 받으면 검증할 수 있다.

## 운영 광고와 개인정보

수동 광고 슬롯은 현재 코드에 없고 Auto Ads 스크립트가 live hostname에서만 로드된다. 로컬 미리보기 광고 0건은 운영 Auto Ads의 제외영역 설정 또는 실제 겹침을 입증하지 않는다. 운영 제외영역, page exclusions, anchor/vignette 및 GA4 enhanced measurement 설정은 미검증이므로 출시 게이트로 남긴다. 광고나 설정 적용 버튼은 클릭하지 않는다.

공식 [페이지 제외 안내](https://support.google.com/adsense/answer/9262311?hl=ko)에 따르면 제외 설정은 계정의 사이트 자동 광고 설정에서 관리한다. 현재 설정이 확인되기 전 임의 CSS 속성으로 광고 제외를 보장한다고 주장하지 않는다.

최소 코드 교정으로 임베드·정책·오류·noindex 문서의 초기 광고 로드를 제외하고, Naver 공개 스크립트가 현재 URL과 referrer를 읽는 점을 확인해 query/hash가 포함되면 로드·호출하지 않도록 했다. [광고·개인정보 검토](release-ad-privacy-review-2026-09-30.md)에 39개 관련 테스트와 초기 문서/이미 로드된 SDK의 검증 범위 차이를 기록했다. 현재 자동 광고 계정 설정을 변경했다는 의미는 아니다.

## 법령·검색 콘텐츠 정확성 검토 범위

출시 전 원본 181개 blocking 인용은 20개 가이드 파일, 25개 법명·조문 조합이었다. 별도로 pending 경고 인용 545회, 83개 조합이 있었다. scanner는 일부 법명과 `§` 표기만 검사하므로 사이트 전체 법률 정확성을 보장하는 검사가 아니다. [원본 문맥 증거](statute-context-audit-2026-09-30.json)는 교정 전 위치와 문맥을 보존한다.

실재 조문 누락, 잘못된 법명/허위 번호, 본문 설명·숫자 오류, 원문 미확보 항목을 구분한다. 미등록 조문의 실재 확인만으로 해당 글의 세율·자격·시행일·사례 계산까지 정확하다고 취급하지 않는다. 구요율을 쓰던 보험료/급여 비교 가이드, 명의신탁 납세의무, 기한후신고·환급·가산세 사례와 허위 조문 연결은 이미 존재하는 URL을 유지하면서 제한적으로 교정한다.

보험료 예시 검증 중 월 300만원×0.9%의 부동소수점 절사로 고용보험이 26,999원으로 계산되는 오류를 발견했다. 중앙 상수의 천분율을 정수 연산에 사용하여 27,000원이 되도록 보완한다. 신규 기능이나 모든 보험료 함수의 재작성은 하지 않는다.

[법령 분류 보고서](statute-context-audit-2026-09-30.md)에 25개 조문 조합의 검증 수준과 문맥별 위험을 정리했다. 공식 조문이 실재하는 22개 조합(177회), 공식 본문 미확보 3개 조합(4회)을 구분했으며, 실재 확인을 문장 전체의 정확성 인증으로 취급하지 않았다. pending 545회 중 확인된 잘못된 법명/조번호 3개 조합 5회 및 기존 verified 목록의 허위 조문도 정정했다.

현재 statute CLI는 여전히 **exit 1: blocking 183회/25개 조합, pending 541회/79개 조합**이다. 원본 대비 차단 발생 수의 유일한 변화는 `조세특례제한법 §30의6`의 11→13회다. 잘못된 법명을 올바르게 정정한 인용이 이 조합에 추가됐고 해당 조문은 여전히 일괄 등록하지 않았다. 숫자 증가는 새로운 잘못된 산식 2개를 의미하지 않는다. 공식 원문과 수정 문맥을 검증한 상증법4의2와 국세기본법45의3만 제한 등록했으며, 미검증 조문을 일괄 등록해 실패를 숨기지 않았다. 회사사택 비과세 근거, 상속재산과 민사상 고유재산의 구분, 가업승계/투자공제의 남은 적격조건 등은 별도의 내용 검토가 필요해 출시 차단을 유지한다. 농어촌주택의 옛 660㎡ 확정조건은 해당 문서에서 제거하고 취득시점 법령 확인 안내로 교정했다.

## 교정 후 실행한 검증

- 전체 Vitest: **63개 파일, 1,133개 통과**, 실패/skip 0. `../preview-evidence/release-unit-results.json`.
- 전체 `tsc --noEmit`: exit0.
- Next lint: exit0, 오류·경고 없음.
- 코드 커밋 후 Git 수정일 manifest를 수동 재생성했다. **435개 경로 키를 그대로 보존**, 날짜 형식 모두 유효, 실제 변경된 42개 항목만 갱신했다. 자동 prebuild의 데이터 동기화와 STATE 갱신은 실행하지 않았다.
- 최초 Vitest sandbox 실행은 esbuild의 상위 디렉터리 metadata 읽기 제한 때문에 테스트 시작 전 실패했다. 동일 로컬 명령이 자동 검토 승인 후 성공했다. 코드 실패나 테스트 제외로 처리하지 않았다.
- 자동 prebuild 없이 직접 Next production build: **exit0, 503개 페이지 생성**. `../preview-evidence/release-build.log`.
- 갱신된 정적 출력에서 Google Chrome 헤드리스 핵심 E2E: **12/12 통과**, 22.5초, 실패·skip·flaky 0. 데스크톱·모바일 및 적용월 시나리오를 확인했다. `../preview-evidence/release-core-e2e-results.json`.
- 앞선 전체 31개 계산기 기본 기능·핵심 흐름 E2E **74/74 통과** 증거는 `artifacts/premium-e2e.json`에 별도 보존했다. 이번 12개는 교정 후 핵심 재검증이며 86개의 독립 시나리오로 합산하지 않는다.
- 검증한 제품 코드는 `af13717`과 갱신된 manifest다. 법령 CLI의 실패와 운영 계정·광고 미검증은 위 성공 검사와 별개로 남아 있다. 과거 전체 legacy E2E/시각 스냅샷을 모두 재실행한 것은 아니다.

## 반영 게이트와 롤백

1. 공식 기준으로 확인한 고위험 설명 오류를 수정하고 실제 테스트 결과와 법령 분류표를 검토한다. 미검증 법령을 무조건 레지스트리에 등록해 게이트를 녹색으로 만들지 않는다.
2. 로컬 커밋을 보존하고 변경된 콘텐츠의 git 기반 dateModified manifest를 재생성·검증한다.
3. Cloudflare의 현재 production 배포와 branch/build/preview 설정, Auto Ads 제외영역·실제 화면, 추적 설정을 읽기 전용 확인한다.
4. 원본 로컬 별도 브랜치 통합 후 기존 사용자 파일이 보존됐는지 확인한다. 승인된 preview만 원격으로 전달하고 다시 핵심 기능·광고·개인정보를 검증한다.
5. 부모의 다음 운영 반영 지시 후 main 반영을 수행한다. 배포 전 기록한 성공 production 배포를 즉시 복원할 수 있게 확인한다. 소스 rollback은 개편 커밋의 revert로 수행하며 force push/reset으로 기존 변경을 제거하지 않는다. 10개 자동화는 계속 OFF다.
