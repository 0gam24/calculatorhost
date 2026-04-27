# Google SEO Reference (Google Search Central 공식 가이드 요약)

> **출처**: https://developers.google.com/search/docs (2026-04 기준)
> **대상**: calculatorhost.com (한국어 금융/세금 계산기, YMYL 카테고리)
> **용도**: seo-auditor·content-writer·frontend-builder 에이전트 참조용 진실 공급원

---

## §1. Google 검색 작동 원리 (요점만)

Google = 완전 자동 검색엔진. 크롤러(Googlebot)가 링크를 타고 웹을 탐색 → 색인 생성 → 쿼리에 서빙.

### 필수
- `robots.txt`로 크롤링 가능하게 유지
- `sitemap.xml` 제출 (Search Console)
- 다른 페이지에서 링크 받기 (내·외부)
- JavaScript 실행 필요 페이지는 SSR/SSG 권장
- **CSS·JS를 robots.txt로 차단하지 말 것** (렌더링 실패 → 순위 손실)

### Next.js App Router + `output: 'export'`로 생성된 정적 HTML은 Googlebot에 이상적

---

## §2. 페이지 최적화 (Title / Description / Heading / URL)

### §2.1 title (제목 태그)
- 페이지당 고유
- 60자 내외 (모바일 잘림 주의)
- 가장 중요한 키워드를 앞쪽에
- 브랜드명은 끝에 구분자(`|`, `-`)로
- **계산기 페이지 템플릿**: `{계산기명} 2026 - 최신 {주제} | calculatorhost`
  - 예: `연봉 실수령액 계산기 2026 - 최신 세율 반영 | calculatorhost`

**금지**:
- 페이지와 무관한 키워드 나열
- 과도하게 긴 제목
- 모든 페이지가 같은 제목

### §2.2 meta description
- 페이지당 고유, 155자 내외
- 검색어 관련 정보 + CTA 포함
- **계산기 페이지 템플릿**: `[1분] {주제} 정확히 계산하고 {결과}까지 한 번에 확인. 2026년 {법개정} 반영. 모바일 최적.`
- Google이 무시하고 본문에서 스니펫 추출할 수도 있음 → 본문 첫 200자도 중요

### §2.3 헤딩 (h1~h6)
- h1은 페이지당 1개 권장(의무 아님)
- 순서 엄격 강제 X, 의미론적 사용 권장 (접근성)
- 너무 많은 헤딩 = 나쁨
- **계산기 페이지 권장 구조**:
  - h1: 계산기명
  - h2: 계산하기 / 결과 / {주제}란 / FAQ / 관련 계산기
  - h3: FAQ 각 질문

### §2.4 URL 구조
- 사용자에게 의미 있는 단어 포함
- `/2/6772756D707920636174` 같은 식별자만은 ❌
- `/pets/cats.html` 같이 설명적 ✅
- 디렉토리로 주제 그룹화
- 짧고 안정적이게 (URL 변경 = 리다이렉트 필요)
- 하이픈(`-`) 권장, 언더스코어(`_`) 비권장
- **본 프로젝트 결정**: 한글 슬러그 (`/계산기/연봉실수령액`) — URL 인코딩되지만 검색의도 매칭 강함

---

## §3. 크롤링 가능성 제어

### robots.txt
- 루트에 필수 (`/robots.txt`)
- 크롤링 차단은 **색인 차단이 아님** (외부 링크로 색인될 수 있음) → 색인 차단은 `noindex` 메타

**본 프로젝트 robots.txt 샘플**:
```
User-agent: *
Allow: /
Disallow: /api/
Sitemap: https://calculatorhost.com/sitemap.xml
```

### sitemap.xml
- 중요 URL 명시 (Google은 자동 발견도 함)
- 50,000 URL 또는 50MB 초과 시 분할
- `<lastmod>` 정확히 기록 (Google이 크롤링 우선순위 참고)
- Next.js `app/sitemap.ts`로 자동 생성

### meta robots
- `<meta name="robots" content="noindex">` → 색인 제외
- `nofollow` → 링크 팔로우 금지
- `noindex, follow` → 페이지는 색인 안 하되 링크는 따라감

### canonical
- `<link rel="canonical" href="...">` 중복 URL 정리
- 자기 자신을 canonical로 지정하는 것도 권장 (self-canonical)
- Next.js: `export const metadata = { alternates: { canonical: '...' } }`

---

## §4. 다국어·다지역 (hreflang)

본 프로젝트는 한국어 전용 → 단순 설정:
```html
<link rel="alternate" hreflang="ko-KR" href="https://calculatorhost.com/..." />
<link rel="alternate" hreflang="x-default" href="https://calculatorhost.com/..." />
```

---

## §5. 이미지·미디어 SEO

