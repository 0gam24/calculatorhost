import Link from 'next/link';
import Icon from '@/components/ui/Icon';
import { cn } from '@/lib/utils';

export interface RelatedItem {
  href: string;
  title: string;
  description?: string;
}

export interface RelatedCalculatorsProps {
  items: RelatedItem[];
  className?: string;
}

export function RelatedCalculators({ items, className }: RelatedCalculatorsProps) {
  return (
    <section aria-label="관련 계산기" className={cn('flex flex-col gap-4', className)}>
      <h2 className="text-lg font-semibold">관련 계산기</h2>
      <div className="grid gap-3 md:grid-cols-3">
        {items.slice(0, 3).map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex min-h-12 items-center justify-between gap-3 rounded-xl border border-border-base bg-bg-card px-4 py-3 transition hover:border-primary-500"
          >
            <div className="flex flex-col">
              <span className="font-medium">{item.title}</span>
              {item.description ? (
                <span className="text-caption text-text-tertiary">{item.description}</span>
              ) : null}
            </div>
            <span aria-hidden className="text-primary-500">
              <Icon name="chevron-right" size={16} />
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
