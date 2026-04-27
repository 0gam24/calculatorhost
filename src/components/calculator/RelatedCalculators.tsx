import Link from 'next/link';
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
      <h2 className="text-2xl font-semibold">관련 계산기</h2>
      <div className="grid gap-3 md:grid-cols-2">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="card flex items-center justify-between transition hover:border-primary-500"
          >
            <div className="flex flex-col">
              <span className="font-medium">{item.title}</span>
              {item.description ? (
                <span className="text-caption text-text-tertiary">{item.description}</span>
              ) : null}
            </div>
            <span aria-hidden className="text-primary-500">
              →
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
