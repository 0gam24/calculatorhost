import { cn } from '@/lib/utils';

interface TrendBadgeProps {
  value: number;
  label?: string;
  showSign?: boolean;
  className?: string;
}

export function TrendBadge({
  value,
  label,
  showSign = true,
  className,
}: TrendBadgeProps) {
  const isPositive = value > 0;
  const isNegative = value < 0;
  const isNeutral = value === 0;

  const arrowIcon = isPositive ? '▲' : isNegative ? '▼' : '━';
  const formattedValue = Math.abs(value).toFixed(2);
  const displayText = showSign
    ? `${isPositive ? '+' : isNegative ? '−' : ''}${formattedValue}${label ? label : '%'}`
    : `${formattedValue}${label ? label : '%'}`;

  return (
    <span
      className={cn(
        'trend-badge',
        isPositive && 'trend-badge-positive',
        isNegative && 'trend-badge-negative',
        isNeutral && 'trend-badge-neutral',
        className,
      )}
    >
      <span className="text-xs font-semibold">{arrowIcon}</span>
      <span>{displayText}</span>
    </span>
  );
}
