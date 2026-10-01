# 유입 동선·취득세 안내·공개 문구 릴리스

사용자 승인 범위: 유입 개선 `2751840`과 검증된 취득세 안내/자동차세 법령 링크 `ed3568e` 통합, calculatorhost 공개 페이지의 작성도구 관련 표현 제거, 검증 후 production 배포. API 교정 `93487b0`은 제외한다.

## 통합과 보존

- 직전 production 기준: `5124057a115a84485c0871fbfe558a4596a96506`.
- 원격 main을 읽기 전용으로 확인하고 가져온 뒤 별도 `codex/release-search-copy-2026`에서 작업했다. 유입 브랜치 `2751840`은 그대로 보존하고 `ed3568e`만 `a4e731da42c732ddbc07f462dbeb66de647d097d`로 cherry-pick했다.
- `codex/api-statute-diagnostics-2026`의 `93487b0c3cf019a23bd1231dec06fd8116395570`을 보존했다. API/functions, 계산 산식/상수, 금융 데이터 snapshot, GitHub workflow는 production5124057 대비 변경하지 않는다.
- 기존 URL/canonical과 435개 sitemap URL을 유지한다. 공통 footer/가이드의 작성방식 문구 편집을 이유로 모든 법령 기준일을 새 날짜로 바꾸지 않았다. 소개/피드/카테고리 4곳의 실질 설명 변경만 추가 수정일을 기록했다.
- 자동화 10개는 `disabled_manually`를 유지한다. Cloudflare의 기존 production main Git 자동 배포를 사용하며 새 키/권한/서비스/DNS/광고 설정 변경을 하지 않는다.

## 공개 문구 전수 확인

공개 문구 파일 369개(페이지 368개 + 공통 Footer)에서 관련 표현 386개 소스 줄·428회를 제거하거나 문맥에 맞게 중립 편집했다. 단어 경계를 사용하고 JSX/문자열 문맥을 확인했으며 영문 부분 문자열 일괄 삭제는 하지 않았다. 소개의 자동 발행·모든 직접 검수 확정 주장도 제거했고 사람 작성/검수 보증으로 바꾸지 않았다.

세금·투자·법률 면책과 공식 출처, 기준일, 기능 링크는 보존했다. 수정된 부분의 법조항 토큰을 전후 비교해 동일함을 확인했다. 삭제된 외부 링크는 소개의 작성도구 제작정책 링크 1개다. 지적된 미완성 문장 꼬리 3곳도 최종 교정했다. 기존 작성자 정보는 전수 법령 인증을 의미하지 않는다.

공개 HTML 전수 검사: 444개 문서의 본문/제목/설명/OG·Twitter/접근성 속성/JSON-LD 문자열을 확인했다. 변경 전 관련 표현은 본문 870회(공통 Footer와 별칭 문서의 반복 포함), metadata 1회, JSON-LD 1회였다. **최종 관련 표현 0회**다.

예외는 방문자 설명이 아닌 기술 영역이다: robots의 크롤러 User-Agent, llms 기술 파일/경로, 내부 개발 문서·주석·코드 식별자·의존성은 보존했다. 기존 일반 면책/개인정보/광고 고지 제거는 없다. 특정 법령이 요구하는 작성도구 표기 조항은 이번 소스에서 발견하지 않았으며, 전체 사이트 법률 적합성을 새로 인증한 것은 아니다.

## 실행한 검증

- 전체 단위 테스트: 67개 파일/1,219개 통과.
- typecheck/lint 통과. Next lint 폐지 예정 안내, Browserslist 데이터 시점 안내는 도구 수준 잔여 알림이다.
- 최종 문장 교정 소스로 `npm run build` prebuild/build/postbuild 통과. 정적 페이지 503개, HTML 444개. 네트워크 차단 build에서 외부 요청/비공개 `.my` 읽기 시도 없음. 동기화·자동 발행 없음.
- 핵심 계산 41개(전체 31개 계산기 모바일 smoke 포함), 취득세 안내/차량 동선 6개, 유입 동선 28개 브라우저 검사 모두 통과. Chrome 별도 프로필로 검사했고 외부 광고·분석 요청을 차단했다.
- 444 HTML 공개 문구 감사 통과, `git diff --check` 및 SEO 최종 검토 통과.

증거는 저장소 밖 `../preview-evidence/`의 `release-copy-*`, `public-visitor-copy-before.json`, `public-visitor-copy-after.json`, `public-ai-editor-audit.json`, `api-statute-content-e2e.json`, `api-statute-local-flows.json`, `search-intent-browser-results.json`에 보존한다. 원시 수익/계정 데이터·인증정보는 저장소에 넣지 않는다.

## 배포·롤백과 남은 한계

직전 정상 Cloudflare deployment: `4a38ea24-8a41-42c8-ab9e-27acd37a38c2` (production5124057). 배포는 최종 커밋을 main에 fast-forward push하고 Cloudflare check의 **같은 SHA** 성공과 실제 도메인을 확인한다. 심각한 회귀는 이번 3개 커밋(공개 문구 교정, a4e731d,2751840)을 역순 revert해 source5124057 상태로 되돌리는 새 커밋으로 복구할 수 있다. force push/reset/delete를 사용하지 않는다.

실제 사이트 검증은 모든 sitemap435 URL의 HTTP/canonical/index·문구, robots asset 허용, 대표 계산/동선, API preview 차단 누출 여부를 확인한다. 최종 배포 커밋/deployment와 실제 검사 결과는 배포 완료 보고에 기록한다.

기존 API 3종 404와 법령 출처 레지스트리의 미검증/미등록 잔여는 이번 릴리스에 포함하지 않았다. 실제 GA4 이벤트 수신과 유입/수익 개선 효과도 별도 확인 사항이다. 기능 추가나 문구 변경만으로 순위·수익을 보장하지 않는다. 홈페이지 정보/API 변경은 이 배포 뒤 별도 조사한다.
