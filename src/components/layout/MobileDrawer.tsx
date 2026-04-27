'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { SIDEBAR_ITEMS, CloseIcon } from './sidebar-items';

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileDrawer({ isOpen, onClose }: MobileDrawerProps) {
  const pathname = usePathname();
  const drawerRef = useRef<HTMLElement>(null);
  const prevPathnameRef = useRef(pathname);

  /* ────── 라우트 변경 시 자동 닫기
     마운트 시점이나 onClose 함수 재생성 시점에는 실행되지 않도록
     이전 pathname 과 비교하여 실제 라우트 변경 시에만 닫음. */
  useEffect(() => {
    if (prevPathnameRef.current !== pathname) {
      prevPathnameRef.current = pathname;
      onClose();
    }
  }, [pathname, onClose]);

  /* ────── ESC 키로 닫기 ────── */
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, onClose]);

  /* ────── body 스크롤 락 ────── */
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = '';
      };
    }
  }, [isOpen]);

  /* ────── 활성 경로 판정 ────── */
  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  if (!isOpen) return null;

  return (
    <div className="md:hidden fixed inset-0 z-50">
      {/* ────── Backdrop ────── */}
      <button
        type="button"
        aria-label="메뉴 닫기"
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
        tabIndex={-1}
      />

      {/* ────── Drawer Panel ────── */}
      <aside
        ref={drawerRef}
        className="absolute top-0 left-0 h-full w-[280px] bg-bg-sidebar border-r border-border-subtle overflow-y-auto z-10 animate-slide-in"
        role="dialog"
        aria-modal="true"
        aria-label="네비게이션 메뉴"
      >
        {/* ────── 상단: 헤더 (타이틀 + 닫기) ────── */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border-subtle shrink-0">
          <span className="font-bold text-sm text-text-primary">메뉴</span>
          <button
            type="button"
            onClick={onClose}
            aria-label="메뉴 닫기"
            className="p-2 text-text-secondary hover:text-text-primary hover:bg-bg-raised transition-colors rounded-lg"
          >
            <CloseIcon width={18} height={18} />
          </button>
        </div>

        {/* ────── 네비게이션 항목 ────── */}
        <nav className="flex flex-col gap-1 px-3 py-4">
          {SIDEBAR_ITEMS.map((item) => {
            const active = isActive(item.href);
            const { Icon } = item;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 rounded-lg transition-all text-sm font-medium px-3 py-3',
                  active
                    ? 'bg-primary-500/15 text-primary-500'
                    : 'text-text-secondary hover:text-text-primary hover:bg-bg-raised/50',
                )}
                aria-label={item.label}
                aria-current={active ? 'page' : undefined}
              >
                <Icon width={20} height={20} className="shrink-0" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </aside>
    </div>
  );
}