### 이미지
- `alt` 속성 필수: 이미지와 콘텐츠 관계를 한국어로 명확히
  - ❌ `alt="image1"`
  - ✅ `alt="연봉 5000만원 실수령액 월별 내역 그래프"`
- 고화질 이미지 + 주변 텍스트 관련성
- 파일명도 설명적: `salary-chart-2026.webp`
- `next/image` 사용 (lazy loading, WebP/AVIF 자동)
- 이미지 sitemap 생성 (`app/image-sitemap.xml`)

### 동영상 (추후)
- VideoObject 구조화 데이터
- 동영상 sitemap

---

## §6. 구조화 데이터 (Structured Data) — JSON-LD 권장

### §6.1 SoftwareApplication (계산기 페이지 필수)
```json
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "연봉 실수령액 계산기",
  "applicationCategory": "FinanceApplication",
  "operatingSystem": "Web",
  "offers": {
    "@type": "Offer",
    "price": 0,
    "priceCurrency": "KRW"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": 4.8,
    "ratingCount": 1200
  }
}
```

**주의**: `aggregateRating`는 **실제 사용자 평점**일 때만. 가짜 평점은 정책 위반.
→ 초기엔 평점 제외 / 댓글 기능 추가 후 실제 데이터 기반 추가.

### §6.2 FAQPage (FAQ 섹션 필수)
```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [{
    "@type": "Question",
    "name": "연봉 5000만원의 월 실수령액은 얼마인가요?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "연봉 5000만원 기준 세전 월 약 416만원, 4대보험과 소득세 공제 후 실수령액은 약 350만원입니다..."
    }
  }]
}
```

