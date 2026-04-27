import Link from 'next/link';

export interface BreadcrumbItem {
  /** 표시 텍스트 */
  name: string;
  /** 링크 (마지막 항목은 보통 생략) */
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

/**
 * 시각적 빵부스러기 네비게이션.
 * Schema.org BreadcrumbList JSON-LD 와 함께 사용해야 Google 리치 결과 표시 가능.
 *
 * 사용 예:
 *   <Breadcrumb items={[
 *     { name: '홈', href: '/' },
 *     { name: '세금', href: '/category/tax/' },
 *     { name: '양도소득세' },
 *   ]} />
 */
export function Breadcrumb({ items, className }: BreadcrumbProps) {
  if (items.length === 0) return null;

  return (
    <nav
      aria-label="브레드크럼"
      className={
        'mb-3 flex flex-wrap items-center gap-1 text-caption text-text-tertiary ' +
        (className ?? '')
      }
    >
      {items.map((item, idx) => {
        const isLast = idx === items.length - 1;
        return (
          <span key={idx} className="flex items-center gap-1">
            {idx > 0 && (
              <span aria-hidden className="text-text-tertiary/60">
                /
              </span>
            )}
            {item.href && !isLast ? (
              <Link
                href={item.href}
                className="rounded transition-colors hover:text-text-secondary focus-visible:text-primary-500"
              >
                {item.name}
              </Link>
            ) : (
              <span aria-current={isLast ? 'page' : undefined} className="text-text-secondary">
                {item.name}
              </span>
            )}
          </span>
        );
      })}
    </nav>
  );
}
