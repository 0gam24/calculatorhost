# ADR-019: 네이버 서치어드바이저 공식 가이드 전면 적용

- 상태: 채택 (2026-10-30)
- 결정자: 운영자 지시("네이버 검색 가이드 폴더별 파일 하나씩 모두 읽어서 이 웹사이트에 순서대로 모두 적용해"), 운영 위임 하의 Claude
- 근거 문서: `docs/references/H-네이버-공식가이드/` 55개 문서 (00 목차 + 01~12 폴더)
- 점검 기록: 폴더별 감사 6건(01 / 02 / 03·04 / 05~07·09·10 / 08 / 11·12)과 빌드 산출물 전수 검사

## 결정

### 01 기초 · 02 고급 (수집·주소·HTTP)
1. `www.calculatorhost.com` 과 `calculatorhost.pages.dev` 는 `calculatorhost.com` 으로 301 (`functions/_middleware.ts`). 미리보기 하위 도메인은 noindex 유지.
2. `/404`·`/404/`·`/404.html` 은 404 상태로 응답 (소프트 404 금지).
3. robots.txt 에서 옛 WordPress 경로 Disallow 24줄을 지운다. 지운 페이지를 막으면 로봇이 404 를 확인하지 못해 검색에서 빠지지 않는다 (01-05, 12-03). 모두 404 응답임을 확인했다.
4. 끝 슬래시 없는 내부 링크 3개, 없는 페이지로 가는 내부 링크 5개, `<Link>` 안에 `<a>` 가 겹친 링크 4개를 고쳤다.

### 03 콘텐츠 · 04 HTML 마크업
5. 메인 페이지 제목은 브랜드명 `calculatorhost | 세금·금융·부동산 계산기`, 설명에서 계산기 개수처럼 바뀌는 숫자를 뺐다 (04-02 "메인 제목은 브랜드명, 자주 바꾸지 않는다").
6. og·twitter 의 title·description 을 페이지마다 따로 적지 않는다. 430개 파일에서 지웠고 Next 가 페이지 title·description 을 이어받는다. og:url 은 canonical 과 같게. `twitter:domain` 추가.
7. og:image 는 문서마다 고유하게. 가이드 385편·단일 페이지 15쪽·DTI 계산기의 `opengraph-image.png` 를 새로 만들고(제목 줄바꿈 템플릿), 페이지 metadata 의 `images` 를 지웠다. 공통 이미지의 "27개" 문구도 뺐다.
8. 파비콘: href 절대 경로, rel 값마다 하나 (shortcut icon=ICO, icon=SVG, apple-touch-icon).
9. 잘못된 외부 링크(없는 도메인 14개, 끊긴 주소 23곳), 근거 없는 전화번호 5종, 없는 기관명 3건을 바로잡았다. 국세청은 국세상담센터 126, 위택스는 번호 대신 누리집·구청 안내.
10. 제목 40자·설명 40~80자(ADR-016)를 가이드 전체로 넓혔다. 브랜드 접미사 삭제, 같은 단어 반복·완벽·총정리·필독·마감 카운트다운 삭제. 제목은 앞쪽 검색어를 그대로 둔다.
    - ADR-016 의 "계산기 제목 한 분기 동결"과의 관계: 계산기는 반복 단어가 뚜렷한 2개(연차·디데이)만 단어 하나씩 빼는 최소 수정을 했다. 앞쪽 검색어는 그대로다.
11. 기한이 지난 글(개별소비세 인하 6/30 종료)과 자동차세 연납 "5% 할인" 오표기(실제 1월 약 4.58%)를 사실대로 고쳤다.

### 05 검색연동 · 10 IndexNow
12. RSS 각 item 에 가이드 본문 전체를 넣는다 (`scripts/rss-full-content.mjs`, postbuild). 주소는 같은 도메인 절대 주소.
13. IndexNow 는 기존 방식 유지(키 파일·요청 형식 준수 확인).

### 08 구조화 데이터
14. BreadcrumbList: 사이트 루트 이름 "홈" → 사이트 이름(화면·JSON-LD 동시), 화면과 JSON-LD 의 이름·링크 일치(51쪽), 30자 넘는 이름 정리, 카테고리 소속 일치.
15. HowTo(네이버 지원 타입): 마크업한 단계를 `<HowToSteps>` 접힘 카드로 화면에 보여준다(42쪽).
16. DefinedTermSet: 정의문을 `<GlossaryTerms>` 로 화면에 보여준다(21쪽). DefinedTerm 의 inLanguage 제거(schema.org 정의 밖).
17. ItemList: 항목마다 고유 image, 화면에 보이는 링크만, 3개짜리 목록과 주소가 겹치는 목록은 제거.
18. SoftwareApplication applicationCategory: BMI=Health, 디데이·평수=Utilities. WebPage.isPartOf 를 카테고리 허브(CollectionPage)와 맞추고 WebSite 에 @id.
19. 같은 JSON-LD 가 두 번 나가던 계산기 4쪽 정리.

### 회귀 방지
- `tests/unit/seo/structured-data-source.test.ts`: 빵부스러기 화면=JSON-LD, HowTo·용어 정의 화면 표시
- `tests/unit/seo/og-images.test.ts`: 가이드·계산기 고유 OG 이미지
- `tests/unit/scripts/rss-full-content.test.ts`, `tests/unit/preview-middleware.test.ts`, `tests/unit/seo/robots-sitemap.test.ts`, `tests/unit/seo/jsonld.test.ts`
- `tests/e2e/seo-regression.e2e.ts` 네이버 마크업 묶음

## 운영자만 할 수 있는 일 (코드로 불가)
- 서치어드바이저 사이트 등록·소유확인 → `NEXT_PUBLIC_NAVER_SITE_VERIFICATION` 환경변수 (코드 준비됨)
- 소유확인 뒤 사이트맵(`/sitemap.xml`)·RSS(`/feed.xml`) 제출, robots.txt 수집요청, 사이트 간단 체크, URL 검사
- 연관 채널(sameAs): 실제 운영하는 블로그·SNS 가 있을 때만 `NEXT_PUBLIC_SAMEAS_URLS`
- Cloudflare 보안 이벤트에서 Yeti 차단·챌린지 여부 확인, 도메인 자동 갱신 확인
- 자동 발행 15편 검수 (기존 과제)

## 적용하지 않은 것과 이유
- 09 제휴 수집요청 API: 제휴 심사 대상이라 해당 없음. IndexNow·수집요청으로 충분.
- 11 교육 자료 PDF 2개: 파일 내려받기가 필요해 이번에는 열지 않았다(내용은 01~12 문서와 같은 주제).
- Next.js JS 파일명 해시(02-01 비권장): 본문이 정적 HTML 에 모두 있어 위험이 낮고 프레임워크 구조라 유지.