**적격 기준 (Google 공식)**:
- ✅ 정부/보건당국/**권위 있는 정보 제공 사이트** (→ 본 프로젝트 해당)
- ❌ 사용자가 답변 제출 가능한 Q&A/포럼
- ❌ 상업적 제품 지원 페이지 (구매 유도)
- ❌ 광고 목적

**금지**:
- 선정적·폭력적·외설 콘텐츠
- 동일 FAQ 사이트 내 중복 마크업
- 페이지 본문에 **표시되지 않는** FAQ 마크업 (사용자 가시성 필수)

**허용 HTML 태그 (answer text 내)**: `h1-h6`, `br`, `ol`, `ul`, `li`, `a`, `p`, `div`, `b`, `strong`, `i`, `em`

### §6.3 BreadcrumbList (전 페이지)
```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {"@type": "ListItem", "position": 1, "name": "홈", "item": "https://calculatorhost.com/"},
    {"@type": "ListItem", "position": 2, "name": "계산기", "item": "https://calculatorhost.com/계산기"},
    {"@type": "ListItem", "position": 3, "name": "연봉 실수령액"}
  ]
}
```

### §6.4 HowTo (사용 가이드용)
계산기 사용 방법을 단계별로 설명하는 섹션에 적용.

### §6.5 Article (블로그 가이드용)
`content/가이드/*.mdx` 페이지에 적용. `headline`, `datePublished`, `dateModified`, `author`, `publisher` 필수.

### §6.6 Organization (홈/소개 페이지)
```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "calculatorhost",
  "url": "https://calculatorhost.com",
  "logo": "https://calculatorhost.com/logo.png"
}
```

### 검증
- **Google Rich Results Test**: https://search.google.com/test/rich-results
- **Schema Markup Validator**: https://validator.schema.org/
- 두 도구 모두 통과해야 배포

---

## §7. 페이지 경험 (Page Experience) & Core Web Vitals

### Core Web Vitals 기준
| 지표 | Good | Needs Improvement | Poor |
|---|---|---|---|
| **LCP** (Largest Contentful Paint) | ≤ 2.5s | 2.5-4.0s | > 4.0s |
| **INP** (Interaction to Next Paint) | ≤ 200ms | 200-500ms | > 500ms |
| **CLS** (Cumulative Layout Shift) | ≤ 0.1 | 0.1-0.25 | > 0.25 |

### 최적화 전략 (Next.js + Cloudflare Pages)
- **LCP 개선**:
  - 메인 히어로 이미지에 `priority` 속성 (`next/image`)
  - 폰트 preload + `font-display: swap`
  - Cloudflare 엣지 캐시 활용
  - AdSense 스크립트는 `<Script strategy="lazyOnload">`
- **INP 개선**:
  - 계산기 로직은 순수 함수로 (debounce 적용)
  - 대용량 JS 번들 피하기 (code splitting)
  - `useTransition`으로 비동기 업데이트
- **CLS 개선**:
  - 이미지/iframe에 `width`·`height` 명시
  - 광고 슬롯 영역 **크기 사전 예약** (중요: AdSense가 CLS 주원인)
  - 폰트 로딩 시 레이아웃 변경 방지 (`size-adjust`)

### 전면 광고(Intrusive Interstitials) 금지
모바일에서 콘텐츠 가리는 팝업·광고 모달 = 순위 하락

### HTTPS 필수 (Cloudflare Pages 자동)

---

## §8. 유용한 콘텐츠 & E-E-A-T & YMYL ⭐️ (본 프로젝트 최우선)

### §8.1 본 프로젝트는 YMYL (Your Money or Your Life)
- **금융 의사결정·세금 계산** = 대표적 YMYL 주제
- **Google이 더 엄격한 E-E-A-T 기준 적용**
- 잘못된 정보가 사용자에게 **재정적 피해**를 줄 수 있기에 최고 품질 요구

### §8.2 E-E-A-T 4요소 (모든 페이지에 녹여야 함)

| 요소 | 의미 | 본 프로젝트 적용 |
|---|---|---|
| **Experience** (경험) | 주제에 대한 직접 경험 | "실제 케이스 예시" 섹션, 사용자 댓글(UGC) |
| **Expertise** (전문성) | 주제에 대한 깊이 있는 지식 | 법 조항 번호 인용, 공식 유도 과정 명시 |
| **Authoritativeness** (권위) | 권위자로 인정받는 평판 | 국세청·국토부 원문 링크, 감수자(세무사) 표시 |
| **Trustworthiness** (신뢰) | 정보 정확성·투명성 **가장 중요** | 업데이트 날짜 명시, 면책조항, HTTPS, 연락처, 회사 정보 |

### §8.3 자가 평가 질문 (콘텐츠 배포 전 체크)

**콘텐츠 품질**:
- 고유 정보/보고/분석을 제공하는가?
- 주제를 본질적이고 포괄적으로 설명하는가?
- 뻔하지 않은 유용한 분석을 제공하는가?
- 제목이 과장되거나 낚시성이지 않은가?
- 철자·문법 오류 없는가?

**전문성**:
- 저자 정보가 명확한가? (이름·약력·링크)
- 전문가/애호가가 작성·검토했는가?
- 검증 가능한 사실 오류가 없는가?
- 사이트가 해당 주제의 권위자로 보이는가?

**제작 품질**:
- 대량 생산·아웃소싱으로 보이지 않는가?
- 불필요한 광고로 콘텐츠를 방해하지 않는가?
- 모바일에서도 잘 표시되는가?

### §8.4 사용자 중심 콘텐츠 = 긍정 신호
- 명확한 타깃 독자층 (페르소나)
- 경험과 전문성이 드러남
- 읽은 후 **목적 달성 가능한 수준**의 정보

### §8.5 검색엔진 중심 콘텐츠 = 부정 신호 (절대 금지)
- 순위 목적의 대량 생성
- 다른 사이트 요약만 하고 가치 없음
- 인기 주제 편중
- 검증 안 된 사실 답변
- **페이지 날짜만 변경해 최신처럼 보이게** 하는 트릭
- 순위 조작 위한 무의미한 삭제·추가

### §8.6 AI 생성 콘텐츠 정책
- AI 사용 **자체는 금지 아님**
- **공개(Disclosure) 필수**: "자동화가 사용되었을 것이라고 합리적으로 예상되는 경우"
- 본 프로젝트 방침: 계산기 UI는 사람 작성, AI 해설 기능은 "AI가 생성한 설명입니다" 라벨 부착
- 위반: 순위 조작 목적의 대량 AI 생성 = 스팸 정책 위반

---

## §9. 내부 링크 & 앵커 텍스트

### 내부 링크
- 관련 페이지끼리 연결 (예: "연봉 계산기" → "퇴직금 계산기")
- 사용자·검색엔진에게 사이트 구조 전달
- 카테고리 페이지 → 개별 계산기 / 개별 계산기 하단 "관련 계산기" 섹션

### 외부 링크
- 권위 있는 출처에만 (국세청, 국토부, 한국은행)
- 신뢰 낮은 사이트는 `rel="nofollow"`
- 광고성·제휴 링크는 `rel="sponsored"`

### 앵커 텍스트
- ❌ "여기 클릭", "더 보기"
- ✅ "2026년 종합소득세율 전체 표 보기"

---

## §10. 모바일 최적화

- **모바일 우선 색인(Mobile-First Indexing)**: Googlebot이 모바일 버전을 기본으로 크롤링
- 반응형 디자인 필수
- 모바일에서 폰트 크기 ≥ 16px
- 터치 타겟 ≥ 48x48px
- 전면 광고 금지
- 모바일 친화성 테스트: https://search.google.com/test/mobile-friendly

---

## §11. 피해야 할 패턴 (명시적 금지)

| 패턴 | 설명 | 본 프로젝트 정책 |
|---|---|---|
| 키워드 스터핑 | 같은 단어 반복 | 자연스러운 한국어 |
| 메타 키워드 태그 | Google 미사용 | 아예 사용 안 함 |
| Thin Content | 가치 없는 짧은 콘텐츠 | 각 페이지 최소 1500자 |
| 복제 콘텐츠 | 타 사이트 전체 복사 | 모든 콘텐츠 자체 작성 |
| 클로킹 | 봇·유저에게 다른 내용 | 금지 |
| 링크 매입/매도 | 유료 링크 | 금지 |
| 숨겨진 텍스트 | display:none 키워드 | 금지 |
| 자동 생성 스팸 | AI 대량 순위 조작용 | 금지. AI 사용 시 공개 |
| 문 페이지(Doorway) | 여러 유사 랜딩 | 금지 |
| 날짜 조작 | `lastmod`만 변경 | 실제 업데이트 시만 갱신 |

---

## §12. Search Console 활용

### 필수 작업 (론칭 직후)
1. **소유권 확인** (DNS TXT 레코드 또는 HTML 파일)
2. **sitemap 제출**: `https://calculatorhost.com/sitemap.xml`
3. **URL 검사 도구**로 색인 확인
4. **성능 리포트**에서 키워드·CTR 모니터링
5. **Core Web Vitals 리포트** 주간 확인
6. **보안 이슈 / 수동 조치** 발견 시 즉시 대응

### 트래픽 감소 시 디버그 순서
1. 수동 조치 / 보안 이슈 확인
2. 색인 범위 리포트 확인
3. 최근 알고리즘 업데이트 확인 (Google Search Status Dashboard)
4. 주요 쿼리 순위 변화 분석
5. Core Web Vitals 악화 여부

---

## §13. 계산기 페이지 SEO 최종 체크리스트 (배포 전)

### 필수 (배포 차단)
- [ ] `<title>` 고유·60자 내·키워드 선두
- [ ] `<meta description>` 고유·155자 내
- [ ] self-canonical 설정
- [ ] `hreflang="ko-KR"` + `x-default`
- [ ] `robots` 메타 `index, follow`
- [ ] JSON-LD: `SoftwareApplication` + `FAQPage` + `BreadcrumbList`
- [ ] Google Rich Results Test 통과
- [ ] 모바일 친화성 테스트 통과
- [ ] LCP ≤ 2.5s / INP ≤ 200ms / CLS ≤ 0.1
- [ ] 이미지 `alt` 속성 전부 작성
- [ ] 본문 최소 1500자 (계산기 UI 제외한 설명 영역)
- [ ] 법 조항 / 공식 출처 링크 최소 2개
- [ ] 업데이트 날짜 (`dateModified`) 명시
- [ ] 면책조항 + 문의 링크

### 권장 (CTR·E-E-A-T 강화)
- [ ] OpenGraph 태그 (og:title, og:description, og:image, og:url, og:type)
- [ ] Twitter Card 태그
- [ ] 저자 정보 (감수자 있으면 표시)
- [ ] 관련 계산기 3-5개 링크
- [ ] FAQ 최소 5개
- [ ] 절세/활용 팁 섹션
- [ ] 실제 케이스 예시 (E-E-A-T의 Experience)

### 금지 (위반 시 즉시 제거)
- [ ] 가짜 평점 / aggregateRating 조작 금지
- [ ] 사용자가 볼 수 없는 FAQ 마크업 금지
- [ ] 키워드 스터핑 금지
- [ ] 복제 콘텐츠 금지
- [ ] 전면 광고 금지
- [ ] AI 콘텐츠 미고지 금지

---

## §14. 본 프로젝트 특수 고려사항

### AdSense와 SEO 균형
- AdSense 스크립트는 CLS·LCP 악화 원인 1위
- 대응:
  - 광고 슬롯에 고정 크기 예약 (`min-height`)
  - `<Script strategy="lazyOnload">` 또는 `afterInteractive`
  - 광고 너무 많으면 사용자 경험 점수 하락 → 페이지당 3-4개 상한

### 한국 검색 생태계 특이점
- 네이버는 별도 웹마스터도구(Naver Search Advisor) 등록 필요
- 네이버는 자체 크롤러(Yeti). 한글 콘텐츠 강력 가중치
- 구글 SEO 만점이어도 네이버 노출은 별도 이슈 (본 레퍼런스는 Google 한정)

### YMYL 금융/세금 주제 추가 요구
- 감수자 이름 + 자격 표시 (예: "세무사 홍길동 감수")
- 업데이트 주기 공개 (예: "연 2회 세법 개정 반영")
- 면책조항 명확화 (법적 효력 없음)
- 정부 원문 출처 링크 (국세청, 국토부, 행안부)

---

## §15. 업데이트 로그
- 2026-04-24: Google Search Central 공식 문서 기반 초판 작성 (by seo-auditor skill)
- 차기 갱신: 2026-07 또는 Google 알고리즘 주요 업데이트 시
