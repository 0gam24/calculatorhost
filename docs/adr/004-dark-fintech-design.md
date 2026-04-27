# ADR-004: 다크 Fintech 디자인 + 라이트 광고 컨테이너

**상태**: 수락됨  
**일자**: 2026-04-24

## 맥락
벤치마크 knowingasset.com은 라이트 테마. 사용자는 Figma 레퍼런스 이미지로 다크 Fintech 대시보드 스타일을 요청. AdSense 광고와 다크 테마의 가독성 충돌 우려.

## 결정
**다크 Fintech를 기본 테마로 하되, AdSense 슬롯만 라이트 배경 카드로 감싸고, 사용자가 다크/라이트 전환 가능한 토글 제공.**

## 근거
1. 사용자 명시 선호 (Figma 이미지 제공)
2. knowingasset 대비 **비주얼 차별화** — 경쟁력 확보
3. 금융 대시보드는 다크 모드가 프로페셔널 인상 (Coinbase, Wealthsimple 등)
4. **AdSense 가독성 보호**: 광고만 라이트 카드에 배치하면 광고 크리에이티브와 자연스러움
5. 사용자 토글로 취향 존중 → SEO 친화 (전면 광고 아님)

## 대안 고려
- **라이트만**: knowingasset과 동질화, 차별화 약화
- **다크만**: 일부 사용자 불편, AdSense 광고 대비 낮아짐
- **시스템 설정만 따름**: 사용자 선택권 없음

## 결과
- `:root[data-theme='dark'|'light']` 토글
- localStorage `theme` 저장
- 초기 로드 시 `prefers-color-scheme` 존중
- 광고 슬롯은 항상 `bg-white` 강제 (dark 토글 시에도)

## 팔레트 (확정)
- primary: #595FF7
- secondary: #8EC9DC
- bg(dark): #272A2F / card: #2F3238
- highlight: #F7C159
- danger: #FC354D

## 리스크
- FOUC (첫 렌더 시 테마 깜빡임) → `layout.tsx`에 inline script로 `data-theme` 선주입
- 광고 영역만 라이트 카드면 시각적 부조화 → 충분한 spacing(24px+)으로 분리

## 관련
- docs/design-system.md
- .claude/skills/design-system-fintech/REFERENCE.md §2, §7
- .claude/skills/adsense-policy-reference/REFERENCE.md §11
