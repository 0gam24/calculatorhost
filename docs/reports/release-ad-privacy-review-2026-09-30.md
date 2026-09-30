# 출시 전 광고·분석 검토 — 2026-09-30

격리 개발본을 검토했고 승인된 출시 차단 수정만 적용했다. 이 검토에서 push, 배포, 계정 설정 변경, workflow 재활성화, 인증정보 조회는 하지 않았다.

## 수정과 검증 근거

- `src/components/analytics/PublicServices.tsx`와 `src/lib/analytics/public-service-policy.ts`: 운영 도메인에서만 외부 서비스를 로드한다. 임베드 `/embed/*`, 정책 페이지, 알려진 오류·오프라인 경로에서는 광고 라이브러리를 로드하지 않는다. 현재 문서의 robots 메타에 `noindex`가 있으면 알 수 없는 요청 URL의 404 문서도 초기 광고 로드에서 제외한다. `out/404.html`의 실제 robots 메타는 `noindex` 및 `noindex, nofollow`였다.
- 임베드 실제 경로는 `src/app/(embed)/embed/*/page.tsx`이며 루트 layout을 상속한다. 이전에는 임베드에도 루트 광고 스크립트가 활성화될 수 있었다. 임베드 메타는 `noindex`다.
- 네이버 분석의 현재 공개 스크립트 [wcslog.js](https://wcs.naver.net/wcslog.js)를 읽기 전용으로 확인했다. 전송 함수가 `document.referrer`와 `window.location.href`를 payload에 넣고 `navigator.sendBeacon`으로 보낸다. 따라서 현재 URL뿐 아니라 referrer에도 query/hash가 있으면 스크립트 로드와 `wcs_do()` 호출을 막도록 보완했다. 공개 스크립트는 추후 바뀔 수 있다.
- GA 명시적 page_view/config는 pathname만 사용하고 referrer를 빈 값으로 보낸다. `calculator-events.ts`의 검색 선택·계산 확인·다음 계산 이벤트는 허용된 31개 slug만 보내며 금액·검색어·입력값은 보내지 않는다. 실수령액→선택 저축액 전달은 같은 탭 sessionStorage와 고정 계산기 경로를 사용한다.
- `tests/unit/lib/public-service-policy.test.ts` 31개와 `tests/unit/lib/calculator-events.test.ts` 8개, 총 **39개 테스트 통과**. 임베드/정책/알려진 오류 경로, unknown 404 noindex, 현재 URL 및 referrer query/hash, preview 호스트, 허용 slug와 민감값 거부를 검증했다. 전체 strict typecheck도 확인했다.

## 운영 반영 전 남은 차단 확인

1. 소스의 수동 `AdSlot`/광고 `<ins>`는 없다. 운영 광고는 루트 AdSense 라이브러리와 Auto ads 설정에 의존한다. 입력·오류·결과 버튼 영역의 광고 제외, 모바일 오클릭·CLS·앵커/전면 광고 상태는 운영 AdSense 설정 및 실제 화면에서 확인해야 한다. 로컬 광고 요청 0건은 운영 배치의 안전성을 입증하지 않는다.
2. 초기 문서에서 광고 스크립트 로드를 막는 변경이다. SPA 이동 전에 이미 로드한 외부 SDK는 React 컴포넌트가 사라져도 제거되지 않는다. 운영 도메인에서 계산기↔임베드/정책/오류 이동 시 Auto ads 동작을 별도로 확인해야 한다.
3. GA4의 enhanced measurement 설정과 실제 네트워크 payload는 이번 검토에서 계정 인증으로 확인하지 않았다. [Google 공식 설명](https://support.google.com/analytics/answer/9216061?hl=en)에 따르면 브라우저 history 기반 page_view, URL query 기반 site search, form metadata, outbound link URL 등은 별도로 자동 수집될 수 있다. 코드의 명시적 이벤트 보호를 GA 전체 자동 수집 비활성화로 표현하면 안 된다.
4. `wrangler.toml`은 `name="calculatorhost"`, `pages_build_output_dir="out"`만 확인시켜 준다. production branch, preview branch 허용 목록, 실제 Cloudflare build command는 저장소만으로 확정할 수 없다. `STATE.md`는 main push가 Cloudflare 배포를 유발한다고 기록하고 `docs/architecture.md`는 브랜치 preview를 기술한다. 실제 설정을 확인하기 전 어떤 원격 push도 안전한 단순 백업으로 간주하지 않는다.
5. `package.json`의 표준 prebuild에는 공개 데이터 동기화와 STATE 생성이 포함된다. 최종 검증에서는 원치 않는 데이터/운영 상태 재생성이 일어나지 않도록 실행 범위를 명시해야 한다. GitHub 자동화 10개 OFF는 이번 수정으로 변경하지 않았다.

## 트래픽 기준선의 한계

격리 개발본에는 gitignored `gsc-latest.json`이 복사되지 않았다. 부모가 원본의 기존 저장본을 읽어 확인한 값은 fetchedAt `2026-09-30T01:50:39.486Z`, 기간 `2026-08-31`~`2026-09-28`, 페이지 노출 3,125·클릭 14·295개 페이지다. metadata의 `days:28`과 달리 양 끝을 포함하면 **29일 저장본**이다. 이번 작업에서 GSC API를 새로 조회하거나 인증을 생성하지 않았다. 이를 엄격한 최근 28일 실시간 기준선으로 표현하지 않는다.

`scripts/gsc-pull.mjs --mock` 경로는 샘플을 생성하고 `range.mock=true`로 표시하며 `gsc-report.mjs`도 MOCK 표시를 출력한다. 기존 진단 txt에는 해당 provenance 필드가 없어 txt만으로 진위를 확정할 수 없다. `ActivityChart.tsx`/`CategoryChart.tsx`는 mockData를 포함하지만 현재 소스에서 사용처가 없으며 실제 운영 분석 자료로 간주하지 않는다. 90일 계획의 PV·RPM·수익 추정과 익명 쿼리 인과 해석 역시 실계정 검증 결과로 승격하지 않는다.
