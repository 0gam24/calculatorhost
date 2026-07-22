/**
 * 공용 라인 아이콘 (SVG stroke 기반, currentColor).
 *
 * 이모지 대체용 — 이모지는 OS마다 렌더가 다르고 "자동 생성 사이트" 인상을 주므로
 * UI 크롬(카테고리 카드·목록·버튼·푸터)에서는 본 컴포넌트만 사용한다 (2026-07-22 운영자 지시).
 * 색은 부모의 text 색을 상속(currentColor) → 틸 브랜드 토큰과 자동 일치.
 *
 * 의존성 없음: 24×24 viewBox 수제 패스. 필요 아이콘은 ICON_PATHS 에 추가.
 */

import type { SVGProps } from 'react';

export type IconName =
  | 'briefcase'      // 근로
  | 'receipt'        // 세금
  | 'banknote'       // 금융
  | 'home'           // 부동산
  | 'calendar'       // 생활·일정
  | 'trending-up'    // 투자
  | 'landmark'       // 은행·대출
  | 'laptop'         // 프리랜서
  | 'sun'
  | 'moon'
  | 'link'
  | 'clipboard'
  | 'check'
  | 'share'
  | 'rss'
  | 'book-open'
  | 'bar-chart'
  | 'external-link'
  | 'chevron-right';

const ICON_PATHS: Record<IconName, string[]> = {
  briefcase: [
    'M3 9a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z',
    'M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2',
    'M3 13h18',
  ],
  receipt: [
    'M5 3h14v18l-2.4-1.5L14.2 21l-2.2-1.5L9.8 21l-2.4-1.5L5 21z',
    'M9 8h6',
    'M9 12h6',
  ],
  banknote: ['M2 7h20v10H2z', 'M12 14.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z', 'M5.5 12h.01', 'M18.5 12h.01'],
  home: ['m3 11.2 9-7.2 9 7.2', 'M5.5 9.8V20h13V9.8', 'M10 20v-5.2h4V20'],
  calendar: ['M3 6a1.5 1.5 0 0 1 1.5-1.5h15A1.5 1.5 0 0 1 21 6v13.5A1.5 1.5 0 0 1 19.5 21h-15A1.5 1.5 0 0 1 3 19.5z', 'M8 2.5v4', 'M16 2.5v4', 'M3 10h18'],
  'trending-up': ['m3 17 6-6 4 4 8-8', 'M15 7h6v6'],
  landmark: ['m3 9.5 9-6.5 9 6.5H3z', 'M5.5 9.5V18', 'M10 9.5V18', 'M14 9.5V18', 'M18.5 9.5V18', 'M3 21h18'],
  laptop: ['M4 5.5A1.5 1.5 0 0 1 5.5 4h13A1.5 1.5 0 0 1 20 5.5V15H4z', 'M2 19h20'],
  sun: [
    'M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8z',
    'M12 2v2', 'M12 20v2', 'm4.9 4.9 1.4 1.4', 'm17.7 17.7 1.4 1.4',
    'M2 12h2', 'M20 12h2', 'm4.9 19.1 1.4-1.4', 'm17.7 6.3 1.4-1.4',
  ],
  moon: ['M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8z'],
  link: [
    'M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7',
    'M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7',
  ],
  clipboard: [
    'M8 3.5h8a1 1 0 0 1 1 1V6H7V4.5a1 1 0 0 1 1-1z',
    'M17 4.5h1.5A1.5 1.5 0 0 1 20 6v13.5a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 19.5V6a1.5 1.5 0 0 1 1.5-1.5H7',
  ],
  check: ['m20 6-11 11-5-5'],
  share: ['M4 12v7.5A1.5 1.5 0 0 0 5.5 21h13a1.5 1.5 0 0 0 1.5-1.5V12', 'm16 6-4-4-4 4', 'M12 2v13'],
  rss: ['M4 11a9 9 0 0 1 9 9', 'M4 4a16 16 0 0 1 16 16', 'M5.2 19a.2.2 0 1 0 0-.4.2.2 0 0 0 0 .4z'],
  'book-open': [
    'M2 4.5h6a4 4 0 0 1 4 4V20a3 3 0 0 0-3-3H2z',
    'M22 4.5h-6a4 4 0 0 0-4 4V20a3 3 0 0 1 3-3h7z',
  ],
  'bar-chart': ['M3 21h18', 'M7 21v-6', 'M12 21V9', 'M17 21V13'],
  'external-link': ['M15 3h6v6', 'M10 14 21 3', 'M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6'],
  'chevron-right': ['m9 6 6 6-6 6'],
};

interface IconProps extends Omit<SVGProps<SVGSVGElement>, 'name'> {
  name: IconName;
  /** px 단위. 기본 20. */
  size?: number;
}

export default function Icon({ name, size = 20, ...rest }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      {ICON_PATHS[name].map((d) => (
        <path key={d} d={d} />
      ))}
    </svg>
  );
}
