---
paths:
  - src/app/calculator/**
  - src/components/calculator/**
---

# 계산기 페이지 규칙 (모든 새 계산기 자동 적용)

## 페이지 섹션 순서 (GEO/AEO 최적화, 고정)
1. H1 (계산기명 + 연도)
2. 리드 문단 (50-100자)
3. **Structured Summary** (GEO 필수)
   - 정의 블록 (50-80자)
   - 핵심 수치 `<table>` (3-5행, 이미지 아님)
   - TL;DR 박스
4. **Breadcrumb 컴포넌트** (`@/components/layout/Breadcrumb`) — 시각적 + JSON-LD 동기
5. 계산기 폼
6. 결과 카드
7. 결과 해석 (AI 해설 토글)
8. **FAQ (5-8개, 중간 배치 — GEO)** ← 하단 아님
9. {주제}란 무엇인가
10. 계산 공식 단계별
11. 주의사항
12. 절세/활용 팁
13. **법적 근거 및 공식 출처** (외부 권위 링크 2~3개 필수, E-E-A-T)
14. 관련 계산기
15. 업데이트 로그
16. 면책 + 출처

## 본문 길이 기준
**2000자 하한** (계산기 UI 제외). 1500자로는 AdSense RPM·체류시간 부족.

## 필수 구조화 데이터 (6종 — 모든 계산기 페이지에 자동 적용)
1. `SoftwareApplication` (`buildSoftwareApplicationJsonLd`)
2. `WebPage` (`buildWebPageJsonLd` — datePublished/dateModified 명시)
3. `BreadcrumbList` (`buildBreadcrumbJsonLd`)
4. `FAQPage` (`buildFaqPageJsonLd` — FAQ 5~8개 매칭)
5. `HowTo` (`buildHowToJsonLd` — 4~6 step 입력→계산→결과→면책 흐름) **← 모든 계산기 필수**
6. `Speakable` (`buildSpeakableJsonLd` — 핵심 답변 셀렉터, 음성/AI 답변 최적화)

헬퍼: `src/lib/seo/jsonld.ts`. 빌드 시 `<script type="application/ld+json">` 으로 인라인 삽입.

## 메타데이터 표준
- `title`: "{계산기명} {연도} | {핵심 키워드} | calculatorhost" — 60자 이내
- `description`: 100~155자, 첫 문장에 결론, 면책 한 줄 포함
- `alternates.canonical`: `https://calculatorhost.com/calculator/{slug}/` (trailing slash 필수, sitemap과 일관)
- `openGraph.images`: 최소 `/og-default.png` (전용 이미지 있으면 1200×630 PNG 사용)
- `twitter.card`: 'summary_large_image'

## 외부 권위 링크 (E-E-A-T 의무)
모든 계산기 페이지 본문에 **공식 기관 출처 2~3개** 필수.
링크 속성: `target="_blank" rel="noopener noreferrer nofollow" className="text-primary-500 hover:underline"`

> **`nofollow` 유지 결정 (2026-05-03)**: 외부 SEO 컨설턴트는 정부·법령 인용 링크를 `dofollow`로 전환할 것을 권고했으나, 본 사이트는 (1) YMYL(Your Money Your Life) 금융·세무 카테고리이며 (2) 인용은 권위 검증 목적이지 추천이 아니므로 `nofollow`를 유지한다. E-E-A-T는 본문 콘텐츠 품질·산출 공식 정확성·deep-link 구체성으로 신호하며, 링크 주스 전달은 부차적 신호에 해당. 단, **deep-link 정밀도는 최대로**(homepage URL이 아닌 법령·고시·세액표 직링크 사용).

카테고리별 권장 출처 (확장 가능):
- 국세 → 홈택스(hometax.go.kr), 국세청(nts.go.kr), 기획재정부(moef.go.kr)
- 지방세 → 위택스(wetax.go.kr)
- 부동산 → 국토교통부 실거래가(rt.molit.go.kr), 한국부동산원(reb.or.kr)
- 금융 → 한국은행(bok.or.kr), 금감원(fss.or.kr), 금감원 금융상품(finlife.fss.or.kr)
- 환율 → 한국은행 ECOS(ecos.bok.or.kr), 한국수출입은행(koreaexim.go.kr)
- 4대보험 → 국민건강보험(nhis.or.kr), 국민연금(nps.or.kr), 고용노동부(moel.go.kr), 근로복지공단(comwel.or.kr)
- 청약 → 청약홈(applyhome.co.kr), LH(lh.or.kr)
- 통계 → KOSIS(kosis.kr), 통계청(kostat.go.kr)
- 증시 → 한국거래소(krx.co.kr)
- 건강 → 대한비만학회(kosso.or.kr), 보건복지부(mohw.go.kr)
- 법령 → 국가법령정보센터(law.go.kr)

## 광고 슬롯 배치 (CLS 방지 + eCPM 최대화)
- **AD-1 리더보드**: 헤더 아래 (728×90 / 970×250)
- **AD-2 Medium Rectangle**: 계산기-본문 사이 (300×250)
- **AD-3 Skyscraper 스티키**: 우측 사이드바 (300×600, lg+)
- **AD-4 인피드**: 본문 중간 (반응형)
- **AD-5 모바일 앵커**: 화면 하단 고정 (320×50)

페이지당 ≤ 4개 활성 (모바일 기준).

## URL/슬러그
- **영문 슬러그**만 사용 (`/calculator/salary/`, `/calculator/capital-gains-tax/`)
- 모든 URL은 trailing slash (`/`)로 종결 — `next.config.ts` `trailingSlash: true` 와 일관
- sitemap.ts 및 canonical 모두 동일 형식 유지

## 금지
- 계산 로직을 컴포넌트 안에 작성 금지 → `src/lib/tax/` 또는 `src/lib/finance/` 순수 함수로
- 세율 상수 하드코딩 금지 → `src/lib/constants/tax-rates-{year}.ts`에서 import
- 광고 슬롯 다크 배경 금지
- "투자 권유" / "수익 보장" 표현 금지
- HowTo / 외부 권위 링크 / WebPage JSON-LD 누락 금지 (모든 계산기에 자동 적용)

## 공통 컴포넌트 (반드시 재사용)
- `@/components/calculator/Form` — 입력 폼 섀시
- `@/components/calculator/Result` — 결과 카드
- `@/components/calculator/UnitButtons` — 억/천만/백만 단위 버튼
- `@/components/ads/AdSlot` — AdSense 슬롯 (라이트 카드)
- `@/components/layout/Breadcrumb` — 시각적 빵부스러기 (JSON-LD와 동일 항목)
- `@/components/layout/RelatedCalculators` — 관련 계산기 하단 링크
