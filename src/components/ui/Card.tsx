import { cn } from '@/lib/utils';
import type { HTMLAttributes } from 'react';

export type CardProps = HTMLAttributes<HTMLDivElement>;

export function Card({ className, ...props }: CardProps) {
  return <div className={cn('card', className)} {...props} />;
}

export function CardHeader({ className, ...props }: CardProps) {
  return (
    <div
      className={cn('mb-6 flex items-center justify-between gap-4', className)}
      {...props}
    />
  );
}

export function CardTitle({ className, ...props }: CardProps) {
  return (
    <h3
      className={cn(
        'text-lg font-semibold text-text-primary',
        className
      )}
      {...props}
    />
  );
}

export function CardBody({ className, ...props }: CardProps) {
  return <div className={cn(className)} {...props} />;
}
