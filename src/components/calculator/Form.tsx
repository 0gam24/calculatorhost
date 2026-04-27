import { cn } from '@/lib/utils';

export interface FormCardProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export function FormCard({ title, children, className }: FormCardProps) {
  return (
    <section
      aria-label="계산기 입력"
      className={cn('card flex flex-col gap-5', className)}
    >
      <header>
        <h2 className="text-lg font-semibold">{title}</h2>
      </header>
      {children}
    </section>
  );
}
