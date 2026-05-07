# 시각 회귀 검사 리포트

**실행 시간**: 2026-05-07T00:52:28.531Z

## 개요

- **스냅샷 테스트**: 8개
- **총 PNG 파일**: 32개

## 감지 결과

- **acquisition-tax.visual**: 4개 PNG
- **capital-gains-tax-5steps.visual**: 4개 PNG
- **capital-gains-tax.visual**: 4개 PNG
- **home.visual**: 4개 PNG
- **jeonse-deposit-safety.visual**: 4개 PNG
- **loan-limit.visual**: 4개 PNG
- **salary.visual**: 4개 PNG
- **updates.visual**: 4개 PNG

## 해석 가이드

| 변경 크기 | 조치 |
|---|---|
| < 5px | 무시 가능 (스케일링 편차) |
| 5–20px | **의도된 변경** 여부 확인 필수 |
| > 20px | 🔴 **차단 검토** — 레이아웃 오류 가능성 |

## 다음 단계

- `npm run ralph:visual -- --update` 로 스냅샷 갱신 (차후 구현)
- 변경이 의도된 것이 아니면 `.claude/reports/stuck.md` 등재
