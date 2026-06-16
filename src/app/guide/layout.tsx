import type { ReactNode } from 'react';

/**
 * Guide Route Scoped Layout
 *
 * Purpose: 모든 /guide/* 라우트에 클래스 기반 스코프 적용.
 * - 계산기, 카테고리, 정책 페이지와는 독립적 스타일 격리
 * - globals.css 의 .guide-scope 규칙만 이 라우트에 적용됨
 *
 * 이 래퍼는 시각적 효과 없음 (순수 div 블록). 스타일은 CSS에서만 관리.
 */
export default function GuideLayout({ children }: { children: ReactNode }) {
  return <div className="guide-scope">{children}</div>;
}
