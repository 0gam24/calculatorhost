import type { SVGProps } from 'react';

export type IconProps = SVGProps<SVGSVGElement>;

export const iconBase = {
  width: 20,
  height: 20,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
} as const;

export function HomeIcon(p: IconProps) {
  return (
    <svg {...iconBase} {...p} aria-hidden>
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

export function BriefcaseIcon(p: IconProps) {
  return (
    <svg {...iconBase} {...p} aria-hidden>
      <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
  );
}

export function ReceiptIcon(p: IconProps) {
  return (
    <svg {...iconBase} {...p} aria-hidden>
      <path d="M4 2v20l2-2 2 2 2-2 2 2 2-2 2 2 2-2 2 2V2l-2 2-2-2-2 2-2-2-2 2-2-2-2 2Z" />
      <path d="M14 8H8" />
      <path d="M16 12H8" />
      <path d="M13 16H8" />
    </svg>
  );
}

export function WalletIcon(p: IconProps) {
  return (
    <svg {...iconBase} {...p} aria-hidden>
      <path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2" />
      <path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4" />
    </svg>
  );
}

export function BuildingIcon(p: IconProps) {
  return (
    <svg {...iconBase} {...p} aria-hidden>
      <rect x="4" y="2" width="16" height="20" rx="2" />
      <path d="M9 22v-4h6v4" />
      <path d="M8 6h.01" />
      <path d="M16 6h.01" />
      <path d="M12 6h.01" />
      <path d="M12 10h.01" />
      <path d="M12 14h.01" />
      <path d="M16 10h.01" />
      <path d="M16 14h.01" />
      <path d="M8 10h.01" />
      <path d="M8 14h.01" />
    </svg>
  );
}

export function CalendarIcon(p: IconProps) {
  return (
    <svg {...iconBase} {...p} aria-hidden>
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M16 2v4" />
      <path d="M8 2v4" />
      <path d="M3 10h18" />
    </svg>
  );
}

export function CloseIcon(p: IconProps) {
  return (
    <svg {...iconBase} {...p} aria-hidden>
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}

export interface SidebarItem {
  href: string;
  label: string;
  Icon: (props: IconProps) => React.JSX.Element;
}

export const SIDEBAR_ITEMS: SidebarItem[] = [
  { href: '/', label: '홈', Icon: HomeIcon },
  { href: '/category/work', label: '근로 계산기', Icon: BriefcaseIcon },
  { href: '/category/tax', label: '세금 계산기', Icon: ReceiptIcon },
  { href: '/category/finance', label: '금융 계산기', Icon: WalletIcon },
  { href: '/category/real-estate', label: '부동산 계산기', Icon: BuildingIcon },
  { href: '/category/lifestyle', label: '생활 계산기', Icon: CalendarIcon },
];
