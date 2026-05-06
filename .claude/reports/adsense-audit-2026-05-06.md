# AdSense 감사 보고서

**날짜**: 2026-05-06  
**대상**: src/app/calculator/**/*.tsx (63 페이지)  
**판정**: ❌ **정책 위반 (1 건)**

## 요약 통계

| 항목 | 값 |
|---|---|
| 총 페이지 | 63 |
| 🚨 계정 정지 리스크 | 0 |
| ❌ 정책 위반 | 1 |
| ⚠️  경고 | 1 |
| ℹ️  정보 | 0 |

## ❌ 정책 위반

- **[CROSS-PAGE]** ([GLOBAL])  
  `슬롯 "ca-pub-xxxxxxxxxxxxxxxx"이 다중 페이지에서 사용됨: /app/guide/earned-income-tax-credit-vs-child, /app/guide/earned-income-tax-credit-vs-child, /app/guide/earned-income-tax-credit-vs-child — 각 슬롯은 고유해야 함`

## ⚠️  경고 (검토 권장)

- **/app/guide/earned-income-tax-credit-vs-child** (src/app/guide/earned-income-tax-credit-vs-child/page.tsx)  
  `슬롯 "ca-pub-xxxxxxxxxxxxxxxx" 중복 사용 (3회) — 같은 페이지 내에서만 유효해야 함`

## 📊 광고 슬롯 사용 현황

| 슬롯 유형 | 페이지 수 |
|---|---|
| AdSlot | 62 |
| InfeedAd | 8 |
| SkyscraperAd | 3 |

## 📋 다음 조치

2. **금칙어 수정**: 면책조항을 추가하거나 표현을 순화
3. **발사 후 4주**: eCPM·CTR 비교 (Phase E/F 와 대비)
4. **월간**: 정기 감사 스크립트 실행 (GitHub Actions)

## 📚 근거

- REFERENCE.md §3 (허용 광고), §4 (금지 광고)
- docs/design-system.md §9 (광고 슬롯 규격 및 페이지당 ≤ 4개)
- support.google.com/adsense 공식 정책
