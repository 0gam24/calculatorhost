---
name: design-system-fintech
description: |
  calculatorhost.com 다크 Fintech 디자인 시스템 참조. frontend-builder 에이전트가 UI 구현 시 트리거.
  "UI 만들어", "컴포넌트 추가", "레이아웃", "디자인", "사이드바", "카드", "차트 스타일" 등 요청 시 자동 호출.
---

# Design System Skill

## 워크플로우

### 상황 1: 새 컴포넌트 구현
1. `REFERENCE.md` §2(컬러)/§3(타이포)/§4(간격) 토큰 확인
2. 유사 기존 컴포넌트 탐색 (Grep)
3. 동일 패턴이면 재사용, 없으면 §5 템플릿 활용
4. Tailwind 유틸 클래스만 사용 (CSS 모듈 최소화)
5. 반응형 + 다크/라이트 토글 모두 대응

### 상황 2: 기존 UI 리팩토링
1. 하드코딩된 색/크기 찾기
2. 토큰으로 치환

### 상황 3: AdSense 슬롯 디자인
1. §7(AdSense 특수 규칙) 준수
2. adsense-guardian과 협업

## 통과 기준
- 모든 컴포넌트 다크/라이트 둘 다 정상
- 접근성 (색 대비 4.5:1 이상)
- 반응형 (mobile-first)
- Tailwind 토큰 준수
