'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { SVGProps } from 'react';
import { cn } from '@/lib/utils';
import { SIDEBAR_ITEMS } from './sidebar-items';

type IconProps = SVGProps<SVGSVGElement>;

function SettingsIcon(p: IconProps) {
  return (
    <svg
      width={20}
      height={20}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...p}
      aria-hidden
    >
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function SidebarContent({ isExpanded }: { isExpanded: boolean }) {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <nav className="flex flex-col gap-1 px-3 py-4">
      {SIDEBAR_ITEMS.map((item) => {
        const active = isActive(item.href);
        const { Icon } = item;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'flex items-center rounded-lg transition-all text-sm font-medium',
              isExpanded ? 'gap-3 px-3 py-3' : 'flex-col gap-1.5 px-2 py-3',
              active
                ? 'bg-primary-500/15 text-primary-500'
                : 'text-text-secondary hover:text-text-primary hover:bg-bg-raised/50',
            )}
            aria-label={item.label}
            aria-current={active ? 'page' : undefined}
            title={isExpanded ? undefined : item.label}
          >
            <Icon width={isExpanded ? 20 : 22} height={isExpanded ? 20 : 22} />
            {isExpanded ? (
              <span>{item.label}</span>
            ) : (
              <span className="text-[11px] leading-tight">{item.label.replace(' 계산기', '')}</span>
            )}
          </Link>
        );
      })}
    </nav>
  );
}

export function Sidebar() {
  return (
    <>
      {/* 아이콘 전용 사이드바 (md~lg) — 로고는 전역 Header 에 표시 */}
      <aside
        aria-label="사이드 네비게이션"
        className="sticky top-18 hidden h-[calc(100vh-4.5rem)] w-20 shrink-0 border-r border-border-subtle bg-bg-sidebar md:block lg:hidden"
      >
        <SidebarContent isExpanded={false} />
      </aside>

      {/* 확장된 사이드바 (lg+) */}
      <aside
        aria-label="사이드 네비게이션 (확장)"
        className="sticky top-18 hidden h-[calc(100vh-4.5rem)] w-56 shrink-0 border-r border-border-subtle bg-bg-sidebar overflow-y-auto lg:block"
      >
        <div className="flex flex-col h-full">
          {/* 네비게이션 (로고는 전역 Header 에 표시) */}
          <SidebarContent isExpanded={true} />

          {/* 하단 분리 섹션 */}
          <div className="mt-auto border-t border-border-subtle px-3 py-4">
            <button
              type="button"
              className="flex items-center gap-3 rounded-lg px-3 py-3 w-full text-text-secondary hover:text-text-primary hover:bg-bg-raised/50 transition-all text-sm font-medium"
            >
              <SettingsIcon />
              <span>설정</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
